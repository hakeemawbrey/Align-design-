// simkit — OVERTHINKING SIMULATOR (Month 2 boost, batch m08). Shared by kose01–kose20 (import read-only from here).
//
// The look: a sign's brain runs OVERTHINK.SIM, a fictional retro computer program. A window sits mid-frame (title bar
// "OVERTHINK.SIM — ♍ VIRGO.BRAIN"), a loading bar crawls underneath, and the window shows one panel at a time:
//   chat     a text thread (the tiny thing being overthought)            theory   "SIMULATION 2/4" + a tiny scene, then DELETED
//   error    a red error dialog (overlay)                                 meter    a gauge / line graph
//   scene    a free little scene (characters, icons, captions)            custom   a film-specific draw function
// The sign stands bottom-left (name chip), ♓ Pisces "tech support" (headset) sobs bottom-right in every film.
// Top layer: phone notifications, stamps, chapter stickers, flashes. No end card, no card cut, no logo, never "Align".
//
//   import { simFilm } from '../../kose01/scenes/simkit.js'
//   const F = simFilm(CFG); export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
//
// CFG (times in s):
//   ep, sign ('virgo'), duration, ending: 'cut' | 'loop' (the last LOOP_LEN s ease back into frame 0)
//   hook: popText string ('Their *“ok.”* had a | PERIOD.'), heads: [{ t, text, color }] later headlines
//   bar: { label, keys: [[t, pct]], err: [[a, b]], labels: [[t, text]] }   pct 0–100 (linear between keys)
//   panels: [{ t0, t1, kind, ... }]   says: [{ t, who: 'sign' | 'sup', text, d }]
//   moods: [[t, mood, look]] (the sign)  sup: { moods: [[t, mood]], tears: [[t, k]] }  supOff: true (no tech support)
//   fx: [{ t, kind: 'whip' | 'flash' | 'shake' | 'glitch' | 'freeze' | 'scratch', d, color }]
//   notifs: [{ t, d, from, text }]  stamps: [{ t, d, text, color, y }]  chapters: [{ t, d, n, text }]
//   steam: [[a, b]] (smoke from the sign's head)   draw: { under(x, t), over(x, t) } optional extra layers
//   music: { style, key, seed, drop, hits }        cues: extra cues
// Pure f(t). Nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits, starFrame, inSprite, tearsCells } from '../../sxmail1/scenes/mail.js'
import {
  whipZoom, whipZoomCues, screenShake, shakeCues, glitch, glitchCues, recordScratch, recordScratchCues, frozen,
  slamTitle, slamTitleCues, notification, notificationCues, chapter, chapterCues, caught, caughtCues, loopBack, loopCues,
  countdown, countdownCues, achievement, achievementCues, incomingCall, incomingCallCues, gameHud, gameHudCues,
} from '../../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff3b4e', LAV = '#c9a6ff', CYAN = '#7fe3ff', GREEN = '#7ff0a0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const W = 1080, H = 1920
export const WIN = { x: 60, y: 430, w: 960, h: 776 }
export const CA = { x: 84, y: 518, w: 912, h: 664 }          // the window's content area
export const BAR = { x: 60, y: 1232, w: 960, h: 92 }
export const SIGN_AT = { x: 262, y: 1610, s: 320 }, SUP_AT = { x: 868, y: 1640, s: 230 }
export const LOOP_LEN = 0.45
export const pop01 = (t, t0, d = 0.3, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, a, b) => 1 - ease.inQuad(prog(t, a, b))
export const NAME = id => id.toUpperCase()
export const PIS = signStar('pisces')

/** the last [t, ...] entry at or before t */
export function at(list, t, dflt) { let r = dflt; for (const e of list || []) if (e[0] <= t) r = e; return r }
/** piecewise-linear value from [[t, v]] keys */
export function keyed(keys, t) {
  if (!keys || !keys.length) return 0
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; return lerp(va, vb, ease.inOutQuad((t - a) / (b - a))) }
  return keys[keys.length - 1][1]
}
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

