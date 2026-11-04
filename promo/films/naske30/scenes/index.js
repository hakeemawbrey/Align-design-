// naske30 · Ask the Stars, Volume 2, ep 30 · "My partner is messy. It drives me nuts." (20 s, chiptune · A)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the shared end card.
//   0.0   DM: "My partner is *messy.* It drives me nuts."  ♍ Virgo mid-label of a stray sock with a label maker;
//         the tape reads SOCK (WHY?).
//   3.0   "pick the one thing that matters most."  A pile of mess; Virgo circles the dishes in red.
//   5.9   "ask kindly: 'can we do dishes together?'"  Two stars at a sink, bubbles rising.
//   8.75  card cut → 8.8 "let the rest be their way. it's their home too."  Virgo sets the label maker down by the sock
//         pile and smiles.
//   12.1  "Pick *one* thing. | Let the rest go."
import { makeAsk, R, box, drawBits, mug, bubble, sparkles, hearts, shadow, label, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, MONO, INTER } from '../../naske19/scenes/askkit2.js'

const SOCK = ['.SSS.', '.SSS.', '.SWS.', '.SSS.', 'SSSS.', 'SSSSS', 'SSSS.']
const SOCK_C = { S: '#e8414f', W: BONE }
function labelMaker(x, t, cx, cy, text, tape) {
  x.save(); x.translate(cx, cy); x.rotate(-0.15)
  box(x, -70, -50, 140, 100, '#9aa3bd', { b: 6, hi: '#bcc4da' }); R(x, '#2b2140', -48, -30, 96, 30); R(x, '#5a6280', -48, 12, 96, 22)
  if (tape > 0) {
    x.font = `700 24px ${MONO}`
    const full = x.measureText(text).width + 30, w = full * tape
    R(x, INK, 70, -22, w + 6, 40); R(x, '#fff8d0', 72, -18, w, 32)
    x.save(); x.beginPath(); x.rect(72, -18, w, 32); x.clip(); x.fillStyle = INK; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillText(text, 86, -1); x.restore()
  }
  x.restore()
}
function plate(x, cx, cy, s = 1) { R(x, INK, cx - 50 * s, cy - 10 * s, 100 * s, 20 * s); R(x, BONE, cx - 46 * s, cy - 7 * s, 92 * s, 14 * s) }
function mess(x, t, a = 1) {
  x.save(); x.globalAlpha *= a
  for (let i = 0; i < 4; i++) plate(x, 660 + (i % 2) * 10, 1100 - i * 22)
  box(x, 780, 1050, 140, 40, '#4a7fff', { b: 5 }); box(x, 790, 1010, 120, 36, '#e8a03c', { b: 5 })
  drawBits(x, SOCK, SOCK_C, 560, 1110, 10, { rot: 1.2 }); drawBits(x, SOCK, { S: '#7fd0ff', W: BONE }, 900, 1120, 10, { rot: -0.4 })
  mug(x, t, 520, 1040, 6)
  x.restore()
}

