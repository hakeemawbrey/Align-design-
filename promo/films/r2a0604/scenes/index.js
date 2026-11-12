// r2a0604: star_advice, ADVICE SOLO (sagittarius), "Signs a Sag | *needs a break.*" (signs3kit social cut, music: lofi · E).
// Nine cards, a relatable Sag burnout sign + a warm reframe: no trip planned in a week (rest counts as one) · the jokes
// went quiet · said yes to everything · restless at 2 a.m. · cancelled the adventure, the couch counts · feeling stuck,
// let a day be slow (the drooping kite) · lost the optimism, it's coming back · scrolled for hours, go look at the sky
// · took a real break, adventure reloaded.
// Ending: callback. "That kite? | *Flying again.*" (the kite from card six comes back, high).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -180 }, SG = 'sagittarius'
const KITE = ['....P....', '...PPP...', '..PPYPP..', '.PPPYPPP.', 'YYYYYYYYY', '.PPPYPPP.', '..PPYPP..', '...PPP...', '....P....']
const KITE_C = { P: PINK, Y: GOLD }
const SUN = ['..Y.Y.Y..', '.........', 'Y.YYYYY.Y', '..YYYYY..', 'Y.YYYYY.Y', '..YYYYY..', 'Y.YYYYY.Y', '.........', '..Y.Y.Y..']
const SHOE = ['....RRRR..', '...RRRRRR.', 'RRRRRRRRRR', 'WWWWWWWWWW']

function kite(x, t, cx, cy, cell, lift, k = 1) {
  if (k <= 0.01) return
  const kx = cx, ky = lerp(cy + 120, cy - 60, lift) + Math.sin(t * 2) * 10 * lift
  x.save(); x.strokeStyle = BONE; x.lineWidth = 3; x.globalAlpha = 0.8
  x.beginPath(); x.moveTo(kx, ky + 4.5 * cell); x.quadraticCurveTo(kx - 60, ky + 200, kx - 160, cy + 220); x.stroke(); x.restore()
  drawBits(x, KITE, KITE_C, kx, ky, cell * k, { rot: lerp(1.2, 0.15, lift) + Math.sin(t * 3) * 0.08 * lift })
}

const CAMEOS = [
  { sign: SG, cap: 'No trip planned in a week? | *Rest* counts as one.', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 260, head: 'TRIPS BOOKED', headBg: ACC, headInk: INK, lines: [lt > 1.4 ? ['1: nap ✓', '#2f8a48'] : ['0', RED]], size: lt > 1.4 ? 48 : 110 })
      L(x, 800, 1070, 'DESTINATION: BED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: SG, cap: 'The jokes went quiet? | *Refill* the fun.', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 680, lt > 1.4 ? 'knock knock!!' : 'knock knock… nvm', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: lt > 1.4 ? GOLD : STEEL, tail: 'bl' })
      L(x, 800, 960, lt > 1.4 ? 'JOKES: RESTOCKED' : 'JOKES: LOW', 1, lt > 1.4 ? MINT : RED, -0.04, 36)
    } },
  { sign: SG, cap: 'Said yes to everything? | *No* is allowed.', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 330, head: 'THIS WEEK', headBg: GOLD, headInk: INK, align: 'left', lines: ['yes: hike', 'yes: party', 'yes: move a couch', 'yes: …'], size: 28, progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1080, 'NO, THANK YOU ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 36)
    } },
  { sign: SG, cap: 'Restless at 2 a.m.? | Walk *outside* tomorrow.', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 720, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SHOE, { R: '#ff8a3a', W: BONE }, 780, 920, 14 * pop01(t, P.t0 + 0.9, 0.3, 2))
      drawBits(x, SHOE, { R: '#ff8a3a', W: BONE }, 840, 950, 14 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 1090, 'FRESH AIR AT 9 ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: SG, cap: 'Cancelled the adventure? | The *couch* counts.', mood: 'sleepy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      bits(x, 'COUCH', 800, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BLANKET', 800, 870, 10 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.05 })
      L(x, 800, 700, 'COZY QUEST: DAY 1', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: SG, cap: 'Feeling stuck? | Let a day be *slow.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      kite(x, t, 820, 800, 20, ease.inOutCubic(prog(lt, 0.8, 1.8)), pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, 'NO WIND? NO RUSH.', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: SG, cap: 'Lost the optimism? | It’s *coming back.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const up = ease.outCubic(prog(lt, 0.4, 1.5))
      drawBits(x, SUN, { Y: '#ffd23a' }, 800, lerp(940, 770, up), 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CLOUD', lerp(780, 890, up), 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1090, 'HOPE: RISING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: SG, cap: 'Scrolled for hours? | Go look at *the sky.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: lt => lt > 1.4 ? [1, -1] : [1, 1], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 1.4) phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SCROLL: 3 HRS', headCol: STEEL, size: 24, lines: [['…', BONE, 1, false], ['…', BONE, 1, false]] })
      else { bits(x, 'MOON', 820, 760, 20); sparkles(x, t, 820, 820, P.t0 + 1.4, 9, 200, 0.2) }
      L(x, 800, 1110, lt > 1.4 ? 'BETTER VIEW ✦' : 'STILL SCROLLING…', 1, lt > 1.4 ? LAV : STEEL, -0.04, 32)
    } },
  { sign: SG, cap: 'Took a real break? | *Adventure* reloaded.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, 800, 1080, 'ENERGY: BACK ✦', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 36)
      sparkles(x, t, 800, 860, P.t0 + 1.0, 8, 210, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0604', key: 'E', accent: ACC, solo: SG, ending: 'callback',
  title: 'Signs a Sag | *needs a break.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirits | need *rest* too.', mood: 'heart' },
  last: {
    text: 'That kite? | *Flying again.*',
    draw(x, t, lt) {
      kite(x, t, 680, 1000, 22, ease.inOutCubic(prog(lt, 0.4, 1.6)), pop01(lt, 0.2, 0.35, 2))
      signChar(x, t, SG, 420, 1180, 200 * pop01(lt, 0.3, 0.4, 1.8), { mood: 'sparkle', look: [1, -1], seed: 9, hops: [t - lt + 1.3] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
