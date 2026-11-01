// THEN vs NOW kit: the shared look of Star Talk Then vs Now (promo/films/STARTALK-THENNOW.md, "The shared look").
// The same thing shown "then" (an older year, grainy old-phone video) and "now" (2026, clean pixel-star look).
// Every Block B episode (yrvirgo, yrlibra, yrscorpio, yrsag, yrcap) carries an identical copy of this file in its own
// folder, so the films match without touching another folder.
//
//   makeFilm(cfg) → { DURATION, SCENES, CUES, T, music }      a 20 s film: story 0–15.6, then the shared end card.
//
// The beats (identical timing in every episode):
//   0.0–7.2   THEN    top caption "[Thing] | in *2016*" + a year sticker "2016". The footage is an old phone video:
//                     over-saturated, soft, warm cast, vignette, heavy grain, a drifting tracking band, jittery framing
//                     and a pixel date stamp bottom-right ("08·14·2016"). The era's gags play here (episode props +
//                     up to three caption stickers along the bottom). Pisces cries in the background.
//   7.22      card cut (the only candidate: cardfx plays it) → the switch to NOW on the music drop (7.267).
//   7.27–12.4 NOW     crisp, clean; caption "[Thing] | in *2026*"; the year sticker flips 2016 → 2026 with a pop.
//                     The 2026 version of the same thing, with one dialogue line (the NOW star isn't perfect either).
//   12.55–15.6 PAYOFF a small THEN polaroid drops top-left (a frozen frame of the THEN footage), NOW stays big; one THE
//                     STARS box line; the last line lands as a big headline on the hit (13.91); hearts; Pisces fountains.
//
// cfg = {
//   id, key, seed,
//   year: '2016', stamp: '08·14·2016',
//   hero: { sign, tag?, lineColor? },  date: { sign, tag?, lineColor? } | null
//   cap0, cap1, last (+ cap0Accent, cap1Accent, lastAccent)          `*word*` = italic accent, `|` = break
//   stickers: [{ text, at, out, top, cx?, rot?, size?, accent? }]       caption stickers (DOM), explicit times
//   nowLine: { who: 'hero' | 'date', text }                           the NOW dialogue line (box at 1440)
//   starsLine: text                                                    THE STARS' payoff line (≤ ~32 chars)
//   snap?: t                                                           the THEN frame frozen into the polaroid
//   snapCrop?: { x, y, w, h }                                          its crop (4:3) of the 1080×1920 THEN frame
//   pos?: { hero, date, pis }                                          overrides of POS
//   moods?(phase, t, T) / dateMoods?(phase, t, T) → { mood, look, squash? }   phase: then | now | pay
//   back?(x, t, T, ctx) / mid? / front?                                episode drawing (ctx.era: 'then' | 'now')
//   heroProp?(x, F, t, T, ctx) / dateProp?                             drawn in a star's sprite cells (see inSprite)
//   cues?(T) → extra sound cues
// }
// Pure f(t); nothing touches `document` at module top level (the sound build imports this in node).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', LILAC = '#c7a6ff', ROSE = '#ff6f9a'
export const AMBER = '#ffb347', SKY = '#8fd8f6'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
const CPS = 30

// ── the shared timeline
export const TL = {
  black: [0, 0.3], bug: 0.35, heroIn: 0.4, dateIn: 0.75, floorIn: [0.05, 0.8],
  cap0: 0.15, cap0Land: BEAT(0) + 0.22, cap0Out: [6.95, 7.15],
  year: 0.9, pisIn: [2.0, 2.4],
  cut: 7.22,
  sw: BEAT(12),                                          // 7.267: the switch to NOW (the drop)
  cap1: 7.3, cap1Land: BEAT(13) + 0.02, cap1Out: [12.3, 12.5], yearOut: [12.3, 12.5],
  nowLine: 9.15,
  pay: 12.55, polaroid: 12.6, starsLine: 12.8,
  last: 13.45, lastLand: BEAT(24) - 0.02,                // 13.91 (the hit)
  out: [15.3, 15.56], bugOut: [15.3, 15.56],
}
TL.lastOut = TL.out

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
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
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK], life = 0.7) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

