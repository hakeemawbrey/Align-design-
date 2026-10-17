// L06 · Constellation — a living network of people. 14 aura-portrait stars on a tilted 3D shell turn one full
// revolution per loop; constellation lines draw quadrant-by-quadrant on the beats of every bar (each line lands on
// its beat, the node it reaches flares), hold, then undraw — a wave travelling round the network four times a loop.
// Loop rules: rotation = 2π·ph(t) (one whole turn), line wave = cyc(t, 4) (one sweep per bar), flares = kick/bar.
import { W, H, el, fill, clamp, lerp, rng, ease, SERIF, MONO, BONE, GOLD, VIOLET, ROSE, IMG, PEOPLE, pixelStar,
  LOOP, BPM, BEAT, ph, osc, cyc, kick, hat, bar, LOOP_CHORDS, loopBackdrop, loopStars } from './loopkit.js'

const CX = W / 2, CY = 830, F = 1700
const TILT = 0.30, ROLL = -0.10        // look down on the shell a little, slight roll for life
// portrait sources + cover crops [cx, cy, size as fraction of the short side]
const SRC = [...PEOPLE.map(s => [s, 0.5, 0.44, 0.8]), [IMG + 'juniper.jpg', 0.48, 0.6, 0.6], [IMG + 'hakeem.jpg', 0.5, 0.44, 0.74]]
// each person's ring colour (aura palette)
const RING = ['#e8628a', '#f2c75c', '#c9a6ff', '#7fd8b0', '#ff8fb1', '#f29a4a', '#9a7be0', '#2fd0e6', '#ffd23f', '#b45cff', '#5fdc54', '#ff7a2e', '#f2c75c', '#e8628a']
const N = 14
// nodes on a tall spheroid (fibonacci lattice), jittered deterministically
const r0 = rng(606)
const NODES = Array.from({ length: N }, (_, i) => {
  const y = 1 - (2 * (i + 0.5)) / N
  const a = i * 2.39996 + 0.4
  const rad = 400 * (0.5 + 0.5 * Math.sqrt(1 - y * y)) * (0.92 + r0() * 0.16)
  return { x: Math.cos(a) * rad, y: y * 560 + (r0() - 0.5) * 50, z: Math.sin(a) * rad, src: i, ring: RING[i], d: 132 + r0() * 30, az: ((a / (2 * Math.PI)) % 1 + 1) % 1 }
})
// beat group (0..3) by azimuth quadrant → the beat of each bar on which that node flares
NODES.forEach(n => { n.g = Math.floor(n.az * 4) % 4; n.sub = (n.az * 4) % 1 })
// edges: 3 nearest neighbours each (deduped); oriented so they arrive at the later-in-azimuth node
const EDGES = []
NODES.forEach((a, i) => {
  NODES.map((b, j) => [j, (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2]).filter(([j]) => j !== i).sort((p, q) => p[1] - q[1]).slice(0, 3)
    .forEach(([j]) => { if (!EDGES.some(e => (e.a === i && e.b === j) || (e.a === j && e.b === i))) EDGES.push({ a: i, b: j }) })
})
EDGES.forEach(e => {
  const A = NODES[e.a], B = NODES[e.b]
  const dAz = ((B.az - A.az) % 1 + 1) % 1
  if (dAz > 0.5) { const t = e.a; e.a = e.b; e.b = t }        // draw toward increasing azimuth
  e.g = NODES[e.b].g; e.sub = NODES[e.b].sub
})
// star dust on an outer shell, turning with the network
const rd = rng(8080)
const DUST = Array.from({ length: 260 }, () => {
  const u = rd() * 2 - 1, a = rd() * Math.PI * 2, R = 470 + rd() * 260
  const s = Math.sqrt(1 - u * u)
  return { x: Math.cos(a) * s * R * 0.95, y: u * R * 1.35, z: Math.sin(a) * s * R * 0.95, sz: 0.6 + rd() * 1.6, n: 1 + Math.floor(rd() * 3), off: rd(), px: rd() < 0.09, col: [BONE, GOLD, VIOLET, ROSE, '#7fd8b0'][Math.floor(rd() * 5)] }
})

function project(p, t) {
  const ang = 2 * Math.PI * ph(t)                        // one full turn per loop
  const ca = Math.cos(ang), sa = Math.sin(ang)
  let x = p.x * ca - p.z * sa, z = p.x * sa + p.z * ca, y = p.y
  // gentle breathing bob (2 per loop)
  y += 10 * osc(t, 2, p.x * 0.001)
  const ct = Math.cos(TILT), st = Math.sin(TILT)
  const y2 = y * ct - z * st, z2 = y * st + z * ct
  const cr = Math.cos(ROLL), sr = Math.sin(ROLL)
  const x3 = x * cr - y2 * sr, y3 = x * sr + y2 * cr
  const s = F / (F - z2)
  return { X: CX + x3 * s, Y: CY + y3 * s, s, z: z2 }
}
const depthK = (z) => clamp((z + 420) / 840)              // 0 back → 1 front

export default {
  id: 'L06-constellation', title: 'Constellation (loop)', duration: LOOP, loop: true,
  music: { chords: LOOP_CHORDS.map((c, i) => [i * 2, i * 2 + 2, c]), bpm: BPM, pulseGain: 0.2, hatGain: 0.03, padGain: 0.024 },
  // a soft star chime on every beat (pentatonic walk round the network), brighter on each downbeat + glitter sweeps
  cues: [
    ...Array.from({ length: 16 }, (_, j) => ['bell', j * BEAT, [587.33, 739.99, 880, 987.77, 554.37, 659.25, 880, 1108.73, 493.88, 587.33, 739.99, 987.77, 440, 554.37, 659.25, 880][j], j % 4 ? 0.012 : 0.026, j % 4 ? 0.9 : 1.6, ((j % 4) - 1.5) * 0.3]),
    ...[0, 1, 2, 3].map(i => ['glitter', i * 2 + 1.0, i * 2 + 1.35]),
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = loopBackdrop(root, 'rose', { seed: 6, grain: 0.2, stars: 160 })
    // deepen the core so portraits pop
    fill(root, { background: 'radial-gradient(70% 50% at 50% 43%, rgba(9,4,26,0.62) 0%, rgba(9,4,26,0.42) 60%, rgba(9,4,26,0.3) 100%)' })
    const imgs = SRC.map(([s]) => { const i = el('img', { display: 'none' }, root); i.src = s; return i })
    const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1520px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '92px', color: BONE, textShadow: '0 0 30px rgba(239,230,214,0.25), 0 2px 20px rgba(11,6,32,0.7)' }, root, 'Align')
    el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1640px', textAlign: 'center', fontFamily: MONO, fontSize: '24px', letterSpacing: '0.3em', textIndent: '0.3em', color: BONE, opacity: 0.72, textShadow: '0 0 12px rgba(11,6,32,0.8)' }, root, 'THE STARS CONNECT YOU')

    function portrait(ctx, n, P, flare, k) {
      const im = imgs[n.src], [, fx, fy, fs] = SRC[n.src]
      const D = n.d * P.s * (1 + 0.05 * k + 0.08 * flare), R = D / 2
      const dk = depthK(P.z)
      const light = 0.45 + 0.55 * dk
      // aura halo
      ctx.globalCompositeOperation = 'lighter'
      const gr = ctx.createRadialGradient(P.X, P.Y, R * 0.6, P.X, P.Y, R * (1.9 + 0.9 * flare))
      gr.addColorStop(0, n.ring + 'aa'); gr.addColorStop(0.35, n.ring + '38'); gr.addColorStop(1, n.ring + '00')
      ctx.globalAlpha = (0.35 + 0.65 * flare + 0.15 * k) * light
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(P.X, P.Y, R * (1.9 + 0.9 * flare), 0, 6.2832); ctx.fill()
      ctx.globalCompositeOperation = 'source-over'
      // photo disc
      ctx.save(); ctx.beginPath(); ctx.arc(P.X, P.Y, R, 0, 6.2832); ctx.clip()
      ctx.globalAlpha = 1
      if (im.naturalWidth) {
        const sh = Math.min(im.naturalWidth, im.naturalHeight) * fs
        ctx.drawImage(im, im.naturalWidth * fx - sh / 2, im.naturalHeight * fy - sh / 2, sh, sh, P.X - R, P.Y - R, D, D)
      }
      // depth dim (back of the shell sinks into the night) + flare wash
      ctx.fillStyle = '#0b0620'; ctx.globalAlpha = (1 - dk) * 0.62; ctx.fillRect(P.X - R, P.Y - R, D, D)
      if (flare > 0.01) { ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = n.ring; ctx.globalAlpha = 0.22 * flare; ctx.fillRect(P.X - R, P.Y - R, D, D); ctx.globalCompositeOperation = 'source-over' }
      ctx.restore()
      // rings: bone hairline + coloured aura ring
      ctx.globalAlpha = 0.95 * light; ctx.strokeStyle = BONE; ctx.lineWidth = 2 * P.s
      ctx.beginPath(); ctx.arc(P.X, P.Y, R, 0, 6.2832); ctx.stroke()
      ctx.globalAlpha = (0.55 + 0.45 * flare) * light; ctx.strokeStyle = n.ring; ctx.lineWidth = (3 + 3 * flare) * P.s
      ctx.beginPath(); ctx.arc(P.X, P.Y, R + 6 * P.s, 0, 6.2832); ctx.stroke()
      // flare: expanding ring + pixel sparkle
      if (flare > 0.02) {
        ctx.globalAlpha = flare * 0.7 * light; ctx.strokeStyle = BONE; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(P.X, P.Y, R + 6 + (1 - flare) * 60 * P.s, 0, 6.2832); ctx.stroke()
        ctx.globalAlpha = Math.min(1, flare * 1.4) * light
        pixelStar(ctx, P.X + R * 0.74, P.Y - R * 0.74, Math.round(3 + 1.5 * P.s), flare > 0.6 ? 0 : flare > 0.3 ? 1 : 2, GOLD)
      }
      ctx.globalAlpha = 1
    }

    return {
      update(t) { bg.update(t); word.style.opacity = String(0.82 + 0.18 * bar(t)) },
      fx(ctx, t) {
        loopStars(ctx, t, { seed: 16, sprites: 22, dots: 70, alpha: 0.85 })
        const k = kick(t), b = bar(t), u = cyc(t, 4), beatIx = Math.floor(u * 4) % 4
        const P = NODES.map(n => project(n, t))
        // dust behind the shell
        const DP = DUST.map(d => [d, project(d, t)])
        const dust = (front) => {
          for (const [d, p] of DP) {
            if ((p.z > 0) !== front) continue
            const tw = 0.5 + 0.5 * osc(t, d.n, d.off), a = (0.25 + 0.6 * tw) * (0.35 + 0.65 * depthK(p.z)) * (0.85 + 0.3 * k)
            if (d.px) { if (tw > 0.35) { ctx.globalAlpha = a; pixelStar(ctx, p.X, p.Y, p.s > 1.1 ? 4 : 3, tw > 0.85 ? 0 : tw > 0.6 ? 1 : 2, d.col) } }
            else { ctx.globalAlpha = a; ctx.fillStyle = '#fff4e6'; ctx.beginPath(); ctx.arc(p.X, p.Y, d.sz * p.s, 0, 6.2832); ctx.fill() }
          }
          ctx.globalAlpha = 1
        }
        dust(false)
        // flare per node: lands on its group's beat each bar (downbeat group flares hardest)
        const flareOf = (n) => {
          const lag = ((u - (n.g / 4 + n.sub * 0.06)) % 1 + 1) % 1      // bars since this node's beat
          return Math.exp(-lag * 2 * 3.2) * (n.g === 0 ? 1 : 0.85)
        }
        // lines: faint permanent web + the travelling draw/undraw wave
        ctx.lineCap = 'round'
        for (const e of EDGES) {
          const A = P[e.a], B = P[e.b], na = NODES[e.a], nb = NODES[e.b]
          const dk = (depthK(A.z) + depthK(B.z)) / 2
          ctx.globalAlpha = 0.1 + 0.12 * dk; ctx.strokeStyle = BONE; ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(A.X, A.Y); ctx.lineTo(B.X, B.Y); ctx.stroke()
          // wave: head arrives at node b exactly on its beat; tail follows half a bar later
          const arrive = e.g / 4 + e.sub * 0.06
          const loc = ((u - (arrive - 0.2)) % 1 + 1) % 1
          const head = ease.inOutCubic(clamp(loc / 0.2)), tail = ease.inOutCubic(clamp((loc - 0.62) / 0.3))
          if (head - tail <= 0.001) continue
          // trim to the portrait rims
          const dx = B.X - A.X, dy = B.Y - A.Y, L = Math.hypot(dx, dy) || 1
          const ra = (na.d * A.s / 2 + 8) / L, rb = (nb.d * B.s / 2 + 8) / L
          if (ra + rb >= 1) continue
          const f0 = lerp(ra, 1 - rb, tail), f1 = lerp(ra, 1 - rb, head)
          const x0 = A.X + dx * f0, y0 = A.Y + dy * f0, x1 = A.X + dx * f1, y1 = A.Y + dy * f1
          const g = ctx.createLinearGradient(A.X, A.Y, B.X, B.Y)
          g.addColorStop(0, na.ring); g.addColorStop(1, nb.ring)
          ctx.globalCompositeOperation = 'lighter'
          ctx.globalAlpha = 0.28 * (0.4 + 0.6 * dk); ctx.strokeStyle = g; ctx.lineWidth = 9
          ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
          ctx.globalAlpha = 0.9 * (0.4 + 0.6 * dk); ctx.strokeStyle = '#fff4ea'; ctx.lineWidth = 2
          ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
          // spark at the drawing head
          if (head < 1) {
            ctx.globalAlpha = 0.95 * (0.5 + 0.5 * dk)
            const hg = ctx.createRadialGradient(x1, y1, 0, x1, y1, 18)
            hg.addColorStop(0, '#ffffff'); hg.addColorStop(0.3, nb.ring + 'cc'); hg.addColorStop(1, nb.ring + '00')
            ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(x1, y1, 18, 0, 6.2832); ctx.fill()
          }
          ctx.globalCompositeOperation = 'source-over'
        }
        ctx.globalAlpha = 1
        // portraits, back to front
        NODES.map((n, i) => [n, P[i]]).sort((p, q) => p[1].z - q[1].z).forEach(([n, p]) => portrait(ctx, n, p, flareOf(n), k))
        dust(true)
        // downbeat shimmer ring round the whole network
        ctx.globalAlpha = 0.18 * b; ctx.strokeStyle = BONE; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.ellipse(CX, CY, 470 + 120 * (1 - b), 690 + 120 * (1 - b), 0, 0, 6.2832); ctx.stroke()
        ctx.globalAlpha = 1
        void hat; void beatIx
      },
    }
  },
}
