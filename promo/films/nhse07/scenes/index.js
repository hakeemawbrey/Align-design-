// nhse07: HOLIDAY SURVIVAL GUIDE No. 7, "Guests in Ten Minutes." (30 s vertical, Next 30 · b29, music: funk · Bb)
// The series look lives in ../../nhse01/survkit.js.
//   0.0–6.6    "Guests arrive | in *ten minutes.*"  ♍ Virgo sprints across the kitchen with a tray, a 14-item checklist
//              trailing behind it; the wall clock ticks. Pisces sniffles by the fridge.
//   6.6–13.9   "Ding-dong. | *Already?*"  The doorbell rings early; Virgo folds napkin swans at top speed and one
//              swan honks. ♍: "nobody look at the swans yet!"
//   13.9       card cut.
//   13.9–21.6  "Let them | *help.*"  THE STARS: "let them *help*. people love a job." / "a shared kitchen *is* the
//              party." ♎ Libra peels potatoes, ♌ Leo sets the plates, Virgo finally sits; the checklist gets one big tick.
//   21.6–25.6  "Packed: | *a spare apron.*"  THE STARS: "A messy kitchen means people came."
import { makeSurv, R, box, ink, room, table, door, mug, drawBits, sparkles, hearts, label, shadow, bubble,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, INTER } from '../../nhse01/survkit.js'

const VIR = '#f2c75c'
function clock(x, t, cx, cy, mins) {
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 70, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, 60, 0, 7); x.fill()
  const m = mins / 60 * Math.PI * 2 - Math.PI / 2, h = (7 + mins / 60) / 12 * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(h) * 30, cy + Math.sin(h) * 30); x.stroke()
  x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(m) * 48, cy + Math.sin(m) * 48); x.stroke()
}
function checklist(x, cx, top, w, n, ticks, { k = 1, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.rotate(rot); x.scale(k, k)
  box(x, -w / 2, 0, w, 30 + n * 34, '#fbf8f0', { b: 5 })
  for (let i = 0; i < n; i++) { R(x, INK, -w / 2 + 14, 18 + i * 34, 20, 20); R(x, '#fbf8f0', -w / 2 + 17, 21 + i * 34, 14, 14); R(x, 'rgba(27,18,54,0.35)', -w / 2 + 44, 24 + i * 34, w - 70 - (i * 29) % 50, 8); if (i < ticks) R(x, '#3fa86a', -w / 2 + 19, 23 + i * 34, 10, 10) }
  x.restore()
}
function tray(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -90, -8, 180, 16, '#c8d4ee', { b: 5 })
  for (let i = 0; i < 4; i++) drawBits(x, ['.CC.', 'CDDC', 'CDDC', '.CC.'], { C: '#d49a4a', D: '#6b3f2a' }, -60 + i * 40, -26, 6)
  x.restore()
}
const SWAN = ['....WW..', '...WWWO.', '...WW...', '..WW....', 'WWWWWWW.', '.WWWWWW.', '..WWWW..']
function kitchen(x, t) {
  room(x, t, { win: { x: 120, y: 470, w: 240, h: 260 }, wall: '#2a3a4a', wall2: '#32465a', lights: true })
  // fridge + counter
  box(x, 860, 640, 180, 600, '#d8e2ee', { b: 7 }); R(x, INK, 860, 860, 180, 6); R(x, '#8c86a8', 880, 700, 12, 120); R(x, '#8c86a8', 880, 900, 12, 160)
}

