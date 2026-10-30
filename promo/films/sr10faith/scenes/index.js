// sr10faith (20 s vertical Align ad, Star Talk Remix of teaser 10 "Put your faith in the stars") · story 0–15.6, then
// the shared end card. The manifesto ("We hide the faces. We read the sky. You bring the courage.") becomes a job split:
// three jobs, the stars take two, and the third one is yours.
//   0.00–3.05  "Three jobs. | *Two* are ours."  THE STARS (gold) pops in centre, ♏ Scorpio left, ♍ Virgo right; all
//              three look straight at you.
//   3.10–6.25  "Job *one.*"  A pixel portrait pops in (a smiling face). ♏ SCORPIO: "we hide the faces." It yanks a rope and
//              a velvet curtain drops over the portrait (the face goes wide-eyed first); an aura glow + a gold "?" bloom
//              on the curtain. Scorpio winks.
//   6.30–9.35  "Job *two.*"  ♍ VIRGO, in tiny reading glasses: "we read the sky." A scroll unrolls with a chart wheel on it…
//              and keeps unrolling, way past the floor. Virgo squints; it snaps back up.
//   9.40–12.6  "Job *three…*"  Silence. All three stars turn and stare at you (camera push). THE STARS: "you bring the
//              courage." ♓ Pisces pops up at the back, sobbing proudly.
//   12.7–15.4  card flip → "Put your faith | in the *stars.*"  The sky wakes: little stars blink open all over, all looking
//              at you; the trio hop together. Everything pops out by 15.45.
// One canvas (sky + props + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, PINK, INK, LAV, pop01, outK, popOut, drawBits, QMARK, starGeom, tears, sparkles, glasses } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const SCO = signStar('scorpio'), VIR = signStar('virgo'), PIS = signStar('pisces')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.55, h0Out: [2.9, 3.06], gIn: 0.3, sIn: 0.55, vIn: 0.75,
  h1: 3.12, h1Land: 3.36, h1Out: [6.1, 6.26], open: 3.2, l1: 3.42, frameIn: 3.3, gasp: 4.35, yank: 4.5, drop: [4.55, 4.85], q: 5.0, wink: [5.25, 5.85], frameOut: [6.05, 6.25],
  h2: 6.32, h2Land: 6.56, h2Out: [9.2, 9.36], l2: 6.55, scroll: [7.3, 7.9], over: [7.9, 8.5], squint: 8.2, snap: [8.6, 8.85], scrollOut: [9.15, 9.35],
  h3: 9.42, h3Land: 9.9, h3Out: [12.45, 12.62], turn: 9.45, push: [9.45, 10.0], l3: 10.15, pis: 11.25, close: 12.55,
  h4: 12.78, h4Land: 13.2, wake: 13.0, jump: 13.75, h4Out: [15.15, 15.4], out: [15.05, 15.45],
}
const LINES = [
  { t: T.l1, speaker: '♏ SCORPIO STAR', text: 'we hide the *faces.*', color: SCO.color },
  { t: T.l2, speaker: '♍ VIRGO STAR', text: 'we read the *sky.*', color: VIR.color },
  { t: T.l3, speaker: 'THE STARS', text: 'you bring the *courage.*' },
]
const CPS = 26
const bounce = p => { if (p < 0.6) return (p / 0.6) ** 2; const q = (p - 0.6) / 0.4; return 1 - 0.12 * Math.sin(Math.PI * q) }

// ── layout
const G_P = { x: 540, y: 1150, size: 300 }, S_P = { x: 230, y: 1190, size: 240 }, V_P = { x: 850, y: 1190, size: 240 }
const FRAME = { x: 540, y: 720, w: 330, h: 400 }
const SCROLL = { x: 540, y: 540, w: 420 }
const pushK = t => ease.inOutCubic(prog(t, ...T.push)) * (1 - ease.inOutCubic(prog(t, 12.6, 12.8)))

