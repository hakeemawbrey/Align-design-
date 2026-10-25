// cardfx — the Align CARD MOTIF for every film: card-built transitions (cardCuts) + a quiet tarot-card border (cardFrame).
//
// ═══════════════════════════════ INTEGRATION RECIPE (copy-paste) ═══════════════════════════════
// 1. Import (from promo/films/<name>/scenes/index.js):
//      import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
//
// 2. List the cut times (seconds) where one beat's content has CLEARED and the next beat's starts:
//      const CUTS = [2.84, { t: 5.58, kind: 'deal' }, 8.6]          // numbers or { t, kind }
//
// 3. Append the builders at the END of SCENES (later = on top). Keep the shared end card where it was:
//      export const SCENES = [build, (stage) => buildEndcard(stage, { start: END }),
//        cardFrame({ start: 0, end: END }),                          // END = the end card's start (or DURATION if none)
//        cardCuts(CUTS)]
//    Films WITHOUT the shared end card that fade to black themselves: cardFrame({ start: 0, end: DURATION, fadeOut: 0.7 })
//    so the border fades with the film (it sits on top of your own black fade).
//
// 4. Merge the sound into CUES:
//      export const CUES = [ ...yourCues, ...cardCutCues(CUTS), ...endcardCues(END) ]
//
// 5. Check:  node promo/scripts/render.mjs --film=<name> --vertical --stills=<cut-0.15>,<cut>,<cut+0.15> --dir=/tmp/…
//            node promo/scripts/teaser-sound.mjs --film=<name>
//
// PICKING CUT TIMES
//   • A cut covers the screen completely from t-0.03 to t+0.03 and is in motion over about t-0.34 … t+0.34.
//     So put t where the OLD beat is already leaving (its out-anim has started/finished) and the NEW beat's first
//     element is about to pop in. The best spot is usually the gap between "xxxOut" and the next beat's first pop.
//   • Anything popping in during t … t+0.25 is half-hidden by the reveal: if the new headline pops right at the
//     beat start, put the cut ~0.05–0.1 s BEFORE that beat start.
//   • Cuts closer than ~0.75 s apart overlap; 3–5 cuts in a 15 s film is plenty. Don't put a cut on the end card hand-off
//     (the shared end card already does its own card flip at its start).
//   • A cut needs no change to the film's own scene code: whatever changes underneath at t is hidden.
//
// KINDS (pass { t, kind }; default cycles flip → deal → fan → shuffle, or cardCuts(CUTS, { kinds: ['deal','flip'] }))
//   'flip'    a giant card back (real card-back.png, slim glowing rim) swings in edge-on around the vertical axis (true
//             CSS 3D perspective), covers, then keeps turning away: "turning the card over" onto the next beat.
//             { dir: -1 } spins the other way.
//   'deal'    five card backs slap down from below in quick succession, overlapping until the screen is covered, then the
//             pile is swept off the top. { from: 'left' | 'right' | 'bottom' } (swept off the opposite side).
//   'shuffle' two half-decks fly in from the left and right edges, riffling together card by card in the middle, then
//             split apart back out to the sides.
//   'fan'     a hand of ten cards grows out of the centre and fans open all the way round into a wheel of card backs
//             until it covers the screen, then folds shut, spinning on, and shrinks away. { dir: -1 } spins the other way.
//   All kinds: pixel-star sparkles, a short centre glow at the cover, a faint motion ghost on the fastest cards.
//
// cardCutCues(cuts, opts) returns the matching sound: card-flick ticks + a soft whoosh (+ a quiet pop on the reveal),
// as ['tick', t, gain] / ['whoosh', t, len, gain] / ['pop', t, hz, gain, pan] (see promo/scripts/synth.mjs).
//
// cardFrame({ start, end, label = 'ALIGN · TONIGHT', numeral = null, fadeIn = 0.4, fadeOut = 0.4, opacity = 1,
//             corners = 'tl tr bl br' })
//   A subtle, persistent tarot-card border: an inset rounded double hairline (soft gold/bone ~30%), a pixel star in each
//   corner, little diamonds on the side midlines, a tiny numeral cartouche at the top (numeral: 'XVII' etc.; a star if
//   none) and the label at the very bottom edge. Everything lives in the outer 70 px, so it never touches captions
//   (headlines y≈160–560, punchlines y≈1480–1780). corners: drop a corner (e.g. 'tr bl br') if a film keeps a HUD
//   element in that corner.
//
// Everything is a pure function of t; nothing touches `document` at module top level (the sound build imports this
// file in node through the films' scenes/index.js).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el, rng } from '../src/lib.js'
import { W, H, A, fill } from '../src/scenes/common.js'
import { drawPixelStar, layerCanvas } from './sky.js'
import { easeOutBack } from './wheel.js'

