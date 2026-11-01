# Upload the Star Talk videos to Google Drive

Copy every Star Talk video from the two private claude.ai Artifact pages below into a **"Star Talk"** folder in the
user's Google Drive, one subfolder per show/section. Safe to re-run: skip any file already in the target folder.

## Where the videos are

Both are the user's own Artifacts (use the **Artifact** tool, never curl/WebFetch on them):

- Star Talk screening room: https://claude.ai/artifact/WP4ZQKr4hrFS2kSp5BevXo
  (the 13 "Star Talk Shows" and the earlier Star Talk seasons; data for each film: id, season, show, title, video, poster)
- Film archive (incl. the 92 Star Talk Remixes): https://claude.ai/artifact/DukMG6Gz1rf8dbPFuENYDb

Steps:
1. `Artifact` action `read` with each `url` → the page HTML. The film list is embedded in it as JSON; each film's
   `video` is a `/_blob/<32-hex id>` URL. Build a list: id, show (or season/section), title, asset id.
   (`Artifact` action `list`, `scope: "assets"`, `url` also lists the stored files if needed.)
2. For each video: `Artifact` action `read` with `url` and `path: "<asset id>"` saves it locally (the result says where).
   Do them in small batches and delete each local file after it uploads (the disk is small).

New renders are still being added to these pages by another session (all 616 Star Talk films are being re-rendered
with one card transition per video and no season numbers). Re-running this later picks up the new ones; when a
film's video changed, replace the Drive file of the same name.

## Google Drive access

The user added three secrets in the environment settings: `GDRIVE_CLIENT_ID`, `GDRIVE_CLIENT_SECRET`,
`GDRIVE_REFRESH_TOKEN` (OAuth client + refresh token, scope `drive.file`). Check they are present as environment
variables (don't print their values). If they aren't, read /root/.ccr/README.md to see how network secrets are
applied, and if still missing, tell the user which ones are missing. `www.googleapis.com` and `oauth2.googleapis.com`
are reachable from the container.

```bash
# access token (lasts ~1 h; refresh when you get a 401)
TOKEN=$(curl -s https://oauth2.googleapis.com/token -d client_id="$GDRIVE_CLIENT_ID" -d client_secret="$GDRIVE_CLIENT_SECRET" \
  -d refresh_token="$GDRIVE_REFRESH_TOKEN" -d grant_type=refresh_token | python3 -c 'import sys,json;print(json.load(sys.stdin)["access_token"])')

# folder (create "Star Talk" in My Drive, then one subfolder per show/section; reuse if it exists)
curl -s -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' https://www.googleapis.com/drive/v3/files \
  -d '{"name":"Star Talk","mimeType":"application/vnd.google-apps.folder"}'          # add "parents":["<id>"] for subfolders

# list a folder (to skip what's there)
curl -s -G -H "Authorization: Bearer $TOKEN" https://www.googleapis.com/drive/v3/files \
  --data-urlencode "q='<folderId>' in parents and trashed=false" --data-urlencode 'fields=files(id,name,size)' --data-urlencode 'pageSize=1000'

# resumable upload of one mp4
LOC=$(curl -s -D - -o /dev/null -X POST -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json; charset=UTF-8' \
  -H 'X-Upload-Content-Type: video/mp4' 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable' \
  -d '{"name":"<Title> (<id>).mp4","parents":["<folderId>"]}' | tr -d '\r' | awk 'tolower($1)=="location:"{print $2}')
curl -s -X PUT -H "Authorization: Bearer $TOKEN" -H 'Content-Type: video/mp4' --data-binary @file.mp4 "$LOC"
```

File names: `<Title> (<film id>).mp4`, e.g. `Dealt. (sxorbit1).mp4`. Check that each upload's returned `size` matches
the local file. At the end, report how many went up per folder and the "Star Talk" folder link
(`https://drive.google.com/drive/folders/<id>`), and list anything that failed.

Never paste the secrets into chat, commits or logs.
