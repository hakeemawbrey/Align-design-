// hxsummertriangle (30 s vertical Align ad, "Star Talk Explains", the Houston sky) · story 0–25.6, then the end card.
//   ❓ "What's that bright *triangle* up there?"  ♀ VENUS teaches ♊ GEMINI at the chalkboard:
//   ✓ the Summer Triangle: three bright stars, Vega, Deneb and Altair, high on summer evenings (three big chalk stars,
//     joined, each named);
//   ✓ bright enough to see from the city (a chalk skyline with its glow; the three still shine over it);
//   ♥ name a star pattern together (two hands of chalk join little faint stars into a shape, labelled "OURS").
//   💡 Gemini: "three stars: me, me, and *you*." Last line (Venus): "Three stars. *One* story."
// Rewatch bait: a tiny Pisces sits on the chalkboard's top frame, sobbing because the triangle is so pretty.
// The engine is ./classkit.js (st13sunsign's, with one cardfx cut and no numeral). Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { drawVenus, VENUS } from '../../st8cast.js'
import { drawPixelStar } from '../../sky.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, EX } from '../../stexplain.js'
import { makeEpisode, r3, R, INK } from './classkit.js'

const GEM = signStar('gemini')
const PIS = signStar('pisces')
const TAU = Math.PI * 2
// on a chart facing up: Deneb top left, Vega top right, Altair lower down (the usual summer-evening picture)
const VEGA = { x: 500, y: 640, n: 'VEGA' }, DENEB = { x: 260, y: 670, n: 'DENEB' }, ALTAIR = { x: 420, y: 860, n: 'ALTAIR' }
const TRI = [DENEB, VEGA, ALTAIR]
const GROUND = 948
const CITY = [[640, 70], [680, 120], [720, 96], [760, 170], [800, 130], [840, 200], [880, 110], [916, 80]]
const OURS = [[700, 560], [760, 600], [820, 570], [880, 610], [790, 660]]

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