export const CUT_KINDS = ['flip', 'deal', 'fan', 'shuffle']
const D2R = Math.PI / 180
const GOLD = '#f2c75c', BONE = '#efe6d6', LAV = '#d9cdf0', PINK = '#ff8fb1', VIOLET = '#9a7be0'
const SPARK = [GOLD, BONE, LAV, PINK, '#ffd98a', '#c9a6ff']
const MONO = "'Space Mono', ui-monospace, monospace"

// card-back.png geometry: the opaque card body inside the PNG's soft outer glow
const BODY = { x: 119, y: 119, w: 1320, h: 2107, r: 86 }
const ASPECT = BODY.w / BODY.h          // ≈0.6265
const PAD = 80                          // baked shadow/glow margin around the body in the sprite

/** normalise the cut list (shared by cardCuts and cardCutCues so kinds always match) */
function normCuts(cuts, { kinds = CUT_KINDS } = {}) {
  return cuts.map((c, i) => (typeof c === 'number' ? { t: c } : { ...c }))
    .map((c, i) => ({ ...c, kind: c.kind || kinds[i % kinds.length], i }))
    .sort((a, b) => a.t - b.t)
}

// ─────────────────────────────────────────── the card sprite (baked once per page)
let spritePromise = null
function loadSprite() {
  if (spritePromise) return spritePromise
  spritePromise = new Promise(res => {
    const im = new Image()
    im.onload = () => {
      const c = document.createElement('canvas')
      c.width = BODY.w + PAD * 2; c.height = BODY.h + PAD * 2
      const x = c.getContext('2d')
      const rr = (inset = 0) => { x.beginPath(); x.roundRect(PAD + inset, PAD + inset, BODY.w - inset * 2, BODY.h - inset * 2, BODY.r - inset) }
      // soft drop shadow under the card (lifts it off whatever is underneath)
      x.save(); x.shadowColor = 'rgba(3,1,12,0.72)'; x.shadowBlur = 56; x.shadowOffsetY = 22
      rr(); x.fillStyle = '#21114a'; x.fill(); x.restore()
      // the artwork, clipped to the body
      x.save(); rr(); x.clip(); x.drawImage(im, BODY.x, BODY.y, BODY.w, BODY.h, PAD, PAD, BODY.w, BODY.h); x.restore()
      // slim glowing rim
      x.save(); x.globalCompositeOperation = 'lighter'
      x.shadowColor = 'rgba(176,140,255,0.9)'; x.shadowBlur = 26
      rr(2.5); x.strokeStyle = 'rgba(217,205,240,0.55)'; x.lineWidth = 5; x.stroke()
      x.restore()
      res(c)
    }
    im.onerror = () => res(null)
    im.src = A + 'card-back.png'
  })
  return spritePromise
}

/** draw the sprite so its BODY is `w` px wide, centred on (cx, cy), rotated rot (radians) */
function drawCard(ctx, sp, cx, cy, w, rot = 0, alpha = 1) {
  if (!sp || alpha <= 0.003 || w <= 1) return
  const s = w / BODY.w
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(cx, cy); ctx.rotate(rot)
  ctx.drawImage(sp, -sp.width * s / 2, -sp.height * s / 2, sp.width * s, sp.height * s)
  ctx.restore()
}

function sparkBurst(ctx, x, y, t, t0, { n = 10, rad = 260, seed = 1, size = 28, dur = 0.6, cols = SPARK } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed), p = ease.outCubic(tt / dur)
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.6, d = rad * (0.55 + 0.6 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    ctx.globalAlpha = (tt < 0.06 ? tt / 0.06 : 1) * (1 - ease.inQuad(p))
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.3 * p), kind, col)
  }
  ctx.restore()
}

