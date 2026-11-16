// og-ksre SOCIAL COPY of ../ksre01/srkit.js (og social cut; the original is untouched; each og-ksre film keeps its own copy).
//   Social: no series bug, no category bar (header text), the splits / timer / Pisces cam fade in only once the static
//   HOOK is gone (cfg.hookUntil) and sit inside the safe zone; the frame-0 slam hook is dropped (the HOOK export replaces
//   it); the last line draws static (no slam, jolt, burst or word-pop sounds); whip zooms softened (no blur, flash or
//   rays); record-scratch freezes become a calm caption card (no flash, freeze or PAUSED); glitches keep only their
//   dialog (no slice bars, glitch cam or chip burst); no screen shakes; toasts sit above the app caption; always a hard
//   cut on the last story frame (no loop back).
// srkit: the FALLING IN LOVE: SPEEDRUN show kit (Month 2 boost, batch m03, ksre01–ksre20). Read-only for other films.
// A speedrun stream of falling for someone: the series bug, a category bar, a big run timer, a splits panel whose rows
// flash gold / green / red as stages land, and a Pisces "facecam" that commentates (and cries, every film).
// No end card, no card cut, no logo: DURATION is the story. Everything draws on ONE canvas as a pure function of t
// (the sound build imports scenes/index.js in node, so nothing touches `document` at module top level).
//
//   makeRun(cfg) → { DURATION, SCENES, CUES }
//     cfg.id, cfg.duration
//     cfg.runner      sign id of the runner ('aries'); cfg.category ('ANY%'); cfg.label ('FALLING FOR SOMEONE')
//     cfg.hook        { text: 'ARIES. | ANY%. *NO RESETS.*', out: [a, b], top, size, accent }   on screen at frame 0
//     cfg.splits      [{ name, at, time, state: 'gold'|'green'|'red'|'skip', delta }]   rows land at `at`
//     cfg.current     optional fn(t) → index of the highlighted (running) split row
//     cfg.timer       fn(t) → { text, col?, sub? }  (helpers: clockTimer(keys), keyTimer(keys))
//     cfg.cam         fn(t) → { mood, tears (0–3), look, say?, sayAt? }   the Pisces facecam
//     cfg.world(x, t, S)   the stage (inside the camera); S = helpers
//     cfg.over(x, t, S)    drawn above the HUD (notifications, stamps, pops)
//     cfg.camera      fn(t) → { zoom, dx, dy, rot }  (whip zooms, shakes)
//     cfg.freeze      [[a, b]]: world time holds at a (record-scratch freeze frames: desaturated, a FREEZE tag)
//     cfg.ending      { type: 'cut' } | { type: 'loop', len: 0.4 }   loop: the last `len` s ease into frame 0
//     cfg.chapters    [{ t, n, title }]  chapter stickers (long films)
//     cfg.hud         fn(t) → 0…1 HUD visibility (default 1)
//     cfg.cues        sound cues (promo/scripts/synth.mjs kinds)
//   Drawing helpers (exported): txt, rich, bubble, banner, stamp, pop, level, star, pisces, speedLines, circleCaught,
//   toast, heartBits, shake, whip, splitCues, and the colours.
import { clamp, lerp, prog, ease } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, signStar, STAR } from '../startalk.js'
import { drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK, popOut, drawPhone } from '../sxmail1/scenes/mail.js'
import * as HK from '../hookkit.js'
export { HK }

export { clamp, lerp, prog, ease, easeOutBack, drawBits, sparkles, pop01, outK, popOut, drawPhone, signStar, STAR, drawPixelStar, starFrame, inSprite }
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff4a5e', GREEN = '#5fe08a', BLUE = '#6fb8ff', GREY = '#8f88ad', LAV = '#c9a6ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPHF = "'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', 'DejaVu Sans', serif"
export const glyphOf = id => signStar(id).glyph + '︎'
export const nameOf = id => id[0].toUpperCase() + id.slice(1)
export const colOf = id => signStar(id).color
const STATE_COL = { gold: GOLD, green: GREEN, red: RED, skip: GREY, blue: BLUE }

