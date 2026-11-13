// signs3kit — THE SIGNS AS… v3 (the social cut). v2 (signs2kit.js) plus what the feedback asked for:
//   • MUCH more padding: everything lives in a centred 0.70× box (756 × 1344 at (162, 250)), clear of the top tabs, the
//     right-hand buttons and the caption; only the sky and grain fill the frame.
//   • no card transitions: the stage panel never slides or flips; one panel stays put and the sign inside it changes
//     (the star pops in, the colour and name tab swap).
//   • no episode numbers (no "05 / 12"), no end card, no CTA, no logo. The only Align mark is a faint
//     "come align · join the beta" watermark, there the whole film.
//   • the closing beat is an Align-style match card ("ALIGNED"), the film's subtle nod to the app, then the last line.
// Same spec as v2: makeFilm({ title, accent, cameos, group, lesson: { text, chip }, last }), optional S.card = { a, b }
// (two sign ids for the closing match card; default the film's last two cameos' signs are not used, aries + libra).
// signs2kit — THE SIGNS AS… v2 (calm cut): the trsigns format re-timed for social. Everything the old per-film signs.js
// did, plus: (1) a SAFE AREA — all content (canvas + DOM text) is drawn inside a 0.78× box at (70, 200) so the platform
// UI (top tabs, right rail, bottom caption) never covers it; only the sky + grain fill the full frame; (2) SLOWER —
// 3.8 s per sign (was ~2.4), a longer hook, lesson and last line; (3) QUIET — ~20 sound cues instead of ~120
// (one soft landing per card, no word pops / ticks / card cuts); the films use music style 'lofi' at −20 LUFS.
// makeFilm(S) takes the same spec as before (beats are ignored). Props keep the old 1080×1920 coordinates.
//
// (original header follows)
// THE SIGNS AS… show kit: the shared look of Star Talk Trends format 13 (trsignswedding, trsignsroomies, trsignswaiting,
// trsignsdinner, trsignsmovie; promo/films/STARTALK-TRENDS.md §13). Every episode carries an identical copy of this file
// in its own folder, so the five films look like one format without touching another film's folder. Pure f(t) at update
// time; DOM / canvases are only made inside build(). Nothing touches `document` at module top level (the sound build
// imports this through scenes/index.js in node).
//
//   makeFilm(S) → { DURATION, STORY_END, SCENES, CUES, T }      the whole 45 s roll call from a spec:
//     S.title     'The signs as | *wedding guests.*'           the top headline (holds until the lesson)
//     S.accent    the title's accent colour
//     S.cameos    12 × { sign, cap, beats?, mood?, look?, tears?, star?: { x, y, s }, hops?: [local s], back?, front?, cues? }
//                 in zodiac order. cap = the caption (Inter 800, one *accent*, ' | ' = line break; two short lines). beats: 4 or 5 (all twelve sum to 52).
//                 mood / look / tears may be functions of the cameo's local time lt. back / front(x, t, lt, P, F) draw the
//                 cameo's props behind / in front of the star (P = { cx, cy, color, glyph, k, i }, F = the star's sprite
//                 frame); cues(t0) → extra sound cues.
//     S.group     { cap, draw?(x, t, lt), cues?(t0) }           the "everyone" photo after the roll call
//     S.lesson    { text, chip }                               the LESSON UNLOCKED beat (lesson.js)
//     S.last      { text, draw?(x, t, lt), cues?(t0) }          the last line before the end card
//   Timeline (108 bpm grid, BEAT(n) = 0.6 + n·0.5556): hook 0–2.82 (title + the twelve line up, then dive into the pips) ·
//   12 cameos 2.82–31.71 (each: the stage card whips in from the right, the star lands, the caption pops; the pip row
//   counts along) · group photo 31.71 · lesson 33.38 · last line 37.95 · end card 40.6.
//
//   helpers for the films' props: drawBits, sparkles, hearts, bubble, label, tearsCells, inSprite, starFrame, notes,
//   pop01, outK, popOut, BEAT, colours
import { clamp, lerp, prog, ease, el } from '../src/lib.js'
import { fill } from '../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from './sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from './wheel.js'
import { drawStarChar, signStar } from './startalk.js'
import { buildLesson, lessonCues, lessonTimes, popText } from './lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', MINT = '#7dffb0', SKYB = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
export const BEAT = n => 0.6 + n * (60 / 108)
export const SIGN_IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const NAMES = ['ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAGITTARIUS', 'CAPRICORN', 'AQUARIUS', 'PISCES']
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const r3 = v => Math.round(v * 1000) / 1000

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  if (alpha <= 0.01 || cell <= 0.01) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch] || '#f0f'; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

