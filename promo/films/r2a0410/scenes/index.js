// r2a0410: star_advice, ADVICE ROLLCALL, "Each sign’s dream | good-morning *text.*" (~62 s vertical, signs3kit social
// cut, music: lofi · G). One warm, specific dream text per sign with a light gag. Ending: lesson.
//   ♈ race you to breakfast · ♉ breakfast is on its way · ♊ a voice note and a meme · ♋ did you sleep okay
//   · ♌ the sun called, you're brighter · ♍ today's plans, handled · ♎ good morning, gorgeous · ♏ thinking about you
//   · ♐ adventure at noon? · ♑ proud of you · ♒ morning, you weirdo · ♓ you're my favourite human
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, sun, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = '#ffd27a'
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const PANCAKE = ['....YY....', '...YYYY...', 'BBBBBBBBBB', 'bbbbbbbbbb', 'BBBBBBBBBB', 'bbbbbbbbbb', 'BBBBBBBBBB', 'bbbbbbbbbb']
const SHOE = ['....KKKK....', '...KRRRRK...', '..KRRWRRRK..', 'KKRRRRRRRRKK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const MEDAL = ['RR...RR', '.RR.RR.', '..RRR..', '.YYYYY.', 'YYYKYYY', 'YYKKKYY', 'YYYKYYY', '.YYYYY.']
const BALLOON = ['..RRRRR..', '.RRYYYRR.', 'RRYYYYYRR', 'RRYYYYYRR', 'RRYYYYYRR', '.RRYYYRR.', '..RRRRR..', '...K.K...', '...K.K...', '...BBB...', '...BBB...']
const BLANKET = ['PPPPPPPPPPPP', 'PWPPWPPWPPWP', 'PPPPPPPPPPPP', 'PPWPPWPPWPPW', 'PPPPPPPPPPPP']
const ALIEN = ['..GGGGG..', '.GGGGGGG.', 'GGKKGKKGG', 'GGKKGKKGG', '.GGGGGGG.', '..GGGGG..', '...G.G...']

const CAMEOS = [
  { sign: 'aries', cap: '“Race you | *to breakfast?*”', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'race you to | breakfast?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      drawBits(x, SHOE, { K: INK, R: RED, W: BONE }, 790, 960 - Math.abs(Math.sin(t * 8)) * 20, 24 * pop01(t, P.t0 + 0.6, 0.35, 2))
      lab(x, 790, 1120, 'GO GO GO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: RED, color: BONE, rot: -0.04 })
    } },
  { sign: 'taurus', cap: '“Breakfast is | *on its way.*”', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PANCAKE, { Y: SUN, B: '#e6b26a', b: '#c98f2a' }, 790, 960, 30 * pop01(t, P.t0 + 0.4, 0.35, 2))
      bubble(x, 790, 690, 'breakfast is | on its way', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl', col: MINT })
      lab(x, 790, 1150, 'PANCAKES: 10 TALL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: SUN, rot: -0.04, size: 30 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 7, 160, 0.4)
    } },
  { sign: 'gemini', cap: 'A voice note | *and a meme.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 760, 320, 120, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: SUN, rot: -0.03 }, () => {
        x.fillStyle = INK; x.beginPath(); x.moveTo(-130, -24); x.lineTo(-100, 0); x.lineTo(-130, 24); x.fill()
        for (let i = 0; i < 14; i++) { const h = 10 + Math.abs(Math.sin(t * 6 + i * 1.3)) * 40; x.fillRect(-80 + i * 14, -h / 2, 8, h) }
      })
      card(x, 790, 980, 240, 200, pop01(t, P.t0 + 0.8, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        signChar(x, t, 'taurus', 0, 0, 110, { mood: 'sleepy', seed: 31, glyph: false })
        txt(x, 'me at 7 am', 0, 76, { size: 24, font: MONO, weight: 700 })
      })
    } },
  { sign: 'cancer', cap: '“Did you | *sleep okay?*”', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'did you sleep | okay?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl', col: SKYB })
      drawBits(x, BLANKET, { P: PINK, W: BONE }, 790, 950, 24 * pop01(t, P.t0 + 0.7, 0.35, 2), { rot: -0.05 })
      hearts(x, t, 560, 1080, P.t0 + 1.2, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: '“The sun called. | *You’re brighter.*”', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      sun(x, t, 820, 720, 70, pop01(t, P.t0 + 0.2, 0.35, 2), { face: true })
      bubble(x, 790, 1000, 'the sun called. | you’re brighter.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: '“Today’s plans? | *I handled them.*”', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'TODAY', 0, -130, { size: 30, font: MONO, weight: 700, color: GREEN })
        ;['groceries', 'laundry', 'dinner booked'].forEach((s, i) => { txt(x, s, -20, -60 + i * 64, { size: 32 }); if (lt > 0.6 + i * 0.3) txt(x, '✓', 120, -60 + i * 64, { size: 44, color: GREEN }) })
      })
      lab(x, 790, 1110, 'YOU: JUST REST', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: '“Good morning, | *gorgeous.*”', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 240, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: SKYB, rot: -0.03, border: 12 }, () => {
        x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-80, -120, 30, 120)
        signChar(x, t, 'libra', 0, 20, 140, { mood: 'wink', seed: 32, glyph: false, glow: 0.4 })
      })
      bubble(x, 790, 640, 'morning, gorgeous', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl', col: PINK })
      sparkles(x, t, 800, 860, P.t0 + 1.1, 8, 180, 0.3)
    } },
  { sign: 'scorpio', cap: '“Thinking about you.” | *That’s it.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'YOUR MATCH', headCol: LAV, lines: [
        ['thinking', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)],
        ['about you.', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
      ], size: 32 })
      lab(x, 790, 1110, 'READ IT 40 TIMES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: GOLD, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: '“Adventure | *at noon?*”', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, BALLOON, { R: RED, Y: SUN, K: INK, B: BROWN }, 800, 820 - Math.sin(t * 2) * 20, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 1110, 'adventure at noon?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: '“I’m proud of you.” | *No reason.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'i’m proud of you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      drawBits(x, MEDAL, { R: RED, Y: GOLD, K: '#c98f2a' }, 790, 940, 22 * pop01(t, P.t0 + 0.8, 0.35, 2))
      sparkles(x, t, 790, 940, P.t0 + 1.0, 8, 150, 0.5)
      lab(x, 790, 1140, 'CAREER HIGHLIGHT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: GREEN, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: '“Morning, | *you weirdo.*”', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'morning, you weirdo', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl', col: SKYB })
      drawBits(x, ALIEN, { G: MINT, K: INK }, 790, 930, 22 * pop01(t, P.t0 + 0.8, 0.35, 2))
      lab(x, 790, 1120, 'TONE: AFFECTIONATE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: LAV, rot: -0.04, size: 30 })
    } },
  { sign: 'pisces', cap: '“You’re my | *favourite human.*”', mood: 'heart', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'you’re my | favourite human', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
      lab(x, 790, 1060, 'HAPPY TEARS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: SKYB, rot: -0.04, size: 38 })
      hearts(x, t, 790, 980, P.t0 + 1.0, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0410', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Each sign’s dream | good-morning *text.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve phones. | *All smiling.*' },
  lesson: { text: 'Send the text. | It *makes their day.*', chip: 'MORNING: MADE' },
  last: { text: 'Good morning. | *Yes, you.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
