// sr05talkcards (20 s vertical Align ad, Star Talk Remix of teaser 05 "Talk in cards") · story 0–15.6, then the end card.
//   0.00–5.20  "Talk in *cards.*"  A tarot hand of talk cards rises and fans open behind the gold narrator star, who hops.
//              Drop (2.82): THE STARS: "one card. you both answer. sealed." The Fool lifts out of the hand, the rest
//              fall away, and the narrator star pops off as the card glides up.
//   5.20–10.40 "“What's a hill | you'd *die on?*”"  ♏ Scorpio and ♎ Libra pop in, a sealed answer (gold wax seal) drops
//              over each. Scorpio squints at Libra's envelope and tiptoes over to peek… THE STARS: "scorpio. no peeking.
//              we *see* you." Busted: wide eyes, blush, sweat drop, zips back. Libra squints at it.
//   10.45 cut → "Neither sees till | you *both* do."  Both seals pop at once: Scorpio "pineapple on pizza." ·
//              Libra "people who peek." Scorpio sweats, Libra winks; then "One card. | Two *answers.*" and both laugh-hop.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// One canvas (sky + cards + stars + envelopes), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#cdb8ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BEAT = n => 0.6 + n * 0.5556
const SCO = signStar('scorpio'), LIB = signStar('libra')

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.85, 5.05],
  rise: 0.25, starIn: 0.55, glint: 1.4,
  open: 2.66, l1: BEAT(4) + 0.02,                    // the drop: 2.82
  lift: 3.55, fall: 4.45, glide: [4.6, 5.45], starOut: [4.55, 4.85],
  h1: 5.25, h1Land: 5.75, scoIn: 5.45, libIn: 5.6, envIn: 6.0,
  eye: 6.45, sneak: [6.9, 7.75], l2: 7.15, busted: 7.75, zip: [8.3, 8.55], libSquint: 7.85, roll: [8.9, 9.6],
  close: 10.2, h1Out: [10.2, 10.38],
  cut: 10.45,
  h2: 10.55, h2Land: 10.95, reveal: 11.45, read: 11.9, sweat: 12.25, wink: [12.3, 12.8], h2Out: [12.85, 13.05],
  h3: 13.1, h3Land: 13.5, laugh: 13.6, out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'one card. you both answer. *sealed.*' },
  { t: T.l2, speaker: SPEAK, text: 'scorpio. no peeking. we *see* you.' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── pixel bits
const DROP = ['..X..', '.XWX.', 'XWXXX', 'XXXXX', '.XXX.']
function drawBits(x, bm, cols, cx, cy, cell, { alpha = 1, outline = INK } = {}) {
  const w = bm[0].length, h = bm.length, ox = cx - w * cell / 2, oy = cy - h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  x.save(); x.globalAlpha *= alpha
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
/** a stepped-corner pixel panel centred on (cx, cy) */
function stepPanel(x, cx, cy, w, h, P, { border = GOLD, fillC = 'rgba(22,12,52,0.96)' } = {}) {
  const st = (o, col) => { const X = cx - w / 2 + o, Y = cy - h / 2 + o, ww = w - 2 * o, hh = h - 2 * o; x.fillStyle = col; x.fillRect(X + 2 * P, Y, ww - 4 * P, hh); x.fillRect(X, Y + 2 * P, ww, hh - 4 * P); x.fillRect(X + P, Y + P, ww - 2 * P, hh - 2 * P) }
  x.save(); x.shadowColor = 'rgba(242,199,92,0.55)'; x.shadowBlur = 24; st(0, border); x.restore()
  st(P, INK); st(2 * P, fillC)
  x.fillStyle = '#fff1c8'; x.fillRect(cx - w / 2 + 2 * P, cy - h / 2, 4 * P, P / 2)
}

// ── layout
const FAN = ['card-talk-5', 'card-talk-2', 'card-talk-4', 'card-talk-1', 'card-talk-6', 'card-talk-3', 'card-talk-daily']
const PLAYED = 3
const CH = 560, CW = CH * 732 / 1170
const PIV = { x: 540, y: 1000 + 1000 }, R = 1000
const NARR = { x: 540, y: 1300, size: 240 }
const CARD_SMALL = { x: 540, y: 720, h: 300 }
const ENV = { L: { x: 250, y: 885 }, R: { x: 830, y: 885 }, w: 360, h: 220 }
const SCO_HOME = { x: 250, y: 1150, size: 250 }, LIB_HOME = { x: 830, y: 1150, size: 250 }
const LOW = 170                                     // the stage drops a little once the box shuts (after the cut)
const lowK = t => ease.inOutCubic(prog(t, 10.4, 10.5))

const SCO_HOPS = [T.scoIn + 0.3, T.busted, T.zip[1] + 0.02, T.read, T.laugh, T.laugh + 0.45, T.laugh + 0.9]
const LIB_HOPS = [T.libIn + 0.3, T.reveal + 0.05, T.wink[0], T.laugh + 0.2, T.laugh + 0.65, T.laugh + 1.1]
const NARR_HOPS = [T.starIn + 0.3, ...talkHops(LINES.slice(0, 1), SPEAK, { cps: CPS }).filter(h => h > T.l1 + 0.2 && h < T.starOut[0] - 0.3), T.lift]

function scoState(t) {
  if (t < T.envIn + 0.3) return { mood: 'happy' }
  if (t < T.eye) return { mood: 'neutral', look: [0, -1] }
  if (t < T.busted) return { mood: 'squint', look: [1, -1], blink: false }
  if (t < T.zip[0]) return { mood: 'wide', look: [0, 0], blink: false, blush: 1 }
  if (t < T.cut) return { mood: 'neutral', look: [-1, 1], blush: 1 }
  if (t < T.reveal) return { mood: 'neutral', look: [0, -1] }
  if (t < T.read) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.h3) return { mood: 'wide', look: [1, -1], blink: false, blush: 1 }
  return { mood: 'happy' }
}
function libState(t) {
  if (t < T.libSquint) return { mood: t < T.envIn + 0.3 ? 'happy' : 'neutral', look: t < T.envIn + 0.3 ? [0, 0] : [0, -1] }
  if (t < T.roll[0]) return { mood: 'squint', look: [-1, 0], blink: false }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.reveal) return { mood: 'neutral', look: [0, -1] }
  if (t < T.wink[0]) return { mood: 'happy' }
  if (t < T.wink[1]) return { mood: 'wink' }
  if (t < T.h3) return { mood: 'neutral', look: [-1, 0] }
  return { mood: 'happy' }
}
function narrState(t) {
  if (t < T.l1) return { mood: 'happy' }
  if (t < T.lift - 0.1) return { mood: 'neutral', look: [0, 0] }
  return { mood: 'wide', look: [0, -1], blink: false }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src + '.png' })
  const IM = await Promise.all(FAN.map(load))

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Talk in *cards.*', { top: 240, size: 140, accentSize: 200, at: T.h0, gap: 0.1, wobble: true, late: 1, lateAt: T.h0 + 0.36 })
  const H1 = popText(root, '“What’s a hill | you’d *die on?*”', { top: 215, size: 100, accentSize: 150, at: T.h1, gap: 0.07, wobble: true, late: 2, lateAt: T.h1Land, accentColor: PINK })
  const H2 = popText(root, 'Neither sees till | you *both* do.', { top: 215, size: 100, accentSize: 150, at: T.h2, gap: 0.07, wobble: true, late: 2, lateAt: T.h2Land, accentColor: GOLD })
  const H3 = popText(root, 'One card. | Two *answers.*', { top: 215, size: 120, accentSize: 180, at: T.h3, gap: 0.08, wobble: true, late: 1, lateAt: T.h3Land, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawCard(im, cx, cy, h, rot, a = 1, glint = -1) {
    if (!im || a <= 0) return
    const w = h * 732 / 1170
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(rot)
    x.drawImage(im, -w / 2, -h / 2, w, h)
    if (glint > 0 && glint < 1) {                         // a gold sheen sweeping across the face
      x.globalCompositeOperation = 'lighter'
      const gxp = lerp(-w, w, glint)
      const g = x.createLinearGradient(gxp - 60, -h / 2, gxp + 60, h / 2)
      g.addColorStop(0, 'rgba(255,230,160,0)'); g.addColorStop(0.5, `rgba(255,240,200,${0.55 * Math.sin(Math.PI * glint)})`); g.addColorStop(1, 'rgba(255,230,160,0)')
      x.fillStyle = g; x.beginPath(); x.roundRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 18); x.fill()
    }
    x.restore()
  }

  function drawFan(t) {
    if (t > T.glide[1] + 0.05 && t > T.cut) { /* the small Fool card stays until the cut */ }
    const rise = ease.outCubic(prog(t, T.rise, T.rise + 0.8))
    const open = ease.spring(prog(t, T.rise + 0.25, T.rise + 1.35), 0.12)
    const sway = Math.sin(t * 1.1) * 0.7
    FAN.forEach((_, i) => {
      if (i === PLAYED) return
      const a = ((i - PLAYED) * 8 * open + sway) * Math.PI / 180
      const d = Math.abs(i - PLAYED)
      const drop = ease.inCubic(prog(t, T.fall + d * 0.04, T.fall + 0.55 + d * 0.04))
      if (drop >= 1) return
      const cx = PIV.x + R * Math.sin(a) + (i - PLAYED) * 50 * drop, cy = PIV.y - R * Math.cos(a) + (1 - rise) * 900 + d * 10 * open + drop * 1100
      drawCard(IM[i], cx, cy, CH, a * (1 + drop), 1 - ease.inQuad(drop), prog(t, T.glint + d * 0.14, T.glint + 0.6 + d * 0.14))
    })
  }

  function foolPose(t) {
    const rise = ease.outCubic(prog(t, T.rise, T.rise + 0.8))
    const sway = Math.sin(t * 1.1) * 0.7 * Math.PI / 180
    const lift = easeOutBack(prog(t, T.lift, T.lift + 0.45), 2)
    const g = ease.inOutCubic(prog(t, ...T.glide))
    const bx = PIV.x + R * Math.sin(sway), by = PIV.y - R * Math.cos(sway) + (1 - rise) * 900 - 90 * lift
    const fl = t > T.glide[1] ? Math.sin((t - T.glide[1]) * 1.6) * 8 : 0
    return { x: lerp(bx, CARD_SMALL.x, g), y: lerp(by, CARD_SMALL.y, g) + fl, h: lerp(CH, CARD_SMALL.h, g), rot: lerp(sway, 0, g) + 0.04 * Math.sin(Math.PI * g) }
  }

  /** a sealed answer: panel, name tag, the answer blurred under a wax seal until it pops */
  function drawEnvelope(t, c, who, col, answer, tin) {
    const pin = pop01(t, tin, 0.4, 2.2)
    const ok = popOut(t, T.out)
    if (pin <= 0.01 || ok <= 0) return
    const u = ease.outCubic(prog(t, T.reveal, T.reveal + 0.45))
    const bounce = 1 + 0.07 * Math.sin(Math.PI * prog(t, T.reveal, T.reveal + 0.35))
    const s = pin * ok * bounce
    const dy = (1 - ease.outCubic(prog(t, tin, tin + 0.4))) * -160 + Math.sin(t * 2 + c.x) * 5 + LOW * lowK(t)
    x.save(); x.translate(c.x, c.y + dy); x.scale(s, s)
    stepPanel(x, 0, 0, ENV.w, ENV.h, 8, { border: u > 0.5 ? GOLD : '#c9a24a' })
    x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = col
    x.fillText(who, -ENV.w / 2 + 34, -ENV.h / 2 + 44)
    x.textAlign = 'right'; x.fillStyle = `rgba(242,199,92,${0.8 * (1 - u)})`; x.fillText('SEALED', ENV.w / 2 - 30, -ENV.h / 2 + 44)
    // the answer (blurred until the reveal)
    x.save(); x.filter = `blur(${lerp(13, 0, u).toFixed(1)}px)`; x.globalAlpha = lerp(0.6, 1, u)
    x.fillStyle = BONE; x.textAlign = 'center'; x.font = `italic 500 46px ${SERIF}`
    answer.forEach((ln, i) => x.fillText(ln, 0, 14 + (i - (answer.length - 1) / 2) * 50 + 8))
    x.restore()
    // the wax seal: pulses, then bursts off
    const sp = prog(t, T.reveal - 0.05, T.reveal + 0.3)
    if (sp < 1) {
      const sc = 1 + 0.6 * ease.outCubic(sp) - 0.1 * Math.sin(Math.PI * prog(t, T.reveal - 0.3, T.reveal))
      x.save(); x.globalAlpha = 1 - ease.inQuad(sp); x.translate(0, 22); x.scale(sc, sc); x.rotate(sp * 0.7)
      const g = x.createRadialGradient(-12, -14, 4, 0, 0, 46); g.addColorStop(0, '#ffe2a8'); g.addColorStop(0.45, '#e0a04a'); g.addColorStop(1, '#8a3a2a')
      x.shadowColor = 'rgba(242,199,92,0.7)'; x.shadowBlur = 20
      x.fillStyle = g; x.beginPath(); x.arc(0, 0, 42, 0, Math.PI * 2); x.fill()
      x.shadowBlur = 0
      drawPixelStar(x, 0, 0, 30, 2, '#5a1e14')
      x.restore()
    }
    x.restore()
    if (t > T.reveal && t < T.reveal + 0.75) sparkles(t, c.x, c.y + dy, T.reveal, 10, 170, c.x * 0.01)
  }

  function sparkles(t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    // the narrator, in front of the hand
    const np = pop01(t, T.starIn, 0.38, 2.2) * popOut(t, T.starOut)
    if (np > 0.02) {
      const fly = ease.inCubic(prog(t, ...T.starOut))
      drawStarChar(x, NARR.x, NARR.y - fly * 260, NARR.size, t, { color: STAR.sky, ...narrState(t), hops: NARR_HOPS, pop: np, seed: 2, glow: 1.2 })
    }
    if (t > T.starOut[1] && t < T.starOut[1] + 0.7) sparkles(t, NARR.x, NARR.y - 260, T.starOut[1] - 0.05, 8, 90, 1)
    if (ok <= 0) return
    const lk = lowK(t)
    // Scorpio: tiptoes right to peek, freezes (busted), zips home
    const sneak = ease.inOutQuad(prog(t, ...T.sneak)), zip = ease.inOutCubic(prog(t, ...T.zip))
    const peekX = lerp(0, 270, sneak) * (1 - zip)
    const tiptoe = t > T.sneak[0] && t < T.busted ? -0.08 + 0.05 * Math.abs(Math.sin((t - T.sneak[0]) * 9)) : 0
    const freeze = t >= T.busted && t < T.busted + 0.45 ? -0.14 * Math.exp(-(t - T.busted) * 6) * Math.cos((t - T.busted) * 24) : 0
    const sp = pop01(t, T.scoIn, 0.36, 2.1) * ok
    const shake = t >= T.sweat && t < T.sweat + 0.5 ? Math.sin(t * 70) * 5 : 0
    const rS = drawStarChar(x, SCO_HOME.x + peekX + shake, SCO_HOME.y + LOW * lk, SCO_HOME.size * (1 + 0.16 * lk), t, { color: SCO.color, glyph: SCO.glyph, ...scoState(t), hops: SCO_HOPS, pop: sp, squash: tiptoe + freeze, seed: 5 })
    const lp = pop01(t, T.libIn, 0.36, 2.1) * ok
    const rL = drawStarChar(x, LIB_HOME.x, LIB_HOME.y + LOW * lk, LIB_HOME.size * (1 + 0.16 * lk), t, { color: LIB.color, glyph: LIB.glyph, ...libState(t), hops: LIB_HOPS, pop: lp, seed: 9 })
    // sweat drops when busted, and again when the answer lands
    for (const t0 of [T.busted + 0.1, T.sweat]) {
      const k = prog(t, t0, t0 + 0.8)
      if (k > 0 && k < 1 && sp > 0.5) drawBits(x, DROP, { X: '#7fdcff', W: '#e9fbff' }, rS.x + 105, rS.top + 40 + k * 70, 7, { alpha: Math.sin(Math.PI * k) })
    }
    // "!" over Scorpio at the bust
    const bk = prog(t, T.busted, T.busted + 0.7)
    if (bk > 0 && bk < 1) drawBits(x, ['XX', 'XX', 'XX', 'XX', '..', 'XX'], { X: GOLD }, rS.x, rS.top - 60 - 20 * ease.outCubic(bk), 10, { alpha: Math.sin(Math.PI * bk) })
    void rL
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        // a warm glow behind the hand / the played card
        const gk = 0.5 * prog(t, 0.3, 1.2) * (1 - prog(t, T.glide[0], T.glide[1]))
        if (gk > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 980, 0, 540, 980, 520); g.addColorStop(0, `rgba(242,199,92,${0.22 * gk})`); g.addColorStop(0.5, `rgba(180,92,255,${0.12 * gk})`); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 380, 1080, 1040); x.restore() }
        if (t < T.cut) drawFan(t)
        if (t < T.cut) { const f = foolPose(t); drawCard(IM[PLAYED], f.x, f.y, f.h, f.rot, 1, Math.max(prog(t, T.glint + 0.05, T.glint + 0.65), prog(t, T.lift, T.lift + 0.7))) }
        drawEnvelope(t, ENV.L, '♏ SCORPIO', SCO.color, ['pineapple', 'on pizza.'], T.envIn)
        drawEnvelope(t, ENV.R, '♎ LIBRA', LIB.color, ['people who', 'peek.'], T.envIn + 0.12)
        drawStars(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// one card cut: 10.45 (box shut → "Neither sees till you both do."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51, 1479.98]
const wordPops = (t0, n, gap, b = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(b + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: the hand rises and fans, the narrator pops in, a glint runs across the hand
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0 + 0.36, 1318.51, 0.045, 0],
  ['whoosh', T.rise + 0.1, 0.6, 0.06],
  ...FAN.map((_, i) => ['tick', +(T.rise + 0.45 + Math.abs(i - PLAYED) * 0.07).toFixed(3), 0.05]),
  ['pop', T.starIn + 0.05, 739.99, 0.045, 0], ['glitter', T.glint, T.glint + 0.9],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pluck', T.lift, 1318.51, 0.04, 0.6, 0], ['bell', T.lift + 0.1, 1760, 0.025, 1.2, 0],
  ['whoosh', T.fall, 0.5, 0.05], ['whoosh', T.glide[0], 0.6, 0.04], ['pop', T.starOut[0] + 0.05, 1479.98, 0.03, 0],
  // the question, the sealed answers, the peek
  ...wordPops(T.h1, 3, 0.07, 1, 0.025), ['pop', T.h1Land, 1108.73, 0.045, 0],
  ['pop', T.scoIn + 0.05, 659.25, 0.04, -0.3], ['pop', T.libIn + 0.05, 830.61, 0.04, 0.3],
  ['tick', T.envIn + 0.2, 0.06], ['bell', T.envIn + 0.2, 659.25, 0.03, 1.1, -0.4], ['tick', T.envIn + 0.32, 0.06], ['bell', T.envIn + 0.32, 739.99, 0.03, 1.1, 0.4],
  ['tick', T.sneak[0] + 0.17, 0.03], ['tick', T.sneak[0] + 0.52, 0.03], ['tick', T.sneak[0] + 0.87, 0.03],
  ['boom', T.busted, 0.12], ['pop', T.busted, 1479.98, 0.045, -0.2],
  ['whoosh', T.zip[0], 0.25, 0.04], ['pop', T.zip[1], 659.25, 0.035, -0.4],
  ['tick', T.roll[0] + 0.1, 0.03],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 659.25, 0.03, 0],
  // the reveal: both seals pop at once
  ...wordPops(T.h2, 3, 0.07, 2, 0.025), ['pop', T.h2Land, 1318.51, 0.045, 0],
  ['riser', T.h2Land, T.reveal, 0.05],
  ['boom', T.reveal, 0.22], ['bell', T.reveal, 659.25, 0.06, 2.2, -0.3], ['bell', T.reveal + 0.05, 830.61, 0.05, 2.2, 0.3], ['bell', T.reveal + 0.1, 1108.73, 0.035, 2.0, 0],
  ['glitter', T.reveal, T.reveal + 0.7],
  ['pop', T.sweat, 440, 0.035, -0.3], ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.3],
  // the last line
  ...wordPops(T.h3, 2, 0.08, 1, 0.028), ['pop', T.h3Land, 1318.51, 0.055, 0], ['pluck', T.h3Land, 1108.73, 0.05, 0.7, 0],
  ['pop', T.laugh, 987.77, 0.025, -0.3], ['pop', T.laugh + 0.2, 1108.73, 0.025, 0.3], ['pop', T.laugh + 0.45, 987.77, 0.025, -0.3], ['pop', T.laugh + 0.65, 1108.73, 0.025, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
