// r2t0213: star_talk, ROLLCALL, "The signs | at the mall." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself at the mall. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "The signs | *at the mall.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ at the doors before opening · ♉ came for socks, left with a couch · ♊ asked a mannequin its sign
//              · ♋ packed lunch at the food court · ♌ walked the mall like a runway · ♍ refolded the whole store
//              · ♎ two sweaters, hour three (polled their match) · ♏ found the secret clearance rack
//              · ♐ rode the down escalator up · ♑ didn't shop, negotiated a lease · ♒ only the weird little store
//              · ♓ the fountain wish came true, sobbing
//  49.2        "Nobody came | for *socks.*"  The twelve fly up into a group photo.
//  52.6        callback: "Taurus’s new couch? | *Already napping.*"  The couch comes back with Taurus asleep on it.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a', TEAL = '#4fb3a6', PLUM = '#b06bd6'

// ── props
const COUCH = [
  '.BBBBBBBBBBBBBB.',
  'BBbBBBBbBBBBbBBB',
  'BBbBBBBbBBBBbBBB',
  'BBBBBBBBBBBBBBBB',
  'AACCCCCCCCCCCCAA',
  'AACCCCCCCCCCCCAA',
  'AAAAAAAAAAAAAAAA',
  '.K............K.',
]
const COUCH_C = { B: '#7a5ccf', b: '#5a3fa8', C: '#9a7ce8', A: '#6a4cbf', K: INK }
const SOCKS = ['.WW.', '.SS.', '.WW.', '.SSS', '.WWW']
const MANNEQUIN = [
  '...WWW...',
  '...WWW...',
  '....W....',
  '.RRRRRRR.',
  'RRRRRRRRR',
  'R.RRRRR.R',
  'R.RRRRR.R',
  '..BBBBB..',
  '..BB.BB..',
  '..BB.BB..',
  '..BB.BB..',
  '....K....',
  '..KKKKK..',
]
const MANNEQUIN_C = { W: '#e8dccb', R: PINK, B: '#3a5a9a', K: '#5b5d78' }
const LUNCH = [
  '....KKK....',
  '....K.K....',
  'RRRRRRRRRRR',
  'RRRRRWRRRRR',
  'RRRRWWWRRRR',
  'RRRRRWRRRRR',
  'RRRRRRRRRRR',
  'rrrrrrrrrrr',
]
const LUNCH_C = { K: INK, R: SKYB, r: '#5aa8c9', W: CREAM }
const SHIRT = ['SSSSSSSS', 'SsSSSSsS', 'SSSSSSSS']
const SWEATER = [
  'SS.SSSS.SS',
  'SSSSSSSSSS',
  'SSSSWWSSSS',
  '.SSSSSSSS.',
  '.SSSSSSSS.',
  '.SSSSSSSS.',
  '.ssssssss.',
]
const COIN = ['.YY.', 'YyYY', 'YYYY', '.YY.']

