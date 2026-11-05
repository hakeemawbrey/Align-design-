// kcie16: CAUGHT IN 4K, "Aries, caught five times before bedtime" (long, hard cut, music: chiptune · G). Rows: m02.md #16
// Five catches in one day, each a mini-story that ends in a freeze (chapter sticker, red circle). Pisces watches every catch
// from somewhere (a window, a bench, the next table) and cries a little more each time.
//   CATCH 1 · 8:02 AM   the alarm: snooze ×6, the time, the sprint out the door with one shoe and toast (= frame 0).
//   CATCH 2 · 11:00 AM  the parking meter "ate" a coin: Aries argues with it… the coin was in the wrong slot. THANK YOU.
//   CATCH 3 · 1:30 PM   lunch with Libra: "I'm SO chill about tonight", pacing a trench into the café floor.
//   CATCH 4 · 5:45 PM   the text to the crush, all in caps by accident; "SORRY CAPS LOCK" (also caps).
//   CATCH 5 · 9:00 PM   the crush is at the café. Aries walks over and asks them out directly, voice shaking.
//   tail                "…yes!" Aries freezes stiff with joy. Last line: "Caught being brave. Yep. Still me." Hard cut.
import {
  makeCaught, room, furn, windowFrame, phone, star, pisces, bubble, sticker, label, box, R, drawBits, sparkles, hearts, confetti, speedLines,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, SKYB, INTER,
} from '../../kcie01/caughtkit.js'

const S = [0, 100, 200, 300, 400]               // each catch lives in its own band of world time
const LEN = [10.2, 10.4, 10.0, 10.2, 10.6]      // play length to the freeze
const END = S[4] + LEN[4] + 4.6
const CLOCKS = ['08:02', '11:00', '13:30', '17:45', '21:00']
const band = w => { let i = 0; for (let k = 0; k < 5; k++) if (w >= S[k] - 1) i = k; return { i, u: w - S[i] } }
const A0 = { x: 360, y: 1250, s: 300 }

