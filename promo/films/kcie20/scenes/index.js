// kcie20: CAUGHT IN 4K, "Capricorn, caught off-schedule" (long, hard cut, music: cinematic · Gm). Rows: m02.md #20
//   CATCH 1 · 6:00 AM   the morning run, holding a laptop spreadsheet: AHEAD OF SCHEDULE (= frame 0, mid-stride).
//   CATCH 2 · 9:00 AM   a five-year plan for a houseplant, on a whiteboard, with a pointer.
//   CATCH 3 · 1:00 PM   replying to the crush in bullet points. "did you just send me meeting notes?"
//   CATCH 4 · 5:30 PM   rehearsing a birthday toast in the lift, with cue cards. The doors open on Pisces, who weeps.
//   CATCH 5 · 8:00 PM   the date (Cancer) on a moonlit walk. The planner says HOME BY 9. "one more walk?" → "yes."
//                       The planner goes flying.  tail: it lands in a puddle of moonlight. Last line, hard cut.
import {
  makeCaught, room, furn, windowFrame, phone, star, pisces, bubble, sticker, label, box, R, sparkles, hearts, speedLines, confetti,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, SKYB, INTER,
} from '../../kcie01/caughtkit.js'

const S = [0, 100, 200, 300, 400]
const LEN = [10.0, 10.4, 10.6, 10.4, 10.4]
const END = S[4] + LEN[4] + 4.8
const CLOCKS = ['06:00', '09:00', '13:00', '17:30', '20:00']
const band = w => { let i = 0; for (let k = 0; k < 5; k++) if (w >= S[k] - 1) i = k; return { i, u: w - S[i] } }

function laptop(x, cx, cy, s, rows) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -110, -80, 220, 140, '#2a2148', { b: 5 }); R(x, '#f6f3ea', -98, -68, 196, 116)
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) R(x, (i + j) % 2 ? '#d9f0e0' : '#ffffff', -94 + j * 64, -64 + i * 28, 60, 24)
  rows.forEach((r, i) => label(x, r, -90, -52 + i * 28, { size: 14, col: INK, shadow: false, align: 'left' }))
  box(x, -130, 60, 260, 20, '#8a8f9c', { b: 4 })
  x.restore()
}

