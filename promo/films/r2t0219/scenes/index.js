// r2t0219: star_talk, BE LIKE, "Bad nap? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each waking up from a nap that went wrong, at its most extreme.
//   0.0–3.6    "Bad nap? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ woke up late, sprinted to nowhere · ♉ 20-minute nap, woke up next Tuesday · ♊ forgot which twin they are
//              · ♋ woke at dusk, mourned the day · ♌ hair ruined forever · ♍ 3 minutes over, rewrote the schedule
//              · ♎ match asked "awake?", still deciding · ♏ trusts no clock · ♐ sleep-booked a flight
//              · ♑ lost an hour, billed themself · ♒ thinks it's the year 3000 · ♓ dreamt of a puppy, no puppy
//  49.2        "Nobody | *woke up okay.*"  Group photo.
//  52.6        callback: "Taurus? | *Napping again.*"  Taurus back asleep, the calendar flipping past Tuesday.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, clock, sun, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const TICKET = ['KKKKKKKKKKKK', 'KWWWWWWW.WWK', 'KWBBBBWW.WWK', 'KWWWWWWW.WWK', 'KWBBBWWW.WWK', 'KKKKKKKKKKKK']
const PUPPY = ['B..........B', 'BB.BBBBBB.BB', '.BBBBBBBBBB.', '.BBKBBBBKBB.', '.BBBBBBBBBB.', '..BBBNNBBB..', '...BBPPBB...']
const PUPPY_C = { B: '#e8a24a', K: INK, N: INK, P: '#ff8fb1' }

