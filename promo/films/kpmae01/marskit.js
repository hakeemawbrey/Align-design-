// marskit — the PLANET TALK: MARS look (batch p05, kpmae01–kpmae12). Built on planetkit.js + hookkit.js (read-only).
// Read-only for every other batch.
//
//   import { makeEpisode, drawMars, pisces, dust, phone, talkCard, panel, txt, flash, sobCues, P, ... } from '../../kpmae01/marskit.js'
//
// makeEpisode({ id, duration, end: 'cut' | 'loop', hook, inKind, inAt, bubbles, draw, over, overlays, cues, last })
//   → { DURATION, SCENES, CUES }
//   hook       hookkit slamTitle opts for the frame-0 call-out (at: -1 → on screen at frame 0). Always in the loop copy.
//   bubbles    planetkit speech() opts [{ t0, t1, x, y, who, text, tail, tailUp, size, maxW }]. Drawn over draw().
//              Mars's mouth flaps with his own bubbles (drawMars reads them through K.mars).
//   draw(x, t, K)   paint the whole picture (backdrop, Mars, the sign, props). K = { t, mars(X, Y, size, opts), lines }.
//   over(x, t, K)   painted after the bubbles (flashes, stamps on top of everything).
//   overlays   extra hookkit scenes [builder…] (whip zoom, shake, chapter stickers…); their cues go in `cues`.
//   last       { text, at, top, size } → the punchline slam (hookkit slamTitle, stays to the end).
//   freeze     hookkit recordScratch opts [REC…]: the picture (draw + bubbles) holds during each freeze window.
//   end        'cut' = hard cut on the punchline; 'loop' = hookkit loopBack into the frame-0 composition.
// The series bug "PLANET TALK: MARS" sits top-left the whole film. No end card, no card cut, no logo.
//
// Mars here = planetkit's Mars + his two tiny moons, Phobos and Deimos (Mars really has two small moons), orbiting his
// head like nervous pets. drawMars(x, t, X, Y, size, { moons, panic, ...drawPlanet opts }).
import { clamp, lerp, prog, ease } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { slamTitle, slamTitleCues, loopBack, loopCues, drawRich, freezeTime } from '../hookkit.js'
import { drawPlanet, drawSign, drawSpace, speech, speechCues, entrance, drawEntranceFx, entranceCues, planetSize, colorOf } from '../planetkit.js'

export { drawPlanet, drawSign, drawSpace, speech, entrance, drawEntranceFx, entranceCues, planetSize, colorOf, clamp, lerp, prog, ease, easeOutBack }
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#e5573b', RUST = '#a52a2a', CREAM = '#fffaf0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
export const pop01 = (t, t0, d = 0.3, s = 2.2) => (t < t0 ? 0 : easeOutBack(prog(t, t0, t0 + d), s))
export const outK = (t, out) => (out ? 1 - ease.inQuad(prog(t, out[0], out[1])) : 1)
export const win = (t, a, b, d = 0.25) => clamp(Math.min(pop01(t, a, d), outK(t, [b, b + 0.2])))
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

