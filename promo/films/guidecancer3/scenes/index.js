// guidecancer3 (20 s vertical Align ad, Star Talk "Your Star Guide", note 3 / 3: try this week) · story 0–15.6, then the end card.
//   0.00–2.30  "Try this week, *Cancer*."  ♋ your star is shut in a pixel crab shell, eyes peeking out of the crack, the
//              lantern's glow leaking through. A mint friend star looks on.
//   2.50–6.50  YOUR STAR: "don't wait for them to guess."  The friend guesses in thought bubbles: "snacks?" "space?"
//              "a nap?", each one wrong (a buzzer X). Chip: the Moon cycles through its phases in about a month.
//   6.60–11.55 YOUR STAR: "ask for the hug. out loud."  The shell cracks open, two little arms come out, "hug, please?",
//              and the friend hops straight in.
//   11.62–15.6 card flip · "Ask for what you *need*."  The open shell, the hug, hearts: frame 0, opened.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { guideFilm, bubble } from './guidefilm.js'
import { INK, drawBits, pop01 } from './kit.js'

const T = {
  hookOut: [2.0, 2.3], open: 2.3, l1: 2.5, guesses: [3.6, 4.55, 5.5], fact: [6.1, 4.2],
  l2: 6.6, crack: 8.35, arms: 8.8, ask: 9.1, hop: 9.9, hug: 10.35, close: 11.55, cut: 11.62, last: 11.7, lastLand: 12.25, out: [15.1, 15.5],
}
const HERO = { x: 380, y: 1030, size: 300 }
const PAL = { x: 830, y: 1100, size: 180, c: '#7fe0b0' }
const CRACK = HERO.y + 26
const GUESS = ['snacks?', 'space?', 'a nap?']
const XM = ['XX...XX', '.XX.XX.', '..XXX..', '.XX.XX.', 'XX...XX']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const C = 12, RX = 250, RY = 230

const openK = t => easeOutBack(prog(t, T.crack, T.crack + 0.5), 1.6)
const gapAt = t => lerp(54, 70, clamp(prog(t, T.crack - 0.3, T.crack)))

/** one pixel half of the crab shell. upper: the dome (ridged); else the bowl. (cx, cy) = the middle of the flat edge. */
function shellHalf(x, cx, cy, upper, rot = 0, hinge = -RX) {
  x.save(); x.translate(cx + hinge, cy); x.rotate(rot); x.translate(-hinge, 0)
  const nI = Math.ceil(RX / C), nJ = Math.ceil(RY / C)
  for (let j = 0; j < nJ; j++) for (let i = -nI; i < nI; i++) {
    const u = (i + 0.5) * C / RX, v = (j + 0.5) * C / (upper ? RY : RY * 0.62), d = u * u + v * v
    if (d > 1.12) continue
    let col = d > 0.9 || j === 0 ? INK : upper ? ((i + 40) % 4 === 0 ? '#d9482f' : '#ff7a59') : '#e85b3d'
    if (upper && d < 0.9 && j > 0 && u < -0.1 && v > 0.45 && v < 0.7 && (i + 40) % 4) col = '#ffb08f'
    if (!upper && d < 0.9 && j === 1) col = '#ffb08f'
    x.fillStyle = col
    x.fillRect(i * C, upper ? -(j + 1) * C : j * C, C + 0.5, C + 0.5)
  }
  x.restore()
}

/** little pixel arms out of the shell: wide open (k = 0) → wrapped round the friend (k = 1) */
function arms(x, r, t, color, out, wrap) {
  if (out <= 0) return
  for (const side of [-1, 1]) {
    const len = 7 * out, ang = lerp(-0.7, wrap > 0 && side > 0 ? 0.55 : -0.25, wrap) + Math.sin(t * 6 + side) * 0.06 * (1 - wrap)
    x.save(); x.translate(r.x + side * 120, r.y + 30); x.scale(side, 1); x.rotate(ang)
    const n = Math.round(len), A = 2.2 * C
    x.fillStyle = INK; x.fillRect(-3, -A / 2 - 3, n * C + 6, A + 6); if (n > 2) x.fillRect(n * C - C, -A / 2 - C - 3, 3 * C + 6, A + 2 * C + 6)
    x.fillStyle = color; x.fillRect(0, -A / 2, n * C, A); if (n > 2) x.fillRect(n * C - C + 3, -A / 2 - C, 3 * C, A + 2 * C)
    x.fillStyle = 'rgba(255,255,255,0.45)'; x.fillRect(0, -A / 2, n * C, C * 0.6)
    x.restore()
  }
}

function mood(t) {
  if (t < T.guesses[0]) return { mood: 'neutral', look: [1, 0], blink: t > 1 }
  if (t < T.l2) return { mood: 'squint', look: [1, -1] }
  if (t < T.crack) return { mood: 'neutral', look: [0, 0] }
  if (t < T.hug) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'happy' }
}

