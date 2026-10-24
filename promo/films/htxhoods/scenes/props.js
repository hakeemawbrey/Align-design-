// htxhoods · line-art landmarks, one per neighbourhood (generic, no logos, no faces). Bold glowing strokes, flat fills.
// Every prop draws around (x, y) at scale s; ~640 wide × ~440 tall at s = 1. `u` = seconds since its card's downbeat.
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', VOID = '#0b0620', PINK = '#ff8fb1'
export const B = 60 / 108
const TAU = Math.PI * 2
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"

const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
export const tint = (a, b, k) => { const A = h2r(a), Bb = h2r(b); return '#' + A.map((v, i) => Math.round(lerp(v, Bb[i], clamp(k))).toString(16).padStart(2, '0')).join('') }
export const hexA = (hex, a) => hex + Math.round(clamp(a) * 255).toString(16).padStart(2, '0')

export function ink(ctx, col, { w = 8, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = hexA(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}
function begin(ctx, x, y, s, a = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a }
const pop = (u, a, d = 0.36, s = 2.2) => easeOutBack(prog(u, a, a + d), s)
const wob = (u, a, amp = 1, f = 16, k = 5) => u > a ? amp * Math.exp(-(u - a) * k) * Math.sin((u - a) * f) : 0
const pulse = (u, k = 7) => { const ph = ((u % B) + B) % B; return Math.exp(-ph * k) }
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r) }
function txt(ctx, s, x, y, size, col, font = INTER, weight = 800) {
  ctx.font = `${weight} ${size}px ${font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(s, x, y)
}
function ground(ctx, col, w = 300, y = 200) { ctx.beginPath(); ctx.moveTo(-w, y); ctx.lineTo(w, y); ink(ctx, col, { w: 7, fa: 0, glow: 10 }) }
/** a little map pin (tip at 0,0) */
export function pin(ctx, x, y, s, col, a = 1, dot = true) {
  if (s <= 0.01 || a <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-18, -26, -40, -46, -40, -72); ctx.arc(0, -72, 40, Math.PI, 0); ctx.bezierCurveTo(40, -46, 18, -26, 0, 0); ctx.closePath()
  ink(ctx, col, { w: 7, fa: 0.85, glow: 18 })
  if (dot) { ctx.beginPath(); ctx.arc(0, -72, 15, 0, TAU); ctx.fillStyle = VOID; ctx.fill() }
  ctx.restore()
}
/** pictogram person (feet at 0,0; ~150 tall at s=1); no face */
export function person(ctx, x, y, s, col, { lean = 0, sit = false } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(lean)
  if (sit) {
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(-26, -70); ctx.quadraticCurveTo(-26, -96, 0, -98); ctx.quadraticCurveTo(26, -96, 26, -70); ctx.lineTo(26, -10); ctx.lineTo(60, -10); ctx.lineTo(60, 30); ctx.lineTo(36, 30); ctx.lineTo(36, 14); ctx.lineTo(-26, 14); ctx.closePath()
    ink(ctx, col, { w: 6, fa: 0.4, glow: 14 })
    ctx.beginPath(); ctx.arc(0, -124, 22, 0, TAU); ink(ctx, col, { w: 6, fa: 0.85, glow: 14 })
  } else {
    ctx.beginPath(); ctx.moveTo(-28, 0); ctx.lineTo(-25, -84); ctx.quadraticCurveTo(-25, -106, 0, -107); ctx.quadraticCurveTo(25, -106, 25, -84); ctx.lineTo(28, 0); ctx.closePath()
    ink(ctx, col, { w: 6, fa: 0.4, glow: 14 })
    ctx.beginPath(); ctx.arc(0, -133, 21, 0, TAU); ink(ctx, col, { w: 6, fa: 0.85, glow: 14 })
  }
  ctx.restore()
}
function burstStar(ctx, n, r0, r1, rot = 0) {
  ctx.beginPath()
  for (let k = 0; k < n * 2; k++) { const a = (k / (n * 2)) * TAU - Math.PI / 2 + rot, r = k % 2 ? r0 : r1; k ? ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r) }
  ctx.closePath()
}
function tree(ctx, x, y, s, col, sway = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -60); ink(ctx, col, { w: 8, fa: 0, glow: 8 })
  ctx.rotate(sway)
  ctx.beginPath(); ctx.arc(0, -90, 42, 0, TAU); ctx.arc(-30, -70, 28, 0, TAU); ctx.arc(30, -72, 28, 0, TAU); ink(ctx, '#7be08a', { w: 6, fa: 0.4, glow: 12 })
  ctx.restore()
}

// ♈ EaDo: a warehouse with a mural wall and swinging string lights; a pin hops off to the next spot
export function eado(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  ground(ctx, col)
  // warehouse with a sawtooth roof
  ctx.beginPath(); ctx.moveTo(-250, 200); ctx.lineTo(-250, -40)
  for (let k = 0; k < 4; k++) { const x0 = -250 + k * 100; ctx.lineTo(x0 + 70, -110); ctx.lineTo(x0 + 70, -40); ctx.lineTo(x0 + 100, -40) }
  ctx.lineTo(150, 200); ctx.closePath(); ink(ctx, col, { w: 8, fa: 0.2 })
  // mural: bold diagonal colour bands, clipped to the wall
  ctx.save(); ctx.beginPath(); ctx.rect(-236, -26, 372, 212); ctx.clip()
  const MC = ['#f0603a', '#f2c75c', '#ff8fb1', '#38c4ec', '#7be08a']
  for (let k = -3; k < 8; k++) { ctx.beginPath(); ctx.moveTo(-260 + k * 70, 200); ctx.lineTo(-180 + k * 70, -40); ctx.lineTo(-145 + k * 70, -40); ctx.lineTo(-225 + k * 70, 200); ctx.closePath(); ctx.fillStyle = hexA(MC[(k + 3) % 5], 0.55); ctx.fill() }
  ctx.restore()
  rr(ctx, -60, 90, 90, 110, 6); ink(ctx, col, { w: 6, fa: 0.5, fill: VOID })
  // string lights from the roof to a pole
  ctx.beginPath(); ctx.moveTo(240, 200); ctx.lineTo(240, -70); ink(ctx, col, { w: 7, fa: 0 })
  const sag = 50 + 10 * Math.sin(u * 4)
  ctx.beginPath(); ctx.moveTo(150, -40); ctx.quadraticCurveTo(195, -40 + sag, 240, -70); ctx.strokeStyle = hexA(BONE, 0.6); ctx.lineWidth = 3; ctx.stroke()
  for (let k = 1; k < 6; k++) {
    const v = k / 6, bx = lerp(150, 240, v), by = (1 - v) * (1 - v) * -40 + 2 * v * (1 - v) * (-40 + sag) + v * v * -70
    const on = 0.5 + 0.5 * Math.sin(u * 9 + k * 2)
    ctx.beginPath(); ctx.arc(bx, by + 8, 7, 0, TAU); ctx.shadowColor = GOLD; ctx.shadowBlur = 16 * on; ctx.fillStyle = hexA('#ffe7a0', 0.5 + 0.5 * on); ctx.fill(); ctx.shadowBlur = 0
  }
  // the pin: lands on the roof, then hops off to the right with a dashed trail and a "next" pin
  const hop = ease.inOutCubic(prog(u, 1.15, 1.6))
  const px = lerp(-100, 300, hop), py = lerp(-120, 120, hop) - Math.sin(Math.PI * hop) * 160
  if (hop > 0) {
    ctx.save(); ctx.setLineDash([4, 22]); ctx.beginPath()
    for (let k = 0; k <= 20 * hop; k++) { const v = k / 20, qx = lerp(-100, 300, v), qy = lerp(-120, 120, v) - Math.sin(Math.PI * v) * 160; k ? ctx.lineTo(qx, qy - 40) : ctx.moveTo(qx, qy - 40) }
    ink(ctx, GOLD, { w: 7, fa: 0, glow: 10 }); ctx.restore()
  }
  pin(ctx, px, py, pop(u, 0.45) * (1 + wob(u, 1.6, 0.15)), GOLD)
  ctx.restore()
}

// ♉ the Heights: a bungalow with a porch; two mimosa flutes clink on the porch
export function heights(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  ground(ctx, col)
  tree(ctx, -235, 200, 1.4, col, 0.05 * Math.sin(u * 3))
  // bungalow: wide low gable, porch roof, columns
  ctx.beginPath(); ctx.moveTo(-170, 200); ctx.lineTo(-170, 10); ctx.lineTo(170, 10); ctx.lineTo(170, 200); ctx.closePath(); ink(ctx, col, { w: 8, fa: 0.2 })
  ctx.beginPath(); ctx.moveTo(-210, 20); ctx.lineTo(0, -130); ctx.lineTo(210, 20); ctx.closePath(); ink(ctx, col, { w: 8, fa: 0.35 })
  ctx.beginPath(); ctx.moveTo(-60, -20); ctx.lineTo(60, -20); ctx.lineTo(0, -78); ctx.closePath(); ink(ctx, col, { w: 5, fa: 0.5, fill: VOID })
  for (const cx of [-150, -50, 50, 150]) { ctx.beginPath(); ctx.moveTo(cx, 40); ctx.lineTo(cx, 200); ink(ctx, BONE, { w: 9, fa: 0, glow: 8 }) }
  ctx.beginPath(); ctx.moveTo(-170, 40); ctx.lineTo(170, 40); ink(ctx, col, { w: 7, fa: 0 })
  rr(ctx, -30, 90, 60, 110, 6); ink(ctx, col, { w: 6, fa: 0.4 })
  for (const wx of [-110, 110]) { rr(ctx, wx - 26, 80, 52, 54, 4); ctx.fillStyle = hexA('#ffe7a0', 0.55 + 0.25 * Math.sin(u * 3)); ctx.fill(); ink(ctx, col, { w: 5, fa: 0 }) }
  // mimosas: slide in, clink on beat
  const cl = ease.inOutCubic(prog(u, 0.75, 1.15)), bump = wob(u, 1.15, 0.18, 22, 6)
  const flute = (sx, rot) => {
    ctx.save(); ctx.translate(sx, 140); ctx.rotate(rot)
    ctx.beginPath(); ctx.moveTo(-22, -110); ctx.lineTo(22, -110); ctx.lineTo(14, -10); ctx.lineTo(-14, -10); ctx.closePath(); ink(ctx, BONE, { w: 6, fa: 0, glow: 12 })
    ctx.beginPath(); ctx.moveTo(-19, -82); ctx.lineTo(19, -82); ctx.lineTo(14, -14); ctx.lineTo(-14, -14); ctx.closePath(); ctx.fillStyle = hexA('#ffb347', 0.85); ctx.fill()
    ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(0, 40); ctx.moveTo(-22, 40); ctx.lineTo(22, 40); ink(ctx, BONE, { w: 6, fa: 0, glow: 10 })
    ctx.fillStyle = '#fff3e0'; for (let k = 0; k < 3; k++) { const yy = -20 - ((u * 60 + k * 22) % 60); ctx.fillRect(-6 + k * 5, yy, 5, 5) }
    ctx.restore()
  }
  const k = pop(u, 0.5)
  if (k > 0.01) {
    ctx.save(); ctx.translate(0, 230); ctx.scale(k, k); ctx.translate(0, -230)
    flute(lerp(-240, -26, cl), lerp(-0.1, 0.32, cl) + bump); flute(lerp(240, 26, cl), lerp(0.1, -0.32, cl) - bump)
    ctx.restore()
    if (u > 1.15 && u < 1.6) { ctx.save(); ctx.translate(0, 34); ctx.globalAlpha *= 1 - prog(u, 1.15, 1.6); burstStar(ctx, 8, 22, 60 * pop(u, 1.15, 0.2)); ink(ctx, GOLD, { w: 5, fa: 0.6, glow: 20 }); ctx.restore() }
  }
  ctx.restore()
}

// ♊ Midtown: mid-rise towers; three plan bubbles pop above (8 PM · 10 PM · 1 AM)
export function midtown(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  ground(ctx, col)
  const TW = [[-230, 120, 230], [-90, 150, 300], [80, 130, 250], [220, 100, 180]]
  TW.forEach(([cx, w, h], i) => {
    rr(ctx, cx - w / 2, 200 - h, w, h, 6); ink(ctx, col, { w: 7, fa: 0.22 })
    for (let r = 0; r < Math.floor((h - 30) / 44); r++) for (let c = 0; c < 2; c++) {
      const on = Math.sin(r * 3.1 + c * 1.7 + i * 2 + Math.floor(u * 4)) > 0.1
      ctx.fillStyle = on ? hexA('#ffe7a0', 0.8) : hexA(BONE, 0.12); ctx.fillRect(cx - w / 4 - 12 + c * w / 2, 200 - h + 22 + r * 44, 24, 22)
    }
  })
  ;[['8 PM', -200, -200, 0.55, '#f2cf4a'], ['10 PM', 0, -270, 0.9, '#ff8fb1'], ['1 AM', 200, -200, 1.25, '#38c4ec']].forEach(([t, bx, by, a, c]) => {
    const k = pop(u, a, 0.36, 2.6)
    if (k <= 0.01) return
    ctx.save(); ctx.translate(bx, by + 6 * Math.sin(u * 3 + bx)); ctx.scale(k, k)
    rr(ctx, -88, -42, 176, 84, 40); ink(ctx, c, { w: 7, fa: 0.35, fill: VOID, glow: 18 }); ctx.fillStyle = hexA(VOID, 0.7); ctx.fill()
    ctx.beginPath(); ctx.moveTo(-14, 40); ctx.lineTo(0, 66); ctx.lineTo(14, 40); ink(ctx, c, { w: 6, fa: 0 })
    txt(ctx, t, 0, 3, 40, BONE, MONO, 700)
    ctx.restore()
  })
  ctx.restore()
}

// ♋ Bellaire: a welcoming house, the door swings open and a heart floats out; a pot steams on the table
export function bellaire(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  ground(ctx, col)
  ctx.beginPath(); ctx.moveTo(-190, 200); ctx.lineTo(-190, -20); ctx.lineTo(0, -170); ctx.lineTo(190, -20); ctx.lineTo(190, 200); ctx.closePath(); ink(ctx, col, { w: 8, fa: 0.22 })
  rr(ctx, 100, -150, 44, 90, 4); ink(ctx, col, { w: 7, fa: 0.35 })
  for (let i = 0; i < 3; i++) {
    const ph = (u * 0.8 + i * 0.33) % 1
    ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * ph) * 0.8; ctx.beginPath()
    for (let k = 0; k <= 8; k++) { const yy = -160 - ph * 90 - k * 9, xx = 122 + 10 * Math.sin(k * 0.7 + u * 4 + i); k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy) }
    ink(ctx, BONE, { w: 6, fa: 0, glow: 10 }); ctx.restore()
  }
  for (const wx of [-120, 120]) { rr(ctx, wx - 36, 10, 72, 66, 6); ctx.fillStyle = hexA('#ffe7a0', 0.6); ctx.fill(); ink(ctx, col, { w: 5, fa: 0 }); ctx.beginPath(); ctx.moveTo(wx, 10); ctx.lineTo(wx, 76); ctx.moveTo(wx - 36, 43); ctx.lineTo(wx + 36, 43); ink(ctx, col, { w: 4, fa: 0, glow: 0 }) }
  // door opens
  const op = ease.outCubic(prog(u, 0.8, 1.15))
  rr(ctx, -45, 60, 90, 140, 6); ctx.fillStyle = hexA('#ffd98a', 0.85 * op); ctx.fill(); ink(ctx, col, { w: 6, fa: 0 })
  ctx.beginPath(); ctx.moveTo(-45, 60); ctx.lineTo(-45 + 90 * (1 - op * 0.75), 60 + 10 * op); ctx.lineTo(-45 + 90 * (1 - op * 0.75), 200 - 10 * op); ctx.lineTo(-45, 200); ctx.closePath(); ink(ctx, col, { w: 6, fa: 0.7, fill: tint(col, VOID, 0.5) })
  // heart floats out
  const hk = pop(u, 1.1, 0.4, 3)
  if (hk > 0.01) {
    const hy = 110 - ease.outCubic(prog(u, 1.1, 2.2)) * 260
    ctx.save(); ctx.translate(0, hy); ctx.scale(hk * 0.9, hk * 0.9)
    ctx.beginPath(); ctx.moveTo(0, 42); ctx.bezierCurveTo(-70, -6, -46, -62, 0, -26); ctx.bezierCurveTo(46, -62, 70, -6, 0, 42); ctx.closePath(); ink(ctx, PINK, { w: 7, fa: 0.7, glow: 24 })
    ctx.restore()
  }
  // a little table with a steaming pot, out front
  const tk = pop(u, 0.45)
  if (tk > 0.01) {
    ctx.save(); ctx.translate(-275, 200); ctx.scale(tk, tk)
    ctx.beginPath(); ctx.moveTo(-60, -70); ctx.lineTo(60, -70); ctx.moveTo(-46, -70); ctx.lineTo(-46, 0); ctx.moveTo(46, -70); ctx.lineTo(46, 0); ink(ctx, BONE, { w: 7, fa: 0, glow: 8 })
    rr(ctx, -36, -122, 72, 50, 14); ink(ctx, '#ff8a6a', { w: 6, fa: 0.6 })
    ctx.beginPath(); ctx.moveTo(-44, -110); ctx.lineTo(-36, -110); ctx.moveTo(36, -110); ctx.lineTo(44, -110); ink(ctx, '#ff8a6a', { w: 6, fa: 0 })
    for (let i = 0; i < 2; i++) { const ph = (u * 1.1 + i * 0.5) % 1; ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * ph); ctx.beginPath(); for (let k = 0; k <= 6; k++) { const yy = -130 - ph * 50 - k * 7, xx = (i - 0.5) * 26 + 7 * Math.sin(k + u * 5); k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy) } ink(ctx, BONE, { w: 5, fa: 0, glow: 8 }); ctx.restore() }
    ctx.restore()
  }
  ctx.restore()
}

// ♌ the Galleria area: a glass barrel vault; spotlights swing in and land on one pictogram
export function galleria(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  // spotlights first (behind)
  const sw = ease.outCubic(prog(u, 0.5, 1.15)), hit = prog(u, 1.15, 1.3)
  ;[-1, 1].forEach(sd => {
    const a = lerp(sd * 0.9, sd * 0.36, sw) + 0.03 * Math.sin(u * 3)
    ctx.save(); ctx.translate(sd * 300, -250); ctx.rotate(-a)
    const g = ctx.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, hexA('#fff3c4', 0.5 + 0.2 * hit)); g.addColorStop(1, hexA('#fff3c4', 0))
    ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.lineTo(120, 520); ctx.lineTo(-120, 520); ctx.closePath(); ctx.fillStyle = g; ctx.globalCompositeOperation = 'lighter'; ctx.fill(); ctx.globalCompositeOperation = 'source-over'
    rr(ctx, -24, -20, 48, 40, 8); ink(ctx, BONE, { w: 6, fa: 0.5 })
    ctx.restore()
  })
  ground(ctx, col)
  // barrel vault: arch + glass grid
  ctx.beginPath(); ctx.moveTo(-260, 200); ctx.lineTo(-260, 20); ctx.ellipse(0, 20, 260, 170, 0, Math.PI, 0); ctx.lineTo(260, 200); ink(ctx, col, { w: 8, fa: 0.12 })
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 20, 252, 162, 0, Math.PI, 0); ctx.closePath(); ctx.clip()
  ctx.strokeStyle = hexA(col, 0.6); ctx.lineWidth = 4
  for (let k = -5; k <= 5; k++) { ctx.beginPath(); ctx.moveTo(k * 46, 20); ctx.lineTo(k * 46 * 0.6, -160); ctx.stroke() }
  for (let r = 1; r < 4; r++) { ctx.beginPath(); ctx.ellipse(0, 20, 260 * (1 - r * 0.22), 170 * (1 - r * 0.22), 0, Math.PI, 0); ctx.stroke() }
  const sh = ((u * 0.7) % 1) * 700 - 350; ctx.beginPath(); ctx.moveTo(sh, -200); ctx.lineTo(sh + 60, -200); ctx.lineTo(sh - 40, 40); ctx.lineTo(sh - 100, 40); ctx.closePath(); ctx.fillStyle = hexA('#ffffff', 0.2); ctx.fill()
  ctx.restore()
  ctx.beginPath(); ctx.moveTo(-260, 20); ctx.lineTo(260, 20); ink(ctx, col, { w: 7, fa: 0 })
  for (const cx of [-200, -100, 100, 200]) { ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, 200); ink(ctx, col, { w: 5, fa: 0, glow: 6 }) }
  // the star of the show
  const pk = pop(u, 0.35)
  ctx.beginPath(); ctx.ellipse(0, 200, 90, 18, 0, 0, TAU); ctx.fillStyle = hexA('#fff3c4', 0.25 + 0.5 * hit); ctx.fill()
  if (pk > 0.01) person(ctx, 0, 196, 0.95 * pk * (1 + wob(u, 1.2, 0.08, 20, 6)), GOLD, { lean: wob(u, 1.2, 0.12, 12, 4) })
  if (hit > 0) { ctx.save(); ctx.translate(70, 20); ctx.globalAlpha *= clamp(2 - 2 * prog(u, 1.3, 2.2)); burstStar(ctx, 4, 8, 34 * pop(u, 1.2, 0.3), u * 2); ink(ctx, '#fff3c4', { w: 4, fa: 1, glow: 20 }); ctx.restore() }
  ctx.restore()
}

// ♍ Rice Village: a shopfront with a striped awning; a reservation card pops and gets a check
export function village(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  ground(ctx, col)
  tree(ctx, 250, 200, 1.2, col, 0.05 * Math.sin(u * 3 + 1))
  rr(ctx, -230, -60, 400, 260, 6); ink(ctx, col, { w: 8, fa: 0.2 })
  // awning (scallops)
  ctx.save(); ctx.translate(-30, -60)
  const N = 7, aw = 440 / N
  for (let k = 0; k < N; k++) { ctx.beginPath(); ctx.moveTo(-220 + k * aw, -30); ctx.lineTo(-220 + (k + 1) * aw, -30); ctx.lineTo(-220 + (k + 1) * aw, 40); ctx.arc(-220 + (k + 0.5) * aw, 40, aw / 2, 0, Math.PI); ctx.closePath(); ctx.fillStyle = k % 2 ? hexA(BONE, 0.85) : hexA(col, 0.9); ctx.fill() }
  ctx.beginPath(); ctx.moveTo(-220, -30); ctx.lineTo(220, -30); ink(ctx, col, { w: 7, fa: 0 })
  ctx.restore()
  rr(ctx, -200, 40, 150, 110, 6); ctx.fillStyle = hexA('#ffe7a0', 0.55); ctx.fill(); ink(ctx, col, { w: 5, fa: 0 })
  rr(ctx, -10, 40, 80, 160, 6); ink(ctx, col, { w: 6, fa: 0.4 })
  // reservation card
  const k = pop(u, 0.55, 0.4, 2.6)
  if (k > 0.01) {
    ctx.save(); ctx.translate(120, -150); ctx.rotate(0.08 + wob(u, 0.55, 0.1)); ctx.scale(k, k)
    rr(ctx, -150, -70, 300, 140, 16); ink(ctx, BONE, { w: 6, fa: 0.92, fill: '#fff8ea', glow: 18 })
    txt(ctx, 'TABLE FOR 2', 0, -28, 30, '#3a2a4a', MONO, 700)
    txt(ctx, '7:30 PM', 0, 22, 48, '#3a2a4a', INTER, 900)
    const ck = pop(u, 1.2, 0.3, 3)
    if (ck > 0.01) {
      ctx.save(); ctx.translate(150, -72); ctx.scale(ck, ck)
      ctx.beginPath(); ctx.arc(0, 0, 40, 0, TAU); ink(ctx, '#2fc79a', { w: 6, fa: 0.95, glow: 16 })
      ctx.beginPath(); ctx.moveTo(-18, 2); ctx.lineTo(-5, 16); ctx.lineTo(20, -14); ctx.strokeStyle = '#fff'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke()
      ctx.restore()
    }
    ctx.restore()
  }
  ctx.restore()
}

// ♎ the Museum District: a columned facade; an abstract artwork on an easel tilts and straightens itself
export function museum(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  ground(ctx, col)
  ctx.beginPath(); ctx.moveTo(-250, -60); ctx.lineTo(0, -180); ctx.lineTo(250, -60); ctx.closePath(); ink(ctx, col, { w: 8, fa: 0.3 })
  rr(ctx, -250, -60, 500, 30, 4); ink(ctx, col, { w: 7, fa: 0.3 })
  for (let k = 0; k < 6; k++) { const cx = -210 + k * 84; rr(ctx, cx - 16, -30, 32, 200, 6); ink(ctx, BONE, { w: 6, fa: 0.25, glow: 10 }) }
  for (let k = 0; k < 2; k++) { rr(ctx, -270 + k * 10, 170 + k * 15, 540 - k * 20, 15, 3); ink(ctx, col, { w: 5, fa: 0.3, glow: 6 }) }
  // the artwork, front and centre
  const k = pop(u, 0.45, 0.42, 2.4)
  if (k > 0.01) {
    const tilt = u < 1.1 ? 0.22 : 0.22 * Math.exp(-(u - 1.1) * 5) * Math.cos((u - 1.1) * 16)
    ctx.save(); ctx.translate(0, 70); ctx.scale(k, k); ctx.rotate(tilt)
    rr(ctx, -130, -110, 260, 200, 8); ink(ctx, GOLD, { w: 10, fa: 0.95, fill: '#1d1440', glow: 22 })
    ctx.save(); ctx.beginPath(); ctx.rect(-116, -96, 232, 172); ctx.clip()
    ctx.beginPath(); ctx.arc(-40, -20, 52, 0, TAU); ctx.fillStyle = '#e163d6'; ctx.fill()
    ctx.beginPath(); ctx.moveTo(10, 70); ctx.lineTo(80, -70); ctx.lineTo(130, 70); ctx.closePath(); ctx.fillStyle = '#38c4ec'; ctx.fill()
    ctx.fillStyle = '#f2c75c'; ctx.fillRect(-110, 30, 140, 30)
    ctx.restore()
    ctx.restore()
    if (u > 1.1 && u < 1.9) { ctx.save(); ctx.globalAlpha *= 1 - prog(u, 1.3, 1.9); for (const [sx, sy] of [[-170, -60], [170, -40], [150, 120]]) { ctx.save(); ctx.translate(sx, sy); burstStar(ctx, 4, 6, 26 * pop(u, 1.1, 0.3)); ink(ctx, '#fff3c4', { w: 3, fa: 1, glow: 16 }); ctx.restore() } ctx.restore() }
  }
  ctx.restore()
}

// ♏ the downtown tunnels: street level above, a lit tunnel below; a dotted secret route runs through it
export function tunnels(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  // street + tower bases above
  ctx.beginPath(); ctx.moveTo(-300, -60); ctx.lineTo(300, -60); ink(ctx, col, { w: 8, fa: 0 })
  for (const [cx, w, h] of [[-210, 110, 170], [-60, 130, 220], [100, 100, 150], [230, 90, 190]]) { ctx.beginPath(); ctx.rect(cx - w / 2, -60 - h, w, h); ink(ctx, col, { w: 6, fa: 0.15, glow: 8 }) }
  // earth band
  ctx.fillStyle = hexA(tint(col, VOID, 0.6), 0.6); ctx.fillRect(-300, -54, 600, 280)
  // the tunnel
  ctx.beginPath(); ctx.moveTo(-290, 190); ctx.lineTo(-290, 70); ctx.quadraticCurveTo(-290, 10, -230, 10); ctx.lineTo(230, 10); ctx.quadraticCurveTo(290, 10, 290, 70); ctx.lineTo(290, 190); ctx.closePath()
  ink(ctx, tint(col, '#ffffff', 0.2), { w: 8, fa: 0.5, fill: VOID, glow: 20 })
  for (let k = 0; k < 6; k++) { const lx = -230 + k * 92; ctx.beginPath(); ctx.arc(lx, 28, 8, 0, TAU); ctx.fillStyle = '#ffe7a0'; ctx.shadowColor = GOLD; ctx.shadowBlur = 16; ctx.fill(); ctx.shadowBlur = 0 }
  // stair shafts up to the street
  for (const sx of [-200, 160]) { ctx.beginPath(); ctx.rect(sx, -54, 50, 64); ink(ctx, col, { w: 5, fa: 0.25, glow: 6 }); for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(sx, -54 + k * 16); ctx.lineTo(sx + 50, -54 + k * 16); ctx.strokeStyle = hexA(col, 0.7); ctx.lineWidth = 3; ctx.stroke() } }
  // the secret route: dotted line from the left shaft down, along the tunnel, up the right shaft
  const P = [[-175, -100], [-175, 110], [-60, 110], [-20, 150], [100, 150], [140, 110], [185, 110], [185, -100]]
  const segs = []; let L = 0
  for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); segs.push(d); L += d }
  const pr = ease.inOutCubic(prog(u, 0.55, 1.6)) * L
  ctx.save(); ctx.setLineDash([2, 22]); ctx.beginPath(); ctx.moveTo(...P[0])
  let acc = 0, hx = P[0][0], hy = P[0][1]
  for (let i = 1; i < P.length; i++) {
    const d = segs[i - 1]
    if (acc + d <= pr) { ctx.lineTo(...P[i]); hx = P[i][0]; hy = P[i][1] } else { const v = (pr - acc) / d; hx = lerp(P[i - 1][0], P[i][0], v); hy = lerp(P[i - 1][1], P[i][1], v); ctx.lineTo(hx, hy); break }
    acc += d
  }
  ink(ctx, '#ff4d6d', { w: 10, fa: 0, glow: 16 }); ctx.restore()
  if (pr > 0) { ctx.beginPath(); ctx.arc(hx, hy, 14, 0, TAU); ink(ctx, '#ff4d6d', { w: 5, fa: 1, glow: 24 }) }
  if (u > 1.6) { const k = pop(u, 1.6, 0.3, 3); ctx.save(); ctx.translate(185, -130); ctx.scale(k, k); burstStar(ctx, 5, 14, 34, u); ink(ctx, '#ffb3c3', { w: 4, fa: 0.9, glow: 20 }); ctx.restore() }
  ctx.restore()
}

// ♐ Buffalo Bayou trails: a winding bayou, a path, trees and the sun; a runner is already on the trail
export function bayou(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  // sun
  const sk = pop(u, 0.3, 0.5, 1.6)
  if (sk > 0.01) { ctx.save(); ctx.translate(190, -150); ctx.rotate(u * 0.6); ctx.scale(sk, sk); burstStar(ctx, 12, 52, 78); ink(ctx, GOLD, { w: 5, fa: 0.3, glow: 18 }); ctx.beginPath(); ctx.arc(0, 0, 44, 0, TAU); ink(ctx, GOLD, { w: 6, fa: 0.85, glow: 24 }); ctx.restore() }
  // skyline far away
  ctx.save(); ctx.globalAlpha *= 0.55
  ctx.beginPath(); ctx.moveTo(-300, 0); for (const [bx, bh] of [[-270, 60], [-240, 110], [-200, 80], [-170, 150], [-130, 100], [-100, 70]]) { ctx.lineTo(bx, -bh); ctx.lineTo(bx + 26, -bh) } ctx.lineTo(-60, 0); ink(ctx, col, { w: 5, fa: 0.2, glow: 6 })
  ctx.restore()
  // the bayou: a wavy blue band snaking down toward us
  const curve = v => ({ x: 120 * Math.sin(v * 3.2 + 0.4) - 40 * v, y: lerp(0, 220, v) })
  ctx.beginPath()
  for (let k = 0; k <= 30; k++) { const v = k / 30, c = curve(v), w = lerp(20, 110, v); k ? ctx.lineTo(c.x - w, c.y) : ctx.moveTo(c.x - w, c.y) }
  for (let k = 30; k >= 0; k--) { const v = k / 30, c = curve(v), w = lerp(20, 110, v); ctx.lineTo(c.x + w, c.y) }
  ctx.closePath(); ink(ctx, '#38c4ec', { w: 6, fa: 0.55, glow: 18 })
  ctx.strokeStyle = hexA('#d8f6ff', 0.7); ctx.lineWidth = 4
  for (let k = 0; k < 5; k++) { const v = ((u * 0.25 + k * 0.2) % 1), c = curve(v), w = lerp(10, 50, v); ctx.beginPath(); ctx.moveTo(c.x - w, c.y); ctx.lineTo(c.x + w, c.y); ctx.stroke() }
  // the trail beside it
  ctx.save(); ctx.setLineDash([16, 14]); ctx.beginPath()
  for (let k = 0; k <= 30; k++) { const v = k / 30, c = curve(v); const px = c.x + lerp(50, 190, v); k ? ctx.lineTo(px, c.y) : ctx.moveTo(px, c.y) }
  ink(ctx, BONE, { w: 6, fa: 0, glow: 6 }); ctx.restore()
  tree(ctx, -250, 200, 1.1, col, 0.06 * Math.sin(u * 3)); tree(ctx, 280, 120, 0.8, col, 0.06 * Math.sin(u * 3 + 1)); tree(ctx, -170, 70, 0.7, col, 0.05 * Math.sin(u * 3 + 2))
  // runner jogging along the trail toward us
  const rv = clamp(0.25 + 0.5 * prog(u, 0.5, 2.4)), c = curve(rv), rx = c.x + lerp(50, 190, rv), ry = c.y
  const bob = Math.abs(Math.sin(u * 12)) * 8
  if (u > 0.5) person(ctx, rx, ry - bob, lerp(0.5, 0.95, rv) * pop(u, 0.5), GOLD, { lean: 0.15 })
  ctx.restore()
}

// ♑ Downtown: tall towers, the sun barely up, one office window lit first, then a coffee cup steams
export function downtown(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  // sunrise glow at the horizon
  const g = ctx.createRadialGradient(0, 200, 10, 0, 200, 360); g.addColorStop(0, hexA('#ffb36b', 0.45)); g.addColorStop(1, hexA('#ffb36b', 0))
  ctx.fillStyle = g; ctx.fillRect(-320, -160, 640, 360)
  const sr = ease.outCubic(prog(u, 0.3, 1.8)); ctx.save(); ctx.beginPath(); ctx.rect(-320, -300, 640, 500); ctx.clip(); ctx.beginPath(); ctx.arc(-140, 230 - 90 * sr, 60, 0, TAU); ink(ctx, '#ffb36b', { w: 6, fa: 0.7, glow: 24 }); ctx.restore()
  ground(ctx, col)
  const TW = [[-230, 90, 260, 0], [-120, 110, 400, 1], [10, 100, 330, 0], [130, 120, 440, 2], [250, 80, 230, 0]]
  TW.forEach(([cx, w, h, roof], i) => {
    ctx.beginPath(); ctx.moveTo(cx - w / 2, 200); ctx.lineTo(cx - w / 2, 200 - h)
    if (roof === 1) { ctx.lineTo(cx, 200 - h - 50) } else if (roof === 2) { ctx.lineTo(cx - w / 2 + 20, 200 - h - 30); ctx.lineTo(cx + w / 2 - 20, 200 - h - 30) }
    ctx.lineTo(cx + w / 2, 200 - h); ctx.lineTo(cx + w / 2, 200); ctx.closePath(); ink(ctx, col, { w: 7, fa: 0.25 })
    for (let r = 0; r < Math.floor((h - 30) / 36); r++) for (let c = 0; c < 3; c++) {
      const early = i === 3 && r === 2 && c === 1
      const on = early ? prog(u, 0.45, 0.5) : prog(u, 1.2 + ((r * 7 + c * 3 + i * 5) % 11) * 0.04, 1.25 + ((r * 7 + c * 3 + i * 5) % 11) * 0.04) * (((r + c + i) % 3) ? 1 : 0)
      ctx.fillStyle = on > 0 ? hexA('#ffe7a0', 0.25 + 0.7 * on) : hexA(BONE, 0.1)
      if (early && on > 0) { ctx.shadowColor = GOLD; ctx.shadowBlur = 24 }
      ctx.fillRect(cx - w / 2 + 12 + c * (w - 24) / 3, 200 - h + 20 + r * 36, (w - 24) / 3 - 8, 20); ctx.shadowBlur = 0
    }
  })
  // coffee
  const k = pop(u, 0.75)
  if (k > 0.01) {
    ctx.save(); ctx.translate(-250, 120); ctx.scale(k, k); ctx.rotate(wob(u, 0.75, 0.15))
    ctx.beginPath(); ctx.moveTo(-36, -50); ctx.lineTo(36, -50); ctx.lineTo(28, 40); ctx.lineTo(-28, 40); ctx.closePath(); ink(ctx, BONE, { w: 6, fa: 0.9, fill: '#fff8ea', glow: 14 })
    rr(ctx, -42, -66, 84, 18, 6); ink(ctx, '#7a3b22', { w: 5, fa: 1, glow: 6 })
    ctx.fillStyle = col; ctx.fillRect(-32, -16, 64, 22)
    for (let i = 0; i < 2; i++) { const ph = (u * 1.1 + i * 0.5) % 1; ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * ph); ctx.beginPath(); for (let j = 0; j <= 6; j++) { const yy = -74 - ph * 50 - j * 7, xx = (i - 0.5) * 22 + 7 * Math.sin(j + u * 5); j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy) } ink(ctx, BONE, { w: 5, fa: 0, glow: 8 }); ctx.restore() }
    ctx.restore()
  }
  ctx.restore()
}

// ♒ Montrose: a quirky shop front with a mural; its neon "VINTAGE" sign flickers on; a record spins in the window
export function montrose(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  ground(ctx, col)
  ctx.beginPath(); ctx.moveTo(-250, 200); ctx.lineTo(-250, -80); ctx.lineTo(-170, -130); ctx.lineTo(-90, -80); ctx.lineTo(-10, -130); ctx.lineTo(70, -80); ctx.lineTo(150, -130); ctx.lineTo(250, -80); ctx.lineTo(250, 200); ctx.closePath(); ink(ctx, col, { w: 8, fa: 0.2 })
  // sunburst mural on the right wall
  ctx.save(); ctx.beginPath(); ctx.rect(110, -70, 130, 260); ctx.clip(); ctx.translate(175, 190); ctx.rotate(u * 0.3)
  const MC = ['#f0603a', '#f2c75c', '#ff8fb1', '#38c4ec', '#7be08a', '#c9a6ff']
  for (let k = 0; k < 12; k++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 320, k * TAU / 12, (k + 0.5) * TAU / 12); ctx.closePath(); ctx.fillStyle = hexA(MC[k % 6], 0.6); ctx.fill() }
  ctx.restore()
  // window with a spinning record
  rr(ctx, -220, 10, 200, 150, 8); ink(ctx, col, { w: 6, fa: 0.5, fill: VOID })
  ctx.save(); ctx.translate(-120, 88); ctx.rotate(u * 5)
  ctx.beginPath(); ctx.arc(0, 0, 58, 0, TAU); ink(ctx, BONE, { w: 5, fa: 0.95, fill: '#16102c', glow: 10 })
  ctx.strokeStyle = hexA(BONE, 0.35); ctx.lineWidth = 2; for (const r of [40, 30]) { ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke() }
  ctx.beginPath(); ctx.arc(0, 0, 18, 0, TAU); ctx.fillStyle = '#ff8fb1'; ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(-3, -12, 6, 6)
  ctx.restore()
  rr(ctx, 10, 40, 80, 160, 6); ink(ctx, col, { w: 6, fa: 0.4 })
  // neon sign: flickers on
  const f = u < 0.6 ? 0 : u < 0.68 ? 1 : u < 0.76 ? 0.15 : u < 0.82 ? 1 : u < 0.88 ? 0.3 : 1
  ctx.save(); ctx.translate(-60, -40); ctx.rotate(-0.05)
  rr(ctx, -150, -36, 300, 72, 36); ctx.strokeStyle = hexA('#ff4fd8', 0.25 + 0.75 * f); ctx.lineWidth = 6; ctx.shadowColor = '#ff4fd8'; ctx.shadowBlur = 30 * f; ctx.stroke()
  ctx.font = `800 46px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.letterSpacing = '6px'
  ctx.fillStyle = hexA('#9ff5ff', 0.25 + 0.75 * f); ctx.shadowColor = '#38c4ec'; ctx.shadowBlur = 26 * f; ctx.fillText('VINTAGE', 4, 3); ctx.shadowBlur = 0; ctx.letterSpacing = '0px'
  ctx.restore()
  ctx.restore()
}

