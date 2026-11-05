// mercurykit — the PLANET TALK · MERCURY look (batch p03, promo/films/planets/p03.md). Imported read-only by kpmee01–12.
// Built on promo/films/planetkit.js (Mercury + the signs), promo/films/hookkit.js (hooks, freeze, loop) and startalk.js.
//
//   import { film, track, merc, sign, room, phone, burst, … } from '../../kpmee01/mercurykit.js'
//   const F = film({ id, duration, draw, speech, fx, hook, last, ending: 'cut' | 'loop', music })
//   export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
//
// film(spec)
//   draw(x, t, H)   your picture for time t (already frozen during any record scratch). H = { speech } helpers.
//   speech          [planetkit speech() opts] drawn on top of draw (auto voice cues; Mercury's mouth flaps on its own).
//   fx              [[kind, opts]] hookkit effects: whip, rec, glitch, shake, load, notif, chapter, caught, slam, ach.
//   hook            { text, top, size, out } → slamTitle at −1 (on screen at frame 0)
//   last            { text, at, top, size } → slamTitle for the punchline (hard cut: lands ≥ 0.6 s before the end)
//   ending          'cut' (default) | 'loop' (loopBack over the last 0.4 s, frame 0 copied)
//   bug             series bug text (default 'planet talk · mercury'), top-left
// track(t, keys)   keys = [[time, { x, y, size, mood, … }, ease?], …] → the pose at t (numbers eased, the rest stepped)
// merc(x, t, pose, opts)   Mercury with speed ghosts + streaks when pose.v (speed) is high; opts → drawPlanet opts
// room(x, t, R)    an interior at night: wall, window with stars, floor; R = { wall, floor, win: { x, y, w, h }, lamp }
// phone(x, t, P)   a big chat phone: header, bubbles, compose bar with typing, typing dots, receipt, red-pen strike
// burst(t0, lines, { x, y, gap, step, t1, size, who }) → speech opts: Mercury texting in bursts (stacked bubbles)
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { drawPlanet, drawSign, drawSpace, speech as kitSpeech, speechCues, entrance, drawEntranceFx, entranceCues, talkOpen, PLANETS, colorOf } from '../planetkit.js'
import {
  whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, screenShake, shakeCues,
  glitch, glitchCues, loadingBar, loadingBarCues, notification, notificationCues, chapter, chapterCues, caught, caughtCues,
  achievement, achievementCues, loopBack, loopCues,
} from '../hookkit.js'

export { drawPlanet, drawSign, drawSpace, entrance, drawEntranceFx, entranceCues, PLANETS, colorOf, clamp, lerp, prog, ease, easeOutBack }
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff4d5e', PINK = '#ff8fb1', MERC = '#b8aba3'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }
export const pop01 = (t, t0, d = 0.3, s = 2) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))

// ─────────────────────────────────────────── tracks (pure keyframes)
const EASES = { io: ease.inOutCubic, out: ease.outCubic, in: ease.inCubic, back: x => easeOutBack(x, 1.7), lin: x => x, step: x => (x < 1 ? 0 : 1), snap: ease.outQuart }
const TRACKS = new WeakMap()
export function track(t, keys) {
  let cum = TRACKS.get(keys)
  if (!cum) { let acc = {}; cum = keys.map(k => (acc = { ...acc, ...k[1] })); TRACKS.set(keys, cum) }
  if (t <= keys[0][0]) return { ...cum[0], v: 0 }
  const n = keys.length - 1
  if (t >= keys[n][0]) return { ...cum[n], v: 0 }
  let i = 0; while (i < n && keys[i + 1][0] <= t) i++
  const a = cum[i], b = cum[i + 1], t0 = keys[i][0], t1 = keys[i + 1][0]
  const e = EASES[keys[i + 1][2] || 'io'] || EASES.io
  const p = e(clamp((t - t0) / (t1 - t0)))
  const o = {}
  for (const k in b) o[k] = typeof b[k] === 'number' && typeof a[k] === 'number' ? lerp(a[k], b[k], p) : (p < 0.5 && k in a ? a[k] : b[k])
  const dx = (b.x ?? 0) - (a.x ?? 0), dy = (b.y ?? 0) - (a.y ?? 0)
  o.v = Math.hypot(dx, dy) / Math.max(0.05, t1 - t0)
  o.dir = Math.atan2(dy, dx)
  return o
}