/** a tear-off desk calendar showing a day name */
function deskCal(x, cx, cy, k, day, { rot = 0.04, top = 'WOKE UP:' } = {}) {
  if (k <= 0.01) return
  card(x, cx, cy, 300, 280, k, { bg: CREAM, rot }, () => {
    x.fillStyle = RED; x.fillRect(-150, -140, 300, 70)
    txt(x, top, 0, -104, { size: 28, font: MONO, weight: 700, color: CREAM })
    txt(x, day, 0, 30, { size: 52 })
    txt(x, 'next week', 0, 96, { size: 26, font: MONO, weight: 700, color: '#6b62a8' })
  })
}
/** little motion streaks behind a running star */
function streaks(x, cx, cy, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.fillStyle = BONE
  for (let i = 0; i < 4; i++) x.fillRect(cx - 220 - i * 30, cy - 70 + i * 46, 140 - i * 20, 10)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Woke up late. | Sprinted *to nowhere.*', mood: 'wide', look: [1, 0], star: { x: -160 }, hops: [0.3, 0.6, 0.9, 1.2, 1.5],
    front(x, t, lt, P, F) {
      streaks(x, F.x, F.cy, prog(lt, 0.2, 0.4))
      bubble(x, 780, 680, 'I’M LATE!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 900, 'LATE FOR: NOTHING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: '20-minute nap. | Woke up *next Tuesday.*', mood: lt => lt > 1.0 ? 'wide' : 'sleepy', look: [1, 0], star: { x: -170, y: 20 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { W: CREAM }, 370, 1050, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const D = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE']
      const i = Math.min(8, Math.floor(Math.max(0, lt - 0.3) / 0.1))
      deskCal(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), D[i] === 'TUE' && i === 8 ? 'TUESDAY' : D[i])
      label(x, 790, 1090, 'NAP: 8 DAYS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Forgot which twin | *they are.*', mood: lt => lt > 1.2 ? 'wide' : 'sleepy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 960, 220 * k, { mood: lt > 1.2 ? 'wide' : 'sleepy', look: [-1, 0], seed: 19, glyph: false })
      bubble(x, 350, 610, 'am I me?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bc' })
      bubble(x, 800, 680, 'or am I me?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, col: PINK, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Woke up at dusk. | *Mourned the day.*', mood: 'neutral', look: [1, 1], star: { x: -170 },
    back(x, t, lt, P) {
      const s = ease.inOutCubic(prog(lt, 0.2, 1.4))
      x.save(); x.globalAlpha = 0.4; const g = x.createLinearGradient(0, 480, 0, 1220); g.addColorStop(0, '#ff9a4a'); g.addColorStop(1, '#5a2a6a'); x.fillStyle = g; x.fillRect(120, 480, 840, 740); x.restore()
      sun(x, t, 800, lerp(760, 1130, s), 60, pop01(t, P.t0 + 0.1, 0.3, 2))
      x.save(); x.fillStyle = '#140c30'; x.fillRect(120, 1130, 840, 95); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'goodbye, | sweet day…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Pillow hair. | Ruined *forever.*', mood: lt => lt > 0.9 ? 'wide' : 'sleepy', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.6, 0.9))
      if (k <= 0.01) return
      x.save(); x.translate(F.x, F.cy - 20); x.fillStyle = '#ff9a4a'; x.strokeStyle = INK; x.lineWidth = 6
      for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + 0.2, r = 170 * k + (i % 2) * 40 * k; x.save(); x.rotate(a); x.beginPath(); x.moveTo(-18, 100 * k); x.lineTo(0, r + Math.sin(t * 9 + i) * 6); x.lineTo(18, 100 * k); x.closePath(); x.fill(); x.stroke(); x.restore() }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'NOBODY LOOK', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 950, 'cancel | everything', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Three minutes over. | *Rewrote the schedule.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const R = [['2:00', 'nap', MINT], ['2:20', 'wake up', SKYB], ['2:23', 'RE-PLAN', GOLD], ['7:00', 'date ✓', PINK]]
      card(x, 790, 860, 340, 400, k, { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'SCHEDULE v2', 0, -160, { size: 28, font: MONO, weight: 700 })
        R.forEach(([h, s, c], i) => {
          const on = pop01(t, P.t0 + 0.5 + i * 0.25, 0.25, 2.2), y = -90 + i * 74
          if (on <= 0.01) return
          txt(x, h, -110, y, { size: 26, font: MONO, weight: 700 })
          x.save(); x.translate(50, y); x.scale(on, on); x.fillStyle = c; x.fillRect(-90, -24, 180, 48); txt(x, s, 0, 2, { size: 26 }); x.restore()
        })
      })
    } },
  { sign: 'libra', cap: 'Match asked “awake?” | *Still deciding.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'awake?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: MINT, tail: 'bl' })
      const w = Math.floor(lt * 2.4) % 2 ? 'ASLEEP' : 'AWAKE'
      label(x, 790, 870, `${w}?`, pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 44, bg: w === 'AWAKE' ? GOLD : LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'REPLY: PENDING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Woke up. | Trusts *no clock.*', mood: 'squint', look: lt => [Math.floor(lt * 2) % 2 ? 1 : 0, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const C = [[700, 700, 3, 10], [880, 760, 9, 40], [760, 980, 6, 25]]
      C.forEach(([cx, cy, h, m], i) => clock(x, cx, cy, 70, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), h, m))
      label(x, 790, 1150, 'ALL SUSPECTS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sleep-booked | a *flight.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TICKET, { K: INK, W: CREAM, B: '#b98aff' }, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.06 })
      label(x, 790, 680, 'BOARDING: NOW', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1070, 'eh, why not', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Lost one hour. | *Billed themself.*', mood: lt => lt > 1.5 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, 320, 380, k, { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'INVOICE', 0, -150, { size: 36 })
        txt(x, 'to: me', 0, -100, { size: 26, font: MONO, weight: 700, color: '#6b62a8' })
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 3; i++) x.fillRect(-120, -40 + i * 40, 240, 10)
        txt(x, '1 hr nap', -40, 90, { size: 28, font: MONO, weight: 700 })
        txt(x, 'OVERDUE', 0, 150, { size: 32, color: RED })
      })
    } },
  { sign: 'aquarius', cap: 'Woke up. Thinks it’s | the *year 3000.*', mood: lt => lt > 0.8 ? 'wide' : 'sleepy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'what year | is it?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 900, 'YEAR: 3000?', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'ACTUAL: 2:40 P.M.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Dreamt of a puppy. | Woke up. *No puppy.*', mood: lt => lt > 1.0 ? 'wide' : 'sleepy', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fade = 1 - prog(lt, 0.9, 1.2)
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (fade > 0.01 && k > 0.01) {
        x.save(); x.globalAlpha = fade
        x.fillStyle = BONE; for (const [a, b, r] of [[790, 860, 150], [700, 900, 90], [880, 900, 90]]) { x.beginPath(); x.arc(a, b, r * k, 0, Math.PI * 2); x.fill() }
        drawBits(x, PUPPY, PUPPY_C, 790, 870, 16 * k)
        x.restore()
      }
      label(x, 790, 1100, 'PUPPY: GONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0219', key: 'D', accent: LAV, ending: 'callback',
  title: 'Bad nap? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *woke up okay.*', moods: ['wide', 'sleepy', 'wide', 'neutral', 'wide', 'squint', 'sleepy', 'squint', 'sparkle', 'neutral', 'wide', 'wide'] },
  last: {
    text: 'Taurus? | *Napping again.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, PILLOW, { W: CREAM }, 430, 1140, 26 * pop01(t, t0 + 0.3, 0.3, 2))
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 430, 1050, 260 * k, { mood: 'sleepy', seed: 41 })
      const D = ['TUE', 'WED', 'THU', 'FRI', 'SAT']
      const i = Math.min(4, Math.floor(Math.max(0, lt - 1.0) / 0.35))
      deskCal(x, 760, 1000, pop01(t, t0 + 0.7, 0.35, 2), D[i], { top: 'TODAY:', rot: 0.05 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
