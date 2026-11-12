// v3t117: THE SIGNS AS… v3, "The signs | at the airport." (~57 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "The signs | *at the airport.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one airport trip per sign (3.8 s each), pushed to the extreme:
//              ♈ boarded before the pilot · ♉ checked bag: all snacks · ♊ talked to row 30 from row 2
//              · ♋ packed for a weekend, brought the house · ♌ walked the runway (the actual runway)
//              · ♍ four hours early, memorised the exits · ♎ window or aisle? missed the flight
//              · ♏ read the pilot's birth chart · ♐ picked a flight by the gate number · ♑ got the upgrade, worked all flight
//              · ♒ window seat, chatted with the clouds · ♓ cried at the safety video
//  49.2        "Everyone made it. | *Mostly.*"  The twelve fly up into a group photo.
//  52.6        callback: "Libra decided: | *the next flight.*"  (window or aisle, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', ACC = '#8fe3ff'

const SUITCASE = [
  '....KKKK....',
  '....K..K....',
  'SSSSSSSSSSSS',
  'SSSSSSSSSSSS',
  'SSSSSSSSSSSS',
  'SSSSSSSSSSSS',
  'SSSSSSSSSSSS',
  'SSSSSSSSSSSS',
  '.K........K.',
]
const SNACKS = ['B.C.B.C.', 'BBCCBBCC', 'YYRRYYRR', 'YYRRYYRR']
const HOUSE = ['....RR....', '...RRRR...', '..RRRRRR..', '.RRRRRRRR.', 'RRRRRRRRRR', '.WWWWWWWW.', '.WBBWWDDW.', '.WBBWWDDW.', '.WWWWWDDW.']
const HOUSE_C = { R: RED, W: '#fff4e2', B: SKYB, D: BROWN }
const PLANE = ['......WW.....', '......WWW....', 'W.....WWWW...', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWS', 'W.....WWWW...', '......WWW....', '......WW.....']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSGGSSGGSK.', '.KSSSSSSSSK.', '.KSGGGGSSSK.', '.KKKKKKKKKK.', 'KKKKKKKKKKKK']
const CLOUD = ['...WWWW.....', '..WWWWWW.WW.', '.WWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const SCREEN = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '.....KK.....']
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}
function board(x, cx, cy, k, rows, hi) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -150, 360, 300); x.fillStyle = '#1d1640'; x.fillRect(-170, -140, 340, 280)
  x.fillStyle = GOLD; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('DEPARTURES', -150, -110)
  rows.forEach((r, i) => { x.fillStyle = i === hi ? MINT : BONE; x.fillText(r, -150, -60 + i * 48) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Boarded the plane | *before the pilot.*', mood: 'sparkle', star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      drawBits(x, PLANE, { W: '#ffffff', S: SKYB }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'BOARDING: TOMORROW', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'let’s GO!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Their checked bag? | *All snacks.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SUITCASE, { K: INK, S: '#5fd068' }, 790, 940, 24 * k)
      if (lt > 0.8) for (let r = 0; r < 3; r++) drawBits(x, SNACKS, { B: SKYB, C: PINK, Y: GOLD, R: ORANGE }, 790, 880 + r * 54, 11 * pop01(t, P.t0 + 0.9 + r * 0.15, 0.3, 2))
      label(x, 790, 680, 'CONTENTS: CHIPS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Talked to row 30. | *From row 2.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'HEY ROW 30!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 790, 860, 'so ANYWAY, | my cousin…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1060, 'FLIGHT: 9 HRS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Packed for a weekend. | Brought *the house.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 790, 860, 24 * pop01(t, P.t0 + 0.6, 0.35, 2))
      drawBits(x, SUITCASE, { K: INK, S: SKYB }, 790, 1090, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'CARRY-ON', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Walked the runway. | The *actual runway.*', mood: 'sparkle', star: { x: -130, y: -40 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      x.save(); x.fillStyle = '#3a3358'; x.beginPath(); x.moveTo(470, 1000); x.lineTo(610, 1000); x.lineTo(800, 1230); x.lineTo(280, 1230); x.closePath(); x.fill()
      x.fillStyle = BONE; for (let i = 0; i < 4; i++) x.fillRect(530 + i * 4, 1020 + i * 55, 24, 30); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 700, 'RUNWAY 2', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'fierce.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, tail: 'bl' })
      sparkles(x, t, 410, 800, P.t0 + 0.8, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Four hours early. | *Memorised the exits.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-90, -200, 180, 400); x.fillStyle = '#e8ecf6'; x.fillRect(-80, -190, 160, 380)
        for (let r = 0; r < 8; r++) { x.fillStyle = SKYB; x.fillRect(-60, -170 + r * 46, 40, 30); x.fillRect(20, -170 + r * 46, 40, 30) }
        x.fillStyle = MINT; for (const r of [1, 5]) { x.fillRect(-80, -170 + r * 46, 14, 30); x.fillRect(66, -170 + r * 46, 14, 30) }
        x.strokeStyle = RED; x.lineWidth = 6; for (const r of [1, 5]) if (lt > 0.8 + r * 0.1) { x.beginPath(); x.ellipse(0, -155 + r * 46, 96, 30, 0, 0, Math.PI * 2); x.stroke() }
        x.restore()
      }
      label(x, 790, 1120, 'GATE OPENS IN 4 HRS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Window or aisle? | *Missed the flight.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => lt > 1.6 ? [1, -1] : [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, Math.floor(lt * 2.5) % 2 ? 'aisle?' : 'window?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      const p = prog(lt, 1.4, 2.3)
      if (p > 0 && p < 1) drawBits(x, PLANE, { W: '#ffffff', S: SKYB }, lerp(560, 1000, p), 900 - 260 * p, 12, { rot: -0.3 })
      label(x, 790, 1080, 'GATE CLOSED', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 38, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Read the pilot’s | *birth chart.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 790, 130, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      label(x, 790, 980, 'CAPTAIN: CAPRICORN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'we’ll be fine.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Picked a flight | *by the gate number.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.4],
    front(x, t, lt, P) {
      const hi = Math.min(3, Math.floor(lt * 2.2) % 4)
      board(x, 330, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['GATE 3', 'GATE 7', 'GATE 12', 'GATE 21'], lt > 1.6 ? 1 : hi)
      label(x, 330, 1060, 'GATE 7? GOING.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Got the upgrade. | *Worked the whole flight.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: '#2a2350', S: '#1d1640', G: MINT }, 790, 920, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 700, 'FIRST CLASS', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'EMAILS SENT: 212', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Window seat. | Chatted *with the clouds.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.fillStyle = INK; x.beginPath(); x.roundRect(640, 660, 300, 400, 120); x.fill(); x.fillStyle = '#7ec8ff'; x.beginPath(); x.roundRect(660, 680, 260, 360, 100); x.fill(); x.restore() }
      drawBits(x, CLOUD, { W: '#ffffff' }, 790 + 20 * Math.sin(t), 860, 14 * k)
      bubble(x, 760, 600, 'how’s it going?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 800, 1110, 'fluffy, you?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Cried at | *the safety video.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SCREEN, { K: INK, S: '#1d1640' }, 790, 860, 24 * k)
      if (k > 0.9) drawBits(x, ['.Y.', 'YYY', '.Y.', 'Y.Y'], { Y: GOLD }, 790, 830, 16)
      label(x, 790, 1080, 'SO BRAVE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.0, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t117', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs | *at the airport.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone made it. | *Mostly.*' },
  last: {
    text: 'Libra decided: | *the next flight.*',
    draw(x, t, lt) {
      board(x, 540, 940, 1.5 * pop01(t, t - lt + 0.4, 0.4, 2), ['GATE 4  6 A.M.', 'GATE 4  9 A.M.', 'GATE 4  NOON', 'GATE 4  3 P.M.'], Math.floor(lt * 1.5) % 4)
      const k = pop01(t, t - lt + 0.9, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'libra', 780, 1300, 200 * k, { mood: 'squint', look: [-1, -1], seed: 9 })
      bubble(x, 400, 1320, 'or the next one…', pop01(t, t - lt + 1.6, 0.25, 2.2), { size: 38, tail: 'br' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
