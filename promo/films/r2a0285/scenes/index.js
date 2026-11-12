// r2a0285: star_advice, ADVICE ROLLCALL, "Each sign's | favourite small joy." (~57 s vertical, lofi · G)
// Twelve signs, one warm, specific small joy each, with a light visual gag.
//   0.0–3.6    "Each sign’s fave | *small joy.*"
//   3.6–49.2   ♈ first in line · ♉ the first sip of a warm drink · ♊ a long voice note from a best friend · ♋ clean sheets
//              · ♌ a song that feels written about them · ♍ peeling the plastic off something new · ♎ matching socks, first
//              try · ♏ someone remembering the little things · ♐ a stranger's dog says hi · ♑ money in an old coat · ♒ a weird
//              fact nobody asked for · ♓ rain on the window, a happy cry
//  49.2        "Small joys. | *Big feelings.*"
//  52.6        callback: "Virgo saved | *one more to peel.*" a fresh phone comes back, plastic still on.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, GREY, DEEP, GREEN, WOOD, ORANGE, PHONEC } from './props.js'

const ACC = '#ffe08a'
const ST = { x: -170 }
const MUG = ['..S.S...', '.S.S....', '........', 'WWWWWW..', 'WBBBBWWW', 'WBBBBW.W', 'WBBBBWWW', 'WBBBBW..', '.WWWW...']
const MUG_C = { S: '#e8e4f4', W: '#fff4e2', B: '#c98f6a' }
const SOCK = ['.SSS.', '.SPS.', '.SSS.', '.SPS.', '.SSS.', 'SSSS.', 'SSSSS', '.SSSS']
const DOG = ['KK.....KK.', 'KBB...BBK.', '.BBBBBBB..', '.BWBBBWB..', '.BBBKBBB..', '..BBBBB...', '..BBBBBBBB', '..BBBBBBBB', '..B.B..B.B']
const DOG_C = { K: '#8a4a2e', B: '#e0a060', W: INK }
const GIFT = ['...R.R...', '....R....', 'GGGGRGGGG', 'GGGGRGGGG', 'RRRRRRRRR', 'GGGGRGGGG', 'GGGGRGGGG', 'GGGGRGGGG']
const GIFT_C = { R: RED, G: MINT }

