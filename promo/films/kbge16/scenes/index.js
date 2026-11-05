// kbge16: BIO GLOW-UP, "The bio from years ago" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Cancer's profile covered in dust and cobwebs, a dust cloud mid-poof off the card, an OLD tag flashing;
//         hook "Cancer’s bio is | *years* old."   0.35 colour flash · 1.35 circle "New to the city!" → STILL NEW?
//   2.75  strike, the pen blows the dust off · 3.5 the glow-up: "Not new anymore. Now I know the best soup in town. *Come try it.*"
//   glow: Pisces sobs "they grew up" · a message · 8.5 last line. Hard cut.
import { makeBio, signStar, tag, R, prog, ease, lerp } from '../../kbge01/biokit.js'
const TAU = signStar('taurus')
function dust(x, t, S) {
  const { CARD } = S
  const off = ease.inCubic(prog(t, S.T.strike[0], S.T.strike[0] + 0.6))
  if (off >= 1) return
  x.save(); x.globalAlpha *= 1 - off
  // cobwebs in the corners
  for (const [cx, cy, sx, sy] of [[CARD.x, CARD.y, 1, 1], [CARD.x + CARD.w, CARD.y, -1, 1], [CARD.x, CARD.y + CARD.h, 1, -1]]) {
    x.strokeStyle = 'rgba(230,225,240,0.85)'; x.lineWidth = 3
    for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + sx * 150 * Math.cos(i * 0.5), cy + sy * 150 * Math.sin(i * 0.5)); x.stroke() }
    for (let r = 40; r <= 130; r += 45) { x.beginPath(); for (let i = 0; i <= 3; i++) { const a = i * 0.5, px = cx + sx * r * Math.cos(a), py = cy + sy * r * Math.sin(a); i ? x.quadraticCurveTo(cx + sx * r * 0.8 * Math.cos(a - 0.25), cy + sy * r * 0.8 * Math.sin(a - 0.25), px, py) : x.moveTo(px, py) } x.stroke() }
  }
  // a grey dust film
  x.fillStyle = 'rgba(160,150,135,0.22)'; x.fillRect(CARD.x, CARD.y, CARD.w, CARD.h)
  for (let i = 0; i < 40; i++) R(x, 'rgba(120,110,95,0.5)', CARD.x + (i * 157) % CARD.w, CARD.y + (i * 263) % CARD.h, 6, 6)
  x.restore()
  // the dust cloud: mid-poof on frame 0, and again when it's blown off
  for (const [t0, k] of [[-0.25, 1], [S.T.strike[0], 1.3]]) {
    const p = prog(t, t0, t0 + 0.8)
    if (p <= 0 || p >= 1) continue
    for (let i = 0; i < 10; i++) {
      const a = i * 0.63, r = lerp(40, 260 * k, ease.outCubic(p)), px = 540 + Math.cos(a) * r * 1.3, py = CARD.y + 300 + Math.sin(a) * r * 0.6
      const g = x.createRadialGradient(px, py, 0, px, py, 90); g.addColorStop(0, `rgba(200,190,175,${0.55 * (1 - p)})`); g.addColorStop(1, 'rgba(200,190,175,0)')
      x.fillStyle = g; x.fillRect(px - 90, py - 90, 180, 180)
    }
  }
  if (off < 0.5) tag(x, t, CARD.x + CARD.w - 120, CARD.y + 120, -1, 'OLD', { col: '#7a6a50', size: 30, rot: 0.15 })
}
const EP = makeBio({
  id: 'kbge16', sign: 'cancer', name: 'Cancer', age: 31, D: 10,
  hook: 'Cancer’s bio is | *years* old.', hookColor: '#c9b48a',
  bad: 'New to the city! Show me around?',
  circle: { word: 'New to the city!', label: 'STILL NEW?' },
  says: [{ t: 1.9, text: 'babe, you know *every* street now.' }],
  good: 'Not new anymore. Now I know the best soup in town. *Come try it.*',
  fx: 'flash', cps: 32,
  reply: { body: 'I will absolutely *come try it.*', glyph: TAU.glyph, color: TAU.color },
  over: dust,
  last: 'Update the bio. | You *grew.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
