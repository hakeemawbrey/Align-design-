// L04 · Deck — an endless 3D carousel of veiled mystery cards. Eight cards ride a tilted ring; the ring
// snaps forward exactly one card (45°) every two beats, so after 16 beats it has turned one full revolution
// and the loop is seamless. The front card's aura breathes on every kick; a gold glint sweeps it on each bar.
import { W, H, A, el, fill, clamp, lerp, ease, rng, SERIF, MONO, BONE, GOLD, HOT,
  LOOP, BPM, BEAT, ph, osc, cyc, kick, hat, bar, LOOP_CHORDS, loopBackdrop, loopStars, pixelStar } from './loopkit.js'

const N = 8
const CW = 410, CH = Math.round(410 * 2238 / 1496)     // card box (PNG includes its own glow rim)
const R = 560, P = 1800, TILT = 0.62                     // ring radius, camera distance, ring tilt
const CX = 540, CY = 720
const DECK = [
  ['card-profile-1', [255, 92, 170]],
  ['card-talk-1', [214, 170, 255]],
  ['card-profile-2', [255, 150, 60]],
  ['card-event', [255, 90, 130]],
  ['card-profile-3', [170, 120, 255]],
  ['card-talk-daily', [140, 230, 120]],
  ['card-profile-4', [90, 200, 255]],
  ['card-profile-5', [255, 120, 200]],
]
/** ring rotation (radians): one card step per 2 beats, eased with a little overshoot, 8 steps = one turn per loop */
function ringRot(t) {
  const tt = ph(t) * LOOP, b = tt / BEAT
  const step = Math.floor(b / 2), fr = b / 2 - step
  const p = clamp(fr / 0.62)
  const e = p >= 1 ? 1 : ease.outBack(p) * 0.9 + ease.outCubic(p) * 0.1
  return (step + e) * 2 * Math.PI / N
}
function proj(ang) {
  const x = R * Math.sin(ang), z = R * Math.cos(ang)
  const s = P / (P - z)
  return { x: CX + x * s, y: CY + z * TILT * s, z, s }
}

