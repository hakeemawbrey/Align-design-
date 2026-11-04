// nc14e07: CUFFING SEASON, "Virgo's cuffing spreadsheet" (45 s vertical, Season 14 ep 7, music: house · C).
// Story 0–40.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
//   0.0–9.0    "Virgo made a | cuffing *spreadsheet.*"  Frame 0: Virgo mid-keystroke under a giant pixel spreadsheet.
//              Columns WARM HANDS · TEXTS BACK · LIKES SOUP · GOOD BLANKET; rows Taurus, Capricorn, Aquarius,
//              Sagittarius. The ticks fill in, cell by cell (Sag's row: "eventually", "lost it").
//   9.0–17.0   "Every box | *checked.*"  Capricorn's row goes 4/4: PERFECT MATCH. Virgo's heart monitor: flat.
//              VIRGO: "perfect score. so why am I… *not* excited?"  Pisces cries in the corner.
//  17.0        card cut.
//  17.0–26.3   "Then *this* | happened."  Sagittarius trips in; cocoa splats across the sheet. Sag: "oops!! hi!!"
//              Virgo gasps… then laughs out loud; the monitor spikes. NO COLUMN FOR THIS.
//              THE STARS: "a list can find *nice*." → "only you can find *yours*."
//  26.3–31.3   ★ LESSON UNLOCKED "Make the list. | Then *listen to yourself.*"  chip "+1 NEW COLUMN"
//  31.3–40.6   "New column: | *how I feel.*"  Virgo types a fifth header, HOW I FEEL; Sag's row gets a big heart.
//              Tie-in: DEALBREAKERS stay for the real dealbreakers.
//              THE STARS: "Some things don't fit *in a cell.*"
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, drawBits, HEART, mug,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, COCOA, signStar,
} from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [8.8, 9.0], ticks: 0.6,
  b2: 9.0, h1: 9.15, h1Out: [16.8, 17.0], perfect: 10.0,
  cut: 17.0, h2: 17.15, h2Out: [26.1, 26.3], trip: [17.4, 18.1], splat: 18.15, gasp: 18.3, laugh: 19.6,
  lesson: 26.4, lessonOut: [31.0, 31.3],
  b4: 31.3, h3: 31.45, newCol: [32.0, 33.2], heart: 33.4, deal: 33.9, last: 34.6,
}
const SP = 'THE STARS', VI = '♍︎ VIRGO'
const B1 = [{ t: 11.9, speaker: VI, color: '#ff9cc0', text: 'perfect score. so why am I… *not* excited?' }]
const B2 = [
  { t: 21.4, speaker: SP, text: 'a list can find *nice*.' },
  { t: 23.2, speaker: SP, text: 'only you can find *yours*.' },
]
const B3 = [{ t: T.last, speaker: SP, text: "Some things don't fit *in a cell.*" }]
const COLS = ['WARM|HANDS', 'TEXTS|BACK', 'LIKES|SOUP', 'GOOD|BLANKET', 'HOW I|FEEL']
const ROWS = ['taurus', 'capricorn', 'aquarius', 'sagittarius']
// cell values: 1 tick, 0 cross, string = a note
const VALS = [[1, 1, 0, 1], [1, 1, 1, 1], [1, 0, 1, 1], [1, 'eventually', 1, 'lost it']]
const SH = { x: 60, y: 520, w: 960, nameW: 200, head: 96, row: 118 }
const colW = (SH.w - SH.nameW) / 5

