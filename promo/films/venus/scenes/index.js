// venus (30 s, vertical 1080×1920): "Your Venus sign = how you love."
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas (sky + art), DOM type above it, grain on top. Pure f(t).
//   0.00–0.40  fade up from black; hook headline pops word by word from 0.10
//   0.60       Venus pops in (pink orb + pixel glint), pixel hearts orbit it, ♀ under it        (out 3.55)
//   3.93       FIRE VENUS  · fireworks, a big heart-shaped burst · "Big gestures. Bold moves."
//   7.82       EARTH VENUS · a gift box drops, a fresh loaf, the lid pops, a week of ticks · "Shows up. Every time."
//  11.71       AIR VENUS   · two chat bubbles fly in and chat, hearts fly between them · "Falls for a great conversation."
//  15.60       WATER VENUS · a heart-shaped sea fills and sloshes, splashes · "Feels everything. Deeply."
//  19.49       FUN FACT "Venus never strays far from the Sun." top-down Sun, Venus on a leash; seen from Earth it
//              swings out to its ≈47° limit on each side (the pink fan)
//  23.38       a strip of 5 signs around the Sun's sign; Venus hops 1, 2 signs, tugs at 3 and snaps back, leaps to −2
//              "So it's in your Sun sign, or up to two signs away."
//  26.71       "Go look up your Venus." + Venus bounces back with element-coloured hearts and a heart confetti pop
//  29.30–30.0  fade to black (black from 29.965)
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { W, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, ELEMENT_COLOR, easeOutBack } from '../../wheel.js'
import { ink, heartPath, pixelHeart, fireworks, giftBox, bread, bubble, waveHeart, splash, BONE, GOLD, PINK, ROSE, hexA } from './illus.js'

export const DURATION = 30
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const VS = '︎'
const BEAT = n => 0.6 + n * 0.5556
const D2R = Math.PI / 180, TAU = Math.PI * 2
const sign = id => SIGNS.find(s => s.id === id)
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const wob = (t, t0, amp = 8, f = 14, d = 3.4) => t > t0 ? amp * Math.sin((t - t0) * f) * Math.exp(-(t - t0) * d) : 0

// ── timeline
const HOOK = { head: 0.1, orb: BEAT(0), hearts: BEAT(1), glyph: BEAT(2), out: 3.55 }
const SEG_T = [BEAT(6), BEAT(13), BEAT(20), BEAT(27)]
const SEG_LEN = 3.6                                   // heads/art leave at s + 3.6
const F0 = BEAT(34)                                   // fun fact
const FACT = { sun: F0 + 0.35, orbits: [F0 + 0.45, F0 + 0.9], earth: F0 + 0.75, venus: BEAT(36), fan: [F0 + 1.25, F0 + 1.6], swing: [F0 + 1.55, F0 + 3.75], out: BEAT(41) - 0.15 }
const STRIP = { in: BEAT(41), sun: BEAT(41.5), venus: BEAT(42), hop1: BEAT(43), tug: BEAT(43.75), back: BEAT(44.25), leap: BEAT(45.5), out: 26.45 }
const E0 = BEAT(47), END = { venus: BEAT(48), confetti: BEAT(48.5), out: 29.3, black: 29.965 }

// ── orbit geometry (top-down): Venus's orbit radius = sin 47° × Earth's, so the max elongation is 47°
const MAXE = 47
const ORB = { cx: 540, cy: 990, rE: 400 }
ORB.rV = ORB.rE * Math.sin(MAXE * D2R)
const phiAt = t => 180 - 240 * ease.inOutQuad(prog(t, ...FACT.swing))         // Venus's angle at the Sun, from the Sun→Earth line
const vPos = phi => ({ x: ORB.cx + ORB.rV * Math.sin(phi * D2R), y: ORB.cy + ORB.rV * Math.cos(phi * D2R) })
const ePos = { x: ORB.cx, y: ORB.cy + ORB.rE }
const elongOf = phi => { const v = vPos(phi), a = Math.atan2(v.x - ePos.x, -(v.y - ePos.y)); return a / D2R }   // signed, +east (screen right)
const timeOfPhi = target => { let lo = FACT.swing[0], hi = FACT.swing[1]; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (phiAt(m) > target) lo = m; else hi = m } return lo }
const MAX_T = [timeOfPhi(90 - MAXE), timeOfPhi(-(90 - MAXE))]

// ── elements
const ELEMS = [
  { id: 'fire', name: 'Fire', signs: ['aries', 'leo', 'sagittarius'], punch: 'Big gestures. | *Bold* *moves.*' },
  { id: 'earth', name: 'Earth', signs: ['taurus', 'virgo', 'capricorn'], punch: 'Shows up. | *Every* *time.*' },
  { id: 'air', name: 'Air', signs: ['gemini', 'libra', 'aquarius'], punch: 'Falls for a | *great* *conversation.*' },
  { id: 'water', name: 'Water', signs: ['cancer', 'scorpio', 'pisces'], punch: 'Feels *everything.* | Deeply.' },
].map((e, i) => ({ ...e, col: ELEMENT_COLOR[e.id], s: SEG_T[i] }))

