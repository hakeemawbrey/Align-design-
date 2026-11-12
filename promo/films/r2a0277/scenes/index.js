// r2a0277: star_advice, ADVICE SOLO (gemini), "Signs a Gemini | misses you." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One Gemini the whole way through: nine little ways a Gemini says "I miss you" without saying it, each with a warm read.
//   0.0–3.6    "Signs a Gemini | *misses you.*"
//   3.6–37.8   nine cards: a 1 a.m. meme means "I miss you" · remembers your tiny story from months ago · "random
//              thought—" it's about you · talks about you to everyone · shows up with the snack you mentioned once
//              · suddenly very chatty (nerves, mostly) · sends a song, then ten more · "what are you up to?" means "can I
//              come?" · checked your compatibility, again
//  37.8        "Never quiet. | *Always yours.*"
//  41.0        LESSON UNLOCKED: "Their mind wanders. | Their *heart* doesn't."  STATUS: MISSED
//  46.9        "Text them back. | They’re *typing.*" over the match card: Gemini + Aquarius (the compatibility
//              checks, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, clock, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'gemini', ACC = '#ffe066'
const ST = { x: -170 }

const CHIPS = ['..KKKKKK..', '.KRRRRRRK.', 'KRRRRRRRRK', 'KRYYYYYYRK', 'KRYWWWWYRK', 'KRYWWWWYRK', 'KRYYYYYYRK', 'KRRRRRRRRK', '.KRRRRRRK.', '..KKKKKK..']
const CHIPS_C = { K: INK, R: ORANGE, Y: SUN, W: CREAM }

const CAMEOS = [
  { sign: S, cap: 'A meme at 1 a.m.? | That’s *“I miss you.”*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 600, 620, 56, pop01(t, P.t0 + 0.2, 0.3, 2), 1, 0)
      phone(x, 800, 880, 1.2 * pop01(t, P.t0 + 0.3, 0.35, 2), { head: 'GEMINI', headCol: ACC, size: 26, lines: [
        ['lol this is u', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)],
        ['[cat in a box]', LAV, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
      ] })
      label(x, 790, 1150, 'TRANSLATION: MISS U', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remembers your tiny story. | *From months ago.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'how’s your | cousin’s goat?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      label(x, 790, 960, 'YOU MENTIONED IT: ONCE', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'THEY LISTENED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: '“Random thought—” | It’s *about you.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 790); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 186, 136, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 0, 178, 128, 0, 0, Math.PI * 2); x.fill()
        for (const [dx, dy, r] of [[-150, 150, 26], [-200, 200, 16]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
        x.restore()
        signChar(x, t, 'taurus', 800, 800, 150 * k, { mood: 'happy', seed: 61, glyph: false })
        label(x, 800, 690, 'YOU', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      }
      bubble(x, 800, 1080, 'random thought—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: ACC, tail: 'bl' })
    } },
  { sign: S, cap: 'Talks about you. | *To everyone.*', mood: lt => Math.floor(lt * 3) % 2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const IDS = ['virgo', 'sagittarius']
      IDS.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.3, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, 700 + i * 190, 1040, 150 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 62 + i, glyph: false })
      })
      bubble(x, 790, 680, 'my friend is | SO funny', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      label(x, 790, 860, 'MENTIONS TODAY: 14', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Brought the snack | you *mentioned once.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, CHIPS, CHIPS_C, 790, 870, 24 * pop01(t, P.t0 + 0.3, 0.35, 2.2), { rot: 0.1 })
      bubble(x, 790, 640, 'saw these. | thought of you', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: BONE, tail: 'bl' })
      label(x, 790, 1110, 'YOUR FAVOURITE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04 })
      sparkles(x, t, 790, 870, P.t0 + 0.6, 7, 160, 0.3)
    } },
  { sign: S, cap: 'Suddenly very chatty. | *Nerves, mostly.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['so anyway', 'did you know', 'also!!', 'ok wait', 'haha um']
      W.forEach((w, i) => bubble(x, 700 + (i % 2) * 160, 640 + i * 110, w, pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2), { size: 32, col: i % 2 ? ACC : BONE, tail: i % 2 ? 'br' : 'bl' }))
      label(x, 600, 1170, 'HEART: RACING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sends you a song. | *Then ten more.*', mood: lt => lt > 0.8 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 10)
      label(x, 790, 700, `SONGS SENT: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      card(x, 790, 920, 330, 140, pop01(t, P.t0 + 0.4, 0.35, 2), { bg: '#2a2350', rot: -0.03 }, () => {
        txt(x, 'PLAYLIST:', 0, -26, { size: 26, font: MONO, weight: 700, color: GREY })
        txt(x, '“for you :)”', 0, 22, { size: 38, color: ACC })
      })
      notes(x, t, 560, 860, { n: 5, cell: 7, col: ACC, seed: 3 })
    } },
  { sign: S, cap: '“What are you up to?” | Means *“can I come?”*', mood: lt => lt > 1.3 ? 'sparkle' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 830, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'GEMINI', headCol: ACC, size: 26, lines: [
        ['what u up to?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['nothing much', GREY, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
        ['omw!!', ACC, pop01(t, P.t0 + 1.2, 0.25, 2.4)],
      ] })
      label(x, 790, 1150, 'ALREADY ON THE BUS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked your compatibility. | *Again.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.0) * 4)
      label(x, 790, 650, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      card(x, 790, 870, 330, 180, pop01(t, P.t0 + 0.35, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'GEMINI + YOU', 0, -40, { size: 36, font: MONO, weight: 700 })
        txt(x, lt > 1.4 ? 'STILL GREAT ♡' : 'checking…', 0, 30, { size: 34, color: lt > 1.4 ? '#d4366a' : '#6b62a8' })
      })
      label(x, 790, 1090, `CHECKS: ${n}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 1.5, { n: 4, life: 1.5, spread: 100, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0277', key: 'F', accent: ACC, solo: S, ending: 'card',
  title: 'Signs a Gemini | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'aquarius', chip: 'ALIGNED' },
  group: { cap: 'Never quiet. | *Always yours.*', mood: 'heart' },
  lesson: { text: 'Their mind wanders. | Their *heart* doesn’t.', chip: 'STATUS: MISSED' },
  last: {
    text: 'Text them back. | They’re *typing.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