function sheetGrid(x, t, K) {
  const { x: X, y: Y, w, nameW, head, row } = SH
  box(x, X, Y, w, head + row * 4, '#f4f0e6', { b: 8 })
  R(x, '#2e8a5a', X, Y, w, head)
  for (let c = 0; c < 5; c++) {
    const cx = X + nameW + c * colW
    R(x, INK, cx - 2, Y, 4, head + row * 4)
    const show = c < 4 || t > T.newCol[0]
    if (!show) { R(x, '#d8d2c4', cx + 2, Y + head, colW - 2, row * 4); continue }
    let lines = COLS[c].split('|')
    if (c === 4) { const n = Math.floor(clamp(prog(t, ...T.newCol)) * 10); const s = 'HOW I FEEL'.slice(0, n); lines = [s.slice(0, 5), s.slice(5)] }
    lines.forEach((ln, j) => label(x, ln, cx + colW / 2, Y + 30 + j * 34, { size: 24, col: BONE, font: 'Inter, sans-serif', weight: 800 }))
    if (c === 4 && t > T.newCol[0] && t < T.newCol[1] + 0.3 && Math.floor(t * 4) % 2) R(x, BONE, cx + colW / 2 + 40, Y + 62, 4, 26)
  }
  for (let r = 0; r < 4; r++) {
    const ry = Y + head + r * row
    R(x, INK, X, ry - 2, w, 4)
    const hl = r === 1 && t > T.perfect && t < T.cut
    if (hl) R(x, 'rgba(242,199,92,0.45)', X, ry + 2, w, row - 2)
    K.star(x, t, ROWS[r], { x: X + 62, y: ry + row / 2 + 4, s: 84, mood: r === 3 && t > T.laugh ? 'happy' : 'neutral', bob: 0, tips: false, glow: 0.4, seed: r })
    label(x, signStar(ROWS[r]).glyph + '︎', X + 140, ry + row / 2, { size: 40, col: INK, font: 'serif', weight: 400 })
    for (let c = 0; c < 4; c++) {
      const at = T.ticks + (r * 4 + c) * 0.32
      const k = easeOutBack(prog(t, at, at + 0.2), 2.4)
      if (k <= 0) continue
      const cx = X + nameW + c * colW + colW / 2, cy = ry + row / 2, v = VALS[r][c]
      x.save(); x.translate(cx, cy); x.scale(k, k)
      if (v === 1) drawBits(x, ['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....'], { G: '#2e8a5a' }, 0, 0, 7)
      else if (v === 0) drawBits(x, ['R...R', '.R.R.', '..R..', '.R.R.', 'R...R'], { R: RED }, 0, 0, 7)
      else label(x, v, 0, 0, { size: 22, col: '#7a5aa8', font: 'Inter, sans-serif', weight: 800 })
      x.restore()
    }
  }
  // cocoa splats
  if (t > T.splat) {
    const sp = ease.outCubic(prog(t, T.splat, T.splat + 0.25))
    for (let i = 0; i < 9; i++) {
      const sx = X + 260 + ((i * 197) % 640), sy = Y + head + 40 + ((i * 113) % 380), r0 = (26 + (i * 17) % 30) * sp
      x.fillStyle = INK; x.beginPath(); x.arc(sx, sy, r0 + 5, 0, 7); x.fill(); x.fillStyle = COCOA; x.beginPath(); x.arc(sx, sy, r0, 0, 7); x.fill()
      R(x, COCOA, sx - 4, sy, 8, r0 * 1.6 * clamp(prog(t, T.splat + 0.3, T.splat + 1.5)))
    }
  }
  if (t > T.heart) drawBits(x, HEART, { H: '#ff4f86' }, X + nameW + 4 * colW + colW / 2, Y + head + 3 * row + row / 2, 12 * easeOutBack(prog(t, T.heart, T.heart + 0.35), 2.4))
}
function monitor(x, t, cx, cy) {
  box(x, cx - 170, cy - 90, 340, 180, '#0e1a14', { b: 7 })
  label(x, 'HEART', cx - 110, cy - 64, { size: 20, col: MINT })
  x.save(); x.beginPath(); x.rect(cx - 160, cy - 80, 320, 160); x.clip()
  x.strokeStyle = MINT; x.lineWidth = 5; x.lineJoin = 'miter'; x.beginPath()
  for (let i = 0; i < 120; i++) {
    const u = i / 119, tt = t - (1 - u) * 1.6
    let v = 0
    if (tt > T.laugh) { const ph = ((tt - T.laugh) * 3) % 1; v = ph < 0.3 ? Math.sin(ph / 0.3 * Math.PI * 2) * 62 : 0; if (tt < T.laugh + 3) v *= 1.3 }
    else if (tt < T.perfect) { const ph = (tt * 1.2) % 1; v = ph < 0.25 ? Math.sin(ph / 0.25 * Math.PI * 2) * 22 : 0 }
    if (i) x.lineTo(cx - 160 + u * 320, cy + 10 - v); else x.moveTo(cx - 160, cy + 10 - v)
  }
  x.stroke()
  x.restore()
  if (t > T.perfect + 0.6 && t < T.cut) label(x, 'flat.', cx + 100, cy + 60, { size: 24, col: MINT })
}