function c1(x, w, u) {
  room(x, 'park', { fy: 1400, seed: 2 })
  // the sunrise
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 1400, 50, 540, 1400, 700); g.addColorStop(0, 'rgba(255,170,90,0.45)'); g.addColorStop(1, 'rgba(255,170,90,0)'); x.fillStyle = g; x.fillRect(0, 700, 1080, 700); x.restore()
  for (let i = 0; i < 5; i++) { const tx = ((i * 260 - u * 240) % 1300 + 1300) % 1300 - 110; R(x, '#3a2a1a', tx, 1100, 30, 300); for (const [ox, oy, r] of [[15, 1080, 90], [-40, 1130, 60], [70, 1130, 60]]) { x.fillStyle = '#2f6a3a'; x.beginPath(); x.arc(tx + ox, oy, r, 0, Math.PI * 2); x.fill() } }
  // Pisces on a bench, crying at the sunrise
  box(x, 740, 1440, 300, 26, '#8a5a32', { b: 5 }); pisces(x, w, { x: 890, y: 1370, s: 150, mood: 'sparkle', look: [-1, -0.6], tears: 3, hops: [S[0] + 5.2] })
  bubble(x, w, 880, 1190, S[0] + 5.2, S[0] + 9.0, 'the SUNRISE', { size: 30, col: '#bfe9ff', tail: 0.3 })
  const bob = Math.abs(Math.sin(u * 7)) * 30
  star(x, w, 'capricorn', { x: 380, y: 1230 - bob, s: 290, mood: u > 3 && u < 5 ? 'sparkle' : 'squint', look: [0.6, 0.6], hops: [], seed: 5 })
  speedLines(x, 240, 1230, 160, -1, 5, BONE, 0.7)
  laptop(x, 560, 1110 - bob, 1.1, ['PACE ✓', 'WATER ✓', 'SUNRISE ?', ''])
  if (u > 3.0 && u < 5.0) label(x, 'AHEAD OF SCHEDULE', 560, 940, { size: 36, col: MINT, alpha: Math.floor(u * 4) % 2 ? 1 : 0.6 })
  if (u > 6.5) label(x, '*high-fives own laptop*', 400, 860, { size: 32, col: BONE, font: INTER, weight: 800 })
}
function c2(x, w, u) {
  room(x, 'living', { fy: 1440 })
  furn.whiteboard(x, 600, 720, 720, 440)
  const L = [[0.8, 'YEAR 1: a bigger pot'], [2.0, 'YEAR 2: sun schedule'], [3.2, 'YEAR 3: leaf #20'], [4.4, 'YEAR 5: it BLOOMS']]
  label(x, 'HOUSEPLANT · 5-YEAR PLAN', 600, 560, { size: 30, col: RED, shadow: false })
  L.forEach(([t0, s], i) => { if (u > t0) label(x, s, 290, 630 + i * 64, { size: 34, col: INK, shadow: false, align: 'left', font: INTER, weight: 800, alpha: pop01(w, S[1] + t0, 0.2, 2) }) })
  const sh = u > 5.0 ? 0.1 * Math.sin(u * 30) : 0
  x.save(); x.translate(860, 1440); x.rotate(sh); x.translate(-860, -1440); furn.plant(x, 860, 1440, 1.4); x.restore()
  star(x, w, 'capricorn', { x: 320, y: 1250, s: 290, mood: 'squint', look: [1, -0.6], hops: [0.8, 2.0, 3.2, 4.4, 6.0], seed: 5 })
  R(x, '#8a5a32', 400, 960, 200, 10)      // the pointer
  pisces(x, w, { x: 960, y: 1600, s: 140, mood: 'sparkle', look: [-1, -1], tears: 3, hops: [S[1] + 6.2] })
  bubble(x, w, 880, 1420, S[1] + 6.3, S[1] + 11, 'it’s so|supported', { size: 28, col: '#bfe9ff', tail: 0.4 })
  if (u > 5.0) bubble(x, w, 860, 1080, S[1] + 5.1, S[1] + 6.4, '*nervous leaf*', { size: 30 })
  if (u > 6.6) bubble(x, w, 320, 900, S[1] + 6.6, S[1] + 11, 'any questions?', { size: 40 })
}
function c3(x, w, u) {
  room(x, 'office', { fy: 1440 })
  furn.desk(x, 540, 1260, 800)
  star(x, w, 'capricorn', { x: 300, y: 1180, s: 280, mood: u > 9 ? 'wide' : 'squint', look: [1, -0.6], hops: [0.5, 9.1], seed: 5 })
  const bullets = ['• hi!', '• yes, Friday works', '• 7:00 PM', '• looking forward', '• end of message']
  phone(x, w, { cx: 750, cy: 860, w: 420, h: 700, rot: 0.04, screen: (x, ww, { sx, sy, sw, sh }) => {
    R(x, '#1d1640', sx, sy, sw, 84); label(x, '♡ them', sx + sw / 2, sy + 44, { size: 30, col: BONE, font: INTER, weight: 800, shadow: false })
    box(x, sx + 20, sy + 100, 260, 60, '#efe6d6', { b: 4 }); label(x, 'free friday? :)', sx + 150, sy + 130, { size: 24, col: INK, shadow: false, font: INTER, weight: 700 })
    const n = Math.min(5, Math.floor(prog(u, 0.8, 6.5) * 5.99))
    const sent = u > 7.0
    box(x, sent ? sx + 70 : sx + 12, sent ? sy + 180 : sy + sh - 230, sent ? sw - 90 : sw - 24, 200, sent ? '#3d7cf0' : '#f6f3ea', { b: 3 })
    bullets.slice(0, n).forEach((b, i) => label(x, b, (sent ? sx + 86 : sx + 26), (sent ? sy + 205 : sy + sh - 205) + i * 36, { size: 24, col: sent ? '#fff' : INK, shadow: false, align: 'left', font: INTER, weight: 700 }))
    if (u > 8.8) { box(x, sx + 20, sy + 410, 330, 90, '#efe6d6', { b: 4 }); label(x, 'did you just send', sx + 185, sy + 440, { size: 24, col: INK, shadow: false, font: INTER, weight: 700 }); label(x, 'me meeting notes? lol', sx + 185, sy + 472, { size: 24, col: INK, shadow: false, font: INTER, weight: 700 }) }
  } })
  pisces(x, w, { x: 950, y: 1580, s: 140, mood: 'happy', look: [-1, -1], tears: 2, hops: [S[2] + 9.0] })
  if (u > 9.6) bubble(x, w, 300, 880, S[2] + 9.6, S[2] + 11.5, '…yes.', { size: 44 })
}
function c4(x, w, u) {
  // the lift
  room(x, 'office', { fy: 1440 })
  box(x, 120, 400, 840, 1040, '#8e939e', { b: 8, hi: '#a8adb8' })
  const open = clamp(prog(u, 7.0, 7.6))
  R(x, '#3a2f6e', 140, 420, 800, 1000)
  if (open > 0) { R(x, '#f2e6c8', 540 - 400 * open, 420, 800 * open, 1000) }
  box(x, 140 - 380 * open, 420, 400, 1000, '#b7bcc6', { b: 4 }); box(x, 540 + 380 * open, 420, 400, 1000, '#b7bcc6', { b: 4 })
  box(x, 440, 300, 200, 70, '#14102a', { b: 5 }); label(x, String(Math.min(3, 1 + Math.floor(u / 3.5))), 540, 336, { size: 44, col: RED, shadow: false })
  if (open > 0.5) pisces(x, w, { x: 760, y: 1250, s: 230, mood: 'sparkle', look: [-1, 0], tears: 3, hops: [S[3] + 7.7, S[3] + 8.2] })
  star(x, w, 'capricorn', { x: 370, y: 1250, s: 290, mood: u > 7.4 ? 'wide' : 'sparkle', look: [0, -1], hops: [1.0, 2.6, 4.2, 5.8, 7.5], seed: 5 })
  // the cue cards
  const card = Math.min(3, Math.floor(u / 2.4))
  x.save(); x.translate(380, 930); x.rotate(-0.05); box(x, -150, -70, 300, 140, '#fff8ea', { b: 4 }); label(x, ['CARD 1: “hi everyone”', 'CARD 2: pause (2 s)', 'CARD 3: the joke', 'CARD 4: happy b-day!'][card], 0, 0, { size: 22, col: INK, shadow: false, font: INTER, weight: 800 }); x.restore()
  bubble(x, w, 420, 740, S[3] + 0.5, S[3] + 2.2, 'thank you all for coming.', { size: 34 })
  bubble(x, w, 420, 740, S[3] + 5.0, S[3] + 7.0, 'and that’s why she’s a legend.', { size: 32 })
  bubble(x, w, 760, 940, S[3] + 7.9, S[3] + 11, 'that was|BEAUTIFUL', { size: 34, col: '#bfe9ff', tail: 0.2 })
}
function c5(x, w, u) {
  room(x, 'park', { fy: 1400, seed: 5 })
  // the big moon + its reflection puddle
  x.fillStyle = '#f4e8cc'; x.beginPath(); x.arc(820, 420, 110, 0, Math.PI * 2); x.fill()
  x.save(); x.globalAlpha = 0.5; x.fillStyle = '#c9d8ff'; x.beginPath(); x.ellipse(540, 1620, 260, 50, 0, 0, Math.PI * 2); x.fill(); x.restore()
  R(x, '#3a3550', 0, 1400, 1080, 20)
  const walk = u < 5.0 ? (u * 30) % 30 : 0
  const throwT = LEN[4] - 0.6
  star(x, w, 'cancer', { x: 740, y: 1240, s: 270, mood: u > 6 ? 'sparkle' : 'happy', look: [-1, 0], hops: [0.5, 1.2, 1.9, 2.6, 3.3, 6.2, throwT + 0.8], seed: 5, blush: true })
  star(x, w, 'capricorn', { x: 360, y: 1240 - (u > throwT - 0.2 ? 30 * Math.sin(prog(u, throwT - 0.2, throwT + 0.5) * Math.PI) : 0), s: 290, mood: u > throwT - 0.3 ? 'happy' : u > 6.2 ? 'wide' : 'neutral', look: [1, 0], hops: [0.8, 1.5, 2.2, 2.9, 3.6, throwT, throwT + 1.2], seed: 5 })
  void walk
  // the planner: in hand → flying → the puddle
  const fly = prog(u, throwT, throwT + 2.4)
  const px = u < throwT ? 470 : lerp(470, 560, fly), py = u < throwT ? 1120 : lerp(1120, 1600, fly) - 420 * Math.sin(Math.PI * Math.min(1, fly * 1.1))
  x.save(); x.translate(px, py); x.rotate(u < throwT ? -0.1 : fly * 9)
  box(x, -70, -90, 140, 180, '#d0566e', { b: 5 }); R(x, '#fff8ea', -56, -76, 112, 152); label(x, 'HOME BY 9', 0, -40, { size: 18, col: INK, shadow: false }); for (let i = 0; i < 4; i++) R(x, ['#7fd0ff', GOLD, MINT, PINK][i], -46, -10 + i * 22, 92, 14)
  x.restore()
  if (u > throwT) { for (let i = 0; i < 8; i++) { const p = prog(u, throwT + i * 0.05, throwT + 1.6); R(x, ['#7fd0ff', GOLD, MINT, PINK][i % 4], 470 + (i - 4) * 70 * p, 1100 - 400 * p + 500 * p * p, 22, 16) } }
  if (fly >= 1) sparkles(x, w, 560, 1600, S[4] + throwT + 2.4, 12, 200, 2, ['#c9d8ff', BONE, GOLD])
  bubble(x, w, 740, 940, S[4] + 6.2, S[4] + throwT, 'one more walk?', { size: 40, tail: 0.2 })
  bubble(x, w, 360, 920, S[4] + throwT - 0.3, S[4] + throwT + 2.6, 'yes.', { size: 60, col: GOLD })
  if (u > 3.2 && u < 6.0) label(x, '8:52 PM · HOME BY 9', 360, 900, { size: 30, col: RED })
  pisces(x, w, { x: 960, y: 1560, s: 150, mood: 'sparkle', look: [-1, -1], tears: 3, hops: [S[4] + throwT + 0.3] })
  if (u > throwT + 0.5) hearts(x, w, S[4] + throwT + 0.6, 540, 1050, { n: 7, spread: 300 })
}

