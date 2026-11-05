// kcie09: CAUGHT IN 4K, "Capricorn scheduled a feelings slot" (short, hard cut, music: cinematic · Dm). Rows: m02.md #9
// World time w:
//   0.0  the office. The crush (Libra) walks past and waves: "hi!". Capricorn: heart eyes for 0.4 s, then a stern squint.
//   1.4  the calendar opens. Capricorn types a new block: FEEL FEELINGS · 3:00–3:15.
//   3.1  = the freeze (frame 0): mid-type, the block on screen.
//   3.6  the wall clock hits 3:00, an alarm: Capricorn feels EVERYTHING at once (hearts, wobble). Pisces in the next cubicle
//        sobs on schedule too. 5.4 3:15 alarm: back to work. 5.9 a heart leaks out at 3:16.
//   6.5  Capricorn drags the block down to the end of the day. Last line 7.2: "Extending the meeting. Indefinitely." Cut 8.8.
import {
  makeCaught, room, furn, star, pisces, bubble, sticker, label, box, R, drawBits, sparkles, hearts, HEART,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, INTER, MONO,
} from '../../kcie01/caughtkit.js'

const C = 3.1, END = 8.8
const CAP = { x: 290, y: 1290, s: 300 }, PIS = { x: 900, y: 1580, s: 180 }
const MON = { cx: 690, cy: 840, w: 560, h: 520 }
const HRS = w => w < 3.6 ? 2 + 0.98 * (w / 3.6) : w < 5.4 ? 3 + 0.25 * prog(w, 3.6, 5.4) : 3.25 + 0.0278 * (w - 5.4)
const BLOCKS = [[1.0, 1.75, 'budget review', '#7fb3e8'], [2.0, 2.5, 'inbox zero', '#9fe6b0'], [3.5, 3.9, '1:1 with myself', '#c9a6ff']]

function calendar(x, w) {
  const { cx, cy, w: W, h: H } = MON
  box(x, cx - W / 2, cy - H / 2, W, H, '#2a2148', { b: 8 })
  const sx = cx - W / 2 + 16, sy = cy - H / 2 + 16, sw = W - 32, sh = H - 32
  R(x, '#f6f3ea', sx, sy, sw, sh)
  R(x, '#3a4a6c', sx, sy, sw, 50); label(x, 'TODAY', sx + 20, sy + 26, { size: 26, col: BONE, align: 'left', shadow: false })
  const y0 = sy + 70, hh = 120, hy = h => y0 + (h - 1) * hh
  for (let h = 1; h <= 4; h++) { R(x, '#d8d2c2', sx + 80, hy(h), sw - 90, 3); label(x, `${h}:00`, sx + 12, hy(h) + 4, { size: 22, col: '#6b6458', align: 'left', shadow: false }) }
  BLOCKS.forEach(([a, b, txt, col]) => { box(x, sx + 96, hy(a) + 4, sw - 120, (b - a) * hh - 8, col, { b: 3 }); label(x, txt, sx + 112, hy(a) + 22, { size: 22, col: INK, align: 'left', shadow: false, font: INTER, weight: 700 }) })
  // the new block: 3:00–3:15 (typed), then dragged to the end of the day
  if (w > 1.6) {
    const ext = ease.inOutCubic(prog(w, 6.5, 7.1))
    const top = hy(3), hgt = lerp(0.25 * hh, hy(4.85) - hy(3), ext)
    box(x, sx + 96, top + 2, sw - 120, hgt, '#ff8fa0', { b: 4 })
    const txt = 'FEEL FEELINGS · 3:00–3:15'.slice(0, Math.floor(clamp((w - 1.8) / 1.2) * 26))
    label(x, txt + (w < 3.6 && Math.floor(w * 3) % 2 ? '|' : ''), sx + 110, top + 17, { size: 22, col: INK, align: 'left', shadow: false, font: INTER, weight: 800 })
    if (ext > 0.5) label(x, 'until: ∞', sx + sw / 2 + 30, top + hgt - 30, { size: 30, col: RED, shadow: false, alpha: ext })
  }
}