// ─────────────────────────────────────────────── text helpers (canvas)
function tokens(text) { let acc = false; return text.split(' ').map(w => { let a = acc, out = ''; for (const ch of w) { if (ch === '*') { acc = !acc; a = a || acc; continue } out += ch } return { w: out, acc: a } }) }
/** wrapped rich text (`*accent*`, `|` = break), centred (align 'center') or left; returns the block height */
export function richText(x, text, cx, top, { size = 56, weight = 800, font = INTER, color = BONE, acc = GOLD, maxW = 820, align = 'center', lh = 1.16, shadow = true, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  x.font = `${weight} ${size}px ${font}`; x.textBaseline = 'top'; x.textAlign = 'left'
  const rows = []
  for (const para of text.split('|')) {
    let row = [], wsum = 0
    for (const tk of tokens(para.trim())) {
      const ww = x.measureText(tk.w).width, sp = row.length ? x.measureText(' ').width : 0
      if (row.length && wsum + sp + ww > maxW) { rows.push({ row, wsum }); row = []; wsum = 0 }
      row.push({ ...tk, ww }); wsum += (row.length > 1 ? x.measureText(' ').width : 0) + ww
    }
    rows.push({ row, wsum })
  }
  const sp = x.measureText(' ').width
  rows.forEach(({ row, wsum }, j) => {
    let px = align === 'center' ? cx - wsum / 2 : cx
    const py = top + j * size * lh
    for (const tk of row) {
      if (shadow) { x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(tk.w, px + 3, py + 4) }
      x.fillStyle = tk.acc ? acc : color; x.fillText(tk.w, px, py); px += tk.ww + sp
    }
  })
  x.restore()
  return rows.length * size * lh
}
export function measureRows(x, text, { size = 56, weight = 800, font = INTER, maxW = 820 } = {}) {
  x.save(); x.font = `${weight} ${size}px ${font}`
  let n = 0
  for (const para of text.split('|')) { let wsum = 0, cnt = 0; n++; for (const tk of tokens(para.trim())) { const ww = x.measureText(tk.w).width; if (cnt && wsum + x.measureText(' ').width + ww > maxW) { n++; wsum = ww; cnt = 1 } else { wsum += (cnt ? x.measureText(' ').width : 0) + ww; cnt++ } } }
  x.restore(); return n
}

// ─────────────────────────────────────────────── pixel panels + icons
/** stepped-corner pixel panel */
export function pxPanel(x, X, Y, w, h, { fill = 'rgba(14,9,36,0.94)', border = GOLD, P = 6, glow = 0 } = {}) {
  const step = (o, col) => { x.fillStyle = col; x.fillRect(X + o + 2 * P, Y + o, w - 2 * o - 4 * P, h - 2 * o); x.fillRect(X + o, Y + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); x.fillRect(X + o + P, Y + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
  if (glow) { x.save(); x.shadowColor = border; x.shadowBlur = glow; step(0, border); x.restore() }
  step(-P, INK); step(0, border); step(P, fill)
}
export const ICONS = {
  heart: ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'],
  broken: ['.HH.HH.', 'HHH.HHH', 'HWH.HHH', 'HH.HHHH', '.HH.HH.', '..H.H..', '...H...'],
  clock: ['..WWW..', '.W...W.', 'W..K..W', 'W..KK.W', 'W.....W', '.W...W.', '..WWW..'],
  moon: ['..YYY..', '.YYY...', 'YYY....', 'YYY....', 'YYY....', '.YYY...', '..YYY..'],
  phone: ['KKKKK', 'KCCCK', 'KCCCK', 'KCCCK', 'KCCCK', 'KKWKK'],
  bolt: ['...YY', '..YY.', '.YYYY', '..YY.', '.YY..', 'YY...'],
  star: ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '..YYY..', '.YY.YY.', 'YY...YY'],
  dog: ['B.....B.', 'BB...BB.', 'BBBBBBB.', 'BWBBWBB.', 'BBBKBBB.', '.BBBBB..', '.B...B..'],
  bowl: ['.Y.Y.Y.', 'Y.Y.Y.Y', 'WWWWWWW', 'WWWWWWW', '.WWWWW.', '..WWW..'],
  note: ['..KKKK', '..K..K', '..K..K', '..K..K', 'KKK.KK', 'KKK.KK'],
  snow: ['W..W..W', '.W.W.W.', '..WWW..', 'WWWWWWW', '..WWW..', '.W.W.W.', 'W..W..W'],
  plane: ['...W...', '...W...', '.WWWWW.', 'WWWWWWW', '...W...', '..WWW..'],
  bag: ['..KKK..', '.K...K.', 'BBBBBBB', 'BBBBBBB', 'BBBBBBB', 'BBBBBBB'],
  cal: ['RRRRRRR', 'WWWWWWW', 'W.W.W.W', 'WWWWWWW', 'W.W.W.W', 'WWWWWWW'],
  cloud: ['..WWW...', '.WWWWW..', 'WWWWWWWW', 'WWWWWWWW', '.C.C.C..', 'C.C.C...'],
  camera: ['..KK...', 'KKKKKKK', 'KWWWWWK', 'KWKKKWK', 'KWKCKWK', 'KWWWWWK', 'KKKKKKK'],
  check: ['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....'],
  cross: ['R.....R', '.R...R.', '..R.R..', '...R...', '..R.R..', '.R...R.', 'R.....R'],
  fan: ['K.....K', '.K...K.', '..KKK..', '..KYK..', '..KKK..', '.K...K.', 'K.....K'],
  play: ['W....', 'WW...', 'WWW..', 'WWWW.', 'WWW..', 'WW...', 'W....'],
  eye: ['..WWW..', '.WWWWW.', 'WWKKKWW', 'WWKCKWW', 'WWKKKWW', '.WWWWW.', '..WWW..'],
  gift: ['.R...R.', '..R.R..', 'YYYRYYY', 'YYYRYYY', 'YYYRYYY', 'YYYRYYY'],
  tree: ['...G...', '..GGG..', '.GGGGG.', '..GGG..', '.GGGGG.', 'GGGGGGG', '...B...'],
  house: ['...R...', '..RRR..', '.RRRRR.', 'RRRRRRR', '.WWWWW.', '.WWBWW.', '.WWBWW.'],
  ghost: ['..WWW..', '.WWWWW.', 'WWKWKWW', 'WWWWWWW', 'WWWWWWW', 'W.W.W.W'],
  coffee: ['.W.W...', '..W.W..', 'WWWWWW.', 'WWWWWWW', 'WWWWW.W', 'WWWWWW.', '.WWWW..'],
}
const ICOL = { H: '#ff4f86', W: '#fff4dc', K: '#2a1f55', Y: GOLD, C: CYAN, B: '#b9875a', G: GREEN, R: RED }
export function icon(x, name, cx, cy, cell, { alpha = 1, rot = 0, cols = {} } = {}) { const bm = ICONS[name]; if (bm) drawBits(x, bm, { ...ICOL, ...cols }, cx, cy, cell, { alpha, rot }) }

// ─────────────────────────────────────────────── characters
/** a sign star (with name chip when chip = true) */
export function drawSign(x, t, sign, P, { mood = 'neutral', look, tears = 0, hops, pop = 1, alpha = 1, seed = 3, squash = 0, chip = false, glow = 1 } = {}) {
  const S = sign === 'star' ? { color: STAR.sky, glyph: null } : signStar(sign)
  const o = { color: S.color, glyph: P.s >= 140 ? S.glyph : null, mood, look, hops, pop, alpha, seed, squash, glow, blink: mood === 'wide' ? false : undefined }
  drawStarChar(x, P.x, P.y, P.s, t, o)
  if (tears) { const F = starFrame(P.x, P.y, P.s, t, { pop, hops, seed, squash }); inSprite(x, F, () => tearsCells(x, t, tears)) }
  if (chip && pop > 0.3) {
    const txt = `${S.glyph}︎ ${NAME(sign)}`
    x.save(); x.globalAlpha *= alpha * clamp(pop); x.font = `700 28px ${MONO}`; const w = x.measureText(txt).width + 34
    const cy = P.y + P.s * 0.54
    pxPanel(x, P.x - w / 2, cy - 22, w, 44, { fill: 'rgba(14,9,36,0.92)', border: S.color, P: 4 })
    x.fillStyle = S.color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, P.x, cy + 1); x.restore()
  }
}
/** ♓ Pisces, tech support: headset earcup + boom mic, always crying (tears ≥ 1) */
export function drawSupport(x, t, P, { mood = 'wide', tears = 1, pop = 1, hops, label = true, look = [-1, -0.4] } = {}) {
  if (pop <= 0.01) return
  drawStarChar(x, P.x, P.y, P.s, t, { color: PIS.color, glyph: null, mood, look, pop, hops, seed: 6, glow: 0.9 })
  const F = starFrame(P.x, P.y, P.s, t, { pop, hops, seed: 6 })
  inSprite(x, F, () => {
    x.fillStyle = INK; x.fillRect(27.6, 14.6, 4.8, 6.8); x.fillStyle = '#3b2f6b'; x.fillRect(28.2, 15.2, 3.6, 5.6); x.fillStyle = CYAN; x.fillRect(28.8, 16, 1.2, 1.2)
    x.fillStyle = INK; for (let i = 0; i < 9; i++) x.fillRect(27.6 - i * 0.95, 21 + i * 0.55, 1.4, 1.2)
    x.fillStyle = '#ff6b8a'; x.fillRect(18.6, 25.6, 1.6, 1.4)
    tearsCells(x, t, Math.max(1, tears))
  })
  if (label && pop > 0.4) {
    x.save(); x.globalAlpha *= clamp(pop); x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const txt = `${PIS.glyph}︎ TECH SUPPORT`, w = x.measureText(txt).width + 28, cy = P.y + P.s * 0.56
    pxPanel(x, P.x - w / 2, cy - 19, w, 38, { fill: 'rgba(14,9,36,0.92)', border: PIS.color, P: 4 })
    x.fillStyle = PIS.color; x.fillText(txt, P.x, cy + 1); x.restore()
  }
}
/** puffs of overthinking steam from (cx, top) with strength k */
export function steam(x, t, cx, top, k) {
  if (k <= 0) return
  for (let i = 0; i < 7; i++) {
    const ph = (t * 0.9 + i / 7) % 1, a = Math.sin(Math.PI * ph) * k
    const px = cx + Math.sin(i * 2.3 + t * 2) * 40 + (i % 2 ? 1 : -1) * ph * 60, py = top - ph * 170
    x.save(); x.globalAlpha = 0.55 * a; x.fillStyle = '#e8e2f4'
    const r = 14 + ph * 26, c = Math.max(4, Math.round(r / 3))
    for (let a2 = 0; a2 < 6; a2++) x.fillRect(Math.round((px + Math.cos(a2) * r * 0.5) / c) * c, Math.round((py + Math.sin(a2) * r * 0.4) / c) * c, c * 2, c * 2)
    x.restore()
  }
}

// ─────────────────────────────────────────────── speech bubble (canvas, types on)
export function bubble(x, t, { t0, d = 2.4, text, cx, cy, size = 34, col = BONE, tail = 'down', tailX = 0, maxW = 560, cps = 34 }) {
  const k = pop01(t, t0, 0.22, 2.2) * outK(t, t0 + d - 0.18, t0 + d)
  if (k <= 0.01 || t < t0 || t > t0 + d) return
  const n = Math.floor((t - t0) * cps)
  x.save(); x.font = `800 ${size}px ${INTER}`
  const rows = []
  { let row = ''; for (const w of text.replace(/\*/g, '').split(' ')) { const tr = row ? row + ' ' + w : w; if (row && x.measureText(tr).width > maxW) { rows.push(row); row = w } else row = tr } rows.push(row) }
  const bw = Math.max(...rows.map(r => x.measureText(r).width)) + 46, bh = rows.length * size * 1.18 + 30
  x.translate(cx, cy); x.scale(k, k)
  const X = -bw / 2, Y = -bh / 2
  x.fillStyle = INK; x.fillRect(X - 5, Y, bw + 10, bh); x.fillRect(X, Y - 5, bw, bh + 10)
  x.fillStyle = col; x.fillRect(X, Y, bw, bh)
  if (tail === 'down') { x.fillStyle = INK; x.fillRect(tailX - 14, -Y + 4, 18, 18); x.fillStyle = col; x.fillRect(tailX - 9, -Y, 9, 14) }
  if (tail === 'up') { x.fillStyle = INK; x.fillRect(tailX - 14, Y - 22, 18, 18); x.fillStyle = col; x.fillRect(tailX - 9, Y - 14, 9, 14) }
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'top'
  let used = 0
  rows.forEach((r, j) => { const vis = r.slice(0, Math.max(0, n - used)); used += r.length + 1; if (vis) { const full = x.measureText(r).width; x.textAlign = 'left'; x.fillText(vis, -full / 2, Y + 16 + j * size * 1.18) } })
  x.restore()
}

// ─────────────────────────────────────────────── the window + panels
function windowChrome(x, t, title, { red = 0 } = {}) {
  const { x: X, y: Y, w, h } = WIN
  pxPanel(x, X, Y, w, h, { fill: 'rgba(12,8,30,0.93)', border: red > 0.5 ? RED : GOLD, P: 6, glow: 18 })
  // title bar
  x.fillStyle = red > 0.5 ? '#5a0f22' : '#2a1d5c'; x.fillRect(X + 12, Y + 12, w - 24, 58)
  x.fillStyle = 'rgba(255,255,255,0.08)'; for (let i = 0; i < 3; i++) x.fillRect(X + 12, Y + 18 + i * 14, w - 24, 3)
  x.font = `700 30px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(title, X + 34, Y + 42)
  const bx = X + w - 40
  ;[[RED, '×'], [GOLD, '–'], [GREEN, '□']].forEach(([c], i) => { x.fillStyle = INK; x.fillRect(bx - i * 46 - 16, Y + 26, 34, 32); x.fillStyle = c; x.fillRect(bx - i * 46 - 12, Y + 30, 26, 24) })
  // scanlines
  x.fillStyle = 'rgba(255,255,255,0.025)'; for (let yy = CA.y; yy < CA.y + CA.h; yy += 6) x.fillRect(CA.x, yy, CA.w, 2)
}

function panelK(t, p) { return { in: pop01(t, p.t0, 0.28, 1.8), out: p.keep ? 1 : outK(t, p.t1 - 0.18, p.t1) } }

function drawChat(x, t, p) {
  const k = panelK(t, p), a = clamp(k.in * 2) * k.out
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  // header
  x.fillStyle = 'rgba(255,255,255,0.06)'; x.fillRect(CA.x, CA.y, CA.w, 70)
  if (p.who) drawSign(x, t, p.who, { x: CA.x + 50, y: CA.y + 37, s: 56 }, { mood: 'neutral', seed: 11 })
  x.font = `700 32px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(p.title || 'them', CA.x + 92, CA.y + 37)
  // messages, bottom-anchored (they scroll up)
  const size = p.size || 52, pad = 24, maxW = 640
  x.font = `700 ${size}px ${INTER}`
  const vis = p.msgs.filter(m => t >= m.at)
  const lay = vis.map(m => {
    const sz = m.size || size; x.font = `700 ${sz}px ${INTER}`
    const rows = []; let row = ''
    for (const w of m.text.split(' ')) { const tr = row ? row + ' ' + w : w; if (row && x.measureText(tr).width > maxW - 2 * pad) { rows.push(row); row = w } else row = tr }
    rows.push(row)
    const bw = Math.max(...rows.map(r => x.measureText(r).width)) + 2 * pad, bh = rows.length * sz * 1.15 + 2 * pad - 8
    return { m, rows, bw, bh, sz }
  })
  const typing = (p.typing || []).some(([a2, b]) => t >= a2 && t < b)
  let yb = CA.y + CA.h - 30 - (typing ? 90 : 0) - (p.seen && t >= p.seen.at ? 40 : 0)
  x.save(); x.beginPath(); x.rect(CA.x, CA.y + 72, CA.w, CA.h - 72); x.clip()
  for (let i = lay.length - 1; i >= 0; i--) {
    const { m, rows, bw, bh, sz } = lay[i]
    const pk = pop01(t, m.at, 0.25, 2.2)
    const R = m.side === 'R', bx = R ? CA.x + CA.w - 30 - bw : CA.x + 30, by = yb - bh
    x.save(); x.translate(R ? bx + bw : bx, by + bh); x.scale(pk, pk); x.translate(-(R ? bx + bw : bx), -(by + bh))
    const col = m.col || (R ? GOLD : '#d9cdf5')
    x.fillStyle = INK; x.fillRect(bx - 5, by, bw + 10, bh); x.fillRect(bx, by - 5, bw, bh + 10)
    x.fillStyle = col; x.fillRect(bx, by, bw, bh)
    x.fillStyle = INK; x.textBaseline = 'top'; x.textAlign = 'left'; x.font = `700 ${sz}px ${INTER}`
    rows.forEach((r, j) => x.fillText(r, bx + pad, by + pad - 4 + j * sz * 1.15))
    if (m.circle && t > m.circle) {                          // the "caught" red circle on a bubble
      const ck = ease.outCubic(prog(t, m.circle, m.circle + 0.35))
      x.strokeStyle = RED; x.lineWidth = 9; x.beginPath()
      x.ellipse(bx + bw / 2, by + bh / 2, bw * 0.62 + 10, bh * 0.75 + 14, -0.06, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ck); x.stroke()
    }
    x.restore()
    yb = by - 26
  }
  x.restore()
  // typing dots + seen
  let yy = CA.y + CA.h - 30
  if (p.seen && t >= p.seen.at) { x.font = `700 30px ${MONO}`; x.fillStyle = p.seen.col || RED; x.textAlign = 'right'; x.textBaseline = 'bottom'; x.fillText(p.seen.text, CA.x + CA.w - 34, yy); yy -= 40 }
  if (typing) {
    x.fillStyle = INK; x.fillRect(CA.x + 25, yy - 80, 160, 80); x.fillStyle = '#d9cdf5'; x.fillRect(CA.x + 30, yy - 75, 150, 70)
    for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 9 - i * 0.9)); x.fillStyle = INK; x.fillRect(CA.x + 58 + i * 38, yy - 50 - b * 10, 18, 18) }
  }
  x.restore()
}

