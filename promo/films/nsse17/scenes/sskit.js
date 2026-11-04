// sskit — SIGN × SIGN, Volume 2 (eps 17–32, batch b36): the shared look + the 30 s timeline. Imported by nsse17–nsse32.
// The look is the Vol. 1 field-guide notebook (sxsignscolib/notebook.js, copied here so the films don't import another
// show's folder): a spiral-bound graph-paper page over the nebula, sketched specimens with handwritten labels, three
// rubber-stamped TIPS, a PUSH | PULL | ALIGN meter along the bottom strip that wobbles and settles. New for Vol. 2: each
// tip pins one prop card (a pixel icon + a handwritten note) onto the page.
//
// makeFilm(cfg) → { DURATION, SCENES, CUES, MUSIC }. One episode = one config:
//   { id, ep, music: { style, key, seed },
//     A: { id: 'taurus', wants: 'a cozy night in', mood: 'happy' },  B: { … }      fig. 1 / fig. 2
//     title: 'Taurus × Pisces: | *movie night.*'                                    the hook headline (on frame 0)
//     hook: ['snacks: *ready.* blanket: ready.', "I'm crying. it's the *opening titles.*"]   A's line, then B's
//     note: null | 'both have saturn as a traditional ruler'                       a pencil note on the page (cold open)
//     pis: ['(unrelated)', '(taking notes)', '(so proud)']                         fig. 3's caption per act
//     tips: [ { who: 'B', head: 'Pisces, let Taurus | *comfort* you.', line: 'can I lean on you for *the sad part?*',
//               card: { icon: 'tissue', lines: ['tissues', '(restocked)'] } }, … × 3 ]   tips[2] is the twisted TIP 3 ↻
//     fig4: 'fig. 4 · cozy'                                                        the finale's red circle label
//     last: 'One blanket. | *Two* tissues.' }                                      the last line (kept exactly)
//   card lines: a string, or { t, strike, red, circle, size }.  `who` = whose line it is (the twist: either).
//
// Timeline (story 0–25.6, then the 4.4 s end card):
//   0.00–6.00  cold open: notebook up, headline + both stars on frame 0 (A mid-hop). A's line, B's line, the needle
//              slams to PUSH and thrashes, a synced squint (record scratch).
//   6.00 / 10.70 / 15.40   TIP 1 / TIP 2 / TIP 3 ↻ (4.7 s each): stamp, headline, prop card pinned, one line, a reaction
//              (the partner goes heart-eyed). TIP 3 slides the two stars together.
//   10.65      the card cut (the middle of three candidates; cardfx plays exactly one).
//   20.25–22.2 "Push. Pull. *Align.*": the needle sweeps and a red ring stamps ALIGN; the meter is gone by 22.25.
//   22.3–25.5  the last line: the pair side by side, heart-eyed, a red fig. 4 circle. Out by 25.5.
// Pisces cries in every film: fig. 3 in the page corner, or (when Pisces is in the pair) the specimen itself cries and
// fig. 3 is its tissue box. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const PAGE = { x0: 70, y0: 440, x1: 1010, y1: 1372 }
export const INK = '#2b2550', PENCIL = '#4a4470', RED = '#c8344c', GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1'
const SERIF = "'EB Garamond', Georgia, serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const G = 36, HALF = 18
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const NAME = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAG', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
const LABEL = { sagittarius: 'sagittarius' }
// name-tag / accent text colours (light enough for the dark dialogue box)
const TXT = { aries: '#ff8a7a', taurus: '#ffd27a', gemini: '#ffe98a', cancer: '#9fdcff', leo: '#ffb45c', virgo: '#ff9cc0', libra: '#f59cf0', scorpio: '#ff7f9c', sagittarius: '#c9a6ff', capricorn: '#7fe8c4', aquarius: '#7fd8ff', pisces: '#b4adff' }

