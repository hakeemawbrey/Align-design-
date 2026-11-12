// r2a0292: star_advice, ADVICE SOLO, "Signs a Capricorn | misses you." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (solo mode, 9 cards): the quiet, practical ways a Capricorn says "I miss you".
//   0.0–3.6    "Signs a Capricorn | *misses you.*"
//   3.6–37.8   "just checking in" (translation: I miss you) · put you in the calendar, recurring · fixed your wobbly shelf
//              · remembers step 3 of your five-year plan · sends you an article · shows up fifteen minutes early
//              · laughs at your old joke · checked your compatibility · says it out loud, finally
//  37.8        "Quiet love. | *Big effort.*"   41.0  LESSON: "Their love is quiet. | But it’s *steady.*"
//  46.9        "Miss them back. | *They’ll notice.*" over the match card: Capricorn + Cancer (the compatibility check).
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, chart, clock, CREAM, RED, ORANGE, GREY, DEEP, GREEN, WOOD, BROWN, clamp, ease, lerp, prog } from './props.js'

const S = 'capricorn', ST = { x: -180 }, ACC = MINT
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const WRENCH = ['.KK...', 'KGGK..', 'KG.GK.', '.KGGGK', '..KGGK', '...KGGK', '....KGGK', '.....KGGK', '......KGK', '.......K.']
const BOOK = ['KKKKKK', 'KRRRRK', 'KRRRRK', 'KRRRRK', 'KKKKKK']

const CAMEOS = [
  { sign: S, cap: '"Just checking in." | *Means I miss you.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'CAPRICORN', headCol: MINT, size: 28, w: 290, lines: [['just checking in.', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['how is work?', BONE, pop01(t, P.t0 + 0.9, 0.25, 2)]] })
      lab(x, 790, 1130, 'TRANSLATION: I MISS YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'You’re in their calendar. | *Recurring.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 840, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = GREEN; x.fillRect(-150, -150, 300, 56); txt(x, 'SUNDAYS', 0, -122, { size: 30, font: MONO, weight: 700, color: BONE })
        txt(x, '6:00 pm', 0, -40, { size: 34, font: MONO, weight: 700 })
        txt(x, 'call you ♥', 0, 20, { size: 36 })
        txt(x, 'repeat: forever', 0, 90, { size: 24, font: MONO, weight: 700, color: '#6b62a8' })
      })
      hearts(x, t, 790, 700, P.t0 + 1.3, { n: 3, life: 1.4, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Fixed your wobbly shelf. | *Didn’t mention it.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const wob = lt < 1.0 ? Math.sin(t * 14) * 0.08 : 0
      x.save(); x.globalAlpha = clamp(k); x.translate(800, 900); x.rotate(wob)
      x.fillStyle = INK; x.fillRect(-160, -10, 320, 34); x.fillStyle = WOOD; x.fillRect(-154, -4, 308, 22)
      drawBits(x, BOOK, { K: INK, R: RED }, -90, -46, 12); drawBits(x, BOOK, { K: INK, R: '#5fa8ff' }, -10, -46, 12); drawBits(x, BOOK, { K: INK, R: GOLD }, 70, -46, 12)
      x.restore()
      drawBits(x, WRENCH, { K: INK, G: '#c9c9d8' }, 650, 1030, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: lt < 1.0 ? Math.sin(t * 10) * 0.4 : 0 })
      lab(x, 820, 1080, 'SHELF: FIXED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'They remember | your *five-year plan.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'how is step 3 | going?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      card(x, 790, 960, 280, 190, pop01(t, P.t0 + 0.6, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        ['1. save', '2. move', '3. YOUR DREAM'].forEach((s, i) => txt(x, s, -110, -56 + i * 52, { size: 28, font: MONO, weight: 700, align: 'left', color: i === 2 ? RED : INK }))
      })
    } },
  { sign: S, cap: 'They send an article. | *That’s a hug.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'CAPRICORN', headCol: MINT, size: 26, w: 290, lines: [['LINK: how to rest', SKYB, pop01(t, P.t0 + 0.5, 0.25, 2)], ['thought of you.', BONE, pop01(t, P.t0 + 1.0, 0.25, 2)]] })
      lab(x, 790, 1130, 'LOVE LANGUAGE: LINKS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.04 })
    } },
  { sign: S, cap: 'They show up | *fifteen minutes early.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST, hops: [0.8],
    front(x, t, lt, P) {
      clock(x, 790, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), 6, 45)
      lab(x, 790, 1040, 'PLANS: 7:00', pop01(t, P.t0 + 0.8, 0.3, 2), { bg: BONE, rot: -0.04 })
      bubble(x, 560, 640, 'couldn’t wait.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Your old joke? | *Still laughing.*', mood: lt => lt > 0.9 ? 'squint' : 'neutral', star: ST, hops: [1.0, 1.3, 1.6], squash: lt => lt > 0.9 ? 0.05 * Math.sin(lt * 30) : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'remember the | duck thing?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, tail: 'br', col: LAV })
      lab(x, 790, 1040, 'RARE LAUGH: UNLOCKED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 420, 820, P.t0 + 1.0, 6, 170, 0.5)
    } },
  { sign: S, cap: 'They checked | your *compatibility.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 820, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      lab(x, 790, 1050, lt > 1.4 ? '♑ + ♋ : ALIGNED' : 'CHECKING…', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: lt > 1.4 ? MINT : BONE, rot: -0.03 })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Then one day: | *"I miss you."*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      bubble(x, 790, 820, 'i miss you.', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 52, tail: 'bl', col: PINK })
      if (lt > 1.0) { x.save(); x.globalAlpha = 0.6 * clamp((lt - 1.0) * 3); x.fillStyle = '#ff6b8a'; x.fillRect(F.x - 90, F.cy + 10, 40, 16); x.fillRect(F.x + 50, F.cy + 10, 40, 16); x.restore() }
      lab(x, 790, 1050, '(took 3 weeks)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GREY, rot: -0.04 })
      hearts(x, t, 790, 980, P.t0 + 1.2, { n: 6, life: 1.8, spread: 220, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0292', key: 'F', accent: ACC, solo: S, ending: 'card',
  title: 'Signs a Capricorn | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Quiet love. | *Big effort.*', mood: 'heart' },
  lesson: { text: 'Their love is quiet. | But it’s *steady.*', chip: 'STATUS: MISSED' },
  last: { text: 'Miss them back. | *They’ll notice.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
