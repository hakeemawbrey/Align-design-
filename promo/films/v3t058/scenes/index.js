// v3t058: THE SIGNS AS… v3, "Zodiacs, no phone | be like." (~62 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "Zodiacs when they lose their phone | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one lost phone per sign (3.8 s each), each pushed to the extreme:
//              ♈ searched four seconds, bought a new one · ♉ lost it in the sofa, moved into the sofa
//              · ♊ borrowed a phone to tell everyone · ♋ "lost" posters with its photo · ♌ who will see the selfies?
//              · ♍ it was in their pocket, filed a report anyway · ♎ hosted a search party with canapés
//              · ♏ found it before you asked · ♐ phone gone, finally free · ♑ a backup phone and a backup backup
//              · ♒ built a new one from a toaster · ♓ found it, hugged it, cried
//  49.2        "Twelve phones. | *Total panic.*"
//  52.4        LESSON UNLOCKED: "Look up sometimes. | *Your people are here.*"  SCREEN TIME: LOW
//  58.3        "Taurus is still | *in the sofa.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', SAGE = '#9ae6b4'

const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KSWWWSSK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KKKgKKKK',
]
const PHONE_C = { K: INK, S: '#2a2350', W: MINT, g: '#6b62a8' }
const SOFA = [
  '.RRRRRRRRRRRR.',
  'RRrrrrrrrrrrRR',
  'RRrrrrrrrrrrRR',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRR',
  '.K..........K.',
]
const SOFA_C = { R: '#c24a6a', r: '#e27a96', K: '#5a2e1a' }
const TOAST = [
  '.KKKKKKKK.',
  'KSSSSSSSSK',
  'KSkSSSSkSK',
  'KSSSSSSSSK',
  'KSSSSSSSSK',
  'KSSSSSSGSK',
  'KKKKKKKKKK',
]
const TRAY = [
  '...C..C..C...',
  '..CCC.CC.CCC.',
  'SSSSSSSSSSSSS',
  '.S.........S.',
]
const SUN = [
  '..Y..Y..',
  'Y.YYYY.Y',
  '.YYYYYY.',
  'YYYYYYYY',
  'YYYYYYYY',
  '.YYYYYY.',
  'Y.YYYY.Y',
  '..Y..Y..',
]

