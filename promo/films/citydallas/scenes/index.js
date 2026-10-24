// citydallas (15 s vertical Align ad) · story 0–10.6, then the shared end card ("come" + the Align logo + VOTE FOR YOUR CITY).
//   0.00–4.25  HOOK  "Dallas: | big hair, | big trucks, | big *expectations.*"  Each line lands on the beat with its prop:
//              a pictogram whose hair poofs bigger on every eighth note; a lifted pickup that rolls in and bounces;
//              and on the drop (2.82) a GIANT star rises behind them all (and the hair poofs once more to keep up).
//   4.05–8.05  "Meet someone who | *meets them.*"  The truck peels off, the do pops; the star shrinks to a centre jewel while
//              two birth charts slide in from both sides, spinning, and lock round it (5.60): the star blazes, and three
//              Push / Pull / Align lines join the two people's planets. Sub: "Matched by your *birth charts.*"
//   8.05–10.45 "Big love, | *by the stars.*"  Charts pop away, the star grows into a big glowing sky-star; two pictograms
//              (one with the big hair) rise; gold beams run from each up to the star; a heart pops inside it.
//   10.45→     plain sky only (SKY_H + grain); the end card takes over at 10.6.
// One canvas (sky + illustration), DOM type above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, READING, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { BONE, GOLD, PINK, CYAN, SILVER, VIOLET, HAIR, INTER, rgba, ink, sparkle, person, heart, bigHair, truck, bigStar } from './props.js'

export const DURATION = 15
export const CTA = 'VOTE FOR YOUR CITY'
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2, D2R = Math.PI / 180
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)