/** a deterministic "DELETED" stamp + slash; k 0→1 */
function deleted(x, t, t0, cx, cy, { text = 'DELETED', col = RED, size = 120 } = {}) {
  if (t < t0) return
  const k = easeOutBack(prog(t, t0, t0 + 0.22), 2.6)
  x.save(); x.translate(cx, cy); x.rotate(-0.16); x.scale(lerp(2.2, 1, clamp(k)), lerp(2.2, 1, clamp(k)))
  x.globalAlpha *= clamp(prog(t, t0, t0 + 0.08))
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(text).width + 60
  x.strokeStyle = col; x.lineWidth = 12; x.strokeRect(-w / 2, -size * 0.62, w, size * 1.24)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 6)
  x.restore()
}

function drawScene(x, t, sc, k = 1, ox = CA.x, oy = CA.y, cw = CA.w, chh = CA.h) {
  for (const it of sc.items || []) {
    if (it.at != null && t < it.at) continue
    if (it.till != null && t > it.till) continue
    const pk = (it.at != null ? pop01(t, it.at, 0.3, 2) : 1) * k
    const px = ox + it.x * cw, py = oy + it.y * chh
    if (it.icon) { icon(x, it.icon, px + (it.wob ? Math.sin(t * 6) * 6 : 0), py + (it.bob ? Math.sin(t * 3 + it.x * 9) * 8 : 0), (it.cell || 10) * pk, { rot: it.rot || 0, cols: it.cols || {} }); continue }
    if (it.text) { richText(x, it.text, px, py, { size: it.size || 44, weight: it.weight || 800, font: it.font || INTER, color: it.color || BONE, acc: it.acc || GOLD, maxW: it.maxW || cw - 60, alpha: clamp(pk * 2), align: it.align || 'center' }); continue }
    if (it.sign) {
      const mood = it.moods ? at(it.moods, t, [0, it.mood || 'neutral'])[1] : it.mood || 'neutral'
      drawSign(x, t, it.sign, { x: px + (it.dx ? it.dx(t) : 0), y: py, s: it.s || 150 }, { mood, look: it.look, tears: it.tears || (it.sign === 'pisces' ? 1 : 0), pop: pk, seed: it.seed || 5, squash: it.squash || 0, hops: it.hops })
      continue
    }
    if (it.bubble) bubble(x, t, { t0: it.at ?? 0, d: it.d ?? 99, text: it.bubble, cx: px, cy: py, size: it.size || 32, col: it.col || BONE, tail: it.tail || 'down', tailX: it.tailX || 0, maxW: it.maxW || 420 })
    if (it.draw) it.draw(x, t, px, py, pk)
  }
}

