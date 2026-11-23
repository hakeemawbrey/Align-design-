// w12 (Houston Star Talk, game shows + reality dating shows): props for the two parody formats. Pure functions of t.
// Game show: a studio with sweeping spotlights and chasing bulbs, a show logo, question cards (A–D), podiums with
// buzzers, a prize ladder and a countdown clock. Reality show: a night villa with string lights and a pool, the
// confessional (a lamp, a plant, a lower third), the star ceremony (candles and a tray of gold stars), and Houston
// date locations (paddle boats, the bat bridge at sunset, the bayou trail, a porch, the tunnels, a kitchen).
import { clamp, ease, prog } from '../../src/lib.js'
import { label, sparkles, pop01, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { box, txt, FLOOR } from '../starrace/ep.js'
import { skyline, BRAKE, HGREEN } from './kit.js'

export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
// sound: a t=0 sting that survives --calm (bell + marimba run), a buzzer, a right-answer ding, a wrong-answer honk
export const STING = [['bell', 0.0, 1046.5, 0.05, 1.2, 0], ['marimba', 0.0, 523.25, { gain: 0.07 }], ['marimba', 0.09, 659.25, { gain: 0.07 }], ['marimba', 0.18, 783.99, { gain: 0.07 }]]
export const buzzS = t => ['marimba', t, 220, { gain: 0.09, decay: 0.25 }]
export const dingS = t => ['fmbell', t, 1318.5, { gain: 0.05 }]
export const nopeS = t => ['marimba', t, 155.6, { gain: 0.1, decay: 0.5 }]
export const music = (style, key, seed, D) => ({ style, key, seed, lufs: -26, musicRel: -15, crackle: false, sections: { drop: 0, outroAt: D - 2.4 } })

/** several centred lines (split on ' | ') */
export function lines(x, s, cx, cy, o = {}) {
  const L = s.split(' | '), lh = (o.size || 40) * (o.lh || 1.18)
  L.forEach((l, i) => txt(x, l, cx, cy + (i - (L.length - 1) / 2) * lh, o))
}

// ── GAME SHOW ───────────────────────────────────────────────────────────────────────────────────────────────
/** studio: gradient back wall, sweeping spotlight beams (moving from frame 0), a glossy stage floor */
export function studio(x, t, th = {}) {
  const { bg1 = '#2a0f4a', bg2 = '#0c0620', beam = 'rgba(255,240,190,0.10)', floor = '#1a0f33', stripe = GOLD } = th
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, bg1); g.addColorStop(1, bg2); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 9; k++) { x.fillStyle = k % 2 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.08)'; x.fillRect(k * 120, 0, 120, 1340) }
  for (let k = 0; k < 4; k++) {
    const ox = 140 + k * 270, a = Math.sin(t * 0.9 + k * 1.9) * 0.42, L = 1500
    x.save(); x.translate(ox, -20); x.rotate(a); x.fillStyle = beam; x.beginPath(); x.moveTo(-18, 0); x.lineTo(18, 0); x.lineTo(150, L); x.lineTo(-150, L); x.fill(); x.restore()
  }
  x.fillStyle = floor; x.fillRect(0, 1340, 1080, 580)
  x.fillStyle = stripe; x.fillRect(0, 1340, 1080, 10)
  for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(0, 1380 + k * 46, 1080, 4) }
}
/** a rectangle of bulbs with a chasing pattern */
export function bulbs(x, t, l, tp, w, h, col = GOLD, step = 44) {
  const pts = []
  for (let d = 0; d <= w; d += step) { pts.push([l + d, tp]); pts.push([l + w - d, tp + h]) }
  for (let d = step; d < h; d += step) { pts.push([l, tp + h - d]); pts.push([l + w, tp + d]) }
  pts.forEach(([px, py], i) => { const on = ((i + Math.floor(t * 8)) % 3) === 0; x.fillStyle = INK; x.beginPath(); x.arc(px, py, 11, 0, Math.PI * 2); x.fill(); x.fillStyle = on ? '#fff6c9' : col; x.beginPath(); x.arc(px, py, 7, 0, Math.PI * 2); x.fill() })
}
/** the show logo: a marquee panel with the name and a sub line */
export function logo(x, t, name, sub, { cy = 640, k = 1, col = '#e0306a', s = 1 } = {}) {
  if (k <= 0) return
  x.save(); x.translate(540, cy); x.scale(k * s, k * s); x.rotate(-0.03)
  const W = 860, H = sub ? 250 : 190
  box(x, -W / 2, -H / 2, W, H, col, 10); bulbs(x, t, -W / 2 + 14, -H / 2 + 14, W - 28, H - 28, GOLD, 48)
  const [a, b] = name.split(' | ')
  txt(x, a, 0, b ? -H / 2 + 72 : sub ? -30 : 4, { size: (b ? a : a).length > 16 ? 58 : 72, col: BONE })
  if (b) txt(x, b, 0, -H / 2 + 140, { size: b.length > 16 ? 58 : 72, col: GOLD })
  if (sub) txt(x, sub, 0, H / 2 - 44, { size: 30, col: BONE, font: MONO, weight: 700 })
  x.restore()
}
/** a small logo strip for the top of a question scene */
export function miniLogo(x, t, name, col = '#e0306a') { box(x, 300, 300, 480, 74, col, 6); txt(x, name.replace(' | ', ' '), 540, 338, { size: name.length > 22 ? 28 : 34, col: BONE, font: MONO, weight: 700 }) }
/** question card: question panel + 2×2 (or 2×1, or 3×1) answer tiles; pick = [idx, at], reveal = [idx, at] (the right one) */
export function qcard(x, t, lt, { q, opts = [], at = 0, pick = null, reveal = null, cy = 700, col = '#1c1a5a', tag = null }) {
  const k = Kp(lt, at, 0.35); if (k <= 0) return
  x.save(); x.translate(540, cy); x.scale(k, k); x.translate(-540, -cy)
  box(x, 90, cy - 110, 900, 200, col, 8); x.fillStyle = GOLD; x.fillRect(90, cy - 110, 900, 8)
  if (tag) { box(x, 120, cy - 140, tag.length * 20 + 40, 50, GOLD, 5); txt(x, tag, 140 + tag.length * 10, cy - 114, { size: 28, font: MONO, weight: 700 }) }
  const ql = q.split(' | '); lines(x, q, 540, cy - 6, { size: ql.some(s => s.length > 24) ? 44 : 52, col: BONE })
  const n = opts.length, cols = n === 3 ? 1 : 2, rows = Math.ceil(n / cols), tw = cols === 2 ? 440 : 900, th = 78
  opts.forEach((o, i) => {
    const ok = pop01(t, t - lt + at + 0.3 + i * 0.12, 0.3, 1.8); if (ok <= 0) return
    const c = i % cols, r = Math.floor(i / cols), l = 90 + c * (tw + 20), tp = cy + 120 + r * (th + 16)
    let bg = '#2d2a7a', fg = BONE
    if (pick && lt > pick[1] && i === pick[0]) { bg = Math.floor((lt - pick[1]) * 6) % 2 ? '#ff9a3c' : '#e07a1c'; fg = INK }
    if (reveal && lt > reveal[1]) { if (i === reveal[0]) { bg = '#2fbf6a'; fg = INK } else if (pick && i === pick[0]) { bg = BRAKE; fg = BONE } }
    x.save(); x.globalAlpha = clamp(ok); box(x, l, tp, tw, th, bg, 6)
    txt(x, 'ABCD'[i] + ':', l + 40, tp + th / 2 + 2, { size: 34, col: GOLD, font: MONO, weight: 700 })
    txt(x, o, l + 78, tp + th / 2 + 2, { size: o.length > 18 ? 32 : 38, col: fg, align: 'left' }); x.restore()
  })
  x.restore()
}
/** a contestant podium (draw in front of the star); lit = buzzer glow 0..1 */
export function podium(x, cx, top, { col = '#2b5fb0', name = '', score = null, lit = 0, w = 250 } = {}) {
  if (lit > 0) { x.save(); x.globalAlpha = 0.5 * lit; x.fillStyle = BRAKE; x.beginPath(); x.arc(cx, top - 6, 70, 0, Math.PI * 2); x.fill(); x.restore() }
  x.fillStyle = INK; x.beginPath(); x.arc(cx, top - 4, 30, Math.PI, 0); x.fill(); x.fillStyle = lit > 0 ? '#ff6a7a' : '#a02030'; x.beginPath(); x.arc(cx, top - 4, 23, Math.PI, 0); x.fill()
  box(x, cx - w / 2, top, w, 210, col, 7); x.fillStyle = 'rgba(255,255,255,0.15)'; x.fillRect(cx - w / 2, top, w, 18)
  if (name) txt(x, name, cx, top + 60, { size: name.length > 10 ? 28 : 34, col: BONE, font: MONO, weight: 700 })
  if (score != null) { box(x, cx - 80, top + 100, 160, 70, '#0b0820', 5); txt(x, String(score), cx, top + 137, { size: 46, col: lit > 0 ? '#ff6a7a' : GOLD, font: MONO, weight: 700 }) }
}
/** the host's mic stand */
export function micStand(x, cx, base) { box(x, cx - 5, base - 330, 10, 330, '#8f96a0', 3); box(x, cx - 50, base - 8, 100, 14, '#8f96a0', 3); box(x, cx - 16, base - 368, 32, 46, INK, 3) }
/** a prize ladder; cur = index lit (0 = bottom); top rung shown gold */
export function ladder(x, t, cx, cy, rungs, cur, { k = 1, w = 640 } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const n = rungs.length, h = 84
  rungs.forEach((r, i) => {
    const y = (n - 1 - i - (n - 1) / 2) * (h + 10), top = i === n - 1, on = i === cur
    const bg = on ? (Math.floor(t * 4) % 2 ? '#ff9a3c' : GOLD) : top ? '#3a2a10' : i < cur ? '#1f5a3a' : '#1c1a5a'
    box(x, -w / 2, y - h / 2, w, h, bg, 6)
    txt(x, String(i + 1), -w / 2 + 46, y + 2, { size: 36, col: on ? INK : GOLD, font: MONO, weight: 700 })
    txt(x, r, 20, y + 2, { size: r.length > 22 ? 30 : 36, col: on ? INK : top ? GOLD : BONE })
  })
  x.restore()
}
/** a countdown clock ring (frac = remaining 0..1) */
export function clockRing(x, cx, cy, r, frac, num) {
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#1c1a5a'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.strokeStyle = frac > 0.3 ? MINT : BRAKE; x.lineWidth = 16; x.beginPath(); x.arc(cx, cy, r - 14, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(frac)); x.stroke()
  txt(x, String(num), cx, cy + 4, { size: r * 0.9, col: BONE, font: MONO, weight: 700 })
}
/** a big X (wrong) or check (right) stamp */
export function stamp(x, cx, cy, ok, k) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.08)
  x.strokeStyle = INK; x.lineWidth = 46; x.lineCap = 'round'
  const draw = () => { x.beginPath(); if (ok) { x.moveTo(-90, 0); x.lineTo(-20, 70); x.lineTo(110, -80) } else { x.moveTo(-90, -90); x.lineTo(90, 90); x.moveTo(90, -90); x.lineTo(-90, 90) } x.stroke() }
  draw(); x.strokeStyle = ok ? '#2fbf6a' : BRAKE; x.lineWidth = 28; draw(); x.restore()
}
/** confetti burst (pure function of time since t0) */
export function confetti(x, t, t0, n = 40, cols = [GOLD, PINK, MINT, SKYB, LAV]) {
  const d = t - t0; if (d < 0 || d > 4) return
  for (let k = 0; k < n; k++) { const sx = (k * 137.5) % 1080, vy = 260 + (k * 53) % 240, y = -40 + d * vy, sw = Math.sin(d * 5 + k) * 30; x.save(); x.translate(sx + sw, y); x.rotate(d * 4 + k); x.fillStyle = cols[k % cols.length]; x.fillRect(-9, -5, 18, 10); x.restore() }
}

