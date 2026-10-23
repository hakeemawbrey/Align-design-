// houses (30 s, vertical 1080×1920): "The 12 houses, explained."
// Hook: an apartment building pops up floor by floor, its 12 windows flash on → triad (planets = what, signs = how,
// houses = where; the "where" icon is the building in miniature) → the mini building grows back to full size and its
// 12 rooms light one by one (≈1.39 s each, on the 108 bpm grid), each with its own icon gag and a big label up top →
// "Your birth time decides which sign rules each house." (a clock spins, sign tags spin on every room and settle,
// Scorpio rising) → "Welcome home." (a pictogram walks home, the windows ripple, sparkles) → fade.
// Pure function of t. One canvas, DOM type above it, grain on top. No document access at module top level.
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { W, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { ICONS, ink, BONE, GOLD } from './icons.js'

export const DURATION = 30
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const BEAT = n => 0.6 + n * 0.5556
const D2R = Math.PI / 180

// ── building geometry (local units: x centred, y = 0 at the ground, up is negative)
const BW = 860, RW = BW / 3, FH = 236, FLOORS = 4, ROOF = 170
const roomBox = i => { const f = Math.floor(i / 3), c = i % 3; return { x: -BW / 2 + c * RW, y: -(f + 1) * FH, w: RW, h: FH, cx: -BW / 2 + (c + 0.5) * RW, cy: -(f + 0.5) * FH } }
const ROOMS = [
  { tag: 'YOU', label: 'You' },
  { tag: 'MONEY', label: 'Money' },
  { tag: 'TALK', label: 'Talk' },
  { tag: 'HOME', label: 'Home' },
  { tag: 'FUN', label: 'Fun & | romance' },
  { tag: 'ROUTINE', label: 'Routine & | health' },
  { tag: 'PARTNERS', label: 'Partners' },
  { tag: 'SHARED', label: 'Shared & | deep' },
  { tag: 'TRAVEL', label: 'Travel & | big ideas' },
  { tag: 'CAREER', label: 'Career' },
  { tag: 'FRIENDS', label: 'Friends' },
  { tag: 'REST', label: 'Rest & | secrets' },
].map((r, i) => ({ ...r, col: SIGNS[i].color }))
const ORD = ['1ST', '2ND', '3RD', '4TH', '5TH', '6TH', '7TH', '8TH', '9TH', '10TH', '11TH', '12TH']
const RISING = 7   // Scorpio rising for the demo: house n is ruled by sign (RISING + n - 1)

// ── beats
const T = {
  head0: 0.15, floors: [0.2, 0.3, 0.4, 0.5], roof: BEAT(0.5), flash: 1.2, flashGap: 0.06, flashOff: 2.35, bldOut: 2.42, headOut: [2.42, 2.6],
  rows: [BEAT(4), BEAT(5), BEAT(6)], rowsOut: [5.82, 6.0], grow: [5.95, 6.55],
  room0: 11, roomStep: 2.5,
  pullback: [23.15, 23.65], clock: BEAT(41), spin: [23.55, 25.15], punch: BEAT(42), punchOut: [26.15, 26.35],
  endCam: [26.2, 26.8], endHead: 26.45, home: BEAT(47), walk: [26.7, 27.85], ripple: BEAT(49), fade: [29.3, 30],
}
const ROOM_T = i => BEAT(T.room0 + T.roomStep * i)
const ROOM_END = ROOM_T(12) - 0.05   // ≈ 23.38
const WX = 92
const SETTLE_T = i => T.spin[1] + i * 0.035

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32) => easeOutBack(prog(t, t0, t0 + d))
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const bump = (t, t0, d = 0.35) => { const p = prog(t, t0, t0 + d); return p > 0 && p < 1 ? Math.sin(Math.PI * p) : 0 }

