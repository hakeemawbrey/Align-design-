// P3 · Faith — film-faithful loop (the S1 opener). 10s @ 96 bpm, seamless.
// S1's grainy nebula exactly (dust lanes, three star layers, spiked bright stars, heavy silver grain, indigo vignette)
// on a slow closed camera circle; the thin waxing crescent with earthshine upper-right riding the same camera;
// pixel stars twinkling; one shooting star per loop (3.4–4.0s, S1's path, above the line). One bone serif line, held.
import { W, H, el, fill, SERIF, MONO, BONE,
  LOOP, osc, near, filmNebula, filmGrain, filmPixelStars, shootingStar, drawMoon, filmMusic, filmCues } from './filmkit.js'

const MOON = { x: 790, y: 440, R: 84, p: 0.092 }
const SHOOT = { t0: 3.4, t1: 4.0, x0: 100, y0: 560, x1: 940, y1: 740, len: 300, px: 4, rgb: '255,243,224', col: BONE, seed: 2 }

export default {
  id: 'P3-faith', title: 'Faith (film loop)', duration: LOOP, loop: true,
  music: filmMusic(),
  cues: filmCues({ gain: 0.02, extra: [['whoosh', 3.85, 0.6, 0.045], ['bell', 3.95, 1567.98, 0.016, 1.6, 0.4], ['bell', 4.02, 2093, 0.01, 1.4, 0.5]] }),
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const neb = filmNebula(root, { drift: [26, 18], zoom: 0.02, keep: [[60, 800, 960, 320]], pockets: [{ x: 540, y: 966, rx: 670, ry: 300, a: 0.55 }] })
    const fc = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    fc.width = W; fc.height = H
    const fx = fc.getContext('2d')
    const line = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '50%', transform: 'translateY(-50%)', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '104px', lineHeight: 1.1, color: BONE }, root, 'Put your faith<br>in the stars.')
    const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1590px', textAlign: 'center', fontFamily: MONO, fontSize: '24px', letterSpacing: '0.42em', textIndent: '0.42em', color: 'rgba(239,230,214,0.7)' }, root, 'ALIGN')
    const grain = filmGrain(root, { opacity: 0.8 })
    return {
      update(t) {
        neb.update(t)
        const cam = neb.cam(t)
        fx.clearRect(0, 0, W, H)
        const s = cam.s * 1.03
        drawMoon(fx, W / 2 + (MOON.x - W / 2) * s + cam.dx * 1.3, H / 2 + (MOON.y - H / 2) * s + cam.dy * 1.3, MOON.R * s, MOON.p, { glow: 3.4, earthshine: 1, darkAlpha: 0.62 })
        filmPixelStars(fx, t, { seed: 11, sprites: 26, dots: 80, keep: [[60, 800, 960, 320], [MOON.x - 110, MOON.y - 110, 220, 220]] })
        shootingStar(fx, t, SHOOT)
        const br = 0.5 + 0.5 * osc(t, 2, 0.25), sh = near(t, 3.9, 0.5)
        // S1's filmic softness: faint chromatic fringe + indigo shadow, plus a slow bone glow breath
        line.style.textShadow = `-0.7px 0 0 rgba(232,98,138,0.32), 0.7px 0 0 rgba(140,170,255,0.28), 0 0 ${(26 + 18 * br).toFixed(1)}px rgba(255,236,200,${(0.1 + 0.1 * br + 0.08 * sh).toFixed(3)}), 0 2px 26px rgba(11,6,32,0.75)`
        word.style.opacity = String(0.85 + 0.15 * br)
        grain.update(t)
      },
    }
  },
}
