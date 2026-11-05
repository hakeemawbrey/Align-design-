// sunkit — the episode engine for PLANET TALK: THE SUN (batch p01, kpsue01–kpsue12). Built on planetkit.js and
// hookkit.js (both read-only). Each film is a script (data) + a few props:
//   import { episode, drawPhone, drawPanel, drawSpot, drawStamp, key, step } from '../../kpsue01/sunkit.js'
//   const E = episode({ id, sign, duration, ending: 'cut' | 'loop', entrance: { kind, at, x, y, size }, horizon,
//                       hook: { text, top }, sun: { pos: [[t, { x, y, size }]…], mood: [[t, m]…], shades: [[t, b]…] },
//                       me: { pos, mood, look, tears, size }, bubbles: [{ t0, t1, who, text, x?, y?, tail?, tailUp? }…],
//                       pisces: { at, x, y, size, tears: [[t, n]…], mood }, back(x, t), front(x, t), fx: [scenes],
//                       fxCues: [], cues: [], rec: [hookkit recordScratch opts], tint })
//   export const { DURATION, SCENES, CUES } = E
// Pure f(t). Nothing touches `document` at module top level.
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H } from '../wheel.js'
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { slamTitle, slamTitleCues, frozen, loopBack, loopCues, recordScratch, recordScratchCues } from '../hookkit.js'
import { drawPlanet, drawSign, drawSpace, speech, speechCues, entrance, drawEntranceFx, entranceCues, entranceLand, aboveHorizon, colorOf } from '../planetkit.js'

export const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2

/** step track: the last value whose time ≤ t */
export function step(t, track, dflt) {
  if (!track || !track.length) return dflt
  let v = dflt
  for (const [tt, val] of track) if (t >= tt) v = val
  return v
}
/** keyed numeric track with easing: [[t, v, ease?]…] */
export function key(t, keys) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) { const [t0, v0] = keys[i - 1], [t1, v1, e] = keys[i]; const p = (t - t0) / (t1 - t0 || 1); return lerp(v0, v1, (e || ease.inOutCubic)(p)) }
  }
  return keys[keys.length - 1][1]
}
/** pose track [[t, { x, y, size }]…] → eased pose */
function poseAt(t, track, base) {
  if (!track || !track.length) return base
  const f = k => key(t, [[-1e9, base[k]], ...track.map(([tt, p, e]) => [tt, p[k] ?? base[k], e])])
  return { x: f('x'), y: f('y'), size: f('size') }
}
const pop01 = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); if (p <= 0) return 0; const c = 2.4; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2) }

