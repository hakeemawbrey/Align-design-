// v3a130: ADVICE ROLL CALL, "What each sign | misses most." (~54 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs, one warm line each: the thing they miss, and a kind nudge to make more of it. Ending: group.
//   ♈ being new at something · ♉ Nan's soup · ♊ 3 a.m. talks with an old friend · ♋ being tucked in · ♌ kid summers
//   ♍ a plan that worked · ♎ everyone at one table · ♏ being fully known (a spare key) · ♐ that one trip
//   ♒ their weird people (a match who gets it) · ♑ lazy Sundays · ♓ a song from that summer (crying, obviously)
//   49.2  "Missing it means | it was *good.*"  the twelve in a group photo, hearts.
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, PAPER } from '../props.js'

const L = { x: -160 }
const CAMEOS = [
  { sign: 'aries', cap: 'Being new at something. | *Go start again.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: L, hops: [1.3],
    front(x, t, lt, P) {
      label(x, 790, 700, 'LEVEL 1', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 64, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'again! again!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 46, tail: 'bl' })
      sparkles(x, t, 790, 700, P.t0 + 0.5, 8, 170, 0.2)
    } },
  { sign: 'taurus', cap: 'Nan’s soup. | *Ask for the recipe.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'bowl', 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      note(x, 790, 680, pop01(t, P.t0 + 0.9, 0.3, 2), 'pinch of love | stir till cozy', { head: 'NAN’S SOUP', headBg: ORANGE, size: 40, w: 380 })
    } },
  { sign: 'gemini', cap: 'Old 3 a.m. talks. | *Call them back.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '3:00', head: 'BESTIE · 2014', msg: 'remember | when we—', bg: LAV })
      bubble(x, 790, 1110, 'YES. calling.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Being tucked in. | *Tuck yourself in.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -160, y: 30 },
    front(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 1.0))
      if (k > 0.01) {                                       // a quilt pulled up over the star
        x.save(); x.translate(0, (1 - k) * 260)
        const COLS = [PINK, PAPER, LAV, MINT]
        x.fillStyle = INK; x.fillRect(140, 1010, 520, 210)
        for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) { x.fillStyle = COLS[(i + j) % 4]; x.fillRect(146 + i * 85, 1016 + j * 66, 81, 62) }
        x.restore()
      }
      bits(x, 'pillow', 800, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 930, 'TUCKED IN ✦', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 42, bg: PINK, rot: 0.05 })
    } },
  { sign: 'leo', cap: 'Summers as a kid. | *Plan a sunny day.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: L, hops: [1.4],
    back(x, t, lt, P) { bits(x, 'sun', 800, 700, 30 * pop01(t, P.t0 + 0.2, 0.4, 2), { rot: t * 0.3 }) },
    front(x, t, lt, P) {
      label(x, 800, 960, 'SATURDAY: SUNNY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1050, 'ICE CREAM: YES', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'A plan that worked. | *Messy works too.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.9 ? 'step 1 ✓ | step 2 ✓ | step 3: ???' : 'step 1 ✓ | step 2 ✓', { head: 'THE PLAN', headBg: MINT, size: 40, w: 340, font: MONO, weight: 700 })
      label(x, 790, 1060, 'STILL WORKED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'libra', cap: 'Everyone at one table. | *Host the dinner.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'dinner at mine? | ALL of you?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      note(x, 790, 900, pop01(t, P.t0 + 0.9, 0.3, 2), 'yes! · yes! · yes! | yes! · omw · YES', { head: 'GROUP CHAT', headBg: LAV, size: 36, w: 400 })
      label(x, 790, 1090, 'SEATS: EVERYONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Being fully known. | *Let one in.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'key', 790, 760, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.2 + 0.08 * Math.sin(t * 3) })
      label(x, 790, 960, 'SPARE KEY: 1', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: '#b07dff', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'it’s yours.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'That one trip. | *Book the next one.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      bits(x, 'suitcase', 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 660, 'BAG: PACKED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1120, 'WHERE TO?', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Lazy Sundays. | *Pencil one in.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'SUNDAY', lt > 1.0 ? 'FREE' : '9–5')
      bits(x, 'mug', 900, 1040, 11 * pop01(t, P.t0 + 1.2, 0.3, 2))
      label(x, 720, 1060, 'DO: NOTHING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Their weird people. | *They’re out there.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, -1], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 600, 'do clouds have | feelings?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      phone(x, 790, 940, pop01(t, P.t0 + 1.0, 0.3, 2), { top: '✦', head: '✦ NEW MATCH', msg: 'obviously. | the shy ones.', bg: SKYB, size: 32 })
    } },
  { sign: 'pisces', cap: 'A song from that summer. | *Play it loud.*', mood: lt => lt < 1.0 ? 'heart' : 'happy', tears: lt => lt < 1.0 ? 2 : 3, star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      label(x, 790, 760, '♪ TRACK 3 ♪', k, { size: 48, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      if (k > 0.5) notes(x, t, 790, 1100, { n: 5, cell: 12, col: SKYB, seed: 2 })
      label(x, 790, 920, 'VOLUME: ALL', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'v3a130', key: 'C', accent: PINK, ending: 'group',
  title: 'What each sign | *misses most.*',
  cameos: CAMEOS,
  group: {
    cap: 'Missing it means | it was *good.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.2, { n: 10, life: 3, spread: 800, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
