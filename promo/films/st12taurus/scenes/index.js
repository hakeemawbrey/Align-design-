// st12taurus — Star Talk S12 "Hot Takes" E49 (15 s vertical, music: lofi · Bb). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Taurus isn't stubborn. | It's *loyal*."  ♉ Taurus (left, mid-smirk), planted on a little rug with a
//          chalk outline around it. HEAT 3/5.
//   2.6    OBJECTION! ♊ Gemini pushes it, nothing moves: "move. you're a *boulder.*"
//   last   "Steady | *and* open."  Taurus steps off its rug on its own toward Gemini (rewatch: the chalk outline stays behind).
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "move. MOVE. you're a *boulder.*" }], verdict: "loyal is lovely. so is changing | your mind *sometimes.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const T_X = 290

const EP = hotEpisode({
  numeral: 'S12 E49', duration: 15, key: 'Bb',
  take: { text: "Taurus isn't stubborn. | It's *loyal*.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('taurus', { x: T_X, y: 1170, size: 340, seed: 2 }),
  con: castSign('gemini', { x: 640, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Steady | *and* open.", gap: 0.1 },
  moods: { pro: [[OBJ + 0.4, { mood: 'squint', look: [0, 0], squash: 0.05 }], [LAST + 0.3, { mood: 'happy', look: [1, 0] }]], con: [[OBJ + 0.4, { mood: 'squint', look: [-1, 0], squash: -0.06 }], [LAST + 0.3, { mood: 'sparkle', look: [-1, 0] }]] },
  back: (x, t, T) => { R(x, '#8a3a4a', 120, 1300, 340, 30); R(x, '#c25a6a', 130, 1304, 320, 10)
    x.save(); x.strokeStyle = 'rgba(255,251,234,0.55)'; x.lineWidth = 5; x.setLineDash([12, 10]); x.strokeRect(120, 990, 340, 300); x.restore() },
  front: (x, t, T, rp, rc) => { if (t > LAST + 0.3) { bubble(x, t, { x: 520, y: 900, text: 'okay. your idea.', at: LAST + 0.3, color: '#f0e0c0', size: 28 }) } },
  cues: [['pop', LAST + 0.3, 932.33, 0.035, 0], ['whoosh', LAST + 0.25, 0.3, 0.02]],
})
export const { SCENES, CUES, DURATION } = EP
