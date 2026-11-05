// kpjue02 · PLANET TALK: JUPITER → TAURUS · "Taurus Takes a New Seat" (28 s, star_advice, hard cut).
//   0.0  frame 0: Jupiter just cannonballed onto Taurus's couch (squash), cushions flying, Taurus launched mid-air
//        with a snack. Hook "TAURUS. Off the couch. Adventure." Shake + whip at 0.5.
//   3.0  same café, same order, single and comfy.   7.2  growth ≠ giving up comfort.   11.8  keep one, change one.
//  16.2  same café, NEW seat: says hi.   21.8  Pisces the barista cries into the foam.   24.8  last line, hard cut.
import { drawSpace, drawSign, entrance, drawEntranceFx, entranceCues, planetSize } from '../../planetkit.js'
import { whipZoom, whipZoomCues, screenShake, shakeCues } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, sticker, pr, easeOut, easeInOut, rr, INK, BONE, GOLD } from '../../kpjue01/jupkit.js'

export const DURATION = 28
const JS = planetSize('jupiter', 560)
const IN = { at: -0.78, x: 540, y: 660, size: JS }
const HOOK = { at: -1, text: 'TAURUS. | Off the couch. *Adventure.*', top: 1650, size: 92, out: [2.7, 2.95] }
const SHAKE = { at: -0.08, len: 0.6, amp: 30 }
const WHIP = { at: 0.55, from: 1.45 }
const CAFE = 16.0

const B = [
  { t0: 3.0, t1: 7.0, x: 540, y: 1060, who: 'taurus', text: 'Same café. Same order. Same seat. Single and *comfy.*', tail: 60, maxW: 720 },
  { t0: 7.2, t1: 11.6, x: 540, y: 1060, who: 'jupiter', text: 'Kiddo, in astrology I’m growth. Growth doesn’t mean giving up *comfort.*', tail: 0, tailUp: true, maxW: 740 },
  { t0: 11.8, t1: 15.8, x: 540, y: 1060, who: 'jupiter', text: 'Keep one familiar thing. Change *one* thing.', tail: 0, tailUp: true },
  { t0: 16.5, t1: 19.0, x: 360, y: 1030, who: 'taurus', text: 'hi… is that the *cinnamon* one?', tail: -60 },
  { t0: 19.2, t1: 21.6, x: 720, y: 1030, who: 'libra', text: 'It’s the *best* one. Sit!', tail: 60 },
  { t0: 21.8, t1: 24.6, x: 540, y: 820, who: 'pisces', text: 'you made a *FRIEND* 😭', tail: 120 },
  { t0: 24.8, t1: 29, x: 400, y: 1050, who: 'taurus', text: 'New seat. Old snack. *Growth.*', tail: -40 },
]

function couch(x, X, Y, sq = 0) {
  x.save(); x.translate(X, Y); x.scale(1 + sq, 1 - sq)
  x.fillStyle = '#7a4fd0'; x.strokeStyle = INK; x.lineWidth = 8
  rr(x, -330, -150, 660, 160, 40); x.fill(); x.stroke()
  rr(x, -380, -60, 760, 130, 40); x.fill(); x.stroke()
  x.fillStyle = '#5b3aa8'; rr(x, -400, -110, 90, 180, 36); x.fill(); x.stroke(); rr(x, 310, -110, 90, 180, 36); x.fill(); x.stroke()
  x.restore()
}
function cup(x, X, Y, s = 1, label = '') {
  x.save(); x.translate(X, Y); x.scale(s, s)
  x.fillStyle = BONE; x.strokeStyle = INK; x.lineWidth = 6
  x.beginPath(); x.moveTo(-50, -60); x.lineTo(50, -60); x.lineTo(38, 60); x.lineTo(-38, 60); x.closePath(); x.fill(); x.stroke()
  x.fillStyle = '#c9864a'; x.fillRect(-46, -20, 92, 30)
  if (label) { x.fillStyle = INK; x.font = '800 20px Inter'; x.textAlign = 'center'; x.fillText(label, 0, 2) }
  x.restore()
}
function table(x, X, Y) {
  x.fillStyle = '#5a3a2a'; x.strokeStyle = INK; x.lineWidth = 8
  rr(x, X - 170, Y, 340, 34, 12); x.fill(); x.stroke(); x.fillRect(X - 14, Y + 34, 28, 150)
}

