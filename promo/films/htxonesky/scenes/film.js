// htxonesky (30 s vertical Align ad) · scenes 0–25.6, then the shared END CARD ("come" + the logo).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–6.25   HOOK  "Every *culture.* | Every language. | One city." — a crowd of pictograms in many colours pops
//               in; each one says hello in a bubble (Hola, 你好, Hello, नमस्ते, Xin chào, أهلاً, Salut; the
//               non-Latin ones carry a small romanisation); on the drop (2.82) a generic skyline springs up behind
//               them and a back row of people joins; everyone bounces on the beat
//   6.45–11.30  "And one *sky* | over all of it." — the bubbles float up one by one and become stars; a dome of sky
//               draws over the whole crowd
//  11.50–15.00  "Everyone has | their own *chart.*" — each star drops back to its person and blooms into a little
//               birth chart with their sign in the middle
//  15.20–20.00  "Align matches you | by the stars you | were *born under.*" — two charts across the crowd (Cancer,
//               Pisces) glow and a gold arc launches from one and lands in the other; light pulses run along it
//  20.25–24.95  "Your person is | under the | *same sky.*" — the crowd sinks away, the pair rises into the sky and
//               shrinks into two gold-linked stars among the greeting stars, a last twinkle, then everything fades
//  25.35–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, SIGNS, easeOutBack } from '../../wheel.js'
import { BONE, GOLD, PINK, BLUE, ROSE, VIOLET, LAV, AMBER, INTER, MONO, rgba, ink, sparkle, orb, person } from './props.js'

export const END = 25.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2
const MINT = '#7fe0b0'
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const hop = (t, a, h = 1, d = 0.45) => t > a && t < a + d ? h * Math.sin(Math.PI * (t - a) / d) : 0

// ── beats
export const T = {
  eye: 0.08, h0: 0.12, culture: BEAT(0), lang: BEAT(2), one: BEAT(4) - 0.2, city: BEAT(4), drop: BEAT(4), h0Out: 6.2,
  h1: 6.45, sky: BEAT(11), over: BEAT(12), lift0: 7.4, liftGap: 0.14, liftDur: 1.45, dome: [9.75, 10.75], domeOut: 11.35, h1Out: 11.25,
  h2: 11.5, chart: BEAT(21), drop0: BEAT(20), dropGap: 0.14, h2Out: 15.0,
  h3: 15.2, born: BEAT(28), pick: 15.55, arc: [BEAT(29.5), BEAT(31)], h3Out: 20.0,
  h4: 20.25, same: BEAT(37), sink: [20.0, 21.7], rise: [20.3, 21.9], collapse: [23.2, 24.05], twinkle: 24.2, h4Out: 24.95, fadeAll: [24.6, 25.3],
}

// ── the crowd
const GROUND = 1720
const FS = 0.9                      // front-row person scale (≈ 245 px tall)
const HEAD = 300 * FS               // feet → top of head (with a little air)
const LAT = `800 54px ${INTER}`
const GREET = [
  { text: 'Hola', font: LAT, body: AMBER },
  { text: '你好', sub: 'NI HAO', font: "700 62px 'WenQuanYi Zen Hei', sans-serif", body: BLUE },
  { text: 'Hello', font: LAT, body: PINK },
  { text: 'नमस्ते', sub: 'NAMASTE', font: "bold 62px FreeSans, sans-serif", body: MINT },
  { text: 'Salut', font: LAT, body: GOLD },
  { text: 'Xin chào', font: LAT, body: LAV },
  { text: 'أهلاً', sub: 'AHLAN', font: "bold 58px 'DejaVu Sans', sans-serif", body: ROSE },
]
// each front-row person: x, their sign (index into SIGNS), bubble row (alternating heights so neighbours never collide)
const SIGN_OF = [0, 3, 4, 6, 9, 11, 2]          // Aries, Cancer, Leo, Libra, Capricorn, Pisces, Gemini
const FRONT = GREET.map((g, i) => ({ ...g, i, x: 140 + i * 133.3, sign: SIGN_OF[i], row: i % 2,
  tIn: 0.15 + [3, 1, 5, 0, 4, 2, 6][i] * 0.065, tB: 0.95 + i * 0.278 }))