// ── CATCH 1: the alarm
function c1(x, w, u) {
  room(x, 'bedroom', { fy: 1440 })
  windowFrame(x, 620, 380, 360, 320, { day: true })
  pisces(x, w, { x: 800, y: 560, s: 120, mood: 'wide', look: [-1, 0.5], tears: 1, shadow: false, glyph: false })   // the neighbour, through the window
  furn.bed(x, 60, 1400, 560, '#e8634a')
  // the alarm clock on the side table
  box(x, 660, 1300, 200, 24, '#8a5a32', { b: 5 }); R(x, INK, 750, 1330, 20, 110)
  const ring = (u > 0 && u < 0.7) || [1.2, 2.0, 2.8, 3.6, 4.4].some(t => u > t && u < t + 0.35)
  box(x, 700 + (ring ? 5 * Math.sin(u * 90) : 0), 1210, 120, 90, BONE, { b: 5 }); label(x, u < 5.2 ? '7:12' : '8:02', 760, 1255, { size: 32, col: u < 5.2 ? INK : RED, shadow: false })
  if (ring) label(x, 'BRRRING', 760, 1150, { size: 34, col: GOLD, font: INTER, weight: 800, rot: 0.1 })
  const snoozes = [0.7, 1.5, 2.3, 3.1, 3.9, 4.7].filter(t => u > t).length
  if (u > 0.7 && u < 5.3) label(x, `SNOOZE ×${snoozes}`, 540, 620, { size: 54, col: GOLD, font: INTER, weight: 800, rot: -0.04 })
  // Aries: asleep → sees the time → sprint
  let pos = { ...A0, x: 300, y: 1290 }, mood = 'sleepy', look
  if (u > 5.2) { mood = 'wide'; look = [1, 0] }
  if (u > 6.0) { const p = ease.inCubic(prog(u, 6.0, LEN[0])); pos = { x: lerp(300, 820, p), y: 1260 - 120 * Math.sin(Math.PI * Math.min(1, p * 1.6)), s: 300 }; mood = 'wide'; look = [1, 0] }
  furn.door(x, 860, 1020, 200, 420, clamp(prog(u, 6.6, 7.4)))
  star(x, w, 'aries', { ...pos, mood, look, hops: [0.75, 1.55, 2.35, 3.15, 3.95, 4.75, 5.25, 6.6, 7.4, 8.2, 9.0], seed: 2, zzz: mood === 'sleepy' })
  if (u > 6.0) { speedLines(x, pos.x - 120, pos.y, 200, -1, 5, BONE, 0.8); box(x, pos.x + 80, pos.y - 40, 70, 60, '#e8b46a', { b: 4 }); R(x, INK, pos.x - 60, pos.y + 140, 60, 26); R(x, '#5a5470', pos.x - 54, pos.y + 146, 48, 14) }   // toast + one shoe
  if (u > 5.2 && u < 6.0) bubble(x, w, 420, 950, S[0] + 5.25, S[0] + 6.0, 'IS THAT 8:02', { size: 46, col: GOLD })
}
// ── CATCH 2: the parking meter
function c2(x, w, u) {
  room(x, 'street', { fy: 1440 })
  for (let i = 0; i < 4; i++) { const bx = 40 + i * 270; box(x, bx, 600 - (i % 2) * 80, 230, 840 + (i % 2) * 80, ['#3a2f6e', '#2f2766', '#43357a', '#2a2366'][i], { b: 6 }); for (let j = 0; j < 4; j++) R(x, j % 2 ? GOLD : '#ffe7a8', bx + 30 + (j % 2) * 100, 680 - (i % 2) * 80 + Math.floor(j / 2) * 140, 60, 80) }
  // the bench with Pisces
  box(x, 760, 1360, 280, 24, '#8a5a32', { b: 5 })
  pisces(x, w, { x: 900, y: 1290, s: 150, mood: u > 7.5 ? 'happy' : 'sparkle', look: [-1, 0], tears: 1 })
  // the meter
  R(x, INK, 590, 1100, 26, 340); box(x, 540, 920, 130, 190, '#8a8f9c', { b: 6 }); R(x, '#14102a', 560, 950, 90, 60)
  const msg = u < 2.0 ? '0:00' : u < 7.6 ? 'ERROR' : 'THANK YOU'
  label(x, msg, 605, 980, { size: msg.length > 5 ? 18 : 26, col: msg === 'ERROR' ? RED : MINT, shadow: false })
  R(x, INK, 590, 1030, 30, 8); R(x, INK, 640, 1060, 8, 30)       // two slots: the right one, and the one Aries used
  let mood = 'happy', look = [1, -0.4], sq = 0
  if (u > 2.0 && u < 7.6) { mood = 'squint'; look = [1, -0.4]; sq = 0.05 * Math.sin(u * 12) }
  if (u > 7.6) { mood = 'wide'; look = [1, 0] }
  star(x, w, 'aries', { x: 360, y: 1250, s: 300, mood, look, squash: sq, hops: [0.3, 2.1, 2.6, 3.1, 4.2, 4.7, 5.6, 6.1, 6.6, 7.7, 9.6], seed: 2 })
  if (u > 0.8 && u < 1.6) { const p = prog(u, 0.8, 1.6); R(x, GOLD, lerp(460, 640, p), lerp(1050, 1040, p), 22, 22) }
  bubble(x, w, 380, 900, S[1] + 2.1, S[1] + 3.9, 'GIVE IT BACK.', { size: 46, col: GOLD })
  bubble(x, w, 380, 900, S[1] + 4.2, S[1] + 5.5, 'I PAID YOU.', { size: 46, col: GOLD })
  bubble(x, w, 380, 900, S[1] + 5.6, S[1] + 7.5, 'we can talk about this', { size: 40 })
  bubble(x, w, 380, 900, S[1] + 7.7, S[1] + 9.5, '…wrong slot.', { size: 42 })
  bubble(x, w, 900, 1100, S[1] + 7.8, S[1] + 9.9, 'aww it said|thank you', { size: 28, col: '#bfe9ff', tail: 0.2 })
}
// ── CATCH 3: "I'm so chill"
function c3(x, w, u) {
  room(x, 'cafe', { fy: 1440 })
  box(x, 60, 360, 960, 440, '#2a1714', { b: 8 }); const g = x.createLinearGradient(0, 376, 0, 784); g.addColorStop(0, '#8fd0f6'); g.addColorStop(1, '#ffe2b8'); x.fillStyle = g; x.fillRect(76, 376, 928, 408)
  pisces(x, w, { x: 900, y: 620, s: 120, mood: 'sparkle', look: [-1, 0.6], tears: 2, shadow: false, glyph: false })    // outside the window
  furn.table(x, 780, 1250, 300, '#6b4a2f')
  star(x, w, 'libra', { x: 840, y: 1170, s: 220, mood: u > 6 ? 'squint' : 'happy', look: [-1, 0], hops: [0.4, 3.2, 6.2], seed: 1 })
  // the trench Aries paces into the floor
  const depth = 160 * clamp(prog(u, 1.0, LEN[2]))
  const px = 340 + 140 * Math.sin(u * 2.4)
  R(x, '#14102a', 160, 1440, 380, depth); R(x, '#2a2238', 160, 1440, 380, 10)
  star(x, w, 'aries', { x: px, y: 1250 + depth, s: 280, mood: u > 7 ? 'wide' : 'happy', look: [Math.cos(u * 2.4) > 0 ? 1 : -1, 0], hops: Array.from({ length: 14 }, (_, i) => S[2] + 0.6 + i * 0.66), seed: 2, shadow: false })
  bubble(x, w, 380, 860, S[2] + 0.5, S[2] + 3.5, 'I’m SO chill about tonight', { size: 38 })
  bubble(x, w, 820, 900, S[2] + 4.0, S[2] + 6.0, 'you’ve paced 2 miles', { size: 34, tail: 0.2 })
  bubble(x, w, 380, 860, S[2] + 6.2, S[2] + 9.9, 'CHILL. SO CHILL.', { size: 42, col: GOLD })
  if (u > 1) label(x, `TRENCH DEPTH: ${Math.round(depth / 16)} ft`, 540, 1720, { size: 30, col: GOLD })
}
// ── CATCH 4: CAPS LOCK
function c4(x, w, u) {
  room(x, 'living', { fy: 1440 })
  furn.couch(x, 120, 1380, 560, '#5a8ad0')
  windowFrame(x, 640, 380, 360, 320, { day: true, seed: 3 })
  pisces(x, w, { x: 820, y: 560, s: 120, mood: 'wide', look: [-1, 0.5], tears: 2, shadow: false, glyph: false })
  let mood = 'happy', look = [1, -0.6]
  if (u > 3.6) { mood = 'wide'; look = [1, -0.6] }
  if (u > 6.4) { mood = 'squint' }
  star(x, w, 'aries', { x: 360, y: 1250, s: 300, mood, look, hops: [0.3, 3.7, 4.0, 6.5, 8.6], seed: 2 })
  const d1 = u > 1.0 && u < 3.4 ? { text: 'HEY HOW ARE YOU'.slice(0, Math.floor((u - 1.0) * 9)), sendCol: RED } : u > 4.4 && u < 6.2 ? { text: 'SORRY CAPS LOCK'.slice(0, Math.floor((u - 4.4) * 10)) } : null
  phone(x, w, { cx: 760, cy: 1000, w: 400, h: 560, rot: 0.06, title: '♡ them', draft: d1, fs: 32, msgs: [{ w: S[3] + 3.4, side: 'R', text: 'HEY HOW ARE YOU' }, { w: S[3] + 6.2, side: 'R', text: 'SORRY CAPS LOCK' }, { w: S[3] + 8.4, side: 'L', text: 'WHY ARE WE YELLING' }] })
  if (u > 1.0) { const on = u < 6.4; box(x, 560, 1340, 200, 70, on ? '#ffd23a' : '#4a4f5c', { b: 4 }); label(x, 'CAPS LOCK', 660, 1376, { size: 24, col: INK, shadow: false }) }
  if (u > 8.4) label(x, 'they’re yelling back', 760, 640, { size: 34, col: MINT })
}
// ── CATCH 5: the ask
function c5(x, w, u) {
  room(x, 'cafe', { fy: 1440 })
  box(x, 60, 360, 600, 460, '#2a1714', { b: 8 }); x.fillStyle = '#120c2e'; x.fillRect(76, 376, 568, 428)
  for (let i = 0; i < 9; i++) R(x, i % 2 ? GOLD : '#ffb86b', 100 + i * 60, 760 - (i % 3) * 30, 14, 14)
  // Pisces outside the window, nose on the glass, full fountains
  pisces(x, w, { x: 300, y: 640, s: 170, mood: 'sparkle', look: [1, 0.6], tears: 3, shadow: false, glyph: false })
  furn.table(x, 800, 1260, 300, '#6b4a2f')
  const crushMood = u > LEN[4] + 1.0 ? 'heart' : u > 6 ? 'wide' : 'happy'
  star(x, w, 'libra', { x: 840, y: 1180, s: 250, mood: crushMood, look: [-1, 0], hops: [6.1, 11.6, 11.9], seed: 12, blush: u > 6 })
  // Aries walks over (shaking)
  const p = ease.inOutCubic(prog(u, 1.0, 5.0))
  const shake = u > 5.0 && u < LEN[4] + 1.0 ? 4 * Math.sin(u * 60) : 0
  let mood = 'neutral', look = [1, 0]
  if (u < 1.0) { mood = 'wide' }
  if (u > 5.0) mood = 'squint'
  if (u > 7.0) mood = 'happy'
  const stiff = u > LEN[4] + 1.0
  if (stiff) { mood = 'wide'; look = [0, 0] }
  star(x, w, 'aries', { x: lerp(160, 520, p) + shake, y: 1250, s: 290, mood, look, hops: stiff ? [] : [1.2, 1.9, 2.6, 3.3, 4.0, 4.7], seed: 2, squash: stiff ? -0.08 : 0 })
  bubble(x, w, 300, 900, S[4] + 0.2, S[4] + 1.6, 'ok. ok ok ok.', { size: 40 })
  bubble(x, w, 520, 860, S[4] + 6.0, S[4] + LEN[4] + 0.8, 'want to get dinner|with me? like a date.', { size: 36, col: GOLD })
  bubble(x, w, 840, 900, S[4] + LEN[4] + 1.0, END + 1, 'yes!', { size: 56, col: '#ffd6e6', tail: 0.2 })
  if (stiff) { label(x, '*frozen with joy*', 520, 1560, { size: 34, col: BONE, font: INTER, weight: 800 }); confetti(x, w, S[4] + LEN[4] + 1.05, 540, 1000, { n: 30 }); hearts(x, w, S[4] + LEN[4] + 1.1, 840, 1000, { n: 6 }) }
}