// ── the timeline
const T = {
  dallas: 0.08, hair: BEAT(0), poofs: [BEAT(0.5), BEAT(1), BEAT(1.5)], trucks: BEAT(2), roll: [BEAT(1.6), BEAT(3)], drop: BEAT(4),
  expAt: BEAT(4) - 0.12, gagPoof: BEAT(5), honk: BEAT(5.5), hookOut: [4.05, 4.25],
  peel: [3.98, 4.6], hairOut: [4.0, 4.32], shrink: [4.1, 4.75],
  h1: 4.3, h1Late: BEAT(7.5), slide: [4.4, BEAT(9)], lock: BEAT(9), lines: [BEAT(9.5), BEAT(9.9), BEAT(10.3)], sub: BEAT(10.5), h1Out: [7.85, 8.05],
  chartsOut: [7.95, 8.35], grow: [8.0, 8.7],
  h3: 8.1, h3Late: BEAT(14), people: [8.3, 8.42], beams: [8.75, 9.2], heart: BEAT(15.5), h3Out: [10.22, 10.45], out: [10.05, 10.45],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
/** pop-out: a little swell, then shrink to 0 */
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const jiggle = (t, t0, f = 20, d = 6) => t > t0 ? Math.sin((t - t0) * f) * Math.exp(-(t - t0) * d) : 0

/** springy type with an explicit time per word: `*word*` = accent (Garamond italic), `|` = line break, `!` suffix = big late pop + wobble */
function popText(parent, text, times, { top, size, weight = 800, accentColor = GOLD, accentSize, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  let n = 0
  const t0 = times[0]
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const big = w.endsWith('!'); if (big) w = w.slice(0, -1)
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    ws.push({ t: times[Math.min(n, times.length - 1)], big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── layout
const GROUND = 1730
const HERO = { x: 272, s: 1.38 }                        // the big-hair pictogram (feet on the road)
const TRUCK_AT = { x: 790, s: 0.94 }
const STAR = { x: 640, y: 1130, R: 360 }              // the hook's giant star
const C = { x: 540, y: 1105 }                          // the charts' centre
const WA = { cx: 0, cy: 0, rOut: 400, rIn: 320, rGlyph: 360, alpha: 0.92 }
const WB = { cx: 0, cy: 0, rOut: 290, rIn: 226, rGlyph: 258, alpha: 0.92 }
const PAIRS = [{ a: 40, b: 150, col: READING.push }, { a: 160, b: 280, col: READING.pull }, { a: 265, b: 25, col: READING.align }]
const R_A = 200, R_B = 150
const ptC = (lon, r, cx, cy) => ({ x: cx + Math.cos(Math.PI - lon * D2R) * r, y: cy + Math.sin(Math.PI - lon * D2R) * r })
const END_STAR = { x: 540, y: 950, R: 250 }
const PL = { x: 290, y: 1770 }, PR = { x: 790, y: 1770 }

// hair size over the hook: normal → three poofs → one more on the gag beat
function hairR(t) {
  let R = 46
  const steps = [[T.poofs[0], 72], [T.poofs[1], 96], [T.poofs[2], 118], [T.gagPoof, 140]]
  for (const [t0, r] of steps) R = lerp(R, r, easeOutBack(prog(t, t0, t0 + 0.26), 2.6))
  return R
}

async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "700 62px Inter", "italic 500 150px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 40) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('DALLAS, TX'), 0.05, T.hookOut]]
  const H0 = popText(root, 'Dallas: | big hair, | big trucks, | big *expectations.*!',
    [T.dallas, T.hair, T.hair + 0.09, T.trucks, T.trucks + 0.09, T.expAt, T.drop], { top: 190, size: 118, accentSize: 138, accentColor: GOLD, lineHeight: 1.04 })
  const H1 = popText(root, 'Meet someone | who *meets* *them.*!', [T.h1, T.h1 + 0.08, T.h1 + 0.16, T.h1Late, T.h1Late + 0.12], { top: 205, size: 112, accentSize: 168, accentColor: PINK })
  const S1 = popText(root, 'Matched by your *birth* *charts.*', [0, 1, 2, 3, 4].map(i => T.sub + i * 0.07), { top: TYPE.subY + 20, size: 64, weight: 700, accentSize: 80, accentColor: GOLD })
  const H3 = popText(root, 'Big love, | *by* *the* *stars.*!', [T.h3, T.h3 + 0.1, T.h3Late, T.h3Late + 0.1, T.h3Late + 0.22], { top: 210, size: 150, accentSize: 170, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.hookOut], [H1, T.h1Out], [S1, T.h1Out], [H3, T.h3Out]]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── road
  function drawRoad(t) {
    const k = ease.outCubic(prog(t, 0.05, 0.45)) * outK(t, [4.1, 4.5])
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    const g = x.createLinearGradient(0, GROUND, 0, 1920); g.addColorStop(0, 'rgba(26,20,48,0.92)'); g.addColorStop(1, 'rgba(10,8,24,0.95)')
    x.fillStyle = g; x.fillRect(0, GROUND, W, 1920 - GROUND)
    x.beginPath(); x.moveTo(0, GROUND); x.lineTo(W, GROUND); ink(x, BONE, { w: 6, fa: 0, glow: 14 })
    // dashed lane, scrolling while the truck rolls
    const roll = ease.outCubic(prog(t, ...T.roll)) * 700 + ease.inQuad(prog(t, ...T.peel)) * 1400
    x.strokeStyle = rgba(GOLD, 0.8); x.lineWidth = 10; x.setLineDash([70, 60]); x.lineDashOffset = -roll
    x.beginPath(); x.moveTo(0, GROUND + 90); x.lineTo(W, GROUND + 90); x.stroke(); x.setLineDash([])
    x.restore()
  }

  // ── the giant star (hook) → centre jewel (turn) → big love star (end)
  function starPose(t) {
    if (t < T.drop) return null
    const rise = ease.outBack(prog(t, T.drop, T.drop + 0.55))
    let px = STAR.x, py = STAR.y + (1 - ease.outCubic(prog(t, T.drop, T.drop + 0.5))) * 900, R = STAR.R * (0.25 + 0.75 * rise), rot = -1.2 * (1 - ease.outCubic(prog(t, T.drop, T.drop + 0.6)))
    let glow = 0.6 + 0.3 * Math.sin(t * 5), rays = ease.outCubic(prog(t, T.drop, T.drop + 0.8))
    // shrink into the chart centre
    const sh = ease.inOutCubic(prog(t, ...T.shrink))
    px = lerp(px, C.x, sh); py = lerp(py, C.y, sh); R = lerp(R, 96, sh); rays *= 1 - sh
    // the lock: blaze
    const lk = t > T.lock ? Math.exp(-(t - T.lock) * 2.2) : 0
    if (t > T.lock) { glow += 1.4 * lk + 0.3; rays = 0.9 + 0.6 * lk; R *= 1 + 0.35 * Math.exp(-(t - T.lock) * 6) }
    rot += t > T.lock ? (t - T.lock) * 0.25 : 0
    // the end: grow into the big love star
    const gr = ease.inOutCubic(prog(t, ...T.grow))
    px = lerp(px, END_STAR.x, gr); py = lerp(py, END_STAR.y, gr) + Math.sin(t * 2.2) * 8 * gr; R = lerp(R, END_STAR.R, gr)
    if (t > T.heart) { glow += 1.2 * Math.exp(-(t - T.heart) * 3); R *= 1 + 0.12 * Math.exp(-(t - T.heart) * 6) }
    R *= popOut(t, T.out)
    return { px, py, R, rot, glow, rays }
  }
  function drawStar(t) {
    const P = starPose(t)
    if (!P || P.R <= 0) return
    x.save(); x.translate(P.px, P.py); bigStar(x, P.R, { glow: P.glow, rays: P.rays, rot: P.rot, t }); x.restore()
    sparkle(x, STAR.x, STAR.y - 100, t, T.drop + 0.2, { n: 18, R: 560, seed: 7, size: 34, cols: [GOLD, '#ffd98a', '#fff3e0', PINK] })
    sparkle(x, C.x, C.y, t, T.lock, { n: 18, R: 480, seed: 31, size: 32 })
    // heart inside the end star
    const hk = pop01(t, T.heart, 0.45, 3) * popOut(t, T.out)
    if (hk > 0) {
      const beat = 1 + 0.1 * Math.max(0, Math.sin((t - T.heart) * 8))
      x.save(); x.translate(P.px, P.py + 8); heart(x, 92 * hk * beat, PINK, clamp(hk * 2)); x.restore()
      sparkle(x, P.px, P.py, t, T.heart, { n: 18, R: 380, seed: 61, size: 32, cols: [PINK, GOLD, '#fff3e0', VIOLET] })
    }
  }

  // ── the hero with the big hair
  function drawHero(t) {
    if (t > T.hairOut[1]) return
    const k = pop01(t, T.hair - 0.08, 0.4, 2.4) * popOut(t, T.hairOut)
    if (k <= 0) return
    const R = hairR(t)
    const last = [...T.poofs, T.gagPoof].filter(p => t > p).pop()
    const wob = last ? Math.exp(-(t - last) * 5) : 0
    const sq = 1 + 0.1 * jiggle(t, T.hair - 0.08) + 0.06 * (last ? jiggle(t, last, 24, 7) : 0)
    const rise = (1 - ease.outCubic(prog(t, T.hair - 0.08, T.hair + 0.32))) * 300
    x.save(); x.translate(HERO.x, GROUND + rise); x.scale(HERO.s * k / sq, HERO.s * k * sq)
    bigHair(x, R, wob, t)
    person(x, CYAN)
    x.restore()
    for (const [i, p] of [...T.poofs, T.gagPoof].entries()) {
      const hy = GROUND - HERO.s * (250 + 0.5 * hairR(p + 0.3))
      sparkle(x, HERO.x, hy, t, p, { n: 8 + i * 2, R: 120 + i * 60, seed: 11 + i, size: 26, cols: [HAIR, '#fff3e0', PINK, '#ffd98a'] })
    }
  }

  // ── the pickup: rolls in from the right, brakes, bounces on the beat; peels off left at the turn
  function drawTruck(t) {
    if (t < T.roll[0] || t > T.peel[1]) return
    const inP = ease.outCubic(prog(t, ...T.roll))
    const outP = ease.inQuad(prog(t, ...T.peel))
    const px = lerp(1500, TRUCK_AT.x, inP) - outP * 1500
    const brake = t > T.roll[1] ? Math.sin((t - T.roll[1]) * 16) * Math.exp(-(t - T.roll[1]) * 5) : 0
    // a hop on the drop and on the honk beat
    const hop = (t0) => t > t0 ? Math.abs(Math.sin((t - t0) * 9)) * Math.exp(-(t - t0) * 4.5) : 0
    const bounce = 14 * brake + 34 * hop(T.drop) + 26 * hop(T.honk) + 4 * Math.sin(t * 13) * (inP < 1 || outP > 0 ? 1 : 0.2)
    const spin = -(lerp(1500, TRUCK_AT.x, inP) - outP * 1500) / 66
    const tilt = -0.05 * brake + 0.06 * outP * (1 - outP) * 4
    x.save(); x.translate(px, GROUND); x.rotate(tilt); x.scale(TRUCK_AT.s, TRUCK_AT.s)
    truck(x, { bounce, spin })
    x.restore()
    // exhaust puffs (rear = right side) while moving
    const moving = (inP > 0 && inP < 1) || (outP > 0 && outP < 1)
    if (moving || (t > T.roll[1] && t < T.roll[1] + 0.4)) {
      x.save()
      for (let i = 0; i < 4; i++) {
        const ph = (t * 2.4 + i * 0.25) % 1
        x.globalAlpha = 0.5 * (1 - ph); x.fillStyle = '#d8d0ea'
        x.beginPath(); x.arc(px + TRUCK_AT.s * 300 + ph * 140, GROUND - 120 - ph * 60, 16 + ph * 30, 0, TAU); x.fill()
      }
      x.restore()
    }
    // honk: little sound lines at the front on the honk beat
    const hk = prog(t, T.honk, T.honk + 0.45)
    if (hk > 0 && hk < 1) {
      x.save(); x.globalAlpha = 1 - hk
      const fx = px - TRUCK_AT.s * 300, fy = GROUND - TRUCK_AT.s * 250
      for (const a of [-0.5, 0, 0.5]) {
        const d0 = 30 + 60 * hk
        x.beginPath(); x.moveTo(fx - Math.cos(a) * d0, fy + Math.sin(a) * d0); x.lineTo(fx - Math.cos(a) * (d0 + 50), fy + Math.sin(a) * (d0 + 50)); ink(x, GOLD, { w: 9, fa: 0, glow: 16 })
      }
      x.restore()
    }
    sparkle(x, TRUCK_AT.x, GROUND - 200, t, T.roll[1], { n: 10, R: 260, seed: 5, size: 28, cols: [GOLD, '#fff3e0', PINK, CYAN] })
  }

  // ── the two charts: slide in from both sides, spinning, and lock around the star
  function drawCharts(t) {
    if (t < T.slide[0] || t > T.chartsOut[1]) return
    const sp = ease.outCubic(prog(t, ...T.slide)), sb = easeOutBack(prog(t, T.slide[0] + 0.1, T.slide[1]), 1.3)
    const bump = t > T.lock ? 1 + 0.07 * Math.exp(-(t - T.lock) * 7) : 1
    const ok = popOut(t, T.chartsOut)
    const idle = t > T.lock ? (t - T.lock) * 0.18 : 0
    const ax = lerp(-480, C.x, sp), bx = lerp(1560, C.x, sb)
    const ra = -2 * TAU * (1 - sp) + idle, rb = 2.4 * TAU * (1 - clamp(sb)) - idle * 1.4
    x.save(); x.translate(ax, C.y); x.rotate(ra); x.scale(bump * ok, bump * ok)
    x.beginPath(); x.arc(0, 0, WA.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.72)'; x.fill()
    drawWheelH(x, { W: WA }); x.restore()
    x.save(); x.translate(bx, C.y); x.rotate(rb); x.scale(bump * ok, bump * ok)
    x.beginPath(); x.arc(0, 0, WB.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.8)'; x.fill()
    drawWheelH(x, { W: WB }); x.restore()
    // the lock: flash ring
    const fk = prog(t, T.lock, T.lock + 0.6)
    if (fk > 0 && fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(C.x, C.y, 300 + 260 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 14 * (1 - fk) + 2, fa: 0, glow: 34 }); x.restore() }
    // planets + Push / Pull / Align lines
    PAIRS.forEach((P, i) => {
      const A_ = ptC(P.a, R_A, C.x, C.y), B_ = ptC(P.b, R_B, C.x, C.y)
      const dk = pop01(t, T.lock + 0.12 + i * 0.08, 0.36, 2.2) * ok
      const lk = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.34))
      if (lk > 0) {
        const pulse = 1 + 0.3 * Math.exp(-Math.max(0, t - T.lines[i] - 0.34) * 4)
        x.save(); x.globalAlpha = ok; x.beginPath(); x.moveTo(A_.x, A_.y); x.lineTo(lerp(A_.x, B_.x, lk), lerp(A_.y, B_.y, lk)); ink(x, P.col, { w: 10 * pulse, fa: 0, glow: 30 }); x.restore()
        sparkle(x, B_.x, B_.y, t, T.lines[i] + 0.32, { n: 8, R: 110, seed: 40 + i, cols: [P.col, '#fff3e0', GOLD], size: 22 })
      }
      if (dk > 0) { orb(A_.x, A_.y, 22 * dk, GOLD, clamp(dk * 2)); orb(B_.x, B_.y, 22 * dk, SILVER, clamp(dk * 2)) }
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

  // ── the end: two pictograms (one with the big hair) beam up to the star
  function drawPair(t) {
    if (t < T.people[0] || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const hop = t > T.heart ? Math.abs(Math.sin((t - T.heart) * 9)) * Math.exp(-(t - T.heart) * 3.5) * 50 : 0
    const heads = []
    ;[[PL, CYAN, T.people[0], true], [PR, PINK, T.people[1], false]].forEach(([P, col, t0, hair], i) => {
      const k = pop01(t, t0, 0.4, 2.4) * ok
      if (k <= 0) return
      const rise = (1 - ease.outCubic(prog(t, t0, t0 + 0.4))) * 260
      const sq = t > t0 ? 1 + 0.1 * Math.sin((t - t0) * 20) * Math.exp(-(t - t0) * 6) : 1
      const s = 1.2
      x.save(); x.translate(P.x, P.y + rise - hop * (i ? 0.8 : 1)); x.scale(s * k / sq, s * k * sq)
      if (hair) bigHair(x, lerp(78, 100, easeOutBack(prog(t, T.heart, T.heart + 0.26), 2.6)), t > T.heart ? Math.exp(-(t - T.heart) * 5) : 0, t)
      person(x, col)
      x.restore()
      heads.push({ x: P.x, y: P.y + rise - hop - s * (hair ? 410 : 290) })
    })
    // beams from each person up to the star
    const bk = ease.inOutCubic(prog(t, ...T.beams))
    const P = starPose(t)
    if (bk > 0 && P && heads.length === 2) {
      heads.forEach((h, i) => {
        const tx = P.px + (i ? 1 : -1) * P.R * 0.35, ty = P.py + P.R * 0.35
        x.save(); x.globalAlpha = ok; x.setLineDash([2, 26]); x.lineCap = 'round'
        x.beginPath(); x.moveTo(h.x, h.y); x.lineTo(lerp(h.x, tx, bk), lerp(h.y, ty, bk)); ink(x, GOLD, { w: 12, fa: 0, glow: 22 }); x.setLineDash([])
        x.restore()
      })
      sparkle(x, P.px, P.py + P.R * 0.35, t, T.beams[1] - 0.05, { n: 12, R: 240, seed: 71, size: 28 })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) { drawRoad(t); drawCharts(t); drawStar(t); drawTruck(t); drawHero(t); drawPair(t) }
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

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: CTA })]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ['whoosh', 0.05, 0.4, 0.03], ['pop', T.dallas, 659.25, 0.05, 0],
  ['pop', T.hair, 554.37, 0.045, -0.3], ['pop', T.hair + 0.09, 659.25, 0.045, -0.2],
  ...T.poofs.map((p, i) => ['pop', p, [440, 554.37, 659.25][i], 0.06, -0.4]),
  ...T.poofs.map((p, i) => ['pluck', +(p + 0.02).toFixed(3), [220, 277.18, 329.63][i], 0.035, 0.3, -0.4]),
  ['whoosh', T.roll[0], 0.6, 0.045], ['pop', T.trucks, 659.25, 0.045, 0.2], ['pop', T.trucks + 0.09, 739.99, 0.045, 0.3],
  ['tick', T.roll[1] - 0.04, 0.06], ['pop', T.roll[1], 220, 0.06, 0.4],
  ['riser', T.trucks, T.drop, 0.035],
  ['pop', T.expAt, 739.99, 0.045, 0], ['boom', T.drop, 0.13], ['bell', T.drop, 880, 0.05, 1.6, 0], ['glitter', T.drop + 0.1, T.drop + 0.8],
  ['pop', T.gagPoof, 880, 0.065, -0.4], ['glitter', T.gagPoof, T.gagPoof + 0.4],
  ['pop', T.honk, 329.63, 0.06, 0.5], ['pop', T.honk + 0.12, 329.63, 0.05, 0.5],
  // meet someone who meets them
  ['whoosh', T.peel[0], 0.6, 0.05], ['pop', T.hairOut[0] + 0.1, 987.77, 0.04, -0.4],
  ...wordPops(T.h1, 3, 0.08, 0, 0.025), ['pop', T.h1Late, 880, 0.05, 0], ['pluck', T.h1Late + 0.12, 987.77, 0.05, 0.6, 0],
  ['whoosh', T.slide[0], 0.7, 0.045], ['riser', T.slide[0], T.lock, 0.04],
  ['boom', T.lock, 0.12], ['bell', T.lock, 440, 0.05, 2.0, 0], ['bell', T.lock + 0.06, 880, 0.035, 1.6, 0.2], ['glitter', T.lock, T.lock + 0.7],
  ['pop', T.lock + 0.12, 659.25, 0.04, -0.3], ['pop', T.lock + 0.2, 739.99, 0.04, 0], ['pop', T.lock + 0.28, 880, 0.04, 0.3],
  ...T.lines.map((l, i) => ['pluck', +(l + 0.3).toFixed(3), [659.25, 739.99, 880][i], 0.045, 0.7, (i - 1) * 0.4]),
  ...wordPops(T.sub, 5, 0.07, 2, 0.02),
  // big love, by the stars
  ['whoosh', T.chartsOut[0], 0.45, 0.035],
  ['pop', T.h3, 554.37, 0.05, 0], ['pop', T.h3 + 0.1, 659.25, 0.05, 0],
  ['pop', T.h3Late, 739.99, 0.045, 0], ['pop', T.h3Late + 0.1, 880, 0.045, 0], ['pop', T.h3Late + 0.22, 987.77, 0.055, 0], ['pluck', T.h3Late + 0.22, 880, 0.05, 0.7, 0],
  ['pop', T.people[0], 440, 0.05, -0.5], ['pop', T.people[1], 554.37, 0.05, 0.5],
  ['whoosh', T.beams[0], 0.45, 0.03], ['pluck', T.beams[1], 659.25, 0.04, 0.6, 0],
  ['bell', T.heart, 880, 0.05, 1.4, 0], ['bell', T.heart + 0.08, 1318.51, 0.035, 1.4, 0.2], ['glitter', T.heart, T.heart + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...endcardCues(STORY_END),
]
