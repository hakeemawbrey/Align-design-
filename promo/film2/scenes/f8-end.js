// ─────────────────────────────────────────────── F8 · END (real time 26.6–30.0)
// One sky spine: the SAME S1 nebula / stars / crescent moon / grain as f3–f7 (paintSky from f7, which wraps
// f3's drawSky with the continuing camera drift), so the f7→f8 handoff is a pure content crossfade, then the
// Align lockup (S8 language).
// Timing (sound):
//   26.60–26.80 crossfade over f7 (identical sky; f7's phone + caption are already drifting out 26.35–26.8)
//   26.68 "Take a chance on the stars." types in (27 chars × 0.0175, fade 0.12 → fully typed 27.26), centred, 104px
//   27.30–28.30 HELD still (the emotional line) · 27.42–27.86 a soft gold shimmer passes through it
//               · 27.62–28.06 a shooting star crosses top-left → right
//   28.28–28.58 the line rises to the top third (104 → 97px) as the lockup forms beneath it
//   28.42–28.80 seed-of-life rings draw · chakra dots light bottom→top 28.46 + i·0.03 (→ 28.79)
//   28.48–28.80 wordmark "Align" · 28.52–28.80 sub-line "BLIND BY DESIGN"
//   28.80–29.60 lockup HELD (only a slow breathe) · 29.05 one soft chakra pulse up the column · 29.2 the moon brightens
//   fade to black 29.60 → 30.00 (a black plate reaches 1.0 exactly at 30.0)
import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C } from '../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../src/scenes/common.js'
import { buildStarSprite, drawGrain } from './f3-chart.js'
import { paintSky, grainCanvas, skyPan, skyZoom } from './f7-talk.js'

const T0 = 26.6, T1 = 30.01
const T_TYPE = 26.68, PER = 0.0175, FADE = 0.12
const T_SHIM = 27.42, T_RISE = 28.28, T_RINGS = 28.42, T_DOTS = 28.46
const T_WORD = 28.48, T_SUB = 28.52, T_PULSE = 29.05, T_OUT = 29.6
const LINE = 'Take a chance on the stars.'
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }

