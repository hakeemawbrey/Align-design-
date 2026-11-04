// nsre11: SILENT REVIEW, "Silent review: star-shaped pancakes." (18 s vertical trial reel, Silent Review Vol. 2 ep 11,
// music: jazzy · Gb). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♈ Aries, who usually eats in four seconds, reviews a stack of star-shaped pancakes from ♌ Leo. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *star-shaped pancakes.*" Leo is mid-slide with the plate, steam rising.
//   2.1–5.0    REACTION 1: the points blink one by one: "[ counts the points ]" → "[ eyebrow: *five each* ]".
//   5.0–7.9    REACTION 2: "[ slow nod ]" → syrup swirls drizzle on, brows up: "[ spots the *syrup art* ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): the syrup on the top pancake spells "proud of you". "[ reads the top one ]" →
//              "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Shape ★★★★ · Syrup art ★★★★★ · The message *undefeated* · TOTAL 10/10. "*Flipped* for you."
import { makeSilent, R, sparkles, hearts, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, T, stdFace, STD_CUES, giftPos, scrawl } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
const SYRUP = '#9a4a1a'

function starPath(x, r, ri) {
  x.beginPath()
  for (let i = 0; i < 10; i++) { const rr = i % 2 ? ri : r, a = -Math.PI / 2 + i * Math.PI / 5; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr * 0.62) }
  x.closePath()
}

function pancakes(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  x.save(); x.translate(g.x, g.y - 10); x.rotate(g.rot * 0.6)
  // plate
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 190, 52, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#eef0f8'; x.beginPath(); x.ellipse(0, 36, 182, 46, 0, 0, Math.PI * 2); x.fill()
  // the stack: three star pancakes
  for (let k = 0; k < 3; k++) {
    x.save(); x.translate(0, 20 - k * 26)
    starPath(x, 150, 70); x.fillStyle = INK; x.fill()
    x.translate(0, -4); starPath(x, 142, 64); x.fillStyle = '#c9822e'; x.fill()
    x.translate(0, -8); starPath(x, 136, 60); x.fillStyle = k === 2 ? '#f2b864' : '#e0a050'; x.fill()
    x.restore()
  }
  // the top pancake's points blink while counted
  if (P.i === 0) {
    const n = Math.floor(prog(P.u, 0.45, 1.6) * 5)
    if (n < 5) { const a = -Math.PI / 2 + n * 2 * Math.PI / 5; R(x, '#ffffff', Math.cos(a) * 112 - 8, -40 + Math.sin(a) * 112 * 0.62 - 8, 16, 16) }
  }
  // syrup swirls (reaction 2 onward)
  const sw = ease.inOutQuad(prog(t, B[1][0] + 1.6, B[1][0] + 2.3))
  const swA = 1 - clamp(prog(t, B[2][0] + 0.2, B[2][0] + 0.45))
  if (sw > 0 && swA > 0) {
    x.save(); x.globalAlpha *= swA
    x.strokeStyle = SYRUP; x.lineWidth = 8; x.lineCap = 'round'
    x.beginPath(); for (let k = 0; k <= 30 * sw; k++) { const a = k / 30 * Math.PI * 3.2; x.lineTo(-90 + k * 6, -40 + Math.sin(a) * 14) } x.stroke()
    // drips over the edge
    x.restore()
  }
  if (sw > 0) for (const dx of [-100, 40, 110]) R(x, SYRUP, dx, -24, 8, 18 * sw)
  // the message (reaction 3)
  const mk = clamp(prog(t, B[2][0] + 0.35, B[2][0] + 0.75))
  if (mk > 0) { scrawl(x, 'proud of you', 2, -36, { size: 46, col: '#fff3c4', alpha: mk * 0.8 }); scrawl(x, 'proud of you', 0, -40, { size: 46, col: '#4a1a04', alpha: mk }) }
  x.restore()
  // steam
  for (let i = 0; i < 4; i++) { const ph = (t * 0.8 + i / 4) % 1; x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); R(x, '#ffffff', g.x - 60 + i * 40 + 6 * Math.sin(t * 3 + i), g.y - 110 - ph * 90, 12, 12); x.restore() }
  if (P.i === 1) sparkles(x, t, g.x, g.y - 50, B[1][0] + 1.9, 10, 170, 1, [GOLD, '#f2b864', BONE])
  if (P.i === 2) hearts(x, t, B[2][0] + 0.8, g.x, g.y - 140, { n: 4, cell: 5, spread: 100, rise: 110 })
  void RED
}

const EP = makeSilent({
  id: 'nsre11', reviewer: 'aries', giver: 'leo', gift: 'star-shaped pancakes.', accent: PINK,
  hookCC: '[ fork ready. waiting. ]', plate: 'ARIES · CRITIC',
  beats: [
    { cc: [[0.45, '[ counts the points ]'], [1.75, '[ eyebrow: *five each* ]']], cues: [...STD_CUES[0], ...Array.from({ length: 5 }, (_, i) => ['pop', +(0.45 + i * 0.23).toFixed(3), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.02, 0])] },
    { cc: [[0.45, '[ slow nod ]'], [1.9, '[ spots the *syrup art* ]']], cues: STD_CUES[1] },
    { cc: [[0.45, '[ reads the top one ]'], [1.65, '[ a single tear ]']], cues: STD_CUES[2] },
  ],
  face: stdFace({ inspect: [0.45, 1.6] }),
  desk: pancakes,
  score: { rows: [['Shape', 4], ['Syrup art', 5], ['The message', '*undefeated*']], total: '10/10' },
  last: '*Flipped* for you.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void lerp
