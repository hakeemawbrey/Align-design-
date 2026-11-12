// r2a0765: star_advice, ADVICE SOLO (virgo), "Virgo, it's okay | to want more." (topic: "Virgo, you're allowed to want more", reworded to fit two lines) (signs3kit social cut, lofi · G).
// Ending: callback (card 1's big mug, finally ordered and enjoyed).
//   ordered the small one (get the big one) · practical wish list (add something fun) · settling for "fine" (aim for
//   "wow") · want a bigger role (raise your hand) · fixing everyone (your turn first) · wanting more isn't greedy
//   (it's growing) · apologised for asking (ask, no sorry) · a dream board, colour-coded · effort that matches yours
//   group "More is allowed. | *Ask for it.*"   last "The big one? | *Ordered. Enjoyed.*"
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, steam, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'virgo', ACC = '#7dffb0', ST = { x: -170 }
const HAND = ['..W.W.W..', '.WW.W.WW.', '.WWWWWWW.', 'WWWWWWWW.', 'WWWWWWWW.', '.WWWWWWW.', '..WWWWW..', '...WWW...', '...WWW...']
const HAND_C = { W: '#ffd9a0' }

/** a ladder with a gold star on the top rung */
function ladder(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-84, -200, 26, 400); x.fillRect(58, -200, 26, 400)
  x.fillStyle = WOOD; x.fillRect(-80, -196, 18, 392); x.fillRect(62, -196, 18, 392)
  for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(-62, -160 + i * 80, 124, 20); x.fillStyle = '#c98f5a'; x.fillRect(-62, -156 + i * 80, 124, 12) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Ordered the small one? | *Get the big one.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MUG', 680, 1040, 9 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MUG', 860, 960, 22 * pop01(t, P.t0 + 0.9, 0.35, 2))
      L(x, 800, 660, 'SIZE: YOU DESERVE IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.05, 28)
    } },
  { sign: S, cap: 'Wish list all practical? | *Add something fun.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 310, h: 360, head: 'WISH LIST', headBg: ACC, headInk: INK, lines: ['socks', 'tape', 'better pens', ['A PONY ♡', '#c0392b']], size: 36, align: 'left', progress: clamp((lt - 0.3) / 1.4) })
      sparkles(x, t, 790, 960, P.t0 + 1.8, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Settling for “fine”? | *Aim for “wow.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      swapLabel(x, 790, 860, lt, 1.0, 'IT’S FINE.', 'WOW ✦', { size: 54, fromBg: STEEL, toBg: GOLD })
      sparkles(x, t, 790, 860, P.t0 + 1.5, 8, 190, 0.2)
    } },
  { sign: S, cap: 'Want a bigger role? | *Raise your hand.*', mood: lt => lt > 1.1 ? 'happy' : 'squint', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      const up = ease.outBack ? ease.outBack(prog(lt, 0.4, 0.9)) : ease.outCubic(prog(lt, 0.4, 0.9))
      drawBits(x, HAND, HAND_C, F.x + 160, lerp(F.cy + 40, F.cy - 160, up), 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 760, 'me! i’ll lead.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1060, 'NEW ROLE: YOURS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Fixing everyone else? | *Your turn first.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const moved = lt > 1.2
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 340, head: 'TO HELP', headBg: LAV, headInk: INK, lines: moved ? [['1. ME ♡', '#c0392b'], '2. mom', '3. friend', '4. friend'] : ['1. mom', '2. friend', '3. friend', ['4. me?', '#b9b0a0']], size: 34, align: 'left' })
      L(x, 790, 1110, 'REORDERED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Wanting more isn’t greedy. | *It’s growing.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      ladder(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      const c = ease.inOutCubic(prog(lt, 0.6, 1.6))
      signChar(x, t, S, 800, lerp(1030, 720, c), 110 * pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'happy', seed: 31, glyph: false })
      L(x, 800, 620, 'NEXT STEP ✦', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.05, 34)
    } },
  { sign: S, cap: 'Said sorry for asking? | *Just ask.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, lt < 1.1 ? 'sorry, could i…' : 'could i?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 1000, 'SORRY: DELETED', pop01(t, P.t0 + 1.1, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: S, cap: 'Make a dream board. | *Colour-code it.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#c98f5a'; x.fillRect(-160, -140, 320, 280)
        const C = [PINK, MINT, SKYB, GOLD, LAV, '#ff9a4a']
        const n = Math.floor(clamp((lt - 0.4) / 1.2) * 6)
        for (let i = 0; i < n; i++) { const c = i % 3, r = Math.floor(i / 3); x.fillStyle = INK; x.fillRect(-140 + c * 96, -120 + r * 128, 88, 112); x.fillStyle = C[i]; x.fillRect(-136 + c * 96, -116 + r * 128, 80, 104); x.fillStyle = RED; x.fillRect(-100 + c * 96, -124 + r * 128, 10, 10) }
        x.restore()
      }
      L(x, 800, 1100, 'DREAMS: SORTED', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'You deserve effort | *that matches yours.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), tilt = lerp(0.25, 0, ease.inOutCubic(prog(lt, 0.6, 1.3)))
      if (k > 0.01) {   // a balance scale levelling out, a heart on each side
        x.save(); x.translate(800, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-10, -120, 20, 240); x.fillRect(-80, 110, 160, 20)
        x.rotate(tilt); x.fillRect(-170, -126, 340, 14)
        x.restore()
        drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK, W: '#fff' }, 800 - 150 * k, 760 - 150 * Math.sin(tilt) * k, 12 * k)
        drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 800 + 150 * k, 760 + 150 * Math.sin(tilt) * k, 12 * k)
      }
      L(x, 800, 1090, 'MATCH: EQUAL EFFORT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0765', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Virgo, it’s okay | *to want more.*',
  cameos: CAMEOS,
  group: { cap: 'More is allowed. | *Ask for it.*', mood: 'sparkle' },
  last: {
    text: 'The big one? | *Ordered. Enjoyed.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, S, 400, 1100, 300 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.4] })
      bits(x, 'MUG', 730, 1140, 26 * pop01(t, t - lt + 0.8, 0.35, 2))
      if (lt > 1.0) steam(x, t, 710, 1040, { n: 3, h: 140 })
      label(x, 730, 1320, 'SIZE: LARGE ♡', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
