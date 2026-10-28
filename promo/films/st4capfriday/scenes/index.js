// st4capfriday (15 s vertical Align ad, Star Talk season 4, EP 026, thread F) · story 0–10.6, then the shared end card.
//   0.00–5.20  "Dear Capricorn: | you have a | free *Friday.*"  The green ♑ star (Saturn-ruled, cardinal earth) in its pixel
//              tie at the desk, beside the wall calendar from starcap, now "BOOKED TILL 2031": every square says WORK…
//              except one Friday, empty and glowing. The star goes wide-eyed, panics, and a pencil scribbles "MTG?" in it.
//              Drop (2.82): THE STARS: "leave it *empty.*" The pencil freezes; an eraser wipes the "MTG?" away.
//              (The ghost peeks out from behind the calendar's left edge, 3.95–5.25.)
//   5.20–8.30  "*Rest* is a | date, too."  THE STARS: "*rest* is a date, too. invite Cancer." The empty Friday fills with
//              a pink heart and the ♋ glyph; the laptop slides shut, the tie loosens, the star smiles.
//   8.40 cut → "Keep Friday | *free.*"  Desk gone; the blue ♋ Cancer star (its opposite sign, from starcancer) hops in
//              beside it with a little FRI ♥ tile between them. Heart eyes. Everything pops out by 10.45; end card at 10.6.
// One canvas (sky + constellation + calendar + desk + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 26
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const CAP = signStar('capricorn'), CAN = signStar('cancer')
const GREEN = CAP.color, ACC = '#7ff0c8'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.98, 5.16],
  star: 0.35, desk: 0.5, cal: 0.75, typing: [1.0, 1.5],
  spot: 1.45, panic: 1.7, write: [1.95, 2.65],
  open: 2.62, l1: 2.84, freeze: 2.95, erase: [3.55, 3.95], calm: 4.0,
  ghost: 3.95,
  h1: 5.22, h1Land: 5.58, l2: 5.25, fillSq: 6.45, shut: [6.85, 7.1], tie: 7.25, smile: 7.35,
  close: 8.3, h1Out: [8.15, 8.34],
  cut: 8.4, h2: 8.46, h2Land: 8.84, canIn: 8.95, heart: 9.4, h2Out: [10.18, 10.42], out: [10.05, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'leave it *empty.*', color: GOLD },
  { t: T.l2, speaker: SPEAK, text: '*rest* is a date, too. invite Cancer.', color: PINK },
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
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
// a pencil, tip at the bottom-left (drawn rotated)
const PENCIL = ['..PP', '.YYP', 'YYY.', 'YYY.', 'YY..', 'TT..', 'L...']
const PENCIL_C = { P: '#ff8fb1', Y: '#ffd36b', T: '#e8c9a0', L: '#2a2156' }
const ERASER = ['PPPP', 'PPPP', 'BBBB', 'BBBB']
const ERASER_C = { P: '#ff8fb1', B: '#5a7bd8' }

// ── layout
const STAR0 = { x: 330, y: 1080, size: 320 }
const DESK = { x0: 90, x1: 990, y: 1215, h: 46 }
const LAP = { x: 760, w: 280, h: 180 }
const CAL = { x: 520, y: 560, cols: 5, rows: 4, cw: 90, ch: 64 }   // left/top of the panel
const CALW = CAL.cols * CAL.cw + 24, CALH = CAL.rows * CAL.ch + 84 + 40
const FREE = { i: 4, j: 1 }                                        // the one empty Friday
const STAR_F = { x: 300, y: 1150, size: 340 }
const CAN_F = { x: 780, y: 1160, size: 320 }
const TILE_F = { x: 540, y: 980 }
const GHOST = { at: T.ghost, x: CAL.x - 6, y: 820, from: 'right', where: "peeking out from behind the left edge of Capricorn's 2031 calendar" }