// ♓ Galveston Bay: a pier over the water at night; a pictogram sits at the end, staring out; the moon shimmers; a fish leaps
export function bay(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  // moon + its shimmer path
  ctx.beginPath(); ctx.arc(150, -170, 46, 0, TAU); ink(ctx, '#fff3c4', { w: 5, fa: 0.85, glow: 30 })
  for (let k = 0; k < 7; k++) { const yy = 30 + k * 26, w = 20 + k * 14 + 8 * Math.sin(u * 4 + k); ctx.fillStyle = hexA('#fff3c4', 0.5 - k * 0.05); ctx.fillRect(150 - w / 2 + 10 * Math.sin(u * 3 + k * 2), yy, w, 6) }
  // waves
  for (let r = 0; r < 4; r++) {
    ctx.beginPath()
    for (let xx = -300; xx <= 300; xx += 10) { const yy = 10 + r * 60 + 10 * Math.sin(xx / 40 + u * 3 + r * 1.3); xx === -300 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy) }
    ink(ctx, r % 2 ? '#38c4ec' : tint(col, '#ffffff', 0.2), { w: 6, fa: 0, glow: 12 })
  }
  // pier
  ctx.beginPath(); ctx.moveTo(-320, -10); ctx.lineTo(-40, -10); ink(ctx, BONE, { w: 10, fa: 0, glow: 8 })
  for (const px of [-290, -210, -130, -60]) { ctx.beginPath(); ctx.moveTo(px, -10); ctx.lineTo(px, 120); ink(ctx, BONE, { w: 7, fa: 0, glow: 6 }) }
  // the dreamer at the end of the pier
  person(ctx, -80, -24, 0.85, '#c9a6ff', { sit: true, lean: 0.03 * Math.sin(u * 1.5) })
  // a fish leaps
  const fp = prog(u, 0.9, 1.7)
  if (fp > 0 && fp < 1) {
    const fx = lerp(20, 230, fp), fy = 80 - Math.sin(Math.PI * fp) * 190
    ctx.save(); ctx.translate(fx, fy); ctx.rotate(lerp(-0.9, 0.9, fp))
    ctx.beginPath(); ctx.ellipse(0, 0, 40, 18, 0, 0, TAU); ctx.moveTo(34, 0); ctx.lineTo(62, -18); ctx.lineTo(62, 18); ctx.closePath(); ink(ctx, '#ffb347', { w: 5, fa: 0.8, glow: 16 })
    ctx.restore()
  }
  for (const [t0, sx] of [[0.95, 20], [1.7, 230]]) { const sp = prog(u, t0, t0 + 0.4); if (sp > 0 && sp < 1) { ctx.save(); ctx.globalAlpha *= 1 - sp; for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.4; ctx.fillStyle = '#d8f6ff'; ctx.fillRect(sx + Math.cos(a) * 60 * sp - 4, 70 + Math.sin(a) * 60 * sp - 4, 8, 8) } ctx.restore() } }
  ctx.restore()
}

export { pop, wob, pulse, burstStar, rr, txt }
