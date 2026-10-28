// s7talk — the Star Talk season 7 "SIGN TO SIGN" conversation kit (promo/films/STARTALK8.md).
// Copied from st7royals (S7 E06, with cast.tagX) for st7twins; every season-7 episode keeps its OWN COPY of this file in its folder
// (copy, don't share), so change a copy only for that episode.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { seq, chatThread, skyNote, opener, lastLine, drawStarMap, drawTalkMarks, speaking, threadCues, noteCues,
//            openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'
//
// CAST   { KEY: { tag: '♎ LIBRA', color: '#e163d6', side: 'L' | 'R' | 'C', pitch: 784, tagX? } }   one entry per speaker.
//        tagX (0…1, this copy only): where the name tag sits along the box's top edge, so with 3+ speakers the tag
//        lines up with the speaker's seat (0 = left end, 1 = right end).
// seq(start, items, { cast, cps = 28, hold = 1.7 }) → { lines, marks, end }
//   items, in order: { s: 'LIBRA', x: 'text with *accent*', hold?, pre? }  a line (typing starts at cursor + pre; the cursor
//   then moves to done + hold, so every line stays readable ≥ hold s) · { wait: 0.6 } · { mark: 'name' } (marks.name = cursor).
//   lines = [{ t, who, speaker (tag), text, color (accent = the speaker's colour, lifted), side }] for chatThread / talkHops.
// chatThread(root, { lines, cast, open, close, cps = 28, size = 42, width = 880, bottom = 1812, gap = 24, offset = 120 })
//   The season's dialogue look, a two-deep chat thread in the lower third: every line is its own retro pixel box with
//   the speaker's sign-coloured name tag on its top edge (left side for 'L' speakers, right side for 'R', centred 'C'),
//   a sign-coloured border + glow while it is the live line, and a ▼ when typed. When the next line starts, the old box
//   slides up one slot (over the 0.28 s before the new line) and, as the new line starts, dims (border to slate, 50 %
//   opacity, 94 % scale) so the newest line is always the bright one
//   at the bottom; a box two lines old slides up and fades out. 'L' boxes sit 60 px left of centre, 'R' 60 px right.
//   → { update(t), times }.  Build after fonts load (Space Mono 700, Inter 800).
// skyNote(root, { at, out, text, top = 520, width = 860 }) → { update(t) }   the "✦ SKY NOTE" footnote chip: a small
//   cyan-bordered pixel panel, label in Space Mono gold, the fact in Inter 600 bone (≤ 2 lines, *accent* = gold italic
//   Garamond). Springs in with a −2° tilt, floats, pops out over `out` = [a, b]. Hold it ≥ 3 s.
// opener(root, { at = 0, cast: [{ glyph, name, color }…], place }) → { update(t) }   the 2.6 s cold open: the gold
//   "★ SIGN TO SIGN ★" panel, the speakers' glyph coins in their colours with × between, their names, then the setting in
//   EB Garamond italic ("a diner booth, 1:12 a.m."). Gone at at + OPENER_LEN.
// lastLine(root, { at, out, text, tag, color, top = 300, size = 104, accentSize = 160 }) → { update(t), land }
//   the episode's last line: the speaker's name tag pops, then the line in Inter 800 + Garamond accent (lesson.popText).
// drawStarMap(ctx, t, { stars, links, at, color, k = 1, labels, dur = 1.6 })   a real constellation as pixel stars
//   (size from magnitude) with links that draw in one by one from `at` over `dur`. stars: [{ x, y, mag, color? }],
//   links: [[i, j, color?]], labels: [{ i, text, sub?, dx, dy, at, align }]. k = overall alpha.
// drawTalkMarks(ctx, x, top, t, k, color)   three little pixel "speech" ticks above a speaker while k > 0.
// speaking(lines, who, t, { cps }) → 0…1   1 while `who` is typing a line (eased in/out), for drawTalkMarks / glows.
// threadCues(lines, cast, { cps }) · noteCues(at, out) · openerCues(at) · lastLineCues(at, text) → sound cues.
// lite(hex, k = 0.3) → the colour lifted toward warm white (accent text on dark glass).
//
// Pure f(t); nothing touches `document` at module top level (the sound build imports this through scenes/index.js).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el, hexToRgb } from '../../src/lib.js'
import { easeOutBack } from '../wheel.js'
import { lineTimes, talkCues } from '../startalk.js'
import { drawPixelStar } from '../sky.js'
import { popText } from '../lesson.js'

