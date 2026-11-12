// r2a0665: star_advice, ADVICE SOLO (capricorn), "Capricorn, you can't | *fix everyone.*" (signs3kit social cut, music: lofi · G).
// Nine cards: a relatable Capricorn truth + a warm reframe, one light visual gag each. Ending: group.
//   a friend's 2am problem (the toolbox can rest) · some things aren't yours to carry (other people's tags, returned)
//   · their life, their plan (you made them a slide deck) · listening counts, no solution needed · can't fix it? hug it
//   (Pisces, crying) · some people like their chaos (Aries, thriving) · empty cup? refill yours first · their growth takes
//   their time (a cocoon: do not disturb) · your match isn't a project (the TO FIX note comes off)
//   group (the ending) "Not their mechanic. | *Their person.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SG = 'capricorn', ST = { x: -170 }
const ACC = '#7fe0c0', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#2fc79a', SLATE = '#9aa5c4', ORANGE = '#ff9a4a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const friend = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 31, look: [-1, 0], ...o }) }
const TOOLBOX = ['...KKKKKK...', '...K....K...', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRYYRRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']
const CUP = ['C......C', 'C......C', 'CWWWWWWC', 'CWWWWWWC', '.CWWWWC.', '..CCCC..']
const COCOON = ['...K...', '...K...', '..CCC..', '.CcCCC.', '.CCCcC.', '.CcCCC.', '.CCCcC.', '..CCC..']

const CAMEOS = [
  { sign: SG, cap: 'Their 2am problem? | *Your toolbox can rest.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TOOLBOX, { K: INK, R: RED, Y: GOLD }, 800, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 800, 680, '2:07 AM', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, 0.05, 36)
      L(x, 800, 1100, 'TOOLS: DOWN', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: SG, cap: 'Some things | *aren’t yours to carry.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const tags = ['HIS RENT', 'HER EX', 'THE GROUP TRIP', 'SOMEONE’S CAT']
      tags.forEach((tg, i) => {
        const gone = ease.inCubic(prog(lt, 1.0 + i * 0.12, 1.3 + i * 0.12))
        L(x, 790 + gone * 120, 1010 - i * 90 - gone * 60, tg, pop01(t, P.t0 + 0.15 + i * 0.15, 0.3, 2) * (1 - gone), [GOLD, PINK, SKYB, BONE][i], (i % 2 ? 0.05 : -0.05), 28)
      })
      L(x, 800, 900, 'RETURNED ✓', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, 0.04, 40)
    } },
  { sign: SG, cap: 'Their life. | *Their plan.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      box(x, 800, 780, 300, 200, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03, () => {
        x.fillStyle = CREAM; x.fillRect(-136, -86, 272, 172)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('FIXING YOU:', 0, -50); x.fillText('PHASE 1 of 9', 0, -14)
        x.fillStyle = ACC; x.fillRect(-100, 20, 60, 50); x.fillStyle = GOLD; x.fillRect(-20, 4, 60, 66); x.fillStyle = PINK; x.fillRect(60, -10, 40, 80)
      })
      friend(x, t, 'gemini', 820, 1010, 150, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'wide' })
      bubble(x, 600, 1100, 'a slide deck??', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, col: GOLD, tail: 'br' })
    } },
  { sign: SG, cap: 'Listening counts. | *No solution needed.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 810, 940, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.4 ? 'happy' : 'neutral' })
      bubble(x, 810, 690, 'ugh, today…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bc' })
      L(x, 810, 1110, 'JUST HERE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: SG, cap: 'Can’t fix it? | *Hug it.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -120 },
    front(x, t, lt, P) {
      friend(x, t, 'pisces', 740, 930, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.2 ? 'happy' : 'wide', tears: lt > 1.2 ? 2 : 3 })
      hearts(x, t, 620, 820, P.t0 + 1.0, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 3 })
      bubble(x, 760, 680, 'no fix. just a hug.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: SG, cap: 'Some people | *like their chaos.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.strokeStyle = PINK; x.lineWidth = 6; x.globalAlpha = 0.9; x.beginPath()
        for (let i = 0; i < 40; i++) { const a = i * 0.9 + t * 3, r = (60 + (i * 37) % 90) * k; const px = 800 + Math.cos(a) * r, py = 920 + Math.sin(a * 1.3) * r * 0.8; i ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke(); x.restore()
      }
      friend(x, t, 'aries', 800, 920, 190, k, { mood: 'sparkle', hops: [P.t0 + 0.5, P.t0 + 1.0, P.t0 + 1.5] })
      L(x, 800, 680, 'THEY’RE THRIVING', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.05, 30)
    } },
  { sign: SG, cap: 'Running on empty? | *Refill yours first.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fill = clamp((lt - 0.7) / 1.2)
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, CUP.map((r, j) => j < 2 + Math.round((1 - fill) * 2) ? r.replace(/W/g, '.') : r), { C: CREAM, W: ACC }, 800, 900, 26 * k)
      L(x, 800, 680, fill < 0.2 ? 'CUP: EMPTY' : 'REFILLING…', pop01(t, P.t0 + 0.4, 0.3, 2.2), fill < 0.2 ? RED : MINT, 0.05, 32)
      L(x, 800, 1100, 'YOU FIRST. ALLOWED.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: SG, cap: 'Their growth | *takes their time.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, COCOON, { K: INK, C: '#b9d88a', c: '#8ab05a' }, 800, 870 + Math.sin(t * 1.2) * 6, 34 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: Math.sin(t * 1.2) * 0.05 })
      L(x, 800, 1100, 'DO NOT DISTURB: GROWING', pop01(t, P.t0 + 0.9, 0.3, 2.4), LAV, -0.04, 24)
    } },
  { sign: SG, cap: 'Your match isn’t | *a project.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 790, 860, 290, 360, pop01(t, P.t0 + 0.15, 0.35, 2), 0.04, () => {
        x.fillStyle = '#140c30'; x.fillRect(-130, -166, 260, 250)
        x.fillStyle = ORANGE; x.font = `700 28px ${MONO}`; x.fillText('♌︎ LEO', 0, 130)
      })
      friend(x, t, 'leo', 790, 830, 170, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sparkle', look: [0, 0] })
      const peel = ease.inCubic(prog(lt, 1.0, 1.4))
      if (peel < 1) L(x, lerp(800, 1000, peel), lerp(760, 600, peel), 'TO FIX', pop01(t, P.t0 + 0.4, 0.3, 2) * (1 - peel), GOLD, -0.1 - peel, 32)
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.5, spread: 180, cell: 7, seed: 5 })
      L(x, 790, 1110, 'JUST ENJOY THEM', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0665', key: 'G', accent: ACC, solo: SG, ending: 'group',
  title: 'Capricorn, you can’t | *fix everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Not their mechanic. | *Their person.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
