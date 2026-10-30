// srlaunch (30 s vertical, Star Talk Remix of the launch film "What if the stars chose?") · story 0–25.6, then the
// shared end card. The original: a birth date is typed, the sky is read, a deck is dealt. Dating, dealt by the stars.
// Here THE STARS (the gold narrator) walk you through it themselves.
//   0.00–8.25   "What if | the *stars* chose?"  A phone swipes faces nonstop. The gold star peeks in from the right, wide-eyed.
//               THE STARS: "psst. up here. it's the stars." (you keep swiping) · "Put it | *down.*"
//               THE STARS: "put the phone down. *we'll pick.*" → the star hops onto the phone, the screen blips off,
//               the phone drops out of frame.
//   8.30        card cut (deal)
//   8.40–13.75  "First: your | *birthday.*"  A glass input pill types MAY 12, 1998, then stops. The star squints at it.
//               THE STARS: "the TIME too. your *rising* is picky." → "· 5:00 PM" types in, a ✓ pops, happy hop.
//   13.85–19.5  "Reading your | *sky.*"  The pill becomes a chart wheel; the star reads from its centre while your Big Three
//               pop out around it: SUN ♉ Taurus, MOON ♐ Sagittarius, RISING ♎ Libra… then VENUS ♈ Aries crashes in
//               from the top, heart-eyed and bouncing. THE STARS: "Venus in Aries. that explains *a lot.*" → the other
//               three roll their eyes in sync. (May 12 1998, 5 PM, Houston: Sun Taurus, Moon Sag, Rising Libra, Venus Aries.)
//   19.60       card cut (flip)
//   19.70–25.42 "Tonight's | *deck.*"  The star deals five cards into a fan; the middle one flips to a veiled mystery card.
//               Pisces, small in the corner, cries happy tears. THE STARS: "a new deck. *every night.*"
//               "Dating, *dealt* | by the stars."  The star winks; everything pops out.
//   25.42→      plain sky; the end card takes over at 25.6.
// One canvas (sky + props + cast), DOM type + dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, drawWheelH, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BM, drawPixels, glowAt, burst, drawPhone, drawFace, drawCardImg, drawTears } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', MINT = '#7fe0b8', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const SKY_TAG = 'THE STARS'
const TAU_ = signStar('taurus'), SAG = signStar('sagittarius'), LIB = signStar('libra'), ARI = signStar('aries'), PIS = signStar('pisces')

// ── the timeline
const T = {
  // A · the hook
  h0: 0.12, h0Land: BEAT(1), h0Out: [5.05, 5.22],
  phone: 0.25, swipe0: 0.55, swipeGap: 0.42, peek: BEAT(2), open1: 2.2, l1: 2.4,
  h0b: 5.3, h0bLand: BEAT(9) + 0.05, l2: 5.34, hop: [6.72, 7.1], off: 7.1, drop: [7.42, 7.95], close1: 8.1, h0bOut: [7.95, 8.12],
  // B · the birthday
  h1: 8.4, h1Land: BEAT(14) + 0.3, pill: 8.55, typeA: 9.0, l3: 10.1, squint: 9.95, typeB: 12.05, check: 12.9, close2: 13.3,
  h1Out: [13.42, 13.6], pillOut: [13.45, 13.85],
  // C · the reading
  h2: 13.95, h2Land: BEAT(24) + 0.3, wheel: [13.85, 14.4], pops: [BEAT(25), BEAT(26), BEAT(27)], venus: [15.86, 16.16],
  open3: 16.2, l4: 16.4, roll: [17.75, 18.95], close3: 19.3, h2Out: [19.22, 19.4], cOut: [19.1, 19.45],
  // D · the deck
  h3: 19.7, h3Land: BEAT(35) + 0.05, deal0: 20.15, dealGap: 0.14, flip: [21.3, 21.75], pisces: 21.55,
  open4: 20.82, l5: 21.0, close4: 23.55, h3Out: [22.8, 22.97],
  h4: 22.98, h4Land: BEAT(41) + 0.05, wink: 23.9, out: [25.0, 25.42], h4Out: [25.08, 25.34],
}
const CPS = 30
const L1 = [
  { t: T.l1, speaker: SKY_TAG, text: 'psst. up here. it’s the stars.' },
  { t: T.l2, speaker: SKY_TAG, text: 'put the phone down. *we’ll pick.*' },
]
const L2 = [{ t: T.l3, speaker: SKY_TAG, text: 'the TIME too. your *rising* is picky.' }]
const L3 = [{ t: T.l4, speaker: SKY_TAG, text: 'Venus in Aries. that explains *a lot.*' }]
const L4 = [{ t: T.l5, speaker: SKY_TAG, text: 'a new deck. *every night.*' }]
const HOPS = [...talkHops(L1, SKY_TAG, { cps: CPS }), ...talkHops(L2, SKY_TAG, { cps: CPS }), T.check + 0.05, T.check + 0.45,
  ...talkHops(L3, SKY_TAG, { cps: CPS }), ...talkHops(L4, SKY_TAG, { cps: CPS }), T.h4Land, T.wink]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// the narrator's path: [t, x, y, size]
