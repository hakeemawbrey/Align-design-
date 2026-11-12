// r2a0328: star_advice, ADVICE SOLO (libra), "What Libras need | to feel heard." (signs3kit social cut, music: lofi · C).
// Nine warm cards, a relatable Libra truth + a kind reframe each. Ending: callback (Libra finally picks the restaurant).
//   "I don't mind" (your pick matters) · keeping the peace (your side counts) · "is that okay?" · interrupted mid-story
//   · always hosting · loving pretty things · hating conflict · seeing every side · asking for reassurance
//   Group: "Your voice | is the point."   Last: "Libra picked | the restaurant."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#2fc79a', GREY = '#c9c9d8', BROWN = '#8a4a2e', ACC = '#ff8fb1'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, size = 24 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.15, k * 1.15)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 ${size}px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 60); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a little restaurant menu with two choices; pick = 0/1 circles one */
function menu(x, cx, cy, k, pick = -1, rot = 0.05) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -180, 296, 380)
  x.fillStyle = INK; x.fillRect(-152, -192, 304, 384); x.fillStyle = CREAM; x.fillRect(-144, -184, 288, 368)
  x.fillStyle = ACC; x.fillRect(-144, -184, 288, 56)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TONIGHT?', 0, -156)
  x.font = `800 40px ${INTER}`; x.fillText('PASTA', 0, -50); x.fillText('TACOS', 0, 70)
  if (pick >= 0) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.ellipse(0, pick ? 70 : -50, 112, 42, -0.05, 0, Math.PI * 2); x.stroke() }
  x.restore()
}
const SCALE = ['......KK......', '......KK......', 'KKKKKKKKKKKKKK', 'K.....KK.....K', 'K.....KK.....K', '......KK......', '......KK......', '....KKKKKK....']
const TRAY = ['..WWWWWWWWWW..', 'WWWWWWWWWWWWWW', '.SSSSSSSSSSSS.']
const MUG = ['.WWWWW..', 'WWWWWWWW', 'WCCCCCWW', 'WCCCCCW.', 'WCCCCCWW', '.WWWWW..']
const VASE = ['.P.R.P.', 'PYPRPYP', '.P.G.P.', '..GGG..', '...G...', '.BBBBB.', 'BBBBBBB', 'BBBBBBB', '.BBBBB.']
const PRISM = ['.....W.....', '....WWW....', '...WWWWW...', '..WWWWWWW..', '.WWWWWWWWW.', 'WWWWWWWWWWW']
const ST = { x: -170 }
const S = 'libra'