function draw(x, t, H) {
  drawSpace(x, t, { planet: 'jupiter', seed: 5, horizon: { y: 1580, color: '#2b1a40' } })
  const cafe = t >= CAFE
  // Jupiter
  const P = entrance('crash', t, IN)
  drawEntranceFx(x, 'jupiter', 'crash', t, IN)
  const shrink = easeInOut(pr(t, CAFE - 0.3, CAFE + 0.4))
  const jx = P.x + (220 - 540) * shrink, jy = P.y + (430 - 660) * shrink, js = P.size * (1 - 0.45 * shrink)
  drawJupiter(x, jx, jy, js, t, { squash: P.squash, mood: t < 3 ? 'wide' : 'happy', tears: t > 21.8 ? 1 : 0, lines: H.lines, look: cafe ? [0.8, 0.8] : [0, 0.8], hops: [7.3, 11.9, 25] })
  if (!cafe) {
    // the couch + Taurus (launched at frame 0, lands at ~1.3, sinks back in)
    const sq = t < 1 ? 0.12 * Math.exp(-t * 4) * Math.cos(t * 20) : 0
    couch(x, 540, 1500, sq)
    const air = t < 1.3 ? Math.sin((t + 0.3) / 1.6 * Math.PI) : 0
    const tx = 540 + (t < 1.3 ? 80 * (1 - t / 1.3) : 0), ty = 1380 - air * 420
    drawSign(x, 'taurus', tx, ty, 290, t, { mood: t < 1.3 ? 'wide' : t < 7.2 ? 'sleepy' : 'squint', rot: t < 1.3 ? 0.4 * (1 - t / 1.3) : 0, lines: H.lines, look: [0, -1] })
    // snack flying / held
    const sx = t < 1.3 ? tx + 160 + 120 * t : 700, sy = t < 1.3 ? ty - 160 - 200 * Math.sin(t * 2) : 1360
    x.save(); x.translate(sx, sy); x.rotate(t < 1.3 ? t * 8 : 0.2)
    x.fillStyle = '#f2c75c'; x.strokeStyle = INK; x.lineWidth = 6; rr(x, -46, -30, 92, 60, 14); x.fill(); x.stroke()
    x.fillStyle = INK; x.font = '800 22px Inter'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SNACK', 0, 2); x.restore()
    // flying cushions
    if (t < 1.8) for (let i = 0; i < 3; i++) {
      const k = t + 0.2, cx = 540 + (i - 1) * 320 + (i - 1) * k * 300, cy = 1380 - Math.sin(Math.min(1, k / 1.6) * Math.PI) * (380 + i * 90)
      x.save(); x.translate(cx, cy); x.rotate(k * (3 + i)); x.fillStyle = ['#ff8fb1', '#7fe0ff', '#f2c75c'][i]; x.strokeStyle = INK; x.lineWidth = 6
      rr(x, -60, -40, 120, 80, 22); x.fill(); x.stroke(); x.restore()
    }
    // the weekly routine: SAME stamps
    if (t > 3.2 && t < 7.1) ['MON', 'WED', 'FRI', 'SUN'].forEach((d, i) => {
      const k = easeOut(pr(t, 3.4 + i * 0.6, 3.7 + i * 0.6))
      if (k > 0) { cup(x, 200 + i * 230, 1270, 0.9 * k, 'SAME'); sticker(x, d, 200 + i * 230, 1180, { size: 28, scale: k, rot: (i % 2 ? 0.08 : -0.08) }) }
    })
    // keep one / change one cards
    if (t > 12.2 && t < 15.9) {
      const k1 = easeOut(pr(t, 12.4, 12.7)), k2 = easeOut(pr(t, 13.6, 13.9))
      sticker(x, 'KEEP: the cinnamon bun', 540, 1220, { size: 34, scale: k1, rot: -0.05 })
      sticker(x, 'CHANGE: the seat', 540, 1310, { size: 34, scale: k2, rot: 0.05, bg: '#7dffb0' })
    }
  } else {
    // the café: counter with Pisces the barista, a table, the new seat
    const k = easeOut(pr(t, CAFE, CAFE + 0.5))
    x.save(); x.globalAlpha = k
    x.fillStyle = '#3a2350'; rr(x, 560, 640, 480, 70, 16); x.fill(); x.strokeStyle = INK; x.lineWidth = 8; x.stroke()
    x.fillStyle = '#2a1840'; x.fillRect(580, 710, 440, 140)
    sticker(x, 'SAME CAFÉ', 800, 880, { size: 34, rot: 0.04 })
    x.restore()
    pisces(x, 800, 585, 230, t, { tears: t > 21.8 ? 3 : 2, hops: [22, 22.7, 23.4], mood: t > 21.8 ? 'sparkle' : 'happy' })
    if (t > 21.8 && t < 24.6) cup(x, 920, 620, 0.7, '😭')
    table(x, 540, 1360)
    sticker(x, 'NEW SEAT', 300, 1250, { size: 30, rot: -0.08, bg: '#7dffb0', scale: easeOut(pr(t, CAFE + 0.2, CAFE + 0.5)) * (1 - pr(t, 18.8, 19.1)) })
    const slide = easeInOut(pr(t, CAFE + 0.1, CAFE + 0.9))
    drawSign(x, 'taurus', 120 + 210 * slide, 1290, 250, t, { mood: t < 19.2 ? 'squint' : 'happy', lines: H.lines, shadow: true, look: [1, 0], hops: [19.5, 25] })
    drawSign(x, 'libra', 760, 1290, 250, t, { mood: t < 19 ? 'neutral' : 'happy', lines: H.lines, shadow: true, look: [-1, 0], hops: [19.3] })
    cup(x, 470, 1320, 0.55); cup(x, 640, 1320, 0.55)
  }
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK,
  overlays: [[screenShake(SHAKE), shakeCues(SHAKE)], [whipZoom(WHIP), whipZoomCues(WHIP)]],
  cues: [...entranceCues('crash', IN), ...[0, 1, 2, 3].map(i => ['pop', +(3.4 + i * 0.6).toFixed(2), 660, 0.06, 0]), ['pop', 12.4, 700, 0.06, 0], ['pop', 13.6, 880, 0.06, 0], ['whoosh', CAFE, 0.6, 0.14], ['glitter', 21.8, 23.2], ['bell', 24.8, 1046.5, 0.06, 1.8, 0]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
