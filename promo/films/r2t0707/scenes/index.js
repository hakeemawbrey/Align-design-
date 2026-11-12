// r2t0707: star_talk, SOLO (gemini), "Geminis on a trip | *be like.*" (signs3kit social cut, lofi · E).
// One sign the whole way: nine travel moments, each the most extreme two-minds-at-once Gemini version. Ending: callback
// (card 1's suitcase that would not close comes back for the trip home).
//   two-day trip, eleven outfits · the itinerary: plan A… plan K · landed with six new best friends · learned the
//   language on the plane · beach at 9, mountain at 3 · wrong turn, better trip · two souvenirs, one per mood
//   · the postcard ends mid-sentence · asleep on the bus, mid-story
//   group "One trip. | *Two of everything.*"   last "Packing to go home? | *Still won’t close.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, friend, zzz, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -190 }
const CLOTHES = [PINK, MINT, LAV, '#ff9a4a', SKYB, GOLD]
/** a suitcase that will not close: bulging, with sleeves poking out */
function stuffed(x, t, cx, cy, k, lt, cell = 26) {
  if (k <= 0.01) return
  const bulge = 1 + 0.06 * Math.max(0, Math.sin(t * 7))
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 2 + (i - 2.5) * 0.32, r = cell * 5.4 + 10 * Math.sin(t * 5 + i)
    x.save(); x.translate(cx + Math.cos(a) * r * 0.9, cy - cell * 2.2 + Math.sin(a) * r * 0.45); x.rotate(a + Math.PI / 2); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-16, -44, 32, 70); x.fillStyle = CLOTHES[i]; x.fillRect(-11, -39, 22, 60); x.restore()
  }
  bits(x, 'SUITCASE', cx, cy, cell * k, { sy: bulge, sx: 1 + (bulge - 1) * 0.5 })
}

const CAMEOS = [
  { sign: S, cap: 'Two-day trip. | Packed *eleven outfits.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      stuffed(x, t, 800, 960, pop01(t, P.t0 + 0.2, 0.3, 2), lt, 24)
      L(x, 800, 680, 'WON’T CLOSE', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.05, 40)
    } },
  { sign: S, cap: 'Made an itinerary. | Changed it *nine times.*', mood: lt => Math.floor(lt * 4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const plans = 'ABCDEFGHIJK', n = Math.min(10, Math.floor(clamp((lt - 0.4) / 1.6) * 11))
      sheet(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 330, head: `PLAN ${plans[n]}`, headBg: ACC, headInk: INK, lines: ['museum', 'no, beach', 'no, museum', 'both?'], size: 30, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1110, 'PLAN A: GONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: S, cap: 'Landed with | *six new best friends.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      const ids = ['taurus', 'cancer', 'virgo', 'libra', 'aquarius', 'capricorn']
      ids.forEach((id, i) => friend(x, t, id, 690 + (i % 3) * 110, 840 + Math.floor(i / 3) * 140, 120, pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 30 + i }))
      bubble(x, 800, 640, 'brunch? all of us?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Learned the language | *on the plane.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      bubble(x, 800, 720, 'hello! hola! ciao!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 860, 'FLUENT-ISH', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.05, 34)
    } },
  { sign: S, cap: 'Beach at nine. | *Mountain at three.*', mood: 'sparkle', look: lt => [lt > 1.2 ? 1 : -1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'SUN', 690, 760, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'TENT', 870, 1000, 16 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 690, 900, '9 AM ☀', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, -0.05, 32)
      L(x, 860, 1110, '3 PM ▲', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.05, 32)
    } },
  { sign: S, cap: 'Took a wrong turn. | Found a *better trip.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      swapLabel(x, 800, 690, lt, 1.1, 'LOST?', 'DETOUR #4. LOVE IT', { size: 32, fromBg: STEEL, toBg: PINK })
      sparkles(x, t, 800, 920, P.t0 + 1.4, 7, 180, 0.5)
    } },
  { sign: S, cap: 'Bought two souvenirs. | *One per mood.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SHADES', 700, 900, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      x.save(); x.filter = 'hue-rotate(180deg)'; bits(x, 'SHADES', 900, 900, 12 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.1 }); x.restore()
      L(x, 700, 1040, 'MOOD A', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.05, 30)
      L(x, 900, 1040, 'MOOD B', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, 0.05, 30)
      L(x, 800, 700, 'MOOD C: TBD', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Their postcard ends | *mid-sentence.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 260, rot: 0.05, head: 'WISH YOU WERE HERE', headBg: SKYB, headInk: INK, lines: ['so today we', 'saw a goat and', 'then we—'], size: 30, progress: clamp((lt - 0.3) / 1.1) })
      L(x, 800, 1090, 'TO BE CONTINUED', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: S, cap: 'Fell asleep on the bus. | *Mid-story.*', mood: lt => lt > 1.2 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 1.2) bubble(x, 800, 760, 'and THEN the', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      else zzz(x, t, 800, 820, { size: 56 })
      L(x, 800, 1060, 'TO BE CONTINUED… AGAIN', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2t0707', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Geminis on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One trip. | *Two of everything.*', mood: 'sparkle' },
  last: {
    text: 'Packing to go home? | *Still won’t close.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, S, 330, 1150, 320 * k, { mood: 'wide', look: [1, 0], seed: 40, hops: [t - lt + 1.2, t - lt + 1.8] })
      stuffed(x, t, 730, 1230, pop01(t, t - lt + 0.7, 0.4, 2), lt, 34)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
