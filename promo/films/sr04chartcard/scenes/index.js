// sr04chartcard (20 s vertical Align ad, Star Talk Remix of teaser 04 "You were born a card.") · story 0–15.6, then the end card.
//   0.00–5.50  "One card has | your *name.*"  A face-down sign card hangs in the sky, charging with light; your birth details
//              type in under it (MAY 12 · 5:00 PM · HOUSTON). THE STARS (the gold narrator) pops up beside it.
//              Box: "we wrote you down the day you were *born.*"  Then the gag: the star slides over and polishes the card
//              like a collector (squeak squeak), the card shakes, the star backs off wide-eyed…
//   5.60       DROP: the card flips to the Taurus sign card (burst, foil sweep), a "✦ YOUR CARD" tag stamps on.
//   5.75–8.80  "Sun in | *Taurus.*"  Heart-eyes. Box: "mint condition. *never been swiped.*"  ♓ Pisces peeks out from
//              behind the card, sobbing at how shiny it is.
//   8.80–12.6  "Plus your | *big three.*"  The card lifts; three little sign stars hop out of it: SUN ♉ Taurus, MOON ♐
//              Sagittarius, RISING ♎ Libra (the same big three as the original). Box: "sun, moon *and* rising? that's a
//              rare pull."  Box shuts.
//  12.70       card cut (flip).
//  12.80–15.5  "You were born | a *card.*"  The card again, the narrator hugging its edge, heart-eyed; the Taurus star waves.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// One canvas (sky + card + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', MINT = '#9ff0a8'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const TAU_ = { ...signStar('taurus'), color: '#86e08f' }   // the card art's green (SIGNS' Taurus gold reads as the narrator)
const SAG = signStar('sagittarius'), LIB = signStar('libra'), PIS = signStar('pisces')

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.25, 5.45],
  cardIn: 0.2, type0: 0.6, typeDt: 0.052, starIn: 0.9,
  open: 1.75, l1: 1.95,
  slide: [3.55, 3.9], rub: [3.9, 4.85], back: [4.85, 5.15], shake: [4.85, 5.35],
  flip: [5.35, 5.85], mid: 5.6,
  h1: 5.75, h1Land: 6.1, h1Out: [8.6, 8.8], l2: 5.95, foil: [5.95, 6.75], stamp: 6.55,
  pisces: [6.75, 8.75],
  lift: [8.8, 9.25], h2: 8.9, h2Land: 9.2, h2Out: [12.45, 12.65], badges: [9.15, 9.4, 9.65], l3: 9.3,
  close: 12.55, cut: 12.7,
  h3: 12.8, h3Land: 13.3, wave: 13.6, out: [15.05, 15.45],
}
const BIRTH = 'MAY 12 · 5:00 PM · HOUSTON'
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'we wrote you down the day you were *born.*' },
  { t: T.l2, speaker: SPEAK, text: 'mint condition. *never been swiped.*' },
  { t: T.l3, speaker: SPEAK, text: "sun, moon *and* rising? that's a rare pull." },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── pixel bits
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
const CARD_A = { x: 580, y: 815, h: 600 }, CARD_B = { x: 540, y: 735, h: 480 }, CARD_C = { x: 610, y: 830, h: 580 }
const NAR_A = { x: 158, y: 1200, s: 240 }, NAR_RUB = { x: 345, y: 1000, s: 240 }, NAR_B = { x: 880, y: 610, s: 180 }, NAR_C = { x: 205, y: 1190, s: 250 }
const BADGES = [
  { lab: 'SUN', name: 'Taurus', st: TAU_, x: 270, col: GOLD, mood: 'happy' },
  { lab: 'MOON', name: 'Sagittarius', st: SAG, x: 540, col: LAV, mood: 'wink' },
  { lab: 'RISING', name: 'Libra', st: LIB, x: 810, col: PINK, mood: 'sparkle' },
]
const BADGE_Y = 1150

// card art (PNG px): body boxes [x0, y0, x1, y1] (same as teasers/t04-chart-card.js)
const BACK_B = [120, 123, 924, 1325], FACE_B = [120, 121, 727, 1032]

