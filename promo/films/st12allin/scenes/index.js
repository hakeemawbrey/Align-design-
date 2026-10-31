// st12allin — Star Talk S12 "Hot Takes" E53 (20 s vertical, music: screwed · Fm). Story 0–15.6, then the end card.
//   0.00   🔥 HOT TAKE "Scorpios aren't jealous. | They're *all in*."  ♏ Scorpio (left, mid-smirk) all-in poker chips stacked high.
//          HEAT 5/5.
//   2.6    OBJECTION! ♎ Libra: "you checked who *liked* my post." Scorpio: "…once. okay, *twice.*"
//   last   "All in. | *And* trusting."  Scorpio sets its phone down and the chips spill into a heart (rewatch: one chip reads ♡).
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 20, lines: [{ who: "con", text: "you checked who *liked* my post." }, { who: "pro", text: "…once. okay, *twice.* i'm all in!" }], verdict: "all in is lovely. trust is what | makes it feel *safe.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  numeral: 'S12 E53', duration: 20, key: 'Fm',
  take: { text: "Scorpios aren't jealous. | They're *all in*.", out: [2.5, 2.65] },
  heat: { level: 5, at: -1 },
  pro: castSign('scorpio', { x: 290, y: 1170, size: 340, seed: 2 }),
  con: castSign('libra', { x: 800, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "All in. | *And* trusting.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { const heart = t > T.last + 0.3, cols = [HOT.red, HOT.gold, '#fffbea', HOT.red]
    if (!heart) for (let i = 0; i < 9; i++) { R(x, HOT.ink, 486, 1276 - i * 18, 108, 16); R(x, cols[i % 4], 490, 1276 - i * 18 + 2, 100, 12) }
    else { const H = [[-2, -1], [-1, -2], [1, -2], [2, -1], [-2, 0], [2, 0], [-1, 1], [1, 1], [0, 2], [0, -1], [0, 0], [-1, 0], [1, 0], [-1, -1], [1, -1]]; H.forEach(([a, b], i) => { R(x, HOT.ink, 540 + a * 34 - 18, 1150 + b * 30 - 10, 36, 20); R(x, cols[i % 4], 540 + a * 34 - 16, 1150 + b * 30 - 8, 32, 16) }) }
    txt(x, '♡', 540, heart ? 1150 : 1150 - 8 * 18 + 6, 14, HOT.ink) },
  front: (x, t, T, rp, rc) => {  },
  cues: [['pop', LAST + 0.3, 1046.5, 0.04, 0], ['glitter', LAST + 0.3, LAST + 0.9]],
})
export const { SCENES, CUES, DURATION } = EP
