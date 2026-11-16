// og-st12chores — the OG social cut of st12chores (Star Advice). Same set, cast, dish stack and ending; static HOOK (box)
// from frame 0 instead of the HOT TAKE stamp, no heat meter / agree pill / episode numeral, louder signs.
//   0.00   HOOK "Doing the dishes | is *flirting.*"  Virgo (left) in yellow gloves: "i labeled the sponges."
//   2.6    OBJECTION! Sagittarius: "i'll do them *next year.* maybe."
//   last   "Do the *dishes*. | Romantically."  The stack is gone (it shrinks plate by plate); Sag dries one plate.
import { HOT, clamp, rgba } from '../../sthot.js'
import { hotEpisode } from './hotsocial.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "i'll do them *next year.* maybe." }], verdict: "sharing the boring stuff | is how you share a *life.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const GLOVE = ['YYY.', 'YYYY', 'YYYY', '.YY.']
const PLATE = ['.WWWWWW.', 'WWsssWWW', '.WWWWWW.']

const EP = hotEpisode({
  duration: 15, key: 'G',
  take: { text: "Splitting chores is a | *love* language.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('virgo', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r) { bits(x, GLOVE, { Y: '#ffe14a' }, r.x + r.size * 0.4, r.y + r.size * 0.02, 12); bits(x, GLOVE, { Y: '#ffe14a' }, r.x - r.size * 0.55, r.y + r.size * 0.02, 12) } }),
  con: castSign('sagittarius', { x: 770, y: 1170, size: 330, seed: 7, draw(x, t, r, T) { if (t > T.last) bits(x, PLATE, { W: '#fffbea', s: '#c8e8ff' }, r.x - r.size * 0.6, r.y + r.size * 0.05, 12) } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Do the *dishes*. | Romantically.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { const n = Math.max(0, Math.round(9 - 9 * clamp((t - 1) / (LAST - 1))))
    R(x, HOT.ink, 470, 1150, 150, 140); R(x, '#8a8aa6', 476, 1156, 138, 128)
    for (let i = 0; i < n; i++) bits(x, PLATE, { W: '#fffbea', s: '#c8e8ff' }, 497 + (i % 2) * 6, 1130 - i * 32, 12) },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 290, y: 930, text: 'i labeled the sponges.', at: 0.5, out: T.obj - 0.2, color: '#fffbea', size: 26 }); bubble(x, t, { x: 770, y: 920, text: 'wash, dry, flirt.', at: T.last + 0.5, color: '#ffe0a0', size: 28 }) },
  cues: [...Array.from({ length: 9 }, (_, i) => ['tick', +(1 + (i + 0.5) * (LAST - 1) / 9).toFixed(2), 0.012])],
})
export const { SCENES, CUES, DURATION, STORY_END } = EP
export const HOOK = 'Doing the dishes | is *flirting.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.5