function drawTheory(x, t, p) {
  const k = panelK(t, p)
  const del = p.del ?? (p.t1 - 0.62)
  const a = clamp(k.in * 2) * k.out
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  // header chip
  const chip = p.chip || `SIMULATION ${p.n}/${p.of}`
  x.font = `700 30px ${MONO}`; const cw = x.measureText(chip).width + 40
  x.fillStyle = p.chipCol || CYAN; x.fillRect(CA.x + CA.w / 2 - cw / 2, CA.y + 14, cw, 48)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(chip, CA.x + CA.w / 2, CA.y + 39)
  // caption
  richText(x, p.title, CA.x + CA.w / 2, CA.y + 84, { size: p.size || 58, maxW: CA.w - 70, acc: p.acc || PINK })
  // the little scene
  x.save(); x.translate(CA.x + CA.w / 2, CA.y + CA.h * 0.66); x.scale(lerp(0.85, 1, k.in), lerp(0.85, 1, k.in)); x.translate(-(CA.x + CA.w / 2), -(CA.y + CA.h * 0.66))
  if (p.scene) drawScene(x, t, p.scene)
  x.restore()
  // render progress strip
  const rp = clamp(prog(t, p.t0 + 0.1, del - 0.05))
  x.fillStyle = 'rgba(255,255,255,0.1)'; x.fillRect(CA.x + 40, CA.y + CA.h - 34, CA.w - 80, 12)
  x.fillStyle = p.chipCol || CYAN; x.fillRect(CA.x + 40, CA.y + CA.h - 34, (CA.w - 80) * rp, 12)
  if (!p.noDelete) deleted(x, t, del, CA.x + CA.w / 2, CA.y + CA.h * 0.55, { text: p.stamp || 'DELETED', col: p.stampCol || RED })
  x.restore()
}

function drawError(x, t, p) {
  const k = pop01(t, p.t0, 0.25, 2.6) * (p.keep ? 1 : outK(t, p.t1 - 0.15, p.t1))
  if (k <= 0.01) return
  const w = p.w || 760, h = p.h || 360, cx = CA.x + CA.w / 2, cy = CA.y + CA.h / 2 + (p.dy || 0)
  const j = t - p.t0 < 0.5 ? Math.sin(t * 90) * 10 * (1 - (t - p.t0) / 0.5) : 0
  x.save(); x.translate(cx + j, cy); x.scale(k, k)
  pxPanel(x, -w / 2, -h / 2, w, h, { fill: '#1c0612', border: RED, P: 6, glow: 26 })
  x.fillStyle = RED; x.fillRect(-w / 2 + 12, -h / 2 + 12, w - 24, 56)
  x.font = `700 32px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(p.title || '⚠ ERROR', -w / 2 + 34, -h / 2 + 41)
  richText(x, p.text, 0, -h / 2 + 96, { size: p.size || 54, maxW: w - 80, acc: GOLD })
  // OK button
  const bw = 200, by = h / 2 - 82
  x.fillStyle = INK; x.fillRect(-bw / 2 - 5, by - 5, bw + 10, 62); x.fillStyle = BONE; x.fillRect(-bw / 2, by, bw, 52)
  x.font = `700 30px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(p.ok || 'OK', 0, by + 27)
  x.restore()
}

