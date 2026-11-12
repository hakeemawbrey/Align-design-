// r2t0251: star_talk, SOLO, "Taurus first dates | be like." (~50 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a first date, every beat the most extreme Taurus version.
//   0.0–3.6    "Taurus first dates | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              picked the place for the bread · read your profile, only the food part · dressed up in formal sweatpants
//              · you touched their dessert, silence · you said hike, they said pancakes · brought you a plant, already named
//              · the bill came, they ordered more · great date, napped after · second date: same table, same order
//  37.8        "Food first. | *You second.*"  Taurus comes back, big.
//  41.0        LESSON: "Feed a Taurus well. | They'll *stay forever.*"  STATUS: SMITTEN
//  46.9        "Their perfect match? | *Orders extra.*" over the match card: Taurus + Virgo (the dessert, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TAU = '#e9b24a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', CRUST = '#d9963a'
const S = 'taurus'

// a tilted paper/screen card with an ink outline and a drop shadow; fn draws inside (local coords)
function slab(x, cx, cy, w, h, k, { rot = 0.04, bg = BONE, edge = INK } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(x)
  x.restore()
}
const txt = (x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

// a woven basket of bread rolls, refilling
function breadBasket(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const n = 3 + Math.floor(clamp((lt - 0.4) / 1.2) * 4)
  const spots = [[-80, -40], [0, -60], [80, -40], [-40, -100], [40, -100], [0, -140], [-100, -90]]
  for (let i = 0; i < n; i++) {
    const [a, b] = spots[i]
    x.fillStyle = INK; x.beginPath(); x.ellipse(a, b, 66, 44, 0, 0, 7); x.fill()
    x.fillStyle = CRUST; x.beginPath(); x.ellipse(a, b, 58, 36, 0, 0, 7); x.fill()
    x.fillStyle = '#f2c27a'; x.fillRect(a - 30, b - 14, 14, 26); x.fillRect(a - 4, b - 18, 14, 30); x.fillRect(a + 22, b - 14, 14, 26)
  }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-170, -30); x.lineTo(170, -30); x.lineTo(130, 110); x.lineTo(-130, 110); x.closePath(); x.fill()
  x.fillStyle = WOOD; x.beginPath(); x.moveTo(-160, -22); x.lineTo(160, -22); x.lineTo(122, 100); x.lineTo(-122, 100); x.closePath(); x.fill()
  x.fillStyle = '#a8731f'; for (let r = 0; r < 4; r++) x.fillRect(-150 + r * 8, -4 + r * 28, 300 - r * 16, 8)
  x.restore()
}
// a dating-profile card where only the food line glows
function profile(x, t, cx, cy, k, lt) {
  slab(x, cx, cy, 300, 420, k, { rot: 0.05, bg: '#2a2350' }, x => {
    x.fillStyle = '#140c30'; x.fillRect(-130, -190, 260, 150)
    signChar(x, t, 'scorpio', 0, -118, 120, { mood: 'wink', seed: 51, glyph: false, glow: 0.6 })
    const rows = ['JOB', 'HOBBIES', 'FAV FOOD', 'GOALS']
    rows.forEach((r, i) => {
      const y = 10 + i * 46, hot = i === 2
      const on = hot && lt > 0.9
      x.globalAlpha = hot ? 1 : lt > 0.9 ? 0.25 : 0.8
      x.fillStyle = on ? GOLD : '#3d3470'; x.fillRect(-126, y - 18, 252, 36)
      txt(x, r, -112, y, 20, on ? INK : BONE, MONO, 700, 'left')
      x.globalAlpha = 1
    })
    txt(x, '♏︎ SCORPIO', 0, 190, 22, LAV, MONO, 700)
  })
}
// sweatpants with a bow tie pinned on: formalwear
function sweatpants(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const P = (pad, col) => { x.fillStyle = col; x.beginPath(); x.moveTo(-120 - pad, -150 - pad); x.lineTo(120 + pad, -150 - pad); x.lineTo(140 + pad, 170 + pad); x.lineTo(30 - pad * 0.2, 170 + pad); x.lineTo(0, -10); x.lineTo(-30 + pad * 0.2, 170 + pad); x.lineTo(-140 - pad, 170 + pad); x.closePath(); x.fill() }
  P(8, INK); P(0, '#9a92b8')
  x.fillStyle = '#7d769c'; x.fillRect(-120, -150, 240, 34)
  x.fillStyle = BONE; x.fillRect(-14, -118, 6, 50); x.fillRect(8, -118, 6, 50)
  x.fillStyle = '#7d769c'; x.fillRect(-136, 140, 60, 30); x.fillRect(76, 140, 60, 30)
  // the bow tie
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -180); x.lineTo(0, -150); x.lineTo(-70, -120); x.closePath(); x.fill(); x.beginPath(); x.moveTo(70, -180); x.lineTo(0, -150); x.lineTo(70, -120); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(-60, -172); x.lineTo(-6, -150); x.lineTo(-60, -128); x.closePath(); x.fill(); x.beginPath(); x.moveTo(60, -172); x.lineTo(6, -150); x.lineTo(60, -128); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-14, -164, 28, 28)
  x.restore()
}
// a slice of cake on a plate, a fork creeping in from the right
function dessert(x, t, cx, cy, k, fork = 0, { empty = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 70, 180, 46, 0, 0, 7); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 66, 170, 38, 0, 0, 7); x.fill()
  if (!empty) {
    x.fillStyle = INK; x.beginPath(); x.moveTo(-120, 70); x.lineTo(110, 70); x.lineTo(110, -50); x.lineTo(-120, 20); x.closePath(); x.fill()
    x.fillStyle = '#7a4a2e'; x.beginPath(); x.moveTo(-110, 62); x.lineTo(102, 62); x.lineTo(102, -40); x.lineTo(-110, 24); x.closePath(); x.fill()
    x.fillStyle = PINK; x.beginPath(); x.moveTo(-110, 30); x.lineTo(102, -36); x.lineTo(102, -12); x.lineTo(-110, 46); x.closePath(); x.fill()
    x.fillStyle = RED; x.beginPath(); x.arc(70, -58, 20, 0, 7); x.fill(); x.fillStyle = '#fff'; x.fillRect(62, -68, 7, 7)
  } else { x.fillStyle = '#7a4a2e'; for (const [a, b] of [[-50, 60], [10, 74], [60, 56]]) x.fillRect(a, b, 12, 8) }
  if (fork > 0) {
    const fx = lerp(330, 150, fork)
    x.fillStyle = INK; x.fillRect(fx - 4, 6, 200, 22)
    x.fillStyle = '#c9c9d8'; x.fillRect(fx, 10, 196, 14)
    for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(fx - 56, -2 + i * 11, 60, 8); x.fillStyle = '#c9c9d8'; x.fillRect(fx - 52, 0 + i * 11, 56, 4) }
  }
  x.restore()
}
// a tall stack of pancakes with butter and a drip
function pancakes(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 120, 180, 40, 0, 0, 7); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 116, 170, 32, 0, 0, 7); x.fill()
  for (let i = 0; i < 6; i++) {
    const y = 90 - i * 36
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, y, 140, 30, 0, 0, 7); x.fill()
    x.fillStyle = CRUST; x.beginPath(); x.ellipse(0, y, 132, 22, 0, 0, 7); x.fill()
    x.fillStyle = '#f2c27a'; x.fillRect(-120, y - 6, 240, 6)
  }
  x.fillStyle = '#b8641c'; x.fillRect(-80, -100, 160, 14); x.fillRect(40, -96, 18, 70 + 8 * Math.sin(t * 3)); x.fillRect(-60, -96, 16, 46)
  x.fillStyle = INK; x.fillRect(-28, -136, 56, 34); x.fillStyle = '#ffe27a'; x.fillRect(-22, -130, 44, 24)
  x.restore()
}
// a potted plant with a name tag
function plant(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const sway = 0.06 * Math.sin(t * 2.4)
  x.save(); x.rotate(sway)
  for (const [a, r, l] of [[-0.7, 1, 170], [-0.25, 1.2, 210], [0.2, 1, 200], [0.65, 0.9, 160]]) {
    x.save(); x.rotate(a)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, -l / 2, 44 * r, l / 2 + 8, 0, 0, 7); x.fill()
    x.fillStyle = '#3fae5e'; x.beginPath(); x.ellipse(0, -l / 2, 36 * r, l / 2, 0, 0, 7); x.fill()
    x.fillStyle = '#7de08f'; x.fillRect(-3, -l + 20, 6, l - 30)
    x.restore()
  }
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-104, -10); x.lineTo(104, -10); x.lineTo(84, 160); x.lineTo(-84, 160); x.closePath(); x.fill()
  x.fillStyle = '#d0703a'; x.beginPath(); x.moveTo(-96, -2); x.lineTo(96, -2); x.lineTo(78, 152); x.lineTo(-78, 152); x.closePath(); x.fill()
  x.fillStyle = '#e88a52'; x.fillRect(-100, -2, 200, 30)
  x.restore()
}
// a receipt that keeps getting longer
function receipt(x, t, cx, top, k, lt) {
  if (k <= 0.01) return
  const len = lerp(120, 560, ease.outCubic(clamp((lt - 0.5) / 1.4)))
  const items = ['BREAD', 'PASTA', 'BREAD', 'SOUP', 'MORE BREAD', 'CHEESE', 'DESSERT', 'DESSERT 2', 'TO GO BOX', 'BREAD']
  x.save(); x.translate(cx, top); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, 10, 250, len)
  x.fillStyle = INK; x.fillRect(-128, -6, 256, len + 12)
  x.fillStyle = CREAM; x.fillRect(-120, 0, 240, len)
  txt(x, 'TABLE 4', 0, 30, 24, INK, MONO, 700)
  const n = Math.floor((len - 70) / 42)
  for (let i = 0; i < Math.min(n, items.length); i++) {
    txt(x, items[i], -100, 76 + i * 42, 20, '#3d3470', MONO, 700, 'left')
    x.fillStyle = '#b9b0a0'; x.fillRect(60, 70 + i * 42, 36, 10)
  }
  x.fillStyle = CREAM; for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(-120 + i * 20, len); x.lineTo(-110 + i * 20, len + 12); x.lineTo(-100 + i * 20, len); x.fill() }
  x.restore()
}
// a pillow and a blanket for the post-date nap
function nap(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-190, -70, 380, 150, 50); x.fill()
  x.fillStyle = '#f4f0ff'; x.beginPath(); x.roundRect(-180, -60, 360, 130, 44); x.fill()
  x.fillStyle = '#d8d0f0'; x.fillRect(-140, 0, 280, 8)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Picked the restaurant | for the *bread.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      breadBasket(x, t, 780, 960, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 780, 660, 'FREE REFILLS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: TAU, rot: -0.05 })
      sparkles(x, t, 780, 860, P.t0 + 1.6, 7, 180, 0.2)
    } },
  { sign: S, cap: 'Read your profile. | Only the *food part.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      profile(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 380, 610, 'and dessert?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Dressed up. | In *formal sweatpants.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      sweatpants(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1150, 'BLACK TIE (COMFY)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.3, 6, 150, 0.6)
    } },
  { sign: S, cap: 'You touched their dessert. | *Silence.*', mood: lt => lt > 1.0 ? 'squint' : 'heart', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      dessert(x, t, 760, 950, 1.05 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.4, 0.95)) * (lt < 1.5 ? 1 : 1 - ease.inCubic(prog(lt, 1.5, 1.8))))
      label(x, 760, 690, 'MINE.', pop01(t, P.t0 + 1.25, 0.3, 2.6), { size: 64, bg: RED, color: CREAM, rot: -0.06 })
    } },
  { sign: S, cap: 'You said “hike.” | They said *“pancakes.”*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 760, 600, 'hike? uphill?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      pancakes(x, t, 780, 990, pop01(t, P.t0 + 1.0, 0.35, 2))
      sparkles(x, t, 780, 900, P.t0 + 1.3, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Brought you a plant. | *Already named it.*', mood: 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      plant(x, t, 780, 990, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1150, 'THIS IS GERALD', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 780, 760, P.t0 + 1.5, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'The bill came. | They *ordered more.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      receipt(x, t, 790, 560, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 380, 610, 'one more bread', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: S, cap: 'Great first date. | They *napped after.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', star: { x: -100, y: 40 },
    back(x, t, lt, P) { nap(x, t, 440, 1060, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 800, 640, 'RECOVERY MODE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Second date? | *Same table. Same order.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      slab(x, 790, 820, 280, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.04, bg: CREAM }, x => {
        x.fillStyle = TAU; x.fillRect(-140, -100, 280, 56)
        txt(x, 'RESERVED', 0, -72, 30, INK, MONO, 700)
        txt(x, 'TABLE 4', 0, 10, 44, INK)
        txt(x, 'every friday', 0, 64, 24, '#6b62a8', MONO, 700)
      })
      bubble(x, 790, 1080, 'the usual!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0251', key: 'C', accent: TAU, solo: S, ending: 'card',
  title: 'Taurus first dates | *be like.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'virgo', chip: 'IT’S A MATCH' },
  group: { cap: 'Food first. | *You second.*', mood: 'heart' },
  lesson: { text: 'Feed a Taurus well. | They’ll *stay forever.*', chip: 'STATUS: SMITTEN' },
  last: {
    text: 'Their perfect match? | *Orders extra.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.0, spread: 640, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
