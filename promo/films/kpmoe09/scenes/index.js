// kpmoe09 · Planet Talk: The Moon · to Sagittarius · "Eight Months of We'll See" (23.3 s vertical, hard cut) · synthwave · Bm
//   0      frame 0: the Moon mid-slide in with a silver lasso round Sagittarius' backpack strap, Sag mid-sprint for the
//          door; "SAGITTARIUS. | Eight months of *'we'll see'?*" · 0.55 whip zoom
//   2.4    the calendar flips MAR → OCT, every month stamped "we'll see" · 5.8 Sag: "labels are *boring!* we're just… seeing."
//   8.6    the Moon (a little Earth and its orbit appear): "i've orbited the same planet for *billions* of years." (true)
//  12.0    "still the best view in the *sky.*" · 14.6 Sag: "…ok that's kind of *romantic.*"
//  17.2    Sag turns back to the couch: "so… what *are* we?" · 19.2 them: "I was hoping you'd *ask.*" · Pisces sobs
//  21.6    "Free spirit. | *Fixed* orbit." · hard cut at 23.3
import { moonFilm } from '../../kpmoe01/moonkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const ORB = 8.6, BACK = 17.0
const MONTHS = ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT']

function lasso(x, t, K) {
  // the silver rope from the Moon to the backpack strap (until Sag stops running)
  const k = 1 - ease.inCubic(prog(t, 2.0, 2.4))
  if (k <= 0.01) return
  const mx = t < 0.35 ? lerp(1600, 800, ease.outCubic(clamp((t + 0.4) / 0.75))) : 800
  x.save(); x.globalAlpha = k; x.strokeStyle = K.INK; x.lineWidth = 12; x.beginPath(); x.moveTo(mx - 150, 600); x.quadraticCurveTo(700, 1000, 640, 1300); x.stroke()
  x.strokeStyle = '#eef0ff'; x.lineWidth = 5; x.stroke(); x.beginPath(); x.ellipse(640, 1310, 40, 22, 0.4, 0, Math.PI * 2); x.stroke(); x.restore()
}
function earth(x, t, K) {
  const k = K.inOut(t, ORB, 14.6, 0.4)
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  x.setLineDash([14, 12]); x.strokeStyle = 'rgba(223,226,242,0.6)'; x.lineWidth = 4; x.beginPath(); x.ellipse(560, 560, 250, 80, -0.1, 0, Math.PI * 2); x.stroke(); x.setLineDash([])
  const s = 70 * k
  x.fillStyle = K.INK; x.beginPath(); x.arc(560, 560, s + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#4f8ff0'; x.beginPath(); x.arc(560, 560, s, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#5fd08a'; for (const [a, b, r] of [[-0.3, -0.2, 0.35], [0.35, 0.25, 0.3], [-0.1, 0.45, 0.2]]) { x.beginPath(); x.arc(560 + a * s, 560 + b * s, r * s, 0, Math.PI * 2); x.fill() }
  K.label(x, 'EARTH', 560, 670, { size: 22, bg: '#cfe0ff' })
  x.restore()
}

const F = moonFilm({
  id: 'kpmoe09', sign: 'sagittarius', dur: 23.3, ending: 'cut',
  hook: { text: 'SAGITTARIUS. | Eight months of *‘we’ll see’?*', out: [2.2, 2.4], size: 96 },
  enter: { kind: 'slide', at: -0.4, x: 820, y: 560, size: 330 },
  whip: { at: 0.55 },
  shakes: [0.35],
  moon: [
    { at: 0, mood: 'angry' },
    { at: 1.4, mood: 'sly' },
    { at: 5.7, mood: 'neutral' },
    { at: ORB, mood: 'proud' },
    { at: 12.0, mood: 'love' },
    { at: 14.5, mood: 'happy' },
    { at: 19.2, mood: 'love' },
  ],
  me: [
    { at: 0, x: 700, y: 1360, s: 280, mood: 'wide', look: [1, 0], rot: 0.25, squash: -0.1 },
    { at: 0.4, x: 760, rot: 0.1, squash: 0, d: 0.3 },
    { at: 2.2, x: 720, rot: 0, mood: 'squint', look: [-1, -0.3] },
    { at: 5.7, mood: 'happy', look: [1, -0.5] },
    { at: ORB, mood: 'wide', look: [1, -0.7] },
    { at: 14.5, mood: 'sparkle', look: [1, -0.6] },
    { at: BACK, x: 600, mood: 'neutral', look: [-1, 0], d: 0.5 },
    { at: 19.2, mood: 'heart', look: [-1, 0] },
  ],
  meHops: [0.1, 0.25, 5.9, 14.7, 19.3, 19.7],
  meProp(x, t, m, K) {
    // the backpack
    x.save(); x.translate(m.x + m.s * 0.32, m.y - m.s * 0.05); K.box(x, -40, -60, 80, 120, '#3fb3c4', { o: 5 }); K.rect(x, -30, -10, 60, 24, '#2a8a9a'); x.restore()
  },
  pis: { x: 180, y: 560, s: 140, keys: [{ at: 0, tears: 1, mood: 'wide', look: [1, 0.4] }, { at: 12.0, tears: 2, mood: 'sparkle' }, { at: 19.5, tears: 3, mood: 'happy' }], sobs: [12.2, 19.6], hops: [19.6, 20.0] },
  says: [
    { t0: 5.8, t1: 8.4, who: 'sagittarius', text: 'labels are *boring!* we’re just… seeing.', x: 640, y: 1690, tail: 60, tailUp: true },
    { t0: ORB, t1: 11.8, who: 'moon', text: 'i’ve orbited the same planet for *billions* of years.', x: 540, y: 960, tail: 260, tailUp: true },
    { t0: 12.0, t1: 14.4, who: 'moon', text: 'still the best view in the *sky.*', x: 540, y: 960, tail: 260, tailUp: true },
    { t0: 14.6, t1: 16.8, who: 'sagittarius', text: '…ok that’s kind of *romantic.*', x: 640, y: 1690, tail: 60, tailUp: true },
    { t0: 17.2, t1: 19.0, who: 'sagittarius', text: 'so… what *are* we?', x: 600, y: 1690, tail: 0, tailUp: true, size: 50 },
    { t0: 19.2, t1: 21.4, who: 'them', text: 'I was hoping you’d *ask.*', x: 360, y: 1150, tail: -100, color: '#7fe3ff' },
  ],
  heads: [
    { text: 'Free spirit. | *Fixed* orbit.', at: 21.6, top: 240, size: 100 },
  ],
  set(x, t, K) {
    K.room(x, t, { wall: '#3a1e4e', wall2: '#1e1236', floor: '#2e1e40', warm: 0.3, window: false })
    // the door (right) and the couch (left)
    K.box(x, 900, 760, 200, 620, '#8a5a3a', { o: 8 }); K.rect(x, 920, 1060, 18, 18, K.GOLD)
    K.box(x, 40, 1300, 420, 120, '#c0475a', { o: 6 }); K.box(x, 40, 1210, 420, 100, '#a03a4e', { o: 6 })
    K.drawSign(x, 'aquarius', 250, 1220, 230, t, { mood: t > 19.2 ? 'heart' : t > BACK ? 'sparkle' : 'neutral', look: [1, -0.2], seed: 11, hops: [19.2] })
  },
  paint(x, t, K) { lasso(x, t, K); earth(x, t, K) },
  over(x, t, K) {
    const k = K.inOut(t, 2.4, 5.6)
    if (k <= 0.01) return
    const i = Math.min(MONTHS.length - 1, Math.floor(Math.max(0, t - 2.5) / 0.36))
    x.save(); x.translate(540, 1000); x.scale(k, k); x.rotate(-0.03)
    K.box(x, -230, -200, 460, 400, '#fffaf0', { o: 8 }); K.rect(x, -230, -200, 460, 90, '#ff3b4e')
    K.txt(x, MONTHS[i], 0, -152, { size: 54, font: K.INTER, weight: 900, color: '#fff' })
    x.save(); x.rotate(-0.12); x.strokeStyle = '#ff3b4e'; x.lineWidth = 8; x.strokeRect(-175, -22, 350, 96); K.txt(x, 'WE’LL SEE', 0, 26, { size: 46, font: K.INTER, weight: 900, color: '#ff3b4e' }); x.restore()
    K.txt(x, `month ${i + 1}`, 0, 150, { size: 28, color: K.INK })
    x.restore()
  },
  cues: [
    ...MONTHS.map((_, i) => ['tick', +(2.5 + i * 0.36).toFixed(2), 0.05]), ['pop', 5.4, 392, 0.05, 0],
    ['bell', ORB, 1174.66, 0.04, 2.0, 0], ['glitter', ORB, ORB + 1.2], ['whoosh', BACK, 0.4, 0.04], ['pop', 19.2, 1318.51, 0.05, -0.2], ['glitter', 19.2, 20.6],
  ],
  music: { style: 'synthwave', key: 'Bm', seed: 20209, sections: { drop: 0.6, breakdown: [BACK], lift: [19.2] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
