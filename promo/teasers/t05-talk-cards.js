// 05-talk-cards — "Talk in cards." A gilded tarot hand fans open in 3D, one card plays to the centre,
// its question becomes the headline, two answers arrive sealed and unseal together.
import { W, H, A, el, fill, prog, ease, lerp, clamp, rng, tw, spaceBackdrop, typeLine, eyebrow, starField, pixelStar, endTag, BONE, GOLD, HOT, SERIF, MONO } from './kit.js'

const DURATION = 12.8
const END = 10.4 // end tag

// timeline (s)
const T_FAN = 0.0      // hand rises + fans open
const T_LIFT = 2.35     // The Fool lifts out of the hand
const T_PLAY = 2.95     // plays to the centre
const T_LAND = 3.75
const T_UP = 4.55       // card glides up, question becomes the headline
const T_Q = 4.75
const T_SHRINK = 6.0    // question settles as a header
const T_B1 = 6.15, T_B2 = 6.6  // sealed answers arrive
const T_L1 = 6.75, T_L2 = 7.35 // "Both answer." / "Neither sees until you both do."
const T_OPEN = 8.15     // both unseal

const HAND = ['card-talk-5', 'card-talk-2', 'card-talk-4', 'card-talk-1', 'card-talk-6', 'card-talk-3', 'card-talk-daily']
const PLAYED = 3
const CW = 370, CH = Math.round(CW * 1170 / 732)

function sparkleCanvas(px = 5, col = GOLD) {
  const c = document.createElement('canvas'); c.width = c.height = px * 7
  pixelStar(c.getContext('2d'), px * 3.5, px * 3.5, px, 0, col, HOT)
  return c
}

function makeCard(parent, name) {
  const wrap = el('div', { position: 'absolute', left: 0, top: 0, width: CW + 'px', height: CH + 'px', transformStyle: 'preserve-3d', willChange: 'transform' }, parent)
  const im = el('img', { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'block' }, wrap); im.src = A + name + '.png'; im.decoding = 'sync'
  const mask = `url(${A}${name}.png)`
  const sheen = el('div', { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', mixBlendMode: 'screen', opacity: 0,
    background: 'linear-gradient(112deg, rgba(255,230,160,0) 44%, rgba(255,226,150,0.35) 48.5%, rgba(255,250,230,0.75) 50%, rgba(255,226,150,0.35) 51.5%, rgba(255,230,160,0) 56%)',
    backgroundSize: '320% 100%', webkitMaskImage: mask, maskImage: mask, webkitMaskSize: '100% 100%', maskSize: '100% 100%' }, wrap)
  const sp = sparkleCanvas(5)
  Object.assign(sp.style, { position: 'absolute', left: (CW * 0.80 - 17) + 'px', top: (CH * 0.08 - 17) + 'px', opacity: 0 })
  wrap.appendChild(sp)
  const sp2 = sparkleCanvas(4)
  Object.assign(sp2.style, { position: 'absolute', left: (CW * 0.16 - 14) + 'px', top: (CH * 0.90 - 14) + 'px', opacity: 0 })
  wrap.appendChild(sp2)
  return {
    wrap,
    set(x, y, { z = 0, rz = 0, rx = 0, ry = 0, s = 1, o = 1 } = {}) {
      wrap.style.transform = `translate3d(${x - CW / 2}px, ${y - CH / 2}px, ${z}px) rotateZ(${rz}deg) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`
      wrap.style.opacity = String(o)
    },
    glint(p, a = 1) { // p: 0..1 sweep progress
      const on = p > 0 && p < 1
      sheen.style.opacity = on ? String(a * Math.sin(Math.PI * p)) : '0'
      sheen.style.backgroundPosition = `${lerp(110, -10, p)}% 0`
      const k1 = Math.sin(Math.PI * clamp((p - 0.15) / 0.45)), k2 = Math.sin(Math.PI * clamp((p - 0.5) / 0.45))
      sp.style.opacity = String(a * k1); sp.style.transform = `scale(${0.4 + k1 * 0.9}) rotate(${p * 90}deg)`
      sp2.style.opacity = String(a * k2); sp2.style.transform = `scale(${0.4 + k2 * 0.8}) rotate(${-p * 90}deg)`
    },
  }
}

