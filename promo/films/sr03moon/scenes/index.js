// sr03moon (20 s vertical Align ad, Star Talk Remix of teaser 03 "Tonight's moon") · story 0–15.6, then the end card.
//   0.00–5.40  "Tonight's | *moon.*"  The huge moon rises and waxes from a thin crescent to tonight's waxing gibbous (82%),
//              a mono readout counting. As the light spreads, it reveals sticky notes stuck all over the moon: the moon
//              literally has notes. The pale ☽ Moon star pops up in front of it.
//              Drop (2.82): box (☽ THE MOON): "tonight's moon has *notes* for you."
//   4.70–7.60  The biggest note peels off and flies to the front: MOON IN SAGITTARIUS · "say the honest thing."
//              "Moon in | *Sagittarius.*"  Box: "moon in Sagittarius: say the *honest* thing."
//   7.60–12.5  A phone rises. The draft types: "honestly? you chew kinda loud". The Moon star goes wide-eyed and slaps a
//              sticky note on the phone: "+ KINDLY".  "Honest. | Not *brutal.*"  Box: "honest, babe. not *brutal.*"
//              The draft deletes and retypes: "honestly? I really like you." ✓ sent. Heart eyes; Pisces sobs behind the moon.
//  12.55       card cut (flip).
//  12.65–15.5  "Say the honest | thing. *Kindly.*"  The moon, the star heart-eyed, the sent text on the phone.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// One canvas (sky + moon + notes + phone + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawMoon, litOf, phaseName } from '../../../src/scenes/fx-moon.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff', NOTE = '#ffe27a', NOTE_D = '#e9be3f'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const PIS = signStar('pisces')

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.25, 5.45],
  rise: [0.2, 2.8], wax: [0.2, 3.0], starIn: 1.4,
  open: 2.66, l1: 2.9,
  peel: [4.7, 5.25], h1: 5.5, h1Land: 5.85, h1Out: [8.55, 8.75], l2: 5.75, noteAway: [7.5, 7.85],
  phone: [7.6, 8.05], moonUp: [7.6, 8.1], draft1: 8.15, gasp: 9.0, slap: [9.0, 9.2], l3: 9.35,
  h2: 8.95, h2Land: 9.3, h2Out: [12.35, 12.55],
  del: [10.35, 10.7], draft2: 10.8, send: 11.85, pisces: [11.0, 12.4],
  close: 12.45, cut: 12.55,
  h3: 12.65, h3Land: 13.15, out: [15.05, 15.45],
}
const TAG = '☽ THE MOON'
const LINES = [
  { t: T.l1, speaker: TAG, color: MOONLIGHT, text: "tonight's moon has *notes* for you." },
  { t: T.l2, speaker: TAG, color: MOONLIGHT, text: 'moon in Sagittarius: say the *honest* thing.' },
  { t: T.l3, speaker: TAG, color: MOONLIGHT, text: 'honest, babe. not *brutal.*' },
]
const CPS = 30
const DRAFT1 = 'honestly? you chew kinda loud', DRAFT2 = 'honestly? I really like you.'
const DRAFT_DT = 0.03

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const DROP = ['.X.', 'XWX', 'XXX', '.X.']
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// ── layout
const R = 330
const MOON = { x: 540, y: 850 }, MOON_UP = { x: 600, y: 770 }
const P0 = 0.05, P1 = 0.3605                                    // thin crescent → waxing gibbous 82% (as the original)
const phaseAt = t => lerp(P0, P1, ease.inOutCubic(prog(t, ...T.wax)))
// sticky notes on the moon face: [dx, dy, rot, scribble rows]; NOTES[0] is the one that peels off
const NOTES = [[150, -120, 0.12, 3], [30, 100, -0.1, 2], [215, 120, 0.08, 3], [-95, -55, -0.16, 2], [-30, -190, 0.06, 2]]
const NOTE_S = 86
const STAR_A = { x: 860, y: 1195, s: 220 }, STAR_B = { x: 845, y: 1170, s: 230 }
const PHONE = { x: 330, y: 1030, w: 400, h: 560 }

