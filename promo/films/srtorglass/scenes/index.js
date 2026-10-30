// srtorglass (30 s vertical, Star Talk Remix of torglass "A city of glass towers") · story 0–25.6, then the shared end
// card ("come" + the logo + JOIN THE WAITLIST, the original's CTA).
//   0.00–3.90  HOOK  "A city of | *glass towers…*"  A generic condo skyline rises by the lake (one needle tower, unnamed).
//              THE STARS pops onto the needle's tip like a tree-topper and peers down; on the drop (2.82) every window
//              lights up, a wave from left to right.
//   3.60–10.6  Push into one glass tower: "…everyone in | their own *box.*"  Nine windows light one by one, each with a
//              sign star alone on its phone (♍ squinting, ♊ on two phones, ♈ swiping like mad, ♌ heart-eyed at its own
//              selfie, ♓ Pisces sobbing in the middle window). THE STARS drops onto the roof. THE STARS: "friday.
//              everyone's *home.*"  ♋ CANCER STAR (top-left window, in a blanket): "it's not a box. it's a *shell.*"
//              THE STARS' slow eye-roll.
//  10.70 cut → "Tonight's deck | *window to window.*"  Card backs sail in and land in windows one by one (Pisces gets
//              one and sobs harder); the last two land with ♋ Cancer (top-left) and ♉ Taurus (bottom-right).
//              THE STARS: "a new deck. *every* night."
//  13.60      "Two windows. | *One line.*"  Every other window dims; Cancer's and Taurus's glow gold and a gold line draws
//              diagonally across the facade between them. THE STARS: "same building. *never* met."
//  16.50      "Card *first.* | Face last."  The facade dims and a veiled mystery card rises; Cancer creeps in with pixel
//              binoculars, trying to see past the veil. THE STARS: "put the binoculars *down.*" Cancer blushes.
//  20.00 cut → "Come out of | your *box.*"  The skyline again, two gold windows in the middle tower; Cancer and Taurus float
//              out of them and meet on the lakeshore (22.27) in a burst of hearts. CANCER: "...ok. *one* drink."
//              THE STARS on the needle goes heart-eyed.
// One canvas (sky + city + stars), DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import {
  BONE, GOLD, PINK, CYAN, WARM, NIGHT, VIOLET, INK, TAU, BEAT, r3,
  rgba, mixHex, pop01, outK, popOut, glowStroke, popText, makeBurst, drawBurst, drawTears, floatHearts,
} from '../../srtorpatio/scenes/props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GLASS = '#8fd8f6', COOL = '#a9c8ff', LAV = '#c9a6ff'
const CANCER = signStar('cancer'), TAURUS = signStar('taurus')

// ── the timeline
const T = {
  black: [0, 0.3], h0: 0.12, h0Late: BEAT(2), rise: [0.25, 2.2], topper: 1.9, light: BEAT(4), h0Out: [3.7, 3.88],
  push: [3.6, 4.3], facIn: [3.75, 4.15],
  h1: 4.0, h1Late: BEAT(7), lit: 4.25, roof: 4.9, boxA: 5.1, l1: 5.25, l2: 7.8, roll: [9.1, 10.1], boxAClose: 10.5, h1Out: [10.42, 10.6],
  cut1: 10.7,
  h2: 10.75, h2Late: 11.2, cards: [11.45, 11.75, 12.05, 12.35, 12.65], boxB: 11.15, l3: 11.3, h2Out: [13.35, 13.52],
  h3: 13.6, h3Late: 13.9, dim: [13.5, 13.9], line: [14.0, 14.7], l4: 13.85, blush: 14.9, boxBClose: 16.4, h3Out: [16.25, 16.42],
  h4: 16.5, h4Late: 16.75, eDim: [16.35, 16.7], card: [16.55, 17.05], creep: [16.9, 17.3], binoc: [17.2, 18.75], boxC: 17.2, l5: 17.35,
  eBlush: 18.75, boxCClose: 19.85, eOut: [19.55, 19.85], h4Out: [19.65, 19.83],
  cut2: 20.0,
  h5: 20.05, h5Late: 20.85, float: [20.5, BEAT(39)], meet: BEAT(39), boxD: 22.7, l6: 22.85, boxDClose: 25.2, out: [24.95, 25.42],
}
const ST = 'THE STARS', CA = '♋ CANCER STAR', CAC = '#9fe3ff'
const LINES_A = [
  { t: T.l1, speaker: ST, text: "friday. everyone's *home.*" },
  { t: T.l2, speaker: CA, text: "it's not a box. it's a *shell.*", color: CAC },
]
const LINES_B = [
  { t: T.l3, speaker: ST, text: 'a new deck. *every* night.' },
  { t: T.l4, speaker: ST, text: 'same building. *never* met.' },
]
const LINES_C = [{ t: T.l5, speaker: ST, text: 'put the binoculars *down.*' }]
const LINES_D = [{ t: T.l6, speaker: CA, text: '...ok. *one* drink.', color: CAC }]
const CPS = 30
const ALL = [LINES_A, LINES_B, LINES_C, LINES_D]
const HOPS_ST = [...ALL.flatMap(L => talkHops(L, ST, { cps: CPS })), T.topper + 0.35, T.light]
const HOPS_CA = [...ALL.flatMap(L => talkHops(L, CA, { cps: CPS })), T.cards[3] + 0.1, T.meet - 0.05]