function scene(x, t, K) {
  const ok = popOut(t, K.OUT)
  R(x, '#1e1b36', 0, 1300, 1080, 620); R(x, '#2a2548', 0, 1300, 1080, 12)
  sheetGrid(x, t, K)
  monitor(x, t, 790, 1340)
  // the desk + keyboard
  box(x, 80, 1440, 560, 30, '#a07850', { b: 6 }); box(x, 180, 1400, 260, 30, '#3a3560', { b: 5 })
  for (let i = 0; i < 8; i++) R(x, ((Math.floor(t * 10) + i) % 5) === 0 && t < 7 ? GOLD : '#5a5480', 192 + i * 31, 1406, 24, 18)
  const vm = t < T.perfect ? 'squint' : t < T.gasp ? 'neutral' : t < T.laugh ? 'wide' : t < T.cut + 0.2 ? 'happy' : t > T.b4 ? 'sparkle' : 'happy'
  const laughHops = Array.from({ length: 8 }, (_, i) => T.laugh + i * 0.22)
  const typeHops = Array.from({ length: 12 }, (_, i) => 0.2 + i * 0.5)
  K.star(x, t, 'virgo', { x: 320, y: 1270, s: 230, pop: ok, mood: vm, look: t < T.cut ? [0.3, -1] : t < T.laugh ? [1, -0.4] : undefined, hops: [...typeHops, ...K.hopsFor(VI), T.gasp, ...laughHops, T.newCol[0], T.heart], seed: 10, scarf: MINT })
  if (t > T.newCol[0] && t < T.newCol[1]) for (let i = 0; i < 8; i++) R(x, ((Math.floor(t * 14) + i) % 3) === 0 ? GOLD : '#5a5480', 192 + i * 31, 1406, 24, 18)
  // PERFECT MATCH sticker
  if (t > T.perfect && t < T.cut) {
    const k = easeOutBack(prog(t, T.perfect, T.perfect + 0.3), 2.6) * outK(t, [T.cut - 0.2, T.cut])
    x.save(); x.translate(900, 700); x.rotate(0.14); x.scale(k, k); box(x, -150, -46, 300, 92, GOLD, { b: 7 }); label(x, 'PERFECT MATCH', 0, 2, { size: 30, col: INK, font: 'Inter, sans-serif', weight: 800 }); x.restore()
  }
  // Sag trips in with cocoa
  if (t > T.trip[0] - 0.4) {
    const tr = ease.inCubic(prog(t, T.trip[0] - 0.4, T.trip[0] + 0.3)), roll = prog(t, T.trip[0] + 0.3, T.trip[1])
    const sx = t < T.trip[1] ? lerp(1250, 760, tr) : 760, sy = t < T.trip[1] ? 1180 - Math.sin(Math.PI * roll) * 140 : 1180
    x.save(); x.translate(sx, sy); x.rotate(t < T.trip[1] ? -roll * Math.PI * 2 : 0); x.translate(-sx, -sy)
    K.star(x, t, 'sagittarius', { x: sx, y: sy, s: 200, pop: ok * outK(t, [T.b4 - 0.3, T.b4]) + (t > T.b4 ? ok : 0) * 0, mood: t < T.gasp + 0.3 ? 'wide' : 'happy', look: [-1, 0], hops: [T.trip[1], T.laugh, T.laugh + 0.5], seed: 13, scarf: GOLD })
    x.restore()
    if (t < T.trip[0] + 0.3) mug(x, t, sx - 120, 1080, 0.8, { col: '#e86a5a' })
    if (t > T.trip[0] + 0.3 && t < T.splat) { const p = prog(t, T.trip[0] + 0.3, T.splat); for (let i = 0; i < 6; i++) R(x, COCOA, lerp(660, 520 + i * 60, p), lerp(1080, 760, p) - Math.sin(p * Math.PI) * 200, 18, 18) }
    bubble(x, t, 820, 960, T.splat + 0.3, T.cut + 3.6, 'oops!! hi!!', { size: 38, col: '#e6d6ff' })
  }
  if (t > T.laugh && t < T.lesson) {
    label(x, 'HA', 220 + 30 * Math.sin(t * 9), 1000 - ((t - T.laugh) * 120) % 200, { size: 48, col: '#ff9cc0', font: 'Inter, sans-serif', weight: 800 })
    const nk = pop01(t, T.laugh + 0.8, 0.3, 2.4) * outK(t, [21.2, 21.4])
    if (nk > 0.01) { x.save(); x.translate(540, 1500); x.scale(nk, nk); box(x, -230, -36, 460, 72, RED, { b: 6 }); label(x, 'NO COLUMN FOR THIS', 0, 2, { size: 30, col: BONE, font: 'Inter, sans-serif', weight: 800 }); x.restore() }
  }
  // THE STARS (beat 3)
  if (t > 21.0 && t < T.lesson) K.stars(x, t, { x: 560, y: 1230, s: 150, pop: pop01(t, 21.0, 0.4, 2) * outK(t, [T.lesson - 0.2, T.lesson]), mood: 'happy', look: [-1, -0.6], hops: K.hopsFor(SP) })
  // tie-in: dealbreakers stay for the real ones
  if (t > T.deal) {
    const k = easeOutBack(prog(t, T.deal, T.deal + 0.35), 2) * ok
    x.save(); x.translate(800, 1110); x.rotate(-0.05); x.scale(k, k); box(x, -210, -40, 420, 80, '#2a1f55', { b: 6 }); label(x, 'DEALBREAKERS:', 0, -14, { size: 22, col: GOLD }); label(x, 'only the real ones', 0, 16, { size: 24, col: BONE }); x.restore()
  }
  if (t > T.heart) hearts(x, t, T.heart, 900, 960, { n: 6 })
  // Pisces cries in the corner the whole time (louder at the spike)
  K.pisces(x, t, { x: 990, y: 1170, s: 120, pop: pop01(t, 1.4, 0.3, 2) * (t > 21.0 && t < T.lesson ? 0 : 1) * ok, scarf: ICE }, t > T.laugh ? 3 : t > T.perfect ? 2 : 1, 'sparkle', [-1, -0.6])
  if (t > 21.0 && t < T.lesson) K.pisces(x, t, { x: 140, y: 1640, s: 120, scarf: ICE }, 3, 'sparkle', [1, -0.6])
}

