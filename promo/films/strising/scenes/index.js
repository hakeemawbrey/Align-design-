// strising (20 s vertical Align ad, Star Talk batch 3) · story 0–15.6, then the shared end card ("come" + the Align logo).
//   0.00–4.40  "First impressions | are your *Rising.*"  A star tries on looks in a full-length pixel mirror:
//              pixel shades ("COOL?"), a smiley mask on a stick ("CUTE?"), a dark hood with only its eyes peeking out
//              ("MYSTERIOUS?"). The reflection copies every look.
//   4.50–7.40  Box (THE STARS): "your Rising is the *front door.*"  (the star, still hooded, looks at you)
//   7.50–11.6  "The *whole* house."  Box: "*card first, face last.* let them see the whole house."  The hood slides off,
//              the mirror slides away, the star scoots aside and a blind card rises and flips: a veiled profile card
//              (the chart first, the photo later). Box pops shut.
//  11.80       card cut (flip).
//  11.90–15.5  "Card first. | *Face last.*"  The star beams at the card, heart-eyed. Everything pops out by 15.5;
//              the end card takes over at 15.6.
// One canvas (sky + mirror + star + masks + card), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes } from '../../startalk.js'

export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const YOU = '#b8a4ff'                           // "you": an un-badged lilac star
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.78, h0Out: [7.3, 7.5],
  starIn: 0.3, mirrorIn: 0.45,
  shades: [0.95, 1.95], smile: [2.05, BEAT(4)], hood: [BEAT(4), 8.05],   // the hood lands on the drop (2.82)
  open: 4.35, l1: 4.5,
  l2: 7.5, h1: 7.55, h1Land: 7.9, hoodOff: [8.05, 8.4], mirrorOut: [8.2, 8.6], move: [8.25, 8.85],
  cardUp: [8.5, 9.0], flip: [9.35, 9.75], h1Out: [11.4, 11.6], close: 11.6,
  cut: 11.8,
  h2: 11.9, h2Land: 12.3, hearts: 12.8, h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'your Rising is the *front door.*' },
  { t: T.l2, speaker: NARR, text: '*card first, face last.* let them see the whole house.' },
]
const CPS = 27
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

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
function bits(x, bm, cx, cy, cell, col, { a = 1 } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy))
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  x.fillStyle = col
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// which look is on (and how far in / out it is)
function lookAt(t) {
  for (const [k, [a, b]] of [['shades', T.shades], ['smile', T.smile], ['hood', T.hood]]) if (t >= a && t < b) return { k, in: prog(t, a, a + 0.2), age: t - a }
  if (t >= T.hoodOff[0] && t < T.hoodOff[1]) return { k: 'hood', in: 1, off: prog(t, ...T.hoodOff), age: 9 }
  return null
}
const LABEL = { shades: 'COOL?', smile: 'CUTE?', hood: 'MYSTERIOUS?' }

const STAR_A = { x: 320, y: 1090, s: 340 }, STAR_B = { x: 205, y: 1215, s: 190 }, STAR_F = { x: 205, y: 1235, s: 240 }
const MIRROR = { x: 790, y: 1035, w: 340, h: 580 }
const CARD = { x: 640, y: 940, w: 460 }
const HOPS = [T.starIn + 0.35, T.shades[0] + 0.05, T.smile[0] + 0.05, T.hood[0] + 0.05, T.hoodOff[1], T.move[1], T.h2Land, T.hearts + 1.0]

