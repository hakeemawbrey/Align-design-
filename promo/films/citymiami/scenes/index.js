// citymiami (15 s vertical Align ad) · story 0–10.6, then the shared end card ("come" + the logo, JOIN THE WAITLIST).
//   0.00–3.45  HOOK  "Miami: hot nights, | and everyone's | “just visiting.”"  Neon palms, generic deco hotels with
//              neon trim, the moonlit ocean; travellers roll suitcases past along the promenade, bouncing on the beat.
//   3.55–6.30  "Dealbreakers | come *first.*"  A DEALBREAKERS card; "✕ JUST VISITING" slams on (4.77) and the last
//              little suitcase bolts off screen. "Up front, not after | *the weekend.*"
//   6.35–8.35  "See who's here | for *real.*"  A zodiac wheel whirls in; a veiled mystery card drops onto it with a
//              pink aura. "Chart first. *Face last.*"
//   8.40–10.45 "Find someone | who *stays.*"  Back on the beach: two people under a palm, the sun comes up on the
//              ocean (they stayed), a gold arc and a heart. Everything pops out by 10.45.
//   10.45→     plain sky only (SKY_H + grain); the end card takes over at 10.6.
// One canvas (sky + illustration), DOM type above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { BONE, GOLD, PINK, ROSE, TEAL, AQUA, RED, VIOLET, SUN, LIME, INTER, MONO, SERIF, rgba, ink, sparkle, palm, hotel, ocean, suitcase, person, heart } from './props.js'

export const DURATION = 15
export const CTA = 'JOIN THE WAITLIST'
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2, D2R = Math.PI / 180
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)

