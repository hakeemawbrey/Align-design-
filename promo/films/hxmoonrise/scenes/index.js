// hxmoonrise (30 s vertical Align ad, "Star Talk Explains", the Houston sky) · story 0–25.6, then the end card.
//   ❓ "Why does the Moon look *huge* tonight?"  ☽ THE MOON teaches ♋ CANCER at the chalkboard:
//   ✓ the Moon isn't bigger near the horizon; it's an illusion your brain makes, the Moon illusion (a chalk bayou
//     horizon, the Moon drawn low and high at the SAME size with a measuring bracket on each, then a dashed "what your
//     brain sees" ghost ring round the low one and a little chalk brain);
//   ✦ in astrology the Moon is feelings;
//   ♥ point it out to someone (two little stars on the bank, one pointing up).
//   💡 Cancer: "so the Moon's the same. my *feelings* got big." Last line (Cancer): "Same Moon. *Bigger* feelings."
// Rewatch bait: a tiny Pisces sits on the chalkboard's top frame, sobbing at how pretty the moonrise is.
// The engine is ./classkit.js (st13sunsign's, with one cardfx cut and no numeral); the Moon is ./kit.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { drawPixelStar } from '../../sky.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, EX } from '../../stexplain.js'
import { drawMoonChar, MOON } from './kit.js'
import { makeEpisode, r3, R, INK } from './classkit.js'

const CAN = signStar('cancer')
const PIS = signStar('pisces')
const TAU = Math.PI * 2
const HZ = 850                                  // the bayou horizon on the board
const LOWM = { x: 300, y: HZ - 50 }, HIGHM = { x: 560, y: 600 }, MR = 40

const moonTeacher = (x, X, Y, s, t, o = {}) => {
  const r = drawMoonChar(x, X, Y, s * 0.46, t, { mood: o.mood === 'squint' ? 'neutral' : o.mood, look: o.look || [0, 0], hops: o.hops, seed: 3 })
  return { x: X, y: r.y, top: r.top }
}

function sobbingPisces(x, t, X, Y, s, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  const r = drawStarChar(x, X, Y, s, t, { color: PIS.color, mood: 'sparkle', look: [1, 1], seed: 12, bob: 2, glow: 0.5, tips: false })
  const cell = s / 36, ey = r.y + 1.2 * cell, dx = 4.6 * cell, px = Math.max(3, Math.round(cell))
  for (const side of [-1, 1]) {
    const len = px * (6 + 2 * Math.sin(t * 7 + side))
    R(x, '#7fd8ff', X + side * dx - px * 0.6, ey + px, px * 1.3, len)
    const ph = (t * 1.5 + (side > 0 ? 0.4 : 0)) % 1
    x.save(); x.globalAlpha *= 1 - ph; R(x, '#7fd8ff', X + side * dx - px * 0.5, ey + px + len + ph * px * 12, px, px * 1.6); x.restore()
  }
  x.restore()
}

// a chalk Moon disc (pale fill, a couple of maria), centred at p
function chalkMoon(x, p, r, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  x.fillStyle = INK; x.beginPath(); x.arc(p.x, p.y, r + 4, 0, TAU); x.fill()
  x.fillStyle = '#f4efd8'; x.beginPath(); x.arc(p.x, p.y, r, 0, TAU); x.fill()
  x.fillStyle = 'rgba(160,150,180,0.55)'
  x.beginPath(); x.arc(p.x - r * 0.3, p.y - r * 0.2, r * 0.22, 0, TAU); x.fill()
  x.beginPath(); x.arc(p.x + r * 0.25, p.y + r * 0.3, r * 0.16, 0, TAU); x.fill()
  x.restore()
}

