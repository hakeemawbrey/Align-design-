// r2t0351: star_talk, SOLO, "Cancers vs. | *old photos.*" (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine old-photo moments, each the most extreme (and lovable) Cancer version. Ending: callback.
//   0.0–3.6    "Cancers vs. | *old photos.*"
//   3.6–37.8   nine cards: found one photo, cancelled the weekend · 40,000 photos, deleted zero · a blurry thumb, framed
//              · "one year ago today", day gone · scrapbook for a friend met Tuesday · second date, brought the baby album
//              · moved house, packed the photos first · their baby photo next to their birth chart · family dinner slideshow
//  37.8        "Camera roll? | *Museum.*"
//  41.2        CALLBACK: "Ten years later: | *still framed.*"  the framed thumb comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#c9d6ff', PAPER = '#fff4e2'

// ── props
// an old instant photo (white frame, a little picture inside)
function photo(x, cx, cy, w, k, { rot = -0.05, scene = 'sky', alpha = 1 } = {}) {
  if (k <= 0.01) return
  const h = w * 1.18, iw = w * 0.84, ih = w * 0.8
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = PAPER; x.fillRect(-w / 2, -h / 2, w, h)
  const il = -iw / 2, it = -h / 2 + w * 0.08
  x.fillStyle = '#e8b07a'; x.fillRect(il, it, iw, ih)
  if (scene === 'sky') {
    x.fillStyle = '#9fd0ff'; x.fillRect(il, it, iw, ih * 0.6)
    x.fillStyle = '#7bc06a'; x.fillRect(il, it + ih * 0.6, iw, ih * 0.4)
    x.fillStyle = '#ffd23a'; x.fillRect(il + iw * 0.7, it + ih * 0.12, iw * 0.14, iw * 0.14)
    x.fillStyle = '#6b62a8'; x.fillRect(il + iw * 0.3, it + ih * 0.38, iw * 0.16, ih * 0.34); x.fillStyle = '#e8b07a'; x.fillRect(il + iw * 0.31, it + ih * 0.24, iw * 0.14, iw * 0.14)
  } else if (scene === 'thumb') {
    x.fillStyle = '#d9c7b8'; x.fillRect(il, it, iw, ih)
    x.fillStyle = '#e8a07a'; x.beginPath(); x.ellipse(il + iw * 0.45, it + ih * 0.62, iw * 0.38, ih * 0.5, -0.4, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(il, it, iw, ih)
  } else if (scene === 'baby') {
    x.fillStyle = '#ffd6e4'; x.fillRect(il, it, iw, ih)
    x.fillStyle = '#e8b07a'; x.beginPath(); x.arc(0, it + ih * 0.5, iw * 0.24, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.fillRect(-iw * 0.1, it + ih * 0.46, 6, 6); x.fillRect(iw * 0.08, it + ih * 0.46, 6, 6)
  }
  x.restore()
}
const ALBUM = [
  'BBBBBBBBBBBBBB',
  'BGGGGGGGGGGGGB',
  'BGBBBBBBBBBBGB',
  'BGBWWWWWWWWBGB',
  'BGBWHWWWWHWBGB',
  'BGBWWHHHHWWBGB',
  'BGBWWWHHWWWBGB',
  'BGBWWWWWWWWBGB',
  'BGBBBBBBBBBBGB',
  'BGGGGGGGGGGGGB',
  'BBBBBBBBBBBBBB',
]
const ALBUM_C = { B: '#8a4a2e', G: GOLD, W: PAPER, H: PINK }
const PHONE = [
  'KKKKKKKKK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KSSSSSSSK',
  'KKKKWKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', W: '#9aa5c4' }
const BOXP = [
  'TT.TTTTTT.TT',
  '.TTTTTTTTTT.',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
]
const BOXP_C = { T: '#e0a56a', B: '#c98a4e' }
const SCREEN = [
  'WWWWWWWWWWWWWWWW',
  'WSSSSSSSSSSSSSSW',
  'WSSSSSSSSSSSSSSW',
  'WSSSSSSSSSSSSSSW',
  'WSSSSSSSSSSSSSSW',
  'WSSSSSSSSSSSSSSW',
  'WSSSSSSSSSSSSSSW',
  'WSSSSSSSSSSSSSSW',
  'WWWWWWWWWWWWWWWW',
  '.......KK.......',
  '.......KK.......',
  '.....KKKKKK.....',
]
const SCREEN_C = { W: '#d8dbe8', S: '#fff4e2', K: '#6b62a8' }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.5, 2.4, 4.4]) x.fillRect(Math.cos(a) * r * 0.4 - 7, Math.sin(a) * r * 0.4 - 7, 14, 14)
  x.restore()
}
// a gold picture frame around a photo
function framed(x, cx, cy, w, k, scene, rot = -0.03) {
  if (k <= 0.01) return
  const h = w * 1.18
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 34, -h / 2 - 34, w + 68, h + 68)
  x.fillStyle = GOLD; x.fillRect(-w / 2 - 28, -h / 2 - 28, w + 56, h + 56)
  x.fillStyle = '#c99a3a'; x.fillRect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24)
  x.restore()
  photo(x, cx, cy, w, k, { rot, scene })
}