function act0(x, t, S) {
  const { u, hero } = S
  kitchen(x, t)
  clock(x, t, 560, 560, 50 + u * 0.6)
  table(x, 470, 1110, 520, { cloth: '#3a6a8a' })
  // Virgo sprints left → right → left with the tray, checklist trailing
  const ph = (u * 0.38 + 0.3) % 1, dir = ph < 0.5 ? 1 : -1, pos = ph < 0.5 ? ph * 2 : 2 - ph * 2
  const vx = lerp(170, 760, ease.inOutQuad(pos))
  for (let k = 1; k <= 2; k++) { x.save(); x.globalAlpha = 0.15 / k; hero(x, t, { x: vx - dir * 40 * k, y: 980, s: 230, mood: 'wide', bob: 0 }); x.restore() }
  checklist(x, vx - dir * 150, 900, 170, 14, 3, { rot: dir * 0.5 + 0.1 * Math.sin(t * 9) })
  shadow(x, vx, 1250, 200)
  hero(x, t, { x: vx, y: 980, s: 230, mood: 'wide', look: [dir, 0], bob: 0, squash: 0.06 * Math.sin(t * 22) })
  tray(x, vx + dir * 40, 860, 0.12 * Math.sin(t * 10))
}

function act1(x, t, S) {
  const { u, hero } = S
  kitchen(x, t)
  clock(x, t, 560, 560, 53 + u * 0.4)
  door(x, 150, 1240, { w: 180, h: 360, col: '#8a4a3a' })
  if (u < 1.4) { label(x, 'DING-DONG!', 260, 820, { size: 40, col: GOLD, font: INTER, weight: 800, rot: -0.1, alpha: Math.sin(Math.PI * prog(u, 0.1, 1.4)) }) }
  table(x, 540, 1110, 560, { cloth: '#3a6a8a' })
  // the swan line
  const n = Math.min(9, Math.floor(prog(u, 1.4, 5.2) * 9))
  for (let i = 0; i < n; i++) { const honk = i === 4 && u > 5.6 && u < 6.3; drawBits(x, SWAN, { W: '#fff', O: '#ff8a3a' }, 300 + i * 60, 1070 - (honk ? 16 : 0), 7, { rot: honk ? -0.25 : 0 }) }
  if (u > 5.6 && u < 6.6) label(x, 'HONK.', 560, 960, { size: 40, col: BONE, font: INTER, weight: 800 })
  hero(x, t, { x: 540, y: 960, s: 200, mood: u > 5.6 ? 'wide' : 'squint', look: u > 5.6 ? [0, 1] : [0, 1], squash: 0.05 * Math.sin(t * 26), bob: 0, hops: [S.t0 + 0.1, S.t0 + 5.62] })
}