function bubble(parent, { who, text, x, y, w, side }) {
  const b = el('div', { position: 'absolute', left: x + 'px', top: y + 'px', width: w + 'px', height: '160px', borderRadius: side === 'left' ? '30px 30px 30px 10px' : '30px 30px 10px 30px',
    background: 'linear-gradient(170deg, #2a1660, #170c38)', border: '2px solid rgba(242,213,138,0.7)', boxShadow: '0 0 36px rgba(180,92,255,0.25), 0 18px 40px rgba(5,2,18,0.5)', opacity: 0, overflow: 'hidden', boxSizing: 'border-box', padding: '22px 30px' }, parent)
  const lab = el('div', { fontFamily: MONO, fontSize: '22px', letterSpacing: '0.22em', color: 'rgba(242,213,138,0.9)', textTransform: 'uppercase' }, b, who)
  const ans = el('div', { marginTop: '8px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '46px', lineHeight: 1.15, color: BONE, whiteSpace: 'nowrap' }, b, text)
  const veil = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(60% 90% at 50% 50%, rgba(180,92,255,0.35), rgba(42,20,98,0) 75%)' }, b)
  const seal = el('div', { position: 'absolute', left: (w / 2 - 38) + 'px', top: '42px', width: '76px', height: '76px', borderRadius: '50%', display: 'grid', placeItems: 'center',
    background: 'radial-gradient(circle at 35% 30%, #ffe2a8, #e0a04a 45%, #8a3a2a 100%)', boxShadow: '0 0 24px rgba(242,199,92,0.7), inset 0 -4px 10px rgba(60,10,10,0.5)',
    fontSize: '38px', color: '#3a1410' }, b, '✦')
  const sl = el('div', { position: 'absolute', right: '26px', top: '24px', fontFamily: MONO, fontSize: '20px', letterSpacing: '0.2em', color: 'rgba(242,213,138,0.75)' }, b, 'SEALED')
  return {
    update(t, tin, topen) {
      const pin = ease.outCubic(prog(t, tin, tin + 0.45))
      const dy = (1 - ease.spring(prog(t, tin, tin + 0.9), 0.14)) * 40
      b.style.opacity = String(pin)
      const u = ease.outCubic(prog(t, topen, topen + 0.55))
      b.style.transform = `translateY(${dy}px) scale(${lerp(0.94, 1, pin) + 0.04 * Math.sin(Math.PI * prog(t, topen, topen + 0.5))})`
      ans.style.filter = `blur(${lerp(15, 0, u)}px)`
      ans.style.opacity = String(lerp(0.55, 1, u))
      veil.style.opacity = String(1 - u)
      const sp = prog(t, topen - 0.05, topen + 0.35)
      seal.style.opacity = String(1 - ease.inQuad(sp))
      seal.style.transform = `scale(${1 + 0.6 * ease.outCubic(sp) - 0.08 * Math.sin(Math.PI * prog(t, topen - 0.3, topen))}) rotate(${sp * 40}deg)`
      sl.style.opacity = String(1 - prog(t, topen, topen + 0.2))
      b.style.borderColor = `rgba(242,213,138,${lerp(0.55, 1, Math.sin(Math.PI * prog(t, topen, topen + 0.8)))})`
    },
  }
}

export default {
  id: '05-talk-cards', title: 'Talk in cards', duration: DURATION, endTagAt: END,
  music: {
    chords: [
      [0, T_PLAY, [146.83, 220, 293.66, 369.99, 440]],              // Dmaj9-ish
      [T_PLAY, T_SHRINK, [123.47, 185, 246.94, 293.66, 369.99]],    // Bm7
      [T_SHRINK, T_OPEN, [98, 146.83, 196, 246.94, 369.99]],        // Gmaj7
      [T_OPEN, END, [110, 164.81, 220, 277.18, 329.63, 493.88]],    // A6/9 lift
      [END, DURATION, [146.83, 220, 293.66, 369.99, 554.37]],
    ],
    padGain: 0.024,
  },
  cues: [
    ['whoosh', T_FAN + 0.35, 0.6, 0.09],
    ...HAND.map((_, i) => ['tick', T_FAN + 0.42 + Math.abs(i - PLAYED) * 0.07, 0.07]),
    ['glitter', 1.25, 2.1],
    ['tick', T_LIFT + 0.05, 0.09],
    ['whoosh', T_PLAY + 0.35, 0.6, 0.13],
    ['boom', T_LAND - 0.02, 0.22],
    ['bell', T_LAND, 587.33, 0.06, 2.4, 0],
    ['glitter', T_LAND + 0.05, T_LAND + 0.5],
    ['whoosh', T_UP + 0.3, 0.5, 0.06],
    ['bell', T_Q + 0.1, 880, 0.035, 1.6, -0.2],
    ['tick', T_B1 + 0.05, 0.08], ['bell', T_B1 + 0.05, 440, 0.04, 1.2, -0.4],
    ['tick', T_B2 + 0.05, 0.08], ['bell', T_B2 + 0.05, 493.88, 0.04, 1.2, 0.4],
    ['riser', T_L2, T_OPEN, 0.07],
    ['boom', T_OPEN, 0.26],
    ['bell', T_OPEN, 659.25, 0.07, 2.6, -0.3], ['bell', T_OPEN + 0.05, 830.61, 0.06, 2.6, 0.3], ['bell', T_OPEN + 0.1, 1108.73, 0.04, 2.4, 0],
    ['glitter', T_OPEN, T_OPEN + 0.7],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = spaceBackdrop(root, 'rose', { seed: 5 })
    const sky = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root); sky.width = W; sky.height = H
    const sctx = sky.getContext('2d')
    // warm glow under the hand / behind the played card
    const glow = el('div', { position: 'absolute', left: '40px', top: '400px', width: '1000px', height: '1000px', borderRadius: '50%', mixBlendMode: 'screen',
      background: 'radial-gradient(closest-side, rgba(242,199,92,0.22), rgba(180,92,255,0.12) 50%, rgba(0,0,0,0) 100%)', opacity: 0 }, root)

    const eb = eyebrow(root, 'Align · talk cards', { y: 262, size: 28, color: 'rgba(242,213,138,0.9)' })
    const title = typeLine(root, 'Talk in cards.', { y: 310, size: 110, perChar: 0.035 })

    const scene = fill(root, { perspective: '1600px', perspectiveOrigin: '540px 900px', overflow: 'visible' })
    const space = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformStyle: 'preserve-3d' }, scene)
    const cards = HAND.map(n => makeCard(space, n))
    // the played card above the rest
    cards[PLAYED].wrap.style.zIndex = '5'

    const q = typeLine(root, 'What’s a hill\nyou will die on?', { y: 790, size: 104, perChar: 0.028, fade: 0.35 })
    const bJ = bubble(root, { who: 'Juniper', text: 'Pineapple belongs on pizza.', x: 90, y: 790, w: 660, side: 'left' })
    const bY = bubble(root, { who: 'You', text: 'Endings matter more.', x: 330, y: 978, w: 660, side: 'right' })
    const l1 = typeLine(root, 'Both answer.', { y: 1220, size: 88, perChar: 0.03 })
    const l2 = typeLine(root, 'Neither sees\nuntil you both do.', { y: 1325, size: 88, perChar: 0.026, lh: 1.08, maxW: 860 })

    const tag = endTag(stage, { start: END, end: DURATION, line: 'ONE CARD.\nTWO ANSWERS.' })

    // fan geometry
    const PIV = { x: 540, y: 1220 + 950 }, R = 950
    const fanPose = (i, t) => {
      const open = ease.spring(prog(t, T_FAN + 0.25, T_FAN + 1.35), 0.12)
      const rise = ease.outCubic(prog(t, T_FAN, T_FAN + 0.8))
      const sway = Math.sin(t * 1.1) * 0.8
      const a = ((i - PLAYED) * 7.2 * open + sway) * Math.PI / 180
      return {
        x: PIV.x + R * Math.sin(a), y: PIV.y - R * Math.cos(a) + (1 - rise) * 900 + Math.abs(i - PLAYED) * 8 * open,
        z: -Math.abs(i - PLAYED) * 6, rz: a * 180 / Math.PI, rx: lerp(28, 14, rise), ry: (i - PLAYED) * -3 * open, s: 1,
      }
    }

    return {
      update(t) {
        bg.update(t)
        const pre = t < END
        // title beat
        eb.style.opacity = String(ease.outQuad(prog(t, 0.0, 0.35)) * (1 - prog(t, T_PLAY, T_PLAY + 0.35)))
        title.update(t - 0.05, T_PLAY - 0.05)
        glow.style.opacity = String(0.6 * prog(t, 0.3, 1.2) + 0.5 * Math.sin(Math.PI * prog(t, T_LAND - 0.3, T_UP + 0.6)) - 0.4 * prog(t, T_UP, T_UP + 0.8))

        // hand
        cards.forEach((c, i) => {
          const p = fanPose(i, t)
          if (i !== PLAYED) {
            const drop = ease.inCubic(prog(t, T_PLAY + 0.05 + Math.abs(i - PLAYED) * 0.04, T_PLAY + 0.6 + Math.abs(i - PLAYED) * 0.04))
            c.set(p.x + (i - PLAYED) * 40 * drop, p.y + drop * 1300, { z: p.z, rz: p.rz * (1 + drop), rx: p.rx + drop * 20, ry: p.ry, o: 1 - ease.inQuad(drop) })
            c.glint(prog(t, 1.15 + Math.abs(i - PLAYED) * 0.16 + (i < PLAYED ? 0.05 : 0), 1.85 + Math.abs(i - PLAYED) * 0.16), 0.9)
          } else {
            const lift = ease.outBack(prog(t, T_LIFT, T_LIFT + 0.45))
            const play = ease.inOutCubic(prog(t, T_PLAY, T_LAND))
            const settle = ease.spring(prog(t, T_PLAY + 0.5, T_LAND + 0.7), 0.16)
            const up = ease.inOutCubic(prog(t, T_UP, T_UP + 0.8))
            // fan → centre → top
            const cx = lerp(p.x, 540, play), cy0 = lerp(p.y - 70 * lift, 880, play)
            const cy = lerp(cy0, 392, up)
            const s = lerp(lerp(1, 1.5, settle), 0.62, up)
            const ry = lerp(0, -18, Math.sin(Math.PI * play)) + 4 * Math.sin(t * 1.3) * (1 - up) * prog(t, T_LAND, T_LAND + 0.5)
            const rx = lerp(p.rx * (1 - lift * 0.5), 0, play) + 3 * Math.cos(t * 1.1) * prog(t, T_LAND, T_LAND + 0.5)
            const z = lerp(p.z, 120, Math.sin(Math.PI * play))
            c.set(cx, cy, { z: z + 10, rz: lerp(p.rz, 0, play) + lerp(0, -6, Math.sin(Math.PI * play)), rx, ry, s })
            c.glint(Math.max(prog(t, 1.1, 1.8), prog(t, T_LAND - 0.1, T_LAND + 0.8) * (t > T_LAND - 0.1 ? 1 : 0), t > T_OPEN - 0.2 ? prog(t, T_OPEN - 0.1, T_OPEN + 0.7) : 0), 1)
          }
        })

        // question becomes the headline, then settles to a header under the card
        const sh = ease.inOutCubic(prog(t, T_SHRINK, T_SHRINK + 0.6))
        q.update(t - T_Q)
        q.root.style.transformOrigin = '540px 0px'
        q.root.style.transform = `translateY(${lerp(0, -168, sh)}px) scale(${lerp(1, 0.6, sh)})`
        q.root.style.opacity = String(pre ? 1 : 0)

        bJ.update(t, T_B1, T_OPEN)
        bY.update(t, T_B2, T_OPEN + 0.06)
        l1.update(t - T_L1)
        l2.update(t - T_L2)
      },
      fx(ctx, t) {
        if (t >= END + 0.25) return
        const a = 1 - prog(t, END - 0.2, END + 0.2)
        // background stars into the sky canvas (under the cards)
        sctx.clearRect(0, 0, W, H)
        starField(sctx, t, { seed: 7, sprites: 20, dots: 60, alpha: 0.9 * a, keepOut: [[90, 250, 900, 180]] })
        // burst when the card lands, and when the answers unseal
        const burst = (cx, cy, t0, n, spread, seed) => {
          const lt = t - t0
          if (lt < 0 || lt > 1.2) return
          const r = rng(seed)
          for (let i = 0; i < n; i++) {
            const ang = r() * Math.PI * 2, sp = spread * (0.4 + r() * 0.6), d = ease.outCubic(clamp(lt / 1.1)) * sp
            const life = 1 - clamp(lt / (0.6 + r() * 0.6))
            if (life <= 0) continue
            const f = Math.round(t * 30)
            ctx.globalAlpha = life * a
            pixelStar(ctx, cx + Math.cos(ang) * d, cy + Math.sin(ang) * d * 0.8, r() < 0.3 ? 4 : 3, life > 0.6 ? ((f + i) % 3 ? 1 : 0) : 2, r() < 0.6 ? GOLD : BONE)
          }
          ctx.globalAlpha = 1
        }
        burst(540, 880, T_LAND - 0.05, 22, 520, 11)
        burst(420, 870, T_OPEN, 14, 360, 21)
        burst(660, 1058, T_OPEN + 0.06, 14, 360, 22)
      },
    }
  },
}
