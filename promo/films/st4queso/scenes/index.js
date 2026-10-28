// st4queso (EP 059, 15 s vertical Align ad, Star Talk season 4, thread F: the six couples) · story 0–10.6, then the
// shared end card ("come" + the Align logo, JOIN THE TEXAS BETA).
//   0.00–5.00  "Tex-Mex is a | love *language.*"  A striped table, a bowl of queso (steam, a jalapeño slice), a basket of chips.
//              ♓ Pisces dips a chip, bites it… and on the drop (2.27) dips the SAME chip again. "DOUBLE DIP!" flashes red;
//              ♍ Virgo goes wide-eyed behind its clipboard ("QUESO RULES · 1. NO DOUBLE DIP").
//              Box (THE STARS): "you'll disagree on small stuff."
//   5.00–7.95  "*Laugh* it off."  Box: "laugh about it *together.*"  Virgo cracks up (HA HA), crosses out rule 1 and writes
//              "2. LAUGH ♥". The ghost hangs down from under the table (6.6).
//   8.10       card cut (flip).
//   8.20–10.5  "Pick your battles. | *Not* the queso."  Both dip at once and clink chips over the bowl; hearts.
// Astrology: Virgo and Pisces are opposite signs (mutable earth and mutable water): the tidy one and the dreamy one.
// One canvas, DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 59
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5a5a', INK = '#1b1236', MINT = '#7dffb0'
const QUESO = '#ffc23a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const PIS = signStar('pisces'), VIR = signStar('virgo')

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.85, h0Out: [4.85, 5.05],
  in: 0.3, dip1: [1.0, 1.35], bite: [1.45, 1.75], dip2: [1.85, BEAT(3)], alarm: BEAT(3),       // 2.27: the double dip
  open: 2.75, l1: 2.9,
  h1: 5.05, h1Land: 5.35, h1Out: [7.85, 8.05],
  l2: 5.3, laugh: 6.05, strike: 6.3, rule2: 6.6, ghost: 6.6, close: 7.95,
  cut: 8.1,
  h2: 8.2, h2Land: 8.55, clink: [8.5, 9.0], h2Out: [10.28, 10.5], out: [10.08, 10.45],
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'you’ll disagree on small stuff.' },
  { t: T.l2, speaker: NARR, text: 'laugh about it *together.*' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
// a tortilla chip (a chunky triangle, salt specks) and its bitten version
const CHIP = BMP(`....X.... ...XXX... ...XsX... ..XXXXX.. ..XsXXX.. .XXXXXsX. .XXsXXXX. XXXXXXXXX`)
const CHIP_B = BMP(`......... ......... ......... ..X..XX.. ..XsXXX.. .XXXXXsX. .XXsXXXX. XXXXXXXXX`)
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1, outline = true } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  if (outline) {
    x.fillStyle = 'rgba(14,8,32,0.88)'
    bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  }
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = typeof cols === 'string' ? cols : (cols[ch] || cols.X); x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}
const CHIP_C = { X: '#f2c75c', s: '#fff1c8' }

