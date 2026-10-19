// ─────────────────────────────────────────────── EIGHTBILLION half b · THE ANSWER (15.0–26.3)
// Starts on H exactly: the shared sky at zoom 1 with the one moon (1716,122 r52 phase .12), grain 0.5, nothing else.
//
// Beat map (sound):
//   15.00–15.30  H held still
//   15.35–16.60  THE FIELD: small Align card backs bloom out of the stars all over the sky, each from a glint
//   15.95 eyebrow "333 CHARTS NEARBY" (from screen-onboarding-field), out 17.55
//   16.95–17.85  five of them gather from far corners into a fan at centre; the rest fold back into star glints
//   18.35–19.15  pull back: the fan shrinks into the fan of the app's own field screen ("You are not arriving alone."),
//                the phone appears around it · 18.90–19.20 the drawn fan hands over to the screenshot's
//   19.35–20.00  the phone slides left · 19.50 eyebrow "THE FIELD · WHO IS ALREADY HERE"
//   19.65 "Someone's sky / lines up with yours." (typed by ≈20.95, out 22.45)
//   21.20–21.60  the phone turns to Today's sky (screen-sky: You / Love / Move) · 21.75–22.30 gold glint on its cards
//   22.45–22.95  the phone sinks away; a deck of card backs forms at (960,390)
//   23.10 23.40 23.70 24.00  four cards dealt to a soft arc, turning face-up (veiled cards, no faces)
//   24.35–24.80  the centre card (Juniper) turns over · 24.95 gold glint along the hand
//   23.20 eyebrow "NO PHOTOS UNTIL YOU BOTH ALIGN" · 23.35 "Tonight's deck is already dealt." (typed ≈24.6, out 25.8)
//   25.80–26.25  the hand drifts apart and fades; sky back to dim 1 by 26.3 (end.js owns 26.2→)
import { clamp, lerp, prog, ease, tw, rng, el, C, TypeLine } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { sky, twinkles, drawGrain, grainOpacity, getSky, layerCanvas, loadArt, loadScreens, drawCard, drawPhone, glint, pocketCanvas, pixStar } from './kit.js'

const T0 = 15.0, T1 = 26.3

// ── beat 1: the field
const BLOOM = { a: 15.35, span: 1.25, len: 0.45 }
const SEA_EB = { a: 15.95, out: 17.55 }
const GATHER = { a: 16.95, step: 0.07, fly: 0.78 }
const FOLD = { a: 16.95, span: 0.6, len: 0.4 }
// fan in the app screen (screen px, relative to its centre card, phone h 900): measured off screen-onboarding-field
const FAN = [[-140, 36, -14], [-76, 17, -8], [0, 0, 0], [77, 17, 8], [141, 36, 14]]   // [dx, dy, rz]
const FAN_H = 181
const ANCHOR = { x: 960, y: 466 }        // fan centre card ⇔ phone (960,540) h 900
const ZOOM = { a: 18.35, b: 19.15, from: 2 }
const HANDOVER = { a: 18.9, b: 19.2 }
// ── beat 2: someone's sky
const PH = { h: 900, slideA: 19.35, slideB: 20.0, x1: 600 }
const COPY2 = { eb: 19.5, line: 19.65, out: 22.45 }
const SWAP = { a: 21.2, b: 21.6 }
const SKYGLINT = { a: 21.75, b: 22.3 }
const PH_OUT = { a: 22.45, b: 22.95 }
// ── beat 3: tonight's deck
const DECK = { x: 960, y: 390, h: 330 }
const FORM = { a: 22.6, b: 23.05 }
const SLOT = k => ({ x: 960 + k * 300, y: 390 + k * k * 8, rz: k * 2.2 })
const HAND = [[-1, 'p1'], [1, 'p2'], [-2, 'p6'], [2, 'p4'], [0, 'p3']]
const DEAL = [23.1, 23.4, 23.7, 24.0], FLY = 0.6
const CFLIP = { a: 24.35, b: 24.8 }
const SHINE = { a: 24.95, step: 0.12, len: 0.42 }
const COPY3 = { eb: 23.2, line: 23.35, out: 25.8 }
const EXIT = { a: 25.8, b: 26.25 }

