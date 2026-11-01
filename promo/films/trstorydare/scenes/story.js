// STORYTIME kit: the shared look of Star Talk Trends format 19, "STORYTIME: HOW WE MET" (trstoryskip, trstorydare,
// trstorypizza, trstoryearly, trstorypun; promo/films/STARTALK-TRENDS.md §19). Every episode carries an identical copy of
// this file in its own folder, so the five films look like one format without touching another film's folder. Pure f(t)
// at update time; DOM / canvases are only made inside build(). Nothing touches `document` at module top level (the sound
// build imports this through scenes/index.js in node).
//
// The format: a star tells "how we met" to camera from their couch (Pisces, the roommate, on the other end of the couch,
// has heard this story many times and cries every time), with sticky auto-captions and quick cutaway flashbacks shown as
// a rewound clip (warm tint, scanlines, "▶ FLASHBACK", a timestamp chip) with the storyteller reacting in a little circle.
//
//   makeFilm(S) → { DURATION, STORY_END, SCENES, CUES, T, SEG, CUTS }
//     S.id, S.key, S.seed       film id, music key (cinematic), music seed
//     S.accent                  the film's accent colour (headline accents, captions' active word, PiP ring)
//     S.narrator / S.partner    sign ids: the storyteller and the one they met
//     S.heads                   5 headlines, one per segment ('Text | *accent.*')
//     S.stamps                  5 entries: the flashback timestamp chip text for flash segments (null for talk)
//     S.lines                   the storyteller's sticky captions: [{ t, text, end? }] (absolute t; *word* = accent).
//                               Each line ≤ ~46 chars and holds ≥ 1.5 s after its last word (checked here: throws).
//     S.mood(t)                 → { mood, look } for the storyteller (talk segments and the PiP)
//     S.hops                    extra storyteller hops (absolute t)
//     S.flash                   [f1, f2]: (x, t, lt, K) draw the flashback scene (clipped to K.FR by the kit)
//     S.talk(x, t, K)           optional: props drawn over the room in talk segments (after the stars)
//     S.room(x, t, K)           optional: background gags in the room (drawn before the couch)
//     S.photo(x, cx, cy, w, h, t)   optional: what's in the framed photo on the wall
//     S.partnerIn               when the partner pops into the room in the payoff (default 28.3)
//     S.partnerMood(t)          → { mood, look } for the partner in the room
//     S.lesson { text, chip }   the LESSON UNLOCKED beat (lesson.js)
//     S.last { text, draw? }    the last line before the end card
//     S.cues                    extra sound cues;  S.music  { breakdown: [..], hits: [..] } overrides
//   Timeline (108 bpm grid, BEAT(n) = 0.6 + n·0.5556):
//     talk 0–5.6 (hook) · FLASH 5.6–13.93 · talk 13.93–18.38 · card cut 18.38 · FLASH 18.38–27.82 · talk 27.82–40.6
//     (payoff: the partner pops in ~28.3) · LESSON 33.38 · last line 37.95 · end card 40.6.
//
//   helpers for the films' props: drawBits, sparkles, hearts, notes, bubble, label, signChar, starFrame, inSprite,
//   tearsCells, drawCafe, drawTable, drawTalkCard, drawMysteryCard, drawPhoneFrame, pop01, outK, popOut, BEAT, colours
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', MINT = '#7dffb0', SKYB = '#8fe3ff', ROSE = '#ff7eb6'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const r3 = v => Math.round(v * 1000) / 1000

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

