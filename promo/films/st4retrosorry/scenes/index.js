// st4retrosorry (EP 092, 20 s vertical, Star Talk season 4, thread E5: Retro the gremlin) · story 0–15.6, then the end card.
//   0.00–6.55  "Retro | *apologizes.*"  Retro (stretro's gold ☿ orb, rewind arrows chasing it the wrong way) spins
//              backwards, then grinds to a stop and looks at its feet. A paper note slides up: DRAFT APOLOGY. Its first two
//              tries get struck out in red ("sorry you feel that way", "sorry, but…": Saturn's lesson from EP 027).
//              Box (☿ RETRO): "i made everyone text their exes. sorry."  The third line writes itself:
//              "i did that. i'm sorry." ✓   Leo and Cancer (its victims in EP 015 and 034) squint at it, then soften.
//   6.60–12.6  "Look *back*…"  Box (THE STARS): "looking back is fine. *learn* something."  A line adds itself to the note:
//              "learned: think before i spin." → "then look *forward.*"  Retro starts turning the RIGHT way (arrows
//              clockwise) and its tag flips from ℞ RETROGRADE to ▶ DIRECT.  (Ghost: rises over the note's top edge.)
//  12.75       card cut (flip).
//  12.85–15.5  "Look back. | Then *forward.*"  Retro spins forward, centred, beaming; Leo and Cancer hop. Out by 15.5.
// Astrology: Mercury looks like it moves backwards about three times a year (about three weeks each), then "stations
// direct" and moves forward again.
// One canvas (sky + orb + note + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
export const EP = 92
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5a5a', INK = '#1b1236', MINT = '#7fe0b8'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.72, h0Out: [6.35, 6.55],
  orbIn: 0.3, stop: [1.3, 2.4], noteIn: [2.2, 2.7], strike: [BEAT(4), BEAT(5)],    // 2.82, 3.38
  starsIn: 2.5, open: 3.62, l1: 3.78, write3: [5.55, 6.35], ok3: 6.45,
  h1: 6.6, h1Land: 7.0, l2: 6.95, write4: [8.75, 9.75], l3: 10.25, direct: 10.3, flipTag: 10.7,
  ghost: 8.6, close: 12.45, noteOut: [12.3, 12.6], h1Out: [12.4, 12.6],
  cut: 12.75,
  h2: 12.85, h2Land: 13.3, h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const RETRO = '☿ RETRO', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: RETRO, color: GOLD, text: 'i made everyone text their exes. *sorry.*' },
  { t: T.l2, speaker: NARR, text: 'looking back is fine. *learn* something.' },
  { t: T.l3, speaker: NARR, text: 'then look *forward.*' },
]
const CPS = 24                                   // screwed: everybody talks a little slow
const LT = lineTimes(LINES, { cps: CPS })
const NOTE_LINES = [
  { text: 'sorry you feel that way', strike: T.strike[0] },
  { text: 'sorry, but…', strike: T.strike[1] },
  { text: 'i did that. i’m sorry.', write: T.write3, ok: T.ok3 },
  { text: 'learned: think before i spin.', write: T.write4, col: MINT },
]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
const ARROW = BMP(`..X.. .XX.. XXXXX .XX.. ..X..`)          // points left (−x)
const DROP = BMP(`..X.. ..X.. .XXX. XXWXX XXXXX .XXX.`)
function bits(x, bm, cx, cy, cell, col, { rot = 0, a = 1, col2 = '#ffffff' } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'W' ? col2 : col; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

const ORB_A = { x: 540, y: 790, r: 112 }, ORB_F = { x: 540, y: 900, r: 150 }
const NOTE = { x: 540, y: 1150, w: 640, h: 380 }
const LEO = { ...signStar('leo'), seed: 41 }, CAN = { ...signStar('cancer'), seed: 47 }
const SIDE_A = [[150, 1215, 150], [930, 1215, 150]], SIDE_F = [[210, 1420, 210], [870, 1420, 210]]

// the orb's spin angle (pure): backwards fast, decelerating to a stop; still; then forward, speeding up
function spinAngle(t) {
  const v0 = 3.0, [a, b] = T.stop
  if (t < a) return -v0 * t
  const stopA = -v0 * a - v0 * (b - a) / 2                  // linear decel area
  if (t < b) { const u = t - a; return -v0 * a - v0 * (u - u * u / (2 * (b - a))) }
  if (t < T.direct) return stopA
  const u = t - T.direct
  return stopA + 0.9 * u * u / 2 / 1.0 * Math.min(1, u) + (u > 1 ? 0.9 * (u - 1) : 0) * 1.4
}
function orbMood(t) {
  if (t < T.stop[0]) return { eyes: 'wide', look: [0, 0] }
  if (t < T.noteIn[1]) return { eyes: 'wide', look: [0, 1] }                        // dizzy stop, looks down
  if (t < T.l1) return { eyes: 'sad', look: [0, 1] }
  if (t < LT[0].done + 0.3) return { eyes: 'sad', look: [0, 0] }                    // says it to you
  if (t < T.ok3 + 0.3) return { eyes: 'sad', look: [0, 1] }
  if (t < T.l2) return { eyes: 'open', look: [0, 0] }
  if (t < T.write4[1]) return { eyes: 'open', look: [0, 1] }
  if (t < T.direct) return { eyes: 'open', look: [1, -1] }
  return { eyes: 'happy', look: [0, 0] }
}
function sideState(t, i) {
  const toward = i === 0 ? [1, -1] : [-1, -1]
  if (t < T.l1) return { mood: 'squint', look: toward }
  if (t < T.ok3 + 0.2) return { mood: t < LT[0].done ? 'squint' : 'neutral', look: toward }
  if (t < T.direct) return { mood: t < T.ok3 + 1.4 ? 'wide' : 'happy', look: toward }
  if (t < T.cut) return { mood: 'sparkle', look: toward }
  return { mood: t > 14.1 && t < 14.9 ? 'heart' : 'happy', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 124px Inter", "800 44px Inter", "italic 500 180px 'EB Garamond'", "italic 500 44px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Retro | *apologizes.*', { top: 180, size: 110, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: GOLD })
  const H1 = popText(root, 'Look *back…*', { top: 250, size: 128, accentSize: 180, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: LAV })
  const H2 = popText(root, 'Look back. | Then *forward.*', { top: 200, size: 120, accentSize: 172, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the orb sprite (16-cell gold ball), as in stretro
  const ORB_G = 16
  const orbBuf = document.createElement('canvas'); orbBuf.width = orbBuf.height = ORB_G
  {
    const o = orbBuf.getContext('2d'), h = ORB_G / 2
    for (let j = 0; j < ORB_G; j++) for (let i = 0; i < ORB_G; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d > 1) continue
      let c = d > 0.86 ? '#b8792a' : (u * 0.6 + v * 0.8 > 0.35 ? '#e0a743' : '#f7cf68')
      if (d <= 0.86 && Math.hypot(u + 0.38, v + 0.4) < 0.24) c = '#fff1c8'
      if (d > 0.86 && u + v < -0.6) c = '#ffd98a'
      o.fillStyle = c; o.fillRect(i, j, 1, 1)
    }
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function orbState(t) {
    if (t < T.cut) return { ...ORB_A, k: pop01(t, T.orbIn, 0.45, 1.8) }
    return { ...ORB_F, k: pop01(t, T.cut + 0.12, 0.42, 1.8) * popOut(t, T.out) }
  }
  function drawOrb(t) {
    const S0 = orbState(t), { r, k } = S0
    if (k <= 0.01) return
    const cx = S0.x, cy = S0.y + Math.sin(t * 2.3) * 6
    const fwd = t >= T.direct
    glow(cx, cy, r * 3, GOLD, (t > T.stop[1] && !fwd ? 0.55 : 0.9) * clamp(k))
    const spin = spinAngle(t)
    // chasing arrows: wrong way while retrograde (fading out as it stops), the right way once direct
    const arrowsA = fwd ? clamp(prog(t, T.direct, T.direct + 0.5)) : 1 - prog(t, T.stop[0] + 0.3, T.stop[1])
    if (arrowsA > 0.01) {
      const R = r * 1.62, cell = Math.max(3, Math.round(r * 0.07)) * k, dir = fwd ? 1 : -1
      x.save(); x.globalAlpha = arrowsA
      for (let i = 0; i < 3; i++) {
        const a = spin + i * Math.PI * 2 / 3
        for (let s = 1; s <= 4; s++) {
          const b = a - dir * s * 0.16
          x.fillStyle = rgba(fwd ? MINT : GOLD, 0.55 - s * 0.11); const q = cell * (1.6 - s * 0.25)
          x.fillRect(Math.round(cx + Math.cos(b) * R * k - q / 2), Math.round(cy + Math.sin(b) * R * k - q / 2), q, q)
        }
        bits(x, ARROW, cx + Math.cos(a) * R * k, cy + Math.sin(a) * R * k, cell, fwd ? '#d9fff0' : '#fff1c8', { rot: a + (fwd ? -Math.PI / 2 : Math.PI / 2) })
      }
      x.restore()
    }
    const S = Math.round(r * 2 * k / ORB_G) * ORB_G || r * 2 * k
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(spin); x.imageSmoothingEnabled = false
    x.fillStyle = 'rgba(14,8,32,0.6)'; x.beginPath(); x.arc(0, 0, S / 2 + 5, 0, Math.PI * 2); x.fill()
    x.drawImage(orbBuf, -S / 2, -S / 2, S, S)
    x.restore()
    // face (stays upright): pixel eyes, and its ☿ as a coin badge
    const M = orbMood(t), c = Math.max(3, Math.round(r * k / 9)), [lx, ly] = M.look
    const blinkT = (t + 0.3) % 3.3 < 0.13
    for (const s of [-1, 1]) {
      const ex = Math.round(cx + s * 2.6 * c), ey = Math.round(cy - 0.6 * c)
      x.fillStyle = INK
      if (M.eyes === 'happy') { x.fillRect(ex - 1.5 * c, ey + 0.5 * c, c, c); x.fillRect(ex - 0.5 * c, ey - 0.5 * c, c, c); x.fillRect(ex + 0.5 * c, ey + 0.5 * c, c, c) }
      else if (blinkT) x.fillRect(ex - 1.5 * c, ey + 0.5 * c, 3 * c, c * 0.8)
      else {
        const tall = M.eyes === 'wide' ? 3 : 2.4
        x.fillRect(ex - c + lx * c * 0.6, ey - c + ly * c * 0.6, 2 * c, tall * c)
        x.fillStyle = '#ffffff'; x.fillRect(ex - c + lx * c * 0.6, ey - c + ly * c * 0.6, c * 0.8, c * 0.8)
        if (M.eyes === 'sad') { x.fillStyle = INK; x.fillRect(ex - (s > 0 ? 1.4 : 0.6) * c, ey - 2.2 * c, 2 * c, c * 0.6); x.fillRect(ex - (s > 0 ? -0.4 : 1.6) * c, ey - 1.8 * c, c, c * 0.6) }
      }
    }
    // cheeks: blush when sorry, sparkle when direct
    if (M.eyes === 'sad' || M.eyes === 'happy') { x.fillStyle = rgba('#ff8fb1', 0.7); for (const s of [-1, 1]) x.fillRect(Math.round(cx + s * 4.6 * c - c), Math.round(cy + 1.6 * c), 2 * c, c) }
    const bx = cx + r * 0.72 * k, by = cy + r * 0.72 * k, br = r * 0.3 * k
    x.fillStyle = 'rgba(14,8,32,0.9)'; x.beginPath(); x.arc(bx, by, br + 4, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(bx, by, br, 0, Math.PI * 2); x.fill()
    x.font = `700 ${Math.round(br * 1.5)}px ${SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('☿︎', bx, by + br * 0.08)
    // a sweat drop while it owns up
    if (t > T.noteIn[1] && t < T.ok3 + 0.4) bits(x, DROP, cx - r * 0.9, cy - r * 0.55 + ((t * 0.7) % 1) * 30, 5, '#8fd8f6', { a: 0.9 })
    // the tag: ℞ RETROGRADE → ▶ DIRECT
    const tk = pop01(t, T.orbIn + 0.5, 0.3, 2.2) * k
    if (tk > 0.01 && t < T.cut) {
      const flip = prog(t, T.flipTag, T.flipTag + 0.3), sx = Math.abs(Math.cos(flip * Math.PI))
      const isD = flip > 0.5, label = isD ? '▶  DIRECT' : '℞  RETROGRADE', col = isD ? MINT : GOLD
      x.save(); x.translate(cx, cy - r * 1.62 - 56); x.scale(tk * sx, tk)
      x.font = `700 30px ${MONO}`; x.letterSpacing = '4px'; const tw = x.measureText(label).width
      const pw = tw + 44, ph = 58
      x.fillStyle = 'rgba(20,12,44,0.92)'; x.beginPath(); x.roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2); x.fill()
      x.lineWidth = 3; x.strokeStyle = rgba(col, 0.9); x.stroke()
      x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(label, 2, 2)
      x.restore()
    }
  }

  // ── the note: DRAFT APOLOGY on lined paper
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function drawNote(t) {
    if (t < T.noteIn[0] || t > T.noteOut[1]) return null
    const up = easeOutBack(prog(t, ...T.noteIn), 1.3), o = ease.inCubic(prog(t, ...T.noteOut))
    const cx = NOTE.x, cy = lerp(2250, NOTE.y, up) + o * 700 + Math.sin(t * 1.7) * 4, w = NOTE.w, h = NOTE.h
    x.save(); x.translate(cx, cy); x.rotate(-0.025)
    x.save(); x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 40; x.shadowOffsetY = 12
    rr(-w / 2, -h / 2, w, h, 14); x.fillStyle = '#f6efdc'; x.fill(); x.restore()
    x.fillStyle = 'rgba(255,143,177,0.5)'; x.fillRect(-w / 2 + 70, -h / 2, 3, h)               // margin rule
    x.fillStyle = '#2a1f5a'; x.font = `700 26px ${MONO}`; x.letterSpacing = '5px'; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('DRAFT APOLOGY', -w / 2 + 92, -h / 2 + 40); x.letterSpacing = '0px'
    NOTE_LINES.forEach((L, i) => {
      const ly = -h / 2 + 108 + i * 72
      x.fillStyle = 'rgba(80,120,200,0.28)'; x.fillRect(-w / 2 + 20, ly + 26, w - 40, 2)
      let s = L.text
      if (L.write) { const n = Math.floor(clamp(prog(t, ...L.write)) * s.length + 0.001); if (n <= 0) return; s = s.slice(0, n) }
      x.font = `italic 500 44px ${SERIF}`; x.fillStyle = L.col ? '#1f7a58' : '#2a1f5a'; x.textAlign = 'left'
      x.fillText(s, -w / 2 + 92, ly + 4)
      if (L.strike != null) {
        const p = ease.outCubic(prog(t, L.strike, L.strike + 0.25)), tw = x.measureText(L.text).width
        if (p > 0) { x.fillStyle = RED; x.fillRect(-w / 2 + 86, ly + 2, (tw + 14) * p, 6); if (p >= 1) { x.font = `700 40px ${MONO}`; x.fillText('✕', -w / 2 + 92 + tw + 22, ly + 4) } }
      }
      if (L.ok) {
        const k = pop01(t, L.ok, 0.3, 2.4)
        if (k > 0.01) { const tw = x.measureText(L.text).width; x.save(); x.translate(-w / 2 + 92 + tw + 40, ly + 2); x.scale(k, k); x.font = `700 46px ${MONO}`; x.fillStyle = '#1f9a68'; x.textAlign = 'center'; x.fillText('✓', 0, 0); x.restore() }
      }
    })
    x.restore()
    return { top: cy - h / 2, left: cx - w / 2 }
  }

  function drawSides(t) {
    const fin = t >= T.cut
    const L = fin ? SIDE_F : SIDE_A
    ;[LEO, CAN].forEach((s, i) => {
      const p = L[i]
      let pk = fin ? pop01(t, T.cut + 0.1 + i * 0.05, 0.36, 2.2) * popOut(t, T.out) : pop01(t, T.starsIn + i * 0.12, 0.36, 2.2) * (1 - ease.inCubic(prog(t, T.noteOut[0], T.noteOut[1])))
      if (pk <= 0.02) return
      const hops = [T.starsIn + 0.3 + i * 0.12, T.ok3 + 0.1, T.direct + 0.2 + i * 0.06, T.h2Land + 0.05 * i, 14.0 + 0.08 * i, 14.7 + 0.06 * i]
      drawStarChar(x, p[0], p[1], p[2], t, { color: s.color, glyph: p[2] >= 120 ? s.glyph : null, ...sideState(t, i), hops, seed: s.seed, pop: pk, glow: 0.9 })
    })
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, MINT, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        drawOrb(t)
        const N = drawNote(t)
        if (N) drawGhostCameo(x, t, { x: N.left + 520, y: N.top + 2, at: T.ghost, dur: 1.3, from: 'below', cell: 3 })
        drawSides(t)
        sparkles(t, NOTE.x, NOTE.y, T.ok3, 10, 300, 1)
        sparkles(t, ORB_A.x, ORB_A.y, T.direct + 0.4, 12, 220, 2)
        sparkles(t, ORB_F.x, ORB_F.y, T.h2Land, 12, 260, 3, [GOLD, BONE, PINK, LAV])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.6 (inert: the box swaps speakers), 12.75 (box shut → the last line, the one that plays).
const CUTS = [6.6, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE_HZ = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.1, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  // backwards spin, grinding down to a stop
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['pop', +(T.orbIn + 0.1 + i * 0.16 + i * i * 0.02).toFixed(3), NOTE_HZ[6 - i], 0.02, 0]),
  ['boom', T.stop[1] - 0.05, 0.12], ['tick', T.stop[1], 0.04],
  ['whoosh', T.noteIn[0], 0.4, 0.035], ['pop', T.noteIn[1], 659.25, 0.035, 0],
  ['chip', T.strike[0], 330, 0.18, { wave: 'square', gain: 0.022 }], ['chip', T.strike[1], 294, 0.18, { wave: 'square', gain: 0.022 }],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [RETRO]: 520, [NARR]: 880 } }),
  ...Array.from({ length: 11 }, (_, i) => ['tick', +(T.write3[0] + i * (T.write3[1] - T.write3[0]) / 11).toFixed(3), 0.022]),
  ['pluck', T.ok3, 1318.51, 0.04, 0.6, 0], ['glitter', T.ok3, T.ok3 + 0.4],
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 880, 0.045, 0],
  ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.write4[0] + i * (T.write4[1] - T.write4[0]) / 14).toFixed(3), 0.02]),
  ['tick', T.ghost + 0.05, 0.014],
  // stations direct: a rising run, the tag flips
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', +(T.direct + 0.05 + i * 0.13).toFixed(3), NOTE_HZ[i], 0.022, 0]),
  ['bell', T.flipTag + 0.15, 1318.51, 0.04, 1.4, 0], ['glitter', T.direct + 0.4, T.direct + 0.9],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0], ['whoosh', T.noteOut[0], 0.3, 0.03],
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['pluck', 14.0, 1318.51, 0.032, 0.5, -0.2], ['pop', 14.7, 1046.5, 0.025, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
