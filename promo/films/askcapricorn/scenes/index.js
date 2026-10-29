// askcapricorn (30 s vertical Align ad, Star Talk season 1 extra "Ask the Stars") · story 0–25.6, then the shared end card.
//   0.00       A DM lands: "I'm too *busy* to date." The ♑ star peeks out beside a stack of planners piled up past the top of
//              the frame, wobbling; its phone buzzes on the floor.
//   2.82 drop  ♑ CAPRICORN STAR: "you schedule the gym. schedule this."  4.1 the stack topples off; the week opens as a
//              pixel planner grid; the GYM blocks glow, then (5.2) the empty Thursday evening lights up gold: DATE · 7PM.
//   6.60       "one evening a week. phone in a drawer."  A drawer slides out, the phone drops in, the drawer shuts.
//   10.2       "busy people still deserve love."  The DATE block sends up a heart; the star blushes.
//   13.4       "you just have to make room."  The other blocks slide aside and the DATE block grows into the space.
//   16.3       The box shuts, the DM slides away: "Tonight's deck: | dealt *every night.*" Three cards deal in a fan.
//   20.05 cut  "Make *room.* | Then show up."  The DATE · 7PM card up top; a pixel clock hits 7:00, the star hops in with a
//              flower right on time; a heart.
// One canvas (sky + props + star), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { askFilm, BEAT, GOLD, BONE, INK, MONO, PINK, sparkles } from './ask.js'

const CAP = signStar('capricorn')
const ACC = '#5fe0b4'
const SPEAK = '♑ CAPRICORN STAR'
const T = {
  open: 2.62, l1: BEAT(4) + 0.02, topple: [4.0, 4.6], grid: 4.35, gym: 4.9, date: 5.6,
  l2: 6.9, drawer: [7.4, 7.7], phoneDrop: [7.9, 8.3], shut: [8.6, 8.9],
  l3: 10.2, heart: 10.9, l4: 13.4, room: [13.9, 14.8],
  close: 16.2, dmOut: [16.0, 16.3], gridOut: [16.0, 16.3],
  tie: 16.4, deal: [16.65, 16.9, 17.15], tieChip: 17.6, tieOut: [19.8, 20.02],
  cut: 20.05, last: 20.12, lastLand: 20.55, clock: [20.7, 21.5], hop: 21.55, flower: 21.85, heart2: 22.6, out: [25.15, 25.45],
}
const LINES = [
  { t: T.l1, text: 'you schedule the gym. *schedule this.*' },
  { t: T.l2, text: 'one evening a week. *phone in a drawer.*' },
  { t: T.l3, text: 'busy people still *deserve love.*' },
  { t: T.l4, text: 'you just have to *make room.*' },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }), T.lastLand, T.hop, T.hop + 0.35]
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..']

// the week: 7 days × 3 slots; '' = free. Thursday evening is the one that lights up.
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const WEEK = [['WORK', 'WORK', 'GYM'], ['WORK', 'CALL', ''], ['WORK', 'WORK', 'GYM'], ['WORK', 'MEET', 'DATE'], ['WORK', 'WORK', ''], ['GYM', 'ERRAND', ''], ['', 'PREP', '']]
const BLOCK_C = { WORK: '#6c7bd8', CALL: '#a77be0', MEET: '#a77be0', GYM: '#ff8a5c', ERRAND: '#5fb3d8', PREP: '#5fb3d8' }

function capState(t) {
  if (t < T.topple[0]) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.grid + 0.4) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.date) return { mood: 'squint', look: [0, -1] }
  if (t < T.l2) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.shut[1]) return { mood: 'neutral', look: [1, 0] }
  if (t < T.heart) return { mood: 'happy' }
  if (t < T.l4) return { mood: 'happy', blush: 1 }
  if (t < T.cut) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.clock[1]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.heart2) return { mood: 'happy' }
  return { mood: 'heart' }
}

function book(x, cx, cy, w, h, col, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = BONE; x.fillRect(-w / 2 + 10, -h / 2 + 8, w - 34, h - 16)
  x.fillStyle = 'rgba(27,18,54,0.25)'; for (let i = 0; i < 3; i++) x.fillRect(-w / 2 + 16, -h / 2 + 14 + i * 9, w - 50, 3)
  x.fillStyle = GOLD; x.fillRect(w / 2 - 20, -h / 2, 8, h)
  x.restore()
}