// ─────────────────────────────────────────────── props
export function rr(x, X, Y, w, h, r) { x.beginPath(); x.roundRect(X, Y, w, h, r) }
/** a phone with a chat: msgs [{ at, side: 'L'|'R', text, until? }], typing [t0, t1] */
export function drawPhone(x, t, { x: cx = 540, y: cy = 1000, s = 1, rot = 0, pop = 1, title = 'them', msgs = [], typing = null, draft = null } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s * pop, s * pop)
  const W = 420, H = 760
  x.shadowColor = 'rgba(4,2,14,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 18
  x.fillStyle = INK; rr(x, -W / 2 - 14, -H / 2 - 14, W + 28, H + 28, 64); x.fill()
  x.shadowBlur = 0; x.shadowOffsetY = 0
  x.fillStyle = '#16102e'; rr(x, -W / 2, -H / 2, W, H, 52); x.fill()
  x.fillStyle = '#231a48'; x.fillRect(-W / 2, -H / 2 + 50, W, 74)
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -H / 2 + 88)
  x.fillStyle = '#0c0820'; rr(x, -60, -H / 2 + 14, 120, 26, 13); x.fill()
  const vis = msgs.filter(m => t >= m.at && (m.until === undefined || t < m.until))
  let y = H / 2 - 120
  const rows = []
  for (const m of vis.slice().reverse()) {
    x.font = `700 27px ${INTER}`
    const words = m.text.split(' '), lines = [''];
    for (const w of words) { const tr = (lines[lines.length - 1] + ' ' + w).trim(); if (x.measureText(tr).width > 270 && lines[lines.length - 1]) lines.push(w); else lines[lines.length - 1] = tr }
    const bh = lines.length * 34 + 26
    y -= bh + 12
    if (y < -H / 2 + 130) break
    rows.push({ m, lines, y, bh })
  }
  for (const { m, lines, y: yy, bh } of rows) {
    const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 36
    const k = pop01(t, m.at, 0.25)
    const bx = m.side === 'R' ? W / 2 - 22 - bw : -W / 2 + 22
    x.save(); x.translate(bx + bw / 2, yy + bh / 2); x.scale(k, k)
    x.fillStyle = m.side === 'R' ? (m.color || '#ffb431') : '#efe6ff'; rr(x, -bw / 2, -bh / 2, bw, bh, 22); x.fill()
    x.fillStyle = INK; x.textAlign = 'left'
    lines.forEach((l, i) => x.fillText(l, -bw / 2 + 18, -bh / 2 + 30 + i * 34))
    x.restore()
  }
  if (typing && t >= typing[0] && t < typing[1]) {
    x.fillStyle = '#efe6ff'; rr(x, -W / 2 + 22, H / 2 - 112, 110, 56, 24); x.fill()
    for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.globalAlpha = 0.35 + 0.65 * Math.max(0, Math.sin(t * 8 - i)); x.beginPath(); x.arc(-W / 2 + 55 + i * 22, H / 2 - 84, 7, 0, TAU); x.fill() }
    x.globalAlpha = 1
  }
  // draft field
  x.fillStyle = '#231a48'; rr(x, -W / 2 + 18, H / 2 - 52, W - 36, 40, 20); x.fill()
  if (draft) { const d = typeof draft === 'function' ? draft(t) : draft; if (d) { x.fillStyle = BONE; x.font = `700 22px ${INTER}`; x.textAlign = 'left'; x.fillText(d.length > 30 ? '…' + d.slice(-29) : d, -W / 2 + 36, H / 2 - 31) } }
  x.restore()
}
/** a board / list / spreadsheet: rows [{ at, text, strike?, color?, check? }] */
export function drawPanel(x, t, { x: cx = 540, y: cy = 1000, w = 620, h = 520, rot = -0.02, pop = 1, title = 'THE PLAN', rows = [], color = GOLD, paper = '#fff8ea', size = 36, lineH = 58 } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(pop, pop)
  x.shadowColor = 'rgba(4,2,14,0.5)'; x.shadowBlur = 30; x.shadowOffsetY = 12
  x.fillStyle = INK; rr(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 26); x.fill()
  x.shadowBlur = 0; x.shadowOffsetY = 0
  x.fillStyle = paper; rr(x, -w / 2, -h / 2, w, h, 20); x.fill()
  x.fillStyle = color; rr(x, -w / 2, -h / 2, w, 78, [20, 20, 0, 0]); x.fill()
  x.fillStyle = INK; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 41)
  let y = -h / 2 + 78 + lineH * 0.75
  for (const r of rows) {
    if (t < r.at) continue
    const k = pop01(t, r.at, 0.22)
    x.save(); x.translate(-w / 2 + 34, y); x.scale(k, k)
    x.font = r.serif ? `italic 600 ${Math.round(size * 1.15)}px ${SERIF}` : `800 ${size}px ${INTER}`
    x.fillStyle = r.color || INK; x.textAlign = 'left'; x.fillText(r.text, 0, 0)
    if (r.strike !== undefined && t >= r.strike) {
      const p = clamp((t - r.strike) / 0.25), tw = x.measureText(r.text).width
      x.strokeStyle = '#ff3b3b'; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); x.moveTo(-6, 2); x.lineTo(-6 + (tw + 12) * p, -2); x.stroke()
    }
    x.restore()
    y += lineH
  }
  x.restore()
}
/** a theatre spotlight cone from (sx, sy) to (tx, ty) */
export function drawSpot(x, { sx = 540, sy = -40, tx = 540, ty = 1400, w = 260, a = 1, color = '#fff3c4' } = {}) {
  if (a <= 0.01) return
  const ang = Math.atan2(ty - sy, tx - sx), L = Math.hypot(tx - sx, ty - sy)
  x.save(); x.translate(sx, sy); x.rotate(ang - Math.PI / 2)
  const g = x.createLinearGradient(0, 0, 0, L)
  g.addColorStop(0, `rgba(255,243,196,${0.05 * a})`); g.addColorStop(1, `rgba(255,243,196,${0.32 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(-30, 0); x.lineTo(30, 0); x.lineTo(w, L); x.lineTo(-w, L); x.closePath(); x.fill()
  x.restore()
  x.save(); x.globalAlpha = 0.5 * a; x.fillStyle = color; x.beginPath(); x.ellipse(tx, ty + 40, w, w * 0.18, 0, 0, TAU); x.fill(); x.restore()
}
/** a slammed stamp: big rotated text in a box */
export function drawStamp(x, t, { at, text, x: cx = 540, y: cy = 960, rot = -0.12, color = '#ff3b3b', size = 84, out = null } = {}) {
  if (t < at) return
  const p = prog(t, at, at + 0.14), s = lerp(2.2, 1, ease.inCubic(p))
  const a = out ? 1 - prog(t, out[0], out[1]) : 1
  if (a <= 0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.globalAlpha = clamp(p * 3) * a
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(text).width + 60
  x.strokeStyle = color; x.lineWidth = 10; rr(x, -w / 2, -size * 0.75, w, size * 1.5, 18); x.stroke()
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}
/** small floating hearts / sparkles burst */
export function hearts(x, t, { at, cx = 540, cy = 1000, n = 8, R = 220, color = '#ff5c8e' } = {}) {
  const tt = t - at; if (tt < 0 || tt > 1.2) return
  const p = ease.outCubic(tt / 1.2)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 1.2)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + 0.4, r = R * p * (0.7 + 0.3 * ((i * 37) % 7) / 7)
    const hx = cx + Math.cos(a) * r, hy = cy + Math.sin(a) * r - 80 * p, s = 26
    x.fillStyle = color; x.strokeStyle = INK; x.lineWidth = 4
    x.beginPath(); x.moveTo(hx, hy + s * 0.85); x.bezierCurveTo(hx - s * 1.25, hy + s * 0.05, hx - s * 0.7, hy - s * 0.95, hx, hy - s * 0.32); x.bezierCurveTo(hx + s * 0.7, hy - s * 0.95, hx + s * 1.25, hy + s * 0.05, hx, hy + s * 0.85); x.fill(); x.stroke()
  }
  x.restore()
}

// ─────────────────────────────────────────────── the episode
export function episode(cfg) {
  const {
    sign, duration, ending = 'cut', entrance: IN0, horizon = null, hook, sun = {}, me = {}, bubbles = [], pisces = null,
    back = null, front = null, mid = null, fx = [], fxCues = [], cues = [], rec = [], tint = null, sunOpts = {},
  } = cfg
  const IN = { at: 0, x: 540, y: 640, size: 560, kind: 'crash', ...IN0 }
  const land = entranceLand(IN.kind, IN)
  const sunBase = { x: IN.x, y: IN.y, size: IN.size }
  const meBase = { x: 540, y: 1420, size: 300, ...(me.base || {}) }
  const HOOK = { at: -1, top: 960, size: 108, out: hook.out || [2.6, 2.85], ...hook }
  // default bubble places
  const BUB = bubbles.map(b => {
    const isSun = b.who === 'sun'
    const d = isSun ? { x: 540, y: 1090, tail: 0, tailUp: true } : b.who === 'pisces' && sign !== 'pisces' ? { x: 560, y: 1650, tail: 300, tailUp: false } : { x: 540, y: 1760, tail: 0, tailUp: true }
    return { size: 50, maxW: 860, ...d, ...b }
  })
  const sunLines = BUB.filter(b => b.who === 'sun').map(b => ({ t: b.t0 + 0.08, who: 'sun', text: b.text }))
  const meLines = BUB.filter(b => b.who === sign).map(b => ({ t: b.t0 + 0.08, who: sign, text: b.text }))
  const meHops = [...meLines.map(l => l.t), ...(me.hops || [])]
  const sunHops = [...(sun.hops || [])]

  async function build(stage) {
    const root = fill(stage, { background: '#07041a' })
    try { await Promise.all(['800 60px Inter', "italic 600 60px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const bug = el('div', { position: 'absolute', left: '56px', top: '64px', font: `800 30px ${INTER}`, letterSpacing: '0.22em', fontVariant: 'small-caps', color: GOLD, textShadow: '0 2px 10px rgba(4,2,14,0.8)', whiteSpace: 'nowrap' }, root, 'planet talk · the sun')
    void bug
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: 0, end: duration + 1, root,
      update(t) {
        x.clearRect(0, 0, 1080, 1920)
        drawSpace(x, t, { planet: 'sun', tint: typeof tint === 'function' ? tint(t) : tint, horizon: horizon ? { y: horizon } : null, seed: 3 })
        if (back) back(x, t)
        // the Sun
        let P
        if (t < land) P = entrance(IN.kind, t, IN)
        else { const q = poseAt(t, sun.pos, sunBase); P = { ...q, rot: 0, squash: 0, alpha: 1 }; const E = entrance(IN.kind, t, IN); P.rot = E.rot; P.squash = E.squash }
        const drawSun = () => {
          drawEntranceFx(x, 'sun', IN.kind, t, IN)
          drawPlanet(x, 'sun', P.x, P.y, P.size, t, {
            rot: P.rot + (sun.rot ? key(t, sun.rot) : 0), squash: P.squash, alpha: P.alpha,
            mood: step(t, sun.mood, 'happy'), shades: step(t, sun.shades, false), look: step(t, sun.look, undefined),
            lines: sunLines, cps: 32, hops: sunHops, tears: step(t, sun.tears, 0), ...sunOpts,
          })
        }
        if (horizon) aboveHorizon(x, horizon, drawSun); else drawSun()
        if (mid) mid(x, t, P)
        // the sign
        if (!me.hidden || !me.hidden(t)) {
          const M = poseAt(t, me.pos, meBase)
          drawSign(x, sign, M.x, M.y, M.size, t, {
            mood: step(t, me.mood, 'neutral'), look: step(t, me.look, [0, -1]), tears: step(t, me.tears, 0), hops: meHops,
            squash: me.squash ? key(t, me.squash) : 0, shadow: true, sweat: step(t, me.sweat, false), seed: 4,
          })
        }
        // Pisces cameo (cries in every film)
        if (pisces && sign !== 'pisces' && t >= pisces.at) {
          const pk = pop01(t, pisces.at, 0.35) * (pisces.out ? 1 - prog(t, pisces.out[0], pisces.out[1]) : 1)
          if (pk > 0.01) {
            drawSign(x, 'pisces', pisces.x ?? 930, pisces.y ?? 1760, pisces.size ?? 170, t, { mood: step(t, pisces.mood, 'sparkle'), look: [-1, -1], tears: step(t, pisces.tears, 2), pop: pk, seed: 9, hops: pisces.hops || [] })
          }
        }
        if (front) front(x, t, P)
        for (const b of BUB) speech(x, t, b)
        drawGrain(gx, t)
      },
    }
  }
  const HOOK_SC = slamTitle(HOOK)
  const SCENES = [rec.length ? frozen(build, rec) : build, ...fx, ...rec.map(r => recordScratch(r)), HOOK_SC]
  if (ending === 'loop') SCENES.push(loopBack([build, slamTitle(HOOK)], { duration }))
  const CUES = [
    ...entranceCues(IN.kind, IN), ...slamTitleCues(HOOK), ...speechCues(BUB), ...fxCues, ...rec.flatMap(r => recordScratchCues(r)), ...cues,
    ...(pisces && sign !== 'pisces' ? [['pluck', +(pisces.at + 0.05).toFixed(2), 783.99, 0.04, 0.5, 0.4], ['pluck', +(pisces.at + 0.25).toFixed(2), 659.25, 0.04, 0.6, 0.4]] : []),
    ...(ending === 'loop' ? loopCues({ duration }) : []),
  ]
  return { DURATION: duration, SCENES, CUES, HOOK, IN, land }
}
