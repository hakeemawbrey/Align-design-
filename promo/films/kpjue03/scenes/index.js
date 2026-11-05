// kpjue03 · PLANET TALK: JUPITER → GEMINI · "Gemini's Six Saturdays" (25 s, star_talk, loop).
//   0.0  frame 0: Jupiter bursting out of a phone notification, way too big, six group-chat plans flying out.
//        Hook "When Jupiter says it's too much…". Whip at 0.5.
//   3.0  yes to all six Saturday plans.   7.0  "I'm the planet of MORE. Even I say pick one."   11.2  all-in at one.
//  15.6  Gemini picks the hike, the other five fly away.   18.4  Pisces's crying voice note.   21.2  last line.
//  24.4  six pings again → loops into the frame-0 burst.
import { drawSpace, drawSign, entrance, drawEntranceFx, entranceCues, planetSize } from '../../planetkit.js'
import { whipZoom, whipZoomCues } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, phone, sticker, pr, easeOut, easeInOut, rr, INK, BONE, GOLD } from '../../kpjue01/jupkit.js'

export const DURATION = 25
const JS = planetSize('jupiter', 560)
const IN = { at: -0.3, x: 540, y: 620, size: JS }
const HOOK = { at: -1, text: 'When *Jupiter* | says it’s too much…', top: 1040, size: 96, out: [2.7, 2.95] }
const WHIP = { at: 0.5, from: 1.5 }
const PICK = 15.6
const PLANS = ['brunch · sat 11?', 'hike · sat 10!!', 'movie · sat 8', 'party · sat 9', 'market · sat 12', 'game night · sat 7']

const B = [
  { t0: 3.0, t1: 6.8, x: 540, y: 1000, who: 'gemini', text: 'I said yes to *all six* Saturday plans.', tail: 160 },
  { t0: 7.0, t1: 11.0, x: 540, y: 1000, who: 'jupiter', text: 'Kiddo, I’m the planet of MORE. And even I say: *pick one.*', tail: 0, tailUp: true, maxW: 720 },
  { t0: 11.2, t1: 15.4, x: 540, y: 1000, who: 'jupiter', text: 'A big life isn’t every plan. It’s being *all-in* at one.', tail: 0, tailUp: true, maxW: 720 },
  { t0: 15.8, t1: 18.2, x: 540, y: 1060, who: 'gemini', text: 'okay. okay. the *hike.*', tail: 160 },
  { t0: 21.2, t1: 24.3, x: 540, y: 1060, who: 'gemini', text: 'One plan. *All of me.*', tail: 160 },
]

