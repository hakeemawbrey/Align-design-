// st9day — Star Talk season 9 "A Day in the Life" (promo/films/STARTALK10.md): the shared VLOG CHROME. Owned by the Aries
// session; every season-9 episode imports it. Don't edit from another session: add what you need in your own folder.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { drawRecFrame, drawClock, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues,
//            phoneScreen, phoneCues, clockCues, DAY_FONTS, daySign } from '../../st9day.js'
//
//   In build():  try { await Promise.all(DAY_FONTS.map(f => document.fonts.load(f))) } catch (_) {}
//   Canvas helpers (drawRecFrame, drawClock, daySky, factChip, phoneScreen) are pure f(t): call them every frame, any
//   order. DOM helpers (hookPOV, stampCaption) are built once in build() and return { root, update(t) }.
//
// drawRecFrame(ctx, t, { rec = true, battery = 0.8, x0 = 96, y0 = 214, alpha = 1, label = 'REC', time = null })
//   The camcorder viewfinder: four thin white corner brackets inset x0 from the sides and y0 from the top and bottom
//   (clear of the cardFrame corners and the seed constellation), a blinking red "● REC" top right (above the top-right
//   bracket) and a pixel battery icon under it (battery 0…1: the bars; ≤ 0.2 turns red and blinks). rec: false shows a
//   grey "❚❚ PAUSE" instead. time: optional small running counter under the battery, e.g. '00:07' (pass a string).
//   Draw it late (above the scene, below the DOM type).
//
// drawClock(ctx, t, { from = '7:02', to = from, at = 0, dur = 1, ampm = 'AM', x = 540, y = 150, sign = null, size = 104,
//                     eyebrow = null, alpha = 1, ff = true })
//   The big Space Mono in-world clock, centred on (x, y). Before `at` it shows `from`; over [at, at + dur] it fast-
//   forwards to `to` (the minute digits roll, a "▶▶" blinks beside it while it runs); after, it holds `to`.
//   from / to may carry their own AM/PM ('11:58 PM' → '12:03 AM' rolls over midnight); otherwise `ampm` is used.
//   Under it, a small eyebrow "DAY IN THE LIFE OF AN ♈ ARIES" (sign = 'aries' | 'taurus' | … | 'sag' | 'cap' | 'aqua';
//   eyebrow: a string to override, '' for none). Returns { minutes } (the shown time, minutes after midnight).
//   Tip: the clock sits at y 150 (top 98 … eyebrow 222), so keep hookPOV's top at ≥ 250 while both are up.
//
// clockCues(at, dur, { gain = 0.03 }) → the fast-forward's tape ticks + a landing pop. Spread into CUES.
//
// stampCaption(root, { at, out, time = '7:05 AM', text, top = 1530, accentColor = GOLD, size = 46 })
//   The vlog's timestamped lower caption: a translucent ink pill, "7:05 AM" in gold Space Mono, an em dash, then the text
//   in Inter 600 bone ('*word*' = EB Garamond italic accent). Slides up and pops in at `at`; out is a time (pops out over
//   0.25 s) or [a, b] (fades over a…b). Keep the text ≤ ~34 characters for one line; longer wraps to two (max ~70).
//   → { root, update(t) }.   stampCues(at) → a soft camera-shutter tick + pop.
//
// hookPOV(root, { text, at = 0, out, top = 260, size = 96, accentSize = 140, accentColor = GOLD, color = BONE })
//   The frame-0 hook ("POV: …" / "a day in the life of…"): Inter 800, centred, '*word*' = EB Garamond italic accent,
//   '|' = line break. FULLY ON SCREEN at `at` (no type-on; frame 0 is the thumbnail). A tiny 2-frame shake at at + 0.1,
//   then it holds and pops out at `out` (a time; or [a, b] to fade). Without '|' it wraps to the 940 px measure; with '|'
//   each line shrinks to fit it (never grows). Keep it ≤ 7 words, ≤ 3 lines.
//   → { root, update(t) }.   hookPOVCues(at, { key }) → the record "bleep", a pop and a sub thump for the hook.
//
// daySky(ctx, t, { hour, alpha = 1 })
//   Tints the sky by the in-world hour (0–24, fractional, wraps): dawn (≈6) peach, noon (≈12) pale blue with dimmer
//   stars, dusk (≈19) violet-pink, 3 AM deep indigo with every star out (extra twinkles drawn). Draw it right after
//   sky.js's drawSky (and before props); alpha scales the whole tint.
//
// factChip(ctx, t, { text, at, dur = 2.4, x = 540, y = 1300, color = GOLD, label = '★ REAL SKY', w = 760, size = 34 })
//   The facts footnote: a small dark pixel chip with a label ('★ REAL SKY' | '★ ASTROLOGY SAYS' | any) and the fact in
//   Inter 600, wrapped to w (centred on x; y = its top). Pops in at `at`, holds dur, pops out. dur is the hold: give it
//   ≥ 1.5 s + reading time (~13 chars/s) for a long fact. Returns { h } (its height) while visible.
//   factChipCues(at, { dur = 2.4 }) → a sparkle ding in, a soft tick out.
//
// phoneScreen(ctx, t, { x, y, w = 380, h = 680, lines = [], app = 'chat', title = null, clock = '9:41', alpha = 1,
//                        rot = 0, pop = 1, accent = '#5fa8ff', glow = 0.5, size = 26 })
//   A pixel phone (x, y = its centre). app:
//     'chat'     a group chat: lines [{ from, text, at }] arrive as bubbles at `at` (a typing "…" shows 0.5 s before);
//                from 'me' = right, accent blue; anyone else = left, grey, with their name. Old bubbles scroll up.
//     'notes'    a notes page: each line types on at `at` (lines starting '[ ]' / '[x]' draw as checkboxes).
//     'alarm'    a ringing alarm: lines[0].text = the time ('6:00'), lines[1].text = the label; title = the snooze label.
//                It shakes while ringing (from lines[0].at to lines[0].stop or forever).
//     'map'      a pixel street map with a route that draws on, a pin; lines = waypoints labels as toasts.
//     'playlist' now playing + a track list; lines = tracks ({ text, from = artist }); the one whose `at` passed last
//                is highlighted and the bars bounce.
//   title = the app bar title (chat: the group name). pop = 0…1 scale for pop-ins, rot = tilt in radians.
//   phoneCues(lines, { app }) → a ping per incoming line (chat / notes typing ticks / alarm beeps).
//
// daySign(id) → { id, name, NAME, glyph, color, el, article }  (accepts 'sag', 'cap', 'aqua' too).
// DAY_FONTS → the font specs these helpers use (load them in build()).
//
// Nothing touches `document` at module top level (the sound build imports this through scenes/index.js in node).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el, noise1, hexToRgb } from '../src/lib.js'
import { SIGNS, easeOutBack } from './wheel.js'

