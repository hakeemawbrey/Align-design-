// srhtxbayou (20 s vertical, Star Talk Remix of htxbayou "Sunset walk on Buffalo Bayou") · story 0–15.6, then the end card.
// ♎ Libra (Venus-ruled, the sign of partnership) takes the perfect date walk… alone. ♓ Pisces cries on the far bank.
//   0.00–4.40  "Perfect date: | a sunset walk on | *Buffalo Bayou.*"  The sunset bayou opens (sun, skyline, river, trail).
//              Libra strolls the trail, hopping on the beat; beside it an empty dashed star pops up with a "?".
//              Box: "golden hour. skyline. bayou. *perfect.*"
//   4.40–8.60  "Who *with?*"  Night falls. Libra looks left, right. ♈ Aries jogs past at full speed ("ON YOUR LEFT!") and
//              spins Libra round. Box: "I'm the *partnership* sign. this is tragic." Libra leans on the empty star; it
//              pops. Pisces sobs.  (card cut 8.62)
//   8.62–12.7  "Tonight's deck, | dealt from the *stars.*"  The camera tilts up off the bayou; five card backs shoot in
//              like falling stars and fan out, the centre one glows. Libra and Pisces look up, heart-eyed.
//              Box (THE STARS): "we deal a new deck. *every* night."
//   12.7–15.4  "Your walk *partner* | is out there."  Back on the night bayou: the glowing card shrinks into a star and
//              falls far down the trail, where a gold star pops up; a gold dotted trail runs from Libra to it.
//              Libra goes heart-eyed, Pisces happy-cries. Everything out by 15.42.
// One canvas (sky + bayou + deck + stars), DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCells, drawBayouScene, xOf, yOf, pathU, riverU, RIVER_W, qmark, ink, sparkle, tagChip, rgba,
  BONE, GOLD, PINK, SUN, VIOLET, BLUE, D2R, TAU } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const LIB = signStar('libra'), PIS = signStar('pisces'), ARI = signStar('aries')
const LB = '♎ LIBRA STAR', SKY = 'THE STARS'
const SHIFT = -260                             // the whole bayou sits higher than the original so the box clears it