// ── REALITY SHOW ────────────────────────────────────────────────────────────────────────────────────────────
/** the villa at night: gradient sky, a Houston skyline far off, swaying string lights, a pool with ripples */
export function villa(x, t, th = {}) {
  const { sky1 = '#1a0f3a', sky2 = '#4a1f5a', pool = '#1f8fb0', deck = '#c9a77a', lights = [GOLD, PINK, SKYB] } = th
  const g = x.createLinearGradient(0, 0, 0, 1400); g.addColorStop(0, sky1); g.addColorStop(1, sky2); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  skyline(x, 1180, t, { alpha: 0.55, col: '#24164a' })
  for (let k = 0; k < 2; k++) { const tp = 470 + k * 130; x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); for (let px = 0; px <= 1080; px += 20) { const py = tp + Math.sin(px / 1080 * Math.PI) * 70 + Math.sin(t * 1.4 + px * 0.01 + k) * 6; px ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
    for (let b = 0; b < 14; b++) { const px = 40 + b * 76, py = tp + Math.sin(px / 1080 * Math.PI) * 70 + Math.sin(t * 1.4 + px * 0.01 + k) * 6 + 16, on = 0.6 + 0.4 * Math.sin(t * 3 + b * 1.3 + k); x.save(); x.globalAlpha = on; x.fillStyle = lights[(b + k) % lights.length]; x.shadowColor = lights[(b + k) % lights.length]; x.shadowBlur = 20; x.beginPath(); x.arc(px, py, 10, 0, Math.PI * 2); x.fill(); x.restore() } }
  x.fillStyle = deck; x.fillRect(0, 1180, 1080, 260); for (let k = 0; k < 14; k++) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(k * 80, 1180, 4, 260) }
  x.fillStyle = INK; x.fillRect(0, 1174, 1080, 8)
  x.fillStyle = pool; x.fillRect(0, 1440, 1080, 480); x.fillStyle = INK; x.fillRect(0, 1434, 1080, 10)
  for (let k = 0; k < 10; k++) { const y = 1480 + k * 44, o = Math.sin(t * 2 + k) * 40; x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(80 + o + (k * 173) % 700, y, 120, 6) }
}
/** the confessional: a dark wall in the cast colour, a warm lamp, a plant, an armchair, and a lower third */
export function confessional(x, t, lt, { wall = '#3a1f4a', name = '', sub = '', glow = '#ffcf7a' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920)
  const g = x.createRadialGradient(820, 760, 20, 820, 760, 620); g.addColorStop(0, 'rgba(255,207,122,0.35)'); g.addColorStop(1, 'rgba(255,207,122,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(0,0,0,0.10)'; x.fillRect(k * 200, 0, 90, 1400) }
  box(x, 790, 640, 70, 520, '#5a4030', 5); x.fillStyle = INK; x.beginPath(); x.moveTo(720, 650); x.lineTo(930, 650); x.lineTo(880, 540); x.lineTo(770, 540); x.fill(); x.fillStyle = glow; x.beginPath(); x.moveTo(732, 642); x.lineTo(918, 642); x.lineTo(872, 548); x.lineTo(778, 548); x.fill()
  box(x, 120, 1000, 130, 150, '#c9783a', 6); for (let k = 0; k < 5; k++) { x.fillStyle = k % 2 ? '#5aa05a' : '#3f8a4a'; x.beginPath(); x.ellipse(185 + (k - 2) * 34, 900 - Math.abs(k - 2) * 30, 30, 110, (k - 2) * 0.3, 0, Math.PI * 2); x.fill() }
  box(x, 300, 1240, 480, 200, '#7a2a4a', 8); box(x, 260, 1180, 80, 260, '#7a2a4a', 8); box(x, 740, 1180, 80, 260, '#7a2a4a', 8)
  x.fillStyle = '#2a1830'; x.fillRect(0, 1440, 1080, 480)
  const k = clamp((lt - 0.15) / 0.3); if (k > 0 && name) {
    x.save(); x.globalAlpha = k; box(x, 60, 1480, 760 * ease.outCubic(k), 130, 'rgba(14,9,32,0.92)', 0); x.fillStyle = PINK; x.fillRect(60, 1480, 12, 130)
    txt(x, 'CONFESSIONAL', 96, 1512, { size: 26, col: PINK, font: MONO, weight: 700, align: 'left' })
    txt(x, name, 96, 1562, { size: 46, col: BONE, align: 'left' }); if (sub) txt(x, sub, 96 + name.length * 27 + 30, 1564, { size: 32, col: GOLD, font: SERIF, weight: 500, italic: true, align: 'left' })
    x.restore()
  }
  if (Math.floor(t * 1.5) % 2) { x.fillStyle = BRAKE; x.beginPath(); x.arc(960, 300, 14, 0, Math.PI * 2); x.fill() }   // REC light
  txt(x, 'REC', 900, 302, { size: 28, col: BONE, font: MONO, weight: 700 })
}
/** the star ceremony: candles along the floor and a pedestal tray with n gold stars left */
export function ceremony(x, t, { n = 3, wall = '#1a0f2e', tray = true } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920)
  const g = x.createRadialGradient(540, 1000, 40, 540, 1000, 800); g.addColorStop(0, 'rgba(255,190,110,0.28)'); g.addColorStop(1, 'rgba(255,190,110,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 5; k++) { box(x, 60 + k * 230, 380, 120, 900, 'rgba(60,30,60,0.6)', 0) }
  x.fillStyle = '#2a1a2a'; x.fillRect(0, 1380, 1080, 540)
  for (let k = 0; k < 11; k++) { const cx = 50 + k * 98, h = 60 + (k * 37) % 70, base = 1420 + (k % 2) * 30; box(x, cx - 14, base - h, 28, h, BONE, 4); const f = 1 + 0.2 * Math.sin(t * 9 + k * 2); x.fillStyle = '#ffb347'; x.beginPath(); x.ellipse(cx, base - h - 18, 9 * f, 18 * f, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff3c4'; x.beginPath(); x.ellipse(cx, base - h - 14, 4, 9, 0, 0, Math.PI * 2); x.fill() }
  if (tray) { box(x, 470, 1180, 140, 200, '#6b3b1f', 6); box(x, 420, 1150, 240, 36, GOLD, 6); for (let k = 0; k < n; k++) goldStar(x, 470 + k * 70 - (n - 3) * 35, 1120, 28, t) }
}
export function goldStar(x, cx, cy, s, t = 0) {
  x.fillStyle = GOLD; x.beginPath()
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? s * 0.45 : s; x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) }
  x.closePath(); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; x.stroke()
  const sh = 0.5 + 0.5 * Math.sin(t * 4 + cx); x.fillStyle = `rgba(255,255,255,${(0.6 * sh).toFixed(2)})`; x.fillRect(cx - s * 0.2, cy - s * 0.4, s * 0.16, s * 0.16)
}
/** the reality show title card: a script-ish title with hearts, and a season/episode tag */
export function showTitle(x, t, name, tag, { cy = 640, k = 1, col = PINK } = {}) {
  if (k <= 0) return
  x.save(); x.translate(540, cy); x.scale(k, k); x.rotate(-0.04)
  const [a, b] = name.split(' | ')
  x.shadowColor = col; x.shadowBlur = 30
  txt(x, a, 0, b ? -50 : 0, { size: 84, col: BONE, font: SERIF, weight: 500, italic: true }); if (b) txt(x, b, 0, 46, { size: 92, col, font: SERIF, weight: 500, italic: true })
  x.shadowBlur = 0
  if (tag) { box(x, -130, b ? 108 : 66, 260, 48, col, 5); txt(x, tag, 0, (b ? 108 : 66) + 25, { size: 26, col: INK, font: MONO, weight: 700 }) }
  x.restore()
}
/** a strip of 'previously on' film (sepia flashback frame) */
export function flashback(x, t, k = 1) { if (k <= 0) return; x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#c9a06a'; x.fillRect(0, 0, 1080, 1920); x.restore(); for (let k2 = 0; k2 < 6; k2++) { x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(((k2 * 211 + Math.floor(t * 12) * 97) % 1080), 0, 3, 1920) } }

// ── Houston date locations ──────────────────────────────────────────────────────────────────────────────────
/** a park pond with paddle boats (the reflecting-pond kind); boats drift with t */
export function pond(x, t, { sky1 = '#7fb8e8', sky2 = '#ffd9a8', boats = 2, spin = 0 } = {}) {
  const g = x.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, sky1); g.addColorStop(1, sky2); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 7; k++) { const cx = 60 + k * 170; x.fillStyle = '#2f6a3a'; x.beginPath(); x.arc(cx, 1040, 120, Math.PI, 0); x.fill(); box(x, cx - 12, 1040, 24, 80, '#5a4030', 3) }
  x.fillStyle = '#4a8a3a'; x.fillRect(0, 1100, 1080, 120)
  x.fillStyle = '#3a8ab0'; x.fillRect(0, 1200, 1080, 720); x.fillStyle = INK; x.fillRect(0, 1196, 1080, 8)
  for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect((k * 191 + t * 30) % 1180 - 100, 1260 + k * 52, 90, 6) }
}
export function paddleBoat(x, cx, cy, col = '#ff6a5a', s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -150, -20, 300, 70, col, 7); box(x, -110, -60, 220, 44, BONE, 5)
  x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(0, 50, 170, 16, 0, 0, Math.PI * 2); x.fill(); x.restore()
}
/** the bat bridge at sunset: an orange sky, a low concrete bridge over the bayou, bats streaming out */
export function batBridge(x, t, lt, { bats = 1 } = {}) {
  const g = x.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, '#3a2a6a'); g.addColorStop(0.55, '#ff7a5a'); g.addColorStop(1, '#ffd36b'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  skyline(x, 1060, t, { alpha: 0.7, col: '#3a1f4a' })
  x.fillStyle = '#2a5a6a'; x.fillRect(0, 1260, 1080, 660)
  box(x, -20, 1080, 1120, 70, '#9a9aa8', 6); for (let k = 0; k < 4; k++) box(x, 120 + k * 260, 1150, 50, 130, '#8a8a98', 5)
  x.fillStyle = '#3f7a3a'; x.fillRect(0, 1220, 1080, 50)
  if (bats > 0) for (let k = 0; k < 60 * bats; k++) { const ph = (lt * 0.35 + k * 0.037) % 1, bx = 200 + (k * 97) % 700 + ph * 300 * Math.sin(k), by = 1150 - ph * 1000 - (k % 7) * 20, w = 14 + 6 * Math.sin(t * 18 + k); x.fillStyle = INK; x.beginPath(); x.moveTo(bx - w, by - 4); x.lineTo(bx, by + 4); x.lineTo(bx + w, by - 4); x.lineTo(bx, by - 1); x.fill() }
}
/** the bayou trail: green banks, a path, the skyline, water */
export function bayouTrail(x, t, { scroll = 0, sky1 = '#ffb48a', sky2 = '#ffe2b0' } = {}) {
  const g = x.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, sky1); g.addColorStop(1, sky2); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  skyline(x, 1000, t, { alpha: 0.8, col: '#4a3a6a' })
  x.fillStyle = '#4a8a3a'; x.fillRect(0, 1000, 1080, 160)
  x.fillStyle = '#d9c7a8'; x.fillRect(0, 1160, 1080, 220); x.fillStyle = INK; x.fillRect(0, 1156, 1080, 6); x.fillRect(0, 1378, 1080, 6)
  for (let d = -((scroll % 160) + 160); d < 1080; d += 160) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(d, 1265, 80, 8) }
  x.fillStyle = '#3f7a4a'; x.fillRect(0, 1384, 1080, 120); x.fillStyle = '#5a7a5a'; x.fillRect(0, 1504, 1080, 416)
  for (let k = 0; k < 8; k++) { x.fillStyle = 'rgba(255,255,255,0.15)'; x.fillRect((k * 173 + t * 40) % 1180 - 100, 1560 + k * 40, 110, 5) }
}
/** a Heights-style bungalow porch: siding, a porch swing, string light, a dog bowl */
export function porch(x, t, { wall = '#7fb0c8', trim = BONE } = {}) {
  x.fillStyle = '#2a2350'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = wall; x.fillRect(0, 300, 1080, 1080); for (let k = 0; k < 24; k++) { x.fillStyle = 'rgba(0,0,0,0.10)'; x.fillRect(0, 300 + k * 45, 1080, 4) }
  box(x, 640, 560, 260, 600, '#8a4a3a', 7); x.fillStyle = GOLD; x.beginPath(); x.arc(860, 870, 12, 0, Math.PI * 2); x.fill()
  box(x, 120, 600, 340, 280, '#ffe7a8', 7); x.fillStyle = INK; x.fillRect(286, 600, 8, 280); x.fillRect(120, 736, 340, 8)
  box(x, 40, 300, 30, 1080, trim, 5); box(x, 1010, 300, 30, 1080, trim, 5); box(x, 0, 270, 1080, 40, trim, 5)
  x.fillStyle = '#9a6a4a'; x.fillRect(0, 1380, 1080, 540); for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(0,0,0,0.14)'; x.fillRect(0, 1400 + k * 52, 1080, 5) }
}
/** the downtown tunnel: tiled corridor, a gate that can be shut, a CLOSED WEEKENDS sign */
export function tunnel(x, t, { gate = 0 } = {}) {
  x.fillStyle = '#d9d2c0'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#bfb6a0'; x.beginPath(); x.moveTo(0, 300); x.lineTo(380, 760); x.lineTo(700, 760); x.lineTo(1080, 300); x.lineTo(1080, 1500); x.lineTo(700, 1060); x.lineTo(380, 1060); x.lineTo(0, 1500); x.fill()
  box(x, 380, 760, 320, 300, '#f4efe4', 5)
  for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(255,255,230,0.7)'; x.fillRect(470, 300 + k * 90 - k * 10, 140, 18) }
  x.fillStyle = '#a89a80'; x.fillRect(0, 1500, 1080, 420)
  if (gate > 0) { const g = clamp(gate), h = 300 * g; for (let k = 0; k < 9; k++) box(x, 390 + k * 36, 760, 10, h, '#6d7480', 2); box(x, 380, 760 + h - 14, 320, 16, '#6d7480', 3) }
}
/** a kitchen counter with a griddle (taco station) */
export function kitchen(x, t, { wall = '#ffd9a8', tile = '#fff3e0' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920)
  for (let r = 0; r < 8; r++) for (let c = 0; c < 10; c++) { x.fillStyle = (r + c) % 2 ? tile : '#ffe7c4'; x.fillRect(c * 108, 640 + r * 70, 106, 68) }
  box(x, 0, 1200, 1080, 60, '#6b3b1f', 6); x.fillStyle = '#8a5530'; x.fillRect(0, 1266, 1080, 654)
  box(x, 300, 1150, 480, 50, '#3a3450', 5)
  for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k / 4) % 1; x.strokeStyle = `rgba(255,255,255,${(0.5 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(400 + k * 80, 1130 - ph * 120); x.quadraticCurveTo(420 + k * 80, 1100 - ph * 120, 400 + k * 80, 1070 - ph * 120); x.stroke() }
}
/** an air-conditioning thermostat on a wall */
export function thermostat(x, cx, cy, deg, k = 1) { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -90, -110, 180, 220, BONE, 7); box(x, -66, -80, 132, 90, '#0e1630', 4); txt(x, deg, 0, -34, { size: 52, col: MINT, font: MONO, weight: 700 }); x.fillStyle = INK; x.beginPath(); x.arc(-34, 62, 18, 0, Math.PI * 2); x.arc(34, 62, 18, 0, Math.PI * 2); x.fill(); x.restore() }
/** a sweater on a star at P.at(id) */
export function sweater(x, P, id, col = '#c0304a') { const [cx, cy, s] = P.at(id); for (let k = 0; k < 3; k++) box(x, cx - s * 0.32, cy + s * 0.05 + k * s * 0.1, s * 0.64, s * 0.09, k % 2 ? BONE : col, 3) }
/** reading glasses on a star (the aunties) */
export function glasses(x, P, id) { const [cx, cy, s] = P.at(id); x.strokeStyle = INK; x.lineWidth = 6; for (const d of [-1, 1]) { x.beginPath(); x.arc(cx + d * s * 0.13, cy - s * 0.02, s * 0.1, 0, Math.PI * 2); x.stroke() } x.beginPath(); x.moveTo(cx - s * 0.03, cy - s * 0.02); x.lineTo(cx + s * 0.03, cy - s * 0.02); x.stroke() }
/** a clipboard held by a star */
export function clipboard(x, P, id, dx = 0.42) { const [cx, cy, s] = P.at(id); box(x, cx + s * dx - 40, cy - 10, 80, 104, '#c98e5a', 5); x.fillStyle = BONE; x.fillRect(cx + s * dx - 30, cy + 4, 60, 80); x.fillStyle = INK; for (let k = 0; k < 4; k++) x.fillRect(cx + s * dx - 22, cy + 16 + k * 16, 44, 5) }
/** a gold star held up next to a star (the ceremony hand-off) */
export function heldStar(x, P, id, t, k = 1, dx = 0.5) { if (k <= 0) return; const [cx, cy, s] = P.at(id); x.save(); x.translate(cx + s * dx, cy - s * 0.1); x.scale(k, k); goldStar(x, 0, 0, 40, t); x.restore() }
export { label, sparkles, pop01, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV, box, txt, FLOOR, BRAKE, HGREEN }
