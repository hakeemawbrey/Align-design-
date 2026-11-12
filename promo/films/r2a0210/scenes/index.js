// r2a0210: star_advice, ADVICE ROLLCALL, "What each sign | is ready for." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm, hopeful line each about the next small step.
//   0.0–3.6    "What each sign | *is ready for.*"
//   3.6–49.2   ♈ finishing what they started · ♉ trying one new dish · ♊ picking one thing and staying · ♋ being the one
//              looked after · ♌ resting out of the spotlight · ♍ colouring outside the lines · ♎ saying what they want
//              · ♏ forgiving, even themselves · ♐ coming home for a while · ♑ a day with no to-do list · ♒ being
//              understood · ♓ a love that loves them back
//  49.2        "Twelve signs. | *Ready for more.*"
//  52.6        callback: "Leo’s spotlight? | *Back tomorrow.*"  the spotlight flickers back on over a rested Leo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, beam, bar, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = GOLD
const ST = { x: -170 }

const PLATE = ['..WWWWWWWWW..', '.WWWGGGRRRWW.', 'WWWGGGRRRRWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const PLATE_C = { W: '#fff4e2', G: '#5fd068', R: '#ffb34a' }
const BLANKET = ['PPPPPPPPPPPP', 'PWPPWPPWPPWP', 'PPPPPPPPPPPP', 'PPWPPWPPWPPW', 'PPPPPPPPPPPP']
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'YYYYYYYY', 'YYYKKYYY', 'YYYKKYYY', 'YYYYYYYY']
const HOUSE = ['...KK...', '..KRRK..', '.KRRRRK.', 'KRRRRRRK', '.WWWWWW.', '.WWKKWW.', '.WWKKWW.']
const HOUSE_C = { K: INK, R: '#e23d4e', W: '#fff4e2' }
const CASE = ['..KKKK..', '..K..K..', 'PPPPPPPP', 'PPPPPPPP', 'PGGGGGGP', 'PPPPPPPP', 'PPPPPPPP']

const CAMEOS = [
  { sign: 'aries', cap: 'Ready to finish | *what they started.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = 0.6 + 0.4 * ease.inOutCubic(prog(lt, 0.4, 1.4))
      bar(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), p, `${Math.round(p * 100)}%`, { col: '#ff6b5a', w: 340 })
      label(x, 790, 1080, 'PROJECT: DONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.5, 7, 180, 0.4)
    } },
  { sign: 'taurus', cap: 'Ready to try | *one new dish.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, lt > 1.2 ? 'NEW FAVOURITE' : 'NEW DISH?', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 38, bg: lt > 1.2 ? '#5fd068' : BONE, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) hearts(x, t, 790, 860, P.t0 + 1.3 * 1.29, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Ready to pick | *one thing and stay.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        ;['guitar', 'pottery', 'french', 'painting'].forEach((s, i) => {
          txt(x, s, 0, -110 + i * 66, { size: 34, color: i === 1 || lt < 0.6 + i * 0.2 ? INK : '#b9b0a0' })
          if (i !== 1 && lt > 0.6 + i * 0.2) { x.fillStyle = '#d0453a'; x.fillRect(-80, -112 + i * 66, 160, 5) }
          if (i === 1 && lt > 1.3) { x.strokeStyle = '#2fa36b'; x.lineWidth = 6; x.strokeRect(-100, -110 + i * 66 - 28, 200, 56) }
        })
      })
      label(x, 790, 1110, 'STAYING: POTTERY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: '#ffd23a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Ready to be | *the one looked after.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 990, 190 * k, { mood: 'heart', look: [-1, 0], seed: 15, glyph: false, hops: [P.t0 + 0.8] })
      const d = ease.outCubic(prog(lt, 0.7, 1.2))
      if (lt > 0.65) drawBits(x, BLANKET, { P: SKYB, W: '#fff4e2' }, F.x, lerp(600, F.cy + 70, d), 20)
      label(x, 790, 700, 'YOUR TURN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Ready to rest | *out of the spotlight.*', mood: lt => lt > 1.0 ? 'sleepy' : 'sparkle', star: { x: 0 },
    back(x, t, lt, P) { beam(x, 540, 470, 540, 1040, 200, pop01(t, P.t0 + 0.15, 0.4, 1.6) * (1 - ease.inOutCubic(prog(lt, 0.7, 1.0)))) },
    front(x, t, lt, P) {
      label(x, 540, 1150, 'SPOTLIGHT: OFF (FOR NOW)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Ready to colour | *outside the lines.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 320, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 50 : 110; i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r) : x.moveTo(Math.cos(a) * r, Math.sin(a) * r) } x.stroke()
        const p = clamp((lt - 0.5) / 1.0)
        x.fillStyle = 'rgba(125,255,176,0.8)'; for (let i = 0; i < 18 * p; i++) x.fillRect(-120 + (i * 53) % 230, -110 + (i * 37) % 220, 40, 30)
      })
      label(x, 790, 1110, 'NEATNESS: 40%', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Ready to say | *what they really want.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'i want pizza.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 960, 'DECIDED IN: 1 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 0.7, 7, 200, 0.3)
    } },
  { sign: 'scorpio', cap: 'Ready to forgive. | *Even themselves.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const open = ease.outBack(prog(lt, 0.8, 1.2))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.translate(790, 900); x.scale(k, k); x.translate(-790, -900)
      drawBits(x, LOCK.slice(0, 3), { K: '#9aa5c4' }, 790 + open * 30, 830 - open * 30, 22, { rot: open * 0.5 })
      drawBits(x, LOCK.slice(3), { Y: GOLD, K: INK }, 790, 930, 22)
      x.restore()
      if (lt > 1.2) hearts(x, t, 790, 860, P.t0 + 1.2 * 1.29, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 7 })
      label(x, 790, 1110, 'GRUDGES: RELEASED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Ready to come home | *for a while.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, CASE, { K: INK, P: '#a35cf0', G: GOLD }, 640, 1060, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 820, 1100, 'UNPACKED: FINALLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ready for a day | *with no to-do list.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'TO DO:', 0, -130, { size: 32, font: MONO, weight: 700 })
        if (lt > 0.8) txt(x, '(nothing)', 0, 0, { size: 38, color: '#2fa36b' })
      })
      label(x, 790, 1100, 'SUNDAY: FREE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ready to be | *understood.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 1000, 190 * k, { mood: lt > 1.2 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.4] })
      bubble(x, 420, 620, 'so it’s like…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 740, 'oh! i get it!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Ready for a love | *that loves them back.*', mood: lt => lt < 1.0 ? 'happy' : 'heart', tears: lt => lt < 1.0 ? 1 : 2, star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 990, 200 * k, { mood: 'heart', look: [-1, 0], seed: 25, glyph: false, hops: [P.t0 + 1.0] })
      label(x, 790, 700, 'MATCH: MUTUAL', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.1) hearts(x, t, 600, 900, P.t0 + 1.1 * 1.29, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0210', key: 'G', accent: ACC, ending: 'callback',
  title: 'What each sign | *is ready for.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Ready for more.*' },
  last: {
    text: 'Leo’s spotlight? | *Back tomorrow.*',
    draw(x, t, lt) {
      const on = lt > 1.2 ? 1 : (lt > 0.8 && Math.floor(lt * 14) % 2 ? 0.6 : 0)
      beam(x, 540, 700, 540, 1280, 220, on)
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 540, 1150, 280 * k, { mood: lt > 1.2 ? 'sparkle' : 'sleepy', seed: 52, hops: [t - lt + 1.3] })
      label(x, 540, 1440, 'RESTED: 100%', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
