// r2a0706: star_advice, ADVICE SOLO (libra), "Libra, celebrate | *the small wins.*" (signs3kit social cut, lofi · D).
// One sign the whole way: nine small, very Libra wins, each a gentle truth + a warm reframe with one light gag.
// Ending: callback (the dinner decision from card 1 comes back as dessert).
//   picked dinner in one try · said "no" nicely · answered the text today · made the bed, perfectly even
//   · wore the bold outfit · the plant is still alive · spoke up in the meeting · chose the playlist · a scale of
//   little gold stars tips: small wins add up
//   last "Next small win? | *Dessert, first try.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, phone, bits, swapLabel, confetti, friend, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'
import { drawPixelStar } from '../../sky.js'

const ACC = '#ff8fd0', S = 'libra', ST = { x: -190 }

/** a balance scale; tip > 0 lowers the left pan; n gold stars stacked in the left pan */
function balance(x, t, cx, cy, k, tip, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 300); x.fillRect(-90, 140, 180, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 288); x.fillRect(-84, 146, 168, 14)
  const a = -0.28 * tip
  x.save(); x.translate(0, -140); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-150, -10, 300, 20); x.fillStyle = GOLD; x.fillRect(-146, -6, 292, 12)
  x.restore()
  for (const side of [-1, 1]) {
    const px = side * 140 * Math.cos(a), py = -140 + side * 140 * Math.sin(a)
    x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 60, py + 90); x.moveTo(px, py); x.lineTo(px + 60, py + 90); x.stroke()
    x.fillStyle = INK; x.fillRect(px - 78, py + 86, 156, 24); x.fillStyle = '#ffd98a'; x.fillRect(px - 72, py + 90, 144, 14)
    if (side < 0) for (let i = 0; i < n; i++) bits(x, 'STAR5', px - 44 + (i % 3) * 44, py + 66 - Math.floor(i / 3) * 34, 5)
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Picked dinner in one try? | *That’s a win.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: lt => lt > 1.2 ? [0, 0] : [Math.floor(lt * 4) % 2 ? 1 : -1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      swapLabel(x, 800, 760, lt, 1.1, 'PASTA? SOUP? PASTA?', 'DECIDED ✓', { size: 32, fromBg: STEEL, toBg: MINT })
      L(x, 800, 1020, 'TIME TAKEN: ONE TRY', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
      confetti(x, t, 800, 760, P.t0 + 1.4)
    } },
  { sign: S, cap: 'Said “no” nicely? | *Count it.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'no, thank you!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 900, 'WORLD: STILL FINE', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, -0.04, 30)
      L(x, 800, 1060, 'BOUNDARY: CUTE', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.05, 32)
    } },
  { sign: S, cap: 'Answered the text today? | *Gold star.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: PINK, size: 24, lines: [
        ['dinner fri?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), false], ['YES. love u', MINT, pop01(t, P.t0 + 1.0, 0.25, 2), true]] })
      const k = pop01(t, P.t0 + 1.4, 0.35, 2.4)
      if (k > 0.01) drawPixelStar(x, 930, 640, 70 * k, 2, GOLD)
      sparkles(x, t, 930, 640, P.t0 + 1.45, 6, 110, 0.4)
    } },
  { sign: S, cap: 'Made the bed? | *Perfectly even. Win.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.0 ? 0 : 0.12 * Math.sin(t * 5) })
      bits(x, 'PILLOW', 720, 900, 10 * pop01(t, P.t0 + 0.4, 0.3, 2)); bits(x, 'PILLOW', 880, 900, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 720, lt > 1.0 ? 'SYMMETRY: 10/10' : 'ADJUSTING…', 1, lt > 1.0 ? MINT : STEEL, 0.04, 32)
    } },
  { sign: S, cap: 'Wore the bold outfit? | *Iconic, honestly.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      x.save(); const k = pop01(t, P.t0 + 0.2, 0.3, 2); x.translate(810, 880); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-120, -190, 240, 380); x.fillStyle = '#c9d6ff'; x.fillRect(-108, -178, 216, 356)
      x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-90, -150, 26, 120); x.restore()
      if (k > 0.6) signChar(x, t, S, 810, 900, 170, { mood: 'wink', seed: 44, glyph: false, glow: 0.4, alpha: 0.8 })
      L(x, 810, 640, 'MIRROR SAYS: YES', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.05, 30)
      hearts(x, t, 810, 900, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 8 })
    } },
  { sign: S, cap: 'The plant’s still alive? | *You did that.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = lerp(10, 22, ease.outBack ? ease.outCubic(clamp((lt - 0.3) / 1.0)) : clamp((lt - 0.3) / 1.0))
      bits(x, 'FLOWER', 800, 1020 - g * 6, g * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'DAY 40: THRIVING', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.05, 32)
      sparkles(x, t, 800, 880, P.t0 + 1.3, 6, 150, 0.6)
    } },
  { sign: S, cap: 'Spoke up in the meeting? | *Brave and right.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 1010, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'i actually think…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 870, 'EVERYONE: “GOOD POINT”', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 26)
    } },
  { sign: S, cap: 'Picked the playlist yourself? | *Main character.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      notes(x, t, 800, 1040, { n: 4, cell: 16, col: ACC, seed: 3 })
      L(x, 800, 700, 'NOW PLAYING: YOUR PICK', pop01(t, P.t0 + 0.3, 0.3, 2.2), LAV, 0.04, 26)
      L(x, 800, 1090, 'NOBODY SKIPPED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Small wins | *add up.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(8, Math.floor(clamp((lt - 0.3) / 1.2) * 9))
      balance(x, t, 770, 920, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(clamp(n / 8)), n)
      L(x, 770, 1120, 'WINS: TIPPING IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2a0706', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Libra, celebrate | *the small wins.*',
  cameos: CAMEOS,
  group: { cap: 'Tiny wins. | *Still wins.*', mood: 'sparkle' },
  last: {
    text: 'Next small win? | *Dessert, first try.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, S, 540, 1130, 300 * k, { mood: lt > 1.6 ? 'sparkle' : 'neutral', look: lt > 1.6 ? [0, 0] : [Math.floor(lt * 4) % 2 ? 1 : -1, 0], seed: 40, hops: [t - lt + 1.7] })
      swapLabel(x, 540, 1400, lt, 1.5, 'CAKE? PIE? CAKE?', 'CAKE ✓', { size: 44, fromBg: STEEL, toBg: MINT })
      confetti(x, t, 540, 1300, t - lt + 1.8)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
