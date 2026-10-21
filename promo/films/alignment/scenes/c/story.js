// ─────────────────────────────────────────────── ALIGNMENT part c (39.8–60.01), vertical 1080×1920
// Starts on H (sky + bone wheel, nothing else) and ends on black.
//   39.80–40.20  exactly H
//   40.30        "And sometimes, one planet / rules you both." types in (fully typed ≈41.9, held to 45.75)
//   41.00–41.90  the other ten glyphs dim; Taurus and Libra light their wedges
//   42.20–43.00  ♀ Venus (a glowing orb) blooms at the centre of the wheel, label "VENUS" above it
//   42.95–43.85  two links draw from Venus out to Taurus and to Libra
//   43.10        sub-caption "Venus rules Taurus and Libra." + "♉ YOUR SUN · HER SUN ♎" (fully readable 43.5–45.65)
//   45.75–46.55  caption, sub-caption, Venus and the wheel clear (sky only from 46.55)
//   46.30–47.20  the phone (screen-alignment.png, 1500 tall) rises in: "Venus rules you both."
//   46.55        "Align turns every angle / into a reading." types (fully typed ≈48.1, held to 53.3)
//   47.95 · 49.30 · 50.65  reading cards rise in turn: Pull · Push · Align (each readable ≥2.4 s)
//   53.30–53.95  caption, phone and cards clear
//   54.10        "See how you align." types in (≈55.0), holds alone; 55.90–56.30 rises to y≈600
//   56.00–56.55  lockup: seed-of-life rings, chakra dots, "Align", "BLIND BY DESIGN" (complete ≈56.55)
//   57.40 one chakra pulse · 57.55 the moon glows a touch
//   59.30–60.00  fade to black (last frame black)
import { lerp, prog, ease, tw, el, mix, C, TypeLine } from '../../../../src/lib.js'
import { W, H, A, SERIF, MONO, fill, img } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, READING, WHEEL, SKY_H, GRAIN_H, ptOf, angOf, signMid, drawWheelH } from '../../../wheel.js'

const T0 = 39.8, T1 = 60.01, T_END = 60.0
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const VS = '︎' // text presentation

// ── beat 1: Venus rules you both
const CAP1 = { type: 40.3, out: 45.75 }
const DIM = { a: 41.0, b: 41.9, out: 45.75, gone: 46.55 }
const VEN = { a: 42.2, b: 43.0 }
const LINK = { a: 42.95, b: 43.85 }
const SUB1 = { a: 43.1, out: 46.05 }
const VENUS_COL = '#f6c9dc'
const PAIR = [{ s: SIGNS[1], lon: signMid('taurus') }, { s: SIGNS[6], lon: signMid('libra') }]

// ── beat 2: the reading
const PHONE = { a: 46.3, b: 47.2, out: 53.3, gone: 53.95 }
const PH_H = 1500, PH_W = Math.round(PH_H * 1170 / 2532), PH_TOP = 470
const CAP2 = { type: 46.55, out: 53.3 }
const CARDS = [
  { id: 'pull', t: 47.95, label: 'PULL', eb: 'WHAT DRAWS YOU IN', head: 'She answers like you do.', top: 1112, h: 176 },
  { id: 'push', t: 49.3, label: 'PUSH', eb: 'WHERE YOU PUSH BACK', head: 'You want the last word.\nShe wants silence.', top: 1312, h: 236 },
  { id: 'align', t: 50.65, label: 'ALIGN', eb: 'WHERE IT HOLDS', head: 'You read rooms the same way.', top: 1572, h: 176 },
]
const CARD_X = 100, CARD_W = 880

// ── beat 3: end line + lockup
const LINE = 'See how you align.'
const T_TYPE = 54.1, PER = 0.045, FADE = 0.12
const AL0 = LINE.indexOf('align'), AL1 = AL0 + 4, T_GLINT = 55.25
const T_RISE = 55.9, T_RINGS = 56.0, T_DOTS = 56.05, T_WORD = 56.12, T_SUB = 56.22
const T_PULSE = 57.4, T_MOON = 57.55, T_OUT = 59.3
const T_HOLD = T_RINGS + 0.45
const LINE_Y0 = H / 2, LINE_Y1 = 600, LINE_FS = 108
const MARK = 300, MARK_CY = 900, WORD_TOP = 1072, WORD_FS = 136, SUB_TOP = 1262, SUB_FS = 32
const MOON = SKY_H.moon

