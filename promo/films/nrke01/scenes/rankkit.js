// RANKING THE SIGNS: the shared look of the 24 star_advice trial reels nrke01–nrke24 (promo/films/next30/b39.md).
// Each episode folder holds only its data (question, the twelve ranks, last line) and imports this kit.
//
// The format (16 s: story 0–13.6, then the shared 2.4 s short end card):
//   0.00        thumbnail: the question is already up as the bold top caption, the empty leaderboard (twelve "???"
//               slots, #1 at the top) below it, THE STARS mid-scribble on a clipboard (left), Pisces sniffling into a
//               tissue (right). Bug "RANKING THE SIGNS", top-left.
//   1.80–5.64   ranks #12 → #4 slam onto the board one every 0.48 s; each sign hops up at the bottom as its row lands.
//   6.30        (was the card cut; removed 4 Nov) the board breathes between #4 and the top three.
//   6.80 / 7.70 #3 (bronze) and #2 (silver): bigger reveals.
//   8.50–9.30   drumroll: the #1 slot shakes; THE STARS look up; Pisces holds its breath.
//   9.30        #1 slams in gold: crown, confetti, the sign takes centre stage. Pisces fountains.
//   9.90        (cfg.allOne) every rank chip flips to #1.
//  10.20–13.15  THE STARS say the last line.  13.15–13.55 everything pops out.
// Pisces cries in every film (tears rise when its own row lands, fountains at the reveal).
//
//   makeRank(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.id, cfg.hook ('Who texts back | *first?*'), cfg.ranks: [[sign, tag] × 12, #1 first], cfg.last,
//     cfg.accent (headline accent colour, optional), cfg.allOne (optional twist)
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#e8344e'
export const SILVER = '#cfd6e6', BRONZE = '#d9925a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── the fixed timeline (same in all 24 films)
export const DURATION = 16
export const STORY_END = DURATION - ENDCARD_SHORT_LEN    // 13.6
const LAND = {}
for (let r = 12; r >= 4; r--) LAND[r] = r3(1.8 + (12 - r) * 0.48)
LAND[3] = 6.8; LAND[2] = 7.7; LAND[1] = 9.3
export const T = {
  bug: 0, land: LAND, cut: 6.3, drum: [8.5, 9.3], reveal: 9.3, allOne: 9.9,
  starsTalk: 10.2, boxOpen: 10.0, boxClose: 13.15, out: [13.15, 13.55], h0Out: [13.1, 13.4], bugOut: [13.25, 13.55],
}
const CPS = 30

// ── layout
const BX = 56, BW = 968, BY = 352, PITCH = 64, RH = 56
const rowY = r => BY + (r - 1) * PITCH
const CENTER = { x: 540, y: 1308 }
const STARS_AT = { x: 168, y: 1300, s: 170 }
const PIS_AT = { x: 918, y: 1312, s: 150 }

