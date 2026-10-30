// srl05zodiac (20 s vertical, Star Talk Remix of the L05 "Zodiac" loop) · story 0–15.6, then the shared end card.
// The loop's image: the 12-sign wheel gliding a quarter turn into each bar, so the four cardinal signs (Aries, Cancer,
// Libra, Capricorn) take the 12 o'clock seat in turn, spectrum bars pulsing between the glyphs.
// Here the wheel is a turntable, THE STARS is the DJ (pixel headphones), and the four cardinal stars ride its rim.
//   0.00–2.70  "Spin the | *zodiac.*"  ♈ Aries dances in the top seat. DJ: "every bar, a new sign gets the *top.*"
//   2.82       quarter turn → ♋ Cancer takes the top and happy-cries. "Cancer's up. | *Crying.*"
//   5.04       quarter turn → ♎ Libra takes the top and can't pick a direction to dance. "Libra can't | *decide.*"
//   7.27       quarter turn → ♑ Capricorn takes the top. "Capricorn | won't *move.*"  ♑: "this seat is mine.
//              I *earned* it."  The next turn (8.66–9.49) strains, shakes and snaps back: Capricorn is gripping.
//              DJ: "babe. it's a *wheel.*"  11.2: the DJ scratches, the wheel turns anyway (11.71),
//              Capricorn slides off sideways, wide-eyed. Aries is back on top.
//  12.65 cut → "Love is | taking *turns.*"  The wheel keeps turning, every cardinal star happy (Capricorn too).
//              Everything pops out by 15.5; the end card takes over at 15.6.
// One canvas (sky + wheel + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const TAU = Math.PI * 2
const BEAT = 60 / 108, BAR = 4 * BEAT
const beatAt = n => 0.6 + n * BEAT
const MONO = "'Space Mono', ui-monospace, monospace"

// ── the timeline (downbeats 0.6, 2.82, 5.04, 7.27, 9.49, 11.71, 13.93)
const T = {
  h0: 0.15, h0Land: 0.6, h0Out: [2.55, 2.72],
  open: 1.7, l1: 1.9,
  turns: [2.822, 5.044, 7.267],                // quarter turns land here (Cancer, Libra, Capricorn)
  hA: 2.86, hALand: 3.3, hAOut: [4.88, 5.02],
  hB: 5.08, hBLand: 5.5, hBOut: [7.1, 7.24],
  hC: 7.3, hCLand: 7.75, hCOut: [11.5, 11.68], l2: 7.45,
  strain: [8.66, 9.6], l3: 10.2,
  scratch: 11.15, big: 11.711, close: 12.55,
  cut: 12.65,
  h4: 12.7, h4Land: 13.15, turn4: 13.933, wink: [14.3, 14.7],
  h4Out: [15.2, 15.45], out: [15.05, 15.5],
}
const DJ = 'THE STARS', CAPT = '♑ CAPRICORN STAR'
const LINES = [
  { t: T.l1, speaker: DJ, text: 'every bar, a new sign gets the *top.*', color: GOLD },
  { t: T.l2, speaker: CAPT, text: 'this seat is mine. I *earned* it.', color: signStar('capricorn').color },
  { t: T.l3, speaker: DJ, text: "babe. it's a *wheel.*", color: GOLD },
]
const CPS = 30
const DJ_HOPS = talkHops(LINES, DJ, { cps: CPS })
const CAP_HOPS = talkHops(LINES, CAPT, { cps: CPS })

