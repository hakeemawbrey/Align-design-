// r2t0068: star_talk, ROLL CALL, "The signs picking | matching outfits." (~59 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself picking a matching outfit. Ending: card.
//   0.0–3.6    "The signs picking | *matching outfits.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one outfit per sign (3.8 s each):
//              ♈ picked it, already wearing it (YOU: NOT ASKED) · ♉ matching, but only in sweatpants · ♊ brought two
//              outfits each (four hangers) · ♋ matching pyjamas for the whole family (DOG: INCLUDED) · ♌ matching, but
//              theirs is gold · ♍ colours picked by your birth chart · ♎ three hours deciding (two shirts flipping)
//              · ♏ all black, always · ♐ matching boots, booked the mountain · ♑ matching blazers for brunch
//              · ♒ refuses to match you, matches the cat · ♓ friendship bracelets, cried tying them
//  49.2        "Twelve outfits. | *Zero matching.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Matching is cute. | *Showing up* is cuter."  FIT CHECK: PASSED
//  58.3        "Aries is dressed. | Libra’s *still deciding.*" over the match card: Aries + Libra.
import { clamp, prog, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ff9a4a', ACCENT = '#ffb34a'

// ── props
const TEE = [
  '.SSS....SSS.',
  'SSSSSAASSSSS',
  'SSSSSSSSSSSS',
  'SSSSSSSSSSSS',
  '..SSSSSSSS..',
  '..SSSSSSSS..',
  '..SSSSSSSS..',
  '..SSSSSSSS..',
  '..SSSSSSSS..',
]
function tee(x, cx, cy, cell, col, { text = '', k = 1, rot = 0, collar = INK, tcol = INK, tsize = 1, outline = INK } = {}) {
  if (k <= 0.01) return
  drawBits(x, TEE, { S: col, A: collar }, cx, cy, cell * k, { rot, outline })
  if (text) { x.save(); x.translate(cx, cy + cell * k * 0.8); x.rotate(rot); x.fillStyle = tcol; x.font = `800 ${Math.round(cell * 2.2 * k * tsize)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 0); x.restore() }
}
const PANTS = [
  'PPPPPPPP',
  'PPPPPPPP',
  'PPP..PPP',
  'PPP..PPP',
  'PPP..PPP',
  'PPP..PPP',
  'WWW..WWW',
]
const PJ = [
  '.SSS....SSS.',
  'SSSSSAASSSSS',
  'SDSSSSSSSDSS',
  'SSSSDSSSSSSS',
  '..SSSSSDSS..',
  '..SDSSSSSS..',
  '..SSSSDSSS..',
]
const DOG = [
  '.EE....EE.',
  'EEDDDDDDEE',
  '.DDKDDKDD.',
  '.DDDDDDDD.',
  '..DDNNDD..',
  '.SSSSSSSS.',
  '.SDSSSSDS.',
  '.SSSSSSSS.',
]
const BOOT = [
  '..BBBB.',
  '..BBBB.',
  '..BLBB.',
  '..BBBB.',
  'BBBBBBB',
  'SSSSSSS',
]
const BOOT_C = { B: '#8a4a2e', L: GOLD, S: INK }
const MOUNTAIN = [
  '.......W.......',
  '......WWW......',
  '.....GGWGG.....',
  '....GGGGGGG....',
  '...GGGGGGGGG...',
  '..GGGGGGGGGGG..',
  '.GGGGGGGGGGGGG.',
  'GGGGGGGGGGGGGGG',
]
const MOUNTAIN_C = { W: CREAM, G: '#6b62a8' }
const CAT = [
  'E.....E.',
  'EE...EE.',
  'CCCCCCC.',
  'CKCCCKC.',
  'CCCNCCC.',
  '.SSSSS..',
  'SSSSSSSC',
  'SSSSSSS.',
  '.C.C.C..',
]
const CAT_C = { E: '#9aa5c4', C: '#9aa5c4', K: INK, N: PINK, S: '#6fc3ff' }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.4)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.55, 0, Math.PI * 2); x.fill()
  x.restore()
}
function swatch(x, cx, cy, col, name, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-66, -86, 132, 172); x.fillStyle = CREAM; x.fillRect(-60, -80, 120, 160)
  x.fillStyle = col; x.fillRect(-50, -70, 100, 100)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, 56)
  x.restore()
}
function hanger(x, cx, cy, col, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.moveTo(0, -78); x.arc(0, -86, 8, Math.PI / 2, -Math.PI); x.moveTo(0, -78); x.lineTo(-56, -50); x.lineTo(56, -50); x.closePath(); x.stroke()
  x.restore()
  tee(x, cx, cy, 10, col, { k, rot })
}
function bracelet(x, t, cx, cy, r, k, cols, spin = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2 + spin
    const px = Math.cos(a) * r, py = Math.sin(a) * r * 0.5
    x.fillStyle = INK; x.fillRect(px - 15, py - 15, 30, 30); x.fillStyle = cols[i % cols.length]; x.fillRect(px - 11, py - 11, 22, 22)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Picked the outfit. | *Already wearing it.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.4, 0.7],
    front(x, t, lt, P, F) {
      tee(x, F.x, F.cy + 120, 13, RED, { k: pop01(t, P.t0 + 0.2, 0.3, 2), text: '1', tcol: CREAM })
      tee(x, 790, 900, 18, RED, { k: pop01(t, P.t0 + 0.6, 0.3, 2), text: '2', tcol: CREAM, rot: 0.06 })
      label(x, 790, 1130, 'YOU: NOT ASKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Matching? | *Only in sweatpants.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, PANTS, { P: '#9aa5c4', W: CREAM }, 720, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      drawBits(x, PANTS, { P: '#9aa5c4', W: CREAM }, 880, 920, 20 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.06 })
      label(x, 790, 650, 'COMFORT: NON-NEGOTIABLE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 26, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Brought two outfits. | *For each of you.*', mood: 'sparkle', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const C = [GOLD, MINT, PINK, SKYB]
      C.forEach((c, i) => hanger(x, 640 + i * 100, 860 + (i % 2) * 70, c, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), (i - 1.5) * 0.06))
      label(x, 790, 1130, 'OUTFIT CHANGE: 2 P.M.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Matching pyjamas. | *For the whole family.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, PJ, { S: PINK, A: INK, D: CREAM }, 720, 840, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      drawBits(x, PJ, { S: PINK, A: INK, D: CREAM }, 880, 860, 12 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.05 })
      drawBits(x, DOG, { E: '#8a4a2e', D: '#e8b07a', K: INK, N: INK, S: PINK }, 800, 1030, 13 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 640, 'DOG: INCLUDED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Matching? Sure. | *Theirs is gold.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      tee(x, 820, 900, 15, '#d8c8a8', { k: pop01(t, P.t0 + 0.2, 0.3, 2), text: 'you', tsize: 0.8 })
      tee(x, F.x, F.cy + 130, 14, GOLD, { k: pop01(t, P.t0 + 0.7, 0.3, 2), text: 'STAR', tsize: 0.8 })
      sparkles(x, t, F.x, F.cy + 100, P.t0 + 0.9, 8, 160, 0.3)
      label(x, 820, 680, 'LEAD ROLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Picked colours | *by your birth chart.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      chart(x, 790, 730, 90, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      swatch(x, 700, 1000, '#5fd068', 'SAGE', pop01(t, P.t0 + 0.7, 0.3, 2), -0.08)
      swatch(x, 880, 1010, '#c9a6ff', 'LILAC', pop01(t, P.t0 + 0.9, 0.3, 2), 0.08)
      label(x, 790, 1170, 'PLAN v7: FINAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Three hours deciding. | *Still undecided.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const a = Math.sin(t * 5) > 0
      tee(x, 790, 880, 18, a ? PINK : SKYB, { k: pop01(t, P.t0 + 0.2, 0.3, 2), rot: a ? 0.06 : -0.06 })
      bubble(x, 790, 640, a ? 'this one?' : 'or this?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
      label(x, 790, 1120, 'HOUR 3', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Matching. | *All black. Always.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      tee(x, 720, 880, 15, '#1a1726', { k: pop01(t, P.t0 + 0.2, 0.3, 2), collar: '#3a3550', rot: -0.05, outline: '#c97bff' })
      tee(x, 880, 900, 15, '#1a1726', { k: pop01(t, P.t0 + 0.4, 0.3, 2), collar: '#3a3550', rot: 0.05, outline: '#c97bff' })
      bubble(x, 790, 640, 'it’s a mood', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 1130, 'COLOUR OPTIONS: 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Matching hiking boots. | *Booked the mountain.*', mood: 'sparkle', look: [1, -1], star: { x: -220 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, MOUNTAIN, MOUNTAIN_C, 790, 770, 20 * pop01(t, P.t0 + 0.6, 0.35, 2))
      drawBits(x, BOOT, BOOT_C, 730, 1010, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BOOT, BOOT_C, 860, 1010, 18 * pop01(t, P.t0 + 0.35, 0.3, 2))
      label(x, 790, 1150, 'LEAVING: 5 A.M.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Matching blazers. | *For brunch.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P, F) {
      const k1 = pop01(t, P.t0 + 0.2, 0.3, 2), k2 = pop01(t, P.t0 + 0.5, 0.3, 2)
      tee(x, F.x, F.cy + 130, 14, '#2a3d6a', { k: k1, collar: CREAM })
      tee(x, 800, 900, 17, '#2a3d6a', { k: k2, collar: CREAM, rot: 0.04 })
      if (k2 > 0.5) { x.save(); x.translate(800, 900); x.rotate(0.04); x.fillStyle = INK; x.fillRect(-14, -40, 28, 90); x.fillStyle = RED; x.fillRect(-9, -36, 18, 82); x.restore() }
      label(x, 800, 660, 'DRESS CODE: CEO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Won’t match you. | *Matches the cat.*', mood: lt => lt > 1.2 ? 'sparkle' : 'eyeroll', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P, F) {
      tee(x, F.x, F.cy + 130, 13, '#6fc3ff', { k: pop01(t, P.t0 + 0.9, 0.3, 2) })
      drawBits(x, CAT, CAT_C, 800, 950, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 690, 'mrrp.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 800, 1150, 'TWINNING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Friendship bracelets. | *Cried tying them.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, star: { x: -220 },
    front(x, t, lt, P) {
      bracelet(x, t, 790, 820, 110, pop01(t, P.t0 + 0.2, 0.3, 2), [PINK, GOLD, SKYB, MINT], t * 0.5)
      bracelet(x, t, 790, 990, 110, pop01(t, P.t0 + 0.5, 0.3, 2), [LAV, PINK, CREAM], -t * 0.5)
      label(x, 790, 1150, 'MADE: 40', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.0, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0068', key: 'G', accent: ACCENT, ending: 'card',
  title: 'The signs picking | *matching outfits.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: "IT'S A MATCH" },
  group: { cap: 'Twelve outfits. | *Zero matching.*' },
  lesson: { text: 'Matching is cute. | *Showing up* is cuter.', chip: 'FIT CHECK: PASSED' },
  last: { text: 'Aries is dressed. | Libra’s *still deciding.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
