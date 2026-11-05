// kpjue01 · PLANET TALK: JUPITER → ARIES · "Aries Skips the Scenery" (24 s, star_talk, loop).
//   0.0  frame 0: Jupiter mid-skid sliding in, stardust sparks, Aries mid-sprint snapping a RELATIONSHIP finish tape.
//        Hook "ARIES. Hit the brakes, kiddo." Whip zoom at 0.5.
//   3.0  Aries: planned date two during date one.   7.6  the map: every scenic stop skipped.
//  12.4  "The adventure IS the middle bit."   16.4  Aries tries walking slowly, vibrating.   18.6  Pisces sobs at the view.
//  21.0  "Scenic route. Fine. Are we there yet?"  → Aries bolts, loops back into the frame-0 sprint.
import { drawSpace, drawSign, entrance, drawEntranceFx, entranceCues, planetSize } from '../../planetkit.js'
import { whipZoom, whipZoomCues, screenShake, shakeCues } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, sticker, pr, easeOut, easeInOut, rr, INK, BONE, GOLD } from '../jupkit.js'

export const DURATION = 24
const JS = planetSize('jupiter', 540)
const IN = { at: -0.42, x: 360, y: 640, size: JS }
const HOOK = { at: -1, text: 'ARIES. | Hit the *brakes,* kiddo.', top: 1060, size: 104, out: [2.7, 2.95] }
const WHIP = { at: 0.5, from: 1.5 }
const SHAKE = { at: 0.34, len: 0.45, amp: 24 }
const BOLT = 23.1

const B = [
  { t0: 3.0, t1: 7.2, x: 560, y: 1080, who: 'aries', text: 'Date one went *great.* So I planned date two. During date one.', tail: 160, maxW: 720 },
  { t0: 7.6, t1: 12.0, x: 540, y: 1000, who: 'jupiter', text: 'Kiddo! You skipped *every scenic stop!*', tail: -120, tailUp: true },
  { t0: 12.4, t1: 16.2, x: 540, y: 1040, who: 'jupiter', text: 'In astrology I’m adventure. And the adventure IS *the middle bit.*', tail: -120, tailUp: true, maxW: 720 },
  { t0: 16.6, t1: 18.6, x: 600, y: 1120, who: 'aries', text: 'this… is… so… *slow…*', tail: 140 },
  { t0: 18.8, t1: 20.9, x: 390, y: 1180, who: 'pisces', text: 'the *VIEW* though 😭', tail: -60 },
  { t0: 21.0, t1: 24.5, x: 560, y: 1100, who: 'aries', text: 'Scenic route. Fine. *Are we there yet?*', tail: 150 },
]
const STOPS = ['first laugh', 'inside joke', 'the long walk', 'meeting their dog', 'the playlist swap']

function road(x, t, speed) {
  // a ground strip with dashes scrolling (speed px/s)
  x.fillStyle = '#241743'; x.fillRect(0, 1560, 1080, 360)
  x.strokeStyle = 'rgba(242,199,92,0.85)'; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 1560); x.lineTo(1080, 1560); x.stroke()
  x.fillStyle = 'rgba(239,230,214,0.5)'
  const off = (t * speed) % 220
  for (let k = -1; k < 7; k++) x.fillRect(k * 220 - off, 1730, 110, 14)
}

function ariesPose(t) {
  // sprinting (frame 0, and again from BOLT), stopped, slow-walking
  const sprint = t < 1.1 || t > BOLT
  const run = sprint ? 1 : 0
  let X = 790, Y = 1440, rot = 0
  if (t < 1.1) { X = 780 + 30 * Math.sin(t * 30) * (1 - pr(t, 0.6, 1.1)) ; rot = 0.18 * (1 - pr(t, 0.7, 1.1)) }
  if (t > 16.4 && t < 21) { X = 790 - (t - 16.4) * 14; Y = 1440 + Math.sin(t * 70) * 5 }
  if (t >= 21 && t <= BOLT) X = 790 - 4.6 * 14
  if (t > 7.6 && t < 16.4) X = 790 + 120 * Math.min(pr(t, 7.6, 8.1), 1 - pr(t, 15.9, 16.4))
  return { X, Y, rot, run }
}

