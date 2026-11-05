// sgxkit — "Your Star Guide: Extended" kit (promo/films/month2/m44.md). Owned by batch m44 (kxsge01–12). Read-only for others.
// Each sign's star guide (stguide.js: the star with the gold lantern) gives YOU the full guide for your sign in four
// chapter stickers: HOW YOU LOVE · WHAT YOU NEED · WHERE IT GETS HARD · TRY THIS WEEK. No end card, no card cut, no logo.
//
//   import { guideXFilm } from '../../kxsge01/sgxkit.js'
//   const F = guideXFilm({
//     id: 'kxsge01', sign: 'aries', music,
//     hook: 'ARIES. YOU TEXTED BACK | *INSTANTLY.* AGAIN.',          // frame-0 slam line ('|' break, *accent*)
//     hookScene: K => ({ draw(x, t) {…}, front(x, t) {…}, shake: t => [dx, dy], cues: [],   // mid-chaos opening (0…HOOK_END)
//                        fx: [{ scene: HK.caught(o), cues: HK.caughtCues(o), frame0: false }] }), // hookkit effects; frame0:
//                        true = it is visible at t = 0, so loopBack rebuilds it too
//     promise: 'STAY FOR CHAPTER 4',                                 // the up-front payoff promise sticker
//     chip: 'ARIES: CARDINAL FIRE,|RULED BY MARS', chipCh: 0,        // ★ ASTROLOGY SAYS (shown in that chapter)
//     chapters: [ { lines: ['…', '…'], gag: (C, K) => ({ draw(x, t) {…}, front, cues }) }, ×4 ],
//     last: 'Fast heart. | *Long* listen.', late: 2, ending: 'cut' | 'loop',
//     pisces: true,          // the crying Pisces sidekick (false in the Pisces film; the hero cries instead)
//   })
//   export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
//
// Timeline: HOOK 0…HOOK_END (3.6). Chapter i starts at C = HOOK_END + i * CH (CH = 15.5): sticker at C, the box opens at
//   C + 0.5, line a at C + 0.8, line b at C + 6.9, the box shuts at C + 14. Gags get C and draw on the stage.
//   After chapter 4: the last line (popText) at E + 0.2, lands at E + 0.75, holds; 'cut' ends 0.9 s after it lands,
//   'loop' holds 1.0 s then eases for 0.45 s back into the exact frame-0 composition.
// K: ACT_Y, GROUND, SM, THEM, ME, GOLD, BONE, INK, BM, COL, mini, tears, label, heart, phone, bubble, banner, stamp,
//   drawBits, burst, sparkles, pop01, popOut, outK, clamp, lerp, prog, ease, appear(t, t0, t1?), shake(t, t0, amp, dur).
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H } from '../wheel.js'
import { popText } from '../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../startalk.js'
import { guideSign, guideSpeaker, drawGuide, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK, INTER, MONO,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../stguide.js'
import * as HK from '../hookkit.js'

export { GOLD, BONE, INK, pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops, HK }
export const THEM = '#b7a6f2'
const PIS = signStar('pisces')
export const HOOK_END = 3.6, CH = 15.5
export const ACT_Y = 1190, GROUND = 1272, SM = 170
const UP = { x: 540, y: 560, size: 236 }
export const CH_NAMES = ['HOW YOU LOVE', 'WHAT YOU NEED', 'WHERE IT GETS HARD', 'TRY THIS WEEK']

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
function tears(x, t, o, k) {
  const F = starFrame(o.x, o.y, o.size, t, { pop: o.pop ?? 1, bob: o.bob, squash: o.squash || 0, hops: o.hops, seed: o.seed ?? 1 })
  inSprite(x, F, () => tearsCells(x, t, k))
}
/** a star actor: drawStarChar with x/y/size in the options (+ tears: 1 sniffle · 2 streams · 3 fountain) */
function mini(x, t, o = {}) {
  const { x: px = 540, y = ACT_Y, size = SM, ...rest } = o
  const r = drawStarChar(x, px, y, size, t, { glow: 0.8, ...rest })
  if (o.tears) tears(x, t, { x: px, y, size, ...rest }, o.tears)
  return r
}
/** a bold Inter label with an ink outline, centred */
function label(x, text, cx, cy, size = 40, color = BONE, a = 1, rot = 0, font = INTER) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= clamp(a); x.translate(cx, cy); x.rotate(rot)
  x.font = `800 ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineJoin = 'round'; x.lineWidth = Math.max(6, size * 0.2); x.strokeStyle = INK; x.strokeText(text, 0, 0)
  x.fillStyle = color; x.fillText(text, 0, 0); x.restore()
}
const heart = (x, cx, cy, cell = 8, a = 1) => { if (a > 0.01) drawBits(x, BM.HEART, COL, cx, cy, cell, { alpha: a }) }
function rrect(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath() }
/** a little pixel-ish phone: rows = [{ text, me, color }], top text = header. s = scale (1 = 220×400). */
function phone(x, cx, cy, s, { header = '', rows = [], a = 1, rot = 0, glow = 0, screen = '#141030' } = {}) {
  if (a <= 0.01 || s <= 0.01) return
  x.save(); x.globalAlpha *= clamp(a); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (glow > 0) { x.shadowColor = `rgba(255,214,120,${0.7 * glow})`; x.shadowBlur = 40 }
  x.fillStyle = INK; rrect(x, -118, -208, 236, 416, 34); x.fill(); x.shadowBlur = 0
  x.fillStyle = '#2d2456'; rrect(x, -110, -200, 220, 400, 28); x.fill()
  x.fillStyle = screen; rrect(x, -100, -186, 200, 372, 20); x.fill()
  x.fillStyle = '#2d2456'; rrect(x, -30, -182, 60, 12, 6); x.fill()
  if (header) { x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillText(header, 0, -146) }
  let y = -120
  for (const r of rows) {
    x.font = `700 ${r.size || 22}px ${MONO}`
    const w = Math.min(176, x.measureText(r.text).width + 26)
    const bx = r.center ? -w / 2 : r.me ? 92 - w : -92
    x.fillStyle = r.color || (r.me ? '#6f5bd6' : '#3a3168'); rrect(x, bx, y, w, 42, 14); x.fill()
    x.fillStyle = r.ink || BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(r.text, bx + 13, y + 21, 150)
    x.textBaseline = 'alphabetic'
    y += 54
  }
  x.restore()
}
/** a chat bubble with text (centred at cx, cy) */
function bubble(x, text, cx, cy, { size = 30, a = 1, color = '#6f5bd6', ink = BONE, s = 1, tail = 1 } = {}) {
  if (a <= 0.01 || s <= 0.01) return
  x.save(); x.globalAlpha *= clamp(a); x.translate(cx, cy); x.scale(s, s)
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + size * 1.1, h = size * 1.8
  x.fillStyle = INK; rrect(x, -w / 2 - 5, -h / 2 - 5, w + 10, h + 10, h / 2.4); x.fill()
  x.fillStyle = color; rrect(x, -w / 2, -h / 2, w, h, h / 2.6); x.fill()
  if (tail) { x.beginPath(); x.moveTo(-w / 2 * tail * 0.5, h / 2 - 2); x.lineTo(-w / 2 * tail * 0.5 - 14 * tail, h / 2 + 18); x.lineTo(-w / 2 * tail * 0.5 + 16 * tail, h / 2 - 2); x.fill() }
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** a hanging sign / banner: a pixel board with text */
function banner(x, text, cx, cy, { size = 34, a = 1, s = 1, color = '#2a1d55', border = GOLD, ink = BONE, rot = 0 } = {}) {
  if (a <= 0.01 || s <= 0.01) return
  x.save(); x.globalAlpha *= clamp(a); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + size * 1.2, h = size * 1.7
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = border; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = color; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** a rubber stamp that slams in at t0 (big → 1, tilted), e.g. 'SENT' */
function stamp(x, t, t0, text, cx, cy, { size = 56, color = '#ff4d6d', rot = -0.15, life = 99 } = {}) {
  if (t < t0 || t > t0 + life) return
  const p = prog(t, t0, t0 + 0.18), s = lerp(2.2, 1, ease.outCubic(p)), a = clamp(p * 2) * (1 - prog(t, t0 + life - 0.3, t0 + life))
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const w = x.measureText(text).width + size * 0.8, h = size * 1.4
  x.lineWidth = size * 0.12; x.strokeStyle = color; x.strokeRect(-w / 2, -h / 2, w, h)
  x.fillStyle = color; x.fillText(text, 0, 3)
  x.restore()
}
/** screen-shake offset at time t after a hit at t0 */
const shake = (t, t0, amp = 14, dur = 0.4) => { if (t < t0 || t > t0 + dur) return [0, 0]; const k = 1 - (t - t0) / dur; return [Math.sin(t * 91) * amp * k, Math.cos(t * 73) * amp * k] }

export const COL = {
  P: '#ff5c8e', W: '#f5eedf', S: '#ffffff', R: '#e2453c', r: '#a8262f', B: '#7a4a2a', b: '#55331f', C: '#c08552', c: '#e8b47c',
  G: '#3fae6a', g: '#2a7a4b', Y: '#ffd34d', y: '#f2a93b', L: '#b7a6f2', l: '#8c78d6', T: '#3ce6cf', t: '#23a796', K: '#3a2f63',
  O: '#ff9a4a', N: '#c9d4ff', n: '#8fa2e0', M: '#6b4423', A: '#9aa3b8', a: '#6c7489', D: '#2b2350', Q: '#ffe9a8', I: '#bfe3ff',
}
export const BM = {
  HEART: ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...'],
  BRICK: ['CCCCCCCCcCCC', 'CCCCCCCCcCCC', 'cccccccccccc', 'CCcCCCCCCCCC', 'CCcCCCCCCCCC'],
  BOWL: ['.WWWWWWWWW.', 'WOOOOOOOOOW', '.WWWWWWWWW.', '..WWWWWWW..', '...WWWWW...'],
  FIRE: ['...Y....', '..YOY...', '..YOOY..', '.YOROOY.', '.YORROY.', 'YORRRROY', '.BBBBBB.', 'BbBBbBBb'],
  FLAG: ['WP....', 'WPPP..', 'WPPPPP', 'WPPP..', 'WP....', 'W.....', 'W.....', 'W.....'],
  CUP: ['WWWWW..', 'WMMMW..', 'WWWWWWW', 'WWWWW.W', 'WWWWWWW', 'WWWWW..', '.WWW...'],
  BAG: ['..BBBB..', '.B....B.', 'BBBBBBBB', 'BCCCCCCB', 'BCYYYYCB', 'BCCCCCCB', 'BCCCCCCB', 'BBBBBBBB'],
  LAMP: ['.YYY.', 'YQQQY', 'YQQQY', '.YYY.', '..A..', '..A..', '..A..', '..A..', '..A..', '.AAA.'],
  HAT: ['...T...', '..TTT..', '.TtTtT.', 'TTTTTTT'],
  CLIP: ['..AAA..', 'WWWWWWW', 'WKKKKKW', 'WWWWWWW', 'WKKKKWW', 'WWWWWWW', 'WKKKKKW', 'WWWWWWW'],
  PEN: ['......R', '.....RR', '....RR.', '...RR..', '..RR...', '.WR....', 'AW.....'],
  CAL: ['RRRRRRR', 'WWWWWWW', 'WPWWWPW', 'WWWWWWW', 'WPWWWPW', 'WWWWWWW'],
  ROBOT: ['..AAA..', '.AAAAA.', '.ATATA.', '.AAAAA.', 'AAAAAAA', 'A.AAA.A', '..A.A..'],
  HEADPH: ['.KKKKK.', 'K.....K', 'K.....K', 'TT...TT', 'TT...TT'],
  MIC: ['.AAA.', 'AAAAA', 'AAAAA', '.AAA.', '..A..', '.AAA.'],
  ROSE: ['.PP.', 'PPPP', '.PP.', '.G..', '.GG.', '.G..'],
  FENCE: ['W..W..W..W', 'WWWWWWWWWW', 'W..W..W..W', 'WWWWWWWWWW', 'W..W..W..W'],
  LAPTOP: ['.AAAAAAAA.', '.ANNNNNNA.', '.ANNNNNNA.', '.ANNNNNNA.', 'AAAAAAAAAA'],
  WATCH: ['..AA..', '.WWWW.', 'WWKWWW', 'WWKKWW', 'WWWWWW', '.WWWW.'],
  GLASS: ['.AAA..', 'AIIIA.', 'AIIIA.', '.AAA..', '...A..', '....A.'],
  BOARD: ['BBBBBBBBBB', 'BQQQQQQQQB', 'BQRQQQRQQB', 'BQQRQRQQQB', 'BQQQRQQQQB', 'BQQQQQQQQB', 'BBBBBBBBBB'],
  CARD: ['LLLLL', 'LYLYL', 'LLYLL', 'LYLYL', 'LLLLL', 'LLLLL'],
}

// ─────────────────────────────────────────────── the bug (top-left, Inter 800 small caps)
function buildBug(root, color) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '34px', height: '34px', imageRendering: 'pixelated' }, box)
  ic.width = 34; ic.height = 34
  { const c = ic.getContext('2d'); c.fillStyle = GOLD; for (const [i, j] of [[3, 0], [3, 1], [0, 3], [1, 3], [2, 2], [3, 2], [4, 2], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [2, 4], [3, 4], [4, 4], [3, 5], [3, 6]]) c.fillRect(i * 4 + 3, j * 4 + 3, 4, 4); void color }
  el('div', { font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.16em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box,
    `Your&nbsp;Star&nbsp;Guide<span style="color:rgba(255,255,255,0.6)"> · Extended</span>`)
  return { update(k = 1) { box.style.display = k <= 0.01 ? 'none' : 'flex'; box.style.opacity = String(k) } }
}

// ─────────────────────────────────────────────── the film
export const K0 = { ACT_Y, GROUND, SM, THEM, GOLD, BONE, INK, BM, COL, HOOK_END, CH, mini, tears, label, heart, phone, bubble, banner, stamp, shake,
  drawBits, burst: drawBurst, sparkles, pop01, popOut, outK, clamp, lerp, prog, ease, PIS }

export function guideXFilm(spec) {
  const { sign, hook, hookScene, promise = 'STAY FOR CHAPTER 4', chip, chipCh = 0, chapters, last, late = 1, ending = 'cut', pisces = true, music, hookSize = 92, lastSize = 112 } = spec
  const S = guideSign(sign), ME = { color: S.color, glyph: S.glyph, name: S.name, title: S.title }
  const SPEAK = guideSpeaker(S.glyph)
  const E = +(HOOK_END + 4 * CH).toFixed(2)
  const T = { E, h2: +(E + 0.2).toFixed(2), h2Land: +(E + 0.75).toFixed(2), guideIn: 2.5 }
  const DURATION = ending === 'loop' ? +(T.h2Land + 1.0 + 0.45).toFixed(2) : +(T.h2Land + 0.9).toFixed(2)
  T.loop = ending === 'loop' ? [+(DURATION - 0.45).toFixed(2), DURATION] : null
  T.end = DURATION
  const CPS = 28
  const CHS = chapters.map((c, i) => {
    const C = +(HOOK_END + i * CH).toFixed(2)
    const lines = c.lines.map((text, j) => ({ t: +(C + 0.8 + j * 6.1).toFixed(2), speaker: SPEAK, text, color: j % 2 ? '#ffd9a0' : ME.color }))
    return { C, i, lines, open: +(C + 0.5).toFixed(2), close: +(C + 14).toFixed(2) }
  })
  const ALL_LINES = CHS.flatMap(c => c.lines)
  const HOPS = talkHops(ALL_LINES, SPEAK, { cps: CPS })
  const K = { ...K0, ME, T, CHS, S,
    appear: (t, t0, t1) => pop01(t, t0, 0.4, 2.2) * (t1 === undefined ? 1 : popOut(t, [t1, t1 + 0.35])) }
  const HS = hookScene(K)
  const GAGS = chapters.map((c, i) => c.gag(CHS[i].C, K))
  const CHIP_AT = +(CHS[chipCh].C + 2.6).toFixed(2)

  async function build(stage) {
    await loadGuideFonts()
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const BUG = buildBug(root, ME.color)
    const H2 = popText(root, last, { top: 1440, size: lastSize, accentSize: Math.round(lastSize * 1.4), at: T.h2, gap: 0.08, late, lateAt: T.h2Land, lateGap: 0.14, accentColor: ME.color, lineHeight: 1.0 })
    const BOXES = CHS.map(c => dialogueBox(root, { lines: c.lines, y: 1450, width: 960, height: 300, open: c.open, close: c.close, cps: CPS }))
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function drawStage(t) {
      const a = clamp(prog(t, HOOK_END - 0.5, HOOK_END))
      if (a <= 0) return
      x.save(); x.globalAlpha = a
      const g0 = x.createRadialGradient(540, GROUND - 80, 40, 540, GROUND - 80, 640)
      g0.addColorStop(0, 'rgba(255,200,110,0.2)'); g0.addColorStop(1, 'rgba(255,200,110,0)')
      x.fillStyle = g0; x.fillRect(0, GROUND - 720, 1080, 1100)
      const gg = x.createLinearGradient(0, GROUND, 0, GROUND + 120); gg.addColorStop(0, 'rgba(242,199,92,0.35)'); gg.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = gg; x.fillRect(60, GROUND, 960, 120)
      x.fillStyle = 'rgba(242,199,92,0.75)'; x.fillRect(60, GROUND, 960, 6)
      for (let i = 0; i < 12; i++) { x.fillStyle = i % 2 ? 'rgba(242,199,92,0.35)' : 'rgba(239,230,214,0.25)'; x.fillRect(80 + i * 80, GROUND + 14, 40, 4) }
      x.restore()
    }
    function drawPisces(t) {
      if (!pisces || t < HOOK_END - 0.3) return
      const p = pop01(t, HOOK_END - 0.3, 0.4, 2.2)
      const k = t > T.h2 ? 3 : t < CHS[1].C ? 1 : t < CHS[3].C ? 2 : 3
      const hops = [T.h2Land + 0.05, ...CHS.map(c => c.C + 0.1)]
      const o = { x: 975, y: ACT_Y + 6, size: 128, color: PIS.color, glyph: null, mood: t > T.h2Land ? 'happy' : 'sparkle', look: [-1, -0.4], pop: p, seed: 7, hops, glow: 0.7 }
      drawStarChar(x, o.x, o.y, o.size, t, o)
      tears(x, t, o, k)
    }
    function drawTheGuide(t) {
      const k = pop01(t, T.guideIn, 0.45, 2.2)
      if (k <= 0.01) return
      const sway = Math.sin(t * 0.7) * 10
      let talking = false
      for (const c of CHS) if (t > c.lines[0].t - 0.1 && t < c.close) talking = true
      const mood = t > T.h2Land ? 'sparkle' : talking ? 'neutral' : 'happy'
      const r = drawGuide(x, UP.x + sway, UP.y, UP.size, t, { color: ME.color, glyph: S.glyph, mood, look: [0, 0.8], hops: [T.guideIn + 0.05, ...HOPS, ...CHS.map(c => c.C), T.h2Land], seed: 2, glow: 1.1, pop: k }, { lantern: 1, glow: 1.2 })
      for (const c of CHS) sparkles(x, t, r.lx, r.ly, c.C, 8, 90, c.i + 1, [GOLD, BONE, ME.color])
      sparkles(x, t, r.lx, r.ly, T.h2Land, 10, 120, 9, [GOLD, BONE, ME.color])
    }
    function scene(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.72 })
      if (t < HOOK_END) HS.draw(x, t)
      drawStage(t)
      if (t >= HOOK_END - 0.5) {
        drawTheGuide(t)
        for (let i = 0; i < 4; i++) { const c = CHS[i]; if (t >= c.C - 0.2 && (i === 3 || t < c.C + CH + 0.4)) GAGS[i].draw(x, t) }
        drawPisces(t)
        for (let i = 0; i < 4; i++) { const c = CHS[i]; if (GAGS[i].front && t >= c.C - 0.2 && (i === 3 || t < c.C + CH + 0.4)) GAGS[i].front(x, t) }
        factChip(x, t, { text: chip, at: CHIP_AT, dur: 4.6, x: 540, y: 772, color: GOLD, size: 28 })
      }
      if (t < HOOK_END && HS.front) HS.front(x, t)
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const [sx, sy] = HS.shake ? HS.shake(t) : [0, 0]
        x.save(); x.translate(sx, sy)
        scene(t)
        x.restore()
        BUG.update(1)
        for (const b of BOXES) b.update(t)
        H2.update(t, 1)
        drawGrain(gx, t)
      },
    }
  }

  const HOOKO = { at: -1, text: hook, top: 250, size: hookSize, accentColor: ME.color, out: [HOOK_END - 0.45, HOOK_END - 0.1] }
  const PROM = { at: 1.15, out: [HOOK_END - 0.4, HOOK_END - 0.05], n: '★', title: promise, x: 160, y: 820, color: '#ff8fb1' }
  const CHAPS = CHS.map(c => ({ at: c.C, out: c.i === 3 ? [E - 0.3, E] : [c.C + CH - 0.4, c.C + CH - 0.05], n: c.i + 1, title: CH_NAMES[c.i], x: 70, y: 128, color: c.i === 3 ? '#ff8fb1' : GOLD }))
  const FX = HS.fx || []
  const SCENES = [build, ...FX.map(f => f.scene), HK.slamTitle(HOOKO), HK.chapter(PROM), ...CHAPS.map(o => HK.chapter(o)),
    ...(T.loop ? [HK.loopBack([build, ...FX.filter(f => f.frame0).map(f => f.scene), HK.slamTitle(HOOKO)], { duration: DURATION, len: 0.45 })] : [])]
  const nWords = last.split(' ').filter(w => w !== '|').length
  const CUES = [
    ...(HS.cues || []), ...FX.flatMap(f => f.cues || []), ...HK.slamTitleCues(HOOKO), ...HK.chapterCues(PROM),
    ['pop', T.guideIn, 880, 0.035, 0], ...guideCues(T.guideIn + 0.1, { gain: 0.024 }),
    ...CHS.flatMap(c => [...HK.chapterCues(CHAPS[c.i]), ['pop', c.open, 739.99, 0.035, 0], ['pop', c.open + 0.06, 987.77, 0.028, 0], ['pop', c.close, 880, 0.026, 0], ['pop', c.close + 0.07, 587.33, 0.026, 0]]),
    ...talkCues(ALL_LINES, { cps: CPS }),
    ...guideCues(CHIP_AT, { gain: 0.022, notes: [1174.66, 1318.51, 1567.98] }),
    ...(pisces ? [['pop', HOOK_END - 0.3, 1174.66, 0.025, 0.6], ...CHS.map(c => ['pluck', c.C + 1.6, 1567.98, 0.016, 0.4, 0.6])] : []),
    ...wordPops(T.h2, Math.max(1, nWords - late), 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
    ...guideCues(T.h2Land + 0.2, { gain: 0.02 }),
    ...GAGS.flatMap(g => g.cues || []),
    ...(T.loop ? HK.loopCues({ duration: DURATION, len: 0.45 }) : []),
  ].filter(c => c[1] < DURATION - 0.05).sort((a, b) => a[1] - b[1])
  return { DURATION, SCENES, CUES, T, music, LINES_EXPORT: { lines: ALL_LINES, cps: CPS, get close() { return CHS[3].close } } }
}
