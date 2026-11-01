# Render helper: re-render a share of the Star Talk films, publish them, copy them to Drive

You are one of four helper sessions. The main session can only render ~8 films an hour on its 4-core machine, so the
re-render queue (all Star Talk films, re-cut with one card transition per video, no season numbers, no end-card flip)
was split four ways. Your share is `promo/library/farm/h<N>.txt` (N is in your first message). Work through it on this
machine, put each finished film on its Star Talk library page, and copy the full-quality 1080p version to Google
Drive. The code changes are already committed; you don't edit any film.

## 1. Start the render workers
```bash
cd <repo root>                        # the checkout of branch claude/align-promo-video
bash promo/scripts/farm/setup.sh promo/library/farm/h<N>.txt
LINGER=0 nohup /tmp/claude-0/workers.sh 1 3 > /dev/null 2>&1 &
```
- Each film: sound build → 1080×1920 render → `promo/out/films/<f>/align-<f>-v2-send.mp4` (1080p, for Drive) →
  `promo/out/web/<f>.mp4` (720p web copy) + `promo/out/web/posters/<f>.jpg`. Progress: `/tmp/claude-0/workers.log`
  (`start`, `done`, `FAIL`; a failed film is requeued once automatically).
- A film takes ~15–40 min per slot. Don't start more than 3 slots. Don't run `pkill -f` patterns that could match
  your own shell; kill specific PIDs if you must.
- If a render hangs (no new frames in `promo/out/frames` for 15 min and no ffmpeg running), kill that film's
  render.mjs PID; the worker requeues it.

## 2. Every ~8 finished films (or when the workers are done), run one round
Wait with a background command, not `sleep` polling, e.g. a loop that exits when ≥ 8 web copies exist in
`promo/out/web/` or no `render.mjs` is running and the queue is empty (give it the maximum timeout).

A film is finished when `promo/out/web/<f>.mp4`, `promo/out/web/posters/<f>.jpg` and the send mp4 all exist and
`workers.log` has its `done` line.

For each round:
1. **Library pages.** `promo/library/lib.json` gives each film's `page`; `promo/library/pages.json` gives each page's
   `url`. Before your first upload to a page, `Artifact` action `read` it once. Upload with `Artifact` (publish,
   `url` = the page, `asset: true`, `file_paths` = absolute paths of the web mp4s and posters for that page, at most
   20 per call). Record every returned `/_blob/<id>` in `promo/library/uploads/h<N>.json` as
   `{"<film id>": {"video": "/_blob/…", "poster": "/_blob/…"}}` (merge into what's there).
   - Never publish the page itself and never delete assets: the main session rebuilds and republishes the pages.
   - If an upload says the page's storage is full, stop uploading to that page and say so in your report.
2. **Google Drive (1080p).** Follow `promo/DRIVE-UPLOAD.md` for auth (secrets `GDRIVE_CLIENT_ID`,
   `GDRIVE_CLIENT_SECRET`, `GDRIVE_REFRESH_TOKEN` are environment variables; never print, log or commit them) and the
   curl calls. Upload the send mp4 (`align-<f>-v2-send.mp4`), not the web copy, named `<Title> (<film id>).mp4`
   (title from lib.json). Folders: `Star Talk/<section name>`, where the section name comes from the film's page in
   pages.json (`sections[].key` = the film's `group`); for group `shows`, use `Star Talk/<show name>` instead
   (lib.json `show`). Find a folder by name before creating it; other helpers create the same folders, so after
   creating one, list again and use the oldest if there are duplicates. If a file with the same name exists in the
   folder, replace its content (`PATCH` upload to that file id) instead of adding a second copy. Check the returned
   `size` matches. If the GDRIVE secrets are missing, skip Drive, keep going with the pages, and say so in your report.
3. **Clean up** each film that went to both places: delete its web mp4, poster and send mp4 (the disk is small).
4. **Commit** only `promo/library/uploads/h<N>.json`: `git add` that file, commit "Library uploads: h<N> (+<k> films)"
   with your session's attribution lines, then `git pull --rebase origin claude/align-promo-video` and
   `git push -u origin claude/align-promo-video` (retry on network errors). Never commit anything else.

## 3. Finish
When the queue is empty, all workers have exited and the last round is done, report: films rendered, uploaded to the
pages, copied to Drive, the "Star Talk" Drive folder link, and every film that failed (with the error).
