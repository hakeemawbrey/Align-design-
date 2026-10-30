// stguide — the "Your Star Guide" kit (promo/films/STARTALK13.md). Owned by the guidearies session; others: never edit.
// Each sign's personal star guide carries a tiny gold lantern and speaks to YOU. Pure f(t); nothing touches `document`
// at module top level (the sound build imports this through scenes/index.js in node).
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { GUIDE, guideSign, guideSpeaker, drawLantern, drawGuide, noteChip, guideHook, factChip, guideCues,
//            loadGuideFonts, GOLD, BONE, INK, LAV, PINK, INTER, MONO, SERIF, GLYPH,
//            pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops, NOTE } from '../../stguide.js'
//
// guideSign(id) → { id, name: 'ARIES', title: 'Aries', glyph: '♈', color, element: 'fire' }   (id as in wheel.js SIGNS,
//   e.g. 'aries', 'sagittarius'; 'sag' also works). GUIDE = { aries: …, … } is the same table.
// guideSpeaker(glyph) → '♈ YOUR STAR'  — the dialogueBox name tag for the guide.
//
// drawLantern(ctx, x, y, size, t, { glow = 1, swing = 0, flame = 1, alpha = 1, color = GOLD })
//   A tiny pixel gold lantern. (x, y) = the TOP of its hook/handle (where a tip holds it); it hangs below, total height
//   ≈ size px (40–90 is right for a 300–360 px guide). glow 0…1.5 = warm light halo; swing = extra sway in radians
//   (a gentle idle sway is built in); flame 0…1 (0 = unlit, e.g. before a "light it" beat). Returns { x, y: lamp centre }.
//
// drawGuide(ctx, x, y, size, t, starOpts = {}, { lantern = 1, lanternSize, glow = 1, side = 1 } = {})
//   drawStarChar(...) + the lantern hanging from its right tip (side = -1: left tip). starOpts go straight to
//   drawStarChar (color, glyph, mood, look, hops, squash, seed, pop…). lantern = 0…1 scale (0 hides it).
//   Returns drawStarChar's { x, y, size, top } plus { lx, ly } = the lantern centre (handy for light beams/sparkles).
//
// noteChip(root, { sign, glyph, n, of = 3, at = 0, out, color = GOLD, top = 96, label })
//   DOM: the small Space Mono gold header chip "STAR GUIDE · ♈ ARIES · NOTE 1 / 3". sign = 'ARIES' (any case).
//   label overrides the whole text (e.g. 'STAR GUIDE · FIRE SIGNS · PEP TALK'). at = 0 → already on screen at frame 0.
//   out = [t0, t1] fade-out window (optional). Returns { root, update(t) }.
//
// guideHook(root, { text, at = 0, out, accentColor = GOLD, top = 230, size = 104, accentSize, gap = 0.06 })
//   DOM: the frame-0 headline, Inter 800 with *Garamond accent* words; '|' = line break. With at = 0 it is FULLY on
//   screen at t = 0 (thumbnail), then breathes; at > 0 pops in word by word. out = [t0, t1] exit (lifts + fades).
//   Example: guideHook(root, { text: '*Aries,* your star | has a note.', accentColor: RED, out: [2.6, 2.9] })
//   Returns { root, update(t) }.
//
// factChip(ctx, t, { text, at, dur = 3, x = 540, y = 1300, color = GOLD, size = 30, kicker = '★ ASTROLOGY SAYS' })
//   Canvas: a small pill with a gold "★ ASTROLOGY SAYS" kicker over the real-astrology fact (text; '|' = line break).
//   Pops in at `at`, holds `dur` s, pops out. Draw it every frame after your scene; it does nothing outside its window.
//
// guideCues(t, { gain = 0.03, pan = 0, notes }) → sound cues: a soft lantern chime (three bell notes + a glitter wisp).
//   Spread into CUES, e.g. at the lantern lighting, the chip, and the last line: [...guideCues(0.05), ...guideCues(4.2)]
//
// Also: loadGuideFonts() (await in build), pop01/outK/popOut easings, drawBits(ctx, bitmapRows, colours, cx, cy, cell,
//   { rot, outline, alpha, flipX }), drawBurst(ctx, cx, cy, R, t, t0, { word }), sparkles(ctx, t, cx, cy, t0, n, R, seed,
//   cols), wordPops(t0, n, gap, base, gain) — the same helpers as the ask<sign> kit.js.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el } from '../src/lib.js'
import { SIGNS, easeOutBack } from './wheel.js'
import { drawStarChar } from './startalk.js'
import { drawPixelStar } from './sky.js'

export const W = 1080
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9b8f0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const GLYPH = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const FONTS = ["800 104px Inter", "italic 500 150px 'EB Garamond'", "700 30px 'Space Mono'", "400 28px 'Space Mono'", "bold 58px 'EB Garamond'"]
export async function loadGuideFonts() { try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ } }

