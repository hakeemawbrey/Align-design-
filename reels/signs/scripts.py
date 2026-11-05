"""Turn copy/signs.json into reel scripts.

A script is a short run of text cards spoken straight to one sign:

  {"id": "scorpio-dear-2", "sign": "scorpio", "format": "dear", "title": "...",
   "cards": [{"text": "Dear Scorpio,", "kind": "hook"}, {"text": "...", "kind": "body"}, ...,
             {"text": "send this to your Scorpio", "kind": "cta", "sub": "find who you align with · link in bio"}],
   "moods": ["scorpio", "moon", ...], "caption": "...", "hashtags": [...]}

  python3 scripts.py                 # count, and list every id
  python3 scripts.py scorpio-dear-2  # print one
  python3 scripts.py --lint          # copy rules over every script
"""
import json
import os
import re
import sys
import zlib

HERE = os.path.dirname(os.path.abspath(__file__))
SIGNS = json.load(open(os.path.join(HERE, "copy", "signs.json")))
ORDER = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio",
         "sagittarius", "capricorn", "aquarius", "pisces"]

# Closing cards. {S} = sign name. Every reel ends on one: share it, invite them, or come align.
CTAS = {
    "share":  [("send this to your {S}", "the one who needs it"), ("tag the {S} who needs this", "they'll know"),
               ("send this to a {S}", "and see what they say")],
    "invite": [("invite your {S} to align", "find out how you two align · link in bio"),
               ("bring your {S} to align", "see your alignment together · link in bio"),
               ("align with your {S}", "invite them · link in bio")],
    "align":  [("find who you align with", "your chart is free · align · link in bio"),
               ("stop chasing. start aligning.", "align · link in bio"),
               ("come align", "your full chart is free · link in bio")],
}
CTA_FOR = {"dear": "share", "loves": "invite", "wontsay": "share", "needs": "invite", "relatable": "share",
           "advice": "share", "align": "align", "pair": "invite", "invite": "invite", "reminder": "share"}

TAGS = {"base": ["zodiac", "astrology", "align"],
        "dear": "zodiacadvice", "loves": "zodiaclove", "wontsay": "zodiacmemes", "needs": "relationshipadvice",
        "relatable": "relatable", "advice": "relationshipadvice", "align": "alignment", "pair": "zodiaclove",
        "invite": "zodiaclove", "reminder": "zodiacadvice"}

# Captions: short, warm, then the free chart. {S} = sign name.
CAPTIONS = {
    "dear": ["A note for every {S} out there.", "{S}, read this twice.", "For the {S} who needed it today."],
    "loves": ["If a {S} loves you, you'll know.", "Loved by a {S}? Lucky you."],
    "wontsay": ["They'll never say it. So we did.", "Every {S} felt this one."],
    "needs": ["Dating a {S}? Save this.", "The {S} manual, short version."],
    "relatable": ["Tag the {S}. You know the one.", "Every {S} ever."],
    "advice": ["{S}, this one's for you.", "Advice your {S} friend needs."],
    "align": ["Alignment over attention.", "What it feels like when it's right."],
    "pair": ["Some pairs just align.", "Send this to your other half."],
    "invite": ["You know exactly who this is.", "Send it. They'll get it."],
    "reminder": ["Your reminder, {S}.", "Save this for the hard days."],
}
FOOT = "Get your full chart free in the Align app, link in bio."


def _pick(seq, k, salt):
    """k items from seq, a different but stable selection per salt."""
    idx = sorted(range(len(seq)), key=lambda i: zlib.crc32(f"{salt}:{i}".encode()))
    return [seq[i] for i in idx[:k]]


def _cap(s):
    return s[:1].upper() + s[1:]


