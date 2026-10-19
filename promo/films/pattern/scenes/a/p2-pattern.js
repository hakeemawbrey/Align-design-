// P2 · THE PATTERN → THE TURN (7.85–15.2). From p1's dark room, all five of them are dealt into a row: five faces,
// five names, and the same three red flags — which light up in sync, row by row (THE SAME RED FLAGS). The row collapses
// into one card: they were always the same person. "What if you saw it coming?" The card slowly turns face-down; at
// edge-on its back — Juniper's veiled mystery card (card-profile-3) — blooms the sky out of the dark.
// Hand-off H (still from SETTLE 14.45; B starts 14.8): drawSky(zoom 1, dx 0, dy 0, dim 1, moon (1716,122) r52 phase .12
// alpha 1) + grain 0.5; card-profile-3.png BODY (png box 120,114 → 1374,2116) 600 tall centred at (960,540), upright,
// the whole png drawn (its own soft edge), no extra glow, no fx.
import { clamp, lerp, prog, ease, rng, el, C, PIXEL_PALETTE, mix } from '../../../../src/lib.js'
import { W, H, A, fill, img } from '../../../../src/scenes/common.js'
import { drawSky, layerCanvas } from '../../../sky.js'
import { BONE, ROOM_BG, PEOPLE, FLAG_RED, grainLayer, words, capStyle, makeProfileCard, CARD_H } from './common.js'

const START = 7.85, END = 15.2
export const H_CARD = { cx: 960, cy: 540, bodyH: 600 }
export const H_MOON = { x: 1716, y: 122, r: 52, phase: 0.12, alpha: 1 }
const PNG = { w: 1496, h: 2238, bx0: 120, by0: 114, bx1: 1374, by1: 2116 }          // card-profile-3.png body box
const BS = H_CARD.bodyH / (PNG.by1 - PNG.by0)                                      // png px → stage px
const HS = H_CARD.bodyH / CARD_H                                                     // face card scale at H

// ── timing
const DEAL0 = 7.98, DEAL_GAP = 0.09, DEAL = 0.42
const FL = [8.8, 9.2, 9.6]                       // red-flag row j lights up across all five cards
const MERGE0 = 10.55, MERGE1 = 11.4
const TURN0 = 12.85, TURN1 = 13.85
const EDGE = lerp(TURN0, TURN1, 0.5)
const SETTLE = 14.45
const WIPE = 0.45
// row layout
const RS = 0.6, ROW_Y = 492, ROW_DX = 350
const rowX = i => H_CARD.cx + (i - 2) * ROW_DX
const N = PEOPLE.length, TOP = N - 1             // the last one (Dev) is the card that turns

