// L08 · Hyperspace — an endless flight through Align space. Seamless 8s loop.
// Loop rules: every star's depth is z = frac(z0 + k·φ(t)) with k an integer and φ a beat-warped phase that runs
// 0→1 once per loop (each beat surges then glides), so the whole field lands exactly where it started.
// Nebula hue walks once round the chakra spectrum per loop; cards / moons fly past on k=1 paths.
import { W, H, A, el, fill, lerp, clamp, rng, MONO, BONE, GOLD, HOT, CHAKRAS, pixelStar, drawMoonGlyph,
  LOOP, BPM, BEAT, ph, osc, kick, hat, bar, loopBackdrop } from './loopkit.js'

const CX = W / 2, CY = 860
const NEAR = 0.16, FAR = 9          // camera-space depth range
const F = 520                       // focal length (px)
const frac = (x) => x - Math.floor(x)
const ss = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u) }
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const CH_RGB = CHAKRAS.map(hex)
/** chakra spectrum colour at loop-phase p (wraps violet → red) */
function chakraAt(p) {
  const f = frac(p) * 7, i = Math.floor(f), u = f - i, a = CH_RGB[i % 7], b = CH_RGB[(i + 1) % 7]
  const s = u * u * (3 - 2 * u)
  return [0, 1, 2].map(c => Math.round(lerp(a[c], b[c], s)))
}
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
/** beat-warped loop phase: each beat surges forward (kick) then glides; φ(0)=0, φ(LOOP)=1 */
function phi(t) {
  const b = ph(t) * 16, n = Math.floor(b), u = b - n
  const e = 1 - Math.pow(1 - u, 3)
  return (n + lerp(u, e, 0.55)) / 16
}
/** speed multiplier of φ relative to linear (for streak lengths) */
function phiSpeed(t) {
  const u = frac(ph(t) * 16)
  return lerp(1, 3 * (1 - u) * (1 - u), 0.55)
}

// star field on a tunnel
const STARS = (() => {
  const r = rng(8081)
  return Array.from({ length: 520 }, () => {
    const a = r() * Math.PI * 2
    const rad = 0.35 + Math.pow(r(), 0.6) * 1.9
    const k = [1, 2, 2, 3, 3, 4][Math.floor(r() * 6)]
    const pal = r()
    return { a, rad, z0: r(), k, size: 1 + Math.floor(r() * 3), col: pal < 0.62 ? 'bone' : pal < 0.78 ? 'gold' : 'neb', sprite: r() < 0.09 }
  })
})()
// flyers: mystery cards + moon glyphs, one pass per loop each (k = 1), staggered in depth
const FLYERS = [
  { kind: 'card', img: 'card-profile-3', z0: 0.10, a: -2.55, rad: 0.55, spin: 1 },
  { kind: 'moon', p: 0.30, z0: 0.35, a: -0.55, rad: 0.5, spin: 0 },
  { kind: 'card', img: 'card-back', z0: 0.60, a: 0.35, rad: 0.55, spin: -1 },
  { kind: 'moon', p: 0.72, z0: 0.85, a: 2.35, rad: 0.5, spin: 0 },
]
const depth = (z) => lerp(FAR, NEAR, Math.pow(z, 1.35))   // z: 0 far → 1 at the camera

