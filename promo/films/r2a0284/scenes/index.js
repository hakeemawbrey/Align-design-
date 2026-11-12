// r2a0284: star_advice, ADVICE ROLLCALL, "What each sign | brings to family dinner." (~62 s vertical, lofi · E)
// Twelve signs, one warm and specific thing each brings to the family table, with a light visual gag.
//   0.0–3.6    "Each sign at | *family dinner.*"
//   3.6–49.2   ♈ a game for after · ♉ the best dish, from scratch · ♊ the stories · ♋ grandma's recipe · ♌ the compliments
//              · ♍ name cards · ♎ the peace (peas and carrots, balanced) · ♏ the real talk · ♐ a surprise plus-one · ♑ fixes
//              the wobbly table · ♒ the weirdest, best topic · ♓ happy tears at hello
//  49.2        "One table. | *Twelve signs.*"
//  52.4        LESSON UNLOCKED: "Everyone brings | *something good.*"  STATUS: FULL
//  58.3        "Seconds? | *Always.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, GREY, DEEP, GREEN, WOOD, ORANGE } from './props.js'

const ACC = '#ffd08a'
const ST = { x: -170 }
const DISH = ['..S.S.S..', '.S.S.S.S.', '.KKKKKKK.', 'KOOOOOOOK', 'KOYOOOYOK', 'KOOOOOOOK', '.KKKKKKK.']
const DISH_C = { S: '#e8e4f4', K: INK, O: ORANGE, Y: GOLD }

