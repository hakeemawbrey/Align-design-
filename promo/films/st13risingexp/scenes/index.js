// st13risingexp (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E05) · story 0–40.6, then the end card.
//   ❓ "What does *rising* sign mean?"  ♎ LIBRA teaches ♉ TAURUS at the chalkboard:
//   ✓ the rising sign is the sign coming up over the eastern horizon at the moment you were born (a chalk horizon line
//     sweeps the board; a zodiac wheel turns up past its eastern end, the slice crossing it lit);
//   ✓ it changes about every two hours on average, so birth time matters;
//   ✦ in astrology it's your first impression, the front door (a little pixel door).
//   💡 Taurus: "so i'm a Taurus with a fancy door." Last line (Libra): "Your sky's *first hello*."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, drawPointer, EX } from '../../stexplain.js'
import { makeEpisode, r3 } from './classkit.js'

const LIB = signStar('libra'), TAU_ = signStar('taurus')
const TAU = Math.PI * 2
const CX = 520, CY = 800, RR = 260, HY = 800     // the wheel's hub sits on the horizon

const EP = makeEpisode({
  id: 'st13risingexp', numeral: 'S13 E05', duration: 45, key: 'C',
  q: 'What does *rising* sign mean?', qAccent: EX.chalkBlue,
  teacher: { tag: '♎ LIBRA', color: LIB.color, pitch: 587,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: LIB.color, glyph: LIB.glyph, ...o }),
    prop(x, r, t, T) {
      if (t < T.L[1] || t >= T.recap) return
      let tap = 0
      for (const L of T.L) { const d = t - L - 0.3; if (d > 0 && d < 0.3) tap = Math.sin(Math.PI * d / 0.3) }
      drawPointer(x, r.x + 70, r.y + 10, -0.75, { tap, len: 200 })
    } },
  student: { tag: '♉ TAURUS', color: TAU_.color, pitch: 494,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: TAU_.color, glyph: TAU_.glyph, ...o }) },
  board: { title: 'THE RISING SIGN' },
  lines: [
    ['s', 'my sun is Taurus. but my *rising* is... what?'],
    ['t', 'Picture the *eastern* horizon at your birth.', { tag: 'sky' }],
    ['t', 'The sign coming up over it then: your *rising*.'],
    ['t', 'Earth spins, so the zodiac *rolls* past it.', { tag: 'sky' }],
    ['t', 'On average, a new sign rises every *2 hours*.'],
    ['s', 'so my birth *time* matters??'],
    ['t', 'A lot. That\'s why astrologers *ask* for it.'],
    ['t', 'In astrology, it\'s your *first impression*.', { tag: 'astro' }],
    ['t', 'The *front door* of your chart.'],
    ['s', 'so i\'m a Taurus with a *fancy door*.', { bulb: true }],
  ],
  recap: ['Rising: coming up in the *east*', 'New one about every *2 hours*', 'Astrology: your *front door*'],
  last: 'Your sky\'s *first hello*.', lastWho: 't',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (t >= T.recap) return [{ mood: 'happy' }, { mood: 'happy' }]
    if (i === 5) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (i === 6) return [{ mood: 'wink', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (i === 9) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    // the turning zodiac wheel, clipped to the sky above the horizon (it turns from the start of beat 2)
    const spin = t >= L[3] ? (t - L[3]) * 0.35 : 0
    const wk = clamp(prog(t, L[2], L[2] + 0.6))
    // the slice at the eastern end (left) is the rising one: index of the slice spanning angle π
    const sliceAt = a => { const u = ((a - spin + Math.PI / 2) % TAU + TAU) % TAU; return Math.floor(u / (TAU / 12)) }
    const rising = sliceAt(Math.PI - 0.001)
    if (wk > 0) {
      x.save(); x.globalAlpha *= wk
      x.beginPath(); x.rect(B.x0, B.y0 + 40, B.x1 - B.x0, HY - B.y0 - 40); x.clip()
      // the rising slice, lit
      const a0 = -Math.PI / 2 + spin + rising * TAU / 12
      x.save(); x.globalAlpha *= 0.5; x.fillStyle = EX.chalkYellow
      x.beginPath(); x.moveTo(CX, CY); x.arc(CX, CY, RR, a0, a0 + TAU / 12); x.closePath(); x.fill(); x.restore()
      chalkCircle(x, t, { x: CX, y: CY, r: RR, at: L[2], dur: 0.8, width: 6 })
      for (let k = 0; k < 12; k++) {
        const a = -Math.PI / 2 + spin + k * TAU / 12
        chalkLine(x, t, { pts: [[CX, CY], [CX + Math.cos(a) * RR, CY + Math.sin(a) * RR]], at: L[2] + 0.3 + k * 0.04, dur: 0.12, width: 4 })
      }
      x.restore()
    }
    // the horizon sweeps across (beat 1)
    chalkLine(x, t, { pts: [[B.x0 + 10, HY], [B.x1 - 10, HY]], at: L[1] + 0.2, dur: 0.9, color: EX.chalkGreen, width: 8 })
    chalkText(x, t, { text: 'EASTERN HORIZON', x: B.x0 + 14, y: HY + 40, at: L[1] + 0.9, size: 28, color: EX.chalkGreen })
    // "RISING ↑" at the eastern end
    chalkLine(x, t, { pts: [[CX - RR - 40, HY - 20], [CX - RR - 40, HY - 120]], at: L[2] + 0.8, dur: 0.4, color: EX.chalkYellow, width: 6, arrow: true })
    chalkText(x, t, { text: '*RISING*', x: CX - RR - 40, y: HY - 160, align: 'center', at: L[2] + 1.0, size: 30 })
    // beat 2: the clock
    chalkText(x, t, { text: '≈ NEW SIGN|EVERY *2 HRS*', x: B.x1 - 14, y: B.y0 + 70, at: L[4] + 0.4, size: 28, align: 'right' })
    chalkText(x, t, { text: 'BIRTH *TIME*|MATTERS', x: B.x0 + 14, y: HY + 90, at: L[6] + 0.3, size: 28, color: EX.chalkPink, accent: EX.chalkYellow })
    // beat 3: the front door
    const dk = clamp(prog(t, L[8], L[8] + 0.4))
    if (dk > 0) {
      const dx = 760, dy = HY + 30
      chalkLine(x, t, { pts: [[dx, dy + 120], [dx, dy], [dx + 80, dy], [dx + 80, dy + 120]], at: L[8], dur: 0.5, color: EX.chalkPink, width: 6 })
      chalkCircle(x, t, { x: dx + 62, y: dy + 64, r: 6, at: L[8] + 0.5, dur: 0.2, color: EX.chalkYellow, width: 5 })
    }
    chalkText(x, t, { text: 'FIRST|*IMPRESSION*', x: 740, y: HY + 60, at: L[7] + 0.4, size: 26, align: 'right', accent: EX.lilac })
    void ease
  },
  cues: T => [
    ...chalkCues(r3(T.L[1] + 0.9), 'EAST HORIZON'),
    ...chalkCues(r3(T.L[4] + 0.4), 'NEW SIGN EVERY 2 HRS'),
    ...chalkCues(r3(T.L[6] + 0.3), 'BIRTH TIME MATTERS'),
    ...chalkCues(r3(T.L[7] + 0.4), 'FIRST IMPRESSION'),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
