// htxtaste (15 s vertical Align ad) · story 0–10.6, then the shared end card ("come" + the Align logo).
//   0.00–3.35  HOOK  "Houston | has *taste.*"  A taco, a fruit kolache (steaming) and a crawfish (snapping) pop in on
//              the beat as bold line-art icons with labels; all three bounce together on 2.54.
//   3.35–5.50  "Your dating app | should *too.*"  A plate slides under the food; it spins up, flings the food off,
//              and its rim becomes a zodiac wheel.
//   5.50–8.25  "Matched by your | *birth chart,*" / "not your *best angle.*"  A second chart flies in spinning and
//              snaps inside the first (6.16); two people's planets pop and gold Align lines join them.
//   8.25–10.5  "Have good | taste in | *people.*"  The two charts float up over two pictogram people; a gold arc
//              joins them and a heart pops. Everything pops out by 10.5.
//   10.5→      plain sky only (SKY_H + grain); the end card takes over at 10.6.
// One canvas (sky + illustration), DOM type above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { BONE, GOLD, PINK, FIRE, RED, SILVER, VIOLET, CRUST, INTER, MONO, rgba, ink, sparkle, taco, kolache, crawfish, plate, person, heart } from './props.js'

export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2, D2R = Math.PI / 180
const BEAT = n => 0.6 + n * 0.5556