// ── the twelve guides
const ELEMENT = { aries: 'fire', leo: 'fire', sagittarius: 'fire', taurus: 'earth', virgo: 'earth', capricorn: 'earth',
  gemini: 'air', libra: 'air', aquarius: 'air', cancer: 'water', scorpio: 'water', pisces: 'water' }
export const GUIDE = Object.fromEntries(SIGNS.map(s => [s.id, { id: s.id, name: s.id.toUpperCase(), title: s.id[0].toUpperCase() + s.id.slice(1),
  glyph: s.glyph, color: s.color, element: ELEMENT[s.id] }]))
const ALIAS = { sag: 'sagittarius', cap: 'capricorn', aqua: 'aquarius' }
export const guideSign = id => GUIDE[ALIAS[id] || id]
export const guideSpeaker = glyph => `${glyph} YOUR STAR`

// ── easings
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, w) => (w ? 1 - ease.inQuad(prog(t, w[0], w[1])) : 1)
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ─────────────────────────────────────────────── the lantern
// 9 wide × 14 tall: hook ring, cap, glass with flame, base
const LANTERN = [
  '...HHH...',
  '..H...H..',
  '...HHH...',
  '..CCCCC..',
  '.CCCCCCC.',
  '.FGGGGGF.',
  '.FGGYGGF.',
  '.FGYWYGF.',
  '.FGYWYGF.',
  '.FGGYGGF.',
  '.FGGGGGF.',
  '.CCCCCCC.',
  '..CCCCC..',
  '...DDD...',
]
const LAMP_ROW = 7.5   // the flame's centre row
export function drawLantern(ctx, x, y, size, t, { glow = 1, swing = 0, flame = 1, alpha = 1, color = GOLD } = {}) {
  if (alpha <= 0 || size <= 0) return { x, y }
  const cell = Math.max(1, size / LANTERN.length)
  const sway = swing + 0.07 * Math.sin(t * 2.1) + 0.03 * Math.sin(t * 3.7 + 1)
  const flick = flame * (0.86 + 0.08 * Math.sin(t * 17) + 0.06 * Math.sin(t * 29 + 2))
  const ox = -LANTERN[0].length * cell / 2
  // lamp centre in world space (for the glow + the return value)
  const ly = LAMP_ROW * cell, lx = x - Math.sin(sway) * ly, lcy = y + Math.cos(sway) * ly
  ctx.save(); ctx.globalAlpha *= alpha
  if (glow > 0 && flick > 0) {
    const R = size * (2.1 + 0.15 * Math.sin(t * 5)) * clamp(glow, 0, 1.5)
    const g = ctx.createRadialGradient(lx, lcy, 0, lx, lcy, R)
    g.addColorStop(0, `rgba(255,214,120,${0.7 * flick * Math.min(1, glow)})`)
    g.addColorStop(0.35, `rgba(242,170,80,${0.3 * flick * Math.min(1, glow)})`)
    g.addColorStop(1, 'rgba(242,150,60,0)')
    ctx.fillStyle = g; ctx.fillRect(lx - R, lcy - R, R * 2, R * 2)
  }
  ctx.translate(x, y); ctx.rotate(sway)
  const lit = flick > 0.05
  const C = { H: '#c99a3a', C: color, D: '#9a6f24', F: color,
    G: lit ? `rgba(255,236,170,${0.55 + 0.35 * flick})` : 'rgba(80,64,120,0.85)',
    Y: lit ? '#ffcf4d' : 'rgba(80,64,120,0.85)', W: lit ? '#fffbea' : 'rgba(80,64,120,0.85)' }
  // ink outline
  const h = LANTERN.length, w = LANTERN[0].length
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && LANTERN[j][i] !== '.'
  ctx.fillStyle = INK
  for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) ctx.fillRect(ox + i * cell, j * cell, cell + 0.5, cell + 0.5)
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = LANTERN[j][i]; if (ch === '.') continue
    // the flame flickers: its tip cells blink a little
    if (ch === 'W' && j === 7 && flick < 0.9 && Math.sin(t * 23) > 0.6) continue
    ctx.fillStyle = C[ch]; ctx.fillRect(ox + i * cell, j * cell, cell + 0.5, cell + 0.5)
  }
  // a glint on the glass
  if (lit) { ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(ox + 2 * cell, 5 * cell, cell * 0.8, cell * 1.6) }
  ctx.restore()
  return { x: lx, y: lcy }
}

