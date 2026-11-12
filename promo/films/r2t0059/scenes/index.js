// r2t0059: star_talk, BELIKE (twelve signs), "Sunburnt zodiacs | be like." (~57 s vertical, signs3kit, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme version of itself with a sunburn.
//   0.0–3.6    "Sunburnt zodiacs | *be like.*"
//   3.6–49.2   raced the sun, lost · napped on the beach, woke up toast · burnt on the left side only · burnt, still put
//              sunscreen on you · called it a golden glow (profile pic: updated) · made a sunburn spreadsheet · "is it cute?"
//              · blocked the sun · burnt on four continents · a perfect laptop-shaped tan · burn shaped like a constellation
//              · cried about it, aloe helped
//  49.2        "Nobody | *reapplied.*"
//  52.6        CALLBACK: "Taurus? | *Still napping.*"  the toast comes back, Taurus asleep under a beach umbrella.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', SUNC = '#ffb347', BROWN = '#8a4a2e', GREEN = '#7ee08a', BURN = '#ff5f57'

const SUN = ['..Y.Y.Y..', '.........', 'Y.YYYYY.Y', '..YYYYY..', 'Y.YYYYY.Y', '..YYYYY..', 'Y.YYYYY.Y', '.........', '..Y.Y.Y..']
const TOAST = ['.BBBBBBB.', 'BBTTTTTBB', 'BTTTTTTTB', 'BTTTTTTTB', 'BTTTTTTTB', 'BTTTTTTTB', 'BBBBBBBBB']
const TOAST_C = { B: BROWN, T: '#d99a4e' }
const BOTTLE = ['..KK..', '..KK..', '.WWWW.', 'WOOOOW', 'WOWWOW', 'WOWWOW', 'WOOOOW', 'WOOOOW', '.WWWW.']
const BOTTLE_C = { K: INK, W: BONE, O: SUNC }
const ALOE = ['G...G...G', 'GG..G..GG', '.G.GGG.G.', '.GGGGGGG.', '..GGGGG..', '..PPPPP..', '..PPPPP..', '...PPP...']
const UMB = ['....RRRRR....', '..RRWWRRWWR..', '.RWWRRWWRRWR.', 'RRRRRRRRRRRRR', '......K......', '......K......', '......K......', '......K......', '......K......']
function sun(x, cx, cy, cell, k, t) { drawBits(x, SUN, { Y: GOLD }, cx, cy, cell * k, { rot: t * 0.4 }) }
function sheet(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-156, -136, 312, 272); x.fillStyle = BONE; x.fillRect(-148, -128, 296, 256)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText('REDNESS BY HOUR', 0, -96)
  x.strokeStyle = '#d8d0c0'; x.lineWidth = 2; for (let j = -60; j <= 100; j += 40) { x.beginPath(); x.moveTo(-128, j); x.lineTo(128, j); x.stroke() }
  for (let i = 0; i < 5; i++) { const h = (30 + i * 28) * ease.outCubic(prog(lt, 0.3 + i * 0.15, 0.6 + i * 0.15)); x.fillStyle = [SUNC, '#ff8a5a', BURN, RED, '#b8222f'][i]; x.fillRect(-116 + i * 50, 104 - h, 36, h) }
  x.restore()
}
function constellation(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const P = [[-110, -60], [-40, -100], [30, -40], [100, -80], [60, 50], [-30, 80]]
  const n = Math.min(P.length, 1 + Math.floor(prog(lt, 0.3, 1.4) * P.length))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); P.slice(0, n).forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
  P.slice(0, n).forEach(([a, b]) => { x.fillStyle = INK; x.fillRect(a - 14, b - 14, 28, 28); x.fillStyle = BURN; x.fillRect(a - 10, b - 10, 20, 20) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Raced the sun. | *Lost.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      sun(x, 790, 760, 22, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 1040, 'SPF: SKIPPED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: BURN, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Napped on the beach. | *Woke up toast.*', mood: lt => lt > 1.3 ? 'wide' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TOAST, TOAST_C, 790, 860, 26 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1080, 'DONE: CRISPY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SUNC, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Burnt on | *one side only.*', mood: 'wink', look: [-1, 0], star: { x: 0 },
    back(x, t, lt, P) {
      const a = 0.35 * ease.outCubic(prog(lt, 0.3, 0.9))
      x.fillStyle = `rgba(255,95,87,${a.toFixed(3)})`; x.fillRect(540, 640, 220, 440)
    },
    front(x, t, lt, P) {
      label(x, 310, 720, 'SHADE', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 720, 'SUN', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: BURN, color: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Burnt. Still put | *sunscreen on you.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, BOTTLE_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      bubble(x, 790, 650, 'you first!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Called it | a *golden glow.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      sparkles(x, t, 380, 860, P.t0 + 0.5, 9, 200, 0.4)
      label(x, 790, 780, '✦ GLOWING', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 42, bg: GOLD, font: MONO, weight: 700 })
      label(x, 790, 940, 'PROFILE PIC: NEW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Made a | *sunburn spreadsheet.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Asked everyone: | *"Is it cute?"*', mood: 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'is it cute? | be honest.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 980, 'POLL: OPEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Blocked the sun. | *Everywhere.*', mood: 'squint', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sun(x, 790, 760, 20, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 1000, 'SUN: BLOCKED', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 38, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Burnt on | *four continents.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      ;['BEACH 1', 'BEACH 2', 'BEACH 3', 'BEACH 4'].forEach((w, i) => label(x, 320 + (i % 2 ? 40 : -30), 660 + i * 130, w, pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2.2), { size: 32, bg: [SUNC, SKYB, PINK, GREEN][i], rot: i % 2 ? 0.06 : -0.05, font: MONO, weight: 700 }))
    } },
  { sign: 'capricorn', cap: 'Laptop-shaped tan. | *Worked through it.*', mood: 'neutral', look: [-1, 1], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = BURN; x.fillRect(-142, -102, 284, 204)
        x.fillStyle = INK; x.fillRect(-96, -66, 192, 132); x.fillStyle = BONE; x.fillRect(-88, -58, 176, 116)
        x.restore()
      }
      label(x, 320, 1080, 'WORK TAN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GREEN, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Burn shaped like | *a constellation.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      constellation(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1060, 'NAMED IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried about it. | *Aloe helped.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: lt => lt < 1.3 ? 3 : 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ALOE, { G: '#4fbf5a', P: '#c96a3a' }, 790, 880, 24 * pop01(t, P.t0 + 1.0, 0.3, 2))
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2t0059', key: 'D', accent: BURN, ending: 'callback',
  title: 'Sunburnt zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *reapplied.*' },
  last: {
    text: 'Taurus? | *Still napping.*',
    draw(x, t, lt) {
      drawBits(x, UMB, { R: RED, W: BONE, K: INK }, 560, 980, 26 * pop01(t, t - lt + 0.3, 0.35, 2))
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 480, 1130, 230 * k, { mood: 'sleepy', seed: 40 })
      drawBits(x, TOAST, TOAST_C, 760, 1160, 16 * pop01(t, t - lt + 1.1, 0.3, 2), { rot: 0.1 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