const W = 1080, H = 1920
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff3b4f', PINK = '#ff8fb1'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const SHADOW = '0 4px 26px rgba(6,4,18,0.92), 0 0 3px rgba(6,4,18,0.8), 0 2px 0 rgba(6,4,18,0.85)'
const r3 = v => +v.toFixed(3)

export const DAY_FONTS = ["800 96px Inter", "600 46px Inter", "italic 500 140px 'EB Garamond'", "700 104px 'Space Mono'", "700 26px 'Space Mono'"]

const ALIAS = { sag: 'sagittarius', cap: 'capricorn', aqua: 'aquarius' }
export function daySign(id) {
  const s = SIGNS.find(x => x.id === (ALIAS[id] || id)) || SIGNS[0]
  return { ...s, NAME: s.name.toUpperCase(), article: /^[AEIOU]/.test(s.name) ? 'AN' : 'A' }
}

// ─────────────────────────────────────────────── shared bits
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath()
}
/** a stepped-corner pixel panel (P = pixel size) */
function pixPanel(ctx, x, y, w, h, { fill = 'rgba(16,9,38,0.9)', border = GOLD, P = 6 } = {}) {
  ctx.fillStyle = border
  ctx.fillRect(x + P, y, w - 2 * P, h); ctx.fillRect(x, y + P, w, h - 2 * P)
  ctx.fillStyle = fill
  ctx.fillRect(x + 2 * P, y + P, w - 4 * P, h - 2 * P); ctx.fillRect(x + P, y + 2 * P, w - 2 * P, h - 4 * P)
}
/** wrap text to maxW with the current font; returns lines */
function wrap(ctx, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let cur = ''
    for (const w of para.split(/\s+/)) {
      const nx = cur ? cur + ' ' + w : w
      if (ctx.measureText(nx).width > maxW && cur) { out.push(cur); cur = w } else cur = nx
    }
    out.push(cur)
  }
  return out
}
/** pop-in / pop-out scale envelope: springs in over 0.3 s from t0, shrinks out over 0.22 s before t1 */
function popEnv(t, t0, t1) {
  if (t < t0 || t > t1) return 0
  const a = easeOutBack(prog(t, t0, t0 + 0.3), 2.2), b = 1 - ease.inCubic(prog(t, t1 - 0.22, t1))
  return Math.min(a, b)
}
/** text tokens: { br } for '|', else { w, accent } (*…* may span words) */
function tokens(text) {
  const out = []; let open = false
  for (const tok of String(text || '').trim().split(/\s+/)) {
    if (!tok) continue
    if (tok === '|') { out.push({ br: true }); continue }
    const stars = (tok.match(/\*/g) || []).length
    out.push({ w: tok.replace(/\*/g, ''), accent: open || stars > 0 })
    if (stars % 2) open = !open
  }
  return out
}
const outWin = (out) => out == null ? [1e9, 1e9] : Array.isArray(out) ? out : [out, out + 0.25]

