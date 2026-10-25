// moonphases (15 s, vertical) · "New Moon vs Full Moon."
// One big line-art Moon is the hero; the sky's own little moon stays hidden until the end line.
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556):
//   0.00–0.40  fade up from black
//   0.12       "New Moon | vs Full Moon." pops in; "Moon." (gold) lands on beat 0 with a wobble
//   0.35/1.16  a dark NEW moon (left) and a bright FULL moon (right) pop in · 1.71 "VS" stamp slams down
//   3.00       title clears; the full moon spins away, the new moon glides up-left; a soil mound pops in
//   3.38       "New Moon: | plant the seed."  · seed drops 3.93 → lands 4.21 (squash + sparkle) · tip peeks 5.04
//   6.16–7.27  the Moon arcs across the screen and waxes (crescent → quarter → gibbous) while the sprout climbs
//   7.27       FULL: big burst, the flower blooms
//   7.55       "Full Moon: | see what grew."                                           (out 9.85)
//   9.90–10.4  plant pops away; the full Moon shrinks into slot 5 of a row of 8 phases popping in left → right
//   10.10      "One cycle ≈ | 29.5 days."  · a gold cursor hops along the row 10.8–11.9 (DAY counter),
//              then a dashed loop arrow swings back to the start                       (out 12.25)
//   12.55      "Look up | tonight." · "tonight." lands on beat 22 (12.82): the sky's crescent comes back with a
//              sparkle, a pictogram points up at it, pixel stars twinkle
//   14.30–15.0 fade to black (the last frame is black)
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'

export const DURATION = 15
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', SILVER = '#e3ecff', GREEN = '#5fdc7a', SOIL = '#c98a4a', LAV = '#b9a6ff'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)

// ── timeline
const T = {
  title: 0.12, newIn: 0.35, fullIn: BEAT(1), vs: BEAT(2), titleOut: 3.0,
  mound: 3.3, sub1: BEAT(5), seed: BEAT(6), land: BEAT(6.5), tip: BEAT(8), sub1Out: 6.0,
  wax: [BEAT(10), BEAT(12)], full: BEAT(12), sub2: BEAT(12.5), sub2Out: 9.85,
  rowGo: 9.9, row: 10.05, h3: 10.1, sweep: [10.8, 11.9], loop: [11.9, 12.2], rowOut: 12.25,
  end: BEAT(21.5), endWord: BEAT(22), out: 14.3, fin: 15.0,
}
// card-motif cuts: title clears (3.0) → mound/"plant the seed." (3.3/3.38) · caption out (6.0) → the Moon waxes (6.16)
//   plant pops away (9.9) → phase row/"One cycle" (10.05/10.1) · row out (12.25) → "Look up tonight." (12.55)
//   'deal' only at 6.1, where nothing new pops at the top (its last card lingers there ~0.3 s)
const CUTS = [{ t: 3.2, kind: 'flip' }, { t: 6.1, kind: 'deal' }, { t: 9.99, kind: 'shuffle' }, { t: 12.45, kind: 'fan' }]
const SLOTS = 8, ROW_Y = 900, SLOT = i => 540 + (i - 3.5) * 122, ROW_R = 52
const WAX_PH = [0.03, 0.125, 0.25, 0.375, 0.5]                               // phases the wax passes through (ticks)
const waxP = t => ease.inOutQuad(prog(t, ...T.wax))
const WAX_TICKS = WAX_PH.slice(1, -1).map(ph => { let lo = T.wax[0], hi = T.wax[1]; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (waxP(m) * 0.5 < ph) lo = m; else hi = m } return +lo.toFixed(3) })
const SWEEP_T = Array.from({ length: SLOTS }, (_, i) => +(T.sweep[0] + (i / SLOTS) * (T.sweep[1] - T.sweep[0])).toFixed(3))

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.38, s = 2.2) => easeOutBack(prog(t, t0, t0 + d), s)
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, a, d = 0.18) => 1 - ease.inQuad(prog(t, a, a + d))
const litOf = p => (1 - Math.cos(2 * Math.PI * p)) / 2
function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'; x.shadowColor = col; x.shadowBlur = glow; x.strokeStyle = col; x.lineWidth = w; x.stroke(); x.shadowBlur = 0
}

