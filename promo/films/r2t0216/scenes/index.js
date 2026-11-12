// r2t0216: star_talk, SOLO, "Geminis on a day off | be like." (~49 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a Gemini's "relaxing" day off, every card the most
// extreme, lovable version of the restless twin.
//   0.0–3.6    "Geminis on a day off | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              planned to rest, made 14 plans · started six shows, finished none · texted every group chat at once
//              · argued with their twin self, both won · new hobby every hour · one tab became forty (one is their chart)
//              · "quiet day", hosted a party · half a book, then half of another · needs a day off from the day off
//  37.8        "Rest? | *Never heard of it.*"  Gemini comes back, big.
//  41.0        LESSON UNLOCKED: "Busy is how they rest. | *Let them run.*"  STATUS: RECHARGED
//  46.9        "Tomorrow? | *Fifteen plans.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, laptop, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'gemini'
const ST = { x: -190 }
const YEL = '#ffd23a'

const BOOK = [
  'KKKKKKK.KKKKKKK',
  'KWWWWWWKWWWWWWK',
  'KWLLLLWKWLLLLWK',
  'KWWWWWWKWWWWWWK',
  'KWLLLLWKWLLLLWK',
  'KWWWWWWKWWWWWWK',
  'KWLLLLWKWLLLLWK',
  'KWWWWWWKWWWWWWK',
  'KKKKKKKKKKKKKKK',
]
const BOOK_C = { K: '#6b62a8', W: CREAM, L: '#b9b0a0' }
const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']