const G_HOPS = [T.gIn + 0.3, T.h0Land, ...talkHops(LINES.slice(2), 'THE STARS', { cps: CPS }), T.jump, T.jump + 0.55]
const S_HOPS = [T.sIn + 0.3, ...talkHops(LINES.slice(0, 1), '♏ SCORPIO STAR', { cps: CPS }), T.yank, T.wink[0], T.jump + 0.1, T.jump + 0.65]
const V_HOPS = [T.vIn + 0.3, ...talkHops(LINES.slice(1, 2), '♍ VIRGO STAR', { cps: CPS }), T.snap[1], T.jump + 0.2, T.jump + 0.75]

function gState(t) {
  if (t < T.h1) return { mood: 'happy' }
  if (t < T.turn) return { mood: 'neutral', look: t < T.h2 ? [-1, -1] : [1, -1] }
  if (t < T.l3) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.pis) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.wake) return { mood: 'happy' }
  return { mood: t < T.jump ? 'sparkle' : 'happy', look: [0, 0] }
}
function sState(t) {
  if (t < T.h1) return { mood: 'neutral', look: [0, 0] }
  if (t < T.gasp) return { mood: 'squint', look: [1, -1] }
  if (t < T.wink[0]) return { mood: 'squint', look: [1, -1] }
  if (t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  if (t < T.turn) return { mood: 'neutral', look: [1, -1] }
  if (t < T.wake) return { mood: 'wide', look: [0, 0], blink: false }
  return { mood: 'happy' }
}
function vState(t) {
  if (t < T.h1) return { mood: 'neutral', look: [0, 0] }
  if (t < T.h2) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.squint) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.snap[1]) return { mood: 'wide', look: [-1, 1], blink: false }          // …it's still unrolling
  if (t < T.snap[1] + 0.35) return { mood: 'squint', look: [-1, 0] }
  if (t < T.turn) return { mood: 'happy' }
  if (t < T.wake) return { mood: 'wide', look: [0, 0], blink: false }
  return { mood: 'happy' }
}

// ── the portrait's face (cells): skin s, hair h, eyes e, mouth m, cheek c
const FACE = [
  '...hhhhhh...', '..hhhhhhhh..', '.hhssssssh..', '.hssssssssh.', '.hsseesseesh', '.hsseesseesh', '.hssssssssh.', '.hcsssssscs.',
  '..ssmmmmss..', '...ssmmss...', '....ssss....', '..pppppppp..', '.pppppppppp.',
]
const FACE_WIDE = FACE.map((r, j) => j === 8 ? '..sssmmsss..' : j === 9 ? '...ssmmss...' : r)
const FACE_C = { h: '#5a3a2a', s: '#f2c19a', e: INK, m: '#c4475f', c: '#ff9db4', p: '#7fb8ff' }