// ─────────────────────────────────────────── Mercury (with speed)
/** pose = { x, y, size, mood, rot, squash, v, dir } (from track or entrance). Extra opts go to drawPlanet. */
export function merc(x, t, pose, opts = {}) {
  const { trail = true } = opts
  const sz = pose.size ?? 320
  if (trail && pose.v > 900) {
    const k = clamp((pose.v - 900) / 2400)
    const ux = Math.cos(pose.dir ?? 0), uy = Math.sin(pose.dir ?? 0)
    x.save()
    for (let g = 3; g >= 1; g--) {
      x.globalAlpha = 0.18 * k * (4 - g)
      x.fillStyle = MERC; x.beginPath(); x.arc(pose.x - ux * g * sz * 0.32, pose.y - uy * g * sz * 0.32, sz * 0.48, 0, TAU); x.fill()
    }
    x.strokeStyle = 'rgba(255,251,234,0.85)'; x.lineCap = 'round'
    for (let i = 0; i < 9; i++) {
      const off = (fr(i, 3) - 0.5) * sz * 1.1, L = sz * (0.8 + fr(i, 4) * 1.4), ph = (t * 4 + fr(i, 5)) % 1
      x.globalAlpha = k * 0.7 * Math.sin(ph * Math.PI); x.lineWidth = 5 + fr(i, 6) * 6
      const sx = pose.x - ux * sz * (0.6 + ph * 0.8) - uy * off, sy = pose.y - uy * sz * (0.6 + ph * 0.8) + ux * off
      x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx - ux * L, sy - uy * L); x.stroke()
    }
    x.restore()
  }
  const { trail: _t, ...rest } = opts
  return drawPlanet(x, 'mercury', pose.x, pose.y, sz, t, { mood: pose.mood || 'neutral', rot: pose.rot || 0, squash: pose.squash || 0, alpha: pose.alpha ?? 1, look: pose.look, sweat: pose.sweat, tears: pose.tears, ...rest })
}

/** a sign from a pose (track) */
export function sign(x, id, t, pose, opts = {}) {
  return drawSign(x, id, pose.x, pose.y, pose.size ?? 300, t, { mood: pose.mood || 'neutral', look: pose.look, tears: pose.tears ?? 0, alpha: pose.alpha ?? 1, sweat: pose.sweat, squash: pose.squash ?? 0, pop: pose.pop ?? 1, shadow: pose.shadow ?? true, ...opts })
}

