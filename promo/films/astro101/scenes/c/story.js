// ─────────────────────────────────────────────── astro101 · part c (39.8–60.01)
//   39.80–40.20  H exactly (sky SKY_H, grain GRAIN_H, the bare wheel)
//   40.25–48.20  "Three placements matter most."
//     40.9  Sun in Taurus (~21° Taurus): Taurus lights, gold orb · row 1 "Sun in Taurus · who you are"
//     42.3  Moon in Sagittarius (~7° Sagittarius): Sagittarius lights, blue orb · row 2
//     43.6  the horizon line draws through the wheel; 43.9–45.9 the wheel turns (−168°) so the Ascendant,
//           ~12° Libra (May 12 1998 · 5:00 PM CDT · Tulsa), sits on the 9 o'clock horizon. The Sun lands upper right,
//           just above the western horizon, as it is at 5 PM.
//     45.6  Libra lights, the RISING marker · row 3 "Rising in Libra · how you come across"
//   47.9–48.4    wheel, rows and caption clear
//   48.3–53.5    the app's screen-onboarding-big-three.png on a phone, 1640 tall ("One sky. Three yous." is its own headline)
//   53.75        "The sky already wrote you down." types in (≈55.1 typed), holds alone to 56.4
//   56.4–56.8    the line rises; 56.6–57.1 the lockup forms (mark, chakras, "Align", "BLIND BY DESIGN")
//   59.3–60.0    fade to black (black from 59.965; the last frame is black)
import { lerp, prog, ease, tw, el, mix, C } from '../../../../src/lib.js'
import { W, H, A, SERIF, MONO, fill, img } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, WHEEL, SKY_H, GRAIN_H, drawWheelH } from '../../../wheel.js'

const T0 = 39.8, T1 = 60.01, T_END = 60.0

// ── beat 1: the Big Three
const CAP = { a: 40.25, b: 40.75, out: 47.9, gone: 48.3 }
const SUN = { t: 40.9, lon: 51.6, sign: 1, col: '#f2c75c', glyph: '☉' }
const MOON_P = { t: 42.3, lon: 247, sign: 8, col: '#6f9cf6', glyph: '☽' }
const ASC = 192, ROT = { a: 43.9, b: 45.9, to: -168 }   // rot ≡ 192: the Ascendant lands at 9 o'clock
const HORIZ = { a: 43.55, b: 44.25 }
const RISE = { t: 45.6, sign: 6, col: '#b86cf2' }
const ROWS_T = [41.25, 42.65, 45.75]
const OUT1 = { a: 47.9, b: 48.4 }
const R_ORB = 262

// ── beat 2: the phone
const PHONE = { a: 48.35, b: 49.25, out: 52.95, gone: 53.5 }
const PH_H = 1640, PH_W = Math.round(PH_H * 1170 / 2532), PH_TOP = 196

// ── beat 3: end line + lockup
const T_TYPE = 53.75, PER = 0.038, FADE = 0.13
const T_RISE = 56.4, T_RINGS = 56.62, T_DOTS = 56.68, T_WORD = 56.74, T_SUB = 56.84
const T_PULSE = 57.4, T_MOON = 57.6, T_OUT = 59.3
const T_HOLD = T_RINGS + 0.45
const LINES = ['The sky already', 'wrote you down.']
const LINE_FS = 104, LINE_Y0 = 940, LINE_Y1 = 610
const MARK = 300, MARK_CY = 1075, WORD_TOP = 1245, WORD_FS = 132, SUB_TOP = 1437, SUB_FS = 32

const rad = d => d * Math.PI / 180
const angR = (lon, rot) => Math.PI - rad(lon - rot)
const ptR = (lon, r, rot) => ({ x: WHEEL.cx + Math.cos(angR(lon, rot)) * r, y: WHEEL.cy + Math.sin(angR(lon, rot)) * r })

