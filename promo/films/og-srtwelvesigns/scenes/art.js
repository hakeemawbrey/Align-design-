// (copied from promo/films/twelvesigns, the original this remix remakes)
// twelvesigns · line-art props (bold, friendly, thick glowing strokes, flat 20–40% fills, no faces).
// Every prop draws around (x, y) at scale s. `u` = seconds since the sign's downbeat (pure fn of time); B = one beat.
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c', VOID = '#0b0620'
export const B = 60 / 108
const TAU = Math.PI * 2
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
/** hex → hex mix */
export const tint = (a, b, k) => { const A = h2r(a), Bb = h2r(b); return '#' + A.map((v, i) => Math.round(lerp(v, Bb[i], clamp(k))).toString(16).padStart(2, '0')).join('') }
export const hexA = (hex, a) => hex + Math.round(clamp(a) * 255).toString(16).padStart(2, '0')

/** fill the current path at fa, then stroke it thick with a glow */
export function ink(ctx, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { ctx.fillStyle = hexA(fill, fa); ctx.fill() }
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.shadowColor = col; ctx.shadowBlur = glow
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke()
  ctx.shadowBlur = 0
}
function begin(ctx, x, y, s, a = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a }
/** springy 0→1 pop starting at a */
const pop = (u, a, d = 0.42, s = 2.2) => easeOutBack(prog(u, a, a + d), s)
/** damped wobble after a */
const wob = (u, a, amp = 1, f = 16, k = 5) => u > a ? amp * Math.exp(-(u - a) * k) * Math.sin((u - a) * f) : 0
/** beat pulse (1 on each beat, decaying) */
const pulse = (u, k = 7) => { const ph = ((u % B) + B) % B; return Math.exp(-ph * k) }

function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r) }
function label(ctx, txt, x, y, size, col, { weight = 900, italic = false } = {}) {
  ctx.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = col; ctx.fillText(txt, x, y)
}
function burstStar(ctx, n, r0, r1) {
  ctx.beginPath()
  for (let k = 0; k < n * 2; k++) { const a = (k / (n * 2)) * TAU - Math.PI / 2, r = k % 2 ? r0 : r1; k ? ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r) }
  ctx.closePath()
}