function drawMeter(x, t, p) {
  const k = panelK(t, p), a = clamp(k.in * 2) * k.out
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  richText(x, p.label, CA.x + CA.w / 2, CA.y + 30, { size: p.size || 52, maxW: CA.w - 80, acc: p.acc || GOLD })
  const v = keyed(p.keys, t), max = p.max || 100
  if (p.style === 'graph') {
    const gx = CA.x + 80, gy = CA.y + 190, gw = CA.w - 160, gh = CA.h - 300
    x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 3; x.strokeRect(gx, gy, gw, gh)
    for (let i = 1; i < 4; i++) { x.fillStyle = 'rgba(255,255,255,0.08)'; x.fillRect(gx, gy + gh * i / 4, gw, 2) }
    const pts = p.keys, t0 = pts[0][0], t1 = pts[pts.length - 1][0]
    const now = clamp((t - t0) / (t1 - t0))
    x.strokeStyle = p.col || PINK; x.lineWidth = 10; x.lineJoin = 'round'; x.beginPath()
    const N = 60
    for (let i = 0; i <= N * now; i++) { const u = i / N, tt = lerp(t0, t1, u), vv = keyed(pts, tt); const px = gx + u * gw, py = gy + gh * (1 - clamp(vv / max, -0.3, 1.1)); i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke()
    const ux = gx + now * gw, uy = gy + gh * (1 - clamp(v / max, -0.3, 1.1))
    icon(x, p.icon || 'heart', ux, uy, 9)
    x.font = `700 34px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'right'; x.textBaseline = 'top'; x.fillText(p.fmt ? p.fmt(v) : `${Math.round(v)}${p.unit || ''}`, gx + gw - 10, gy + 12)
  } else if (p.style === 'gauge') {
    const cx = CA.x + CA.w / 2, cy = CA.y + CA.h - 120, R = 300
    x.lineWidth = 46
    const segs = p.segs || [[0, 0.33, RED], [0.33, 0.66, GOLD], [0.66, 1, GREEN]]
    for (const [s0, s1, c] of segs) { x.strokeStyle = c; x.beginPath(); x.arc(cx, cy, R, Math.PI + s0 * Math.PI, Math.PI + s1 * Math.PI); x.stroke() }
    const f = clamp(v / max) + (p.jitter ? Math.sin(t * 40) * 0.015 : 0), ang = Math.PI + f * Math.PI
    x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ang) * (R - 20), cy + Math.sin(ang) * (R - 20)); x.stroke()
    x.strokeStyle = BONE; x.lineWidth = 10; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ang) * (R - 24), cy + Math.sin(ang) * (R - 24)); x.stroke()
    x.fillStyle = BONE; x.fillRect(cx - 22, cy - 22, 44, 44)
    if (p.ends) { x.font = `700 30px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'top'; x.fillText(p.ends[0], cx - R, cy + 40); x.fillText(p.ends[1], cx + R, cy + 40) }
  } else {
    const bx = CA.x + 80, by = CA.y + CA.h / 2 + 20, bw = CA.w - 160, bh = 80
    pxPanel(x, bx, by, bw, bh, { fill: '#1b1440', border: BONE, P: 5 })
    const f = clamp(v / max), n = 20, cw2 = (bw - 30) / n
    for (let i = 0; i < n; i++) if ((i + 1) / n <= f + 0.001) { x.fillStyle = p.col || (f < 0.34 ? RED : f < 0.67 ? GOLD : GREEN); x.fillRect(bx + 15 + i * cw2 + 2, by + 15, cw2 - 4, bh - 30) }
    x.font = `800 64px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'top'; x.fillText(p.fmt ? p.fmt(v) : `${Math.round(v)}${p.unit || '%'}`, CA.x + CA.w / 2, by + bh + 30)
  }
  if (p.scene) drawScene(x, t, p.scene)
  x.restore()
}

function drawPanel(x, t, p) {
  if (t < p.t0 || t > p.t1) return
  if (p.kind === 'chat') drawChat(x, t, p)
  else if (p.kind === 'theory') drawTheory(x, t, p)
  else if (p.kind === 'error') drawError(x, t, p)
  else if (p.kind === 'meter') drawMeter(x, t, p)
  else if (p.kind === 'scene') { const k = panelK(t, p); const a = clamp(k.in * 2) * k.out; if (a > 0) { x.save(); x.globalAlpha *= a; if (p.title) richText(x, p.title, CA.x + CA.w / 2, CA.y + 30, { size: p.size || 54, maxW: CA.w - 70, acc: p.acc || GOLD }); drawScene(x, t, p.scene || p); x.restore() } }
  else if (p.kind === 'custom') { const k = panelK(t, p); const a = clamp(k.in * 2) * k.out; if (a > 0) { x.save(); x.globalAlpha *= a; p.draw(x, t, CA, k.in); x.restore() } }
}

// ─────────────────────────────────────────────── loading bar
function drawBar(x, t, B, glitchK) {
  if (!B) return
  if (B.from != null && t < B.from) return
  if (B.till != null && t > B.till) return
  const { x: X, y: Y, w, h } = BAR
  const err = (B.err || []).some(([a, b]) => t >= a && t < b)
  pxPanel(x, X, Y, w, h, { fill: 'rgba(14,9,36,0.95)', border: err ? RED : BONE, P: 5 })
  let pct = keyed(B.keys, t)
  if (err) pct = clamp(pct + (hash(Math.floor(t * 20)) - 0.5) * 18, 0, 100)
  const label = at(B.labels, t, [0, B.label])[1]
  x.font = `700 30px ${MONO}`; x.textBaseline = 'middle'
  x.fillStyle = err ? RED : BONE; x.textAlign = 'left'; x.fillText(label, X + 28, Y + 30)
  x.textAlign = 'right'; x.fillText(err ? (Math.floor(t * 8) % 2 ? 'ERR' : `${Math.round(pct)}%`) : `${Math.round(pct)}%`, X + w - 28, Y + 30)
  const bx = X + 26, by = Y + 52, bw = w - 52, bh = 24, n = 30, cw2 = bw / n
  x.fillStyle = '#2a1f55'; x.fillRect(bx, by, bw, bh)
  for (let i = 0; i < n; i++) if ((i + 1) / n <= pct / 100 + 0.001) { x.fillStyle = err ? (i % 2 ? RED : '#ff9aa6') : (i % 2 ? GOLD : '#ffe7a8'); x.fillRect(bx + i * cw2 + 1, by + 2, cw2 - 2, bh - 4) }
  if (glitchK > 0) { x.fillStyle = `rgba(255,59,78,${0.4 * glitchK})`; x.fillRect(bx + hash(Math.floor(t * 30)) * bw, by - 6, 80, bh + 12) }
}

// ─────────────────────────────────────────────── top layer: notification, stamps, chapter sticker
function drawNotif(x, t, n) {
  const d = n.d || 2.2
  if (t < n.t || t > n.t + d) return
  const k = ease.outBack(prog(t, n.t, n.t + 0.3)), o = ease.inCubic(prog(t, n.t + d - 0.25, n.t + d))
  const y = lerp(-200, n.y ?? 36, k) - o * 240
  const X = 70, w = 940, h = 150
  x.save()
  x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillRect(X + 10, y + 14, w, h)
  x.fillStyle = '#efe9fb'; x.fillRect(X + 12, y, w - 24, h); x.fillRect(X, y + 12, w, h - 24); x.fillRect(X + 4, y + 4, w - 8, h - 8)
  if (n.sign) drawSign(x, t, n.sign, { x: X + 78, y: y + 76, s: 92 }, { mood: n.mood || 'happy', seed: 13 })
  else { x.fillStyle = GOLD; x.fillRect(X + 34, y + 34, 82, 82); icon(x, n.icon || 'phone', X + 75, y + 75, 9) }
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'top'
  x.font = `700 28px ${MONO}`; x.fillStyle = '#5b4a8a'; x.fillText(n.from, X + 146, y + 24)
  x.font = `800 44px ${INTER}`; x.fillStyle = INK; x.fillText(n.text, X + 146, y + 66, w - 180)
  x.restore()
}
function drawStamp(x, t, s) {
  const d = s.d || 1.6
  if (t < s.t || t > s.t + d) return
  const k = easeOutBack(prog(t, s.t, s.t + 0.22), 2.4), o = s.keep ? 1 : outK(t, s.t + d - 0.2, s.t + d)
  const size = s.size || 110
  x.save(); x.translate(s.x ?? 540, s.y ?? 830); x.rotate(s.rot ?? -0.1); const sc = lerp(2.4, 1, clamp(k)); x.scale(sc, sc)
  x.globalAlpha *= clamp(prog(t, s.t, s.t + 0.06)) * o
  x.font = `800 ${size}px ${INTER}`
  const lines = s.text.split('|'), w = Math.max(...lines.map(l => x.measureText(l).width)) + 70, hh = lines.length * size * 1.05 + 40
  x.fillStyle = 'rgba(14,9,36,0.85)'; x.fillRect(-w / 2, -hh / 2, w, hh)
  x.strokeStyle = s.color || GREEN; x.lineWidth = 12; x.strokeRect(-w / 2, -hh / 2, w, hh)
  x.fillStyle = s.color || GREEN; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -hh / 2 + 20 + size * 1.05 * (i + 0.5) + 6))
  x.restore()
}
function drawChapter(x, t, c) {
  const d = c.d || 3
  if (t < c.t || t > c.t + d) return
  const k = easeOutBack(prog(t, c.t, c.t + 0.3), 2.2), o = outK(t, c.t + d - 0.25, c.t + d)
  x.save(); x.translate(800, 380); x.rotate(0.06 + 0.03 * Math.sin(t * 2)); x.scale(k * o, k * o)
  x.font = `800 30px ${INTER}`; const top = `CHAPTER ${c.n}`
  x.font = `800 44px ${INTER}`; const w = Math.max(300, x.measureText(c.text).width + 60), h = 112
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = c.color || PINK; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 26px ${INTER}`; x.fillText(top.split('').join(String.fromCharCode(8202)), 0, -24)
  x.font = `800 44px ${INTER}`; x.fillText(c.text, 0, 20)
  x.restore()
}
function drawPromise(x, t, p) {
  if (!p || t < p.t || t > p.t + (p.d || 3)) return
  const k = easeOutBack(prog(t, p.t, p.t + 0.3), 2), o = outK(t, p.t + (p.d || 3) - 0.2, p.t + (p.d || 3))
  x.save(); x.translate(540, p.y ?? 1832); x.scale(k * o, k * o)
  x.font = `800 40px ${INTER}`; const w = x.measureText(p.text).width + 60
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -36, w + 10, 72); x.fillStyle = GOLD; x.fillRect(-w / 2, -31, w, 62)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(p.text, 0, 2)
  x.restore()
}

