// trsilentpicnic: SILENT REVIEW, "Silent review: a surprise picnic for two." (20 s vertical, Star Talk Trends §16,
// music: jazzy · Ab). Story 0–15.6, then the shared end card. The format look lives in ./silentkit.js (identical in all five).
// ♌ Leo, used to grand gestures, reviews a small surprise picnic ♒ Aquarius set up. Not one word: captions narrate the face.
//   0.0–2.1    hook: "Silent review: | *a surprise picnic for two.*" Leo sits blindfolded. Aquarius slides a checked blanket and
//              a basket across the desk and ducks behind it. CC "[ respectful silence ]".
//   2.1–5.0    REACTION 1: the blindfold slides off. CC "[ blindfold: off ]" → one eyebrow climbs at the very small,
//              very sincere spread: "[ one eyebrow: *a picnic?* ]".
//   5.0–7.9    REACTION 2: the basket lid flips: sandwiches cut into little stars hop out. CC "[ star-shaped sandwiches ]" →
//              three slow nods: "[ slow, approving nod ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): a talk card pops out of the basket: "What made you smile today?" CC "[ finds a talk
//              card ]" → ONE tear: "[ a single tear ]" → Leo looks over at Aquarius: "[ answers it: *points at you* ]".
//   11.4–15.5  THE VERDICT: Snacks ★★★★★ · Star sandwiches ★★★★★ · Surprise *total* · TOTAL 10/10. Top caption: "No *notes.*"
// App tie-in (light, last beat): the talk card.
import { makeSilent, R, box, drawBits, sparkles, label, hearts, ramp, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, SERIF, MONO, T } from './silentkit.js'

const B = T.beats
const ACC = '#ffb347'
const STAR_BM = ['...S...', '..SSS..', 'SSSSSSS', '.SSSSS.', '.SS.SS.', 'SS...SS']

