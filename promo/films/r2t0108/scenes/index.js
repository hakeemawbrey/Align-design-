// r2t0108: star_talk, BELIKE, "Finding parking? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each one's most extreme way of finding a parking spot.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ saw a spot, floored it · ♉ circled forty laps for the closest one · ♊ texted a match, forgot where they parked
//              · ♋ waved three cars in first · ♌ saw RESERVED, assumed it's for them · ♍ re-parked six times, now centred
//              · ♎ can't choose between two empty spots · ♏ has a secret spot, will never tell · ♐ parked a mile away, called it a hike
//              · ♑ pre-booked a spot three weeks ago · ♒ rode a scooter, no parking needed · ♓ finally found one, happy sobbing
//  49.2        "Twelve drivers. | *One spot.*"
//  52.6        "Taurus, lap forty-one: | *front row.*"  The lap counter comes back; Taurus's car rolls into FRONT ROW (callback).
import { prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LIME = '#b6f05a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a'

// ── props
const CAR = [
  '....KKKKKK.....',
  '...KCCWWCCK....',
  '..KCCWWWWCCK...',
  'KKCCCCCCCCCCKKK',
  'KCCCCCCCCCCCCYK',
  'KCCCCCCCCCCCCCK',
  'KKKTTKKKKKTTKKK',
  '...TT.....TT...',
]
const carC = c => ({ K: INK, C: c, W: SKYB, Y: GOLD, T: '#2a2350' })
const SCOOTER = [
  '..........HH',
  '..........H.',
  '..........H.',
  '.........H..',
  '.........H..',
  'SSSSSSSSSH..',
  '.SSSSSSSSH..',
  'TT.......TT.',
  'TT.......TT.',
]
const SCOOTER_C = { H: '#9aa5c4', S: LIME, T: '#2a2350' }
const BOOT = ['.KKKK....', '.KBBK....', '.KBBK....', '.KBBK....', 'KBBBBKKK.', 'KBBBBBBBK', 'KKKKKKKKK']
const BOOT_C = { K: INK, B: '#a8714a' }
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'GGGGGGGG', 'GGGKKGGG', 'GGGKKGGG', 'GGGGGGGG']
const LOCK_C = { K: '#9aa5c4', G: GOLD }

