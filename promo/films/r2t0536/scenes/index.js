// r2t0536: star_talk, BELIKE, "Zodiacs dancing | *be like.*" (signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order on one dance floor, each the most extreme version of itself.
//   ♈ challenged the DJ to a battle · ♉ danced sitting down, snack in hand · ♊ three dances at once
//   · ♋ only dances in the kitchen · ♌ cleared the floor for a twenty-minute solo · ♍ counts every step out loud
//   · ♎ danced beautifully, facing the mirror · ♏ didn't dance, scored everyone · ♐ conga line left the building
//   · ♑ scheduled a two-minute dance break · ♒ invented a dance nobody gets · ♓ cried at the slow song
//  group "Zero rhythm. | *Full heart.*"  lesson "Dance badly. | Dance *anyway.*"  last "Even Taurus *stood up.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, frame, calendar, ORANGE, RED, WOOD, PAPER } from '../props.js'

const ACC = '#ff9a4a'
const DISCO = ['...WW...', '..SWSS..', '.SSWSSS.', 'SWSSWSSW', 'SSWSSWSS', '.SSWSSS.', '..SSWS..', '...SS...']
const DISCO_C = { S: '#c9d4ff', W: '#ffffff' }
const CHAIR = ['RRRRRR', 'RRRRRR', 'R.....', 'RRRRRR', 'RRRRRR', 'W....W', 'W....W', 'W....W']
const CHAIR_C = { R: '#ff6b5a', W: WOOD }
const PAN = ['....KKKKK...', '...KSSSSSK..', '..KSSYYSSSK.', '..KSSYYSSSK.', '...KSSSSSK..', '....KKKKKWWWWW']
const PAN_C = { K: '#2a2350', S: '#9aa5c4', Y: GOLD, W: WOOD }
const FOOT = ['.KK.', 'KKKK', 'KKKK', 'KKKK', '.KK.']
const FOOT_C = { K: PAPER }

