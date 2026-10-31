// st13sunsign (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E03) · story 0–25.6, then the end card.
//   ❓ "What *is* a sun sign, actually?"  ☀ THE SUN teaches ♊ GEMINI at the chalkboard:
//   ✓ your sun sign is where the Sun appeared along the zodiac when you were born; it moves into a new sign about once a
//     month (a chalk zodiac ring, a "you were born" pin, the little Sun stepping one slice);
//   ✦ in astrology the Sun is your core self.
//   💡 Gemini: "so my sign is a place. like a map pin!" Last line (the Sun): "Your birthday's *address* in the sky."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. The Sun is ./kit.js (copied
// from st12sunsign). Pure f(t).
import { prog, ease } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, EX } from '../../stexplain.js'
import { drawSun } from './kit.js'
import { makeEpisode, r3, INK } from './classkit.js'

const GEM = signStar('gemini')
const TAU = Math.PI * 2
const CX = 390, CY = 770, RR = 170

// the Sun as a teacher: a pixel disc (≈ 35 cells across) with the same hop curve feel as the stars
function sunTeacher(x, X, Y, s, t, o = {}) {
  const cell = Math.max(3, Math.round(s / 40))
  let lift = 0
  for (const h of o.hops || []) { const d = t - h; if (d >= 0 && d < 0.4) lift = Math.max(lift, Math.sin(Math.PI * d / 0.4)) }
  const y = Y + Math.sin(t * 2 + 1) * 6 - lift * 16
  const eyes = o.mood === 'happy' ? 'happy' : o.mood === 'squint' ? 'half' : 'open'
  drawSun(x, X, y, cell, t, { eyes, look: o.look || [0, 0], rot: Math.sin(t * 0.8) * 0.06, wink: o.mood === 'wink' ? 1 : 0 })
  return { x: X, y, top: y - cell * 18 }
}

const EP = makeEpisode({
  id: 'st13sunsign', numeral: 'S13 E03', duration: 30, key: 'A',
  q: 'What *is* a sun sign, actually?', qAccent: EX.chalkYellow,
  teacher: { tag: '☀ THE SUN', color: '#ffc94d', accent: '#ffd76a', pitch: 392, size: 240, draw: sunTeacher },
  student: { tag: '♊ GEMINI', color: GEM.color, pitch: 784,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: GEM.color, glyph: GEM.glyph, ...o }) },
  board: { title: 'THE SUN SIGN' },
  lines: [
    ['s', 'everyone asks my sign. which one *is* it?'],
    ['t', 'Where I *appeared* in the zodiac at your birth.', { tag: 'sky' }],
    ['t', 'I move into a new sign about *once a month*.'],
    ['t', 'In astrology, I stand for your *core self*.', { tag: 'astro' }],
    ['s', 'so my sign is a *place*. like a map pin!', { bulb: true }],
    ['s', 'cool. *both* of me live there.', { hold: 1.5 }],
  ],
  recap: ['Where the *Sun* was at birth', 'New sign about *monthly*', 'Astrology: your *core self*'],
  last: 'Your birthday\'s *address* in the sky.', lastWho: 't',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (t >= T.recap) return [{ mood: 'happy' }, { mood: 'happy' }]
    if (i === 5) return [{ mood: 'wink', look: [1, 0] }, { mood: 'wink', look: [-1, 0] }]
    if (i === 4) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    if (i === 0) return [{ mood: 'wide', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    // the zodiac ring: 12 slices
    chalkCircle(x, t, { x: CX, y: CY, r: RR, at: L[1], dur: 0.8, width: 6 })
    chalkCircle(x, t, { x: CX, y: CY, r: RR - 56, at: L[1] + 0.3, dur: 0.6, width: 4, alpha: 0.7 })
    for (let k = 0; k < 12; k++) {
      const a = -Math.PI / 2 + k * TAU / 12
      chalkLine(x, t, { pts: [[CX + Math.cos(a) * (RR - 56), CY + Math.sin(a) * (RR - 56)], [CX + Math.cos(a) * RR, CY + Math.sin(a) * RR]], at: L[1] + 0.5 + k * 0.05, dur: 0.12, width: 4 })
    }
    chalkText(x, t, { text: 'THE *ZODIAC*', x: CX, y: CY - 10, at: L[1] + 0.9, size: 26, align: 'center' })
    // the little Sun on your birthday's slice, then stepping one slice on (about a month later)
    const slice = k => -Math.PI / 2 + (k + 0.5) * TAU / 12
    const step = ease.inOutCubic(prog(t, L[2] + 0.4, L[2] + 1.4))
    if (t >= L[1] + 0.9) {
      const a = slice(2) + step * TAU / 12, r = RR - 28
      const sx = CX + Math.cos(a) * r, sy = CY + Math.sin(a) * r
      x.fillStyle = INK; x.beginPath(); x.arc(sx, sy, 20, 0, TAU); x.fill()
      x.fillStyle = '#ffd34d'; x.beginPath(); x.arc(sx, sy, 16, 0, TAU); x.fill()
    }
    // the "you were born" pin on the starting slice
    const pa = slice(2), px = CX + Math.cos(pa) * (RR + 26), py = CY + Math.sin(pa) * (RR + 26)
    chalkLine(x, t, { pts: [[px + 150, py - 70], [px + 8, py - 4]], at: L[1] + 1.2, dur: 0.4, color: EX.chalkPink, width: 5, arrow: true })
    chalkText(x, t, { text: 'YOU WERE|*BORN* HERE', x: px + 160, y: py - 110, at: L[1] + 1.5, size: 26, color: EX.chalkPink, accent: EX.chalkYellow })
    // beat 1b: one slice ≈ one month
    chalkText(x, t, { text: '1 SLICE ≈|*1 MONTH*', x: B.x1 - 10, y: CY + 10, at: L[2] + 1.0, size: 28, align: 'right' })
    // beat 2: the astrology meaning
    chalkText(x, t, { text: 'IN ASTROLOGY:|SUN = *CORE SELF*', x: B.x1 - 10, y: B.y1 - 70, at: L[3] + 0.4, size: 28, align: 'right', accent: EX.lilac })
  },
  cues: T => [
    ...chalkCues(r3(T.L[1] + 1.5), 'YOU WERE BORN HERE'),
    ...chalkCues(r3(T.L[2] + 1.0), '1 SLICE = 1 MONTH'),
    ...chalkCues(r3(T.L[3] + 0.4), 'SUN = CORE SELF'),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
