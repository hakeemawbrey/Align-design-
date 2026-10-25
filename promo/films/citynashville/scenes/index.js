// citynashville (15 s vertical Align ad) · story 0–10.6, then the shared end card ("come" + the Align logo + JOIN THE WAITLIST).
//   0.00–2.48  HOOK  "Every bar | has a *band.*"  A generic bar row rises with festoon lights; a neon guitar sign and a neon
//              "live MUSIC" sign stutter on; a cowboy-hatted pictogram strums on every beat and little notes fly.
//   2.50–4.45  "Every song's | about *heartbreak.*"  A heart-headed music note pops over the guitarist, cracks on the beat
//              and splits in two; the neon signs flicker sadly.
//   4.50–8.25  "Write a | *different* song."  The bar row drops away, five staff lines draw across the sky, two charts pop on
//              the staff and each heart half flies into one. The Push / Pull / Align reading draws its three coloured lines
//              over the charts like staff lines, notes riding them: "Push. Pull. *Align.*"
//   8.25–10.5  "Your love song | *starts here.*"  The charts slide together and nest; the two halves snap back into one heart
//              note and its stem regrows; two pictograms (one in a cowboy hat) lean in, notes float up. All out by 10.45.
//   10.5→      plain sky only (SKY_H + grain); the end card takes over at 10.6.
// One canvas (sky + illustration), DOM type above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, READING, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { BONE, GOLD, PINK, HOT, CYAN, SILVER, TAN, VIOLET, INTER, rgba, ink, sparkle, flick, facades, festoon, guitar, neonGuitar, neonLive, cowboyHat, person, heartNote, note } from './props.js'

export const DURATION = 15
export const CTA = 'JOIN THE WAITLIST'
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2
const BEAT = n => 0.6 + n * 0.5556