const EP = makeEpisode({
  id: 'hxmoonrise', duration: 30, key: 'Eb',
  q: 'Why does the Moon | look *huge* tonight?', qAccent: '#d9d0ff',
  teacher: { tag: MOON.tag, color: MOON.color, accent: '#d9d0ff', pitch: 523, size: 250, draw: moonTeacher },
  student: { tag: '♋ CANCER', color: CAN.color, pitch: 698,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: CAN.color, glyph: CAN.glyph, ...o }) },
  board: { title: 'THE MOONRISE' },
  lines: [
    ['s', 'the Moon over the bayou is *enormous*. help?'],
    ['t', 'I\'m not bigger near the horizon. *Promise*.', { tag: 'sky' }],
    ['t', 'Your brain does that. The *Moon illusion*.'],
    ['t', 'In astrology, I\'m your *feelings*.', { tag: 'astro' }],
    ['t', 'Tip: point me out to *someone*.', { tag: 'tip' }],
    ['s', 'so the Moon\'s the same. my *feelings* grew.', { bulb: true, hold: 1.3 }],
  ],
  recap: ['Not bigger at the *horizon*', 'It\'s the *Moon illusion*', 'Astrology: Moon = *feelings*'],
  last: 'Same Moon. *Bigger* feelings.', lastWho: 's',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [0, -1] }]
    if (t >= T.recap) return [{ mood: 'happy' }, { mood: 'heart' }]
    if (i === 0) return [{ mood: 'happy', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (i === 2) return [{ mood: 'wink', look: [1, 0] }, { mood: 'squint', look: [-1, -1] }]
    if (i === 3) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'heart', look: [-1, 0] }]
    if (i === 5) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    // the bayou: a wavy horizon, trees on the far bank, the water's shimmer
    const bank = []
    for (let s = 0; s <= 40; s++) bank.push([B.x0 + s * (B.x1 - B.x0) / 40, HZ + Math.sin(s * 0.8) * 3])
    chalkLine(x, t, { pts: bank, at: T.board + 0.4, dur: 0.5, width: 5 })
    for (let k = 0; k < 9; k++) {
      const tx = B.x0 + 30 + k * 92 + (k % 2) * 20, th = 26 + (k * 13) % 22
      chalkLine(x, t, { pts: [[tx - 16, HZ], [tx, HZ - th], [tx + 16, HZ]], at: T.board + 0.6 + k * 0.04, dur: 0.2, width: 4, color: EX.chalkGreen, alpha: 0.8 })
    }
    for (let k = 0; k < 4; k++) {
      const wy = HZ + 34 + k * 24, wx = B.x0 + 40 + ((k * 137) % 300)
      chalkLine(x, t, { pts: [[wx, wy], [wx + 60, wy], [wx + 140, wy]], at: T.board + 0.7 + k * 0.08, dur: 0.3, width: 3, color: EX.chalkBlue, dash: [20, 14], alpha: 0.6 })
    }
    // the Moon low over the bayou and high up: the SAME size
    chalkMoon(x, LOWM, MR, clamp(prog(t, T.board + 0.5, T.board + 0.8)))
    chalkMoon(x, HIGHM, MR, clamp(prog(t, L[1] + 0.3, L[1] + 0.6)))
    // measuring brackets: identical
    const bracket = (p, at) => {
      chalkLine(x, t, { pts: [[p.x - MR, p.y + MR + 14], [p.x - MR, p.y + MR + 24], [p.x + MR, p.y + MR + 24], [p.x + MR, p.y + MR + 14]], at, dur: 0.4, width: 4, color: EX.chalkYellow })
    }
    bracket(HIGHM, L[1] + 0.8); bracket(LOWM, L[1] + 1.1)
    chalkText(x, t, { text: '*SAME*|SIZE', x: 440, y: 690, at: L[1] + 1.4, size: 28, align: 'center', accent: EX.chalkYellow })
    // the illusion: a dashed ghost ring round the low Moon (what it feels like), and a little chalk brain
    if (t >= L[2] + 0.3) {
      const k = ease.outBack ? ease.outBack(clamp(prog(t, L[2] + 0.3, L[2] + 0.9))) : clamp(prog(t, L[2] + 0.3, L[2] + 0.9))
      const rr = MR + 46 * k + Math.sin(t * 3) * 3
      x.save(); x.setLineDash([12, 10]); x.lineWidth = 4; x.strokeStyle = 'rgba(201,166,255,0.85)'
      x.beginPath(); x.arc(LOWM.x, LOWM.y, rr, 0, TAU); x.stroke(); x.restore()
    }
    chalkText(x, t, { text: 'WHAT YOU|*FEEL* YOU SEE', x: B.x0 + 4, y: 630, at: L[2] + 0.6, size: 22, accent: EX.lilac })
    if (t >= L[2] + 0.9) {
      const k = clamp(prog(t, L[2] + 0.9, L[2] + 1.2)), bx = 820, by = 600
      x.save(); x.globalAlpha *= k
      x.fillStyle = INK; x.beginPath(); x.ellipse(bx, by, 64, 46, 0, 0, TAU); x.fill()
      x.fillStyle = EX.chalkPink; x.beginPath(); x.ellipse(bx, by, 58, 40, 0, 0, TAU); x.fill()
      x.strokeStyle = INK; x.lineWidth = 4
      x.beginPath(); x.moveTo(bx, by - 38); x.bezierCurveTo(bx - 10, by - 10, bx + 10, by + 10, bx, by + 38); x.stroke()
      x.beginPath(); x.arc(bx - 28, by - 6, 14, 0.4, 2.8); x.stroke(); x.beginPath(); x.arc(bx + 28, by + 4, 14, 3.5, 5.9); x.stroke()
      // a sparkle over it: "the brain is doing it"
      const tw = 0.6 + 0.4 * Math.sin(t * 6)
      x.globalAlpha *= tw; drawPixelStar(x, bx + 66, by - 50, 28, 0, EX.chalkYellow)
      x.restore()
    }
    chalkText(x, t, { text: 'THE MOON|*ILLUSION*', x: 820, y: 690, at: L[2] + 1.1, size: 26, align: 'center', accent: EX.lilac })
    // astrology: Moon = feelings (a heart pops on the high Moon)
    if (t >= L[3] + 0.3) {
      const k = clamp(prog(t, L[3] + 0.3, L[3] + 0.6)), hb = 1 + 0.12 * Math.sin(t * 7)
      const p = 5 * hb * k, hx = HIGHM.x - p / 2, hy = HIGHM.y - p * 1.5
      x.save(); for (const [i, j] of [[-1, 0], [1, 0], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [-1, 2], [0, 2], [1, 2], [0, 3], [-2, 0], [2, 0]]) R(x, '#ff5c8a', hx + i * p, hy + j * p, p, p); x.restore()
    }
    chalkText(x, t, { text: 'IN ASTROLOGY:|MOON = *FEELINGS*', x: B.x1 - 6, y: 776, at: L[3] + 0.5, size: 22, align: 'right', accent: EX.lilac })
    // the tip: two little stars on the near bank, one pointing up at the Moon
    if (t >= L[4] + 0.3) {
      const k = clamp(prog(t, L[4] + 0.3, L[4] + 0.6))
      x.save(); x.globalAlpha *= k
      drawPixelStar(x, 470, 925, 40, 0, '#ffd76a'); drawPixelStar(x, 520, 925, 40, 0, CAN.color)
      x.restore()
    }
    chalkLine(x, t, { pts: [[476, 896], [430, 860], [LOWM.x + 56, LOWM.y + 22]], at: L[4] + 0.6, dur: 0.5, width: 4, arrow: true, color: EX.chalkPink })
    chalkText(x, t, { text: '"*LOOK*."', x: 560, y: 930, at: L[4] + 0.9, size: 24, accent: EX.chalkPink })
  },
  back(x, t, T, B) {
    if (!B) return
    const k = clamp(prog(t, T.L[1] + 1.4, T.L[1] + 1.7)) * (1 - clamp(prog(t, T.recap, T.recap + 0.3)))
    sobbingPisces(x, t, 300, B.y0 - 56, 74, k * B.k)
  },
  cues: T => [
    ...chalkCues(r3(T.L[1] + 1.4), 'SAME SIZE'),
    ...chalkCues(r3(T.L[2] + 0.6), 'WHAT YOU FEEL'),
    ...chalkCues(r3(T.L[2] + 1.1), 'MOON ILLUSION'),
    ['pop', r3(T.L[3] + 0.3), 987.77, 0.03, 0],
    ...chalkCues(r3(T.L[3] + 0.5), 'MOON FEELINGS'),
    ...chalkCues(r3(T.L[4] + 0.9), 'LOOK'),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
