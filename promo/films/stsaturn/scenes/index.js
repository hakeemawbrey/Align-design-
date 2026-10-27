// stsaturn (25 s vertical Align ad, Star Talk batch 3) · story 0–20.6, then the shared end card ("come" + the Align logo).
//   0.00–6.40  "Turning 29? | That's your | *Saturn return.*"  A pixel ringed Saturn rolls in like a strict teacher (tiny round
//              glasses, a pointer). A plain bone star gulps (sweat drop). On the drop (2.82) the glasses glint.
//              Box (♄ SATURN): "time to grow up."  (Saturn taps the pointer)
//   6.45–12.1  "The *pattern* | stops here."  Box: "stop dating the same *mistake.*"  Three identical red flags pop up over
//              the star: EX #1, EX #2, EX #3. The star rolls its eyes at itself. Box: "write your *dealbreakers.*"
//  12.25       card cut (flip).
//  12.35–16.6  "Write them | *down.*"  A card rises: MY DEALBREAKERS. Chips stamp on one by one: "✕ HOT AND COLD",
//              "✕ NO PLANS, ONLY VIBES", "✕ SAME MISTAKE, NEW NAME". Saturn nods; the star hops at every stamp.
//  16.65–20.5  "Your 30s | are *calling.*"  A phone rings: incoming call, YOUR 30s. The star answers (CONNECTED), beaming;
//              Saturn winks. Everything pops out by 20.5; the end card takes over at 20.6.
// Astrology: Saturn takes about 29.5 years to circle the Sun, so its "return" to your birth position lands around 27–30.
// One canvas (sky + Saturn + star + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, STAR } from '../../startalk.js'

export const DURATION = 25
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5a5a', INK = '#1b1236', GREEN = '#7fe0b8'
const SAT = '#e8c27a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.95, h0Out: [6.25, 6.45],
  starIn: 0.3, satIn: [0.85, 1.75], gulp: 2.15, glint: BEAT(4),           // 2.82
  open: 3.95, s1: 4.1, tap1: 4.3,
  h1: 6.5, h1Land: 6.9, s2: 6.55, flags: [7.1, 7.4, 7.7], roll: [8.1, 8.9], s3: 9.45, flagsOut: [9.3, 9.6], tap3: 9.6,
  close: 12.12, h1Out: [11.92, 12.12],
  cut: 12.3,
  h2: 12.4, h2Land: 12.75, cardUp: [12.45, 12.95], chips: [13.25, 14.0, 14.75], nod: 15.3, cardOut: [16.25, 16.6], h2Out: [16.3, 16.5],
  h3: 16.75, h3Land: 17.15, phoneIn: [16.75, 17.15], ring: [17.2, 18.6], answer: 18.7, wink: [19.2, 19.7],
  h3Out: [20.38, 20.58], out: [20.15, 20.55],
}
const ST = '♄ SATURN'
const LINES = [
  { t: T.s1, speaker: ST, color: SAT, text: 'time to grow up.' },
  { t: T.s2, speaker: ST, color: SAT, text: 'stop dating the same *mistake.*' },
  { t: T.s3, speaker: ST, color: SAT, text: 'write your *dealbreakers.*' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })
const CHIPS = ['✕ HOT AND COLD', '✕ NO PLANS, ONLY VIBES', '✕ SAME MISTAKE, NEW NAME']

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

const BMP = s => s.trim().split(/\s+/)
const FLAG = BMP(`XRRRRRR XRRRRRRR XRRRRRR XRRRRR. XRRRRR. XRRRRRR X....... X....... X....... X....... X....... X.......`)
const DROP = BMP(`..X.. ..X.. .XXX. XXWXX XXXXX .XXX.`)
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1 } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// placements per beat
const SAT_A = { x: 760, y: 870, r: 140 }, SAT_C = { x: 900, y: 1440, r: 66 }, SAT_D = { x: 870, y: 830, r: 80 }
const STAR_A = { x: 290, y: 1150, s: 320 }, STAR_C = { x: 175, y: 1430, s: 190 }, STAR_D = { x: 250, y: 1420, s: 270 }
const FLAG_X = [110, 245, 380], FLAG_Y = 680
const CARD = { x: 540, y: 990, w: 640, h: 660 }
const PHONE = { x: 650, y: 1170, s: 0.74 }
const STAR_HOPS = [T.starIn + 0.35, T.s3 + 0.3, ...T.chips.map(c => c + 0.12), T.answer + 0.1, T.answer + 0.6, T.h3Land + 1.4]

