// trwrongdate: WRONG ANSWERS ONLY, "Describe the perfect first date." (20 s vertical, Star Talk Trends §17,
// music: chiptune · G). Story 0–15.6, then the shared end card. The format look lives in ./wrongkit.js (identical in all five).
//   0.0–2.3    hook: the question card "Describe the perfect | *first date.*" pops, the WRONG ANSWERS ONLY tape slaps on,
//              ♈ ♑ ♉ pop up underneath hopping ("ooh!" "me! me!" "pick ME"). The card docks at the top.
//   2.3–5.0    ♈ ARIES "A race. *I win.*"  Aries sprints through a finish tape, confetti, "I WON!"… the date strolls in
//              late: "…it was a race?"
//   5.0–7.7    ♑ CAPRICORN "A quarterly *budget review.*"  A flip chart: FRIES, TIPS, FUN (tiny bar). "any questions?"
//              The date is asleep.
//   7.7        card cut.
//   7.7–10.6   ♉ TAURUS (the unhinged third) "Dinner. Then dinner. | Then *dinner.*"  The plate tower grows, wobbles, keeps
//              going ("COURSE 9"); the date is very full.
//   10.6       the turn: the tape-stops, the card drops back, THE STARS: "ahem. the *real* one?"
//   11.75      THE STARS: "Right answer: *you*."  13.0 the gold RIGHT ANSWER stamp; the bug's WRONG becomes RIGHT.
//              In the middle: a little table, one candle, a tent card "RESERVED · for you"; Pisces fountains.
import { makeWrong, drawStarChar, R, box, bubble, label, shadow, sparkles, confetti, hearts, table, candle, drawBits, pop01, outK, prog, lerp, clamp, ease, signStar, INK, BONE, GOLD, PINK, RED, WRONG, INTER, MONO, T } from './wrongkit.js'

const LIB = signStar('libra'), SAG = signStar('sagittarius'), CAN = signStar('cancer')
const mate = (SIGN, seed) => (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: SIGN.color, glyph: o.s >= 150 ? SIGN.glyph : null, seed, glow: 1, ...o })
const libraDate = mate(LIB, 11), sagDate = mate(SAG, 13), cancerDate = mate(CAN, 15)

// ── ANSWER 1: a race, to the date
function ans1(x, t, S) {
  const { u, t0, t1, hero } = S
  // the track
  R(x, '#2a2150', 0, 1150, 1080, 70); R(x, '#3a2d66', 0, 1150, 1080, 8)
  for (let i = 0; i < 8; i++) R(x, 'rgba(239,230,214,0.3)', ((i * 160 - u * 900) % 1280 + 1280) % 1280 - 100, 1188, 80, 8)
  // finish posts + tape (snaps at the break)
  const FX = 760, brk = 0.82
  for (const px of [FX - 150, FX + 150]) { box(x, px - 9, 880, 18, 270, BONE, { b: 5 }); for (let j = 0; j < 6; j++) R(x, RED, px - 9, 890 + j * 46, 18, 20) }
  if (u < brk) {
    for (let i = 0; i < 15; i++) R(x, i % 2 ? BONE : RED, FX - 150 + i * 20, 975, 20, 14)
  } else {
    const f = ease.outCubic(prog(u, brk, brk + 0.5)), fl = 0.08 * Math.sin(t * 9) * (1 - f * 0.5)
    for (const d of [-1, 1]) {
      x.save(); x.translate(FX + d * 150, 982); x.rotate(-d * (1.35 * f + fl))
      for (let i = 0; i < 7; i++) R(x, i % 2 ? BONE : RED, d < 0 ? i * 20 : -(i + 1) * 20, -7, 20, 14)
      x.restore()
    }
  }
  // Aries: sprints in, breaks the tape, celebrates
  const run = ease.inQuad(prog(u, 0.0, brk))
  let ax = lerp(-160, FX, run), ay = 1010
  if (u > brk) ax = FX - 40 * ease.outCubic(prog(u, brk, brk + 0.3)) + 0
  if (u < brk) for (let i = 0; i < 4; i++) R(x, 'rgba(239,230,214,0.55)', ax - 200 - i * 40, 930 + i * 34, 120 - i * 18, 8)
  const winHops = [t0 + brk + 0.15, t0 + brk + 0.5, t0 + brk + 0.85, t0 + brk + 1.2, t0 + 2.2]
  shadow(x, ax, 1150, 200)
  hero(x, t, { x: ax, y: ay, s: 230, mood: u < brk ? 'squint' : 'sparkle', look: [1, 0], hops: u > brk ? winHops : [t0 + 0.2, t0 + 0.4, t0 + 0.6], squash: u < brk ? -0.06 : 0 })
  confetti(x, t, t0 + brk, FX, 900)
  // trophy pops over Aries
  const tk = pop01(t, t0 + brk + 0.2, 0.3, 2.6)
  if (tk > 0.01) drawBits(x, ['GGGGGGG', 'GYGGGYG', '.GGGGG.', '..GGG..', '...G...', '..GGG..', '.BBBBB.'], { G: GOLD, Y: '#fff1a8', B: '#8a5a3c' }, ax, 760 - 6 * Math.sin(t * 6), 13 * tk)
  bubble(x, t, ax - 60, 640, t0 + brk + 0.3, t1, 'I WON!!', { size: 40, tail: 0.3, col: '#ffe27a' })
  // the date strolls in late
  const dk = ease.outCubic(prog(u, 1.55, 2.1))
  if (dk > 0) {
    const dx = lerp(-140, 260, dk)
    shadow(x, dx, 1150, 170)
    libraDate(x, t, { x: dx, y: 1030, s: 190, mood: u > 2.0 ? 'wide' : 'neutral', look: [1, 0], hops: [S.t0 + 1.7, S.t0 + 1.95] })
    bubble(x, t, 300, 840, t0 + 2.0, t1, '…it was a race?', { size: 32, tail: -0.2 })
  }
}