const palX = t => lerp(PAL.x, HERO.x + 215, ease.inOutQuad(prog(t, T.hop, T.hug)))
const palY = t => PAL.y - Math.sin(Math.PI * prog(t, T.hop, T.hug)) * 160 - (t > T.hug ? 70 : 0) * clamp(prog(t, T.hug, T.hug + 0.2))

const film = guideFilm({
  duration: 20, sign: 'cancer', n: 3, seed: 3,
  hook: 'Try this week, | *Cancer.*',
  lines: [{ t: T.l1, text: "don't wait for them to *guess.*" }, { t: T.l2, text: 'ask for the hug. *out loud.*' }],
  T, fact: 'THE MOON CYCLES THROUGH ITS|PHASES IN ABOUT A MONTH', factY: 1330,
  last: 'Ask for what | you *need.*', hero: HERO, mood,
  // shut in: the lantern glows from inside the crack; once open, it hangs from the tip as usual
  lantern: (t, H) => (t < T.crack ? { x: H.x + 205, y: CRACK - 50, size: 60, glow: 1.3 } : null),
  side: -1,
  hops: [T.crack + 0.45, T.hug],
  back(x, t, S) {
    // the friend (behind the hug arms)
    const ok = S.ok
    if (ok <= 0) return
    const k = openK(t)
    if (k >= 0.55) shellHalf(x, HERO.x, CRACK - gapAt(t) / 2 - 30 * k, true, -1.1 * k)
    const m = t < T.guesses[0] ? 'neutral' : t < T.ask ? 'squint' : t < T.hug ? 'wide' : 'heart'
    drawStarChar(x, palX(t), palY(t), PAL.size, t, { color: PAL.c, mood: m, look: t < T.ask ? [-1, -1] : [-1, 0], seed: 6, glow: 0.7, pop: ok, hops: [...T.guesses, T.hug] })
  },
  front(x, t, S) {
    const { ok, r, color } = S
    if (ok <= 0) return
    const k = openK(t), gap = gapAt(t)
    // the shell: bottom bowl under the star, the dome hinged on the left, swinging up and back
    x.save(); x.globalAlpha = ok
    shellHalf(x, HERO.x, CRACK + gap / 2 + 14 * k, false)
    if (k < 0.55) shellHalf(x, HERO.x, CRACK - gap / 2 - 30 * k, true, -1.1 * k)
    x.restore()
    // the crack's shadow band while shut (eyes peek through)
    arms(x, r, t, color, clamp(prog(t, T.arms, T.arms + 0.35)) * ok, ease.inOutQuad(prog(t, T.hug - 0.1, T.hug + 0.25)))
    // guesses
    T.guesses.forEach((g0, i) => {
      const nxt = T.guesses[i + 1] ?? T.l2 + 0.6
      const s = pop01(t, g0, 0.3, 2.4) * (1 - prog(t, nxt - 0.12, nxt))
      if (s <= 0.01) return
      bubble(x, PAL.x - 10, PAL.y - 250, s, GUESS[i], { thought: true, tail: 'br', size: 56, color: '#2f6f55' })
      if (t > g0 + 0.55) drawBits(x, XM, { X: '#ff3d4e' }, PAL.x + 120, PAL.y - 290, 9 * easeOutBack(prog(t, g0 + 0.55, g0 + 0.75), 3))
    })
    // the ask
    const as = pop01(t, T.ask, 0.3, 2.4) * (1 - prog(t, T.close - 0.4, T.close - 0.1))
    bubble(x, HERO.x + 60, HERO.y - 290, as, 'hug, please?', { size: 58, color: '#245f8f', tail: 'bl' })
    // hearts once hugging
    if (t > T.hug) for (let i = 0; i < 8; i++) {
      const born = T.hug + i * 0.35, p = (t - born) / 1.4
      if (p < 0 || p >= 1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, HERO.x + 250 + ((i * 53) % 9 - 4) * 22, HERO.y - 120 - p * 200, 7, { alpha: Math.sin(Math.PI * p) * ok })
    }
  },
  cues: [
    ...T.guesses.flatMap(g => [['pop', g, 987.77, 0.035, 0.3], ['pop', g + 0.55, 220, 0.04, 0.3], ['tick', g + 0.56, 0.03]]),
    ['tick', T.crack - 0.3, 0.03], ['boom', T.crack, 0.1], ['pop', T.crack + 0.05, 659.25, 0.045, -0.2],
    ['pluck', T.arms, 880, 0.035, 0.5, -0.2], ['pop', T.ask, 987.77, 0.035, -0.1],
    ['whoosh', T.hop, 0.35, 0.03], ['pop', T.hug, 739.99, 0.045, 0], ['bell', T.hug + 0.05, 1760, 0.03, 1.2, 0], ['glitter', T.hug, T.hug + 0.8],
  ],
})

export const { DURATION, SCENES, CUES, LINES } = film
export { T }