// ── the sea of card backs (deterministic)
const sr = rng(8080)
const SEA = []
for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) {
  let x = 140 + c * (1640 / 8) + (sr() - 0.5) * 130, y = 115 + r * (850 / 5) + (sr() - 0.5) * 90
  if (x > 1520 && y < 290) { x -= 240; y += 70 }                   // clear of the moon
  if (y > 880 && x > 560 && x < 1360) y -= 120                    // clear of the eyebrow
  const d = sr()
  SEA.push({ x, y, h: 34 + d * d * 60, depth: d, rz: (sr() - 0.5) * 50, tb: BLOOM.a + sr() * BLOOM.span, ph: sr() * 6.28, sp: 0.5 + sr() * 0.6, fan: -1 })
}
// five gather into the fan, from far apart (they bloom early so the eye has them)
const FROM = [[300, 820], [420, 250], [960, 160], [1480, 330], [1640, 800]]
FROM.forEach(([fx, fy], k) => {
  let best = null, bd = 1e9
  for (const s of SEA) { if (s.fan >= 0) continue; const d = Math.hypot(s.x - fx, s.y - fy); if (d < bd) { bd = d; best = s } }
  best.fan = k; best.tb = BLOOM.a + 0.05 + k * 0.09; best.h = 84; best.depth = 1
})
// the rest fold back into glints, nearest the centre first
SEA.filter(s => s.fan < 0).sort((a, b) => Math.hypot(a.x - 960, a.y - 520) - Math.hypot(b.x - 960, b.y - 520)).forEach((s, i, arr) => { s.tf = FOLD.a + (i / arr.length) * FOLD.span })
// fan draw order: outer → inner → centre
const FAN_ORDER = [0, 4, 1, 3, 2]
const gatherT = k => GATHER.a + FAN_ORDER.indexOf(k) * GATHER.step
// ambient pixel glints: the rest of the 333
const GL = Array.from({ length: 90 }, () => ({ x: 40 + sr() * (W - 80), y: 40 + sr() * (H - 80), t0: BLOOM.a + 0.2 + sr() * 1.4, ph: sr() * 6.28, sp: 2 + sr() * 3, col: ['#efe6d6', '#c9a6ff', '#ffd98a', '#ff8fb1'][Math.floor(sr() * 4)], kind: Math.floor(sr() * 3) + 1 }))
  .filter(g => !(g.x > 1560 && g.y < 280))

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  getSky()
  await Promise.all([loadArt(), loadScreens()])
  await document.fonts.load(`26px 'Space Mono'`).catch(() => {})
  const spriteS = getSky().spriteS

  const pocket0 = pocketCanvas(960, 968, 560, 90, 0.7)
  const pocket2 = pocketCanvas(1380, 520, 640, 330, 0.55)
  const pocket3 = pocketCanvas(960, 830, 840, 190, 0.6)

  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ── copy (above the grain)
  const eyebrow = (txt, style) => el('div', { position: 'absolute', fontFamily: MONO, fontSize: '34px', letterSpacing: '0.32em', color: C.bone, opacity: 0, whiteSpace: 'pre', textShadow: '0 0 14px rgba(11,6,32,0.9)', ...style }, root, txt)
  const stmt = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '100px', lineHeight: '1.1', letterSpacing: '-0.005em', color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)' }
  const eb0 = eyebrow('333 CHARTS NEARBY', { left: 0, width: W + 'px', textAlign: 'center', textIndent: '0.32em', top: '946px' })
  const eb2 = eyebrow('THE FIELD · WHO IS ALREADY HERE', { left: '1000px', top: '372px', fontSize: '28px' })
  const line2 = new TypeLine(root, "Someone's sky\nlines up with yours.", { ...stmt, left: '994px', top: '428px' }, { perChar: 0.03, fade: 0.3, accent: [C.violet, C.gold, C.rub] })
  const eb3 = eyebrow('NO PHOTOS UNTIL YOU BOTH ALIGN', { left: 0, width: W + 'px', textAlign: 'center', textIndent: '0.32em', top: '700px', fontSize: '30px' })
  const line3 = new TypeLine(root, "Tonight's deck is already dealt.", { ...stmt, fontSize: '96px', left: '50%', top: '760px', transform: 'translateX(-50%)' }, { perChar: 0.03, fade: 0.3, accent: [C.violet, C.gold, C.rub] })

  return {
    start: T0, end: T1, root,
    update(t) {
      const fr = Math.round(t * 30)
      const dim = 1 - 0.2 * ease.inOutQuad(prog(t, 18.2, 19.0)) + 0.2 * ease.inOutQuad(prog(t, 25.7, 26.3))
      sky(bx, t, Math.min(1, dim))
      twinkles(bx, t)
      gC.style.opacity = String(grainOpacity(Math.min(1, dim)))

      const pk = (a, b, c, d) => ease.inOutQuad(prog(t, a, b)) * (1 - ease.inOutQuad(prog(t, c, d)))
      bx.globalAlpha = pk(15.8, 16.2, SEA_EB.out, SEA_EB.out + 0.3); if (bx.globalAlpha > 0) bx.drawImage(pocket0, 0, 0)
      bx.globalAlpha = pk(19.3, 19.8, COPY2.out, COPY2.out + 0.35); if (bx.globalAlpha > 0) bx.drawImage(pocket2, 0, 0)
      bx.globalAlpha = pk(23.0, 23.5, COPY3.out, COPY3.out + 0.35); if (bx.globalAlpha > 0) bx.drawImage(pocket3, 0, 0)
      bx.globalAlpha = 1

      // ════════ beat 1: the field
      if (t < HANDOVER.b) {
        // ambient pixel glints (the rest of the field)
        bx.imageSmoothingEnabled = false
        const glOut = 1 - ease.inOutQuad(prog(t, 17.2, 18.1))
        for (const [i, g] of GL.entries()) {
          const a = ease.outQuad(prog(t, g.t0, g.t0 + 0.3)) * (0.35 + 0.45 * Math.sin(t * g.sp + g.ph)) * glOut
          if (a > 0.02) pixStar(bx, g.x, g.y, 3, (fr + i) % 7 === 0 ? 2 : g.kind, g.col, '#fff3e0', a)
        }
        bx.imageSmoothingEnabled = true
        const Z = lerp(ZOOM.from, 1, ease.inOutCubic(prog(t, ZOOM.a, ZOOM.b)))
        const fanA = 1 - ease.inOutQuad(prog(t, HANDOVER.a, HANDOVER.b))
        const fanPose = k => { const [dx, dy, rz] = FAN[k]; return { x: ANCHOR.x + dx * Z, y: ANCHOR.y + dy * Z, h: FAN_H * Z, rz } }
        const fanCards = []
        for (const s of SEA) {
          if (t < s.tb - 0.06) continue
          const fl = Math.sin(t * s.sp + s.ph)
          const bx0 = s.x + fl * 5, by0 = s.y + Math.cos(t * s.sp * 0.8 + s.ph) * 4
          // the glint it comes out of
          const gk = Math.exp(-Math.pow((t - (s.tb + 0.05)) / 0.12, 2))
          if (gk > 0.02) {
            const sz = (s.fan >= 0 ? 90 : 60) * gk
            bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = gk
            bx.drawImage(spriteS, bx0 - sz / 2, by0 - sz / 2, sz, sz)
            bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
          }
          const p = prog(t, s.tb, s.tb + BLOOM.len)
          if (p <= 0) continue
          const ry = 90 * (1 - ease.outCubic(p))
          if (s.fan < 0) {
            const q = prog(t, s.tf, s.tf + FOLD.len), e = ease.inCubic(q)
            if (q >= 1) {
              continue
            }
            const x = lerp(bx0, 960, 0.18 * e), y = lerp(by0, 520, 0.18 * e)
            const h = s.h * (1 - e) * lerp(0.9, 1, ease.outBack(p))
            drawCard(bx, 'back', x, y, h, { ry: ry + 80 * e, rz: s.rz + fl * 2, alpha: Math.min(1, p * 2) * (1 - e * 0.6) * (0.55 + 0.45 * s.depth), shadow: 0.5 })
            // it leaves a star behind
            const sk = Math.exp(-Math.pow((q - 0.9) / 0.15, 2))
            if (q > 0.5) { bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = sk; const sz = 34; bx.drawImage(spriteS, x - sz / 2, y - sz / 2, sz, sz); bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1 }
          } else {
            const g0 = gatherT(s.fan), q = prog(t, g0, g0 + GATHER.fly), e = ease.inOutCubic(q)
            const P = fanPose(s.fan)
            const mx = (bx0 + P.x) / 2 + (P.y - by0) * 0.18, my = (by0 + P.y) / 2 - (P.x - bx0) * 0.08
            const bz = (a, b, c, u) => (1 - u) * (1 - u) * a + 2 * (1 - u) * u * b + u * u * c
            const x = bz(bx0, mx, P.x, e), y = bz(by0, my, P.y, e)
            const h = lerp(s.h, P.h, ease.inOutCubic(q))
            const rz = lerp(s.rz + fl * 2, P.rz, e)
            const land = Math.sin(Math.PI * prog(t, g0 + GATHER.fly, g0 + GATHER.fly + 0.3))
            fanCards.push({ k: s.fan, x, y: y + land * 5, h, ry, rz, alpha: Math.min(1, p * 2) * fanA, fly: q > 0 && q < 1, glow: 0.5 * Math.exp(-Math.pow((t - (g0 + GATHER.fly)) / 0.12, 2)) })
          }
        }
        fanCards.sort((a, b) => FAN_ORDER.indexOf(a.k) - FAN_ORDER.indexOf(b.k))
        // the phone (around the fan) — drawn under the fan until the handover
        const phA = ease.inOutQuad(prog(Z, 1.8, 1.2) )
        if (phA > 0.003) drawPhone(bx, ANCHOR.x, ANCHOR.y + 74 * Z, PH.h * Z, [['field', 1]], { alpha: phA })
        for (const c of fanCards) drawCard(bx, 'back', c.x, c.y, c.h, { ry: c.ry, rz: c.rz, alpha: c.alpha, shadow: c.fly ? 0.4 : 0.8 * (1 - phA * 0.7), glow: c.glow })
      }

      // ════════ beat 2: the phone (field → today's sky)
      if (t >= HANDOVER.b - 0.0001 && t < PH_OUT.b) {
        const sl = ease.inOutCubic(prog(t, PH.slideA, PH.slideB))
        const out = ease.inOutCubic(prog(t, PH_OUT.a, PH_OUT.b))
        const x = lerp(960, PH.x1, sl), y = 540 + 70 * out, h = PH.h * (1 - 0.05 * out)
        const sw = ease.inOutQuad(prog(t, SWAP.a, SWAP.b))
        drawPhone(bx, x, y, h, [['field', 1], ['sky', sw]], { alpha: 1 - out })
        // gold glint across the three sky cards (screen px: x 74–1096, y 624–1156 of 1170×2532)
        const gk = prog(t, SKYGLINT.a, SKYGLINT.b)
        if (gk > 0 && gk < 1) {
          const s = h / 2532, ox = x - 585 * s, oy = y - 1266 * s
          const l = ox + 74 * s, tp = oy + 624 * s, w = 1022 * s, hh = 532 * s
          bx.save(); bx.beginPath(); bx.rect(l, tp, w, hh); bx.clip()
          const sx = l - w * 0.3 + gk * w * 1.6
          const g = bx.createLinearGradient(sx - 60, tp, sx + 60, tp + hh)
          g.addColorStop(0, 'rgba(255,226,160,0)'); g.addColorStop(0.5, 'rgba(255,226,160,0.55)'); g.addColorStop(1, 'rgba(255,226,160,0)')
          bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(l, tp, w, hh)
          bx.restore()
        }
      }

      // ════════ beat 3: tonight's deck, already dealt
      if (t >= FORM.a) {
        const ex = ease.inOutCubic(prog(t, EXIT.a, EXIT.b))
        const fa = ease.outCubic(prog(t, FORM.a, FORM.b))
        const top = { x: DECK.x, y: DECK.y + 30 * (1 - fa), h: DECK.h * lerp(0.86, 1, fa) }
        // a glint the deck comes out of
        const dg = Math.exp(-Math.pow((t - (FORM.a + 0.08)) / 0.14, 2))
        if (dg > 0.02) { bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = dg; const sz = 220 * dg; bx.drawImage(spriteS, DECK.x - sz / 2, DECK.y - sz / 2, sz, sz); bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1 }
        const dealtBy = i => ease.inOutCubic(prog(t, DEAL[i], DEAL[i] + 0.3))
        for (let j = HAND.length - 1; j >= 0; j--) {
          if (j < 4 && t >= DEAL[j]) continue
          if (j === 4 && t >= CFLIP.a) continue
          let depth = j
          for (let i = 0; i < Math.min(j, 4); i++) depth -= dealtBy(i)
          const grow = j === 0 ? fa : ease.outCubic(prog(t, FORM.a + 0.15 + j * 0.06, FORM.a + 0.5 + j * 0.06))
          if (grow <= 0) continue
          const off = depth * 6 * grow
          drawCard(bx, 'back', top.x - depth * 1.2 * grow, top.y + off, top.h, { rz: (j % 2 ? -1 : 1) * depth * 0.7 * grow, alpha: grow, shadow: 0.6 * grow })
        }
        const cards = []
        for (let i = 0; i < 4; i++) {
          if (t < DEAL[i]) continue
          const [k, art] = HAND[i], S = SLOT(k)
          const p = prog(t, DEAL[i], DEAL[i] + FLY), e = ease.inOutCubic(p)
          let x = lerp(DECK.x, S.x, e), y = lerp(DECK.y, S.y, e) - Math.sin(Math.PI * p) * 70
          let h = DECK.h * (1 + 0.07 * Math.sin(Math.PI * p))
          const ry = 180 * (1 - ease.inOutCubic(prog(p, 0.2, 1)))
          const rz = lerp(0, S.rz, e) + Math.sin(Math.PI * p) * Math.sign(k) * 5
          const land = prog(t, DEAL[i] + FLY, DEAL[i] + FLY + 0.3)
          y += Math.sin(Math.PI * land) * 4 + Math.sin((t - DEAL[i]) * 1.1 + i * 1.7) * 3 * land
          x += Math.sign(k) * 140 * ex; y -= 30 * ex
          const g = Math.exp(-Math.pow((t - (SHINE.a + (k + 2) * SHINE.step + SHINE.len / 2)) / (SHINE.len / 3), 2))
          cards.push({ art, x, y, h, ry, rz, alpha: 1 - ease.outQuad(ex), flying: p < 1, g })
        }
        cards.sort((a, b) => a.flying - b.flying)
        for (const c of cards) drawCard(bx, c.art, c.x, c.y, c.h, { ry: c.ry, rz: c.rz, alpha: c.alpha, back: 'back', shadow: c.flying ? 0.4 : 1, glow: c.g * 0.55 })
        if (t >= CFLIP.a) {
          const fp = prog(t, CFLIP.a, CFLIP.b)
          const x = DECK.x, y = DECK.y - Math.sin(Math.PI * fp) * 26 + Math.sin((t - CFLIP.b) * 1.0) * 3 * prog(t, CFLIP.b, CFLIP.b + 0.4) - 40 * ex
          const h = DECK.h * (1 + 0.05 * Math.sin(Math.PI * fp))
          const gc = Math.exp(-Math.pow((t - (SHINE.a + 2 * SHINE.step + SHINE.len / 2)) / (SHINE.len / 3), 2))
          drawCard(bx, 'p3', x, y, h, { ry: 180 * (1 - ease.inOutCubic(fp)), back: 'back', alpha: 1 - ease.outQuad(ex), glow: gc * 0.55 })
          glint(bx, 'p3', x, y, h, 0, prog(t, SHINE.a + 2 * SHINE.step, SHINE.a + 2 * SHINE.step + SHINE.len), { alpha: 0.45 * (1 - ex), width: 0.08 })
        }
      }

      // ── copy
      const fadeEb = (e, a, out) => { e.style.opacity = String(ease.outQuad(prog(t, a, a + 0.35)) * (1 - ease.inQuad(prog(t, out, out + 0.2)))); e.style.letterSpacing = lerp(0.42, 0.32, ease.outCubic(prog(t, a, a + 0.5))) + 'em' }
      fadeEb(eb0, SEA_EB.a, SEA_EB.out)
      fadeEb(eb2, COPY2.eb, COPY2.out); line2.update(t - COPY2.line, { out: COPY2.out - COPY2.line })
      fadeEb(eb3, COPY3.eb, COPY3.out); line3.update(t - COPY3.line, { out: COPY3.out - COPY3.line })

      drawGrain(gx, t)
    },
  }
}