// ─────────────────────────────────────────────── Mars + his two moons
function moon(x, X, Y, r, t, k, panic) {
  x.save(); x.translate(X, Y); x.rotate(0.4 * Math.sin(t * 2 + k))
  x.fillStyle = k ? '#b9aca4' : '#9d8f88'; x.strokeStyle = INK; x.lineWidth = Math.max(2, r * 0.16)
  x.beginPath(); x.ellipse(0, 0, r * (k ? 1 : 1.25), r * (k ? 0.85 : 0.8), 0, 0, TAU); x.fill(); x.stroke()
  x.fillStyle = 'rgba(80,60,60,0.35)'; x.beginPath(); x.arc(r * 0.35, r * 0.25, r * 0.2, 0, TAU); x.fill()
  x.fillStyle = INK
  const e = r * (panic ? 0.2 : 0.14)
  for (const s of [-1, 1]) { x.beginPath(); x.arc(s * r * 0.32, -r * 0.1, e, 0, TAU); x.fill() }
  if (panic) { x.beginPath(); x.ellipse(0, r * 0.32, r * 0.14, r * 0.18, 0, 0, TAU); x.fill() }
  x.restore()
}
/** Mars (planetkit) with Phobos + Deimos orbiting. Returns drawPlanet's result. */
export function drawMars(x, t, X, Y, size, o = {}) {
  const { moons = true, panic = false, alpha = 1, pop = 1, ...rest } = o
  const sp = panic ? 3.2 : 1.3
  const orb = k => {
    const a = t * sp * (k ? 1.25 : 1) + k * 2.6
    const R = size * (k ? 0.7 : 0.62) * pop
    return { a, x: X + Math.cos(a) * R, y: Y - size * 0.42 + Math.sin(a) * R * 0.16, front: Math.sin(a) > 0, r: size * (k ? 0.06 : 0.075) * pop }
  }
  const M = moons && alpha > 0 && pop > 0 ? [orb(0), orb(1)] : []
  x.save(); x.globalAlpha *= alpha
  for (const m of M) if (!m.front) moon(x, m.x, m.y, m.r, t, M.indexOf(m), panic)
  x.restore()
  const res = drawPlanet(x, 'mars', X, Y, size, t, { alpha, pop, ...rest })
  x.save(); x.globalAlpha *= alpha
  for (const m of M) if (m.front) moon(x, m.x, m.y, m.r, t, M.indexOf(m), panic)
  x.restore()
  return res
}
/** ♓ Pisces (tears 3 by default: Pisces cries in every film) */
export function pisces(x, t, X, Y, size, o = {}) { return drawSign(x, 'pisces', X, Y, size, t, { mood: 'sparkle', tears: 3, seed: 12, ...o }) }

// ─────────────────────────────────────────────── red dust (Mars is red because of rusty iron-oxide dust)
export function dust(x, t, t0, cx, cy, { n = 26, R = 420, life = 1.4, col = '#e5573b', size = 34, up = 0.3, seed = 1 } = {}) {
  const d = t - t0
  if (d < 0 || d > life) return
  const p = d / life
  x.save()
  for (let i = 0; i < n; i++) {
    const a = fr(i, seed) * TAU, sp = 0.4 + 0.6 * fr(i, seed + 1)
    const k = 1 - Math.pow(1 - p, 2.4)
    const px = cx + Math.cos(a) * R * sp * k, py = cy + Math.sin(a) * R * sp * k * 0.55 - up * R * k * fr(i, seed + 2)
    const s = size * (0.5 + fr(i, seed + 3)) * (0.6 + p)
    x.globalAlpha = (1 - p) * 0.75
    x.fillStyle = i % 3 ? col : '#c9765a'
    x.beginPath(); x.arc(px, py, s, 0, TAU); x.fill()
  }
  x.restore()
}
export function flash(x, t, at, { col = '#ffffff', d = 0.18, a = 0.85 } = {}) {
  const k = t < at ? 0 : 1 - prog(t, at, at + d)
  if (k <= 0) return
  x.save(); x.globalAlpha = a * k; x.fillStyle = col; x.fillRect(0, 0, 1080, 1920); x.restore()
}

