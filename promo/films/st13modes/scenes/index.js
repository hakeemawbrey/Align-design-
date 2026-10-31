// st13modes (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E13) · story 0–25.6, then the end card.
//   ❓ "Cardinal, fixed, mutable: *what*?"  Teacher: ♑ CAPRICORN (the whistle, one blast per mode). Student: ♊ GEMINI.
//   THE BOARD: three chalk columns, an arrow, a block and a wave (✦ cardinal signs start, fixed signs hold, mutable signs
//   adapt), then the season strip (✓ each season begins as the Sun enters a cardinal sign: spring Aries, summer Cancer,
//   autumn Libra, winter Capricorn; Northern Hemisphere seasons).
//   Lightbulb: "so it's a relay. start, hold, pass it on." Last line (Gemini): "Start. Hold. *Flow*."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, EX } from '../../stexplain.js'
import { drawWhistle, whistleCue } from './props.js'
import { makeEpisode } from './classkit.js'

const CAP = signStar('capricorn'), GEM = signStar('gemini')
const blasts = M => [M.card + 0.9, M.fix + 0.45, M.fix + 1.25]

const EP = makeEpisode({
  id: 'st13modes', numeral: 'S13 E13', duration: 30, key: 'A',
  q: 'Cardinal, fixed, mutable: | *what*?', qAccent: '#ffe27a',
  teacher: { tag: '♑ CAPRICORN', color: CAP.color, glyph: CAP.glyph, pitch: 392,
    prop: (x, r, t, T) => { let b = 0; for (const v of blasts(T.M)) b = Math.max(b, clamp(1 - Math.abs(t - v - 0.15) / 0.3)); drawWhistle(x, r.x + r.size * 0.44, r.y + r.size * 0.12, 6, { blow: b }) } },
  student: { tag: '♊ GEMINI', color: GEM.color, glyph: GEM.glyph, pitch: 784 },
  boardTitle: 'THE 3 MODES',
  lines: [
    ['student', 'cardinal? fixed? mutable? is this *a sport?*'],
    ['teacher', 'in astrology, cardinal signs *start.*', { tag: 'astro', mark: 'card' }],
    ['teacher', 'fixed signs *hold.* mutable signs *adapt.*', { mark: 'fix' }],
    ['teacher', 'and each season starts as the Sun *enters one.*', { tag: 'sky', mark: 'sea' }],
    ['student', 'so it’s a relay. start, hold, *pass it on.*', { bulb: true }],
  ],
  items: ['Cardinal *starts*', 'Fixed holds, mutable *adapts*'],
  last: 'Start. Hold. *Flow*.', lastWho: 'student',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'squint' }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 0) return [{ mood: 'squint', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (ph === 1 || ph === 2) return [{ mood: 'neutral', look: [1, -1] }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 3) return [{ mood: 'happy', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
    if (ph === 4) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [0, 0] }]
  },
  chalk: M => {
    const [b1, b2, b3] = blasts(M)
    return [
      { text: 'CARDINAL', at: b1 - 0.5, u: 1 / 6, v: 0.36, size: 32, align: 'center', cps: 28 },
      { text: '*START*', at: b1 + 0.1, u: 1 / 6, v: 0.47, size: 40, align: 'center', cps: 28 },
      { text: 'FIXED', at: b2 - 0.3, u: 0.5, v: 0.36, size: 32, align: 'center', cps: 28 },
      { text: '*HOLD*', at: b2 + 0.1, u: 0.5, v: 0.47, size: 40, align: 'center', cps: 28 },
      { text: 'MUTABLE', at: b3 - 0.3, u: 5 / 6, v: 0.36, size: 32, align: 'center', cps: 28 },
      { text: '*ADAPT*', at: b3 + 0.1, u: 5 / 6, v: 0.47, size: 40, align: 'center', cps: 28 },
      ...[['SPRING|*ARIES*', 0], ['SUMMER|*CANCER*', 1], ['AUTUMN|*LIBRA*', 2], ['WINTER|*CAPRICORN*', 3]].map(([text, i]) =>
        ({ text, at: M.sea + 0.6 + i * 0.45, u: 0.125 + i * 0.25, v: 0.69, size: 30, align: 'center', cps: 34, lineH: 1.35 })),
      { text: '(NORTHERN HEMISPHERE SEASONS)', at: M.sea + 2.4, u: 0.5, v: 0.92, size: 24, align: 'center', cps: 40, color: 'rgba(244,241,232,0.75)' },
    ]
  },
  board(x, t, B, M) {
    const W = B.x1 - B.x0, H = B.y1 - B.y0, U = u => B.x0 + u * W, V = v => B.y0 + v * H
    const [b1, b2, b3] = blasts(M)
    // the three icons: an arrow (starts), a block (holds), a wave (adapts)
    chalkLine(x, t, { pts: [[U(1 / 6) - 60, V(0.2)], [U(1 / 6) + 60, V(0.2)]], at: b1 - 0.6, dur: 0.35, arrow: true, color: EX.chalkPink, width: 7 })
    chalkLine(x, t, { pts: [[U(0.5) - 34, V(0.2) - 30], [U(0.5) + 34, V(0.2) - 30], [U(0.5) + 34, V(0.2) + 30], [U(0.5) - 34, V(0.2) + 30], [U(0.5) - 34, V(0.2) - 30]], at: b2 - 0.4, dur: 0.35, color: EX.chalkBlue, width: 7 })
    chalkLine(x, t, { pts: Array.from({ length: 17 }, (_, i) => [U(5 / 6) - 64 + i * 8, V(0.2) + Math.sin(i * 0.8) * 20]), at: b3 - 0.4, dur: 0.35, color: EX.chalkGreen, width: 7 })
    // the divider and the season strip
    chalkLine(x, t, { pts: [[U(0.02), V(0.58)], [U(0.98), V(0.58)]], at: M.sea + 0.2, dur: 0.4, width: 3, color: 'rgba(244,241,232,0.45)' })
    for (let i = 1; i < 4; i++) chalkLine(x, t, { pts: [[U(i * 0.25), V(0.63)], [U(i * 0.25), V(0.84)]], at: M.sea + 0.4 + i * 0.1, dur: 0.2, width: 3, color: 'rgba(244,241,232,0.35)' })
  },
  cues: T => blasts(T.M).flatMap(v => whistleCue(+v.toFixed(3), 0.22)),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
