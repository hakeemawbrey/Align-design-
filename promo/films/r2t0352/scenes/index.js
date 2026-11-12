// r2t0352: star_talk, BE LIKE (twelve signs), "Zodiacs making their morning coffee | *be like.*" (~62 s vertical,
// signs3kit social cut, music: lofi · E). Each sign's most extreme morning coffee. Ending: lesson.
//   0.0–3.6    "Zodiacs making morning coffee | *be like.*"
//   3.6–49.2   twelve cards: Aries drinks it boiling · Taurus, one coffee and four pastries · Gemini, two mugs, both half
//              full · Cancer brews for the whole street · Leo's latte art is their own face · Virgo weighs the beans
//              · Libra, oat or almond? still deciding · Scorpio, black like their secrets · Sagittarius went for coffee,
//              ended up abroad · Capricorn's coffee at 4 a.m., inbox done · Aquarius built a new machine · Pisces, a foam
//              heart, sobbing
//  49.2        "Twelve mugs. | *Zero patience.*"
//  52.4        LESSON UNLOCKED: "Everyone wakes up | *their own way.*"  MOOD: BREWED
//  58.3        "Same time | *tomorrow?*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#e8a24a', PAPER = '#fff4e2'

// ── props
const MUG = [
  '.WWWWWWW...',
  'WCCCCCCCW..',
  'WWWWWWWWWWW',
  'WWWWWWWWW.W',
  'WWWWWWWWW.W',
  'WWWWWWWWWWW',
  'WWWWWWWWW..',
  '.WWWWWWW...',
]
const mugC = (w = PAPER, c = '#7a4a2e') => ({ W: w, C: c })
function steam(x, t, cx, cy, k = 1, n = 3) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.7 * k; x.fillStyle = '#e8e2ff'
  for (let i = 0; i < n; i++) for (let j = 0; j < 6; j++) {
    const ph = ((t * 0.8 + j / 6 + i * 0.3) % 1)
    x.fillRect(cx + (i - (n - 1) / 2) * 30 + Math.sin(ph * 8 + i) * 10 - 5, cy - ph * 120, 10, 10)
  }
  x.restore()
}
const CROISSANT = [
  '..PPPPPP..',
  '.PpPPPPpP.',
  'PPPpPPpPPP',
  'PP.PPPP.PP',
  'P...PP...P',
]
const CROISSANT_C = { P: '#e8a24a', p: '#c98a4e' }
const CARTON = [
  'TTTTT',
  'TTTTT',
  'WWWWW',
  'WBBBW',
  'WBBBW',
  'WWWWW',
  'WWWWW',
]
const SCALE = [
  '..SSSSSSSS..',
  '.SSSSSSSSSS.',
  '...KKKKKK...',
  'GGGGGGGGGGGG',
  'GDDDDDDDDDDG',
  'GDDDDDDDDDDG',
  'GGGGGGGGGGGG',
]
const SCALE_C = { S: '#d8dbe8', K: '#9aa5c4', G: '#6b62a8', D: '#7dffb0' }
const PLANE = [
  '......W.......',
  '......WW......',
  'W.....WWW.....',
  'WW...WWWWWWWWW',
  'WWWWWWWWWWWWW.',
  'WW....WWW.....',
  'W.....WW......',
  '......W.......',
]
const MACHINE = [
  '..GGGGGGGGGG..',
  '.GGRGGYGGBGGG.',
  '.GGGGGGGGGGGG.',
  '.GG.KKKKKK.GG.',
  'GGGGGGGGGGGGGG',
  'G.G.G..G.G..GG',
  'GGGGGGGGGGGGGG',
  '...K......K...',
  '..KKK....KKK..',
]
const MACHINE_C = { G: '#9aa5c4', R: '#ff6b5a', Y: '#ffd23a', B: '#6fc3ff', K: '#2a2350' }
const CLOCK = (x, cx, cy, r, k, text) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = PAPER; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `700 ${r * 0.5}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
// a mug seen from the top with art in the foam
function topMug(x, cx, cy, r, k, art) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 14, 0, Math.PI * 2); x.fill()
  x.fillStyle = PAPER; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#b5703a'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f5dcc0'
  if (art === 'heart') { x.beginPath(); x.arc(-r * 0.22, -r * 0.1, r * 0.28, 0, Math.PI * 2); x.arc(r * 0.22, -r * 0.1, r * 0.28, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(-r * 0.48, 0); x.lineTo(r * 0.48, 0); x.lineTo(0, r * 0.5); x.fill() }
  x.restore()
}

const L = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 30, font: MONO, weight: 700, ...o })
const CAMEOS = [
  { sign: 'aries', cap: 'Drank it boiling. | *No regrets.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MUG, mugC(), 790, 960, 22 * k); steam(x, t, 780, 860, k, 4)
      L(x, 790, 640, 'TONGUE: GONE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: '#ff6b5a', size: 34 })
    } },
  { sign: 'taurus', cap: 'One coffee. | *Four pastries.*', mood: lt => lt < 1.6 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MUG, mugC(), 680, 1010, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 4; i++) drawBits(x, CROISSANT, CROISSANT_C, 850 + (i % 2 ? 20 : -20), 1060 - i * 70, 13 * pop01(t, P.t0 + 0.4 + i * 0.3, 0.25, 2.2))
      L(x, 790, 640, 'BREAKFAST: PART 1', pop01(t, P.t0 + 1.7, 0.3, 2.2), { bg: GOLD })
    } },
  { sign: 'gemini', cap: 'Two mugs. | Both *half full.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MUG, mugC('#ffd23a'), 720, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      drawBits(x, MUG, mugC('#8fe3ff'), 880, 960, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.06 })
      L(x, 800, 700, 'BOTH COLD BY 9', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: LAV })
    } },
  { sign: 'cancer', cap: 'Made coffee | *for the whole street.*', mood: lt => lt < 1.2 ? 'happy' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, MUG, mugC(), 690 + (i % 3) * 100, 1050 - Math.floor(i / 3) * 110, 9 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2.2))
      L(x, 790, 680, 'CUPS POURED: 37', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: MINT })
      bubble(x, 790, 820, 'one for | the mailman!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Latte art: | *their own face.*', mood: lt => lt < 1.1 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      topMug(x, 790, 910, 130, k, 'face')
      if (k > 0.5) signChar(x, t, 'leo', 790, 920, 160 * k, { mood: 'wink', seed: 12, glyph: false, alpha: 0.8 })
      L(x, 790, 650, 'A MASTERPIECE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: GOLD, size: 34 })
      sparkles(x, t, 790, 910, P.t0 + 1.2, 8, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Weighed the beans. | *To the gram.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCALE, SCALE_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const g = lt < 1.4 ? (17.2 + lt * 0.5).toFixed(2) : '18.00'
      L(x, 790, 760, `${g} g`, pop01(t, P.t0 + 0.5, 0.3, 2), { bg: BONE, size: 44, rot: 0 })
      if (lt > 1.4) L(x, 790, 1160, 'PERFECT. ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: MINT })
    } },
  { sign: 'libra', cap: 'Oat or almond? | *Still deciding.*', mood: lt => lt < 1.2 ? 'squint' : 'wide', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CARTON, { T: '#ff8fb1', W: PAPER, B: '#e8a24a' }, 710, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      drawBits(x, CARTON, { T: '#7dffb0', W: PAPER, B: '#c98a4e' }, 880, 960, 22 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.06 })
      L(x, 790, 680, lt < 1.3 ? '7:02 AM' : '11:48 AM', pop01(t, P.t0 + 0.8, 0.3, 2.2), { bg: LAV, size: 36 })
    } },
  { sign: 'scorpio', cap: 'Black. | Like *their secrets.*', mood: lt => lt < 1.3 ? 'squint' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MUG, mugC('#2a2350', '#05040c'), 790, 960, 22 * k, { outline: '#c97bff' })
      bubble(x, 800, 680, 'don’t ask.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Popped out for coffee. | Ended up *abroad.*', mood: lt => lt < 1.0 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.4, 2.2))
      drawBits(x, PLANE, { W: PAPER }, lerp(680, 900, fly), lerp(1000, 680, fly), 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.5 })
      L(x, 790, 1120, 'BACK IN 3 WEEKS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: '#ff9a4a' })
    } },
  { sign: 'capricorn', cap: 'Coffee at 4 a.m. | *Inbox: done.*', mood: lt => lt < 1.2 ? 'squint' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      CLOCK(x, 800, 760, 90, pop01(t, P.t0 + 0.2, 0.3, 2), '4:00')
      drawBits(x, MUG, mugC(), 800, 1030, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 920, 'UNREAD: 0', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: MINT, size: 34 })
    } },
  { sign: 'aquarius', cap: 'Built a new | *coffee machine.*', mood: lt => lt < 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MACHINE, MACHINE_C, 790 + (lt > 1.3 ? 4 * Math.sin(t * 40) : 0), 920, 20 * k)
      if (lt > 1.3) steam(x, t, 790, 760, 1, 5)
      L(x, 790, 1130, 'MAKES TEA. SOMEHOW.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: SKYB, size: 28 })
    } },
  { sign: 'pisces', cap: 'A foam heart. | Pisces *sobbed.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', tears: lt => lt < 1.0 ? 1 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      topMug(x, 790, 910, 130, pop01(t, P.t0 + 0.2, 0.3, 2), 'heart')
      L(x, 790, 650, 'TOO BEAUTIFUL TO DRINK', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: PINK, size: 26 })
      hearts(x, t, 790, 860, P.t0 + 1.0, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0352', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Zodiacs making | coffee *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve mugs. | *Zero patience.*' },
  lesson: { text: 'Everyone wakes up | *their own way.*', chip: 'MOOD: BREWED' },
  last: { text: 'Same time | *tomorrow?*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
