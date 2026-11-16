// og-st12coffeedate — the OG social cut of st12coffeedate (Star Advice). Same café set, cast, candelabra and ending;
// static HOOK (outline) from frame 0 instead of the HOT TAKE stamp, no heat meter / agree pill / episode numeral.
//   0.00   HOOK "First date dinner? | Get *coffee.*"  Virgo (left) raises a coffee: "one hour. timer set."
//   2.6    OBJECTION! Leo with a lit candelabra: "i hired *a violinist.* and a fog machine."
//   last   "Start *small*. | Stay curious."  Leo sets one candle beside a second coffee; the chalkboard's 1 HOUR becomes 3 HOURS.
import { HOT, clamp } from '../../sthot.js'
import { hotEpisode } from './hotsocial.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: 'con', text: 'i hired *a violinist.* and a fog machine.' }], verdict: 'low pressure helps you | actually *talk.* fancy can wait.' })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at

const CUP = ['.s.s.', 's.s..', '.....', 'WWWWWW', 'WccccWW', 'WccccW.W', 'WccccWW', '.WWWW..']
const CUP_C = { s: 'rgba(255,255,255,0.7)', W: '#fffbea', c: '#8a5228' }
const CANDLE = ['.f...f...f.', '.F...F...F.', '.w...w...w.', '.w...w...w.', '.w...w...w.', 'GGGGGGGGGGG', '.....G.....', '.....G.....', '....GGG....']
const CANDLE_C = { f: '#fff6d8', F: HOT.orange, w: '#fffbea', G: HOT.gold }
const ONE = ['f', 'F', 'w', 'w', 'w', 'G']

function chalkboard(x, t, T) {
  const cx = 540, cy = 690, w = 360, h = 190
  R(x, HOT.ink, cx - w / 2 - 10, cy - h / 2 - 10, w + 20, h + 20); R(x, '#8a5228', cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, '#21302a', cx - w / 2, cy - h / 2, w, h)
  x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#e8f0e0'
  x.fillText('2 COFFEES', cx, cy - 36)
  x.fillText(t > T.last + 0.6 ? '3 HOURS' : '1 HOUR', cx, cy + 34)
}
function steam(x, t, cx, cy) {
  for (let i = 0; i < 3; i++) { const p = ((t * 0.8 + i / 3) % 1); R(x, `rgba(255,255,255,${0.5 * (1 - p)})`, cx + i * 14 - 14 + Math.sin(p * 6 + i) * 6, cy - p * 60, 7, 7) }
}

const EP = hotEpisode({
  duration: 15, key: 'F',
  take: { text: 'Coffee beats dinner | for a *first* date.', out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('virgo', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r) {
    const lift = t < 2.4 || t > LAST ? Math.sin(t * 4) * 6 : 0
    const cx = r.x + r.size * 0.42, cy = r.y - r.size * 0.05 + lift
    bits(x, CUP, CUP_C, cx - 30, cy - 70, 14); steam(x, t, cx + 10, cy - 70)
  } }),
  con: castSign('leo', { x: 770, y: 1170, size: 330, seed: 7, draw(x, t, r, T) {
    if (t < T.last) bits(x, CANDLE, CANDLE_C, r.x - r.size * 0.78, r.y - r.size * 0.3, 13)
    else { bits(x, ONE, CANDLE_C, 500, 1232, 13); bits(x, CUP, CUP_C, 560, 1228, 12) }
  } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: 'Start *small*. | Stay curious.', gap: 0.1 },
  back: (x, t, T) => {
    chalkboard(x, t, T)
    if (t > T.last) { R(x, HOT.ink, 470, 1314, 260, 18); R(x, '#8a5228', 474, 1310, 252, 12); R(x, '#5a3a24', 590, 1330, 20, 150) }
  },
  front(x, t, T) { bubble(x, t, { x: 290, y: 880, text: 'one hour. timer set.', at: 0.5, out: T.obj - 0.2, color: '#fffbea', size: 26 }); bubble(x, t, { x: 770, y: 870, text: 'fine. ONE candle.', at: T.last + 0.5, color: '#ffe0a0', size: 28 }) },
  cues: [['tick', LAST + 0.6, 0.03], ['pop', LAST + 0.5, 880, 0.03, 0.3]],
})
export const { SCENES, CUES, DURATION, STORY_END } = EP
export const HOOK = 'First date dinner? | Get *coffee.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.5