/** a board-game box */
function gameBox(x, cx, cy, k) {
  card(x, cx, cy, 300, 220, k, { bg: RED, rot: -0.05 }, () => {
    x.fillStyle = GOLD; x.fillRect(-130, -90, 260, 60)
    txt(x, 'GAME NIGHT', 0, -58, { size: 32, font: MONO, weight: 700 })
    for (let i = 0; i < 4; i++) { x.fillStyle = [MINT, SKYB, PINK, CREAM][i]; x.fillRect(-110 + i * 60, 0, 44, 44); x.fillStyle = INK; x.fillRect(-94 + i * 60, 16, 12, 12) }
  })
}
/** a handwritten recipe card */
function recipe(x, cx, cy, k, lt) {
  card(x, cx, cy, 320, 260, k, { bg: CREAM, rot: 0.04 }, () => {
    txt(x, 'Grandma’s Soup', 0, -90, { size: 32, color: '#7a2a48' })
    ;['a pinch of this', 'a lot of that', 'love (heaps)'].forEach((s, i) => { if (lt > 0.6 + i * 0.25) txt(x, s, -130, -26 + i * 50, { size: 28, align: 'left', weight: 700 }) })
  })
}
/** place cards on a table edge */
function placeCards(x, cx, cy, k, lt) {
  const names = ['MOM', 'DAD', 'NAN', 'YOU']
  for (let i = 0; i < 4; i++) {
    const s = ease.outBack(prog(lt, 0.3 + i * 0.2, 0.6 + i * 0.2))
    if (s <= 0.01) continue
    card(x, cx - 165 + i * 110, cy + (i % 2) * 40, 100, 70, s, { bg: '#ffffff', rot: (i - 1.5) * 0.04 }, () => { txt(x, names[i], 0, 2, { size: 24, font: MONO, weight: 700 }) })
  }
}
/** a balance scale with peas vs carrots */
function scale_(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const tilt = 0.12 * Math.sin(t * 2) * Math.exp(-(t % 4)) * 0
  x.fillStyle = INK; x.fillRect(-10, -150, 20, 260); x.fillRect(-90, 100, 180, 24)
  x.fillStyle = GOLD; x.fillRect(-6, -146, 12, 252); x.fillRect(-86, 104, 172, 16)
  x.save(); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 14); x.fillStyle = GOLD; x.fillRect(-166, -147, 332, 8)
  for (const d of [-1, 1]) {
    x.fillStyle = INK; x.fillRect(d * 150 - 3, -140, 6, 80)
    x.fillStyle = INK; x.beginPath(); x.ellipse(d * 150, -56, 76, 22, 0, 0, Math.PI); x.fill()
    x.fillStyle = GREY; x.beginPath(); x.ellipse(d * 150, -58, 70, 16, 0, 0, Math.PI); x.fill()
    for (let i = 0; i < 5; i++) { x.fillStyle = d < 0 ? GREEN : ORANGE; if (d < 0) { x.beginPath(); x.arc(d * 150 - 40 + i * 20, -70 - (i % 2) * 10, 10, 0, Math.PI * 2); x.fill() } else x.fillRect(d * 150 - 44 + i * 18, -96 + (i % 2) * 8, 12, 34) }
  }
  x.restore(); x.restore()
}
/** a small wooden table that stops wobbling at `fix` */
function table(x, t, cx, cy, k, fix) {
  if (k <= 0.01) return
  const wob = fix ? 0 : 0.06 * Math.sin(t * 14)
  x.save(); x.translate(cx, cy); x.rotate(wob); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -30, 380, 40); x.fillRect(-170, 0, 36, 150); x.fillRect(134, 0, 36, fix ? 150 : 128)
  x.fillStyle = WOOD; x.fillRect(-184, -24, 368, 28); x.fillRect(-164, 4, 24, 140); x.fillRect(140, 4, 24, fix ? 140 : 118)
  if (fix) { x.fillStyle = GOLD; x.fillRect(132, 140, 40, 14) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'The energy. | *And a game for after.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      gameBox(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'WINNER: EVERYONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'The best dish. | *Made from scratch.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DISH, DISH_C, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 690, 'SIX HOURS. WORTH IT.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'The stories. | *Everyone\'s laughing.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'wait, it gets better', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: GOLD, tail: 'bl' })
      label(x, 720, 900, 'HA!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: PINK, rot: -0.1 })
      label(x, 880, 980, 'HAHA', pop01(t, P.t0 + 1.25, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.08 })
      label(x, 760, 1080, 'STOP IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Grandma\'s recipe. | *Kept perfectly.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) { recipe(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'leo', cap: 'The compliments. | *Everyone glows.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'love the haircut!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
      bubble(x, 800, 860, 'you look so happy', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
      bubble(x, 780, 1040, 'best aunt ever', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, col: GOLD, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 7, 220, 0.4)
    } },
  { sign: 'virgo', cap: 'Name cards. | *Nobody sits wrong.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 1000, 420, 50, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: WOOD, rot: 0 })
      placeCards(x, 790, 900, 1, lt)
      label(x, 790, 680, 'SEATING: SOLVED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'The peace. | *Even the peas.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      scale_(x, 790, 930, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 640, 'NO ARGUMENTS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'The real talk. | *After dessert.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 760, 'how are you, really?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: '#ffb3d9', tail: 'bl' })
      bubble(x, 800, 960, '…thank you for asking', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 30, col: LAV, tail: 'br' })
    } },
  { sign: 'sagittarius', cap: 'A surprise guest. | *Now a new friend.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2.2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 920, 230 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 15, glyph: false })
      label(x, 800, 680, 'PLUS ONE!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Arrives early. | *Fixes the wobbly table.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      table(x, t, 790, 930, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.2)
      label(x, 790, 690, lt > 1.2 ? 'FIXED.' : 'wobble wobble', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: lt > 1.2 ? MINT : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'The weirdest topic. | *Best talk all year.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'do fish get thirsty?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      label(x, 790, 960, 'THREE HOURS LATER…', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Happy tears. | *Right at hello.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you made it!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      hearts(x, t, 790, 1000, P.t0 + 0.8, { n: 6, life: 2.0, spread: 220, cell: 8, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0284', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Each sign at | *family dinner.*',
  cameos: CAMEOS,
  group: { cap: 'One table. | *Twelve signs.*' },
  lesson: { text: 'Everyone brings | *something good.*', chip: 'STATUS: FULL' },
  last: { text: 'Seconds? | *Always.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
