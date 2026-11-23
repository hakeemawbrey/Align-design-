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
import hashlib
import json
import os
import re
import sys
import zlib

HERE = os.path.dirname(os.path.abspath(__file__))
SIGNS = json.load(open(os.path.join(HERE, "copy", "signs.json")))
for _k, _v in json.load(open(os.path.join(HERE, "copy", "more.json"))).items():
    SIGNS[_k].update(_v)
ORDER = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio",
         "sagittarius", "capricorn", "aquarius", "pisces"]

# Closing cards. {S} = sign name. Every reel ends on one: share it, invite them, or come align.
CTAS = {
    "share":  [("send this to your {S}", "the one who needs it"), ("tag the {S} who needs this", "they'll know"),
               ("send this to a {S}", "and see what they say"), ("screenshot this, {S}", "for the hard days"),
               ("your {S} needs to see this", "send it"), ("save this, {S}", "come back to it")],
    "invite": [("invite your {S} to align", "find out how you two align · link in bio"),
               ("bring your {S} to align", "see your alignment together · link in bio"),
               ("align with your {S}", "invite them · link in bio"),
               ("see how you align with a {S}", "your chart is free · link in bio"),
               ("dating a {S}? come align", "invite them · link in bio")],
    "align":  [("find who you align with", "your chart is free · align · link in bio"),
               ("stop chasing. start aligning.", "align · link in bio"),
               ("come align", "your full chart is free · link in bio"),
               ("your sign is the start. your chart is the story.", "come align · link in bio"),
               ("alignment > attention", "come align · link in bio")],
}
CTA_FOR = {"dear": "share", "loves": "invite", "wontsay": "share", "needs": "invite", "relatable": "share",
           "advice": "share", "align": "align", "pair": "invite", "invite": "invite", "reminder": "share",
           "fall": "invite", "date": "invite", "texts": "share", "hurt": "share", "hear": "share", "green": "invite"}

TAGS = {"base": ["zodiac", "astrology", "align"],
        "dear": "zodiacadvice", "loves": "zodiaclove", "wontsay": "zodiacmemes", "needs": "relationshipadvice",
        "relatable": "relatable", "advice": "relationshipadvice", "align": "alignment", "pair": "zodiaclove",
        "invite": "zodiaclove", "reminder": "zodiacadvice", "fall": "zodiaclove", "date": "datingadvice",
        "texts": "relatable", "hurt": "zodiacsigns", "hear": "affirmations", "green": "greenflags"}

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
    "fall": ["Taking notes? Good.", "Now you know, {S} lovers.", "The {S} cheat code."],
    "date": ["Plan accordingly.", "Send this to the one planning your date.", "{S} date ideas, approved."],
    "texts": ["If they text like this, they like you.", "{S} texts, decoded.", "Every {S} has sent at least one of these."],
    "hurt": ["Be gentle with your {S}.", "If your {S} goes quiet, read this.", "{S}s feel it all."],
    "hear": ["{S}, this is for you.", "Read it twice.", "Save this for later, {S}."],
    "green": ["Green flags only.", "If your {S} does this, keep them.", "{S} at their best."],
}
FOOT = "Get your full chart free in the Align app, link in bio."


def _pick(seq, k, salt):
    """k items from seq, a different but stable selection per salt."""
    idx = sorted(range(len(seq)), key=lambda i: hashlib.md5(f"{salt}:{i}".encode()).hexdigest())
    return [seq[i] for i in idx[:k]]


def _pickv(seq, n, salt, k):
    """The k-th of all n-line combinations of seq (in a stable shuffled order), itself shuffled:
    variants of one format never repeat the same set of lines."""
    import itertools
    combos = sorted(itertools.combinations(range(len(seq)), min(n, len(seq))),
                    key=lambda c: hashlib.md5(f"{salt}:{c}".encode()).hexdigest())
    c = combos[k % len(combos)]
    return [seq[i] for i in sorted(c, key=lambda i: hashlib.md5(f"{salt}:{k}:{i}".encode()).hexdigest())]


def _cap(s):
    return s[:1].upper() + s[1:]


def _cards(sign, fmt, k):
    d = SIGNS[sign]
    S = d["name"]
    if fmt == "dear":
        letter = d["dear"][k % len(d["dear"])]
        return f"Dear {S},", [*letter], f"{S}: a letter"
    if fmt == "loves":
        items = _pickv(d["loves"], 4, "loves" + sign, k)
        return f"How a {S} loves you", [_cap(x) + "." for x in items], f"How a {S} loves"
    if fmt == "wontsay":
        items = _pickv(d["wontsay"], 3, "wontsay" + sign, k)
        return f"Things a {S} won't say out loud", [f"“{x}”" for x in items], f"What a {S} won't say"
    if fmt == "needs":
        items = _pickv(d["needs"], 4, "needs" + sign, k)
        return f"Dating a {S}? They need…", [_cap(x) + "." for x in items], f"What a {S} needs"
    if fmt == "relatable":
        items = _pickv(d["relatable"], 4, "relatable" + sign, k)
        return f"Signs you're dating a {S}", [_cap(x) + "." for x in items], f"Dating a {S}"
    if fmt == "advice":
        items = _pickv(d["advice"], 3, "advice" + sign, k)
        return f"{S}, a little relationship advice", items, f"Advice for {S}"
    if fmt == "reminder":
        a = _pickv(d["advice"], 1, "advice" + sign, k)[0]
        letter = d["dear"][(k + 1) % len(d["dear"])]
        return f"{S}, this is your reminder:", [letter[0], a], f"A reminder for {S}"
    if fmt == "fall":
        items = _pickv(d["fall"], 3, "fall" + sign, k)
        return f"How to make a {S} fall for you", items, f"How to make a {S} fall"
    if fmt == "date":
        items = _pickv(d["date"], 3, "date" + sign, k)
        return f"The perfect date for a {S}", items, f"The perfect {S} date"
    if fmt == "texts":
        items = _pickv(d["texts"], 3, "texts" + sign, k)
        return f"Texts that mean a {S} likes you", [f"“{x}”" for x in items], f"{S} texts, decoded"
    if fmt == "hurt":
        items = _pickv(d["hurt"], 3, "hurt" + sign, k)
        return f"What a {S} does when they're hurt", items, f"A {S}, hurt"
    if fmt == "hear":
        items = _pickv(d["hear"], 2, "hear" + sign, k)
        return f"{S}, you need to hear this:", items, f"{S}, hear this"
    if fmt == "green":
        items = _pickv(d["green"], 4, "green" + sign, k)
        return f"Green flags in a {S}", items, f"{S} green flags"
    if fmt == "align":
        return f"What alignment feels like for a {S}", [*d["align"]], f"Alignment, {S}"
    if fmt == "invite":
        hook = d["invite"][k % len(d["invite"])]
        items = _pickv(d["loves"], 2, "loves" + sign, k)
        return f"Send this to the {S} who {hook}.", [_cap(x) + "." for x in items], f"For the {S} who {hook}"
    raise KeyError(fmt)


FORMATS = {"dear": 4, "loves": 3, "wontsay": 3, "needs": 2, "relatable": 3, "advice": 3,
           "reminder": 3, "align": 1, "invite": 4, "fall": 3, "date": 2, "texts": 3, "hurt": 2, "hear": 3, "green": 2}


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
