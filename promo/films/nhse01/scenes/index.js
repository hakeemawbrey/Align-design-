// nhse01: HOLIDAY SURVIVAL GUIDE No. 1, "Nine Invites." (28 s vertical, Next 30 · b29, music: pop · E)
// The series look lives in ../survkit.js (shared by every episode).
//   0.0–6.6    "*Nine* invites. | One of you."  ♊ Gemini juggles RSVP envelopes in a cosy room; more invites keep
//              flying in from the edges until the counter reads 9. Pisces sniffles by the window.
//   6.6–13.9   "Three parties. | *One* night."  The December calendar fills square by square (PARTY, BRUNCH, SWAP…),
//              then Gemini sprints between three front doors, each lap slower. ♊: "if I run, I can make all three!"
//   13.9       hard cut into the tip.
//   13.9–21.6  "Pick the ones | you'd *miss.*"  THE STARS: "you don't owe every party a *yes*." / "pick the ones you'd
//              *miss*." Gemini rings three squares, crosses the rest with warm paper-plane texts, stamps one: REST.
//   21.6–25.6  "Packed: | *one blank square.*"  The kit gets a calendar page with one empty square.
//              THE STARS: "A blank square is a plan too."
import { makeSurv, R, box, ink, glow, room, door, calendar, drawBits, sparkles, hearts, label, shadow, wear, starFrame, inSprite,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, CREAM, INTER } from '../survkit.js'

const GEM = '#ffd23a'
// an envelope (centred)
function env(x, cx, cy, s, rot, col = CREAM, seal = RED) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -46, -30, 92, 60, col, { b: 5 })
  x.strokeStyle = 'rgba(27,18,54,0.55)'; x.lineWidth = 4; x.beginPath(); x.moveTo(-46, -30); x.lineTo(0, 4); x.lineTo(46, -30); x.stroke()
  R(x, seal, -8, -4, 16, 16)
  x.restore()
}
const INV_COLS = [CREAM, '#ffd6e4', '#d6f0ff', '#e6ffd6', '#fff0c0', '#e8dcff', CREAM, '#ffd6e4', '#d6f0ff']
// invite arrivals (from the edges) during act 0
const ARR = [0.9, 1.5, 2.0, 2.45, 2.85, 3.2, 3.5]
const DOORS = [180, 540, 900]
const CAL_MARKS = [['PARTY', '#ffd6e4'], ['BRUNCH', '#d6f0ff'], ['SWAP', '#e6ffd6'], ['GALA', '#fff0c0'], ['PARTY', '#ffd6e4'], ['DINNER', '#e8dcff'], ['PARTY', '#d6f0ff'], ['CAROLS', '#e6ffd6'], ['PARTY', '#fff0c0']]
const CAL_SQ = [2, 3, 4, 8, 9, 10, 11, 15, 16]          // which squares fill (weeks 1–3)
const PICK = [3, 9, 16], REST = 10

function act0(x, t, S) {
  const { u, hero } = S
  room(x, t, { win: { x: 650, y: 470, w: 300, h: 330 } })
  // juggling: three envelopes on an arc above Gemini (mid-throw at frame 0)
  shadow(x, 460, 1255, 300)
  hero(x, t, { x: 460, y: 1080, s: 360, mood: u > 3.6 ? 'wide' : 'happy', look: [0, -1], hops: [0.45, 0.95, 1.45, 1.95, 2.45, 2.95, 3.45], squash: 0.04 * Math.sin(t * 12) })
  const n = 4 + ARR.filter(a => u > a + 0.35).length          // envelopes in the air grows
  for (let i = 0; i < Math.min(n, 9); i++) {
    const ph = ((u * 0.9 + i / Math.min(n, 9)) % 1)
    const ax = 460 + Math.cos(Math.PI * (1 - ph) * 1) * 250 * (1 + 0.03 * i), ay = 800 - Math.sin(Math.PI * ph) * (250 + 12 * i)
    env(x, ax, ay, 1.15, ph * 6.28 * 0.3 - 0.4, INV_COLS[i])
  }
  // new invites fly in from the edges
  ARR.forEach((a, i) => {
    const p = prog(u, a, a + 0.35)
    if (p <= 0 || p >= 1) return
    const fromL = i % 2 === 0
    env(x, lerp(fromL ? -80 : 1160, 460, ease.inCubic(p)), lerp(620 + i * 30, 640, p), 1, (fromL ? 1 : -1) * 6 * p, INV_COLS[(i + 3) % 9])
  })
  // the counter
  const c = Math.min(9, 2 + ARR.filter(a => u > a + 0.35).length)
  const ck = pop01(t, (ARR.filter(a => u > a + 0.35).pop() ?? -1) + 0.35, 0.2, 2.6)
  box(x, 120, 520, 300, 120, BONE, { b: 7 })
  ink(x, 'INVITES', 270, 556, { size: 30, font: INTER, weight: 800 })
  x.save(); x.translate(270, 604); x.scale(0.8 + 0.2 * ck, 0.8 + 0.2 * ck); ink(x, String(c), 0, 0, { size: 56, font: INTER, weight: 800, col: c >= 9 ? RED : INK }); x.restore()
  if (u > 3.85) sparkles(x, t, 270, 580, 3.85, 8, 140, 2, [RED, GOLD, BONE])
}

