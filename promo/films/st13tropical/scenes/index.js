// st13tropical (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E02) · story 0–40.6, then the end card.
//   ❓ "Is my sign *wrong* now?"  ♄ SATURN calms a worried ♈ ARIES at the chalkboard:
//   ✓ Earth's axis wobbles slowly (precession, about 26,000 years per circle), so the stars behind the Sun on your
//     birthday have shifted since ancient times (a tilted chalk Earth whose axis traces a slow circle; a star strip slides);
//   ✦ Western (tropical) astrology ties the signs to the seasons: Aries starts at the March equinox;
//   ✦ sidereal astrology, used in Vedic astrology, ties the signs to the stars instead.
//   💡 Aries: "two maps, one sky. i'm not fake!" Last line (Saturn): "Your sign *stayed*. The sky moved."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { drawSaturn, SATURN } from '../../st5cast.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, EX } from '../../stexplain.js'
import { drawSweat } from './props.js'
import { makeEpisode, r3, R, INK } from './classkit.js'

const ARI = signStar('aries')
const TAU = Math.PI * 2
const EX0 = 320, EY0 = 672          // the chalk Earth

const EP = makeEpisode({
  id: 'st13tropical', numeral: 'S13 E02', duration: 45, key: 'F',
  q: 'Is my sign *wrong* now?', qAccent: EX.chalkPink,
  teacher: { tag: SATURN.tag, color: '#f7dca0', accent: SATURN.tagColor, pitch: 330, size: 290,
    draw: (x, X, Y, s, t, o) => drawSaturn(x, X, Y, s, t, { ...o, rot: -0.18 }) },
  student: { tag: '♈ ARIES', color: ARI.color, pitch: 760,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: ARI.color, glyph: ARI.glyph, ...o }),
    prop(x, r, t, T) {
      const worried = t < T.L[1] || (t >= T.L[5] && t < T.L[7])
      if (worried) drawSweat(x, t, r.x - 78, r.top + 70, 7)
    } },
  board: { title: 'DID MY SIGN MOVE?' },
  lines: [
    ['s', 'a video said my sign *changed*. am i fake??'],
    ['t', 'Breathe. Earth\'s axis *wobbles*, like a top.', { tag: 'sky' }],
    ['t', 'One slow circle takes about *26,000* years.'],
    ['t', 'So the stars behind the Sun on your birthday'],
    ['t', 'have *shifted* since ancient times.'],
    ['s', 'so i AM *fake*.'],
    ['t', 'Nope. There are two *systems*. Look.'],
    ['t', 'Western astrology ties signs to the *seasons*.', { tag: 'astro' }],
    ['t', 'Aries starts at the *March equinox*. Still you.'],
    ['t', 'Sidereal (used in Vedic) follows the *stars*.', { tag: 'astro' }],
    ['s', 'two maps, one sky. i\'m *not* fake!', { bulb: true }],
  ],
  recap: ['Earth\'s axis *wobbles* slowly', 'Tropical signs: the *seasons*', 'Sidereal signs: the *stars*'],
  last: 'Your sign *stayed*. The sky moved.', lastWho: 't',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (t >= T.recap) return [{ mood: 'happy' }, { mood: 'happy' }]
    if (i === 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (i === 5) return [{ mood: 'happy', look: [1, 0] }, { mood: 'wide', look: [-1, 1] }]
    if (i === 8) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, -1] }]
    if (i === 10) return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [0, -1] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: i >= 7 ? 'neutral' : 'squint', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    // beat 1: a tilted Earth whose axis slowly traces a circle (precession, sped up a lot)
    chalkCircle(x, t, { x: EX0, y: EY0, r: 48, at: L[1], dur: 0.6, color: EX.chalkBlue, width: 7 })
    const w = t >= L[1] + 0.6 ? (t - L[1] - 0.6) * 1.4 : 0
    const tipX = EX0 + Math.cos(w) * 40, tipY = EY0 - 100 + Math.sin(w) * 10
    const k = clamp(prog(t, L[1] + 0.5, L[1] + 0.9))
    if (k > 0) {
      x.save(); x.globalAlpha *= k
      chalkLine(x, t, { pts: [[EX0 - (tipX - EX0), EY0 + 100 - (tipY - EY0 + 100)], [tipX, tipY]], at: L[1] + 0.5, dur: 0.3, width: 6 })
      x.restore()
      // the dashed circle the axis traces
      x.save(); x.translate(EX0, EY0 - 100); x.scale(1, 10 / 40)
      chalkCircle(x, t, { x: 0, y: 0, r: 40, at: L[1] + 0.8, dur: 0.6, color: EX.chalkYellow, width: 9 })
      x.restore()
    }
    chalkText(x, t, { text: '~*26,000* YRS|PER CIRCLE', x: EX0, y: EY0 + 124, at: L[2] + 0.5, size: 26, align: 'center' })
    // beat 1b: the same birthday Sun, the star strip behind it sliding
    const sx0 = 500, sx1 = 920, sy = 690
    const slide = 70 * ease.inOutCubic(prog(t, L[4] + 0.2, L[4] + 1.6))
    const kk = clamp(prog(t, L[3], L[3] + 0.5))
    if (kk > 0) {
      x.save(); x.globalAlpha *= kk
      x.beginPath(); x.rect(sx0, sy - 60, sx1 - sx0, 120); x.clip()
      for (let n = 0; n < 12; n++) {
        const px = sx0 + 10 + n * 44 - slide, py = sy + ((n * 37) % 50) - 25
        R(x, n % 3 ? EX.chalk : EX.chalkGreen, px - 4, py - 4, 8, 8)
      }
      x.restore()
      x.save(); x.globalAlpha *= kk
      const cx = 710
      x.fillStyle = INK; x.beginPath(); x.arc(cx, sy, 26, 0, TAU); x.fill()
      x.fillStyle = '#ffd34d'; x.beginPath(); x.arc(cx, sy, 21, 0, TAU); x.fill()
      x.restore()
    }
    chalkText(x, t, { text: 'SAME BIRTHDAY SUN', x: 710, y: sy - 70, at: L[3] + 0.3, size: 24, align: 'center', color: EX.chalkYellow })
    chalkLine(x, t, { pts: [[640, sy + 70], [570, sy + 70]], at: L[4] + 0.3, dur: 0.4, color: EX.chalkGreen, width: 5, arrow: true })
    chalkText(x, t, { text: 'STARS *SHIFTED*', x: 660, y: sy + 70, at: L[4] + 0.5, size: 24 })
    // beat 2 + 3: the two systems
    chalkLine(x, t, { pts: [[B.x0 + 10, 846], [B.x1 - 10, 846]], at: L[7], dur: 0.5, width: 4, alpha: 0.6 })
    chalkText(x, t, { text: 'TROPICAL = *SEASONS*|ARIES STARTS AT|THE MARCH EQUINOX', x: B.x0 + 10, y: 872, at: L[7] + 0.3, size: 26, accent: EX.lilac, cps: 30 })
    chalkLine(x, t, { pts: [[540, 860], [540, 955]], at: L[9], dur: 0.3, width: 4, alpha: 0.6 })
    chalkText(x, t, { text: 'SIDEREAL = *STARS*|USED IN VEDIC|ASTROLOGY', x: 570, y: 872, at: L[9] + 0.3, size: 26, accent: EX.lilac, cps: 30 })
  },
  cues: T => [
    ...chalkCues(r3(T.L[2] + 0.5), '~26,000 YRS PER CIRCLE'),
    ...chalkCues(r3(T.L[7] + 0.3), 'TROPICAL = SEASONS', { cps: 30 }),
    ...chalkCues(r3(T.L[9] + 0.3), 'SIDEREAL = STARS', { cps: 30 }),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
