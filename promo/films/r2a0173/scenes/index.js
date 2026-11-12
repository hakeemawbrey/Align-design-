// r2a0173: star_advice, ADVICE SOLO, "Leo, your warmth | *is the real crown.*" (~49 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine Leo truths, each with a warm reframe and one light visual gag. Ending: callback.
//   0.0–3.6    "Leo, your warmth | *is the real crown.*"
//   3.6–37.8   nine cards: you hype everyone (let them hype you back) · you need a little applause (human, not vain)
//              · you light up the room (recharge too) · you remember everyone's birthday (yours matters)
//              · bad hair day, still the sunshine · someone else shines (room on the stage) · big gifts (your time is best)
//              · pride makes sorry hard (saying it is brave) · your laugh is loud (the best sound)
//  37.8        "Warm heart. | *Real royalty.*"
//  41.2        CALLBACK: "And your birthday? | *Everyone came.*"  The cake is back, ringed by friends.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'

// ── props
const MEGA = ['......KK', '....KKOK', 'KKKKOOOK', 'KWWOOOOK', 'KWWOOOOK', 'KKKKOOOK', '..K.KKOK', '..K...KK']
const HANDS = ['.K.K.K.', 'KYKYKYK', 'KYYYYYK', 'KYYYYYK', '.KYYYK.', '..KYK..']
function battery(x, cx, cy, k, lvl) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -170, 180, 320); x.fillRect(-36, -196, 72, 30)
  x.fillStyle = '#2a2350'; x.fillRect(-80, -160, 160, 300)
  const h = 280 * lvl, col = lvl < 0.25 ? RED : lvl < 0.6 ? GOLD : MINT
  x.fillStyle = col; x.fillRect(-70, 130 - h, 140, h)
  x.restore()
}
function cake(x, t, cx, cy, k, lit = true) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 0, 340, 150); x.fillRect(-130, -110, 260, 116)
  x.fillStyle = '#ffd0dc'; x.fillRect(-162, 8, 324, 134); x.fillStyle = '#fff4e2'; x.fillRect(-122, -102, 244, 104)
  x.fillStyle = PINK; for (let i = 0; i < 8; i++) { x.beginPath(); x.arc(-140 + i * 40, 10, 16, 0, Math.PI); x.fill() }
  x.fillStyle = GOLD; for (let i = 0; i < 6; i++) x.fillRect(-100 + i * 40 - 6, 60, 12, 12)
  for (let i = 0; i < 4; i++) {
    const px = -75 + i * 50
    x.fillStyle = INK; x.fillRect(px - 9, -170, 18, 64); x.fillStyle = [SKYB, MINT, LAV, ORANGE][i]; x.fillRect(px - 5, -166, 10, 58)
    if (lit) { const f = 1 + 0.15 * Math.sin(t * 12 + i); x.fillStyle = '#ffd23a'; x.beginPath(); x.ellipse(px, -188, 9 * f, 16 * f, 0, 0, 7); x.fill(); x.fillStyle = '#fff1b0'; x.beginPath(); x.ellipse(px, -184, 4, 8, 0, 0, 7); x.fill() }
  }
  x.restore()
}
function sun(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(t * 0.4); x.scale(k, k)
  x.fillStyle = ORANGE; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.save(); x.rotate(a); x.fillRect(110, -14, 60, 28); x.restore() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 112, 0, 7); x.fill(); x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(0, 0, 102, 0, 7); x.fill()
  x.restore()
}
function stage(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.fillRect(cx - 400, cy, 800, 60); x.fillStyle = '#a8742a'; x.fillRect(cx - 392, cy + 6, 784, 46)
  x.fillStyle = '#7a4a1a'; for (let i = 0; i < 8; i++) x.fillRect(cx - 392 + i * 100, cy + 6, 4, 46)
  x.restore()
}
function gift(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -100, 320, 250); x.fillStyle = '#7d5ad8'; x.fillRect(-152, -92, 304, 234)
  x.fillStyle = GOLD; x.fillRect(-20, -92, 40, 234); x.fillRect(-152, 10, 304, 34)
  const lift = 120 * ease.outBack(clamp((lt - 1.0) / 0.5))
  x.fillStyle = INK; x.fillRect(-176, -140 - lift, 352, 52); x.fillStyle = '#9a7af0'; x.fillRect(-168, -132 - lift, 336, 36)
  x.fillStyle = GOLD; x.fillRect(-20, -132 - lift, 40, 36)
  x.beginPath(); x.ellipse(-46, -152 - lift, 40, 22, -0.4, 0, 7); x.ellipse(46, -152 - lift, 40, 22, 0.4, 0, 7); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'leo', cap: 'You hype everyone up. | Let them *hype you back.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, MEGA, { K: INK, O: ORANGE, W: BONE }, 570, 700, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 820, 940, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.8] })
      bubble(x, 820, 680, 'YOU’RE AMAZING TOO!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 30, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'You love a little applause. | That’s *human,* not vain.', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) label(x, 700 + i * 90, 720 + i * 110, 'CLAP!', pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.4), { size: 44, bg: [GOLD, PINK, MINT][i], rot: (i - 1) * 0.12 })
      label(x, 790, 1100, 'APPLAUSE: EARNED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'You light up every room. | *Recharge* yours too.', mood: lt => lt > 1.5 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const lvl = lt < 1.2 ? lerp(0.5, 0.12, clamp(lt / 1.2)) : lerp(0.12, 1, clamp((lt - 1.2) / 1.0))
      battery(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lvl)
      label(x, 800, 620, lt > 1.2 ? 'NAP: TAKEN ✓' : 'LOW BATTERY', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: lt > 1.2 ? MINT : RED, color: lt > 1.2 ? INK : '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'You never forget a birthday. | *Yours matters too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cake(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.9)
      label(x, 800, 1130, 'MAKE A WISH, LEO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Bad hair day? | Still *the sunshine.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      sun(x, t, 800, 840, pop01(t, P.t0 + 0.4, 0.4, 1.8))
      label(x, 800, 1110, 'STILL GLOWING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Someone else shines? | There’s *room on the stage.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170, y: -20 }, hops: [1.3],
    back(x, t, lt, P) { stage(x, 540, 1020, pop01(t, P.t0 + 0.1, 0.35, 1.6)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 760, 860, 230 * k, { mood: 'sparkle', look: [-1, 0], seed: 27, glyph: false, hops: [P.t0 + 1.7] })
      label(x, 560, 640, 'DUET!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: PINK, rot: -0.05 })
      sparkles(x, t, 560, 860, P.t0 + 1.4, 8, 260, 0.4)
    } },
  { sign: 'leo', cap: 'You give the biggest gifts. | *Your time* is the best one.', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      gift(x, 800, 920, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      if (lt > 1.1) label(x, 800, 860, 'MOVIE NIGHT?', pop01(t, P.t0 + 1.1 * 1.29, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Pride makes “sorry” hard. | Saying it is *brave.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 760, 740, 'I’m… sorry.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 820, 980, 170 * k, { mood: 'heart', look: [-1, 0], seed: 29, glyph: false })
      label(x, 600, 1140, 'BRAVEST THING ALL DAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Your laugh is loud. | It’s *the best sound.*', mood: 'happy', look: [1, 0], star: { x: -190 }, hops: [0.5, 1.0, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      notes(x, t, 720, 760, { n: 5, cell: 9, col: ORANGE, seed: 4 })
      label(x, 800, 640, 'HA HA HA HA!', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: BONE, rot: 0.05 })
      label(x, 800, 1100, 'EVERYONE’S LAUGHING NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0173', key: 'C', accent: ORANGE, solo: 'leo', ending: 'callback',
  title: 'Leo, your warmth | *is the real crown.*',
  cameos: CAMEOS,
  group: { cap: 'Warm heart. | *Real royalty.*', mood: 'heart' },
  last: {
    text: 'And your birthday? | *Everyone came.*',
    draw(x, t, lt) {
      const t0 = t - lt
      cake(x, t, 540, 1040, pop01(t, t0 + 0.3, 0.45, 1.8))
      const ring = ['aries', 'taurus', 'gemini', 'cancer', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
      ring.forEach((id, i) => {
        const k = pop01(t, t0 + 0.8 + i * 0.1, 0.35, 2)
        if (k <= 0.01) return
        const r = i < 6 ? 0 : 1, c = r ? i - 6 : i, px = r ? 260 + c * 140 : 190 + c * 140, py = 1290 + r * 130
        signChar(x, t, id, px, py, 120 * k, { mood: 'heart', seed: 40 + i, glyph: false, glow: 0.7, tears: id === 'pisces' ? 2 : 0, hops: [t0 + 1.8 + i * 0.05] })
      })
      const s = pop01(t, t0 + 0.5, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'leo', 540, 700, 190 * s, { mood: 'heart', seed: 44, hops: [t0 + 1.6] })
      hearts(x, t, 540, 760, t0 + 1.6, { n: 8, life: 1.6, spread: 400, cell: 8, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