// ── ANSWER 2: a budget review
function ans2(x, t, S) {
  const { u, t0, t1, hero } = S
  // the flip chart
  const CX = 330, top = 470
  box(x, CX - 10, top + 380, 20, 300, '#6b4430', { b: 5 })
  for (const d of [-1, 1]) { x.save(); x.translate(CX, top + 640); x.rotate(d * 0.35); box(x, -8, 0, 16, 140, '#6b4430', { b: 5 }); x.restore() }
  box(x, CX - 220, top, 440, 420, '#fbf6ea', { b: 7 })
  R(x, '#6b4430', CX - 236, top - 22, 472, 22)
  x.save(); x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('DATE NIGHT', CX, top + 50); x.font = `700 24px ${MONO}`; x.fillStyle = '#7a3a9a'; x.fillText('BUDGET REVIEW', CX, top + 84); x.restore()
  // bars: FRIES, TIPS, FUN (tiny)
  const bars = [['FRIES', 230, '#f39a3a'], ['TIPS', 170, '#4f8df0'], ['FUN', 22, PINK]]
  bars.forEach(([lab, h, col], i) => {
    const g = ease.outBack(prog(u, 0.35 + i * 0.18, 0.75 + i * 0.18)), bx = CX - 150 + i * 110
    if (g > 0) box(x, bx, top + 360 - h * g, 70, h * g, col, { b: 4 })
    x.save(); x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText(lab, bx + 35, top + 396); x.restore()
  })
  R(x, INK, CX - 175, top + 362, 360, 5)
  // the circled tiny bar (red marker)
  const ck = prog(u, 1.15, 1.5)
  if (ck > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(CX + 105, top + 330, 62, 46, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ck); x.stroke(); x.restore() }
  // Capricorn presents, with a pointer
  shadow(x, 700, 1150, 200)
  const F = { x: 700, y: 950 }
  hero(x, t, { x: F.x, y: F.y, s: 230, mood: u > 1.6 ? 'happy' : 'squint', look: [-1, -0.4], hops: [t0 + 0.3, t0 + 1.15, t0 + 1.7] })
  const wig = 0.06 * Math.sin(t * 7)
  x.save(); x.translate(F.x - 90, F.y - 40); x.rotate(-2.62 + wig + (u > 1.1 && u < 1.5 ? 0.12 : 0)); R(x, INK, -5, -5, 300, 14); R(x, '#c98a1f', 0, -1, 290, 6); R(x, RED, 280, -3, 14, 10); x.restore()
  // a tiny briefcase at its feet
  box(x, 760, 1100, 90, 56, '#6b4430', { b: 5, hi: '#8a5a3c' }); R(x, INK, 790, 1086, 30, 14)
  bubble(x, t, 690, 720, t0 + 1.65, t1, 'any questions?', { size: 34, tail: 0 })
  // the date: asleep
  shadow(x, 920, 1150, 140)
  sagDate(x, t, { x: 920, y: 1050, s: 160, mood: u > 0.9 ? 'sleepy' : 'neutral', look: [-1, 0], bob: 6 })
}