export const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** little pixel hearts floating up from (cx, cy) from t0 */
export function hearts(x, t, cx, cy, t0, { n = 6, life = 2.4, spread = 160, cell = 7, seed = 1, alpha = 1 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const born = t0 + i * (life / n) * 0.5
    const ph = (t - born) / 1.6
    if (ph < 0 || ph > 1 || t > t0 + life + 1.6) continue
    const sx = Math.sin(i * 2.7 + seed) * spread * 0.5
    drawBits(x, HEART, { H: i % 2 ? PINK : '#ff4f86', W: '#fff' }, cx + sx + Math.sin(ph * 6 + i) * 14, cy - ph * 260, cell * (0.6 + 0.4 * Math.min(1, ph * 4)), { alpha: alpha * (1 - ease.inQuad(ph)) })
  }
}
const NOTE_BM = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
/** music notes drifting up */
export function notes(x, t, cx, cy, { n = 4, cell = 6, col = GOLD, alpha = 1, seed = 0 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.7 + i / n + seed * 0.17) % 1 + 1) % 1
    drawBits(x, NOTE_BM, { X: i % 2 ? col : BONE }, cx + Math.sin(i * 2.3 + seed) * 120 + Math.sin(ph * 7) * 16, cy - ph * 220, cell, { alpha: alpha * Math.sin(Math.PI * ph) })
  }
}

