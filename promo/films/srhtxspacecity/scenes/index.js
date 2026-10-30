// srhtxspacecity · "They call it Space City." (Star Talk Remix of htxspacecity, 30 s vertical) · story 0–25.6, then the
// shared END CARD (default CTA). THE STARS (the gold narrator star) is your guide, in a glass space helmet; ♓ Pisces wears
// one too, and cries into it all film long until the helmet is a fishbowl (with a fish in it).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type + the dialogue box above it, grain on top.
//   0.00–4.60   HOOK "They call it | *Space City.*" — the skyline springs up, a rocket lifts off from its tower. The
//               helmeted gold star wakes up on the boom (wide eyes, squash) and watches it go. THE STARS: "welcome to
//               *space city!*"
//   4.70–9.90   "So why does dating | here feel so… | *Earth-bound?*" — swipe cards rain on a pictogram person under an
//               umbrella; the star's eyes chase them. Pisces floats in, crying into its helmet (the water starts to rise).
//               THE STARS: "swiping in circles isn't an *orbit*, babe."  Pisces: "it's fine. i'm hydrating."
//   9.97        card cut (shuffle)
//  10.05–16.20  "The stars read | *both charts.*" — two zodiac wheels spin in and lock; the star rides the inner wheel round and
//               lands dizzy, then draws the Push / Pull / Align lines between two people's planets (chips label them).
//               THE STARS: "push, pull, align. *before* date one."
//  16.40–21.60  "Tonight's deck: | dealt from the *stars.*" — the star deals five card backs out of itself into a fan; the
//               centre card lifts and flips to a veiled mystery card; heart-eyes. THE STARS: "new deck every night.
//               *card first.* face last."  Pisces' helmet is full now — a little fish swims in it: "…i made a friend."
//  21.68       card cut (flip)
//  21.75–25.35 "Mission: | *find your person.*" — the skyline is back; both stars ride the rocket's nose. THE STARS counts
//               "ok, babe. 3… 2… 1…" — Pisces yells "LIFTOFF!!" a beat early; the rocket lifts off on 1 and draws a gold
//               heart, sparkle burst, out through the top.
//  25.35–25.60 plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6
// Props: the skyline / rocket / smoke / swipe card / umbrella person / heart curve are the original film's, imported
// read-only from htxspacecity/scenes/props.js. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { W, A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH, READING } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR as STARC, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { skyline, rocket, smoke, swipeCard, umbrellaPerson, canopyY, heartAt } from '../../htxspacecity/scenes/props.js'
import { BONE, GOLD, PINK, BLUE, LAV, MONO, rgba, ink, sparkle, orb, chip, starFrame, inSprite, tearsCells, aside, helmet } from './props.js'

export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const D2R = Math.PI / 180, TAU = Math.PI * 2
const EARTHC = '#6aa8ff', SILVER = '#e3ecff'
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── the dialogue (THE STARS)
const SKY_TAG = 'THE STARS'
const CPS = 28
const BOX1 = [
  { t: 2.1, speaker: SKY_TAG, text: 'welcome to *space city!*' },
  { t: 6.05, speaker: SKY_TAG, color: PINK, text: "swiping in circles isn't an *orbit*, babe." },
]
const BOX2 = [{ t: 12.3, speaker: SKY_TAG, text: 'push, pull, align. *before* date one.' }]
const BOX3 = [{ t: 17.15, speaker: SKY_TAG, color: PINK, text: 'new deck every night. *card first.* face last.' }]
const BOX4 = [{ t: 21.98, speaker: SKY_TAG, text: '3… 2… *1…*' }]
const BOXES = [[BOX1, 1.9, 9.55], [BOX2, 12.1, 15.62], [BOX3, 16.95, 20.95], [BOX4, 21.82, 24.7]]
const COUNT = lineTimes(BOX4, { cps: CPS })[0]
const charAt = (txt, ch) => COUNT.chars[[...txt.replace(/\*/g, '')].indexOf(ch)]

// ── beats
const T = {
  // hook
  h0: 0.12, h0Late: 0.62, rocketIgn: 1.35, rocketLift: BEAT(2), rocketGone: 4.3, h0Out: 4.3, skyOut: [4.25, 4.75],
  // earth-bound
  h1: 4.72, h1Late: BEAT(9), person: BEAT(8), rain: [5.35, 9.0], h1Out: 9.6, personOut: 9.45, pisIn: 5.25, hydr: [7.95, 9.45],
  // charts
  h2: 10.05, h2Late: BEAT(18), wA: [10.45, 11.15], wB: [10.75, 11.45], lock: BEAT(20), dots: BEAT(21), lines: [BEAT(22), BEAT(23), BEAT(24)], h2Out: 16.0, wOut: 15.75,
  // deck
  h3: 16.4, h3Late: BEAT(29) + 0.08, deal: [BEAT(30), BEAT(30.5), BEAT(31), BEAT(31.5), BEAT(32)], flip: BEAT(33), h3Out: 21.4, cardsOut: 21.05,
  fish: 19.45, friend: [19.75, 20.95],
  // mission
  eye4: 21.75, h4: 21.95, h4Late: BEAT(39), city4: 21.8, board: [21.5, 22.15], c3: charAt(BOX4[0].text, '3'), c2: charAt(BOX4[0].text, '2'),
  c1: charAt(BOX4[0].text, '1'), lift4: BEAT(40), heart: [23.25, 24.45], burst: 24.45, h4Out: 25.0, city4Out: [24.85, 25.3], fade: [24.95, 25.3],
}
T.early = r3(T.c2 + 0.12); T.earlyOut = r3(T.lift4 + 0.75)

