// nsre06: SILENT REVIEW, "Silent review: fuzzy socks." (18 s vertical trial reel, Silent Review Vol. 2 ep 6,
// music: jazzy · A). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♉ Taurus, connoisseur of comfort, reviews a pair of fuzzy socks from ♋ Cancer. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *fuzzy socks.*" Cancer is mid-slide with the pair.
//   2.1–5.0    REACTION 1: "[ tests the fuzz ]" (a loupe on the fluff) → "[ eyebrow: *soft* ]".
//   5.0–7.9    REACTION 2: "[ slow nod of approval ]" → the fuzz puffs up, brows up: "[ the fuzz is *real* ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): little bulls stitched on the toes (Taurus's sign): "[ notices the little *bulls* ]"
//              → "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Fuzz ★★★★★ · The toes ★★★★★ · Comfort *unmatched* · TOTAL 10/10. "Ten out of ten *toes*."
import { makeSilent, R, sparkles, hearts, drawBits, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, T, stdFace, STD_CUES, giftPos } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
const BULL = ['H.....H', 'HH...HH', '.BBBBB.', 'BBEBEBB', 'BBBBBBB', '.BNNNB.', '..BBB..']

function sock(x, t, flip, puff) {
  // an L-shaped fuzzy sock in local coords; flip = −1 mirrors
  x.save(); x.scale(flip, 1)
  const part = (px, py, w, h) => { R(x, INK, px - 6, py - 6, w + 12, h + 12) }
  const fillp = (px, py, w, h) => {
    R(x, '#ffd2e0', px, py, w, h)
    for (let j = 0; j < h; j += 26) R(x, '#ff9ab8', px, py + j, w, 10)
  }
  part(-40, -150, 80, 150); part(-40, -30, 150, 70)
  fillp(-40, -150, 80, 150); fillp(-40, -30, 150, 70)
  // cuff
  R(x, INK, -48, -170, 96, 32); R(x, '#fff6ea', -44, -166, 88, 24)
  // fuzz: little bright specks around the edge
  const f = 1 + 0.6 * puff
  for (let i = 0; i < 14; i++) R(x, '#ffffff', -46 + (i * 37) % 160, -150 + (i * 53) % 190, 6 * f, 6 * f)
  x.restore()
}

function socks(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  const puff = P.i === 1 && P.u > 1.9 ? Math.min(1, (P.u - 1.9) * 3) : P.i >= 2 || P.ph === 'score' ? 1 : 0
  x.save(); x.translate(g.x, g.y + 10); x.rotate(g.rot); x.scale(0.85, 0.85)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-230, 30, 460, 40)
  x.save(); x.translate(-70, 0); sock(x, t, -1, puff); x.restore()
  x.save(); x.translate(70, 0); sock(x, t, 1, puff); x.restore()
  // the little bulls on the toes
  const bk = P.i === 2 ? 1 + 0.25 * Math.max(0, Math.sin((P.u - 0.45) * 10)) * (P.u > 0.45 && P.u < 1.3 ? 1 : 0) : 1
  drawBits(x, BULL, { H: '#efe6d6', B: '#8a5a3a', E: INK, N: '#ffb3c6' }, -150, 6, 6 * bk)
  drawBits(x, BULL, { H: '#efe6d6', B: '#8a5a3a', E: INK, N: '#ffb3c6' }, 150, 6, 6 * bk)
  x.restore()
  if (P.i === 0) {
    const lk = clamp(prog(P.u, 0.4, 0.6)) * (1 - clamp(prog(P.u, 1.6, 1.75)))
    if (lk > 0.01) {
      const lx = lerp(480, 600, ease.inOutQuad(prog(P.u, 0.5, 1.5))), ly = 1080 + 10 * Math.sin(P.u * 7)
      x.save(); x.globalAlpha = lk
      x.save(); x.translate(lx, ly); x.rotate(0.7); R(x, INK, 46, -12, 92, 24); R(x, '#6b4a2f', 50, -7, 84, 14); x.restore()
      x.lineWidth = 12; x.strokeStyle = INK; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 6; x.strokeStyle = GOLD; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(200,235,255,0.22)'; x.beginPath(); x.arc(lx, ly, 48, 0, Math.PI * 2); x.fill()
      x.restore()
    }
  }
  if (P.i === 1) sparkles(x, t, g.x, g.y - 60, B[1][0] + 1.9, 10, 160, 1, ['#ffffff', PINK, BONE])
  if (P.i === 2) { sparkles(x, t, g.x - 128, g.y + 15, B[2][0] + 0.45, 6, 50, 1, [GOLD, BONE]); sparkles(x, t, g.x + 128, g.y + 15, B[2][0] + 0.5, 6, 50, 2, [GOLD, BONE]); hearts(x, t, B[2][0] + 0.7, g.x, g.y - 160, { n: 4, cell: 5, spread: 100, rise: 110 }) }
}

const EP = makeSilent({
  id: 'nsre06', reviewer: 'taurus', giver: 'cancer', gift: 'fuzzy socks.', accent: PINK,
  hookCC: '[ comfortable silence ]', plate: 'TAURUS · CRITIC',
  beats: [
    { cc: [[0.45, '[ tests the fuzz ]'], [1.75, '[ eyebrow: *soft* ]']], cues: STD_CUES[0] },
    { cc: [[0.45, '[ slow nod of approval ]'], [1.9, '[ the fuzz is *real* ]']], cues: STD_CUES[1] },
    { cc: [[0.45, '[ notices the little *bulls* ]'], [1.65, '[ a single tear ]']], cues: STD_CUES[2] },
  ],
  face: stdFace({ inspect: [0.45, 1.6] }),
  desk: socks,
  score: { rows: [['Fuzz', 5], ['The toes', 5], ['Comfort', '*unmatched*']], total: '10/10' },
  last: 'Ten out of ten *toes*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
