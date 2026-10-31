// st13retroreal (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E09) · story 0–40.6, then the end card.
//   ❓ "Do planets *really* go backwards?"  Teacher: ♄ SATURN (pointer). Student: ♊ GEMINI, mid retrograde panic (sweat).
//   THE BOARD: "NO. IT'S APPARENT MOTION" (✓), a two-lane chalk highway seen from Earth's car: the slower outer-planet car
//   seems to slide backwards as Earth passes it (✓), a 12-box year strip with three marks (✓ Mercury looks retrograde
//   about three times a year), then REVIEW, not PANIC (✦ how astrologers read it).
//   Lightbulb: "so: re-read the text. don't flee the country." Last line (Gemini): "It only *looks* backwards."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { drawSaturn } from '../../st5cast.js'
import { chalkLine, EX } from '../../stexplain.js'
import { drawSweat } from './props.js'
import { makeEpisode, R, INK } from './classkit.js'

const GEM = signStar('gemini')

function car(x, cx, cy, body, roof, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  R(x, INK, cx - 52, cy - 34, 104, 46); R(x, INK, cx - 30, cy - 52, 60, 24)
  R(x, body, cx - 48, cy - 30, 96, 38); R(x, roof, cx - 26, cy - 48, 52, 20); R(x, '#bfe9ff', cx - 18, cy - 44, 36, 12)
  R(x, INK, cx - 38, cy + 4, 22, 18); R(x, INK, cx + 16, cy + 4, 22, 18); R(x, '#8a86a0', cx - 34, cy + 8, 14, 10); R(x, '#8a86a0', cx + 20, cy + 8, 14, 10)
  R(x, '#fff2a8', cx + 40, cy - 22, 8, 8)
  x.restore()
}