async function build(stage) {
  try {
    await Promise.all(['800 112px Inter', "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Three jobs. | *Two* are ours.', { top: 210, size: 116, accentSize: 170, at: T.h0, gap: 0.08, accentColor: GOLD, lineHeight: 1.0 })
  const H1 = popText(root, 'Job *one.*', { top: 250, size: 132, accentSize: 200, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: SCO.color })
  const H2 = popText(root, 'Job *two.*', { top: 250, size: 132, accentSize: 200, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: VIR.color })
  const H3 = popText(root, 'Job *three…*', { top: 250, size: 132, accentSize: 200, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Put your faith | in the *stars.*', { top: 210, size: 112, accentSize: 180, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── job one: the portrait + the velvet curtain
  function drawFrame(t) {
    const k = pop01(t, T.frameIn, 0.4, 2.2) * popOut(t, T.frameOut)
    if (k <= 0.01) return
    const { w, h } = FRAME, cx = FRAME.x, cy = FRAME.y + Math.sin(t * 2) * 6
    const c = 10
    x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.03 * Math.sin(t * 1.3))
    const dp = bounce(prog(t, ...T.drop))
    // the aura glow behind the frame once the curtain is down
    const qk = pop01(t, T.q, 0.5, 1.6)
    if (qk > 0) {
      const g = x.createRadialGradient(0, 0, 0, 0, 0, 340)
      g.addColorStop(0, `rgba(226,61,102,${0.45 * qk})`); g.addColorStop(0.5, `rgba(176,108,255,${0.25 * qk})`); g.addColorStop(1, 'rgba(176,108,255,0)')
      x.fillStyle = g; x.fillRect(-360, -360, 720, 720)
    }
    // frame: ink, gold, ink, then the picture
    x.fillStyle = INK; x.fillRect(-w / 2 - c, -h / 2 - c, w + 2 * c, h + 2 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#f7c948'; x.fillRect(-w / 2, -h / 2, w - c, c); x.fillRect(-w / 2, -h / 2, c, h - c)
    x.fillStyle = INK; x.fillRect(-w / 2 + 2 * c, -h / 2 + 2 * c, w - 4 * c, h - 4 * c)
    const iw = w - 6 * c, ih = h - 6 * c, ix = -iw / 2, iy = -ih / 2
    x.fillStyle = '#3b6fd8'; x.fillRect(ix, iy, iw, ih)
    x.fillStyle = '#5b8ff0'; x.fillRect(ix, iy, iw, ih * 0.45)
    const wide = t > T.gasp
    drawBits(x, wide ? FACE_WIDE : FACE, FACE_C, 0, ih * 0.08, 20, { outline: null })
    if (wide) { x.fillStyle = '#ffffff'; x.fillRect(-60, ih * 0.08 - 50, 8, 8); x.fillRect(40, ih * 0.08 - 50, 8, 8) }
    // the curtain: velvet folds dropping from the top bar
    if (dp > 0) {
      const chh = ih * dp
      for (let i = 0; i < iw; i += c) {
        const fold = Math.floor(i / (c * 3)) % 2
        const sway = Math.round(Math.sin(t * 3 + i * 0.05) * 2) * (1 - dp)
        x.fillStyle = fold ? '#5a1238' : '#7a1c4c'; x.fillRect(ix + i, iy, c + 0.5, chh + sway * c)
        if (!fold && (i / c) % 3 === 1) { x.fillStyle = '#a3306a'; x.fillRect(ix + i, iy, c * 0.6, chh) }
      }
      x.fillStyle = '#f7c948'; x.fillRect(ix, iy + chh - c, iw, c)                // gold fringe
      for (let i = 0; i < iw; i += 2 * c) { x.fillStyle = '#c98a1f'; x.fillRect(ix + i, iy + chh, c, c) }
    }
    // the curtain rod
    x.fillStyle = INK; x.fillRect(-w / 2 - 2 * c, -h / 2 - 2 * c, w + 4 * c, 3 * c)
    x.fillStyle = '#f7c948'; x.fillRect(-w / 2 - c, -h / 2 - c * 1.5, w + 2 * c, c * 1.5)
    if (qk > 0) drawBits(x, QMARK, { Y: '#f7c948', g: '#fff1c8' }, 0, 10 + Math.sin(t * 2.6) * 6, 15 * qk, { rot: 0.06 * Math.sin(t * 2.1) })
    x.restore()
    return { cx, cy, k }
  }
  // the rope from Scorpio to the rod: slack, then yanked
  function drawRope(t, sx, sy) {
    const k = pop01(t, T.frameIn + 0.2, 0.3) * popOut(t, T.frameOut)
    if (k <= 0.01) return
    const ax = FRAME.x - FRAME.w / 2 - 10, ay = FRAME.y - FRAME.h / 2 + 10
    const tight = ease.outCubic(prog(t, T.yank - 0.08, T.yank + 0.08))
    const sag = lerp(120, 10, tight)
    x.save(); x.globalAlpha = k
    for (let i = 0; i <= 26; i++) {
      const u = i / 26, px = lerp(ax, sx, u), py = lerp(ay, sy, u) + Math.sin(Math.PI * u) * sag
      x.fillStyle = INK; x.fillRect(Math.round(px) - 6, Math.round(py) - 6, 12, 12)
      x.fillStyle = i % 2 ? '#f7c948' : '#c98a1f'; x.fillRect(Math.round(px) - 3, Math.round(py) - 3, 7, 7)
    }
    x.restore()
  }

  // ── job two: the scroll with a chart wheel (unrolls, keeps going, snaps back)
  function drawScroll(t) {
    const k = pop01(t, T.scroll[0] - 0.4, 0.35, 2) * popOut(t, T.scrollOut)
    if (k <= 0.01) return
    const un = ease.outCubic(prog(t, ...T.scroll)), ov = ease.inQuad(prog(t, ...T.over)), sn = ease.outCubic(prog(t, ...T.snap))
    const len = lerp(40, 520, un) + 880 * ov * (1 - sn)
    const w = SCROLL.w, c = 10, top = SCROLL.y
    x.save(); x.translate(SCROLL.x, 0); x.scale(k, 1); x.globalAlpha = clamp(k)
    x.fillStyle = INK; x.fillRect(-w / 2 - c, top - c, w + 2 * c, len + 2 * c)
    x.fillStyle = '#f3e3bf'; x.fillRect(-w / 2, top, w, len)
    x.fillStyle = '#e2cc9a'; x.fillRect(w / 2 - 2 * c, top, 2 * c, len)
    // contents (clipped to the paper)
    x.save(); x.beginPath(); x.rect(-w / 2, top, w, len); x.clip()
    const wy = top + 200, R = 150
    x.strokeStyle = '#6b4b2a'; x.lineWidth = 7
    x.beginPath(); x.arc(0, wy, R, 0, Math.PI * 2); x.stroke()
    x.beginPath(); x.arc(0, wy, R * 0.62, 0, Math.PI * 2); x.stroke()
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; x.beginPath(); x.moveTo(Math.cos(a) * R * 0.62, wy + Math.sin(a) * R * 0.62); x.lineTo(Math.cos(a) * R, wy + Math.sin(a) * R); x.stroke() }
    const COLS = ['#f0603a', '#3fb6f0', '#2fc79a', '#e163d6', GOLD]
    for (let i = 0; i < 5; i++) { const a = i * 1.9 + 0.4; x.fillStyle = COLS[i]; x.fillRect(Math.cos(a) * R * 0.4 - 9, wy + Math.sin(a) * R * 0.4 - 9, 18, 18) }
    x.strokeStyle = 'rgba(107,75,42,0.55)'; x.lineWidth = 4
    x.beginPath(); x.moveTo(Math.cos(0.4) * R * 0.4, wy + Math.sin(0.4) * R * 0.4); x.lineTo(Math.cos(4.2) * R * 0.4, wy + Math.sin(4.2) * R * 0.4); x.lineTo(Math.cos(8) * R * 0.4, wy + Math.sin(8) * R * 0.4); x.stroke()
    x.fillStyle = 'rgba(107,75,42,0.55)'
    for (let j = 0; j < 40; j++) { const ly = wy + R + 50 + j * 34; x.fillRect(-w / 2 + 40, ly, (w - 100) * (0.55 + 0.4 * ((j * 7) % 5) / 4), 10) }
    x.restore()
    // the two rollers
    for (const ry of [top - c, top + len]) {
      x.fillStyle = INK; x.fillRect(-w / 2 - 3 * c, ry - 1.5 * c, w + 6 * c, 4 * c)
      x.fillStyle = '#c98a1f'; x.fillRect(-w / 2 - 2 * c, ry - 0.5 * c, w + 4 * c, 2 * c)
      x.fillStyle = '#f7c948'; x.fillRect(-w / 2 - 2 * c, ry - 0.5 * c, w + 4 * c, c * 0.8)
    }
    x.restore()
  }

  // ── the sky wakes: little stars blink open everywhere and look at you (final beat)
  const CROWD = Array.from({ length: 14 }, (_, i) => {
    const row = Math.floor(i / 7), k = i % 7
    const col = [GOLD, '#f39a3a', '#3fb6f0', '#e163d6', '#2fc79a', '#7c74f0', '#f0603a'][(i * 3) % 7]
    return { x: 95 + k * 148 + (row ? 70 : 0) + ((i * 53) % 30) - 15, y: (row ? 860 : 620) + ((i * 71) % 70) - 35, s: 70 + ((i * 37) % 4) * 14, t: T.wake + (i % 7) * 0.08 + Math.floor(i / 7) * 0.05, col, seed: 20 + i }
  })
  function drawCrowd(t) {
    const ok = popOut(t, T.out)
    for (const s of CROWD) {
      const p = pop01(t, s.t, 0.3, 2.2) * ok
      if (p <= 0.02) continue
      const lid = t < s.t + 0.35 ? 1 - prog(t, s.t + 0.15, s.t + 0.35) : undefined
      drawStarChar(x, s.x, s.y, s.s, t, { color: s.col, mood: 'neutral', look: [0, 0], blink: lid, pop: p, seed: s.seed, glow: 0.7, tips: false })
    }
  }

  function drawTrio(t) {
    const ok = popOut(t, T.out), pk = pushK(t)
    const zoom = 1 + 0.16 * pk, cy0 = 1100
    const at = (P) => ({ x: 540 + (P.x - 540) * zoom, y: cy0 + (P.y - cy0) * zoom + 30 * pk, size: P.size * zoom })
    const gP = at(G_P), sP = at(S_P), vP = at(V_P)
    // Pisces at the back (behind the trio), sobbing proudly
    const pp = pop01(t, T.pis, 0.4, 2.2) * ok
    if (pp > 0.02) {
      const P = { x: 905, y: 820 + (1 - pp) * 80, size: 170 }
      const r = drawStarChar(x, P.x, P.y, P.size, t, { color: PIS.color, glyph: null, mood: 'happy', pop: pp, seed: 11, glow: 0.8, hops: [T.pis + 0.3, T.pis + 0.9, T.pis + 1.5] })
      tears(x, t, starGeom(t, r, P.size, { pop: pp, seed: 11, hops: [T.pis + 0.3, T.pis + 0.9, T.pis + 1.5] }), r.x, T.pis + 0.15)
    }
    // Scorpio (left), holding the rope
    const sp = pop01(t, T.sIn, 0.36, 2.2) * ok
    let rS = null
    if (sp > 0.02) {
      const yank = t > T.yank && t < T.yank + 0.3 ? -0.12 * Math.sin(Math.PI * (t - T.yank) / 0.3) : 0
      rS = drawStarChar(x, sP.x, sP.y, sP.size, t, { color: SCO.color, glyph: SCO.glyph, ...sState(t), hops: S_HOPS, pop: sp, squash: yank, seed: 4, glow: 1.0 })
    }
    // Virgo (right), in glasses
    const vp = pop01(t, T.vIn, 0.36, 2.2) * ok
    if (vp > 0.02) {
      const vOpts = { color: VIR.color, glyph: VIR.glyph, ...vState(t), hops: V_HOPS, pop: vp, seed: 6, glow: 1.0 }
      const r = drawStarChar(x, vP.x, vP.y, vP.size, t, vOpts)
      const gk = pop01(t, T.h2 + 0.05, 0.3, 2.4)
      if (gk > 0.05) { x.save(); x.globalAlpha = clamp(gk); glasses(x, r.x, starGeom(t, r, vP.size, vOpts)); x.restore() }
    }
    // THE STARS (centre)
    const gp = pop01(t, T.gIn, 0.4, 2.2) * ok
    if (gp > 0.02) drawStarChar(x, gP.x, gP.y, gP.size, t, { color: STAR.sky, ...gState(t), hops: G_HOPS, pop: gp, seed: 2, glow: 1.2 })
    return rS
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const pk = pushK(t)
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.45, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      const wake = ease.outCubic(prog(t, T.wake, T.wake + 1.2))
      drawSky(x, t, { ...base, zoom: base.zoom * (1 + 0.05 * pk), dim: (base.dim ?? 1) * lerp(1, 0.72, pk) * lerp(1, 1.35, wake) })
      if (t < T.out[1] + 0.02) {
        drawCrowd(t)
        drawScroll(t)
        drawFrame(t)
        drawRope(t, S_P.x + 40, S_P.y - 40)
        drawTrio(t)
        if (t > T.q && t < T.q + 0.8) sparkles(x, t, FRAME.x, FRAME.y, T.q, 10, 230, 1, [GOLD, BONE, SCO.color])
        if (t > T.l3 + 0.9 && t < T.l3 + 1.7) sparkles(x, t, G_P.x, G_P.y - 40, T.l3 + 0.95, 12, 260, 2)
        if (t > T.jump && t < T.jump + 0.8) sparkles(x, t, 540, 1100, T.jump + 0.1, 14, 380, 3, [GOLD, BONE, PINK, LAV])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 12.7 (the box shuts → "Put your faith in the stars."). One cut for a 20 s film.
const CUTS = [{ t: 12.7, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]   // authored in D; the engine moves it into F
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: three stars pop in
  ...wordPops(T.h0, 5, 0.08, 0), ['pop', T.gIn + 0.05, 880, 0.045, 0], ['pop', T.sIn + 0.05, 587.33, 0.04, -0.4], ['pop', T.vIn + 0.05, 987.77, 0.04, 0.4],
  ['bell', T.h0Land, 1318.51, 0.025, 1.0, 0],
  // job one: portrait, gasp, curtain yank, "?"
  ...wordPops(T.h1, 1, 0.1, 2), ['pop', T.h1Land, 1318.51, 0.045, 0],
  ['pop', T.open, 880, 0.035, 0], ['pop', T.open + 0.06, 1174.66, 0.028, 0],
  ['whoosh', T.frameIn - 0.05, 0.3, 0.03], ['pop', T.frameIn + 0.2, 1567.98, 0.03, 0],
  ['pop', T.gasp, 440, 0.03, 0], ['whoosh', T.yank, 0.3, 0.05], ['tick', T.yank, 0.05], ['boom', T.drop[1] - 0.05, 0.12],
  ['bell', T.q + 0.05, 1567.98, 0.035, 1.3, 0], ['glitter', T.q, T.q + 0.5], ['pluck', T.wink[0], 1318.51, 0.035, 0.5, -0.3],
  // job two: glasses, scroll unrolls… and unrolls… snap
  ...wordPops(T.h2, 1, 0.1, 3), ['pop', T.h2Land, 1318.51, 0.045, 0], ['tick', T.h2 + 0.1, 0.03],
  ['whoosh', T.scroll[0], 0.5, 0.035], ['whoosh', T.over[0], 0.6, 0.045], ['pop', T.squint, 440, 0.03, 0.4],
  ['tick', T.snap[0], 0.05], ['whoosh', T.snap[0], 0.25, 0.04], ['pop', T.snap[1], 1174.66, 0.04, 0.4],
  // job three: the stare (silence), the line, Pisces sobs
  ...wordPops(T.h3, 1, 0.1, 4), ['pop', T.h3Land, 987.77, 0.05, 0], ['tick', T.turn + 0.02, 0.04],
  ...talkCues(LINES, { cps: CPS, pitch: { '♏ SCORPIO STAR': 587.33, '♍ VIRGO STAR': 987.77 } }),
  ['glitter', T.l3 + 0.95, T.l3 + 1.4], ['pop', T.pis, 659.25, 0.04, 0.5], ['pluck', T.pis + 0.3, 987.77, 0.025, 0.4, 0.5], ['pluck', T.pis + 0.9, 880, 0.022, 0.4, 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // the last line: the sky wakes, everyone hops
  ...wordPops(T.h4, 5, 0.08, 0, 0.026), ['pop', T.h4Land, 1318.51, 0.055, 0], ['pluck', T.h4Land, 987.77, 0.05, 0.7, 0],
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['pop', +(T.wake + i * 0.08).toFixed(3), NOTE[i], 0.018, (i % 2 ? 0.4 : -0.4)]),
  ['glitter', T.wake, T.wake + 0.9], ['bell', T.jump + 0.1, 1760, 0.03, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
