// kpjue12 · PLANET TALK: JUPITER → PISCES · "Pisces, Who Looks After You?" (30 s, star_advice, hard cut).
//   0.0  frame 0: Jupiter crashing in mid-dive with a giant tissue box, catching Pisces's flying tears, three phones
//        ringing at once. Hook "PISCES. Who's looking after you?" Shake + whip.
//   3.0  2 a.m., three friends' breakups, none of them Pisces's.   7.2  "And who did YOU call?"
//  12.6  "In astrology I'm generosity. Even I keep a little for me."   17.0  Jupiter fills Pisces's own cup.
//  19.8  Leo: "you sound exhausted."   22.6  the bath, happy tears.   25.0  "Can I call you tomorrow?" hard cut.
import { drawSpace, drawSign, entrance, drawEntranceFx, entranceCues, planetSize } from '../../planetkit.js'
import { whipZoom, whipZoomCues, screenShake, shakeCues } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, phone, sticker, pr, easeOut, easeInOut, rr, INK, BONE, GOLD } from '../../kpjue01/jupkit.js'

export const DURATION = 30
const JS = planetSize('jupiter', 470)
const IN = { at: -0.63, x: 560, y: 560, size: JS }
const HOOK = { at: -1, text: 'PISCES. Who’s looking | after *you?*', top: 1000, size: 100, out: [2.7, 2.95] }
const SHAKE = { at: 0.05, len: 0.5, amp: 24 }
const WHIP = { at: 0.55, from: 1.45 }
const CUP = 17.0, BATH = 22.6

const B = [
  { t0: 3.0, t1: 7.0, x: 540, y: 1080, who: 'pisces', text: 'It’s 2 a.m. and I’m on *three* breakups. None of them mine.', tail: 0, maxW: 740 },
  { t0: 7.2, t1: 10.4, x: 540, y: 1080, who: 'jupiter', text: 'And who did *you* call, kiddo?', tail: 0, tailUp: true },
  { t0: 10.6, t1: 12.4, x: 540, y: 1080, who: 'pisces', text: '…*call?*', tail: 0 },
  { t0: 12.6, t1: 16.8, x: 540, y: 1080, who: 'jupiter', text: 'In astrology I’m generosity. Even I keep a little *for me.*', tail: 0, tailUp: true, maxW: 740 },
  { t0: 17.2, t1: 19.6, x: 540, y: 1080, who: 'jupiter', text: 'Your turn. *Fill your cup.*', tail: 0, tailUp: true },
  { t0: 19.9, t1: 22.4, x: 680, y: 1150, who: 'leo', text: 'PISCES. You sound *exhausted.*', tail: 60 },
  { t0: 22.8, t1: 24.8, x: 540, y: 1080, who: 'jupiter', text: 'Say it, kiddo.', tail: 0, tailUp: true },
  { t0: 25.0, t1: 31, x: 540, y: 1160, who: 'pisces', text: 'Can I call you *tomorrow?*', tail: 0 },
]
const CALLS = [['Leo', '2:04 am', 230, 1500, -0.12], ['Virgo', '2:11 am', 540, 1880, 0.04], ['Cancer', '2:17 am', 850, 1500, 0.12]]

function tissueBox(x, X, Y, s, rot = 0) {
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(s, s)
  x.fillStyle = '#7fe0ff'; x.strokeStyle = INK; x.lineWidth = 8
  rr(x, -150, -70, 300, 140, 18); x.fill(); x.stroke()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-50, -70); x.quadraticCurveTo(-30, -150, 0, -120); x.quadraticCurveTo(30, -160, 50, -70); x.closePath(); x.fill(); x.stroke()
  x.fillStyle = INK; x.font = '800 30px Inter'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('EXTRA BIG', 0, 10)
  x.restore()
}
function mug(x, X, Y, fill, t) {
  x.save(); x.translate(X, Y)
  x.fillStyle = BONE; x.strokeStyle = INK; x.lineWidth = 7
  x.beginPath(); x.moveTo(-80, -90); x.lineTo(80, -90); x.lineTo(66, 90); x.lineTo(-66, 90); x.closePath(); x.fill(); x.stroke()
  x.beginPath(); x.arc(92, 0, 36, -1.2, 1.2); x.stroke()
  x.save(); x.beginPath(); x.moveTo(-78, -86); x.lineTo(78, -86); x.lineTo(65, 87); x.lineTo(-65, 87); x.closePath(); x.clip()
  x.fillStyle = '#d9a46c'; x.fillRect(-90, 88 - 176 * fill + Math.sin(t * 5) * 4, 180, 200); x.restore()
  x.fillStyle = INK; x.font = '800 40px Inter'; x.textAlign = 'center'; x.fillText('ME', 0, -30)
  x.restore()
}

