// sr06newdeck (20 s vertical Align ad, Star Talk Remix of teaser 06 "A new deck every night") · story 0–15.6, then the end card.
//   0.00–4.90  "Midnight. | *New deck.*"  THE STARS is the dealer tonight: the gold star in a green dealer's visor and a red
//              bow tie. A deck drops onto the night sky; the dealer cuts it twice, riffles it, then shows off with a
//              card spring right over its own head (and back into the deck, mostly by luck).
//              Drop (2.82): box (THE STARS): "midnight. new deck. *let's deal.*"
//   4.90–8.50  "Six cards | a *night.*"  Six cards deal out, one by one, into a fan. Box: "six cards a night. not an
//              *endless* scroll."  The fan turns over card by card: five mystery profile cards (no photos) and one sign
//              from the sky (the "Second look" event card), as in the original.
//   8.50–12.6  "Five people. | *One sign.*"  A little lilac YOU star pops up and begs with a pixel bubble: "more?"
//              Pisces sobs at how pretty the hand is. The dealer squints. Box: "that's the hand. *tomorrow,* we deal again."
//  12.70       card cut (flip).
//  12.80–15.5  "Every night, the | stars *deal* again."  The fan glitters; the dealer tips its visor with a wink; YOU heart-eyed.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// One canvas (sky + deck + fan + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
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
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', YOU = '#b9a8ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const PIS = signStar('pisces')

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.75, 4.95],
  deckIn: [0.25, 0.6], dealerIn: 0.5, cut1: [1.0, 1.5], cut2: [1.6, 2.1], riffle: [2.2, 2.85], spring: [3.05, 3.75],
  open: 2.62, l1: 2.82,
  deal0: 4.95, dealGap: 0.24, fly: 0.42,
  h1: 5.0, h1Land: 5.35, h1Out: [8.3, 8.5], l2: 5.6,
  flip0: 7.35, flipGap: 0.2, flipLen: 0.3,
  h2: 8.55, h2Land: 8.9, h2Out: [12.45, 12.65],
  youIn: 8.85, beg: [9.1, 9.75], squint: 9.4, l3: 9.7, pisces: [8.7, 11.4],
  close: 12.6, cut: 12.7,
  h3: 12.8, h3Land: 13.3, tip: [13.6, 14.3], out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "midnight. new deck. *let's deal.*" },
  { t: T.l2, speaker: SPEAK, text: 'six cards a night. not an *endless* scroll.' },
  { t: T.l3, speaker: SPEAK, text: "that's the hand. *tomorrow,* we deal again." },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── pixel props
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const DROP = ['.X.', 'XWX', 'XXX', '.X.']
const VISOR = ['..GGGGGGGGGGG..', '.GGgggggggggGG.', 'GGGGGGGGGGGGGGG', '..LLLLLLLLLLL..']
const VISOR_C = { G: '#2fb36b', g: '#5fe39a', L: 'rgba(120,255,170,0.55)' }
const BOW = ['RR...RR', 'RRR.RRR', 'RRRKRRR', 'RRR.RRR', 'RR...RR']
const BOW_C = { R: '#e8384f', K: '#ff8a9a' }
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
const CW = 200, CH = 319                                   // a dealt card (body)
const DECK = { x: 400, y: 1160 }, DW = 190, DN = 10       // the deck: DN visible card backs
const DEALER = { x: 790, y: 1195, s: 240 }, DEALER_C = { x: 560, y: 1215, s: 250 }
const YOU_P = { x: 175, y: 1230, s: 170 }
const FACES = ['card-profile-1', 'card-profile-2', 'card-profile-3', 'card-profile-4', 'card-profile-5', 'card-event']
const FAN = Array.from({ length: 6 }, (_, i) => { const u = i - 2.5; return { x: 540 + u * 140, y: 830 + u * u * 9, rot: u * 0.085 } })
const dealAt = k => T.deal0 + k * T.dealGap
const flipAt = k => T.flip0 + k * T.flipGap + (k === 5 ? 0.15 : 0)