function glowFlash(ctx, t, tc, { a = 0.2, r = 900, w = 0.09, col = '186,150,255' } = {}) {
  const k = a * Math.exp(-Math.pow((t - tc) / w, 2))
  if (k < 0.004) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, r)
  g.addColorStop(0, `rgba(255,240,215,${k})`); g.addColorStop(0.35, `rgba(${col},${k * 0.6})`); g.addColorStop(1, `rgba(${col},0)`)
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  ctx.restore()
}

// ─────────────────────────────────────────── kinds as pure placements: (t, cut) → [{ cx, cy, w, rot, a }]
// Every kind has at least one card fully covering 1080×1920 over [t-0.03, t+0.03] (verified by pixel coverage).
const COVER_W = 1300   // a 1300×2075 card centred within ±50 px and tilted ≤4° covers the whole frame

const DEAL_SLOTS = [   // [cx, cy, rot°, w]
  [330, 560, -13, 1020], [770, 1380, 11, 1020], [800, 520, 8, 1020], [300, 1400, -9, 1020], [540, 960, -2.5, COVER_W],
]
function dealCards(t, c) {
  const from = c.from || 'bottom'
  const v = from === 'left' ? [-1, 0] : from === 'right' ? [1, 0] : [0, 1]    // direction the cards come FROM
  const out = []
  DEAL_SLOTS.forEach(([sx, sy, sr, w], i) => {
    const t0 = c.t - 0.34 + i * 0.04, t1 = t0 + 0.15
    if (t < t0) return
    const p = prog(t, t0, t1), e = easeOutBack(p, 1.15)
    // exit: top card first, swept off the opposite side
    const x0 = c.t + 0.03 + (DEAL_SLOTS.length - 1 - i) * 0.03, q = ease.inCubic(prog(t, x0, x0 + 0.2))
    if (q >= 1) return
    const startX = sx + v[0] * 1500 + (i % 2 ? 160 : -160) * Math.abs(v[1]), startY = sy + v[1] * 2100 + (i % 2 ? 120 : -120) * Math.abs(v[0])
    const endX = sx - v[0] * 1700, endY = sy - v[1] * 2300
    let cx = lerp(startX, sx, e), cy = lerp(startY, sy, e)
    cx = lerp(cx, endX, q); cy = lerp(cy, endY, q)
    const spin = (i % 2 ? 1 : -1) * 24
    const rot = (sr + spin * (1 - ease.outCubic(p)) - spin * 0.6 * q) * D2R
    out.push({ cx, cy, w, rot, a: 1 })
  })
  return out
}

const SHUF = Array.from({ length: 8 }, (_, k) => {
  const r = rng(77 + k * 13), side = k % 2 ? 1 : -1
  return { side, jx: side * (8 + r() * 18), jy: (r() - 0.5) * 22, rot: side * (1 + r() * 2.5) }
})
function shuffleCards(t, c) {
  const out = []
  SHUF.forEach((s, k) => {
    const t0 = c.t - 0.32 + k * 0.03, t1 = t0 + 0.17
    if (t < t0) return
    const p = prog(t, t0, t1), e = ease.outCubic(p)
    const x0 = c.t + 0.04 + (SHUF.length - 1 - k) * 0.02, q = ease.inCubic(prog(t, x0, x0 + 0.17))
    if (q >= 1) return
    const sx = 540 + s.jx, sy = 960 + s.jy
    let cx = lerp(540 + s.side * 1450, sx, e), cy = sy - 140 * Math.sin(Math.PI * p) * (1 - p * 0.5)
    const flutter = p >= 1 ? 2.2 * Math.exp(-(t - t1) * 14) * Math.sin((t - t1) * 40) : 0
    let rot = s.rot + s.side * 22 * (1 - e) + flutter
    cx = lerp(cx, 540 + s.side * 1600, q); cy += -80 * Math.sin(Math.PI * q)
    rot += s.side * 16 * q
    out.push({ cx, cy, w: COVER_W, rot: rot * D2R, a: 1 })
  })
  return out
}

