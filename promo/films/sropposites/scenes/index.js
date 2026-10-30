// sropposites (20 s vertical, Star Talk Remix of "Meet your opposite sign") · story 0–15.6, then the shared end card.
//   0.00–6.40  "Meet your | *opposite.*"  A seesaw pops up with THE STARS (the gold narrator star) sitting on the pivot as
//              referee. The six opposite pairs drop onto the plank as sign stars, one pair per dotted beat; each slam flings
//              the previous pair off (wide eyes, a yelp). The referee's eyes ping-pong side to side. Box (THE STARS):
//              "every sign has an opposite. six pairs." Third-act twist: ♓ Pisces lands crying and so hard that the plank
//              catapults the referee clean out of the frame.
//   6.40–9.98  "Six sides of | the same *coin.*"  A gold ♉ coin pops in; the referee falls back in beside it, dizzy, and says
//              "flip a Taurus and you get…" — it hops, the coin spins up and lands on ♏ (SCORPIO).
//   10.04–15.5 "Opposites | *attract.*"  The coin splits into the ♉ and ♏ stars: Taurus heart-eyed, Scorpio squinting. They
//              pull together like magnets and SNAP (a heart, a PULL chip)… then BONK apart (the heart cracks, a PUSH chip).
//              "*Sometimes.*"  Pisces cries in the corner. THE STARS: "your reading shows both. before date one."
//   15.6→      the end card.
// One canvas (sky + props + stars), DOM type and the dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, ELEMENT_COLOR, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN          // 15.6
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff6a5a', INK = '#1b1236', TEAR = '#8fd8ff'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const VS = '︎'
const BEAT = n => 0.6 + n * 0.5556                // 108 bpm grid
const sign = id => SIGNS.find(s => s.id === id)
const TAU = sign('taurus'), SCO = sign('scorpio'), PIS = signStar('pisces')
const CPS = 30
const SPEAK = 'THE STARS'

// ── beats
const PAIRS = [['aries', 'libra'], ['taurus', 'scorpio'], ['gemini', 'sagittarius'], ['cancer', 'capricorn'], ['leo', 'aquarius'], ['virgo', 'pisces']]
  .map(([a, b]) => [sign(a), sign(b)])
const STEP = 0.5556 * 1.5                          // a pair every dotted beat
const PT = PAIRS.map((_, i) => +(BEAT(2) + i * STEP).toFixed(3))   // landing times (the plank slams)
const T = {
  h0: 0.12, h0Acc: BEAT(0), h0Out: [6.2, 6.4],
  saw: 0.42, refIn: 0.75, sawOut: 6.2,
  launch: PT[5] + 0.06,                             // Pisces' slam catapults the referee
  coin: BEAT(11), h1: BEAT(11) + 0.05, refBack: 7.05, toss: BEAT(14), land: BEAT(16), coinOut: 9.82, h1Out: [9.8, 9.98],
  split: BEAT(17), h2: BEAT(17) + 0.08, snap: BEAT(19), bonk: BEAT(20), refPeek: 11.9,
  out: [15.15, 15.5],
}
const LINES1 = [{ t: 2.35, speaker: SPEAK, text: 'every sign has an *opposite*. six pairs.' }]
const LINES2 = [{ t: 7.3, speaker: SPEAK, text: 'flip a *Taurus* and you get…' }]
const LINES3 = [{ t: 12.1, speaker: SPEAK, text: 'your reading shows *both*. before date one.' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3]
const BOX = [
  { lines: LINES1, open: 2.18, close: 5.9 },
  { lines: LINES2, open: 7.14, close: 9.9 },
  { lines: LINES3, open: 11.94, close: 15.3 },
]
const REF_HOPS = [T.refIn + 0.3, ...talkHops(ALL_LINES, SPEAK, { cps: CPS }), ...PT.map(p => p + 0.04), T.toss - 0.06, T.refPeek + 0.25]
const TILT = 13 * Math.PI / 180
const SIDE_DOWN = i => (i % 2 ? 1 : -1)

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const glowStroke = (x, color, w, blur = 16) => { x.strokeStyle = color; x.lineWidth = w; x.shadowColor = rgba(color === BONE ? GOLD : color, 0.7); x.shadowBlur = blur; x.lineCap = 'round'; x.lineJoin = 'round' }

function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, Math.round(px + Math.cos(q.a) * q.d * e), Math.round(py + Math.sin(q.a) * q.d * e), q.size, q.kind, color)
  }
  x.restore()
}

