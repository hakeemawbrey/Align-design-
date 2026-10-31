// sthot — the shared kit of Star Talk season 12 "Hot Takes" (promo/films/STARTALK14.md), owned by the E01 session.
// Every episode is the same five beats: THE TAKE (frame 0) → HEAT METER → OBJECTION! → THE VERDICT → AGREE / DISAGREE?,
// then the shared end card. This file draws all five so the 35 episodes read as one show.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues,
//            cityStar, CITIES, drawFlame, drawIce, drawHotSet, drawPodium, objectionShake, slamShake, HOT, HOT_FONTS,
//            loadHotFonts } from '../../sthot.js'
//
// await loadHotFonts()   in build(), before any DOM type (Inter 800/900, EB Garamond italic, Space Mono 700).
//
// hotStamp(root, { take, at = 0, out, accentColor = HOT.gold, top = 176, size = 104, accentSize = size·1.35,
//                  stampY = 0, label = 'HOT TAKE' })  → { root, update(t), end }
//   THE TAKE: a flaming pixel stamp (Space Mono, gold-to-red gradient, two pixel flames, embers) and under it the take
//   (Inter 800 bone, '*word*' = the EB Garamond italic accent, ' | ' = a line break; shrinks to fit 940 px).
//   It is FULLY on screen at t = at (default 0: frame 0 is the thumbnail), settles from a 1.08 scale over 0.3 s, then
//   simmers (flames flicker, the accent glows). out = [a, b]: fades + shrinks away over it; hidden from b on.
//   Hold the take ≥ 2.5 s: out[0] − at ≥ 2.5. Call it in build() after your scene canvas; call update(t) every frame.
//   The stamp is ~150 px tall from `top`; the take starts at top + 168. Two lines at 104 px end near top + 410.
//
// heatMeter(ctx, t, { level, at, x = 1018, y = 84, out = null, scale = 1, label = 'HEAT' })
//   A dark pixel pill with HEAT and 5 flame slots; slot i (i < level) ignites at at + 0.2·i with a pop. Lit flames
//   flicker; a full 5/5 row shakes and glows red. (x, y) = the pill's RIGHT edge, vertical centre (top-right corner by
//   default, under the frame's numeral corner). out = [a, b] fades it. ignite(i) times: heatTimes(at, level).
//
// objection(ctx, t, { at, x = 540, y = 760, dur = 1.5, text = 'OBJECTION!', color = HOT.red, rot = -0.08, scale = 1 })
//   The burst graphic: a jagged red/gold comic burst with OBJECTION! in Inter 900 italic, slamming in (2.2 → 1, with
//   speed lines and a pixel debris ring), then fading over its last 0.25 s. objectionShake(t, at) → a px offset to shake
//   your scene with (≈ 14 px, decays over 0.4 s).
//
// hotCues(at = 0, { key = 'D', level = 0, meterAt = null }) → cues: the stamp ignites (whoosh, low boom, crash, a
//   rising chip stab in key, a fire crackle). Pass level + meterAt to add heatCues(meterAt, level) too.
// heatCues(at, level) → one rising pop per flame (+ a crash on 5/5).
// objectionCues(at, { key }) → the record scratch (two chip slides + a noisy whoosh), a slam boom and a crash.
//
// verdictCard(root, { text, at, out, title = 'THE STARS RULE:', top = 600, size = 70, align = 'center', accentColor = HOT.gold,
//                     dim = 0.6, tab = 'VERDICT' }) → { root, update(t), slam, end, words }
//   THE VERDICT (its own style, not a ★ LESSON): a full-frame scrim, a crimson judge's card with a gold stepped border
//   and a red VERDICT tab, a pixel gavel swinging down onto its sound block (slam = at + 0.32: shake the card, a dust
//   puff), the title in Space Mono, then the verdict pops in word by word (Inter 800, '*…*' accent, ' | ' break,
//   shrinks to fit). end = when the last word is in. Hold it ≥ 2.5 s after end. Call update(t) every frame.
// verdictCues(at, { text, key }) → the gavel (whoosh + boom + wood knock), the title blip, one pop per word.
//
// agreePill(ctx, t, { at, dur = 0.9, x = 540, y = 1560, pick = null, scale = 1 })
//   AGREE / DISAGREE?: a pill with two pixel buttons (a flame AGREE · an ice cube DISAGREE) popping up at at, staying
//   dur, popping out. pick = 'agree' | 'disagree' | null: a pixel cursor taps that button mid-way.
// agreeCues(at, { dur = 0.9, pick = null }) → pop in, the two buttons' blips, a tap, pop out.
//
// cityStar(ctx, x, y, size, t, { city, prop, badge = true, ...drawStarChar opts }) → drawStarChar's { x, y, size, top }
//   A city star: a plain star in its city colour with a small city badge (HOU, ATX, DAL, SA, NYC, LA, MIA, CHI, ATL)
//   and one affectionate prop. CITIES[city] = { color, name, prop }. Default props: HOU cowboy hat · ATX guitar ·
//   DAL tiny blazer · SA paper flower · NYC coffee cup · LA sunglasses · MIA visor · CHI beanie · ATL peach.
//   prop overrides: any of 'hat' 'guitar' 'blazer' 'flower' 'coffee' 'shades' 'visor' 'beanie' 'peach' 'fan' 'napkin'
//   'sweat' or false (none). An array of props is fine: ['shades', 'sweat'].
//
// drawFlame(ctx, x, y, s, t, { seed = 1, lit = 1, alpha = 1 })   a pixel flame; (x, y) = its base centre, s = cell px
//   (a flame is 7 × 10 cells). lit 0 = a grey unlit slot.
// drawIce(ctx, x, y, s, t, { alpha = 1 })   a pixel ice cube; (x, y) = centre, s = cell px (8 × 8 cells).
// drawHotSet(ctx, t, { heat = 0.5, dim = 0.5, floorY = 1290, spot = null })   the season's debate set behind the cast:
//   a warm studio wall with a big glowing HOT TAKES sign-wall of pixel flames, a stage floor and two light cones.
//   heat 0…1 warms it toward red. spot = 'left' | 'right' | null brightens that side's cone (who's talking).
// drawPodium(ctx, x, y, w, { color = HOT.gold, label = '', alpha = 1 })   a pixel podium, (x, y) = top centre.
// slamShake(t, t0, amp = 12, len = 0.4) → px offset, generic decaying shake.
// HOT = palette; HOT_FONTS = the font strings loadHotFonts() loads.
// Pure f(t) everywhere; nothing touches `document` at module top level (the sound build imports this in node).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el } from '../src/lib.js'
import { drawPixelStar, drawGrain, layerCanvas } from './sky.js'
import { easeOutBack, GRAIN_H } from './wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from './startalk.js'
import { popText } from './lesson.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from './endcard.js'
import { cardFrame } from './cardfx.js'
import { fill } from '../src/scenes/common.js'