// ── the skyline (hook + finale)
const SB = 1480                       // lake top
const NEEDLE = { x: 860, tip: 640 }
const MID = { x: 440, w: 200, h: 700 }  // the tower we push into
const midWin = (c, r) => ({ x: MID.x + 18 + c * 66, y: SB - MID.h + 30 + r * 70, w: 44, h: 48 })
const HERO_SKY = { cancer: [0, 1], taurus: [2, 7] }
const TOWERS = (() => {
  const r = rng(41), out = []
  const spec = [[-30, 130, 520], [90, 110, 640], [196, 120, 470], [312, 112, 580], [652, 110, 560], [752, 70, 430], [930, 130, 600], [1030, 90, 380]]
  for (const [tx, w, h] of spec) {
    const win = []
    for (let yy = 26; yy < h - 16; yy += 34) for (let xx = 12; xx < w - 14; xx += 24) if (r() < 0.45) win.push([xx, yy, r()])
    out.push({ x: tx, w, h, win })
  }
  return out
})()
const GLINTS = (() => { const r = rng(5); return Array.from({ length: 20 }, (_, i) => ({ y: SB + 14 + r() * 120, x0: r() * 1200 - 60, len: 24 + r() * 60, sp: 20 + r() * 30, f: 3 + r() * 4, i })) })()

