// r2t0382: star_talk, SOLO (cancer), "Cancer coworkers | be like." (topic: Your Cancer coworker be like; signs3kit social cut,
// music: lofi · E). Ending: callback (the soup comes back).
//   soup for the whole office · your dog's birthday cake · a desk of photos of their mom · you sneezed, here's a blanket
//   · one small note, moody till Thursday · calls the team "my babies" · the emergency snack drawer
//   · the seating plan, by compatibility · still has the welcome card from 2014
//   group "Office mom. | Full-time."   last "Leftovers? | Always."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', SLATE = '#9aa5c4', ACC = '#8fe3ff'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const pal = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 13, ...o }) }

const POT = ['.KKKKKKKKKK.', 'KKKKKKKKKKKK', '.RRRRRRRRRR.', 'RRRRRRRRRRRR', 'RRRWRRRRRRRR', '.RRRRRRRRRR.', '.RRRRRRRRRR.', '..RRRRRRRR..']
const POT_C = { K: '#6b62a8', R: '#e23d4e', W: '#ff9aa6' }
const CAKE = ['....F....', '....Y....', '.PPPPPPP.', 'PWPWPWPWP', 'CCCCCCCCC', 'CCCCCCCCC', 'PPPPPPPPP', 'CCCCCCCCC', 'CCCCCCCCC']
const CAKE_C = { F: ORANGE, Y: GOLD, P: PINK, W: '#ffffff', C: CREAM }
const BLANKET = ['LLLLLLLLLLLL', 'LMLLMLLMLLML', 'LLLLLLLLLLLL', 'LLMLLMLLMLLL', 'LLLLLLLLLLLL', 'LMLLMLLMLLML']
const BLANKET_C = { L: '#b7a6ff', M: '#fff4e2' }
const CLOUD = ['...WWWW.....', '.WWWWWWWW...', 'WWWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const COOKIE = ['.BBBB.', 'BBKBBB', 'BBBBKB', 'BKBBBB', '.BBBB.']
const COOKIE_C = { B: '#e8a24a', K: '#5b2e1a' }

/** steam curls rising */
function steam(x, t, cx, cy) {
  x.save(); x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 7; x.lineCap = 'round'
  for (let i = 0; i < 3; i++) {
    const ph = ((t * 0.8 + i / 3) % 1 + 1) % 1, bx = cx + (i - 1) * 50
    x.globalAlpha = Math.sin(Math.PI * ph); x.beginPath()
    for (let j = 0; j <= 8; j++) { const yy = cy - j * 12 - ph * 60, xx = bx + Math.sin(j * 0.9 + t * 3 + i) * 12; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
    x.stroke()
  }
  x.restore()
}
/** a framed photo (a tiny star inside) */
function photo(x, t, cx, cy, s, rot, id) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-s / 2 - 5, -s * 0.6 - 5, s + 10, s * 1.2 + 10)
  x.fillStyle = GOLD; x.fillRect(-s / 2, -s * 0.6, s, s * 1.2)
  x.fillStyle = '#2a2350'; x.fillRect(-s / 2 + 8, -s * 0.6 + 8, s - 16, s * 1.2 - 16)
  x.restore()
  signChar(x, t, id, cx, cy + 4, s * 0.7, { mood: 'happy', glyph: false, glow: 0.4, seed: Math.round(cx) })
}
/** an open desk drawer stuffed with snacks */
function drawer(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -70, 340, 170)
  x.fillStyle = '#8a4a2e'; x.fillRect(-162, -62, 324, 154)
  x.fillStyle = '#5b2e1a'; x.fillRect(-146, -48, 292, 60)
  const cols = [ORANGE, PINK, MINT, GOLD, SKYB, LAV]
  for (let i = 0; i < 7; i++) { x.fillStyle = INK; x.fillRect(-140 + i * 41, -96 - (i % 3) * 14, 38, 80); x.fillStyle = cols[i % 6]; x.fillRect(-136 + i * 41, -92 - (i % 3) * 14, 30, 72) }
  x.fillStyle = '#c98f5a'; x.fillRect(-30, 46, 60, 14)
  x.restore()
}
/** a little greeting card */
function card(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -150, 276, 320)
  x.fillStyle = INK; x.fillRect(-142, -166, 284, 328)
  x.fillStyle = '#d9c9a8'; x.fillRect(-134, -158, 268, 312)
  x.fillStyle = '#b89a6a'; for (let i = 0; i < 9; i++) x.fillRect(-120 + (i * 53) % 230, -140 + (i * 71) % 270, 10, 10)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('WELCOME', 0, -40); x.fillText('TO THE', 0, 8); x.fillText('TEAM!', 0, 56)
  x.font = `700 26px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('– 2014', 0, 116)
  x.restore()
}

const S = 'cancer', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Brought soup. | For *the whole office.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.5) steam(x, t, 790, 790)
      L(x, 790, 1110, 'SOUP FOR 40', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 40)
    } },
  { sign: S, cap: 'Remembered your dog’s | *birthday.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1100, 'HAPPY 4TH, BISCUIT', pop01(t, P.t0 + 0.9, 0.3, 2.4), PINK, 0.04, 30)
      sparkles(x, t, 790, 760, P.t0 + 1.0, 7, 160, 0.3)
    } },
  { sign: S, cap: 'Desk has 60 photos. | All *of their mom.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.2) / 0.18) + (lt > 0.2 ? 1 : 0))
      for (let i = 0; i < n; i++) photo(x, t, 700 + (i % 3) * 110, 640 + Math.floor(i / 3) * 170, 90, ((i * 37) % 7 - 3) * 0.03, 'cancer')
      bubble(x, 790, 1060, 'that’s mom | at the beach', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'You sneezed once. | Cancer *brought a blanket.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      pal(x, t, 'libra', 800, 900, 210, k, { mood: lt > 1.2 ? 'heart' : 'squint', look: [-1, 0] })
      if (k > 0.5) bubble(x, 800, 620, 'achoo', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: BONE, tail: 'bc' })
      const d = ease.outCubic(prog(lt, 0.8, 1.2))
      if (lt > 0.8) drawBits(x, BLANKET, BLANKET_C, 800, lerp(560, 950, d), 22, { rot: 0.04 })
      L(x, 800, 1140, '+ TEA + SOCKS', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'One small note. | Moody *till Thursday.*', mood: lt => lt > 0.8 ? 'neutral' : 'happy', look: lt => lt > 0.8 ? [0, 1] : [1, 0], star: ST,
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      drawBits(x, CLOUD, { W: SLATE }, F.x, F.top - 70, 16 * k)
      if (k > 0.9) { x.save(); x.fillStyle = SKYB; for (let i = 0; i < 6; i++) { const ph = ((t * 1.4 + i * 0.37) % 1 + 1) % 1; x.fillRect(F.x - 80 + i * 32, F.top - 30 + ph * 110, 5, 16) } x.restore() }
    },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'small typo, | slide 3', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: BONE, tail: 'bl' })
      L(x, 790, 960, 'MOOD: MON–THU', pop01(t, P.t0 + 1.2, 0.3, 2.4), SLATE, 0.04, 36)
    } },
  { sign: S, cap: 'Calls the whole team | *“my babies.”*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const ids = ['aries', 'virgo', 'aquarius']
      ids.forEach((id, i) => pal(x, t, id, 690 + i * 115, 1010 - (i % 2) * 30, 120, pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2), { mood: i === 1 ? 'squint' : 'happy', look: [-1, 0], seed: 30 + i }))
      bubble(x, 790, 680, 'my babies!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.1, { n: 5, life: 1.6, spread: 260, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Keeps a snack drawer. | For *your feelings.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawer(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 650, 'EMERGENCY SNACKS', pop01(t, P.t0 + 0.8, 0.3, 2.4), RED, -0.04, 32)
      drawBits(x, COOKIE, COOKIE_C, 790, 790 - 20 * Math.sin(t * 3), 14 * pop01(t, P.t0 + 1.3, 0.3, 2))
    } },
  { sign: S, cap: 'Made the seating plan. | By *compatibility.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 610, '✦ SEATING BY SIGN', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 30)
      const pairs = [['cancer', 'pisces'], ['leo', 'aries'], ['virgo', 'taurus']]
      pairs.forEach(([a, b], i) => {
        const k = pop01(t, P.t0 + 0.5 + i * 0.25, 0.3, 2), y = 740 + i * 140
        if (k <= 0.01) return
        x.save(); x.fillStyle = INK; x.fillRect(650, y + 30, 280, 18); x.fillStyle = '#c98f5a'; x.fillRect(654, y + 33, 272, 12); x.restore()
        pal(x, t, a, 720, y, 110, k, { mood: 'happy', seed: 40 + i, tears: a === 'pisces' ? 1 : 0 })
        pal(x, t, b, 860, y, 110, k, { mood: 'happy', seed: 50 + i, tears: b === 'pisces' ? 1 : 0 })
        hearts(x, t, 790, y - 10, P.t0 + 0.8 + i * 0.25, { n: 2, life: 1.0, spread: 40, cell: 5, seed: i })
      })
    } },
  { sign: S, cap: 'Still has the card | from *2014.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', tears: lt => lt > 1.4 ? 1 : 0, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05)
      bubble(x, 790, 1130, 'I keep everything', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0382', key: 'E', accent: ACC, solo: S,
  title: 'Cancer coworkers | *be like.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Office mom. | *Full-time.*', mood: 'heart' },
  last: {
    text: 'Leftovers? | *Always.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.35, 2)
      drawBits(x, POT, POT_C, 540, 1000, 26 * k)
      if (k > 0.9) steam(x, t, 540, 870)
      L(x, 540, 1230, 'SOUP FOR 41', pop01(t, t - lt + 1.3, 0.3, 2.4), GOLD, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
