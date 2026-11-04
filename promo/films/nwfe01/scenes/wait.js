// WAIT FOR IT kit, Volume 2 (star_advice trial reels nwfe01–nwfe12, promo/films/next30/b47.md).
// Adapted from the Volume 1 kit (trwaittaurus/scenes/wait.js) for trial reels: FRAME 0 IS THE THUMBNAIL, so there is no
// fade from black, and the hook headline, the "wait for it…" sticker, the bug, the bar and both stars are already on
// screen at t = 0. All twelve episodes import this one file from nwfe01.
// Extra cfg: noPis (the hero is Pisces: no background Pisces), heroTears(phase, t, T) → 0…3 tears on the hero,
// heroDX(t, T) → a horizontal offset for the hero (it can leave the frame and come back).
//
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, T, music }      a 20 s film: story 0–15.6, then the shared end card.
//
// The beats (identical timing in every episode):
//   0.0–3.8   HOOK     the setup headline + the sticker "wait for it…". The hero star starts the slow thing; the date
//                      star waits on the right. The WAIT FOR IT progress bar starts crawling along the bottom.
//   3.95–9.3  BUILD    the suspicious headline ("this is going badly…"). The camera creeps in, the picture drifts and
//                      tilts (slowed-down tape), a cold purple tint and a closing vignette; a clock ticks every beat.
//                      Three suspicious stickers stack up (rule of three, the third twisted). The bar crawls to 99%
//                      and STALLS ("99%… still loading"). Silence before the punchline. Pisces bites its lip, sniffling.
//   9.45      card cut (the only candidate: cardfx plays it)
//   9.5–13.4  REVEAL   on the music drop: warm gold flash, rays from the reveal point, the tint lifts, the bar snaps to
//                      100% "TWIST LOADED". The reveal headline + one dialogue line.
//   13.45–15.5 LAST    the last line slams in on the hit; hearts float up; Pisces fountains happy tears.
//
// cfg = {
//   id, key, seed,
//   hero: { sign, tag?, lineColor? },  date: { sign, tag?, lineColor? }
//   h0, h1, h2, last (+ h0Accent, h1Accent, h2Accent, lastAccent, *Late counts)   `*word*` = italic accent, `|` = break
//   stickers: [text ×3]                 the build's three suspicious captions (`*word*` = accent)
//   line: { who: 'hero' | 'date' | 'stars', text }
//   pos?: { hero, date, pis }            overrides of POS
//   focus?: { x, y }                     what the camera creeps toward in the build (default: the hero)
//   glow?: { x, y }                      where the reveal's gold rays come from (default: between the stars)
//   moods?(phase, t, T) / dateMoods?(phase, t, T) → { mood, look, squash? }   phase: hook | build | reveal | last
//   back?(x, t, T, ctx) / mid?(x, t, T, ctx) / front?(x, t, T, ctx)   episode drawing: behind everything on the floor,
//                                                                      between the stars and the props, on top
//   heroProp?(x, F, t, T, ctx)           drawn in the hero's sprite cells (see inSprite)
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

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', LILAC = '#c7a6ff', ROSE = '#ff6f9a'
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
  black: [-1, -0.9], bug: -1, heroIn: -1, dateIn: -0.8, floorIn: [-1, -0.5],
  h0: -1, h0Land: -0.6, h0Out: [3.65, 3.85], sub: -1, subOut: [3.55, 3.8],
  pisIn: [2.2, 2.6],
  build: 3.95, h1: 3.95, h1Land: BEAT(7) + 0.02, h1Out: [9.1, 9.3],
  stk: [4.9, 6.3, 7.7], stkOut: [9.0, 9.28], stall: 8.1,
  push: [3.9, 9.3],
  cut: 9.45,
  reveal: BEAT(16),                                      // 9.489: the drop
  h2: 9.55, h2Land: BEAT(17) + 0.02, h2Out: [13.2, 13.4], line: 10.6,
  last: 13.45, lastLand: BEAT(24) - 0.02,                // 13.93 (the hit)
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

