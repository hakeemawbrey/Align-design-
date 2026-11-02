"""Turn the inspo spreadsheet (.xlsx or .csv) into data/inspo.json.

    python3 src/import-sheet.py ~/Downloads/align-edits-inspo-serious.xlsx

Columns: #, Creator, Type, Link, What it's about. Rows already in
data/inspo.json keep their id; new links are added at the end. Decisions are
stored by id in data/decisions.json, so re-importing never loses them.
"""
import csv, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "inspo.json"


def rows_from(path):
    if path.suffix.lower() == ".csv":
        with open(path, newline="", encoding="utf-8-sig") as f:
            r = list(csv.reader(f))
    else:
        import openpyxl
        ws = openpyxl.load_workbook(path, read_only=True).active
        r = [list(x) for x in ws.iter_rows(values_only=True)]
    head = [str(h or "").strip().lower() for h in r[0]]
    col = lambda *names: next((i for i, h in enumerate(head) if any(n in h for n in names)), None)
    c_creator, c_type, c_link, c_about = col("creator"), col("type"), col("link", "url"), col("about", "caption")
    for row in r[1:]:
        link = str(row[c_link] or "").strip() if c_link is not None else ""
        if not link:
            continue
        yield {
            "creator": str(row[c_creator] or "").strip().lstrip("@") if c_creator is not None else "",
            "type": str(row[c_type] or "").strip() if c_type is not None else "",
            "url": link,
            "about": str(row[c_about] or "").strip() if c_about is not None else "",
        }


def shortcode(url):
    m = re.search(r"instagram\.com/(?:[^/]+/)?(reel|reels|p|tv)/([A-Za-z0-9_-]+)", url)
    return m.group(2) if m else None


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    old = json.loads(OUT.read_text()) if OUT.exists() else {"items": []}
    by_code = {i["shortcode"]: i for i in old["items"]}
    next_id = max([int(i["id"][1:]) for i in old["items"]] or [0]) + 1
    added = 0
    for r in rows_from(Path(sys.argv[1]).expanduser()):
        code = shortcode(r["url"])
        if not code:
            print("skipped (not an Instagram post link):", r["url"])
            continue
        about = "" if r["about"] == "No caption provided" else r["about"]
        if code in by_code:
            by_code[code].update(creator=r["creator"], type=r["type"], about=about)
            continue
        item = {"id": f"i{next_id:04d}", "shortcode": code, "creator": r["creator"], "type": r["type"] or "Reel",
                "url": f"https://www.instagram.com/{'reel' if r['type'] == 'Reel' else 'p'}/{code}/", "about": about}
        by_code[code] = item
        old["items"].append(item)
        next_id += 1
        added += 1
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"source": Path(sys.argv[1]).name, "items": old["items"]}, ensure_ascii=False, indent=1) + "\n")
    print(f"{len(old['items'])} posts in data/inspo.json ({added} new)")


if __name__ == "__main__":
    main()