function pill(x, text, X, Y, { rot = 0, scale = 1, alpha = 1, hot = false } = {}) {
  if (scale <= 0 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(X, Y); x.rotate(rot); x.scale(scale, scale)
  x.font = '800 34px Inter'; const w = x.measureText(text).width + 110, h = 78
  x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 20
  x.fillStyle = hot ? '#7dffb0' : 'rgba(20,11,46,0.92)'; rr(x, -w / 2, -h / 2, w, h, 26); x.fill(); x.shadowColor = 'transparent'
  x.lineWidth = 4; x.strokeStyle = hot ? INK : 'rgba(242,199,92,0.7)'; x.stroke()
  x.fillStyle = '#ff3b3b'; x.beginPath(); x.arc(-w / 2 + 40, 0, 16, 0, Math.PI * 2); x.fill()
  x.fillStyle = hot ? INK : BONE; x.textBaseline = 'middle'; x.fillText(text, -w / 2 + 72, 2)
  x.restore()
}

function draw(x, t, H) {
  drawSpace(x, t, { planet: 'jupiter', seed: 7 })
  // the phone at the bottom, Jupiter bursts out of its top
  const pk = 1 - easeInOut(pr(t, 3.0, 3.6)) * (1 - pr(t, 24.3, 24.6))
  phone(x, 540, 1560 + (1 - pk) * 420, 460, 760, { title: 'notifications', alpha: 1 })
  const P = entrance('burst', t, IN)
  drawEntranceFx(x, 'jupiter', 'burst', t, IN)
  drawJupiter(x, P.x, P.y, P.size, t, { rot: P.rot, squash: P.squash, alpha: P.alpha, mood: t < 3 ? 'wide' : t > 18.4 && t < 21 ? 'happy' : 'happy', lines: H.lines, look: [0, 0.8], hops: [7.1, 11.3, 18.5], tears: t > 18.6 && t < 21 ? 1 : 0 })
  // six plans: flying out at frame 0, orbit Gemini, then five fly away at PICK
  PLANS.forEach((p, i) => {
    const a = i / 6 * Math.PI * 2 + 0.4
    const fly = t < 2.8 ? easeOut(pr(t, -1.1, 0.6)) : 1
    let X = 540 + Math.cos(a + t * 0.25) * 330 * fly, Y = 1300 + Math.sin(a + t * 0.25) * 300 * fly
    if (t < 3) { const k = easeInOut(pr(t, 2.6, 3.0)); const X0 = 540 + Math.cos(a) * 390 * fly, Y0 = 640 + Math.sin(a) * 400 * fly; X = X0 + (X - X0) * k; Y = Y0 + (Y - Y0) * k }
    const hot = i === 1 && t > PICK
    let alpha = 1, scale = 1.05
    if (t > PICK && !hot) { const k = pr(t, PICK + 0.1 + i * 0.06, PICK + 0.6 + i * 0.06); X += Math.cos(a) * 900 * k; Y += Math.sin(a) * 900 * k - 400 * k; alpha = 1 - k }
    if (hot) { const k = easeInOut(pr(t, PICK, PICK + 0.5)); X = X + (540 - X) * k; Y = Y + (1250 - Y) * k; scale = 1.05 + 0.2 * k }
    if (t > 24.3) { const k = easeOut(pr(t, 24.3 + i * 0.05, 24.5 + i * 0.05)); alpha = Math.max(alpha, k) }
    pill(x, p, X, Y, { rot: Math.sin(a * 3) * 0.06, scale, alpha })
    if (hot) pill(x, p, X, Y, { rot: 0, scale, hot: true })
  })
  // Gemini
  const gy = t < 3 ? 1700 : 1460
  const gk = easeInOut(pr(t, 2.9, 3.5))
  drawSign(x, 'gemini', 540 + 320 * (1 - gk), 1700 - (1700 - 1460) * gk + (t > 24.3 ? 240 * pr(t, 24.3, 25) : 0), t < 3 ? 220 : 280, t, { mood: t < 7 ? 'wide' : t < 15.6 ? 'squint' : 'happy', lines: H.lines, look: [0, -1], hops: [16, 21.4, 22.1], sweat: t > 3 && t < 15.6 })
  if (t > 3.4 && t < 6.8) sticker(x, 'SATURDAY: 6 / 6 BOOKED', 540, 1720, { size: 34, bg: '#ff8fb1', scale: easeOut(pr(t, 3.4, 3.7)) })
  // Pisces voice note
  const vk = easeOut(pr(t, 18.4, 18.8)) * (1 - pr(t, 20.9, 21.2))
  if (vk > 0) {
    x.save(); x.globalAlpha = vk
    x.translate(600, 1060 - (1 - vk) * 60)
    x.fillStyle = 'rgba(20,11,46,0.94)'; rr(x, -380, -70, 760, 140, 40); x.fill(); x.strokeStyle = '#a99cff'; x.lineWidth = 4; x.stroke()
    x.fillStyle = BONE; x.font = '800 30px Inter'; x.fillText('PISCES · voice note to all 6 chats', -230, -18)
    for (let k = 0; k < 22; k++) { const h = 10 + Math.abs(Math.sin(k * 1.7 + t * 9)) * 34; x.fillStyle = '#a99cff'; x.fillRect(-230 + k * 22, 28 - h / 2, 12, h) }
    x.restore()
    pisces(x, 170, 1200, 240, t, { pop: vk, hops: [19, 19.7, 20.4] })
  }
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK, loop: true,
  overlays: [[whipZoom(WHIP), whipZoomCues(WHIP)]],
  cues: [...entranceCues('burst', IN), ...[0, 1, 2, 3, 4, 5].map(i => ['pop', +(-0.2 + i * 0.12 + 0.3).toFixed(2), 900 + i * 60, 0.05, 0]), ['whoosh', PICK + 0.1, 0.6, 0.15], ['bell', PICK + 0.4, 1318.5, 0.07, 1.4, 0], ['glitter', 18.4, 19.6], ...[0, 1, 2, 3, 4, 5].map(i => ['pop', +(24.3 + i * 0.05).toFixed(2), 1100 + i * 40, 0.05, 0])],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
