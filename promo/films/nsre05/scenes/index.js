// nsre05: SILENT REVIEW, "Silent review: a pop-up card." (18 s vertical trial reel, Silent Review Vol. 2 ep 5,
// music: jazzy · G). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♒ Aquarius, the inventor, reviews a handmade pop-up card from ♉ Taurus. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *a pop-up card.*" Taurus is mid-slide with a folded card (a star doodle on the front).
//   2.1–5.0    REACTION 1: "[ opens it. *cautiously.* ]" → a paper star springs out on a zigzag: "[ a star *springs out* ]".
//   5.0–7.9    REACTION 2: "[ impressed nod ]" → the star bobs on its spring, brows up: "[ checks the *engineering* ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): the message inside: "my favourite kind of weird." "[ reads the inside ]" →
//              "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Engineering ★★★★★ · Glue ★★★ · Feelings *popped* · TOTAL 10/10. "*Pop*-up feelings."
import { makeSilent, R, box, sparkles, hearts, drawBits, HEART, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, RED, T, stdFace, STD_CUES, giftPos, scrawl, drawPixelStar } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
const OPEN = [B[0][0] + 0.3, B[0][0] + 0.8], SPRING = B[0][0] + 1.75

function card(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  const op = ease.inOutCubic(prog(t, ...OPEN))
  const W = 170, H = 210
  x.save(); x.translate(g.x, g.y - 40); x.rotate(g.rot)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-W * op + 10, -H / 2 + 14, W * (1 + op), H)
  // right panel (inside, or the closed front)
  if (op < 0.5) {
    const w = W * (1 - op * 2)
    box(x, 0, -H / 2, Math.max(4, w), H, '#9fe6b0', { b: 6 })
    if (w > 60) drawPixelStar(x, w / 2, 0, 260, 2, GOLD)
  } else {
    box(x, 0, -H / 2, W, H, '#fbf3e2', { b: 6 })
    const w = W * (op - 0.5) * 2
    box(x, -w, -H / 2, w, H, '#f1e6cf', { b: 6 })
    // the message (only readable from reaction 3)
    const mk = clamp(prog(t, B[2][0] + 0.35, B[2][0] + 0.7))
    x.save(); x.globalAlpha *= 0.25 + 0.75 * mk
    scrawl(x, 'my favourite', W / 2, -40, { size: 30 })
    scrawl(x, 'kind of', W / 2, 0, { size: 30 })
    scrawl(x, 'weird.', W / 2, 44, { size: 38, col: RED })
    x.restore()
    if (mk > 0) drawBits(x, HEART, { H: RED }, W / 2, 86, 4 * mk)
    // the glue blob (for the Glue rating)
    R(x, 'rgba(255,255,255,0.7)', -w + 20, 70, 26, 14)
  }
  x.restore()
  // the pop-up star on a zigzag spring from the crease
  const sp = easeOutBack(prog(t, SPRING, SPRING + 0.35), 2.4)
  if (sp > 0.01) {
    const bob = P.i === 1 && P.u > 1.9 ? 18 * Math.sin((P.u - 1.9) * 12) * Math.exp(-(P.u - 1.9) * 1.5) : 0
    const ax = g.x - 85, top = g.y - 40 - 150 * sp - bob
    x.save(); x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(ax, g.y - 40)
    for (let i = 1; i <= 6; i++) x.lineTo(ax + (i % 2 ? 22 : -22), lerp(g.y - 40, top, i / 6))
    x.stroke(); x.strokeStyle = '#c9ccd8'; x.lineWidth = 4; x.stroke(); x.restore()
    drawPixelStar(x, ax, top - 20, 340 * sp, 2, GOLD)
  }
  if (P.i === 0) sparkles(x, t, g.x - 85, g.y - 210, SPRING + 0.1, 10, 110, 1, [GOLD, BONE, PINK])
  if (P.i === 2) hearts(x, t, B[2][0] + 0.7, g.x + 80, g.y - 150, { n: 4, cell: 5, spread: 80, rise: 110 })
}

const EP = makeSilent({
  id: 'nsre05', reviewer: 'aquarius', giver: 'taurus', gift: 'a pop-up card.', accent: PINK,
  hookCC: '[ analytical silence ]', plate: 'AQUARIUS · CRITIC',
  beats: [
    { cc: [[0.3, '[ opens it. *cautiously.* ]'], [1.75, '[ a star *springs out* ]']], cues: [...STD_CUES[0].filter(c => c[1] < 1.6), ['whoosh', 0.3, 0.3, 0.03], ['pop', 1.75, 1567.98, 0.045, 0], ['pluck', 1.8, 783.99, 0.04, 0.5, 0]] },
    { cc: [[0.45, '[ impressed nod ]'], [1.9, '[ checks the *engineering* ]']], cues: STD_CUES[1] },
    { cc: [[0.45, '[ reads the inside ]'], [1.65, '[ a single tear ]']], cues: STD_CUES[2] },
  ],
  face(t, P, f) {
    f = stdFace({ inspect: [0.4, 1.6] })(t, P, f)
    if (P.i === 0 && P.u > 1.75 && P.u < 2.4) { f.mood = 'wide'; f.look = [0, -1]; f.mouth = 'o' }
    return f
  },
  desk: card,
  score: { rows: [['Engineering', 5], ['Glue', 3], ['Feelings', '*popped*']], total: '10/10' },
  last: '*Pop*-up feelings.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
