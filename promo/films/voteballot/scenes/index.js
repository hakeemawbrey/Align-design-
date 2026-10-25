// voteballot (15 s, vertical) — "Launch city #2 is up to you."  Story 0–10.6, then the shared end card.
//   0.00–2.80  HOOK: a ballot card (Align-card style: gold rim, seed-of-life watermark) drops in and slams down on the
//              downbeat; ten city chips pop onto it on the eighth notes. "Launch city #2 | is up to *you.*"
//   2.86–4.50  "Tap your city." A pictogram finger slides in and taps one chip; it fills gold with a check, lifts off
//              the ballot and turns into a star. The ballot sinks away.
//   4.40–6.70  "Every vote | is a *star.*" Every other chip launches as a star too, and more stars rise from all over
//              the bottom of the frame and settle into the sky, twinkling. (No counts, no leader.)
//   6.76–8.65  [card cut] "Card *first.* | Face last." The mystery card (card-profile-3, aura veil) drops in on a glow,
//              a ring of zodiac glyphs around it.
//   8.72–10.45 "Pick the | next *sky.*" Ten equal candidate stars on a ring, each labelled; a pulse runs round them,
//              constellation lines join them all, and a ballot box in the middle gets a gold check (your vote, no city).
//   10.5→      plain sky only (SKY_H + grain); the end card ("come" + the logo, VOTE FOR YOUR CITY) takes over at 10.6.
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { BONE, GOLD, PINK, CYAN, INTER, MONO, GLYPH_FONT, D2R, rgba, mixHex, pop01, outScale, outK, glowStroke, makeBurst, drawBurst, popText } from './kit.js'

export const DURATION = 15
export const CTA = 'VOTE FOR YOUR CITY'
const END = DURATION - ENDCARD_LEN          // 10.6: the end card takes over here
const SETTLE = 10.5                          // from here only the plain sky H is on screen
const BEAT = 60 / 108, B0 = 0.6
const beat = n => +(B0 + n * BEAT).toFixed(3)
const INK = '#1a1033', LAV = '#d9cdf0'

const T = {
  drop: 0.1, land: beat(0), hookA: 0.22, hook: 0.5, hookLast: beat(1), hookOut: [2.62, 2.8],
  chips: 0.98, chipGap: BEAT / 4,
  tapSub: 2.86, fingerIn: 2.9, tap: beat(5), fingerOut: 3.62, lift: 3.86, morph: [3.86, 4.3], subOut: [4.22, 4.4],
  ballotOut: [4.3, 4.75], launch: 4.42, every: 4.72, everyLast: beat(8) + 0.05, rise: [4.7, 6.1], starsOut: [6.38, 6.7], everyOut: [6.5, 6.68],
  card: 6.8, cardLand: beat(12), cardHead: 6.86, ring: 7.4, cardOut: 8.42, cardHeadOut: [8.46, 8.64],
  pick: 8.74, pickLast: 9.1, ring2: 8.8, wave: 9.2, lines: [9.35, 9.9], check: 9.95, pickOut: [10.22, 10.45], out: [10.08, 10.46],
}

// ── the ballot card
const BAL = { cx: 540, cy: 1130, w: 780, h: 960, r: 56 }
const CITIES = ['New York', 'LA', 'Chicago', 'Austin', 'Miami', 'Atlanta', 'Nashville', 'Seattle', 'Dallas', 'New Orleans']
const CHIP = { w: 336, h: 104, colDx: 180, y0: 870, dy: 148 }
const chipPos = i => ({ x: BAL.cx + (i % 2 ? 1 : -1) * CHIP.colDx, y: CHIP.y0 + Math.floor(i / 2) * CHIP.dy })
const PICK = 5                                // the chip the finger taps (Atlanta, right column, row 3) — just one voter's pick
const chipAt = i => T.chips + i * T.chipGap
const HERO = { x: 540, y: 700, R: 92 }        // where the tapped chip settles as a star

// rising stars: a deterministic scatter that avoids the headline band and the hero star
const RISERS = (() => {
  const r = rng(4242), out = []
  let guard = 0
  while (out.length < 40 && guard++ < 2000) {
    const x = 110 + r() * 860, y = 600 + r() * 1180
    if (Math.hypot(x - HERO.x, y - HERO.y) < 190) continue
    if (out.some(o => Math.hypot(o.x - x, o.y - y) < 115)) continue
    out.push({ x, y, x0: x + (r() - 0.5) * 260, at: lerp(T.rise[0], T.rise[1], out.length / 40) + r() * 0.12, size: 20 + Math.round(r() * 3) * 4, kind: Math.floor(r() * 4), col: [GOLD, BONE, LAV, '#ffd98a', PINK, CYAN][Math.floor(r() * 6)], ph: r() * 6.28 })
  }
  return out
})()