const CAMEOS = [
  { sign: S, cap: 'Said “I don’t mind”? | *Your pick matters.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : 0, 0], star: ST,
    front(x, t, lt, P) {
      menu(x, 800, 850, pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 520, 620, 'i don’t mind!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      L(x, 800, 1120, 'WE’D LOVE TO KNOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Always keeping the peace? | *Your side counts too.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const tip = lt < 1.0 ? -0.18 : lerp(-0.18, 0, ease.outBack(clamp((lt - 1.0) / 0.4)))
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-12, -120, 24, 260); x.fillRect(-90, 130, 180, 24)
        x.save(); x.translate(0, -120); x.rotate(tip); x.fillRect(-190, -8, 380, 16)
        x.fillStyle = GOLD; x.fillRect(-200, 10, 70, 10); x.fillRect(130, 10, 70, 10)
        x.restore()
        x.restore()
        const ly = 860 - 120 + Math.sin(tip) * -165, ry = 860 - 120 + Math.sin(tip) * 165
        bubble(x, 635, ly + 70, 'them', k, { size: 30, col: GREY, tail: 'bc' })
        bubble(x, 965, ry + 70, 'you ♡', k, { size: 30, col: ACC, tail: 'bc' })
      }
      L(x, 800, 1120, 'BALANCED. FINALLY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Asking “is that okay?” | It’s *more than okay.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'is that ok?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 840, 760, 'sorry, is it?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 760, 880, 'just checking!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1060, 'YES. ALWAYS. ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 40)
    } },
  { sign: S, cap: 'Got cut off mid-story? | *We’re still listening.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 480, 620, lt < 0.9 ? 'so anyway, the—' : 'so anyway!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bc' })
      ;['taurus', 'cancer', 'virgo'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.8 + i * 0.15, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 680 + i * 120, 960 - (i % 2) * 50, 140 * k, { mood: 'sparkle', look: [-1, 0], seed: 60 + i, glyph: false })
      })
      L(x, 800, 760, 'GO ON!!', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.05, 40)
    } },
  { sign: S, cap: 'Always the host? | *Let someone host you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const p = ease.outCubic(clamp((lt - 0.3) / 0.8))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'cancer', lerp(980, 780, p), 960, 170 * k, { mood: 'happy', look: [-1, 0], seed: 66, glyph: false })
      drawBits(x, TRAY, { W: CREAM, S: GREY }, lerp(900, 700, p), 860, 16 * k)
      drawBits(x, MUG, { W: CREAM, C: BROWN }, lerp(880, 680, p), 815, 9 * k)
      drawBits(x, MUG, { W: CREAM, C: BROWN }, lerp(930, 730, p), 815, 9 * k)
      L(x, 800, 650, 'TONIGHT: YOU REST', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Love pretty things? | *Not shallow. Sweet.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, VASE, { P: ACC, Y: GOLD, R: RED, G: '#5fd068', B: SKYB }, 800, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 800, 760, P.t0 + 0.6, 7, 150, 0.5)
      L(x, 800, 1110, 'TASTE: IMPECCABLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Hate conflict? | *Calm talks count too.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MUG, { W: CREAM, C: BROWN }, 720, 920, 18 * k)
      drawBits(x, MUG, { W: CREAM, C: ACC }, 880, 920, 18 * k, { sx: -1 })
      if (k > 0.5) { x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 5; for (const sxp of [720, 880]) { x.beginPath(); for (let i = 0; i < 6; i++) x.lineTo(sxp + Math.sin(t * 3 + i) * 10, 840 - i * 18); x.stroke() } x.restore() }
      bubble(x, 800, 680, 'can we talk? ♡', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1110, 'VOICES: INDOOR', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Seeing every side? | That’s *wisdom.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PRISM, { W: '#e8f4ff' }, 760, 860, 22 * k)
      if (k > 0.5 && lt > 0.6) {
        const C = [RED, '#ffb34a', GOLD, '#5fd068', SKYB, LAV]
        x.save(); x.globalAlpha = clamp((lt - 0.6) / 0.4)
        C.forEach((c, i) => { x.fillStyle = c; x.beginPath(); x.moveTo(820, 860); x.lineTo(990, 760 + i * 30); x.lineTo(990, 786 + i * 30); x.closePath(); x.fill() })
        x.restore()
      }
      L(x, 790, 1100, 'ALL SIDES: SEEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: S, cap: 'Need some reassurance? | *Ask. We’ll say it.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'BESTIES', headCol: ACC, lines: [
        ['am i doing ok?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true],
        ['so ok!!', MINT, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['the best ♡', ACC, pop01(t, P.t0 + 1.2, 0.25, 2.2)],
        ['proud of u', GOLD, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
      hearts(x, t, 560, 760, P.t0 + 1.5, { n: 4, life: 1.4, spread: 150, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0328', key: 'C', accent: ACC, solo: 'libra', ending: 'callback',
  title: 'What Libras need | *to feel heard.*',
  cameos: CAMEOS,
  group: { cap: 'Your voice | *is the point.*', mood: 'heart' },
  last: {
    text: 'Libra picked | *the restaurant.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 380, 1080, 280 * k, { mood: lt > 1.2 ? 'sparkle' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.3, t0 + 1.9] })
      menu(x, 760, 1080, 0.9 * pop01(t, t0 + 0.5, 0.4, 2), lt > 1.0 ? 1 : -1, 0.06)
      if (lt > 1.1) sparkles(x, t, 760, 1150, t0 + 1.1, 8, 170, 0.2)
      if (lt > 1.4) bubble(x, 560, 840, 'tacos. final.', pop01(t, t0 + 1.4, 0.25, 2.4), { size: 40, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