const capStyle = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '74px', lineHeight: '1.12', color: C.bone, textAlign: 'center',
  left: '0', width: W + 'px', textShadow: '0 2px 26px rgba(11,6,32,0.95), 0 0 10px rgba(11,6,32,0.7)' }

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  await document.fonts.load(`40px 'EB Garamond'`).catch(() => {})
  await document.fonts.load(`italic 74px 'EB Garamond'`).catch(() => {})
  await document.fonts.load(`30px 'Space Mono'`).catch(() => {})

  // ── the phone (DOM, above the sky, below the grain)
  const phone = el('div', { position: 'absolute', left: (W / 2 - PH_W / 2) + 'px', top: PH_TOP + 'px', width: PH_W + 'px', height: PH_H + 'px', opacity: 0, willChange: 'transform, opacity', transformOrigin: '50% 40%' }, root)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '74px', overflow: 'hidden', background: C.canvas,
    boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 80px rgba(180,92,255,0.22), 0 0 0 2px rgba(239,230,214,0.35)' }, phone)
  img(scr, A + 'screen-alignment.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  // under the cards the screen's lower half sinks into shadow (no doubled headline under the Pull card)
  const shade = el('div', { position: 'absolute', left: 0, width: '100%', top: Math.round(0.37 * PH_H) + 'px', bottom: 0, opacity: 0,
    background: 'linear-gradient(180deg, rgba(11,6,32,0) 0px, rgba(11,6,32,0.9) 70px, rgba(11,6,32,0.94) 100%)' }, scr)

  // grain over sky + phone; type sits above it
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ── captions
  const cap1 = new TypeLine(root, 'And sometimes, one planet\nrules you both.', { ...capStyle, top: '268px' }, { perChar: 0.035, fade: 0.26, accent: [VENUS_COL, C.gold, '#e163d6'] })
  const sub1 = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1428px', textAlign: 'center', opacity: 0 }, root)
  el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '52px', lineHeight: '1.1', color: C.bone, textShadow: '0 2px 20px rgba(11,6,32,0.95)' }, sub1, 'Venus rules Taurus and Libra.')
  el('div', { marginTop: '26px', fontFamily: MONO, fontSize: '28px', letterSpacing: '0.24em', textIndent: '0.24em', color: C.bone, opacity: 0.82, textShadow: '0 0 14px rgba(11,6,32,0.95)', whiteSpace: 'pre' }, sub1,
    `<span style="font-family:${GLYPH_FONT};color:${SIGNS[1].color};letter-spacing:0;font-size:34px">♉${VS}</span> YOUR SUN  ·  HER SUN <span style="font-family:${GLYPH_FONT};color:${SIGNS[6].color};letter-spacing:0;font-size:34px">♎${VS}</span>`)
  const cap2 = new TypeLine(root, 'Align turns every angle\ninto a reading.', { ...capStyle, top: '268px' }, { perChar: 0.035, fade: 0.26, accent: [READING.pull, READING.push, READING.align] })

  // ── reading cards
  const cards = CARDS.map(c => {
    const col = READING[c.id]
    const card = el('div', { position: 'absolute', left: CARD_X + 'px', top: c.top + 'px', width: CARD_W + 'px', height: c.h + 'px', boxSizing: 'border-box', padding: '34px 44px 0', borderRadius: '30px', opacity: 0,
      background: 'linear-gradient(160deg, rgba(40,24,86,0.95), rgba(22,12,52,0.96))',
      boxShadow: `0 30px 60px rgba(4,2,14,0.6), 0 0 0 1.5px ${col}88 inset, 0 0 46px ${col}26`, willChange: 'transform, opacity' }, root)
    el('div', { position: 'absolute', left: 0, top: '26px', bottom: '26px', width: '5px', borderRadius: '0 4px 4px 0', background: col, boxShadow: `0 0 16px ${col}` }, card)
    el('div', { fontFamily: MONO, fontSize: '26px', letterSpacing: '0.22em', color: col, whiteSpace: 'pre', fontWeight: 700 }, card, `${c.label}  ·  ${c.eb}`)
    el('div', { marginTop: '14px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '58px', lineHeight: '1.08', color: C.bone, whiteSpace: 'pre' }, card, c.head)
    return { card, c }
  })

  // ── end line (per-char spans)
  const lineBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', textAlign: 'center', willChange: 'transform' }, root)
  const lineE = el('div', { display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontSize: LINE_FS + 'px', lineHeight: '1', whiteSpace: 'pre', color: C.bone,
    textShadow: '0 0 30px rgba(11,6,32,0.85), 0 2px 10px rgba(11,6,32,0.7)' }, lineBox)
  const chars = [...LINE].map(ch => el('span', { opacity: 0 }, lineE, ch === ' ' ? ' ' : ch))
  const ACC = [READING.pull, READING.push, READING.align, READING.relationship]

  // ── lockup (film 3 g4 / ghosted recipe, laid out for vertical)
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${MARK_CY + 140}px` })
  const glow = el('div', { position: 'absolute', left: (W / 2 - 520) + 'px', top: (MARK_CY - 400) + 'px', width: '1040px', height: '900px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(154,123,224,0.34), rgba(154,123,224,0.12) 55%, rgba(11,6,32,0) 100%)' }, lock)
  const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CHK.map((c, i) => `<radialGradient id="alg${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="alc${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px', opacity: 0 }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.15" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#alg${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#alc${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.1, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'BLIND BY DESIGN')

  const black = fill(root, { background: '#000', opacity: 0 })

  // ── canvas pieces
  function wedge(ctx, i, alpha, col) {
    const a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
    ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = col; ctx.globalCompositeOperation = 'lighter'
    ctx.beginPath(); ctx.arc(WHEEL.cx, WHEEL.cy, WHEEL.rOut, a1, a0); ctx.arc(WHEEL.cx, WHEEL.cy, WHEEL.rIn, a0, a1, true); ctx.closePath(); ctx.fill()
    ctx.restore()
  }
  function glyph(ctx, s, lon, alpha, scale = 1, glowK = 0) {
    const p = ptOf(lon, WHEEL.rGlyph)
    ctx.save()
    ctx.font = `${40 * scale}px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    if (glowK > 0) { ctx.shadowColor = s.color; ctx.shadowBlur = 24 * glowK }
    ctx.globalAlpha = alpha; ctx.fillStyle = s.color
    ctx.fillText(s.glyph + VS, p.x, p.y)
    ctx.restore()
  }
  function venus(ctx, t, k) {
    if (k <= 0.002) return
    const { cx, cy } = WHEEL
    const r = 46 * lerp(0.6, 1, ease.outCubic(k)) * (1 + 0.02 * Math.sin(t * 2.2))
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    const halo = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 3.4)
    halo.addColorStop(0, `rgba(246,201,220,${0.42 * k})`); halo.addColorStop(0.45, `rgba(233,150,200,${0.14 * k})`); halo.addColorStop(1, 'rgba(233,150,200,0)')
    ctx.fillStyle = halo; ctx.fillRect(cx - r * 3.5, cy - r * 3.5, r * 7, r * 7)
    ctx.globalCompositeOperation = 'source-over'
    const orb = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r)
    orb.addColorStop(0, `rgba(255,246,240,${k})`); orb.addColorStop(0.5, `rgba(246,201,220,${k})`); orb.addColorStop(1, `rgba(214,128,180,${k})`)
    ctx.fillStyle = orb; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = k
    ctx.font = `${Math.round(r * 1.25)}px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = '#3a1640'; ctx.fillText('♀' + VS, cx, cy + r * 0.04)
    // pixel-star glint on the orb's shoulder
    const gl = 0.6 + 0.4 * Math.sin(t * 3.1)
    ctx.globalAlpha = k * gl
    drawPixelStar(ctx, cx + r * 0.62, cy - r * 0.66, 21, 0, '#ffd9ec')
    ctx.globalAlpha = k * 0.9
    ctx.font = `26px 'Space Mono', monospace`; ctx.letterSpacing = '7px'; ctx.fillStyle = C.bone
    ctx.shadowColor = 'rgba(11,6,32,0.95)'; ctx.shadowBlur = 12
    ctx.fillText('VENUS', cx + 3.5, cy - r - 34)
    ctx.restore()
  }
  function link(ctx, t, lon, col, p, k) {
    if (p <= 0 || k <= 0) return
    const a = ptOf(lon, 70), b = ptOf(lon, WHEEL.rIn - 6)
    const x = lerp(a.x, b.x, p), y = lerp(a.y, b.y, p)
    ctx.save()
    const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
    g.addColorStop(0, VENUS_COL); g.addColorStop(1, col)
    ctx.strokeStyle = g; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.globalAlpha = 0.85 * k
    ctx.shadowColor = col; ctx.shadowBlur = 10
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(x, y); ctx.stroke()
    // travelling spark while drawing
    const sp = Math.sin(Math.PI * Math.min(1, p)) * k
    if (sp > 0.02) {
      ctx.globalCompositeOperation = 'lighter'
      const s = ctx.createRadialGradient(x, y, 0, x, y, 18)
      s.addColorStop(0, `rgba(255,240,230,${0.8 * sp})`); s.addColorStop(1, 'rgba(255,240,230,0)')
      ctx.fillStyle = s; ctx.fillRect(x - 18, y - 18, 36, 36)
    }
    ctx.restore()
  }

  return {
    start: T0, end: T1, root,
    update(t) {
      // ── sky (H throughout) + the moon's glow at the end
      drawSky(bx, t, SKY_H)
      const mb = tw(t, [[T_MOON, 0], [T_MOON + 0.3, 1, ease.outQuad], [59.2, 0.55, ease.inOutQuad]])
      if (mb > 0.003) {
        const g = bx.createRadialGradient(MOON.x, MOON.y, MOON.r * 0.8, MOON.x, MOON.y, MOON.r * 3.2)
        g.addColorStop(0, `rgba(255,240,214,${0.16 * mb})`); g.addColorStop(1, 'rgba(255,240,214,0)')
        bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(MOON.x - MOON.r * 3.3, MOON.y - MOON.r * 3.3, MOON.r * 6.6, MOON.r * 6.6)
        bx.globalCompositeOperation = 'source-over'
      }

      // ── beat 1: the wheel, the pair, Venus
      const wk = 1 - ease.inOutQuad(prog(t, DIM.out, DIM.gone))            // whole diagram clears
      const d = ease.inOutQuad(prog(t, DIM.a, DIM.b)) * wk                  // highlight amount
      if (wk > 0.002) {
        drawWheelH(bx, { k: wk, glyphK: 1 - 0.65 * ease.inOutQuad(prog(t, DIM.a, DIM.b)) })
        if (d > 0.002) {
          const pulse = 1 + 0.08 * Math.sin((t - DIM.b) * 2.2) * prog(t, DIM.b, DIM.b + 0.6)
          PAIR.forEach(({ s, lon }, j) => {
            const i = SIGNS.indexOf(s)
            const dj = d * ease.inOutQuad(prog(t, DIM.a + 0.3 + j * 0.15, DIM.b + 0.15 + j * 0.15))
            wedge(bx, i, 0.16 * dj * pulse, s.color)
            glyph(bx, s, lon, 0.9 * dj, lerp(1, 1.28, dj), dj)
          })
        }
        venus(bx, t, ease.inOutQuad(prog(t, VEN.a, VEN.b)) * wk)
        PAIR.forEach(({ s, lon }, j) => link(bx, t, lon, s.color, ease.inOutCubic(prog(t, LINK.a + j * 0.12, LINK.b + j * 0.12)), wk))
      }

      cap1.update(t - CAP1.type, { out: CAP1.out - CAP1.type })
      sub1.style.opacity = String(ease.inOutQuad(prog(t, SUB1.a, SUB1.a + 0.4)) * (1 - ease.inOutQuad(prog(t, SUB1.out - 0.4, SUB1.out))))
      sub1.style.transform = `translateY(${lerp(14, 0, ease.outCubic(prog(t, SUB1.a, SUB1.a + 0.6)))}px)`

      // ── beat 2: phone + cards
      const pin = ease.outCubic(prog(t, PHONE.a, PHONE.b)), pout = ease.inOutQuad(prog(t, PHONE.out, PHONE.gone))
      phone.style.opacity = String(ease.inOutQuad(prog(t, PHONE.a, PHONE.a + 0.6)) * (1 - pout))
      phone.style.transform = `translateY(${lerp(140, 0, pin) + 40 * pout}px) scale(${lerp(0.96, 1, pin) + 0.012 * prog(t, PHONE.b, PHONE.out)})`
      shade.style.opacity = String(ease.inOutQuad(prog(t, CARDS[0].t - 0.25, CARDS[0].t + 0.45)))
      cap2.update(t - CAP2.type, { out: CAP2.out - CAP2.type })
      cards.forEach(({ card, c }) => {
        const p = ease.outCubic(prog(t, c.t, c.t + 0.7)), o = ease.inOutQuad(prog(t, PHONE.out + 0.05, PHONE.gone))
        card.style.opacity = String(ease.inOutQuad(prog(t, c.t, c.t + 0.45)) * (1 - o))
        card.style.transform = `translateY(${lerp(90, 0, p) + 30 * o}px)`
      })

      // ── beat 3: the end line
      chars.forEach((s, i) => {
        const t0 = T_TYPE + i * PER
        const p = prog(t, t0, t0 + FADE)
        const inA = i >= AL0 && i <= AL1
        const wv = inA ? Math.exp(-Math.pow((t - (T_GLINT + (i - AL0) * 0.035)) / 0.1, 2)) : 0
        s.style.opacity = String(ease.outQuad(p))
        const base = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
        s.style.color = wv > 0.02 ? mix(C.bone, '#ffe2a0', wv) : base
        s.style.textShadow = wv > 0.02 ? `0 0 ${20 * wv}px rgba(242,199,92,${0.85 * wv}), 0 0 30px rgba(11,6,32,0.85)` : ''
      })
      const rise = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.4))
      const ly = lerp(LINE_Y0, LINE_Y1, rise) - LINE_FS * 0.55
      lineBox.style.transform = `translateY(${ly}px) scale(${lerp(0.985, 1, ease.outCubic(prog(t, T_TYPE, T_TYPE + 0.6)))})`

      // ── lockup
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.02, T_RINGS + 0.24 + i * 0.02)))))
      const pulse = i => 0.6 * tw(t, [[T_PULSE + i * 0.05, 0], [T_PULSE + 0.07 + i * 0.05, 1, ease.outQuad], [T_PULSE + 0.4 + i * 0.05, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.05 * Math.sin((t - T_HOLD) * 2.4 - i * 0.5) * prog(t, T_HOLD, T_HOLD + 0.3)
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
      glow.style.opacity = String(ease.inOutQuad(prog(t, T_RINGS, T_RINGS + 0.5)) * (0.88 + 0.12 * Math.sin((t - T_HOLD) * 1.9)) + 0.3 * gP)
      glow.style.transform = `scale(${1 + 0.06 * gP})`
      lock.style.transform = `scale(${lerp(1, 1.012, prog(t, T_RINGS, T_END))})`

      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

export const cues = [
  // beat 1
  ['tick', CAP1.type, 0.02],
  ['bell', DIM.a + 0.35, 392, 0.03, 2.2, -0.3],                     // Taurus lights
  ['bell', DIM.a + 0.5, 493.88, 0.03, 2.2, 0.3],                    // Libra lights
  ['glitter', VEN.a, VEN.a + 0.7],
  ['bell', VEN.a + 0.1, 587.33, 0.05, 3.0, 0],                      // Venus
  ['bell', LINK.b - 0.1, 739.99, 0.025, 2.0, -0.25],
  ['bell', LINK.b + 0.02, 880, 0.025, 2.0, 0.25],
  ['whoosh', DIM.out + 0.1, 0.6, 0.05],
  // beat 2
  ['whoosh', PHONE.a, 0.8, 0.08],
  ['bell', PHONE.a + 0.4, 293.66, 0.035, 2.6, 0],
  ...CARDS.map((c, i) => ['bell', c.t + 0.08, [587.33, 659.25, 739.99][i], 0.04, 1.8, (i - 1) * 0.25]),
  ...CARDS.map(c => ['tick', c.t + 0.05, 0.025]),
  ['whoosh', PHONE.out, 0.6, 0.06],
  // beat 3 (ghosted end recipe, retimed)
  ...[...LINE].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.02]).filter(Boolean),
  ['bell', T_TYPE + 0.02, 587.33, 0.045, 2.6, 0],
  ['glitter', T_GLINT - 0.05, T_GLINT + 0.35],
  ['bell', T_GLINT, 1760, 0.02, 1.4, 0.3],
  ['whoosh', T_RISE - 0.02, 0.5, 0.07],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T_DOTS + i * 0.03, f, 0.055, 2.2, (i - 3) * 0.12]),
  ['boom', T_WORD, 0.18],
  ['bell', T_WORD + 0.02, 146.83, 0.05, 3.2, 0],
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_PULSE + i * 0.05, f, 0.016, 1.6, (i - 3) * 0.1]),
  ['boom', T_OUT + 0.05, 0.25],
  ['bell', T_OUT + 0.06, 73.42, 0.045, 3.0, 0],
]
