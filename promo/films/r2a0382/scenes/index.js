// r2a0382: star_advice, ADVICE SOLO (cancer), "Cancer, here's your | Monday pep talk." (signs3kit social cut, music: lofi · F).
// Ending: group. Nine warm truths for a Cancer on a Monday, one gag each:
//   Monday is just a day (a smiley sticker on MON) · feeling everything first is a superpower (a cape) · bring a bit of home
//   (a desk plant named Kevin) · cared for everyone all weekend, your turn (a candle) · moody before coffee, allowed
//   · one email at a time · "sounds good." means it's good · we noticed, thank you · every Monday so far, survived.
//   group "Soft heart. | Strong week."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', SLATE = '#9aa5c4', ACC = '#8fe3ff'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const SMILEY = ['..YYYYY..', '.YYYYYYY.', 'YYKYYYKYY', 'YYYYYYYYY', 'YKYYYYYKY', 'YYKKKKKYY', '.YYYYYYY.', '..YYYYY..']
const CAPE = ['RRRRRRRRRRRR', 'RRRRRRRRRRRR', '.RRRRRRRRRR.', '.RRRRRRRRRR.', '..RRRRRRRR..', '..RRRRRRRR..', '...RRRRRR...', '...RR..RR...']
const PLANT = ['..G...G..', '.GGG.GGG.', 'GGGGGGGGG', '.GGGGGGG.', '...GGG...', '.TTTTTTT.', '.TTTTTTT.', '..TTTTT..', '..TTTTT..']
const PLANT_C = { G: '#5fd068', T: '#e07a4a' }
const CANDLE = ['....F....', '...FYF...', '...FYF...', '....K....', '.CCCCCCC.', '.CCCCCCC.', '.CCCCCCC.', '.CCCCCCC.', 'PPPPPPPPP']
const CANDLE_C = { F: ORANGE, Y: '#fff1b0', K: INK, C: '#ffd6e2', P: '#b7a6ff' }
const MUG = ['CCCCCCC..', 'CCCCCCCCC', 'CCWCCCC.C', 'CCCCCCC.C', 'CCCCCCCCC', '.CCCCC...']
const ENV = ['WWWWWWWWWW', 'WKWWWWWWKW', 'WWKWWWWKWW', 'WWWKWWKWWW', 'WWWWKKWWWW', 'WWWWWWWWWW']

/** little steam curls */
function steam(x, t, cx, cy) {
  x.save(); x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 6; x.lineCap = 'round'
  for (let i = 0; i < 2; i++) { const ph = ((t * 0.8 + i / 2) % 1 + 1) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.beginPath(); for (let j = 0; j <= 6; j++) { const yy = cy - j * 12 - ph * 40, xx = cx + (i - 0.5) * 40 + Math.sin(j + t * 3) * 10; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
  x.restore()
}
/** a tear-off calendar page */
function dayPage(x, cx, cy, k, day) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -130, 256, 280)
  x.fillStyle = INK; x.fillRect(-132, -146, 264, 288)
  x.fillStyle = CREAM; x.fillRect(-124, -138, 248, 272)
  x.fillStyle = RED; x.fillRect(-124, -138, 248, 64)
  x.fillStyle = '#fff4e2'; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MONDAY', 0, -104)
  x.fillStyle = INK; x.font = `800 120px ${INTER}`; x.fillText(day, 0, 34)
  x.restore()
}
/** a chalk tally board */
function tally(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260)
  x.fillStyle = '#8a4a2e'; x.fillRect(-162, -122, 324, 244)
  x.fillStyle = '#2f4a3a'; x.fillRect(-148, -108, 296, 216)
  x.strokeStyle = '#efe6d6'; x.lineWidth = 7; x.lineCap = 'round'
  const n = Math.floor(clamp((lt - 0.3) / 1.2) * 20)
  for (let i = 0; i < n; i++) {
    const g = Math.floor(i / 5), r = i % 5, gx = -120 + (g % 2) * 140, gy = -70 + Math.floor(g / 2) * 100
    x.beginPath()
    if (r < 4) { x.moveTo(gx + r * 22, gy - 30); x.lineTo(gx + r * 22, gy + 30) } else { x.moveTo(gx - 10, gy + 24); x.lineTo(gx + 80, gy - 24) }
    x.stroke()
  }
  x.restore()
}
/** a pixel phone with chat chips */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}

