// srphotos — "Photos lie." (20 s vertical Align ad, Star Talk Remix of promo/films/photos) · story 0–15.6, then the
// shared end card. Lofi · G.
//   0.00–5.00  "Photos *lie.*"  A profile photo (Juniper, 27). The ♍ VIRGO STAR inspects it through a big pixel
//              magnifying glass. Three stickers slap onto the photo, one per beat: GOOD ANGLE (the photo tilts, shot from
//              above) · FILTER · PEACH (it goes soft and peachy) · TAKEN IN 2019 (sepia + an orange date stamp). Virgo
//              goes wider-eyed at each, then rolls its eyes. ♍: "smooth: 99. angle: fake. year: *2019.*"
//   5.00–5.60  the photo glitches into slices and bursts into pixels…
//   5.60       the drop · "Charts *don't.*"  …which land as her veiled card (card-profile-3: Juniper, 27 · Libra).
//              THE STARS (gold) pops in: "we wrote your chart the day you were *born.*"  Her Big Three chips pop in a row
//              (☉ LIBRA · ☽ GEMINI · ↑ AQUARIUS, as in the original); Virgo checks each and nods.
//   9.60       "Card first. | *Face last.*"  THE STARS: "the face comes *after.* promise."  Virgo drops the magnifier
//              (clink) and goes heart-eyed at the card.
//  12.60       card cut (flip) · "Fall for the | *chart.*"  Virgo literally falls: a slow swoon backwards, flat on its
//              back, hearts rising. ♓ Pisces sobs happily in the corner. The gold star winks.
//              Everything pops out by 15.5; the end card takes over at 15.6.
// One canvas (sky + photo + card + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', CYAN = '#7fdcff', PEACH = '#ffb48a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const D2R = Math.PI / 180
const VIR = signStar('virgo'), PIS = signStar('pisces')

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.55, h0Out: [5.0, 5.2],
  photoIn: 0.2, tags: [BEAT(0) + 0.05, BEAT(2) + 0.05, BEAT(4) + 0.05], roll: [2.95, 3.35],  // 0.65 · 1.76 · 2.87
  open: 3.02, l1: 3.2,
  glitch: [4.95, 5.5], burst: 5.45, land: BEAT(9),                                                // 5.6
  h1: 5.62, h1Land: 5.95, goldIn: 5.95, l2: 6.75, chips: [8.2, 8.6, 9.0], h1Out: [9.4, 9.56],
  h2: 9.62, h2Land: 10.0, l3: 9.82, drop: 10.6, heart: 11.0, close: 12.5, h2Out: [12.42, 12.58],
  h3: 12.72, h3Land: 13.12, swoon: [13.45, 14.05], pisces: 12.85, wink: [14.4, 14.85], h3Out: [15.18, 15.38], out: [15.12, 15.5],
}
const VSPK = '♍ VIRGO STAR', SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: VSPK, text: 'smooth: 99. angle: fake. year: *2019.*', color: VIR.color },
  { t: T.l2, speaker: SPEAK, text: 'we wrote your chart the day you were *born.*' },
  { t: T.l3, speaker: SPEAK, text: 'the face comes *after.* promise.' },
]
const CPS = 31

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const pulse = (t, t0, d) => (t < t0 || t > t0 + d) ? 0 : Math.sin(Math.PI * (t - t0) / d)
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }

