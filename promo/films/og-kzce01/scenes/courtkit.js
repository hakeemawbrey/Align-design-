// ZODIAC COURTROOM kit (Month 2 boost, batch m06, kzce01–kzce20). Owned by the m06 session; other films import it
// read-only. One engine, makeCourt(cfg), builds a whole episode from a declarative config: the court set on the night
// sky (THE STARS as judge in a curled wig, a gavel, a jury box with ♓ Pisces crying, the dock), headlines, dialogue,
// exhibits in evidence bags, a slammed verdict stamp, the sentence slip, the court ticker, chapter stickers and the
// camera tricks (whip zoom, freeze + record scratch, colour flash, shake). No end card, no card cut, no logo.
// Everything is a pure f(t); DOM / canvases are only made in build (nothing touches `document` at module top level).
//
//   makeCourt(cfg) → { DURATION, SCENES, CUES }
//   cfg: {
//     id, dur, ending: 'cut' | 'loop', loopLen (0.4),
//     judge: { mood(t), look(t), hops[] },             THE STARS, always on the bench unless hidden(t)
//     gavels: [t…]                                     slam times (frame 0: pass ~0.05 for a mid-slam thumbnail)
//     dock: [{ from, to, who, plate, mood(t), look(t), hops[], prop(x, t, P) }]   who = sign id | 'ex' | { color, glyph, tag }
//     jury: [sign ids] (≤ 6, put 'pisces' in), juryMood(t, id) → mood | undefined, gasps: [t…], tears(t) → 0…3 (Pisces)
//     heads: [{ text, at, out: [a, b], top, size, accent, late, lateAt, wobble }]
//     boxes: [{ open, close, lines: [{ t, who, text }] }]   who: 'JUDGE' | sign id | 'ex' | custom tag string
//     exhibits: [{ at, out: [a, b], label, draw(x, t, k, B) }]   B = { cx, cy, w, h } of the bag interior
//     stamps: [{ at, text, color, out: [a, b], y }]    sentence: { at, out, text }
//     ticker: { at, out, label, text }                 chapters: [{ at, out, text }] (long films)
//     hook: slamTitle opts (hookkit) for the frame-0 hook line, e.g. { at: -1, text, out }
//     fx: { whips: [t | whipZoom opts], recs: [recordScratch opts], shakes: [screenShake opts], flashes: [[t, colour]] }
//     kit: [extra hookkit scene builders], kitCues: [their cues]
//     back(x, t, tv) / front(x, t, tv) / over(x, t, tv): custom drawing (behind the cast / over the cast / over all)
//     cues: [] extra sound cues, music: { style, key, seed, sections, hits }
//   }
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, drawBits, sparkles, pop01, outK, popOut } from '../../sxmail1/scenes/mail.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, frozen, loopBack, loopCues, chapter, chapterCues, screenShake, shakeCues, caught, caughtCues } from '../../hookkit.js'
export { caught, caughtCues }

export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawBits, sparkles, pop01, outK, popOut, starFrame, inSprite, tearsCells }

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#e8344e', GREEN = '#4fd18b', PINK = '#ff8fb1'
export const WOOD = { d: '#3d2418', m: '#6b3f27', l: '#93603c', h: '#b9824f' }
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const EX = { color: '#a9a3c9', glyph: null, tag: 'THE EX', tagColor: '#cfc9ee' }

export const R = (x, c, X, Y, w, h) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** a chunky pixel block with an ink outline, a top highlight and a bottom shade */
export function box(x, X, Y, w, h, col, { b = 6, hi = 'rgba(255,255,255,0.18)', lo = 'rgba(0,0,0,0.22)' } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b)
  R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(4, b))
  if (lo) R(x, lo, X, Y + h - Math.max(4, b), w, Math.max(4, b))
}
/** canvas text with an ink drop */
export function label(x, text, cx, cy, { size = 40, col = BONE, font = INTER, weight = 800, rot = 0, align = 'center', alpha = 1, spacing = 0, shadow = true } = {}) {
  if (alpha <= 0.01 || size <= 1) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (spacing) x.letterSpacing = spacing + 'px'
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 0, size * 0.08) }
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** wrapped canvas text, centred; returns the number of rows */
export function wrapText(x, text, cx, cy, maxW, { size = 40, col = INK, font = INTER, weight = 800, lh = 1.15 } = {}) {
  x.save(); x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col
  const rows = []; let cur = ''
  for (const part of text.split('|')) {
    for (const w of part.trim().split(/\s+/)) { const tr = cur ? cur + ' ' + w : w; if (x.measureText(tr).width > maxW && cur) { rows.push(cur); cur = w } else cur = tr }
    rows.push(cur); cur = ''
  }
  rows.forEach((r, i) => x.fillText(r, cx, cy + (i - (rows.length - 1) / 2) * size * lh))
  x.restore(); return rows.length
}

