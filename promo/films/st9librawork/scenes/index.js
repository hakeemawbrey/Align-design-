// st9librawork (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E32) · story 0–20.6, then the shared end card.
//   9 TO 5. "A Libra mediating the office *fight*."  The breakroom at 10:14: Aries and Taurus glare across the coffee
//   machine; Libra stands between them, the scale on its head tipping to whoever talks.
//   2.8   ARIES: "i was here *first.*"  4.8 TAURUS: "i was here *longer.*" (a punch-in on each)
//   6.4   THE PEACE SUMMIT: a round table, two flags, nameplates, a gavel, Libra in a translator headset.
//         LIBRA: "okay. *both* of you are valid." → "aries brews. taurus picks the *mug.*"  The scale levels.
//   12.6  back to frame 0's framing: they sip together… the pot is empty; Libra gets nothing. Fact chip: Libra is the
//         natural ruler of the 7th house (partnerships). ARIES: "wait. did *you* get one?" Taurus slides it the last cup.
//   17.4  last line: "Fair includes *you*."
//   Rewatch bait: the "DAYS WITHOUT A COFFEE FIGHT" sign reads 0, then flips to 1 at the end; the fridge note says
//   "LABEL YOUR FOOD" and someone has labelled the note. The ghost rises out of the coffee pot's steam slot at 9.6.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawLibraScale, LIBRA } from '../../st9librahome.js'
import { makeDay, star, tag, pop01 } from '../../st9lskit.js'

