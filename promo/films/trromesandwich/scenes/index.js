// trromesandwich: MY ROMAN EMPIRE, "The sandwich." (20 s vertical, Star Talk Trends §7.2, music: cinematic · Dm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./rome.js (identical in all five episodes).
//   0.0–3.7   "What's your | *Roman Empire?*"  Columns rise; ♉ Taurus (laurel wreath) stands on a plinth and dreams.
//   3.9–7.4   "Mine? | *The sandwich.*"  On the drop a marble sandwich half (diagonal cut, gold-leaf filling) booms up.
//             The inscription carves on: “WANT HALF?” / DATE ONE · SHARED LUNCH. Taurus's mouth waters (drool drip).
//   7.5–11.0  "Every. *Single.* | Day."  7:02 AM toast. *not the same.* · 12:30 PM every lunch: *is this it?*
//             · 3:00 AM dreaming in *crumbs* (Taurus asleep on its feet).
//  11.2       card cut.
//  11.3–13.4 "Cut *diagonally.*"  Taurus now holds its own little sandwich half: "they cut it *diagonally*. who does that?!"
//  13.45–15.5 "An *empire* | of crumbs."  Gold crumbs rain down over the temple; Pisces fountains.
import { makeEpisode, R, INK, GOLD, drawBits, MARBLE } from './rome.js'

// a sandwich half, diagonal cut, stacked like the emoji: a bread triangle, a frilly leaf, a tomato band, the bottom slice
function wedge(w, h, { crust = 'm', bread = 'M', leaf = 'G', tom = 'g', hi = 'W' } = {}) {
  const rows = []
  for (let j = 0; j < h; j++) {
    const n = Math.max(1, Math.round((j + 1) * w / h))
    let r = ''
    for (let i = 0; i < w; i++) r += i >= n ? '.' : (i === 0 || i >= n - 1 || j === 0) ? crust : (i === 1 && j > 1 ? hi : (i * 7 + j * 3) % 23 === 0 ? 'v' : bread)
    rows.push(r)
  }
  rows.push(Array.from({ length: w }, (_, i) => i % 3 === 2 ? '.' : leaf).join(''))
  rows.push(leaf.repeat(w))
  rows.push(tom.repeat(w))
  rows.push(Array.from({ length: w }, (_, i) => i === 0 || i === w - 1 ? crust : bread).join(''))
  rows.push(crust.repeat(w))
  return rows
}
const STATUE = wedge(22, 13)
const SMALL = wedge(8, 5, { leaf: 'l', tom: 'p', crust: 'c', bread: 'b', hi: 'b' })
const SMALL_COLS = { c: '#c98a3e', b: '#f6e2b0', l: '#7fd36a', p: '#ff6f6f', v: '#e9cf98' }

// the crumbs that rain on the last line (deterministic)
const CRUMBS = Array.from({ length: 46 }, (_, i) => ({ x: (i * 211 + 37) % 1080, d: (i * 0.137) % 0.9, sp: 520 + (i * 53) % 380, s: 8 + (i % 4) * 4, c: ['#e9cf98', GOLD, '#c98a3e', '#f6e2b0'][i % 4], w: (i % 5) - 2 }))

const EP = makeEpisode({
  id: 'trromesandwich', key: 'Dm', seed: 702,
  hero: { sign: 'taurus', lineColor: '#9fe6b0' },
  h1: 'Mine? | *The sandwich.*', h1Accent: '#ffd27a', h1Late: 2,
  h3: 'Cut *diagonally.*', h3Accent: '#9fe6b0',
  last: 'An *empire* | of crumbs.', lastLate: 1, lastAccent: GOLD,
  mon: { bits: STATUE, cell: 12, inscription: ['“WANT HALF?”', 'DATE ONE · SHARED LUNCH'], size1: 34, size2: 22 },
  stickers: [
    { time: '7:02 AM', text: 'toast. *not the same.*' },
    { time: '12:30 PM', text: 'every lunch: *is this it?*' },
    { time: '3:00 AM', text: 'asleep. dreaming in *crumbs*.' },
  ],
  line: { who: 'hero', text: 'they cut it *diagonally*. who does that?!' },
  moods(ph, t, T) {
    if (ph === 'mon' && t > 5.9) return { mood: 'sparkle', look: [0, -1] }
    if (ph === 'daily' && t > T.stk[2]) return { mood: 'sleepy' }
    if (ph === 'twist') return t > T.lineDone ? { mood: 'heart' } : { mood: 'wide', look: [0, 0] }
    return null
  },
  heroProp(x, F, t, T) {
    // drool while it gazes at the statue
    if (t > 5.9 && t < T.h2) {
      const ph = ((t - 5.9) * 0.9) % 1
      x.fillStyle = INK; x.fillRect(22.6, 25.5, 1.6, 1.5 + ph * 4 + 0.4)
      x.fillStyle = '#8fe3ff'; x.fillRect(22.9, 25.8, 1, 1 + ph * 4)
    }
  },
  front(x, t, T, ctx) {
    // the twist: Taurus holds its own little sandwich half (diagonal, of course)
    if (ctx.hero && t > T.cut && t < T.out[1]) {
      const k = Math.min(1, (t - T.cut) / 0.3)
      const F = ctx.hero.F
      drawBits(x, SMALL, { ...MARBLE, ...SMALL_COLS }, F.ox + F.S * 0.47, F.oy - F.S * 0.4, 7 * k, { rot: -0.2 + 0.05 * Math.sin(t * 3) })
    }
    // the last line: a rain of gold crumbs
    const tt = t - T.lastLand + 0.05
    if (tt > 0 && t < T.out[1]) {
      x.save(); x.globalAlpha = 1 - Math.max(0, (t - T.out[0]) / (T.out[1] - T.out[0]))
      for (const c of CRUMBS) {
        const u = tt - c.d; if (u < 0) continue
        const y = -20 + u * c.sp + 0.5 * 900 * u * u * 0.3
        if (y > 1940) continue
        R(x, INK, c.x + c.w * u * 40 - 3, y - 3, c.s + 6, c.s + 6); R(x, c.c, c.x + c.w * u * 40, y, c.s, c.s)
      }
      x.restore()
    }
  },
  cues: T => [
    ['pluck', 6.0, 392, 0.03, 0.4, 0.1], ['pluck', 6.9, 392, 0.025, 0.4, 0.1],
    ['tick', T.stk[2] + 0.4, 0.02], ['tick', T.stk[2] + 0.75, 0.02],
    ['whoosh', T.cut + 0.05, 0.3, 0.02], ['pop', T.cut + 0.15, 1174.66, 0.035, 0.3],
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.lastLand + 0.1 + i * 0.09).toFixed(3), 0.02 + (i % 3) * 0.006]),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
