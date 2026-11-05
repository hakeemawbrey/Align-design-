// jupkit — shared bits for PLANET TALK: JUPITER (batch p06, kpjue01–kpjue12). Read-only for e02–e12.
// Built on promo/films/planetkit.js (the cast, bubbles, entrance) and promo/films/hookkit.js (hooks, loop helper).
//
//   import { jupFilm, drawJupiter, pisces, phone, sticker, moons, bigText, rr, BUG } from '../../kpjue01/jupkit.js'   (from a film's scenes/)
//
// jupFilm(spec) → { SCENES, CUES }   one canvas build + bubbles + bug + grain, plus the kit overlays.
//   spec = {
//     duration,                     story length (s); nothing is added after it
//     draw(x, t, H),                your picture (background first). H = { lines, jup(x, X, Y, size, t, opts), sign }
//     bubbles: [speech opts],       planetkit speech() bubbles, drawn on top; Jupiter's / the sign's mouths flap with them
//     hook: slamTitle opts,         the call-out line (frame 0)
//     overlays: [[scene, cues]…],   more hookkit effects (whipZoom, screenShake…) as [builder, cueList]
//     loop: true,                   ease back into frame 0 (hookkit loopBack) — else a hard cut
//     cues: [...],                  extra sound cues
//     freeze: [REC…],               recordScratch windows (the build is wrapped in frozen())
//   }
// drawJupiter(x, X, Y, size, t, opts)  Jupiter with talk driven by `opts.lines`.
// pisces(x, X, Y, size, t, opts)       Pisces's star crying (tears 3 unless opts.tears).
// phone(x, X, Y, w, h, { rot, title, msgs: [{ text, me, at }], t })   a chat phone (fictional, unbranded).
// sticker(x, text, X, Y, { rot, size, bg, fg })                       a tilted label card.
// moons(x, t, cx, cy, R, { n, speed, size, tilt, phase })             little moons orbiting a point.
// bigText(x, text, cx, y, opts)        hookkit drawRich (Inter 800 + *accent* Garamond).
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H } from '../wheel.js'
import { slamTitle, slamTitleCues, loopBack, loopCues, frozen, drawRich, GOLD, BONE, INK } from '../hookkit.js'
import { drawPlanet, drawSign, speech, speechCues } from '../planetkit.js'

export { GOLD, BONE, INK }
export const JUP = '#d9a46c'
export const BUG = 'PLANET TALK · JUPITER'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"

export function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath() }
export const bigText = (x, text, cx, y, o = {}) => drawRich(x, text, cx, y, o)
export const clamp01 = v => Math.max(0, Math.min(1, v))
export const pr = (t, a, b) => clamp01((t - a) / (b - a))
export const easeOut = k => 1 - (1 - k) ** 3
export const easeInOut = k => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2)
export const back = (k, s = 1.8) => 1 + (s + 1) * (k - 1) ** 3 + s * (k - 1) ** 2

