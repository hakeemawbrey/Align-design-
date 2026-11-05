"""The Signs image catalogue: every curated, free-to-use picture, by pool.

Pools live in catalog/pools/<pool>.json (curated for Signs by tools/curate.py) and
catalog/visions/ (the 440 pictures already curated for Align Visions, reused as-is).
Every image is public domain, CC0, CC BY or CC BY-SA; the CC BY ones get a credit
line in the post caption. Pictures download on first use into cache/img/.
"""
import glob
import json
import os

import sources

HERE = os.path.dirname(os.path.abspath(__file__))
_POOLS = None


def pools():
    global _POOLS
    if _POOLS is None:
        _POOLS = {}
        for f in sorted(glob.glob(os.path.join(HERE, "catalog", "visions", "*.json")) +
                        glob.glob(os.path.join(HERE, "catalog", "visions", "signs", "*.json"))):
            name = os.path.basename(f)[:-5]
            for it in json.load(open(f))["images"]:
                it = {k: v for k, v in it.items() if k != "file"}
                it["pool"] = name
                it["from"] = "visions"
                _POOLS.setdefault(name, []).append(it)
        for f in sorted(glob.glob(os.path.join(HERE, "catalog", "pools", "*.json"))):
            name = os.path.basename(f)[:-5]
            have = {i["id"] for i in _POOLS.get(name, [])}
            for it in json.load(open(f))["images"]:
                if it["id"] not in have:
                    it["pool"] = name
                    _POOLS.setdefault(name, []).append(it)
    return _POOLS


def all_images():
    seen, out = set(), []
    for name, items in pools().items():
        for it in items:
            if it["id"] not in seen:
                seen.add(it["id"])
                out.append(it)
    return out


def local_file(it):
    d = os.path.join(HERE, "cache", "img")
    os.makedirs(d, exist_ok=True)
    p = os.path.join(d, it["id"].replace("/", "_")[:80] + ".jpg")
    if not os.path.exists(p):
        cand = os.path.join(HERE, "cache", it.get("pool", ""), "cand", it.get("file", "-"))
        if it.get("file") and os.path.exists(cand):
            os.link(cand, p)
        elif not sources.download(it, p):
            raise RuntimeError(f"could not download {it['id']} ({it.get('url')})")
    return p


def choose(moods, sign, n, rng):
    """n distinct pictures: the first from the sign's own pool when there is one, then
    mostly the first two moods, some from the rest. Pinned images come up more often."""
    P = pools()
    order = [m for m in moods if P.get(m)]
    if sign in P and sign not in order:
        order.insert(0, sign)
    weights = [3.0, 2.0] + [1.0] * max(0, len(order) - 2)
    picked, ids = [], set()
    tries = 0
    while len(picked) < n and tries < 400:
        tries += 1
        if not picked and order:
            pool = order[0]
        else:
            weights += [1.0] * (len(order) - len(weights))
            w = weights[:len(order)]
            pool = order[int(rng.choice(len(order), p=[x / sum(w) for x in w]))]
        items = [i for i in P[pool] if i["id"] not in ids]
        if not items:
            continue
        pw = [3.0 if i.get("pin") else 1.0 for i in items]
        it = items[int(rng.choice(len(items), p=[x / sum(pw) for x in pw]))]
        try:
            local_file(it)
        except Exception:
            ids.add(it["id"])
            continue
        ids.add(it["id"])
        picked.append(it)
        k = order.index(pool)
        if k < len(weights):
            weights[k] *= 0.4          # spread a reel across its moods
        else:
            weights.append(0.4)
    return picked


def needs_credit(it):
    lic = (it.get("license") or "").lower()
    return "by" in lic and "public" not in lic and "cc0" not in lic


def credit(it):
    return f"{(it.get('creator') or 'unknown').strip()[:60]}, {it.get('license')}"


if __name__ == "__main__":
    P = pools()
    for k in sorted(P):
        print(f"{k:14s} {len(P[k])}")
    print("total", len(all_images()))