// ─────────────────────────────────────────── sets
export function room(x, t, R = {}) {
  const { wall = '#2a1f4e', wall2 = '#1a1238', floor = '#3a2a55', floorY = 1420, win = { x: 120, y: 330, w: 360, h: 420 }, lamp = null, dim = 0 } = R
  const g = x.createLinearGradient(0, 0, 0, floorY)
  g.addColorStop(0, wall2); g.addColorStop(1, wall)
  x.fillStyle = g; x.fillRect(0, 0, 1080, floorY)
  // wallpaper pixel dots
  x.fillStyle = 'rgba(255,255,255,0.035)'
  for (let j = 0; j < 22; j++) for (let i = 0; i < 12; i++) if ((i + j) % 2 === 0) x.fillRect(40 + i * 90, 40 + j * 64, 8, 8)
  if (win) {
    const { x: wx, y: wy, w, h } = win
    x.fillStyle = INK; x.fillRect(wx - 16, wy - 16, w + 32, h + 32)
    const sg = x.createLinearGradient(0, wy, 0, wy + h); sg.addColorStop(0, '#07041a'); sg.addColorStop(1, '#2a1858')
    x.fillStyle = sg; x.fillRect(wx, wy, w, h)
    for (let k = 0; k < 26; k++) { const a = 0.4 + 0.6 * Math.max(0, Math.sin(t * (1 + fr(k, 2)) + k)); x.globalAlpha = a; x.fillStyle = '#fff4d6'; x.fillRect(wx + fr(k, 1) * (w - 8), wy + fr(k, 3) * (h - 8), 5 + (k % 3) * 2, 5 + (k % 3) * 2) }
    x.globalAlpha = 1
    x.fillStyle = '#f4e6c0'; x.beginPath(); x.arc(wx + w * 0.72, wy + h * 0.28, 34, 0, TAU); x.fill()
    x.fillStyle = '#1f1545'; x.beginPath(); x.arc(wx + w * 0.72 + 14, wy + h * 0.28 - 8, 30, 0, TAU); x.fill()
    x.fillStyle = INK; x.fillRect(wx + w / 2 - 7, wy, 14, h); x.fillRect(wx, wy + h / 2 - 7, w, 14)
  }
  x.fillStyle = INK; x.fillRect(0, floorY - 10, 1080, 14)
  const fg = x.createLinearGradient(0, floorY, 0, 1920); fg.addColorStop(0, floor); fg.addColorStop(1, '#150d2c')
  x.fillStyle = fg; x.fillRect(0, floorY, 1080, 1920 - floorY)
  x.fillStyle = 'rgba(255,255,255,0.05)'
  for (let i = 0; i < 9; i++) x.fillRect(0, floorY + 30 + i * i * 7, 1080, 4)
  if (lamp) {
    const { x: lx, y: ly, col = '#ffd98a', k = 1 } = lamp
    const lg = x.createRadialGradient(lx, ly, 10, lx, ly, 560); lg.addColorStop(0, `rgba(255,217,138,${0.32 * k})`); lg.addColorStop(1, 'rgba(255,217,138,0)')
    x.fillStyle = lg; x.fillRect(lx - 560, ly - 560, 1120, 1120)
    void col
  }
  if (dim > 0) { x.fillStyle = `rgba(5,3,14,${dim})`; x.fillRect(0, 0, 1080, 1920) }
}
export function box(x, bx, by, w, h, col, { r = 18, b = 7, ink = INK, hi = null } = {}) {
  x.fillStyle = ink; x.beginPath(); x.roundRect(bx - b, by - b, w + 2 * b, h + 2 * b, r + b); x.fill()
  x.fillStyle = col; x.beginPath(); x.roundRect(bx, by, w, h, r); x.fill()
  if (hi) { x.fillStyle = hi; x.beginPath(); x.roundRect(bx + 10, by + 8, w - 20, Math.min(16, h * 0.2), 8); x.fill() }
}
export function sofa(x, cx, by, w = 640, col = '#6a4aa8') {
  box(x, cx - w / 2, by - 250, w, 150, col, { r: 30, hi: 'rgba(255,255,255,0.12)' })
  box(x, cx - w / 2 - 40, by - 170, 90, 170, col, { r: 26 }); box(x, cx + w / 2 - 50, by - 170, 90, 170, col, { r: 26 })
  box(x, cx - w / 2 + 40, by - 120, w - 80, 110, col, { r: 22, hi: 'rgba(255,255,255,0.1)' })
}
export function table(x, cx, ty, w = 560, col = '#8a5a3c') {
  box(x, cx - w / 2, ty, w, 40, col, { r: 10, hi: 'rgba(255,255,255,0.15)' })
  box(x, cx - w / 2 + 40, ty + 46, 26, 300, col, { r: 6 }); box(x, cx + w / 2 - 66, ty + 46, 26, 300, col, { r: 6 })
}
export function bed(x, cx, by, w = 820, col = '#4a6ad0') {
  box(x, cx - w / 2, by - 380, 70, 380, '#6b4a3a', { r: 14 })
  box(x, cx - w / 2 + 60, by - 190, w - 60, 140, col, { r: 24, hi: 'rgba(255,255,255,0.14)' })
  box(x, cx - w / 2 + 90, by - 250, 200, 70, '#efe6d6', { r: 26 })
  box(x, cx - w / 2 + 60, by - 50, w - 60, 50, '#6b4a3a', { r: 10 })
}
export function cup(x, cx, by, col = '#efe6d6', t = 0, steam = true) {
  box(x, cx - 34, by - 70, 68, 70, col, { r: 12, b: 5 })
  x.strokeStyle = INK; x.lineWidth = 9; x.beginPath(); x.arc(cx + 40, by - 36, 18, -1.2, 1.2); x.stroke()
  if (steam) { x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 6; for (let k = 0; k < 2; k++) { x.beginPath(); for (let j = 0; j < 8; j++) { const yy = by - 90 - j * 12; const xx = cx - 10 + k * 20 + Math.sin(t * 3 + j * 0.8 + k) * 8; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() } }
}
export function tissue(x, cx, cy, k = 1) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -60, -30, 120, 60, '#cfe9ff', { r: 10, b: 5 }); x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-30, -30); x.quadraticCurveTo(0, -90, 30, -30); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; x.stroke()
  x.restore()
}

