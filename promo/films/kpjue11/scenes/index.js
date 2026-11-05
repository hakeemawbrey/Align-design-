// kpjue11 · PLANET TALK: JUPITER → AQUARIUS · "Aquarius Brings the Weird" (24 s, star_talk, loop).
//   0.0  frame 0: Jupiter's moons whipping round the lens like paparazzi (flash pops), Jupiter right behind mid-zoom.
//        Hook "AQUARIUS. I brought my moons." Whip at 0.5.
//   3.0  on a date, hiding the weird: "Nice… weather."   6.8  dozens of moons, every one different (true).
//  10.8  "Weird is the whole point."   14.2  tiny robot birdhouses.   17.6  "wait… ME TOO."
//  19.8  Pisces orbits as a crying moon.   21.8  "Weird, but in orbit." → the moons whip back in (loop).
import { drawSpace, drawSign, entrance, drawEntranceFx, entranceCues, planetSize } from '../../planetkit.js'
import { whipZoom, whipZoomCues } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, sticker, moons, pr, easeOut, easeInOut, rr, INK, BONE, GOLD } from '../../kpjue01/jupkit.js'

export const DURATION = 24
const JS = planetSize('jupiter', 500)
const IN = { at: -0.62, x: 540, y: 600, size: JS }
const HOOK = { at: -1, text: 'AQUARIUS. | I brought my *moons.*', top: 1180, size: 104, out: [2.7, 2.95] }
const WHIP = { at: 0.5, from: 1.5 }
const DATE = 2.9, BACK = 23.35

const B = [
  { t0: 3.2, t1: 6.6, x: 430, y: 1130, who: 'aquarius', text: 'Nice… *weather* we’re having.', tail: -40 },
  { t0: 6.8, t1: 10.6, x: 540, y: 1000, who: 'jupiter', text: 'Kiddo, I’ve got *dozens* of moons. Every one is different.', tail: 0, tailUp: true, maxW: 720 },
  { t0: 10.8, t1: 14.0, x: 540, y: 1000, who: 'jupiter', text: 'Weird is the *whole point.* Tell them what you love.', tail: 0, tailUp: true, maxW: 720 },
  { t0: 14.2, t1: 17.4, x: 430, y: 1130, who: 'aquarius', text: 'Okay. I build tiny *robot birdhouses.*', tail: -40 },
  { t0: 17.6, t1: 19.6, x: 760, y: 1130, who: 'sagittarius', text: 'wait… *ME TOO.*', tail: 40 },
  { t0: 19.8, t1: 21.6, x: 540, y: 1000, who: 'pisces', text: 'you found your *orbit* 😭', tail: 0 },
  { t0: 21.8, t1: 23.4, x: 400, y: 1130, who: 'aquarius', text: 'Weird, but *in orbit.*', tail: -40 },
]

function birdhouse(x, X, Y, s, t) {
  x.save(); x.translate(X, Y); x.scale(s, s); x.rotate(0.05 * Math.sin(t * 3))
  x.fillStyle = '#7fe0ff'; x.strokeStyle = INK; x.lineWidth = 6
  x.beginPath(); x.moveTo(-60, -20); x.lineTo(0, -80); x.lineTo(60, -20); x.closePath(); x.fill(); x.stroke()
  x.fillStyle = BONE; x.fillRect(-48, -20, 96, 90); x.strokeRect(-48, -20, 96, 90)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 18, 16, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff3b3b'; x.beginPath(); x.arc(0, -96, 8, 0, Math.PI * 2); x.fill(); x.strokeStyle = INK; x.beginPath(); x.moveTo(0, -80); x.lineTo(0, -90); x.stroke()
  x.restore()
}

