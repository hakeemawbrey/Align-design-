// r2a0308: star_advice, ADVICE SOLO (sagittarius), "Sagittarius, staying | can be an adventure." (signs3kit social cut, music: lofi · C). Ending: callback (the plant blooms).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** a square sticky note with a few lines of text */
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -134, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = bg; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.25))
  x.restore()
}
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …] */
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
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** little "z z z" drifting up */
function zzz(x, t, cx, cy, { alpha = 1, size = 40 } = {}) {
  x.save(); x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 6) * 8, cy - ph * 120) }
  x.restore()
}
const ST = { x: -170 }

const ACC = '#ffa95e'
const POT = ['KKKKKKKKKK', 'KTTTTTTTTK', '.KTTTTTTK.', '.KTTTTTTK.', '..KTTTTK..', '..KKKKKK..']
const LEAF = ['..GG', '.GGG', 'GGG.', 'GG..']
const FLOWERB = ['.PP.PP.', 'PPPPPPP', 'PPPYPPP', 'PPPPPPP', '.PP.PP.']
const POTCOOK = ['.KKKKKKKKKK.', 'KMMMMMMMMMMK', 'KMMMMMMMMMMK', 'KMMMMMMMMMMK', '.KMMMMMMMMK.', '..KKKKKKKK..']
const HOUSE = ['.....KK.....', '....KRRK....', '...KRRRRK...', '..KRRRRRRK..', '.KRRRRRRRRK.', 'KKKKKKKKKKKK', '.KWWWWWWWWK.', '.KWBBWWDDWK.', '.KWBBWWDDWK.', '.KWWWWWDDWK.', '.KKKKKKKKKK.']
const GLOBE = ['...BBBB...', '.BBGGBBBB.', 'BBGGGBBBGB', 'BGGGBBBGGB', 'BBGBBBBGGB', 'BBBBBGGBBB', '.BBBBGBBB.', '...BBBB...', '....KK....', '..KKKKKK..']
/** a pot plant whose stem grows to height g (0…1); flower at full */
function plant(x, cx, cy, cell, g, bloom = 0) {
  drawBits(x, POT, { K: INK, T: '#c97b5a' }, cx, cy, cell)
  const h = g * cell * 16
  x.fillStyle = INK; x.fillRect(cx - cell * 0.9, cy - cell * 3 - h, cell * 1.8, h + 2); x.fillStyle = '#5fd068'; x.fillRect(cx - cell * 0.5, cy - cell * 3 - h, cell, h)
  for (let i = 1; i <= 3; i++) if (g > i * 0.25) drawBits(x, LEAF, { G: '#5fd068' }, cx + (i % 2 ? cell * 2.5 : -cell * 2.5), cy - cell * 3 - h * (i * 0.25), cell, { sx: i % 2 ? 1 : -1 })
  if (bloom > 0.01) drawBits(x, FLOWERB, { P: PINK, Y: GOLD }, cx, cy - cell * 4 - h, cell * 1.4 * bloom)
}