// ── ANSWER 3: dinner, then dinner, then dinner
function ans3(x, t, S) {
  const { u, t0, t1, hero } = S
  table(x, 540, 1090, 640)
  // Taurus, chomping
  const chomps = [0.45, 0.85, 1.25, 1.65, 2.05, 2.45].map(c => t0 + c)
  hero(x, t, { x: 330, y: 940, s: 250, mood: 'heart', look: [1, 0], hops: chomps })
  // the plate tower
  const n = Math.min(11, Math.floor(prog(u, 0.25, 2.35) * 11) + (u > 0.25 ? 1 : 0))
  const sway = 0.02 * Math.sin(t * 4) * n / 6
  x.save(); x.translate(650, 1088); x.rotate(sway)
  for (let i = 0; i < n; i++) {
    const land = pop01(t, t0 + 0.25 + i * (2.1 / 11), 0.2, 2.6)
    const py = -16 - i * 30 - (1 - land) * 80
    box(x, -90, py, 180, 16, '#fbf6ea', { b: 5 }); R(x, '#cfe6ff', -60, py + 4, 120, 6)
  }
  // dome on top
  if (n > 0) { const py = -16 - n * 30; drawBits(x, ['..SSSS..', '.SSSSSS.', 'SSHSSSSS', 'SSSSSSSS'], { S: '#c9d2e6', H: '#ffffff' }, 0, py - 6, 12) }
  x.restore()
  label(x, `COURSE ${Math.max(1, n)}`, 650, 1088 - 16 - n * 30 - 90, { size: 30, col: '#ffe27a', alpha: n > 0 ? 1 : 0 })
  // the date: very, very full
  const full = clamp(prog(u, 0.6, 2.4))
  cancerDate(x, t, { x: 900, y: 960, s: 180, mood: u > 1.9 ? 'wide' : 'happy', look: [-1, -0.6], squash: 0.12 * full })
  bubble(x, t, 870, 760, t0 + 1.9, t1, 'so… full…', { size: 30, tail: 0.2 })
}

// ── the finale: one table, one candle, a seat reserved for you
function finale(x, t, S) {
  const { ok } = S
  const k = pop01(t, T.undock[0] + 0.15, 0.4, 2.2) * ok
  if (k <= 0.01) return
  x.save(); x.translate(510, 1160); x.scale(1.2 * k, 1.2 * k); x.translate(-540, -1160)
  // the empty chair (right) with a glowing heart
  box(x, 690, 1000, 20, 160, '#6b4430', { b: 5 }); box(x, 690, 1080, 110, 18, '#8a5a3c', { b: 5 }); box(x, 780, 1098, 18, 70, '#6b4430', { b: 5 })
  table(x, 520, 1150, 300)
  candle(x, t, 450, 1150)
  // the tent card
  box(x, 500, 1052, 170, 94, BONE, { b: 5 })
  x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 20px ${MONO}`; x.fillStyle = '#7a3a9a'; x.fillText('RESERVED', 585, 1080)
  x.font = `italic 500 38px 'EB Garamond'`; x.fillStyle = RED; x.fillText('for you', 585, 1118)
  x.restore()
  const hk = pop01(t, T.right + 0.2, 0.35, 2.6) * ok
  if (hk > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5c8a' }, 745, 960 - 8 * Math.sin(t * 4), 11 * hk)
  hearts(x, t, T.right + 0.35, 745, 930, { n: 6, spread: 160 })
  sparkles(x, t, 745, 960, T.right + 0.25, 10, 120, 2, [GOLD, PINK, BONE])
  x.restore()
}

const EP = makeWrong({
  q: 'Describe the perfect | *first date.*', deep: '#b8326a', tape: '#ffe27a',
  answers: [
    { sign: 'aries', text: '“A race. *I win.*”', draw: ans1,
      cues: [['riser', 0.0, 0.8, 0.02], ['tick', 0.82, 0.07], ['pop', 0.82, 1318.51, 0.05, 0.2], ['glitter', 0.82, 1.3], ['pop', 1.05, 1567.98, 0.04, 0.2], ['bell', 1.1, 1760, 0.025, 0.8, 0.2], ['pop', 2.0, 587.33, 0.035, -0.4]] },
    { sign: 'capricorn', text: '“A quarterly *budget review.*”', draw: ans2,
      cues: [['pop', 0.4, 659.25, 0.03, -0.3], ['pop', 0.58, 739.99, 0.03, -0.3], ['pop', 0.76, 587.33, 0.02, -0.3], ['tick', 1.2, 0.03], ['tick', 1.3, 0.03], ['pop', 1.65, 880, 0.035, 0.1]] },
    { sign: 'taurus', text: '“Dinner. Then dinner. | Then *dinner.*”', draw: ans3,
      cues: [...Array.from({ length: 11 }, (_, i) => ['tick', +(0.27 + i * (2.1 / 11)).toFixed(3), 0.03 + 0.003 * i]), ['pop', 1.9, 587.33, 0.03, 0.4]] },
  ],
  hookBubbles: ['ooh!', 'me! me!', 'pick ME'],
  speaker: 'THE STARS', ask: 'ahem. the real one?',
  last: 'Right answer: *you*.',
  finale,
  finaleCues: [['pop', +(T.undock[0] + 0.2).toFixed(3), 1174.66, 0.035, 0], ['pluck', +(T.right + 0.25).toFixed(3), 1567.98, 0.035, 0.6, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, outK, WRONG, PINK, sparkles]
