// og-st12capricorn — the OG social cut of st12capricorn (Star Advice). Same set, cast, planner and ending; static HOOK
// (outline) from frame 0 instead of the HOT TAKE stamp, no heat meter / agree pill / episode numeral, louder signs.
//   0.00   HOOK "Capricorns flirt | in *calendars.*"  Capricorn (left) opens a planner booked from 5 AM.
//   2.6    OBJECTION! Pisces (crying, as always): "i wrote you *forty poems.* in tears."
//   last   "Learn their | *accent*."  The planner page reads SAT: YOU. ALL DAY. Pisces reads it, heart-eyed and crying again.
import { HOT, clamp, rgba } from '../../sthot.js'
import { hotEpisode } from './hotsocial.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "i wrote you *forty poems.* in tears." }], verdict: "love has accents. | learn your *person's.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const TEAR = ['.K.', 'KCK', 'KCK', 'KWK', '.K.']
// Pisces cries whenever it appears: two streams of outlined pixel tears under its eyes
function tears(x, t, r) { const c = r.size / 36; for (const sx of [-7, 5]) for (let i = 0; i < 2; i++) { const ph = (t * 1.4 + i * 0.5 + (sx > 0 ? 0.25 : 0)) % 1; x.save(); x.globalAlpha *= 1 - ph * 0.6; bits(x, TEAR, { K: HOT.ink, C: '#8fd8ff', W: '#e8fbff' }, r.x + sx * c, r.y + 1 * c + ph * 10 * c, c * 1.5); x.restore() } }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  duration: 15, key: 'Cm',
  take: { text: "Capricorns show love | in *calendars*.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('capricorn', { x: 290, y: 1170, size: 340, seed: 2 }),
  con: castSign('pisces', { x: 770, y: 1170, size: 330, seed: 7, draw(x, t, r) { tears(x, t, r) } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Learn their | *accent*.", gap: 0.1 },
  moods: { con: [[LAST + 0.4, { mood: 'heart', look: [-1, 0] }]] },
  back: (x, t, T) => { const open = t > T.last + 0.3
    card(x, 540, 800, 420, 220, '#fffbea'); R(x, HOT.ink, 537, 690, 6, 220); R(x, HOT.red, 330, 690, 420, 36)
    txt(x, 'PLANNER', 540, 709, 24, '#fffbea')
    const rows = open ? ['SAT: YOU.', 'ALL DAY.'] : ['MON: 5 AM', 'TUE: 5 AM']
    rows.forEach((s, i) => txt(x, s, 440, 770 + i * 50, 30, open ? HOT.red : HOT.ink))
    for (let i = 0; i < 4; i++) R(x, '#d8ccb0', 570, 760 + i * 30, 150, 6) },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 290, y: 940, text: 'scheduled. lovingly.', at: T.last + 0.5, color: '#fffbea', size: 26 }); bubble(x, t, { x: 770, y: 940, text: 'crying again.', at: T.last + 1.1, color: '#d0e8ff', size: 26 }) },
  cues: [['pop', LAST + 0.3, 1046.5, 0.035, 0], ['bell', LAST + 0.4, 1567.98, 0.02, 0.8, 0.3], ['pop', LAST + 0.5, 880, 0.03, -0.3], ['pop', LAST + 1.1, 1174.66, 0.03, 0.3]],
})
export const { SCENES, CUES, DURATION, STORY_END } = EP
export const HOOK = 'Capricorns flirt | in *calendars.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.5