// ─────────────────────────────────────────────── text + props
export function txt(x, s, cx, y, { size = 44, color = BONE, accentColor = GOLD, weight = 800, align = 'center', maxW = 960, alpha = 1, shadow = true, font } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  if (font) {
    x.font = `${weight} ${size}px ${font}`; x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'
    if (shadow) { x.shadowColor = 'rgba(6,4,18,0.6)'; x.shadowBlur = 10 }
    x.fillText(s, cx, y)
  } else drawRich(x, s, cx, y, { size, color, accentColor, weight, maxW, shadow, align })
  x.restore()
}
export function rr(x, X, Y, w, h, r) { x.beginPath(); x.roundRect(X, Y, w, h, r) }
/** a chunky panel (ink outline + drop shadow) */
export function panel(x, cx, cy, w, h, { fill = CREAM, line = INK, r = 28, rot = 0, k = 1, lw = 8 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.save(); x.shadowColor = 'rgba(6,4,18,0.5)'; x.shadowBlur = 26; x.shadowOffsetY = 12
  x.fillStyle = line; rr(x, -w / 2 - lw, -h / 2 - lw, w + 2 * lw, h + 2 * lw, r + lw); x.fill(); x.restore()
  x.fillStyle = fill; rr(x, -w / 2, -h / 2, w, h, r); x.fill()
  return true   // caller must x.restore()
}
/** the talk card prop (a real app feature, shown as an object: no brand) */
export function talkCard(x, t, { at, out = null, cx = 540, cy = 900, w = 560, text, rot = -0.05, label = 'TALK CARD' }) {
  const k = pop01(t, at, 0.35, 1.8) * outK(t, out)
  if (k <= 0.01) return
  const h = w * 1.25
  x.save(); x.translate(cx, cy); x.rotate(rot + (1 - k) * 0.5); x.scale(k, k)
  x.save(); x.shadowColor = 'rgba(6,4,18,0.55)'; x.shadowBlur = 30; x.shadowOffsetY = 16
  x.fillStyle = GOLD; rr(x, -w / 2 - 10, -h / 2 - 10, w + 20, h + 20, 34); x.fill(); x.restore()
  x.fillStyle = '#1b1236'; rr(x, -w / 2, -h / 2, w, h, 26); x.fill()
  x.strokeStyle = 'rgba(242,199,92,0.6)'; x.lineWidth = 3; rr(x, -w / 2 + 22, -h / 2 + 22, w - 44, h - 44, 18); x.stroke()
  x.fillStyle = GOLD; x.font = `700 ${Math.round(w * 0.05)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(label, 0, -h / 2 + 70)
  for (const s of [-1, 1]) { x.save(); x.translate(s * w * 0.3, -h / 2 + 70); x.rotate(Math.PI / 4); x.fillRect(-7, -7, 14, 14); x.restore() }
  drawRich(x, text, 0, -h * 0.12, { size: Math.round(w * 0.085), color: BONE, accentColor: GOLD, maxW: w - 90, shadow: false })
  x.restore()
}
/** a phone with a chat. msgs [{ at, side: 'R' | 'L', text }], typing [a, b] = the dots on the left */
export function phone(x, t, { cx = 540, cy = 900, w = 620, h = 900, title = 'chat', msgs = [], typing = null, k = 1, rot = 0, size = 38, scroll = 0 }) {
  if (k <= 0.01) return []
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.save(); x.shadowColor = 'rgba(6,4,18,0.6)'; x.shadowBlur = 40; x.shadowOffsetY = 18
  x.fillStyle = '#0c0820'; rr(x, -w / 2 - 18, -h / 2 - 18, w + 36, h + 36, 70); x.fill(); x.restore()
  x.fillStyle = '#f4efe6'; rr(x, -w / 2, -h / 2, w, h, 54); x.fill()
  x.fillStyle = '#e8dfd2'; rr(x, -w / 2, -h / 2, w, 110, 54); x.fill(); x.fillRect(-w / 2, -h / 2 + 60, w, 50)
  x.fillStyle = '#0c0820'; rr(x, -60, -h / 2 + 12, 120, 22, 11); x.fill()
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 76)
  x.save(); rr(x, -w / 2, -h / 2 + 110, w, h - 110, 0); x.clip()
  let y = -h / 2 + 150 - scroll
  const out = []
  for (const m of msgs) {
    if (t < m.at) continue
    const pk = pop01(t, m.at, 0.25, 2.2)
    x.font = `700 ${size}px ${INTER}`
    const lines = wrap(x, m.text, w * 0.62)
    const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 50, bh = lines.length * size * 1.2 + 34
    const R = m.side === 'R'
    const bx = R ? w / 2 - 30 - bw : -w / 2 + 30
    x.save(); x.translate(bx + (R ? bw : 0), y); x.scale(pk, pk); x.translate(-(R ? bw : 0), 0)
    x.fillStyle = m.col || (R ? '#e5573b' : '#ffffff'); rr(x, 0, 0, bw, bh, 28); x.fill()
    if (!R) { x.strokeStyle = '#d8cfc2'; x.lineWidth = 3; x.stroke() }
    x.fillStyle = R ? '#fff' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    lines.forEach((l, i) => x.fillText(l, 25, 17 + size * 0.6 + i * size * 1.2))
    x.restore()
    out.push({ x: cx + bx + bw / 2, y: cy + y + bh / 2, w: bw, h: bh })
    y += bh + 22
  }
  if (typing && t > typing[0] && t < typing[1]) {
    x.fillStyle = '#ffffff'; rr(x, -w / 2 + 30, y, 130, 64, 28); x.fill()
    for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.globalAlpha = 0.35 + 0.65 * Math.max(0, Math.sin(t * 9 - i)); x.beginPath(); x.arc(-w / 2 + 65 + i * 30, y + 32, 9, 0, TAU); x.fill() }
    x.globalAlpha = 1
  }
  x.restore(); x.restore()
  return out
}
export function wrap(x, s, maxW) {
  const words = s.split(' '), lines = ['']
  for (const w of words) { const tr = lines[lines.length - 1] ? lines[lines.length - 1] + ' ' + w : w; if (x.measureText(tr).width > maxW && lines[lines.length - 1]) lines.push(w); else lines[lines.length - 1] = tr }
  return lines
}
/** a stamp that slams on (e.g. 'SENT', 'YES') */
export function stamp(x, t, at, text, cx, cy, { col = '#e5573b', size = 110, rot = -0.14 } = {}) {
  if (t < at) return
  const p = prog(t, at, at + 0.16), s = lerp(2.2, 1, ease.inCubic(p))
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.globalAlpha = clamp(p * 2)
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const w = x.measureText(text).width + 60
  x.strokeStyle = col; x.lineWidth = 12; rr(x, -w / 2, -size * 0.7, w, size * 1.4, 18); x.stroke()
  x.fillStyle = col; x.fillText(text, 0, 4)
  x.restore()
}
/** speed lines from the edges toward (cx, cy) */
export function speedLines(x, t, cx, cy, k, { n = 26, col = 'rgba(255,240,220,0.55)', seed = 3 } = {}) {
  if (k <= 0.01) return
  x.save(); x.strokeStyle = col; x.lineCap = 'round'
  for (let i = 0; i < n; i++) {
    const a = fr(i, seed) * TAU + t * 0.3, r0 = 620 + 400 * fr(i, seed + 1), len = (180 + 260 * fr(i, seed + 2)) * k
    x.lineWidth = 4 + 8 * fr(i, seed + 3); x.globalAlpha = k * (0.4 + 0.6 * Math.abs(Math.sin(t * 20 + i)))
    x.beginPath(); x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); x.lineTo(cx + Math.cos(a) * (r0 - len), cy + Math.sin(a) * (r0 - len)); x.stroke()
  }
  x.restore()
}
export function hearts(x, t, t0, cx, cy, { n = 10, R = 260, col = '#ff5c8e', life = 1.6, seed = 5 } = {}) {
  const d = t - t0; if (d < 0 || d > life) return
  const p = d / life
  x.save()
  for (let i = 0; i < n; i++) {
    const a = fr(i, seed) * TAU, r = R * (0.4 + 0.6 * fr(i, seed + 1)) * ease.outCubic(p)
    const hx = cx + Math.cos(a) * r, hy = cy + Math.sin(a) * r * 0.7 - 120 * p, s = 18 + 16 * fr(i, seed + 2)
    x.globalAlpha = 1 - p; x.fillStyle = i % 3 ? col : GOLD
    x.beginPath(); x.moveTo(hx, hy + s * 0.9); x.bezierCurveTo(hx - s * 1.6, hy - s * 0.2, hx - s * 0.5, hy - s * 1.3, hx, hy - s * 0.4); x.bezierCurveTo(hx + s * 0.5, hy - s * 1.3, hx + s * 1.6, hy - s * 0.2, hx, hy + s * 0.9); x.fill()
  }
  x.restore()
}

// ─────────────────────────────────────────────── sound helpers
export const sobCues = (t0, n = 3, gap = 0.32) => Array.from({ length: n }, (_, i) => ['pluck', +(t0 + i * gap).toFixed(3), [987.77, 880, 739.99, 659.25][i % 4], 0.03, 0.5, 0.35])
export const popCue = (t, hz = 880, g = 0.04, pan = 0) => ['pop', +t.toFixed(3), hz, g, pan]
export const thud = t => [['tom', +t.toFixed(3), 70, { gain: 0.28, decay: 0.25 }], ['boom', +t.toFixed(3), 0.14]]

// ─────────────────────────────────────────────── the series bug
function bug() {
  return async stage => {
    const root = fill(stage, { pointerEvents: 'none' }); root.dataset.hookcam = 'off'
    const cv = layerCanvas(root), x = cv.getContext('2d')
    let done = false
    return {
      start: -1, end: 1e9, root,
      update() {
        if (done) return
        x.save(); x.font = `800 30px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'
        if ('letterSpacing' in x) x.letterSpacing = '6px'
        const s = 'PLANET TALK: MARS'
        x.shadowColor = 'rgba(6,4,18,0.7)'; x.shadowBlur = 10
        x.fillStyle = RED; x.beginPath(); x.arc(62, 74, 11, 0, TAU); x.fill()
        x.fillStyle = BONE; x.fillText(s, 86, 75)
        x.restore(); done = true
      },
    }
  }
}

