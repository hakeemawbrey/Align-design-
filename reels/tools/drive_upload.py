"""Upload labelled reels straight to a Google Drive folder.

One-time setup (about 5 minutes):
  1. Google Cloud console -> create a service account -> Keys -> Add key (JSON).
     Enable the "Google Drive API" for that project.
  2. In Drive, share your reels folder with the service account's email (Editor).
  3. Give this script the key and the folder id (the last part of the folder URL):
       export GDRIVE_SA_JSON=/path/to/key.json      # or the JSON itself
       export GDRIVE_FOLDER_ID=1AbC...

  pip install google-auth requests
  python3 tools/drive_upload.py deliver/            # every .mp4 (and its .txt) in the folder
  python3 tools/drive_upload.py out/leo-s4.mp4      # one reel, labelled automatically

Files go into one subfolder per sign ("05 Leo"), named like
"05 Leo — v5.mp4", with the caption, hashtags and credits as the file's
Drive description. Re-running skips files that already exist.
"""
import json
import os
import re
import sys

import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIGNS = json.load(open(os.path.join(HERE, "signs.json")))
ORDER = ["aries", "taurus", "gemini", "cancer", "leo", "virgo",
         "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
API = "https://www.googleapis.com/drive/v3/files"


def label(path):
    """out/leo-s4.mp4 -> ('05 Leo', '05 Leo — v5.mp4'); already-labelled names pass through."""
    base = os.path.basename(path)
    m = re.match(r"([a-z]+)-s(\d+)\.mp4$", base)
    if m:
        sign, seed = m[1], int(m[2])
    else:
        m = re.match(r"(\d\d) ([A-Za-z]+) — v(\d+)\.mp4$", base)
        if not m:
            raise SystemExit(f"can't tell the sign and version of {base}")
        sign, seed = m[2].lower(), int(m[3]) - 1
    n = ORDER.index(sign) + 1
    folder = f"{n:02d} {SIGNS[sign]['name']}"
    return folder, f"{folder} — v{seed + 1}.mp4"


def session():
    raw = os.environ["GDRIVE_SA_JSON"]
    info = json.loads(raw) if raw.strip().startswith("{") else json.load(open(raw))
    creds = service_account.Credentials.from_service_account_info(
        info, scopes=["https://www.googleapis.com/auth/drive"])
    creds.refresh(Request())
    s = requests.Session()
    s.headers["Authorization"] = f"Bearer {creds.token}"
    return s


def find(s, name, parent, folder=False):
    q = f"name = '{name}' and '{parent}' in parents and trashed = false"
    if folder:
        q += " and mimeType = 'application/vnd.google-apps.folder'"
    r = s.get(API, params={"q": q, "fields": "files(id)", "supportsAllDrives": "true",
                           "includeItemsFromAllDrives": "true"})
    r.raise_for_status()
    files = r.json()["files"]
    return files[0]["id"] if files else None


def ensure_folder(s, name, parent):
    fid = find(s, name, parent, folder=True)
    if fid:
        return fid
    r = s.post(API, params={"supportsAllDrives": "true"},
               json={"name": name, "parents": [parent], "mimeType": "application/vnd.google-apps.folder"})
    r.raise_for_status()
    return r.json()["id"]


def upload(s, path, root):
    folder, name = label(path)
    parent = ensure_folder(s, folder, root)
    if find(s, name, parent):
        print(f"exists  {folder}/{name}")
        return
    txt = path[:-4] + ".txt"
    desc = open(txt).read()[:4000] if os.path.exists(txt) else ""
    meta = {"name": name, "parents": [parent], "description": desc}
    init = s.post("https://www.googleapis.com/upload/drive/v3/files",
                  params={"uploadType": "resumable", "supportsAllDrives": "true"},
                  json=meta, headers={"X-Upload-Content-Type": "video/mp4"})
    init.raise_for_status()
    with open(path, "rb") as fh:
        r = s.put(init.headers["Location"], data=fh, headers={"Content-Type": "video/mp4"})
    r.raise_for_status()
    print(f"uploaded {folder}/{name}")


def main():
    root = os.environ["GDRIVE_FOLDER_ID"]
    paths = []
    for a in sys.argv[1:]:
        if os.path.isdir(a):
            paths += sorted(os.path.join(a, f) for f in os.listdir(a) if f.endswith(".mp4"))
        else:
            paths.append(a)
    s = session()
    for p in paths:
        upload(s, p, root)


if __name__ == "__main__":
    main()
