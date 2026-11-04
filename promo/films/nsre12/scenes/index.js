// nsre12: SILENT REVIEW, "Silent review: a jar of twelve reasons." (18 s vertical trial reel, Silent Review Vol. 2
// ep 12, music: jazzy · Ab). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♓ Pisces is the critic this time (so the background Pisces is off) and tries very hard to stay stoic while it reviews
// a jar of twelve folded reasons from ♍ Virgo. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *a jar of twelve reasons.*" Virgo is mid-slide with the jar. CC "[ holding it together ]".
//   2.1–5.0    REACTION 1: a note unfolds above the jar: "1. you listen". "[ opens reason one ]" → a sniffle:
//              "[ still holding it together ]".
//   5.0–7.9    REACTION 2: "6. your laugh". "[ reads reason six ]" → brows up, the tears start:
//              "[ *not* holding it together ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): "12. you feel everything. I love that." "[ reason twelve ]" → "[ a single tear ]" →
//              "[ then *all* the tears ]".
//   11.4–15.5  THE VERDICT: Reasons ★★★★★ · Folding ★★★★★ · Composure *zero* · TOTAL 12/10. "*Twelve* out of ten."
import { makeSilent, R, box, sparkles, hearts, drawBits, HEART, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, RED, T, stdFace, STD_CUES, giftPos, scrawl } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
const NOTE_COLS = ['#ffd2e0', '#d8f5e4', '#fff3c4', '#d8ecff', '#e8dcff']
const NOTES = [
  [B[0][0] + 0.4, ['1.', 'you listen.']],
  [B[1][0] + 0.4, ['6.', 'your laugh.']],
  [B[2][0] + 0.4, ['12. you feel everything.', 'I love that.']],
]

function jar(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  x.save(); x.translate(g.x, g.y - 30); x.rotate(g.rot * 0.5)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-86, 70, 190, 26)
  // jar body
  R(x, INK, -90, -110, 180, 196); R(x, 'rgba(200,230,255,0.35)', -84, -104, 168, 184)
  // folded notes inside
  for (let i = 0; i < 12; i++) { const nx = -70 + (i % 4) * 36 + (i % 3) * 4, ny = 50 - Math.floor(i / 4) * 34 - (i % 2) * 6; R(x, INK, nx - 2, ny - 2, 34, 22); R(x, NOTE_COLS[i % 5], nx, ny, 30, 18) }
  R(x, 'rgba(255,255,255,0.45)', -70, -96, 14, 150)
  // lid + label
  R(x, INK, -96, -138, 192, 34); R(x, GOLD, -90, -132, 180, 22)
  box(x, -78, -40, 156, 40, BONE, { b: 4 })
  x.font = "800 20px Inter, Arial, sans-serif"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('12 REASONS', 0, -19)
  x.restore()
  // the current note, unfolded above the jar
  let cur = -1; for (let i = 0; i < NOTES.length; i++) if (t >= NOTES[i][0]) cur = i
  if (cur >= 0 && P.ph !== 'score') {
    const [at, lines0] = NOTES[cur]
    const lines = cur === 2 ? ['12. you feel everything.', 'I love that.'] : lines0
    const k = easeOutBack(prog(t, at, at + 0.35), 1.6)
    const w = cur === 2 ? 320 : 220
    x.save(); x.translate(g.x - 215, g.y - 30); x.rotate(-0.04); x.scale(k, k)
    box(x, -w / 2, -56, w, 112, NOTE_COLS[cur * 2 % 5], { b: 6 })
    scrawl(x, lines[0], 0, -18, { size: cur === 2 ? 26 : 34, col: '#2a2a6a' })
    scrawl(x, lines[1], 0, 24, { size: cur === 2 ? 32 : 36, col: RED })
    x.restore()
  }
  if (P.i === 2) { sparkles(x, t, g.x - 215, g.y - 30, B[2][0] + 0.5, 12, 240, 1, [GOLD, PINK, BONE]); hearts(x, t, B[2][0] + 1.0, g.x, g.y - 320, { n: 5, cell: 5, spread: 180, rise: 120 }) }
  void drawBits; void HEART; void lerp; void ease
}

const base = stdFace({ inspect: [0.6, 1.6] })
const EP = makeSilent({
  id: 'nsre12', reviewer: 'pisces', giver: 'virgo', gift: 'a jar of twelve reasons.', accent: PINK, noPis: true,
  hookCC: '[ holding it together ]', plate: 'PISCES · CRITIC',
  beats: [
    { cc: [[0.45, '[ opens reason one ]'], [1.75, '[ still holding it together ]']], cues: STD_CUES[0] },
    { cc: [[0.45, '[ reads reason six ]'], [1.9, '[ *not* holding it together ]']], cues: [...STD_CUES[1], ['whoosh', 0.4, 0.2, 0.03]] },
    { cc: [[0.45, '[ reason twelve ]'], [1.65, '[ a single tear ]'], [2.45, '[ then *all* the tears ]']], cues: [...STD_CUES[2], ['whoosh', 0.4, 0.2, 0.03], ['glitter', 2.45, 3.0]] },
  ],
  face(t, P, f) {
    f = base(t, P, f)
    if (P.i === 0 && P.u > 1.75) { f.tears = 1; f.mouth = 'wobble' }
    if (P.i === 1) f.tears = P.u > 1.9 ? 2 : 1
    if (P.i === 2) f.tears = P.u > 2.45 ? 3 : 1
    return f
  },
  scoreFace(t, P, f) { f.tears = 3; return f },
  desk: jar,
  score: { rows: [['Reasons', 5], ['Folding', 5], ['Composure', '*zero*']], total: '12/10' },
  last: '*Twelve* out of ten.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
