// 01-blind — "Blind by design". Feature: mystery cards.
// 0.0  a full-frame Scorpio aura veil breathes in deep space (heavy grain) · eyebrow MYSTERY CARD
// 0.7  "No faces."  2.45 "Just faith."
// 3.8  the veil pushes past camera; six veiled mystery cards fly out of the dark in 3D, auras pulsing
// 7.0  the last card (Juniper, veiled) settles front and centre · "The stars are giving you a chance."
// 9.0  end tag
import { W, H, A, IMG, el, fill, img, prog, ease, lerp, clamp, rng, spaceBackdrop, typeLine, eyebrow, starField, pixelStar, endTag, BONE, GOLD } from './kit.js'

const DURATION = 11.4
const END = 9.0

// card-profile-*.png 1496×2238: opaque body x120..1373, y114..2115; aura window ≈ x205..1300, y332..922
const PW = 1496, PH = 2238
const CW = 560, S = CW / PW, CH = PH * S
const WIN = { x: 205 * S, y: 332 * S, w: 1095 * S, h: 590 * S }
// passing cards then the hero (card-profile-3 = Juniper, violet)
const CARDS = [
  { n: 1, col: '255,95,168', side: -1, y: -120, rot: -16, s: 4.0 },
  { n: 4, col: '63,176,255', side: 1, y: 160, rot: 14, s: 4.42 },
  { n: 2, col: '255,154,60', side: -1, y: 260, rot: -10, s: 4.84 },
  { n: 6, col: '47,224,200', side: 1, y: -220, rot: 18, s: 5.26 },
  { n: 5, col: '154,123,255', side: -1, y: 40, rot: -14, s: 5.68 },
  { n: 3, col: '176,108,255', hero: true, s: 5.95 },
]
const FLY = 2.0 // seconds a passing card takes from deep space past the camera
const HERO_LAND = 7.0
const LINE1 = 0.7, LINE2 = 2.45, PUSH = 3.8, LINE3 = 7.2

