// st12chores — Star Talk S12 "Hot Takes" E40 (15 s vertical, music: funk · G). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Splitting chores is a | *love* language."  ♍ Virgo (left, mid-smirk) in yellow rubber gloves by a
//          towering stack of dishes. HEAT 3/5.
//   2.6    OBJECTION! ♐ Sagittarius: "dishes can *wait.* forever."
//   last   "Do the *dishes*. | Romantically."  The stack is gone (rewatch: it shrinks plate by plate); Sag dries one plate.
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "dishes can *wait.* forever." }], verdict: "sharing the boring stuff | is how you share a *life.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const GLOVE = ['YYY.', 'YYYY', 'YYYY', '.YY.']
const PLATE = ['.WWWWWW.', 'WWsssWWW', '.WWWWWW.']

const EP = hotEpisode({
  numeral: 'S12 E40', duration: 15, key: 'G',
  take: { text: "Splitting chores is a | *love* language.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('virgo', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r) { bits(x, GLOVE, { Y: '#ffe14a' }, r.x + r.size * 0.4, r.y + r.size * 0.02, 12); bits(x, GLOVE, { Y: '#ffe14a' }, r.x - r.size * 0.55, r.y + r.size * 0.02, 12) } }),
  con: castSign('sagittarius', { x: 800, y: 1170, size: 330, seed: 7, draw(x, t, r, T) { if (t > T.last) bits(x, PLATE, { W: '#fffbea', s: '#c8e8ff' }, r.x - r.size * 0.6, r.y + r.size * 0.05, 12) } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Do the *dishes*. | Romantically.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { const n = Math.max(0, Math.round(9 - 9 * clamp((t - 1) / (LAST - 1))))
    R(x, HOT.ink, 470, 1150, 150, 140); R(x, '#8a8aa6', 476, 1156, 138, 128)
    for (let i = 0; i < n; i++) bits(x, PLATE, { W: '#fffbea', s: '#c8e8ff' }, 497 + (i % 2) * 6, 1130 - i * 32, 12) },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 800, y: 920, text: 'wash, dry, flirt.', at: T.last + 0.5, color: '#ffe0a0', size: 28 }) },
  cues: [...Array.from({ length: 9 }, (_, i) => ['tick', +(1 + (i + 0.5) * (LAST - 1) / 9).toFixed(2), 0.012])],
})
export const { SCENES, CUES, DURATION } = EP
