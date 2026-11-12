// r2t0371: star_talk, ROLLCALL, "The signs | at *sunrise.*" (signs3kit social cut, music: lofi · C). Ending: callback (Taurus wakes up at noon).
//   ♈ raced the sun up, won · ♉ came for the sunrise, stayed in the blanket · ♊ voice-noted it to every match
//   · ♋ packed you a thermos, and a backup thermos · ♌ stood in front of it, better lighting · ♍ the sun was two minutes late
//   · ♎ pink or orange? asked their match · ♏ says it's overrated, hasn't missed one · ♐ already booked the next one
//   · ♑ put the sunrise in their calendar · ♒ rooting for the moon, underdog · ♓ a brand new day?! sobbing
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

/** a pixel sun: a stepped disc with a glow and slowly turning rays */
function sun(x, t, cx, cy, r, k, { rays = true, face = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const g = x.createRadialGradient(0, 0, r * 0.4, 0, 0, r * 2.4)
  g.addColorStop(0, 'rgba(255,210,90,0.55)'); g.addColorStop(1, 'rgba(255,140,90,0)')
  x.fillStyle = g; x.fillRect(-r * 2.4, -r * 2.4, r * 4.8, r * 4.8)
  if (rays) {
    x.save(); x.rotate(t * 0.35)
    x.fillStyle = '#ffd23a'
    for (let i = 0; i < 8; i++) { x.save(); x.rotate(i * Math.PI / 4); x.fillStyle = INK; x.fillRect(-12, -r - 52, 24, 40); x.fillStyle = '#ffd23a'; x.fillRect(-7, -r - 47, 14, 30); x.restore() }
    x.restore()
  }
  const c = Math.max(4, r / 7)
  x.fillStyle = INK
  for (let j = -7; j <= 7; j++) { const w = Math.round(Math.sqrt(Math.max(0, 56 - j * j))); x.fillRect(-(w + 1) * c, j * c - c / 2, (2 * w + 2) * c, c + 0.5) }
  for (let j = -6; j <= 6; j++) { const w = Math.round(Math.sqrt(Math.max(0, 44 - j * j))); x.fillStyle = j < -2 ? '#fff1a8' : j < 3 ? '#ffd23a' : ORANGE; x.fillRect(-w * c, j * c - c / 2, 2 * w * c, c + 0.5) }
  if (face) { x.fillStyle = INK; x.fillRect(-3 * c, -1.5 * c, c, c * 1.6); x.fillRect(2 * c, -1.5 * c, c, c * 1.6); x.fillRect(-2 * c, 2 * c, 4 * c, c * 0.8) }
  x.restore()
}
/** a dark hill along the bottom of the panel (the sun rises behind it) */
function hill(x, k, y = 1060) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = '#2a2350'; x.beginPath(); x.moveTo(120, 1220); x.lineTo(120, y + 40)
  for (let i = 0; i <= 20; i++) { const fx = 120 + i * 43, fy = y + 30 * Math.sin(i * 0.55) - 20 * Math.sin(i * 0.21); x.lineTo(fx, fy) }
  x.lineTo(960, 1220); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(120, y + 140, 840, 80)
  x.restore()
}
/** a pixel phone with a header bar and rows: [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, wave = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.18, k * 1.18)
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

const THERMOS = ['.KKKK.', 'KRRRRK', 'KKKKKK', 'KSSSSK', 'KSWSSK', 'KSWSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KKKKKK']
const PLANE = ['......WW.......', '......WWW......', 'WW....WWWW.....', 'WWWWWWWWWWWWWW.', '.WWWWWWWWWWWWWWB', 'WW....WWWW.....', '......WWW......', '......WW.......']
const MOON = ['...MMMM..', '.MMMMM...', 'MMMMM....', 'MMMMM....', 'MMMMM....', 'MMMMMM...', '.MMMMMMM.', '...MMMM..']
const BLANKET = ['.QQQQQQQQQQQQQQ.', 'QQWQQQQWQQQQWQQQ', 'QQQQWQQQQWQQQQWQ', 'QWQQQQWQQQQWQQQQ', 'QQQQWQQQQWQQQQWQ', '.QQQQQQQQQQQQQQ.']
const BLANKET_C = { Q: '#ff8fb1', W: CREAM }

/** a sticky-note calendar event */
function event(x, cx, cy, k, lines, { bg = MINT, rot = -0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 316, 212)
  x.fillStyle = INK; x.fillRect(-160, -110, 320, 220); x.fillStyle = CREAM; x.fillRect(-152, -102, 304, 204)
  x.fillStyle = bg; x.fillRect(-152, -102, 14, 204)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([s, sz, col], i) => { x.font = `${sz > 30 ? 800 : 700} ${sz}px ${sz > 30 ? INTER : MONO}`; x.fillStyle = col || INK; x.fillText(s, -124, -60 + i * 56) })
  x.restore()
}
/** a hand-held protest sign */
function placard(x, t, cx, cy, k, text, bg) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05 * Math.sin(t * 4)); x.scale(k, k)
  x.fillStyle = '#8a4a2e'; x.fillRect(-6, 40, 12, 150)
  x.fillStyle = INK; x.fillRect(-120, -70, 240, 120); x.fillStyle = bg; x.fillRect(-112, -62, 224, 104)
  x.fillStyle = INK; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -10)
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Raced the sun | up the hill. *Won.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', star: { x: -150, y: 40 }, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      sun(x, t, 780, lerp(1150, 900, ease.outCubic(prog(lt, 0.2, 2.2))), 70, pop01(t, P.t0 + 0.1, 0.3, 2), { rays: lt > 1.4 })
      hill(x, 1, 1020)
    },
    front(x, t, lt, P) {
      L(x, 780, 600, '1ST: ARIES', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.05, 44)
      L(x, 780, 690, '2ND: THE SUN', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 28)
      sparkles(x, t, 380, 860, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: 'taurus', cap: 'Came for the sunrise. | Stayed *in the blanket.*', mood: 'sleepy', star: { x: -150, y: 20 },
    back(x, t, lt, P) { sun(x, t, 790, 760, 60, pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P, F) {
      drawBits(x, BLANKET, BLANKET_C, F.x, F.cy + 125, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1040, 'SUNRISE: MISSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 32)
      bubble(x, 560, 620, 'five more | minutes', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Voice-noted the sunrise | to *every match.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, 790, 860, k, { head: '✦ MATCHES', headCol: GOLD, lines: [
        ['▶ ıllıllı 4:12', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['▶ ıllıllı 6:30', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2), true],
        ['▶ ıllıllı 9:58', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2), true],
      ] })
      L(x, 790, 1110, 'SENT TO: 14', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, -0.04, 32)
      bubble(x, 420, 620, 'and NOW | it’s pink!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Packed you a thermos. | And *a backup thermos.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, THERMOS, { K: INK, R: RED, S: '#8fe3ff', W: CREAM }, 700, 900, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.06 })
      drawBits(x, THERMOS, { K: INK, R: '#2fc79a', S: LAV, W: CREAM }, 880, 920, 20 * pop01(t, P.t0 + 1.1, 0.3, 2.2), { rot: 0.08 })
      L(x, 700, 660, 'FOR YOU', pop01(t, P.t0 + 0.6, 0.3, 2), MINT, -0.05, 30)
      L(x, 880, 1150, 'IN CASE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.05, 30)
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 4, life: 1.5, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Stood in front of it. | *Better lighting.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: 0, y: -10, s: 320 }, hops: [1.1],
    back(x, t, lt, P) { sun(x, t, 540, 800, 120, pop01(t, P.t0 + 0.1, 0.4, 1.8)) },
    front(x, t, lt, P) {
      L(x, 260, 620, 'BACKLIT', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.08, 40)
      bubble(x, 800, 1110, 'you’re welcome', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, 540, 820, P.t0 + 1.0, 8, 230, 0.1)
    } },
  { sign: 'virgo', cap: 'The sunrise was | *two minutes late.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) { sun(x, t, 790, lerp(1150, 960, ease.outCubic(prog(lt, 1.0, 2.3))), 60, pop01(t, P.t0 + 0.1, 0.3, 2), { rays: false }); hill(x, 1, 1060) },
    front(x, t, lt, P) {
      const late = lt > 1.0
      L(x, 790, 620, late ? '6:44' : '6:42', late ? pop01(t, P.t0 + 1.0, 0.3, 2.4) : pop01(t, P.t0 + 0.2, 0.3, 2), late ? RED : MINT, -0.04, 60, late ? CREAM : INK)
      L(x, 790, 740, 'EXPECTED: 6:42', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, 0.03, 26)
      L(x, 790, 860, 'COMPLAINT: FILED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.05, 30)
    } },
  { sign: 'libra', cap: 'Pink or orange? | Asked *their match.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, 790, 860, k, { head: '✦ MATCH', headCol: PINK, lines: [
        ['pink or orange??', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true],
        ['…both?', MINT, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['too hard. bye.', BONE, pop01(t, P.t0 + 1.6, 0.25, 2.2), true],
      ] })
      const pinkOn = Math.floor(lt * 2.5) % 2
      L(x, 330, 600, pinkOn ? 'PINK?' : 'ORANGE?', pop01(t, P.t0 + 0.5, 0.3, 2), pinkOn ? PINK : ORANGE, -0.06, 34)
    } },
  { sign: 'scorpio', cap: 'Says it’s overrated. | Hasn’t *missed one.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) { sun(x, t, 790, 1000, 56, pop01(t, P.t0 + 0.1, 0.3, 2), { rays: false }); hill(x, 1, 1060) },
    front(x, t, lt, P) {
      bubble(x, 560, 620, 'meh.', pop01(t, P.t0 + 0.35, 0.25, 2.4), { size: 60, col: LAV, tail: 'bl' })
      L(x, 790, 790, 'ATTENDANCE', pop01(t, P.t0 + 1.0, 0.3, 2), BONE, 0.04, 28)
      L(x, 790, 870, '365 / 365', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#c97bff', -0.04, 46, CREAM)
    } },
  { sign: 'sagittarius', cap: 'Already booked | the *next sunrise.*', mood: 'sparkle', star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      const fl = ease.inOutCubic(prog(lt, 0.4, 2.2))
      drawBits(x, PLANE, { W: CREAM, B: SKYB }, lerp(560, 880, fl), lerp(1000, 660, fl), 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.4 })
      L(x, 790, 1080, 'NEXT: OTHER SIDE', pop01(t, P.t0 + 0.6, 0.3, 2), MINT, -0.04, 30)
      L(x, 790, 1150, 'OF THE PLANET', pop01(t, P.t0 + 0.8, 0.3, 2), MINT, 0.03, 30)
      bubble(x, 560, 620, 'see ya!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Put the sunrise | *in their calendar.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      event(x, 790, 780, pop01(t, P.t0 + 0.25, 0.3, 2), [['06:41', 44], ['SUNRISE', 30], ['(30 min)', 24, '#6b62a8']], { bg: MINT })
      event(x, 810, 1040, pop01(t, P.t0 + 1.2, 0.3, 2.2), [['07:11', 44], ['BACK TO WORK', 26]], { bg: RED, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Rooting for the moon. | *Underdog.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const leave = ease.inCubic(prog(lt, 0.6, 2.4))
      drawBits(x, MOON, { M: '#e6e0ff' }, 820, lerp(700, 1080, leave), 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      placard(x, t, 560, 660, pop01(t, P.t0 + 0.6, 0.3, 2), 'GO MOON!', MINT)
      L(x, 800, 1150, 'MOON: LEAVING', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'A brand new day?! | *Sobbing.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    back(x, t, lt, P) { sun(x, t, 790, lerp(1120, 880, ease.outCubic(prog(lt, 0.1, 2.0))), 70, pop01(t, P.t0 + 0.1, 0.3, 2)); hill(x, 1, 1040) },
    front(x, t, lt, P) {
      bubble(x, 600, 610, 'it’s SO | beautiful', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      L(x, 790, 1150, 'TISSUES: 0 LEFT', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0371', key: 'C', accent: ORANGE, ending: 'callback',
  title: 'The signs | at *sunrise.*',
  cameos: CAMEOS,
  group: {
    cap: 'Same sun. | *Twelve moods.*',
    draw(x, t, lt) { sun(x, t, 540, lerp(1060, 820, ease.outCubic(prog(lt, 0.2, 2.6))), 90, pop01(t, t - lt + 0.1, 0.5, 1.6)) },
  },
  last: {
    text: 'Taurus woke up. | *It’s noon.*',
    draw(x, t, lt) {
      const t0 = t - lt
      sun(x, t, 790, 640, 70, pop01(t, t0 + 0.2, 0.4, 1.8))
      L(x, 790, 790, '12:00 PM', pop01(t, t0 + 0.9, 0.3, 2.4), GOLD, 0.05, 40)
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) {
        const F = signChar(x, t, 'taurus', 420, 1060, 300 * k, { mood: lt > 1.1 ? 'wide' : 'sleepy', seed: 9, hops: [t0 + 1.2] })
        drawBits(x, BLANKET, BLANKET_C, F.x, F.cy + 125, 22 * k)
      }
      if (lt > 1.2) bubble(x, 760, 1000, 'did I miss it?', pop01(t, t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
