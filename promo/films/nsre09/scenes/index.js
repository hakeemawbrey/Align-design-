// nsre09: SILENT REVIEW, "Silent review: a hand-drawn map." (18 s vertical trial reel, Silent Review Vol. 2 ep 9,
// music: jazzy · Db). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♐ Sagittarius, the explorer, reviews a hand-drawn map of their favourite walk from ♑ Capricorn. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *a hand-drawn map.*" Capricorn is mid-slide with a rolled-open map.
//   2.1–5.0    REACTION 1: a gold line traces the dotted path: "[ traces the path ]" → "[ eyebrow: *scenic* ]".
//   5.0–7.9    REACTION 2: "[ slow nod ]" → the little bench on the map sparkles, brows up: "[ finds the *bench* ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): the red X at the end of the path is labelled "where you made me laugh".
//              "[ reads the X ]" → "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Accuracy ★★★★★ · Little trees ★★★★ · The X *marks it* · TOTAL 10/10. "*X* marks the laugh."
import { makeSilent, R, box, sparkles, hearts, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, T, stdFace, STD_CUES, giftPos, scrawl } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
// the path on the map (local coords), start → the X
const PATH = [[-140, 70], [-100, 40], [-60, 56], [-20, 20], [20, 6], [50, -30], [90, -40], [120, -70]]
const TREES = [[-120, -50], [-80, -70], [-30, -60], [40, 60], [90, 50], [130, 20]]
const BENCH = [10, 40]

function ptAt(u) {
  const n = PATH.length - 1, f = clamp(u) * n, i = Math.min(n - 1, Math.floor(f)), k = f - i
  return [lerp(PATH[i][0], PATH[i + 1][0], k), lerp(PATH[i][1], PATH[i + 1][1], k)]
}

function map(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  const W = 360, H = 230
  x.save(); x.translate(g.x, g.y - 40); x.rotate(g.rot)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-W / 2 + 12, -H / 2 + 16, W, H)
  box(x, -W / 2, -H / 2, W, H, '#f1dfb4', { b: 6 })
  // rolled ends
  R(x, INK, -W / 2 - 18, -H / 2 - 6, 24, H + 12); R(x, '#d9c08a', -W / 2 - 14, -H / 2 - 2, 16, H + 4)
  R(x, INK, W / 2 - 6, -H / 2 - 6, 24, H + 12); R(x, '#d9c08a', W / 2 - 2, -H / 2 - 2, 16, H + 4)
  // a pond
  x.fillStyle = '#9fd8ff'; x.beginPath(); x.ellipse(-110, 70, 36, 16, 0, 0, Math.PI * 2); x.fill()
  // trees
  for (const [tx, ty] of TREES) { R(x, '#7a4a2a', tx - 3, ty, 6, 14); R(x, INK, tx - 15, ty - 24, 30, 26); R(x, '#4fae6a', tx - 12, ty - 21, 24, 20) }
  // dotted path
  for (let k = 0; k <= 40; k++) { const [px, py] = ptAt(k / 40); if (k % 2 === 0) R(x, '#7a4a2a', px - 3, py - 3, 6, 6) }
  // the traced path (reaction 1, and stays)
  const tr = ease.inOutQuad(prog(t, B[0][0] + 0.45, B[0][0] + 1.7))
  if (tr > 0) { x.strokeStyle = GOLD; x.lineWidth = 7; x.beginPath(); for (let k = 0; k <= 40 * tr; k++) { const [px, py] = ptAt(k / 40); k ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  // the bench
  const bk = P.i === 1 && P.u > 1.9 ? 1 + 0.3 * Math.max(0, Math.sin((P.u - 1.9) * 10)) : 1
  x.save(); x.translate(BENCH[0], BENCH[1] + 14); x.scale(bk, bk)
  R(x, INK, -20, -10, 40, 10); R(x, '#a06a42', -18, -8, 36, 6); R(x, INK, -16, 0, 4, 10); R(x, INK, 12, 0, 4, 10)
  x.restore()
  // the X
  const [ex, ey] = PATH[PATH.length - 1]
  x.save(); x.translate(ex, ey); x.rotate(Math.PI / 4); R(x, RED, -18, -4, 36, 8); R(x, RED, -4, -18, 8, 36); x.restore()
  // the X's label (reaction 3)
  const lk = clamp(prog(t, B[2][0] + 0.4, B[2][0] + 0.7))
  if (lk > 0) {
    x.save(); x.globalAlpha *= lk
    box(x, -168, -H / 2 + 8, 262, 66, '#fffaf0', { b: 4 })
    scrawl(x, 'where you made', -37, -H / 2 + 28, { size: 27, col: RED })
    scrawl(x, 'me laugh', -37, -H / 2 + 56, { size: 27, col: RED })
    x.restore()
  }
  x.restore()
  if (P.i === 1) sparkles(x, t, g.x + BENCH[0], g.y - 40 + BENCH[1], B[1][0] + 1.9, 8, 60, 1, [GOLD, BONE])
  if (P.i === 2) { sparkles(x, t, g.x + 120, g.y - 110, B[2][0] + 0.45, 8, 60, 1, [GOLD, RED, BONE]); hearts(x, t, B[2][0] + 0.8, g.x, g.y - 170, { n: 4, cell: 5, spread: 100, rise: 110 }) }
}

const EP = makeSilent({
  id: 'nsre09', reviewer: 'sagittarius', giver: 'capricorn', gift: 'a hand-drawn map.', accent: PINK,
  hookCC: '[ restless silence ]', plate: 'SAGITTARIUS · CRITIC',
  beats: [
    { cc: [[0.45, '[ traces the path ]'], [1.75, '[ eyebrow: *scenic* ]']], cues: [...STD_CUES[0], ['whoosh', 0.45, 1.2, 0.02]] },
    { cc: [[0.45, '[ slow nod ]'], [1.9, '[ finds the *bench* ]']], cues: STD_CUES[1] },
    { cc: [[0.45, '[ reads the X ]'], [1.65, '[ a single tear ]']], cues: STD_CUES[2] },
  ],
  face: stdFace({ inspect: [0.45, 1.7] }),
  desk: map,
  score: { rows: [['Accuracy', 5], ['Little trees', 4], ['The X', '*marks it*']], total: '10/10' },
  last: '*X* marks the laugh.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