// ── the show bug: a pixel hourglass + "WAIT FOR IT…" (Inter 800, letter-spaced small caps, lilac), top-left 56 px
const BUG_ICON = ['GGGGGGG', '.SsssS.', '..SsS..', '...S...', '..S.S..', '.SsssS.', 'GGGGGGG']
function buildBug(root, { at }) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '40px', height: '44px', imageRendering: 'pixelated' }, box)
  ic.width = 40; ic.height = 44
  const icx = ic.getContext('2d')
  const word = el('div', { font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: LILAC, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'WAIT&nbsp;FOR&nbsp;IT…')
  let flipped = null
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
      // the hourglass flips once a beat-and-a-bit (sand: top → bottom), frozen while the bar stalls
      const f = Math.floor(t / 2.2) % 2
      if (f !== flipped) {
        flipped = f
        icx.clearRect(0, 0, 40, 44)
        const rows = f ? [...BUG_ICON].reverse() : BUG_ICON
        drawBits(icx, rows, { G: GOLD, S: LILAC, s: '#ffe7a0' }, 20, 22, 5)
      }
      word.style.letterSpacing = '0.2em'
    },
  }
}

// ── stickers (DOM): a white caption sticker. `*word*` = italic accent.
const accentHTML = (s, col) => s.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 1.18em ${SERIF};color:${col}">$1</span>`)
function buildSticker(root, { text, top, cx = 540, rot = 0, size = 40, accent = '#7a3fd0', width = 960, bg = '#fffaf0' }) {
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

// ── layout
export const POS = {
  hero: { x: 270, y: 1060, s: 250 },
  date: { x: 850, y: 1075, s: 210 },
  pis: { x: 985, y: 790, s: 128 },
  floorY: 930,
  bar: { x: 130, y: 1800, w: 820, h: 26 },
}

/** the WAIT FOR IT bar's fill (0…1) at t: crawls, stalls at 99%, snaps to 100% on the reveal */
export function barAt(t, T) {
  if (t < T.reveal) {
    const a = 0.04 + 0.08 * ease.outCubic(prog(t, 0, 3.6))
    const b = 0.87 * ease.inOutQuad(prog(t, T.build, T.stall))
    return Math.min(0.99, a + b)
  }
  return lerp(0.99, 1, ease.outCubic(prog(t, T.reveal, T.reveal + 0.25)))
}

export function makeEpisode(cfg) {
  const T = { ...TL }
  const P = { ...POS, ...(cfg.pos || {}) }
  const HERO = signStar(cfg.hero.sign), DATE = signStar(cfg.date.sign), PIS = signStar('pisces')
  const heroTag = cfg.hero.tag || `${HERO.glyph}︎ ${cfg.hero.sign.toUpperCase()}`
  const dateTag = cfg.date.tag || `${DATE.glyph}︎ ${cfg.date.sign.toUpperCase()}`
  const who = cfg.line.who
  const speaker = who === 'hero' ? heroTag : who === 'date' ? dateTag : 'THE STARS'
  const lineCol = who === 'hero' ? (cfg.hero.lineColor || '#ffd27a') : who === 'date' ? (cfg.date.lineColor || '#9fe6b0') : GOLD
  const LINES = [{ t: T.line, speaker, color: lineCol, text: cfg.line.text }]
  const tm = lineTimes(LINES, { cps: CPS })[0]
  T.lineDone = tm.done
  T.boxOpen = r3(T.line - 0.2)
  T.boxClose = r3(Math.max(tm.done + 1.6, 13.6))
  if (T.boxClose > T.out[0]) throw new Error(`line too long: done ${tm.done}`)
  const focus = cfg.focus || { x: P.hero.x, y: P.hero.y - 80 }
  const glowAt = cfg.glow || { x: (P.hero.x + P.date.x) / 2, y: 900 }
  const tickTimes = Array.from({ length: 12 }, (_, i) => r3(BEAT(7) + i * (60 / 108))).filter(v => v < T.stall + 0.2)
  const heroHops = [T.heroIn + 0.35, T.reveal + 0.05, T.lastLand + 0.02, T.lastLand + 0.5,
    ...(who === 'hero' ? talkHops(LINES, speaker, { cps: CPS }) : []), ...(cfg.heroHops || [])].sort((a, b) => a - b)
  const dateHops = [T.dateIn + 0.3, T.reveal + 0.15, ...(who === 'date' ? talkHops(LINES, speaker, { cps: CPS }) : []), T.lastLand + 0.1, T.lastLand + 0.6, ...(cfg.dateHops || [])].sort((a, b) => a - b)
  const starsHops = who === 'stars' ? talkHops(LINES, speaker, { cps: CPS }) : null

  const phaseOf = t => t < T.build ? 'hook' : t < T.reveal ? 'build' : t < T.last ? 'reveal' : 'last'
  const heroDefault = (ph, t) => {
    if (ph === 'hook') return { mood: 'neutral', look: [1, 0.6] }
    if (ph === 'build') return t > T.stall ? { mood: 'squint', look: [0, 0] } : { mood: 'squint', look: [1, 0.8] }
    if (ph === 'reveal') return { mood: 'happy' }
    return { mood: 'heart' }
  }
  const dateDefault = (ph, t) => {
    if (ph === 'hook') return { mood: 'neutral', look: [-1, 0] }
    if (ph === 'build') return t > T.stk[1] ? { mood: 'wide', look: [-1, 0.3] } : { mood: 'neutral', look: [-1, 0.3] }
    if (ph === 'reveal') return t < T.reveal + 0.5 ? { mood: 'wide', look: [-1, 0] } : { mood: 'sparkle', look: [-1, 0] }
    return { mood: 'heart', look: [-1, 0] }
  }

  async function build(stage) {
    try {
      await Promise.all(["800 104px Inter", "800 40px Inter", "700 30px Inter", "italic 500 140px 'EB Garamond'", "italic 500 48px 'EB Garamond'", "600 34px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')

    const H0 = popText(root, cfg.h0, { top: 172, size: 100, accentSize: 132, at: T.h0, late: cfg.h0Late ?? 0, lateAt: T.h0Land, wobble: true, accentColor: cfg.h0Accent || GOLD, fit: true })
    const H1 = popText(root, cfg.h1, { top: 172, size: 100, accentSize: 132, at: T.h1, late: cfg.h1Late ?? 1, lateAt: T.h1Land, gap: 0.14, accentColor: cfg.h1Accent || LILAC, fit: true })
    const H2 = popText(root, cfg.h2, { top: 172, size: 100, accentSize: 132, at: T.h2, late: cfg.h2Late ?? 1, lateAt: T.h2Land, gap: 0.1, accentColor: cfg.h2Accent || PINK, fit: true })
    const H3 = popText(root, cfg.last, { top: 168, size: 108, accentSize: 150, at: T.last, late: cfg.lastLate ?? 1, lateAt: T.lastLand, wobble: true, accentColor: cfg.lastAccent || GOLD, fit: true })
    const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.lastOut]]
    const sub = buildSticker(root, { text: cfg.sub || 'wait for it…', top: 438, size: 38, rot: -2.5, accent: '#7a3fd0' })
    const STK = cfg.stickers.map((s, i) => buildSticker(root, { text: s, top: 1395 + i * 112, cx: 540 + [-30, 25, -5][i], rot: [-2.5, 2, -1.2][i], size: 38 }))
    const box = dialogueBox(root, { lines: LINES, y: 1440, open: T.boxOpen, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, { at: T.bug })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    const ctx = { T, HERO, DATE, P, hero: null, date: null, phaseOf, build: 0, warm: 0 }

    function floor(t) {
      const k = ease.outCubic(prog(t, ...T.floorIn)) * clamp(popOut(t, T.out))
      if (k <= 0.01) return
      const fy = P.floorY + (1 - k) * 600
      const g = x.createLinearGradient(0, fy, 0, 1920)
      g.addColorStop(0, '#3a2466'); g.addColorStop(0.25, '#24164a'); g.addColorStop(1, '#0d0820')
      x.fillStyle = g; x.fillRect(0, fy, 1080, 1920 - fy)
      // floorboards (pixel lines receding)
      x.save(); x.globalAlpha = 0.35
      for (let i = 0; i < 9; i++) { const yy = fy + 14 + i * i * 9.5; R(x, '#4a3180', 0, yy, 1080, 3) }
      x.restore()
      R(x, INK, 0, fy - 4, 1080, 8); R(x, '#6b4fb0', 0, fy + 4, 1080, 4)
      // spotlight pools under the stars
      for (const [px, w, a] of [[P.hero.x, 230, 0.22], [P.date.x, 190, 0.16]]) {
        const pg = x.createRadialGradient(px, P.hero.y + 135, 0, px, P.hero.y + 135, w)
        pg.addColorStop(0, `rgba(255,220,160,${a * k})`); pg.addColorStop(1, 'rgba(255,220,160,0)')
        x.save(); x.translate(0, 0); x.scale(1, 1); x.fillStyle = pg; x.fillRect(px - w, P.hero.y + 60, w * 2, 160); x.restore()
      }
    }

    function rays(t) {
      const a = clamp(prog(t, T.reveal, T.reveal + 0.35)) * outK(t, T.out)
      if (a <= 0.01) return
      x.save(); x.translate(glowAt.x, glowAt.y); x.globalCompositeOperation = 'lighter'
      const n = 14
      for (let i = 0; i < n; i++) {
        const ang = (i / n) * Math.PI * 2 + t * 0.25
        const L = 900, wA = 0.07
        const g = x.createLinearGradient(0, 0, Math.cos(ang) * L, Math.sin(ang) * L)
        const flick = 0.75 + 0.25 * Math.sin(t * 2.3 + i * 1.7)
        g.addColorStop(0, `rgba(255,214,140,${0.2 * a * flick})`); g.addColorStop(1, 'rgba(255,214,140,0)')
        x.fillStyle = g
        x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ang - wA) * L, Math.sin(ang - wA) * L); x.lineTo(Math.cos(ang + wA) * L, Math.sin(ang + wA) * L); x.closePath(); x.fill()
      }
      const cg = x.createRadialGradient(0, 0, 0, 0, 0, 360)
      cg.addColorStop(0, `rgba(255,224,170,${0.28 * a})`); cg.addColorStop(1, 'rgba(255,224,170,0)')
      x.fillStyle = cg; x.fillRect(-360, -360, 720, 720)
      x.restore()
    }

    function pisces(t) {
      if (cfg.noPis || t < T.pisIn[0] || t > T.out[1]) return
      const peek = ease.outBack(prog(t, ...T.pisIn)), k = popOut(t, T.out)
      const Q = P.pis, px = lerp(Q.x + 130, Q.x, peek)
      const ph = phaseOf(t)
      const tears = ph === 'last' ? 3 : ph === 'reveal' ? 2 : t > T.stk[1] ? 1 : 0
      const mood = ph === 'last' || ph === 'reveal' ? 'happy' : t > T.stk[0] ? 'wide' : 'neutral'
      const opts = { color: PIS.color, mood, look: [-1, 0.2], seed: 6, glow: 0.7, alpha: clamp(k), hops: [T.reveal + 0.2, T.lastLand + 0.1, T.lastLand + 0.55], squash: ph === 'build' ? 0.04 * Math.sin(t * 22) * (t > T.stall ? 1 : 0.3) : 0 }
      drawStarChar(x, px, Q.y, Q.s, t, opts)
      const F = starFrame(px, Q.y, Q.s, t, opts)
      inSprite(x, F, () => tearsCells(x, t, tears))
    }

    function stars(t) {
      const k = popOut(t, T.out)
      if (k <= 0) return
      const ph = phaseOf(t)
      // the date
      const dk = pop01(t, T.dateIn, 0.38, 2.1) * k
      if (dk > 0.01) {
        const dm = { ...dateDefault(ph, t), ...(cfg.dateMoods ? cfg.dateMoods(ph, t, T) || {} : {}) }
        const D = P.date
        const o2 = { color: DATE.color, glyph: DATE.glyph, mood: dm.mood, look: dm.look, hops: dateHops, pop: dk, seed: 8, glow: 1.1, squash: dm.squash || 0 }
        drawStarChar(x, D.x, D.y, D.s, t, o2)
        ctx.date = { ...D, F: starFrame(D.x, D.y, D.s, t, o2), mood: dm.mood }
      }
      // the hero
      const hk = pop01(t, T.heroIn, 0.4, 2.1) * k
      if (hk > 0.01) {
        const md = { ...heroDefault(ph, t), ...(cfg.moods ? cfg.moods(ph, t, T) || {} : {}) }
        const H = cfg.heroDX ? { ...P.hero, x: P.hero.x + cfg.heroDX(t, T) } : P.hero
        const opts = { color: HERO.color, glyph: HERO.glyph, mood: md.mood, look: md.look, hops: heroHops, pop: hk, seed: 3, glow: 1.1, squash: md.squash || 0 }
        drawStarChar(x, H.x, H.y, H.s, t, opts)
        const F = starFrame(H.x, H.y, H.s, t, opts)
        ctx.hero = { ...H, F, mood: md.mood }
        const ht = cfg.heroTears ? cfg.heroTears(ph, t, T) : 0
        if (ht) inSprite(x, F, () => tearsCells(x, t, ht))
        if (cfg.heroProp) inSprite(x, F, () => cfg.heroProp(x, F, t, T, ctx))
      }
      // THE STARS narrator (only when it speaks): a small gold star top-right of the box
      if (starsHops) {
        const nk = pop01(t, T.boxOpen, 0.35, 2.1) * outK(t, [T.boxClose, T.boxClose + 0.25])
        if (nk > 0.01) drawStarChar(x, 920, 1380, 120, t, { color: STAR.sky, mood: 'happy', hops: starsHops, pop: nk, seed: 2, glow: 1.0 })
      }
    }

    function hearts(t) {
      if (t < T.lastLand || t > T.out[1]) return
      const a = outK(t, T.out)
      for (let i = 0; i < 9; i++) {
        const born = T.lastLand + i * 0.13
        const p = (t - born) / 1.6
        if (p < 0 || p > 1) continue
        const hx = glowAt.x + Math.sin(i * 2.3) * 320 + Math.sin(t * 3 + i) * 18, hy = glowAt.y + 260 - p * 620
        drawBits(x, HEART, { H: i % 3 ? ROSE : PINK }, hx, hy, 7 + (i % 3) * 2, { alpha: a * (1 - ease.inQuad(p)) })
      }
    }

    function bar(t) {
      const k = pop01(t, -1, 0.35, 2) * outK(t, T.out)
      if (k <= 0.01) return
      const B = P.bar, f = barAt(t, T)
      const done = t >= T.reveal
      const stalled = !done && t > T.stall + 0.1
      x.save(); x.globalAlpha = clamp(k)
      // label + percent
      x.font = `700 26px ${MONO}`; x.textBaseline = 'alphabetic'
      const lab = done ? 'TWIST LOADED' : stalled ? `still loading${'.'.repeat(1 + Math.floor(t * 3) % 3)}` : 'loading twist…'
      x.fillStyle = 'rgba(6,4,18,0.7)'; x.textAlign = 'left'; x.fillText(lab.toUpperCase(), B.x + 2, B.y - 14)
      x.fillStyle = done ? GOLD : BONE; x.fillText(lab.toUpperCase(), B.x, B.y - 16)
      const pct = `${Math.floor(f * 100)}%`
      x.textAlign = 'right'; x.fillStyle = 'rgba(6,4,18,0.7)'; x.fillText(pct, B.x + B.w + 2, B.y - 14)
      x.fillStyle = done ? GOLD : stalled ? PINK : BONE; x.fillText(pct, B.x + B.w, B.y - 16)
      // track + segmented fill
      R(x, INK, B.x - 6, B.y - 6, B.w + 12, B.h + 12)
      R(x, '#2a1f55', B.x, B.y, B.w, B.h)
      const n = 40, cw = B.w / n
      for (let i = 0; i < n; i++) {
        if ((i + 1) / n > f + 0.0001) break
        const col = done ? (i % 2 ? GOLD : '#ffe7a0') : (i % 2 ? LILAC : '#a58ae8')
        R(x, col, B.x + i * cw + 2, B.y + 3, cw - 3, B.h - 6)
      }
      // the stall: the last segment blinks
      if (stalled && Math.floor(t * 4) % 2 === 0) R(x, PINK, B.x + Math.floor(f * n) * cw + 2, B.y + 3, cw - 3, B.h - 6)
      if (done) sparkles(x, t, B.x + B.w, B.y + B.h / 2, T.reveal + 0.2, 8, 50, 2, [GOLD, BONE])
      x.restore()
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ph = phaseOf(t)
        // suspense amount: rises through the build, snaps off on the reveal
        const bAmt = t < T.reveal ? ease.inOutQuad(prog(t, T.push[0], T.stall + 0.6)) : 1 - ease.outCubic(prog(t, T.reveal, T.reveal + 0.3))
        const warm = t < T.reveal ? 0 : Math.exp(-(t - T.reveal) * 2.2)
        ctx.build = bAmt; ctx.warm = warm
        drawSky(x, t, { ...SKY_H, zoom: lerp(1.25, SKY_H.zoom, ease.inOutCubic(prog(t, 0, 3))), dim: 0.5 - 0.15 * bAmt })
        // camera: creeping push toward the focus + a slowed-tape drift and tilt; a bounce back out on the reveal
        const z = 1 + 0.15 * bAmt + (t > T.reveal ? 0.05 * Math.exp(-(t - T.reveal) * 6) * Math.cos((t - T.reveal) * 20) : 0)
        const rot = 0.012 * bAmt * Math.sin(t * 1.1)
        const dtL = t - T.lastLand
        const shake = dtL > 0 && dtL < 0.35 ? 9 * Math.exp(-dtL * 10) * Math.sin(dtL * 60) : 0
        x.save()
        x.translate(focus.x, focus.y + shake); x.rotate(rot); x.scale(z, z); x.translate(-focus.x, -focus.y)
        if (t < T.out[1] + 0.02) {
          floor(t)
          if (cfg.back) cfg.back(x, t, T, ctx)
          rays(t)
          pisces(t)
          if (cfg.mid) cfg.mid(x, t, T, ctx)
          stars(t)
          if (cfg.front) cfg.front(x, t, T, ctx)
          hearts(t)
          sparkles(x, t, glowAt.x, glowAt.y, T.reveal + 0.02, 12, 260, 1, [GOLD, BONE, '#ffe7a0'])
          if (ctx.hero) sparkles(x, t, ctx.hero.x, ctx.hero.y - 40, T.lastLand + 0.02, 12, 210, 2, [GOLD, PINK, BONE])
        }
        x.restore()
        // the suspense grade: cold purple tint + a closing vignette; the reveal's warm flash
        if (bAmt > 0.01) {
          x.fillStyle = `rgba(40,16,90,${0.26 * bAmt})`; x.fillRect(0, 0, 1080, 1920)
          const vg = x.createRadialGradient(540, 960, lerp(900, 420, bAmt), 540, 960, 1150)
          vg.addColorStop(0, 'rgba(4,2,12,0)'); vg.addColorStop(1, `rgba(4,2,12,${0.75 * bAmt})`)
          x.fillStyle = vg; x.fillRect(0, 0, 1080, 1920)
        }
        if (warm > 0.01 && t < T.out[1]) { x.fillStyle = `rgba(255,226,170,${0.5 * warm})`; x.fillRect(0, 0, 1080, 1920) }
        bar(t)
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

  // ── the one card-cut candidate (cardfx plays it): BUILD → REVEAL
  const CUTS = [T.cut]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    ['whoosh', T.floorIn[0], 0.6, 0.04], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
    ...wordPops(T.h0, 2, 0.08, 0), ['pop', T.h0Land, 1046.5, 0.045, 0], ['pop', r3(T.h0Land + 0.1), 1318.51, 0.035, 0],
    ['pop', T.heroIn + 0.05, 783.99, 0.035, -0.2], ['pop', T.dateIn + 0.05, 659.25, 0.03, 0.3],
    ['pop', T.sub, 1174.66, 0.03, 0.3], ['tick', r3(T.sub + 0.08), 0.03],
    ['pop', r3(T.pisIn[0] + 0.15), 987.77, 0.022, 0.5],
    // the build: suspicious headline, a clock ticking on every beat (louder as it creeps), three sticker stabs
    ...wordPops(T.h1, 2, 0.14, 1, 0.022), ['pluck', T.h1Land, 392, 0.035, 0.7, 0],
    ...tickTimes.map((v, i) => ['tick', v, 0.025 + i * 0.006]),
    ...T.stk.map((s, i) => ['pluck', s, [349.23, 329.63, 311.13][i], 0.045, 0.6, [-0.3, 0.3, 0][i]]), ...T.stk.map(s => ['tick', r3(s + 0.06), 0.03]),
    ['pop', T.stall, 1567.98, 0.025, 0.2], ['pop', r3(T.stall + 0.25), 1567.98, 0.02, 0.2],
    ['riser', r3(T.stall + 0.4), r3(T.reveal - 0.05), 0.035],
    // the reveal on the drop
    ['boom', T.reveal, 0.3], ['bell', r3(T.reveal + 0.03), 1046.5, 0.035, 1.6, 0], ['bell', r3(T.reveal + 0.12), 1567.98, 0.025, 1.4, 0.2], ['glitter', T.reveal, r3(T.reveal + 0.7)],
    ['pop', r3(T.reveal + 0.22), 2093, 0.03, 0.4],
    ...wordPops(T.h2, 2, 0.1, 3), ['pop', T.h2Land, 1174.66, 0.04, 0],
    ...talkCues(LINES, { cps: CPS }),
    ...wordPops(T.last, 2, 0.08, 0, 0.028), ['pop', T.lastLand, 1046.5, 0.05, 0], ['bell', r3(T.lastLand + 0.03), 2093, 0.03, 1.4, 0], ['glitter', T.lastLand, r3(T.lastLand + 0.6)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ].filter(c => c[1] >= 0)
  const music = { style: 'screwed', key: cfg.key, seed: cfg.seed, sections: { drop: T.reveal, lift: [T.last], outroAt: STORY_END }, hits: [T.lastLand] }
  return { DURATION, SCENES, CUES, T, music }
}

// ── Volume 2 winter helpers (pure f(t))
/** falling pixel snow over the whole frame (world space), n flakes */
export function snowfall(x, t, { n = 46, seed = 1, alpha = 0.85, y0 = 0, y1 = 1920, speed = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  for (let i = 0; i < n; i++) {
    const r = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453, f = r - Math.floor(r)
    const sp = (40 + 60 * f) * speed, sz = i % 3 ? 6 : 9
    const yy = y0 + (((f * 1937 + t * sp) % (y1 - y0)) + (y1 - y0)) % (y1 - y0)
    const xx = (i * 97 + seed * 31) % 1100 - 10 + 18 * Math.sin(t * 0.9 + i)
    R(x, i % 4 ? '#ffffff' : '#dfefff', xx, yy, sz, sz)
  }
  x.restore()
}
/** a white snow bank along the floor line (drawn in `back`, rises with the floor) */
export function snowBank(x, t, T, y = 930) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  R(x, INK, 0, y - 22, 1080, 30)
  for (let i = 0; i < 12; i++) { const bx = i * 96 - 20, bh = 16 + 10 * Math.sin(i * 2.1); R(x, INK, bx - 4, y - 22 - bh, 104, bh + 4); R(x, '#eef6ff', bx, y - 18 - bh, 96, bh + 10) }
  R(x, '#eef6ff', 0, y - 18, 1080, 18); R(x, '#cfe2f7', 0, y - 4, 1080, 6)
  x.restore()
}