function spotlight(x, cx, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1b0'
  x.beginPath(); x.moveTo(cx - 40, 470); x.lineTo(cx + 40, 470); x.lineTo(cx + 210, 1200); x.lineTo(cx - 210, 1200); x.closePath(); x.fill(); x.restore()
}
// a little score card held up (like a judge)
function score(x, cx, cy, n, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = WOOD; x.fillRect(-7, 40, 14, 110)
  x.fillStyle = INK; x.fillRect(-66, -76, 132, 132); x.fillStyle = PAPER; x.fillRect(-58, -68, 116, 116)
  x.fillStyle = INK; x.font = `800 74px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(n, 0, -8)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Challenged the DJ | to a *dance battle.*', mood: lt => lt > 1.0 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -160 }, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      bubble(x, 780, 650, 'YOU. ME. | NOW.', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 880, 'VS. THE DJ', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 44, bg: RED, color: '#fff', rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, DISCO, DISCO_C, 800, 1060, 16 * pop01(t, P.t0 + 1.3, 0.3, 2), { rot: t * 0.8 })
    } },
  { sign: 'taurus', cap: 'Danced sitting down. | *Snack in hand.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170, y: -20 },
    back(x, t, lt, P) { drawBits(x, CHAIR, CHAIR_C, 370, 1040, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'cookie', 790, 900, 20 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.2 * Math.sin(t * 4) })
      label(x, 790, 660, 'SEAT: TAKEN', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 40, bg: MINT, rot: 0.05 })
      notes(x, t, 790, 1080, { n: 3, cell: 6, seed: 2, alpha: pop01(t, P.t0 + 1.2, 0.3, 2) })
    } },
  { sign: 'gemini', cap: 'Learned three dances. | Did *all at once.*', mood: lt => ['wink', 'sparkle', 'wide'][Math.floor(lt * 3) % 3], look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -160 }, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      label(x, 790, 640, 'SALSA', k, { size: 40, bg: PINK, rot: -0.08 })
      label(x, 800, 820, 'ROBOT', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 40, bg: SKYB, rot: 0.06, font: MONO, weight: 700 })
      label(x, 790, 1000, 'TANGO', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 40, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Only dances | *in the kitchen.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -160 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      drawBits(x, PAN, PAN_C, 800, 920, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.15 * Math.sin(t * 5) })
      label(x, 790, 660, 'VENUE: THE STOVE', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: GOLD, rot: -0.05 })
      notes(x, t, 790, 1100, { n: 4, cell: 6, col: PINK, seed: 4, alpha: pop01(t, P.t0 + 1.0, 0.3, 2) })
    } },
  { sign: 'leo', cap: 'Cleared the floor. | For a *twenty-minute solo.*', mood: 'sparkle', look: [0, -1], star: { x: 0, y: 40, s: 320 }, hops: [0.8, 1.4, 2.0],
    back(x, t, lt, P) { spotlight(x, 540, pop01(t, P.t0 + 0.2, 0.4, 1.5)) },
    front(x, t, lt, P) {
      label(x, 540, 560, 'SOLO: 20 MIN', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 860, P.t0 + 1.3, 8, 220, 0.2, [GOLD, '#ffb34a', BONE])
    } },
  { sign: 'virgo', cap: 'Counted every step. | *Out loud.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [0, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 5 + Math.floor(clamp(lt / 1.6) * 3.99)
      bubble(x, 790, 650, `${n}, ${n + 1}, ${n + 2}...`, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: MINT, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      for (let i = 0; i < 4; i++) drawBits(x, FOOT, FOOT_C, 720 + (i % 2) * 120, 1120 - i * 80, 12 * k * clamp((lt - 0.6 - i * 0.2) * 4), { rot: (i % 2 ? 0.2 : -0.2) })
      label(x, 790, 860, 'STEP 47 OF 212', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 32, bg: PAPER, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Danced beautifully. | *Facing the mirror.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      frame(x, 790, 860, k, 230, 330, x2 => { signChar(x2, t, 'libra', 0, 40, 200, { mood: 'heart', look: [-1, 0], seed: 9, glyph: false }) }, { col: '#c9d4ff', rot: 0.03 })
      label(x, 790, 600, 'BEST AUDIENCE', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 34, bg: PINK, rot: -0.05 })
    } },
  { sign: 'scorpio', cap: 'Didn’t dance once. | *Scored everyone.*', mood: lt => lt > 1.5 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      score(x, 720, 820, '3', pop01(t, P.t0 + 0.35, 0.3, 2), -0.1)
      score(x, 880, 860, '2', pop01(t, P.t0 + 0.75, 0.3, 2), 0.08)
      label(x, 800, 1090, 'JUDGE: SELF-APPOINTED', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 26, bg: LAV, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Started a conga line. | It *left the building.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.5, 0.9, 1.3, 1.7],
    back(x, t, lt, P) {
      const ids = ['aries', 'leo', 'gemini']
      ids.forEach((id, i) => { const p = clamp((lt - 0.3 - i * 0.15) / 1.8); if (p > 0) signChar(x, t, id, lerp(560 - i * 30, 130 - i * 140, ease.inQuad(p)), 975 - i * 6, 160, { mood: 'sparkle', seed: 30 + i, hops: [t - 0.2 * i], glyph: false, alpha: 1 - clamp((p - 0.85) * 6) }) })
    },
    front(x, t, lt, P) {
      label(x, 300, 640, 'EXIT →', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 44, bg: MINT, rot: -0.06, font: MONO, weight: 700, color: INK })
      bubble(x, 400, 780, 'next stop: | the coast!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Scheduled a dance break. | *Two minutes.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 }, hops: [1.6, 1.9],
    front(x, t, lt, P) {
      calendar(x, 320, 820, pop01(t, P.t0 + 0.25, 0.3, 2), 'DANCE BREAK', '2:15', { topBg: '#6f8cff' })
      label(x, 320, 1060, 'ENDS: 2:17 SHARP', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a new dance. | *Nobody gets it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, -1], star: { x: -170 }, squash: lt => 0.14 * Math.sin(lt * 9),
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'it’s called | “the comet”', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      label(x, 790, 900, 'PATENT PENDING', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, '???', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 50, bg: PAPER, rot: -0.06 })
    } },
  { sign: 'pisces', cap: 'Slow song came on. | *Sobbed on the floor.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 790, 960, { n: 5, cell: 7, col: SKYB, seed: 1, alpha: pop01(t, P.t0 + 0.3, 0.3, 2) })
      label(x, 790, 650, '♪ SLOW SONG ♪', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: LAV, rot: -0.05 })
      bubble(x, 790, 1080, 'it’s so | beautiful', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0536', key: 'C', accent: ACC, ending: 'lesson',
  title: 'Zodiacs dancing | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Zero rhythm. | *Full heart.*', moods: ['sparkle', 'sleepy', 'wink', 'heart', 'sparkle', 'squint', 'heart', 'wink', 'sparkle', 'happy', 'wink', 'wide'] },
  lesson: { text: 'Dance badly. | Dance *anyway.*', chip: 'MOVES: UNLOCKED' },
  last: { text: 'Even Taurus | *stood up.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
