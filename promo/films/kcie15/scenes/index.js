// kcie15: CAUGHT IN 4K, "Aquarius explained lighthouses for forty minutes" (short, hard cut, music: synthwave · B). Rows: m02.md #15
// World time w:
//   0.0  a first date. The date (Capricorn): "so what are you into?"  1.2 Aquarius: "LIGHTHOUSES."
//   1.6  NAPKIN 1: the tower. 2.6 NAPKIN 2: the lens. 3.6 NAPKIN 3: the beam. The minute counter: 5… 20… 40. The date's eyes glaze.
//   4.4  = the freeze (frame 0): mid-gesture, three napkins, MIN 40.
//   5.0  the date leans in: "wait. so how does the LENS work?"  6.2 Aquarius: heart eyes. Pisces at the next table cries
//        "they found their person". 7.3 the date pulls out a napkin of their own. Last line 7.9. Hard cut 9.5.
import {
  makeCaught, room, furn, star, pisces, bubble, sticker, label, box, R, sparkles, hearts,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, SKYB, INTER, MONO,
} from '../../kcie01/caughtkit.js'

const C = 4.4, END = 9.5
const AQ = { x: 290, y: 1230, s: 290 }, DT = { x: 800, y: 1230, s: 280 }, PIS = { x: 940, y: 930, s: 140 }
const NAP = [[1.6, 400, 880, -0.12, 'tower'], [2.6, 560, 820, 0.06, 'lens'], [3.6, 700, 900, 0.14, 'beam']]

function napkin(x, w, t0, cx, cy, rot, kind) {
  if (w < t0) return
  const k = pop01(w, t0, 0.3, 2.4)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -100, -100, 200, 200, '#ffffff', { b: 4 }); x.strokeStyle = '#2c2a7a'; x.lineWidth = 5; x.beginPath()
  const d = clamp((w - t0) / 0.6)
  if (kind === 'tower') { x.moveTo(-30, 80); x.lineTo(-15, -40); x.lineTo(15, -40); x.lineTo(30, 80); x.closePath(); x.moveTo(-25, -40); x.lineTo(0, -70); x.lineTo(25, -40); if (d > 0.5) { x.moveTo(-20, 20); x.lineTo(20, 20); x.moveTo(-24, 50); x.lineTo(24, 50) } }
  if (kind === 'lens') { x.ellipse(0, 0, 50 * d, 70, 0, 0, Math.PI * 2); x.moveTo(-90, -30); x.lineTo(-50, -10); x.moveTo(-90, 30); x.lineTo(-50, 10); x.moveTo(50, 0); x.lineTo(90, 0) }
  if (kind === 'beam') { x.moveTo(-70, 40); x.lineTo(80, -60 * d); x.moveTo(-70, 40); x.lineTo(80, 20 * d); R(x, GOLD, -80, 30, 22, 22) }
  x.stroke(); x.restore()
}