// pixel-art star sprites (S1 / fx-stars language)
const STAR_SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x, y, ch === 'C'])).filter(Boolean))
function drawPixelStar(ctx, cx, cy, px, kind, color, centre, a) {
  ctx.globalAlpha = a
  const x0 = Math.round(cx - px * 3.5), y0 = Math.round(cy - px * 3.5)
  for (const [x, y, c] of STAR_SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
  ctx.globalAlpha = 1
}

// ── layout (1920×1080): line rises to y≈250; lockup block beneath, centred on the frame
const LINE_Y0 = H / 2, LINE_Y1 = 250, LINE_FS = 104, LINE_S1 = 0.93   // ≥96px after the rise
const MARK = 250, MARK_CY = 492, WORD_TOP = 632, WORD_FS = 118, SUB_TOP = 806, SUB_FS = 30
const MOON = { x: 1590, y: 214, r: 58 }

export default function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  bgC.width = W; bgC.height = H
  const bx = bgC.getContext('2d')
  const spriteS = buildStarSprite(true)
  // indigo pocket behind the type/lockup column (bone holds ≥ 7:1)
  const pocket = canvas(W, H), pk = pocket.getContext('2d')
  pk.save(); pk.translate(W / 2, H / 2); pk.scale(1, 0.62)
  const pg = pk.createRadialGradient(0, 0, 0, 0, 0, 820)
  pg.addColorStop(0, 'rgba(11,6,32,0.62)'); pg.addColorStop(0.6, 'rgba(11,6,32,0.42)'); pg.addColorStop(1, 'rgba(11,6,32,0)')
  pk.fillStyle = pg; pk.fillRect(-1000, -1000, 2000, 2000); pk.restore()

  // pixel twinkles (fx-stars palette), deterministic positions
  const pr = rng(4471), PIXC = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ff8fb1', '#c9a6ff', '#ffd98a']
  const PIX = []
  while (PIX.length < 26) {
    const x = pr() * W, y = pr() * H
    if (x > 520 && x < 1400 && y > 150 && y < 870) continue
    if (x > 1580 && y < 260) continue                         // clear of the moon
    PIX.push({ x, y, px: pr() < 0.3 ? 4 : 3, col: PIXC[Math.floor(pr() * PIXC.length)], ph: pr() * 6.28, sp: 2 + pr() * 3, kind: Math.floor(pr() * 4), t0: T0 + pr() * 0.9 })
  }

  // ── closing line (per-char spans: typed with an accent shimmer, then a gold wave passes through)
  const lineBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', textAlign: 'center', transformOrigin: '50% 50%', willChange: 'transform' }, root)
  const lineE = el('div', { display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontSize: LINE_FS + 'px', lineHeight: '1', whiteSpace: 'pre', color: C.bone,
    textShadow: '0 0 30px rgba(11,6,32,0.85), 0 2px 10px rgba(11,6,32,0.7)' }, lineBox)
  const chars = [...LINE].map(ch => el('span', { opacity: 0 }, lineE, ch === ' ' ? ' ' : ch))
  const ACC = [C.rub, C.amber, C.gold, C.plum]

  // ── lockup (S8 recipe): seed-of-life rings + chakra column, wordmark, sub-line
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${MARK_CY + 120}px` })
  const glow = el('div', { position: 'absolute', left: (W / 2 - 520) + 'px', top: (MARK_CY - 380) + 'px', width: '1040px', height: '760px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(154,123,224,0.34), rgba(154,123,224,0.12) 55%, rgba(11,6,32,0) 100%)' }, lock)
  const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CHK.map((c, i) => `<radialGradient id="f8g${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="f8c${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px' }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.15" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#f8g${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#f8c${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.1, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'BLIND BY DESIGN')

  // grain over everything in the scene (type included), then the final black plate
  const gx = grainCanvas(root, 0.55)
  const black = fill(root, { background: '#000', opacity: 0 })

  return {
    start: T0, end: T1, root,
    update(t) {
      // crossfade over f7: the sky underneath is identical, so only f7's (already fading) content dissolves
      root.style.opacity = String(ease.inOutQuad(prog(t, T0, T0 + 0.2)))
      const out = ease.inOutQuad(prog(t, T_OUT, 30.0))
      const pan = skyPan(t), z = skyZoom(t)
      const driftX = pan[0], driftY = pan[1]
      // the crescent moon (S1's motif) brightens as the lockup completes
      const mb = tw(t, [[29.1, 0], [29.35, 1, ease.outQuad], [29.9, 0.6, ease.inOutQuad]])
      paintSky(bx, t, { moonGlow: 3 + 2.4 * mb })
      // shooting star: a wish crossing the top-left as the line finishes
      {
        const p = prog(t, 27.62, 28.06)
        if (p > 0 && p < 1) {
          const e = ease.inOutQuad(p)
          const x0 = 180, y0 = 96, x1 = 980, y1 = 300
          const hx = lerp(x0, x1, e), hy = lerp(y0, y1, e)
          const tl = 340 * Math.sin(Math.PI * Math.min(1, p * 1.3))
          const ang = Math.atan2(y1 - y0, x1 - x0)
          const a = Math.sin(Math.PI * p)
          const g = bx.createLinearGradient(hx - Math.cos(ang) * tl, hy - Math.sin(ang) * tl, hx, hy)
          g.addColorStop(0, 'rgba(255,226,180,0)'); g.addColorStop(0.7, `rgba(255,232,200,${0.5 * a})`); g.addColorStop(1, `rgba(255,252,244,${a})`)
          bx.strokeStyle = g; bx.lineWidth = 3.2; bx.lineCap = 'round'
          bx.beginPath(); bx.moveTo(hx - Math.cos(ang) * tl, hy - Math.sin(ang) * tl); bx.lineTo(hx, hy); bx.stroke()
          bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = a
          bx.drawImage(spriteS, hx - 30, hy - 30, 60, 60)
          bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
        }
      }
      // pixel twinkles
      bx.imageSmoothingEnabled = false
      const tick = Math.round(t * 30) >> 1
      PIX.forEach((s, i) => {
        const a = ease.outQuad(prog(t, s.t0, s.t0 + 0.3)) * (0.45 + 0.55 * Math.sin(t * s.sp + s.ph))
        if (a <= 0.02) return
        drawPixelStar(bx, s.x + driftX * 1.2, s.y + driftY * 1.2, s.px, (tick + i) % 5 === 0 ? 2 : s.kind, s.col, '#fff3e0', a)
      })
      bx.imageSmoothingEnabled = true
      bx.globalAlpha = ease.inOutQuad(prog(t, T0, T0 + 0.7)); bx.drawImage(pocket, 0, 0); bx.globalAlpha = 1

      // ── the line
      const n = chars.length
      chars.forEach((s, i) => {
        const t0 = T_TYPE + i * PER
        const p = prog(t, t0, t0 + FADE)
        // gold wave after typing (left → right)
        const wv = Math.exp(-Math.pow((t - (T_SHIM + i * 0.016)) / 0.09, 2))
        s.style.opacity = String(ease.outQuad(p))
        const base = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
        s.style.color = wv > 0.02 ? mix(p >= 1 ? '#efe6d6' : '#efe6d6', '#ffe6a8', wv) : base
        s.style.textShadow = wv > 0.02 ? `0 0 ${18 * wv}px rgba(242,199,92,${0.8 * wv}), 0 0 30px rgba(11,6,32,0.85)` : ''
      })
      const rise = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.3))
      const ly = lerp(LINE_Y0, LINE_Y1, rise) - LINE_FS * 0.55
      lineBox.style.transform = `translateY(${ly}px) scale(${lerp(1, LINE_S1, rise) * lerp(0.985, 1, ease.outCubic(prog(t, T_TYPE, T_TYPE + 0.56)))})`

      // ── lockup
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.02, T_RINGS + 0.24 + i * 0.02)))))
      const pulse = i => 0.6 * tw(t, [[T_PULSE + i * 0.05, 0], [T_PULSE + 0.07 + i * 0.05, 1, ease.outQuad], [T_PULSE + 0.4 + i * 0.05, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.05 * Math.sin((t - 28.8) * 2.4 - i * 0.5) * prog(t, 28.8, 29.1)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, T_DOTS + i * 0.03, T_DOTS + i * 0.03 + 0.15))
        c.setAttribute('r', String(11.1 * p * breathe(i) * (1 + 0.45 * pulse(i))))
        c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, T_DOTS + i * 0.03, T_DOTS + i * 0.03 + 0.14)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 5.55], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      svg.style.opacity = String(prog(t, T_RINGS - 0.02, T_RINGS + 0.1))
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, T_RINGS, T_RINGS + 0.38)))})`
      const wp = ease.outCubic(prog(t, T_WORD, T_WORD + 0.32))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp)}px)` : 'none'
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      const sp = ease.outQuad(prog(t, T_SUB, T_SUB + 0.28))
      sub.style.opacity = String(sp)
      sub.style.letterSpacing = lerp(0.42, 0.32, sp) + 'em'
      const gP = tw(t, [[T_PULSE, 0], [T_PULSE + 0.25, 1, ease.outQuad], [T_PULSE + 0.75, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, T_RINGS, T_RINGS + 0.5)) * (0.88 + 0.12 * Math.sin((t - 28.8) * 1.9)) + 0.3 * gP)
      glow.style.transform = `scale(${1 + 0.06 * gP})`
      lock.style.transform = `scale(${lerp(1, 1.012, prog(t, T_RINGS, 30))})`

      // ── grain + fade to black (content dims through 29.5–30.0; plate reaches 1 exactly at 30.0)
      drawGrain(gx, t)
      black.style.opacity = String(out)
    },
  }
}

export const cues = [
  ['riser', 26.45, 26.8, 0.03],
  ...[...LINE].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.022]).filter(Boolean),  // typing
  ['bell', T_TYPE + 0.02, 587.33, 0.04, 2.6, 0],          // the line arrives (D5)
  ['glitter', T_SHIM, T_SHIM + 0.5],                       // gold shimmer through the words
  ['whoosh', 27.6, 0.5, 0.05],                             // shooting star
  ['bell', 27.86, 1318.51, 0.03, 1.8, 0.35],
  ['whoosh', T_RISE - 0.02, 0.5, 0.08],                    // line rises, rings draw
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T_DOTS + i * 0.03, f, 0.06, 2.2, (i - 3) * 0.12]),  // chakra chimes bottom→top
  ['boom', T_WORD, 0.22],                                  // wordmark lands
  ['bell', T_WORD + 0.02, 146.83, 0.05, 3.2, 0],
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_PULSE + i * 0.05, f, 0.018, 1.6, (i - 3) * 0.1]),  // soft pulse up the column
]