function picnic(x, t, P, S) {
  const g = S.gift
  if (g <= 0) return
  const dx = lerp(-290, 0, g)
  // the checked blanket
  x.save(); x.translate(dx, 0)
  const y0 = 1062, y1 = 1268, l0 = 300, r0 = 780, l1 = 250, r1 = 830
  x.fillStyle = INK; x.beginPath(); x.moveTo(l0 - 6, y0 - 6); x.lineTo(r0 + 6, y0 - 6); x.lineTo(r1 + 8, y1 + 6); x.lineTo(l1 - 8, y1 + 6); x.closePath(); x.fill()
  const rows = 5, cols = 8
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const a = j / rows, b = (j + 1) / rows, ya = lerp(y0, y1, a), yb = lerp(y0, y1, b)
    const la = lerp(l0, l1, a), ra = lerp(r0, r1, a), lb = lerp(l0, l1, b), rb = lerp(r0, r1, b)
    const xa0 = lerp(la, ra, i / cols), xa1 = lerp(la, ra, (i + 1) / cols), xb0 = lerp(lb, rb, i / cols), xb1 = lerp(lb, rb, (i + 1) / cols)
    x.fillStyle = (i + j) % 2 ? '#f4efe6' : '#d9455a'
    x.beginPath(); x.moveTo(xa0, ya); x.lineTo(xa1, ya); x.lineTo(xb1, yb); x.lineTo(xb0, yb); x.closePath(); x.fill()
  }
  // the basket: lid flips open in reaction 2
  const bx = 540, by = 1150
  const lid = P.ph === 'score' || P.i === 2 ? 1 : P.i === 1 ? ease.outBack(prog(P.u, 0.15, 0.45)) : 0
  // open: the lid tips back behind the basket (drawn first), the dark inside shows
  if (lid > 0) {
    const lh = 60 * clamp(lid)
    box(x, bx - 116, by - 46 - lh, 232, lh, '#a06c34', { b: 6, hi: '#b98048' })
  }
  box(x, bx - 120, by - 40, 240, 100, '#b07a3c', { b: 6, hi: '#c99052' })
  for (let i = 0; i < 6; i++) R(x, 'rgba(27,18,54,0.25)', bx - 110 + i * 40, by - 34, 4, 88)
  R(x, 'rgba(27,18,54,0.25)', bx - 120, by + 8, 240, 4)
  if (lid > 0) R(x, '#3a2414', bx - 108, by - 40, 216, 16 * clamp(lid))
  else box(x, bx - 120, by - 58, 240, 18, '#c99052', { b: 6 })
  // handle
  if (lid < 0.3) { x.save(); x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(bx, by - 40, 80, Math.PI, 0); x.stroke(); x.strokeStyle = '#8a5a2c'; x.lineWidth = 6; x.beginPath(); x.arc(bx, by - 40, 80, Math.PI, 0); x.stroke(); x.restore() }
  x.restore()
  // star sandwiches hop out onto the blanket (reaction 2 on)
  const SW = [[0.55, 380, 1214], [0.75, 690, 1222], [0.95, 470, 1250]]
  if (P.ph === 'score' || P.i >= 1) SW.forEach(([u0, sx, sy], i) => {
    const p = P.ph === 'score' || P.i === 2 ? 1 : ease.outCubic(prog(P.u, u0, u0 + 0.45))
    if (p <= 0) return
    const hx = lerp(bx, sx, p), hy = lerp(by - 30, sy, p) - Math.sin(Math.PI * p) * 160
    drawBits(x, STAR_BM, { S: '#f1d9a6' }, hx + dx, hy, 9, { rot: 0.2 * Math.sin(i * 2) })
    drawBits(x, ['..S..', '.SSS.', '.S.S.'], { S: '#7fc06a' }, hx + dx, hy + 6, 4, { outline: null })
    if (P.i === 1) sparkles(x, t, sx, sy, B[1][0] + u0 + 0.45, 6, 60, i, [GOLD, BONE])
  })
  // the talk card pops out of the basket (reaction 3)
  if (P.i === 2) {
    const ck = ease.outBack(prog(P.u, 0.2, 0.55))
    if (ck > 0.01) {
      const cx = lerp(bx, 330, ck), cy = lerp(by - 20, 1078, ck)
      x.save(); x.translate(cx, cy); x.rotate(lerp(0.4, -0.06, ck)); x.scale(ck, ck)
      x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150 + 12, -90 + 14, 300, 180)
      box(x, -150, -90, 300, 180, '#1d1440', { b: 7 })
      x.strokeStyle = GOLD; x.lineWidth = 3; x.strokeRect(-138, -78, 276, 156)
      x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = `700 20px ${MONO}`; x.fillStyle = GOLD; x.fillText('TALK CARD', 0, -50)
      x.font = `italic 500 34px ${SERIF}`; x.fillStyle = BONE
      x.fillText('What made you', 0, -2); x.fillText('smile today?', 0, 38)
      x.restore()
      sparkles(x, t, 330, 1078, B[2][0] + 0.55, 10, 150, 1, [GOLD, BONE, PINK])
    }
    hearts(x, t, B[2][0] + 2.4, 330, 930, { n: 5, rise: 160 })
  }
}

// a blindfold (sprite cells): on during the hook, slides up and off in reaction 1
function blindfold(ctx, off) {
  if (off >= 1) return
  ctx.save(); ctx.globalAlpha *= 1 - clamp((off - 0.6) / 0.4)
  const dy = -off * 13
  ctx.fillStyle = INK; ctx.fillRect(2.6, 14.4 + dy, 30.8, 8.2)
  ctx.fillStyle = '#7a2a8a'; ctx.fillRect(3.2, 15.2 + dy, 29.6, 6.6)
  ctx.fillStyle = '#a24ab4'; ctx.fillRect(3.2, 15.2 + dy, 29.6, 1.2)
  ctx.fillStyle = GOLD; for (let i = 0; i < 7; i++) ctx.fillRect(5 + i * 4.2, 19.6 + dy, 1.4, 0.8)
  ctx.restore()
}

