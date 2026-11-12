// r2a0545: star_advice, ADVICE-ROLLCALL, "Post-fight texts | for each sign." (topic: "What to text | each sign after a fight.",
// reworded so the hook fits on two lines). Twelve signs: one warm, specific line + a light gag. Ending: callback (the pizza).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }
/** one sent text (right) and an optional reply (left) on a phone */
const chat = (x, t, P, head, col, sent, reply, at = 1.4) => {
  L(x, 790, 600, `TO: ${head}`, pop01(t, P.t0 + 0.2, 0.3, 2), col, -0.04, 28)
  bubble(x, 790, 760, sent, pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, col: MINT, tail: 'br' })
  if (reply) bubble(x, 790, 960, reply, pop01(t, P.t0 + at, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Keep it short. | *They’re already over it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) { chat(x, t, P, 'ARIES', '#ff6b5a', 'we good?', 'obviously. race?') } },
  { sign: 'taurus', cap: 'Lead with *food.* | Words can wait.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'pizza’s on me.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: MINT, tail: 'br' })
      bits(x, 'PIZZA', 790, 900, 22 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 790, 1110, 'FORGIVENESS: LOADING', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'Send a meme. | *Then talk it out.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PHOTO', 790, 800, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 })
      L(x, 790, 980, 'THIS IS US', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, -0.04, 32)
      bubble(x, 790, 1120, 'HA. ok, let’s talk', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Say *“I still love you”* | first.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chat(x, t, P, 'CANCER', SKYB, 'I still love you', 'me too. always.')
      hearts(x, t, 790, 1120, P.t0 + 1.6, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Admit they *had a point.* | Out loud.', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you were right.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: MINT, tail: 'br' })
      bubble(x, 790, 900, 'say it again?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      sparkles(x, t, 790, 900, P.t0 + 1.3, 6, 160, 0.4)
    } },
  { sign: 'virgo', cap: 'Be specific. | *They’ll respect it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'WHAT I MEANT', headBg: MINT, headInk: INK, lines: ['1. I was tired', '2. not about you', '3. I’m sorry'], size: 26, align: 'left', progress: prog(lt, 0.4, 1.3) })
      L(x, 790, 1090, 'CLEAR. APPRECIATED.', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Make peace first. | *Details later.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { chat(x, t, P, 'LIBRA', PINK, 'truce?', 'truce. hug?') } },
  { sign: 'scorpio', cap: 'Total honesty. | *Nothing held back.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LETTER', 790, 820, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1040, 'THE WHOLE TRUTH', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, -0.04, 32)
      L(x, 790, 1110, 'TRUST: RESTORED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Make them laugh. | *Then apologise.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: ST, hops: [1.2, 1.8],
    front(x, t, lt, P) { chat(x, t, P, 'SAGITTARIUS', '#b7a6ff', 'sorry I was | a goblin', 'LOL. forgiven.') } },
  { sign: 'capricorn', cap: 'Bring a plan | *to fix it.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'THE PLAN', headBg: '#2fc79a', headInk: INK, lines: ['step 1: sorry', 'step 2: hug', 'step 3: dinner'], size: 26, align: 'left', progress: prog(lt, 0.4, 1.3) })
      L(x, 790, 1090, 'PLAN: APPROVED', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Give them space. | *Then something weird.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { chat(x, t, P, 'AQUARIUS', '#6fc3ff', 'take your time', 'ok. | (sends a UFO)', 1.6) } },
  { sign: 'pisces', cap: 'Gentle words. | *Tissues optional.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', tears: lt => lt < 1.2 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'I’m sorry I | hurt you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      bits(x, 'TISSUE', 790, 960, 16 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 790, 1120, 'ALREADY CRYING', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0545', key: 'G', accent: ACC, ending: 'callback',
  title: 'Post-fight texts | for *each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Different words. | *Same sorry.*' },
  last: {
    text: 'Taurus forgave you. | *The pizza helped.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 400, 1080, 250 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [1, 0], seed: 9, hops: [t0 + 1.2] })
      bits(x, 'PIZZA', 740, 1060, 20 * pop01(t, t0 + 0.6, 0.3, 2))
      L(x, 740, 1240, 'FRIENDS AGAIN', pop01(t, t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
      hearts(x, t, 560, 980, t0 + 1.3, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
