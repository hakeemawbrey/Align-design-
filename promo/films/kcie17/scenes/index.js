// kcie17: CAUGHT IN 4K, "Cancer, a whole day caught in 4K" (long, loop, music: dreamy · Db). Rows: m02.md #17
//   CATCH 1 · 9:10 AM   a parcel arrives (it's for the neighbour, Pisces). Cancer hugs the delivery driver goodbye (= frame 0).
//   CATCH 2 · 12:00 PM  rereading an old chat from message 1 "for research", 2 years back, smiling and sniffling.
//   CATCH 3 · 2:30 PM   cooking dinner for six. For a party of one. The plant gets a chair.
//   CATCH 4 · 6:00 PM   "are you mad at me?" to a friend who went quiet. MEANWHILE: Virgo is in the shower. "lol no??"
//   CATCH 5 · 10:30 PM  a knock: Virgo shows up with soup, for Cancer this time. The hug (the payoff: being looked after).
//   Last line in the final freeze: "Caught being looked after. Allowed." Then a rewind straight back into frame 0.
import {
  makeCaught, room, furn, windowFrame, phone, star, pisces, bubble, sticker, label, box, R, sparkles, hearts, HEART, drawBits,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, SKYB, INTER,
} from '../../kcie01/caughtkit.js'

const S = [0, 100, 200, 300, 400]
const LEN = [10.0, 10.2, 10.4, 10.6, 10.2]
const CLOCKS = ['09:10', '12:00', '14:30', '18:00', '22:30']
const band = w => { let i = 0; for (let k = 0; k < 5; k++) if (w >= S[k] - 1) i = k; return { i, u: w - S[i] } }
const CAN = { x: 380, y: 1250, s: 300 }