function draw(x, t, H) {
  const sprint = t < 1.1 || t > BOLT
  drawSpace(x, t, { planet: 'jupiter', seed: 3, dx: sprint ? -t * 900 : 0 })
  road(x, t, sprint ? 1500 : t > 16.4 && t < 21 ? 60 : 0)
  // finish tape snapping (frame 0)
  const tk = pr(t, -0.3, 1.0)
  if (t < 3) {
    x.save(); x.globalAlpha = 1 - pr(t, 2.2, 2.8)
    x.fillStyle = BONE; x.fillRect(870, 1260, 14, 300)
    for (const s of [-1, 1]) {
      x.save(); x.translate(876, 1330); x.rotate(s > 0 ? 0.25 + tk * 0.9 : Math.PI - 0.25 - tk * 0.9)
      x.fillStyle = '#ff3b3b'; x.fillRect(0, -18, 330, 36)
      x.fillStyle = BONE; x.font = "800 22px Inter"; x.textBaseline = 'middle'; x.fillText(s > 0 ? 'RELATION' : 'SHIP', 60, 0)
      x.restore()
    }
    x.restore()
  }
  // Jupiter
  const P = entrance('slide', t, IN)
  drawEntranceFx(x, 'jupiter', 'slide', t, IN)
  const jy = t > 7.4 && t < 16.4 ? -60 * easeInOut(pr(t, 7.4, 8.0)) * (1 - pr(t, 15.8, 16.4)) : 0
  drawJupiter(x, P.x, P.y + jy, P.size, t, { rot: P.rot, squash: P.squash, mood: t < 3 ? 'wide' : t > 18.6 && t < 21 ? 'happy' : t > 21 ? 'proud' : 'happy', lines: H.lines, look: t < 3 ? [1, 0.6] : [0.6, 0.7], hops: [7.7, 12.5] })
  // stardust sparks from the skid
  if (t < 1.6) for (let i = 0; i < 14; i++) {
    const a = i * 2.39, d = (t + 0.42) * (300 + (i % 5) * 90)
    x.fillStyle = i % 2 ? GOLD : '#ff9a4a'; x.globalAlpha = Math.max(0, 1 - (t + 0.42) / 2)
    x.fillRect(P.x + 180 + Math.cos(a) * d * 0.6, 980 + Math.sin(a) * d * 0.25 - d * 0.2, 12, 12)
  }
  x.globalAlpha = 1
  // the scenic map (7.6 – 16.2)
  const mk = easeOut(pr(t, 7.8, 8.4)) * (1 - pr(t, 15.9, 16.3))
  if (mk > 0) {
    x.save(); x.translate(470, 1235); x.rotate(-0.03); x.scale(0.94, 0.8 * mk)
    x.fillStyle = '#f3e3bf'; rr(x, -440, -170, 880, 330, 20); x.fill(); x.lineWidth = 8; x.strokeStyle = INK; x.stroke()
    // the winding scenic route with stops
    x.strokeStyle = 'rgba(27,18,54,0.45)'; x.lineWidth = 6; x.setLineDash([16, 12]); x.beginPath()
    x.moveTo(-380, 110); x.bezierCurveTo(-300, -160, -120, 160, 0, -40); x.bezierCurveTo(120, -200, 260, 140, 380, -110); x.stroke(); x.setLineDash([])
    // Aries' straight line
    const sl = pr(t, 8.6, 9.2)
    x.strokeStyle = '#ff3b3b'; x.lineWidth = 12; x.beginPath(); x.moveTo(-380, 110); x.lineTo(-380 + 760 * sl, 110 - 220 * sl); x.stroke()
    x.font = '800 24px Inter'; x.textAlign = 'center'
    const pts = [[-310, -50], [-160, 80], [0, -50], [160, 80], [310, -50]]
    pts.forEach(([px, py], i) => {
      x.fillStyle = GOLD; x.beginPath(); x.arc(px, py, 16, 0, Math.PI * 2); x.fill(); x.lineWidth = 4; x.strokeStyle = INK; x.stroke()
      x.fillStyle = INK; x.fillText(STOPS[i], px, py + (i % 2 ? 50 : -30))
      const xk = pr(t, 9.3 + i * 0.35, 9.5 + i * 0.35)
      if (xk > 0) { x.strokeStyle = '#ff3b3b'; x.lineWidth = 9; x.beginPath(); x.moveTo(px - 18 * xk, py - 18 * xk); x.lineTo(px + 18 * xk, py + 18 * xk); x.moveTo(px + 18 * xk, py - 18 * xk); x.lineTo(px - 18 * xk, py + 18 * xk); x.stroke() }
    })
    x.fillStyle = '#ff3b3b'; x.font = '800 30px Inter'; x.fillText('RELATIONSHIP ★', 330, -140)
    x.restore()
  }
  // Aries
  const A = ariesPose(t)
  const stride = A.run ? Math.sin(t * 34) : 0
  drawSign(x, 'aries', A.X, A.Y - Math.abs(stride) * 30, 290, t, { mood: t < 3 ? 'wide' : t < 7.6 ? 'happy' : t < 12.4 ? 'wide' : t < 21 ? 'squint' : 'wink', squash: A.run ? 0.1 * stride : 0, look: t < 3 ? [1, 0] : [-1, -0.6], lines: H.lines, shadow: true, sweat: t > 16.4 && t < 21 })
  if (A.run) { x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 8; for (let k = 0; k < 4; k++) { x.beginPath(); x.moveTo(A.X - 190 - k * 30, A.Y - 80 + k * 50); x.lineTo(A.X - 330 - k * 30, A.Y - 80 + k * 50); x.stroke() } }
  // speedrun timer sticker while planning date two
  if (t > 3.3 && t < 7.4) sticker(x, `DATE 2 PLANNED · 0:${String(Math.min(59, Math.floor((t - 3.3) * 9 + 12))).padStart(2, '0')} INTO DATE 1`, 540, 1290, { rot: -0.05, size: 34, scale: easeOut(pr(t, 3.3, 3.6)) })
  // Pisces in the back seat (18.6 – 21)
  const pk = easeOut(pr(t, 18.5, 18.9)) * (1 - pr(t, 20.9, 21.2))
  if (pk > 0) pisces(x, 230, 1440, 270, t, { pop: pk, hops: [19.4, 20.1] })
  // slow-walk sticker
  if (t > 16.8 && t < 20.9) sticker(x, 'SPEED: 0.1×', 820, 1250, { rot: 0.07, size: 36, bg: '#7dffb0', scale: easeOut(pr(t, 16.8, 17.1)) })
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK, loop: true,
  overlays: [[screenShake(SHAKE), shakeCues(SHAKE)], [whipZoom(WHIP), whipZoomCues(WHIP)]],
  cues: [...entranceCues('slide', IN), ['whoosh', 7.7, 0.5, 0.12], ...[0, 1, 2, 3, 4].map(i => ['pop', +(9.4 + i * 0.35).toFixed(2), 520 - i * 30, 0.06, 0]), ['tick', 16.8, 0.1], ['tick', 17.3, 0.1], ['tick', 17.8, 0.1], ['glitter', 18.8, 20.2], ['whoosh', BOLT, 0.5, 0.18]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
