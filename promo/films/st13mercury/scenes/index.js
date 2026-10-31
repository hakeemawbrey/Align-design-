// st13mercury (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E08) · story 0–25.6, then the end card.
//   ❓ "Why does *Mercury* run your texts?"  Teacher: ☿ MERCURY (a small grey-silver star with wing pixels).
//   Student: ♌ LEO, phone in hand. THE BOARD: a chalk Sun with Mercury's tight orbit (✓ closest planet to the Sun, ✓ one
//   orbit every 88 days, the Mercury dot lapping the Earth dot), then chat bubbles (✦ in astrology, how you think and talk).
//   Lightbulb: "so: think, THEN text. wild concept." Last line (Leo): "Mind your *messages*."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { drawPhone } from '../../st8cast.js'
import { chalkCircle, chalkLine, EX } from '../../stexplain.js'
import { makeEpisode, R, INK } from './classkit.js'

const LEO = signStar('leo')
const SILVER = '#c3c8d6'

// Mercury: a small silver star with little white wings off its top point
function drawMercury(ctx, x, y, size, t, o = {}) {
  const r = drawStarChar(ctx, x, y, size, t, { color: SILVER, glyph: '☿', ...o })
  const pop = o.pop ?? 1
  if (pop <= 0.05) return r
  const c = Math.max(3, Math.round(size * pop / 36)), flap = Math.floor(t * 6) % 2
  const WING = flap ? ['...XX', '.XXXX', 'XXXX.', 'XXX..'] : ['.....', 'XXXXX', '.XXXX', '..XX.']
  for (const s of [-1, 1]) {
    const ox = r.x + s * size * pop * 0.2, oy = r.top + size * pop * 0.2
    WING.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch !== 'X') return
      const ii = s > 0 ? i : -i - 1
      R(ctx, INK, ox + ii * c - 2, oy + j * c - 2, c + 4, c + 4)
    }))
    WING.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch !== 'X') return
      const ii = s > 0 ? i : -i - 1
      R(ctx, j === 1 ? '#ffffff' : '#e3e8f4', ox + ii * c, oy + j * c, c, c)
    }))
  }
  return r
}

