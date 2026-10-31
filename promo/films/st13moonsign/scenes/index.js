// st13moonsign (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E04) · story 0–25.6, then the end card.
//   ❓ "Why does my *Moon* sign matter?"  ☽ THE MOON teaches ♋ CANCER at the chalkboard:
//   ✓ the Moon moves fast: it crosses a whole sign in about two and a half days (a chalk zodiac ring with a little Moon
//     lapping it, slice by slice);
//   ✦ in astrology the Moon is feelings and what comforts you.
//   💡 Cancer: "so my Moon is my blanket fort." Last line (the Moon): "Feelings have a *sign* too."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. The Moon is ./kit.js (copied
// from st12sunsign, which copied it from st8auction). Pure f(t).
import { prog } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, EX } from '../../stexplain.js'
import { drawMoonChar, MOON } from './kit.js'
import { makeEpisode, r3, R, INK } from './classkit.js'

const CAN = signStar('cancer')
const TAU = Math.PI * 2
const CX = 380, CY = 770, RR = 150

const moonTeacher = (x, X, Y, s, t, o = {}) => {
  const r = drawMoonChar(x, X, Y, s * 0.46, t, { mood: o.mood === 'squint' ? 'neutral' : o.mood, look: o.look || [0, 0], hops: o.hops, seed: 3 })
  return { x: X, y: r.y, top: r.top }
}

const EP = makeEpisode({
  id: 'st13moonsign', numeral: 'S13 E04', duration: 30, key: 'Eb',
  q: 'Why does my *Moon* sign matter?', qAccent: '#d9d0ff',
  teacher: { tag: MOON.tag, color: MOON.color, accent: '#d9d0ff', pitch: 523, size: 250, draw: moonTeacher },
  student: { tag: '♋ CANCER', color: CAN.color, pitch: 698,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: CAN.color, glyph: CAN.glyph, ...o }) },
  board: { title: 'THE MOON SIGN' },
  lines: [
    ['s', 'i know my sun sign. why ask my *Moon*?'],
    ['t', 'Because I\'m *fast*. Watch me lap the zodiac.', { tag: 'sky' }],
    ['t', 'I cross a whole sign in about *2½ days*.'],
    ['t', 'In astrology, I\'m your *feelings*,', { tag: 'astro' }],
    ['t', 'and what *comforts* you on a hard day.'],
    ['s', 'so my Moon is my *blanket fort*.', { bulb: true }],
  ],
  recap: ['A new sign every *2½ days*', 'Astrology: your *feelings*', 'And what *comforts* you'],
  last: 'Feelings have a *sign* too.', lastWho: 't',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (t >= T.recap) return [{ mood: 'happy' }, { mood: 'happy' }]
    if (i === 5) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    if (i === 1) return [{ mood: 'happy', look: [1, -1] }, { mood: 'wide', look: [-1, -1] }]
    if (i >= 3) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'heart', look: [-1, 0] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    chalkCircle(x, t, { x: CX, y: CY, r: RR, at: L[1], dur: 0.8, width: 6 })
    chalkCircle(x, t, { x: CX, y: CY, r: RR - 56, at: L[1] + 0.3, dur: 0.6, width: 4, alpha: 0.7 })
    for (let k = 0; k < 12; k++) {
      const a = -Math.PI / 2 + k * TAU / 12
      chalkLine(x, t, { pts: [[CX + Math.cos(a) * (RR - 56), CY + Math.sin(a) * (RR - 56)], [CX + Math.cos(a) * RR, CY + Math.sin(a) * RR]], at: L[1] + 0.5 + k * 0.05, dur: 0.12, width: 4 })
    }
    // the little Moon lapping the ring, hopping slice to slice, the slices it has visited lit up
    if (t >= L[1] + 1.0) {
      const steps = (t - L[1] - 1.0) * 2.2
      const n = Math.floor(steps), f = steps - n
      const hop = Math.min(1, f / 0.35)
      for (let k = 0; k <= Math.min(n, 11); k++) {
        const a0 = -Math.PI / 2 + k * TAU / 12
        x.save(); x.globalAlpha *= 0.22; x.fillStyle = '#d9d0ff'
        x.beginPath(); x.arc(CX, CY, RR - 2, a0, a0 + TAU / 12); x.arc(CX, CY, RR - 54, a0 + TAU / 12, a0, true); x.fill(); x.restore()
      }
      const a = -Math.PI / 2 + (n % 12 + 0.5 + hop) * TAU / 12, r = RR - 28
      const mx = CX + Math.cos(a) * r, my = CY + Math.sin(a) * r - Math.sin(Math.PI * hop) * 14
      x.fillStyle = INK; x.beginPath(); x.arc(mx, my, 18, 0, TAU); x.fill()
      x.fillStyle = '#efeaff'; x.beginPath(); x.arc(mx, my, 14, 0, TAU); x.fill()
      x.fillStyle = '#c8bfe3'; R(x, '#c8bfe3', mx - 6, my - 4, 5, 5); R(x, '#c8bfe3', mx + 3, my + 4, 4, 4)
    }
    chalkText(x, t, { text: 'ZOOM', x: CX, y: CY - 10, at: L[1] + 1.0, size: 30, align: 'center', color: EX.chalkBlue })
    chalkText(x, t, { text: '1 SIGN ≈|*2½ DAYS*', x: B.x1 - 10, y: CY - 150, at: L[2] + 0.5, size: 30, align: 'right' })
    // beat 2: the astrology meaning, with a little pixel blanket fort
    chalkText(x, t, { text: 'IN ASTROLOGY:|MOON = *FEELINGS*|+ *COMFORT*', x: B.x1 - 10, y: CY + 20, at: L[3] + 0.4, size: 28, align: 'right', accent: EX.lilac })
    const fk = prog(t, L[5] + 0.2, L[5] + 0.6)
    if (fk > 0) {
      x.save(); x.globalAlpha *= fk
      const fx = 650, fy = 900
      chalkLine(x, t, { pts: [[fx - 90, fy + 30], [fx, fy - 50], [fx + 90, fy + 30]], at: L[5] + 0.2, dur: 0.4, color: EX.chalkPink, width: 6 })
      chalkLine(x, t, { pts: [[fx - 110, fy + 30], [fx + 110, fy + 30]], at: L[5] + 0.5, dur: 0.3, color: EX.chalkPink, width: 6 })
      chalkText(x, t, { text: 'FORT', x: fx, y: fy + 4, at: L[5] + 0.6, size: 22, align: 'center', color: EX.chalkPink })
      x.restore()
    }
  },
  cues: T => [
    ...chalkCues(r3(T.L[2] + 0.5), '1 SIGN = 2.5 DAYS'),
    ...chalkCues(r3(T.L[3] + 0.4), 'MOON = FEELINGS + COMFORT'),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