function hallway(x) {
  room(x, 'living', { fy: 1440 })
  box(x, 680, 640, 300, 800, '#2a1a12', { b: 6 }); box(x, 690, 650, 280, 790, '#c9a6ff', { b: 0 }); R(x, '#f2c75c', 700, 1060, 26, 26)    // the open front door, light hallway
  box(x, 120, 520, 260, 200, '#f6f3ea', { b: 6 }); label(x, 'HOME', 250, 620, { size: 40, col: '#d0566e', shadow: false, font: INTER, weight: 800 })
}
function c1(x, w, u) {
  hallway(x)
  // the driver (Capricorn) with the parcel → the hug
  const dIn = ease.outCubic(prog(u, 0.2, 1.2))
  const hug = clamp(prog(u, 6.0, 6.6))
  const dx = lerp(1150, lerp(830, 640, hug), dIn)
  star(x, w, 'capricorn', { x: dx, y: 1260, s: 260, mood: u > 6.0 && u < 7.6 ? 'wide' : u > 7.6 ? 'happy' : 'neutral', look: [-1, 0], hops: [0.6, 1.0, 7.7], seed: 5, blush: u > 7.6 })
  // the parcel
  if (u < 9.5) { const px = u < 2.0 ? dx - 120 : u < 6.0 ? CAN.x + 120 : CAN.x + 140; box(x, px - 70, 1150, 140, 110, '#c98f5a', { b: 5, hi: '#e3b07a' }); R(x, '#8a5a32', px - 8, 1150, 16, 110); if (u > 2.6) { box(x, px - 60, 1170, 120, 40, '#fff8ea', { b: 3 }); label(x, 'FOR: PISCES', px, 1190, { size: 16, col: INK, shadow: false }) } }
  let mood = 'happy', look = [1, 0]
  if (u > 2.6 && u < 4.2) { mood = 'squint'; look = [0.4, 1] }
  if (u > 4.2 && u < 6.0) mood = 'sparkle'
  if (u > 6.0) { mood = 'heart'; look = undefined }
  star(x, w, 'cancer', { x: lerp(CAN.x, 470, hug), y: 1250, s: 300, mood, look, hops: [0.5, 2.1, 4.3, 6.1, 6.6, 7.1, 7.6], seed: 5, blush: u > 6 })
  bubble(x, w, 820, 900, S[0] + 1.2, S[0] + 2.4, 'parcel!', { size: 38, tail: 0.2 })
  bubble(x, w, 380, 880, S[0] + 2.7, S[0] + 4.1, 'it’s for… the neighbour', { size: 36 })
  bubble(x, w, 380, 880, S[0] + 4.3, S[0] + 5.9, 'you came all this way!', { size: 36 })
  if (u > 6.2) hearts(x, w, S[0] + 6.25, 560, 1080, { n: 6 })
  // Pisces (the neighbour) peeks from the hallway, crying at the hug
  if (u > 5.0) pisces(x, w, { x: 900, y: 860, s: 130, pop: pop01(w, S[0] + 5.0, 0.3, 2), mood: 'sparkle', look: [-1, 0.5], tears: 3, hops: [S[0] + 6.4], glyph: false, shadow: false })
}
function c2(x, w, u) {
  room(x, 'bedroom', { fy: 1440 })
  furn.bed(x, 40, 1400, 700, '#6aa3d8')
  star(x, w, 'cancer', { x: 330, y: 1230, s: 300, mood: u > 5 ? 'sparkle' : 'happy', look: [1, -0.5], hops: [0.5, 4.0, 7.5], seed: 5, tears: u > 5 ? 2 : 0 })
  // the phone, scrolling back through years
  const yrs = u < 2 ? 'TODAY' : u < 4 ? '6 MONTHS AGO' : u < 6 ? '1 YEAR AGO' : '2 YEARS AGO'
  phone(x, w, { cx: 770, cy: 920, w: 420, h: 700, rot: 0.05, screen: (x, ww, { sx, sy, sw, sh }) => {
    R(x, '#1d1640', sx, sy, sw, 84); label(x, '♡ us', sx + sw / 2, sy + 44, { size: 30, col: BONE, font: INTER, weight: 800, shadow: false })
    const scroll = (u * 900) % 140
    for (let i = 0; i < 6; i++) { const y = sy + 110 + i * 140 - scroll + (u > 8 ? scroll : 0); const L = i % 2; box(x, L ? sx + 120 : sx + 20, y, 240, 70, L ? '#3d7cf0' : '#efe6d6', { b: 4 }) }
    R(x, '#1d1640', sx, sy + sh - 70, sw, 70); label(x, yrs, sx + sw / 2, sy + sh - 34, { size: 26, col: GOLD, shadow: false })
    if (u > 8) { box(x, sx + 20, sy + 300, sw - 40, 100, '#efe6d6', { b: 4 }); label(x, 'hi! is this the', sx + sw / 2, sy + 330, { size: 26, col: INK, shadow: false, font: INTER, weight: 700 }); label(x, 'right number? :)', sx + sw / 2, sy + 365, { size: 26, col: INK, shadow: false, font: INTER, weight: 700 }) }
  } })
  sticker(x, w, 540, 600, S[1] + 0.4, S[1] + 2.4, 'just *research*', { size: 46, col: GOLD })
  if (u > 8) label(x, 'MESSAGE 1 OF 4,812', 770, 520, { size: 34, col: GOLD })
  pisces(x, w, { x: 900, y: 1540, s: 160, mood: 'sparkle', look: [-1, -1], tears: u > 8 ? 3 : 2, hops: [S[1] + 8.2] })
  bubble(x, w, 880, 1360, S[1] + 8.3, S[1] + 11, 'your FIRST text', { size: 30, col: '#bfe9ff', tail: 0.3 })
}
function c3(x, w, u) {
  room(x, 'kitchen', { fy: 1440 })
  windowFrame(x, 640, 360, 380, 300, { day: true })
  pisces(x, w, { x: 830, y: 540, s: 120, mood: 'sparkle', look: [-1, 0.6], tears: 3, shadow: false, glyph: false })
  // the stove, pots stacking up
  box(x, 60, 1140, 380, 300, '#e6e2d6', { b: 6, hi: '#f6f3ea' })
  const pots = Math.min(4, Math.floor(u / 1.2))
  for (let i = 0; i < pots; i++) box(x, 110 + (i % 2) * 150, 1080 - Math.floor(i / 2) * 90, 130, 70, ['#8a8f9c', '#c8283c', '#5a8ad0', '#f2c75c'][i], { b: 5 })
  // the table set for six
  const tk = pop01(w, S[2] + 5.0, 0.3, 2)
  if (tk > 0.01) { x.save(); x.translate(720, 1300); x.scale(tk, tk); box(x, -320, -20, 640, 40, '#fff8ea', { b: 6 }); for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.beginPath(); x.arc(-260 + i * 104, -34, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(-260 + i * 104, -34, 28, 0, Math.PI * 2); x.fill() } x.restore() }
  if (u > 5.4) label(x, 'TABLE FOR 6', 720, 1430, { size: 34, col: GOLD })
  const sit = u > 6.8
  star(x, w, 'cancer', { x: sit ? 520 : 320, y: sit ? 1180 : 1150, s: 260, mood: u < 5 ? 'happy' : u < 8.4 ? 'neutral' : 'happy', look: sit ? [1, 0] : [-1, 0.6], hops: [0.6, 1.8, 3.0, 4.2, 6.9, 8.5], seed: 5 })
  if (u > 8.2) furn.plant(x, 940, 1260, 0.9)
  bubble(x, w, 330, 860, S[2] + 0.5, S[2] + 4.5, 'just a little dinner', { size: 38 })
  bubble(x, w, 560, 880, S[2] + 8.4, S[2] + 11, 'you get a chair too', { size: 36 })
}
function c4(x, w, u) {
  room(x, 'living', { fy: 1440 })
  furn.couch(x, 60, 1380, 520, '#d0566e')
  const pace = u > 2.0 && u < 8.0 ? 120 * Math.sin(u * 3) : 0
  star(x, w, 'cancer', { x: 320 + pace, y: 1250, s: 290, mood: u > 8.4 ? 'happy' : u > 2 ? 'wide' : 'neutral', look: [1, -0.5], hops: Array.from({ length: 9 }, (_, i) => S[3] + 2 + i * 0.7), seed: 5 })
  phone(x, w, { cx: 330, cy: 760, w: 360, h: 460, rot: -0.04, title: 'bestie ♍', fs: 28, typing: [S[3] + 3.5, S[3] + 8.0], msgs: [{ w: S[3] + 0.8, side: 'R', text: 'are you mad at me?' }, { w: S[3] + 8.2, side: 'L', text: 'was in the shower lol' }, { w: S[3] + 8.8, side: 'L', text: 'why would I be mad??' }] })
  // MEANWHILE: Virgo in the shower
  const k = pop01(w, S[3] + 3.0, 0.35, 2) * outK(w, [S[3] + 8.0, S[3] + 8.3])
  if (k > 0.01) {
    x.save(); x.translate(800, 1060); x.scale(k, k)
    box(x, -230, -260, 460, 520, '#9fd8f6', { b: 8 }); label(x, 'MEANWHILE', 0, -225, { size: 28, col: INK, shadow: false })
    for (let i = 0; i < 12; i++) R(x, '#ffffff', -180 + (i * 37) % 360, -180 + ((u * 300 + i * 70) % 380), 6, 22)
    star(x, w, 'virgo', { x: 0, y: 60, s: 220, mood: 'happy', look: [0, -0.5], hops: [S[3] + 4, S[3] + 5.5, S[3] + 7], seed: 3, shadow: false })
    box(x, 120, 170, 60, 44, '#ffd23a', { b: 4 }); label(x, '♪', -120, -120, { size: 60, col: INK, shadow: false })
    pisces(x, w, { x: -150, y: 150, s: 90, mood: 'happy', tears: 2, shadow: false, glyph: false })      // the rubber… Pisces
    x.restore()
  }
}
function c5(x, w, u) {
  hallway(x)
  // a knock, the door, Virgo with soup, Pisces behind with more soup
  const vIn = ease.outCubic(prog(u, 2.2, 3.4)), hug = clamp(prog(u, 7.0, 7.6))
  star(x, w, 'virgo', { x: lerp(1150, lerp(820, 640, hug), vIn), y: 1250, s: 270, mood: 'happy', look: [-1, 0], hops: [2.4, 2.9, 3.4, 7.2], seed: 3 })
  if (u > 2.2) { const sx = lerp(1150, lerp(820, 640, hug), vIn) - 150; box(x, sx - 60, 1120, 120, 90, '#f6f3ea', { b: 5 }); R(x, '#f2c75c', sx - 50, 1110, 100, 14); for (let i = 0; i < 3; i++) R(x, 'rgba(255,255,255,0.6)', sx - 30 + i * 26, 1060 - ((u * 50 + i * 20) % 50), 8, 30) }
  if (u > 4.0) pisces(x, w, { x: 960, y: 1300, s: 170, pop: pop01(w, S[4] + 4.0, 0.3, 2), mood: 'sparkle', look: [-1, -0.5], tears: 3, hops: [S[4] + 4.2, S[4] + 7.3] })
  if (u < 2.2) label(x, 'knock knock', 830, 860, { size: 40, col: GOLD, font: INTER, weight: 800, alpha: Math.floor(u * 4) % 2 ? 1 : 0.5 })
  let mood = 'neutral', look = [1, 0]
  if (u > 3.4 && u < 7.0) { mood = 'wide' }
  if (u > 5.6) { mood = 'sparkle' }
  if (u > 7.0) { mood = 'heart'; look = undefined }
  star(x, w, 'cancer', { x: lerp(CAN.x, 470, hug), y: 1250, s: 300, mood, look, tears: u > 5.6 ? 2 : 0, hops: [0.5, 3.5, 7.1, 7.6], seed: 5, blush: u > 7 })
  bubble(x, w, 820, 880, S[4] + 3.5, S[4] + 5.5, 'you sounded tired.|soup.', { size: 36, tail: 0.2 })
  bubble(x, w, 380, 880, S[4] + 5.7, S[4] + 7.0, 'for… me?', { size: 40 })
  if (u > 7.1) hearts(x, w, S[4] + 7.15, 560, 1080, { n: 7 })
}