const EP = makeSilent({
  id: 'trsilentpicnic', reviewer: 'leo', giver: 'aquarius', gift: 'a surprise picnic for two.', accent: ACC,
  hookCC: '[ respectful silence ]', plate: 'LEO · CRITIC',
  beats: [
    { cc: [[0.3, '[ blindfold: off ]'], [1.45, '[ one eyebrow: *a picnic?* ]']],
      cues: [['whoosh', 0.2, 0.4, 0.035], ['glitter', 0.45, 0.75], ['pluck', 1.35, 659.25, 0.04, 0.35, 0.2], ['pluck', 1.47, 1318.51, 0.035, 0.4, 0.2]] },
    { cc: [[0.5, '[ star-shaped *sandwiches* ]'], [1.6, '[ slow, approving nod ]']],
      cues: [['tick', 0.15, 0.05], ['pop', 0.3, 880, 0.03, 0], ['pop', 0.55, 1174.66, 0.035, -0.3], ['pop', 0.75, 1318.51, 0.035, 0.3], ['pop', 0.95, 1567.98, 0.035, 0],
        ['tom', 2.05, 72, { gain: 0.12, decay: 0.22 }], ['tom', 2.9, 70, { gain: 0.1, decay: 0.22 }]] },
    { cc: [[0.35, '[ finds a *talk card* ]'], [1.4, '[ a single tear ]'], [2.3, '[ answers it: *points at you* ]']],
      cues: [['whoosh', 0.2, 0.35, 0.03], ['pluck', 0.5, 1567.98, 0.04, 0.5, -0.3], ['glitter', 0.55, 0.85],
        ['bell', 1.3, 2637.02, 0.026, 1.8, -0.2], ['pluck', 2.35, 1174.66, 0.035, 0.5, -0.4], ['pluck', 2.47, 1567.98, 0.03, 0.5, -0.4]] },
  ],
  face(t, P, f) {
    const u = P.u
    if (P.i === 0) {
      f.look = u < 0.5 ? [0, 0] : [0, 1]
      if (u > 0.35 && u < 0.7) { f.mood = 'squint'; f.look = [0, 0] }
      f.brows = { l: ramp(u, 1.3, 1.6, 0, -0.2), r: ramp(u, 1.3, 1.6, 0, 1), sl: -0.3, sr: ramp(u, 1.3, 1.6, 0, -0.5) }
      if (u > 1.6) f.look = [0, 0]
      f.mouth = 'flat'
    } else if (P.i === 1) {
      f.look = u < 1.5 ? [0, 1] : [0, 0]
      if (u > 0.3 && u < 0.6) { f.mood = 'wide'; f.mouth = 'o' } else f.mouth = 'tight'
      f.nod = [{ at: P.t0 + 1.6, n: 2, period: 0.85, amp: 24 }]
      f.brows = { l: 0.3, r: 0.3, sl: 0.1, sr: 0.1 }
    } else {
      f.look = u < 1.0 ? [-1, 1] : u < 2.3 ? [0, 0] : [-1, 0.6]
      if (u > 0.5 && u < 0.95) f.mood = 'wide'
      const touched = ramp(u, 0.95, 1.25, 0, 1)
      f.brows = { l: 0.35 * touched, r: 0.35 * touched, sl: 0.95 * touched, sr: 0.95 * touched }
      f.mouth = u > 2.3 ? 'smile' : u > 1.0 ? 'wobble' : 'o'
      if (u > 2.3) f.mood = 'sparkle'
      f.tear = P.t0 + 1.25
      f.shake = u > 1.0 && u < 2.3 ? 1.5 : 0
      f.blush = u > 1.0 ? 0.8 : 0
      f.tilt = u > 2.3 ? -0.08 : 0
      f.hops = [P.t0 + 2.35]
    }
    return f
  },
  wear(ctx, t, P) {
    const off = P.ph === 'hook' ? 0 : P.i === 0 ? ease.inOutCubic(prog(P.u, 0.15, 0.5)) : 1
    blindfold(ctx, off)
  },
  giverMood: (t, P) => P.ph === 'hook' ? 'happy' : P.i === 2 ? 'heart' : 'wide',
  desk: picnic,
  score: { rows: [['Snacks', 5], ['Star sandwiches', 5], ['Surprise', '*total*']], total: '10/10' },
  last: 'No *notes.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, RED]