// ───────────────────────── ♈ a little rocket on a launch pad: rumbles, then blasts off on beat 4 with a GO! burst
export function rocket(ctx, x, y, s, u, col) {
  const fire = 4 * B
  const lift = ease.inQuad(prog(u, fire, fire + 0.95)) * 1500
  const shake = u > 3 * B && u < fire + 0.3 ? 4 * Math.sin(u * 70) * prog(u, 3 * B, fire) : 0
  begin(ctx, x, y, s)
  // launch pad + tower
  ctx.beginPath(); ctx.moveTo(-220, 200); ctx.lineTo(220, 200); ink(ctx, col, { w: 8, fa: 0 })
  rr(ctx, -110, 170, 220, 30, 8); ink(ctx, col, { w: 7, fa: 0.3 })
  ctx.beginPath(); ctx.moveTo(-170, 170); ctx.lineTo(-170, -120); ctx.moveTo(-200, 170); ctx.lineTo(-200, -120)
  for (let k = 0; k < 6; k++) { const yy = 170 - k * 48; ctx.moveTo(-200, yy); ctx.lineTo(-170, yy - 48) }
  ink(ctx, BONE, { w: 5, fa: 0, glow: 6 })
  // smoke clouds at the pad after ignition
  const sm = prog(u, fire - 0.1, fire + 0.5)
  if (sm > 0) {
    for (let k = 0; k < 7; k++) {
      const d = (k - 3) / 3, g = ease.outCubic(sm), r = (34 + 20 * (1 - Math.abs(d))) * (0.5 + g)
      ctx.beginPath(); ctx.arc(d * 170 * g, 165 - 20 * (1 - Math.abs(d)) * g + 4 * Math.sin(u * 3 + k), r, 0, TAU); ink(ctx, BONE, { w: 5, fa: 0.3, glow: 8 })
    }
  }
  // the rocket
  ctx.save(); ctx.translate(shake, -lift)
  // exhaust flame (flickers before lift-off, roars after)
  const fl = u > fire - 0.15 ? 1 : u > 3 * B ? 0.35 : 0
  if (fl > 0) {
    const L = (fl > 0.5 ? 150 : 60) * (1 + 0.15 * Math.sin(u * 40))
    ctx.beginPath(); ctx.moveTo(-34, 150); ctx.quadraticCurveTo(-30, 150 + L * 0.6, 0, 150 + L); ctx.quadraticCurveTo(30, 150 + L * 0.6, 34, 150); ctx.closePath(); ink(ctx, '#f0603a', { w: 6, fa: 0.6, fill: '#ffb03a' })
    ctx.beginPath(); ctx.moveTo(-16, 150); ctx.quadraticCurveTo(0, 150 + L * 0.7, 16, 150); ink(ctx, '#ffe7a8', { w: 5, fa: 0.8, fill: '#fff3e0' })
  }
  // fins
  ;[-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(d * 50, 40); ctx.lineTo(d * 105, 130); ctx.lineTo(d * 105, 165); ctx.lineTo(d * 50, 130); ctx.closePath(); ink(ctx, '#f0603a', { w: 7, fa: 0.45 }) })
  // body + nose
  ctx.beginPath(); ctx.moveTo(-55, 150); ctx.lineTo(-55, -60); ctx.quadraticCurveTo(-55, -150, 0, -215); ctx.quadraticCurveTo(55, -150, 55, -60); ctx.lineTo(55, 150); ctx.closePath()
  ink(ctx, BONE, { w: 8, fa: 0.3, fill: col })
  ctx.beginPath(); ctx.moveTo(-42, -120); ctx.quadraticCurveTo(0, -105, 42, -120); ink(ctx, '#f0603a', { w: 6, fa: 0, glow: 8 })
  // porthole
  ctx.beginPath(); ctx.arc(0, -20, 26, 0, TAU); ink(ctx, '#8fd8f6', { w: 7, fa: 0.5 })
  rr(ctx, -38, 150, 76, 16, 4); ink(ctx, BONE, { w: 5, fa: 0.4 })
  ctx.restore()
  // GO! burst
  const f = pop(u, fire, 0.32, 2.4)
  if (f > 0.01) {
    ctx.save(); ctx.translate(165, -150); ctx.rotate(0.18 + wob(u, fire + 0.1, 0.15, 12, 4)); ctx.scale(f, f)
    burstStar(ctx, 11, 92, 150); ink(ctx, GOLD, { w: 7, fa: 0.35 })
    label(ctx, 'GO!', 0, 4, 84, '#fff3e0', { italic: true })
    ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── ♉ a cozy snack plate; snacks drop on beats, then a mug steams
export function snacks(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  ctx.beginPath(); ctx.ellipse(0, 110, 250, 72, 0, 0, TAU); ink(ctx, BONE, { w: 8, fa: 0.18 })
  ctx.beginPath(); ctx.ellipse(0, 104, 175, 44, 0, 0, TAU); ink(ctx, BONE, { w: 4, fa: 0, glow: 6 })
  const drop = (a, fn) => {
    const p = prog(u, a, a + 0.32); if (p <= 0) return
    const yy = -420 * (1 - ease.inQuad(p)), sq = p >= 1 ? wob(u, a + 0.32, 0.22, 20, 7) : 0
    ctx.save(); ctx.translate(0, yy); ctx.scale(1 + sq, 1 - sq); fn(); ctx.restore()
  }
  // mug + steam
  drop(3.5 * B, () => {
    ctx.save(); ctx.translate(0, -40)
    rr(ctx, -60, -70, 120, 130, 22); ink(ctx, col, { w: 8, fa: 0.35 })
    ctx.beginPath(); ctx.arc(70, -5, 30, -Math.PI / 2, Math.PI / 2); ink(ctx, col, { w: 8, fa: 0 })
    ctx.beginPath(); ctx.moveTo(-12, -14); ctx.bezierCurveTo(-30, -36, -2, -48, 0, -30); ctx.bezierCurveTo(2, -48, 30, -36, 12, -14); ctx.lineTo(0, 0); ctx.closePath()
    ink(ctx, '#ff8fb1', { w: 4, fa: 0.6, glow: 8 })
    const st = prog(u, 4 * B, 4.5 * B)
    for (let k = 0; k < 3; k++) {
      const ph = (u * 0.9 + k / 3) % 1
      ctx.save(); ctx.globalAlpha *= st * Math.sin(ph * Math.PI)
      ctx.beginPath(); const bx = -36 + k * 36
      for (let j = 0; j <= 12; j++) { const v = j / 12, yy = -90 - v * 120 - ph * 40; const xx = bx + 14 * Math.sin(v * 6 + u * 5 + k); j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy) }
      ink(ctx, BONE, { w: 6, fa: 0, glow: 10 }); ctx.restore()
    }
    ctx.restore()
  })
  // cheese wedge
  drop(2 * B, () => {
    ctx.save(); ctx.translate(-105, 70)
    ctx.beginPath(); ctx.moveTo(-80, 30); ctx.lineTo(70, 30); ctx.lineTo(70, -40); ctx.lineTo(-80, 10); ctx.closePath(); ink(ctx, '#f2cf4a', { w: 7, fa: 0.4 })
    ;[[20, 0, 11], [-30, 18, 8], [48, -14, 7]].forEach(([a, b, r]) => { ctx.beginPath(); ctx.arc(a, b, r, 0, TAU); ink(ctx, '#f2cf4a', { w: 4, fa: 0.6, glow: 6 }) })
    ctx.restore()
  })
  // grapes
  drop(2.5 * B, () => {
    ctx.save(); ctx.translate(30, 40)
    ;[[0, 0], [30, 4], [-30, 4], [15, 32], [-15, 32], [0, 62], [45, 34]].forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a, b, 19, 0, TAU); ink(ctx, '#b980ff', { w: 5, fa: 0.4, glow: 10 }) })
    ctx.beginPath(); ctx.moveTo(0, -18); ctx.quadraticCurveTo(6, -44, 24, -50); ink(ctx, '#5fdc7a', { w: 6, fa: 0 })
    ctx.restore()
  })
  // cookie
  drop(3 * B, () => {
    ctx.save(); ctx.translate(140, 70); ctx.rotate(u * 0.3)
    ctx.beginPath(); ctx.arc(0, 0, 50, 0, TAU); ink(ctx, '#d9a86c', { w: 7, fa: 0.4 })
    ;[[-18, -14], [16, -20], [4, 12], [-22, 22], [26, 16]].forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a, b, 6, 0, TAU); ctx.fillStyle = '#6b3f1f'; ctx.fill() })
    ctx.restore()
  })
  ctx.restore()
}

