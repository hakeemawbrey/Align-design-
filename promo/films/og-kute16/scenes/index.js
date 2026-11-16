// og-kute16: the social rework of kute16, THE UNSENT TEXT, "The ex’s birthday" (10.6 s vertical).
// Same phone, cast and story; the kit copy is ../unsentkit.js (no series bug, no slam title).
//   0.00 frame 0: Cancer mid-fumble with a cupcake, candle flickering, "happy birthday!!! i made you a cake" mid-delete.
//        HOOK (static outline, until 3.3): "Cancer on their | ex’s *birthday.*" · 0.40 record scratch
//   1.50 "hbd. i kept your hoodie. and your mug." ✗ · 4.50 the long kind one, wiped 7.20
//   7.60 Cancer blows out the candle for them · 8.00 THE STARS, hard cut on the last line.
import { makeUnsent } from '../unsentkit.js'
import { box, R, INK, GOLD, clamp } from '../unsentkit.js'

export const HOOK = 'Cancer on their | ex’s *birthday.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.3

const BLOW = 7.6
// the cupcake in Cancer's claws: fumbled at frame 0, a flickering candle, blown out at BLOW (smoke curls up)
function cupcake(c, t) {
  const fum = t < 0.6 ? (1 - clamp(t / 0.6)) : 0
  const x = 310 + 30 * fum * Math.sin(t * 20), y = 1440 - 40 * fum
  c.save(); c.translate(x, y); c.rotate(0.3 * fum * Math.sin(t * 14))
  box(c, -50, -10, 100, 60, '#c47a4a', { b: 5 }); for (let i = 0; i < 4; i++) R(c, '#a8603a', -40 + i * 26, -6, 8, 52)
  box(c, -56, -52, 112, 46, '#ff8fb1', { b: 5, hi: '#ffc0d4' })
  R(c, INK, -6, -110, 12, 60); R(c, '#9fd8f6', -3, -107, 6, 54)
  if (t < BLOW) { const f = 1 + 0.15 * Math.sin(t * 23); R(c, INK, -9 * f, -142, 18 * f, 30); R(c, GOLD, -6 * f, -138, 12 * f, 24); R(c, '#fff1c8', -3, -130, 6, 12) }
  else for (let i = 0; i < 4; i++) { const p = ((t - BLOW) * 0.7 + i * 0.2); if (p > 1) continue; c.save(); c.globalAlpha = 0.6 * (1 - p); R(c, '#cfc8e8', -6 + 14 * Math.sin(p * 9 + i), -130 - p * 160, 12, 12); c.restore() }
  c.restore()
}
const EP = makeUnsent({
  id: 'og-kute16', duration: 10.6,
  sign: 'cancer', name: 'Cancer', to: 'the ex', status: 'last seen yesterday', statusCol: '#ff9fb8', avatar: '#ff8fb1',
  hook: '', ending: 'cut', draftBase: 2,
  msgs: [{ text: 'thank you for everything. really.', at: -9, stamp: '4 months ago' }],
  drafts: [
    { text: 'happy birthday!!! i made you a cake', at: -2.9, cps: 14, del: -0.3, delCps: 45 },
    { text: 'hbd. i kept your hoodie. and your mug.', at: 1.5, cps: 20, del: 3.5, delCps: 45 },
    { text: 'happy birthday. i hope this year is kind to you.', at: 4.5, cps: 20, del: 7.2, wipe: true },
  ],
  breaks: [{ kind: 'scratch', at: 0.4, len: 0.85, caption: 'Cancer baked. *For the ex.*' }],
  front: (c, t) => cupcake(c, t),
  heroHops: [BLOW],
  moods: [[-9, 'wide', [1, -0.5]], [1.5, 'squint', [1, -0.3]], [3.5, 'wide', [0, 0]], [4.5, 'sparkle', [1, -0.3]], [7.2, 'sparkle', [1, 0.5]], [BLOW, 'squint', [1, 0.6]], [8.0, 'happy', [1, 0.3]]],
  heroTears: t => t > 7.2 ? 1 : 0,
  lines: [{ t: 8.0, text: 'Some wishes stay *in* your heart.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
