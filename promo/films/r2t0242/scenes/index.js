// r2t0242: THE SIGNS AS… v3, ROLLCALL, "The signs as | coffee orders." (~63 s vertical, signs3kit social cut, music: lofi · E)
// The format look lives in ../../signs3kit.js. Ending: lesson.
//   0.0–3.6    "The signs as | *coffee orders.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one order per sign (3.8 s each), pushed to the extreme:
//              ♈ espresso, gone before the counter · ♉ a latte and the whole pastry case · ♊ changed it mid-pour
//              · ♋ makes it at home, brought you one · ♌ name on the cup in gold · ♍ the order is a 14-step list
//              · ♎ couldn't pick, the barista did · ♏ black coffee, no small talk · ♐ every flavour, one cup
//              · ♑ same order for ten years · ♒ invented a drink, it's blue · ♓ barista said "enjoy," Pisces cried
//  49.2        "Same café. | *Twelve vibes.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Know what you love. | *Order it proudly.*"  ORDER: UP
//  58.3        "Aries is | on *cup four.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, mug, plate, speed, CREAM, RED, ORANGE, SUN, GREY, BROWN, WOOD, TEAL, clamp, prog, lerp, ease } from './props.js'

const ACC = '#e8b07a'
const CROIS = [
  '..OOOO..',
  '.OoOOoO.',
  'OOOoOOOO',
  'OoOOOoOO',
  '.OOOOOO.',
]
const CROIS_C = { O: '#e8a24a', o: '#c97a2a' }
const DONUT = [
  '.PPPP.',
  'PPPPPP',
  'PP..PP',
  'PPPPPP',
  '.PPPP.',
]