const EP = makeEpisode({
  id: 'st13retroreal', numeral: 'S13 E09', duration: 45, key: 'Bbm',
  q: 'Do planets *really* | go backwards?', qAccent: '#ffd36e',
  teacher: { tag: '♄ SATURN', color: '#f7dca0', accent: '#f7dca0', pitch: 330, size: 250,
    draw: (ctx, x, y, s, t, o) => drawSaturn(ctx, x, y, s * 1.2, t, { ...o, rot: -0.18 }) },
  student: { tag: '♊ GEMINI', color: GEM.color, glyph: GEM.glyph, pitch: 740,
    prop: (x, r, t, T) => { const k = 1 - clamp(prog(t, T.M.road + 2, T.M.road + 2.6)); if (k > 0) { drawSweat(x, t, r.x - r.size * 0.42, r.top + r.size * 0.12, 6, k); drawSweat(x, t + 0.45, r.x + r.size * 0.36, r.top + r.size * 0.2, 5, k) } } },
  boardTitle: 'RETROGRADE 101',
  lines: [
    ['student', 'MERCURY IS GOING *BACKWARDS.* do I hide?!'],
    ['teacher', 'breathe. short answer: *no.*', { tag: 'sky', mark: 'no' }],
    ['teacher', 'retrograde is *apparent* motion.', { mark: 'app' }],
    ['teacher', 'Earth passes a slower *outer* planet…', { tag: 'sky', mark: 'road' }],
    ['teacher', '…like passing a car on the *highway.*', { mark: 'hwy' }],
    ['student', 'so it’s not reversing. we’re just *faster.*'],
    ['teacher', 'Mercury looks retrograde about *3x a year.*', { tag: 'sky', mark: 'cal' }],
    ['teacher', 'astrologers read it as a time to *review.*', { tag: 'astro', mark: 'astro' }],
    ['teacher', 'not a reason to *panic.*', { mark: 'panic' }],
    ['student', 'so: re-read the text. don’t *flee the country.*', { bulb: true }],
  ],
  items: ['It’s *apparent* motion', 'Like *passing* a car', 'Astrology: time to *review*'],
  last: 'It only *looks* backwards.', lastWho: 'student',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'neutral' }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 0) return [{ mood: 'squint', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (ph === 1 || ph === 2) return [{ mood: 'happy', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 3 || ph === 4) return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
    if (ph === 5) return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, -1] }]
    if (ph === 6 || ph === 7) return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
    if (ph === 8) return [{ mood: 'happy', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    if (ph === 9) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [0, 0] }]
  },
  chalk: M => [
    { text: 'NO.', at: M.no + 0.9, u: 0.0, v: 0.17, size: 56, color: EX.chalkYellow },
    { text: 'IT’S *APPARENT* MOTION', at: M.app + 0.4, u: 0.17, v: 0.17, size: 38 },
    { text: '← SEEMS TO SLIDE BACK', at: M.hwy + 1.2, u: 0.99, v: 0.77, size: 26, color: EX.chalkPink, align: 'right' },
    { text: 'MERCURY: ~3x A YEAR', at: M.cal + 0.9, u: 0.0, v: 0.8, size: 28 },
    { text: '*REVIEW*', at: M.astro + 1.0, u: 0.6, v: 0.88, size: 42 },
    { text: 'PANIC', at: M.panic + 0.1, u: 0.84, v: 0.88, size: 34, color: 'rgba(244,241,232,0.7)' },
  ],
  board(x, t, B, M) {
    const W = B.x1 - B.x0, H = B.y1 - B.y0, U = u => B.x0 + u * W, V = v => B.y0 + v * H
    // the highway, seen from Earth's car: the lane dashes stream left, Earth's car keeps pace, the outer car drifts back
    const hk = clamp(prog(t, M.road, M.road + 0.4))
    if (hk > 0) {
      x.save(); x.globalAlpha *= hk
      for (const v of [0.37, 0.7]) R(x, 'rgba(244,241,232,0.8)', U(0), V(v) - 2, W, 4)
      const run = Math.max(0, t - M.road)
      for (let i = 0; i < 12; i++) { const dx = ((i * 90 - run * 260) % 1080 + 1080) % 1080 - 80; if (dx > -40 && dx < W - 20) R(x, 'rgba(244,241,232,0.6)', U(0) + dx, V(0.535) - 2, 44, 4) }
      // the stars far behind the outer lane (they stay put)
      for (let i = 0; i < 9; i++) R(x, EX.chalkYellow, U(0.06 + i * 0.105), V(0.31 + (i % 2) * 0.02), 5, 5)
      const ox = 0.08 + ((0.78 - run * 0.045) % 0.84 + 0.84) % 0.84
      car(x, U(ox), V(0.49), '#e8945a', '#c96a3a')
      car(x, U(0.52), V(0.66) + Math.sin(t * 18) * 1.5, '#6fa8ff', '#4f7fd8')
      x.font = "700 22px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillStyle = EX.chalk
      x.fillText('OUTER PLANET', U(ox), V(0.49) - 66)
      x.textAlign = 'right'; x.fillText('EARTH', U(0.52) - 66, V(0.66) - 6)
      x.restore()
    }
    // the year: twelve boxes, three marked
    for (let i = 0; i < 12; i++) {
      const bx = U(0.0) + i * 30, by = V(0.89)
      chalkLine(x, t, { pts: [[bx, by], [bx + 24, by], [bx + 24, by + 24], [bx, by + 24], [bx, by]], at: M.cal + 0.1 + i * 0.03, dur: 0.15, width: 3, color: 'rgba(244,241,232,0.7)' })
      if (i % 4 === 1 && t > M.cal + 1.6 + i * 0.06) R(x, EX.chalkPink, bx + 5, by + 5, 14, 14)
    }
    // PANIC, struck out
    chalkLine(x, t, { pts: [[U(0.83), V(0.88)], [U(0.99), V(0.88)]], at: M.panic + 0.9, dur: 0.3, color: EX.red, width: 7 })
  },
  cues: T => [['snare', T.M.panic + 0.9, { gain: 0.05, tone: 300, decay: 0.08, snappy: 0.9, rev: 0.1 }]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
