// Shared vertical END CARD for the Houston series (1080×1920): "come Align." + the animated Align logo + fade to black.
//   import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
//   SCENES: [...yourScenes, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
//   CUES:   [...yourCues, ...endcardCues(DURATION - ENDCARD_LEN)]
// Contract: at `start` your film must be showing ONLY the plain sky H (drawSky(ctx,t,SKY_H) + grain GRAIN_H, from
// wheel.js). The end card is opaque from `start` (it draws that same sky itself, same layer recipe as dummies a), so the
// cut is invisible, and it runs to start + ENDCARD_LEN (= DURATION), ending on a black frame.
//
// Timeline (seconds after `start`):
//   0.00         plain sky H (identical to the film's hand-off frame)
//   0.08         "come" pops in (Inter 800, bone, springy)
//   0.28         "Align." pops in bigger (EB Garamond italic, rose #e8628a) with a wobble + pixel-star sparkle burst
//   ≈0.50–1.80   "come Align." holds, fully readable (~1.3 s)
//   1.80–2.28    the line rises and shrinks to the top; the lockup forms beneath it:
//   1.92         seed-of-life rings draw on stroke by stroke (+0.05 each), the mark springs in (soft overshoot)
//   2.08         chakra dots light bottom → top (+0.055 each)
//   2.36         wordmark "Align" fades/rises in (de-blur, tracking in) · 2.62 a light sweep runs across it
//   2.56         "BLIND BY DESIGN" follows
//   2.98         one soft chakra pulse travels up the column, then a gentle glow breathes
//   3.70–4.40    fade to black (last frame black)
// Pure function of t; nothing touches `document` at module top level (the sound build imports this in node).
import { clamp, lerp, prog, ease, tw, el, rng, hexToRgb } from '../src/lib.js'
import { W, H, fill } from '../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from './sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from './wheel.js'

export const ENDCARD_LEN = 4.4

const BONE = '#efe6d6', ROSE = '#e8628a', GOLD = '#f2c75c', PINK = '#ff8fb1'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const MONO = "'Space Mono', monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']

// beats, relative to start
const R = {
  come: 0.08, align: 0.28, burst: 0.34,
  rise: [1.8, 2.28],
  rings: 1.92, ringGap: 0.05, ringDur: 0.34,
  dots: 2.08, dotGap: 0.055,
  word: 2.36, sweep: [2.62, 3.08], sub: 2.56,
  pulse: 2.98, pulseGap: 0.05,
  out: 3.7,
}
// layout (vertical)
const LINE_Y0 = 900, LINE_Y1 = 400, LINE_K1 = 0.6       // centre of the "come Align." block, before/after the rise
const COME_FS = 150, ALIGN_FS = 236
const MARK = 400, MARK_CY = 975, WORD_TOP = 1190, WORD_FS = 150, SUB_TOP = 1400, SUB_FS = 34

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }

function makeBurst(seed, n, dist) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.5, d: dist * (0.65 + r() * 0.55), size: 12 + Math.round(r() * 2) * 5, kind: Math.floor(r() * 4), c: [PINK, GOLD, BONE, ROSE][i % 4], sx: 1.35 + r() * 0.3 }))
}
function drawBurst(x, parts, px, py, t, t0, dur = 0.75) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - ease.inQuad(p)) * (p < 0.12 ? p / 0.12 : 1)
    drawPixelStar(x, px + Math.cos(q.a) * q.d * e * q.sx, py + Math.sin(q.a) * q.d * e, q.size, q.kind, q.c)
  }
  x.restore()
}

