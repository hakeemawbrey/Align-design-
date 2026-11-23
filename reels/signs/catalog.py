"""The Signs image catalogue: every curated, free-to-use picture, by pool.

Pools live in catalog/pools/<pool>.json (curated for Signs by tools/curate.py) and
catalog/visions/ (the 440 pictures already curated for Align Visions, reused as-is).
Every image is public domain, CC0, CC BY or CC BY-SA; the CC BY ones get a credit
line in the post caption. Pictures download on first use into cache/img/.
"""
import glob
import json
import os

import numpy as np

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
        else:
            bad = os.path.join(d, "failed.txt")
            failed = set(open(bad).read().split()) if os.path.exists(bad) else set()
            if it["id"] in failed and not os.environ.get("RETRY"):
                raise RuntimeError(f"{it['id']} failed before (RETRY=1 to try again)")
            if not sources.download(it, p):
                open(bad, "a").write(it["id"] + "\n")
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


# ---------------------------------------------------------------- spreading the catalogue

ELEMENT_POOLS = {
    "fire": ["sunset", "candle", "autumn", "horses", "dance"],
    "earth": ["fields", "garden", "fruit", "flowers", "blossom"],
    "air": ["clouds", "birds", "music", "city-night", "train"],
    "water": ["water", "rain", "pond", "stars-sea", "boat"],
}
FORMAT_POOLS = {
    "dear": ["letters", "reading", "window", "door", "moon"],
    "loves": ["couple", "lovers", "dance", "garden", "cupid"],
    "wontsay": ["window", "eyes", "rain", "candle", "sleep", "mirror"],
    "needs": ["couple", "cafe", "boat", "beach", "music"],
    "relatable": ["cafe", "city-night", "music", "fruit", "train", "mirror"],
    "advice": ["fields", "clouds", "sunset", "pond", "door"],
    "reminder": ["blossom", "autumn", "snow", "stars-sea", "sleep"],
    "align": ["stars", "space", "water", "pond", "moon"],
    "invite": ["door", "train", "boat", "beach", "letters"],
    "pair": ["couple", "lovers", "horses", "birds", "dance"],
    "fall": ["couple", "garden", "blossom", "letters", "cupid"],
    "date": ["cafe", "beach", "boat", "city-night", "fruit", "dance"],
    "texts": ["letters", "window", "reading", "train", "cafe"],
    "hurt": ["rain", "snow", "window", "candle", "sleep", "eyes"],
    "hear": ["sunset", "blossom", "stars", "fields", "pond", "moon"],
    "green": ["garden", "fields", "flowers", "birds", "blossom", "couple"],
}


class Allocator:
    """Hands out pictures across a whole batch: least-used first, never the same opening
    picture twice, and a wide mix of pools per reel. Usage persists in out/usage.json."""

    def __init__(self, path=None):
        self.path = path or os.path.join(HERE, "out", "usage.json")
        st = json.load(open(self.path)) if os.path.exists(self.path) else {}
        self.used = st.get("used", {})
        self.openers = set(st.get("openers", []))

    def save(self):
        os.makedirs(os.path.dirname(self.path), exist_ok=True)
        json.dump({"used": self.used, "openers": sorted(self.openers)}, open(self.path, "w"))

    def weights(self, script):
        P = pools()
        import scripts as S
        sign = script["sign"]
        w = {}

        def bump(names, v):
            for n in names:
                if P.get(n):
                    w[n] = w.get(n, 0) + v
        bump([sign], 3.0)
        bump(script.get("moods", []), 1.0)
        bump(FORMAT_POOLS.get(script["format"], []), 1.4)
        bump(ELEMENT_POOLS.get(S.SIGNS[sign]["element"], []), 1.0)
        if script["format"] == "pair":
            other = script["id"].split("+")[1].split("-")[0]
            bump([other], 2.0)
        bump(list(P), 0.15)            # a little of everything, so nothing goes unused
        return w

    def choose(self, script, n, rng):
        P = pools()
        w = self.weights(script)
        names = list(w)
        picked, ids = [], set()
        tries = 0
        while len(picked) < n and tries < 200:
            tries += 1
            if not picked and script["sign"] in P:
                pool = script["sign"] if rng.random() < 0.55 else names[int(rng.choice(len(names), p=np.array([w[k] for k in names]) / sum(w.values())))]
            else:
                pool = names[int(rng.choice(len(names), p=np.array([w[k] for k in names]) / sum(w.values())))]
            items = [i for i in P[pool] if i["id"] not in ids and (picked or i["id"] not in self.openers)]
            if not items:
                continue
            low = min(self.used.get(i["id"], 0) for i in items)
            cands = [i for i in items if self.used.get(i["id"], 0) == low]
            it = cands[int(rng.integers(len(cands)))]
            ids.add(it["id"])
            try:
                local_file(it)
            except Exception:
                self.used[it["id"]] = self.used.get(it["id"], 0) + 99   # dead link: stop offering it
                continue
            picked.append(it)
            self.used[it["id"]] = self.used.get(it["id"], 0) + 1
            w[pool] *= 0.5                                                # spread across pools
        if picked:
            self.openers.add(picked[0]["id"])
        return picked


def by_id():
    return {it["id"]: it for it in all_images()}