def _cards(sign, fmt, k):
    d = SIGNS[sign]
    S = d["name"]
    if fmt == "dear":
        letter = d["dear"][k % len(d["dear"])]
        return f"Dear {S},", [*letter], f"{S}: a letter"
    if fmt == "loves":
        items = _pick(d["loves"], 4, f"{sign}{k}")
        return f"How a {S} loves you", [_cap(x) + "." for x in items], f"How a {S} loves"
    if fmt == "wontsay":
        items = _pick(d["wontsay"], 3, f"{sign}{k}")
        return f"Things a {S} won't say out loud", [f"“{x}”" for x in items], f"What a {S} won't say"
    if fmt == "needs":
        items = _pick(d["needs"], 4, f"{sign}{k}")
        return f"Dating a {S}? They need…", [_cap(x) + "." for x in items], f"What a {S} needs"
    if fmt == "relatable":
        items = _pick(d["relatable"], 4, f"{sign}{k}")
        return f"Signs you're dating a {S}", [_cap(x) + "." for x in items], f"Dating a {S}"
    if fmt == "advice":
        items = _pick(d["advice"], 3, f"{sign}{k}")
        return f"{S}, a little relationship advice", items, f"Advice for {S}"
    if fmt == "reminder":
        a = _pick(d["advice"], 1, f"r{sign}{k}")[0]
        letter = d["dear"][(k + 1) % len(d["dear"])]
        return f"{S}, this is your reminder:", [letter[0], a], f"A reminder for {S}"
    if fmt == "align":
        return f"What alignment feels like for a {S}", [*d["align"]], f"Alignment, {S}"
    if fmt == "invite":
        hook = d["invite"][k % len(d["invite"])]
        items = _pick(d["loves"], 2, f"i{sign}{k}")
        return f"Send this to the {S} who {hook}.", [_cap(x) + "." for x in items], f"For the {S} who {hook}"
    raise KeyError(fmt)


FORMATS = {"dear": 4, "loves": 3, "wontsay": 3, "needs": 2, "relatable": 3, "advice": 3,
           "reminder": 3, "align": 1, "invite": 4}


def build(sid):
    """sid like 'scorpio-dear-2' or 'scorpio+cancer-pair'."""
    m = re.fullmatch(r"([a-z]+)\+([a-z]+)-pair", sid)
    if m:
        a, b = m.groups()
        A, B = SIGNS[a]["name"], SIGNS[b]["name"]
        lines = SIGNS[a]["pairs"][b]
        hook, body, title, fmt, sign = f"{A} + {B}", [*lines, "That's alignment."], f"{A} and {B}", "pair", a
        moods = [a, b, "couple", "lovers"]
    else:
        sign, fmt, k = re.fullmatch(r"([a-z]+)-([a-z]+)-(\d+)", sid).groups()
        k = int(k)
        hook, body, title = _cards(sign, fmt, k)
        moods = SIGNS[sign]["moods"] + (["couple", "lovers"] if fmt in ("loves", "needs", "invite") else ["moon", "stars"])
    S = SIGNS[sign]["name"]
    kind = CTA_FOR[fmt]
    cta, sub = CTAS[kind][zlib.crc32(sid.encode()) % len(CTAS[kind])]
    cards = [{"text": hook, "kind": "hook"}] + [{"text": t, "kind": "body"} for t in body] + \
            [{"text": cta.format(S=S), "kind": "cta", "sub": sub.format(S=S)}]
    cap = CAPTIONS[fmt][zlib.crc32(sid.encode()) % len(CAPTIONS[fmt])].format(S=S)
    tags = TAGS["base"] + [TAGS[fmt], S.lower()]
    return {"id": sid, "sign": sign, "format": fmt, "title": title, "cards": cards, "moods": moods,
            "caption": f"{cap}\n\n{FOOT}", "hashtags": tags}


def all_ids():
    ids = []
    for s in ORDER:
        for fmt, n in FORMATS.items():
            if fmt == "dear":
                n = len(SIGNS[s]["dear"])
            ids += [f"{s}-{fmt}-{k}" for k in range(n)]
        ids += [f"{s}+{b}-pair" for b in SIGNS[s]["pairs"]]
    return ids


BANNED = [(r"compatib", 'say alignment, not compatibility'), (r"\bon align\b", 'never "on Align"'),
          (r"\bsoulmate", "no soulmate promises"),
          (r"\b(tinder|hinge|bumble|instagram|tiktok|netflix|spotify|starbucks)\b", "no real brands"),
          (r"\b(wine|beer|drunk|shots?|tequila|cocktail|hangover)\b", "no alcohol")]


def lint():
    bad = 0
    for sid in all_ids():
        s = build(sid)
        blob = json.dumps(s, ensure_ascii=False).lower()
        for pat, why in BANNED:
            if re.search(pat, blob):
                print(f"✗ {sid}: {why}")
                bad += 1
        for c in s["cards"]:
            if len(c["text"].split()) > 16:
                print(f"! {sid}: long card ({len(c['text'].split())} words): {c['text']}")
    print(f"{len(all_ids())} scripts, {bad} errors")
    return bad


if __name__ == "__main__":
    if "--lint" in sys.argv:
        sys.exit(1 if lint() else 0)
    if len(sys.argv) > 1:
        print(json.dumps(build(sys.argv[1]), indent=1, ensure_ascii=False))
    else:
        ids = all_ids()
        print(len(ids), "scripts")
        print(" ".join(ids))
