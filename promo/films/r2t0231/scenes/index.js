// r2t0231: star_talk, ROLLCALL, "The signs at a | tasting menu." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs at a twelve-course tasting menu, each the most extreme version of itself.
//   0.0–3.6    "The signs at a | *tasting menu.*"
//   3.6–49.2   ♈ twelve courses in four minutes · ♉ asked if the foam comes in large · ♊ asked the chef's sign, then their
//              life story · ♋ took leftovers home: one pea · ♌ got a dish named after themself · ♍ measured the portion
//              with a ruler · ♎ let their birth chart pick the fork · ♏ named every secret ingredient, blindfolded
//              · ♐ "had this abroad", every course · ♑ worked out the price per bite · ♒ ate the menu backwards
//              · ♓ cried at the carrot, it was so small
//  49.2        "Twelve courses. | *Still hungry.*"
//  52.6        callback: "Taurus got the foam. | *In large.*"  a giant bowl of foam, Taurus very happy.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, inSprite, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { plate, txt, card, chart, clock, pill, CREAM, RED, ORANGE, BROWN, GREY, DEEP, GREEN } from './props.js'

const ACC = '#ffd08a'
const ST = { x: -170 }
const M = { font: MONO, weight: 700 }

// ── props
const FOAM = ['..WWW.WW..', '.WWWWWWWW.', 'WWWWWWWWWW', '.WWWWWWWW.']
const PEA = ['.GG.', 'GGGG', 'GGGG', '.GG.']
const HAT = ['..WW.WW..', '.WWWWWWW.', 'WWWWWWWWW', '.WWWWWWW.', '..WWWWW..', '..GGGGG..', '..WWWWW..']
const FORK = ['W.W.W', 'W.W.W', 'WWWWW', '..W..', '..W..', '..W..', '..W..', '..W..', '..W..']
const RULER = ['YYYYYYYYYYYYYYYYYYYY', 'Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.', 'Y...Y...Y...Y...Y...']
const BOX = ['..KKKKKK..', '.KWWWWWWK.', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', '.KWWWWWWK.']
const CAKE = ['....R....', '...PPP...', '..PPPPP..', '.WWWWWWW.', 'BBBBBBBBB', 'WWWWWWWWW', 'BBBBBBBBB']
const CARROT = ['..G.G', '...GG', '..OO.', '.OO..', 'OO...']

/** a bowl (front view) with optional foam heaped on top, h 0…1 */
function bowl(x, t, cx, cy, w, k, h) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (h > 0) {
    x.fillStyle = INK; for (let i = 0; i < 7; i++) { const a = (i / 6) - 0.5; x.beginPath(); x.arc(a * w * 0.8, -h * w * 0.18 - Math.cos(a * 2.6) * h * w * 0.26, w * 0.2 + 6, 0, Math.PI * 2); x.fill() }
    x.fillStyle = '#fffaf0'; for (let i = 0; i < 7; i++) { const a = (i / 6) - 0.5; x.beginPath(); x.arc(a * w * 0.8, -h * w * 0.18 - Math.cos(a * 2.6) * h * w * 0.26 + Math.sin(t * 3 + i) * 3, w * 0.2, 0, Math.PI * 2); x.fill() }
  }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 - 8, -8); x.lineTo(w / 2 + 8, -8); x.lineTo(w * 0.32 + 6, w * 0.42 + 6); x.lineTo(-w * 0.32 - 6, w * 0.42 + 6); x.closePath(); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.moveTo(-w / 2, 0); x.lineTo(w / 2, 0); x.lineTo(w * 0.32, w * 0.42); x.lineTo(-w * 0.32, w * 0.42); x.closePath(); x.fill()
  x.fillStyle = ACC; x.fillRect(-w * 0.44, w * 0.08, w * 0.88, w * 0.06)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Twelve courses. | Done in *four minutes.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.13))
      for (let i = 0; i < Math.min(n, 7); i++) plate(x, 790, 1080 - i * 26, 110, pop01(t, P.t0 + 0.2 + i * 0.13, 0.2, 2))
      label(x, 790, 820, `COURSE ${n}/12`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, ...M })
      label(x, 790, 650, 'TIME: 4:00', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: RED, color: BONE, rot: -0.05, ...M })
    } },
  { sign: 'taurus', cap: 'Asked if the foam | comes in *large.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      plate(x, 790, 1040, 150, pop01(t, P.t0 + 0.2, 0.3, 2), () => drawBits(x, FOAM, { W: '#fffaf0' }, 0, -6, 4))
      label(x, 860, 950, 'FOAM: 1 TSP', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 26, bg: GREY, rot: 0.05, ...M })
      bubble(x, 780, 680, 'is there | a large?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Asked the chef’s sign. | Then *their life story.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'virgo', 820, 1020, 180 * k, { mood: lt > 1.6 ? 'sleepy' : 'happy', look: [-1, 0], seed: 31, glyph: false }); drawBits(x, HAT, { W: '#ffffff', G: GREY }, 820, 900, 12 * k) }
      bubble(x, 760, 650, 'what’s your sign?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 760, 790, 'HOUR 3 · CHAPTER 9', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: 'cancer', cap: 'Took leftovers home. | *One pea.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOX, { K: INK, W: CREAM }, 790, 990, 26 * k)
      drawBits(x, PEA, { G: GREEN }, 790, 960 - 10 * Math.abs(Math.sin(t * 4)), 9 * pop01(t, P.t0 + 0.6, 0.3, 2.4))
      label(x, 790, 820, 'TO GO ♥', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.05, ...M })
      bubble(x, 780, 660, 'for later', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Got a dish named | *after themself.*', mood: 'sparkle', star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 270, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'MENU', 0, -130, { size: 30, ...M })
        x.fillStyle = GREY; for (let i = 0; i < 2; i++) x.fillRect(-90, -80 + i * 40, 180, 12)
        txt(x, 'THE LEO', 0, 20, { size: 40, color: '#e2862a' })
        txt(x, '(gold leaf.', 0, 70, { size: 24, color: BROWN })
        txt(x, 'on more gold leaf)', 0, 102, { size: 24, color: BROWN })
      })
      sparkles(x, t, 790, 880, P.t0 + 1.1, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Measured the portion. | *With a ruler.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      plate(x, 790, 1020, 150, pop01(t, P.t0 + 0.2, 0.3, 2), () => drawBits(x, PEA, { G: '#e2862a' }, 0, -4, 5))
      drawBits(x, RULER, { Y: GOLD }, 790, 940, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.04 })
      label(x, 790, 780, '2 MM. NOTED.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, ...M })
    } },
  { sign: 'libra', cap: 'Let their birth chart | *pick the fork.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 720, 110, pop01(t, P.t0 + 0.2, 0.35, 2), t, 1.2)
      const pick = lt > 1.5 ? 3 : -1
      for (let i = 0; i < 7; i++) drawBits(x, FORK, { W: i === pick ? GOLD : '#d8d4e8' }, 640 + i * 50, 1010 - (i === pick ? 30 * clamp((lt - 1.5) / 0.3) : 0), 9 * pop01(t, P.t0 + 0.4 + i * 0.06, 0.25, 2))
      label(x, 790, 1150, 'FORK #4: ALIGNED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, ...M })
    } },
  { sign: 'scorpio', cap: 'Named every secret ingredient. | *Blindfolded.*', mood: 'neutral', star: ST,
    front(x, t, lt, P, F) {
      if (lt > 0.15) inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(4, 17.2, 28, 6); x.fillStyle = '#4a1f5e'; x.fillRect(4.6, 18, 26.8, 4.4) })
      plate(x, 800, 1060, 120, pop01(t, P.t0 + 0.3, 0.3, 2), () => drawBits(x, FOAM, { W: '#ffd86b' }, 0, -6, 4))
      bubble(x, 790, 680, 'saffron. | three threads.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      label(x, 790, 880, 'CHEF: SHOOK', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, ...M })
    } },
  { sign: 'sagittarius', cap: '“Had this abroad.” | *Every course.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.9],
    front(x, t, lt, P) {
      const PL = ['in Lisbon', 'in Lima', 'on a boat', 'in Oslo', 'on a mountain']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.42))
      bubble(x, 330, 660, `had this ${PL[n]}`, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'br' })
      plate(x, 320, 1030, 130, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 330, 850, `STAMP ${n + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: LAV, rot: -0.05, ...M })
    } },
  { sign: 'capricorn', cap: 'Worked out the price | *per bite.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 260, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a2350', rot: 0.04 }, () => {
        x.fillStyle = '#9fd6a8'; x.fillRect(-100, -140, 200, 80)
        txt(x, lt > 1.0 ? '$11/BITE' : '…', 0, -100, { size: 30, ...M })
        const KEYS = [GREY, GREY, ORANGE]
        for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) { x.fillStyle = KEYS[i]; x.fillRect(-95 + i * 68, -30 + j * 48, 54, 36) }
      })
      bubble(x, 800, 640, 'worth it. | barely.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Ate the menu | *backwards.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CAKE, { R: RED, P: PINK, W: CREAM, B: '#c98f6a' }, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 820, 'COURSE 12 → 1', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: MINT, rot: 0.04, ...M })
      bubble(x, 780, 660, 'rules are a | suggestion', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at the carrot. | It was *so small.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plate(x, 790, 1030, 160, pop01(t, P.t0 + 0.2, 0.3, 2), () => drawBits(x, CARROT, { G: GREEN, O: ORANGE }, 0, -6, 6))
      bubble(x, 780, 680, 'he’s so | little…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      hearts(x, t, 790, 980, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0231', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs at a | *tasting menu.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve courses. | *Still hungry.*' },
  last: {
    text: 'Taurus got the foam. | *In large.*',
    draw(x, t, lt) {
      const t0 = t - lt
      bowl(x, t, 650, 1180, 380, pop01(t, t0 + 0.3, 0.45, 1.8), ease.outBack(prog(lt, 0.7, 1.4)))
      const k = pop01(t, t0 + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 300, 1150, 250 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 44, hops: [t0 + 1.4] })
      label(x, 650, 1420, 'SIZE: LARGE', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 40, bg: '#5fd068', rot: -0.04, ...M })
      hearts(x, t, 300, 1000, t0 + 1.5, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
