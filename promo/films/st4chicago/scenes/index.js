// st4chicago (15 s vertical Align ad, Star Talk season 4, EP 077 · thread A, the vote) · story 0–10.6, then the end card.
//   0.00–5.10  "Dear *Chicago.*"  Snow and wind over a generic pixel skyline. The ♑ Capricorn star (starcap's tie) is bundled
//              up in a knit beanie and a striped scarf, still typing on its laptop; snow piles up on its hat. Its desk
//              calendar says JAN, with a red ring: "CUFF BY 2/14!"  A gust: the scarf whips, it squints and keeps typing.
//              Box (THE STARS): "cuffing season isn't a deadline."
//   5.15–8.40  "Love isn't | *seasonal.*"  Box: "find someone you'd want in *July,* too."  The calendar riffles JAN → JUL, the snow
//              stops, the sky warms, the beanie pops off and the laptop shuts. Sparkle eyes.
//   8.45 cut → "Not just for | *winter.*"  July: Capricorn (tie, no scarf) and the ♋ Cancer star, its opposite, side by side
//              in the warm night, fireflies, heart eyes. Everything pops out by 10.45; the end card takes over at 10.6.
// Easter eggs (stlore.js): the constellation (EP 77) top-left, the EP 077 cartouche, the ghost peeks over a rooftop.
// One canvas (sky + skyline + snow + cast), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 77
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#ff5a5a'
const ICE = '#a9d8ff', WARM = '#ffb36b'
const MONO = "'Space Mono', ui-monospace, monospace"
const CAP = signStar('capricorn'), CAN = signStar('cancer')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [4.9, 5.1],
  capIn: 0.3, gusts: [1.5, 3.4],
  open: 2.2, l1: 2.35,
  h1: 5.15, h1Land: 5.55, l2: 5.3, riffle: [6.35, 6.95], thaw: [6.9, 7.5], hatOff: 7.15, shut: 7.35, close: 8.35, h1Out: [8.2, 8.38],
  cut: 8.45,
  h2: 8.5, h2Land: 8.9, canIn: 8.75, h2Out: [10.2, 10.42], out: [10.05, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "cuffing season isn't a *deadline.*", color: ICE },
  { t: T.l2, speaker: SPEAK, text: "find someone you'd want in *July,* too.", color: WARM },
]
const CPS = 28
const GHOST = { at: 4.55, x: 922, y: 1306 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── pixel bits
const BMP = s => s.trim().split(/\s+/)
function bits(x, bm, cols, cx, cy, cell, { rot = 0, a = 1, outline = 'rgba(14,8,32,0.9)' } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  if (outline) { x.fillStyle = outline; bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect(ox + (i - 1) * cell, oy + (j - 1) * cell, cell * 3, cell * 3) })) }
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}
const BEANIE = BMP(`
......WWW......
.....WWWWW.....
......WWW......
...RRRRRRRRR...
..RRrRRrRRrRR..
.RRRrRRrRRrRRR.
.RRRrRRrRRrRRR.
RRRRRRRRRRRRRRR
KKKKKKKKKKKKKKK
KkKkKkKkKkKkKkK`)
const BEANIE_C = { W: '#fffaf0', R: '#d8344f', r: '#b02440', K: '#f3ead8', k: '#cfc4b0' }
const SCARF = BMP(`
SSSSBBBBSSSSBBBBSSSSBBBB
SSSSBBBBSSSSBBBBSSSSBBBB
SSSSBBBBSSSSBBBBSSSSBBBB`)
const TAIL = BMP(`SSSS SSSS BBBB BBBB SSSS SSSS BBBB BBBB S.S. .S.S`)
const SCARF_C = { S: '#3f7fd0', B: '#f3ead8' }
const TIE = ['.KKK.', '.RRR.', '..R..', '.RRR.', '.RrR.', 'RRrRR', 'RRRRR', '.RRR.', '..R..']
const TIE_C = { K: '#7a1f33', R: '#d8344f', r: '#ffd36b' }
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)

