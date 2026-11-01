// HEAR ME OUT kit: the shared look of Star Talk Trends format 15 (promo/films/STARTALK-TRENDS.md §15).
// A star defends an unexpected crush quality at a little podium; the other stars go from skeptical to swooning.
// Every episode (trhearlabel, trhearwalk, trhearcoffee, trhearhate, trhearearly) carries an identical copy of this file in
// its own folder, so the five films look like one format without touching another folder.
//
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, T, music }      a 20 s film: story 0–15.6, then the shared end card.
//
// The stage: velvet curtains, a pull-down projector screen, a wooden podium with a gooseneck mic and a SWOON-O-METER dial
// on its front, a spotlight, and a front row of three skeptical stars (+ Pisces, crying) in velvet seats.
// The beats (identical timing in every episode):
//   0.0–3.7   HOOK      "Hear me *out.*" The curtains open, the hero pops up behind the podium, taps the mic (tap, tap,
//                       feedback squeal: the front row flinches). Sticker: "an *unpopular* crush opinion:".
//   3.9–7.4   REVEAL    On the music drop the screen unrolls: the crush quality as a big pixel picture + a typed caption.
//                       The front row: "?", "…", an eye-roll. The needle sits on MEH.
//   7.5–11.0  THE CASE  "Okay, *listen.*" Three numbered reason stickers (rule of three, the third twisted); each one wins
//                       over one more of the front row and kicks the needle up.
//   11.2      card cut  (the only candidate: cardfx plays it)
//   11.3–13.4 TWIST     one dialogue line (the hero, a front-row star, THE STARS or a guest who steps in stage left).
//   13.45–15.5 LAST     the last line slams in on the hit; the needle pins past SWOON; hearts; one star faints; Pisces fountains.
//
// cfg = {
//   id, key, seed,
//   hero: { sign, tag?, lineColor? }
//   crowd: [sign, sign, sign]                the front row (Pisces always sits at the right end)
//   guest?: { sign, tag?, lineColor?, at? }  a star who steps in stage left at the twist
//   h1, h1Accent, h1Late?, h2?, h2Accent?, h3, h3Accent, last, lastAccent, lastLate?
//   screen: { bits, cols, cell, dy?, caption, capColor? }   the crush quality on the projector screen
//   stickers: [text ×3]                      `*word*` = accent
//   line: { who: 'hero' | 'guest' | 'stars' | 0 | 1 | 2, text }   (a number = that front-row star)
//   fainter?: 0 | 1 | 2                      who faints on the last line (default 1, the eye-roller)
//   moods?(phase, t, T) → { mood, look, squash }      the hero; phase: 'hook' | 'reveal' | 'case' | 'twist' | 'last'
//   crowdMoods?(i, phase, t, T) → { mood, look, bubble }   override a front-row star
//   guestMoods?(t, T) → { mood, look }
//   heroProp?(x, F, t, T, ctx)               draw on the hero's sprite (sprite cells; see inSprite)
//   screenDraw?(x, t, T, ctx, S)             extra drawing on the screen (S = { x0, y0, w, h, cx, cy })
//   back?(x, t, T, ctx) / front?(x, t, T, ctx)   extra drawing behind the stage props / in front of everything
//   cues?(T) → extra sound cues
// }
// Pure f(t); nothing touches `document` at module top level (the sound build imports this in node).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', ROSE = '#ff7a9a', HEART = '#ff4f86'
export const VELVET = { V: '#9b1f45', v: '#6e1232', w: '#c4335f', d: '#4a0b22' }
export const WOOD = { W: '#8a4b2c', w: '#6b3620', d: '#4a2414', h: '#b06a3c' }
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
  black: [0, 0.3], bug: 0.35, curtain: [0.25, 1.15], podium: [0.55, 1.1], heroIn: 0.9,
  h0: 0.15, h0Land: BEAT(0) + 0.22, h0Out: [3.6, 3.8],
  crowdIn: [0.85, 1.0, 1.15, 1.3],
  taps: [1.72, 2.02], squeal: [2.3, 2.85], sub: 2.62, subOut: [3.5, 3.72],
  drop: BEAT(6), screen: [BEAT(6) - 0.05, BEAT(6) + 0.38], land: BEAT(6) + 0.38,
  h1: 3.95, h1Land: BEAT(7) + 0.02, h1Out: [7.25, 7.45], caption: [4.65, 5.65],
  doubt: [4.45, 4.58, 4.71],
  h2: 7.5, h2Out: [10.85, 11.05], stk: [7.9, 9.0, 10.1], stkOut: [10.75, 11.0],
  cut: 11.2,
  h3: 11.32, h3Out: [13.2, 13.4], line: 11.6,
  last: 13.45, lastLand: BEAT(24) - 0.02,              // 13.93 (the hit)
  faint: [14.2, 14.6],
  lastOut: [15.15, 15.45], out: [15.05, 15.45], bugOut: [15.2, 15.5],
}

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

