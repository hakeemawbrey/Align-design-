// starcap (16 s vertical Align ad, Star Talk batch 3) · story 0–11.6, then the shared end card ("come" + the Align logo).
//   0.00–5.80  "Dear *Capricorn…*"  The green ♑ star (Saturn-ruled, cardinal earth) in a little pixel tie, at a desk,
//              typing on a laptop, squinting. Behind it a wall calendar: every single square says WORK.
//              Drop (2.82): THE STARS: "you scheduled love for Q3." One tiny pink square in the corner lights up: LOVE (Q3).
//              The star glances at it, then back at the laptop.
//   5.80–9.05  "Ruled by Saturn. | Booked till *2031.*"  THE STARS: "the stars don't do *calendar invites.*" → wide eyes…
//              it slides the laptop SHUT (clack), the tie loosens, the WORK squares fade, and it smiles.
//   9.12 cut → "Log *off.* | Show up."  Desk gone; the star (tie askew) hops, and the blue ♋ Cancer star (its opposite
//              sign) pops in beside it. Heart eyes. Everything pops out by 11.45; the end card takes over at 11.6.
// One canvas (sky + calendar + desk + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'

export const DURATION = 16
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 11.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const CAP = signStar('capricorn'), CAN = signStar('cancer')
const GREEN = CAP.color, ACC = '#7ff0c8'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.62, 5.8],
  star: 0.35, desk: 0.5, cal: 0.75, typing: [1.0, 2.7],
  open: 2.62, l1: 2.84, love: 3.42, lookLove: 3.6, backToWork: 4.6, typing2: [4.7, 5.7],
  h1: 5.86, h1Land: 6.3, l2: 6.0, gasp: 6.1, shut: [7.55, 7.8], tie: 7.95, smile: 8.05, fade: [7.9, 8.5],
  close: 9.0, h1Out: [8.86, 9.04],
  cut: 9.12, h2: 9.18, h2Land: 9.62, canIn: 9.85, heart: 10.3, h2Out: [11.15, 11.4], out: [11.05, 11.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'you scheduled love for *Q3.*', color: PINK },
  { t: T.l2, speaker: SPEAK, text: "the stars don't do *calendar invites.*", color: ACC },
]
const CPS = 30


const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
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
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
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


