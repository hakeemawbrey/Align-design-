// nsre04: SILENT REVIEW, "Silent review: a cookie of my face." (20 s vertical trial reel, Silent Review Vol. 2 ep 4,
// music: jazzy · F). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♌ Leo reviews a big iced cookie of its own face, baked by ♍ Virgo. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *a cookie of my face.*" Virgo is mid-slide with the cookie on a plate.
//   2.1–5.0    REACTION 1: "[ studies the likeness ]" → a loupe on the lopsided icing: "[ one eyebrow: *lopsided?* ]".
//   5.0–7.9    REACTION 2: "[ slow, regal nod ]" → the orange icing mane shimmers: "[ notices the icing *mane* ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): a tiny gold crown, piped on top: "[ sees the tiny *crown* ]" → "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Likeness ★★★ · The mane ★★★★★ · Eating it *never* · TOTAL 10/10. "*Too* iconic to eat."
import { makeSilent, R, box, sparkles, hearts, drawBits, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, T, stdFace, STD_CUES, giftPos, drawStarChar, signStar } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
const LEO = signStar('leo')
const CROWN = ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG']

function cookie(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  x.save(); x.translate(g.x, g.y - 20); x.rotate(g.rot)
  // plate
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 170, 46, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#eef0f8'; x.beginPath(); x.ellipse(0, 36, 162, 40, 0, 0, Math.PI * 2); x.fill()
  // the cookie
  x.fillStyle = INK; x.beginPath(); x.arc(0, -30, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c98a4a'; x.beginPath(); x.arc(0, -30, 111, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e0a868'; x.beginPath(); x.arc(-8, -38, 96, 0, Math.PI * 2); x.fill()
  // the icing mane: a ring of orange blobs (shimmers in reaction 2)
  const sh = P.i === 1 && P.u > 1.9 ? 0.5 + 0.5 * Math.sin(t * 14) : 0
  x.lineWidth = 30; x.strokeStyle = INK; x.beginPath(); x.arc(0, -30, 96, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 20; x.strokeStyle = sh > 0.5 ? '#ffd27a' : '#ff9a3a'; x.beginPath(); x.arc(0, -30, 96, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2 + 0.2; R(x, '#ffcf8a', Math.cos(a) * 96 - 4, -30 + Math.sin(a) * 96 - 4, 8, 8) }
  x.restore()
  // the iced face: a slightly lopsided Leo star
  x.save(); x.translate(g.x, g.y - 50); x.rotate(0.12)
  drawStarChar(x, 0, 6, 150, t, { color: LEO.color, mood: 'happy', look: [0, 0], seed: 9, glow: 0, bob: 0, squash: 0.08, tips: false })
  x.restore()
  // the tiny crown (always there; it sparkles in reaction 3)
  drawBits(x, CROWN, { G: GOLD, R: '#e8344e' }, g.x + 4, g.y - 132, 5)
  if (P.i === 2) { sparkles(x, t, g.x + 4, g.y - 132, B[2][0] + 0.45, 8, 50, 1, [GOLD, BONE]); hearts(x, t, B[2][0] + 0.6, g.x, g.y - 170, { n: 3, cell: 5, spread: 60, rise: 100 }) }
  if (P.i === 0) {
    const lk = clamp(prog(P.u, 1.55, 1.75)) * (1 - clamp(prog(P.u, 2.7, 2.85)))
    if (lk > 0.01) {
      const lx = lerp(500, 600, ease.inOutQuad(prog(P.u, 1.6, 2.6))), ly = 1110 + 10 * Math.sin(P.u * 7)
      x.save(); x.globalAlpha = lk
      x.save(); x.translate(lx, ly); x.rotate(0.7); R(x, INK, 46, -12, 92, 24); R(x, '#6b4a2f', 50, -7, 84, 14); x.restore()
      x.lineWidth = 12; x.strokeStyle = INK; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 6; x.strokeStyle = GOLD; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(200,235,255,0.22)'; x.beginPath(); x.arc(lx, ly, 48, 0, Math.PI * 2); x.fill()
      x.restore()
    }
  }
  void box
}

const EP = makeSilent({
  id: 'nsre04', reviewer: 'leo', giver: 'virgo', gift: 'a cookie of my face.', accent: PINK,
  hookCC: '[ poses, then remembers: silent ]', plate: 'LEO · CRITIC',
  beats: [
    { cc: [[0.45, '[ studies the likeness ]'], [1.75, '[ one eyebrow: *lopsided?* ]']], cues: STD_CUES[0] },
    { cc: [[0.45, '[ slow, regal nod ]'], [1.9, '[ notices the icing *mane* ]']], cues: STD_CUES[1] },
    { cc: [[0.45, '[ sees the tiny *crown* ]'], [1.65, '[ a single tear ]']], cues: STD_CUES[2] },
  ],
  face: stdFace({ inspect: [1.6, 2.8] }),
  desk: cookie,
  score: { rows: [['Likeness', 3], ['The mane', 5], ['Eating it', '*never*']], total: '10/10' },
  last: '*Too* iconic to eat.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