// ─────────────────────────────────────────── text
/** plain text with an ink outline. opts: size, weight, font, col, align, base, stroke, alpha, ls (letter spacing px), rot, maxW */
export function txt(x, s, cx, cy, { size = 40, weight = 800, font = INTER, col = BONE, align = 'center', base = 'middle', stroke = 0.16, alpha = 1, ls = 0, rot = 0, maxW = 0, scale = 1 } = {}) {
  if (alpha <= 0.01 || scale <= 0.01) return
  x.save(); x.globalAlpha *= clamp(alpha); x.translate(cx, cy); x.rotate(rot); x.scale(scale, scale)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = base
  x.letterSpacing = ls + 'px'
  if (maxW) { const w = x.measureText(s).width; if (w > maxW) { const k = maxW / w; x.scale(k, k) } }
  if (stroke) { x.lineJoin = 'round'; x.lineWidth = size * stroke; x.strokeStyle = INK; x.strokeText(s, 0, 0) }
  x.fillStyle = col; x.fillText(s, 0, 0)
  x.restore()
}
/** multi-line rich text: '|' breaks lines, '*word*' = accent colour. Centred block at (cx, top). Returns the height. */
export function rich(x, s, cx, top, { size = 90, weight = 900, col = BONE, accent = GOLD, lh = 1.05, alpha = 1, scale = 1, maxW = 1000, stroke = 0.14, rot = 0, words = null } = {}) {
  const lines = s.split('|').map(l => l.trim())
  if (alpha <= 0.01 || scale <= 0.01) return lines.length * size * lh
  x.save(); x.globalAlpha *= clamp(alpha)
  x.translate(cx, top + lines.length * size * lh / 2); x.rotate(rot); x.scale(scale, scale); x.translate(0, -lines.length * size * lh / 2)
  x.font = `${weight} ${size}px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.letterSpacing = '0px'
  let wi = 0
  lines.forEach((ln, j) => {
    const toks = []; let acc = false
    for (const part of ln.split(/(\*)/)) { if (part === '*') { acc = !acc; continue } if (part) toks.push({ s: part, acc }) }
    const full = toks.map(t => t.s).join('')
    let w = x.measureText(full).width, k = w > maxW ? maxW / w : 1
    x.save(); x.translate(0, j * size * lh + size * lh / 2); x.scale(k, k)
    let px = -w / 2
    for (const tk of toks) {
      // word-by-word pop (optional): words = fn(index) → 0…1
      for (const word of tk.s.split(/(\s+)/)) {
        if (!word) continue
        const ww = x.measureText(word).width
        if (/\S/.test(word)) {
          const wk = words ? words(wi++) : 1
          if (wk > 0.01) {
            x.save(); x.translate(px + ww / 2, 0); x.scale(wk, wk); x.globalAlpha *= clamp(wk * 2)
            x.lineJoin = 'round'; x.lineWidth = size * stroke; x.strokeStyle = INK; x.strokeText(word, -ww / 2, 0)
            x.fillStyle = tk.acc ? accent : col; x.fillText(word, -ww / 2, 0); x.restore()
          }
        }
        px += ww
      }
    }
    x.restore()
  })
  x.restore()
  return lines.length * size * lh
}

// ─────────────────────────────────────────── pixel boxes
export function pbox(x, X, Y, w, h, fillc, { b = 6, edge = INK, hi = null } = {}) {
  x.fillStyle = edge; x.fillRect(X + b, Y, w - 2 * b, h); x.fillRect(X, Y + b, w, h - 2 * b)
  x.fillStyle = fillc; x.fillRect(X + b, Y + b, w - 2 * b, h - 2 * b)
  if (hi) { x.fillStyle = hi; x.fillRect(X + 2 * b, Y + b, w - 4 * b, b) }
}
/** a pixel speech bubble centred at (cx, cy) with a tail pointing toward tail = −1…1 (x) below */
export function bubble(x, t, cx, cy, t0, t1, s, { size = 36, col = BONE, ink = INK, tail = 0, up = false, maxW = 760, alpha = 1 } = {}) {
  if (t < t0 || t > t1 + 0.2) return
  const k = pop01(t, t0, 0.24, 2.4) * outK(t, [t1, t1 + 0.2]) * alpha
  if (k <= 0.01) return
  x.save(); x.font = `800 ${size}px ${INTER}`; x.letterSpacing = '0px'
  const lines = []; let cur = ''
  for (const para of s.split('|')) {
    cur = ''
    for (const wd of para.trim().split(' ')) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr).width > maxW - 50 && cur) { lines.push(cur); cur = wd } else cur = tr }
    lines.push(cur)
  }
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 50, h = lines.length * size * 1.18 + 30
  x.translate(cx, cy); x.scale(k, k)
  pbox(x, -w / 2, -h / 2, w, h, col, { b: 6, edge: ink })
  const tx = tail * (w / 2 - 40)
  x.fillStyle = ink
  if (!up) { x.fillRect(tx - 14, h / 2 - 2, 28, 14); x.fillRect(tx - 6, h / 2 + 10, 16, 14); x.fillStyle = col; x.fillRect(tx - 8, h / 2 - 6, 16, 12); x.fillRect(tx - 1, h / 2 + 4, 6, 12) }
  else { x.fillRect(tx - 14, -h / 2 - 12, 28, 14); x.fillRect(tx - 6, -h / 2 - 24, 16, 14); x.fillStyle = col; x.fillRect(tx - 8, -h / 2 - 6, 16, 12); x.fillRect(tx - 1, -h / 2 - 16, 6, 12) }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, j) => x.fillText(l, 0, (j - (lines.length - 1) / 2) * size * 1.18 + 2))
  x.restore()
}
/** a slammed stamp label (rotated, bordered). k = scale 0…1+ */
export function stamp(x, s, cx, cy, k, { size = 70, col = RED, rot = -0.12, fillc = null, alpha = 1, pad = 26, font = INTER } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  x.save(); x.globalAlpha *= clamp(alpha); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `900 ${size}px ${font}`; x.letterSpacing = '2px'
  const w = x.measureText(s).width + pad * 2, h = size * 1.35
  if (fillc) pbox(x, -w / 2, -h / 2, w, h, fillc, { b: 8 })
  x.lineWidth = 10; x.strokeStyle = INK; x.strokeRect(-w / 2 + 2, -h / 2 + 2, w - 4, h - 4)
  x.lineWidth = 6; x.strokeStyle = col; x.strokeRect(-w / 2 + 2, -h / 2 + 2, w - 4, h - 4)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineJoin = 'round'; x.lineWidth = size * 0.16; x.strokeStyle = INK; x.strokeText(s, 0, 4)
  x.fillStyle = col; x.fillText(s, 0, 4)
  x.restore()
}
/** a game toast that pops in at t0 and out at t1 (achievement-style): title small, body big */
export function toast(x, t, t0, t1, title, body, { cx = 540, cy = 1040, col = GOLD, w = 820, icon = 'trophy' } = {}) {
  if (t < t0 || t > t1 + 0.25) return
  const k = pop01(t, t0, 0.3, 2.6) * outK(t, [t1, t1 + 0.25])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = 150
  pbox(x, -w / 2, -h / 2, w, h, '#1d1440', { b: 8, edge: INK })
  x.fillStyle = col; x.fillRect(-w / 2 + 8, -h / 2 + 8, w - 16, 6); x.fillRect(-w / 2 + 8, h / 2 - 14, w - 16, 6)
  // icon
  const IC = icon === 'trophy'
    ? ['GGGGGGG', 'GGWGGGG', '.GGGGG.', '..GGG..', '...G...', '..GGG..', '.GGGGG.']
    : icon === 'heart' ? ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'] : ['..G..', '.GGG.', 'GGGGG', '.GGG.', '..G..']
  drawBits(x, IC, { G: col, W: BONE, H: PINK }, -w / 2 + 80, 0, 11)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  x.font = `700 26px ${MONO}`; x.letterSpacing = '3px'; x.fillStyle = col; x.fillText(title, -w / 2 + 150, -30)
  x.letterSpacing = '0px'; x.font = `800 40px ${INTER}`; x.fillStyle = BONE
  const bw = x.measureText(body).width, lim = w - 190
  if (bw > lim) { x.save(); x.translate(-w / 2 + 150, 22); x.scale(lim / bw, 1); x.fillText(body, 0, 0); x.restore() } else x.fillText(body, -w / 2 + 150, 22)
  x.restore()
  sparkles(x, t, cx, cy, t0 + 0.05, 10, w * 0.45, 2, [col, BONE, PINK])
}
/** a red hand-drawn "caught" circle around (cx, cy), drawn on from t0 */
export function circleCaught(x, t, cx, cy, r, t0, { col = RED, label = null, labelAt = null, out = null } = {}) {
  const p = ease.outCubic(prog(t, t0, t0 + 0.35))
  const o = out ? outK(t, out) : 1
  if (p <= 0 || o <= 0.01) return
  x.save(); x.globalAlpha *= o
  x.lineCap = 'round'; x.lineWidth = 14; x.strokeStyle = INK
  const path = () => { x.beginPath(); const N = 48; for (let i = 0; i <= N * p * 1.08; i++) { const a = -1.9 + (i / N) * Math.PI * 2; const rr = r * (1 + 0.06 * Math.sin(i * 0.7)); const px = cx + Math.cos(a) * rr * 1.08, py = cy + Math.sin(a) * rr * 0.92; i ? x.lineTo(px, py) : x.moveTo(px, py) } }
  path(); x.stroke(); x.lineWidth = 8; x.strokeStyle = col; path(); x.stroke()
  x.restore()
  if (label) txt(x, label, cx, cy - r - 46, { size: 44, col, alpha: o, scale: pop01(t, labelAt ?? t0 + 0.3, 0.25, 2.5) })
}
export function heartBits(x, cx, cy, cell, col = PINK, alpha = 1) { drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: col }, cx, cy, cell, { alpha }) }

// ─────────────────────────────────────────── characters
/** a sign star. o: { id, x, y, s, mood, look, hops, pop, alpha, squash, seed, glyph (default on), tears } */
export function star(x, t, o) {
  const S = signStar(o.id)
  const opts = { color: S.color, glyph: o.glyph === false || o.s < 130 ? null : S.glyph, mood: o.mood || 'happy', look: o.look, hops: o.hops, pop: o.pop ?? 1, alpha: o.alpha ?? 1, squash: o.squash || 0, seed: o.seed ?? 3, glow: o.glow ?? 1, blush: o.blush, bob: o.bob, blink: o.blink }
  if ((opts.pop ?? 1) <= 0.01 || opts.alpha <= 0.01) return
  x.save()
  if (o.rot) { x.translate(o.x, o.y); x.rotate(o.rot); x.translate(-o.x, -o.y) }
  if (o.flip) { x.translate(o.x, 0); x.scale(-1, 1); x.translate(-o.x, 0) }
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  if (o.tears) { const F = starFrame(o.x, o.y, o.s, t, opts); inSprite(x, F, () => tearsCells(x, t, o.tears)) }
  x.restore()
}
export const pisces = (x, t, o) => star(x, t, { ...o, id: 'pisces', tears: o.tears ?? 2 })

/** horizontal speed lines behind a runner */
export function speedLines(x, t, cx, cy, { n = 9, len = 260, spread = 220, col = 'rgba(239,230,214,0.55)', dir = -1, alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  for (let i = 0; i < n; i++) {
    const ph = ((t * 3.2 + i * 0.37) % 1)
    const yy = cy + (((i * 73) % 100) / 100 - 0.5) * spread * 2
    const xx = cx - dir * (80 + ph * 380)
    x.fillStyle = col; x.fillRect(Math.round(xx - (dir < 0 ? 0 : len * (1 - ph))), Math.round(yy), Math.round(len * (1 - ph)), 6)
  }
  x.restore()
}

// ─────────────────────────────────────────── the level (stage)
const THEMES = {
  street: { sky: '#2a1d56', far: '#3b2b72', near: '#2c2160', win: '#ffd98a', ground: '#4a3b86', top: '#7f6bd0', line: '#efe6d6' },
  cafe: { sky: '#3d1f3f', far: '#5a2c50', near: '#43223f', win: '#ffcf8a', ground: '#6b3a3a', top: '#c9855a', line: '#f3d6b0' },
  park: { sky: '#173a4e', far: '#1f5a5a', near: '#1b4a48', win: '#bff0b0', ground: '#2f6b3f', top: '#6fd06a', line: '#d9f7c0' },
  room: { sky: '#26204a', far: '#3a3168', near: '#2e2758', win: '#ffe6a8', ground: '#55407a', top: '#9b7fd0', line: '#efe6d6' },
  night: { sky: '#120c2a', far: '#221a4a', near: '#1a1440', win: '#9fd8ff', ground: '#2a2350', top: '#5b4aa0', line: '#c9c0ef' },
  party: { sky: '#3a1446', far: '#5a1f66', near: '#47185a', win: '#ff9fe0', ground: '#4c2a6e', top: '#d06ad0', line: '#ffd6f4' },
  void: { sky: '#0b0820', far: '#151036', near: '#110c2c', win: '#6a60a8', ground: '#1e1844', top: '#3c3280', line: '#8f88ad' },
}
/** the level: tinted sky band, two parallax skylines with lit windows, a tiled ground. scroll in px (runner moving right = +) */
export function level(x, t, { theme = 'street', scroll = 0, floor = 1300, dim = 1, skyline = true } = {}) {
  const th = THEMES[theme] || THEMES.street
  x.save(); x.globalAlpha = 0.55 * dim; x.fillStyle = th.sky; x.fillRect(0, 560, 1080, floor - 560); x.restore()
  if (skyline) for (const [layer, col, spd, hgt, seed] of [[0, th.far, 0.25, 380, 3], [1, th.near, 0.55, 250, 7]]) {
    const off = (scroll * spd) % 1440
    for (let i = -1; i < 9; i++) {
      const bw = 120 + ((i * 37 + seed * 11) % 5) * 26, bh = hgt * (0.55 + ((i * 53 + seed * 7) % 7) / 12)
      const bx = Math.round(i * 180 - off + ((seed * 31) % 60)), by = floor - bh
      const xx = ((bx % 1440) + 1440) % 1440 - 180
      x.fillStyle = col; x.fillRect(xx, by, bw, bh)
      if (layer === 1) for (let wy = by + 24; wy < floor - 40; wy += 46) for (let wx = xx + 18; wx < xx + bw - 24; wx += 38) {
        const on = ((Math.floor(wx / 7) * 13 + Math.floor(wy / 5) * 7 + seed) % 5) > 1
        if (on) { x.fillStyle = th.win; x.globalAlpha = 0.5 + 0.2 * Math.sin(t * 1.3 + wx); x.fillRect(wx, wy, 16, 20); x.globalAlpha = 1 }
      }
    }
  }
  // ground tiles
  x.fillStyle = INK; x.fillRect(0, floor - 8, 1080, 8)
  x.fillStyle = th.top; x.fillRect(0, floor, 1080, 22)
  x.fillStyle = th.ground; x.fillRect(0, floor + 22, 1080, 1920 - floor)
  const off = ((scroll % 96) + 96) % 96
  for (let i = -1; i < 13; i++) { x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(Math.round(i * 96 - off), floor + 22, 6, 200) }
  for (let j = 0; j < 3; j++) { x.fillStyle = 'rgba(0,0,0,0.14)'; x.fillRect(0, floor + 70 + j * 70, 1080, 6) }
  x.fillStyle = th.line; x.globalAlpha = 0.25; x.fillRect(0, floor + 4, 1080, 4); x.globalAlpha = 1
}
export const shadow = (x, cx, cy, w, a = 0.35) => { x.save(); x.fillStyle = `rgba(6,4,18,${a})`; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }

// ─────────────────────────────────────────── timers
const pad2 = n => String(n).padStart(2, '0')
export function fmtClock(s, { hours = false, cs = true } = {}) {
  s = Math.max(0, s)
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60), c = Math.floor((s * 100) % 100)
  const core = (hours || h > 0) ? `${h}:${pad2(m)}:${pad2(sec)}` : `${m}:${pad2(sec)}`
  return cs ? `${core}.${pad2(c)}` : core
}
/** piecewise-linear run clock: keys [[t, runSeconds], …] → value at t (holds after the last key) */
export function runAt(keys, t) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; return lerp(va, vb, (t - a) / (b - a || 1)) }
  return keys[keys.length - 1][1]
}
export const clockTimer = (keys, o = {}) => t => ({ text: fmtClock(runAt(keys, t), o), col: o.col ? o.col(t) : GREEN })

// ─────────────────────────────────────────── the HUD
const BUG = 'FALLING IN LOVE: SPEEDRUN'
const BUG_ICON = ['..WWW..', '.W...W.', 'W..H..W', 'W.HHH.W', 'W..H..W', '.W...W.', '..WWW..']
function drawBug(x, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  drawBits(x, BUG_ICON, { W: GOLD, H: PINK }, 78, 78, 5, { outline: INK })
  x.font = `800 28px ${INTER}`; x.letterSpacing = '5px'; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.lineWidth = 6; x.strokeStyle = 'rgba(6,4,18,0.8)'; x.strokeText(BUG, 112, 80)
  x.fillStyle = GOLD; x.fillText(BUG, 112, 80)
  x.restore()
}
function drawCategory(x, cfg, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  pbox(x, 40, 116, 1000, 62, 'rgba(20,12,48,0.92)', { b: 6, edge: INK })
  x.fillStyle = colOf(cfg.runner); x.fillRect(46, 122, 10, 50)
  const run = cfg.runnerLabel || nameOf(cfg.runner).toUpperCase()
  x.textBaseline = 'middle'; x.textAlign = 'left'
  x.font = `700 34px ${GLYPHF}`; x.fillStyle = colOf(cfg.runner); x.fillText(cfg.runnerGlyph ?? glyphOf(cfg.runner), 72, 149)
  x.font = `700 29px ${MONO}`; x.letterSpacing = '2px'
  const s1 = `${run} · ${cfg.label || 'FALLING FOR SOMEONE'} · `, w1 = x.measureText(s1).width
  const s2 = cfg.category || 'ANY%', w2 = x.measureText(s2).width
  const lim = 1000 - 92 - 20, sc = Math.min(1, lim / (w1 + w2))
  x.save(); x.translate(116, 149); x.scale(sc, 1)
  x.fillStyle = BONE; x.fillText(s1, 0, 0); x.fillStyle = GOLD; x.fillText(s2, w1, 0)
  x.restore()
  x.restore()
}
// og social: the HUD sits clear of the app's top bar (y < 232) and inside x 60–960
const SPL = { x: 60, y: 244, w: 560, rh: 50 }
function drawSplits(x, t, cfg, k) {
  const rows = (typeof cfg.splits === 'function' ? cfg.splits(t) : cfg.splits) || []
  if (!rows.length || k <= 0.01) return
  const n = rows.length, h = 20 + n * SPL.rh + 10
  x.save(); x.globalAlpha = clamp(k)
  pbox(x, SPL.x, SPL.y, SPL.w, h, 'rgba(16,10,40,0.9)', { b: 6, edge: INK })
  let cur = cfg.current ? cfg.current(t) : rows.findIndex(r => t < r.at)
  rows.forEach((r, i) => {
    const y = SPL.y + 18 + i * SPL.rh + SPL.rh / 2
    const done = t >= r.at
    if (i === cur && !done) { x.fillStyle = 'rgba(111,184,255,0.22)'; x.fillRect(SPL.x + 10, y - SPL.rh / 2 + 3, SPL.w - 20, SPL.rh - 6); x.fillStyle = BLUE; x.fillRect(SPL.x + 10, y - SPL.rh / 2 + 3, 6, SPL.rh - 6) }
    const fl = done ? Math.max(0, 1 - (t - r.at) / 0.5) : 0
    if (fl > 0) { x.fillStyle = (STATE_COL[r.state] || GOLD); x.globalAlpha = clamp(k) * 0.45 * fl; x.fillRect(SPL.x + 10, y - SPL.rh / 2 + 3, SPL.w - 20, SPL.rh - 6); x.globalAlpha = clamp(k) }
    x.textBaseline = 'middle'; x.letterSpacing = '1px'
    x.font = `700 27px ${MONO}`; x.textAlign = 'left'
    x.fillStyle = done ? BONE : (i === cur ? BONE : 'rgba(239,230,214,0.55)')
    const nm = r.name, nmW = x.measureText(nm).width, lim = 270
    x.save(); x.translate(SPL.x + 28, y); if (nmW > lim) x.scale(lim / nmW, 1); x.fillText(nm, 0, 0); x.restore()
    x.textAlign = 'right'
    const col = STATE_COL[r.state] || GOLD
    if (done) {
      if (r.delta) { x.font = `700 22px ${MONO}`; x.fillStyle = col; x.fillText(r.delta, SPL.x + SPL.w - 168, y) }
      x.font = `700 27px ${MONO}`; x.fillStyle = r.state === 'skip' ? GREY : col
      const tm = r.time, tw = x.measureText(tm).width
      x.save(); x.translate(SPL.x + SPL.w - 22, y); if (tw > 130) x.scale(130 / tw, 1); x.fillText(tm, 0, 0); x.restore()
    } else { x.font = `700 27px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.4)'; x.fillText('—', SPL.x + SPL.w - 22, y) }
  })
  x.restore()
}
const TIM = { x: 636, y: 244, w: 324, h: 128 }
function drawTimer(x, t, cfg, k) {
  if (!cfg.timer || k <= 0.01) return
  const T = cfg.timer(t)
  x.save(); x.globalAlpha = clamp(k)
  pbox(x, TIM.x, TIM.y, TIM.w, TIM.h, 'rgba(10,6,28,0.94)', { b: 6, edge: INK })
  x.textAlign = 'right'; x.textBaseline = 'middle'; x.letterSpacing = '0px'
  const sc = T.scale || 1
  x.font = `700 ${Math.round(64 * sc)}px ${MONO}`
  const tw = x.measureText(T.text).width, lim = TIM.w - 40
  x.save(); x.translate(TIM.x + TIM.w - 20, TIM.y + (T.sub ? 52 : 64)); if (tw > lim) x.scale(lim / tw, 1)
  x.lineWidth = 8; x.strokeStyle = INK; x.strokeText(T.text, 0, 0)
  x.fillStyle = T.col || GREEN; x.fillText(T.text, 0, 0); x.restore()
  if (T.sub) { x.font = `700 22px ${MONO}`; x.letterSpacing = '2px'; x.fillStyle = T.subCol || 'rgba(239,230,214,0.7)'; x.fillText(T.sub, TIM.x + TIM.w - 20, TIM.y + 104) }
  x.restore()
}
export const CAM = { x: 710, y: 388, w: 250, h: 250 }
function drawCam(x, t, cfg, k, sky) {
  if (!cfg.cam || k <= 0.01) return
  const C = cfg.cam(t)
  x.save(); x.globalAlpha = clamp(k)
  pbox(x, CAM.x, CAM.y, CAM.w, CAM.h, '#1a1238', { b: 6, edge: INK })
  x.save(); x.beginPath(); x.rect(CAM.x + 6, CAM.y + 6, CAM.w - 12, CAM.h - 12); x.clip()
  // a little bedroom-streamer backdrop: a lavender glow and a fairy-light string
  const g = x.createRadialGradient(CAM.x + CAM.w / 2, CAM.y + CAM.h * 0.6, 10, CAM.x + CAM.w / 2, CAM.y + CAM.h * 0.6, CAM.w * 0.8)
  g.addColorStop(0, '#4a3b9a'); g.addColorStop(1, '#1a1238'); x.fillStyle = g; x.fillRect(CAM.x, CAM.y, CAM.w, CAM.h)
  for (let i = 0; i < 7; i++) { const lx = CAM.x + 24 + i * 34, ly = CAM.y + 34 + 10 * Math.sin(i * 1.1); x.fillStyle = [GOLD, PINK, BLUE, GREEN][i % 4]; x.globalAlpha = clamp(k) * (0.6 + 0.4 * Math.sin(t * 4 + i)); x.fillRect(lx, ly, 8, 8) }
  x.globalAlpha = clamp(k)
  const shake = C.shake ? C.shake * Math.sin(t * 60) : 0
  pisces(x, t, { x: CAM.x + CAM.w / 2 + shake, y: CAM.y + CAM.h * 0.66 + (C.dy || 0), s: 170, mood: C.mood || 'wide', look: C.look, tears: C.tears ?? 2, hops: C.hops, seed: 12, glyph: false, squash: C.squash || 0 })
  x.restore()
  // the label
  x.fillStyle = INK; x.fillRect(CAM.x + 6, CAM.y + CAM.h - 40, CAM.w - 12, 34)
  x.fillStyle = RED; x.globalAlpha = clamp(k) * (0.55 + 0.45 * (Math.sin(t * 6) > 0 ? 1 : 0)); x.fillRect(CAM.x + 18, CAM.y + CAM.h - 29, 12, 12); x.globalAlpha = clamp(k)
  x.font = `700 20px ${MONO}`; x.letterSpacing = '2px'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE
  x.fillText('PISCES CAM', CAM.x + 40, CAM.y + CAM.h - 22)
  x.restore()
  if (C.say) bubble(x, t, Math.min(C.sayX ?? 700, 660), Math.max(C.sayY ?? 650, 700), C.sayAt ?? 0, C.sayEnd ?? 1e9, C.say, { size: 30, col: '#d9d3ff', tail: 0.7, up: true, maxW: 560 })   // og: under the moved cam
  void sky
}
function drawChapter(x, t, cfg) {
  for (const c of cfg.chapters || []) {
    const d = t - c.t
    if (d < 0 || d > 2.4) continue
    const k = pop01(t, c.t, 0.32, 2.6) * outK(t, [c.t + 2.1, c.t + 2.4])
    x.save(); x.translate(540, 1530); x.rotate(-0.04); x.scale(k, k)
    x.font = `900 46px ${INTER}`; x.letterSpacing = '1px'
    const s = c.title, w = Math.max(420, x.measureText(s).width + 80)
    pbox(x, -w / 2, -58, w, 116, GOLD, { b: 8, edge: INK })
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 22px ${MONO}`; x.letterSpacing = '4px'; x.fillText(`CHAPTER ${c.n}`, 0, -26)
    x.font = `900 46px ${INTER}`; x.letterSpacing = '1px'; x.fillText(s, 0, 16)
    x.restore()
  }
}

// ─────────────────────────────────────────── og social: calm stand-ins for the hook-kit slams
/** the story's last line: a short fade in, then completely still (no slam, jolt, blur or burst). In the safe zone. */
function softTitle(x, t, L) {
  if (t < L.at) return
  const o = L.out ? outK(t, L.out) : 1, k = ease.outCubic(prog(t, L.at, L.at + 0.3)) * o
  if (k <= 0.01) return
  rich(x, L.text, 520, clamp(L.top ?? 640, 560, 1300), { size: Math.round((L.size ?? 108) * 0.9), accent: L.accentColor ?? GOLD, alpha: k, maxW: 840, rot: -0.02 })
}
/** a record-scratch caption, calm: a dark card fades in at `at` and out after `len` (no flash, no freeze, no PAUSED) */
function softCaption(x, t, c) {
  const len = c.len ?? 1.6
  if (t < c.at || t > c.at + len + 0.25) return
  const k = ease.outCubic(prog(t, c.at + 0.05, c.at + 0.3)) * outK(t, [c.at + len, c.at + len + 0.25])
  if (k <= 0.01) return
  const cy = Math.min(c.top ?? 1380, 1390), w = 900, h = c.sub ? 210 : 160
  x.save(); x.globalAlpha *= clamp(k)
  pbox(x, 520 - w / 2, cy - h / 2, w, h, 'rgba(14,9,36,0.93)', { b: 8, edge: INK })
  let top = cy - h / 2 + 26
  if (c.sub) { txt(x, c.sub, 520, top + 14, { size: 26, font: MONO, weight: 700, col: 'rgba(239,230,214,0.75)', stroke: 0, ls: 1, maxW: w - 80 }); top += 52 }
  rich(x, c.caption, 520, top, { size: 58, maxW: w - 80, stroke: 0.1 })
  x.restore()
}
/** a glitch's "system error" dialog, without the slice bars, noise or glitch camera */
function softDialog(x, t, g) {
  const len = g.len ?? 1.2
  if (t < g.at || t >= g.at + len + 0.2) return
  const k = ease.outCubic(prog(t, g.at, g.at + 0.22)) * outK(t, [g.at + len, g.at + len + 0.2])
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k); x.translate(520, 980)
  const PW = 880, PH = 420
  x.fillStyle = INK; x.fillRect(-PW / 2 - 8, -PH / 2 - 8, PW + 16, PH + 16)
  x.fillStyle = '#d8d0c2'; x.fillRect(-PW / 2, -PH / 2, PW, PH)
  x.fillStyle = '#3a2a8a'; x.fillRect(-PW / 2, -PH / 2, PW, 70)
  x.font = `700 32px ${MONO}`; x.letterSpacing = '0px'; x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('system error', -PW / 2 + 24, -PH / 2 + 36)
  x.fillStyle = RED; x.beginPath(); x.moveTo(-PW / 2 + 110, -60); x.lineTo(-PW / 2 + 170, 50); x.lineTo(-PW / 2 + 50, 50); x.closePath(); x.fill()
  x.fillStyle = '#fff'; x.font = `800 70px ${INTER}`; x.textAlign = 'center'; x.fillText('!', -PW / 2 + 110, 18)
  x.save(); x.beginPath(); x.rect(-PW / 2 + 200, -110, PW - 240, 200); x.clip()
  HK.drawRich(x, g.text || '', -PW / 2 + 210, -100, { size: 46, accentSize: 54, color: INK, accentColor: '#3a2a8a', maxW: PW - 260, align: 'left', shadow: false })
  x.restore()
  const buttons = g.buttons || ['WAIT', 'CLOSE']
  buttons.forEach((b, i) => {
    const bw = 220, bx = PW / 2 - 40 - (buttons.length - i) * (bw + 24) + 24
    x.fillStyle = INK; x.fillRect(bx - 4, PH / 2 - 110, bw + 8, 78)
    x.fillStyle = '#ece6da'; x.fillRect(bx, PH / 2 - 106, bw, 70)
    x.fillStyle = INK; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.fillText(b, bx + bw / 2, PH / 2 - 70)
  })
  x.restore()
}

// ─────────────────────────────────────────── the scene
export function makeRun(cfg) {
  const DURATION = cfg.duration
  const hookOut = cfg.hook?.out || [2.6, 2.9]
  const S = { txt, rich, bubble, stamp, toast, circleCaught, star, pisces, level, speedLines, shadow, heartBits, pbox, drawPhone }
  // hook-kit effects: cfg.fx = [[name, opts, frame0?], …], e.g. ['slamTitle', HOOK, true], ['recordScratch', REC]
  // og social: sort the film's hook-kit fx into calm versions
  const RAW = cfg.fx || []
  const HU = cfg.hookUntil ?? 2.8
  const LASTS = RAW.filter(f => f[0] === 'slamTitle' && !f[2]).map(f => f[1])            // the story's last line: static
  const CAPS = RAW.filter(f => f[0] === 'recordScratch').map(f => f[1])                   // freeze captions: calm card
  const DIALOGS = RAW.filter(f => f[0] === 'glitch' && f[1].dialog !== false).map(f => f[1])   // glitch: dialog only
  const FX = RAW.flatMap(f => {
    const [name, o] = f
    if (name === 'slamTitle' || name === 'recordScratch' || name === 'glitch' || name === 'screenShake') return []
    if (name === 'whipZoom') return [[name, { ...o, from: 1 + ((o.from ?? 1.6) - 1) * 0.35, blur: 0, flash: 0, lines: false }]]
    if (name === 'achievement') return [[name, { ...o, y: Math.min(o.y ?? 1520, 1390) }]]
    if (name === 'caught') return [[name, { ...o, rec: false }]]
    return [f]
  })
  const RECS = []

  function frame(x, t) {
    let tw = t, frozen = null
    for (const f of cfg.freeze || []) if (t >= f[0] && t < f[1]) { tw = f[0]; frozen = f }
    const cam = cfg.camera ? cfg.camera(t) : { zoom: 1, dx: 0, dy: 0, rot: 0 }
    const zoom = cam.zoom ?? 1
    drawSky(x, tw, { ...SKY_H, zoom: SKY_H.zoom * (1 + (zoom - 1) * 0.3), dx: (cam.dx || 0) * 0.3, dy: (cam.dy || 0) * 0.3 })
    x.save()
    x.translate(540 + (cam.dx || 0), 1000 + (cam.dy || 0)); x.rotate(cam.rot || 0); x.scale(zoom, zoom); x.translate(-540, -1000 + (cfg.worldDy ?? 110))
    if (frozen) x.filter = 'saturate(0.35) contrast(1.15)'
    cfg.world(x, tw, S)
    x.filter = 'none'
    x.restore()
    if (frozen) {
      x.save(); x.fillStyle = 'rgba(6,4,18,0.18)'; for (let y = 560; y < 1500; y += 8) x.fillRect(0, y, 1080, 3); x.restore()
      const fk = pop01(t, frozen[0], 0.2, 2.6)
      if (!frozen[2]?.noTag) stamp(x, frozen[2]?.tag || '|| FREEZE', 290, 640, fk, { size: 40, col: BONE, rot: -0.05, fillc: 'rgba(16,10,40,0.92)', font: MONO })
    }
    // og social: the HUD waits until the static HOOK has gone, then fades in; no series bug, no category header bar
    const hk = (cfg.hud ? cfg.hud(t) : 1) * ease.outCubic(prog(t, HU, HU + 0.35))
    void drawBug; void drawCategory; void hookOut
    drawSplits(x, t, cfg, hk)
    drawTimer(x, t, cfg, hk)
    drawCam(x, t, cfg, hk)
    for (const c of CAPS) softCaption(x, t, c)
    for (const g of DIALOGS) softDialog(x, t, g)
    if (cfg.over) cfg.over(x, t, S)
    for (const L of LASTS) softTitle(x, t, L)
    drawChapter(x, t, cfg)
  }

  async function build(stage) {
    try { await Promise.all(["900 96px Inter", "800 40px Inter", "700 30px 'Space Mono'", "700 64px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return { start: 0, end: DURATION + 0.01, root, update(t) { frame(x, t); drawGrain(gx, t) } }
  }
  const MAIN = RECS.length ? HK.frozen(build, RECS) : build
  const fxScenes = FX.map(([name, o]) => HK[name](o))
  const SCENES = [MAIN, ...fxScenes]
  const CUES = [...(cfg.cues || []), ...FX.flatMap(([name, o]) => {
    if (name === 'whipZoom') return [['whoosh', +(o.at + 0.12).toFixed(3), 0.35, 0.04]]   // og: no boom / tom on the whip
    const c = HK[name + 'Cues']; return c ? c(o) : []
  }),
  ...CAPS.map(c => ['pop', +(c.at + 0.15).toFixed(3), 659.25, 0.025, 0]),
  ...DIALOGS.map(g => ['pop', +(g.at + 0.12).toFixed(3), 440, 0.03, 0])]
  if (false && cfg.ending?.type === 'loop') {   // og social: always a hard cut on the last story frame
    const len = cfg.ending.len ?? 0.4
    SCENES.push(HK.loopBack([MAIN, ...FX.filter(f => f[2]).map(([name, o]) => HK[name](o))], { duration: DURATION, len }))
    CUES.push(...HK.loopCues({ duration: DURATION, len }))
  }
  return { DURATION, SCENES, CUES }
}

// ─────────────────────────────────────────── sound helpers
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
/** a split landing: gold = bright bell + chip pop; red = low buzz-ish pluck */
export function splitCues(splits) {
  return splits.flatMap((r, i) => r.state === 'red'
    ? [['pluck', r.at, 220, 0.05, 0.3, 0], ['pluck', r.at + 0.08, 207.65, 0.045, 0.3, 0]]
    : r.state === 'skip' ? [['tick', r.at, 0.05], ['pop', r.at, 440, 0.03, 0]]
      : [['bell', r.at, r.state === 'gold' ? 1760 : 1318.51, 0.035, 0.9, 0.2], ['pop', r.at, NOTE[(i * 2) % 7] * 1.5, 0.045, 0.2]])
}
export const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const blips = (t0, d, every = 0.07, hz = 880, gain = 0.014) => Array.from({ length: Math.max(1, Math.floor(d / every)) }, (_, i) => ['pop', +(t0 + i * every).toFixed(3), hz * (1 + ((i * 5) % 3) * 0.12), gain, 0])
/** whip zoom curve: from `z0` at t0 to 1 at t1 (outExpo-ish) */
export const whip = (t, t0, t1, z0 = 1.8) => lerp(z0, 1, ease.outCubic(prog(t, t0, t1)))
/** a decaying shake offset at t after t0 */
export const shake = (t, t0, amp = 18, dur = 0.4) => { void t; void t0; void amp; void dur; return 0 }   // og social: no screen shakes

/** a phone notification banner that drops in from above to (cx, cy) at t0 and leaves at t1 */
export function notif(x, t, t0, t1, from, body, { cx = 540, cy = 640, w = 900, col = GOLD, icon = null } = {}) {
  if (t < t0 || t > t1 + 0.3) return
  const k = ease.outBack ? ease.outBack(prog(t, t0, t0 + 0.35)) : easeOutBack(prog(t, t0, t0 + 0.35))
  const o = outK(t, [t1, t1 + 0.3])
  const y = lerp(cy - 260, cy, clamp(k, 0, 1.2)) - (1 - o) * 200
  x.save(); x.globalAlpha *= clamp(o * 1.5)
  const h = 140
  pbox(x, cx - w / 2, y - h / 2, w, h, '#f4eefc', { b: 8, edge: INK })
  x.fillStyle = col; x.fillRect(cx - w / 2 + 24, y - 38, 76, 76); x.fillStyle = INK; x.fillRect(cx - w / 2 + 24, y + 38, 76, 4)
  if (icon) { x.font = `700 48px ${GLYPHF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(icon, cx - w / 2 + 62, y + 2) }
  x.textAlign = 'left'; x.textBaseline = 'middle'; x.letterSpacing = '1px'
  x.font = `700 24px ${MONO}`; x.fillStyle = '#6a6290'; x.fillText(from, cx - w / 2 + 124, y - 30)
  x.letterSpacing = '0px'; x.font = `800 40px ${INTER}`; x.fillStyle = INK
  const bw = x.measureText(body).width, lim = w - 160
  x.save(); x.translate(cx - w / 2 + 124, y + 20); if (bw > lim) x.scale(lim / bw, 1); x.fillText(body, 0, 0); x.restore()
  x.restore()
}
export const SNAIL = ['....SSS..', '...S.S.S.', '...S.SSS.', 'B..SSSS..', 'BBBBBBBBB', '.BBBBBBB.']