/** a pixel label plate: ink outline, coloured fill, centred text */
export function plate(x, text, cx, cy, { size = 28, font = MONO, weight = 700, bg = BONE, fg = INK, pad = 16, alpha = 1, rot = 0, scale = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(scale, scale)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + pad * 2, h = size + pad
  R(x, INK, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  R(x, bg, -w / 2, -h / 2, w, h)
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
  return w
}

export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// ── a 3×5 pixel font (the camcorder date stamp)
const PF = {
  0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'],
  3: ['###', '..#', '.##', '..#', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '###', '..#', '###'],
  6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'],
  9: ['###', '#.#', '###', '..#', '###'], '·': ['...', '...', '.#.', '...', '...'], ':': ['...', '.#.', '...', '.#.', '...'],
  ' ': ['...', '...', '...', '...', '...'], A: ['.#.', '#.#', '###', '#.#', '#.#'], P: ['##.', '#.#', '##.', '#..', '#..'],
  M: ['#.#', '###', '###', '#.#', '#.#'],
}
/** pixel text, right-aligned at (rx, y top), cell px per font pixel */
export function pixelText(x, s, rx, y, cell, col, shadow = 'rgba(20,6,0,0.75)') {
  const chars = [...s], adv = 4 * cell
  const w = chars.length * adv - cell
  let px = Math.round(rx - w)
  for (const ch of chars) {
    const g = PF[ch] || PF[' ']
    g.forEach((row, j) => [...row].forEach((c, i) => {
      if (c !== '#') return
      x.fillStyle = shadow; x.fillRect(px + i * cell + cell * 0.5, y + j * cell + cell * 0.5, cell, cell)
      x.fillStyle = col; x.fillRect(px + i * cell, y + j * cell, cell, cell)
    }))
    px += adv
  }
  return w
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
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}

// ── the bug: "THEN vs NOW" (Inter 800, letter-spaced small caps), top-left 56 px. The live word glows: THEN in amber
//    (old-video warm) until the switch, NOW in white after it.
function buildBug(root, { at, sw }) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', transformOrigin: '0% 50%', pointerEvents: 'none', font: `800 32px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', whiteSpace: 'nowrap', textShadow: '0 2px 12px rgba(6,4,18,0.9)' }, root)
  const a = el('span', { color: AMBER }, box, 'THEN')
  el('span', { color: 'rgba(239,230,214,0.6)', margin: '0 0.35em' }, box, 'vs')
  const b = el('span', { color: 'rgba(239,230,214,0.55)' }, box, 'NOW')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      const now = t >= sw
      const kick = now ? 1 + 0.25 * Math.exp(-(t - sw) * 7) * Math.cos((t - sw) * 24) : 1
      box.style.transform = `scale(${((0.6 + 0.4 * k) * (now ? 1 + 0.06 * Math.exp(-(t - sw) * 6) : 1)).toFixed(4)})`
      a.style.color = now ? 'rgba(239,230,214,0.55)' : AMBER
      b.style.color = now ? '#ffffff' : 'rgba(239,230,214,0.55)'
      b.style.display = 'inline-block'
      b.style.transform = `scale(${kick.toFixed(4)})`
    },
  }
}

