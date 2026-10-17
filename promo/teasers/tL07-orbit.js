// L07 · Orbit — a binary-star dance. Two aura orbs (Taurus green, Libra violet) orbit their shared centre exactly
// twice per loop on a slightly tilted 3D orbit, trailing light. Their angle is time-warped so they slow into a
// perfect vertical line once per loop (Taurus over Libra, on the downbeat at t = 0) — the chakra column ignites
// between them (the "align" moment) — then slingshot on. Spark / rub / align accents fly off the orbs on the beats.
// Loop rules: θ(p) = 2π(K·p) − B·sin(2πp) + π/2 → advances exactly K turns per loop; everything else uses ph/osc/kick/bar.
import { W, H, el, fill, clamp, lerp, rng, SERIF, MONO, BONE, GOLD, CHAKRAS, IMG, pixelStar,
  LOOP, BPM, BEAT, ph, osc, cyc, kick, hat, bar, LOOP_CHORDS, loopBackdrop, loopStars } from './loopkit.js'

const CX = W / 2, CY = 860, R = 340, RY = 1.0, DEPTH = 0.36, F = 1800
const K = 2, B = 0.86 * K    // warp strength: speed at the align = 14% of mean
const ACCENTS = ['#7fd8b0', '#e8628a', '#f2c75c']           // spark · rub · align
const ORBS = [
  { src: IMG + 'aura/taurus.jpg', col: '#a6e05a', glow: '#7fd8b0', deep: '#2f6b2a', name: 'TAURUS', crop: [0.5, 0.56, 0.78] },
  { src: IMG + 'aura/libra.jpg', col: '#b98cff', glow: '#c9a6ff', deep: '#4a2a8a', name: 'LIBRA', crop: [0.5, 0.56, 0.78] },
]
const theta = (t) => { const p = ph(t); return 2 * Math.PI * K * p - B * Math.sin(2 * Math.PI * p) + Math.PI / 2 }
/** screen position of orb i (0 = Taurus, 1 = Libra) at time t */
function orbPos(i, t) {
  const a = theta(t) + i * Math.PI
  const x = Math.cos(a) * R, y = -Math.sin(a) * R * RY, z = Math.cos(a) * R * DEPTH   // right side nearer the viewer
  const breathe = 1 + 0.03 * osc(t, 4)
  const s = F / (F - z)
  return { X: CX + x * s * breathe, Y: CY + y * s * breathe, s, z }
}
// align envelope: rises into t = 0 (end of the loop), peaks on the downbeat, decays over ~1.2s
function alignEnv(t) {
  const sec = ph(t) * LOOP
  return Math.max(Math.exp(-sec * 2.4), Math.exp(-(LOOP - sec) * 7) * 0.6)
}