// ── pixel bits
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
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
// the pixel portrait (16 × 18 cells, long dark hair; generated, not a real person)
function faceSprite(doc) {
  const c = doc.createElement('canvas'); c.width = 16; c.height = 18
  const g = c.getContext('2d')
  const skin = '#d9a07a', hair = '#2a1a12', shirt = '#c9a6ff'
  const px = (X, Y, col) => { g.fillStyle = col; g.fillRect(X, Y, 1, 1) }
  for (let y = 0; y < 18; y++) for (let X = 0; X < 16; X++) { const u = (X + 0.5 - 8) / 5.6, v = (y + 0.5 - 18.6) / 3.6; if (y >= 14 && u * u + v * v <= 1) px(X, y, shirt) }
  for (let y = 3; y < 16; y++) { px(2, y, hair); px(3, y, hair); px(12, y, hair); px(13, y, hair) }
  for (let y = 12; y < 15; y++) for (let X = 7; X < 9; X++) px(X, y, skin)
  for (let y = 0; y < 14; y++) for (let X = 0; X < 16; X++) { const u = (X + 0.5 - 8) / 4.6, v = (y + 0.5 - 7.4) / 5.6; if (u * u + v * v <= 1) px(X, y, skin) }
  for (let y = 0; y < 6; y++) for (let X = 0; X < 16; X++) { const u = (X + 0.5 - 8) / 5.2, v = (y + 0.5 - 5.4) / 4.4; if (u * u + v * v <= 1 && (y < 4 || X < 5 || X > 10)) px(X, y, hair) }
  px(6, 8, '#1b1236'); px(9, 8, '#1b1236'); px(7, 11, '#c0405a'); px(8, 11, '#c0405a')
  g.globalAlpha = 0.4; px(5, 10, '#ff6f8f'); px(10, 10, '#ff6f8f')
  return c
}

// ── layout
const PHOTO = { x: 400, y: 950, w: 380, h: 520 }
const CARD = { x: 540, y: 1000, w: 360 }                // card body width
const V0 = { x: 856, y: 900, size: 232 }, V1 = { x: 888, y: 800, size: 196 }
const G1 = { x: 192, y: 800, size: 196 }
const LOW = 110
const lowY = t => LOW * ease.inOutCubic(prog(t, 12.5, 12.64))
const TAGS = [
  { text: 'GOOD ANGLE', col: GOLD, dx: -40, dy: -190, rot: -0.12 },
  { text: 'FILTER · PEACH', col: PEACH, dx: 40, dy: -10, rot: 0.1 },
  { text: 'TAKEN IN 2019', col: CYAN, dx: -10, dy: 112, rot: -0.06 },
]
const CHIPS = [{ g: '☉', s: 'LIBRA' }, { g: '☽', s: 'GEMINI' }, { g: '↑', s: 'AQUARIUS' }]
const CHIP_X = [218, 520, 852], CHIP_Y = 492

const V_HOPS = [...talkHops(LINES, VSPK, { cps: CPS }), ...T.chips.map(c => c + 0.05), T.heart].sort((a, b) => a - b)
const G_HOPS = [T.goldIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS }), T.wink[0]].sort((a, b) => a - b)