function act1(x, t, S) {
  const { u, hero } = S
  room(x, t, { win: null, lights: true })
  if (u < 3.2) {
    // the calendar fills square by square
    const marks = {}
    CAL_SQ.forEach((q, i) => { if (u > 0.35 + i * 0.27) marks[q] = { fill: CAL_MARKS[i][1], text: CAL_MARKS[i][0], size: 15 } })
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * outK(t, [S.t0 + 3.0, S.t0 + 3.2])
    calendar(x, 540, 800, 700, { marks, k })
    CAL_SQ.forEach((q, i) => { const c = q % 7, r = Math.floor(q / 7), cw = 660 / 7; sparkles(x, t, 540 - 330 + c * cw + cw / 2, 800 - (cw * 4 + 110) / 2 + 94 + r * cw + cw / 2, S.t0 + 0.35 + i * 0.27, 5, 40, i, [GOLD, BONE]) })
    hero(x, t, { x: 540, y: 1200, s: 170, mood: u > 2.2 ? 'wide' : 'neutral', look: [0, -1], hops: [S.t0 + 0.6, S.t0 + 1.4, S.t0 + 2.2] })
    return
  }
  // three doors in one night: Gemini sprints between them, each lap slower
  const v = u - 3.2
  DOORS.forEach((dx, i) => door(x, dx, 1240, { w: 190, h: 360, col: ['#8a4a3a', '#3a6a8a', '#5a8a3a'][i], open: clamp(Math.sin(Math.PI * clamp((v - 0.3 - i * 0.9) / 0.8))) }))
  DOORS.forEach((dx, i) => label(x, ['PARTY 1', 'PARTY 2', 'PARTY 3'][i], dx, 850, { size: 26, col: BONE }))
  // path: 180 → 540 → 900 → 540 → 180 (ping-pong), slowing down
  const lapT = v < 2.4 ? v * 1.4 : 2.4 * 1.4 + (v - 2.4) * 0.6
  const ph = (lapT % 2), pos = ph < 1 ? ph : 2 - ph
  const gx = lerp(180, 900, ease.inOutQuad(pos))
  const tired = v > 2.4
  for (let k = 1; k <= 3; k++) { x.save(); x.globalAlpha = 0.18 / k; hero(x, t - 0.05 * k, { x: gx - (ph < 1 ? 1 : -1) * 40 * k, y: 1140, s: 170, mood: 'wide', bob: 0 }); x.restore() }
  shadow(x, gx, 1250, 150)
  hero(x, t, { x: gx, y: 1140, s: 170, mood: tired ? 'squint' : 'wide', look: [ph < 1 ? 1 : -1, 0], bob: 0, squash: 0.06 * Math.sin(t * 20) })
  if (tired) { const F = starFrame(gx, 1140, 170, t, { bob: 0 }); for (let i = 0; i < 3; i++) { const p = ((t * 1.6 + i / 3) % 1); R(x, '#8fe3ff', F.ox + 50 + i * 16, F.cy - 70 + p * 60, 8, 12) } }
}

function act2(x, t, S) {
  const { u, hero } = S
  room(x, t, { win: null, lights: true })
  // the calendar again: three rings, the rest get a soft cross, one square becomes REST
  const marks = {}
  CAL_SQ.forEach((q, i) => {
    const m = { fill: CAL_MARKS[i][1], text: CAL_MARKS[i][0], size: 15 }
    if (PICK.includes(q) && u > 1.0 + PICK.indexOf(q) * 0.45) m.ring = RED
    if (!PICK.includes(q) && q !== REST && u > 3.2) { m.fill = '#c9c0b0'; m.col = 'rgba(27,18,54,0.45)' }
    if (q === REST && u > 5.4) { m.fill = MINT; m.text = 'REST'; m.col = INK; m.size = 18 }
    marks[q] = m
  })
  calendar(x, 540, 760, 640, { marks, k: pop01(t, S.t0 + 0.05, 0.3, 2) })
  // warm "can't make it" texts fly out as paper planes with hearts
  for (let i = 0; i < 5; i++) {
    const a = S.t0 + 3.3 + i * 0.32, p = prog(t, a, a + 0.9)
    if (p <= 0 || p >= 1) continue
    const px = lerp(800, 1150, ease.inQuad(p)), py = lerp(1080, 420 + i * 40, p)
    drawBits(x, ['W.....', 'WWW...', 'WWWWWW', 'WWW...', 'W.....'], { W: BONE }, px, py, 7, { rot: -0.6 })
    hearts(x, t, a + 0.2, px, py, { n: 1, cell: 4 })
  }
  label(x, '“can’t make it, have the best night!”', 520, 1050, { size: 30, col: BONE, alpha: clamp(prog(u, 3.3, 3.5)) * outK(t, [S.t0 + 5.2, S.t0 + 5.4]) })
  // Gemini with a pen, on the right
  shadow(x, 860, 1290, 170)
  const F = hero(x, t, { x: 860, y: 1190, s: 180, mood: u > 5.5 ? 'happy' : 'neutral', look: [-1, -0.5], hops: [S.t0 + 1.0, S.t0 + 1.45, S.t0 + 1.9, S.t0 + 5.45] })
  void F
  R(x, INK, 760, 1150, 60, 12); R(x, RED, 764, 1153, 44, 6)
  if (u > 5.4) sparkles(x, t, 540 - 320 + 3 * (600 / 7) + 43, 760 - 50, S.t0 + 5.42, 8, 70, 1, [MINT, BONE, GOLD])
}

