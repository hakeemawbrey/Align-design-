// v3t055: THE SIGNS AS… v3, "The signs | as roommates." (~57 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "The signs | as *roommates.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one roommate per sign (3.8 s each), each pushed to the extreme:
//              ♈ races you to the shower, every day · ♉ labelled every snack "mine" · ♊ "a few people": forty-two
//              · ♋ fridge note: "proud of you" · ♌ hung their portrait in your room · ♍ the chore chart has a chore chart
//              · ♎ called a house meeting over one spoon · ♏ knows who ate your yogurt · ♐ rent's paid, not home since May
//              · ♑ bought a label maker, labelled you · ♒ turned the hallway into a lab · ♓ read your grocery list, found it moving
//  49.2        "Twelve keys. | *One fridge.*"
//  52.6        callback: "Your yogurt? | Now labelled *“mine.”*"  Taurus is back, the yogurt wearing a MINE sticker.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CORAL = '#ff7a6a', GREEN = '#5fd068'

const DOOR = [
  'BBBBBBBB',
  'BbbbbbbB',
  'BbBBBBbB',
  'BbBBBBbB',
  'BbbbbbbB',
  'BbBBBBbB',
  'BbBBBBYB',
  'BbBBBBbB',
  'BbbbbbbB',
  'BBBBBBBB',
]
const SNACK = [
  '.RRRRR.',
  'RRRRRRR',
  'RWWWWWR',
  'RWWWWWR',
  'RRRRRRR',
  'RRRRRRR',
  '.RRRRR.',
]
const FRIDGE = [
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  'WWWWWWWWKW',
  'WWWWWWWWWW',
  'KKKKKKKKKK',
  'WWWWWWWWWW',
  'WWWWWWWWKW',
  'WWWWWWWWKW',
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  '.K......K.',
]
const SPOON = [
  '.SSS.',
  'SSSSS',
  'SSSSS',
  '.SSS.',
  '..S..',
  '..S..',
  '..S..',
  '..S..',
  '..S..',
  '..S..',
]
const YOGURT = [
  'LLLLLLLL',
  '.WWWWWW.',
  '.WPPPPW.',
  '.WPPPPW.',
  '.WWWWWW.',
  '..WWWW..',
]
const YOGURT_C = { L: '#c9c9d8', W: '#fff4e2', P: PINK }
const FLASK = [
  '..GG..',
  '..GG..',
  '..GG..',
  '.GMMG.',
  'GMMMMG',
  'GMMMMG',
  '.GGGG.',
]
const LABELER = [
  'GGGGGGGGGG',
  'GKKKKKKKKG',
  'GKWWWWWWKG',
  'GKKKKKKKKG',
  'GGGGGGGGGG',
  'GgGgGgGgGG',
  'GGGGGGGGGG',
]