function grid(x, t, K, k, roomK) {
  if (k <= 0.01) return
  const GX = 540, GY = 770, CW = 124, RH = 84
  x.save(); x.translate(GX, GY); x.scale(k, k)
  // page
  x.fillStyle = INK; x.fillRect(-470, -205, 940, 410)
  x.fillStyle = '#f3ead8'; x.fillRect(-460, -195, 920, 390)
  x.fillStyle = '#2fae86'; x.fillRect(-460, -195, 920, 54)
  x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  DAYS.forEach((d, i) => { x.fillStyle = BONE; x.fillText(d, -372 + i * CW, -167) })
  x.fillStyle = 'rgba(27,18,54,0.5)'; x.font = `700 20px ${MONO}`; x.textAlign = 'left'
  ;['AM', 'PM', '7PM'].forEach((s, j) => x.fillText(s, -452, -96 + j * RH * 1.1))
  x.textAlign = 'center'
  WEEK.forEach((col, i) => col.forEach((lab, j) => {
    const isDate = lab === 'DATE'
    const cx = -372 + i * CW, cy = -96 + j * RH * 1.1
    if (isDate) return                                          // drawn last, on top
    const push = roomK * (i < 3 ? -1 : 1) * 40 * (j === 2 ? 1.6 : 0.6)
    const dim = 1 - 0.55 * roomK
    x.save(); x.globalAlpha = dim; x.translate(push, 0)
    if (!lab) { x.strokeStyle = 'rgba(27,18,54,0.25)'; x.lineWidth = 3; x.setLineDash([8, 6]); x.strokeRect(cx - 54, cy - 32, 108, 64); x.setLineDash([]); x.restore(); return }
    const glow = lab === 'GYM' ? clamp(K.pop01(t, T.gym, 0.3, 2)) * (1 - prog(t, T.date - 0.2, T.date)) : 0
    x.fillStyle = INK; x.fillRect(cx - 58, cy - 36, 116, 72)
    x.fillStyle = BLOCK_C[lab]; x.fillRect(cx - 54, cy - 32, 108, 64)
    if (glow > 0) { x.fillStyle = `rgba(255,240,200,${0.55 * glow})`; x.fillRect(cx - 54, cy - 32, 108, 64) }
    x.fillStyle = BONE; x.font = `700 ${lab.length > 5 ? 19 : 22}px ${MONO}`; x.fillText(lab, cx, cy + 2)
    x.restore()
  }))
  // the DATE block (Thursday 7PM): dashed until it lights gold, then grows on "make room"
  const cx = -372 + 3 * CW, cy = -96 + 2 * RH * 1.1
  const lit = K.pop01(t, T.date, 0.4, 2.4)
  if (t < T.date) { x.strokeStyle = 'rgba(27,18,54,0.3)'; x.lineWidth = 3; x.setLineDash([8, 6]); x.strokeRect(cx - 54, cy - 32, 108, 64); x.setLineDash([]) }
  else {
    const s = lit * (1 + 1.6 * ease.outBack(roomK)), gx = lerp(cx, 0, ease.inOutCubic(roomK)), gy = lerp(cy, 20, ease.inOutCubic(roomK))
    x.save(); x.translate(gx, gy); x.scale(s, s)
    const gl = x.createRadialGradient(0, 0, 10, 0, 0, 120); gl.addColorStop(0, 'rgba(255,214,120,0.6)'); gl.addColorStop(1, 'rgba(255,214,120,0)')
    x.fillStyle = gl; x.fillRect(-130, -130, 260, 260)
    x.fillStyle = INK; x.fillRect(-62, -38, 124, 76)
    x.fillStyle = '#f7c948'; x.fillRect(-56, -32, 112, 64); x.fillStyle = '#fff1c8'; x.fillRect(-56, -32, 112, 8)
    x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('DATE', 0, -9); x.fillText('7PM', 0, 15)
    x.restore()
  }
  x.restore()
  sparkles(x, t, GX + (cx) * k, GY + cy * k, T.date + 0.1, 10, 150, 0.2, [GOLD, BONE, ACC])
  if (t > T.heart && t < T.heart + 1.5) { const p = prog(t, T.heart, T.heart + 1.5); K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, GX + cx * k + 30, GY + cy * k - 60 - p * 220, 10, { alpha: Math.sin(Math.PI * p) }) }
  sparkles(x, t, GX, GY + 20, T.room[1], 12, 260, 0.5, [GOLD, BONE, ACC])
}