// ── the timeline
const T = {
  h0: 0.1, h0Late: 0.82, h0Out: [4.22, 4.4],
  libIn: 0.45, pisIn: 1.2, slot: 2.05, q: BEAT(3),
  open: 1.62, l1: 1.82,
  h1: 4.49, h1Late: 4.95, h1Out: [8.3, 8.48],
  night: [4.3, 6.0], look: [4.6, 5.15], jog: [5.1, 5.95], spin: [5.72, 6.22], l2: 6.25, lean: [7.55, 7.85], poof: 7.9,
  h2: 8.7, h2Late: 9.15, h2Out: [12.55, 12.72],
  tilt: [8.62, 9.3], deal: [9.05, 9.3, 9.55, 9.8, 10.05], glow: 10.3, l3: 10.45, cardsOut: 12.2,
  back: [12.3, 12.85], starFall: [12.45, 13.15], partner: 13.15, trail: [13.35, 14.0],
  h3: BEAT(22), cheer: 13.45,
  close: 14.9, out: [15.0, 15.42], h3Out: [15.2, 15.42],
}
const LINES = [
  { t: T.l1, speaker: LB, text: 'golden hour. skyline. bayou. *perfect.*' },
  { t: T.l2, speaker: LB, text: "I'm the *partnership* sign. this is tragic." },
  { t: T.l3, speaker: SKY, text: 'we deal a new deck. *every* night.' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout (screen space; the bayou is drawn with SHIFT)
const LZ = 1.55, FAR_Z = 3.8
const gy = z => yOf(z) + SHIFT
const LIBP = { x: xOf(pathU(LZ) - 0.2, LZ), y: gy(LZ) - 96, size: 230 }
const SLOT = { x: xOf(pathU(LZ) + 0.22, LZ), y: gy(LZ) - 96, size: 210 }
const PISP = { x: xOf(riverU(2.2) + RIVER_W + 0.15, 2.2), y: gy(2.2) - 50, size: 140 }
const FARP = { x: xOf(pathU(FAR_Z) + 0.1, FAR_Z), y: gy(FAR_Z) - 46, size: 120 }
const CW = 260, CH = Math.round(260 * 2347 / 1528)
const FAN = [0, 1, 2, 3, 4].map(i => ({ x: 540 + (i - 2) * 118, y: 780 + Math.abs(i - 2) * 26, rot: (i - 2) * 11 }))
const DEAL_ORDER = [0, 4, 1, 3, 2]
const WALK = Array.from({ length: 7 }, (_, i) => +(BEAT(1 + i * 0.5)).toFixed(3))       // the stroll: a hop every eighth

const LIB_HOPS = [T.libIn + 0.3, ...WALK, ...talkHops(LINES, LB, { cps: CPS }).filter(h => h > T.l2), T.partner + 0.1, T.cheer, T.cheer + 0.62, T.cheer + 1.24]
const PIS_HOPS = [T.pisIn + 0.3, T.glow + 0.1, T.cheer + 0.12, T.cheer + 0.74]

function libState(t) {
  if (t < T.slot) return { mood: 'happy' }
  if (t < T.q + 0.3) return { mood: 'neutral', look: [1, 0] }
  if (t < T.h0Out[1]) return { mood: 'happy' }
  if (t < T.look[1]) { const s = Math.sin((t - T.look[0]) * 9); return { mood: 'neutral', look: [s > 0 ? 1 : -1, 0] } }
  if (t < T.jog[0] + 0.35) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.spin[1] + 0.2) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.lean[0]) return { mood: 'squint', look: [0, 1] }
  if (t < T.poof + 0.35) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < 8.62) return { mood: 'sleepy', zzz: false }
  if (t < T.glow) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.cardsOut) return { mood: 'heart' }
  if (t < T.partner) return { mood: 'wide', look: [-1, -1], blink: false }
  return { mood: 'heart' }
}
function pisState(t) {
  if (t < T.slot) return { mood: 'neutral', tears: 0, look: [-1, 0] }
  if (t < T.h1) return { mood: 'squint', tears: 1 }
  if (t < T.poof) return { mood: 'squint', tears: 2 }
  if (t < 8.62) return { mood: 'squint', tears: 3 }
  if (t < T.glow) return { mood: 'wide', look: [-1, -1], tears: 0, blink: false }
  if (t < T.partner) return { mood: 'heart', tears: 1 }
  return { mood: 'happy', tears: 3 }
}

