// kcie08: CAUGHT IN 4K, "Sagittarius planned the trip after one chat" (short, loop, music: house · C). Rows: m02.md #8
// World time w:
//   0.0  Sag bursts in from a party: "we talked for TEN minutes". 1.0 the MAP goes up on the wall; pins + red string.
//   2.6  the itinerary cards (DAY 2: night market, DAY 6: sunrise hike).  3.6 the suitcase packs itself.  5.0 MATCHING luggage.
//        Pisces (the roommate) weeps at the itinerary: "this is so romantic".
//   6.0  the crush texts: "nice meeting you! what was your name again?"  Sag: wide eyes… 7.0 a new pin: DAY 1: LEARN NAME.
//   7.6  Sag spins with joy anyway.  8.2 = the freeze (frame 0), mid-spin. Last line: "Day one: learn their name." Loops.
import {
  makeCaught, room, furn, phone, star, pisces, bubble, sticker, label, box, R, sparkles, hearts, speedLines,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, SKYB, INTER,
} from '../../kcie01/caughtkit.js'

const C = 8.2
const SAG = { x: 330, y: 1300, s: 300 }, PIS = { x: 930, y: 1570, s: 170 }
const PINS = [[260, 600, 1.2, 'DAY 2'], [520, 520, 1.5, 'DAY 4'], [760, 640, 1.8, 'DAY 6'], [880, 520, 2.1, ''], [380, 780, 2.4, '']]
const CARDS = [[300, 960, 2.7, 'day 2: night market'], [760, 960, 3.0, 'day 6: sunrise hike']]

function world(x, w) {
  room(x, 'bedroom', { fy: 1440 })
  // the map on the wall
  const mk = pop01(w, 1.0, 0.35, 2)
  if (mk > 0.01) {
    x.save(); x.translate(540, 660); x.scale(mk, mk); x.translate(-540, -660)
    box(x, 110, 420, 860, 480, '#e9dfc4', { b: 8 })
    x.fillStyle = '#9fd0b0'; for (const [cx, cy, rx, ry] of [[260, 560, 120, 80], [520, 520, 90, 60], [760, 640, 150, 90], [880, 520, 60, 50], [380, 780, 100, 50]]) { x.beginPath(); x.ellipse(cx, cy, rx, ry, 0.3, 0, Math.PI * 2); x.fill() }
    // red string between the pins
    x.strokeStyle = RED; x.lineWidth = 6; x.beginPath()
    PINS.forEach(([px, py, t0], i) => { if (w < t0) return; i ? x.lineTo(px, py) : x.moveTo(px, py) }); x.stroke()
    PINS.forEach(([px, py, t0, lab]) => { if (w < t0) return; const k = pop01(w, t0, 0.2, 3); R(x, INK, px - 14, py - 14, 28, 28); R(x, RED, px - 10, py - 10, 20, 20); if (lab) label(x, lab, px, py - 36, { size: 24, col: INK, shadow: false, alpha: k }) })
    // the new pin: DAY 1: LEARN NAME
    if (w > 7.0) { const k = pop01(w, 7.0, 0.3, 3); x.save(); x.translate(180, 470); x.scale(k, k); box(x, -20, -20, 300, 60, GOLD, { b: 4 }); label(x, 'DAY 1: LEARN NAME', 130, 10, { size: 22, col: INK, shadow: false }); R(x, INK, -14, -14, 28, 28); R(x, RED, -10, -10, 20, 20); x.restore() }
    x.restore()
  }
  // itinerary cards
  CARDS.forEach(([cx, cy, t0, txt], i) => { if (w < t0) return; const k = pop01(w, t0, 0.3, 2.4); x.save(); x.translate(cx, cy); x.rotate(i ? 0.05 : -0.05); x.scale(k, k); box(x, -190, -40, 380, 80, '#fff8ea', { b: 5 }); label(x, txt, 0, 2, { size: 30, col: INK, font: INTER, weight: 800, shadow: false }); x.restore() })
  // the suitcase(s)
  const sk = pop01(w, 3.6, 0.3, 2)
  if (sk > 0.01) {
    x.save(); x.translate(760, 1330); x.scale(sk, sk)
    box(x, -150, -60, 300, 140, '#e8634a', { b: 6, hi: '#f28a6e' }); box(x, -150, -180, 300, 120, '#c94a32', { b: 6 })
    for (let i = 0; i < 5; i++) { const t0 = 3.8 + i * 0.25; if (w < t0) continue; const p = clamp((w - t0) / 0.35); const px = lerp(-400, -100 + i * 50, p), py = lerp(-500, -40, p) - 200 * Math.sin(Math.PI * p); box(x, px, py, 46, 34, [SKYB, GOLD, MINT, PINK, BONE][i], { b: 3 }) }
    x.restore()
    if (w > 5.0) { const k = pop01(w, 5.0, 0.3, 2.4); x.save(); x.translate(960, 1250); x.scale(k * 0.6, k * 0.6); box(x, -150, -60, 300, 140, '#e8634a', { b: 6, hi: '#f28a6e' }); x.restore(); sticker(x, w, 840, 1120, 5.0, 6.0, '*matching* luggage', { size: 36, col: GOLD, rot: 0.05 }) }
  }
  // Pisces the roommate
  const pk = pop01(w, 2.8, 0.3, 2)
  if (pk > 0.01) pisces(x, w, { ...PIS, pop: pk, mood: w > 6.0 && w < 7.0 ? 'wide' : 'sparkle', look: [-1, -0.8], tears: w > 3.3 ? 3 : 2, hops: [2.9, 3.4, 7.7] })
  bubble(x, w, PIS.x - 100, PIS.y - 180, 3.3, 5.9, 'this is so|romantic', { size: 32, col: '#bfe9ff', tail: 0.5 })
  // Sagittarius (spinning at the end)
  let mood = 'sparkle', look = [0.6, -0.8]
  if (w < 1.0) { mood = 'heart'; look = undefined }
  if (w > 6.0 && w < 7.0) { mood = 'wide'; look = [1, -0.2] }
  if (w > 7.0) { mood = 'happy'; look = undefined }
  const spin = w > 7.5 ? (w - 7.5) * 9.7 : 0
  x.save(); x.translate(SAG.x, SAG.y); x.rotate(spin); x.translate(-SAG.x, -SAG.y)
  star(x, w, 'sagittarius', { ...SAG, mood, look, hops: [0.1, 0.4, 1.05, 2.7, 3.65, 5.05, 7.05], seed: 11, shadow: false })
  x.restore()
  if (w > 7.55) { speedLines(x, SAG.x - 120, SAG.y, 160, -1, 5, BONE, 0.7); speedLines(x, SAG.x + 120, SAG.y, 160, 1, 5, BONE, 0.7) }
  bubble(x, w, SAG.x + 40, SAG.y - 250, 0.15, 1.0, 'we talked for TEN minutes', { size: 36, tail: -0.2 })
  // the text
  if (w > 6.0 && w < 7.0) {
    const k = pop01(w, 6.0, 0.25, 2) * outK(w, [6.85, 7.0])
    phone(x, w, { cx: 700, cy: 1100, w: 380, h: 420, rot: 0.06, title: '♡ the one', alpha: clamp(k), msgs: [{ w: 6.05, side: 'L', text: 'nice meeting you! what was your name again?' }], fs: 30 })
  }
  if (w > 7.6) { hearts(x, w, 7.65, SAG.x, SAG.y - 160, { n: 5 }); sparkles(x, w, SAG.x, SAG.y, 7.6, 12, 220, 3) }
}