// ── the wheel
const CX = 540, CY = 960
const R_G = 448, R_S = 334, R_DISC = 300
const CARD = ['aries', 'cancer', 'libra', 'capricorn'].map(id => ({ id, i: SIGNS.findIndex(s => s.id === id), ...signStar(id) }))
const GLIDE = 1.5 * BEAT
/** wheel rotation θ: +π/2 per quarter turn (θ = 0 → Aries on top). */
function wheelRot(t) {
  let th = 0
  for (const L of T.turns) th += (Math.PI / 2) * ease.inOutCubic(prog(t, L - GLIDE, L))
  // the strained turn: it starts, shakes, snaps back (Capricorn is holding on)
  const s = prog(t, ...T.strain)
  if (s > 0 && s < 1) th += 0.16 * Math.sin(Math.PI * s) + 0.03 * Math.sin(t * 70) * Math.sin(Math.PI * s)
  // the big one: the DJ scratches it back a touch, then sends it
  const sc = prog(t, T.scratch, T.scratch + 0.22)
  if (sc > 0 && t < T.big - 0.35) th -= 0.12 * Math.sin(Math.PI * sc)
  th += (Math.PI / 2) * easeOutBack(prog(t, T.big - 0.35, T.big + 0.1), 2.2)
  th += (Math.PI / 2) * ease.inOutCubic(prog(t, T.turn4 - GLIDE, T.turn4))
  return th
}
/** screen angle of sign index i (0 = Aries) */
const angOf = (i, th) => -Math.PI / 2 + i * TAU / 12 - th
const topness = a => Math.max(0, Math.cos(a + Math.PI / 2))   // 1 at 12 o'clock

