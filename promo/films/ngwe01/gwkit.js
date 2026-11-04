// gwkit — "Your Star Guide: Winter" kit (promo/films/next30/b23.md). Owned by b23 (ngwe01–24); b24 (ngwe25–48): import, don't edit.
// Each sign's star guide (stguide.js: the gold lantern) speaks to YOU in falling snow. One film = guideFilm(spec):
//
//   import { guideFilm, K } from '../../ngwe01/gwkit.js'
//   const F = guideFilm({
//     id: 'ngwe01', sign: 'aries', note: 1, of: 4, len: 22,
//     hook: '*Aries* in winter: | first one *outside*.',          // '|' = line break, *accent* = Garamond
//     lines: ["first snow and you're already *out there*.", '…'],  // 2 lines (22 s) or 3 lines (25 s), ≤ 46 chars
//     chip: 'ARIES: CARDINAL FIRE,|RULED BY MARS',               // ★ ASTROLOGY SAYS chip ('|' = break)
//     last: 'Race the hill | *together*.', late: 1,               // the last line (popText), late = words that land late
//     gag: (T, K) => ({ draw(x, t) { … }, front(x, t) { … }, cues: [ … ] }),   // the sign's little scene (canvas)
//     pisces: true,                                             // the crying Pisces at the right edge (false in Pisces films)
//   })
//   export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
//
// T (all seconds): hookOut, rise, scene (stage lights up), open, l[0..n-1] (line starts), chip, close (box shuts + card
//   flip), h2 (last line in), h2Land, out [a, b] (everything pops out), end (= STORY_END).
// K: the stage + helpers. ACT_Y (actor centre y), GROUND (snow line y), SM (actor size), ME { color, glyph, name },
//   THEM (lavender), mini(x, t, {…drawStarChar opts, x, y, size}), appear(t, t0) (pop in × pop out), drawBits, burst,
//   sparkles, pop01, popOut, outK, label(x, text, cx, cy, size, color, a), heart(x, cx, cy, cell, a), BM (bitmaps) +
//   COL (their colours), tears(x, t, frameOpts, k) (tears on any star: k 1 sniffle · 2 streams · 3 fountain), steam.
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H } from '../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../cardfx.js'
import { popText } from '../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../startalk.js'
import { guideSign, guideSpeaker, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK, INTER,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../stguide.js'

export { GOLD, BONE, INK, pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops }
export const THEM = '#b7a6f2', SNOW = '#f4f6ff', ICE = '#bfe3ff'
const PIS = signStar('pisces')

// ─────────────────────────────────────────────── the stage
export const ACT_Y = 1210, GROUND = 1292, SM = 170
const HERO = { x: 540, y: 900, size: 340 }
const UP = { x: 540, y: 575, size: 250 }

// ─────────────────────────────────────────────── sprite frame (mirrors drawStarChar) so tears sit on the eyes
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
  }
}

// ─────────────────────────────────────────────── helpers for gags
/** a star actor: drawStarChar with x/y/size in the options; returns its { x, y, size, top } */
function mini(x, t, o = {}) {
  const { x: px = 540, y = ACT_Y, size = SM, ...rest } = o
  const r = drawStarChar(x, px, y, size, t, { glow: 0.8, ...rest })
  if (o.tears) tears(x, t, { x: px, y, size, ...rest }, o.tears)
  return r
}
/** tears on a star drawn with the same options */
function tears(x, t, o, k) {
  const F = starFrame(o.x, o.y, o.size, t, { pop: o.pop ?? 1, bob: o.bob, squash: o.squash || 0, hops: o.hops, seed: o.seed ?? 1 })
  inSprite(x, F, () => tearsCells(x, t, k))
}
const appear = (T) => (t, t0 = T.scene + 0.1, d = 0.4) => pop01(t, t0, d, 2.2) * popOut(t, T.out)
/** a bold Inter label with an ink outline, centred */
function label(x, text, cx, cy, size = 40, color = BONE, a = 1, rot = 0) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= clamp(a); x.translate(cx, cy); x.rotate(rot)
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineJoin = 'round'; x.lineWidth = Math.max(6, size * 0.2); x.strokeStyle = INK; x.strokeText(text, 0, 0)
  x.fillStyle = color; x.fillText(text, 0, 0); x.restore()
}
/** steam wisps rising from (cx, cy); heart = 0…1 morphs the top wisp into a little heart */
function steam(x, t, cx, cy, a = 1, heart = 0) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a * 0.8; x.fillStyle = SNOW
  for (let i = 0; i < 3; i++) for (let k = 0; k < 6; k++) {
    const ph = (t * 0.9 + k / 6 + i * 0.31) % 1
    const px = cx + (i - 1) * 16 + Math.sin(ph * 7 + i) * 7, py = cy - ph * 70
    x.globalAlpha = a * 0.75 * (1 - ph)
    x.fillRect(Math.round(px), Math.round(py), 6, 6)
  }
  x.restore()
  if (heart > 0.01) drawBits(x, BM.HEART, COL, cx, cy - 72 - heart * 14, 5 * heart, { alpha: a * heart })
}
const heart = (x, cx, cy, cell = 8, a = 1) => { if (a > 0.01) drawBits(x, BM.HEART, COL, cx, cy, cell, { alpha: a }) }