// ─────────────────────────────────────────────── the recording frame
export function drawRecFrame(ctx, t, { rec = true, battery = 0.8, x0 = 96, y0 = 214, alpha = 1, label = 'REC', time = null } = {}) {
  if (alpha <= 0) return
  const L = 64, Tk = 5, x1 = W - x0, y1 = H - y0
  ctx.save()
  ctx.globalAlpha = 0.82 * alpha
  ctx.fillStyle = '#ffffff'
  ctx.shadowColor = 'rgba(6,4,18,0.7)'; ctx.shadowBlur = 4
  for (const [cx, cy, sx, sy] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]]) {
    ctx.fillRect(sx > 0 ? cx : cx - L, sy > 0 ? cy : cy - Tk, L, Tk)
    ctx.fillRect(sx > 0 ? cx : cx - Tk, sy > 0 ? cy : cy - L, Tk, L)
  }
  ctx.shadowBlur = 0
  // the centre cross (very faint)
  ctx.globalAlpha = 0.18 * alpha
  ctx.fillRect(W / 2 - 18, H / 2 - 1.5, 36, 3); ctx.fillRect(W / 2 - 1.5, H / 2 - 18, 3, 36)
  // REC (top right, above the bracket)
  const rx = x1, ry = y0 - 92
  ctx.font = `700 30px ${MONO}`; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'
  ctx.globalAlpha = 0.95 * alpha
  if (rec) {
    const on = Math.floor(t * 1.6) % 2 === 0
    ctx.fillStyle = 'rgba(6,4,18,0.75)'; ctx.fillText(label, rx + 2, ry + 3)
    ctx.fillStyle = '#ffffff'; ctx.fillText(label, rx, ry)
    const tw = ctx.measureText(label).width
    if (on) {
      ctx.fillStyle = RED; ctx.shadowColor = 'rgba(255,59,79,0.8)'; ctx.shadowBlur = 12
      ctx.beginPath(); ctx.arc(rx - tw - 22, ry, 11, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0
    }
  } else {
    ctx.fillStyle = '#c9c4d6'; ctx.fillText('❚❚ PAUSE', rx, ry)
  }
  // battery (under REC)
  const bw = 58, bh = 26, bx = rx - bw - 8, by = ry + 30
  const low = battery <= 0.2, show = !low || Math.floor(t * 2.4) % 2 === 0
  ctx.fillStyle = 'rgba(6,4,18,0.6)'; ctx.fillRect(bx - 2, by - 2, bw + 14, bh + 4)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(bx, by, bw, 4); ctx.fillRect(bx, by + bh - 4, bw, 4); ctx.fillRect(bx, by, 4, bh); ctx.fillRect(bx + bw - 4, by, 4, bh)
  ctx.fillRect(bx + bw, by + 8, 6, bh - 16)
  if (show) {
    const n = Math.max(low ? 1 : 0, Math.round(clamp(battery) * 4))
    ctx.fillStyle = low ? RED : '#7dffb0'
    for (let i = 0; i < n; i++) ctx.fillRect(bx + 8 + i * 12, by + 8, 8, bh - 16)
  }
  if (time) {
    ctx.font = `700 22px ${MONO}`; ctx.fillStyle = '#ffffff'; ctx.globalAlpha = 0.8 * alpha
    ctx.fillText(time, rx, by + bh + 24)
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the clock
function parseTime(s, ampm) {
  const m = String(s).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i)
  if (!m) return 0
  let h = +m[1] % 12
  const ap = (m[3] || ampm || 'AM').toUpperCase()
  if (ap === 'PM') h += 12
  return h * 60 + +m[2]
}
function fmt(mins) {
  const m = ((Math.floor(mins) % 1440) + 1440) % 1440
  const h24 = Math.floor(m / 60), mm = m % 60
  const h = h24 % 12 || 12
  return { h: String(h), mm: String(mm).padStart(2, '0'), ap: h24 < 12 ? 'AM' : 'PM' }
}
export function drawClock(ctx, t, { from = '7:02', to = from, at = 0, dur = 1, ampm = 'AM', x = 540, y = 150, sign = null, size = 104, eyebrow = null, alpha = 1, ff = true } = {}) {
  let a = parseTime(from, ampm), b = parseTime(to, ampm)
  if (b < a) b += 1440                                   // rolls over midnight
  const p = ease.inOutCubic(prog(t, at, at + dur))
  const running = t > at && t < at + dur && a !== b
  const mins = lerp(a, b, p)
  if (alpha <= 0) return { minutes: mins % 1440 }
  const cur = fmt(mins), nxt = fmt(mins + 1)
  const frac = running ? mins - Math.floor(mins) : 0
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.textBaseline = 'middle'
  ctx.font = `700 ${size}px ${MONO}`
  const cw = ctx.measureText('0').width
  const hhW = ctx.measureText(cur.h).width, colW = ctx.measureText(':').width
  ctx.font = `700 ${Math.round(size * 0.36)}px ${MONO}`
  const apW = ctx.measureText(cur.ap).width
  const total = hhW + colW + 2 * cw + 14 + apW
  let cx = x - total / 2
  ctx.font = `700 ${size}px ${MONO}`; ctx.textAlign = 'left'
  const shadow = (s, px, py) => { ctx.fillStyle = 'rgba(6,4,18,0.85)'; ctx.fillText(s, px + 4, py + 6); ctx.fillStyle = BONE; ctx.fillText(s, px, py) }
  shadow(cur.h, cx, y); cx += hhW
  if (!running || Math.floor(t * 8) % 2 === 0) shadow(':', cx, y)
  cx += colW
  // the minute digits: the ones digit rolls (and the tens when it carries)
  const rollDigit = (d0, d1, px, k) => {
    if (k <= 0 || d0 === d1) { shadow(d0, px, y); return }
    ctx.save(); ctx.beginPath(); ctx.rect(px - 4, y - size * 0.55, cw + 8, size * 1.1); ctx.clip()
    const off = ease.inOutQuad(k) * size * 0.95
    shadow(d0, px, y - off); shadow(d1, px, y + size * 0.95 - off)
    ctx.restore()
  }
  rollDigit(cur.mm[0], nxt.mm[0], cx, frac); cx += cw
  rollDigit(cur.mm[1], nxt.mm[1], cx, frac); cx += cw + 14
  ctx.font = `700 ${Math.round(size * 0.36)}px ${MONO}`
  ctx.fillStyle = 'rgba(6,4,18,0.85)'; ctx.fillText(cur.ap, cx + 3, y + size * 0.2 + 4); ctx.fillStyle = GOLD; ctx.fillText(cur.ap, cx, y + size * 0.2)
  // ▶▶ while fast-forwarding
  if (ff && running && Math.floor(t * 5) % 2 === 0) {
    ctx.fillStyle = '#ffffff'
    const fx = cx, fy = y - size * 0.28
    for (const o of [0, 20]) { ctx.beginPath(); ctx.moveTo(fx + o, fy - 12); ctx.lineTo(fx + o + 18, fy); ctx.lineTo(fx + o, fy + 12); ctx.closePath(); ctx.fill() }
  }
  // the eyebrow
  const s = sign ? daySign(sign) : null
  const eb = eyebrow != null ? eyebrow : s ? `DAY IN THE LIFE OF ${s.article} ${s.glyph} ${s.NAME}` : ''
  if (eb) {
    ctx.textAlign = 'center'
    const ey = y + size * 0.5 + 28
    ctx.font = `700 26px ${MONO}`; ctx.letterSpacing = '4px'
    const parts = s && eyebrow == null ? eb.split(s.glyph) : [eb]
    const wA = ctx.measureText(parts[0]).width
    ctx.font = `700 30px ${GLYPH_FONT}`; const wG = parts.length > 1 ? ctx.measureText(s.glyph).width + 8 : 0
    ctx.font = `700 26px ${MONO}`; const wB = parts.length > 1 ? ctx.measureText(parts[1]).width : 0
    const tot = wA + wG + wB
    // pill behind
    ctx.fillStyle = 'rgba(16,9,38,0.62)'; rrect(ctx, x - tot / 2 - 20, ey - 22, tot + 40, 44, 22); ctx.fill()
    ctx.textAlign = 'left'
    let ex = x - tot / 2
    ctx.fillStyle = BONE; ctx.fillText(parts[0], ex, ey + 1); ex += wA
    if (parts.length > 1) {
      ctx.letterSpacing = '0px'; ctx.font = `700 30px ${GLYPH_FONT}`; ctx.fillStyle = s.color; ctx.fillText(s.glyph, ex + 2, ey + 1); ex += wG
      ctx.letterSpacing = '4px'; ctx.font = `700 26px ${MONO}`; ctx.fillStyle = BONE; ctx.fillText(parts[1], ex, ey + 1)
    }
    ctx.letterSpacing = '0px'
  }
  ctx.restore()
  return { minutes: mins % 1440 }
}
export function clockCues(at, dur, { gain = 0.03 } = {}) {
  const out = [['whoosh', r3(at), Math.min(0.6, dur), gain * 0.8]]
  const n = Math.max(2, Math.round(dur * 9))
  for (let i = 0; i < n; i++) out.push(['tick', r3(at + (i / n) * dur * (0.6 + 0.4 * i / n)), gain * 0.9])
  out.push(['pop', r3(at + dur), 1174.66, gain * 1.4, 0])
  return out
}

// ─────────────────────────────────────────────── DOM: word boxes
function wordBox(parent, text, { size, weight, accentSize, accentColor, color, top, left = 70, width = 940, lineHeight = 1.04 }) {
  const box = el('div', { position: 'absolute', left: left + 'px', width: width + 'px', top: top + 'px', textAlign: 'center', fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color, textShadow: SHADOW, letterSpacing: '-0.01em', pointerEvents: 'none' }, parent)
  const ws = []
  for (const tk of tokens(text)) {
    if (tk.br) { el('br', {}, box); continue }
    const st = { display: 'inline-block', margin: '0 0.02em' }
    if (tk.accent) Object.assign(st, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: accentSize + 'px', color: accentColor, letterSpacing: '0' })
    ws.push({ accent: tk.accent, e: el('span', st, box, tk.w) })
    box.appendChild(document.createTextNode(' '))
  }
  return { box, ws }
}
function fitBox(box, ws, size, accentSize, maxW, floor = 0.6) {
  let widest = 0, cur = 0
  for (const n of box.childNodes) {
    if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
    cur += n.offsetWidth + 0.24 * (parseFloat(n.style.fontSize) || size)
  }
  widest = Math.max(widest, cur)
  if (!(widest > maxW)) return 1
  const k = Math.max(floor, (maxW - 8) / widest)
  box.style.fontSize = (size * k) + 'px'
  for (const w of ws) if (w.accent) w.e.style.fontSize = (accentSize * k) + 'px'
  return k
}