export async function buildEndcard(stage, { start }) {
  const S = start, T = k => S + k
  const END = S + ENDCARD_LEN
  try {
    await Promise.all([`800 ${COME_FS}px Inter`, `italic 500 ${ALIGN_FS}px 'EB Garamond'`, `italic 400 ${WORD_FS}px 'EB Garamond'`, `400 ${SUB_FS}px 'Space Mono'`].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), bx = cv.getContext('2d')

  // ── soft glow behind the mark
  const glow = el('div', { position: 'absolute', left: (W / 2 - 540) + 'px', top: (MARK_CY - 430) + 'px', width: '1080px', height: '860px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(154,123,224,0.34), rgba(154,123,224,0.12) 55%, rgba(11,6,32,0) 100%)' }, root)

  // ── "come Align." (two stacked lines, popped word by word)
  const lineBox = el('div', { position: 'absolute', left: '0', width: W + 'px', top: '0', textAlign: 'center', transformOrigin: '50% 50%', textShadow: SHADOW }, root)
  const comeE = el('div', { display: 'inline-block', fontFamily: INTER, fontWeight: 800, fontSize: COME_FS + 'px', lineHeight: 1, color: BONE, letterSpacing: '-0.015em', opacity: 0, transformOrigin: '50% 85%' }, lineBox, 'come')
  el('br', {}, lineBox)
  const alignE = el('div', { display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: ALIGN_FS + 'px', lineHeight: 0.92, color: ROSE, opacity: 0, transformOrigin: '45% 75%',
    textShadow: `0 0 34px ${rgba(ROSE, 0.45)}, ${SHADOW}`, padding: '0 0.08em' }, lineBox, 'Align.')
  const LINE_H = COME_FS * 1 + ALIGN_FS * 0.92

  // ── lockup: seed-of-life rings + chakra column (same geometry as the brand mark), wordmark, tagline
  const lock = el('div', { position: 'absolute', inset: '0' }, root)
  const RR = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * RR, Math.sin(a) * RR] })]
  const circles = [{ x: 0, y: 0, r: 40 }, ...pet.map(([x, y]) => ({ x, y, r: RR }))]
  const defs = CHK.map((c, i) => `<radialGradient id="ecg${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="ecc${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const DY = 10.6
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px', opacity: 0, transformOrigin: '50% 50%' }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.05" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * DY - i * DY}" r="0" fill="url(#ecg${i})"/><circle class="core" cx="0" cy="${3 * DY - i * DY}" r="0" fill="url(#ecc${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const wordBox = el('div', { position: 'absolute', left: '0', width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', opacity: 0 }, lock)
  const WSTYLE = { display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: WORD_FS + 'px', lineHeight: 1.1, padding: '0 0.12em' }
  const wordE = el('div', { ...WSTYLE, color: BONE, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)' }, wordBox, 'Align')
  // the light sweep: the same word, clipped to a moving bright band
  const sweepE = el('div', { ...WSTYLE, position: 'absolute', left: '50%', top: '0', transform: 'translateX(-50%)', color: 'transparent',
    backgroundImage: 'linear-gradient(105deg, rgba(255,250,236,0) 35%, rgba(255,236,190,0.95) 48%, rgba(255,255,255,1) 50%, rgba(255,236,190,0.95) 52%, rgba(255,250,236,0) 65%)',
    backgroundSize: '300% 100%', backgroundRepeat: 'no-repeat', WebkitBackgroundClip: 'text', backgroundClip: 'text', opacity: 0 }, wordBox, 'Align')
  const sub = el('div', { position: 'absolute', left: '0', width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: BONE, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'BLIND BY DESIGN')

  // ── sparkles above the type, grain on top, then the black plate
  const fxC = layerCanvas(root, { pointerEvents: 'none' }), fx = fxC.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: '0', background: '#000', opacity: 0 }, root)

  const BURST = makeBurst(4401, 12, 230)
  const TOPB = makeBurst(4402, 8, 90)
  const T_HOLD = T(R.dots + 6 * R.dotGap + 0.2)

  return {
    start: S, end: END + 0.01, root,
    update(t) {
      drawSky(bx, t, SKY_H)

      // ── "come Align."
      const pc = prog(t, T(R.come), T(R.come + 0.3))
      comeE.style.opacity = String(clamp(pc * 3))
      comeE.style.transform = `translateY(${((1 - ease.outCubic(pc)) * 34).toFixed(2)}px) scale(${(0.55 + 0.45 * easeOutBack(pc, 2.6)).toFixed(4)})`
      const pa = prog(t, T(R.align), T(R.align + 0.42))
      const dt = t - T(R.align)
      const wob = dt > 0 ? 7 * Math.sin(dt * 15) * Math.exp(-dt * 3.4) : 0
      const sq = dt > 0 ? 0.05 * Math.sin(dt * 18) * Math.exp(-dt * 5) : 0   // squash & stretch on landing
      alignE.style.opacity = String(clamp(pa * 3))
      alignE.style.transform = `translateY(${((1 - ease.outCubic(pa)) * 40).toFixed(2)}px) scale(${((0.3 + 0.7 * easeOutBack(pa, 3.2)) * (1 + sq)).toFixed(4)}, ${((0.3 + 0.7 * easeOutBack(pa, 3.2)) * (1 - sq)).toFixed(4)}) rotate(${wob.toFixed(2)}deg)`
      const rp = ease.inOutCubic(prog(t, T(R.rise[0]), T(R.rise[1])))
      const cy = lerp(LINE_Y0, LINE_Y1, rp), k = lerp(1, LINE_K1, rp)
      lineBox.style.transform = `translateY(${(cy - LINE_H / 2).toFixed(2)}px) scale(${k.toFixed(4)})`

      // ── the mark: rings draw on one by one, a soft spring + settle
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T(R.rings + i * R.ringGap), T(R.rings + i * R.ringGap + R.ringDur))))))
      const mp = prog(t, T(R.rings), T(R.rings + 0.62))
      svg.style.opacity = String(prog(t, T(R.rings - 0.02), T(R.rings + 0.12)))
      svg.style.transform = `scale(${(0.82 + 0.18 * easeOutBack(mp, 1.6)).toFixed(4)}) rotate(${(-14 * (1 - ease.outCubic(mp))).toFixed(2)}deg)`
      const pulse = i => tw(t, [[T(R.pulse + i * R.pulseGap), 0], [T(R.pulse + 0.08 + i * R.pulseGap), 1, ease.outQuad], [T(R.pulse + 0.45 + i * R.pulseGap), 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.05 * Math.sin((t - T_HOLD) * 2.4 - i * 0.5) * prog(t, T_HOLD, T_HOLD + 0.3)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, T(R.dots + i * R.dotGap), T(R.dots + i * R.dotGap + 0.18)))
        const pu = 0.6 * pulse(i)
        c.setAttribute('r', String(11.1 * p * breathe(i) * (1 + 0.45 * pu)))
        c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pu)))
      })
      cores.forEach((c, i) => {
        const p = prog(t, T(R.dots + i * R.dotGap), T(R.dots + i * R.dotGap + 0.16))
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 5.55], [1, 3.7]], ease.outQuad) * (1 + 0.22 * 0.6 * pulse(i))))
      })

      // ── wordmark + sweep, tagline
      const wp = ease.outCubic(prog(t, T(R.word), T(R.word + 0.4)))
      wordBox.style.opacity = String(wp)
      wordE.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      sweepE.style.letterSpacing = wordE.style.letterSpacing
      wordBox.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp).toFixed(2)}px)` : 'none'
      wordBox.style.transform = `translateY(${lerp(26, 0, wp).toFixed(2)}px)`
      const sw = prog(t, T(R.sweep[0]), T(R.sweep[1]))
      sweepE.style.opacity = String(sw > 0 && sw < 1 ? 0.9 * Math.sin(Math.PI * sw) ** 0.5 : 0)
      sweepE.style.backgroundPosition = `${lerp(100, 0, ease.inOutQuad(sw)).toFixed(2)}% 0`
      const sp = ease.outQuad(prog(t, T(R.sub), T(R.sub + 0.32)))
      sub.style.opacity = String(sp)
      sub.style.letterSpacing = lerp(0.46, 0.32, sp) + 'em'
      sub.style.transform = `translateY(${lerp(12, 0, sp).toFixed(2)}px)`

      const gP = tw(t, [[T(R.pulse), 0], [T(R.pulse + 0.25), 1, ease.outQuad], [T(R.pulse + 0.8), 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, T(R.rings), T(R.rings + 0.5))) * (0.88 + 0.12 * Math.sin((t - T_HOLD) * 1.9)) + 0.3 * gP)
      glow.style.transform = `scale(${(1 + 0.06 * gP).toFixed(4)})`
      lock.style.transform = `scale(${lerp(1, 1.015, prog(t, T(R.rings), END)).toFixed(4)})`
      lock.style.transformOrigin = `50% ${MARK_CY + 150}px`

      // ── sparkles: the burst on "Align.", a little one at the crown when the pulse arrives
      fx.clearRect(0, 0, W, H)
      drawBurst(fx, BURST, W / 2, LINE_Y0 + ALIGN_FS * 0.32, t, T(R.burst), 0.8)
      const crown = MARK_CY - 3 * DY * MARK / 88
      drawBurst(fx, TOPB, W / 2, crown, t, T(R.pulse + 6 * R.pulseGap + 0.04), 0.6)

      drawGrain(gx, t)
      black.style.opacity = String(t >= END - 0.035 ? 1 : ease.inOutQuad(prog(t, T(R.out), END)))
    },
  }
}

export function endcardCues(start) {
  const T = k => start + k
  return [
    ['pop', T(R.come), 659.25, 0.05, -0.1],
    ['pop', T(R.align), 987.77, 0.07, 0.1],
    ['bell', T(R.align + 0.02), 587.33, 0.04, 2.4, 0],
    ['glitter', T(R.burst - 0.02), T(R.burst + 0.6)],
    ['whoosh', T(R.rise[0] - 0.04), 0.5, 0.08],
    ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T(R.dots + i * R.dotGap), f, 0.055, 2.2, (i - 3) * 0.12]),
    ['bell', T(R.word + 0.02), 146.83, 0.045, 3.2, 0],
    ['glitter', T(R.sweep[0]), T(R.sweep[1] + 0.1)],
    ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T(R.pulse + i * R.pulseGap), f, 0.018, 1.6, (i - 3) * 0.1]),
    ['boom', T(R.out + 0.05), 0.26],
    ['bell', T(R.out + 0.06), 73.42, 0.045, 3.0, 0],
  ]
}
