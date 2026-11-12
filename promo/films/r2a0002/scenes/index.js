// r2a0002: star_advice, ADVICE SOLO, "Sag, you don't owe | an instant reply." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Sagittarius truth + a warm reframe, one gag each.
//   0.0–3.6    "Sag, you don’t owe | *an instant reply.*"  One big Sagittarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              phone on silent in a hammock (self-care) · replied from a mountain (still counts) · solo trip (come back glowing)
//              · honesty is a gift, wrap it softly · new match? reply after the hike · restless on a Tuesday? try a new park
//              · you need space, say it kindly (a little personal orbit) · too loud for some rooms? find your people
//              · a slow Sunday is a trip too (passport stamp: SUNDAY)
//  37.8        "Free spirit. | *Kind heart.*"  Sagittarius comes back, big.
//  41.2        callback: "Your friends? | *Loved the view.*"  The mountain comes back, with a phone full of hearts.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const VIOLET = '#b98cff', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', GREEN = '#5fd068'
const S = 'sagittarius'

// ── props
const MOUNTAIN = [
  '........WW........',
  '.......WWWW.......',
  '......WWGWWW......',
  '.....GGGGGGGG.....',
  '....GGGGGGGGGG....',
  '...GGGGgGGGGGGG...',
  '..GGGGGGGGGgGGGG..',
  '.GGgGGGGGGGGGGGGG.',
  'GGGGGGGGGGGGGgGGGG',
]
const MOUNTAIN_C = { W: '#ffffff', G: '#7a86b8', g: '#5a6698' }
const BACKPACK = [
  '...KKKK...',
  '..K....K..',
  '.OOOOOOOO.',
  'OOOOOOOOOO',
  'OOyyyyyyOO',
  'OOyOOOOyOO',
  'OOyyyyyyOO',
  'OOOOOOOOOO',
  'OOOOOOOOOO',
  '.OOOOOOOO.',
]
const BACKPACK_C = { K: INK, O: '#ff9a4a', y: '#c95f2a' }
const GIFT = [
  '...P..P...',
  '....PP....',
  'RRRRPPRRRR',
  'RRRRPPRRRR',
  'RRRRPPRRRR',
  'PPPPPPPPPP',
  'RRRRPPRRRR',
  'RRRRPPRRRR',
  'RRRRPPRRRR',
]
const GIFT_C = { R: VIOLET, P: PINK }
const BOOT = [
  '.BBBB.....',
  '.BBBB.....',
  '.BBBB.....',
  '.BBBBBBBB.',
  'BBBBBBBBBB',
  'KKKKKKKKKK',
]
const BOOT_C = { B: '#8a4a2e', K: INK }
const TREE = [
  '...GGGG...',
  '.GGGgGGGG.',
  'GGGGGGgGGG',
  'GgGGGGGGGG',
  '.GGGGGgGG.',
  '...GGGG...',
  '....TT....',
  '....TT....',
  '....TT....',
]
const TREE_C = { G: GREEN, g: '#a6f08a', T: '#8a4a2e' }
const PLANET = ['..PPPP..', '.PPPPPP.', 'PPpPPPPP', 'PPPPPpPP', '.PPPPPP.', '..PPPP..']

// a hammock strung across the panel
function hammock(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(cx - 260, cy - 80); x.quadraticCurveTo(cx, cy + 120, cx + 260, cy - 80); x.stroke()
  x.strokeStyle = '#e7b46a'; x.lineWidth = 5; x.beginPath(); x.moveTo(cx - 260, cy - 80); x.quadraticCurveTo(cx, cy + 120, cx + 260, cy - 80); x.stroke()
  x.restore()
}
// a phone, face up: a header and up to three messages
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], dim = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  if (dim > 0.01) { x.fillStyle = `rgba(6,4,18,${(0.7 * dim).toFixed(3)})`; x.fillRect(-112, -170, 224, 340); x.fillStyle = LAV; x.font = `800 60px ${INTER}`; x.globalAlpha = dim; x.fillText('z z', 0, 0) }
  x.restore()
}
// a round passport stamp
function stamp(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.2); x.scale(k, k)
  x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.stroke()
  x.fillStyle = RED; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.font = `700 18px ${MONO}`; x.fillText('✦ VISITED ✦', 0, -44); x.fillText('NO PLANS', 0, 50)
  x.restore()
}
// a couch with a blanket
function couch(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-250, -90, 500, 190); x.fillStyle = '#7a5cc0'; x.fillRect(-242, -82, 484, 100); x.fillStyle = '#9a7ce0'; x.fillRect(-242, 18, 484, 74)
  x.fillStyle = INK; x.fillRect(-270, -40, 60, 150); x.fillRect(210, -40, 60, 150); x.fillStyle = '#7a5cc0'; x.fillRect(-264, -34, 48, 138); x.fillRect(216, -34, 48, 138)
  x.restore()
}

const MOUNT_LINES = (t, t0) => [
  ['sorry!! was on', SKYB, pop01(t, t0 + 0.5, 0.25, 2.2)],
  ['a mountain', SKYB, pop01(t, t0 + 0.7, 0.25, 2.2)],
]

