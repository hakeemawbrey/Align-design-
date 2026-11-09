# Align Video Lab: the evolving playbook

**Portal:** https://claude.ai/artifact/NETEdhadQkdZATc4Xuq67M (private to the owner)

Drop any video, Short or channel that inspires you into the portal, or paste
it to Claude in chat. Claude studies it and adds what it learns to the
playbook. Every study adds rules, sources and Align ideas, so the playbook
keeps getting sharper.

`portal.html` here is the page's source. The playbook itself lives in the
portal's database, not in this repo. This repo is public, and the playbook
quotes other people's titles and numbers.

## For Claude: going through the inbox

When asked to "go through my Video Lab inbox", or when handed a link:

1. **Read the inbox.** `ArtifactData list` on `inbox` at the portal URL. Work through each doc with `status: "new"`, plus any links pasted in chat (add those to `inbox` first).
2. **Quick read (works in the cloud).** For a YouTube channel, video or Short:
   ```bash
   pip install -q yt-dlp   # if missing
   cd study && node src/quick.mjs "<link>" --limit 500
   ```
   This writes `study/pack/yt-<channel>/quick.md`, `quick.json`, `quick-top.jpg` and `quick-bottom.jpg` (git-ignored). Read `quick.md`, and look at both thumbnail sheets. YouTube blocks full video downloads from cloud machines (the "not a bot" check), so the cloud only gets titles, views, lengths and thumbnails.
   For a single video, also note what the person said caught their eye (`note`), and look at that video's thumbnail (`https://i.ytimg.com/vi/<id>/hqdefault.jpg`).
   For Instagram, TikTok or Facebook links, the cloud can't read them. Ask for a Mac study (step 3).
3. **Full study (on the Mac).** For channels worth going deep on, tell the person to double-click **Study YouTube Channel** (or Instagram or Facebook) and paste the link. The pack goes to their private `align-study` repo. Then read `posts.json`, `report.md`, `sheets/` and `thumbs/` from there (see `study/README.md`). This adds transcripts, on-screen text and stills from the hook.
4. **Update the playbook**, all in one `ArtifactData batch`:
   - `sources/<handle>`: `{ name, url, handle, platform, depth: "quick"|"deep", subs, uploads, typicalViews, studiedAt, summary, works[], borrow[], avoid[] }`
   - `rules/<slug>`: `{ area, rule, why, alignUse, strength 1-5, evidence: [{ source, url, note }], updatedAt }`. `area` is one of `packaging hook structure retention visual voice topic format cta channel`.
     **Merge, don't pile up.** If a rule already says the same thing, add this source to its `evidence` and raise `strength` (1 = one source, 2 = one source with clear numbers, 3 = two or three sources, 4 = four or more, 5 = also proven on Align's own posts). If a new source contradicts a rule, say so in `why` and lower `strength`. Pin each write with `if_version`.
   - `ideas/<slug>`: 2-4 slim Align versions of what works: `{ title, hook, format, beats[], from, status: "idea", createdAt }`. Align is a dating app with an astrology and tarot-card look; ideas are about love, dating and signs. Quote the source only in short pieces, the same rule as `founder/`.
   - `inbox/<id>`: `update` with `status: "read"` (quick read) or `"studied"` (full study), plus `reply`, a two-line takeaway, and `title`.
5. **Tell the person** what changed in a few lines: new rules, rules that got stronger, and the best new idea.

Every claim needs a number behind it ("78% of the top quarter vs 33% of the bottom"), or it says it's a hunch. Lifetime views favour older uploads, so treat the newest few as still climbing.