// ── layout
const BASE = 1540                                // the skyline's street line (the box sits below it)
const ROCKET_X = 830, PAD_Y = BASE - 132         // hook rocket
const UMB = { cx: 460, cy: 1106, hw: 190 }       // the umbrella person stands at (400, 1470)
const WC = { cx: 540, cy: 1030 }
const WA = { cx: 0, cy: 0, rOut: 440, rIn: 352, rGlyph: 396, alpha: 0.92 }
const WB = { cx: 0, cy: 0, rOut: 336, rIn: 262, rGlyph: 299, alpha: 0.92 }
const pt = (lon, r) => ({ x: WC.cx + Math.cos(Math.PI - lon * D2R) * r, y: WC.cy + Math.sin(Math.PI - lon * D2R) * r })
const PAIRS = [
  { a: 20, b: 110, col: READING.push, label: 'PUSH' },
  { a: 145, b: 265, col: READING.pull, label: 'PULL' },
  { a: 228, b: 48, col: READING.align, label: 'ALIGN' },
]
const R_A = 230, R_B = 140
const CW = 230, CH = Math.round(230 * 2347 / 1528)
const FAN = [0, 1, 2, 3, 4].map(i => ({ x: 540 + (i - 2) * 125, y: 1190 + Math.abs(i - 2) * 24, rot: (i - 2) * 10 }))
const DEAL_ORDER = [0, 4, 1, 3, 2]
const BIG = { x: 540, y: 1135, s: 1.5 }
const PIS = signStar('pisces')
const PIS_POS = { x: 950, y: 1470, s: 140 }
const HC = { x: 540, y: 1062, s: 16 }           // the gold heart the rocket draws, above the skyline
const R4 = 0.5, PAD4 = { x: 540, y: BASE - 112 }

// where the guide star is (x, y, size)
const GUIDE = [[0, 300, 1040, 250], [4.45, 300, 1040, 250], [5.2, 815, 880, 210], [9.55, 815, 880, 210], [10.35, 540, 1030, 150],
  [15.6, 540, 1030, 150], [16.5, 540, 690, 190], [21.3, 540, 690, 190]]
function guideAt(t) {
  let i = 0
  while (i < GUIDE.length - 1 && t >= GUIDE[i + 1][0]) i++
  if (i >= GUIDE.length - 1) return GUIDE[GUIDE.length - 1].slice(1)
  const [t0, ...a] = GUIDE[i], [t1, ...b] = GUIDE[i + 1]
  const k = ease.inOutCubic(prog(t, t0, t1))
  const p = a.map((v, j) => lerp(v, b[j], k))
  p[1] -= Math.sin(Math.PI * k) * 90          // a little hop-arc between spots
  return p
}

// ── swipe-card rain (deterministic)
const CARD_COLS = ['#ff8fb1', '#8fd8f6', '#c9a6ff', '#ffd98a', '#f59cc4']
const RAIN = (() => {
  const r = rng(77), out = [], n = 30
  for (let i = 0; i < n; i++) {
    const t0 = T.rain[0] + (i / n) * (T.rain[1] - T.rain[0]) + r() * 0.08
    let px = 90 + r() * 620
    if (i % 3 === 0) px = UMB.cx + (r() - 0.5) * 300
    const v = 1250 + r() * 450, y0 = -140, rot0 = (r() - 0.5) * 1.2, spin = (r() - 0.5) * 5, col = CARD_COLS[i % CARD_COLS.length], s = 0.75 + r() * 0.35
    const cy = canopyY(px, UMB.cx, UMB.cy, UMB.hw)
    const yHit = cy != null ? cy - 50 * s : 1470 - 60 * s
    out.push({ t0, x: px, v, y0, rot0, spin, col, s, umb: cy != null, yHit, tHit: t0 + (yHit - y0) / v, dir: px < UMB.cx ? -1 : 1, kick: 300 + r() * 250 })
  }
  return out
})()
const UMB_HITS = RAIN.filter(c => c.umb).map(c => c.tHit)
const lastHit = t => { let k = -1; for (let i = 0; i < RAIN.length; i++) if (RAIN[i].t0 + 0.25 <= t) k = i; return k }

// ── the rocket of scene 5: pad → the heart's bottom tip → round the heart → off the top
const hp = u => { const p = heartAt(u); return { x: HC.x + p.x * HC.s, y: HC.y + p.y * HC.s } }
function rocketPose4(t) {
  const [h0, h1] = T.heart
  if (t < T.lift4) return { x: PAD4.x, y: PAD4.y, rot: 0 }
  if (t < h0) { const p = ease.inOutQuad(prog(t, T.lift4, h0)); return { x: PAD4.x, y: lerp(PAD4.y, hp(0).y, p), rot: 0 } }
  if (t < h1) {
    const u = ease.inOutQuad(prog(t, h0, h1)), a = hp(Math.max(0, u - 0.004)), b = hp(Math.min(1, u + 0.004)), p = hp(u)
    return { x: p.x, y: p.y, rot: Math.atan2(b.y - a.y, b.x - a.x) + Math.PI / 2 }
  }
  const p = ease.inQuad(prog(t, h1, 25.25))
  return { x: HC.x, y: lerp(hp(0).y, -500, p), rot: 0 }
}
// the riders stay upright on top of the rocket (world offsets), whichever way it points

