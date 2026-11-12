"""Publish a batch of rendered reels to a temporary orphan branch for a Drive uploader.

  python3 tools/publish_batch.py 1 --from 0 --count 100

Copies the batch's .mp4 + .txt into a scratch repo, writes manifest.csv
(file, drive_folder_id, theme, line), commits it as an orphan branch
visions-media-NN and pushes it. Raw URLs:
https://raw.githubusercontent.com/hakeemawbrey/Align-design-/visions-media-NN/<file>
Delete the branch once the files are in Drive, or pass --branch visions-media to
overwrite one reusable branch batch after batch.
"""
import argparse, csv, glob, json, os, shutil, subprocess, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOLDERS = {
    "love": "13sZ0vsuehv40OGxMTnyfcDuhP1pO3bEM", "soul": "1NuHH68YmG9fHwgZJuk5Ihygp61426Zfz",
    "align": "1tN33SUH5xrfRFnSOVNoy1ZBQERWC_NZG", "sky": "1Yyj9YZbXz4Ckj40CrfICeYTPPKhxeiiM",
    "aries": "1C3dopTPHNEo-CExRsyToC1I2OJwGIKp5", "taurus": "1ogCO5Qa7ht7A59KOGd4qAzIrWyH-PUOH",
    "gemini": "14U3JgQzoj3ZtI-eNx5vGZICDECc-QPcL", "cancer": "19ccUGxSqaSoHlt5-MiahVJ9j8PhGlTta",
    "leo": "1Om6ijeIf8ZDHJD0QDjM75T3lpjQW5Jpa", "virgo": "1VPDLvqB0NkCjmxfrLA6XydHmHD8-F8Uk",
    "libra": "1Wt04S3sacfEXGA8hW-bMU3FseQcWEtg1", "scorpio": "1jyJPs-VPluyTrJrBqQFZk8izU0b-Xdc5",
    "sagittarius": "1wJY-mzaUmDlIKgd9OAfNN-6aqhCZSnoh", "capricorn": "1cCKCO0GxSZ6J-DviWNityGACHYsomDtF",
    "aquarius": "1KCvHIUOAdA-73x3O5sjGwMgKyMObB4TC", "pisces": "1eIQjFKrf93Ok3nerw3vOCgzrqKnIeNL7",
}


def all_reels():
    """Every finished reel, oldest first (stable order across runs)."""
    files = [f for f in glob.glob(os.path.join(HERE, "out", "*.mp4"))
             if os.path.exists(f[:-4] + ".txt") and "-preview" not in f]
    return sorted(files, key=lambda f: (os.path.getmtime(f), f))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("batch", type=int)
    ap.add_argument("--from", dest="start", type=int, required=True)
    ap.add_argument("--count", type=int, default=100)
    ap.add_argument("--work", required=True, help="scratch dir for the branch")
    ap.add_argument("--match", help="only files whose name contains this, e.g. -x-")
    ap.add_argument("--branch", help="branch to (over)write; default visions-media-NN")
    a = ap.parse_args()
    sys.path.insert(0, HERE)
    import render
    lines = {l["id"]: l for l in render.load_lines()["lines"]}  # includes the zodiac versions
    reels = [f for f in all_reels() if not a.match or a.match in os.path.basename(f)]
    reels = reels[a.start:a.start + a.count]
    branch = a.branch or f"visions-media-{a.batch:02d}"
    work = os.path.join(a.work, branch)
    shutil.rmtree(work, ignore_errors=True)
    os.makedirs(work)
    rows = []
    for f in reels:
        base = os.path.basename(f)[:-4]
        lid = base.rsplit("-s", 1)[0]
        ln = lines.get(lid, {})
        key = ln.get("sign") or ln.get("theme")
        for ext in (".mp4", ".txt"):
            shutil.copy2(f[:-4] + ext, os.path.join(work, base + ext))
        rows.append([base + ".mp4", FOLDERS[key], key, ln.get("text", "")])
        rows.append([base + ".txt", FOLDERS[key], key, "caption, hashtags and image credits"])
    with open(os.path.join(work, "manifest.csv"), "w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["file", "drive_folder_id", "folder", "line"])
        w.writerows(rows)
    remote = subprocess.check_output(["git", "-C", HERE, "remote", "get-url", "origin"], text=True).strip()
    run = lambda *c: subprocess.run(c, cwd=work, check=True)
    run("git", "init", "-q", "-b", branch)
    run("git", "add", "-A")
    run("git", "-c", "user.name=Claude", "-c", "user.email=noreply@anthropic.com", "commit", "-q", "-m",
        f"Align Visions media batch {a.batch}: {len(reels)} reels for the Drive upload (temporary branch)\n\n"
        "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\n"
        "Claude-Session: https://claude.ai/code/session_01337Szff5h53cJ8xesXtxBX")
    run("git", "push", "-q", "-f", remote, f"{branch}:{branch}")
    print(branch, len(reels), "reels")


if __name__ == "__main__":
    sys.exit(main())
