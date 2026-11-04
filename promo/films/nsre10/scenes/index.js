// nsre10: SILENT REVIEW, "Silent review: a night-sky puzzle." (20 s vertical trial reel, Silent Review Vol. 2 ep 10,
// music: jazzy · Eb). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♊ Gemini, easily distracted, reviews a homemade night-sky jigsaw from ♒ Aquarius. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *a night-sky puzzle.*" Aquarius is mid-slide with the almost-finished puzzle.
//   2.1–5.0    REACTION 1: the pieces blink one by one: "[ counts the pieces ]" → one hole: "[ eyebrow: *one missing?* ]".
//   5.0–7.9    REACTION 2: "[ slow nod ]" → two bright stars on the puzzle glow, brows up: "[ finds *the twins* ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): the last piece drops into the hole: it has a little heart on it.
//              "[ the last piece ]" → "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Difficulty ★★★★ · The stars ★★★★★ · Last piece *us* · TOTAL 10/10. "Every *piece* fits."
import { makeSilent, R, box, sparkles, hearts, drawBits, HEART, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, RED, T, stdFace, STD_CUES, giftPos, drawPixelStar } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
const COLS = 4, ROWS = 3, PW = 84, PH = 70
const HOLE = [2, 2]
const DROP = [B[2][0] + 0.35, B[2][0] + 0.75]
const STARS = [[-110, -60, 0], [-40, -20, 0], [60, -70, 0], [130, 40, 0], [-150, 50, 0], [-60, 50, 0]]
const TWINS = [[70, -50], [118, -36]]

function puzzle(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  const W = COLS * PW, H = ROWS * PH
  x.save(); x.translate(g.x, g.y - 40); x.rotate(g.rot)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-W / 2 + 12, -H / 2 + 16, W, H)
  R(x, INK, -W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  const counting = P.i === 0 ? Math.floor(prog(P.u, 0.45, 1.6) * COLS * ROWS) : -1
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const px = -W / 2 + c * PW, py = -H / 2 + r * PH
    const isHole = c === HOLE[0] && r === HOLE[1]
    if (isHole) { R(x, '#3a2448', px, py, PW, PH); continue }
    const lit = counting === r * COLS + c
    R(x, lit ? '#3a4ab0' : '#1e2a6a', px, py, PW, PH)
    // piece seams + knobs
    R(x, 'rgba(6,4,18,0.6)', px, py, PW, 2); R(x, 'rgba(6,4,18,0.6)', px, py, 2, PH)
    if (c < COLS - 1) R(x, '#1e2a6a', px + PW - 6, py + PH / 2 - 8, 12, 16)
  }
  x.save(); x.beginPath(); x.rect(-W / 2, -H / 2, W, H); x.clip()
  for (const [sx, sy] of STARS) drawPixelStar(x, sx, sy, 60, 1, '#dfe8ff')
  const tw = P.i === 1 && P.u > 1.9 ? 1 + 0.3 * Math.max(0, Math.sin((P.u - 1.9) * 9)) : 1
  for (const [sx, sy] of TWINS) drawPixelStar(x, sx, sy, 105 * tw, 2, '#ffd59a')
  x.restore()
  // the last piece: falls into the hole, a heart on it
  const d = easeOutBack(prog(t, ...DROP), 1.4)
  if (t >= DROP[0] - 0.4) {
    const hx = -W / 2 + HOLE[0] * PW, hy = -H / 2 + HOLE[1] * PH
    const yy = lerp(hy - 170, hy, clamp(d))
    x.save(); x.globalAlpha *= clamp(prog(t, DROP[0] - 0.4, DROP[0]))
    R(x, INK, hx - 4, yy - 4, PW + 8, PH + 8); R(x, '#1e2a6a', hx, yy, PW, PH)
    drawBits(x, HEART, { H: RED }, hx + PW / 2, yy + PH / 2, 6)
    x.restore()
  }
  x.restore()
  if (P.i === 1) sparkles(x, t, g.x + 95, g.y - 85, B[1][0] + 1.9, 8, 70, 1, [GOLD, BONE])
  if (P.i === 2) { sparkles(x, t, g.x + 30, g.y + 30, DROP[1], 10, 90, 1, [GOLD, RED, BONE]); hearts(x, t, B[2][0] + 0.9, g.x, g.y - 160, { n: 4, cell: 5, spread: 100, rise: 110 }) }
  void box
}

const EP = makeSilent({
  id: 'nsre10', reviewer: 'gemini', giver: 'aquarius', gift: 'a night-sky puzzle.', accent: PINK,
  hookCC: '[ silent, for once ]', plate: 'GEMINI · CRITIC',
  beats: [
    { cc: [[0.45, '[ counts the pieces ]'], [1.75, '[ eyebrow: *one missing?* ]']], cues: [...STD_CUES[0], ...Array.from({ length: 11 }, (_, i) => ['tick', +(0.45 + i * 0.1).toFixed(3), 0.02])] },
    { cc: [[0.45, '[ slow nod ]'], [1.9, '[ finds *the twins* ]']], cues: STD_CUES[1] },
    { cc: [[0.45, '[ the last piece ]'], [1.65, '[ a single tear ]']], cues: [...STD_CUES[2], ['tick', 0.75, 0.06], ['pop', 0.78, 1046.5, 0.04, 0]] },
  ],
  face: stdFace({ inspect: [0.45, 1.6] }),
  desk: puzzle,
  score: { rows: [['Difficulty', 4], ['The stars', 5], ['Last piece', '*us*']], total: '10/10' },
  last: 'Every *piece* fits.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