// ─────────────────────────────────────────────── fx (camera + overlays)
function fxState(t, FX) {
  let zoom = 1, sx = 0, sy = 0, flash = 0, flashCol = '#fff', glitch = 0, gray = 0, scratch = 0, blur = 0
  for (const f of FX || []) {
    const dt = t - f.t
    if (dt < 0) continue
    if (f.kind === 'whip') { const d = f.d || 0.45; if (dt < d) { const u = dt / d; const z = f.z || 0.22; zoom *= 1 + z * (u < 0.25 ? ease.outCubic(u / 0.25) : 1 - ease.inOutCubic((u - 0.25) / 0.75)); blur = Math.max(blur, u < 0.3 ? 6 * (1 - u / 0.3) : 0) } }
    if (f.kind === 'shake') { const d = f.d || 0.5; if (dt < d) { const a = (f.a || 22) * (1 - dt / d); sx += Math.sin(dt * 71) * a; sy += Math.cos(dt * 57) * a * 0.7 } }
    if (f.kind === 'flash') { const d = f.d || 0.3; if (dt < d) { const a = 0.9 * (1 - dt / d); if (a > flash) { flash = a; flashCol = f.color || '#fff' } } }
    if (f.kind === 'glitch') { const d = f.d || 0.35; if (dt < d) glitch = Math.max(glitch, 1 - dt / d) }
    if (f.kind === 'freeze') { const d = f.d || 0.8; if (dt < d) { gray = 1; scratch = Math.max(scratch, 1) } }
    if (f.kind === 'scratch') { const d = f.d || 0.5; if (dt < d) scratch = Math.max(scratch, 1 - dt / d) }
  }
  return { zoom, sx, sy, flash, flashCol, glitch, gray, scratch, blur }
}
/** effective story time: freezes hold time at their start */
function storyT(t, FX) { for (const f of FX || []) if (f.kind === 'freeze' && t >= f.t && t < f.t + (f.d || 0.8)) return f.t; return t }

// ─────────────────────────────────────────────── the film
const BRAIN = ['..PPPP..', '.PPWPPP.', 'PPPPPWPP', 'PWPPPPPP', 'PPPPWPPP', '.PPPPPP.', '..P..P..']
function buildBug(root) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '52px', height: '44px', imageRendering: 'pixelated' }, box)
  ic.width = 52; ic.height = 44
  drawBits(ic.getContext('2d'), BRAIN, { P: PINK, W: '#ffd1e0' }, 26, 22, 5)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'OVERTHINKING&nbsp;SIMULATOR')
  return box
}