// ── caption stickers (DOM): a white caption sticker. `*word*` = italic accent.
const accentHTML = (s, col) => s.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 1.18em ${SERIF};color:${col}">$1</span>`)
function buildSticker(root, { text, top, cx = 540, rot = 0, size = 40, accent = '#7a3fd0', width = 1000, bg = '#fffaf0' }) {
  const wrap = el('div', { position: 'absolute', left: (cx - width / 2) + 'px', top: top + 'px', width: width + 'px', display: 'none', flexDirection: 'column', alignItems: 'center', transformOrigin: '50% 50%', pointerEvents: 'none' }, root)
  el('div', { font: `800 ${size}px ${INTER}`, color: INK, background: bg, padding: '12px 26px 10px', borderRadius: '16px', boxShadow: '0 6px 0 rgba(6,4,18,0.55), 0 0 0 4px rgba(27,18,54,0.9)', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }, wrap, accentHTML(text, accent))
  return {
    update(t, at, out = 1) {
      const k = pop01(t, at, 0.34, 2.6) * out
      wrap.style.display = k <= 0.01 ? 'none' : 'flex'
      if (k <= 0.01) return
      wrap.style.opacity = String(clamp(k * 2))
      const r = rot + (1 - clamp(k)) * 8
      wrap.style.transform = `scale(${(0.5 + 0.5 * k).toFixed(4)}) rotate(${r.toFixed(2)}deg)`
    },
  }
}

// ── the year sticker: a tilted pixel badge under the caption; flips over (THEN year → 2026) on the switch
function yearSticker(x, t, T, year, P) {
  const k = pop01(t, T.year, 0.38, 2.6) * outK(t, T.yearOut)
  if (k <= 0.01) return
  const flip = prog(t, T.sw + 0.05, T.sw + 0.4)
  const sy = Math.max(0.05, Math.abs(Math.cos(Math.PI * flip)))
  const now = flip >= 0.5
  const big = now ? 1 + 0.22 * Math.exp(-(t - T.sw - 0.25) * 5) * Math.max(0, Math.cos((t - T.sw - 0.25) * 14)) : 1
  const { x: cx, y: cy } = P.year
  x.save(); x.translate(cx, cy); x.rotate(now ? 0.1 : -0.09); x.scale(k * big, k * sy * big)
  const w = 250, h = 104
  R(x, 'rgba(6,4,18,0.5)', -w / 2 + 10, -h / 2 + 12, w, h)
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  // stepped corners
  R(x, now ? '#ffffff' : '#ffd36b', -w / 2, -h / 2 + 6, w, h - 12); R(x, now ? '#ffffff' : '#ffd36b', -w / 2 + 6, -h / 2, w - 12, h)
  R(x, now ? '#dff6ff' : '#f2a93b', -w / 2 + 6, h / 2 - 14, w - 12, 8)
  x.font = `700 62px ${MONO}`; x.fillStyle = now ? '#2a3cff' : '#7a3a00'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(now ? '2026' : year, 0, 4)
  x.restore()
  if (now) sparkles(x, t, cx, cy, T.sw + 0.3, 10, 150, 0.4, [GOLD, BONE, SKY])
}

// ── layout
export const POS = {
  hero: { x: 300, y: 1060, s: 250 },
  date: { x: 810, y: 1075, s: 210 },
  pis: { x: 985, y: 800, s: 128 },
  year: { x: 830, y: 520 },
  floorY: 930,
}