const S = 'sagittarius'
const CAMEOS = [
  { sign: S, cap: 'Itchy feet already? | *Explore your own street.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#e8f3d6'; x.fillRect(-142, -142, 284, 284)
        x.fillStyle = '#c9d2e8'; for (let i = -1; i <= 1; i++) { x.fillRect(-142, i * 90 - 10, 284, 20); x.fillRect(i * 90 - 10, -142, 20, 284) }
        x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('YOU', 0, 50)
        x.restore()
      }
      L(x, 790, 1100, 'NEW CAFÉ: 2 MIN AWAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Routine feels boring? | Make it *a quest.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ['QUEST:', 'the laundry', 'REWARD: snack'], { bg: '#ffe76a', size: 34, rot: 0.04 })
      L(x, 790, 1090, 'LEVEL UP ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, -0.04, 34)
    } },
  { sign: S, cap: 'Your plants never last? | *Watch one grow.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.5) plant(x, 790, 1060, 14, ease.outCubic(prog(lt, 0.4, 1.6)))
      const d = Math.round(1 + 39 * ease.outCubic(prog(lt, 0.4, 1.6)))
      L(x, 790, 620, `DAY ${d}: ALIVE`, pop01(t, P.t0 + 0.4, 0.3, 2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Old friends? | *Still full of surprises.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 830, 960, 170 * k, { mood: 'wink', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 790, 680, 'I learned | the accordion', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'br' })
      L(x, 600, 1110, 'NEW FACT UNLOCKED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Commitment feels scary? | It’s *a home base.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOUSE, { K: INK, R: ACC, W: CREAM, B: SKYB, D: '#8a4a2e' }, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 640, 'HOME BASE', pop01(t, P.t0 + 0.8, 0.3, 2), MINT, 0.04, 38)
      L(x, 790, 1130, 'DOOR: ALWAYS OPEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Craving somewhere new? | *Cook it tonight.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POTCOOK, { K: INK, M: '#9aa5c4' }, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.5) { x.save(); x.fillStyle = 'rgba(239,230,214,0.6)'; for (let i = 0; i < 3; i++) { const ph = ((t * 0.8 + i / 3) % 1); x.globalAlpha = Math.sin(Math.PI * ph) * 0.7; x.fillRect(720 + i * 60 + Math.sin(ph * 8) * 10, 880 - ph * 140, 14, 34) } x.restore() }
      L(x, 790, 680, 'PASSPORT: NOT NEEDED', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Want to bolt mid-fight? | Staying is *brave.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 830, 960, 170 * k, { mood: lt > 1.4 ? 'heart' : 'neutral', look: [-1, 0], seed: 14, glyph: false })
      bubble(x, 600, 650, 'okay. let’s talk.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 830, 1120, 'STAYED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Dreaming of everywhere? | *Dream from here.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLOBE, { B: '#5fa0d0', G: '#5fd068', K: INK }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { sx: Math.cos(t * 2.5) * 0.25 + 0.85 })
      L(x, 790, 640, 'NEXT TRIP: SOMEDAY', pop01(t, P.t0 + 0.9, 0.3, 2), GOLD, 0.04, 30)
      L(x, 790, 1100, 'TODAY: RIGHT HERE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'A new favourite bench? | *That counts.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 1020); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -50, 300, 40); x.fillRect(-130, -10, 20, 80); x.fillRect(110, -10, 20, 80); x.fillStyle = '#c97b5a'; x.fillRect(-142, -44, 284, 28); x.fillRect(-142, -110, 284, 24); x.fillStyle = INK; x.fillRect(-142, -86, 10, 40); x.fillRect(132, -86, 10, 40); x.restore() }
      L(x, 790, 720, 'NEW FAVOURITE ✦', pop01(t, P.t0 + 0.9, 0.3, 2.4), ACC, 0.04, 34)
      sparkles(x, t, 800, 960, P.t0 + 1.0, 7, 170, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0308', key: 'C', accent: ACC, solo: 'sagittarius', ending: 'callback',
  title: 'Sag, staying can be | an *adventure.*',
  cameos: CAMEOS,
  group: { cap: 'Stay a while. | *It’s a journey too.*', mood: 'heart' },
  last: {
    text: 'The plant made it. | *So did you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'sagittarius', 380, 1080, 280 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [1, 0], seed: 7, hops: [t0 + 1.3, t0 + 2.0] })
      if (pop01(t, t0 + 0.5, 0.4, 2) > 0.5) plant(x, 760, 1220, 16, 1, pop01(t, t0 + 1.0, 0.4, 2.4))
      if (lt > 1.0) sparkles(x, t, 760, 900, t0 + 1.0, 9, 180, 0.3)
      if (lt > 1.4) hearts(x, t, 560, 1000, t0 + 1.4, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