function draw(x, t, H) {
  drawSpace(x, t, { planet: 'jupiter', seed: 31 })
  const hook = t < DATE || t > BACK
  // Jupiter (zooms in at frame 0, then floats top)
  const P = entrance('zoom', t, IN)
  drawEntranceFx(x, 'jupiter', 'zoom', t, IN)
  const mtalk = t > 6.8 && t < 14
  moons(x, t, P.x, P.y, P.size * 0.75, { n: 8, speed: mtalk ? 1.2 : 0.6, size: 72, tilt: 0.4, front: false })
  drawJupiter(x, P.x, P.y, P.size, t, { rot: P.rot, mood: t < 3 ? 'wide' : 'happy', lines: H.lines, look: [0, 0.9], hops: [6.9, 10.9], tears: t > 19.8 && t < 21.6 ? 1 : 0 })
  moons(x, t, P.x, P.y, P.size * 0.75, { n: 8, speed: mtalk ? 1.2 : 0.6, size: 72, tilt: 0.4, front: true })
  if (t > 7.2 && t < 10.6) sticker(x, 'TRUE: DOZENS OF MOONS', 540, 220, { size: 32, bg: '#7dffb0', rot: -0.04, scale: easeOut(pr(t, 7.3, 7.6)) })
  // the date table
  const tk = easeOut(pr(t, DATE, DATE + 0.4)) * (1 - pr(t, BACK - 0.1, BACK + 0.2))
  if (tk > 0) {
    x.save(); x.globalAlpha = tk
    x.fillStyle = '#5a3a2a'; rr(x, 160, 1560, 760, 34, 12); x.fill(); x.fillRect(520, 1594, 40, 200)
    x.restore()
    const love = t > 17.6
    drawSign(x, 'aquarius', 300, 1450, 270, t, { mood: t < 6.8 ? 'squint' : t < 14.2 ? 'neutral' : t < 17.6 ? 'sparkle' : 'happy', lines: H.lines, look: [1, 0], hops: [14.4, 17.8, 22], alpha: tk, sweat: t < 6.8 })
    drawSign(x, 'sagittarius', 780, 1450, 270, t, { mood: t < 6.8 ? 'sleepy' : t < 17.6 ? 'neutral' : 'heart', lines: H.lines, look: [-1, 0], hops: [17.7, 18.2], alpha: tk })
    if (t > 3.6 && t < 6.6) sticker(x, 'HIDING THE WEIRD: 100%', 540, 1300, { size: 32, bg: '#ff8fb1', rot: 0.04, scale: easeOut(pr(t, 3.7, 4)) })
    const bk = easeOut(pr(t, 14.6, 15.0)) * (1 - pr(t, 21.6, 21.9))
    if (bk > 0) { birdhouse(x, 300, 1260, bk * 0.8, t); birdhouse(x, 780, 1260, easeOut(pr(t, 17.8, 18.2)) * 0.8, t) }
  }
  // Pisces as a crying moon, orbiting
  const pk = easeOut(pr(t, 19.6, 20.0)) * (1 - pr(t, 21.6, 22.0))
  if (pk > 0) { const a = t * 2.2; pisces(x, 540 + Math.cos(a) * 380, 650 + Math.sin(a) * 140, 200, t, { pop: pk }) }
  // paparazzi flashes on the hook
  if (hook) {
    const ft = t > BACK ? t - BACK : t + 0.6
    for (let i = 0; i < 5; i++) { const ph = (ft * 3 + i * 0.37) % 1; if (ph < 0.12) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(150 + i * 200, 300 + (i % 2) * 900, 0, 150 + i * 200, 300 + (i % 2) * 900, 260); g.addColorStop(0, 'rgba(255,255,255,0.8)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore() } }
    // big moons whipping past the lens
    const k = t > BACK ? pr(t, BACK, DURATION + 0.6) : 0
    for (let i = 0; i < 4; i++) {
      const a = (t > BACK ? (t - BACK) - 0.6 : t) * 3.2 + i * 1.57
      x.save(); x.globalAlpha = 0.95
      x.fillStyle = ['#f3e2a9', '#c9b8a6', '#bcd2e8', '#e8b46a'][i]; x.strokeStyle = INK; x.lineWidth = 8
      x.beginPath(); x.arc(540 + Math.cos(a) * 560, 900 + Math.sin(a) * 700, 90 + i * 14, 0, Math.PI * 2); x.fill(); x.stroke(); x.restore()
    }
  }
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK, loop: true,
  overlays: [[whipZoom(WHIP), whipZoomCues(WHIP)]],
  cues: [...entranceCues('zoom', IN), ...[0.1, 0.45, 0.8, 1.2].map(a => ['pop', a, 1760, 0.04, 0]), ['bell', 7.3, 1318.5, 0.05, 1.2, 0], ['pop', 14.6, 900, 0.05, 0], ['glitter', 17.6, 18.8], ['glitter', 19.8, 21.0], ['whoosh', BACK, 0.5, 0.16], ['pop', BACK + 0.3, 1760, 0.04, 0]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