// fan: ten cards whose bottoms meet at the frame centre, fanning round like a hand opened all the way into a wheel
// (36° apart, 900 wide: every point of the frame lies within 340 px of some card's axis → full cover when open)
const FAN = { n: 10, step: 36, w: 900, below: 120 }
function fanCards(t, c) {
  const dir = c.dir || 1
  const a0 = c.t - 0.32, a1 = c.t - 0.03, b0 = c.t + 0.03, b1 = c.t + 0.32
  if (t < a0 || t > b1) return []
  const pin = prog(t, a0, a1), pout = prog(t, b0, b1)
  const scale = lerp(0.3, 1, easeOutBack(prog(t, a0, a1 - 0.05), 1.3)) * lerp(1, 0.25, ease.inCubic(pout))
  const spread = ease.outCubic(prog(t, a0 + 0.04, a1)) * (1 - ease.inOutCubic(prog(t, b0, b1 - 0.04)))
  const spin = dir * (-80 * (1 - ease.outCubic(pin)) + 110 * ease.inCubic(pout))
  const h = FAN.w / ASPECT, dist = (h / 2 - FAN.below) * scale      // card centre, out along its axis from the hub
  const out = []
  for (let k = 0; k < FAN.n; k++) {
    const ang = (k * FAN.step * spread + spin) * D2R
    out.push({ cx: 540 + Math.sin(ang) * dist, cy: 960 - Math.cos(ang) * dist, w: FAN.w * scale, rot: ang, a: clamp((t - a0) / 0.05) * (pout > 0.75 ? 1 - (pout - 0.75) / 0.25 : 1) })
  }
  return out
}
const PLACE = { deal: dealCards, shuffle: shuffleCards, fan: fanCards }
const SPAN = { flip: [0.31, 0.31], deal: [0.35, 0.36], shuffle: [0.33, 0.36], fan: [0.33, 0.33] }

