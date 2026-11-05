// kute16: THE UNSENT TEXT, "The ex’s birthday" (10 s vertical trial reel, music: lofi · Db).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Cancer mid-fumble with a cupcake, candle flickering, "happy birthday!!!" mid-delete · 0.40 record scratch
//   1.50 "hbd. hope you're happy" ✗ · 4.00 the long kind one, wiped 6.60 · 7.00 Cancer blows out the candle for them · 7.40 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'
// the cupcake in Cancer's claws: fumbled at frame 0, a flickering candle, blown out at 7.0 (smoke curls up)
function cupcake(c, t) {
  const fum = t < 0.6 ? (1 - clamp(t / 0.6)) : 0
  const x = 300 + 30 * fum * Math.sin(t * 20), y = 1450 - 40 * fum
  c.save(); c.translate(x, y); c.rotate(0.3 * fum * Math.sin(t * 14))
  box(c, -50, -10, 100, 60, '#c47a4a', { b: 5 }); for (let i = 0; i < 4; i++) R(c, '#a8603a', -40 + i * 26, -6, 8, 52)
  box(c, -56, -52, 112, 46, '#ff8fb1', { b: 5, hi: '#ffc0d4' })
  R(c, INK, -6, -110, 12, 60); R(c, '#9fd8f6', -3, -107, 6, 54)
  if (t < 7.0) { const f = 1 + 0.15 * Math.sin(t * 23); R(c, INK, -9 * f, -142, 18 * f, 30); R(c, GOLD, -6 * f, -138, 12 * f, 24); R(c, '#fff1c8', -3, -130, 6, 12) }
  else for (let i = 0; i < 4; i++) { const p = ((t - 7.0) * 0.7 + i * 0.2); if (p > 1) continue; c.save(); c.globalAlpha = 0.6 * (1 - p); R(c, '#cfc8e8', -6 + 14 * Math.sin(p * 9 + i), -130 - p * 160, 12, 12); c.restore() }
  c.restore()
}
const EP = makeUnsent({
  id: 'kute16', duration: 10,
  sign: 'cancer', name: 'Cancer', to: 'the ex', status: 'last seen yesterday', statusCol: '#ff9fb8', avatar: '#ff8fb1',
  hook: 'Ex’s birthday. | Thumb *hovering.*', ending: 'cut', draftBase: 2,
  msgs: [{ text: 'thank you for everything. really.', at: -9, stamp: '4 months ago' }],
  drafts: [
    { text: 'happy birthday!!!', at: -1.6, cps: 14, del: -0.25, delCps: 24 },
    { text: 'hbd. hope you’re happy', at: 1.5, cps: 15, del: 3.4, delCps: 32 },
    { text: 'happy birthday. i hope this year is kind to you.', at: 3.9, cps: 20, del: 6.6, wipe: true },
  ],
  breaks: [{ kind: 'scratch', at: 0.4, len: 0.85, caption: 'it’s *their* birthday.' }],
  front: (c, t) => cupcake(c, t),
  heroHops: [7.0],
  moods: [[-9, 'wide', [1, -0.5]], [1.5, 'squint', [1, -0.3]], [3.4, 'wide', [0, 0]], [3.9, 'sparkle', [1, -0.3]], [6.6, 'sparkle', [1, 0.5]], [7.0, 'squint', [1, 0.6]], [7.4, 'happy', [1, 0.3]]],
  heroTears: t => t > 6.6 ? 1 : 0,
  lines: [{ t: 7.4, text: 'Some wishes stay *in* your heart.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
