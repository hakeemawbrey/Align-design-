// v3t037: THE SIGNS AS… v3, "Zodiacs at 7 a.m. | be like." (~54 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    the hook, the twelve line up, then dive into the pip row.
//   3.6–49.2   the alarm goes off, one sign per card, each pushed to the extreme:
//              ♈ up before the alarm, already ran 5k · ♉ snoozed it fourteen times · ♊ nine alarms, nine ringtones
//              · ♋ alarm label: "you got this ♥" · ♌ woke up already glowing · ♍ made the bed while still in it
//              · ♎ alarm sound: a gentle harp · ♏ woke up, told nobody · ♐ wrong time zone
//              · ♑ no alarm needed, body is the alarm · ♒ the alarm makes them solve a puzzle · ♓ dreamt of their match, woke up sobbing
//  49.2        group (the ending): "Five more | *minutes.*" — the alarm rings over the group, SNOOZE
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CREAM = '#fff4e2'

const ALARM = [
  '.BB.......BB.',
  'BBBB.....BBBB',
  'BB.RRRRRRR.BB',
  '..RRWWWWWRR..',
  '.RRWWWKWWWRR.',
  '.RWWWWKWWWWR.',
  '.RWWWWKKKWWR.',
  '.RWWWWWWWWWR.',
  '.RRWWWWWWWRR.',
  '..RRWWWWWRR..',
  '...RRRRRRR...',
  '..K.......K..',
]
const ALARM_C = { B: GOLD, R: RED, W: CREAM, K: INK }
const BED = [
  'B..............',
  'B..............',
  'BPPP...........',
  'BPPPQQQQQQQQQQQ',
  'BQQQQQQQQQQQQQQ',
  'BBBBBBBBBBBBBBB',
  'B.............B',
]
const BED_C = { B: BROWN, P: CREAM, Q: MINT }
const HARP = [
  'GGGGGGG...',
  'G.S.S.SG..',
  'G.S.S.S.G.',
  'G.S.S.S.G.',
  'G.S.S.S..G',
  'G.S.S.S..G',
  'GGGGGGGGGG',
]
const CUBE = [
  'RRRGGGBBB',
  'RRRGGGBBB',
  'YYYRRRGGG',
  'YYYRRRGGG',
  'BBBYYYRRR',
  'BBBYYYRRR',
]
const CUBE_C = { R: RED, G: '#5fd068', B: '#6fc3ff', Y: GOLD }
const GLOBE = [
  '..BBBBB..',
  '.BGGBBBB.',
  'BGGGBBGGB',
  'BBGBBGGGB',
  'BBBBBBGBB',
  '.BBGBBBB.',
  '..BBBBB..',
]