function world(x, w) { const { i, u } = band(w); [c1, c2, c3, c4, c5][i](x, w, u) }
const AT = [u => ({ x: 380, y: 1230 - Math.abs(Math.sin(u * 7)) * 30 }), () => ({ x: 320, y: 1250 }), () => ({ x: 300, y: 1180 }), () => ({ x: 370, y: 1250 }), () => ({ x: 360, y: 1230 })]
const TITLES = ['6:00 AM · THE SPREADSHEET RUN', '9:00 AM · THE PLANT PLAN', '1:00 PM · BULLET POINTS', '5:30 PM · THE LIFT TOAST', '8:00 PM · OFF-SCHEDULE']

const EP = makeCaught({
  id: 'kcie20', sign: 'capricorn', name: 'Capricorn',
  hook: 'Five catches. | Number five *broke the plan.*', hookColor: '#9fe6b0',
  earlier: null,
  clockAt: w => { const { i, u } = band(w); const [h, m] = CLOCKS[i].split(':').map(Number); const s = Math.floor(u * (i === 4 ? 30 : 6)); return `${String(h).padStart(2, '0')}:${String(m + Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` },
  catches: S.map((s, i) => ({ s, c: s + LEN[i], sticker: TITLES[i], hold: 1.2, yep: i === 4 ? 'YEP. NO REGRETS.' : "YEP. THAT'S ME.", circle: w => { const p = AT[i](w - s); return { x: p.x, y: p.y - 10, rx: 195, ry: 200, lx: 60, ly: p.y + 255, labelSide: 1 } } })),
  ending: 'cut', wEnd: END, lastAt: S[4] + LEN[4] + 2.6,
  last: 'Unplanned. | Best part of *the plan.*', lastColor: '#9fe6b0',
  world,
  cues: [
    ...Array.from({ length: 28 }, (_, i) => ['tick', +(0.2 + i * 0.36).toFixed(2), 0.025]), ['bell', 3.0, 1760, 0.03, 0.6, 0.3], ['pop', 6.6, 1318.51, 0.04, 0], ['pluck', 5.2, 1174.66, 0.035, 0.6, 0.5],
    ...[0.8, 2.0, 3.2, 4.4].map((t, i) => ['pop', S[1] + t, [523.25, 659.25, 783.99, 1046.5][i], 0.045, -0.2]), ['pop', S[1] + 5.1, 1567.98, 0.03, 0.4], ['pluck', S[1] + 6.3, 1318.51, 0.035, 0.6, 0.5],
    ...Array.from({ length: 5 }, (_, i) => ['tick', +(S[2] + 0.8 + i * 1.1).toFixed(2), 0.04]), ['whoosh', S[2] + 7.0, 0.3, 0.05], ['pop', S[2] + 7.05, 1174.66, 0.05, 0.3], ['pop', S[2] + 8.8, 987.77, 0.05, 0.3], ['pop', S[2] + 9.6, 392, 0.04, 0],
    ['bell', S[3] + 3.5, 1046.5, 0.03, 0.6, 0], ['bell', S[3] + 7.0, 1318.51, 0.05, 0.8, 0], ['whoosh', S[3] + 7.0, 0.5, 0.04], ['pluck', S[3] + 7.9, 1567.98, 0.04, 0.8, 0.4],
    ['pop', S[4] + 6.2, 880, 0.045, 0.3], ['riser', S[4] + 7.2, S[4] + LEN[4] - 0.4, 0.03], ['pop', S[4] + LEN[4] - 0.8, 1174.66, 0.06, -0.3], ['whoosh', S[4] + LEN[4] - 0.6, 0.6, 0.07],
    ['tom', S[4] + LEN[4] + 1.8, 90, { gain: 0.25, decay: 0.3 }], ['glitter', S[4] + LEN[4] + 1.8, S[4] + LEN[4] + 2.6], ['bell', S[4] + LEN[4] + 1.9, 1760, 0.035, 1.4, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, SKYB, windowFrame, confetti, sticker, outK, ease]
