// st12capricorn — Star Talk S12 "Hot Takes" E54 (15 s vertical, music: cinematic · Cm). Story 0–10.6, then the end card.
//   0.00   🔥 HOT TAKE "Capricorns show love | in *calendars*."  ♑ Capricorn (left, mid-smirk) opens a planner. HEAT 3/5.
//   2.6    OBJECTION! ♓ Pisces: "say it in a *poem!* a poem!!"
//   last   "Learn their | *accent*."  The planner page reads SAT: YOU. ALL DAY. Pisces reads it, heart-eyed.
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "say it in a *poem!* a poem!!" }], verdict: "love has accents. | learn your *person's.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  numeral: 'S12 E54', duration: 15, key: 'Cm',
  take: { text: "Capricorns show love | in *calendars*.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('capricorn', { x: 290, y: 1170, size: 340, seed: 2 }),
  con: castSign('pisces', { x: 800, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Learn their | *accent*.", gap: 0.1 },
  moods: { con: [[LAST + 0.4, { mood: 'heart', look: [-1, 0] }]] },
  back: (x, t, T) => { const open = t > T.last + 0.3
    card(x, 540, 800, 420, 220, '#fffbea'); R(x, HOT.ink, 537, 690, 6, 220); R(x, HOT.red, 330, 690, 420, 36)
    txt(x, 'PLANNER', 540, 709, 24, '#fffbea')
    const rows = open ? ['SAT: YOU.', 'ALL DAY. ♡'] : ['MON: 9:00', 'TUE: 9:00']
    rows.forEach((s, i) => txt(x, s, 440, 770 + i * 50, 30, open ? HOT.red : HOT.ink))
    for (let i = 0; i < 4; i++) R(x, '#d8ccb0', 570, 760 + i * 30, 150, 6) },
  front: (x, t, T, rp, rc) => {  },
  cues: [['pop', LAST + 0.3, 1046.5, 0.035, 0], ['bell', LAST + 0.4, 1567.98, 0.02, 0.8, 0.3]],
})
export const { SCENES, CUES, DURATION } = EP