export default {
  id: 'L04-deck', title: 'Deck (loop)', duration: LOOP, loop: true,
  music: { chords: LOOP_CHORDS.map((c, i) => [i * 2, i * 2 + 2, c]), bpm: BPM, pulseGain: 0.2, hatGain: 0.04, padGain: 0.024 },
  cues: [
    // a soft card "whoosh" as the ring moves, a tick as each card lands front
    ...Array.from({ length: 8 }, (_, i) => ['whoosh', i * 1 + 0.02, 0.32, 0.045]),
    ...Array.from({ length: 8 }, (_, i) => ['tick', i * 1 + 0.3, 0.06]),
    // a gold shimmer bell with each bar's glint
    ...[0, 1, 2, 3].map(i => ['bell', i * 2 + 0.12, [880, 739.99, 783.99, 659.25][i], 0.022, 1.4, (i - 1.5) * 0.25]),
    ['glitter', 0.1, 0.9], ['glitter', 4.1, 4.9],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = loopBackdrop(root, 'rose', { seed: 4, grain: 0.18 })
    // under-layer canvas: stars, aura, orbit ring (drawn behind the cards)
    const uc = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    uc.width = W; uc.height = H
    const u = uc.getContext('2d')
    const ring = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    const cards = DECK.map(([face, col]) => {
      const w = el('div', { position: 'absolute', left: 0, top: 0, width: CW + 'px', height: CH + 'px', willChange: 'transform, filter' }, ring)
      const mk = (src) => { const i = el('img', { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', objectFit: 'contain' }, w); i.src = A + src + '.png'; i.decoding = 'sync'; return i }
      const back = mk('card-back'), front = mk(face)
      const glint = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen', pointerEvents: 'none',
        WebkitMaskImage: `url(${A}${face}.png)`, maskImage: `url(${A}${face}.png)`, WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center',
        background: 'linear-gradient(112deg, rgba(255,214,140,0) 38%, rgba(255,226,160,0.20) 45%, rgba(255,244,214,0.75) 50%, rgba(255,226,160,0.20) 55%, rgba(255,214,140,0) 62%)',
        backgroundSize: '320% 100%', backgroundRepeat: 'no-repeat' }, w)
      return { w, back, front, glint, col }
    })
    const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1706px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '72px', color: BONE, textShadow: '0 0 30px rgba(239,230,214,0.25)' }, root, 'Align')
    const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1806px', textAlign: 'center', fontFamily: MONO, fontSize: '20px', letterSpacing: '0.34em', color: BONE, opacity: 0.7 }, root, 'A NEW DECK EVERY NIGHT')
    void sub

    function drawUnder(t) {
      u.clearRect(0, 0, W, H)
      loopStars(u, t, { seed: 9, sprites: 30, dots: 110, keepOut: [[100, 300, 880, 1200]] })
      const rot = ringRot(t), k = kick(t), b = bar(t)
      // orbit ellipse (the ring's track) + gold dust riding it, 2 laps per loop
      const ry = R * TILT * (P / P), rx = R * 1.06
      u.save(); u.globalCompositeOperation = 'screen'
      for (let pass = 0; pass < 2; pass++) {
        u.strokeStyle = pass ? 'rgba(255,220,160,0.5)' : 'rgba(242,199,92,0.10)'
        u.lineWidth = pass ? 1.5 : 10
        u.beginPath(); u.ellipse(CX, CY + 10, rx * 1.12, ry * 1.12 + 30, 0, 0, Math.PI * 2); u.stroke()
      }
      const r = rng(77)
      for (let i = 0; i < 70; i++) {
        const a0 = r() * Math.PI * 2, n = 1 + Math.floor(r() * 2), sz = 1 + r() * 2.4, off = r()
        const a = a0 + 2 * Math.PI * n * ph(t)
        const z = Math.cos(a)
        const x = CX + Math.sin(a) * rx * 1.12 * (1 + 0.04 * (r() - 0.5)), y = CY + 10 + z * (ry * 1.12 + 30)
        u.globalAlpha = (0.25 + 0.6 * (0.5 + 0.5 * osc(t, 4, off))) * (0.45 + 0.55 * (z + 1) / 2)
        u.fillStyle = r() < 0.6 ? GOLD : HOT
        u.beginPath(); u.arc(x, y, sz, 0, Math.PI * 2); u.fill()
      }
      u.restore()
      // aura behind the front cards: colour of whichever card faces us, pulsing on the kick
      cards.forEach((c, i) => {
        const ang = 2 * Math.PI * i / N - rot
        const f = Math.max(0, Math.cos(ang)) ** 6
        if (f < 0.01) return
        const p = proj(ang)
        const [cr, cg, cb] = c.col
        const rad = (430 + 90 * k + 40 * b) * p.s
        const g = u.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad)
        const a = f * (0.42 + 0.38 * k)
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`); g.addColorStop(0.45, `rgba(${cr},${cg},${cb},${a * 0.45})`); g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
        u.save(); u.globalCompositeOperation = 'screen'; u.fillStyle = g
        u.beginPath(); u.ellipse(p.x, p.y, rad * 0.95, rad * 1.18, 0, 0, Math.PI * 2); u.fill(); u.restore()
        // kick ring: a thin halo expanding from the front card
        const kp = ((ph(t) * 16) % 1)
        u.save(); u.globalCompositeOperation = 'screen'
        u.strokeStyle = `rgba(${cr},${cg},${cb},${f * (1 - kp) * 0.5})`; u.lineWidth = 3
        u.beginPath(); u.ellipse(p.x, p.y, (CW * 0.62 + kp * 260) * p.s, (CH * 0.6 + kp * 260) * p.s, 0, 0, Math.PI * 2); u.stroke(); u.restore()
      })
    }

    return {
      update(t) {
        bg.update(t)
        drawUnder(t)
        const rot = ringRot(t), k = kick(t)
        const gl = cyc(t, 4)                                     // glint sweep: once per bar, over its first 0.7s
        const gp = clamp(gl * 8 / 2.8)
        const gpos = lerp(105, -5, ease.inOutCubic(gp))
        cards.forEach((c, i) => {
          const ang = 2 * Math.PI * i / N - rot
          const p = proj(ang)
          const facing = Math.cos(ang) >= 0
          const f = Math.max(0, Math.cos(ang))
          const front = f ** 8
          const deg = (ang * 180 / Math.PI) % 360
          const s = p.s * (1 + 0.035 * k * front)
          c.front.style.display = facing ? 'block' : 'none'
          c.back.style.display = facing ? 'none' : 'block'
          c.glint.style.display = facing ? 'block' : 'none'
          c.w.style.transform = `translate(${p.x - CW / 2}px, ${p.y - CH / 2}px) scale(${s}) perspective(1100px) rotateY(${facing ? deg : deg + 180}deg)`
          c.w.style.zIndex = String(Math.round(p.z + R + 10))
          const depth = (p.z + R) / (2 * R)                     // 0 back .. 1 front
          const blur = Math.max(0, (0.5 - depth)) * 4
          c.w.style.filter = `brightness(${(0.62 + 0.38 * depth ** 1.4 + 0.12 * k * front).toFixed(3)}) saturate(${(0.7 + 0.3 * depth).toFixed(3)}) blur(${blur.toFixed(2)}px)`
          c.glint.style.backgroundPosition = `${gpos}% 0`
          c.glint.style.opacity = String(front * (gp > 0 && gp < 1 ? 1 : 0))
        })
        word.style.opacity = String(0.82 + 0.18 * bar(t))
      },
      fx(ctx, t) {
        // gold glints: a few pixel stars flare on the front card's corners on each bar downbeat
        const b = bar(t, 3.2), h = hat(t)
        const fp = proj(0)
        const pts = [[-0.42, -0.45], [0.43, -0.4], [-0.4, 0.44], [0.44, 0.46]]
        pts.forEach(([dx, dy], j) => {
          const x = fp.x + dx * CW * fp.s, y = fp.y + dy * CH * fp.s
          const tw = clamp(b * (j % 2 ? 0.9 : 1) + 0.25 * h)
          const kind = tw > 0.75 ? 0 : tw > 0.45 ? 1 : tw > 0.2 ? 2 : -1
          if (kind < 0) return
          ctx.globalAlpha = 0.5 + 0.5 * tw
          pixelStar(ctx, x, y, 4, kind, GOLD)
        })
        ctx.globalAlpha = 1
      },
    }
  },
}
