// kbge17: BIO GLOW-UP, "Leo does not like hiking" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Leo's profile photo: Leo mid-slide down a mountain, little rocks flying; hook "Leo’s bio *lied* | about hiking."
//   0.35  whip zoom · 1.35 circle "Loves hiking." → FALSE, a lie-o-meter needle swings to FALSE · 2.75 strike
//   3.3   the glow-up: "Will hike if there's a *café at the top.*" · glow: a café pops on the peak, Leo sits up there, Pisces cries
//   a message · 8.5 last line. Hard cut.
import { makeBio, signStar, drawStarChar, R, INK, BONE, RED, INTER, tag, prog, ease, lerp, clamp } from '../../kbge01/biokit.js'
const SCO = signStar('scorpio'), LEO = signStar('leo')
function mountain(x, t, S) {
  const { PHOTO: P } = S
  const g = x.createLinearGradient(0, P.y, 0, P.y + P.h); g.addColorStop(0, '#3a6fb0'); g.addColorStop(1, '#9fd0f0'); x.fillStyle = g; x.fillRect(P.x, P.y, P.w, P.h)
  x.fillStyle = INK; x.beginPath(); x.moveTo(P.x - 10, P.y + P.h); x.lineTo(P.x + P.w * 0.4, P.y + 150); x.lineTo(P.x + P.w + 10, P.y + P.h); x.fill()
  x.fillStyle = '#6a5a8a'; x.beginPath(); x.moveTo(P.x, P.y + P.h); x.lineTo(P.x + P.w * 0.4, P.y + 160); x.lineTo(P.x + P.w, P.y + P.h); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(P.x + P.w * 0.4, P.y + 160); x.lineTo(P.x + P.w * 0.3, P.y + 225); x.lineTo(P.x + P.w * 0.5, P.y + 225); x.fill()
  // the café on top (after the glow)
  const ck = clamp(prog(t, S.T.glow - 0.1, S.T.glow + 0.2))
  if (ck > 0) { const cx = P.x + P.w * 0.4, cy = P.y + 150; x.save(); x.translate(cx, cy); x.scale(ck, ck); R(x, INK, -64, -74, 128, 78); R(x, '#f4e8cc', -60, -70, 120, 70); R(x, RED, -68, -96, 136, 28); x.font = `800 20px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CAFÉ', 0, -82); R(x, '#8a6236', -14, -40, 28, 36); x.restore() }
}
const slideXY = (t, S) => {
  const P = S.PHOTO
  if (t >= S.T.glow - 0.1) return [P.x + P.w * 0.4 - 140, P.y + 250]       // sitting at the top by the café
  const p = ((t * 0.45) % 1)
  return [lerp(P.x + P.w * 0.46, P.x + P.w * 0.92, p), lerp(P.y + 200, P.y + P.h - 40, p)]
}
function meter(x, t, S) {
  const k = clamp(prog(t, S.T.circle - 0.2, S.T.circle + 0.1)) * (1 - clamp(prog(t, S.T.strike[1], S.T.strike[1] + 0.2)))
  if (k <= 0) return
  const cx = S.PHOTO.x + 120, cy = S.PHOTO.y + S.PHOTO.h - 40
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -96, -96, 192, 108); R(x, '#fffdf6', -90, -90, 180, 96)
  x.font = `800 18px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('LIE-O-METER', 0, -64)
  x.fillStyle = '#22a05f'; x.fillText('TRUE', -52, 0); x.fillStyle = RED; x.fillText('FALSE', 52, 0)
  const a = lerp(-1.2, 1.15, ease.outBack(prog(t, S.T.circle, S.T.circle + 0.4))) + 0.06 * Math.sin(t * 30)
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 4); x.lineTo(Math.sin(a) * 62, 4 - Math.cos(a) * 52); x.stroke()
  x.restore()
}
const EP = makeBio({
  id: 'kbge17', sign: 'leo', name: 'Leo', age: 29, D: 10,
  hook: 'Leo’s bio *lied* | about hiking.', hookColor: '#ffc94a',
  bad: 'Loves hiking.', bioSize: 64,
  circle: { word: 'Loves hiking.', label: 'FALSE' },
  says: [{ t: 1.9, text: 'sweetie, you *slid* down it.' }],
  good: 'Will hike if there’s a *café at the top.*',
  fx: 'whip', cps: 26,
  T: { strike: [2.75, 3.05], swap: 3.2 },
  reply: { body: 'I’ll carry the snacks. *Café* is on me.', glyph: SCO.glyph, color: SCO.color },
  starS: 170, starXY: slideXY,
  starOpts: (t, S) => ({ squash: t < S.T.glow - 0.1 ? 0.1 : 0 }),
  mood: (t, S) => t >= S.T.glow ? 'sparkle' : 'wide',
  photoBase: (x, t, S) => mountain(x, t, S),
  photo: (x, t, S) => {
    const [sx, sy] = slideXY(t, S), up = t >= S.T.glow - 0.1
    drawStarChar(x, sx, sy, 170, t, { color: LEO.color, glyph: LEO.glyph, mood: up ? 'sparkle' : 'wide', look: up ? [0, 0] : [-1, -1], seed: 3, squash: up ? 0 : 0.1, hops: [S.T.glow + 0.05, S.T.glow + 0.4] })
    // little rocks tumbling after the slide
    if (!up) for (let i = 0; i < 4; i++) { const p = (t * 1.6 + i * 0.25) % 1; R(x, INK, sx + 30 + p * 120 - i * 14, sy + 40 + p * 90, 12, 12); R(x, '#8c86a8', sx + 32 + p * 120 - i * 14, sy + 42 + p * 90, 8, 8) }
    meter(x, t, S)
  },
  last: 'Honest bios get | *honest* matches.',
})
void tag
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