// ── the Moon (bold line art): dark disc + glowing rim, lit part filled bone, a few craters
const CRATERS = [[-0.36, -0.3, 0.2], [0.3, -0.42, 0.12], [0.4, 0.18, 0.17], [-0.18, 0.4, 0.13], [0.06, 0.0, 0.08], [-0.6, 0.12, 0.08], [0.12, 0.66, 0.08], [0.66, -0.1, 0.06]]
function litPath(x, cx, cy, r, p) {
  const k = litOf(p), wax = ((p % 1) + 1) % 1 < 0.5
  x.save(); x.translate(cx, cy); if (!wax) x.scale(-1, 1)
  x.beginPath()
  if (k >= 0.995) x.arc(0, 0, r, 0, Math.PI * 2)
  else { x.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false); x.ellipse(0, 0, Math.abs(1 - 2 * k) * r, r, 0, Math.PI / 2, -Math.PI / 2, k < 0.5); x.closePath() }
  x.restore()
}
function moon(x, cx, cy, R, p, a = 1, { rot = 0, lw = null } = {}) {
  if (a <= 0.003 || R < 1) return
  const k = litOf(p), LW = lw ?? clamp(R / 30, 3, 8)
  x.save(); x.globalAlpha *= a
  // halo, grows with the light
  x.globalCompositeOperation = 'lighter'
  const hr = R * (1.7 + 1.3 * k), g = x.createRadialGradient(cx, cy, R * 0.7, cx, cy, hr)
  g.addColorStop(0, `rgba(240,232,214,${0.12 + 0.42 * k})`); g.addColorStop(0.4, `rgba(185,166,255,${0.06 + 0.12 * k})`); g.addColorStop(1, 'rgba(185,166,255,0)')
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, hr, 0, Math.PI * 2); x.fill()
  x.globalCompositeOperation = 'source-over'
  // dark disc
  const d = x.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R)
  d.addColorStop(0, '#2e2860'); d.addColorStop(1, '#130f2c')
  x.fillStyle = d; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill()
  x.save(); x.translate(cx, cy); x.rotate(rot)
  for (const [u, v, r] of CRATERS) { x.beginPath(); x.arc(u * R, v * R, r * R, 0, Math.PI * 2); x.strokeStyle = 'rgba(150,135,230,0.32)'; x.lineWidth = LW * 0.55; x.stroke() }
  x.restore()
  // the lit part
  if (k > 0.004) {
    x.save(); litPath(x, cx, cy, R, p); x.clip()
    const l = x.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.1, cx, cy, R)
    l.addColorStop(0, '#fffaf0'); l.addColorStop(1, '#e6dac4')
    x.fillStyle = l; x.fillRect(cx - R, cy - R, 2 * R, 2 * R)
    x.translate(cx, cy); x.rotate(rot)
    for (const [u, v, r] of CRATERS) {
      x.beginPath(); x.arc(u * R, v * R, r * R, 0, Math.PI * 2); x.fillStyle = 'rgba(196,178,150,0.55)'; x.fill()
      x.strokeStyle = 'rgba(160,140,112,0.7)'; x.lineWidth = LW * 0.55; x.stroke()
    }
    x.restore()
    if (k < 0.995) { litPath(x, cx, cy, R, p); x.lineJoin = 'round'; x.strokeStyle = 'rgba(255,248,232,0.95)'; x.lineWidth = LW * 0.6; x.stroke() }
  }
  // glowing rim
  x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2)
  x.shadowColor = rgba(k > 0.5 ? BONE : LAV, 0.95); x.shadowBlur = R * 0.22 + 10; x.strokeStyle = k > 0.5 ? '#fff6e2' : '#cfc4ff'; x.lineWidth = LW; x.stroke()
  x.restore()
}

