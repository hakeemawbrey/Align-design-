// r2a0224: star_advice, ADVICE ROLLCALL, "What each sign | needs after a long trip." (~54 s vertical, signs3kit, lofi · E)
// Twelve signs in zodiac order: one warm, specific thing each needs when they get home, each with a light gag.
//   0.0–3.6    "What each sign | *needs after a long trip.*"
//   3.6–49.2   ♈ a nap, then the next adventure (already repacked) · ♉ their own bed and a real meal · ♊ to tell every
//              story twice · ♋ home, blankets and their people · ♌ someone asking for the photos · ♍ unpack, then rest
//              guilt-free · ♎ a cozy night in with their match · ♏ a whole day of no talking · ♐ to dream up the next trip
//              · ♑ a full night's sleep, alarm off · ♒ space to process it all · ♓ a happy cry over the postcards
//  49.2        group ending: "Welcome home. | *Rest is the souvenir.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN, PHONEC } from './props.js'

const BAG = ['...KKKK...', '...K..K...', 'RRRRRRRRRR', 'RRWRRRRYRR', 'RRRRRRRRRR', 'RRRRRYRRRR', 'RRRRRRRRRR', '.K......K.']
const BAG_C = { K: INK, R: '#ff6b5a', W: CREAM, Y: SUN }
const BED = ['W..........W', 'WPPP.......W', 'WPPPBBBBBBBW', 'WBBBBBBBBBBW', 'WWWWWWWWWWWW', 'W..........W']
const BED_C = { W: BROWN, P: CREAM, B: '#6fc3ff' }
const BOWL = ['..S.S.S..', '.S.S.S...', 'OOOOOOOOO', '.WWWWWWW.', '..WWWWW..']
const BOWL_C = { S: BONE, O: ORANGE, W: CREAM }
const MUG = ['MMMMM.', 'MMMMMM', 'MMMMM.M', 'MMMMMM', 'MMMMM.']
const MASK = ['KKK.....KKK', 'KLLLLLLLLLK', 'LLLLLLLLLLL', 'LLLLKLKLLLL', '.LLLLLLLLL.']
const MASK_C = { K: INK, L: LAV }
const PILE = ['WWWWWW', 'BBBBBB', 'WWWWWW', 'PPPPPP', 'WWWWWW']

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'A nap. | *Then the next adventure.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', star: L, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'NAP: 20 MIN', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'ALREADY REPACKED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Your own bed. | *And a real meal.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L,
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 1010, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, BOWL, BOWL_C, 790, 780, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 640, 'HOME COOKING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Time to tell | *every story twice.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 720, lt > 1.1 ? 'and THEN…' : 'so, day one…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.7) * 47)
      label(x, 790, 960, `STORIES: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'FRIENDS: STILL LISTENING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Home, blankets, | *and your people.*', mood: 'heart', star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'taurus', 720, 980, 160 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false }); signChar(x, t, 'leo', 870, 960, 160 * k, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false }) }
      label(x, 790, 700, 'WELCOME BACK!', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1060, P.t0 + 1.2, { n: 6, life: 1.8, spread: 280, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Someone asking | *to see the photos.*', mood: 'sparkle', star: L, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 250, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: PHONEC, rot: 0.05 }, () => {
        x.fillStyle = DEEP; x.fillRect(-110, -170, 220, 340)
        for (let i = 0; i < 9; i++) { x.fillStyle = [SUN, ORANGE, PINK, SKYB][(i * 3) % 4]; x.fillRect(-96 + (i % 3) * 68, -150 + Math.floor(i / 3) * 78, 58, 66) }
        txt(x, '2,031 photos', 0, 120, { size: 24, font: MONO, weight: 700, color: BONE })
      })
      bubble(x, 790, 1110, 'got a few hours?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Unpack right away. | *Then rest, guilt-free.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        drawBits(x, PILE, { W: CREAM, B: [SKYB, MINT, PINK][i], P: [LAV, SUN, SKYB][i] }, 680 + i * 110, 980, 16 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
        label(x, 680 + i * 110, 880, '✓', pop01(t, P.t0 + 0.8 + i * 0.2, 0.3, 2.4), { size: 34, bg: MINT, rot: 0, font: MONO, weight: 700 })
      }
      label(x, 790, 680, 'NOW: COUCH', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'A cozy night in | *with your match.*', mood: 'heart', star: L,
    front(x, t, lt, P) {
      drawBits(x, MUG, { M: PINK }, 720, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, MUG, { M: SKYB }, 870, 980, 18 * pop01(t, P.t0 + 0.35, 0.3, 2), { sx: -1 })
      for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) { const ph = (t * 0.8 + j / 3) % 1; x.fillStyle = BONE; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillRect(710 + i * 150 + Math.sin(ph * 6) * 8, 900 - ph * 80, 8, 14); x.globalAlpha = 1 }
      label(x, 790, 700, '✦ MATCH: HOME', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'A whole day | *of no talking.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 870, 260, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#5b2e1a', rot: 0 }, () => {
        x.fillStyle = GOLD; x.fillRect(80, 0, 20, 20)
        x.save(); x.rotate(Math.sin(t * 2) * 0.05); x.fillStyle = INK; x.fillRect(-96, -130, 192, 120); x.fillStyle = CREAM; x.fillRect(-90, -124, 180, 108)
        txt(x, 'DO NOT', 0, -96, { size: 26, font: MONO, weight: 700 }); txt(x, 'DISTURB', 0, -64, { size: 26, font: MONO, weight: 700 }); txt(x, '(lovingly)', 0, -32, { size: 18, font: MONO, weight: 700, color: '#6e6658' })
        x.restore()
      })
      label(x, 790, 1110, 'WORDS SPOKEN: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'To dream up | *the next one.*', mood: 'sparkle', look: [-1, -1], star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 860); x.scale(k, k); x.rotate(t * 0.4)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 128, 0, Math.PI * 2); x.fill(); x.fillStyle = '#4a9ad8'; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
        x.fillStyle = GREEN; for (const [a, b, w, h] of [[-70, -60, 70, 50], [10, -20, 80, 60], [-40, 40, 60, 40]]) x.fillRect(a, b, w, h)
        x.restore()
      }
      label(x, 320, 680, 'NEXT TRIP: ???', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 320, 1060, 'DREAMING: ON', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A full night’s sleep. | *You earned it.*', mood: 'sleepy', star: R,
    front(x, t, lt, P, F) {
      drawBits(x, MASK, MASK_C, F.x, F.top + 30, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { outline: null })
      label(x, 310, 760, 'ALARM: OFF', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 310, 1000, 'SLEEP: 11 HRS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Space to process | *everything you saw.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, -1], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 800); x.scale(k, k); x.fillStyle = INK; for (const [a, b, r] of [[-70, 0, 80], [30, -30, 95], [100, 20, 70], [0, 40, 80]]) { x.beginPath(); x.arc(a, b, r + 6, 0, Math.PI * 2); x.fill() } x.fillStyle = '#e8eef8'; for (const [a, b, r] of [[-70, 0, 80], [30, -30, 95], [100, 20, 70], [0, 40, 80]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() } x.restore() }
      if (k > 0.5) chart(x, 800, 790, 70, k, t, 0.6)
      for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.beginPath(); x.arc(640 - i * 40, 940 + i * 40, 18 - i * 4, 0, Math.PI * 2); x.fill() }
      label(x, 790, 1110, 'NEW IDEAS: 37', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A happy cry. | *It was beautiful.*', mood: lt => lt < 1.0 ? 'sparkle' : 'heart', tears: lt => lt < 1.0 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) card(x, 720 + i * 80, 820 + i * 90, 220, 150, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { bg: [SKYB, SUN, PINK][i], rot: -0.12 + i * 0.1 }, () => {
        x.fillStyle = CREAM; x.fillRect(-96, -60, 120, 120); x.fillStyle = [GREEN, ORANGE, LAV][i]; x.fillRect(-86, -10, 100, 60)
        x.fillStyle = INK; for (let j = 0; j < 3; j++) x.fillRect(40, -40 + j * 30, 50, 6)
      })
      label(x, 790, 640, 'POSTCARDS: 14', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0224', key: 'E', accent: '#6fc3ff', ending: 'group',
  title: 'What each sign | *needs after a long trip.*',
  cameos: CAMEOS,
  group: { cap: 'Welcome home. | *Rest is the souvenir.*' },
})
export const DURATION = F.DURATION
// the accent line is long: widen the title box so it stays on one line, then scale it to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-120px', width: '1320px', transformOrigin: '50% 0', transform: 'scale(0.75)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