// ── layout
const TABLE_Y = 1235
const ZOOM = { y: 1330, k: 1.3 }
const BOWL = { x: 520, y: 1190, w: 300 }
const BASKET = { x: 800, y: 1205 }
const PIS_P = { x: 255, y: 1060, s: 260 }, VIR_P = { x: 775, y: 1050, s: 260 }
const CLIP = { x: 830, y: 850 }
const MOUTH = { x: 330, y: 1040 }, REST_P = { x: 420, y: 1090 }, DIP = { x: 470, y: 1150 }
const VREST = { x: 690, y: 1080 }, VDIP = { x: 575, y: 1150 }

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 96px Inter", "800 64px Inter", "800 40px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Tex-Mex is a | love *language.*', { top: 196, size: 104, accentSize: 160, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: QUESO })
  const H1 = popText(root, '*Laugh* it off.', { top: 236, size: 120, accentSize: 172, at: T.h1, late: 0, wobble: true, gap: 0.12, accentColor: MINT })
  const H2 = popText(root, 'Pick your battles. | *Not* the queso.', { top: 196, size: 96, accentSize: 150, at: T.h2, late: 3, lateAt: T.h2Land, lateGap: 0.12, wobble: true, gap: 0.08, accentColor: QUESO })
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

  // ── the table: a striped cloth, legs into the dark
  function drawTable(t, fade) {
    x.save(); x.globalAlpha = fade
    x.fillStyle = '#1e1636'; x.fillRect(140, TABLE_Y + 110, 26, 400); x.fillRect(914, TABLE_Y + 110, 26, 400)
    x.fillStyle = INK; x.fillRect(60, TABLE_Y - 6, W - 120, 128)
    const STR = ['#c2263a', '#c2263a', '#ff7a2a', '#f2c75c', INK, '#2fa3a0', '#2fa3a0', '#ff5c8a', INK, '#f2c75c', '#ff7a2a', '#c2263a', '#c2263a', '#7a1a3a', '#f3e6c8', '#7a1a3a']
    for (let i = 0; i < 16; i++) { x.fillStyle = STR[i]; x.fillRect(66, TABLE_Y + i * 7, W - 132, 7) }
    x.fillStyle = '#f3e6c8'; x.fillRect(66, TABLE_Y + 112, W - 132, 8)
    for (let px = 70; px < W - 70; px += 24) { x.fillStyle = '#f3e6c8'; x.fillRect(px, TABLE_Y + 120, 8, 12) }
    x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(66, TABLE_Y, W - 132, 6)
    x.restore()
  }
  // the ghost hangs down from under the table edge: it has to be drawn after the table
  // ── the queso: a dark bowl, bubbling cheese, a jalapeño, steam
  function drawBowl(t, fade) {
    const k = pop01(t, T.in, 0.36, 2) * fade
    if (k <= 0.01) return
    const { x: cx, y: cy, w } = BOWL
    x.save(); x.translate(cx, cy); x.scale(k, k)
    // steam
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.6 + i / 3) % 1
      x.globalAlpha = Math.sin(Math.PI * ph) * 0.5
      x.fillStyle = BONE
      for (let s = 0; s < 6; s++) x.fillRect(-60 + i * 60 + Math.sin(ph * 8 + s + i) * 12, -70 - ph * 150 - s * 14, 10, 10)
    }
    x.globalAlpha = 1
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w / 2 + 8, 52, 0, 0, Math.PI * 2); x.fill()
    x.fillRect(-w / 2 - 8, 0, w + 16, 40); x.beginPath(); x.ellipse(0, 40, w / 2 + 8, 40, 0, 0, Math.PI); x.fill()
    x.fillStyle = '#3a3356'; x.fillRect(-w / 2, 0, w, 38); x.beginPath(); x.ellipse(0, 38, w / 2, 34, 0, 0, Math.PI); x.fill()
    x.fillStyle = '#5a5480'; x.fillRect(-w / 2 + 10, 6, w - 20, 6)
    x.fillStyle = QUESO; x.beginPath(); x.ellipse(0, 0, w / 2 - 6, 40, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffd86a'; x.beginPath(); x.ellipse(-30, -10, 80, 16, 0, 0, Math.PI * 2); x.fill()
    // bubbles
    for (let i = 0; i < 4; i++) { const ph = (t * 0.9 + i * 0.27) % 1, r = 6 + 8 * Math.sin(Math.PI * ph); x.fillStyle = '#ffe9a6'; x.beginPath(); x.arc(-90 + i * 60, -4 + (i % 2) * 14, r, 0, Math.PI * 2); x.fill() }
    // jalapeño slice
    x.fillStyle = '#2f8a4a'; x.beginPath(); x.arc(70, 6, 18, 0, Math.PI * 2); x.fill(); x.fillStyle = '#bfe8a0'; x.beginPath(); x.arc(70, 6, 10, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function drawBasket(t, fade) {
    const k = pop01(t, T.in + 0.1, 0.36, 2) * fade
    if (k <= 0.01) return
    x.save(); x.translate(BASKET.x, BASKET.y); x.scale(k, k)
    for (let i = 0; i < 6; i++) bits(x, CHIP, -70 + i * 28, -36 - (i % 2) * 14, 6, CHIP_C, { rot: -0.5 + i * 0.2 })
    x.fillStyle = INK; x.beginPath(); x.moveTo(-110, -26); x.lineTo(110, -26); x.lineTo(90, 30); x.lineTo(-90, 30); x.closePath(); x.fill()
    x.fillStyle = '#e23d3d'; x.beginPath(); x.moveTo(-102, -20); x.lineTo(102, -20); x.lineTo(84, 24); x.lineTo(-84, 24); x.closePath(); x.fill()
    x.fillStyle = '#ff7a7a'; for (let i = -3; i <= 3; i++) x.fillRect(i * 26 - 3, -16, 6, 36)
    x.restore()
  }

  // ── the chips in play: Pisces's (the double dipper) and, in beat 2–3, Virgo's
  function pisChip(t) {
    const path = [[0, REST_P], [T.dip1[0], REST_P], [T.dip1[1], DIP], [T.bite[0], MOUTH], [T.bite[1], MOUTH], [T.dip2[0], MOUTH], [T.dip2[1], DIP], [T.alarm + 0.5, DIP], [T.alarm + 0.9, REST_P]]
    let P = REST_P
    for (let i = 0; i < path.length - 1; i++) {
      const [ta, A] = path[i], [tb, B] = path[i + 1]
      if (t >= ta && t < tb) { const e = ease.inOutCubic(prog(t, ta, tb)); P = { x: lerp(A.x, B.x, e), y: lerp(A.y, B.y, e) - Math.sin(Math.PI * e) * 40 }; break }
      if (t >= tb) P = B
    }
    if (t >= T.cut) {
      const e = ease.inOutCubic(prog(t, T.clink[0] - 0.25, T.clink[0]))
      P = { x: lerp(REST_P.x, 520, e), y: lerp(REST_P.y, 1070, e) }
    }
    const dipped = t > T.dip1[1] - 0.05, bitten = t > T.bite[0] + 0.15 && t < T.cut
    return { ...P, dipped, bitten, rot: 0.5 }
  }
  function virChip(t) {
    if (t < T.laugh + 0.4) return null
    if (t < T.cut) {
      const e = ease.inOutCubic(prog(t, T.laugh + 0.4, T.laugh + 0.9)), d = ease.inOutCubic(prog(t, T.laugh + 0.9, T.laugh + 1.2))
      return { x: lerp(VREST.x, VDIP.x, d), y: lerp(VREST.y, VDIP.y, d) - (1 - e) * 60, dipped: t > T.laugh + 1.15, rot: -0.5, a: e }
    }
    const e = ease.inOutCubic(prog(t, T.clink[0] - 0.25, T.clink[0]))
    return { x: lerp(VREST.x, 600, e), y: lerp(VREST.y, 1070, e), dipped: true, rot: -0.5, a: 1 }
  }
  function drawChip(c, t) {
    if (!c) return
    const clinkK = t >= T.clink[0] && t < T.clink[1] ? Math.sin((t - T.clink[0]) / (T.clink[1] - T.clink[0]) * Math.PI) : 0
    const bm = c.bitten ? CHIP_B : CHIP
    const rot = c.rot * (1 - 0.5 * clinkK)
    bits(x, bm, c.x, c.y, 10, CHIP_C, { rot, a: c.a ?? 1 })
    if (c.dipped) {
      // queso on the tip (the bottom half of the chip), with a drip
      x.save(); x.globalAlpha = c.a ?? 1; x.translate(Math.round(c.x), Math.round(c.y)); x.rotate(rot)
      x.fillStyle = QUESO; x.fillRect(-45, 15, 90, 25); x.fillRect(-30, 5, 60, 12)
      const dp = (t * 1.3) % 1
      x.fillRect(-6, 40, 10, 10 + dp * 22)
      x.restore()
    }
  }

  // ── Virgo's clipboard
  function drawClipboard(t, fade) {
    const k = pop01(t, T.in + 0.2, 0.36, 2) * fade
    if (k <= 0.01) return
    const shake = t > T.alarm && t < T.alarm + 0.5 ? Math.sin(t * 80) * 6 : 0
    x.save(); x.translate(CLIP.x + shake, CLIP.y + Math.sin(t * 2.2) * 5); x.rotate(0.1); x.scale(0.8 * k, 0.8 * k)
    x.fillStyle = INK; x.fillRect(-118, -150, 236, 300)
    x.fillStyle = '#b07a3a'; x.fillRect(-112, -144, 224, 288)
    x.fillStyle = '#f7f1e3'; x.fillRect(-98, -120, 196, 250)
    x.fillStyle = '#c9c3e0'; x.fillRect(-42, -160, 84, 34); x.fillStyle = INK; x.fillRect(-42, -160, 84, 6)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `700 26px ${MONO}`
    x.fillText('QUESO', 0, -90); x.fillText('RULES', 0, -60)
    x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(-80, -38, 160, 3)
    x.textAlign = 'left'; x.font = `700 22px ${MONO}`; x.fillStyle = INK
    x.fillText('1. NO DOUBLE', -86, -10); x.fillText('   DIP.', -86, 18)
    const sp = prog(t, T.strike, T.strike + 0.3)
    if (sp > 0) { x.fillStyle = RED; x.fillRect(-88, -12, 176 * sp, 5); x.fillRect(-88, 16, 110 * sp, 5) }
    const r2 = pop01(t, T.rule2, 0.3, 2.4)
    if (r2 > 0.01) {
      x.save(); x.translate(-86, 70); x.scale(r2, r2); x.fillStyle = '#2fa36b'; x.font = `700 24px ${MONO}`; x.fillText('2. LAUGH', 0, 0); x.restore()
      bits(x, HEART, 66, 70, 4 * r2, PINK, { outline: false })
    }
    x.restore()
  }

  // ── the stars
  function pisState(t) {
    if (t < T.dip1[0]) return { mood: 'sparkle', look: [1, 1] }
    if (t < T.bite[1]) return { mood: 'happy', look: [1, 1] }
    if (t < T.alarm) return { mood: 'heart', look: [1, 1] }                       // so good it goes back in
    if (t < T.alarm + 1.0) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.laugh) return { mood: 'wide', look: [1, 0] }
    if (t < T.cut) return { mood: 'happy', look: [1, 0] }
    return { mood: t > T.clink[1] ? 'heart' : 'happy', look: [1, 0] }
  }
  function virState(t) {
    if (t < T.dip2[0]) return { mood: 'neutral', look: [-1, 1] }
    if (t < T.alarm + 1.1) return { mood: 'wide', look: [-1, 1], blink: false }
    if (t < T.laugh) return { mood: 'squint', look: [-1, 0] }
    if (t < T.laugh + 1.4) return { mood: 'happy', look: [0, 0] }
    if (t < T.cut) return { mood: 'sparkle', look: [-1, 0] }
    return { mood: t > T.clink[1] ? 'heart' : 'happy', look: [-1, 0] }
  }
  function drawStars(t) {
    const ok = popOut(t, T.out)
    const pp = (t >= T.cut ? pop01(t, T.cut + 0.08, 0.34, 2) : pop01(t, T.in, 0.36, 2)) * ok
    const vp = (t >= T.cut ? pop01(t, T.cut + 0.12, 0.34, 2) : pop01(t, T.in + 0.12, 0.36, 2)) * ok
    // Virgo laughs: a quick shaky squash run
    const lk = t > T.laugh && t < T.laugh + 1.3 ? 0.08 * Math.abs(Math.sin((t - T.laugh) * 18)) : 0
    const pisHops = [T.in + 0.4, T.bite[0], T.alarm + 0.05, T.laugh + 0.3, T.clink[0], T.clink[1] + 0.3, 9.7]
    const virHops = [T.in + 0.5, T.alarm, T.alarm + 0.4, T.l2 + 0.6, T.clink[0], T.clink[1] + 0.35, 9.9]
    if (pp > 0.02) drawStarChar(x, PIS_P.x, PIS_P.y, PIS_P.s, t, { color: PIS.color, glyph: PIS.glyph, ...pisState(t), hops: pisHops, seed: 6, pop: pp, glow: 1.1 })
    if (vp > 0.02) {
      const r = drawStarChar(x, VIR_P.x, VIR_P.y, VIR_P.s, t, { color: VIR.color, glyph: VIR.glyph, ...virState(t), hops: virHops, seed: 3, pop: vp, glow: 1.1, squash: lk })
      // HA HA
      for (let i = 0; i < 3; i++) {
        const t0 = T.laugh + i * 0.32, kk = pop01(t, t0, 0.2, 2.6) * (1 - clamp((t - t0 - 0.7) / 0.25))
        if (kk <= 0.01 || t >= T.cut) continue
        x.save(); x.translate(VIR_P.x - 120 + i * 110, r.top - 30 - i * 34); x.rotate(-0.15 + i * 0.15); x.scale(kk, kk)
        x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.lineWidth = 9; x.strokeStyle = INK; x.strokeText('HA', 0, 0); x.fillStyle = MINT; x.fillText('HA', 0, 0)
        x.restore()
      }
    }
  }
  // DOUBLE DIP! alarm
  function drawAlarm(t) {
    const k = pop01(t, T.alarm, 0.25, 2.8) * (1 - ease.inCubic(prog(t, T.alarm + 1.3, T.alarm + 1.6)))
    if (k <= 0.01) return
    const fl = Math.sin((t - T.alarm) * 20) > -0.2 ? 1 : 0.6
    glow(BOWL.x, BOWL.y - 40, 360, RED, 0.6 * k * fl)
    x.save(); x.translate(BOWL.x, 930); x.rotate(-0.06); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-300, -62, 600, 124)
    x.fillStyle = RED; x.fillRect(-292, -54, 584, 108)
    x.fillStyle = 'rgba(255,255,255,0.2)'; x.fillRect(-292, -54, 584, 10)
    x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff6e6'; x.globalAlpha = fl; x.fillText('DOUBLE DIP!', 0, 4)
    x.restore()
  }

  function floatHearts(t, cx, cy, t0, t1, spread = 300) {
    for (let i = 0; i < 9; i++) {
      const born = t0 + i * 0.2, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 9) / 8 - 0.5
      bits(x, HEART, cx + side * spread + Math.sin(p * 7 + i) * 14, cy - p * 240, 5 + (i % 3), [PINK, '#ff4f86', GOLD][i % 3], { a: Math.sin(Math.PI * p) })
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
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
      const fade = 1 - ease.inOutQuad(prog(t, T.out[0] + 0.1, T.out[1] + 0.1))
      // a warm restaurant glow behind the table
      glow(540, TABLE_Y, 700, '#ffb070', 0.45 * fade)
      x.save(); x.translate(540, ZOOM.y); x.scale(ZOOM.k, ZOOM.k); x.translate(-540, -ZOOM.y)      // the table scene, zoomed in
      drawStars(t)
      drawClipboard(t, fade)
      drawTable(t, fade)
      drawGhostCameo(x, t, { x: BASKET.x, y: BASKET.y - 80, at: T.ghost, dur: 1.3, from: 'below', cell: 3 / ZOOM.k })
      drawBasket(t, fade)
      drawBowl(t, fade)
      drawChip(pisChip(t), t)
      drawChip(virChip(t), t)
      drawAlarm(t)
      sparkles(t, 560, 1060, T.clink[0], 14, 180, 1, [GOLD, QUESO, BONE, PINK])
      if (t > T.clink[1]) floatHearts(t, 540, 960, T.clink[1], 10.0, 520)
      x.restore()
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.0 (inert: the headline swaps), 8.1 (box shut → the last line, the one that plays).
const CUTS = [5.0, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.1, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['pop', T.in + 0.1, 659.25, 0.03, -0.3], ['pop', T.in + 0.2, 783.99, 0.03, 0.3],
  ['pop', T.dip1[1], 392, 0.04, -0.1], ['tick', T.bite[0] + 0.1, 0.06], ['tick', T.bite[0] + 0.18, 0.04],
  ['whoosh', T.dip2[0], 0.3, 0.025],
  // the double dip
  ['pop', T.alarm, 330, 0.05, 0], ['boom', T.alarm, 0.16], ['chip', T.alarm + 0.02, 1318.51, 0.1, { duty: 0.5, gain: 0.024 }], ['chip', T.alarm + 0.14, 987.77, 0.1, { duty: 0.5, gain: 0.024 }], ['chip', T.alarm + 0.26, 1318.51, 0.1, { duty: 0.5, gain: 0.024 }], ['chip', T.alarm + 0.38, 987.77, 0.14, { duty: 0.5, gain: 0.024 }],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  // laugh it off
  ...wordPops(T.h1, 3, 0.12, 2, 0.026),
  ...[0, 1, 2].map(i => ['pop', +(T.laugh + i * 0.32).toFixed(3), [1046.5, 1174.66, 1318.51][i], 0.04, 0.3]),
  ['tick', T.strike, 0.04], ['pluck', T.rule2, 1318.51, 0.03, 0.5, 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // pick your battles. not the queso.
  ...wordPops(T.h2, 3, 0.08, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0],
  ['bell', T.clink[0] + 0.02, 1760, 0.035, 1.2, 0], ['tick', T.clink[0], 0.05], ['glitter', T.clink[0], T.clink[0] + 0.6],
  ['pluck', 9.4, 1318.51, 0.035, 0.5, -0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