function phone(x, t, cx, cy, s, buzz) {
  x.save(); x.translate(cx + (buzz ? Math.sin(t * 90) * 5 : 0), cy); x.rotate(buzz ? Math.sin(t * 90) * 0.03 : 0); x.scale(s, s)
  x.fillStyle = INK; x.fillRect(-34, -58, 68, 116)
  x.fillStyle = '#d9b25a'; x.fillRect(-28, -52, 56, 104)
  x.fillStyle = '#2b1c55'; x.fillRect(-22, -42, 44, 80)
  x.fillStyle = PINK; for (let i = 0; i < 3; i++) x.fillRect(-16, -34 + i * 18, 32, 10)
  x.restore()
  if (buzz) { x.save(); x.fillStyle = GOLD; x.globalAlpha = (Math.floor(t * 10) % 2) ? 0.9 : 0.3; for (const s2 of [-1, 1]) for (let i = 0; i < 2; i++) x.fillRect(cx + s2 * (48 + i * 12) * s, cy - 30 + i * 30, 7, 22); x.restore() }
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  const tieHide = !last && t >= T.tie - 0.12 ? ease.inOutCubic(prog(t, T.tie - 0.12, T.tie + 0.2)) : 0
  // ── the planner stack (frame 0 → topples at 4.0)
  if (!last && t < T.topple[1]) {
    const tp = ease.inCubic(prog(t, ...T.topple))
    const cols = ['#2fae86', '#6c7bd8', '#ff8a5c', '#a77be0', '#f7c948', '#5fb3d8']
    x.save(); x.translate(760, 1230); x.rotate(tp * 0.9); x.translate(tp * 500, tp * 200)
    for (let i = 0; i < 24; i++) {
      const wob = Math.sin(t * 3.2 + i * 0.35) * i * 0.9 * (1 - tp)
      book(x, wob + Math.sin(i * 2.3) * 14, -32 - i * 62, 250 - (i % 3) * 14, 58, cols[i % cols.length], Math.sin(i * 1.7) * 0.03)
    }
    x.restore()
  }
  // ── the week grid
  const gk = last ? 0 : K.pop01(t, T.grid, 0.4, 1.8) * (1 - ease.inCubic(prog(t, ...T.gridOut)))
  const roomK = ease.inOutCubic(prog(t, ...T.room))
  grid(x, t, K, gk, roomK)
  // ── the drawer (right of the star) and the phone
  const drawerK = !last && t < T.gridOut[1] ? K.pop01(t, T.l2 + 0.1, 0.3, 2) * (1 - prog(t, T.gridOut[0], T.gridOut[1])) : 0
  const DX = 850, DY = 1150
  if (drawerK > 0.01) {
    const slide = ease.outBack(prog(t, ...T.drawer)) * (1 - ease.inOutCubic(prog(t, ...T.shut)))
    x.save(); x.translate(DX, DY); x.scale(drawerK, drawerK)
    x.fillStyle = INK; x.fillRect(-120, -90, 240, 180)
    x.fillStyle = '#9c6236'; x.fillRect(-112, -82, 224, 164)
    x.fillStyle = '#7a4a2a'; x.fillRect(-100, -70, 200, 140)
    // the drawer front (slides toward you = down)
    const dy = slide * 70
    x.fillStyle = INK; x.fillRect(-108, -60 + dy, 216, 110)
    x.fillStyle = '#c98a4e'; x.fillRect(-100, -52 + dy, 200, 94)
    x.fillStyle = GOLD; x.fillRect(-26, -10 + dy, 52, 14)
    x.restore()
  }
  // the phone: buzzing on the floor (0–7.9), then dropped into the drawer
  if (!last && t < T.phoneDrop[1] && out > 0) {
    const p = prog(t, ...T.phoneDrop)
    const px0 = 150, py0 = 1230
    const pp = t < T.phoneDrop[0] ? { x: px0, y: py0 } : { x: lerp(px0, DX, p), y: lerp(py0, DY - 30, p) - Math.sin(Math.PI * p) * 260 }
    phone(x, t, pp.x, pp.y, (1 - p * 0.3) * (t < T.topple[1] ? 1 : 1), t < 1.0 || (t > 3.4 && t < 3.9) || (t > 6.2 && t < 6.7))
  }
  if (!last && t > T.shut[1]) sparkles(x, t, DX, DY - 40, T.shut[1], 8, 110, 0.4, [GOLD, BONE, ACC])
  // ── the star
  let P
  if (last) P = { x: 540, y: 1150, size: 320 }
  else {
    const mv = ease.inOutCubic(prog(t, T.topple[0], T.grid + 0.3))
    P = { x: lerp(330, 540, mv), y: lerp(1060, 1150, mv), size: lerp(320, 270, mv) }
  }
  const hopX = last ? lerp(-260, 0, ease.outBack(prog(t, T.hop, T.hop + 0.5))) : 0
  const opts = { color: CAP.color, glyph: CAP.glyph, ...capState(t), hops: HOPS, seed: 6, glow: 1.15, pop: out * (1 - tieHide) }
  if (opts.pop > 0.02) {
    const peek = !last && t < T.topple[0] ? Math.sin(t * 2.1) * 10 : 0
    const r = drawStarChar(x, P.x + peek + (last && t < T.hop ? -260 : hopX), P.y, P.size, t, { ...opts, alpha: last && t < T.hop ? 0 : 1 })
    if (last && t > T.flower) K.drawBits(x, FLOWER, { P: '#ff7fb0', Y: '#f7c948', G: '#3fa35a' }, r.x + 120, r.y + 30, 12 * K.pop01(t, T.flower, 0.3, 2.4))
    if (!last && t > T.heart && t < T.l4) sparkles(x, t, r.x, r.y, T.heart + 0.2, 8, 170, 0.1, [PINK, GOLD, BONE])
  }
  // ── last beat: the DATE · 7PM card up top + a pixel clock that strikes 7
  if (last) {
    const k = K.pop01(t, T.cut + 0.05, 0.4, 2) * out
    x.save(); x.translate(540, 700); x.scale(k, k); x.rotate(-0.03)
    x.fillStyle = INK; x.fillRect(-300, -100, 600, 200)
    x.fillStyle = '#f7c948'; x.fillRect(-290, -90, 580, 180); x.fillStyle = '#fff1c8'; x.fillRect(-290, -90, 580, 14)
    x.fillStyle = INK; x.font = `700 58px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DATE · 7PM', 55, 4)
    // clock
    const cp = prog(t, ...T.clock), ang = lerp(-2.6, 0, ease.inOutCubic(cp)) * 6
    x.translate(-215, 0)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 48, 0, Math.PI * 2); x.fill()
    x.strokeStyle = INK; x.lineWidth = 8; x.lineCap = 'square'
    const hr = (7 / 12) * Math.PI * 2 + (1 - cp) * -0.5
    x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(hr) * 26, -Math.cos(hr) * 26); x.stroke()
    x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(ang) * 40, -Math.cos(ang) * 40); x.stroke()
    x.restore()
    sparkles(x, t, 325, 700, T.clock[1], 8, 90, 0.3, [GOLD, BONE, ACC])
    if (t > T.heart2) for (let i = 0; i < 3; i++) { const b = T.heart2 + i * 0.4, p = prog(t, b, b + 1.2); if (p > 0 && p < 1) K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 540 + (i - 1) * 130, 1000 - p * 180, 8, { alpha: Math.sin(Math.PI * p) }) }
  }
}

// ── the tie-in: tonight's deck deals three cards into a fan
function drawDeck(x, t, K) {
  if (t < T.tie || t >= T.cut) return
  const im = K.img('card-back.png')
  if (!im) return
  const o = ease.inCubic(prog(t, ...T.tieOut))
  const h = 560, w = h * im.width / im.height
  T.deal.forEach((d, i) => {
    const p = ease.outBack(prog(t, d, d + 0.4))
    if (p <= 0) return
    const ang = (i - 1) * 0.22, tx = 540 + (i - 1) * 190, ty = 880 + Math.abs(i - 1) * 40
    const cx = lerp(540, tx, p), cy = lerp(1900, ty, Math.min(1, p)) + o * 900
    x.save(); x.globalAlpha = 1 - o; x.translate(cx, cy); x.rotate(lerp(0.8, ang, p) + o * 0.5)
    const gl = x.createRadialGradient(0, 0, 40, 0, 0, h * 0.7); gl.addColorStop(0, 'rgba(242,199,92,0.22)'); gl.addColorStop(1, 'rgba(242,199,92,0)')
    x.fillStyle = gl; x.fillRect(-h, -h, 2 * h, 2 * h)
    x.drawImage(im, -w / 2, -h / 2, w, h)
    x.restore()
  })
  sparkles(x, t, 540, 880, T.deal[2] + 0.35, 12, 340, 0.3, [GOLD, BONE, ACC])
}

const F = askFilm({
  duration: 30, sign: 'capricorn', speaker: SPEAK, accent: ACC,
  question: "I'm too *busy* | to date.", qSize: 104,
  dmOut: T.dmOut,
  lines: LINES, open: T.open, close: T.close,
  note: { t: 1.3, out: [15.95, 16.15], rows: ['♑ CAPRICORN · CARDINAL EARTH', 'RULED BY SATURN'], w: 740, top: 1290 },
  heads: [
    { text: "Tonight's deck: | dealt *every* *night.*", at: T.tie + 0.05, out: T.tieOut, top: 150, size: 100, accentSize: 138, accentColor: GOLD, late: 2, lateAt: T.tie + 0.5 },
    { text: 'Make *room.* | Then show up.', at: T.last, out: T.out, top: 210, size: 116, accentSize: 168, accentColor: ACC, late: 3, lateAt: T.lastLand, lineHeight: 1.02 },
  ],
  load: ['card-back.png'],
  drawBack: drawStage, drawFront: drawDeck,
  cues: [
    ...[0.4, 1.0, 1.6, 2.2].map(v => ['tick', v, 0.02]), ['tick', 3.4, 0.03], ['tick', 3.55, 0.03],
    ['whoosh', T.topple[0], 0.6, 0.04], ['boom', T.topple[1], 0.14], ['pop', T.grid, 659.25, 0.04, 0],
    ['pop', T.gym, 987.77, 0.03, -0.3], ['pop', T.gym + 0.1, 987.77, 0.03, 0.3],
    ['bell', T.date, 1318.51, 0.04, 1.6, 0], ['glitter', T.date + 0.1, T.date + 0.6],
    ['whoosh', T.drawer[0], 0.3, 0.03], ['tick', T.drawer[1], 0.05], ['whoosh', T.phoneDrop[0], 0.35, 0.025], ['tick', T.phoneDrop[1], 0.06], ['boom', T.shut[1], 0.08], ['tick', T.shut[1], 0.05],
    ['pluck', T.heart, 1174.66, 0.04, 0.6, 0], ['whoosh', T.room[0], 0.8, 0.035], ['bell', T.room[1], 1567.98, 0.03, 1.4, 0], ['glitter', T.room[1], T.room[1] + 0.5],
    ['whoosh', T.tie, 0.4, 0.035], ...T.deal.map((d, i) => ['pop', d + 0.25, 739.99 + i * 120, 0.04, (i - 1) * 0.4]), ['glitter', T.deal[2] + 0.35, T.deal[2] + 0.8], ['tick', T.tieChip, 0.03], ['whoosh', T.tieOut[0], 0.35, 0.03],
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.clock[0] + i * 0.12).toFixed(2), 0.025]), ['bell', T.clock[1], 1046.5, 0.05, 1.8, 0], ['bell', T.clock[1] + 0.02, 1567.98, 0.025, 1.6, 0],
    ['whoosh', T.hop - 0.05, 0.35, 0.03], ['pop', T.hop + 0.3, 880, 0.04, 0], ['pluck', T.flower, 1318.51, 0.04, 0.6, 0.3], ['pluck', T.heart2, 1174.66, 0.04, 0.6, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [T.tie - 0.04, { t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
