// st13venus (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E06) · story 0–40.6, then the end card.
//   ❓ "What does your *Venus* sign say?"  ♀ VENUS (drawVenus) teaches ♍ VIRGO (with the clipboard) at the chalkboard:
//   ✓ Venus never strays more than about 47° from the Sun (seen from Earth), so your Venus is in your sun sign or within
//     two signs of it (a chalk wedge from Earth around the Sun, a little Venus swinging inside it; a five-box sign strip);
//   ✦ in astrology Venus is what you love and how you show affection;
//   ♥ ask your person how they like to be loved.
//   💡 Virgo: "so love has settings. and i can just ask." Last line (Venus): "Love has a *style*."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { drawVenus, VENUS } from '../../st8cast.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, EX } from '../../stexplain.js'
import { drawClipboard } from './props.js'
import { makeEpisode, r3, R, INK } from './classkit.js'

const VIR = signStar('virgo')
const TAU = Math.PI * 2
const EAX = 380, EAY = 925, SUX = 380, SUY = 650     // Earth (bottom) and the Sun (up)
const MAXA = 47 * Math.PI / 180

const EP = makeEpisode({
  id: 'st13venus', numeral: 'S13 E06', duration: 45, key: 'G',
  q: 'What does your *Venus* sign say?', qAccent: EX.chalkPink,
  teacher: { tag: VENUS.tag, color: VENUS.color, accent: VENUS.tagColor, pitch: 659,
    draw: (x, X, Y, s, t, o) => drawVenus(x, X, Y, s, t, { morning: 0.75, ...o }) },
  student: { tag: '♍ VIRGO', color: VIR.color, pitch: 554,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: VIR.color, glyph: VIR.glyph, ...o }),
    prop(x, r, t, T) {
      const page = t >= T.L[5] + 0.6 ? 1 : 0
      const lift = clamp(prog(t, T.L[5], T.L[5] + 0.3)) * (1 - clamp(prog(t, T.L[7], T.L[7] + 0.3)))
      drawClipboard(x, r.x - 128, r.y + 34 - lift * 40, 6, { page, rot: 0.12 - lift * 0.2 })
    } },
  board: { title: 'YOUR VENUS SIGN' },
  lines: [
    ['s', 'my Venus sign. is that a *love* spreadsheet?'],
    ['t', 'Sky fact first: I always stay near the *Sun*.', { tag: 'sky' }],
    ['t', 'From Earth, never more than about *47°* away.'],
    ['t', 'So your Venus is in your *sun sign*,'],
    ['t', 'or within *two signs* of it.'],
    ['s', 'checking... *yep*. that tracks.'],
    ['t', 'Does the spreadsheet *approve*?'],
    ['t', 'In astrology, I\'m what you *love*,', { tag: 'astro' }],
    ['t', 'and how you show *affection*.'],
    ['t', 'Tip: ask how *they* like to be loved.', { tag: 'tip' }],
    ['s', 'so love has *settings*. and i can just ask.', { bulb: true }],
  ],
  recap: ['Venus stays near the *Sun*', 'Astrology: how you *love*', 'Tip: *ask*, don\'t guess'],
  last: 'Love has a *style*.', lastWho: 't',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'squint', look: [-1, -1] }]
    if (t >= T.recap) return [{ mood: 'heart' }, { mood: 'happy' }]
    if (i === 5) return [{ mood: 'happy', look: [1, 0] }, { mood: 'squint', look: [-1, 1] }]
    if (i === 6) return [{ mood: 'wink', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
    if (i === 10) return [{ mood: 'heart', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    if (i >= 7) return [{ mood: 'sparkle', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    // beat 1: Earth, the Sun, the ±47° wedge, a little Venus swinging inside it
    chalkCircle(x, t, { x: EAX, y: EAY, r: 16, at: L[1], dur: 0.4, color: EX.chalkBlue, width: 6 })
    chalkText(x, t, { text: 'EARTH', x: EAX + 30, y: EAY + 6, at: L[1] + 0.2, size: 22, color: EX.chalkBlue })
    if (t >= L[1] + 0.3) {
      const k = clamp(prog(t, L[1] + 0.3, L[1] + 0.6))
      x.save(); x.globalAlpha *= k
      x.fillStyle = INK; x.beginPath(); x.arc(SUX, SUY, 30, 0, TAU); x.fill()
      x.fillStyle = '#ffd34d'; x.beginPath(); x.arc(SUX, SUY, 25, 0, TAU); x.fill()
      x.restore()
    }
    chalkText(x, t, { text: 'SUN', x: SUX + 42, y: SUY - 8, at: L[1] + 0.5, size: 22, color: EX.chalkYellow })
    const W = 290
    for (const s of [-1, 1]) chalkLine(x, t, { pts: [[EAX, EAY - 18], [EAX + s * Math.sin(MAXA) * W, EAY - 18 - Math.cos(MAXA) * W]], at: L[2] + 0.2, dur: 0.5, color: EX.chalkPink, width: 5, dash: [14, 10] })
    chalkCircle(x, t, { x: EAX, y: EAY - 18, r: 90, at: L[2] + 0.6, dur: 0.5, color: EX.chalkPink, width: 4, from: -Math.PI / 2 - MAXA, sweep: 2 * MAXA })
    chalkText(x, t, { text: '≤ ~*47°*', x: EAX, y: EAY - 140, at: L[2] + 0.8, size: 26, align: 'center', accent: EX.chalkPink })
    if (t >= L[2] + 0.8) {
      const a = Math.sin((t - L[2] - 0.8) * 0.9) * MAXA * 0.92, r = 240
      const vx = EAX + Math.sin(a) * r, vy = EAY - 18 - Math.cos(a) * r
      x.fillStyle = INK; x.beginPath(); x.arc(vx, vy, 13, 0, TAU); x.fill()
      x.fillStyle = VENUS.color; x.beginPath(); x.arc(vx, vy, 10, 0, TAU); x.fill()
    }
    // beat 1b: the five-box strip, your sun sign in the middle
    const bx0 = 630, by = 610, bw = 58
    for (let n = 0; n < 5; n++) {
      const at = L[3] + 0.3 + n * 0.1
      const mid = n === 2, near = t >= L[4] + 0.3
      chalkLine(x, t, { pts: [[bx0 + n * bw, by], [bx0 + n * bw + bw - 8, by], [bx0 + n * bw + bw - 8, by + 50], [bx0 + n * bw, by + 50], [bx0 + n * bw, by]], at, dur: 0.25, width: 4, color: mid ? EX.chalkYellow : near ? EX.chalkPink : EX.chalk })
    }
    chalkText(x, t, { text: 'SUN', x: bx0 + 2 * bw + 25, y: by + 25, at: L[3] + 0.7, size: 18, align: 'center', color: EX.chalkYellow })
    ;['-2', '-1', null, '+1', '+2'].forEach((lab, n) => { if (lab) chalkText(x, t, { text: lab, x: bx0 + n * bw + 25, y: by + 25, at: L[4] + 0.3 + n * 0.08, size: 20, align: 'center', color: EX.chalkPink, cps: 30 }) })
    chalkText(x, t, { text: 'YOUR VENUS: IN HERE', x: bx0 + 141, y: by + 84, at: L[4] + 0.7, size: 22, align: 'center' })
    // beat 2: the astrology meaning; beat 3: the tip
    chalkText(x, t, { text: 'IN ASTROLOGY:|VENUS = WHAT YOU|*LOVE* + HOW YOU|SHOW IT', x: 630, y: 750, at: L[7] + 0.3, size: 24, accent: EX.lilac, cps: 30 })
    chalkText(x, t, { text: 'ASK HOW THEY|LIKE TO BE *LOVED*', x: 630, y: 890, at: L[9] + 0.4, size: 24, color: EX.chalkPink, accent: EX.chalkYellow })
    if (t >= L[9] + 1.2) for (let k = 0; k < 3; k++) {
      const hx = 900, hy = 880 - k * 26 - ((t * 30) % 26)
      x.globalAlpha = 0.6; R(x, EX.pink, hx - 6, hy, 5, 5); R(x, EX.pink, hx + 1, hy, 5, 5); R(x, EX.pink, hx - 4, hy + 4, 8, 5); x.globalAlpha = 1
    }
  },
  cues: T => [
    ...chalkCues(r3(T.L[2] + 0.8), '47°'),
    ...chalkCues(r3(T.L[4] + 0.7), 'YOUR VENUS: IN HERE'),
    ...chalkCues(r3(T.L[7] + 0.3), 'VENUS = WHAT YOU LOVE', { cps: 30 }),
    ...chalkCues(r3(T.L[9] + 0.4), 'ASK HOW THEY LIKE TO BE LOVED'),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
