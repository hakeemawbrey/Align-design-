// srl02moon (20 s vertical, Star Talk Remix of the "Moon" loop L02) · story 0–15.6, then the shared end card.
// The loop's image (the moon running full → new → full with phase glyphs orbiting it) becomes a time-lapse of a ♋
// Cancer star (ruled by the Moon) waiting on a text for one whole lunar cycle.
//   0.00–5.50  "Still on *read.*"  A full moon, the phase ring, a DAY counter. The Cancer star stares at its phone.
//              The moon whips full → new → full while DAY 1 → DAY 29 ticks: day 1 hopeful (sparkle eyes), new moon
//              dozing (z's), day 29 a cobweb across star and phone. ♓ Pisces cries in the corner. BZZT: the phone lights
//              up… "full moon tonight". Womp.
//   5.50–8.30  THE STARS (gold, pops in): "babe. that was a whole moon cycle."
//   8.30–11.4  "The moon | starts *over.*" → "A new deck, | *every* night."  THE STARS: "the moon starts over. so can
//              *you.*" The Cancer star looks up, tosses the phone (poof), the cobweb blows away; tonight's deck deals
//              three cards across the moon. Heart-eyes.
//  11.55       card cut (flip).
//  11.70–15.5  "Tonight's moon | says: *next.*"  The full moon glows, the cards fan, Cancer winks.
// One canvas (sky + moon + ring + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas, drawMoon } from '../../sky.js'
import { drawMoonGlyph, litOf } from '../../../src/scenes/fx-moon.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MOONC = '#dfe6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const CAN = signStar('cancer'), PIS = signStar('pisces')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.4, canIn: 0.35, lapse: [1.25, 4.45], doze: [2.35, 3.6], web: [3.9, 4.4], pisIn: 2.2,
  buzz: 4.75, notif: 4.82, womp: 5.3, h0Out: [8.1, 8.3],
  guideIn: 5.45, open: 5.6, l1: 5.75,
  h1: 8.45, h1Land: 8.8, l2: 8.5, lookUp: 8.6, toss: [9.2, 9.6], webOff: 9.25, h1Out: [9.6, 9.78],
  h3: 9.85, h3Land: 10.25, deal: 9.9, dealGap: 0.22, heartEyes: 10.5,
  close: 11.3, h3Out: [11.15, 11.35],
  cut: 11.55,
  h2: 11.7, h2Land: 12.15, wink: [13.3, 13.8], h2Out: [15.1, 15.42], out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'babe. that was a whole *moon cycle.*' },
  { t: T.l2, speaker: SPEAK, text: 'the moon starts over. so can *you.*' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const MOON = { x: 540, y: 772, R: 200 }, RING = 300, N = 8
const CANS = { x: 420, y: 1250, size: 260 }
const GUIDE = { x: 868, y: 1196, size: 196 }
const PHONE = { x: 598, y: 1272 }
const PISC = { x: 150, y: 1050, size: 120 }
const lapseK = t => ease.inOutCubic(prog(t, ...T.lapse))
const moonP = t => 0.5 + lapseK(t)                     // full → new → full (0.5 → 1.5)
const dayOf = t => 1 + Math.round(28 * lapseK(t))

// ── pixel bits
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const TEAR = ['.B.', 'BBB', '.B.']
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

const CAN_HOPS = [T.canIn + 0.3, T.buzz + 0.02, T.toss[0], T.heartEyes, T.h2Land]
const GUIDE_HOPS = [T.guideIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
function canState(t) {
  if (t < T.lapse[0]) return { mood: 'sparkle', look: [1, 1] }                       // day 1: any minute now
  if (t < T.doze[0]) return { mood: 'neutral', look: [1, 1] }
  if (t < T.doze[1]) return { mood: 'sleepy', look: [0, 0] }                         // new moon: dozing by the phone
  if (t < T.buzz) return { mood: 'neutral', look: [1, 1], blink: false }             // day 29: still staring
  if (t < T.womp) return { mood: 'wide', look: [1, 1], blink: false }                // BZZT!
  if (t < T.l1 + 0.5) return { mood: 'squint', look: [1, 1] }                        // …full moon tonight. great.
  if (t < T.lookUp) return { mood: 'neutral', look: [1, -1] }                        // listens to the stars
  if (t < T.heartEyes) return { mood: 'wide', look: [0, -1], blink: false }          // looks up at the moon
  if (t < T.h2) return { mood: 'heart' }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  return { mood: 'happy', look: [0, 0] }
}
function guideState(t) {
  if (t < T.l2) return { mood: 'squint', look: [-1, 0] }
  if (t < T.deal) return { mood: 'happy' }
  if (t < T.h2) return { mood: 'sparkle', look: [-1, -1] }
  return { mood: 'happy', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 64px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const BACK = bake(await loadImg('card-back.png'), 220)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // the DAY counter under the headline
  const day = el('div', { position: 'absolute', left: 0, width: '1080px', top: '366px', textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '46px',
    letterSpacing: '0.3em', color: GOLD, textShadow: '0 2px 14px rgba(6,4,18,0.95)', opacity: 0 }, root, 'DAY 1')

  // ── type
  const H0 = popText(root, 'Still on *read.*', { top: 190, size: 118, accentSize: 176, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: '#9fd8ff' })
  const H1 = popText(root, 'The moon | starts *over.*', { top: 196, size: 112, accentSize: 168, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: MOONC })
  const H3 = popText(root, 'A new deck, | *every* night.', { top: 196, size: 112, accentSize: 168, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Tonight’s moon | says: *next.*', { top: 196, size: 112, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H3, T.h3Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1404, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawMoonSet(t) {
    const ok = popOut(t, T.out) * clamp(t / 0.6)
    if (ok <= 0) return
    const p = moonP(t), lit = litOf(p)
    const spin = TAU * lapseK(t)                                   // the ring whips round once during the time-lapse
    const beat = Math.exp(-(((t - 0.6) % 0.5556 + 0.5556) % 0.5556) * 6)
    x.save(); x.globalAlpha = ok
    // tides of light rolling out of the limb
    for (let j = 0; j < 3; j++) {
      const q = (((t - 0.6) / 1.111 - j / 3) % 1 + 1) % 1
      x.globalAlpha = ok * (1 - q) ** 1.6 * (0.1 + 0.2 * lit); x.strokeStyle = '#d9cdf0'; x.lineWidth = 2.5 - 1.5 * q
      x.beginPath(); x.arc(MOON.x, MOON.y, MOON.R + 16 + q * 420, 0, TAU); x.stroke()
    }
    x.globalAlpha = ok
    drawMoon(x, MOON.x, MOON.y, MOON.R, p, { glow: 1 + 0.4 * beat + (t > T.h2 ? 0.4 : 0), earthshine: 0.75, darkAlpha: 0.95 })
    x.globalAlpha = ok * (1 - lit) * 0.3; x.strokeStyle = '#c9bce4'; x.lineWidth = 2
    x.beginPath(); x.arc(MOON.x, MOON.y, MOON.R - 1, 0, TAU); x.stroke()
    // the phase ring + a gold "now" comet
    x.globalAlpha = ok * 0.22; x.strokeStyle = BONE; x.lineWidth = 1.2
    x.beginPath(); x.arc(MOON.x, MOON.y, RING, 0, TAU); x.stroke()
    const nowA = -Math.PI / 2 + TAU * ((p % 1) + 0)
    for (let s = 0; s < 36; s++) {
      x.globalAlpha = ok * 0.75 * (1 - s / 36) ** 2; x.strokeStyle = GOLD; x.lineWidth = 3
      x.beginPath(); x.arc(MOON.x, MOON.y, RING, nowA - (s + 1) * 0.02, nowA - s * 0.02); x.stroke()
    }
    for (let i = 0; i < N; i++) {
      const u = i / N, a = -Math.PI / 2 + TAU * u + spin * 0
      const gx2 = MOON.x + Math.cos(a) * RING, gy2 = MOON.y + Math.sin(a) * RING
      let d = Math.abs(u - (p % 1)); d = Math.min(d, 1 - d)
      const near = Math.exp(-(d * d) / 0.0025)
      x.globalAlpha = ok * 0.6; x.fillStyle = '#0d0a2a'; x.beginPath(); x.arc(gx2, gy2, 30, 0, TAU); x.fill()
      x.globalAlpha = ok
      drawMoonGlyph(x, gx2, gy2, 24 + 6 * near, u, { alpha: 0.55 + 0.45 * near, lw: 1.6, discAlpha: 0.1, fillAlpha: 0.85 + 0.15 * near, glow: 0.3 + 1.4 * near, color: near > 0.5 ? '#fff3e0' : BONE })
    }
    x.restore()
  }

  function drawPhone(t, rc) {
    const tp = prog(t, ...T.toss)
    if (tp >= 1 || !rc) return
    const a = clamp((t - T.canIn - 0.2) / 0.25) * (1 - prog(t, T.toss[1] - 0.08, T.toss[1]))
    const shake = t > T.buzz && t < T.buzz + 0.5 ? Math.sin((t - T.buzz) * 90) * 7 * (1 - (t - T.buzz) / 0.5) : 0
    const px = PHONE.x + shake + ease.inQuad(tp) * 380, py = PHONE.y - Math.sin(Math.PI * tp) * 300 - tp * 120
    const rot = 0.1 + tp * 10
    const lightUp = t > T.buzz && t < T.toss[0] ? 1 : 0.55
    x.save(); x.globalAlpha = a; x.translate(px, py); x.rotate(rot)
    const w = 84, h = 150
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#2a2050'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = `rgba(159,230,255,${0.35 + 0.5 * lightUp})`; x.fillRect(-w / 2 + 8, -h / 2 + 14, w - 16, h - 34)
    // their last bubble, then ours, marked "Read"
    x.fillStyle = BONE; x.fillRect(-w / 2 + 14, -h / 2 + 24, 40, 14)
    x.fillStyle = '#7c74f0'; x.fillRect(w / 2 - 14 - 46, -h / 2 + 48, 46, 14); x.fillRect(w / 2 - 14 - 34, -h / 2 + 68, 34, 14)
    x.fillStyle = INK; x.font = "700 13px 'Space Mono'"; x.textAlign = 'right'; x.fillText('Read', w / 2 - 12, -h / 2 + 98)
    x.restore()
    if (tp <= 0 && t > T.buzz && t < T.toss[0]) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(px, py, 0, px, py, 160); g.addColorStop(0, 'rgba(159,230,255,0.35)'); g.addColorStop(1, 'rgba(159,230,255,0)')
      x.fillStyle = g; x.fillRect(px - 160, py - 160, 320, 320); x.restore()
    }
  }

  function drawNotif(t) {
    const pin = pop01(t, T.notif, 0.3, 2.4), pout = popOut(t, [T.l1 + 0.6, T.l1 + 0.9])
    if (pin <= 0.01 || pout <= 0) return
    const s = pin * pout * 1.35, cx = 650, cy = 1112
    x.save(); x.translate(cx, cy); x.scale(s, s)
    const w = 380, h = 74
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
    x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
    drawMoon(x, -w / 2 + 40, 0, 20, 0.5, { glow: 0, earthshine: 0.6 })
    x.fillStyle = INK; x.font = "700 26px 'Space Mono'"; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('full moon tonight', -w / 2 + 74, 2)
    x.restore()
  }

  function drawWeb(t, rc) {
    const k = clamp((t - T.web[0]) / (T.web[1] - T.web[0])), off = prog(t, T.webOff, T.webOff + 0.5)
    if (k <= 0 || off >= 1 || !rc) return
    const blow = ease.inQuad(off)
    // a corner web strung from the star's upper-left tip, and one over the phone
    const webs = [{ x: rc.x - 128, y: rc.y - 110, r: 92, a0: 0, a1: Math.PI / 2 }, { x: PHONE.x + 48, y: PHONE.y - 82, r: 70, a0: Math.PI / 2, a1: Math.PI }]
    x.save(); x.globalAlpha = 0.7 * k * (1 - blow); x.strokeStyle = BONE; x.lineWidth = 2
    for (const wb of webs) {
      const ox = wb.x - blow * 200, oy = wb.y - blow * 160
      for (let s = 0; s <= 4; s++) { const a = lerp(wb.a0, wb.a1, s / 4); x.beginPath(); x.moveTo(ox, oy); x.lineTo(ox + Math.cos(a) * wb.r * k, oy + Math.sin(a) * wb.r * k); x.stroke() }
      for (let r = 1; r <= 3; r++) {
        x.beginPath()
        for (let s = 0; s <= 4; s++) { const a = lerp(wb.a0, wb.a1, s / 4), rr = wb.r * k * r / 3.4 * (s % 2 ? 0.88 : 1); const px = ox + Math.cos(a) * rr, py = oy + Math.sin(a) * rr; s ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke()
      }
    }
    x.restore()
  }

  function drawDeck(t) {
    if (!BACK) return
    const ok = popOut(t, T.out)
    for (let i = 0; i < 3; i++) {
      const t0 = T.deal + i * T.dealGap, p = prog(t, t0, t0 + 0.42)
      if (p <= 0) continue
      const e = easeOutBack(p, 1.4)
      const tx = MOON.x + (i - 1) * 150, ty = MOON.y + 168 + Math.abs(i - 1) * 22
      const cx = lerp(MOON.x, tx, e), cy = lerp(-200, ty, ease.outCubic(p)) + Math.sin(t * 2 + i) * 5
      const rot = lerp(-0.8, (i - 1) * 0.2, e)
      const w = 168 * ok, h = BACK.height / BACK.width * w
      x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha = ok
      x.drawImage(BACK, -w / 2, -h / 2, w, h); x.restore()
    }
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.17, life = 1.0
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 220 + Math.sin(p * 7 + i) * 14), Math.round(cy - 50 - p * 220), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawPisces(t) {
    const pp = pop01(t, T.pisIn, 0.36, 2.2) * popOut(t, [T.l2, T.l2 + 0.3])
    if (pp <= 0.02) return
    const r = drawStarChar(x, PISC.x, PISC.y, PISC.size, t, { color: PIS.color, mood: 'squint', look: [1, 0], pop: pp, seed: 21, glow: 0.7, bob: 4, squash: 0.04 * Math.sin(t * 14) })
    for (let k = 0; k < 4; k++) {
      const ph = ((t - T.pisIn) * 1.6 + k * 0.25) % 1, side = k % 2 ? 1 : -1
      drawBits(x, TEAR, { B: '#8fd8ff' }, Math.round(r.x + side * (22 + ph * 40)), Math.round(r.y - 6 + ph * ph * 90 - Math.sin(Math.PI * ph) * 18), 4, { alpha: pp * Math.sin(Math.PI * ph) })
    }
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    const cp = pop01(t, T.canIn, 0.38, 2.2) * ok
    let rc = null
    if (cp > 0.02) {
      const st = canState(t)
      const deflate = t > T.womp && t < T.l1 + 0.6 ? 0.14 * ease.outCubic(prog(t, T.womp, T.womp + 0.5)) : 0
      const jolt = t > T.buzz && t < T.buzz + 0.4 ? -0.12 * Math.exp(-(t - T.buzz) * 8) * Math.cos((t - T.buzz) * 20) : 0
      const glum = t > T.lapse[0] && t < T.lookUp ? 0.05 * prog(t, T.lapse[0], T.lapse[1]) : 0
      rc = drawStarChar(x, CANS.x, CANS.y, CANS.size, t, { color: CAN.color, glyph: CAN.glyph, ...st, hops: CAN_HOPS, pop: cp, squash: deflate + jolt + glum, seed: 4, glow: 1.0 + (t > T.heartEyes ? 0.3 : 0) })
      if (t > T.heartEyes) floatHearts(t, rc.x, rc.y, T.heartEyes, T.heartEyes + 0.9, 2)
    }
    const gp = pop01(t, T.guideIn, 0.36, 2.2) * ok
    if (gp > 0.02) {
      const r = drawStarChar(x, GUIDE.x, GUIDE.y, GUIDE.size, t, { color: STAR.sky, ...guideState(t), hops: GUIDE_HOPS, pop: gp, seed: 9, glow: 1.1 })
      sparkles(t, r.x, r.y, T.guideIn, 8, 140, 0.4)
    }
    return rc
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const lit = litOf(moonP(t))
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, moon: null, dim: (base.dim ?? 1) * lerp(0.62, 1, lit) })
      if (t < T.out[1] + 0.02) {
        drawMoonSet(t)
        drawDeck(t)
        drawPisces(t)
        const rc = drawStars(t)
        drawPhone(t, rc)
        drawWeb(t, rc)
        drawNotif(t)
        if (t > T.toss[1] - 0.1 && t < T.toss[1] + 0.7) sparkles(t, PHONE.x + 380, PHONE.y - 420, T.toss[1] - 0.05, 8, 60, 1, [BONE, '#9fe6ff'])
      }
      const dk = clamp((t - 0.9) / 0.25) * (1 - prog(t, T.l1, T.l1 + 0.3))
      day.style.opacity = String(dk)
      const txt = 'DAY ' + dayOf(t)
      if (day.textContent !== txt) day.textContent = txt
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 11.55 (box shut → "Tonight's moon says: next."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in the D-major palette and shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const womp = t0 => [[329.63, 0, 0.3], [311.13, 0.34, 0.3], [293.66, 0.68, 0.3], [277.18, 1.02, 1.0]].map(([f, d, len]) => ['lead', +(t0 + d).toFixed(3), f, len, { wave: 'saw', gain: 0.045, cutoff: 1300, env: 500, envDecay: 4, vib: d > 1 ? 0.018 : 0.006, vibRate: 5.5, decay: 0.3, sustain: 0.85, release: 0.12, rev: 0.18, dly: 0, bus: 'fx' }])
// day ticks during the time-lapse (one per counted day, quieter in the middle)
const dayTicks = []
for (let d = 2, last = -1; d <= 29; d++) {
  // find the time this day appears (pure search over the lapse curve)
  for (let tt = T.lapse[0]; tt <= T.lapse[1] + 0.01; tt += 0.01) { if (dayOf(tt) >= d) { if (tt - last > 0.06) { dayTicks.push(['tick', +tt.toFixed(3), 0.018]); last = tt } break } }
}
export const CUES = [
  ...head(T.h0, 2, 0.1, T.h0Land, 0),
  ['bell', 0.2, 739.99, 0.035, 2.2, 0], ['glitter', 0.1, 0.6],
  ['pop', T.canIn + 0.05, 739.99, 0.04, -0.2], ['pop', T.canIn + 0.3, 987.77, 0.03, -0.2],
  // the time-lapse: full → new → full
  ['riser', T.lapse[0], T.lapse[0] + 1.5, 0.05], ...dayTicks,
  ['bell', (T.lapse[0] + T.lapse[1]) / 2, 293.66, 0.035, 2.2, 0],
  ['pop', T.pisIn + 0.05, 987.77, 0.025, -0.5],
  ['whoosh', T.web[0], 0.5, 0.02],
  ['bell', T.lapse[1], 739.99, 0.035, 2, 0], ['glitter', T.lapse[1] - 0.1, T.lapse[1] + 0.4],
  // BZZT … full moon tonight. womp.
  ...[0, 0.09, 0.18, 0.27].map(d => ['chip', +(T.buzz + d).toFixed(3), 110, 0.07, { wave: 'square', duty: 0.5, gain: 0.03, decay: 0.05, sustain: 0.8, ...FXO }]),
  ['pop', T.notif + 0.05, 1318.51, 0.04, 0.3],
  ...womp(T.womp),
  // the stars
  ['pop', T.guideIn + 0.05, 1174.66, 0.04, 0.4], ['glitter', T.guideIn, T.guideIn + 0.4],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // the moon starts over: look up, toss the phone, the deck deals
  ...head(T.h1, 3, 0.08, T.h1Land, 2),
  ['bell', T.lookUp, 1174.66, 0.025, 1.6, 0],
  ['whoosh', T.toss[0], 0.5, 0.045], ['pop', T.toss[1] - 0.04, 1318.51, 0.04, 0.5], ['whoosh', T.webOff, 0.4, 0.025],
  ...head(T.h3, 4, 0.08, T.h3Land, 1),
  ...[0, 1, 2].map(i => ['whoosh', +(T.deal + i * T.dealGap).toFixed(3), 0.3, 0.03]),
  ...[0, 1, 2].map(i => ['pop', +(T.deal + i * T.dealGap + 0.3).toFixed(3), NOTE[i * 2], 0.035, (i - 1) * 0.4]),
  ['pluck', T.heartEyes, 1174.66, 0.045, 0.5, -0.2], ['pluck', T.heartEyes + 0.12, 1567.98, 0.04, 0.5, -0.2], ['glitter', T.heartEyes, T.heartEyes + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // tonight's moon says: next.
  ...head(T.h2, 3, 0.09, T.h2Land, 3),
  ['bell', T.h2Land + 0.05, 1760, 0.025, 1.6, 0],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, -0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
