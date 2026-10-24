# Align Founder Studio

Talking-head scripts for Hakeem's founder page, learned from a creator whose
founder videos work: Sarah Perl, **@hothighpriestess**, the founder of the
manifestation app Stella. The program scores every reel of hers we could find,
then writes an Align version of each. It keeps her move (the hook type and the
shape of the video) and swaps the subject for a true Align story. You can
remix any version, promote the best take, schedule it for filming, and read it
off a teleprompter.

Nothing of hers is reused. Only the structure carries over. Every Align line
comes from facts in this repo, and anything only Hakeem knows (a real number, a
date) is left as a `[bracket]` to fill in, never guessed.

## What's here

| Path | What |
| --- | --- |
| `out/report.md` | every reel ranked with its score, next to its Align version |
| `out/scores.csv` | the same as a spreadsheet, with craft / proof / fit columns |
| `out/scripts/*.json` | one Align script per reel: hook, beats with b-roll and on-screen text, CTA, caption |
| `app/dist/studio.html` | the studio (below), with all of the above baked in |
| `data/creators/<handle>/videos.json` | the research per creator: their videos with hooks, formats, beats, public numbers and sources |
| `data/creators/<handle>/patterns.json` | what that creator's videos do, and how to carry it over to Align |
| `data/rubric.json` | how a reel is scored: 8 weighted dimensions, 24 hook formulas, 13 formats, with sources |
| `data/align-brief.json` | Align's facts, voice rules, story angles and b-roll moments, pulled from this repo |
| `src/library.mjs` | the Align side: 19 true story angles, 27 hook types, 15 video formats |
| `src/score.mjs` | the scorer |
| `src/adapt.mjs` | reel → Align script, and remix |
| `src/crunch.mjs` | runs it all and builds the studio |

## The studio

It's published as an artifact at **https://claude.ai/artifact/3RfMzDbkrhUZ5tumifVLuj**
(private until shared from the page's Share menu). Four views:

- **Scored reels**: her reels ranked. Pick one to see its score, the reasons,
  and your Align version beside it. Edit any line and the score updates as you
  type.
- **Remix**: choose a different hook type, format or Align story (or press
  **Surprise me**), then **Save version**. **Rewrite with Claude** sharpens a
  version on your Claude account; read it before filming.
- **Promote**: the promoted take leads that reel and shows on the pipeline.
  One per reel.
- **Pipeline**: Draft → Promoted → Scheduled → Filmed → Posted.
- **Filming calendar**: pick a date and time under **Film on** and press
  **Schedule**. **Download calendar (.ics)** puts every shoot in your calendar,
  with the script in the event notes.
- **Teleprompter**: full-screen, scrolling, with a speed control and a mirror
  mode for a beam-splitter rig. Space starts and pauses it.

On claude.ai, saved versions live in the artifact's database, so they follow
you to your phone. Opened as a plain file, they're kept in that browser.

## How a reel is scored

Out of 100, from three parts:

- **Craft**: the rubric run over her words (hook, caption). Each dimension
  starts at 5/10, its patterns and words add or take away, and its rule (hook
  under 14 words, three or more numbers, the last line looping back to the
  hook...) adjusts it. Weights: hook 22, specificity 15, story tension 14,
  authenticity 12, relatability 12, share/save 10, CTA 8, trend fit 7.
- **Proof**: how it did, ranked against the rest of that creator's set (never
  across creators: their audiences differ) on views or likes and comments. Every number we have came from search snippets or her own
  claims, so all of them count for 75%.
- **Fit**: how well it becomes an Align founder video. Talking-head formats and
  topics Align has a story for score higher.

With numbers: craft 35%, proof 45%, fit 20%. Without: craft 70%, fit 30%.
Align versions are scored on craft (80%) and fit (20%), since they haven't been
posted yet.

The weights are an informed estimate from public research (see
`data/rubric.json` → `sources`), not platform truth. Tune them against your own
view counts once you've posted a few.

## Add more reels

Instagram doesn't let this program read her account directly. Public search
only turned up 48 videos, mostly TikTok, with captions as indexed. To add
the reels you actually watch, put a CSV in `data/imports/` (any filename):

```csv
url,date,hook,caption,transcript,format,views,likes,comments
https://www.instagram.com/reel/XXXX/,2026-10-01,"THE ___ METHOD","caption text","what she says","talking head tutorial",1.2M,85K,1,204
```

Only `hook` or `caption` is required. Add a `creator` column (the handle,
without @) to file a row under that creator; blank rows count as yours. Numbers you read off the post count as
verified. Leave them blank if you don't know them. A row with the same URL as a
researched video replaces it. Then:

```bash
cd founder
npm install
npm run crunch     # rebuild out/ and the studio, print the top 10
npm test
```

Republish `app/dist/studio.html` to the same artifact after a crunch, and your
saved versions carry over.

## Add another creator

Make `data/creators/<handle>/videos.json` in the same shape as the existing
ones (a `creator` object with a short `prefix` for ids, and a `videos` list),
plus a `patterns.json` with `summary` and `forAlign`. Run `npm run crunch`:
the creator shows up in the report and in the studio's creator filter.

## Write a new Align story

Add an angle to `ANGLES` in `src/library.mjs`. Fill every slot (`thing`,
`premise`, `claim`, `hate`, `how`, `proof`...) with true lines in the house
voice: short sentences, no exclamation marks, no "manifest", no hard sell,
astrology reads and never decides. `npm test` builds every angle × hook ×
format and fails on an empty slot, an exclamation mark or a banned word.
