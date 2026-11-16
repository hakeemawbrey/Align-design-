// og-ksbe09: the social rework of ksbe09 (same room, cast and story). Static HOOK (box, 0–2.4) instead of the slam title;
//   kit: ./sbkit.js + ./sbshort.js (og social copies: no series bug, calm freeze card, no whip/shake, hard cut, text in the
//   safe zone); crazier Sag (shrugged into another postcode) and Taurus (ironed a shirt for it). Hard cut on the last line (no loop back).
// Original notes (ksbe09): "It's not a big deal" (♐ Sagittarius to ♉ Taurus). house · C. Loops back to frame 0.
//   frame 0: Sag mid-laugh-shrug, "IT'S NOT A BIG DEAL!" slamming, Taurus mid-crumble into falling pixels.
//   freeze on the shrug → "it was my *interview.*" → THE STARS → "I didn't know it mattered this much. I'm sorry I forgot
//   to *call*." → Taurus' pixels rebuild → "so tell me: *how did it go?*"  Pisces at the window cries.
import { makeShort } from './sbshort.js'
import { rect } from './sbkit.js'
import { prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
const TAU = signStar('taurus').color, REBUILD = 13.6
export const { DURATION, SCENES, CUES } = makeShort({
  room: 'living',
  A: { sign: 'sagittarius', red: 0, mood0: 'happy' }, B: { sign: 'taurus' }, P: { x: 820, y: 640, s: 130 },
  caption: 'Sag shrugged into another *postcode.*',
  caught: { x: 264, y: 1150, r: 150 },
  bad: { text: 'It’s not a *big deal!*' }, react: 'it was my *interview.* I ironed a shirt.',
  stars: ['you don’t have to feel it to *respect* it.', 'say you *see* it.'],
  better: 'I didn’t know it mattered this much. I’m sorry I forgot to *call*.',
  replies: ['…thank you for *saying that.*', null],
  talk: [{ who: 'A', kind: 'say', at: 15.9, out: 17.5, text: 'so tell me *everything.* every question.', cx: 420, cy: 870, maxW: 520 }],
  last: 'Their big deal | is *your* deal.',
  keys: { B: [[0, { squash: 0.25, s: 250 }], [2.4, { squash: 0.3 }], [REBUILD, { squash: 0, s: 280, d: 0.6 }]] },
  front(x, w, K) {
    const b = K.st.B; if (!b) return
    // pixels falling off Taurus (crumbling) until the apology; then they float back up
    for (let i = 0; i < 18; i++) {
      const ph = ((w * 0.7 + i / 18) % 1)
      const up = ease.inOutCubic(prog(w, REBUILD, REBUILD + 0.8))
      if (w > REBUILD + 0.8) continue
      const fx = b.x + ((i * 53) % 160) - 80, fy = b.y + 40 + ph * 160 * (1 - up) - up * 120 * ph
      x.globalAlpha = (1 - ph) * (1 - up * 0.6); rect(x, fx, fy, 14, 14, TAU); x.globalAlpha = 1
    }
  },
  cues: [['glitter', REBUILD, REBUILD + 0.8]],
})

// social hook: static caption from frame 0 (the film's own slam title is dropped by the social kit copy)
export const HOOK = 'Small to you. | *Huge* to them.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