export function drawBug(x) {
  x.save(); x.font = `800 30px ${INTER}`; x.textBaseline = 'top'
  const txt = BUG.split('').join(' ')
  x.fillStyle = 'rgba(7,4,26,0.55)'; const w = x.measureText(txt).width
  rr(x, 46, 58, w + 44, 54, 27); x.fill()
  x.fillStyle = JUP; x.beginPath(); x.arc(76, 85, 9, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.fillText(txt, 96, 70); x.restore()
}

export function drawJupiter(x, X, Y, size, t, opts = {}) { return drawPlanet(x, 'jupiter', X, Y, size, t, opts) }
export function pisces(x, X, Y, size, t, opts = {}) { return drawSign(x, 'pisces', X, Y, size, t, { mood: 'sparkle', tears: 3, look: [0, -1], ...opts }) }

export function sticker(x, text, X, Y, { rot = -0.06, size = 40, bg = GOLD, fg = INK, pad = 22, alpha = 1, scale = 1 } = {}) {
  if (alpha <= 0 || scale <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(X, Y); x.rotate(rot); x.scale(scale, scale)
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(text).width + pad * 2, h = size + pad * 1.3
  x.shadowColor = 'rgba(0,0,0,0.45)'; x.shadowBlur = 18; x.shadowOffsetY = 8
  x.fillStyle = bg; rr(x, -w / 2, -h / 2, w, h, 14); x.fill(); x.shadowColor = 'transparent'
  x.lineWidth = 5; x.strokeStyle = INK; x.stroke()
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

export function phone(x, X, Y, w, h, { rot = 0, title = 'chat', msgs = [], t = 0, alpha = 1, scale = 1, glow = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(X, Y); x.rotate(rot); x.scale(scale, scale)
  x.shadowColor = glow ? 'rgba(127,224,255,0.8)' : 'rgba(0,0,0,0.5)'; x.shadowBlur = glow ? 60 * glow : 30
  x.fillStyle = '#120a2c'; rr(x, -w / 2, -h / 2, w, h, w * 0.12); x.fill(); x.shadowColor = 'transparent'
  x.lineWidth = 8; x.strokeStyle = '#3a2b6b'; x.stroke()
  x.fillStyle = '#1d1342'; rr(x, -w / 2 + 14, -h / 2 + 14, w - 28, h - 28, w * 0.09); x.fill()
  x.fillStyle = BONE; x.font = `800 ${Math.round(w * 0.075)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'top'
  x.fillText(title, 0, -h / 2 + 40)
  x.fillStyle = '#3a2b6b'; x.fillRect(-w / 2 + 14, -h / 2 + 40 + w * 0.11, w - 28, 3)
  let yy = -h / 2 + 70 + w * 0.12
  const fs = Math.round(w * 0.068)
  x.font = `700 ${fs}px ${INTER}`
  for (const m of msgs) {
    if (m.at !== undefined && t < m.at) continue
    const k = m.at !== undefined ? easeOut(pr(t, m.at, m.at + 0.2)) : 1
    const words = m.text.split(' '); const rows = ['']; const maxW = w * 0.62
    for (const wd of words) { const tr = rows[rows.length - 1] ? rows[rows.length - 1] + ' ' + wd : wd; if (x.measureText(tr).width > maxW && rows[rows.length - 1]) rows.push(wd); else rows[rows.length - 1] = tr }
    const bw = Math.max(...rows.map(r => x.measureText(r).width)) + 36, bh = rows.length * fs * 1.25 + 24
    const bx = m.me ? w / 2 - 30 - bw : -w / 2 + 30
    x.save(); x.globalAlpha *= k; x.translate(0, (1 - k) * 20)
    x.fillStyle = m.me ? '#7fe0ff' : '#efe6d6'; rr(x, bx, yy, bw, bh, 22); x.fill()
    x.fillStyle = INK; x.textAlign = 'left'
    rows.forEach((r, i) => x.fillText(r, bx + 18, yy + 12 + i * fs * 1.25))
    x.restore()
    yy += bh + 16
  }
  x.restore()
}

export function moons(x, t, cx, cy, R, { n = 6, speed = 1, size = 34, tilt = 0.35, phase = 0, front = null, alpha = 1 } = {}) {
  const cols = ['#f3e2a9', '#e8b46a', '#c9b8a6', '#bcd2e8', '#f0cf8a', '#d6c4b0', '#e9dccb', '#c8a27a']
  x.save(); x.globalAlpha *= alpha
  for (let i = 0; i < n; i++) {
    const a = phase + t * speed * (1 + i * 0.13) + (i / n) * Math.PI * 2
    const rr_ = R * (0.75 + 0.35 * ((i * 37) % 10) / 10)
    const mx = cx + Math.cos(a) * rr_, my = cy + Math.sin(a) * rr_ * tilt
    const inFront = Math.sin(a) > 0
    if (front !== null && front !== inFront) continue
    const s = size * (0.7 + 0.5 * ((i * 53) % 10) / 10) * (inFront ? 1.1 : 0.85)
    x.fillStyle = cols[i % cols.length]; x.strokeStyle = INK; x.lineWidth = 4
    x.beginPath(); x.arc(mx, my, s / 2, 0, Math.PI * 2); x.fill(); x.stroke()
    x.fillStyle = 'rgba(0,0,0,0.18)'; x.beginPath(); x.arc(mx + s * 0.12, my + s * 0.1, s * 0.12, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}

/** the film builder */
export function jupFilm(spec) {
  const { duration, draw, bubbles = [], hook, overlays = [], loop = false, cues = [], freeze = null } = spec
  const lines = bubbles.map(b => ({ t: b.t0, who: b.who, text: b.text.replace(/\*/g, '') }))
  const H = { lines }
  async function build(stage) {
    const root = fill(stage, { background: '#07041a' })
    try { await Promise.all(['800 60px Inter', "italic 600 60px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) {}
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: 0, end: duration + 1, root,
      update(t) {
        x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1
        draw(x, t, H)
        for (const b of bubbles) speech(x, t, { size: 44, maxW: 700, ...b })
        drawBug(x)
        drawGrain(gx, t)
      },
    }
  }
  const main = freeze ? frozen(build, freeze) : build
  const hk = hook ? slamTitle(hook) : null
  const SCENES = [main, ...(hk ? [hk] : []), ...overlays.map(o => o[0])]
  if (loop) SCENES.push(loopBack([build, ...(hk ? [slamTitle(hook)] : [])], { duration }))
  const CUES = [
    ...(hook ? slamTitleCues(hook) : []),
    ...overlays.flatMap(o => o[1] || []),
    ...speechCues(bubbles.map(b => ({ ...b, text: b.text.replace(/\*/g, '') }))),
    ...cues,
    ...(loop ? loopCues({ duration }) : []),
  ]
  return { SCENES, CUES, lines }
}