// a sticky note on the fridge
function note(x, cx, cy, text, k, { rot = -0.05, bg = '#fff07a', size = 34, s = 1.45 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-86, -76, 180, 160)
  x.fillStyle = bg; x.fillRect(-90, -84, 180, 168)
  x.fillStyle = INK; x.font = `italic 700 ${size}px 'EB Garamond', Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, (i - (a.length - 1) / 2) * size * 1.1))
  x.restore()
}
// a chart on the wall: rows of ticks, and a mini chart inside
function choreChart(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -180, 360, 360)
  x.fillStyle = '#fff4e2'; x.fillRect(-172, -172, 344, 344)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CHORES', 0, -146)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { x.fillStyle = ['#ffd3d3', '#d3f5e0', '#d3e6ff', '#f5e6c8'][r]; x.fillRect(-150 + c * 60, -110 + r * 50, 52, 42) }
  const g = pop01(lt, 0.9, 0.3, 2)
  if (g > 0.01) {
    x.save(); x.translate(60, 110); x.rotate(-0.06); x.scale(g, g)
    x.fillStyle = INK; x.fillRect(-96, -46, 192, 92); x.fillStyle = '#d3f5e0'; x.fillRect(-90, -40, 180, 80)
    x.fillStyle = INK; x.font = `700 18px ${MONO}`; x.fillText('CHART CHORES', 0, -22)
    for (let c = 0; c < 4; c++) { x.fillStyle = '#9ad6b0'; x.fillRect(-76 + c * 40, -4, 32, 32) }
    x.restore()
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Races you | to *the shower.* Daily.', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [0.3, 0.6, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DOOR, { B: '#9a6a4a', b: '#7a4a2e', Y: GOLD }, 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 660, 'OCCUPIED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1110, 'WIN #212', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Labelled every snack. | *“Mine.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), px = 700 + (i % 2) * 180, py = 760 + Math.floor(i / 2) * 220
        drawBits(x, SNACK, { R: [ORANGE, MINT, PINK, SKYB][i], W: '#fff4e2' }, px, py, 18 * k)
        label(x, px, py + 10, 'MINE', pop01(t, P.t0 + 0.6 + i * 0.25, 0.25, 2.6), { size: 24, bg: GOLD, rot: -0.1, font: MONO, weight: 700 })
      }
    } },
  { sign: 'gemini', cap: '“A few people.” | *Forty-two.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const ids = ['aries', 'leo', 'sagittarius', 'libra', 'aquarius', 'taurus']
      const n = Math.min(6, Math.floor(lt * 3.2))
      for (let i = 0; i < n; i++) signChar(x, t, ids[i], 660 + (i % 3) * 120, 780 + Math.floor(i / 3) * 170, 110, { mood: 'happy', seed: 40 + i, glyph: false })
      label(x, 790, 1150, `GUESTS: ${Math.min(42, Math.floor(lt * 18))}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Fridge note: | *“proud of you.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, FRIDGE, { W: '#e8eaf6', K: '#9aa5c4' }, 800, 900, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      note(x, 800, 840, 'proud | of you ♡', pop01(t, P.t0 + 0.7, 0.3, 2.4), { rot: -0.06 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Hung their portrait. | *In your room.*', mood: 'sparkle', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -180, 300, 360); x.fillStyle = GOLD; x.fillRect(-142, -172, 284, 344); x.fillStyle = '#5b2e1a'; x.fillRect(-118, -148, 236, 296)
        signChar(x, t, 'leo', 0, 10, 200, { mood: 'wink', seed: 51, glyph: false, glow: 0.4 })
        x.restore()
      }
      label(x, 790, 1110, 'YOUR ROOM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'The chore chart | has *a chore chart.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200, s: 260 },
    front(x, t, lt, P) { choreChart(x, 770, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'House meeting. | About *one spoon.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SPOON, { S: '#d8dbe8' }, 790, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      label(x, 790, 650, 'AGENDA: SPOON', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'let’s all share', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Knows who | ate *your yogurt.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, YOGURT, YOGURT_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'EMPTY', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'I know.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: '#ff8a9a', tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Rent’s paid. | *Not home since May.*', mood: 'sparkle', star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 860); x.rotate(-0.05); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = '#d8f0ff'; x.fillRect(-142, -102, 284, 204); x.fillStyle = MINT; x.fillRect(-142, 30, 284, 72); x.fillStyle = GOLD; x.beginPath(); x.arc(70, -30, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('wish u were here', 0, 70); x.restore() }
      label(x, 790, 640, 'POSTCARD #9', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Bought a label maker. | *Labelled you.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, LABELER, { G: '#6b62a8', K: INK, W: MINT, g: '#4a4070' }, 600, 1060, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 880, 190 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 22, glyph: false })
      label(x, 820, 1080, 'ROOMMATE (1)', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 30, bg: '#fff4e2', rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Turned the hallway | into *a lab.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, FLASK, { G: '#c9e6ff', M: [MINT, PINK, GOLD][i] }, 680 + i * 120, 900 - (i % 2) * 80, 20 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2))
      label(x, 790, 650, 'DO NOT ENTER', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.4, 7, 180, 0.3, [MINT, SKYB, BONE])
    } },
  { sign: 'pisces', cap: 'Read your grocery list. | *Found it moving.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 800, 880, 'eggs | oat milk | bread', pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff4e2', size: 36, rot: 0.05 })
      bubble(x, 790, 610, 'so beautiful', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t055', key: 'G', accent: CORAL, ending: 'callback',
  title: 'The signs | as *roommates.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve keys. | *One fridge.*' },
  last: {
    text: 'Your yogurt? | *Labelled “mine.”*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, YOGURT, YOGURT_C, 680, 1080, 50 * pop01(t, t0 + 0.4, 0.35, 2))
      label(x, 680, 1120, 'MINE', pop01(t, t0 + 1.3, 0.25, 2.6), { size: 44, bg: GOLD, rot: -0.1, font: MONO, weight: 700 })
      const k = pop01(t, t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 340, 1110, 290 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 9, glyph: false, hops: [t0 + 1.4] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