const PAIR = [1, 5]                              // Cancer ↔ Pisces (a water trine)
const BACK = [AMBER, LAV, MINT, PINK, BLUE, GOLD].map((c, i) => ({ x: 207 + i * 133.3, body: c, tIn: BEAT(5) + [2, 0, 4, 1, 5, 3][i] * 0.14 }))
const BUB_Y = [1300, 1110]                       // bubble centre y per row
// where each bubble's star settles under the dome
const STAR = FRONT.map((p, i) => ({ x: [170, 330, 460, 620, 770, 910, 540][i], y: [1080, 800, 960, 720, 930, 1060, 1150][i] }))
// the chart that blooms above each head
const CHART_R = 72
const chartY = GROUND - 250 - CHART_R - 22
const cyOf = i => chartY - (i % 2 ? 168 : 0)          // odd charts float a row higher (neighbours never touch)

// ── generic skyline (no real towers)
const TOWERS = (() => {
  const r = rng(41), out = []
  let px = 40
  while (px < 1040) {
    const mid = 1 - Math.min(1, Math.abs(px - 560) / 520)
    const w = 50 + r() * 62, h = 130 + r() * 110 + mid * (120 + r() * 230)
    out.push({ x: px, w, h, top: ['flat', 'spire', 'slant', 'step', 'flat', 'dome'][Math.floor(r() * 6)], seed: r() * 100, d: Math.abs(px + w / 2 - 540) })
    px += w + 4 + r() * 14
  }
  const maxD = Math.max(...out.map(b => b.d))
  out.forEach(b => { b.tIn = T.drop + 0.05 + (b.d / maxD) * 0.55 })
  return out
})()
function towerPath(x, b, h) {
  const l = b.x, r = b.x + b.w, y = -h, m = b.x + b.w / 2
  x.beginPath(); x.moveTo(l, 0)
  switch (b.top) {
    case 'spire': x.lineTo(l, y + 18); x.lineTo(m - 6, y + 8); x.lineTo(m, y - 40); x.lineTo(m + 6, y + 8); x.lineTo(r, y + 18); break
    case 'slant': x.lineTo(l, y + 30); x.lineTo(r, y); break
    case 'step': x.lineTo(l, y + 28); x.lineTo(l + b.w * 0.25, y + 28); x.lineTo(l + b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y + 28); x.lineTo(r, y + 28); break
    case 'dome': x.lineTo(l, y + b.w / 2); x.arc(m, y + b.w / 2, b.w / 2, Math.PI, 0); break
    default: x.lineTo(l, y); x.lineTo(r, y)
  }
  x.lineTo(r, 0); x.closePath()
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break, `_` = a space inside a word.
 *  `times` gives each word's time (else at + n·gap); `big` lists word indices that pop large (with optional wobble). */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.08, at = 0, times = null, big = [], wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  let n = 0
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%', whiteSpace: 'pre' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    ws.push({ t: times ? times[n] : at + n * gap, big: big.includes(n), e: el('span', style, box, w.replace(/\*/g, '').replace(/_/g, ' ')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── per-bubble timeline: pop → bob → lift to its star → (star) → drop to the head → chart
const liftT = i => T.lift0 + i * T.liftGap
const dropT = i => T.drop0 + i * T.dropGap
const bloomT = i => dropT(i) + 0.42

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "800 46px Inter", "italic 500 170px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'", "700 20px 'Space Mono'",
      "700 54px 'WenQuanYi Zen Hei'", "bold 54px FreeSans", "bold 52px 'DejaVu Sans'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'HOUSTON, TX')
  const H0 = popText(root, 'Every *culture.* | Every language. | One city.', { top: 205, size: 100, accentSize: 156, accentColor: GOLD, lineHeight: 1.04,
    times: [T.h0, T.culture, T.lang, T.lang + 0.12, T.one, T.city], big: [1, 5], wobble: true })
  const H1 = popText(root, 'And one *sky* | over all of it.', { top: 205, size: 112, accentSize: 200, accentColor: BLUE, lineHeight: 0.98,
    times: [T.h1, T.h1 + 0.1, T.sky, T.over, T.over + 0.08, T.over + 0.16, T.over + 0.24], big: [2], wobble: true })
  const H2 = popText(root, 'Everyone has | their own *chart.*', { top: 205, size: 108, accentSize: 176, accentColor: LAV, lineHeight: 1.0,
    times: [T.h2, T.h2 + 0.1, T.h2 + 0.25, T.h2 + 0.33, T.chart], big: [4], wobble: true })
  const H3 = popText(root, 'Align matches you | by the stars you | were *born_under.*', { top: 200, size: 86, accentSize: 134, accentColor: GOLD, lineHeight: 1.06,
    times: [T.h3, T.h3 + 0.08, T.h3 + 0.16, T.h3 + 0.4, T.h3 + 0.48, T.h3 + 0.56, T.h3 + 0.64, T.born - 0.12, T.born], big: [8], wobble: true })
  const H4 = popText(root, 'Your person is | under the | *same_sky.*', { top: 200, size: 104, accentSize: 176, accentColor: PINK, lineHeight: 1.0,
    times: [T.h4, T.h4 + 0.08, T.h4 + 0.16, T.h4 + 0.4, T.h4 + 0.48, T.same], big: [5], wobble: true })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the crowd's vertical offset / alpha (it sinks away at the end)
  const sinkY = t => 620 * ease.inOutCubic(prog(t, ...T.sink))
  const crowdA = t => 1 - ease.inQuad(prog(t, T.sink[0] + 0.3, T.sink[1]))
  // beat bounce: from the drop, people hop on alternating beats
  const bounce = (t, i) => {
    if (t < T.drop || t > T.sink[0]) return 0
    const n = Math.floor((t - 0.6) / 0.5556)
    if ((n + i) % 2) return 0
    const b0 = 0.6 + n * 0.5556
    const amp = t < T.h1 ? 22 : t < T.h2 ? 10 : 7
    return hop(t, b0, amp, 0.36)
  }

  // ── ground + skyline
  function drawCity(t, oy, a) {
    if (a <= 0) return
    x.save(); x.translate(0, oy); x.globalAlpha = a
    // skyline
    for (const b of TOWERS) {
      const k = easeOutBack(prog(t, b.tIn, b.tIn + 0.4), 2.0)
      if (k <= 0) continue
      x.save(); x.translate(0, GROUND)
      towerPath(x, b, b.h * k)
      x.fillStyle = 'rgba(22,15,52,0.94)'; x.fill()
      x.lineJoin = 'round'; x.shadowColor = VIOLET; x.shadowBlur = 12; x.strokeStyle = rgba(VIOLET, 0.8); x.lineWidth = 4; x.stroke(); x.shadowBlur = 0
      // lit windows
      const cols = Math.max(1, Math.floor((b.w - 16) / 18)), rows = Math.floor((b.h * k - 40) / 26)
      for (let rr = 0; rr < rows; rr++) for (let cc = 0; cc < cols; cc++) {
        const sd = b.seed + rr * 7.1 + cc * 3.3
        if (noise1(sd, 2) < 0.48) continue
        const tw = 0.5 + 0.5 * noise1(t * 0.7 + sd, sd)
        x.fillStyle = rgba(noise1(sd, 5) > 0.75 ? BLUE : '#ffd98a', 0.25 + 0.5 * tw)
        x.fillRect(b.x + 10 + cc * 18, -24 - rr * 26 - 10, 8, 10)
      }
      x.restore()
    }
    // the ground line
    const gp = ease.outCubic(prog(t, 0.05, 0.6))
    const gr = x.createLinearGradient(0, GROUND, 0, H)
    gr.addColorStop(0, 'rgba(12,8,30,0.96)'); gr.addColorStop(1, 'rgba(5,4,12,1)')
    x.fillStyle = gr; x.fillRect(0, GROUND, W, H - GROUND + 700)
    x.beginPath(); x.moveTo(W / 2 - 520 * gp, GROUND); x.lineTo(W / 2 + 520 * gp, GROUND)
    ink(x, LAV, { w: 5, fa: 0, glow: 18 })
    x.restore()
  }

  // ── a speech bubble with a tail pointing at (hx, hy)
  function bubble(p, t) {
    const k0 = pop01(t, p.tB, 0.4, 2.6)
    if (k0 <= 0) return
    const lt = liftT(p.i), u = prog(t, lt, lt + T.liftDur)
    if (u >= 1) return
    x.save()
    x.font = p.font
    const tw = x.measureText(p.text).width
    const bw = Math.max(tw + 60, p.sub ? 170 : 0), bh = p.sub ? 128 : 96
    const hx = p.x, hy = GROUND - HEAD - 6
    let cx = clamp(p.x, 70 + bw / 2, W - 70 - bw / 2), cy = BUB_Y[p.row]
    cy += 6 * Math.sin(t * 2.2 + p.i * 1.3) - bounce(t, p.i) * 0.6
    // lift: rise to its star, shrinking, tail tucks in
    const ue = ease.inOutCubic(u)
    const S = STAR[p.i]
    const px = lerp(cx, S.x, ue) + Math.sin(ue * Math.PI) * (p.i % 2 ? 60 : -60), py = lerp(cy, S.y, ue)
    const sc = k0 * (1 - 0.85 * ease.inQuad(clamp(u / 0.8)))
    const rot = (t > p.tB ? 0.12 * Math.sin((t - p.tB) * 12) * Math.exp(-(t - p.tB) * 3.5) : 0) + (p.i % 2 ? 0.1 : -0.1) * Math.sin(ue * Math.PI)
    const a = 1 - clamp((u - 0.55) / 0.35)
    if (a > 0) {
      x.globalAlpha = a
      x.save(); x.translate(px, py); x.rotate(rot); x.scale(sc, sc)
      // tail (only while it sits on the head)
      const tk = 1 - clamp(u * 4)
      const thx = (hx - cx) * 0.55, thy = bh / 2 + (hy - cy - bh / 2) * 0.55 * tk + 12
      x.beginPath()
      x.roundRect(-bw / 2, -bh / 2, bw, bh, 30)
      if (tk > 0) { x.moveTo(-16, bh / 2 - 2); x.lineTo(thx, thy); x.lineTo(16, bh / 2 - 2) }
      x.fillStyle = 'rgba(16,10,38,0.94)'; x.fill()
      ink(x, p.body, { w: 6, fa: 0, glow: 18 })
      x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, 30); x.fillStyle = 'rgba(16,10,38,0.94)'; x.fill()   // cover the tail seam
      x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, 30); ink(x, p.body, { w: 6, fa: 0.12, glow: 0 })
      x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = p.font
      x.fillText(p.text, 0, p.sub ? -16 : 3)
      if (p.sub) { x.font = `700 23px ${MONO}`; x.fillStyle = rgba(p.body, 0.95); x.fillText(p.sub, 0, 39) }
      x.restore()
    }
    // the star it becomes
    if (u > 0.45) {
      const sk = easeOutBack(prog(u, 0.45, 1), 2.4)
      x.globalAlpha = 1
      orb(x, px, py, 9 * sk, p.body, sk, 4); drawPixelStar(x, px, py, 46 * sk, p.i % 3, p.body)
    }
    // a little trail while flying
    if (u > 0.05 && u < 0.95) {
      for (let k = 1; k < 6; k++) {
        const uu = ease.inOutCubic(Math.max(0, u - k * 0.04))
        const tx = lerp(cx, S.x, uu) + Math.sin(uu * Math.PI) * (p.i % 2 ? 60 : -60), ty = lerp(cy, S.y, uu)
        x.globalAlpha = (1 - k / 6) * 0.8
        drawPixelStar(x, tx + Math.sin(k * 2.3) * 8, ty + 14 + k * 4, 16 - k * 2, k % 3, k % 2 ? p.body : '#fff3e0')
      }
    }
    x.restore()
  }

  // ── the sky stars (after the bubbles land) and their fall back to each head
  function starPos(p, t) {
    const S = STAR[p.i]
    const d = ease.inCubic(prog(t, dropT(p.i), dropT(p.i) + 0.42))
    return { x: lerp(S.x, p.x, d), y: lerp(S.y, cyOf(p.i), d), d }
  }
  function drawStars(t) {
    for (const p of FRONT) {
      const lt = liftT(p.i)
      if (t < lt + T.liftDur || t > bloomT(p.i)) continue
      const P = starPos(p, t)
      const tw = 0.8 + 0.2 * noise1(t * 3 + p.i, p.i)
      const land = prog(t, lt + T.liftDur, lt + T.liftDur + 0.4)
      const sz = 46 * tw * (1 + 0.35 * Math.exp(-land * 5) * Math.sin(land * 14))
      orb(x, P.x, P.y, 10, p.body, 0.85, 4)
      drawPixelStar(x, P.x, P.y, sz, p.i % 3, p.body)
      if (P.d > 0) for (let k = 1; k < 5; k++) { x.globalAlpha = (1 - k / 5) * P.d; drawPixelStar(x, P.x, P.y - k * 26 * P.d, 18 - k * 3, k % 3, p.body) }
      x.globalAlpha = 1
      sparkle(x, STAR[p.i].x, STAR[p.i].y, t, lt + T.liftDur - 0.1, { n: 8, R: 90, seed: 20 + p.i, size: 20, dur: 0.6 })
    }
  }

  // ── the dome of sky over everyone
  function drawDome(t, a) {
    const p = ease.inOutCubic(prog(t, ...T.dome))
    const fade = outK(t, T.domeOut, 0.5) * a
    if (p <= 0 || fade <= 0) return
    x.save(); x.globalAlpha = fade
    x.beginPath(); x.ellipse(W / 2, GROUND, 490, 1110, 0, Math.PI, Math.PI + Math.PI * p)
    ink(x, BLUE, { w: 6, fa: 0, glow: 26 })
    x.restore()
    if (p > 0 && p < 1) { const ang = Math.PI + Math.PI * p; orb(x, W / 2 + Math.cos(ang) * 490, GROUND + Math.sin(ang) * 1110, 12, BLUE, fade, 4) }
    sparkle(x, W / 2, GROUND - 1110, t, T.dome[0] + 0.5, { n: 12, R: 170, seed: 51, size: 26, dur: 0.8 })
  }

  // ── a little birth chart: ring, 12 coloured bands, the sign glyph in the middle
  function miniChart(cx, cy, r, sign, k, t, glow = 0, a = 1) {
    if (k <= 0 || a <= 0) return
    const S = SIGNS[sign]
    x.save(); x.globalAlpha = a; x.translate(cx, cy); x.scale(k, k)
    const rot = t * 0.25 + sign
    x.beginPath(); x.arc(0, 0, r, 0, TAU); x.fillStyle = 'rgba(12,8,30,0.92)'; x.fill()
    for (let i = 0; i < 12; i++) {
      const a0 = rot + i * TAU / 12, a1 = a0 + TAU / 12
      x.beginPath(); x.arc(0, 0, r, a0, a1); x.arc(0, 0, r * 0.7, a1, a0, true); x.closePath()
      x.fillStyle = rgba(SIGNS[i].color, i === sign ? 0.85 : 0.28); x.fill()
    }
    x.strokeStyle = BONE; x.lineWidth = 2.5
    for (let i = 0; i < 12; i++) { const an = rot + i * TAU / 12; x.beginPath(); x.moveTo(Math.cos(an) * r * 0.7, Math.sin(an) * r * 0.7); x.lineTo(Math.cos(an) * r, Math.sin(an) * r); x.stroke() }
    x.beginPath(); x.arc(0, 0, r * 0.7, 0, TAU); x.stroke()
    x.beginPath(); x.arc(0, 0, r, 0, TAU); ink(x, glow > 0 ? GOLD : BONE, { w: 4 + 3 * glow, fa: 0, glow: 12 + 24 * glow })
    x.font = `bold ${Math.round(r * 0.95)}px 'EB Garamond', 'DejaVu Sans', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.shadowColor = S.color; x.shadowBlur = 14; x.fillStyle = S.color; x.fillText(S.glyph + '︎', 0, r * 0.04); x.shadowBlur = 0
    x.restore()
  }

  // ── the people
  function drawPeople(t, oy, a) {
    if (a <= 0) return
    // back row
    for (const b of BACK) {
      const k = pop01(t, b.tIn, 0.4, 2.2)
      if (k <= 0) continue
      const hy = bounce(t, 1) * 0.7
      person(x, b.x, GROUND - 92 + oy - hy, 0.6 * k, { body: b.body, a: 0.62 * a, w: 7 })
    }
    // front row
    for (const p of FRONT) {
      const k = pop01(t, p.tIn, 0.42, 2.2)
      if (k <= 0) continue
      const pick = PAIR.includes(p.i)
      const dim = pick ? 1 : 1 - 0.55 * ease.inOutQuad(prog(t, T.pick, T.pick + 0.4)) * (1 - prog(t, T.sink[0], T.sink[0] + 0.01))
      const hy = bounce(t, p.i) + hop(t, p.tB, 26, 0.34) + (pick ? hop(t, T.arc[1] + 0.05, 40) + hop(t, T.pick, 20) : 0)
      const sq = 1 + (t > p.tB ? 0.1 * Math.exp(-(t - p.tB) * 6) * Math.sin((t - p.tB) * 20) : 0)
      person(x, p.x, GROUND + oy - hy, FS * k, { body: p.body, a: a * dim, sq, w: 8 })
    }
  }

  // ── each person's chart above their head (blooms where their star lands)
  function chartPos(p, t, oy) {
    const pick = PAIR.indexOf(p.i)
    const base = { x: p.x, y: cyOf(p.i) + oy - bounce(t, p.i) * 0.5 }
    if (pick < 0) return { ...base, s: 1 }
    // the pair: grows when picked, then rises into the sky as two stars
    const g = 1 + 0.32 * easeOutBack(prog(t, T.pick, T.pick + 0.45), 2.2)
    const r = ease.inOutCubic(prog(t, ...T.rise))
    const c = ease.inCubic(prog(t, ...T.collapse))
    const tgt = pick ? { x: 785, y: 1130 } : { x: 295, y: 1130 }
    const tgt2 = pick ? { x: 680, y: 1010 } : { x: 400, y: 1010 }
    return { x: lerp(lerp(p.x, tgt.x, r), tgt2.x, c), y: lerp(lerp(cyOf(p.i) - (pick ? hop(t, T.arc[1] + 0.05, 40) : 0), tgt.y, r), tgt2.y, c) + 10 * Math.sin(t * 2 + pick * 2) * r, s: g * lerp(1, 1.08, r) * (1 - 0.85 * c) }
  }
  function drawCharts(t, oy, a) {
    for (const p of FRONT) {
      const tb = bloomT(p.i)
      if (t < tb) continue
      const pick = PAIR.includes(p.i)
      const k = easeOutBack(prog(t, tb, tb + 0.42), 2.6)
      const C = chartPos(p, t, pick ? 0 : oy)
      const dim = pick ? 1 : (1 - 0.6 * ease.inOutQuad(prog(t, T.pick, T.pick + 0.4))) * a
      const glow = pick ? ease.outCubic(prog(t, T.pick, T.pick + 0.4)) : 0
      const fin = pick ? 1 - prog(t, ...T.fadeAll) : 1
      const toStar = pick ? ease.inOutQuad(prog(t, T.collapse[0] + 0.3, T.collapse[1])) : 0
      if (p.i % 2) {   // a light tether down to their head
        const ta = k * dim * fin * (1 - ease.inOutCubic(prog(t, T.rise[0], T.rise[0] + 0.5))) * (pick ? 1 : a)
        if (ta > 0) {
          x.save(); x.globalAlpha = clamp(ta) * 0.7; x.setLineDash([10, 12]); x.lineDashOffset = -t * 30
          x.beginPath(); x.moveTo(C.x, C.y + CHART_R * C.s * k + 6); x.lineTo(p.x, GROUND - 262 + oy - bounce(t, p.i))
          ink(x, pick && t > T.pick ? GOLD : p.body, { w: 4, fa: 0, glow: 10 }); x.setLineDash([]); x.restore()
        }
      }
      if (pick && t > T.pick) orb(x, C.x, C.y, CHART_R * C.s * 0.9, GOLD, 0.35 * glow * fin * (1 - toStar), 2.2)
      miniChart(C.x, C.y, CHART_R, p.sign, k * C.s, t, glow, dim * fin * (1 - toStar))
      if (toStar > 0) {
        const tw = 1 + 0.2 * Math.sin(t * 5 + p.i)
        orb(x, C.x, C.y, (12 + 8 * toStar) * tw, pick && p.i === PAIR[0] ? BLUE : ROSE, toStar * fin, 4)
        drawPixelStar(x, C.x, C.y, 56 * toStar * tw * fin, 0, '#fff3e0')
      }
      sparkle(x, p.x, cyOf(p.i), t, tb, { n: 10, R: 110, seed: 30 + p.i, size: 22, dur: 0.6 })
    }
  }

  // ── the gold arc between the pair
  function arcPts(t, oy) {
    const A = chartPos(FRONT[PAIR[0]], t, 0), B = chartPos(FRONT[PAIR[1]], t, 0)
    const lift = lerp(330, 150, ease.inOutCubic(prog(t, ...T.rise))) * (1 - ease.inOutCubic(prog(t, ...T.collapse)))
    const Q = { x: (A.x + B.x) / 2, y: Math.min(A.y, B.y) - lift }
    return { A, B, Q, at: u => ({ x: (1 - u) ** 2 * A.x + 2 * u * (1 - u) * Q.x + u * u * B.x, y: (1 - u) ** 2 * A.y + 2 * u * (1 - u) * Q.y + u * u * B.y }) }
  }
  function drawArc(t) {
    const ap = ease.inOutQuad(prog(t, ...T.arc))
    if (ap <= 0) return
    const fin = 1 - prog(t, ...T.fadeAll)
    if (fin <= 0) return
    const { A, B, at } = arcPts(t)
    const done = t >= T.arc[1]
    const pulse = done ? 1 + 0.6 * Math.exp(-(t - T.arc[1]) * 3) : 1
    const rA = CHART_R * A.s, rB = CHART_R * B.s
    // start/end at the chart rims (u trimmed)
    const L = Math.hypot(B.x - A.x, B.y - A.y) + 1
    const u0 = clamp(rA / L * 0.9, 0, 0.3), u1 = 1 - clamp(rB / L * 0.9, 0, 0.3)
    const N = Math.ceil(80 * ap)
    x.save(); x.globalAlpha = fin
    x.beginPath(); for (let i = 0; i <= N; i++) { const p = at(lerp(u0, u1, (i / N) * ap)); i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y) }
    ink(x, GOLD, { w: 11 * pulse, fa: 0, glow: 34 })
    x.strokeStyle = '#fff3e0'; x.lineWidth = 3.5; x.stroke()
    x.restore()
    if (!done) {
      const h = at(lerp(u0, u1, ap))
      orb(x, h.x, h.y, 16, GOLD, 1, 4)
      for (let k = 1; k < 8; k++) { const q = at(lerp(u0, u1, Math.max(0, ap - k * 0.03))); x.globalAlpha = 1 - k / 8; drawPixelStar(x, q.x + Math.sin(k * 2.3) * 10, q.y + Math.cos(k * 1.7) * 10, 18 - k, k % 3, k % 2 ? GOLD : PINK) }
      x.globalAlpha = 1
    } else {
      for (let k = 0; k < 2; k++) {
        const ph = ((t - T.arc[1] + k * 0.55) % 1.1) / 1.1
        const q = at(lerp(u0, u1, ease.inOutQuad(k ? 1 - ph : ph)))
        orb(x, q.x, q.y, 9, k ? ROSE : BLUE, Math.sin(Math.PI * ph) * fin * outK(t, T.collapse[0], 0.4), 3.5)
      }
    }
    sparkle(x, B.x, B.y, t, T.arc[1], { n: 18, R: 200, seed: 33, size: 32, dur: 0.9 })
    sparkle(x, A.x, A.y, t, T.arc[1] + 0.1, { n: 12, R: 160, seed: 34, size: 26, dur: 0.8 })
    const M = at(0.5)
    sparkle(x, M.x, M.y, t, T.twinkle, { n: 16, R: 240, seed: 90, size: 28, dur: 0.85 })
  }

  // ── after the charts: the greeting stars stay up as part of the sky in the finale
  function drawFinaleStars(t) {
    if (t < T.rise[0]) return
    const k = ease.outCubic(prog(t, T.rise[0] + 0.4, T.rise[1] + 0.3)) * (1 - prog(t, ...T.fadeAll))
    if (k <= 0) return
    FRONT.forEach((p, i) => {
      if (PAIR.includes(i)) return
      const S = STAR[i]
      const tw = 0.7 + 0.3 * noise1(t * 2.4 + i * 3, i)
      x.globalAlpha = k * tw
      drawPixelStar(x, S.x, S.y - 120, 34 * tw, i % 3, p.body)
    })
    x.globalAlpha = 1
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const oy = sinkY(t), a = crowdA(t)
        drawDome(t, 1)
        drawCity(t, oy, a)
        drawPeople(t, oy, a)
        drawFinaleStars(t)
        drawArc(t)
        drawCharts(t, oy, a)
        drawStars(t)
        for (const p of FRONT) bubble(p, t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      eyebrow.style.opacity = String(ease.outCubic(prog(t, T.eye, T.eye + 0.3)) * outK(t, T.h0Out))
      H0.update(t, outK(t, T.h0Out))
      H1.update(t, outK(t, T.h1Out))
      H2.update(t, outK(t, T.h2Out))
      H3.update(t, outK(t, T.h3Out))
      H4.update(t, outK(t, T.h4Out, 0.3))
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette; the engine shifts pitched cues into Db)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (ts, base = 0, gain = 0.026) => ts.map((s, i) => ['pop', r3(s), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const panOf = i => r3((FRONT[i].x - 540) / 540 * 0.6)
export const CUES = [
  // hook
  ...wordPops([T.h0], 0, 0.03),
  ['pluck', T.culture, 1174.66, 0.055, 0.6, 0], ['pop', T.culture, 1318.51, 0.045, 0],
  ...FRONT.map((p, i) => ['pop', r3(p.tIn), NOTE[i % 7] / 2, 0.02, panOf(i)]),
  ...FRONT.map((p, i) => ['pluck', r3(p.tB), NOTE[[0, 2, 4, 1, 3, 5, 6][i]], 0.05, 0.5, panOf(i)]),
  ...FRONT.map((p, i) => ['pop', r3(p.tB), NOTE[[0, 2, 4, 1, 3, 5, 6][i]] * 2, 0.03, panOf(i)]),
  ...wordPops([T.lang, T.lang + 0.12], 2, 0.026),
  ['riser', r3(T.drop - 0.75), T.drop, 0.045], ['pop', T.one, 880, 0.03, 0],
  ['boom', T.city, 0.1], ['pluck', T.city, 1174.66, 0.055, 0.6, 0], ['whoosh', T.drop, 1.2, 0.05], ['glitter', r3(T.drop + 0.1), r3(T.drop + 0.9)],
  ...TOWERS.filter((b, i) => i % 3 === 0).map((b, i) => ['tick', r3(b.tIn), 0.025]),
  ...BACK.map((b, i) => ['pop', r3(b.tIn), NOTE[(i + 3) % 7], 0.02, r3((b.x - 540) / 540 * 0.5)]),
  // one sky
  ['whoosh', r3(T.h0Out - 0.05), 0.4, 0.035],
  ...wordPops([T.h1, T.h1 + 0.1], 1, 0.026),
  ['bell', T.sky, 1174.66, 0.05, 2.2, 0], ['pop', T.sky, 1318.51, 0.04, 0],
  ...wordPops([T.over, T.over + 0.08, T.over + 0.16, T.over + 0.24], 3, 0.022),
  ...FRONT.map((p, i) => ['whoosh', r3(liftT(i)), 0.5, 0.022]),
  ...FRONT.map((p, i) => ['bell', r3(liftT(i) + T.liftDur - 0.1), NOTE[(i * 2) % 7] * 2, 0.03, 1.6, r3((STAR[i].x - 540) / 540 * 0.6)]),
  ['glitter', T.lift0, r3(liftT(6) + T.liftDur)],
  ['riser', r3(T.dome[0] - 0.2), T.dome[1], 0.035], ['bell', T.dome[1], 1760, 0.035, 2.2, 0],
  // charts
  ['whoosh', r3(T.h1Out - 0.05), 0.4, 0.035],
  ...wordPops([T.h2, T.h2 + 0.1, T.h2 + 0.25, T.h2 + 0.33], 0, 0.024),
  ['pluck', T.chart, 1174.66, 0.055, 0.6, 0],
  ...FRONT.map((p, i) => ['tick', r3(dropT(i) + 0.3), 0.03]),
  ...FRONT.map((p, i) => ['pop', r3(bloomT(i)), NOTE[(i + 1) % 7], 0.04, panOf(i)]),
  ['glitter', bloomT(0), r3(bloomT(6) + 0.5)],
  // born under
  ['whoosh', r3(T.h2Out - 0.05), 0.4, 0.035],
  ...wordPops([T.h3, T.h3 + 0.08, T.h3 + 0.16, T.h3 + 0.4, T.h3 + 0.48, T.h3 + 0.56, T.h3 + 0.64, T.born - 0.12], 1, 0.022),
  ['bell', T.pick, 880, 0.045, 1.8, panOf(PAIR[0])], ['bell', r3(T.pick + 0.08), 1174.66, 0.045, 1.8, panOf(PAIR[1])],
  ['pluck', T.born, 1174.66, 0.055, 0.6, 0],
  ['riser', T.arc[0], T.arc[1], 0.05], ['whoosh', T.arc[0], 0.9, 0.05], ['glitter', T.arc[0], T.arc[1]],
  ['boom', T.arc[1], 0.11], ['bell', T.arc[1], 880, 0.05, 2.4, 0.3], ['bell', r3(T.arc[1] + 0.06), 1174.66, 0.045, 2.4, 0], ['bell', r3(T.arc[1] + 0.12), 1760, 0.03, 2.2, -0.3],
  // same sky
  ['whoosh', T.sink[0], 1.6, 0.04],
  ...wordPops([T.h4, T.h4 + 0.08, T.h4 + 0.16, T.h4 + 0.4, T.h4 + 0.48], 2, 0.024),
  ['pluck', T.same, 880, 0.055, 0.6, 0], ['bell', T.same, 1174.66, 0.04, 2.2, 0],
  ['glitter', r3(T.rise[1] - 0.6), r3(T.rise[1] + 0.4)], ['whoosh', T.collapse[0], 0.8, 0.03],
  ['bell', T.twinkle, 1318.51, 0.04, 2.0, -0.2], ['bell', r3(T.twinkle + 0.08), 1760, 0.03, 2.0, 0.2], ['glitter', T.twinkle, r3(T.twinkle + 0.7)],
]