/** a pixel speech bubble (bone card, ink outline, a little tail); '|' = line break */
export function bubble(x, cx, cy, text, k, { size = 34, col = BONE, ink = INK, tail = 'bl', weight = 800, font = INTER, color } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = String(text).split('|').map(s => s.trim())
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 44, lh = size * 1.18, h = lines.length * lh + 26
  x.fillStyle = ink; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  if (tail) {
    const tx = tail === 'br' ? w / 2 - 50 : tail === 'bc' ? -8 : -w / 2 + 34
    x.fillStyle = ink; x.fillRect(tx - 4, h / 2 + 4, 20, 14); x.fillStyle = col; x.fillRect(tx, h / 2, 12, 12)
  }
  x.fillStyle = color || ink; x.textAlign = 'center'; x.textBaseline = 'middle'
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
export function signChar(x, t, id, cx, cy, size, { mood = 'happy', look, hops, pop = 1, alpha = 1, seed = 3, tears = 0, glow = 1.05, glyph = true, squash = 0, blink } = {}) {
  const st = id === 'stars' ? { color: '#f7cf68', glyph: null } : signStar(id)
  const o = { color: st.color, glyph: glyph && size >= 120 ? st.glyph : null, mood, look, hops, pop, alpha, seed, glow, squash, blink }
  drawStarChar(x, cx, cy, size, t, o)
  const F = starFrame(cx, cy, size, t, o)
  if (tears && pop > 0.3) inSprite(x, F, () => tearsCells(x, t, tears))
  return F
}

// ── shared props
const TISSUE_BOX = ['....WW....', '...WWWW...', 'BBBBBBBBBB', 'BLLLLLLLLB', 'BLPLLPLLLB', 'BLLLLLLPLB', 'BBBBBBBBBB']
export const drawTissues = (x, cx, cy, cell = 9) => drawBits(x, TISSUE_BOX, { W: '#ffffff', B: '#4fa6d8', L: '#bfe6ff', P: '#ff9fc0' }, cx, cy, cell)

/** a café / restaurant interior filling rect R (warm wall, a night window, pendant lamps) */
export function drawCafe(x, t, R, { wall = '#4a2a48', wall2 = '#3a2040', win = true, lamps = [0.25, 0.75], tableY = null, cloth = '#b8434f' } = {}) {
  const g = x.createLinearGradient(0, R.y, 0, R.y + R.h)
  g.addColorStop(0, wall); g.addColorStop(1, wall2)
  x.fillStyle = g; x.fillRect(R.x, R.y, R.w, R.h)
  // wainscot
  x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(R.x, R.y + R.h * 0.62, R.w, R.h * 0.38)
  x.fillStyle = 'rgba(255,220,170,0.12)'; x.fillRect(R.x, R.y + R.h * 0.62, R.w, 6)
  if (win) {
    const wx = R.x + R.w * 0.5 - 170, wy = R.y + 90, ww = 340, wh = 250
    x.fillStyle = INK; x.fillRect(wx - 12, wy - 12, ww + 24, wh + 24)
    x.fillStyle = '#0e1a3a'; x.fillRect(wx, wy, ww, wh)
    for (let i = 0; i < 22; i++) { const sx = wx + ((i * 97) % ww), sy = wy + ((i * 53) % wh), a = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + i)); x.fillStyle = `rgba(255,246,220,${a.toFixed(2)})`; x.fillRect(sx, sy, 4, 4) }
    x.fillStyle = '#f4e8cc'; x.fillRect(wx + ww - 90, wy + 40, 36, 36); x.fillStyle = '#0e1a3a'; x.fillRect(wx + ww - 80, wy + 34, 30, 30)
    x.fillStyle = INK; x.fillRect(wx + ww / 2 - 6, wy, 12, wh); x.fillRect(wx, wy + wh / 2 - 6, ww, 12)
  }
  for (const f of lamps) {
    const lx = R.x + R.w * f, ly = R.y + 150
    x.fillStyle = INK; x.fillRect(lx - 2, R.y, 4, 120)
    const gl = x.createRadialGradient(lx, ly + 20, 0, lx, ly + 20, 260); gl.addColorStop(0, 'rgba(255,214,150,0.32)'); gl.addColorStop(1, 'rgba(255,214,150,0)')
    x.fillStyle = gl; x.fillRect(lx - 260, ly - 240, 520, 520)
    drawBits(x, ['..KKKK..', '.KGGGGK.', 'KGGGGGGK', 'YYYYYYYY'], { K: INK, G: '#c98a1f', Y: '#ffe9a8' }, lx, ly, 10, { outline: null })
  }
  if (tableY != null) drawTable(x, R.x + R.w / 2, tableY, R.w * 0.9, { cloth })
}
/** a table top (cloth) seen from the front, top edge at y */
export function drawTable(x, cx, y, w, { cloth = '#b8434f', h = 170 } = {}) {
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, y - 6, w + 12, h + 12)
  x.fillStyle = cloth; x.fillRect(cx - w / 2, y, w, h)
  x.fillStyle = 'rgba(255,255,255,0.14)'; x.fillRect(cx - w / 2, y, w, 14)
  x.fillStyle = 'rgba(255,255,255,0.08)'
  for (let i = 0; i < w; i += 60) x.fillRect(cx - w / 2 + i, y + 14, 30, h - 14)
}