// the kit item: a calendar page with one empty square
function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.08)
  box(x, -110, -120, 220, 240, BONE, { b: 7 })
  R(x, '#c8463c', -110, -120, 220, 50)
  ink(x, 'DEC', 0, -94, { size: 30, font: INTER, weight: 800, col: BONE })
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) {
    const X = -90 + i * 62, Y = -55 + j * 58
    const blank = i === 1 && j === 1
    R(x, blank ? MINT : '#d9cfbd', X, Y, 54, 50)
    if (!blank) { R(x, 'rgba(27,18,54,0.25)', X + 10, Y + 14, 34, 6); R(x, 'rgba(27,18,54,0.25)', X + 10, Y + 28, 22, 6) }
  }
  ink(x, 'REST', -28 + 62 - 34, 3 + 25 - 30, { size: 14, font: INTER, weight: 800 })
  x.restore()
}

const EP = makeSurv({
  id: 'nhse01', ep: 1, hero: 'gemini', accent: GEM,
  heads: ['*Nine* invites. | One of you.', 'Three parties. | *One* night.', 'Pick the ones | you’d *miss.*', 'Packed: | *one blank square.*'],
  acts: [act0, act1, act2],
  line1: { t: 10.15, speaker: '♊︎ GEMINI', color: '#ffe27a', text: 'if I run, I can make *all three!*', close: 13.5 },
  tips: ['you don’t owe every party a *yes*.', 'pick the ones you’d *miss*.'],
  last: 'A blank square is a *plan* too.',
  item: { label: 'ONE BLANK SQUARE', draw: item },
  pis: [{ x: 935, y: 1260, s: 120 }, { x: 960, y: 610, s: 100, noTissues: true }, { x: 945, y: 470, s: 100, noTissues: true }],
  finaleHero(x, t, { hero, ok, HOPS }) { shadow(x, 200, 1300, 200 * ok); hero(x, t, { x: 200, y: 1150, s: 210, pop: ok, mood: 'happy', look: [1, -0.3], hops: HOPS }) },
  cues: [
    [...ARR.map((a, i) => ['whoosh', +(a).toFixed(3), 0.25, 0.025]), ...ARR.map((a, i) => ['pop', +(a + 0.35).toFixed(3), [880, 987.77, 1174.66, 1318.51, 1174.66, 1318.51, 1567.98][i], 0.035, (i % 2 ? 0.3 : -0.3)]), ['pop', 3.9, 1760, 0.05, -0.3], ['glitter', 3.85, 4.2]],
    [...CAL_SQ.map((q, i) => ['tick', +(0.35 + i * 0.27).toFixed(3), 0.045]), ['whoosh', 3.2, 0.3, 0.03], ['tick', 3.5, 0.04], ['tick', 4.4, 0.04], ['tick', 5.3, 0.04], ['whoosh', 3.7, 0.2, 0.02], ['whoosh', 4.4, 0.2, 0.02], ['whoosh', 5.1, 0.2, 0.02], ['pluck', 5.9, 523.25, 0.03, 0.5, 0]],
    [['pop', 1.0, 1174.66, 0.04, 0.3], ['pop', 1.45, 1318.51, 0.04, 0.3], ['pop', 1.9, 1567.98, 0.04, 0.3], ['whoosh', 3.3, 0.3, 0.025], ['whoosh', 3.62, 0.3, 0.02], ['whoosh', 3.94, 0.3, 0.02], ['tom', 5.42, 140, { gain: 0.18, decay: 0.2 }], ['bell', 5.48, 1760, 0.03, 1.0, 0], ['glitter', 5.42, 5.8]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, PINK, lerp, wear, inSprite]
