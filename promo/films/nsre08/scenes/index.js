// nsre08: SILENT REVIEW, "Silent review: a coupon book." (18 s vertical trial reel, Silent Review Vol. 2 ep 8,
// music: jazzy · B). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♎ Libra, weigher of every detail, reviews a handmade coupon book from ♐ Sagittarius. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *a coupon book.*" Sag is mid-slide with a little stapled booklet.
//   2.1–5.0    REACTION 1: the first coupon, GOOD FOR: ONE HUG. "[ reads the fine print ]" (a loupe) →
//              "[ eyebrow: *no catch?* ]".
//   5.0–7.9    REACTION 2: "[ slow nod ]" → the page turns: ONE LONG WALK, brows up: "[ “one long *walk*” ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): the last coupon: UNLIMITED LISTENING, no expiry. "[ the last coupon ]" →
//              "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Value ★★★★★ · Fine print ★★★★★ · Expires *never* · TOTAL 10/10. "*Redeeming* all of them."
import { makeSilent, R, box, sparkles, hearts, drawBits, HEART, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, T, stdFace, STD_CUES, giftPos, scrawl, INTER, MONO } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
const PAGES = [[-9, 'COUPONS', '#ffd27a'], [B[0][0] + 0.3, 'ONE HUG', '#ffe7f0'], [B[1][0] + 1.85, 'ONE LONG WALK', '#d8f5e4'], [B[2][0] + 0.3, 'UNLIMITED LISTENING', '#fff3c4']]

function book(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  const W = 330, H = 170
  let pi = 0; for (let i = 0; i < PAGES.length; i++) if (t >= PAGES[i][0]) pi = i
  const turn = prog(t, PAGES[pi][0], PAGES[pi][0] + 0.25)
  x.save(); x.translate(g.x, g.y - 30); x.rotate(g.rot)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-W / 2 + 12, -H / 2 + 16, W, H)
  // the stack under the top coupon
  for (let i = 3; i > 0; i--) { R(x, INK, -W / 2 - 6 + i * 4, -H / 2 - 6 + i * 6, W + 12, H + 12); R(x, '#e9e2d0', -W / 2 + i * 4, -H / 2 + i * 6, W, H) }
  const [, label, col] = PAGES[pi]
  x.save(); x.scale(1, 0.4 + 0.6 * ease.outBack(turn))
  box(x, -W / 2, -H / 2, W, H, col, { b: 6 })
  // perforated left edge + staple
  for (let j = 0; j < 7; j++) R(x, INK, -W / 2 + 56, -H / 2 + 12 + j * 22, 4, 12)
  R(x, '#c9ccd8', -W / 2 + 18, -12, 22, 8)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 18px ${MONO}`; x.fillStyle = '#6a5a7a'; x.fillText(pi ? 'GOOD FOR:' : 'FOR LIBRA', 28, -H / 2 + 34)
  x.font = `800 ${pi === 3 ? 23 : 30}px ${INTER}`; x.fillStyle = INK; x.fillText(label, 34, 4)
  x.font = `700 15px ${MONO}`; x.fillStyle = '#6a5a7a'; x.fillText(pi === 3 ? 'expires: never' : pi ? 'no catch. no expiry.' : '', 28, H / 2 - 30)
  if (pi === 3) drawBits(x, HEART, { H: RED }, W / 2 - 34, -H / 2 + 32, 3.5)
  x.restore()
  x.restore()
  if (P.i === 0) {
    const lk = clamp(prog(P.u, 0.4, 0.6)) * (1 - clamp(prog(P.u, 1.6, 1.75)))
    if (lk > 0.01) {
      const lx = lerp(520, 640, ease.inOutQuad(prog(P.u, 0.5, 1.5))), ly = 1185 + 6 * Math.sin(P.u * 7)
      x.save(); x.globalAlpha = lk
      x.save(); x.translate(lx, ly); x.rotate(0.7); R(x, INK, 46, -12, 92, 24); R(x, '#6b4a2f', 50, -7, 84, 14); x.restore()
      x.lineWidth = 12; x.strokeStyle = INK; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 6; x.strokeStyle = GOLD; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(200,235,255,0.22)'; x.beginPath(); x.arc(lx, ly, 48, 0, Math.PI * 2); x.fill()
      x.restore()
    }
  }
  if (P.i === 1) sparkles(x, t, g.x, g.y - 40, B[1][0] + 1.9, 10, 170, 1, [GOLD, '#9fe6b0', BONE])
  if (P.i === 2) { sparkles(x, t, g.x, g.y - 40, B[2][0] + 0.5, 12, 190, 2, [GOLD, PINK, BONE]); hearts(x, t, B[2][0] + 0.8, g.x, g.y - 140, { n: 4, cell: 5, spread: 100, rise: 110 }) }
  void scrawl
}

const EP = makeSilent({
  id: 'nsre08', reviewer: 'libra', giver: 'sagittarius', gift: 'a coupon book.', accent: PINK,
  hookCC: '[ weighing it up ]', plate: 'LIBRA · CRITIC',
  beats: [
    { cc: [[0.45, '[ reads the fine print ]'], [1.75, '[ eyebrow: *no catch?* ]']], cues: [...STD_CUES[0], ['whoosh', 0.3, 0.2, 0.03]] },
    { cc: [[0.45, '[ slow nod ]'], [1.9, '[ “one long *walk*” ]']], cues: [...STD_CUES[1], ['whoosh', 1.85, 0.2, 0.03]] },
    { cc: [[0.45, '[ the last coupon ]'], [1.65, '[ a single tear ]']], cues: [...STD_CUES[2], ['whoosh', 0.3, 0.2, 0.03]] },
  ],
  face: stdFace({ inspect: [0.45, 1.6] }),
  desk: book,
  score: { rows: [['Value', 5], ['Fine print', 5], ['Expires', '*never*']], total: '10/10' },
  last: '*Redeeming* all of them.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