// ───────────────────────── ♊ browser windows multiplying; a red tab badge counts up to 40
const WINS = (() => { const r = rng(303), o = []; for (let i = 0; i < 9; i++) o.push({ x: (r() - 0.5) * 420, y: (r() - 0.5) * 300, rot: (r() - 0.5) * 0.3, c: ['#f2cf4a', '#7fd0f0', '#ff8fb1', BONE][i % 4] }); o[0].x = 0; o[0].y = 0; o[0].rot = 0; return o })()
export function tabs(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  const t0 = 2 * B
  WINS.forEach((w, i) => {
    const a = t0 + i * 0.25 * B * 2, p = pop(u, a, 0.32, 2.4)
    if (p <= 0.01) return
    ctx.save(); ctx.translate(w.x, w.y + 6 * Math.sin(u * 3 + i)); ctx.rotate(w.rot); ctx.scale(p, p)
    rr(ctx, -150, -100, 300, 200, 18); ink(ctx, w.c, { w: 7, fa: 0.0 }); ctx.fillStyle = hexA(tint(w.c, VOID, 0.75), 0.92); ctx.fill()
    rr(ctx, -150, -100, 300, 200, 18); ink(ctx, w.c, { w: 7, fa: 0.12 })
    ctx.beginPath(); ctx.moveTo(-150, -58); ctx.lineTo(150, -58); ink(ctx, w.c, { w: 5, fa: 0, glow: 6 })
    ;[-124, -98, -72].forEach(dx => { ctx.beginPath(); ctx.arc(dx, -79, 8, 0, TAU); ctx.fillStyle = w.c; ctx.fill() })
    ;[[-115, -20, 180], [-115, 15, 230], [-115, 50, 140]].forEach(([a, b, L]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(a + L, b); ink(ctx, hexA(w.c, 0.7).slice(0, 7), { w: 9, fa: 0, glow: 0 }) })
    ctx.restore()
  })
  // the badge
  const bp = pop(u, t0, 0.4, 2.6)
  if (bp > 0.01) {
    const n = Math.round(lerp(1, 40, ease.inOutQuad(prog(u, t0, 6 * B))))
    const bump = 1 + 0.25 * pulse(u - t0, 9) * (n < 40 ? 1 : 0) + wob(u, 6 * B, 0.3, 18, 6)
    ctx.save(); ctx.translate(205, -170); ctx.scale(bp * bump, bp * bump)
    ctx.beginPath(); ctx.arc(0, 0, 62, 0, TAU); ink(ctx, '#ff5a6e', { w: 6, fa: 1, fill: '#e23d4e', glow: 24 })
    label(ctx, String(n), 0, 3, n > 9 ? 58 : 64, '#fff3e0')
    ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── ♋ a little house: lights flick on, smoke puffs, a heart pops over the roof
export function house(ctx, x, y, s, u, col) {
  const land = 2 * B + 0.3, sq = wob(u, land, 0.12, 18, 6)
  begin(ctx, x, y + 150, s)
  ctx.scale(1 + sq, 1 - sq); ctx.translate(0, -150)
  // smoke
  for (let k = 0; k < 4; k++) {
    const ph = (u * 0.7 + k / 4) % 1, a = prog(u, 3 * B, 3.6 * B) * Math.sin(ph * Math.PI)
    if (a <= 0.01) continue
    ctx.save(); ctx.globalAlpha *= a * 0.9
    ctx.beginPath(); ctx.arc(110 + 30 * ph + 10 * Math.sin(u * 3 + k), -175 - ph * 150, 16 + 22 * ph, 0, TAU); ink(ctx, BONE, { w: 5, fa: 0.15, glow: 10 }); ctx.restore()
  }
  // chimney, roof, body
  ctx.beginPath(); ctx.rect(85, -160, 50, 80); ink(ctx, col, { w: 7, fa: 0.3 })
  ctx.beginPath(); ctx.moveTo(-200, -20); ctx.lineTo(0, -195); ctx.lineTo(200, -20); ctx.closePath(); ink(ctx, tint(col, '#ffffff', 0.25), { w: 8, fa: 0.35, fill: col })
  ctx.beginPath(); ctx.rect(-160, -20, 320, 190); ink(ctx, col, { w: 8, fa: 0.22 })
  // door
  ctx.beginPath(); ctx.moveTo(-40, 170); ctx.lineTo(-40, 60); ctx.arc(0, 60, 40, Math.PI, 0); ctx.lineTo(40, 170); ink(ctx, col, { w: 7, fa: 0.35 })
  ctx.beginPath(); ctx.arc(22, 115, 6, 0, TAU); ctx.fillStyle = GOLD; ctx.fill()
  // windows, lights on at beat 3 (a quick flicker)
  const lit = u > 3 * B + 0.12 || (u > 3 * B && u < 3 * B + 0.05) ? 1 : 0
  ;[-105, 105].forEach(wx => {
    rr(ctx, wx - 38, 20, 76, 70, 8)
    if (lit) { ctx.save(); ctx.shadowColor = GOLD; ctx.shadowBlur = 40; ctx.fillStyle = hexA('#ffd98a', 0.85); ctx.fill(); ctx.restore() }
    ink(ctx, col, { w: 6, fa: lit ? 0 : 0.2 })
    ctx.beginPath(); ctx.moveTo(wx, 20); ctx.lineTo(wx, 90); ctx.moveTo(wx - 38, 55); ctx.lineTo(wx + 38, 55); ink(ctx, col, { w: 4, fa: 0, glow: 4 })
  })
  ctx.beginPath(); ctx.moveTo(-250, 170); ctx.lineTo(250, 170); ink(ctx, col, { w: 8, fa: 0 })
  // heart
  const hp = pop(u, 4 * B, 0.45, 2.6)
  if (hp > 0.01) {
    ctx.save(); ctx.translate(-10, -270 + 8 * Math.sin(u * 4)); const hs = hp * (1 + 0.08 * pulse(u, 8)); ctx.scale(hs, hs)
    ctx.beginPath(); ctx.moveTo(0, 40); ctx.bezierCurveTo(-70, -5, -45, -65, 0, -32); ctx.bezierCurveTo(45, -65, 70, -5, 0, 40); ink(ctx, '#ff8fb1', { w: 7, fa: 0.55 })
    ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── ♌ a stage: curtains, a spotlight swings in, a pictogram gets a crown
export function stage(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  const sw = ease.outBack(prog(u, 2.3 * B, 3 * B)), ang = lerp(-0.75, 0, sw) + wob(u, 3 * B, 0.05, 10, 4)
  // spotlight cone (from top-left lamp)
  const lamp = { x: -230, y: -260 }, tx = lamp.x + Math.sin(-ang + 0.62) * 480, ty = lamp.y + Math.cos(-ang + 0.62) * 480
  const ca = prog(u, 2 * B, 2.4 * B)
  if (ca > 0) {
    ctx.save(); ctx.globalAlpha *= ca
    const g = ctx.createLinearGradient(lamp.x, lamp.y, tx, ty); g.addColorStop(0, hexA('#fff3c4', 0.75)); g.addColorStop(1, hexA('#ffd98a', 0.18))
    ctx.globalCompositeOperation = 'lighter'
    ctx.beginPath(); ctx.moveTo(lamp.x + 18, lamp.y); ctx.lineTo(tx - 120, ty + 10); ctx.lineTo(tx + 120, ty - 10); ctx.closePath(); ctx.fillStyle = g; ctx.fill()
    ctx.beginPath(); ctx.ellipse(tx, ty, 130, 34, 0, 0, TAU); ctx.fillStyle = hexA('#ffe7a8', 0.45); ctx.fill()
    ctx.globalCompositeOperation = 'source-over'; ctx.restore()
  }
  // the stage floor
  ctx.beginPath(); ctx.moveTo(-260, 220); ctx.lineTo(260, 220); ctx.lineTo(220, 170); ctx.lineTo(-220, 170); ctx.closePath(); ink(ctx, col, { w: 7, fa: 0.3 })
  // curtains
  ;[-1, 1].forEach(d => {
    ctx.beginPath(); ctx.moveTo(d * 270, -300); ctx.lineTo(d * 150, -300)
    ctx.bezierCurveTo(d * 170, -150, d * 210, 40, d * 215, 170); ctx.lineTo(d * 270, 170); ctx.closePath()
    ink(ctx, '#e23d66', { w: 7, fa: 0.4 })
    ctx.beginPath(); ctx.moveTo(d * 215, -290); ctx.bezierCurveTo(d * 225, -100, d * 240, 60, d * 245, 165); ink(ctx, '#ff7f9a', { w: 4, fa: 0, glow: 6 })
  })
  ctx.beginPath(); ctx.moveTo(-280, -300); ctx.lineTo(280, -300); ink(ctx, '#e23d66', { w: 10, fa: 0 })
  // lamp
  ctx.save(); ctx.translate(lamp.x, lamp.y); ctx.rotate(-ang - 0.95); rr(ctx, -26, -18, 60, 36, 8); ink(ctx, BONE, { w: 6, fa: 0.3 }); ctx.restore()
  // pictogram (in the light once it lands)
  const pp = pop(u, 3 * B, 0.4, 2.2)
  if (pp > 0.01) {
    ctx.save(); ctx.translate(0, 165); ctx.scale(pp, pp)
    ctx.beginPath(); ctx.arc(0, -215, 34, 0, TAU); ink(ctx, BONE, { w: 7, fa: 0.5 })
    ctx.beginPath(); ctx.moveTo(-62, 0); ctx.lineTo(-62, -110); ctx.quadraticCurveTo(-62, -165, 0, -165); ctx.quadraticCurveTo(62, -165, 62, -110); ctx.lineTo(62, 0); ink(ctx, BONE, { w: 7, fa: 0.5 })
    // arms up in a V on beat 5
    const v = ease.outBack(prog(u, 5 * B, 5 * B + 0.25))
    ;[-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(d * 58, -140); ctx.lineTo(d * lerp(80, 120, v), lerp(-60, -250, v)); ink(ctx, BONE, { w: 9, fa: 0 }) })
    // crown
    const cp = pop(u, 4 * B, 0.4, 2.8)
    if (cp > 0.01) {
      ctx.save(); ctx.translate(0, -262 - 120 * (1 - cp)); ctx.rotate(wob(u, 4 * B + 0.3, 0.3, 14, 5))
      ctx.beginPath(); ctx.moveTo(-40, 14); ctx.lineTo(-46, -30); ctx.lineTo(-20, -8); ctx.lineTo(0, -40); ctx.lineTo(20, -8); ctx.lineTo(46, -30); ctx.lineTo(40, 14); ctx.closePath()
      ink(ctx, GOLD, { w: 6, fa: 0.6 }); ctx.restore()
    }
    ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── ♍ a clipboard spreadsheet; checks tick down the first column on beats
export function sheet(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s, 1, -0.05)
  rr(ctx, -200, -230, 400, 470, 26); ink(ctx, col, { w: 8, fa: 0.28 })
  rr(ctx, -70, -255, 140, 60, 14); ink(ctx, BONE, { w: 7, fa: 0.5, fill: col })
  // grid
  const gx = [-160, -80, 40, 160], gy = [-160, -80, 0, 80, 160]
  ctx.beginPath(); gx.forEach(a => { ctx.moveTo(a, gy[0]); ctx.lineTo(a, gy[4]) }); gy.forEach(b => { ctx.moveTo(gx[0], b); ctx.lineTo(gx[3], b) })
  ink(ctx, BONE, { w: 4, fa: 0, glow: 4 })
  // filled cells (data bars)
  for (let r = 0; r < 4; r++) for (let c = 1; c < 3; c++) {
    const L = [70, 40, 95, 55, 80, 30, 60, 90][r * 2 + c - 1]
    ctx.beginPath(); ctx.moveTo(gx[c] + 14, gy[r] + 40); ctx.lineTo(gx[c] + 14 + L, gy[r] + 40); ink(ctx, tint(col, '#ffffff', 0.45), { w: 9, fa: 0, glow: 0 })
  }
  // checks
  for (let r = 0; r < 4; r++) {
    const a = 2.5 * B + r * 0.5 * B, p = ease.outCubic(prog(u, a, a + 0.18))
    if (p <= 0) continue
    const cx = -120, cy = gy[r] + 40, sc = 1 + wob(u, a + 0.18, 0.3, 20, 8)
    ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc)
    ctx.beginPath(); ctx.moveTo(-20, 0); const e1 = Math.min(1, p * 2.2); ctx.lineTo(-20 + 14 * e1, 16 * e1)
    if (p > 0.45) { const e2 = (p - 0.45) / 0.55; ctx.lineTo(-6 + 34 * e2, 16 - 44 * e2) }
    ink(ctx, '#5fdc7a', { w: 9, fa: 0, glow: 14 }); ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── ♎ balance scales with a menu in each pan; the beam can't decide
function menu(ctx, c, title) {
  rr(ctx, -55, -150, 110, 140, 10); ink(ctx, c, { w: 6, fa: 0.3 })
  label(ctx, title, 0, -122, 22, BONE, { weight: 800 })
  ;[-92, -70, -48].forEach((b, i) => { ctx.beginPath(); ctx.moveTo(-34, b); ctx.lineTo(34 - i * 10, b); ink(ctx, BONE, { w: 5, fa: 0, glow: 0 }) })
}
export function scales(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  const tip = u < 2.6 * B ? 0 : Math.sin((u - 2.6 * B) * Math.PI / B) * 0.26 * (1 - 0.3 * prog(u, 5 * B, 8 * B))
  ctx.beginPath(); ctx.moveTo(0, -200); ctx.lineTo(0, 190); ink(ctx, col, { w: 9, fa: 0 })
  ctx.beginPath(); ctx.moveTo(-110, 205); ctx.quadraticCurveTo(0, 150, 110, 205); ctx.closePath(); ink(ctx, col, { w: 8, fa: 0.35 })
  ctx.save(); ctx.translate(0, -180); ctx.rotate(tip)
  ctx.beginPath(); ctx.moveTo(-250, 0); ctx.lineTo(250, 0); ink(ctx, col, { w: 10, fa: 0 })
  ;[-1, 1].forEach(d => {
    ctx.save(); ctx.translate(d * 240, 0); ctx.rotate(-tip)
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-80, 210); ctx.moveTo(0, 0); ctx.lineTo(80, 210); ink(ctx, BONE, { w: 4, fa: 0, glow: 6 })
    ctx.beginPath(); ctx.moveTo(-105, 210); ctx.quadraticCurveTo(0, 290, 105, 210); ctx.closePath(); ink(ctx, col, { w: 7, fa: 0.35 })
    ctx.save(); ctx.translate(0, 216); ctx.rotate(d * 0.08); menu(ctx, d < 0 ? '#f2c75c' : '#7fd0f0', d < 0 ? 'PIZZA' : 'SUSHI'); ctx.restore()
    ctx.restore()
  })
  ctx.restore()
  ctx.beginPath(); ctx.arc(0, -180, 16, 0, TAU); ink(ctx, GOLD, { w: 5, fa: 1 })
  ctx.restore()
}

// ───────────────────────── ♏ a keyhole plate leaking golden light + a "psst" bubble
export function keyhole(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  const glow = 0.55 + 0.45 * prog(u, 2.5 * B, 3.5 * B) + 0.15 * pulse(u, 6)
  // rays out of the keyhole
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= glow * 0.6
  for (let k = 0; k < 10; k++) {
    const a = (k / 10) * TAU + u * 0.4, L = 260 + 40 * Math.sin(u * 4 + k)
    ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(Math.cos(a - 0.07) * L, -20 + Math.sin(a - 0.07) * L); ctx.lineTo(Math.cos(a + 0.07) * L, -20 + Math.sin(a + 0.07) * L); ctx.closePath()
    ctx.fillStyle = hexA('#ffd98a', 0.35); ctx.fill()
  }
  ctx.restore()
  rr(ctx, -130, -220, 260, 420, 130); ink(ctx, col, { w: 9, fa: 0.4 })
  ctx.beginPath(); ctx.arc(0, -50, 46, 0.25 * Math.PI + Math.PI / 2 + 0.6, 0.25 * Math.PI + Math.PI / 2 - 0.6 + TAU - Math.PI * 0.5, false)
  ctx.beginPath(); ctx.arc(0, -50, 46, Math.PI * 0.68, Math.PI * 2.32); ctx.lineTo(34, 90); ctx.lineTo(-34, 90); ctx.closePath()
  ctx.save(); ctx.shadowColor = GOLD; ctx.shadowBlur = 50 * glow; ctx.fillStyle = hexA('#ffe7a8', Math.min(1, 0.6 + 0.4 * glow)); ctx.fill(); ctx.restore()
  ink(ctx, tint(col, '#ffffff', 0.3), { w: 6, fa: 0 })
  ;[[-90, -170], [90, -170], [-90, 150], [90, 150]].forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a, b, 9, 0, TAU); ctx.fillStyle = tint(col, '#ffffff', 0.4); ctx.fill() })
  // the bubble
  const bp = pop(u, 4 * B, 0.42, 2.6)
  if (bp > 0.01) {
    ctx.save(); ctx.translate(215, -250); ctx.rotate(0.08 + wob(u, 4 * B + 0.3, 0.1, 12, 5)); ctx.scale(bp, bp)
    ctx.beginPath(); ctx.ellipse(0, 0, 135, 82, 0, 0, TAU); ctx.moveTo(-80, 60); ctx.lineTo(-120, 120); ctx.lineTo(-40, 74)
    ink(ctx, BONE, { w: 7, fa: 0.85, fill: '#2a1a56' })
    label(ctx, 'psst…', 0, 2, 58, BONE, { weight: 800, italic: true })
    ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── ♐ a backpack + a little plane looping around it, trailing a dashed path
function plane(ctx, c) {
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.quadraticCurveTo(-60, -12, -40, -12); ctx.lineTo(55, -12); ctx.quadraticCurveTo(80, 0, 55, 12); ctx.lineTo(-40, 12); ctx.quadraticCurveTo(-60, 12, -60, 0); ink(ctx, c, { w: 6, fa: 0.5 })
  ctx.beginPath(); ctx.moveTo(10, -10); ctx.lineTo(-20, -62); ctx.lineTo(-2, -62); ctx.lineTo(36, -10); ctx.moveTo(10, 10); ctx.lineTo(-20, 62); ctx.lineTo(-2, 62); ctx.lineTo(36, 10)
  ink(ctx, c, { w: 6, fa: 0.4 })
  ctx.beginPath(); ctx.moveTo(-48, -10); ctx.lineTo(-62, -34); ctx.lineTo(-52, -34); ctx.lineTo(-36, -10); ink(ctx, c, { w: 5, fa: 0.4 })
}
export function backpack(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  const hop = Math.abs(Math.sin(Math.max(0, u - 2 * B) * Math.PI / B)) * 18 * prog(u, 2 * B, 2.5 * B)
  ctx.save(); ctx.translate(0, -hop + 40)
  rr(ctx, -150, -170, 300, 340, 70); ink(ctx, col, { w: 8, fa: 0.35 })
  ctx.beginPath(); ctx.moveTo(-150, -70); ctx.quadraticCurveTo(0, -20, 150, -70); ink(ctx, col, { w: 7, fa: 0 })
  rr(ctx, -95, 30, 190, 110, 30); ink(ctx, tint(col, '#ffffff', 0.3), { w: 6, fa: 0.2 })
  ctx.beginPath(); ctx.arc(0, -205, 34, Math.PI, 0); ink(ctx, col, { w: 8, fa: 0 })
  ctx.beginPath(); ctx.arc(0, -48, 10, 0, TAU); ctx.fillStyle = GOLD; ctx.fill()
  // a passport sticking out of the pocket
  ctx.save(); ctx.translate(40, 30); ctx.rotate(0.2); rr(ctx, -30, -60, 60, 70, 6); ink(ctx, '#3fb6f0', { w: 5, fa: 0.6 }); ctx.restore()
  ctx.restore()
  // plane on an ellipse orbit
  const t0 = 2.5 * B, ap = prog(u, t0, t0 + 0.3)
  if (ap > 0) {
    const th = (q) => -Math.PI * 0.9 + (q - t0) * 2.6, P = q => ({ x: Math.cos(th(q)) * 330, y: Math.sin(th(q)) * 200 - 40 })
    ctx.save(); ctx.setLineDash([20, 18]); ctx.lineDashOffset = -u * 60
    ctx.beginPath()
    for (let k = 0; k <= 24; k++) { const q = Math.max(t0, u - 1.4 + k * (1.4 / 24)), p = P(q); k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y) }
    ctx.globalAlpha *= ap; ink(ctx, BONE, { w: 5, fa: 0, glow: 8 }); ctx.restore()
    const p = P(u), p2 = P(u + 0.02), ang = Math.atan2(p2.y - p.y, p2.x - p.x)
    const front = Math.sin(th(u)) > 0
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(ang); ctx.scale(ap * (front ? 1.15 : 0.9), ap * (front ? 1.15 : 0.9)); plane(ctx, '#fff3e0'); ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── ♑ a mountain; a dashed trail climbs to the peak and a flag plants on beat 4
export function peak(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  ctx.beginPath(); ctx.moveTo(-280, 200); ctx.lineTo(-120, -20); ctx.lineTo(-60, 40); ctx.lineTo(40, -190); ctx.lineTo(280, 200); ctx.closePath(); ink(ctx, col, { w: 8, fa: 0.3 })
  ctx.beginPath(); ctx.moveTo(-10, -75); ctx.lineTo(40, -190); ctx.lineTo(95, -70); ctx.lineTo(60, -95); ctx.lineTo(35, -65); ctx.lineTo(10, -95); ctx.closePath(); ink(ctx, '#ffffff', { w: 5, fa: 0.6, glow: 10 })
  ctx.beginPath(); ctx.moveTo(-320, 200); ctx.lineTo(320, 200); ink(ctx, col, { w: 8, fa: 0 })
  // trail
  const pts = [[-170, 190], [60, 140], [-60, 80], [110, 20], [10, -40], [40, -190]]
  const prg = ease.inOutQuad(prog(u, 2 * B, 4 * B)) * (pts.length - 1)
  ctx.save(); ctx.setLineDash([18, 16]); ctx.beginPath(); ctx.moveTo(...pts[0])
  for (let k = 1; k <= Math.ceil(prg); k++) { const f = Math.min(1, prg - (k - 1)); ctx.lineTo(lerp(pts[k - 1][0], pts[k][0], f), lerp(pts[k - 1][1], pts[k][1], f)) }
  ink(ctx, GOLD, { w: 6, fa: 0, glow: 10 }); ctx.restore()
  // climber dot
  if (prg > 0 && u < 4 * B + 0.05) { const k = Math.min(pts.length - 2, Math.floor(prg)), f = prg - k; ctx.beginPath(); ctx.arc(lerp(pts[k][0], pts[k + 1][0], f), lerp(pts[k][1], pts[k + 1][1], f) - 14, 14, 0, TAU); ink(ctx, BONE, { w: 5, fa: 0.8 }) }
  // flag
  const fp = pop(u, 4 * B, 0.36, 2.4)
  if (fp > 0.01) {
    ctx.save(); ctx.translate(40, -190); ctx.scale(fp, fp); ctx.rotate(wob(u, 4 * B + 0.25, 0.25, 14, 5))
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -190); ink(ctx, BONE, { w: 7, fa: 0 })
    ctx.beginPath(); ctx.moveTo(0, -185)
    for (let k = 0; k <= 10; k++) { const v = k / 10; ctx.lineTo(v * 130, -185 + 10 * Math.sin(v * 5 - u * 8) * v) }
    for (let k = 10; k >= 0; k--) { const v = k / 10; ctx.lineTo(v * 130, -105 + 10 * Math.sin(v * 5 - u * 8) * v) }
    ctx.closePath(); ink(ctx, '#f0603a', { w: 6, fa: 0.6 })
    ctx.restore()
  }
  ctx.restore()
}

// ───────────────────────── ♒ a lightbulb that flickers, then lights up on beat 4
export function bulb(ctx, x, y, s, u, col) {
  const on = 4 * B
  const flick = [[3 * B, 3 * B + 0.06], [3 * B + 0.16, 3 * B + 0.2], [3.6 * B, 3.6 * B + 0.05]]
  const lit = u >= on ? 1 : flick.some(([a, b]) => u >= a && u < b) ? 0.6 : 0
  begin(ctx, x, y, s * (1 + 0.12 * wob(u, on, 1, 16, 6)))
  if (lit) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(0, -60, 20, 0, -60, 380); g.addColorStop(0, hexA('#fff3c4', 0.7 * lit)); g.addColorStop(1, hexA('#ffd98a', 0))
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -60, 380, 0, TAU); ctx.fill(); ctx.restore()
    const rp = ease.outCubic(prog(u, on, on + 0.35)) * lit
    for (let k = 0; k < 10; k++) {
      const a = -Math.PI / 2 + (k - 4.5) * 0.33, r0 = 190 + 12 * pulse(u, 6), r1 = r0 + 70 * rp
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * r0, -60 + Math.sin(a) * r0); ctx.lineTo(Math.cos(a) * r1, -60 + Math.sin(a) * r1); ink(ctx, GOLD, { w: 8, fa: 0 })
    }
  }
  ctx.beginPath(); ctx.arc(0, -60, 150, Math.PI * 0.78, Math.PI * 2.22); ctx.quadraticCurveTo(62, 80, 62, 130); ctx.lineTo(-62, 130); ctx.quadraticCurveTo(-62, 80, -115, 35); ctx.closePath()
  if (lit) { ctx.save(); ctx.shadowColor = '#fff3c4'; ctx.shadowBlur = 60; ctx.fillStyle = hexA('#fff1c8', 0.9 * lit); ctx.fill(); ctx.restore() }
  ink(ctx, lit ? GOLD : col, { w: 9, fa: lit ? 0 : 0.2 })
  ctx.beginPath(); ctx.moveTo(-30, 130); ctx.lineTo(-30, 30); ctx.lineTo(-15, -10); ctx.lineTo(0, 20); ctx.lineTo(15, -10); ctx.lineTo(30, 30); ctx.lineTo(30, 130)
  ink(ctx, lit ? '#ff9a3a' : tint(col, '#ffffff', 0.3), { w: 6, fa: 0, glow: lit ? 20 : 4 })
  rr(ctx, -66, 130, 132, 30, 10); ink(ctx, BONE, { w: 6, fa: 0.3 })
  rr(ctx, -58, 160, 116, 30, 10); ink(ctx, BONE, { w: 6, fa: 0.3 })
  ctx.beginPath(); ctx.moveTo(-30, 190); ctx.quadraticCurveTo(0, 225, 30, 190); ink(ctx, BONE, { w: 6, fa: 0.3 })
  ctx.restore()
}

