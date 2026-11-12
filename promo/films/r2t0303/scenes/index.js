// r2t0303: star_talk, SOLO, "Cancers at a party | *be like.*" (~46 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way: nine party moments, each the most extreme (and lovable) Cancer version. Ending: callback.
//   0.0–3.6    "Cancers at a party | *be like.*"
//   3.6–37.8   nine cards: brought snacks for forty (six guests) · in the kitchen, all night · befriended the dog, only the dog
//              · packed you a plate to take home · found the photo album, never left it · put a jacket on the host
//              · knows every guest's birthday, and sign · wanted to leave, stayed to wash up · home by nine, texted everyone
//  37.8        "Party guest? | *Party parent.*"
//  41.2        CALLBACK: "Three days later: | *still handing out snacks.*"  the tower of tubs comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#9fe0ff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

const TUB = ['KKKKKKKKKK', 'KLLLLLLLLK', 'KKKKKKKKKK', 'KFFFFFFFFK', 'KFFFFFFFFK', 'KFFFFFFFFK', 'KKKKKKKKKK']
const TUB_C = [{ K: INK, L: SKYB, F: ORANGE }, { K: INK, L: PINK, F: '#9fd8a8' }, { K: INK, L: MINT, F: GOLD }, { K: INK, L: LAV, F: '#ff8f6a' }]
const DOG = ['K.....KK..', 'KK...KBBK.', '.KKKKKBWBK', '.KBBBBBBBK', '.KBBBBBBK.', '.KBKKKBK..', '.KK...KK..']
const PLATE = ['..SSSSSSS..', '.SSSSSSSSS.', 'SSSSSSSSSSS', 'SSSSSSSSSSS', '.SSSSSSSSS.', '..SSSSSSS..']
const JACKET = ['..KKK..KKK..', '.KJJJKKJJJK.', 'KJJJJJJJJJJK', 'KJJKJJJJKJJK', 'KJJKJJJJKJJK', 'KJJKJJYJKJJK', 'KJJKJJJJKJJK', 'KKKKJJYJKKKK', '...KJJJJK...', '...KKKKKK...']
const SPONGE = ['KKKKKKKK', 'KYYYYYYK', 'KYYYYYYK', 'KGGGGGGK', 'KKKKKKKK']
const STOVE = ['KKKKKKKKKKKK', 'KRRKKKKKRRK.', 'KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSKKKKKKKKSK', 'KSK......KSK', 'KSK......KSK', 'KSKKKKKKKKSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK']

function tubs(x, cx, baseY, n, cell = 14) { for (let i = 0; i < n; i++) drawBits(x, TUB, TUB_C[i % 4], cx + ((i * 37) % 30) - 15, baseY - i * 7.4 * cell, cell) }
function phone(x, cx, cy, k, head, rows) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -210, 280, 420)
  x.fillStyle = '#2a2350'; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#140c30'; x.fillRect(-118, -176, 236, 352)
  x.fillStyle = ACC; x.fillRect(-106, -162, 212, 50); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -136)
  rows.forEach(([txt, col, kk], i) => { if (kk <= 0.01) return; x.save(); x.translate(0, -54 + i * 72); x.scale(kk, kk); x.fillStyle = col; x.fillRect(-106, -27, 212, 54); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText(txt, 0, 2); x.restore() })
  x.restore()
}
function album(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-196, -136, 392, 272)
  x.fillStyle = '#7a4a2e'; x.fillRect(-188, -128, 376, 256)
  x.fillStyle = CREAM; x.fillRect(-176, -116, 170, 232); x.fillRect(6, -116, 170, 232)
  const cols = [PINK, SKYB, GOLD, MINT]
  for (let i = 0; i < 4; i++) { const px = (i % 2 ? 22 : -160), py = i < 2 ? -100 : 4; x.fillStyle = cols[(i + Math.floor(lt * 2)) % 4]; x.fillRect(px, py, 138, 92) }
  x.restore()
}
function notebook(x, cx, cy, k, rows) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -190, 340, 380)
  x.fillStyle = BONE; x.fillRect(-162, -182, 324, 364)
  x.fillStyle = ACC; x.fillRect(-162, -182, 324, 62); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GUESTS', 0, -150)
  x.textAlign = 'left'; x.font = `800 30px ${INTER}`
  rows.forEach((r, i) => x.fillText(r, -136, -76 + i * 66))
  x.restore()
}