// ─────────────────────────────────────────────── cast helpers
export const who = id => {
  if (id === 'ex') return { color: EX.color, glyph: null, tag: EX.tag, tagColor: EX.tagColor }
  if (id === 'JUDGE') return { color: STAR.sky, glyph: null, tag: 'THE JUDGE', tagColor: GOLD }
  if (typeof id === 'object') return id
  const s = signStar(id), name = id.toUpperCase()
  return { color: s.color, glyph: s.glyph, tag: `${s.glyph}︎ ${name}`, tagColor: s.color }
}
/** a star (sign / ex / judge) with optional tears 0…3 */
export function star(x, t, P, o = {}) {
  const W = who(o.who || 'JUDGE')
  const opts = { color: W.color, glyph: P.s >= 150 ? W.glyph : null, mood: o.mood || 'neutral', look: o.look, hops: o.hops, seed: o.seed ?? 3, pop: P.pop ?? 1, alpha: P.alpha ?? 1, glow: o.glow ?? 1, blink: o.blink, squash: o.squash || 0 }
  if (opts.pop <= 0.01 || opts.alpha <= 0.01) return null
  drawStarChar(x, P.x, P.y, P.s, t, opts)
  const F = starFrame(P.x, P.y, P.s, t, opts)
  if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
  return F
}
/** the judge's powdered wig, seated on the sprite (cells) */
export function wig(x, F) {
  inSprite(x, F, () => {
    const W = '#f7f3ea', S = '#cfc6b4'
    const cap = [[13, 1, 10, 3], [11, 3, 14, 2], [9, 5, 18, 2]]
    for (const [i, j, w, h] of cap) { x.fillStyle = INK; x.fillRect(i - 0.5, j - 0.5, w + 1, h + 1) }
    for (const [i, j, w, h] of cap) { x.fillStyle = W; x.fillRect(i, j, w, h) }
    // the curls: two columns of rolls down each side of the head
    for (const d of [-1, 1]) for (let k = 0; k < 3; k++) {
      const cx = d < 0 ? 8.2 - k * 0.6 : 27.8 + k * 0.6, cy = 7.6 + k * 2.6
      x.fillStyle = INK; x.fillRect(cx - 2, cy - 1.4, 4, 2.8)
      x.fillStyle = W; x.fillRect(cx - 1.5, cy - 1, 3, 2)
      x.fillStyle = S; x.fillRect(cx - 1.5, cy + 0.4, 3, 0.6)
    }
    x.fillStyle = S; for (let i = 0; i < 4; i++) x.fillRect(12 + i * 3.4, 4.2, 1.4, 0.6)
  })
}
/** the gavel angle for slams at times[] (0 = struck down, −1.15 = raised). Raised before the first slam. */
export function gavelAngle(t, slams) {
  let last = -1e9
  for (const s of slams) if (s <= t + 0.12 && s > last) last = s
  const UP = -1.15
  if (last < -1e8) return UP
  const d = t - last
  if (d < 0) return lerp(UP, 0, ease.inCubic(clamp((d + 0.12) / 0.12)))        // the swing down
  if (d < 0.22) return -0.12 * Math.sin(d * 28) * Math.exp(-d * 12)              // bounce on the block
  return lerp(0, UP, ease.inOutCubic(clamp((d - 0.35) / 0.55)))                 // back up
}
export function drawGavel(x, t, px, py, slams, { s = 1, alpha = 1 } = {}) {
  const a = gavelAngle(t, slams)
  x.save(); x.globalAlpha *= alpha; x.translate(px, py); x.scale(s, s); x.rotate(a)
  // the handle runs right from the hand; the head sits at the end, vertical
  box(x, 0, -8, 120, 16, WOOD.l, { b: 5 })
  box(x, 112, -40, 42, 80, WOOD.m, { b: 6 })
  R(x, GOLD, 112, -24, 42, 8); R(x, GOLD, 112, 16, 42, 8)
  x.restore()
  // the impact rays
  let last = -1e9; for (const sl of slams) if (sl <= t && sl > last) last = sl
  const d = t - last
  if (d >= 0 && d < 0.3) {
    const k = 1 - d / 0.3, hx = px + 135 * s, hy = py + 46 * s
    x.save(); x.globalAlpha *= alpha * k
    for (let i = 0; i < 7; i++) {
      const an = Math.PI + (i / 6) * Math.PI, r0 = 40 + 90 * (1 - k), r1 = r0 + 40 + 30 * k
      x.strokeStyle = i % 2 ? GOLD : BONE; x.lineWidth = 8; x.beginPath()
      x.moveTo(hx + Math.cos(an) * r0, hy + Math.sin(an) * r0 * 0.7); x.lineTo(hx + Math.cos(an) * r1, hy + Math.sin(an) * r1 * 0.7); x.stroke()
    }
    x.restore()
  }
}
/** pixel scales of justice (the bench emblem) */
const SCALES = ['......G......', '.....GGG.....', 'GGGGGGGGGGGGG', 'G.....G.....G', 'G.....G.....G', '.G....G....G.', 'GGG...G...GGG', '......G......', '....GGGGG....']
export function drawBench(x, t, { cx = 540, top = 700, w = 600, h = 210, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  box(x, cx - w / 2 - 20, top - 26, w + 40, 30, WOOD.h, { b: 6 })
  box(x, cx - w / 2, top, w, h, WOOD.m, { b: 6 })
  for (let i = 0; i < 3; i++) { const pw = (w - 80) / 3, px = cx - w / 2 + 20 + i * (pw + 20); box(x, px, top + 28, pw, h - 56, WOOD.l, { b: 4, hi: 'rgba(255,240,210,0.16)' }) }
  drawBits(x, SCALES, { G: GOLD }, cx, top + h / 2, 7)
  x.restore()
}
export function drawBlock(x, bx, by) { box(x, bx - 34, by - 14, 68, 18, WOOD.d, { b: 4 }) }

/** the jury box (right): back row then front row, then the rail */
export const JURY_POS = [[725, 1010, 100], [860, 1000, 100], [990, 1010, 100], [712, 1105, 140], [860, 1112, 118], [995, 1112, 118]]
export function drawJuryBox(x, t, members, { mood, gasps = [], tears, allTears, alpha = 1, dx = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha
  let gaspK = 0
  for (const g of gasps) { const d = t - g; if (d >= 0 && d < 0.9) gaspK = Math.max(gaspK, 1 - d / 0.9) }
  members.forEach((id, i) => {
    if (!id) return
    const [px, py, ps] = JURY_POS[i] || JURY_POS[0]
    const m = (mood && mood(t, id)) || (gaspK > 0.15 ? 'wide' : id === 'pisces' ? 'sparkle' : 'neutral')
    const lift = gaspK > 0 ? -18 * Math.sin(Math.PI * Math.min(1, (1 - gaspK) * 2.2)) * (i % 2 ? 1 : 0.8) : 0
    star(x, t, { x: px + dx, y: py + lift, s: ps }, { who: id, mood: m, look: m === 'wide' ? [-1, -0.4] : undefined, seed: 11 + i * 3, glow: 0.8, tears: id === 'pisces' ? (tears ? tears(t) : 3) : (allTears ? allTears(t, id) : 0), blink: m === 'wide' ? false : undefined })
  })
  box(x, 630 + dx, 1180, 430, 120, WOOD.m, { b: 6 })
  for (let i = 0; i < 4; i++) R(x, WOOD.l, 650 + dx + i * 104, 1196, 84, 88)
  label(x, 'JURY', 845 + dx, 1240, { size: 34, col: GOLD, font: MONO, weight: 700, spacing: 8 })
  x.restore()
}
/** the dock (left): a rail with a plate (DEFENDANT / WITNESS) */
export function drawDockRail(x, plate, { alpha = 1, dx = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha
  box(x, 40 + dx, 1190, 480, 110, WOOD.m, { b: 6 })
  for (let i = 0; i < 4; i++) R(x, WOOD.l, 58 + dx + i * 116, 1206, 96, 78)
  box(x, 120 + dx, 1215, 320, 56, '#d9b25e', { b: 4 })
  label(x, plate, 280 + dx, 1244, { size: 30, col: INK, font: MONO, weight: 700, spacing: 6, shadow: false })
  x.restore()
}

/** an evidence bag: clear plastic, a red zip, a tag; content drawn by fn(B) */
export function drawBag(x, t, cx, cy, w, h, k, tag, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.03 * Math.sin(t * 1.3))
  x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillRect(-w / 2 + 16, -h / 2 + 20, w, h)
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  R(x, '#1d1640', -w / 2, -h / 2, w, h)
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2 + 34, w, h - 34); x.clip()
  fn && fn({ cx: 0, cy: 17, w: w - 40, h: h - 74 })
  x.restore()
  // plastic sheen
  x.fillStyle = 'rgba(220,235,255,0.10)'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(-w / 2 + 20, -h / 2 + 50, 12, h - 120); x.fillRect(-w / 2 + 40, -h / 2 + 50, 5, h * 0.4)
  R(x, RED, -w / 2, -h / 2, w, 26); R(x, '#ff6b7f', -w / 2, -h / 2, w, 6)
  for (let i = 0; i < w / 18; i++) R(x, '#a01c30', -w / 2 + i * 18 + 4, -h / 2 + 12, 9, 6)
  // the tag
  x.rotate(-0.08)
  box(x, -w / 2 - 30, -h / 2 - 54, 300, 62, BONE, { b: 5, hi: null })
  label(x, tag, -w / 2 + 120, -h / 2 - 23, { size: 34, col: RED, font: MONO, weight: 700, spacing: 4, shadow: false })
  x.restore()
}
/** the verdict stamp: slams from big to size at t0 (returns its shake in px) */
export function drawStamp(x, t, t0, text, col, { cx = 540, cy = 880, size = 150, rot = -0.1, out = null, sub = null } = {}) {
  const d = t - t0
  if (d < 0) return 0
  const k = out ? outK(t, out) : 1
  if (k <= 0.01) return 0
  const sc = d < 0.12 ? lerp(3, 1, ease.inCubic(d / 0.12)) : 1 + 0.06 * Math.exp(-(d - 0.12) * 9) * Math.cos((d - 0.12) * 30)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc * k, sc * k); x.globalAlpha *= clamp(d / 0.06)
  x.font = `900 ${size}px ${INTER}`; x.letterSpacing = '6px'
  const tw = x.measureText(text).width, bw = tw + 90, bh = size * 1.18 + (sub ? 60 : 0)
  x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillRect(-bw / 2 + 14, -bh / 2 + 16, bw, bh)
  x.fillStyle = 'rgba(255,248,236,0.94)'; x.fillRect(-bw / 2, -bh / 2, bw, bh)
  x.strokeStyle = col; x.lineWidth = 14; x.strokeRect(-bw / 2 + 12, -bh / 2 + 12, bw - 24, bh - 24)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, sub ? -26 : 6)
  if (sub) { x.font = `700 40px ${MONO}`; x.letterSpacing = '4px'; x.fillText(sub, 0, bh / 2 - 58) }
  // ink speckle
  x.fillStyle = 'rgba(255,248,236,0.9)'; for (let i = 0; i < 26; i++) x.fillRect(-bw / 2 + 30 + ((i * 97) % (bw - 60)), -bh / 2 + 24 + ((i * 53) % (bh - 48)), 7, 5)
  x.restore()
  return d < 0.4 ? 22 * Math.exp(-d * 9) * Math.sin(d * 70) : 0
}
/** the sentence slip: "SENTENCED TO:" + text */
export function drawSentence(x, t, t0, text, { cx = 540, cy = 1130, w = 820, out = null, head = 'SENTENCED TO:' } = {}) {
  const k = easeOutBack(prog(t, t0, t0 + 0.4), 1.6) * (out ? outK(t, out) : 1)
  if (k <= 0.01) return
  const h = 210
  x.save(); x.translate(cx, cy + (1 - k) * 200); x.rotate(0.03); x.globalAlpha *= clamp(k * 2)
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-w / 2 + 14, -h / 2 + 16, w, h)
  box(x, -w / 2, -h / 2, w, h, '#f4e8cc', { b: 6, hi: null })
  for (let i = 0; i < 4; i++) R(x, 'rgba(120,150,200,0.25)', -w / 2 + 30, -h / 2 + 74 + i * 34, w - 60, 3)
  label(x, head, 0, -h / 2 + 40, { size: 32, col: RED, font: MONO, weight: 700, spacing: 6, shadow: false })
  wrapText(x, text, 0, 22, w - 80, { size: 50, col: INK })
  x.restore()
}

