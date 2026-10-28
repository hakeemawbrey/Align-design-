// st4leomirror (20 s vertical Align ad, Star Talk season 4, EP 018 · thread B2: Leo × Aquarius) · story 0–15.6, then the end card.
//   0.00–5.20  "Leo has a | *crush.*"  The ♌ star, crown on, rehearses into its hand mirror (starleo). Every line is about
//              itself: "hey. it's Leo." · "you'll love my crown." · "ask me about… me!"  Heart-eyes at its reflection.
//              (The ghost leans out from behind the mirror, unimpressed.)
//   5.20–8.30  "Meanwhile, | across *town…*"  The camera pans across the sky to the ♒ Aquarius star, headphones round its
//              neck, holding a phone with Leo's veiled card on it. It looks… and looks away fast, whistling. Twice.
//   8.30–13.6  "Dear *Leo…*"  Back at the mirror. LEO: "should i lead with my best angle?" → THE STARS: "lead with a
//              *question*." The mirror poofs into a big gold "?"; Leo's eyes go wide, then sparkle.
//   13.7–15.4  "Ask about *them.*"  Leo hops, heart-eyed at the "?". Everything pops out by 15.45.
// One canvas (sky + both scenes on a panning strip), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 18
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const LEO = signStar('leo'), AQU = signStar('aquarius')
const ORANGE = LEO.color, CYAN = '#7fdcff'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.95, 5.12],
  leoIn: 0.35, mirrorIn: 0.7, r1: 1.0, r2: 2.25, r3: 3.5, rOut: [4.95, 5.1], ghost: 1.75,
  pan: [5.15, 5.65], h1: 5.55, h1Land: 5.95, peek: [6.0, 7.25], away: [6.55, 7.75], h1Out: [8.0, 8.18], back: [8.0, 8.42],
  h2: 8.45, h2Land: 8.8, open: 8.5, l1: 8.7, l2: 11.3, poof: 11.55, q: 11.7, close: 13.6, h2Out: [13.45, 13.62],
  h3: 13.72, h3Land: 14.05, heart: 14.15, h3Out: [15.15, 15.4], out: [15.05, 15.45],
}
const LINES = [
  { t: T.l1, speaker: '♌ LEO STAR', text: 'should i lead with my best angle?', color: ORANGE },
  { t: T.l2, speaker: 'THE STARS', text: 'lead with a *question*.' },
]
const CPS = 28
const REH = [   // rehearsal bubbles
  { t: T.r1, text: "hey. it's Leo.", out: [T.r2 - 0.08, T.r2] },
  { t: T.r2, text: "you'll love my crown.", out: [T.r3 - 0.08, T.r3] },
  { t: T.r3, text: 'ask me about… me!', out: T.rOut },
]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const NOTE_BM = ['...XX.', '...XXX', '...X.X', '...X..', '.XXX..', 'XXXX..', '.XX...']
const QMARK = ['.YYYYY.', 'YYgggYY', 'YY...YY', '.....YY', '...YYY.', '..YY...', '..YY...', '.......', '..YY...', '..YY...']

// the star's squash (mirrors startalk's hop maths) so the crown stays seated on the tip
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
function tipOf(t, r, size, pop, { squash = 0, hops, seed = 1 }) {
  const s = size * pop, cell = s >= 56 ? Math.max(1, Math.round(s / 28)) : s / 28, S = cell * 28
  const sq = squash + hopState(t, hops).sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sy = 1 - sq * 0.9, base = S * 0.32
  return { x: r.x, y: r.y + base - (S / 2 + base - cell * 1.2) * sy, cell }
}

// ── layout (Leo's scene at strip x 0; Aquarius's scene one screen to the right)
const LEO_P = { x: 380, y: 1120, size: 340 }
const MIRROR = { x: 830, y: 1040 }
const AQ_P = { x: 720, y: 1130, size: 320 }
const PHONE = { x: 290, y: 1070, w: 320, h: 560 }
const panX = t => -1080 * (ease.inOutCubic(prog(t, ...T.pan)) - ease.inOutCubic(prog(t, ...T.back)))