// ── the facade (one tower, 3 × 3 windows)
const WIN = (c, r) => ({ x: 130 + c * 295, y: 610 + r * 290, w: 230, h: 250 })
const ROOF = 560
const ROOMS = [
  // [col, row, sign, mood, look, phones, lit order, warm]
  [0, 0, 'cancer', 'neutral', [1, 1], 1, 0, 1], [1, 0, 'virgo', 'squint', [1, 1], 1, 3, 0], [2, 0, 'gemini', 'wide', [0, 1], 2, 5, 1],
  [0, 1, 'aries', 'squint', [1, 1], 1, 2, 0], [1, 1, 'pisces', 'squint', [0, 0], 1, 1, 1], [2, 1, 'libra', 'sleepy', [0, 0], 1, 7, 0],
  [0, 2, 'leo', 'heart', [1, 0], 1, 6, 1], [1, 2, 'aquarius', 'sleepy', [0, 0], 1, 4, 0], [2, 2, 'taurus', 'neutral', [-1, 1], 1, 8, 1],
]
// card backs land in: pisces, virgo, aries, cancer, taurus (index into ROOMS)
const DROPS = [4, 1, 3, 0, 8]
const isHero = i => i === 0 || i === 8

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 104px Inter", "italic 500 150px 'EB Garamond'", "italic 500 200px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = ASSETS + src })
  const bitmap = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, profIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-3.png')])
  const backBmp = bitmap(backIm, 220), profBmp = bitmap(profIm, 640)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'A city of | *glass* *towers…*', { top: 160, size: 112, accentSize: 156, accentColor: GLASS, at: T.h0, gap: 0.09, late: 2, lateAt: T.h0Late, lateGap: 0.14, wobble: true })
  const H1 = popText(root, '…everyone in | their own *box.*', { top: 160, size: 104, accentSize: 160, accentColor: GOLD, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Late, wobble: true })
  const H2 = popText(root, 'Tonight’s deck, | *window* *to* *window.*', { top: 160, size: 104, accentSize: 104, accentColor: LAV, at: T.h2, gap: 0.08, late: 3, lateAt: T.h2Late, lateGap: 0.1, wobble: true })
  const H3 = popText(root, 'Two windows. | *One* *line.*', { top: 160, size: 108, accentSize: 160, accentColor: GOLD, at: T.h3, gap: 0.09, late: 2, lateAt: T.h3Late, lateGap: 0.12, wobble: true })
  const H4 = popText(root, 'Card *first.* | Face last.', { top: 160, size: 116, accentSize: 160, accentColor: PINK, at: T.h4, gap: 0.1, late: 0, wobble: true })
  const H5 = popText(root, 'Come out of | your *box.*', { top: 160, size: 116, accentSize: 200, accentColor: GOLD, at: T.h5, gap: 0.09, late: 1, lateAt: T.h5Late, wobble: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.out]]
  const BOX = { y: 1600, width: 960, height: 270, cps: CPS }
  const boxA = dialogueBox(root, { ...BOX, lines: LINES_A, open: T.boxA, close: T.boxAClose })
  const boxB = dialogueBox(root, { ...BOX, lines: LINES_B, open: T.boxB, close: T.boxBClose })
  const boxC = dialogueBox(root, { ...BOX, lines: LINES_C, open: T.boxC, close: T.boxCClose })
  const boxD = dialogueBox(root, { ...BOX, lines: LINES_D, open: T.boxD, close: T.boxDClose })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B_TOP = makeBurst(3, 10, 150), B_ROOF = makeBurst(4, 8, 140), B_MEET = makeBurst(7, 18, 260), B_CARD = makeBurst(8, 14, 380)
  const B_LAND = DROPS.map((_, i) => makeBurst(20 + i, 8, 110))

  // ═════════════ the skyline
  function needle(t) {
    const cx = NEEDLE.x, base = SB, edge = VIOLET
    x.beginPath(); x.moveTo(cx - 30, base); x.lineTo(cx - 9, base - 480); x.lineTo(cx + 9, base - 480); x.lineTo(cx + 30, base); x.closePath()
    x.fillStyle = NIGHT; x.fill(); glowStroke(x, edge, 4, 12); x.stroke(); x.shadowBlur = 0
    x.beginPath(); x.ellipse(cx, base - 490, 54, 22, 0, 0, TAU); x.fillStyle = NIGHT; x.fill(); glowStroke(x, edge, 4, 12); x.stroke(); x.shadowBlur = 0
    x.fillStyle = rgba(GOLD, 0.8); for (let i = -3; i <= 3; i++) x.fillRect(cx + i * 13 - 4, base - 494, 8, 8)
    x.beginPath(); x.rect(cx - 7, base - 600, 14, 100); x.fillStyle = NIGHT; x.fill(); glowStroke(x, edge, 3, 10); x.stroke(); x.shadowBlur = 0
    x.beginPath(); x.moveTo(cx, base - 600); x.lineTo(cx, NEEDLE.tip + 60); x.strokeStyle = edge; x.lineWidth = 4; x.stroke()
  }
  function skyWinLit(t, wx) { return t < T.cut2 ? prog(t, T.light + wx / 1080 * 0.5, T.light + wx / 1080 * 0.5 + 0.08) : 1 }
  function skyline(t, rise, finale) {
    x.save(); x.translate(0, (1 - rise) * 900)
    needle(t)
    const all = [...TOWERS, { x: MID.x, w: MID.w, h: MID.h, mid: true }]
    for (const tw of all) {
      const top = SB - tw.h
      const g = x.createLinearGradient(tw.x, top, tw.x + tw.w, SB); g.addColorStop(0, '#22346a'); g.addColorStop(0.5, NIGHT); g.addColorStop(1, '#2a2050')
      x.fillStyle = g; x.fillRect(tw.x, top, tw.w, tw.h)
      // a diagonal glass sheen
      x.save(); x.beginPath(); x.rect(tw.x, top, tw.w, tw.h); x.clip()
      x.fillStyle = rgba(GLASS, 0.08); x.beginPath(); x.moveTo(tw.x, top + 120); x.lineTo(tw.x + tw.w, top); x.lineTo(tw.x + tw.w, top + 60); x.lineTo(tw.x, top + 180); x.fill(); x.restore()
      glowStroke(x, rgba(tw.mid ? GLASS : COOL, tw.mid ? 0.95 : 0.7), tw.mid ? 5 : 3, 12); x.strokeRect(tw.x, top, tw.w, tw.h); x.shadowBlur = 0
      if (tw.mid) {
        for (let c = 0; c < 3; c++) for (let r = 0; r < 9; r++) {
          const w = midWin(c, r), hero = (c === 0 && r === 1) || (c === 2 && r === 7)
          const on = skyWinLit(t, w.x)
          if (hero && finale) {
            const gk = 0.75 + 0.25 * Math.sin(t * 5 + c)
            x.save(); x.shadowColor = GOLD; x.shadowBlur = 30; x.fillStyle = rgba('#ffe7a0', gk); x.fillRect(w.x, w.y, w.w, w.h); x.restore()
          } else {
            x.fillStyle = rgba((c + r) % 3 ? GOLD : GLASS, on * (0.25 + 0.35 * ((c * 7 + r * 3) % 5) / 4) * (finale ? 0.6 : 1)); x.fillRect(w.x, w.y, w.w, w.h)
          }
          x.strokeStyle = rgba(GLASS, 0.35); x.lineWidth = 2; x.strokeRect(w.x, w.y, w.w, w.h)
        }
      } else {
        for (const [wx, wy, q] of tw.win) {
          const on = skyWinLit(t, tw.x + wx), tw2 = 0.55 + 0.45 * Math.sin(t * (0.6 + q) + q * 40)
          x.fillStyle = rgba(q > 0.7 ? GLASS : GOLD, on * (0.25 + 0.5 * tw2) * (finale ? 0.7 : 1)); x.fillRect(tw.x + wx, top + wy, 11, 16)
        }
      }
    }
    // the lake
    const lg = x.createLinearGradient(0, SB, 0, 1920); lg.addColorStop(0, '#1d2f70'); lg.addColorStop(1, '#0a0c2c')
    x.fillStyle = lg; x.fillRect(0, SB, 1080, 1920 - SB)
    x.save(); x.globalCompositeOperation = 'lighter'
    for (const g of GLINTS) {
      const tw = 0.5 + 0.5 * Math.sin(t * g.f + g.i * 1.7), xx = ((g.x0 + t * g.sp) % 1200) - 60
      x.strokeStyle = rgba(g.i % 3 ? GOLD : GLASS, 0.2 + 0.5 * tw); x.lineWidth = 4; x.lineCap = 'round'
      x.beginPath(); x.moveTo(xx, g.y); x.lineTo(xx + g.len * (0.6 + 0.4 * tw), g.y); x.stroke()
    }
    x.restore()
    glowStroke(x, rgba(GOLD, 0.8), 4, 14); x.beginPath(); x.moveTo(0, SB); x.lineTo(1080, SB); x.stroke(); x.shadowBlur = 0
    x.restore()
  }
  // THE STARS as the needle's tree-topper
  function topper(t, finale) {
    const k = finale ? 1 : pop01(t, T.topper, 0.4, 2.4)
    if (k <= 0) return
    const rise = finale ? 1 : ease.outCubic(prog(t, ...T.rise))
    let mood = 'wide', look = [-1, 1]
    if (!finale) { if (t > T.light + 0.3) { mood = 'happy'; look = [-1, 1] } }
    else mood = t > T.meet + 0.15 ? 'heart' : 'neutral', look = t > T.meet + 0.15 ? [0, 0] : [-1, 1]
    drawStarChar(x, NEEDLE.x, NEEDLE.tip + (1 - rise) * 900, 150, t, { color: STAR.sky, mood, look, pop: k, hops: HOPS_ST, seed: 2, glow: 1.2, alpha: x.globalAlpha })
    if (!finale) drawBurst(x, B_TOP, NEEDLE.x, NEEDLE.tip, t, T.topper, [GOLD, BONE])
  }

  // ═════════════ the facade
  function phone(px, py, s, a = 1) {
    x.save(); x.globalAlpha *= a; x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(px, py, 2, px, py, s * 0.8); g.addColorStop(0, rgba(CYAN, 0.55)); g.addColorStop(1, rgba(CYAN, 0))
    x.fillStyle = g; x.beginPath(); x.arc(px, py, s * 0.8, 0, TAU); x.fill(); x.restore()
    x.save(); x.globalAlpha *= a; x.fillStyle = '#dff6ff'; x.beginPath(); x.roundRect(px - s * 0.09, py - s * 0.15, s * 0.18, s * 0.3, 4); x.fill(); x.restore()
  }
  const winLit = (t, i) => prog(t, T.lit + ROOMS[i][6] * 0.11, T.lit + ROOMS[i][6] * 0.11 + 0.14)
  const occK = (t, i) => pop01(t, T.lit + ROOMS[i][6] * 0.11 + 0.05, 0.34, 2.2)
  const cardLand = i => { const k = DROPS.indexOf(i); return k < 0 ? null : T.cards[k] }
  const dimOf = t => ease.inOutQuad(prog(t, ...T.dim))
  function roomMood(t, i) {
    const [, , sign, mood, look] = ROOMS[i]
    const land = cardLand(i)
    if (sign === 'cancer') {
      if (t < T.l2) return { mood: 'neutral', look }
      if (t < T.cards[3]) return { mood: 'happy', look: [0, 0] }
      if (t < T.cards[3] + 0.5) return { mood: 'wide', look: [0, -1] }
      if (t > T.line[0]) return { mood: t > T.blush ? 'heart' : 'wide', look: [1, 1] }
      return { mood: 'sparkle', look: [0, 1] }
    }
    if (sign === 'taurus') {
      if (t > T.line[0]) return { mood: t > T.blush ? 'heart' : 'wide', look: [-1, -1] }
      if (land && t > land) return { mood: t < land + 0.5 ? 'wide' : 'sparkle', look: [0, 1] }
      return { mood, look }
    }
    if (sign === 'pisces' && land && t > land) return { mood: 'squint', look: [0, 0] }
    if (land && t > land) return { mood: t < land + 0.5 ? 'wide' : 'happy', look: [0, 1] }
    return { mood, look }
  }
  function facade(t) {
    // the tower
    const g = x.createLinearGradient(90, ROOF, 990, 1920); g.addColorStop(0, '#1f2f66'); g.addColorStop(0.6, NIGHT); g.addColorStop(1, '#120c2c')
    x.fillStyle = g; x.fillRect(90, ROOF, 900, 1920 - ROOF)
    glowStroke(x, GLASS, 6, 18); x.strokeRect(90, ROOF, 900, 1500); x.shadowBlur = 0
    x.fillStyle = rgba(GLASS, 0.25); x.fillRect(90, ROOF - 18, 900, 18); glowStroke(x, GLASS, 3, 8); x.strokeRect(90, ROOF - 18, 900, 18); x.shadowBlur = 0
    // floor slabs
    x.strokeStyle = rgba(GLASS, 0.3); x.lineWidth = 3
    for (const yy of [880, 1170, 1460]) { x.beginPath(); x.moveTo(90, yy); x.lineTo(990, yy); x.stroke() }
    const dk = dimOf(t), undim = 1 - ease.inOutQuad(prog(t, T.cut2 - 0.4, T.cut2))
    ROOMS.forEach((R, i) => {
      const [c, r, sign, , , phones, , warm] = R
      const w = WIN(c, r), lit = winLit(t, i), hero = isHero(i)
      const goldK = hero ? dk : 0
      // interior
      x.save(); x.beginPath(); x.rect(w.x, w.y, w.w, w.h); x.clip()
      const ig = x.createLinearGradient(0, w.y, 0, w.y + w.h)
      const base = warm ? '#ffcf7a' : '#a9c8ff'
      ig.addColorStop(0, mixHex('#141a3c', mixHex(base, '#ffe7a0', goldK), lit * (0.55 + 0.25 * goldK))); ig.addColorStop(1, mixHex('#0c0f28', mixHex(base, GOLD, goldK), lit * (0.32 + 0.3 * goldK)))
      x.fillStyle = ig; x.fillRect(w.x, w.y, w.w, w.h)
      // curtains + floor
      x.fillStyle = rgba(INK, 0.45); x.fillRect(w.x, w.y, 26, w.h); x.fillRect(w.x + w.w - 26, w.y, 26, w.h)
      x.fillStyle = rgba(INK, 0.5); x.fillRect(w.x, w.y + w.h - 34, w.w, 34)
      // occupant
      const k = occK(t, i)
      if (k > 0) {
        const m = roomMood(t, i), sx = w.x + w.w / 2, sy = w.y + w.h * 0.55
        const S = signStar(sign), size = hero ? 150 : 130
        const extra = sign === 'aries' ? { hops: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => 4.8 + n * 0.75) } : sign === 'cancer' ? { hops: HOPS_CA } : {}
        const land = cardLand(i)
        const hops = land ? [...(extra.hops || []), land + 0.05] : extra.hops
        const rr = drawStarChar(x, sx, sy, size, t, { color: S.color, glyph: hero ? S.glyph : null, ...m, pop: k, seed: 10 + i, glow: 0.8, hops, alpha: x.globalAlpha })
        if (sign === 'cancer' && t < T.cut2) {
          // the blanket "shell"
          x.save(); x.globalAlpha *= clamp(k)
          x.fillStyle = '#6b5bd6'; x.beginPath(); x.moveTo(rr.x - size * 0.55, rr.y + size * 0.5); x.quadraticCurveTo(rr.x - size * 0.6, rr.y - size * 0.15, rr.x - size * 0.2, rr.y - size * 0.05)
          x.lineTo(rr.x - size * 0.25, rr.y + size * 0.5); x.closePath(); x.fill()
          x.beginPath(); x.moveTo(rr.x + size * 0.55, rr.y + size * 0.5); x.quadraticCurveTo(rr.x + size * 0.6, rr.y - size * 0.15, rr.x + size * 0.2, rr.y - size * 0.05)
          x.lineTo(rr.x + size * 0.25, rr.y + size * 0.5); x.closePath(); x.fill()
          x.fillStyle = rgba(BONE, 0.5); for (let j = 0; j < 4; j++) { x.fillRect(rr.x - size * 0.5, rr.y + size * (0.05 + j * 0.11), 10, 10); x.fillRect(rr.x + size * 0.42, rr.y + size * (0.05 + j * 0.11), 10, 10) }
          x.restore()
        }
        // phones (put away once a card lands)
        const pa = land ? 1 - prog(t, land - 0.1, land + 0.1) : 1
        if (pa > 0 && sign !== 'libra' && sign !== 'aquarius') {
          phone(rr.x + size * 0.36, rr.y + size * 0.22, size, pa * clamp(k))
          if (phones > 1) phone(rr.x - size * 0.36, rr.y + size * 0.22, size, pa * clamp(k))
        } else if (pa > 0) phone(rr.x + size * 0.36, rr.y + size * 0.3, size * 0.8, pa * clamp(k) * 0.6)
        // a held card back after it lands
        if (land && t > land && backBmp) {
          const hk = easeOutBack(prog(t, land, land + 0.3), 2)
          x.save(); x.translate(rr.x - size * 0.42, rr.y + size * 0.12); x.rotate(-0.25); x.scale(hk, hk)
          x.drawImage(backBmp, -30, -46, 60, 92); x.restore()
        }
        if (sign === 'pisces') { drawTears(x, rr, t, T.lit + 0.3, T.h3, 4); const land2 = cardLand(i); if (land2) drawTears(x, rr, t, land2 + 0.2, T.h3, 4) }
      }
      // dim the others for "two windows"
      const od = hero ? 0 : dk * 0.75 * undim
      if (od > 0) { x.fillStyle = `rgba(6,4,18,${od.toFixed(3)})`; x.fillRect(w.x, w.y, w.w, w.h) }
      // glass reflection
      x.fillStyle = 'rgba(255,255,255,0.07)'; x.beginPath(); x.moveTo(w.x, w.y + 90); x.lineTo(w.x + 90, w.y); x.lineTo(w.x + 140, w.y); x.lineTo(w.x, w.y + 140); x.fill()
      x.restore()
      // frame
      if (goldK > 0) { glowStroke(x, rgba(GOLD, goldK), 8, 30 * goldK); x.strokeRect(w.x, w.y, w.w, w.h); x.shadowBlur = 0 }
      glowStroke(x, rgba(GLASS, 0.85), 5, 10); x.strokeRect(w.x, w.y, w.w, w.h)
      x.lineWidth = 3; x.beginPath(); x.moveTo(w.x + w.w / 2, w.y); x.lineTo(w.x + w.w / 2, w.y + 40); x.stroke(); x.shadowBlur = 0
      if (cardLand(i) != null) drawBurst(x, B_LAND[DROPS.indexOf(i)], w.x + w.w / 2, w.y + w.h / 2, t, cardLand(i), [GOLD, LAV, BONE], 0.6)
    })
    // card backs sailing in to windows
    DROPS.forEach((ri, k) => {
      const tl = T.cards[k], t0 = tl - 0.75
      if (t < t0 || t > tl || !backBmp) return
      const p = ease.inOutCubic(prog(t, t0, tl)), w = WIN(ROOMS[ri][0], ROOMS[ri][1])
      const sx = k % 2 ? 1180 : -100, sy = 460 + k * 60
      const ex = w.x + w.w / 2 - 50, ey = w.y + w.h / 2
      const cx = lerp(sx, ex, p), cy = lerp(sy, ey, p) - Math.sin(Math.PI * p) * 160
      const sc = lerp(1.4, 0.6, p)
      x.save(); x.translate(cx, cy); x.rotate((1 - p) * (k % 2 ? -4 : 4)); x.scale(sc, sc); x.shadowColor = LAV; x.shadowBlur = 24
      x.drawImage(backBmp, -55, -84, 110, 168); x.restore()
    })
    // the gold line between the two hero windows
    const lp = ease.inOutCubic(prog(t, ...T.line)) * undim
    if (lp > 0) {
      const a = WIN(0, 0), b = WIN(2, 2)
      const ax = a.x + a.w / 2 + 70, ay = a.y + a.h / 2 + 40, bx = b.x + b.w / 2 - 70, by = b.y + b.h / 2 - 40
      const qx = 760, qy = 760
      x.save(); glowStroke(x, GOLD, 9, 26); x.setLineDash([]); x.beginPath()
      const N = 40
      for (let j = 0; j <= N * lp; j++) {
        const u = j / N, px = (1 - u) * (1 - u) * ax + 2 * u * (1 - u) * qx + u * u * bx, py = (1 - u) * (1 - u) * ay + 2 * u * (1 - u) * qy + u * u * by
        j ? x.lineTo(px, py) : x.moveTo(px, py)
      }
      x.stroke(); x.restore()
      const u = lp, hx = (1 - u) * (1 - u) * ax + 2 * u * (1 - u) * qx + u * u * bx, hy = (1 - u) * (1 - u) * ay + 2 * u * (1 - u) * qy + u * u * by
      x.save(); x.globalCompositeOperation = 'lighter'; const gg = x.createRadialGradient(hx, hy, 2, hx, hy, 60); gg.addColorStop(0, rgba('#fff3c4', 1)); gg.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gg; x.beginPath(); x.arc(hx, hy, 60, 0, TAU); x.fill(); x.restore()
    }
  }
  // THE STARS on the roof (B–D), then down to the bottom-right for the card scene
  function roofStar(t) {
    if (t < T.roof - 0.4 || t > T.cut2) return
    const drop = ease.outCubic(prog(t, T.roof - 0.4, T.roof))
    const eMove = ease.inOutCubic(prog(t, ...T.creep))
    const px = lerp(540, 880, eMove), py = lerp(lerp(-200, ROOF - 70, drop), 1400, eMove), size = lerp(150, 210, eMove)
    let mood = 'happy', look = [0, 1]
    if (t > T.roll[0] && t < T.roll[1]) mood = 'eyeroll'
    else if (t > T.l2 - 0.1 && t < T.roll[0]) { mood = 'squint'; look = [-1, 1] }
    else if (t > T.l3 - 0.1 && t < T.h3) { mood = 'happy'; look = [0, 1] }
    else if (t > T.h3 && t < T.h4) { mood = 'sparkle'; look = [0, 1] }
    else if (t > T.h4) { mood = t > T.l5 && t < T.eBlush ? 'squint' : 'happy'; look = [-1, 0] }
    drawStarChar(x, px, py, size, t, { color: STAR.sky, mood, look, hops: [...HOPS_ST, T.roof], seed: 3, glow: 1.2, alpha: x.globalAlpha, squash: t > T.roof && t < T.roof + 0.25 ? 0.18 * (1 - (t - T.roof) / 0.25) : 0 })
    drawBurst(x, B_ROOF, 540, ROOF - 20, t, T.roof, [GOLD, BONE])
  }
  // the card scene: veiled mystery card + Cancer with binoculars
  function cardScene(t) {
    if (t < T.eDim[0] || t > T.cut2) return
    const dk = ease.inOutQuad(prog(t, ...T.eDim)) * outK(t, T.eOut)
    x.fillStyle = `rgba(6,4,18,${(0.78 * dk).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
    const ck = easeOutBack(prog(t, ...T.card), 1.6) * popOut(t, T.eOut)
    if (ck > 0 && profBmp) {
      const h = 820, w = h * profBmp.width / profBmp.height
      x.save(); x.translate(540, 980 + (1 - clamp(ck)) * 300); x.rotate((1 - clamp(ck)) * 0.2 + 0.02 * Math.sin(t * 2)); x.scale(ck, ck)
      x.shadowColor = PINK; x.shadowBlur = 50; x.drawImage(profBmp, -w / 2, -h / 2, w, h); x.restore()
      drawBurst(x, B_CARD, 540, 980, t, T.card[0] + 0.2, [PINK, GOLD, BONE], 0.8)
    }
    // Cancer creeps in from the left with binoculars
    const ink = ease.outCubic(prog(t, ...T.creep)) * popOut(t, T.eOut)
    if (ink > 0) {
      const cx = lerp(-160, 210, ink), cy = 1400, size = 220
      const up = prog(t, T.binoc[0], T.binoc[0] + 0.2) * (1 - prog(t, T.binoc[1], T.binoc[1] + 0.25))
      const mood = t > T.eBlush ? 'happy' : up > 0.5 ? 'squint' : 'wide'
      const rr = drawStarChar(x, cx, cy, size, t, { color: CANCER.color, glyph: CANCER.glyph, mood, look: [1, -1], blush: t > T.eBlush, hops: [T.creep[1], T.eBlush], seed: 6, glow: 1 })
      // binoculars (drop down after "down.")
      const fall = ease.inCubic(prog(t, T.binoc[1], T.binoc[1] + 0.35))
      if (t > T.binoc[0] - 0.05 && fall < 1) {
        const by = lerp(rr.y + size * 0.5, rr.y - size * 0.02, up) + fall * 300
        x.save(); x.translate(rr.x + size * 0.05, by); x.rotate(-0.35 + fall * 1.5); x.globalAlpha *= 1 - fall
        for (const dx of [-38, 38]) {
          x.fillStyle = '#1b1236'; x.beginPath(); x.roundRect(dx - 30, -34, 60, 70, 12); x.fill()
          x.strokeStyle = BONE; x.lineWidth = 4; x.stroke()
          x.fillStyle = rgba(GLASS, 0.9); x.beginPath(); x.arc(dx, -30, 22, 0, TAU); x.fill()
          x.fillStyle = '#fff'; x.fillRect(dx - 10, -40, 7, 7)
        }
        x.fillStyle = '#1b1236'; x.fillRect(-12, -14, 24, 24)
        x.restore()
      }
    }
  }
  // finale: the two float out of their windows and meet on the lakeshore
  function finale(t) {
    const fp = prog(t, ...T.float), e = ease.inOutCubic(fp)
    const [c1, r1] = HERO_SKY.cancer, [c2, r2] = HERO_SKY.taurus
    const w1 = midWin(c1, r1), w2 = midWin(c2, r2)
    const meet = { y: 1490 }
    const pairs = [[CANCER, w1, 420, -1, 6], [TAURUS, w2, 660, 1, 8]]
    const sway = t > T.meet ? Math.sin((t - T.meet) * 3) * 6 : 0
    for (const [S, w, ex, side, seed] of pairs) {
      if (t < T.float[0] - 0.2) continue
      const k = pop01(t, T.float[0] - 0.2, 0.3)
      const px = lerp(w.x + w.w / 2, ex, e) + Math.sin(fp * Math.PI * 2) * 40 * side + sway * side
      const py = lerp(w.y + w.h / 2, meet.y, e) - Math.sin(Math.PI * fp) * 120
      const size = lerp(46, 200, e)
      const mood = t > T.meet ? 'heart' : t > T.float[0] + 0.3 ? 'sparkle' : 'wide'
      drawStarChar(x, px, py, size, t, { color: S.color, glyph: size > 120 ? S.glyph : null, mood, look: [-side, 0], pop: k, seed, glow: 1.1, alpha: x.globalAlpha, hops: S === CANCER ? HOPS_CA : [T.meet - 0.05], blush: t > T.meet })
    }
    drawBurst(x, B_MEET, 540, meet.y - 40, t, T.meet, [GOLD, PINK, BONE], 0.9)
    if (t > T.meet) floatHearts(x, t, 540, meet.y - 80, T.meet + 0.1, T.out[0], 3, 9, 300)
    const ck = t - T.meet
    if (ck > 0 && ck < 0.8) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 1 - ck / 0.8
      const g = x.createRadialGradient(540, meet.y - 40, 2, 540, meet.y - 40, 200); g.addColorStop(0, rgba('#fff3c4', 1)); g.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = g; x.beginPath(); x.arc(540, meet.y - 40, 200, 0, TAU); x.fill(); x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const outA = outK(t, T.out)
      if (t < T.push[1] + 0.02) {
        // hook skyline, pushed into on the way out
        const pp = ease.inCubic(prog(t, ...T.push))
        x.save(); x.globalAlpha = 1 - pp
        x.translate(540, 1130); x.scale(1 + 2.6 * pp, 1 + 2.6 * pp); x.translate(-540, -1130)
        skyline(t, ease.outCubic(prog(t, ...T.rise)), false); topper(t, false)
        x.restore()
      }
      if (t > T.facIn[0] && t < T.cut2) {
        const fk = ease.outCubic(prog(t, ...T.facIn))
        x.save(); x.globalAlpha = fk
        x.translate(540, 1000); x.scale(lerp(1.3, 1, fk), lerp(1.3, 1, fk)); x.translate(-540, -1000)
        facade(t); if (t < T.creep[0]) roofStar(t)
        x.restore()
        cardScene(t)
        if (t >= T.creep[0]) roofStar(t)
      }
      if (t >= T.cut2) {
        x.save(); x.globalAlpha = outA
        skyline(t, 1, true); topper(t, true); finale(t)
        x.restore()
      }
      boxA.update(t); boxB.update(t); boxC.update(t); boxD.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card motif: two cuts, ~one per 12 s: the box has shut on "shell." → the deck; the card scene has cleared → come out.
const CUTS = [{ t: T.cut1, kind: 'deal', keep: true }, { t: T.cut2, kind: 'flip', keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE WAITLIST' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const accent = (t, hz = 1174.66) => [['pop', r3(t), hz, 0.06, 0], ['pluck', r3(t), hz * 0.75, 0.045, 0.6, 0]]
export const CUES = [
  // hook
  ...wordPops(T.h0, 3, 0.09), ...accent(T.h0Late), ['pop', r3(T.h0Late + 0.14), 1318.51, 0.05, 0], ['whoosh', 0.3, 1.2, 0.03], ['glitter', 0.4, 1.6],
  ['pop', T.topper, 880, 0.05, 0.5], ['bell', r3(T.topper + 0.03), 1760, 0.03, 1.0, 0.5],
  ['riser', 1.6, T.light, 0.035], ['boom', T.light, 0.12],
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ['pop', r3(T.light + i * 0.065), NOTE[(i + 2) % NOTE.length], 0.022, -0.6 + i * 0.17]),
  ['whoosh', T.push[0], 0.6, 0.045],
  // everyone in their own box
  ...wordPops(T.h1, 4, 0.08, 1, 0.022), ...accent(T.h1Late),
  ...ROOMS.map(R => ['pop', r3(T.lit + R[6] * 0.11 + 0.05), NOTE[R[6] % NOTE.length], 0.02, -0.4 + R[0] * 0.4]),
  ['whoosh', r3(T.roof - 0.35), 0.3, 0.035], ['boom', T.roof, 0.08], ['tick', T.roof, 0.06],
  ['pop', T.boxA, 739.99, 0.035, 0], ['pop', r3(T.boxA + 0.06), 987.77, 0.03, 0],
  ['pluck', T.roll[0], 196, 0.045, 0.5, 0], ['pluck', r3(T.roll[0] + 0.18), 174.61, 0.04, 0.6, 0],    // bwomp
  // the deck, window to window
  ...wordPops(T.h2, 2, 0.08, 2), ...[0, 1, 2].map(i => ['pop', r3(T.h2Late + i * 0.1), NOTE[(4 + i) % NOTE.length], 0.04, 0]),
  ['pop', T.boxB, 739.99, 0.035, 0],
  ...T.cards.flatMap((c, i) => [['whoosh', r3(c - 0.6), 0.45, 0.03], ['pop', c, NOTE[(i * 2) % NOTE.length], 0.045, i % 2 ? 0.4 : -0.4], ['glitter', c, r3(c + 0.35)]]),
  // two windows, one line
  ...wordPops(T.h3, 2, 0.09, 0), ...accent(T.h3Late), ['pop', r3(T.h3Late + 0.12), 1318.51, 0.05, 0],
  ['riser', T.line[0], T.line[1], 0.03], ['bell', T.line[1], 1567.98, 0.045, 1.6, 0], ['glitter', T.line[0], r3(T.line[1] + 0.3)],
  ['bell', T.blush, 2093, 0.03, 1.0, 0],
  // card first
  ...wordPops(T.h4, 4, 0.1, 3), ['whoosh', T.card[0], 0.45, 0.04], ['pop', r3(T.card[0] + 0.3), 880, 0.05, 0], ['glitter', r3(T.card[0] + 0.2), r3(T.card[0] + 0.9)],
  ['tick', T.creep[0], 0.04], ['tick', r3(T.creep[0] + 0.15), 0.04], ['tick', r3(T.creep[0] + 0.3), 0.04],      // tiptoe
  ['pop', T.binoc[0], 1318.51, 0.04, -0.3], ['pop', T.boxC, 739.99, 0.035, 0],
  ['whoosh', T.binoc[1], 0.3, 0.035], ['tick', r3(T.binoc[1] + 0.33), 0.08], ['boom', r3(T.binoc[1] + 0.33), 0.06],
  // come out of your box
  ...wordPops(T.h5, 3, 0.09, 1), ...accent(T.h5Late, 1318.51),
  ['whoosh', T.float[0], 1.2, 0.04], ['riser', T.float[0], T.meet, 0.03],
  ['boom', T.meet, 0.14], ['bell', T.meet, 1567.98, 0.05, 1.6, -0.1], ['bell', r3(T.meet + 0.05), 2093, 0.035, 1.6, 0.1], ['glitter', T.meet, r3(T.meet + 0.9)],
  ['pop', T.boxD, 739.99, 0.035, 0],
  ['whoosh', T.out[0], 0.4, 0.035],
  ...ALL.flatMap(L => talkCues(L, { cps: CPS })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