/** a phone chat inside a box B: msgs [{ at, side: 'L'|'R'|'C', text, meta, col }] pop in; title on top */
export function drawChat(x, t, B, { title = '', msgs = [], size = 34, typing = null } = {}) {
  const w = Math.min(B.w, 600), h = B.h, X = B.cx - w / 2, Y = B.cy - h / 2
  box(x, X, Y, w, h, '#2a2148', { b: 7 })
  R(x, '#120d26', X + 14, Y + 70, w - 28, h - 84)
  label(x, title, B.cx, Y + 36, { size: 30, col: BONE, font: MONO, weight: 700 })
  x.save(); x.font = `700 ${size}px ${INTER}`
  const shown = msgs.filter(m => t >= m.at)
  let y = Y + 100
  const lay = shown.map(m => {
    const maxW = w - 150, words = m.text.split(' '), rows = []; let cur = ''
    for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr).width > maxW && cur) { rows.push(cur); cur = wd } else cur = tr }
    rows.push(cur)
    const bw = Math.max(...rows.map(r => x.measureText(r).width)) + 44, bh = rows.length * size * 1.2 + 26 + (m.meta ? 34 : 0)
    return { m, rows, bw, bh }
  })
  const total = lay.reduce((a, l) => a + l.bh + 18, 0)
  const scroll = Math.max(0, total - (h - 130))
  x.beginPath(); x.rect(X + 14, Y + 70, w - 28, h - 84); x.clip()
  y -= scroll
  for (const l of lay) {
    const k = easeOutBack(prog(t, l.m.at, l.m.at + 0.25), 2)
    const right = l.m.side === 'R', centre = l.m.side === 'C'
    const bx = centre ? B.cx - l.bw / 2 : right ? X + w - 30 - l.bw : X + 30
    const col = l.m.col || (centre ? '#3a2f66' : right ? '#7fd0ff' : '#efe6d6')
    x.save(); x.translate(bx + (right ? l.bw : 0), y); x.scale(k, k); x.translate(-(right ? l.bw : 0), 0)
    R(x, INK, -4, -4, l.bw + 8, l.bh - (l.m.meta ? 34 : 0) + 8)
    R(x, col, 0, 0, l.bw, l.bh - (l.m.meta ? 34 : 0))
    x.fillStyle = centre ? BONE : INK; x.textAlign = 'left'; x.textBaseline = 'top'; x.font = `700 ${size}px ${INTER}`
    l.rows.forEach((r, i) => x.fillText(r, 22, 14 + i * size * 1.2))
    if (l.m.meta) { x.font = `700 24px ${MONO}`; x.fillStyle = l.m.metaCol || '#9fe6b0'; x.textAlign = right ? 'right' : 'left'; x.fillText(l.m.meta, right ? l.bw : 4, l.bh - 28) }
    x.restore()
    y += l.bh + 18
  }
  if (typing && t >= typing[0] && t < typing[1]) {
    R(x, INK, X + 26, y - 4, 128, 64); R(x, '#efe6d6', X + 30, y, 120, 56)
    for (let i = 0; i < 3; i++) { const b = Math.abs(Math.sin(t * 8 + i)); R(x, '#6a6488', X + 50 + i * 30, y + 20 - b * 8, 16, 16) }
  }
  x.restore()
}