// ─────────────────────────────────────────────── the hook
export function hookPOV(root, { text, at = 0, out, top = 260, size = 96, accentSize = 140, accentColor = GOLD, color = BONE } = {}) {
  const { box, ws } = wordBox(root, text, { size, weight: 800, accentSize, accentColor, color, top })
  if (String(text).includes('|')) fitBox(box, ws, size, accentSize, 940)     // explicit lines: shrink to fit; else it wraps
  box.style.transformOrigin = '50% 40%'
  const [o0, o1] = outWin(out)
  const popOut = !Array.isArray(out)
  return {
    root: box,
    update(t) {
      if (t < at || t >= o1) { box.style.display = 'none'; return }
      box.style.display = 'block'
      let sx = 0, sy = 0, sc = 1, op = 1
      const f = Math.floor((t - at) * 30)                      // the 2-frame shake at at + 0.1
      if (t >= at + 0.1 && t < at + 0.1 + 2 / 30) { sx = f % 2 ? -7 : 8; sy = f % 2 ? 4 : -3 }
      if (t >= o0) {
        const p = prog(t, o0, o1)
        if (popOut) { sc = p < 0.35 ? 1 + 0.08 * (p / 0.35) : 1.08 * (1 - ease.inCubic((p - 0.35) / 0.65)); op = 1 - ease.inQuad(prog(p, 0.4, 1)) }
        else op = 1 - ease.inQuad(p)
      }
      box.style.opacity = String(op)
      box.style.transform = `translate(${sx}px, ${sy}px) scale(${sc.toFixed(4)})`
    },
  }
}
export function hookPOVCues(at = 0, { key = null } = {}) {
  void key   // pop / pluck / bell are moved into the film's key by the engine
  return [
    ['boom', r3(at + 0.02), 0.22],
    ['pop', r3(at + 0.1), 1318.51, 0.05, 0], ['pop', r3(at + 0.16), 1760, 0.035, 0.2],
    ['tick', r3(at + 0.1), 0.06],
    ['bell', r3(at + 0.12), 1760, 0.02, 0.8, 0],
  ]
}

