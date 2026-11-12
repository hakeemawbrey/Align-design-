// r2a0544: star_advice, ADVICE-ROLLCALL, "What each sign | cherishes most." (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order: one warm, specific line each with a light visual gag. Ending: callback (Pisces gets the hug).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, steam, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Someone who | *keeps up with them.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      friend(x, t, 'leo', 800 + 20 * Math.sin(t * 8), 900, 170, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'sparkle', look: [-1, 0], hops: [P.t0 + 0.8, P.t0 + 1.3, P.t0 + 1.8] })
      bubble(x, 790, 660, 'race you!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 1100, 'FINALLY: A MATCH', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Slow mornings | *with their person.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'MUG', 730, 930, 18 * k); bits(x, 'MUG', 860, 930, 18 * k)
      if (k > 0.9) { steam(x, t, 730, 860); steam(x, t, 860, 860) }
      L(x, 790, 680, 'ALARM: OFF', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'A friend who | *always texts back.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: GOLD, typing: prog(lt, 0.4, 0.6) * (1 - prog(lt, 1.0, 1.1)), lines: [['did you see—', BONE, pop01(t, P.t0 + 0.3, 0.25, 2.2), true], ['YES. tell me', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)]] })
    } },
  { sign: 'cancer', cap: 'Old photos | of *everyone together.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PHOTO', 740, 800, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      bits(x, 'PHOTO', 860, 940, 18 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.1 })
      hearts(x, t, 800, 860, P.t0 + 1.1, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 2 })
      L(x, 790, 1120, 'ALBUM #27', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Being *truly seen.* | Not just watched.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.6))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(330, 480); x.lineTo(410, 480); x.lineTo(570, 1180); x.lineTo(170, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you look | happy today.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1000, 'NOTICED ♥︎', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: 'virgo', cap: 'A thank-you | *for the little things.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LETTER', 790, 820, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1040, 'THANK YOU FOR',  pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 30)
      L(x, 790, 1110, 'EVEN THE SPREADSHEET', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'libra', cap: 'A calm home | *that looks lovely.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 790, 850, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'FLOWER', 640, 1050, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
      bits(x, 'FLOWER', 940, 1050, 14 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 640, 'VIBE: PEACEFUL', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'One person | they *trust completely.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'KEY', 790, 840, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.2 })
      L(x, 790, 1060, 'SPARE KEY: GIVEN', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 32)
      sparkles(x, t, 790, 840, P.t0 + 1.2, 6, 150, 0.4)
    } },
  { sign: 'sagittarius', cap: 'A ticket | *somewhere new.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TICKET', 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
      L(x, 790, 680, 'DESTINATION: SURPRISE', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 28)
      sparkles(x, t, 790, 880, P.t0 + 1.0, 7, 170, 0.2)
    } },
  { sign: 'capricorn', cap: 'Proof their hard work | *mattered.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 790, 840, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1080, 'WE SAW IT ALL', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Friends who love | *their weird ideas.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GADGET', 790, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'genius. do it.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: MINT, tail: 'bc' })
      L(x, 790, 1100, 'IDEA #312: LOVED', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'A good cry | *and a hug after.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', tears: lt => lt < 1.2 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 790, 1010, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'HUG: INCOMING', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0544', key: 'E', accent: ACC, ending: 'callback',
  title: 'What each sign | *cherishes most.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve hearts. | *All worth knowing.*' },
  last: {
    text: 'And Pisces? | *Got the hug.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const j = ease.inOutCubic(prog(lt, 0.4, 1.1))
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) {
        signChar(x, t, 'pisces', lerp(330, 450, j), 1080, 240 * k, { mood: lt > 1.1 ? 'heart' : 'wide', tears: lt > 1.1 ? 2 : 3, look: [1, 0], seed: 9 })
        signChar(x, t, 'cancer', lerp(750, 630, j), 1080, 240 * k, { mood: 'heart', look: [-1, 0], seed: 10, glyph: false })
      }
      hearts(x, t, 540, 960, t0 + 1.1, { n: 8, life: 2.0, spread: 300, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