function starState(t) {
  if (t < T.shades[0]) return { mood: 'neutral', look: [1, 0] }
  if (t < T.smile[0]) return { mood: 'happy', look: [1, 0] }
  if (t < T.hood[0]) return { mood: 'happy', look: [1, 0] }
  if (t < T.l1) return { mood: 'squint', look: [1, 0] }
  if (t < LT[0].done + 0.2) return { mood: 'squint', look: [0, 0] }
  if (t < T.l2) return { mood: 'neutral', look: [0, 0] }
  if (t < T.hoodOff[1]) return { mood: 'wide', look: [0, 0] }
  if (t < T.flip[1]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.cut) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.hearts) return { mood: 'happy', look: [0, 0] }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "italic 500 170px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 34px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-3.png')])
  const BACK = bake(backIm, 620), FACE = bake(faceIm, 760)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'First impressions | are your *Rising.*', { top: 200, size: 100, accentSize: 156, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.09, accentColor: PINK })
  const H1 = popText(root, 'The *whole* house.', { top: 230, size: 116, accentSize: 168, at: T.h1, late: -1, lateAt: T.h1Land, wobble: true, gap: 0.1, accentColor: GOLD })
  const H2 = popText(root, 'Card first. | Face *last.*', { top: 200, size: 128, accentSize: 186, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.16, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  /** the current look, drawn over a star returned by drawStarChar (in whatever transform the star was drawn in) */
  function drawLook(t, r, L) {
    if (!L) return
    const c = r.size / 36, ex = r.x, ey = r.y + 1.2 * c
    const k = easeOutBack(L.in, 2.4)
    const C = n => Math.round(n * c)
    x.save()
    if (L.k === 'shades') {
      const dy = (1 - k) * -C(10)
      x.globalAlpha *= clamp(L.in * 3)
      x.fillStyle = INK
      x.fillRect(ex - C(9.5), ey - C(2.8) + dy, C(19), C(1.4))                   // bar
      for (const s of [-1, 1]) {
        x.fillStyle = INK; x.fillRect(ex + (s < 0 ? -C(9.5) : C(1.2)), ey - C(2.8) + dy, C(8.3), C(5.6))
        x.fillStyle = '#2b2160'; x.fillRect(ex + (s < 0 ? -C(8.5) : C(2.2)), ey - C(1.8) + dy, C(6.3), C(3.6))
        x.fillStyle = '#8fd8f6'; x.fillRect(ex + (s < 0 ? -C(7.5) : C(3.2)), ey - C(1.6) + dy, C(2), C(1))
      }
      // glint
      const g = L.age - 0.35
      if (g > 0 && g < 0.4) drawPixelStar(x, ex - C(4), ey - C(2.5) + dy, 30 * Math.sin(Math.PI * g / 0.4) + 6, 2, '#ffffff')
    } else if (L.k === 'smile') {
      // a smiley mask on a stick, held up in front of the face
      const my = ey + C(1) + (1 - k) * C(14)
      x.globalAlpha *= clamp(L.in * 3)
      x.fillStyle = '#8a5a2a'; x.fillRect(ex + C(2.5), my + C(6), C(1.5), C(12)); x.fillStyle = INK; x.fillRect(ex + C(2), my + C(18), C(2.5), C(1))
      for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) {
        const d = Math.hypot(i + 0.5, j + 0.5) / 9
        if (d > 1.1) continue
        x.fillStyle = d > 0.96 ? INK : (i + j < -6 ? '#fffbea' : '#ffe7a8')
        x.fillRect(ex + i * c, my + j * c, c + 0.5, c + 0.5)
      }
      x.fillStyle = INK
      for (const s of [-1, 1]) { x.fillRect(ex + s * C(4) - C(2), my - C(3), C(1), C(1)); x.fillRect(ex + s * C(4) - C(1), my - C(4), C(2), C(1)); x.fillRect(ex + s * C(4) + C(1), my - C(3), C(1), C(1)) }
      // big U smile
      x.fillRect(ex - C(5), my + C(1), C(1), C(2)); x.fillRect(ex + C(4), my + C(1), C(1), C(2))
      x.fillRect(ex - C(4), my + C(3), C(8), C(1)); x.fillRect(ex - C(3), my + C(4), C(6), C(1))
      x.fillStyle = '#ff8fb1'; x.fillRect(ex - C(7), my + C(1), C(2), C(1)); x.fillRect(ex + C(5), my + C(1), C(2), C(1))
    } else if (L.k === 'hood') {
      // a dark cloak hood: an arch over the head with a face opening; slides up and away on hoodOff
      const off = L.off ? ease.inCubic(L.off) : 0
      const hy = ey - (1 - k) * C(18) - off * C(40)
      x.globalAlpha *= clamp(L.in * 3) * (1 - off)
      for (let j = -22; j <= 8; j++) for (let i = -14; i <= 14; i++) {
        const u = (i + 0.5) / 13.5, v = (j + 0.5 - 1) / 17
        const inHood = u * u + v * v <= 1 && j >= -21
        const inFace = ((i + 0.5) / 8.6) ** 2 + ((j + 0.5 - 1.5) / 5.6) ** 2 <= 1
        if (!inHood || inFace) continue
        const edge = u * u + v * v > 0.86 || ((i + 0.5) / 9.6) ** 2 + ((j + 0.5 - 1.5) / 6.6) ** 2 <= 1
        x.fillStyle = edge ? '#1a1036' : (i < -4 && j < -6 ? '#5a3a9a' : '#3d2670')
        x.fillRect(ex + i * c, hy + j * c, c + 0.5, c + 0.5)
      }
    }
    x.restore()
  }

  function starPos(t) {
    if (t >= T.cut) return STAR_F
    const e = ease.inOutCubic(prog(t, ...T.move))
    return { x: lerp(STAR_A.x, STAR_B.x, e), y: lerp(STAR_A.y, STAR_B.y, e) - Math.sin(Math.PI * e) * 90, s: lerp(STAR_A.s, STAR_B.s, e) }
  }
  function drawStar(t) {
    const ok = popOut(t, T.out)
    let pk = pop01(t, T.starIn, 0.38, 2.1)
    if (t >= T.cut) pk = pop01(t, T.cut + 0.1, 0.34, 2)
    pk *= ok
    if (pk <= 0.02) return
    const P = starPos(t), st = starState(t)
    const r = drawStarChar(x, P.x, P.y, P.s * pk, t, { color: YOU, ...st, hops: HOPS, seed: 4, glow: 1.1, bob: P.s * 0.025 })
    drawLook(t, r, lookAt(t))
    if (t > T.hearts) floatHearts(t, P.x, P.y - 40)
  }

  // ── the full-length mirror; the reflection copies the look (mirrored)
  function drawMirror(t) {
    const pin = easeOutBack(prog(t, T.mirrorIn, T.mirrorIn + 0.45), 1.6), po = ease.inCubic(prog(t, ...T.mirrorOut))
    if (pin <= 0.01 || po >= 1) return
    const M = MIRROR, cx = M.x + (1 - pin) * 500 + po * 520, cy = M.y
    const fw = M.w, fh = M.h
    x.save(); x.translate(cx, cy); x.rotate(po * 0.4)
    // stand legs
    x.fillStyle = INK; x.fillRect(-fw * 0.38 - 8, fh / 2 - 20, 22, 70); x.fillRect(fw * 0.38 - 14, fh / 2 - 20, 22, 70)
    x.fillStyle = '#c98a1f'; x.fillRect(-fw * 0.38 - 2, fh / 2 - 20, 10, 64); x.fillRect(fw * 0.38 - 8, fh / 2 - 20, 10, 64)
    // frame
    x.save(); x.shadowColor = rgba(GOLD, 0.5); x.shadowBlur = 40
    x.fillStyle = '#c98a1f'; x.beginPath(); x.roundRect(-fw / 2, -fh / 2, fw, fh, [fw / 2, fw / 2, 18, 18]); x.fill(); x.restore()
    x.lineWidth = 8; x.strokeStyle = INK; x.stroke()
    x.fillStyle = '#f7c948'; x.beginPath(); x.roundRect(-fw / 2 + 10, -fh / 2 + 10, fw - 20, fh - 20, [fw / 2 - 10, fw / 2 - 10, 12, 12]); x.fill()
    // glass
    const gw = fw - 44, gh = fh - 44
    x.save(); x.beginPath(); x.roundRect(-gw / 2, -gh / 2, gw, gh, [gw / 2, gw / 2, 8, 8]); x.clip()
    const gl = x.createLinearGradient(0, -gh / 2, 0, gh / 2); gl.addColorStop(0, '#3a2c74'); gl.addColorStop(1, '#1d1440')
    x.fillStyle = gl; x.fillRect(-gw / 2, -gh / 2, gw, gh)
    // the reflection: drawn in a flipped frame, so it faces back at the star
    x.save(); x.scale(-1, 1)
    const st = starState(t)
    const r = drawStarChar(x, -12, 50, 255, t, { color: YOU, ...st, hops: HOPS, seed: 4, glow: 0.45, bob: 255 * 0.025, tips: false })
    drawLook(t, r, lookAt(t))
    x.restore()
    // shine streaks
    x.fillStyle = 'rgba(255,255,255,0.14)'
    x.beginPath(); x.moveTo(-gw / 2 + 30, -gh / 2 + 120); x.lineTo(-gw / 2 + 70, -gh / 2 + 120); x.lineTo(-gw / 2 + 10, -gh / 2 + 260); x.lineTo(-gw / 2 - 30, -gh / 2 + 260); x.fill()
    x.restore()
    x.restore()
    // the look's label over the mirror
    const L = lookAt(t)
    if (L && !L.off && po <= 0) {
      const lk = easeOutBack(clamp((L.age - 0.12) / 0.3), 2.6)
      if (lk > 0.01) {
        x.save(); x.translate(cx, cy - fh / 2 - 66); x.scale(lk, lk); x.rotate(-0.05)
        const label = LABEL[L.k]; x.font = `700 34px ${MONO}`; const tw = x.measureText(label).width + 0.12 * 34 * label.length
        x.fillStyle = 'rgba(20,12,44,0.94)'; x.beginPath(); x.roundRect(-tw / 2 - 24, -32, tw + 48, 64, 14); x.fill()
        x.lineWidth = 3; x.strokeStyle = PINK; x.stroke()
        x.fillStyle = PINK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '0.12em'; x.fillText(label, 3, 2)
        x.restore()
      }
    }
  }

  // ── the blind card: back rises, flips to the veiled profile card (no photo yet)
  function drawImg(img, bodyFrac, wBody) { if (!img) return; const w = wBody / bodyFrac, h = w * img.height / img.width; x.drawImage(img, -w / 2, -h / 2, w, h) }
  function drawCard(t) {
    if (t < T.cardUp[0]) return
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const up = easeOutBack(prog(t, ...T.cardUp), 1.4), f = prog(t, ...T.flip), sx = Math.cos(f * Math.PI)
    const cx = CARD.x, cy = lerp(2350, CARD.y, up) + Math.sin(t * 1.8) * 6
    const halo = up * (f > 0.5 ? 1 : 0.4) * ok
    if (halo > 0) { const g = x.createRadialGradient(cx, cy, 0, cx, cy, 560); g.addColorStop(0, rgba(LAV, 0.32 * halo)); g.addColorStop(1, rgba(LAV, 0)); x.fillStyle = g; x.fillRect(cx - 560, cy - 560, 1120, 1120) }
    x.save(); x.translate(cx, cy); x.rotate(lerp(0.15, -0.025, up)); x.scale(ok, ok)
    if (sx > 0) { x.scale(sx, 1); drawImg(BACK, BACK_BODY, CARD.w) } else { x.scale(-sx, 1); drawImg(FACE, FACE_BODY, CARD.w) }
    x.restore()
    if (f > 0.4) sparkles(t, cx, cy, T.flip[1] - 0.15, 12, 340, 2)
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
  function floatHearts(t, cx, cy) {
    for (let i = 0; i < 7; i++) {
      const born = T.hearts + i * 0.26, life = 1.2
      if (t < born || born > T.out[0]) continue
      const p = (t - born) / life
      if (p >= 1) continue
      bits(x, HEART, cx + (((i * 37) % 7) / 6 - 0.5) * 200 + Math.sin(p * 7 + i) * 14, cy - 80 - p * 260, 7 + (i % 3), [PINK, '#ff4f86', GOLD][i % 3], { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        drawMirror(t)
        drawCard(t)
        drawStar(t)
        const P = starPos(t)
        sparkles(t, P.x, P.y, T.hoodOff[0] + 0.1, 10, 200, 1)
        sparkles(t, CARD.x, CARD.y, T.h2Land, 12, 360, 3)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 7.45 (inert: H0 → H1 while the box keeps talking), 11.8 (box shut → the last line, plays).
const CUTS = [7.45, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const swap = (t0, f) => [['whoosh', t0 - 0.05, 0.22, 0.03], ['pop', t0 + 0.08, f, 0.04, 0.2], ['pluck', t0 + 0.2, f * 1.5, 0.03, 0.4, 0.3]]
export const CUES = [
  ...wordPops(T.h0, 4, 0.09, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['pop', T.starIn + 0.05, 659.25, 0.04, 0], ['whoosh', T.mirrorIn, 0.4, 0.03], ['bell', T.mirrorIn + 0.4, 1567.98, 0.022, 1.0, 0.3],
  ...swap(T.shades[0], 880), ['bell', T.shades[0] + 0.45, 2093, 0.02, 0.8, 0],
  ...swap(T.smile[0], 987.77),
  ...swap(T.hood[0], 523.25), ['boom', T.hood[0], 0.12],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  ...wordPops(T.h1, 2, 0.1, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['whoosh', T.hoodOff[0], 0.3, 0.035], ['glitter', T.hoodOff[0] + 0.1, T.hoodOff[0] + 0.6],
  ['whoosh', T.mirrorOut[0], 0.4, 0.03], ['whoosh', T.cardUp[0], 0.4, 0.03],
  ['tick', T.flip[0] + 0.05, 0.05], ['bell', T.flip[1], 1318.51, 0.04, 1.6, 0], ['glitter', T.flip[1] - 0.15, T.flip[1] + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1046.5, 0.05, 0], ['pop', T.h2Land + 0.16, 1174.66, 0.05, 0], ['pluck', T.h2Land + 0.16, 1046.5, 0.045, 0.7, 0],
  ['glitter', T.h2Land, T.h2Land + 0.5], ['pluck', T.hearts, 1318.51, 0.035, 0.5, -0.2], ['bell', T.hearts + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
