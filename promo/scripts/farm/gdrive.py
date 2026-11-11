#!/usr/bin/env python3
"""Upload videos to Google Drive and share them by link (the posting app downloads from the link).
  gdrive.py folder "Star Talk/v3"                   -> prints the folder id (creates the path if needed)
  gdrive.py upload <folder_id> <file.mp4> [name]    -> prints the file's share link (replaces a same-name file)
Reads GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN (or GDRIVE_*) from the environment; never prints them."""
import json, os, sys, urllib.request, urllib.parse, uuid, time
def env(k): return os.environ.get('GOOGLE_' + k) or os.environ.get('GDRIVE_' + k) or ''
_tok = [None, 0]
def token():
    if _tok[0] and time.time() < _tok[1]: return _tok[0]
    d = urllib.parse.urlencode({'client_id': env('CLIENT_ID'), 'client_secret': env('CLIENT_SECRET'), 'refresh_token': env('REFRESH_TOKEN'), 'grant_type': 'refresh_token'}).encode()
    r = json.load(urllib.request.urlopen('https://oauth2.googleapis.com/token', d))
    _tok[:] = [r['access_token'], time.time() + 3000]; return _tok[0]
def api(method, url, body=None, headers=None, raw=False):
    for attempt in range(5):
        h = {'Authorization': 'Bearer ' + token(), **(headers or {})}
        data = body if raw or body is None else json.dumps(body).encode()
        if body is not None and not raw: h['Content-Type'] = 'application/json'
        try:
            with urllib.request.urlopen(urllib.request.Request(url, data=data, headers=h, method=method), timeout=600) as r:
                t = r.read(); return json.loads(t) if t else {}
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and attempt < 4: time.sleep(2 ** attempt * 3); continue
            raise SystemExit(f'Drive {method} failed: {e.code} {e.read()[:300]}')
        except (urllib.error.URLError, TimeoutError) as e:
            if attempt < 4: time.sleep(2 ** attempt * 3); continue
            raise
def q(s): return s.replace("\\", "\\\\").replace("'", "\\'")
def find(name, parent, folder):
    mt = " and mimeType='application/vnd.google-apps.folder'" if folder else ''
    r = api('GET', 'https://www.googleapis.com/drive/v3/files?' + urllib.parse.urlencode({'q': f"name='{q(name)}' and '{parent}' in parents and trashed=false{mt}", 'fields': 'files(id)'}))
    return [f['id'] for f in r.get('files', [])]
def folder(path):
    parent = 'root'
    for part in path.split('/'):
        ids = find(part, parent, True)
        parent = ids[0] if ids else api('POST', 'https://www.googleapis.com/drive/v3/files', {'name': part, 'mimeType': 'application/vnd.google-apps.folder', 'parents': [parent]})['id']
    return parent
def upload(parent, path, name=None):
    name = name or os.path.basename(path)
    for old in find(name, parent, False): api('PATCH', f'https://www.googleapis.com/drive/v3/files/{old}', {'trashed': True})
    meta = json.dumps({'name': name, 'parents': [parent]}).encode()
    size = os.path.getsize(path)
    for attempt in range(4):
        h = {'Authorization': 'Bearer ' + token(), 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': str(size)}
        req = urllib.request.Request('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', data=meta, headers=h, method='POST')
        loc = urllib.request.urlopen(req).headers['Location']
        try:
            with open(path, 'rb') as f:
                r = json.load(urllib.request.urlopen(urllib.request.Request(loc, data=f.read(), headers={'Content-Type': 'video/mp4'}, method='PUT'), timeout=900))
            break
        except Exception:
            if attempt == 3: raise
            time.sleep(10)
    api('POST', f"https://www.googleapis.com/drive/v3/files/{r['id']}/permissions", {'role': 'reader', 'type': 'anyone'})
    return f"https://drive.google.com/file/d/{r['id']}/view"
if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'folder': print(folder(sys.argv[2]))
    elif cmd == 'upload': print(upload(sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else None))