// a ringing alarm: shakes, with "ring" lines
function ringing(x, t, cx, cy, cell, k) {
  if (k <= 0.01) return
  const sh = Math.sin(t * 40) * 0.1
  drawBits(x, ALARM, ALARM_C, cx, cy, cell * k, { rot: sh })
  x.save(); x.globalAlpha = clamp(k) * (0.5 + 0.5 * Math.sin(t * 20)); x.fillStyle = GOLD
  for (const d of [-1, 1]) for (let i = 0; i < 3; i++) x.fillRect(cx + d * (cell * 8 + i * 6), cy - cell * 4 + i * cell * 3, d * cell * 2.2, cell * 0.8)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Up before the alarm. | *Already ran 5k.*', mood: 'sparkle', star: { x: -170 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      drawBits(x, ALARM, ALARM_C, 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 660, 'NOW: 5:12', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 40, bg: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1110, 'ALARM: 7:00', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Snoozed it. | *Fourteen times.*', mood: 'sleepy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ringing(x, t, 800, 900, 18, pop01(t, P.t0 + 0.2, 0.3, 2) * (Math.floor(lt / 0.35) % 2 ? 1 : 0.999))
      label(x, 800, 660, 'SNOOZE ×' + Math.min(14, 1 + Math.floor(lt * 6)), pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 42, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Nine alarms. | *Nine ringtones.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wide' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 9; i++) drawBits(x, ALARM, ALARM_C, 680 + (i % 3) * 120, 730 + Math.floor(i / 3) * 150, 7 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: Math.sin(t * 30 + i) * 0.12 })
      notes(x, t, 800, 760, { n: 4, cell: 6, col: GOLD, alpha: clamp(lt - 0.8) })
    } },
  { sign: 'cancer', cap: 'Alarm label: | *“you got this.”*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -200, 300, 400); x.fillStyle = '#1e1640'; x.fillRect(-140, -190, 280, 380)
        x.fillStyle = CREAM; x.font = `800 72px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('7:00', 0, -90)
        x.fillStyle = PINK; x.font = `800 38px ${INTER}`; x.fillText('you got this ♥', 0, 0)
        x.fillStyle = SKYB; x.font = `700 30px ${MONO}`; x.fillText('(drink water)', 0, 80)
        x.restore()
      }
      hearts(x, t, 560, 760, P.t0 + 1.3, { n: 4, life: 1.0, spread: 160, cell: 6, seed: 6 })
    } },
  { sign: 'leo', cap: 'Woke up | *already glowing.*', mood: 'sparkle', star: { x: -150 }, hops: [0.8],
    back(x, t, lt, P) {
      const k = clamp(pop01(t, P.t0 + 0.2, 0.4, 1.6))
      x.save(); x.globalAlpha = 0.5 * k; x.fillStyle = '#ffd23a'
      for (let i = 0; i < 12; i++) { x.save(); x.translate(390, 880); x.rotate(i / 12 * Math.PI * 2 + t * 0.4); x.fillRect(150, -10, 120, 20); x.restore() }
      x.restore()
    },
    front(x, t, lt, P) { label(x, 790, 660, 'NO FILTER', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05 }); sparkles(x, t, 390, 880, P.t0 + 1.2, 8, 200, 0.1) } },
  { sign: 'virgo', cap: 'Made the bed | *while still in it.*', mood: 'neutral', look: [1, 0], star: { x: -60, y: -60, s: 240 },
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 560, 1000, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'CORNERS: TUCKED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Alarm sound: | *a gentle harp.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, HARP, { G: GOLD, S: CREAM }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 790, 780, { n: 4, cell: 7, col: PINK, alpha: clamp(lt - 0.4) })
      label(x, 790, 1110, 'VOLUME: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Woke up. | *Told nobody.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 820, 'STATUS: ASLEEP', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1000, '(lies)', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Alarm rang. | *Wrong time zone.*', mood: lt => lt > 1.0 ? 'wink' : 'sleepy', star: { x: 150 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, { B: '#6fc3ff', G: '#5fd068' }, 330, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.6 })
      label(x, 330, 660, 'IT’S 3 A.M. HERE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 330, 1110, 'OOPS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: CREAM, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Needs no alarm. | *They are the alarm.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, ALARM, ALARM_C, 790, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: lt > 1.0 ? 0.35 : 1 })
      label(x, 790, 660, '5:00 SHARP', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 42, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'ALARM: UNEMPLOYED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Alarm makes them | *solve a puzzle.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CUBE, CUBE_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 3) })
      label(x, 790, 1080, 'LEVEL: GENIUS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Dreamt of their match. | *Woke up sobbing.*', mood: lt => lt < 0.6 ? 'sleepy' : 'wide', tears: lt => lt < 0.6 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'we had | a dog', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      ringing(x, t, 800, 1020, 16, pop01(t, P.t0 + 0.6, 0.3, 2))
    } },
]

const F = makeFilm({
  id: 'v3t037', key: 'D', accent: '#ffd23a', ending: 'group',
  title: 'Zodiacs at 7 a.m. | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Five more | *minutes.*',
    mood: 'sleepy', moods: Array(12).fill('sleepy'),
    draw(x, t, lt) {
      ringing(x, t, 540, 790, 16, pop01(t, t - lt + 1.6, 0.4, 2))
      if (lt > 2.6) label(x, 540, 610, 'SNOOZE', pop01(t, t - lt + 2.6, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