function act2(x, t, S) {
  const { u, hero, star } = S
  kitchen(x, t)
  table(x, 540, 1110, 760, { cloth: '#3a6a8a' })
  // Libra peels (peels fly), Leo sets plates
  const lk = pop01(t, S.t0 + 0.8, 0.35, 2.2), ok2 = pop01(t, S.t0 + 1.6, 0.35, 2.2)
  if (lk > 0.01) {
    star('libra', x, t, { x: 260, y: 960, s: 170, pop: lk, mood: 'happy', seed: 8, hops: Array.from({ length: 8 }, (_, i) => S.t0 + 1.2 + i * 0.6) })
    for (let i = 0; i < 4; i++) { const p = ((t * 1.3 + i / 4) % 1); if (u > 1.2) R(x, '#d4a050', 330 + p * 80, 1000 - Math.sin(p * Math.PI) * 100, 22, 10) }
    box(x, 290, 1074, 90, 36, BONE, { b: 5 })
  }
  if (ok2 > 0.01) {
    star('leo', x, t, { x: 820, y: 960, s: 170, pop: ok2, mood: 'happy', seed: 9, hops: Array.from({ length: 6 }, (_, i) => S.t0 + 2 + i * 0.7) })
    const np = Math.min(4, Math.floor(prog(u, 2.0, 5.0) * 5))
    for (let i = 0; i < np; i++) { x.fillStyle = INK; x.beginPath(); x.ellipse(460 + i * 90, 1100, 40, 13, 0, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(460 + i * 90, 1100, 34, 9, 0, 0, 7); x.fill() }
  }
  // Virgo sits with a mug; the checklist gets one big tick
  const sit = u > 3.6
  hero(x, t, { x: 560, y: sit ? 1000 : 960, s: 190, mood: sit ? 'happy' : 'neutral', look: sit ? undefined : [-1, 0], hops: [S.t0 + 3.6, S.t0 + 5.9] })
  if (sit) mug(x, t, 660, 1060, 0.8)
  const ck = pop01(t, S.t0 + 4.6, 0.3, 2.2)
  checklist(x, 560, 500, 230, 8, 0, { k: ck, rot: 0.05 })
  const tk = pop01(t, S.t0 + 5.8, 0.3, 2.8)
  if (tk > 0.01) { drawBits(x, ['.......G', '......GG', 'G....GG.', 'GG..GG..', '.GGGG...', '..GG....'], { G: '#3fa86a' }, 560, 680, 22 * tk); sparkles(x, t, 560, 680, S.t0 + 5.82, 10, 160, 1, [MINT, BONE, GOLD]) }
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.05)
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.arc(0, -96, 40, Math.PI * 1.1, Math.PI * 1.9); x.stroke()
  box(x, -70, -100, 140, 70, '#ff8fb1', { b: 6 })
  box(x, -100, -34, 200, 170, '#ff8fb1', { b: 6 })
  box(x, -60, 20, 120, 60, '#ffc4d8', { b: 5 })
  drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 0, -66, 5)
  R(x, INK, -140, -28, 40, 10); R(x, INK, 100, -28, 40, 10)
  x.restore()
}

const EP = makeSurv({
  id: 'nhse07', ep: 7, hero: 'virgo', accent: '#9fe6b0',
  heads: ['Guests arrive | in *ten minutes.*', 'Ding-dong. | *Already?*', 'Let them | *help.*', 'Packed: | *a spare apron.*'],
  acts: [act0, act1, act2],
  line1: { t: 9.0, speaker: '♍︎ VIRGO', color: '#9fe6b0', text: 'nobody look at the *swans* yet!', close: 12.0 },
  tips: ['let them *help*. people love a job.', 'a shared kitchen *is* the party.'],
  last: 'A messy kitchen means *people came.*',
  item: { label: 'A SPARE APRON', draw: item },
  pis: [{ x: 950, y: 560, s: 100, noTissues: true }, { x: 950, y: 560, s: 100, noTissues: true }, { x: 950, y: 520, s: 100, noTissues: true, mood: 'happy', tears: 2 }],
  cues: [
    [...Array.from({ length: 13 }, (_, i) => ['tick', +(0.25 + i * 0.5).toFixed(2), 0.03]), ['whoosh', 0.2, 0.4, 0.025], ['whoosh', 1.5, 0.4, 0.025], ['whoosh', 2.8, 0.4, 0.025], ['whoosh', 4.1, 0.4, 0.025], ['whoosh', 5.4, 0.4, 0.025]],
    [['bell', 0.1, 1318.51, 0.05, 0.8, -0.3], ['bell', 0.45, 1046.5, 0.05, 1.0, -0.3], ...Array.from({ length: 9 }, (_, i) => ['pop', +(1.4 + i * 0.42).toFixed(2), 1174.66 + i * 40, 0.025, 0]), ['pluck', 5.62, 233, 0.06, 0.5, 0], ['pluck', 5.75, 220, 0.05, 0.4, 0]],
    [['pop', 0.85, 987.77, 0.035, -0.3], ['pop', 1.65, 1174.66, 0.035, 0.3], ['tick', 2.6, 0.04], ['tick', 3.3, 0.04], ['tick', 4.0, 0.04], ['pop', 3.62, 880, 0.03, 0], ['pop', 5.82, 1567.98, 0.05, 0], ['glitter', 5.82, 6.2]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [hearts, bubble, PINK, clamp, outK]