const DEALER_HOPS = [T.dealerIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS }), T.spring[1], T.h3Land, T.tip[0] + 0.1]
function dealerState(t) {
  if (t < T.riffle[0]) return { mood: 'happy', look: [-1, 0] }
  if (t < T.spring[0]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.spring[1]) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.l1 + 1.2) return { mood: 'happy', look: [0, 0] }
  if (t < T.deal0) return { mood: 'wink' }
  if (t < T.flip0) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.squint) return { mood: 'happy', look: [-1, -1] }
  if (t < T.l3 + 0.9) return { mood: 'squint', look: [-1, 0] }
  if (t < T.cut) return { mood: 'happy', look: [-1, 0] }
  if (t < T.tip[0]) return { mood: 'happy', look: [0, 0] }
  return { mood: 'wink' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = ASSETS + src + '.png' })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const ims = await Promise.all(['card-back', ...FACES].map(loadImg))
  const BACK = bake(ims[0], 420), FRONTS = ims.slice(1).map(im => bake(im, 420))
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496      // body width / image width (glow margins around)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Midnight. | *New deck.*', { top: 210, size: 116, accentSize: 172, at: T.h0, gap: 0.12, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h0 + 0.35 })
  const H1 = popText(root, 'Six cards | a *night.*', { top: 190, size: 116, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: LAV })
  const H2 = popText(root, 'Five people. | *One sign.*', { top: 190, size: 112, accentSize: 170, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: PINK })
  const H3 = popText(root, 'Every night, the | stars *deal* again.', { top: 180, size: 104, accentSize: 156, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: GOLD, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawCardImg(img, frac, cx, cy, w, rot = 0, sx = 1, alpha = 1) {
    if (!img) return
    const iw = w / frac, ih = iw * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(Math.max(0.004, sx), 1)
    x.drawImage(img, -iw / 2, -ih / 2, iw, ih)
    x.restore()
  }

  // the deck: card i (0 = bottom … DN-1 = top). Returns its pose, or null once it's been dealt.
  function deckCard(t, i) {
    const base = { x: DECK.x + i * 0.6, y: DECK.y - i * 3, rot: -0.03, z: i }
    // cut: the top half lifts away to the right and slides under (twice)
    for (const [a, b] of [T.cut1, T.cut2]) {
      const p = prog(t, a, b)
      if (p > 0 && p < 1 && i >= DN / 2) {
        const k = ease.inOutCubic(p)
        return { x: base.x + Math.sin(Math.PI * k) * 170, y: base.y - Math.sin(Math.PI * k) * 120 + k * DN / 2 * 3, rot: base.rot + Math.sin(Math.PI * k) * 0.3, z: i - k * DN }
      }
    }
    // riffle: split left/right, then fall back in alternately
    const r = prog(t, ...T.riffle)
    if (r > 0 && r < 1) {
      const side = i % 2 ? 1 : -1, split = Math.sin(Math.PI * Math.min(1, r * 2.2))
      const fall = clamp((r - 0.45 - i * 0.04) / 0.12)
      return { x: base.x + side * 120 * split * (1 - fall), y: base.y - 40 * split * (1 - fall), rot: base.rot + side * 0.35 * split * (1 - fall), z: i }
    }
    // spring: the top six arc over the dealer's head and drop back on
    const s = prog(t, ...T.spring)
    if (s > 0 && s < 1 && i >= DN - 6) {
      const j = i - (DN - 6), p = clamp((s - j * 0.06) / 0.62)
      if (p > 0 && p < 1) return { x: lerp(base.x, base.x, p) + Math.sin(Math.PI * p) * 300, y: base.y - Math.sin(Math.PI * p) * 420, rot: base.rot + p * Math.PI * 2, z: 50 + j }
    }
    return base
  }

  function drawDeckAndFan(t) {
    const ok = popOut(t, T.out)
    const din = ease.outBack(prog(t, ...T.deckIn))
    const deckGone = 1 - clamp(prog(t, dealAt(5) + 0.3, dealAt(5) + 0.7))      // the rest of the deck slides off once dealt
    // deck
    if (din > 0 && deckGone > 0 && t < T.cut) {
      const poses = []
      for (let i = 0; i < DN; i++) {
        const dealtK = DN - 1 - i                    // the top card deals first
        if (dealtK < 6 && t >= dealAt(dealtK)) continue
        const p = deckCard(t, i)
        poses.push({ ...p, y: p.y - (1 - din) * 900 + (1 - deckGone) * 500 })
      }
      poses.sort((a, b) => a.z - b.z).forEach(p => drawCardImg(BACK, BACK_BODY, p.x, p.y, DW, p.rot, 1, clamp(deckGone * 1.5)))
    }
    // dealt cards flying to the fan, then flipping
    for (let k = 0; k < 6; k++) {
      const t0 = dealAt(k)
      if (t < t0) continue
      const f = FAN[k], p = ease.outCubic(prog(t, t0, t0 + T.fly))
      const sx0 = DECK.x, sy0 = DECK.y - (DN - 1 - k) * 3
      let cx = lerp(sx0, f.x, p), cy = lerp(sy0, f.y, p) - Math.sin(Math.PI * p) * 160, w = lerp(DW, CW, p), rot = lerp(-0.03, f.rot, p) + Math.sin(Math.PI * p) * 0.6
      if (t >= T.cut) { cy += Math.sin(t * 1.8 + k) * 6 }
      const fp = prog(t, flipAt(k), flipAt(k) + T.flipLen)
      const sx = Math.abs(Math.cos(Math.PI * fp)), face = fp >= 0.5
      const lift = Math.sin(Math.PI * fp) * 26
      if (face) drawCardImg(FRONTS[k], FACE_BODY, cx, cy - lift, w * (1 + 0.06 * Math.sin(Math.PI * fp)), rot, sx, ok)
      else drawCardImg(BACK, BACK_BODY, cx, cy - lift, w, rot, sx, ok)
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 6) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.17, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      const hx = cx + side * 180 + Math.sin(p * 7 + i) * 18, hy = cy - 50 - p * 220
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  function tears(t, ex, ey, t0, t1, b) {
    for (let i = 0; i < 18; i++) {
      const born = t0 + i * 0.13
      if (born > t1) break
      const d = t - born
      if (d < 0 || d > 0.6) continue
      const side = i % 2 ? 1 : -1
      drawBits(x, DROP, { X: '#7fd6ff', W: '#e9f7ff' }, Math.round(ex + side * 22 * b + side * d * 40), Math.round(ey + 10 + d * 100 + d * d * 160), 4 * b, { alpha: 1 - d / 0.6 })
    }
  }

  function drawDealer(t) {
    const ok = popOut(t, T.out)
    const pin = pop01(t, T.dealerIn, 0.38, 2.2) * ok
    if (pin <= 0.02) return null
    const u = t >= T.cut ? 1 : 0
    const P = u ? DEALER_C : DEALER
    const sp = prog(t, ...T.spring), duck = sp > 0 && sp < 1 ? 0.14 * Math.sin(Math.PI * sp) : 0     // ducks as cards fly overhead
    const st = dealerState(t)
    const r = drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, ...st, hops: DEALER_HOPS, pop: pin, squash: duck, seed: 3, glow: 1.1 })
    // the visor (tipped at the end) and the bow tie
    const cell = P.s * pin / 28
    const tp = prog(t, ...T.tip), tip = Math.sin(Math.PI * tp)
    drawBits(x, VISOR, VISOR_C, Math.round(r.x), Math.round(r.y - P.s * 0.16 - tip * P.s * 0.14), cell * 0.95, { rot: -0.08 - tip * 0.35 })
    drawBits(x, BOW, BOW_C, Math.round(r.x), Math.round(r.y + P.s * 0.2), cell * 0.85)
    return r
  }

  function drawYou(t) {
    const ok = popOut(t, T.out)
    const pin = pop01(t, T.youIn, 0.4, 2.2) * ok
    if (pin <= 0.02) return null
    const beg = prog(t, ...T.beg)
    const mood = t < T.beg[0] ? 'wide' : t < T.l3 + 1.0 ? 'sparkle' : t < T.cut ? 'neutral' : 'heart'
    const r = drawStarChar(x, YOU_P.x, YOU_P.y, YOU_P.s, t, { color: YOU, mood, look: t < T.cut ? [1, -1] : [1, -1], pop: pin, seed: 9, hops: [T.youIn + 0.4, T.beg[0] + 0.05, T.beg[0] + 0.3, T.beg[0] + 0.55, T.h3Land + 0.1], glow: 0.9, blush: mood === 'sparkle' ? 1 : undefined })
    // the "more?" bubble
    const a = beg > 0 && t < T.l3 + 1.4 ? pop01(t, T.beg[0], 0.25, 2.4) * (1 - prog(t, T.l3 + 1.2, T.l3 + 1.4)) : 0
    if (a > 0.01) {
      const bx = r.x + 40, by = r.y - 150
      x.save(); x.translate(bx, by); x.scale(a, a); x.rotate(-0.05)
      x.fillStyle = INK; x.beginPath(); x.roundRect(-104, -46, 208, 92, 12); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.roundRect(-98, -40, 196, 80, 8); x.fill()
      x.beginPath(); x.moveTo(-50, 38); x.lineTo(-70, 70); x.lineTo(-24, 38); x.closePath(); x.fill()
      x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('more?', 0, 2 + Math.sin(t * 20) * (t < T.beg[1] ? 3 : 0))
      x.restore()
    }
    return r
  }

  function drawPisces(t) {
    const [a, b] = T.pisces
    const k = ease.outBack(prog(t, a, a + 0.35)) * (1 - ease.inQuad(prog(t, b - 0.3, b)))
    if (k <= 0.01) return
    const r = drawStarChar(x, 985, lerp(1360, 1240, k), 110, t, { color: PIS.color, mood: 'sparkle', look: [-1, -1], seed: 12, hops: [a + 0.4, a + 1.1, a + 1.7], glow: 0.8, tips: false, alpha: clamp(k) })
    tears(t, r.x, r.y, a + 0.3, b - 0.3, 0.85)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        if (t < T.cut) drawPisces(t)
        const dl = drawDealer(t)
        drawDeckAndFan(t)
        for (let k = 0; k < 6; k++) if (t < T.cut) sparkles(t, FAN[k].x, FAN[k].y, flipAt(k) + T.flipLen * 0.5, 6, 110, k, k === 5 ? [PINK, GOLD, BONE] : [GOLD, BONE, LAV])
        if (t < T.cut) sparkles(t, DECK.x + 150, DECK.y - 300, T.spring[1] - 0.05, 8, 120, 2)
        if (t >= T.cut) for (let k = 0; k < 6; k++) { const tw = (t * 0.7 + k * 0.37) % 1; if (tw < 0.15) { x.save(); x.globalAlpha = Math.sin(Math.PI * tw / 0.15); drawPixelStar(x, FAN[k].x + 70, FAN[k].y - 150, 34, 2, '#fffbe8'); x.restore() } }
        const yu = drawYou(t)
        if (yu && t > T.h3Land) floatHearts(t, yu.x, yu.y, T.h3Land, T.out[0], 4)
        if (dl && t >= T.tip[1]) sparkles(t, dl.x, dl.y - 120, T.tip[1] - 0.2, 8, 90, 3, [GOLD, '#5fe39a', BONE])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: 12.70 (box shut → "Every night, the stars deal again."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [392, 440, 466.16, 523.25, 587.33, 698.46, 783.99]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const riffleTicks = Array.from({ length: DN }, (_, i) => ['tick', +(T.riffle[0] + (0.45 + i * 0.04) * (T.riffle[1] - T.riffle[0])).toFixed(3), 0.035 + (i % 2) * 0.01])
const springTicks = Array.from({ length: 6 }, (_, j) => ['tick', +(T.spring[0] + (j * 0.06 + 0.62) * (T.spring[1] - T.spring[0])).toFixed(3), 0.04])
export const CUES = [
  // hook: deck drops, the dealer, cuts, riffle, spring
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.35, 783.99, 0.045, 0], ['pop', T.h0 + 0.45, 932.33, 0.04, 0],
  ['whoosh', T.deckIn[0], 0.4, 0.04], ['tick', T.deckIn[1], 0.08], ['boom', T.deckIn[1], 0.1],
  ['pop', T.dealerIn + 0.05, 587.33, 0.045, 0.3], ['pop', T.dealerIn + 0.3, 783.99, 0.03, 0.3],
  ['whoosh', T.cut1[0], 0.3, 0.03], ['tick', T.cut1[1], 0.06], ['whoosh', T.cut2[0], 0.3, 0.03], ['tick', T.cut2[1], 0.06],
  ...riffleTicks,
  ['whoosh', T.spring[0], 0.7, 0.05], ['riser', T.spring[0], T.spring[1] - 0.1, 0.04], ...springTicks, ['pluck', T.spring[1], 1174.66, 0.04, 0.5, 0],
  ['pop', T.open, 587.33, 0.04, 0], ['pop', T.open + 0.06, 783.99, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // the deal and the turn-over
  ...wordPops(T.h1, 2, 0.08, 1, 0.026), ['pop', T.h1Land, 932.33, 0.045, 0],
  ...Array.from({ length: 6 }, (_, k) => ['whoosh', +dealAt(k).toFixed(3), 0.25, 0.025]),
  ...Array.from({ length: 6 }, (_, k) => ['tick', +(dealAt(k) + T.fly).toFixed(3), 0.05]),
  ...Array.from({ length: 6 }, (_, k) => ['pop', +(flipAt(k) + T.flipLen * 0.5).toFixed(3), NOTE[k % 7] * 2, 0.035, (k - 2.5) * 0.15]),
  ['bell', flipAt(5) + T.flipLen * 0.5, 1567.98, 0.035, 1.6, 0.3], ['glitter', flipAt(5), flipAt(5) + 0.6],
  // five people, one sign: you beg, Pisces sobs, the dealer squints
  ...wordPops(T.h2, 2, 0.08, 2, 0.026), ['pop', T.h2Land, 783.99, 0.045, 0], ['pop', T.h2Land + 0.1, 932.33, 0.045, 0],
  ['pop', T.youIn + 0.05, 698.46, 0.04, -0.4],
  ['pop', T.beg[0] + 0.05, 1046.5, 0.03, -0.4], ['pop', T.beg[0] + 0.3, 1174.66, 0.03, -0.4], ['pop', T.beg[0] + 0.55, 1396.91, 0.03, -0.4],
  ['pop', T.pisces[0] + 0.3, 587.33, 0.028, 0.5], ['pop', T.pisces[0] + 0.7, 523.25, 0.026, 0.5], ['pop', T.pisces[0] + 0.82, 466.16, 0.026, 0.5],
  ['pop', T.close, 783.99, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // last line
  ...wordPops(T.h3, 3, 0.08, 0, 0.026), ['pop', T.h3Land, 1174.66, 0.055, 0], ['pop', T.h3Land + 0.1, 1396.91, 0.05, 0], ['bell', T.h3Land + 0.05, 1567.98, 0.022, 1.0, 0],
  ['pluck', T.tip[0] + 0.3, 1174.66, 0.04, 0.5, 0], ['glitter', T.tip[1] - 0.2, T.tip[1] + 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
