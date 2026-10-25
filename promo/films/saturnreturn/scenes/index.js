// saturnreturn (45 s, vertical): "What's a Saturn return?"
// (0) hook: a big bouncy Saturn → (1) top-down Sun + Saturn's slow lap while Earth ("you") zips round: 29½ years
// → (2) the diagram shrinks into a dial above a 0–60 life timeline; Saturn marches, lands back on its birth star: DING
// → (3) ages 27–30 montage (boxes, briefcase, ring, plant, signpost) → (4) round two, DING at ~58
// → end: "Saturn's not mean. It's thorough." with a clipboard of ticks. One canvas, DOM type above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { W, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import {
  BONE, GOLD, PINK, SAT, FIRE, EARTHC, AIR, GREEN, INTER, MONO, D2R, rgba, pop01, outScale, outK, glowStroke, wob,
  makeBurst, drawBurst, wave, saturn, sun, earth, star, flag, boxes, briefcase, weddingRing, plant, signpost, clipboard, bigCheck,
} from './draw.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'

export const DURATION = 45
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556  // 108 bpm grid
const P = 29.45                     // Saturn's orbit in years (≈29½)

// ── timings
const T = {
  // hook
  satIn: 0.42, hop: [BEAT(3), BEAT(5)], h0Out: [3.95, 4.15],
  // (1) orbit
  fly: [4.05, 4.75], sun: BEAT(7), orbit: [4.6, 5.25], earth: BEAT(9), h1: 4.45, count1: 6.0, lap: [6.3, 11.0], h1Out: [11.55, 11.75],
  // (2) dial + timeline
  shrink: [11.65, 12.35], line: [11.95, 12.6], h2: 12.6, march1: [13.3, BEAT(31)], h2Out: [17.45, 17.65], h3: 17.9, h3Last: BEAT(32),
  bracket: 20.3, out2: 22.1,
  // (3) montage
  eye3: 22.55, h4: [22.7, 22.8, 25.0, 25.08, 28.2, BEAT(50)], icons: [BEAT(40), BEAT(41.5), BEAT(45), BEAT(46.5), BEAT(48)], glow: BEAT(50), out3: 30.95,
  // (4) round two
  back: [31.45, 32.0], h5: [31.9, 31.98, 37.42, BEAT(66.5)], march2: [32.9, BEAT(66)], out4: 39.4,
  // end
  satEnd: 39.75, h6: 39.95, clip: 40.45, checks: [40.85, 41.12, 41.39], h7: 41.45, h7Last: BEAT(74), fadeOut: [44.3, 45.0],
}
T.ding1 = T.march1[1]; T.ding2 = T.march2[1]

// ── geometry
const ORB = { cx: 540, cy: 1010, R: 330, rSat: 56, rSun: 62, rEarth: 22, Re: 128 }
const DIAL = { cx: 540, cy: 875, s: 0.78 }
const TL = { x0: 140, x1: 940, y: 1350 }
const ax = age => TL.x0 + (TL.x1 - TL.x0) * age / 60
const satAng = yrs => -Math.PI / 2 - 2 * Math.PI * yrs / P      // counter-clockwise from the top (the birth spot)

const yearsAt = t => P * ease.inOutCubic(prog(t, ...T.lap))
const ageAt = t => t < T.march2[0] ? P * ease.inOutQuad(prog(t, ...T.march1)) : P + P * ease.inOutQuad(prog(t, ...T.march2))
const speed = (f, t, d = 1 / 60) => (f(t + d) - f(t - d)) / (2 * d)