export const HEART_BITS = ['.HH.HH.', 'HhHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function drawHeart(x, cx, cy, cell, alpha = 1) { drawBits(x, HEART_BITS, { H: HEART, h: '#ffc2d6' }, cx, cy, cell, { alpha }) }

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

// ── the show bug: a pixel microphone + "HEAR ME OUT" (Inter 800, letter-spaced small caps, gold), top-left 56 px
const BUG_ICON = ['.MMM.', 'MmMmM', 'MMMMM', 'MmMmM', '.MMM.', '..S..', 'S.S.S', '.SSS.', '..S..', '.SSS.']
function buildBug(root, { at }) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '30px', height: '50px', imageRendering: 'pixelated' }, box)
  ic.width = 30; ic.height = 50
  drawBits(ic.getContext('2d'), BUG_ICON, { M: PINK, m: '#ffd6e3', S: GOLD }, 15, 25, 4)
  el('div', { font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'HEAR&nbsp;ME&nbsp;OUT')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── stickers (DOM): a white caption sticker with an optional dark tab. `*word*` = italic accent.
const accentHTML = (s, col) => s.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 1.18em ${SERIF};color:${col}">$1</span>`)
function buildSticker(root, { tab, text, top, cx = 540, rot = 0, size = 40, accent = '#d6336c', width = 1000 }) {
  const wrap = el('div', { position: 'absolute', left: (cx - width / 2) + 'px', top: top + 'px', width: width + 'px', display: 'none', flexDirection: 'column', alignItems: 'center', transformOrigin: '50% 50%', pointerEvents: 'none' }, root)
  if (tab) el('div', { font: `700 26px ${MONO}`, letterSpacing: '0.1em', color: GOLD, background: INK, padding: '4px 14px 2px', borderRadius: '10px', border: `3px solid ${GOLD}`, marginBottom: '-10px', zIndex: 1, boxShadow: '0 4px 0 rgba(6,4,18,0.6)', alignSelf: 'center', transform: 'translateX(-34%)' }, wrap, tab)
  el('div', { font: `800 ${size}px ${INTER}`, color: INK, background: '#fffaf0', padding: '12px 26px 10px', borderRadius: '16px', boxShadow: '0 6px 0 rgba(6,4,18,0.55), 0 0 0 4px rgba(27,18,54,0.9)', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }, wrap, accentHTML(text, accent))
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

// ── pre-rendered stage pieces
function mk(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
/** one velvet curtain panel: vertical folds, lit edge, gold tie-back band near the bottom (side -1 = left) */
function makeCurtain(w, h, side) {
  const c = mk(w, h), x = c.getContext('2d'), C = 6
  const folds = Math.max(3, Math.round(w / 60))
  for (let i = 0; i < w; i += C) {
    const f = Math.sin((i / w) * folds * Math.PI * 2)
    R(x, f > 0.55 ? VELVET.w : f > -0.1 ? VELVET.V : f > -0.7 ? VELVET.v : VELVET.d, i, 0, C, h)
  }
  // inner edge ink + the hem
  R(x, INK, side < 0 ? w - 8 : 0, 0, 8, h)
  R(x, GOLD, 0, h - 26, w, 12); R(x, '#c9952f', 0, h - 14, w, 6); R(x, INK, 0, h - 8, w, 8)
  for (let i = 4; i < w; i += 18) R(x, GOLD, i, h - 14, 6, 10)
  return c
}
/** the top valance: scalloped velvet with gold fringe */
function makeValance(w) {
  const h = 92, c = mk(w, h), x = c.getContext('2d')
  R(x, INK, 0, 0, w, 54); R(x, VELVET.V, 0, 0, w, 46); R(x, VELVET.w, 0, 8, w, 8)
  const sc = 120
  for (let s = 0; s < w; s += sc) {
    for (let i = 0; i < sc; i += 6) {
      const d = Math.round(28 * Math.sin(Math.PI * i / sc))
      R(x, INK, s + i, 46, 6, d + 8); R(x, VELVET.v, s + i, 46, 6, d)
      R(x, GOLD, s + i, 46 + d, 6, 6); if ((i / 6) % 2 === 0) R(x, '#c9952f', s + i, 52 + d, 6, 8)
    }
  }
  return c
}
/** the stage floor: wooden planks receding from the back line to the front lip */
function makeStage(y0, y1) {
  const H = y1 - y0 + 60, c = mk(1080, H), x = c.getContext('2d')
  const rows = 6
  let y = 0
  for (let r = 0; r < rows; r++) {
    const rh = lerp(10, 22, r / (rows - 1)) * ((y1 - y0) / 96)
    R(x, r % 2 ? WOOD.W : WOOD.h, 0, y, 1080, rh); R(x, WOOD.d, 0, y + rh - 3, 1080, 3)
    for (let k = (r * 137) % 210; k < 1080; k += 210 + (r % 3) * 30) R(x, WOOD.d, k, y, 4, rh)
    y += rh
  }
  // the lip
  R(x, INK, 0, y1 - y0, 1080, 8); R(x, WOOD.h, 0, y1 - y0 + 8, 1080, 10); R(x, WOOD.w, 0, y1 - y0 + 18, 1080, 34); R(x, INK, 0, y1 - y0 + 52, 1080, 8)
  for (let k = 40; k < 1080; k += 120) R(x, GOLD, k, y1 - y0 + 28, 14, 14)
  return c
}
/** the podium: slab + tapered front with gold trim (the dial is drawn live on top) */
function makePodium() {
  const w = 330, h = 262, c = mk(w, h), x = c.getContext('2d')
  // top slab
  R(x, INK, 0, 0, w, 34); R(x, WOOD.h, 6, 6, w - 12, 12); R(x, WOOD.W, 6, 18, w - 12, 10)
  // tapered front
  for (let j = 34; j < h; j += 2) {
    const inset = 20 + (j - 34) * 0.12
    R(x, INK, inset - 6, j, w - 2 * inset + 12, 2)
    R(x, WOOD.W, inset, j, w - 2 * inset, 2)
    R(x, WOOD.h, inset, j, 10, 2); R(x, WOOD.w, w - inset - 16, j, 16, 2)
  }
  R(x, GOLD, 30, 44, w - 60, 6)
  R(x, INK, 30, h - 22, w - 60, 22); R(x, WOOD.d, 36, h - 18, w - 72, 12)
  return c
}

// ── layout
export const POS = {
  hero: { x: 540, y: 905, s: 230 },
  podium: { cx: 540, top: 990 },
  dial: { cx: 540, cy: 1196, r: 92 },
  screen: { cx: 540, top: 505, w: 660, h: 290 },
  crowd: [{ x: 150, y: 1405, s: 170 }, { x: 390, y: 1398, s: 170 }, { x: 690, y: 1405, s: 170 }, { x: 930, y: 1400, s: 160 }],
  guest: { x: 200, y: 1115, s: 180 },
  stage: [1170, 1268],
}

export function makeEpisode(cfg) {
  const T = { ...TL }
  const HERO = signStar(cfg.hero.sign), PIS = signStar('pisces')
  const CROWD = [...cfg.crowd.map(s => ({ sign: s, ...signStar(s) })), { sign: 'pisces', ...PIS }]
  const GUEST = cfg.guest ? signStar(cfg.guest.sign) : null
  const tagOf = (sign, st, tag) => tag || `${st.glyph}︎ ${sign.toUpperCase()}`
  const heroTag = tagOf(cfg.hero.sign, HERO, cfg.hero.tag)
  const guestTag = cfg.guest ? tagOf(cfg.guest.sign, GUEST, cfg.guest.tag) : null
  const who = cfg.line.who
  const speaker = who === 'hero' ? heroTag : who === 'guest' ? guestTag : who === 'stars' ? 'THE STARS' : tagOf(CROWD[who].sign, CROWD[who])
  const lineCol = who === 'hero' ? (cfg.hero.lineColor || '#ffd27a') : who === 'guest' ? (cfg.guest.lineColor || '#9fe6b0') : who === 'stars' ? GOLD : (cfg.crowdLineColor || '#ffb3d9')
  const LINES = [{ t: T.line, speaker, color: lineCol, text: cfg.line.text }]
  const tm = lineTimes(LINES, { cps: CPS })[0]
  T.lineDone = tm.done
  T.boxOpen = r3(T.line - 0.2)
  T.boxClose = r3(Math.max(tm.done + 1.6, 14.3))
  if (T.boxClose > T.out[0]) throw new Error(`line too long: done ${tm.done}`)
  T.guestIn = cfg.guest ? (cfg.guest.at ?? T.cut + 0.05) : null
  const fainter = cfg.fainter ?? 1
  const heroHops = [T.heroIn + 0.4, T.land + 0.05, ...T.stk.map(s => s + 0.05), T.lastLand + 0.02, T.lastLand + 0.5,
    ...(who === 'hero' ? talkHops(LINES, speaker, { cps: CPS }) : [])].sort((a, b) => a - b)
  const guestHops = cfg.guest ? [T.guestIn + 0.3, ...(who === 'guest' ? talkHops(LINES, speaker, { cps: CPS }) : []), T.lastLand + 0.1, T.lastLand + 0.6] : null
  const starsHops = who === 'stars' ? talkHops(LINES, speaker, { cps: CPS }) : null
  const crowdHops = CROWD.map((_, i) => [T.crowdIn[i] + 0.25, T.squeal[0] + 0.03, ...T.stk.filter((_, k) => k === i || k === 2).map(s => s + 0.12 + 0.06 * i),
    ...(who === i ? talkHops(LINES, speaker, { cps: CPS }) : []), T.lastLand + 0.06 * i, T.lastLand + 0.5 + 0.06 * i].sort((a, b) => a - b))

  const phaseOf = t => t < T.screen[0] ? 'hook' : t < T.h2 ? 'reveal' : t < T.cut ? 'case' : t < T.last ? 'twist' : 'last'
  const nStk = t => T.stk.filter(s => t >= s + 0.1).length
  const needle = t => {
    const steps = [[T.land + 0.5, 0.06], [T.stk[0] + 0.1, 0.32], [T.stk[1] + 0.1, 0.56], [T.stk[2] + 0.1, 0.8], [T.lineDone, 0.9]]
    let v = 0.5 + 0.08 * Math.sin(t * 3)                   // before the reveal: idling around the middle
    for (const [s, val] of steps) if (t >= s) v = lerp(v, val, easeOutBack(prog(t, s, s + 0.4), 2.4))
    if (t >= T.lastLand) v = lerp(v, 1.18 + 0.05 * Math.sin(t * 20), easeOutBack(prog(t, T.lastLand, T.lastLand + 0.35), 2))
    return v
  }
  const defaultHero = (ph, t) => {
    if (ph === 'hook') {
      if (t > T.squeal[0] && t < T.squeal[1]) return { mood: 'wide', look: [0, 0], squash: 0.06 }
      if (t > T.taps[0] - 0.2 && t < T.squeal[0]) return { mood: 'neutral', look: [1, 0] }
      return { mood: 'happy' }
    }
    if (ph === 'reveal') return t < T.land + 0.6 ? { mood: 'sparkle', look: [0, -1] } : t < T.doubt[0] + 0.5 ? { mood: 'happy' } : { mood: 'neutral', look: [1, 1] }
    if (ph === 'case') return [{ mood: 'neutral', look: [0, 1] }, { mood: 'happy' }, { mood: 'sparkle', look: [0, 1] }, { mood: 'wide', look: [0, 1] }][nStk(t)]
    if (ph === 'twist') return { mood: 'happy' }
    return { mood: 'heart' }
  }
  const defaultCrowd = (i, ph, t) => {
    const pis = i === 3
    if (ph === 'hook') {
      if (t > T.squeal[0] && t < T.squeal[1]) return { mood: 'squint' }
      return { mood: 'neutral', look: [i < 2 ? 1 : -1, -1] }
    }
    if (ph === 'reveal') {
      if (t < T.doubt[0]) return { mood: 'wide', look: [i < 2 ? 1 : -1, -1] }
      if (pis) return { mood: 'wide', look: [-1, -1], bubble: '?' }
      return [{ mood: 'squint', bubble: '?' }, { mood: 'eyeroll', bubble: '…' }, { mood: 'squint', look: [-1, 0], bubble: '?' }][i]
    }
    if (ph === 'case') {
      const n = nStk(t)
      if (pis) return { mood: n >= 2 ? 'sparkle' : 'wide', look: [-1, -1], bubble: n >= 3 ? '!' : null }
      if (n >= 3) return { mood: 'wide', look: [i < 2 ? 1 : -1, -1], bubble: '!' }
      const won = [0, 2, 1].indexOf(i) < n
      if (won) return { mood: 'sparkle', look: [i < 2 ? 1 : -1, -1], bubble: '!' }
      return i === 1 ? { mood: 'eyeroll', bubble: '…' } : { mood: 'squint', bubble: '?' }
    }
    if (ph === 'twist') return t < T.lineDone ? { mood: 'wide', look: [i < 2 ? 1 : -1, -1] } : { mood: 'heart', bubble: 'heart' }
    return { mood: 'heart', bubble: 'heart' }
  }

  async function build(stage) {
    try {
      await Promise.all(["800 104px Inter", "800 40px Inter", "700 30px Inter", "italic 500 140px 'EB Garamond'", "italic 500 48px 'EB Garamond'", "600 34px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 26px 'Space Mono'", "700 20px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const CUR_L = makeCurtain(560, 820, -1), CUR_R = makeCurtain(560, 820, 1), VAL = makeValance(1080)
    const STAGE = makeStage(...POS.stage), PODIUM = makePodium()

    const H0 = popText(root, 'Hear me *out.*', { top: 196, size: 112, accentSize: 156, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: PINK })
    const H1 = popText(root, cfg.h1, { top: 172, size: 100, accentSize: 132, at: T.h1, late: cfg.h1Late ?? 1, lateAt: T.h1Land, gap: 0.1, accentColor: cfg.h1Accent || GOLD, fit: true })
    const H2 = popText(root, cfg.h2 || 'Okay. *Listen.*', { top: 190, size: 108, accentSize: 148, at: T.h2, gap: 0.16, accentColor: cfg.h2Accent || PINK, fit: true })
    const H3 = popText(root, cfg.h3, { top: 172, size: 100, accentSize: 132, at: T.h3, gap: 0.1, accentColor: cfg.h3Accent || '#7fe0ff', fit: true })
    const H4 = popText(root, cfg.last, { top: 168, size: 104, accentSize: 146, at: T.last, late: cfg.lastLate ?? 1, lateAt: T.lastLand, wobble: true, accentColor: cfg.lastAccent || GOLD, fit: true })
    const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.lastOut]]
    const sub = buildSticker(root, { text: cfg.sub || 'an *unpopular* crush opinion:', top: 600, size: 40, rot: -2, accent: '#b8326a' })
    const STK = cfg.stickers.map((s, i) => buildSticker(root, { tab: `REASON ${i + 1}`, text: s, top: 1548 + i * 112, cx: 540 + [-30, 25, -10][i], rot: [-2.5, 2, -1.5][i], size: 40 }))
    const box = dialogueBox(root, { lines: LINES, y: 1548, open: T.boxOpen, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, { at: T.bug })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    const ctx = { T, HERO, GUEST, POS, hero: null, guest: null, crowd: [] }

    function spotlight(t, k) {
      const a = clamp(prog(t, 0.6, 1.2)) * k * (0.85 + 0.15 * Math.sin(t * 1.7))
      if (a <= 0.01) return
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createLinearGradient(0, 470, 0, 1240)
      g.addColorStop(0, `rgba(255,226,160,${0.02 * a})`); g.addColorStop(1, `rgba(255,226,160,${0.16 * a})`)
      x.fillStyle = g
      x.beginPath(); x.moveTo(500, 470); x.lineTo(580, 470); x.lineTo(760, 1230); x.lineTo(320, 1230); x.closePath(); x.fill()
      x.fillStyle = `rgba(255,226,160,${0.14 * a})`
      x.beginPath(); x.ellipse(540, 1232, 230, 34, 0, 0, Math.PI * 2); x.fill()
      x.restore()
    }
    function screen(t, k) {
      const S0 = POS.screen, x0 = S0.cx - S0.w / 2
      // the roller bar is always there once the curtains open
      const rk = clamp(prog(t, 0.4, 0.9)) * clamp(k)
      if (rk <= 0.01) return
      const u = ease.outCubic(prog(t, ...T.screen))
      const hh = S0.h * u
      x.save(); x.globalAlpha = rk
      if (hh > 2) {
        // the canvas
        R(x, INK, x0 - 6, S0.top, S0.w + 12, hh + 6)
        R(x, '#f4efe6', x0, S0.top, S0.w, hh)
        R(x, '#dcd3c4', x0, S0.top, 8, hh); R(x, '#dcd3c4', x0 + S0.w - 8, S0.top, 8, hh)
        // projector light: a warm wash, flicker on the drop
        const fl = t < T.land + 0.25 ? 0.6 + 0.4 * Math.sin(t * 90) : 1
        x.save(); x.beginPath(); x.rect(x0, S0.top, S0.w, hh); x.clip()
        const g = x.createRadialGradient(S0.cx, S0.top + S0.h * 0.45, 20, S0.cx, S0.top + S0.h * 0.45, S0.w * 0.65)
        g.addColorStop(0, `rgba(255,236,190,${0.55 * fl})`); g.addColorStop(1, 'rgba(255,236,190,0)')
        x.fillStyle = g; x.fillRect(x0, S0.top, S0.w, S0.h)
        // the picture
        const sc = cfg.screen
        const bh = sc.bits.length * sc.cell
        const Sbox = { x0, y0: S0.top, w: S0.w, h: S0.h, cx: S0.cx, cy: S0.top + (S0.h - 66) / 2 + 6 }
        const pk = pop01(t, T.land - 0.1, 0.35, 2.2)
        if (pk > 0.01) drawBits(x, sc.bits, sc.cols, S0.cx, Sbox.cy + (sc.dy || 0), sc.cell * pk, { alpha: fl })
        if (cfg.screenDraw) cfg.screenDraw(x, t, T, ctx, Sbox)
        // the caption, typed on (mono, like a slide title)
        const cf = prog(t, ...T.caption)
        if (cf > 0) {
          const txt = sc.caption, n = Math.round(txt.length * cf)
          x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
          const full = x.measureText(txt).width
          const cy = S0.top + S0.h - 34
          x.fillStyle = INK; x.fillRect(S0.cx - full / 2 - 18, cy - 24, full + 36, 48)
          x.fillStyle = sc.capColor || GOLD; x.textAlign = 'left'
          x.fillText(txt.slice(0, n), S0.cx - full / 2, cy + 2)
          if (cf < 1 && Math.sin(t * 30) > 0) R(x, sc.capColor || GOLD, S0.cx - full / 2 + x.measureText(txt.slice(0, n)).width + 2, cy - 16, 14, 32)
        }
        x.restore()
        // the bottom bar + pull tab
        R(x, INK, x0 - 10, S0.top + hh - 4, S0.w + 20, 14); R(x, '#8b8270', x0 - 6, S0.top + hh - 1, S0.w + 12, 7)
        R(x, INK, S0.cx - 9, S0.top + hh + 8, 18, 24); R(x, GOLD, S0.cx - 5, S0.top + hh + 12, 10, 16)
      }
      // the roller
      R(x, INK, x0 - 26, S0.top - 18, S0.w + 52, 26); R(x, '#cfc6b4', x0 - 20, S0.top - 14, S0.w + 40, 14); R(x, '#8b8270', x0 - 20, S0.top - 4, S0.w + 40, 4)
      x.restore()
    }
    function curtains(t) {
      // closed: the two panels meet in the middle; open: gathered at the sides
      const o = ease.inOutCubic(prog(t, ...T.curtain))
      const wL = 560 * lerp(1, 0.3, o) + 10
      x.drawImage(CUR_L, 0, 0, 560, 820, lerp(0, -20, o), 470, wL, 820)
      x.drawImage(CUR_R, 0, 0, 560, 820, 1080 - wL - lerp(0, -20, o), 470, wL, 820)
      x.drawImage(VAL, 0, 430)
    }
    function podium(t, k) {
      const r = ease.outBack(prog(t, ...T.podium))
      const P = POS.podium, dy = (1 - r) * 500
      x.save(); x.globalAlpha = clamp(k)
      x.drawImage(PODIUM, P.cx - PODIUM.width / 2, P.top + dy)
      // the dial: MEH (cool) → SWOON (hot pink), needle
      const D = POS.dial, cy = D.cy + dy
      const n = 11
      for (let i = 0; i < n; i++) {
        const a = Math.PI + (i / (n - 1)) * Math.PI
        const col = i < 3 ? '#7fd0ff' : i < 6 ? '#e9e0d0' : i < 9 ? PINK : HEART
        const px = D.cx + Math.cos(a) * D.r, py = cy + Math.sin(a) * D.r
        R(x, INK, px - 9, py - 9, 18, 18); R(x, col, px - 6, py - 6, 12, 12)
      }
      x.font = `700 20px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'center'
      x.fillStyle = '#7fd0ff'; x.fillText('MEH', D.cx - D.r + 6, cy + 24)
      x.fillStyle = PINK; x.fillText('SWOON', D.cx + D.r - 12, cy + 24)
      const v = needle(t), a = Math.PI + clamp(v, -0.1, 1.25) * Math.PI
      x.save(); x.translate(D.cx, cy); x.rotate(a)
      R(x, INK, -6, -6, D.r - 4, 12); R(x, v > 0.75 ? HEART : GOLD, -2, -3, D.r - 12, 6)
      x.restore()
      R(x, INK, D.cx - 12, cy - 12, 24, 24); R(x, GOLD, D.cx - 7, cy - 7, 14, 14)
      if (t > T.lastLand && t < T.lastLand + 0.6) sparkles(x, t, D.cx + D.r, cy - 10, T.lastLand, 8, 50, 2, [HEART, GOLD, BONE], 0.6)
      x.restore()
      return dy
    }
    function mic(t, dy, k) {
      // the gooseneck: from the slab up to the hero's mouth
      const P = POS.podium, bx = 672, by = P.top + 4 + dy
      x.save(); x.globalAlpha = clamp(k)
      const tapK = T.taps.reduce((m, s) => Math.max(m, t > s && t < s + 0.15 ? 1 - (t - s) / 0.15 : 0), 0)
      const pts = [[bx, by], [bx + 10, by - 24], [bx + 14, by - 46], [bx + 8, by - 64], [bx - 6 - 4 * tapK, by - 78 + 4 * tapK]]
      for (const [px, py] of pts) { R(x, INK, px - 8, py - 8, 16, 16) }
      for (const [px, py] of pts) { R(x, '#3a3550', px - 5, py - 5, 10, 10) }
      const [hx, hy] = pts[pts.length - 1]
      drawBits(x, ['.MMM.', 'MmMmM', 'MMMMM', 'MmMmM', '.MMM.'], { M: '#5b5670', m: '#a9a3c0' }, hx - 8, hy - 10, 6, { rot: -0.5 })
      x.restore()
      // tap tap / the squeal
      for (const [i, s] of T.taps.entries()) {
        const kk = pop01(t, s, 0.18, 2.6) * (1 - prog(t, s + 0.4, s + 0.55))
        if (kk > 0.01) { x.save(); x.translate(hx + 60 + i * 34, hy - 50 - i * 30); x.scale(kk, kk); x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.strokeStyle = INK; x.lineWidth = 8; x.textAlign = 'center'; x.strokeText('tap', 0, 0); x.fillText('tap', 0, 0); x.restore() }
      }
      const sq = prog(t, ...T.squeal)
      if (sq > 0 && sq < 1) {
        x.save(); x.globalAlpha = Math.sin(Math.PI * sq)
        for (let r = 0; r < 3; r++) { const rr = 30 + ((sq * 3 + r / 3) % 1) * 120; x.strokeStyle = r % 2 ? PINK : BONE; x.lineWidth = 6; x.beginPath(); x.arc(hx, hy - 10, rr, -0.9, 0.5); x.stroke() }
        x.font = `800 40px ${INTER}`; x.fillStyle = PINK; x.strokeStyle = INK; x.lineWidth = 9; x.textAlign = 'left'
        const jit = Math.sin(t * 80) * 4
        x.strokeText('EEEEEE', hx + 50 + jit, hy - 80); x.fillText('EEEEEE', hx + 50 + jit, hy - 80)
        x.restore()
      }
    }
    function bubble(cx, cy, kind, k) {
      if (!kind || k <= 0.01) return
      x.save(); x.translate(cx, cy); x.scale(k, k)
      if (kind === 'heart') { drawHeart(x, 0, 0, 7); x.restore(); return }
      const w = kind === '…' ? 78 : 58, h = 58
      R(x, INK, -w / 2 - 5, -h / 2, w + 10, h); R(x, INK, -w / 2, -h / 2 - 5, w, h + 10)
      R(x, kind === '!' ? '#ffe27a' : BONE, -w / 2, -h / 2, w, h)
      R(x, INK, -6, h / 2 + 4, 12, 10); R(x, kind === '!' ? '#ffe27a' : BONE, -3, h / 2, 6, 8)
      x.font = `800 42px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(kind === '…' ? '...' : kind, 0, kind === '…' ? -6 : 3)
      x.restore()
    }
    function crowd(t, k) {
      if (k <= 0) return
      const ph = phaseOf(t)
      CROWD.forEach((C, i) => {
        const P = POS.crowd[i]
        const pk = pop01(t, T.crowdIn[i], 0.35, 2.1) * k
        if (pk <= 0.01) return
        const md = { ...defaultCrowd(i, ph, t), ...(cfg.crowdMoods ? cfg.crowdMoods(i, ph, t, T) || {} : {}) }
        const opts = { color: C.color, glyph: C.glyph, mood: md.mood, look: md.look, hops: crowdHops[i], pop: pk, seed: 11 + i * 3, glow: 0.8, squash: md.squash || 0 }
        // the faint: tip over backwards into the seat
        const fp = i === fainter ? ease.inOutCubic(prog(t, ...T.faint)) : 0
        x.save()
        if (fp > 0) { x.translate(P.x, P.y + 60); x.rotate(-1.35 * fp * (i < 2 ? 1 : -1)); x.translate(-P.x, -(P.y + 60)) }
        drawStarChar(x, P.x, P.y + fp * 30, P.s, t, fp > 0.5 ? { ...opts, mood: 'heart' } : opts)
        const F = starFrame(P.x, P.y + fp * 30, P.s, t, opts)
        ctx.crowd[i] = { ...P, F }
        if (i === 3) inSprite(x, F, () => tearsCells(x, t, t > T.lastLand ? 3 : t > T.stk[1] ? 2 : t > T.doubt[0] ? 1 : 0))
        x.restore()
        // the bubble over the head
        if (md.bubble && fp < 0.2) {
          const born = md.bubble === 'heart' ? Math.max(T.lineDone, ph === 'last' ? T.lastLand : 0) : md.bubble === '!' ? (ph === 'case' ? T.stk[Math.min(2, nStk(t) - 1)] + 0.1 : T.doubt[i % 3]) : T.doubt[i % 3]
          const bk = pop01(t, born + 0.04 * i, 0.25, 2.6) * clamp(k)
          bubble(P.x + (i < 2 ? 44 : -44), P.y - 0.82 * P.s + (md.bubble === 'heart' ? 8 * Math.sin(t * 5 + i) : 0), md.bubble, bk)
        }
      })
      // the seat backs (velvet), in front of the row
      x.save(); x.globalAlpha = clamp(k)
      for (const [i, P] of POS.crowd.entries()) {
        const sk = clamp(prog(t, T.crowdIn[i] - 0.2, T.crowdIn[i]))
        if (sk <= 0) continue
        const y0 = 1462 + (1 - sk) * 80
        R(x, INK, P.x - 102, y0 - 6, 204, 96); R(x, VELVET.V, P.x - 96, y0, 192, 84); R(x, VELVET.w, P.x - 96, y0, 192, 10); R(x, VELVET.d, P.x - 96, y0 + 70, 192, 14)
        R(x, GOLD, P.x - 6, y0 + 26, 12, 12)
      }
      x.restore()
    }
    function heroStar(t, k) {
      const H = POS.hero
      const ri = ease.outBack(prog(t, T.heroIn, T.heroIn + 0.4))
      const hk = clamp(ri * 3) * k
      if (hk <= 0.01) return
      const ph = phaseOf(t)
      const md = { ...defaultHero(ph, t), ...(cfg.moods ? cfg.moods(ph, t, T) || {} : {}) }
      const y = H.y + (1 - ri) * 160
      const opts = { color: HERO.color, glyph: HERO.glyph, mood: md.mood, look: md.look, hops: heroHops, pop: hk, seed: 3, glow: 1.1, squash: md.squash || 0 }
      drawStarChar(x, H.x, y, H.s, t, opts)
      const F = starFrame(H.x, y, H.s, t, opts)
      ctx.hero = { ...H, y, F, mood: md.mood }
      if (cfg.heroProp) inSprite(x, F, () => cfg.heroProp(x, F, t, T, ctx))
    }
    function guestStar(t, k) {
      if (!cfg.guest || t < T.guestIn) return
      const gk = pop01(t, T.guestIn, 0.38, 2.1) * k
      const walk = ease.outCubic(prog(t, T.guestIn, T.guestIn + 0.45))
      const D = POS.guest
      const dm = cfg.guestMoods ? cfg.guestMoods(t, T) : { mood: 'happy', look: [1, -1] }
      const o2 = { color: GUEST.color, glyph: GUEST.glyph, mood: dm.mood, look: dm.look, hops: guestHops, pop: gk, seed: 8, glow: 1.1 }
      const gx0 = lerp(-120, D.x, walk)
      if (gk > 0.01) { drawStarChar(x, gx0, D.y, D.s, t, o2); ctx.guest = { ...D, x: gx0, F: starFrame(gx0, D.y, D.s, t, o2) } }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const push = ease.inOutCubic(prog(t, 0, 3.8))
        drawSky(x, t, { ...SKY_H, zoom: lerp(1.7, SKY_H.zoom, push), dy: lerp(-40, 0, push), dim: 0.42, moon: null })
        const dtL = t - T.land, dtH = t - T.lastLand
        const shake = (dtL > 0 && dtL < 0.4 ? 10 * Math.exp(-dtL * 9) * Math.sin(dtL * 60) : 0) + (dtH > 0 && dtH < 0.35 ? 9 * Math.exp(-dtH * 10) * Math.sin(dtH * 60) : 0)
          + (t > T.squeal[0] && t < T.squeal[1] ? 3 * Math.sin(t * 95) : 0)
        x.save(); x.translate(shake * 0.4, shake)
        if (t < T.out[1] + 0.02) {
          const k = popOut(t, T.out)
          // the house: a dark back wall, the stage floor, the screen
          x.save(); x.globalAlpha = 0.55 * clamp(k); R(x, '#0b0720', 0, 470, 1080, POS.stage[0] - 470); x.restore()
          x.save(); x.globalAlpha = clamp(k); x.drawImage(STAGE, 0, POS.stage[0]); x.restore()
          screen(t, k)
          x.save(); x.globalAlpha = clamp(k); curtains(t); x.restore()
          spotlight(t, k)
          if (cfg.back) cfg.back(x, t, T, ctx)
          guestStar(t, k)
          heroStar(t, k)
          const dy = podium(t, k)
          mic(t, dy, k)
          crowd(t, k)
          // THE STARS narrator (only when it speaks): a small gold star top-right of the box
          if (starsHops) {
            const nk = pop01(t, T.boxOpen, 0.35, 2.1) * outK(t, [T.boxClose, T.boxClose + 0.25])
            if (nk > 0.01) drawStarChar(x, 930, 1500, 120, t, { color: STAR.sky, mood: 'happy', hops: starsHops, pop: nk, seed: 2, glow: 1.0 })
          }
          if (cfg.front) cfg.front(x, t, T, ctx)
          // the last line's burst: hearts rain over the house
          if (t > T.lastLand) {
            const tt = t - T.lastLand
            x.save(); x.globalAlpha = clamp(k)
            for (let i = 0; i < 14; i++) {
              const ph = (tt * 0.55 + i * 0.071) % 1, hx = 80 + ((i * 397) % 920) + 20 * Math.sin(tt * 3 + i)
              if (tt * 0.55 + i * 0.071 < 0.071 * i) continue
              drawHeart(x, hx, 480 + ph * 1000, 5 + (i % 3), Math.sin(Math.PI * ph))
            }
            x.restore()
          }
          if (ctx.hero) sparkles(x, t, POS.hero.x, POS.hero.y - 40, T.lastLand + 0.02, 12, 200, 1, [GOLD, BONE, PINK])
          sparkles(x, t, POS.screen.cx, POS.screen.top + 130, T.land, 10, 260, 2, [GOLD, BONE])
        }
        x.restore()
        sub.update(t, T.sub, outK(t, T.subOut))
        STK.forEach((s, i) => s.update(t, T.stk[i], outK(t, T.stkOut)))
        box.update(t)
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        bug.update(t, outK(t, T.bugOut))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // ── the one card-cut candidate (cardfx plays it): THE CASE → TWIST
  const CUTS = [T.cut]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const typing = Array.from({ length: 12 }, (_, i) => ['tick', r3(T.caption[0] + i * (T.caption[1] - T.caption[0]) / 12), 0.022 + (i % 3) * 0.006])
  const CUES = [
    ['whoosh', T.curtain[0], 0.8, 0.05], ['whoosh', r3(T.curtain[0] + 0.15), 0.6, 0.03], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
    ['tom', r3(T.podium[1] - 0.05), 90, { gain: 0.14, decay: 0.3 }],
    ['pop', T.h0, 783.99, 0.026, -0.15], ['pop', r3(T.h0 + 0.07), 880, 0.026, 0.15], ['pop', T.h0Land, 1046.5, 0.05, 0], ['pop', r3(T.h0Land + 0.1), 1318.51, 0.035, 0],
    ['pop', T.heroIn + 0.05, 783.99, 0.035, 0],
    ...T.crowdIn.map((c, i) => ['pop', r3(c + 0.05), NOTE[i + 1], 0.025, [-0.5, -0.2, 0.2, 0.5][i]]),
    ...T.taps.flatMap(s => [['tom', s, 150, { gain: 0.2, decay: 0.12 }], ['tick', s, 0.05]]),
    ['pluck', T.squeal[0], 2637, 0.02, 0.5, 0.2], ['pluck', r3(T.squeal[0] + 0.08), 2793.83, 0.016, 0.45, 0.2], ['pluck', r3(T.squeal[0] + 0.16), 2959.96, 0.012, 0.35, 0.2],
    ['pop', T.sub, 1174.66, 0.03, 0.3], ['tick', r3(T.sub + 0.08), 0.03],
    ['riser', r3(T.screen[0] - 0.9), r3(T.screen[0]), 0.035],
    ['whoosh', T.screen[0], 0.4, 0.04], ['boom', T.land, 0.3], ['tom', T.land, 70, { gain: 0.28, decay: 0.4 }], ['bell', r3(T.land + 0.05), 1046.5, 0.03, 1.4, 0], ['glitter', T.land, r3(T.land + 0.5)],
    ...wordPops(T.h1, 2, 0.1, 1), ['pop', T.h1Land, 1174.66, 0.04, 0],
    ...typing,
    ...T.doubt.map((d, i) => ['pop', r3(d), [392, 349.23, 392][i], 0.03, [-0.5, -0.2, 0.2][i]]),
    ...wordPops(T.h2, 2, 0.16, 2, 0.03),
    ...T.stk.map((s, i) => ['pop', s, NOTE[(i * 2 + 1) % 7] * 1.5, 0.045, [-0.3, 0.3, 0][i]]), ...T.stk.map(s => ['tick', r3(s + 0.06), 0.035]),
    ...T.stk.map((s, i) => ['pluck', r3(s + 0.12), NOTE[i + 3] * 2, 0.022, 0.5, 0.4]),
    ['bell', r3(T.stk[2] + 0.1), 1567.98, 0.025, 0.8, 0],
    ...wordPops(T.h3, 3, 0.1, 3),
    ...talkCues(LINES, { cps: CPS }),
    ...wordPops(T.last, 2, 0.08, 0, 0.028), ['pop', T.lastLand, 1046.5, 0.05, 0], ['bell', r3(T.lastLand + 0.03), 2093, 0.03, 1.4, 0], ['glitter', T.lastLand, r3(T.lastLand + 0.7)],
    ['whoosh', T.faint[0], 0.35, 0.025], ['tom', T.faint[1], 80, { gain: 0.16, decay: 0.25 }],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.guest ? [['whoosh', T.guestIn, 0.35, 0.03], ['pop', r3(T.guestIn + 0.3), 880, 0.04, -0.4]] : []),
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  const music = { style: 'cinematic', key: cfg.key, seed: cfg.seed, sections: { drop: T.drop, breakdown: [T.cut], lift: [T.last], outroAt: STORY_END }, hits: [T.lastLand] }
  return { DURATION, SCENES, CUES, T, music }
}