// ═══════════════════════════════════════════ cardCuts
export function cardCuts(cuts, opts = {}) {
  const C = normCuts(cuts, opts)
  return async function buildCardCuts(stage) {
    const sp = await loadSprite()
    const t0 = Math.min(...C.map(c => c.t)) - 0.5, t1 = Math.max(...C.map(c => c.t)) + 0.5
    const root = fill(stage, { pointerEvents: 'none' })
    root.dataset.cardfx = 'cuts'

    // flip: the giant card as a real 3D plane (CSS perspective), shade + sheen overlays inside it
    const GH = 2010, GW = GH * ASPECT, s = GH / BODY.h      // body 1259×2010: overshoots the frame on every side
    const SW = (BODY.w + PAD * 2) * s, SH = (BODY.h + PAD * 2) * s
    const flip = el('div', { position: 'absolute', left: (W / 2 - SW / 2) + 'px', top: (H / 2 - SH / 2) + 'px', width: SW + 'px', height: SH + 'px',
      display: 'none', transformOrigin: '50% 50%', willChange: 'transform' }, root)
    if (sp) {
      const fc = el('canvas', { position: 'absolute', left: 0, top: 0, width: SW + 'px', height: SH + 'px' }, flip)
      fc.width = sp.width; fc.height = sp.height; fc.getContext('2d').drawImage(sp, 0, 0)
    }
    const faceBox = { position: 'absolute', left: PAD * s + 'px', top: PAD * s + 'px', width: GW + 'px', height: GH + 'px', borderRadius: BODY.r * s + 'px', overflow: 'hidden' }
    const shade = el('div', { ...faceBox, background: '#07031a', opacity: 0 }, flip)
    const sheenBox = el('div', { ...faceBox, mixBlendMode: 'screen' }, flip)
    const sheen = el('div', { position: 'absolute', top: '-10%', height: '120%', width: '70%', left: '0',
      background: 'linear-gradient(100deg, rgba(255,240,220,0) 0%, rgba(255,236,210,0.0) 30%, rgba(255,244,228,0.55) 50%, rgba(220,200,255,0) 70%, rgba(255,240,220,0) 100%)' }, sheenBox)

    const cv = layerCanvas(root), x = cv.getContext('2d')
    x.imageSmoothingQuality = 'high'
    let dirty = true

    function flipAt(t, c) {
      const dir = c.dir || 1
      const a0 = c.t - 0.28, a1 = c.t - 0.03, b0 = c.t + 0.03, b1 = c.t + 0.27
      if (t < a0 || t > b1) return null
      let th = 0
      if (t < a1) th = 90 * (1 - easeOutBack(prog(t, a0, a1), 0.55))     // swings in, slaps a hair past flat (≤3.5°, still covering)
      else if (t > b0) th = -90 * ease.inQuad(prog(t, b0, b1))
      return th * dir
    }

    return {
      start: t0, end: t1, root,
      update(t) {
        // ── flip (DOM 3D)
        const fl = C.filter(c => c.kind === 'flip').map(c => [c, flipAt(t, c)]).find(([, th]) => th !== null && Math.abs(th) < 89.5)
        if (fl) {
          const [c, th] = fl, k = Math.abs(Math.sin(th * D2R))
          flip.style.display = 'block'
          const push = 1 + 0.035 * Math.exp(-Math.pow((t - c.t) / 0.13, 2))     // a slow push-in while it covers: never a static frame
          flip.style.transform = `perspective(2600px) rotateY(${th.toFixed(3)}deg) scale(${push.toFixed(4)})`
          shade.style.opacity = String((0.55 * k).toFixed(3))
          // the sheen band slides across as the card turns (left→right on the way in, onward on the way out)
          const u = (90 - th * (c.dir || 1)) / 180     // 0 → 1 over the whole flip
          sheen.style.transform = `translateX(${lerp(-110, 160, u).toFixed(1)}%)`
          sheenBox.style.opacity = String((0.25 + 0.75 * k).toFixed(3))
        } else flip.style.display = 'none'

        // ── canvas kinds + sparkles
        const live = C.filter(c => t > c.t - SPAN[c.kind][0] - 0.05 && t < c.t + SPAN[c.kind][1] + 0.65)
        if (!live.length) { if (dirty) { x.clearRect(0, 0, W, H); dirty = false } return }
        x.clearRect(0, 0, W, H); dirty = true
        for (const c of live) {
          const place = PLACE[c.kind]
          if (place) {
            // motion ghosts: the same placements a few ms earlier, faint, under the real cards
            // (one faint ghost a frame-third behind, only on the fastest cards: reads as motion blur at 30 fps)
            const now = place(t, c), g1 = place(t - 0.012, c)
            now.forEach((q, j) => {
              const g = g1[j]
              if (g && Math.hypot(g.cx - q.cx, g.cy - q.cy) > 40) drawCard(x, sp, g.cx, g.cy, g.w, g.rot, 0.18 * q.a)
              drawCard(x, sp, q.cx, q.cy, q.w, q.rot, q.a)
            })
          }
          if (c.kind === 'flip') {
            const th = flipAt(t, c)
            if (th !== null && Math.abs(th) > 0.5 && Math.abs(th) < 89.5) {
              // a hot glint running down the card's leading edge
              const a = GW / 2, D = 2600, sn = Math.sin(th * D2R), cs = Math.cos(th * D2R)
              const edges = [-a, a].map(xx => { const z = xx * sn; return { x: W / 2 + xx * cs * D / (D - z), k: D / (D - z) } })
              const lead = edges[0].k > edges[1].k ? edges[0] : edges[1]
              const far = lead === edges[0] ? edges[1] : edges[0]
              const k = Math.abs(sn)
              x.save(); x.globalCompositeOperation = 'lighter'
              for (const [e, aa] of [[lead, 0.55], [far, 0.35]]) {
                const g = x.createLinearGradient(e.x - 70, 0, e.x + 70, 0)
                g.addColorStop(0, 'rgba(186,150,255,0)'); g.addColorStop(0.5, `rgba(255,240,220,${aa * k})`); g.addColorStop(1, 'rgba(186,150,255,0)')
                x.fillStyle = g; x.fillRect(e.x - 70, 0, 140, H)
              }
              x.restore()
              // sparkles shed off the far edge
              const r = rng(900 + c.i * 7)
              x.save(); x.imageSmoothingEnabled = false
              for (let j = 0; j < 9; j++) {
                const yy = 160 + r() * 1600, ph = (t * 3 + r()) % 1
                x.globalAlpha = k * (1 - ph) * 0.9
                drawPixelStar(x, far.x + (far.x < W / 2 ? -1 : 1) * (20 + ph * 120 + r() * 40), yy, 18 + Math.round(r() * 2) * 6, Math.floor(r() * 3), SPARK[j % SPARK.length])
              }
              x.restore()
            }
          }
          glowFlash(x, t, c.t + 0.01, { a: c.kind === 'flip' ? 0.16 : 0.2 })
          sparkBurst(x, 540, 960, t, c.t - 0.02, { n: 12, rad: 420, seed: 31 + c.i * 5, size: 32, dur: 0.55 })
          if (c.kind === 'deal') DEAL_SLOTS.forEach(([sx, sy], i) => sparkBurst(x, sx, sy, t, c.t - 0.34 + i * 0.04 + 0.15, { n: 6, rad: 170, seed: 50 + i + c.i, size: 22, dur: 0.4 }))
          if (c.kind === 'fan') sparkBurst(x, 540, 960, t, c.t - 0.3, { n: 8, rad: 300, seed: 70 + c.i, size: 24, dur: 0.4 })
        }
      },
    }
  }
}