// ── layout
const HERO = { x: 380, y: 990, size: 330 }
const CAL = { x: 805, y: 790, w: 250, h: 270 }
const FIN_CAP = { x: 345, y: 1060, size: 300 }, FIN_CAN = { x: 745, y: 1060, size: 300 }

// a generic skyline (no landmarks): deterministic blocks with lit windows, along the bottom
const TOWERS = (() => {
  const r = rng(77), out = []
  let xx = -20
  while (xx < W + 20) {
    const w = 70 + Math.floor(r() * 70), h = 160 + Math.floor(r() * 300)
    out.push({ x: xx, w, h, step: r() < 0.35, ant: r() < 0.25, seed: Math.floor(r() * 1000) })
    xx += w + 6
  }
  return out
})()
const SKY_BASE = 1500
// the ghost peeks over this roof
const roofAt = px => { for (const b of TOWERS) if (px >= b.x && px < b.x + b.w) return SKY_BASE - b.h; return SKY_BASE }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear *Chicago.*', { top: 250, size: 130, accentSize: 190, at: T.h0, gap: 0.12, accentColor: ICE, wobble: true, late: 1, lateAt: T.h0 + 0.3 })
  const H1 = popText(root, 'Love isn’t | *seasonal.*', { top: 215, size: 108, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.08, accentColor: WARM })
  const H2 = popText(root, 'Not just for | *winter.*', { top: 210, size: 116, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const thawK = t => ease.inOutCubic(prog(t, ...T.thaw))
  const sceneK = t => popOut(t, T.out)
  // wind: two gusts, a steady breeze otherwise; none after the thaw
  const wind = t => (1 - thawK(t)) * (0.35 + T.gusts.reduce((a, g) => a + Math.max(0, Math.sin(Math.PI * prog(t, g, g + 0.9))) * 1.4, 0))

  function tint(t) {
    // winter: a cold blue wash; july: a warm one. Both gone at the hand-off (plain sky H at 10.6).
    const k = clamp(prog(t, 0, 0.6)) * outK(t, [10.1, 10.5])
    const th = thawK(t)
    if (k <= 0) return
    x.save(); x.globalCompositeOperation = 'soft-light'
    x.fillStyle = rgba(ICE, 0.38 * k * (1 - th)); x.fillRect(0, 0, W, H)
    x.fillStyle = rgba(WARM, 0.42 * k * th); x.fillRect(0, 0, W, H)
    x.restore()
  }

  function drawSkyline(t) {
    const k = sceneK(t)
    if (k <= 0.01) return
    const th = thawK(t)
    x.save(); x.globalAlpha = clamp(k)
    for (const b of TOWERS) {
      const top = SKY_BASE - b.h
      x.fillStyle = '#0c0820'; x.fillRect(b.x, top, b.w, H - top)
      if (b.step) { x.fillRect(b.x + b.w * 0.2, top - 40, b.w * 0.6, 40); x.fillRect(b.x + b.w * 0.35, top - 70, b.w * 0.3, 30) }
      if (b.ant) { x.fillRect(b.x + b.w / 2 - 3, top - (b.step ? 140 : 70), 6, 70); x.fillStyle = (t * 1.2 + b.seed) % 1 < 0.5 ? RED : '#5a1a1a'; x.fillRect(b.x + b.w / 2 - 5, top - (b.step ? 146 : 76), 10, 10) }
      // windows
      const r = rng(b.seed)
      for (let wy = top + 18; wy < SKY_BASE + 300; wy += 30) for (let wx = b.x + 12; wx < b.x + b.w - 16; wx += 22) {
        const on = r() < 0.27
        if (!on) continue
        x.fillStyle = th > 0.5 ? (r() < 0.5 ? '#ffd27a' : '#ffb36b') : (r() < 0.5 ? '#ffe9b0' : '#9fc3ff')
        x.globalAlpha = clamp(k) * (0.55 + 0.35 * r())
        x.fillRect(wx, wy, 10, 14)
      }
      x.globalAlpha = clamp(k)
      // snow caps (melting away with the thaw)
      if (th < 1) { x.fillStyle = rgba('#f4f8ff', 0.9 * (1 - th)); x.fillRect(b.x, top - 8, b.w, 8) }
    }
    x.restore()
  }

  // snow: three depth layers, blown sideways by the wind; stops with the thaw
  function drawSnow(t, front) {
    const k = (1 - thawK(t)) * clamp(prog(t, 0, 0.4))
    if (k <= 0.01 || t > T.out[1]) return
    const r = rng(front ? 91 : 37), n = front ? 34 : 70
    // drift: integrate the wind cheaply (pure f(t))
    const drift = t * 120 + T.gusts.reduce((a, g) => a + clamp((t - g) / 0.9) * 260, 0)
    x.save(); x.globalAlpha = k
    for (let i = 0; i < n; i++) {
      const sp = front ? 160 + r() * 80 : 70 + r() * 70, sz = front ? 8 + Math.floor(r() * 2) * 4 : 4 + Math.floor(r() * 2) * 2
      const x0 = r() * (W + 400), y0 = r() * H, ph = r() * 6
      const yy = (y0 + t * sp) % (H + 40) - 20
      const xx = ((x0 + drift * (front ? 1.3 : 0.8) + Math.sin(t * 1.5 + ph) * 18) % (W + 400) + W + 400) % (W + 400) - 200
      x.fillStyle = front ? '#ffffff' : 'rgba(230,240,255,0.75)'
      x.fillRect(Math.round(xx), Math.round(yy), sz, sz)
    }
    x.restore()
  }
  // gust streaks
  function drawGusts(t) {
    for (const g of T.gusts) {
      const p = prog(t, g, g + 0.8)
      if (p <= 0 || p >= 1) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * p) * 0.6
      for (let i = 0; i < 6; i++) {
        const yy = 600 + i * 95 + (i % 2) * 30, len = 160 + (i * 57) % 140
        x.fillStyle = i % 2 ? '#e6f2ff' : BONE
        x.fillRect(Math.round(lerp(-300, W + 100, p) - i * 40), yy, len, 6)
      }
      x.restore()
    }
  }

  // the desk calendar: JAN with a red ring "CUFF BY 2/14!", riffling to JUL
  function drawCalendar(t) {
    if (t >= T.cut) return
    const k = pop01(t, T.capIn + 0.35, 0.36, 1.8) * sceneK(t)
    if (k <= 0.01) return
    const { x: cx, y: cy, w, h } = CAL
    const rp = prog(t, ...T.riffle)
    const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL']
    const mi = Math.min(6, Math.floor(rp * 6.999))
    const flapW = Math.sin(t * 9) * 0.02 * wind(t)
    x.save(); x.translate(cx, cy); x.rotate(flapW + 0.03); x.scale(k, k)
    x.fillStyle = 'rgba(10,6,24,0.92)'; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
    x.fillStyle = '#fbf6ea'; x.fillRect(-w / 2, -h / 2, w, h)
    const hot = mi >= 6
    x.fillStyle = hot ? '#e8833a' : '#3f7fd0'; x.fillRect(-w / 2, -h / 2, w, 78)
    // rings
    x.fillStyle = '#8a8a9a'; for (const rx of [-70, 0, 70]) x.fillRect(rx - 6, -h / 2 - 18, 12, 30)
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 52px ${MONO}`; x.fillStyle = '#fffaf0'; x.fillText(MONTHS[mi], 0, -h / 2 + 42)
    // the page body
    if (mi === 0) {
      // the deadline, ringed in red
      x.font = `700 28px ${MONO}`; x.fillStyle = INK
      x.fillText('CUFF BY', 0, -h / 2 + 128); x.fillText('2/14!', 0, -h / 2 + 168)
      x.strokeStyle = RED; x.lineWidth = 6
      x.beginPath(); x.ellipse(0, -h / 2 + 150, 100, 52, -0.06, 0, Math.PI * 2); x.stroke()
      // a grid of tiny squares
      x.fillStyle = 'rgba(27,18,54,0.18)'
      for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) x.fillRect(-w / 2 + 22 + i * 36, -h / 2 + 206 + j * 26, 26, 18)
    } else if (mi < 6) {
      x.fillStyle = 'rgba(27,18,54,0.18)'
      for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) x.fillRect(-w / 2 + 22 + i * 36, -h / 2 + 110 + j * 36, 26, 24)
    } else {
      // July: a pixel sun, and no deadline at all
      const sp = pop01(t, T.riffle[1], 0.3, 2.4)
      x.save(); x.translate(0, -h / 2 + 168); x.scale(sp, sp)
      x.fillStyle = '#ffcf4a'; x.fillRect(-36, -36, 72, 72); x.fillRect(-46, -20, 92, 40); x.fillRect(-20, -46, 40, 92)
      x.fillStyle = '#ff9f2e'; for (const [a, b] of [[0, -70], [0, 58], [-70, 0], [58, 0], [-54, -54], [44, -54], [-54, 44], [44, 44]]) x.fillRect(a - 2, b - 2, 16, 16)
      x.restore()
    }
    // a page flying off while riffling
    if (rp > 0 && rp < 1) {
      const f = (rp * 6) % 1
      x.save(); x.translate(0, -h / 2); x.rotate(-f * 1.6); x.globalAlpha *= 1 - f
      x.fillStyle = '#fbf6ea'; x.fillRect(-w / 2, 0, w, h * (1 - f * 0.6)); x.fillStyle = '#3f7fd0'; x.fillRect(-w / 2, 0, w, 40)
      x.restore()
    }
    // a little snow pile on the top edge (gone with the thaw)
    const pile = clamp(prog(t, 0.8, 5)) * (1 - thawK(t))
    if (pile > 0) { x.fillStyle = '#f4f8ff'; x.fillRect(-w / 2 - 6, -h / 2 - 8 - 14 * pile, w + 12, 14 * pile) }
    x.restore()
  }

  // ── Capricorn, bundled up
  function capState(t) {
    if (t < T.capIn + 0.4) return { mood: 'wide', look: [0, 0], blink: false }
    if (T.gusts.some(g => t > g && t < g + 1.0)) return { mood: 'squint', look: [-1, 0] }
    if (t < T.l2) return { mood: 'squint', look: [1, 1] }                          // typing, eyes on the laptop
    if (t < T.riffle[0]) return { mood: 'neutral', look: [1, 0] }
    if (t < T.hatOff + 0.2) return { mood: 'wide', look: [1, 0], blink: false }
    return { mood: 'sparkle', look: [0, 0] }
  }
  function drawCap(t) {
    const fin = t >= T.cut
    const ok = sceneK(t)
    const P = fin ? FIN_CAP : HERO
    let pk = (fin ? pop01(t, T.cut + 0.05, 0.34, 2) : pop01(t, T.capIn, 0.38, 2.1)) * ok
    if (pk <= 0.02) return
    const typing = !fin && t > T.capIn + 0.5 && t < T.shut
    const sq = typing ? 0.025 * Math.sin(t * 34) : 0
    const st = fin ? { mood: t > T.h2Land + 0.2 ? 'heart' : 'happy' } : capState(t)
    const hops = fin ? [T.h2Land, T.h2Land + 0.7] : [T.hatOff + 0.05]
    const shiver = !fin && thawK(t) < 1 ? Math.sin(t * 60) * 1.5 * (1 - thawK(t)) : 0
    const r = drawStarChar(x, P.x + shiver, P.y, P.size * pk, t, { color: CAP.color, glyph: CAP.glyph, ...st, squash: sq, hops, seed: 5, bob: fin ? 8 : 4 })
    const s = P.size * pk, c = Math.max(2, Math.round(s / 36))
    // the tie (starcap)
    bits(x, TIE, TIE_C, r.x, r.y + s * 0.31, s / 26, { rot: Math.sin(t * 2) * 0.05, outline: null })
    if (fin) return r
    // the scarf: wraps the neck, the tail whips in the wind
    const wd = wind(t), scarfOn = 1 - prog(t, T.hatOff, T.hatOff + 0.4)
    if (scarfOn > 0) {
      x.save(); x.globalAlpha = scarfOn
      bits(x, SCARF, SCARF_C, r.x, r.y + s * 0.235, c * 0.9, { rot: -0.04 })
      bits(x, TAIL, SCARF_C, r.x - s * 0.25 - wd * 26, r.y + s * 0.33 - wd * 8, c * 0.95, { rot: 0.5 + wd * 0.55 + Math.sin(t * 14) * 0.08 * wd })
      x.restore()
    }
    // the beanie: snow piles up on it; pops off at the thaw
    const off = prog(t, T.hatOff, T.hatOff + 0.7)
    const hx = r.x + off * 260, hy = r.top + s * 0.035 - Math.sin(Math.PI * off) * 220 + off * off * 300
    if (off < 1) {
      bits(x, BEANIE, BEANIE_C, hx, hy, c * 1.05, { rot: off * 3.2 - 0.06, a: 1 - ease.inQuad(off) })
      const pile = clamp(prog(t, 0.8, 5)) * (1 - thawK(t))
      if (pile > 0 && off === 0) { x.fillStyle = '#f4f8ff'; const ph = Math.round(pile * 2 * c); x.fillRect(Math.round(hx - 7 * c), Math.round(hy - 2 * c - ph), 4 * c, ph + 2); x.fillRect(Math.round(hx + 3 * c), Math.round(hy - 2 * c - ph * 0.7), 4 * c, ph * 0.7 + 2) }
    }
    return r
  }
  // the desk + laptop in front of it
  function drawDesk(t) {
    if (t >= T.cut) return
    const k = pop01(t, T.capIn + 0.15, 0.34, 1.8) * sceneK(t)
    if (k <= 0.01) return
    const dy = HERO.y + 150
    x.save(); x.globalAlpha = clamp(k)
    x.fillStyle = 'rgba(10,6,24,0.92)'; x.fillRect(150, dy - 6, 620, 32)
    x.fillStyle = '#7a5230'; x.fillRect(156, dy, 608, 20); x.fillStyle = '#a8743f'; x.fillRect(156, dy, 608, 5)
    x.fillStyle = '#5a3a20'; x.fillRect(180, dy + 20, 16, 220); x.fillRect(724, dy + 20, 16, 220)
    // laptop (lid closes on the thaw)
    const sh = ease.inCubic(prog(t, T.shut, T.shut + 0.22))
    const lx = 655, lw = 170
    x.fillStyle = '#2a2448'; x.fillRect(lx - lw / 2 - 6, dy - 16, lw + 12, 16); x.fillStyle = '#8a8aa6'; x.fillRect(lx - lw / 2, dy - 12, lw, 10)
    const lidH = lerp(96, 8, sh)
    x.fillStyle = 'rgba(10,6,24,0.92)'; x.fillRect(lx - lw / 2 - 6, dy - 14 - lidH - 6, lw + 12, lidH + 8)
    x.fillStyle = '#b8b8cc'; x.fillRect(lx - lw / 2, dy - 14 - lidH, lw, lidH)
    if (lidH > 30) { x.fillStyle = 'rgba(160,200,255,0.5)'; x.fillRect(lx - 14, dy - 14 - lidH / 2 - 14, 28, 28) }
    // snow on the desk
    const pile = clamp(prog(t, 0.8, 5)) * (1 - thawK(t))
    if (pile > 0) { x.fillStyle = '#f4f8ff'; x.fillRect(156, dy - 10 * pile, 200, 10 * pile); x.fillRect(720, dy - 8 * pile, 44, 8 * pile) }
    x.restore()
  }
  function drawCancer(t) {
    if (t < T.cut) return
    const pk = pop01(t, T.canIn, 0.38, 2.2) * sceneK(t)
    if (pk <= 0.02) return
    drawStarChar(x, FIN_CAN.x, FIN_CAN.y, FIN_CAN.size * pk, t, { color: CAN.color, glyph: CAN.glyph, mood: t > T.h2Land + 0.35 ? 'heart' : 'happy', hops: [T.h2Land + 0.2, T.h2Land + 0.9], seed: 8, bob: 8 })
  }
  function fireflies(t) {
    const k = thawK(t) * sceneK(t)
    if (k <= 0.01) return
    const r = rng(5)
    for (let i = 0; i < 16; i++) {
      const bx = 120 + r() * 840, by = 620 + r() * 700, ph = r() * 6
      const a = (0.5 + 0.5 * Math.sin(t * 3 + ph)) * k
      x.fillStyle = rgba('#fff2a8', a); const fx = Math.round(bx + Math.sin(t * 0.9 + ph) * 30), fy = Math.round(by + Math.cos(t * 0.7 + ph) * 24)
      x.fillRect(fx, fy, 8, 8); x.fillStyle = rgba('#ffd84a', a * 0.3); x.fillRect(fx - 6, fy - 6, 20, 20)
    }
  }
  function floatHearts(t, cx, cy, t0, t1) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, life = 1.4
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 7) / 6 - 0.5
      bits(x, HEART, { X: '#ff4f6e' }, cx + side * 260 + Math.sin(p * 4 + i) * 14, cy - p * 240, 7, { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      tint(t)
      drawSeedConstellation(x, t, EP)
      drawSnow(t, false)
      if (t < T.out[1] + 0.02) {
        drawSkyline(t)
        drawGhostCameo(x, t, { x: GHOST.x, y: roofAt(GHOST.x), at: GHOST.at, dur: 1.4, from: 'below' })
        fireflies(t)
        drawCalendar(t)
        drawCap(t)
        drawDesk(t)
        drawCancer(t)
        if (t >= T.cut && t > T.h2Land + 0.3) floatHearts(t, 545, 900, T.h2Land + 0.3, T.out[0])
        drawGusts(t)
      }
      drawSnow(t, true)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.12 (H0 out → "Love isn't seasonal") and 8.45 (box shut → July). cardfx keeps the 8.45 one.
const CUTS = [5.12, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const typing = (t0, t1) => { const o = []; for (let t = t0; t < t1; t += 0.19) o.push(['tick', +t.toFixed(3), 0.012]); return o }
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.3, 1174.66, 0.045, 0],
  ['pop', T.capIn + 0.05, 659.25, 0.035, 0], ['pop', T.capIn + 0.4, 880, 0.03, 0.3],
  ...typing(1.0, 2.2),
  ...T.gusts.map(g => ['whoosh', g, 0.9, 0.05]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 2, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pluck', T.h1Land, 880, 0.035, 0.5, 0],
  ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.riffle[0] + i * 0.1).toFixed(3), 0.04]),
  ['bell', T.riffle[1], 1318.51, 0.03, 1.4, 0], ['glitter', T.thaw[0], T.thaw[0] + 0.6],
  ['whoosh', T.hatOff, 0.4, 0.03], ['pop', T.hatOff + 0.05, 1174.66, 0.035, 0.3],
  ['tick', T.shut + 0.2, 0.07], ['boom', T.shut + 0.2, 0.06],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pop', T.canIn + 0.05, 739.99, 0.035, 0.3], ['bell', T.h2Land + 0.4, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