// ─────────────────────────────────────────────── the episode engine
export function makeEpisode(cfg) {
  const { id, duration: D, end = 'cut', hook, bubbles = [], draw, over, overlays = [], cues = [], last = null, freeze = [] } = cfg
  const LINES = bubbles.map(b => ({ t: b.t0 + 0.08, who: b.who, text: b.text }))
  async function build(stage) {
    const root = fill(stage, { background: '#07041a' })
    try { await Promise.all(['800 60px Inter', '700 40px Inter', "italic 600 60px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: 0, end: D + 1, root,
      update(t0) {
        const t = freeze.length ? freezeTime(t0, freeze) : t0
        x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.clearRect(0, 0, 1080, 1920)
        const K = { t, lines: LINES, mars: (X, Y, size, o = {}) => drawMars(x, t, X, Y, size, { lines: LINES, cps: 32, ...o }) }
        draw(x, t, K)
        for (const b of bubbles) speech(x, t, { cps: 32, size: 46, maxW: 700, ...b })
        if (over) over(x, t, K)
        drawGrain(gx, t)
      },
    }
  }
  const HOOK = { top: 230, size: 104, ...hook }
  const LAST = last ? { top: 1640, size: 96, gap: 0.08, ...last } : null
  const SCENES = [build, slamTitle(HOOK), ...overlays]
  if (LAST) SCENES.push(slamTitle(LAST))
  if (end === 'loop') SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: D }))
  SCENES.push(bug())
  const CUES = [...slamTitleCues(HOOK), ...speechCues(bubbles), ...cues]
  if (LAST) CUES.push(...slamTitleCues(LAST), ['glitter', +LAST.at.toFixed(2), +(LAST.at + 0.6).toFixed(2)])
  if (end === 'loop') CUES.push(...loopCues({ duration: D }))
  return { DURATION: D, SCENES, CUES }
}
