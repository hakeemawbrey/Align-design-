// og-ksbe14: social rework of ksbe14 (static HOOK outline 0–3.0 replaces the slammed hook; no bug or episode number;
//   Aries is FINE (steaming), Gemini is going to three places at once and brings a cake from each of them). Kit: og copies in ./ and ../hookkit.js.
// Was: ksbe14: SAY IT BETTER ep 14, "Do whatever you want" (♈ Aries to ♊ Gemini, who's packing). funk · C. Hard cut.
//   frame 0: Gemini's half-packed suitcase mid-burst, clothes flying, Aries turning away under "DO WHATEVER YOU WANT."
//   freeze ("that sentence is a *trap.*") → Gemini: "great! so… I'll *go?*" (Aries steams) → THE STARS: "no *tests*." →
//   "Honestly? I'd love you at my birthday dinner. Can you be back by *Saturday?*" → "I'll *be there.*"  Pisces cries.
import { makeShort } from './sbshort.js'
import { rect, INK } from './sbkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'
export const HOOK = 'Gemini took “do | whatever” *literally.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
const CLOTHES = [['#ff8fb1', -1.2, 0], ['#7fd0f0', -0.4, 1], ['#f2c75c', 0.5, 2], ['#9fe6b0', 1.1, 3], ['#c9a6ff', 0.0, 4]]
export const { DURATION, SCENES, CUES } = makeShort({
  room: 'bedroom',
  A: { sign: 'aries', red: 0.3, mood0: 'squint' }, B: { sign: 'gemini' }, P: { x: 330, y: 640, s: 120, look: [1, 1] },
  hook: 'That’s not a yes. | It’s a *test.*', caption: 'that sentence is a *trap.*',
  bad: { text: 'Do whatever. I’m *FINE.*' }, react: 'great! I’m going to *three* places!',
  stars: ['no *tests*.', 'say what you *actually* want.'],
  better: 'Honestly? I’d love you at my birthday dinner. Can you be back by *Saturday?*',
  replies: ['I’ll *be there.* cancelling two trips.', 'and *two cakes.* one from each of me.'],
  last: 'Say the *want*, | skip the test.',
  keys: { A: [[0, { look: [-1, 0] }], [2.5, { steam: 1, red: 0.6, d: 0.3 }], [4.4, { steam: 0 }]] },
  draw(x, w) {
    // the suitcase on the bed, lid open, clothes flying out at frame 0
    const X = 640, Y = 1010
    rect(x, X, Y - 20, 260, 90, INK); rect(x, X + 6, Y - 14, 248, 78, '#c0392b')
    x.save(); x.translate(X + 6, Y - 14); x.rotate(-1.1); rect(x, 0, -80, 250, 80, INK); rect(x, 6, -74, 238, 68, '#e0563f'); x.restore()
    for (const [c, vx, i] of CLOTHES) {
      const p = prog(w, -0.5, 1.1)
      if (p >= 1) { rect(x, X + 20 + i * 44, Y + 40, 40, 16, c); continue }
      const e = ease.outCubic(p)
      const cx = X + 130 + vx * 260 * e, cy = Y - 40 - Math.sin(Math.PI * e) * 360 + e * 120
      x.save(); x.translate(cx, cy); x.rotate(e * 6 * vx); rect(x, -34, -24, 68, 48, INK); rect(x, -28, -18, 56, 36, c); x.restore()
    }
  },
})