function world(x, w) { const { i, u } = band(w); [c1, c2, c3, c4, c5][i](x, w, u) }
const AT = [u => ({ x: lerp(CAN.x, 470, clamp(prog(u, 6.0, 6.6))), y: 1250 }), () => ({ x: 330, y: 1230 }), u => ({ x: u > 6.8 ? 520 : 320, y: u > 6.8 ? 1180 : 1150 }), u => ({ x: 320 + (u > 2.0 && u < 8.0 ? 120 * Math.sin(u * 3) : 0), y: 1250 }), u => ({ x: lerp(CAN.x, 470, clamp(prog(u, 7.0, 7.6))), y: 1250 })]
const TITLES = ['9:10 AM · THE PARCEL', '12:00 PM · “RESEARCH”', '2:30 PM · TABLE FOR SIX', '6:00 PM · “ARE YOU MAD?”', '10:30 PM · SOUP']

const EP = makeCaught({
  id: 'kcie17', sign: 'cancer', name: 'Cancer',
  hook: 'Five catches. | The last one *got me.*', hookColor: '#c7d3ff',
  earlier: null,
  clockAt: w => { const { i, u } = band(w); const [h, m] = CLOCKS[i].split(':').map(Number); const s = Math.floor(u * 6); return `${String(h).padStart(2, '0')}:${String(m + Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` },
  catches: S.map((s, i) => ({ s, c: s + LEN[i], sticker: TITLES[i], hold: 1.2, yep: i === 4 ? 'YEP. THAT’S US.' : "YEP. THAT'S ME.", circle: w => { const p = AT[i](w - s); return { x: p.x + (i === 0 || i === 4 ? 60 : 0), y: p.y - 10, rx: i === 0 || i === 4 ? 260 : 195, ry: 205, lx: 60, ly: p.y + 260, labelSide: 1 } } })),
  ending: 'loop', loopHold: 2.4,
  last: 'Caught being *looked after.* | Allowed.', lastColor: '#c7d3ff',
  world,
  cues: [
    ['pop', 0.2, 659.25, 0.04, 0.4], ['pop', 1.2, 880, 0.045, 0.3], ['pop', 2.7, 523.25, 0.04, -0.3], ['pluck', 4.3, 1174.66, 0.035, 0.5, -0.3], ['glitter', 6.2, 6.8], ['pluck', 6.3, 1318.51, 0.04, 0.6, 0],
    ...Array.from({ length: 24 }, (_, i) => ['tick', +(S[1] + 0.4 + i * 0.32).toFixed(2), 0.02]), ['pop', S[1] + 8.0, 1567.98, 0.04, 0.3], ['bell', S[1] + 8.1, 1760, 0.03, 1.2, 0.3],
    ...[0, 1.2, 2.4, 3.6].map(t => ['tom', S[2] + t + 0.1, 150, { gain: 0.18, decay: 0.15 }]), ['whoosh', S[2] + 5.0, 0.3, 0.04], ...Array.from({ length: 6 }, (_, i) => ['pop', +(S[2] + 5.1 + i * 0.08).toFixed(2), 880 + i * 60, 0.025, 0]), ['pop', S[2] + 8.3, 1174.66, 0.04, 0.4],
    ['pop', S[3] + 0.8, 1174.66, 0.05, -0.3], ...Array.from({ length: 9 }, (_, i) => ['tick', +(S[3] + 2 + i * 0.7).toFixed(2), 0.04]), ['whoosh', S[3] + 3.0, 0.35, 0.04], ['pop', S[3] + 8.2, 987.77, 0.05, -0.3], ['pop', S[3] + 8.8, 987.77, 0.05, -0.3], ['pluck', S[3] + 8.9, 1318.51, 0.035, 0.5, 0],
    ['tom', S[4] + 0.3, 170, { gain: 0.25, decay: 0.1 }], ['tom', S[4] + 0.6, 170, { gain: 0.25, decay: 0.1 }], ['tom', S[4] + 1.5, 170, { gain: 0.25, decay: 0.1 }], ['tom', S[4] + 1.8, 170, { gain: 0.25, decay: 0.1 }],
    ['whoosh', S[4] + 2.2, 0.4, 0.04], ['pop', S[4] + 3.5, 880, 0.04, 0.3], ['pluck', S[4] + 5.7, 1318.51, 0.04, 0.6, -0.3], ['glitter', S[4] + 7.1, S[4] + 7.7], ['bell', S[4] + 7.2, 1760, 0.035, 1.4, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, MINT, SKYB, sparkles, HEART, drawBits]
