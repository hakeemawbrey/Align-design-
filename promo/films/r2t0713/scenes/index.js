// r2t0713: star_talk, BE LIKE, "Zodiacs on Sunday | night be like." (signs3kit social cut, music: lofi · G, ending: callback)
//   0.0–3.6    "Zodiacs on Sunday | *night be like.*"  The twelve line up, then the cards start.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries starts Monday at 11:59 · Taurus: Sunday scaries? fourth snack · Gemini texting three matches at
//              once · Cancer packed everyone's lunches · Leo's Monday outfit has a cape · Virgo colour-coded the week,
//              then the colours · Libra lit three candles for ambience · Scorpio rereading old texts from 2019 · Sag
//              booked a flight to avoid Monday · Capricorn: inbox zero, Monday's emails done · Aquarius at midnight,
//              learning how clocks work · Pisces sobbing because the weekend's over
//  49.2        "Monday? | *Never heard of her.*"
//  52.6        callback: "Sag sent a postcard. | *From Tuesday.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, board, clock, ticket, friend, HANGER, HANGER_C, CANDLE, CANDLE_C, PLANE, PLANE_C, RED, CREAM, GREEN, ORANGE, VIOLET, WOOD, NIGHT } from './props.js'

const CAPE = [
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'RRRRRRRRRRR'.slice(0, 10),
  'RRRRrRRRRR',
  'RRRRrRRRRR',
  'RRRrRRrRRR',
  'RRRrRRrRRR',
  'RRrRRRRrRR',
  'RRrRRRRrRR',
  'RrRRRRRRrR',
  'RRRRRRRRRR',
]
const BOWL = [
  'W.WW.W.WW.W.',
  'WWWWWWWWWWWW',
  'YYYYYYYYYYYY',
  'RYYRRYYRRYYR',
  '.RYYRRYYRRY.',
  '..RRRRRRRR..',
]
const BOWL_C = { W: CREAM, Y: '#ffe08a', R: RED }
const LUNCH = ['.KKKK.', 'BBBBBB', 'BBBBBB', 'BWBBWB', 'BBBBBB']
// a flowing cape on the hanger, gold clasp on top
function cape(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 14 * Math.sin(t * 3)
  const shape = (pad) => { x.beginPath(); x.moveTo(-60 - pad, -pad); x.lineTo(60 + pad, -pad); x.quadraticCurveTo(120 + pad, 160, 150 + pad + w, 330 + pad); x.lineTo(-150 - pad + w, 330 + pad); x.quadraticCurveTo(-120 - pad, 160, -60 - pad, -pad); x.fill() }
  x.fillStyle = INK; shape(8); x.fillStyle = RED; shape(0)
  x.fillStyle = '#b02a3a'; x.fillRect(-20 + w * 0.3, 60, 12, 250); x.fillRect(50 + w * 0.6, 80, 12, 230); x.fillRect(-90 + w * 0.6, 90, 12, 220)
  x.fillStyle = INK; x.fillRect(-26, -14, 52, 40); x.fillStyle = GOLD; x.fillRect(-20, -8, 40, 28)
  x.restore()
}
// a week planner whose colour key keeps growing
function planner(x, t, cx, cy, k, lt) {
  board(x, cx, cy, k, { w: 360, h: 260, frame: '#c7e07a', bg: CREAM }, x => {
    const COLS = ['#ff6b5e', '#ffd23a', '#7dd87a', '#9ad7ff', '#b06bff', '#ff9ac0', '#ffb34a']
    x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    'MTWTFSS'.split('').forEach((d, i) => x.fillText(d, -150 + i * 50, -100))
    const n = Math.floor(clamp((lt - 0.3) / 1.4) * 21)
    for (let q = 0; q < n; q++) { const c = q % 7, r = Math.floor(q / 7); x.fillStyle = COLS[(q * 3) % 7]; x.fillRect(-170 + c * 50, -70 + r * 56, 40, 40) }
  })
}
// an inbox counting down to zero
function inbox(x, cx, cy, k, lt) {
  const n = Math.max(0, 48 - Math.floor(clamp((lt - 0.3) / 1.2) * 48))
  phone(x, cx, cy, 1.05 * k, { head: 'INBOX', headCol: '#7dd87a', lines: [] })
  if (k > 0.01) { x.save(); x.translate(cx, cy); x.scale(k, k); x.font = `800 110px ${INTER}`; x.fillStyle = n === 0 ? MINT : BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), 0, 20); x.restore() }
}
// a clock opened up: gears
function gears(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const gear = (gx, gy, r, a, col) => { x.save(); x.translate(gx, gy); x.rotate(a); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = col; for (let i = 0; i < 8; i++) { x.save(); x.rotate(i / 8 * Math.PI * 2); x.fillRect(-10, -r - 14, 20, 24); x.restore() } x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r * 0.3, 0, Math.PI * 2); x.fill(); x.restore() }
  gear(-60, 0, 70, t * 1.2, GOLD); gear(70, -50, 46, -t * 1.8, '#c9c9d8'); gear(60, 80, 40, -t * 2.1, ORANGE)
  x.restore()
}
// a postcard
function postcard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-200, -120, 420, 260)
  x.fillStyle = INK; x.fillRect(-218, -138, 436, 276); x.fillStyle = CREAM; x.fillRect(-210, -130, 420, 260)
  x.fillStyle = SKYB; x.fillRect(-196, -116, 190, 232); x.fillStyle = GOLD; x.beginPath(); x.arc(-100, -40, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#5fd068'; x.fillRect(-196, 60, 190, 56)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('wish you', 10, -60); x.fillText('were here!', 10, -20)
  x.font = `700 24px ${MONO}`; x.fillStyle = RED; x.fillText('– Sag, TUE', 10, 40)
  x.strokeStyle = RED; x.lineWidth = 4; x.strokeRect(130, -116, 66, 76)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Started Monday | *at 11:59 p.m.*', mood: 'squint', look: [1, 0], star: { x: -190 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      clock(x, 790, 790, pop01(t, P.t0 + 0.2, 0.35, 2), 11, 59 + (lt > 1.6 ? 1 : 0))
      label(x, 790, 1000, 'MONDAY: STARTED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, font: MONO, weight: 700, rot: -0.04 })
      bubble(x, 790, 1120, 'GO GO GO', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Sunday scaries? | *Fourth snack.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 1], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 3)
      label(x, 790, 700, `SNACK ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: GOLD, font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Texting three matches | *at once.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.9, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) phone(x, 670 + i * 120, 820 + i * 40, 0.74 * pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2), { head: '✦ MATCH', headCol: [GOLD, PINK, MINT][i], rot: -0.1 + i * 0.1, lines: [['hey!!', BONE, 1], ['lol same', LAV, 1]] })
    } },
  { sign: 'cancer', cap: 'Already packed | *everyone’s lunches.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, GOLD, MINT, LAV]
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2.2); drawBits(x, LUNCH, { K: INK, B: COLS[i], W: CREAM }, 720 + (i % 2) * 130, 1040 - Math.floor(i / 2) * 110 - (i % 2) * 50, 18 * k) }
      label(x, 790, 640, 'EVEN THE CAT’S', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Ironed Monday’s outfit. | *It has a cape.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, HANGER, HANGER_C, 790, 650, 12 * k)
      cape(x, t, 790, 690, k)
      sparkles(x, t, 790, 860, P.t0 + 1.2, 7, 180, 0.4)
      label(x, 790, 1120, 'BUSINESS CASUAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Colour-coded the week. | *Then the colours.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      planner(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1060, 'COLOUR KEY v7', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: '#c7e07a', font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Lit three candles. | *For ambience.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CANDLE, CANDLE_C, 700 + i * 100, 940 - (i === 1 ? 50 : 0), 16 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), { sx: 1 + 0.06 * Math.sin(t * 9 + i) })
      label(x, 800, 680, 'VIBE: CURATED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, font: MONO, weight: 700, rot: -0.05 })
    } },
  { sign: 'scorpio', cap: 'Rereading old texts | *from 2019.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MAR 2019', headCol: '#ff5e8a', lines: [['k.', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['what did', LAV, pop01(t, P.t0 + 1.0, 0.25, 2.2)], ['“k.” MEAN', LAV, pop01(t, P.t0 + 1.3, 0.25, 2.2)]] })
    } },
  { sign: 'sagittarius', cap: 'Booked a flight | *to avoid Monday.*', mood: 'sparkle', look: [1, -1], star: { x: -200 }, hops: [0.7, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLANE, PLANE_C, lerp(700, 900, ease.inOutCubic(prog(lt, 0.3, 2.0))), lerp(780, 640, prog(lt, 0.3, 2.0)), 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.25 })
      ticket(x, 790, 980, pop01(t, P.t0 + 0.8, 0.3, 2.2), 'ONE WAY', 'NOT MONDAY', { bg: GOLD })
    } },
  { sign: 'capricorn', cap: 'Inbox zero. | *Monday’s emails too.*', mood: lt => lt > 1.6 ? 'wink' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { inbox(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'aquarius', cap: 'Midnight: | *learning how clocks work.*', mood: 'wide', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      gears(x, t, 790, 830, pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 1080, 'oh it’s GEARS', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Sobbing because | *the weekend’s over.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), fly = ease.inCubic(prog(lt, 0.9, 1.8))
      label(x, 790 + fly * 200, 760 - fly * 120, 'SAT', k * (1 - fly), { size: 44, bg: GOLD, font: MONO, weight: 700, rot: 0.1 + fly })
      label(x, 790 + fly * 60, 880 - fly * 200, 'SUN', k * (1 - prog(lt, 1.4, 2.2)), { size: 44, bg: PINK, font: MONO, weight: 700, rot: -0.06 - fly })
      label(x, 790, 1060, 'MON', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: '#c7c0b0', font: MONO, weight: 700, rot: 0.03 })
    } },
]

const F = makeFilm({
  id: 'r2t0713', key: 'G', accent: LAV, ending: 'callback',
  title: 'Zodiacs on Sunday | *night be like.*',
  cameos: CAMEOS,
  group: { cap: 'Monday? | *Never heard of her.*' },
  last: {
    text: 'Sag sent a postcard. | *From Tuesday.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, PLANE, PLANE_C, lerp(140, 1000, ease.inOutCubic(prog(lt, 0.2, 2.4))), lerp(1300, 900, prog(lt, 0.2, 2.4)), 12, { rot: -0.2, alpha: 1 - prog(lt, 2.2, 2.6) })
      postcard(x, 540, 1120, 1.45 * pop01(t, t0 + 0.9, 0.4, 2), lt)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