export const HOT = {
  gold: '#ffd23f', amber: '#ffb03a', orange: '#ff8a2a', red: '#ff3b3b', deep: '#b3122e', crimson: '#5a0f2a',
  ice: '#8fe6ff', iceDeep: '#2f8fd8', bone: '#efe6d6', ink: '#1b1236', mint: '#7dffb0', plum: '#2a1240',
}
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const SHADOW = '0 5px 0 rgba(27,18,54,0.9), 0 0 30px rgba(6,4,18,0.85)'
export const HOT_FONTS = ['800 104px Inter', '900 120px Inter', 'italic 900 120px Inter', "italic 500 150px 'EB Garamond'", "700 64px 'Space Mono'", "700 30px 'Space Mono'"]
export async function loadHotFonts() { try { await Promise.all(HOT_FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ } }

const r3 = v => +v.toFixed(3)
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
const outK = (t, out) => out ? 1 - ease.inQuad(prog(t, out[0], out[1])) : 1
export function slamShake(t, t0, amp = 12, len = 0.4) {
  const d = t - t0
  if (d < 0 || d > len) return 0
  return amp * Math.sin(d * 70) * (1 - d / len) ** 2
}
export const objectionShake = (t, at) => slamShake(t, at, 14, 0.42)

// ─────────────────────────────────────────────── pixel flame + ice cube
const FLAME = [   // 7 × 10, three flicker frames; R red, O orange, Y yellow, W white-hot
  ['...R...', '..RR...', '..ROR..', '.RROR..', '.ROOOR.', 'RROYOR.', 'ROYYOOR', 'ROYWYOR', 'ROYWYOR', '.ROOOR.'],
  ['...R...', '...RR..', '..RORR.', '..ROOR.', '.ROOOR.', '.ROYOOR', 'ROYYYOR', 'ROYWWOR', 'ROYWYOR', '.ROOOR.'],
  ['..R....', '..RR...', '.RROR..', '.ROOR..', '.ROYOR.', 'RROYOR.', 'ROYYOOR', 'ROYWYOR', 'ROOWYOR', '.ROOOR.'],
]
const FC = { R: HOT.red, O: HOT.orange, Y: HOT.gold, W: '#fff6d8' }
const FC_OFF = { R: '#4a3a62', O: '#3a2c52', Y: '#33284a', W: '#2e2444' }
export function drawFlame(x, px, py, s, t, { seed = 1, lit = 1, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const f = FLAME[Math.floor(t * 9 + seed * 1.7) % 3]
  x.save(); x.globalAlpha *= alpha
  const ox = px - 3.5 * s, oy = py - 10 * s
  if (lit > 0.01) {
    const g = x.createRadialGradient(px, py - 4 * s, 0, px, py - 4 * s, 9 * s)
    g.addColorStop(0, rgba(HOT.orange, 0.45 * lit)); g.addColorStop(1, rgba(HOT.red, 0))
    x.fillStyle = g; x.fillRect(px - 9 * s, py - 13 * s, 18 * s, 18 * s)
  }
  // ink outline: draw the shape one cell out in ink first
  f.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') R(x, HOT.ink, ox + (i - 0.5) * s, oy + (j - 0.5) * s, s * 2, s * 2) }))
  f.forEach((row, j) => [...row].forEach((ch, i) => {
    if (ch === '.') return
    R(x, lit >= 0.5 ? FC[ch] : FC_OFF[ch], ox + i * s, oy + j * s, s + 0.5, s + 0.5)
  }))
  x.restore()
}
const ICE = ['.WWWWWW.', 'WIIIIIIW', 'WIWIIIBW', 'WIIIIIBW', 'WIIIIIBW', 'WIIIIBBW', 'WBBBBBBW', '.WWWWWW.']
export function drawIce(x, px, py, s, t, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const ox = px - 4 * s, oy = py - 4 * s
  R(x, HOT.ink, ox - s, oy - s, 10 * s, 10 * s)
  const C = { W: '#e8fbff', I: HOT.ice, B: HOT.iceDeep }
  ICE.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') R(x, C[ch], ox + i * s, oy + j * s, s + 0.5, s + 0.5) }))
  if (Math.floor(t * 2) % 3 === 0) { R(x, '#ffffff', ox + 2 * s, oy + 2 * s, s, s); R(x, '#ffffff', ox + 1 * s, oy + 2 * s, s * 0.5, s) }
  x.restore()
}

// ─────────────────────────────────────────────── words (the take, the verdict)
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
function wordBox(parent, text, { size, accentSize, accentColor, color = HOT.bone, weight = 800, lineHeight = 1.04 }, place) {
  const box = el('div', { position: 'absolute', textAlign: 'center', fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color, textShadow: SHADOW, letterSpacing: '-0.015em', ...place }, parent)
  const ws = []
  for (const tk of tokens(text)) {
    if (tk.br) { el('br', {}, box); continue }
    const st = { display: 'inline-block', margin: '0 0.11em', transformOrigin: '50% 85%' }
    if (tk.accent) Object.assign(st, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: accentSize + 'px', color: accentColor, letterSpacing: '0', margin: '0 0.11em 0 0.3em' })
    ws.push({ accent: tk.accent, e: el('span', st, box, tk.w) })
  }
  return { box, ws }
}
function fitBox(box, ws, size, accentSize, maxW, floor = 0.62) {
  let widest = 0, cur = 0
  for (const n of box.childNodes) {
    if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
    cur += n.offsetWidth + 0.22 * (parseFloat(n.style.fontSize) || size)
  }
  widest = Math.max(widest, cur)
  if (!(widest > maxW)) return 1
  const k = Math.max(floor, (maxW - 8) / widest)
  box.style.fontSize = (size * k) + 'px'
  for (const w of ws) if (w.accent) w.e.style.fontSize = (accentSize * k) + 'px'
  return k
}

// ─────────────────────────────────────────────── 1 · THE TAKE
function paintStamp(x, W, H, t, label) {
  x.clearRect(0, 0, W, H)
  const P = 8, w = 640, h = 132, x0 = (W - w) / 2, y0 = 34
  // stepped pixel panel: ink rim, red border, dark-ember fill
  const step = (o, c) => { x.fillStyle = c; x.fillRect(x0 + o + 2 * P, y0 + o, w - 2 * o - 4 * P, h - 2 * o); x.fillRect(x0 + o, y0 + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); x.fillRect(x0 + o + P, y0 + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
  x.save(); x.shadowColor = rgba(HOT.orange, 0.8); x.shadowBlur = 34 + 8 * Math.sin(t * 7); step(-P, HOT.ink); x.restore()
  step(0, HOT.red); step(P * 0.5, HOT.gold); step(P, HOT.deep)
  const g = x.createLinearGradient(0, y0 + P, 0, y0 + h - P); g.addColorStop(0, '#3a0a22'); g.addColorStop(1, '#6a1426')
  step(P * 1.5, g)
  // the label: gold → red gradient, ink drop
  x.font = `700 70px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  try { x.letterSpacing = '6px' } catch (_) { /* older canvas */ }
  const cy = y0 + h / 2 + 4
  x.fillStyle = HOT.ink; x.fillText(label, W / 2 + 26, cy + 6)
  const tg = x.createLinearGradient(0, cy - 34, 0, cy + 30); tg.addColorStop(0, '#fff2a8'); tg.addColorStop(0.35, HOT.gold); tg.addColorStop(0.7, HOT.orange); tg.addColorStop(1, HOT.red)
  x.fillStyle = tg; x.fillText(label, W / 2 + 26, cy)
  try { x.letterSpacing = '0px' } catch (_) { /* older canvas */ }
  // the flames: one in the panel (before the label), two licking the top edge
  drawFlame(x, x0 + 70, y0 + h - 22, 9, t, { seed: 1 })
  drawFlame(x, x0 + 30, y0 + 14, 5, t, { seed: 4 })
  drawFlame(x, x0 + w - 34, y0 + 16, 6, t, { seed: 7 })
  drawFlame(x, x0 + w - 80, y0 + 8, 4, t, { seed: 9 })
  // embers rising off the panel
  for (let i = 0; i < 12; i++) {
    const ph = (t * (0.5 + hash(i) * 0.5) + hash(i + 3)) % 1
    const ex = x0 + 40 + hash(i + 11) * (w - 80) + Math.sin(t * 3 + i) * 10, ey = y0 + 10 - ph * 40
    x.globalAlpha = (1 - ph) * 0.9
    R(x, i % 3 ? HOT.gold : HOT.orange, ex, ey, 5, 5)
  }
  x.globalAlpha = 1
}
export function hotStamp(root, { take, at = 0, out = null, accentColor = HOT.gold, top = 176, size = 104, accentSize, stampY = 0, label = 'HOT TAKE' } = {}) {
  const aS = accentSize || Math.round(size * 1.35)
  const wrap = el('div', { position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', pointerEvents: 'none' }, root)
  const SW = 1000, SH = 200
  const cv = el('canvas', { position: 'absolute', left: ((1080 - SW) / 2) + 'px', top: (top - 34 + stampY) + 'px', width: SW + 'px', height: SH + 'px', transformOrigin: '50% 55%' }, wrap)
  cv.width = SW; cv.height = SH
  const sx = cv.getContext('2d')
  const { box, ws } = wordBox(wrap, take, { size, accentSize: aS, accentColor }, { left: '70px', width: '940px', top: (top + 168) + 'px', transformOrigin: '50% 30%' })
  fitBox(box, ws, size, aS, 940)
  return {
    root: wrap, end: at,
    update(t) {
      const k = outK(t, out)
      if (t < at || k <= 0) { wrap.style.display = 'none'; return }
      wrap.style.display = 'block'
      const d = t - at
      const settle = 1 + 0.08 * (1 - ease.outCubic(clamp(d / 0.3)))
      const pulse = 1 + 0.015 * Math.sin(t * 6.5)
      paintStamp(sx, SW, SH, t, label)
      cv.style.transform = `rotate(-3deg) scale(${(settle * pulse * lerp(0.85, 1, k)).toFixed(4)})`
      cv.style.opacity = String(k)
      box.style.opacity = String(k)
      box.style.transform = `scale(${(settle * lerp(0.9, 1, k)).toFixed(4)}) translateY(${((1 - k) * -20).toFixed(1)}px)`
      ws.forEach((w, i) => {
        const j = Math.sin(t * 2.4 + i * 1.3) * 3
        w.e.style.transform = w.accent ? `rotate(${(Math.sin(t * 3.1) * 2.5).toFixed(2)}deg) translateY(${j.toFixed(1)}px)` : `translateY(${(j * 0.4).toFixed(1)}px)`
        if (w.accent) w.e.style.textShadow = `0 0 ${(18 + 10 * Math.sin(t * 7)).toFixed(1)}px ${rgba(HOT.orange, 0.85)}, ${SHADOW}`
      })
    },
  }
}

// ─────────────────────────────────────────────── 2 · THE HEAT METER
export const heatTimes = (at, level) => Array.from({ length: level }, (_, i) => r3(at + 0.2 * i))
export function heatMeter(x, t, { level = 3, at = 0.6, x: rx = 1018, y: cy = 84, out = null, scale = 1, label = 'HEAT' } = {}) {
  const k = outK(t, out)
  if (k <= 0) return
  const s = 4 * scale, slotW = 9 * s, w = 5 * slotW + 150 * scale, h = 64 * scale
  const full = level >= 5 && t >= at + 0.2 * 4 + 0.15
  const shake = full ? Math.sin(t * 60) * 2.5 * scale : 0
  const x0 = rx - w + shake, y0 = cy - h / 2
  x.save(); x.globalAlpha *= k
  const P = 4 * scale
  R(x, HOT.ink, x0 - P, y0, w + 2 * P, h); R(x, HOT.ink, x0, y0 - P, w, h + 2 * P)
  R(x, full ? HOT.red : '#6a4a90', x0, y0, w, h)
  R(x, 'rgba(18,10,36,0.96)', x0 + P, y0 + P, w - 2 * P, h - 2 * P)
  if (full) { x.save(); x.globalAlpha *= 0.35 + 0.2 * Math.sin(t * 9); x.shadowColor = HOT.red; x.shadowBlur = 30; R(x, rgba(HOT.red, 0.3), x0, y0, w, h); x.restore() }
  x.font = `700 ${Math.round(24 * scale)}px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillStyle = full ? HOT.gold : HOT.bone
  x.fillText(label, x0 + 18 * scale, cy + 1)
  for (let i = 0; i < 5; i++) {
    const fx = x0 + 120 * scale + i * slotW + slotW / 2, fy = cy + 20 * scale
    const on = i < level ? clamp((t - (at + 0.2 * i)) / 0.12) : 0
    const pop = i < level && t >= at + 0.2 * i ? 1 + 0.5 * Math.max(0, 1 - (t - at - 0.2 * i) / 0.25) : 1
    x.save(); x.translate(fx, fy); x.scale(pop, pop)
    drawFlame(x, 0, 0, s * 0.82, t, { seed: i * 3 + 1, lit: on >= 0.5 ? 1 : 0 })
    x.restore()
  }
  x.font = `700 ${Math.round(20 * scale)}px ${MONO}`; x.textAlign = 'right'
  const shown = level === 0 ? 0 : Math.min(level, Math.floor(clamp((t - at) / 0.2 + 1, 0, level)))
  if (t >= at) { x.fillStyle = full ? HOT.gold : rgba(HOT.bone, 0.7); x.fillText(`${shown}/5`, x0 + w - 12 * scale, y0 + h + 22 * scale) }
  x.restore()
}

// ─────────────────────────────────────────────── 3 · OBJECTION!
export function objection(x, t, { at, x: cx = 540, y: cy = 760, dur = 1.5, text = 'OBJECTION!', color = HOT.red, rot = -0.08, scale = 1 } = {}) {
  const d = t - at
  if (d < 0 || d > dur) return
  const pin = easeOutBack(clamp(d / 0.22), 2.2)
  const sc = lerp(2.2, 1, pin) * scale * (1 + 0.025 * Math.sin(d * 18))
  const a = d < 0.05 ? d / 0.05 : 1 - ease.inQuad(prog(d, dur - 0.25, dur))
  x.save(); x.globalAlpha *= a
  // speed lines
  x.save(); x.translate(cx, cy)
  for (let i = 0; i < 22; i++) {
    const an = i / 22 * Math.PI * 2 + hash(i) * 0.2, r0 = 330 + hash(i + 5) * 60 + d * 260, r1 = r0 + 90 + hash(i + 9) * 120
    x.strokeStyle = i % 2 ? rgba(HOT.gold, 0.8) : rgba(HOT.bone, 0.6); x.lineWidth = 6 + (i % 3) * 3
    x.beginPath(); x.moveTo(Math.cos(an) * r0, Math.sin(an) * r0 * 0.7); x.lineTo(Math.cos(an) * r1, Math.sin(an) * r1 * 0.7); x.stroke()
  }
  x.restore()
  x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
  const burst = (R0, R1, n, ph) => { x.beginPath(); for (let i = 0; i < n * 2; i++) { const an = i / (n * 2) * Math.PI * 2 + ph, rr = (i % 2 ? R0 : R1) * (1 + 0.06 * hash(i * 7)); const px = Math.cos(an) * rr * 1.25, py = Math.sin(an) * rr * 0.72; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.closePath() }
  burst(250, 330, 14, 0.1); x.fillStyle = HOT.ink; x.fill()
  burst(232, 308, 14, 0.1); x.fillStyle = HOT.gold; x.fill()
  burst(212, 282, 14, 0.1); x.fillStyle = color; x.fill()
  burst(170, 200, 14, 0.32); x.fillStyle = rgba('#ff7a5a', 0.55); x.fill()
  x.font = `italic 900 104px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineJoin = 'round'; x.strokeStyle = HOT.ink; x.lineWidth = 22; x.strokeText(text, 0, 8)
  x.fillStyle = HOT.ink; x.fillText(text, 6, 16)
  x.fillStyle = '#fffbea'; x.fillText(text, 0, 8)
  x.restore()
  // pixel debris ring
  if (d < 0.7) {
    const p = ease.outCubic(d / 0.7)
    x.save(); x.globalAlpha *= 1 - p
    for (let i = 0; i < 16; i++) { const an = i / 16 * Math.PI * 2; drawPixelStar(x, cx + Math.cos(an) * (240 + 260 * p), cy + Math.sin(an) * (160 + 200 * p), 26, i % 2 ? 1 : 2, [HOT.gold, HOT.bone, HOT.orange][i % 3]) }
    x.restore()
  }
}

// ─────────────────────────────────────────────── 4 · THE VERDICT
const GAVEL_HEAD = ['.KKKKKKKKKKK.', 'KWLLLLLLLLLDK', 'KLLLLLLLLLLDK', 'KMMMMMMMMMMMK', 'KLLLLLLLLLLDK', 'KLDDDDDDDDDDK', '.KKKKKKKKKKK.']
const WOOD = { K: HOT.ink, W: '#f6d4a0', L: '#c98a4a', D: '#8a5228', M: HOT.gold }
function drawGavel(x, px, py, s, ang) {
  // pivot = the handle end (px, py); the head is at the far end, rotated by ang (0 = horizontal, head to the left)
  x.save(); x.translate(px, py); x.rotate(ang)
  R(x, HOT.ink, -30 * s, -2 * s, 30 * s, 4 * s); R(x, '#a86a36', -29 * s, -1 * s, 28 * s, 2 * s); R(x, '#d79a5c', -29 * s, -1 * s, 28 * s, 0.8 * s)
  const hx = -36 * s, hy = -6.5 * s
  GAVEL_HEAD.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') R(x, WOOD[ch], hx + j * s, hy + i * s, s + 0.5, s + 0.5) }))
  x.restore()
}
export function verdictTimes(at, text) {
  const tk = tokens(text).filter(k => !k.br)
  const slam = r3(at + 0.32), titleAt = r3(at + 0.38)
  const words = tk.map((k, i) => r3(at + 0.55 + i * 0.075 + (k.accent ? 0.1 : 0)))
  return { slam, titleAt, words, end: r3((words[words.length - 1] || at) + 0.3) }
}
export function verdictCard(root, { text, at, out = null, title = 'THE STARS RULE:', top = 600, size = 70, accentColor = HOT.gold, dim = 0.6, tab = 'VERDICT', align = 'center' } = {}) {
  const TM = verdictTimes(at, text)
  const wrap = el('div', { position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', pointerEvents: 'none', display: 'none' }, root)
  const scrim = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(40,6,24,0.55), rgba(6,3,14,0.92))' }, wrap)
  const step = 'polygon(0 24px, 8px 24px, 8px 16px, 16px 16px, 16px 8px, 24px 8px, 24px 0, calc(100% - 24px) 0, calc(100% - 24px) 8px, calc(100% - 16px) 8px, calc(100% - 16px) 16px, calc(100% - 8px) 16px, calc(100% - 8px) 24px, 100% 24px, 100% calc(100% - 24px), calc(100% - 8px) calc(100% - 24px), calc(100% - 8px) calc(100% - 16px), calc(100% - 16px) calc(100% - 16px), calc(100% - 16px) calc(100% - 8px), calc(100% - 24px) calc(100% - 8px), calc(100% - 24px) 100%, 24px 100%, 24px calc(100% - 8px), 16px calc(100% - 8px), 16px calc(100% - 16px), 8px calc(100% - 16px), 8px calc(100% - 24px), 0 calc(100% - 24px))'
  const card = el('div', { position: 'absolute', left: '70px', width: '940px', top: top + 'px', transformOrigin: '50% 0%' }, wrap)
  const rim = el('div', { position: 'relative', padding: '10px', background: HOT.ink, clipPath: step, filter: 'drop-shadow(0 0 40px rgba(255,90,60,0.5))' }, card)
  const gold = el('div', { padding: '8px', background: `linear-gradient(180deg, #fff0a0, ${HOT.gold} 40%, #c9862a)`, clipPath: step }, rim)
  const inner = el('div', { padding: '100px 44px 56px', background: `linear-gradient(180deg, #7a1430, ${HOT.crimson} 55%, #3a0a24)`, clipPath: step, position: 'relative' }, gold)
  // pinstripes inside the card
  el('div', { position: 'absolute', inset: '14px', border: `3px solid ${rgba(HOT.gold, 0.35)}`, pointerEvents: 'none' }, inner)
  const head = el('div', { position: 'absolute', left: '50px', top: '42px', font: `700 34px ${MONO}`, letterSpacing: '4px', color: HOT.gold, textShadow: '0 3px 0 rgba(10,4,20,0.9)' }, inner, title)
  const { box, ws } = wordBox(inner, text, { size, accentSize: Math.round(size * 1.3), accentColor }, { position: 'relative', textAlign: align, lineHeight: 1.12 })
  box.style.position = 'relative'
  const tabEl = el('div', { position: 'absolute', left: '40px', top: (top - 34) + 'px', padding: '8px 22px 6px', background: HOT.red, color: '#fffbea', font: `700 30px ${MONO}`, letterSpacing: '6px', border: `5px solid ${HOT.ink}`, transform: 'rotate(-4deg)', boxShadow: `5px 5px 0 ${HOT.ink}` }, wrap, tab)
  const gcv = el('canvas', { position: 'absolute', left: '640px', top: (top - 230) + 'px', width: '440px', height: '380px' }, wrap)
  gcv.width = 440; gcv.height = 380
  const gx = gcv.getContext('2d')
  let fitted = false
  const words = TM.words
  return {
    root: wrap, slam: TM.slam, end: TM.end, words,
    update(t) {
      const k = outK(t, out)
      if (t < at || k <= 0) { wrap.style.display = 'none'; return }
      wrap.style.display = 'block'
      if (!fitted) { fitBox(box, ws, size, Math.round(size * 1.3), 796); fitted = true }
      scrim.style.opacity = String(clamp(dim / 0.6) * clamp((t - at) / 0.25) * k)
      const din = easeOutBack(clamp((t - at) / 0.26), 1.6)
      const sh = slamShake(t, TM.slam, 10, 0.35)
      card.style.opacity = String(clamp((t - at) / 0.12) * k)
      card.style.transform = `translate(${sh.toFixed(1)}px, ${(lerp(-80, 0, din) + Math.abs(sh) * 0.6).toFixed(1)}px) scale(${(lerp(1.25, 1, din) * lerp(0.92, 1, k)).toFixed(4)}) rotate(${lerp(-3, 0, din).toFixed(2)}deg)`
      tabEl.style.opacity = String(clamp((t - TM.slam) / 0.08) * k)
      tabEl.style.transform = `rotate(-4deg) scale(${(1 + 0.4 * Math.max(0, 1 - (t - TM.slam) / 0.2)).toFixed(3)})`
      head.style.opacity = String(clamp((t - TM.titleAt) / 0.1))
      ws.forEach((w, i) => {
        const p = prog(t, words[i], words[i] + (w.accent ? 0.38 : 0.26))
        const sc = w.accent ? 0.3 + 0.7 * easeOutBack(p, 3) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        w.e.style.opacity = String(clamp(p * 3))
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 24).toFixed(1)}px) scale(${sc.toFixed(3)})`
      })
      // the gavel: raised, swings down, slams the block, bounces
      gx.clearRect(0, 0, 440, 380)
      gx.globalAlpha = clamp((t - at) / 0.1) * k
      const bx = 230, by = 300
      R(gx, HOT.ink, bx - 84, by - 4, 168, 48); R(gx, '#8a5228', bx - 78, by + 2, 156, 36); R(gx, '#c98a4a', bx - 78, by + 2, 156, 10)
      const d = t - at
      const ang = d < 0.32 ? lerp(-1.25, 0.12, ease.inCubic(d / 0.32)) : 0.12 - 0.22 * Math.exp(-(d - 0.32) * 7) * Math.abs(Math.sin((d - 0.32) * 14))
      drawGavel(gx, 400, 254, 7, -ang + Math.PI * 0)
      if (d > 0.32 && d < 0.8) {
        const p = (d - 0.32) / 0.48
        gx.globalAlpha = (1 - p) * k
        for (let i = 0; i < 10; i++) { const an = Math.PI + (i / 9) * Math.PI; R(gx, i % 2 ? HOT.bone : HOT.gold, bx - 120 + Math.cos(an) * 0 + (i - 4.5) * 26 * (0.6 + p), by - 10 - Math.abs(Math.sin(an)) * 50 * p - 30 * p, 8, 8) }
      }
      gx.globalAlpha = 1
    },
  }
}

// ─────────────────────────────────────────────── 5 · AGREE / DISAGREE?
function pill(x, x0, y0, w, h, fill, rim = HOT.ink) {
  const r = h / 2
  x.beginPath(); x.moveTo(x0 + r, y0); x.lineTo(x0 + w - r, y0); x.arc(x0 + w - r, y0 + r, r, -Math.PI / 2, Math.PI / 2); x.lineTo(x0 + r, y0 + h); x.arc(x0 + r, y0 + r, r, Math.PI / 2, Math.PI * 1.5); x.closePath()
  x.fillStyle = fill; x.fill(); if (rim) { x.lineWidth = 6; x.strokeStyle = rim; x.stroke() }
}
export function agreePill(x, t, { at, dur = 0.9, x: cx = 540, y: cy = 1560, pick = null, scale = 1 } = {}) {
  const d = t - at
  if (d < 0 || d > dur + 0.2) return
  const pin = easeOutBack(clamp(d / 0.2), 2.6), pout = ease.inCubic(clamp((d - dur) / 0.2))
  const sc = pin * (1 - pout) * scale
  if (sc <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(sc, sc)
  const W = 800, H = 150
  x.save(); x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 30; pill(x, -W / 2, -H / 2, W, H, 'rgba(18,10,36,0.96)', HOT.ink); x.restore()
  pill(x, -W / 2 + 6, -H / 2 + 6, W - 12, H - 12, 'rgba(18,10,36,0)', rgba(HOT.bone, 0.35))
  const tap = pick && d > dur * 0.45 ? 1 : 0, tapK = pick ? Math.max(0, 1 - Math.abs(d - dur * 0.5) / 0.12) : 0
  const btn = (bx, label, col, dark, icon, side) => {
    const on = pick === side, press = on ? tapK * 6 : 0, bounce = 1 + 0.04 * Math.sin(t * 10 + (side === 'agree' ? 0 : 2))
    x.save(); x.translate(bx, press); x.scale(bounce, bounce)
    pill(x, -180, -48, 360, 96, dark, HOT.ink)
    pill(x, -180, -52 + press * 0, 360, 92, col, HOT.ink)
    if (on && tap) { x.save(); x.globalAlpha = 0.5; pill(x, -180, -52, 360, 92, '#ffffff', null); x.restore() }
    icon(-118, -6)
    x.font = `900 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = HOT.ink
    x.fillText(label, 34, -4)
    x.restore()
  }
  btn(-196, 'AGREE', HOT.orange, HOT.deep, (ix, iy) => drawFlame(x, ix, iy + 26, 5, t, { seed: 2 }), 'agree')
  btn(196, 'DISAGREE', HOT.ice, HOT.iceDeep, (ix, iy) => drawIce(x, ix - 6, iy, 5, t), 'disagree')
  if (pick) {   // a pixel cursor slides in and taps
    const tx = pick === 'agree' ? -150 : 230, p = ease.outCubic(clamp(d / (dur * 0.45)))
    const qx = lerp(tx + 220, tx, p), qy = lerp(170, 26, p) + tapK * 8
    const CUR = ['K.......', 'KK......', 'KWK.....', 'KWWK....', 'KWWWK...', 'KWWWWK..', 'KWWKKK..', 'KK.KWK..', '....KK..']
    CUR.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') R(x, ch === 'K' ? HOT.ink : '#ffffff', qx + i * 6, qy + j * 6, 6, 6) }))
  }
  x.restore()
}

// ─────────────────────────────────────────────── sound
const KEYS = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 }
function keyRoot(key = 'D') {
  const m = /^([A-G][#b]?)(m?)/.exec(key || 'D') || ['', 'D', '']
  let semi = KEYS[m[1]] ?? 2
  return { f: 261.63 * Math.pow(2, semi / 12), minor: m[2] === 'm' }
}
const chipC = (t, f, len, o = {}) => ['chip', r3(t), +f.toFixed(2), len, { gain: 0.022, ...o }]
export function heatCues(at, level = 3) {
  const NOTE = [587.33, 739.99, 880, 1174.66, 1479.98]
  const out = heatTimes(at, level).map((tt, i) => ['pop', tt, NOTE[i], 0.035 + i * 0.004, (i - 2) * 0.15])
  heatTimes(at, level).forEach((tt, i) => out.push(['tick', r3(tt + 0.03), 0.02 + 0.004 * i]))
  if (level >= 5) out.push(['crash', r3(at + 0.95), { gain: 0.045 }], ['boom', r3(at + 0.95), 0.2])
  return out
}
export function hotCues(at = 0, { key = 'D', level = 0, meterAt = null } = {}) {
  const { f, minor } = keyRoot(key)
  const third = minor ? 3 : 4
  const out = [
    ['boom', r3(at + 0.02), 0.32], ['whoosh', r3(at), 0.5, 0.06], ['crash', r3(at + 0.02), { gain: 0.04, len: 1.4 }],
    chipC(at + 0.02, f * 2, 0.09, { wave: 'saw', gain: 0.02 }), chipC(at + 0.1, f * 2 * Math.pow(2, third / 12), 0.09, { wave: 'saw', gain: 0.02 }),
    chipC(at + 0.18, f * 2 * Math.pow(2, 7 / 12), 0.2, { wave: 'saw', gain: 0.022, vib: 0.3 }),
  ]
  // fire crackle: a scatter of tiny ticks over the first second and a half
  for (let i = 0; i < 14; i++) out.push(['tick', r3(at + 0.05 + hash(i + 2) * 1.5), 0.008 + hash(i) * 0.012])
  if (level && meterAt != null) out.push(...heatCues(meterAt, level))
  return out
}
export function objectionCues(at, { key = 'D' } = {}) {
  const { f } = keyRoot(key)
  return [
    // the record scratch: forward-back-forward
    chipC(at - 0.16, f * 3, 0.09, { wave: 'saw', slide: 40, gain: 0.03, rev: 0.02, dly: 0 }),
    chipC(at - 0.07, f * 4, 0.07, { wave: 'saw', slide: -70, gain: 0.03, rev: 0.02, dly: 0 }),
    ['whoosh', r3(at - 0.17), 0.16, 0.07], ['tick', r3(at - 0.02), 0.06],
    ['boom', r3(at), 0.42], ['crash', r3(at), { gain: 0.06 }], ['pop', r3(at + 0.02), 440, 0.05, 0],
    ['pop', r3(at + 0.1), 880, 0.035, 0.2], ['glitter', r3(at + 0.05), r3(at + 0.5)],
  ]
}
export function verdictCues(at, { text = '', key = 'D' } = {}) {
  const TM = verdictTimes(at, text), { f } = keyRoot(key)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const tk = tokens(text).filter(k => !k.br)
  return [
    ['whoosh', r3(at), 0.32, 0.05],
    ['boom', TM.slam, 0.5], ['tick', TM.slam, 0.09], ['tick', r3(TM.slam + 0.13), 0.05], ['tick', r3(TM.slam + 0.22), 0.03],
    ['bell', r3(TM.slam + 0.02), 880, 0.03, 1.6, 0],
    chipC(TM.titleAt, f * 2, 0.06), chipC(TM.titleAt + 0.07, f * 3, 0.1),
    ...TM.words.map((tt, i) => tk[i].accent ? ['pluck', tt, 1174.66, 0.045, 0.6, 0] : ['pop', tt, NOTE[i % NOTE.length], 0.02, ((i % 3) - 1) * 0.25]),
  ]
}
export function agreeCues(at, { dur = 0.9, pick = null } = {}) {
  const out = [['pop', r3(at), 739.99, 0.045, 0], ['pop', r3(at + 0.06), 1174.66, 0.04, -0.3], ['pop', r3(at + 0.12), 987.77, 0.04, 0.3], ['pop', r3(at + dur + 0.02), 587.33, 0.03, 0]]
  if (pick) out.push(['tick', r3(at + dur * 0.5), 0.06], ['pluck', r3(at + dur * 0.5), pick === 'agree' ? 1318.51 : 880, 0.04, 0.4, 0])
  return out
}

// ─────────────────────────────────────────────── the debate set
export function drawHotSet(x, t, { heat = 0.5, dim = 0.5, floorY = 1290, spot = null } = {}) {
  const g = x.createLinearGradient(0, 0, 0, floorY)
  g.addColorStop(0, lerpHex('#1a0e38', '#2a0a26', heat)); g.addColorStop(1, lerpHex('#3a1446', '#5a1426', heat))
  x.save(); x.globalAlpha = 1 - dim * 0.4
  x.fillStyle = g; x.fillRect(0, 0, 1080, floorY)
  // the flame wall: a soft grid of unlit/lit pixel flames behind everything
  for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) {
    const fx = 90 + i * 150 + (j % 2) * 75, fy = 720 + j * 150
    const lit = hash(i * 7 + j * 13 + Math.floor(t * 1.5)) < 0.25 + heat * 0.5 ? 1 : 0
    drawFlame(x, fx, fy, 5, t, { seed: i + j * 7, lit, alpha: 0.32 })
  }
  // two light cones (left / right speaker)
  for (const [side, cx] of [['left', 300], ['right', 780]]) {
    const on = spot === side ? 1 : spot ? 0.25 : 0.5
    const cg = x.createLinearGradient(0, 0, 0, floorY)
    cg.addColorStop(0, rgba('#ffe7b0', 0.0)); cg.addColorStop(1, rgba('#ffd27a', 0.22 * on))
    x.fillStyle = cg; x.beginPath(); x.moveTo(cx - 40, 0); x.lineTo(cx + 40, 0); x.lineTo(cx + 260, floorY); x.lineTo(cx - 260, floorY); x.closePath(); x.fill()
  }
  // the floor
  const fg = x.createLinearGradient(0, floorY, 0, 1920)
  fg.addColorStop(0, '#2a1838'); fg.addColorStop(1, '#0c0618')
  x.fillStyle = fg; x.fillRect(0, floorY, 1080, 1920 - floorY)
  R(x, rgba(HOT.gold, 0.55), 0, floorY, 1080, 6)
  for (let i = 0; i < 12; i++) R(x, rgba(HOT.bone, 0.06), i * 96 - (t * 20 % 96), floorY + 40, 48, 4)
  x.restore()
}
function lerpHex(a, b, k) {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16)
  const c = [16, 8, 0].map(s => Math.round(lerp((A >> s) & 255, (B >> s) & 255, clamp(k))))
  return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('')
}
export function drawPodium(x, px, py, w, { color = HOT.gold, label = '', alpha = 1, h = 190 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const x0 = px - w / 2
  R(x, HOT.ink, x0 - 6, py - 6, w + 12, h + 12)
  R(x, '#3a2456', x0, py, w, h); R(x, color, x0, py, w, 18); R(x, rgba('#ffffff', 0.25), x0, py, w, 5)
  R(x, rgba(color, 0.35), x0 + 16, py + 40, w - 32, h - 70)
  if (label) { x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = HOT.bone; x.fillText(label, px, py + 40 + (h - 70) / 2) }
  x.restore()
}

// ─────────────────────────────────────────────── city stars
export const CITIES = {
  HOU: { color: '#ff7a4a', name: 'HOUSTON', prop: 'hat' },
  ATX: { color: '#9a7be0', name: 'AUSTIN', prop: 'guitar' },
  DAL: { color: '#4fa8ff', name: 'DALLAS', prop: 'blazer' },
  SA: { color: '#ffb84a', name: 'SAN ANTONIO', prop: 'flower' },
  NYC: { color: '#c9d2e8', name: 'NEW YORK', prop: 'coffee' },
  LA: { color: '#ff8fc8', name: 'LOS ANGELES', prop: 'shades' },
  MIA: { color: '#3ee0c8', name: 'MIAMI', prop: 'visor' },
  CHI: { color: '#5fd0ff', name: 'CHICAGO', prop: 'beanie' },
  ATL: { color: '#7fd06a', name: 'ATLANTA', prop: 'peach' },
}
function bits(x, rows, pal, px, py, s) { rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.' && pal[ch]) R(x, pal[ch], px + i * s, py + j * s, s + 0.4, s + 0.4) })) }
const PROPS = {
  hat: { rows: ['....KKKKK....', '...KBBBBBK...', '...KBBBBBK...', '..KKBBBBBKK..', 'KKBYYYYYYYBKK', 'KBBBBBBBBBBBK', '.KKKKKKKKKKK.'], pal: { K: HOT.ink, B: '#c98a4a', Y: HOT.gold }, at: 'top', dx: -6.5, dy: -5 },
  beanie: { rows: ['.....KK.....', '....KWWK....', '..KKKKKKKK..', '.KRRRRRRRRK.', 'KRRWRRWRRWRK', 'KWWWWWWWWWWK', '.KKKKKKKKKK.'], pal: { K: HOT.ink, R: '#ff5d6a', W: '#efe6d6' }, at: 'top', dx: -6, dy: -4 },
  visor: { rows: ['..KKKKKKKK....', '.KPPPPPPPPKKK.', 'KPPPPPPPPPPPPK', '.KKKKKKKKKKKK.'], pal: { K: HOT.ink, P: '#ff8fc8' }, at: 'top', dx: -7, dy: 1 },
  flower: { rows: ['..PP.PP..', '.PYPPPYP.', '.PPYYYPP.', '..PYWYP..', '.PPYYYPP.', '.PYPPPYP.', '..PP.PP..'], pal: { P: '#ff5fa8', Y: '#ffd23f', W: '#fff6d8' }, at: 'top', dx: 1, dy: -2 },
  shades: { rows: ['KKKKKKKKKKKKKKKK', 'KBBBBK....KBBBBK', 'KBWBBKKKKKKBWBBK', 'KBBBBK....KBBBBK', '.KKKK......KKKK.'], pal: { K: HOT.ink, B: '#2a1a4a', W: '#9fe8ff' }, at: 'eyes', dx: -8, dy: -2.5 },
  coffee: { rows: ['.WWWWWW.', 'KKKKKKKK', 'KBBBBBBK', 'KTTTTTTK', 'KBBBBBBKK', 'KBBBBBBK.K', 'KBBBBBBKK', '.KBBBBK..', '..KKKK...'], pal: { K: HOT.ink, B: '#efe6d6', T: '#c98a4a', W: 'rgba(255,255,255,0.5)' }, at: 'hand', dx: 0, dy: -4 },
  peach: { rows: ['....GG..', '...GG...', '.KKKKKK.', 'KOOPPOOK', 'KOPPPPOK', 'KOPPPPOK', '.KOOOOK.', '..KKKK..'], pal: { K: HOT.ink, G: '#5fbf5a', O: '#ff9a6a', P: '#ffc08a' }, at: 'hand', dx: 0, dy: -4 },
  fan: { rows: ['..KKKKK..', '.KPWPWPK.', 'KPWPWPWPK', 'KWPWPWPWK', '.KPWPWPK.', '..KKKKK..', '....K....', '....K....', '....K....'], pal: { K: HOT.ink, P: '#7fe0ff', W: '#efe6d6' }, at: 'hand', dx: 0, dy: -7 },
  napkin: { rows: ['KKKKKKKKK', 'KWWWWWWWK', '.KWWRWWK.', '..KWWWK..', '...KWK...', '....K....'], pal: { K: HOT.ink, W: '#ffffff', R: '#ff5d6a' }, at: 'chin', dx: -4.5, dy: 0 },
  blazer: { rows: ['KK.......KK', 'KBK.....KBK', 'KBBK.W.KBBK', 'KBBBKRKBBBK', 'KBBBBRBBBBK', 'KBBBBBBBBBK'], pal: { K: HOT.ink, B: '#2a3a6a', W: '#ffffff', R: '#ff5d6a' }, at: 'chin', dx: -5.5, dy: 0.5 },
  guitar: { rows: ['..........KK', '.........KWK', '........KBK.', '.......KBK..', '..KKK.KBK...', '.KOOOKBK....', 'KOOKOOK.....', 'KOKKKOK.....', 'KOOKOOK.....', '.KOOOK......', '..KKK.......'], pal: { K: HOT.ink, O: '#ff9a3a', B: '#8a5228', W: '#efe6d6' }, at: 'body', dx: -6, dy: -4 },
  sweat: { rows: ['.K.', 'KCK', 'KCK', '.K.'], pal: { K: HOT.ink, C: '#9fe8ff' }, at: 'brow', dx: 0, dy: 0 },
}
export function drawProp(x, name, star, t) {
  const P = PROPS[name]
  if (!P) return
  const c = star.size / 36, s = Math.max(2, c * 1.05)
  const top = star.top, cx = star.x, cy = star.y
  const anchor = {
    top: [cx, top + 3 * c], eyes: [cx, cy - 0.2 * c], hand: [cx + 13 * c, cy + 6 * c], chin: [cx, cy + 7.5 * c],
    body: [cx + 2 * c, cy + 6 * c], brow: [cx + 7 * c + Math.sin(t * 2) * c, cy - 6 * c + ((t * 0.9) % 1) * 4 * c],
  }[P.at]
  bits(x, P.rows, P.pal, anchor[0] + P.dx * s, anchor[1] + P.dy * s, s)
  if (name === 'fan') {   // little breeze lines
    x.save(); x.strokeStyle = rgba('#ffffff', 0.5); x.lineWidth = Math.max(2, s * 0.6)
    for (let i = 0; i < 3; i++) { const ph = (t * 3 + i / 3) % 1; x.globalAlpha = 1 - ph; x.beginPath(); x.moveTo(anchor[0] - 6 * s - ph * 20 * s, anchor[1] - 4 * s + i * 3 * s); x.lineTo(anchor[0] - 10 * s - ph * 20 * s, anchor[1] - 4 * s + i * 3 * s); x.stroke() }
    x.restore()
  }
}
export function cityStar(x, px, py, size, t, opts = {}) {
  const { city = 'HOU', prop, badge = true, ...rest } = opts
  const C = CITIES[city] || CITIES.HOU
  const r = drawStarChar(x, px, py, size, t, { color: C.color, ...rest })
  if ((rest.alpha ?? 1) <= 0 || (rest.pop ?? 1) <= 0) return r
  x.save(); x.globalAlpha *= rest.alpha ?? 1
  const props = prop === false ? [] : Array.isArray(prop) ? prop : [prop || C.prop]
  for (const p of props) drawProp(x, p, r, t)
  if (badge) {
    const c = r.size / 36, fs = Math.max(14, Math.round(c * 3.6))
    x.font = `700 ${fs}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(city).width + fs * 0.9, th = fs * 1.5
    const bx = r.x - 10 * c, by = r.y + 12.5 * c
    R(x, HOT.ink, bx - tw / 2 - 3, by - th / 2 - 3, tw + 6, th + 6)
    R(x, '#fffbea', bx - tw / 2, by - th / 2, tw, th)
    R(x, C.color, bx - tw / 2, by + th / 2 - 4, tw, 4)
    x.fillStyle = HOT.ink; x.fillText(city, bx, by + 1)
  }
  x.restore()
  return r
}

export { clamp, lerp, prog, ease, easeOutBack, r3, rgba, outK }

// ─────────────────────────────────────────────── hotEpisode: the whole five-beat format from one config (optional)
// const EP = hotEpisode({
//   numeral: 'S12 E02', duration: 20, key: 'G',
//   take: { text: 'Splitting the bill on | date one is *fine.*', out: [2.7, 2.9] },        // at 0 (frame 0)
//   heat: { level: 4, at: 0.55 },
//   pro:  { name: '♎︎ LIBRA', color, glyph, x: 300, y: 1060, size: 300, city?, prop?, textColor, seed, draw?(x, t, r, T) },
//   con:  { … same, enter: 'objection' (slides in from the right on OBJECTION!) | 'start' },
//   lines: [{ who: 'pro' | 'con', t, text }],            // the box (≤ 46 chars a line, ≥ 1.5 s after typing)
//   objection: 5.04,  verdict: { at, text, out? },  pill: { at, dur, pick },  last: { at, text, top? },
//   moods: { pro: [[t, { mood, look }]…], con: […] },  // optional overrides, merged by time with the defaults
//   back(x, t, T), front(x, t, T, rp, rc), over(ox, t, T)  // optional per-episode drawing hooks (set / props / overlay)
//   cues: […],                                           // your extra cues (the format's own are added for you)
// })  → { SCENES, CUES, DURATION, STORY_END, T }   T = { ...the config times, close, vOut, out, LT (lineTimes) }
// Then: export const { SCENES, CUES, DURATION } = EP. The verdict's out defaults to [pill.at − 0.2, pill.at].
export function hotEpisode(cfg) {
  return _hotEpisode(cfg)
}

function _hotEpisode(C) {
  const DURATION = C.duration, STORY_END = DURATION - ENDCARD_LEN
  const CPS = C.cps || 28
  const OBJ = C.objection
  const who = w => (w === 'pro' ? C.pro : C.con)
  const LINES = C.lines.map(L => ({ t: L.t, speaker: who(L.who).name, color: who(L.who).textColor || HOT.gold, text: L.text }))
  const LT = lineTimes(LINES, { cps: CPS })
  const V = C.verdict, P = { dur: 0.75, pick: 'agree', ...C.pill }, LAST = C.last
  const T = {
    take: C.take, obj: OBJ, verdict: V.at, pill: P.at, last: LAST.at, LT, lines: LINES,
    close: r3(V.at - 0.1), vOut: V.out || [r3(P.at - 0.2), r3(P.at + 0.02)],
    slide: [r3(OBJ - 0.05), r3(OBJ + 0.32)], out: [r3(STORY_END - 0.45), r3(STORY_END - 0.1)],
  }
  const conEnters = (C.con.enter || 'objection') === 'objection'
  const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
  const firstLine = w => { const i = C.lines.findIndex(L => L.who === w); return i < 0 ? null : i }
  const pi = firstLine('pro'), ci = firstLine('con')
  const PRO_K = [[0, S_('wink', [1, 0])], [0.9, S_('happy', [1, 0])], [OBJ, S_('wide', [1, 0], { blink: false })], [OBJ + 0.6, S_('squint', [1, 0])]]
  if (pi != null) PRO_K.push([LINES[pi].t, S_('happy', [0, 0])])
  if (ci != null) PRO_K.push([LT[ci].done + 0.1, S_('eyeroll')], [LT[ci].done + 1.0, S_('squint', [1, 0])])
  PRO_K.push([V.at, S_('neutral', [0, -1])], [LAST.at, S_('happy', [1, 0])], [LAST.at + 0.9, S_('sparkle', [1, 0])])
  const CON_K = [[0, S_('squint', [-1, 0])], [OBJ, S_('wide', [-1, 0], { blink: false })], [OBJ + 0.4, S_('squint', [-1, 0])]]
  if (ci != null) CON_K.push([LINES[ci].t, S_('squint', [-1, 0])])
  C.lines.forEach((L, i) => { if (L.who === 'pro' && i > 0) CON_K.push([LT[i].done, S_('wide', [-1, 0], { blink: false })], [LT[i].done + 0.5, S_('neutral', [-1, 0])]) })
  CON_K.push([V.at, S_('neutral', [0, -1])], [LAST.at, S_('neutral', [-1, 0])], [LAST.at + 0.9, S_('happy', [-1, 0])])
  const merge = (A, B = []) => [...A, ...B].sort((a, b) => a[0] - b[0])
  const PK = merge(PRO_K, C.moods?.pro), CK = merge(CON_K, C.moods?.con)
  const keyedS = (t, K) => { let v = K[0][1]; for (const [k, s] of K) if (t >= k) v = s; return v }
  const HOPS = {
    pro: [0.35, ...talkHops(LINES, C.pro.name, { cps: CPS }), LAST.at + 0.2, ...(C.pro.hops || [])],
    con: [OBJ + 0.34, ...talkHops(LINES, C.con.name, { cps: CPS }), LAST.at + 0.9, ...(C.con.hops || [])],
  }
  function star(x, t, S, K, hops, xx, extra = {}) {
    const st = keyedS(t, K)
    const o = { glyph: S.glyph, ...st, hops, seed: S.seed || 3, ...extra }
    const r = S.city ? cityStar(x, xx, S.y, S.size, t, { city: S.city, prop: S.prop, ...o, color: S.color || (CITIES[S.city] || {}).color }) : drawStarChar(x, xx, S.y, S.size, t, { color: S.color, ...o })
    return r
  }
  async function build(stage) {
    await loadHotFonts()
    const root = fill(stage, { background: '#0a0616' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const stamp = hotStamp(root, { ...C.take, take: C.take.text, at: 0 })
    const box = LINES.length ? dialogueBox(root, { lines: LINES, y: C.boxY || 1440, width: 960, height: 270, open: LINES[0].t - 0.2, close: T.close, cps: CPS }) : null
    const verdict = verdictCard(root, { ...V, out: T.vOut })
    const last = popText(root, LAST.text, { top: LAST.top || 250, size: LAST.size || 112, accentSize: LAST.accentSize || 160, at: LAST.at, gap: LAST.gap || 0.12, accentColor: C.accentColor || HOT.gold, wobble: true, fit: true })
    const ov = layerCanvas(root), ox = ov.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    function scene(t) {
      const sh = objectionShake(t, OBJ) + slamShake(t, verdict.slam, 6)
      const fade = 1 - ease.inOutQuad(prog(t, ...T.out))
      x.clearRect(0, 0, 1080, 1920)
      x.save(); x.translate(sh, 0); x.globalAlpha = fade
      let speaking = null
      LINES.forEach((L, i) => { if (t >= L.t && t < (LINES[i + 1] ? LINES[i + 1].t : T.close)) speaking = C.lines[i].who === 'pro' ? 'left' : 'right' })
      drawHotSet(x, t, { heat: (C.heat.level / 5) * (0.5 + 0.5 * clamp((t - OBJ) / 0.5)), dim: 0.35, spot: speaking, ...(C.set || {}) })
      if (C.back) C.back(x, t, T)
      const rp = star(x, t, C.pro, PK, HOPS.pro, C.pro.x, { squash: t > OBJ && t < OBJ + 0.4 ? -0.08 : 0 })
      let rc = null
      if (!conEnters || t >= T.slide[0]) {
        const inK = conEnters ? easeOutBack(prog(t, ...T.slide), 1.6) : 1
        rc = star(x, t, C.con, CK, HOPS.con, lerp(1320, C.con.x, inK), { squash: conEnters ? 0.1 * Math.sin((t - OBJ) * 20) * (1 - prog(t, OBJ, OBJ + 0.5)) : 0 })
      }
      if (C.pro.draw) C.pro.draw(x, t, rp, T)
      if (rc && C.con.draw) C.con.draw(x, t, rc, T)
      if (C.front) C.front(x, t, T, rp, rc)
      x.restore()
    }
    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        scene(t)
        stamp.update(t)
        if (box) box.update(t)
        verdict.update(t)
        last.update(t, t < LAST.at ? 0 : outK(t, T.out))
        ox.clearRect(0, 0, 1080, 1920)
        heatMeter(ox, t, { ...C.heat, out: [V.at - 0.2, V.at] })
        objection(ox, t, { at: OBJ, x: 560, y: C.objY || 760, ...(C.objOpts || {}) })
        agreePill(ox, t, { ...P, y: P.y || 1560 })
        if (C.over) C.over(ox, t, T)
        drawGrain(gx, t)
      },
    }
  }
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: C.numeral, corners: 'tl bl br' })]
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const nLast = tokens(LAST.text).filter(k => !k.br).length
  const CUES = [
    ...hotCues(0, { key: C.key, level: C.heat.level, meterAt: C.heat.at }),
    ...objectionCues(OBJ, { key: C.key }), ['whoosh', T.slide[0], 0.35, 0.05],
    ...verdictCues(V.at, { text: V.text, key: C.key }),
    ...agreeCues(P.at, P),
    ...Array.from({ length: nLast }, (_, i) => ['pop', r3(LAST.at + i * (LAST.gap || 0.12)), NOTE[(1 + i) % 7], 0.028, i % 2 ? 0.15 : -0.15]),
    ['pluck', r3(LAST.at + 0.12), 1174.66, 0.04, 0.6, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(LINES.length ? talkCues(LINES, { cps: CPS, pitch: { [C.pro.name]: 987.77, [C.con.name]: 659.25 } }) : []),
    ...(C.cues || []),
    ...endcardCues(STORY_END),
  ]
  return { SCENES, CUES, DURATION, STORY_END, T }
}