const KF = [
  [0, 1260, 700, 240], [T.peek, 1260, 700, 240], [T.peek + 0.45, 880, 700, 240], [T.hop[0], 880, 700, 240], [T.hop[1], 540, 620, 220],
  [T.drop[1], 540, 760, 270], [T.h1, 540, 760, 270], [T.wheel[0], 540, 760, 270], [T.wheel[1], 540, 1010, 168], [T.cOut[0], 540, 1010, 168],
  [T.h3 + 0.1, 540, 660, 230], [99, 540, 660, 230],
]
function narr(t) {
  let i = 0
  while (i < KF.length - 2 && t >= KF[i + 1][0]) i++
  const [t0, x0, y0, s0] = KF[i], [t1, x1, y1, s1] = KF[i + 1]
  const k = ease.inOutCubic(prog(t, t0, t1))
  let y = lerp(y0, y1, k)
  if (t > T.hop[0] && t < T.hop[1]) y -= Math.sin(Math.PI * prog(t, ...T.hop)) * 70
  return { x: lerp(x0, x1, k), y, s: lerp(s0, s1, k) }
}
function narrMood(t) {
  if (t < T.peek + 0.45) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.l1) return { mood: 'squint', look: [-1, 1] }
  if (t < T.l2) return { mood: 'neutral', look: [0, 0] }
  if (t < T.hop[0]) return { mood: t < 6.3 ? 'squint' : 'neutral', look: t < 6.3 ? [-1, 1] : [0, 0] }
  if (t < T.off + 0.5) return { mood: 'wink' }
  if (t < T.drop[1]) return { mood: 'happy' }
  if (t < T.squint) return { mood: 'neutral', look: [0, 1] }
  if (t < T.typeB) return { mood: 'squint', look: t < T.l3 ? [0, 1] : [0, 0] }
  if (t < T.check) return { mood: 'neutral', look: [0, 1] }
  if (t < T.close2 + 0.2) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.venus[0]) return { mood: 'neutral', look: t < T.pops[1] ? [-1, -1] : t < T.pops[2] ? [1, -1] : [-1, 1] }
  if (t < T.l4) return { mood: 'wide', look: [1, 1], blink: false }
  if (t < T.cOut[0]) return { mood: 'squint', look: [1, 1] }
  if (t < T.flip[1]) return { mood: 'happy' }
  if (t < T.wink) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.wink + 0.6) return { mood: 'wink' }
  return { mood: 'happy' }
}

// the Big Three + Venus around the wheel
const WC = { x: 540, y: 1010 }
const BIG = [
  { id: 'sun', label: 'SUN · TAURUS', s: TAU_, x: 285, y: 790, t: T.pops[0], mood: 'happy', seed: 3 },
  { id: 'moon', label: 'MOON · SAG', s: SAG, x: 795, y: 790, t: T.pops[1], mood: 'wink', seed: 7 },
  { id: 'rising', label: 'RISING · LIBRA', s: LIB, x: 285, y: 1215, t: T.pops[2], mood: 'sparkle', seed: 11 },
]
const VEN = { label: 'VENUS · ARIES', s: ARI, x: 795, y: 1215 }
const VEN_HOPS = Array.from({ length: 8 }, (_, i) => +(T.venus[1] + 0.12 + i * 0.4).toFixed(3))