/** an old TV on little legs; fn draws inside the 260×170 screen centred at 0, 0 */
function tv(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -110, 340, 250)
  x.fillStyle = INK; x.fillRect(-172, -122, 344, 244)
  x.fillStyle = '#8a4a2e'; x.fillRect(-164, -114, 328, 228)
  x.fillStyle = DEEP; x.fillRect(-140, -94, 280, 188)
  x.save(); x.beginPath(); x.rect(-140, -94, 280, 188); x.clip(); if (fn) fn(); x.restore()
  x.fillStyle = INK; x.fillRect(-120, 122, 16, 40); x.fillRect(104, 122, 16, 40)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Planned to rest. | Made *14 plans.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const ROWS = [['REST', MINT], ['brunch', PINK], ['pottery', ORANGE], ['gym?', SKYB], ['museum', LAV], ['karaoke', GOLD]]
      card(x, 790, 850, 340, 440, k, { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'DAY OFF', 0, -180, { size: 32, font: MONO, weight: 700 })
        ROWS.forEach(([s, c], i) => {
          const on = i === 0 ? 1 : pop01(t, P.t0 + 0.4 + i * 0.18, 0.25, 2.2)
          if (on <= 0.01) return
          const y = -118 + i * 58
          x.save(); x.translate(0, y); x.scale(on, on)
          x.fillStyle = c; x.fillRect(-140, -23, 280, 46); txt(x, s, 0, 2, { size: 28 })
          if (i === 0 && lt > 1.4) { x.fillStyle = RED; x.fillRect(-120, -3, 240, 7) }
          x.restore()
        })
      })
      const n = Math.min(14, 1 + Math.floor(clamp((lt - 0.4) / 1.3) * 13))
      label(x, 790, 1130, `PLANS: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Started six shows. | Finished *none.*', mood: lt => lt > 1.6 ? 'wide' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ch = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.3))
      const COLS = [SKYB, PINK, MINT, ORANGE, LAV, GOLD]
      tv(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = COLS[ch]; x.globalAlpha = 0.5; x.fillRect(-140, -94, 280, 188); x.globalAlpha = 1
        txt(x, `SHOW ${ch + 1}`, 0, -30, { size: 40, color: BONE })
        txt(x, 'EP 1', 0, 30, { size: 32, font: MONO, weight: 700, color: BONE })
      })
      label(x, 790, 1100, 'FINISHED: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texted every group chat. | *At once.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const MSG = [['hey!!', PINK], ['HEY!!', MINT], ['hey!!!', SKYB], ['heyyy', GOLD]]
      phone(x, 790, 860, k, { head: 'GROUP CHATS', headCol: LAV, size: 30, lines: MSG.map(([s, c], i) => [s, c, pop01(t, P.t0 + 0.6 + i * 0.12, 0.25, 2.2)]) })
      label(x, 790, 640, 'SENT TO: 31 CHATS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Argued with themself. | *Both sides won.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, S, 800, 960, 230 * k, { mood: lt > 1.6 ? 'sparkle' : 'squint', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.7] })
      bubble(x, 330, 600, 'NAP!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, tail: 'bc' })
      bubble(x, 800, 690, 'PARTY!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, col: PINK, tail: 'bc' })
      label(x, 560, 1150, 'WINNER: BOTH', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 560, 1100, P.t0 + 1.7, 7, 200, 0.4)
    } },
  { sign: S, cap: 'A new hobby | *every hour.*', mood: lt => lt > 1.5 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      const H = [['POTTERY', ORANGE, '10 AM'], ['SALSA', PINK, '11 AM'], ['FRENCH', SKYB, '12 PM'], ['BANJO', MINT, '1 PM'], ['CHESS', LAV, '2 PM'], ['KNITTING', GOLD, '3 PM']]
      const i = Math.min(5, Math.floor(Math.max(0, lt - 0.2) / 0.36))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 840, 340, 300, k, { bg: CREAM, rot: -0.03 }, () => {
        txt(x, H[i][2], 0, -100, { size: 30, font: MONO, weight: 700, color: '#6b62a8' })
        x.fillStyle = H[i][1]; x.fillRect(-140, -50, 280, 100)
        txt(x, H[i][0], 0, 2, { size: 44 })
        txt(x, 'NEW HOBBY', 0, 100, { size: 28, font: MONO, weight: 700 })
      })
      label(x, 790, 1100, `HOBBY #${i + 1}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Opened one tab. | Now it’s *forty.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(40, 1 + Math.floor(clamp((lt - 0.4) / 1.1) * 39))
      laptop(x, 780, 940, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        const w = 240 / Math.max(4, n)
        for (let j = 0; j < n; j++) { x.fillStyle = [PINK, MINT, SKYB, GOLD, LAV][j % 5]; x.fillRect(-120 + j * w, -70, Math.max(2, w - 2), 20) }
        txt(x, `${n} TABS`, 0, 4, { size: 40, color: BONE, font: MONO, weight: 700 })
      })
      label(x, 790, 650, 'TAB 40: MY BIRTH CHART', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Quiet day,” they said. | Hosted *a party.*', mood: lt => lt > 1.0 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -210 }, hops: [1.1, 1.7],
    front(x, t, lt, P) {
      bubble(x, 330, 600, 'quiet day…', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 0.9, 1.0)), { size: 40, col: LAV, tail: 'bc' })
      const G = [['leo', 700, 900], ['aries', 870, 880], ['libra', 780, 1050], ['sagittarius', 940, 1060], ['cancer', 620, 1060]]
      G.forEach(([id, gx, gy], j) => {
        const kk = pop01(t, P.t0 + 0.9 + j * 0.12, 0.3, 2)
        if (kk > 0.01) signChar(x, t, id, gx, gy, 140 * kk, { mood: 'sparkle', seed: 30 + j, glyph: false, hops: [P.t0 + 1.4 + j * 0.1] })
      })
      if (lt > 1.0) confetti(x, t, 790, 860, P.t0 + 1.0, { n: 18, spread: 200, h: 460 })
      label(x, 790, 680, 'GUESTS: 40', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Half a book. | Then half of *another.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let j = 0; j < 3; j++) {
        const kk = pop01(t, P.t0 + 0.2 + j * 0.45, 0.3, 2)
        drawBits(x, BOOK, BOOK_C, 790 + (j - 1) * 40, 1010 - j * 150, 15 * kk, { rot: (j - 1) * 0.08 })
        label(x, 790 + (j - 1) * 40 + 120, 960 - j * 150, `p. ${[112, 87, 140][j]}`, kk, { size: 26, bg: [PINK, MINT, SKYB][j], rot: 0.06, font: MONO, weight: 700 })
      }
      label(x, 790, 1160, 'FINISHED: HALF OF ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Needs a day off | from the *day off.*', mood: 'sleepy', star: { x: -190, y: 40 }, hops: [],
    back(x, t, lt, P) {
      drawBits(x, PILLOW, { W: CREAM }, 350, 1030, 24 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      card(x, 790, 820, 320, 260, k, { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'TOMORROW', 0, -80, { size: 30, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, 'DAY OFF', 0, -10, { size: 50 })
        txt(x, 'part two', 0, 54, { size: 32, weight: 700 })
      })
      label(x, 790, 1060, 'BOOKED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.06, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0216', key: 'C', accent: YEL, solo: S, ending: 'lesson',
  title: 'Geminis on a day off | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Rest? | *Never heard of it.*', mood: 'sparkle' },
  lesson: { text: 'Busy is how they rest. | *Let them run.*', chip: 'STATUS: RECHARGED' },
  last: {
    text: 'Tomorrow? | *Fifteen plans.*',
    draw(x, t, lt) {
      const t0 = t - lt
      label(x, 540, 1180, 'PLANS: 15', pop01(t, t0 + 0.9, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1180, t0 + 1.0, 8, 220, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