const LEO_HOPS = [T.leoIn + 0.3, T.r1 + 0.05, T.r2 + 0.05, T.r3 + 0.05, T.r3 + 0.45, ...talkHops(LINES, '♌ LEO STAR', { cps: CPS }), T.q + 0.3, T.h3Land, T.heart + 0.5]
const AQ_HOPS = [T.away[0], T.away[1]]

function leoState(t) {
  if (t < T.mirrorIn + 0.3) return { mood: 'happy' }
  if (t < T.r1) return { mood: 'neutral', look: [1, 0] }
  if (t < T.r3) return { mood: 'heart', look: [1, 0] }
  if (t < T.rOut[0]) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.l1) return { mood: 'neutral', look: [1, 0] }
  if (t < T.l2) return { mood: 'wide', look: [0, -1], blink: false }        // "should i…?" (hopeful)
  if (t < T.poof) return { mood: 'neutral', look: [0, -1] }
  if (t < T.q + 0.6) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.heart) return { mood: 'sparkle', look: [1, -1] }
  return { mood: 'heart' }
}
function aqState(t) {
  const look = t >= T.peek[0] && t < T.away[0] ? 1 : t >= T.peek[1] && t < T.away[1] ? 1 : 0
  if (look) return { mood: 'neutral', look: [-1, 0], blink: false }
  if (t >= T.away[0] && t < T.away[0] + 0.5 || t >= T.away[1]) return { mood: 'eyeroll', blush: 0.9 }
  return { mood: 'neutral', look: [1, -1], blush: t > T.away[0] ? 0.8 : 0 }
}

