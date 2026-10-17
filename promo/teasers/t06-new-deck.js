// 06-new-deck — "Every night, the stars deal again." Night falls, the moon turns, a deck of card backs
// drops in, gets cut and riffled, deals six cards into a fan and turns them over: five people, one sign.
import { W, H, A, el, fill, prog, ease, lerp, clamp, rng, spaceBackdrop, typeLine, eyebrow, starField, pixelStar, drawMoonGlyph, endTag, BONE, GOLD, ROSE, SERIF, MONO } from './kit.js'

const DURATION = 12.2
const END = 9.8

const T_DECK = 0.12                 // deck drops in
const T_CUT1 = 1.2, T_CUT2 = 1.85   // two overhand cuts (0.6s each)
const T_RIF = 2.5                   // riffle split, cards fall back in from 2.78
const T_DEAL = 3.45, DEAL_GAP = 0.27, FLY = 0.42
const T_FLIP = 5.35, FLIP_GAP = 0.24
const T_L1 = 3.55, T_L2 = 6.0, T_L3 = 7.95
const N = 8, DEALT = 6
const CW = 320, CH = 490
const FACES = ['card-profile-1', 'card-profile-2', 'card-profile-3', 'card-profile-4', 'card-profile-5', 'card-event']
const DECK = { x: 540, y: 1060 }

const riffleAt = i => T_RIF + 0.28 + i * 0.045
const dealAt = k => T_DEAL + k * DEAL_GAP
const flipAt = k => T_FLIP + k * FLIP_GAP + (k === 5 ? 0.18 : 0)