export function makeFilm(cfg) {
  const T = { ...TL }
  const P = { ...POS, ...(cfg.pos || {}) }
  const HERO = signStar(cfg.hero.sign), DATE = cfg.date ? signStar(cfg.date.sign) : null, PIS = signStar('pisces')
  const heroTag = cfg.hero.tag || `${HERO.glyph}︎ ${cfg.hero.sign.toUpperCase()}`
  const dateTag = cfg.date ? (cfg.date.tag || `${DATE.glyph}︎ ${cfg.date.sign.toUpperCase()}`) : ''
  // the NOW line (hero or date) and THE STARS' payoff line: two boxes
  const nl = cfg.nowLine
  const nowSpeaker = nl.who === 'hero' ? heroTag : dateTag
  const nowCol = nl.who === 'hero' ? (cfg.hero.lineColor || '#ffd27a') : (cfg.date.lineColor || '#9fe6b0')
  const L1 = [{ t: T.nowLine, speaker: nowSpeaker, color: nowCol, text: nl.text }]
  const L2 = [{ t: T.starsLine, speaker: 'THE STARS', color: GOLD, text: cfg.starsLine }]
  const tm1 = lineTimes(L1, { cps: CPS })[0], tm2 = lineTimes(L2, { cps: CPS })[0]
  T.box1Open = r3(T.nowLine - 0.2); T.box1Close = r3(Math.max(tm1.done + 1.6, 11.6))
  T.box2Open = r3(T.starsLine - 0.2); T.box2Close = r3(Math.max(tm2.done + 1.5, 15.2))
  if (T.box1Close > T.pay - 0.15) throw new Error(`now line too long: done ${tm1.done}`)
  if (T.box2Close > T.out[0] + 0.16) throw new Error(`stars line too long: done ${tm2.done}`)
  const ALL = [...L1, ...L2]
  const snapT = cfg.snap ?? 5.2
  const crop = cfg.snapCrop || { x: 40, y: 610, w: 1000, h: 750 }
  const heroHops = [T.heroIn + 0.35, T.sw + 0.05, T.lastLand + 0.02, T.lastLand + 0.5,
    ...(nl.who === 'hero' ? talkHops(L1, nowSpeaker, { cps: CPS }) : []), ...(cfg.heroHops || [])].sort((a, b) => a - b)
  const dateHops = [T.dateIn + 0.3, T.sw + 0.15, ...(nl.who === 'date' ? talkHops(L1, nowSpeaker, { cps: CPS }) : []), T.lastLand + 0.1, T.lastLand + 0.6, ...(cfg.dateHops || [])].sort((a, b) => a - b)
  const starsHops = talkHops(L2, 'THE STARS', { cps: CPS })

  const phaseOf = t => t < T.sw ? 'then' : t < T.pay ? 'now' : 'pay'
  const heroDefault = ph => ph === 'then' ? { mood: 'sparkle', look: [1, 0] } : ph === 'now' ? { mood: 'happy' } : { mood: 'heart' }
  const dateDefault = ph => ph === 'then' ? { mood: 'wide', look: [-1, 0] } : ph === 'now' ? { mood: 'sparkle', look: [-1, 0] } : { mood: 'heart', look: [-1, 0] }

  async function build(stage) {
    try {
      await Promise.all(["800 104px Inter", "800 40px Inter", "700 30px Inter", "italic 500 140px 'EB Garamond'", "italic 500 48px 'EB Garamond'", "600 34px 'EB Garamond'", "700 62px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    // offscreen buffers: the THEN footage is drawn sharp into buf, then re-graded onto the main canvas
    const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
    const buf = mk(1080, 1920), bx = buf.getContext('2d')
    const low = mk(432, 768), lx = low.getContext('2d')
    const noise = mk(216, 384), nx = noise.getContext('2d'), nImg = nx.createImageData(216, 384)
    let snap = null                                                       // the frozen THEN frame (polaroid), made once

    const C0 = popText(root, cfg.cap0, { top: 172, size: 100, accentSize: 132, at: T.cap0, late: 1, lateAt: T.cap0Land, wobble: true, accentColor: cfg.cap0Accent || AMBER, fit: true })
    const C1 = popText(root, cfg.cap1, { top: 172, size: 100, accentSize: 132, at: T.cap1, late: 1, lateAt: T.cap1Land, wobble: true, accentColor: cfg.cap1Accent || SKY, fit: true })
    const C2 = popText(root, cfg.last, { top: 168, size: 108, accentSize: 150, at: T.last, late: cfg.lastLate ?? 1, lateAt: T.lastLand, wobble: true, accentColor: cfg.lastAccent || GOLD, fit: true })
    const HEADS = [[C0, T.cap0Out], [C1, T.cap1Out], [C2, T.lastOut]]
    const STK = (cfg.stickers || []).map(s => ({ s, k: buildSticker(root, { text: s.text, top: s.top, cx: s.cx ?? 540, rot: s.rot ?? 0, size: s.size ?? 40, accent: s.accent || '#7a3fd0' }) }))
    const box1 = dialogueBox(root, { lines: L1, y: 1440, open: T.box1Open, close: T.box1Close, cps: CPS })
    const box2 = dialogueBox(root, { lines: L2, y: 1440, open: T.box2Open, close: T.box2Close, cps: CPS })
    const bug = buildBug(root, { at: T.bug, sw: T.sw })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    const ctx = { T, HERO, DATE, P, hero: null, date: null, phaseOf, era: 'then' }

    function floor(x, t) {
      const k = ease.outCubic(prog(t, ...T.floorIn)) * clamp(popOut(t, T.out))
      if (k <= 0.01) return
      const fy = P.floorY + (1 - k) * 600
      const g = x.createLinearGradient(0, fy, 0, 1920)
      g.addColorStop(0, '#3a2466'); g.addColorStop(0.25, '#24164a'); g.addColorStop(1, '#0d0820')
      x.fillStyle = g; x.fillRect(0, fy, 1080, 1920 - fy)
      x.save(); x.globalAlpha = 0.35
      for (let i = 0; i < 9; i++) { const yy = fy + 14 + i * i * 9.5; R(x, '#4a3180', 0, yy, 1080, 3) }
      x.restore()
      R(x, INK, 0, fy - 4, 1080, 8); R(x, '#6b4fb0', 0, fy + 4, 1080, 4)
      for (const [px, w, a] of [[P.hero.x, 230, 0.22], [P.date.x, 190, 0.16]]) {
        const pg = x.createRadialGradient(px, P.hero.y + 135, 0, px, P.hero.y + 135, w)
        pg.addColorStop(0, `rgba(255,220,160,${a * k})`); pg.addColorStop(1, 'rgba(255,220,160,0)')
        x.fillStyle = pg; x.fillRect(px - w, P.hero.y + 60, w * 2, 160)
      }
    }

    function pisces(x, t) {
      if (t < T.pisIn[0] || t > T.out[1]) return
      const peek = ease.outBack(prog(t, ...T.pisIn)), k = popOut(t, T.out)
      const Q = P.pis, px = lerp(Q.x + 130, Q.x, peek)
      const ph = phaseOf(t)
      const tears = ph === 'pay' && t > T.lastLand ? 3 : ph === 'then' ? (t > 3.6 ? 2 : 1) : 2
      const mood = ph === 'then' ? 'wide' : 'happy'
      const opts = { color: PIS.color, mood, look: [-1, 0.2], seed: 6, glow: 0.7, alpha: clamp(k), hops: [T.sw + 0.2, T.lastLand + 0.1, T.lastLand + 0.55], squash: ph === 'then' ? 0.03 * Math.sin(t * 20) : 0 }
      drawStarChar(x, px, Q.y, Q.s, t, opts)
      const F = starFrame(px, Q.y, Q.s, t, opts)
      inSprite(x, F, () => tearsCells(x, t, tears))
    }

    function stars(x, t) {
      const k = popOut(t, T.out)
      if (k <= 0) return
      const ph = phaseOf(t)
      if (DATE) {
        const dk = pop01(t, T.dateIn, 0.38, 2.1) * k
        if (dk > 0.01) {
          const dm = { ...dateDefault(ph, t), ...(cfg.dateMoods ? cfg.dateMoods(ph, t, T) || {} : {}) }
          const D = P.date
          const o2 = { color: DATE.color, glyph: DATE.glyph, mood: dm.mood, look: dm.look, hops: dateHops, pop: dk, seed: 8, glow: 1.1, squash: dm.squash || 0 }
          drawStarChar(x, D.x, D.y, D.s, t, o2)
          const F = starFrame(D.x, D.y, D.s, t, o2)
          ctx.date = { ...D, F, mood: dm.mood }
          if (cfg.dateProp) inSprite(x, F, () => cfg.dateProp(x, F, t, T, ctx))
        }
      }
      const hk = pop01(t, T.heroIn, 0.4, 2.1) * k
      if (hk > 0.01) {
        const md = { ...heroDefault(ph, t), ...(cfg.moods ? cfg.moods(ph, t, T) || {} : {}) }
        const H = P.hero
        const opts = { color: HERO.color, glyph: HERO.glyph, mood: md.mood, look: md.look, hops: heroHops, pop: hk, seed: 3, glow: 1.1, squash: md.squash || 0 }
        drawStarChar(x, H.x, H.y, H.s, t, opts)
        const F = starFrame(H.x, H.y, H.s, t, opts)
        ctx.hero = { ...H, F, mood: md.mood }
        if (cfg.heroProp) inSprite(x, F, () => cfg.heroProp(x, F, t, T, ctx))
      }
    }

    function hearts(x, t) {
      if (t < T.lastLand || t > T.out[1]) return
      const a = outK(t, T.out), cx = (P.hero.x + (DATE ? P.date.x : P.hero.x)) / 2
      for (let i = 0; i < 9; i++) {
        const born = T.lastLand + i * 0.13
        const p = (t - born) / 1.6
        if (p < 0 || p > 1) continue
        const hx = cx + Math.sin(i * 2.3) * 320 + Math.sin(t * 3 + i) * 18, hy = 1160 - p * 620
        drawBits(x, HEART, { H: i % 3 ? ROSE : PINK }, hx, hy, 7 + (i % 3) * 2, { alpha: a * (1 - ease.inQuad(p)) })
      }
    }

    /** the scene itself (sky, floor, props, stars), sharp, into context x */
    function world(x, t, era) {
      ctx.era = era
      drawSky(x, t, { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ease.inOutCubic(prog(t, 0, 3))), dim: era === 'then' ? 0.62 : 0.5 })
      if (t >= T.out[1] + 0.02) return
      floor(x, t)
      if (cfg.back) cfg.back(x, t, T, ctx)
      pisces(x, t)
      if (cfg.mid) cfg.mid(x, t, T, ctx)
      if (era === 'now') hearts(x, t)
      stars(x, t)
      if (cfg.front) cfg.front(x, t, T, ctx)
      if (era === 'now') {
        if (ctx.hero) sparkles(x, t, ctx.hero.x, ctx.hero.y - 40, T.lastLand + 0.02, 12, 210, 2, [GOLD, PINK, BONE])
        sparkles(x, t, 540, 1000, T.sw + 0.02, 12, 300, 1, [GOLD, BONE, SKY])
      }
    }

    /** the old-phone-video grade: world → soft, over-saturated, warm, vignetted, grainy, jittery, date-stamped */
    function renderThen(dst, t) {
      bx.setTransform(1, 0, 0, 1, 0, 0); bx.clearRect(0, 0, 1080, 1920)
      world(bx, t, 'then')
      // handheld jitter (12 fps hold) + a slow drift
      const f = Math.floor(t * 12), jr = rng(f * 13 + 5)
      const jx = (jr() - 0.5) * 9 + Math.sin(t * 0.9) * 6, jy = (jr() - 0.5) * 7 + Math.sin(t * 0.7 + 1) * 5, jrot = (jr() - 0.5) * 0.006 + 0.004 * Math.sin(t * 0.6)
      // soft: a low-res pass, upscaled, with a weaker sharp pass on top
      lx.setTransform(1, 0, 0, 1, 0, 0); lx.clearRect(0, 0, 432, 768)
      lx.filter = 'saturate(1.75) contrast(1.08)'; lx.imageSmoothingEnabled = true
      lx.drawImage(buf, 0, 0, 432, 768); lx.filter = 'none'
      dst.save()
      dst.fillStyle = '#120904'; dst.fillRect(0, 0, 1080, 1920)
      dst.translate(540 + jx, 960 + jy); dst.rotate(jrot); dst.scale(1.035, 1.035); dst.translate(-540, -960)
      dst.imageSmoothingEnabled = true
      dst.drawImage(low, 0, 0, 1080, 1920)
      dst.globalAlpha = 0.38; dst.filter = 'saturate(1.6)'
      dst.drawImage(buf, 0, 0); dst.filter = 'none'; dst.globalAlpha = 1
      dst.restore()
      // warm cast + lifted blacks
      dst.save()
      dst.globalCompositeOperation = 'soft-light'; dst.fillStyle = 'rgba(255,140,40,0.55)'; dst.fillRect(0, 0, 1080, 1920)
      dst.globalCompositeOperation = 'screen'; dst.fillStyle = 'rgba(70,34,12,0.32)'; dst.fillRect(0, 0, 1080, 1920)
      dst.globalCompositeOperation = 'multiply'; dst.fillStyle = 'rgba(255,214,170,1)'; dst.fillRect(0, 0, 1080, 1920)
      dst.restore()
      // a tracking band drifting down
      const by = ((t * 0.42 + 0.3) % 1.4) * 1920 - 200
      const bg = dst.createLinearGradient(0, by - 50, 0, by + 50)
      bg.addColorStop(0, 'rgba(255,236,210,0)'); bg.addColorStop(0.5, 'rgba(255,236,210,0.09)'); bg.addColorStop(1, 'rgba(255,236,210,0)')
      dst.fillStyle = bg; dst.fillRect(0, by - 50, 1080, 100)
      // grain
      const nr = rng(f * 7 + 11), d = nImg.data
      for (let i = 0; i < d.length; i += 4) { const v = (nr() * 255) | 0; d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 255 }
      nx.putImageData(nImg, 0, 0)
      dst.save(); dst.globalCompositeOperation = 'overlay'; dst.globalAlpha = 0.2; dst.imageSmoothingEnabled = false
      dst.drawImage(noise, 0, 0, 1080, 1920); dst.restore()
      // soft vignette
      const vg = dst.createRadialGradient(540, 960, 520, 540, 960, 1180)
      vg.addColorStop(0, 'rgba(20,6,0,0)'); vg.addColorStop(1, 'rgba(20,6,0,0.72)')
      dst.fillStyle = vg; dst.fillRect(0, 0, 1080, 1920)
      // the date stamp, bottom-right, pixel font, camcorder amber
      const blink = 0.88 + 0.12 * Math.sin(t * 9)
      dst.save(); dst.globalAlpha = blink
      pixelText(dst, cfg.stamp, 1000, 1700, 7, '#ffb547')
      dst.restore()
    }

    // ── the payoff polaroid: a frozen frame of the THEN footage, dropped in top-left
    function polaroid(t) {
      const k = clamp(prog(t, T.polaroid, T.polaroid + 0.35))
      if (k <= 0 || t > T.out[1]) return
      if (!snap) { snap = mk(1080, 1920); renderThen(snap.getContext('2d'), snapT) }
      const out = popOut(t, T.out)
      const PW = 330, PH = PW * crop.h / crop.w, M = 20, MB = 74
      const cx = 250, cy = 640
      const drop = (1 - ease.outBack(k, 1.6)) * -380
      const rot = -0.12 + 0.05 * (1 - ease.outCubic(k))
      x.save(); x.globalAlpha = clamp(out); x.translate(cx, cy + drop); x.rotate(rot); x.scale(out, out)
      const w = PW + M * 2, h = PH + M + MB
      R(x, 'rgba(6,4,18,0.55)', -w / 2 + 14, -h / 2 + 18, w, h)
      R(x, '#f6f0e4', -w / 2, -h / 2, w, h)
      R(x, '#e4dccb', -w / 2, h / 2 - 8, w, 8)
      x.drawImage(snap, crop.x, crop.y, crop.w, crop.h, -PW / 2, -h / 2 + M, PW, PH)
      R(x, 'rgba(0,0,0,0.25)', -PW / 2, -h / 2 + M, PW, 3)
      x.font = `italic 500 48px ${SERIF}`; x.fillStyle = '#3b2a63'; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(cfg.year, 0, h / 2 - MB / 2 + 2)
      // a strip of tape
      x.save(); x.translate(-w / 2 + 40, -h / 2 + 4); x.rotate(-0.6); R(x, 'rgba(240,226,180,0.85)', -48, -14, 96, 28); x.restore()
      x.restore()
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ph = phaseOf(t)
        x.setTransform(1, 0, 0, 1, 0, 0)
        if (ph === 'then') renderThen(x, t)
        else {
          // NOW: crisp; a little bounce on the switch and a slow push through the payoff
          const z = 1 + 0.04 * Math.exp(-(t - T.sw) * 5) * Math.cos((t - T.sw) * 16) + 0.03 * ease.inOutCubic(prog(t, T.pay, T.out[0]))
          const dtL = t - T.lastLand
          const shake = dtL > 0 && dtL < 0.35 ? 9 * Math.exp(-dtL * 10) * Math.sin(dtL * 60) : 0
          x.save(); x.translate(540, 1000 + shake); x.scale(z, z); x.translate(-540, -1000)
          world(x, t, 'now')
          x.restore()
          const flash = Math.exp(-(t - T.sw) * 4)
          if (flash > 0.02) { x.fillStyle = `rgba(235,248,255,${0.45 * flash})`; x.fillRect(0, 0, 1080, 1920) }
          polaroid(t)
        }
        yearSticker(x, t, T, cfg.year, P)
        for (const { s, k } of STK) k.update(t, s.at, outK(t, s.out))
        box1.update(t); box2.update(t)
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        bug.update(t, outK(t, T.bugOut))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // ── the one card-cut candidate (cardfx plays it): THEN → NOW
  const CUTS = [T.cut]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ['whoosh', T.floorIn[0], 0.6, 0.04], ['tick', 0.3, 0.035], ['tick', 0.42, 0.025], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
    ...wordPops(T.cap0, 2, 0.08, 0), ['pop', T.cap0Land, 1046.5, 0.045, 0], ['pop', r3(T.cap0Land + 0.1), 1318.51, 0.035, 0],
    ['pop', T.heroIn + 0.05, 783.99, 0.035, -0.2], ...(DATE ? [['pop', T.dateIn + 0.05, 659.25, 0.03, 0.3]] : []),
    ['pop', r3(T.year + 0.04), 1174.66, 0.03, 0.35], ['tick', r3(T.year + 0.1), 0.03],
    ['pop', r3(T.pisIn[0] + 0.15), 987.77, 0.022, 0.5],
    ...(cfg.stickers || []).flatMap((s, i) => [['pluck', s.at, [659.25, 587.33, 523.25, 698.46][i % 4], 0.04, 0.6, [-0.3, 0.3, 0, 0.2][i % 4]], ['tick', r3(s.at + 0.06), 0.03]]),
    // the switch on the drop
    ['boom', T.sw, 0.3], ['bell', r3(T.sw + 0.03), 1046.5, 0.035, 1.6, 0], ['glitter', T.sw, r3(T.sw + 0.7)],
    ['pop', r3(T.sw + 0.3), 1567.98, 0.04, 0.35], ['pop', r3(T.sw + 0.36), 2093, 0.03, 0.35],
    ...wordPops(T.cap1, 2, 0.08, 2), ['pop', T.cap1Land, 1174.66, 0.045, 0],
    ...talkCues(ALL, { cps: CPS }),
    // the payoff: a shutter click as the polaroid drops, then the last line on the hit
    ['tick', r3(T.polaroid - 0.02), 0.05], ['whoosh', T.polaroid, 0.3, 0.03], ['tom', r3(T.polaroid + 0.3), 90, { gain: 0.14, decay: 0.25 }],
    ...wordPops(T.last, 2, 0.08, 0, 0.028), ['pop', T.lastLand, 1046.5, 0.05, 0], ['bell', r3(T.lastLand + 0.03), 2093, 0.03, 1.4, 0], ['glitter', T.lastLand, r3(T.lastLand + 0.6)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  const music = { style: 'synthwave', key: cfg.key, seed: cfg.seed, sections: { drop: T.sw, lift: [T.pay], outroAt: STORY_END }, hits: [T.lastLand] }
  return { DURATION, SCENES, CUES, T, music }
}