// ── pixel props
const TIE = ['.KKK.', '.RRR.', '..R..', '.RRR.', '.RrR.', 'RRrRR', 'RRRRR', '.RRR.', '..R..']
const TIE_C = { K: '#7a1f33', R: '#d8344f', r: '#ffd36b' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const STAR0 = { x: 400, y: 1080, size: 330 }
const DESK = { x0: 120, x1: 960, y: 1215, h: 46 }
const LAP = { x: 740, w: 300, h: 190 }          // laptop centre x on the desk; screen w × h
const CAL = { x: 540, y: 590, cols: 5, rows: 4, cw: 86, ch: 58 }   // left/top of the grid
const STAR_F = { x: 370, y: 1150, size: 360 }   // final beat (desk gone)
const CAN_F = { x: 740, y: 1160, size: 320 }
const LOW = 0

function capState(t) {
  const tap = t >= T.typing[0] && t < T.typing[1] || t >= T.typing2[0] && t < T.typing2[1]
  if (t < T.desk + 0.3) return { mood: 'happy' }
  if (t < T.lookLove) return { mood: 'squint', look: [1, 1], blink: tap ? false : undefined }   // grinding
  if (t < T.backToWork) return { mood: 'wide', look: [1, -1], blink: false }                    // oh. that square.
  if (t < T.l2) return { mood: 'squint', look: [1, 1], blink: false }                           // …back to work
  if (t < T.shut[0]) return { mood: 'wide', look: [0, 0], blink: false }                        // "the stars don't…"
  if (t < T.smile) return { mood: 'neutral', look: [1, 1] }                                     // closes it
  if (t < T.cut) return { mood: 'happy' }
  if (t < T.canIn + 0.3) return { mood: 'happy' }
  if (t < T.heart) return { mood: 'wide', look: [1, 0], blink: false }
  return { mood: 'heart' }
}
const TAPS = []
for (const [a, b] of [T.typing, T.typing2]) for (let k = a; k < b; k += 0.28) TAPS.push(+k.toFixed(3))
const CAP_HOPS = [T.star + 0.3, T.gasp, T.smile, T.h2Land, T.heart]
const CAN_HOPS = [T.canIn + 0.3, T.heart + 0.2, 10.8]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear | *Capricorn…*', { top: 190, size: 128, accentSize: 170, at: T.h0, gap: 0.12, accentColor: ACC, wobble: true, late: 1, lateAt: T.h0 + 0.24, lineHeight: 1.0 })
  const H1 = popText(root, 'Ruled by Saturn. | Booked till *2031.*', { top: 190, size: 100, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: ACC })
  const H2 = popText(root, 'Log *off.* | Show up.', { top: 200, size: 150, accentSize: 210, at: T.h2, gap: 0.12, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, ACC]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.17, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      const hx = cx + side * 200 + Math.sin(p * 7 + i) * 18, hy = cy - 40 - p * 220
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  /** pixel panel: ink outline, coloured border, fill */
  function panel(x0, y0, w, h, border, fillC, P = 6) {
    x.fillStyle = INK; x.fillRect(x0 - P, y0 - P, w + 2 * P, h + 2 * P)
    x.fillStyle = border; x.fillRect(x0, y0, w, h)
    x.fillStyle = fillC; x.fillRect(x0 + P, y0 + P, w - 2 * P, h - 2 * P)
  }

  function drawCalendar(t, ok) {
    const pin = easeOutBack(prog(t, T.cal, T.cal + 0.4), 1.8) * ok
    if (pin <= 0.01) return
    const { cols, rows, cw, ch } = CAL
    const w = cols * cw + 24, h = rows * ch + 84
    x.save()
    x.translate(CAL.x + w / 2, CAL.y + h / 2); x.rotate(0.02 + (1 - pin) * 0.2); x.scale(pin, pin); x.translate(-w / 2, -h / 2)
    panel(0, 0, w, h, '#d8cbe8', '#f6f0e4')
    // header bar + rings
    x.fillStyle = '#d8344f'; x.fillRect(6, 6, w - 12, 56)
    x.fillStyle = INK; for (let k = 0; k < 4; k++) x.fillRect(40 + k * ((w - 80) / 3) - 6, -16, 12, 30)
    x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff6e8'
    x.fillText('THIS YEAR', w / 2, 36)
    // the grid of WORK
    const fade = ease.inOutQuad(prog(t, ...T.fade))
    x.font = `700 22px ${MONO}`
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const cx0 = 12 + i * cw, cy0 = 72 + j * ch
      const isLove = i === cols - 1 && j === rows - 1
      x.fillStyle = 'rgba(27,18,54,0.18)'; x.fillRect(cx0, cy0, cw - 4, ch - 4)
      if (isLove) {
        const on = clamp(prog(t, T.love, T.love + 0.2))
        x.fillStyle = on > 0 ? `rgba(255,143,177,${0.35 + 0.65 * on})` : 'rgba(27,18,54,0.18)'; x.fillRect(cx0, cy0, cw - 4, ch - 4)
        x.fillStyle = on > 0 ? '#7a1f50' : 'rgba(27,18,54,0.75)'
        x.fillText(on > 0 ? 'LOVE' : 'WORK', cx0 + (cw - 4) / 2, cy0 + (ch - 4) / 2 - (on > 0 ? 9 : 0))
        if (on > 0) { x.font = `700 16px ${MONO}`; x.fillText('(Q3)', cx0 + (cw - 4) / 2, cy0 + (ch - 4) / 2 + 13); x.font = `700 22px ${MONO}` }
        // pulsing circle around it
        if (on > 0) {
          const pr = 1 + 0.08 * Math.sin((t - T.love) * 9)
          x.save(); x.translate(cx0 + (cw - 4) / 2, cy0 + (ch - 4) / 2); x.scale(pr, pr)
          x.strokeStyle = '#ff4f86'; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 0, cw * 0.62, ch * 0.66, -0.1, 0, Math.PI * 2 * clamp(prog(t, T.love, T.love + 0.35))); x.stroke()
          x.restore()
        }
      } else {
        x.fillStyle = `rgba(27,18,54,${0.75 * (1 - fade)})`
        x.fillText('WORK', cx0 + (cw - 4) / 2, cy0 + (ch - 4) / 2)
        if (fade > 0) { x.fillStyle = `rgba(47,199,154,${0.35 * fade})`; x.fillRect(cx0, cy0, cw - 4, ch - 4) }
      }
    }
    x.restore()
  }

  function drawDesk(t, ok) {
    const din = ease.outCubic(prog(t, T.desk, T.desk + 0.35)) * ok
    if (din <= 0.01) return
    const dy = (1 - din) * 500
    const y = DESK.y + dy
    // laptop (screen panel facing us, TV-logic), closes on the shut
    const sp = ease.inCubic(prog(t, ...T.shut))
    const sh = LAP.h * (1 - sp), lx = LAP.x - LAP.w / 2
    const base = 22
    if (sh > 2) {
      panel(lx, y - base - sh, LAP.w, sh, '#9aa3b8', '#1d2a4a', 8)
      // the spreadsheet glow
      if (sh > 30) {
        x.save(); x.beginPath(); x.rect(lx + 14, y - base - sh + 14, LAP.w - 28, sh - 28); x.clip()
        x.fillStyle = '#2b4a7a'; x.fillRect(lx + 14, y - base - sh + 14, LAP.w - 28, sh - 28)
        const scroll = (t * 60) % 26
        for (let k = 0; k < 9; k++) {
          const ry = y - base - sh + 22 + k * 26 - scroll
          x.fillStyle = k % 3 === 0 ? '#7ff0c8' : '#a8c6ef'
          x.fillRect(lx + 26, ry, 60, 10); x.fillRect(lx + 96, ry, 80 + ((k * 37) % 60), 10); x.fillRect(lx + 196, ry, 50, 10)
        }
        x.restore()
      }
    }
    // laptop base on the desk
    x.fillStyle = INK; x.fillRect(lx - 26, y - base - 6, LAP.w + 52, base + 6)
    x.fillStyle = '#c3cadb'; x.fillRect(lx - 20, y - base, LAP.w + 40, base - 4)
    x.fillStyle = '#eef2fa'; x.fillRect(lx - 20, y - base, LAP.w + 40, 5)
    // the desk slab
    x.fillStyle = INK; x.fillRect(DESK.x0 - 6, y - 6, DESK.x1 - DESK.x0 + 12, DESK.h + 12)
    x.fillStyle = '#8a5a34'; x.fillRect(DESK.x0, y, DESK.x1 - DESK.x0, DESK.h)
    x.fillStyle = '#b07a4a'; x.fillRect(DESK.x0, y, DESK.x1 - DESK.x0, 10)
    x.fillStyle = '#5e3a20'; x.fillRect(DESK.x0 + 30, y + DESK.h, 26, 180); x.fillRect(DESK.x1 - 56, y + DESK.h, 26, 180)
    // coffee mug
    x.fillStyle = INK; x.fillRect(196, y - 76, 64, 76); x.fillRect(254, y - 60, 22, 40)
    x.fillStyle = '#efe6d6'; x.fillRect(202, y - 70, 52, 64); x.fillStyle = '#d8344f'; x.fillRect(202, y - 50, 52, 12)
    for (let i = 0; i < 2; i++) { const ph = (t * 0.9 + i * 0.5) % 1; x.fillStyle = `rgba(239,230,214,${0.5 * Math.sin(Math.PI * ph)})`; x.fillRect(Math.round(214 + i * 22 + Math.sin(ph * 6) * 6), Math.round(y - 100 - ph * 60), 8, 8) }
    // the clack
    const ct = t - T.shut[1]
    if (ct > 0 && ct < 0.35) {
      x.save(); x.globalAlpha = 1 - ct / 0.35; x.fillStyle = BONE
      for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.45, R = 40 + ct * 220; x.fillRect(Math.round(LAP.x + Math.cos(a) * R), Math.round(y - base + Math.sin(a) * R), 10, 10) }
      x.restore()
    }
  }

  function drawTie(t, r, size, pop) {
    const s = size * pop
    const loose = easeOutBack(prog(t, T.tie, T.tie + 0.35), 2.2)
    const sway = Math.sin(t * 3) * 0.03
    drawBits(x, TIE, TIE_C, Math.round(r.x + loose * s * 0.06), Math.round(r.y + s * 0.27 + loose * s * 0.02), s / 26, { rot: sway + loose * 0.5 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      const ok = popOut(t, T.out)
      const pre = t < T.cut
      if (ok > 0) {
        if (pre) drawCalendar(t, 1)
        const P = pre ? STAR0 : STAR_F
        const sp = pop01(t, T.star, 0.38, 2.2) * ok
        const tap = TAPS.some(k => t >= k && t < k + 0.14) ? 0.05 : 0
        const gasp = t >= T.gasp && t < T.gasp + 0.5 ? -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20) : 0
        if (t > T.canIn - 0.05 && !pre) {
          const cp = pop01(t, T.canIn, 0.36, 2.2) * ok
          drawStarChar(x, CAN_F.x, CAN_F.y, CAN_F.size, t, { color: CAN.color, glyph: CAN.glyph, mood: t < T.heart ? 'happy' : 'sparkle', look: [-1, 0], hops: CAN_HOPS, pop: cp, seed: 9, glow: 1.1, blush: 1 })
          sparkles(t, CAN_F.x, CAN_F.y, T.canIn + 0.1, 10, 200, 2, [GOLD, CAN.color, BONE])
        }
        if (sp > 0.02) {
          const r = drawStarChar(x, P.x, P.y, P.size, t, { color: GREEN, glyph: CAP.glyph, ...capState(t), hops: CAP_HOPS, pop: sp, squash: tap + gasp, seed: 6, glow: 1.1 })
          drawTie(t, r, P.size, sp)
          if (t > T.heart) floatHearts(t, r.x + 60, r.y - 40, T.heart, T.out[0], 5, 6)
          sparkles(t, r.x, r.y, T.smile, 10, 210, 1)
        }
        if (pre) drawDesk(t, 1)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.82 (H0 out → "Ruled by Saturn") and 9.12 (box shut → "Log off. Show up."). cardfx keeps 9.12.
const CUTS = [5.82, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ['pop', T.star + 0.05, 739.99, 0.045, 0], ['whoosh', T.desk, 0.3, 0.03], ['tick', T.desk + 0.3, 0.05], ['pop', T.cal + 0.15, 987.77, 0.03, 0.4],
  ...TAPS.map((k, i) => ['tick', k, 0.012 + (i % 3) * 0.004]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pluck', T.love, 1318.51, 0.04, 0.6, 0.4], ['bell', T.love + 0.05, 1760, 0.02, 0.9, 0.4],
  ...wordPops(T.h1, 5, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.gasp, 440, 0.035, 0],
  ['whoosh', T.shut[0], 0.25, 0.03], ['boom', T.shut[1], 0.14], ['tick', T.shut[1], 0.07], ['tick', T.shut[1] + 0.04, 0.03],
  ['pop', T.tie, 659.25, 0.03, -0.2], ['glitter', T.smile, T.smile + 0.45], ['pluck', T.smile, 1174.66, 0.04, 0.6, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.12, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pop', T.h2Land + 0.14, 1567.98, 0.05, 0], ['pluck', T.h2Land + 0.14, 1174.66, 0.05, 0.7, 0],
  ['pop', T.canIn + 0.05, 659.25, 0.045, 0.3],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
