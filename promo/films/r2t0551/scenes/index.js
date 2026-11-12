// r2t0551: star_talk ROLLCALL, "The signs | gone fishing." (signs3kit social cut, music: lofi · C). Ending: lesson.
//   ♈ cast once, jumped in after it · ♉ cooler full of snacks, zero bait · ♊ caught a tiny fish, told everyone a shark
//   · ♋ named the fish, let it go · ♌ 400 selfies with one fish · ♍ tackle box alphabetized · ♎ still choosing a lure
//   at sunset · ♏ knows the secret spot, won't say · ♐ wanted one fish, ended up across the lake · ♑ fishing is a
//   business plan now · ♒ built a robot rod · ♓ caught nothing, befriended every fish (tears).
//   group: "Fish caught: zero. | Great day."   lesson: the company is the catch.
import { makeFilm, sparkles, hearts, bubble, drawBits, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }
const FISH = ['....OO.....', '..OOOOOO..O', '.OKOOOOOOOO', 'OOOOOOOOOO.', '.OOOOOOOOOO', '..OOOOOO..O', '....OO.....']
const FISH_C = { O: '#ffb34a', K: INK }
const TINY = ['.OO.O', 'OKOOO', '.OO.O']
const ROD = ['..........K', '.........K.', '........K..', '.......K...', '......K....', '.....K.....', '....K......', '...K.......', '..RR.......', '.RR........', 'RR.........']
const ROD_C = { K: '#c98f2a', R: RED }
const BOAT = ['.....W......', '.....WW.....', '.....WWW....', '.....WWWW...', '.....K......', 'BBBBBBBBBBBB', '.BBBBBBBBBB.', '..BBBBBBBB..']
const BOAT_C = { W: BONE, K: INK, B: '#c98f2a' }
const fish = (x, cx, cy, cell, o) => drawBits(x, FISH, FISH_C, cx, cy, cell, o)
/** water band with little waves */
function water(x, t, cy, k, { w = 340, cx = 800 } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = '#2f6fb0'; x.fillRect(cx - w / 2, cy, w, 90)
  x.fillStyle = SKYB
  for (let i = 0; i < 8; i++) x.fillRect(cx - w / 2 + i * (w / 8) + Math.sin(t * 2 + i) * 6, cy - 6 + Math.sin(t * 3 + i * 1.7) * 4, w / 16, 8)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Cast once. | Jumped in *after it.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      water(x, t, 960, pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, ROD, ROD_C, 760, 820, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (lt > 1.2) { x.save(); x.fillStyle = BONE; for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.28, r = 60 + 120 * clamp((lt - 1.2) / 0.5); x.fillRect(840 + Math.cos(a) * r, 960 + Math.sin(a) * r * 0.8, 14, 14) } x.restore() }
      L(x, 800, 1120, 'SPLASH', pop01(t, P.t0 + 1.25, 0.3, 2.4), SKYB, 0.05, 40)
      bubble(x, 800, 650, 'I GOT IT!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Brought a cooler. | *Snacks only.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'BOX', 800, 870, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'SANDWICH', 760, 720, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.1 })
      bits(x, 'COOKIE', 880, 730, 12 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: 0.1 })
      L(x, 800, 1070, 'BAIT: FORGOT', pop01(t, P.t0 + 1.2, 0.3, 2.4), STEEL, -0.04, 32)
      L(x, 800, 1140, 'SNACKS: 40', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Caught a tiny fish. | Told everyone: *shark.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, TINY, FISH_C, 800, 860, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 960, 'ACTUAL SIZE', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, -0.04, 26)
      bubble(x, 800, 680, 'it was THIS big', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1110, 'STORY SIZE: XXL', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Caught one. *Named it.* | Let it go.', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const away = clamp((lt - 1.4) / 1.0)
      fish(x, 800 + away * 140, 840 + away * 120, 16 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: away * 0.4 })
      L(x, 800, 690, 'HI, GARY', pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, -0.05, 36)
      water(x, t, 1010, pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 600, 1170, 'write to me!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
      hearts(x, t, 820, 820, P.t0 + 1.0, { n: 4, life: 1.6, spread: 150, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'One small fish. | *400 selfies.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      fish(x, 800, 820, 14 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      if (lt > 0.7 && Math.floor(lt * 6) % 3 === 0) sparkles(x, t, 800, 820, t - 0.1, 6, 120, Math.floor(lt * 6), ['#ffffff', BONE, GOLD])
      const n = Math.min(400, Math.floor(clamp((lt - 0.6) / 1.6) * 400))
      L(x, 800, 1080, `PHOTO ${Math.max(1, n)}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.04, 36)
      bubble(x, 800, 650, 'my good side', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Tackle box: | *alphabetized.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 330, head: 'TACKLE BOX', headBg: MINT, headInk: INK, lines: ['A: anchor', 'B: bobber', 'C: cookies', 'D: do not touch'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1090, 'LABEL MAKER: HOT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Picking a lure. | *Still.* It’s sunset.', mood: lt => lt > 1.5 ? 'sleepy' : 'neutral', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      const opts = [['LURE: PINK?', PINK], ['LURE: BLUE?', SKYB], ['LURE: PINK?', PINK], ['LURE: BOTH?', LAV]]
      const i = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.55))
      if (lt > 0.3) L(x, 800, 820, opts[i][0], 1, opts[i][1], 0.04 * Math.sin(i * 2), 40)
      L(x, 800, 1060, 'TIME: 7:48 PM', pop01(t, P.t0 + 1.6, 0.3, 2.4), STEEL, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Knows the secret spot. | *Won’t say.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 830, 28 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 })
      L(x, 800, 830, 'REDACTED', pop01(t, P.t0 + 1.0, 0.3, 2.6), INK, -0.1, 40)
      bubble(x, 800, 1080, 'what spot?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Wanted one fish. | Ended up *across the lake.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      water(x, t, 930, pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BOAT, BOAT_C, 700 + clamp(lt / 3) * 200, 880 + Math.sin(t * 2) * 6, 16 * pop01(t, P.t0 + 0.3, 0.35, 2))
      const n = Math.floor(clamp((lt - 0.6) / 1.5) * 12)
      L(x, 800, 680, `MILE ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 36)
      L(x, 800, 1110, 'FISH: STILL ZERO', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'One fish caught. | Wrote a *business plan.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'FISH CO.', headBg: STEEL, headInk: INK, lines: ['Q1: one fish', 'Q2: two fish', 'Q3: franchise'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1080, 'CEO OF FISHING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Skipped the rod. | Built a *fish robot.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 830, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 6) * 0.04 })
      if (lt > 1.0) fish(x, 800, 650 - Math.sin(t * 4) * 10, 9, { rot: -0.2 })
      L(x, 800, 1080, 'PATENT PENDING', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 32)
      sparkles(x, t, 800, 830, P.t0 + 1.2, 7, 160, 0.6)
    } },
  { sign: 'pisces', cap: 'Caught nothing. | *Befriended* every fish.', mood: 'heart', look: [1, 0], tears: 2, star: ST, hops: [1.5],
    front(x, t, lt, P) {
      water(x, t, 990, pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) fish(x, 690 + i * 110, 930 + Math.sin(t * 3 + i) * 8, 7 * pop01(t, P.t0 + 0.5 + i * 0.25, 0.3, 2), { rot: 0.1 * Math.sin(t + i) })
      bubble(x, 800, 690, 'you’re all free!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      hearts(x, t, 800, 880, P.t0 + 1.4, { n: 5, life: 1.6, spread: 170, cell: 6, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2t0551', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs | *gone fishing.*',
  cameos: CAMEOS,
  group: { cap: 'Fish caught: zero. | *Great day.*', mood: 'happy' },
  lesson: { text: 'Some days you catch nothing. | The *company* is the catch.', chip: 'DAY: WELL SPENT' },
  last: {
    text: 'Same spot | *next weekend?*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, ROD, ROD_C, 540, 1500, 16 * pop01(t, t0 + 0.4, 0.35, 2))
      fish(x, 700, 1560 + Math.sin(t * 2) * 10, 10 * pop01(t, t0 + 0.7, 0.35, 2), { rot: 0.1 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
