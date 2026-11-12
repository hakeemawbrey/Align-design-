// r2a0023: ADVICE SOLO, "Aquarius, it's okay | to want more." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm reframe, one gag each.
//   0.0–3.6    "Aquarius, it’s okay | *to want more.*"
//   3.6–37.8   outgrew old dreams (dreams v2.0) · greedy? no, brave · that weird idea, try it (idea #47)
//              · want closeness? ask (a hug, always) · space and people, both · dream bigger (a rocket, ceiling: gone)
//              · the big slice of cake · changed your mind, that's growth · ask for the raise (ask: sent)
//  37.8        GROUP ENDING: "More is allowed. | *Go get it.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const BLUE = '#6fc3ff', RED = '#e23d4e', BROWN = '#8a4a2e'

// ── props
const BULB = ['..YYYY..', '.YYYYYY.', 'YYYWYYYY', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
const UFO = ['.....SSS.....', '....SSSSS....', '..GGGGGGGGG..', 'GGGYGGYGGYGGG', '..GGGGGGGGG..']
const ROCKET = ['....R....', '...RRR...', '..WWWWW..', '..WSSSW..', '..WSSSW..', '..WWWWW..', '..WWWWW..', '.RWWWWWR.', 'RRWWWWWRR', 'R..OOO..R', '...OYO...', '....Y....']
const CAKE = ['....P....', '..PPPPP..', '.PPPPPPP.', 'CCCCCCCCC', 'WWWWWWWWW', 'CCCCCCCCC', 'CCCCCCCCC', 'WWWWWWWWW', 'CCCCCCCCC']
function strike(x, cx, cy, w, k) {
  if (k <= 0.01) return
  x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'
  x.beginPath(); x.moveTo(cx - w / 2, cy + 8); x.lineTo(cx - w / 2 + w * k, cy - 8); x.stroke(); x.restore()
}

const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Outgrew your old dreams? | *Upgrade them.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const v = lt < 1.1 ? 'DREAMS v1.0' : 'DREAMS v2.0'
      label(x, 790, 820, v, pop01(t, P.t0 + 0.2, 0.3, 2) * (lt > 1.0 && lt < 1.1 ? 0.6 : 1), { size: 46, bg: lt < 1.1 ? BONE : BLUE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'UPDATE ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.4, 7, 200, 0.3)
    } },
  { sign: S, cap: 'Wanting more | isn’t greedy. *It’s brave.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'GREEDY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 52, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      strike(x, 790, 760, 300, ease.outCubic(prog(lt, 0.6, 0.9)))
      label(x, 790, 940, 'BRAVE', pop01(t, P.t0 + 1.2, 0.35, 2.6), { size: 64, bg: BLUE, rot: 0.04 })
    } },
  { sign: S, cap: 'That weird idea? | *Try it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -170 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const on = lt > 0.9
      drawBits(x, BULB, { Y: on ? GOLD : '#7a7390', W: '#ffffff', G: '#9aa5c4' }, 790, 820, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 800, P.t0 + 0.9 * 1.29, 8, 200, 0.2)
      label(x, 790, 1090, 'IDEA #47: GO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want more closeness? | *Ask for it.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 600, 640, 'hug?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 810, 960, 200 * k, { mood: 'heart', look: [-1, 0], seed: 12, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 820, 740, 'always!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bc' })
      hearts(x, t, 680, 960, P.t0 + 1.6, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Space *and* people? | You can have both.', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, UFO, { S: SKYB, G: '#9aa5c4', Y: GOLD }, 790, 700 + 10 * Math.sin(t * 3), 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 900, 'ALONE TIME ✓', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: BLUE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1030, 'FRIENDS ✓', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Dream bigger. | *The ceiling’s optional.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const up = ease.inCubic(prog(lt, 0.8, 2.2))
      drawBits(x, ROCKET, { R: RED, W: BONE, S: SKYB, O: '#ff9a3a', Y: GOLD }, 790, lerp(980, 560, up), 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1150, 'CEILING: GONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want the big slice? | *Take it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = ease.outBack(prog(lt, 0.9, 1.3))
      drawBits(x, CAKE, { P: PINK, C: '#ffd9a8', W: '#ffffff' }, 790, 920, (20 + 10 * g) * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'SIZE: LARGE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Changed your mind? | That’s *growth.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 740, 'PLAN A', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 48, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      strike(x, 790, 740, 240, ease.outCubic(prog(lt, 0.6, 0.9)))
      label(x, 790, 920, 'PLAN BETTER', pop01(t, P.t0 + 1.0, 0.35, 2.6), { size: 50, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask for the raise. | *You earned it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'about | my salary…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 960, 'ASK: SENT ✓', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 46, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 960, P.t0 + 1.4, 7, 180, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0023', key: 'C', accent: BLUE, solo: 'aquarius', ending: 'group',
  title: 'Aquarius, it’s okay | *to want more.*',
  cameos: CAMEOS,
  group: { cap: 'More is allowed. | *Go get it.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