function world(x, w) {
  const { i, u } = band(w)
  ;[c1, c2, c3, c4, c5][i](x, w, u)
}
const AT = [
  u => ({ x: lerp(300, 820, ease.inCubic(prog(u, 6.0, LEN[0]))), y: 1260 - 120 * Math.sin(Math.PI * Math.min(1, ease.inCubic(prog(u, 6.0, LEN[0])) * 1.6)) }),
  () => ({ x: 360, y: 1250 }), u => ({ x: 340 + 140 * Math.sin(u * 2.4), y: 1250 + 160 * clamp(prog(u, 1.0, LEN[2])) }),
  () => ({ x: 360, y: 1250 }), () => ({ x: 520, y: 1250 }),
]
const TITLES = ['8:02 AM · SNOOZE ×6', '11:00 AM · THE METER', '1:30 PM · “SO CHILL”', '5:45 PM · CAPS LOCK', '9:00 PM · THE ASK']

const EP = makeCaught({
  id: 'kcie16', sign: 'aries', name: 'Aries',
  hook: 'Five catches. | Wait for *number five.*', hookColor: '#ff7a5c',
  earlier: null,
  clockAt: w => { const { i, u } = band(w); const [h, m] = CLOCKS[i].split(':').map(Number); const s = Math.floor(u * 7); const mm = m + Math.floor(s / 60); return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` },
  catches: S.map((s, i) => ({ s, c: s + LEN[i], sticker: TITLES[i], hold: 1.2, yep: i === 4 ? 'YEP. STILL ME.' : "YEP. THAT'S ME.", circle: w => { const p = AT[i](w - s); return { x: p.x, y: p.y - 10, rx: 195, ry: 200, lx: 60, ly: p.y + 250, labelSide: 1 } } })),
  ending: 'cut', wEnd: END, lastAt: S[4] + LEN[4] + 2.2,
  last: 'Caught being *brave.* | Yep. Still me.', lastColor: '#ff7a5c',
  world,
  cues: [
    ...[0, 1.2, 2.0, 2.8, 3.6, 4.4].flatMap(t => Array.from({ length: 4 }, (_, j) => ['bell', +(t + j * 0.08).toFixed(2), 2093, 0.025, 0.12, 0.3])),
    ...[0.7, 1.5, 2.3, 3.1, 3.9, 4.7].map(t => ['tom', t, 130, { gain: 0.2, decay: 0.12 }]),
    ['pop', 5.2, 311.13, 0.06, 0], ['boom', 5.25, 0.15], ['whoosh', 6.0, 0.6, 0.07], ['tom', 6.6, 90, { gain: 0.25, decay: 0.2 }],
    ['pop', S[1] + 0.8, 1318.51, 0.04, 0.3], ['tick', S[1] + 1.6, 0.06], ['pop', S[1] + 2.0, 220, 0.05, 0.3],
    ...[2.1, 4.2, 5.6, 7.7].map((t, i) => ['pop', S[1] + t, [440, 392, 523.25, 659.25][i], 0.045, -0.3]), ['bell', S[1] + 7.6, 1760, 0.04, 1.0, 0.3], ['glitter', S[1] + 7.6, S[1] + 8.1],
    ...Array.from({ length: 14 }, (_, i) => ['tick', +(S[2] + 0.6 + i * 0.66).toFixed(2), 0.035]), ['pop', S[2] + 0.5, 880, 0.04, -0.3], ['pop', S[2] + 4.0, 659.25, 0.04, 0.3], ['pop', S[2] + 6.2, 1174.66, 0.05, -0.3],
    ...Array.from({ length: 21 }, (_, i) => ['tick', +(S[3] + 1.0 + i * 0.11).toFixed(2), 0.025]), ['pop', S[3] + 3.4, 1174.66, 0.05, 0.3], ['pop', S[3] + 3.7, 311.13, 0.05, 0],
    ...Array.from({ length: 15 }, (_, i) => ['tick', +(S[3] + 4.4 + i * 0.1).toFixed(2), 0.025]), ['pop', S[3] + 6.2, 1174.66, 0.05, 0.3], ['pop', S[3] + 8.4, 987.77, 0.05, 0.3],
    ...[1.2, 1.9, 2.6, 3.3, 4.0, 4.7].map(t => ['tick', S[4] + t, 0.04]), ['riser', S[4] + 5.0, S[4] + 6.0, 0.03], ['pop', S[4] + 6.0, 659.25, 0.04, 0],
    ['pop', S[4] + LEN[4] + 1.0, 1318.51, 0.06, 0.3], ['pop', S[4] + LEN[4] + 1.1, 1567.98, 0.05, 0.3], ['glitter', S[4] + LEN[4] + 1.05, S[4] + LEN[4] + 1.7], ['bell', S[4] + LEN[4] + 1.15, 1760, 0.04, 1.4, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, SKYB, drawBits, sparkles, sticker, A0]