function makeCard(parent, face) {
  const w = el('div', { position: 'absolute', left: 0, top: 0, width: CW + 'px', height: CH + 'px', transformStyle: 'preserve-3d', willChange: 'transform' }, parent)
  const mk = (src, rot) => { const i = el('img', { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', objectFit: 'contain', backfaceVisibility: 'hidden', webkitBackfaceVisibility: 'hidden', transform: `rotateY(${rot}deg)` }, w); i.src = A + src + '.png'; i.decoding = 'sync'; return i }
  mk('card-back', 0)
  if (face) mk(face, 180)
  return {
    w,
    set(x, y, { rz = 0, ry = 0, rx = 0, s = 1, o = 1, z = 0 } = {}) {
      w.style.transform = `translate(${x - CW / 2}px, ${y - CH / 2}px) rotate(${rz}deg) perspective(1500px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`
      w.style.opacity = String(o); w.style.zIndex = String(Math.round(z))
    },
  }
}

export default {
  id: '06-new-deck', title: 'Every night, the stars deal again', duration: DURATION, endTagAt: END,
  music: {
    chords: [
      [0, T_DEAL, [110, 164.81, 220, 246.94, 329.63]],                 // Am(add9)
      [T_DEAL, T_FLIP + 0.4, [87.31, 130.81, 174.61, 220, 329.63]],     // Fmaj7
      [T_FLIP + 0.4, T_L3, [130.81, 196, 261.63, 329.63, 392, 493.88]], // Cmaj7
      [T_L3, END, [98, 146.83, 196, 246.94, 293.66, 440]],              // G6/9
      [END, DURATION, [146.83, 220, 293.66, 369.99, 554.37]],
    ],
    padGain: 0.022, bpm: 104, beatFrom: T_DEAL - 0.02, beatTo: T_L3 + 1.2, pulseGain: 0.16,
  },
  cues: [
    // the moon turns through its phases
    ...Array.from({ length: 7 }, (_, i) => ['tick', 0.12 + i * 0.16, 0.05]),
    ['whoosh', T_DECK + 0.35, 0.6, 0.1], ['boom', T_DECK + 0.5, 0.2],
    ['whoosh', T_CUT1 + 0.18, 0.35, 0.07], ['tick', T_CUT1 + 0.55, 0.1],
    ['whoosh', T_CUT2 + 0.18, 0.35, 0.07], ['tick', T_CUT2 + 0.55, 0.1],
    ['whoosh', T_RIF + 0.15, 0.3, 0.06],
    ...Array.from({ length: N }, (_, i) => ['tick', riffleAt(i) + 0.12, 0.075]),
    ...Array.from({ length: DEALT }, (_, k) => ['whoosh', dealAt(k) + FLY * 0.7, 0.3, 0.05]),
    ...Array.from({ length: DEALT }, (_, k) => ['tick', dealAt(k) + FLY, 0.11]),
    ...Array.from({ length: 5 }, (_, k) => ['tick', flipAt(k) + 0.14, 0.09]),
    ...[523.25, 587.33, 659.25, 783.99, 880].map((f, k) => ['bell', flipAt(k) + 0.14, f, 0.025, 1.4, (k - 2) * 0.2]),
    ['riser', flipAt(4) + 0.1, flipAt(5) + 0.12, 0.06],
    ['tick', flipAt(5) + 0.14, 0.1], ['boom', flipAt(5) + 0.14, 0.24],
    ['bell', flipAt(5) + 0.14, 1046.5, 0.06, 2.6, 0.3], ['glitter', flipAt(5) + 0.14, flipAt(5) + 0.8],
    ['bell', T_L3 + 0.1, 392, 0.05, 2.8, -0.2], ['bell', T_L3 + 0.35, 587.33, 0.04, 2.6, 0.2],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = spaceBackdrop(root, 'teal', { seed: 9 })
    const sky = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root); sky.width = W; sky.height = H
    const sctx = sky.getContext('2d')
    // dusk: a warm horizon that drains away as night falls
    const dusk = fill(root, { background: 'linear-gradient(180deg, rgba(40,30,90,0) 30%, rgba(242,154,74,0.32) 78%, rgba(255,143,177,0.45) 100%)' })
    const dim = fill(root, { background: '#0b0620', opacity: 0 })
    const glow = el('div', { position: 'absolute', left: '40px', top: '500px', width: '1000px', height: '1000px', borderRadius: '50%', mixBlendMode: 'screen',
      background: 'radial-gradient(closest-side, rgba(154,123,224,0.32), rgba(86,196,214,0.10) 55%, rgba(0,0,0,0) 100%)', opacity: 0 }, root)
    const gold = el('div', { position: 'absolute', left: '560px', top: '640px', width: '640px', height: '760px', borderRadius: '50%', mixBlendMode: 'screen',
      background: 'radial-gradient(closest-side, rgba(255,143,177,0.45), rgba(242,199,92,0.12) 55%, rgba(0,0,0,0) 100%)', opacity: 0 }, root)

    const moonC = el('canvas', { position: 'absolute', left: '440px', top: '190px', width: '200px', height: '200px' }, root); moonC.width = moonC.height = 200
    const mctx = moonC.getContext('2d')
    const eb = eyebrow(root, 'Midnight · new deck', { y: 360, size: 28, color: 'rgba(239,230,214,0.82)' })

    const L1 = typeLine(root, 'Six cards a night.', { y: 440, size: 100, perChar: 0.03 })
    const L2 = typeLine(root, 'Five people.\nOne sign from the sky.', { y: 430, size: 96, perChar: 0.026, lh: 1.1 })
    const L3 = typeLine(root, 'Every night,\nthe stars deal again.', { y: 430, size: 100, perChar: 0.03, lh: 1.1 })

    const table = fill(root, { overflow: 'visible' })
    const cards = Array.from({ length: N }, (_, i) => makeCard(table, i >= N - DEALT ? FACES[N - 1 - i] : null))
    // card i (0 = bottom, N-1 = top). The top card deals first → dealt index k = N-1-i.

    // counter: DRAW 1/3 · ● ● ● ● ● ✦
    const counter = el('div', { position: 'absolute', left: '140px', width: '800px', top: '1480px', textAlign: 'center', fontFamily: MONO, fontSize: '32px', letterSpacing: '0.2em', color: 'rgba(239,230,214,0.85)', opacity: 0, whiteSpace: 'nowrap' }, root)
    el('span', {}, counter, 'DRAW 1/3 · ')
    const dots = FACES.map((_, k) => el('span', { display: 'inline-block', marginRight: k < 5 ? '0.45em' : 0, color: 'rgba(239,230,214,0.25)', transition: 'none' }, counter, k < 5 ? '●' : '✦'))

    const tag = endTag(stage, { start: END, end: DURATION })

    // fan geometry
    const PIV = { x: 540, y: 1060 + 1150 }, R = 1150
    const fan = k => { const a = (k - 2.5) * 6.2 * Math.PI / 180; return { x: PIV.x + R * Math.sin(a), y: PIV.y - R * Math.cos(a), rz: a * 180 / Math.PI } }

    return {
      update(t) {
        bg.update(t)
        // night falls
        const nf = ease.inOutCubic(prog(t, 0, 1.7))
        dusk.style.opacity = String(1 - nf)
        dim.style.opacity = String(0.25 * (1 - nf))
        glow.style.opacity = String(prog(t, 0.6, 2.0) * (0.8 + 0.2 * Math.sin(t * 1.4)))
        const gk = prog(t, flipAt(5), flipAt(5) + 0.5)
        gold.style.opacity = String(gk * (0.85 + 0.15 * Math.sin(t * 2)) * (1 - prog(t, END - 0.3, END)))

        // moon glyph turning: stepped phases from new to a waxing gibbous, a full turn of the disc
        mctx.clearRect(0, 0, 200, 200)
        const steps = Math.min(6, Math.floor(prog(t, 0.12, 1.25) * 7))
        const ph = 0.02 + steps * 0.06 + 0.04 * prog(t, T_L3, T_L3 + 0.8)
        const mp = 0.35 + 0.65 * ease.outQuad(prog(t, 0, 0.3))
        mctx.save(); mctx.translate(100, 100); mctx.rotate(-0.5 * (1 - ease.outCubic(prog(t, 0, 1.4))) * Math.PI)
        drawMoonGlyph(mctx, 0, 0, 40, ph, { alpha: mp, glow: prog(t, 0.6, 1.6), lw: 2.4 })
        mctx.restore()
        eb.style.opacity = String(ease.outQuad(prog(t, 0.05, 0.45)) * (1 - prog(t, T_L1 - 0.3, T_L1)) * 1)

        L1.update(t - T_L1, T_L2 - 0.35 - T_L1)
        L2.update(t - T_L2, T_L3 - 0.35 - T_L2)
        L3.update(t - T_L3)

        // cards
        const drop = ease.spring(prog(t, T_DECK, T_DECK + 0.95), 0.1)
        const dropO = ease.outQuad(prog(t, T_DECK, T_DECK + 0.25))
        for (let i = 0; i < N; i++) {
          const c = cards[i]
          let x = DECK.x + i * 0.4, y = DECK.y - i * 2.2 - (1 - drop) * 700, rz = (i - 4) * 0.25 * (1 - drop) * 4, ry = 0, s = 1, z = i, rx = lerp(30, 0, drop)
          // overhand cuts: the top half slides out and tucks under
          for (const [t0, dir] of [[T_CUT1, 1], [T_CUT2, -1]]) {
            if (i >= 4) {
              const p = prog(t, t0, t0 + 0.6)
              const out = Math.sin(Math.PI * ease.inOutQuad(p))
              x += dir * 300 * out; y += 26 * out - 14 * Math.sin(Math.PI * 2 * p) * 0; rz += dir * 9 * out
              if (p > 0.5 && p < 1) z = i - 20
            }
          }
          // riffle: split into two piles, fall back in alternately
          const sp = ease.outCubic(prog(t, T_RIF, T_RIF + 0.25))
          const back = ease.inOutQuad(prog(t, riffleAt(i), riffleAt(i) + 0.14))
          const side = i % 2 ? 1 : -1
          x += side * 230 * sp * (1 - back); y += (40 - (i >> 1) * 3) * sp * (1 - back); rz += side * 7 * sp * (1 - back)
          // deal (top card first)
          const k = N - 1 - i
          if (k < DEALT) {
            const p = prog(t, dealAt(k), dealAt(k) + FLY), pe = ease.outCubic(p)
            const f = fan(k)
            const land = ease.spring(prog(t, dealAt(k) + FLY * 0.75, dealAt(k) + FLY + 0.55), 0.18)
            if (p > 0) {
              x = lerp(x, f.x, pe); y = lerp(y, f.y, pe) - 150 * Math.sin(Math.PI * p)
              rz = lerp(rz, f.rz, land) + (1 - land) * (k - 2.5) * 6 * Math.min(1, p * 2)
              s = 1 + 0.08 * Math.sin(Math.PI * p)
              z = 100 + k
            }
            // flip
            const fp = prog(t, flipAt(k), flipAt(k) + 0.42)
            ry = 180 * ease.inOutCubic(fp)
            s *= 1 + 0.06 * Math.sin(Math.PI * fp) + (k === 5 ? 0.05 * ease.outCubic(prog(t, flipAt(5) + 0.2, flipAt(5) + 0.7)) : 0)
            y -= (k === 5 ? 18 * ease.outCubic(prog(t, flipAt(5) + 0.2, flipAt(5) + 0.7)) : 0)
            rx = lerp(rx, 0, prog(t, dealAt(k), dealAt(k) + 0.2)) - 10 * Math.sin(Math.PI * fp)
            // the whole spread breathes after it's dealt
            const br = prog(t, T_FLIP + 1.8, T_FLIP + 2.6)
            y += br * Math.sin(t * 1.3 + k * 0.6) * 6
            c.set(x, y, { rz, ry, s, z, rx })
          } else {
            // the undealt remainder sinks away after the deal
            const g = ease.inCubic(prog(t, dealAt(DEALT - 1) + 0.15, dealAt(DEALT - 1) + 0.75))
            c.set(x, y + g * 260, { rz, ry, s: s * (1 - 0.15 * g), z, rx, o: dropO * (1 - g) })
            continue
          }
          if (t < T_DECK) c.w.style.opacity = '0'
          else c.w.style.opacity = String(dropO)
        }

        counter.style.opacity = String(ease.outQuad(prog(t, T_FLIP - 0.3, T_FLIP + 0.1)))
        dots.forEach((d, k) => {
          const on = prog(t, flipAt(k) + 0.14, flipAt(k) + 0.3)
          d.style.color = on > 0 ? (k === 5 ? `rgba(242,199,92,${0.25 + 0.75 * on})` : `rgba(255,143,177,${0.25 + 0.75 * on})`) : 'rgba(239,230,214,0.25)'
          d.style.textShadow = on > 0 ? `0 0 ${14 * on}px ${k === 5 ? 'rgba(242,199,92,0.9)' : 'rgba(255,143,177,0.8)'}` : 'none'
        })
      },
      fx(ctx, t) {
        if (t >= END + 0.25) return
        const a = 1 - prog(t, END - 0.2, END + 0.2)
        sctx.clearRect(0, 0, W, H)
        starField(sctx, t, { seed: 12, sprites: 22, dots: 70, alpha: a * lerp(0.15, 1, prog(t, 0.2, 1.8)), keepOut: [[90, 420, 900, 230], [440, 190, 200, 200]] })
        // the sign from the sky: a burst over the event card as it turns
        const f = fan(5), lt = t - flipAt(5) - 0.16
        if (lt > 0 && lt < 1.3) {
          const r = rng(61)
          for (let i = 0; i < 26; i++) {
            const ang = r() * Math.PI * 2, d = ease.outCubic(clamp(lt / 1.2)) * (180 + r() * 260), life = 1 - clamp(lt / (0.6 + r() * 0.7))
            if (life <= 0) continue
            ctx.globalAlpha = life * a
            pixelStar(ctx, f.x + Math.cos(ang) * d, f.y - 20 + Math.sin(ang) * d, r() < 0.3 ? 4 : 3, life > 0.6 ? 1 : 2, r() < 0.5 ? GOLD : r() < 0.5 ? ROSE : BONE)
          }
          ctx.globalAlpha = 1
        }
        // small glints as each card lands
        for (let k = 0; k < DEALT; k++) {
          const lt2 = t - dealAt(k) - FLY
          if (lt2 < 0 || lt2 > 0.35) continue
          const p = fan(k)
          ctx.globalAlpha = (1 - lt2 / 0.35) * a
          pixelStar(ctx, p.x + 115, p.y - 225, 4, 0, GOLD)
          ctx.globalAlpha = 1
        }
      },
    }
  },
}
