// og-st12pisces — the OG social cut of st12pisces (Star Advice). Same flower, cast and ending; Pisces cries the whole
// time (house rule). Static HOOK (outline) from frame 0 instead of the HOT TAKE stamp, no heat meter / pill / numeral.
//   0.00   HOOK "Pisces: too soft? | *Soft is strong.*"  Pisces (left, crying) holds a flower: "crying. strongly."
//   2.6    OBJECTION! Capricorn: "feelings? *pencil them in* for next quarter."
//   last   "Soft. *Strong*. | Both."  Capricorn holds the flower now: "...it's a nice flower."
import { hotEpisode } from './hotsocial.js'
import { HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "feelings? *pencil them in* for next quarter." }], verdict: "gentleness takes courage. | so does saying *no.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..', '..G..']
const TEAR = ['.K.', 'KCK', 'KCK', 'KWK', '.K.']
// Pisces cries whenever it appears: two streams of outlined pixel tears under its eyes
function tears(x, t, r) { const c = r.size / 36; for (const sx of [-7, 5]) for (let i = 0; i < 2; i++) { const ph = (t * 1.4 + i * 0.5 + (sx > 0 ? 0.25 : 0)) % 1; x.save(); x.globalAlpha *= 1 - ph * 0.6; bits(x, TEAR, { K: HOT.ink, C: '#8fd8ff', W: '#e8fbff' }, r.x + sx * c, r.y + 1 * c + ph * 10 * c, c * 1.5); x.restore() } }
const BUD = ['.P.P.', 'PPYPP', '.PPP.']

const EP = hotEpisode({
  duration: 15, key: 'Db',
  take: { text: "Pisces aren't too soft. | Soft is *strong*.", out: [2.5, 2.65] },
  heat: { level: 4, at: -1 },
  pro: castSign('pisces', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r, T) { tears(x, t, r); if (t < T.last) bits(x, FLOWER, { P: '#ff8fc8', Y: HOT.gold, G: '#5fb84f' }, r.x + r.size * 0.4, r.y - r.size * 0.3, 15) } }),
  con: castSign('capricorn', { x: 770, y: 1170, size: 330, seed: 7, draw(x, t, r, T) { if (t >= T.last) { bits(x, FLOWER, { P: '#ff8fc8', Y: HOT.gold, G: '#5fb84f' }, r.x - r.size * 0.7, r.y - r.size * 0.3, 15); if (t > T.last + 0.8) bits(x, BUD, { P: '#ffc0e0', Y: HOT.gold }, r.x - r.size * 0.7 + 30, r.y - r.size * 0.3 + 40, 9) } } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Soft. *Strong*. | Both.", gap: 0.1 },
  moods: { con: [[LAST + 0.2, { mood: 'happy', look: [-1, 0], blush: 1 }]] },
  back: (x, t, T) => {  },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 290, y: 860, text: 'crying. strongly.', at: 0.5, out: T.obj - 0.2, color: '#fffbea', size: 26 }); bubble(x, t, { x: 770, y: 880, text: "...it's a nice flower.", at: T.last + 0.6, color: '#ffe0a0', size: 26 }) },
  cues: [['pop', LAST + 0.2, 1108.73, 0.035, 0.3], ['bell', LAST + 0.8, 1661.22, 0.02, 0.8, 0.3]],
})
export const { SCENES, CUES, DURATION, STORY_END } = EP
export const HOOK = 'Pisces: too soft? | *Soft is strong.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.5
