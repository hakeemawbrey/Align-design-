// r2t0546: star_talk, ROLLCALL, "The signs | *at the car wash.*" (signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each the most extreme version of itself at the car wash. Ending: lesson.
//   ♈ line too long, ran through on foot · ♉ paid for one wash, stayed for six · ♊ chatting to the brushes
//   · ♋ wrapped the car in a blanket after · ♌ washed it for a new profile pic · ♍ found one spot, rewashed by hand
//   · ♎ can't pick a wash, asked their match · ♏ checked the attendant's chart first · ♐ "it rained once" · ♑ bought the
//   car wash · ♒ invented a waterless wash · ♓ the bubbles were so pretty, sobbed
//   group "Clean cars. | *Soaked attendant.*"  lesson "Everyone shines | *in their own way.*"  SHINE: ON
//   last "And Pisces? | *Still in there.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, drawBits } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, swapLabel, zzz, chart, soap, rain, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -160 }
const CAR = ['....RRRRRRR.....', '...RWWWRWWWR....', '..RWWWWRWWWWR...', 'RRRRRRRRRRRRRRRR', 'YRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRR', '..KKK......KKK..', '..KGK......KGK..', '..KKK......KKK..']
const car = (x, cx, cy, cell, col = RED, o) => drawBits(x, CAR, { R: col, W: SKYB, Y: GOLD, K: INK, G: STEEL }, cx, cy, cell, o)
const SPONGE = ['YYYYYYYY', 'YyYYyYYY', 'YYYYYyYY', 'YYyYYYYY', 'GGGGGGGG']
const sponge = (x, cx, cy, cell, o) => drawBits(x, SPONGE, { Y: '#ffe27a', y: '#d9b94a', G: '#4fbf6a' }, cx, cy, cell, o)
/** a spinning car-wash brush */
function brush(x, t, cx, cy, k, { h = 300 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-58, -h / 2 - 8, 116, h + 16)
  const cols = [SKYB, '#5fb8e8', BONE]
  for (let j = 0; j < h / 24; j++) { x.fillStyle = cols[(j + Math.floor(t * 14)) % 3]; x.fillRect(-50, -h / 2 + j * 24, 100, 24) }
  x.fillStyle = STEEL; x.fillRect(-8, -h / 2 - 40, 16, 40)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Line too long. | Ran through *on foot.*', mood: lt => lt < 0.9 ? 'squint' : 'wide', star: ST, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      brush(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2))
      soap(x, t, 520, 900, { n: 6, spread: 300, r: 22, h: 260, alpha: clamp((lt - 0.8) * 3), seed: 1 })
      L(x, 800, 1110, 'SOAKED. WORTH IT.', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Paid for one wash. | Stayed *for six.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      car(x, 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), '#5fd068')
      const n = 1 + Math.min(5, Math.floor(clamp((lt - 0.4) / 1.6) * 5.99))
      L(x, 800, 1090, `WASH ${n} OF 6`, pop01(t, P.t0 + 0.4, 0.3, 2.2), MINT, 0.04, 36)
      if (lt > 1.2) zzz(x, t, 470, 720, { alpha: clamp((lt - 1.2) * 3), size: 46 })
    } },
  { sign: 'gemini', cap: 'Made a new friend. | *The brush.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      brush(x, t, 820, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 560, 600, 'and THEN | she said—', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 820, 1110, 'BEST FRIENDS NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Car got cold. | *Tucked it in.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      car(x, 800, 900, 18 * k, SKYB)
      const b = ease.outCubic(prog(lt, 0.7, 1.2))
      if (b > 0) drawBits(x, ['LLLLLLLLLLLLLLLL', 'LPLLPLLPLLPLLPLL', 'LLLLLLLLLLLLLLLL', 'LLPLLPLLPLLPLLPL', 'LLLLLLLLLLLLLLLL'], { L: '#ffb0c8', P: '#ffffff' }, 800, 915 - (1 - b) * 120, 19, { alpha: b })
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
      L(x, 800, 1100, 'SLEEP TIGHT, CAR', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Washed the car | for *a new profile pic.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      car(x, 800, 920, 18 * k, GOLD, {})
      sparkles(x, t, 800, 900, P.t0 + 0.6, 8, 190, 0.2)
      sparkles(x, t, 800, 900, P.t0 + 1.4, 8, 210, 0.9)
      L(x, 800, 680, '✦ PROFILE PIC: NEW', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 30)
      L(x, 800, 1100, 'CAR IN FRAME: 2%', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Found one spot. | Rewashed *by hand.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      car(x, 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), '#c97bff')
      if (lt < 1.2) { x.fillStyle = INK; x.fillRect(868, 878, 16, 16); x.fillStyle = '#8a4a2e'; x.fillRect(871, 881, 10, 10) }
      sponge(x, 860 + Math.sin(t * 16) * 30 * clamp((lt - 0.6) * 3), 860, 10 * pop01(t, P.t0 + 0.6, 0.3, 2))
      if (lt > 0.3) swapLabel(x, 800, 1090, lt, 1.2, 'SPOTS: 1', 'SPOTS: 0', { size: 34 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a wash. | *Asked their match.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH', headCol: PINK, lines: [['basic or deluxe?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true], ['you pick!', MINT, pop01(t, P.t0 + 1.0, 0.25, 2.2)], ['no YOU pick', BONE, pop01(t, P.t0 + 1.5, 0.25, 2.2), true]], typing: lt > 1.8 ? 1 : 0, size: 22 })
    } },
  { sign: 'scorpio', cap: 'Checked the attendant’s | *chart first.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1070, 'VIBE: APPROVED', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Car wash? | It *rained once.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'CLOUD', 800, 660, 22 * k)
      if (k > 0.5) rain(x, t, 800, 710, { w: 240, h: 170 })
      car(x, 800, 930, 16 * k, '#ff9a4a')
      L(x, 800, 1110, 'CLEAN ENOUGH', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Liked the car wash. | *Bought it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 260, head: 'DEED', headBg: STEEL, headInk: INK, lines: ['1 car wash', 'owner:', ['CAPRICORN', '#3a5a9a']], size: 32 })
      L(x, 800, 1080, 'WASHES: FREE NOW', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 30)
      sparkles(x, t, 800, 1080, P.t0 + 1.4, 7, 150, 0.4)
    } },
  { sign: 'aquarius', cap: 'Invented a wash | *with no water.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 620, 'it’s mostly | vibes.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
      L(x, 800, 1090, 'PATENT PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'The bubbles were so pretty. | Pisces *sobbed.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', look: [1, -1], tears: lt => lt < 1.0 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      soap(x, t, 780, 1080, { n: 9, spread: 360, r: 34, h: 520, alpha: clamp(lt * 3), seed: 4 })
      L(x, 800, 1130, 'SO. BEAUTIFUL.', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0546', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs | *at the car wash.*',
  cameos: CAMEOS,
  group: { cap: 'Clean cars. | *Soaked attendant.*', draw(x, t, lt) { soap(x, t, 540, 1500, { n: 10, spread: 800, r: 30, h: 600, alpha: clamp(lt * 2), seed: 7 }) } },
  lesson: { text: 'Everyone shines | *in their own way.*', chip: 'SHINE: ON' },
  last: {
    text: 'And Pisces? | *Still in there.*',
    draw(x, t, lt) {
      soap(x, t, 540, 1260, { n: 8, spread: 600, r: 30, h: 600, alpha: clamp(lt * 2), seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