function starState(t) {
  if (t < T.satIn[0]) return { mood: 'neutral', look: [0, 0] }
  if (t < T.gulp) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.s1) return { mood: 'wide', look: [1, -1], blink: false, squash: t < T.gulp + 0.5 ? -0.12 * Math.sin(Math.PI * prog(t, T.gulp, T.gulp + 0.5)) : 0 }
  if (t < LT[0].done + 0.3) return { mood: 'wide', look: [1, 0] }
  if (t < T.s2) return { mood: 'squint', look: [1, -1] }
  if (t < T.flags[2] + 0.2) return { mood: 'wide', look: [-1, -1] }
  if (t < T.roll[1]) return { mood: t < T.roll[0] ? 'neutral' : 'eyeroll', look: [-1, -1] }
  if (t < T.s3) return { mood: 'squint', look: [0, 0] }
  if (t < T.cut) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.chips[0]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.cardOut[0]) return { mood: 'happy' }
  if (t < T.answer) return { mood: 'wide', look: [1, 0] }
  return { mood: t < T.answer + 0.8 ? 'happy' : 'sparkle', look: [0, 0] }
}
function satMood(t) {
  if (t < T.glint + 0.6) return { eyes: 'stern', look: [-1, 0] }
  if (t < T.s2) return { eyes: 'stern', look: [-1, 0] }
  if (t < T.roll[1]) return { eyes: 'stern', look: [-1, -1] }
  if (t < T.cut) return { eyes: 'open', look: [-1, 0] }
  if (t < T.nod) return { eyes: 'open', look: [-1, 1] }
  if (t < T.cardOut[0]) return { eyes: 'happy', look: [0, 0] }
  if (t < T.answer) return { eyes: 'open', look: [-1, 1] }
  if (t >= T.wink[0] && t < T.wink[1]) return { eyes: 'wink', look: [0, 0] }
  return { eyes: 'happy', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "800 40px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Turning 29? | That’s your | *Saturn return.*', { top: 190, size: 96, accentSize: 140, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, wobble: true, gap: 0.1, accentColor: SAT, lineHeight: 1.0 })
  const H1 = popText(root, 'The *pattern* | stops here.', { top: 200, size: 118, accentSize: 170, at: T.h1, late: -1, lateAt: T.h1Land, wobble: true, gap: 0.09, accentColor: RED })
  const H2 = popText(root, 'Write them | *down.*', { top: 190, size: 112, accentSize: 150, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.95 })
  const H3 = popText(root, 'Your 30s | are *calling.*', { top: 200, size: 130, accentSize: 190, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: SAT })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
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

  // ── Saturn: a pixel planet (banded disc + tilted ring, back half behind, front half in front), eyes, glasses, pointer
  const RC = 11                       // planet radius in cells
  const BANDS = ['#f6dca0', '#e8c27a', '#d9a85e', '#f0cf8c', '#c98f4a', '#e8c27a', '#f6dca0']
  function satPos(t) {
    if (t < T.cut) {
      const p = prog(t, ...T.satIn), e = ease.outCubic(p)
      return { x: lerp(1350, SAT_A.x, e), y: SAT_A.y - Math.abs(Math.sin(p * Math.PI * 2)) * 50 * (1 - p), r: SAT_A.r, roll: (1 - e) * -2.2, k: t >= T.satIn[0] ? 1 : 0 }
    }
    if (t < T.cardOut[0] + 0.1) return { ...SAT_C, roll: 0, k: pop01(t, T.cut + 0.12, 0.4, 1.8) }
    const e = ease.inOutCubic(prog(t, T.cardOut[0], T.phoneIn[1]))
    return { x: lerp(SAT_C.x, SAT_D.x, e), y: lerp(SAT_C.y, SAT_D.y, e), r: lerp(SAT_C.r, SAT_D.r, e), roll: 0, k: 1 }
  }
  function drawSaturn(t) {
    const P = satPos(t), ok = popOut(t, T.out), k = P.k * ok
    if (k <= 0.01) return
    const c = Math.max(2, Math.round(P.r * k / RC)), R = RC
    const nodK = t > T.nod && t < T.nod + 0.9 ? Math.max(0, Math.sin((t - T.nod) / 0.45 * Math.PI)) : 0
    const cx = Math.round(P.x), cy = Math.round(P.y + Math.sin(t * 1.9) * 6 + nodK * 12)
    glow(cx, cy, P.r * 3, SAT, 0.7 * k)
    const tilt = -0.32 + P.roll * 0.15 + 0.04 * Math.sin(t * 1.3)
    const ct = Math.cos(tilt), sn = Math.sin(tilt)
    const ringCell = (i, j) => {
      const u = (i + 0.5) * ct + (j + 0.5) * sn, v = -(i + 0.5) * sn + (j + 0.5) * ct
      const e = (u / (2.15 * R)) ** 2 + (v / (0.6 * R)) ** 2, e2 = (u / (1.42 * R)) ** 2 + (v / (0.36 * R)) ** 2
      return e <= 1 && e2 > 1 ? { v, edge: e > 0.82 } : null
    }
    const drawRing = back => {
      for (let j = -Math.ceil(1.3 * R); j <= Math.ceil(1.3 * R); j++) for (let i = -Math.ceil(2.3 * R); i <= Math.ceil(2.3 * R); i++) {
        const q = ringCell(i, j)
        if (!q || (q.v < 0) !== back) continue
        if (!back && Math.hypot(i + 0.5, j + 0.5) > R + 0.5 && false) continue
        x.fillStyle = q.edge ? '#b07a3a' : back ? '#c99a5a' : '#f3d9a2'
        x.fillRect(cx + i * c, cy + j * c, c, c)
      }
    }
    x.save()
    // ink outline for the disc
    x.fillStyle = 'rgba(14,8,32,0.9)'; x.beginPath(); x.arc(cx + c / 2, cy + c / 2, (R + 1.2) * c, 0, Math.PI * 2); x.fill()
    drawRing(true)
    for (let j = -R; j < R; j++) for (let i = -R; i < R; i++) {
      const d = Math.hypot(i + 0.5, j + 0.5)
      if (d > R) continue
      const band = BANDS[clamp(Math.floor(((j + R) / (2 * R)) * BANDS.length), 0, BANDS.length - 1)]
      x.fillStyle = d > R - 1 && i + j > 0 ? '#b07a3a' : (i + j < -R * 0.9 && d < R - 1 ? '#fff1c8' : band)
      x.fillRect(cx + i * c, cy + j * c, c, c)
    }
    // face: eyes (cells), round glasses
    const M = satMood(t), [lx, ly] = M.look
    const blinkT = (t + 0.7) % 3.7 < 0.13
    for (const s of [-1, 1]) {
      const ex = cx + s * 4 * c, ey = cy - 1 * c
      // glasses frame
      x.strokeStyle = INK; x.lineWidth = Math.max(2, c * 0.7)
      x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3.3 * c, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(190,230,255,0.25)'; x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3 * c, 0, Math.PI * 2); x.fill()
      x.fillStyle = INK
      const e = M.eyes === 'wink' && s > 0 ? 'happy' : M.eyes
      if (blinkT && e !== 'happy') x.fillRect(ex - c, ey + c, 3 * c, c)
      else if (e === 'happy') { x.fillRect(ex - c, ey + c, c, c); x.fillRect(ex, ey, c, c); x.fillRect(ex + c, ey + c, c, c) }
      else if (e === 'stern') { x.fillRect(ex - c + lx * c, ey, 3 * c, c); x.fillRect(ex + lx * c - (s < 0 ? 0 : 0), ey + c, 2 * c, c); x.fillRect(ex - 2 * c, ey - 2 * c + (s > 0 ? 0 : 0), 4 * c, c * 0.8) }
      else { x.fillRect(ex + lx * c, ey + ly * c - c, 2 * c, 3 * c); x.fillStyle = '#ffffff'; x.fillRect(ex + lx * c, ey + ly * c - c, c * 0.8, c * 0.8) }
    }
    x.fillStyle = INK; x.fillRect(cx - c, cy - c * 0.6, 2 * c, c * 0.7)          // glasses bridge
    // glint across the glasses on the drop
    const g = t - T.glint
    if (g > 0 && g < 0.5) drawPixelStar(x, cx - 4 * c + 2 * c, cy - 3 * c, 40 * Math.sin(Math.PI * g / 0.5) + 8, 2, '#ffffff')
    drawRing(false)
    x.restore()
    // the pointer (beat 1 + 2): a stick from the lower left, tapping on each line
    if (t < T.cut) {
      let tap = 0
      for (const t0 of [T.tap1, T.s2 + 0.2, T.tap3]) { const u = t - t0; if (u > 0 && u < 0.6) tap = Math.max(tap, Math.abs(Math.sin(u / 0.6 * Math.PI * 3)) * (1 - u / 0.6)) }
      const a = (200 + tap * 14) * Math.PI / 180, L = P.r * 2.1
      const bx = cx - P.r * 0.6, by = cy + P.r * 0.8
      const tx = bx + Math.cos(a) * L, ty = by - Math.sin(a) * L * -0.55 + L * 0.3
      x.save(); x.globalAlpha = clamp(prog(t, T.satIn[1] - 0.2, T.satIn[1] + 0.1)) * ok; x.lineCap = 'round'
      x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
      x.strokeStyle = '#8a5a2a'; x.lineWidth = 8; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
      x.fillStyle = BONE; x.beginPath(); x.arc(tx, ty, 8, 0, Math.PI * 2); x.fill()
      x.restore()
    }
    return { x: cx, y: cy }
  }

  // ── the star
  function starPos(t) {
    if (t < T.cut) return STAR_A
    if (t < T.cardOut[0]) return STAR_C
    const e = ease.inOutCubic(prog(t, T.cardOut[0], T.phoneIn[1]))
    return { x: lerp(STAR_C.x, STAR_D.x, e), y: lerp(STAR_C.y, STAR_D.y, e) - Math.sin(Math.PI * e) * 80, s: lerp(STAR_C.s, STAR_D.s, e) }
  }
  function drawStar(t) {
    const ok = popOut(t, T.out)
    let pk = pop01(t, T.starIn, 0.38, 2.1)
    if (t >= T.cut && t < T.cut + 0.6) pk = pop01(t, T.cut + 0.1, 0.34, 2)
    pk *= ok
    if (pk <= 0.02) return
    const P = starPos(t), st = starState(t)
    const r = drawStarChar(x, P.x, P.y, P.s * pk, t, { color: STAR.bone, ...st, hops: STAR_HOPS, seed: 9, glow: 1 })
    // sweat drop on the gulp
    const sd = t - T.gulp
    if (sd > 0 && sd < 1.6) bits(x, DROP, P.x + P.s * 0.36, r.top + P.s * 0.3 + sd * 40, 6, { X: '#8fd8f6', W: '#ffffff' }, { a: Math.min(1, (1.6 - sd) * 2) })
  }

  // ── the same mistake ×3
  function drawFlags(t) {
    const out = ease.inCubic(prog(t, ...T.flagsOut))
    if (t < T.flags[0] || out >= 1) return
    T.flags.forEach((t0, i) => {
      const k = pop01(t, t0, 0.3, 2.4)
      if (k <= 0.01) return
      const fx = FLAG_X[i], fy = FLAG_Y + out * 60, wave = Math.sin(t * 9 + i) * 0.04
      bits(x, FLAG, fx, fy, 12 * k * (1 - out), { X: '#cfc4b0', R: RED }, { rot: wave, a: 1 - out })
      x.save(); x.globalAlpha = (1 - out) * clamp(k); x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE
      x.fillText(`EX #${i + 1}`, fx, fy + 118); x.restore()
    })
  }

  // ── the dealbreakers card
  function drawCard(t) {
    if (t < T.cardUp[0] || t > T.cardOut[1]) return
    const up = easeOutBack(prog(t, ...T.cardUp), 1.4), o = prog(t, ...T.cardOut)
    const sc = 1 - 0.85 * ease.inCubic(o)
    const cx = CARD.x, cy = lerp(2300, CARD.y, up) - ease.inCubic(o) * 300
    const w = CARD.w, h = CARD.h
    glow(cx, cy, 600, GOLD, 0.4 * up * (1 - o))
    x.save(); x.translate(cx, cy); x.rotate(lerp(0.12, -0.02, up)); x.scale(sc, sc); x.globalAlpha = 1 - o
    x.save(); x.shadowColor = rgba(LAV, 0.6); x.shadowBlur = 50
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 30); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1858'); g.addColorStop(1, '#160c34'); x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 5; x.strokeStyle = GOLD; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 30); x.stroke()
    x.lineWidth = 2; x.strokeStyle = rgba(BONE, 0.3); x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 20); x.stroke()
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 30px ${MONO}`; x.fillStyle = GOLD; x.letterSpacing = '0.2em'; x.fillText('MY DEALBREAKERS', 6, -h / 2 + 76); x.letterSpacing = '0px'
    x.fillStyle = rgba(GOLD, 0.5); x.fillRect(-w / 2 + 60, -h / 2 + 116, w - 120, 3)
    CHIPS.forEach((label, i) => {
      const t0 = T.chips[i], p = prog(t, t0, t0 + 0.22)
      const yy = -h / 2 + 215 + i * 145
      if (p <= 0) { x.setLineDash([10, 10]); x.lineWidth = 2; x.strokeStyle = rgba(BONE, 0.2); x.beginPath(); x.roundRect(-w / 2 + 50, yy - 44, w - 100, 88, 44); x.stroke(); x.setLineDash([]); return }
      const s = lerp(1.9, 1, ease.outCubic(p)) + 0.06 * Math.sin(Math.PI * clamp((t - t0 - 0.22) / 0.2))
      x.save(); x.translate(0, yy); x.rotate((i % 2 ? 1.5 : -1.5) * Math.PI / 180); x.scale(s, s); x.globalAlpha *= clamp(p * 2)
      x.font = `700 34px ${MONO}`
      const tw = x.measureText(label).width + 40
      x.beginPath(); x.roundRect(-tw / 2 - 20, -42, tw + 40, 84, 42); x.fillStyle = 'rgba(255,90,90,0.16)'; x.fill(); x.lineWidth = 4; x.strokeStyle = RED; x.stroke()
      x.fillStyle = '#ffd0d0'; x.fillText(label, 0, 2)
      x.restore()
      // stamp dust
      const dt = t - t0 - 0.2
      if (dt > 0 && dt < 0.4) { x.save(); x.globalAlpha = 1 - dt / 0.4; x.fillStyle = BONE; for (let q = 0; q < 8; q++) { const a = q / 8 * Math.PI * 2; x.fillRect(Math.cos(a) * (w * 0.42 + dt * 160) - 4, yy + Math.sin(a) * (50 + dt * 80) - 4, 8, 8) } x.restore() }
    })
    x.restore()
  }

  // ── the phone: incoming call from YOUR 30s → CONNECTED
  function drawPhone(t) {
    if (t < T.phoneIn[0]) return
    const ok = popOut(t, T.out)
    const k = easeOutBack(prog(t, ...T.phoneIn), 1.6) * ok
    if (k <= 0.01) return
    const ringing = t >= T.ring[0] && t < T.answer
    const jx = ringing && (t * 4) % 1 < 0.55 ? 8 * Math.sin(t * 90) : 0
    const w = 420, h = 760, hw = w / 2, hh = h / 2
    x.save(); x.translate(PHONE.x + jx, PHONE.y); x.rotate((3 + (ringing ? Math.sin(t * 70) * 1.5 : 0)) * Math.PI / 180); x.scale(PHONE.s * k, PHONE.s * k)
    if (ringing) {
      x.save(); x.strokeStyle = rgba(BONE, 0.8); x.lineWidth = 9; x.lineCap = 'round'
      const ph = (t * 2) % 1
      for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) { x.globalAlpha = 1 - ((ph + i * 0.5) % 1); x.beginPath(); x.arc(0, -hh + 160, hw + 30 + ((ph + i * 0.5) % 1) * 60, sd < 0 ? Math.PI - 0.35 : -0.35, sd < 0 ? Math.PI + 0.35 : 0.35); x.stroke() }
      x.restore()
    }
    const on = t >= T.answer
    x.save(); x.shadowColor = on ? rgba(GREEN, 0.7) : rgba(SAT, 0.6); x.shadowBlur = 60
    x.beginPath(); x.roundRect(-hw, -hh, w, h, 60); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); x.beginPath(); x.roundRect(-hw, -hh, w, h, 60); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); x.beginPath(); x.roundRect(sx, sy, sw, sh, 46); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, on ? '#123a32' : '#3a2560'); g.addColorStop(1, on ? '#0d2a26' : '#6a3f2a'); x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 28px ${MONO}`; x.fillStyle = rgba(BONE, 0.75); x.letterSpacing = '0.14em'
    x.fillText(on ? 'CONNECTED' : 'INCOMING CALL', 6, sy + 110); x.letterSpacing = '0px'
    // avatar: a little ringed planet
    x.fillStyle = SAT; x.beginPath(); x.arc(0, sy + 250, 70, 0, Math.PI * 2); x.fill()
    x.strokeStyle = '#f3d9a2'; x.lineWidth = 12; x.beginPath(); x.ellipse(0, sy + 250, 125, 30, -0.3, 0, Math.PI * 2); x.stroke()
    x.font = `800 74px ${INTER}`; x.fillStyle = BONE; x.fillText('YOUR 30s', 0, sy + 420)
    x.font = `700 26px ${MONO}`; x.fillStyle = on ? GREEN : rgba(BONE, 0.6)
    x.fillText(on ? '00:0' + Math.min(9, Math.floor(t - T.answer)) : 'mobile', 0, sy + 480)
    if (!on) {
      for (const [bx, col, rot] of [[-95, RED, 2.3], [95, GREEN, 0]]) {
        const pulse = bx > 0 ? 1 + 0.08 * Math.sin(t * 12) : 1
        x.save(); x.translate(bx, sy + sh - 120); x.scale(pulse, pulse)
        x.fillStyle = col; x.beginPath(); x.arc(0, 0, 54, 0, Math.PI * 2); x.fill()
        x.rotate(rot); x.fillStyle = '#ffffff'; x.fillRect(-24, -8, 48, 16); x.fillRect(-26, -8, 12, 22); x.fillRect(14, -8, 12, 22)
        x.restore()
      }
    } else {
      x.fillStyle = RED; x.beginPath(); x.arc(0, sy + sh - 120, 54, 0, Math.PI * 2); x.fill()
      x.save(); x.translate(0, sy + sh - 120); x.rotate(2.3); x.fillStyle = '#ffffff'; x.fillRect(-24, -8, 48, 16); x.restore()
    }
    x.restore()
    x.restore()
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, SAT, LAV]) {
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
        drawCard(t)
        drawPhone(t)
        drawFlags(t)
        drawSaturn(t)
        drawStar(t)
        sparkles(t, PHONE.x, PHONE.y, T.answer, 12, 280, 1, [GREEN, BONE, GOLD])
        sparkles(t, STAR_A.x, STAR_A.y, T.s3 + 0.3, 10, 200, 2)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.45 (inert: H0 → H1 mid-lecture), 12.3 (box shut → the dealbreakers card, plays),
// 16.65 (inert: the card flies off and the phone pops in on its own).
const CUTS = [6.45, { t: T.cut, kind: 'flip' }, 16.65]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const ringTone = (t0, t1) => { const out = []; for (let t = t0; t < t1; t += 0.5) { if ((t - t0) % 1.0 < 0.5) { out.push(['bell', +t.toFixed(3), 1318.51, 0.022, 0.25, 0.2], ['bell', +(t + 0.12).toFixed(3), 1046.5, 0.022, 0.25, 0.2]) } } return out }
export const CUES = [
  ...wordPops(T.h0, 4, 0.1, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pop', T.h0Land + 0.14, 1174.66, 0.05, 0],
  ['pop', T.starIn + 0.05, 659.25, 0.035, 0],
  ['riser', T.satIn[0] - 0.2, T.satIn[1], 0.04], ['boom', T.satIn[1], 0.22], ['tick', T.satIn[1] + 0.1, 0.04],
  ['pop', T.gulp, 330, 0.045, -0.3], ['pop', T.gulp + 0.12, 262, 0.04, -0.3],
  ['bell', T.glint, 2093, 0.03, 1.2, 0.2],
  ['pop', T.open, 523.25, 0.04, 0], ['pop', T.open + 0.06, 659.25, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ST]: 440 } }),
  ...[T.tap1, T.s2 + 0.2, T.tap3].flatMap(t0 => [['tick', +(t0 + 0.1).toFixed(3), 0.05], ['tick', +(t0 + 0.3).toFixed(3), 0.04]]),
  ...wordPops(T.h1, 3, 0.09, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ...T.flags.map((t0, i) => ['pop', +(t0 + 0.05).toFixed(3), [392, 392, 392][i], 0.05, -0.4 + i * 0.2]),   // the same note, three times
  ['pop', T.roll[0] + 0.1, 440, 0.025, -0.3], ['pop', T.roll[0] + 0.3, 392, 0.025, -0.3],
  ['whoosh', T.flagsOut[0], 0.3, 0.03],
  ['glitter', T.s3 + 0.3, T.s3 + 0.8],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // write them down: three stamps
  ...wordPops(T.h2, 2, 0.08, 1, 0.026), ['pop', T.h2Land, 1046.5, 0.045, 0],
  ['whoosh', T.cardUp[0], 0.4, 0.03],
  ...T.chips.flatMap((t0, i) => [['boom', +(t0 + 0.2).toFixed(3), 0.12], ['tick', +(t0 + 0.2).toFixed(3), 0.07], ['pop', +(t0 + 0.24).toFixed(3), NOTE[i * 2 + 1], 0.035, 0]]),
  ['pluck', T.nod + 0.2, 1046.5, 0.035, 0.5, 0.3], ['pluck', T.nod + 0.65, 1046.5, 0.03, 0.5, 0.3],
  ['whoosh', T.cardOut[0], 0.35, 0.035],
  // your 30s are calling
  ...wordPops(T.h3, 2, 0.08, 3, 0.028), ['pop', T.h3Land, 1174.66, 0.05, 0], ['pluck', T.h3Land, 1046.5, 0.045, 0.7, 0],
  ['pop', T.phoneIn[0] + 0.2, 659.25, 0.04, 0.2],
  ...ringTone(T.ring[0], T.ring[1]),
  ['pop', T.answer, 880, 0.045, 0.2], ['bell', T.answer + 0.05, 1567.98, 0.035, 1.4, 0.2], ['glitter', T.answer, T.answer + 0.6],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
