// r2t0197: star_talk, SOLO, "Pisces birthdays | be like." (~43 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (solo mode, 9 cards), crying in every one: a Pisces birthday, pushed to the extreme.
//   0.0–3.6    "Pisces on their birthday | *be like.*"
//   3.6–37.8   nine cards: blew out the candles, missed them instantly · two notes into the song, full sob · kept the
//              wrapping paper · their wish? for everyone else · grieved the old year · one balloon floated off, waved till
//              sunset · birthday horoscope: "big feelings" (accurate) · party of twelve, hugged each one twice
//              · gave away every slice, happiest Pisces alive
//  37.8        GROUP ENDING: "Best birthday ever. | *Cried all day.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#7fd6c8', RED = '#e23d4e', S = 'pisces'

const BALLOON = [
  '.BBBB.',
  'BWBBBB',
  'BBBBBB',
  'BBBBBB',
  '.BBBB.',
  '..BB..',
]
function balloon(x, t, cx, cy, cell, col, seed = 0) {
  x.save(); x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, cy + 3 * cell)
  x.quadraticCurveTo(cx + Math.sin(t * 2 + seed) * 20, cy + 6 * cell, cx, cy + 10 * cell); x.stroke(); x.restore()
  drawBits(x, BALLOON, { B: col, W: '#fff' }, cx, cy, cell, { rot: 0.08 * Math.sin(t * 1.5 + seed) })
}
function box(x, cx, cy, w, h, k, fillC, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = fillC; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
// a two-tier cake; lit candles until `out`
function cake(x, t, cx, cy, k, { lit = true, slices = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 60, 340, 16)
  if (slices > 0) {
    x.fillStyle = INK; x.fillRect(-146, -36, 292, 102); x.fillStyle = '#ffd9e6'; x.fillRect(-140, -30, 280, 90)
    x.fillStyle = PINK; for (let i = 0; i < 7; i++) x.fillRect(-140 + i * 40, -30, 24, 18 + (i % 2) * 8)
    x.fillStyle = INK; x.fillRect(-96, -100, 192, 70); x.fillStyle = '#fff4e2'; x.fillRect(-90, -94, 180, 64)
    for (let i = 0; i < 4; i++) {
      const cxx = -60 + i * 40
      x.fillStyle = INK; x.fillRect(cxx - 7, -156, 14, 60); x.fillStyle = [SKYB, GOLD, MINT, LAV][i]; x.fillRect(cxx - 4, -152, 8, 54)
      if (lit) { const f = 1 + 0.15 * Math.sin(t * 18 + i); x.fillStyle = '#ffb34a'; x.fillRect(cxx - 6 * f, -182, 12 * f, 22); x.fillStyle = '#fff1a8'; x.fillRect(cxx - 3, -176, 6, 12) }
      else { x.save(); x.globalAlpha = 0.5; x.fillStyle = '#9aa5c4'; x.fillRect(cxx - 3 + Math.sin(t * 3 + i) * 6, -200 - ((t * 40 + i * 15) % 40), 6, 18); x.restore() }
    }
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Blew out the candles. | *Missed them instantly.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', tears: lt => lt > 1.2 ? 3 : 1, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      cake(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { lit: lt < 1.0 })
      label(x, 790, 650, 'RIP, CANDLES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Two notes into the song. | *Full sob.*', mood: lt => lt > 0.9 ? 'wide' : 'heart', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      notes(x, t, 790, 900, { n: 5, cell: 9, col: GOLD, seed: 2 })
      bubble(x, 780, 700, '♪ happy birth—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1110, 'NOTES SUNG: 2', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SEA, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Opened the gift. | *Kept the wrapping paper.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', tears: 2, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (box(x, 790, 870, 280, 280, pop01(t, P.t0 + 0.2, 0.35, 2), PINK, 0.06)) {
        x.fillStyle = '#ffd9e6'; for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) if ((i + j) % 2 === 0) { x.beginPath(); x.arc(i * 52, j * 52, 12, 0, 7); x.fill() }
        x.fillStyle = GOLD; x.fillRect(-14, -140, 28, 280); x.fillRect(-140, -14, 280, 28)
        x.restore()
      }
      label(x, 790, 1110, 'KEEPING THIS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05 })
    } },
  { sign: S, cap: 'Their birthday wish? | *For everyone else.*', mood: 'heart', tears: 2, look: [1, -1], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'I wish… for | all of you!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 1.0 + i * 0.15, 0.3, 2); if (k > 0.01) signChar(x, t, ['aries', 'leo', 'virgo', 'scorpio', 'capricorn'][i], 660 + i * 65, 960 + (i % 2) * 40, 100 * k, { mood: 'sparkle', seed: 50 + i, glyph: false, glow: 0.6 }) }
      sparkles(x, t, 790, 960, P.t0 + 1.6, 8, 190, 0.3)
    } },
  { sign: S, cap: 'Turned a year older. | *Grieved the old year.*', mood: 'neutral', tears: 3, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (box(x, 790, 860, 260, 300, pop01(t, P.t0 + 0.2, 0.35, 2), BONE, 0.04)) {
        x.fillStyle = RED; x.fillRect(-130, -150, 260, 60)
        x.fillStyle = '#fff4e2'; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LAST YEAR', 0, -120)
        x.fillStyle = INK; x.font = `800 110px ${INTER}`; x.fillText('365', 0, 20)
        x.restore()
      }
      bubble(x, 790, 1110, 'we had so much fun', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 30, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'One balloon floated off. | *Waved till sunset.*', mood: 'neutral', tears: 2, look: [1, -1], star: { x: -190 }, hops: [0.9, 1.7],
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = clamp(lt / 0.6) * 0.8
      x.fillStyle = '#ff9a5a'; x.beginPath(); x.arc(790, 1180, 150, Math.PI, 0); x.fill()
      x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(790, 1180, 100, Math.PI, 0); x.fill()
      x.restore()
    },
    front(x, t, lt, P, F) {
      const y = lerp(960, 560, ease.inOutQuad(clamp((lt - 0.2) / 2.2)))
      balloon(x, t, 800, y, 18, PINK, 1)
      bubble(x, 560, 620, 'bye, friend!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Birthday horoscope: | *“big feelings.”* Accurate.', mood: lt => lt > 1.3 ? 'wide' : 'squint', tears: lt => lt > 1.3 ? 3 : 1, look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (box(x, 790, 860, 300, 320, pop01(t, P.t0 + 0.2, 0.35, 2), '#140c30', -0.04)) {
        x.strokeStyle = SEA; x.lineWidth = 4; x.strokeRect(-130, -140, 260, 280)
        x.fillStyle = SEA; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♓︎ TODAY', 0, -100)
        x.fillStyle = BONE; x.font = `800 44px ${INTER}`; x.fillText('big', 0, -10); x.fillText('feelings.', 0, 48)
        x.restore()
      }
      label(x, 790, 1110, 'NAILED IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.05 })
    } },
  { sign: S, cap: 'Party of twelve. | *Hugged each one twice.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -200 }, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      const n = Math.min(24, Math.floor(clamp((lt - 0.3) / 1.7) * 24))
      label(x, 790, 700, `HUGS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 52, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 1060, P.t0 + 0.5, { n: 8, life: 2.6, spread: 260, cell: 9, seed: 6 })
    } },
  { sign: S, cap: 'Gave away every slice. | *Happiest one there.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 960); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 170, 50, 0, 0, 7); x.fill(); x.fillStyle = '#fbf7ee'; x.beginPath(); x.ellipse(0, -4, 160, 42, 0, 0, 7); x.fill(); x.fillStyle = PINK; x.fillRect(-12, -10, 10, 6); x.fillRect(30, 4, 8, 6); x.restore() }
      label(x, 790, 700, 'CAKE LEFT: 0', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'best day ever', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0197', key: 'E', accent: SEA, solo: S, ending: 'group',
  title: 'Pisces birthdays | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Best birthday ever. | *Cried all day.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