/** the guide: a sign star holding its lantern from one tip */
export function drawGuide(ctx, x, y, size, t, starOpts = {}, { lantern = 1, lanternSize, glow = 1, side = 1, flame = 1 } = {}) {
  const r = drawStarChar(ctx, x, y, size, t, starOpts)
  const pop = starOpts.pop ?? 1, a = starOpts.alpha ?? 1
  const cell = (size * pop) / 36
  // the right/left arm tip of the 36-cell sprite ≈ (±14.3, −3) cells from the sprite centre
  const tx = r.x + side * 18.2 * cell, ty = r.y - 4.4 * cell
  let lx = tx, ly = ty
  if (lantern > 0 && pop > 0.05) {
    // a short gold cord from the tip to the lantern's hook
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#c99a3a'
    const c = Math.max(2, Math.round(cell * 0.9))
    for (let k = 0; k <= 4; k++) ctx.fillRect(Math.round(lerp(r.x + side * 14.6 * cell, tx, k / 4) - c / 2), Math.round(lerp(r.y - 2.6 * cell, ty, k / 4) - c / 2), c, c)
    ctx.restore()
    const L = drawLantern(ctx, tx, ty, (lanternSize || size * 0.3) * lantern * pop, t, { glow, alpha: a, flame })
    lx = L.x; ly = L.y
  }
  return { ...r, lx, ly }
}