const EP = makeEpisode({
  id: 'st13mercury', numeral: 'S13 E08', duration: 30, key: 'F',
  q: 'Why does *Mercury* | run your texts?', qAccent: '#dfe6f5',
  teacher: { tag: '☿ MERCURY', color: SILVER, accent: '#dfe6f5', pitch: 880, size: 210, draw: drawMercury, pointer: true },
  student: { tag: '♌ LEO', color: LEO.color, glyph: LEO.glyph, pitch: 523,
    prop: (x, r, t, T) => drawPhone(x, r.x - 112, r.y + 30, 96, t, { text: t < T.M.astro ? 'typing…' : 'hmm.', buzz: clamp(1 - Math.abs(t - 0.4) / 0.4) * 0.8, rot: -0.2 }) },
  boardTitle: 'MERCURY 101',
  lines: [
    ['student', 'why does Mercury get blamed for my *texts?*'],
    ['teacher', 'sky fact: I’m the *closest* planet to the Sun.', { tag: 'sky', mark: 'close' }],
    ['teacher', 'and the fastest. one lap every *88 days.*', { tag: 'sky', mark: 'fast' }],
    ['teacher', 'in astrology, I’m how you *think and talk.*', { tag: 'astro', mark: 'astro' }],
    ['student', 'so: think, THEN text. *wild concept.*', { bulb: true }],
  ],
  items: ['*Closest* planet to the Sun', 'One lap every *88* days', 'Astrology: how you *talk*'],
  last: 'Mind your *messages*.', lastWho: 'student',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'happy' }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    if (ph === 1 || ph === 2) return [{ mood: 'happy', look: [1, -1] }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 3) return [{ mood: 'wink', look: [1, 0] }, { mood: 'neutral', look: [-1, -1] }]
    if (ph === 4) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [0, 0] }]
  },
  chalk: M => [
    { text: 'SUN', at: M.close + 0.5, u: 0.14, v: 0.83, size: 32, align: 'center', color: EX.chalkYellow },
    { text: 'MERCURY:', at: M.close + 0.9, u: 0.52, v: 0.18, size: 40 },
    { text: '*CLOSEST*', at: M.close + 1.4, u: 0.52, v: 0.29, size: 40 },
    { text: '1 LAP =', at: M.fast + 0.3, u: 0.52, v: 0.43, size: 40 },
    { text: '*88 DAYS*', at: M.fast + 0.7, u: 0.52, v: 0.55, size: 48 },
    { text: 'THINK + *TALK*', at: M.astro + 1.0, u: 0.52, v: 0.93, size: 38 },
  ],
  board(x, t, B, M) {
    const sx = B.x0 + 0.14 * (B.x1 - B.x0), sy = B.y0 + 0.52 * (B.y1 - B.y0)
    // the Sun (a chalk disc with rays)
    chalkCircle(x, t, { x: sx, y: sy, r: 34, at: M.close - 0.1, dur: 0.5, color: EX.chalkYellow, width: 7 })
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4
      chalkLine(x, t, { pts: [[sx + Math.cos(a) * 44, sy + Math.sin(a) * 44], [sx + Math.cos(a) * 56, sy + Math.sin(a) * 56]], at: M.close + 0.3 + i * 0.03, dur: 0.15, color: EX.chalkYellow, width: 5 })
    }
    // orbits: Mercury (tight, highlighted), then Venus and Earth as dashed arcs
    const rM = 92, rV = 150, rE = 205
    chalkCircle(x, t, { x: sx, y: sy, r: rM, at: M.close + 0.2, dur: 0.6, color: EX.chalk, width: 6 })
    chalkCircle(x, t, { x: sx, y: sy, r: rV, at: M.close + 0.5, dur: 0.6, color: 'rgba(244,241,232,0.45)', width: 4, from: -1.1, sweep: 2.2 })
    chalkCircle(x, t, { x: sx, y: sy, r: rE, at: M.close + 0.6, dur: 0.6, color: 'rgba(159,220,255,0.6)', width: 4, from: -0.9, sweep: 1.8 })
    // the planets: Mercury laps fast once the "88 days" line lands (about four laps per Earth lap)
    if (t > M.close + 0.7) {
      const run = Math.max(0, t - M.fast)
      const aE = -0.5 + run * 0.35, aM = -0.5 + run * 0.35 * 4.15
      const mx = sx + Math.cos(aM) * rM, my = sy + Math.sin(aM) * rM
      const k = clamp(prog(t, M.close + 0.7, M.close + 1.0))
      x.save(); x.globalAlpha *= k
      R(x, INK, mx - 13, my - 13, 26, 26); R(x, SILVER, mx - 10, my - 10, 20, 20); R(x, '#ffffff', mx - 10, my - 10, 8, 6)
      if (Math.abs(Math.sin(aE)) < 0.88 && Math.cos(aE) > 0.4) {
        const ex = sx + Math.cos(aE) * rE, ey = sy + Math.sin(aE) * rE
        R(x, INK, ex - 11, ey - 11, 22, 22); R(x, EX.chalkBlue, ex - 8, ey - 8, 16, 16)
      }
      x.restore()
    }
    // the astrology beat: two chalk chat bubbles, one with a thinking "…"
    const bx = B.x0 + 0.53 * (B.x1 - B.x0), by = B.y0 + 0.75 * (B.y1 - B.y0)
    const bubble = (x0, y0, w, h, at, tailLeft) => chalkLine(x, t, {
      pts: [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], tailLeft ? [x0 + 40, y0 + h] : [x0 + w - 20, y0 + h], tailLeft ? [x0 + 14, y0 + h + 22] : [x0 + w - 6, y0 + h + 22], tailLeft ? [x0 + 22, y0 + h] : [x0 + w - 44, y0 + h], [x0, y0 + h], [x0, y0]],
      at, dur: 0.5, color: EX.chalkPink, width: 5 })
    bubble(bx + 120, by - 8, 110, 48, M.astro + 0.1, true)
    bubble(bx + 250, by - 22, 120, 56, M.astro + 0.4, false)
    for (let i = 0; i < 3; i++) if (t > M.astro + 0.7 + i * 0.12) R(x, EX.chalk, bx + 150 + i * 22, by + 14, 9, 9)
  },
  cues: T => [['pop', T.M.fast + 0.7, 1567.98, 0.035, 0.3], ['pop', T.M.fast + 0.8, 2093, 0.03, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