const EP = makeCaught({
  id: 'kcie08', sign: 'sagittarius', name: 'Sagittarius',
  hook: 'One good chat. | Already planning *our trip.*', hookColor: '#c9a6ff',
  earlier: '2 HOURS EARLIER', clock0: '00:10', clockScale: 800,
  catches: [{ s: 0, c: C, circle: () => ({ x: SAG.x, y: SAG.y - 10, rx: 200, ry: 205, lx: 60, ly: 1590, labelSide: 1 }) }],
  ending: 'loop', last: 'Day one: | learn their *name.*', lastColor: '#c9a6ff',
  world,
  cues: [
    ['pop', 0.1, 880, 0.04, -0.3], ['pluck', 0.4, 1318.51, 0.035, 0.4, -0.3], ['whoosh', 1.0, 0.3, 0.04], ['tom', 1.05, 130, { gain: 0.2, decay: 0.15 }],
    ...PINS.map(([, , t0], i) => ['pop', t0, [659.25, 783.99, 880, 987.77, 1174.66][i], 0.04, -0.2 + i * 0.1]),
    ...CARDS.map(([, , t0]) => ['tick', t0, 0.06]), ['whoosh', 3.6, 0.3, 0.04],
    ...Array.from({ length: 5 }, (_, i) => ['pop', +(4.15 + i * 0.25).toFixed(2), 523.25 + i * 60, 0.03, 0.3]), ['pop', 5.0, 1174.66, 0.04, 0.4],
    ['pluck', 3.35, 1567.98, 0.03, 0.5, 0.5], ['pop', 6.05, 987.77, 0.05, 0.3], ['pop', 6.3, 311.13, 0.04, 0], ['tom', 6.35, 80, { gain: 0.2, decay: 0.3 }],
    ['pop', 7.0, 1318.51, 0.05, -0.3], ['whoosh', 7.5, 0.6, 0.05], ['glitter', 7.6, 8.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [furn, ease]
