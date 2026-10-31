// st13zodiac (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E01) · story 0–40.6, then the end card.
//   ❓ "Why are there *12* signs?"  ♄ SATURN (pointer) teaches ♓ PISCES at the chalkboard:
//   ✓ the Sun seems to travel a yearly path against the stars, the ecliptic (a chalk loop, a little Sun going round it);
//   ✦ astrology splits that path into 12 equal 30° slices (12 × 30 = 360), named after constellations along it (12 spokes);
//   ✓ the real constellations are different sizes, and a 13th, Ophiuchus, crosses the path too (an uneven outer ring,
//     its arcs drawn in proportion to how much of the ecliptic each constellation's boundary holds).
//   💡 Pisces: "so the signs are pizza slices of the sky." Last line (Pisces): "Twelve *slices*. One sky."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { prog } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { drawSaturn, SATURN } from '../../st5cast.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, EX } from '../../stexplain.js'
import { makeEpisode, r3, R, INK } from './classkit.js'

const PIS = signStar('pisces')
const TAU = Math.PI * 2
const CX = 540, CY = 770, RR = 168
// the 13 constellations the ecliptic passes through, from Pisces eastward, in rough degrees of the ecliptic each holds
// (IAU boundaries; they sum to ≈ 360). Ophiuchus is index 9.
const CONST = [37, 25, 36, 28, 20, 36, 44, 23, 7, 18, 33, 28, 24]
const OPH = 9

const EP = makeEpisode({
  id: 'st13zodiac', numeral: 'S13 E01', duration: 45, key: 'D',
  q: 'Why are there *12* signs?', qAccent: EX.chalkYellow,
  teacher: { tag: SATURN.tag, color: '#f7dca0', accent: SATURN.tagColor, pitch: 330, size: 290,
    draw: (x, X, Y, s, t, o) => drawSaturn(x, X, Y, s, t, { ...o, rot: -0.18 }) },
  student: { tag: '♓ PISCES', color: PIS.color, pitch: 740,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: PIS.color, glyph: PIS.glyph, ...o }) },
  board: { title: 'THE ZODIAC, EXPLAINED' },
  lines: [
    ['s', 'why twelve? why not, like, *eleven*?'],
    ['t', 'Watch the Sun over a year, against the stars.', { tag: 'sky' }],
    ['t', 'It seems to trace one loop: the *ecliptic*.'],
    ['t', 'Astrology cuts that loop into *12* slices.', { tag: 'astro' }],
    ['t', 'Each is *30°*. Twelve times 30 is 360.'],
    ['s', 'wait. *math?* in astrology class??'],
    ['t', 'Just the one sum. I *promise*.'],
    ['s', 'so each slice matches a constellation?'],
    ['t', 'Not quite. Real ones come in *all sizes*.', { tag: 'sky' }],
    ['t', 'And a 13th, *Ophiuchus*, crosses it too.'],
    ['s', 'so signs are *pizza slices* of the sky!', { bulb: true }],
  ],
  recap: ['Sun\'s path: the *ecliptic*', 'Astrology: *12* × 30° slices', 'Real constellations: *uneven*'],
  last: 'Twelve *slices*. One sky.', lastWho: 's',
  moods(t, T, i) {
    const L = T.L
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (t >= T.recap) return [{ mood: 'happy' }, { mood: 'happy' }]
    if (i === 10) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    if (i === 5) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (i === 6) return [{ mood: 'happy', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    if (i === 7) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    if (i >= 8) return [{ mood: 'squint', look: [1, -1] }, { mood: 'wide', look: [-1, -1] }]
    void L
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    // the background stars on the slate
    for (let k = 0; k < 22; k++) {
      const a = k * 2.399, rr = 230 + (k * 53) % 120
      const sx = CX + Math.cos(a) * rr * 1.45, sy = CY + Math.sin(a) * rr * 0.62
      if (sx < B.x0 + 10 || sx > B.x1 - 10 || sy < B.y0 + 60 || sy > B.y1 - 10) continue
      x.globalAlpha = 0.35 + 0.25 * Math.sin(t * 2 + k)
      R(x, EX.chalk, sx - 3, sy - 3, 6, 6)
    }
    x.globalAlpha = 1
    // beat 1: the ecliptic loop, Earth in the middle, the Sun going round
    chalkCircle(x, t, { x: CX, y: CY, r: RR, at: L[1] + 0.2, dur: 1.2, color: EX.chalkYellow, width: 7 })
    chalkCircle(x, t, { x: CX, y: CY, r: 20, at: L[1], dur: 0.4, color: EX.chalkBlue, width: 6 })
    if (t >= L[1] + 1.2) {
      const a = -Math.PI / 2 + (t - L[1] - 1.2) * 0.55
      const sx = CX + Math.cos(a) * RR, sy = CY + Math.sin(a) * RR
      x.fillStyle = INK; x.beginPath(); x.arc(sx, sy, 19, 0, TAU); x.fill()
      x.fillStyle = '#ffd34d'; x.beginPath(); x.arc(sx, sy, 15, 0, TAU); x.fill()
      x.fillStyle = '#fff3b0'; x.fillRect(sx - 8, sy - 9, 6, 6)
    }
    chalkText(x, t, { text: 'THE *ECLIPTIC*', x: B.x0 + 4, y: B.y1 - 30, at: L[2] + 0.6, size: 30 })
    // beat 2: twelve equal spokes, then the sum
    for (let k = 0; k < 12; k++) {
      const a = -Math.PI / 2 + k * TAU / 12
      chalkLine(x, t, { pts: [[CX + Math.cos(a) * 30, CY + Math.sin(a) * 30], [CX + Math.cos(a) * RR, CY + Math.sin(a) * RR]], at: L[3] + 0.3 + k * 0.1, dur: 0.18, width: 5 })
    }
    chalkText(x, t, { text: '12 × 30°|= *360°*', x: B.x1 - 4, y: CY + 90, at: L[4] + 0.3, size: 30, align: 'right' })
    // beat 3: the real constellations, an uneven ring, Ophiuchus in pink
    let a0 = -Math.PI / 2
    CONST.forEach((deg, k) => {
      const sw = deg / 360 * TAU
      const oph = k === OPH
      chalkCircle(x, t, { x: CX, y: CY, r: RR + 30, at: L[8] + 0.3 + k * 0.12, dur: 0.22, color: oph ? EX.chalkPink : EX.chalkGreen, width: oph ? 10 : 7, from: a0 + 0.03, sweep: Math.max(0.02, sw - 0.06) })
      if (oph) {
        const m = a0 + sw / 2, ex = CX + Math.cos(m) * (RR + 44), ey = CY + Math.sin(m) * (RR + 44)
        chalkLine(x, t, { pts: [[B.x0 + 70, ey - 70], [ex - 14, ey - 6]], at: L[9] + 0.2, dur: 0.4, color: EX.chalkPink, width: 5, arrow: true })
        chalkText(x, t, { text: 'OPHIUCHUS', x: B.x0 + 4, y: ey - 104, at: L[9] + 0.4, size: 26, color: EX.chalkPink })
      }
      a0 += sw
    })
    chalkText(x, t, { text: '*13* on the path', x: B.x1 - 4, y: B.y0 + 60, at: L[9] + 0.9, size: 26, align: 'right' })
    void prog
  },
  cues: T => [
    ...chalkCues(r3(T.L[2] + 0.6), 'THE ECLIPTIC'),
    ...chalkCues(r3(T.L[4] + 0.3), '12 × 30° = 360°'),
    ...chalkCues(r3(T.L[9] + 0.4), 'OPHIUCHUS'),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
