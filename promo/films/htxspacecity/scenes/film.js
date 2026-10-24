// htxspacecity (30 s vertical Align ad) · scenes 0–25.6, then the shared END CARD ("come Align.").
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–4.55   HOOK  "They call it | *Space City.*" — a night skyline springs up, a rocket lifts off from behind it
//   4.70–9.85   "So why does dating | here feel so… | *Earth-bound?*" ("Earth-bound?" drops in with a thud) —
//               swipe cards rain on a pictogram person under an umbrella; "Swipe. Swipe. *Swipe.*" on the beats
//  10.05–16.25  "Align matches you | by your *birth chart.*" — two zodiac wheels fly in spinning and lock together;
//               Push / Pull / Align lines draw between two people's planets; "Push. Pull. *Align.*"
//  16.40–21.65  "Tonight's deck: | dealt from the *stars.*" — card backs fall like shooting stars into a fan; the top
//               card flips to a veiled mystery card; "New cards. *Every night.*"
//  21.75–25.35  "Mission: | *find your person.*" — countdown eyebrow, the skyline is back, the rocket lifts off and
//               draws a gold heart, sparkle burst
//  25.35–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { W, A, fill, img } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH, READING } from '../../wheel.js'
import { BONE, GOLD, PINK, BLUE, INTER, MONO, rgba, ink, sparkle, skyline, rocket, smoke, swipeCard, umbrellaPerson, canopyY, orb, heartAt } from './props.js'

export const END = 25.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const D2R = Math.PI / 180
const EARTHC = '#6aa8ff', SILVER = '#e3ecff'
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const wob = (t, a, amp = 1, f = 16, k = 5) => t > a ? amp * Math.exp(-(t - a) * k) * Math.sin((t - a) * f) : 0

