// r2t0262: star_talk, ROLLCALL, "The signs as | hairdressers." (~59 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme stylist version of itself.
//   0.0–3.6    "The signs as | *hairdressers.*"
//   3.6–49.2   ♈ cut it before you sat down · ♉ a forty-five minute scalp massage · ♊ asked your sign, forgot to cut
//              · ♋ asks about your grandma by name · ♌ gave you their mane · ♍ measured with a ruler · ♎ fifty mirror angles
//              · ♏ breakup bangs · ♐ half a cut, then Peru · ♑ booked for ten years · ♒ a birth-chart cut · ♓ cried at your glow-up
//  49.2        "Twelve stylists. | *One wild salon.*"
//  52.4        LESSON UNLOCKED: "A good stylist listens. | *So does a friend.*"  STATUS: FRESH CUT
//  58.3        "Virgo is | *still measuring.*"  Virgo pops back with the ruler.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, clock, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ff9a6a'
const ST = { x: -170 }
const SCISSORS = ['RR.....RR', 'R.R...R.R', 'RR.....RR', '..S...S..', '...S.S...', '....S....', '...S.S...', '..S...S..', '.S.....S.', 'S.......S']
const SC_C = { R: '#ff6b5a', S: '#d8dbe8' }
const RULER = ['YYYYYYYYYYYYYYYYYYYY', 'YKYKYKKYKYKYKKYKYKYY', 'YKYYYKYYYKYYYKYYYKYY', 'YYYYYYYYYYYYYYYYYYYY']
const MIRROR = ['..KKKKK..', '.KSSSSSK.', 'KSSWSSSSK', 'KSWSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', '.KSSSSSK.', '..KKKKK..', '....B....', '....B....', '....B....', '....B....']
const MIRROR_C = { K: INK, S: '#bfe6ff', W: '#ffffff', B: '#c98f6a' }
const RULER_C = { Y: '#ffd86b', K: INK }

/** hair snips flying off */
function snips(x, t, cx, cy, t0, n = 10) {
  const lt = t - t0
  if (lt < 0) return
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.9 + i * 0.11) % 1
    x.save(); x.translate(cx + Math.cos(i * 2.4) * 180 * ph, cy + Math.sin(i * 2.4) * 120 * ph + 160 * ph * ph); x.rotate(i + t * 4); x.globalAlpha = 1 - ph
    x.fillStyle = ['#8a4a2e', '#ffd86b', '#2a1640'][i % 3]; x.fillRect(-14, -3, 28, 6); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Cut your hair | *before you sat down.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SCISSORS, SC_C, 760, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 18) * 0.2 })
      snips(x, t, 760, 880, P.t0 + 0.4, 12)
      label(x, 790, 1100, 'DONE. NEXT!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Scalp massage. | *Forty-five minutes.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      clock(x, 790, 830, 120, pop01(t, P.t0 + 0.2, 0.35, 2), 3, Math.floor(clamp(lt / 2.2) * 45))
      label(x, 790, 1060, 'STILL GOING', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked your sign. | *Forgot to cut.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'wait, Leo rising?!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 860, 'tell me EVERYTHING', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, col: GOLD, tail: 'bl' })
      label(x, 790, 1080, 'HAIRCUT: 0% DONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Asks about your grandma. | *By name.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'how’s Nana Rose?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      bubble(x, 800, 900, 'and her knee?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      label(x, 790, 1090, 'COOKIES ON THE COUNTER', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 26, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'You asked for a trim. | Got *their hair.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), m = ease.outBack(prog(lt, 0.9, 1.3))
      if (k > 0.01) {
        if (m > 0.01) { x.save(); x.translate(800, 950); x.scale(m, m); for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; x.fillStyle = i % 2 ? '#ffb34a' : '#e8892a'; x.beginPath(); x.arc(Math.cos(a) * 95, Math.sin(a) * 95, 44, 0, Math.PI * 2); x.fill() } x.restore() }
        signChar(x, t, 'virgo', 800, 960, 190 * k, { mood: m > 0.5 ? 'wide' : 'neutral', look: [-1, 0], seed: 31, glyph: false })
      }
      label(x, 800, 680, 'THE LEO SPECIAL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Measured every strand. | *With a ruler.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, RULER, RULER_C, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.1 + 0.03 * Math.sin(t * 3) })
      label(x, 790, 700, '2.00 CM. EXACTLY.', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1060, 'one more check', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Showed you the back | *from fifty angles.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MIRROR, MIRROR_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.3 * Math.sin(t * 2.4) })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.8) * 49)
      label(x, 790, 620, `ANGLE ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 770, 1100, 'and this one?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Gave you bangs. | *Already knows why.*', mood: lt => lt > 1.0 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'say no more.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      drawBits(x, SCISSORS, SC_C, 790, 900, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.4 })
      label(x, 790, 1090, 'BREAKUP BANGS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Half a haircut. | *Then flew to Peru.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 190, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: CREAM, rot: 0.06 }, () => {
        x.fillStyle = LAV; x.fillRect(-165, -95, 330, 56)
        txt(x, 'BOARDING PASS', 0, -66, { size: 26, font: MONO, weight: 700 })
        txt(x, '→ PERU', 0, 0, { size: 52 })
        txt(x, 'NOW', 0, 54, { size: 28, font: MONO, weight: 700, color: RED })
      })
      label(x, 790, 1090, 'BACK… EVENTUALLY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Booked your next cut. | *For ten years.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = GREY; x.fillRect(-160, -170, 320, 60)
        txt(x, 'APPOINTMENTS', 0, -140, { size: 28, font: MONO, weight: 700 })
        const n = Math.floor(clamp((lt - 0.4) / 1.4) * 10)
        for (let i = 0; i < 10; i++) { const c = i % 5, r = Math.floor(i / 5); x.fillStyle = i < n ? GREEN : '#d8d0c0'; x.fillRect(-140 + c * 58, -80 + r * 90, 44, 70); if (i < n) txt(x, '✓', -118 + c * 58, -44 + r * 90, { size: 32, color: CREAM }) }
        txt(x, 'THRU 2036', 0, 130, { size: 30, font: MONO, weight: 700, color: '#6b62a8' })
      })
    } },
  { sign: 'aquarius', cap: 'Cut your hair | *into your birth chart.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 860, 150, pop01(t, P.t0 + 0.3, 0.4, 2), t, 0.3)
      label(x, 790, 1090, 'IT’S ART NOW', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | *your glow-up.*', mood: lt => lt > 0.8 ? 'wide' : 'heart', tears: lt => lt > 0.8 ? 3 : 1, star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you look SO pretty', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
      label(x, 790, 1060, 'TISSUES: ALL OF THEM', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 880, P.t0 + 1.0, 7, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2t0262', key: 'E', accent: ACC, ending: 'lesson',
  title: 'The signs as | *hairdressers.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve stylists. | *One wild salon.*' },
  lesson: { text: 'A good stylist listens. | *So does a friend.*', chip: 'STATUS: FRESH CUT' },
  last: {
    text: 'Virgo is | *still measuring.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 400, 730, 170 * k, { mood: 'squint', look: [1, 0], seed: 54 })
      drawBits(x, RULER, RULER_C, 660, 740, 11 * pop01(t, t - lt + 0.8, 0.35, 2), { rot: -0.1 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
