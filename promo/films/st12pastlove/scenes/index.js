// st12pastlove — Star Talk S12 "Hot Takes" E43 (15 s vertical, music: lofi · A). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "You don't owe your *whole* | past on date one."  ♏ Scorpio (left, mid-smirk) holds a locked diary.
//          HEAT 3/5.
//   2.6    OBJECTION! ♊ Gemini: "tell me *EVERYTHING.* every ex."
//   last   "Share it *slowly*. | It's yours."  The diary opens to page 1 only (rewatch: the key hangs from Scorpio's point).
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "tell me *EVERYTHING.* every ex." }], verdict: "share at the pace | trust *grows.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  numeral: 'S12 E43', duration: 15, key: 'A',
  take: { text: "You don't owe your | *whole* past on date one.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('scorpio', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r, T) { const bx = r.x + r.size * 0.42, by = r.y - r.size * 0.05, open = t > T.last + 0.3; if (!open) { card(x, bx + 50, by, 110, 140, '#7a2a5a'); R(x, HOT.gold, bx + 90, by - 16, 26, 32) } else { card(x, bx + 10, by, 200, 140, '#fffbea'); R(x, HOT.ink, bx + 7, by - 70, 6, 140); txt(x, 'p.1', bx - 40, by - 40, 22, HOT.ink); R(x, '#c8b8a0', bx - 70, by - 10, 70, 6); R(x, '#c8b8a0', bx - 70, by + 10, 60, 6) } R(x, HOT.gold, r.x - r.size * 0.5, r.y - r.size * 0.2, 22, 10) } }),
  con: castSign('gemini', { x: 800, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Share it *slowly*. | It's yours.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => {  },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 800, y: 900, text: 'page one. got it.', at: T.last + 0.5, color: '#fff0a0', size: 28 }) },
  cues: [['pop', LAST + 0.3, 880, 0.035, -0.3]],
})
export const { SCENES, CUES, DURATION } = EP