const DUR = 25
const T = { hookOut: 2.6, l1: 2.8, l2: 4.8, summit: 6.4, l3: 7.6, l4: 10.6, level: 11.6, back: 12.6, empty: 13.0, l5: 14.0, slide: 15.9, last: 17.4 }
const LIB = tag('libra'), ARI = tag('aries'), TAU = tag('taurus')
const LINES = [
  { t: T.l1, speaker: ARI, text: 'i was here *first.*', color: '#ff8a6a' },
  { t: T.l2, speaker: TAU, text: 'i was here *longer.*', color: '#f2c75c' },
  { t: T.l3, speaker: LIB, text: 'okay. *both* of you are valid.', color: LIBRA.rose },
  { t: T.l4, speaker: LIB, text: 'aries brews. taurus picks the *mug.*', color: LIBRA.mint },
  { t: T.l5, speaker: ARI, text: 'wait. did *you* get one?', color: '#ff8a6a' },
]
const INK = '#1b1236', BONE = '#efe6d6'
const rr = Math.round
const R = (x, c, X, Y, W, H) => { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
const block = (x, X, Y, W, H, c, hi, lo, o = 6) => { R(x, INK, X - o, Y - o, W + 2 * o, H + 2 * o); R(x, c, X, Y, W, H); if (hi) R(x, hi, X, Y, W, 6); if (lo) R(x, lo, X, Y + H - 6, W, 6) }
function label(x, text, cx, cy, size, col, { font = 'Space Mono', w = 700 } = {}) {
  x.save(); x.font = `${w} ${size}px '${font}', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText(text, cx + 2, cy + 3); x.fillStyle = col; x.fillText(text, cx, cy); x.restore()
}

/** the office breakroom: the set for every shot */
function breakroom(x, t, sh) {
  const FL = 1240
  const g = x.createLinearGradient(0, 0, 0, FL); g.addColorStop(0, '#1c2238'); g.addColorStop(1, '#34405e')
  x.fillStyle = g; x.fillRect(0, 0, 1080, FL)
  for (let yy = 0; yy < 520; yy += 130) R(x, '#2a3350', 0, yy, 1080, 4)          // the dropped ceiling
  for (let xx = 0; xx < 1080; xx += 180) R(x, '#2a3350', xx, 0, 4, 520)
  R(x, '#cfe6ff', 420, 24, 240, 18)                                                  // the strip light
  // the window (right) with the season sky
  const win = { x0: 760, y0: 560, x1: 1020, y1: 860 }
  R(x, INK, win.x0 - 14, win.y0 - 14, win.x1 - win.x0 + 28, win.y1 - win.y0 + 28)
  x.save(); x.beginPath(); x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0); x.clip(); sh.sky(x); x.restore()
  R(x, '#9aa6c4', win.x0 - 8, win.y0 - 8, win.x1 - win.x0 + 16, 8); R(x, '#9aa6c4', (win.x0 + win.x1) / 2 - 4, win.y0, 8, win.y1 - win.y0)
  // the sign: DAYS WITHOUT A COFFEE FIGHT
  block(x, 200, 650, 230, 150, BONE, null, '#cfc4b4')
  label(x, 'DAYS WITHOUT A', 315, 676, 20, '#5a4a6a'); label(x, 'COFFEE FIGHT', 315, 700, 20, '#5a4a6a')
  R(x, INK, 280, 718, 70, 64); label(x, t > T.last + 1.2 ? '1' : '0', 315, 752, 60, t > T.last + 1.2 ? '#6fdc6a' : '#ff5d73')
  // the floor
  const fg = x.createLinearGradient(0, FL, 0, 1920); fg.addColorStop(0, '#2a2f44'); fg.addColorStop(1, '#3a4058')
  x.fillStyle = fg; x.fillRect(0, FL, 1080, 680)
  for (let yy = FL + 40, k = 0; yy < 1920; yy += 70 + k * 10, k++) R(x, '#333a52', 0, yy, 1080, 4)
  R(x, INK, 0, FL - 6, 1080, 6)
  // the counter + the coffee machine (centre) + the fridge (left)
  block(x, 200, 1040, 680, 24, '#c9cfe0', '#eef2fa', '#9aa2b8')
  R(x, '#4a5270', 210, 1070, 660, FL - 1070); for (let k = 1; k < 4; k++) R(x, INK, 210 + k * 165, 1070, 6, FL - 1070)
  block(x, 440, 820, 200, 220, '#2b2b3a', '#4a4a60', null)
  R(x, '#ff5d73', 468, 846, 18, 12); R(x, '#6fdc6a', 496, 846, 18, 12)
  label(x, 'BREW', 590, 852, 18, '#9aa6c4')
  // the pot: full until it's empty
  const full = t < T.back ? 1 : 1 - prog(t, T.empty, T.empty + 0.6)
  block(x, 486, 940, 108, 90, '#bcd8f0', null, null, 4)
  R(x, '#3a1e12', 490, 944 + 82 * (1 - full), 100, 82 * full)
  R(x, INK, 520, 892, 40, 10)                                     // the steam slot (the ghost's spot)
  block(x, 30, 700, 150, 540, '#d8dcea', '#f2f4fa', '#a8aec2')
  R(x, INK, 30, 880, 150, 6); R(x, '#8a90a8', 150, 760, 10, 60); R(x, '#8a90a8', 150, 920, 10, 90)
  // the fridge note, labelled
  x.save(); x.translate(104, 980); x.rotate(0.05); R(x, INK, -50, -32, 100, 64); R(x, '#fff3a8', -46, -28, 92, 56)
  label(x, 'LABEL YOUR', 0, -10, 13, '#5a3a1e'); label(x, 'FOOD', 0, 8, 13, '#5a3a1e'); x.restore()
  x.save(); x.translate(130, 1012); x.rotate(-0.12); R(x, INK, -30, -10, 60, 20); R(x, '#ffffff', -27, -7, 54, 14); label(x, 'NOTE', 0, 0, 11, '#ff5d73'); x.restore()
  return { win, floor: FL, ghost: { x: 540, y: 892 } }
}

/** the summit furniture (shot 2): banner, round table, flags, nameplates, the gavel */
function summit(x, t) {
  const k = pop01(t, T.summit, 0.35, 2)
  x.save(); x.translate(540, 1240); x.scale(k, k); x.translate(-540, -1240)
  block(x, 180, 470, 720, 90, '#2a63b8', '#4f86d8', '#1c4a90')
  label(x, '☆ PEACE SUMMIT ☆', 540, 504, 36, BONE); label(x, 'BREAKROOM B · 10:20 AM', 540, 540, 18, '#cfe0ff')
  x.save(); x.translate(540, 1215); x.scale(1, 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 420, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#7a5a3e'; x.beginPath(); x.arc(0, 0, 408, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#8f6c4c'; x.beginPath(); x.arc(0, -20, 380, 0, Math.PI * 2); x.fill(); x.restore()
  R(x, INK, 400, 1250, 280, 200); R(x, '#5c4430', 406, 1250, 268, 194)
  for (const [cx, col, name] of [[300, '#f0603a', 'ARIES'], [780, '#e9b24a', 'TAURUS']]) {
    R(x, INK, cx - 4, 1080, 8, 120); R(x, col, cx + 4, 1084, 70, 44); R(x, BONE, cx + 4, 1104, 70, 8)       // the flags
    block(x, cx - 80, 1190, 160, 44, BONE, null, '#cfc4b4', 4); label(x, name, cx, 1213, 24, INK)            // nameplates
  }
  block(x, 470, 1190, 140, 44, BONE, null, '#cfc4b4', 4); label(x, 'MEDIATOR', 540, 1213, 20, LIBRA.roseLo)
  x.restore()
}
function gavel(x, t, cx, cy) {
  const hits = [T.l3 - 0.3, T.level]
  let a = -0.5
  for (const h of hits) if (t > h && t < h + 0.4) a = -0.5 + 1.1 * Math.sin(Math.PI * prog(t, h, h + 0.4))
  x.save(); x.translate(cx, cy); x.rotate(a)
  R(x, INK, -6, -6, 70, 16); R(x, '#a8743e', -2, -2, 62, 8)
  R(x, INK, 54, -22, 34, 48); R(x, '#c98a52', 58, -18, 26, 40); x.restore()
}

function ariesState(t) {
  if (t < T.summit) return { mood: t < T.l2 ? 'squint' : 'eyeroll', look: [1, 0] }
  if (t < T.level) return { mood: 'squint', look: [1, -1] }
  if (t < T.empty + 0.6) return { mood: 'happy' }
  if (t < T.slide) return { mood: 'wide', look: [1, 0], blink: false }
  return { mood: 'happy' }
}
function taurusState(t) {
  if (t < T.summit) return { mood: t < T.l2 ? 'eyeroll' : 'squint', look: [-1, 0] }
  if (t < T.level) return { mood: 'squint', look: [-1, -1] }
  if (t < T.empty + 0.6) return { mood: 'happy' }
  return { mood: 'happy', look: [-1, 0] }
}
function libraState(t) {
  if (t < T.summit) return { mood: 'wide', look: [t < T.l2 ? -1 : 1, 0], blink: false }
  if (t < T.level) return { mood: 'neutral', look: [0, 0] }
  if (t < T.back) return { mood: 'sparkle' }
  if (t < T.empty + 0.5) return { mood: 'happy' }
  if (t < T.slide + 0.2) return { mood: 'sleepy', zzz: false }
  return { mood: 'sparkle' }
}
const tiltAt = t => t < T.l2 - 0.2 ? -0.7 + 0.1 * Math.sin(t * 6) : t < T.summit ? 0.7 + 0.1 * Math.sin(t * 6) : t < T.level ? 0.5 * Math.sin(t * 3) : 0.4 * Math.exp(-(t - T.level) * 3) * Math.cos((t - T.level) * 12)

function mug(x, cx, cy, col, s = 1, steam = 0, t = 0) {
  R(x, INK, cx - 22 * s, cy - 26 * s, 44 * s, 52 * s); R(x, col, cx - 18 * s, cy - 22 * s, 36 * s, 44 * s)
  R(x, INK, cx + 18 * s, cy - 12 * s, 14 * s, 26 * s); R(x, col, cx + 18 * s, cy - 8 * s, 8 * s, 18 * s)
  R(x, '#3a1e12', cx - 14 * s, cy - 18 * s, 28 * s, 6 * s)
  if (steam > 0) { x.fillStyle = `rgba(239,230,214,${0.5 * steam})`; for (let i = 0; i < 3; i++) x.fillRect(cx - 10 * s + i * 10 * s + Math.sin(t * 4 + i) * 4, cy - 48 * s - ((t * 30 + i * 12) % 24), 5 * s, 12 * s) }
}

const EP = makeDay({
  numeral: 'S9 E32', sign: 'libra', ep: 'work', duration: DUR, key: 'D',
  hook: { text: 'A Libra mediating the office *fight.*', out: [T.hookOut - 0.2, T.hookOut], accentColor: LIBRA.rose },
  shots: [
    { at: 0, room: 'office', set: breakroom, hour: 10.2, zoom: { x: 540, y: 1000, s: 1.18 } },
    { at: T.l1, room: 'office', set: breakroom, hour: 10.2, zoom: { x: 340, y: 1000, s: 1.4 } },
    { at: T.l2, room: 'office', set: breakroom, hour: 10.3, zoom: { x: 740, y: 1000, s: 1.4 } },
    { at: T.summit, room: 'office', set: breakroom, hour: 10.4, zoom: { x: 540, y: 1000, s: 1.18 }, summit: true },
    { at: T.back, room: 'office', set: breakroom, hour: 10.6, zoom: { x: 540, y: 1000, s: 1.18 } },
  ],
  clock: [{ at: 0, from: '10:14' }, { at: T.summit, dur: 0.7, from: '10:14', to: '10:20' }, { at: T.back, dur: 0.7, from: '10:20', to: '10:31' }],
  stamps: [
    { at: T.summit + 0.2, out: T.l4 - 0.2, time: '10:20 AM', text: 'emergency *peace* summit' },
    { at: T.back + 0.2, out: T.l5 - 0.2, time: '10:31 AM', text: 'peace *achieved*' },
  ],
  lines: LINES, box: { close: 17.6 },
  fact: { at: T.back + 0.3, dur: 4.0, label: '★ ASTROLOGY SAYS', text: 'Libra is the natural ruler of the 7th house: partnerships.', color: LIBRA.color },
  ghost: { room: 'office', at: 9.6, x: 540, y: 892, from: 'below' },
  battery: 0.72,
  pitch: { [LIB]: 880, [ARI]: 660, [TAU]: 440 },
  cuts: [{ t: T.summit, kind: 'flip' }],
  draw(x, t, a, sh) {
    const sum = !!sh.summit
    if (sum) summit(x, t)
    const ay = sum ? 1040 : 1120
    const rA = star(x, 'aries', sum ? 300 : 250, ay, 230, t, { ...ariesState(t), seed: 2, hops: [T.l1, T.l1 + 0.4, T.level + 0.1, T.l5] })
    const rT = star(x, 'taurus', sum ? 780 : 830, ay, 230, t, { ...taurusState(t), seed: 5, hops: [T.l2, T.l2 + 0.4, T.level + 0.15, T.slide] })
    const rL = star(x, 'libra', 540, sum ? 980 : 1170, sum ? 200 : 210, t, { ...libraState(t), seed: 3, hops: [T.l3, T.l4, T.level, T.slide + 0.3] })
    drawLibraScale(x, t, rr(rL.x), rr(rL.top + 8), 5, tiltAt(t))
    if (sum) {
      // the translator headset + the gavel
      R(x, INK, rL.x - 66, rL.y - 40, 14, 44); R(x, '#4a4a60', rL.x - 62, rL.y - 36, 6, 36); R(x, INK, rL.x - 66, rL.y + 2, 30, 10)
      gavel(x, t, rL.x + 80, rL.y + 20)
    }
    // the mugs: one each after the deal; the last one slides to Libra
    if (t > T.level && !sum) {
      mug(x, rA.x + 90, 1030, '#f0603a', 1, 1, t); mug(x, rT.x - 90, 1030, '#e9b24a', 1, 1, t)
      if (t > T.slide) { const p = ease.outCubic(prog(t, T.slide, T.slide + 0.6)); mug(x, lerp(rT.x - 150, 620, p), 1030, LIBRA.mint, 1, p, t) }
    }
    if (sum && t > T.level) { mug(x, 380, 1150, '#f0603a', 0.8); mug(x, 700, 1150, '#e9b24a', 0.8) }
    void a; void clamp
  },
  last: { at: T.last, text: 'Fair includes *you.*', accentColor: LIBRA.rose, size: 120, accentSize: 170 },
  cues: [
    ['tom', T.l3 - 0.2, 0.08], ['pop', T.l3 - 0.18, 523.25, 0.04, 0],
    ['tom', T.level + 0.1, 0.09], ['pop', T.level + 0.12, 1046.5, 0.05, 0], ['glitter', T.level + 0.1, T.level + 0.7],
    ['whoosh', T.empty, 0.3, 0.02], ['pluck', T.empty + 0.6, 392, 0.04, 0.5, 0],
    ['whoosh', T.slide, 0.4, 0.03], ['pop', T.slide + 0.6, 1318.51, 0.05, 0.1], ['bell', T.slide + 0.65, 1760, 0.02, 1.2, 0],
    ['pop', T.last + 1.2, 1567.98, 0.03, -0.5],
  ],
})
export const { DURATION, SCENES, CUES } = EP
export { T }
