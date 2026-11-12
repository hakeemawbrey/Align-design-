"""Rebuilds index.html from template.html, ../copy/*.json and art.json.  python3 build.py"""
import glob, json, os
HERE = os.path.dirname(os.path.abspath(__file__))
SETS = {"aries_cancer": "Signs", "leo_scorpio": "Signs", "sag_pisces": "Signs", "placements": "Placements",
        "houston_a": "Houston", "houston_b": "Houston", "houston_c": "Houston", "houston_d": "Houston",
        "formats": "Formats", "short": "Short", "brainrot": "Brainrot", "boomer": "Boomer"}
out = []
for f in sorted(glob.glob(os.path.join(HERE, "..", "copy", "*.json"))):
    k = os.path.basename(f)[:-5]
    for p in json.load(open(f))["posts"]:
        d = {"id": p["id"], "set": SETS.get(k, "Other"), "sign": p.get("sign") or p.get("topic") or "",
             "text": p["text"], "caption": p.get("caption", ""), "tags": p.get("hashtags", [])[:5]}
        for key in ("palette", "ink", "style"):
            if p.get(key):
                d[key] = p[key]
        out.append(d)
posts = json.dumps(out, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
art = open(os.path.join(HERE, "art.json")).read().replace("</", "<\\/")
t = open(os.path.join(HERE, "template.html")).read()
open(os.path.join(HERE, "index.html"), "w").write(t.replace("__POSTS__", posts).replace("__ART__", art))
print(len(out), "posts")
