// dwkit — the shared look of "Don't Watch This If You're a ___" (Month 2 boost, batch m01, kdwe01–kdwe20).
// Imported read-only by every film in the series. No end card, no card cut, no logo: DURATION is the story.
//
//   import { dwFilm, K } from '../../kdwe01/dwkit.js'
//   const F = dwFilm({ ...cfg });  export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
//
// The format (every film):
//   t = 0       the sign's star is lunging at the lens, mid-slap: huge, one point squashed flat on the glass, smudge
//               streaks, shaking, REC chrome, and the hook line slammed on screen ("SCORPIO. Scroll. *Now.*").
//   ~0.5 s      the pattern break: record scratch + freeze frame (desaturated, "⏸ PAUSED"), then a whip zoom out: the
//               star is pulled off the lens and we see what it didn't want us to see.
//   story       cfg.paint(x, t, K) draws the room + the secret in world space (camera shots via cfg.shots), cfg.over(x, t, K)
//               draws screen-space overlays (phones, HUDs), cfg.heads are the pop captions, cfg.boxes the RPG dialogue.
//   Pisces      the camera operator ("PISCES CAM" in the REC frame); it cries on screen in every film (K.pisces(... tears)).
//   ending      'loop': the last LOOP s the star lunges back into exactly the frame-0 composition (seamless replay);
//               'cut':  hard cut on the punchline (cfg.last lands ≥ 0.6 s before the end; nothing fades).
//
// cfg: { id, sign, dur, hook, hookAccent?, ending, cam?, wall?, shots?, paint, over?, heads?, boxes?, last?, chapters?,
//        lens?: { mood, look }, pull?: { x, y, s }  (where the star lands after the whip), flashes?, shakes?, cues?, music }
// Pure f(t). Nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { recordScratch, recordScratchCues, whipZoom, whipZoomCues, loopK, loopCues } from '../hookkit.js'
export * as HK from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#140c28', RED = '#ff3b4e', PINK = '#ff8fb1', CY = '#7fe3ff'
export const INTER = "'Inter', system-ui, sans-serif", MONO = "'Space Mono', ui-monospace, monospace", SERIF = "'EB Garamond', Georgia, serif"
export const NAMES = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
export const tag = id => `${signStar(id).glyph}︎ ${NAMES[id]}`
export const CPS = 30
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inOut = (t, a, b, d = 0.3) => pop01(t, a, d) * outK(t, [b - 0.25, b])
const R = Math.round
const TAU = Math.PI * 2