const CAMEOS = [
  { sign: S, cap: 'Phone on silent? | *That’s self-care.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: { x: -40, y: 20, s: 260 },
    back(x, t, lt, P) { hammock(x, 500, 900, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      phone(x, 810, 800, 0.7 * pop01(t, P.t0 + 0.3, 0.3, 2), { head: 'SILENT', headCol: LAV, dim: ease.outCubic(prog(lt, 0.8, 1.2)) })
      label(x, 540, 1150, 'DO NOT DISTURB ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: VIOLET, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Replied from a mountain? | *Still counts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200, y: 30, s: 260 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { drawBits(x, MOUNTAIN, MOUNTAIN_C, 420, 1000, 26 * pop01(t, P.t0 + 0.05, 0.35, 2)) },
    front(x, t, lt, P) {
      phone(x, 770, 850, pop01(t, P.t0 + 0.3, 0.3, 2), { head: 'DAY 3', headCol: GOLD, lines: [...MOUNT_LINES(t, P.t0), ['lol ok ♡', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)]] })
    } },
  { sign: S, cap: 'Need a solo trip? | *Come back glowing.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.6, 1.4],
    front(x, t, lt, P, F) {
      drawBits(x, BACKPACK, BACKPACK_C, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 800, 650, 'BACK SOON ✦', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.5, 8, 190, 0.3)
      label(x, 800, 1130, 'GLOW: MAX', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your honesty is a gift. | *Wrap it softly.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, GIFT, GIFT_C, 800, 900, 22 * k, { rot: 0.04 })
      bubble(x, 800, 650, 'real talk, | with love', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 800, 1130, 'HANDLE WITH CARE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New match? | Reply *after the hike.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.5, 1.0],
    front(x, t, lt, P, F) {
      phone(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', lines: [['hey! what’s', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['your sign?', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)]] })
      drawBits(x, BOOT, BOOT_C, F.x + 20, 1120, 12 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 800, 1110, 'LATER. WITH PHOTOS.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Restless on a Tuesday? | *Try a new park.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, TREE, TREE_C, 660 + i * 130, 920 - (i % 2) * 40, 14 * pop01(t, P.t0 + 0.4 + i * 0.2, 0.3, 2))
      label(x, 800, 650, 'ADVENTURE: LOCAL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 640, 'ooh, a duck', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'You need space? | *Say it kindly.*', mood: 'happy', look: [1, 0], star: { x: -100 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = 0.5 * k; x.strokeStyle = BONE; x.lineWidth = 3; x.setLineDash([10, 10]); x.beginPath(); x.ellipse(F.x, F.cy, 250, 90, -0.2, 0, Math.PI * 2); x.stroke(); x.restore()
        const a = lt * 2.2
        drawBits(x, PLANET, { P: GOLD, p: '#c98f2a' }, F.x + Math.cos(a) * 250 * Math.cos(-0.2) - Math.sin(a) * 90 * Math.sin(-0.2), F.cy + Math.cos(a) * 250 * Math.sin(-0.2) + Math.sin(a) * 90 * Math.cos(-0.2), 9 * k)
      }
      bubble(x, 790, 650, 'just need a | little space ♡', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 540, 1150, 'PERSONAL ORBIT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Too loud for some rooms? | *Find your people.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const IDS = ['aries', 'gemini']
      IDS.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.15, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, 700 + i * 190, 980 - i * 40, 170 * k, { mood: lt > 1.0 ? 'sparkle' : 'happy', look: [-1, 0], seed: 30 + i, glyph: false, hops: [P.t0 + 1.0 + i * 0.2, P.t0 + 1.8] })
      })
      bubble(x, 790, 680, 'HAHAHA', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 50, tail: 'bc' })
      label(x, 540, 1170, 'LAUGHS: SHARED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A slow Sunday | *is a trip too.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: { x: -150, y: -20, s: 260 },
    back(x, t, lt, P) { couch(x, 400, 1010, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      stamp(x, 790, 760, pop01(t, P.t0 + 1.0, 0.25, 2.6), 'SUNDAY')
      label(x, 790, 1130, 'DESTINATION: COUCH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: VIOLET, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0002', key: 'F', accent: VIOLET, solo: S, ending: 'callback',
  title: 'Sag, you don’t owe | *an instant reply.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Kind heart.*', mood: 'sparkle' },
  last: {
    text: 'Your friends? | *Loved the view.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, MOUNTAIN, MOUNTAIN_C, 380, 1050, 28 * pop01(t, t0 + 0.5, 0.4, 2))
      phone(x, 760, 1000, 0.9 * pop01(t, t0 + 0.8, 0.35, 2), { head: 'FRIENDS', headCol: PINK, lines: [
        ['WOW', PINK, pop01(t, t0 + 1.2, 0.25, 2.2)], ['take me next!', BONE, pop01(t, t0 + 1.4, 0.25, 2.2)], ['♡♡♡', PINK, pop01(t, t0 + 1.6, 0.25, 2.2)],
      ] })
      hearts(x, t, 760, 900, t0 + 1.7, { n: 6, life: 1.8, spread: 240, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