/** a bold canvas label with a dark halo, clamped inside the side margins */
function label(x, txt, px, py, size, color, a = 1, k = 1, font = INTER, weight = 800) {
  if (a <= 0 || k <= 0) return
  x.save(); x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(txt).width * k
  px = clamp(px, 80 + w / 2, W - 80 - w / 2)
  x.translate(px, py); x.scale(k, k); x.globalAlpha = clamp(a)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 14; x.fillStyle = color; x.fillText(txt, 0, 0)
  x.restore()
}

/** a pixel chip: dark stepped panel with a coloured border + Space Mono caps */
function chip(x, txt, px, py, color, k) {
  if (k <= 0.01) return
  x.save(); x.font = `700 46px ${MONO}`
  const tw = x.measureText(txt).width, P = 6, w = Math.round((tw + 70) / P) * P, h = 84
  x.translate(px, py); x.scale(k, k); x.rotate(-0.04)
  const r = (o, c) => { x.fillStyle = c; x.fillRect(-w / 2 + o + P, -h / 2 + o, w - 2 * o - 2 * P, h - 2 * o); x.fillRect(-w / 2 + o, -h / 2 + o + P, w - 2 * o, h - 2 * o - 2 * P) }
  x.shadowColor = rgba(color, 0.7); x.shadowBlur = 20; r(0, color); x.shadowBlur = 0
  r(P, 'rgba(16,10,36,0.96)')
  x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 3)
  x.restore()
}

/** pixel tear drops falling from both eyes (amount 0…1) */
function tears(x, cx, cy, size, t, amt = 1, seed = 0) {
  if (amt <= 0) return
  const c = Math.max(3, Math.round(size / 36))
  x.save()
  for (const side of [-1, 1]) for (let k = 0; k < 3; k++) {
    const ph = ((t * 1.6 + k / 3 + seed * 0.21 + (side > 0 ? 0.5 : 0)) % 1)
    const dx = side * size * (0.13 + 0.12 * ph), dy = size * 0.02 + ph * size * 0.42
    x.globalAlpha = amt * (1 - ph * 0.8)
    x.fillStyle = TEAR
    x.fillRect(Math.round(cx + dx - c / 2), Math.round(cy + dy), c, c * 2)
    x.fillStyle = '#e8fbff'; x.fillRect(Math.round(cx + dx - c / 2), Math.round(cy + dy), Math.ceil(c / 2), c)
  }
  x.restore()
}

/** a line-art heart (pink, flat fill). split 0..1 cracks it into two halves that tilt apart */
function heart(x, px, py, s, k, split = 0) {
  if (k <= 0) return
  const path = () => {
    x.beginPath(); x.moveTo(0, 0.95)
    x.bezierCurveTo(-0.15, 0.75, -1, 0.35, -1, -0.2); x.bezierCurveTo(-1, -0.75, -0.3, -0.95, 0, -0.45)
    x.bezierCurveTo(0.3, -0.95, 1, -0.75, 1, -0.2); x.bezierCurveTo(1, 0.35, 0.15, 0.75, 0, 0.95); x.closePath()
  }
  for (const side of [-1, 1]) {
    x.save(); x.translate(px + side * 40 * split, py + 10 * split); x.rotate(side * 0.35 * split); x.scale(s * k, s * k)
    x.beginPath()
    if (split > 0) {
      const zz = [[0, -0.5], [0.12, -0.25], [-0.1, 0], [0.12, 0.25], [-0.05, 0.5], [0, 1]]
      x.moveTo(0, -1.2); zz.forEach(([a, b]) => x.lineTo(a, b)); x.lineTo(0, 1.2); x.lineTo(side * 1.3, 1.2); x.lineTo(side * 1.3, -1.2); x.closePath(); x.clip()
    }
    path(); x.fillStyle = rgba(PINK, 0.35); x.fill()
    glowStroke(x, PINK, 7 / (s * k), 24); x.stroke()
    x.restore()
  }
}