/** the H wheel, turned by `rot` degrees (rot 0 is exactly drawWheelH) */
function wheelRot(ctx, rot, k) {
  if (k <= 0) return
  if (Math.abs(rot) < 1e-6) return drawWheelH(ctx, { k })
  const Wl = WHEEL
  ctx.save()
  ctx.globalAlpha = Wl.alpha * k
  ctx.strokeStyle = '#efe6d6'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rOut, 0, Math.PI * 2); ctx.stroke()
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rIn, 0, Math.PI * 2); ctx.stroke()
  for (let i = 0; i < 12; i++) {
    const a = ptR(i * 30, Wl.rIn, rot), b = ptR(i * 30, Wl.rOut, rot)
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
  }
  ctx.restore()
  ctx.save()
  ctx.font = "40px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  SIGNS.forEach((s, i) => {
    const p = ptR(i * 30 + 15, Wl.rGlyph, rot)
    ctx.globalAlpha = 0.85 * k; ctx.fillStyle = s.color
    ctx.fillText(s.glyph + '︎', p.x, p.y)
  })
  ctx.restore()
}

/** light one sign's segment and glyph */
function lightSign(ctx, i, rot, k) {
  if (k <= 0.003) return
  const s = SIGNS[i], Wl = WHEEL
  const a0 = angR(i * 30, rot), a1 = angR(i * 30 + 30, rot)
  ctx.save()
  ctx.globalAlpha = 0.26 * k; ctx.fillStyle = s.color
  ctx.beginPath(); ctx.arc(Wl.cx, Wl.cy, Wl.rOut, a1, a0); ctx.arc(Wl.cx, Wl.cy, Wl.rIn, a0, a1, true); ctx.closePath(); ctx.fill()
  ctx.globalAlpha = 0.7 * k; ctx.strokeStyle = s.color; ctx.lineWidth = 2.5
  ctx.stroke()
  const p = ptR(i * 30 + 15, Wl.rGlyph, rot)
  ctx.font = "44px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.shadowColor = s.color; ctx.shadowBlur = 18 * k
  ctx.globalAlpha = k; ctx.fillStyle = mix(s.color, '#ffffff', 0.25)
  ctx.fillText(s.glyph + '︎', p.x, p.y)
  ctx.restore()
}

