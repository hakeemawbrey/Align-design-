// r2t0758: star_talk, BELIKE, "Shop closes in five? | Zodiacs *be like.*" (topic: zodiacs when the shop closes in five
// minutes; signs3kit social cut, lofi · G). Twelve signs in zodiac order, each one's most extreme last-minute dash.
// Ending: lesson.
//   ♈ sprinted in, out in forty seconds · ♉ five minutes? browsing the cheese · ♊ came for milk, left with a kite
//   · ♋ apologised to the cashier, bought them a snack · ♌ asked them to stay open, for Leo · ♍ list sorted by aisle
//   · ♎ two cereals, ran a compatibility check · ♏ one look at the cashier, five more minutes · ♐ shop closed, road trip
//   to the next one · ♑ is the manager, closing on time · ♒ self-checkout froze, rewired it · ♓ lights off, said
//   goodbye to the shop (sobbing)
//   lesson "The shop opens again | *tomorrow.*"  last "Taurus is | *still in there.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }
const box = (x, cx, cy, k, col, name, rot = 0) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-62, -92, 136, 196)
  x.fillStyle = INK; x.fillRect(-76, -106, 152, 212); x.fillStyle = col; x.fillRect(-70, -100, 140, 200)
  x.fillStyle = CREAM; x.fillRect(-52, -70, 104, 50); x.fillStyle = INK; x.font = `800 26px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, -44)
  x.fillStyle = '#ffe27a'; x.beginPath(); x.arc(0, 40, 34, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Sprinted in. | Out in *forty seconds.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.5, 0.8, 1.1],
    front(x, t, lt, P) {
      const s = Math.min(40, Math.floor(clamp((lt - 0.2) / 1.4) * 40))
      L(x, 800, 820, `0:${String(s).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), RED, -0.04, 64)
      bits(x, 'BAG', 800, 1020, 17 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
      L(x, 800, 650, 'NEW RECORD', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Five minutes left? | *Browsing the cheese.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CHEESE', 790, 870, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'CLOSING IN 5', pop01(t, P.t0 + 0.6, 0.3, 2.2), RED, -0.04, 30)
      L(x, 800, 1080, 'NO RUSH (FOR TAURUS)', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 26)
    } },
  { sign: 'gemini', cap: 'Came for milk. | Left with *a kite.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      swapLabel(x, 800, 1090, lt, 1.0, 'LIST: MILK', 'MILK: FORGOT', { size: 30, fromBg: CREAM, toBg: PINK })
      bits(x, 'KITE', 810 + Math.sin(t * 2) * 12, 820, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.15 + Math.sin(t * 2) * 0.06 })
    } },
  { sign: 'cancer', cap: 'Apologised to the cashier. | *Bought them a snack.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 840, 960, 190, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0] })
      bubble(x, 780, 680, 'so sorry, | this is for you', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      bits(x, 'COOKIE', 680, 1050, 11 * pop01(t, P.t0 + 1.1, 0.3, 2.2))
    } },
  { sign: 'leo', cap: 'Asked them to stay open. | *For Leo.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const open = lt > 1.3
      L(x, 800, 820, open ? 'OPEN (FOR LEO)' : 'CLOSED', 1 * pop01(t, P.t0 + 0.2, 0.3, 2), open ? MINT : RED, -0.03, open ? 38 : 52)
      bubble(x, 800, 660, 'it’s me though?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 800, 820, P.t0 + 1.3, 7, 200, 0.5)
    } },
  { sign: 'virgo', cap: 'Shopping list sorted | *by aisle.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 310, h: 340, head: 'LIST v4', headBg: '#ff8fb1', headInk: INK, lines: ['A1 bread ✓', 'A3 apples ✓', 'A7 rice ✓', 'A9 soap ✓'], size: 30, align: 'left', font: MONO, weight: 700, progress: prog(lt, 0.4, 1.4) })
      L(x, 800, 1110, 'DONE: 4:59 LEFT', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Two cereals. | Ran a *compatibility check.*', mood: 'neutral', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 700, 880, pop01(t, P.t0 + 0.2, 0.3, 2), '#ff8fb1', 'OATS', -0.05)
      box(x, 890, 880, pop01(t, P.t0 + 0.35, 0.3, 2), SKYB, 'CRUNCH', 0.05)
      L(x, 800, 650, 'MATCH: 50 / 50', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 32)
      L(x, 800, 1110, 'LIGHTS: GOING OFF', pop01(t, P.t0 + 1.7, 0.3, 2.2), STEEL, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'One look at the cashier. | *Five more minutes.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 840, 960, 190, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.0 ? 'wide' : 'happy', look: [-1, 0] })
      bubble(x, 830, 680, 'take your time!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bc' })
      L(x, 600, 1120, 'CLOSING: DELAYED', pop01(t, P.t0 + 1.6, 0.3, 2.2), '#c97bff', -0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Shop closed? | *Road trip* to the next one.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const d = ease.inOutCubic(clamp((lt - 0.6) / 1.3))
      bits(x, 'CAR', lerp(760, 840, d), 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'NEXT SHOP: 40 MILES', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 28)
      L(x, 760, 1110, 'WORTH IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Shop closing? | Cap *is the manager.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'KEY', 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      L(x, 800, 680, 'CLOSING: 9:00:00', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, -0.04, 32)
      L(x, 800, 1080, 'NOT 9:00:01', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Self-checkout froze. | *Rewired it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 870, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.2 ? Math.sin(t * 30) * 0.03 : 0 })
      bits(x, 'WRENCH', 700, 1050, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: Math.sin(t * 8) * 0.3 })
      L(x, 800, 660, lt > 1.3 ? 'NOW IT TALKS' : 'ERROR', 1, lt > 1.3 ? MINT : RED, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Lights went off. | Pisces *waved goodbye.*', mood: 'wide', look: [1, 0], tears: lt => lt > 0.8 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'bye aisle 4. | i’ll miss you', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 800, 1060, 'CLOSED', pop01(t, P.t0 + 0.3, 0.3, 2), RED, 0.03, 44)
    } },
]

const F = makeFilm({
  id: 'r2t0758', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Shop closes in five? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *left on time.*', moods: ['sparkle', 'heart', 'wink', 'happy', 'wink', 'happy', 'neutral', 'squint', 'sparkle', 'neutral', 'sparkle', 'wide'] },
  lesson: { text: 'The shop opens again | *tomorrow.*', chip: 'PANIC: CLOSED' },
  last: {
    text: 'Taurus is | *still in there.*',
    draw(x, t, lt) {
      const t0 = t - lt
      bits(x, 'CHEESE', 540, 1570, 18 * pop01(t, t0 + 0.6, 0.4, 2))
      L(x, 540, 1720, 'STILL BROWSING', pop01(t, t0 + 1.3, 0.3, 2.2), GOLD, -0.03, 34)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