const S = 'cancer'
const CAMEOS = [
  { sign: S, cap: 'Six guests. Brought snacks | *for forty.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.4) * 5) + (lt > 0.2 ? 1 : 0)
      tubs(x, 800, 1130, Math.min(5, n), 13)
      L(x, 560, 640, 'GUESTS: 6', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.05, 36)
    } },
  { sign: S, cap: 'Found the kitchen. | *Never left it.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, STOVE, { K: INK, R: ORANGE, S: '#d8dbe8' }, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const h = ['9 PM', '10 PM', '11 PM', '12 AM', '1 AM'][Math.floor(clamp((lt - 0.4) / 1.6) * 4)]
      L(x, 800, 650, `IN KITCHEN: ${h}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), ACC, 0.04, 30)
      notes(x, t, 560, 620, { n: 2, cell: 5, col: BONE, seed: 1, alpha: 0.6 })
    } },
  { sign: S, cap: 'Met one friend tonight. | *The dog.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, DOG, { K: INK, B: '#c98f5a', W: CREAM }, 800, 940, 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { sx: -1 })
      hearts(x, t, 700, 840, P.t0 + 1.0, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 3 })
      L(x, 800, 660, 'BEST FRIEND: DOG', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04)
    } },
  { sign: S, cap: 'Packed you a plate | *to take home.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PLATE, { S: '#d8dbe8' }, 800, 880, 26 * k)
      if (lt > 0.8) { x.save(); x.globalAlpha = clamp((lt - 0.8) * 3); x.fillStyle = 'rgba(220,225,240,0.85)'; x.fillRect(660, 820, 280, 70); x.restore() }
      L(x, 800, 1070, 'FOR LATER ♥', pop01(t, P.t0 + 1.2, 0.3, 2.4), CREAM, -0.04, 36)
      L(x, 800, 660, 'AND ONE FOR YOUR MUM', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: S, cap: 'Found the photo album. | *Stayed with it.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      album(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1090, 'PAGE 412', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, 0.05, 36)
      bubble(x, 790, 640, 'baby pics!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Put a jacket | *on the host.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 760, 900, 220 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 17, glyph: false })
      const d = ease.outCubic(prog(lt, 0.6, 1.1))
      if (lt > 0.55) drawBits(x, JACKET, { K: INK, J: '#7ab0ff', Y: GOLD }, 760, lerp(620, 1010, d), 13)
      L(x, 790, 640, 'IT’S CHILLY OUT', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04)
    } },
  { sign: S, cap: 'Knows every birthday. | *And every sign.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.4) * 4) + 1
      notebook(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['Sam 3/4 ♓︎', 'Ty 8/9 ♌︎', 'Jo 1/2 ♑︎', 'Ash 6/1 ♊︎'].slice(0, n))
      L(x, 790, 1110, 'CHARTS: MEMORISED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Wanted to leave. | Stayed to *wash up.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sc = lt > 0.5 ? Math.sin(lt * 12) * 30 : 0
      drawBits(x, PLATE, { S: '#d8dbe8' }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SPONGE, { K: INK, Y: GOLD, G: MINT }, 800 + sc, 880, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      if (lt > 0.7) for (let i = 0; i < 5; i++) { const ph = ((t * 0.8 + i * 0.2) % 1); x.save(); x.globalAlpha = 1 - ph; x.strokeStyle = CREAM; x.lineWidth = 4; x.beginPath(); x.arc(700 + i * 50, 820 - ph * 160, 14, 0, 7); x.stroke(); x.restore() }
      L(x, 800, 1090, 'LAST ONE OUT', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 36)
    } },
  { sign: S, cap: 'Home by nine. | *Texted everyone.*', mood: 'sleepy', star: ST, hops: [],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 780, 860, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), 'SENT', [
        ['home safe ♥', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['u home??', SKYB, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['text me ♥', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2)], ['drink water', MINT, pop01(t, P.t0 + 1.7, 0.25, 2.2)]])
    } },
]

const F = makeFilm({
  id: 'r2t0303', key: 'G', accent: ACC, solo: 'cancer', ending: 'callback',
  title: 'Cancers at a party | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Party guest? | *Party parent.*', mood: 'heart' },
  last: {
    text: 'Three days later: | *still handing out snacks.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'cancer', 400, 1130, 320 * k, { mood: 'heart', look: [1, 0], seed: 33, hops: [t0 + 1.4] })
      x.save(); x.translate(700, 1300); x.scale(k, k); x.translate(-700, -1300); tubs(x, 720, 1310, 4, 17); x.restore()
      label(x, 720, 840, 'TUBS LEFT: 37', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
