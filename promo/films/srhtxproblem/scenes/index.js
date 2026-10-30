// srhtxproblem (20 s vertical, Star Talk Remix of htxproblem "Houston, we have a problem") · story 0–15.6, then the
// shared end card. Mission Control is run by the stars: a gold MISSION CONTROL star in a headset at a pixel console,
// ♓ Pisces on the side desk (crying, as always).
//   0.00–4.40  "Houston, | we have a | *problem.*"  The console pops in: red beacon, LOVE LIFE ▲ CRITICAL, a jagged trace.
//              MC stares at the alarm, Pisces is already crying. Box: "babe. we're picking up heavy swiping."
//   4.40–8.60  "Your thumb hit | escape *velocity.*"  The screen becomes a swipe feed of faceless cards, faster and faster.
//              MC's eyes chase every swipe left/right until it goes dizzy (squint, sweat); Pisces fountains.
//              Box: "we can't see the faces. neither can you." MC realises, leaps onto the big ABORT button: SLAM.
//              Record scratch, the feed freezes, ABORT flashes. A beat of silence. (card cut 8.62)
//   8.62–12.7  "Card *first.* | Face last."  The veiled mystery card drops in on a glow. Both stars go heart-eyed.
//              Box: "new flight plan: card first. face last."
//   12.7–15.4  The card dives into the monitor, which flips green (● ALIGNED, smooth trace). "Houston, | we have a |
//              *solution.*" Both stars hop, the headsets fly off, Pisces cries happy fountains. Everything out by 15.42.
// One canvas (sky + console + stars + card), DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, headsetCells, headsetWorld, tearsCells, sweatCells, drawConsole, drawFaceCard, CON, RED, GREEN, BONE, GOLD, PINK, CYAN, MONO } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const PIS = signStar('pisces')

// ── the timeline
const T = {
  h0: 0.12, h0Late: 0.7, h0Out: [4.22, 4.4],
  con: 0.22, mcIn: 0.5, pisIn: 0.9,
  open: 1.85, l1: 2.0,
  h1: 4.49, h1Late: 4.95, h1Out: [8.3, 8.48],
  sw0: 4.75, l2: 5.3,
  dizzy: 6.85, realize: 7.2, leap: [7.42, BEAT(13)], slam: BEAT(13),
  h2: 8.7, h2Late: 9.05, card: [8.7, BEAT(15)], l3: 9.25, heart: 9.7,
  h2Out: [12.55, 12.72], close: 12.7, cardIn: [12.42, 12.8], green: [12.78, 12.98],
  h3: BEAT(22), h3Late: 13.2, cheer: BEAT(23) + 0.05,
  out: [15.0, 15.42], h3Out: [15.2, 15.42],
}
const MC = 'MISSION CONTROL'
const LINES = [
  { t: T.l1, speaker: MC, text: "babe. we're picking up *heavy* swiping." },
  { t: T.l2, speaker: MC, text: "we can't see the faces. *neither* can you." },
  { t: T.l3, speaker: MC, text: 'new flight plan: *card first.* face last.' },
]
const CPS = 30
// accelerating swipes (eyes chase each one)
const GAPS = [0.5, 0.44, 0.38, 0.32, 0.27, 0.23, 0.2, 0.17, 0.15, 0.13, 0.12, 0.11, 0.1, 0.1, 0.09, 0.09, 0.09]
const SWIPES = GAPS.reduce((a, g) => [...a, +(a.at(-1) + g).toFixed(3)], [T.sw0]).filter(s => s < T.realize + 0.1)
const DIRS = SWIPES.map((_, i) => [-1, 1, -1, -1, 1, -1, 1, 1, -1, 1][i % 10])
const HUES = ['#f29a4a', '#3fb6f0', '#e163d6', '#2fc79a', '#f2cf4a', '#a35cf0', '#f0603a', '#38c4ec', '#ef5c94', '#7c74f0']

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const SEAT = { x: 380, y: 1250, size: 290 }
const PSEAT = { x: 862, y: 1296, size: 170 }
const BTN = { x: 760, y: 942 }                 // MC's centre when standing on the ABORT button
const CARD = { x: 540, y: 800, w: 430 }