// ───────────────────────── ♓ two fish circling each other above a rolling wave, bubbles rising
function fish(ctx, c, fillc) {
  ctx.beginPath(); ctx.moveTo(80, 0); ctx.bezierCurveTo(50, -50, -40, -50, -60, 0); ctx.bezierCurveTo(-40, 50, 50, 50, 80, 0); ink(ctx, c, { w: 7, fa: 0.4, fill: fillc })
  ctx.beginPath(); ctx.moveTo(-55, 0); ctx.lineTo(-110, -38); ctx.lineTo(-100, 0); ctx.lineTo(-110, 38); ctx.closePath(); ink(ctx, c, { w: 7, fa: 0.4, fill: fillc })
  ctx.beginPath(); ctx.moveTo(10, -30); ctx.quadraticCurveTo(22, 0, 10, 30); ink(ctx, c, { w: 4, fa: 0, glow: 6 })
}
const BUBS = (() => { const r = rng(1212), o = []; for (let i = 0; i < 9; i++) o.push({ x: (r() - 0.5) * 460, ph: r(), sp: 0.4 + r() * 0.4, r: 8 + r() * 12 }); return o })()
export function fishes(ctx, x, y, s, u, col) {
  begin(ctx, x, y, s)
  // waves
  for (let L = 0; L < 2; L++) {
    ctx.beginPath()
    for (let k = 0; k <= 40; k++) { const v = k / 40, xx = -320 + v * 640, yy = 150 + L * 55 + 18 * Math.sin(v * 9 + u * 3 * (L ? -1 : 1) + L); k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy) }
    ink(ctx, L ? '#3f7cf0' : '#7fd0f0', { w: 8, fa: 0 })
  }
  // bubbles
  BUBS.forEach(b => {
    const ph = (u * b.sp + b.ph) % 1, a = Math.sin(ph * Math.PI) * prog(u, 2.4 * B, 3 * B)
    if (a <= 0.02) return
    ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(b.x + 10 * Math.sin(u * 3 + b.ph * 6), 140 - ph * 380, b.r, 0, TAU); ink(ctx, '#c4f1ff', { w: 4, fa: 0.1, glow: 8 }); ctx.restore()
  })
  // fish circling (yin-yang)
  const th = u * 2.2 + 0.6
  ;[0, 1].forEach(k => {
    const a = th + k * Math.PI, fx = Math.cos(a) * 150, fy = -30 + Math.sin(a) * 95
    ctx.save(); ctx.translate(fx * 1.15, fy * 1.15 - 10); ctx.rotate(a + Math.PI / 2 + 0.1 * Math.sin(u * 9 + k)); ctx.scale(1.35, 1.35); fish(ctx, k ? '#bfe0ff' : '#ffd6f0', k ? '#3f7cf0' : col); ctx.restore()
  })
  ctx.restore()
}