const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CYAN = '#7fdcff', SLATE = '#5d5680'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const GLYPH = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const FW = 1080
const r3 = v => +v.toFixed(3)
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const lite = (hex, k = 0.3) => { const A = hexToRgb(hex), B = hexToRgb('#fff6e6'); return toHex(...A.map((v, i) => lerp(v, B[i], k))) }
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

// ─────────────────────────────────────────────── the script → timed lines
export function seq(start, items, { cast, cps = 28, hold = 1.7 } = {}) {
  let cur = start
  const lines = [], marks = {}
  for (const it of items) {
    if (it.mark) { marks[it.mark] = r3(cur); continue }
    if (it.wait) { cur += it.wait; continue }
    const c = cast[it.s]
    const L = { t: r3(cur + (it.pre || 0)), who: it.s, speaker: c.tag, text: it.x, color: lite(c.color, 0.28), side: c.side || 'L' }
    const tm = lineTimes([L], { cps })[0]
    lines.push(L)
    cur = tm.done + (it.hold ?? hold)
  }
  return { lines, marks, end: r3(cur) }
}

/** 0…1 while `who` is typing (eased) */
export function speaking(lines, who, t, { cps = 28 } = {}) {
  const tm = lineTimes(lines, { cps })
  let k = 0
  lines.forEach((L, i) => { if (L.who === who) k = Math.max(k, prog(t, L.t - 0.1, L.t + 0.1) * (1 - prog(t, tm[i].done + 0.1, tm[i].done + 0.4))) })
  return k
}

