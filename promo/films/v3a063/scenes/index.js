// v3a063: ADVICE ROLL CALL, "Each sign's | love language." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, how each one says "I love you" without saying it. Ending: callback.
//   0.0–3.6    "Each sign’s | *love language.*"
//   3.6–49.2   ♈ racing you, then letting you win · ♉ feeding you (the plates keep coming) · ♊ memes at 3 a.m. (47 new)
//              · ♋ remembers your mom's birthday (the cake) · ♌ shows you off (a gallery wall, MY PERSON)
//              · ♍ books your appointment · ♎ matching scarves · ♏ remembers everything you said (YOU, VOL. 3)
//              · ♐ teaches you to skateboard · ♑ quietly pays the bill (PAID ✓) · ♒ sends weird facts (#212)
//              · ♓ a mixtape for every feeling
//  49.2        "Twelve ways | to *say it.*"
//  52.6        callback: "Taurus is | *still feeding you.*" the plate stack is back, taller.
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, stamp, phone, calendar, frame, bits, ORANGE, RED, TEAL, CREAM, GREY, BROWN, clamp, prog, ease, lerp } from './props.js'

// a stack of plates with little dishes on top, n of them
function plates(x, t, cx, base, k, n) {
  if (k <= 0.01) return
  const FOOD = ['#e8a24a', '#5fd068', '#ff6b5a', GOLD, '#c98f6a', PINK, '#8fe3ff']
  for (let i = 0; i < n; i++) {
    const y = base - i * 36, w = 120 * k
    x.fillStyle = INK; x.fillRect(cx - w - 6, y - 6, 2 * w + 12, 26 * k)
    x.fillStyle = CREAM; x.fillRect(cx - w, y, 2 * w, 14 * k)
    x.fillStyle = FOOD[i % FOOD.length]; x.fillRect(cx - w * 0.5, y - 14 * k, w, 14 * k)
  }
}
// a cosy knitted scarf around a star (drawn at the star frame)
function scarf(x, F, k, col) {
  if (k <= 0.01) return
  x.save(); x.translate(F.x, F.cy + F.S * 0.3); x.scale(k * F.S / 300, k * F.S / 300)
  x.fillStyle = INK; x.fillRect(-96, -22, 192, 44); x.fillRect(30, 10, 44, 110)
  x.fillStyle = col; x.fillRect(-90, -16, 180, 32); x.fillRect(36, 16, 32, 98)
  x.fillStyle = CREAM; for (let i = 0; i < 6; i++) x.fillRect(-80 + i * 30, -8, 12, 16); x.fillRect(36, 70, 32, 10)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Racing you. | *Letting you win.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? INK : CREAM; x.fillRect(840, 700 + i * 50, 30, 50); x.fillStyle = i % 2 ? CREAM : INK; x.fillRect(870, 700 + i * 50, 30, 50) } x.restore() }
      const g = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (g > 0.01) signChar(x, t, 'libra', lerp(620, 900, ease.inOutCubic(prog(lt, 0.8, 1.6))), 1000, 150 * g, { mood: lt > 1.6 ? 'sparkle' : 'happy', seed: 19, glyph: false, hops: [P.t0 + 2.1] })
      label(x, 760, 640, 'OOPS, I “TRIPPED”', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Feeding you. | *Constantly.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      plates(x, t, 790, 1090, pop01(t, P.t0 + 0.2, 0.3, 2), 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 8))
      bubble(x, 600, 620, 'one more bite?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Memes | *at 3 a.m.*', mood: lt => lt > 0.9 ? 'wink' : 'sparkle', star: { x: -190 }, hops: [1.0],
    front(x, t, lt, P) {
      const n = 3 + Math.floor(clamp((lt - 0.4) / 1.4) * 44)
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { time: '3:02', head: 'GEMINI:', body: ['LOOK AT', 'THIS ONE'], bodyBg: GOLD, size: 32, foot: `(${n} new)` })
      label(x, 790, 1100, 'TRANSLATION: I ♥ U', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Remembers | *your mom’s birthday.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bits(x, 'CAKE', 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 720, 'HAPPY BDAY, YOUR MOM', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'you forgot.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 6, 150, 0.2)
    } },
  { sign: 'leo', cap: 'Shows you off. | *Everywhere.*', mood: 'sparkle', star: { x: -190 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.2, 0.6)); if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(760, 470); x.lineTo(820, 470); x.lineTo(960, 1080); x.lineTo(620, 1080); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      frame(x, 790, 800, pop01(t, P.t0 + 0.3, 0.3, 2), x => { x.fillStyle = '#ffe7a8'; x.fillRect(-116, -91, 232, 182); signChar(x, t, 'virgo', 0, 0, 140, { mood: 'happy', seed: 61, glyph: false, glow: 0.4 }) }, { caption: 'MY PERSON' })
      label(x, 790, 1060, 'ON DISPLAY: 24/7', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Books | *your appointment.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 230, title: 'APPOINTMENT', titleBg: MINT, lines: ['TUESDAY', '9:30 ✓'], size: 44, rot: 0.04 })
      bubble(x, 790, 1060, 'you’re welcome.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 420, 600, 'it was | bugging me.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 30, col: LAV, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Matching | *outfits.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P, F) {
      scarf(x, F, pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK)
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { const G = signChar(x, t, 'aquarius', 790, 960, 220 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 18, glyph: false }); scarf(x, G, pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK) }
      label(x, 790, 700, 'ON PURPOSE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Remembers | *everything you said.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bits(x, 'BOOK', 700, 870, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      bits(x, 'BOOK', 820, 860, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.06 })
      label(x, 780, 700, 'YOU: VOL. 1–3', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 780, 1080, 'you like pears now?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Teaches you | *something new.*', mood: 'sparkle', star: { x: -190 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), roll = ease.inOutCubic(prog(lt, 0.7, 1.7))
      if (k > 0.01) signChar(x, t, 'capricorn', lerp(640, 840, roll), 960, 170 * k, { mood: lt > 1.6 ? 'sparkle' : 'wide', seed: 21, glyph: false })
      bits(x, 'SKATE', lerp(640, 840, roll), 1060, 14 * k)
      label(x, 790, 680, 'LESSON 1: SKATEBOARD', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 620, 'you got it!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Quietly | *pays the bill.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      note(x, 790, 840, k, { w: 260, h: 320, title: 'BILL', titleBg: GREY, lines: ['pasta', 'pasta', 'cake', '———'], size: 34, rot: 0.05 })
      stamp(x, 790, 900, pop01(t, P.t0 + 1.1, 0.3, 2.6), 'PAID ✓', { col: TEAL, size: 48 })
      label(x, 790, 640, 'WHEN?? HOW??', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Sends you | *weird facts.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { time: 'FACT', head: 'AQUARIUS:', body: ['snails have', 'teeth. ♥'], bodyBg: SKYB, size: 32, foot: 'fact #212 today' })
      bits(x, 'SNAIL', 560, 1100, 10 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
    } },
  { sign: 'pisces', cap: 'A playlist | *for every feeling.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: 2, star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CASSETTE', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      label(x, 800, 700, 'FOR YOU · VOL. 9', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1040, 'TRACK 1: ♥ ♥ ♥', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a063', key: 'F', accent: PINK, ending: 'callback',
  title: 'Each sign’s | *love language.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | to *say it.*' },
  last: {
    text: 'Taurus is | *still feeding you.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 360, 1150, 280 * k, { mood: 'heart', look: [1, 0], seed: 31, hops: [t - lt + 1.2] })
      plates(x, t, 700, 1250, k, 2 + Math.floor(clamp((lt - 0.6) / 2.0) * 10))
      hearts(x, t, 540, 1250, t - lt + 0.6, { n: 6, life: 2.2, spread: 600, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