function virPos(t) {
  const r = ease.inOutCubic(prog(t, 5.3, 5.9))
  return { x: lerp(V0.x, V1.x, r), y: lerp(V0.y, V1.y, r) + lowY(t), size: lerp(V0.size, V1.size, r) }
}
function virState(t) {
  const tg = T.tags.findLast(a => t >= a)
  if (t < T.tags[0]) return { mood: 'squint', look: [-1, 0] }
  if (t >= T.roll[0] && t < T.roll[1]) return { mood: 'eyeroll', blink: false }
  if (t < T.l1 + 0.1 && tg != null && t - tg < 0.5) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.glitch[0]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.land + 0.4) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.chips[0]) return { mood: 'squint', look: [-1, 0.3] }
  if (t < T.drop) { const c = T.chips.findLast(a => t >= a); return t - c < 0.35 ? { mood: 'happy' } : { mood: 'neutral', look: [-1, -1] } }
  if (t < T.heart) return { mood: 'wide', look: [-1, 0.3], blink: false }
  if (t < T.swoon[0]) return { mood: 'heart' }
  return { mood: 'heart' }
}
function goldState(t) {
  if (t < T.goldIn + 0.4) return { mood: 'happy' }
  if (t < T.chips[0]) return { mood: 'neutral', look: [0, 0] }
  if (t < T.drop) return { mood: 'neutral', look: [1, -1] }
  if (t < T.swoon[0]) return { mood: 'happy', look: [0, 0] }
  if (t < T.wink[0]) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.wink[1]) return { mood: 'wink' }
  return { mood: 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 124px Inter", "800 40px Inter", "italic 500 176px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 26px 'Space Mono'", "bold 40px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const cardIm = await loadImg('card-profile-3.png')
  const CARD_BODY = 1262 / 1496
  const FACE = faceSprite(document)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const HEADS = [
    [popText(root, 'Photos *lie.*', { top: 228, size: 140, accentSize: 200, at: T.h0, gap: 0.12, late: 1, lateAt: T.h0Land, wobble: true, accentColor: PINK }), T.h0Out],
    [popText(root, 'Charts *don’t.*', { top: 228, size: 130, accentSize: 184, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: LAV }), T.h1Out],
    [popText(root, 'Card first. | *Face last.*', { top: 196, size: 120, accentSize: 172, at: T.h2, gap: 0.1, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 1.02 }), T.h2Out],
    [popText(root, 'Fall for the | *chart.*', { top: 196, size: 124, accentSize: 190, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK, lineHeight: 0.98 }), T.h3Out],
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }

  // ─────────────────────────────── the retouched photo
  function photoInner(t, w, h, k) {
    // k: [angle, filter, 2019] amounts 0..1
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#3a2c74'); g.addColorStop(1, '#1d1440')
    x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    const cell = 21 * (1 + 0.16 * k[0]), pw = 16 * cell, ph = 18 * cell
    x.save()
    if (k[1] > 0) x.filter = `blur(${(2.2 * k[1]).toFixed(2)}px) saturate(${(1 + 0.4 * k[1]).toFixed(2)})`
    x.imageSmoothingEnabled = false
    x.drawImage(FACE, -pw / 2 + 14 * k[0], h / 2 - ph + 40 * k[0], pw, ph)
    x.restore()
    if (k[1] > 0) { x.fillStyle = rgba(PEACH, 0.34 * k[1]); x.fillRect(-w / 2, -h / 2, w, h) }
    if (k[2] > 0) {
      x.fillStyle = `rgba(150,110,60,${0.32 * k[2]})`; x.fillRect(-w / 2, -h / 2, w, h)
      x.save(); x.globalAlpha = k[2]; x.textAlign = 'right'; x.textBaseline = 'alphabetic'; x.font = `700 30px ${MONO}`; x.fillStyle = '#ff9a3c'
      x.shadowColor = 'rgba(255,120,30,0.8)'; x.shadowBlur = 10; x.fillText("'19 07 04", w / 2 - 24, h / 2 - 84); x.restore()
    }
    const ig = x.createLinearGradient(0, h / 2 - 120, 0, h / 2); ig.addColorStop(0, 'rgba(10,6,28,0)'); ig.addColorStop(1, 'rgba(10,6,28,0.85)'); x.fillStyle = ig; x.fillRect(-w / 2, h / 2 - 120, w, 120)
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = BONE; x.font = `800 40px ${INTER}`
    x.fillText('Juniper, 27', -w / 2 + 26, h / 2 - 28)
  }
  function drawPhoto(t) {
    if (t >= T.burst + 0.05) return
    const pk = pop01(t, T.photoIn, 0.4, 1.7)
    if (pk <= 0.01) return
    const k = T.tags.map(a => ease.outCubic(prog(t, a, a + 0.25)))
    const rot = (-2 - 6 * k[0] + 3 * k[2]) * D2R
    const w = PHOTO.w, h = PHOTO.h
    const gl = prog(t, ...T.glitch)
    x.save(); x.translate(PHOTO.x, PHOTO.y); x.rotate(rot); x.scale(pk * (1 + 0.05 * gl), pk * (1 + 0.05 * gl))
    x.save(); x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; rr(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28, 18); x.fillStyle = '#f4ede0'; x.fill(); x.restore()
    if (gl <= 0) {
      x.save(); rr(-w / 2, -h / 2, w, h, 10); x.clip(); photoInner(t, w, h, k); x.restore()
    } else {
      // glitch: horizontal slices shove sideways, more and more
      const n = 13, sh = h / n, r = rng(Math.floor(t * 30) + 7)
      for (let i = 0; i < n; i++) {
        const off = (r() - 0.5) * 2 * 120 * ease.inQuad(gl), a = 1 - 0.6 * gl * r()
        x.save(); x.globalAlpha = a; x.beginPath(); x.rect(-w / 2 + off, -h / 2 + i * sh, w, sh + 0.5); x.clip()
        x.translate(off, 0); photoInner(t, w, h, k)
        if (r() < 0.3 * gl) { x.fillStyle = r() < 0.5 ? 'rgba(255,60,120,0.4)' : 'rgba(80,220,255,0.4)'; x.fillRect(-w / 2, -h / 2 + i * sh, w, sh) }
        x.restore()
      }
    }
    // stickers
    TAGS.forEach((tg, i) => {
      const s = pop01(t, T.tags[i], 0.28, 3) * (1 - gl)
      if (s <= 0.01) return
      x.save(); x.translate(tg.dx, tg.dy); x.rotate(tg.rot); x.scale(s * (1 + 0.5 * (1 - prog(t, T.tags[i], T.tags[i] + 0.12))), s)
      x.font = `700 30px ${MONO}`; const tw = x.measureText(tg.text).width + 40
      x.fillStyle = 'rgba(16,9,38,0.92)'; rr(-tw / 2, -32, tw, 64, 10); x.fill()
      x.lineWidth = 5; x.strokeStyle = tg.col; rr(-tw / 2, -32, tw, 64, 10); x.stroke()
      x.fillStyle = tg.col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tg.text, 0, 2)
      x.restore()
    })
    x.restore()
  }

  // ─────────────────────────────── the pixel burst and her card
  function drawBurst(t) {
    const tt = t - T.burst
    if (tt < 0 || tt > 0.6) return
    const r = rng(41), p = tt / 0.6
    for (let i = 0; i < 70; i++) {
      const sx = PHOTO.x + (r() - 0.5) * PHOTO.w, sy = PHOTO.y + (r() - 0.5) * PHOTO.h
      const tx = CARD.x + (r() - 0.5) * CARD.w, ty = CARD.y + (r() - 0.5) * 560
      const e = ease.inOutCubic(p), sw = Math.sin(Math.PI * p) * (r() - 0.5) * 200
      x.globalAlpha = 1 - ease.inQuad(p)
      x.fillStyle = [PINK, LAV, PEACH, GOLD, BONE][i % 5]
      x.fillRect(lerp(sx, tx, e) + sw, lerp(sy, ty, e), 14, 14)
    }
    x.globalAlpha = 1
  }
  function drawCard(t) {
    if (t < T.land - 0.12 || !cardIm) return
    const ok = popOut(t, [T.out[0] - 0.05, T.out[1]])
    if (ok <= 0) return
    const pk = easeOutBack(prog(t, T.land - 0.12, T.land + 0.3), 1.8) * ok
    const cy = CARD.y + lowY(t) + Math.sin(t * 1.6) * 6
    const w = CARD.w / CARD_BODY, h = w * cardIm.height / cardIm.width
    const glow = 0.3 + 0.25 * pulse(t, T.land, 0.8) + (t > T.heart ? 0.2 : 0)
    const gg = x.createRadialGradient(CARD.x, cy, 0, CARD.x, cy, 420); gg.addColorStop(0, rgba(LAV, glow * ok)); gg.addColorStop(1, rgba(LAV, 0)); x.fillStyle = gg; x.fillRect(CARD.x - 420, cy - 420, 840, 840)
    x.save(); x.translate(CARD.x, cy); x.rotate(0.02 * Math.sin(t * 1.1)); x.scale(pk, pk); x.drawImage(cardIm, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawChips(t) {
    const ok = outK(t, T.h1Out)
    CHIPS.forEach((c, i) => {
      const s = pop01(t, T.chips[i], 0.3, 2.6) * ok
      if (s <= 0.01) return
      x.save(); x.translate(CHIP_X[i], CHIP_Y); x.scale(s, s)
      x.font = `700 32px ${MONO}`; const tw = x.measureText(c.s).width + 104
      x.fillStyle = 'rgba(16,9,38,0.9)'; rr(-tw / 2, -36, tw, 72, 36); x.fill()
      x.lineWidth = 4; x.strokeStyle = GOLD; rr(-tw / 2, -36, tw, 72, 36); x.stroke()
      x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = GOLD; x.font = `700 40px ${GLYPH_FONT}`; x.fillText(c.g + '︎', -tw / 2 + 26, 2)
      x.fillStyle = BONE; x.font = `700 32px ${MONO}`; x.fillText(c.s, -tw / 2 + 76, 3)
      x.restore()
    })
  }

  // ─────────────────────────────── the magnifying glass (Virgo's)
  function drawMag(t, P) {
    const dp = prog(t, T.drop, T.drop + 0.45)
    if (dp >= 1) return
    const k = pop01(t, 0.35, 0.4, 2)
    if (k <= 0.01) return
    const scan = t < T.glitch[0] ? Math.sin(t * 2.2) : 0
    let mx = P.x - P.size * 0.72 + 14 * scan, my = P.y + P.size * 0.12 + 10 * Math.cos(t * 2.2)
    mx += dp * -20; my += ease.inQuad(dp) * 900
    const R = 66 * (P.size / V0.size) * k
    x.save(); x.translate(mx, my); x.rotate(0.5 + dp * 3)
    x.fillStyle = INK; x.fillRect(R * 0.7, -10, R * 1.15, 20)
    x.fillStyle = '#8a5a2a'; x.fillRect(R * 0.75, -6, R * 1.05, 12)
    x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fillStyle = 'rgba(200,235,255,0.18)'; x.fill()
    x.lineWidth = 14; x.strokeStyle = INK; x.stroke(); x.lineWidth = 8; x.strokeStyle = GOLD; x.stroke()
    x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-R * 0.5, -R * 0.45, 10, 10); x.fillRect(-R * 0.34, -R * 0.6, 10, 10)
    x.restore()
  }

  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.17, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 220 + Math.sin(p * 7 + i) * 16), Math.round(cy - 50 - p * 240), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
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

  function drawStars(t) {
    const ok = popOut(t, T.out)
    // Virgo (swoons backwards on "Fall for the chart.")
    const vk = pop01(t, 0.3, 0.4, 2) * ok
    const P = virPos(t)
    if (vk > 0.02) {
      const sw = ease.inOutCubic(prog(t, ...T.swoon)), land = t > T.swoon[1] ? Math.exp(-(t - T.swoon[1]) * 8) * Math.sin((t - T.swoon[1]) * 30) : 0
      const nod = T.chips.some(c => t >= c && t < c + 0.3) ? 0.08 : 0
      const baseY = P.y + P.size * 0.34
      x.save(); x.translate(P.x, baseY); x.rotate(sw * 1.42 + 0.06 * land - 0.06 * sw * Math.sin(Math.PI * sw)); x.translate(-P.x, -baseY)
      drawStarChar(x, P.x, P.y, P.size, t, { color: VIR.color, glyph: VIR.glyph, ...virState(t), hops: t < T.swoon[0] ? V_HOPS : [], pop: vk, squash: nod, seed: 6, glow: 1.0 + (t > T.heart ? 0.3 : 0) })
      x.restore()
      drawMag(t, P)
      if (t > T.heart) floatHearts(t, P.x - 30, P.y - 20 + 60 * sw, T.heart, T.out[0] - 0.6, 3)
      sparkles(t, P.x + 40, P.y + 40, T.swoon[1] - 0.05, 8, 120, 2, [PINK, BONE, GOLD])
    }
    // the gold narrator star
    const gk = pop01(t, T.goldIn, 0.36, 2.2) * ok
    if (gk > 0.02) {
      const drop = 1 - ease.outCubic(prog(t, T.goldIn - 0.1, T.goldIn + 0.22))
      drawStarChar(x, G1.x, G1.y - drop * 380 + lowY(t), G1.size, t, { color: STAR.sky, ...goldState(t), hops: G_HOPS, pop: gk, seed: 2, glow: 1.1 })
    }
    // ♓ Pisces, sobbing happily in the corner
    const pk = pop01(t, T.pisces, 0.34, 2.2) * ok
    if (pk > 0.02) {
      const px = 120, py = 1420
      drawStarChar(x, px, py, 104, t, { color: PIS.color, mood: 'happy', pop: pk, seed: 9, glow: 0.8, tips: false, squash: 0.05 * Math.sin(t * 22) })
      for (let k = 0; k < 4; k++) {
        const ph = ((t - T.pisces) * 1.6 + k * 0.25) % 1, side = k % 2 ? 1 : -1
        x.globalAlpha = (1 - ph) * clamp(pk); x.fillStyle = CYAN
        x.fillRect(Math.round(px + side * (18 + ph * 34)), Math.round(py + ph * 80), 8, 10); x.globalAlpha = 1
      }
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const lift = ease.inOutCubic(prog(t, T.glitch[0], T.land + 0.4))
      drawSky(x, t, { ...SKY_H, zoom: lerp(1.62, SKY_H.zoom, lift), dim: (SKY_H.dim ?? 1) * lerp(0.6, 1, lift) })
      if (t < T.out[1] + 0.05) {
        drawCard(t)
        drawPhoto(t)
        drawBurst(t)
        sparkles(t, CARD.x, CARD.y, T.land, 12, 300, 1, [LAV, GOLD, BONE, PINK])
        drawChips(t)
        drawStars(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.6 (photo → her card) and 12.6 (box shut → "Fall for the chart."). cardfx keeps one for a
// 20 s film (the 12.6 flip). End card flips at 15.6.
const CUTS = [5.6, { t: 12.6, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', T.photoIn + 0.05, 739.99, 0.04, -0.2], ['tick', T.photoIn + 0.1, 0.05],
  // the three stickers slap on (rising), the eye-roll
  ...T.tags.flatMap((a, i) => [['tick', a, 0.3], ['pop', a + 0.03, NOTE[i * 2 + 1], 0.045, -0.2]]),
  ['whoosh', T.roll[0], 0.3, 0.02],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [VSPK]: 990 } }),
  // glitch → burst → card
  ...Array.from({ length: 9 }, (_, i) => ['tick', +(T.glitch[0] + i * 0.055).toFixed(3), 0.18 + i * 0.02]),
  ['whoosh', T.burst - 0.1, 0.4, 0.05], ['boom', T.land, 0.14], ['bell', T.land, 1174.66, 0.04, 1.6, 0], ['glitter', T.land, T.land + 0.5],
  ...wordPops(T.h1, 1, 0.1, 2, 0.025), ['pop', T.h1Land, 1318.51, 0.045, 0],
  ['whoosh', T.goldIn - 0.1, 0.3, 0.03], ['pop', T.goldIn + 0.05, 880, 0.04, -0.4],
  ...T.chips.map((c, i) => ['bell', c, NOTE[i * 2 + 1], 0.04, 1.0, (i - 1) * 0.4]),
  // card first, face last: magnifier drops, heart-eyes
  ...wordPops(T.h2, 2, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.045, 0], ['pop', T.h2Land + 0.14, 1318.51, 0.045, 0],
  ['whoosh', T.drop, 0.3, 0.025], ['tick', T.drop + 0.42, 0.25], ['bell', T.drop + 0.44, 2349.3, 0.02, 0.5, 0.3],
  ['pluck', T.heart, 1174.66, 0.045, 0.5, 0.3], ['pluck', T.heart + 0.12, 1567.98, 0.04, 0.5, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // fall for the chart: the swoon
  ...wordPops(T.h3, 3, 0.1, 0, 0.026), ['pop', T.h3Land, 1318.51, 0.05, 0],
  ['pop', T.pisces + 0.05, 659.25, 0.03, -0.5],
  ['whoosh', T.swoon[0], 0.55, 0.03], ['boom', T.swoon[1], 0.1], ['tick', T.swoon[1], 0.2], ['glitter', T.swoon[1], T.swoon[1] + 0.5],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, -0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
