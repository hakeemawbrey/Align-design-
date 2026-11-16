// og-st12pastlove — the OG social cut of st12pastlove (Star Advice). Same locked diary, cast and ending;
// static HOOK (outline) from frame 0 instead of the HOT TAKE stamp, no heat meter / agree pill / episode numeral.
//   0.00   HOOK "Date one is not | your *full* history."  Scorpio (left) with a locked diary: "my diary has a diary."
//   2.6    OBJECTION! Gemini: "every ex. *alphabetical.* go."
//   last   "Share it *slowly*. | It's yours."  The diary opens to page 1 only; Gemini: "page one. i'll wait."
import { hotEpisode } from './hotsocial.js'
import { HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "every ex. *alphabetical.* go." }], verdict: "share at the pace | trust *grows.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  duration: 15, key: 'A',
  take: { text: "You don't owe your | *whole* past on date one.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('scorpio', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r, T) { const bx = r.x + r.size * 0.42, by = r.y - r.size * 0.05, open = t > T.last + 0.3; if (!open) { card(x, bx + 50, by, 110, 140, '#7a2a5a'); R(x, HOT.gold, bx + 90, by - 16, 26, 32) } else { card(x, bx + 10, by, 200, 140, '#fffbea'); R(x, HOT.ink, bx + 7, by - 70, 6, 140); txt(x, 'p.1', bx - 40, by - 40, 22, HOT.ink); R(x, '#c8b8a0', bx - 70, by - 10, 70, 6); R(x, '#c8b8a0', bx - 70, by + 10, 60, 6) } R(x, HOT.gold, r.x - r.size * 0.5, r.y - r.size * 0.2, 22, 10) } }),
  con: castSign('gemini', { x: 770, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Share it *slowly*. | It's yours.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => {  },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 290, y: 880, text: 'my diary has a diary.', at: 0.5, out: T.obj - 0.2, color: '#fffbea', size: 26 }); bubble(x, t, { x: 770, y: 900, text: "page one. i'll wait.", at: T.last + 0.5, color: '#fff0a0', size: 28 }) },
  cues: [['pop', LAST + 0.3, 880, 0.035, -0.3]],
})
export const { SCENES, CUES, DURATION, STORY_END } = EP
export const HOOK = 'Date one is not | your *full* history.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.5