// a "LOST" poster with a phone on it
function poster(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-96, -126, 192, 252)
  x.fillStyle = '#fff4e2'; x.fillRect(-90, -120, 180, 240)
  x.fillStyle = RED; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOST', 0, -90)
  drawBits(x, PHONE, PHONE_C, 0, 10, 12)
  x.fillStyle = INK; x.font = `700 18px ${MONO}`; x.fillText('answers to', 0, 82); x.fillText('“baby”', 0, 104)
  x.restore()
}
// a police-style report form
function report(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 340)
  x.fillStyle = '#fff4e2'; x.fillRect(-142, -162, 284, 324)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOST ITEM REPORT', 0, -130)
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillStyle = '#2a2350'
  ;['item: phone', 'seen: pocket', 'status: found', 'filed: anyway'].forEach((r, i) => { if (lt > 0.3 + i * 0.3) x.fillText(r, -120, -76 + i * 50) })
  x.fillStyle = '#b9b0a0'; x.fillRect(-120, 120, 240, 6)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Searched four seconds. | *Bought a new one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -180 }, hops: [0.4, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 660, `0:0${Math.min(4, Math.floor(lt * 4))}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, PHONE, PHONE_C, 790, 900, 24 * pop01(t, P.t0 + 1.1, 0.3, 2))
      label(x, 790, 1130, 'NEW!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.05 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 150, 0.4)
    } },
  { sign: 'taurus', cap: 'Lost it in the sofa. | *Moved in.*', mood: 'sleepy', star: { x: 0, y: 30, s: 250 },
    back(x, t, lt, P) { drawBits(x, SOFA, SOFA_C, 540, 1000, 40 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 620, 'ADDRESS: SOFA', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Borrowed a phone | to *tell everyone.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, { ...PHONE_C, S: '#5a2350' }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      label(x, 790, 650, 'NOT MINE', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, `CALLS: ${Math.min(30, Math.floor(lt * 14))}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made “lost” posters. | *With its photo.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', tears: lt => lt > 1.4 ? 1 : 0, star: { x: -190 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) poster(x, 680 + i * 120, 830 + (i % 2) * 90, pop01(t, P.t0 + 0.2 + i * 0.4, 0.3, 2), (i - 1) * 0.07)
    } },
  { sign: 'leo', cap: 'Panicked. | Who’ll *see the selfies?*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 4; i++) { if (k <= 0.01) break; x.save(); x.translate(700 + (i % 2) * 170, 760 + Math.floor(i / 2) * 200); x.rotate((i % 2 ? 0.06 : -0.05)); x.scale(k, k); x.fillStyle = INK; x.fillRect(-74, -84, 148, 168); x.fillStyle = '#fff'; x.fillRect(-68, -78, 136, 156); x.fillStyle = '#ffe2a8'; x.fillRect(-60, -70, 120, 110); signChar(x, t, 'leo', 0, -10, 90, { mood: i % 2 ? 'wink' : 'sparkle', seed: 70 + i, glyph: false, glow: 0.3 }); x.restore() }
      label(x, 790, 1150, 'UNSEEN: 4,000', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'It was in their pocket. | *Filed a report anyway.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: { x: -200, s: 270 },
    front(x, t, lt, P) { report(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Hosted a search party. | *With canapés.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, TRAY, { C: '#ffd6a0', S: '#c9c9d8' }, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 680, 'SEARCH PARTY ✦', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04 })
      bubble(x, 790, 1110, 'canapé?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Found it already. | *Before you asked.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'FOUND: 0:01', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: '#ff8a9a', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'looking for this?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Phone gone? | *Finally free.*', mood: 'sparkle', star: { x: -180 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: GOLD }, 800, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.5 })
      bubble(x, 790, 1110, 'see ya, world!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Has a backup phone. | *And a backup backup.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', star: { x: -190 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, PHONE, { ...PHONE_C, S: ['#2a2350', '#2a3a50', '#3a2a30'][i] }, 680 + i * 110, 880, 18 * pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2))
      ;['MAIN', 'BACKUP', 'BACKUP 2'].forEach((s, i) => label(x, 680 + i * 110, 1080 - (i % 2) * 40, s, pop01(t, P.t0 + 0.5 + i * 0.4, 0.3, 2.2), { size: 26, bg: [BONE, MINT, GOLD][i], rot: (i - 1) * 0.08, font: MONO, weight: 700 }))
    } },
  { sign: 'aquarius', cap: 'Built a new one. | *From a toaster.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, TOAST, { K: INK, S: '#c9c9d8', k: '#2a2350', G: MINT }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'hello?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1100, 'SIGNAL: 5 BARS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 6, 160, 0.2, [MINT, SKYB, BONE])
    } },
  { sign: 'pisces', cap: 'Found it. | *Hugged it. Sobbed.*', mood: lt => lt < 0.9 ? 'happy' : 'heart', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 680, 930, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      label(x, 790, 1120, 'REUNITED', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 38, bg: LAV, rot: -0.04 })
      hearts(x, t, 680, 860, P.t0 + 1.0, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t058', key: 'E', accent: SAGE, ending: 'lesson',
  title: 'Zodiacs, no phone | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve phones. | *Total panic.*' },
  lesson: { text: 'Look up sometimes. | *Your people are here.*', chip: 'SCREEN TIME: LOW' },
  last: {
    text: 'Taurus is still | *in the sofa.*',
    draw(x, t, lt) { drawBits(x, SOFA, SOFA_C, 540, 1680, 26 * pop01(t, t - lt + 0.7, 0.3, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