function capState(t) {
  const tap = t >= T.typing[0] && t < T.typing[1]
  if (t < T.desk + 0.3) return { mood: 'happy' }
  if (t < T.spot) return { mood: 'squint', look: [1, 1], blink: tap ? false : undefined }   // grinding
  if (t < T.write[0]) return { mood: 'wide', look: [1, -1], blink: false }                   // an EMPTY square?!
  if (t < T.freeze) return { mood: 'squint', look: [1, -1], blink: false }                   // quick, book something
  if (t < T.calm) return { mood: 'wide', look: [0, 0], blink: false }                        // "leave it empty."
  if (t < T.l2) return { mood: 'neutral', look: [1, -1] }                                    // …it stares at the gap
  if (t < T.fillSq) return { mood: 'wide', look: [0, 0], blink: false }                      // rest? a date?
  if (t < T.smile) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.cut) return { mood: 'happy' }
  if (t < T.canIn + 0.3) return { mood: 'happy' }
  if (t < T.heart) return { mood: 'wide', look: [1, 0], blink: false }
  return { mood: 'heart' }
}
const TAPS = []
for (let k = T.typing[0]; k < T.typing[1]; k += 0.25) TAPS.push(+k.toFixed(3))
const SCRIB = [0, 1, 2, 3].map(i => +(T.write[0] + i * 0.17).toFixed(3))
const CAP_HOPS = [T.star + 0.3, T.panic, T.freeze + 0.05, T.smile, T.h2Land, T.heart]
const CAN_HOPS = [T.canIn + 0.3, T.heart + 0.2, 10.0]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear Capricorn: | you have a | free *Friday.*', { top: 168, size: 90, accentSize: 140, at: T.h0, gap: 0.08, accentColor: ACC, wobble: true, late: 1, lateAt: T.h0 + 0.62, lineHeight: 1.04 })
  const H1 = popText(root, '*Rest* is a | date, too.', { top: 190, size: 120, accentSize: 170, at: T.h1, wobble: true, accentColor: PINK, gap: 0.09, lineHeight: 1.0 })
  const H2 = popText(root, 'Keep Friday | *free.*', { top: 210, size: 140, accentSize: 220, at: T.h2, gap: 0.12, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
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
      drawBits(x, HEART, HEART_C, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  /** pixel panel: ink outline, coloured border, fill */
  function panel(x0, y0, w, h, border, fillC, P = 6) {
    x.fillStyle = INK; x.fillRect(x0 - P, y0 - P, w + 2 * P, h + 2 * P)
    x.fillStyle = border; x.fillRect(x0, y0, w, h)
    x.fillStyle = fillC; x.fillRect(x0 + P, y0 + P, w - 2 * P, h - 2 * P)
  }
  const sqXY = (i, j) => ({ x: CAL.x + 12 + i * CAL.cw, y: CAL.y + 72 + 40 + j * CAL.ch })

  function drawCalendar(t) {
    const pin = easeOutBack(prog(t, T.cal, T.cal + 0.4), 1.8)
    if (pin <= 0.01) return
    const { cols, rows, cw, ch } = CAL
    const w = CALW, h = CALH
    const shake = t > T.panic && t < T.write[1] ? Math.sin(t * 60) * 0.006 : 0
    x.save()
    x.translate(CAL.x + w / 2, CAL.y + h / 2); x.rotate(0.02 + shake + (1 - pin) * 0.2); x.scale(pin, pin); x.translate(-w / 2, -h / 2)
    panel(0, 0, w, h, '#d8cbe8', '#f6f0e4')
    x.fillStyle = '#d8344f'; x.fillRect(6, 6, w - 12, 56)
    x.fillStyle = INK; for (let k = 0; k < 4; k++) x.fillRect(40 + k * ((w - 80) / 3) - 6, -16, 12, 30)
    x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff6e8'
    x.fillText('BOOKED TILL 2031', w / 2, 36)
    // weekday header
    x.font = `700 22px ${MONO}`; x.fillStyle = 'rgba(27,18,54,0.6)'
    ;['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach((d, i) => { x.fillStyle = i === FREE.i ? '#b0742a' : 'rgba(27,18,54,0.6)'; x.fillText(d, 12 + i * cw + (cw - 4) / 2, 72 + 18) })
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const cx0 = 12 + i * cw, cy0 = 72 + 40 + j * ch, mx = cx0 + (cw - 4) / 2, my = cy0 + (ch - 4) / 2
      const isFree = i === FREE.i && j === FREE.j
      if (!isFree) {
        x.fillStyle = 'rgba(27,18,54,0.18)'; x.fillRect(cx0, cy0, cw - 4, ch - 4)
        x.fillStyle = 'rgba(27,18,54,0.75)'; x.font = `700 22px ${MONO}`
        x.fillText('WORK', mx, my)
        continue
      }
      // the empty Friday: blank, glowing gold, then a scribbled MTG?, then erased, then a heart + ♋
      const glowK = clamp(prog(t, T.spot, T.spot + 0.25))
      const fillK = clamp(prog(t, T.fillSq, T.fillSq + 0.25))
      x.fillStyle = fillK > 0 ? `rgba(255,143,177,${0.3 + 0.6 * fillK})` : '#fffaf0'; x.fillRect(cx0, cy0, cw - 4, ch - 4)
      if (glowK > 0) {
        const pr = 0.5 + 0.5 * Math.sin((t - T.spot) * 8)
        x.strokeStyle = fillK > 0 ? '#ff4f86' : GOLD; x.lineWidth = 5 + 2 * pr
        x.strokeRect(cx0 - 3, cy0 - 3, cw + 2, ch + 2)
        x.save(); x.globalAlpha = (0.25 + 0.25 * pr) * glowK; x.fillStyle = fillK > 0 ? '#ff4f86' : GOLD
        x.fillRect(cx0 - 12, cy0 - 12, cw + 20, ch + 20); x.restore()
        x.fillStyle = fillK > 0 ? `rgba(255,143,177,${0.3 + 0.6 * fillK})` : '#fffaf0'; x.fillRect(cx0, cy0, cw - 4, ch - 4)
      }
      // MTG? scribble, letter by letter, erased by a wipe from the left
      const wipe = prog(t, ...T.erase)
      if (t > T.write[0] && wipe < 1) {
        const word = 'MTG?'
        const n = SCRIB.filter(k => t >= k).length
        x.save(); x.beginPath(); x.rect(cx0 + (cw - 4) * wipe, cy0, (cw - 4) * (1 - wipe), ch - 4); x.clip()
        x.font = `700 28px ${MONO}`; x.fillStyle = '#3a2a7a'
        for (let k = 0; k < n; k++) x.fillText(word[k], cx0 + 12 + k * 19, my + Math.sin(k * 2.3) * 3)
        x.restore()
      }
      if (fillK > 0) {
        drawBits(x, HEART, HEART_C, mx - 18, my, 5 * easeOutBack(fillK, 2.4))
        x.save(); x.globalAlpha = fillK; x.font = `700 30px ${MONO}`; x.fillStyle = '#7a1f50'; x.fillText(CAN.glyph, mx + 20, my + 2); x.restore()
      }
    }
    x.restore()
  }

  function drawPencil(t) {
    // the pencil flies to the square on the panic, scribbles, freezes on "leave it empty.", and drops away
    if (t < T.panic || t > T.erase[0] + 0.3) return
    const sq = sqXY(FREE.i, FREE.j)
    const tipX0 = sq.x + 14, tipY = sq.y + CAL.ch / 2 + 6
    const fly = ease.outCubic(prog(t, T.panic, T.write[0]))
    const n = SCRIB.filter(k => t >= k).length
    const scrib = t > T.write[0] && t < T.freeze ? Math.sin(t * 50) * 5 : 0
    const tx = lerp(STAR0.x + 120, tipX0 + 8 + n * 19, fly), ty = lerp(STAR0.y - 160, tipY, fly) + scrib
    const drop = ease.inQuad(prog(t, T.erase[0] - 0.1, T.erase[0] + 0.3))
    const fz = t > T.freeze && t < T.freeze + 0.4 ? Math.sin((t - T.freeze) * 50) * 4 * (1 - (t - T.freeze) / 0.4) : 0
    drawBits(x, PENCIL, PENCIL_C, Math.round(tx + 22 + fz), Math.round(ty - 30 + drop * 400), 9, { rot: 0.15 + drop * 2, alpha: 1 - drop })
    // a little "!" over the star on the panic
    if (t > T.panic && t < T.write[0] + 0.3) {
      const k = easeOutBack(prog(t, T.panic, T.panic + 0.2), 3)
      x.save(); x.font = `800 ${Math.round(110 * k)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 10; x.strokeStyle = INK; x.strokeText('!', STAR0.x + 150, STAR0.y - 200); x.fillStyle = GOLD; x.fillText('!', STAR0.x + 150, STAR0.y - 200); x.restore()
    }
  }
  function drawEraser(t) {
    const p = prog(t, T.erase[0] - 0.15, T.erase[1] + 0.25)
    if (p <= 0 || p >= 1) return
    const sq = sqXY(FREE.i, FREE.j)
    const wipe = prog(t, ...T.erase)
    const ex = sq.x + (CAL.cw - 4) * wipe, ey = sq.y + CAL.ch / 2 - 4 + Math.sin(t * 40) * 4 * (wipe > 0 && wipe < 1 ? 1 : 0)
    const a = Math.min(1, p * 6, (1 - p) * 6)
    drawBits(x, ERASER, ERASER_C, Math.round(ex), Math.round(ey - 30), 11, { rot: -0.25, alpha: a })
    if (wipe > 0 && wipe < 1) for (let k = 0; k < 4; k++) { const ph = (t * 3 + k * 0.25) % 1; x.fillStyle = `rgba(255,143,177,${0.8 * (1 - ph)})`; x.fillRect(Math.round(ex - 10 - ph * 30 + k * 6), Math.round(ey + 20 + ph * 40), 7, 7) }
  }

  function drawDesk(t) {
    const din = ease.outCubic(prog(t, T.desk, T.desk + 0.35))
    if (din <= 0.01) return
    const y = DESK.y + (1 - din) * 500
    const sp = ease.inCubic(prog(t, ...T.shut))
    const sh = LAP.h * (1 - sp), lx = LAP.x - LAP.w / 2
    const base = 22
    if (sh > 2) {
      panel(lx, y - base - sh, LAP.w, sh, '#9aa3b8', '#1d2a4a', 8)
      if (sh > 30) {
        x.save(); x.beginPath(); x.rect(lx + 14, y - base - sh + 14, LAP.w - 28, sh - 28); x.clip()
        x.fillStyle = '#2b4a7a'; x.fillRect(lx + 14, y - base - sh + 14, LAP.w - 28, sh - 28)
        const scroll = (t * 60) % 26
        for (let k = 0; k < 9; k++) {
          const ry = y - base - sh + 22 + k * 26 - scroll
          x.fillStyle = k % 3 === 0 ? '#7ff0c8' : '#a8c6ef'
          x.fillRect(lx + 26, ry, 60, 10); x.fillRect(lx + 96, ry, 70 + ((k * 37) % 60), 10); x.fillRect(lx + 190, ry, 46, 10)
        }
        x.restore()
      }
    }
    x.fillStyle = INK; x.fillRect(lx - 26, y - base - 6, LAP.w + 52, base + 6)
    x.fillStyle = '#c3cadb'; x.fillRect(lx - 20, y - base, LAP.w + 40, base - 4)
    x.fillStyle = '#eef2fa'; x.fillRect(lx - 20, y - base, LAP.w + 40, 5)
    x.fillStyle = INK; x.fillRect(DESK.x0 - 6, y - 6, DESK.x1 - DESK.x0 + 12, DESK.h + 12)
    x.fillStyle = '#8a5a34'; x.fillRect(DESK.x0, y, DESK.x1 - DESK.x0, DESK.h)
    x.fillStyle = '#b07a4a'; x.fillRect(DESK.x0, y, DESK.x1 - DESK.x0, 10)
    x.fillStyle = '#5e3a20'; x.fillRect(DESK.x0 + 30, y + DESK.h, 26, 180); x.fillRect(DESK.x1 - 56, y + DESK.h, 26, 180)
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
  function drawTile(t, ok) {
    // the final beat's little FRI ♥ tile, floating between them
    const k = pop01(t, T.canIn + 0.25, 0.36, 2.4) * ok
    if (k <= 0.02) return
    const bob = Math.sin(t * 2.4) * 8
    x.save(); x.translate(TILE_F.x, TILE_F.y + bob); x.rotate(-0.05 + Math.sin(t * 1.7) * 0.03); x.scale(k, k)
    panel(-80, -70, 160, 140, '#d8cbe8', '#f6f0e4')
    x.fillStyle = '#d8344f'; x.fillRect(-74, -64, 148, 40)
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff6e8'; x.fillText('FRI', 0, -43)
    x.fillStyle = 'rgba(255,143,177,0.75)'; x.fillRect(-68, -18, 136, 82)
    drawBits(x, HEART, HEART_C, 0, 22, 9 * (1 + 0.08 * Math.sin(t * 7)))
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      const pre = t < T.cut
      if (ok > 0) {
        if (pre) {
          drawCalendar(t)
          drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, from: GHOST.from, dur: 1.3, cell: 4 })
        }
        const P = pre ? STAR0 : STAR_F
        const sp = pop01(t, T.star, 0.38, 2.2) * ok
        const tap = TAPS.some(k => t >= k && t < k + 0.14) ? 0.05 : 0
        const shake = t > T.panic && t < T.freeze ? Math.sin(t * 70) * 5 : 0
        const gasp = t >= T.freeze && t < T.freeze + 0.5 ? -0.12 * Math.exp(-(t - T.freeze) * 7) * Math.cos((t - T.freeze) * 20) : 0
        if (!pre) drawTile(t, ok)
        if (t > T.canIn - 0.05 && !pre) {
          const cp = pop01(t, T.canIn, 0.36, 2.2) * ok
          drawStarChar(x, CAN_F.x, CAN_F.y, CAN_F.size, t, { color: CAN.color, glyph: CAN.glyph, mood: t < T.heart ? 'happy' : 'sparkle', look: [-1, 0], hops: CAN_HOPS, pop: cp, seed: 9, glow: 1.1, blush: 1 })
          sparkles(t, CAN_F.x, CAN_F.y, T.canIn + 0.1, 10, 200, 2, [GOLD, CAN.color, BONE])
        }
        if (sp > 0.02) {
          const r = drawStarChar(x, P.x + shake, P.y, P.size, t, { color: GREEN, glyph: CAP.glyph, ...capState(t), hops: CAP_HOPS, pop: sp, squash: tap + gasp, seed: 6, glow: 1.1 })
          drawTie(t, r, P.size, sp)
          if (t > T.heart) floatHearts(t, r.x + 60, r.y - 40, T.heart, T.out[0], 5, 6)
          sparkles(t, r.x, r.y, T.smile, 10, 210, 1)
        }
        if (pre) { drawDesk(t); drawPencil(t); drawEraser(t) }
        if (pre) sparkles(t, sqXY(FREE.i, FREE.j).x + 43, sqXY(FREE.i, FREE.j).y + 30, T.fillSq, 8, 90, 0.4, [PINK, GOLD, BONE])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.2 (H0 out → "Rest is a date") and 8.4 (box shut → "Keep Friday free."). cardfx keeps 8.4.
const CUTS = [5.2, { t: T.cut, kind: 'flip' }]
export const LORE = { ep: EP, ghost: { at: GHOST.at, x: GHOST.x, y: GHOST.y, where: GHOST.where } }
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 7, 0.08, 0, 0.024), ['pop', T.h0 + 0.62, 1174.66, 0.045, 0],
  ['pop', T.star + 0.05, 739.99, 0.045, 0], ['whoosh', T.desk, 0.3, 0.03], ['tick', T.desk + 0.3, 0.05], ['pop', T.cal + 0.15, 987.77, 0.03, 0.4],
  ...TAPS.map((k, i) => ['tick', k, 0.012 + (i % 3) * 0.004]),
  ['bell', T.spot, 1760, 0.025, 1.0, 0.4], ['pluck', T.spot + 0.02, 1318.51, 0.035, 0.6, 0.4],
  ['pop', T.panic, 440, 0.04, 0], ['whoosh', T.panic + 0.05, 0.25, 0.025],
  ...SCRIB.map((k, i) => ['tick', k, 0.03 + (i % 2) * 0.01]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['tick', T.freeze, 0.06], ['pop', T.freeze, 523.25, 0.03, 0],
  ['whoosh', T.erase[0], 0.4, 0.025], ...[0, 1, 2, 3].map(i => ['tick', +(T.erase[0] + i * 0.1).toFixed(3), 0.015]),
  ['pop', T.ghost + 0.05, 1318.51, 0.012, -0.5],
  ...wordPops(T.h1, 5, 0.09, 2, 0.025), ['pop', T.h1, 1174.66, 0.04, 0],
  ['pluck', T.fillSq, 1174.66, 0.045, 0.6, 0.4], ['bell', T.fillSq + 0.05, 1760, 0.022, 0.9, 0.4], ['glitter', T.fillSq, T.fillSq + 0.5],
  ['whoosh', T.shut[0], 0.25, 0.03], ['boom', T.shut[1], 0.14], ['tick', T.shut[1], 0.07],
  ['pop', T.tie, 659.25, 0.03, -0.2], ['pluck', T.smile, 1174.66, 0.04, 0.6, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.12, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.05, 1174.66, 0.05, 0.7, 0],
  ['pop', T.canIn + 0.05, 659.25, 0.045, 0.3], ['pop', T.canIn + 0.3, 987.77, 0.03, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