export default {
  id: 'L08-hyperspace', title: 'Hyperspace (loop)', duration: LOOP, loop: true,
  music: {
    chords: [
      [0, 2, [146.83, 220, 329.63, 369.99, 554.37]],   // Dmaj9
      [2, 4, [116.54, 233.08, 293.66, 349.23, 440]],   // Bbmaj7#5-ish lift
      [4, 6, [130.81, 196, 329.63, 392, 493.88]],      // Cmaj7
      [6, 8, [110, 220, 277.18, 329.63, 493.88]],      // A add9
    ],
    bpm: BPM, pulseGain: 0.32, hatGain: 0.055, padGain: 0.024,
  },
  cues: [
    // a flyer whooshes past the camera just before each passes (z ≈ 0.9)
    ['whoosh', 0.55, 0.5, 0.09], ['whoosh', 2.55, 0.5, 0.08], ['whoosh', 4.55, 0.5, 0.09], ['whoosh', 6.55, 0.5, 0.08],
    ['boom', 0, 0.16],
    ['riser', 6.2, 8, 0.05],
    ['glitter', 3.9, 4.6],
    ...[0, 1, 2, 3].map(i => ['bell', i * 2, [587.33, 466.16, 523.25, 554.37][i], 0.03, 1.4, (i - 1.5) * 0.25]),
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = loopBackdrop(root, 'teal', { seed: 8, stars: 0, grain: 0.22 })
    // our flight canvas sits inside the backdrop, under its vignette + grain
    const sky = document.createElement('canvas'); sky.width = W; sky.height = H
    Object.assign(sky.style, { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' })
    bg.root.insertBefore(sky, bg.root.children[bg.root.children.length - 2])
    const ctx = sky.getContext('2d')
    const imgs = {}
    for (const f of FLYERS) if (f.kind === 'card' && !imgs[f.img]) {
      const im = el('img', { display: 'none' }, root); im.src = A + f.img + '.png'; im.decoding = 'sync'; imgs[f.img] = im
    }
    const tag = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1660px', textAlign: 'center', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.5em', color: BONE, opacity: 0.8, textShadow: '0 0 18px rgba(11,6,32,0.9)' }, root, 'ALIGN')

    function draw(t) {
      const p = ph(t), k = kick(t), hh = hat(t), b = bar(t)
      const neb = chakraAt(p), neb2 = chakraAt(p + 0.33)
      const fphi = phi(t), spd = phiSpeed(t)
      const roll = 0.07 * osc(t, 1) + 0.03 * osc(t, 2, 0.25)
      const vx = CX + 26 * osc(t, 1, 0.1), vy = CY + 18 * osc(t, 2, 0.3)
      ctx.clearRect(0, 0, W, H)
      // ── nebula tunnel: big hue wash + light at the vanishing point
      ctx.globalCompositeOperation = 'source-over'
      let g = ctx.createRadialGradient(vx, vy, 0, vx, vy, 1300)
      g.addColorStop(0, rgba(neb, 0.42 + 0.15 * b)); g.addColorStop(0.16, rgba(neb, 0.2)); g.addColorStop(0.45, rgba(neb2, 0.07)); g.addColorStop(1, rgba(neb2, 0))
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'
      // swirling nebula lobes (orbit the axis once / twice per loop)
      for (let i = 0; i < 5; i++) {
        const a = 2 * Math.PI * ((i % 2 ? -1 : 1) * p + i / 5) + roll
        const rr = 380 + 120 * osc(t, 2, i * 0.2)
        const x = vx + Math.cos(a) * rr, y = vy + Math.sin(a) * rr * 1.45
        const c = chakraAt(p + i * 0.09)
        const gg = ctx.createRadialGradient(x, y, 0, x, y, 520)
        gg.addColorStop(0, rgba(c, 0.08 + 0.05 * k)); gg.addColorStop(1, rgba(c, 0))
        ctx.fillStyle = gg; ctx.fillRect(0, 0, W, H)
      }
      // ── tunnel rings: 8 octagons streaming at k = 2 (one passes every beat)
      ctx.save(); ctx.translate(vx, vy); ctx.rotate(roll)
      for (let j = 0; j < 8; j++) {
        const z = frac(j / 8 + 2 * fphi), d = depth(z)
        const R = F * 2.1 / d
        if (R > 1700) continue
        const al = ss(0, 0.25, z) * (1 - ss(0.7, 0.95, z)) * (0.32 + 0.25 * k)
        ctx.strokeStyle = rgba(chakraAt(p + j / 16), al); ctx.lineWidth = Math.min(7, Math.max(1.5, 12 / d))
        ctx.beginPath()
        for (let q = 0; q <= 8; q++) { const a = (q + 0.5) * Math.PI / 4; const x = Math.cos(a) * R, y = Math.sin(a) * R * 1.35; q ? ctx.lineTo(x, y) : ctx.moveTo(x, y) }
        ctx.stroke()
      }
      // ── stars: streaks toward camera, stretching on the kick
      const stretch = 0.012 * spd + 0.04 * k
      for (const s of STARS) {
        const z = frac(s.z0 + s.k * fphi)
        const d = depth(z), d2 = depth(Math.max(0, z - stretch * s.k * 0.6))
        const ca = Math.cos(s.a), sa = Math.sin(s.a)
        const x = ca * s.rad * F / d, y = sa * s.rad * F * 1.3 / d
        if (Math.abs(x) > 700 || Math.abs(y) > 1150) continue
        const x2 = ca * s.rad * F / d2, y2 = sa * s.rad * F * 1.3 / d2
        const al = ss(0, 0.18, z) * (1 - ss(0.94, 1, z))
        if (al <= 0.01) continue
        const col = s.col === 'bone' ? '255,247,236' : s.col === 'gold' ? '242,199,92' : `${neb[0]},${neb[1]},${neb[2]}`
        const w = Math.min(9, Math.max(1, s.size * (0.5 + 1.8 / d)))
        ctx.strokeStyle = `rgba(${col},${al * 0.8})`; ctx.lineWidth = w; ctx.lineCap = 'butt'
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x, y); ctx.stroke()
        // pixel head (snapped to a pixel grid for the 8-bit feel)
        const px = Math.max(2, Math.round(w * 1.2)), hx = Math.round(x / px) * px, hy = Math.round(y / px) * px
        ctx.fillStyle = `rgba(255,250,240,${al})`; ctx.fillRect(hx - px / 2, hy - px / 2, px, px)
        if (s.sprite && z > 0.5) {
          ctx.globalAlpha = al * (0.6 + 0.4 * hh)
          pixelStar(ctx, hx, hy, Math.max(2, Math.round(1 + 3 * z)), z > 0.8 ? 0 : 1, s.col === 'gold' ? GOLD : BONE)
          ctx.globalAlpha = 1
        }
      }
      ctx.restore()
      ctx.globalCompositeOperation = 'source-over'
      // ── flyers (cards / moons), each one pass per loop
      const fl = FLYERS.map(f => ({ f, z: frac(f.z0 + ph(t)) })).sort((a, b2) => a.z - b2.z)
      for (const { f, z } of fl) {
        const d = depth(z * 0.985)
        const a = f.a + roll
        const x = vx + Math.cos(a) * f.rad * F / d, y = vy + Math.sin(a) * f.rad * F * 1.3 / d
        const sc = 0.9 / d
        const al = ss(0.14, 0.32, z) * (1 - ss(0.95, 0.995, z))
        if (al <= 0.01) continue
        ctx.save(); ctx.translate(x, y); ctx.globalAlpha = al
        if (f.kind === 'card') {
          const im = imgs[f.img]
          const cw = 300 * sc, chh = cw * im.naturalHeight / Math.max(1, im.naturalWidth)
          ctx.rotate(2 * Math.PI * f.spin * ph(t) + 0.3 * f.spin)
          // squash = fake 3D tumble (two flips per loop)
          ctx.scale(0.35 + 0.65 * Math.abs(Math.cos(2 * Math.PI * ph(t) * 2 + f.z0 * 6)), 1)
          ctx.shadowColor = rgba(neb, 0.8); ctx.shadowBlur = 40 * sc
          ctx.drawImage(im, -cw / 2, -chh / 2, cw, chh)
        } else {
          const r = 70 * sc
          drawMoonGlyph(ctx, 0, 0, r, f.p, { color: BONE, lw: Math.max(1.5, 3 * sc), glow: 1, discAlpha: 0.18 })
        }
        ctx.restore()
      }
      ctx.globalAlpha = 1
      // ── vanishing point: the Align chakra column
      const core = ctx.createRadialGradient(vx, vy, 0, vx, vy, 260 + 60 * k)
      core.addColorStop(0, `rgba(255,243,224,${0.22 + 0.25 * k})`); core.addColorStop(0.25, rgba(neb, 0.22)); core.addColorStop(1, rgba(neb, 0))
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = core; ctx.beginPath(); ctx.arc(vx, vy, 320 + 60 * k, 0, Math.PI * 2); ctx.fill()
      const sp = 40
      // the column's spine
      ctx.strokeStyle = `rgba(255,243,224,${0.25 + 0.3 * b})`; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(vx, vy - 3.6 * sp); ctx.lineTo(vx, vy + 3.6 * sp); ctx.stroke()
      for (let i = 0; i < 7; i++) {
        const y = vy + (3 - i) * sp
        const wave = Math.exp(-((frac(p * 4) - i / 7) ** 2) / 0.005)
        const rad = 7 + 5 * k + 10 * wave
        const gg = ctx.createRadialGradient(vx, y, 0, vx, y, rad * 3)
        gg.addColorStop(0, CHAKRAS[i]); gg.addColorStop(0.35, CHAKRAS[i] + '88'); gg.addColorStop(1, CHAKRAS[i] + '00')
        ctx.globalCompositeOperation = 'lighter'
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(vx, y, rad * 3, 0, Math.PI * 2); ctx.fill()
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = CHAKRAS[i]; ctx.fillRect(Math.round(vx - 6 - 2 * wave), Math.round(y - 6 - 2 * wave), 12 + 4 * wave, 12 + 4 * wave)
        ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(vx - 3 - 2 * wave), Math.round(y - 3 - 2 * wave), 6 + 4 * wave, 6 + 4 * wave)
      }
      // beat flash: thin cross-flare on every kick, bigger on the bar
      const fl2 = k * (0.35 + 0.65 * b)
      ctx.fillStyle = `rgba(255,243,224,${0.5 * fl2})`
      ctx.fillRect(vx - 260 * fl2 - 20, vy - 1, 520 * fl2 + 40, 2)
      ctx.globalCompositeOperation = 'source-over'
      // deep-indigo vignette keeps the edges dark
      const vg = ctx.createRadialGradient(vx, vy, 200, vx, vy, 1250)
      vg.addColorStop(0, 'rgba(11,6,32,0)'); vg.addColorStop(0.55, 'rgba(11,6,32,0.25)'); vg.addColorStop(1, 'rgba(11,6,32,0.72)')
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H)
      void BEAT; void HOT
    }
    return {
      update(t) {
        bg.update(t); draw(t)
        tag.style.opacity = String(0.6 + 0.3 * bar(t))
      },
    }
  },
}