// ── the timeline
export const T = {
  hook: 0.08, hookLate: BEAT(2), hotels: 0.12, palms: [BEAT(0), BEAT(1)], walkers: [0.25, 0.95, 1.65, 2.35], sceneOut: [3.22, 3.48], hookOut: [3.25, 3.45],
  h1: 3.55, h1Late: BEAT(6), card: 3.62, case: [3.95, 4.35], stamp: BEAT(7.5), bolt: BEAT(7.5) + 0.14, sub1: 5.0, h1Out: [6.1, 6.3],
  h2: 6.35, h2Late: BEAT(11), wheel: [6.35, 6.95], drop: [6.43, BEAT(11)], sub2: 6.95, h2Out: [8.15, 8.35],
  h3: 8.4, h3Late: BEAT(14.5), beach: [8.35, 8.8], palm3: 8.5, people: [8.55, 8.68], sun: [8.8, 9.9], arc: [9.15, 9.5], heart: BEAT(16), out: [10.05, 10.45], h3Out: [10.22, 10.45],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
/** pop-out: a little swell, then shrink to 0 */
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
/** a bounce on every beat (0..1, peaks between beats) */
const beatHop = t => Math.abs(Math.sin(Math.PI * ((t - 0.6) / 0.5556)))

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
    if (acc) Object.assign(style, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
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
        w.e.style.opacity = t < w.t ? '0' : String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── layout
const BASE = 1300                      // hotel baseline / top of the promenade
const WALK_Y = 1515                    // travellers' feet
const SEA = 1575                       // top of the ocean (hook)
const HOTELS = [
  { x: 120, w: 210, h: 300, col: TEAL, seed: 3, step: false },
  { x: 330, w: 230, h: 430, col: PINK, seed: 5 },
  { x: 560, w: 200, h: 340, col: AQUA, seed: 8, step: false },
  { x: 770, w: 240, h: 470, col: VIOLET, seed: 11 },
  { x: 980, w: 200, h: 320, col: PINK, seed: 13, step: false },
]
const WALKERS = [
  { col: GOLD, case: PINK, sticker: 0 }, { col: AQUA, case: GOLD, sticker: 1 },
  { col: ROSE, case: TEAL, sticker: 2 }, { col: VIOLET, case: SUN, sticker: 0 },
]
const WALK_V = 470
// the dealbreakers card
const CARD = { w: 840, h: 600, cx: 540, cy: 1000 }
// the mystery card on the chart
const MC = { cx: 540, cy: 1070, h: 620 }
const WH = { cx: 0, cy: 0, rOut: 450, rIn: 360, rGlyph: 405, alpha: 0.92 }
// the end beach
const HZ = 1330                         // horizon
const PL = { x: 400, y: 1700 }, PR = { x: 680, y: 1700 }

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 80px Inter", "700 62px Inter", "italic 500 160px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const card = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-profile-1.png' })
  let cardBmp = null
  if (card) { const c = document.createElement('canvas'); c.width = 700; c.height = Math.round(700 * card.height / card.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(card, 0, 0, c.width, c.height); cardBmp = c }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('MIAMI, FL', TEAL), 0.05, T.hookOut], [eyebrow('ON ALIGN'), T.h1, T.h1Out]]
  const H0a = popText(root, 'Miami: hot nights,', { top: 205, size: 100, at: T.hook, gap: 0.12 })
  const H0 = popText(root, 'and everyone’s | *“just* *visiting.”*', { top: 330, size: 112, accentSize: 150, at: 0.62, gap: 0.12, late: 2, lateAt: T.hookLate, lateGap: 0.12, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H1 = popText(root, 'Dealbreakers | come *first.*', { top: 205, size: 124, accentSize: 160, at: T.h1, gap: 0.09, late: 1, lateAt: T.h1Late, wobble: true, accentColor: GOLD })
  const S1 = popText(root, 'Up front, not after | *the* *weekend.*', { top: 1530, size: 70, accentSize: 90, at: T.sub1, gap: 0.06, late: 2, lateAt: T.sub1 + 0.3, accentColor: ROSE })
  const H2 = popText(root, 'See who’s here | for *real.*', { top: 215, size: 108, accentSize: 168, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Late, wobble: true, accentColor: PINK })
  const S2 = popText(root, 'Chart first. *Face* *last.*', { top: 1600, size: 72, accentSize: 88, at: T.sub2, gap: 0.08, accentColor: GOLD })
  const H3 = popText(root, 'Find someone | who *stays.*', { top: 200, size: 136, accentSize: 184, at: T.h3, gap: 0.08, late: 1, lateAt: T.h3Late, wobble: true, accentColor: SUN, lineHeight: 1.0 })
  const HEADS = [[H0a, T.hookOut], [H0, T.hookOut], [H1, T.h1Out], [S1, T.h1Out], [H2, T.h2Out], [S2, T.h2Out], [H3, T.h3Out]]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── 1 · the hook: hotels, promenade, ocean, palms, travellers
  function drawHook(t) {
    if (t > T.sceneOut[1]) return
    const ok = outK(t, T.sceneOut)
    const sink = (1 - ok) * 260
    x.save(); x.translate(0, sink)
    // hotels rise from the baseline, staggered
    HOTELS.forEach((Hh, i) => {
      const k = pop01(t, T.hotels + i * 0.08, 0.45, 1.6)
      x.save(); x.translate(Hh.x, BASE); hotel(x, t, { ...Hh, k }); x.restore()
    })
    // promenade (sand) + neon edge
    x.fillStyle = 'rgba(30,16,52,0.97)'; x.fillRect(0, BASE, W, SEA - BASE)
    x.beginPath(); x.moveTo(0, BASE); x.lineTo(W, BASE); ink(x, PINK, { w: 5, fa: 0, glow: 18 })
    x.save(); x.globalAlpha = 0.35; x.setLineDash([26, 22]); x.lineDashOffset = -t * 60
    x.beginPath(); x.moveTo(0, WALK_Y + 8); x.lineTo(W, WALK_Y + 8); x.strokeStyle = BONE; x.lineWidth = 3; x.stroke(); x.restore()
    ocean(x, t, SEA, 1920, { mx: 930 })
    // palms pop up from the sand, either side
    ;[[110, 0.14, PINK, TEAL, 0], [975, -0.16, TEAL, LIME, 2]].forEach(([px, lean, tr, fr, sd], i) => {
      const k = pop01(t, T.palms[i], 0.45, 2.2)
      if (k <= 0) return
      x.save(); x.translate(px, SEA + 30); x.scale(k, k); palm(x, t, { h: 620, lean, trunk: tr, frond: fr, seed: sd }); x.restore()
      sparkle(x, px + lean * 600, SEA - 560, t, T.palms[i] + 0.1, { n: 10, R: 180, seed: 4 + i, size: 26, cols: [TEAL, PINK, GOLD, '#fff3e0'] })
    })
    // travellers + suitcases, left → right, a hop on every beat
    WALKERS.forEach((Wk, i) => {
      const t0 = T.walkers[i]
      if (t < t0) return
      const px = -260 + (t - t0) * WALK_V
      if (px > W + 260) return
      const hop = beatHop(t + i * 0.12) * 16
      const tilt = -0.32 + 0.05 * Math.sin(t * 9 + i)
      const hx = -105 + 196 * Math.sin(tilt) * 0.95, hy = -196 * Math.cos(tilt) * 0.95 + hop
      x.save(); x.translate(px - 105, WALK_Y)
      suitcase(x, { col: Wk.case, tilt, spin: (t - t0) * WALK_V / 13, s: 0.95, sticker: Wk.sticker })
      x.restore()
      x.save(); x.translate(px, WALK_Y - hop)
      person(x, Wk.col, { lean: 0.05, arm: { x: hx, y: hy } })
      x.restore()
    })
    x.restore()
    sparkle(x, 540, 560, t, T.hookLate + 0.15, { n: 16, R: 420, seed: 9, size: 30, cols: [PINK, ROSE, GOLD, TEAL, '#fff3e0'] })
  }

  // ── 2 · dealbreakers card + the stamp; the little suitcase bolts
  function drawDeal(t) {
    if (t < T.card || t > T.h1Out[1]) return
    const ok = popOut(t, T.h1Out)
    const k = pop01(t, T.card, 0.45, 1.8) * ok
    if (k <= 0) return
    const rise = (1 - ease.outCubic(prog(t, T.card, T.card + 0.45))) * 500
    const shake = t > T.stamp ? 16 * Math.exp(-(t - T.stamp) * 6) * Math.sin((t - T.stamp) * 42) : 0
    const { w, h } = CARD
    x.save(); x.translate(CARD.cx + shake, CARD.cy + rise); x.rotate((1 - k) * 0.12 + shake * 0.002); x.scale(k, k)
    // the card
    x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
    x.fillStyle = 'rgba(18,12,40,0.95)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); x.fill()
    x.shadowOffsetY = 0; x.shadowBlur = 0
    const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(PINK, 0.18)); gr.addColorStop(1, rgba(TEAL, 0.06))
    x.fillStyle = gr; x.fill()
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); ink(x, GOLD, { w: 9, fa: 0, glow: 26 })
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = GOLD; x.font = `700 38px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 80)
    x.fillStyle = BONE; x.font = `italic 500 66px ${SERIF}`; x.fillText('What ends it before it starts?', 0, -h / 2 + 166)
    // slot
    const cy = 90
    x.save(); x.setLineDash([14, 12]); x.strokeStyle = rgba(BONE, 0.32); x.lineWidth = 4; x.beginPath(); x.roundRect(-350, cy - 70, 700, 140, 70); x.stroke(); x.restore()
    // the chip slams in from big
    if (t >= T.stamp - 0.18) {
      const sp = prog(t, T.stamp - 0.18, T.stamp)
      const sc = lerp(2.8, 1, ease.inCubic(sp)) * (t > T.stamp ? 1 + 0.08 * Math.sin((t - T.stamp) * 30) * Math.exp(-(t - T.stamp) * 9) : 1)
      const hot = t > T.stamp ? Math.exp(-(t - T.stamp) * 3) : 0
      x.save(); x.translate(0, cy); x.rotate(lerp(-0.18, -0.035, ease.inCubic(sp))); x.scale(sc, sc); x.globalAlpha = clamp(sp * 2.5)
      const cw = 720, ch = 150
      x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 75); x.fillStyle = 'rgba(64,8,24,0.97)'; x.fill()
      ink(x, RED, { w: 9, fa: 0, glow: 20 + 34 * hot })
      x.save(); x.translate(-cw / 2 + 82, 0); x.beginPath(); x.moveTo(-22, -22); x.lineTo(22, 22); x.moveTo(22, -22); x.lineTo(-22, 22); ink(x, '#ff5a52', { w: 12, fa: 0, glow: 14 }); x.restore()
      x.fillStyle = '#ffe2dc'; x.font = `900 70px ${INTER}`; x.textAlign = 'center'; x.fillText('JUST VISITING', 50, 4)
      x.restore()
    }
    x.restore()
    // impact flash ring + sparkles
    const fk = prog(t, T.stamp, T.stamp + 0.5)
    if (fk > 0 && fk < 1) { x.save(); x.globalAlpha = (1 - fk) * ok; x.beginPath(); x.roundRect(540 - 380 - 120 * fk, CARD.cy + 90 - 80 - 40 * fk, 760 + 240 * fk, 160 + 80 * fk, 90); ink(x, RED, { w: 10 * (1 - fk) + 2, fa: 0, glow: 30 }); x.restore() }
    sparkle(x, 540, CARD.cy + 90, t, T.stamp, { n: 18, R: 460, seed: 40, size: 30, cols: [RED, '#ff8a80', GOLD, '#fff3e0'] })
    // the little suitcase: rolls in under the card, waits (tapping on the beat), then bolts off on the stamp
    if (t >= T.case[0] && t < T.bolt + 0.6) {
      const ri = ease.outBack ? ease.outCubic(prog(t, ...T.case)) : prog(t, ...T.case)
      const bp = prog(t, T.bolt, T.bolt + 0.45)
      const px = lerp(-140, 820, ri) + ease.inCubic(bp) * 700
      const hop = t < T.bolt ? beatHop(t) * 12 : 0
      const jump = t > T.stamp && t < T.bolt + 0.1 ? Math.sin(Math.PI * prog(t, T.stamp, T.bolt + 0.1)) * 70 : 0
      x.save(); x.translate(px, 1470 - hop - jump)
      suitcase(x, { col: PINK, tilt: t > T.bolt ? -0.5 : 0.08 * Math.sin(t * 6), spin: (t - T.case[0]) * 12, s: 1.05, sticker: 1 })
      x.restore()
      if (bp > 0 && bp < 1) {
        x.save(); x.globalAlpha = 1 - bp
        for (let j = 0; j < 4; j++) { const yy = 1370 + j * 34; x.beginPath(); x.moveTo(px - 90 - j * 30, yy); x.lineTo(px - 260 - j * 50, yy); ink(x, BONE, { w: 6, fa: 0, glow: 10 }) }
        x.restore()
      }
    }
  }

  // ── 3 · the chart + the mystery card
  function drawChart(t) {
    if (t < T.wheel[0] || t > T.h2Out[1]) return
    const ok = popOut(t, T.h2Out)
    const wk = pop01(t, T.wheel[0], 0.6, 1.5) * ok
    const rot = -1.6 * TAU * (1 - ease.outCubic(prog(t, ...T.wheel))) + (t - T.wheel[0]) * 0.12
    const land = T.drop[1]
    const bump = t > land ? 1 + 0.06 * Math.exp(-(t - land) * 7) : 1
    // aura behind
    const ak = ease.outCubic(prog(t, land - 0.15, land + 0.5)) * ok
    if (ak > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const R = 640 * (0.85 + 0.15 * ak) * (1 + 0.04 * Math.sin(t * 3))
      const g = x.createRadialGradient(MC.cx, MC.cy, 40, MC.cx, MC.cy, R)
      g.addColorStop(0, rgba('#ff6fa8', 0.55 * ak)); g.addColorStop(0.45, rgba('#b45cf0', 0.22 * ak)); g.addColorStop(1, rgba('#7c74f0', 0))
      x.fillStyle = g; x.beginPath(); x.arc(MC.cx, MC.cy, R, 0, TAU); x.fill()
      x.restore()
    }
    if (wk > 0) {
      x.save(); x.translate(MC.cx, MC.cy); x.rotate(rot); x.scale(wk * bump, wk * bump)
      x.beginPath(); x.arc(0, 0, WH.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.72)'; x.fill()
      drawWheelH(x, { W: WH })
      x.restore()
    }
    sparkle(x, MC.cx, MC.cy, t, T.wheel[0] + 0.2, { n: 14, R: 540, seed: 21, size: 28 })
    // the card drops in, tilted, lands with a squash
    if (cardBmp && t >= T.drop[0]) {
      const dp = prog(t, ...T.drop)
      const y = lerp(-500, MC.cy, easeOutBack(dp, 1.3)) + 10 * Math.sin((t - land) * 2.2) * clamp((t - land) * 2)
      const since = t - land
      const sq = since > 0 && since < 0.35 ? 1 - 0.08 * Math.sin(Math.PI * since / 0.35) : 1
      const hgt = MC.h * ok, wid = hgt * cardBmp.width / cardBmp.height
      x.save(); x.translate(MC.cx, y + hgt / 2); x.rotate(lerp(-16, -3, ease.outCubic(dp)) * D2R); x.scale(1 / sq, sq); x.translate(0, -hgt / 2)
      x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 40; x.shadowOffsetY = 18
      x.drawImage(cardBmp, -wid / 2, -hgt / 2, wid, hgt)
      x.restore()
    }
    sparkle(x, MC.cx, MC.cy, t, land, { n: 18, R: 470, seed: 31, size: 32, cols: [PINK, ROSE, GOLD, VIOLET, '#fff3e0'] })
  }

  // ── 4 · the end beach: horizon, sunrise, palm, two people, gold arc + heart
  function drawEnd(t) {
    if (t < T.beach[0] || t > T.out[1]) return
    const ok = outK(t, T.out)
    const bk = ease.outCubic(prog(t, ...T.beach))
    const dy = (1 - bk) * 700 + (1 - ok) * 500
    x.save(); x.translate(0, dy)
    // the sun comes up on the horizon (clipped to above the waterline)
    const sk = ease.inOutCubic(prog(t, ...T.sun))
    if (sk > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(540, HZ, 20, 540, HZ, 900)
      g.addColorStop(0, rgba(SUN, 0.6 * sk)); g.addColorStop(0.4, rgba(PINK, 0.22 * sk)); g.addColorStop(1, rgba(PINK, 0))
      x.fillStyle = g; x.fillRect(0, HZ - 900, W, 900)
      x.restore()
      x.save(); x.beginPath(); x.rect(0, 0, W, HZ); x.clip()
      const sy = HZ + 170 - 210 * sk
      x.beginPath(); x.arc(540, sy, 170, 0, TAU); ink(x, SUN, { w: 9, fa: 0.85, glow: 40, fill: '#ffb35a' })
      x.fillStyle = 'rgba(30,16,52,0.55)'
      for (let j = 0; j < 4; j++) x.fillRect(340, sy + 30 + j * 34, 400, 9 + j * 2)
      x.restore()
    }
    ocean(x, t, HZ, 1560, { mx: 540 })
    if (sk > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = rgba(SUN, 0.5 * sk); for (let j = 0; j < 8; j++) { const ww = 260 - j * 22 + 14 * Math.sin(t * 3 + j); x.fillRect(540 - ww / 2, HZ + 16 + j * 27, ww, 6) } x.restore() }
    // sand
    x.fillStyle = 'rgba(38,20,60,0.98)'; x.fillRect(0, 1560, W, 400)
    x.beginPath(); x.moveTo(0, 1560); for (let px = 0; px <= W; px += 30) x.lineTo(px, 1560 + Math.sin(px * 0.02 + t * 2) * 6); ink(x, BONE, { w: 5, fa: 0, glow: 14 })
    // palm, left
    const pk = pop01(t, T.palm3, 0.45, 2.2)
    if (pk > 0) { x.save(); x.translate(140, 1720); x.scale(pk, pk); palm(x, t, { h: 700, lean: 0.2, trunk: PINK, frond: TEAL }); x.restore() }
    // the two people
    const hop = t > T.heart ? Math.abs(Math.sin((t - T.heart) * 9)) * Math.exp(-(t - T.heart) * 3.5) * 50 : 0
    ;[[PL, GOLD, T.people[0], 0.07], [PR, ROSE, T.people[1], -0.07]].forEach(([P, col, t0, lean], i) => {
      const k = pop01(t, t0, 0.4, 2.4)
      if (k <= 0) return
      const sq = t > t0 ? 1 + 0.1 * Math.sin((t - t0) * 20) * Math.exp(-(t - t0) * 6) : 1
      x.save(); x.translate(P.x, P.y - hop * (i ? 0.8 : 1)); x.scale(1.05 * k / sq, 1.05 * k * sq)
      person(x, col, { lean: lean * Math.min(1, Math.max(0, t - T.arc[0]) * 3) })
      x.restore()
    })
    // a suitcase standing by — nobody's leaving
    const ck = pop01(t, T.people[1] + 0.12, 0.4, 2.4)
    if (ck > 0) { x.save(); x.translate(860, 1700); x.scale(ck, ck); suitcase(x, { col: TEAL, tilt: 0, s: 1, sticker: 0 }); x.restore() }
    // gold arc from head to head, a heart at the top
    const ak = ease.inOutCubic(prog(t, ...T.arc))
    if (ak > 0) {
      const y0 = PL.y - 320, peak = PL.y - 680
      x.beginPath()
      const N = 40
      for (let j = 0; j <= N * ak; j++) { const u = j / N, px = lerp(PL.x, PR.x, u), py = y0 - 4 * (y0 - peak) * u * (1 - u); j ? x.lineTo(px, py) : x.moveTo(px, py) }
      ink(x, GOLD, { w: 10, fa: 0, glow: 30 })
      const hk = pop01(t, T.heart, 0.45, 3)
      const beat = 1 + 0.1 * Math.max(0, Math.sin((t - T.heart) * 8))
      x.save(); x.translate(540, peak - 30); heart(x, 72 * hk * beat, PINK, clamp(hk * 2)); x.restore()
      sparkle(x, 540, peak - 30, t, T.heart, { n: 16, R: 300, seed: 61, size: 30, cols: [PINK, GOLD, '#fff3e0', SUN] })
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) { drawHook(t); drawDeal(t); drawChart(t); drawEnd(t) }
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

// ── sound (pitched SFX are shifted into the film's key by the engine; written in Bb minor)
const NOTE = [466.16, 523.25, 554.37, 622.25, 698.46, 830.61, 932.33]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ['whoosh', 0.05, 0.4, 0.03], ...wordPops(T.hook, 3, 0.12, 0), ...wordPops(0.62, 2, 0.12, 2),
  ['pop', T.hookLate, 932.33, 0.055, 0], ['pop', T.hookLate + 0.12, 1108.73, 0.055, 0], ['pluck', T.hookLate + 0.12, 932.33, 0.05, 0.6, 0],
  ['glitter', T.hookLate + 0.15, T.hookLate + 0.7],
  ...T.palms.map((p, i) => ['pluck', p, [466.16, 554.37][i], 0.045, 0.4, i ? 0.5 : -0.5]),
  ...T.walkers.map((w, i) => ['tick', +(w + 0.3).toFixed(3), 0.035]),
  ['whoosh', T.sceneOut[0], 0.35, 0.035],
  // dealbreakers
  ...wordPops(T.h1, 2, 0.09, 1, 0.028), ['pop', T.h1Late, 932.33, 0.055, 0], ['pluck', T.h1Late, 698.46, 0.045, 0.5, 0],
  ['whoosh', T.card, 0.4, 0.04], ['tick', T.case[0] + 0.1, 0.04], ['tick', T.case[1], 0.04],
  ['whoosh', T.stamp - 0.2, 0.2, 0.045], ['boom', T.stamp, 0.16], ['tick', T.stamp, 0.09],
  ['whoosh', T.bolt, 0.35, 0.05], ['pop', T.bolt + 0.05, 1244.51, 0.04, 0.6],
  ...wordPops(T.sub1, 4, 0.06, 3, 0.02), ['pop', T.sub1 + 0.3, 830.61, 0.035, 0], ['pop', T.sub1 + 0.4, 932.33, 0.035, 0],
  // chart + mystery card
  ...wordPops(T.h2, 3, 0.08, 0, 0.028), ['pop', T.h2Late, 1108.73, 0.055, 0],
  ['riser', T.h1Out[0] - 0.5, T.h2Late, 0.04], ['whoosh', T.wheel[0], 0.5, 0.045],
  ['bell', T.drop[1], 932.33, 0.05, 1.8, 0], ['glitter', T.drop[1], T.drop[1] + 0.7],
  ...wordPops(T.sub2, 4, 0.08, 2, 0.022),
  // find someone who stays
  ['whoosh', T.beach[0], 0.45, 0.035],
  ...wordPops(T.h3, 3, 0.08, 1, 0.03), ['pop', T.h3Late, 1108.73, 0.055, 0], ['pluck', T.h3Late, 932.33, 0.05, 0.7, 0],
  ['pop', T.people[0], 466.16, 0.05, -0.4], ['pop', T.people[1], 554.37, 0.05, 0.4],
  ['glitter', T.sun[0] + 0.3, T.sun[1]],
  ['whoosh', T.arc[0], 0.4, 0.03], ['bell', T.heart, 932.33, 0.05, 1.4, 0], ['bell', T.heart + 0.08, 1396.91, 0.035, 1.4, 0.2], ['glitter', T.heart, T.heart + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...endcardCues(STORY_END),
]
