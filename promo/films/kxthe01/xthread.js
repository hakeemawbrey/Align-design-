// THE THREAD: EXTENDED (Month 2, batch m38, kxthe01–kxthe08): one whole night in the twelve signs' group chat, ~90 s.
// Rows: promo/films/month2/m38.md. Every episode imports this file:  import { makeXThread, … } from '../../kxthe01/xthread.js'
//
// It reuses the original series look read-only: makeThread from ../nthe01/chatkit.js draws the chat window, the stage
// strip (Pisces crying into a tissue box), the bug "THE THREAD" and the headline captions. Only its STORY scene is used:
// its end card and card frame are dropped (Month 2 rule: no end card, no card transition, no logo). makeThread's own
// fade-out sits at STORY_END, so we push STORY_END one second past the film's end and nothing ever fades: the film
// hard-cuts on its last story frame. Cues at or after DURATION (the end-card ones) are filtered out.
//
//   makeXThread(cfg) → { DURATION, SCENES, CUES }
//     cfg.len       the film length in seconds (the story; nothing is added after it)
//     cfg.overlays  xfx(spec) from ./xfx.js: the hook-kit layer (scratch, whip, promise, chapters, loading bar …)
//     everything else goes straight to makeThread (chat, heads, last, msgs, typing, stage, cry, pins, extra, cues …)
import { makeThread } from '../nthe01/chatkit.js'
// makeThread subtracts the old 4.4 s end-card length from cfg.duration to get STORY_END (we never import endcard.js)
const OLD_CARD = 4.4

export * from '../nthe01/chatkit.js'

export function makeXThread(cfg) {
  const DURATION = cfg.len
  const EP = makeThread({ ...cfg, duration: DURATION + 1 + OLD_CARD })
  // the story scene runs the whole film; makeThread's end is STORY_END + 0.01 = DURATION + 1.01, past the cut
  const fx = cfg.overlays ? cfg.overlays(EP.SCENES[0]) : { story: EP.SCENES[0], scenes: [], cues: [] }
  const SCENES = [fx.story, ...fx.scenes]
  const CUES = [...EP.CUES, ...fx.cues].filter(c => typeof c[1] !== 'number' || c[1] < DURATION - 0.05).sort((a, b) => a[1] - b[1])
  return { DURATION, SCENES, CUES }
}
