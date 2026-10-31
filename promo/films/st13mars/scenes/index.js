// st13mars (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E07) · story 0–25.6, then the end card.
//   ❓ "What's your *Mars* sign about?"  ♂ MARS (drawMars) teaches ♓ PISCES at the chalkboard:
//   ✓ Mars takes about 687 days to go around the Sun (a chalk Sun, Earth's small orbit, Mars's wider one, a little Mars
//     running its lap);
//   ✦ in astrology Mars is drive: how you go after things and handle conflict.
//   💡 Pisces: "so not angry. motivated. with feelings." Last line (Mars): "Know your *fire*."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { prog } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { drawMars, MARS } from '../../st8cast.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, EX } from '../../stexplain.js'
import { makeEpisode, r3, INK } from './classkit.js'

const PIS = signStar('pisces')
const TAU = Math.PI * 2
const CX = 360, CY = 760

const marsTeacher = (x, X, Y, s, t, o = {}) => {
  const mood = o.mood === 'sparkle' ? 'happy' : o.mood === 'squint' ? 'smug' : o.mood
  return drawMars(x, X, Y + 6, s * 0.78, t, { ...o, mood, moonMood: o.moonMood || 'neutral' })
}

const EP = makeEpisode({
  id: 'st13mars', numeral: 'S13 E07', duration: 30, key: 'E',
  q: 'What\'s your *Mars* sign about?', qAccent: '#ff9a6a',
  teacher: { tag: MARS.tag, color: MARS.color, accent: MARS.tagColor, pitch: 294, draw: marsTeacher },
  student: { tag: '♓ PISCES', color: PIS.color, pitch: 740,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: PIS.color, glyph: PIS.glyph, ...o }) },
  board: { title: 'YOUR MARS SIGN' },
  lines: [
    ['s', 'my Mars sign... is that my *angry* sign?'],
    ['t', 'Sky fact: about *687 days* per lap of the Sun.', { tag: 'sky' }],
    ['t', 'In astrology, I\'m your *drive*:', { tag: 'astro' }],
    ['t', 'how you go after things, and face *conflict*.'],
    ['s', 'so not angry. *motivated*. with feelings.', { bulb: true }],
    ['t', 'Exactly. Fuel, not a *fuse*.'],
  ],
  recap: ['Mars: about *687 days* a lap', 'Astrology: your *drive*', 'And how you face *conflict*'],
  last: 'Know your *fire*.', lastWho: 't',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (t >= T.recap) return [{ mood: 'happy', moonMood: 'hype' }, { mood: 'happy' }]
    if (i === 0) return [{ mood: 'wide', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    if (i >= 4) return [{ mood: 'happy', look: [1, 0], moonMood: 'hype' }, { mood: 'sparkle', look: [0, -1] }]
    return [{ mood: 'smug', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    // beat 1: the Sun, Earth's orbit, Mars's wider orbit, Mars running its lap (a lap takes ~1.9× Earth's)
    if (t >= L[1]) {
      const k = prog(t, L[1], L[1] + 0.3)
      x.save(); x.globalAlpha *= k
      x.fillStyle = INK; x.beginPath(); x.arc(CX, CY, 28, 0, TAU); x.fill()
      x.fillStyle = '#ffd34d'; x.beginPath(); x.arc(CX, CY, 23, 0, TAU); x.fill()
      x.restore()
    }
    chalkCircle(x, t, { x: CX, y: CY, r: 100, at: L[1] + 0.2, dur: 0.6, color: EX.chalkBlue, width: 4 })
    chalkCircle(x, t, { x: CX, y: CY, r: 170, at: L[1] + 0.5, dur: 0.8, color: '#ff9a6a', width: 6 })
    if (t >= L[1] + 1.3) {
      const s = t - L[1] - 1.3
      const ae = -Math.PI / 2 + s * 1.2, am = -Math.PI / 2 + s * 1.2 / 1.88
      x.fillStyle = INK; x.beginPath(); x.arc(CX + Math.cos(ae) * 100, CY + Math.sin(ae) * 100, 12, 0, TAU); x.fill()
      x.fillStyle = '#7fc8ff'; x.beginPath(); x.arc(CX + Math.cos(ae) * 100, CY + Math.sin(ae) * 100, 9, 0, TAU); x.fill()
      x.fillStyle = INK; x.beginPath(); x.arc(CX + Math.cos(am) * 170, CY + Math.sin(am) * 170, 17, 0, TAU); x.fill()
      x.fillStyle = '#d4532e'; x.beginPath(); x.arc(CX + Math.cos(am) * 170, CY + Math.sin(am) * 170, 13, 0, TAU); x.fill()
    }
    chalkText(x, t, { text: 'MARS: 1 LAP|≈ *687 DAYS*', x: B.x1 - 14, y: B.y0 + 80, at: L[1] + 1.0, size: 30, align: 'right', accent: '#ff9a6a' })
    // beat 2: the astrology meaning, with arrows
    chalkText(x, t, { text: 'IN ASTROLOGY:|MARS = *DRIVE*', x: B.x1 - 14, y: B.y0 + 210, at: L[2] + 0.3, size: 28, align: 'right', accent: EX.lilac })
    chalkLine(x, t, { pts: [[620, 860], [700, 860]], at: L[3] + 0.3, dur: 0.3, color: EX.chalkYellow, width: 5, arrow: true })
    chalkText(x, t, { text: 'GOING AFTER IT', x: 716, y: 860, at: L[3] + 0.5, size: 22, cps: 30 })
    chalkLine(x, t, { pts: [[620, 910], [650, 890], [670, 925], [700, 905]], at: L[3] + 1.0, dur: 0.3, color: EX.chalkPink, width: 5 })
    chalkText(x, t, { text: 'FACING CONFLICT', x: 716, y: 910, at: L[3] + 1.2, size: 22, cps: 30 })
  },
  cues: T => [
    ...chalkCues(r3(T.L[1] + 1.0), 'MARS: 1 LAP = 687 DAYS'),
    ...chalkCues(r3(T.L[2] + 0.3), 'MARS = DRIVE'),
    ...chalkCues(r3(T.L[3] + 0.5), 'GOING AFTER IT', { cps: 30 }),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