const CAMEOS = [
  // 1 · the weekend
  { sign: 'cancer', cap: 'Found one old photo. | Weekend: *cancelled.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      photo(x, 790, 870, 230, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 + 0.02 * Math.sin(t * 2) })
      label(x, 790, 620, 'PLANS: CANCELLED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 470, 820, P.t0 + 1.1, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  // 2 · phone storage
  { sign: 'cancer', cap: '40,000 photos. | Deleted *zero.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 930, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      label(x, 790, 650, 'STORAGE FULL', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 38, bg: '#ff6b5a', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'delete? | NEVER.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  // 3 · the blurry thumb, framed (the callback)
  { sign: 'cancer', cap: 'Blurry photo of a thumb? | *Framed it.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (lt < 1.2) photo(x, 790, 860, 210, k, { scene: 'thumb', rot: 0.05 })
      else { framed(x, 790, 860, 210, pop01(t, P.t0 + 1.2, 0.3, 2.4), 'thumb'); sparkles(x, t, 790, 860, P.t0 + 1.6, 8, 220, 0.4) }
      label(x, 790, 600, 'A MEMORY', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  // 4 · "one year ago today"
  { sign: 'cancer', cap: '“One year ago today.” | Day *gone.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 0 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'ONE YEAR AGO | TODAY ✦', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl', font: MONO, weight: 700 })
      photo(x, 790, 950, 200, pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.06 })
      label(x, 540, 1170, 'STILL ON THE SOFA AT 9PM', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 28, bg: BONE, rot: 0.03 })
    } },
  // 5 · the scrapbook
  { sign: 'cancer', cap: 'Made you a scrapbook. | We met *Tuesday.*', mood: lt => lt < 1.1 ? 'sparkle' : 'heart', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, ALBUM, ALBUM_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      label(x, 790, 640, 'VOL. 1 OF 6', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1140, 'FRIENDSHIP: 4 DAYS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  // 6 · Align: second date, the baby album
  { sign: 'cancer', cap: 'Second date? | Brought *the baby album.*', mood: lt => lt < 1.0 ? 'happy' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 600, '✦ MATCH: SECOND DATE', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      photo(x, 720, 880, 170, pop01(t, P.t0 + 0.7, 0.3, 2), { scene: 'baby', rot: -0.1 })
      photo(x, 860, 900, 170, pop01(t, P.t0 + 1.0, 0.3, 2), { scene: 'baby', rot: 0.08 })
      bubble(x, 790, 1130, 'this is me, | age TWO', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  // 7 · moving house
  { sign: 'cancer', cap: 'Moving house. | Packed *the photos first.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2)
        drawBits(x, BOXP, BOXP_C, 790 + (i === 1 ? 20 : -10), 1090 - i * 150, 16 * k, { rot: (i - 1) * 0.04 })
        label(x, 790 + (i === 1 ? 20 : -10), 1100 - i * 150, 'PHOTOS', k, { size: 24, bg: PAPER, rot: (i - 1) * 0.04, font: MONO, weight: 700 })
      }
      label(x, 790, 620, 'FURNITURE: LATER', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  // 8 · Align: the birth chart, next to the baby photo
  { sign: 'cancer', cap: 'Baby photo. | Birth chart. *Both framed.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      photo(x, 690, 860, 160, pop01(t, P.t0 + 0.2, 0.3, 2), { scene: 'baby', rot: -0.06 })
      chart(x, 865, 860, 88, pop01(t, P.t0 + 0.7, 0.35, 2), t)
      label(x, 790, 1100, 'THE SHRINE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 8, 200, 0.2)
    } },
  // 9 · family dinner, the slideshow
  { sign: 'cancer', cap: 'Family dinner? | Brought *a slideshow.*', mood: lt => lt < 1.0 ? 'happy' : 'heart', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SCREEN, SCREEN_C, 790, 880, 20 * k)
      const slide = Math.min(3, Math.floor(Math.max(0, lt - 0.5) / 0.45))
      if (k > 0.9) photo(x, 790, 820, 110, 1, { scene: ['sky', 'baby', 'thumb', 'sky'][slide], rot: 0 })
      label(x, 790, 1120, `SLIDE ${[1, 46, 212, 380][slide]} OF 380`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0351', key: 'C', accent: ACC, solo: 'cancer', ending: 'callback',
  title: 'Cancers vs. | *old photos.*',
  cameos: CAMEOS,
  group: { cap: 'Camera roll? | *Museum.*', mood: 'heart' },
  last: {
    text: 'Ten years later: | *still framed.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'cancer', 380, 1130, 300 * k, { mood: 'heart', look: [1, 0], seed: 33, hops: [t0 + 1.4] })
      framed(x, 740, 1100, 200, k, 'thumb', 0.04)
      label(x, 740, 1370, 'PRICELESS', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 740, 1100, t0 + 1.3, 8, 220, 0.6)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
