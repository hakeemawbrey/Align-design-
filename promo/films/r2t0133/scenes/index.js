// r2t0133: THE SIGNS AS… v3, "The signs at | pizza night." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, each the most extreme version of itself at pizza night. The look lives in ../../signs3kit.js.
//   0.0–3.6    "The signs at | *pizza night.*"
//   3.6–49.2   ♈ ate a slice before the box landed · ♉ a large, per person · ♊ half and half, then half again
//              · ♋ tucked the pizza in with a blanket · ♌ their face in pepperoni · ♍ cut it with a ruler
//              · ♎ still picking toppings, the driver left · ♏ knows who took the last slice · ♐ ordered the mystery special
//              · ♑ split the bill to the cent · ♒ invented a topping: cereal · ♓ mourned the last slice
//  49.2        "One pizza. | *Twelve opinions.*"
//  52.6        callback: "Libra decided. | *Next morning.*" (the toppings list comes back, ticked, with a sunrise)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP } from './props.js'

const CRUST = '#e0a050', CHEESE = '#ffd86b', PEP = '#d0453a'
const SLICE = ['CCCCCCCCC', 'CYYYYYYYC', '.YYPYYYY.', '.YYYYPY..', '..YPYYY..', '..YYYY...', '...YYY...', '...YY....', '....Y....']
const SLICE_C = { C: CRUST, Y: CHEESE, P: PEP }
const BOX = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const BOX_C = { K: '#a57a44', B: '#c8975a' }
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
const GLASS = ['.KKK....', 'K...K...', 'K...K...', 'K...K...', '.KKK....', '....K...', '.....K..', '......K.']