/** a new phone with a protective film peeling off from the corner (p 0…1) */
function newPhone(x, cx, cy, k, p, rot = 0.04) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const w = 230, h = 380
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = PHONEC; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = DEEP; x.fillRect(-w / 2 + 12, -h / 2 + 24, w - 24, h - 48)
  // the film: a glossy sheet whose bottom-right corner folds back along a diagonal
  const L = -w / 2 + 12, T = -h / 2 + 24, R = w / 2 - 12, B = h / 2 - 24
  const d = p * (R - L + B - T)
  x.fillStyle = 'rgba(200,230,255,0.28)'
  x.beginPath(); x.moveTo(L, T); x.lineTo(R, T)
  const ax = R, ay = Math.max(T, B - d), bx = Math.max(L, R - d), by = B
  x.lineTo(ax, ay); x.lineTo(bx, by); x.lineTo(L, B); x.closePath(); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(L + 20, T + 20, 14, 120)
  if (p > 0.01 && p < 0.99) {   // the folded flap
    x.fillStyle = 'rgba(235,245,255,0.75)'; x.strokeStyle = INK; x.lineWidth = 3
    x.beginPath(); x.moveTo(ax, ay); x.lineTo(bx, by); x.lineTo(ax - (by - ay) * 0.55, ay - (bx - ax) * 0.0 + (by - ay) * 0.2); x.closePath(); x.fill(); x.stroke()
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Being first in line. | *Every single time.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      label(x, 790, 720, 'NO. 1', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 56, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      card(x, 790, 1000, 380, 30, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: RED, rot: 0 })
      for (const px of [610, 970]) card(x, px, 1040, 24, 140, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: GOLD, rot: 0 })
    } },
  { sign: 'taurus', cap: 'The first sip | *of a warm drink.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { sy: 1 + 0.02 * Math.sin(t * 3) })
      label(x, 790, 1130, 'AHHH.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A long voice note | *from their best friend.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 120, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: MINT, rot: -0.03 }, () => {
        x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -24); x.lineTo(-108, 0); x.lineTo(-140, 24); x.fill()
        for (let i = 0; i < 16; i++) { const hh = 10 + 30 * Math.abs(Math.sin(i * 1.7 + t * 3)); x.fillRect(-90 + i * 14, -hh / 2, 8, hh) }
      })
      label(x, 790, 1040, '14 MINUTES. YES.', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Clean sheets. | *Fresh from the wash.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P, F) { card(x, F.x + 30, F.cy + 140, 420, 120, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#e8e4f4', rot: 0 }, () => { x.fillStyle = SKYB; for (let i = 0; i < 6; i++) x.fillRect(-190 + i * 70, -50, 30, 100) }) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'SO SOFT', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: PINK, rot: 0.05 })
      sparkles(x, t, 600, 1000, P.t0 + 1.0, 7, 200, 0.4, [BONE, SKYB, BONE])
    } },
  { sign: 'leo', cap: 'A song that feels | *written about them.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 5, cell: 9, col: ORANGE, seed: 3 })
      label(x, 790, 760, 'NOW PLAYING: ME', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Peeling the plastic | *off something new.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      newPhone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.5, 1.6)))
      if (lt > 1.6) sparkles(x, t, 800, 880, P.t0 + 1.6 * 1.29, 8, 220, 0.3)
    } },
  { sign: 'libra', cap: 'Matching socks. | *First try.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SOCK, { S: '#ff9fd0', P: LAV }, 730, 900, 22 * k, { rot: -0.12 })
      drawBits(x, SOCK, { S: '#ff9fd0', P: LAV }, 860, 900, 22 * k, { rot: 0.12, sx: -1 })
      label(x, 790, 1130, 'A PERFECT PAIR', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Someone remembering | *the little things.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      card(x, 790, 740, 340, 110, pop01(t, P.t0 + 0.8, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => { txt(x, '“you said you', 0, -20, { size: 28 }); txt(x, 'liked these”', 0, 22, { size: 28 }) })
    } },
  { sign: 'sagittarius', cap: 'A stranger\'s dog | *says hello.*', mood: 'heart', look: [1, 1], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, DOG, DOG_C, lerp(940, 800, ease.outCubic(prog(lt, 0.3, 0.9))), 1000 - Math.abs(Math.sin(t * 8)) * 12, 18 * k)
      bubble(x, 800, 790, 'woof!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 44, col: GOLD, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Cash in an old coat. | *A tiny raise.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const up = ease.outBack(prog(lt, 0.7, 1.1))
      card(x, 790, 960, 260, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#6b7ab0', rot: 0 }, () => { x.fillStyle = '#4a5788'; x.fillRect(-100, -40, 200, 100); x.fillStyle = INK; x.fillRect(-100, -44, 200, 8) })
      if (up > 0.01) card(x, 790, lerp(960, 760, up), 200, 100, 1, { bg: GREEN, rot: -0.08 }, () => { x.fillStyle = '#3f9a50'; x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.fill(); txt(x, '$', 0, 2, { size: 40, color: '#fff4e2' }) })
      sparkles(x, t, 790, 760, P.t0 + 1.1 * 1.29, 6, 150, 0.3)
    } },
  { sign: 'aquarius', cap: 'A weird fact | *nobody asked for.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 700, 'DID YOU KNOW?', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'octopuses have | three hearts!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Rain on the window. | *A happy cry.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 800, 860, 300, 340, k, { bg: WOOD, rot: 0 }, () => {
        x.fillStyle = '#3a4a80'; x.fillRect(-130, -150, 260, 300)
        x.fillStyle = WOOD; x.fillRect(-6, -150, 12, 300); x.fillRect(-130, -6, 260, 12)
        x.fillStyle = SKYB; for (let i = 0; i < 10; i++) { const ph = ((t * 0.8 + i * 0.13) % 1); x.fillRect(-120 + (i * 53) % 240, -150 + ph * 290, 5, 22) }
      })
    } },
]

const F = makeFilm({
  id: 'r2a0285', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign’s fave | *small joy.*',
  cameos: CAMEOS,
  group: { cap: 'Small joys. | *Big feelings.*' },
  last: {
    text: 'Virgo saved | *one more to peel.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 1170, 400 * k, { mood: lt > 1.6 ? 'heart' : 'sparkle', seed: 6, hops: [t0 + 1.7] })
      newPhone(x, 730, 1060, 1.35 * pop01(t, t0 + 0.7, 0.4, 2), ease.inOutCubic(prog(lt, 1.4, 2.6)) * 0.6, -0.05)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