// ─────────────────────────────────────────────── DOM pieces
/** the header chip: "STAR GUIDE · ♈ ARIES · NOTE 1 / 3" */
export function noteChip(root, { sign = '', glyph = '', n, of = 3, at = 0, out, color = GOLD, top = 96, label } = {}) {
  const wrap = el('div', { position: 'absolute', left: '0', width: W + 'px', top: top + 'px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const txt = label || ['STAR GUIDE', `${glyph ? glyph + ' ' : ''}${String(sign).toUpperCase()}`, n ? `NOTE ${n} / ${of}` : null].filter(Boolean).join(' · ')
  const html = txt.replace(/[♈♉♊♋♌♍♎♏♐♑♒♓]/g, g => `<span style="font-family:${GLYPH};font-size:1.25em;vertical-align:-0.08em">${g}︎</span>`)
  const pill = el('div', { padding: '11px 26px 10px', borderRadius: '999px', background: 'rgba(16,10,38,0.86)', border: `2px solid ${color}`,
    boxShadow: `0 0 22px ${color}44, 0 6px 24px rgba(4,2,14,0.6)`, font: `700 30px ${MONO}`, letterSpacing: '0.12em', color, whiteSpace: 'nowrap',
    transformOrigin: '50% 50%' }, wrap, html)
  return {
    root: wrap,
    update(t) {
      const k = outK(t, out)
      const show = t >= at && k > 0
      wrap.style.display = show ? 'flex' : 'none'
      if (!show) return
      const p = at <= 0 ? 1 : easeOutBack(prog(t, at, at + 0.36), 2.4)
      pill.style.opacity = String(clamp(p * 3) * k)
      pill.style.transform = `translateY(${((1 - k) * -20).toFixed(1)}px) scale(${lerp(0.5, 1, p).toFixed(4)})`
    },
  }
}

/** the frame-0 headline: Inter 800 + *Garamond accent* words, fully on screen at t = 0 when at = 0 */
export function guideHook(root, { text, at = 0, out, accentColor = GOLD, top = 230, size = 104, accentSize, gap = 0.06, lineHeight = 1.04 } = {}) {
  const box = el('div', { position: 'absolute', left: '50px', width: (W - 100) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: 800, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.015em', pointerEvents: 'none' }, root)
  const ws = []
  let n = 0
  for (const w of text.split(' ')) {
    if (w === '|') { el('br', {}, box); continue }
    const acc = w.includes('*')
    const style = { display: 'inline-block', margin: '0 0.11em', transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || Math.round(size * 1.28)) + 'px', color: accentColor, letterSpacing: '0' })
    ws.push({ i: n++, acc, e: el('span', style, box, w.replace(/\*/g, '')) })
  }
  return {
    root: box,
    update(t) {
      const k = outK(t, out)
      const show = t >= at && k > 0
      box.style.display = show ? 'block' : 'none'
      if (!show) return
      for (const w of ws) {
        const t0 = at + w.i * gap
        const p = at <= 0 ? 1 : prog(t, t0, t0 + 0.3)
        const sc = 0.6 + 0.4 * easeOutBack(p, 2.4)
        // a slow breathe on the accent word so the thumbnail feels alive
        const br = w.acc ? 1 + 0.03 * Math.sin(t * 3.2) : 1
        const rot = w.acc ? 2.2 * Math.sin(t * 1.9) : 0
        w.e.style.opacity = String(clamp(p * 3) * k)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 - (1 - k) * 40).toFixed(2)}px) scale(${(sc * br * lerp(0.92, 1, k)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ─────────────────────────────────────────────── canvas fact chip
export function factChip(ctx, t, { text, at, dur = 3, x = 540, y = 1300, color = GOLD, size = 30, kicker = '★ ASTROLOGY SAYS' } = {}) {
  if (t < at || t > at + dur + 0.3) return
  const pin = easeOutBack(prog(t, at, at + 0.36), 2.4), pout = ease.inQuad(prog(t, at + dur, at + dur + 0.3))
  const a = clamp(pin * 3) * (1 - pout)
  if (a <= 0) return
  const rows = text.split('|')
  ctx.save()
  ctx.font = `700 ${size}px ${MONO}`
  const tw = Math.max(...rows.map(r => ctx.measureText(r).width))
  ctx.font = `700 ${Math.round(size * 0.78)}px ${MONO}`
  const kw = ctx.measureText(kicker).width
  const bw = Math.max(tw, kw) + 70, lh = size * 1.32, bh = 34 + size * 0.95 + rows.length * lh + 14
  ctx.globalAlpha *= a
  ctx.translate(x, y); ctx.scale(lerp(0.4, 1, pin) * lerp(1, 0.85, pout), lerp(0.4, 1, pin) * lerp(1, 0.85, pout)); ctx.rotate((1 - pin) * -0.08)
  ctx.shadowColor = color; ctx.shadowBlur = 24
  ctx.beginPath(); ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 30); ctx.fillStyle = 'rgba(16,10,38,0.92)'; ctx.fill()
  ctx.shadowBlur = 0; ctx.lineWidth = 3; ctx.strokeStyle = color; ctx.stroke()
  ctx.textAlign = 'center'; ctx.textBaseline = 'top'
  ctx.fillStyle = color; ctx.font = `700 ${Math.round(size * 0.78)}px ${MONO}`
  ctx.fillText(kicker.replace(/\s/g, ' '), 0, -bh / 2 + 20)
  ctx.fillStyle = BONE; ctx.font = `700 ${size}px ${MONO}`
  rows.forEach((r, i) => ctx.fillText(r, 0, -bh / 2 + 24 + size * 0.95 + i * lh))
  ctx.restore()
}

// ─────────────────────────────────────────────── sound
/** a soft lantern chime: three rising bell notes + a short glitter wisp */
export function guideCues(t, { gain = 0.03, pan = 0, notes = [1318.51, 1567.98, 1975.53] } = {}) {
  return [
    ...notes.map((f, i) => ['bell', +(t + i * 0.09).toFixed(3), f, gain * (1 - i * 0.18), 1.4, pan + (i - 1) * 0.2]),
    ['glitter', +(t + 0.05).toFixed(3), +(t + 0.45).toFixed(3)],
  ]
}
export const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

// ─────────────────────────────────────────────── shared pixel helpers (same as the ask<sign> kit)
/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flipX = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flipX) x.scale(-1, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

/** comic pixel burst with a word (e.g. "POP!") */
export function drawBurst(x, cx, cy, R, t, t0, { word = 'POP!', color = '#ffd34d', ink = INK, life = 0.7, size = 64 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = easeOutBack(clamp(tt / 0.18), 3), a = 1 - ease.inQuad(prog(tt, life * 0.6, life))
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(-0.12); x.scale(p, p)
  const n = 12
  x.beginPath()
  for (let i = 0; i < n * 2; i++) { const rr = i % 2 ? R * 0.62 : R * (0.95 + 0.08 * Math.sin(i * 7.3)); const ang = i * Math.PI / n; x.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr) }
  x.closePath(); x.fillStyle = color; x.fill(); x.lineWidth = 8; x.strokeStyle = ink; x.stroke()
  x.fillStyle = ink; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(word, 0, 4)
  x.restore()
}

/** a ring of pixel stars bursting out from (cx, cy) at t0 */
export function sparkles(x, t, cx, cy, t0, n = 10, R = 200, seed = 1, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