// bitmaps (1 cell = `cell` px; ink outline added by drawBits)
export const COL = {
  P: '#ff5c8e', W: '#f5eedf', S: '#ffffff', R: '#e2453c', r: '#a8262f', B: '#7a4a2a', b: '#55331f', C: '#c08552', c: '#e8b47c',
  G: '#3fae6a', g: '#2a7a4b', Y: '#ffd34d', y: '#f2a93b', L: '#b7a6f2', l: '#8c78d6', T: '#3ce6cf', t: '#23a796', K: '#3a2f63',
  O: '#ff9a4a', N: '#c9d4ff', n: '#8fa2e0', M: '#6b4423', A: '#9aa3b8', a: '#6c7489', D: '#2b2350', Q: '#ffe9a8', I: '#bfe3ff',
}
export const BM = {
  HEART: ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...'],
  MITTEN: ['.RRR..', 'RRRR.R', 'RRRRRR', 'RRRRRR', 'RRRRR.', 'WWWWW.', 'WWWWW.'],
  MUG: ['WWWWW..', 'WMMMW..', 'WWWWWWW', 'WWWWW.W', 'WWWWWWW', 'WWWWW..', '.WWW...'],
  SNOWFLAKE: ['...S...', '.S.S.S.', '..SSS..', 'SSSSSSS', '..SSS..', '.S.S.S.', '...S...'],
  CANDLE: ['..Y..', '.YOY.', '..Y..', '.WWW.', '.WWW.', '.WWW.', '.WWW.', 'BBBBB'],
  GIFT: ['..Y.Y..', '...Y...', 'RRRYRRR', 'RRRYRRR', 'YYYYYYY', 'RRRYRRR', 'RRRYRRR', 'RRRYRRR'],
  SCARF: ['RRRRRRRRRRRR', 'RWRWRWRWRWRR', '..........RR', '..........RW', '..........RR', '..........WW'],
  ENVELOPE: ['WWWWWWWWW', 'WQWWWWWQW', 'WWQWWWQWW', 'WWWQPQWWW', 'WWWWWWWWW', 'WWWWWWWWW'],
  DICE: ['WWWWW', 'WKWWW', 'WWKWW', 'WWWKW', 'WWWWW'],
}

// ─────────────────────────────────────────────── snow
function snowLayer(x, t, { n = 60, seed = 1, sizeMin = 4, sizeMax = 8, speed = 70, alpha = 0.7, yMax = 1920 } = {}) {
  x.save(); x.fillStyle = SNOW
  for (let i = 0; i < n; i++) {
    const r1 = Math.abs(Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453) % 1
    const r2 = Math.abs(Math.sin(i * 39.3468 + seed * 11.135) * 24634.6345) % 1
    const sz = Math.round(sizeMin + (sizeMax - sizeMin) * r2)
    const sp = speed * (0.6 + 0.8 * r2)
    const y = ((r1 * 2000 + t * sp) % 2000) - 40
    if (y > yMax) continue
    const px = (r1 * 1171 + i * 97) % 1080 + Math.sin(t * 0.9 + i) * 14
    x.globalAlpha = alpha * (0.55 + 0.45 * r2)
    x.fillRect(Math.round(px), Math.round(y), sz, sz)
  }
  x.restore()
}

// ─────────────────────────────────────────────── the bug (top-left, Inter 800 small caps)
function buildBug(root) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none', transformOrigin: '0% 50%' }, root)
  const ic = el('canvas', { width: '36px', height: '36px', imageRendering: 'pixelated' }, box)
  ic.width = 36; ic.height = 36
  drawBits(ic.getContext('2d'), BM.SNOWFLAKE, { S: GOLD }, 18, 18, 4)
  el('div', { font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.16em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box,
    `Your&nbsp;Star&nbsp;Guide<span style="color:rgba(255,255,255,0.6)"> · Winter</span>`)
  return { update(t, k = 1) { box.style.display = k <= 0.01 ? 'none' : 'flex'; box.style.opacity = String(k) } }
}