// ─────────────────────────────────────────────── pixel panels
const step = (x, o, w, h, P, col) => { x.fillStyle = col; x.fillRect(o + 2 * P, o, w - 2 * o - 4 * P, h - 2 * o); x.fillRect(o, o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); x.fillRect(o + P, o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
function panel(cv, w, h, { m = 26, fill = 'rgba(13,8,32,0.9)', border = GOLD, glow = border, glowA = 0.55, P = 6, hair = 'rgba(239,230,214,0.4)' } = {}) {
  cv.width = w + 2 * m; cv.height = h + 2 * m
  const x = cv.getContext('2d'); x.translate(m, m)
  if (glowA > 0) { x.save(); x.shadowColor = rgba(glow, glowA); x.shadowBlur = 24; step(x, 0, w, h, P, border); x.restore() }
  step(x, 0, w, h, P, border)
  step(x, P, w, h, P, INK)
  step(x, 2 * P, w, h, P, fill)
  x.fillStyle = hair; x.fillRect(3 * P, 2.5 * P, w - 6 * P, P / 3)
  x.fillStyle = 'rgba(255,246,220,0.85)'; x.fillRect(2 * P, 0, P * 3, P / 2); x.fillRect(0, 2 * P, P / 2, P * 2)
}
const mkCanvas = (parent, w, h, m = 26) => el('canvas', { position: 'absolute', left: -m + 'px', top: -m + 'px', width: (w + 2 * m) + 'px', height: (h + 2 * m) + 'px' }, parent)

/** a sign-coloured name tag (dark pixel tab, colour border + label) → { el, w, h } */
function nameTag(parent, label, color, { size = 30, P = 6 } = {}) {
  const meas = (typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(4, 4) : document.createElement('canvas')).getContext('2d')
  meas.font = `700 ${size}px ${MONO}`
  const tw = Math.ceil(meas.measureText(label).width + 0.12 * size * label.length)
  const w = Math.round((tw + 56) / P) * P, h = Math.round((size * 1.95) / P) * P
  const t = el('div', { position: 'absolute', width: w + 'px', height: h + 'px', transformOrigin: '50% 100%' }, parent)
  panel(mkCanvas(t, w, h, 22), w, h, { m: 22, fill: 'rgba(20,12,44,0.98)', border: color, glowA: 0.6, hair: 'rgba(0,0,0,0)' })
  el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', display: 'grid', placeItems: 'center', font: `700 ${size}px ${MONO}`, letterSpacing: '0.12em', color: lite(color, 0.18), textShadow: '0 2px 0 rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, t, label)
  return { el: t, w, h }
}

// ─────────────────────────────────────────────── the chat thread
const PAUSE_SAFE = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
export function chatThread(root, { lines, cast, open, close, cps = 28, size = 42, width = 880, bottom = 1812, gap = 24, offset = 120 }) {
  const times = lineTimes(lines, { cps })
  const tOpen = open ?? lines[0].t - 0.15
  const tClose = close ?? times[times.length - 1].done + 1.8
  const wrap = el('div', { position: 'absolute', left: 0, top: 0, width: FW + 'px', height: '1920px', pointerEvents: 'none' }, root)
  const PX = 48, PT = 54, PB = 40
  const boxes = lines.map((L, n) => {
    const c = cast[L.who], side = L.side
    const left = side === 'L' ? (FW - width) / 2 - offset / 2 : side === 'R' ? (FW - width) / 2 + offset / 2 : (FW - width) / 2
    const b = el('div', { position: 'absolute', left: left + 'px', top: '0px', width: width + 'px', transformOrigin: side === 'L' ? '15% 100%' : side === 'R' ? '85% 100%' : '50% 100%', display: 'block', visibility: 'hidden' }, wrap)
    const txt = el('div', { position: 'absolute', left: PX + 'px', top: PT + 'px', width: (width - 2 * PX) + 'px', font: `700 ${size}px ${MONO}`, lineHeight: '1.26', color: BONE, letterSpacing: '-0.01em', textShadow: '0 3px 0 rgba(6,4,18,0.85)', whiteSpace: 'normal' }, b)
    // chars as spans (pre-laid-out, hidden until typed)
    const spans = []
    let acc = false, word = null
    for (const ch of L.text) {
      if (ch === '*') { acc = !acc; continue }
      if (ch === ' ') { word = null; txt.appendChild(document.createTextNode(' ')); spans.push(null); continue }
      if (!word) word = el('span', { display: 'inline-block', whiteSpace: 'nowrap' }, txt)
      spans.push(el('span', { visibility: 'hidden', color: acc ? L.color : BONE, fontStyle: 'normal' }, word, PAUSE_SAFE(ch)))
    }
    const th = txt.offsetHeight || Math.ceil(size * 1.26)
    const h = Math.max(150, Math.round((PT + th + PB) / 6) * 6)
    b.style.height = h + 'px'; b.style.display = 'none'; b.style.visibility = 'visible'
    const live = mkCanvas(b, width, h); panel(live, width, h, { border: c.color, glow: c.color, glowA: 0.7 })
    const dim = mkCanvas(b, width, h); panel(dim, width, h, { border: SLATE, glowA: 0, fill: 'rgba(13,8,32,0.82)' })
    b.insertBefore(dim, txt); b.insertBefore(live, txt)
    const tag = nameTag(b, c.tag, c.color)
    tag.el.style.top = (-tag.h / 2 - 2) + 'px'
    tag.el.style.left = (c.tagX != null ? Math.round(36 + c.tagX * (width - tag.w - 72)) : side === 'R' ? width - tag.w - 36 : side === 'C' ? (width - tag.w) / 2 : 36) + 'px'
    const arrow = el('canvas', { position: 'absolute', right: '34px', bottom: '24px', width: '42px', height: '30px', display: 'none' }, b)
    arrow.width = 42; arrow.height = 30
    { const a = arrow.getContext('2d'); ['XXXXXXX', '.XXXXX.', '..XXX..', '...X...'].forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { a.fillStyle = j === 0 && i < 3 ? '#fff1c8' : lite(c.color, 0.35); a.fillRect(i * 6, j * 6, 6, 6) } })) }
    return { b, txt, spans, h, live, dim, tag, arrow, tm: times[n], L }
  })
  const slide = (j, t) => ease.inOutCubic(prog(t, lines[j].t - 0.36, lines[j].t - 0.08))   // the old boxes clear the slot first
  return {
    times,
    update(t) {
      const on = t >= tOpen && t < tClose + 0.3
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      const kc = 1 - ease.inCubic(prog(t, tClose, tClose + 0.28))
      boxes.forEach((B, i) => {
        const appear = lines[i].t - 0.1
        if (t < appear) { B.b.style.display = 'none'; return }
        // how far the newer boxes have pushed this one up, and how old it is
        let lift = 0, age = 0
        for (let j = i + 1; j < lines.length; j++) { const p = slide(j, t); if (p <= 0) break; lift += p * (boxes[j].h + gap); age += p }
        if (age >= 2) { B.b.style.display = 'none'; return }
        B.b.style.display = 'block'
        const pop = easeOutBack(prog(t, appear, appear + 0.3), 2.2)
        const dimK = i + 1 < lines.length ? ease.outCubic(prog(t, lines[i + 1].t - 0.05, lines[i + 1].t + 0.25)) : 0, fade = age > 1 ? 1 - (age - 1) : 1
        const sc = lerp(0.6, 1, pop) * lerp(1, 0.94, dimK) * lerp(0.7, 1, kc)
        const y = bottom - B.h - lift + (1 - kc) * 20
        B.b.style.top = y.toFixed(1) + 'px'
        B.b.style.opacity = String(clamp(prog(t, appear, appear + 0.12)) * lerp(1, 0.5, dimK) * fade * kc)
        B.b.style.transform = `scale(${sc.toFixed(4)})`
        B.live.style.opacity = String(1 - dimK); B.dim.style.opacity = String(dimK)
        B.spans.forEach((s, k) => { if (s) s.style.visibility = t >= B.tm.chars[k] ? 'visible' : 'hidden' })
        const tp = easeOutBack(prog(t, appear + 0.06, appear + 0.36), 2.6)
        B.tag.el.style.transform = `scale(${tp.toFixed(4)}) rotate(${((1 - tp) * (B.L.side === 'R' ? 6 : -6)).toFixed(2)}deg)`
        const aOn = age === 0 && t >= B.tm.done + 0.08 && kc >= 1
        B.arrow.style.display = aOn ? 'block' : 'none'
        if (aOn) { const ph = (t - B.tm.done) % 0.6; B.arrow.style.opacity = ph < 0.4 ? '1' : '0.2'; B.arrow.style.transform = `translateY(${Math.round(Math.sin((t - B.tm.done) * 7) * 1.5) * 3}px)` }
      })
    },
  }
}

