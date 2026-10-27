// stghost (20 s vertical Align ad, Star Talk batch 3) · story 0–15.6, then the shared end card ("come" + the Align logo).
//   0.00–2.70  "Dear | *ghoster…*"  A little pixel ghost (a star hiding under a sheet, eyes peeking through the holes)
//              floats in. Unanswered texts pop up around it ("hey :)", "still on for friday?", "hello??"); its eyes dart
//              away and it shrinks down guiltily.
//   2.82–5.90  Box (THE STARS): "a goodbye takes *ten seconds.*"  (the ghost's eyes go wide; the texts fade)
//   6.00–9.65  "Just | *say it.*"  Box: "'not feeling it, but thank you' is *enough.*"  The sheet slides off: a shy star,
//              blushing. Its reply goes out: "not feeling it, but thank you :)" · Delivered. Box pops shut.
//   9.85       card cut (flip).
//   9.95–15.5  "Nobody is | *disposable.*"  The star and the other person's star, both fine: "thanks for telling me :)".
//              Both hop, happy. Everything pops out by 15.5; the end card takes over at 15.6.
// One canvas (sky + bubbles + ghost + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes } from '../../startalk.js'

export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const GHOST = '#cfe3ff', SHY = '#a9d4ff', THEM = '#ffa3c9'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.5, h0Out: [5.75, 5.95],
  ghostIn: 0.3, texts: [0.95, 1.5, 2.05], shrink: [2.2, 2.6],
  open: 2.66, l1: BEAT(4), textsOut: [5.4, 5.8],                         // 2.82
  l2: 6.0, h1: 6.05, h1Land: 6.4, sheetOff: [8.3, 8.95], reply: 9.05,
  close: 9.65, h1Out: [9.45, 9.65],
  cut: 9.85,
  h2: 9.95, h2Land: 10.35, themIn: 10.7, thanks: 11.3, beam: 12.6, h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'a goodbye takes *ten seconds.*' },
  { t: T.l2, speaker: NARR, text: '“not feeling it, but thank you” is *enough.*' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  late > 0: the last `late` words pop big at lateAt; late < 0: the accented words pop big at lateAt. */
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
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = (late > 0 && n >= nW - late) || (late < 0 && acc)
    ws.push({ t: big && lateAt != null ? lateAt + (late > 0 ? (n - (nW - late)) * lateGap : 0) : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
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

// unanswered texts around the ghost: [x, y, text, side]
const TEXTS = [[260, 770, 'hey :)', -1], [770, 640, 'still on for friday?', 1], [230, 1235, 'hello??', -1]]
const HOME = { x: 560, y: 1010, s: 300 }, LEFT = { x: 310, y: 1240, s: 290 }, RIGHT = { x: 790, y: 1260, s: 260 }
const GHOST_HOPS = []
const SHY_HOPS = [T.sheetOff[1] + 0.05, T.reply + 0.1, T.h2Land, T.thanks + 0.5, T.beam, T.beam + 1.3]
const THEM_HOPS = [T.themIn + 0.3, T.thanks, T.thanks + 0.4, T.beam + 0.05, T.beam + 1.35]

function ghostEyes(t) {
  // pupils: [dx, dy] in −1…1, plus a "wide" flag
  if (t < T.texts[0]) return { look: [0, 0] }
  for (const [i, t0] of T.texts.entries()) if (t >= t0 && t < t0 + 0.5) return { look: [TEXTS[i][3], -0.5] }      // glances at each text…
  if (t < T.l1) return { look: [TEXTS[2][3] * -1, 1] }                                                             // …then looks away, down
  if (t < LT[0].done + 0.3) return { look: [0, 0], wide: true }
  if (t < T.l2) return { look: [1, 1] }
  if (t < LT[1].done) return { look: [0, 0], wide: true }
  return { look: [0, 0] }
}
function shyState(t) {
  if (t < T.reply) return { mood: 'happy', blush: 1, look: [0, 0] }
  if (t < T.cut) return { mood: 'sparkle', look: [0, -1], blush: 1 }
  if (t < T.themIn + 0.3) return { mood: 'neutral', look: [1, 0] }
  if (t < T.thanks + 0.6) return { mood: 'wide', look: [1, 0] }
  return { mood: 'happy', look: [0, 0] }
}
function themState(t) {
  if (t < T.thanks) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.beam) return { mood: 'happy', look: [-1, 0] }
  return { mood: 'sparkle', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 128px Inter", "600 36px Inter", "500 24px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear | *ghoster…*', { top: 200, size: 136, accentSize: 200, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: GHOST, lineHeight: 0.95 })
  const H1 = popText(root, 'Just | *say it.*', { top: 200, size: 136, accentSize: 200, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 0.95 })
  const H2 = popText(root, 'Nobody is | *disposable.*', { top: 200, size: 124, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── the ghost sheet (cells): a dome with a wavy hem and two eye holes
  function drawSheet(t, cx, cy, c, alpha, rot = 0) {
    if (alpha <= 0) return
    const RX = 13, RY = 15, HEM = 11
    const inside = (i, j) => {
      const u = i + 0.5, v = j + 0.5
      if (Math.abs(u) > RX) return false
      if (v < -RY + 1.5) return Math.abs(u) <= (v + RY + 3.5) * 0.75      // the star's top point poking up under the sheet
      if (v < 0) return (u / RX) ** 2 + (v / RY) ** 2 <= 1
      const hem = HEM + Math.round(1.6 * Math.sin(i * 0.9 + t * 7))
      return v <= hem
    }
    const holes = (i, j) => [-1, 1].some(s => ((i + 0.5 - s * 4.5) / 2.3) ** 2 + ((j + 0.5 + 3) / 3.1) ** 2 <= 1)
    x.save(); x.globalAlpha *= alpha; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
    for (let j = -RY - 5; j <= HEM + 3; j++) for (let i = -RX - 1; i <= RX + 1; i++) {
      const on = inside(i, j)
      if (!on) {
        if (inside(i + 1, j) || inside(i - 1, j) || inside(i, j + 1) || inside(i, j - 1)) { x.fillStyle = '#2a2156'; x.fillRect(i * c, j * c, c + 0.5, c + 0.5) }
        continue
      }
      if (holes(i, j)) { x.fillStyle = '#120a28'; x.fillRect(i * c, j * c, c + 0.5, c + 0.5); continue }
      const u = (i + 0.5) / RX, v = (j + 0.5) / RY
      let col = '#f4f7ff'
      if (u + v < -0.9) col = '#ffffff'
      else if (u > 0.55 || (j > HEM - 4 && (i + Math.floor(t * 3)) % 5 === 0)) col = '#c9d6f2'
      else if (u > 0.3 && v > 0.2) col = '#dde6fa'
      x.fillStyle = col; x.fillRect(i * c, j * c, c + 0.5, c + 0.5)
    }
    // the star's eyes, peeking through the holes
    const E = ghostEyes(t), [lx, ly] = E.look
    const blink = (t + 0.4) % 3.1 < 0.12
    for (const s of [-1, 1]) {
      const ex = s * 4.5 * c, ey = -3 * c
      if (blink) { x.fillStyle = '#ffffff'; x.fillRect(ex - 1.5 * c, ey, 3 * c, c * 0.6); continue }
      const pw = E.wide ? 2 : 1.6
      x.fillStyle = '#ffffff'; x.fillRect(ex - pw / 2 * c + lx * c * 0.7, ey - c * 1.2 + ly * c * 0.9, pw * c, (E.wide ? 2.6 : 2) * c)
      x.fillStyle = '#120a28'; x.fillRect(ex - 0.4 * c + lx * c * 0.9, ey - c * 0.4 + ly * c * 0.9, c * 0.8, c * 0.8)
    }
    // blush through the sheet once it's being told how easy it is
    if (t > LT[1].done - 0.6) { x.globalAlpha *= 0.6; x.fillStyle = '#ffb3cc'; for (const s of [-1, 1]) x.fillRect(s * 6.5 * c - c, 1 * c, 2 * c, c) }
    x.restore()
  }
  function drawGhost(t) {
    const pin = pop01(t, T.ghostIn, 0.5, 1.6)
    const off = prog(t, ...T.sheetOff)
    if (pin <= 0.01 || off >= 1) return
    const sh = 1 - 0.18 * ease.inOutCubic(prog(t, ...T.shrink)) + 0.18 * ease.inOutCubic(prog(t, T.l2, T.l2 + 0.5))
    const fx = HOME.x + Math.sin(t * 1.4) * 26 + (1 - pin) * -400, fy = HOME.y + Math.sin(t * 2.2) * 14 + (1 - sh) * 120
    const c = Math.round(14 * sh)
    glow(fx, fy, 380, GHOST, 0.5 * pin)
    // shadow on the "floor"
    x.save(); x.globalAlpha = 0.35 * pin * (1 - off); x.fillStyle = '#05030e'; x.beginPath(); x.ellipse(fx, HOME.y + 270, 160 * sh, 18, 0, 0, Math.PI * 2); x.fill(); x.restore()
    const e = ease.inCubic(off)
    drawSheet(t, fx + e * 260, fy - e * 520, c, 1 - ease.inQuad(off), e * 0.6 + Math.sin(t * 1.4) * 0.03)
  }
  function shyPos(t) {
    if (t < T.cut) return HOME
    return LEFT
  }
  function drawShy(t) {
    if (t < T.sheetOff[0] + 0.05) return
    const ok = popOut(t, T.out)
    let pk = clamp(prog(t, T.sheetOff[0] + 0.05, T.sheetOff[0] + 0.25))
    if (t >= T.cut && t < T.cut + 0.6) pk = pop01(t, T.cut + 0.1, 0.34, 2)
    pk *= ok
    if (pk <= 0.02) return
    const P = shyPos(t), st = shyState(t)
    drawStarChar(x, P.x, P.y, P.s * pk, t, { color: SHY, ...st, hops: SHY_HOPS, seed: 6, glow: 1.1 })
  }
  function drawThem(t) {
    const ok = popOut(t, T.out), pk = pop01(t, T.themIn, 0.4, 2.2) * ok
    if (pk <= 0.02) return
    drawStarChar(x, RIGHT.x, RIGHT.y, RIGHT.s * pk, t, { color: THEM, ...themState(t), hops: THEM_HOPS, seed: 12, glow: 1 })
  }

  // ── chat bubbles
  function bubble(cx, cy, text, { side = -1, k = 1, a = 1, fill = 'rgba(70,52,130,0.95)', ink = BONE, stroke = 'rgba(239,230,214,0.35)', foot = null, size = 36 } = {}) {
    if (k <= 0.01 || a <= 0) return
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(k, k)
    x.font = `600 ${size}px ${INTER}`
    const tw = x.measureText(text).width, w = tw + 56, h = size + 44
    x.fillStyle = fill; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.fill()
    x.beginPath(); x.moveTo(side * (w / 2 - 40), h / 2 - 6); x.lineTo(side * (w / 2 - 6), h / 2 + 18); x.lineTo(side * (w / 2 - 70), h / 2 - 2); x.fill()
    x.lineWidth = 3; x.strokeStyle = stroke; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.stroke()
    x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    if (foot) { x.font = `500 24px ${INTER}`; x.fillStyle = rgba(BONE, 0.6); x.textAlign = side < 0 ? 'left' : 'right'; x.fillText(foot, side * (w / 2 - 10), h / 2 + 36) }
    x.restore()
  }
  function drawTexts(t) {
    const out = ease.inQuad(prog(t, ...T.textsOut))
    if (out >= 1) return
    TEXTS.forEach(([bx, by, text, side], i) => {
      const k = pop01(t, T.texts[i], 0.3, 2.4)
      bubble(bx, by + Math.sin(t * 2 + i) * 5, text, { side, k, a: 1 - out, foot: i === 2 ? 'unread' : null })
      // a tiny "!" badge with the unread count on the last one
    })
    // unread count badge
    const bk = pop01(t, T.texts[2] + 0.15, 0.25, 2.6) * (1 - out)
    if (bk > 0.01) {
      x.save(); x.translate(HOME.x + 175, HOME.y - 165); x.scale(bk, bk)
      x.fillStyle = '#ff5a5a'; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill(); x.lineWidth = 4; x.strokeStyle = '#120a28'; x.stroke()
      x.fillStyle = '#ffffff'; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('3', 0, 2)
      x.restore()
    }
  }
  function drawReplies(t) {
    // the shy star's reply (beat 2) and the thank-you back (beat 3)
    if (t < T.cut) {
      const k = pop01(t, T.reply, 0.32, 2.2)
      bubble(540, 720, 'not feeling it, but thank you :)', { side: 1, k, fill: 'rgba(242,199,92,0.95)', ink: INK, stroke: 'rgba(255,255,255,0.4)', foot: t > T.reply + 0.35 ? 'Delivered' : null, size: 34 })
    } else {
      const ok = popOut(t, T.out)
      const k = pop01(t, T.thanks, 0.32, 2.2) * ok
      bubble(700, 960, 'thanks for telling me :)', { side: 1, k, fill: 'rgba(255,163,201,0.95)', ink: INK, stroke: 'rgba(255,255,255,0.4)', size: 36 })
    }
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, GHOST]) {
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
      if (t < T.out[1] + 0.02) {
        drawShy(t)
        drawGhost(t)
        drawThem(t)
        drawTexts(t)
        drawReplies(t)
        sparkles(t, HOME.x, HOME.y, T.sheetOff[0] + 0.25, 12, 240, 1)
        sparkles(t, 540, 1250, T.beam, 14, 420, 2)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.95 (inert: H0 → H1 as the box keeps talking), 9.85 (box shut → the last line, plays).
const CUTS = [5.95, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.1, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['whoosh', T.ghostIn, 0.6, 0.035], ['chip', T.ghostIn + 0.3, 520, 0.5, { wave: 'tri', vib: 0.03, slide: -3, gain: 0.02 }],   // a wobbly "ooo"
  ...T.texts.map((t0, i) => ['pop', +(t0 + 0.05).toFixed(3), 1318.51, 0.035, TEXTS[i][3] * 0.4]),
  ...T.texts.map(t0 => ['tick', +(t0 + 0.12).toFixed(3), 0.03]),
  ['pop', T.shrink[0] + 0.1, 392, 0.03, 0], ['pop', T.shrink[0] + 0.22, 330, 0.03, 0],
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  ['whoosh', T.textsOut[0], 0.35, 0.025],
  ...wordPops(T.h1, 1, 0.1, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0], ['pop', T.h1Land + 0.14, 1174.66, 0.045, 0],
  ['whoosh', T.sheetOff[0], 0.5, 0.045], ['glitter', T.sheetOff[0] + 0.25, T.sheetOff[0] + 0.8], ['bell', T.sheetOff[0] + 0.3, 1567.98, 0.03, 1.4, 0],
  ['pop', T.reply, 880, 0.04, 0.2], ['tick', T.reply + 0.4, 0.03],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['pop', T.themIn + 0.1, 739.99, 0.04, 0.4], ['pop', T.thanks, 1046.5, 0.04, 0.3], ['pluck', T.thanks + 0.1, 1318.51, 0.03, 0.5, 0.3],
  ['bell', T.beam, 1567.98, 0.03, 1.4, 0], ['glitter', T.beam, T.beam + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
