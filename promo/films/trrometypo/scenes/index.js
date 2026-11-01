// trrometypo: MY ROMAN EMPIRE, "The typo." (20 s vertical, Star Talk Trends §7.4, music: cinematic · Fm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./rome.js (identical in all five episodes).
//   0.0–3.7   "What's your | *Roman Empire?*"  Columns rise; ♍ Virgo (laurel wreath) stands on a plinth and dreams.
//   3.9–7.4   "Mine? | *A typo.*"  On the drop a marble TABLET booms up, carved with Virgo's first message:
//             HI! YOU SEEM / RELLY NICE :)  A red-pen circle scribbles round RELLY; Virgo winces (squint).
//             The pedestal: MY FIRST MESSAGE / ONE TYPO · ETERNAL.
//   7.5–11.0  "Every. *Single.* | Day."  7:02 AM proofreading my *grocery list* · 1:15 PM typing “really”: *slowly*
//             · 3:00 AM drafting an apology *for the typo* (wide awake).
//  11.2       card cut; the hero slides left and ♊ Gemini (the date) steps in on a little plinth.
//  11.3–13.4 "Plot *twist.*"  ♊ GEMINI: "the typo is why I *replied*." Virgo short-circuits, then melts.
//  13.45–15.5 "Let it *go.* | (Never.)"  "(Never.)" lands on the hit. Pisces fountains.
import { makeEpisode, R, INK, GOLD, carved, POS } from './rome.js'

// a stone tablet with a rounded top
function tablet(w, h) {
  const rows = []
  for (let j = 0; j < h; j++) {
    let r = ''
    for (let i = 0; i < w; i++) {
      const dx = (i + 0.5 - w / 2) / (w / 2), arch = j < 4 ? Math.sqrt(Math.max(0, 1 - ((4 - j) / 4.6) ** 2)) : 1
      if (Math.abs(dx) > arch) { r += '.'; continue }
      const edge = Math.abs(dx) > arch - 2.2 / w * 2 || j === h - 1 || (j > 0 && j < 4 && Math.abs(dx) > Math.sqrt(Math.max(0, 1 - ((4 - j + 1) / 4.6) ** 2)) - 0.02)
      r += edge ? 'm' : (j === 1 || j === 2) && Math.abs(dx) < 0.6 ? 'W' : 'M'     // plain face: no veins near the words
    }
    rows.push(r)
  }
  return rows
}
const STATUE = tablet(26, 13)
const CELL = 12
const CIRCLE = 6.0

const EP = makeEpisode({
  id: 'trrometypo', key: 'Fm', seed: 704,
  hero: { sign: 'virgo', lineColor: '#9fe6b0' },
  date: { sign: 'gemini', lineColor: '#ffe27a' },
  h1: 'Mine? | *A typo.*', h1Accent: '#ff7a7a', h1Late: 2,
  h3: 'Plot *twist.*', h3Accent: '#ffe27a',
  last: 'Let it *go.* | (Never.)', lastLate: 1, lastAccent: '#9fe6b0',
  mon: { bits: STATUE, cell: CELL, inscription: ['MY FIRST MESSAGE', 'ONE TYPO · ETERNAL'], size1: 30, size2: 24 },
  monDraw(x, t, T) {
    const h = STATUE.length * CELL, top = POS.mon.pedTop - h - 6
    const f = Math.min(1, Math.max(0, (t - T.land - 0.05) / 0.9))
    carved(x, 'HI! YOU SEEM', POS.mon.cx, top + 66, { size: 34, maxW: 260, frac: Math.min(1, f * 2) })
    carved(x, 'RELLY NICE :)', POS.mon.cx, top + 112, { size: 34, maxW: 260, frac: Math.max(0, f * 2 - 1) })
    // the red-pen circle round RELLY (scribbles on, stays)
    const c = Math.min(1, Math.max(0, (t - CIRCLE) / 0.45))
    if (c > 0) {
      x.save(); x.strokeStyle = '#e8364f'; x.lineWidth = 7; x.lineCap = 'round'
      x.beginPath()
      const cx = POS.mon.cx - 78, cy = top + 110, n = 40
      for (let i = 0; i <= n * c; i++) { const a = -2.4 + (i / n) * Math.PI * 2.25, rr = 1 + 0.06 * Math.sin(i * 0.9); const px = cx + Math.cos(a) * 68 * rr, py = cy + Math.sin(a) * 28 * rr; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke(); x.restore()
    }
  },
  stickers: [
    { time: '7:02 AM', text: 'proofreading my *grocery list*' },
    { time: '1:15 PM', text: 'typing “really”: *slowly*' },
    { time: '3:00 AM', text: 'drafting an apology *for the typo*' },
  ],
  line: { who: 'date', text: 'the typo is why I *replied*.' },
  moods(ph, t, T) {
    if (ph === 'mon' && t > CIRCLE) return { mood: 'squint', look: [0, -1] }
    if (ph === 'daily' && t > T.stk[2]) return { mood: 'wide', look: [0, 0] }
    if (ph === 'twist') {
      if (t < T.lineDone + 0.1) return { mood: 'neutral', look: [1, 0] }
      if (t < T.lineDone + 0.9) return { mood: 'wide', look: [1, 0], squash: 0.12 * Math.sin((t - T.lineDone) * 40) * Math.exp(-(t - T.lineDone) * 3) }
      return { mood: 'heart', look: [1, 0] }
    }
    if (ph === 'last') return { mood: 'heart', look: [1, 0] }
    return null
  },
  dateMoods(t, T) { return t > T.lineDone ? { mood: 'happy', look: [-1, 0] } : { mood: 'wink', look: [-1, 0] } },
  front(x, t, T, ctx) {
    // Virgo short-circuits: little sparks off the top point after the line
    if (!ctx.hero) return
    const p = t - T.lineDone - 0.1
    if (p > 0 && p < 0.8) {
      const F = ctx.hero.F
      for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.45, d = 40 + p * 140; R(x, INK, F.ox + Math.cos(a) * d - 2, F.oy - F.S * 0.9 + Math.sin(a) * d - 2, 12, 12); R(x, i % 2 ? GOLD : '#7fe0ff', F.ox + Math.cos(a) * d, F.oy - F.S * 0.9 + Math.sin(a) * d, 8, 8) }
    }
  },
  cues: T => [
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(CIRCLE + i * 0.07).toFixed(3), 0.03]), ['pluck', CIRCLE + 0.45, 311.13, 0.035, 0.4, 0],
    ['pop', +(T.lineDone + 0.1).toFixed(3), 1760, 0.04, -0.3], ['pop', +(T.lineDone + 0.18).toFixed(3), 2093, 0.035, -0.3], ['pop', +(T.lineDone + 0.26).toFixed(3), 1567.98, 0.03, -0.3],
    ['pluck', +(T.lineDone + 0.9).toFixed(3), 783.99, 0.035, 0.5, -0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