export default {
  id: '01-blind', title: 'Blind by design', duration: DURATION, endTagAt: END,
  music: {
    chords: [
      [0, 2.4, [146.83, 220, 329.63, 349.23]],          // Dm(add9)
      [2.4, 4.6, [116.54, 174.61, 220, 293.66]],        // Bbmaj7
      [4.6, 7.0, [98, 146.83, 233.08, 440]],            // Gm(add9)
      [7.0, 9.0, [87.31, 174.61, 220, 261.63, 392]],    // F(add9) — the chance
      [9.0, DURATION, [146.83, 220, 369.99, 554.37]],   // Dmaj7 — end tag
    ],
    padGain: 0.024, bpm: 72, beatFrom: 4.15, beatTo: 8.9, pulseGain: 0.2,
  },
  cues: [
    ['whoosh', 0.35, 0.9, 0.06],
    ['bell', 0.2, 293.66, 0.04, 2.6, 0],
    ['bell', LINE1 + 0.05, 587.33, 0.05, 2.0, -0.2],
    ['bell', LINE1 + 0.3, 440, 0.03, 1.8, 0.2],
    ['bell', LINE2 + 0.05, 698.46, 0.05, 2.0, 0.2],
    ['bell', LINE2 + 0.35, 880, 0.035, 2.0, -0.2],
    ['riser', 3.0, 4.05, 0.05],
    ['whoosh', 4.15, 0.9, 0.12],
    ...CARDS.filter(c => !c.hero).map(c => ['whoosh', c.s + 1.62, 0.5, 0.09]),
    ['whoosh', HERO_LAND - 0.25, 0.7, 0.07],
    ['bell', HERO_LAND, 349.23, 0.06, 2.4, 0],
    ['bell', HERO_LAND + 0.08, 523.25, 0.045, 2.4, 0.15],
    ['bell', HERO_LAND + 0.16, 783.99, 0.035, 2.4, -0.15],
    ['glitter', HERO_LAND + 0.05, HERO_LAND + 0.6],
    ['bell', LINE3 + 0.6, 1046.5, 0.025, 1.6, 0.3],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = spaceBackdrop(root, 'rose', { seed: 11, grain: 0.34 })

    // ── the aura veil (full frame): blurred bloom copy + sharp-ish copy, radially masked into space
    const AW = 1300, AS = AW / 640, AH = 585 * AS
    const veil = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: '540px 800px' }, root)
    const mask = 'radial-gradient(ellipse 47% 45% at 50% 60%, #000 52%, rgba(0,0,0,0.55) 72%, transparent 100%)'
    const box = { position: 'absolute', left: (540 - 340 * AS) + 'px', top: (800 - 250 * AS) + 'px', width: AW + 'px', height: AH + 'px', objectFit: 'cover', WebkitMaskImage: mask, maskImage: mask }
    const bloom = img(veil, `${IMG}aura/scorpio.jpg`, { ...box, filter: 'blur(70px) saturate(1.2)', transform: 'scale(1.5)', mixBlendMode: 'screen', opacity: 0.4 })
    const aura = img(veil, `${IMG}aura/scorpio.jpg`, { ...box, mixBlendMode: 'screen', filter: 'contrast(1.25) saturate(1.15)' })
    // extra heavy grain over the veil (own layer, overlay)
    const grain = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity: 0.2, pointerEvents: 'none' }, root)
    grain.width = W / 2; grain.height = H / 2
    const gctx = grain.getContext('2d')
    const gTiles = Array.from({ length: 4 }, (_, k) => {
      const d = gctx.createImageData(W / 2, H / 2), r = rng(77 + k)
      for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 150; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255 }
      return d
    })
    

    // ── 3D card flight
    const space = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '1400px', perspectiveOrigin: '540px 820px' }, root)
    const cards = CARDS.map(c => {
      const wrap = el('div', { position: 'absolute', left: (540 - CW / 2) + 'px', top: (820 - CH / 2) + 'px', width: CW + 'px', height: CH + 'px', display: 'none', willChange: 'transform' }, space)
      const halo = el('div', { position: 'absolute', left: '-40%', top: '-25%', width: '180%', height: '150%', borderRadius: '50%', background: `radial-gradient(closest-side, rgba(${c.col},0.7), rgba(${c.col},0.2) 55%, rgba(${c.col},0) 100%)`, mixBlendMode: 'screen' }, wrap)
      const im = img(wrap, `${A}card-profile-${c.n}.png`, { left: 0, top: 0, width: CW + 'px', height: CH + 'px' })
      const pulse = el('div', { position: 'absolute', left: WIN.x + 'px', top: WIN.y + 'px', width: WIN.w + 'px', height: WIN.h + 'px', borderRadius: '14px', mixBlendMode: 'screen', background: `radial-gradient(60% 75% at 50% 62%, rgba(${c.col},0.95), rgba(${c.col},0.25) 60%, rgba(${c.col},0) 100%)`, opacity: 0 }, wrap)
      // a soft specular sheen sliding across the card as it turns
      const sheen = el('div', { position: 'absolute', left: (120 * S) + 'px', top: (114 * S) + 'px', width: (1253 * S) + 'px', height: (2001 * S) + 'px', borderRadius: '22px', mixBlendMode: 'screen', background: 'linear-gradient(105deg, rgba(255,255,255,0) 35%, rgba(255,246,230,0.16) 48%, rgba(255,255,255,0) 60%)', backgroundSize: '300% 100%', opacity: 0.9 }, wrap)
      return { ...c, wrap, halo, im, pulse, sheen }
    })

    const eb = eyebrow(root, 'MYSTERY CARD', { y: 300, size: 30, spacing: '0.34em' })
    const ebRule = el('div', { position: 'absolute', left: '470px', top: '356px', width: '140px', height: '1px', background: 'linear-gradient(90deg, rgba(239,230,214,0), rgba(239,230,214,0.7), rgba(239,230,214,0))', opacity: 0 }, root)
    const l1 = typeLine(root, 'No faces.', { y: 1370, size: 118, perChar: 0.05, fade: 0.35 })
    const l2 = typeLine(root, 'Just faith.', { y: 1370, size: 118, perChar: 0.05, fade: 0.35 })
    const l3 = typeLine(root, 'The stars are giving\nyou a chance.', { y: 1330, size: 90, perChar: 0.032, fade: 0.32, lh: 1.14 })
    const tag = endTag(stage, { start: END, end: DURATION })

    return {
      update(t) {
        bg.update(t)
        const fi = Math.round(t * 30)
        gctx.putImageData(gTiles[fi % 4], 0, 0)

        // veil: breathe, then push past camera and settle as a faint wash
        const breath = Math.sin(t * 1.7 + 0.4)
        const push = ease.inOutCubic(prog(t, PUSH, PUSH + 1.1))
        const sc = (1 + 0.035 * breath) * lerp(1, 2.6, push)
        veil.style.transform = `scale(${sc})`
        const vin = lerp(0.8, 1, ease.outQuad(prog(t, 0, 0.5)))
        veil.style.opacity = String(vin * lerp(1, 0.13, push))
        veil.style.filter = `brightness(${0.95 + 0.14 * breath}) blur(${push * 10}px)`
        bloom.style.opacity = String(0.3 + 0.2 * (0.5 + 0.5 * breath))
        grain.style.opacity = String(lerp(0.24, 0.14, push))

        eb.style.opacity = String(ease.outQuad(prog(t, 0.12, 0.55)) * (1 - prog(t, PUSH - 0.2, PUSH + 0.2)))
        eb.style.letterSpacing = lerp(0.5, 0.34, ease.outCubic(prog(t, 0.12, 1.2))) + 'em'
        ebRule.style.opacity = eb.style.opacity
        ebRule.style.transform = `scaleX(${ease.outCubic(prog(t, 0.3, 1.0))})`

        l1.update(t - LINE1, LINE2 - 0.35 - LINE1)
        l2.update(t - LINE2, PUSH - 0.05 - LINE2)
        l3.update(t - LINE3)
        l1.root.style.transform = `translateY(${-8 * prog(t, LINE1, LINE2)}px)`
        l2.root.style.transform = `translateY(${-8 * prog(t, LINE2, PUSH)}px)`

        // cards
        for (const c of cards) {
          const lt = t - c.s
          if (c.hero) {
            const p = prog(lt, 0, HERO_LAND - c.s)
            if (p <= 0 || t >= END + 0.3) { c.wrap.style.display = 'none'; continue }
            c.wrap.style.display = 'block'
            const e = ease.outCubic(p)
            const z = lerp(-3200, 0, e)
            const settle = t - HERO_LAND
            const bob = settle > 0 ? Math.sin(settle * 1.4) * 8 : 0
            const ry = lerp(-38, 0, ease.outQuart(p)) + (settle > 0 ? Math.sin(settle * 0.9) * 3.5 : 0)
            const rz = lerp(9, 0, e) + (settle > 0 ? Math.sin(settle * 0.7 + 1) * 1.2 : 0)
            const y = lerp(120, -60, e) + bob
            c.wrap.style.transform = `translate3d(0px, ${y}px, ${z}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${1 + 0.012 * Math.max(0, settle)})`
            c.wrap.style.zIndex = String(5000)
            c.wrap.style.opacity = String(ease.outQuad(prog(p, 0, 0.25)))
            const pul = 0.5 + 0.5 * Math.sin((t - HERO_LAND) * 3.1 - 1.4)
            const land = settle > 0 ? 1 - ease.outQuad(prog(settle, 0, 0.7)) : 0
            c.pulse.style.opacity = String(0.12 + 0.32 * pul + 0.5 * land)
            c.halo.style.opacity = String(0.55 + 0.35 * pul + 0.6 * land)
            c.halo.style.transform = `scale(${1 + 0.06 * pul + 0.25 * land})`
            c.sheen.style.backgroundPosition = `${lerp(100, -10, ease.inOutCubic(prog(t, HERO_LAND - 0.3, HERO_LAND + 0.9)))}% 0`
            continue
          }
          const p = lt / FLY
          if (p <= 0 || p >= 1) { c.wrap.style.display = 'none'; continue }
          c.wrap.style.display = 'block'
          const z = lerp(-3000, 800, p)
          const xo = c.side * lerp(60, 620, ease.inQuad(p))
          const yo = c.y * lerp(0.2, 1, p)
          const ry = c.side * lerp(-8, 38, ease.inQuad(p))
          const rz = c.rot * lerp(0.2, 1, p)
          c.wrap.style.transform = `translate3d(${xo}px, ${yo}px, ${z}px) rotateY(${ry}deg) rotateZ(${rz}deg)`
          c.wrap.style.zIndex = String(Math.round(z + 4000))
          c.wrap.style.opacity = String(ease.outQuad(prog(p, 0, 0.18)) * (1 - prog(p, 0.9, 1)))
          const pul = 0.5 + 0.5 * Math.sin(lt * 4.2 + c.n)
          c.pulse.style.opacity = String(0.15 + 0.45 * pul)
          c.halo.style.opacity = String(0.5 + 0.4 * pul)
          c.sheen.style.backgroundPosition = `${lerp(100, 0, p)}% 0`
        }
        tag.update(t)
      },
      fx(ctx, t) {
        if (t >= END) return
        const push = prog(t, PUSH, PUSH + 1.4)
        starField(ctx, t, { seed: 9, sprites: 18, dots: 60, alpha: lerp(0.55, 0.9, push), keepOut: t < PUSH ? [[260, 1350, 560, 160]] : t > LINE3 - 0.3 ? [[120, 1310, 840, 240], [280, 360, 520, 820]] : t > HERO_LAND - 0.6 ? [[280, 360, 520, 820]] : [] })
        // warp streaks: stars rushing past while the cards fly (radial from the vanishing point)
        if (t > PUSH && t < HERO_LAND + 0.4) {
          const r = rng(4242), k = prog(t, PUSH, PUSH + 0.6) * (1 - prog(t, HERO_LAND - 0.4, HERO_LAND + 0.4))
          for (let i = 0; i < 70; i++) {
            const a = r() * 6.2832, sp = 0.35 + r() * 0.65, ph = r()
            const q = ((t - PUSH) * sp * 0.55 + ph) % 1
            const d0 = 40 + Math.pow(q, 2.2) * 1300, d1 = d0 * (1 + 0.18 * sp)
            const cx = 540, cy = 820
            ctx.globalAlpha = k * q * 0.7
            ctx.strokeStyle = i % 6 === 0 ? 'rgba(242,199,92,1)' : 'rgba(255,240,232,1)'
            ctx.lineWidth = 1 + q * 2
            ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * d0, cy + Math.sin(a) * d0); ctx.lineTo(cx + Math.cos(a) * d1, cy + Math.sin(a) * d1); ctx.stroke()
          }
          ctx.globalAlpha = 1
        }
        // hero lands: a ring of gold pixel stars sparkles out around the card
        const lt = t - HERO_LAND
        if (lt > 0 && lt < 1.6) {
          const r = rng(707)
          for (let i = 0; i < 16; i++) {
            const a = r() * 6.2832, d = 340 + r() * 160, dl = r() * 0.3
            const q = prog(lt, dl, dl + 1.2)
            if (q <= 0 || q >= 1) continue
            const rr = lerp(d * 0.75, d * 1.15, ease.outCubic(q))
            const x = 540 + Math.cos(a) * rr * 0.85, y = 760 + Math.sin(a) * rr * 1.25
            ctx.globalAlpha = Math.sin(Math.PI * q)
            pixelStar(ctx, x, y, 4, q < 0.3 ? 0 : q < 0.7 ? 1 : 2, i % 3 ? GOLD : BONE)
          }
          ctx.globalAlpha = 1
        }
      },
    }
  },
}