/** a 5-point star outline (dashed), centred at (cx, cy) */
function dashedStar(x, cx, cy, R, col, a, t) {
  if (a <= 0 || R <= 0) return
  x.save(); x.globalAlpha *= a; x.setLineDash([14, 12]); x.lineDashOffset = -t * 30
  x.beginPath()
  for (let i = 0; i < 10; i++) { const ang = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? R * 0.5 : R; x.lineTo(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr * 0.96) }
  x.closePath(); ink(x, col, { w: 7, fa: 0.08, glow: 16 })
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 150px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const back = new Image(); back.src = A + 'card-back.png'
  try { await back.decode() } catch (_) { /* drawn only when loaded */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Perfect date: | a sunset walk on | *Buffalo* *Bayou.*', { top: 120, size: 88, accentSize: 124, at: T.h0, gap: 0.06, late: 2, lateAt: T.h0Late, lateGap: 0.1, wobble: true, accentColor: SUN, lineHeight: 1.0, fit: true })
  const H1 = popText(root, 'Who *with?*', { top: 200, size: 160, accentSize: 180, at: T.h1, late: 1, lateAt: T.h1Late, wobble: true, accentColor: PINK })
  const H2 = popText(root, "Tonight's deck, | dealt from the *stars.*", { top: 180, size: 96, accentSize: 124, at: T.h2, gap: 0.07, late: 1, lateAt: T.h2Late, wobble: true, accentColor: GOLD, fit: true })
  const H3 = popText(root, 'Your walk *partner* | is out there.', { top: 180, size: 96, accentSize: 124, at: T.h3, gap: 0.08, accentColor: PINK, wobble: true, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // camera: the bayou slides down out of frame for the deck (tilt up into the stars) and comes back for the end
  const sceneDY = t => 1150 * ease.inOutCubic(prog(t, ...T.tilt)) * (1 - ease.inOutCubic(prog(t, ...T.back)))
  const nightK = t => ease.inOutQuad(prog(t, ...T.night))
  const ok = t => popOut(t, T.out)

  // the gold trail and the partner star far down the path (bayou space; drawn with the scene offset)
  function drawFar(t, dy) {
    if (t < T.starFall[0]) return
    const lk = ease.inOutCubic(prog(t, ...T.trail))
    const o = ok(t)
    if (lk > 0) {
      x.save(); x.globalAlpha = o; x.setLineDash([2, 22]); x.lineCap = 'round'
      x.beginPath()
      const z0 = LZ * 1.25, z1 = lerp(z0, FAR_Z - 0.15, lk)
      for (let z = z0, i = 0; z <= z1; z *= 1.02, i++) { const px = xOf(pathU(z), z), py = gy(z) + dy; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.strokeStyle = GOLD; x.lineWidth = 14; x.shadowColor = GOLD; x.shadowBlur = 24; x.stroke()
      x.restore()
    }
    const fk = pop01(t, T.partner, 0.45, 2.4) * o
    if (fk > 0.02) {
      const pulse = 1 + 0.08 * Math.sin((t - T.partner) * 6)
      x.save(); x.globalCompositeOperation = 'lighter'
      const gr = x.createRadialGradient(FARP.x, FARP.y + dy, 0, FARP.x, FARP.y + dy, 170 * fk * pulse)
      gr.addColorStop(0, rgba(GOLD, 0.55)); gr.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = gr; x.beginPath(); x.arc(FARP.x, FARP.y + dy, 170 * fk * pulse, 0, TAU); x.fill()
      x.restore()
      drawStarChar(x, FARP.x, FARP.y + dy, FARP.size, t, { color: STAR.sky, glyph: '?', mood: t < T.trail[1] ? 'happy' : 'wink', blush: true, glow: 1.4, hops: [T.partner + 0.3, T.cheer + 0.3, T.cheer + 0.92], seed: 9, pop: fk })
      sparkle(x, FARP.x, FARP.y + dy, t, T.partner, { n: 12, R: 160, seed: 61, size: 24 })
    }
  }

  function drawSlot(t, dy) {
    const k = pop01(t, T.slot, 0.4, 2.0)
    if (k <= 0 || t > T.poof + 0.6) return
    const lean = ease.inOutQuad(prog(t, ...T.lean))
    if (t < T.poof) {
      dashedStar(x, SLOT.x, SLOT.y + dy, SLOT.size * 0.5 * k * (1 + 0.04 * Math.sin(t * 5)), PINK, 0.55 + 0.25 * Math.sin(t * 5), t)
      const qk = pop01(t, T.q, 0.42, 3.0)
      qmark(x, SLOT.x, SLOT.y + dy - 190 + 10 * Math.sin((t - T.q) * 4), 0.9 * qk, PINK, clamp(qk * 3) * (1 - lean), 8 * D2R * Math.sin((t - T.q) * 3))
      sparkle(x, SLOT.x, SLOT.y - 190 + dy, t, T.q, { n: 10, R: 170, seed: 12, size: 24, cols: [PINK, '#fff3e0', VIOLET] })
    }
    sparkle(x, SLOT.x, SLOT.y + dy, t, T.poof, { n: 14, R: 170, seed: 14, size: 26, cols: [PINK, VIOLET, '#fff3e0'] })
  }

  function drawJogger(t) {
    if (t < T.jog[0] || t > T.jog[1]) return
    const p = prog(t, ...T.jog), z = 1 / lerp(1 / 4.5, 1 / 0.95, ease.inQuad(p))
    const px = xOf(pathU(z) - 0.32, z), py = gy(z) - 0.42 * (230 * LZ / z)
    const size = 230 * LZ / z
    // speed lines behind (toward the horizon)
    x.save(); x.globalAlpha = 0.6
    for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? '#ff8f6a' : BONE; x.fillRect(px - size * 0.05 + (i - 1.5) * size * 0.18, py - size * (0.9 + i * 0.12), Math.max(3, size * 0.03), size * 0.5) }
    x.restore()
    drawStarChar(x, px, py, size, t, { color: ARI.color, glyph: ARI.glyph, mood: 'happy', seed: 7, hops: [T.jog[0] + 0.05, T.jog[0] + 0.25, T.jog[0] + 0.45], glow: 1.1 })
    const ck = pop01(t, T.jog[0] + 0.2, 0.25, 2.6) * (1 - prog(t, T.jog[1] - 0.32, T.jog[1] - 0.2))
    tagChip(x, px + size * 0.55, py - size * 0.55, 'ON YOUR LEFT!', ck * clamp(size / 200, 0.8, 1.25), '#ff8f6a', 28)
  }

  function drawPisces(t) {
    const pp = pop01(t, T.pisIn, 0.36, 2.1) * ok(t)
    if (pp <= 0.02) return
    const st = pisState(t)
    const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const opts = { hops: PIS_HOPS, seed: 6, pop: pp, squash: sob }
    drawStarChar(x, PISP.x, PISP.y, PISP.size, t, { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 0.9, ...opts })
    const F = starFrame(PISP.x, PISP.y, PISP.size, t, opts)
    inSprite(x, F, () => tearsCells(x, t, st.tears))
  }
  function drawLibra(t) {
    const lp = pop01(t, T.libIn, 0.38, 2.2) * ok(t)
    if (lp <= 0.02) return
    const st = libState(t)
    let px = LIBP.x, squash = 0
    // spun round by the jogger
    const sp = prog(t, ...T.spin)
    if (sp > 0 && sp < 1) squash += 0.12 * Math.sin(sp * Math.PI * 6) * (1 - sp)
    // lean on the empty star… which pops
    const lean = ease.inOutQuad(prog(t, ...T.lean)), fall = ease.inQuad(prog(t, T.poof, T.poof + 0.25))
    px += 46 * lean - 46 * ease.outCubic(prog(t, T.poof + 0.25, T.poof + 0.6))
    if (t >= T.poof && t < T.poof + 0.6) squash += 0.2 * Math.exp(-(t - T.poof - 0.25) * 6) * Math.max(0, Math.cos((t - T.poof) * 18)) * (t > T.poof + 0.25 ? 1 : 0)
    const opts = { hops: LIB_HOPS, seed: 3, pop: lp, squash }
    drawStarChar(x, px, LIBP.y + 22 * fall * (1 - prog(t, T.poof + 0.3, T.poof + 0.6)), LIBP.size, t, { color: LIB.color, glyph: LIB.glyph, mood: st.mood, look: st.look, blink: st.blink, zzz: st.zzz, glow: 1.1, ...opts })
    const F = starFrame(px, LIBP.y, LIBP.size, t, opts)
    if (t > T.spin[1] && t < T.lean[0]) inSprite(x, F, () => sweatCells(x, t))
    // dizzy stars after the jogger
    if (t >= T.spin[0] && t < T.spin[1] + 0.4) {
      x.save(); x.globalAlpha = clamp((T.spin[1] + 0.4 - t) * 3)
      for (let i = 0; i < 3; i++) { const ang = t * 7 + i * 2.09; drawPixelStar(x, px + Math.cos(ang) * 100, LIBP.y - 130 + Math.sin(ang) * 22, 22, 2, i % 2 ? GOLD : BONE) }
      x.restore()
    }
  }

  // ── the deck: card backs shoot in like falling stars and fan; the centre card lifts and glows, then becomes a star
  function drawCard(cx, cy, w, h, rot, a = 1) {
    if (a <= 0 || !back.complete || !back.naturalWidth) return
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.globalAlpha = a
    x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 30; x.shadowOffsetY = 12
    x.drawImage(back, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawDeck(t) {
    if (t < T.deal[0] - 0.5 || t > T.starFall[1] + 0.1) return
    for (const pass of [0, 1]) DEAL_ORDER.forEach((ci, k) => {
      if (pass === 0 && ci !== 2) return
      const F = FAN[ci], td = T.deal[k], t0 = td - 0.45
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, td))
      const sx0 = F.x + 560, sy0 = -360
      let cx = lerp(sx0, F.x, p), cy = lerp(sy0, F.y, p) + 6 * Math.sin((t - td) * 2.2 + ci)
      let rot = lerp(F.rot + 55, F.rot, p), sc = lerp(0.35, 1, p)
      if (p < 1 && pass === 1) {
        const tx = cx + (sx0 - F.x) * 0.45 * (1 - p * 0.5), ty = cy + (sy0 - F.y) * 0.45 * (1 - p * 0.5)
        const g = x.createLinearGradient(cx, cy, tx, ty)
        g.addColorStop(0, rgba(GOLD, 0.9)); g.addColorStop(1, rgba(GOLD, 0))
        x.save(); x.strokeStyle = g; x.lineWidth = 18 * (1 - p) + 4; x.lineCap = 'round'; x.shadowColor = GOLD; x.shadowBlur = 20
        x.beginPath(); x.moveTo(cx, cy); x.lineTo(tx, ty); x.stroke(); x.restore()
      }
      const land = t > td ? 0.06 * Math.exp(-(t - td) * 8) * Math.cos((t - td) * 26) : 0
      let a = clamp(prog(t, t0, t0 + 0.1))
      if (ci !== 2) {
        const o = ease.inCubic(prog(t, T.cardsOut + k * 0.04, T.cardsOut + k * 0.04 + 0.4))
        if (o >= 1) return
        cx += (ci - 2) * 420 * o; cy += 300 * o; rot += (ci - 2) * 30 * o; a *= 1 - o
        drawCard(cx, cy, CW * sc * (1 + land), CH * sc * (1 - land), rot, a)
      } else {
        const lp = easeOutBack(prog(t, T.glow, T.glow + 0.45), 1.6)
        cy -= 90 * lp; sc *= 1 + 0.22 * lp; rot = lerp(rot, 0, clamp(lp))
        const gk = clamp(prog(t, T.glow, T.glow + 0.35))
        const sh = prog(t, T.cardsOut, T.starFall[0] + 0.25)
        const fp = prog(t, T.starFall[0] + 0.2, T.starFall[1])
        const shE = ease.inCubic(sh)
        if (gk > 0 && pass === 0) {
          const pulse = 1 + 0.08 * Math.sin((t - T.glow) * 6.3)
          x.save(); x.globalCompositeOperation = 'lighter'
          const R = 440 * gk * pulse * (1 - 0.8 * shE)
          const ag = x.createRadialGradient(cx, cy, 30, cx, cy, R)
          ag.addColorStop(0, rgba(GOLD, 0.6 * (1 - fp))); ag.addColorStop(0.45, rgba(PINK, 0.22 * (1 - fp))); ag.addColorStop(1, rgba(PINK, 0))
          x.fillStyle = ag; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill()
          x.restore()
        }
        if (pass === 0) return
        if (sh < 1) {
          const ss = 1 - shE
          drawCard(cx, cy, CW * sc * (1 + land) * ss, CH * sc * (1 - land) * ss, rot + 200 * shE, a * (sh > 0.85 ? 1 - (sh - 0.85) / 0.15 : 1))
          if (gk > 0) {
            x.save(); x.translate(cx, cy); x.rotate((rot + 200 * shE) * D2R); x.globalAlpha = gk * (0.55 + 0.35 * Math.sin((t - T.glow) * 6.3)) * ss
            const rw = CW * sc * ss * 0.87, rh = CH * sc * ss * 0.895
            x.beginPath(); x.roundRect(-rw / 2, -rh / 2, rw, rh, 18 * sc * ss); ink(x, GOLD, { w: 7, fa: 0, glow: 34 })
            x.restore()
          }
        }
        if (sh > 0.6) {
          const dy = sceneDY(t)
          const sx = lerp(cx, FARP.x, ease.inOutCubic(fp)), sy = lerp(cy, FARP.y + dy, ease.inCubic(fp)) - 160 * Math.sin(Math.PI * fp)
          const sz = Math.round((40 + 20 * Math.sin(t * 12)) / 4) * 4
          x.save(); x.globalAlpha = clamp((sh - 0.6) * 4) * (1 - prog(t, T.starFall[1] - 0.05, T.starFall[1] + 0.05))
          x.globalCompositeOperation = 'lighter'
          const gr = x.createRadialGradient(sx, sy, 0, sx, sy, 120)
          gr.addColorStop(0, rgba(GOLD, 0.8)); gr.addColorStop(1, rgba(GOLD, 0))
          x.fillStyle = gr; x.beginPath(); x.arc(sx, sy, 120, 0, TAU); x.fill()
          x.globalCompositeOperation = 'source-over'
          drawPixelStar(x, sx, sy, sz, 0, '#fff3d0')
          x.restore()
        }
        sparkle(x, cx, cy, t, T.glow + 0.15, { n: 14, R: 340, seed: 44, size: 28 })
      }
      sparkle(x, F.x, F.y - 40, t, td, { n: 9, R: 170, seed: 30 + k, size: 24 })
    })
  }

  function hearts(t, t0, n, cx, cy) {
    for (let i = 0; i < n; i++) {
      const born = t0 + i * 0.34, p = (t - born) / 1.2
      if (p < 0 || p >= 1) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * p); drawPixelStar(x, cx + Math.sin(p * 6 + i) * 40 + (i % 2 ? 46 : -46), cy - p * 200, 22, 2, PINK); x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const dy = sceneDY(t), o = ok(t)
        const sa = (dy > 1100 ? 0 : 1) * o
        drawBayouScene(x, t, { a: sa, dy: dy + SHIFT, night: nightK(t), t0: 0, sunS: 0.8, sunDY: 40 })
        if (sa > 0) { drawFar(t, dy); drawSlot(t, dy) }
        drawDeck(t)
        drawPisces(t)
        drawLibra(t)
        drawJogger(t)
        if (t > T.glow && t < T.cardsOut) hearts(t, T.glow + 0.1, 5, LIBP.x, LIBP.y - 150)
        if (t > T.partner) hearts(t, T.partner + 0.1, 5, LIBP.x, LIBP.y - 150)
        if (t >= T.cheer) sparkle(x, 540, 1150, t, T.cheer, { n: 14, R: 380, seed: 4, size: 26, cols: [GOLD, PINK, BONE, BLUE] })
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.35)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.44 (sunset → who with?), 8.62 (the empty star pops → the deck), 12.76 (deck → partner).
// cardfx keeps one for a 20 s film: the 8.62 flip, which also covers the start of the tilt up into the sky.
const CUTS = [4.44, { t: 8.62, kind: 'flip' }, 12.76]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop/pluck/bell are re-keyed by the engine; chip/tom/clap sit on a private sfx bus)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.035, f0: 900, f1: 2600 }]]; for (let k = 0; k < 10; k++) out.push(['clap', +(t0 + 0.1 + k * 0.14 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.05, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // hook: the sunset walk
  ...wordPops(T.h0, 6, 0.06, 0, 0.024), ['pop', T.h0Late, 1174.66, 0.05, 0], ['pop', T.h0Late + 0.1, 1318.51, 0.055, 0], ['pluck', T.h0Late + 0.1, 1174.66, 0.05, 0.6, 0],
  ['whoosh', 0.05, 0.5, 0.03], ['glitter', 0.3, 0.9],
  ['pop', T.libIn + 0.05, 739.99, 0.045, -0.3], ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.5],
  ...WALK.map((w, i) => ['tick', w, 0.025 + (i % 2) * 0.01]),
  ['pop', T.slot, 880, 0.04, 0.3], ['pop', T.q, 1318.51, 0.05, 0.3], ['pluck', T.q + 0.05, 987.77, 0.04, 0.6, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LB]: 880, [SKY]: 587.33 } }),
  // who with?
  ['whoosh', T.h0Out[0], 0.3, 0.035], ...head(T.h1, 1, 0.08, T.h1Late, 2),
  ['pluck', T.look[0] + 0.05, 659.25, 0.035, 0.4, -0.4], ['pluck', T.look[0] + 0.4, 659.25, 0.035, 0.4, 0.4],
  ['whoosh', T.jog[0], 0.6, 0.06], ['whoosh', T.jog[1] - 0.2, 0.3, 0.08], ['pop', T.jog[0] + 0.2, 1174.66, 0.04, 0.4],
  ...[0, 1, 2].map(i => ['pluck', +(T.spin[0] + 0.1 + i * 0.11).toFixed(3), 1567.98 - i * 120, 0.02, 0.3, (i - 1) * 0.3]),
  ['whoosh', T.lean[0], 0.3, 0.025], ['pop', T.poof, 440, 0.05, 0.3], ['glitter', T.poof, T.poof + 0.4], ['tom', T.poof + 0.25, 110, { ...FX, gain: 0.14, decay: 0.12 }],
  ['pluck', T.poof + 0.4, 392, 0.035, 0.7, 0], ['pluck', T.poof + 0.6, 349.23, 0.035, 0.7, 0],
  ...sob(3.0, 1320, 2), ...sob(T.poof + 0.2, 1400), ...sob(T.poof + 0.75, 1320, 2),
  // the deck
  ...head(T.h2, 4, 0.07, T.h2Late, 1), ['whoosh', T.tilt[0] + 0.1, 0.6, 0.04],
  ...T.deal.map((d, i) => ['whoosh', +(d - 0.4).toFixed(3), 0.4, 0.04]), ...T.deal.map((d, i) => ['pop', d, NOTE[(i + 2) % 7], 0.045, (i - 2) * 0.3]),
  ['bell', T.glow, 1318.51, 0.05, 1.8, 0], ['glitter', T.glow, T.glow + 0.7], ['pluck', T.glow + 0.15, 1174.66, 0.035, 0.5, -0.3],
  // the partner
  ['whoosh', T.cardsOut, 0.4, 0.04], ['whoosh', T.starFall[0], 0.7, 0.05],
  ...wordPops(T.h3, 6, 0.08, 2, 0.026),
  ['boom', T.partner, 0.1], ['bell', T.partner, 1174.66, 0.05, 1.4, -0.3], ['bell', T.partner + 0.08, 1760, 0.035, 1.4, -0.2], ['glitter', T.partner, T.partner + 0.6],
  ['riser', T.trail[0] - 0.2, T.trail[1], 0.03], ['pluck', T.trail[1], 1318.51, 0.04, 0.8, 0],
  ...cheers(T.cheer, T.cheer + 1.4), ...sob(T.cheer + 0.3, 1568), ...sob(T.cheer + 1.0, 1660, 2),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