// the ring of ten candidate stars (equal size, equal light)
const RING = { cx: 540, cy: 1150, rx: 360, ry: 420 }
const ringPt = i => { const a = -Math.PI / 2 + i * (Math.PI * 2 / 10); return { x: RING.cx + Math.cos(a) * RING.rx, y: RING.cy + Math.sin(a) * RING.ry, a } }

function starPath(x, R, r = R * 0.46) {
  x.beginPath()
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) }
  x.closePath()
}
function seedOfLife(x, cx, cy, r) {
  x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; x.beginPath(); x.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r, 0, Math.PI * 2); x.stroke() }
  x.beginPath(); x.arc(cx, cy, r * 2, 0, Math.PI * 2); x.stroke()
}

async function build(stage) {
  try {
    await Promise.all(["800 150px Inter", "800 104px Inter", "700 62px Inter", "700 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 72px 'EB Garamond'", "bold 66px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const card = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-profile-3.png' })
  let cardBmp = null
  if (card) { const c = document.createElement('canvas'); c.width = 900; c.height = Math.round(900 * card.height / card.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(card, 0, 0, c.width, c.height); cardBmp = c }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type
  const H0a = popText(root, 'Launch city #2', { top: 178, size: 104, weight: 800, at: T.hookA, gap: 0.09 })
  const H0 = popText(root, 'is up to *you.*', { top: 296, size: 140, weight: 800, accentSize: 200, at: T.hook, gap: 0.1, accentColor: GOLD, lastAt: T.hookLast, wobble: true })
  const S1 = popText(root, 'Tap your *city.*', { top: 1690, size: 74, weight: 800, accentSize: 96, at: T.tapSub, gap: 0.1, accentColor: PINK })
  const H1 = popText(root, 'Every vote | is a *star.*', { top: 200, size: 136, weight: 800, accentSize: 196, at: T.every, gap: 0.1, accentColor: GOLD, lastAt: T.everyLast, wobble: true })
  const H2 = popText(root, 'Card *first.* | Face last.', { top: 200, size: 128, weight: 800, accentSize: 150, at: T.cardHead, gap: 0.1, accentColor: GOLD })
  const H3 = popText(root, 'Pick the | next *sky.*', { top: 196, size: 150, weight: 800, accentSize: 210, at: T.pick, gap: 0.1, accentColor: GOLD, lastAt: T.pickLast, wobble: true })
  const TEXTS = [[H0a, T.hookOut], [H0, T.hookOut], [S1, T.subOut], [H1, T.everyOut], [H2, T.cardHeadOut], [H3, T.pickOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(900 + k, n, d)
  const B_LAND = B(1, 14, 300), B_YOU = B(2, 10, 190), B_CHIP = CITIES.map((_, i) => B(10 + i, 6, 90)), B_TAP = B(3, 12, 170)
  const B_HERO = B(4, 12, 200), B_STAR = B(5, 10, 170), B_CARD = B(6, 14, 260), B_SKY = B(7, 10, 200), B_CHECK = B(8, 14, 220)
  const B_RISE = RISERS.map((_, i) => B(40 + i, 5, 50))

  // ── 1 + 2: the ballot, its chips, the finger
  const ballotGeom = t => {
    const dp = prog(t, T.drop, T.land)
    const since = t - T.land
    const squash = since > 0 && since < 0.32 ? 1 - 0.07 * Math.sin(Math.PI * since / 0.32) : 1
    const tapJolt = t > T.tap && t < T.tap + 0.25 ? 6 * Math.sin(Math.PI * (t - T.tap) / 0.25) : 0
    const op = prog(t, T.ballotOut[0], T.ballotOut[1])
    const cy = lerp(-700, BAL.cy, easeOutBack(dp, 1.3)) + tapJolt + 1300 * ease.inCubic(op) + (dp >= 1 ? 6 * Math.sin((t - T.land) * 2.1) : 0)
    const rot = lerp(-10, 0, ease.outCubic(dp)) + 7 * ease.inCubic(op)
    return { cy, rot, squash, alpha: clamp(dp * 4) * (1 - prog(op, 0.75, 1)) }
  }
  function drawChip(i, cx, cy, s, t, filled = 0, checkK = 0, alpha = 1) {
    x.save(); x.translate(cx, cy); x.scale(s, s); x.globalAlpha *= alpha
    const w = CHIP.w, h = CHIP.h
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
    x.fillStyle = mixHex('#2c1a5e', GOLD, filled); x.fill()
    glowStroke(x, filled > 0.5 ? '#fff1c8' : rgba(BONE, 0.85), 4, filled > 0.5 ? 22 : 8); x.stroke(); x.shadowBlur = 0
    // check circle
    const bx = -w / 2 + 52
    x.beginPath(); x.arc(bx, 0, 25, 0, Math.PI * 2)
    x.fillStyle = filled > 0.5 ? INK : 'rgba(10,6,24,0.5)'; x.fill()
    x.strokeStyle = filled > 0.5 ? INK : rgba(GOLD, 0.9); x.lineWidth = 4; x.stroke()
    if (checkK > 0) {
      x.save(); x.strokeStyle = GOLD; x.lineWidth = 8; x.lineCap = 'round'; x.lineJoin = 'round'
      const pts = [[bx - 12, 1], [bx - 3, 11], [bx + 14, -11]]
      const L1 = Math.hypot(9, 10), L2 = Math.hypot(17, 22), L = (L1 + L2) * checkK
      x.beginPath(); x.moveTo(...pts[0])
      if (L <= L1) x.lineTo(lerp(pts[0][0], pts[1][0], L / L1), lerp(pts[0][1], pts[1][1], L / L1))
      else { x.lineTo(...pts[1]); const k = (L - L1) / L2; x.lineTo(lerp(pts[1][0], pts[2][0], k), lerp(pts[1][1], pts[2][1], k)) }
      x.stroke(); x.restore()
    }
    // name
    x.font = `700 ${CITIES[i].length > 9 ? 36 : 40}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = filled > 0.5 ? INK : BONE
    x.fillText(CITIES[i], 28, 2)
    x.restore()
  }
  function drawBallot(t) {
    if (t < T.drop || t > T.ballotOut[1] + 0.05) return
    const g = ballotGeom(t)
    if (g.alpha <= 0) return
    // glow under it
    x.save(); x.globalCompositeOperation = 'lighter'
    const gk = ease.outCubic(prog(t, T.land - 0.1, T.land + 0.4)) * g.alpha
    const gr = x.createRadialGradient(BAL.cx, g.cy, 60, BAL.cx, g.cy, 760); gr.addColorStop(0, rgba('#b98cff', 0.32 * gk)); gr.addColorStop(0.5, rgba(GOLD, 0.08 * gk)); gr.addColorStop(1, rgba('#7c74f0', 0))
    x.fillStyle = gr; x.fillRect(0, g.cy - 800, 1080, 1600); x.restore()

    x.save(); x.globalAlpha = g.alpha
    x.translate(BAL.cx, g.cy + BAL.h / 2); x.rotate(g.rot * D2R); x.scale(1 / g.squash, g.squash); x.translate(0, -BAL.h / 2)
    const L = -BAL.w / 2, Tp = -BAL.h / 2
    // body
    x.save(); x.shadowColor = 'rgba(3,1,12,0.7)'; x.shadowBlur = 50; x.shadowOffsetY = 24
    x.beginPath(); x.roundRect(L, Tp, BAL.w, BAL.h, BAL.r)
    const bg = x.createLinearGradient(0, Tp, 0, -Tp); bg.addColorStop(0, '#2d1964'); bg.addColorStop(1, '#150b33')
    x.fillStyle = bg; x.fill(); x.restore()
    // seed-of-life watermark
    x.save(); x.beginPath(); x.roundRect(L, Tp, BAL.w, BAL.h, BAL.r); x.clip()
    x.strokeStyle = rgba(GOLD, 0.11); x.lineWidth = 4; seedOfLife(x, 0, 120, 175)
    x.restore()
    // gold rim (double)
    glowStroke(x, GOLD, 7, 22); x.beginPath(); x.roundRect(L, Tp, BAL.w, BAL.h, BAL.r); x.stroke(); x.shadowBlur = 0
    x.strokeStyle = rgba(GOLD, 0.45); x.lineWidth = 2.5; x.beginPath(); x.roundRect(L + 20, Tp + 20, BAL.w - 40, BAL.h - 40, BAL.r - 18); x.stroke()
    // corner pixel stars
    x.imageSmoothingEnabled = false
    for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) drawPixelStar(x, sx * (BAL.w / 2 - 54), sy * (BAL.h / 2 - 54), 16, 1, GOLD)
    // header
    x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD
    x.fillText('BALLOT · LAUNCH CITY #2', 0, Tp + 82)
    x.strokeStyle = rgba(GOLD, 0.5); x.lineWidth = 2
    x.beginPath(); x.moveTo(-250, Tp + 126); x.lineTo(-20, Tp + 126); x.moveTo(20, Tp + 126); x.lineTo(250, Tp + 126); x.stroke()
    drawPixelStar(x, 0, Tp + 126, 12, 0, GOLD)
    x.restore()

    // chips (drawn in screen space, following the ballot)
    const dy = g.cy - BAL.cy
    CITIES.forEach((_, i) => {
      if (i === PICK && t > T.lift) return
      const p = chipPos(i)
      const k = pop01(t, chipAt(i), 0.3)
      if (k <= 0) return
      let s = k, cx = p.x, cy = p.y + dy
      // launch: the other chips flick up into stars as the ballot sinks
      const la = T.launch + (i % 2) * 0.05 + Math.floor(i / 2) * 0.06
      if (t > la) return
      const tapP = i === PICK ? prog(t, T.tap, T.tap + 0.22) : 0
      const press = i === PICK && t > T.tap - 0.04 && t < T.tap + 0.2 ? 1 - 0.08 * Math.sin(Math.PI * (t - T.tap + 0.04) / 0.24) : 1
      drawChip(i, cx, cy, s * press, t, i === PICK ? ease.outCubic(tapP) : 0, i === PICK ? prog(t, T.tap + 0.05, T.tap + 0.3) : 0, g.alpha)
      drawBurst(x, B_CHIP[i], cx, cy, t, chipAt(i), [GOLD, PINK, CYAN, LAV][i % 4], 0.5)
    })
    // tap ripple
    const pp = chipPos(PICK)
    const rp = prog(t, T.tap, T.tap + 0.5)
    if (rp > 0 && rp < 1) {
      x.save(); x.globalAlpha = (1 - rp) * 0.9; glowStroke(x, GOLD, 6, 16)
      x.beginPath(); x.roundRect(pp.x - CHIP.w / 2 - 40 * ease.outCubic(rp), pp.y + dy - CHIP.h / 2 - 40 * ease.outCubic(rp), CHIP.w + 80 * ease.outCubic(rp), CHIP.h + 80 * ease.outCubic(rp), CHIP.h); x.stroke(); x.restore()
    }
    drawBurst(x, B_TAP, pp.x, pp.y + dy, t, T.tap + 0.02, GOLD, 0.7)
  }

  // the pictogram finger (bone glow, flat fill, no detail): enters from the right, taps the chip, leaves
  function drawFinger(t) {
    if (t < T.fingerIn || t > T.fingerOut + 0.45) return
    const p = chipPos(PICK)
    const tip = { x: p.x + 128, y: p.y + 30 }
    const inP = ease.outCubic(prog(t, T.fingerIn, T.tap - 0.08)), outP = ease.inCubic(prog(t, T.fingerOut, T.fingerOut + 0.4))
    const pressD = t > T.tap - 0.1 && t < T.tap + 0.22 ? Math.sin(Math.PI * (t - T.tap + 0.1) / 0.32) : 0
    const off = 1 - inP + outP
    const ang = -32 * D2R                     // finger points up-left
    const ux = Math.sin(-ang), uy = Math.cos(ang)   // unit vector from tip back toward the wrist (down-right)
    const back = 640 * off - 26 * pressD
    x.save(); x.translate(tip.x + ux * back * 1.0 + 30 * off, tip.y + uy * back); x.rotate(ang)
    // local: tip at (0,0), finger extends down (+y)
    const shape = (grow) => {
      x.beginPath(); x.roundRect(-30 - grow, -grow, 60 + grow * 2, 230 + grow, 30 + grow)          // index finger
      x.roundRect(-40 - grow, 150 - grow, 200 + grow * 2, 210 + grow * 2, 70 + grow)               // fist / palm
      x.roundRect(10 - grow, 330 - grow, 130 + grow * 2, 700, 40 + grow)                           // wrist + arm
    }
    x.save(); x.fillStyle = BONE; x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 20; shape(7); x.fill(); x.restore()
    x.fillStyle = '#2a1d4f'; shape(0); x.fill()
    // knuckle lines + sleeve cuff
    x.strokeStyle = rgba(BONE, 0.55); x.lineWidth = 5; x.lineCap = 'round'
    for (const yy of [215, 262, 309]) { x.beginPath(); x.moveTo(52, yy); x.lineTo(148, yy); x.stroke() }
    x.fillStyle = PINK; x.beginPath(); x.roundRect(4, 410, 142, 46, 14); x.fill()
    x.restore()
  }

  // the tapped chip lifts off, shrinks and turns into a gold star at HERO; then the hero star holds and glows
  function drawHero(t) {
    if (t < T.lift || t > T.starsOut[1] + 0.05) return
    const p = chipPos(PICK)
    const m = ease.inOutCubic(prog(t, T.morph[0], T.morph[1]))
    const cx = lerp(p.x, HERO.x, m), cy = lerp(p.y, HERO.y, m) - 120 * Math.sin(Math.PI * m)
    const out = outScale(t, T.starsOut[0] + 0.1, 0.3)
    if (m < 0.55) {
      const s = lerp(1, 0.25, m / 0.55)
      drawChip(PICK, cx, cy, s, t, 1, 1, 1 - prog(m, 0.35, 0.55))
    }
    // trail
    if (m > 0 && m < 1) {
      x.save(); x.globalCompositeOperation = 'lighter'
      for (let j = 1; j <= 6; j++) {
        const mj = Math.max(0, m - j * 0.05), tx = lerp(p.x, HERO.x, mj), ty = lerp(p.y, HERO.y, mj) - 120 * Math.sin(Math.PI * mj)
        x.globalAlpha = 0.5 * (1 - j / 7); x.fillStyle = GOLD; x.beginPath(); x.arc(tx, ty, 22 * (1 - j / 8), 0, Math.PI * 2); x.fill()
      }
      x.restore()
    }
    const sk = easeOutBack(prog(m, 0.4, 1), 2.4) * out
    if (sk > 0) {
      const since = t - T.morph[1]
      const pulse = 1 + 0.05 * Math.sin(t * 5)
      x.save(); x.translate(cx, cy); x.globalCompositeOperation = 'lighter'
      const gr = x.createRadialGradient(0, 0, 10, 0, 0, 380 * sk); gr.addColorStop(0, rgba(GOLD, 0.55)); gr.addColorStop(0.45, rgba(PINK, 0.14)); gr.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = gr; x.beginPath(); x.arc(0, 0, 380 * sk, 0, Math.PI * 2); x.fill()
      x.rotate(t * 0.35)
      for (let i = 0; i < 8; i++) {
        x.rotate(Math.PI / 4)
        const rg = x.createLinearGradient(0, 0, 0, -420); rg.addColorStop(0, rgba(GOLD, 0.2 * sk)); rg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = rg; x.beginPath(); x.moveTo(-10, 0); x.lineTo(-40, -420); x.lineTo(40, -420); x.lineTo(10, 0); x.fill()
      }
      x.restore()
      x.save(); x.translate(cx, cy); x.rotate((since > 0 ? 8 * Math.sin(since * 10) * Math.exp(-since * 3) : 0) * D2R); x.scale(sk * pulse, sk * pulse)
      starPath(x, HERO.R); x.fillStyle = GOLD; x.shadowColor = GOLD; x.shadowBlur = 44; x.fill()
      glowStroke(x, BONE, 7, 16); x.stroke(); x.shadowBlur = 0
      starPath(x, HERO.R * 0.5); x.fillStyle = mixHex(GOLD, '#fff6d8', 0.6); x.fill()
      x.restore()
    }
    drawBurst(x, B_HERO, HERO.x, HERO.y, t, T.morph[1] - 0.05, GOLD, 0.8)
  }

  // the other chips launch as stars, and more stars rise from the bottom edge, settle and twinkle
  function drawRisers(t) {
    if (t < T.launch || t > T.starsOut[1] + 0.05) return
    const outAll = t > T.starsOut[0] ? 1 - ease.inCubic(prog(t, T.starsOut[0], T.starsOut[1])) : 1
    x.save(); x.imageSmoothingEnabled = false
    // launched chips → stars flying to a spot in the sky
    CITIES.forEach((_, i) => {
      if (i === PICK) return
      const la = T.launch + (i % 2) * 0.05 + Math.floor(i / 2) * 0.06
      const g = ballotGeom(la), p0 = chipPos(i), from = { x: p0.x, y: p0.y + g.cy - BAL.cy }
      const dest = RISERS[i * 3 % RISERS.length]
      const f = ease.outCubic(prog(t, la, la + 0.7))
      if (f <= 0) return
      const px = lerp(from.x, dest.x, f), py = lerp(from.y, dest.y, f) - 160 * Math.sin(Math.PI * f)
      const tw = 0.75 + 0.25 * Math.sin(t * 6 + i)
      x.globalAlpha = clamp(f * 5) * outAll * tw
      drawPixelStar(x, px, py, f < 1 ? 28 : 24, i % 4, [GOLD, PINK, CYAN, LAV][i % 4])
      drawBurst(x, B_CHIP[i], from.x, from.y, t, la, GOLD, 0.45)
    })
    // risers from below
    RISERS.forEach((s, i) => {
      if ([0, 3, 6, 9, 12, 15, 18, 21, 24].includes(i)) return   // these spots belong to the launched chips
      const f = ease.outCubic(prog(t, s.at, s.at + 0.85))
      if (f <= 0) return
      const px = lerp(s.x0, s.x, f), py = lerp(2000, s.y, f)
      const tw = f >= 1 ? 0.7 + 0.3 * Math.sin(t * 5 + s.ph) : 1
      // trail
      if (f < 1) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const tr = x.createLinearGradient(px, py, px - (s.x - s.x0) * 0.1, py + 220); tr.addColorStop(0, rgba(s.col === BONE ? GOLD : s.col, 0.5 * (1 - f))); tr.addColorStop(1, rgba(GOLD, 0))
        x.strokeStyle = tr; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(px, py); x.lineTo(px - (s.x - s.x0) * 0.1, py + 220); x.stroke()
        x.restore()
      }
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = outAll * tw * 0.8
      const hg = x.createRadialGradient(px, py, 2, px, py, s.size * 3.2); hg.addColorStop(0, rgba(s.col === BONE ? GOLD : s.col, 0.45)); hg.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = hg; x.beginPath(); x.arc(px, py, s.size * 3.2, 0, Math.PI * 2); x.fill(); x.restore()
      x.globalAlpha = outAll * tw
      drawPixelStar(x, px, py, s.size, s.kind, s.col)
      if (f >= 1) drawBurst(x, B_RISE[i], s.x, s.y, t, s.at + 0.85, s.col, 0.4)
    })
    x.restore()
  }

  // ── 3: the mystery card on its aura, a ring of zodiac glyphs around it
  const CARD = { cx: 540, cy: 1130, h: 1000 }
  function drawMystery(t) {
    if (t < T.card || t > T.cardOut + 0.5) return
    const out = outScale(t, T.cardOut, 0.32)
    if (out <= 0) return
    const dp = prog(t, T.card, T.cardLand)
    const y = lerp(-700, CARD.cy, easeOutBack(dp, 1.4)) + 10 * Math.sin((t - T.cardLand) * 2.2) * clamp((t - T.cardLand) * 2)
    const since = t - T.cardLand
    const squash = since > 0 && since < 0.35 ? 1 - 0.09 * Math.sin(Math.PI * since / 0.35) : 1
    const ak = ease.outCubic(prog(t, T.cardLand - 0.15, T.cardLand + 0.5)) * out
    if (ak > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const R = 620 * (0.85 + 0.15 * ak) * (1 + 0.04 * Math.sin(t * 3))
      const g = x.createRadialGradient(CARD.cx, CARD.cy, 40, CARD.cx, CARD.cy, R)
      g.addColorStop(0, rgba('#c58cff', 0.55 * ak)); g.addColorStop(0.4, rgba('#7c5cf0', 0.24 * ak)); g.addColorStop(1, rgba('#7c74f0', 0))
      x.fillStyle = g; x.beginPath(); x.arc(CARD.cx, CARD.cy, R, 0, Math.PI * 2); x.fill()
      x.translate(CARD.cx, CARD.cy); x.rotate(t * 0.25)
      for (let i = 0; i < 12; i++) {
        x.rotate(Math.PI / 6)
        const rg = x.createLinearGradient(0, 0, 0, -760); rg.addColorStop(0, rgba(GOLD, 0.15 * ak)); rg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = rg; x.beginPath(); x.moveTo(-18, 0); x.lineTo(-70, -760); x.lineTo(70, -760); x.lineTo(18, 0); x.fill()
      }
      x.restore()
    }
    const RR = 445
    const ringK = ease.outCubic(prog(t, T.ring, T.ring + 0.5)) * out
    if (ringK > 0) { x.save(); glowStroke(x, BONE, 3, 10); x.globalAlpha = 0.45 * ringK; x.beginPath(); x.arc(CARD.cx, CARD.cy, RR, 0, Math.PI * 2); x.stroke(); x.restore() }
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `bold 66px ${GLYPH_FONT}`
    SIGNS.forEach((s, i) => {
      const k = pop01(t, T.ring + i * 0.045, 0.36) * out
      if (k <= 0) return
      const a = (i * 30 + 15) * D2R + t * 0.18
      x.save(); x.translate(CARD.cx + Math.cos(a) * RR, CARD.cy + Math.sin(a) * RR); x.scale(k, k); x.globalAlpha = clamp(k * 2)
      x.shadowColor = s.color; x.shadowBlur = 22; x.fillStyle = s.color; x.fillText(s.glyph + '︎', 0, 0); x.restore()
    })
    x.restore()
    if (cardBmp) {
      const h = CARD.h * out, w = h * cardBmp.width / cardBmp.height
      x.save(); x.translate(CARD.cx, y - (1 - out) * 200 + CARD.h / 2); x.rotate(lerp(-14, 0, ease.outCubic(dp)) * D2R + (1 - out) * 0.2)
      x.scale(1 / squash, squash); x.translate(0, -CARD.h / 2); x.globalAlpha = clamp(out * 2)
      x.drawImage(cardBmp, -w / 2, -h / 2, w, h)
      x.restore()
    }
    drawBurst(x, B_CARD, CARD.cx, CARD.cy, t, T.cardLand, GOLD, 0.9)
  }

  // ── 4: ten equal candidate stars on a ring; a pulse runs round, lines join them, the centre ballot box gets a check
  function drawSkyRing(t) {
    if (t < T.ring2 || t > T.out[1] + 0.02) return
    const out = 1 - ease.inCubic(prog(t, T.out[0], T.out[1]))
    // constellation lines (all ten joined in a loop, no winner)
    const lp = prog(t, T.lines[0], T.lines[1])
    if (lp > 0) {
      x.save(); glowStroke(x, rgba(GOLD, 0.8), 3.5, 12); x.globalAlpha = 0.75 * out
      const segs = 10 * lp
      x.beginPath()
      for (let j = 0; j <= Math.floor(segs) && j <= 10; j++) {
        const a = ringPt(j % 10), b = ringPt((j + 1) % 10), f = Math.min(1, segs - j)
        if (j === 0) x.moveTo(a.x, a.y)
        if (f > 0) x.lineTo(lerp(a.x, b.x, f), lerp(a.y, b.y, f))
      }
      x.stroke(); x.restore()
    }
    x.save(); x.imageSmoothingEnabled = false
    for (let i = 0; i < 10; i++) {
      const p = ringPt(i)
      const k = pop01(t, T.ring2 + i * 0.05, 0.34) * out
      if (k <= 0) continue
      const wv = Math.max(0, 1 - Math.abs(((t - T.wave) / 0.06) - i) / 1.4) * (t > T.wave && t < T.wave + 1.0 ? 1 : 0)
      const tw = 0.8 + 0.2 * Math.sin(t * 5 + i * 1.3)
      x.save(); x.globalCompositeOperation = 'lighter'
      const gr = x.createRadialGradient(p.x, p.y, 2, p.x, p.y, 90); gr.addColorStop(0, rgba(GOLD, (0.35 + 0.35 * wv) * k)); gr.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = gr; x.beginPath(); x.arc(p.x, p.y, 90, 0, Math.PI * 2); x.fill(); x.restore()
      x.globalAlpha = clamp(k * 2) * tw
      drawPixelStar(x, p.x, p.y, Math.round((24 + 8 * wv) * Math.min(1, k) / 4) * 4, 1, GOLD)
      // label
      x.globalAlpha = clamp(k * 2) * 0.95
      x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const lab = CITIES[i].toUpperCase(), tw2 = x.measureText(lab).width
      const below = p.y > RING.cy - 60
      const ly = p.y + (Math.abs(Math.cos(p.a)) > 0.95 ? (below ? 56 : -56) : (Math.sin(p.a) > 0 ? 56 : -52))
      const lx = clamp(p.x, 80 + tw2 / 2, 1000 - tw2 / 2)
      x.fillStyle = 'rgba(8,5,20,0.55)'; x.beginPath(); x.roundRect(lx - tw2 / 2 - 12, ly - 22, tw2 + 24, 44, 22); x.fill()
      x.fillStyle = BONE; x.fillText(lab, lx, ly + 1)
    }
    x.restore()
    // the centre ballot box + gold check
    const bk = pop01(t, T.lines[1] - 0.25, 0.36) * out
    if (bk > 0) {
      x.save(); x.translate(RING.cx, RING.cy); x.scale(bk, bk)
      x.globalCompositeOperation = 'lighter'
      const gr = x.createRadialGradient(0, 0, 10, 0, 0, 300); gr.addColorStop(0, rgba(GOLD, 0.35 * prog(t, T.check, T.check + 0.2))); gr.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = gr; x.beginPath(); x.arc(0, 0, 300, 0, Math.PI * 2); x.fill()
      x.globalCompositeOperation = 'source-over'
      x.beginPath(); x.roundRect(-110, -110, 220, 220, 44); x.fillStyle = '#21124a'; x.fill()
      glowStroke(x, GOLD, 8, 20); x.stroke(); x.shadowBlur = 0
      x.strokeStyle = rgba(GOLD, 0.4); x.lineWidth = 2.5; x.beginPath(); x.roundRect(-92, -92, 184, 184, 32); x.stroke()
      const ck = ease.outCubic(prog(t, T.check, T.check + 0.28))
      if (ck > 0) {
        const pts = [[-58, 4], [-16, 46], [62, -50]]
        const L1 = Math.hypot(42, 42), L2 = Math.hypot(78, 96), L = (L1 + L2) * ck
        glowStroke(x, GOLD, 26, 26)
        x.beginPath(); x.moveTo(...pts[0])
        if (L <= L1) x.lineTo(lerp(pts[0][0], pts[1][0], L / L1), lerp(pts[0][1], pts[1][1], L / L1))
        else { x.lineTo(...pts[1]); const k = (L - L1) / L2; x.lineTo(lerp(pts[1][0], pts[2][0], k), lerp(pts[1][1], pts[2][1], k)) }
        x.stroke()
      }
      x.restore()
    }
    drawBurst(x, B_CHECK, RING.cx, RING.cy, t, T.check + 0.2, GOLD, 0.8)
    drawBurst(x, B_SKY, 540, 470, t, T.pickLast + 0.1, GOLD, 0.7)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < SETTLE) {
        drawBallot(t); drawRisers(t); drawHero(t); drawFinger(t)
        drawBurst(x, B_LAND, BAL.cx, BAL.cy - BAL.h / 2, t, T.land, GOLD, 0.8)
        drawBurst(x, B_YOU, 760, 420, t, T.hookLast + 0.1, GOLD, 0.7)
        drawBurst(x, B_STAR, 760, 330, t, T.everyLast + 0.1, GOLD, 0.7)
        drawMystery(t); drawSkyRing(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.2)))
      for (const [h, o] of TEXTS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut candidates (cardfx keeps the middle one: 6.76):
//   4.62 ballot gone → "Every vote is a star." · 6.76 stars out (6.7) → the mystery card drops (6.8)
//   8.70 card out (8.64) → "Pick the next sky." (8.74) · end card flips at 10.6
const CUTS = [{ t: 4.62, kind: 'flip' }, { t: 6.76, kind: 'deal' }, { t: 8.7, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END, cta: CTA }),
  cardFrame({ start: 0, end: END, label: 'LAUNCH CITY #2 · VOTE' }), cardCuts(CUTS)]

// ── cues (E major pentatonic pops on the 108 bpm grid; the house score is arranged by the style engine)
const NOTE = [329.63, 369.99, 415.3, 493.88, 554.37, 659.25, 739.99, 830.61, 987.77, 1108.73]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: the ballot slams down, chips pop on
  ['whoosh', T.drop, 0.45, 0.045],
  ['pop', T.land, 329.63, 0.07, 0], ['pluck', T.land, 659.25, 0.05, 0.7, 0], ['glitter', T.land, T.land + 0.6],
  ...wordPops(T.hookA, 3, 0.09, 0),
  ...wordPops(T.hook, 3, 0.1, 2),
  ['pop', T.hookLast, 987.77, 0.06, 0], ['bell', T.hookLast + 0.03, 1318.51, 0.035, 1.2, 0],
  ...CITIES.map((_, i) => ['pop', r3(chipAt(i)), NOTE[i], 0.04, (i % 2 ? 0.3 : -0.3)]),
  // the tap
  ...wordPops(T.tapSub, 3, 0.1, 3, 0.026),
  ['whoosh', T.fingerIn, 0.35, 0.03],
  ['tick', T.tap, 0.06], ['pop', T.tap, 659.25, 0.065, 0.2], ['pluck', T.tap + 0.05, 987.77, 0.05, 0.6, 0.2], ['bell', T.tap + 0.1, 1318.51, 0.035, 1.2, 0.2],
  ['whoosh', T.fingerOut, 0.3, 0.025],
  ['riser', T.lift - 0.1, T.morph[1], 0.035], ['bell', T.morph[1], 1661.22, 0.04, 1.6, 0], ['glitter', T.morph[1] - 0.05, T.morph[1] + 0.6],
  // every vote is a star
  ['whoosh', T.ballotOut[0], 0.45, 0.035],
  ...CITIES.filter((_, i) => i !== PICK).map((_, j) => ['pop', r3(T.launch + j * 0.055), NOTE[(j + 4) % NOTE.length] * 2, 0.022, (j % 2 ? 0.35 : -0.35)]),
  ...wordPops(T.every, 4, 0.1, 1),
  ['pop', T.everyLast, 1108.73, 0.055, 0], ['bell', T.everyLast + 0.04, 1661.22, 0.035, 1.4, 0],
  ['glitter', T.rise[0], T.rise[1] + 0.6],
  ...RISERS.filter((_, i) => i % 4 === 1).map((s, j) => ['bell', r3(s.at + 0.85), NOTE[(j * 3) % NOTE.length] * 2, 0.014, 0.8, (s.x - 540) / 600]),
  ['whoosh', T.starsOut[0], 0.35, 0.03],
  // card first, face last
  ['whoosh', T.card, 0.42, 0.04],
  ['pop', T.cardLand, 329.63, 0.07, 0], ['pluck', T.cardLand, 659.25, 0.055, 0.8, 0], ['bell', T.cardLand + 0.05, 830.61, 0.04, 1.6, 0], ['glitter', T.cardLand, T.cardLand + 0.7],
  ...wordPops(T.cardHead, 4, 0.1, 2, 0.026),
  ...SIGNS.map((_, i) => ['pop', r3(T.ring + i * 0.045), NOTE[i % NOTE.length] * 1.5, 0.014, (i % 2 ? 0.25 : -0.25)]),
  ['whoosh', T.cardOut, 0.4, 0.035],
  // pick the next sky
  ...wordPops(T.pick, 3, 0.1, 3),
  ['pop', T.pickLast, 987.77, 0.06, 0],
  ...Array.from({ length: 10 }, (_, i) => ['pop', r3(T.ring2 + i * 0.05), NOTE[i] * 2, 0.016, (ringPt(i).x - 540) / 600]),
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.wave + i * 0.06), 0.02]),
  ['riser', T.lines[0] - 0.2, T.check, 0.035],
  ['pop', T.check, 659.25, 0.065, 0], ['pluck', T.check, 329.63, 0.055, 0.9, 0], ['bell', T.check + 0.04, 987.77, 0.045, 2.0, -0.2], ['bell', T.check + 0.1, 1318.51, 0.045, 2.0, 0.2],
  ['glitter', T.check, T.check + 0.7],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