// ─────────────────────────────────────────────── timestamp captions
export function stampCaption(root, { at, out, time = '7:05 AM', text = '', top = 1530, accentColor = GOLD, size = 46 } = {}) {
  const wrapEl = el('div', { position: 'absolute', left: '0', width: W + 'px', top: top + 'px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const pill = el('div', { maxWidth: '920px', padding: '16px 30px 18px', borderRadius: '30px', background: 'rgba(16,9,38,0.72)', border: '2px solid rgba(239,230,214,0.18)', boxShadow: '0 6px 24px rgba(6,4,18,0.55)', fontFamily: INTER, fontWeight: 600, fontSize: size + 'px', lineHeight: 1.18, color: BONE, textAlign: 'center', transformOrigin: '50% 100%' }, wrapEl)
  el('span', { fontFamily: MONO, fontWeight: 700, fontSize: Math.round(size * 0.82) + 'px', color: GOLD, letterSpacing: '0.02em' }, pill, time)
  el('span', { color: 'rgba(239,230,214,0.6)', margin: '0 0.3em' }, pill, '—')
  pill.appendChild(document.createTextNode(' '))
  for (const tk of tokens(text)) {
    if (tk.br) { el('br', {}, pill); continue }
    const st = { display: 'inline' }
    if (tk.accent) Object.assign(st, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: Math.round(size * 1.28) + 'px', color: accentColor, lineHeight: '0.9' })
    el('span', st, pill, tk.w)
    pill.appendChild(document.createTextNode(' '))
  }
  const [o0, o1] = outWin(out)
  const popOut = !Array.isArray(out)
  return {
    root: wrapEl,
    update(t) {
      if (t < at || t >= o1) { wrapEl.style.display = 'none'; return }
      wrapEl.style.display = 'flex'
      const p = prog(t, at, at + 0.32)
      let sc = 0.7 + 0.3 * easeOutBack(p, 2.4), y = (1 - ease.outCubic(p)) * 40, op = clamp(p * 3)
      if (t >= o0) {
        const q = prog(t, o0, o1)
        if (popOut) { sc *= 1 - 0.3 * ease.inCubic(q); y -= 14 * q }
        op *= 1 - ease.inQuad(q)
      }
      pill.style.opacity = String(op)
      pill.style.transform = `translateY(${y.toFixed(2)}px) scale(${sc.toFixed(4)})`
    },
  }
}
export function stampCues(at, { gain = 0.04 } = {}) {
  return [['tick', r3(at), gain * 1.6], ['tick', r3(at + 0.05), gain], ['pop', r3(at + 0.08), 987.77, gain, 0]]
}

// ─────────────────────────────────────────────── the sky by hour
// keyframes around the clock: [hour, top colour, bottom colour, tint alpha, star boost]
const SKY_KEYS = [
  [0, '#0b0a3a', '#1a1250', 0.55, 1],
  [3, '#080733', '#15104a', 0.6, 1],
  [5, '#2a2058', '#7a4f78', 0.45, 0.5],
  [6.5, '#f3a98a', '#ffd7b0', 0.6, 0.1],       // dawn: peach
  [8.5, '#a9cbe6', '#f6dcc0', 0.55, 0],
  [12, '#9fd0f4', '#d8ecfa', 0.64, 0],          // noon: pale blue, stars dimmed
  [16, '#8fbde6', '#f2d4b8', 0.55, 0],
  [19, '#7a4aa8', '#ff8fae', 0.58, 0.15],       // dusk: violet-pink
  [21, '#2a1e66', '#5a3478', 0.5, 0.6],
  [24, '#0b0a3a', '#1a1250', 0.55, 1],
]
function mixHex(a, b, k) {
  const A = hexToRgb(a), B = hexToRgb(b)
  return A.map((v, i) => Math.round(lerp(v, B[i], k)))
}
function skyAt(hour) {
  const h = ((hour % 24) + 24) % 24
  let i = 0
  while (i < SKY_KEYS.length - 2 && SKY_KEYS[i + 1][0] <= h) i++
  const A = SKY_KEYS[i], B = SKY_KEYS[i + 1], k = ease.inOutQuad(prog(h, A[0], B[0]))
  return { top: mixHex(A[1], B[1], k), bot: mixHex(A[2], B[2], k), a: lerp(A[3], B[3], k), stars: lerp(A[4], B[4], k) }
}
export function daySky(ctx, t, { hour = 12, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const s = skyAt(hour)
  const day = 1 - s.stars                              // daytime: a pale wash that also dims the stars
  ctx.save()
  // the tint (soft-light for night keeps the nebula; a plain wash for day dims the stars)
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, `rgba(${s.top},1)`); g.addColorStop(1, `rgba(${s.bot},1)`)
  ctx.globalAlpha = s.a * alpha * (0.55 + 0.45 * day)
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  ctx.globalAlpha = s.a * alpha * 0.5 * s.stars
  ctx.globalCompositeOperation = 'multiply'; ctx.fillRect(0, 0, W, H)
  ctx.globalCompositeOperation = 'source-over'
  // night: every star out
  if (s.stars > 0.05) {
    ctx.globalAlpha = 1
    for (let i = 0; i < 90; i++) {
      const sx = (i * 397.3 + 71) % W, sy = (i * 211.7 + 37) % (H * 0.62)
      const tw = 0.4 + 0.6 * noise1(t * (0.6 + (i % 5) * 0.25), i + 3)
      const a = s.stars * alpha * tw * (i % 7 === 0 ? 1 : 0.65)
      if (a < 0.03) continue
      ctx.fillStyle = `rgba(255,${240 - (i % 3) * 18},${220 + (i % 4) * 9},${a.toFixed(3)})`
      const sz = i % 11 === 0 ? 5 : i % 3 === 0 ? 3 : 2
      ctx.fillRect(Math.round(sx), Math.round(sy), sz, sz)
      if (sz === 5 && tw > 0.75) { ctx.fillRect(Math.round(sx) - 4, Math.round(sy) + 2, 13, 1); ctx.fillRect(Math.round(sx) + 2, Math.round(sy) - 4, 1, 13) }
    }
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the fact chip
export function factChip(ctx, t, { text, at, dur = 2.4, x = 540, y = 1300, color = GOLD, label = '★ REAL SKY', w = 760, size = 34 } = {}) {
  const k = popEnv(t, at, at + 0.3 + dur + 0.22)
  if (k <= 0.001) return null
  ctx.save()
  ctx.font = `600 ${size}px ${INTER}`
  const lines = wrap(ctx, text, w - 64)
  const lh = Math.round(size * 1.24), hh = 30 + 14 + lines.length * lh + 24
  ctx.translate(x, y + hh / 2); ctx.scale(k, k); ctx.rotate(-0.012); ctx.translate(-x, -(y + hh / 2))
  ctx.globalAlpha = clamp(k * 2)
  pixPanel(ctx, x - w / 2, y, w, hh, { fill: 'rgba(14,8,34,0.93)', border: color, P: 5 })
  // the label tab
  ctx.font = `700 22px ${MONO}`; ctx.letterSpacing = '3px'
  const lw = ctx.measureText(label).width + label.length * 3 + 34
  ctx.fillStyle = color; ctx.fillRect(x - lw / 2, y - 16, lw, 34)
  ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, x + 1.5, y + 1)
  ctx.letterSpacing = '0px'
  // the shine sweep
  const sp = prog(t, at + 0.15, at + 0.75)
  if (sp > 0 && sp < 1) {
    ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y, w, hh); ctx.clip()
    const sxp = x - w / 2 + sp * (w + 200) - 100
    const g = ctx.createLinearGradient(sxp - 60, 0, sxp + 60, 0)
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,255,255,0.18)'); g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g; ctx.fillRect(x - w / 2, y, w, hh); ctx.restore()
  }
  ctx.font = `600 ${size}px ${INTER}`; ctx.fillStyle = BONE
  lines.forEach((l, i) => ctx.fillText(l, x, y + 30 + 10 + i * lh + lh / 2))
  ctx.restore()
  return { h: hh }
}
export function factChipCues(at, { dur = 2.4 } = {}) {
  return [['pop', r3(at + 0.02), 1567.98, 0.04, 0], ['bell', r3(at + 0.1), 2093, 0.022, 1.2, 0.1], ['glitter', r3(at), r3(at + 0.5)], ['tick', r3(at + 0.3 + dur), 0.025]]
}