/** springy word-by-word type: `*word*` = accent, `|` = line break; per-word times via `times` */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, lastAt = null, times = null, wobble = false, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.04, color, textShadow: SHADOW, letterSpacing: '-0.015em' }, parent)
  let n = 0
  const toks = text.split(' '), ws = []
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.1) + 'px', color: accentColor, letterSpacing: '0' })
    const isLast = i === toks.length - 1
    const tt = times ? times[n] : isLast && lastAt != null ? lastAt : t0 + n * gap
    ws.push({ t: tt, big: isLast && (lastAt != null || wobble), e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
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

async function build(stage) {
  try {
    await Promise.all(['800 108px Inter', '700 62px Inter', "italic 500 118px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = txt => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, txt)
  const E3 = eyebrow('AROUND AGES 27–30')
  const H0 = popText(root, "What's a | *Saturn* *return?*", { top: 200, size: 124, accentSize: 150, at: 0.3, gap: 0.09, lastAt: BEAT(1), wobble: true })
  const H1 = popText(root, 'Saturn takes about | *29½ years* | to circle the Sun.', { top: 205, size: 92, accentSize: 112, at: T.h1, gap: 0.07 })
  const H2 = popText(root, 'When it gets back to | where it was when | you were born…', { top: 210, size: 86, at: T.h2, gap: 0.065 })
  const H3 = popText(root, "…that's your | *Saturn* *return.*", { top: 205, size: 116, accentSize: 150, at: T.h3, gap: 0.08, lastAt: T.h3Last, wobble: true })
  const H4 = popText(root, 'Big decisions. | Growing up. | *Glow* *up.*', { top: 215, size: 104, accentSize: 128, times: T.h4, wobble: true, accentColor: PINK })
  const H5 = popText(root, 'Round two: | *around* *58.*', { top: 215, size: 120, accentSize: 150, times: T.h5, wobble: true })
  const H6 = popText(root, "Saturn's | not mean.", { top: 210, size: 136, at: T.h6, gap: 0.1 })
  const H7 = popText(root, "It's *thorough.*", { top: 1500, size: 128, accentSize: 168, at: T.h7, lastAt: T.h7Last, wobble: true })
  const TYPES = [
    [H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, [T.out2 - 0.1, T.out2 + 0.1]], [H4, [T.out3 - 0.15, T.out3 + 0.05]],
    [H5, [T.out4 - 0.1, T.out4 + 0.1]], [H6, [99, 100]], [H7, [99, 100]],
  ]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B = (k, n = 8, d = 90) => makeBurst(300 + k, n, d)
  const B_IN = B(0, 12, 260), B_HOP = [B(1, 8, 200), B(2, 8, 200)], B_SUN = B(3, 10, 120), B_EARTH = B(4), B_LAP = B(5, 12, 150)
  const B_D1 = B(6, 14, 170), B_D2 = B(7, 14, 170), B_F1 = B(8, 8, 90), B_F2 = B(9, 8, 90), B_ICON = [10, 11, 12, 13, 14].map(i => B(i, 9, 150))
  const B_GLOW = [15, 16, 17, 18, 19].map(i => B(i, 8, 130)), B_END = B(20, 12, 300), B_CHK = B(21, 14, 190)

  // ── the hook Saturn (also flies into orbit position)
  const HERO = { x: 540, y: 1140, r: 215 }
  function heroSaturn(t) {
    if (t < T.satIn || t > T.fly[1]) return
    const pIn = prog(t, T.satIn, T.satIn + 0.6)
    const drop = easeOutBack(pIn, 1.6)
    let cy = lerp(2350, HERO.y, drop), r = HERO.r, cx = HERO.x
    // landing squash + hops on the beat
    let sx = 1, sy = 1
    const land = t - (T.satIn + 0.45)
    if (land > 0) { const q = Math.sin(land * 15) * Math.exp(-land * 5) * 0.14; sx = 1 + q; sy = 1 - q }
    for (const h of T.hop) {
      const p = prog(t, h, h + 0.5)
      if (p > 0 && p < 1) cy -= 110 * Math.sin(Math.PI * p)
      const l = t - (h + 0.5)
      if (l > 0) { const q = Math.sin(l * 16) * Math.exp(-l * 6) * 0.1; sx *= 1 + q; sy *= 1 - q }
    }
    cy += 10 * Math.sin(t * 2.4)
    // fly into orbit
    const f = ease.inOutCubic(prog(t, ...T.fly))
    if (f > 0) {
      cx = lerp(HERO.x, ORB.cx, f); cy = lerp(cy, ORB.cy - ORB.R, f) - 120 * Math.sin(Math.PI * f); r = lerp(HERO.r, ORB.rSat, f)
    }
    const tilt = -0.36 + 0.07 * Math.sin(t * 1.9)
    saturn(x, cx, cy, r, { t, sx, sy, tilt })
    drawBurst(x, B_IN, HERO.x, HERO.y, t, T.satIn + 0.4, GOLD, 0.8)
    T.hop.forEach((h, i) => drawBurst(x, B_HOP[i], HERO.x, HERO.y + 120, t, h + 0.48, RING_SPARK, 0.6))
    // little gold "?"s bobbing round it
    const qs = [[175, 700, -14, BEAT(2)], [900, 640, 12, BEAT(2) + 0.15], [880, 1420, -8, BEAT(4)]]
    qs.forEach(([qx, qy, r0, t0], i) => {
      if (t < t0) return
      const k = pop01(t, t0, 0.4) * outScale(t, T.fly[0] - 0.1 + i * 0.04)
      if (k <= 0) return
      x.save(); x.translate(qx, qy + 16 * Math.sin(t * 2 + i * 2)); x.rotate((r0 + 10 * Math.sin(t * 1.5 + i)) * D2R); x.scale(k, k)
      x.font = `800 ${i === 2 ? 110 : 130}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 30; x.fillStyle = GOLD; x.fillText('?', 0, 0); x.restore()
    })
  }
  const RING_SPARK = '#fff1d0'

  // ── diagram frame (orbit → dial)
  const frame = t => {
    const back = t >= T.back[0]
    const f = back ? 1 : ease.inOutCubic(prog(t, ...T.shrink))
    return { cx: lerp(ORB.cx, DIAL.cx, f), cy: lerp(ORB.cy, DIAL.cy, f), s: lerp(1, DIAL.s, f) }
  }
  // overall visibility of the diagram: in at 4.5, out at out2, back for round two, out at out4
  const diagK = t => t < T.out2 + 0.5 ? 1 - ease.inQuad(prog(t, T.out2, T.out2 + 0.35)) : t < T.back[0] ? 0 : easeOutBack(prog(t, ...T.back), 1.5) * (1 - ease.inQuad(prog(t, T.out4, T.out4 + 0.35)))
  function diagram(t) {
    if (t < T.sun - 0.05 || (t > T.out2 + 0.4 && t < T.back[0]) || t > T.out4 + 0.4) return
    const D = frame(t), k = clamp(diagK(t)), sc = Math.max(0.001, diagK(t))
    if (k <= 0) return
    const cx = D.cx, cy = D.cy, s = D.s * sc
    const R = ORB.R * s
    const inBeat1 = t < T.shrink[1]
    const yrs = inBeat1 ? yearsAt(t) : ageAt(t)
    // Saturn's orbit (dashed, draws in)
    const ok = ease.inOutCubic(prog(t, ...T.orbit))
    if (ok > 0) {
      x.save(); glowStroke(x, BONE, 4, 10); x.globalAlpha = 0.5 * k; x.setLineDash([16 * s, 18 * s])
      x.beginPath(); x.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 - Math.PI * 2 * ok, true); x.stroke(); x.restore()
    }
    // the birth star at the top
    const dingK = Math.max(Math.exp(-Math.max(0, t - T.ding1) * 3) * (t > T.ding1 ? 1 : 0), Math.exp(-Math.max(0, t - T.ding2) * 3) * (t > T.ding2 ? 1 : 0))
    const sk = pop01(t, T.orbit[1] - 0.1, 0.4)
    if (sk > 0) {
      const sp = { x: cx, y: cy - R }
      star(x, sp.x, sp.y - 2, 30 * s * sk * (1 + 0.5 * dingK), GOLD, k, 0.25 * Math.sin(t * 1.3), 0.35 + 0.5 * dingK)
      // "BORN" tag in the dial phase
      const bk = (inBeat1 ? 0 : 1) * pop01(t, T.line[1], 0.35)
      const dA = Math.abs(((yrs / P) % 1 + 1) % 1 - 0.5) * 2   // 1 at the star, 0 opposite
      const near = clamp((1 - dA) / 0.12)
      if (bk > 0) {
        x.save(); x.globalAlpha = k * clamp(bk) * near; x.font = `700 30px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.textBaseline = 'middle'
        x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 10; x.fillText('YOU WERE BORN', sp.x + 52, sp.y - 4); x.restore()
      }
      wave(x, sp.x, sp.y, t, T.ding1, GOLD, 240, 0.8); wave(x, sp.x, sp.y, t, T.ding1 + 0.12, BONE, 170, 0.7, 5)
      wave(x, sp.x, sp.y, t, T.ding2, GOLD, 240, 0.8); wave(x, sp.x, sp.y, t, T.ding2 + 0.12, BONE, 170, 0.7, 5)
      drawBurst(x, B_D1, sp.x, sp.y, t, T.ding1, GOLD, 0.9); drawBurst(x, B_D2, sp.x, sp.y, t, T.ding2, GOLD, 0.9)
      drawBurst(x, B_LAP, sp.x, sp.y, t, T.lap[1], GOLD, 0.8)
    }
    // Earth ("you"): an inner orbit, only in beat 1
    const ek = inBeat1 ? pop01(t, T.earth, 0.4) * (1 - ease.inQuad(prog(t, T.h1Out[0], T.shrink[0] + 0.3))) : 0
    if (ek > 0 && t >= T.earth) {
      const Re = ORB.Re * s, ph = Math.PI / 2 - 0.6
      const ang = ph - 2 * Math.PI * yrs
      const v = Math.abs(speed(yearsAt, t))                      // laps per second
      const blur = clamp((v - 1.2) / 3.5)
      // faint path + motion trail
      x.save(); glowStroke(x, '#8fc4ff', 3, 8); x.globalAlpha = 0.28 * ek; x.setLineDash([8, 12])
      x.beginPath(); x.arc(cx, cy, Re, 0, Math.PI * 2); x.stroke(); x.restore()
      const trail = Math.min(Math.PI * 2, v * 2 * Math.PI * 0.09)
      if (trail > 0.05) {
        x.save(); glowStroke(x, EARTH_TRAIL, 10, 18)
        const N = 14
        for (let i = 0; i < N; i++) {
          x.globalAlpha = ek * (blur > 0.98 ? 0.55 : (1 - i / N) * 0.7)
          x.beginPath(); x.arc(cx, cy, Re, ang + trail * i / N, ang + trail * (i + 1) / N); x.stroke()
        }
        x.restore()
      }
      const ep = { x: cx + Math.cos(ang) * Re, y: cy + Math.sin(ang) * Re }
      earth(x, ep.x, ep.y, ORB.rEarth * s * ek, clamp(ek * 2) * (1 - 0.8 * blur), yrs * 6)
      drawBurst(x, B_EARTH, ep.x, ep.y, t, T.earth, '#8fc4ff', 0.6)
      // "YOU" tag follows Earth while it's slow
      const lk = clamp(ek * 2) * (1 - clamp((v - 0.25) / 0.6))
      if (lk > 0) {
        x.save(); x.globalAlpha = lk; x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12; x.fillText('YOU', cx + Math.cos(ang) * (Re + 62), cy + Math.sin(ang) * (Re + 62)); x.restore()
      }
    }
    // the Sun
    const sunK = pop01(t, T.sun, 0.45)
    sun(x, cx, cy, ORB.rSun * s * sunK * (1 + 0.03 * Math.sin(t * 4)), t, clamp(sunK * 2) * k)
    drawBurst(x, B_SUN, cx, cy, t, T.sun, GOLD, 0.7)
    // Saturn on its orbit
    if (t >= T.fly[1]) {
      const a = satAng(yrs), sp = { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R }
      const bump = dingK * Math.sin((t - (t > T.ding2 ? T.ding2 : T.ding1)) * 18) * 0.25
      const lapBump = t > T.lap[1] ? Math.exp(-(t - T.lap[1]) * 4) * Math.sin((t - T.lap[1]) * 18) * 0.25 : 0
      saturn(x, sp.x, sp.y, ORB.rSat * s * (1 + bump + lapBump), { t, a: k, tilt: -0.36 + 0.07 * Math.sin(t * 1.9) })
    }
  }
  const EARTH_TRAIL = '#7fb8ff'

  // ── the bottom counter: "29½ YEARS" (beat 1) / "AGE 29" (beat 2 & 4)
  function counter(t) {
    let k = 0, label = '', val = '', unit = ''
    if (t >= T.count1 && t < T.shrink[1]) {
      k = pop01(t, T.count1, 0.4) * outScale(t, T.h1Out[0], 0.3)
      const y = yearsAt(t)
      val = y >= P - 0.02 ? '29½' : String(Math.floor(y)); unit = 'YEARS'; label = 'EARTH LAPS'
    } else if (t >= T.line[0] + 0.3 && t < T.out2 + 0.4) {
      k = pop01(t, T.line[0] + 0.3, 0.4) * outScale(t, T.out2, 0.3)
      val = String(Math.floor(ageAt(t) + 1e-6)); label = 'YOUR AGE'
    } else if (t >= T.back[0] && t < T.out4 + 0.4) {
      k = pop01(t, T.back[0] + 0.2, 0.4) * outScale(t, T.out4, 0.3)
      val = String(Math.floor(ageAt(t) + 1e-6)); label = 'YOUR AGE'
    }
    if (k <= 0) return
    const d = [T.lap[1], T.ding1, T.ding2].reduce((m, td) => Math.max(m, t > td ? Math.exp(-(t - td) * 5) * Math.sin((t - td) * 20) : 0), 0)
    x.save(); x.translate(540, 1660); x.scale(k * (1 + 0.12 * d), k * (1 + 0.12 * d)); x.textAlign = 'center'; x.textBaseline = 'middle'
    x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 16
    x.font = `700 34px ${MONO}`; x.fillStyle = GOLD; x.letterSpacing = '8px'; x.fillText(label, 0, -118); x.letterSpacing = '0px'
    x.font = `800 170px ${INTER}`; x.fillStyle = BONE
    const vw = x.measureText(val).width
    x.font = `800 64px ${INTER}`; const uw = unit ? x.measureText(unit).width + 24 : 0
    x.font = `800 170px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'
    x.fillText(val, -(vw + uw) / 2, 4)
    if (unit) { x.font = `800 64px ${INTER}`; x.fillStyle = GOLD; x.fillText(unit, -(vw + uw) / 2 + vw + 24, 36) }
    x.restore()
  }

  // ── the life timeline 0–60 with Saturn marching along it
  function timeline(t) {
    const vis = (t >= T.line[0] && t < T.out2 + 0.5) || (t >= T.back[0] && t < T.out4 + 0.5)
    if (!vis) return
    const outA = t < T.back[0] ? T.out2 : T.out4
    const draw = t < T.back[0] ? ease.inOutCubic(prog(t, ...T.line)) : ease.outCubic(prog(t, T.back[0], T.back[0] + 0.4))
    const k = 1 - ease.inQuad(prog(t, outA, outA + 0.35))
    if (k <= 0) return
    const yOff = 60 * ease.inQuad(prog(t, outA, outA + 0.35))
    const y = TL.y + yOff
    const age = ageAt(t)
    x.save(); x.globalAlpha = k
    // base line
    glowStroke(x, BONE, 6, 10); x.globalAlpha = 0.6 * k
    x.beginPath(); x.moveTo(TL.x0, y); x.lineTo(lerp(TL.x0, TL.x1, draw), y); x.stroke()
    // progress (gold)
    x.globalAlpha = k; glowStroke(x, GOLD, 10, 18)
    if (age > 0.05) { x.beginPath(); x.moveTo(TL.x0, y); x.lineTo(ax(age), y); x.stroke() }
    // decade ticks + labels
    x.textAlign = 'center'; x.textBaseline = 'middle'
    for (let d = 0; d <= 6; d++) {
      const tk = t < T.back[0] ? pop01(t, T.line[0] + 0.08 * d + 0.1, 0.3) : 1
      if (tk <= 0) continue
      const px = ax(d * 10)
      glowStroke(x, age >= d * 10 - 0.01 ? GOLD : BONE, 5, 8); x.globalAlpha = k * clamp(tk)
      x.beginPath(); x.moveTo(px, y - 16 * tk); x.lineTo(px, y + 16 * tk); x.stroke()
      x.shadowBlur = 8; x.shadowColor = 'rgba(6,4,18,0.9)'; x.fillStyle = BONE; x.font = `700 32px ${MONO}`
      x.fillText(String(d * 10), px, y + 52)
    }
    // the 27–30 bracket
    const bk = t < T.back[0] ? easeOutBack(prog(t, T.bracket, T.bracket + 0.45), 1.8) : 0
    if (bk > 0) {
      const a0 = ax(27), a1 = ax(30)
      x.save(); x.globalAlpha = k * clamp(bk)
      x.fillStyle = rgba(PINK, 0.3); x.beginPath(); x.roundRect(a0 - 8, y - 34 * bk, a1 - a0 + 16, 68 * bk, 12); x.fill()
      glowStroke(x, PINK, 5, 16); x.stroke()
      x.shadowBlur = 10; x.shadowColor = 'rgba(6,4,18,0.95)'; x.fillStyle = PINK; x.font = `800 40px ${INTER}`
      x.fillText('27–30', (a0 + a1) / 2, y + 100); x.restore()
    }
    x.restore()
    // flags at the returns
    const f1 = t >= T.ding1 ? easeOutBack(prog(t, T.ding1 + 0.05, T.ding1 + 0.45), 2) : 0
    const f2 = t >= T.ding2 ? easeOutBack(prog(t, T.ding2 + 0.05, T.ding2 + 0.45), 2) : 0
    x.save(); x.globalAlpha = k
    flag(x, ax(P), y - 2, f1 * 1.3, GOLD, '~29'); flag(x, ax(2 * P), y - 2, f2 * 1.3, GOLD, '~58')
    x.restore()
    drawBurst(x, B_F1, ax(P), y - 130, t, T.ding1 + 0.1, GOLD, 0.6); drawBurst(x, B_F2, ax(2 * P), y - 130, t, T.ding2 + 0.1, GOLD, 0.6)
    // Saturn marching (a hop every ~2.5 years while moving, squash on landing)
    const mk = t < T.back[0] ? pop01(t, T.line[1] - 0.1, 0.4) : 1
    if (mk > 0) {
      const moving = clamp(Math.abs(speed(ageAt, t)) / 2)
      const ph = age / 2.45
      const hop = Math.abs(Math.sin(Math.PI * ph)) * 46 * moving
      const sq = 1 - 0.14 * moving * Math.max(0, 1 - Math.abs(Math.sin(Math.PI * ph)) * 4)
      const dk = [T.ding1, T.ding2].reduce((m, td) => Math.max(m, t > td ? Math.exp(-(t - td) * 4) : 0), 0)
      const jump = [T.ding1, T.ding2].reduce((m, td) => Math.max(m, Math.sin(Math.PI * prog(t, td, td + 0.45)) * 80), 0)
      saturn(x, ax(age), y - 52 - hop - jump, 30 * mk, { t, a: k * clamp(mk * 2), sx: 2 - sq, sy: sq, tilt: -0.3 + 0.12 * Math.sin(ph * Math.PI) * moving, glow: dk })
    }
  }

  // ── montage: ages 27–30
  const ICONS = [
    { x: 270, y: 760, label: 'MOVE', col: EARTHC },
    { x: 810, y: 760, label: 'NEW JOB', col: FIRE },
    { x: 540, y: 1100, label: 'COMMIT', col: AIR },
    { x: 270, y: 1430, label: 'GROW', col: GREEN },
    { x: 810, y: 1430, label: 'NEW PATH', col: GREEN },
  ]
  function montage(t) {
    if (t < T.icons[0] - 0.05 || t > T.out3 + 0.6) return
    ICONS.forEach((ic, i) => {
      const t0 = T.icons[i]
      if (t < t0) return
      const k = easeOutBack(prog(t, t0, t0 + 0.45), 2.2) * outScale(t, T.out3 + i * 0.05)
      if (k <= 0) return
      const tt = t - t0
      const land = tt > 0.3 ? Math.sin((tt - 0.3) * 16) * Math.exp(-(tt - 0.3) * 6) * 0.12 : 0
      const glowPulse = t > T.glow ? Math.sin(Math.PI * prog(t, T.glow + i * 0.06, T.glow + i * 0.06 + 0.4)) : 0
      const s = 1.3 * k * (1 + 0.14 * glowPulse)
      const o = { a: clamp(k * 2), rot: wob(t, t0, 0.18, 12, 3.5) + 0.03 * Math.sin(t * 1.8 + i), sx: 1 + land, sy: 1 - land }
      const bob = 8 * Math.sin(t * 2.2 + i * 1.3)
      // soft glow disc behind
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(ic.x, ic.y + bob, 10, ic.x, ic.y + bob, 240 * k)
      g.addColorStop(0, rgba(ic.col, 0.16 + 0.25 * glowPulse)); g.addColorStop(1, rgba(ic.col, 0))
      x.fillStyle = g; x.beginPath(); x.arc(ic.x, ic.y + bob, 240 * k, 0, Math.PI * 2); x.fill(); x.restore()
      x.save(); x.translate(0, bob)
      if (i === 0) boxes(x, ic.x, ic.y, s, o)
      if (i === 1) briefcase(x, ic.x, ic.y + 10, s, o)
      if (i === 2) weddingRing(x, ic.x, ic.y - 10, s, t, o)
      if (i === 3) plant(x, ic.x, ic.y - 30, s, t, { a: o.a, rot: o.rot * 0.5, grow: ease.outCubic(prog(t, t0 + 0.1, t0 + 0.9)), bloom: easeOutBack(prog(t, T.glow + 0.1, T.glow + 0.55), 2) })
      if (i === 4) signpost(x, ic.x, ic.y - 20, s, t, { a: o.a, swing: wob(t, t0 + 0.2, 0.3, 10, 3) + 0.04 * Math.sin(t * 2) })
      // label
      x.globalAlpha = clamp(k * 2); x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.letterSpacing = '3px'; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12; x.fillStyle = ic.col
      x.fillText(ic.label, ic.x, ic.y + 205 * Math.min(1, k)); x.letterSpacing = '0px'
      x.restore()
      drawBurst(x, B_ICON[i], ic.x, ic.y + bob, t, t0 + 0.12, ic.col, 0.7)
      drawBurst(x, B_GLOW[i], ic.x, ic.y + bob, t, T.glow + i * 0.06, GOLD, 0.8)
    })
  }

  // ── end: big Saturn + clipboard
  function ending(t) {
    if (t < T.satEnd) return
    const p = prog(t, T.satEnd, T.satEnd + 0.6)
    const cx = 395, cy = lerp(-420, 1010, easeOutBack(p, 1.5)) + 10 * Math.sin(t * 2.3)
    const land = t - (T.satEnd + 0.45)
    let sx = 1, sy = 1
    if (land > 0) { const q = Math.sin(land * 15) * Math.exp(-land * 5) * 0.12; sx = 1 + q; sy = 1 - q }
    // "not mean" head-shake rock, then a happy bounce on "thorough"
    const shake = wob(t, T.h6 + 0.3, 0.12, 16, 3)
    const th = t - T.h7Last
    const hop = th > 0 ? Math.max(0, Math.sin(Math.PI * clamp(th / 0.45))) * 70 : 0
    saturn(x, cx, cy - hop, 178, { t, sx, sy, rot: shake, tilt: -0.36 + 0.06 * Math.sin(t * 1.9), glow: th > 0 ? Math.exp(-th * 2) : 0 })
    drawBurst(x, B_END, cx, 1010, t, T.h7Last, GOLD, 1.0)
    // clipboard
    const ck = easeOutBack(prog(t, T.clip, T.clip + 0.45), 2)
    const checks = T.checks.map(c => ease.outCubic(prog(t, c, c + 0.22)))
    const crot = (8 + wob(t, T.clip, 10, 12, 3.5)) * D2R
    clipboard(x, 860, 1150 + 6 * Math.sin(t * 2), 1.0 * ck, checks, { a: clamp(ck * 2), rot: crot })
    T.checks.forEach((c, i) => drawBurst(x, B_ICON[i], 860 - 56, 1150 - 62 + i * 76, t, c + 0.15, GREEN, 0.5))
    // the stamp on "thorough"
    const sk = easeOutBack(prog(t, T.h7Last, T.h7Last + 0.4), 2.6)
    bigCheck(x, 905, 905, sk * 0.95, ease.outCubic(prog(t, T.h7Last + 0.1, T.h7Last + 0.45)), clamp(sk * 2))
    drawBurst(x, B_CHK, 905, 905, t, T.h7Last + 0.15, GREEN, 0.8)
    wave(x, 905, 905, t, T.h7Last + 0.1, GREEN, 200, 0.7)
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3.4))
      drawSky(x, t, t < 3.4 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      heroSaturn(t); diagram(t); timeline(t); counter(t); montage(t); ending(t)
      const ep = ease.outCubic(prog(t, T.eye3, T.eye3 + 0.35))
      E3.style.opacity = String(ep * outK(t, [T.out3 - 0.15, T.out3 + 0.05])); E3.style.transform = `translateY(${((1 - ep) * 16).toFixed(2)}px)`
      for (const [h, o] of TYPES) h.update(t, outK(t, o))
      drawGrain(gx, t)
      black.style.opacity = String(t >= T.fadeOut[1] - 0.035 ? 1 : t < 1 ? 1 - ease.inOutQuad(prog(t, 0, 0.4)) : ease.inOutQuad(prog(t, ...T.fadeOut)))
    },
  }
}

// card-motif cuts at each beat change, after the old headline is out and just before the next one pops:
// hook → orbit 4.25 (h0 out 4.15, Saturn mid-flight, h1 4.45) · orbit → dial 11.9 (h1 out 11.75, diagram mid-shrink, h2 12.6) ·
// dial → montage 22.45 (out2 22.1, h4 22.7) · montage → round two 31.6 (out3 30.95, h5 31.9) · → end 39.8 (out4 39.4, h6 39.95).
// None lands on the DINGs (17.82 / ~37) or the montage icons.
const CUTS = [
  { t: 4.25, kind: 'flip' }, { t: 11.9, kind: 'deal' }, { t: 22.45, kind: 'fan' }, { t: 31.6, kind: 'shuffle' }, { t: 39.8, kind: 'flip', dir: -1 },
]
export const SCENES = [build, cardFrame({ start: 0, end: DURATION, fadeOut: 0.7 }), cardCuts(CUTS)]

// ── sound cues
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const pops = (t0, n, gap, base = 0, gain = 0.035) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const at = arr => arr.map((t, i) => ['pop', +t.toFixed(3), NOTE[(i * 2) % NOTE.length], 0.035, (i % 2 ? 0.15 : -0.15)])
// a tick each time the counters roll over a year
const yearTicks = (f, a, b, n0, n1, gain) => {
  const out = []
  for (let n = n0; n <= n1; n++) { let lo = a, hi = b; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (f(m) < n) lo = m; else hi = m } out.push(['tick', +hi.toFixed(3), gain]) }
  return out
}
const FILM_CUES = [
  // hook
  ...pops(0.3, 3, 0.09, 0, 0.04), ['pop', BEAT(1), 1318.51, 0.06, 0], ['pluck', BEAT(1), 659.25, 0.05, 0.6, 0],
  ['whoosh', T.satIn - 0.1, 0.4, 0.04], ['boom', T.satIn + 0.42, 0.06], ['glitter', T.satIn + 0.4, T.satIn + 1.1],
  ['pop', BEAT(2), 880, 0.04, -0.4], ['pop', BEAT(2) + 0.15, 987.77, 0.04, 0.4], ['pop', BEAT(4), 1174.66, 0.04, 0.3],
  ...T.hop.map(h => ['pop', +(h + 0.48).toFixed(3), 587.33, 0.05, 0]), ...T.hop.map(h => ['whoosh', +(h - 0.05).toFixed(3), 0.3, 0.02]),
  // (1)
  ['whoosh', T.fly[0], 0.6, 0.04], ['pop', T.sun, 587.33, 0.06, 0], ['glitter', T.sun, T.sun + 0.4],
  ...pops(T.h1, 9, 0.07, 1, 0.025), ['whoosh', T.orbit[0], 0.6, 0.025],
  ['pop', T.earth, 1174.66, 0.05, 0.3], ['pop', T.count1, 880, 0.04, 0],
  ...yearTicks(yearsAt, T.lap[0], T.lap[1], 1, 29, 0.022),
  ['riser', T.lap[0] + 1.5, T.lap[1], 0.02],
  ['bell', T.lap[1], 1174.66, 0.035, 1.4, 0], ['pop', T.lap[1], 1318.51, 0.05, 0], ['glitter', T.lap[1], T.lap[1] + 0.5],
  // (2)
  ['whoosh', T.shrink[0], 0.6, 0.035], ...Array.from({ length: 7 }, (_, d) => ['pop', +(T.line[0] + 0.1 + 0.08 * d).toFixed(3), NOTE[d], 0.025, (d - 3) * 0.12]),
  ...pops(T.h2, 11, 0.065, 2, 0.02),
  ...yearTicks(t => ageAt(t), T.march1[0], T.march1[1], 1, 29, 0.022),
  ['riser', T.march1[0] + 1.6, T.ding1, 0.025],
  ['bell', T.ding1, 1567.98, 0.06, 2.2, 0], ['bell', T.ding1 + 0.01, 783.99, 0.04, 2.2, 0], ['pluck', T.ding1, 587.33, 0.05, 0.9, 0], ['boom', T.ding1, 0.07], ['glitter', T.ding1, T.ding1 + 0.9],
  ...pops(T.h3, 3, 0.08, 3, 0.035), ['pop', T.h3Last, 1318.51, 0.06, 0], ['pluck', T.h3Last, 880, 0.05, 0.7, 0],
  ['pop', T.bracket, 1174.66, 0.045, 0.2], ['whoosh', T.out2, 0.45, 0.035],
  // (3)
  ['pop', T.eye3, 987.77, 0.03, 0], ...at(T.h4),
  ...T.icons.map((t, i) => ['pop', +(t + 0.1).toFixed(3), [659.25, 880, 1174.66, 987.77, 1318.51][i], 0.06, [-0.35, 0.35, 0, -0.35, 0.35][i]]),
  ...T.icons.map(t => ['whoosh', +(t - 0.08).toFixed(3), 0.25, 0.018]),
  ['bell', T.glow, 1318.51, 0.04, 1.6, 0], ['glitter', T.glow, T.glow + 1.0], ['pluck', T.glow, 587.33, 0.05, 0.8, 0],
  ['whoosh', T.out3, 0.45, 0.035],
  // (4)
  ['whoosh', T.back[0], 0.45, 0.035], ...at(T.h5),
  ...yearTicks(t => ageAt(t), T.march2[0], T.march2[1], 30, 58, 0.022),
  ['riser', T.march2[0] + 1.6, T.ding2, 0.025],
  ['bell', T.ding2, 1567.98, 0.06, 2.2, 0], ['bell', T.ding2 + 0.01, 783.99, 0.04, 2.2, 0], ['pluck', T.ding2, 587.33, 0.05, 0.9, 0], ['glitter', T.ding2, T.ding2 + 0.9],
  ['whoosh', T.out4, 0.45, 0.035],
  // end
  ['whoosh', T.satEnd - 0.1, 0.4, 0.04], ['pop', T.satEnd + 0.45, 587.33, 0.06, -0.2],
  ...pops(T.h6, 3, 0.1, 1, 0.04), ['pop', T.clip, 880, 0.045, 0.4],
  ...T.checks.map((c, i) => ['pop', +(c + 0.1).toFixed(3), [987.77, 1174.66, 1318.51][i], 0.05, 0.4]),
  ['pop', T.h7, 739.99, 0.04, 0], ['pop', T.h7Last, 1318.51, 0.07, 0], ['bell', T.h7Last + 0.02, 1318.51, 0.035, 1.8, 0],
  ['boom', T.h7Last, 0.08], ['glitter', T.h7Last, T.h7Last + 1.2],
  ['bell', T.fadeOut[0] + 0.05, 293.66, 0.03, 2.4, 0],
]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS)]
