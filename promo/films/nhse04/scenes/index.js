// nhse04: HOLIDAY SURVIVAL GUIDE No. 4, "Social Battery: 2%." (30 s vertical, Next 30 · b29, music: lofi · Am)
// The series look lives in ../../nhse01/survkit.js.
//   0.0–6.6    "Social battery: | *2%.*"  ♋ Cancer holds a big smile in the middle of a loud party, a battery
//              blinking red above its head. Music notes bounce everywhere. Pisces sniffles.
//   6.6–13.9   "Louder. | *Even* louder."  The speakers thump, the battery hits 1%, Cancer sinks into the coat pile
//              until only its eyes peek out. ♋: "I live in the coat pile now."
//   13.9       card cut.
//   13.9–21.6  "Ten *quiet* | minutes."  THE STARS: "you're allowed a *quiet ten minutes*." / "say where you're going.
//              then *go*." Cancer tells a friend "grabbing some air, back in ten!" and sits on the porch step in the snow
//              while the battery charges to 100%.
//   21.6–25.6  "Packed: | *a porch light.*"  THE STARS: "Leaving for ten minutes isn't leaving."
import { makeSurv, R, box, ink, room, door, battery, glow, snow, drawBits, sparkles, label, shadow, bubble,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, INTER } from '../../nhse01/survkit.js'

const CAN = '#bfe8ff'
const CROWD = ['aries', 'leo', 'gemini', 'libra', 'sagittarius', 'aquarius', 'taurus', 'virgo']
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
function notes(x, t, n, amp = 1) {
  for (let i = 0; i < n; i++) {
    const p = ((t * 0.5 + i / n) % 1), cx = 80 + ((i * 197) % 920), cy = 1150 - p * 750
    drawBits(x, NOTE, { X: [GOLD, PINK, MINT, '#7fd0ff'][i % 4] }, cx + Math.sin(t * 4 + i) * 20, cy, 7 * amp, { alpha: 1 - p })
  }
}
function crowd(x, t, star, y, s, k = 1) {
  CROWD.forEach((c, i) => star(c, x, t, { x: 90 + i * 130, y: y + (i % 2) * 40, s, pop: k, mood: i % 3 ? 'happy' : 'wink', seed: i + 2, hops: Array.from({ length: 20 }, (_, j) => j * 0.48 + i * 0.12) }))
}
function speaker(x, t, cx, by, h) {
  const th = 1 + 0.06 * Math.max(0, Math.sin(t * 13))
  x.save(); x.translate(cx, by); x.scale(th, th)
  box(x, -70, -h, 140, h, '#2a2148', { b: 7 })
  for (const [yy, r] of [[-h * 0.7, 44], [-h * 0.28, 30]]) { x.fillStyle = INK; x.beginPath(); x.arc(0, yy, r + 6, 0, 7); x.fill(); x.fillStyle = '#4a3f7a'; x.beginPath(); x.arc(0, yy, r, 0, 7); x.fill() }
  x.restore()
}
function coats(x, t, cx, by, rise) {
  const C = ['#c8463c', '#3a6a8a', '#5a8a3a', '#8a5aa8', '#d4a040', '#3a3a5a']
  for (let i = 0; i < 9; i++) { const w = 200 + (i % 3) * 30; box(x, cx - w / 2 + ((i * 37) % 90) - 45, by - 40 - i * 34 * rise, w, 50, C[i % 6], { b: 5 }) }
}

function act0(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: null })
  notes(x, t, 9)
  crowd(x, t, star, 1210, 100)
  shadow(x, 540, 1250, 260)
  // the smile holds… the eyes don't
  hero(x, t, { x: 540, y: 1000, s: 300, mood: u < 2.6 ? 'happy' : u < 4.4 ? 'neutral' : 'wide', look: [0, 0], squash: 0.03 * Math.sin(t * 9), hops: [0.48, 1.44, 2.4] })
  const lv = 0.02 + 0.01 * (Math.floor(t * 2) % 2 && u < 0.5 ? 0 : 0)
  battery(x, t, 540, 640, lv, { w: 220, h: 96 })
  if (u > 4.4) { const F = { x: 690, y: 880 }; for (let i = 0; i < 2; i++) { const p = ((t + i * 0.5) % 1); R(x, '#8fe3ff', F.x + i * 20, F.y + p * 50, 10, 14) } }
}

function act1(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: null })
  speaker(x, t, 120, 1240, 380); speaker(x, t, 960, 1240, 380)
  notes(x, t, 14, 1.3)
  crowd(x, t, star, 1210, 80)
  // the coat pile on a chair; Cancer sinks in
  box(x, 360, 1000, 360, 40, '#6b3f2a', { b: 6 }); R(x, INK, 380, 1040, 18, 200); R(x, INK, 682, 1040, 18, 200)
  const sink = ease.inOutCubic(prog(u, 1.4, 3.2))
  const rise = lerp(0.35, 1, sink), topY = 1000 - 40 - 8 * 34 * rise
  coats(x, t, 540, 1000, rise)
  hero(x, t, { x: 540, y: topY - lerp(60, -10, sink), s: 200, mood: sink > 0.6 ? 'neutral' : 'wide', look: [Math.sin(t * 1.5) > 0 ? 0.8 : -0.8, 0], bob: 0 })
  box(x, 400, topY + 30, 280, 54, '#c8463c', { b: 5 }); box(x, 380, topY + 70, 320, 54, '#3a6a8a', { b: 5 })
  battery(x, t, 540, 500, 0.01, { w: 200, h: 86 })
}