function world(x, w) {
  room(x, 'cafe', { fy: 1420 })
  // window with the sea + a lighthouse (of course)
  box(x, 60, 360, 600, 380, '#2a1714', { b: 8 }); const g = x.createLinearGradient(0, 376, 0, 724); g.addColorStop(0, '#120c33'); g.addColorStop(1, '#2a4a7a'); x.fillStyle = g; x.fillRect(76, 376, 568, 348)
  R(x, '#1a2c55', 76, 640, 568, 84); R(x, BONE, 540, 540, 30, 100); R(x, RED, 540, 570, 30, 16); R(x, GOLD, 536, 520, 38, 22)
  x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,230,150,0.18)'; x.beginPath(); const a = w * 1.4; x.moveTo(555, 530); x.lineTo(555 + Math.cos(a) * 400, 530 + Math.sin(a) * 60 - 40); x.lineTo(555 + Math.cos(a) * 400, 530 + Math.sin(a) * 60 + 40); x.fill(); x.restore()
  // Pisces at the next table
  box(x, PIS.x - 110, PIS.y + 70, 220, 20, '#6b4a2f', { b: 4 })
  pisces(x, w, { ...PIS, mood: 'sparkle', look: [-1, 0.4], tears: w > 5.0 ? 3 : 1, hops: [5.1, 6.6, 6.9] })
  bubble(x, w, PIS.x - 80, PIS.y - 160, 6.6, END + 1, 'they found|their person', { size: 30, col: '#bfe9ff', tail: 0.4 })
  // the table
  furn.table(x, 540, 1290, 640, '#6b4a2f')
  box(x, 420, 1250, 80, 40, BONE, { b: 4 }); box(x, 600, 1250, 80, 40, BONE, { b: 4 })
  // the date (Capricorn)
  let dm = 'happy', dl = [-1, 0]
  if (w > 2.3 && w < 3.2) dm = 'neutral'
  if (w > 3.2 && w < 5.0) { dm = 'sleepy'; dl = undefined }
  if (w > 5.0 && w < 6.2) { dm = 'wide'; dl = [-1, -0.4] }
  if (w > 6.2) { dm = 'sparkle'; dl = [-1, 0] }
  star(x, w, 'capricorn', { ...DT, mood: dm, look: dl, hops: [0.2, 0.6, 5.0, 5.3, 7.35], seed: 5, zzz: true, blush: w > 6.2 })
  // Aquarius, lecturing
  let am = 'sparkle', al = [1, -0.4]
  if (w < 1.2) { am = 'happy'; al = [1, 0] }
  if (w > 5.0 && w < 6.2) { am = 'wide'; al = [1, 0] }
  if (w > 6.2) { am = 'heart'; al = undefined }
  const gest = w > 1.2 && w < 5.0 ? 0.06 * Math.sin(w * 9) : 0
  star(x, w, 'aquarius', { ...AQ, mood: am, look: al, squash: gest, hops: [1.25, 1.65, 2.0, 2.65, 3.0, 3.65, 4.0, 4.3, 6.25], seed: 7 })
  NAP.forEach(([t0, cx, cy, rot, kind]) => napkin(x, w, t0, cx, cy, rot, kind))
  if (w > 7.3) napkin(x, w, 7.3, 860, 860, -0.1, 'lens')
  bubble(x, w, 760, 930, 0.2, 1.15, 'so what are you into?', { size: 34, tail: 0.1 })
  bubble(x, w, 300, 920, 1.2, 1.55, 'LIGHTHOUSES.', { size: 46, col: GOLD })
  bubble(x, w, 760, 930, 5.0, 6.1, 'wait. so how does|the LENS work?', { size: 34, tail: 0.1, col: '#ffe0a8' })
  // the minute counter
  if (w > 1.6) {
    const m = w < 2.6 ? 5 : w < 3.6 ? 20 : 40
    const k = pop01(w, 1.6, 0.25, 2) * (w > 5.0 ? outK(w, [5.0, 5.2]) : 1)
    x.save(); x.translate(860, 640); x.scale(k, k); box(x, -130, -45, 260, 90, '#160d33', { b: 6 }); label(x, `MIN ${m}`, 0, 3, { size: 48, col: m === 40 ? RED : GOLD }); x.restore()
  }
  if (w > 6.2) { hearts(x, w, 6.25, AQ.x, AQ.y - 150, { n: 6 }); sparkles(x, w, 540, 1000, 7.35, 12, 260, 2) }
}

const EP = makeCaught({
  id: 'kcie15', sign: 'aquarius', name: 'Aquarius',
  hook: 'Minute forty of my | *lighthouse lecture.*', hookColor: '#ffd27a',
  earlier: '40 MINUTES EARLIER', clock0: '20:00', clockScale: 545,
  catches: [{ s: 0, c: C, circle: () => ({ x: AQ.x, y: AQ.y - 10, rx: 200, ry: 205, lx: 50, ly: 1540, labelSide: 1 }) }],
  frame: { z: 1.06, fx: 540, fy: 1000 },
  ending: 'cut', wEnd: END, lastAt: 7.9,
  last: 'Same time next week? | *Bring napkins.*', lastColor: '#ffd27a',
  world,
  cues: [
    ['pop', 0.2, 880, 0.04, 0.3], ['pop', 1.2, 523.25, 0.05, -0.3], ['tom', 1.22, 110, { gain: 0.22, decay: 0.2 }],
    ...NAP.flatMap(([t0], i) => [['whoosh', t0, 0.2, 0.04], ...Array.from({ length: 6 }, (_, j) => ['tick', +(t0 + 0.1 + j * 0.08).toFixed(2), 0.025]), ['pop', t0 + 0.6, [659.25, 783.99, 987.77][i], 0.035, 0.3]]),
    ['pop', 2.6, 1174.66, 0.03, 0.4], ['pop', 3.6, 1318.51, 0.035, 0.4],
    ['pop', 5.0, 1174.66, 0.05, 0.3], ['pop', 5.1, 1567.98, 0.04, 0.3], ['glitter', 6.2, 6.7], ['pluck', 6.25, 1318.51, 0.04, 0.6, -0.3],
    ['pluck', 6.65, 1567.98, 0.03, 0.5, 0.5], ['whoosh', 7.3, 0.2, 0.04], ['bell', 7.4, 1760, 0.03, 1.0, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, SKYB, MONO, lerp, ease]
