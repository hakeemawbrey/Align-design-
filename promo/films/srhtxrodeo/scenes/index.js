// srhtxrodeo (20 s vertical, Star Talk Remix of htxrodeo "Rodeo season") · story 0–15.6, then the shared end card.
// Your guide is ♐ Sagittarius: the centaur, so the only star here who is actually half horse. ♓ Pisces cries in the back.
//   0.00–4.40  "Rodeo season. | Suddenly *everyone's* | a cowboy."  Three sign stars pop up; cowboy hats drop onto them on
//              the eighth notes (price tags still on), then onto Pisces (far too big: over its eyes, crying underneath)
//              and the moon. They line-dance on the beat. Sag squints. Box: "I'm half horse. your hats still have *tags.*"
//   4.40–8.60  "Want someone | *real?*"  Sag stomps: every hat flies off. Under them: FIRST RODEO, SCARED OF COWS, RENTED
//              BOOTS. Box: "cute hat. but who's *under* it?"  (card cut 8.62)
//   8.62–12.7  "Card *first.* | Face last."  The veiled mystery card drops in. A stray hat lands on it; the card shrugs it
//              off. Box: "no costumes. card first. the *real* them."
//   12.7–15.4  "Find the | *real thing.*"  Sag spins a gold lasso and ropes a big gold star, which blushes heart-eyed.
//              Pisces happy-cries. Everything out by 15.42.
// One canvas (sky + props + stars), DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCells, drawHat, tagChip, drawLasso, sparkle, BONE, GOLD, PINK, CYAN, TAN, RED, MONO } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const SAG = signStar('sagittarius'), PIS = signStar('pisces')
const SG = '♐ SAGITTARIUS STAR'