// ─────────────────────────────────────────────── the film
export const K = { ACT_Y, GROUND, SM, THEM, SNOW, ICE, GOLD, BONE, INK, BM, COL, mini, tears, label, steam, heart, drawBits, burst: drawBurst, sparkles, pop01, popOut, outK, clamp, lerp, prog, ease }

export function guideFilm(spec) {
  const { sign, note = 1, of = 4, len, hook, lines, chip, last, late = 1, gag, pisces = true, hookSize = 104, lastSize = 112, music } = spec
  const DURATION = len
  const STORY_END = DURATION - ENDCARD_LEN
  const S = guideSign(sign), ME = { color: S.color, glyph: S.glyph, name: S.name }
  const SPEAK = guideSpeaker(S.glyph)
  const gap = lines.length >= 3 ? 3.7 : 4.0
  const L0 = 3.45
  const T = { hookOut: [2.55, 2.85], wink: [1.2, 1.6], lift: 1.25, rise: [2.6, 3.4], scene: 2.9, open: 3.25 }
  T.l = lines.map((_, i) => +(L0 + i * gap).toFixed(2))
  T.close = +(T.l[T.l.length - 1] + 3.7).toFixed(2)
  T.chip = +(T.l[0] + 1.5).toFixed(2)
  T.h2 = +(T.close + 0.15).toFixed(2); T.h2Land = +(T.h2 + 0.5).toFixed(2)
  T.out = [+(STORY_END - 0.6).toFixed(2), +(STORY_END - 0.15).toFixed(2)]
  T.glint = +(T.out[0] - 1.6).toFixed(2)
  T.end = STORY_END
  const LINES = lines.map((text, i) => ({ t: T.l[i], speaker: SPEAK, text, color: i % 2 ? '#ffd9a0' : ME.color }))
  const CPS = 28
  const HOPS = talkHops(LINES, SPEAK, { cps: CPS })
  const Kf = { ...K, ME, T, appear: appear(T) }
  const G_ = gag(T, Kf)
  const pisX = spec.pisX ?? 968, pisY = spec.pisY ?? ACT_Y + 4

  async function build(stage) {
    await loadGuideFonts()
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const BUG = buildBug(root)
    const CHIP = noteChip(root, { sign: S.name, glyph: S.glyph, n: note, of, color: GOLD, top: 128, out: T.out })
    const HOOK = guideHook(root, { text: hook, accentColor: ME.color, top: 236, size: hookSize, out: T.hookOut })
    const H2 = popText(root, last, { top: 1430, size: lastSize, accentSize: Math.round(lastSize * 1.4), at: T.h2, gap: 0.08, late, lateAt: T.h2Land, lateGap: 0.14, accentColor: ME.color, lineHeight: 1.0 })
    const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function guidePos(t) {
      const p = ease.inOutCubic(prog(t, ...T.rise))
      return { x: HERO.x, y: lerp(HERO.y, UP.y, p), size: lerp(HERO.size, UP.size, p) }
    }
    function drawStage(t) {
      const a = clamp(prog(t, T.scene, T.scene + 0.45)) * (1 - prog(t, T.out[0], T.out[1]))
      if (a <= 0) return
      x.save(); x.globalAlpha = a
      const g0 = x.createRadialGradient(540, GROUND - 80, 40, 540, GROUND - 80, 620)
      g0.addColorStop(0, 'rgba(255,200,110,0.2)'); g0.addColorStop(1, 'rgba(255,200,110,0)')
      x.fillStyle = g0; x.fillRect(0, GROUND - 700, 1080, 1100)
      // a snowy ground: soft drifts + a bright crust
      const gg = x.createLinearGradient(0, GROUND + 10, 0, GROUND + 150); gg.addColorStop(0, 'rgba(200,215,255,0.10)'); gg.addColorStop(1, 'rgba(200,215,255,0)')
      x.fillStyle = gg; x.fillRect(0, GROUND + 10, 1080, 140)
      x.fillStyle = '#dfe7ff'
      for (let i = 0; i < 1080; i += 8) {
        const h = 10 + 7 * Math.sin(i * 0.013) + 4 * Math.sin(i * 0.051 + 1.3)
        x.fillRect(i, Math.round(GROUND - h + 12), 8, Math.round(h + 6))
      }
      x.fillStyle = '#ffffff'
      for (let i = 0; i < 1080; i += 8) { const h = 10 + 7 * Math.sin(i * 0.013) + 4 * Math.sin(i * 0.051 + 1.3); x.fillRect(i, Math.round(GROUND - h + 12), 8, 4) }
      x.restore()
    }
    function drawPisces(t) {
      if (!pisces) return
      const p = pop01(t, T.scene + 0.55, 0.4, 2.2) * popOut(t, T.out)
      if (p <= 0.01) return
      const k = t < T.l[1] ? 1 : t < T.h2Land ? 2 : 3
      const hops = [T.h2Land + 0.05]
      const o = { x: pisX, y: pisY, size: 132, color: PIS.color, glyph: null, mood: t > T.h2Land ? 'happy' : 'sparkle', look: [-1, -0.4], pop: p, seed: 7, hops, glow: 0.7 }
      drawStarChar(x, o.x, o.y, o.size, t, o)
      tears(x, t, o, k)
      // a tiny knit hat (it's cold)
      const F = starFrame(o.x, o.y, o.size, t, { pop: p, hops, seed: 7 })
      inSprite(x, F, () => {
        x.fillStyle = INK; x.fillRect(13.5, 3.2, 9, 4.2); x.fillRect(16.4, 0.6, 3.2, 3)
        x.fillStyle = '#7fd6c9'; x.fillRect(14, 3.7, 8, 3.2); x.fillStyle = '#ffffff'; x.fillRect(14, 5.6, 8, 1.3); x.fillRect(16.9, 1.1, 2.2, 2.2)
      })
    }
    function drawTheGuide(t) {
      const g = guidePos(t)
      const k = popOut(t, T.out)
      if (k <= 0) return
      const talking = t > T.l[0] - 0.1 && t < T.close
      const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : t < T.rise[0] ? 'happy' : talking ? 'neutral' : t < T.h2Land ? 'happy' : 'sparkle'
      const look = t < T.rise[1] ? [0, 0] : t < T.close ? [0, 1] : [0, 0.5]
      const raise = Math.exp(-Math.max(0, t - T.lift) * 4) * (t > T.lift ? 1 : 0)
      const r = drawGuide(x, g.x, g.y, g.size, t, { color: ME.color, glyph: S.glyph, mood, look, hops: [T.lift, ...HOPS, T.h2Land], seed: 2, glow: 1.1, pop: k }, { lantern: 1 + 0.25 * raise, glow: 1.2 + raise })
      sparkles(x, t, r.lx, r.ly, T.lift, 8, 90, 1, [GOLD, BONE, ME.color])
      sparkles(x, t, r.lx, r.ly, T.glint, 8, 80, 2, [GOLD, BONE, ME.color])
      return r
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.7 })
        snowLayer(x, t, { n: 70, seed: 3, sizeMin: 3, sizeMax: 6, speed: 55, alpha: 0.55 })
        drawStage(t)
        drawTheGuide(t)
        if (t > T.scene) { G_.draw(x, t); drawPisces(t); if (G_.front) G_.front(x, t) }
        factChip(x, t, { text: chip, at: T.chip, dur: 4.4, x: 540, y: 850, color: GOLD, size: 30 })
        snowLayer(x, t, { n: 16, seed: 9, sizeMin: 8, sizeMax: 12, speed: 120, alpha: 0.85 })
        BUG.update(t, outK(t, [STORY_END - 0.35, STORY_END]))
        CHIP.update(t)
        HOOK.update(t)
        box.update(t)
        H2.update(t, outK(t, T.out))
        drawGrain(gx, t)
      },
    }
  }

  const CUTS = [{ t: +(T.close + 0.05).toFixed(2), kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]
  const nWords = last.split(' ').filter(w => w !== '|').length
  const CUES = [
    ...guideCues(0.02, { gain: 0.03 }), ...guideCues(T.lift, { gain: 0.025 }), ['pluck', T.wink[0], 1318.51, 0.03, 0.5, 0.2],
    ['whoosh', T.rise[0], 0.4, 0.03], ['glitter', T.scene, T.scene + 0.5],
    ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
    ...talkCues(LINES, { cps: CPS }),
    ...guideCues(T.chip, { gain: 0.022, notes: [1174.66, 1318.51, 1567.98] }),
    ...(pisces ? [['pop', T.scene + 0.55, 1174.66, 0.025, 0.6], ['pluck', T.l[1], 1567.98, 0.018, 0.4, 0.6]] : []),
    ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
    ...wordPops(T.h2, Math.max(1, nWords - late), 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
    ...guideCues(T.glint, { gain: 0.02 }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(G_.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ].sort((a, b) => a[1] - b[1])
  return { DURATION, SCENES, CUES, T, LINES_EXPORT: { lines: LINES, cps: CPS, get close() { return T.close } }, music }
}
