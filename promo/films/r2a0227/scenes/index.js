// r2a0227: ADVICE SOLO, "Aries, it's okay | to sit still." (star_advice, music: lofi · F). Ending: group.
// One sign (solo, 9 cards): a relatable Aries truth + a warm reframe, one gag each.
//   resting is refuelling (battery) · you don't have to win the weekend · a slow morning isn't wasted · you can wait
//   for the reply · you don't have to go first · your fire needs air · even rockets wait on the pad · five quiet minutes
//   is just calm · sitting still is brave too
//   group (the ending): "Still on fire. | *Just resting.*"
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, meter, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const S = 'aries', L = { x: -190 }
const FLAME = [['....Y....', '...YY....', '...YOY...', '..YOOY.Y.', '.YOORYY..', '.YORROY..', 'YORRRROY.', 'YORRRROY.', '.YORROY..', '..YYYY...'], { Y: GOLD, O: ORANGE, R: RED }]
const ROCKET = [['....R....', '...RRR...', '..WWWWW..', '..WSSSW..', '..WSSSW..', '..WWWWW..', '..WWWWW..', '.RWWWWWR.', 'RRWWWWWRR', 'R.WWWWW.R', '...O.O...'], { R: RED, W: BONE, S: SKYB, O: ORANGE }]

const CAMEOS = [
  { sign: S, cap: 'Rest feels like losing. | *It’s refuelling.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      meter(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 0.1 + 0.9 * ease.inOutCubic(prog(lt, 0.6, 2.0)), { w: 300, col: MINT, title: 'CHARGING…' })
      bubble(x, 790, 980, 'oh. that’s | nice, actually.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'You don’t have to | *win the weekend.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'trophy', 790, 760, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 990, 'SATURDAY: NO SCORE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A slow morning | *isn’t wasted.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: L,
    front(x, t, lt, P) {
      bits(x, 'mug', 790, 780, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 980, 'PLANS: NONE ✓', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You can wait | *for the reply.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const s = Math.floor(clamp(lt / 1.6) * 9)
      phone(x, 790, 790, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: `0:0${s}`, head: 'SENT', msg: 'hey! | you up?', bg: PINK })
      label(x, 790, 1060, 'BREATHE ♡', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You don’t always | *have to go first.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'you: #1 | you: #3', { head: 'THE LINE', headBg: ORANGE, size: 46, w: 300, strike: lt > 0.8 ? [0] : [] })
      bubble(x, 790, 1030, 'still great!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Your fire | *needs a little air.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = 0.6 + 0.6 * ease.outCubic(prog(lt, 0.7, 1.6))
      drawBits(x, FLAME[0], FLAME[1], 790, 830, 22 * g * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 + 0.05 * Math.sin(t * 9) })
      label(x, 790, 1070, 'GLOW: UP', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even rockets | *wait on the pad.*', mood: 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, ROCKET[0], ROCKET[1], 790, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.02 * Math.sin(t * 6) })
      label(x, 790, 1060, 'LAUNCH: WHEN READY', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Five quiet minutes? | *That’s just calm.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'clock', 790, 740, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1000, 'is this… | peace?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Sitting still | *is brave too.*', mood: 'sparkle', look: [1, 0], star: { x: -190, y: -30 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { bits(x, 'pillow', 350, 1050, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 770, 760, 'CALM: UNLOCKED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 770, 760, P.t0 + 1.2, 6, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0227', key: 'F', accent: ORANGE, solo: S, ending: 'group',
  title: 'Aries, it’s okay | *to sit still.*',
  cameos: CAMEOS,
  group: {
    cap: 'Still on fire. | *Just resting.*', mood: 'sleepy',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