export function simFilm(C) {
  const D = C.duration, SIGN = C.sign, S = signStar(SIGN), SAYS = C.says || []
  const FX = (C.fx || []).filter(f => f.kind === 'flash')
  // hook-kit effects (camera + overlays), built from C.fx / C.notifs / C.chapters / C.kit
  const HOOK = { at: -1, text: C.hook, top: C.hookTop ?? 138, size: C.hookSize || 104, accentColor: C.hookColor || S.color, out: C.heads?.length ? [C.heads[0].t - 0.2, C.heads[0].t] : null, width: 960 }
  const K = []   // [scene, cues]
  const RECS = []
  for (const f of C.fx || []) {
    if (f.kind === 'whip') { const o = { at: f.t, len: f.d || 0.45, from: f.from || 1.3, blur: f.blur ?? (f.t <= 0 ? 6 : 16), flash: f.flashA ?? 0.35 }; K.push([whipZoom(o), whipZoomCues(o)]) }
    if (f.kind === 'shake') { const o = { at: f.t, len: f.d || 0.5, amp: f.a || 26 }; K.push([screenShake(o), shakeCues(o)]) }
    if (f.kind === 'glitch') { const o = { at: f.t, len: f.d || 0.5, dialog: !!f.text, text: f.text, buttons: f.buttons || ['WAIT', 'CLOSE'], amp: f.amp || 1 }; K.push([glitch(o), glitchCues(o)]) }
    if (f.kind === 'freeze' || f.kind === 'scratch') { const o = { at: f.t, len: f.d || 1.4, caption: f.caption || 'yep. *that’s me.*', sub: f.sub || null, top: f.top ?? 1500 }; RECS.push(o); K.push([recordScratch(o), recordScratchCues(o)]) }
  }
  for (const n of C.notifs || []) { const o = { at: n.t, out: [n.t + (n.d || 2.2) - 0.25, n.t + (n.d || 2.2)], title: n.from, body: n.text, glyph: signStar(n.sign || 'leo').glyph, color: signStar(n.sign || 'leo').color, time: n.time || 'now', y: n.y ?? 110 }; K.push([notification(o), notificationCues(o)]) }
  for (const c of C.chapters || []) { const o = { at: c.t, out: [c.t + (c.d || 3) - 0.25, c.t + (c.d || 3)], n: c.n, title: c.text, x: c.x ?? 70, y: c.y ?? 392, color: c.color || GOLD }; K.push([chapter(o), chapterCues(o)]) }
  ;(C.heads || []).forEach((h, i) => {
    if (!h.slam) return
    const nx = C.heads[i + 1]
    const o = { at: h.t, text: h.text, top: h.top ?? 138, size: h.size || 100, accentColor: h.color || GOLD, out: nx ? [nx.t - 0.2, nx.t] : null, width: 960, gap: h.gap ?? 0.07 }
    K.push([slamTitle(o), slamTitleCues(o)])
  })
  for (const k of C.kit || []) {
    const M = { caught: [caught, caughtCues], countdown: [countdown, countdownCues], achievement: [achievement, achievementCues], call: [incomingCall, incomingCallCues], hud: [gameHud, gameHudCues], slam: [slamTitle, slamTitleCues] }[k.kind]
    K.push([M[0](k.o), M[1](k.o)])
  }
  const TITLE = C.title || `OVERTHINK.SIM — ${S.glyph}︎ ${NAME(SIGN)}.BRAIN`
  const LINES = SAYS.map(s => ({ t: s.t, speaker: s.who, text: s.text }))
  const SIGN_HOPS = [...talkHops(LINES, 'sign', { cps: 34 }), ...(C.hops || [])]
  const SUP_HOPS = talkHops(LINES, 'sup', { cps: 34 })
  const LOOP = false   // loops use the kit's loopBack (below)
  const loopK = t => LOOP ? ease.inOutCubic(prog(t, D - LOOP_LEN, D)) : 0

  function world(x, t, tr) {
    const te = storyT(t, FX), f = fxState(t, FX)
    const sk = { ...SKY_H, zoom: SKY_H.zoom + 0.04 * Math.sin(te * 0.4), dy: 10 * Math.sin(te * 0.3) }
    drawSky(x, te, sk)
    x.save()
    x.translate(540 + f.sx, 960 + f.sy); x.scale(f.zoom, f.zoom); x.translate(-540, -960)
    if (C.draw?.under) C.draw.under(x, te)
    // frame-0 chaos jitter of the window (and whenever the bar is in error)
    const err = (C.bar?.err || []).some(([a, b]) => te >= a && te < b)
    const jit = err ? Math.sin(te * 83) * 5 : 0
    x.save(); x.translate(jit, 0)
    if (!C.noWindow || te < C.noWindow[0] || te > C.noWindow[1]) {
      windowChrome(x, te, TITLE, { red: err ? 1 : 0 })
      x.save(); x.beginPath(); x.rect(CA.x - 6, CA.y - 6, CA.w + 12, CA.h + 12); x.clip()
      for (const p of C.panels || []) if (p.kind !== 'error') drawPanel(x, te, p)
      x.restore()
      for (const p of C.panels || []) if (p.kind === 'error') drawPanel(x, te, p)
      drawBar(x, te, C.bar, err ? 1 : 0)
    }
    x.restore()
    if (C.draw?.mid) C.draw.mid(x, te)
    // the sign + tech support
    if (!C.signOff || te < C.signOff[0] || te > C.signOff[1]) {
      const [, mood, look] = at(C.moods, te, [0, 'wide'])
      const sq = at(C.squash, te, [0, 0])[1]
      const tears = SIGN === 'pisces' ? Math.max(1, at(C.tears, te, [0, 1])[1]) : at(C.tears, te, [0, 0])[1]
      const P = { ...(C.signAt ? C.signAt(te) : SIGN_AT) }
      steam(x, te, P.x, P.y - P.s * 0.45, (C.steam || []).reduce((m, [a, b]) => Math.max(m, (a <= 0 ? (te >= a ? 1 : 0) : prog(te, a, a + 0.3)) * outK(te, b - 0.3, b)), 0))
      const pk = (C.panic || []).reduce((m, [a, b]) => Math.max(m, te >= a && te < b ? 1 : 0), 0)
      if (pk) { P.x += Math.sin(te * 61) * 9; for (let i = 0; i < 6; i++) { const a2 = -Math.PI / 2 + (i - 2.5) * 0.42, r0 = P.s * 0.62 + 10 * Math.sin(te * 20 + i), r1 = r0 + 46; x.fillStyle = i % 2 ? RED : GOLD; for (let q = 0; q < 5; q++) { const rr = lerp(r0, r1, q / 4); x.fillRect(Math.round(P.x + Math.cos(a2) * rr) - 6, Math.round(P.y - 20 + Math.sin(a2) * rr) - 6, 12, 12) } } }
      drawSign(x, te, SIGN, P, { mood, look, tears, hops: SIGN_HOPS, squash: sq, chip: true, seed: 3 })
    }
    if (!C.supOff && (!C.supHide || te < C.supHide[0] || te > C.supHide[1])) {
      const [, smood, slook] = at(C.sup?.moods, te, [0, 'wide'])
      const stears = at(C.sup?.tears, te, [0, 2])[1]
      drawSupport(x, te, C.supAt || SUP_AT, { mood: smood, look: slook, tears: stears, hops: SUP_HOPS })
    }
    // speech bubbles
    for (const s of SAYS) {
      const sup = s.who === 'sup', P = sup ? (C.supAt || SUP_AT) : SIGN_AT
      bubble(x, te, { t0: s.t, d: s.d || 2.2, text: s.text, cx: s.x ?? (sup ? 790 : 380), cy: s.y ?? (sup ? 1452 : 1400), size: 40, col: s.col || (sup ? '#cfe9ff' : BONE), tail: 'down', tailX: s.tailX ?? (sup ? 60 : -90), maxW: sup ? 380 : 520 })
      void P
    }
    if (C.draw?.over) C.draw.over(x, te)
    x.restore()
    return f
  }

  async function build(stage) {
    try { await Promise.all(["800 112px Inter", "700 30px Inter", "800 30px Inter", "italic 500 150px 'EB Garamond'", "700 30px 'Space Mono'", "700 52px 'Space Mono'"].map(ff => document.fonts.load(ff))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const wrap = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: '50% 45%' }, root)
    const cv = layerCanvas(wrap), x = cv.getContext('2d')
    const heads = [...(C.heads || [])]
    const HD = heads.map((h, i) => ({ h, slam: h.slam, end: heads[i + 1] ? heads[i + 1].t : (h.end ?? 1e9), P: popText(wrap, h.text, { top: h.top ?? 150, size: h.size || 88, accentSize: h.acc || (h.size || 88) * 1.28, at: h.t, gap: 0.06, accentColor: h.color || GOLD, fit: true }) }))
    const H0 = { P: null }
    const bug = buildBug(wrap)
    const top = layerCanvas(root), tx = top.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    void bug
    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        const lk = loopK(t)
        const f = world(x, t)
        if (lk > 0) { x.save(); x.globalAlpha = lk; world(x, 0); x.restore() }
        // RGB-split glitch slices
        if (f.glitch > 0 && lk < 0.5) {
          for (let i = 0; i < 7; i++) { const yy = Math.floor(hash(i + Math.floor(t * 24) * 7) * 1800), hh = 30 + hash(i * 3.3 + Math.floor(t * 24)) * 120, off = (hash(i * 9.1 + Math.floor(t * 24)) - 0.5) * 120 * f.glitch; x.drawImage(cv, 0, yy, W, hh, off, yy, W, hh) }
          x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.25 * f.glitch; x.fillStyle = '#ff2050'; x.fillRect(0, 0, W, H); x.restore()
        }
        const te = storyT(t, FX)
        // headlines (DOM); in the loop tail the hook comes back exactly as at frame 0
        for (const { h, end, P, slam } of HD) {
          if (slam) { P.update(-9, 0); continue }
          let o = 1
          if (te >= end) o = 0
          else if (end < 1e8) o = outK(te, end - 0.15, end)
          if (P === H0.P) { if (lk > 0) { P.update(0, 1); P.root.style.opacity = String(lk + (1 - lk) * (te < end ? 1 : 0)); continue } P.root.style.opacity = '1' }
          else if (lk > 0) o *= 1 - lk
          P.update(te, o)
        }
        wrap.style.transform = `translate(${(f.sx * 0).toFixed(1)}px,0) scale(${(lk > 0.5 ? 1 : f.zoom).toFixed(4)})`
        wrap.style.filter = (f.gray && lk < 0.5 ? 'grayscale(0.85) contrast(1.15) ' : '') + (f.blur > 0.3 && lk < 0.5 ? `blur(${f.blur.toFixed(1)}px)` : '') || 'none'
        // top layer
        tx.clearRect(0, 0, W, H)
        if (lk < 1) {
          tx.save(); tx.globalAlpha = 1 - lk
          for (const s of C.stamps || []) drawStamp(tx, te, s)
          drawPromise(tx, te, C.promise)
          if (C.draw?.top) C.draw.top(tx, te)
          if (f.scratch > 0) { tx.save(); tx.translate(540, 1060); tx.rotate(-0.08); tx.font = `800 64px ${INTER}`; tx.fillStyle = INK; tx.fillRect(-300, -52, 600, 104); tx.fillStyle = GOLD; tx.fillRect(-292, -44, 584, 88); tx.fillStyle = INK; tx.textAlign = 'center'; tx.textBaseline = 'middle'; tx.fillText(C.scratchText || '*record scratch*', 0, 4); tx.restore() }
          tx.restore()
        }
        if (lk > 0 && C.draw?.top) { tx.save(); tx.globalAlpha = lk; C.draw.top(tx, 0); tx.restore() }
        if (f.flash > 0 && lk < 0.5) { tx.save(); tx.globalAlpha = f.flash; tx.fillStyle = f.flashCol; tx.fillRect(0, 0, W, H); tx.restore() }
        drawGrain(gx, lk >= 0.999 ? 0 : t)
      },
    }
  }

  // ── sound
  const N = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const cues = []
  const bar = C.bar
  // frame 0: mid-chaos
  cues.push(['crash', 0, { gain: 0.07 }], ['chip', 0, 330, 0.35, { slide: -12, gain: 0.03 }], ['whoosh', 0, 0.3, 0.05])
  for (const f of []) {
    if (f.kind === 'whip') cues.push(['whoosh', f.t, 0.3, 0.07], ['pop', f.t + 0.1, 1318.51, 0.04, 0])
    if (f.kind === 'flash') cues.push(['pop', f.t, 1760, 0.05, 0], ['crash', f.t, { gain: 0.04, len: 1 }])
    if (f.kind === 'shake') cues.push(['tom', f.t, 90, { gain: 0.3, decay: 0.3 }], ['boom', f.t, 0.2])
    if (f.kind === 'glitch') cues.push(['chip', f.t, 660, 0.2, { slide: -18, gain: 0.03, wave: 'square' }], ['chip', f.t + 0.08, 990, 0.12, { slide: 12, gain: 0.02 }])
    if (f.kind === 'freeze' || f.kind === 'scratch') cues.push(['chip', f.t, 1500, 0.22, { slide: -30, gain: 0.04, wave: 'noise' }], ['whoosh', f.t, 0.25, 0.06], ['tick', f.t + 0.02, 0.08])
  }
  if (bar) {
    for (let i = 1; i < bar.keys.length; i++) {
      const [a, va] = bar.keys[i - 1], [b, vb] = bar.keys[i]
      if (vb > va) { for (let tt = a; tt < b; tt += 0.18) cues.push(['tick', +tt.toFixed(3), 0.018]); if (b - a > 0.8) cues.push(['riser', a, b, 0.025]) }
    }
    for (const [a] of bar.err || []) cues.push(['chip', a, 220, 0.18, { gain: 0.035, wave: 'square' }], ['chip', a + 0.22, 196, 0.25, { gain: 0.035, wave: 'square' }])
  }
  for (const p of C.panels || []) {
    cues.push(['whoosh', p.t0, 0.3, 0.035])
    if (p.kind === 'theory') { cues.push(['pop', p.t0 + 0.05, N[(p.n || 1) % 7], 0.035, 0]); if (!p.noDelete) { const dd = p.del ?? (p.t1 - 0.62); cues.push(['tom', dd, 110, { gain: 0.25, decay: 0.25 }], ['chip', dd, 520, 0.25, { slide: -14, gain: 0.03 }]) } }
    if (p.kind === 'error') cues.push(['chip', p.t0, 247, 0.16, { gain: 0.04, wave: 'square' }], ['chip', p.t0 + 0.2, 233, 0.3, { gain: 0.04, wave: 'square' }])
    if (p.kind === 'chat') { for (const m of p.msgs) if (m.at > p.t0 + 0.05 || m.at > 0.2) cues.push(['pop', m.at, m.side === 'R' ? 880 : 1174.66, 0.045, m.side === 'R' ? 0.25 : -0.25]); for (const [a, b] of p.typing || []) for (let tt = a; tt < b; tt += 0.3) cues.push(['tick', +tt.toFixed(3), 0.015]); if (p.seen) cues.push(['pluck', p.seen.at, 440, 0.03, 0.4, 0.2]) }
    if (p.kind === 'meter') cues.push(['riser', p.t0, Math.min(p.t1, p.t0 + 1.2), 0.02])
  }
  for (const s of C.stamps || []) cues.push(['tom', s.t, 100, { gain: 0.3, decay: 0.3 }], ['clap', s.t + 0.02, { gain: 0.15 }])
  if (C.promise) cues.push(['bell', C.promise.t, 1318.51, 0.03, 0.8, 0])
  for (const h of C.heads || []) cues.push(['pop', h.t, 987.77, 0.03, -0.2], ['pop', h.t + 0.12, 1174.66, 0.025, 0.2])
  cues.push(...talkCues(LINES, { cps: 34, pitch: { sign: 740, sup: 990 } }))
  if (LOOP) cues.push(['whoosh', D - LOOP_LEN, LOOP_LEN, 0.04])
  cues.push(...(C.cues || []))
  const CUES = cues.filter(c => typeof c[1] === 'number' ? c[1] >= 0 && c[1] < D : true).sort((a, b) => a[1] - b[1])

  const cuesDefault = id => ({ id, duration: D, music: { style: C.music.style, key: C.music.key, seed: C.music.seed, sections: { drop: C.music.drop ?? 1.2, ...(C.music.sections || {}), outroAt: D - (C.music.outro ?? 1.0) }, hits: C.music.hits || [] }, cues: CUES })
  const B = RECS.length ? frozen(build, RECS) : build
  const SCENES = [B, slamTitle(HOOK), ...K.map(k => k[0])]
  if (C.ending === 'loop') SCENES.push(loopBack([B, slamTitle(HOOK), ...(C.loopExtra || [])], { duration: D, len: LOOP_LEN }))
  const ALL = [...CUES, ...slamTitleCues(HOOK).filter(c => c[1] >= 0), ...K.flatMap(k => k[1]), ...(C.ending === 'loop' ? loopCues({ duration: D, len: LOOP_LEN }) : [])].filter(c => typeof c[1] !== 'number' || (c[1] >= 0 && c[1] < D)).sort((a, b) => a[1] - b[1])
  const cuesDefault2 = id => ({ ...cuesDefault(id), cues: ALL })
  return { DURATION: D, SCENES, CUES: ALL, cuesDefault: cuesDefault2, world }
}
export { drawBits, lineTimes, signStar, STAR, drawStarChar, drawPixelStar, easeOutBack, clamp, lerp, prog, ease }