// a parking bay: two white lines on dark asphalt, optional letter painted in it
function bay(x, cx, cy, w, h, { letter = null, col = BONE } = {}) {
  x.fillStyle = '#2a2350'; x.fillRect(cx - w / 2 - 20, cy - h / 2, w + 40, h)
  x.fillStyle = col; x.fillRect(cx - w / 2 - 20, cy - h / 2, 10, h); x.fillRect(cx + w / 2 + 10, cy - h / 2, 10, h)
  if (letter) { x.fillStyle = 'rgba(239,230,214,0.35)'; x.font = `800 56px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(letter, cx, cy + h / 2 - 40) }
}
// a little sign on a post
function sign(x, cx, cy, k, text, { bg = SKYB, color = INK, size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-8, 0, 16, 180); x.fillStyle = '#9aa5c4'; x.fillRect(-4, 0, 8, 180)
  x.font = `800 ${size}px ${INTER}`; const lines = text.split('|'), w = Math.max(...lines.map(l => x.measureText(l).width)) + 40, h = lines.length * size * 1.15 + 28
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h - 6, w + 12, h + 12); x.fillStyle = bg; x.fillRect(-w / 2, -h, w, h)
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l.trim(), 0, -h + 14 + size * 1.15 * (i + 0.5)))
  x.restore()
}
// a ticket / booking stub
function ticket(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -100, 316, 216)
  x.fillStyle = INK; x.fillRect(-162, -112, 324, 224); x.fillStyle = CREAM; x.fillRect(-154, -104, 308, 208)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('BOOKING #0001', 0, -66); x.fillRect(-130, -42, 260, 4)
  x.font = `800 48px ${INTER}`; x.fillText('SPOT B-12', 0, 4)
  x.font = `700 24px ${MONO}`; x.fillText('booked: 3 weeks ago', 0, 62)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Saw a spot. | *Floored it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      bay(x, 800, 960, 300, 220)
      const go = ease.inCubic(prog(lt, 0.4, 0.9)), park = ease.outBack ? ease.outBack(prog(lt, 0.9, 1.2)) : prog(lt, 0.9, 1.2)
      const cx = lt < 0.9 ? lerp(440, 780, go) : lerp(780, 800, park)
      if (lt > 0.4 && lt < 1.0) { x.fillStyle = 'rgba(239,230,214,0.6)'; for (let i = 0; i < 3; i++) x.fillRect(cx - 210 - i * 30, 930 + i * 26, 90, 8) }
      drawBits(x, CAR, carC(RED), cx, 960, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 800, 690, 'PARKED IN 2 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Circled forty laps | *for the closest one.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = k; x.strokeStyle = 'rgba(239,230,214,0.4)'; x.lineWidth = 8; x.setLineDash([18, 14]); x.beginPath(); x.ellipse(790, 900, 170, 110, 0, 0, Math.PI * 2); x.stroke(); x.setLineDash([]); x.restore()
        const a = lt * 4.2
        drawBits(x, CAR, carC(MINT), 790 + Math.cos(a) * 170, 900 + Math.sin(a) * 110, 12 * k, { sx: Math.sin(a) > 0 ? -1 : 1 })
      }
      const lap = Math.min(40, Math.floor(1 + lt * 18))
      label(x, 790, 900, `LAP ${lap}`, pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'closer…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Texted a match. | *Lost the car.*', mood: lt => lt > 1.3 ? 'wide' : 'wink', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'omg you’re | SO funny', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      for (let i = 0; i < 3; i++) drawBits(x, CAR, carC([SKYB, LAV, GOLD][i]), 700 + (i % 2) * 180, 890 + i * 80, 10 * pop01(t, P.t0 + 0.9 + i * 0.1, 0.3, 2))
      label(x, 790, 1150, 'CAR: ???', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Waved three cars in | *before parking.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const go = ease.inOutCubic(prog(lt, 0.3 + i * 0.5, 0.9 + i * 0.5))
        if (lt > 0.25 + i * 0.5) drawBits(x, CAR, carC([LAV, ORANGE, SKYB][i]), lerp(1000, 640, go), 1000 - i * 4, 12, { alpha: 1 - go })
      }
      bubble(x, 790, 720, 'after you! ♡', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 790, 1130, 'STILL WAITING', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Saw “RESERVED.” | *Assumed: for them.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.1],
    front(x, t, lt, P, F) {
      sign(x, 800, 920, pop01(t, P.t0 + 0.15, 0.3, 2), 'RESERVED', { bg: GOLD, size: 44 })
      drawBits(x, ['Y.Y.Y', 'YYYYY', 'YYYYY'], { Y: GOLD }, F.x, F.top - 30, 14 * pop01(t, P.t0 + 1.0, 0.3, 2.4))
      bubble(x, 800, 650, 'naturally.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      sparkles(x, t, F.x, F.top - 30, P.t0 + 1.1, 7, 120, 0.3)
    } },
  { sign: 'virgo', cap: 'Re-parked six times. | *Now it’s centred.*', mood: 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bay(x, 800, 960, 310, 220)
      const n = Math.min(6, 1 + Math.floor(lt * 3)), wob = lt < 1.6 ? Math.sin(n * 2.3) * 40 : 0
      drawBits(x, CAR, carC('#7ad18a'), 800 + wob, 960, 19 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lt < 1.6 ? Math.sin(n * 1.7) * 0.08 : 0 })
      label(x, 800, 700, `TRY ${n}/6`, pop01(t, P.t0 + 0.4, 0.3, 2.4) * (lt < 1.7 ? 1 : 0), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 700, 'OFF BY: 0.0 CM', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Two empty spots. | *Still deciding.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: lt => [Math.sin(lt * 3) > 0 ? 1 : -1, 0], star: { x: 0, y: 40, s: 240 },
    front(x, t, lt, P) {
      bay(x, 270, 1000, 150, 220, { letter: 'A' }); bay(x, 810, 1000, 150, 220, { letter: 'B' })
      bubble(x, 270, 760, 'A?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 48, tail: 'bc' })
      bubble(x, 810, 760, 'B?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, tail: 'bc' })
      label(x, 540, 620, 'TIME: 25 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Has a secret spot. | *Will never tell.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, LOCK, LOCK_C, 800, 880, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 800, 660, 'where’d you park??', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      label(x, 800, 1110, 'NICE TRY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Parked a mile away. | *Called it a hike.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      sign(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 'CAR → | 1 MILE', { bg: MINT, size: 40 })
      drawBits(x, BOOT, BOOT_C, 640, 1090, 18 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: Math.sin(t * 8) * 0.1 })
      bubble(x, 880, 1110, 'cardio!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Booked a spot | *three weeks ago.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ticket(x, 800, 860, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      label(x, 800, 1090, 'ARRIVED: 40 MIN EARLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Took a scooter. | *Parking? Who?*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      const ride = ease.inOutCubic(prog(lt, 0.3, 1.3))
      drawBits(x, SCOOTER, SCOOTER_C, lerp(1000, 790, ride), 980, 23 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 700, 'PROBLEM: SOLVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Finally found one. | *Happy sobbing.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 2, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bay(x, 790, 960, 300, 220)
      drawBits(x, CAR, carC(LAV), 790, 960, 19 * pop01(t, P.t0 + 0.15, 0.3, 2))
      x.fillStyle = 'rgba(143,227,255,0.6)'; const pw = 260 * ease.outCubic(prog(lt, 0.6, 2.2)); x.beginPath(); x.ellipse(380, 1130, pw, 24, 0, 0, Math.PI * 2); x.fill()
      bubble(x, 800, 690, 'it’s PERFECT', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0108', key: 'G', accent: LIME, ending: 'callback',
  title: 'Finding parking? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve drivers. | *One spot.*' },
  last: {
    text: 'Taurus, lap forty-one: | *front row.*',
    draw(x, t, lt) {
      const t0 = t - lt
      sign(x, 760, 900, pop01(t, t0 + 0.4, 0.4, 2), 'FRONT | ROW', { bg: GOLD, size: 48 })
      bay(x, 760, 1180, 380, 240)
      const roll = ease.outCubic(prog(lt, 0.7, 1.6))
      drawBits(x, CAR, carC(MINT), lerp(1300, 760, roll), 1180, 24)
      signChar(x, t, 'taurus', 300, 1120, 260, { mood: lt > 1.6 ? 'heart' : 'squint', pop: pop01(t, t0 + 0.5, 0.4, 2), seed: 9, hops: [t0 + 1.7], look: [1, 0] })
      label(x, 300, 1310, 'LAP 41', pop01(t, t0 + 0.6, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 760, 1180, t0 + 1.6, 8, 200, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