const MC_HOPS = [T.mcIn + 0.3, ...talkHops(LINES, MC, { cps: CPS }).filter(h => h < T.dizzy || h > T.card[1]), T.cheer, T.cheer + 0.62, T.cheer + 1.24]
const PIS_HOPS = [T.pisIn + 0.3, T.heart + 0.1, T.cheer + 0.12, T.cheer + 0.74, T.cheer + 1.36]

function lastSwipe(t) { let k = -1; for (let i = 0; i < SWIPES.length; i++) if (t >= SWIPES[i]) k = i; return k }

function mcState(t) {
  if (t < T.l1) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.h1) return { mood: t < T.l1 + 0.6 ? 'squint' : 'neutral', look: [0, 0] }
  if (t < T.dizzy) { const k = lastSwipe(t); return { mood: 'wide', look: k < 0 ? [1, -1] : [DIRS[k], -1], blink: false } }
  if (t < T.realize) return { mood: 'squint', look: [0, 0] }
  if (t < T.leap[0]) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.slam) return { mood: 'squint', look: [1, 1] }
  if (t < 8.62) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.heart) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.cardIn[0]) return { mood: 'heart' }
  if (t < T.h3) return { mood: 'wide', look: [1, -1], blink: false }
  return { mood: 'happy' }
}
function pisState(t) {
  if (t < T.h1) return { mood: 'squint', tears: 2 }
  if (t < T.realize) return { mood: 'squint', tears: 3 }
  if (t < 8.62) return { mood: 'wide', look: [-1, -1], tears: 0, blink: false }
  if (t < T.heart) return { mood: 'wide', look: [-1, -1], tears: 0, blink: false }
  if (t < T.h3) return { mood: 'heart', tears: 1 }
  return { mood: 'happy', tears: 3 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const card = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-profile-1.png' })
  let cardBmp = null
  if (card) { const c = document.createElement('canvas'); c.width = 860; c.height = Math.round(860 * card.height / card.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(card, 0, 0, c.width, c.height); cardBmp = c }
  const CH = cardBmp ? CARD.w * cardBmp.height / cardBmp.width : CARD.w * 1.5

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Houston, | we have a | *problem.*', { top: 150, size: 116, accentSize: 150, at: T.h0, gap: 0.09, accentColor: RED, wobble: true, late: 1, lateAt: T.h0Late, lineHeight: 0.98 })
  const H1 = popText(root, 'Your thumb hit | escape *velocity.*', { top: 210, size: 104, accentSize: 132, at: T.h1, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h1Late })
  const H2 = popText(root, 'Card *first.* | Face last.', { top: 200, size: 116, accentSize: 150, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h2Late, lateGap: 0.14 })
  const H3 = popText(root, 'Houston, | we have a | *solution.*', { top: 150, size: 116, accentSize: 150, at: T.h3, gap: 0.09, accentColor: GREEN, wobble: true, late: 1, lateAt: T.h3Late, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the monitor's screen, per beat
  function screen(t, g) {
    return (sx, sy, sw, sh) => {
      const mid = sx + sw / 2
      x.textBaseline = 'middle'; x.font = `700 30px ${MONO}`
      const head = (l, r, col, blink = true) => {
        x.textAlign = 'left'; x.fillStyle = 'rgba(239,230,214,0.85)'; x.fillText(l, sx + 22, sy + 34)
        x.textAlign = 'right'; x.fillStyle = col
        x.globalAlpha = blink ? (Math.sin(t * Math.PI * 2 * 2.2) > -0.1 ? 1 : 0.25) : 1
        x.fillText(r, sx + sw - 22, sy + 34); x.globalAlpha = 1
      }
      const trace = (mode, a) => {
        if (a <= 0.01) return
        const wy = sy + sh * 0.6, col = mode ? GREEN : RED
        x.save(); x.globalAlpha = a; x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 14
        for (let i = 0; i <= 78; i++) {
          const u = i / 78, px = sx + 20 + u * (sw - 40)
          let v
          if (mode) v = Math.sin(u * Math.PI * 4 - t * 6) * 44
          else { const n = Math.sin(u * 23 - t * 9) * 0.5 + Math.sin(u * 51 + t * 5) * 0.3; const spike = (i + Math.floor(t * 9)) % 11 === 0 ? (i % 2 ? 1 : -1) * 100 : 0; v = n * 60 + spike }
          x.fillRect(Math.round(px / 6) * 6, Math.round((wy + v) / 6) * 6, 8, 8)
        }
        x.restore()
      }
      if (t < T.sw0 - 0.1) { head('LOVE LIFE', '▲ CRITICAL', RED); trace(0, 1); return }
      if (t < T.slam) {
        head('INCOMING: FACES', '▲▲▲', RED)
        const k = lastSwipe(t), cw = 170, chh = 220, cy = sy + 60 + chh / 2 + 6
        // the stack behind (next cards)
        for (let d = 3; d >= 1; d--) drawFaceCard(x, mid + d * 10, cy + d * 6, cw, chh, HUES[(k + 1 + d) % HUES.length], d * 0.02, 0.9)
        // the current top card (next to go)
        drawFaceCard(x, mid, cy, cw, chh, HUES[(k + 1) % HUES.length], 0, 1)
        // cards in flight (recent swipes), with ghost trails when fast
        for (let i = Math.max(0, k - 3); i <= k; i++) {
          const p = prog(t, SWIPES[i], SWIPES[i] + 0.26)
          if (p >= 1) continue
          const e = ease.inCubic(p), dx = DIRS[i] * e * (sw * 0.75)
          const gap = GAPS[i] || 0.1
          if (gap < 0.2) for (let gh = 3; gh >= 1; gh--) drawFaceCard(x, mid + dx - DIRS[i] * gh * 34, cy, cw, chh, HUES[i % HUES.length], DIRS[i] * e * 0.5, 0.18)
          drawFaceCard(x, mid + dx, cy - Math.sin(Math.PI * p) * 20, cw, chh, HUES[i % HUES.length], DIRS[i] * e * 0.5, 1)
        }
        // speed lines once it's a blur
        const fast = clamp((t - SWIPES[6]) / 0.8)
        if (fast > 0) { x.fillStyle = `rgba(255,143,177,${0.5 * fast})`; for (let i = 0; i < 9; i++) { const yy = sy + 70 + ((i * 53 + t * 900) % (sh - 80)); x.fillRect(sx + ((i * 97) % 120), yy, 140 + (i % 3) * 60, 4); x.fillRect(sx + sw - 260 + ((i * 61) % 100), yy + 20, 140, 4) } }
        return
      }
      if (t < 8.64) {
        // ABORT: red flood + blinking type, the last card frozen mid-air
        const fl = Math.sin((t - T.slam) * Math.PI * 2 * 3) > 0 ? 1 : 0.35
        x.fillStyle = `rgba(255,77,74,${0.22 * fl})`; x.fillRect(sx, sy, sw, sh)
        drawFaceCard(x, mid - 200, sy + 190, 150, 196, HUES[3], -0.4, 0.5); drawFaceCard(x, mid + 210, sy + 200, 150, 196, HUES[6], 0.35, 0.5)
        x.textAlign = 'center'; x.font = `700 92px ${MONO}`; x.fillStyle = RED; x.shadowColor = RED; x.shadowBlur = 24; x.globalAlpha = fl
        x.fillText('ABORT', mid, sy + 110); x.shadowBlur = 0; x.globalAlpha = 1
        return
      }
      if (g <= 0.01) { head('CARD INBOUND', '★ STANDBY', GOLD, false); const sweep = (t * 0.9) % 1; x.fillStyle = 'rgba(242,199,92,0.25)'; x.fillRect(sx + sweep * sw, sy + 60, 10, sh - 60); return }
      head('LOVE LIFE', '● ALIGNED', GREEN, false); trace(1, g)
    }
  }

  // headsets: where each sat when it flew off at the cheer (pure; recomputed from the same frame maths)
  function flyHeadset(t, seat, size, hops, seed, accent, dir) {
    const dt = t - T.cheer - 0.08
    if (dt < 0) return false
    const F = starFrame(seat.x, seat.y, size, T.cheer + 0.08, { hops, seed })
    const hx = F.ox, hy = F.oy - F.base - F.S / 2 + 11 * F.cell
    const vx = dir * 520, vy = -1300, g = 3200
    headsetWorld(x, hx + vx * dt, hy + vy * dt + 0.5 * g * dt * dt, dir * dt * 8, F.cell, accent, 1 - prog(dt, 0.9, 1.1))
    return true
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
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

  function drawPisces(t, ok) {
    const pp = pop01(t, T.pisIn, 0.36, 2.1) * ok
    if (pp <= 0.02) return
    const st = pisState(t)
    const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const opts = { hops: PIS_HOPS, seed: 6, pop: pp, squash: sob }
    drawStarChar(x, PSEAT.x, PSEAT.y, PSEAT.size, t, { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 0.9, ...opts })
    const F = starFrame(PSEAT.x, PSEAT.y, PSEAT.size, t, opts)
    inSprite(x, F, () => { if (t < T.cheer + 0.08) headsetCells(x, CYAN); tearsCells(x, t, st.tears) })
  }

  function drawMC(t, ok) {
    const mp = pop01(t, T.mcIn, 0.38, 2.2) * ok
    if (mp <= 0.02) return null
    const st = mcState(t)
    // position: seat → leap arc → standing on the ABORT button → (hidden by the 8.62 cut) back in the seat
    let px = SEAT.x, py = SEAT.y, squash = 0
    if (t >= T.leap[0] && t < 8.62) {
      const p = prog(t, ...T.leap), e = ease.inOutQuad(p)
      px = lerp(SEAT.x, BTN.x, e); py = lerp(SEAT.y, BTN.y, e) - Math.sin(Math.PI * p) * 260
      if (t < T.leap[0] + 0.08) squash = 0.14 * Math.sin(Math.PI * (t - T.leap[0]) / 0.08)
      if (t >= T.slam) { const d = t - T.slam; squash = 0.32 * Math.exp(-d * 7) * Math.cos(d * 22) }
    }
    if (t >= T.dizzy && t < T.realize) squash += 0.05 * Math.sin((t - T.dizzy) * 30)
    if (t >= T.realize && t < T.realize + 0.3) squash += -0.12 * Math.exp(-(t - T.realize) * 8) * Math.cos((t - T.realize) * 22)
    const hops = t >= T.leap[0] && t < 8.62 ? null : MC_HOPS
    const opts = { hops, seed: 3, pop: mp, squash }
    const glow = 1.1 + (t > T.heart && t < T.cardIn[0] ? 0.3 : 0)
    const r = drawStarChar(x, px, py, SEAT.size, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, glow, ...opts })
    const F = starFrame(px, py, SEAT.size, t, opts)
    inSprite(x, F, () => {
      if (t < T.cheer + 0.08) headsetCells(x, RED)
      if (t >= T.dizzy - 0.4 && t < T.leap[1]) sweatCells(x, t)
    })
    // dizzy pixel stars circling its head
    if (t >= T.dizzy && t < T.leap[0]) {
      const a = ok * Math.min(1, (t - T.dizzy) * 5)
      x.save(); x.globalAlpha = a
      for (let i = 0; i < 3; i++) { const ang = t * 7 + i * 2.09; drawPixelStar(x, r.x + Math.cos(ang) * 120, r.y - 150 + Math.sin(ang) * 26, 24, 2, i % 2 ? GOLD : BONE) }
      x.restore()
    }
    return r
  }

  function drawCard(t) {
    if (!cardBmp || t < T.card[0] || t > T.cardIn[1]) return
    const pin = prog(t, ...T.card)
    const land = easeOutBack(pin, 1.5)
    let cx = CARD.x, cy = lerp(-CH, CARD.y, land) + Math.sin((t - T.card[1]) * 2.2) * 8 * (pin >= 1 ? 1 : 0)
    let sc = 1, rot = (1 - land) * -0.25 + 0.02 * Math.sin(t * 1.7)
    const dive = prog(t, ...T.cardIn)
    if (dive > 0) {
      const e = ease.inCubic(dive)
      sc = lerp(1, 0.08, e); cy = lerp(cy, CON.MY + CON.MH * 0.45, e); rot = lerp(rot, 0.6, e)
    }
    // glow
    const ga = (pin >= 1 ? 1 : pin) * (1 - dive)
    if (ga > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, cy, 30, cx, cy, 520)
      g.addColorStop(0, `rgba(255,190,220,${0.4 * ga})`); g.addColorStop(0.5, `rgba(242,199,92,${0.14 * ga})`); g.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 520, 0, Math.PI * 2); x.fill()
      // a slow ring of light rays
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * Math.PI * 2 + t * 0.25
        x.fillStyle = `rgba(242,199,92,${0.07 * ga})`
        x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a - 0.06) * 700, cy + Math.sin(a - 0.06) * 700); x.lineTo(cx + Math.cos(a + 0.06) * 700, cy + Math.sin(a + 0.06) * 700); x.closePath(); x.fill()
      }
      x.restore()
    }
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
    x.shadowColor = 'rgba(6,4,18,0.8)'; x.shadowBlur = 40
    x.drawImage(cardBmp, -CARD.w / 2, -CH / 2, CARD.w, CH)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      const g = ease.inOutQuad(prog(t, ...T.green))
      // console (dims while the card is up)
      const ck = pop01(t, T.con, 0.45, 1.8) * ok
      if (ck > 0.01) {
        const press = t >= T.slam && t < 8.62 ? 1 : 0
        drawConsole(x, t, { k: ck, g, screen: screen(t, g), press })
        const dim = t > T.card[0] && t < T.cardIn[1] ? 0.5 * prog(t, T.card[0], T.card[0] + 0.3) * (1 - prog(t, ...T.cardIn)) : 0
        if (dim > 0) { x.fillStyle = `rgba(5,4,12,${dim})`; x.fillRect(0, 0, 1080, 1920) }
      }
      if (t < T.out[1] + 0.02) {
        drawPisces(t, ok)
        drawCard(t)
        const r = drawMC(t, ok)
        // slam: dust + shock sparkles round the button; land sparkles; green burst; cheer
        if (t >= T.slam && t < T.slam + 0.7) sparkles(t, BTN.x, CON.DY + 10, T.slam, 10, 150, 1, [RED, GOLD, BONE])
        sparkles(t, CARD.x, CARD.y, T.card[1], 14, 300, 2, [GOLD, PINK, BONE])
        sparkles(t, 540, CON.MY + CON.MH / 2, T.green[0] + 0.05, 12, 360, 3, [GREEN, GOLD, BONE])
        if (t > T.heart && t < T.cardIn[0] && r) {
          // little hearts drift up from both stars
          for (let i = 0; i < 6; i++) {
            const born = T.heart + i * 0.42, p = (t - born) / 1.3
            if (p < 0 || p >= 1) continue
            const sx = (i % 2 ? PSEAT.x : r.x) + Math.sin(p * 6 + i) * 30, sy = (i % 2 ? PSEAT.y - 80 : r.y - 150) - p * 220
            x.save(); x.globalAlpha = Math.sin(Math.PI * p); drawPixelStar(x, sx, sy, 22, 2, PINK); x.restore()
          }
        }
        flyHeadset(t, SEAT, SEAT.size, MC_HOPS, 3, RED, -1)
        flyHeadset(t, PSEAT, PSEAT.size, PIS_HOPS, 6, CYAN, 1)
        if (t >= T.cheer) sparkles(t, 540, 1150, T.cheer, 14, 380, 4, [GREEN, GOLD, PINK, BONE])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.44 (hook → thumb), 8.62 (ABORT → the card), 12.76 (card → solution).
// cardfx keeps one for a 20 s film: the 8.62 flip, which also hides MC hopping back to its seat.
const CUTS = [4.44, { t: 8.62, kind: 'flip' }, 12.76]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop/pluck/bell are re-keyed by the engine; chip/tom/snare/clap sit on a private sfx bus)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const siren = (t, n) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.46).toFixed(3), i % 2 ? 660 : 880, 0.22, { ...FX, wave: 'square', duty: 0.25, gain: 0.014, decay: 0.1, sustain: 0.7 }])
const scratch = t => [['whoosh', t + 0.06, 0.12, 0.2], ['whoosh', t + 0.2, 0.16, 0.24], ['tick', t, 0.08], ['tick', t + 0.13, 0.06]]
const stamp = t => [['tom', t, 82, { ...FX, gain: 0.32, decay: 0.3 }], ['boom', t, 0.12], ['clap', t + 0.005, { ...FX, gain: 0.16 }], ['tick', t, 0.09]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.04, f0: 900, f1: 2600 }]]; for (let k = 0; k < 14; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // hook: alarm
  ...wordPops(T.h0, 5, 0.09, 0, 0.026), ['pop', T.h0Late, 440, 0.05, 0], ['boom', T.h0Late, 0.1],
  ['boom', T.con, 0.12], ['pop', T.con + 0.1, 587.33, 0.04, 0], ...siren(0.3, 7),
  ['pop', T.mcIn + 0.05, 739.99, 0.045, -0.2], ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4],
  ...sob(1.3, 1320), ...sob(3.3, 1250, 2),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [MC]: 740 } }),
  // the swipes
  ['whoosh', T.h0Out[0], 0.3, 0.04], ...head(T.h1, 4, 0.08, T.h1Late, 2),
  ...SWIPES.map((s, i) => ['whoosh', s, 0.14, Math.min(0.09, 0.025 + i * 0.005)]),
  ...SWIPES.map((s, i) => ['tick', s, 0.02 + Math.min(0.04, i * 0.003)]),
  ['riser', T.sw0 + 0.4, T.realize, 0.035],
  ...sob(5.0, 1400, 3), ...sob(6.1, 1480, 3),
  // dizzy, realise, leap, SLAM
  ...[0, 1, 2].map(i => ['pluck', +(T.dizzy + i * 0.11).toFixed(3), 1567.98 - i * 120, 0.02, 0.3, (i - 1) * 0.3]),
  ['pop', T.realize, 440, 0.045, 0], ['whoosh', T.leap[0], 0.35, 0.06],
  ...stamp(T.slam), ...scratch(T.slam + 0.02), ['tapeStop', T.slam - 0.3, 0.3],
  ['chip', T.slam + 0.05, 880, 0.18, { ...FX, wave: 'square', duty: 0.5, gain: 0.02, decay: 0.05, sustain: 0.7 }], ['chip', T.slam + 0.3, 880, 0.18, { ...FX, wave: 'square', duty: 0.5, gain: 0.018, decay: 0.05, sustain: 0.7 }],
  // the card
  ...head(T.h2, 2, 0.08, T.h2Late, 4), ['pop', T.h2Late + 0.14, 1318.51, 0.04, 0],
  ['whoosh', T.card[0] - 0.05, 0.4, 0.07], ['bell', T.card[1], 1318.51, 0.045, 1.8, 0], ['glitter', T.card[1], T.card[1] + 0.7],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['pluck', T.heart + 0.1, 1567.98, 0.035, 0.5, 0.3],
  // solution
  ['whoosh', T.cardIn[0], 0.35, 0.05], ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', +(T.green[0] + i * 0.07).toFixed(3), f, 0.035, 1.6, (i - 1.5) * 0.2]),
  ...wordPops(T.h3, 5, 0.09, 1, 0.026), ['pop', T.h3Late, 1318.51, 0.055, 0], ['pluck', T.h3Late, 1174.66, 0.05, 0.7, 0], ['glitter', T.h3Late, T.h3Late + 0.6],
  ['pop', T.cheer + 0.1, 1567.98, 0.035, -0.4], ['pop', T.cheer + 0.14, 1318.51, 0.035, 0.4], ...cheers(T.cheer, T.cheer + 1.8),
  ...sob(T.cheer + 0.3, 1568), ...sob(T.cheer + 1.0, 1660, 2),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