/** a pixel speech bubble (bone card, ink outline, a little tail) */
export function bubble(x, cx, cy, text, k, { size = 34, col = BONE, ink = INK, tail = 'bl', weight = 800, font = INTER } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = String(text).split('|').map(s => s.trim())
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 44, lh = size * 1.18, h = lines.length * lh + 26
  x.fillStyle = ink; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail === 'br' ? w / 2 - 50 : tail === 'bc' ? -8 : -w / 2 + 34
  x.fillStyle = ink; x.fillRect(tx - 4, h / 2 + 4, 20, 14); x.fillStyle = col; x.fillRect(tx, h / 2, 12, 12)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 13 + lh * (i + 0.5) + 2))
  x.restore()
}
/** a small tilted sticker label (Inter 800 on a coloured card) */
export function label(x, cx, cy, text, k, { size = 30, bg = GOLD, color = INK, rot = -0.05, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 32, h = size + 22
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 6, -h / 2 + 8, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops and squash
const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9, x, top: cy - S / 2 + 2 * cell }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = SKYB; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
    ctx.fillStyle = SKYB; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** draw a sign star (with optional tears) and return its frame */
export function signChar(x, t, id, cx, cy, size, { mood = 'happy', look, hops, pop = 1, alpha = 1, seed = 3, tears = 0, glow = 1.05, glyph = true, squash = 0 } = {}) {
  const st = signStar(id)
  const o = { color: st.color, glyph: glyph && size >= 120 ? st.glyph : null, mood, look, hops, pop, alpha, seed, glow, squash }
  drawStarChar(x, cx, cy, size, t, o)
  const F = starFrame(cx, cy, size, t, o)
  if (tears && pop > 0.3) inSprite(x, F, () => tearsCells(x, t, tears))
  return F
}

// ── the format bug: a pixel zodiac ring + "THE SIGNS AS…" (Inter 800, letter-spaced small caps, gold)
export function buildBug(root, { at = 0.3 }) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '44px', height: '44px', imageRendering: 'pixelated' }, box)
  ic.width = 44; ic.height = 44
  const ix = ic.getContext('2d')
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 - Math.PI / 2; ix.fillStyle = signStar(SIGN_IDS[i]).color; ix.fillRect(Math.round(22 + Math.cos(a) * 16) - 3, Math.round(22 + Math.sin(a) * 16) - 3, 6, 6) }
  ix.fillStyle = GOLD; ix.fillRect(19, 19, 6, 6)
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'THE&nbsp;SIGNS&nbsp;AS…')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── the stage card (one per cameo): a dark glass panel lit in the sign's colour, a name tab on top, a faint glyph
const PHOTO_Y = 1090                     // the group photo's top row (below the lesson text)
export const PANEL = { cx: 540, cy: 850, w: 900, h: 780 }
const step = (x, l, tp, w, h, P, col) => { x.fillStyle = col; x.fillRect(l + 2 * P, tp, w - 4 * P, h); x.fillRect(l, tp + 2 * P, w, h - 4 * P); x.fillRect(l + P, tp + P, w - 2 * P, h - 2 * P) }
function drawPanel(x, t, i, color, glyph) {
  const { cx, cy, w, h } = PANEL, l = cx - w / 2, tp = cy - h / 2, P = 10
  x.save()
  x.shadowColor = color; x.shadowBlur = 40; x.globalAlpha = 0.5; step(x, l, tp, w, h, P, color); x.restore()
  x.save()
  step(x, l, tp, w, h, P, color)
  step(x, l + P, tp + P, w - 2 * P, h - 2 * P, P, INK)
  step(x, l + 2 * P, tp + 2 * P, w - 4 * P, h - 4 * P, P, '#140c30')
  x.save(); x.beginPath(); x.rect(l + 2 * P, tp + 2 * P, w - 4 * P, h - 4 * P); x.clip()
  const g = x.createRadialGradient(cx, cy + 40, 20, cx, cy + 40, 520)
  g.addColorStop(0, color + '66'); g.addColorStop(0.55, color + '22'); g.addColorStop(1, 'rgba(20,12,48,0)')
  x.fillStyle = g; x.fillRect(l, tp, w, h)
  // spotlight floor ellipse
  x.fillStyle = 'rgba(255,241,200,0.08)'; x.beginPath(); x.ellipse(cx, cy + 300, 330, 60, 0, 0, Math.PI * 2); x.fill()
  // the big faint glyph
  x.globalAlpha = 0.1; x.fillStyle = color; x.font = `700 560px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(glyph + '︎', cx + 180 + 8 * Math.sin(t * 0.8 + i), cy - 40)
  x.restore()
  // name tab
  x.font = `700 40px ${MONO}`; x.letterSpacing = '4px'
  const name = `${glyph}︎ ${NAMES[i]}`, tw = x.measureText(name).width + 56, th = 64
  const tl = cx - tw / 2, tt = tp - th / 2 - 4
  step(x, tl - 6, tt - 6, tw + 12, th + 12, 6, INK)
  step(x, tl, tt, tw, th, 6, color)
  x.fillStyle = INK; x.textAlign = 'center'; x.fillText(name, cx + 2, tt + th / 2 + 2)
  x.restore()
}

// the closing match card: two sign cards slide together and an ALIGNED chip pops between them, like a match in the app
function matchCard(x, t, lt, { a = 'aries', b = 'libra', chip = 'ALIGNED' }) {
  const k = ease.outBack ? ease.outBack(clamp(lt / 0.6)) : ease.outCubic(clamp(lt / 0.6))
  const join = ease.inOutCubic(prog(lt, 0.5, 1.3))
  const CW = 330, CH = 460, Y = 1080
  const one = (id, side) => {
    const st = signStar(id), cx = 540 + side * lerp(300, 178, join), rot = side * lerp(0.16, 0.07, join)
    x.save(); x.translate(cx, Y + (1 - k) * 500); x.rotate(rot)
    x.shadowColor = st.color; x.shadowBlur = 36
    x.fillStyle = '#140c30'; x.beginPath(); x.roundRect(-CW / 2, -CH / 2, CW, CH, 26); x.fill()
    x.shadowBlur = 0; x.lineWidth = 6; x.strokeStyle = st.color; x.stroke()
    x.lineWidth = 2; x.strokeStyle = 'rgba(239,230,214,0.35)'; x.beginPath(); x.roundRect(-CW / 2 + 16, -CH / 2 + 16, CW - 32, CH - 32, 16); x.stroke()
    x.fillStyle = st.color; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(`${st.glyph}︎ ${id.toUpperCase()}`, 0, CH / 2 - 52)
    x.restore()
    signChar(x, t, id, cx, Y - 40 + (1 - k) * 500, 190, { mood: lt > 1.3 ? 'sparkle' : 'happy', seed: side > 0 ? 41 : 42, hops: [T0h(lt, t, 1.35)], tears: id === 'pisces' ? 2 : 0, glyph: false })
  }
  const T0h = (lt, t, d) => t - lt + d
  if (k <= 0.01) return
  one(a, -1); one(b, 1)
  const c = pop01(t, t - lt + 1.3, 0.35, 2.4)
  if (c > 0.01) { label(x, 540, Y + 250, `✦ ${chip} ✦`, c, { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }); hearts(x, t, 540, Y - 150, t - lt + 1.4, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 9 }) }
}

// ═══════════════════════════════════════════ the film (v3: big safe area, no transitions, no end card)
export const SAFE = { x: 162, y: 250, s: 0.70 }           // content box: 756 × 1344 at (162, 250)
export const CARD = 3.8                                     // seconds per sign
const HOOK = 3.6
export function makeFilm(S) {
  const CAM = S.cameos.map((c, i) => { const t0 = r3(HOOK + i * CARD); return { ...c, i, t0, t1: r3(t0 + CARD), st: signStar(c.sign) } })
  const SOLO = S.solo || (S.cast ? 'cast' : null), N = S.cameos.length   // story mode: S.cast = [2–4 sign ids], cards in any order          // solo: the whole film is one sign, N cards (6–10)
  const camEnd = HOOK + N * CARD                             // 49.2 for twelve
  const T = { title: 0.2, bug: 0.45, grid: 0.7, dive: [3.0, 3.6], group: r3(camEnd), lesson: r3(camEnd + 3.2) }
  // endings vary film to film (S.ending): 'lesson' = lesson beat + last line · 'callback' = straight to a last line that
  // calls back a card's joke (S.last.draw) · 'group' = the group beat is the ending (no lesson, no last line) ·
  // 'card' = lesson + last line over the two-card match (use rarely; it's the most promotional)
  const END = S.ending || (S.card ? 'card' : 'lesson'), HAS_LESSON = END === 'card' || END === 'lesson'
  S.last = S.last || { text: '' }; S.lesson = S.lesson || { text: '', chip: '' }
  let STORY_END
  if (HAS_LESSON) {
    T.lessonOut = [r3(T.lesson + 5.6), r3(T.lesson + 5.9)]
    T.last = T.lessonOut[1]
    STORY_END = r3(T.last + (END === 'card' ? 4.4 : 3.8))
  } else if (END === 'callback') {
    T.lesson = r3(T.group + 3.4); T.lessonOut = [T.lesson, T.lesson]; T.last = T.lesson
    STORY_END = r3(T.last + 4.0)
  } else {                                                     // 'group'
    STORY_END = r3(T.group + 5.0); T.lesson = T.lessonOut = T.last = 1e6
    T.lessonOut = [1e6, 1e6]
  }
  const FADE = END === 'card' || END === 'callback' ? [T.last, T.last + 0.45] : null   // the stars clear for the closing beat
  T.out = [r3(STORY_END - 0.5), r3(STORY_END - 0.05)]
  const DURATION = STORY_END                                 // no end card
  T.cams = CAM.map(c => c.t0)
  const LESSON = { at: HAS_LESSON ? T.lesson : 1e6, out: T.lessonOut, text: S.lesson.text, chip: S.lesson.chip, accentColor: S.accent || GOLD, dim: 0.7, top: 330, textTop: 520 }   // raised: clears the group photo's bunting

  const GRID = i => ({ x: 540 + ((i % 4) - 1.5) * 225, y: 690 + Math.floor(i / 4) * 235, s: 150 })
  const PIP = i => ({ x: 540 + (i - 5.5) * 80, y: 1660, s: 62 })
  const PHOTO = i => ({ x: 540 + ((i % 6) - 2.5) * 165, y: PHOTO_Y + Math.floor(i / 6) * 210 - (i % 2 ? 0 : 18), s: 165 })

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 40px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const skyC = layerCanvas(root), sx = skyC.getContext('2d')
    // the safe box: every DOM layer and the content canvas live in here, scaled
    const box = el('div', { position: 'absolute', left: SAFE.x + 'px', top: SAFE.y + 'px', width: '1080px', height: '1920px', transformOrigin: '0 0', transform: `scale(${SAFE.s})`, pointerEvents: 'none' }, root)
    const cv = layerCanvas(box), x = cv.getContext('2d')
    const title = popText(box, S.title, { top: 150, size: 92, accentSize: 124, at: T.title, gap: 0.12, late: 1, lateAt: T.title + 0.8, wobble: false, accentColor: S.accent || GOLD })
    const caps = CAM.map(c => popText(box, c.cap, { top: 1290, size: 80, accentSize: 106, at: c.t0 + 0.25, gap: 0.09, accentColor: c.st.color, fit: true }))
    const gcap = popText(box, S.group.cap, { top: 1500, size: 84, accentSize: 112, at: T.group + 0.6, gap: 0.12, accentColor: S.accent || GOLD })
    const last = popText(box, S.last.text, { top: 300, size: 120, accentSize: 168, at: T.last + 0.2, gap: 0.16, late: 1, lateAt: T.last + 0.5, wobble: false, accentColor: S.accent || GOLD, fit: true })
    // a very subtle invite where the old "THE SIGNS AS…" bug sat (top-left of the safe box)
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1830px', textAlign: 'center', font: `700 34px ${MONO}`, letterSpacing: '0.16em', color: BONE, opacity: 0, whiteSpace: 'nowrap', pointerEvents: 'none' }, box, '✦ come align · join the beta ✦')
    const lesson = buildLesson(root, LESSON)   // full frame: its scrim must cover the whole picture (text sits mid-frame)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    // solo films: one big star instead of the twelve. It pops in for the hook, hides while the cards play (each card
    // has it), comes back for the group beat, and clears for the closing match card.
    function soloStar(t) {
      const inHook = t < T.dive[1], inGroup = t >= T.group && t < (FADE ? FADE[1] : STORY_END)
      if (!inHook && !inGroup) return
      const k = inHook ? pop01(t, T.grid, 0.45, 1.8) * (1 - ease.inCubic(prog(t, T.dive[0], T.dive[1]))) : pop01(t, T.group, 0.45, 1.8) * popOut(t, FADE || T.out)
      const hops = inHook ? [T.grid + 0.6, T.grid + 1.6] : [T.group + 0.7, T.group + 1.9]
      if (S.cast) {
        const n = S.cast.length, size = n <= 2 ? 300 : n === 3 ? 240 : 200, gap = n <= 2 ? 330 : n === 3 ? 270 : 220
        S.cast.forEach((id, i) => signChar(x, t, id, 540 + (i - (n - 1) / 2) * gap, 860, size, { mood: inGroup ? (S.group.moods?.[i] || S.group.mood || 'sparkle') : 'happy', pop: k, hops: hops.map(h => h + i * 0.12), seed: 7 + i, tears: id === 'pisces' ? 2 : 0 }))
      } else signChar(x, t, SOLO, 540, 860, 360, { mood: inGroup ? (S.group.mood || 'sparkle') : 'happy', pop: k, hops, seed: 7, tears: SOLO === 'pisces' ? 2 : 0 })
    }
    function mini(t, i) {
      const id = SIGN_IDS[i]
      const g = GRID(i), p = PIP(i), ph = PHOTO(i)
      const pin = pop01(t, T.grid + i * 0.12, 0.4, 2)
      const dv = ease.inOutCubic(prog(t, T.dive[0] + i * 0.02, T.dive[1] - 0.1 + i * 0.02))
      const gp = ease.inOutCubic(prog(t, T.group + i * 0.05, T.group + 0.7 + i * 0.05))
      let X = lerp(g.x, p.x, dv), Y = lerp(g.y, p.y, dv) - Math.sin(Math.PI * dv) * 120, s = lerp(g.s, p.s, dv)
      X = lerp(X, ph.x, gp); Y = lerp(Y, ph.y, gp) - Math.sin(Math.PI * gp) * 160; s = lerp(s, ph.s, gp)
      const cur = CAM.find(c => t >= c.t0 && t < c.t1)
      const isCur = cur && cur.i === i && gp === 0
      const done = cur ? i < cur.i : t >= T.group
      let mood = 'happy', alpha = 1, look
      if (dv >= 1 && gp <= 0) {
        if (isCur) { s *= 1.35; mood = 'sparkle'; Y -= 8 }
        else if (done) { alpha = 0.75; mood = 'happy' }
        else { alpha = 0.45; mood = 'neutral'; look = [0, -1] }
      }
      if (t < T.dive[0]) mood = i === 11 ? 'wide' : i % 3 === 1 ? 'wink' : 'happy'
      if (gp > 0) { mood = S.group.moods?.[i] || 'happy'; alpha = 1 }
      const fin = popOut(t, FADE || T.out)
      const hops = isCur ? [cur.t0 + 0.1] : gp > 0 ? [T.group + 0.8 + i * 0.05, T.group + 2.0] : [T.grid + 0.8 + i * 0.12]
      const tears = i === 11 ? (gp > 0 ? 3 : 1) : 0
      return signChar(x, t, id, X, Y, s, { mood, look, alpha, pop: pin * fin, seed: 20 + i, hops, tears, glow: 0.9, glyph: s >= 120 })
    }

    // each card plays its own beats on a stretched local clock: lt runs 0…2.4 over the card's first 3.1 s, so the old
    // prop timings (written for ~2.4 s cards) play slower and then hold
    const STRETCH = 3.1 / 2.4
    function cameo(t, c) {
      if (t < c.t0 || t >= c.t1) return
      // no transition: the panel is the same object every card; it only swaps colour. The first card fades in, the last out.
      const fade = c.i === 0 ? ease.outCubic(prog(t, c.t0 - 0.05, c.t0 + 0.3)) : c.i === N - 1 ? 1 - ease.inCubic(prog(t, c.t1 - 0.35, c.t1)) : 1
      const ox = 0, rot = 0
      const lt = Math.min(2.4, (t - c.t0) / STRETCH)
      const tl = c.t0 + lt                                    // the card's slowed clock, for props that read t
      x.save(); x.globalAlpha = fade; x.translate(540 + ox, 850); x.rotate(rot); x.translate(-540, -850)
      drawPanel(x, t, SIGN_IDS.indexOf(c.sign), c.st.color, c.st.glyph)
      const sp = { x: 540 + (c.star?.x ?? 0), y: 880 + (c.star?.y ?? 0), s: c.star?.s ?? 300 }
      const k = pop01(t, c.t0 + 0.05, 0.45, 1.8)
      const P = { cx: 540, cy: 850, color: c.st.color, glyph: c.st.glyph, k, i: c.i, t0: c.t0, t1: c.t1 }
      const val = v => typeof v === 'function' ? v(lt) : v
      const opts = { mood: val(c.mood) ?? 'happy', look: val(c.look), hops: [c.t0 + 0.1, ...(c.hops || []).slice(0, 3).map(h => c.t0 + h * STRETCH)], seed: 3 + c.i, tears: val(c.tears) ?? 0, squash: val(c.squash) ?? 0 }
      const F0 = starFrame(sp.x, sp.y, sp.s, t, { pop: k, hops: opts.hops, seed: opts.seed })
      if (c.back) { x.save(); c.back(x, tl, lt, P, F0); x.restore() }
      const F = c.hideStar ? F0 : signChar(x, t, c.sign, sp.x, sp.y, sp.s, { ...opts, pop: k })
      if (c.front) { x.save(); c.front(x, tl, lt, P, F); x.restore() }
      x.restore()
    }

    return {
      start: 0, end: STORY_END + 1, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3.5))
        drawSky(sx, t, t < 3.5 ? { ...SKY_H, zoom: lerp(1.4, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
        x.clearRect(0, 0, 1080, 1920)
        // a soft photo flash (gentler than v1), full frame
        { const dF0 = t - (T.group + 1.0); if (dF0 > 0 && dF0 < 0.4) { sx.fillStyle = `rgba(255,250,235,${(0.3 * (1 - dF0 / 0.4)).toFixed(3)})`; sx.fillRect(0, 0, 1080, 1920) } }
        const dF = t - (T.group + 1.0)
        if (t < STORY_END) {
          for (const c of CAM) cameo(t, c)
          const gk = pop01(t, T.group, 0.5, 1.6) * popOut(t, FADE || T.out)
          if (!SOLO && gk > 0.01 && t >= T.group) {
            x.save(); x.globalAlpha = clamp(gk)
            for (let i = 0; i < 13; i++) { const fx = 80 + i * 76, fy = PHOTO_Y - 220 + 26 * Math.sin(Math.PI * i / 12); x.fillStyle = signStar(SIGN_IDS[i % 12]).color; x.beginPath(); x.moveTo(fx - 18, fy); x.lineTo(fx + 18, fy); x.lineTo(fx, fy + 34); x.fill() }
            x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 3; x.beginPath(); for (let i = 0; i <= 24; i++) { const fx = 60 + i * 40, fy = PHOTO_Y - 220 + 26 * Math.sin(Math.PI * i / 24); i ? x.lineTo(fx, fy) : x.moveTo(fx, fy) } x.stroke()
            x.restore()
            if (S.group.draw) { x.save(); S.group.draw(x, t, t - T.group); x.restore() }
          }
          if (SOLO) soloStar(t)
          else for (let i = 0; i < 12; i++) mini(t, i)
          if (S.last.draw && t >= T.last) { x.save(); S.last.draw(x, t, t - T.last); x.restore() }
          if (END === 'card' && t >= T.last) matchCard(x, t, t - T.last, S.card || {})

        }
        title.update(t, outK(t, [T.lesson - 0.05, T.lesson + 0.25]))
        CAM.forEach((c, i) => caps[i].update(t, outK(t, [c.t1 - 0.25, c.t1 + 0.02])))
        gcap.update(t, outK(t, [T.lesson, T.lesson + 0.3]))
        last.update(t, popOut(t, T.out))
        lesson.update(t)
        tag.style.opacity = String((0.34 * clamp((t - 0.6) / 0.8)).toFixed(3))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.35)))
        drawGrain(gx, t)
      },
    }
  }

  const SCENES = [build]

  // QUIET cue sheet: one soft landing per card, a few accents, nothing per word
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const CUES = [
    ['pluck', r3(T.title + 0.8), 1174.66, 0.022, 0.6, 0],
    ['whoosh', T.dive[0], 0.5, 0.02],
    ...CAM.flatMap(c => [['pop', r3(c.t0 + 0.08), NOTE[c.i % 7], 0.018, 0], ...(c.keyCue ? [c.keyCue(c.t0)] : [])]),
    ['whoosh', T.group, 0.5, 0.02], ['glitter', r3(T.group + 1.0), r3(T.group + 1.4)],
    ...(HAS_LESSON ? [['glitter', r3(T.lesson + 0.1), r3(T.lesson + 0.8)], ['bell', r3(T.lesson + 0.4), 1760, 0.018, 1.6, 0]] : []),
    ...(END !== 'group' ? [['pluck', r3(T.last + 0.5), 1174.66, 0.022, 0.8, 0]] : []),
  ]
  return { DURATION, STORY_END, SCENES, CUES, T, CAM }
}