// ─────────────────────────────────────────────── DOM pieces
/** the series bug, top-left: a pixel gavel + ZODIAC COURTROOM (Inter 800 small caps, letter-spaced) */
const GAVEL_ICON = ['..WWW.....', '..WWWW....', '...WWWW...', '....WWWH..', '.....HHH..', '......HHH.', '.......HHH', '........HH', 'BBBBBB....', 'BBBBBB....']
export function buildBug(root, { at = -1 } = {}) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '48px', height: '48px', imageRendering: 'pixelated' }, b)
  ic.width = 48; ic.height = 48
  drawBits(ic.getContext('2d'), GAVEL_ICON, { W: '#b9824f', H: '#e2b86a', B: GOLD }, 24, 24, 4)
  el('div', { font: `800 28px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.22em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, b, 'Zodiac Courtroom')
  return {
    update(t, out = 1) {
      const k = (at < 0 ? 1 : pop01(t, at, 0.36, 2.2)) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
      b.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}
/** the court ticker along the bottom: red label + scrolling text */
export function buildTicker(root, { label: lab = 'CHARGE', text, at, out, y = 1726 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: y + 'px', width: '1080px', height: '70px', display: 'none', overflow: 'hidden', background: 'rgba(14,8,32,0.92)', borderTop: `4px solid ${GOLD}`, borderBottom: `4px solid ${INK}` }, root)
  const tag = el('div', { position: 'absolute', left: '0', top: '0', height: '70px', padding: '0 26px', display: 'flex', alignItems: 'center', background: RED, color: '#fff', font: `800 30px ${INTER}`, letterSpacing: '0.16em', zIndex: 2, boxShadow: '8px 0 16px rgba(6,4,18,0.8)' }, wrap, lab)
  const run = el('div', { position: 'absolute', left: '0', top: '0', height: '70px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', color: BONE, font: `700 32px ${MONO}`, letterSpacing: '0.04em' }, wrap, `${text} &nbsp;•&nbsp; ${text} &nbsp;•&nbsp; ${text} &nbsp;•&nbsp; ${text}`)
  void tag
  let cyc = 0
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      const k = ease.outCubic(prog(t, at, at + 0.3)) * outK(t, out)
      wrap.style.transform = `translateY(${((1 - k) * 90).toFixed(1)}px)`
      if (!cyc) cyc = (run.scrollWidth || run.offsetWidth || 4000) / 4
      const dx = (t - at) * 150, x0 = 260 - (dx > 260 ? 260 + ((dx - 260) % cyc) : dx)
      run.style.transform = `translateX(${x0.toFixed(1)}px)`
    },
  }
}
/** a chapter sticker (long films): a tilted gold sticker that slaps on top-right under the bug */
export function buildChapter(root, { text, n, at, out }) {
  const s = el('div', { position: 'absolute', right: '48px', top: '118px', padding: '10px 22px', display: 'none', background: GOLD, color: INK, font: `800 30px ${INTER}`, letterSpacing: '0.12em', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, transformOrigin: '100% 0%', whiteSpace: 'nowrap' }, root,
    `<span style="font:700 24px ${MONO};letter-spacing:0.08em;opacity:0.7">CH.${n}&nbsp;</span>${text}`)
  return {
    update(t) {
      const on = t >= at && t < out[1]
      s.style.display = on ? 'block' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.3), 2.6) * outK(t, out)
      s.style.transform = `rotate(${(4 - 10 * (1 - k)).toFixed(2)}deg) scale(${(0.4 + 0.6 * k).toFixed(3)})`
      s.style.opacity = String(clamp(k * 3))
    },
  }
}

// ─────────────────────────────────────────────── camera + time
export function shakeFrom(t, times, amp = 16) {
  let s = 0
  for (const g of times) { const d = t - g; if (d >= 0 && d < 0.45) s += amp * Math.exp(-d * 9) * Math.sin(d * 62) }
  return s
}
/** time remap for freeze frames: [[a, b]] holds the picture at a until b */
export function remap(t, freezes = []) {
  for (const [a, b] of freezes) if (t >= a && t < b) return a
  return t
}

// ─────────────────────────────────────────────── sound helpers
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const gavelCues = (t, g = 1) => [['tom', t, 88, { gain: 0.34 * g, decay: 0.28 }], ['tick', t, 0.09 * g], ['tick', t + 0.07, 0.04 * g], ['boom', t, 0.14 * g]]
export const gaspCues = t => [['whoosh', t, 0.3, 0.05], ['pop', t + 0.02, 1318.51, 0.03, 0.4], ['pop', t + 0.06, 1567.98, 0.025, 0.5]]
export const stampCues = t => [['boom', t + 0.1, 0.32], ['tom', t + 0.1, 70, { gain: 0.36, decay: 0.4 }], ['tick', t + 0.1, 0.1], ['bell', t + 0.2, 1760, 0.03, 1.1, 0], ['glitter', t + 0.15, t + 0.6]]
export const whipCues = t => [['whoosh', t, 0.32, 0.06]]
export const scratchCues = t => [['tapeStop', t, 0.28], ['tick', t, 0.06], ['tick', t + 0.05, 0.05], ['tick', t + 0.1, 0.04]]
export const popWords = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, i % 2 ? 0.15 : -0.15])
export const sobCues = (t0, n = 3, gap = 0.32) => Array.from({ length: n }, (_, i) => ['pluck', +(t0 + i * gap).toFixed(3), [659.25, 587.33, 523.25][i % 3], 0.03, 0.4, 0.45])

// ─────────────────────────────────────────────── the engine
export function makeCourt(cfg) {
  const D = cfg.dur
  const FX = cfg.fx || {}
  const gavels = cfg.gavels || []
  const stampTimes = (cfg.stamps || []).map(s => s.at + 0.1)
  const loopLen = cfg.loopLen ?? 0.4
  const BOXES = (cfg.boxes || []).map(b => ({ ...b, lines: b.lines.map(L => { const W = who(L.who); return { t: L.t, speaker: W.tag, color: L.color || (L.who === 'JUDGE' ? undefined : W.tagColor), text: L.text } }) }))
  const ALL = BOXES.flatMap(b => b.lines)
  const hopsFor = tag => talkHops(ALL, tag, { cps: cfg.cps || 30 })

  async function build(stage) {
    try { await Promise.all(["800 96px Inter", "900 150px Inter", "700 30px Inter", "italic 500 120px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const assets = cfg.load ? await cfg.load() : {}
    const root = fill(stage, { background: '#05040c', overflow: 'hidden' })
    const cam = el('div', { position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', transformOrigin: '50% 45%' }, root)
    const cv = layerCanvas(cam), x = cv.getContext('2d')
    const hl = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none' }, root)
    const heads = (cfg.heads || []).map(h => ({ h, P: popText(hl, h.text, { top: h.top ?? 176, size: h.size ?? 92, accentSize: h.accentSize ?? (h.size ?? 92) * 1.32, at: h.at, late: h.late || 0, lateAt: h.lateAt, wobble: h.wobble ?? true, accentColor: h.accent || GOLD, fit: true }) }))
    const boxes = BOXES.map(b => dialogueBox(hl, { lines: b.lines, y: b.y ?? 1400, open: b.open, close: b.close, cps: cfg.cps || 30, size: b.size ?? 48, height: b.height ?? 290 }))
    const top = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none' }, root)
    const ticker = cfg.ticker ? buildTicker(top, cfg.ticker) : null
    const bug = buildBug(top, {})
    const ov = layerCanvas(root, { pointerEvents: 'none' }), ox = ov.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const ctx = { assets }

    function scene(t) {
      // t = picture time (after freezes)
      const shake = shakeFrom(t, gavels, 12) + shakeFrom(t, stampTimes, 20) + (cfg.shake ? cfg.shake(t) : 0)
      const camZ = cfg.cam ? cfg.cam(t) : 1
      cam.style.transform = `translate(${(shake * 0.6).toFixed(2)}px, ${shake.toFixed(2)}px) scale(${camZ.toFixed(4)})`
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * (1 + 0.05 * Math.sin(t * 0.3)) })
      // the court wall: dark panels + a soft spotlight on the bench
      x.save(); x.globalAlpha = 0.55
      R(x, WOOD.h, 0, 456, 1080, 14); R(x, WOOD.d, 0, 470, 1080, 8)
      for (let i = 0; i < 6; i++) R(x, i % 2 ? 'rgba(61,36,24,0.55)' : 'rgba(80,48,30,0.5)', i * 180, 470, 180, 900)
      x.restore()
      const g = x.createRadialGradient(540, 700, 40, 540, 700, 620); g.addColorStop(0, 'rgba(255,220,160,0.20)'); g.addColorStop(1, 'rgba(255,220,160,0)'); x.fillStyle = g; x.fillRect(0, 200, 1080, 1100)
      const hide = cfg.hide ? cfg.hide(t) : {}
      cfg.back && cfg.back(x, t, ctx)
      // the judge + bench + gavel
      if (!hide.judge) {
        const J = cfg.judge || {}
        const F = star(x, t, { x: 540, y: 600, s: 210 }, { who: 'JUDGE', mood: J.mood ? J.mood(t) : 'neutral', look: J.look ? J.look(t) : [0, 0.2], hops: [...(J.hops || []), ...hopsFor('THE JUDGE')], seed: 2, glow: 1.1, tears: J.tears ? J.tears(t) : 0 })
        if (F) wig(x, F)
        drawBench(x, t)
        drawBlock(x, 760, 690)
        drawGavel(x, t, 640, 642, gavels)
      }
      // the dock
      if (!hide.dock) {
        const d = (cfg.dock || []).find(d => t >= (d.from ?? -1) && t < (d.to ?? 1e9))
        if (d) {
          const W = who(d.who)
          const pk = d.from > 0 ? easeOutBack(prog(t, d.from, d.from + 0.35), 1.8) : 1
          const P = { x: d.x ?? 280, y: d.y ?? 1070, s: d.s ?? 236, pop: pk }
          const F = star(x, t, P, { who: d.who, mood: d.mood ? d.mood(t) : 'neutral', look: d.look ? d.look(t) : undefined, hops: [...(d.hops || []), ...hopsFor(W.tag)], seed: 5, tears: d.tears ? d.tears(t) : (d.who === 'pisces' ? 2 : 0) })
          d.prop && F && d.prop(x, t, P, F, ctx)
          drawDockRail(x, d.plate || 'DEFENDANT')
        }
      }
      // the jury
      if (!hide.jury) drawJuryBox(x, t, typeof cfg.jury === 'function' ? cfg.jury(t) : (cfg.jury || ['pisces']), { mood: cfg.juryMood, gasps: cfg.gasps, tears: cfg.tears, allTears: cfg.juryTears })
      cfg.front && cfg.front(x, t, ctx)
      // exhibits
      for (const E of cfg.exhibits || []) {
        if (t < E.at || t > E.out[1]) continue
        const k = easeOutBack(prog(t, E.at, E.at + 0.35), 1.6) * outK(t, E.out)
        const dim = clamp(prog(t, E.at, E.at + 0.2)) * outK(t, E.out)
        x.fillStyle = `rgba(6,4,18,${0.62 * dim})`; x.fillRect(0, 0, 1080, 1920)
        const B = { cx: E.cx ?? 540, cy: E.cy ?? 880, w: E.w ?? 820, h: E.h ?? 760 }
        drawBag(x, t, B.cx, B.cy, B.w, B.h, k, E.label || 'EXHIBIT A', b => E.draw(x, t, k, b, ctx))
      }
      // the verdict + the sentence
      for (const S of cfg.stamps || []) drawStamp(x, t, S.at, S.text, S.color || RED, { cy: S.y ?? 880, out: S.out, size: S.size ?? 150, sub: S.sub, rot: S.rot ?? -0.1 })
      if (cfg.sentence) drawSentence(x, t, cfg.sentence.at, cfg.sentence.text, { out: cfg.sentence.out, cy: cfg.sentence.y ?? 1130, head: cfg.sentence.head })
      cfg.over && cfg.over(x, t, ctx)
      for (const { h, P } of heads) P.update(t, h.out ? outK(t, h.out) : 1)
      for (const b of boxes) b.update(t)
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        const t0 = t
        scene(t)
        ox.clearRect(0, 0, 1080, 1920)
        for (const [ft, col] of FX.flashes || []) { const d = t0 - ft; if (d >= 0 && d < 0.3) { ox.globalAlpha = 0.75 * (1 - d / 0.3); ox.fillStyle = col || '#fff'; ox.fillRect(0, 0, 1080, 1920); ox.globalAlpha = 1 } }
        cfg.overlay && cfg.overlay(ox, t0, t)
        ticker && ticker.update(t)
        bug.update(t)
        drawGrain(gx, t0)
      },
    }
  }

  const CUES = [
    ...gavels.flatMap(g => gavelCues(g)),
    ...(cfg.gasps || []).flatMap(gaspCues),
    ...(cfg.stamps || []).flatMap(s => stampCues(s.at)),
    ...(FX.flashes || []).map(([f]) => ['pop', f, 1760, 0.03, 0]),
    ...(cfg.exhibits || []).flatMap(E => [['whoosh', E.at, 0.35, 0.04], ['pop', E.at + 0.2, 880, 0.035, 0.2]]),
    ...(cfg.sentence ? [['whoosh', cfg.sentence.at, 0.3, 0.03], ['pluck', cfg.sentence.at + 0.3, 1174.66, 0.035, 0.5, 0]] : []),
    ...(cfg.heads || []).flatMap(h => h.at > 0 ? popWords(h.at, Math.min(5, h.text.split(/\s+/).length), 0.07) : []),
    ...talkCues(ALL, { cps: cfg.cps || 30 }),
    ...(cfg.cues || []),
  ].filter(c => c[1] >= 0 && c[1] < D)

  // the hook kit on top: frame-0 hook title, whip zooms, record scratches, chapter stickers, the loop
  const HOOK = cfg.hook ? { top: 210, size: 100, ...cfg.hook } : null
  const WHIPS = (FX.whips || []).map(w => typeof w === 'number' ? { at: w, from: 1.3 } : w)
  const RECS = FX.recs || []
  const CH = (cfg.chapters || []).map((c, i) => ({ n: i + 1, y: 122, x: 56, ...c }))
  const SHAKES = FX.shakes || []
  const core = RECS.length ? frozen(build, RECS) : build
  const SCENES = [core, ...WHIPS.map(whipZoom), ...SHAKES.map(screenShake), ...(HOOK ? [slamTitle(HOOK)] : []), ...RECS.map(recordScratch), ...CH.map(chapter), ...(cfg.kit || [])]
  if (cfg.ending === 'loop') SCENES.push(loopBack([build, ...(HOOK ? [slamTitle(HOOK)] : [])], { duration: D, len: loopLen }))
  CUES.push(...WHIPS.flatMap(whipZoomCues), ...SHAKES.flatMap(shakeCues), ...(HOOK ? slamTitleCues(HOOK) : []), ...RECS.flatMap(recordScratchCues), ...CH.flatMap(chapterCues), ...(cfg.kitCues || []),
    ...(cfg.ending === 'loop' ? loopCues({ duration: D, len: loopLen }) : []))
  return { DURATION: D, SCENES, CUES: CUES.filter(c => c[1] >= 0 && c[1] < D) }
}