export default {
  id: 'L07-orbit', title: 'Orbit (loop)', duration: LOOP, loop: true,
  music: { chords: LOOP_CHORDS.map((c, i) => [i * 2, i * 2 + 2, c]), bpm: BPM, pulseGain: 0.2, hatGain: 0.03, padGain: 0.024 },
  cues: [
    ['boom', 0, 0.22],
    // chakra chimes up the column on the align
    ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', 0.02 + i * 0.045, f, 0.03, 1.8, (i - 3) * 0.12]),
    ['glitter', 0.1, 0.55],
    // slingshot swooshes as they whip round mid-loop
    ['whoosh', 2.2, 0.7, 0.05], ['whoosh', 4.6, 0.8, 0.06],
    // soft spark ticks on beats
    ...Array.from({ length: 16 }, (_, j) => ['tick', j * BEAT + 0.005, j % 4 ? 0.02 : 0.035]),
    ['riser', 6.4, 7.98, 0.05],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = loopBackdrop(root, 'teal', { seed: 7, grain: 0.2, stars: 170 })
    fill(root, { background: 'radial-gradient(62% 44% at 50% 45%, rgba(9,4,26,0.5) 0%, rgba(9,4,26,0.3) 60%, rgba(9,4,26,0.22) 100%)' })
    const imgs = ORBS.map(o => { const i = el('img', { display: 'none' }, root); i.src = o.src; return i })
    const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1500px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '92px', color: BONE, textShadow: '0 0 30px rgba(239,230,214,0.25), 0 2px 20px rgba(11,6,32,0.7)' }, root, 'Align')
    const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1620px', textAlign: 'center', fontFamily: MONO, fontSize: '24px', letterSpacing: '0.3em', textIndent: '0.3em', color: BONE, opacity: 0.72, textShadow: '0 0 12px rgba(11,6,32,0.8)' }, root, 'TAURUS · LIBRA')

    function orb(ctx, i, P, t, al, k) {
      const o = ORBS[i], im = imgs[i], r = 108 * P.s * (1 + 0.04 * k + 0.08 * al)
      const lit = 0.75 + 0.25 * clamp((P.z + R * DEPTH) / (2 * R * DEPTH))
      // outer aura glow
      ctx.globalCompositeOperation = 'lighter'
      const gr = ctx.createRadialGradient(P.X, P.Y, r * 0.5, P.X, P.Y, r * (3 + 1.2 * al))
      gr.addColorStop(0, o.col + 'cc'); gr.addColorStop(0.25, o.col + '55'); gr.addColorStop(0.6, o.glow + '18'); gr.addColorStop(1, o.glow + '00')
      ctx.globalAlpha = (0.55 + 0.25 * k + 0.4 * al) * lit; ctx.fillStyle = gr
      ctx.beginPath(); ctx.arc(P.X, P.Y, r * (3 + 1.2 * al), 0, 6.2832); ctx.fill()
      ctx.globalCompositeOperation = 'source-over'
      // the aura-cam veil inside the orb
      ctx.save(); ctx.beginPath(); ctx.arc(P.X, P.Y, r, 0, 6.2832); ctx.clip()
      ctx.fillStyle = '#0b0620'; ctx.globalAlpha = 1; ctx.fillRect(P.X - r, P.Y - r, 2 * r, 2 * r)
      if (im.naturalWidth) {
        const [fx, fy, fs] = o.crop, sh = Math.min(im.naturalWidth, im.naturalHeight) * fs
        ctx.drawImage(im, im.naturalWidth * fx - sh / 2, im.naturalHeight * fy - sh / 2, sh, sh, P.X - r, P.Y - r, 2 * r, 2 * r)
        ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.1 + 0.2 * k + 0.35 * al
        ctx.drawImage(im, im.naturalWidth * fx - sh / 2, im.naturalHeight * fy - sh / 2, sh, sh, P.X - r, P.Y - r, 2 * r, 2 * r)
        ctx.globalCompositeOperation = 'source-over'
      }
      // spherical shading: dark rim + soft highlight
      const sg = ctx.createRadialGradient(P.X - r * 0.3, P.Y - r * 0.35, r * 0.1, P.X, P.Y, r)
      sg.addColorStop(0, 'rgba(255,250,240,0.28)'); sg.addColorStop(0.45, 'rgba(255,250,240,0)'); sg.addColorStop(0.85, 'rgba(11,6,32,0.25)'); sg.addColorStop(1, 'rgba(11,6,32,0.6)')
      ctx.globalAlpha = 1; ctx.fillStyle = sg; ctx.fillRect(P.X - r, P.Y - r, 2 * r, 2 * r)
      ctx.restore()
      // rim
      ctx.globalAlpha = 0.85 * lit; ctx.strokeStyle = o.col; ctx.lineWidth = 2.5
      ctx.beginPath(); ctx.arc(P.X, P.Y, r + 1, 0, 6.2832); ctx.stroke()
      ctx.globalAlpha = 0.35 * lit; ctx.strokeStyle = BONE; ctx.lineWidth = 1
      ctx.beginPath(); ctx.arc(P.X, P.Y, r + 9, 0, 6.2832); ctx.stroke()
      ctx.globalAlpha = 1
    }

    function trail(ctx, i, t) {
      const o = ORBS[i], N = 46, SPAN = 0.9
      ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round'
      let prev = orbPos(i, t)
      for (let s = 1; s <= N; s++) {
        const P = orbPos(i, t - (s / N) * SPAN), f = 1 - s / N
        const w = 70 * f * f * P.s
        ctx.strokeStyle = o.col; ctx.globalAlpha = 0.08 * f; ctx.lineWidth = w + 30 * f
        ctx.beginPath(); ctx.moveTo(prev.X, prev.Y); ctx.lineTo(P.X, P.Y); ctx.stroke()
        ctx.strokeStyle = o.glow; ctx.globalAlpha = 0.22 * f; ctx.lineWidth = Math.max(1, w * 0.4)
        ctx.beginPath(); ctx.moveTo(prev.X, prev.Y); ctx.lineTo(P.X, P.Y); ctx.stroke()
        ctx.strokeStyle = '#fff6ea'; ctx.globalAlpha = 0.5 * f * f; ctx.lineWidth = Math.max(1, w * 0.08)
        ctx.beginPath(); ctx.moveTo(prev.X, prev.Y); ctx.lineTo(P.X, P.Y); ctx.stroke()
        prev = P
      }
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1
    }

    // beat sparks: on every beat each orb throws a few accent sparks that drift out and fade (last 2 beats live)
    function sparks(ctx, t) {
      const jNow = Math.floor((ph(t) * LOOP) / BEAT)
      for (let back = 0; back < 3; back++) {
        const j = jNow - back, tb = j * BEAT, age = ph(t) * LOOP - tb
        if (age < 0 || age > 1.3) continue
        const jj = ((j % 16) + 16) % 16
        for (let i = 0; i < 2; i++) {
          const P0 = orbPos(i, tb), r = rng(jj * 31 + i * 7 + 5), n = jj % 4 === 0 ? 7 : 4
          for (let q = 0; q < n; q++) {
            const a = r() * 6.2832, sp = 90 + r() * 170, col = ACCENTS[Math.floor(r() * 3)]
            const d = sp * (1 - Math.exp(-age * 2.6)) / 2.6 * 2.2
            const x = P0.X + Math.cos(a) * (110 * P0.s + d), y = P0.Y + Math.sin(a) * (110 * P0.s + d) + 20 * age * age
            const life = clamp(1 - age / 1.3)
            ctx.globalAlpha = life * life
            if (r() < 0.5) pixelStar(ctx, x, y, 3, life > 0.6 ? 0 : life > 0.35 ? 1 : 2, col)
            else { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 2.4 * life + 0.8, 0, 6.2832); ctx.fill() }
          }
        }
      }
      ctx.globalAlpha = 1
    }

    // the chakra column between the two orbs: a ghost at rest, ignites bottom → top on the align
    function column(ctx, t, A, Bp, al) {
      const top = A.Y < Bp.Y ? A : Bp, bot = A.Y < Bp.Y ? Bp : A
      const x = (A.X + Bp.X) / 2
      const y0 = top.Y + 108 * top.s + 40, y1 = bot.Y - 108 * bot.s - 40
      if (y1 <= y0) return
      const sec = ph(t) * LOOP, sd = sec < 4 ? sec : sec - LOOP, ign = clamp((sd + 0.28) / 0.28)   // signed time from the downbeat: fully lit on it
      // beam
      if (al > 0.01) {
        ctx.globalCompositeOperation = 'lighter'
        const bg2 = ctx.createLinearGradient(0, y1 + 80, 0, y0 - 80)
        CHAKRAS.forEach((c, i) => bg2.addColorStop(i / 6, c + '88'))
        for (const [w, a] of [[60, 0.12], [18, 0.35], [3, 0.9]]) {
          ctx.globalAlpha = a * al; ctx.strokeStyle = w === 3 ? '#fff6ea' : bg2; ctx.lineWidth = w
          ctx.beginPath(); ctx.moveTo(x, top.Y); ctx.lineTo(x, bot.Y); ctx.stroke()
        }
        ctx.globalCompositeOperation = 'source-over'
      }
      for (let i = 0; i < 7; i++) {
        const y = lerp(y1, y0, i / 6), c = CHAKRAS[i]
        const lit = clamp(ign * 7 - i) * al
        const base = 0.16 + 0.1 * kick(t)
        const rad = 9 + 22 * lit
        ctx.globalCompositeOperation = 'lighter'
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad * 2.8)
        g.addColorStop(0, c); g.addColorStop(0.4, c + '66'); g.addColorStop(1, c + '00')
        ctx.globalAlpha = Math.max(base, lit); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad * 2.8, 0, 6.2832); ctx.fill()
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = Math.max(base * 1.4, lit); ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(x, y, 3 + 5 * lit, 0, 6.2832); ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    return {
      update(t) {
        bg.update(t)
        const al = alignEnv(t)
        word.style.opacity = String(0.8 + 0.2 * al)
        sub.style.opacity = String(0.6 + 0.3 * al)
      },
      fx(ctx, t) {
        loopStars(ctx, t, { seed: 27, sprites: 24, dots: 80, alpha: 0.9, pal: [BONE, BONE, GOLD, '#7fd8b0', '#c9a6ff'] })
        const k = kick(t), al = alignEnv(t)
        const A = orbPos(0, t), Bp = orbPos(1, t)
        // faint orbit path
        ctx.globalAlpha = 0.12 + 0.06 * bar(t); ctx.strokeStyle = BONE; ctx.lineWidth = 1.2; ctx.setLineDash([2, 10])
        ctx.beginPath()
        for (let s = 0; s <= 120; s++) {
          const a = (s / 120) * 6.2832, z = Math.cos(a) * R * DEPTH, sc = F / (F - z)
          const x = CX + Math.cos(a) * R * sc, y = CY - Math.sin(a) * R * RY * sc
          s ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
        }
        ctx.stroke(); ctx.setLineDash([])
        // barycentre: a tiny pixel star breathing on the beat
        ctx.globalAlpha = 0.5 + 0.5 * k; pixelStar(ctx, CX, CY, 3, k > 0.5 ? 0 : 1, GOLD)
        ctx.globalAlpha = 1
        column(ctx, t, A, Bp, al)
        // align burst rings on the downbeat
        if (al > 0.02) {
          const sec = ph(t) * LOOP
          if (sec < 2) for (const [x, y, c] of [[A.X, A.Y, ORBS[0].col], [Bp.X, Bp.Y, ORBS[1].col]]) {
            const pr = clamp(sec / 1.4)
            ctx.globalAlpha = (1 - pr) * 0.6; ctx.strokeStyle = c; ctx.lineWidth = 2
            ctx.beginPath(); ctx.arc(x, y, 120 + pr * 380, 0, 6.2832); ctx.stroke()
          }
          ctx.globalAlpha = 1
        }
        trail(ctx, 0, t); trail(ctx, 1, t)
        // draw back orb first
        const order = A.z < Bp.z ? [[0, A], [1, Bp]] : [[1, Bp], [0, A]]
        for (const [i, P] of order) orb(ctx, i, P, t, al, k)
        sparks(ctx, t)
        void hat; void cyc; void H
      },
    }
  },
}