function cardPose(t) {
  if (t >= T.cut) return { ...CARD_C, rot: 0.03 * Math.sin(t * 1.3) }
  const k = ease.inOutCubic(prog(t, ...T.lift))
  const c = { x: lerp(CARD_A.x, CARD_B.x, k), y: lerp(CARD_A.y, CARD_B.y, k), h: lerp(CARD_A.h, CARD_B.h, k) }
  const sh = prog(t, ...T.shake)
  const shake = sh > 0 && sh < 1 ? Math.sin(t * 58) * 0.035 * Math.sin(Math.PI * sh) : 0
  return { ...c, y: c.y + Math.sin(t * 1.6) * 6, rot: shake + 0.015 * Math.sin(t * 1.1) }
}
function narPose(t) {
  if (t >= T.cut) return NAR_C
  if (t >= T.lift[0]) { const k = ease.inOutCubic(prog(t, ...T.lift)); return { x: lerp(NAR_A.x, NAR_B.x, k), y: lerp(NAR_A.y, NAR_B.y, k) - Math.sin(Math.PI * k) * 160, s: lerp(NAR_A.s, NAR_B.s, k) } }
  if (t >= T.back[0]) { const k = ease.inOutCubic(prog(t, ...T.back)); return { x: lerp(NAR_RUB.x, NAR_A.x, k), y: lerp(NAR_RUB.y, NAR_A.y, k), s: lerp(NAR_RUB.s, NAR_A.s, k) } }
  if (t >= T.slide[0]) {
    const k = ease.inOutCubic(prog(t, ...T.slide))
    const rub = t > T.rub[0] ? Math.sin((t - T.rub[0]) * 28) * 16 : 0
    return { x: lerp(NAR_A.x, NAR_RUB.x, k) + rub, y: lerp(NAR_A.y, NAR_RUB.y, k) + rub * 0.5, s: lerp(NAR_A.s, NAR_RUB.s, k) }
  }
  return NAR_A
}
function narState(t) {
  if (t < T.l1) return { mood: 'happy', look: [1, -1] }
  if (t < T.slide[0]) return { mood: 'happy', look: [0, 0] }
  if (t < T.rub[0]) return { mood: 'neutral', look: [1, 0] }
  if (t < T.rub[1]) return { mood: 'squint', look: [1, 0] }
  if (t < T.mid) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.mid + 0.35) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < 7.6) return { mood: 'heart' }
  if (t < T.lift[0]) return { mood: 'sparkle', look: [-1, 0] }
  if (t < 11.3) return { mood: 'happy', look: [-1, 1] }
  if (t < 11.9) return { mood: 'wink' }
  if (t < T.cut) return { mood: 'happy', look: [-1, 1] }
  return { mood: 'heart' }
}
const NAR_HOPS = [T.starIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS }), T.mid + 0.4, T.h3Land]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = ASSETS + src })
  const bake = (im, k) => { if (!im) return null; const c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return { c, k } }
  const [backIm, faceIm] = await Promise.all([loadImg('card-sign-back.png'), loadImg('card-sign.png')])
  const BACK = bake(backIm, 0.6), FACE = bake(faceIm, 0.78)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'One card has | your *name.*', { top: 200, size: 108, accentSize: 156, at: T.h0, gap: 0.09, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0 + 0.45 })
  const H1 = popText(root, 'Sun in | *Taurus.*', { top: 190, size: 112, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: MINT })
  const H2 = popText(root, 'Plus your | *big three.*', { top: 190, size: 112, accentSize: 168, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: LAV })
  const H3 = popText(root, 'You were born | a *card.*', { top: 170, size: 116, accentSize: 184, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawCardImg(art, b, pose, sx, alpha = 1) {
    if (!art) return
    const k = pose.h / (b[3] - b[1]) / art.k
    const bcx = (b[0] + b[2]) / 2 * art.k, bcy = (b[1] + b[3]) / 2 * art.k
    x.save(); x.globalAlpha *= alpha
    x.translate(pose.x, pose.y); x.rotate(pose.rot || 0); x.scale(Math.max(0.004, sx) * (pose.s || 1), pose.s || 1)
    x.drawImage(art.c, -bcx * k, -bcy * k, art.c.width * k, art.c.height * k)
    x.restore()
  }
  const bodyW = h => h * 0.667

  // charge: a soft glow + rays behind the face-down card, rising toward the flip
  function drawCharge(t, pose) {
    const c = ease.inQuad(prog(t, 0.6, T.mid)) * (1 - ease.outQuad(prog(t, T.mid, T.mid + 1.2)))
    if (c <= 0.01) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const R = pose.h * (0.75 + 0.35 * c)
    const g = x.createRadialGradient(pose.x, pose.y, pose.h * 0.15, pose.x, pose.y, R)
    g.addColorStop(0, `rgba(190,150,255,${0.42 * c})`); g.addColorStop(0.5, `rgba(242,199,92,${0.16 * c})`); g.addColorStop(1, 'rgba(242,199,92,0)')
    x.fillStyle = g; x.fillRect(pose.x - R, pose.y - R, R * 2, R * 2)
    x.translate(pose.x, pose.y); x.rotate(t * 0.25)
    for (let i = 0; i < 12; i++) {
      x.rotate(Math.PI * 2 / 12)
      const L = R * (1.05 + 0.12 * Math.sin(t * 3 + i))
      const rg = x.createLinearGradient(0, 0, L, 0)
      rg.addColorStop(0, `rgba(255,236,190,${0.14 * c})`); rg.addColorStop(1, 'rgba(255,236,190,0)')
      x.fillStyle = rg; x.beginPath(); x.moveTo(0, -8); x.lineTo(L, -26); x.lineTo(L, 26); x.lineTo(0, 8); x.closePath(); x.fill()
    }
    x.restore()
    // light motes spiralling into the card
    for (let i = 0; i < 20; i++) {
      const ph = ((t - 0.8) * (0.42 + (i % 4) * 0.06) + i * 0.137) % 1
      if (t < 0.8 + i * 0.05) continue
      const r = (1 - ph) * 520 + 30, a = i * 2.4 + ph * 4.2
      const px = pose.x + Math.cos(a) * r, py = pose.y + Math.sin(a) * r * 1.15
      x.save(); x.globalAlpha = c * Math.sin(Math.PI * ph)
      drawPixelStar(x, px, py, 18 + 10 * (i % 3), i % 2 ? 1 : 2, [GOLD, BONE, LAV, PINK][i % 4])
      x.restore()
    }
  }

  function drawFoil(t, pose) {
    const p = prog(t, ...T.foil)
    if (p <= 0 || p >= 1) return
    const w = bodyW(pose.h) * (pose.s || 1), h = pose.h * (pose.s || 1)
    x.save(); x.translate(pose.x, pose.y); x.rotate(pose.rot || 0)
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 26); x.clip()
    x.globalCompositeOperation = 'lighter'
    const cx = lerp(-w * 1.2, w * 1.2, ease.inOutQuad(p))
    const g = x.createLinearGradient(cx - 120, -h / 2, cx + 120, h / 2)
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.35, 'rgba(255,214,150,0.35)'); g.addColorStop(0.5, 'rgba(255,255,255,0.6)'); g.addColorStop(0.65, 'rgba(170,230,255,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    x.restore()
  }

  function drawStamp(t, pose) {
    const a = pop01(t, T.stamp, 0.3, 2.6)
    if (a <= 0.01) return
    const s = (pose.h / CARD_A.h) * (1 + 0.6 * (1 - a)) * (pose.s || 1)
    const w = bodyW(pose.h) * (pose.s || 1)
    x.save(); x.globalAlpha *= clamp(a * 2)
    x.translate(pose.x + w * 0.28, pose.y - pose.h * (pose.s || 1) * 0.47); x.rotate((pose.rot || 0) - 0.16); x.scale(s, s)
    x.shadowColor = 'rgba(6,4,18,0.6)'; x.shadowBlur = 16; x.shadowOffsetY = 6
    x.fillStyle = '#fbf6ee'; x.beginPath(); x.roundRect(-118, -30, 236, 60, 14); x.fill()
    x.shadowColor = 'transparent'
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('✦ YOUR CARD', 0, 2)
    x.restore()
  }

  function drawCard(t) {
    const ok = popOut(t, T.out)
    const pin = pop01(t, T.cardIn, 0.45, 1.6) * ok
    if (pin <= 0.01) return null
    const pose = { ...cardPose(t), s: pin }
    if (t < T.cut) drawCharge(t, pose)
    let sx = 1, face = true
    if (t < T.cut) {
      const p = prog(t, ...T.flip)
      sx = Math.abs(Math.cos(Math.PI * p)); face = p >= 0.5
      if (p > 0 && p < 1) pose.s *= 1 + 0.08 * Math.sin(Math.PI * p)
    }
    if (face) drawCardImg(FACE, FACE_B, pose, sx)
    else drawCardImg(BACK, BACK_B, pose, sx)
    if (face) { if (t < T.cut) drawFoil(t, pose); drawStamp(t, pose) }
    return pose
  }

  function drawBirth(t) {
    const a = 1 - prog(t, T.flip[0] - 0.1, T.flip[0] + 0.1)
    if (a <= 0 || t < T.type0) return
    const chars = [...BIRTH], adv = 22, x0 = CARD_A.x + 25 - chars.length * adv / 2, y = 1172
    x.save(); x.globalAlpha = a
    x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.shadowColor = 'rgba(8,5,34,0.9)'; x.shadowBlur = 14
    let n = 0
    chars.forEach((ch, i) => { if (t >= T.type0 + i * T.typeDt) { x.fillStyle = ch === '·' ? GOLD : BONE; x.fillText(ch, x0 + i * adv, y); n = i + 1 } })
    if (Math.floor(t * 2.6) % 2 === 0) { x.fillStyle = GOLD; x.fillRect(x0 + n * adv + 2, y - 15, 14, 30) }
    x.restore()
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
  function tears(t, ex, ey, t0, t1, size) {
    const b = size / 130
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
    const px = lerp(720, 838, k), py = 1080
    const r = drawStarChar(x, px, py, 130, t, { color: PIS.color, mood: 'wide', look: [-1, -1], blink: false, seed: 12, hops: [a + 0.4, a + 1.0, a + 1.5], glow: 0.8, tips: false })
    tears(t, r.x, r.y, a + 0.3, b - 0.3, 130)
  }

  function drawNarrator(t) {
    const ok = popOut(t, T.out)
    const pin = pop01(t, T.starIn, 0.38, 2.2) * ok
    if (pin <= 0.02) return null
    const p = narPose(t), st = narState(t)
    const gasp = t >= T.mid && t < T.mid + 0.5 ? -0.12 * Math.exp(-(t - T.mid) * 7) * Math.cos((t - T.mid) * 20) : 0
    return drawStarChar(x, p.x, p.y, p.s, t, { color: STAR.sky, ...st, hops: NAR_HOPS, pop: pin, squash: gasp, seed: 3, glow: 1.1 })
  }

  function drawBadges(t) {
    if (t < T.badges[0] || t >= T.cut) return
    const ok = 1 - ease.inQuad(prog(t, T.close - 0.1, T.cut))
    BADGES.forEach((bd, i) => {
      const t0 = T.badges[i], pin = pop01(t, t0, 0.4, 2.2) * ok
      if (pin <= 0.02) return
      // hop out of the card: start at the card centre, arc down to the row
      const k = ease.outCubic(prog(t, t0 - 0.05, t0 + 0.35))
      const cx = lerp(CARD_B.x, bd.x, k), cy = lerp(CARD_B.y, BADGE_Y, k) - Math.sin(Math.PI * k) * 140
      drawStarChar(x, cx, cy, 150, t, { color: bd.st.color, glyph: bd.st.glyph, mood: bd.mood, look: [0, -1], pop: pin, seed: 20 + i, hops: [t0 + 0.4, 10.6 + i * 0.12], glow: 0.9 })
      if (k > 0.9) sparkles(t, bd.x, BADGE_Y, t0 + 0.35, 6, 70, i, [bd.col, BONE])
      const la = clamp(prog(t, t0 + 0.25, t0 + 0.45)) * ok
      if (la <= 0) return
      x.save(); x.globalAlpha = la; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.shadowColor = 'rgba(8,5,34,0.9)'; x.shadowBlur = 14
      x.fillStyle = bd.col; x.font = `700 26px ${MONO}`; x.fillText(bd.lab.split('').join(String.fromCharCode(8202)), bd.x, BADGE_Y + 105)
      x.fillStyle = BONE; x.font = `italic 500 46px ${SERIF}`; x.fillText(bd.name, bd.x, BADGE_Y + 148)
      x.restore()
    })
  }

  function drawTaurusWave(t) {
    if (t < T.cut) return
    const ok = popOut(t, T.out), pin = pop01(t, T.cut + 0.15, 0.4, 2.2) * ok
    if (pin <= 0.02) return
    drawStarChar(x, 905, 1215, 170, t, { color: TAU_.color, glyph: TAU_.glyph, mood: t > T.wave ? 'happy' : 'neutral', look: [-1, -1], pop: pin, seed: 21, hops: [T.cut + 0.5, T.wave, T.wave + 0.35, T.wave + 0.7], glow: 0.9 })
  }

  function flash(t) {
    const d = t - T.mid
    if (d < 0 || d > 0.35) return
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.55 * (1 - d / 0.35)
    const g = x.createRadialGradient(CARD_A.x, CARD_A.y, 0, CARD_A.x, CARD_A.y, 900)
    g.addColorStop(0, '#fff6e0'); g.addColorStop(1, 'rgba(255,246,224,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, moon: null })
      if (t < T.out[1] + 0.02) {
        if (t < T.cut) drawPisces(t)
        const pose = drawCard(t)
        drawBirth(t)
        if (pose && t < T.cut) { sparkles(t, CARD_A.x, CARD_A.y, T.mid, 14, 380, 0.3); sparkles(t, CARD_A.x + 150, CARD_A.y - 300, T.stamp + 0.1, 8, 70, 1, [GOLD, BONE]) }
        flash(t)
        drawBadges(t)
        drawTaurusWave(t)
        const r = drawNarrator(t)
        if (r && t > T.mid + 0.3 && t < 7.6) floatHearts(t, r.x, r.y, T.mid + 0.35, 7.3, 1)
        if (r && t > T.h3Land) floatHearts(t, r.x + 40, r.y, T.h3Land, T.out[0], 5, 6)
        if (r && t > T.rub[0] && t < T.rub[1]) {          // squeak sparkles where the star polishes
          const k = Math.floor((t - T.rub[0]) / 0.16)
          sparkles(t, CARD_A.x - 120 + (k % 3) * 60, 900 + (k % 2) * 90, T.rub[0] + k * 0.16, 4, 30, k, [BONE, GOLD])
        }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: 12.70 (box shut → "You were born a card."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [466.16, 523.25, 587.33, 698.46, 783.99, 932.33, 1046.5]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const typeTicks = [...BIRTH].map((ch, i) => [ch, +(T.type0 + i * T.typeDt).toFixed(3)]).filter(([ch]) => ch !== ' ').map(([, t], i) => ['tick', t, 0.03 + (i % 3) * 0.008])
const squeaks = Array.from({ length: 6 }, (_, i) => ['pluck', +(T.rub[0] + 0.05 + i * 0.16).toFixed(3), i % 2 ? 1567.98 : 1864.66, 0.03, 0.18, i % 2 ? 0.2 : -0.2])
export const CUES = [
  // hook: headline, card in, birth details type, narrator pops up
  ...wordPops(T.h0, 4, 0.09, 0, 0.024), ['pop', T.h0 + 0.45, 932.33, 0.04, 0],
  ['whoosh', T.cardIn, 0.6, 0.04], ...typeTicks,
  ['pop', T.starIn + 0.05, 698.46, 0.045, -0.3], ['pop', T.starIn + 0.3, 932.33, 0.03, -0.3],
  ['pop', T.open, 587.33, 0.04, 0], ['pop', T.open + 0.06, 783.99, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // the polish gag → shake → flip (the drop)
  ['whoosh', T.slide[0], 0.35, 0.03], ...squeaks,
  ['riser', 1.2, T.mid, 0.08],
  ['tick', T.shake[0], 0.04], ['tick', T.shake[0] + 0.12, 0.04], ['tick', T.shake[0] + 0.24, 0.04],
  ['whoosh', T.flip[0], 0.5, 0.08], ['boom', T.mid, 0.3], ['bell', T.mid + 0.02, 587.33, 0.06, 2.4, 0], ['glitter', T.mid + 0.05, T.mid + 0.8],
  ...wordPops(T.h1, 2, 0.08, 1, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['bell', T.foil[0] + 0.2, 1174.66, 0.022, 1.4, 0.3],
  ['tick', T.stamp, 0.12], ['boom', T.stamp, 0.12], ['pop', T.stamp + 0.02, 1396.91, 0.03, 0.3],
  ['pluck', T.mid + 0.4, 1174.66, 0.04, 0.5, 0], ['pluck', T.mid + 0.52, 1567.98, 0.035, 0.5, 0],
  // Pisces sobs
  ['pop', T.pisces[0] + 0.1, 698.46, 0.03, 0.5], ['pop', T.pisces[0] + 0.5, 587.33, 0.028, 0.5], ['pop', T.pisces[0] + 0.62, 523.25, 0.028, 0.5], ['pop', T.pisces[0] + 1.1, 466.16, 0.025, 0.5],
  // the big three
  ['whoosh', T.lift[0], 0.45, 0.04],
  ...wordPops(T.h2, 2, 0.08, 2, 0.026), ['pop', T.h2Land, 932.33, 0.045, 0], ['pop', T.h2Land + 0.1, 1174.66, 0.045, 0],
  ...T.badges.map((b, i) => ['pluck', b + 0.3, [932.33, 1174.66, 1396.91][i], 0.045, 0.5, (i - 1) * 0.4]),
  ['glitter', T.badges[2] + 0.3, T.badges[2] + 0.7],
  ['pop', T.close, 783.99, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // last line
  ...wordPops(T.h3, 3, 0.08, 0, 0.028), ['pop', T.h3Land, 1174.66, 0.055, 0], ['pluck', T.h3Land, 932.33, 0.05, 0.7, 0], ['bell', T.h3Land + 0.05, 1864.66, 0.022, 1.0, 0],
  ['pop', T.wave, 1396.91, 0.03, 0.4], ['pop', T.wave + 0.35, 1567.98, 0.026, 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