const DJPOS = { x: 905, y: 1405, size: 190 }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }
/** house kick: 1 on each beat, decaying */
const kick = t => t < 0.6 ? 0 : Math.exp(-((t - 0.6) % BEAT) * 9)

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "500 44px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'Spin the | *zodiac.*', { top: 150, size: 120, accentSize: 190, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1 })
  const HA = popText(root, "Cancer's up. | *Crying.*", { top: 150, size: 112, accentSize: 170, at: T.hA, late: 1, lateAt: T.hALand, wobble: true, gap: 0.1, accentColor: signStar('cancer').color })
  const HB = popText(root, "Libra can't | *decide.*", { top: 150, size: 112, accentSize: 170, at: T.hB, late: 1, lateAt: T.hBLand, wobble: true, gap: 0.1, accentColor: signStar('libra').color })
  const HC = popText(root, "Capricorn | won't *move.*", { top: 150, size: 112, accentSize: 160, at: T.hC, late: 1, lateAt: T.hCLand, wobble: true, gap: 0.1, accentColor: signStar('capricorn').color })
  const H4 = popText(root, 'Love is | taking *turns.*', { top: 150, size: 116, accentSize: 170, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, gap: 0.1 })
  const HEADS = [[H0, T.h0Out], [HA, T.hAOut], [HB, T.hBOut], [HC, T.hCOut], [H4, T.h4Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1505, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK, '#7fe0ff']) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // ── the turntable wheel: vinyl disc, spectrum bars, glyph ring, a gold "top seat" marker
  function drawWheel(t, th, ok) {
    const k = kick(t)
    x.save(); x.globalAlpha = ok
    // outer glow
    const g = x.createRadialGradient(CX, CY, R_DISC * 0.6, CX, CY, R_G + 70)
    g.addColorStop(0, 'rgba(120,70,200,0)'); g.addColorStop(0.7, rgba('#8a5cf0', 0.16 + 0.1 * k)); g.addColorStop(1, 'rgba(120,70,200,0)')
    x.fillStyle = g; x.beginPath(); x.arc(CX, CY, R_G + 70, 0, TAU); x.fill()
    // glyph ring + ticks
    x.strokeStyle = rgba(BONE, 0.35); x.lineWidth = 2
    x.beginPath(); x.arc(CX, CY, R_G + 34, 0, TAU); x.stroke()
    x.beginPath(); x.arc(CX, CY, R_G - 34, 0, TAU); x.stroke()
    for (let i = 0; i < 12; i++) {
      const a = angOf(i, th) + TAU / 24
      x.beginPath(); x.moveTo(CX + Math.cos(a) * (R_G - 34), CY + Math.sin(a) * (R_G - 34)); x.lineTo(CX + Math.cos(a) * (R_G + 34), CY + Math.sin(a) * (R_G + 34)); x.stroke()
    }
    x.font = `500 46px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    SIGNS.forEach((s, i) => {
      const a = angOf(i, th), tp = topness(a) ** 8
      x.fillStyle = tp > 0.3 ? rgba(s.color, 0.6 + 0.4 * tp) : rgba(BONE, 0.55)
      x.fillText(s.glyph + '︎', CX + Math.cos(a) * R_G, CY + Math.sin(a) * R_G + 2)
    })
    // spectrum bars between the disc and the stars: 48 bars, pulsing on the kick
    for (let b = 0; b < 48; b++) {
      const a = -Math.PI / 2 + b * TAU / 48 - th
      const n = 0.5 + 0.5 * Math.sin(t * 7.1 + b * 1.7) * Math.sin(t * 3.3 + b * 0.6)
      const len = 10 + (18 + 30 * n) * (0.45 + 0.9 * k)
      const col = SIGNS[Math.floor(b / 4) % 12].color
      x.save(); x.translate(CX, CY); x.rotate(a + Math.PI / 2)
      x.fillStyle = rgba(col, 0.55 + 0.35 * k)
      for (let c = 0; c < len; c += 9) x.fillRect(-5, -(R_DISC + 8 + c) - 7, 10, 7)
      x.restore()
    }
    // the vinyl disc
    x.fillStyle = '#120a26'; x.beginPath(); x.arc(CX, CY, R_DISC, 0, TAU); x.fill()
    x.strokeStyle = rgba(BONE, 0.08); x.lineWidth = 2
    for (let r = R_DISC - 18; r > 110; r -= 14) { x.beginPath(); x.arc(CX, CY, r, 0, TAU); x.stroke() }
    // a sheen that turns with the record
    x.save(); x.translate(CX, CY); x.rotate(-th * 1.0 - t * 0.6)
    const sh = x.createLinearGradient(-R_DISC, 0, R_DISC, 0)
    sh.addColorStop(0.3, 'rgba(255,255,255,0)'); sh.addColorStop(0.5, 'rgba(255,240,220,0.10)'); sh.addColorStop(0.7, 'rgba(255,255,255,0)')
    x.fillStyle = sh; x.beginPath(); x.arc(0, 0, R_DISC - 6, 0, TAU); x.fill()
    x.restore()
    x.strokeStyle = rgba(GOLD, 0.6); x.lineWidth = 4; x.beginPath(); x.arc(CX, CY, R_DISC, 0, TAU); x.stroke()
    // label: gold, with the top sign's glyph
    const top = CARD.reduce((a, c) => topness(angOf(c.i, th)) > topness(angOf(a.i, th)) ? c : a, CARD[0])
    const lg = x.createRadialGradient(CX - 20, CY - 20, 5, CX, CY, 110)
    lg.addColorStop(0, '#ffe7a6'); lg.addColorStop(1, '#c89a3a')
    x.fillStyle = lg; x.beginPath(); x.arc(CX, CY, 100 + 6 * k, 0, TAU); x.fill()
    x.save(); x.translate(CX, CY); x.rotate(-th - t * 0.6)
    x.fillStyle = INK; x.font = `700 20px ${MONO}`
    for (let i = 0; i < 4; i++) { x.rotate(TAU / 4); x.fillText('· ZODIAC ·', 0, -72) }
    x.restore()
    x.fillStyle = INK; x.font = `500 84px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`
    x.fillText(top.glyph + '︎', CX, CY + 4)
    x.fillStyle = BONE; x.beginPath(); x.arc(CX, CY + 54, 7, 0, TAU); x.fill()
    // the gold seat marker at 12 o'clock
    const my = CY - R_G - 70
    x.fillStyle = GOLD
    ;[[0, 0, 7], [1, 1, 5], [2, 2, 3], [3, 3, 1]].forEach(([r, , w]) => x.fillRect(CX - w * 6, my + r * 6, w * 12, 6))
    x.restore()
  }

  function moodFor(c, t, tp) {
    const isTop = tp > 0.92
    if (c.id === 'capricorn') {
      if (t > T.big - 0.3 && t < T.cut) return { mood: 'wide', look: [0, 0], blink: false }
      if (t >= T.cut) return { mood: 'happy' }
      if (isTop && t > T.strain[0] - 0.1) return { mood: 'squint', look: [0, 0], blink: false }  // gripping
      if (isTop) return { mood: 'neutral', look: [0, 0] }                                         // smug
      return { mood: 'neutral' }
    }
    if (c.id === 'libra' && isTop && t < T.turns[2] - 0.6) {
      const side = Math.floor(t / 0.28) % 2 ? 1 : -1
      return { mood: 'wide', look: [side, 0], blink: false }
    }
    if (c.id === 'cancer' && isTop && t < T.turns[1]) return { mood: 'happy' }
    if (isTop) return { mood: t >= T.cut ? 'heart' : 'happy' }
    if (t > T.strain[0] && t < T.big && c.id !== 'capricorn') return { mood: 'eyeroll' }          // waiting their turn…
    return { mood: t >= T.cut ? 'happy' : 'neutral' }
  }

  function drawRiders(t, th, ok) {
    const k = kick(t)
    // draw the top one last
    const order = [...CARD].sort((a, b) => topness(angOf(a.i, th)) - topness(angOf(b.i, th)))
    for (const c of order) {
      const a = angOf(c.i, th), tp = topness(a)
      const big = tp ** 10
      let px = CX + Math.cos(a) * R_S, py = CY + Math.sin(a) * R_S
      const size = lerp(128, 210, big)
      // the top star sits up on the rim and dances to the kick
      py -= big * 70
      let sq = big * 0.12 * k
      let rot = 0
      if (c.id === 'libra' && big > 0.9 && t < T.turns[2] - 0.6) rot = 0.2 * Math.sin(t * 11)            // which way?? which way??
      if (c.id === 'aries' && big > 0.9) { sq += big * 0.06 * Math.sin(t * 22); py -= big * Math.abs(Math.sin((t - 0.6) * Math.PI / BEAT)) * 26 }
      if (c.id === 'capricorn' && t > T.strain[0] && t < T.big) { sq += 0.1 + 0.03 * Math.sin(t * 60); rot = 0.08 * Math.sin(t * 40) * prog(t, T.strain[0], T.strain[0] + 0.2) }
      // slide-off wobble for Capricorn after the big turn
      if (c.id === 'capricorn') { const d = t - T.big; if (d > 0 && d < 0.8) rot += 0.5 * Math.exp(-d * 5) * Math.sin(d * 18) }
      const pk = easeOutBack(prog(t, 0.3 + c.i * 0.03, 0.75 + c.i * 0.03), 2) * ok
      x.save(); x.translate(px, py); x.rotate(rot)
      drawStarChar(x, 0, 0, size, t, { color: c.color, glyph: size > 120 ? c.glyph : null, ...moodFor(c, t, tp), squash: sq, pop: pk, hops: c.id === 'capricorn' ? CAP_HOPS : null, seed: c.i + 2, bob: 4 })
      x.restore()
      // Cancer's happy tears
      if (c.id === 'cancer' && big > 0.9 && t < T.turns[1]) {
        for (let n = 0; n < 14; n++) {
          const born = T.turns[0] + 0.1 + (n >> 1) * 0.26, d = t - born
          if (d < 0 || d > 0.9) continue
          const side = n % 2 ? 1 : -1
          x.globalAlpha = (1 - d / 0.9) * ok
          const dx = px + side * (size * 0.16 + d * 150), dy = py + size * 0.02 - d * 40 + d * d * 420
          x.fillStyle = INK; x.fillRect(Math.round(dx - 12), Math.round(dy - 14), 24, 30); x.fillRect(Math.round(dx - 8), Math.round(dy - 22), 16, 10)
          x.fillStyle = (n >> 1) % 2 ? '#e9f7ff' : '#ffffff'
          x.fillRect(Math.round(dx - 8), Math.round(dy - 10), 16, 22); x.fillRect(Math.round(dx - 4), Math.round(dy - 18), 8, 8)
          x.globalAlpha = 1
        }
      }
      // Capricorn's grip: little effort marks
      if (c.id === 'capricorn' && t > T.strain[0] && t < T.big - 0.3 && tp > 0.9) {
        x.fillStyle = BONE
        for (let n = 0; n < 3; n++) {
          const a2 = -Math.PI / 2 + (n - 1) * 0.55, rr = size * 0.62 + 6 * Math.sin(t * 30 + n)
          x.save(); x.translate(px + Math.cos(a2) * rr, py + Math.sin(a2) * rr); x.rotate(a2 + Math.PI / 2); x.fillRect(-4, -14, 8, 28); x.restore()
        }
      }
    }
  }

  // ── THE STARS as the DJ: pixel headphones
  function drawDJ(t, ok) {
    const pk = easeOutBack(prog(t, 1.35, 1.75), 2) * ok
    if (pk <= 0) return
    const k = kick(t)
    let sq = 0.05 * k
    const sc = t - T.scratch
    if (sc > 0 && sc < 0.6) sq += -0.15 * Math.exp(-sc * 6) * Math.cos(sc * 18)
    let mood = 'happy', look = [0, 0]
    if (t > T.l2 - 0.1 && t < T.l3) { mood = 'eyeroll' }
    else if (t >= T.l3 && t < T.scratch) { mood = 'neutral'; look = [-1, -1] }
    else if (t >= T.scratch && t < T.big + 0.3) { mood = 'squint' }
    else if (t >= T.wink[0] && t < T.wink[1]) mood = 'wink'
    const r = drawStarChar(x, DJPOS.x, DJPOS.y, DJPOS.size, t, { color: STAR.sky, mood, look, pop: pk, squash: sq, hops: [...DJ_HOPS, T.scratch], seed: 1, glow: 1.1 })
    // headphones: a band over the top tip + two cups at the sides (pixel cells)
    const s = DJPOS.size * pk, c = Math.max(4, Math.round(s / 30))
    const hy = DJPOS.y + Math.sin(t * 2.2 + 2.1) * DJPOS.size * 0.035 - s * 0.08
    x.save(); x.globalAlpha = ok
    const cupY = hy + s * 0.02, cupX = s * 0.44
    for (const [col, w] of [[INK, 2.6], [PINK, 1.3]]) {
      x.fillStyle = col
      for (let i = -12; i <= 12; i++) {
        const u = i / 12, yy = cupY - Math.sqrt(Math.max(0, 1 - u * u)) * s * 0.62 - c * 2
        x.fillRect(Math.round(DJPOS.x + u * cupX - c * w / 2), Math.round(yy - c * w / 2), Math.ceil(c * w), Math.ceil(c * w))
      }
    }
    for (const side of [-1, 1]) {
      const cx = DJPOS.x + side * cupX, cy = cupY
      x.fillStyle = INK; x.fillRect(Math.round(cx - c * 3), Math.round(cy - c * 4), c * 6, c * 8)
      x.fillStyle = PINK; x.fillRect(Math.round(cx - c * 2), Math.round(cy - c * 3), c * 4, c * 6)
      x.fillStyle = '#ffd1de'; x.fillRect(Math.round(cx - c * 2), Math.round(cy - c * 3), c, c * 3)
    }
    x.restore()
    // little music notes on the kick
    if (pk > 0.9 && t > 1.8) {
      for (let n = 0; n < 3; n++) {
        const born = 0.6 + Math.floor((t - 0.6) / BEAT - n) * BEAT, d = t - born
        if (d < 0 || d > 1.4) continue
        const nx = DJPOS.x + 90 + n * 18 + Math.sin(d * 5 + n) * 10, ny = DJPOS.y - 130 - d * 110
        x.globalAlpha = (1 - d / 1.4) * ok
        x.fillStyle = n % 2 ? GOLD : BONE
        x.fillRect(Math.round(nx), Math.round(ny), 8, 26); x.fillRect(Math.round(nx - 10), Math.round(ny + 20), 14, 10); x.fillRect(Math.round(nx + 8), Math.round(ny), 10, 6)
        x.globalAlpha = 1
      }
    }
    void r
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const shake = t > T.strain[0] && t < T.strain[1] ? Math.round(Math.sin(t * 80) * 4 * Math.sin(Math.PI * prog(t, ...T.strain))) : 0
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : { ...SKY_H, dx: shake })
      const ok = popOut(t, T.out)
      const th = wheelRot(t)
      if (ok > 0) {
        const wk = easeOutBack(prog(t, 0.05, 0.6), 1.6)
        x.save(); x.translate(CX, CY); x.scale(lerp(0.6, 1, wk), lerp(0.6, 1, wk)); x.translate(-CX, -CY)
        drawWheel(t, th, ok * clamp(wk * 2))
        x.restore()
        drawRiders(t, th, ok)
        drawDJ(t, ok)
      }
      // a sparkle burst on each landing at the top
      for (const L of [...T.turns, T.big, T.turn4]) sparkles(t, CX, CY - R_S - 70, L, 10, 150, L)
      sparkles(t, CX, CY - R_S - 70, T.h4Land, 14, 230, 0.4, [GOLD, BONE, PINK])
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 12.65 (box shut → "Love is taking turns."). One cut for a 20 s film. End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const turnCues = L => [['whoosh', +(L - GLIDE).toFixed(3), GLIDE + 0.1, 0.04], ['tick', +L.toFixed(3), 0.06], ['pop', +L.toFixed(3), 1174.66, 0.035, 0], ['glitter', +L.toFixed(3), +(L + 0.35).toFixed(3)]]
const headCues = (t0, land, n, base) => [...wordPops(t0, n, 0.1, base, 0.024), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1318.51, 0.04, 0.45, 0]]
export const CUES = [
  ...headCues(T.h0, T.h0Land, 2, 0),
  ['pop', 1.4, 880, 0.035, 0.3], ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...T.turns.flatMap(turnCues),
  ...headCues(T.hA, T.hALand, 2, 1), ['bell', T.hALand + 0.3, 1760, 0.018, 1.0, -0.3],
  ...headCues(T.hB, T.hBLand, 2, 2), ['tick', 5.6, 0.03], ['tick', 5.88, 0.03], ['tick', 6.16, 0.03], ['tick', 6.44, 0.03],
  ...headCues(T.hC, T.hCLand, 2, 3),
  // the strain: the wheel won't go
  ['whoosh', T.strain[0], 0.4, 0.035], ['boom', T.strain[0] + 0.45, 0.1], ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.strain[0] + 0.1 + i * 0.13).toFixed(3), 0.04]), ['pop', T.strain[1] - 0.1, 293.66, 0.04, 0],
  // the scratch + the big turn
  ['whoosh', T.scratch, 0.12, 0.06], ['whoosh', T.scratch + 0.14, 0.12, 0.06], ['tick', T.scratch + 0.02, 0.05], ['tick', T.scratch + 0.16, 0.05],
  ['whoosh', T.big - 0.35, 0.45, 0.06], ['boom', T.big, 0.12], ...turnCues(T.big), ['pop', T.big + 0.15, 440, 0.04, -0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...headCues(T.h4, T.h4Land, 3, 1), ['glitter', T.h4Land, T.h4Land + 0.45],
  ...turnCues(T.turn4),
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