const EP = makeCuff({
  id: 'nc14e07', duration: 45, ep: 7,
  heads: [
    { text: 'Virgo made a | cuffing *spreadsheet.*', at: -1.2, out: T.h0Out, size: 96, accent: '#ff9cc0' },
    { text: 'Every box | *checked.*', at: T.h1, out: T.h1Out, size: 104, accent: GOLD },
    { text: 'Then *this* | happened.', at: T.h2, out: T.h2Out, size: 104, accent: '#c79bff' },
    { text: 'New column: | *how I feel.*', at: T.h3, out: [40.0, 40.3], size: 98, accent: MINT },
  ],
  boxes: [
    { lines: B1, open: 11.7, close: 16.6, y: 1540 },
    { lines: B2, open: 21.2, close: 26.1, y: 1540 },
    { lines: B3, open: T.last - 0.22, close: 39.9, y: 1540 },
  ],
  lesson: { at: T.lesson, out: T.lessonOut, text: 'Make the list. | Then *listen to yourself.*', chip: '+1 NEW COLUMN', accentColor: MINT },
  snow: 0.25,
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b2],
  shakes: [T.splat],
  ghost: { x: 1020, y: 900, at: 14.2, from: 'right', cell: 3 },
  draw(x, t, K) { scene(x, t, K) },
  cues: [
    ...Array.from({ length: 16 }, (_, i) => ['pop', +(T.ticks + i * 0.32).toFixed(3), [880, 987.77, 1174.66, 1318.51][i % 4], 0.025, ((i % 4) - 1.5) * 0.3]),
    ...Array.from({ length: 18 }, (_, i) => ['tick', +(0.1 + i * 0.36).toFixed(3), 0.018]),
    ['pop', T.perfect, 1318.51, 0.05, 0.3], ['pop', T.perfect + 0.08, 1760, 0.04, 0.3], ['bell', T.perfect + 0.1, 2349.32, 0.025, 1, 0.3],
    ['pluck', T.perfect + 0.8, 440, 0.03, 0.8, 0.4],
    ['whoosh', T.trip[0] - 0.4, 0.5, 0.05], ['tom', T.trip[0] + 0.3, 100, { gain: 0.2, decay: 0.2 }], ['whoosh', T.trip[0] + 0.35, 0.4, 0.04],
    ['pop', T.splat + 0.3, 987.77, 0.04, 0.3], ['pluck', T.gasp, 1318.51, 0.035, 0.3, -0.3],
    ...Array.from({ length: 8 }, (_, i) => ['pop', +(T.laugh + i * 0.22).toFixed(3), [1174.66, 1318.51][i % 2], 0.03, -0.3]),
    ['riser', T.laugh, T.laugh + 0.8, 0.02], ['pop', T.laugh + 0.8, 739.99, 0.045, 0],
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.newCol[0] + i * 0.12).toFixed(3), 0.025]),
    ['pop', T.heart, 1174.66, 0.045, 0.4], ['glitter', T.heart, T.heart + 0.4], ['pop', T.deal, 880, 0.035, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, glow, sparkles, ICE, PINK]