// ── pixel stars thrown off the card's edge line at edge-on (from f2 via ghosted), all gone before the hand-off
const SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x - 3, y - 3, ch === 'C'])).filter(Boolean))
function sprite(ctx, cx, cy, px, kind, color, centre) {
  const x0 = Math.round(cx) - Math.floor(px / 2), y0 = Math.round(cy) - Math.floor(px / 2)
  for (const [x, y, c] of SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
}
const HOT = '#fff3e0', STAR_PAL = [BONE, BONE, C.gold, '#c9a6ff', '#ff8fb1', ...PIXEL_PALETTE]
const BURST = (() => {
  const r = rng(8181)
  return Array.from({ length: 64 }, (_, i) => {
    const side = r() < 0.5 ? 0 : Math.PI, a = side + (r() - 0.5) * 1.3
    return { a, ly: r() - 0.5, v: 900 + Math.pow(r(), 1.4) * 1700, life: 0.38 + r() * 0.4, px: 3 + Math.floor(r() * 3), kind: r() < 0.35 ? 0 : (r() < 0.5 ? 1 : 3),
      col: STAR_PAL[Math.floor(r() * STAR_PAL.length)], d: i < 30 ? 0 : r() * 0.08, ph: Math.floor(r() * 4) }
  })
})()

/** chip j of a card lit (k 0..1): red rim + soft glow */
function lightChip(chip, k, pulse) {
  if (k <= 0) { chip.style.borderColor = 'rgba(255,255,255,0.14)'; chip.style.boxShadow = 'none'; chip.style.transform = 'none'; return }
  chip.style.borderColor = mix('#4a4c52', FLAG_RED, k)
  chip.style.boxShadow = `0 0 ${(26 * k).toFixed(1)}px rgba(196,84,92,${(0.55 * k).toFixed(3)}), inset 0 0 ${(14 * k).toFixed(1)}px rgba(196,84,92,${(0.25 * k).toFixed(3)})`
  chip.style.transform = pulse > 0.001 ? `scale(${(1 + 0.07 * pulse).toFixed(4)})` : 'none'
  chip.style.transformOrigin = '0 50%'
}

export default function build(stage) {
  const root = fill(stage, { background: ROOM_BG })
  const cold = el('div', { position: 'absolute', inset: 0, zIndex: '0',
    background: 'radial-gradient(70% 70% at 50% 46%, #171a21 0%, #101217 55%, #08090c 100%)' }, root)
  const backGrain = grainLayer(cold, 0.3, '5')
  // the sky (under the card), revealed by a feathered bloom from the card's edge line
  const skyC = layerCanvas(root, { opacity: 0 }), sx = skyC.getContext('2d')
  const maskC = document.createElement('canvas'); maskC.width = W / 2; maskC.height = H / 2
  const mx = maskC.getContext('2d')

  // the row
  const deck = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  const others = PEOPLE.slice(0, TOP).map((p, i) => {
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: String(10 + i) }, deck)
    return { holder, i, ...makeProfileCard(holder, p) }
  })
  // the last card: 3D, front = Dev's profile card, back = the veiled mystery card (card-profile-3)
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: '50' }, deck)
  const card3d = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d' }, holder)
  const front = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden' }, card3d)
  const frontS = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transform: `scale(${HS})` }, front)
  const topCard = makeProfileCard(frontS, PEOPLE[TOP])
  const fWash = el('div', { position: 'absolute', inset: 0, background: '#dfe6ff', mixBlendMode: 'screen', opacity: 0 }, topCard.card)
  const back = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }, card3d)
  const bcx = (PNG.bx0 + PNG.bx1) / 2, bcy = (PNG.by0 + PNG.by1) / 2
  img(back, A + 'card-profile-3.png', { left: -bcx * BS + 'px', top: -bcy * BS + 'px', width: PNG.w * BS + 'px', height: PNG.h * BS + 'px' })
  const bWash = el('div', { position: 'absolute', left: -(bcx - PNG.bx0) * BS + 'px', top: -(bcy - PNG.by0) * BS + 'px', width: (PNG.bx1 - PNG.bx0) * BS + 'px', height: (PNG.by1 - PNG.by0) * BS + 'px',
    borderRadius: 84 * BS + 'px', background: '#f3e6ff', mixBlendMode: 'screen', opacity: 0 }, back)
  const edge = el('div', { position: 'absolute', left: '-2px', top: -H_CARD.bodyH / 2 + 16 + 'px', width: '4px', height: H_CARD.bodyH - 32 + 'px', borderRadius: '2px',
    background: 'linear-gradient(180deg, rgba(239,230,214,0.4), #fff6ea 20%, #d9c4ff 50%, #fff6ea 80%, rgba(239,230,214,0.4))', boxShadow: '0 0 10px 2px rgba(214,190,255,0.8)', transform: 'rotateY(90deg)' }, card3d)
  const allChips = [...others.map(o => o.chips), topCard.chips]

  // copy: "Same red flags." under the row, then the turn line in the bottom pocket
  const flagsLine = words(root, 'Same red flags.', { ...capStyle(72), left: 0, width: W + 'px', top: '800px', textAlign: 'center', zIndex: '3000' }, FL[0], 0.12, 0.3)
  const pocket = el('div', { position: 'absolute', left: 0, top: '820px', width: W + 'px', height: '260px', opacity: 0, zIndex: '2900',
    background: 'radial-gradient(48% 52% at 50% 52%, rgba(8,6,20,0.62) 0%, rgba(8,6,20,0.28) 60%, rgba(8,6,20,0) 100%)' }, root)
  const cap = words(root, 'What if you saw it coming?', { ...capStyle(96), left: 0, width: W + 'px', top: '880px', textAlign: 'center', zIndex: '3000' }, 11.5, 0.11, 0.3)
  const flash = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0, zIndex: '3500',
    background: 'radial-gradient(40% 60% at 50% 50%, rgba(255,246,236,0.9) 0%, rgba(201,166,255,0.5) 40%, rgba(120,70,220,0.12) 75%, rgba(0,0,0,0) 100%)' }, root)
  const fade = el('div', { position: 'absolute', inset: 0, background: ROOM_BG, zIndex: '3800', pointerEvents: 'none' }, root)   // in from p1's dark room
  const grain = grainLayer(root)
  const silver = grainLayer(root, 0.07, '3900', 'screen')

  const turnAng = t => {
    if (t < TURN0) return 0
    if (t < TURN1) return 180 * (0.5 - 0.5 * Math.cos(Math.PI * prog(t, TURN0, TURN1)))
    const u = prog(t, TURN1, SETTLE)
    return 180 + 4 * Math.exp(-u * 5) * Math.sin(u * 9) * (1 - u)
  }
  /** pose of card i: dealt into the row, then collapsing into the centre */
  const pose = (t, i) => {
    const d0 = DEAL0 + i * DEAL_GAP, dl = ease.outCubic(prog(t, d0, d0 + DEAL))
    const m = ease.inOutCubic(prog(t, MERGE0 + (2 - Math.abs(i - 2)) * 0.0 + (i === TOP ? 0.05 : 0), MERGE1))
    const rot0 = (i - 2) * 1.2
    return {
      dl, m,
      x: lerp(rowX(i), H_CARD.cx, m),
      y: lerp(ROW_Y + 110 * (1 - dl), H_CARD.cy, m),
      s: lerp(RS * (1 + 0.04 * (1 - dl)), HS, m),
      rot: lerp(rot0 + 4 * (1 - dl) * (i % 2 ? 1 : -1), 0, m),
    }
  }

  return {
    start: START, end: END, root,
    fxStart: EDGE - 0.02, fxEnd: SETTLE,
    update(t) {
      fade.style.opacity = String(1 - ease.inOutQuad(prog(t, START, START + 0.25)))
      const coldOn = t < EDGE + WIPE + 0.05
      cold.style.display = coldOn ? 'block' : 'none'
      if (coldOn) backGrain.update(t)

      // ── the red flags light up in sync, row by row; they soften as the row collapses
      const soften = 1 - 0.55 * ease.inOutQuad(prog(t, MERGE0, MERGE1))
      allChips.forEach(chips => chips.forEach((ch, j) => {
        const k = ease.outCubic(prog(t, FL[j], FL[j] + 0.22))
        const pulse = Math.sin(Math.PI * prog(t, FL[j], FL[j] + 0.36))
        lightChip(ch, k * soften * (t < TURN1 ? 1 : 0), pulse)
      }))

      // ── the others: dealt, then they collapse behind the top card and are gone
      for (const o of others) {
        const p = pose(t, o.i)
        const gone = prog(t, lerp(MERGE0, MERGE1, 0.45), MERGE1 - 0.05)
        if (p.dl <= 0 || gone >= 1) { o.holder.style.display = 'none'; continue }
        o.holder.style.display = 'block'
        o.holder.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg) scale(${p.s})`
        o.holder.style.opacity = String(p.dl * (1 - ease.inQuad(gone)))
        const br = 1 - 0.35 * p.m
        o.card.style.filter = br < 1 ? `brightness(${br.toFixed(3)})` : 'none'
      }

      // ── the top card: in the row, then centre, then the turn
      const p = pose(t, TOP)
      holder.style.display = p.dl > 0 ? 'block' : 'none'
      holder.style.opacity = String(p.dl)
      const ang = turnAng(t), ca = Math.cos(ang * Math.PI / 180)
      const lift = Math.sin(Math.PI * prog(t, TURN0, TURN1))
      if (t >= SETTLE) {                                                     // exactly H: flat, upright, centred, still
        holder.style.transform = `translate(${H_CARD.cx}px, ${H_CARD.cy}px)`
        card3d.style.transform = 'rotateY(180deg)'
      } else {
        const breathe = 1 + 0.012 * ease.inOutQuad(prog(t, MERGE1, TURN0))   // a slow lean-in while the line lands
        holder.style.transform = `translate(${p.x}px, ${p.y - 8 * lift}px) rotate(${p.rot}deg) scale(${(p.s / HS) * breathe * (1 + 0.025 * lift) * (t >= TURN1 ? 1 / breathe : 1)})`
        card3d.style.transform = `perspective(2600px) rotateX(${(4 * lift).toFixed(3)}deg) rotateY(${ang.toFixed(3)}deg)`
      }
      fWash.style.opacity = String(ang < 90 ? 0.4 * clamp(1 - ca) : 0)
      bWash.style.opacity = String(ang > 90 ? 0.42 * clamp(1 + ca) * (t < SETTLE ? 1 : 0) : 0)
      edge.style.opacity = String(t < SETTLE ? clamp((0.3 - Math.abs(ca)) / 0.2) : 0)

      // ── the sky blooms from the card's edge line at edge-on
      const bloom = prog(t, EDGE - 1 / 60, EDGE + WIPE)
      if (bloom > 0) {
        skyC.style.opacity = '1'
        const settle = ease.inOutCubic(prog(t, EDGE, SETTLE))
        const ex = 1 + 0.55 * (1 - ease.outCubic(prog(t, EDGE, SETTLE)))
        skyC.style.filter = ex > 1.0005 ? `brightness(${ex.toFixed(3)}) saturate(${(1 + 0.3 * (ex - 1)).toFixed(3)})` : 'none'
        const zoom = lerp(1.07, 1, settle)
        const ma = ease.inOutQuad(prog(t, EDGE + 0.2, SETTLE))
        drawSky(sx, t, { zoom: t >= SETTLE ? 1 : zoom, dx: 0, dy: 0, dim: 1, moon: { ...H_MOON, alpha: t >= SETTLE ? 1 : ma } })
        if (bloom < 1) {
          const hh = H_CARD.bodyH / 2, r = 16 + 1300 * ease.outCubic(bloom)
          mx.setTransform(1, 0, 0, 1, 0, 0); mx.clearRect(0, 0, W / 2, H / 2)
          mx.filter = 'blur(24px)'; mx.fillStyle = '#000'
          mx.setTransform(0.5, 0, 0, 0.5, 0, 0)
          mx.beginPath(); mx.roundRect(H_CARD.cx - r, H_CARD.cy - hh - r, 2 * r, 2 * hh + 2 * r, r); mx.fill(); mx.filter = 'none'
          sx.globalCompositeOperation = 'destination-in'; sx.drawImage(maskC, 0, 0, W, H); sx.globalCompositeOperation = 'source-over'
        }
      } else skyC.style.opacity = '0'
      const fd = t - EDGE
      flash.style.opacity = String(clamp(fd < -0.04 ? 0 : fd < 0 ? 0.12 : 0.42 * Math.exp(-fd * 7)) * (1 - prog(t, EDGE + 0.4, SETTLE)))

      // ── copy
      flagsLine.update(t, 1 - ease.inOutQuad(prog(t, 10.5, 10.78)))
      cap.update(t, 1 - ease.inOutQuad(prog(t, 14.38, 14.68)))
      pocket.style.opacity = String(ease.inOutQuad(prog(t, EDGE, EDGE + 0.3)) * (1 - ease.inOutQuad(prog(t, 14.38, 14.68))))
      const sv = 0.07 * (1 - ease.inOutQuad(prog(t, EDGE, EDGE + 0.4)))
      silver.el.style.display = sv > 0 ? 'block' : 'none'
      if (sv > 0) silver.update(t, sv)
      grain.update(t)
    },
    fx(ctx, t) {
      ctx.save(); ctx.imageSmoothingEnabled = false
      const tick = Math.round(t * 30) >> 1, hh = H_CARD.bodyH / 2
      const fr = Math.round(t * 30), EF = Math.round(EDGE * 30)
      if (fr === EF || fr === EF - 1) {                                    // a 2-frame white hairline at edge-on
        ctx.save(); ctx.imageSmoothingEnabled = true; ctx.globalAlpha = fr === EF ? 1 : 0.8
        ctx.shadowColor = 'rgba(226,210,255,0.9)'; ctx.shadowBlur = 14
        const lg = ctx.createLinearGradient(0, H_CARD.cy - hh, 0, H_CARD.cy + hh)
        lg.addColorStop(0, 'rgba(255,255,255,0)'); lg.addColorStop(0.08, '#fff'); lg.addColorStop(0.92, '#fff'); lg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = lg; ctx.fillRect(H_CARD.cx - 1.5, H_CARD.cy - hh, 3, 2 * hh); ctx.restore()
      }
      const dt = t - EDGE
      for (const b of BURST) {
        const lt = dt - b.d
        if (lt <= 0 || lt > b.life) continue
        const u = lt / b.life, dist = 14 + b.v * (1 - Math.exp(-lt * 3.2)) / 3.2
        const x = H_CARD.cx + Math.cos(b.a) * dist, y = H_CARD.cy + b.ly * 2 * hh + Math.sin(b.a) * dist * 0.9 + 40 * lt * lt
        ctx.globalAlpha = clamp((1 - u) * 1.6) * (((tick + b.ph) & 3) === 0 ? 0.55 : 1)
        sprite(ctx, x, y, b.px, ((tick + b.ph) & 1) ? b.kind : 2, b.col, HOT)
      }
      ctx.restore()
    },
  }
}

export const cues = [
  ...PEOPLE.map((_, i) => ['tick', DEAL0 + i * DEAL_GAP + 0.12, 0.04]),
  ['whoosh', DEAL0, 0.5, 0.06],
  ...FL.map((f, j) => ['bell', f, [196, 207.65, 220][j], 0.04, 1.8, (j - 1) * 0.3]),   // the flags, row by row
  ['whoosh', MERGE0, MERGE1 - MERGE0, 0.08],
  ['boom', MERGE1 - 0.05, 0.2],                                          // they were the same person
  ['bell', 11.5, 174.61, 0.03, 2.8, 0],                                  // "What if you saw it coming?"
  ['whoosh', TURN0, TURN1 - TURN0, 0.12],                                // the slow turn
  ['boom', EDGE, 0.45],
  ...[293.66, 369.99, 440, 554.37, 587.33].map((f, i) => ['bell', EDGE + 0.02 + i * 0.05, f, 0.06, 2.6, (i - 2) * 0.2]),
  ['glitter', EDGE + 0.04, EDGE + 0.9],
]