// ── beats
export const T = {
  // hook
  h0: 0.12, h0Late: 0.62, rocketIgn: 1.35, rocketLift: BEAT(2), rocketGone: 4.3, h0Out: 4.3, skyOut: [4.25, 4.75],
  // earth-bound
  h1: 4.72, h1Late: BEAT(9), person: BEAT(8), rain: [5.35, 9.0], swipes: [BEAT(12), BEAT(13), BEAT(14)], h1Out: 9.6, personOut: 9.45,
  // wheels
  h2: 10.05, h2Late: BEAT(18), wA: [10.45, 11.15], wB: [10.75, 11.45], lock: BEAT(20), dots: BEAT(21), lines: [BEAT(22), BEAT(23), BEAT(24)], h2Out: 16.0, wOut: 15.75,
  // deck
  h3: 16.4, h3Late: BEAT(29) + 0.08, deal: [BEAT(30), BEAT(30.5), BEAT(31), BEAT(31.5), BEAT(32)], flip: BEAT(33), sub3: BEAT(34), h3Out: 21.4, cardsOut: 21.1,
  // mission
  eye4: 21.75, h4: 21.95, h4Late: BEAT(39), city4: 21.8, lift4: BEAT(40), heart: [23.2, 24.45], burst: 24.45, h4Out: 25.0, city4Out: [24.85, 25.3],
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  The last `late` words pop at lateAt (big, optional wobble or a heavy drop). `times` overrides per-word times; `colors` per-word colours. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, drop = false, times = null, colors = {}, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    if (colors[n]) style.color = colors[n]
    const big = late > 0 && n >= nW - late
    const wt = times ? times[n] : big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: wt, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        if (w.big && drop) {
          const p = prog(t, w.t, w.t + 0.34), land = w.t + 0.34
          const y = -420 * (1 - ease.inQuad(p))
          const sq = t > land ? 0.3 * Math.exp(-(t - land) * 6) * Math.cos((t - land) * 22) : 0
          w.e.style.opacity = String(clamp(p * 4) * out)
          w.e.style.transform = `translateY(${(y + (1 - out) * 10).toFixed(2)}px) scale(${((1 + sq) * lerp(0.9, 1, out)).toFixed(4)}, ${((1 - sq) * lerp(0.9, 1, out)).toFixed(4)})`
          continue
        }
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── rain of swipe cards (deterministic)
const CARD_COLS = ['#ff8fb1', '#8fd8f6', '#c9a6ff', '#ffd98a', '#f59cc4']
const UMB = { cx: 600, cy: 1050, hw: 190 }           // canopy: feet at (540, 1420) → hand (600, ~1250) → canopy top ≈ 900
const RAIN = (() => {
  const r = rng(77), out = [], n = 34
  for (let i = 0; i < n; i++) {
    const t0 = T.rain[0] + (i / n) * (T.rain[1] - T.rain[0]) + r() * 0.08
    let x = 90 + r() * 900
    if (i % 3 === 0) x = UMB.cx + (r() - 0.5) * 300             // a good share hits the umbrella
    const v = 1250 + r() * 450, y0 = -140, rot0 = (r() - 0.5) * 1.2, spin = (r() - 0.5) * 5, col = CARD_COLS[i % CARD_COLS.length], s = 0.75 + r() * 0.35
    const cy = canopyY(x, UMB.cx, UMB.cy, UMB.hw)
    const yHit = cy != null ? cy - 50 * s : 1420 - 60 * s
    const tHit = t0 + (yHit - y0) / v
    out.push({ t0, x, v, y0, rot0, spin, col, s, umb: cy != null, yHit, tHit, dir: x < UMB.cx ? -1 : 1, kick: 300 + r() * 250 })
  }
  return out
})()
const UMB_HITS = RAIN.filter(c => c.umb).map(c => c.tHit)

// ── wheels
const WC = { cx: 540, cy: 1010 }
const WA = { cx: 0, cy: 0, rOut: 440, rIn: 352, rGlyph: 396, alpha: 0.92 }
const WB = { cx: 0, cy: 0, rOut: 336, rIn: 262, rGlyph: 299, alpha: 0.92 }
const pt = (lon, r) => ({ x: WC.cx + Math.cos(Math.PI - lon * D2R) * r, y: WC.cy + Math.sin(Math.PI - lon * D2R) * r })
const PAIRS = [
  { a: 20, b: 110, col: READING.push, label: 'PUSH' },
  { a: 145, b: 265, col: READING.pull, label: 'PULL' },
  { a: 228, b: 48, col: READING.align, label: 'ALIGN' },
]
const R_A = 225, R_B = 130

// ── deck fan
const CW = 262, CH = Math.round(262 * 2347 / 1528)
const FAN = [0, 1, 2, 3, 4].map(i => ({ x: 540 + (i - 2) * 118, y: 1060 + Math.abs(i - 2) * 26, rot: (i - 2) * 10 }))
const DEAL_ORDER = [0, 4, 1, 3, 2]   // centre card lands last, on top

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 170px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const imgs = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, overflow: 'hidden', opacity: 0 }, root)
  const backImg = img(imgs, A + 'card-back.png', { width: '10px' })
  const faceImg = img(imgs, A + 'card-profile-1.png', { width: '10px' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = txt => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, txt)
  const E0 = eyebrow('HOUSTON, TX')
  const E4 = eyebrow('T-MINUS 3')
  const H0 = popText(root, 'They call it | *Space* *City.*', { top: 205, size: 112, accentSize: 172, at: T.h0, late: 2, lateAt: T.h0Late, lateGap: 0.09, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H1 = popText(root, 'So why does dating | here feel so… | *Earth-bound?*', { top: 205, size: 96, accentSize: 130, at: T.h1, late: 1, lateAt: T.h1Late, drop: true, accentColor: EARTHC })
  const S1 = popText(root, 'Swipe. Swipe. *Swipe.*', { top: TYPE.subY + 20, size: 66, weight: 700, accentSize: 76, times: T.swipes, accentColor: PINK })
  const H2 = popText(root, 'Align matches you | by your *birth* *chart.*', { top: 205, size: 88, accentSize: 112, at: T.h2, late: 2, lateAt: T.h2Late, wobble: true })
  const S2 = popText(root, 'Push. Pull. *Align.*', { top: TYPE.subY + 20, size: 72, weight: 800, accentSize: 84, times: T.lines, colors: { 0: READING.push, 1: READING.pull }, accentColor: READING.align })
  const H3 = popText(root, "Tonight's deck: | dealt from the *stars.*", { top: 205, size: 104, accentSize: 124, at: T.h3, late: 1, lateAt: T.h3Late, wobble: true })
  const S3 = popText(root, 'New cards. *Every* *night.*', { top: TYPE.subY + 40, size: 66, weight: 700, accentSize: 76, at: T.sub3, gap: 0.08, accentColor: PINK })
  const H4 = popText(root, 'Mission: | *find* *your* *person.*', { top: 215, size: 132, accentSize: 150, at: T.h4, late: 3, lateAt: T.h4Late, lateGap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 1.0 })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── 1 · hook: skyline + rocket
  const ROCKET_X = 850, PAD_Y = 1668
  const rocketY = t => PAD_Y - 2300 * ease.inQuad(prog(t, T.rocketLift, T.rocketGone))
  function drawHook(t) {
    if (t > T.skyOut[1]) return
    const sink = ease.inCubic(prog(t, ...T.skyOut)) * 900
    skyline(x, t, 1800 + sink, j => pop01(t, 0.05 + j * 0.045, 0.42, 1.6), { sc: 0.82 })
    // launch tower
    const tk = pop01(t, 0.3, 0.4, 1.8) * (1 - ease.inCubic(prog(t, ...T.skyOut)))
    if (tk > 0) {
      x.save(); x.translate(ROCKET_X - 120, 1800 + sink); x.scale(1, tk)
      x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -420); x.moveTo(30, 0); x.lineTo(30, -420)
      for (let k = 0; k < 9; k++) { x.moveTo(0, -k * 46); x.lineTo(30, -k * 46 - 46) }
      x.moveTo(30, -330); x.lineTo(70, -330); ink(x, '#efe6d6', { w: 5, fa: 0, glow: 8 })
      x.beginPath(); x.roundRect(-30, -24, 300, 24, 6); ink(x, '#c9a6ff', { w: 6, fa: 0.4 })
      x.restore()
    }
    // rocket + smoke in front of the towers
    const rk = clamp(prog(t, 0.2, 0.5))
    if (t < T.rocketGone + 0.1) {
      const ry = rocketY(t) + sink, shake = t > T.rocketIgn && t < T.rocketLift + 0.3 ? 3 * Math.sin(t * 80) : 0
      // sparkle trail
      for (let k = 1; k < 9; k++) {
        const tt = t - k * 0.06
        if (tt < T.rocketLift) break
        if (rocketY(tt) + sink + 250 > 1740) continue
        x.save(); x.globalAlpha = (1 - k / 9) * 0.9; orb(x, ROCKET_X + Math.sin(k * 2.1) * 6, rocketY(tt) + sink + 250, 10 - k * 0.7, k % 2 ? GOLD : PINK, 1, 2.5); x.restore()
      }
      rocket(x, ROCKET_X + shake, ry, 0.62, t, { fl: t < T.rocketIgn ? 0 : t < T.rocketLift ? 0.35 : 1, a: rk })
    }
    smoke(x, ROCKET_X, 1770 + sink, t, ease.outCubic(prog(t, T.rocketIgn, T.rocketLift + 0.6)), outK(t, 3.3, 0.8), 260)
    sparkle(x, ROCKET_X, 1620, t, T.rocketLift, { n: 12, R: 220, seed: 3 })
  }

  // ── 2 · earth-bound: swipe-card rain on the umbrella person
  function drawRain(t) {
    if (t < T.rain[0] - 0.1 || t > T.h1Out + 0.4) return
    const pk = pop01(t, T.person, 0.45, 1.8) * outK(t, T.personOut, 0.3)
    // ground line
    if (pk > 0) {
      x.save(); x.globalAlpha = clamp(pk); x.beginPath(); x.moveTo(140, 1424); x.lineTo(940, 1424); ink(x, '#c9a6ff', { w: 6, fa: 0, glow: 12 }); x.restore()
    }
    const tilt = UMB_HITS.reduce((m, th) => m + wob(t, th, 0.07, 18, 7), 0)
    for (const c of RAIN) {
      if (t < c.t0) continue
      const dt = t - c.t0
      if (t < c.tHit) {
        const y = c.y0 + c.v * dt
        swipeCard(x, c.x, y, c.s, c.rot0 + c.spin * dt, c.col, clamp((y - 560) / 120))
      } else if (c.umb) {
        const u = t - c.tHit
        if (u > 0.75) continue
        const px = c.x + c.dir * c.kick * u, py = c.yHit - 520 * u + 1900 * u * u
        swipeCard(x, px, py, c.s, c.rot0 + c.dir * 9 * u, c.col, 1 - ease.inQuad(u / 0.75))
      } else {
        const u = t - c.tHit
        if (u > 0.5) continue
        const sq = 1 - 0.45 * ease.outCubic(clamp(u / 0.12))
        swipeCard(x, c.x, c.yHit + 40 * (1 - sq), c.s, c.rot0 * 0.3, c.col, 1 - ease.inQuad(u / 0.5), sq)
      }
    }
    umbrellaPerson(x, 540, 1420, 1.0 * pk, t, { a: clamp(pk * 2), tilt: tilt + 0.08 })
    for (const th of UMB_HITS) if (t >= th && t < th + 0.5) sparkle(x, UMB.cx + (th * 1000 % 160) - 80, UMB.cy - 120, t, th, { n: 5, R: 70, seed: Math.round(th * 100), size: 18, dur: 0.45 })
  }

  // ── 3 · two wheels lock together; Push / Pull / Align lines
  function drawWheels(t) {
    if (t < T.wA[0] - 0.05 || t > T.h2Out + 0.4) return
    const o = 1 - ease.inCubic(prog(t, T.wOut, T.wOut + 0.4))
    const os = lerp(0.6, 1, o)
    const bump = 1 + 0.06 * Math.exp(-Math.max(0, t - T.lock) * 7) * (t > T.lock ? 1 : 0)
    // wheel A from the left, wheel B from the right, spinning; both settle to 0 on the lock beat
    const pa = easeOutBack(prog(t, ...T.wA), 1.3), pb = easeOutBack(prog(t, ...T.wB), 1.3)
    const ra = -1.75 * Math.PI * (1 - ease.outCubic(prog(t, T.wA[0], T.lock))), rb = 1.5 * Math.PI * (1 - ease.outCubic(prog(t, T.wB[0], T.lock)))
    const ax = lerp(-560, WC.cx, pa), bx = lerp(1640, WC.cx, pb)
    x.save(); x.globalAlpha = o
    if (t >= T.wA[0]) { x.save(); x.translate(ax, WC.cy); x.rotate(ra); x.scale(bump * os, bump * os); drawWheelH(x, { W: WA }); x.restore() }
    if (t >= T.wB[0]) { x.save(); x.translate(bx, WC.cy); x.rotate(rb); x.scale(bump * os, bump * os); drawWheelH(x, { W: WB }); x.restore() }
    x.restore()
    // the lock: a gold flash ring + sparkles
    const fk = prog(t, T.lock, T.lock + 0.6)
    if (fk > 0 && fk < 1) {
      x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(WC.cx, WC.cy, 344 + 120 * ease.outCubic(fk), 0, Math.PI * 2); ink(x, GOLD, { w: 10 * (1 - fk) + 2, fa: 0, glow: 30 }); x.restore()
    }
    sparkle(x, WC.cx, WC.cy, t, T.lock, { n: 16, R: 420, seed: 9, size: 30 })
    // two people's planets + the reading lines
    PAIRS.forEach((P, i) => {
      const A_ = pt(P.a, R_A * os), B_ = pt(P.b, R_B * os)
      const dk = pop01(t, T.dots + i * 0.08, 0.36, 2.2) * o
      const lk = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.38)) * o
      if (lk > 0) {
        const pulse = 1 + 0.25 * Math.exp(-Math.max(0, t - T.lines[i] - 0.38) * 4)
        x.save(); x.globalAlpha = o; x.beginPath(); x.moveTo(A_.x, A_.y); x.lineTo(lerp(A_.x, B_.x, lk), lerp(A_.y, B_.y, lk)); ink(x, P.col, { w: 9 * pulse, fa: 0, glow: 26 }); x.restore()
        sparkle(x, B_.x, B_.y, t, T.lines[i] + 0.36, { n: 8, R: 100, seed: 20 + i, cols: [P.col, '#fff3e0'], size: 22 })
      }
      if (dk > 0) {
        orb(x, A_.x, A_.y, 22 * dk, GOLD, clamp(dk * 2) * o)
        orb(x, B_.x, B_.y, 22 * dk, SILVER, clamp(dk * 2) * o)
      }
    })
  }

  // ── 4 · tonight's deck: card backs fall like shooting stars into a fan; the top card flips
  function drawCard(im, cx, cy, w, h, rot, a = 1, sx = 1) {
    if (a <= 0 || !im.complete || !im.naturalWidth) return
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(sx, 1); x.globalAlpha = a
    x.drawImage(im, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawDeck(t) {
    if (t < T.deal[0] - 0.6 || t > T.h3Out + 0.4) return
    const out = i => prog(t, T.cardsOut + i * 0.05, T.cardsOut + i * 0.05 + 0.4)
    DEAL_ORDER.forEach((ci, k) => {
      const F = FAN[ci], td = T.deal[k], t0 = td - 0.5
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, td))
      const sx0 = F.x + 520, sy0 = -320
      let cx = lerp(sx0, F.x, p), cy = lerp(sy0, F.y, p) + 6 * Math.sin((t - td) * 2.2 + ci)
      let rot = lerp(F.rot + 50, F.rot, p), sc = lerp(0.35, 1, p)
      // shooting-star trail
      if (p < 1) {
        const g = x.createLinearGradient(cx, cy, cx + (sx0 - F.x) * 0.5, cy + (sy0 - F.y) * 0.5)
        g.addColorStop(0, rgba(GOLD, 0.9)); g.addColorStop(1, rgba(GOLD, 0))
        x.save(); x.strokeStyle = g; x.lineWidth = 16 * (1 - p) + 4; x.lineCap = 'round'; x.shadowColor = GOLD; x.shadowBlur = 20
        x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + (sx0 - F.x) * 0.5 * (1 - p * 0.5), cy + (sy0 - F.y) * 0.5 * (1 - p * 0.5)); x.stroke(); x.restore()
      }
      // landing squash
      const land = t > td ? 0.06 * Math.exp(-(t - td) * 8) * Math.cos((t - td) * 26) : 0
      // the centre (top) card lifts + flips
      let face = false, fx = 1
      if (ci === 2 && t > T.flip - 0.05) {
        const lp = easeOutBack(prog(t, T.flip, T.flip + 0.4), 1.6)
        cy -= 120 * lp; sc *= 1 + 0.32 * lp
        const fp = prog(t, T.flip + 0.1, T.flip + 0.5)
        fx = Math.abs(Math.cos(fp * Math.PI)); face = fp >= 0.5
        rot = lerp(rot, 0, clamp(lp))
      }
      const o = out(k), oe = ease.inCubic(o)
      if (o >= 1) return
      cx += (ci - 2) * 260 * oe; cy -= 1500 * oe
      if (face) {
        // aura glow behind the mystery card
        const ag = x.createRadialGradient(cx, cy, 20, cx, cy, 420)
        ag.addColorStop(0, rgba(PINK, 0.45 * (1 - o))); ag.addColorStop(1, rgba(PINK, 0))
        x.fillStyle = ag; x.fillRect(cx - 420, cy - 420, 840, 840)
        drawCard(faceImg, cx, cy, CW * sc * (1 + land) * 1.02, CW * sc * (1 - land) * 1.02 * 2238 / 1496, rot, 1 - o, fx)
      } else drawCard(backImg, cx, cy, CW * sc * (1 + land), CH * sc * (1 - land), rot, clamp(prog(t, t0, t0 + 0.1)) * (1 - o), fx)
      sparkle(x, F.x, F.y - 40, t, td, { n: 9, R: 170, seed: 30 + k, size: 26 })
    })
    sparkle(x, 540, 900, t, T.flip + 0.3, { n: 14, R: 330, seed: 44, size: 30 })
  }

  // ── 5 · mission: skyline back, the rocket lifts off and draws a gold heart
  const HC = { x: 540, y: 1000, s: 21 }
  const hp = u => { const p = heartAt(u); return { x: HC.x + p.x * HC.s, y: HC.y + p.y * HC.s } }
  const BASE4 = 1800
  function rocketPose4(t) {
    const [h0, h1] = T.heart
    if (t < h0) {          // rise from below the skyline to the heart's tip
      const p = ease.outQuad(prog(t, T.lift4, h0))
      return { x: HC.x, y: lerp(2050, hp(0).y, p), rot: 0 }
    }
    if (t < h1) {
      const u = ease.inOutQuad(prog(t, h0, h1)), a = hp(Math.max(0, u - 0.004)), b = hp(Math.min(1, u + 0.004)), p = hp(u)
      return { x: p.x, y: p.y, rot: Math.atan2(b.y - a.y, b.x - a.x) + Math.PI / 2 }
    }
    const p = ease.inQuad(prog(t, h1, T.h4Out + 0.1))   // through the heart and off the top
    return { x: HC.x, y: lerp(hp(0).y, -400, p), rot: 0 }
  }
  function drawMission(t) {
    if (t < T.city4 || t > T.city4Out[1] + 0.05) return
    const sink = ease.inCubic(prog(t, ...T.city4Out)) * 700
    const fade = 1 - prog(t, T.city4Out[0], T.city4Out[1])
    // the gold heart trail
    const [h0, h1] = T.heart
    const u = t < h0 ? 0 : ease.inOutQuad(prog(t, h0, h1))
    if (u > 0) {
      x.save(); x.globalAlpha = fade
      x.beginPath()
      const N = Math.ceil(u * 160)
      for (let i = 0; i <= N; i++) { const p = hp((i / N) * u); i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y) }
      const done = t >= T.burst
      if (done) x.closePath()
      const pulse = done ? 1 + 0.08 * Math.exp(-(t - T.burst) * 3) * Math.sin((t - T.burst) * 16) : 1
      if (done) { x.translate(HC.x, HC.y + 80); x.scale(pulse, pulse); x.translate(-HC.x, -HC.y - 80) }
      ink(x, GOLD, { w: 12, fa: done ? 0.3 * clamp((t - T.burst) * 4) : 0, fill: PINK, glow: 30 })
      x.restore()
    }
    // the rocket on top of its trail
    if (t >= T.lift4) {
      const P = rocketPose4(t)
      rocket(x, P.x, P.y, 0.42, t, { rot: P.rot, fl: 1, a: 1 })
    }
    skyline(x, t, BASE4 + sink, j => pop01(t, T.city4 + j * 0.04, 0.42, 1.6), { sc: 0.82 })
    sparkle(x, HC.x, HC.y - 40, t, T.burst, { n: 20, R: 480, seed: 61, size: 34, dur: 0.9 })
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.36) { drawHook(t); drawRain(t); drawWheels(t); drawDeck(t); drawMission(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.4)))
      // eyebrows
      const e0 = ease.outCubic(prog(t, 0.08, 0.4)) * outK(t, T.h0Out)
      E0.style.opacity = String(e0)
      const e4 = ease.outCubic(prog(t, T.eye4, T.eye4 + 0.25)) * outK(t, T.h4Out)
      E4.style.opacity = String(e4)
      E4.textContent = t < T.eye4 + 0.3 ? 'T-MINUS 3' : t < T.eye4 + 0.6 ? 'T-MINUS 3 · 2' : t < T.lift4 ? 'T-MINUS 3 · 2 · 1' : 'LIFTOFF ✦'
      H0.update(t, outK(t, T.h0Out))
      H1.update(t, outK(t, T.h1Out)); S1.update(t, outK(t, T.h1Out))
      H2.update(t, outK(t, T.h2Out)); S2.update(t, outK(t, T.h2Out))
      H3.update(t, outK(t, T.h3Out)); S3.update(t, outK(t, T.h3Out))
      H4.update(t, outK(t, T.h4Out, 0.25))
      drawGrain(gx, t)
    },
  }
}

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const r3 = v => +v.toFixed(3)
export const CUES = [
  // hook
  ...wordPops(T.h0, 3, 0.07, 0),
  ['pluck', T.h0Late, 1174.66, 0.05, 0.6, 0], ['pop', T.h0Late, 1318.51, 0.05, -0.1], ['pop', r3(T.h0Late + 0.09), 1479.98, 0.045, 0.1],
  ['riser', T.rocketIgn - 0.2, T.rocketLift + 0.1, 0.05], ['tick', T.rocketIgn, 0.04],
  ['boom', T.rocketLift, 0.14], ['whoosh', T.rocketLift, 1.6, 0.06], ['glitter', T.rocketLift, T.rocketLift + 0.8],
  // earth-bound
  ...wordPops(T.h1, 7, 0.07, 1, 0.026),
  ['whoosh', r3(T.h1Late - 0.05), 0.35, 0.04], ['boom', r3(T.h1Late + 0.34), 0.1], ['pluck', r3(T.h1Late + 0.34), 146.83, 0.05, 0.5, 0],
  ['pop', T.person, 740, 0.05, 0],
  ...RAIN.filter((c, i) => c.umb).map((c, i) => ['tick', r3(c.tHit), 0.03]),
  ...T.swipes.map((s, i) => ['pop', r3(s), [880, 987.77, 1174.66][i], 0.05, (i - 1) * 0.3]),
  ...T.swipes.map(s => ['whoosh', r3(s - 0.04), 0.22, 0.025]),
  // wheels
  ...wordPops(T.h2, 5, 0.07, 2, 0.026),
  ['pluck', T.h2Late, 880, 0.05, 0.6, 0], ['pop', T.h2Late, 1174.66, 0.05, 0],
  ['whoosh', T.wA[0], 0.6, 0.05], ['whoosh', T.wB[0], 0.6, 0.05],
  ['boom', T.lock, 0.12], ['bell', T.lock, 587.33, 0.05, 2.0, 0], ['glitter', T.lock, T.lock + 0.6],
  ...PAIRS.map((_, i) => ['pop', r3(T.dots + i * 0.08), [740, 880, 987.77][i], 0.035, (i - 1) * 0.3]),
  ...T.lines.map((s, i) => ['pluck', r3(s), [659.25, 880, 1174.66][i], 0.055, 0.6, (i - 1) * 0.3]),
  ['bell', T.lines[2], 1174.66, 0.04, 1.8, 0],
  // deck
  ...wordPops(T.h3, 5, 0.07, 3, 0.026),
  ['pluck', T.h3Late, 1318.51, 0.05, 0.6, 0],
  ...T.deal.map((s, i) => ['whoosh', r3(s - 0.45), 0.4, 0.03]),
  ...T.deal.map((s, i) => ['pop', r3(s), [587.33, 659.25, 739.99, 880, 987.77][i], 0.05, ((i % 2) - 0.5) * 0.4]),
  ['whoosh', r3(T.flip + 0.05), 0.4, 0.04], ['bell', r3(T.flip + 0.3), 1318.51, 0.05, 2.0, 0], ['bell', r3(T.flip + 0.36), 1975.53, 0.03, 2.0, 0], ['glitter', r3(T.flip + 0.3), r3(T.flip + 1.0)],
  ...wordPops(T.sub3, 4, 0.08, 2, 0.022),
  ['whoosh', T.cardsOut, 0.6, 0.04],
  // mission
  ['tick', T.eye4, 0.05], ['tick', r3(T.eye4 + 0.3), 0.05], ['tick', r3(T.eye4 + 0.6), 0.05],
  ...wordPops(T.h4, 1, 0.07, 0, 0.03),
  ['pluck', T.h4Late, 880, 0.05, 0.6, 0], ['pop', T.h4Late, 1174.66, 0.045, -0.1], ['pop', r3(T.h4Late + 0.12), 1318.51, 0.045, 0.1], ['pop', r3(T.h4Late + 0.24), 1479.98, 0.05, 0],
  ['riser', r3(T.lift4 - 0.5), T.lift4, 0.05], ['boom', T.lift4, 0.12], ['whoosh', T.lift4, 1.0, 0.05],
  ['glitter', T.heart[0], T.heart[1]],
  ['bell', T.burst, 880, 0.05, 2.2, -0.2], ['bell', r3(T.burst + 0.06), 1174.66, 0.045, 2.2, 0.2], ['bell', r3(T.burst + 0.12), 1760, 0.03, 2.0, 0],
  ['whoosh', r3(T.heart[1] + 0.05), 0.6, 0.05],
]
