// r2t0154: star_talk ROLLCALL, "The signs | go bowling." (~57 s vertical, signs3kit social cut, music: lofi · D).
// Ending: 'callback'.
//   0.0–3.6    "The signs | *go bowling.*"
//   3.6–49.2   ♈ bowled before the pins were set · ♉ won't return the comfy shoes · ♊ two balls at once · ♋ bumpers up for
//              everyone's feelings · ♌ one strike, bowed for ten minutes · ♍ polished the ball between throws · ♎ matched
//              the shoes to the outfit · ♏ silent, focused, bowled a 300 · ♐ threw it out of the building · ♑ a spreadsheet
//              of everyone's scores · ♒ bowled backwards, still a strike · ♓ gutter ball, cried for the ball
//  49.2        "Twelve players. | *Zero rules.*"
//  52.6        callback: "The ball said | *it's okay.*"  Pisces's gutter ball rolls back to comfort them.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#ff8fb1', L = { x: -160 }, R = { x: 160 }
const PIN = ['.WW.', 'WWWW', '.WW.', '.RR.', '.WW.', 'WWWW', 'WWWW', 'WWWW', '.WW.']
const PIN_C = { W: CREAM, R: RED }
const BALL = ['..BBBB..', '.BBBBBB.', 'BBKBKBBB', 'BBBKBBBB', 'BBBBBBBB', 'BBBBBBBB', '.BBBBBB.', '..BBBB..']
const SHOE = ['.RRRRR......', 'RRWWWRR.....', 'RRWWWRRRRRR.', 'RRRRRRRRRRRR', 'KKKKKKKKKKKK']

