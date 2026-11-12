// r2a0537: star_advice, ADVICE SOLO (sagittarius), "Sagittarius, | *ask for help.*" (topic: you're allowed to ask for
// help; shortened so the hook stays on two lines). signs3kit social cut, music: lofi · F. Ending: callback.
//   ten bags, one trip · lost on the trail · "haha i'm fine" · the solo trip gets a crew · flat-pack, step 1 of 80
//   · help is a co-pilot · even the chart says "bring a friend" · asking twice is still brave · people want to help
//   group "Still adventurous. | *Now with backup.*"   last "Ten bags? | *Two trips now.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, ORANGE, RED, WOOD, PAPER } from '../props.js'

const ACC = '#c97bff', S = 'sagittarius', ST = { x: -180 }
const MAP = ['PPPPPPPPPPPP', 'PGGGPPPPBBBP', 'PGGPPRRPPBBP', 'PPPPRPPRPPPP', 'PPPRPPPPRPPP', 'PBBPPPPPPRPP', 'PBBBPPGGPPXP', 'PPPPPPGGGPPP']
const MAP_C = { P: PAPER, G: '#5fd068', B: SKYB, R: RED, X: INK }
const SHELF = ['WWWWWWWWWW', 'W........W', 'WWWWWWWWWW', 'W........W', 'WWWWWWWWWW']
const SHELF_C = { W: '#c98f5a' }
const PLANE = ['......WW.....', '......WWW....', 'W.....WWWW...', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWS', 'W.....WWWW...', '......WWW....', '......WW.....']
const PLANE_C = { W: '#ffffff', S: SKYB }

// a wobbling tower of n suitcases centred at (cx, base)
function bags(x, t, cx, base, n, k, wob = 1) {
  for (let i = 0; i < n; i++) {
    const kk = clamp(k * n - i)
    if (kk <= 0) continue
    bits(x, 'suitcase', cx + Math.sin(t * 3 + i * 0.7) * i * 3 * wob, base - i * 62, 13 * kk, { rot: 0.04 * Math.sin(t * 3 + i) * wob })
  }
}

const CAMEOS = [
  { sign: S, cap: 'Ten bags in one trip? | *Ask for a hand.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bags(x, t, 800, 1130, 7, ease.outCubic(prog(lt, 0.1, 1.3)), 1 + lt)
      label(x, 800, 630, 'ONE TRIP. OBVIOUSLY.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lost on the trail? | *Asking is allowed.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MAP, MAP_C, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 800, 680, 'YOU ARE HERE: ???', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 30, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'which way | is north?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Joking through it? | *You can say it’s hard.*', mood: lt => lt > 1.3 ? 'neutral' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const real = lt > 1.2
      bubble(x, 800, real ? 900 : 760, real ? 'okay, it’s | hard, actually.' : 'haha i’m | totally fine!', pop01(t, P.t0 + (real ? 1.55 : 0.3), 0.25, 2.2), { size: 42, col: real ? LAV : GOLD, tail: 'bl' })
      if (real) hearts(x, t, 560, 820, P.t0 + 1.7, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Going solo is fun. | *So is a crew.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200, s: 260 }, hops: [1.3],
    front(x, t, lt, P) {
      ;['aries', 'leo'].forEach((id, i) => { const p = ease.outCubic(prog(lt, 0.4 + i * 0.25, 1.1 + i * 0.25)); if (p > 0) signChar(x, t, id, lerp(1100, 700 + i * 170, p), 960, 170, { mood: 'sparkle', look: [-1, 0], seed: 40 + i, hops: [t - lt + 1.3 + i * 0.1], glyph: false }) })
      label(x, 790, 660, 'TRIP FOR ONE → THREE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Flat-pack shelf? | *Call a friend.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHELF, SHELF_C, 800, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.0 ? 0.25 * Math.sin(t * 5) : 0 })
      label(x, 800, 700, 'STEP 1 OF 80', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: PAPER, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1120, 'SPARE SCREWS: 12', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Help isn’t a cage. | *It’s a co-pilot.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.2, 1.8],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.2, 1.6))
      drawBits(x, PLANE, PLANE_C, lerp(1000, 800, p), 760 - 30 * Math.sin(Math.PI * p), 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      label(x, 800, 960, 'CO-PILOT: FOUND', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even your chart says | *bring a friend.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'free spirit: yes | adventure: yes | ' + (lt > 1.2 ? 'alone: NOPE' : 'alone: ...'), { head: '♐︎ BIRTH CHART', headBg: ACC, size: 32, w: 360, rot: -0.04 })
      sparkles(x, t, 800, 930, P.t0 + 1.25 * 1.29, 7, 170, 0.5)
    } },
  { sign: S, cap: 'Asking twice | *is still brave.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'um... help | again?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 790, 920, 'of course!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: MINT, tail: 'br' })
      label(x, 800, 1100, 'STILL COOL ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'People want to help you. | *Let them.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3, 1.9],
    front(x, t, lt, P) {
      label(x, 800, 620, 'HELPERS: READY', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: PINK, rot: -0.05 })
      bits(x, 'heart', 800, 930, 22 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      hearts(x, t, 800, 1060, P.t0 + 1.2, { n: 7, life: 2.0, spread: 260, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0537', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Sagittarius, | *ask for help.*',
  cameos: CAMEOS,
  group: { cap: 'Still adventurous. | *Now with backup.*', mood: 'heart' },
  last: {
    text: 'Ten bags? | *Two trips now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 300, 1150, 250 * k, { mood: 'sparkle', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      const kk = pop01(t, t - lt + 0.7, 0.45, 1.8)
      if (kk > 0.01) { signChar(x, t, 'leo', 790, 1170, 210 * kk, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false }); signChar(x, t, 'aries', 545, 1190, 200 * kk, { mood: 'heart', seed: 14, glyph: false }) }
      bits(x, 'suitcase', 300, 960, 14 * kk); bits(x, 'suitcase', 545, 1020, 14 * kk); bits(x, 'suitcase', 790, 990, 14 * kk)
      label(x, 540, 1380, 'TRIP 1 OF 2', pop01(t, t - lt + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