function act2(x, t, S) {
  const { u, hero, star } = S
  if (u < 2.2) {
    room(x, t, { win: null })
    notes(x, t, 6)
    star('leo', x, t, { x: 780, y: 1100, s: 190, mood: 'happy', look: [-1, 0], seed: 9, hops: [S.t0 + 1.4] })
    hero(x, t, { x: 400, y: 1100, s: 210, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.6, S.t0 + 0.9] })
    bubble(x, t, 450, 870, S.t0 + 0.5, S.t0 + 2.2, 'grabbing some air, back in ten!', { size: 30, tail: -0.3 })
    bubble(x, t, 760, 960, S.t0 + 1.4, S.t0 + 2.2, 'take your time!', { size: 30, tail: 0.3 })
    return
  }
  // the porch: house wall, lit window, a step, falling snow
  R(x, '#1a2650', 280, 0, 800, 1250)
  R(x, '#5a3d2a', 280, 0, 800, 1250); for (let i = 0; i < 14; i++) R(x, '#4a3020', 280, i * 90, 800, 10)
  box(x, 700, 560, 260, 260, '#ffd896', { b: 10 }); glow(x, 830, 690, 420, 0.25)
  R(x, INK, 825, 560, 10, 260); R(x, INK, 700, 685, 260, 10)
  door(x, 450, 1180, { w: 200, h: 380, col: '#8a4a3a', open: 0 })
  box(x, 300, 1180, 520, 60, '#8c86a8', { b: 6 })
  R(x, '#aebbe0', 0, 1240, 1080, 680); R(x, '#c8d4ee', 0, 1240, 1080, 20)
  // porch light
  box(x, 600, 760, 40, 60, GOLD, { b: 5 }); glow(x, 620, 790, 260, 0.35, '255,220,140')
  snow(x, t, { n: 70, y1: 1250 })
  const v = u - 2.2
  shadow(x, 560, 1185, 200)
  hero(x, t, { x: 560, y: 1080, s: 210, mood: v > 3.5 ? 'happy' : 'sleepy', look: [0, -1], bob: 3, zzz: false })
  battery(x, t, 560, 860, clamp(0.02 + 0.98 * ease.inOutQuad(prog(v, 0.6, 4.4))), { w: 190, h: 80 })
  if (v > 4.4) sparkles(x, t, 560, 860, S.t0 + 2.2 + 4.42, 10, 150, 1, [MINT, BONE, GOLD])
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  glow(x, 0, 10, 160, 0.4, '255,220,140')
  box(x, -14, -110, 28, 40, INK, { b: 3 })
  box(x, -60, -76, 120, 24, '#3a3a5a', { b: 6 })
  box(x, -48, -52, 96, 110, '#ffe7a8', { b: 7, hi: '#fff6d0' })
  R(x, INK, -4, -52, 8, 110); R(x, INK, -48, 0, 96, 8)
  box(x, -60, 58, 120, 22, '#3a3a5a', { b: 6 })
  x.restore()
}

const EP = makeSurv({
  id: 'nhse04', ep: 4, hero: 'cancer', accent: CAN,
  heads: ['Social battery: | *2%.*', 'Louder. | *Even* louder.', 'Ten *quiet* | minutes.', 'Packed: | *a porch light.*'],
  acts: [act0, act1, act2],
  line1: { t: 10.3, speaker: '♋︎ CANCER', color: CAN, text: 'I live in the *coat pile* now.', close: 13.5 },
  tips: ['you’re allowed a *quiet ten minutes*.', 'say where you’re going. then *go*.'],
  last: 'Leaving for ten minutes *isn’t* leaving.',
  item: { label: 'A PORCH LIGHT', draw: item },
  pis: [{ x: 960, y: 560, s: 100, noTissues: true }, { x: 960, y: 560, s: 100, noTissues: true }, { x: 160, y: 520, s: 100, noTissues: true, look: [1, -0.5] }],
  cues: [
    [['pluck', 0.1, 220, 0.03, 0.4, 0], ['tick', 0.5, 0.03], ['tick', 1.0, 0.03], ['tick', 1.5, 0.03], ['pluck', 4.4, 196, 0.035, 0.5, 0.2]],
    [['tom', 0.1, 70, { gain: 0.2, decay: 0.2 }], ['tom', 0.6, 70, { gain: 0.2, decay: 0.2 }], ['tom', 1.1, 70, { gain: 0.2, decay: 0.2 }], ['whoosh', 1.4, 1.6, 0.025], ['tick', 3.2, 0.04]],
    [['pop', 0.55, 880, 0.035, -0.2], ['pop', 1.45, 1174.66, 0.035, 0.3], ['whoosh', 2.1, 0.4, 0.03], ['riser', 2.8, 6.6, 0.025], ['bell', 6.62, 1760, 0.03, 1.1, 0], ['glitter', 6.62, 7.0]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, RED, BONE, outK, pop01]