/** a glowing orb: big soft halo, shaded sphere, a pixel-star glint */
function orb(x, px, py, r, color, a, halo = 3.4) {
  if (a <= 0 || r <= 0.5) return
  x.save()
  x.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = x.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, hr, 0, TAU); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.globalAlpha = a
  const s = x.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.4, color); s.addColorStop(1, rgba(color, 0.85))
  x.fillStyle = s; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill()
  drawPixelStar(x, Math.round(px + r * 0.62), Math.round(py - r * 0.62), r > 80 ? 35 : r > 24 ? 21 : 14, 0, rgba('#fff3e0', 0.95))
  x.restore()
}
function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * TAU + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e, py + Math.sin(q.a) * q.d * e, q.size, q.kind, q.kind === 3 ? '#fff3e0' : color)
  }
  x.restore()
}

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last word may pop late with a wobble */
function popText(parent, text, { top, size, font, weight, accentColor = GOLD, accentSize, gap = 0.07, at: t0, lastAt = null, wobble = false, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: font, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.02, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  let n = 0
  const toks = text.split(' ')
  const ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    ws.push({ t: isLast && lastAt != null ? lastAt : t0 + n * gap, big: isLast && lastAt != null, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    words: ws.map(w => w.t),
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

// ── type specs (shared by build() and the cue list, so pops line up with words)
const TXT = {
  hook: ['Your *Venus* sign | = how you love.', HOOK.head, { accentColor: PINK, size: 112, accentSize: 126 }],
  heads: ELEMS.map(e => [`*${e.name}* Venus`, e.s, { accentColor: e.col, size: 136, accentSize: 152, top: 205, gap: 0.09 }]),
  punches: ELEMS.map(e => [e.punch, e.s + 1.11, { accentColor: e.col }]),
  fact: ['Venus never | strays far | from the *Sun.*', F0 + 0.05, { accentColor: GOLD, top: 215 }],
  fact2: ["So it's in your Sun sign, | or up to *two* *signs* away.", STRIP.in + 0.3, { accentColor: PINK, size: 58, accentSize: 66 }],
  end: ['Go look up | your *Venus.*', E0, { accentColor: PINK, size: 150, accentSize: 172, top: 235, lastAt: END.venus, wobble: true, gap: 0.09 }],
}
const wordCount = s => s.split(' ').filter(w => w !== '|').length

async function build(stage) {
  try {
    await Promise.all(["800 150px Inter", "700 62px Inter", "italic 500 168px 'EB Garamond'", "bold 88px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const head = ([s, t0, o]) => popText(root, s, { top: 215, size: TYPE.headSize, font: INTER, weight: 800, at: t0, ...o })
  const sub = ([s, t0, o]) => popText(root, s, { top: TYPE.subY, size: TYPE.subSize, font: INTER, weight: 700, at: t0, gap: 0.06, accentSize: 68, ...o })
  const eyebrow = txt => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 40) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('FUN FACT'), F0, [STRIP.out, STRIP.out + 0.18]]]
  const HEADS = [
    [head(TXT.hook), [HOOK.out, HOOK.out + 0.18]],
    ...ELEMS.map((e, i) => [head(TXT.heads[i]), [e.s + SEG_LEN - 0.05, e.s + SEG_LEN + 0.13]]),
    [head(TXT.fact), [STRIP.out, STRIP.out + 0.18]],
    [head(TXT.end), [END.out + 0.2, END.black]],
  ]
  const SUBS = [
    ...ELEMS.map((e, i) => [sub(TXT.punches[i]), [e.s + SEG_LEN - 0.05, e.s + SEG_LEN + 0.13]]),
    [sub(TXT.fact2), [STRIP.out, STRIP.out + 0.18]],
  ]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const B = (k, n = 8, d = 90) => makeBurst(300 + k, n, d)

  // ───────────── hook: Venus pops in, pixel hearts orbit, ♀ beneath
  const B_ORB = B(0, 12, 230), B_GLY = B(1, 8, 110)
  const HEART_COLS = [PINK, ELEMENT_COLOR.fire, GOLD, ELEMENT_COLOR.air, ROSE]
  function venusWithHearts(t, cx, cy, r, k, t0, cols = HEART_COLS, out = 1) {
    // hearts on a tilted ring: back half drawn behind the orb
    const n = cols.length
    const hs = cols.map((c, i) => {
      const a = (t - t0) * 1.3 + (i / n) * TAU, z = Math.sin(a)
      const hk = pop01(t, t0 + 0.55 + i * 0.09, 0.35, 2.4) * out
      return { c, z, hk, px: cx + Math.cos(a) * r * 1.85, py: cy + Math.sin(a) * r * 0.42 - Math.cos(a) * r * 0.25 }
    })
    const drawH = h => pixelHeart(x, h.px, h.py, (h.z > 0 ? 9 : 6) * h.hk, h.c, clamp(h.hk * 2) * (h.z > 0 ? 1 : 0.55))
    hs.filter(h => h.z <= 0).forEach(drawH)
    orb(x, cx, cy, r * k, PINK, clamp(k * 2), 3.0)
    hs.filter(h => h.z > 0).forEach(drawH)
  }
  function drawHook(t) {
    if (t > HOOK.out + 0.5) return
    const k = pop01(t, HOOK.orb, 0.5, 2.6) * outScale(t, HOOK.out)
    if (t >= HOOK.orb && k > 0) {
      const by = 1040 + 18 * Math.sin((t - HOOK.orb) * 2.4)
      const sq = 1 + 0.08 * Math.sin((t - HOOK.orb) * 16) * Math.exp(-(t - HOOK.orb) * 4)
      x.save(); x.translate(540, by); x.scale(sq, 1 / sq); x.translate(-540, -by)
      venusWithHearts(t, 540, by, 165, k, HOOK.orb, HEART_COLS, outScale(t, HOOK.out))
      x.restore()
      drawBurst(x, B_ORB, 540, by, t, HOOK.orb + 0.05, PINK, 0.8)
      // ♀ + VENUS label
      const gk = pop01(t, HOOK.glyph, 0.4, 2.4) * outScale(t, HOOK.out + 0.05)
      if (gk > 0) {
        x.save(); x.translate(540, 1385); x.rotate(wob(t, HOOK.glyph, 10) * D2R); x.scale(gk, gk)
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = PINK; x.shadowBlur = 24; x.fillStyle = PINK
        x.font = `bold 120px ${GLYPH_FONT}`; x.fillText('♀' + VS, 0, 0)
        x.restore()
        drawBurst(x, B_GLY, 540, 1385, t, HOOK.glyph, GOLD, 0.6)
      }
    }
  }

  // ───────────── shared per element: the three sign chips under the headline
  const B_CHIP = ELEMS.map((_, i) => [0, 1, 2].map(j => B(10 + i * 3 + j, 6, 70)))
  function drawChips(t, e, ei) {
    const o = outScale(t, e.s + SEG_LEN - 0.1)
    e.signs.forEach((id, j) => {
      const s = sign(id), t0 = e.s + 0.38 + j * 0.12
      const k = pop01(t, t0, 0.36, 2.4) * outScale(t, e.s + SEG_LEN - 0.1 + j * 0.04)
      if (k <= 0 || t < t0) return
      const cx = 540 + (j - 1) * 300, cy = 470 + 6 * Math.sin(t * 3 + j)
      x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha = clamp(k * 2)
      x.textAlign = 'center'; x.textBaseline = 'middle'
      x.shadowColor = s.color; x.shadowBlur = 22; x.fillStyle = s.color; x.font = `bold 92px ${GLYPH_FONT}`; x.fillText(s.glyph + VS, 0, -6)
      x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 10; x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.fillText(s.name.toUpperCase(), 0, 66)
      x.restore()
      drawBurst(x, B_CHIP[ei][j], cx, cy, t, t0, s.color, 0.55)
    })
    return o
  }

  // ───────────── FIRE: fireworks
  const FS = ELEMS[0].s, fb = k => FS + k * 0.5556 - 0.42
  const ROCKETS = [
    { x: 290, y: 800, t: fb(1), r: 165, col: ELEMENT_COLOR.fire, seed: 1, drift: 40 },
    { x: 800, y: 760, t: fb(2), r: 150, col: PINK, seed: 2, drift: -30 },
    { x: 540, y: 1010, t: fb(3), r: 300, col: ELEMENT_COLOR.fire, seed: 3, heart: true },
    { x: 250, y: 1180, t: fb(5), r: 120, col: GOLD, seed: 4, drift: 30 },
    { x: 840, y: 1150, t: fb(5.5), r: 130, col: sign('leo').color, seed: 5, drift: -40 },
  ]
  function drawFire(t) {
    const e = ELEMS[0]
    if (t < e.s - 0.05 || t > e.s + SEG_LEN + 0.6) return
    drawChips(t, e, 0)
    fireworks(x, t, ROCKETS, 1 - ease.inQuad(prog(t, e.s + SEG_LEN - 0.15, e.s + SEG_LEN + 0.25)))
  }

  // ───────────── EARTH: gift box + bread + a week of ticks
  const B_BOX = B(30, 10, 160), B_LID = B(31, 12, 170), B_BREAD = B(32, 8, 120)
  function drawEarth(t) {
    const e = ELEMS[1], s = e.s
    if (t < s - 0.05 || t > s + SEG_LEN + 0.6) return
    drawChips(t, e, 1)
    const o = outScale(t, s + SEG_LEN - 0.1)
    // box drops in and squashes
    const d0 = s + 0.25, d1 = s + 0.6
    if (t >= d0 && o > 0) {
      const by = lerp(560, 1090, ease.inQuad(prog(t, d0, d1)))
      const sq = t > d1 ? 0.9 * Math.sin((t - d1) * 18) * Math.exp(-(t - d1) * 6) : 0
      const L = s + 1.67, lid = easeOutBack(prog(t, L, L + 0.45), 2.2)
      giftBox(x, 360, by, 0.95 * o, t, { a: clamp(prog(t, d0, d0 + 0.1)) * clamp(o * 2), lid, sq })
      drawBurst(x, B_BOX, 360, 1180, t, d1, ELEMENT_COLOR.earth, 0.6)
      // a heart floats out of the open box
      if (t > L + 0.1) {
        const hp = ease.outCubic(prog(t, L + 0.1, L + 0.8)), hy = lerp(1060, 950, hp) + 8 * Math.sin(t * 4)
        const hk = pop01(t, L + 0.1, 0.4, 2.6) * o
        x.save(); x.translate(360, hy); x.rotate(0.12 * Math.sin(t * 3)); x.scale(hk * (1 + 0.06 * Math.sin(t * 9)), hk * (1 + 0.06 * Math.sin(t * 9)))
        heartPath(x, 150, 0, 0); ink(x, ROSE, { w: 8, fa: 0.5, glow: 24 }); x.restore()
        drawBurst(x, B_LID, 360, 860, t, L + 0.3, ROSE, 0.7)
      }
    }
    // the loaf pops in, steaming
    const bk = pop01(t, s + 0.72, 0.4, 2.4) * o
    if (bk > 0 && t >= s + 0.72) {
      bread(x, 775, 1140, 0.95 * bk, t, { a: clamp(bk * 2) })
      drawBurst(x, B_BREAD, 775, 1140, t, s + 0.72, '#f29a4a', 0.55)
    }
    // a week of ticks: M T W T F, one per half beat
    const DAYS = ['M', 'T', 'W', 'T', 'F']
    DAYS.forEach((d, i) => {
      const t0 = s + 2.0 + i * 0.278
      const k = pop01(t, s + 1.75 + i * 0.05, 0.3, 2) * outScale(t, s + SEG_LEN - 0.12 + i * 0.03)
      if (k <= 0 || t < s + 1.75) return
      const cx = 540 + (i - 2) * 112, cy = 1360
      x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha = clamp(k * 2)
      x.beginPath(); x.roundRect(-44, -44, 88, 88, 18); ink(x, ELEMENT_COLOR.earth, { w: 6, fa: 0.18, glow: 10 })
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 34px ${INTER}`; x.fillStyle = BONE; x.globalAlpha *= t < t0 ? 1 : 0.35; x.fillText(d, 0, 2)
      x.globalAlpha = clamp(k * 2)
      const ck = easeOutBack(prog(t, t0, t0 + 0.25), 2.6)
      if (ck > 0) { x.scale(ck, ck); x.beginPath(); x.moveTo(-24, 2); x.lineTo(-6, 20); x.lineTo(26, -20); ink(x, '#5fdc7a', { w: 9, fa: 0, glow: 14 }) }
      x.restore()
    })
  }

  // ───────────── AIR: two chat bubbles flying, hearts zipping between them
  const AIR_PINK = sign('libra').color
  const B_BA = B(40, 8, 150), B_BB = B(41, 8, 150), B_BANG = B(42, 10, 180)
  function drawAir(t) {
    const e = ELEMS[2], s = e.s
    if (t < s - 0.05 || t > s + SEG_LEN + 0.6) return
    drawChips(t, e, 2)
    const ta = s + 0.25, tb = s + 0.62
    const oA = ease.inCubic(prog(t, s + SEG_LEN - 0.12, s + SEG_LEN + 0.3)), oB = ease.inCubic(prog(t, s + SEG_LEN - 0.05, s + SEG_LEN + 0.35))
    const pa = easeOutBack(prog(t, ta, ta + 0.5), 1.6), pb = easeOutBack(prog(t, tb, tb + 0.5), 1.6)
    const A = { x: lerp(-320, 350, pa) - 900 * oA + 22 * Math.sin(t * 2.1), y: 820 + 26 * Math.sin(t * 2.7) - 200 * oA }
    const Bp = { x: lerp(1400, 730, pb) + 900 * oB + 22 * Math.sin(t * 2.3 + 1), y: 1130 + 26 * Math.sin(t * 2.5 + 2) - 200 * oB }
    // speed lines while flying in
    const speed = (p0, px, py, dir, col) => {
      const k = Math.sin(Math.PI * clamp(p0)); if (k <= 0.02) return
      x.save(); x.globalAlpha = k * 0.85
      for (let i = 0; i < 3; i++) { const yy = py - 60 + i * 60; x.beginPath(); x.moveTo(px - dir * 220, yy); x.lineTo(px - dir * (380 + i * 40), yy); ink(x, col, { w: 7, fa: 0, glow: 12 }) }
      x.restore()
    }
    speed(prog(t, ta, ta + 0.55), A.x, A.y, 1, ELEMENT_COLOR.air)
    speed(prog(t, tb, tb + 0.55), Bp.x, Bp.y, -1, AIR_PINK)
    // hearts zip from B to A and back along an arc (one per beat)
    for (let i = 0; i < 4; i++) {
      const h0 = s + 1.4 + i * 0.5556, p = prog(t, h0, h0 + 0.5)
      if (p <= 0 || p >= 1 || oA > 0) continue
      const fwd = i % 2 === 0, P = fwd ? [Bp, A] : [A, Bp], e2 = ease.inOutQuad(p)
      const hx = lerp(P[0].x, P[1].x, e2), hy = lerp(P[0].y, P[1].y, e2) - 220 * Math.sin(Math.PI * p)
      pixelHeart(x, hx, hy, 9, fwd ? ROSE : ELEMENT_COLOR.air, Math.sin(Math.PI * p) * 1.5)
    }
    const beat = Math.max(0, Math.sin(((t - 0.6) / 0.5556) * Math.PI)) ** 6
    const bang = s + 2.22
    const bangK = t >= bang ? easeOutBack(prog(t, bang, bang + 0.3), 2.6) : 0
    if (t >= ta) bubble(x, A.x, A.y, 0.92 * (t >= bang ? lerp(1, 1.08, Math.sin(Math.PI * prog(t, bang, bang + 0.3))) : 1), t, { col: ELEMENT_COLOR.air, tail: 'left', content: t >= bang ? 'bang' : 'dots', rot: -0.07 + 0.04 * Math.sin(t * 3) })
    if (t >= tb) bubble(x, Bp.x, Bp.y, 0.92, t, { col: AIR_PINK, tail: 'right', content: 'heart', rot: 0.06 + 0.04 * Math.sin(t * 2.6 + 1), beat })
    drawBurst(x, B_BA, 350, 820, t, ta + 0.45, ELEMENT_COLOR.air, 0.55)
    drawBurst(x, B_BB, 730, 1130, t, tb + 0.45, AIR_PINK, 0.55)
    if (bangK > 0) drawBurst(x, B_BANG, A.x, A.y, t, bang, GOLD, 0.7)
  }

  // ───────────── WATER: a heart-shaped sea
  function drawWater(t) {
    const e = ELEMS[3], s = e.s
    if (t < s - 0.05 || t > s + SEG_LEN + 0.6) return
    drawChips(t, e, 3)
    const k = pop01(t, s + 0.25, 0.5, 2.0) * outScale(t, s + SEG_LEN - 0.1)
    if (k <= 0 || t < s + 0.25) return
    const fillK = 0.12 + 0.76 * ease.outCubic(prog(t, s + 0.45, s + 1.5))
    const sl = [s + 1.67, s + 2.78].reduce((m, tt) => Math.max(m, Math.sin(Math.PI * prog(t, tt, tt + 0.6))), 0)
    waveHeart(x, 540, 1010, 0.95 * k, t, { a: clamp(k * 2), fill: fillK, slosh: sl * 1.5 })
    splash(x, 540 - 150, 830, prog(t, s + 1.67, s + 2.37), 1.1)
    splash(x, 540 + 150, 830, prog(t, s + 2.78, s + 3.48), 1.1)
  }

  // ───────────── FUN FACT: top-down Sun, Venus on a leash, the 47° fan seen from Earth
  const B_SUN = B(50, 10, 130), B_EARTH = B(51), B_VEN = B(52, 8, 100), B_MAX = MAX_T.map((_, i) => B(53 + i, 10, 120))
  function drawFact(t) {
    if (t < F0 - 0.05 || t > FACT.out + 0.6) return
    const { cx, cy, rE, rV } = ORB
    const out = i => outScale(t, FACT.out + i * 0.04)
    // Earth's orbit (lower arc only, the headline sits above) and Venus's orbit
    const ok = ease.inOutCubic(prog(t, ...FACT.orbits))
    if (ok > 0) {
      x.save(); x.setLineDash([16, 18])
      x.globalAlpha = 0.5 * clamp(ok * 1.5) * clamp(out(0)); x.strokeStyle = '#4f9cf0'; x.lineWidth = 5; x.shadowColor = '#4f9cf0'; x.shadowBlur = 10
      x.beginPath(); x.arc(cx, cy, rE, Math.PI / 2 - 1.15 * ok, Math.PI / 2 + 1.15 * ok); x.stroke()
      x.strokeStyle = PINK; x.shadowColor = PINK; x.globalAlpha = 0.55 * clamp(ok * 1.5) * clamp(out(0))
      x.beginPath(); x.arc(cx, cy, rV, -Math.PI / 2, -Math.PI / 2 + TAU * ok); x.stroke()
      x.restore()
    }
    // the fan: everywhere Venus can appear, seen from Earth (±47° around the Sun)
    const fk = ease.outCubic(prog(t, ...FACT.fan)) * clamp(out(1))
    const flash = MAX_T.map(tm => Math.exp(-Math.max(0, t - tm) * 4) * (t >= tm ? 1 : 0))
    if (fk > 0) {
      const R = 560 * fk, a0 = -Math.PI / 2 - MAXE * D2R, a1 = -Math.PI / 2 + MAXE * D2R
      x.save()
      const g = x.createRadialGradient(ePos.x, ePos.y, 40, ePos.x, ePos.y, R)
      g.addColorStop(0, rgba(PINK, 0.26 * fk)); g.addColorStop(1, rgba(PINK, 0.04 * fk))
      x.fillStyle = g; x.beginPath(); x.moveTo(ePos.x, ePos.y); x.arc(ePos.x, ePos.y, R, a0, a1); x.closePath(); x.fill()
      // the two fan edges glow (and flash when Venus reaches them)
      ;[[a1, flash[0]], [a0, flash[1]]].forEach(([a, f]) => {
        x.globalAlpha = fk * (0.65 + 0.35 * f)
        x.beginPath(); x.moveTo(ePos.x, ePos.y); x.lineTo(ePos.x + Math.cos(a) * R, ePos.y + Math.sin(a) * R)
        ink(x, f > 0.05 ? '#ffd1e0' : PINK, { w: 6 + 4 * f, fa: 0, glow: 14 + 20 * f })
      })
      // angle arc + 47° label (pops at the first max)
      x.globalAlpha = fk
      x.beginPath(); x.arc(ePos.x, ePos.y, 120, -Math.PI / 2, a1); ink(x, GOLD, { w: 6, fa: 0, glow: 12 })
      x.restore()
      const lk = pop01(t, MAX_T[0], 0.4, 2.8) * clamp(out(1))
      if (lk > 0 && t >= MAX_T[0]) {
        x.save(); x.translate(ePos.x + 235, ePos.y - 95); x.rotate(wob(t, MAX_T[0], 10) * D2R); x.scale(lk, lk)
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 74px ${INTER}`
        x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 14; x.fillStyle = GOLD; x.fillText(`${MAXE}°`, 0, 0)
        x.font = `700 26px ${MONO}`; x.fillStyle = BONE; x.fillText('MAX', 0, 52)
        x.restore()
      }
    }
    // Sun
    const sk = t >= FACT.sun ? pop01(t, FACT.sun, 0.45) * out(2) : 0
    orb(x, cx, cy, 66 * sk * (1 + 0.03 * Math.sin(t * 4)), GOLD, clamp(sk * 2), 3.2)
    drawBurst(x, B_SUN, cx, cy, t, FACT.sun, GOLD, 0.7)
    // Venus on its leash
    const phi = phiAt(t), V = vPos(phi)
    const vk = t >= FACT.venus ? pop01(t, FACT.venus, 0.4, 2.4) * out(3) : 0
    if (vk > 0) {
      // sight line Earth → Venus
      x.save(); x.globalAlpha = 0.85 * clamp(vk) * clamp(prog(t, FACT.fan[0], FACT.fan[1])); x.setLineDash([14, 12]); x.lineDashOffset = -t * 50
      x.beginPath(); x.moveTo(ePos.x, ePos.y); x.lineTo(V.x, V.y); ink(x, '#ffd1e0', { w: 4, fa: 0, glow: 10 }); x.restore()
      // the leash: a wiggly rope Sun → Venus
      x.save(); x.globalAlpha = clamp(vk)
      const dx = V.x - cx, dy = V.y - cy, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L
      x.beginPath()
      for (let i = 0; i <= 24; i++) { const u = i / 24, w = 12 * Math.sin(u * Math.PI * 3 + t * 6) * Math.sin(u * Math.PI); const px = cx + dx * u + nx * w, py = cy + dy * u + ny * w; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      ink(x, GOLD, { w: 5, fa: 0, glow: 12 }); x.restore()
      orb(x, V.x, V.y, 34 * vk, PINK, clamp(vk * 2), 3.4)
      drawBurst(x, B_VEN, V.x, V.y, t, FACT.venus, PINK, 0.6)
      MAX_T.forEach((tm, i) => drawBurst(x, B_MAX[i], vPos(phiAt(tm)).x, vPos(phiAt(tm)).y, t, tm, i ? PINK : GOLD, 0.7))
    }
    // Earth
    const ek = t >= FACT.earth ? pop01(t, FACT.earth, 0.4) * out(4) : 0
    if (ek > 0) {
      orb(x, ePos.x, ePos.y, 30 * ek, '#4f9cf0', clamp(ek * 2), 3.2)
      x.save(); x.globalAlpha = clamp(ek); x.beginPath(); x.arc(ePos.x, ePos.y, 30 * ek, 0, TAU); x.clip()
      x.fillStyle = 'rgba(70,200,140,0.75)'; x.beginPath(); x.ellipse(ePos.x - 7 * ek, ePos.y + 5 * ek, 13 * ek, 9 * ek, 0.6, 0, TAU); x.fill(); x.restore()
      drawBurst(x, B_EARTH, ePos.x, ePos.y, t, FACT.earth, '#4f9cf0', 0.6)
      x.save(); x.globalAlpha = clamp(ek * 2); x.font = `800 42px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'
      x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12; x.fillText('Earth', ePos.x, ePos.y + 92); x.restore()
    }
  }

  // ───────────── the sign strip: Sun's sign ± 2
  const ROW = ['taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio'].map(sign)   // index 3 = the Sun's sign
  const PX = i => 540 + (i - 3) * 184, PY = 1030, VY = 790
  const B_PAN = ROW.map((_, i) => B(60 + i, 6, 90)), B_SNAP = B(70, 10, 140), B_SS = B(71, 10, 120)
  // Venus's path: index along the row over time (with arcs between)
  const HOPS = [[STRIP.venus, 4, 4], [STRIP.hop1 - 0.36, 4, 5], [STRIP.leap - 0.6, 5, 1]]
  function venusIdx(t) {
    let i = 4, h = 0
    for (const [t0, a, b] of HOPS) {
      const d = b - a === -4 ? 0.6 : 0.36
      if (t >= t0) { const p = prog(t, t0, t0 + d); i = lerp(a, b, ease.inOutQuad(p)); h = Math.sin(Math.PI * p) * (Math.abs(b - a) > 1 ? 330 : 150) }
    }
    // the tug toward Scorpio and the snap back
    const tg = prog(t, STRIP.tug, STRIP.back), tug = tg > 0 && tg < 1 ? Math.sin(Math.PI * tg) * 0.62 : 0
    return { i: i + tug, h: h + tug * 110 }
  }
  function drawStrip(t) {
    if (t < STRIP.in - 0.05 || t > STRIP.out + 0.6) return
    const vi = t >= STRIP.venus ? venusIdx(t) : { i: 4, h: 0 }
    const landed = [[STRIP.venus, 4], [STRIP.hop1, 5], [STRIP.leap, 1]]
    let cur = -1; for (const [tl, idx] of landed) if (t >= tl) cur = idx
    ROW.forEach((s, i) => {
      const ok = i >= 1 && i <= 5, t0 = STRIP.in + 0.05 + Math.abs(i - 3) * 0.08
      const k = pop01(t, t0, 0.36, 2.2) * outScale(t, STRIP.out - 0.1 + i * 0.02)
      if (k <= 0 || t < t0) return
      const L = i === 3 ? 0.55 : i === cur ? ease.outCubic(prog(t, landed.find(l => l[1] === i)?.[0] ?? 0, (landed.find(l => l[1] === i)?.[0] ?? 0) + 0.2)) : 0
      const bump = i === cur ? 0.08 * Math.exp(-(t - (landed.find(l => l[1] === i)?.[0] ?? 0)) * 5) : 0
      const snapF = i === 6 ? Math.sin(Math.PI * prog(t, STRIP.tug + 0.12, STRIP.back + 0.2)) : 0
      x.save(); x.translate(PX(i), PY); x.scale(k * (1 + bump), k * (1 - bump)); x.globalAlpha = clamp(k * 2) * (ok ? 1 : 0.32 + 0.4 * snapF)
      x.beginPath(); x.roundRect(-80, -110, 160, 220, 26)
      x.fillStyle = rgba(s.color, (ok ? 0.2 : 0.08) + 0.38 * L); x.fill()
      ink(x, L > 0.05 ? s.color : (ok ? BONE : '#8a84a8'), { w: 6, fa: 0, glow: 10 + 20 * L })
      x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = s.color; x.shadowColor = s.color; x.shadowBlur = 16 * L; x.font = `bold 96px ${GLYPH_FONT}`; x.fillText(s.glyph + VS, 0, -18)
      x.shadowBlur = 0; x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.fillText(s.name.toUpperCase(), 0, 72)
      if (!ok && snapF > 0.02) { x.globalAlpha = snapF; x.beginPath(); x.moveTo(-34, -52); x.lineTo(34, 16); x.moveTo(34, -52); x.lineTo(-34, 16); ink(x, '#ff5a6e', { w: 10, fa: 0, glow: 16 }) }
      x.restore()
      if (i === cur) drawBurst(x, B_PAN[i], PX(i), PY, t, landed.find(l => l[1] === i)[0], s.color, 0.55)
    })
    // distance badges under the panels
    ;[[1, '2'], [2, '1'], [4, '1'], [5, '2']].forEach(([i, txt], j) => {
      const k = pop01(t, STRIP.in + 0.35 + j * 0.05, 0.3, 2.4) * outScale(t, STRIP.out - 0.1)
      if (k <= 0 || t < STRIP.in + 0.35) return
      x.save(); x.translate(PX(i), PY + 158); x.scale(k, k)
      x.beginPath(); x.arc(0, 0, 26, 0, TAU); ink(x, PINK, { w: 5, fa: 0.25, glow: 10 })
      x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
      x.restore()
    })
    // the Sun above its sign, "YOUR SUN SIGN"
    const sk = pop01(t, STRIP.sun, 0.42, 2.4) * outScale(t, STRIP.out)
    if (sk > 0 && t >= STRIP.sun) {
      orb(x, PX(3), VY, 58 * sk * (1 + 0.03 * Math.sin(t * 4)), GOLD, clamp(sk * 2), 3.0)
      drawBurst(x, B_SS, PX(3), VY, t, STRIP.sun, GOLD, 0.6)
      x.save(); x.globalAlpha = clamp(sk * 2); x.font = `700 26px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'
      x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12; x.fillText('YOUR SUN SIGN', PX(3), PY + 158 + 10); x.restore()
    }
    // Venus hopping on its leash
    const vk = pop01(t, STRIP.venus, 0.4, 2.4) * outScale(t, STRIP.out + 0.04)
    if (vk > 0 && t >= STRIP.venus) {
      const vy = VY - vi.h
      const VX = PX(0) + vi.i * 184
      // leash
      x.save(); x.globalAlpha = clamp(vk)
      const dx = VX - PX(3), dy = vy - VY, L = Math.max(1, Math.hypot(dx, dy)), nx = -dy / L, ny = dx / L
      const taut = Math.sin(Math.PI * prog(t, STRIP.tug, STRIP.back))
      x.beginPath()
      for (let i = 0; i <= 24; i++) { const u = i / 24, w = (1 - taut) * (14 * Math.sin(u * Math.PI * 3 + t * 6) * Math.sin(u * Math.PI) + 30 * Math.sin(u * Math.PI)); const px = PX(3) + dx * u + nx * w, py = VY + dy * u + ny * w; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      ink(x, taut > 0.5 ? '#fff3e0' : GOLD, { w: 5 + 2 * taut, fa: 0, glow: 12 + 10 * taut }); x.restore()
      orb(x, VX, vy, 40 * vk, PINK, clamp(vk * 2), 3.2)
      drawBurst(x, B_SNAP, PX(5), VY, t, STRIP.back, PINK, 0.6)
    }
  }

  // ───────────── end: Venus bounces back with the four element hearts + heart confetti
  const CONF = (() => { const r = rng(808); return Array.from({ length: 26 }, (_, i) => ({ a: -Math.PI / 2 + (r() - 0.5) * 2.6, v: 900 + r() * 900, sz: 6 + Math.floor(r() * 3) * 2, col: [PINK, GOLD, ROSE, ELEMENT_COLOR.fire, ELEMENT_COLOR.air, ELEMENT_COLOR.water, ELEMENT_COLOR.earth][i % 7], star: i % 3 === 0, kind: i % 3, spin: r() })) })()
  function drawEnd(t) {
    if (t < E0) return
    const k = pop01(t, END.venus - 0.2, 0.55, 2.8)
    if (k > 0 && t >= END.venus - 0.2) {
      const by = 1080 + 20 * Math.sin((t - END.venus) * 2.4)
      const sq = 1 + 0.1 * Math.sin((t - END.venus) * 16) * Math.exp(-(t - END.venus) * 4)
      x.save(); x.translate(540, by); x.scale(sq, 1 / sq); x.translate(-540, -by)
      venusWithHearts(t, 540, by, 150, k, END.venus - 0.45, [ELEMENT_COLOR.fire, ELEMENT_COLOR.earth, ELEMENT_COLOR.air, ELEMENT_COLOR.water])
      x.restore()
    }
    // confetti: hearts + pixel stars fountain up from the orb, gravity pulls them down
    const tc = t - END.confetti
    if (tc > 0 && tc < 2.6) {
      for (const c of CONF) {
        const px = 540 + Math.cos(c.a) * c.v * tc * 0.75, py = 1080 + Math.sin(c.a) * c.v * tc + 900 * tc * tc
        const a = clamp(1 - (tc - 1.4) / 1.0) * clamp(tc * 8)
        if (py > 1980) continue
        if (c.star) { x.save(); x.globalAlpha = a; drawPixelStar(x, Math.round(px), Math.round(py), 18, c.kind, c.col); x.restore() }
        else pixelHeart(x, px, py, c.sz, c.col, a)
      }
    }
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3.4))
      drawSky(x, t, t < 3.4 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      drawHook(t); drawFire(t); drawEarth(t); drawAir(t); drawWater(t); drawFact(t); drawStrip(t); drawEnd(t)
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      for (const [p, o] of SUBS) p.update(t, outK(t, o))
      drawGrain(gx, t)
      black.style.opacity = String(t >= END.black ? 1 : t >= END.out ? ease.inOutQuad(prog(t, END.out, END.black)) : 1 - ease.inOutQuad(prog(t, 0, 0.4)))
    },
  }
}

export const SCENES = [build]

// ───────────── cues
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = ([s, t0, o = {}], base = 0, gain = 0.03) => {
  const n = wordCount(s), gap = o.gap ?? (o.top === undefined && !o.size ? 0.07 : 0.07)
  return Array.from({ length: n }, (_, i) => ['pop', r3(o.lastAt != null && i === n - 1 ? o.lastAt : t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
}
const subPops = ([s, t0], base = 0) => Array.from({ length: wordCount(s) }, (_, i) => ['pop', r3(t0 + i * 0.06), NOTE[(base + i) % NOTE.length], 0.022, (i % 2 ? 0.2 : -0.2)])
const ELEM_NOTES = [[880, 1174.66, 1318.51], [659.25, 880, 987.77], [987.77, 1174.66, 1479.98], [587.33, 739.99, 880]]
export const CUES = [
  // hook
  ...wordPops(TXT.hook, 0),
  ['pop', r3(HOOK.orb), 587.33, 0.065, 0], ['pluck', r3(HOOK.orb), 1174.66, 0.05, 0.7, 0], ['glitter', r3(HOOK.orb), r3(HOOK.orb + 0.6)],
  ...[0, 1, 2, 3, 4].map(i => ['pop', r3(HOOK.orb + 0.55 + i * 0.09), [987.77, 1174.66, 1318.51, 1479.98, 1760][i], 0.03, (i - 2) * 0.2]),
  ['pop', r3(HOOK.glyph), 880, 0.05, 0], ['pluck', r3(HOOK.glyph), 659.25, 0.04, 0.5, 0],
  ['whoosh', r3(HOOK.out - 0.05), 0.4, 0.03],
  // elements: headline pops, sign chips, punchline pops
  ...ELEMS.flatMap((e, i) => [
    ...wordPops(TXT.heads[i], i * 2, 0.04),
    ...[0, 1, 2].map(j => ['pop', r3(e.s + 0.38 + j * 0.12), ELEM_NOTES[i][j], 0.04, (j - 1) * 0.35]),
    ...subPops(TXT.punches[i], i + 1),
    ['whoosh', r3(e.s + SEG_LEN - 0.08), 0.4, 0.03],
  ]),
  // fire: rocket whistles + bursts (one soft boom for the heart)
  ...ROCKETS_T().flatMap(([tl, heart, pan]) => [['whoosh', r3(tl), 0.42, 0.025], ['pop', r3(tl + 0.42), heart ? 587.33 : 1318.51, heart ? 0.06 : 0.045, pan], ['glitter', r3(tl + 0.45), r3(tl + (heart ? 1.4 : 0.9))]]),
  ['boom', r3(SEG_T[0] + 3 * 0.5556), 0.12], ['pluck', r3(SEG_T[0] + 3 * 0.5556), 880, 0.05, 0.8, 0],
  // earth: box lands, bread pops, lid pops + heart, week ticks
  ['tick', r3(SEG_T[1] + 0.6), 0.06], ['pop', r3(SEG_T[1] + 0.6), 659.25, 0.05, -0.3],
  ['pop', r3(SEG_T[1] + 0.72), 987.77, 0.045, 0.3],
  ['pop', r3(SEG_T[1] + 1.67), 1174.66, 0.06, -0.2], ['pluck', r3(SEG_T[1] + 1.8), 880, 0.05, 0.7, -0.2], ['glitter', r3(SEG_T[1] + 1.8), r3(SEG_T[1] + 2.4)],
  ...[0, 1, 2, 3, 4].map(i => ['pop', r3(SEG_T[1] + 2.0 + i * 0.278), [740, 880, 987.77, 1174.66, 1318.51][i], 0.04, (i - 2) * 0.2]),
  // air: bubbles whoosh in, hearts zip, the "!!"
  ['whoosh', r3(SEG_T[2] + 0.2), 0.45, 0.035], ['pop', r3(SEG_T[2] + 0.7), 1174.66, 0.05, -0.4],
  ['whoosh', r3(SEG_T[2] + 0.58), 0.45, 0.035], ['pop', r3(SEG_T[2] + 1.07), 1479.98, 0.05, 0.4],
  ...[0, 1, 2, 3].map(i => ['pop', r3(SEG_T[2] + 1.4 + i * 0.5556 + 0.45), i % 2 ? 1318.51 : 1760, 0.035, i % 2 ? 0.4 : -0.4]),
  ['pop', r3(SEG_T[2] + 2.22), 880, 0.06, -0.3], ['pluck', r3(SEG_T[2] + 2.22), 1174.66, 0.045, 0.5, -0.3],
  // water: the heart pops, fills (riser), splashes
  ['pop', r3(SEG_T[3] + 0.25), 587.33, 0.06, 0], ['riser', r3(SEG_T[3] + 0.45), r3(SEG_T[3] + 1.5), 0.04],
  ['whoosh', r3(SEG_T[3] + 1.62), 0.5, 0.035], ['pluck', r3(SEG_T[3] + 1.67), 739.99, 0.045, 0.8, -0.3],
  ['whoosh', r3(SEG_T[3] + 2.73), 0.5, 0.035], ['pluck', r3(SEG_T[3] + 2.78), 880, 0.045, 0.8, 0.3],
  // fun fact
  ['bell', r3(F0), 1174.66, 0.04, 1.4, 0], ...wordPops(TXT.fact, 3),
  ['pop', r3(FACT.sun), 587.33, 0.06, 0], ['glitter', r3(FACT.sun), r3(FACT.sun + 0.5)],
  ['pop', r3(FACT.earth), 739.99, 0.05, 0.1], ['pop', r3(FACT.venus), 1174.66, 0.055, -0.1], ['whoosh', r3(FACT.fan[0]), 0.4, 0.03],
  ['whoosh', r3(FACT.swing[0]), r3(FACT.swing[1] - FACT.swing[0]), 0.025],
  ...MAX_T.flatMap((tm, i) => [['pluck', r3(tm), [1318.51, 1174.66][i], 0.055, 0.6, i ? -0.4 : 0.4], ['pop', r3(tm), 880, 0.05, i ? -0.4 : 0.4], ['glitter', r3(tm), r3(tm + 0.5)]]),
  // strip
  ['whoosh', r3(FACT.out - 0.05), 0.4, 0.03],
  ...[3, 2, 4, 1, 5, 0, 6].map((i, j) => ['pop', r3(STRIP.in + 0.05 + Math.abs(i - 3) * 0.08), NOTE[(j + 2) % 7], 0.025, (i - 3) * 0.12]),
  ['pop', r3(STRIP.sun), 587.33, 0.055, 0],
  ...subPops(TXT.fact2, 2),
  ['pop', r3(STRIP.venus), 1174.66, 0.05, 0.2],
  ['pop', r3(STRIP.hop1), 1318.51, 0.05, 0.35],
  ['whoosh', r3(STRIP.tug - 0.05), 0.3, 0.03], ['pluck', r3(STRIP.back), 440, 0.05, 0.4, 0.45], ['tick', r3(STRIP.back), 0.05],
  ['whoosh', r3(STRIP.leap - 0.6), 0.6, 0.035], ['pop', r3(STRIP.leap), 987.77, 0.055, -0.35],
  ['whoosh', r3(STRIP.out - 0.05), 0.4, 0.03],
  // end
  ...wordPops(TXT.end, 0, 0.04),
  ['pluck', r3(END.venus), 1174.66, 0.055, 0.8, 0], ['bell', r3(END.venus), 1318.51, 0.035, 1.6, 0],
  ['pop', r3(END.confetti), 880, 0.05, 0], ['glitter', r3(END.confetti), r3(END.confetti + 1.2)],
  ['bell', r3(END.confetti + 0.1), 1760, 0.025, 1.8, 0.3],
]
function ROCKETS_T() {
  const s = SEG_T[0], fb = k => s + k * 0.5556 - 0.42
  return [[fb(1), false, -0.4], [fb(2), false, 0.4], [fb(3), true, 0], [fb(5), false, -0.5], [fb(5.5), false, 0.5]]
}