const S = 'cancer', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Sunday scaries hit hard? | Monday is *just a day.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      dayPage(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), '13')
      drawBits(x, SMILEY, { Y: GOLD, K: INK }, 880, 960, 11 * pop01(t, P.t0 + 1.1, 0.3, 2.4), { rot: 0.2 })
      L(x, 790, 1100, 'JUST A DAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 36)
    } },
  { sign: S, cap: 'You feel it all first. | *That’s a superpower.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.6],
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      drawBits(x, CAPE, { R: PINK }, F.x + 6 * Math.sin(t * 4), F.cy + 60, 20 * k, { rot: 0.05 * Math.sin(t * 3) })
    },
    front(x, t, lt, P) {
      L(x, 790, 700, 'FEELINGS: MAX', pop01(t, P.t0 + 0.3, 0.3, 2), LAV, -0.04, 36)
      L(x, 790, 900, 'HERO MODE', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.05, 44)
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Miss home already? | Bring *a little with you.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 1120, 'THIS IS KEVIN', pop01(t, P.t0 + 1.0, 0.3, 2.4), BONE, -0.04, 34)
      bubble(x, 790, 640, 'desk = home now', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Cared for all weekend? | *Your turn now.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CANDLE, CANDLE_C, 790, 880, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 640, 'TONIGHT: YOU', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, 0.04, 38)
      L(x, 790, 1120, 'SELF-CARE: BOOKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Moody before coffee? | *Allowed.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, MUG, { C: ACC, W: '#ffffff' }, F.x + 150, F.cy + 60, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.4) steam(x, t, F.x + 140, F.cy + 10)
      const ok = lt > 1.2
      L(x, 790, 760, ok ? 'MOOD: OK!' : 'MOOD: GRUMPY', ok ? pop01(lt, 1.2, 0.3, 2.4) : pop01(t, P.t0 + 0.4, 0.3, 2), ok ? MINT : SLATE, ok ? 0.04 : -0.04, 40)
      bubble(x, 790, 980, 'sip first, | talk later', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Inbox looks scary? | *One email at a time.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), n = 5 - Math.floor(clamp((lt - 0.6) / 1.2) * 4)
      for (let i = 0; i < n; i++) drawBits(x, ENV, { W: CREAM, K: '#6b62a8' }, 790 + (i % 2 ? 12 : -12), 1000 - i * 70, 16 * k, { rot: (i % 3 - 1) * 0.05 })
      L(x, 790, 620, `UNREAD: ${n * 9}`, pop01(t, P.t0 + 0.4, 0.3, 2), RED, 0.04, 34)
    } },
  { sign: S, cap: '“Sounds good.” means | *it sounds good.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BOSS', headCol: SLATE, lines: [
        ['can we chat?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['sure! about?', MINT, pop01(t, P.t0 + 0.7, 0.25, 2.2), true],
        ['your great idea', BONE, pop01(t, P.t0 + 1.2, 0.25, 2.2)],
      ] })
      L(x, 790, 1120, 'NOT IN TROUBLE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Nobody said thanks? | *We noticed.* Thank you.', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(-0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#ffe76a'; x.fillRect(-142, -142, 284, 284)
        x.fillStyle = INK; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THANK', 0, -40); x.fillText('YOU ♡', 0, 24)
        x.font = `700 24px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('– everyone', 0, 100)
        x.restore()
      }
      hearts(x, t, F.x + 40, F.top, P.t0 + 1.0, { n: 5, life: 1.6, spread: 150, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Every Monday so far? | *You made it.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tally(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1060, 'MONDAYS SURVIVED: ALL', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 28)
      sparkles(x, t, 790, 820, P.t0 + 1.6, 7, 200, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0382', key: 'F', accent: ACC, solo: S,
  title: 'Cancer, here’s your | *Monday pep talk.*',
  cameos: CAMEOS,
  ending: 'group',
  group: { cap: 'Soft heart. | *Strong week.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
