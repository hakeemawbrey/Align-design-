// r2a0762: star_advice, ADVICE SOLO (sagittarius), "What a Sagittarius | won't say." (topic: "... won't say out loud", trimmed to two lines) (signs3kit social cut,
// lofi · F). Ending: callback (card 2's "brb ♡" plane comes back: they always come back).
//   jokes when it hurts (ask one more time) · needs space, still loves you · new hobby #9 (curious, not careless)
//   · blunt = honesty with love · homesick on every trip (both true) · wants love, the free-range kind
//   · overbooked (rest is an adventure too) · laughs loudest (joy is contagious) · wants you along (seat saved)
//   group "Wild heart. | *Soft inside.*"   last "Gone a while? | *Always back.*"
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, zzz, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'sagittarius', ACC = '#ff9a4a', ST = { x: -170 }

/** a little plane on a dotted path, with a sign on its tail */
function plane(x, cx, cy, k, rot = -0.08) { bits(x, 'PLANE', cx, cy, 16 * k, { rot: rot + Math.PI / 2 }) }

const CAMEOS = [
  { sign: S, cap: 'Jokes when it hurts. | Ask *one more time.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.2) bubble(x, 790, 760, 'lol i’m | fine!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      else bubble(x, 790, 760, 'ok… not | fine. thanks.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
      L(x, 790, 1070, 'YOU OK? (ASK TWICE)', pop01(t, P.t0 + 0.8, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Needs some space? | *Still loves you.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.3, 1.8))
      x.save(); x.fillStyle = BONE; x.globalAlpha = 0.5
      for (let i = 0; i < 9; i++) { const q = i / 9; if (q < p) x.fillRect(lerp(520, 900, q) - 4, lerp(960, 620, q) - 4 + Math.sin(q * 6) * 20, 10, 10) }
      x.restore()
      plane(x, lerp(520, 900, p), lerp(960, 620, p) + Math.sin(p * 6) * 20, pop01(t, P.t0 + 0.3, 0.3, 2), -0.7)
      bubble(x, 760, 1040, 'brb ♡', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 52, tail: 'bl' })
    } },
  { sign: S, cap: 'New hobby again? | *Curious, not careless.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 8)
      bits(x, ['BOOK', 'LENS', 'MAP', 'CANDLE', 'GADGET', 'BROOM', 'PEN', 'COOKIE', 'BACKPACK'][n - 1], 790, 870, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, `NEW HOBBY #${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, 0.05, 36)
      L(x, 790, 1090, 'ALL LOVED ✦', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Too blunt? | It’s *honesty with love.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'MEGA', F.x + 190, F.cy - 20, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, 'that shirt? no. | YOU? amazing.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 820, 900, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 4 })
      L(x, 800, 1090, 'TRUTH, WITH HEARTS', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Homesick on every trip? | *Both can be true.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 650, 1060, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CLOUD', 820, 720, 26 * pop01(t, P.t0 + 0.4, 0.35, 2))
      bits(x, 'HOUSE', 820, 700, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 860, 940, 'MISS U, COUCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.05, 30)
    } },
  { sign: S, cap: 'Wants love? | The *free-range* kind.', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 330, head: '♐︎ PROFILE', headBg: ACC, headInk: INK, lines: ['looking for:', ['an adventure', '#c0392b'], ['buddy ♡', '#c0392b']], size: 34 })
      L(x, 790, 1100, 'LOVE, NO LEASH', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Booked every weekend? | *Rest is an adventure.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', star: { x: -170, y: 10 },
    back(x, t, lt, P) { bits(x, 'COUCH', 390, 1040, 22 * pop01(t, P.t0 + 0.9, 0.3, 2)) },
    front(x, t, lt, P) {
      swapLabel(x, 790, 760, lt, 1.0, 'SAT: HIKE + PARTY', 'SAT: NAP ♡', { size: 30, fromBg: GOLD, toBg: MINT })
      if (lt > 1.3) zzz(x, t, 520, 720, { size: 42 })
      L(x, 790, 1000, 'QUEST: THE COUCH', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'Laughs the loudest? | *Joy is contagious.*', mood: 'happy', star: ST, hops: [0.4, 0.9, 1.4],
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'HA HA HA', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, tail: 'bl' })
      friend(x, t, 'capricorn', 840, 980, 180, pop01(t, P.t0 + 0.7, 0.35, 2), { mood: lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], hops: [P.t0 + 1.6] })
      L(x, 840, 830, 'EVEN CAP LAUGHED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.05, 28)
    } },
  { sign: S, cap: 'Wants you to come. | *Always.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 730, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BACKPACK', 860, 920, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 700, 'ONE IS YOURS ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 34)
      L(x, 800, 1110, 'SEAT: SAVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0762', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'What a Sagittarius | *won’t say.*',
  cameos: CAMEOS,
  group: { cap: 'Wild heart. | *Soft inside.*', mood: 'heart' },
  last: {
    text: 'Gone a while? | *Always back.*',
    draw(x, t, lt) {
      const p = ease.outCubic(prog(lt, 0.3, 1.6))
      plane(x, lerp(1000, 760, p), lerp(700, 1000, p), pop01(t, t - lt + 0.3, 0.3, 2), 2.4)
      const k = pop01(t, t - lt + 0.6, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, S, 430, 1100, 300 * k, { mood: lt > 1.6 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.7] })
      bubble(x, 760, 880, 'back ♡', pop01(t, t - lt + 1.7, 0.25, 2.2), { size: 50, tail: 'bl' })
      hearts(x, t, 540, 1250, t - lt + 1.8, { n: 8, life: 2, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