function ball(x, cx, cy, cell, col = '#6fc3ff', rot = 0) { drawBits(x, BALL, { B: col, K: INK }, cx, cy, cell, { rot }) }
function pins(x, cx, cy, cell, fall = 0, t = 0) {
  const dx = cell * 5.2, dy = cell * 2.6
  let n = 0
  for (let r = 2; r >= 0; r--) for (let k = 0; k <= r; k++, n++) {
    const px = cx + (k - r / 2) * dx, py = cy - r * dy
    drawBits(x, PIN, PIN_C, px + fall * Math.sin(n * 2.1) * 140, py - fall * Math.abs(Math.cos(n * 1.7)) * 180, cell, { rot: fall * (n % 2 ? 1.4 : -1.4) })
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Bowled before | *the pins were set.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: L, hops: [0.3],
    front(x, t, lt, P) {
      const p = prog(lt, 0.2, 0.8)
      if (p > 0 && p < 1) ball(x, lerp(500, 980, p), 1060, 14, RED, p * 12)
      const d = ease.outCubic(prog(lt, 0.9, 1.4))
      if (d > 0) pins(x, 800, 1060 - (1 - d) * 300, 17, 0)
      label(x, 790, 680, 'TURN: NOT YET', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Won’t return | *the comfy shoes.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SHOE, { R: RED, W: CREAM, K: INK }, 740, 1000, 18 * k)
      drawBits(x, SHOE, { R: RED, W: CREAM, K: INK }, 860, 1040, 18 * k)
      label(x, 790, 760, 'SIZE 9 · MINE NOW', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Bowled with both hands. | *Two balls at once.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const p = prog(lt, 0.5, 1.6)
      ball(x, lerp(560, 900, p), 960 + Math.sin(p * 9) * 40, 14, GOLD, p * 10)
      ball(x, lerp(560, 900, p), 1080 - Math.sin(p * 9) * 40, 14, MINT, -p * 10)
      label(x, 790, 700, 'BOTH: GUTTER', pop01(t, P.t0 + 1.7 * 1.29, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Bumpers up. | *For everyone’s feelings.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 980, 340, 280, k, { bg: '#e8c68a', rot: 0 }, () => { x.fillStyle = PINK; x.fillRect(-170, -140, 30, 280); x.fillRect(140, -140, 30, 280); x.fillStyle = '#d2ad6e'; for (let i = -1; i <= 1; i++) x.fillRect(i * 46 - 2, -140, 4, 280) })
      ball(x, 790, lerp(1080, 900, prog(lt, 0.6, 1.6)), 12, SKYB)
      label(x, 790, 680, 'NOBODY GETS HURT', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'One strike. | Bowed for *ten minutes.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      pins(x, 810, 1080, 16, ease.outCubic(prog(lt, 0.3, 0.8)))
      label(x, 790, 680, 'STRIKE!', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 54, bg: GOLD, rot: -0.05 })
      bubble(x, 800, 860, 'thank you, | thank you.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: CREAM, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Polished the ball | *between every throw.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      ball(x, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), '#7dffb0')
      const w = Math.sin(t * 14) * 60
      card(x, 790 + w, 860, 120, 80, pop01(t, P.t0 + 0.5, 0.3, 2), { bg: CREAM, rot: 0.2 })
      sparkles(x, t, 790, 900, P.t0 + 1.4 * 1.29, 7, 150, 0.3)
      label(x, 790, 1130, 'SHINE: 100%', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Matched the shoes | *to the outfit.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SHOE, { R: PINK, W: LAV, K: INK }, 740, 980, 18 * k)
      drawBits(x, SHOE, { R: PINK, W: LAV, K: INK }, 860, 1020, 18 * k)
      label(x, 790, 760, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.1) hearts(x, t, 800, 960, P.t0 + 1.1 * 1.29, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'scorpio', cap: 'Silent. Focused. | Bowled *a perfect game.*', mood: 'neutral', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 820, 340, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: NIGHT, rot: 0 }, () => {
        txt(x, '♏︎ SCORPIO', 0, -80, { size: 30, font: MONO, weight: 700, color: CREAM })
        const n = Math.min(300, Math.floor(Math.max(0, lt - 0.4) * 300))
        txt(x, String(n), 0, 30, { size: 100, font: MONO, weight: 700, color: n >= 300 ? GOLD : MINT })
      })
      label(x, 790, 1100, 'NOT ONE WORD', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Threw it so hard | it *left the building.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [-1, -1], star: R, hops: [0.6],
    front(x, t, lt, P) {
      const p = prog(lt, 0.6, 1.4)
      if (p > 0 && p < 1) ball(x, lerp(560, 200, p), lerp(950, 300, p), 16 * (1 - 0.5 * p), ORANGE, p * 14)
      if (p >= 1) { sparkles(x, t, 200, 560, P.t0 + 1.4 * 1.29, 6, 120, 0.2); label(x, 320, 640, 'LANE 7 → SKY', 1, { size: 34, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 }) }
      bubble(x, 320, 1050, 'oops! | again!', pop01(t, P.t0 + 1.6 * 1.29, 0.25, 2.2), { size: 40, col: CREAM, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Kept a spreadsheet | *of everyone’s scores.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      card(x, 330, 860, 320, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        x.fillStyle = GREEN; x.fillRect(-160, -190, 320, 50)
        txt(x, 'SEASON STATS', 0, -165, { size: 26, font: MONO, weight: 700, color: CREAM })
        x.strokeStyle = GREY; x.lineWidth = 2
        for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(-150, -110 + i * 50); x.lineTo(150, -110 + i * 50); x.stroke() }
        x.beginPath(); x.moveTo(-30, -140); x.lineTo(-30, 160); x.stroke()
        for (let i = 0; i < 5; i++) if (lt > 0.5 + i * 0.2) { x.fillStyle = [PINK, GOLD, SKYB, MINT, LAV][i]; x.fillRect(-140, -98 + i * 50, 90, 26); x.fillStyle = INK; x.fillRect(0, -98 + i * 50, 40 + ((i * 37) % 90), 26) }
      })
      label(x, 330, 1120, 'Q2 FORECAST', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Bowled backwards. | *Still a strike.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [-1, 0], star: L,
    front(x, t, lt, P) {
      const p = prog(lt, 0.3, 1.0)
      if (p > 0 && p < 1) ball(x, lerp(500, 950, p), 1060, 14, '#6fc3ff', -p * 12)
      pins(x, 820, 1080, 16, ease.outCubic(prog(lt, 1.0, 1.4)))
      label(x, 790, 680, 'HOW??', pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.4), { size: 50, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Gutter ball. | Cried *for the ball.*', mood: 'wide', tears: lt => lt < 1.0 ? 1 : 3, look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      x.fillStyle = 'rgba(20,12,48,0.6)'; x.fillRect(520, 1120, 440, 40)
      const p = prog(lt, 0.2, 1.3)
      ball(x, lerp(560, 920, p), 1140, 12, LAV, p * 10)
      bubble(x, 790, 820, 'it was | doing its best!', pop01(t, P.t0 + 1.0 * 1.29, 0.25, 2.2), { size: 38, col: CREAM, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0154', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs | *go bowling.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve players. | *Zero rules.*' },
  last: {
    text: 'The ball said | *it’s okay.*',
    draw(x, t, lt) {
      const r = ease.outCubic(prog(lt, 0.3, 1.2))
      ball(x, lerp(1000, 720, r), 1150, 30, LAV, -r * 8)
      bubble(x, 740, 900, 'it’s okay!', pop01(t, t - lt + 1.3, 0.25, 2.2), { size: 46, col: CREAM, tail: 'bc' })
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 330, 1120, 280 * k, { mood: lt > 1.6 ? 'heart' : 'wide', look: [1, 0], seed: 47, tears: lt > 1.6 ? 1 : 2, hops: [t - lt + 1.8] })
      if (lt > 1.6) hearts(x, t, 330, 960, t - lt + 1.6, { n: 5, life: 1.8, spread: 140, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
