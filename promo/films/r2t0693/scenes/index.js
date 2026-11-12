// r2t0693: star_talk, SOLO (virgo), "Virgos running late | *be like.*" (signs3kit social cut, music: lofi · G).
// Nine running-late situations, each the most extreme Virgo version. Ending: group.
//   wrote a document on why · still ironed the socks · recalculated the route eleven times · one minute late = code red
//   · still cleaned the kitchen first · blamed the clock, then fixed it · checked the chart: Mercury did this
//   · late to the date, sent an itinerary · arrived late, still the most prepared
//   group "Late? | *Never unprepared.*"
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, soap, RED, CREAM, STEEL, NIGHT, PLUM, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'virgo', ST = { x: -190 }
const IRON = ['....KKKKKKK.', '...KSSSSSSK.', '..KSSSSSSSK.', '.KSSSSSSSSKK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK']
const SOCK = ['.PPPP', '.PWWP', '.PPPP', '.PPPP', '.PPPP', 'PPPPP', 'PPPPP', 'PPPP.']

function bigClock(x, cx, cy, k, text, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -76, 312, 168)
  x.fillStyle = INK; x.fillRect(-162, -88, 324, 176)
  x.fillStyle = NIGHT; x.fillRect(-150, -76, 300, 152)
  x.fillStyle = col; x.font = `700 92px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Late? | Wrote *a report* on why.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 340, head: 'WHY I’M LATE', headBg: ACC, headInk: INK, lines: ['1. traffic', '2. a sock', '3. see appendix'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1090, 'PAGE 1 OF 6', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Already late. | Still *ironed the socks.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SOCK, { P: PINK, W: BONE }, 760, 900, 22 * k, { rot: 1.57 })
      drawBits(x, IRON, { K: INK, S: STEEL }, 830 + Math.sin(t * 6) * 40, 820, 16 * k)
      L(x, 800, 1090, 'CREASES: ZERO', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Recalculated the route | *eleven times.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 850, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 10)
      L(x, 800, 1080, `ROUTE ${n} OF 11`, pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'One minute late. | *Code red.*', mood: lt => lt > 0.9 ? 'wide' : 'neutral', look: [1, 0], star: ST, hops: [0.9, 1.3],
    front(x, t, lt, P) {
      bigClock(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 0.9 ? '9:00' : '9:01', lt < 0.9 ? MINT : RED)
      L(x, 800, 1060, '⚠ CODE RED ⚠', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.05, 38)
    } },
  { sign: S, cap: 'Late, but cleaned | the *whole kitchen* first.', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BROOM', 800, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 + Math.sin(t * 5) * 0.15 })
      soap(x, t, 800, 900, { n: 6, spread: 260, r: 24, h: 280, seed: 3 })
      L(x, 800, 1090, 'SPARKLING ✦', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 28)
    } },
  { sign: S, cap: 'Blamed the clock. | Then *fixed* the clock.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.3 ? 0.25 : 0 })
      bits(x, 'WRENCH', 800, 1000, 16 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: -0.3 + Math.sin(t * 7) * 0.2 })
      L(x, 800, 1100, 'NOW 4 SECONDS FAST', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Checked their chart. | *Mercury* did this.', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1070, 'MERCURY: BLAMED', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, 0.04, 32)
    } },
  { sign: S, cap: 'Late for the date? | Sent *an itinerary.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MATCH ✦', headCol: PINK, lines: [['where r u?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2)], ['eta 7:04', ACC, pop01(t, P.t0 + 0.8, 0.25, 2), true], ['parking: B2', ACC, pop01(t, P.t0 + 1.0, 0.25, 2), true], ['table: left', ACC, pop01(t, P.t0 + 1.2, 0.25, 2), true]] })
      L(x, 800, 1100, 'ITINERARY v3', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Arrived late. | Still *the most prepared.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 830, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1020, 'SNACKS · PLASTERS', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, -0.04, 28)
      L(x, 800, 1100, 'UMBRELLA · PLAN B', pop01(t, P.t0 + 1.2, 0.3, 2.2), CREAM, 0.04, 28)
      sparkles(x, t, 800, 830, P.t0 + 1.3, 6, 170, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0693', key: 'G', accent: ACC, solo: S, ending: 'group',
  title: 'Virgos running late | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Late? | *Never unprepared.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