/** a whole pizza seen from above; slices: number of cuts; tops: fn(i, a) colour for topping dots */
function pizza(x, cx, cy, r, k, { cuts = 8, tops = null, rot = 0, dots = 10 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(rot)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = CRUST; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = CHEESE; x.beginPath(); x.arc(0, 0, r * 0.86, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < dots; i++) { const a = i * 2.4, d = r * (0.25 + 0.5 * ((i * 37) % 10) / 10); x.fillStyle = tops ? tops(i, a) : PEP; x.beginPath(); x.arc(Math.cos(a) * d, Math.sin(a) * d, r * 0.09, 0, Math.PI * 2); x.fill() }
  x.strokeStyle = 'rgba(27,18,54,0.55)'; x.lineWidth = 4
  for (let i = 0; i < cuts; i++) { const a = i / cuts * Math.PI * 2; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  x.restore()
}
/** the toppings list Libra can't decide on (ticked = which one won) */
function toppings(x, cx, cy, k, lt, ticked = -1) {
  card(x, cx, cy, 260, 330, k, { bg: CREAM, rot: 0.04 }, () => {
    txt(x, 'TOPPINGS', 0, -130, { size: 30, color: RED })
    ;['cheese?', 'mushroom?', 'olives?', 'peppers?'].forEach((s, i) => {
      x.fillStyle = INK; x.fillRect(-110, -84 + i * 62, 34, 34); x.fillStyle = '#fff'; x.fillRect(-105, -79 + i * 62, 24, 24)
      if (i === ticked || (ticked < 0 && Math.floor(lt * 3) % 4 === i)) { x.fillStyle = ticked >= 0 ? '#2fc79a' : '#b9b0a0'; x.fillRect(-101, -75 + i * 62, 16, 16) }
      txt(x, s, 20, -66 + i * 62, { size: 28, weight: 700 })
    })
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ate a slice | *before the box landed.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.2, 1.4))
      drawBits(x, BOX, BOX_C, 800, lerp(560, 1080, d), 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const s = ease.inOutCubic(prog(lt, 0.4, 0.8))
      drawBits(x, SLICE, SLICE_C, lerp(800, F.x + 130, s), lerp(600, F.cy - 30, s), 14 * pop01(t, P.t0 + 0.4, 0.2, 2), { rot: -0.5 })
      label(x, 800, 760, 'STILL IN THE AIR', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Ordered a large. | *Per person.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BOX, BOX_C, 800 + (i % 2 ? 8 : -8), 1080 - i * 90, 22 * pop01(t, P.t0 + 0.2 + i * 0.18, 0.25, 2.2))
      label(x, 800, 1080 - 4 * 90 - 30, 'ALL MINE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'Half and half. | Then *half again.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(lt / 0.5)), cuts = [2, 4, 8, 16][n - 1]
      const COLS = [PEP, '#5fd068', '#3a2a40', ORANGE, '#8a4a2e', LAV]
      pizza(x, 790, 860, 170, pop01(t, P.t0 + 0.15, 0.3, 2), { cuts, dots: 18, tops: (i, a) => COLS[Math.floor(((a % (Math.PI * 2)) / (Math.PI * 2)) * cuts) % COLS.length] })
      label(x, 790, 1100, `${cuts} FLAVOURS`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Tucked the pizza in. | *With a blanket.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, BOX, BOX_C, 790, 1000, 24 * k)
      const b = ease.outCubic(prog(lt, 0.5, 1.0))
      card(x, 790, 990, 330, 70, b, { bg: '#8fbfff', rot: 0 }, () => { for (let i = 0; i < 6; i++) { x.fillStyle = '#ff9ccf'; x.fillRect(-150 + i * 55, -30, 24, 60) } })
      label(x, 790, 780, 'STAY WARM ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.05 })
      bubble(x, 790, 640, 'goodnight, pizza', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Their own face | *in pepperoni.*', mood: 'sparkle', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      pizza(x, 790, 860, 180, k, { cuts: 0, dots: 0 })
      if (k > 0.5) {
        const n = Math.floor(clamp((lt - 0.4) / 1.0) * 10)
        const PTS = [[0, -110], [32, -36], [108, -34], [48, 14], [70, 92], [0, 48], [-70, 92], [-48, 14], [-108, -34], [-32, -36]]
        for (let i = 0; i < n; i++) { x.fillStyle = INK; x.beginPath(); x.arc(790 + PTS[i][0] * k, 860 + PTS[i][1] * k, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = PEP; x.beginPath(); x.arc(790 + PTS[i][0] * k, 860 + PTS[i][1] * k, 19, 0, Math.PI * 2); x.fill() }
      }
      label(x, 790, 1110, 'A MASTERPIECE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: ORANGE, rot: -0.04 })
      sparkles(x, t, 790, 860, P.t0 + 1.5, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Cut it with a ruler. | *Exactly even.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      pizza(x, 790, 880, 170, pop01(t, P.t0 + 0.15, 0.3, 2), { cuts: 8 })
      const r = ease.inOutCubic(prog(lt, 0.4, 1.4))
      x.save(); x.translate(790, 880); x.rotate(lerp(0, Math.PI * 0.75, r))
      x.fillStyle = INK; x.fillRect(-206, -26, 412, 52); x.fillStyle = '#ffe28a'; x.fillRect(-200, -20, 400, 40)
      x.fillStyle = INK; for (let i = 0; i <= 20; i++) x.fillRect(-196 + i * 19.6, -20, 3, i % 5 ? 12 : 22)
      x.restore()
      label(x, 790, 640, '45.000°', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still picking toppings. | *Driver left.*', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      toppings(x, 790, 840, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1100, 'DRIVER: GONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knows who took | *the last slice.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 1010, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1010, 'EMPTY', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 26, bg: CREAM, rot: 0, font: MONO, weight: 700 })
      drawBits(x, GLASS, { K: BONE }, 760 + 30 * Math.sin(t * 2), 800, 18 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 790, 620, 'it was Gemini.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Ordered the mystery special. | *No regrets.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const COLS = [LAV, MINT, '#ff6b5a', SKYB, GOLD, '#5fd068', PINK]
      pizza(x, 310, 860, 160, pop01(t, P.t0 + 0.15, 0.3, 2), { cuts: 6, dots: 16, tops: (i) => COLS[i % COLS.length] })
      label(x, 310, 650, '??? SPECIAL', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.05 })
      bubble(x, 310, 1100, 'ten out of ten', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Split the bill. | *To the cent.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 380, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'RECEIPT', 0, -150, { size: 30 })
        ;['you  $4.37', 'me   $4.37', 'Leo  $4.38'].forEach((s, i) => { if (lt > 0.4 + i * 0.3) txt(x, s, 0, -70 + i * 60, { size: 28, font: MONO, weight: 700 }) })
        x.fillStyle = INK; x.fillRect(-100, 110, 200, 4)
        if (lt > 1.4) txt(x, 'tip: 18.000%', 0, 146, { size: 24, font: MONO, weight: 700, color: '#2fc79a' })
      })
      label(x, 790, 630, 'PAY ME BACK', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: '#2fc79a', rot: -0.05 })
    } },
  { sign: 'aquarius', cap: 'Invented a topping. | *Cereal.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      pizza(x, 790, 880, 170, k, { cuts: 8, dots: 0 })
      const n = Math.floor(clamp((lt - 0.4) / 0.8) * 12)
      const RC = [PINK, MINT, GOLD, SKYB]
      for (let i = 0; i < n; i++) { const a = i * 2.4, d = 30 + (i * 37) % 120; x.strokeStyle = RC[i % 4]; x.lineWidth = 10; x.beginPath(); x.arc(790 + Math.cos(a) * d, 880 + Math.sin(a) * d, 16, 0, Math.PI * 2); x.stroke() }
      label(x, 790, 650, 'PATENT PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'The last slice is gone. | *Mourning it.*', mood: lt => lt < 0.9 ? 'neutral' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 1000, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 800, 'RIP SLICE', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.05 })
      label(x, 790, 1120, 'GONE TOO SOON', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0133', key: 'G', accent: ORANGE, ending: 'callback',
  title: 'The signs at | *pizza night.*',
  cameos: CAMEOS,
  group: { cap: 'One pizza. | *Twelve opinions.*' },
  last: {
    text: 'Libra decided. | *Next morning.*',
    draw(x, t, lt) {
      drawBits(x, SUN, { Y: GOLD }, 300, 980, 22 * pop01(lt, 0.3, 0.35, 2), { rot: t * 0.3 })
      const k = pop01(lt, 0.2, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 450, 1180, 260 * k, { mood: lt > 1.4 ? 'sparkle' : 'sleepy', seed: 9, hops: [t - lt + 1.45] })
      toppings(x, 740, 1180, pop01(lt, 0.5, 0.35, 2), lt, lt > 1.4 ? 0 : -1)
      if (lt > 1.4) sparkles(x, t, 740, 1100, t - lt + 1.45, 6, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