/** the gold coin. phi = flip angle (0 → ♉ face, π → ♏ face) */
function coin(x, cx, cy, R, phi, k = 1) {
  if (k <= 0) return
  const c = Math.cos(phi), sx = Math.max(0.035, Math.abs(c)), front = c >= 0
  const face = front ? TAU : SCO
  const edge = 24 * Math.sin(phi)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.globalCompositeOperation = 'lighter'
  const h = x.createRadialGradient(0, 0, R * 0.6, 0, 0, R * 2.1); h.addColorStop(0, rgba(GOLD, 0.32)); h.addColorStop(1, rgba(GOLD, 0))
  x.fillStyle = h; x.beginPath(); x.arc(0, 0, R * 2.1, 0, Math.PI * 2); x.fill(); x.restore()
  for (let i = 10; i >= 1; i--) {
    x.save(); x.translate(edge * i / 10, 0); x.scale(sx, 1)
    x.fillStyle = i % 3 ? '#a8771e' : '#c8922c'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill(); x.restore()
  }
  x.save(); x.scale(sx, 1)
  const g = x.createRadialGradient(-R * 0.35, -R * 0.4, R * 0.1, 0, 0, R)
  g.addColorStop(0, '#fff2c4'); g.addColorStop(0.45, GOLD); g.addColorStop(1, '#c9932e')
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
  glowStroke(x, '#fff0c0', 7, 18); x.stroke()
  x.shadowBlur = 0; x.strokeStyle = rgba('#8a5c12', 0.7); x.lineWidth = 6; x.beginPath(); x.arc(0, 0, R - 24, 0, Math.PI * 2); x.stroke()
  x.fillStyle = rgba('#8a5c12', 0.65)
  for (let i = 0; i < 36; i++) { const a = i / 36 * Math.PI * 2; x.beginPath(); x.arc(Math.cos(a) * (R - 12), Math.sin(a) * (R - 12), 3.5, 0, Math.PI * 2); x.fill() }
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `bold ${Math.round(R * 1.15)}px ${GLYPH_FONT}`
  x.fillStyle = rgba('#fff8e0', 0.6); x.fillText(face.glyph + VS, 3, R * 0.07 + 4)
  x.fillStyle = front ? '#7a4a10' : '#8c1f3c'; x.fillText(face.glyph + VS, 0, R * 0.07)
  x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.18 + 0.2 * Math.abs(Math.sin(phi * 2))
  const sh = x.createLinearGradient(-R, -R, R, R); sh.addColorStop(0.3, 'rgba(255,255,255,0)'); sh.addColorStop(0.5, 'rgba(255,255,255,0.9)'); sh.addColorStop(0.7, 'rgba(255,255,255,0)')
  x.fillStyle = sh; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
  x.restore()
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 46px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type + boxes
  const H0 = popText(root, 'Meet your | *opposite.*', { top: 180, size: 118, accentSize: 168, at: T.h0, late: 1, lateAt: T.h0Acc, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'Six sides of | the same *coin.*', { top: 180, size: 104, accentSize: 128, at: T.h1, late: 1, lateAt: T.h1 + 0.3, wobble: true })
  const H2 = popText(root, 'Opposites | *attract.*', { top: 170, size: 124, accentSize: 168, at: T.h2, late: 1, lateAt: T.snap, wobble: true, accentColor: PINK })
  const H3 = popText(root, '*Sometimes.*', { top: 468, size: 96, accentSize: 120, at: T.bonk + 0.05, late: 1, lateAt: T.bonk + 0.05, wobble: true, accentColor: GOLD })
  const boxes = BOX.map(b => dialogueBox(root, { lines: b.lines, y: 1440, width: 960, height: 290, open: b.open, close: b.close, cps: CPS }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B = (k, n = 8, d = 90) => makeBurst(500 + k, n, d)

  // ── the seesaw with its six pairs of sign stars
  const PIV = { x: 540, y: 1080 }, HALF = 450, AT = 318, PLANK = 30, SZ = 224
  const tiltAt = t => {
    let th = 0
    PT.forEach((t0, i) => {
      const p = prog(t, t0 - 0.04, t0 + 0.62)
      const big = i === 5 ? 1.5 : 1                       // Pisces slams harder
      if (p > 0) th += (SIDE_DOWN(i) * TILT * big - (i ? SIDE_DOWN(i - 1) * TILT * (i - 1 === 5 ? 1.5 : 1) : 0)) * ease.spring(p, 0.22)
    })
    return th
  }
  const seat = (side, th) => {
    const c = Math.cos(th), s = Math.sin(th)
    const lx = side * AT, ly = -(PLANK / 2 + SZ * 0.36)
    return { x: PIV.x + lx * c - ly * s, y: PIV.y + lx * s + ly * c }
  }
  const B_LAND = PAIRS.map((_, i) => [B(10 + i * 2, 9, 120), B(11 + i * 2, 7, 100)])
  const B_SAW = B(40, 10, 140)
  const landT = (i, side) => side === SIDE_DOWN(i) ? PT[i] : PT[i] + 0.11
  const DROP = 0.24
  const sawK = t => pop01(t, T.saw, 0.45) * outScale(t, T.sawOut + 0.08)

  function drawSeesaw(t) {
    if (t < T.saw || t > T.sawOut + 0.6) return
    const sk = sawK(t)
    if (sk <= 0) return
    const th = tiltAt(t)
    x.save(); x.translate(PIV.x, PIV.y); x.scale(sk, sk)
    x.beginPath(); x.moveTo(0, 6); x.lineTo(-100, 160); x.lineTo(100, 160); x.closePath()
    x.fillStyle = rgba(GOLD, 0.28); x.fill(); glowStroke(x, GOLD, 8, 20); x.stroke()
    x.beginPath(); x.moveTo(-170, 164); x.lineTo(170, 164); glowStroke(x, BONE, 7, 12); x.stroke()
    x.shadowBlur = 0; x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 16, 0, Math.PI * 2); x.fill()
    x.restore()
    x.save(); x.translate(PIV.x, PIV.y); x.rotate(th); x.scale(sk, sk)
    x.beginPath(); x.roundRect(-HALF, -PLANK / 2, HALF * 2, PLANK, PLANK / 2)
    x.fillStyle = rgba(BONE, 0.22); x.fill(); glowStroke(x, BONE, 7, 18); x.stroke()
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * (HALF - 18), -PLANK / 2); x.lineTo(sd * (HALF - 18), -PLANK / 2 - 22); x.stroke() }
    x.restore()
    drawBurst(x, B_SAW, PIV.x, PIV.y, t, T.saw, GOLD, 0.6)

    PAIRS.forEach((pair, i) => {
      pair.forEach((s, j) => {
        const side = j ? 1 : -1
        const tl = landT(i, side), t0 = tl - DROP
        if (t < t0) return
        const leaveAt = i < PAIRS.length - 1 ? PT[i + 1] - DROP - 0.02 : T.sawOut
        const lp = prog(t, leaveAt, leaveAt + 0.5)
        if (lp >= 1) return
        const st = seat(side, th)
        const fp = prog(t, t0, tl)
        let px = st.x, py = st.y - 820 * (1 - fp * fp), sq = 0, rot = 0
        if (fp >= 1) { const d = t - tl; sq = d < 0.3 ? 0.22 * Math.sin(Math.PI * d / 0.3) * Math.exp(-d * 3) : 0 }
        else sq = -0.12
        if (lp > 0) { const e = ease.outCubic(lp); px += side * 760 * e; py += -110 * e + 1400 * lp * lp; rot = side * 3.4 * e }
        const isPis = s.id === 'pisces'
        let mood = 'happy', look = [-side, 0]
        if (fp < 1) { mood = 'wide'; look = [0, 1] }
        else if (lp > 0) { mood = 'wide'; look = [side, -1] }
        else if (t - tl < 0.35) { mood = 'squint'; look = [0, 0] }
        if (isPis && fp >= 1 && lp <= 0) mood = t - tl < 0.35 ? 'squint' : 'sparkle'
        x.save(); x.translate(px, py); x.rotate(rot + (lp > 0 ? 0 : th * 0.5)); x.translate(-px, -py)
        drawStarChar(x, px, py, SZ, t, { color: s.color, glyph: s.glyph, mood, look, blink: false, squash: sq, bob: 0, seed: 20 + i * 2 + j, alpha: 1 - ease.inQuad(lp), glow: 0.9 })
        x.restore()
        if (isPis && fp >= 1 && lp <= 0) tears(x, px, py, SZ, t, clamp((t - tl) / 0.3), 3)
        if (fp >= 1) drawBurst(x, B_LAND[i][j], st.x, st.y + 60, t, tl, s.color, 0.6)
        const nk = pop01(t, tl, 0.3) * (1 - clamp(lp * 3))
        if (nk > 0 && t >= tl) label(x, s.name.toUpperCase(), st.x, st.y - SZ * 0.68 - 8 * Math.sin(Math.PI * clamp((t - tl) / 0.3)), s.name.length > 8 ? 50 : 60, s.color, clamp(nk * 2), nk)
      })
      // element pairing + double arrow under the fulcrum
      const a = pair[0], b = pair[1]
      const tEnd = i < 5 ? PT[i + 1] - 0.2 : T.sawOut
      const lk = (t >= PT[i] + 0.05 ? pop01(t, PT[i] + 0.05, 0.3) : 0) * (1 - clamp(prog(t, tEnd, tEnd + 0.1)))
      if (lk > 0) {
        x.save(); x.font = `700 44px ${MONO}`
        const ea = a.el.toUpperCase(), eb = b.el.toUpperCase()
        const wa = x.measureText(ea).width, wb = x.measureText(eb).width, gapW = 110, tot = wa + wb + gapW
        x.translate(540, 1300); x.scale(lk, lk); x.globalAlpha = clamp(lk * 2)
        x.textBaseline = 'middle'; x.textAlign = 'left'; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12
        x.fillStyle = ELEMENT_COLOR[a.el]; x.fillText(ea, -tot / 2, 0)
        x.fillStyle = ELEMENT_COLOR[b.el]; x.fillText(eb, -tot / 2 + wa + gapW, 0)
        const ax0 = -tot / 2 + wa + 22, ax1 = ax0 + gapW - 44
        glowStroke(x, BONE, 5, 8)
        x.beginPath(); x.moveTo(ax0, 0); x.lineTo(ax1, 0); x.moveTo(ax0 + 14, -12); x.lineTo(ax0, 0); x.lineTo(ax0 + 14, 12); x.moveTo(ax1 - 14, -12); x.lineTo(ax1, 0); x.lineTo(ax1 - 14, 12); x.stroke()
        x.restore()
      }
    })
    // six progress dots
    for (let i = 0; i < 6; i++) {
      const on = t >= PT[i] ? pop01(t, PT[i], 0.3) : 0
      x.save(); x.translate(540 + (i - 2.5) * 60, 1376); x.scale(sk * (1 + 0.5 * on * Math.exp(-(t - PT[i]) * 5) * (t >= PT[i] ? 1 : 0)), sk)
      x.beginPath(); x.arc(0, 0, 14, 0, Math.PI * 2)
      x.fillStyle = on > 0 ? rgba(PAIRS[i][0].color, 0.9) : 'rgba(239,230,214,0.12)'; x.fill()
      glowStroke(x, on > 0 ? PAIRS[i][0].color : BONE, 3, on > 0 ? 14 : 0); x.stroke()
      x.restore()
    }
  }

  // ── THE STARS, the referee: on the pivot → catapulted → falls back beside the coin → peeks in for the last line
  const REF_SZ = 150
  function drawRef(t) {
    if (t < T.refIn) return
    let px = PIV.x, py = PIV.y - 92, k = pop01(t, T.refIn, 0.36, 2.2), mood = 'happy', look = [0, 0], sq = 0, rot = 0, alpha = 1, size = REF_SZ
    if (t < T.launch) {
      // eyes ping-pong toward whichever end just slammed
      let cur = -1; PT.forEach((p, i) => { if (t >= p - 0.24) cur = i })
      if (cur >= 0) { look = [SIDE_DOWN(cur), 0]; mood = t - PT[cur] < 0.25 && t > PT[cur] ? 'wide' : 'neutral' }
      if (t > LINES1[0].t && t < 4.3) { mood = 'happy'; look = [0, 0] }
      k *= sawK(t)
    } else if (t < T.refBack) {
      const p = prog(t, T.launch, T.launch + 0.5)
      if (p >= 1) return
      py -= 1350 * ease.inQuad(p) + 120 * Math.sin(Math.PI * Math.min(1, p * 2)); rot = 7 * p; mood = 'wide'; look = [0, 1]
    } else if (t < T.split - 0.1) {
      // falls back in beside the coin, dizzy, then explains
      const fp = prog(t, T.refBack - 0.28, T.refBack)
      px = 855; py = lerp(-200, 1240, fp * fp)
      if (fp >= 1) { const d = t - T.refBack; sq = d < 0.3 ? 0.3 * Math.sin(Math.PI * d / 0.3) * Math.exp(-d * 2) : 0 }
      mood = t < T.refBack + 0.35 ? 'sleepy' : t < LINES2[0].t + 0.1 ? 'eyeroll' : t < T.toss ? 'happy' : t < T.land ? 'wide' : 'sparkle'
      look = t >= T.toss && t < T.land ? [-1, -1] : t >= T.land ? [-1, 0] : [0, 0]
      alpha = 1 - prog(t, 9.75, 9.95); k = 1
      size = 170
    } else if (t >= T.refPeek) {
      px = 905; py = 1300 + 260 * (1 - ease.outBack(prog(t, T.refPeek, T.refPeek + 0.4))); size = 140; k = 1
      mood = t < LINES3[0].t ? 'neutral' : 'happy'; look = [-1, 0]
      alpha = 1 - prog(t, ...T.out)
    } else return
    if (k <= 0.01 || alpha <= 0) return
    x.save(); x.translate(px, py); x.rotate(rot); x.translate(-px, -py)
    drawStarChar(x, px, py, size, t, { color: STAR.sky, mood, look, blink: mood === 'neutral' ? undefined : false, hops: REF_HOPS, pop: k, squash: sq, seed: 5, alpha, zzz: false })
    x.restore()
    if (mood === 'sleepy' && t > T.refBack) {             // dizzy pixel stars circling its head
      for (let i = 0; i < 3; i++) { const a = t * 7 + i * 2.09; drawPixelStar(x, px + Math.cos(a) * 70, py - 95 + Math.sin(a) * 18, 18, 2, i % 2 ? GOLD : BONE) }
    }
  }

  // ── the coin: pops in on ♉, the referee flips it, lands on ♏
  const CO = { x: 520, y: 900, R: 200 }
  const SPINS = 5 * Math.PI
  const B_COIN = B(50, 12, 200), B_LANDC = B(51, 14, 240)
  const coinPhi = t => {
    const idle = 0.18 * Math.sin((t - T.coin) * 3.2) * Math.exp(-Math.max(0, t - T.coin) * 0.6)
    if (t < T.toss) return idle
    return SPINS * ease.outQuad(prog(t, T.toss, T.land)) + 0.12 * Math.sin((t - T.land) * 9) * Math.exp(-Math.max(0, t - T.land) * 5) * (t > T.land ? 1 : 0)
  }
  function drawCoin(t) {
    if (t < T.coin - 0.02 || t > T.coinOut + 0.4) return
    const k = pop01(t, T.coin, 0.45) * outScale(t, T.coinOut)
    let y = CO.y
    if (t >= T.toss - 0.12) {
      const pre = prog(t, T.toss - 0.12, T.toss), air = prog(t, T.toss, T.land)
      y += 30 * Math.sin(Math.PI * pre) * (air <= 0 ? 1 : 0)
      y -= 250 * 4 * air * (1 - air)
      if (t > T.land) y -= 40 * Math.abs(Math.sin((t - T.land) * 9)) * Math.exp(-(t - T.land) * 6)
    }
    const sq = t > T.land ? 1 - 0.1 * Math.sin(Math.min(1, (t - T.land) / 0.22) * Math.PI) : 1
    x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#000'
    x.beginPath(); x.ellipse(CO.x, CO.y + CO.R + 40, CO.R * 0.8, 20, 0, 0, Math.PI * 2); x.fill(); x.restore()
    x.save(); x.translate(CO.x, y + CO.R); x.scale(1 / sq, sq); x.translate(-CO.x, -(y + CO.R))
    coin(x, CO.x, y, CO.R, coinPhi(t), k)
    x.restore()
    drawBurst(x, B_COIN, CO.x, CO.y, t, T.coin + 0.1, GOLD, 0.7)
    drawBurst(x, B_LANDC, CO.x, CO.y, t, T.land, SCO.color, 0.8)
    const front = Math.cos(coinPhi(t)) >= 0
    const inAir = t > T.toss + 0.05 && t < T.land
    const nk1 = pop01(t, T.coin + 0.2, 0.3) * (1 - clamp(prog(t, T.toss, T.toss + 0.12)))
    const nk2 = (t >= T.land ? pop01(t, T.land, 0.32) : 0) * outScale(t, T.coinOut)
    if (!inAir) {
      if (front && nk1 > 0) label(x, 'TAURUS', CO.x, CO.y + CO.R + 110, 66, TAU.color, clamp(nk1 * 2), nk1)
      if (!front && nk2 > 0) label(x, 'SCORPIO!', CO.x, CO.y + CO.R + 110, 72, SCO.color, clamp(nk2 * 2), nk2)
    }
    if (t > T.toss && t < T.land + 0.1) { const fk = pop01(t, T.toss, 0.25) * (1 - prog(t, T.land - 0.1, T.land + 0.1)); label(x, 'FLIP!', CO.x, CO.y + CO.R + 110, 64, GOLD, fk, fk, MONO, 700) }
  }

  // ── the end: ♉ and ♏ stars split out of the coin, pull, SNAP, BONK
  const TOK_Y = 960, E_SZ = 250, B_SNAP = B(60, 14, 220), B_BONK = B(61, 10, 160), B_SPLIT = B(62, 12, 200)
  const endX = (t, side) => {
    const split = ease.outCubic(prog(t, T.split, T.split + 0.45))
    let d = lerp(0, 300, split)
    const pull = ease.inCubic(prog(t, T.split + 0.55, T.snap))
    d = lerp(d, 128, pull)
    if (t > T.snap) d += -10 * Math.sin((t - T.snap) * 30) * Math.exp(-(t - T.snap) * 12)
    const bonk = ease.spring(prog(t, T.bonk, T.bonk + 0.9), 0.2)
    d = lerp(d, 290, bonk)
    return 540 + side * d
  }
  function drawEnd(t) {
    if (t < T.split - 0.02 || t > T.out[1]) return
    const k = pop01(t, T.split, 0.4) * (1 - ease.inQuad(prog(t, ...T.out)))
    const quiver = t > T.split + 0.55 && t < T.snap ? 4 * Math.sin(t * 70) * prog(t, T.split + 0.55, T.snap) : 0
    const bonkWob = t > T.bonk ? 0.3 * Math.sin((t - T.bonk) * 11) * Math.exp(-(t - T.bonk) * 2.4) : 0
    const fk = prog(t, T.split + 0.45, T.split + 0.7) * (1 - prog(t, T.snap - 0.05, T.snap + 0.05))
    if (fk > 0) {
      const xl = endX(t, -1) + 110, xr = endX(t, 1) - 110
      x.save(); glowStroke(x, PINK, 5, 14); x.globalAlpha = 0.8 * fk; x.setLineDash([14, 14]); x.lineDashOffset = -t * 90
      for (const dy of [-60, 0, 60]) { x.beginPath(); x.moveTo(xl, TOK_Y + dy); x.quadraticCurveTo(540, TOK_Y + dy * 1.8, xr, TOK_Y + dy); x.stroke() }
      x.restore()
    }
    // moods: Taurus is smitten from the start; Scorpio squints… then melts on the snap; both see stars on the bonk
    const tauMood = t < T.bonk ? 'heart' : t < T.bonk + 1.2 ? 'wide' : 'eyeroll'
    const scoMood = t < T.snap - 0.2 ? 'squint' : t < T.bonk ? 'heart' : t < T.bonk + 1.2 ? 'wide' : 'squint'
    const sqSnap = t > T.snap && t < T.snap + 0.3 ? 0.18 * Math.sin(Math.PI * (t - T.snap) / 0.3) : 0
    for (const [s, side, mood, seed] of [[TAU, -1, tauMood, 31], [SCO, 1, scoMood, 32]]) {
      const px = endX(t, side) + (side < 0 ? quiver : -quiver)
      x.save(); x.translate(px, TOK_Y); x.rotate(side * bonkWob); x.translate(-px, -TOK_Y)
      drawStarChar(x, px, TOK_Y, E_SZ, t, { color: s.color, glyph: s.glyph, mood, look: [-side, 0], blink: false, pop: k, squash: sqSnap, seed, glow: 1.1 })
      x.restore()
    }
    drawBurst(x, B_SPLIT, 540, TOK_Y, t, T.split, GOLD, 0.6)
    drawBurst(x, B_SNAP, 540, TOK_Y, t, T.snap, PINK, 0.8)
    const hk = t >= T.snap ? pop01(t, T.snap, 0.4) * k : 0
    if (hk > 0) {
      const split = ease.outBack(prog(t, T.bonk, T.bonk + 0.35))
      const beat = 1 + 0.06 * Math.sin((t - T.snap) * 9) * (t < T.bonk ? 1 : 0)
      heart(x, 540, TOK_Y - 250 + 6 * Math.sin(t * 3), 96 * beat, hk, split)
      drawBurst(x, B_BONK, 540, TOK_Y - 250, t, T.bonk, PINK, 0.6)
    }
    // the chips: PULL on the snap, swapped for PUSH on the bonk (both stay as a pair after)
    const pk = t >= T.snap ? pop01(t, T.snap + 0.05, 0.3, 2.4) : 0
    const uk = t >= T.bonk ? pop01(t, T.bonk + 0.05, 0.3, 2.4) : 0
    const slide = ease.inOutCubic(prog(t, T.bonk, T.bonk + 0.3))
    chip(x, 'PULL ♥', lerp(540, 300, slide), 1130, PINK, pk * k)
    chip(x, 'PUSH ⚡', 790, 1130, RED, uk * k)
    // ♓ Pisces in the corner, crying (of course)
    const pis = t >= T.bonk + 0.1 ? pop01(t, T.bonk + 0.1, 0.36, 2.2) * k : 0
    if (pis > 0.01) {
      const py = 1300 + 200 * (1 - pis)
      drawStarChar(x, 165, py, 130, t, { color: PIS.color, mood: 'sparkle', look: [1, -1], blink: false, seed: 41, glow: 0.8, alpha: clamp(pis * 2) })
      tears(x, 165, py, 130, t, clamp((t - T.bonk - 0.3) / 0.3), 1)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeesaw(t); drawCoin(t); drawEnd(t); drawRef(t)
      H0.update(t, outK(t, T.h0Out))
      H1.update(t, outK(t, T.h1Out))
      H2.update(t, outK(t, T.out))
      H3.update(t, outK(t, T.out))
      for (const b of boxes) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.62 (seesaw gone → the coin pops) and 9.95 (coin out → ♉/♏ split). cardfx keeps one (9.95).
const CUTS = [{ t: 6.62, kind: 'flip' }, { t: 9.95, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const PAIR_NOTES = [[880, 1174.66], [987.77, 1318.51], [739.99, 1108.73], [880, 1174.66], [987.77, 1479.98], [1174.66, 1760]]
export const CUES = [
  ...wordPops(T.h0, 2, 0.07, 0), ['pop', T.h0Acc, 1174.66, 0.055, 0], ['pluck', T.h0Acc, 587.33, 0.05, 0.6, 0],
  ['pop', T.saw, 659.25, 0.05, 0], ['glitter', T.saw, T.saw + 0.4], ['pop', T.refIn + 0.05, 987.77, 0.04, 0],
  ...PT.flatMap((t0, i) => {
    const sd = SIDE_DOWN(i) * 0.4
    return [
      ['whoosh', r3(t0 - 0.24), 0.28, 0.025],
      ['pop', t0, PAIR_NOTES[i][0], 0.065, sd], ['tick', r3(t0 + 0.005), 0.05],
      ['pop', r3(t0 + 0.11), PAIR_NOTES[i][1], 0.05, -sd],
      ['pluck', t0, [293.66, 329.63, 246.94, 293.66, 329.63, 392][i], 0.04, 0.4, 0],
      ...(i > 0 ? [['pop', r3(PT[i] - 0.22), 1567.98, 0.022, -sd]] : []),          // the flung pair's yelp
    ]
  }),
  ['boom', PT[5], 0.14], ['pop', T.launch, 1760, 0.05, 0], ['whoosh', T.launch, 0.5, 0.05],       // the referee is catapulted
  ...talkCues(ALL_LINES, { cps: CPS }),
  ['whoosh', T.sawOut, 0.45, 0.035],
  ['pop', T.coin, 587.33, 0.06, 0], ['bell', T.coin + 0.05, 1174.66, 0.04, 1.2, 0], ['glitter', T.coin + 0.1, T.coin + 0.6],
  ...wordPops(T.h1, 5, 0.07, 1, 0.022),
  ['whoosh', T.refBack - 0.3, 0.3, 0.03], ['boom', T.refBack, 0.08], ['pluck', T.refBack + 0.05, 440, 0.04, 0.5, 0],
  ['pop', T.toss, 880, 0.05, 0], ['whoosh', T.toss, T.land - T.toss, 0.04],
  ...Array.from({ length: 5 }, (_, i) => ['tick', r3(T.toss + 0.12 + i * 0.17), 0.03]),
  ['bell', T.land, 880, 0.06, 1.6, 0], ['bell', r3(T.land + 0.06), 1318.51, 0.045, 1.6, 0.2], ['glitter', T.land, T.land + 0.7], ['tick', T.land, 0.06],
  ['pop', T.split, 987.77, 0.05, 0], ['whoosh', T.split, 0.4, 0.03], ...wordPops(T.h2, 1, 0.07, 2, 0.025),
  ['riser', r3(T.split + 0.5), T.snap, 0.04],
  ['pop', T.snap, 1174.66, 0.07, 0], ['pluck', T.snap, 587.33, 0.06, 0.7, 0], ['bell', T.snap, 1479.98, 0.05, 1.4, 0], ['glitter', T.snap, T.snap + 0.6],
  ['pop', T.bonk, 659.25, 0.07, 0], ['pluck', T.bonk, 440, 0.05, 0.4, 0], ['pop', r3(T.bonk + 0.12), 554.37, 0.05, 0.2], ['tick', T.bonk, 0.06], ['boom', T.bonk, 0.1],
  ['pop', r3(T.bonk + 0.15), 783.99, 0.035, -0.5],       // Pisces sniffle
  ['pop', T.refPeek + 0.1, 987.77, 0.035, 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