const EP = makeEpisode({
  id: 'hxsummertriangle', duration: 30, key: 'G',
  q: 'What\'s that bright | *triangle* up there?', qAccent: EX.chalkPink, qSize: 100,
  teacher: { tag: VENUS.tag, color: VENUS.color, accent: VENUS.tagColor, pitch: 659,
    draw: (x, X, Y, s, t, o) => drawVenus(x, X, Y, s, t, { morning: 0.5, ...o }) },
  student: { tag: '♊ GEMINI', color: GEM.color, pitch: 784,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: GEM.color, glyph: GEM.glyph, ...o }) },
  board: { title: 'LOOK UP' },
  lines: [
    ['s', 'three bright stars. a *triangle*. is it a sign??'],
    ['t', 'It\'s the *Summer Triangle*.', { tag: 'sky' }],
    ['t', 'Vega, Deneb, Altair: *high* on summer evenings.'],
    ['t', 'Bright enough to spot from the *city*.', { tag: 'sky' }],
    ['t', 'Tip: name a star pattern *together*.', { tag: 'tip' }],
    ['s', 'three stars: me, me, and *you*.', { bulb: true, hold: 1.4 }],
  ],
  recap: ['*Vega*, Deneb and Altair', 'High on *summer* evenings', 'Bright enough for the *city*'],
  last: 'Three stars. *One* story.', lastWho: 't',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [0, -1] }]
    if (t >= T.recap) return [{ mood: 'heart' }, { mood: 'happy' }]
    if (i === 0) return [{ mood: 'happy', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (i === 3) return [{ mood: 'sparkle', look: [1, -1] }, { mood: 'happy', look: [-1, -1] }]
    if (i === 4) return [{ mood: 'heart', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    if (i === 5) return [{ mood: 'happy', look: [1, 0] }, { mood: 'wink', look: [-1, 0] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    // the triangle: three big chalk stars, joined
    TRI.forEach((s, k) => {
      const a = clamp(prog(t, T.board + 0.4 + k * 0.2, T.board + 0.6 + k * 0.2))
      if (a <= 0) return
      x.save(); x.globalAlpha *= a * (0.85 + 0.15 * Math.sin(t * 3 + k * 2))
      drawPixelStar(x, s.x, s.y, 42, 0, EX.chalkYellow, '#ffffff')
      x.restore()
    })
    chalkLine(x, t, { pts: [[DENEB.x, DENEB.y], [VEGA.x, VEGA.y], [ALTAIR.x, ALTAIR.y], [DENEB.x, DENEB.y]], at: L[1] + 0.3, dur: 1.0, width: 4, dash: [16, 12], color: EX.chalkPink })
    chalkText(x, t, { text: 'SUMMER|*TRIANGLE*', x: 393, y: 728, at: L[1] + 1.0, size: 22, align: 'center', accent: EX.chalkPink })
    chalkText(x, t, { text: '*DENEB*', x: DENEB.x, y: DENEB.y - 52, at: L[2] + 0.3, size: 24, align: 'center', accent: EX.chalkYellow })
    chalkText(x, t, { text: '*VEGA*', x: VEGA.x, y: VEGA.y - 52, at: L[2] + 0.15, size: 24, align: 'center', accent: EX.chalkYellow })
    chalkText(x, t, { text: '*ALTAIR*', x: ALTAIR.x, y: ALTAIR.y + 40, at: L[2] + 0.75, size: 24, align: 'center', accent: EX.chalkYellow })
    // the city: a little skyline with its glow on the right, and the three still shining
    const glow = clamp(prog(t, L[3] + 0.3, L[3] + 1.0))
    if (glow > 0) {
      const g = x.createRadialGradient(780, GROUND, 10, 780, GROUND, 230)
      g.addColorStop(0, `rgba(255,226,122,${0.38 * glow})`); g.addColorStop(1, 'rgba(255,190,110,0)')
      x.fillStyle = g; x.fillRect(600, 700, B.x1 - 600 + 20, GROUND - 700)
    }
    CITY.forEach(([cx, h], k) => {
      chalkLine(x, t, { pts: [[cx - 16, GROUND], [cx - 16, GROUND - h], [cx + 16, GROUND - h], [cx + 16, GROUND]], at: L[3] + 0.2 + k * 0.05, dur: 0.2, width: 4 })
      if (glow > 0.3) for (let j = 1; j * 28 < h - 8; j++) if ((j + k) % 2) R(x, `rgba(255,226,122,${0.7 * glow})`, cx - 6, GROUND - h + j * 28 - 8, 12, 9)
    })
    chalkLine(x, t, { pts: [[600, GROUND], [B.x1, GROUND]], at: L[3] + 0.2, dur: 0.3, width: 4 })
    chalkLine(x, t, { pts: [[690, 770], [ALTAIR.x + 40, ALTAIR.y - 10]], at: L[3] + 1.0, dur: 0.4, width: 4, arrow: true, color: EX.chalkGreen })
    chalkText(x, t, { text: 'STILL|*SHINING*', x: 700, y: 700, at: L[3] + 1.2, size: 22, accent: EX.chalkGreen })
    // the tip: a pattern of your own, faint stars joined into a little kite, labelled OURS
    if (t >= L[4] + 0.3) {
      OURS.forEach(([sx, sy], k) => {
        const a = clamp(prog(t, L[4] + 0.3 + k * 0.08, L[4] + 0.5 + k * 0.08)) * (0.75 + 0.25 * Math.sin(t * 4 + k))
        x.save(); x.globalAlpha *= a; drawPixelStar(x, sx, sy, 18, 1, EX.chalk); x.restore()
      })
    }
    chalkLine(x, t, { pts: [OURS[0], OURS[1], OURS[2], OURS[3], OURS[4], OURS[1]], at: L[4] + 0.8, dur: 0.9, width: 3, color: EX.lilac })
    chalkText(x, t, { text: '"*OURS*"', x: B.x1 - 6, y: 676, at: L[4] + 1.5, size: 24, align: 'right', accent: EX.lilac })
  },
  back(x, t, T, B) {
    if (!B) return
    const k = clamp(prog(t, T.L[1] + 1.0, T.L[1] + 1.3)) * (1 - clamp(prog(t, T.recap, T.recap + 0.3)))
    sobbingPisces(x, t, 380, B.y0 - 56, 74, k * B.k)
  },
  cues: T => [
    ...Array.from({ length: 3 }, (_, k) => ['pop', r3(T.board + 0.4 + k * 0.2), [1318.51, 1567.98, 1975.53][k], 0.025, k - 1]),
    ...chalkCues(r3(T.L[1] + 1.0), 'SUMMER TRIANGLE'),
    ...chalkCues(r3(T.L[2] + 0.15), 'VEGA DENEB ALTAIR'),
    ...chalkCues(r3(T.L[3] + 1.2), 'STILL SHINING'),
    ...chalkCues(r3(T.L[4] + 1.5), 'OURS'),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