// ── the timeline
const T = {
  hook: 0.08, hookLand: BEAT(0) + 0.05, rise: [0, 0.55], fest: 0.25, guy: 0.3, signs: [BEAT(0.5), BEAT(1.5)], strums: [1, 2, 3, 4, 5].map(BEAT), hookOut: [2.28, 2.48],
  h1: 2.5, h1Land: BEAT(4), noteIn: 2.42, crack: BEAT(5), split: BEAT(5.5), stutter: [BEAT(5), BEAT(6.4)], h1Out: [4.25, 4.45], drop: [4.15, 4.65],
  h2: 4.5, h2Land: BEAT(7.5), staff: [4.55, 5.05], fly: [4.5, 5.15], cA: BEAT(8) - 0.25, cB: BEAT(8.5) - 0.25, dots: BEAT(9.5), lines: [BEAT(10), BEAT(11), BEAT(12)], h2Out: [8.05, 8.25],
  h3: 8.28, h3Land: BEAT(14.5), move: [8.15, 8.75], join: BEAT(15), people: [BEAT(9) - 0.1, BEAT(9) + 0.05], h3Out: [10.25, 10.48], out: [10.05, 10.45],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt.
 *  `times` gives every word its own pop time; `colors` colours words by index. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0 = 0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, times = null, colors = {} }) {
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
    const big = times ? acc : late > 0 && n >= nW - late
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
const GUY = { x: 540, y: 1800, s: 1.42 }
const HN = { x: 540, y: 1110, s: 100 }                    // the heart note over the guitarist
const SIGN_G = { x: 188, y: 1175, s: 0.6, rot: -0.22 }, SIGN_L = { x: 893, y: 1185, s: 0.84 }
const STAFF_Y = 1080, STAFF_GAP = 50
const CA = { x: 290, y: STAFF_Y }, CB = { x: 790, y: STAFF_Y }, C3 = { x: 540, y: 1050 }
const WDEF = { cx: 0, cy: 0, rOut: 430, rIn: 344, rGlyph: 387, alpha: 0.92 }
const WS = 0.48                                         // chart scale on the staff (rOut ≈ 206)
const HS2 = 58                                          // heart-half size while sitting in a chart
// the reading: three lines over the staff (staff lines 1, 3, 5), planet to planet
const LINES = [{ y: STAFF_Y - 2 * STAFF_GAP, col: READING.push, amp: 16 }, { y: STAFF_Y + 2 * STAFF_GAP, col: READING.pull, amp: 16 }, { y: STAFF_Y, col: READING.align, amp: 7 }]
const XL = 172, XR = 908
const PL = { x: 270, y: 1785 }, PR = { x: 810, y: 1785 }, PL2 = { x: 290, y: 1895 }, PR2 = { x: 790, y: 1895 }

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 70px Inter", "700 62px Inter", "italic 500 190px 'EB Garamond'", "italic 500 120px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('NASHVILLE, TN'), 0.05, T.h1Out], [eyebrow('ON ALIGN'), T.h2, T.h2Out]]
  const H0 = popText(root, 'Every bar | has a *band.*', { top: 205, size: 150, accentSize: 196, at: T.hook, gap: 0.08, late: 1, lateAt: T.hookLand, wobble: true, accentColor: CYAN, lineHeight: 0.98 })
  const H1 = popText(root, 'Every song’s | about | *heartbreak.*', { top: 195, size: 128, accentSize: 176, at: T.h1, gap: 0.07, late: 1, lateAt: T.h1Land, wobble: true, accentColor: HOT, lineHeight: 0.96 })
  const H2 = popText(root, 'Write a | *different* song.', { top: 205, size: 132, accentSize: 172, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const S2 = popText(root, 'Push. Pull. *Align.*', { top: 1370, size: 88, weight: 800, accentSize: 106, times: T.lines, colors: { 0: READING.push, 1: READING.pull }, accentColor: READING.align })
  const H3 = popText(root, 'Your love song | *starts* *here.*', { top: 195, size: 124, accentSize: 178, at: T.h3, gap: 0.07, late: 2, lateAt: T.h3Land, lateGap: 0.12, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const HEADS = [[H0, T.hookOut], [H1, T.h1Out], [H2, T.h2Out], [S2, T.h2Out], [H3, T.h3Out]]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the strum pulse: 1 on each strum beat, decaying
  const strumK = t => { let k = 0; for (const s of T.strums) if (t >= s && s < T.crack) k = Math.max(k, Math.exp(-(t - s) * 7)); return k }

  // ── 1 · the bar row
  function drawStreet(t) {
    if (t > T.drop[1] + 0.05) return
    const dy = (1 - ease.outCubic(prog(t, ...T.rise))) * 900 + ease.inCubic(prog(t, ...T.drop)) * 1100
    // a warm stage glow behind the guitarist
    const g = x.createRadialGradient(GUY.x, 1500 + dy, 40, GUY.x, 1500 + dy, 520)
    g.addColorStop(0, 'rgba(255,170,90,0.25)'); g.addColorStop(1, 'rgba(255,170,90,0)')
    facades(x, t, dy)
    x.fillStyle = g; x.fillRect(0, 900 + dy, W, 1100)
    festoon(x, t, 760, 80, pop01(t, T.fest, 0.4) > 0 ? clamp(prog(t, T.fest, T.fest + 0.3)) : 0, dy * 0.7)
    // neon signs (they stutter on, then flicker sadly when the heart breaks)
    const st = [T.stutter[0], T.stutter[1]]
    const ga = flick(t, T.signs[0], 3, st), la = flick(t, T.signs[1], 7, st)
    const gk = pop01(t, T.signs[0], 0.35, 2.4), lk = pop01(t, T.signs[1], 0.35, 2.4)
    if (gk > 0) { x.save(); x.translate(SIGN_G.x, SIGN_G.y + dy); x.rotate(SIGN_G.rot); x.scale(SIGN_G.s * gk, SIGN_G.s * gk); neonGuitar(x, HOT, ga); x.restore() }
    if (lk > 0) { x.save(); x.translate(SIGN_L.x, SIGN_L.y + dy); x.scale(SIGN_L.s * lk, SIGN_L.s * lk); neonLive(x, la, t); x.restore() }
    sparkle(x, SIGN_G.x, SIGN_G.y + dy, t, T.signs[0] + 0.1, { n: 9, R: 170, seed: 3, size: 24, cols: [HOT, PINK, '#fff3e0'] })
    sparkle(x, SIGN_L.x, SIGN_L.y + dy, t, T.signs[1] + 0.1, { n: 9, R: 170, seed: 4, size: 24, cols: [CYAN, HOT, '#fff3e0'] })
    // the guitarist: pops up, bounces on each strum; slumps a little once the heart cracks
    const k = pop01(t, T.guy, 0.42, 2.2)
    if (k > 0) {
      const sk = strumK(t)
      const slump = ease.inOutCubic(prog(t, T.split, T.split + 0.5))
      const sq = 1 + 0.06 * sk
      x.save(); x.translate(GUY.x, GUY.y + dy + (1 - ease.outCubic(prog(t, T.guy, T.guy + 0.4))) * 300); x.rotate(-0.07 * slump); x.scale(GUY.s * k / sq, GUY.s * k * sq * (1 - 0.04 * slump))
      person(x, GOLD)
      x.save(); x.translate(0, -238 + 238); x.rotate(0.06 * Math.sin(t * 6) * (1 - slump) - 0.12 * slump); cowboyHat(x, TAN); x.restore()
      x.save(); x.translate(0, -96); x.translate(0, -14); x.rotate(-0.72 + 0.06 * sk); x.scale(0.6, 0.6); guitar(x, TAN, { strum: sk }); x.restore()
      x.restore()
    }
    // notes fly off each strum (until the crack)
    T.strums.forEach((s, i) => {
      if (s >= T.crack) return
      for (let j = 0; j < 2; j++) {
        const u = prog(t, s + j * 0.08, s + j * 0.08 + 1.1)
        if (u <= 0 || u >= 1) continue
        const side = (i + j) % 2 ? 1 : -1
        note(x, GUY.x + side * (110 + 200 * u) , 1640 + dy - 380 * ease.outCubic(u), 1.1 * easeOutBack(clamp(u * 4), 2.4), [CYAN, GOLD, PINK][(i + j) % 3], 1 - ease.inQuad(u), side * 0.3 * Math.sin(u * 6))
      }
    })
  }

  // where each heart half is, how big, how split; null when not drawn
  function heartState(t) {
    if (t < T.noteIn || t > T.out[1]) return null
    if (t < T.fly[0]) {
      const k = pop01(t, T.noteIn, 0.45, 2.6)
      const bob = Math.sin(t * 4.4) * 10
      const crack = clamp(prog(t, T.crack, T.crack + 0.12))
      const split = easeOutBack(prog(t, T.split, T.split + 0.4), 1.6)
      const sag = 60 * ease.inOutCubic(prog(t, T.split, T.split + 0.6))
      const jolt = t > T.crack ? 14 * Math.sin((t - T.crack) * 40) * Math.exp(-(t - T.crack) * 8) : 0
      return { whole: true, x: HN.x + jolt, y: HN.y + bob + sag, s: HN.s * k, split, crack, stem: 1 }
    }
    if (t < T.move[0] + 0.45) {
      // fly into the charts and sit there
      const f = ease.inOutCubic(prog(t, ...T.fly))
      const s = lerp(HN.s, HS2, f)
      const beatPulse = T.lines.reduce((m, l) => Math.max(m, t > l + 0.36 ? Math.exp(-(t - l - 0.36) * 6) : 0), 0)
      const s2 = s * (1 + 0.15 * beatPulse)
      const arc = Math.sin(Math.PI * f) * 160
      const hy = HN.y + 60
      return {
        whole: false, s: s2, split: 1, stem: 1 - f,
        L: { x: lerp(HN.x, CA.x + 34 * HS2 / 60, f), y: lerp(hy, CA.y - 26 * HS2 / 60, f) - arc },
        R: { x: lerp(HN.x, CB.x - 34 * HS2 / 60, f), y: lerp(hy, CB.y - 10 * HS2 / 60, f) - arc },
      }
    }
    // the charts slide together; the halves snap back into one heart on the join beat; it swells, the stem regrows
    const sp = 1 - ease.inCubic(prog(t, T.join - 0.38, T.join))
    if (sp > 0) {
      const m = ease.inOutCubic(prog(t, ...T.move))
      const ca = { x: lerp(CA.x, C3.x, m), y: lerp(CA.y, C3.y, m) }, cb = { x: lerp(CB.x, C3.x, m), y: lerp(CB.y, C3.y, m) }
      return { whole: false, s: HS2, split: sp, stem: 0, L: { x: ca.x + 34 * HS2 / 60 * sp, y: ca.y - 26 * HS2 / 60 * sp }, R: { x: cb.x - 34 * HS2 / 60 * sp, y: cb.y - 10 * HS2 / 60 * sp } }
    }
    const g = easeOutBack(prog(t, T.join, T.join + 0.45), 2.4)
    const beats = [BEAT(16), BEAT(17)].reduce((m, b) => Math.max(m, t > b ? Math.exp(-(t - b) * 7) : 0), 0)
    const ok = popOut(t, T.out)
    return { whole: true, x: C3.x, y: C3.y + 10 - 40 * g, s: lerp(HS2, 112, g) * (1 + 0.08 * beats) * ok, split: 0, crack: 0, stem: clamp(prog(t, T.join + 0.1, T.join + 0.45)) }
  }

  function drawHeart(t) {
    const H = heartState(t)
    if (!H || H.s <= 0) return
    const col = H.whole && t > T.join ? PINK : HOT
    if (H.whole) {
      x.save(); x.translate(H.x, H.y); heartNote(x, H.s, col, { split: H.split, crack: H.crack, stem: H.stem }); x.restore()
    } else {
      x.save(); x.translate(H.L.x, H.L.y); heartNote(x, H.s, col, { split: H.split, stem: 0, only: -1 }); x.restore()
      x.save(); x.translate(H.R.x, H.R.y); heartNote(x, H.s, col, { split: H.split, stem: H.stem, only: 1 }); x.restore()
    }
    sparkle(x, HN.x, HN.y, t, T.noteIn + 0.1, { n: 10, R: 220, seed: 11, size: 26, cols: [HOT, PINK, GOLD, '#fff3e0'] })
    // the crack: a burst of blue shards, small and sad
    sparkle(x, HN.x, HN.y + 30, t, T.split, { n: 10, R: 200, seed: 13, size: 22, cols: ['#8fd8f6', '#6f8cff', '#c9a6ff'], dur: 0.9 })
    // the join: gold ring + big burst
    const fk = prog(t, T.join, T.join + 0.6)
    if (fk > 0 && fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(C3.x, C3.y, 120 + 320 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 14 * (1 - fk) + 2, fa: 0, glow: 34 }); x.restore() }
    sparkle(x, C3.x, C3.y, t, T.join, { n: 20, R: 460, seed: 61, size: 32, cols: [PINK, GOLD, '#fff3e0', VIOLET, HOT] })
    // notes float up out of the joined heart
    if (t > T.join) {
      const ok = popOut(t, T.out)
      for (let i = 0; i < 7; i++) {
        const t0 = T.join + 0.1 + i * 0.19, u = prog(t, t0, t0 + 1.3)
        if (u <= 0 || u >= 1) continue
        const side = i % 2 ? 1 : -1
        note(x, C3.x + side * (90 + 230 * u + 40 * Math.sin(u * 5 + i)), C3.y - 60 - 420 * ease.outCubic(u), 1.05 * easeOutBack(clamp(u * 5), 2.4) * ok, [GOLD, PINK, CYAN, VIOLET][i % 4], (1 - ease.inQuad(u)) * ok, side * 0.25)
      }
    }
  }

  // ── 2 · the staff, the charts, the reading
  const lineY = (L, px, t) => L.y + L.amp * Math.sin((px / 150) * TAU - t * 5) * Math.sin(Math.PI * clamp((px - XL) / (XR - XL)))
  function drawStaff(t) {
    if (t < T.staff[0] || t > T.h2Out[1] + 0.3) return
    const o = outK(t, [T.h2Out[0] - 0.05, T.h2Out[1] + 0.2])
    x.save(); x.globalAlpha = o
    for (let i = 0; i < 5; i++) {
      const p = ease.inOutCubic(prog(t, T.staff[0] + i * 0.05, T.staff[1] + i * 0.05))
      if (p <= 0) continue
      const y = STAFF_Y + (i - 2) * STAFF_GAP
      x.beginPath(); x.moveTo(40, y); x.lineTo(40 + 1000 * p, y); ink(x, BONE, { w: 5, fa: 0, glow: 10 })
    }
    x.restore()
    x.save(); x.globalAlpha = 0.5 * o
    // bar lines at both ends
    const bk = clamp(prog(t, T.staff[1], T.staff[1] + 0.2))
    if (bk > 0) for (const bx of [40, 1040]) { x.beginPath(); x.moveTo(bx, STAFF_Y - 2 * STAFF_GAP); x.lineTo(bx, STAFF_Y - 2 * STAFF_GAP + 4 * STAFF_GAP * bk); ink(x, BONE, { w: 6, fa: 0, glow: 8 }) }
    x.restore()
  }

  function chartPose(t, which) {
    const c0 = which ? CB : CA, t0 = which ? T.cB : T.cA
    const k = pop01(t, t0, 0.5, 1.6)
    const m = ease.inOutCubic(prog(t, ...T.move))
    const ok = popOut(t, T.out)
    const lockBump = t > T.join ? 1 + 0.08 * Math.exp(-(t - T.join) * 7) : 1
    const sc = lerp(WS, which ? 0.42 : 0.62, m) * k * ok * lockBump
    const spin = (which ? -1 : 1) * 1.6 * Math.PI * (1 - ease.outCubic(prog(t, t0, t0 + 0.7))) + (which ? -1 : 1) * t * 0.25
    return { x: lerp(c0.x, C3.x, m), y: lerp(c0.y, C3.y, m), sc, spin, k }
  }

  function drawCharts(t) {
    if (t < T.cA || t > T.out[1]) return
    for (const which of [0, 1]) {
      const P = chartPose(t, which)
      if (P.sc <= 0) continue
      x.save(); x.translate(P.x, P.y); x.rotate(P.spin); x.scale(P.sc, P.sc)
      x.beginPath(); x.arc(0, 0, WDEF.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.62)'; x.fill()
      drawWheelH(x, { W: WDEF })
      x.restore()
      sparkle(x, (which ? CB : CA).x, STAFF_Y, t, (which ? T.cB : T.cA) + 0.12, { n: 12, R: 300, seed: 21 + which, size: 26 })
    }
    // the join: both charts lock
    sparkle(x, C3.x, C3.y, t, T.move[1], { n: 12, R: 300, seed: 31, size: 24, cols: [GOLD, '#fff3e0'] })
  }

  function orb(px, py, r, col, a) {
    if (a <= 0 || r <= 0) return
    x.save(); x.globalAlpha = a; x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(px, py, 0, px, py, r * 3.2); g.addColorStop(0, rgba(col, 0.75)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(px, py, r * 3.2, 0, TAU); x.fill()
    x.globalCompositeOperation = 'source-over'
    x.beginPath(); x.arc(px, py, r, 0, TAU); x.fillStyle = col; x.fill()
    x.fillStyle = '#fff'; x.fillRect(px - r * 0.45, py - r * 0.45, r * 0.35, r * 0.35)
    x.restore()
  }

  function drawReading(t) {
    if (t < T.dots || t > T.h2Out[1] + 0.3) return
    const o = outK(t, [T.h2Out[0] - 0.05, T.h2Out[1] + 0.2])
    LINES.forEach((L, i) => {
      const tl = T.lines[i]
      const lk = ease.inOutCubic(prog(t, tl, tl + 0.4))
      if (lk > 0) {
        const pulse = 1 + 0.3 * Math.exp(-Math.max(0, t - tl - 0.4) * 4)
        x.save(); x.globalAlpha = o; x.beginPath()
        const N = 60
        for (let j = 0; j <= N * lk; j++) { const px = lerp(XL, XR, j / N); j ? x.lineTo(px, lineY(L, px, t)) : x.moveTo(px, lineY(L, px, t)) }
        ink(x, L.col, { w: (i === 2 ? 13 : 10) * pulse, fa: 0, glow: 28 })
        x.restore()
        sparkle(x, XR, L.y, t, tl + 0.38, { n: 9, R: 120, seed: 40 + i, cols: [L.col, '#fff3e0'], size: 22 })
        // notes ride the drawn line, left to right
        if (lk >= 1) for (let j = 0; j < 2; j++) {
          const u = ((t - tl - 0.4) * 0.55 + j * 0.5) % 1
          const px = lerp(XL + 40, XR - 40, u)
          note(x, px, lineY(L, px, t) - 8, 0.95, L.col, Math.sin(Math.PI * u) * o * clamp((t - tl - 0.4) * 4), 0)
        }
      }
      const dk = pop01(t, T.dots + i * 0.08, 0.36, 2.2) * o
      if (dk > 0) { orb(XL, L.y, 20 * dk, GOLD, clamp(dk * 2) * o); orb(XR, L.y, 20 * dk, SILVER, clamp(dk * 2) * o) }
    })
  }

  // ── 3 · two people
  function drawPeople(t) {
    if (t < T.people[0] || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const hop = t > T.join ? Math.abs(Math.sin((t - T.join) * 9)) * Math.exp(-(t - T.join) * 3.5) * 50 : 0
    const m = ease.inOutCubic(prog(t, ...T.move))
    ;[[PL2, PL, GOLD, T.people[0], 0.07, true], [PR2, PR, PINK, T.people[1], -0.07, false]].forEach(([P2, P3, col, t0, lean, hat], i) => {
      const P = { x: lerp(P2.x, P3.x, m), y: lerp(P2.y, P3.y, m) }, ps = lerp(0.95, 1.2, m)
      const k = pop01(t, t0, 0.4, 2.4) * ok
      if (k <= 0) return
      const rise = (1 - ease.outCubic(prog(t, t0, t0 + 0.4))) * 260
      const sq = t > t0 ? 1 + 0.1 * Math.sin((t - t0) * 20) * Math.exp(-(t - t0) * 6) : 1
      const ln = lean * Math.min(1, Math.max(0, t - T.join) * 3)
      x.save(); x.translate(P.x, P.y + rise - hop * (i ? 0.8 : 1)); x.scale(ps * k / sq, ps * k * sq)
      person(x, col, { lean: ln })
      if (hat) { x.save(); x.rotate(ln); cowboyHat(x, TAN); x.restore() }
      x.restore()
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) { drawStreet(t); drawStaff(t); drawCharts(t); drawReading(t); drawPeople(t); drawHeart(t) }
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

// card-motif cuts, each just before the next headline pops (old type already out):
//   2.42 hook type leaving (2.28–2.48) → the heart note (2.42) + "Every song's about heartbreak." (2.5)
//   4.44 type out (4.45), bar row dropping → staff lines, "Write a different song." (4.5)
//   8.22 type out (8.25) → the charts nest, "Your love song starts here." (8.28) · the end card flips in at 10.6
const CUTS = [{ t: 2.42, kind: 'deal' }, { t: 4.44, kind: 'fan' }, { t: 8.22, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: CTA }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (written in D; the engine keeps pitched SFX in the film's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const strum = (t0, root, gain = 0.035, pan = 0.25) => [root, root * 1.25, root * 1.5, root * 2].map((f, i) => ['pluck', +(t0 + i * 0.018).toFixed(3), +f.toFixed(2), gain, 0.5, pan])
export const CUES = [
  // hook: every bar has a band
  ...wordPops(T.hook, 4, 0.08, 0), ['pop', T.hookLand, 1318.51, 0.055, 0], ['pluck', T.hookLand, 1174.66, 0.05, 0.6, 0], ['whoosh', 0.05, 0.4, 0.03],
  ['pop', T.guy + 0.1, 587.33, 0.05, 0],
  ...T.signs.flatMap((s, i) => [['tick', s, 0.05], ['tick', s + 0.08, 0.04], ['tick', s + 0.2, 0.04], ['pop', s + 0.1, [880, 1174.66][i], 0.045, i ? 0.5 : -0.5]]),
  ...T.strums.filter(s => s < T.crack).flatMap((s, i) => strum(s, [293.66, 392, 440, 293.66][i % 4], 0.032, 0.2)),
  // every song's about heartbreak
  ['whoosh', T.hookOut[0], 0.3, 0.025],
  ...wordPops(T.h1, 3, 0.07, 1, 0.026), ['pop', T.h1Land, 1318.51, 0.055, 0], ['pluck', T.h1Land, 1174.66, 0.05, 0.6, 0],
  ['pop', T.noteIn + 0.05, 987.77, 0.05, 0], ['glitter', T.noteIn + 0.1, T.noteIn + 0.5],
  ['tick', T.crack, 0.08], ['pop', T.crack, 440, 0.04, 0],
  ['boom', T.split, 0.1], ['tick', T.split, 0.07],
  ...[880, 783.99, 659.25, 587.33].map((f, i) => ['pluck', +(T.split + 0.12 + i * 0.13).toFixed(3), f, 0.035, 0.45, -0.1 + i * 0.07]),
  // write a different song
  ['whoosh', T.drop[0], 0.5, 0.04],
  ...wordPops(T.h2, 2, 0.08, 2, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pop', T.h2Land + 0.14, 1174.66, 0.045, 0], ['pluck', T.h2Land + 0.14, 987.77, 0.045, 0.6, 0],
  ...[0, 1, 2, 3, 4].map(i => ['pluck', +(T.staff[0] + i * 0.05).toFixed(3), NOTE[i], 0.03, 0.4, -0.4 + i * 0.2]),
  ['whoosh', T.fly[0], 0.5, 0.03],
  ['pop', T.cA, 739.99, 0.05, -0.5], ['pop', T.cB, 880, 0.05, 0.5], ['glitter', T.cA + 0.1, T.cB + 0.5],
  ...[0, 1, 2].map(i => ['pop', +(T.dots + i * 0.08).toFixed(3), NOTE[3 + i], 0.035, (i - 1) * 0.4]),
  ...T.lines.map((tl, i) => ['pluck', tl, [739.99, 880, 1174.66][i], 0.05, 0.6, (i - 1) * 0.4]),
  ...T.lines.map((tl, i) => ['pop', +(tl + 0.02).toFixed(3), [739.99, 880, 1174.66][i], 0.045, 0]),
  ['bell', T.lines[2] + 0.38, 1174.66, 0.045, 1.2, 0], ['glitter', T.lines[2] + 0.38, T.lines[2] + 0.9],
  // your love song starts here
  ['whoosh', T.move[0], 0.5, 0.035], ['riser', T.move[0], T.join, 0.035],
  ...wordPops(T.h3, 3, 0.07, 2, 0.03), ['pop', T.h3Land, 1318.51, 0.05, 0], ['pop', T.h3Land + 0.12, 1174.66, 0.05, 0],
  ['pop', T.people[0], 587.33, 0.05, -0.5], ['pop', T.people[1], 739.99, 0.05, 0.5],
  ['boom', T.join, 0.12], ['bell', T.join, 1174.66, 0.055, 1.6, 0], ['bell', T.join + 0.08, 1760, 0.035, 1.4, 0.2], ['glitter', T.join, T.join + 0.7],
  ...strum(T.join + 0.02, 293.66, 0.04, 0),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