// ─────────────────────────────────────────── text helpers
export function wrap(x, text, font, maxW) {
  x.font = font
  const words = String(text).split(' '), rows = []
  let cur = ''
  for (const w of words) { const s = cur ? cur + ' ' + w : w; if (x.measureText(s).width > maxW && cur) { rows.push(cur); cur = w } else cur = s }
  if (cur) rows.push(cur)
  return rows
}
export function label(x, text, cx, cy, { size = 44, col = BONE, font = INTER, weight = 800, rot = 0, align = 'center', stroke = INK, sw = 10, alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (stroke) { x.lineJoin = 'round'; x.lineWidth = sw; x.strokeStyle = stroke; x.strokeText(text, 0, 0) }
  x.fillStyle = col; x.fillText(text, 0, 0); x.restore()
}

// ─────────────────────────────────────────── the chat phone
// P = { x, y, s, rot, name, sub, color, msgs: [{ at, side: 'L'|'R', text, out? }], compose: [{ t0, text, cps, sent?, clear?, strike? }],
//       dots: [[a, b]], receipt: { at, text }, glow }
const PW = 620, PHH = 1040
export function phone(x, t, P) {
  const { x: cx = 540, y: cy = 900, s = 1, rot = 0, name = 'crush', sub = 'online', color = PINK, msgs = [], compose = [], dots = [], receipt = null, alpha = 1, hand = false } = P
  if (alpha <= 0 || s <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const L = -PW / 2, T = -PHH / 2
  x.save(); x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 40; x.shadowOffsetY = 18
  x.fillStyle = INK; x.beginPath(); x.roundRect(L - 12, T - 12, PW + 24, PHH + 24, 74); x.fill(); x.restore()
  x.fillStyle = '#2b2350'; x.beginPath(); x.roundRect(L, T, PW, PHH, 62); x.fill()
  const SL = L + 22, ST = T + 22, SW = PW - 44, SH = PHH - 44
  x.fillStyle = '#0f0a26'; x.beginPath(); x.roundRect(SL, ST, SW, SH, 46); x.fill()
  x.save(); x.beginPath(); x.roundRect(SL, ST, SW, SH, 46); x.clip()
  // header
  x.fillStyle = '#1b1440'; x.fillRect(SL, ST, SW, 150)
  x.fillStyle = INK; x.beginPath(); x.arc(SL + 82, ST + 88, 42, 0, TAU); x.fill()
  x.fillStyle = color; x.beginPath(); x.arc(SL + 82, ST + 88, 36, 0, TAU); x.fill()
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(name)[0].toUpperCase(), SL + 82, ST + 90)
  x.textAlign = 'left'; x.fillStyle = BONE; x.font = `800 36px ${INTER}`; x.fillText(name, SL + 146, ST + 72)
  const typing = dots.some(([a, b]) => t >= a && t < b)
  x.fillStyle = typing ? '#9fe6b0' : 'rgba(239,230,214,0.55)'; x.font = `700 24px ${MONO}`; x.fillText(typing ? 'typing…' : sub, SL + 146, ST + 112)
  x.fillStyle = 'rgba(255,255,255,0.08)'; x.fillRect(SL, ST + 150, SW, 3)
  // compose bar
  const CB = ST + SH - 130
  let draft = null
  for (const c of compose) if (t >= c.t0 && !(c.sent !== undefined && t >= c.sent) && !(c.clear !== undefined && t >= c.clear)) draft = c
  x.fillStyle = '#1b1440'; x.fillRect(SL, CB, SW, 130)
  box(x, SL + 26, CB + 26, SW - 140, 78, '#2b2350', { r: 39, b: 4 })
  let sendK = 0
  if (draft) {
    const n = Math.floor((t - draft.t0) * (draft.cps ?? 30))
    const full = draft.text, shown = draft.cps === 0 ? full : full.slice(0, Math.max(0, n))
    x.save(); x.beginPath(); x.rect(SL + 40, CB + 26, SW - 170, 78); x.clip()
    x.font = `700 34px ${INTER}`; const w = x.measureText(shown).width
    const off = Math.max(0, w - (SW - 190))
    x.fillStyle = draft.gold ? GOLD : BONE; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillText(shown, SL + 52 - off, CB + 66)
    if (Math.floor(t * 2.4) % 2 === 0 || shown.length < full.length) { x.fillStyle = GOLD; x.fillRect(SL + 56 + w - off, CB + 46, 4, 40) }
    if (draft.strike !== undefined && t >= draft.strike) {
      const k = clamp((t - draft.strike) / 0.25)
      x.strokeStyle = RED; x.lineWidth = 9; x.lineCap = 'round'
      x.beginPath(); x.moveTo(SL + 44, CB + 72); x.lineTo(SL + 44 + (Math.min(w, SW - 190) + 20) * k, CB + 58); x.stroke()
    }
    x.restore()
    if (draft.sent !== undefined) sendK = clamp(1 - Math.abs(t - draft.sent + 0.1) / 0.2)
  }
  const sx = SL + SW - 70, sy = CB + 65
  x.fillStyle = INK; x.beginPath(); x.arc(sx, sy, 42 + sendK * 6, 0, TAU); x.fill()
  x.fillStyle = draft ? GOLD : '#5a5080'; x.beginPath(); x.arc(sx, sy, 35 + sendK * 6, 0, TAU); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(sx - 14, sy - 16); x.lineTo(sx + 18, sy); x.lineTo(sx - 14, sy + 16); x.closePath(); x.fill()
  // messages (bottom-up)
  x.beginPath(); x.rect(SL, ST + 153, SW, CB - ST - 153); x.clip()
  const vis = msgs.filter(m => t >= m.at && !(m.out !== undefined && t >= m.out))
  const items = []
  if (typing) items.push({ dots: true, side: 'L', h: 74 })
  for (let i = vis.length - 1; i >= 0; i--) {
    const m = vis[i]
    const rows = wrap(x, m.text, `700 ${m.size || 40}px ${INTER}`, 450)
    items.push({ m, rows, h: rows.length * (m.size || 40) * 1.25 + 34 })
  }
  let yb = CB - 22
  if (receipt && t >= receipt.at) {
    x.fillStyle = 'rgba(239,230,214,0.6)'; x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'alphabetic'
    x.fillText(receipt.text, SL + SW - 30, yb - 2); yb -= 34
  }
  for (const it of items) {
    const top = yb - it.h
    if (it.dots) {
      box(x, SL + 28, top, 140, 64, '#3a3168', { r: 32, b: 0 })
      for (let k = 0; k < 3; k++) { const a = 0.4 + 0.6 * Math.max(0, Math.sin(t * 9 - k * 0.9)); x.fillStyle = `rgba(239,230,214,${a})`; x.beginPath(); x.arc(SL + 64 + k * 34, top + 32 - 6 * Math.max(0, Math.sin(t * 9 - k * 0.9)), 10, 0, TAU); x.fill() }
    } else {
      const m = it.m, R = m.side === 'R', fs = m.size || 40
      x.font = `700 ${fs}px ${INTER}`
      const bw = Math.max(...it.rows.map(r => x.measureText(r).width)) + 44
      const k = easeOutBack(clamp((t - m.at) / 0.25), 2.2)
      const bx = R ? SL + SW - 26 - bw : SL + 26
      x.save(); x.translate(R ? bx + bw : bx, top + it.h); x.scale(k, k); x.translate(-(R ? bx + bw : bx), -(top + it.h))
      x.fillStyle = R ? (m.col || GOLD) : (m.col || '#3a3168'); x.beginPath(); x.roundRect(bx, top, bw, it.h - 10, 28); x.fill()
      x.fillStyle = R ? INK : BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
      it.rows.forEach((r, j) => x.fillText(r, bx + 22, top + 12 + fs * 0.62 + j * fs * 1.25))
      x.restore()
    }
    yb = top - 14
    if (yb < ST + 150) break
  }
  x.restore()
  // notch
  x.fillStyle = INK; x.beginPath(); x.roundRect(-70, T + 30, 140, 30, 15); x.fill()
  x.restore()
  void hand
}

// ─────────────────────────────────────────── Mercury texts in bursts
export function burst(t0, lines, { x = 540, y = 360, step = 116, gap = 0.42, t1, size = 42, who = 'mercury', tail = 0, tailUp = false, maxW = 760, cps = 46 } = {}) {
  return lines.map((text, i) => ({ t0: +(t0 + i * gap).toFixed(3), t1: t1 ?? t0 + lines.length * gap + 1.6, x, y: y + i * step, who, text, tail: i === lines.length - 1 ? tail : 0, tailUp, size, maxW, cps, tag: i === 0 }))
}

// ─────────────────────────────────────────── the film assembler
const FX = {
  whip: [whipZoom, whipZoomCues], rec: [recordScratch, recordScratchCues], glitch: [glitch, glitchCues], shake: [screenShake, shakeCues],
  load: [loadingBar, loadingBarCues], notif: [notification, notificationCues], chapter: [chapter, chapterCues], caught: [caught, caughtCues],
  slam: [slamTitle, slamTitleCues], ach: [achievement, achievementCues],
}
export function film(spec) {
  const { id, duration: DURATION, draw, speech = [], fx = [], hook, last, ending = 'cut', bug = 'planet talk · mercury', extraCues = [] } = spec
  const MLINES = speech.filter(b => b.who === 'mercury').map(b => ({ t: b.t0 + 0.08, who: 'mercury', text: b.text, cps: b.cps }))
  if (last && last.say !== false) MLINES.push({ t: last.at, who: 'mercury', text: last.text.replace(/\|/g, ' ') })
  const mouth = t => { let m = 0; for (const L of MLINES) { if (t < L.t || t > L.t + 4) continue; m = Math.max(m, talkOpen(t, [L], 'mercury', { cps: L.cps || 32 })) } return m }
  const H = { mouth, speech }
  async function build(stage) {
    const root = fill(stage, { background: '#07041a' })
    try { await Promise.all(['800 60px Inter', '700 30px Inter', "italic 600 60px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const gx = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }).getContext('2d')
    const b = el('div', { position: 'absolute', left: '64px', top: '64px', font: '800 30px Inter', letterSpacing: '0.3em', fontVariant: 'small-caps', color: 'rgba(239,230,214,0.85)', textShadow: '0 2px 10px rgba(6,4,18,0.95)' }, root, bug)
    void b
    return {
      start: 0, end: DURATION + 1, root,
      update(t) {
        x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.clearRect(0, 0, 1080, 1920)
        draw(x, t, H)
        for (const s of speech) if (!s.manual) kitSpeech(x, t, s)
        drawGrain(gx, t)
      },
    }
  }
  const recs = fx.filter(f => f[0] === 'rec').map(f => f[1])
  const MAIN = recs.length ? frozen(build, recs) : build
  const HOOK = hook ? { at: -1, top: 220, size: 104, ...hook } : null
  const LAST = last ? { top: 250, size: 100, ...last } : null
  const over = fx.map(([k, o]) => FX[k][0](o))
  const SCENES = [MAIN, ...over]
  if (HOOK) SCENES.push(slamTitle(HOOK))
  if (LAST) SCENES.push(slamTitle(LAST))
  if (ending === 'loop') {
    const f0 = [MAIN, ...fx.filter(([k, o]) => k === 'whip' && o.at <= 0).map(([, o]) => whipZoom(o))]
    if (HOOK) f0.push(slamTitle(HOOK))
    SCENES.push(loopBack(f0, { duration: DURATION }))
  }
  const CUES = [
    ...fx.flatMap(([k, o]) => FX[k][1](o)),
    ...(HOOK ? slamTitleCues(HOOK) : []), ...(LAST ? slamTitleCues(LAST) : []),
    ...speechCues(speech.filter(s => !s.silent)),
    ...(LAST && LAST.say !== false ? speechCues([{ t0: LAST.at + 0.05, who: 'mercury', text: LAST.text.replace(/[|*]/g, ''), cps: 40 }]) : []),
    ...(ending === 'loop' ? loopCues({ duration: DURATION }) : []),
    ...extraCues,
  ].filter(c => c[1] >= 0 && c[1] < DURATION)
  return { DURATION, SCENES, CUES }
}

// ─────────────────────────────────────────── small fx
export function speedLines(x, t, cx, cy, { n = 18, r0 = 260, len = 300, alpha = 0.7, col = 'rgba(255,251,234,1)' } = {}) {
  x.save(); x.strokeStyle = col; x.lineCap = 'round'
  for (let k = 0; k < n; k++) {
    const a = fr(k, 7) * TAU, ph = (t * 3 + fr(k, 10)) % 1, d = r0 + ph * 380
    x.globalAlpha = alpha * Math.sin(ph * Math.PI); x.lineWidth = 4 + fr(k, 11) * 7
    x.beginPath(); x.moveTo(cx + Math.cos(a) * d, cy + Math.sin(a) * d); x.lineTo(cx + Math.cos(a) * (d + len * fr(k, 9) + 80), cy + Math.sin(a) * (d + len * fr(k, 9) + 80)); x.stroke()
  }
  x.restore()
}
export function smoke(x, t, cx, cy, { n = 7, k = 1, col = '#cfc8e8' } = {}) {
  if (k <= 0) return
  x.save()
  for (let i = 0; i < n; i++) {
    const ph = (t * 1.3 + i / n) % 1
    x.globalAlpha = k * 0.55 * (1 - ph); x.fillStyle = col
    const r = 26 + ph * 70
    x.beginPath(); x.arc(cx + (fr(i, 2) - 0.5) * 120 - ph * 90, cy - ph * 160, r, 0, TAU); x.fill()
  }
  x.restore()
}
export function hearts(x, t, t0, cx, cy, { n = 6, col = PINK, spread = 260 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = clamp((t - t0 - i * 0.08) / 1.6); if (ph <= 0 || ph >= 1) continue
    const hx = cx + (fr(i, 3) - 0.5) * spread, hy = cy - ph * 300
    x.save(); x.globalAlpha = 1 - ph; x.translate(hx, hy); const s = 2 + fr(i, 4) * 2
    const B = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
    B.forEach((row, j) => [...row].forEach((c, k) => { if (c === 'H') { x.fillStyle = col; x.fillRect((k - 3.5) * 4 * s, (j - 3) * 4 * s, 4 * s, 4 * s) } }))
    x.restore()
  }
}
