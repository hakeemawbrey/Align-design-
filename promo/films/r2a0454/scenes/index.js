// r2a0454: star_advice, ADVICE ROLLCALL, "Each sign's | ideal hangout." (~59 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: the warm, specific hangout each sign would love, each with a light gag. Ending: lesson.
//   ♈ a race (tie: both win) · ♉ a slow brunch (no clocks) · ♊ a bookshop crawl · ♋ movie night at home (popcorn)
//   · ♌ a dance class (front row) · ♍ a tidy picnic (napkins folded) · ♎ an art gallery · ♏ a late-night diner (deep talks)
//   · ♐ a road trip to wherever · ♑ a sunrise hike (they pack the snacks) · ♒ stargazing (weird facts welcome)
//   · ♓ a beach day (happy tears allowed)
//  lesson "The best hangout? | *Anywhere with you.*"  PLANS: MADE   last "Twelve plans. | *One very full calendar.*"
import { clamp, prog } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, frame, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -190 }, PEACH = '#ffb38a'
const FLAG = ['KWKWKW', 'WKWKWK', 'KWKWKW', 'WKWKWK', 'P.....', 'P.....', 'P.....', 'P.....']
const POPCORN = ['.W.WW.W.', 'WWWWWWWW', '.WWWWWW.', 'RWRWRWRW', 'RWRWRWRW', '.RWRWRW.', '.RWRWRW.']
const CHECK = ['RWRWRWRWRW', 'WRWRWRWRWR', 'RWRWRWRWRW', 'WRWRWRWRWR']
const MOUNT = ['.....W.....', '....WWW....', '...GGGGG...', '..GGGGGGG..', '.GGGGGGGGG.', 'GGGGGGGGGGG']
const SCOPE = ['.......TT', '.....TTTT', '...TTTT..', '.TTTT....', 'TT.L.....', '...L.....', '..L.L....', '.L...L...']

const CAMEOS = [
  { sign: 'aries', cap: 'Anything with a race. | *You’ll both win.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, W: BONE, P: '#c9c9d8' }, 820, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(lt * 5) })
      label(x, 800, 1100, 'TIE! BOTH WIN', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A long, slow brunch. | *No clocks allowed.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'clock', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 880); x.scale(k, k); x.fillStyle = RED; x.rotate(0.78); x.fillRect(-120, -12, 240, 24); x.rotate(-1.56); x.fillRect(-120, -12, 240, 24); x.restore() }
      label(x, 800, 1110, 'TIME: WHO CARES', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A bookshop crawl. | *Five stops, one chat.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'book', 800 + (i % 2) * 20, 1040 - i * 70, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2), { rot: (i % 2 ? 1 : -1) * 0.05 })
      bubble(x, 800, 680, 'ooh, this one!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Movie night at home. | *Blankets provided.*', mood: 'heart', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, POPCORN, { W: PAPER, R: RED }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1100, 'COZY LEVEL: MAX', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.2, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'A dance class. | *Front row, obviously.*', mood: 'wink', look: [1, 0], star: L, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      notes(x, t, 800, 900, { n: 5, cell: 8, col: GOLD, seed: 2, alpha: clamp((lt - 0.2) * 3) })
      label(x, 800, 1090, 'FRONT ROW ✦', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: ORANGE, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'A tidy picnic. | *Napkins: folded.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, CHECK, { R: '#ff6f7f', W: PAPER }, 800, 1000, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 0.6 })
      bits(x, 'cookie', 760, 940, 12 * pop01(t, P.t0 + 0.6, 0.3, 2)); bits(x, 'cookie', 850, 940, 12 * pop01(t, P.t0 + 0.75, 0.3, 2))
      label(x, 800, 720, 'PERFECTLY ALIGNED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'An art gallery. | *Pretty things, slow talks.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      frame(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 220, 180, x => {
        x.fillStyle = '#ffd6e6'; x.fillRect(-110, -90, 220, 180); x.fillStyle = PINK; x.beginPath(); x.arc(-30, -10, 40, 0, 7); x.fill(); x.fillStyle = SKYB; x.fillRect(10, 10, 80, 60)
      })
      label(x, 800, 1090, '“it’s so us.”', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'A late-night diner. | *Deep talks only.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'mug', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'so… tell me | everything.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 800, 1110, 'OPEN TILL 3', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: '#c2375a', color: PAPER, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'A road trip. | *Destination: wherever.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'suitcase', 800 + 40 * Math.sin(lt * 3), 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 710, 'WHERE TO? YES.', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A sunrise hike. | *They’ll pack snacks.*', mood: 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, MOUNT, { W: PAPER, G: '#58a06a' }, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'sun', 800, 1010 - 230 * prog(lt, 0.4, 1.4), 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 800, 1120, 'SNACKS: PACKED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Stargazing at night. | *Weird facts welcome.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, -1], star: L,
    front(x, t, lt, P) {
      drawBits(x, SCOPE, { T: '#c9c9d8', L: WOOD }, 820, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'fun fact:', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 900, 760, P.t0 + 1.2, 6, 90, 0.5, ['#ffffff', SKYB])
    } },
  { sign: 'pisces', cap: 'A beach day. | *Happy tears allowed.*', mood: 'heart', tears: 2, look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'shell', 800, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.globalAlpha = clamp(lt * 2); x.strokeStyle = SKYB; x.lineWidth = 8; for (let r = 0; r < 2; r++) { x.beginPath(); for (let i = 0; i <= 20; i++) { const px = 650 + i * 16, py = 820 + r * 40 + 10 * Math.sin(i * 0.8 + t * 3); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() } x.restore()
      label(x, 800, 1110, 'WAVES + FEELINGS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0454', key: 'E', accent: PEACH, ending: 'lesson',
  title: 'Each sign’s | *ideal hangout.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Twelve good times.*' },
  lesson: { text: 'The best hangout? | *Anywhere with you.*', chip: 'PLANS: MADE' },
  last: { text: 'Twelve plans. | *One full calendar.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
