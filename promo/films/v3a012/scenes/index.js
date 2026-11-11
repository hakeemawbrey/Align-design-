// v3a012: zodiac.advice444, ADVICE SOLO, "Dear Cancer: | it's okay." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): a soft Cancer truth, a warm "it's okay", one gag each.
//   0.0–3.6    "Dear Cancer: | *it’s okay.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              missing home (a little house in a thought cloud) · hiding in a box labelled SHELL (TEMP)
//              · packed lunch for everyone, the last box says ME · moods change like the moon (four phases, ALL VALID)
//              · "can't tonight, love you!" and it lands fine · a match replied late: not about you
//              · talking to the plants (the plant agrees) · Capricorn hands Cancer a lunch: YOUR TURN
//              · a big heart that keeps growing: JUST RIGHT
//  37.8        "Soft heart. | *Strong shell.*"  Cancer comes back, big.
//  41.0        LESSON UNLOCKED: "Care for yourself | the way *you care for us.*"  HEART: HELD
//  46.9        "Capricorn packed | *the lunch* this time." over the match card: Cancer + Capricorn (the lunchbox, paid off).
import { clamp, prog, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SILVER = '#cfe3ff', RED = '#e23d4e', WOOD = '#c98f2a', ORANGE = '#ffb34a'
const S = 'cancer'

// ── props
const HOUSE = [
  '.....RR......',
  '....RRRR.CC..',
  '...RRRRRRCC..',
  '..RRRRRRRRR..',
  '.RRRRRRRRRRR.',
  'RRRRRRRRRRRRR',
  '.WWWWWWWWWWW.',
  '.WYYWWWWWYYW.',
  '.WYYWWDDWYYW.',
  '.WWWWWDDWWWW.',
  '.WWWWWDDWWWW.',
]
const HOUSE_C = { R: RED, C: '#8a4a2e', W: '#fff4e2', Y: GOLD, D: WOOD }
const POT = [
  '...L...L.....',
  '..LLL.LLL..L.',
  '..LLLLLLL.LL.',
  '...LLLLLLLL..',
  '.L..LLLLL....',
  '.LL..LLL.....',
  '..LLLLLL.....',
  '.....L.......',
  '.TTTTTTTTTT..',
  '..TTTTTTTT...',
  '..TTTTTTTT...',
  '...TTTTTT....',
]
const POT_C = { L: '#5fd068', T: '#d9774a' }

// a thought cloud with a little house inside
function thought(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const puff = (px, py, r) => { x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; for (const [px, py, r] of [[-90, 0, 86], [0, -30, 100], [90, 0, 86], [0, 40, 90]]) puff(px, py, r + 6)
  x.fillStyle = '#f4f0ff'; for (const [px, py, r] of [[-90, 0, 86], [0, -30, 100], [90, 0, 86], [0, 40, 90]]) puff(px, py, r)
  x.fillStyle = INK; puff(-200, 150, 22); puff(-250, 200, 14)
  x.fillStyle = '#f4f0ff'; puff(-200, 150, 17); puff(-250, 200, 10)
  x.restore()
  drawBits(x, HOUSE, HOUSE_C, cx, cy, 12 * k)
}
// a cardboard box in front of the star's lower half
function box(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -16, 352, 212)
  x.fillStyle = '#d9a86a'; x.fillRect(-168, -8, 336, 196)
  x.fillStyle = '#c08a4e'; x.fillRect(-168, -8, 336, 22)
  // open flaps
  x.fillStyle = INK; x.save(); x.translate(-168, -8); x.rotate(-0.5); x.fillRect(-120, -14, 124, 30); x.fillStyle = '#c08a4e'; x.fillRect(-114, -8, 116, 18); x.restore()
  x.save(); x.translate(168, -8); x.rotate(0.5); x.fillStyle = INK; x.fillRect(-4, -14, 124, 30); x.fillStyle = '#c08a4e'; x.fillRect(0, -8, 116, 18); x.restore()
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SHELL (TEMP)', 0, 100)
  x.restore()
}
// a stack of lunchboxes; the last one (top) is for Cancer
function lunchStack(x, cx, bottom, n, meK) {
  const COLS = [PINK, MINT, SKYB, LAV, ORANGE]
  for (let i = 0; i < n; i++) {
    const y = bottom - i * 70, w = 200 - (i % 2) * 16
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 5, y - 62, w + 10, 66)
    x.fillStyle = COLS[i % 5]; x.fillRect(cx - w / 2, y - 57, w, 56)
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(cx - w / 2, y - 57, w, 10)
    x.fillStyle = INK; x.fillRect(cx - 20, y - 70, 40, 10)
  }
  if (meK > 0.01) label(x, cx - 40, bottom - n * 70 - 40, '+ ONE FOR ME', meK, { size: 28, bg: GOLD, rot: 0.08, font: MONO, weight: 700 })
}
// four moon phases popping in a row
function moons(x, t, cy, P) {
  const xs = [610, 700, 790, 880]
  xs.forEach((mx, i) => {
    const k = pop01(t, P.t0 + 0.3 + i * 0.22, 0.3, 2.2)
    if (k <= 0.01) return
    x.save(); x.translate(mx, cy); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#3a2d70'; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill()
    x.save(); x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.clip()
    x.fillStyle = SILVER
    if (i === 0) { x.beginPath(); x.arc(22, 0, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#3a2d70'; x.beginPath(); x.arc(36, 0, 32, 0, Math.PI * 2); x.fill() }
    if (i === 1) x.fillRect(0, -34, 34, 68)
    if (i === 2) { x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill() }
    if (i === 3) x.fillRect(-34, -34, 34, 68)
    x.restore()
    x.restore()
  })
}
// a phone with one late reply
function phone(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ YOUR MATCH', 0, -130)
  x.fillStyle = '#6b62a8'; x.font = `700 20px ${MONO}`; x.fillText('replied 1 day later', 0, -98)
  x.fillStyle = LAV; x.fillRect(-100, -70, 200, 130)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`
  x.fillText('“so sorry,', 0, -40); x.fillText('work was', 0, -6); x.fillText('wild! fri?”', 0, 28)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Missing home | *is okay.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, -1], star: { x: -200, y: 60 },
    front(x, t, lt, P) {
      thought(x, 760, 720, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 760, 1000, 'HOMESICK (A LITTLE)', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 760, 720, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Hiding in your shell | *is allowed.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', star: { x: -10, y: 40 }, hops: [1.6],
    front(x, t, lt, P, F) {
      box(x, 540, 980, pop01(t, P.t0 + 0.2, 0.35, 1.8))
      label(x, 790, 620, 'BACK IN FIVE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05 })
    } },
  { sign: S, cap: 'You fed everyone. | *Eat too.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      lunchStack(x, 760, 1140, Math.min(6, Math.floor(clamp((lt - 0.2) / 1.0) * 6)), pop01(t, P.t0 + 1.5, 0.3, 2.4))
      label(x, 600, 600, 'LUNCH FOR: EVERYONE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Moods change | *like the moon.*', mood: lt => ['neutral', 'happy', 'sparkle', 'wink'][Math.min(3, Math.floor(lt / 0.5))], star: { x: -200 },
    front(x, t, lt, P) {
      moons(x, t, 800, P)
      label(x, 745, 920, 'ALL OF THEM: VALID', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SILVER, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 745, 800, P.t0 + 1.4, 7, 170, 0.5)
    } },
  { sign: S, cap: 'Saying no | *still means you care.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 810, 980, 200 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 15, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 450, 620, 'can’t tonight. | love you!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 810, 760, 'love you too!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: PINK, tail: 'bc' })
    } },
  { sign: S, cap: 'They replied late. | *It’s not about you.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 780, 1100, 'FRIDAY: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Talking to your plants? | *Totally* counts.', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 960, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 2) * 0.03 })
      bubble(x, 450, 620, 'and then she said…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 820, 700, 'same, bestie', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Let someone | *take care of you.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 810, 980, 210 * k, { mood: 'happy', look: [-1, 0], seed: 16, glyph: false })
      const lk = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (lk > 0.01) { x.save(); x.translate(640, 1010); x.scale(lk, lk); x.fillStyle = INK; x.fillRect(-90, -40, 180, 76); x.fillStyle = GOLD; x.fillRect(-84, -34, 168, 64); x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-84, -34, 168, 12); x.fillStyle = INK; x.fillRect(-20, -52, 40, 12); x.restore() }
      label(x, 720, 640, 'YOUR TURN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.05 })
      hearts(x, t, 400, 820, P.t0 + 1.4, { n: 5, life: 1.8, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Big feelings | *aren’t too much.*', mood: 'heart', star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const g = 0.4 + 0.6 * ease.outCubic(prog(lt, 0.2, 1.6)), beat = 1 + 0.05 * Math.sin(t * 7)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 780, 820, 26 * g * beat * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 780, 1080, 'SIZE: JUST RIGHT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 820, P.t0 + 1.6, 8, 220, 0.2)
    } },
]

const F = makeFilm({
  id: 'v3a012', key: 'E', accent: SILVER, solo: S,
  title: 'Dear Cancer: | *it’s okay.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'capricorn', chip: 'ALIGNED' },
  group: { cap: 'Soft heart. | *Strong shell.*', mood: 'heart' },
  lesson: { text: 'Care for yourself | the way *you care for us.*', chip: 'HEART: HELD' },
  last: {
    text: 'Capricorn packed | *the lunch* this time.',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