async function build(stage) {
  try {
    await Promise.all(['800 112px Inter', "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 38px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const imCard = await load('card-profile-2.png')

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Leo has a | *crush.*', { top: 200, size: 124, accentSize: 196, at: T.h0, gap: 0.1, accentColor: PINK, wobble: true, late: 1, lateAt: T.h0 + 0.4, lineHeight: 0.95 })
  const H1 = popText(root, 'Meanwhile, | across *town…*', { top: 200, size: 104, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: CYAN, lineHeight: 1.0 })
  const H2 = popText(root, 'Dear *Leo…*', { top: 230, size: 136, accentSize: 200, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: ORANGE })
  const H3 = popText(root, 'Ask about | *them.*', { top: 200, size: 128, accentSize: 200, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, ORANGE]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7, spread = 220) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, p = (t - born) / 1.1
      if (born > t1 || p <= 0 || p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * spread + Math.sin(p * 7 + i) * 16), Math.round(cy - 60 - p * 240), cell, { alpha: Math.sin(Math.PI * p) })
    }
  }

  // ── the mirror (starleo's), with a mini mirrored Leo in the glass; it poofs into a gold "?"
  function drawMirror(t) {
    const pin = pop01(t, T.mirrorIn, 0.4, 2), poof = prog(t, T.poof, T.poof + 0.16)
    if (pin <= 0.01 || poof >= 1) return
    const s = pin * (1 + 0.25 * Math.sin(Math.PI * poof)) * (1 - poof)
    const cx = MIRROR.x + (1 - pin) * 140, cy = MIRROR.y + Math.sin(t * 2.4 + 1) * 8
    const c = 11 * s, RX = 7.5, RY = 9.5, hcy = -2
    x.save(); x.translate(cx, cy); x.rotate(-0.12 + 0.05 * Math.sin(t * 1.7))
    x.fillStyle = INK; x.fillRect(-2 * c, (hcy + RY - 0.5) * c, 4 * c, 7 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(-1 * c, (hcy + RY) * c, 2 * c, 6 * c); x.fillStyle = '#f7c948'; x.fillRect(-1 * c, (hcy + RY) * c, 1 * c, 6 * c)
    for (let j = -11; j <= 9; j++) for (let i = -9; i <= 9; i++) {
      const u = (i + 0.5) / RX, v = (j + 0.5 - hcy) / RY, d = u * u + v * v
      const col = d <= 0.62 ? null : d <= 0.86 ? (u + v < -0.2 ? '#fff1c8' : '#f7c948') : d <= 1.0 ? '#c98a1f' : d <= 1.2 ? INK : undefined
      if (col === undefined) continue
      x.fillStyle = col || '#2a1f55'; x.fillRect(i * c, j * c, c + 0.5, c + 0.5)
    }
    x.save()
    x.beginPath(); x.ellipse(0, hcy * c, RX * Math.sqrt(0.62) * c, RY * Math.sqrt(0.62) * c, 0, 0, Math.PI * 2); x.clip()
    const gl = x.createLinearGradient(0, -RY * c, 0, RY * c); gl.addColorStop(0, '#3a2c74'); gl.addColorStop(1, '#1d1440')
    x.fillStyle = gl; x.fillRect(-RX * c, (hcy - RY) * c, 2 * RX * c, 2 * RY * c)
    x.scale(-1, 1)
    const st = leoState(t)
    drawStarChar(x, 0, (hcy + 1.2) * c, 135 * s, t, { color: ORANGE, mood: st.mood === 'heart' || st.mood === 'sparkle' ? st.mood : 'happy', look: [1, 0], seed: 3, glow: 0.4, bob: 0, tips: false })
    x.restore()
    x.fillStyle = 'rgba(255,255,255,0.55)'
    for (let k = 0; k < 4; k++) x.fillRect((-4 + k) * c, (hcy - 4 + k) * c, c, c)
    x.restore()
  }
  function drawQuestion(t) {
    const k = pop01(t, T.q, 0.4, 2.6) * popOut(t, T.out)
    if (k <= 0.01) return
    const cy = MIRROR.y - 20 + Math.sin(t * 2.6) * 10
    const g = x.createRadialGradient(MIRROR.x, cy, 0, MIRROR.x, cy, 220); g.addColorStop(0, `rgba(242,199,92,${0.4 * k})`); g.addColorStop(1, 'rgba(242,199,92,0)')
    x.fillStyle = g; x.fillRect(MIRROR.x - 220, cy - 220, 440, 440)
    drawBits(x, QMARK, { Y: '#f7c948', g: '#fff1c8' }, MIRROR.x, cy, 20 * k, { rot: 0.08 * Math.sin(t * 2.1) })
  }

  // a pixel speech bubble over Leo (rehearsal)
  function bubble(t, b, ax, ay) {
    const k = pop01(t, b.t, 0.26, 2.4) * (1 - ease.inCubic(prog(t, ...b.out)))
    if (k <= 0.01) return
    x.save(); x.font = `700 40px ${MONO}`
    const tw = x.measureText(b.text).width, bw = tw + 56, bh = 86, P = 6
    const cx = clamp(ax, 40 + bw / 2, 1040 - bw / 2)
    x.translate(cx, ay + bh); x.scale(k, k); x.translate(0, -bh)
    const L = -bw / 2
    const fillStep = (o, col) => { x.fillStyle = col; x.fillRect(L + o + P, o, bw - 2 * o - 2 * P, bh - 2 * o); x.fillRect(L + o, o + P, bw - 2 * o, bh - 2 * o - 2 * P) }
    fillStep(-P, INK); fillStep(0, '#ffe2c2')
    const tx = ax - cx
    for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(tx - (4 - i) * P, bh - P + i * P, (4 - i) * 2 * P, P + 1) }
    for (let i = 0; i < 3; i++) { x.fillStyle = '#ffe2c2'; x.fillRect(tx - (3 - i) * P, bh - P + i * P, (3 - i) * 2 * P, P + 1) }
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(b.text, 0, bh / 2 + 2)
    x.restore()
  }

  function drawLeo(t, ox) {
    const ok = popOut(t, T.out), lp = pop01(t, T.leoIn, 0.38, 2.2) * ok
    if (lp <= 0.02) return null
    const opts = { color: ORANGE, glyph: LEO.glyph, ...leoState(t), hops: LEO_HOPS, pop: lp, seed: 3, glow: 1.15 }
    const r = drawStarChar(x, LEO_P.x + ox, LEO_P.y, LEO_P.size, t, opts)
    const tp = tipOf(t, r, LEO_P.size, lp, opts), ch = CROWN.length * tp.cell * 0.95
    drawBits(x, CROWN, CROWN_C, Math.round(tp.x), Math.round(tp.y - ch * 0.12), tp.cell * 0.95, { rot: -0.2 + 0.04 * Math.sin(t * 3) })
    if (t > T.r1 && t < T.r3 + 0.6) floatHearts(t, r.x + 160, r.y, T.r1 + 0.1, T.r3, 1, 6, 160)
    if (t > T.heart) floatHearts(t, r.x + 120, r.y, T.heart, T.out[0], 5, 7, 200)
    return r
  }

  // ── Aquarius: headphones around its neck, the phone with Leo's veiled card
  // headphones resting round its "neck": the band dips behind the body, the cups sit in the notches between arms and legs
  function neckphones(r, size, front) {
    if (!front) return
    const c = Math.max(4, Math.round(size / 34)), cupY = r.y + size * 0.12, cupX = size * 0.3
    if (front) {
      for (let i = 0; i <= 22; i++) {
        const a = Math.PI * i / 22, bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * size * 0.2
        x.fillStyle = INK; x.fillRect(Math.round(bx - c * 1.5), Math.round(by - c * 1.5), c * 3, c * 3)
        x.fillStyle = '#8a6ad8'; x.fillRect(Math.round(bx - c), Math.round(by - c), c * 2, c * 2)
      }
    }
    for (const sd of [-1, 1]) {
      const cx = r.x + sd * cupX, w = c * 4, h = c * 6
      x.fillStyle = INK; x.fillRect(Math.round(cx - w / 2 - c), Math.round(cupY - h / 2 - c), w + 2 * c, h + 2 * c)
      x.fillStyle = '#ff6ad5'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), w, h)
      x.fillStyle = '#ffb3f0'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), c, h)
    }
  }
  function drawAqua(t, ox) {
    if (ox > 1080 + 400 || ox < -800) return
    const ok = popOut(t, T.out)
    // the phone, held up, screen facing us: Leo's veiled card
    const shake = (t > T.away[0] && t < T.away[0] + 0.2) || (t > T.away[1] && t < T.away[1] + 0.2) ? Math.sin(t * 90) * 6 : 0
    const tilt = t > T.away[0] && t < T.peek[1] || t > T.away[1] ? 0.14 : -0.04          // tilts away when it pretends not to look
    const px = PHONE.x + ox + shake, py = PHONE.y + Math.sin(t * 2) * 6, w = PHONE.w, h = PHONE.h, c = 8
    x.save(); x.translate(px, py); x.rotate(tilt); x.scale(ok, ok)
    x.fillStyle = INK; x.fillRect(-w / 2 - c, -h / 2, w + 2 * c, h); x.fillRect(-w / 2, -h / 2 - c, w, h + 2 * c)
    x.fillStyle = '#d9b25a'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#120a28'; x.fillRect(-w / 2 + c, -h / 2 + c, w - 2 * c, h - 2 * c)
    if (imCard) { const ih = h - 5 * c, iw = ih * imCard.width / imCard.height; x.drawImage(imCard, -iw / 2, -ih / 2, iw, ih) }
    x.restore()
    const g = x.createRadialGradient(px, py, 0, px, py, 300); g.addColorStop(0, 'rgba(243,154,58,0.22)'); g.addColorStop(1, 'rgba(243,154,58,0)')
    x.fillStyle = g; x.fillRect(px - 300, py - 300, 600, 600)
    // the star
    neckphones({ x: AQ_P.x + ox, y: AQ_P.y }, AQ_P.size, false)
    const r = drawStarChar(x, AQ_P.x + ox, AQ_P.y, AQ_P.size, t, { color: AQU.color, glyph: AQU.glyph, ...aqState(t), hops: AQ_HOPS, seed: 8, glow: 1.2, pop: ok })
    neckphones(r, AQ_P.size, true)
    // whistling notes when it looks away
    for (const a0 of T.away) {
      for (let i = 0; i < 4; i++) {
        const born = a0 + 0.1 + i * 0.18, p = (t - born) / 0.9
        if (p <= 0 || p >= 1) continue
        drawBits(x, NOTE_BM, { X: i % 2 ? CYAN : BONE }, r.x + 120 + i * 30 + Math.sin(p * 6) * 12, r.y - 120 - p * 200, 6, { alpha: Math.sin(Math.PI * p) })
      }
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ox = panX(t)
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.45, SKY_H.zoom, ss), dy: lerp(-22, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dx: (base.dx || 0) + ox * 0.25 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        // Leo's scene (the mirror drawn in strip space); the ghost after the mirror it hides behind
        x.save(); x.translate(ox, 0)
        drawMirror(t)
        drawGhostCameo(x, t, { x: MIRROR.x + 100, y: 1050, at: T.ghost, dur: 1.4, from: 'left', cell: 4 })
        x.restore()
        const rL = ox > -1000 ? drawLeo(t, ox) : null
        if (rL) for (const b of REH) bubble(t, b, rL.x + 20, 720)
        x.save(); x.translate(ox, 0); drawQuestion(t); x.restore()
        if (rL) sparkles(t, rL.x, rL.y, T.q + 0.1, 10, 220, 1)
        drawAqua(t, ox + 1080)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 8.2 (across town → back to Leo) and 13.66 (box shut → "Ask about them.").
const CUTS = [8.21, { t: 13.66, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0), ['pop', T.h0 + 0.4, 1174.66, 0.045, 0], ['pluck', T.h0 + 0.45, 1318.51, 0.035, 0.5, 0],
  ['pop', T.leoIn + 0.05, 739.99, 0.045, 0], ['whoosh', T.mirrorIn - 0.05, 0.35, 0.03], ['pop', T.mirrorIn + 0.2, 1318.51, 0.03, 0.4],
  ...REH.flatMap((b, i) => [['pop', b.t, NOTE[i + 2], 0.04, -0.1], ...[0, 1, 2, 3, 4].map(j => ['pop', +(b.t + 0.08 + j * 0.065).toFixed(3), 739.99 * (1 + 0.06 * (j % 3)), 0.013, -0.1])]),
  ['pluck', T.r1 + 0.15, 1174.66, 0.035, 0.5, 0.2], ['glitter', T.r3, T.r3 + 0.4],
  // across town
  ['whoosh', T.pan[0], 0.6, 0.045], ...wordPops(T.h1, 1, 0.1, 3), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['tick', T.peek[0], 0.03], ...T.away.flatMap(a => [['pop', a, 1318.51, 0.035, 0.3], ['pluck', a + 0.12, 1567.98, 0.025, 0.4, 0.4], ['pluck', a + 0.3, 1760, 0.022, 0.4, 0.4], ['pluck', a + 0.48, 1567.98, 0.02, 0.4, 0.4]]),
  ['tick', T.peek[1], 0.03],
  // back to Leo, the advice
  ['whoosh', T.back[0], 0.5, 0.04], ...wordPops(T.h2, 1, 0.1, 1), ['pop', T.h2Land, 1174.66, 0.045, 0],
  ['pop', T.open, 739.99, 0.035, 0], ['pop', T.open + 0.06, 987.77, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { '♌ LEO STAR': 739.99 } }),
  ['pop', T.poof, 1318.51, 0.04, 0.4], ['tick', T.poof + 0.04, 0.03], ['bell', T.q + 0.05, 1567.98, 0.035, 1.3, 0.3], ['glitter', T.q, T.q + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // last line
  ...wordPops(T.h3, 2, 0.1, 2, 0.028), ['pop', T.h3Land, 1318.51, 0.055, 0], ['pluck', T.h3Land, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