// ── the timeline
const T = {
  h0: 0.12, h0Late: 1.0, h0Out: [4.22, 4.4],
  sagIn: 0.3, rowIn: [BEAT(0), BEAT(0.5), BEAT(1)], pisIn: 1.0,
  hats: [BEAT(1.5), BEAT(2), BEAT(2.5)], pisHat: BEAT(3), moonHat: BEAT(3.5), dance: [BEAT(4), BEAT(7.5)],
  open: 1.85, l1: 2.05,
  h1: 4.49, h1Late: 4.95, h1Out: [8.3, 8.48],
  stomp: BEAT(8) - 0.12, fly: BEAT(8), tags: [5.62, 5.86, 6.1], l2: 6.5, rowOut: [8.12, 8.44],
  h2: 8.7, h2Late: 9.1, h2Out: [12.55, 12.72],
  card: [8.7, BEAT(15)], hat: [9.4, 9.86], shrug: 10.3, l3: 10.55, cardOut: [12.42, 12.78],
  h3: BEAT(22), h3Late: 13.2,
  big: 12.9, spin: [12.95, 13.5], toss: [13.5, 13.86], cinch: [13.86, 14.06], cheer: 14.0,
  close: 14.9, out: [15.0, 15.42], h3Out: [15.2, 15.42],
}
const LINES = [
  { t: T.l1, speaker: SG, text: "I'm half horse. your hats still have *tags.*" },
  { t: T.l2, speaker: SG, text: "cute hat. but who's *under* it?" },
  { t: T.l3, speaker: SG, text: 'no costumes. card first. the *real* them.' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const SEAT = { x: 290, y: 1262, size: 290 }
const PSEAT = { x: 884, y: 1300, size: 160 }
const ROW = [
  { id: 'virgo', x: 200, y: 840, size: 180, hat: TAN, tag: 'FIRST RODEO', seed: 2 },
  { id: 'gemini', x: 540, y: 800, size: 190, hat: PINK, tag: 'SCARED OF COWS', seed: 4 },
  { id: 'leo', x: 880, y: 840, size: 180, hat: CYAN, tag: 'RENTED BOOTS', seed: 5 },
].map(r => ({ ...r, ...signStar(r.id) }))
const MOON = { x: 930, y: 112, s: 0.46 }
const CARD = { x: 590, y: 880, w: 520 }
const BIG = { x: 680, y: 880, size: 300 }
const DANCE = Array.from({ length: 8 }, (_, i) => +(T.dance[0] + i * 0.5556).toFixed(3))

const SAG_HOPS = [T.sagIn + 0.3, ...talkHops(LINES, SG, { cps: CPS }), T.stomp, T.cheer, T.cheer + 0.62]
const PIS_HOPS = [T.pisIn + 0.3, T.fly + 0.4, T.cheer + 0.12, T.cheer + 0.74, T.cheer + 1.36]
const rowHops = i => [T.rowIn[i] + 0.3, ...DANCE.filter((_, k) => (k + i) % 2 === 0), T.fly + 0.05 + i * 0.04]

function sagState(t) {
  if (t < T.hats[0]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.l1) { const k = t < T.hats[1] ? 0 : t < T.hats[2] ? 1 : 2; return { mood: 'squint', look: [[-1, -1], [1, -1], [1, -1]][k] } }
  if (t < T.stomp - 0.3) return { mood: t < 3.4 ? 'squint' : 'eyeroll', look: [0, 0] }
  if (t < T.fly + 0.6) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < 8.62) return { mood: t > T.tags[0] + 0.2 ? 'squint' : 'happy', look: [1, -1] }
  if (t < T.card[1] + 0.3) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.hat[1]) return { mood: 'heart' }
  if (t < T.shrug) return { mood: 'eyeroll' }
  if (t < T.h3) return { mood: 'happy' }
  if (t < T.toss[1]) return { mood: 'squint', look: [1, -1] }
  return { mood: 'happy' }
}
function rowState(i, t) {
  if (t < T.hats[i]) return { mood: 'neutral', look: [i === 0 ? 1 : -1, -1] }
  if (t < T.fly) return { mood: 'happy' }
  if (t < T.fly + 0.5) return { mood: 'wide', look: [0, -1], blink: false }
  return { mood: 'wide', look: [i === 2 ? -1 : 1, 1], blush: true }
}
function pisState(t) {
  if (t < T.pisHat) return { mood: 'neutral', tears: 0 }
  if (t < T.fly) return { mood: 'squint', tears: 2 }
  if (t < T.fly + 0.5) return { mood: 'wide', look: [0, -1], tears: 0, blink: false }
  if (t < 8.62) return { mood: 'squint', tears: 1 }
  if (t < T.h3) return { mood: 'heart', tears: 1 }
  return { mood: 'happy', tears: 3 }
}