// ═══════════════════════════════════════════ cardCutCues
export function cardCutCues(cuts, opts = {}) {
  const r3 = v => +v.toFixed(3)
  return normCuts(cuts, opts).flatMap(c => {
    const t = c.t, pan = c.i % 2 ? 0.2 : -0.2
    const reveal = ['pop', r3(t + 0.2), [1174.66, 1318.51, 987.77, 1479.98][c.i % 4], 0.02, -pan]
    if (c.kind === 'flip') return [['whoosh', r3(t - 0.03), 0.5, 0.035], ['tick', r3(t - 0.04), 0.055], ['whoosh', r3(t + 0.3), 0.34, 0.022], ['tick', r3(t + 0.12), 0.03], reveal]
    if (c.kind === 'deal') return [['whoosh', r3(t - 0.12), 0.36, 0.03], ...DEAL_SLOTS.map((_, i) => ['tick', r3(t - 0.34 + i * 0.04 + 0.14), 0.034 + 0.004 * i]), ['whoosh', r3(t + 0.24), 0.34, 0.026], reveal]
    if (c.kind === 'shuffle') return [['whoosh', r3(t - 0.1), 0.4, 0.03], ...SHUF.map((_, k) => ['tick', r3(t - 0.32 + k * 0.03 + 0.15), 0.026]), ['whoosh', r3(t + 0.26), 0.36, 0.026], reveal]
    return [['whoosh', r3(t - 0.1), 0.42, 0.032], ...Array.from({ length: 5 }, (_, k) => ['tick', r3(t - 0.24 + k * 0.035), 0.028]), ['tick', r3(t - 0.03), 0.045], ['whoosh', r3(t + 0.24), 0.4, 0.028], reveal]
  })
}

