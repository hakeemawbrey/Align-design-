// v3a131: ADVICE ROLL CALL, "How each sign | shows they care." (~59 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs, one warm line each: the way they love, played big. Ending: lesson.
//   ♈ "who was mean to you?" ETA: now · ♉ feeds you, then again · ♊ "saw this, thought of you" ×12 · ♋ knows your faves
//   ♌ hypes you up in public · ♍ "home safe?" every time · ♎ saves you the best seat · ♏ remembers March (the plant)
//   ♐ a souvenir from everywhere · ♑ there at 7 a.m. on moving day · ♒ a weird little gift (a rock. it's you.)
//   ♓ cries with you, then for you
//   49.2  "Everyone *showed up.*"   52.4 LESSON "Notice how they love. | Then *say thanks.*"   58.3 "Taurus is still | *feeding you.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, PAPER } from '../props.js'

const L = { x: -160 }
const ROCK = [['..GGGG..', '.GGGGGG.', 'GGWGGWGG', 'GGGGGGGG', 'GGPGGPGG', '.GGPPGG.', '..GGGG..'], { G: '#9aa7c7', W: INK, P: PINK }]
const CAMEOS = [
  { sign: 'aries', cap: 'Who hurt you? | *Aries is on the way.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: L, hops: [0.9, 1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'who was | mean to you?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 900, 'ETA: NOW', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 56, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'snacks also coming', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Feeds you. | *Then feeds you again.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'cake', 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'bowl', 870, 1060, 14 * pop01(t, P.t0 + 1.0, 0.3, 2))
      bits(x, 'cookie', 700, 1070, 12 * pop01(t, P.t0 + 1.2, 0.3, 2))
      label(x, 790, 640, 'SECONDS: REQUIRED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Saw this. | *Thought of you.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(12, Math.max(1, Math.floor((lt - 0.2) / 0.14)))
      phone(x, 790, 830, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '12:0' + (n % 10), head: `GEMINI · ${n} NEW`, msg: 'saw this. | thought of u', bg: GOLD })
    } },
  { sign: 'cancer', cap: 'Remembers your | *favourite everything.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'tea: mint | colour: green | snack: crisps | song: that one', { head: 'YOUR FAVES', headBg: SKYB, size: 34, w: 380 })
      label(x, 790, 1100, 'MEMORISED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Hypes you up | *in public.* Loudly.', mood: 'sparkle', look: [1, 0], star: L, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'THAT’S MY | BEST FRIEND!!', { bg: GOLD, size: 46, w: 400, rot: 0.05 })
      label(x, 790, 1000, 'they’re a GENIUS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.04 })
      sparkles(x, t, 790, 760, P.t0 + 0.5, 8, 210, 0.2)
    } },
  { sign: 'virgo', cap: '“Home safe?” | *Every single time.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 800, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '11:02', head: 'VIRGO', msg: 'home safe? | text me.', bg: MINT })
      bubble(x, 790, 1110, 'yes, mum ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
  { sign: 'libra', cap: 'Saves you | *the best seat.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'pillow', 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'RESERVED: YOU', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 42, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'window side ✦', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Remembers what | you said *in March.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 690, pop01(t, P.t0 + 0.2, 0.3, 2), 'MARCH 4: | “I want a plant”', { size: 38, w: 400, bg: PAPER, rot: -0.04 })
      bits(x, 'plant', 790, 960, 20 * pop01(t, P.t0 + 1.1, 0.3, 2))
      label(x, 790, 1130, 'FOR YOU', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: '#b07dff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Brings you a souvenir. | From *everywhere.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'gift', 700 + i * 95, 1020 - (i % 2) * 40, 14 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), { rot: (i - 1) * 0.1 })
      label(x, 790, 720, 'FROM: EVERYWHERE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Moving day? | *There at 7 a.m.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'MOVING DAY', '7:00')
      label(x, 790, 1060, 'BROUGHT: TAPE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'A weird little gift. | *Made with love.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, ROCK[0], ROCK[1], 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 640, 'it’s a rock. | it’s YOU.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1080, 'KEEPING IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries with you. | *Then for you.*', mood: lt => lt < 1.0 ? 'sleepy' : 'heart', tears: lt => lt < 1.0 ? 2 : 3, star: L,
    front(x, t, lt, P) {
      label(x, 790, 740, 'TISSUES: FOR TWO', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'I’m here. | (sobbing)', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
    } },
]

const F = makeFilm({
  id: 'v3a131', key: 'D', accent: MINT, ending: 'lesson',
  title: 'How each sign | *shows they care.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone *showed up.*' },
  lesson: { text: 'Notice how they love. | Then *say thanks.*', chip: 'CARE: RECEIVED' },
  last: {
    text: 'Taurus is still | *feeding you.*',
    draw(x, t, lt) { bits(x, 'cake', 540, 1440, 20 * pop01(t, t - lt + 0.6, 0.35, 2)); hearts(x, t, 540, 1050, t - lt + 0.8, { n: 6, life: 2, spread: 400, cell: 7, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