// ─────────────────────────────────────────────── the notebook
export function drawNotebook(ctx, t, { k = 1, entry = 'No. 17', title = 'FIELD GUIDE' } = {}) {
  if (k <= 0) return
  const { x0, y0, x1, y1 } = PAGE, w = x1 - x0, h = y1 - y0
  const e = easeOutBack(clamp(k), 1.5)
  ctx.save()
  ctx.translate(540, y1 + (1 - clamp(k)) * 700); ctx.rotate(-0.012 + (1 - clamp(k)) * 0.12); ctx.scale(lerp(0.8, 1, e), e); ctx.translate(-540, -y1)
  ctx.globalAlpha *= clamp(k * 2)
  ctx.fillStyle = 'rgba(4,2,12,0.55)'; ctx.fillRect(x0 + 14, y0 + 22, w, h)
  ctx.fillStyle = '#3b2758'; ctx.fillRect(x0 - 10, y0 - 6, w + 22, h + 20)
  ctx.fillStyle = '#563a80'; ctx.fillRect(x0 - 10, y0 - 6, w + 22, 6)
  ctx.fillStyle = '#e2d6bb'; ctx.fillRect(x0 + 4, y0 + 6, w, h)
  ctx.fillStyle = '#f6edd6'; ctx.fillRect(x0, y0, w, h)
  ctx.fillStyle = 'rgba(88,122,178,0.16)'
  for (let gx = x0 + 34; gx < x1; gx += 38) ctx.fillRect(gx, y0 + 64, 2, h - 64)
  for (let gy = y0 + 64; gy < y1; gy += 38) ctx.fillRect(x0, gy, w, 2)
  ctx.fillStyle = 'rgba(214,72,92,0.45)'; ctx.fillRect(x0 + 72, y0 + 64, 3, h - 64)
  ctx.fillStyle = 'rgba(88,122,178,0.45)'; ctx.fillRect(x0, y0 + 62, w, 3)
  for (let rx = x0 + 40; rx < x1 - 20; rx += 56) {
    ctx.fillStyle = '#1b1236'; ctx.fillRect(rx + 4, y0 + 12, 14, 14)
    ctx.fillStyle = '#b9b4c8'; ctx.fillRect(rx, y0 - 14, 6, 30); ctx.fillRect(rx + 6, y0 - 20, 12, 6); ctx.fillRect(rx + 18, y0 - 14, 6, 14)
    ctx.fillStyle = '#ece8f4'; ctx.fillRect(rx, y0 - 14, 3, 22)
  }
  ctx.fillStyle = '#05040c'; ctx.beginPath(); ctx.moveTo(x1, y1 - 46); ctx.lineTo(x1, y1); ctx.lineTo(x1 - 46, y1); ctx.fill()
  ctx.fillStyle = '#d9cba9'; ctx.beginPath(); ctx.moveTo(x1, y1 - 46); ctx.lineTo(x1 - 46, y1 - 46); ctx.lineTo(x1 - 46, y1); ctx.fill()
  ctx.font = `700 24px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = rgba(INK, 0.75)
  ctx.fillText(`${title} · SIGN × SIGN`, x0 + 92, y0 + 40)
  ctx.font = `italic 600 34px ${SERIF}`; ctx.textAlign = 'right'; ctx.fillStyle = INK
  ctx.fillText(`entry ${entry}`, x1 - 30, y0 + 38)
  ctx.restore()
}

export function hand(ctx, text, x, y, { size = 40, color = INK, rot = 0, align = 'center', k = 1, weight = 600, alpha = 1 } = {}) {
  if (k <= 0 || alpha <= 0) return 0
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha *= alpha
  ctx.font = `italic ${weight} ${size}px ${SERIF}`; ctx.textAlign = align; ctx.textBaseline = 'middle'
  const tw = ctx.measureText(text).width, left = align === 'center' ? -tw / 2 : align === 'right' ? -tw : 0
  if (k < 1) { ctx.beginPath(); ctx.rect(left - 10, -size, (tw + 20) * k, size * 2); ctx.clip() }
  ctx.fillStyle = color; ctx.fillText(text, 0, 0)
  ctx.restore()
  return tw
}

export function sketchCircle(ctx, cx, cy, rx, ry, k, seed = 1, { color = PENCIL, width = 4, alpha = 0.8 } = {}) {
  if (k <= 0) return
  const r = rng(seed * 313), ph = [r() * 6, r() * 6, r() * 6], a0 = -2 + r()
  ctx.save(); ctx.strokeStyle = rgba(color, alpha); ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath()
  const N = 60, end = Math.round(N * clamp(k))
  for (let i = 0; i <= end; i++) {
    const u = i / N, a = a0 + u * Math.PI * 2 * 1.1
    const wob = 1 + 0.035 * Math.sin(a * 3 + ph[0]) + 0.02 * Math.sin(a * 7 + ph[1]) + u * 0.05
    const px = cx + Math.cos(a) * rx * wob, py = cy + Math.sin(a) * ry * wob
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
  }
  ctx.stroke(); ctx.restore()
}

// ─────────────────────────────────────────────── the PUSH | PULL | ALIGN meter
export const METER = { x: 540, y: 1300, w: 780, h: 40 }
export const ZONE = { push: 1 / 6, pull: 0.5, align: 5 / 6 }
export function needleWobble(t, base, amp, seed = 1) {
  return clamp(base + amp * (0.6 * Math.sin(t * 9.3 + seed) + 0.3 * Math.sin(t * 23.1 + seed * 2) + 0.25 * Math.sin(t * 4.1 + seed * 3)), 0.02, 0.98)
}
export function drawMeter(ctx, t, p, { k = 1, smoke = 0, stamp = 0 } = {}) {
  if (k <= 0.01) return
  const { x, y, w, h } = METER, l = x - w / 2
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.translate(-x, -y); ctx.globalAlpha *= clamp(k * 1.5)
  const zones = [['PUSH', READING.push], ['PULL', READING.pull], ['ALIGN', READING.align]]
  ctx.fillStyle = INK; ctx.fillRect(l - 6, y - h / 2 - 6, w + 12, h + 12)
  zones.forEach(([name, col], i) => {
    const zx = l + (w / 3) * i
    ctx.fillStyle = col; ctx.fillRect(zx, y - h / 2, w / 3, h)
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(zx, y - h / 2, w / 3, 6)
    if (i) { ctx.fillStyle = INK; ctx.fillRect(zx - 3, y - h / 2, 6, h) }
    const lit = Math.abs(p - (i + 0.5) / 3) < 1 / 6
    ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = INK; ctx.globalAlpha = (lit ? 1 : 0.55) * clamp(k * 1.5)
    ctx.fillText(name, zx + w / 6, y + 1)
    ctx.globalAlpha = clamp(k * 1.5)
  })
  const nx = Math.round(l + w * clamp(p)), P = 6
  ctx.fillStyle = INK
  for (let j = 0; j < 5; j++) ctx.fillRect(nx - (5 - j) * P / 2 - P / 2, y - h / 2 - 50 + j * P, (5 - j) * P + P, P)
  ctx.fillRect(nx - 3, y - h / 2 - 22, 6, h + 28)
  ctx.fillStyle = '#ff5c6e'; ctx.fillRect(nx - 9, y - h / 2 - 50, 18, 6)
  ctx.restore()
  if (smoke > 0) drawSmoke(ctx, t, nx, y - h / 2 - 56, smoke)
  if (stamp > 0) {
    const s = lerp(2.2, 1, ease.inQuad(clamp(stamp))), cx = l + w * ZONE.align, cy = y
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.08); ctx.scale(s, s); ctx.globalAlpha *= clamp(stamp * 1.4) * k
    ctx.strokeStyle = RED; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(0, 0, w / 6 + 26, h / 2 + 24, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, w / 6 + 16, h / 2 + 15, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.restore()
  }
}
export function drawSmoke(ctx, t, x, y, amount = 1) {
  for (let i = 0; i < 7; i++) {
    const ph = (t * 1.1 + i / 7) % 1, a = Math.sin(Math.PI * ph) * 0.75 * amount
    if (a <= 0.02) continue
    const s = Math.round(10 + ph * 22), sx = x + Math.sin(ph * 5 + i * 2) * 26 + (i % 2 ? 10 : -10), sy = y - ph * 150
    ctx.fillStyle = rgba(i % 3 ? '#8d87a3' : '#b9b4c8', a)
    ctx.fillRect(Math.round(sx - s / 2), Math.round(sy - s / 2), s, s)
    ctx.fillRect(Math.round(sx - s / 2 + s * 0.6), Math.round(sy - s * 0.9), Math.round(s * 0.7), Math.round(s * 0.7))
  }
}

// ─────────────────────────────────────────────── the TIP stamp
export function tipStamp(ctx, t, n, at, { x = 220, y = 585, out = 1, color = RED, twist = false } = {}) {
  if (t < at - 0.12 || out <= 0) return
  const sp = prog(t, at - 0.12, at)
  const s = lerp(2.4, 1, ease.inQuad(sp)) * (1 + 0.08 * Math.exp(-Math.max(0, t - at) * 12) * Math.sin(Math.max(0, t - at) * 40))
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.1); ctx.scale(s, s); ctx.globalAlpha *= clamp(sp * 1.3) * out
  const w = twist ? 270 : 210, h = 90
  ctx.strokeStyle = color; ctx.lineWidth = 8; ctx.strokeRect(-w / 2, -h / 2, w, h)
  ctx.lineWidth = 3; ctx.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20)
  ctx.font = `800 54px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = color
  ctx.fillText(twist ? `TIP ${n} ↻` : `TIP ${n}`, 0, 4)
  ctx.fillStyle = '#f6edd6'
  const r = rng(n * 71)
  for (let i = 0; i < 16; i++) ctx.fillRect(Math.round(-w / 2 + r() * w), Math.round(-h / 2 + r() * h), 4, 4)
  ctx.restore()
  const d = t - at
  if (d > 0 && d < 0.5) for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2, rr = 110 + d * 240
    ctx.fillStyle = rgba('#8d87a3', 0.6 * (1 - d / 0.5)); ctx.fillRect(Math.round(x + Math.cos(a) * rr * 1.3), Math.round(y + Math.sin(a) * rr * 0.6), 10, 10)
  }
}

