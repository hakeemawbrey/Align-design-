// og-st12taurus — the OG social cut of st12taurus (Star Advice). Same rug, chalk outline, cast and ending; static HOOK
// (box) from frame 0 instead of the HOT TAKE stamp, no heat meter / agree pill / episode numeral, louder signs.
//   0.00   HOOK "Not stubborn. | Taurus is *loyal.*"  Taurus planted on its rug, chalk outline around it, a MY SPOT tag.
//   2.6    OBJECTION! Gemini shoves with everything it has: "three HOURS of pushing. you're a *boulder.*"
//   last   "Steady | *and* open."  Taurus steps off its rug on its own toward Gemini (the chalk outline stays behind).
import { HOT, clamp, rgba } from '../../sthot.js'
import { hotEpisode } from './hotsocial.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "three HOURS of pushing. you're a *boulder.*" }], verdict: "loyal is lovely. so is changing | your mind *sometimes.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const T_X = 290

const EP = hotEpisode({
  duration: 15, key: 'Bb',
  take: { text: "Taurus isn't stubborn. | It's *loyal*.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('taurus', { x: T_X, y: 1170, size: 340, seed: 2 }),
  con: castSign('gemini', { x: 640, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Steady | *and* open.", gap: 0.1 },
  moods: { pro: [[OBJ + 0.4, { mood: 'squint', look: [0, 0], squash: 0.05 }], [LAST + 0.3, { mood: 'happy', look: [1, 0] }]], con: [[OBJ + 0.4, { mood: 'squint', look: [-1, 0], squash: -0.06 }], [LAST + 0.3, { mood: 'sparkle', look: [-1, 0] }]] },
  back: (x, t, T) => { R(x, '#8a3a4a', 120, 1300, 340, 30); R(x, '#c25a6a', 130, 1304, 320, 10)
    x.save(); x.strokeStyle = 'rgba(255,251,234,0.55)'; x.lineWidth = 5; x.setLineDash([12, 10]); x.strokeRect(120, 990, 340, 300); x.restore()
    if (t < LAST + 0.3) { card(x, 290, 930, 200, 52, '#fffbea'); txt(x, 'MY SPOT.', 290, 930, 28, HOT.ink) } },
  front: (x, t, T, rp, rc) => { if (t > LAST + 0.3) { bubble(x, t, { x: 470, y: 900, text: 'fine. ONE step. your idea.', at: LAST + 0.3, color: '#f0e0c0', size: 28 }); bubble(x, t, { x: 700, y: 820, text: 'IT MOVED.', at: LAST + 1.0, color: '#fff6b0', size: 28 }) } },
  cues: [['pop', LAST + 0.3, 932.33, 0.035, 0], ['whoosh', LAST + 0.25, 0.3, 0.02], ['pop', LAST + 1.0, 1174.66, 0.03, 0.3]],
})
export const { SCENES, CUES, DURATION, STORY_END } = EP
export const HOOK = 'Not stubborn. | Taurus is *loyal.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.5