// ── sound
export const cues = [
  ['glitter', BLOOM.a, BLOOM.a + BLOOM.span + 0.3],
  ...SEA.filter((s, i) => s.fan >= 0 || i % 5 === 0).map((s, i) => ['bell', s.tb + 0.04, [1318.51, 1479.98, 1661.22, 1760, 1975.53][i % 5], s.fan >= 0 ? 0.02 : 0.009, 1.2, (s.x - 960) / 1200]),
  ['bell', SEA_EB.a, 739.99, 0.03, 1.8, 0],                               // "333 CHARTS NEARBY"
  ['whoosh', GATHER.a, 0.9, 0.06],                                        // they gather
  ...[0, 1, 2, 3, 4].map(k => ['tick', gatherT(k) + GATHER.fly, 0.025]),
  ['bell', gatherT(2) + GATHER.fly + 0.02, 1174.66, 0.025, 1.6, 0],
  ['whoosh', ZOOM.a, 0.8, 0.05],                                          // pull back into the app
  ['tick', ZOOM.b - 0.03, 0.03],
  ['bell', COPY2.line, 587.33, 0.042, 2.2, 0],                            // "Someone's sky lines up with yours."
  ['whoosh', SWAP.a, 0.4, 0.03],
  ['glitter', SKYGLINT.a, SKYGLINT.b],
  ['bell', SKYGLINT.a + 0.15, 1318.51, 0.02, 1.6, -0.3],
  ['whoosh', PH_OUT.a, 0.6, 0.04],
  ['whoosh', FORM.a + 0.02, 0.6, 0.05],                                   // the deck forms
  ...[0, 1, 2, 3].map(j => ['tick', FORM.a + 0.3 + j * 0.06, 0.016]),
  ...DEAL.flatMap((d, i) => [['whoosh', d, 0.5, 0.045], ['tick', d + FLY - 0.02, 0.03], ['bell', d + FLY - 0.01, [880, 987.77, 1108.73, 1318.51][i], 0.018, 1.2, [-0.4, 0.4, -0.6, 0.6][i]]]),
  ['bell', COPY3.line, 493.88, 0.04, 2.2, 0],                             // "Tonight's deck is already dealt."
  ['whoosh', CFLIP.a, 0.45, 0.04], ['tick', CFLIP.b - 0.04, 0.03],
  ['bell', CFLIP.b - 0.03, 1479.98, 0.026, 1.8, 0],
  ['glitter', SHINE.a, SHINE.a + 4 * SHINE.step + SHINE.len],
  ['whoosh', EXIT.a, 0.6, 0.04],
]