function orb(ctx, x, y, r, col, k, t, seed) {
  if (k <= 0.003) return
  ctx.save()
  const br = 1 + 0.06 * Math.sin(t * 2.1 + seed)
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3.4 * br)
  g.addColorStop(0, col); g.addColorStop(0.3, col + '55'); g.addColorStop(1, col + '00')
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = 0.55 * k; ctx.fillStyle = g
  ctx.beginPath(); ctx.arc(x, y, r * 3.4 * br, 0, Math.PI * 2); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  const c = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r)
  c.addColorStop(0, '#ffffff'); c.addColorStop(0.35, mix(col, '#ffffff', 0.35)); c.addColorStop(1, col)
  ctx.globalAlpha = k; ctx.fillStyle = c
  ctx.beginPath(); ctx.arc(x, y, r * (0.6 + 0.4 * k), 0, Math.PI * 2); ctx.fill()
  // a pixel-star glint
  ctx.imageSmoothingEnabled = false
  ctx.globalAlpha = k * (0.55 + 0.35 * Math.sin(t * 3 + seed))
  drawPixelStar(ctx, x + r * 0.9, y - r * 0.95, 21, 2, '#fff3e0')
  ctx.imageSmoothingEnabled = true
  ctx.restore()
}

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  await document.fonts.load(`40px 'EB Garamond'`).catch(() => {})
  await document.fonts.load(`26px 'Space Mono'`).catch(() => {})

  // ── the phone (above the sky/wheel canvas, below the grain)
  const phone = el('div', { position: 'absolute', left: (W / 2 - PH_W / 2) + 'px', top: PH_TOP + 'px', width: PH_W + 'px', height: PH_H + 'px', opacity: 0, display: 'none', willChange: 'transform, opacity', transformOrigin: '50% 55%' }, root)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '78px', overflow: 'hidden', background: C.canvas,
    boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 70px rgba(180,92,255,0.2), 0 0 0 2px rgba(239,230,214,0.35)' }, phone)
  img(scr, A + 'screen-onboarding-big-three.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })

  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ── caption + rows
  const shadow = '0 2px 26px rgba(11,6,32,0.95), 0 0 10px rgba(11,6,32,0.7)'
  const cap = el('div', { position: 'absolute', left: '90px', width: (W - 180) + 'px', top: '268px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic',
    fontSize: '76px', lineHeight: '1.08', color: C.bone, textShadow: shadow, opacity: 0 }, root, 'Three placements<br>matter most.')
  const ROWS = [
    [SUN.col, 'Sun in Taurus', 'who you are'],
    [MOON_P.col, 'Moon in Sagittarius', 'what you need'],
    [RISE.col, 'Rising in Libra', 'how you come across'],
  ]
  const rows = ROWS.map(([col, a, b], i) => {
    const r = el('div', { position: 'absolute', left: '90px', width: (W - 180) + 'px', top: (1452 + i * 84) + 'px', display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '18px',
      fontFamily: SERIF, fontStyle: 'italic', fontSize: '50px', lineHeight: '1.2', color: C.bone, textShadow: shadow, opacity: 0, whiteSpace: 'nowrap' }, root)
    el('span', { display: 'inline-block', width: '18px', height: '18px', borderRadius: '50%', background: col, boxShadow: `0 0 14px ${col}`, transform: 'translateY(-6px)', flex: 'none' }, r)
    el('span', {}, r, a)
    el('span', { color: C.label2, fontSize: '44px' }, r, '· ' + b)
    return r
  })
  const risingLbl = el('div', { position: 'absolute', left: '220px', top: '916px', fontFamily: MONO, fontSize: '24px', letterSpacing: '0.3em', color: mix(RISE.col, C.bone, 0.45), textShadow: shadow, opacity: 0 }, root, 'RISING')

  // ── end line
  const lineBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', textAlign: 'center', willChange: 'transform' }, root)
  const ACC = [C.rub, C.amber, C.gold, C.plum]
  const chars = []
  LINES.forEach(L => {
    const d = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: LINE_FS + 'px', lineHeight: '1.08', whiteSpace: 'pre', color: C.bone,
      textShadow: '0 0 30px rgba(11,6,32,0.85), 0 2px 10px rgba(11,6,32,0.7)' }, lineBox)
    for (const ch of L) chars.push(el('span', { opacity: 0 }, d, ch === ' ' ? ' ' : ch))
  })
  const LINE_BLOCK = LINE_FS * 1.08 * 2

  // ── lockup (film 3 g4 / ghosted recipe, re-laid out for 1080×1920)
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${MARK_CY + 150}px` })
  const glow = el('div', { position: 'absolute', left: (W / 2 - 520) + 'px', top: (MARK_CY - 400) + 'px', width: '1040px', height: '800px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(154,123,224,0.34), rgba(154,123,224,0.12) 55%, rgba(11,6,32,0) 100%)' }, lock)
  const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CHK.map((c, i) => `<radialGradient id="a1g${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="a1c${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px', opacity: 0 }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.15" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#a1g${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#a1c${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.1, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'BLIND BY DESIGN')

  const black = fill(root, { background: '#000', opacity: 0 })

  return {
    start: T0, end: T1, root,
    update(t) {
      // ════════ sky: H throughout; the moon glows a touch as the lockup holds
      drawSky(bx, t, SKY_H)
      const M = SKY_H.moon
      const mb = tw(t, [[T_MOON, 0], [T_MOON + 0.4, 1, ease.outQuad], [59.2, 0.55, ease.inOutQuad]])
      if (mb > 0.003) {
        const g = bx.createRadialGradient(M.x, M.y, M.r * 0.8, M.x, M.y, M.r * 3.2)
        g.addColorStop(0, `rgba(255,240,214,${0.16 * mb})`); g.addColorStop(1, 'rgba(255,240,214,0)')
        bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(M.x - M.r * 3.3, M.y - M.r * 3.3, M.r * 6.6, M.r * 6.6)
        bx.globalCompositeOperation = 'source-over'
      }

      // ════════ beat 1: the wheel and the Big Three
      const wk = 1 - ease.inOutQuad(prog(t, OUT1.a, OUT1.b))
      const rot = ROT.to * ease.inOutCubic(prog(t, ROT.a, ROT.b))
      if (wk > 0) {
        const sunK = ease.outCubic(prog(t, SUN.t, SUN.t + 0.8)), moonK = ease.outCubic(prog(t, MOON_P.t, MOON_P.t + 0.8))
        const riseK = ease.outCubic(prog(t, RISE.t, RISE.t + 0.8))
        // light segments under the ring lines
        lightSign(bx, SUN.sign, rot, sunK * wk)
        lightSign(bx, MOON_P.sign, rot, moonK * wk)
        lightSign(bx, RISE.sign, rot, riseK * wk)
        wheelRot(bx, rot, wk)
        // the horizon line (dashed, through the centre) draws outward from the centre
        const hk = ease.inOutCubic(prog(t, HORIZ.a, HORIZ.b))
        if (hk > 0) {
          const half = 440 * hk
          bx.save(); bx.globalAlpha = 0.55 * wk; bx.strokeStyle = '#efe6d6'; bx.lineWidth = 2; bx.setLineDash([10, 9])
          bx.beginPath(); bx.moveTo(WHEEL.cx - half, WHEEL.cy); bx.lineTo(WHEEL.cx + half, WHEEL.cy); bx.stroke(); bx.restore()
        }
        // planet orbs (ride with the wheel) + their glyphs toward the centre
        for (const [P, k, seed] of [[SUN, sunK, 1], [MOON_P, moonK, 2.4]]) {
          if (k <= 0) continue
          const p = ptR(P.lon, R_ORB, rot), q = ptR(P.lon, R_ORB - 66, rot)
          // a thin tick from the orb to the ring
          const r0 = ptR(P.lon, R_ORB + 22, rot), r1 = ptR(P.lon, WHEEL.rIn, rot)
          bx.save(); bx.globalAlpha = 0.5 * k * wk; bx.strokeStyle = P.col; bx.lineWidth = 2
          bx.beginPath(); bx.moveTo(r0.x, r0.y); bx.lineTo(r1.x, r1.y); bx.stroke(); bx.restore()
          orb(bx, p.x, p.y, 17, P.col, k * wk, t, seed)
          bx.save(); bx.font = "38px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"; bx.textAlign = 'center'; bx.textBaseline = 'middle'
          bx.globalAlpha = 0.9 * k * wk; bx.fillStyle = mix(P.col, '#efe6d6', 0.4); bx.fillText(P.glyph + '︎', q.x, q.y); bx.restore()
        }
        // the Ascendant marker on the left horizon point
        if (riseK > 0) {
          const p = ptR(ASC, WHEEL.rOut, ROT.to)
          orb(bx, p.x, p.y, 14, RISE.col, riseK * wk, t, 4.1)
        }
        risingLbl.style.opacity = String(riseK * wk)
      } else risingLbl.style.opacity = '0'
      cap.style.opacity = String(ease.outQuad(prog(t, CAP.a, CAP.b)) * (1 - ease.inOutQuad(prog(t, CAP.out, CAP.gone))))
      cap.style.transform = `translateY(${lerp(14, 0, ease.outCubic(prog(t, CAP.a, CAP.b + 0.2)))}px)`
      rows.forEach((r, i) => {
        const p = ease.outCubic(prog(t, ROWS_T[i], ROWS_T[i] + 0.55))
        r.style.opacity = String(p * wk)
        r.style.transform = `translateY(${lerp(16, 0, p)}px)`
      })

      // ════════ beat 2: the phone
      const pin = ease.outCubic(prog(t, PHONE.a, PHONE.b)), pout = ease.inOutQuad(prog(t, PHONE.out, PHONE.gone))
      const pa = ease.outQuad(prog(t, PHONE.a, PHONE.a + 0.6)) * (1 - pout)
      phone.style.display = pa > 0.002 ? 'block' : 'none'
      if (pa > 0.002) {
        const hold = prog(t, PHONE.b, PHONE.out)
        phone.style.opacity = String(pa)
        phone.style.transform = `translateY(${lerp(170, 0, pin) - 60 * pout}px) scale(${(1 + 0.018 * hold) * (1 - 0.03 * pout)})`
      }

      // ════════ beat 3: the end line, typed with an accent shimmer
      chars.forEach((s, i) => {
        const t0 = T_TYPE + i * PER
        const p = prog(t, t0, t0 + FADE)
        s.style.opacity = String(ease.outQuad(p))
        s.style.color = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
      })
      const rise = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.4))
      const ly = lerp(LINE_Y0, LINE_Y1, rise) - LINE_BLOCK / 2
      lineBox.style.transform = `translateY(${ly}px) scale(${lerp(0.985, 1, ease.outCubic(prog(t, T_TYPE, T_TYPE + 0.8)))})`

      // ── lockup
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.025, T_RINGS + 0.3 + i * 0.025)))))
      const pulse = i => 0.6 * tw(t, [[T_PULSE + i * 0.05, 0], [T_PULSE + 0.07 + i * 0.05, 1, ease.outQuad], [T_PULSE + 0.45 + i * 0.05, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.05 * Math.sin((t - T_HOLD) * 2.4 - i * 0.5) * prog(t, T_HOLD, T_HOLD + 0.3)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, T_DOTS + i * 0.035, T_DOTS + i * 0.035 + 0.18))
        c.setAttribute('r', String(11.1 * p * breathe(i) * (1 + 0.45 * pulse(i))))
        c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, T_DOTS + i * 0.035, T_DOTS + i * 0.035 + 0.16)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 5.55], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      svg.style.opacity = String(prog(t, T_RINGS - 0.02, T_RINGS + 0.12))
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, T_RINGS, T_RINGS + 0.45)))})`
      const wp = ease.outCubic(prog(t, T_WORD, T_WORD + 0.4))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp)}px)` : 'none'
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      const sp = ease.outQuad(prog(t, T_SUB, T_SUB + 0.35))
      sub.style.opacity = String(sp)
      sub.style.letterSpacing = lerp(0.42, 0.32, sp) + 'em'
      const gP = tw(t, [[T_PULSE, 0], [T_PULSE + 0.3, 1, ease.outQuad], [T_PULSE + 0.85, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, T_RINGS, T_RINGS + 0.6)) * (0.88 + 0.12 * Math.sin((t - T_HOLD) * 1.9)) + 0.3 * gP)
      glow.style.transform = `scale(${1 + 0.06 * gP})`
      lock.style.transform = `scale(${lerp(1, 1.012, prog(t, T_RINGS, T_END))})`

      drawGrain(gx, t)
      gC.style.opacity = String(GRAIN_H * (1 - 0.3 * pa))
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

