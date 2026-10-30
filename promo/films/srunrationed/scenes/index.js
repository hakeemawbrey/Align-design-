// srunrationed (20 s vertical, Star Talk Remix of "Paying to be seen?" / promo/films/unrationed) · story 0–15.6, then the
// shared end card. The gold narrator star has been paywalled: grey, padlocked, surrounded by silver upsell pills.
//   0.00–5.00  "Paying to be | *seen?*"  silver paywall pills flicker in round a grey, dimmed star; a pixel padlock clanks
//              onto its point (1.6). THE STARS: "they put a *paywall* on the sky?" → a slow eye-roll.
//   5.04–8.90  "Insert coin | to *twinkle.*"  an arcade coin slot pops in. Coin 1 → one tiny twinkle (+1 TWINKLE), coin 2 →
//              an even smaller one. THE STARS: "a coin per twinkle? babe. we're *stars.*" Coin 3: the slot spits it back.
//   8.93       THE BREAK (music drop): the star hops, turns gold, the padlock pops off, every pill shatters into stars.
//   9.00–12.80 "The stars, | *unrationed.*"  the gold founding card (card-founding.png) stamps down at 9.49, stars pour,
//              the star hops beside it, heart-eyed. THE STARS: "founding cards are *numbered.* like us."
//   12.82 cut → "Become a | *founding* member."  the star holds a tiny pixel gold card, winks. Out by 15.45.
// One canvas (sky + star + props), DOM pills + type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', SILVER = '#c9cede'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const GREY = '#9d98ad'                         // the rationed star