// ─────────────────────────────────────────────── the show bug (DOM, top-left, 56 px from the edges)
export function showBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.16em',
    color: GOLD, textShadow: '0 2px 10px rgba(6,4,18,0.85)', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 5 }, root)
  b.textContent = 'sign × sign'
  return b
}

// ─────────────────────────────────────────────── small effects
export const BM = s => s.trim().split(/\s+/)
export function bmp(ctx, rows, x, y, px, pal, alpha = 1) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  rows.forEach((row, j) => [...row].forEach((ch, i) => { const c = pal[ch]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } }))
  ctx.restore()
}
const HEART = BM(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
export function drawHearts(ctx, t, t0, x, y, { n = 6, px = 7, spread = 140, life = 1.6, cols = ['#ff5c8a', '#ff8fb1', '#f2c75c'], alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const k = (t - t0 - i * 0.18) / life
    if (k < 0 || k > 1) continue
    const hx = x + (((i * 53) % 7) / 6 - 0.5) * spread + Math.sin(k * 6 + i) * 12
    bmp(ctx, HEART, hx - 3.5 * px, y - k * 260, px, { X: cols[i % cols.length] }, alpha * Math.sin(Math.PI * k))
  }
}
export function drawTears(ctx, t, ex, ey, dx, px, { amount = 1, seed = 1, fountain = true } = {}) {
  if (amount <= 0) return
  const r = rng(seed * 991), N = fountain ? 7 : 4
  for (const side of [-1, 1]) for (let k = 0; k < N; k++) {
    const ph = ((t * (fountain ? 1.5 : 0.8)) + k / N + r() * 0.05) % 1
    const vx = fountain ? (60 + 30 * ((k * 7) % 3)) : 10, vy = fountain ? -120 : 0
    const gx = ex + side * dx + side * vx * ph * px / 8, gy = ey + px * 2 + vy * ph * px / 8 + 380 * ph * ph * px / 8
    ctx.save(); ctx.globalAlpha *= amount * (1 - ph * 0.7)
    ctx.fillStyle = '#5fc4f0'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), px, px * 2)
    ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(gx - px / 2), Math.round(gy - px), Math.ceil(px / 2), Math.ceil(px / 2))
    ctx.restore()
  }
}
export function eyesOf(r) { const cell = r.size / G; return { ex: r.x, ey: r.y + (19.2 - HALF) * cell, dx: 4.6 * cell, px: Math.max(4, Math.round(cell)) } }
const DROP = BM(`..X.. .XWX. XWWXX XWXXX .XXX.`)
export function drawSweat(ctx, t, x, y, px, alpha = 1) {
  const ph = (t * 1.2) % 1
  bmp(ctx, DROP, x, y + ph * px * 6, px, { X: '#5fc4f0', W: '#ffffff' }, alpha * (1 - ph * 0.6))
}
export function sparkBurst(ctx, t, cx, cy, t0, { n = 12, R = 200, size = 28, seed = 1, cols = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'], life = 0.8 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed, rr = R * (0.45 + 0.75 * p) * (i % 2 ? 0.8 : 1)
    drawPixelStar(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, size * (1 - 0.45 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── prop icons (pixel bitmaps, 12 × 12-ish; '.' = clear)
const K = '#2b2550'
export const ICONS = {
  heart: [BM(`.XX..XX. XWXXXXXX XXXXXXXX XXXXXXXX .XXXXXX. ..XXXX.. ...XX...`), { X: '#ff5c8a', W: '#ffd0dc' }],
  clock: [BM(`..KKKK.. .KWWWWK. KWWKWWWK KWWKWWWK KWWKKKWK KWWWWWWK .KWWWWK. ..KKKK..`), { K, W: '#fffaf0' }],
  phone: [BM(`KKKKKK KBBBBK KBWWBK KBBBBK KBWWBK KBBBBK KBBBBK KKWWKK KKKKKK`), { K, B: '#7fd0ff', W: '#ffffff' }],
  calendar: [BM(`.R..R.. KKKKKKK KRRRRRK KWWWWWK KWKWKWK KWWWWWK KWKWRWK KKKKKKK`), { K, R: '#c8344c', W: '#fffaf0' }],
  check: [BM(`KKKKKKK KWWWWWK KWWWWGK KGWWGWK KWGGWWK KWWGWWK KKKKKKK`), { K, W: '#fffaf0', G: '#3aa860' }],
  lock: [BM(`..KKK.. .K...K. .K...K. KKKKKKK KGGGGGK KGGKGGK KGGKGGK KGGGGGK KKKKKKK`), { K, G: '#f2c75c' }],
  open: [BM(`..KKK.. .K...K. .K..... .K..... KKKKKKK KGGGGGK KGGKGGK KGGGGGK KKKKKKK`), { K, G: '#f2c75c' }],
  envelope: [BM(`KKKKKKKKK KWKWWWKWK KWWKWKWWK KWWWKWWWK KWWWWWWWK KKKKKKKKK`), { K, W: '#fffaf0' }],
  camera: [BM(`..KKK.... KKKKKKKKK KGGKKKGGK KGKWWWKGK KGKWBWKGK KGKWWWKGK KGGKKKGGK KKKKKKKKK`), { K, G: '#8d87a3', W: '#cfe8ff', B: '#2b2550' }],
  photo: [BM(`KKKKKKKK KWWWWWWK KBBBBBBK KBYBBPBK KBYYBPPK KBBBBBBK KWWWWWWK KWWWWWWK KKKKKKKK`), { K, W: '#fffaf0', B: '#9fd8ff', Y: '#f39a3a', P: '#3fb6f0' }],
  blur: [BM(`KKKKKKKK KWWWWWWK KBYBPBBK KYYPPBYK KBYPBYYK KBBBBBBK KWWWWWWK KWWWWWWK KKKKKKKK`), { K, W: '#fffaf0', B: '#b9d9f0', Y: '#f2b07a', P: '#9fc8f0' }],
  boot: [BM(`.KKKK... .KBBK... .KBBK... .KBBK... .KBBKKK. KBBBBBBK KKKKKKKK`), { K, B: '#b5763a' }],
  scale: [BM(`...KK... KKKKKKKK .K.KK.K. KGK.KGK. KKK.KKK. ...KK... .KKKKKK.`), { K, G: '#f2c75c' }],
  mug: [BM(`.S.S.. ..S.S. KKKKK. KCCCKK KCCCK.K KCCCKK KCCCK. .KKK..`), { K, C: '#b5763a', S: '#cfc9de' }],
  bench: [BM(`KKKKKKKKK KBBBBBBBK KKKKKKKKK KBBBBBBBK KKKKKKKKK .K.....K. .K.....K.`), { K, B: '#b5763a' }],
  count: [BM(`KKKKKKKK KWWKKWWK KWKWWKWK KWWWKWWK KWWKWWWK KWKKKKWK KWWWWWWK KKKKKKKK`), { K, W: '#fffaf0' }],
  blueprint: [BM(`KKKKKKKKK KBBBBBBBK KBWWWBBBK KBWBWBWBK KBWWWBWBK KBBBBBWBK KBWWWWWBK KKKKKKKKK`), { K, B: '#3a78c8', W: '#cfe8ff' }],
  carrot: [BM(`....GG. ...GG.. ..OO... .OOO... .OO.... OO..... O......`), { G: '#5cbf4a', O: '#f08a2a' }],
  snowman: [BM(`...KK... ..KKKK.. ..WWWW.. ..WKWK.. ..WWOW.. .RRRRRR. .WWWWWW. WWWKWWWW WWWWWWWW .WWWWWW.`), { K, W: '#ffffff', O: '#f08a2a', R: '#c8344c' }],
  snowbot: [BM(`...Y.... ...K.... ..WWWW.. ..WBWB.. ..WWOW.. .RRRRRR. .WWWWWW. WWKWWKWW WWWWWWWW .WWWWWW.`), { K, W: '#ffffff', O: '#f08a2a', R: '#c8344c', B: '#38c4ec', Y: '#f2c75c' }],
  blanket: [BM(`KKKKKKKKK KRWRWRWRK KWRWRWRWK KRWRWRWRK KWRWRWRWK KKKKKKKKK`), { K, R: '#e86a7a', W: '#fff1c8' }],
  cushion: [BM(`.KKKKKK. KGGGGGGK KGGWGGGK KGGGGGGK KGGGGWGK .KKKKKK.`), { K, G: '#a35cf0', W: '#d6b9ff' }],
  speech: [BM(`KKKKKKKKK KWWWWWWWK KWKKWKKWK KWWWWWWWK KKKWWKKKK ...KWK... ....K....`), { K, W: '#fffaf0' }],
  joke: [BM(`KKKKKKKK KYYYYYYK KYKYYKYK KYYYYYYK KYKYYKYK KYYKKYYK KYYYYYYK KKKKKKKK`), { K, Y: '#ffe27a' }],
  timer: [BM(`KKKKKKK .KWWWK. ..KSK.. ...K... ..KWK.. .KSSSK. KKKKKKK`), { K, W: '#fffaf0', S: '#f2c75c' }],
  gift: [BM(`.R...R. ..R.R.. KKKKKKK KBBRBBK KBBRBBK KRRRRRK KBBRBBK KKKKKKK`), { K, B: '#3fb6f0', R: '#f2c75c' }],
  lumpy: [BM(`..R.R.... ...R..... .KKKKK... KBBRBBKK. KBBRBBBBK .KRRRRRBK KBBRBKKK. .KKKK....`), { K, B: '#e163d6', R: '#f2c75c' }],
  ruler: [BM(`KKKKKKKKKK KYKYKYKYKK KYYYYYYYYK KKKKKKKKKK`), { K, Y: '#f2c75c' }],
  hat: [BM(`...Y... ...K... ..KPK.. ..PYP.. .KPPPK. .PYPYP. KPPPPPK KKKKKKK`), { K, P: '#ff8fb1', Y: '#f2c75c' }],
  snow: [BM(`...W... .W.W.W. ..WWW.. WWWWWWW ..WWW.. .W.W.W. ...W...`), { W: '#5fa8e0' }],
  prints: [BM(`KK...KK. KK...KK. ........ ..KK...KK ..KK...KK ......... KK...KK. KK...KK.`), { K: '#6a6890' }],
  box: [BM(`KKKKKKKK KBBBBBBK KKKKKKKK KBBBBBBK KBBKKBBK KBBBBBBK KKKKKKKK`), { K, B: '#b5763a' }],
  jar: [BM(`.KKKKK. ..KKK.. .KWWWK. KWRWYWK KWYWRWK KWRWPWK KWWWWWK .KKKKK.`), { K, W: '#e8f4ff', R: '#ff8fb1', Y: '#f2c75c', P: '#7fd0ff' }],
  banner: [BM(`K.......K KRRRRRRRK KRWRWRWRK KRRRRRRRK .KRRRRRK. ..KR.RK.. ...K.K...`), { K, R: '#38c4ec', W: '#ffffff' }],
  list: [BM(`KKKKKKK KWWWWWK KGWKKWK KWWWWWK KGWKKWK KWWWWWK KWWKKWK KKKKKKK`), { K, W: '#fffaf0', G: '#3aa860' }],
  lights: [BM(`K..K..K..K KKKKKKKKKK .R..Y..G.. .R..Y..G.. ..........`), { K, R: '#ff5c6e', Y: '#f2c75c', G: '#5cdc8a' }],
  trophy: [BM(`KKKKKKK KYYYYYK YKYYYKY .KYYYK. ..KYK.. ...K... ..KKK.. .KKKKK.`), { K, Y: '#f2c75c' }],
  tree: [BM(`...Y... ..GGG.. .GRGGG. ..GGG.. .GGGYG. GGRGGGG ...K... ..KKK..`), { K, G: '#2fa060', R: '#ff5c6e', Y: '#f2c75c' }],
  tree2: [BM(`.Y...Y. ..GGG.. .GRGGG. ..GGG.. .GGGYG. GGRGGGG ...K... ..KKK..`), { K, G: '#2fa060', R: '#ff5c6e', Y: '#f2c75c' }],
  keys: [BM(`.KKK..... K...K.... K...KKKKK K...K.K.K .KKK..... `), { K: '#c9a24a' }],
  map: [BM(`KKKKKKKKK KGGWGGGWK KGWGGWGGK KWGGGGWGK KGGWWGGRK KGWGGGRRK KKKKKKKKK`), { K, G: '#9fd88a', W: '#fffaf0', R: '#c8344c' }],
  popcorn: [BM(`.W.WW.W. WWWWWWWW .WYWWYW. KRWRWRWK KRWRWRWK .RWRWRW. .RWRWRW.`), { K, W: '#fffaf0', Y: '#f4c542', R: '#d8392f' }],
  tissue: [BM(`...WW... ..WWWW.. KKKKKKKK KBBBBBBK KBWBWBBK KBBBBBBK KKKKKKKK`), { K, W: '#ffffff', B: '#9fd8ff' }],
  bulb: [BM(`..KKK.. .KYYYK. KYYWYYK KYYYYYK .KYYYK. ..KKK.. ..KKK..`), { K, Y: '#ffe27a', W: '#ffffff' }],
  star: [BM(`...Y... ..YYY.. YYYYYYY .YYYYY. .YY.YY. Y.....Y`), { Y: '#f2c75c' }],
}
export function drawIcon(ctx, name, cx, cy, px, alpha = 1) {
  const ic = ICONS[name]
  if (!ic) return
  const [rows, pal] = ic, w = Math.max(...rows.map(r => r.length)), h = rows.length
  bmp(ctx, rows, cx - (w * px) / 2, cy - (h * px) / 2, px, pal, alpha)
}

// ─────────────────────────────────────────────── the prop card (an index card taped onto the page)
export const CARD = { cx: 572, cy: 692, w: 452, h: 220 }
/** k = pin-in (0 → 1, slaps down with a little rotation), out = 1 → 0; lines: string | { t, strike, red, circle } */
export function drawPropCard(ctx, t, { icon, lines = [], at, out = 1, seed = 1, icon2 = null }) {
  if (t < at || out <= 0) return
  const k = easeOutBack(prog(t, at, at + 0.36), 1.7)
  const { cx, cy, w, h } = CARD
  const r = rng(seed * 17), rot = (r() - 0.5) * 0.08
  ctx.save(); ctx.translate(cx, cy - (1 - k) * 60); ctx.rotate(rot + (1 - k) * 0.25); ctx.scale(lerp(1.25, 1, k) * out, lerp(1.25, 1, k) * out)
  ctx.globalAlpha *= clamp(prog(t, at, at + 0.12) * 1.5) * clamp(out * 1.5)
  ctx.fillStyle = 'rgba(30,20,60,0.25)'; ctx.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  ctx.fillStyle = '#fffdf6'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = 'rgba(88,122,178,0.25)'
  for (let y = -h / 2 + 52; y < h / 2 - 10; y += 40) ctx.fillRect(-w / 2 + 12, y, w - 24, 2)
  ctx.fillStyle = 'rgba(214,72,92,0.5)'; ctx.fillRect(-w / 2 + 12, -h / 2 + 42, w - 24, 2)
  // washi tape
  ctx.save(); ctx.rotate(-0.06); ctx.fillStyle = 'rgba(255,143,177,0.7)'; ctx.fillRect(-58, -h / 2 - 18, 116, 34); ctx.restore()
  // icon on the left, the note on the right
  const ix = -w / 2 + 74
  drawIcon(ctx, icon, ix, 8, 9)
  if (icon2) drawIcon(ctx, icon2, ix + 40, 40, 6)
  const lx = -w / 2 + 146, n = lines.length
  lines.forEach((L, i) => {
    const o = typeof L === 'string' ? { t: L } : L
    const y = (i - (n - 1) / 2) * 50 + 8
    const lk = prog(t, at + 0.25 + i * 0.28, at + 0.6 + i * 0.28)
    const size = o.size || (n > 2 ? 34 : 38)
    const tw = hand(ctx, o.t, lx, y, { size, align: 'left', color: o.red ? RED : INK, k: lk })
    if (o.strike && t > at + 0.75 + i * 0.28) { const sk = prog(t, at + 0.75 + i * 0.28, at + 1.0 + i * 0.28); ctx.fillStyle = RED; ctx.fillRect(lx - 4, y - 2, (tw + 8) * sk, 4) }
    if (o.circle && t > at + 0.8 + i * 0.28) sketchCircle(ctx, lx + tw / 2, y, tw / 2 + 18, size * 0.62, prog(t, at + 0.8 + i * 0.28, at + 1.15 + i * 0.28), 5 + i, { color: RED, width: 4 })
  })
  ctx.restore()
}

// ─────────────────────────────────────────────── the episode
export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, [a, b]) => t >= a && t < b
const CPS = 30
const TIP0 = [6.0, 10.7, 15.4], TIPLEN = 4.7

export function makeFilm(cfg) {
  const { ep, A: Acfg, B: Bcfg } = cfg
  const SA = signStar(Acfg.id), SB = signStar(Bcfg.id), PIS = signStar('pisces')
  const tagOf = c => `${signStar(c.id).glyph} ${NAME[c.id]}`
  const A_TAG = tagOf(Acfg), B_TAG = tagOf(Bcfg)
  const pisWho = Acfg.id === 'pisces' ? 'A' : Bcfg.id === 'pisces' ? 'B' : null
  const T = {
    black: [0, 0.0001],
    h0Out: [5.8, 6.0], a1: 0.4, b1: 2.6, push: 1.5, squint: 4.95, thrash: [4.85, 5.9], close0: 5.85, noteAt: 1.6,
    tips: TIP0.map((s, i) => ({ s, stamp: s + 0.12, head: s + 0.15, land: s + 0.55, card: s + 0.45, line: s + 0.95, close: s + 4.45, out: [s + 4.5, s + 4.7], twist: i === 2 })),
    together: [15.55, 16.0],
    swP: 20.3, swU: 20.75, swA: 21.2, h5Out: [22.0, 22.2], meterOut: [21.95, 22.25],
    hug: [22.2, 22.6], h6: 22.3, fig4: 22.55, out: [25.1, 25.5],
  }
  const tp = T.tips
  const LINES0 = [
    { t: T.a1, speaker: A_TAG, color: TXT[Acfg.id], text: cfg.hook[0] },
    { t: T.b1, speaker: B_TAG, color: TXT[Bcfg.id], text: cfg.hook[1] },
  ]
  const TIPLINES = cfg.tips.map((tip, i) => {
    const c = tip.who === 'A' ? Acfg : Bcfg
    return [{ t: tp[i].line, speaker: tagOf(c), color: TXT[c.id], text: tip.line }]
  })
  const ALL = [...LINES0, ...TIPLINES.flat()]
  const LT0 = lineTimes(LINES0, { cps: CPS }), LTT = TIPLINES.map(L => lineTimes(L, { cps: CPS })[0])
  T.push = LT0[0].done + 0.1
  const doneOf = i => LTT[i].done

  // layout
  const A_HOME = { x: 262, y: 985, s: 290 }, B_HOME = { x: 818, y: 985, s: 290 }
  const A_TOG = { x: 350, y: 985 }, B_TOG = { x: 730, y: 985 }
  const A_HUG = { x: 425, y: 985 }, B_HUG = { x: 655, y: 985 }
  const PIS_P = { x: 905, y: 572, s: 108 }

  const reacts = cfg.tips.map((tip, i) => doneOf(i) + 0.12)
  const A_HOPS = [-0.18, ...talkHops(ALL, A_TAG, { cps: CPS }), ...cfg.tips.map((tip, i) => tip.who !== 'A' ? reacts[i] : null).filter(v => v != null), T.together[0] + 0.1, T.swA + 0.1, T.hug[1], T.hug[1] + 0.56]
  const B_HOPS = [0.1, ...talkHops(ALL, B_TAG, { cps: CPS }), ...cfg.tips.map((tip, i) => tip.who !== 'B' ? reacts[i] : null).filter(v => v != null), T.together[0] + 0.15, T.swA + 0.15, T.hug[1] + 0.05, T.hug[1] + 0.61]
  if (pisWho === 'A') A_HOPS.shift()

  // the needle: [t, base, amp] keys, sprung between
  const NEEDLE = [
    [0, 0.42, 0.14], [T.push, ZONE.push, 0.05], [T.thrash[0], 0.4, 0.34], [T.thrash[1], 0.28, 0.08],
    [reacts[0], 0.4, 0.05], [tp[1].s, 0.36, 0.1], [reacts[1], ZONE.pull, 0.04], [tp[2].s, 0.52, 0.18], [reacts[2], 0.62, 0.05],
    [T.swP, ZONE.push, 0.01], [T.swU, ZONE.pull, 0.01], [T.swA, ZONE.align, 0.004],
  ]
  function needle(t) {
    let i = 0
    for (let j = 0; j < NEEDLE.length; j++) if (t >= NEEDLE[j][0]) i = j
    const cur = NEEDLE[i], prev = NEEDLE[Math.max(0, i - 1)]
    const e = i === 0 ? 1 : ease.spring(prog(t, cur[0], cur[0] + 0.55), 0.22)
    const amp = lerp(prev[2], cur[2], prog(t, cur[0], cur[0] + 0.3))
    return needleWobble(t, lerp(prev[1], cur[1], e), amp, 3)
  }

  function pos(t, side) {
    const H = side === 'A' ? A_HOME : B_HOME, TG = side === 'A' ? A_TOG : B_TOG, HG = side === 'A' ? A_HUG : B_HUG
    if (t < T.together[0]) {
      // the hook lean: A leans in on its line, B leans back on the squint
      const lean = side === 'A' ? 26 * ease.spring(prog(t, T.a1, T.a1 + 0.4), 0.2) * (1 - prog(t, T.squint, T.close0)) : 0
      return { x: H.x + lean, y: H.y }
    }
    if (t < T.hug[0]) { const e = ease.spring(prog(t, ...T.together), 0.22); return { x: lerp(H.x, TG.x, e), y: H.y } }
    const e = ease.spring(prog(t, ...T.hug), 0.2)
    return { x: lerp(TG.x, HG.x, e), y: H.y - Math.sin(Math.PI * prog(t, ...T.hug)) * 40 }
  }

  // moods: the hook (cfg.A.mood / cfg.B.mood), a double-take at each stamp, the speaker happy, the partner heart-eyed
  function state(t, side) {
    const me = side === 'A' ? Acfg : Bcfg, other = side === 'A' ? 'B' : 'A'
    const st = { mood: me.mood || 'happy', look: side === 'A' ? [1, 0] : [-1, 0], blink: undefined, squash: 0, sweat: 0 }
    const myLine = side === 'A' ? LT0[0] : LT0[1], theirLine = side === 'A' ? LT0[1] : LT0[0]
    if (t < tp[0].s) {
      if (t >= theirLine.start && t < theirLine.done + 0.3) { st.mood = me.react || 'wide'; st.sweat = me.sweat ? 1 : 0 }
      if (t >= myLine.start && t < myLine.done) st.mood = me.mood || 'happy'
      if (t >= T.squint) { st.mood = 'squint'; st.squash = 0.12 * Math.exp(-(t - T.squint) * 5); st.look = undefined }
      return st
    }
    for (let i = 2; i >= 0; i--) {
      const P = tp[i]
      if (t < P.s) continue
      if (i === 2 && t >= T.swP) break
      if (t < P.s + 0.55) { st.mood = 'wide'; st.look = [side === 'A' ? -1 : -1, -1]; return st }
      const tip = cfg.tips[i], speaker = tip.who === side
      if (speaker) {
        if (t < P.line) st.mood = tip.think?.[side] || 'neutral'
        else if (t < doneOf(i)) st.mood = 'happy'
        else st.mood = tip.after?.[side] || (P.twist ? 'sparkle' : 'happy')
      } else {
        if (t < P.line) st.mood = tip.think?.[side] || 'neutral'
        else if (t < doneOf(i)) st.mood = tip.listen?.[side] || 'neutral'
        else st.mood = tip.after?.[side] || 'heart'
      }
      st.look = side === 'A' ? [1, 0] : [-1, 0]
      void other
      return st
    }
    if (t < T.hug[0]) { st.mood = t < T.swA + 0.1 ? 'wide' : 'happy'; st.look = [side === 'A' ? 1 : -1, 1]; return st }
    st.mood = 'heart'; return st
  }

  const MUSIC = { style: cfg.music.style, key: cfg.music.key, seed: cfg.music.seed ?? (500 + ep), sections: { drop: T.b1, breakdown: [tp[2].s], lift: [T.swP], outroAt: DURATION - 4.4 }, hits: [T.swA] }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 54px Inter", "800 30px Inter", "italic 500 150px 'EB Garamond'", "italic 600 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')

    const H0 = popText(root, cfg.title, { top: 168, size: 92, accentSize: 124, at: -1.2, gap: 0.05, wobble: true, accentColor: GOLD, fit: true })
    const HT = cfg.tips.map((tip, i) => {
      const c = tip.who === 'A' ? Acfg : Bcfg
      return popText(root, tip.head, { top: 168, size: 92, accentSize: 120, at: tp[i].head, gap: 0.07, late: 1, lateAt: tp[i].land, wobble: true, accentColor: i === 2 ? GOLD : TXT[c.id], fit: true })
    })
    const H5 = popText(root, 'Push. Pull. *Align.*', { top: 230, size: 108, accentSize: 146, at: T.swP, gap: T.swU - T.swP, late: 1, lateAt: T.swA, wobble: true, accentColor: GOLD, fit: true })
    const H6 = popText(root, cfg.last, { top: 160, size: 100, accentSize: 140, at: T.h6 + 0.18, gap: 0.09, wobble: true, accentColor: GOLD, fit: true })
    const HEADS = [[H0, T.h0Out], ...HT.map((h, i) => [h, tp[i].out]), [H5, T.h5Out], [H6, T.out]]
    const BOX = { y: 1450, width: 960, height: 290, cps: CPS }
    const box0 = dialogueBox(root, { lines: LINES0, ...BOX, open: 0.2, close: T.close0 })
    const boxes = TIPLINES.map((L, i) => dialogueBox(root, { lines: L, ...BOX, close: tp[i].close }))
    showBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function sketches(t, o) {
      if (o <= 0) return
      x.save(); x.globalAlpha *= clamp(o)
      const cOut = 1 - prog(t, T.together[0] - 0.2, T.together[0] + 0.1)
      sketchCircle(x, A_HOME.x, A_HOME.y - 6, 178, 172, cOut, 2)
      sketchCircle(x, B_HOME.x, B_HOME.y - 6, 178, 172, cOut, 5)
      const nm = c => `${LABEL[c.id] || c.id}`
      hand(x, `fig. 1 · ${nm(Acfg)}`, A_HOME.x, 1196, { size: 38, alpha: cOut })
      hand(x, `wants: ${Acfg.wants}`, A_HOME.x, 1238, { size: 30, color: RED, alpha: cOut })
      hand(x, `fig. 2 · ${nm(Bcfg)}`, B_HOME.x, 1196, { size: 38, alpha: cOut })
      hand(x, `wants: ${Bcfg.wants}`, B_HOME.x, 1238, { size: 30, color: RED, alpha: cOut })
      // fig. 3
      const act = t < tp[0].s ? 0 : t < T.hug[0] ? 1 : 2
      const ck = act === 0 ? 1 : act === 1 ? prog(t, tp[0].s + 0.6, tp[0].s + 1.1) : prog(t, T.hug[0], T.hug[0] + 0.5)
      hand(x, pisWho ? 'fig. 3 · tissues' : 'fig. 3 · pisces', PIS_P.x, 650, { size: 26 })
      hand(x, cfg.pis[act], PIS_P.x, 680, { size: 25, k: ck, color: RED })
      // the cold open's pencil note (a fact, or a stage direction)
      if (cfg.note && t < tp[0].s + 0.2) hand(x, cfg.note, 540, 700, { size: 32, k: prog(t, T.noteAt, T.noteAt + 0.8), alpha: 1 - prog(t, tp[0].s - 0.2, tp[0].s + 0.2), rot: -0.03, color: PENCIL })
      // fig. 4
      if (t > T.hug[0]) {
        sketchCircle(x, 540, 975, 300, 190, prog(t, T.fig4, T.fig4 + 0.5), 9, { color: RED })
        hand(x, cfg.fig4, 540, 1218, { size: 42, color: RED, k: prog(t, T.fig4 + 0.2, T.fig4 + 0.7) })
      }
      x.restore()
    }

    function fig3(t, o) {
      if (pisWho) {
        // the tissue box (Pisces is a specimen; it does the crying)
        const k = clamp(o)
        const pull = Math.abs(Math.sin(t * 2.2)) > 0.92 ? 1 : 0
        drawIcon(x, 'tissue', PIS_P.x, PIS_P.y + 10 - pull * 4, 11, k)
        return
      }
      let mood = 'happy'
      if (inR(t, [tp[0].s, T.swP])) mood = 'wide'
      if (t >= T.swA) mood = 'sparkle'
      if (t >= T.hug[0]) mood = 'heart'
      const r = drawStarChar(x, PIS_P.x, PIS_P.y, PIS_P.s, t, { color: PIS.color, glyph: PIS.glyph, mood, look: [-1, 1], seed: 17, glow: 0.3, alpha: clamp(o),
        hops: [-0.3, reacts[0] + 0.1, reacts[1] + 0.1, reacts[2] + 0.1, T.swA + 0.2, T.hug[1] + 0.1] })
      const e = eyesOf(r)
      drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: clamp(o), seed: 4, fountain: t > reacts[0] || t < tp[0].s })
    }

    function star(t, side, o) {
      const c = side === 'A' ? Acfg : Bcfg, S = side === 'A' ? SA : SB, H = side === 'A' ? A_HOME : B_HOME
      const p = pos(t, side), st = state(t, side)
      const r = drawStarChar(x, p.x, p.y, H.s, t, { color: S.color, glyph: S.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash,
        hops: side === 'A' ? A_HOPS : B_HOPS, seed: side === 'A' ? 3 : 8, glow: 0.35, alpha: clamp(o) })
      if (st.sweat && o > 0.5) drawSweat(x, t, r.x + 110, r.y - 140, 8)
      const cries = pisWho === side || cfg.tips.some((tip, i) => tip.tears?.[side] && t > doneOf(i) - 0.3 && (i === 2 || t < tp[i].out[1])) || (cfg.tearsEnd?.[side] && t > T.hug[0])
      if (cries) { const e = eyesOf(r); drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: clamp(o), seed: side === 'A' ? 6 : 7, fountain: true }) }
      if (st.mood === 'heart') {
        const t0 = t >= T.hug[0] ? T.hug[1] : reacts[[2, 1, 0].find(i => t >= reacts[i]) ?? 0]
        drawHearts(x, t, t0, r.x, r.y - 120, { n: 5, px: 7, spread: 120, alpha: clamp(o) })
      }
      void c
      return r
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const o = popOut(t, T.out)
        // camera shake on each stamp
        let shake = 0
        for (const P of tp) { const d = t - P.stamp; if (d > 0 && d < 0.35) shake += 9 * Math.exp(-d * 11) * Math.sin(d * 55) }
        x.save(); x.translate(0, shake)
        if (o > 0) {
          drawNotebook(x, t, { k: clamp(o), entry: `No. ${ep}` })
          sketches(t, o)
          fig3(t, o)
          // the prop cards
          cfg.tips.forEach((tip, i) => drawPropCard(x, t, { ...tip.card, at: tp[i].card, out: outK(t, [tp[i].out[0] - 0.1, tp[i].out[1]]), seed: ep * 3 + i }))
          const ra = star(t, 'A', o), rb = star(t, 'B', o)
          // each reaction: a little spark burst over the partner
          cfg.tips.forEach((tip, i) => { const pr = tip.who === 'A' ? rb : ra; sparkBurst(x, t, pr.x, pr.y - 60, reacts[i], { n: 10, R: 170, size: 22, seed: i + 1 }) })
          // the meter (gone by 22.25: no "Align" on screen in the last 3 s of the story)
          const mk = outK(t, T.meterOut)
          drawMeter(x, t, needle(t), { k: mk, smoke: inR(t, T.thrash) ? 1 - prog(t, T.thrash[1] - 0.3, T.thrash[1]) : 0, stamp: prog(t, T.swA + 0.05, T.swA + 0.2) })
          if (t > T.swA && t < T.swA + 0.9) sparkBurst(x, t, 540 + 390 * (ZONE.align * 2 - 1), 1300, T.swA + 0.05, { n: 10, R: 160, size: 22, seed: 6 })
          tp.forEach((P, i) => tipStamp(x, t, i + 1, P.stamp, { out: outK(t, P.out), twist: P.twist }))
          if (t > T.hug[1]) drawHearts(x, t, T.hug[1] + 0.1, 540, 820, { n: 8, px: 7, spread: 300, alpha: clamp(o) })
        }
        x.restore()
        box0.update(t); boxes.forEach(b => b.update(t))
        for (const [h, ok] of HEADS) h.update(t, outK(t, ok))
        drawGrain(gx, t)
      },
    }
  }

  // card-cut candidates: cardfx keeps the middle one (10.65, between TIP 1 and TIP 2)
  const CUTS = [5.95, { t: 10.65, kind: 'flip' }, 15.35]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pop / pluck / bell are re-keyed by the engine)
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const r3 = v => +v.toFixed(3)
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const land = (t, f = 1046.5) => [['pop', r3(t), f, 0.05, 0], ['pluck', r3(t), f, 0.04, 0.6, 0]]
  const chip = (t, f, len, o = {}) => ['chip', r3(t), f, len, { gain: 0.05, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.7, rev: 0.12, dly: 0.1, bus: 'lead', ...o }]
  const scratch = t => [chip(t, 1800, 0.11, { wave: 'noise', slide: 40, gain: 0.07, bus: 'drums', decay: 0.05, sustain: 0.8, rev: 0.05, dly: 0 }), chip(t + 0.11, 4200, 0.2, { wave: 'noise', slide: -70, gain: 0.08, bus: 'drums', decay: 0.1, sustain: 0.6, rev: 0.08, dly: 0 }), ['tick', r3(t), 0.06]]
  const stampHit = t => [['boom', r3(t), 0.2], ['tom', r3(t), 70, { gain: 0.22, decay: 0.3, rev: 0.15 }], ['tick', r3(t), 0.07]]
  const flutter = (t0, n, gap, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', r3(t0 + i * gap), gain * (1 - i / n * 0.5)])
  const pitch = { [A_TAG]: 440, [B_TAG]: 880 }
  if (A_TAG === B_TAG) pitch[B_TAG] = 660
  const CUES = [
    // cold open
    ['pop', 0.12, 880, 0.03, -0.3], ['pop', T.push, 392, 0.05, -0.2], ['tom', T.push, 90, { gain: 0.18, decay: 0.25, rev: 0.15 }],
    ...(cfg.note ? flutter(T.noteAt, 9, 0.07, 0.018) : []),
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.thrash[0] + 0.05 + i * 0.12), 0.03]),
    ...scratch(T.squint), ['pop', T.squint + 0.05, 330, 0.04, -0.3], ['pop', T.squint + 0.1, 330, 0.04, 0.3],
    // the tips
    ...tp.flatMap((P, i) => [
      ...stampHit(P.stamp), ...wordPops(P.head, 3, 0.07, i + 1), ...land(P.land),
      ['whoosh', r3(P.card - 0.05), 0.3, 0.025], ['pop', r3(P.card + 0.3), 783.99, 0.035, 0.1], ...flutter(P.card + 0.3, 8, 0.07, 0.016),
      ['bell', r3(reacts[i]), [1318.51, 1567.98, 1760][i], 0.035, 1.2, i === 0 ? 0.3 : -0.3], ['glitter', r3(reacts[i]), r3(reacts[i] + 0.5)],
      ['pluck', r3(reacts[i] + 0.1), [1046.5, 1174.66, 1318.51][i], 0.035, 0.5, 0],
    ]),
    ['whoosh', T.together[0], 0.35, 0.03],
    // the sweep
    ['whoosh', T.swP - 0.1, 0.4, 0.03],
    ['pluck', T.swP, 783.99, 0.04, 0.4, -0.4], ['pluck', T.swU, 987.77, 0.04, 0.4, 0], ['pluck', T.swA, 1174.66, 0.05, 0.8, 0.4],
    ...stampHit(T.swA + 0.1), ['glitter', T.swA + 0.1, T.swA + 0.7], ['bell', T.swA + 0.15, 1567.98, 0.035, 1.6, 0.3],
    // the last line
    ['whoosh', T.hug[0], 0.35, 0.03], ...flutter(T.fig4, 8, 0.06, 0.02),
    ...wordPops(T.h6 + 0.18, 3, 0.09, 0, 0.028), ['pluck', T.h6 + 0.2, 1318.51, 0.045, 0.8, 0], ['glitter', T.hug[1] + 0.1, T.hug[1] + 0.6],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...talkCues(ALL, { cps: CPS, pitch }),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, MUSIC }
}
