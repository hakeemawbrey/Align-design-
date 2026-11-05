// kpmoe12 · Planet Talk: The Moon · to Pisces · "Pisces Pours Too Much" (26.8 s vertical, hard cut) · dreamy · E
//   0      frame 0: the Moon mid-crash into a bathtub-sized teacup (splash), Pisces mid-cry pouring tea for everyone;
//          "PISCES. | Shh. Let's cry *together.*" · 0.55 whip zoom
//   2.4    "Pouring for *everyone.*" · three friends' cups fill · 5.4 caught: YOUR CUP (empty)
//   6.6    Pisces: "who checks on *Pisces?*" · 9.2 the Moon (crying too): "i light up the whole night and get *half*
//          the credit." · 12.8 "pour for people who *pour back.*" · 15.8 "and pour some for *you.*"
//  18.2    Pisces fills its own cup · 19.8 Leo leans in and tops it up: "my turn." · 23.0 Gemini: "we *got* you."
//          · Pisces and the Moon sob, happily
//  25.0    "Soft is strong. | *Fill* your cup." · hard cut at 26.8
import { moonFilm, HK } from '../../kpmoe01/moonkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const OWN = 18.2, LEO = 19.8
const CUPS = [{ x: 540, at: 2.6, who: 'leo' }, { x: 720, at: 3.4, who: 'gemini' }, { x: 900, at: 4.2, who: 'virgo' }]
const CAUGHT = { at: 5.4, x: 80, y: 1350, r: 110, out: [6.5, 6.65], label: 'YOUR CUP', arrow: 'tr', rec: false }

function cup(x, K, X, Y, fill, s = 1) {
  x.save(); x.translate(X, Y); x.scale(s, s)
  K.box(x, -50, -40, 100, 80, '#fffaf0', { o: 5 }); x.strokeStyle = K.INK; x.lineWidth = 9; x.beginPath(); x.arc(56, 0, 18, -1.4, 1.4); x.stroke()
  if (fill > 0) K.rect(x, -44, 34 - 70 * fill, 88, 70 * fill, '#c98a4a')
  x.restore()
}
function pour(x, K, X0, Y0, X1, Y1, k) {
  if (k <= 0 || k >= 1) return
  x.save(); x.strokeStyle = '#c98a4a'; x.lineWidth = 12; x.lineCap = 'round'
  x.beginPath(); x.moveTo(X0, Y0); x.quadraticCurveTo(X1, Y0, X1, Y1 - 20); x.stroke(); x.restore()
}
const fillOf = (t, at) => ease.outCubic(prog(t, at + 0.15, at + 0.75))

function party(x, t, K) {
  K.room(x, t, { wall: '#3a2a5e', wall2: '#1e1438', floor: '#2e2448', warm: 0.6, window: false })
  // the giant teacup the Moon landed in
  x.save(); x.translate(760, 900)
  x.fillStyle = K.INK; x.beginPath(); x.ellipse(0, -40, 260, 60, 0, 0, Math.PI * 2); x.fill()
  K.box(x, -240, -40, 480, 200, '#ffd9e6', { o: 8 }); x.fillStyle = '#ffd9e6'; x.beginPath(); x.ellipse(0, 160, 240, 50, 0, 0, Math.PI); x.fill()
  x.strokeStyle = K.INK; x.lineWidth = 22; x.beginPath(); x.arc(250, 60, 60, -1.3, 1.3); x.stroke()
  for (let i = 0; i < 5; i++) K.rect(x, -200 + i * 90, 40, 40, 40, '#ff8fb1')
  x.restore()
  // the table, friends and their cups
  K.box(x, -40, 1380, 1160, 46, '#8a5a3a', { o: 6 })
  for (const c of CUPS) K.drawSign(x, c.who, c.x, 1220, 150, t, { mood: t > LEO && c.who === 'leo' ? 'happy' : t > 23 ? 'sparkle' : 'happy', look: [-1, 0], seed: c.x, hops: c.who === 'gemini' ? [23.0] : [] })
}
function tea(x, t, K) {
  // the teacup rim in front of the Moon (it sits IN the cup)
  x.save(); x.translate(760, 900); K.box(x, -240, -40, 480, 60, '#ffd9e6', { o: 8 }); x.restore()
  // splash at the landing
  const sp = prog(t, -0.2, 0.9)
  if (sp > 0 && sp < 1) for (let i = 0; i < 12; i++) { const a = -Math.PI * (0.1 + 0.8 * i / 11), r = 80 + sp * 320; K.rect(x, 760 + Math.cos(a) * r, 860 + Math.sin(a) * r * 0.8 + sp * sp * 300, 18, 18, i % 2 ? '#c98a4a' : '#ffe0c0') }
  // cups + pours
  for (const c of CUPS) { pour(x, K, 470, 1170, c.x, 1340, prog(t, c.at, c.at + 0.8)); cup(x, K, c.x, 1340, fillOf(t, c.at), 0.85) }
  pour(x, K, 300, 1160, 170, 1330, prog(t, OWN + 0.2, OWN + 1.2))
  const own = Math.min(1, 0.55 * fillOf(t, OWN + 0.2) + 0.45 * fillOf(t, LEO + 0.4))
  pour(x, K, 520, 1160, 170, 1330, prog(t, LEO + 0.3, LEO + 1.3))
  cup(x, K, 170, 1340, own, 1.0)
}