// ═══════════════════════════════════════ drawing helpers (world or screen space)
/** an ink-outlined block (the house pixel look) */
export function box(x, X, Y, w, h, c, { ink = INK, o = 4 } = {}) {
  x.fillStyle = ink; x.fillRect(R(X - o), R(Y - o), R(w + 2 * o), R(h + 2 * o))
  x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h))
}
export function rect(x, X, Y, w, h, c) { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
export function rrect(x, X, Y, w, h, r, c, stroke = null, lw = 4) {
  x.beginPath(); x.roundRect(X, Y, w, h, r)
  if (c) { x.fillStyle = c; x.fill() }
  if (stroke) { x.strokeStyle = stroke; x.lineWidth = lw; x.stroke() }
}
/** plain canvas text */
export function txt(x, s, X, Y, { size = 32, font = MONO, weight = 700, color = BONE, align = 'center', base = 'middle', italic = false, maxW, alpha = 1, spacing = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha
  x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = base; x.fillStyle = color
  if (spacing) x.letterSpacing = spacing + 'px'
  x.fillText(s, X, Y, maxW); x.restore()
}
/** rich text: '*word*' = accent (italic Garamond, accent colour), '|' = new line. Centred at X, first line at Y. */
export function rich(x, s, X, Y, { size = 96, accentSize, accent = RED, color = BONE, stroke = INK, lw = 14, lh = 1.08, align = 'center', alpha = 1, maxW = 980 } = {}) {
  const aS = accentSize ?? Math.round(size * 1.32)
  const lines = s.split('|').map(l => l.trim())
  x.save(); x.globalAlpha *= alpha; x.textBaseline = 'alphabetic'; x.lineJoin = 'round'
  let y = Y
  for (const line of lines) {
    const segs = []; line.split(/(\*[^*]+\*)/).filter(Boolean).forEach(p => segs.push(p.startsWith('*') ? { s: p.slice(1, -1), a: 1 } : { s: p, a: 0 }))
    const fontOf = g => g.a ? `italic 600 ${aS}px ${SERIF}` : `900 ${size}px ${INTER}`
    let W = 0; for (const g of segs) { x.font = fontOf(g); g.w = x.measureText(g.s).width; W += g.w }
    const k = W > maxW ? maxW / W : 1
    x.save(); x.translate(X, y); x.scale(k, k)
    let cx = align === 'center' ? -W / 2 : align === 'right' ? -W : 0
    for (const g of segs) {
      x.font = fontOf(g); x.textAlign = 'left'
      if (stroke) { x.strokeStyle = stroke; x.lineWidth = lw; x.strokeText(g.s, cx, 0) }
      x.fillStyle = g.a ? accent : color; x.fillText(g.s, cx, 0); cx += g.w
    }
    x.restore()
    y += Math.max(size, aS * 0.8) * lh * k
  }
  x.restore()
}

// ── stars (+ tears, copied from the house tearsCells so no end-card module is pulled in)
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
function frameOf(px, py, size, t, { pop = 1, bob, squash = 0, seed = 1 }) {
  const s = size * pop, cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G, S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const sq = squash + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = py + Math.sin(t * 2.2 + seed * 2.1) * bobA
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, base, ox: R(px), oy: R(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
function inSprite(x, F, fn) { x.save(); x.translate(F.ox, F.oy); x.scale(F.sx, F.sy); x.translate(-F.S / 2, -F.S / 2 - F.base); x.scale(F.cell, F.cell); fn(); x.restore() }
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(x, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { x.fillStyle = INK; x.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); x.fillStyle = '#8fe3ff'; x.fillRect(i, j, 1, 1.4); x.fillStyle = '#ffffff'; x.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
    x.fillStyle = '#8fe3ff'; x.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** any sign star: K.star(x, t, 'leo', { x, y, s, mood, look, tears, hops, squash, pop, alpha, rot, flip }) */
export function star(x, t, id, o = {}) {
  const S = id === 'stars' ? { color: STAR.sky, glyph: null } : signStar(id)
  const seed = o.seed ?? (id.length * 3 + 1)
  const opts = { color: S.color, glyph: o.s >= 150 && o.badge !== false ? S.glyph : null, seed, glow: 1, ...o }
  delete opts.x; delete opts.y; delete opts.s
  const rot = o.rot ?? 0
  if (rot) { x.save(); x.translate(o.x, o.y); x.rotate(rot); x.translate(-o.x, -o.y) }
  const r = drawStarChar(x, o.x, o.y, o.s, t, opts)
  if (o.tears && (o.pop ?? 1) > 0.3) { x.save(); x.globalAlpha *= o.alpha ?? 1; inSprite(x, frameOf(o.x, o.y, o.s, t, { ...opts, hops: null }), () => tearsCells(x, t, o.tears)); x.restore() }
  if (rot) x.restore()
  return r
}
/** ♓ Pisces (the camera operator), usually crying */
export const pisces = (x, t, o = {}) => star(x, t, 'pisces', { mood: 'wide', look: [-1, -0.5], seed: 6, glow: 0.85, tears: 3, ...o })

// ── a phone (screen space or world): bubbles [{ side: 'L'|'R'|'C', text, at, color? }]
export function phone(x, t, { X = 540, Y = 960, w = 520, h = 900, rot = 0, pop = 1, title = '', time = '11:48', bubbles = [], screen = null, bg = '#1a1236', accent = PINK, size = 34 } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(pop, pop)
  rrect(x, -w / 2 - 14, -h / 2 - 14, w + 28, h + 28, 56, INK)
  rrect(x, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 50, '#3a2f5a')
  rrect(x, -w / 2, -h / 2, w, h, 44, bg)
  rrect(x, -60, -h / 2 + 14, 120, 26, 13, INK)
  txt(x, time, -w / 2 + 50, -h / 2 + 28, { size: 22, align: 'left', color: BONE })
  if (title) { rect(x, -w / 2, -h / 2 + 56, w, 76, 'rgba(255,255,255,0.06)'); txt(x, title, 0, -h / 2 + 94, { size: 30, color: BONE }) }
  x.save(); x.beginPath(); x.roundRect(-w / 2, -h / 2 + 136, w, h - 150, 30); x.clip()
  if (screen) screen(x, t, w, h)
  let y = -h / 2 + 170
  for (const b of bubbles) {
    const k = b.at == null ? 1 : pop01(t, b.at, 0.28, 2.2)
    if (k <= 0) continue
    x.font = `700 ${b.size ?? size}px ${MONO}`
    const words = b.text.split(' '), rows = []; let cur = ''
    for (const wd of words) { const test = cur ? cur + ' ' + wd : wd; if (x.measureText(test).width > w * 0.66 && cur) { rows.push(cur); cur = wd } else cur = test }
    rows.push(cur)
    const lh = (b.size ?? size) * 1.25, bw = Math.max(...rows.map(r => x.measureText(r).width)) + 44, bh = rows.length * lh + 26
    const bx = b.side === 'R' ? w / 2 - 24 - bw : b.side === 'C' ? -bw / 2 : -w / 2 + 24
    x.save(); x.translate(bx + bw / 2, y + bh / 2); x.scale(k, k); x.translate(-(bx + bw / 2), -(y + bh / 2))
    if (b.from) txt(x, b.from, b.side === 'R' ? bx + bw : bx, y - 14, { size: 20, align: b.side === 'R' ? 'right' : 'left', color: '#bdb3d8' })
    rrect(x, bx, y, bw, bh, 24, b.color ?? (b.side === 'R' ? accent : '#efe6d6'))
    rows.forEach((r, i) => txt(x, r, bx + 22, y + 13 + lh * (i + 0.5), { size: b.size ?? size, align: 'left', color: b.ink ?? (b.side === 'R' ? INK : INK) }))
    x.restore()
    y += bh + (b.from ? 52 : 22)
  }
  x.restore()
  x.restore()
}

// ── the room behind every secret (world space, 1080×1920 at zoom 1)
export function room(x, t, { wall = '#2a1d4e', wall2 = '#1d1438', floor = '#3a2742', floorY = 1380, window: win = true, lamp = true, frame = null, warm = 0.25 } = {}) {
  const g = x.createLinearGradient(0, -400, 0, floorY); g.addColorStop(0, wall2); g.addColorStop(1, wall)
  x.fillStyle = g; x.fillRect(-1200, -800, 3480, floorY + 800)
  // wallpaper dots
  x.fillStyle = 'rgba(255,255,255,0.035)'
  for (let j = -6; j < 15; j++) for (let i = -10; i < 22; i++) if ((i + j) % 2 === 0) x.fillRect(i * 110 + 30, j * 110 + 40, 10, 10)
  if (win) {
    box(x, 640, 300, 320, 420, '#0d0a2a', { o: 10 })
    for (let k = 0; k < 14; k++) { const r = rng(k * 9 + 3); const sx = 660 + r() * 280, sy = 320 + r() * 380, tw = 0.5 + 0.5 * Math.sin(t * 3 + k); rect(x, sx, sy, 5, 5, `rgba(255,244,220,${0.4 + 0.6 * tw})`) }
    x.fillStyle = '#f7e6b0'; x.beginPath(); x.arc(880, 390, 34, 0, TAU); x.fill(); x.fillStyle = '#0d0a2a'; x.beginPath(); x.arc(866, 380, 30, 0, TAU); x.fill()
    rect(x, 795, 300, 10, 420, INK); rect(x, 640, 505, 320, 10, INK)
  }
  if (frame) { box(x, 160, 360, 220, 170, frame, { o: 8 }); rect(x, 190, 390, 160, 110, 'rgba(255,255,255,0.12)') }
  // floor
  const f = x.createLinearGradient(0, floorY, 0, floorY + 600); f.addColorStop(0, floor); f.addColorStop(1, '#120a20')
  x.fillStyle = f; x.fillRect(-1200, floorY, 3480, 1400)
  rect(x, -1200, floorY - 14, 3480, 18, INK); rect(x, -1200, floorY - 10, 3480, 6, 'rgba(255,255,255,0.08)')
  for (let i = -10; i < 30; i++) rect(x, i * 150, floorY + 40, 6, 600, 'rgba(0,0,0,0.12)')
  if (lamp) {
    const gl = x.createRadialGradient(120, 700, 10, 120, 700, 520); gl.addColorStop(0, `rgba(255,214,140,${0.22 + warm * 0.3})`); gl.addColorStop(1, 'rgba(255,214,140,0)')
    x.fillStyle = gl; x.fillRect(-400, 180, 1040, 1040)
  }
}
/** a sticky caption card in world space (labels, signs) */
export function label(x, s, X, Y, { size = 30, bg = BONE, ink = INK, rot = 0, pad = 18, pop = 1 } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(pop, pop)
  x.font = `700 ${size}px ${MONO}`; const w = x.measureText(s).width + pad * 2, h = size + pad * 1.4
  box(x, -w / 2, -h / 2, w, h, bg, { o: 4 }); txt(x, s, 0, 2, { size, color: ink })
  x.restore()
}
/** the red "caught" circle (screen space) */
export function caught(x, t, { X, Y, r = 120, at, out = 99, color = RED }) {
  const k = prog(t, at, at + 0.35)
  if (k <= 0 || t > out) return
  x.save(); x.strokeStyle = color; x.lineWidth = 12; x.lineCap = 'round'
  x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 10
  x.beginPath(); for (let i = 0; i <= 60 * k; i++) { const a = -2.2 + i / 60 * TAU * 1.08, rr = r * (1 + 0.06 * Math.sin(i * 0.4)); const px = X + Math.cos(a) * rr * 1.15, py = Y + Math.sin(a) * rr; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
  x.restore()
}
/** a chapter sticker (long films): 'SECRET 3' slams in, tilted, holds, flies off */
export function chapter(x, t, { at, out, n, of = 5, word = 'SECRET', color = RED }) {
  const k = easeOutBack(prog(t, at, at + 0.28), 2.4), o = 1 - ease.inCubic(prog(t, out - 0.25, out))
  if (k <= 0 || o <= 0) return
  x.save(); x.translate(540 + (1 - o) * 700, 300); x.rotate(-0.06); x.scale(k * 1.0, k * 1.0)
  box(x, -230, -62, 460, 124, color, { o: 8 })
  txt(x, `${word} #${n}`, 0, -6, { size: 62, font: INTER, weight: 900, color: '#fff' })
  txt(x, `${n} / ${of}`, 0, 42, { size: 22, color: '#fff', alpha: 0.85 })
  x.restore()
}
/** a horizontal loading bar card (screen space) */
export function loading(x, t, { at, out, label: lb, pct, X = 540, Y = 1200, color = RED, err = null }) {
  const k = inOut(t, at, out)
  if (k <= 0.01) return
  const p = pct(t)
  x.save(); x.translate(X, Y); x.scale(k, k)
  box(x, -420, -90, 840, 180, 'rgba(18,10,40,0.94)', { o: 6 })
  txt(x, lb, -390, -42, { size: 32, align: 'left' })
  box(x, -390, 0, 780, 50, '#2c2450', { o: 4 }); rect(x, -390, 0, 780 * clamp(p), 50, color)
  txt(x, err && p >= 1 ? err : Math.floor(clamp(p) * 100) + '%', 390, -42, { size: 32, align: 'right', color: err && p >= 1 ? RED : GOLD })
  x.restore()
}

// ═══════════════════════════════════════ the series bug + REC chrome
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '64px', display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '30px', height: '30px', imageRendering: 'pixelated' }, b); ic.width = 10; ic.height = 10
  { const c = ic.getContext('2d'); ['..XXXXXX..', '.X......X.', 'X..XXXX..X', 'X.X.WW.X.X', 'X.X.WW.X.X', 'X..XXXX..X', '.X......X.', '..XXXXXX..', '..........', '..........'].forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') { c.fillStyle = ch === 'W' ? '#fff' : RED; c.fillRect(i, j, 1, 1) } })); c.strokeStyle = RED; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0.5, 8.5); c.lineTo(9.5, 0); c.stroke() }
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: '#ffd9dc', textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, "DON'T&nbsp;WATCH&nbsp;THIS")
  return { update(o = 1) { b.style.opacity = String(o) } }
}
/** the camcorder frame: corner brackets, ● REC, the operator's name, a timecode, and Pisces' fin on the edge */
function recFrame(x, t, { cam = 'PISCES CAM', alpha = 1, fin = true }) {
  x.save(); x.globalAlpha = alpha
  const c = 'rgba(255,255,255,0.85)', L = 70, m = 40, top = 150, bot = 1800
  x.fillStyle = c
  for (const [X, Y, sx, sy] of [[m, top, 1, 1], [1080 - m, top, -1, 1], [m, bot, 1, -1], [1080 - m, bot, -1, -1]]) { x.fillRect(X, Y, sx * L, sy * 6); x.fillRect(X, Y, sx * 6, sy * L) }
  if (Math.floor(t * 2) % 2 === 0) { x.fillStyle = RED; x.beginPath(); x.arc(1080 - 230, top + 40, 12, 0, TAU); x.fill() }
  txt(x, 'REC', 1080 - 208, top + 42, { size: 30, align: 'left', color: '#fff' })
  txt(x, cam, 1080 - 76, top + 86, { size: 22, align: 'right', color: '#cfe9ff' })
  const s = Math.floor(t), fr = Math.floor((t % 1) * 30)
  txt(x, `00:${String(s).padStart(2, '0')}:${String(fr).padStart(2, '0')}`, m + 20, bot - 34, { size: 24, align: 'left', color: '#fff' })
  if (fin && cam === 'PISCES CAM') {
    // a Pisces fin wobbling into the bottom-right corner (the camera operator)
    const P = signStar('pisces'), wob = Math.sin(t * 5) * 0.12
    x.save(); x.translate(1010, 1930); x.rotate(-0.5 + wob)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-70, 10); x.quadraticCurveTo(-40, -150, 20, -170); x.quadraticCurveTo(40, -80, 70, 10); x.fill()
    x.fillStyle = P.color; x.beginPath(); x.moveTo(-58, 10); x.quadraticCurveTo(-34, -134, 16, -152); x.quadraticCurveTo(32, -76, 58, 10); x.fill()
    x.restore()
  }
  x.restore()
}

// ═══════════════════════════════════════ the film
export const HOOK = { freeze: 0.42, thaw: 1.12, whipEnd: 1.42 }
export function dwFilm(cfg) {
  const D = cfg.dur, SIGN = cfg.sign, LOOP = cfg.ending === 'loop' ? (cfg.loopLen ?? 0.45) : 0
  const lens = { mood: 'squint', look: [0, 0], ...(cfg.lens || {}) }
  const pull = { x: 540, y: 1200, s: 360, ...(cfg.pull || {}) }
  const shots = cfg.shots || [{ at: 0, cam: [1, 540, 960] }]
  const boxes = cfg.boxes || []
  const allLines = boxes.flatMap(b => b.lines)
  const { freeze, thaw, whipEnd } = HOOK
  const REC = { at: freeze, len: thaw - freeze, caption: cfg.scratch ?? 'okay. *you asked.*', sub: cfg.scratchSub ?? null, top: 1650 }
  const WHIP = { at: thaw, len: 0.42, from: 1.45, blur: 18 }
  const K = { D, star, pisces, room, box, rect, rrect, txt, rich, phone, label, caught, chapter, loading, pop01, outK, inOut, tearsCells, SIGN, pull, GOLD, BONE, INK, RED, PINK, CY, MONO, INTER, tag }

  // story time: frozen during the freeze frame
  const st = t => (t >= freeze && t < thaw ? freeze : t)
  // lens amount: 1 = the frame-0 slap, 0 = the star is in the scene
  const lensK = t => {
    let k = t < thaw ? 1 : 1 - ease.inOutCubic(prog(t, thaw, whipEnd))
    if (LOOP) k = Math.max(k, loopK(t, D, LOOP))
    return k
  }
  const shotAt = t => { let s = shots[0]; for (const sh of shots) if (t >= sh.at) s = sh; return s }
  function camOf(t) {
    const i = shots.indexOf(shotAt(t)), sh = shots[i]
    let [z, cx, cy] = typeof sh.cam === 'function' ? sh.cam(t) : sh.cam
    const nxt = shots[i + 1]
    z *= 1 + (sh.push ?? 0.03) * prog(t, sh.at, nxt ? nxt.at : D)
    // whip into this shot: the first 0.2 s eases from the previous framing with a heavy blur
    let blur = 0
    if (i > 0 && sh.whip !== false) {
      const p = prog(t, sh.at, sh.at + 0.2)
      if (p < 1) {
        const pv = shots[i - 1]; const [pz, px, py] = typeof pv.cam === 'function' ? pv.cam(sh.at) : pv.cam
        const e = ease.outCubic(p); z = lerp(pz, z, e); cx = lerp(px, cx, e); cy = lerp(py, cy, e); blur = 14 * (1 - p)
      }
    }
    for (const p of cfg.punch || []) {
      const k = ease.outCubic(prog(t, p.at, p.at + 0.14)) * (1 - ease.inOutQuad(prog(t, p.at + p.dur - 0.25, p.at + p.dur)))
      if (k <= 0) continue
      z *= 1 + p.z * k; cx = lerp(cx, p.x, k); cy = lerp(cy, p.y, k)
      blur = Math.max(blur, 8 * (1 - prog(t, p.at, p.at + 0.12)))
    }
    return { z, cx, cy, blur }
  }
  // the lens star: from huge-on-the-glass (k = 1) to its pose in the scene (k = 0)
  function lensStar(x, t, k) {
    const sh = Math.sin(t * 61) * 14 * k + Math.sin(t * 37) * 8 * k
    const s = lerp(pull.s, 1750, k), X = lerp(pull.x, 560, k) + sh, Y = lerp(pull.y, 1260, k) + sh * 0.6
    star(x, t, SIGN, { x: X, y: Y, s, mood: k > 0.5 ? lens.mood : (cfg.pullMood ?? 'wide'), look: k > 0.5 ? lens.look : [0, 0], squash: 0.1 * k, blink: false, glow: 1.2, badge: k < 0.5 && s >= 150 })
    if (k > 0.3) {
      // the point squashed on the glass + the smudge streaks
      const a = clamp((k - 0.3) / 0.7)
      x.save(); x.globalAlpha = 0.5 * a
      const g = x.createRadialGradient(300, 520, 20, 300, 520, 420); g.addColorStop(0, 'rgba(255,255,255,0.85)'); g.addColorStop(0.5, 'rgba(255,255,255,0.25)'); g.addColorStop(1, 'rgba(255,255,255,0)')
      x.fillStyle = g; x.beginPath(); x.ellipse(300, 520, 430, 300, -0.5, 0, TAU); x.fill()
      x.globalAlpha = 0.22 * a; x.strokeStyle = '#fff'; x.lineCap = 'round'
      for (let i = 0; i < 7; i++) { x.lineWidth = 18 + i * 6; x.beginPath(); x.moveTo(120 + i * 70, 1500 - i * 30); x.quadraticCurveTo(420 + i * 60, 1000, 860 + i * 20, 760 + i * 50); x.stroke() }
      x.restore()
    }
  }
  function lensBg(x, k) { if (k <= 0) return; x.save(); x.globalAlpha = 0.55 * k; x.fillStyle = '#0a0618'; x.fillRect(0, 0, 1080, 1920); x.restore() }

  async function build(stage) {
    try { await Promise.all(["900 96px Inter", "800 28px Inter", "italic 600 120px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const off = document.createElement('canvas'); off.width = 1080; off.height = 1920; const ox = off.getContext('2d')
    const heads = (cfg.heads || []).map(h => ({ h, P: popText(root, h.text.replace(/\s*\|\s*/g, ' | '), { top: h.top ?? 250, size: h.size ?? 92, accentSize: h.accentSize ?? Math.round((h.size ?? 92) * 1.34), at: h.at, gap: h.gap ?? 0.07, late: h.late || 0, lateAt: h.lateAt ?? null, wobble: h.wobble ?? true, accentColor: h.accent || RED, fit: true }) }))
    const dboxes = boxes.map(b => dialogueBox(root, { lines: b.lines, y: b.y ?? 1420, width: 960, height: b.h ?? 270, open: b.open, close: b.close, cps: CPS }))
    const top = layerCanvas(root), tx = top.getContext('2d')
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none' }, root)
    const scene = (c, t) => {
      const { z, cx, cy } = camOf(t)
      K.lensK = lensK(t); K.hide = K.lensK > 0.001
      c.save(); c.translate(540, 960); c.scale(z, z); c.translate(-cx, -cy)
      cfg.paint(c, t, K)
      c.restore()
    }
    return {
      start: 0, end: D + 0.01, root,
      update(T) {
        const t = st(T), k = lensK(T), frozen = T >= freeze && T < thaw
        const shake = Math.max(0, ...(cfg.shakes || []).map(s => { const d = t - s; return d > 0 && d < 0.45 ? 18 * Math.exp(-d * 9) : 0 })) * Math.sin(t * 70)
        // the world, rendered off-screen, then composited with blur / freeze grade
        ox.setTransform(1, 0, 0, 1, 0, 0); ox.clearRect(0, 0, 1080, 1920)
        scene(ox, t)
        if (LOOP && k > 0 && T > D - LOOP) { ox.save(); ox.globalAlpha = k; scene(ox, 0); ox.restore() }
        const { blur } = camOf(t)
        x.save(); x.fillStyle = '#05040c'; x.fillRect(0, 0, 1080, 1920)
        x.translate(0, shake)
        const fl = [blur > 0.5 ? `blur(${blur.toFixed(1)}px)` : '', k > 0.02 ? `blur(${(10 * k).toFixed(1)}px)` : ''].filter(Boolean).join(' ')
        x.filter = fl || 'none'; x.drawImage(off, 0, 0); x.filter = 'none'
        x.restore()
        lensBg(x, k)
        // the star: on the lens (k > 0) — while k = 0 the film paints the sign itself in the scene
        if (k > 0.001) lensStar(x, t, k)
        // screen-space overlays
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.over) { tx.save(); tx.translate(0, shake); cfg.over(tx, t, K, k); tx.restore() }
        for (const c of cfg.chapters || []) chapter(tx, t, c)
        recFrame(tx, T, { cam: cfg.cam ?? 'PISCES CAM', alpha: 1 })
        // the hook line: on screen at frame 0, slams again at the loop
        const hk = Math.max(T < (cfg.hookOut ?? 2.4) ? 1 - ease.inQuad(prog(T, (cfg.hookOut ?? 2.4) - 0.25, cfg.hookOut ?? 2.4)) : 0, LOOP ? ease.outCubic(prog(T, D - LOOP, D - LOOP * 0.4)) : 0)
        if (hk > 0.01) {
          const slam = T < 0.12 ? 1 + 0.06 * Math.sin(T * 80) * (1 - T / 0.12) : 1
          tx.save(); tx.translate(540, cfg.hookY ?? 560); tx.scale(slam, slam); tx.rotate(-0.035)
          rich(tx, cfg.hook, 0, 0, { size: cfg.hookSize ?? 104, accent: RED, alpha: hk, lw: 18 })
          tx.restore()
        }
        if (cfg.overTop) cfg.overTop(tx, t, K)
        for (const { h, P } of heads) P.update(t, h.out ? outK(t, h.out) : 1)
        for (const b of dboxes) b.update(t)
        bug.update(1)
        const fls = [...(cfg.flashes || [])]
        const f = Math.max(0, ...fls.map(c => (t >= c && t < c + 0.1) ? 1 - (t - c) / 0.1 : 0))
        flash.style.opacity = String(0.6 * f)
        drawGrain(gx, T)
      },
    }
  }

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    // the slam at frame 0
    ['tick', 0, 0.09], ['pop', 0.01, 220, 0.06, 0], ['whoosh', 0.0, 0.22, 0.05],
    // the record scratch + freeze (hook kit), then the whip out
    ...recordScratchCues(REC), ...whipZoomCues(WHIP), ['pop', r3(thaw + 0.1), 392, 0.05, 0],
    ...(cfg.fx || []).flatMap(e => e.c ? e.c(e.o) : []),
    ...shots.filter(s => s.at > 1).flatMap(s => [['whoosh', r3(s.at - 0.04), 0.22, 0.035], ['tick', r3(s.at), 0.03]]),
    ...(cfg.punch || []).flatMap(p => [['whoosh', r3(p.at - 0.03), 0.16, 0.028], ['pop', r3(p.at + 0.04), 1318.51, 0.03, 0]]),
    ...(cfg.heads || []).filter(h => h.at > 0).flatMap((h, i) => wordPops(h.at, Math.max(1, h.text.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length - (h.late || 0)), h.gap ?? 0.07, i)),
    ...(cfg.heads || []).filter(h => h.late).flatMap(h => [['pop', r3(h.lateAt), 1174.66, 0.045, 0], ['pop', r3(h.lateAt + 0.08), 1567.98, 0.03, 0]]),
    ...boxes.map(b => ['pop', r3(b.open ?? b.lines[0].t - 0.22), 739.99, 0.035, 0]),
    ...talkCues(allLines, { cps: CPS, pitch: cfg.pitch || {} }),
    ...(cfg.chapters || []).flatMap(c => [['whoosh', r3(c.at - 0.05), 0.2, 0.04], ['pop', r3(c.at + 0.05), 523.25, 0.05, 0], ['tick', r3(c.at + 0.08), 0.05]]),
    ...(cfg.shakes || []).map(s => ['boom', r3(s), 0.06]),
    ...(LOOP ? loopCues({ duration: D, len: LOOP }) : []),
    ...(cfg.cues || []),
  ].filter(c => c[1] >= 0 && c[1] < D)
  const MUSIC = { ...cfg.music, sections: { ...(cfg.music.sections || {}), outroAt: cfg.music.sections?.outroAt ?? Math.max(1.5, D - 1.6) } }
  return { DURATION: D, SCENES: [build, whipZoom(WHIP), recordScratch(REC), ...(cfg.fx || []).map(e => e.f(e.o))], CUES, MUSIC, K }
}