function scene(x, t, S) {
  const { k, out } = S
  if (k === 0) {
    drawBits(x, SOCK, SOCK_C, 800, 1080, 22, { rot: 0.3 })
    x.save(); x.translate(560, 850); x.scale(1.5, 1.5); x.translate(-560, -850)
    labelMaker(x, t, 500, 850, 'SOCK (WHY?)', clamp((t + 0.6) / 1.6))
    x.restore()
    shadow(x, 330, 1180, 230)
    S.hero(x, t, { x: 330, y: 1010, s: 280, mood: 'squint', look: [1, 0.3], hops: [0.4, 1.4] })
    return
  }
  if (k === 1) {
    mess(x, t)
    const c = prog(t, S.b[1] + 0.7, S.b[1] + 1.4)
    if (c > 0) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.ellipse(665, 1070, 100, 80, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * c); x.stroke() }
    if (c >= 1) label(x, 'THIS ONE', 665, 940, { size: 36, col: '#ffd6dc' })
    shadow(x, 260, 1180, 220)
    S.hero(x, t, { x: 260, y: 1010, s: 260, mood: 'neutral', look: [1, 0.4], hops: S.hops(0) })
    labelMaker(x, t, 300, 820, '', 0)
    return
  }
  if (k === 2) {
    // the sink
    box(x, 220, 1040, 640, 140, '#9aa3bd', { b: 7, hi: '#bcc4da' }); R(x, '#7fb3d8', 250, 1040, 580, 30)
    R(x, INK, 520, 900, 40, 140); R(x, INK, 520, 900, 120, 30); R(x, '#bcc4da', 526, 906, 110, 18)
    for (let i = 0; i < 9; i++) { const ph = (t * 0.6 + i / 9) % 1; x.save(); x.globalAlpha = 0.85 * (1 - ph); x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.arc(300 + (i * 71) % 500, 1020 - ph * 260, 10 + (i % 3) * 6, 0, Math.PI * 2); x.stroke(); x.restore() }
    S.hero(x, t, { x: 380, y: 900, s: 230, mood: 'happy', look: [1, 0], hops: S.hops(1) })
    S.partner(x, t, { x: 700, y: 900, s: 230, mood: 'happy', look: [-1, 0], hops: [S.b[2] + 1.0, S.b[2] + 2.0] })
    plate(x, 430, 1010, 1.1)
    bubble(x, t, 700, 680, S.b[2] + 0.9, S.b[3], 'deal. you wash?', { size: 38, col: '#d9f4e2', tail: 0.2 })
    return
  }
  // beat 3: the label maker goes down; the sock pile stays
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  for (let i = 0; i < 5; i++) drawBits(x, SOCK, i % 2 ? { S: '#7fd0ff', W: BONE } : SOCK_C, 700 + (i % 3) * 50 - 50, 1120 - Math.floor(i / 3) * 40, 10 * kk, { rot: i * 1.3 })
  const down = ease.outCubic(prog(t, S.b[3] + 0.5, S.b[3] + 1.1))
  labelMaker(x, t, lerp(400, 480, down), lerp(860, 1130, down), 'OURS', down >= 1 ? clamp((t - S.b[3] - 1.4) / 0.6) : 0)
  shadow(x, 280, 1180, 220 * kk)
  S.hero(x, t, { x: 280, y: 1010, s: 260, pop: kk, mood: down >= 1 ? 'happy' : 'neutral', look: [1, 0.4], hops: S.hops(2) })
  hearts(x, t, S.b[3] + 1.6, 700, 980, { n: 4, cell: 6, spread: 120 })
}

const EP = makeAsk({
  sign: 'virgo', name: 'VIRGO', partner: 'gemini',
  question: 'My partner is *messy.* | It drives me nuts.',
  lines: ['pick the one thing that matters most.', "ask kindly: 'can we do dishes together?'", "let the rest be their way. it's their home too."],
  chip: '♍ NATURAL RULER OF THE 6TH HOUSE: DAILY CARE',
  last: 'Pick *one* thing. | Let the rest go.', lastLate: 4,
  scene, qSize: 84,
  pis: { x: 965, y: 1270, s: 100 },
  cues: [
    ['tick', 0.1, 0.03], ['tick', 0.2, 0.03], ['tick', 0.3, 0.03], ['tick', 0.4, 0.03], ['tick', 0.5, 0.03], ['tick', 0.6, 0.03], ['tick', 0.7, 0.03], ['tick', 0.8, 0.03],
    ['whoosh', 3.7, 0.25, 0.03], ['pop', 4.4, 1174.66, 0.04, 0.3],
    ['pop', 6.3, 1318.51, 0.02, -0.4], ['pop', 6.6, 1567.98, 0.02, 0.4], ['pop', 6.9, 1318.51, 0.02, 0], ['pop', 6.85, 987.77, 0.035, 0.3],
    ['tick', 9.9, 0.07], ['tom', 9.9, 140, { gain: 0.15, decay: 0.2 }], ['glitter', 10.4, 10.8],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