// ── the timeline (beat grid 0.6 + n·0.5556)
const T = {
  h0: 0.12, h0Out: [4.8, 4.98],
  pills: [0.35, 0.72, 1.08, 1.42], lock: 1.6, open: 2.6, roll: [4.25, 4.95],
  h1: 5.1, h1Land: 5.45, slot: 5.2, coins: [5.7, 6.3, 8.05], spit: 8.4, h1Out: [8.7, 8.88],
  brk: 8.93,
  card: [9.1, 9.49], h2: 9.62, h2Land: 10.0, close: 12.6, h2Out: [12.56, 12.76],
  cut: 12.82,
  h3: 12.9, h3Land: 13.38, wink: [14.0, 14.45], h3Out: [15.1, 15.4], out: [15.05, 15.45],
}
const COIN_FLY = 0.42          // a coin's flight into the slot; it lands at coins[i] + COIN_FLY
const SPEAK = 'THE STARS'
const LINES = [
  { t: 2.82, speaker: SPEAK, text: 'they put a *paywall* on the sky?', color: SILVER },
  { t: 6.45, speaker: SPEAK, text: "a coin per twinkle? babe. we're *stars.*" },
  { t: 9.66, speaker: SPEAK, text: 'founding cards are *numbered.* like us.' },
]
const CPS = 30
const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── pixel bits
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, scale = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(scale, scale)
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
const LOCK = [
  '...SSSS...',
  '..S....S..',
  '.S......S.',
  '.S......S.',
  'GGGGGGGGGG',
  'GhhhhhhhhG',
  'GhhhKKhhhG',
  'GhhhKKhhhG',
  'GhhhhKhhhG',
  'GhhhhhhhhG',
  'GddddddddG',
]
const LOCK_C = { S: '#c9cede', G: '#8d93a8', h: '#b9bfd0', d: '#6c7186', K: '#1b1236' }
const COIN = ['..YYYY..', '.YyyyyY.', 'YyyDyyyY', 'YyDDDyyY', 'YyyDDyyY', 'YyDDDyyY', '.YyyDyY.', '..YYYY..']
const COIN_C = { Y: '#c98a1c', y: '#ffd76a', D: '#9a5a10' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const MINI_CARD = [
  'GGGGGGGGG',
  'GnnnnnnnG',
  'GnnLLLnnG',
  'GnLLLLLnG',
  'GnLLLLLnG',
  'GnnnnnnnG',
  'GnGGGGGnG',
  'GnnnnnnnG',
  'GnnGGGnnG',
  'GnnnnnnnG',
  'GGGGGGGGG',
]
const MINI_C = { G: '#f2c75c', n: '#2a1a5c', L: '#fff1c8' }

// ── layout
const HERO = { x: 540, y: 1030, size: 400 }
const SIDE = { x: 880, y: 1290, size: 250 }
const FINAL = { x: 540, y: 1060, size: 420 }
const SLOT = { x: 920, y: 1040 }
const CARD = { x: 520, y: 950, w: 720 }
const PILLS = [
  { label: 'SEE WHO LIKED YOU', chip: '$', x: 360, y: 610 },
  { label: 'SUPER LIKE ×0 LEFT', chip: '$', x: 720, y: 750 },
  { label: 'BOOST', chip: '$', x: 170, y: 1060, up: true },
  { label: 'OUT OF LIKES · 11:59:59', chip: null, x: 600, y: 1320 },
]

function heroState(t) {
  if (t < T.lock) return { mood: 'sleepy', zzz: false, look: [0, 0] }
  if (t < T.lock + 0.5) return { mood: 'wide', look: [-1, 1], blink: false }                   // CLANK. what.
  if (t < LINES[0].t) return { mood: 'neutral', look: [-1, 1] }
  if (t >= T.roll[0] && t < T.roll[1]) return { mood: 'eyeroll', blink: false }
  if (t < T.slot + 0.3) return { mood: 'neutral', look: [0, 0] }
  for (const c of T.coins.slice(0, 2)) { const l = c + COIN_FLY; if (t >= l && t < l + 0.5) return { mood: 'happy', look: [0, -1] } }
  if (t < T.coins[2]) return { mood: 'neutral', look: [1, 0] }
  if (t < T.brk) return { mood: 'squint', look: [1, 0], blink: false }
  if (t < T.card[1] + 0.3) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.cut) return { mood: 'heart', look: [-1, -1] }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  if (t < T.h3Land + 0.1) return { mood: 'happy' }
  return { mood: 'sparkle', look: [0, 0] }
}
// grey → gold at the break (twinkles briefly warm the colour)
function mixHex(a, b, k) {
  const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16))
  return '#' + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(k))).toString(16).padStart(2, '0')).join('')
}
function twinkleK(t) {
  let k = 0
  T.coins.slice(0, 2).forEach((c, i) => { const d = t - (c + COIN_FLY); if (d > 0 && d < 0.6) k = Math.max(k, (i ? 0.45 : 0.85) * Math.sin(Math.PI * d / 0.6)) })
  return k
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 34px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const cardIm = await loadImg('card-founding.png')
  let CARD_C = null
  if (cardIm) { CARD_C = document.createElement('canvas'); CARD_C.width = 720; CARD_C.height = Math.round(720 * cardIm.height / cardIm.width); const cx = CARD_C.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(cardIm, 0, 0, CARD_C.width, CARD_C.height) }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── the silver paywall pills (DOM, cold UI like the original)
  const LOCK_SVG = s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="display:block"><rect x="4.5" y="10.5" width="15" height="10.5" rx="2.4" fill="currentColor"/><path d="M8 10.5V7.4a4 4 0 0 1 8 0v3.1" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>`
  const UP_SVG = s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="display:block"><path d="M12 4l7 8h-4.5v8h-5v-8H5z" fill="currentColor"/></svg>`
  const pills = PILLS.map((P, i) => {
    const p = el('div', { position: 'absolute', left: P.x + 'px', top: P.y + 'px', height: '86px', boxSizing: 'border-box', borderRadius: '44px', background: 'rgba(20,22,36,0.9)', border: '1.5px solid rgba(205,212,240,0.3)',
      boxShadow: '0 24px 50px rgba(2,2,10,0.55)', color: '#e8eaf2', fontFamily: INTER, fontWeight: 600, fontSize: '35px', letterSpacing: '0.04em', whiteSpace: 'nowrap',
      display: 'none', alignItems: 'center', gap: '14px', padding: P.chip ? '0 10px 0 28px' : '0 30px 0 28px', transform: 'translate(-50%,-50%)', willChange: 'transform, opacity' }, root)
    el('div', {}, p, P.up ? UP_SVG(30) : LOCK_SVG(30))
    el('span', {}, p, P.label)
    if (P.chip) el('span', { marginLeft: '4px', minWidth: '66px', height: '66px', borderRadius: '33px', padding: '0 16px', boxSizing: 'border-box', background: 'linear-gradient(180deg,#f3f4f8,#c3c7d4)', color: '#14162a', fontFamily: MONO, fontWeight: 700, fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }, p, P.chip)
    return { p, P, tIn: T.pills[i] }
  })

  // ── type
  const H0 = popText(root, 'Paying to be | *seen?*', { top: 200, size: 124, accentSize: 200, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0 + 0.42, wobble: true, accentColor: SILVER, lineHeight: 0.98 })
  const H1 = popText(root, 'Insert coin | to *twinkle.*', { top: 200, size: 116, accentSize: 186, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H2 = popText(root, 'The stars, | *unrationed.*', { top: 196, size: 112, accentSize: 176, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H3 = popText(root, 'Become a | *founding* member.', { top: 230, size: 116, accentSize: 176, at: T.h3, gap: 0.1, late: 2, lateAt: T.h3Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 1.02 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function burst(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, '#ffd98a'], dur = 0.7, sz = 26) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.4 + 0.8 * p), cy + Math.sin(a) * R * (0.4 + 0.8 * p), sz * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // stars pouring down after the break (unrationed)
  function pour(t, k = 1) {
    if (t < T.brk || k <= 0) return
    x.save()
    for (let i = 0; i < 26; i++) {
      const sp = 260 + (i * 97) % 220, born = T.brk + (i % 9) * 0.11
      if (t < born) continue
      const yy = -40 + ((t - born) * sp + (i * 173) % 900) % 2000
      const xx = 40 + ((i * 389) % 1000) + Math.sin(t * 1.3 + i) * 14
      x.globalAlpha = k * (0.55 + 0.45 * Math.sin(t * 5 + i))
      drawPixelStar(x, xx, yy, 14 + (i % 4) * 7, i % 3 === 0 ? 2 : 1, [GOLD, BONE, '#ffd98a', PINK][i % 4])
    }
    x.restore()
  }

  function drawSlot(t) {
    const pin = easeOutBack(prog(t, T.slot, T.slot + 0.32), 2.2)
    if (pin <= 0) return
    const fall = prog(t, T.brk, T.brk + 0.7)          // knocked over + off at the break
    const sx = SLOT.x + fall * 220, sy = SLOT.y + ease.inQuad(fall) * 600
    const shake = t > T.spit - 0.25 && t < T.spit + 0.05 ? Math.sin(t * 90) * 5 : 0
    x.save(); x.translate(Math.round(sx + shake), Math.round(sy)); x.rotate(fall * 1.4); x.scale(pin, pin); x.globalAlpha = 1 - fall
    // the cabinet
    const w = 170, h = 230
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#3a3f58'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#4c5270'; x.fillRect(-w / 2, -h / 2, w, 14); x.fillRect(-w / 2, -h / 2, 10, h)
    // the coin slit
    x.fillStyle = '#c9cede'; x.fillRect(-36, -52, 72, 64)
    x.fillStyle = INK; x.fillRect(-6, -44, 12, 48)
    // the label
    x.fillStyle = '#e8eaf2'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('INSERT $', 0, 46); x.fillText('TO TWINKLE', 0, 80)
    x.restore()
  }

  // coins: fly up from below you into the slot; the third is spat back out at the camera
  function drawCoins(t) {
    T.coins.forEach((c, i) => {
      const tt = t - c
      if (tt < 0) return
      const third = i === 2
      if (!third && tt > COIN_FLY) return
      let cx, cy, sc = 1, rot = tt * 14
      if (tt <= COIN_FLY) {
        const p = tt / COIN_FLY
        cx = lerp(560, SLOT.x, p); cy = lerp(2000, SLOT.y - 20, ease.outCubic(p)) - Math.sin(Math.PI * p) * 160
      } else {
        // the third coin sits in the slit, the cabinet shakes… then it's spat back out at you
        const s = t - T.spit
        if (s < 0) { cx = SLOT.x; cy = SLOT.y - 20; rot = 0 }
        else if (s < 0.5) { const p = s / 0.5; cx = lerp(SLOT.x, 380, p); cy = lerp(SLOT.y - 20, 1500, ease.inQuad(p)) - Math.sin(Math.PI * p) * 260; sc = 1 + 4 * ease.inCubic(p); rot = s * 20 }
        else return
      }
      drawBits(x, COIN, COIN_C, Math.round(cx), Math.round(cy), 8, { rot: Math.sin(rot) * 0.4, scale: sc })
    })
    // "+1 TWINKLE" chips
    T.coins.slice(0, 2).forEach((c, i) => {
      const d = t - (c + COIN_FLY)
      if (d < 0 || d > 1.1) return
      x.save(); x.globalAlpha = Math.min(1, d * 6) * (1 - ease.inQuad(prog(d, 0.7, 1.1)))
      x.font = `700 ${i ? 30 : 38}px ${MONO}`; x.textAlign = 'center'; x.fillStyle = i ? SILVER : GOLD
      x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 10
      x.fillText(i ? '+0.5 TWINKLE' : '+1 TWINKLE', HERO.x - 250 + (i ? 30 : 0), HERO.y - 160 - d * 70)
      x.restore()
    })
  }

  function drawLock(t, h) {
    if (t < T.lock - 0.3 || !h) return
    const k = prog(t, T.lock - 0.3, T.lock)
    const anchorX = h.hx - 150, anchorY = h.hy + 110
    if (t < T.brk) {
      // drops in from above and clanks onto the lower-left point, swinging
      const y0 = lerp(anchorY - 500, anchorY, ease.inQuad(k))
      const sw = t > T.lock ? Math.sin((t - T.lock) * 9) * 0.35 * Math.exp(-(t - T.lock) * 2.2) : 0
      drawBits(x, LOCK, LOCK_C, Math.round(anchorX), Math.round(y0), 9, { rot: -0.15 + sw })
    } else {
      // pops off at the break and spins away
      const d = t - T.brk
      if (d > 1.1) return
      drawBits(x, LOCK, LOCK_C, Math.round(anchorX - d * 420), Math.round(anchorY - d * 900 + d * d * 900), 9, { rot: -0.15 - d * 9, alpha: 1 - prog(d, 0.7, 1.1) })
    }
  }

  function drawHero(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return null
    const fin = t >= T.cut
    // beats 1–2: centre; the break: hop up; beat 3: slides to the side of the card; beat 4: centre, bigger
    let P = HERO
    let hx = HERO.x, hy = HERO.y, size = HERO.size
    if (!fin && t >= T.card[0]) {
      const m = ease.inOutCubic(prog(t, T.card[0], T.card[1] + 0.1))
      hx = lerp(HERO.x, SIDE.x, m); hy = lerp(HERO.y, SIDE.y, m); size = lerp(HERO.size, SIDE.size, m); P = SIDE
    }
    if (fin) { hx = FINAL.x; hy = FINAL.y; size = FINAL.size; P = FINAL }
    const st = heroState(t)
    const gold = clamp(prog(t, T.brk, T.brk + 0.25) + twinkleK(t))
    const color = mixHex(GREY, STAR.sky, gold)
    let sq = 0
    const lk = t - T.lock
    if (lk > 0 && lk < 0.6) sq += -0.14 * Math.exp(-lk * 7) * Math.cos(lk * 22)
    const spit = t - T.spit
    if (spit > 0 && spit < 0.5) sq += 0.12 * Math.exp(-spit * 8) * Math.cos(spit * 24)
    const bk = t - T.brk
    let lift = 0
    if (bk > 0 && bk < 0.55) { lift = Math.sin(Math.PI * bk / 0.55) * 120; sq += -0.12 * Math.sin(Math.PI * bk / 0.55) }
    if (bk >= 0.55 && bk < 1.0) sq += 0.18 * Math.exp(-(bk - 0.55) * 8) * Math.cos((bk - 0.55) * 22)
    const cl = t - T.card[1]
    if (cl > 0 && cl < 0.5) sq += 0.1 * Math.exp(-cl * 8) * Math.cos(cl * 24)
    if (fin) sq += 0.03 * Math.sin((t - T.cut) * 2.4)
    const pk = (fin ? easeOutBack(prog(t, T.cut - 0.05, T.cut + 0.3), 1.8) : easeOutBack(prog(t, 0.05, 0.4), 1.8)) * ok
    const glow = t < T.brk ? 0.35 + 1.0 * twinkleK(t) : 1.25
    const r = drawStarChar(x, hx, hy - lift, size, t, { color, glyph: null, ...st, pop: pk, squash: sq, seed: 3, glow, hops: t > T.brk ? HOPS : null, bob: t < T.brk ? 5 : undefined })
    return { r, hx, hy: hy - lift, size, pk, P }
  }

  function drawCard(t) {
    if (!CARD_C || t < T.card[0] || t >= T.cut) return
    const p = prog(t, T.card[0], T.card[1])
    const cw = CARD.w, ch = cw * CARD_C.height / CARD_C.width
    let sc = lerp(2.4, 1, ease.inCubic(p)), a = clamp(p * 4), rot = lerp(-0.12, 0, ease.inCubic(p))
    const l = t - T.card[1]
    if (l > 0) { sc = 1 + 0.05 * Math.exp(-l * 9) * Math.cos(l * 30); rot = 0 }
    const fl = Math.sin((t - T.card[1]) * 1.4) * 6 * clamp(l)
    // gold ring + glow under the card on the stamp
    if (l > 0 && l < 0.9) {
      x.save(); x.globalAlpha = 1 - l / 0.9; x.strokeStyle = GOLD; x.lineWidth = 14 * (1 - l / 0.9) + 2
      x.beginPath(); x.ellipse(CARD.x, CARD.y, 300 + l * 520, 380 + l * 560, 0, 0, Math.PI * 2); x.stroke(); x.restore()
    }
    if (l > 0) { const g = x.createRadialGradient(CARD.x, CARD.y, 40, CARD.x, CARD.y, 560); g.addColorStop(0, 'rgba(242,199,92,0.28)'); g.addColorStop(1, 'rgba(242,199,92,0)'); x.fillStyle = g; x.fillRect(0, CARD.y - 600, W, 1200) }
    x.save(); x.globalAlpha = a; x.translate(CARD.x, CARD.y + fl); x.rotate(rot); x.scale(sc, sc)
    x.shadowColor = 'rgba(2,2,10,0.6)'; x.shadowBlur = 50; x.shadowOffsetY = 24
    x.drawImage(CARD_C, -cw / 2, -ch / 2, cw, ch)
    x.restore()
    // a sheen across the card
    const sh = prog(t, T.card[1] + 0.5, T.card[1] + 1.2)
    if (sh > 0 && sh < 1) {
      x.save(); x.beginPath(); x.rect(CARD.x - cw / 2 + 20, CARD.y - ch / 2 + 20 + fl, cw - 40, ch - 40); x.clip()
      const sx = lerp(CARD.x - cw, CARD.x + cw, sh)
      const g = x.createLinearGradient(sx - 120, 0, sx + 120, 0); g.addColorStop(0, 'rgba(255,241,200,0)'); g.addColorStop(0.5, 'rgba(255,241,200,0.35)'); g.addColorStop(1, 'rgba(255,241,200,0)')
      x.fillStyle = g; x.fillRect(sx - 120, CARD.y - ch, 240, ch * 2); x.restore()
    }
    burst(t, CARD.x, CARD.y, T.card[1], 14, 380, 0.3)
  }

  function floatHearts(t, cx, cy, t0, t1, seed, cell = 8) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.24, life = 1.6
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f6e', W: '#ffd1de' }, Math.round(cx + side * 300 + Math.sin(p * 4 + i) * 16), Math.round(cy - 80 - p * 260), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  function updatePills(t) {
    const shatter = t >= T.brk
    const dimK = 1 - 0.45 * prog(t, T.h1, T.h1 + 0.4)
    pills.forEach(({ p, tIn }, i) => {
      if (t < tIn || shatter) { p.style.display = 'none'; return }
      p.style.display = 'flex'
      const k = easeOutBack(prog(t, tIn, tIn + 0.3), 2.2)
      // flicker on arrival + a slow creep toward you
      const fl = t - tIn < 0.25 ? ((Math.floor((t - tIn) * 40) % 2) ? 0.4 : 1) : 1
      const creep = 1 + 0.04 * prog(t, tIn, T.brk)
      const jit = t > T.spit - 0.3 ? Math.sin(t * 70 + i * 2) * 4 : 0
      p.style.opacity = String(clamp(k) * fl * dimK)
      p.style.transform = `translate(calc(-50% + ${jit.toFixed(1)}px),-50%) scale(${(lerp(0.6, 1, k) * creep).toFixed(4)})`
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      // camera shake on the stamp
      const sl = t - T.card[1]
      const shake = sl > 0 && sl < 0.35 ? Math.round(Math.sin(sl * 80) * 12 * (1 - sl / 0.35)) : 0
      const bright = ease.inOutCubic(prog(t, T.brk, T.brk + 0.6))
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) + shake, dim: lerp(0.3, SKY_H.dim, bright), stars: lerp(0.35, 1, bright) })
      if (t < T.out[1] + 0.02) {
        pour(t, popOut(t, T.out))
        drawSlot(t)
        drawCard(t)
        const h = drawHero(t)
        drawLock(t, h)
        drawCoins(t)
        if (h) {
          T.coins.slice(0, 2).forEach((c, i) => burst(t, h.hx, h.hy, c + COIN_FLY, i ? 5 : 8, i ? 150 : 210, i, [GOLD, '#ffd98a'], 0.5, i ? 16 : 22))
          burst(t, h.hx, h.hy, T.brk, 16, 320, 1.1)
          if (t > T.card[1] + 0.3 && t < T.cut) floatHearts(t, h.hx, h.hy - 30, T.card[1] + 0.3, T.close, 2, 7)
          if (t >= T.cut) {
            // the tiny pixel gold card, held up on its right point
            const ok = popOut(t, T.out)
            const k = easeOutBack(prog(t, T.h3Land, T.h3Land + 0.35), 2.4) * ok
            if (k > 0) drawBits(x, MINI_CARD, MINI_C, Math.round(h.hx + 230), Math.round(h.hy - 70 + Math.sin(t * 2.6) * 8), 10 * k, { rot: 0.18 + Math.sin(t * 1.8) * 0.05 })
            burst(t, h.hx + 230, h.hy - 70, T.h3Land, 10, 160, 0.4)
            burst(t, h.hx, h.hy, T.wink[0], 8, 260, 2.2, [GOLD, PINK], 0.6, 20)
          }
        }
        // the shatter: every pill becomes a little burst of stars
        PILLS.forEach((P, i) => burst(t, P.x, P.y, T.brk + i * 0.04, 10, 170, i, [SILVER, GOLD, BONE, '#ffd98a'], 0.8, 24))
      }
      updatePills(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.04 (paywall → coin slot) and 12.82 (the founding card → "Become a founding member.").
// cardfx keeps one for a 20 s film (the 12.82 flip). End card flips at 15.6.
const CUTS = [5.04, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are shifted into the film's key by the engine; chip is literal)
const FX = { bus: 'sfx', rev: 0.15, dly: 0 }
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const coinSfx = (t, g = 1) => [['chip', +t.toFixed(3), 987.77, 0.07, { ...FX, wave: 'square', duty: 0.5, gain: 0.03 * g, decay: 0.05, sustain: 0.7 }], ['chip', +(t + 0.07).toFixed(3), 1318.51, 0.35, { ...FX, wave: 'square', duty: 0.5, gain: 0.03 * g, decay: 0.3, sustain: 0.5 }]]
export const CUES = [
  // paying to be seen? cold pills tick in, the padlock clanks on
  ...wordPops(T.h0, 3, 0.09, 0, 0.024), ['pop', T.h0 + 0.42, 1174.66, 0.045, 0],
  ...T.pills.flatMap((p, i) => [['tick', p, 0.04], ['pop', +(p + 0.02).toFixed(3), 293.66 - i * 20, 0.03, i % 2 ? 0.4 : -0.4]]),
  ['whoosh', T.lock - 0.3, 0.3, 0.025], ['boom', T.lock, 0.1], ['tick', T.lock, 0.06], ['chip', T.lock + 0.02, 220, 0.12, { ...FX, wave: 'square', duty: 0.25, slide: -8, gain: 0.03, decay: 0.1, sustain: 0.3 }],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['whoosh', T.roll[0], 0.4, 0.018],
  // insert coin
  ...wordPops(T.h1, 3, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.slot, 440, 0.04, 0], ['tick', T.slot + 0.1, 0.04],
  ...T.coins.flatMap(c => [['whoosh', c, 0.4, 0.015], ...coinSfx(c + COIN_FLY)]),
  ['bell', T.coins[0] + COIN_FLY + 0.12, 1760, 0.024, 1.0, 0], ['bell', T.coins[1] + COIN_FLY + 0.12, 1318.51, 0.014, 0.6, 0],
  ['chip', +(T.spit - 0.25).toFixed(3), 110, 0.25, { ...FX, wave: 'square', duty: 0.5, vib: 0.08, gain: 0.025, decay: 0.2, sustain: 0.8 }],
  ['chip', T.spit, 1318.51, 0.4, { ...FX, wave: 'square', duty: 0.25, slide: -24, gain: 0.03, decay: 0.3, sustain: 0.5 }], ['whoosh', T.spit, 0.4, 0.03],
  // the break
  ['boom', T.brk, 0.12], ['glitter', T.brk, T.brk + 0.7], ['whoosh', T.brk - 0.2, 0.3, 0.03],
  ...PILLS.map((_, i) => ['pop', +(T.brk + i * 0.04).toFixed(3), NOTE[(i * 2 + 3) % NOTE.length], 0.035, i % 2 ? 0.35 : -0.35]),
  ['chip', T.brk + 0.05, 523.25, 0.5, { ...FX, wave: 'square', duty: 0.25, arp: [0, 4, 7, 12], gain: 0.025, decay: 0.4, sustain: 0.6 }],
  // the founding card stamps down
  ['whoosh', T.card[0], 0.4, 0.035], ['boom', T.card[1], 0.15], ['tick', T.card[1], 0.07], ['bell', T.card[1] + 0.03, 1760, 0.03, 1.4, 0], ['glitter', T.card[1] + 0.5, T.card[1] + 1.2],
  ...wordPops(T.h2, 2, 0.09, 2, 0.024), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.04, 0.6, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // become a founding member
  ...wordPops(T.h3, 2, 0.1, 1, 0.026), ['pop', T.h3Land, 1174.66, 0.05, 0], ['pop', T.h3Land + 0.14, 1318.51, 0.045, 0], ['pluck', T.h3Land, 1174.66, 0.045, 0.7, 0], ['glitter', T.h3Land, T.h3Land + 0.45],
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