// ── sparkle bursts (pixel stars)
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
function sparkle(x, px, py, t, t0, { n = 10, rad = 150, seed = 1, cols = SPARK, size = 28, dur = 0.8 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save(); x.imageSmoothingEnabled = false
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.5, d = rad * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = ease.outCubic(Math.min(1, tt / (dur * 0.75)))
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  x.restore()
}

// ── soil, seed, sprout, bloom (ground line at local y 0; mound top at y −96)
function mound(x, cx, cy, s, a) {
  if (a <= 0.003 || s <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(s, s); x.globalAlpha *= a
  x.beginPath(); x.moveTo(-250, 0); x.bezierCurveTo(-170, -30, -110, -96, 0, -96); x.bezierCurveTo(110, -96, 170, -30, 250, 0); x.closePath()
  ink(x, SOIL, { w: 8, fa: 0.34 })
  x.beginPath(); x.moveTo(-330, 0); x.lineTo(330, 0); ink(x, SOIL, { w: 8, fa: 0 })
  // pebbles
  x.fillStyle = rgba(SOIL, 0.8)
  for (const [u, v, r] of [[-120, -30, 8], [-60, -58, 6], [70, -48, 9], [140, -22, 6], [10, -30, 5], [-170, -12, 5]]) { x.beginPath(); x.arc(u, v, r, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function seed(x, px, py, s, a, sq = 1) {
  if (a <= 0.003 || s <= 0.01) return
  x.save(); x.translate(px, py); x.scale(s / sq, s * sq); x.globalAlpha *= a
  x.beginPath(); x.moveTo(0, -34); x.bezierCurveTo(26, -22, 28, 18, 0, 30); x.bezierCurveTo(-28, 18, -26, -22, 0, -34); x.closePath()
  ink(x, GOLD, { w: 6, fa: 0.5, glow: 16 })
  x.beginPath(); x.moveTo(0, -20); x.quadraticCurveTo(8, 0, 0, 18); ink(x, '#fff1c4', { w: 3, fa: 0, glow: 6 })
  x.restore()
}
/** g 0..1: stem height; bloom 0..1 */
function plant(x, px, py, s, t, g, bloom, a = 1) {
  if (a <= 0.003 || g <= 0.005) return
  x.save(); x.translate(px, py); x.scale(s, s); x.globalAlpha *= a
  const hgt = 330 * g, sw = (10 * Math.sin(t * 2.2) + 6 * Math.sin(t * 3.7)) * g
  const top = { x: sw, y: -hgt }
  x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(28 * g, -hgt * 0.35, -26 * g, -hgt * 0.7, top.x, top.y); ink(x, GREEN, { w: 9, fa: 0, glow: 16 })
  const leaf = (lx, ly, ang, L) => { if (L < 2) return; x.save(); x.translate(lx, ly); x.rotate(ang); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(L * 0.5, -L * 0.42, L, 0); x.quadraticCurveTo(L * 0.5, L * 0.42, 0, 0); ink(x, GREEN, { w: 6, fa: 0.4, glow: 12 }); x.restore() }
  const L1 = 110 * clamp((g - 0.12) / 0.4), L2 = 96 * clamp((g - 0.35) / 0.4)
  leaf(6 * g, -hgt * 0.3, -0.5 + 0.06 * Math.sin(t * 2.6), L1)
  leaf(-4 * g, -hgt * 0.56, Math.PI + 0.45 + 0.06 * Math.sin(t * 2.3 + 1), L2)
  if (g < 0.5 && bloom <= 0) {                    // a little bud curl at the tip while it is young
    x.beginPath(); x.arc(top.x + 10, top.y + 4, 12, Math.PI, Math.PI * 2.6); ink(x, GREEN, { w: 6, fa: 0, glow: 10 })
  }
  if (bloom > 0.01) {
    x.save(); x.translate(top.x, top.y - 10)
    const halo = x.createRadialGradient(0, 0, 10, 0, 0, 220 * bloom)
    halo.addColorStop(0, `rgba(255,143,177,${0.35 * clamp(bloom)})`); halo.addColorStop(1, 'rgba(255,143,177,0)')
    x.globalCompositeOperation = 'lighter'; x.fillStyle = halo; x.beginPath(); x.arc(0, 0, 220 * bloom, 0, Math.PI * 2); x.fill(); x.globalCompositeOperation = 'source-over'
    x.rotate(0.25 * Math.sin(t * 0.9))
    for (let i = 0; i < 8; i++) {
      const pk = clamp(bloom * 1.6 - i * 0.07)
      if (pk <= 0) continue
      const an = i * Math.PI / 4
      x.save(); x.rotate(an); x.scale(pk, pk)
      x.beginPath(); x.ellipse(58, 0, 46, 28, 0, 0, Math.PI * 2); ink(x, PINK, { w: 6, fa: 0.42, glow: 16 })
      x.restore()
    }
    x.scale(clamp(bloom), clamp(bloom))
    x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); ink(x, GOLD, { w: 6, fa: 0.85, glow: 16 })
    x.restore()
  }
  x.restore()
}

/** pictogram person (no face) pointing up-right; k 0..1 raises the arm */
function person(x, px, py, s, k, a) {
  if (a <= 0.003 || s <= 0.01) return
  x.save(); x.translate(px, py); x.scale(s, s); x.globalAlpha *= a
  x.strokeStyle = BONE; x.lineWidth = 9; x.lineCap = 'round'; x.lineJoin = 'round'; x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 16
  x.beginPath(); x.moveTo(-22, 0); x.lineTo(0, -60); x.lineTo(22, 0)            // legs
  x.moveTo(0, -60); x.lineTo(0, -130)                                            // body
  x.moveTo(0, -118); x.lineTo(-30, -78)                                          // resting arm
  const ang = lerp(0.9, -0.95, k)                                                // pointing arm swings up toward the moon
  x.moveTo(0, -118); x.lineTo(Math.cos(ang) * 64, -118 + Math.sin(ang) * 64)
  x.stroke()
  x.fillStyle = BONE; x.beginPath(); x.arc(4, -160, 22, 0, Math.PI * 2); x.fill()
  x.restore()
}

/** springy word-by-word type (from dummies): `*word*` = accent (Garamond italic, colour), `|` = line break */
function popText(parent, text, { top, size, font = INTER, weight, accentColor = GOLD, accentSize, gap = 0.07, at: t0, lastAt = null, wobble = false, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.02, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' '), ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.13em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.12) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    ws.push({ t: isLast && lastAt != null ? lastAt : t0 + n * gap, big: isLast && lastAt != null, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    times: ws.map(w => w.t),
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}
// copy (shared with CUES so word pops and sounds stay in sync without a DOM)
const COPY = {
  h0: ['New Moon | vs *Full* *Moon.*', { at: T.title, gap: 0.08, lastAt: BEAT(0), wobble: true }],
  s1: ['New Moon: | plant the *seed.*', { at: T.sub1, accentColor: GREEN }],
  s2: ['Full Moon: | see what *grew.*', { at: T.sub2, accentColor: PINK }],
  h3: ['One cycle ≈ | *29.5* *days.*', { at: T.h3 }],
  h4: ['Look up | *tonight.*', { at: T.end, lastAt: T.endWord, wobble: true }],
}
const wordTimes = ([text, o]) => { const toks = text.split(' ').filter(w => w !== '|'); return toks.map((_, i) => i === toks.length - 1 && o.lastAt != null ? o.lastAt : o.at + i * (o.gap ?? (text === COPY.s1[0] || text === COPY.s2[0] ? 0.06 : 0.07))) }

// end-card twinkles (kept off the type block)
const TWINK = (() => { const r = rng(4711), o = []; while (o.length < 16) { const px = 90 + r() * 900, py = 120 + r() * 1700; if ((py > 260 && py < 760) || (px > 820 && py < 280)) continue; o.push({ x: px, y: py, ph: r() * 6.28, sp: 1.6 + r() * 2, kind: Math.floor(r() * 3), col: SPARK[Math.floor(r() * SPARK.length)], size: 14 + 7 * Math.floor(r() * 2), d: r() * 0.5 }) } return o })()

async function build(stage) {
  try { await Promise.all(['800 108px Inter', '800 160px Inter', '700 62px Inter', "italic 500 118px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const mk = (k, opts) => k[0] === 'h'
    ? popText(root, COPY[k][0], { top: 215, size: TYPE.headSize, weight: 800, ...COPY[k][1], ...opts })
    : popText(root, COPY[k][0], { top: TYPE.subY - 40, size: 68, weight: 700, gap: 0.06, accentSize: 78, ...COPY[k][1], ...opts })
  const H0 = mk('h0', { size: 124, accentSize: 138 }), S1 = mk('s1'), S2 = mk('s2'), H3 = mk('h3'), H4 = mk('h4', { top: 300, size: 156, accentSize: 176 })
  const fxc = layerCanvas(root, { pointerEvents: 'none' }), fx = fxc.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const label = (txt, px, py, a, col = BONE, size = 50) => {
    if (a <= 0.003) return
    x.save(); x.globalAlpha = a; x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '6px'
    x.fillStyle = col; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 14; x.fillText(txt, px, py); x.restore()
  }

  // ─── title: NEW (left) vs FULL (right)
  function drawTitle(t) {
    if (t > T.titleOut + 0.7) return
    const nk = pop01(t, T.newIn, 0.45, 2.4)
    const fk = pop01(t, T.fullIn, 0.45, 2.6) * outScale(t, T.titleOut, 0.35)
    const bob = i => 12 * Math.sin(t * 2.2 + i * 2)
    // the full moon spins away
    if (fk > 0) moon(x, 810, 1010 + bob(1), 175 * fk, 0.5, clamp(fk * 2), { rot: 0.6 * prog(t, T.titleOut, T.titleOut + 0.35) * 6 })
    label('FULL', 810, 1260 + bob(1), clamp(fk * 2) * outK(t, T.titleOut - 0.1), GOLD)
    label('NEW', 270, 1260 + bob(0), clamp(nk * 2) * outK(t, T.titleOut - 0.1), LAV)
    sparkle(fx, 810, 1010, t, T.fullIn + 0.05, { n: 12, rad: 260, seed: 3, size: 32 })
    sparkle(fx, 270, 1010, t, T.newIn + 0.05, { n: 8, rad: 200, seed: 2, size: 26, cols: [LAV, SILVER, '#c9a6ff'] })
    // VS stamp
    const vk = pop01(t, T.vs, 0.32, 3.2) * outScale(t, T.titleOut + 0.05)
    if (vk > 0) {
      const wob = 8 * Math.sin((t - T.vs) * 16) * Math.exp(-(t - T.vs) * 4)
      x.save(); x.translate(540, 1010); x.rotate((-8 + wob) * Math.PI / 180); x.scale(vk * (1 + 0.6 * (1 - clamp((t - T.vs) / 0.12))), vk)
      x.beginPath(); x.arc(0, 0, 74, 0, Math.PI * 2)
      x.fillStyle = 'rgba(20,14,44,0.92)'; x.fill(); ink(x, GOLD, { w: 8, fa: 0, glow: 26 })
      x.font = `italic 900 78px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 20
      x.fillText('VS', -4, 6); x.restore()
      sparkle(fx, 540, 1010, t, T.vs, { n: 12, rad: 190, seed: 4, size: 26, cols: [GOLD, '#ffd98a', '#fff3e0'] })
    }
  }

  // ─── the hero Moon: new (left) → waxes across → full (right) → shrinks into the phase row
  const HERO0 = { x: 270, y: 1010, r: 175 }, HERO1 = { x: 320, y: 560, r: 225 }, HERO2 = { x: 760, y: 560, r: 225 }
  function heroState(t) {
    if (t < T.titleOut) return { ...HERO0, y: HERO0.y + 12 * Math.sin(t * 2.2), r: HERO0.r * pop01(t, T.newIn, 0.45, 2.4), p: 0 }
    const g = ease.inOutCubic(prog(t, T.titleOut, T.titleOut + 0.55))
    let px = lerp(HERO0.x, HERO1.x, g), py = lerp(HERO0.y, HERO1.y, g), r = lerp(HERO0.r, HERO1.r, g)
    const w = waxP(t)
    const bob = 10 * Math.sin(t * 2)
    px = lerp(px, HERO2.x, w); py = py - 150 * Math.sin(Math.PI * w) + bob
    const land = t > T.full ? 0.08 * Math.sin((t - T.full) * 14) * Math.exp(-(t - T.full) * 4) : 0
    r = r * (1 + land)
    const p = 0.5 * w
    // into the row
    const q = ease.inOutCubic(prog(t, T.rowGo, T.rowGo + 0.5))
    if (q > 0) { px = lerp(px, SLOT(4), q); py = lerp(py, ROW_Y, q); r = lerp(r, ROW_R, q) }
    return { x: px, y: py, r, p, q }
  }
  function drawHero(t) {
    if (t < T.newIn || t > T.rowOut + 0.5) return
    const h = heroState(t)
    if (h.q >= 1) return                                   // the row draws slot 5 from here on
    moon(x, h.x, h.y, h.r, h.p, 1, { rot: 0.15 * Math.sin(t * 0.8) })
    WAX_TICKS.forEach((tt, i) => sparkle(fx, h.x + h.r * 0.9, h.y - h.r * 0.2, t, tt, { n: 5, rad: 90, seed: 30 + i, size: 20, cols: [BONE, SILVER, GOLD] }))
  }

  // ─── soil + seed + plant
  const GX = 540, GY = 1420, GS = 1.25
  function drawGarden(t) {
    if (t < T.mound || t > T.rowGo + 0.6) return
    const gone = outScale(t, T.rowGo, 0.35)
    const mk_ = pop01(t, T.mound, 0.42, 2.2) * gone
    mound(x, GX, GY, GS * mk_, clamp(mk_ * 2))
    // the seed: drops from above the mound, squashes, settles in
    if (t >= T.seed - 0.15) {
      const f = ease.inQuad(prog(t, T.seed, T.land))
      const sy = t < T.seed ? GY - 700 : lerp(GY - 760, GY - 96 * GS - 4, f)
      const tl = t - T.land, sq = tl > 0 ? 1 - 0.28 * Math.sin(Math.min(Math.PI, tl * 12)) * Math.exp(-tl * 4) : 1 + 0.15 * f
      const sk = pop01(t, T.seed - 0.15, 0.3) * gone * (1 - clamp((t - T.wax[0] - 0.3) / 0.4))
      seed(x, GX, sy, 1.4 * sk, clamp(sk * 2), sq)
      // a little dashed "planted" arc of soil kicked up
      const kp = prog(t, T.land, T.land + 0.45)
      if (kp > 0 && kp < 1) for (let i = 0; i < 6; i++) {
        const an = Math.PI + (i + 0.5) / 6 * Math.PI, d = 30 + 110 * kp
        x.save(); x.globalAlpha = 1 - kp; x.fillStyle = SOIL; x.beginPath(); x.arc(GX + Math.cos(an) * d, GY - 120 + Math.sin(an) * d * 0.7 + 70 * kp * kp, 9, 0, Math.PI * 2); x.fill(); x.restore()
      }
      sparkle(fx, GX, GY - 130, t, T.land, { n: 9, rad: 150, seed: 11, size: 24, cols: [GOLD, GREEN, '#fff3e0'] })
    }
    // the sprout: tip peeks at T.tip, climbs while the Moon waxes, blooms at full
    const g = t < T.tip ? 0 : lerp(0.11 * easeOutBack(prog(t, T.tip, T.tip + 0.4), 3), 1, ease.inOutCubic(prog(t, T.wax[0] + 0.1, T.full + 0.1)))
    const bl = easeOutBack(prog(t, T.full, T.full + 0.6), 1.8)
    plant(x, GX, GY - 96 * GS, GS, t, g * gone, bl, clamp(gone * 2))
    sparkle(fx, GX, GY - 120 - 14, t, T.tip, { n: 6, rad: 90, seed: 12, size: 20, cols: [GREEN, '#fff3e0'] })
    sparkle(fx, GX, GY - 120 - 425, t, T.full + 0.1, { n: 12, rad: 230, seed: 13, size: 30, cols: [PINK, GOLD, GREEN, '#fff3e0'] })
  }

  // ─── the phase row, cursor and loop arrow
  function drawRow(t) {
    if (t < T.row - 0.05 || t > T.rowOut + 0.6) return
    const ORDER = [0, 1, 2, 3, 5, 6, 7]
    const cur = t >= T.sweep[0] ? Math.min(SLOTS - 1, Math.floor((t - T.sweep[0]) / ((T.sweep[1] - T.sweep[0]) / SLOTS))) : -1
    for (let i = 0; i < SLOTS; i++) {
      const t0 = i === 4 ? T.rowGo + 0.5 : T.row + ORDER.indexOf(i) * 0.085
      if (t < t0) continue
      const k = (i === 4 ? 1 : pop01(t, t0, 0.36, 2.4)) * outScale(t, T.rowOut + i * 0.03)
      if (k <= 0) continue
      const ct = SWEEP_T[i], lift = t >= ct ? Math.exp(-(t - ct) * 5) : 0
      const isCur = i === cur && t < T.loop[1]
      const bob = 6 * Math.sin(t * 2.4 + i * 0.8) - 26 * Math.sin(Math.min(Math.PI, (t - ct) * 7)) * (t >= ct ? 1 : 0) * lift
      const s = k * (1 + 0.22 * lift + (isCur ? 0.08 : 0))
      moon(x, SLOT(i), ROW_Y + bob, ROW_R * s, i / SLOTS, clamp(k * 2), { lw: 4 })
      if (isCur) {
        x.save(); x.beginPath(); x.arc(SLOT(i), ROW_Y + bob, ROW_R * s + 14, 0, Math.PI * 2); ink(x, GOLD, { w: 5, fa: 0, glow: 18 }); x.restore()
      }
      sparkle(fx, SLOT(i), ROW_Y, t, t0 + 0.05, { n: 5, rad: 80, seed: 50 + i, size: 18, cols: [BONE, LAV, GOLD], dur: 0.6 })
    }
    // dashed loop arrow from the last moon back to the first
    const lp = ease.inOutCubic(prog(t, ...T.loop)) * outK(t, T.rowOut, 0.25)
    if (lp > 0) {
      const P0 = { x: SLOT(7), y: ROW_Y + 72 }, P1 = { x: 540, y: ROW_Y + 250 }, P2 = { x: SLOT(0), y: ROW_Y + 72 }
      const N = 40, n = Math.max(2, Math.round(N * clamp(prog(t, ...T.loop) * 1.0001)))
      const q = u => ({ x: (1 - u) ** 2 * P0.x + 2 * (1 - u) * u * P1.x + u * u * P2.x, y: (1 - u) ** 2 * P0.y + 2 * (1 - u) * u * P1.y + u * u * P2.y })
      const uEnd = ease.inOutCubic(prog(t, ...T.loop))
      x.save(); x.globalAlpha = clamp(lp * 3)
      x.beginPath(); for (let j = 0; j <= N; j++) { const pt = q(uEnd * j / N); j ? x.lineTo(pt.x, pt.y) : x.moveTo(pt.x, pt.y) }
      x.setLineDash([22, 16]); x.lineDashOffset = -t * 50; ink(x, GOLD, { w: 6, fa: 0, glow: 16 }); x.setLineDash([])
      const tip = q(uEnd), pre = q(Math.max(0, uEnd - 0.04)), an = Math.atan2(tip.y - pre.y, tip.x - pre.x)
      x.beginPath(); x.moveTo(tip.x - Math.cos(an - 0.55) * 30, tip.y - Math.sin(an - 0.55) * 30); x.lineTo(tip.x, tip.y); x.lineTo(tip.x - Math.cos(an + 0.55) * 30, tip.y - Math.sin(an + 0.55) * 30)
      ink(x, GOLD, { w: 6, fa: 0, glow: 16 })
      x.restore()
      void n
    }
    sparkle(fx, SLOT(0), ROW_Y, t, T.loop[1] - 0.05, { n: 10, rad: 140, seed: 60, size: 26, cols: [GOLD, '#ffd98a', '#fff3e0'] })
    // DAY counter
    const dk = pop01(t, T.sweep[0] - 0.15, 0.36, 2.4) * outScale(t, T.rowOut + 0.1)
    if (dk > 0) {
      const u = prog(t, ...T.sweep), day = u >= 1 ? '29.5' : String(Math.floor(29.5 * u))
      const bump = SWEEP_T.reduce((m, ct) => Math.max(m, Math.sin(Math.PI * prog(t, ct, ct + 0.16))), 0) + Math.sin(Math.PI * prog(t, T.sweep[1], T.sweep[1] + 0.3)) * 1.5
      x.save(); x.translate(540, 1330); x.scale(dk * (1 + 0.06 * bump), dk * (1 + 0.06 * bump)); x.globalAlpha = clamp(dk * 2)
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 16
      x.font = `700 40px ${MONO}`; x.letterSpacing = '8px'; x.fillStyle = LAV; x.fillText('DAY', 0, -88)
      x.letterSpacing = '0px'; x.font = `800 150px ${INTER}`; x.fillStyle = u >= 1 ? GOLD : BONE; if (u >= 1) { x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 28 }
      x.fillText(day, 0, 20)
      x.restore()
      sparkle(fx, 540, 1340, t, T.sweep[1], { n: 12, rad: 220, seed: 61, size: 28 })
    }
  }

  // ─── end: the sky's crescent returns; a pictogram points up at it
  function drawEnd(t, skyMoonA) {
    if (t < T.end - 0.1) return
    const MX = SKY_H.moon.x, MY = SKY_H.moon.y
    if (skyMoonA > 0) {
      const pulse = 0.5 + 0.5 * Math.sin((t - T.endWord) * 3)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(MX, MY, 20, MX, MY, 190)
      g.addColorStop(0, `rgba(242,199,92,${(0.28 + 0.12 * pulse) * skyMoonA})`); g.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = g; x.beginPath(); x.arc(MX, MY, 190, 0, Math.PI * 2); x.fill(); x.restore()
    }
    sparkle(fx, MX, MY, t, T.endWord, { n: 12, rad: 170, seed: 70, size: 28, cols: [GOLD, '#ffd98a', '#fff3e0', LAV] })
    const pk = pop01(t, T.end + 0.15, 0.45, 2.2)
    const arm = easeOutBack(prog(t, T.endWord - 0.1, T.endWord + 0.3), 2.6)
    person(x, 300, 1700, 2.3 * pk, arm, clamp(pk * 2))
    person(x, 520, 1720, 1.9 * pop01(t, T.end + 0.3, 0.45, 2.2), easeOutBack(prog(t, T.endWord + 0.1, T.endWord + 0.5), 2.6), clamp(pop01(t, T.end + 0.3) * 2))
    // the ground they stand on
    const gk = ease.outCubic(prog(t, T.end, T.end + 0.4))
    if (gk > 0) { x.save(); x.globalAlpha = 0.7 * gk; x.beginPath(); x.moveTo(540 - 470 * gk, 1712); x.lineTo(540 + 470 * gk, 1712); ink(x, BONE, { w: 6, fa: 0, glow: 12 }); x.restore() }
    // twinkles
    x.save(); x.imageSmoothingEnabled = false
    for (const s of TWINK) {
      const a = ease.outQuad(prog(t, T.endWord + s.d, T.endWord + s.d + 0.4)) * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph)))
      if (a > 0.02) { x.globalAlpha = a; drawPixelStar(x, s.x, s.y, s.size, s.kind, s.col) }
    }
    x.restore()
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      // the sky's crescent hides while the big Moon is the subject, then comes back for "tonight."
      const skyMoonA = ease.outCubic(prog(t, T.endWord - 0.2, T.endWord + 0.25))
      drawSky(x, t, { ...SKY_H, moon: { ...SKY_H.moon, alpha: skyMoonA } })
      fx.clearRect(0, 0, W, H)
      drawTitle(t); drawGarden(t); drawRow(t); drawHero(t); drawEnd(t, skyMoonA)
      H0.update(t, outK(t, T.titleOut)); S1.update(t, outK(t, T.sub1Out)); S2.update(t, outK(t, T.sub2Out)); H3.update(t, outK(t, T.rowOut)); H4.update(t)
      drawGrain(gx, t)
      black.style.opacity = String(t >= T.fin - 0.035 ? 1 : Math.max(1 - ease.inOutQuad(prog(t, 0, 0.4)), ease.inOutQuad(prog(t, T.out, T.fin))))
    },
  }
}
export const SCENES = [build, cardFrame({ start: 0, end: DURATION, fadeOut: T.fin - T.out }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]   // D major pentatonic-ish
const pops = (key, base, gain = 0.045) => wordTimes(COPY[key]).map((t, i, a) => ['pop', +t.toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i - (a.length - 1) / 2) * 0.12])
export const CUES = [
  ...pops('h0', 0, 0.05), ['pluck', BEAT(0), 1174.66, 0.05, 0.6, 0],
  ['pop', T.newIn, 659.25, 0.055, -0.35],
  ['pop', T.fullIn, 1174.66, 0.06, 0.35], ['bell', T.fullIn + 0.02, 1318.51, 0.028, 1.4, 0.35], ['glitter', T.fullIn, T.fullIn + 0.6],
  ['pop', T.vs, 880, 0.065, 0], ['boom', T.vs, 0.07], ['tick', T.vs + 0.02, 0.04],
  ['whoosh', T.titleOut, 0.5, 0.04],
  ['pop', T.mound, 587.33, 0.05, 0], ...pops('s1', 1, 0.04),
  ['whoosh', T.seed, T.land - T.seed, 0.03], ['pluck', T.land, 440, 0.055, 0.5, 0], ['pop', T.land, 739.99, 0.06, 0], ['tick', T.land + 0.03, 0.035],
  ['pop', T.tip, 1318.51, 0.045, 0.1],
  ['riser', T.wax[0], T.full, 0.025],
  ...WAX_TICKS.map((tt, i) => ['pop', tt, [880, 987.77, 1174.66][i], 0.04, 0.1 + i * 0.1]),
  ['pluck', T.full, 587.33, 0.06, 0.9, 0], ['bell', T.full + 0.02, 1174.66, 0.035, 1.8, 0.2], ['pop', T.full, 1479.98, 0.06, 0.2], ['glitter', T.full, T.full + 0.9],
  ...pops('s2', 2, 0.04),
  ['whoosh', T.rowGo, 0.5, 0.04],
  ...[0, 1, 2, 3, 5, 6, 7].map((i, j) => ['pop', +(T.row + j * 0.085).toFixed(3), [587.33, 659.25, 739.99, 880, 987.77, 1108.73, 1174.66][j], 0.035, (i - 3.5) * 0.12]),
  ...pops('h3', 3, 0.04),
  ...SWEEP_T.map((tt, i) => ['tick', tt, 0.035]),
  ...SWEEP_T.map((tt, i) => ['pop', tt, [740, 880, 988, 1108.73, 1174.66, 1318.51, 1479.98, 1760][i], 0.03, (i - 3.5) * 0.12]),
  ['whoosh', T.loop[0], T.loop[1] - T.loop[0], 0.035], ['pluck', T.loop[1], 1174.66, 0.045, 0.6, -0.3], ['glitter', T.sweep[1], T.sweep[1] + 0.5],
  ['whoosh', T.rowOut, 0.4, 0.035],
  ...pops('h4', 0, 0.05), ['pop', T.endWord, 1318.51, 0.065, 0], ['bell', T.endWord + 0.02, 1760, 0.03, 1.8, 0.4], ['glitter', T.endWord, T.endWord + 1.2],
  ['pluck', T.endWord + 0.02, 587.33, 0.05, 1.0, 0],
  ['bell', T.out + 0.05, 293.66, 0.03, 2.2, 0],
  ...cardCutCues(CUTS),
].sort((a, b) => a[1] - b[1])