// a star's top tip in world space at time t (pure; mirrors drawStarChar's transform)
function topOf(cx, cy, size, t, opts) {
  const F = starFrame(cx, cy, size, t, opts)
  return { x: F.ox, y: F.oy - F.base - F.S / 2 + 2 * F.cell * F.sy, F }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const card = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-profile-2.png' })
  let cardBmp = null
  if (card) { const c = document.createElement('canvas'); c.width = 840; c.height = Math.round(840 * card.height / card.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(card, 0, 0, c.width, c.height); cardBmp = c }
  const CH = cardBmp ? CARD.w * cardBmp.height / cardBmp.width : CARD.w * 1.5

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, "Rodeo season. | Suddenly *everyone's* | a cowboy.", { top: 150, size: 104, accentSize: 130, at: T.h0, gap: 0.1, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h0Late, lateGap: 0.14, fit: true })
  const H1 = popText(root, 'Want someone | *real?*', { top: 210, size: 120, accentSize: 170, at: T.h1, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.h1Late, lineHeight: 0.98 })
  const H2 = popText(root, 'Card *first.* | Face last.', { top: 190, size: 116, accentSize: 150, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h2Late, lateGap: 0.14 })
  const H3 = popText(root, 'Find the | *real thing.*', { top: 200, size: 128, accentSize: 170, at: T.h3, gap: 0.08, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h3Late, lateGap: 0.12, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // a hat with an optional price tag dangling off the right brim (hat-local units)
  function hatAt(px, py, col, s, rot, a, tag) {
    x.save(); x.translate(px, py); x.rotate(rot)
    drawHat(x, col, s, a)
    if (tag) {
      x.save(); x.scale(s, s); x.globalAlpha *= a
      const sw = Math.sin(px * 0.01 + py * 0.01) * 0.2
      x.translate(96, -14); x.rotate(sw)
      x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 30); x.stroke()
      x.fillStyle = '#fbf3e4'; x.fillRect(-20, 30, 40, 28); x.fillStyle = '#1b1236'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('$', 0, 45)
      x.restore()
    }
    x.restore()
  }
  // a hat that dropped at t0 onto a target (tx, ty) and flies off at fly (pure)
  function hatLife(t, t0, tgt, flyAt, dir, seed) {
    const p = prog(t, t0 - 0.28, t0)
    if (p <= 0) return null
    let px = tgt.x, py = lerp(tgt.y - 420, tgt.y, ease.inQuad(p)), rot = (1 - p) * 0.5 * dir, sq = 1, a = clamp(p * 3)
    if (t > t0) { const d = t - t0; sq = 1 + 0.2 * Math.exp(-d * 9) * Math.cos(d * 26) }
    const dt = t - flyAt
    if (dt > 0) {
      if (dt > 1.2) return null
      px += dir * 420 * dt; py += -1500 * dt + 0.5 * 2600 * dt * dt; rot += dir * dt * 9 + seed; a *= 1 - prog(dt, 0.9, 1.2)
    }
    return { px, py, rot, sq, a }
  }

  function drawRow(t) {
    if (t > T.rowOut[1] + 0.02) return
    ROW.forEach((R, i) => {
      const k = pop01(t, T.rowIn[i], 0.36, 2.1) * popOut(t, [T.rowOut[0] + i * 0.05, T.rowOut[1] + i * 0.05 - 0.1])
      if (k <= 0.02) return
      const st = rowState(i, t)
      const opts = { hops: rowHops(i), seed: R.seed, pop: k }
      drawStarChar(x, R.x, R.y, R.size, t, { color: R.color, glyph: R.glyph, mood: st.mood, look: st.look, blush: st.blush, ...opts })
      const top = topOf(R.x, R.y, R.size, t, opts)
      const tgt = { x: top.x, y: top.y + R.size * 0.2 }
      const h = hatLife(t, T.hats[i], tgt, T.fly + i * 0.04, [-1, 1, 1][i], i * 0.3)
      if (h) hatAt(h.px, h.py, R.hat, R.size / 250 * k, h.rot, h.a, t < T.fly)
      // the reveal tag
      const tk = pop01(t, T.tags[i], 0.32, 2.6) * popOut(t, [T.rowOut[0] + i * 0.05, T.rowOut[1] + i * 0.05 - 0.1])
      if (tk > 0) tagChip(x, R.x + (i === 0 ? 30 : i === 2 ? -30 : 0), top.y - 50 + (i === 1 ? 0 : 0), R.tag, tk, [GOLD, PINK, CYAN][i], 28)
      sparkle(x, R.x, R.y, t, T.rowIn[i], { n: 8, R: 130, seed: 5 + i, size: 22 })
    })
  }
  function drawMoonHat(t) {
    const h = hatLife(t, T.moonHat, { x: MOON.x, y: MOON.y }, T.fly + 0.14, 1, 0.8)
    if (h) hatAt(h.px, h.py, '#f2ede2', MOON.s, h.rot + 0.12, h.a * popOut(t, T.out), false)
  }

  function drawPisces(t, ok) {
    const pp = pop01(t, T.pisIn, 0.36, 2.1) * ok
    if (pp <= 0.02) return
    const st = pisState(t)
    const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const opts = { hops: PIS_HOPS, seed: 6, pop: pp, squash: sob }
    const r = drawStarChar(x, PSEAT.x, PSEAT.y, PSEAT.size, t, { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 0.9, ...opts })
    const F = starFrame(PSEAT.x, PSEAT.y, PSEAT.size, t, opts)
    inSprite(x, F, () => tearsCells(x, t, st.tears))
    // the far-too-big hat, right over its eyes
    const h = hatLife(t, T.pisHat, { x: r.x, y: r.y + PSEAT.size * 0.08 }, T.fly + 0.1, 1, 0.5)
    if (h) hatAt(h.px, h.py, GOLD, 0.98, h.rot - 0.06, h.a, t < T.fly)
  }
  function drawSag(t, ok) {
    const sp = pop01(t, T.sagIn, 0.38, 2.2) * ok
    if (sp <= 0.02) return null
    const st = sagState(t)
    let squash = 0
    if (t >= T.stomp && t < T.stomp + 0.5) squash += 0.24 * Math.exp(-(t - T.stomp - 0.3) * 6) * Math.max(0, Math.cos((t - T.stomp) * 20)) * (t > T.stomp + 0.3 ? 1 : 0)
    const opts = { hops: SAG_HOPS, seed: 3, pop: sp, squash }
    const r = drawStarChar(x, SEAT.x, SEAT.y, SEAT.size, t, { color: SAG.color, glyph: SAG.glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 1.1, ...opts })
    const F = starFrame(SEAT.x, SEAT.y, SEAT.size, t, opts)
    if (t > T.shrug - 0.6 && t < T.shrug) inSprite(x, F, () => sweatCells(x, t))
    // stomp dust
    if (t > T.fly && t < T.fly + 0.6) sparkle(x, SEAT.x, SEAT.y + 120, t, T.fly, { n: 10, R: 200, seed: 9, size: 24, cols: [TAN, BONE, GOLD] })
    return { ...r, F }
  }

  function drawCard(t) {
    if (!cardBmp || t < T.card[0] || t > T.cardOut[1]) return
    const pin = prog(t, ...T.card), land = easeOutBack(pin, 1.5)
    let cy = lerp(-CH, CARD.y, land) + Math.sin((t - T.card[1]) * 2.2) * 8 * (pin >= 1 ? 1 : 0)
    let rot = (1 - land) * -0.25 + 0.02 * Math.sin(t * 1.7), sc = 1
    // the shrug: a quick wiggle that throws the hat off
    if (t > T.shrug && t < T.shrug + 0.5) { const d = t - T.shrug; rot += 0.12 * Math.sin(d * 30) * Math.exp(-d * 6); cy -= 30 * Math.sin(Math.PI * Math.min(1, d / 0.2)) }
    const go = prog(t, ...T.cardOut)
    if (go > 0) { const e = ease.inCubic(go); cy = lerp(cy, -CH, e); sc = lerp(1, 0.7, e) }
    const ga = (pin >= 1 ? 1 : pin) * (1 - go)
    if (ga > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(CARD.x, cy, 30, CARD.x, cy, 520)
      g.addColorStop(0, `rgba(255,190,220,${0.36 * ga})`); g.addColorStop(0.5, `rgba(242,199,92,${0.13 * ga})`); g.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = g; x.beginPath(); x.arc(CARD.x, cy, 520, 0, Math.PI * 2); x.fill()
      x.restore()
    }
    x.save(); x.translate(CARD.x, cy); x.rotate(rot); x.scale(sc, sc)
    x.shadowColor = 'rgba(6,4,18,0.8)'; x.shadowBlur = 40
    x.drawImage(cardBmp, -CARD.w / 2, -CH / 2, CARD.w, CH)
    x.restore()
    // the stray hat: drifts down, lands on the card's top edge, gets shrugged off to the right
    const hp = prog(t, ...T.hat)
    if (hp > 0) {
      let hx = lerp(CARD.x - 260, CARD.x + 40, ease.outQuad(hp)), hy = lerp(380, cy - CH / 2 + 14, ease.inOutQuad(hp)), hr = Math.sin(hp * 9) * 0.4 * (1 - hp) + 0.14, a = 1
      const dt = t - T.shrug
      if (dt > 0) { if (dt > 1.1) return; hx += 700 * dt; hy += -1200 * dt + 0.5 * 2600 * dt * dt; hr += dt * 10; a = 1 - prog(dt, 0.8, 1.1) }
      hatAt(hx, hy, TAN, 0.9, hr, a * (1 - go), false)
    }
  }

  function drawBig(t, sag, ok) {
    const bp = pop01(t, T.big, 0.4, 2.2) * ok
    if (bp <= 0.02) return
    const caught = t >= T.cinch[0]
    const mood = t < T.toss[1] ? (t < T.spin[1] ? 'neutral' : 'wide') : 'heart'
    const look = t < T.toss[1] ? [-1, 1] : [0, 0]
    const hops = [T.big + 0.3, T.cheer + 0.05, T.cheer + 0.67, T.cheer + 1.29]
    const squash = caught ? 0.16 * Math.exp(-(t - T.cinch[0]) * 6) * Math.cos((t - T.cinch[0]) * 22) : 0
    drawStarChar(x, BIG.x, BIG.y, BIG.size, t, { color: STAR.sky, mood, look, blink: t < T.toss[1] ? undefined : false, blush: caught ? 0.95 : undefined, glow: 1.3, hops, seed: 8, pop: bp, squash })
    // lasso
    if (!sag || t < T.spin[0]) return
    const hand = { x: sag.x + SEAT.size * 0.36, y: sag.y - SEAT.size * 0.08 }
    const spinC = { x: sag.x + 30, y: sag.top - 70 }
    const target = { x: BIG.x, y: BIG.y + BIG.size * 0.24 + Math.sin(t * 2.2 + 8 * 2.1) * BIG.size * 0.035 }
    let cx = spinC.x, cy = spinC.y, rx = 120, ry = 34
    const tp = ease.inOutQuad(prog(t, ...T.toss))
    cx = lerp(cx, target.x, tp) ; cy = lerp(cy, target.y, tp) - Math.sin(Math.PI * tp) * 160
    rx = lerp(rx, 190, tp); ry = lerp(ry, 52, tp)
    const cp = ease.outCubic(prog(t, ...T.cinch))
    rx = lerp(rx, 112, cp); ry = lerp(ry, 34, cp)
    const spin = t * 6
    const wob = t < T.toss[0] ? Math.sin(t * 14) * 10 : 0
    drawLasso(x, hand.x, hand.y, cx + wob, cy, rx, ry, spin, pop01(t, T.spin[0], 0.2) * ok)
    if (caught) { sparkle(x, target.x, target.y, t, T.cinch[0], { n: 16, R: 260, seed: 33, size: 28 }) }
  }

  function hearts(t, t0, n, cx, cy) {
    for (let i = 0; i < n; i++) {
      const born = t0 + i * 0.34, p = (t - born) / 1.2
      if (p < 0 || p >= 1) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * p); drawPixelStar(x, cx + Math.sin(p * 6 + i) * 40 + (i % 2 ? 50 : -50), cy - p * 220, 24, 2, PINK); x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        drawMoonHat(t)
        drawRow(t)
        drawCard(t)
        drawPisces(t, ok)
        const sag = drawSag(t, ok)
        drawBig(t, sag, ok)
        if (t > T.cinch[0]) hearts(t, T.cinch[0] + 0.1, 5, BIG.x, BIG.y - 140)
        if (t >= T.cheer) sparkle(x, 540, 1150, t, T.cheer + 0.1, { n: 14, R: 380, seed: 4, size: 28, cols: [GOLD, PINK, BONE, CYAN] })
        if (t > T.fly - 0.02 && t < T.fly + 0.7) sparkle(x, 540, 760, t, T.fly, { n: 14, R: 420, seed: 12, size: 26, cols: [GOLD, TAN, PINK, BONE] })
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.44 (hook → hats off), 8.62 (the reveal → the card), 12.76 (card → lasso).
// cardfx keeps one for a 20 s film: the 8.62 flip, which also hides the row popping away.
const CUTS = [4.44, { t: 8.62, kind: 'flip' }, 12.76]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop/pluck/bell are re-keyed by the engine; chip/tom/clap sit on a private sfx bus)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const plop = (t, f) => [['pop', t, f, 0.05, 0], ['tom', t, 180, { ...FX, gain: 0.1, decay: 0.08 }]]
const stomp = t => [['tom', t, 70, { ...FX, gain: 0.34, decay: 0.3 }], ['boom', t, 0.12], ['clap', t + 0.005, { ...FX, gain: 0.12 }]]
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.04, f0: 900, f1: 2600 }]]; for (let k = 0; k < 12; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.06, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // hook: the hats
  ...wordPops(T.h0, 3, 0.1, 0, 0.026), ['pop', T.h0Late, 1174.66, 0.05, 0], ['pop', T.h0Late + 0.14, 1318.51, 0.055, 0], ['pluck', T.h0Late + 0.14, 1174.66, 0.05, 0.6, 0],
  ['pop', T.sagIn + 0.05, 739.99, 0.045, -0.3], ...T.rowIn.map((r, i) => ['pop', r + 0.04, [880, 987.77, 1174.66][i], 0.035, (i - 1) * 0.5]), ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4],
  ...[...T.hats, T.pisHat, T.moonHat].flatMap((h, i) => plop(h, [587.33, 739.99, 880, 440, 1174.66][i])),
  ...DANCE.map((d, i) => ['clap', d, { ...FX, gain: 0.05, pan: i % 2 ? 0.4 : -0.4 }]),
  ...sob(T.pisHat + 0.4, 1320), ...sob(3.6, 1250, 2),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SG]: 659.25 } }),
  // hats off
  ['whoosh', T.h0Out[0], 0.3, 0.04], ...head(T.h1, 2, 0.08, T.h1Late, 2),
  ...stomp(T.fly), ['whoosh', T.fly + 0.02, 0.5, 0.07], ['glitter', T.fly, T.fly + 0.6],
  ...[0, 1, 2, 3, 4].map(i => ['pop', +(T.fly + 0.04 + i * 0.05).toFixed(3), [1318.51, 1174.66, 987.77, 880, 739.99][i], 0.03, (i - 2) * 0.3]),
  ...T.tags.map((tg, i) => ['pluck', tg, [392, 349.23, 329.63][i], 0.04, 0.5, (i - 1) * 0.5]), ['tick', T.tags[2] + 0.2, 0.04],
  ['whoosh', T.rowOut[0], 0.3, 0.03],
  // the card
  ...head(T.h2, 2, 0.08, T.h2Late, 4), ['pop', T.h2Late + 0.14, 1318.51, 0.04, 0],
  ['whoosh', T.card[0] - 0.05, 0.4, 0.07], ['bell', T.card[1], 1318.51, 0.045, 1.8, 0], ['glitter', T.card[1], T.card[1] + 0.7],
  ['whoosh', T.hat[0], 0.4, 0.03], ...plop(T.hat[1], 440), ['pluck', T.hat[1] + 0.1, 349.23, 0.035, 0.4, 0],
  ['whoosh', T.shrug, 0.3, 0.05], ['pop', T.shrug + 0.02, 987.77, 0.045, 0.4], ['pluck', T.shrug + 0.1, 1318.51, 0.035, 0.5, 0.4],
  // the lasso
  ['whoosh', T.cardOut[0], 0.35, 0.04], ...head(T.h3, 2, 0.08, T.h3Late, 1), ['pop', T.h3Late + 0.12, 1318.51, 0.05, 0],
  ['pop', T.big + 0.05, 587.33, 0.045, 0.3],
  ...[0, 1, 2].map(i => ['whoosh', +(T.spin[0] + i * 0.18).toFixed(3), 0.16, 0.035]), ['whoosh', T.toss[0], 0.4, 0.06],
  ['boom', T.cinch[0], 0.1], ['bell', T.cinch[0], 1174.66, 0.05, 1.4, 0.3], ['bell', T.cinch[0] + 0.08, 1760, 0.035, 1.4, 0.4], ['glitter', T.cinch[0], T.cinch[0] + 0.6],
  ...cheers(T.cheer, T.cheer + 1.6), ...sob(T.cheer + 0.3, 1568), ...sob(T.cheer + 1.0, 1660, 2),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