function moonPos(t) {
  if (t >= T.cut) return { x: MOON_UP.x, y: MOON_UP.y + Math.sin(t * 0.9) * 6 }
  const k = ease.outCubic(prog(t, ...T.rise)), u = ease.inOutCubic(prog(t, ...T.moonUp))
  return { x: lerp(MOON.x, MOON_UP.x, u), y: lerp(1560, MOON.y, k) + (MOON_UP.y - MOON.y) * u + Math.sin(t * 0.9) * 6 }
}
function starState(t) {
  if (t < T.l1) return { mood: 'happy', look: [-1, -1] }
  if (t < T.peel[0]) return { mood: 'happy', look: [0, 0] }
  if (t < T.peel[1] + 0.2) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.draft1 + 0.3) return { mood: 'happy', look: [0, 0] }
  if (t < T.gasp) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.slap[1] + 0.5) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.del[0]) return { mood: 'squint', look: [0, 0] }
  if (t < T.send) return { mood: 'neutral', look: [-1, 0] }
  return { mood: 'heart' }
}
const STAR_HOPS = [T.starIn + 0.3, ...talkHops(LINES, TAG, { cps: CPS }), T.slap[0], T.send + 0.1, T.h3Land]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 34px Inter", "italic 500 190px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, "Tonight's | *moon.*", { top: 170, size: 112, accentSize: 190, at: T.h0, gap: 0.1, accentColor: MOONLIGHT, wobble: true, late: 1, lateAt: T.h0 + 0.3 })
  const H1 = popText(root, 'Moon in | *Sagittarius.*', { top: 170, size: 112, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: LAV, fit: true })
  const H2 = popText(root, 'Honest. | Not *brutal.*', { top: 150, size: 112, accentSize: 170, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK })
  const H3 = popText(root, 'Say the honest | thing. *Kindly.*', { top: 150, size: 108, accentSize: 160, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: MOONLIGHT, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawNote(cx, cy, s, rot, rows, alpha, { big = false } = {}) {
    if (alpha <= 0.01) return
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
    x.shadowColor = 'rgba(10,6,30,0.45)'; x.shadowBlur = 10 * s / NOTE_S; x.shadowOffsetY = 4 * s / NOTE_S
    x.fillStyle = NOTE; x.fillRect(-s / 2, -s / 2, s, s)
    x.shadowColor = 'transparent'
    x.fillStyle = NOTE_D; x.fillRect(-s / 2, -s / 2, s, s * 0.14)                     // the sticky strip
    x.beginPath(); x.moveTo(s / 2, s / 2 - s * 0.2); x.lineTo(s / 2 - s * 0.2, s / 2); x.lineTo(s / 2, s / 2); x.closePath(); x.fillStyle = '#d8a92e'; x.fill()
    if (!big) {
      x.fillStyle = 'rgba(40,26,80,0.75)'
      for (let i = 0; i < rows; i++) x.fillRect(-s * 0.36, -s * 0.12 + i * s * 0.18, s * (i === rows - 1 ? 0.42 : 0.7), Math.max(2, s * 0.05))
    } else {
      const k = s / 360
      x.fillStyle = '#5a3c9e'; x.font = `700 ${Math.round(26 * k)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('MOON IN SAGITTARIUS', 0, -s * 0.22)
      x.fillStyle = INK; x.font = `italic 500 ${Math.round(64 * k)}px ${SERIF}`
      x.fillText('say the', 0, -s * 0.02); x.fillText('honest thing.', 0, s * 0.17)
      x.strokeStyle = '#e8508a'; x.lineWidth = 5 * k; x.beginPath(); x.moveTo(-s * 0.3, s * 0.28); x.quadraticCurveTo(0, s * 0.33, s * 0.3, s * 0.27); x.stroke()
    }
    x.restore()
  }

  function drawMoonAndNotes(t) {
    const ok = popOut(t, T.out)
    const m = moonPos(t), p = phaseAt(t), k = litOf(p)
    drawMoon(x, m.x, m.y, R, p, { alpha: ok, glow: 2.4, earthshine: 0.8, darkAlpha: 0.7 })
    const term = R * (1 - 2 * k)                                   // lit for dx > term (waxing: the right side)
    NOTES.forEach(([dx, dy, rot, rows], i) => {
      if (i === 0 && t >= T.peel[0]) return
      const reveal = clamp((dx - NOTE_S * 0.5 - term) / 50) * ok
      const flutter = 0.03 * Math.sin(t * 3 + i)
      drawNote(m.x + dx, m.y + dy, NOTE_S, rot + flutter, rows, reveal)
    })
    // the peeled note: lifts off the moon, flies to the front big, then drifts up and away
    if (t >= T.peel[0] && t < T.noteAway[1]) {
      const [dx, dy, rot] = NOTES[0]
      const pk = ease.inOutCubic(prog(t, ...T.peel)), aw = ease.inCubic(prog(t, ...T.noteAway))
      const cx = lerp(m.x + dx, 540, pk), cy = lerp(m.y + dy, 860, pk) - Math.sin(Math.PI * pk) * 80 - aw * 900
      const s = lerp(NOTE_S, 380, pk), r = lerp(rot, -0.05, pk) + Math.sin(Math.PI * pk) * 0.4 + aw * 0.5
      drawNote(cx, cy, s, r, 3, 1, { big: pk > 0.5 })
    }
  }

  function drawReadout(t) {
    const a = clamp(prog(t, 0.25, 0.6)) * outK(t, [T.h0Out[0] - 0.4, T.h0Out[0]])
    if (a <= 0) return
    const p = phaseAt(t), pct = Math.round(litOf(p) * 100)
    x.save(); x.globalAlpha = a; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.shadowColor = 'rgba(8,5,34,0.9)'; x.shadowBlur = 14
    x.fillStyle = 'rgba(239,230,214,0.85)'; x.fillText(`TONIGHT · ${phaseName(p)} · ${pct}%`.split('').join(String.fromCharCode(8202)), 430, 1268)
    x.restore()
  }

  function typed(text, t0, t) { const n = clamp(Math.floor((t - t0) / DRAFT_DT) + 1, 0, text.length); return t < t0 ? '' : text.slice(0, n) }
  function wrap(s, maxW) {
    const out = []; let cur = ''
    for (const w of s.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (x.measureText(nx).width > maxW && cur) { out.push(cur); cur = w } else cur = nx }
    if (cur) out.push(cur); return out
  }
  function draftText(t) {
    if (t < T.del[0]) return { s: typed(DRAFT1, T.draft1, t), sent: false }
    if (t < T.draft2) { const n = Math.round(DRAFT1.length * (1 - prog(t, ...T.del))); return { s: DRAFT1.slice(0, n), sent: false } }
    return { s: typed(DRAFT2, T.draft2, t), sent: t >= T.send }
  }

  function drawPhone(t) {
    const ok = popOut(t, T.out)
    const pin = ease.outBack(prog(t, ...T.phone)) * ok
    if (pin <= 0.01) return
    const { w, h } = PHONE
    const cx = PHONE.x, cy = PHONE.y + (1 - clamp(pin)) * 500 + Math.sin(t * 1.7) * 5
    const shake = t > T.slap[1] && t < T.slap[1] + 0.3 ? Math.sin(t * 70) * 6 * (1 - (t - T.slap[1]) / 0.3) : 0
    x.save(); x.globalAlpha = clamp(pin * 1.5); x.translate(cx + shake, cy); x.rotate(-0.04)
    x.shadowColor = 'rgba(4,2,14,0.7)'; x.shadowBlur = 30; x.shadowOffsetY = 12
    x.fillStyle = '#0d0820'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 48); x.fill()
    x.shadowColor = 'transparent'
    x.strokeStyle = 'rgba(201,166,255,0.55)'; x.lineWidth = 3; x.stroke()
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1a5e'); g.addColorStop(1, '#170f38')
    x.fillStyle = g; x.beginPath(); x.roundRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 36); x.fill()
    x.fillStyle = '#0d0820'; x.beginPath(); x.roundRect(-50, -h / 2 + 24, 100, 22, 11); x.fill()            // the notch
    // header chip: tonight's sky
    x.fillStyle = 'rgba(188,210,255,0.16)'; x.beginPath(); x.roundRect(-w / 2 + 40, -h / 2 + 70, w - 80, 50, 25); x.fill()
    x.fillStyle = MOONLIGHT; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('TONIGHT · MOON IN SAG', 0, -h / 2 + 96)
    // the draft bubble (right-aligned, like an outgoing text)
    const d = draftText(t)
    x.font = `800 34px ${INTER}`
    const rows = d.s ? wrap(d.s, w - 130) : []
    const bw = Math.max(80, ...rows.map(r => x.measureText(r).width)) + 44, bh = Math.max(1, rows.length) * 44 + 30
    const bx = w / 2 - 34 - bw, by = 30
    const sentK = clamp(prog(t, T.send, T.send + 0.25))
    x.fillStyle = sentK > 0 ? `rgba(255,143,177,${0.35 + 0.65 * sentK})` : 'rgba(239,230,214,0.14)'
    x.beginPath(); x.roundRect(bx, by - bh / 2, bw, bh, 22); x.fill()
    x.fillStyle = sentK > 0.5 ? INK : BONE; x.textAlign = 'left'
    rows.forEach((r, i) => x.fillText(r, bx + 22, by - bh / 2 + 37 + i * 44))
    if (!d.sent && Math.floor(t * 2.6) % 2 === 0) {                                                     // the caret
      const last = rows[rows.length - 1] || ''
      x.fillStyle = MOONLIGHT; x.fillRect(bx + 24 + x.measureText(last).width, by - bh / 2 + 18 + (Math.max(1, rows.length) - 1) * 44, 4, 38)
    }
    // send row
    x.fillStyle = 'rgba(239,230,214,0.1)'; x.beginPath(); x.roundRect(-w / 2 + 36, h / 2 - 110, w - 72, 64, 32); x.fill()
    x.fillStyle = d.sent ? GOLD : 'rgba(239,230,214,0.5)'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'
    x.fillText(d.sent ? 'SENT ✓' : 'SEND', 0, h / 2 - 77)
    // the KINDLY note, slapped on
    const sl = prog(t, ...T.slap)
    if (sl > 0) {
      const s = lerp(280, 150, ease.outCubic(sl))
      x.save(); x.translate(w * 0.2, -h * 0.3); x.rotate(0.18)
      x.globalAlpha *= clamp(sl * 3)
      x.fillStyle = NOTE; x.fillRect(-s / 2, -s / 2, s, s * 0.8)
      x.fillStyle = NOTE_D; x.fillRect(-s / 2, -s / 2, s, s * 0.12)
      x.fillStyle = '#c2185b'; x.font = `800 ${Math.round(s * 0.2)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('+ KINDLY', 0, s * 0.0)
      x.restore()
    }
    x.restore()
  }

  function sparkles(t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK, MOONLIGHT]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.17, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      const hx = cx + side * 220 + Math.sin(p * 7 + i) * 18, hy = cy - 60 - p * 240
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  function tears(t, ex, ey, t0, t1, b) {
    for (let i = 0; i < 16; i++) {
      const born = t0 + i * 0.13
      if (born > t1) break
      const d = t - born
      if (d < 0 || d > 0.6) continue
      const side = i % 2 ? 1 : -1
      drawBits(x, DROP, { X: '#7fd6ff', W: '#e9f7ff' }, Math.round(ex + side * 22 * b + side * d * 40), Math.round(ey + 10 + d * 100 + d * d * 160), 4 * b, { alpha: 1 - d / 0.6 })
    }
  }

  function drawPisces(t) {
    const [a, b] = T.pisces
    const k = ease.outBack(prog(t, a, a + 0.35)) * (1 - ease.inQuad(prog(t, b - 0.3, b)))
    if (k <= 0.01) return
    const m = moonPos(t)
    const r = drawStarChar(x, m.x + R - 40 + 75 * k, m.y + 40, 120, t, { color: PIS.color, mood: 'sparkle', look: [-1, 1], seed: 12, hops: [a + 0.4, a + 0.9], glow: 0.8, tips: false })
    tears(t, r.x, r.y, a + 0.3, b - 0.3, 0.95)
  }

  function drawStar(t) {
    const ok = popOut(t, T.out)
    const pin = pop01(t, T.starIn, 0.38, 2.2) * ok
    if (pin <= 0.02) return null
    const u = ease.inOutCubic(prog(t, ...T.phone))
    let px = lerp(STAR_A.x, STAR_B.x, u), py = lerp(STAR_A.y, STAR_B.y, u)
    const sl = prog(t, T.slap[0] - 0.15, T.slap[1] + 0.25)                   // lunges at the phone and back
    if (sl > 0 && sl < 1) { const j = Math.sin(Math.PI * sl); px -= j * 230; py -= j * 160 }
    const gasp = t >= T.gasp - 0.1 && t < T.gasp + 0.4 ? -0.12 * Math.exp(-(t - T.gasp + 0.1) * 7) * Math.cos((t - T.gasp) * 20) : 0
    return drawStarChar(x, px, py, lerp(STAR_A.s, STAR_B.s, u), t, { color: MOONC, glyph: '☽', ...starState(t), hops: STAR_HOPS, pop: pin, squash: gasp, seed: 7, glow: 1.15 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, moon: null })
      if (t < T.out[1] + 0.02) {
        if (t < T.cut) drawPisces(t)
        drawMoonAndNotes(t)
        drawReadout(t)
        if (t < T.cut) sparkles(t, 540, 860, T.peel[1] - 0.1, 10, 240, 0.4)
        drawPhone(t)
        if (t < T.cut) sparkles(t, PHONE.x + 80, PHONE.y - 170, T.slap[1], 8, 90, 1, [GOLD, NOTE, BONE])
        const r = drawStar(t)
        if (r && t > T.send) floatHearts(t, r.x, r.y, T.send + 0.05, T.out[0], 3, 6)
        if (t < T.cut) sparkles(t, PHONE.x + 60, PHONE.y + 30, T.send, 10, 160, 2, [PINK, GOLD, BONE])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: 12.55 (box shut → "Say the honest thing. Kindly."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE_HZ = [392, 440, 493.88, 587.33, 659.25, 783.99, 880]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
const keyTicks = (s, t0) => [...s].map((ch, i) => [ch, +(t0 + i * DRAFT_DT).toFixed(3)]).filter(([ch], i) => ch !== ' ' && i % 2 === 0).map(([, t], i) => ['tick', t, 0.025 + (i % 3) * 0.006])
const revealPings = NOTES.slice(0, 5).map((n, i) => ['pluck', +(1.3 + i * 0.32).toFixed(3), NOTE_HZ[(i * 2) % 7] * 2, 0.026, 0.4, n[0] / 300])
export const CUES = [
  // hook: the moon rises and waxes, notes appear in the light
  ...wordPops(T.h0, 1, 0.1, 0, 0.026), ['pop', T.h0 + 0.3, 783.99, 0.045, 0],
  ['riser', 0.2, 2.8, 0.06], ['whoosh', 0.3, 1.2, 0.05], ...revealPings,
  ['pop', T.starIn + 0.05, 659.25, 0.045, 0.3], ['pop', T.starIn + 0.3, 880, 0.03, 0.3],
  ['bell', 3.0, 1174.66, 0.03, 1.6, 0],
  ['pop', T.open, 587.33, 0.04, 0], ['pop', T.open + 0.06, 783.99, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // the note peels off
  ['tick', T.peel[0], 0.05], ['whoosh', T.peel[0] + 0.05, 0.5, 0.05], ['pop', T.peel[1], 987.77, 0.04, 0], ['glitter', T.peel[1] - 0.1, T.peel[1] + 0.4],
  ...wordPops(T.h1, 2, 0.08, 1, 0.026), ['pop', T.h1Land, 880, 0.045, 0],
  ['whoosh', T.noteAway[0], 0.4, 0.035],
  // the phone and the brutal draft
  ['whoosh', T.phone[0], 0.45, 0.04], ...keyTicks(DRAFT1, T.draft1),
  ['pop', T.gasp, 392, 0.04, 0], ['boom', T.slap[1], 0.14], ['tick', T.slap[1], 0.1], ['pop', T.slap[1] + 0.02, 1174.66, 0.035, -0.3],
  ...wordPops(T.h2, 2, 0.08, 3, 0.026), ['pop', T.h2Land, 987.77, 0.045, 0],
  ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.del[0] + i * 0.06).toFixed(3), 0.03]),
  ...keyTicks(DRAFT2, T.draft2),
  ['whoosh', T.send - 0.05, 0.3, 0.04], ['pluck', T.send + 0.05, 1174.66, 0.045, 0.5, 0], ['pluck', T.send + 0.17, 1567.98, 0.04, 0.5, 0], ['glitter', T.send, T.send + 0.5],
  ['pop', T.pisces[0] + 0.1, 659.25, 0.028, 0.4], ['pop', T.pisces[0] + 0.5, 587.33, 0.026, 0.4], ['pop', T.pisces[0] + 0.62, 493.88, 0.026, 0.4],
  ['pop', T.close, 783.99, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // last line
  ...wordPops(T.h3, 4, 0.08, 0, 0.026), ['pop', T.h3Land, 1174.66, 0.055, 0], ['pluck', T.h3Land, 783.99, 0.05, 0.7, 0], ['bell', T.h3Land + 0.05, 1567.98, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