// ─────────────────────────────────────────────── SKY NOTE chip
function richHTML(text, accent = GOLD) {
  let acc = false, out = ''
  for (const part of text.split(/(\*)/)) {
    if (part === '*') { acc = !acc; continue }
    const s = PAUSE_SAFE(part).replace(/\|/g, '<br>')
    out += acc ? `<span style="font-family:${SERIF};font-style:italic;font-weight:500;font-size:1.22em;color:${accent}">${s}</span>` : s
  }
  return out
}
export function skyNote(root, { at, out, text, top = 520, width = 860 }) {
  const OUT = out || [at + 4, at + 4.25]
  const b = el('div', { position: 'absolute', left: ((FW - width) / 2) + 'px', top: top + 'px', width: width + 'px', transformOrigin: '50% 0%', display: 'block', visibility: 'hidden' }, root)
  const txt = el('div', { position: 'relative', padding: '74px 46px 34px', font: `600 36px ${INTER}`, lineHeight: '1.22', color: BONE, textAlign: 'center', textShadow: '0 2px 0 rgba(6,4,18,0.8)' }, b, richHTML(text))
  const lbl = el('div', { position: 'absolute', left: 0, right: 0, top: '28px', textAlign: 'center', font: `700 24px ${MONO}`, letterSpacing: '0.28em', color: CYAN }, b, '✦ SKY NOTE')
  const h = Math.max(150, Math.round((txt.offsetHeight || 170) / 6) * 6)
  b.style.height = h + 'px'; b.style.display = 'none'; b.style.visibility = 'visible'
  const cv = mkCanvas(b, width, h); panel(cv, width, h, { border: CYAN, glow: CYAN, glowA: 0.6, fill: 'rgba(8,14,36,0.92)' })
  b.insertBefore(cv, txt); void lbl
  return {
    h,
    update(t) {
      const on = t >= at && t < OUT[1]
      b.style.display = on ? 'block' : 'none'
      if (!on) return
      const p = easeOutBack(prog(t, at, at + 0.38), 2.4), q = prog(t, OUT[0], OUT[1])
      const sc = lerp(0.5, 1, p) * (1 - 0.35 * ease.inCubic(q))
      b.style.opacity = String(clamp(prog(t, at, at + 0.12)) * (1 - ease.inQuad(q)))
      b.style.transform = `translateY(${(Math.sin((t - at) * 2.2) * 4).toFixed(1)}px) scale(${sc.toFixed(4)}) rotate(${(-2 + (1 - p) * -5).toFixed(2)}deg)`
    },
  }
}