const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src })
const bitmap = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 172px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [backIm, profIm] = await Promise.all([loadImg(A + 'card-back.png'), loadImg(A + 'card-profile-1.png')])
  const backBmp = bitmap(backIm, 520), profBmp = bitmap(profIm, 760)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'HOUSTON, TX')
  const H0 = popText(root, 'They call it | *Space* *City.*', { top: 205, size: 112, accentSize: 172, at: T.h0, late: 2, lateAt: T.h0Late, lateGap: 0.09, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H1 = popText(root, 'So why does dating | here feel so… | *Earth-bound?*', { top: 205, size: 96, accentSize: 130, at: T.h1, late: 1, lateAt: T.h1Late, wobble: true, accentColor: EARTHC })
  const H2 = popText(root, 'The stars read | *both* *charts.*', { top: 205, size: 104, accentSize: 150, at: T.h2, late: 2, lateAt: T.h2Late, wobble: true, accentColor: GOLD })
  const H3 = popText(root, "Tonight's deck: | dealt from the *stars.*", { top: 205, size: 104, accentSize: 128, at: T.h3, late: 1, lateAt: T.h3Late, wobble: true, accentColor: PINK })
  const H4 = popText(root, 'Mission: | *find* *your* *person.*', { top: 215, size: 132, accentSize: 150, at: T.h4, late: 3, lateAt: T.h4Late, lateGap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── 1 · hook: skyline + rocket
  const rocketY = t => PAD_Y - 2300 * ease.inQuad(prog(t, T.rocketLift, T.rocketGone))
  function drawHook(t) {
    if (t > T.skyOut[1]) return
    const sink = ease.inCubic(prog(t, ...T.skyOut)) * 900
    skyline(x, t, BASE + sink, j => pop01(t, 0.05 + j * 0.045, 0.42, 1.6), { sc: 0.82 })
    const tk = pop01(t, 0.3, 0.4, 1.8) * (1 - ease.inCubic(prog(t, ...T.skyOut)))
    if (tk > 0) {   // launch tower
      x.save(); x.translate(ROCKET_X - 120, BASE + sink); x.scale(1, tk)
      x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -420); x.moveTo(30, 0); x.lineTo(30, -420)
      for (let k = 0; k < 9; k++) { x.moveTo(0, -k * 46); x.lineTo(30, -k * 46 - 46) }
      x.moveTo(30, -330); x.lineTo(70, -330); ink(x, BONE, { w: 5, fa: 0, glow: 8 })
      x.beginPath(); x.roundRect(-30, -24, 300, 24, 6); ink(x, LAV, { w: 6, fa: 0.4 })
      x.restore()
    }
    if (t < T.rocketGone + 0.1) {
      const ry = rocketY(t) + sink, shake = t > T.rocketIgn && t < T.rocketLift + 0.3 ? 3 * Math.sin(t * 80) : 0
      for (let k = 1; k < 9; k++) {
        const tt = t - k * 0.06
        if (tt < T.rocketLift) break
        if (rocketY(tt) + sink + 250 > BASE - 60) continue
        x.save(); x.globalAlpha = (1 - k / 9) * 0.9; orb(x, ROCKET_X + Math.sin(k * 2.1) * 6, rocketY(tt) + sink + 250, 10 - k * 0.7, k % 2 ? GOLD : PINK, 1, 2.5); x.restore()
      }
      rocket(x, ROCKET_X + shake, ry, 0.62, t, { fl: t < T.rocketIgn ? 0 : t < T.rocketLift ? 0.35 : 1, a: clamp(prog(t, 0.2, 0.5)) })
    }
    smoke(x, ROCKET_X, BASE - 30 + sink, t, ease.outCubic(prog(t, T.rocketIgn, T.rocketLift + 0.6)), outK(t, 3.3, 0.8), 240)
    sparkle(x, ROCKET_X, BASE - 180, t, T.rocketLift, { n: 12, R: 220, seed: 3 })
  }

  // ── 2 · earth-bound: swipe-card rain on the umbrella person
  function drawRain(t) {
    if (t < T.rain[0] - 0.1 || t > T.h1Out + 0.4) return
    const pk = pop01(t, T.person, 0.45, 1.8) * outK(t, T.personOut, 0.3)
    if (pk > 0) { x.save(); x.globalAlpha = clamp(pk); x.beginPath(); x.moveTo(120, 1474); x.lineTo(760, 1474); ink(x, LAV, { w: 6, fa: 0, glow: 12 }); x.restore() }
    const tilt = UMB_HITS.reduce((m, th) => m + (t > th ? 0.07 * Math.exp(-(t - th) * 7) * Math.sin((t - th) * 18) : 0), 0)
    for (const c of RAIN) {
      if (t < c.t0) continue
      const dt = t - c.t0
      if (t < c.tHit) {
        const y = c.y0 + c.v * dt
        swipeCard(x, c.x, y, c.s, c.rot0 + c.spin * dt, c.col, clamp((y - 560) / 120) * outK(t, T.h1Out, 0.3))
      } else if (c.umb) {
        const u = t - c.tHit
        if (u > 0.75) continue
        swipeCard(x, c.x + c.dir * c.kick * u, c.yHit - 520 * u + 1900 * u * u, c.s, c.rot0 + c.dir * 9 * u, c.col, (1 - ease.inQuad(u / 0.75)) * outK(t, T.h1Out, 0.3))
      } else {
        const u = t - c.tHit
        if (u > 0.5) continue
        const sq = 1 - 0.45 * ease.outCubic(clamp(u / 0.12))
        swipeCard(x, c.x, c.yHit + 40 * (1 - sq), c.s, c.rot0 * 0.3, c.col, (1 - ease.inQuad(u / 0.5)) * outK(t, T.h1Out, 0.3), sq)
      }
    }
    umbrellaPerson(x, 400, 1470, pk, t, { a: clamp(pk * 2), tilt: tilt + 0.08 })
    for (const th of UMB_HITS) if (t >= th && t < th + 0.5) sparkle(x, UMB.cx + (th * 1000 % 160) - 80, UMB.cy - 120, t, th, { n: 5, R: 70, seed: Math.round(th * 100), size: 18, dur: 0.45 })
  }

  // ── 3 · two wheels lock; the guide rides the inner one; Push / Pull / Align lines with chips
  const wheelRotB = t => 1.5 * TAU * (1 - ease.outCubic(prog(t, T.wB[0], T.lock)))
  function drawWheels(t) {
    if (t < T.wA[0] - 0.05 || t > T.h2Out + 0.4) return
    const o = 1 - ease.inCubic(prog(t, T.wOut, T.wOut + 0.4)), os = lerp(0.6, 1, o)
    const bk = 1 + 0.06 * Math.exp(-Math.max(0, t - T.lock) * 7) * (t > T.lock ? 1 : 0)
    const pa = easeOutBack(prog(t, ...T.wA), 1.3), pb = easeOutBack(prog(t, ...T.wB), 1.3)
    const ra = -1.75 * Math.PI * (1 - ease.outCubic(prog(t, T.wA[0], T.lock)))
    const ax = lerp(-560, WC.cx, pa), bx = lerp(1640, WC.cx, pb)
    x.save(); x.globalAlpha = o
    if (t >= T.wA[0]) { x.save(); x.translate(ax, WC.cy); x.rotate(ra); x.scale(bk * os, bk * os); drawWheelH(x, { W: WA }); x.restore() }
    if (t >= T.wB[0]) { x.save(); x.translate(bx, WC.cy); x.rotate(wheelRotB(t)); x.scale(bk * os, bk * os); drawWheelH(x, { W: WB }); x.restore() }
    x.restore()
    const fk = prog(t, T.lock, T.lock + 0.6)
    if (fk > 0 && fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(WC.cx, WC.cy, 344 + 120 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 10 * (1 - fk) + 2, fa: 0, glow: 30 }); x.restore() }
    sparkle(x, WC.cx, WC.cy, t, T.lock, { n: 16, R: 420, seed: 9, size: 30 })
    PAIRS.forEach((P, i) => {
      const A_ = pt(P.a, R_A * os), B_ = pt(P.b, R_B * os)
      const dk = pop01(t, T.dots + i * 0.08, 0.36, 2.2) * o
      const lk = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.38)) * o
      if (lk > 0) {
        const pulse = 1 + 0.25 * Math.exp(-Math.max(0, t - T.lines[i] - 0.38) * 4)
        x.save(); x.globalAlpha = o; x.beginPath(); x.moveTo(A_.x, A_.y); x.lineTo(lerp(A_.x, B_.x, lk), lerp(A_.y, B_.y, lk)); ink(x, P.col, { w: 9 * pulse, fa: 0, glow: 26 }); x.restore()
        sparkle(x, B_.x, B_.y, t, T.lines[i] + 0.36, { n: 8, R: 100, seed: 20 + i, cols: [P.col, '#fff3e0'], size: 22 })
      }
      if (dk > 0) { orb(x, A_.x, A_.y, 22 * dk, GOLD, clamp(dk * 2) * o); orb(x, B_.x, B_.y, 22 * dk, SILVER, clamp(dk * 2) * o) }
    })
  }
  function drawLineChips(t) {   // after the guide, so the chips sit on top
    if (t < T.lines[0] || t > T.h2Out + 0.4) return
    const o = 1 - ease.inCubic(prog(t, T.wOut, T.wOut + 0.4))
    PAIRS.forEach((P, i) => {
      const ck = pop01(t, T.lines[i] + 0.3, 0.34, 2.6) * o
      const [cx, cy] = [[330, 1188], [792, 1226], [772, 798]][i]     // beside each line's outer planet
      chip(x, cx, cy, P.label, ck, { size: 34, col: P.col, edge: P.col })
    })
  }

  // ── 4 · tonight's deck, dealt by the guide; the centre card flips to the mystery card
  function drawCardImg(bmp, cx, cy, h, rot, sx = 1, a = 1, glow = 0, glowCol = LAV) {
    if (!bmp || a <= 0 || h <= 0) return
    const w = h * bmp.width / bmp.height
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(sx, 1); x.globalAlpha = a
    if (glow > 0) { x.shadowColor = glowCol; x.shadowBlur = glow } else { x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 30; x.shadowOffsetY = 12 }
    x.drawImage(bmp, -w / 2, -h / 2, w, h)
    x.restore()
  }
  function drawDeck(t) {
    if (t < T.deal[0] - 0.5 || t > T.h3Out + 0.4) return
    DEAL_ORDER.forEach((ci, k) => {
      const F = FAN[ci], td = T.deal[k], t0 = td - 0.42
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, td))
      const off = ease.inCubic(prog(t, T.cardsOut + k * 0.04, T.cardsOut + k * 0.04 + 0.4))
      if (off >= 1) return
      const [gx0, gy0] = guideAt(td)
      let cx = lerp(gx0, F.x, p), cy = lerp(gy0, F.y, p) - Math.sin(Math.PI * p) * 120
      let rot = lerp(F.rot + 160, F.rot, p), h = CH * lerp(0.15, 1, p)
      const land = t > td ? 0.06 * Math.exp(-(t - td) * 8) * Math.cos((t - td) * 26) : 0
      h *= 1 - land
      let face = false, sx = 1
      if (ci === 2 && t > T.flip - 0.05) {
        const lp = easeOutBack(prog(t, T.flip, T.flip + 0.42), 1.6)
        cx = lerp(F.x, BIG.x, clamp(lp)); cy = lerp(F.y, BIG.y, lp); h *= lerp(1, BIG.s, lp); rot = lerp(F.rot, 0, clamp(lp))
        const fp = prog(t, T.flip + 0.1, T.flip + 0.5)
        sx = Math.max(0.02, Math.abs(Math.cos(fp * Math.PI))); face = fp >= 0.5
        if (t > T.flip + 0.9) cy += 8 * Math.sin((t - T.flip) * 2.2)
      }
      cx += (ci - 2) * 260 * off; cy -= 1500 * off
      if (face) {
        const ag = x.createRadialGradient(cx, cy, 20, cx, cy, 460)
        ag.addColorStop(0, rgba(PINK, 0.45 * (1 - off))); ag.addColorStop(1, rgba(PINK, 0))
        x.fillStyle = ag; x.fillRect(cx - 460, cy - 460, 920, 920)
        drawCardImg(profBmp, cx, cy, h * 1.02, rot, sx, 1 - off, 40, LAV)
      } else drawCardImg(backBmp, cx, cy, h, rot, sx, clamp(prog(t, t0, t0 + 0.1)) * (1 - off))
      sparkle(x, F.x, F.y - 40, t, td, { n: 8, R: 160, seed: 30 + k, size: 24 })
    })
    sparkle(x, BIG.x, BIG.y - 60, t, T.flip + 0.3, { n: 14, R: 360, seed: 44, size: 30 })
  }

  // ── 5 · mission: skyline back, both stars on the rocket's nose, liftoff, the gold heart
  function drawMission(t) {
    if (t < T.city4 || t > T.city4Out[1] + 0.05) return
    const sink = ease.inCubic(prog(t, ...T.city4Out)) * 700
    const fade = 1 - prog(t, T.city4Out[0], T.city4Out[1])
    skyline(x, t, BASE + sink, j => pop01(t, T.city4 + j * 0.04, 0.42, 1.6), { sc: 0.82 })
    const [h0, h1] = T.heart
    const u = t < h0 ? 0 : ease.inOutQuad(prog(t, h0, h1))
    if (u > 0) {
      x.save(); x.globalAlpha = fade
      x.beginPath()
      const N = Math.ceil(u * 160)
      for (let i = 0; i <= N; i++) { const p = hp((i / N) * u); i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y) }
      const done = t >= T.burst
      if (done) x.closePath()
      const pulse = done ? 1 + 0.08 * Math.exp(-(t - T.burst) * 3) * Math.sin((t - T.burst) * 16) : 1
      if (done) { x.translate(HC.x, HC.y + 80); x.scale(pulse, pulse); x.translate(-HC.x, -HC.y - 80) }
      ink(x, GOLD, { w: 12, fa: done ? 0.3 * clamp((t - T.burst) * 4) : 0, fill: PINK, glow: 30 })
      x.restore()
    }
    const P = rocketPose4(t)
    const shake = t > T.c3 && t < T.lift4 + 0.25 ? 3 * Math.sin(t * 80) : 0
    rocket(x, P.x + shake, P.y + (t < T.lift4 ? sink : 0), R4, t, { rot: P.rot, fl: t < T.c3 ? 0 : t < T.lift4 ? 0.35 : 1, a: clamp(prog(t, T.city4, T.city4 + 0.25)) })
    if (t > T.c3 - 0.1) smoke(x, PAD4.x, BASE - 26 + sink, t, ease.outCubic(prog(t, T.c3, T.lift4 + 0.6)), outK(t, 24.0, 0.8), 230)
    sparkle(x, PAD4.x, PAD4.y, t, T.lift4, { n: 12, R: 240, seed: 5 })
    sparkle(x, HC.x, HC.y - 40, t, T.burst, { n: 20, R: 480, seed: 61, size: 34, dur: 0.9 })
  }

  // ── the guide (THE STARS) + Pisces
  const SKY_HOPS = [...BOXES.flatMap(([L]) => talkHops(L, SKY_TAG, { cps: CPS })), ...T.deal.map(d => r3(d - 0.42)), T.rocketLift + 0.05, T.burst]
  const P_HOPS = [T.pisIn + 0.35, T.hydr[0], T.lock + 0.1, T.fish + 0.1, T.friend[0], T.early, T.early + 0.4]
  function guideState(t) {
    const st = { mood: 'neutral', look: [0, 0], squash: 0, blink: undefined, spin: 0 }
    if (t < T.rocketIgn) { st.mood = 'sleepy'; st.look = [0, 0.4] }
    else if (t < T.rocketLift) { st.blink = 1 - prog(t, T.rocketIgn, T.rocketIgn + 0.3); st.look = [1, 0] }
    else if (t < 2.1) { st.mood = 'wide'; st.look = [1, -1]; st.squash = 0.16 * bump(t, T.rocketLift, 0.35); st.blink = false }
    else if (t < 3.6) { st.mood = 'happy' }
    else if (t < 4.6) { st.mood = 'sparkle'; st.look = [1, -1] }
    // earth-bound: eyes chase the falling cards
    else if (t < T.rain[0]) { st.mood = 'wide'; st.look = [-1, 0.6] }
    else if (t < 6.05) { const k = lastHit(t); st.mood = 'wide'; st.look = [k < 0 ? -1 : RAIN[k].x < 420 ? -1 : -0.5, k % 2 ? 1 : 0.2]; st.blink = false }
    else if (t < 7.6) { st.mood = 'squint'; st.look = [-1, 0.6] }
    else if (t < T.hydr[0] + 0.15) { st.mood = 'neutral'; st.look = [0, 0] }
    else if (t < 9.0) { st.mood = 'wide'; st.look = [1, 1]; st.blink = false }
    else if (t < 10.4) { st.mood = 'eyeroll' }
    // the wheels: round and round, then dizzy
    else if (t < T.lock) { st.mood = 'squint'; st.spin = wheelRotB(t) }
    else if (t < T.lock + 0.6) { st.mood = 'wide'; st.spin = 0.35 * Math.exp(-(t - T.lock) * 5) * Math.sin((t - T.lock) * 20); st.squash = 0.14 * bump(t, T.lock, 0.3) }
    else if (t < 12.3) { st.mood = 'squint'; st.spin = 0.12 * Math.sin((t - T.lock) * 9) }
    else if (t < T.lines[2] + 0.5) { st.mood = 'happy'; st.look = [[-1, 0.2], [1, 0.3], [0, 1]][Math.min(2, Math.max(0, Math.floor((t - T.lines[0]) / 0.5556)))] }
    else if (t < 16.2) { st.mood = 'sparkle' }
    // the deck
    else if (t < T.deal[0] - 0.5) { st.mood = 'happy' }
    else if (t < T.flip) { st.mood = 'wink'; st.look = [0, 1] }
    else if (t < T.flip + 0.35) { st.mood = 'wide'; st.look = [0, 1]; st.blink = false }
    else if (t < T.friend[0] + 0.2) { st.mood = 'heart'; st.look = [0, 1] }
    else if (t < 21.2) { st.mood = 'wide'; st.look = [1, 1]; st.blink = false }
    // mission
    else if (t < T.early) { st.mood = 'neutral'; st.look = [0, 0] }
    else if (t < T.lift4) { st.mood = 'squint'; st.look = [1, 0.4] }
    else if (t < T.burst) { st.mood = 'wide'; st.look = [0, -1]; st.blink = false }
    else { st.mood = 'heart' }
    return st
  }
  function guidePos(t) {
    if (t < T.board[0]) return guideAt(t)
    const P = rocketPose4(t), N = { x: P.x, y: P.y - (218 + 100) * R4 }, s0 = guideAt(T.board[0])
    const k = ease.inOutCubic(prog(t, ...T.board))
    return [lerp(s0[0], N.x, k), lerp(s0[1], N.y, k) - Math.sin(Math.PI * k) * 140 + (t < T.lift4 ? ease.inCubic(prog(t, ...T.city4Out)) * 700 : 0), lerp(s0[2], 110, k)]
  }
  function drawGuide(t, a) {
    if (t < 0.3 || a <= 0) return
    const [gx, gy, gs] = guidePos(t)
    const k = pop01(t, 0.3, 0.6, 1.8)
    const st = guideState(t)
    const opts = { color: STARC.sky, glyph: null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: SKY_HOPS, seed: 3, pop: k, alpha: a, glow: 1.1 }
    x.save()
    if (st.spin) { x.translate(gx, gy); x.rotate(st.spin); x.translate(-gx, -gy) }
    const R = drawStarChar(x, gx, gy, gs, t, opts)
    helmet(x, gx, R.y + R.size * 0.04, R.size * 0.6 * k, t, { a })
    x.restore()
  }
  function pisPos(t) {
    if (t < T.board[0] + 0.15) return [PIS_POS.x, PIS_POS.y, PIS_POS.s]
    const P = rocketPose4(t), N = { x: P.x + 75, y: P.y - 20 }, k = ease.inOutCubic(prog(t, T.board[0] + 0.15, T.board[1] + 0.2))
    return [lerp(PIS_POS.x, N.x, k), lerp(PIS_POS.y, N.y, k) - Math.sin(Math.PI * k) * 160 + (t < T.lift4 ? ease.inCubic(prog(t, ...T.city4Out)) * 700 : 0), lerp(PIS_POS.s, 84, k)]
  }
  function drawPisces(t, a) {
    if (t < T.pisIn || a <= 0) return
    const k = pop01(t, T.pisIn, 0.45, 2.2)
    const [px, py0, ps] = pisPos(t)
    const py = py0 + 220 * (1 - ease.outCubic(prog(t, T.pisIn, T.pisIn + 0.5)))
    let mood = 'squint', look = [-1, -0.3], tears = 2, squash = 0
    if (t < 6.4) { mood = 'squint'; tears = 1 }
    else if (t < T.hydr[0]) { tears = 2 }
    else if (t < T.hydr[1]) { mood = 'happy'; look = [0, 0]; tears = 2 }
    else if (t < T.lock) { mood = 'squint'; tears = 2 }
    else if (t < T.lock + 0.8) { mood = 'wide'; look = [-1, -1]; tears = 0; squash = 0.14 * bump(t, T.lock, 0.3) }
    else if (t < T.flip + 0.3) { mood = 'squint'; tears = 1 }
    else if (t < T.fish) { mood = 'heart'; look = [-1, -0.5]; tears = 3 }
    else if (t < T.friend[1]) { mood = 'sparkle'; look = [-1, 0.6]; tears = 1 }
    else if (t < T.early) { mood = 'wide'; look = [-1, 0]; tears = 0 }
    else if (t < T.lift4) { mood = 'happy'; tears = 0; squash = 0.12 * bump(t, T.early, 0.3) }
    else { mood = 'heart'; tears = 3 }
    const opts = { color: PIS.color, glyph: ps > 120 ? PIS.glyph : null, mood, look, squash, hops: P_HOPS, seed: 11, bob: 4, pop: k, alpha: a, glow: 0.8 }
    const R = drawStarChar(x, px, py, ps, t, opts)
    const F = starFrame(px, py, ps, t, opts)
    if (tears) { x.save(); x.globalAlpha = a; inSprite(x, F, () => tearsCells(x, t, tears)); x.restore() }
    // the helmet slowly fills with tears; by the deck it's a fishbowl
    const water = 0.08 + 0.22 * ease.inOutQuad(prog(t, 6.4, 9.4)) + 0.25 * ease.inOutQuad(prog(t, 10.5, 15.5)) + 0.22 * ease.inOutQuad(prog(t, 16.4, T.fish))
    helmet(x, px, R.y + R.size * 0.04, R.size * 0.6 * k, t, { a, water, fish: t >= T.fish ? t - T.fish : null, tint: PIS.color })
    if (t >= T.fish) sparkle(x, px, R.y, t, T.fish, { n: 8, R: 120, seed: 71, size: 20, dur: 0.6 })
    return R
  }
  function drawAsides(t) {
    const one = (txt, [a0, a1], ax, ay) => aside(x, ax, ay, txt, pop01(t, a0, 0.3, 2.4) * outK(t, a1 - 0.2, 0.2), { size: 36, edge: PIS.color, tx: PIS_POS.x - 20, ty: PIS_POS.y - 60 })
    if (t >= T.hydr[0] && t < T.hydr[1]) one("it's fine. i'm hydrating.", T.hydr, 760, 1330)
    if (t >= T.friend[0] && t < T.friend[1]) one('…i made a friend.', T.friend, 780, 1390)
    if (t >= T.early && t < T.earlyOut) {
      const [px, py] = pisPos(t)
      aside(x, Math.min(880, px + 40), py - 120, 'LIFTOFF!!', pop01(t, T.early, 0.3, 2.6) * outK(t, T.earlyOut - 0.2, 0.2), { size: 40, edge: PIS.color, col: PINK, tx: px, ty: py - 40 })
    }
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const fadeAll = 1 - ease.inQuad(prog(t, ...T.fade))
        drawHook(t); drawRain(t); drawWheels(t); drawDeck(t); drawMission(t)
        const pisA = fadeAll * (t < 9.8 ? 1 : t < T.board[0] ? 1 : 1)
        drawPisces(t, pisA)
        drawGuide(t, fadeAll)
        drawLineChips(t)
        drawAsides(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      eyebrow.style.opacity = String(t < T.h0Out ? ease.outCubic(prog(t, 0.08, 0.4)) * outK(t, T.h0Out) : ease.outCubic(prog(t, T.eye4, T.eye4 + 0.25)) * outK(t, T.h4Out))
      eyebrow.textContent = t < T.h0Out ? 'HOUSTON, TX' : t < T.lift4 ? 'LAUNCH WINDOW: TONIGHT' : 'LIFTOFF ✦'
      for (const [H, o] of HEADS) H.update(t, outK(t, o, 0.22))
      for (const b of boxes) b.update(t)
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette; the engine moves pitched cues into the key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FILM_CUES = [
  // hook
  ...wordPops(T.h0, 3, 0.07, 0),
  ['pluck', T.h0Late, 1174.66, 0.05, 0.6, 0], ['pop', T.h0Late, 1318.51, 0.05, -0.1], ['pop', r3(T.h0Late + 0.09), 1479.98, 0.045, 0.1],
  ['riser', r3(T.rocketIgn - 0.2), r3(T.rocketLift + 0.1), 0.05], ['tick', T.rocketIgn, 0.04],
  ['boom', r3(T.rocketLift), 0.14], ['whoosh', r3(T.rocketLift), 1.6, 0.06], ['glitter', r3(T.rocketLift), r3(T.rocketLift + 0.8)],
  ['pop', r3(T.rocketLift + 0.04), 1318.51, 0.035, -0.4],
  // earth-bound
  ...wordPops(T.h1, 7, 0.07, 1, 0.026),
  ['whoosh', r3(T.h1Late - 0.05), 0.35, 0.04], ['boom', r3(T.h1Late + 0.1), 0.09], ['pluck', r3(T.h1Late + 0.1), 146.83, 0.05, 0.5, 0],
  ['pop', T.person, 740, 0.05, 0], ['pop', T.pisIn, 987.77, 0.035, 0.6],
  ...RAIN.filter(c => c.umb).map(c => ['tick', r3(c.tHit), 0.03]),
  ['pop', T.hydr[0], 659.25, 0.035, 0.5], ['pop', r3(T.hydr[0] + 0.14), 587.33, 0.03, 0.5],
  // charts
  ...wordPops(T.h2, 3, 0.07, 2, 0.026),
  ['pluck', T.h2Late, 880, 0.05, 0.6, 0], ['pop', T.h2Late, 1174.66, 0.05, 0],
  ['whoosh', T.wA[0], 0.6, 0.05], ['whoosh', T.wB[0], 0.6, 0.05],
  ['boom', r3(T.lock), 0.12], ['bell', r3(T.lock), 587.33, 0.05, 2.0, 0], ['glitter', r3(T.lock), r3(T.lock + 0.6)],
  ...PAIRS.map((_, i) => ['pop', r3(T.dots + i * 0.08), [740, 880, 987.77][i], 0.035, (i - 1) * 0.3]),
  ...T.lines.map((s, i) => ['pluck', r3(s), [659.25, 880, 1174.66][i], 0.055, 0.6, (i - 1) * 0.3]),
  ...T.lines.map((s, i) => ['pop', r3(s + 0.3), [987.77, 1174.66, 1318.51][i], 0.03, (i - 1) * 0.3]),
  ['bell', r3(T.lines[2]), 1174.66, 0.04, 1.8, 0],
  // deck
  ...wordPops(T.h3, 4, 0.07, 3, 0.026),
  ['pluck', r3(T.h3Late), 1318.51, 0.05, 0.6, 0],
  ...T.deal.map(s => ['whoosh', r3(s - 0.4), 0.4, 0.03]),
  ...T.deal.map((s, i) => ['pop', r3(s), [587.33, 659.25, 739.99, 880, 987.77][i], 0.05, ((i % 2) - 0.5) * 0.4]),
  ['whoosh', r3(T.flip + 0.05), 0.4, 0.04], ['bell', r3(T.flip + 0.3), 1318.51, 0.05, 2.0, 0], ['bell', r3(T.flip + 0.36), 1975.53, 0.03, 2.0, 0], ['glitter', r3(T.flip + 0.3), r3(T.flip + 1.0)],
  ['bell', T.fish, 1760, 0.03, 1.2, 0.5], ['pop', r3(T.fish + 0.1), 1318.51, 0.03, 0.5],
  ['pop', T.friend[0], 880, 0.03, 0.5], ['pop', r3(T.friend[0] + 0.14), 1174.66, 0.03, 0.5],
  ['whoosh', T.cardsOut, 0.6, 0.04],
  // mission
  ...wordPops(T.h4, 1, 0.07, 0, 0.03),
  ['pluck', r3(T.h4Late), 880, 0.05, 0.6, 0], ['pop', r3(T.h4Late), 1174.66, 0.045, -0.1], ['pop', r3(T.h4Late + 0.12), 1318.51, 0.045, 0.1], ['pop', r3(T.h4Late + 0.24), 1479.98, 0.05, 0],
  ['whoosh', T.board[0], 0.5, 0.03],
  ['tick', r3(T.c3), 0.05], ['tick', r3(T.c2), 0.05], ['tick', r3(T.c1), 0.05],
  ['pop', T.early, 1318.51, 0.045, 0.4], ['pop', r3(T.early + 0.1), 1567.98, 0.04, 0.4],
  ['riser', r3(T.lift4 - 0.6), r3(T.lift4), 0.05], ['boom', r3(T.lift4), 0.12], ['whoosh', r3(T.lift4), 1.0, 0.05],
  ['glitter', T.heart[0], T.heart[1]],
  ['bell', T.burst, 880, 0.05, 2.2, -0.2], ['bell', r3(T.burst + 0.06), 1174.66, 0.045, 2.2, 0.2], ['bell', r3(T.burst + 0.12), 1760, 0.03, 2.0, 0],
  ['whoosh', r3(T.heart[1] + 0.05), 0.6, 0.05],
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [SKY_TAG]: 739.99 } })),
]

// card-motif candidate cuts (cardfx keeps 9.97 + 21.68):
//   4.62  "Space City" out (4.3–4.52), box stays open → "Earth-bound?" (4.72)
//   9.97  box 1 shut (9.55), H1 out (9.82), rain gone → "The stars read both charts." (10.05)
//  16.25  box 2 shut (15.6), wheels out (16.15) → "Tonight's deck" (16.4)
//  21.68  box 3 shut (20.95), deck flown off (21.5) → "Mission: find your person." (21.95)
const CUTS = [{ t: 4.62, kind: 'flip' }, { t: 9.97, kind: 'shuffle' }, { t: 16.25, kind: 'deal' }, { t: 21.68, kind: 'flip', dir: -1 }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
export { T, BOXES as ALL_BOXES }