// ── the timeline
const T = {
  hook: 0.08, hookLand: BEAT(0) + 0.05, foods: [BEAT(0.5), BEAT(1.5), BEAT(2.5)], allBounce: BEAT(3.5), hookOut: [3.12, 3.32],
  h1: 3.36, h1Land: BEAT(5.5), plate: 3.4, slide: [3.4, 3.95], spin: [4.5, BEAT(10)], fling: 4.86, wheelIn: [4.85, 5.45], h1Out: [5.28, 5.48],
  h2: 5.5, h2Land: BEAT(9.5), wB: [5.52, 6.02], lock: BEAT(10), dots: BEAT(10.5), lines: [BEAT(11), BEAT(11.4), BEAT(11.8)], sub: BEAT(11.2), h2Out: [8.05, 8.25],
  h3: 8.3, h3Land: BEAT(14.7), move: [8.2, 8.85], people: [8.42, 8.56], arc: [9.05, 9.5], heart: 9.5, h3Out: [10.25, 10.48], out: [10.05, 10.45],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
/** pop-out: a little swell, then shrink to 0 */
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
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
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
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

// ── layout
const C = { x: 540, y: 1080 }                          // the plate / chart centre
const WA = { cx: 0, cy: 0, rOut: 440, rIn: 352, rGlyph: 396, alpha: 0.92 }
const WB = { cx: 0, cy: 0, rOut: 330, rIn: 258, rGlyph: 294, alpha: 0.92 }
// the three foods: row position (hook), plate position (on the plate), fling direction
const FOODS = [
  { name: 'TACOS', row: { x: 290, y: 1420, s: 1.1 }, onPlate: { a: 210, r: 210, s: 0.62 }, draw: (x, t) => taco(x, t), col: GOLD, labelDy: 120 },
  { name: 'KOLACHES', row: { x: 540, y: 990, s: 1.25 }, onPlate: { a: 90, r: 200, s: 0.66 }, draw: (x, t) => kolache(x, t), col: CRUST, labelDy: 150 },
  { name: 'CRAWFISH', row: { x: 805, y: 1390, s: 0.95 }, onPlate: { a: 330, r: 210, s: 0.5 }, draw: (x, t) => crawfish(x, t, 0.5 + 0.5 * Math.sin(t * 9)), col: RED, labelDy: 260 },
]
// two people's planets on the locked charts + the gold lines between them
const PAIRS = [{ a: 30, b: 120 }, { a: 150, b: 260 }, { a: 245, b: 20 }]
const R_A = 222, R_B = 128
const ptC = (lon, r, cx, cy) => ({ x: cx + Math.cos(Math.PI - lon * D2R) * r, y: cy + Math.sin(Math.PI - lon * D2R) * r })
// end: the two charts become halos over two people
const PL = { x: 290, y: 1640 }, PR = { x: 790, y: 1640 }, HALO_Y = 1110

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 190px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('HOUSTON, TX'), 0.05, T.hookOut], [eyebrow('ON ALIGN'), T.h2, T.h2Out]]
  const H0 = popText(root, 'Houston | has *taste.*', { top: 200, size: 164, accentSize: 200, at: T.hook, late: 1, lateAt: T.hookLand, wobble: true, accentColor: FIRE, lineHeight: 0.98 })
  const H1 = popText(root, 'Your dating app | should *too.*', { top: 205, size: 112, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.06 })
  const H2 = popText(root, 'Matched by your | *birth* *chart,*', { top: 205, size: 108, accentSize: 140, at: T.h2, late: 2, lateAt: T.h2Land - 0.1, lateGap: 0.1, wobble: true })
  const S2 = popText(root, 'not your *best* *angle.*', { top: TYPE.subY + 40, size: 66, weight: 700, accentSize: 80, at: T.sub, gap: 0.07, accentColor: PINK })
  const H3 = popText(root, 'Have good | taste in | *people.*', { top: 185, size: 132, accentSize: 190, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const HEADS = [[H0, T.hookOut], [H1, T.h1Out], [H2, T.h2Out], [S2, T.h2Out], [H3, T.h3Out]]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // wheel A's rotation: still until the spin, a big whirl, settling exactly on the lock beat
  const rotA = t => -2.5 * TAU * ease.inOutCubic(prog(t, ...T.spin))
  // where food i is at time t (+ its own spin), or null once it has flown off
  function foodPose(i, t) {
    const F = FOODS[i]
    const k = pop01(t, T.foods[i], 0.42, 2.4)
    if (k <= 0) return null
    const bounce = t > T.allBounce ? Math.sin((t - T.allBounce) * 18) * Math.exp(-(t - T.allBounce) * 5) : 0
    let px = F.row.x, py = F.row.y - 40 * bounce, s = F.row.s * k, rot = 0, fa = 1
    // slide onto the plate
    const sl = ease.inOutCubic(prog(t, T.slide[0] + i * 0.06, T.slide[1] + i * 0.06))
    if (sl > 0) {
      const ra = rotA(t) + F.onPlate.a * D2R * -1
      const tx = C.x + Math.cos(ra) * F.onPlate.r, ty = C.y + Math.sin(ra) * F.onPlate.r
      px = lerp(px, tx, sl); py = lerp(py, ty, sl) - Math.sin(Math.PI * sl) * 120; s = lerp(s, F.onPlate.s, sl); rot = rotA(t) * sl
      // fling: off the plate, outward + spinning
      const fl = prog(t, T.fling + i * 0.05, T.fling + i * 0.05 + 0.5)
      if (fl > 0) {
        if (fl >= 1) return null
        const out = ease.inQuad(fl) * 900
        const dirA = ra - 0.5                          // outward, with a little spin-off
        px += Math.cos(dirA) * out; py += Math.sin(dirA) * out; rot += fl * 9; s *= 1 - 0.55 * fl; fa = clamp(1 - fl * 1.6)
      }
    }
    const sq = t > T.foods[i] ? 1 + 0.12 * Math.sin((t - T.foods[i]) * 20) * Math.exp(-(t - T.foods[i]) * 6) + 0.08 * bounce : 1
    return { px, py, s, rot, sq, k, fa }
  }

  function drawFoods(t) {
    if (t > T.fling + 0.7) return
    // labels (hook only)
    const lo = outK(t, [T.slide[0] - 0.15, T.slide[0] + 0.1])
    FOODS.forEach((F, i) => {
      const P = foodPose(i, t)
      if (!P) return
      x.save(); x.globalAlpha = P.fa; x.translate(P.px, P.py); x.rotate(P.rot); x.scale(P.s / P.sq, P.s * P.sq)
      F.draw(x, t)
      x.restore()
      const lk = pop01(t, T.foods[i] + 0.12, 0.3) * lo
      if (lk > 0) {
        x.save(); x.translate(F.row.x, F.row.y + F.labelDy * F.row.s + 40); x.scale(lk, lk); x.globalAlpha = clamp(lk * 2)
        x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 16; x.fillStyle = F.col; x.fillText(F.name, 0, 0)
        x.restore()
      }
      sparkle(x, F.row.x, F.row.y, t, T.foods[i] + 0.1, { n: 9, R: 190, seed: 3 + i, size: 26 })
    })
    sparkle(x, 540, 1200, t, T.allBounce, { n: 16, R: 480, seed: 9, size: 30, cols: [GOLD, '#ffd98a', FIRE, PINK, '#fff3e0'] })
  }

  function drawCharts(t) {
    if (t < T.plate || t > T.out[1]) return
    const pk = pop01(t, T.plate, 0.45, 1.6)
    const wk = ease.inOutQuad(prog(t, ...T.wheelIn))
    const bump = t > T.lock ? 1 + 0.07 * Math.exp(-(t - T.lock) * 7) : 1
    // end move: A to the left halo, B to the right halo
    const mv = ease.inOutCubic(prog(t, ...T.move))
    const ok = popOut(t, T.out)
    const idle = t > T.move[1] ? (t - T.move[1]) * 0.6 : 0
    const ax = lerp(C.x, PL.x, mv), ay = lerp(C.y, HALO_Y, mv) + Math.sin(t * 2.2) * 8 * mv, as = lerp(1, 0.36, mv) * bump * ok
    // wheel A (starts life as a plate; it slides up from below)
    const rise = (1 - ease.outCubic(prog(t, T.plate, T.plate + 0.5))) * 700
    x.save(); x.translate(ax, ay + rise); x.rotate(rotA(t) + idle); x.scale(as * pk, as * pk)
    plate(x, WA.rOut, WA.rIn, 1 - wk)
    if (wk > 0) {
      x.save(); x.globalAlpha = wk
      x.beginPath(); x.arc(0, 0, WA.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.7)'; x.fill()
      x.restore()
      drawWheelH(x, { W: WA, k: wk, glyphK: wk })
    }
    x.restore()
    // speed swooshes while it whirls
    const sv = Math.sin(Math.PI * prog(t, T.spin[0] + 0.2, T.spin[1] - 0.3))
    if (sv > 0.01) {
      x.save(); x.globalAlpha = 0.7 * sv
      for (let k = 0; k < 3; k++) {
        const a0 = rotA(t) + k * TAU / 3
        x.beginPath(); x.arc(C.x, C.y, WA.rOut + 40, a0, a0 + 0.9); ink(x, GOLD, { w: 8, fa: 0, glow: 22 })
      }
      x.restore()
    }
    sparkle(x, C.x, C.y, t, T.wheelIn[0] + 0.1, { n: 14, R: 520, seed: 21, size: 28 })
    // wheel B: flies in from the top-right spinning, snaps inside A on the lock beat
    if (t >= T.wB[0]) {
      const pb = easeOutBack(prog(t, T.wB[0], T.lock), 1.2)
      const rb = 2.2 * TAU * (1 - ease.outCubic(prog(t, T.wB[0], T.lock)))
      const bx = lerp(lerp(1500, C.x, pb), PR.x, mv), by = lerp(lerp(-200, C.y, pb), HALO_Y, mv) + Math.sin(t * 2.2 + 1.4) * 8 * mv
      const bs = lerp(lerp(1.5, 1, pb), 0.48, mv) * bump * ok
      x.save(); x.translate(bx, by); x.rotate(rb - idle * 1.3); x.scale(bs, bs)
      x.beginPath(); x.arc(0, 0, WB.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.8)'; x.fill()
      drawWheelH(x, { W: WB })
      x.restore()
      // once apart, each chart holds its owner's glowing planet
      const hk = pop01(t, T.move[1] - 0.1, 0.4, 2.4) * ok
      if (hk > 0) { orb(ax, ay, 26 * hk, GOLD, clamp(hk * 2)); orb(bx, by, 26 * hk, SILVER, clamp(hk * 2)) }
    }
    // the lock: gold flash ring + sparkles
    const fk = prog(t, T.lock, T.lock + 0.6)
    if (fk > 0 && fk < 1) {
      x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(C.x, C.y, 340 + 200 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 14 * (1 - fk) + 2, fa: 0, glow: 34 }); x.restore()
    }
    sparkle(x, C.x, C.y, t, T.lock, { n: 18, R: 470, seed: 31, size: 32 })
    // planets + gold Align lines (fade out as the charts move apart)
    const lo = outK(t, T.h2Out)
    if (lo > 0) PAIRS.forEach((P, i) => {
      const A_ = ptC(P.a, R_A, C.x, C.y), B_ = ptC(P.b, R_B, C.x, C.y)
      const dk = pop01(t, T.dots + i * 0.08, 0.36, 2.2) * lo
      const lk = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.34))
      if (lk > 0) {
        const pulse = 1 + 0.3 * Math.exp(-Math.max(0, t - T.lines[i] - 0.34) * 4)
        x.save(); x.globalAlpha = lo; x.beginPath(); x.moveTo(A_.x, A_.y); x.lineTo(lerp(A_.x, B_.x, lk), lerp(A_.y, B_.y, lk)); ink(x, GOLD, { w: 10 * pulse, fa: 0, glow: 30 }); x.restore()
        sparkle(x, B_.x, B_.y, t, T.lines[i] + 0.32, { n: 8, R: 110, seed: 40 + i, cols: [GOLD, '#fff3e0', '#ffd98a'], size: 22 })
      }
      if (dk > 0) { orb(A_.x, A_.y, 24 * dk, GOLD, clamp(dk * 2)); orb(B_.x, B_.y, 24 * dk, SILVER, clamp(dk * 2)) }
    })
  }

  function orb(px, py, r, col, a) {
    x.save(); x.globalAlpha = a; x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(px, py, 0, px, py, r * 3.2); g.addColorStop(0, rgba(col, 0.75)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(px, py, r * 3.2, 0, TAU); x.fill()
    x.globalCompositeOperation = 'source-over'
    x.beginPath(); x.arc(px, py, r, 0, TAU); x.fillStyle = col; x.fill()
    x.fillStyle = '#fff'; x.fillRect(px - r * 0.45, py - r * 0.45, r * 0.35, r * 0.35)
    x.restore()
  }

  function drawPeople(t) {
    if (t < T.people[0] || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const hop = t > T.heart ? Math.abs(Math.sin((t - T.heart) * 9)) * Math.exp(-(t - T.heart) * 3.5) * 50 : 0
    ;[[PL, GOLD, T.people[0], 0.06], [PR, PINK, T.people[1], -0.06]].forEach(([P, col, t0, lean], i) => {
      const k = pop01(t, t0, 0.4, 2.4) * ok
      if (k <= 0) return
      const rise = (1 - ease.outCubic(prog(t, t0, t0 + 0.4))) * 260
      const sq = t > t0 ? 1 + 0.1 * Math.sin((t - t0) * 20) * Math.exp(-(t - t0) * 6) : 1
      x.save(); x.translate(P.x, P.y + rise - hop * (i ? 0.8 : 1)); x.scale(1.25 * k / sq, 1.25 * k * sq)
      person(x, col, { lean: lean * Math.min(1, Math.max(0, t - T.heart) * 3) })
      x.restore()
    })
    // gold arc from halo to halo, a heart at its peak
    const ak = ease.inOutCubic(prog(t, ...T.arc))
    if (ak > 0) {
      const ax = PL.x, bx = PR.x, y0 = HALO_Y - 170, peak = HALO_Y - 330
      x.save(); x.globalAlpha = ok
      x.beginPath()
      const N = 40
      for (let j = 0; j <= N * ak; j++) { const u = j / N, px = lerp(ax, bx, u), py = y0 - 4 * (y0 - peak) * u * (1 - u); j ? x.lineTo(px, py) : x.moveTo(px, py) }
      ink(x, GOLD, { w: 10, fa: 0, glow: 30 })
      x.restore()
      const hk = pop01(t, T.heart, 0.45, 3) * ok
      const beat = 1 + 0.1 * Math.max(0, Math.sin((t - T.heart) * 8))
      x.save(); x.translate(540, peak - 10); heart(x, 70 * hk * beat, PINK, clamp(hk * 2)); x.restore()
      sparkle(x, 540, peak, t, T.heart, { n: 16, R: 300, seed: 61, size: 30, cols: [PINK, GOLD, '#fff3e0', VIOLET] })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) { drawCharts(t); drawFoods(t); drawPeople(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts, ~0.07 s before each new headline (the old one's out-anim is done or finishing):
//   3.29 food hook out (3.32) → "Your dating app should too." + the plate (3.36)
//   5.43 plate-wheel head out (5.48) → "Matched by your birth chart," + the second chart flies in (5.5)
//   8.23 charts head out (8.25) → "Have good taste in people." + charts float up (8.3) · end card flips at 10.6
const CUTS = [{ t: 3.29, kind: 'shuffle' }, { t: 5.43, kind: 'fan' }, { t: 8.23, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ...wordPops(T.hook, 2, 0.07, 0), ['pop', T.hookLand, 1318.51, 0.055, 0], ['pluck', T.hookLand, 1174.66, 0.05, 0.6, 0], ['whoosh', 0.05, 0.4, 0.03],
  ...T.foods.map((f, i) => ['pop', f, [587.33, 739.99, 880][i], 0.06, (i - 1) * 0.5]),
  ...T.foods.map((f, i) => ['pluck', +(f + 0.03).toFixed(3), [293.66, 369.99, 440][i], 0.04, 0.35, (i - 1) * 0.5]),
  ['tick', T.foods[2] + 0.2, 0.05], ['tick', T.foods[2] + 0.35, 0.05],            // crawfish snaps
  ['bell', T.allBounce, 1174.66, 0.04, 1.0, 0], ['glitter', T.allBounce, T.allBounce + 0.6],
  // should too: plate, spin, fling
  ...wordPops(T.h1, 4, 0.06, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.05, 0],
  ['whoosh', T.plate, 0.45, 0.04], ['pop', T.plate + 0.3, 440, 0.05, 0],
  ['riser', T.spin[0], T.lock, 0.045], ['whoosh', T.fling, 0.5, 0.05], ['pop', T.fling + 0.05, 987.77, 0.04, -0.5], ['pop', T.fling + 0.12, 880, 0.04, 0.5], ['pop', T.fling + 0.18, 739.99, 0.04, 0],
  ['glitter', T.wheelIn[0] + 0.1, T.wheelIn[1]],
  // matched by your birth chart
  ...wordPops(T.h2, 3, 0.07, 1, 0.025), ['pop', T.h2Land - 0.1, 1318.51, 0.05, 0], ['pop', T.h2Land, 1174.66, 0.045, 0],
  ['whoosh', T.wB[0], 0.5, 0.045],
  ['boom', T.lock, 0.13], ['bell', T.lock, 587.33, 0.05, 2.0, 0], ['glitter', T.lock, T.lock + 0.6],
  ['pop', T.dots, 880, 0.045, -0.3], ['pop', T.dots + 0.08, 987.77, 0.045, 0], ['pop', T.dots + 0.16, 1174.66, 0.045, 0.3],
  ...T.lines.map((l, i) => ['pluck', +(l + 0.3).toFixed(3), [987.77, 1174.66, 1318.51][i], 0.045, 0.7, (i - 1) * 0.4]),
  ...wordPops(T.sub, 4, 0.07, 3, 0.02),
  // have good taste in people
  ['whoosh', T.move[0], 0.5, 0.035],
  ...wordPops(T.h3, 4, 0.07, 2, 0.03), ['pop', T.h3Land, 1318.51, 0.055, 0], ['pluck', T.h3Land, 1174.66, 0.05, 0.7, 0],
  ['pop', T.people[0], 587.33, 0.05, -0.5], ['pop', T.people[1], 739.99, 0.05, 0.5],
  ['whoosh', T.arc[0], 0.45, 0.03], ['bell', T.heart, 1174.66, 0.05, 1.4, 0], ['bell', T.heart + 0.08, 1760, 0.035, 1.4, 0.2], ['glitter', T.heart, T.heart + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