function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, color)
  }
  x.restore()
}
function orb(x, px, py, r, color, a) {
  if (a <= 0 || r <= 0.5) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(px, py, r * 0.5, px, py, r * 3.2)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, r * 3.2, 0, Math.PI * 2); x.fill()
  x.globalCompositeOperation = 'source-over'; x.globalAlpha = a
  const s = x.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.4, color); s.addColorStop(1, rgba(color, 0.85))
  x.fillStyle = s; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill()
  drawPixelStar(x, Math.round(px + r * 0.8), Math.round(py - r * 0.8), 18, 0, 'rgba(255,243,224,0.9)')
  x.restore()
}

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break */
function popText(parent, text, { top, size, font = INTER, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, lastAt = null, wobble = false, color = BONE, left = 70, width = W - 140, align = 'center' }) {
  const box = el('div', { position: 'absolute', left: left + 'px', width: width + 'px', top: top + 'px', textAlign: align,
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.02, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' ')
  const ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: align === 'left' ? '0 0.26em 0 0' : '0 0.13em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    ws.push({ t: isLast && lastAt != null ? lastAt : t0 + n * gap, big: isLast && lastAt != null, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    words: ws.length,
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── camera for the building: screen = (cx, gy) + local · s
const CAM_FULL = { cx: 540, gy: 1705, s: 1 }
const ROW_Y = [650, 1000, 1350], ICON_X = 210
const CAM_ICON = { cx: ICON_X, gy: ROW_Y[2] + 0.215 * (FLOORS * FH + ROOF) / 2 + 6, s: 0.215 }
const CAM_PUNCH = { cx: 540, gy: 1450, s: 0.72 }
const CAM_END = { cx: 595, gy: 1700, s: 0.84 }
// during the rooms the camera leans gently toward the lit room
const focusOf = i => { if (i < 0) return CAM_FULL; const r = roomBox(i), s = 1.035; return { cx: 540 - r.cx * 0.09, gy: CAM_FULL.gy - (r.cy + (FLOORS * FH) / 2) * 0.07 + (s - 1) * 300, s } }
function focusCam(t) {
  let i = -1
  for (let j = 0; j < 12; j++) if (t >= ROOM_T(j) - 0.1) i = j
  const a = focusOf(i - 1), b = focusOf(i), k = i < 0 ? 0 : ease.inOutCubic(prog(t, ROOM_T(i) - 0.1, ROOM_T(i) + 0.4))
  return lerpCam(a, b, k)
}
const lerpCam = (a, b, k) => ({ cx: lerp(a.cx, b.cx, k), gy: lerp(a.gy, b.gy, k), s: lerp(a.s, b.s, k) })
function camAt(t) {
  if (t < T.rows[2]) return { ...CAM_FULL, k: 1 - ease.inCubic(prog(t, T.bldOut, T.bldOut + 0.3)) }
  if (t < T.grow[0]) return { ...CAM_ICON, k: pop01(t, T.rows[2], 0.42) }
  if (t < T.pullback[0]) { const g = ease.inOutCubic(prog(t, ...T.grow)); return { ...lerpCam(CAM_ICON, focusCam(t), g), k: 1, arc: Math.sin(Math.PI * g) } }
  if (t < T.endCam[0]) return { ...lerpCam(focusCam(t), CAM_PUNCH, ease.inOutCubic(prog(t, ...T.pullback))), k: 1 }
  return { ...lerpCam(CAM_PUNCH, CAM_END, ease.inOutCubic(prog(t, ...T.endCam))), k: 1 }
}

async function build(stage) {
  try { await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The 12 houses, | *explained.*', { top: 215, size: 112, accentSize: 156, at: T.head0, lastAt: BEAT(1), wobble: true })
  const ROWTXT = [
    ['Planets are | the *what.*', '#f2c75c'],
    ['Signs are | the *how.*', SIGNS[4].color],
    ['Houses are | the *where.*', '#7fd0f0'],
  ].map(([s, c], i) => popText(root, s, { top: ROW_Y[i] - 92, size: 88, accentSize: 104, accentColor: c, left: 370, width: 650, align: 'left', at: T.rows[i] + 0.08, gap: 0.08 }))
  const EYES = ROOMS.map((r, i) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: '172px', textAlign: 'center', font: "700 40px 'Space Mono', monospace",
    letterSpacing: '0.22em', color: r.col, textShadow: SHADOW, opacity: 0 }, root, `${ORD[i]} HOUSE`))
  const LABELS = ROOMS.map((r, i) => {
    const two = r.label.includes('|')
    return popText(root, r.label.replace(/(&)/, '*&*'), { top: two ? 236 : 250, size: two ? 104 : 124, accentSize: two ? 112 : 132, accentColor: r.col, at: ROOM_T(i) + 0.04, gap: 0.06 })
  })
  const P1 = popText(root, 'Your *birth time* decides | which sign rules each house.', { top: 1548, size: 60, weight: 700, accentSize: 70, accentColor: GOLD, at: T.punch, gap: 0.055 })
  const HEND = popText(root, 'Welcome | *home.*', { top: 200, size: 160, accentSize: 190, accentColor: GOLD, at: T.endHead, lastAt: T.home, wobble: true })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B_ROOF = makeBurst(3, 12, 170), B_ROOM = ROOMS.map((_, i) => makeBurst(20 + i, 9, 120)), B_ROW = [0, 1, 2].map(i => makeBurst(50 + i, 9, 120))
  const B_SET = ROOMS.map((_, i) => makeBurst(70 + i, 6, 60)), B_END = makeBurst(90, 14, 260), B_STAR = makeBurst(91, 10, 140)

  // ── light / icon states
  function roomState(i, t) {
    // returns { L: light 0..1, icon: 0..1 pop, act: 0..1 spotlight, t0 }
    if (t < T.rows[2]) {   // hook flash
      const on = T.flash + i * T.flashGap
      const L = ease.outCubic(prog(t, on, on + 0.12)) * (1 - ease.inQuad(prog(t, T.flashOff, T.flashOff + 0.1)))
      return { L: L * (0.85 + 0.15 * bump(t, on, 0.3)), icon: 0, act: 0, t0: on }
    }
    if (t < ROOM_T(0) - 0.1) return { L: 0, icon: 0, act: 0, t0: 0 }
    const t0 = ROOM_T(i)
    if (t < t0) return { L: 0, icon: 0, act: 0, t0 }
    const act = t < ROOM_END ? clamp(1 - prog(t, ROOM_T(i + 1) - 0.05, ROOM_T(i + 1) + 0.25)) : 0
    let L = 0.62 + 0.38 * act
    if (t >= T.ripple) L = Math.max(L, 0.62 + 0.38 * bump(t, T.ripple + (11 - i) * 0.05 * 0 + (Math.floor(i / 3) * 0.12 + (i % 3) * 0.04), 0.5))
    return { L, icon: pop01(t, t0, 0.42), act, t0 }
  }

  function drawBuilding(t, cam) {
    const { cx, gy, s, k } = cam
    if (k <= 0) return
    const boost = clamp(0.62 / s, 1, 2.4)
    x.save(); x.translate(cx, gy); x.scale(s * k, s * k)
    const lw = w => w * boost
    const iconMode = s < 0.5
    // floors pop up from the ground in the hook; afterwards whole
    const floorK = f => t < 1.5 ? easeOutBack(prog(t, T.floors[f], T.floors[f] + 0.32), 2.2) : 1
    // ground line + bushes
    x.save(); x.globalAlpha *= clamp(floorK(0) * 2)
    x.beginPath(); x.moveTo(-BW / 2 - 120, 0); x.lineTo(BW / 2 + 120, 0); ink(x, BONE, { fa: 0, w: lw(7), glow: 14 })
    if (!iconMode) for (const bx of [-BW / 2 - 64, BW / 2 + 64]) { x.beginPath(); x.arc(bx - 18, -22, 24, Math.PI, 0); x.arc(bx + 16, -26, 30, Math.PI, 0); x.lineTo(bx + 46, 0); x.lineTo(bx - 42, 0); x.closePath(); ink(x, '#5fdc7a', { fa: 0.3, w: 5 }) }
    x.restore()
    for (let f = 0; f < FLOORS; f++) {
      const fk = floorK(f)
      if (fk <= 0) continue
      x.save()
      // the floor rises from its own bottom edge
      x.translate(0, -f * FH); x.scale(1, Math.max(0.01, fk)); x.translate(0, f * FH)
      x.globalAlpha *= clamp(fk * 2)
      for (let c = 0; c < 3; c++) {
        const i = f * 3 + c, r = roomBox(i), st = roomState(i, t), col = ROOMS[i].col
        const sp = st.act * (1 + 0.1 * bump(t, st.t0, 0.4))
        // room fill
        x.beginPath(); x.rect(r.x, r.y, r.w, r.h)
        x.fillStyle = 'rgba(12,9,30,0.82)'; x.fill()
        if (st.L > 0) {
          const g = x.createRadialGradient(r.cx, r.cy - 20, 10, r.cx, r.cy, r.w * 0.75)
          g.addColorStop(0, rgba(col, 0.55 * st.L)); g.addColorStop(1, rgba(col, 0.18 * st.L))
          x.fillStyle = g; x.fill()
          // ceiling lamp
          x.save(); x.globalAlpha *= st.L
          x.beginPath(); x.moveTo(r.cx, r.y + 4); x.lineTo(r.cx, r.y + 18); ink(x, BONE, { fa: 0, w: lw(3), glow: 0 })
          x.beginPath(); x.arc(r.cx, r.y + 24, 8, Math.PI, 0); x.closePath(); ink(x, GOLD, { fa: 0.9, w: lw(3), glow: 18 })
          x.restore()
        }
        if (!iconMode && st.icon > 0) {
          x.save(); x.beginPath(); x.rect(r.x + 4, r.y + 4, r.w - 8, r.h - 8); x.clip()
          const sc = st.icon * (1 + 0.12 * sp)
          x.translate(r.cx, r.cy - 2); x.scale(sc * 1.12, sc * 1.12)
          ICONS[i](x, t, st.t0, col, r.w / 1.12)
          x.restore()
          // number + tag
          x.save(); x.globalAlpha *= clamp(st.icon * 2)
          x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'top'; x.font = `700 30px ${MONO}`
          x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 8
          x.fillText(String(i + 1), r.x + 14, r.y + 10)
          x.restore()
        }
        // sign tags (punchline): spin through the signs, settle on the ruler
        if (!iconMode && t >= T.spin[0] - 0.3) {
          const tk = pop01(t, T.spin[0] - 0.3 + i * 0.02, 0.35)
          const settle = SETTLE_T(i)
          const target = (RISING + i) % 12
          const idx = t < settle ? (target + 12 + Math.floor((settle - t) * 14)) % 12 : target
          const sg = SIGNS[idx], ok = t >= settle
          const sk = tk * (1 + 0.35 * bump(t, settle, 0.3))
          x.save(); x.translate(r.x + r.w - 40, r.y + 40); x.scale(sk, sk)
          x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.fillStyle = 'rgba(12,9,30,0.92)'; x.fill()
          ink(x, ok ? sg.color : BONE, { fa: ok ? 0.35 : 0.1, fill: sg.color, w: 4, glow: ok ? 16 : 4 })
          x.fillStyle = ok ? '#fffaf0' : sg.color; x.font = `bold 42px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
          x.fillText(sg.glyph + '︎', 0, 3)
          x.restore()
        }
        // walls
        x.beginPath(); x.rect(r.x, r.y, r.w, r.h)
        ink(x, sp > 0.02 ? col : BONE, { fa: 0, w: lw(sp > 0.02 ? 8 : 6), glow: 10 + 24 * sp })
      }
      x.restore()
    }
    // roof: drops in with a squash
    const rp = prog(t, T.roof - 0.3, T.roof)
    if (t >= T.roof - 0.3) {
      const drop = t < T.roof ? -500 * (1 - ease.inQuad(rp)) : 0
      const land = t >= T.roof ? Math.sin(Math.PI * clamp((t - T.roof) / 0.3)) * Math.exp(-(t - T.roof) * 2) : 0
      x.save(); x.translate(0, -FLOORS * FH + drop); x.scale(1 + 0.08 * land, 1 - 0.18 * land); x.globalAlpha *= clamp(rp * 3)
      x.beginPath(); x.moveTo(-BW / 2 - 50, 0); x.lineTo(0, -ROOF); x.lineTo(BW / 2 + 50, 0); x.closePath(); ink(x, GOLD, { fa: 0.22, w: lw(8), glow: 22 })
      // chimney
      x.beginPath(); x.moveTo(250, -ROOF * (1 - 250 / (BW / 2 + 50)) + 6); x.lineTo(250, -ROOF - 10); x.lineTo(310, -ROOF - 10); x.lineTo(310, -ROOF * (1 - 310 / (BW / 2 + 50)) + 6); ink(x, GOLD, { fa: 0.22, w: lw(7) })
      // attic round window with a star
      x.beginPath(); x.arc(0, -ROOF * 0.42, 30, 0, Math.PI * 2); ink(x, GOLD, { fa: 0.35, w: lw(6) })
      drawPixelStar(x, 0, Math.round(-ROOF * 0.42), 22, 0, '#fff3c0')
      x.restore()
    }
    x.restore()
    if (t >= T.roof && t < T.roof + 0.8) drawBurst(x, B_ROOF, cx, gy + (-FLOORS * FH - ROOF * 0.5) * s, t, T.roof, GOLD, 0.7)
  }
  const roomScreen = (i, cam) => { const r = roomBox(i); return { x: cam.cx + r.cx * cam.s, y: cam.gy + r.cy * cam.s } }

  // ── triad row icons: a ringed planet, a sign badge (the mini building is drawn by drawBuilding)
  function drawRows(t) {
    if (t < T.rows[0] - 0.05 || t > T.rowsOut[1] + 0.4) return
    // planet
    const k0 = pop01(t, T.rows[0], 0.42) * outScale(t, T.rowsOut[0])
    if (k0 > 0) {
      const y = ROW_Y[0] + 8 * Math.sin(t * 2.4), sp = (t - T.rows[0])
      x.save(); x.translate(ICON_X, y); x.scale(k0, k0); x.rotate(-0.35)
      x.beginPath(); x.ellipse(0, 0, 120, 32, 0, Math.PI, Math.PI * 2); ink(x, BONE, { fa: 0, w: 7, glow: 14 })
      x.restore()
      orb(x, ICON_X, y, 70 * k0, GOLD, clamp(k0 * 2))
      x.save(); x.translate(ICON_X, y); x.scale(k0, k0); x.rotate(-0.35)
      x.beginPath(); x.ellipse(0, 0, 120, 32, 0, 0, Math.PI); ink(x, BONE, { fa: 0, w: 7, glow: 14 })
      x.restore()
      drawBurst(x, B_ROW[0], ICON_X, y, t, T.rows[0], GOLD, 0.6)
      void sp
    }
    // sign badge (Leo), spins in
    const k1 = pop01(t, T.rows[1], 0.45) * outScale(t, T.rowsOut[0] + 0.05)
    if (k1 > 0) {
      const col = SIGNS[4].color, y = ROW_Y[1] + 8 * Math.sin(t * 2.4 + 1)
      const spin = (1 - clamp(prog(t, T.rows[1], T.rows[1] + 0.5))) * -360
      x.save(); x.translate(ICON_X, y); x.scale(k1, k1); x.rotate(spin * D2R)
      x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); ink(x, col, { fa: 0.25, w: 8, glow: 24 })
      x.beginPath(); x.arc(0, 0, 74, 0, Math.PI * 2); ink(x, col, { fa: 0, w: 3, glow: 6 })
      x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 24; x.font = `bold 130px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(SIGNS[4].glyph + '︎', 0, 8)
      x.restore()
      drawBurst(x, B_ROW[1], ICON_X, y, t, T.rows[1], col, 0.6)
    }
    if (t >= T.rows[2]) drawBurst(x, B_ROW[2], ICON_X, ROW_Y[2], t, T.rows[2], '#7fd0f0', 0.6)
  }

  // ── punchline clock
  function drawClock(t) {
    if (t < T.clock - 0.05 || t > T.punchOut[1] + 0.4) return
    const k = pop01(t, T.clock, 0.42) * outScale(t, T.punchOut[0])
    if (k <= 0) return
    const cx = 540, cy = 395, R = 118
    const sp = ease.inOutCubic(prog(t, ...T.spin))
    const settleB = bump(t, T.spin[1], 0.35)
    x.save(); x.translate(cx, cy + 6 * Math.sin(t * 3)); x.scale(k * (1 + 0.08 * settleB), k * (1 + 0.08 * settleB))
    // bells + legs (an alarm clock)
    for (const sd of [-1, 1]) {
      x.save(); x.rotate(sd * 0.62); x.beginPath(); x.arc(0, -R - 14, 34, Math.PI, 0); x.closePath(); ink(x, GOLD, { fa: 0.35, w: 6 }); x.restore()
      x.beginPath(); x.moveTo(sd * R * 0.62, R * 0.78); x.lineTo(sd * R * 0.86, R * 1.12); ink(x, GOLD, { fa: 0, w: 8 })
    }
    x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fillStyle = 'rgba(12,9,30,0.9)'; x.fill(); ink(x, GOLD, { fa: 0.15, w: 9, glow: 22 })
    for (let h = 0; h < 12; h++) { const a = h * Math.PI / 6; x.beginPath(); x.moveTo(Math.sin(a) * (R - 16), -Math.cos(a) * (R - 16)); x.lineTo(Math.sin(a) * (R - 30), -Math.cos(a) * (R - 30)); ink(x, BONE, { fa: 0, w: 5, glow: 4 }) }
    const hm = 4 * Math.PI * 2 * sp, hh = hm / 12 + 0.4
    x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(hh) * 54, -Math.cos(hh) * 54); ink(x, BONE, { fa: 0, w: 10, glow: 8 })
    x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(hm) * 86, -Math.cos(hm) * 86); ink(x, GOLD, { fa: 0, w: 7, glow: 12 })
    x.beginPath(); x.arc(0, 0, 11, 0, Math.PI * 2); x.fillStyle = GOLD; x.fill()
    x.restore()
    // shake lines while spinning
    if (t > T.spin[0] && t < T.spin[1]) {
      x.save(); x.globalAlpha = 0.7 * Math.sin(Math.PI * prog(t, ...T.spin))
      for (const sd of [-1, 1]) for (let j = 0; j < 3; j++) {
        const a = (sd > 0 ? 0 : Math.PI) + (j - 1) * 0.45, j2 = 6 * Math.sin(t * 40 + j)
        x.beginPath(); x.moveTo(cx + Math.cos(a) * (R + 44 + j2), cy + Math.sin(a) * (R + 44)); x.lineTo(cx + Math.cos(a) * (R + 74 + j2), cy + Math.sin(a) * (R + 74)); ink(x, BONE, { fa: 0, w: 6, glow: 8 })
      }
      x.restore()
    }
  }

  // ── end: a pictogram walks home, the windows ripple, sparkles fly off the roof
  function drawEnd(t, cam) {
    if (t < T.walk[0]) return
    const p = prog(t, ...T.walk), e = ease.outCubic(p)
    const px = lerp(-80, WX, e), py = cam.gy
    const step = p < 1 ? Math.abs(Math.sin((t - T.walk[0]) * 11)) : 0
    const hop = p >= 1 ? 30 * bump(t, T.walk[1] + 0.05, 0.4) : 0
    x.save(); x.translate(px, py - step * 10 - hop); x.scale(1.9, 1.9)
    const legA = p < 1 ? Math.sin((t - T.walk[0]) * 11) * 0.5 : 0
    x.beginPath(); x.moveTo(0, -28); x.lineTo(Math.sin(legA) * 18, 0); x.moveTo(0, -28); x.lineTo(-Math.sin(legA) * 18, 0)
    x.moveTo(0, -28); x.lineTo(0, -60); x.moveTo(0, -52); x.lineTo(16 * Math.cos(legA * 0.8 + 0.6), -36 + (hop > 1 ? -30 : 0)); x.moveTo(0, -52); x.lineTo(-16 * Math.cos(-legA * 0.8 + 0.6), -36 + (hop > 1 ? -30 : 0))
    ink(x, BONE, { fa: 0, w: 6, glow: 12 })
    x.beginPath(); x.arc(0, -76, 13, 0, Math.PI * 2); x.fillStyle = BONE; x.shadowColor = GOLD; x.shadowBlur = 12; x.fill()
    x.restore()
    // a heart pops above the walker when they arrive
    const hk = pop01(t, T.walk[1] + 0.05, 0.4)
    if (hk > 0) {
      x.save(); x.translate(WX, py - 235 - 10 * Math.sin(t * 3)); x.scale(hk * 0.8, hk * 0.8)
      x.beginPath(); x.moveTo(0, 40); x.bezierCurveTo(-70, -6, -46, -64, 0, -30); x.bezierCurveTo(46, -64, 70, -6, 0, 40); x.closePath()
      ink(x, '#ff8fb1', { fa: 0.45, w: 7, glow: 22 }); x.restore()
      drawBurst(x, B_STAR, WX, py - 235, t, T.walk[1] + 0.05, '#ff8fb1', 0.7)
    }
    const roofY = cam.gy + (-FLOORS * FH - ROOF * 0.42) * cam.s
    drawBurst(x, B_END, cam.cx, roofY, t, T.ripple, GOLD, 1.0)
    drawBurst(x, B_END, cam.cx, roofY, t, T.ripple + 0.9, '#7fd0f0', 1.0)
    // chimney puffs of pixel stars
    for (let j = 0; j < 4; j++) {
      const q = ((t - T.ripple - j * 0.35) % 1.4 + 1.4) % 1.4 / 1.4
      if (t < T.ripple + j * 0.35) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * q) * 0.9
      drawPixelStar(x, Math.round(cam.cx + 280 * cam.s + 20 * Math.sin(q * 6 + j)), Math.round(cam.gy + (-FLOORS * FH - ROOF - 30) * cam.s - 150 * q), 14, j % 4, j % 2 ? GOLD : '#fff3c0')
      x.restore()
    }
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const cam = camAt(t)
      drawRows(t)
      // the mini building arcs up a little as it flies into place
      const c2 = cam.arc ? { ...cam, gy: cam.gy - 160 * cam.arc } : cam
      drawBuilding(t, c2)
      // room bursts
      for (let i = 0; i < 12; i++) {
        const t0 = ROOM_T(i)
        if (t >= t0 && t < t0 + 0.8) { const p = roomScreen(i, cam); drawBurst(x, B_ROOM[i], p.x, p.y, t, t0, ROOMS[i].col, 0.7) }
        const ts = SETTLE_T(i)
        if (t >= ts && t < ts + 0.6) { const r = roomBox(i), sx = cam.cx + (r.x + r.w - 40) * cam.s, sy = cam.gy + (r.y + 40) * cam.s; drawBurst(x, B_SET[i], sx, sy, t, ts, SIGNS[(RISING + i) % 12].color, 0.55) }
      }
      drawClock(t)
      drawEnd(t, cam)

      // type
      H0.update(t, outK(t, T.headOut))
      ROWTXT.forEach(r => r.update(t, outK(t, T.rowsOut)))
      for (let i = 0; i < 12; i++) {
        const a = ROOM_T(i), b = i < 11 ? ROOM_T(i + 1) - 0.12 : ROOM_END - 0.15
        const o = outK(t, [b, b + 0.12])
        LABELS[i].update(t, t < b + 0.12 ? o : 0)
        const p = ease.outCubic(prog(t, a - 0.02, a + 0.25))
        EYES[i].style.opacity = String(t < b + 0.12 ? p * o : 0); EYES[i].style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      P1.update(t, outK(t, T.punchOut))
      HEND.update(t, 1)

      const fadeIn = 1 - ease.inOutQuad(prog(t, 0, 0.4))
      const fadeOut = t >= DURATION - 0.035 ? 1 : ease.inOutQuad(prog(t, ...T.fade))
      black.style.opacity = String(Math.max(fadeIn, fadeOut))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]

// ── cues
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const MEL = [0, 2, 4, 3, 1, 3, 5, 4, 2, 4, 6, 5]
const PLUCK = [293.66, 369.99, 440, 369.99, 329.63, 440, 493.88, 440, 369.99, 493.88, 587.33, 554.37]
const r3 = v => +v.toFixed(3)
export const CUES = [
  ...wordPops(T.head0, 3, 0.07, 0),
  ...T.floors.map((f, i) => ['pop', r3(f + 0.05), [587.33, 659.25, 739.99, 880][i], 0.04, (i % 2 ? 0.2 : -0.2)]),
  ['whoosh', r3(T.roof - 0.3), 0.3, 0.03], ['boom', T.roof, 0.05], ['pluck', T.roof, 293.66, 0.05, 0.6, 0], ['glitter', T.roof, r3(T.roof + 0.5)],
  ['pop', BEAT(1), 1174.66, 0.055, 0], ['pluck', BEAT(1), 1174.66, 0.04, 0.5, 0],
  ...Array.from({ length: 12 }, (_, i) => ['pop', r3(T.flash + i * T.flashGap), NOTE[i % 7] * (i > 6 ? 1 : 1), 0.022, (i % 3 - 1) * 0.3]),
  ['whoosh', T.bldOut, 0.35, 0.03],
  ...T.rows.flatMap((tr, i) => [['pop', r3(tr), [740, 880, 1108.73][i], 0.06, -0.25], ['pluck', r3(tr), [293.66, 369.99, 440][i], 0.04, 0.5, 0], ...wordPops(tr + 0.08, 4, 0.08, i + 1, 0.022)]),
  ['whoosh', T.grow[0], 0.6, 0.04], ['pop', T.grow[1], 587.33, 0.05, 0],
  ...ROOMS.flatMap((_, i) => {
    const t0 = r3(ROOM_T(i))
    return [['pluck', t0, PLUCK[i], 0.05, 0.7, (i % 3 - 1) * 0.35], ['pop', t0, NOTE[MEL[i]], 0.06, (i % 3 - 1) * 0.35], ['tick', r3(t0 + 0.04), 0.03], ['pop', r3(t0 + 0.12), NOTE[(MEL[i] + 2) % 7], 0.025, 0]]
  }),
  ['glitter', r3(ROOM_T(11)), r3(ROOM_T(11) + 0.8)],
  ['whoosh', T.pullback[0], 0.5, 0.035],
  ['pop', T.clock, 880, 0.06, 0], ['riser', T.spin[0], T.spin[1], 0.022],
  ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.spin[0] + i * 0.13), 0.025]),
  ['bell', T.spin[1], 1174.66, 0.03, 1.4, 0],
  ...ROOMS.map((_, i) => ['pop', r3(SETTLE_T(i)), NOTE[(i + 2) % 7], 0.022, (i % 3 - 1) * 0.3]),
  ...wordPops(T.punch, 10, 0.055, 0, 0.02),
  ['whoosh', T.punchOut[0], 0.5, 0.035],
  ...wordPops(T.endHead, 1, 0.07, 3, 0.04),
  ['pop', T.home, 1318.51, 0.07, 0], ['bell', T.home, 587.33, 0.035, 2.2, 0], ['pluck', T.home, 293.66, 0.05, 0.9, 0],
  ...Array.from({ length: 4 }, (_, i) => ['tick', r3(T.walk[0] + 0.14 + i * 0.285), 0.025]),
  ['pop', r3(T.walk[1] + 0.05), 1174.66, 0.05, -0.3],
  ['glitter', T.ripple, r3(T.ripple + 1.6)], ['bell', T.ripple, 1174.66, 0.025, 1.8, 0.2], ['boom', T.ripple, 0.04],
  ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['pop', r3(T.ripple + 0.12 * i), f, 0.03, (i - 1.5) * 0.2]),
  ['bell', 29.2, 293.66, 0.03, 2.4, 0],
]