// ─────────────────────────────────────────────── the phone
const PH = { body: '#17132a', rim: '#3a3358', screen: '#0f0c1f', grey: '#2c2840', grey2: '#3b3654', txt: '#efe6d6', dim: '#9a93b5' }
export function phoneScreen(ctx, t, { x, y, w = 380, h = 680, lines = [], app = 'chat', title = null, clock = '9:41', alpha = 1, rot = 0, pop = 1, accent = '#5fa8ff', glow = 0.5, size = 26 } = {}) {
  if (alpha <= 0 || pop <= 0.01) return
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(pop, pop)
  // alarm shake
  if (app === 'alarm' && lines[0]) {
    const a0 = lines[0].at ?? 0, a1 = lines[0].stop ?? 1e9
    if (t > a0 && t < a1) ctx.rotate(0.05 * Math.sin(t * 60) * (Math.floor(t * 2) % 2 ? 1 : 0.3))
  }
  const x0 = -w / 2, y0 = -h / 2
  // glow
  if (glow > 0) { ctx.save(); ctx.shadowColor = `rgba(150,180,255,${0.5 * glow})`; ctx.shadowBlur = 40; ctx.fillStyle = PH.body; rrect(ctx, x0, y0, w, h, 44); ctx.fill(); ctx.restore() }
  ctx.fillStyle = '#06040c'; rrect(ctx, x0 - 6, y0 - 6, w + 12, h + 12, 50); ctx.fill()
  ctx.fillStyle = PH.rim; rrect(ctx, x0, y0, w, h, 44); ctx.fill()
  ctx.fillStyle = PH.body; rrect(ctx, x0 + 6, y0 + 6, w - 12, h - 12, 38); ctx.fill()
  const sx = x0 + 18, sy = y0 + 18, sw = w - 36, sh = h - 36
  ctx.save(); rrect(ctx, sx, sy, sw, sh, 28); ctx.clip()
  ctx.fillStyle = app === 'notes' ? '#f6eccb' : PH.screen; ctx.fillRect(sx, sy, sw, sh)
  const ink = app === 'notes' ? '#2b2236' : PH.txt
  // status bar + notch
  ctx.fillStyle = ink; ctx.font = `700 18px ${MONO}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  ctx.fillText(clock, sx + 22, sy + 24)
  ctx.textAlign = 'right'; ctx.fillRect(sx + sw - 50, sy + 18, 28, 12); ctx.fillRect(sx + sw - 22, sy + 21, 3, 6)
  for (let i = 0; i < 3; i++) ctx.fillRect(sx + sw - 82 + i * 8, sy + 28 - i * 4, 5, 4 + i * 4)
  ctx.fillStyle = '#06040c'; rrect(ctx, -46, sy + 10, 92, 26, 13); ctx.fill()
  const cy0 = sy + 50
  if (app === 'chat') drawChat(ctx, t, { sx, sy: cy0, sw, sh: sh - 50, lines, title, accent, size })
  else if (app === 'notes') drawNotes(ctx, t, { sx, sy: cy0, sw, sh: sh - 50, lines, title, size })
  else if (app === 'alarm') drawAlarm(ctx, t, { sx, sy: cy0, sw, sh: sh - 50, lines, title, accent })
  else if (app === 'map') drawMap(ctx, t, { sx, sy: cy0, sw, sh: sh - 50, lines, title, accent })
  else if (app === 'playlist') drawPlaylist(ctx, t, { sx, sy: cy0, sw, sh: sh - 50, lines, title, accent })
  ctx.restore()
  // home bar
  ctx.fillStyle = 'rgba(239,230,214,0.5)'; rrect(ctx, -50, y0 + h - 30, 100, 6, 3); ctx.fill()
  ctx.restore()
}
function appBar(ctx, { sx, sy, sw }, title, dark = true) {
  ctx.fillStyle = dark ? '#1c1830' : '#efe2b8'; ctx.fillRect(sx, sy, sw, 56)
  ctx.fillStyle = dark ? PH.txt : '#2b2236'; ctx.font = `700 22px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(title, sx + sw / 2, sy + 28)
  return sy + 56
}
function drawChat(ctx, t, { sx, sy, sw, sh, lines, title, accent, size }) {
  const top = appBar(ctx, { sx, sy, sw }, title || 'group chat')
  ctx.font = `500 ${size}px ${INTER}`
  const maxB = sw * 0.72, lh = Math.round(size * 1.25), pad = 14
  // lay out all bubbles that have arrived (plus the typing dots of the next one)
  const items = []
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i], at = L.at ?? 0
    const me = L.from === 'me'
    if (t >= at) {
      ctx.font = `500 ${size}px ${INTER}`
      const ls = wrap(ctx, L.text, maxB - 2 * pad)
      const bw = Math.min(maxB, Math.max(...ls.map(l => ctx.measureText(l).width)) + 2 * pad)
      items.push({ me, from: L.from, ls, bw, bh: ls.length * lh + 2 * pad - 4, at, name: !me && (i === 0 || lines[i - 1].from !== L.from) })
    } else if (t >= at - 0.5 && !me) { items.push({ typing: true, me, at: at - 0.5, bw: 80, bh: 44 }); break }
  }
  // stack from the bottom up, newest at the bottom
  let yy = sy + sh - 16
  const placed = []
  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i], nameH = it.name ? 26 : 0
    yy -= it.bh; placed.push({ ...it, y: yy }); yy -= 12 + nameH
    if (yy < top - 400) break
  }
  ctx.save(); ctx.beginPath(); ctx.rect(sx, top, sw, sh - (top - sy)); ctx.clip()
  for (const it of placed) {
    const k = easeOutBack(prog(t, it.at, it.at + 0.25), 2)
    const bx = it.me ? sx + sw - 14 - it.bw : sx + 14
    ctx.save(); ctx.translate(it.me ? bx + it.bw : bx, it.y + it.bh); ctx.scale(k, k); ctx.translate(-(it.me ? bx + it.bw : bx), -(it.y + it.bh))
    if (it.name) { ctx.fillStyle = PH.dim; ctx.font = `700 17px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(String(it.from).toUpperCase(), bx + 6, it.y - 14) }
    ctx.fillStyle = it.me ? accent : PH.grey2; rrect(ctx, bx, it.y, it.bw, it.bh, 20); ctx.fill()
    if (it.typing) {
      for (let d = 0; d < 3; d++) { const b = Math.sin(t * 9 - d * 0.9) * 4; ctx.fillStyle = PH.txt; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(bx + 22 + d * 18, it.y + it.bh / 2 + b, 5, 0, Math.PI * 2); ctx.fill() }
      ctx.globalAlpha = 1
    } else {
      ctx.fillStyle = it.me ? '#ffffff' : PH.txt; ctx.font = `500 ${size}px ${INTER}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
      it.ls.forEach((l, j) => ctx.fillText(l, bx + pad, it.y + pad + j * lh + lh / 2 - 2))
    }
    ctx.restore()
  }
  ctx.restore()
}
function drawNotes(ctx, t, { sx, sy, sw, sh, lines, title, size }) {
  let yy = appBar(ctx, { sx, sy, sw }, title || 'Notes', false) + 30
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  for (const L of lines) {
    const at = L.at ?? 0
    if (t < at) break
    const raw = String(L.text), box = raw.match(/^\[( |x)\]\s*/)
    const body = box ? raw.slice(box[0].length) : raw
    const n = Math.floor((t - at) * 26), shown = body.slice(0, n)
    let tx = sx + 24
    if (box) {
      ctx.strokeStyle = '#2b2236'; ctx.lineWidth = 3; ctx.strokeRect(tx, yy - 12, 24, 24)
      if (box[1] === 'x' || (L.check != null && t >= L.check)) { ctx.strokeStyle = '#d0453a'; ctx.beginPath(); ctx.moveTo(tx + 4, yy); ctx.lineTo(tx + 10, yy + 8); ctx.lineTo(tx + 22, yy - 10); ctx.stroke() }
      tx += 38
    }
    ctx.font = `500 ${size}px ${INTER}`; ctx.fillStyle = '#2b2236'
    const ls = wrap(ctx, shown, sw - (tx - sx) - 20)
    ls.forEach((l, j) => ctx.fillText(l, tx, yy + j * size * 1.25))
    if (n < body.length && Math.floor(t * 4) % 2 === 0) { const lw = ctx.measureText(ls[ls.length - 1] || '').width; ctx.fillRect(tx + lw + 3, yy + (ls.length - 1) * size * 1.25 - size * 0.5, 3, size) }
    yy += Math.max(1, ls.length) * size * 1.25 + 16
    ctx.fillStyle = 'rgba(43,34,54,0.12)'; ctx.fillRect(sx + 16, yy - 8, sw - 32, 2)
  }
}
function drawAlarm(ctx, t, { sx, sy, sw, sh, lines, title, accent }) {
  const L0 = lines[0] || { text: '6:00', at: 0 }, ringing = t > (L0.at ?? 0) && t < (L0.stop ?? 1e9)
  const cx = sx + sw / 2
  if (ringing && Math.floor(t * 4) % 2 === 0) { ctx.fillStyle = 'rgba(255,90,90,0.16)'; ctx.fillRect(sx, sy - 50, sw, sh + 50) }
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = PH.dim; ctx.font = `700 20px ${MONO}`; ctx.fillText('ALARM', cx, sy + 60)
  ctx.fillStyle = PH.txt; ctx.font = `700 ${Math.round(sw * 0.3)}px ${MONO}`; ctx.fillText(L0.text, cx, sy + 160)
  if (lines[1]) { ctx.font = `600 24px ${INTER}`; ctx.fillStyle = PH.txt; ctx.fillText(lines[1].text, cx, sy + 240) }
  // the bell
  const by = sy + 340, sw2 = ringing ? Math.sin(t * 40) * 0.3 : 0
  ctx.save(); ctx.translate(cx, by - 40); ctx.rotate(sw2); ctx.fillStyle = GOLD
  ctx.beginPath(); ctx.moveTo(-34, 30); ctx.quadraticCurveTo(-34, -34, 0, -38); ctx.quadraticCurveTo(34, -34, 34, 30); ctx.closePath(); ctx.fill()
  ctx.fillRect(-42, 26, 84, 10); ctx.beginPath(); ctx.arc(0, 44, 9, 0, Math.PI * 2); ctx.fill(); ctx.restore()
  if (ringing) { ctx.strokeStyle = GOLD; ctx.lineWidth = 4; for (const s of [-1, 1]) for (const r of [60, 80]) { ctx.beginPath(); ctx.arc(cx, by - 40, r, s > 0 ? -0.5 : Math.PI - 0.5 + 0.0, s > 0 ? 0.5 : Math.PI + 0.5); ctx.stroke() } }
  // buttons
  const bw = sw - 60, b1 = sy + sh - 190
  ctx.fillStyle = accent; rrect(ctx, sx + 30, b1, bw, 70, 35); ctx.fill()
  ctx.fillStyle = '#fff'; ctx.font = `700 28px ${INTER}`; ctx.fillText(title || 'Snooze', cx, b1 + 36)
  ctx.fillStyle = PH.grey2; rrect(ctx, sx + 30, b1 + 90, bw, 70, 35); ctx.fill()
  ctx.fillStyle = PH.txt; ctx.fillText('Stop', cx, b1 + 126)
}
function drawMap(ctx, t, { sx, sy, sw, sh, lines, title, accent }) {
  const top = appBar(ctx, { sx, sy, sw }, title || 'Maps')
  ctx.fillStyle = '#1d2a24'; ctx.fillRect(sx, top, sw, sh - (top - sy))
  ctx.fillStyle = '#2c3d33'
  for (let i = 0; i < 9; i++) ctx.fillRect(sx + (i * 61) % sw, top, 14, sh)
  for (let i = 0; i < 12; i++) ctx.fillRect(sx, top + 20 + i * 58, sw, 12)
  ctx.fillStyle = '#25485a'; ctx.beginPath(); ctx.ellipse(sx + sw * 0.75, top + sh * 0.62, 70, 40, 0.4, 0, Math.PI * 2); ctx.fill()
  // the route
  const pts = [[0.2, 0.85], [0.2, 0.62], [0.55, 0.62], [0.55, 0.35], [0.78, 0.35], [0.78, 0.16]].map(([a, b]) => [sx + a * sw, top + b * (sh - (top - sy))])
  const a0 = lines[0]?.at ?? 0, p = prog(t, a0, a0 + 2.2)
  ctx.strokeStyle = accent; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath(); ctx.moveTo(...pts[0])
  const segs = pts.length - 1, f = p * segs
  for (let i = 1; i <= segs; i++) { if (f >= i) ctx.lineTo(...pts[i]); else { const k = f - (i - 1); if (k > 0) ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)); break } }
  ctx.stroke()
  const end = pts[pts.length - 1], bob = Math.sin(t * 5) * 4
  ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(end[0], end[1] - 26 + bob, 16, Math.PI, 0); ctx.lineTo(end[0], end[1] + bob); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(end[0], end[1] - 26 + bob, 6, 0, Math.PI * 2); ctx.fill()
  // toasts
  const cur = [...lines].reverse().find(L => t >= (L.at ?? 0))
  if (cur) {
    ctx.fillStyle = 'rgba(16,9,38,0.92)'; rrect(ctx, sx + 16, sy + sh - 90, sw - 32, 70, 16); ctx.fill()
    ctx.fillStyle = PH.txt; ctx.font = `600 22px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(cur.text, sx + sw / 2, sy + sh - 55)
  }
}
function drawPlaylist(ctx, t, { sx, sy, sw, sh, lines, title, accent }) {
  const top = appBar(ctx, { sx, sy, sw }, title || 'Now Playing')
  let cur = -1
  lines.forEach((L, i) => { if (t >= (L.at ?? 0)) cur = i })
  // cover art: a pixel record
  const cx = sx + sw / 2, cy = top + 120
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 1.5)
  ctx.fillStyle = '#0a0812'; ctx.beginPath(); ctx.arc(0, 0, 86, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = '#2a2640'; ctx.lineWidth = 2; for (const r of [40, 56, 72]) { ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke() }
  ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(0, 0, 26, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#fff'; ctx.fillRect(-3, -60, 6, 14)
  ctx.restore()
  // bars
  for (let i = 0; i < 9; i++) {
    const hh = cur >= 0 ? 10 + 26 * Math.abs(Math.sin(t * (4 + i * 0.7) + i)) : 6
    ctx.fillStyle = accent; ctx.fillRect(cx - 90 + i * 20, top + 250 - hh, 12, hh)
  }
  // list
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  lines.forEach((L, i) => {
    const yy = top + 290 + i * 62
    if (yy > sy + sh - 30) return
    if (i === cur) { ctx.fillStyle = 'rgba(95,168,255,0.18)'; ctx.fillRect(sx + 8, yy - 28, sw - 16, 56) }
    ctx.fillStyle = i === cur ? '#fff' : PH.txt; ctx.font = `700 22px ${INTER}`; ctx.fillText(L.text, sx + 24, yy - 8)
    if (L.from) { ctx.fillStyle = PH.dim; ctx.font = `500 17px ${INTER}`; ctx.fillText(L.from, sx + 24, yy + 16) }
  })
}
export function phoneCues(lines, { app = 'chat', gain = 0.035 } = {}) {
  const out = []
  for (const L of lines) {
    const at = L.at ?? 0
    if (app === 'chat') out.push(['pop', r3(at), L.from === 'me' ? 1174.66 : 1567.98, gain, L.from === 'me' ? 0.2 : -0.2], ['pop', r3(at + 0.07), L.from === 'me' ? 1567.98 : 2093, gain * 0.7, 0])
    else if (app === 'notes') { const n = String(L.text).length; for (let i = 0; i < n; i += 3) out.push(['tick', r3(at + i / 26), gain * 0.5]) }
    else if (app === 'alarm') { const stop = Math.min(L.stop ?? at + 2, at + 3); for (let b = at; b < stop; b += 0.25) out.push(['pop', r3(b), 1760, gain * 1.2, 0]) }
    else out.push(['pop', r3(at), 1318.51, gain, 0])
    if (app === 'alarm') break
  }
  return out
}