// ═══════════════════════════════════════════ cardFrame
export function cardFrame({ start = 0, end, label = 'ALIGN · TONIGHT', numeral = null, fadeIn = 0.4, fadeOut = 0.4, opacity = 1, corners = 'tl tr bl br' } = {}) {
  return async function buildCardFrame(stage) {
    try { await document.fonts.load(`700 20px 'Space Mono'`) } catch (_) { /* optional */ }
    const root = fill(stage, { pointerEvents: 'none' })
    root.dataset.cardfx = 'frame'
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const E = end ?? 1e9
    const O1 = 24, O2 = 36, R1 = 46, R2 = 34       // outer / inner hairline inset + radius
    const LBL_Y = H - O1, NUM_Y = O1
    const cs = corners.split(/\s+/)

    // measure the label / numeral gaps once
    x.font = `700 19px ${MONO}`; x.letterSpacing = '7px'
    const lblW = label ? x.measureText(label).width + 40 : 0
    x.font = `700 21px ${MONO}`; x.letterSpacing = '5px'
    const numW = numeral ? x.measureText(numeral).width + 36 : 54

    // a rounded rect path with gaps (top centre, bottom centre, side mid diamonds) so text/ornaments sit IN the line
    function frameLine(o, r, gapTop, gapBot, gapSide) {
      const l = o, tp = o, rt = W - o, bt = H - o
      x.beginPath()
      x.moveTo(W / 2 + gapTop / 2, tp); x.lineTo(rt - r, tp); x.arcTo(rt, tp, rt, tp + r, r); x.lineTo(rt, H / 2 - gapSide / 2)
      x.moveTo(rt, H / 2 + gapSide / 2); x.lineTo(rt, bt - r); x.arcTo(rt, bt, rt - r, bt, r); x.lineTo(W / 2 + gapBot / 2, bt)
      x.moveTo(W / 2 - gapBot / 2, bt); x.lineTo(l + r, bt); x.arcTo(l, bt, l, bt - r, r); x.lineTo(l, H / 2 + gapSide / 2)
      x.moveTo(l, H / 2 - gapSide / 2); x.lineTo(l, tp + r); x.arcTo(l, tp, l + r, tp, r); x.lineTo(W / 2 - gapTop / 2, tp)
      x.stroke()
    }
    const diamond = (cx, cy, s) => { x.beginPath(); x.moveTo(cx, cy - s); x.lineTo(cx + s * 0.62, cy); x.lineTo(cx, cy + s); x.lineTo(cx - s * 0.62, cy); x.closePath() }

    return {
      start, end: E, root,
      update(t) {
        const a = opacity * ease.inOutQuad(prog(t, start, start + fadeIn)) * (1 - ease.inOutQuad(prog(t, E - fadeOut, E)))
        x.clearRect(0, 0, W, H)
        if (a <= 0.003) return
        x.save()
        x.lineCap = 'round'
        // outer hairline (gold-bone) + inner hairline (bone), with a faint glow
        x.shadowColor = 'rgba(242,199,92,0.35)'; x.shadowBlur = 6
        x.globalAlpha = 0.36 * a; x.strokeStyle = '#ecd6a6'; x.lineWidth = 2
        frameLine(O1, R1, numW, lblW, 40)
        x.globalAlpha = 0.22 * a; x.strokeStyle = BONE; x.lineWidth = 1.4
        frameLine(O2, R2, numW - 16, lblW - 16, 28)
        x.shadowBlur = 0
        // side-mid diamonds
        for (const sx of [O1, W - O1]) {
          x.globalAlpha = 0.42 * a; x.strokeStyle = '#ecd6a6'; x.lineWidth = 1.6; diamond(sx, H / 2, 13); x.stroke()
          x.globalAlpha = 0.5 * a; x.fillStyle = GOLD; diamond(sx, H / 2, 4.5); x.fill()
        }
        // corner ornaments: a pixel star, breathing slowly, with a tiny dot pair along each line
        const CP = { tl: [O2 + 26, O2 + 26], tr: [W - O2 - 26, O2 + 26], bl: [O2 + 26, H - O2 - 26], br: [W - O2 - 26, H - O2 - 26] }
        x.imageSmoothingEnabled = false
        Object.entries(CP).forEach(([key, [cx, cy]], i) => {
          if (!cs.includes(key)) return
          const tw = 0.75 + 0.25 * Math.sin(t * 2.1 + i * 1.7)
          x.globalAlpha = 0.55 * a * tw
          drawPixelStar(x, cx, cy, 21, i % 2 ? 1 : 0, GOLD, '#fff6e6')
          const sx = cx < W / 2 ? 1 : -1, sy = cy < H / 2 ? 1 : -1
          x.globalAlpha = 0.38 * a; x.fillStyle = BONE
          for (const d of [26, 38]) { x.fillRect(cx + sx * d - 1.5, cy - 1.5, 3, 3); x.fillRect(cx - 1.5, cy + sy * d - 1.5, 3, 3) }
        })
        x.imageSmoothingEnabled = true
        // top cartouche: the numeral (or a small star), bottom: the label — both sitting in the outer line's gaps
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ecd6a6'
        if (numeral) {
          x.font = `700 21px ${MONO}`; x.letterSpacing = '5px'; x.globalAlpha = 0.5 * a
          x.fillText(numeral, W / 2 + 2.5, NUM_Y + 1)
        } else {
          x.globalAlpha = 0.55 * a; x.imageSmoothingEnabled = false
          drawPixelStar(x, W / 2, NUM_Y, 21, 1, GOLD, '#fff6e6'); x.imageSmoothingEnabled = true
        }
        if (label) {
          x.font = `700 19px ${MONO}`; x.letterSpacing = '7px'; x.globalAlpha = 0.46 * a
          x.fillText(label, W / 2 + 3.5, LBL_Y + 1)
        }
        x.restore()
      },
    }
  }
}