const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
function box(x, X, Y, w, h, col, { b = 5 } = {}) { R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h) }
function drawBits(x, bm, cols, cx, cy, cell, { alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  x.fillStyle = INK
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
const CROWN = ['G..G..G', 'GG.G.GG', 'GGGGGGG', 'GRGGGRG', 'GGGGGGG']
function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p) * 0.6, 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  x.restore()
}
function confetti(x, t, t0, cx, cy, { n = 34, life = 2.4, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.8, v = 560 + 300 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 700 * tt * tt
    const sz = 11 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }

// ── star sprite frame (mirrors startalk.js drawStarChar) so tears / props sit on the sprite through hops
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
function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
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
function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
function tearsCells(ctx, t, k) {
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

// ── the bug: "RANKING THE SIGNS" in Inter 800 small caps, letter-spaced, top-left 56 px (on from frame 0)
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: GOLD, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(242,199,92,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'RANKING<span style="color:rgba(255,255,255,0.62)">&nbsp;THE&nbsp;SIGNS</span>')
  return {
    update(t, out = 1) {
      b.style.display = out <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(out))
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeRank(cfg) {
  if (!cfg.ranks || cfg.ranks.length !== 12) throw new Error(`${cfg.id}: needs 12 ranks`)
  const RANKS = cfg.ranks.map(([sign, tag], i) => ({ r: i + 1, sign, tag, ...signStar(sign), name: sign.toUpperCase(), at: LAND[i + 1] }))
  const PIS = signStar('pisces')
  const pisRank = RANKS.find(o => o.sign === 'pisces').r
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.starsTalk, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [-0.12, 0.62, 1.15, 2.5, 4.2, LAND[3] + 0.05, T.reveal + 0.06, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const PIS_HOPS = [-0.18, LAND[pisRank] + 0.02, T.reveal + 0.1, T.reveal + 0.55]
  // which sign is centre stage at t (the last row to land; #1 keeps it to the end)
  const order = [...RANKS].sort((a, b) => a.at - b.at)
  const current = t => { let c = null; for (const o of order) if (t >= o.at) c = o; return t >= T.drum[0] && t < T.reveal ? null : c }

  async function build(stage) {
    try {
      await Promise.all(["800 76px Inter", "800 30px Inter", "800 28px Inter", "600 27px Inter", "700 30px Inter", "italic 500 104px 'EB Garamond'", "700 26px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hook, { top: 126, size: 76, accentSize: 104, at: -1, gap: 0.0, accentColor: cfg.accent || GOLD, fit: true, width: 960, left: 60 })
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.boxOpen, close: T.boxClose, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    // fit each tag once (fonts are loaded by now)
    const TAG_X = 420, TAG_W = 1004 - TAG_X
    for (const o of RANKS) {
      x.font = `600 27px ${INTER}`
      o.tagSize = Math.min(27, Math.floor(27 * TAG_W / Math.max(1, x.measureText(o.tag).width)))
      x.font = `800 30px ${INTER}`
      o.nameSize = Math.min(30, Math.floor(30 * 172 / Math.max(1, x.measureText(o.name).width)))
    }

    function chipCol(r, t) {
      if (cfg.allOne && t >= T.allOne + (r - 2) * 0.07 && r > 1) return GOLD
      return r === 1 ? GOLD : r === 2 ? SILVER : r === 3 ? BRONZE : BONE
    }
    function rankLabel(r, t) { return cfg.allOne && r > 1 && t >= T.allOne + (r - 2) * 0.07 ? '#1' : `#${r}` }

    function board(t, ok) {
      for (let r = 12; r >= 1; r--) {
        const o = RANKS[r - 1], y = rowY(r)
        const landed = t >= o.at
        // the row slides in from the right with a springy pop
        const p = landed ? easeOutBack(prog(t, o.at, o.at + (r <= 3 ? 0.34 : 0.24)), r <= 3 ? 1.8 : 1.5) : 0
        let dx = landed ? (1 - p) * 380 : 0
        let shake = 0
        if (r === 1 && t >= T.drum[0] && t < T.reveal) shake = 7 * Math.sin(t * 70) * prog(t, T.drum[0], T.reveal)
        const punch = landed && r <= 3 ? 1 + 0.08 * Math.exp(-(t - o.at) * 7) : 1
        x.save(); x.globalAlpha = clamp(ok)
        x.translate(BX + BW / 2 + dx + shake, y + RH / 2); x.scale(punch, punch); x.translate(-(BX + BW / 2), -(y + RH / 2))
        // the empty slot underneath (stays until the row lands)
        if (!landed || p < 0.6) {
          box(x, BX, y, BW, RH, 'rgba(22,14,48,0.82)', { b: 4 })
          x.font = `700 26px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
          x.fillStyle = 'rgba(239,230,214,0.4)'; x.fillText(`#${r}`, BX + 18, y + RH / 2 + 1)
          const dr = r === 1 && t >= T.drum[0]
          x.fillStyle = dr ? GOLD : 'rgba(239,230,214,0.28)'; x.textAlign = 'center'
          if (dr) x.font = `700 30px ${MONO}`
          x.fillText('? ? ?', BX + BW / 2 + 40, y + RH / 2 + 1)
        }
        if (landed) {
          x.translate(dx * 0, 0)
          const glow = r === 1 ? 0.5 + 0.2 * Math.sin(t * 6) : 0
          if (r === 1) { x.save(); x.shadowColor = 'rgba(242,199,92,0.9)'; x.shadowBlur = 30 * glow; box(x, BX, y, BW, RH, '#2a1d4f', { b: 6 }); x.restore() }
          box(x, BX, y, BW, RH, r === 1 ? '#3a2766' : 'rgba(34,24,70,0.95)', { b: r === 1 ? 6 : 4 })
          R(x, o.color, BX, y, 10, RH)
          // rank chip
          const cc = chipCol(r, t)
          box(x, BX + 22, y + 8, 76, RH - 16, cc, { b: 3 })
          x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
          x.fillText(rankLabel(r, t), BX + 60, y + RH / 2 + 1)
          // the sign: a mini star + name
          drawStarChar(x, BX + 140, y + RH / 2 + 2, 52, t, { color: o.color, mood: r === 1 ? 'sparkle' : 'happy', seed: r, glow: 0.6, bob: 1.2, tips: false })
          x.font = `800 ${o.nameSize}px ${INTER}`; x.textAlign = 'left'
          x.fillStyle = 'rgba(6,4,18,0.8)'; x.fillText(o.name, BX + 178 + 2, y + RH / 2 + 3)
          x.fillStyle = o.color; x.fillText(o.name, BX + 178, y + RH / 2 + 1)
          x.font = `600 ${o.tagSize}px ${INTER}`; x.fillStyle = BONE
          x.fillText(o.tag, TAG_X, y + RH / 2 + 2)
          // landing flash on the row
          const fl = 1 - prog(t, o.at, o.at + 0.25)
          if (fl > 0) { x.fillStyle = `rgba(255,248,230,${0.55 * fl})`; x.fillRect(BX, y, BW, RH) }
          if (r === 1) drawBits(x, CROWN, { G: GOLD, R: RED }, BX + 60, y - 6 - 3 * Math.sin(t * 5), 5)
        }
        x.restore()
        if (landed && r <= 3) sparkles(x, t, BX + BW / 2, y + RH / 2, o.at + 0.05, r === 1 ? 16 : 10, r === 1 ? 520 : 420, r, r === 1 ? [GOLD, BONE, PINK] : [cc0(r), BONE])
      }
    }
    const cc0 = r => r === 2 ? SILVER : BRONZE

    function clipboard(x, F, t) {
      // a little clipboard held at the star's right side
      const cx = F.ox + F.S * 0.42, cy = F.cy + F.S * 0.05
      x.save(); x.translate(cx, cy); x.rotate(-0.12)
      box(x, -30, -40, 60, 80, '#c08a52', { b: 4 }); R(x, BONE, -24, -30, 48, 64); R(x, '#8a8a9a', -12, -46, 24, 10)
      for (let i = 0; i < 4; i++) R(x, 'rgba(27,18,54,0.55)', -18, -20 + i * 13, 36 - (i % 2) * 10, 4)
      // the pen scribbles while ranking
      const sc = t < T.drum[0] ? 1 : 0
      const px = -6 + sc * 12 * Math.sin(t * 17), py = -10 + sc * 8 * Math.sin(t * 11)
      x.save(); x.translate(px, py); x.rotate(0.6); R(x, INK, -4, -34, 8, 40); R(x, GOLD, -2, -32, 4, 34); x.restore()
      x.restore()
    }

    function stars(t, ok) {
      const F = starFrame(STARS_AT.x, STARS_AT.y, STARS_AT.s, t, { pop: ok, hops: STARS_HOPS, seed: 2 })
      let mood = 'neutral', look = [1, -1]
      if (t >= T.drum[0] && t < T.reveal) { mood = 'wide'; look = [1, -1] }
      else if (t >= T.reveal) { mood = t > T.starsTalk + 2 ? 'happy' : 'sparkle'; look = [1, -0.2] }
      else if (t < 1.8) look = [0.4, -0.3]
      shadow(x, STARS_AT.x, STARS_AT.y + 100, 150 * ok)
      drawStarChar(x, STARS_AT.x, STARS_AT.y, STARS_AT.s, t, { color: STAR.sky, mood, look, hops: STARS_HOPS, pop: ok, seed: 2, glow: 1.05 })
      if (t < T.reveal + 0.3) clipboard(x, F, t)
    }

    function pisces(t, P, tears, mood, look) {
      const opts = { color: PIS.color, glyph: P.s >= 150 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.85, pop: P.pop ?? 1, hops: P.hops, tips: false }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      const F = starFrame(P.x, P.y, P.s, t, opts)
      if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
      return F
    }
    function tissues(cx, cy, s) {
      box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4 }); R(x, '#c9ecfb', cx - s / 2, cy - s * 0.3, s, s * 0.12)
      R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
      R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
    }

    function stage_(t, ok) {
      const c = current(t)
      const pisCentre = c && c.sign === 'pisces'
      // Pisces (right): always crying, a bit more once its own row lands, fountains at the reveal
      const tears = t >= T.reveal ? 3 : t >= LAND[pisRank] ? 2 : 1
      if (!pisCentre) {
        tissues(PIS_AT.x - 112, PIS_AT.y + 62, 70 * ok)
        shadow(x, PIS_AT.x, PIS_AT.y + 92, 140 * ok)
        const pm = t >= T.drum[0] && t < T.reveal ? 'wide' : t >= T.reveal ? 'sparkle' : 'wide'
        pisces(t, { ...PIS_AT, pop: ok, hops: PIS_HOPS }, tears, pm, t >= T.drum[0] && t < T.reveal ? [-1, -1] : [-1, -0.6])
      }
      if (!c) return
      // centre stage: the sign whose row just landed
      const top = c.r <= 3, one = c.r === 1
      const s = one ? 270 : top ? 230 : 200
      const k = pop01(t, c.at, one ? 0.42 : 0.3, one ? 2.4 : 2.0) * ok
      if (k <= 0.01) return
      const y = CENTER.y
      const hops = [c.at + 0.02, ...(one ? [T.reveal + 0.5, T.reveal + 1.0, T.starsTalk + 2.2] : [])]
      shadow(x, CENTER.x, y + s * 0.5, s * 0.8 * k)
      if (one) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(CENTER.x, y, 20, CENTER.x, y, 300); g.addColorStop(0, `rgba(255,236,180,${0.22 * k})`); g.addColorStop(1, 'rgba(255,236,180,0)'); x.fillStyle = g; x.fillRect(CENTER.x - 300, y - 300, 600, 600); x.restore() }
      const moods = ['happy', 'wink', 'sparkle', 'happy', 'squint', 'wink', 'happy', 'sparkle', 'heart']
      const mood = one ? 'sparkle' : top ? 'heart' : moods[(12 - c.r) % moods.length]
      if (pisCentre) pisces(t, { x: CENTER.x, y, s, pop: k, hops }, 3, one ? 'sparkle' : 'wide', [0, -0.3])
      else drawStarChar(x, CENTER.x, y, s, t, { color: c.color, glyph: c.glyph, mood, look: [0, 0], hops, pop: k, seed: 3 + c.r, glow: 1.1 })
      if (one) {
        const F = starFrame(CENTER.x, y, s, t, { pop: k, hops, seed: 3 + c.r })
        drawBits(x, CROWN, { G: GOLD, R: RED }, CENTER.x, F.cy - F.S * 0.47, F.cell * 1.4)
        if (pisCentre) { tissues(PIS_AT.x, PIS_AT.y + 62, 70 * ok) }
      }
      sparkles(x, t, CENTER.x, y, c.at + 0.02, 8, 170, c.r, [c.color, BONE, GOLD])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const ok = popOut(t, T.out)
        const dS = t - T.reveal, shake = dS > 0 && dS < 0.45 ? 16 * Math.exp(-dS * 9) * Math.sin(dS * 60) : 0
        x.save(); x.translate(0, shake)
        if (t < T.out[1]) {
          board(t, ok)
          stars(t, ok)
          stage_(t, ok)
          confetti(x, t, T.reveal + 0.02, 540, rowY(1) + 40)
          if (cfg.allOne) for (let r = 2; r <= 12; r++) sparkles(x, t, BX + 60, rowY(r) + RH / 2, T.allOne + (r - 2) * 0.07, 6, 60, r, [GOLD, BONE])
        }
        x.restore()
        H0.update(t, outK(t, T.h0Out))
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = t >= T.reveal && t < T.reveal + 0.14 ? 1 - (t - T.reveal) / 0.14 : 0
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // no card-back cut (owner's change, 4 Nov); the quiet card frame stays
  const CUTS = []
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ['pop', 0.05, 880, 0.03, -0.4], ['tick', 0.3, 0.03], ['tick', 0.75, 0.03], ['tick', 1.2, 0.03],
    // ranks #12 → #4: whoosh + slam, climbing in pitch
    ...RANKS.filter(o => o.r >= 4).flatMap(o => {
      const i = 12 - o.r
      return [['whoosh', r3(o.at - 0.06), 0.18, 0.022], ['pop', o.at, NOTE[i % 7] * (i >= 7 ? 2 : 1), 0.045, (i % 2 ? 0.2 : -0.2)], ['tick', r3(o.at + 0.02), 0.045]]
    }),
    ['pluck', r3(LAND[pisRank] + 0.1), 2349.32, 0.014, 0.4, 0.5],
    // #3 and #2
    ...[3, 2].flatMap(r => [['whoosh', r3(LAND[r] - 0.1), 0.3, 0.035], ['pop', LAND[r], r === 3 ? 987.77 : 1174.66, 0.055, 0], ['bell', r3(LAND[r] + 0.04), r === 3 ? 1318.51 : 1567.98, 0.028, 0.8, 0], ['glitter', r3(LAND[r] + 0.02), r3(LAND[r] + 0.3)]]),
    // drumroll → #1
    ...Array.from({ length: 16 }, (_, i) => ['tick', r3(T.drum[0] + 0.8 * (1 - Math.pow(1 - i / 16, 1.6))), 0.03 + 0.002 * i]),
    ['riser', T.drum[0], T.drum[1], 0.03],
    ['boom', T.reveal, 0.32], ['tom', T.reveal, 88, { gain: 0.3, decay: 0.3 }], ['tick', T.reveal, 0.08],
    ['bell', r3(T.reveal + 0.06), 1760, 0.035, 1.2, 0], ['glitter', r3(T.reveal + 0.04), r3(T.reveal + 0.6)],
    ['pop', r3(T.reveal + 0.1), 1318.51, 0.04, -0.3], ['pop', r3(T.reveal + 0.18), 1760, 0.035, 0.3],
    ['clap', r3(T.reveal + 0.35), { gain: 0.1, pan: -0.3 }], ['clap', r3(T.reveal + 0.6), { gain: 0.1, pan: 0.3 }],
    ...(cfg.allOne ? Array.from({ length: 11 }, (_, i) => ['pop', r3(T.allOne + i * 0.07), NOTE[i % 7] * 2, 0.025, (i % 2 ? 0.25 : -0.25)]) : []),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...endcardCues(STORY_END, { short: true }),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
