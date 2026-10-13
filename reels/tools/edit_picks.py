"""Apply review edits to a picks file, addressing images by a fragment of their note.

  python3 tools/edit_picks.py virgo cut "Hitchcock"
  python3 tools/edit_picks.py virgo frame "La Tour" 0.40 0.30 1.0     # focus x y [zoom]
  python3 tools/edit_picks.py virgo unpin "hermit crab"
  python3 tools/edit_picks.py virgo pin "Sombrero"
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def find(images, frag):
    hits = [i for i, it in enumerate(images)
            if frag.lower() in (it.get("note", "") + " " + it.get("title", "")).lower()]
    if len(hits) != 1:
        raise SystemExit(f"'{frag}' matched {len(hits)} images")
    return hits[0]


def main():
    sign, op, frag, *args = sys.argv[1:]
    path = os.path.join(HERE, "picks", f"{sign}.json")
    d = json.load(open(path))
    i = find(d["images"], frag)
    it = d["images"][i]
    if op == "cut":
        d["images"].pop(i)
    elif op == "frame":
        it["focus"] = [float(args[0]), float(args[1])]
        if len(args) > 2:
            it["zoom"] = float(args[2])
    elif op in ("pin", "unpin"):
        if op == "pin":
            it["pin"] = True
        else:
            it.pop("pin", None)
    else:
        raise SystemExit(f"unknown op {op}")
    json.dump(d, open(path, "w"), indent=1, ensure_ascii=False)
    print(f"{sign}: {op} {it.get('note', it.get('title'))[:60]}")


if __name__ == "__main__":
    main()