/** a pixel talk card: gold border, "TALK CARD" tab, the question in Inter 800 ('|' = line break) */
export function drawTalkCard(x, cx, cy, w, text, { rot = 0, k = 1, accent = GOLD } = {}) {
  if (k <= 0.01) return
  const h = w * 1.25
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 14, -h / 2 + 18, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2, w + 12, h); x.fillRect(-w / 2, -h / 2 - 6, w, h + 12)
  x.fillStyle = accent; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#1e1445'; x.fillRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
  x.fillStyle = accent; x.font = `700 ${Math.round(w * 0.075)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('TALK CARD', 0, -h / 2 + w * 0.13)
  x.fillRect(-w * 0.3, -h / 2 + w * 0.2, w * 0.6, 4)
  x.fillStyle = BONE; const fs = Math.round(w * 0.1); x.font = `800 ${fs}px ${INTER}`
  const lines = text.split('|').map(s => s.trim())
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * fs * 1.2 + w * 0.08))
  drawPixelStar(x, 0, h / 2 - w * 0.14, w * 0.12, 2, accent)
  x.restore()
}

/** a blind mystery card. flip: 0 = back (veiled, "?") … 1 = face up (traits + veiled face; face: 0…1 reveals fn) */
export function drawMysteryCard(x, t, cx, cy, w, { rot = 0, k = 1, flip = 1, traits = [], face = 0, faceFn = null, accent = LAV, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  const h = w * 1.5
  const c = Math.cos(Math.PI * clamp(flip)), sx = Math.abs(c), front = flip > 0.5
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k * Math.max(0.02, sx), k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 14, -h / 2 + 18, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2, w + 12, h); x.fillRect(-w / 2, -h / 2 - 6, w, h + 12)
  if (!front) {
    x.fillStyle = '#3a2470'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#2a1856'; for (let j = 0; j < h; j += 24) for (let i = (j / 24) % 2 ? 12 : 0; i < w; i += 24) x.fillRect(-w / 2 + i, -h / 2 + j, 12, 12)
    x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32)
    x.fillStyle = GOLD; x.font = `800 ${Math.round(w * 0.42)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, 4)
  } else {
    x.fillStyle = '#f4e8cc'; x.fillRect(-w / 2, -h / 2, w, h)
    // the face window: veiled (swirly fog) until face → 1
    const fw = w - 40, fh = h * 0.46, fy = -h / 2 + 20
    x.fillStyle = '#2a1f55'; x.fillRect(-fw / 2, fy, fw, fh)
    if (faceFn && face > 0) { x.save(); x.beginPath(); x.rect(-fw / 2, fy, fw, fh); x.clip(); faceFn(x, 0, fy + fh / 2, fw, fh); x.restore() }
    if (face < 1) {
      x.save(); x.globalAlpha *= 1 - ease.inOutCubic(clamp(face))
      x.fillStyle = accent; x.fillRect(-fw / 2, fy, fw, fh)
      for (let j = 0; j < fh; j += 16) for (let i = 0; i < fw; i += 16) {
        const v = Math.sin(i * 0.05 + j * 0.07 + t * 1.6) + Math.sin(i * 0.11 - t)
        if (v > 0.4) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-fw / 2 + i, fy + j, 16, 16) }
      }
      x.fillStyle = INK; x.font = `700 ${Math.round(w * 0.07)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('FACE LAST', 0, fy + fh / 2)
      x.restore()
    }
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    const fs = Math.round(w * 0.085); x.font = `800 ${fs}px ${INTER}`
    traits.forEach((s, i) => x.fillText(s, 0, fy + fh + 50 + i * fs * 1.45))
  }
  x.restore()
}

/** a big pixel phone (screen rect returned so callers can draw inside) */
export function drawPhoneFrame(x, cx, cy, w, h, { title = '', alpha = 1 } = {}) {
  const C = 8
  x.save(); x.globalAlpha *= alpha
  const l = cx - w / 2, tp = cy - h / 2
  x.fillStyle = INK; x.fillRect(l + C, tp, w - 2 * C, h); x.fillRect(l, tp + C, w, h - 2 * C)
  x.fillStyle = '#3a2d74'; x.fillRect(l + 2 * C, tp + C, w - 4 * C, h - 2 * C); x.fillRect(l + C, tp + 2 * C, w - 2 * C, h - 4 * C)
  const S = { x: l + 3 * C, y: tp + 3 * C, w: w - 6 * C, h: h - 6 * C }
  x.fillStyle = '#120c2a'; x.fillRect(S.x, S.y, S.w, S.h)
  if (title) { x.fillStyle = '#1f1747'; x.fillRect(S.x, S.y, S.w, 70); x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, cx, S.y + 38) }
  x.fillStyle = INK; x.fillRect(cx - 40, S.y, 80, 10)
  x.restore()
  return S
}

// ── the format bug: a pixel speech bubble with a heart + "STORYTIME:" (rose) + " HOW WE MET" (white 60%)
const BUG_ICON = ['.WWWWWWWW.', 'WWWWWWWWWW', 'WWRR.RRWWW', 'WWRRRRRWWW', 'WWWRRRWWWW', 'WWWWRWWWWW', '.WWWWWWWW.', '..WW......', '.W........']
export function buildBug(root, { at = 0.3 }) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '50px', height: '45px', imageRendering: 'pixelated' }, box)
  ic.width = 50; ic.height = 45
  const ix = ic.getContext('2d')
  BUG_ICON.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; ix.fillStyle = ch === 'R' ? '#ff4f86' : BONE; ix.fillRect(i * 5, j * 5, 5, 5) }))
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: ROSE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box,
    `STORYTIME:<span style="color:rgba(255,255,255,0.6);letter-spacing:0.14em"> HOW&nbsp;WE&nbsp;MET</span>`)
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── sticky captions (the storyteller's words, auto-caption style: Inter 800, ink outline, the current word in accent)
const CAP_TOP = 1540
const PAUSE = /[,.!?…:;—]$/
export function captionTimes(L) {
  const words = L.text.split(/\s+/).filter(Boolean)
  let tt = L.t
  const ts = words.map(w => { const at = tt; const plain = w.replace(/\*/g, ''); tt += 0.1 + 0.03 * plain.length + (PAUSE.test(plain) ? 0.16 : 0); return r3(at) })
  return { words, ts, done: r3(ts[ts.length - 1] + 0.2) }
}
function buildCaptions(root, lines, accent) {
  const shadow = [[-4, 0], [4, 0], [0, -4], [0, 4], [-3, -3], [3, -3], [-3, 3], [3, 3]].map(([a, b]) => `${a}px ${b}px 0 ${INK}`).join(', ') + ', 0 8px 18px rgba(6,4,18,0.8)'
  const items = lines.map(L => {
    const tm = captionTimes(L)
    const box = el('div', { position: 'absolute', left: '60px', width: '960px', top: CAP_TOP + 'px', textAlign: 'center', font: `800 60px ${INTER}`, lineHeight: '1.16', color: '#ffffff', textShadow: shadow, display: 'none', transformOrigin: '50% 50%', pointerEvents: 'none' }, root)
    let acc = false
    const spans = tm.words.map((w, i) => {
      let isAcc = acc
      for (const ch of w) { if (ch === '*') { acc = !acc; if (acc) isAcc = true } }
      const s = el('span', { display: 'inline-block', margin: '0 0.17em', opacity: '0' }, box, w.replace(/\*/g, ''))
      return { s, acc: isAcc, t: tm.ts[i] }
    })
    return { L, tm, box, spans }
  })
  return {
    items,
    update(t, out = 1) {
      for (const it of items) {
        const end = it.L.end
        const on = t >= it.L.t && t < end && out > 0
        it.box.style.display = on ? 'block' : 'none'
        if (!on) continue
        const pin = pop01(t, it.L.t, 0.22, 2.2), po = 1 - ease.inQuad(prog(t, end - 0.14, end))
        it.box.style.opacity = String(clamp(po * out))
        it.box.style.transform = `scale(${(0.86 + 0.14 * pin).toFixed(4)})`
        let cur = -1
        it.spans.forEach((w, i) => { if (t >= w.t) cur = i })
        it.spans.forEach((w, i) => {
          const p = prog(t, w.t, w.t + 0.16)
          w.s.style.opacity = String(clamp(p * 3))
          const active = i === cur && t < it.tm.done + 0.25
          w.s.style.color = w.acc ? accent : active ? GOLD : '#ffffff'
          w.s.style.transform = `translateY(${((1 - ease.outCubic(p)) * 14).toFixed(1)}px) scale(${(active ? 1.07 : 1).toFixed(3)})`
        })
      }
    },
  }
}

// ── the room: the storyteller's living room (plum wall, a night window, string lights, a framed photo, the couch)
const ROOM_WIN = { x: 96, y: 450, w: 300, h: 300 }, PHOTO = { cx: 850, cy: 590, w: 220, h: 190 }
export function drawRoom(x, t, { photo = null, back = null, K = null } = {}) {
  const g = x.createLinearGradient(0, 380, 0, 1920)
  g.addColorStop(0, '#2e1d55'); g.addColorStop(0.6, '#25174a'); g.addColorStop(1, '#120a26')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = 'rgba(255,255,255,0.025)'; for (let i = 0; i < 1080; i += 72) x.fillRect(i, 0, 30, 1300)
  // the window: the real night sky
  const W2 = ROOM_WIN
  x.fillStyle = INK; x.fillRect(W2.x - 16, W2.y - 16, W2.w + 32, W2.h + 32)
  x.save(); x.beginPath(); x.rect(W2.x, W2.y, W2.w, W2.h); x.clip()
  x.translate(W2.x - 200, W2.y - 300); drawSky(x, t, { ...SKY_H, moon: { x: 470, y: 380, r: 40, phase: 0.12, alpha: 1 } })
  x.restore()
  x.fillStyle = '#3d2a6e'; x.fillRect(W2.x + W2.w / 2 - 7, W2.y, 14, W2.h); x.fillRect(W2.x, W2.y + W2.h / 2 - 7, W2.w, 14)
  x.fillStyle = '#4b3486'; x.fillRect(W2.x - 30, W2.y + W2.h + 16, W2.w + 60, 18)
  // the framed photo
  const P = PHOTO
  x.fillStyle = INK; x.fillRect(P.cx - P.w / 2 - 18, P.cy - P.h / 2 - 18, P.w + 36, P.h + 36)
  x.fillStyle = '#c98a1f'; x.fillRect(P.cx - P.w / 2 - 12, P.cy - P.h / 2 - 12, P.w + 24, P.h + 24)
  x.fillStyle = '#1c1238'; x.fillRect(P.cx - P.w / 2, P.cy - P.h / 2, P.w, P.h)
  x.save(); x.beginPath(); x.rect(P.cx - P.w / 2, P.cy - P.h / 2, P.w, P.h); x.clip()
  if (photo) photo(x, P.cx, P.cy, P.w, P.h, t)
  else drawBits(x, HEART, { H: PINK, W: '#fff' }, P.cx, P.cy, 16)
  x.restore()
  // string lights
  for (let i = 0; i <= 14; i++) {
    const u = i / 14, bx = 40 + u * 1000, by = 400 + 60 * Math.sin(Math.PI * u)
    if (i) { const pu = (i - 1) / 14; x.strokeStyle = 'rgba(20,12,40,0.9)'; x.lineWidth = 4; x.beginPath(); x.moveTo(40 + pu * 1000, 400 + 60 * Math.sin(Math.PI * pu)); x.lineTo(bx, by); x.stroke() }
    const on = 0.65 + 0.35 * Math.sin(t * 2.4 + i * 1.7)
    const col = ['#ffd27a', '#ff8fb1', '#8fe3ff', '#b6f08a'][i % 4]
    const gl = x.createRadialGradient(bx, by + 14, 0, bx, by + 14, 46); gl.addColorStop(0, col + '88'); gl.addColorStop(1, col + '00')
    x.globalAlpha = on; x.fillStyle = gl; x.fillRect(bx - 46, by - 32, 92, 92); x.globalAlpha = 1
    x.fillStyle = INK; x.fillRect(bx - 8, by, 16, 26); x.fillStyle = col; x.fillRect(bx - 5, by + 6, 10, 16)
  }
  // side table + lamp (left)
  const lg = x.createRadialGradient(80, 1000, 0, 80, 1000, 380); lg.addColorStop(0, 'rgba(255,214,150,0.28)'); lg.addColorStop(1, 'rgba(255,214,150,0)')
  x.fillStyle = lg; x.fillRect(0, 620, 460, 760)
  if (back) { x.save(); back(x, t, K); x.restore() }
  drawCouch(x)
  drawBits(x, ['..KKKKKK..', '.KYYYYYYK.', 'KYYYYYYYYK', 'KYYYYYYYYK', '....DD....', '....DD....', '....DD....', '..DDDDDD..'], { K: INK, Y: '#ffe2a0', D: '#6b4a2a' }, 70, 1010, 14, { outline: null })
  // floor + rug
  x.fillStyle = '#160d30'; x.fillRect(0, 1300, 1080, 620)
  x.fillStyle = '#2a1a52'; x.beginPath(); x.ellipse(540, 1420, 470, 90, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#3a2470'; x.beginPath(); x.ellipse(540, 1420, 400, 66, 0, 0, Math.PI * 2); x.fill()
  const bot = x.createLinearGradient(0, 1300, 0, 1920); bot.addColorStop(0, 'rgba(8,5,20,0)'); bot.addColorStop(1, 'rgba(8,5,20,0.85)')
  x.fillStyle = bot; x.fillRect(0, 1300, 1080, 620)
}
function drawCouch(x) {
  const C = 14
  const box = (l, tp, w, h, col, hi, sh) => {
    x.fillStyle = INK; x.fillRect(l - 6, tp + C - 6, w + 12, h - 2 * C + 12); x.fillRect(l + C - 6, tp - 6, w - 2 * C + 12, h + 12)
    x.fillStyle = col; x.fillRect(l, tp + C, w, h - 2 * C); x.fillRect(l + C, tp, w - 2 * C, h)
    x.fillStyle = hi; x.fillRect(l + C, tp + 6, w - 2 * C, 10)
    x.fillStyle = sh; x.fillRect(l + C, tp + h - 16, w - 2 * C, 10)
  }
  box(150, 1040, 780, 170, '#5d3f8e', '#7a5bb0', '#45306e')            // back
  for (let i = 0; i < 3; i++) box(176 + i * 245, 1060, 238, 140, '#6a4a9e', '#8466bb', '#4f377c')   // back cushions
  box(130, 1190, 820, 110, '#6a4a9e', '#8466bb', '#45306e')            // seat
  box(96, 1110, 92, 200, '#563a86', '#7356a8', '#3e2a64')             // arms
  box(892, 1110, 92, 200, '#563a86', '#7356a8', '#3e2a64')
  x.fillStyle = INK; x.fillRect(150, 1300, 24, 30); x.fillRect(906, 1300, 24, 30)
}

// ── the flashback frame
export const FR = { x: 64, y: 440, w: 952, h: 860 }
const PIP = { x: 902, y: 1236, r: 118 }

// ═══════════════════════════════════════════ the film
export function makeFilm(S) {
  const DURATION = 45, STORY_END = DURATION - ENDCARD_LEN       // 40.6
  const SEG = [
    { kind: 'talk', a: 0, b: r3(BEAT(9)) },
    { kind: 'flash', a: r3(BEAT(9)), b: r3(BEAT(24)), n: 0 },
    { kind: 'talk', a: r3(BEAT(24)), b: r3(BEAT(32)) },
    { kind: 'flash', a: r3(BEAT(32)), b: r3(BEAT(49)), n: 1 },
    { kind: 'talk', a: r3(BEAT(49)), b: STORY_END },
  ]
  const T = {
    bug: 0.35, lesson: r3(BEAT(59)), lessonOut: [37.7, 37.95], last: 37.95, out: [r3(STORY_END - 0.45), r3(STORY_END - 0.05)],
    partnerIn: S.partnerIn ?? 28.3, seg: SEG.map(s => s.a),
  }
  const segAt = t => { for (let i = SEG.length - 1; i >= 0; i--) if (t >= SEG[i].a) return i; return 0 }
  // captions: end = next line's start (or the segment's end), and each must hold ≥ 1.5 s
  const LINES = S.lines.map((L, i) => {
    const nx = S.lines[i + 1]
    const segEnd = SEG[segAt(L.t)].b - 0.08
    const end = L.end ?? Math.min(nx ? nx.t - 0.04 : T.lesson - 0.1, segEnd, T.lesson - 0.1)
    return { ...L, end: r3(end) }
  })
  for (const L of LINES) {
    const tm = captionTimes(L), hold = L.end - tm.done
    if (L.text.replace(/\*/g, '').length > 46) throw new Error(`caption too long: "${L.text}"`)
    if (hold < 1.5) throw new Error(`caption holds only ${hold.toFixed(2)} s: "${L.text}"`)
  }
  const LESSON = { at: T.lesson, out: T.lessonOut, text: S.lesson.text, chip: S.lesson.chip, accentColor: S.accent || GOLD, dim: 0.6 }
  const LT = lessonTimes(LESSON)
  if (T.lessonOut[0] - LT.end < 2.5) throw new Error(`lesson holds only ${(T.lessonOut[0] - LT.end).toFixed(2)} s`)
  // the storyteller hops on every other caption word
  const NHOPS = [0.4, ...LINES.flatMap(L => captionTimes(L).ts.filter((_, i) => i % 2 === 0)), ...(S.hops || [])].sort((a, b) => a - b)
  const NARR = { x: 540, y: 1010, s: 400 }, NARR_B = { x: 330, y: 1020, s: 340 }, PART = { x: 765, y: 1025, s: 320 }
  const PIS_A = { x: 905, y: 1150, s: 150 }, PIS_B = { x: 975, y: 1120, s: 120 }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 60px Inter", "800 34px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 28px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const heads = SEG.map((sg, i) => popText(root, S.heads[i], { top: 158, size: 84, accentSize: 116, at: i === 0 ? 0.15 : sg.a + 0.14, gap: 0.07, late: i === 0 ? 1 : 0, lateAt: 0.8, wobble: i === 0, accentColor: S.accent || GOLD, fit: true }))
    const last = popText(root, S.last.text, { top: 250, size: 120, accentSize: 168, at: T.last + 0.15, gap: 0.12, late: 1, lateAt: T.last + 0.15, wobble: true, accentColor: S.accent || GOLD, fit: true })
    const caps = buildCaptions(root, LINES, S.accent || GOLD)
    const bug = buildBug(root, { at: T.bug })
    const lesson = buildLesson(root, LESSON)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
    const K = { FR, PIP, NARR, SEG, T, signChar, accent: S.accent || GOLD }

    const narrMood = t => S.mood ? S.mood(t) : { mood: 'happy' }
    const pisTears = t => S.pisces ? S.pisces(t) : (t < SEG[2].a ? 1 : t < SEG[4].a ? 2 : 3)

    function talkScene(t, si) {
      const sg = SEG[si], lt = t - sg.a
      const z = 1 + 0.035 * ease.inOutQuad(clamp(lt / 6)), sway = 3 * Math.sin(t * 0.9)
      x.save(); x.translate(540 + sway, 1000); x.scale(z, z); x.translate(-540, -1000)
      drawRoom(x, t, { photo: S.photo, back: S.room, K })
      const pin = ease.inOutCubic(prog(t, T.partnerIn - 0.1, T.partnerIn + 0.45))
      const fin = popOut(t, T.out)
      // Pisces on the couch, crying at the story (scoots to the arm when the partner sits down)
      const pp = { x: lerp(PIS_A.x, PIS_B.x, pin), y: lerp(PIS_A.y, PIS_B.y, pin), s: lerp(PIS_A.s, PIS_B.s, pin) }
      const pt = pisTears(t)
      const pisHops = [0.6, T.partnerIn + 0.2, T.last + 0.2, T.last + 0.75]
      if (si !== 4 || t < T.last) drawTissues(x, lerp(990, 1020, pin), lerp(1215, 1300, pin), 8)
      signChar(x, t, 'pisces', pp.x, pp.y, pp.s, { mood: pt >= 3 ? 'happy' : pt >= 2 ? 'wide' : 'sparkle', look: pin > 0.5 ? [-1, 0] : [-1, -0.3], hops: pisHops, tears: pt, seed: 11, pop: fin, glow: 0.8 })
      // the partner (payoff)
      const m = narrMood(t)
      const np = { x: lerp(NARR.x, NARR_B.x, pin), y: lerp(NARR.y, NARR_B.y, pin), s: lerp(NARR.s, NARR_B.s, pin) }
      const hug = ease.inOutCubic(prog(t, T.last, T.last + 0.5))
      if (hug > 0) { np.x = lerp(np.x, 400, hug) }
      const nF = signChar(x, t, S.narrator, np.x, np.y, np.s, { mood: m.mood, look: m.look, hops: NHOPS, seed: 4, pop: (si === 0 ? pop01(t, 0.2, 0.4, 2) : 1) * fin, glow: 1.1, squash: m.squash || 0 })
      let pF = null
      if (t >= T.partnerIn) {
        const pm = S.partnerMood ? S.partnerMood(t) : { mood: 'happy' }
        const ent = ease.outCubic(prog(t, T.partnerIn, T.partnerIn + 0.4))
        const px = lerp(1260, hug > 0 ? lerp(PART.x, 680, hug) : PART.x, ent)
        pF = signChar(x, t, S.partner, px, PART.y, PART.s, { mood: pm.mood, look: pm.look, hops: [T.partnerIn + 0.4, ...(S.partnerHops || []), T.last + 0.2, T.last + 0.75], seed: 9, pop: fin, glow: 1.1 })
      }
      if (t >= T.last) hearts(x, t, 540, 900, T.last + 0.3, { n: 10, life: 2.2, spread: 520, cell: 8, seed: 3 })
      if (S.talk) { x.save(); S.talk(x, t, { ...K, si, lt, nF, pF, np }); x.restore() }
      if (S.last.draw && t >= T.last) { x.save(); S.last.draw(x, t, t - T.last, { ...K, nF, pF }); x.restore() }
      x.restore()
    }

    function flashScene(t, si) {
      const sg = SEG[si], lt = t - sg.a
      // the room, dimmed, behind the clip
      drawRoom(x, t, { photo: S.photo, back: S.room, K })
      x.fillStyle = 'rgba(8,5,20,0.78)'; x.fillRect(0, 0, 1080, 1920)
      // the clip pops in
      const k = easeOutBack(prog(t, sg.a, sg.a + 0.32), 1.6), ko = 1 - ease.inCubic(prog(t, sg.b - 0.18, sg.b))
      const sc = lerp(0.9, 1, k) * lerp(0.96, 1, ko)
      x.save(); x.translate(540, FR.y + FR.h / 2); x.scale(sc, sc); x.rotate(-0.012 * (1 - k)); x.translate(-540, -(FR.y + FR.h / 2))
      // frame shadow + border
      x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(FR.x + 14, FR.y + 20, FR.w, FR.h)
      x.fillStyle = BONE; x.fillRect(FR.x - 14, FR.y - 14, FR.w + 28, FR.h + 28)
      x.fillStyle = INK; x.fillRect(FR.x - 4, FR.y - 4, FR.w + 8, FR.h + 8)
      x.save(); x.beginPath(); x.rect(FR.x, FR.y, FR.w, FR.h); x.clip()
      S.flash[sg.n](x, t, lt, { ...K, si, lt, sg })
      // the rewound-clip look: warm wash, scanlines, a rolling tracking band, vignette
      x.fillStyle = 'rgba(255,170,90,0.09)'; x.fillRect(FR.x, FR.y, FR.w, FR.h)
      x.fillStyle = 'rgba(0,0,0,0.13)'; for (let y = FR.y; y < FR.y + FR.h; y += 6) x.fillRect(FR.x, y, FR.w, 2)
      const band = FR.y + ((t * 260) % (FR.h + 200)) - 100
      x.fillStyle = 'rgba(255,255,255,0.045)'; x.fillRect(FR.x, band, FR.w, 26)
      const vg = x.createRadialGradient(540, FR.y + FR.h / 2, FR.h * 0.35, 540, FR.y + FR.h / 2, FR.h * 0.8); vg.addColorStop(0, 'rgba(10,4,20,0)'); vg.addColorStop(1, 'rgba(10,4,20,0.55)')
      x.fillStyle = vg; x.fillRect(FR.x, FR.y, FR.w, FR.h)
      // labels: ◀◀ REWIND → ▶ FLASHBACK, and the timestamp chip
      x.font = `700 28px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
      const rew = lt < 0.55
      x.fillStyle = 'rgba(8,4,20,0.6)'; x.fillRect(FR.x + 22, FR.y + 22, rew ? 210 : 262, 50)
      x.fillStyle = rew ? BONE : '#ff5a6e'
      if (rew) x.fillText('◀◀ REWIND', FR.x + 36, FR.y + 48)
      else { if (Math.floor(t * 2) % 2 === 0) x.fillRect(FR.x + 38, FR.y + 39, 18, 18); x.fillStyle = BONE; x.fillText('FLASHBACK', FR.x + 70, FR.y + 48) }
      if (S.stamps[si]) {
        const w = x.measureText(S.stamps[si]).width + 32
        x.fillStyle = 'rgba(8,4,20,0.6)'; x.fillRect(FR.x + FR.w - 22 - w, FR.y + 22, w, 50)
        x.fillStyle = '#ffe9a8'; x.textAlign = 'right'; x.fillText(S.stamps[si], FR.x + FR.w - 38, FR.y + 48)
      }
      x.restore()
      x.restore()
      // the storyteller, now, in a little circle (stitch-style)
      const pk = pop01(t, sg.a + 0.25, 0.35, 2) * ko
      if (pk > 0.01) {
        x.save(); x.translate(PIP.x, PIP.y); x.scale(pk, pk); x.translate(-PIP.x, -PIP.y)
        x.fillStyle = INK; x.beginPath(); x.arc(PIP.x, PIP.y, PIP.r + 14, 0, Math.PI * 2); x.fill()
        x.fillStyle = S.accent || GOLD; x.beginPath(); x.arc(PIP.x, PIP.y, PIP.r + 9, 0, Math.PI * 2); x.fill()
        x.save(); x.beginPath(); x.arc(PIP.x, PIP.y, PIP.r, 0, Math.PI * 2); x.clip()
        x.fillStyle = '#2e1d55'; x.fillRect(PIP.x - PIP.r, PIP.y - PIP.r, PIP.r * 2, PIP.r * 2)
        x.fillStyle = '#5d3f8e'; x.fillRect(PIP.x - PIP.r, PIP.y + 40, PIP.r * 2, PIP.r)
        const m = narrMood(t)
        signChar(x, t, S.narrator, PIP.x, PIP.y + 34, 230, { mood: m.mood, look: m.look, hops: NHOPS, seed: 4, glow: 0.9, glyph: false, squash: m.squash || 0 })
        x.restore()
        label(x, PIP.x - 4, PIP.y - PIP.r - 8, 'ME, NOW', 1, { size: 22, bg: S.accent || GOLD, rot: -0.06 })
        x.restore()
      }
    }

    // the rewind / back-to-now tear between segments
    function tear(t) {
      for (const b of [SEG[1].a, SEG[2].a, SEG[3].a, SEG[4].a]) {
        const d = t - b
        if (d < -0.1 || d > 0.3) continue
        const p = d < 0 ? (d + 0.1) / 0.1 : 1 - d / 0.3
        x.save(); x.globalAlpha = 0.85 * p
        for (let i = 0; i < 9; i++) {
          const y = ((i * 211 + Math.floor(t * 40) * 37) % 1920), h = 10 + (i * 13) % 40
          x.fillStyle = i % 3 ? 'rgba(255,255,255,0.55)' : 'rgba(255,126,182,0.6)'
          x.fillRect(((i * 97) % 300) - 150, y, 1080 + 300, h)
        }
        x.fillStyle = `rgba(255,250,240,${(0.5 * p).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
        x.restore()
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const si = segAt(t)
        if (t < STORY_END) {
          if (SEG[si].kind === 'flash') flashScene(t, si)
          else talkScene(t, si)
          tear(t)
        } else { x.fillStyle = '#05040c'; x.fillRect(0, 0, 1080, 1920) }
        SEG.forEach((sg, i) => heads[i].update(t, i === 4 ? outK(t, [T.lesson - 0.05, T.lesson + 0.25]) : (t < sg.b ? outK(t, [sg.b - 0.18, sg.b]) : 0)))
        caps.update(t, 1)
        last.update(t, popOut(t, T.out))
        lesson.update(t)
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END]))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
        drawGrain(gx, t)
      },
    }
  }

  // card-cut candidates at the segment boundaries; cardfx plays the middle one (talk → the second flashback)
  const CUTS = [SEG[1].a, SEG[3].a, SEG[4].a]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  const NOTE = [587.33, 659.25, 698.46, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const words = s => s.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length
  const CUES = [
    ...wordPops(0.15, words(S.heads[0]) - 1, 0.07, 0), ['pop', 0.8, 1174.66, 0.045, 0], ['pluck', 0.8, 1174.66, 0.035, 0.5, 0],
    ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['pop', 0.25, 659.25, 0.035, 0],
    ...SEG.slice(1).flatMap((sg, i) => [...wordPops(sg.a + 0.14, words(S.heads[i + 1]), 0.07, i + 1, 0.022)]),
    // rewinds into the flashbacks (whoosh + tape chatter + crackle), and back to now
    ...[SEG[1], SEG[3]].flatMap(sg => [
      ['whoosh', r3(sg.a), 0.4, 0.045], ...Array.from({ length: 5 }, (_, i) => ['tick', r3(sg.a - 0.1 + i * 0.05), 0.035]),
      ['vinyl', r3(sg.a + 0.05), r3(sg.b - 0.05), { gain: 0.012, rate: 5 }], ['pop', r3(sg.a + 0.3), 1046.5, 0.03, 0.4],
    ]),
    ...[SEG[2], SEG[4]].flatMap(sg => [['whoosh', r3(sg.a), 0.3, 0.035], ['tick', r3(sg.a + 0.02), 0.04]]),
    // the captions: a soft blip per word
    ...LINES.flatMap(L => captionTimes(L).ts.map((tt, i) => ['pop', tt, NOTE[(i * 3 + 1) % 7], 0.011, ((i % 4) - 1.5) * 0.1])),
    // the partner pops in
    ['whoosh', r3(T.partnerIn), 0.35, 0.035], ['pop', r3(T.partnerIn + 0.4), 987.77, 0.04, 0.3], ['pop', r3(T.partnerIn + 0.5), 1318.51, 0.03, 0.3],
    ...lessonCues(T.lesson, { text: S.lesson.text, chip: S.lesson.chip, key: S.key }),
    // the last line
    ['whoosh', T.last, 0.35, 0.03], ...wordPops(T.last + 0.15, Math.max(0, words(S.last.text) - 1), 0.12, 3), ['pop', r3(T.last + 0.15), 1174.66, 0.05, 0], ['bell', r3(T.last + 0.2), 1760, 0.03, 1.2, 0], ['glitter', r3(T.last + 0.15), r3(T.last + 0.6)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(S.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  const MUSIC = { style: 'cinematic', key: S.key, seed: S.seed, sections: { drop: SEG[1].a, breakdown: S.music?.breakdown || [], lift: [SEG[3].a, ...(S.music?.lift || [])], outroAt: DURATION - 4.4 }, hits: S.music?.hits || [SEG[4].a] }
  return { DURATION, STORY_END, SCENES, CUES, T, SEG, CUTS, MUSIC, LINES }
}
