// L01 · Chakra — radial beat visualizer around the Align mark. Seamless 8s loop (template for the loop series).
// Loop rules: every motion periodic in LOOP (ph/osc/cyc/kick/hat/bar from loopkit); the seed-of-life has
// 6-fold symmetry, so it turns exactly 60° per loop and lands where it started.
import { W, H, el, fill, lerp, clamp, SERIF, MONO, BONE, CHAKRAS,
  LOOP, BPM, BEAT, ph, osc, cyc, kick, hat, bar, spectrum, LOOP_CHORDS, loopBackdrop, loopStars } from './loopkit.js'

const CX = W / 2, CY = 900
export default {
  id: 'L01-chakra', title: 'Chakra (loop)', duration: LOOP, loop: true,
  music: { chords: LOOP_CHORDS.map((c, i) => [i * 2, i * 2 + 2, c]), bpm: BPM, pulseGain: 0.22, hatGain: 0.035 },
  // a soft chakra chime on each downbeat, rising through the column across the 4 bars
  cues: [0, 1, 2, 3].map(i => ['bell', i * 2, [293.66, 369.99, 440, 554.37][i], 0.035, 1.6, (i - 1.5) * 0.2]),
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = loopBackdrop(root, 'aurora', { seed: 3 })
    const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1500px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '96px', color: BONE, textShadow: '0 0 30px rgba(239,230,214,0.25)' }, root, 'Align')
    const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1630px', textAlign: 'center', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.3em', color: BONE, opacity: 0.75 }, root, 'PUT YOUR FAITH IN THE STARS')
    return {
      update(t) { bg.update(t); word.style.opacity = String(0.85 + 0.15 * bar(t)) },
      fx(ctx, t) {
        loopStars(ctx, t, { seed: 5, keepOut: [[140, 480, 800, 840]] })
        const k = kick(t), h = hat(t), b = bar(t)
        // radial spectrum bars (mirrored, 2×64)
        const S = spectrum(t, 64)
        const R0 = 300 + 14 * k
        ctx.save(); ctx.translate(CX, CY); ctx.rotate(2 * Math.PI * ph(t))   // bars aren't 6-fold symmetric: one full turn per loop
        for (let i = 0; i < 128; i++) {
          const v = S[i < 64 ? i : 127 - i]
          const a = (i / 128) * Math.PI * 2
          const len = 18 + v * 190
          const c = CHAKRAS[Math.floor((i < 64 ? i : 127 - i) / 64 * 7)]
          ctx.strokeStyle = c; ctx.globalAlpha = 0.35 + 0.6 * v; ctx.lineWidth = 7; ctx.lineCap = 'round'
          ctx.beginPath(); ctx.moveTo(Math.cos(a) * R0, Math.sin(a) * R0); ctx.lineTo(Math.cos(a) * (R0 + len), Math.sin(a) * (R0 + len)); ctx.stroke()
        }
        ctx.restore()
        // expanding beat rings (one per beat, periodic)
        for (let j = 0; j < 3; j++) {
          const pp = ((ph(t) * 16 - j) % 1 + 1) % 1
          const rr = 260 + pp * 520
          ctx.globalAlpha = (1 - pp) * 0.35; ctx.strokeStyle = BONE; ctx.lineWidth = 2
          ctx.beginPath(); ctx.arc(CX, CY, rr, 0, Math.PI * 2); ctx.stroke()
        }
        // seed of life, turning 60° per loop
        ctx.save(); ctx.translate(CX, CY); ctx.rotate(2 * Math.PI * ph(t) / 6)
        const R = 92 * (1 + 0.03 * k)
        ctx.globalAlpha = 0.85; ctx.strokeStyle = '#d9cdf0'; ctx.lineWidth = 3
        const pet = [[0, 0], ...Array.from({ length: 6 }, (_, q) => [Math.cos((-90 + q * 60) * Math.PI / 180) * R, Math.sin((-90 + q * 60) * Math.PI / 180) * R])]
        for (const [x, y] of pet) { ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.stroke() }
        ctx.beginPath(); ctx.arc(0, 0, R * 2, 0, Math.PI * 2); ctx.stroke()
        ctx.restore()
        // chakra column: each dot flares when the beat-wave passes it (bottom → top, one sweep per bar)
        for (let i = 0; i < 7; i++) {
          const y = CY + (3 - i) * R * 0.53 * 2 / 2 * 1.06
          const wave = Math.exp(-(((ph(t) * 4) % 1 - i / 7) ** 2) / 0.006)
          const rad = 16 + 10 * k + 22 * wave
          const g = ctx.createRadialGradient(CX, y, 0, CX, y, rad * 2.6)
          g.addColorStop(0, CHAKRAS[i]); g.addColorStop(0.4, CHAKRAS[i] + '66'); g.addColorStop(1, CHAKRAS[i] + '00')
          ctx.globalAlpha = 0.9; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, y, rad * 2.6, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = '#fff'; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(CX, y, 5 + 4 * wave, 0, Math.PI * 2); ctx.fill()
        }
        ctx.globalAlpha = 1
        void h; void b; void lerp; void clamp
      },
    }
  },
}