function world(x, w) {
  room(x, 'office', { fy: 1440 })
  // window strip + plant
  box(x, 60, 300, 380, 260, BONE, { b: 6 }); const g = x.createLinearGradient(0, 316, 0, 544); g.addColorStop(0, '#8fd0f6'); g.addColorStop(1, '#ffe2b8'); x.fillStyle = g; x.fillRect(74, 314, 352, 232)
  // the wall clock
  const hrs = HRS(w)
  furn.clock(x, 920, 400, 66, hrs % 12, (hrs % 1) * 60)
  if (w > 3.6 && w < 4.4) label(x, '3:00', 920, 510, { size: 40, col: RED, alpha: pop01(w, 3.6, 0.2, 3) })
  if (w > 5.4 && w < 6.0) label(x, '3:15', 920, 510, { size: 40, col: RED, alpha: pop01(w, 5.4, 0.2, 3) })
  // the crush walks past and waves
  if (w < 1.6) { const p = prog(w, 0, 1.6); star(x, w, 'libra', { x: lerp(-60, 520, p), y: 680, s: 160, mood: 'happy', look: [1, 0], hops: [0.1, 0.4, 0.7, 1.0, 1.3], seed: 12, glyph: false }); bubble(x, w, lerp(-60, 520, p), 540, 0.3, 1.2, 'hi!', { size: 40 }) }
  // Pisces in the next cubicle
  pisces(x, w, { ...PIS, mood: w > 3.6 && w < 5.4 ? 'sparkle' : 'happy', look: [-1, 0], tears: w > 3.6 && w < 5.6 ? 3 : 1, hops: [3.7, 4.0, 4.3] })
  bubble(x, w, 880, 1380, 3.75, 5.3, 'it’s 3:00!!', { size: 34, col: '#bfe9ff', tail: 0.2 })
  // the desk + monitor
  furn.desk(x, 520, 1210, 760)
  R(x, INK, MON.cx - 20, MON.cy + MON.h / 2, 40, 140)
  calendar(x, w)
  // Capricorn
  let mood = 'neutral', look = [1, -0.4], squash = 0
  if (w < 0.3) look = [-1, -0.5]
  if (w > 0.35 && w < 0.8) { mood = 'heart'; look = undefined }
  if (w > 0.8 && w < 1.4) { mood = 'squint'; look = [0, 0] }
  if (w > 1.4 && w < 3.6) { mood = 'squint'; look = [1, -0.6] }
  if (w > 3.6 && w < 5.4) { mood = 'heart'; look = undefined; squash = 0.1 * Math.sin(w * 16) }
  if (w > 5.4 && w < 6.5) { mood = 'neutral'; look = [1, -0.6] }
  if (w > 5.9 && w < 6.5) mood = 'wide'
  if (w > 6.5) { mood = 'happy'; look = [1, -0.4] }
  star(x, w, 'capricorn', { ...CAP, mood, look, squash, hops: [0.4, 1.45, 3.65, 3.95, 4.25, 4.55, 4.85, 5.15, 5.45, 6.55, 7.25], seed: 5 })
  if (w > 3.6 && w < 5.5) { hearts(x, w, 3.65, CAP.x, CAP.y - 150, { n: 5, spread: 200 }); hearts(x, w, 4.4, CAP.x, CAP.y - 150, { n: 5, spread: 200 }); sticker(x, w, 400, 1050, 3.7, 5.35, 'feeling *EVERYTHING*', { size: 44, col: GOLD, rot: -0.05 }) }
  if (w > 5.9 && w < 6.9) { const p = prog(w, 5.9, 6.9); drawBits(x, HEART, { H: '#ff5c8a' }, CAP.x + 60 * p, CAP.y - 160 - 200 * p, 8) ; label(x, '3:16', CAP.x + 140, CAP.y - 250, { size: 34, col: PINK, alpha: 1 - p * 0.5 }) }
  if (w > 6.5) sparkles(x, w, MON.cx, MON.cy + 100, 6.6, 10, 200, 2)
}

const EP = makeCaught({
  id: 'kcie09', sign: 'capricorn', name: 'Capricorn',
  hook: 'Scheduled *fifteen minutes* | to have feelings.', hookColor: '#ff8fa0',
  earlier: '1 HOUR EARLIER', clockAt: w => { const h = 12 + HRS(w); const sec = Math.floor(h * 3600); return `${String(Math.floor(sec / 3600)).padStart(2, '0')}:${String(Math.floor(sec / 60) % 60).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}` },
  catches: [{ s: 0, c: C, circle: () => ({ x: CAP.x, y: CAP.y - 10, rx: 200, ry: 205, lx: 60, ly: 1595, labelSide: 1 }) }],
  ending: 'cut', wEnd: END, lastAt: 7.2,
  last: 'Extending the meeting. | *Indefinitely.*', lastColor: '#ff8fa0',
  world,
  cues: [
    ['pop', 0.3, 880, 0.04, -0.4], ['pluck', 0.4, 1318.51, 0.04, 0.4, -0.4], ['pop', 0.85, 330, 0.04, 0],
    ['whoosh', 1.4, 0.3, 0.04], ...Array.from({ length: 16 }, (_, i) => ['tick', +(1.8 + i * 0.075).toFixed(3), 0.02]),
    ...Array.from({ length: 6 }, (_, i) => ['bell', +(3.6 + i * 0.12).toFixed(2), i % 2 ? 1760 : 2093, 0.035, 0.3, 0.5]),
    ['glitter', 3.65, 4.3], ['pluck', 3.7, 1174.66, 0.04, 0.6, 0], ['pluck', 4.4, 1567.98, 0.035, 0.6, 0],
    ...Array.from({ length: 4 }, (_, i) => ['bell', +(5.4 + i * 0.12).toFixed(2), i % 2 ? 1760 : 2093, 0.03, 0.3, 0.5]), ['pop', 5.45, 330, 0.04, 0],
    ['pop', 5.9, 1318.51, 0.03, -0.3], ['riser', 6.5, 7.1, 0.035], ['pop', 7.1, 1174.66, 0.05, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, MONO, outK]