const CAMEOS = [
  { sign: 'aries', cap: 'Espresso. | Gone *before the counter.*', mood: 'squint', star: { x: -180 }, hops: [0.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      mug(x, lerp(980, 790, ease.outCubic(prog(lt, 0.1, 0.5))), 860, k, t, { w: 110, h: 110, col: CREAM, steam: lt < 1.2, handle: true, fillCol: lt > 1.0 ? CREAM : BROWN })
      speed(x, 700, 860, 1 - prog(lt, 0.5, 0.9))
      label(x, 790, 1040, 'TIME: 0.2 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'another.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'One latte. | And *the whole pastry case.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.7],
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#bfe7ef', rot: 0.02 }, () => {
        x.fillStyle = WOOD; x.fillRect(-160, -10, 320, 12); x.fillRect(-160, 120, 320, 12)
        const n = 6 - Math.floor(clamp((lt - 0.6) / 1.1) * 6)
        for (let i = 0; i < 6; i++) if (i < n) i % 2 ? drawBits(x, DONUT, { P: PINK }, -110 + (i % 3) * 110, i < 3 ? -50 : 80, 9) : drawBits(x, CROIS, CROIS_C, -110 + (i % 3) * 110, i < 3 ? -50 : 80, 9)
      })
      label(x, 790, 1060, 'CASE: EMPTY', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: SUN, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Changed the order | *mid-pour.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'wide', star: { x: -180 },
    front(x, t, lt, P) {
      const O = ['hot latte', 'wait, iced', 'no, tea?', 'hot latte.']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 790, 660, O[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      mug(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), t, { w: 140, h: 170, col: n % 2 ? SKYB : CREAM, steam: n % 2 === 0, text: `#${n + 1}` })
    } },
  { sign: 'cancer', cap: 'Made it at home. | *Brought you one.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      mug(x, 720, 880, pop01(t, P.t0 + 0.2, 0.35, 2), t, { w: 130, h: 150, col: '#c8f0ff', text: '♋︎', size: 44 })
      mug(x, 880, 880, pop01(t, P.t0 + 0.8, 0.35, 2), t, { w: 130, h: 150, col: PINK, text: 'YOU', size: 30 })
      label(x, 800, 1070, 'WITH A NOTE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: CREAM, rot: -0.05 })
      hearts(x, t, 880, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Their name on the cup? | *In gold.*', mood: 'sparkle', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      mug(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), t, { w: 180, h: 220, col: '#2a2350', text: 'LEO', textCol: GOLD, size: 54, handle: false })
      sparkles(x, t, 790, 860, P.t0 + 0.9, 8, 170, 0.2)
      label(x, 790, 1080, 'SPELLED RIGHT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD })
    } },
  { sign: 'virgo', cap: 'Their order | is *a 14-step list.*', mood: 'squint', star: { x: -180 },
    front(x, t, lt, P) {
      const len = lerp(80, 520, ease.outCubic(prog(lt, 0.3, 1.6)))
      card(x, 790, 520 + len / 2, 230, len, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.02 }, () => {
        const n = Math.floor(len / 36)
        for (let i = 0; i < n; i++) txt(x, `${i + 1}. ${['oat', '68°C', 'half foam', 'no lid', '1 ice', 'stir 3x', 'tiny cup'][i % 7]}`, -96, -len / 2 + 26 + i * 36, { size: 22, align: 'left', font: MONO, weight: 700 })
      })
      label(x, 790, 1120, 'PAGE 1 OF 2', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t decide. | The *barista picked.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'surprise me?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      mug(x, 790, 900, k, t, { w: 140, h: 170, col: '#ffd1e3', text: '?', size: 60 })
      label(x, 790, 1080, 'LOVES IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK })
    } },
  { sign: 'scorpio', cap: 'Black coffee. | *No small talk.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      mug(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), t, { w: 150, h: 180, col: '#5a4a8a', fillCol: '#0a0610', textCol: '#ffb3d0', text: '♏︎', size: 50 })
      bubble(x, 790, 650, 'nice weather—', pop01(t, P.t0 + 0.6, 0.25, 2.2) * (1 - prog(lt, 1.3, 1.5)), { size: 36, col: LAV, tail: 'br' })
      bubble(x, 790, 650, '…', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 56, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Tried every flavor. | *In one cup.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      mug(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), t, { w: 160, h: 190, col: CREAM, fillCol: ['#c97bff', PINK, MINT, SUN][Math.floor(t * 4) % 4] })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 10)
      label(x, 790, 660, `FLAVORS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: ORANGE, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'delicious?', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Same order | *for ten years.*', mood: 'neutral', star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 820, 300, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'LOYALTY CARD', 0, -76, { size: 26, font: MONO, weight: 700 })
        for (let i = 0; i < 10; i++) { x.fillStyle = INK; x.fillRect(-120 + (i % 5) * 50, -36 + Math.floor(i / 5) * 56, 36, 36); x.fillStyle = BROWN; x.fillRect(-116 + (i % 5) * 50, -32 + Math.floor(i / 5) * 56, 28, 28) }
      })
      label(x, 790, 1010, 'CARD #312', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GREY, font: MONO, weight: 700 })
      bubble(x, 380, 620, 'the usual.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Invented a drink. | *It’s blue.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      mug(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), t, { w: 150, h: 190, col: '#c8f0ff', fillCol: '#3d8fd8', handle: false, text: '?!', size: 46, textCol: '#3d8fd8' })
      label(x, 790, 650, 'OAT + SALT + STARS', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 28, bg: SKYB, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'it’s the future', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Barista said “enjoy.” | Pisces *cried.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'enjoy!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'br' })
      mug(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), t, { w: 140, h: 170, col: '#d8ccff', text: '♥', textCol: PINK, size: 50 })
      label(x, 790, 1080, 'SO KIND', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV })
    } },
]

const F = makeFilm({
  id: 'r2t0242', key: 'E', accent: ACC, ending: 'lesson',
  title: 'The signs as | *coffee orders.*',
  cameos: CAMEOS,
  group: { cap: 'Same café. | *Twelve vibes.*' },
  lesson: { text: 'Know what you love. | *Order it proudly.*', chip: 'ORDER: UP' },
  last: { text: 'Aries is | on *cup four.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