// the deck fan
const FAN = Array.from({ length: 5 }, (_, i) => ({ x: 540 + (i - 2) * 168, y: 1110 + Math.abs(i - 2) * 34, rot: (i - 2) * 0.15, t: T.deal0 + i * T.dealGap }))
const DEAL_ORDER = [0, 4, 1, 3, 2]   // outer cards first, the middle one last
const TEXT_A = 'MAY 12, 1998', TEXT_B = ' · 5:00 PM'

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-3.png')])
  const BACK = bake(backIm, 300), MYST = bake(faceIm, 420)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'What if | the *stars* chose?', { top: 190, size: 120, accentSize: 168, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, wobble: true, gap: 0.09 })
  const H0b = popText(root, 'Put it | *down.*', { top: 190, size: 128, accentSize: 190, at: T.h0b, late: 1, lateAt: T.h0bLand, wobble: true, accentColor: PINK })
  const H1 = popText(root, 'First: your | *birthday.*', { top: 190, size: 116, accentSize: 168, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true })
  const H2 = popText(root, 'Reading your | *sky.*', { top: 190, size: 116, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: LAV })
  const H3 = popText(root, 'Tonight’s | *deck.*', { top: 190, size: 124, accentSize: 184, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true })
  const H4 = popText(root, 'Dating, *dealt* | by the stars.', { top: 190, size: 112, accentSize: 156, at: T.h4, gap: 0.09, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H0b, T.h0bOut], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out]]
  const box1 = dialogueBox(root, { lines: L1, y: 1420, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: L2, y: 1420, open: T.l3 - 0.22, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: L3, y: 1420, open: T.open3, close: T.close3, cps: CPS })
  const box4 = dialogueBox(root, { lines: L4, y: 1420, open: T.open4, close: T.close4, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── A · the phone, swiping faces nonstop
  const swipeIdx = t => Math.floor((t - T.swipe0) / T.swipeGap)
  function phoneScreen(t) {
    return (c, sw, sh) => {
      const off = prog(t, T.off, T.off + 0.18)
      // the feed: each card is swiped away in 0.2 s, the next one rises behind it
      const n = clamp(swipeIdx(t), -1, 40), stop = t > T.off
      const cw = sw - 44
      const drawCard = (k, dx, rot, sc) => {
        c.save(); c.translate(dx, -60); c.rotate(rot); c.scale(sc, sc)
        c.fillStyle = '#efe6d6'; c.beginPath(); c.roundRect(-cw / 2 - 6, -cw * 0.625 - 6, cw + 12, cw * 1.25 + 60, 22); c.fill()
        c.save(); c.beginPath(); c.roundRect(-cw / 2, -cw * 0.625, cw, cw * 1.25, 18); c.clip()
        drawFace(c, 0, 0, cw, 5 + k * 7)
        c.restore()
        c.fillStyle = INK; c.fillRect(-cw / 2 + 16, cw * 0.625 + 16, cw * 0.45, 14); c.fillRect(-cw / 2 + 16, cw * 0.625 + 38, cw * 0.25, 10)
        c.restore()
      }
      const k0 = Math.max(0, n + 1)
      if (!stop || off < 1) {
        drawCard(k0 + 1, 0, 0, 0.94 + 0.06 * (n >= 0 ? prog(t, T.swipe0 + n * T.swipeGap, T.swipe0 + n * T.swipeGap + 0.2) : 0))
        const ts = T.swipe0 + (n + 1) * T.swipeGap, sp = stop ? 0 : prog(t, ts, ts + 0.2)
        const dir = (k0 % 5 === 3) ? 1 : -1
        drawCard(k0, dir * ease.inCubic(sp) * sw * 1.3, dir * ease.inCubic(sp) * 0.45, 1)
        // ✕ / ♥ buttons
        for (const [bx, col, g] of [[-80, '#ff6b7a', '✕'], [80, '#7fe0b8', '♥']]) {
          const hit = !stop && ((dir < 0 && bx < 0) || (dir > 0 && bx > 0)) && sp > 0 && sp < 0.6
          c.fillStyle = hit ? col : 'rgba(239,230,214,0.12)'; c.beginPath(); c.arc(bx, sh / 2 - 70, hit ? 40 : 34, 0, Math.PI * 2); c.fill()
          c.fillStyle = hit ? INK : col; c.font = `700 40px ${MONO}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(g, bx, sh / 2 - 68)
        }
      }
      // screen off: an old-TV collapse to a line, then black
      if (off > 0) {
        c.fillStyle = '#05040c'; c.globalAlpha = 1
        const lineH = Math.max(4, sh * (1 - ease.outCubic(off)))
        c.fillRect(-sw / 2, -sh / 2 - 10, sw, (sh - lineH) / 2 + 10); c.fillRect(-sw / 2, lineH / 2, sw, sh)
        if (off < 1) { c.fillStyle = '#ffffff'; c.globalAlpha = 1 - off; c.fillRect(-sw / 2, -2, sw, 4) }
      }
    }
  }
  function drawPhoneA(t) {
    if (t < T.phone || t > T.drop[1]) return
    const k = pop01(t, T.phone, 0.4, 1.8)
    const d = ease.inCubic(prog(t, ...T.drop))
    const land = t > T.hop[1] ? Math.exp(-(t - T.hop[1]) * 9) * Math.sin((t - T.hop[1]) * 26) * 0.08 : 0
    drawPhone(x, 540, 1050 + d * 1500, 420, 700, { rot: d * 0.5 + Math.sin(t * 1.4) * 0.012, sc: k * (1 - land), screen: phoneScreen(t) })
  }

  // ── B · the input pill
  function drawPill(t) {
    if (t < T.pill || t > T.pillOut[1]) return
    const k = pop01(t, T.pill, 0.36, 1.8) * (1 - ease.inCubic(prog(t, ...T.pillOut)))
    if (k <= 0) return
    const cy = 1150, w = 940, h = 140
    x.save(); x.translate(540, cy); x.scale(k, k)
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD
    x.save(); x.letterSpacing = '6px'; x.fillText('YOUR CHART STARTS HERE', 0, -h / 2 - 44); x.restore()
    x.shadowColor = 'rgba(242,199,92,0.45)'; x.shadowBlur = 30
    x.fillStyle = 'rgba(18,11,40,0.9)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.fill()
    x.shadowBlur = 0; x.strokeStyle = GOLD; x.lineWidth = 5; x.stroke()
    x.strokeStyle = 'rgba(239,230,214,0.35)'; x.lineWidth = 2; x.beginPath(); x.roundRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, h / 2 - 10); x.stroke()
    const nA = clamp(Math.floor((t - T.typeA) / 0.075) + 1, 0, TEXT_A.length), nB = clamp(Math.floor((t - T.typeB) / 0.075) + 1, 0, TEXT_B.length)
    const s = TEXT_A.slice(0, nA) + TEXT_B.slice(0, nB)
    x.font = `700 52px ${MONO}`; x.textAlign = 'left'; x.fillStyle = BONE
    const tx = -w / 2 + 54
    x.fillText(s, tx, 4)
    const cw = x.measureText(s).width
    const caretOn = t < T.check && Math.floor(t * 3.2) % 2 === 0
    if (caretOn) { x.fillStyle = GOLD; x.fillRect(tx + cw + 6, -32, 6, 66) }
    // the check
    const ck = pop01(t, T.check, 0.32, 3)
    if (ck > 0) {
      x.fillStyle = MINT; x.beginPath(); x.arc(w / 2 - 74, 0, 42 * ck, 0, Math.PI * 2); x.fill()
      drawPixels(x, BM('......X .....XX X...XX. XX.XX.. .XXX... ..X....'), w / 2 - 74, 2, 7, { X: INK }, { sc: ck })
    }
    x.restore()
    burst(x, t, 540 + w / 2 - 74, cy, T.check, { n: 10, R: 110, size: 22, seed: 2, cols: [MINT, GOLD, BONE] })
  }

  // ── C · the wheel + the Big Three + Venus
  function drawReading(t) {
    if (t < T.wheel[0] || t > T.cOut[1]) return
    const o = popOut(t, T.cOut)
    const wk = easeOutBack(prog(t, ...T.wheel), 1.6) * o
    if (wk > 0) {
      x.save(); x.translate(WC.x, WC.y); x.rotate(t * 0.08); x.scale(0.6 * wk, 0.6 * wk)
      drawWheelH(x, { W: { cx: 0, cy: 0, rOut: 460, rIn: 368, rGlyph: 414, alpha: 0.8 }, k: clamp(wk) })
      x.restore()
    }
    const rolling = t >= T.roll[0] && t < T.roll[1]
    BIG.forEach((b, i) => {
      const k = pop01(t, b.t, 0.34, 2.2) * o
      if (k <= 0) return
      // a gold thread from the centre to each placement
      x.save(); x.globalAlpha = 0.6 * clamp(k); x.strokeStyle = GOLD; x.lineWidth = 4; x.setLineDash([10, 12]); x.lineDashOffset = -t * 40
      x.beginPath(); x.moveTo(WC.x, WC.y); x.lineTo(b.x, b.y); x.stroke(); x.restore()
      const look = t < T.venus[1] ? [0, 0] : [b.x < 540 ? 1 : -1, b.y < 1000 ? 1 : 0]
      const mood = rolling ? 'eyeroll' : t >= T.venus[1] && t < T.l4 ? 'wide' : b.mood
      drawStarChar(x, b.x, b.y, 200, t, { color: b.s.color, glyph: b.s.glyph, mood, look, pop: k, seed: b.seed, hops: [b.t + 0.34, T.venus[1] + 0.02], blink: mood === 'wide' ? false : undefined })
      chip(t, b.label, b.x, b.y - 150, k, b.s.color)
      burst(x, t, b.x, b.y, b.t + 0.2, { n: 8, R: 110, size: 20, seed: i, cols: [b.s.color, BONE] })
    })
    // Venus in Aries: crashes in from the top
    if (t >= T.venus[0]) {
      const f = prog(t, ...T.venus)
      const y = lerp(-200, VEN.y, ease.inQuad(f))
      const sq = t > T.venus[1] ? 0.3 * Math.exp(-(t - T.venus[1]) * 8) * Math.cos((t - T.venus[1]) * 24) : -0.15
      drawStarChar(x, VEN.x, y, 210, t, { color: VEN.s.color, glyph: VEN.s.glyph, mood: t < T.venus[1] ? 'wide' : 'heart', pop: o, seed: 17, squash: sq, hops: VEN_HOPS, blink: false })
      if (t > T.venus[1]) chip(t, VEN.label, VEN.x, VEN.y - 150, pop01(t, T.venus[1], 0.3, 2.4) * o, VEN.s.color)
      burst(x, t, VEN.x, VEN.y + 40, T.venus[1], { n: 14, R: 170, size: 28, seed: 9, cols: [ARI.color, PINK, GOLD, BONE] })
    }
  }
  function chip(t, label, cx, cy, k, col) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const w = x.measureText(label).width + 36
    x.fillStyle = 'rgba(14,8,32,0.92)'; x.beginPath(); x.roundRect(-w / 2, -24, w, 48, 10); x.fill()
    x.strokeStyle = col; x.lineWidth = 3; x.stroke()
    x.fillStyle = BONE; x.fillText(label, 0, 2)
    x.restore()
  }

  // ── D · the deal
  function drawDeck(t, N) {
    if (t < T.deal0) return
    const o = popOut(t, T.out)
    if (o <= 0) return
    DEAL_ORDER.forEach((i, n) => {
      const f = FAN[i], t0 = T.deal0 + n * T.dealGap
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, t0 + 0.38))
      const cx = lerp(N.x, f.x, p), cy = lerp(N.y + 40, f.y, p) - Math.sin(Math.PI * p) * 90
      const rot = lerp(-1.6 * (i % 2 ? 1 : -1), f.rot, p)
      if (i !== 2) { drawCardImg(x, BACK, cx, cy, 300 * lerp(0.4, 1, p), { rot, sc: o }); return }
      // the middle card: lands, lifts forward, flips to the veiled mystery card
      const fp = prog(t, ...T.flip), lift = ease.inOutCubic(fp)
      const ccx = cx, ccy = lerp(cy, 1060, lift), w = lerp(300, 380, lift)
      if (fp < 0.5) drawCardImg(x, BACK, ccx, ccy, w * lerp(0.4, 1, p), { rot: rot * (1 - lift), flip: fp * 2, sc: o })
      else {
        glowAt(x, ccx, ccy, 340, LAV, 0.8 * o)
        drawCardImg(x, MYST, ccx, ccy + Math.sin(t * 2) * 6, w * 1.12, { flip: 2 - fp * 2, sc: o })
      }
    })
    burst(x, t, 540, 1060, T.flip[0] + 0.24, { n: 14, R: 260, size: 28, seed: 4 })
    // Pisces in the corner, overwhelmed
    const pk = pop01(t, T.pisces, 0.36, 2.2) * o
    if (pk > 0) {
      const py = 690
      drawStarChar(x, 150, py, 140, t, { color: PIS.color, mood: 'sparkle', look: [1, -1], pop: pk, seed: 23, blush: 1 })
      drawTears(x, 120, py - 4, 3.4, t, 1.1 * pk, -1, 1); drawTears(x, 160, py - 4, 3.4, t, 1.1 * pk, 1, 2)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) {
        const N = narr(t)
        drawPhoneA(t)
        drawPill(t)
        drawReading(t)
        // the narrator
        const no = popOut(t, T.out)
        if (t >= T.peek && no > 0) {
          const land = t > T.hop[1] && t < T.hop[1] + 0.6 ? 0.25 * Math.exp(-(t - T.hop[1]) * 8) * Math.cos((t - T.hop[1]) * 24) : 0
          drawStarChar(x, N.x, N.y, N.s, t, { color: STAR.sky, ...narrMood(t), hops: HOPS, seed: 2, pop: no, squash: land })
        }
        drawDeck(t, N)
        burst(x, t, 540, 700, T.hop[1], { n: 10, R: 160, size: 24, seed: 3 })
      }
      box1.update(t); box2.update(t); box3.update(t); box4.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card cuts: A→B at 8.3 and C→D at 19.6 (both kept; the B→C change at 13.85 is the pill turning into the wheel)
const CUTS = [{ t: 8.3, kind: 'deal', keep: true }, { t: 19.6, kind: 'flip', keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FX = { rev: 0.1, dly: 0, bus: 'fx' }
const swipeCues = []
for (let n = 0; ; n++) { const ts = T.swipe0 + n * T.swipeGap; if (ts > T.off - 0.05) break; swipeCues.push(['whoosh', +ts.toFixed(3), 0.16, 0.012], ['tick', +(ts + 0.12).toFixed(3), 0.012]) }
const typeCues = (t0, s) => [...s].map((ch, i) => ch === ' ' ? null : ['tick', +(t0 + i * 0.075).toFixed(3), 0.03]).filter(Boolean)
export const CUES = [
  // A
  ...wordPops(T.h0, 3, 0.09, 0, 0.022), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.14, 1318.51, 0.05, 0], ['pluck', T.h0Land + 0.14, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.phone, 0.3, 0.02], ...swipeCues,
  ['whoosh', T.peek, 0.4, 0.025], ['pop', T.peek + 0.45, 987.77, 0.04, 0.5], ['bell', T.peek + 0.5, 1318.51, 0.025, 0.8, 0.5],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0],
  ...talkCues(L1, { cps: CPS, pitch: { [SKY_TAG]: 880 } }),
  ['pop', T.h0b, 880, 0.03, 0], ['pop', T.h0bLand, 1318.51, 0.05, 0], ['pluck', T.h0bLand, 1174.66, 0.04, 0.5, 0],
  ['whoosh', T.hop[0], 0.32, 0.03], ['boom', T.hop[1], 0.12], ['tick', T.hop[1], 0.05], ['glitter', T.hop[1], T.hop[1] + 0.5],
  ['chip', T.off, 1400, 0.4, { slide: -40, gain: 0.03, decay: 0.3, sustain: 0.5, ...FX }],
  ['whoosh', T.drop[0], 0.5, 0.035], ['tom', T.drop[1] - 0.05, 70, { gain: 0.2, decay: 0.3 }],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  // B
  ...wordPops(T.h1, 2, 0.08, 1, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pluck', T.h1Land, 987.77, 0.04, 0.6, 0],
  ['whoosh', T.pill, 0.3, 0.02], ...typeCues(T.typeA, TEXT_A), ...typeCues(T.typeB, TEXT_B),
  ['pop', T.l3 - 0.22, 739.99, 0.04, 0], ...talkCues(L2, { cps: CPS, pitch: { [SKY_TAG]: 880 } }),
  ['pop', T.check, 1318.51, 0.05, 0.3], ['bell', T.check + 0.02, 1760, 0.03, 1.0, 0.3], ['glitter', T.check, T.check + 0.5],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 587.33, 0.03, 0],
  // C
  ['whoosh', T.wheel[0], 0.45, 0.03], ['riser', T.wheel[0], T.venus[0], 0.012],
  ...wordPops(T.h2, 2, 0.08, 2, 0.025), ['pop', T.h2Land, 1318.51, 0.045, 0], ['pluck', T.h2Land, 1174.66, 0.04, 0.6, 0],
  ...T.pops.map((tp, i) => ['pop', +(tp + 0.05).toFixed(3), [987.77, 1174.66, 1318.51][i], 0.05, [-0.4, 0.4, -0.4][i]]),
  ...T.pops.map((tp, i) => ['bell', +(tp + 0.08).toFixed(3), [1318.51, 1567.98, 1760][i], 0.022, 0.8, [-0.4, 0.4, -0.4][i]]),
  ['whoosh', T.venus[0], 0.3, 0.04], ['boom', T.venus[1], 0.16], ['crash', T.venus[1], { gain: 0.03, len: 1.0 }], ['glitter', T.venus[1], T.venus[1] + 0.6],
  ...VEN_HOPS.map((h, i) => ['pop', h, NOTE[(i * 3) % 7] * 2, 0.016, 0.4]),
  ['pop', T.open3, 739.99, 0.04, 0], ...talkCues(L3, { cps: CPS, pitch: { [SKY_TAG]: 880 } }),
  ['chip', T.roll[0], 900, 0.5, { slide: -14, gain: 0.025, decay: 0.4, sustain: 0.5, ...FX }],
  ['pop', T.close3, 880, 0.03, 0], ['pop', T.close3 + 0.07, 587.33, 0.03, 0],
  // D
  ...wordPops(T.h3, 1, 0.08, 3, 0.025), ['pop', T.h3Land, 1318.51, 0.05, 0], ['pluck', T.h3Land, 1174.66, 0.045, 0.6, 0],
  ...DEAL_ORDER.map((i, n) => ['whoosh', +(T.deal0 + n * T.dealGap).toFixed(3), 0.2, 0.018]),
  ...DEAL_ORDER.map((i, n) => ['tick', +(T.deal0 + n * T.dealGap + 0.36).toFixed(3), 0.04]),
  ['whoosh', T.flip[0], 0.4, 0.03], ['bell', T.flip[0] + 0.24, 1318.51, 0.04, 1.2, 0], ['bell', T.flip[0] + 0.3, 1760, 0.03, 1.2, 0], ['glitter', T.flip[0] + 0.2, T.flip[1] + 0.3],
  ['chip', T.pisces + 0.2, 3000, 0.07, { wave: 'noise', slide: 30, gain: 0.018, decay: 0.05, sustain: 0.5, ...FX }],
  ['chip', T.pisces + 0.38, 3600, 0.08, { wave: 'noise', slide: 30, gain: 0.018, decay: 0.05, sustain: 0.5, ...FX }],
  ['pop', T.open4, 739.99, 0.04, 0], ...talkCues(L4, { cps: CPS, pitch: { [SKY_TAG]: 880 } }),
  ...wordPops(T.h4, 6, 0.09, 1, 0.024), ['pluck', T.h4 + 0.2, 1318.51, 0.045, 0.7, 0],
  ['pop', T.close4, 880, 0.03, 0], ['pop', T.close4 + 0.07, 587.33, 0.03, 0],
  ['pop', T.wink, 1567.98, 0.035, 0], ['bell', T.wink + 0.04, 2093, 0.02, 0.8, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