const CAMEOS = [
  { sign: 'aries', cap: 'At the doors | *before they opened.*', mood: lt => lt > 1 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k)
        x.fillStyle = INK; x.fillRect(624, 620, 332, 470); x.fillStyle = 'rgba(143,227,255,0.25)'; x.fillRect(634, 630, 152, 450); x.fillRect(794, 630, 152, 450)
        x.fillStyle = '#8a8aa0'; x.fillRect(770, 820, 10, 80); x.fillRect(800, 820, 10, 80)
        x.restore()
      }
      label(x, 790, 720, 'OPENS AT 10', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 790, 1120, 'IT’S 6:40 AM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 610, 'OPEN UP!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Came for socks. | Left with *a couch.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SOCKS, { W: CREAM, S: PINK }, 790, 760, 16 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - prog(lt, 0.9, 1.1)))
      label(x, 790, 640, 'LIST: SOCKS', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, COUCH, COUCH_C, 790, 980, 20 * pop01(t, P.t0 + 1.2, 0.35, 2))
      sparkles(x, t, 790, 960, P.t0 + 1.25, 7, 200, 0.3)
    } },
  { sign: 'gemini', cap: 'Asked a mannequin | *its sign.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, MANNEQUIN, MANNEQUIN_C, 800, 900, 30 * pop01(t, P.t0 + 0.15, 0.35, 2))
      bubble(x, 520, 620, 'what’s | your sign?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 800, 1140, 'NO REPLY. STILL CHATTING.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Food court? | Brought *a packed lunch.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, LUNCH, LUNCH_C, 790, 900, 22 * pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 680, 'MADE WITH LOVE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'there’s extra!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Walked the mall | like *a runway.*', mood: 'sparkle', star: { x: -40, y: -20, s: 280 }, hops: [0.7, 1.4],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.1, 0.5))
      if (k <= 0.01) return
      x.save(); x.fillStyle = RED; x.beginPath(); x.moveTo(470, 1040); x.lineTo(610, 1040); x.lineTo(540 + 260 * k, 1200); x.lineTo(540 - 260 * k, 1200); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 640, 'NOW WALKING: LEO', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      for (let i = 0; i < 3; i++) sparkles(x, t, 260 + i * 280, 760 + (i % 2) * 120, P.t0 + 0.8 + i * 0.35, 6, 70, i)
      bubble(x, 290, 640, '*flash*', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'virgo', cap: 'Refolded | *the entire store.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, GOLD, LAV, ORANGE, '#ff9ccf', TEAL]
      const n = Math.floor(clamp((lt - 0.2) / 1.4) * 8)
      for (let i = 0; i < n; i++) drawBits(x, SHIRT, { S: COLS[i], s: INK }, 700 + (i % 2) * 180, 1060 - Math.floor(i / 2) * 64, 18)
      label(x, 790, 650, 'AISLE 4: FIXED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: '#9fe0a8', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Two sweaters. | Decision hour *three.*', mood: 'squint', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: 0, y: 40, s: 240 },
    front(x, t, lt, P) {
      const pick = Math.floor(lt * 2) % 2
      drawBits(x, SWEATER, { S: PINK, s: '#d96a96', W: CREAM }, 260, 860, (pick ? 17 : 21) * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, SWEATER, { S: SKYB, s: '#5aa8c9', W: CREAM }, 820, 860, (pick ? 21 : 17) * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 540, 620, 'HOUR 3', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 540, 1120, 'polling my match…', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: LAV, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Found the *secret* | clearance rack.', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k)
        x.fillStyle = INK; x.fillRect(660, 640, 260, 420); x.fillStyle = '#3a2a5a'; x.fillRect(670, 650, 240, 400)
        const op = ease.inOutCubic(prog(lt, 0.6, 1.2))
        x.fillStyle = '#ffe9a8'; x.fillRect(670, 650, 240 * op, 400)
        x.fillStyle = INK; x.fillRect(880, 840, 14, 30)
        x.restore()
        if (op > 0.5) { x.fillStyle = INK; x.fillRect(690, 720, 200 * op, 8); for (let i = 0; i < 4; i++) { x.fillStyle = [PINK, MINT, SKYB, GOLD][i]; x.fillRect(700 + i * 46, 730, 34, 90 * op) } }
      }
      label(x, 790, 1120, 'EVERYTHING $1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PLUM, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Ran up | *the down escalator.*', mood: lt => lt > 1 ? 'sparkle' : 'wide', star: { x: 0, y: 0, s: 230 }, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.beginPath(); x.moveTo(200, 1150); x.lineTo(880, 590); x.lineTo(880, 680); x.lineTo(280, 1180); x.closePath(); x.fill()
      x.fillStyle = '#8a8aa0'; for (let i = 0; i < 10; i++) { const u = ((i / 10) + t * 0.5) % 1; x.fillRect(lerp(860, 230, u) - 26, lerp(610, 1150, u) - 8, 52, 12) }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 1110, '↓ DOWN ONLY', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 300, 640, 'cardio!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Didn’t shop. | *Negotiated a lease.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -180, 280, 360); x.fillStyle = CREAM; x.fillRect(-132, -172, 264, 344)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LEASE', 0, -128)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 5; i++) x.fillRect(-104, -80 + i * 34, 208 - (i % 2) * 40, 10)
        const s = clamp((lt - 0.7) / 0.6)
        x.strokeStyle = '#3a5a9a'; x.lineWidth = 6; x.beginPath(); for (let i = 0; i <= 20 * s; i++) { const u = i / 20; const px = -90 + u * 180, py = 120 + Math.sin(u * 18) * 14; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
        x.restore()
      }
      label(x, 790, 1110, 'UNIT 12: MINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: '#9fb7c9', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Only shopped at | *the weird little store.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k)
        x.fillStyle = INK; x.fillRect(640, 640, 300, 440); x.fillStyle = '#2a5a6a'; x.fillRect(650, 650, 280, 420)
        x.fillStyle = '#ffe9a8'; x.fillRect(670, 740, 240, 160)
        x.restore()
        label(x, 790, 680, 'ODD THINGS', k, { size: 32, bg: '#6fe3ff', rot: -0.02, font: MONO, weight: 700 })
        drawBits(x, ['..G..', '.GGG.', 'GWGWG', 'GGGGG', '.G.G.'], { G: MINT, W: INK }, 740, 830, 14 * k)
        drawBits(x, ['.PPP.', 'PPPPP', '.P.P.', 'PP.PP'], { P: PLUM }, 850, 840, 14 * k, { rot: 0.2 })
      }
      label(x, 790, 1120, 'BOUGHT: ALL OF IT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Fountain wish came true. | *Sobbing.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', tears: lt => lt > 1.2 ? 3 : 1, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k)
        x.fillStyle = INK; x.fillRect(620, 960, 340, 110); x.fillStyle = '#8a8aa0'; x.fillRect(630, 970, 320, 90); x.fillStyle = SKYB; x.fillRect(644, 980, 292, 40)
        x.fillStyle = INK; x.fillRect(772, 820, 36, 150); x.fillStyle = '#8a8aa0'; x.fillRect(778, 826, 24, 140)
        for (let i = 0; i < 8; i++) { const ph = (t * 1.2 + i / 8) % 1, d = i % 2 ? 1 : -1; x.fillStyle = SKYB; x.fillRect(790 + d * ph * 120, 820 - Math.sin(Math.PI * ph) * 90 + ph * 140, 12, 12) }
        x.restore()
      }
      const c = prog(lt, 0.4, 0.9)
      if (c > 0 && c < 1) drawBits(x, COIN, { Y: GOLD, y: '#c98f2a' }, lerp(500, 760, c), 900 - Math.sin(Math.PI * c) * 200, 10)
      label(x, 790, 680, 'WISH: GRANTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 170, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2t0213', key: 'G', accent: ORANGE, ending: 'callback',
  title: 'The signs | *at the mall.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody came | for *socks.*' },
  last: {
    text: 'Taurus’s new couch? | *Already napping.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.6, 0.35, 2)
      drawBits(x, COUCH, COUCH_C, 540, 1120, 26 * k)
      if (k > 0.5) signChar(x, t, 'taurus', 540, 960, 230 * k, { mood: 'sleepy', seed: 77, glyph: false })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