function draw(x, t, H) {
  drawSpace(x, t, { planet: 'jupiter', seed: 37 })
  const bath = t > BATH
  const P = entrance('crash', t, IN)
  drawEntranceFx(x, 'jupiter', 'crash', t, IN)
  drawJupiter(x, P.x, P.y, P.size, t, { rot: P.rot, squash: P.squash, mood: t < 3 ? 'wide' : t > 25 ? 'happy' : t > 10.6 && t < 12.4 ? 'sad' : 'happy', lines: H.lines, look: [0, 0.9], hops: [7.3, 12.7, 17.3, 22.9], tears: t > 25.4 ? 1 : 0 })
  // the tissue box, held under Jupiter, catching tears on the hook
  const tb = 1 - pr(t, 6.6, 7.0)
  if (tb > 0) tissueBox(x, P.x + 40, P.y + P.size * 0.55, tb, P.rot * 0.5)
  if (t < 3) for (let i = 0; i < 10; i++) {
    const ph = ((t + 0.6) * 1.4 + i * 0.1) % 1, sx = 540 + (i % 2 ? 40 : -40), sy = 1460
    const X = sx + (P.x + 40 - sx) * ph + (i - 5) * 6, Y = sy + (P.y + P.size * 0.55 - sy) * ph - Math.sin(ph * Math.PI) * 260
    x.fillStyle = '#8fe3ff'; x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.ellipse(X, Y, 12, 18, 0, 0, Math.PI * 2); x.fill(); x.stroke()
  }
  if (!bath) {
    // three phones ringing around Pisces (until the cup)
    const pa = 1 - pr(t, CUP - 0.4, CUP)
    if (pa > 0) CALLS.forEach(([name, time, X, Y, rot], i) => {
      const ring = t < 3 || (t > 3 && t < 7) ? Math.sin(t * 50 + i) * 6 : 0
      phone(x, X + ring, Y - 120, 220, 300, { rot, title: name, alpha: pa, msgs: [{ text: `${time} · 😭😭😭` }] })
    })
    pisces(x, 540, 1450, 300, t, { mood: t < 10.6 ? 'wide' : t < 17 ? 'neutral' : 'sparkle', lines: H.lines, look: [0, -1], hops: [10.7, 17.4], tears: 3 })
    if (t > CUP - 0.2) {
      const k = easeOut(pr(t, CUP - 0.2, CUP + 0.2))
      x.save(); x.globalAlpha = k; mug(x, 820, 1440, easeInOut(pr(t, CUP + 0.2, CUP + 2.2)), t); x.restore()
      if (t > CUP + 0.2 && t < CUP + 2.2) { x.strokeStyle = '#d9a46c'; x.lineWidth = 16; x.beginPath(); x.moveTo(P.x + 160, P.y + 160); x.quadraticCurveTo(900, 1100, 820, 1350); x.stroke() }
    }
    const lk = easeOut(pr(t, 19.6, 20.0))
    if (lk > 0 && t < BATH) phone(x, 260, 1360, 260, 340, { title: 'Leo', scale: lk, msgs: [{ text: 'you okay??' }] })
    if (t > 3.4 && t < 7) sticker(x, '2:00 AM · ADVICE HOTLINE', 540, 1240, { size: 30, bg: '#ff8fb1', rot: -0.04, scale: easeOut(pr(t, 3.5, 3.8)) })
  } else {
    // the bath: bubbles, happy tears, the phone in hand
    const k = easeOut(pr(t, BATH, BATH + 0.4))
    x.save(); x.globalAlpha = k
    x.fillStyle = BONE; x.strokeStyle = INK; x.lineWidth = 8
    rr(x, 140, 1480, 800, 240, 60); x.fill(); x.stroke()
    for (let i = 0; i < 14; i++) { const bx = 200 + i * 52, by = 1490 + Math.sin(t * 2 + i) * 10; x.fillStyle = 'rgba(239,246,255,0.95)'; x.beginPath(); x.arc(bx, by, 34 + (i % 3) * 8, 0, Math.PI * 2); x.fill(); x.strokeStyle = 'rgba(143,227,255,0.8)'; x.lineWidth = 3; x.stroke() }
    x.restore()
    pisces(x, 540, 1400, 300, t, { mood: 'sparkle', lines: H.lines, look: [0, -1], hops: [25.2, 27.6], tears: 3 })
    mug(x, 870, 1380, 1, t)
    phone(x, 300, 1320, 180, 240, { title: 'Leo', rot: -0.15 })
    if (t > 27.8) sticker(x, 'LEO: “of course!! rest 💛”', 540, 1800, { size: 32, bg: '#7dffb0', rot: -0.03, scale: easeOut(pr(t, 27.8, 28.1)) })
  }
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK,
  overlays: [[screenShake(SHAKE), shakeCues(SHAKE)], [whipZoom(WHIP), whipZoomCues(WHIP)]],
  cues: [...entranceCues('crash', IN), ...Array.from({ length: 6 }, (_, i) => ['bell', +(i * 0.55).toFixed(2), i % 2 ? 1174.66 : 1396.91, 0.03, 0.4, (i % 3 - 1) * 0.5]), ['pop', 10.6, 500, 0.05, 0], ['riser', CUP, CUP + 2.2, 0.06], ['bell', CUP + 2.2, 1046.5, 0.06, 1.4, 0], ['pop', 19.7, 1200, 0.05, 0], ['whoosh', BATH, 0.5, 0.12], ['glitter', 25.0, 26.6], ['bell', 27.8, 1568, 0.06, 1.2, 0]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