// ─────────────────────────────────────────────── the cold open
export const OPENER_LEN = 2.6
export function opener(root, { at = 0, cast, place, top = 640 }) {
  const end = at + OPENER_LEN
  const w = el('div', { position: 'absolute', left: 0, top: top + 'px', width: FW + 'px', textAlign: 'center', display: 'none' }, root)
  const pw = 600, ph = 96
  const pan = el('div', { position: 'relative', margin: '0 auto', width: pw + 'px', height: ph + 'px' }, w)
  panel(mkCanvas(pan, pw, ph, 26), pw, ph, { P: 8, glowA: 0.7, fill: 'rgba(20,12,44,0.96)' })
  el('div', { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', font: `700 40px ${MONO}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 3px 0 rgba(6,4,18,0.9)' }, pan, '★ SIGN TO SIGN ★')
  const row = el('div', { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '22px', marginTop: '58px' }, w)
  const coins = []
  cast.forEach((c, i) => {
    if (i) coins.push({ e: el('div', { font: `800 64px ${INTER}`, color: BONE, opacity: 0.8 }, row, '×'), i: i - 0.5 })
    const col = el('div', { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }, row)
    const coin = el('div', { width: '132px', height: '132px', borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${lite(c.color, 0.35)}, ${c.color} 60%, ${rgba(c.color, 0.8)})`, boxShadow: `0 0 34px ${rgba(c.color, 0.7)}, inset 0 -8px 0 rgba(0,0,0,0.22)`, display: 'grid', placeItems: 'center', font: `700 86px ${GLYPH}`, color: '#fffaf0', textShadow: '0 3px 0 rgba(6,4,18,0.35)' }, col, c.glyph + '&#xFE0E;')
    el('div', { font: `700 28px ${MONO}`, letterSpacing: '0.16em', color: lite(c.color, 0.25), textShadow: '0 2px 0 rgba(6,4,18,0.9)' }, col, c.name.toUpperCase())
    coins.push({ e: col, i }); void coin
  })
  const pl = el('div', { marginTop: '52px', font: `italic 500 64px ${SERIF}`, color: BONE, textShadow: '0 4px 24px rgba(6,4,18,0.9)' }, w, PAUSE_SAFE(place))
  return {
    update(t) {
      const on = t >= at && t < end
      w.style.display = on ? 'block' : 'none'
      if (!on) return
      const out = ease.inCubic(prog(t, end - 0.34, end))
      const pp = easeOutBack(prog(t, at + 0.05, at + 0.4), 2.4)
      pan.style.transform = `translateY(${(-out * 60).toFixed(1)}px) scale(${(lerp(0.4, 1, pp) * (1 - 0.3 * out)).toFixed(4)}) rotate(${((1 - pp) * -8).toFixed(2)}deg)`
      pan.style.opacity = String(clamp(pp * 2) * (1 - out))
      coins.forEach(({ e, i }) => {
        const t0 = at + 0.4 + i * 0.22, p = easeOutBack(prog(t, t0, t0 + 0.34), 2.6)
        e.style.transform = `translateY(${((1 - p) * 40 - out * 40).toFixed(1)}px) scale(${(lerp(0.3, 1, p) * (1 - 0.3 * out)).toFixed(4)})`
        e.style.opacity = String(clamp(prog(t, t0, t0 + 0.1)) * (1 - out))
      })
      const tp = at + 0.5 + cast.length * 0.22, q = ease.outCubic(prog(t, tp, tp + 0.4))
      pl.style.opacity = String(q * (1 - out))
      pl.style.transform = `translateY(${((1 - q) * 26 + out * 30).toFixed(1)}px)`
    },
  }
}
export function openerCues(at = 0, n = 2) {
  const c = [['whoosh', r3(at + 0.02), 0.4, 0.04], ['pop', r3(at + 0.12), 880, 0.05, 0], ['bell', r3(at + 0.16), 1760, 0.03, 1.4, 0], ['glitter', r3(at + 0.1), r3(at + 0.7)]]
  for (let i = 0; i < n; i++) c.push(['pop', r3(at + 0.42 + i * 0.22), [987.77, 1174.66, 1318.51, 1479.98][i % 4], 0.045, (i / Math.max(1, n - 1) - 0.5) * 0.6])
  c.push(['pluck', r3(at + 0.55 + n * 0.22), 739.99, 0.035, 0.7, 0], ['whoosh', r3(at + OPENER_LEN - 0.36), 0.32, 0.03])
  return c
}

// ─────────────────────────────────────────────── the last line
export function lastLine(root, { at, out, text, tag, color, top = 300, size = 104, accentSize = 160, accentColor }) {
  const T0 = at + 0.32
  const tg = nameTag(root, tag, color, { size: 32 })
  tg.el.style.left = ((FW - tg.w) / 2) + 'px'; tg.el.style.top = (top - tg.h - 30) + 'px'; tg.el.style.display = 'none'
  const words = text.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length
  const H = popText(root, text, { top, size, accentSize, at: T0, gap: 0.1, accentColor: accentColor || lite(color, 0.2), wobble: true, fit: true })
  const OUT = out
  return {
    land: r3(T0 + words * 0.1),
    update(t) {
      const k = OUT ? 1 - ease.inQuad(prog(t, OUT[0], OUT[1])) : 1
      const on = t >= at && k > 0
      tg.el.style.display = on ? 'block' : 'none'
      if (on) { const p = easeOutBack(prog(t, at, at + 0.32), 2.6); tg.el.style.opacity = String(k); tg.el.style.transform = `scale(${(p * lerp(0.9, 1, k)).toFixed(4)}) rotate(${((1 - p) * -6).toFixed(2)}deg)` }
      H.update(t, k)
    },
  }
}
export function lastLineCues(at, text) {
  const words = text.replace(/\|/g, ' ').split(/\s+/).filter(Boolean)
  const N = [880, 987.77, 1174.66, 1318.51, 1479.98, 1760]
  return [['pop', r3(at + 0.02), 739.99, 0.05, 0], ['tick', r3(at + 0.04), 0.03],
    ...words.map((w, i) => ['pop', r3(at + 0.32 + i * 0.1), N[i % N.length], w.includes('*') ? 0.05 : 0.028, (i % 2 ? 0.15 : -0.15)]),
    ['pluck', r3(at + 0.4 + words.length * 0.1), 1174.66, 0.04, 0.8, 0], ['bell', r3(at + 0.45 + words.length * 0.1), 2349.3, 0.022, 1.6, 0]]
}

// ─────────────────────────────────────────────── canvas bits
/** a constellation in pixel stars, links drawing in one by one */
export function drawStarMap(ctx, t, { stars, links = [], at = 0, dur = 1.6, color = BONE, k = 1, labels = [], lineW = 4 }) {
  if (k <= 0 || t < at) return
  ctx.save(); ctx.globalAlpha *= k
  const n = Math.max(1, links.length)
  links.forEach(([i, j, col], m) => {
    const p = prog(t, at + (m / n) * dur * 0.8, at + ((m + 1) / n) * dur * 0.8 + 0.12)
    if (p <= 0) return
    const A = stars[i], B = stars[j]
    const len = Math.hypot(B.x - A.x, B.y - A.y), dots = Math.max(2, Math.floor(len / 12))
    ctx.fillStyle = col || color
    for (let d = 0; d <= dots * p; d++) { if (d % 2) continue; const u = d / dots; ctx.fillRect(Math.round(lerp(A.x, B.x, u) - lineW / 2), Math.round(lerp(A.y, B.y, u) - lineW / 2), lineW, lineW) }
  })
  stars.forEach((s, i) => {
    const p = easeOutBack(prog(t, at + (i / stars.length) * dur * 0.5, at + (i / stars.length) * dur * 0.5 + 0.3), 2.4)
    if (p <= 0) return
    const sz = clamp(46 - (s.mag ?? 3) * 9, 14, 44) * p * (1 + 0.08 * Math.sin(t * 3 + i))
    drawPixelStar(ctx, s.x, s.y, sz, (s.mag ?? 3) < 1.8 ? 2 : 1, s.color || color)
  })
  for (const L of labels) {
    const p = prog(t, L.at ?? at + dur, (L.at ?? at + dur) + 0.3)
    if (p <= 0) continue
    const s = stars[L.i], lx = s.x + (L.dx || 0), ly = s.y + (L.dy || 0)
    ctx.save(); ctx.globalAlpha *= ease.outCubic(p) * (L.k ?? 1)
    ctx.textAlign = L.align || 'left'; ctx.textBaseline = 'middle'
    ctx.font = `700 ${L.size || 24}px ${MONO}`
    ctx.fillStyle = 'rgba(6,4,18,0.9)'; ctx.fillText(L.text, lx + 2, ly + 3)
    ctx.fillStyle = L.color || GOLD; ctx.fillText(L.text, lx, ly)
    if (L.sub) { ctx.font = `italic 500 ${Math.round((L.size || 24) * 1.25)}px ${SERIF}`; ctx.fillStyle = 'rgba(6,4,18,0.9)'; ctx.fillText(L.sub, lx + 2, ly + (L.size || 24) * 1.15 + 3); ctx.fillStyle = BONE; ctx.fillText(L.sub, lx, ly + (L.size || 24) * 1.15) }
    ctx.restore()
  }
  ctx.restore()
}
/** three pixel speech ticks fanning above a speaker */
export function drawTalkMarks(ctx, x, top, t, k, color) {
  if (k <= 0.02) return
  ctx.save(); ctx.globalAlpha *= clamp(k)
  const c = 6, w = Math.sin(t * 18) > 0 ? 1 : 0
  ctx.fillStyle = lite(color, 0.35)
  ;[[-1, -0.6], [0, 0], [1, -0.6]].forEach(([d, l]) => {
    const bx = x + d * 46, by = top - 30 + l * 10 * -1 - w * 4
    for (let s = 0; s < 3; s++) ctx.fillRect(Math.round(bx + d * s * c * 0.8 - c / 2), Math.round(by - s * c), c, c)
  })
  ctx.restore()
}

// ─────────────────────────────────────────────── sound
export function threadCues(lines, cast, { cps = 28 } = {}) {
  const pitch = {}
  for (const c of Object.values(cast)) pitch[c.tag] = c.pitch || 784
  return [...talkCues(lines, { cps, pitch }), ...lines.map(L => ['pop', r3(L.t - 0.12), (pitch[L.speaker] || 784) * 1.5, 0.022, L.side === 'L' ? -0.3 : L.side === 'R' ? 0.3 : 0])]
}
export function noteCues(at, out) {
  return [['pop', r3(at + 0.02), 1318.51, 0.04, 0.2], ['bell', r3(at + 0.06), 2637, 0.02, 1.2, 0.2], ['glitter', r3(at), r3(at + 0.5)], ...(out ? [['whoosh', r3(out[0]), 0.25, 0.018]] : [])]
}