const TYPED = LINES.join('')
export const cues = [
  ['bell', SUN.t + 0.05, 587.33, 0.04, 2.2, -0.15],                          // Sun in Taurus
  ['bell', MOON_P.t + 0.05, 493.88, 0.04, 2.2, 0.15],                        // Moon in Sagittarius
  ['whoosh', ROT.a + 0.1, 1.6, 0.03],                                        // the wheel turns to the Ascendant
  ['bell', RISE.t + 0.05, 659.25, 0.04, 2.4, -0.3],                          // Rising in Libra
  ['whoosh', PHONE.a, 0.9, 0.032],                                           // the phone rises
  ['glitter', PHONE.b - 0.2, PHONE.b + 0.4],
  ...[...TYPED].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.02]).filter(Boolean),
  ['bell', T_TYPE + 0.02, 587.33, 0.045, 2.6, 0],
  ['whoosh', T_RISE - 0.02, 0.5, 0.07],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T_DOTS + i * 0.035, f, 0.05, 2.2, (i - 3) * 0.12]),
  ['boom', T_WORD, 0.16],
  ['bell', T_WORD + 0.02, 146.83, 0.045, 3.2, 0],
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_PULSE + i * 0.05, f, 0.016, 1.6, (i - 3) * 0.1]),
  ['boom', T_OUT + 0.05, 0.24],
  ['bell', T_OUT + 0.06, 73.42, 0.045, 3.0, 0],
]