const F = moonFilm({
  id: 'kpmoe12', sign: 'pisces', dur: 26.8, ending: 'cut',
  hook: { text: 'PISCES. | Shh. Let’s cry *together.*', out: [2.2, 2.4] },
  enter: { kind: 'crash', at: -0.6, x: 760, y: 800, size: 320 },
  whip: { at: 0.55 },
  shots: [{ at: -10, cam: [1.18, 560, 1000], push: 0.03 }],
  shakes: [0.1],
  moon: [
    { at: 0, mood: 'wide' },
    { at: 1.5, mood: 'sad' },
    { at: 9.1, mood: 'cry', tears: 2 },
    { at: 12.7, mood: 'sad', tears: 1 },
    { at: 15.7, mood: 'happy', tears: 0 },
    { at: 21.6, mood: 'cry', tears: 3 },
  ],
  me: [
    { at: 0, x: 330, y: 1250, s: 290, mood: 'wide', look: [1, 0.3], tears: 2 },
    { at: 2.3, mood: 'happy', tears: 1 },
    { at: 5.3, mood: 'wide', look: [-1, 0.6], tears: 1 },
    { at: 6.5, mood: 'sparkle', look: [0, 0], tears: 3 },
    { at: 9.1, mood: 'wide', look: [1, -0.5], tears: 2 },
    { at: 15.7, mood: 'sparkle', tears: 1 },
    { at: OWN, mood: 'happy', look: [-1, 0.5], tears: 1 },
    { at: LEO, mood: 'wide', look: [1, 0], tears: 2 },
    { at: 21.6, mood: 'sparkle', look: [0, 0], tears: 3 },
  ],
  meHops: [2.6, 3.4, 4.2, 6.7, 21.7, 22.1, 22.5],
  meProp(x, t, m, K) {
    // the teapot (tilts while pouring)
    const pouring = CUPS.some(c => t > c.at && t < c.at + 0.8) || (t > OWN + 0.2 && t < OWN + 1.2)
    x.save(); x.translate(m.x + m.s * 0.55, m.y + m.s * 0.12); x.rotate(pouring ? 0.5 : 0.05)
    K.box(x, -60, -40, 120, 90, '#9ad8ff', { o: 5 }); K.box(x, 56, -20, 60, 18, '#9ad8ff', { o: 4 }); K.box(x, -20, -60, 40, 22, '#7ab8e8', { o: 4 })
    x.restore()
  },
  says: [
    { t0: 6.6, t1: 9.0, who: 'pisces', text: 'who checks on *Pisces?*', x: 380, y: 1650, tail: -40, tailUp: true, size: 50 },
    { t0: 9.2, t1: 12.6, who: 'moon', text: 'i light up the whole night and get *half* the credit.', x: 540, y: 400, tail: 200, tailUp: false },
    { t0: 12.8, t1: 15.6, who: 'moon', text: 'pour for people who *pour back.*', x: 540, y: 400, tail: 200, tailUp: false },
    { t0: 15.8, t1: 18.0, who: 'moon', text: 'and pour some for *you.*', x: 540, y: 400, tail: 200, tailUp: false },
    { t0: LEO, t1: 21.6, who: 'leo', text: 'my turn.', x: 640, y: 1650, tail: -60, tailUp: true },
    { t0: 23.0, t1: 24.8, who: 'gemini', text: 'we *got* you.', x: 720, y: 1650, tail: 0, tailUp: true },
  ],
  heads: [
    { text: 'Pouring for *everyone.*', at: 2.4, out: [5.0, 5.25], top: 240, size: 90 },
    { text: 'Soft is strong. | *Fill* your cup.', at: 25.0, top: 240, size: 96 },
  ],
  fx: [{ f: HK.caught, c: HK.caughtCues, o: CAUGHT }],
  set(x, t, K) { party(x, t, K) },
  front(x, t, K) { tea(x, t, K) },
  cues: [
    ['whoosh', 0.05, 0.4, 0.05], ['glitter', 0.1, 1.0],
    ...CUPS.map(c => ['pluck', c.at + 0.2, 987.77, 0.03, 0.5, 0.2]),
    ['pluck', OWN + 0.3, 1174.66, 0.035, 0.6, -0.2], ['pluck', LEO + 0.4, 1318.51, 0.035, 0.6, 0.2],
    ['pluck', 6.8, 659.25, 0.035, 0.5, 0.3], ['pluck', 6.96, 587.33, 0.035, 0.5, 0.3], ['pluck', 7.14, 523.25, 0.03, 0.6, 0.3],
    ['pluck', 21.8, 659.25, 0.035, 0.5, 0.3], ['pluck', 21.96, 783.99, 0.035, 0.5, -0.3], ['pluck', 22.14, 987.77, 0.03, 0.6, 0.3], ['glitter', 21.7, 23.0],
  ],
  music: { style: 'dreamy', key: 'E', seed: 20212, sections: { drop: 0.6, breakdown: [6.6], lift: [OWN] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
