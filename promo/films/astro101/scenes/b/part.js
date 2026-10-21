// ─────────────────────────────────────────────── ASTRO101 part b · ELEMENTS → PLANETS → YOUR CHART (19.8–40.2)
// Starts on H exactly (sky SKY_H, grain GRAIN_H, the bare wheel from drawWheelH) and holds it still to 20.2.
// Ends on H exactly: every layer added here is at zero by 39.6.
//
// Beat map:
//   20.25 "Every sign has an element." (typed by ≈21.0, out 26.4–26.8)
//   20.8 / 21.75 / 22.7 / 23.65   fire, earth, air, water triangles draw (0.95 s each) across the wheel, their three signs
//          light up and their ring wedges tint; "Fire acts. Earth builds. / Air talks. Water feels." builds under the wheel,
//          one phrase per triangle (out 26.75–27.1; the last is readable from ≈24.5 to 26.75). Triangles + wedges out 26.3–27.1.
//   27.1 "The planets are the who." (typed by ≈27.8, out 33.0–33.35)
//   27.6 28.4 29.2 30.0 30.8    five rows inside the wheel, each with its glowing orb:
//          ☉ Sun, who you are · ☽ Moon, what you need · ☿ Mercury, how you talk · ♀ Venus, how you love · ♂ Mars, how you chase
//   33.15–33.6 row text fades; 33.4–34.5 the orbs lift out onto their own lanes (Moon 306, Sun 262, Mars 222, Mercury 182,
//          Venus 142) while the sky turns, travelling in polar coords so no straight paths cross
//   33.5 "Your chart is the sky / the moment you were born." (typed by ≈34.8, out 38.5–38.85)
//   34.4 the birth-data pill rises under the wheel · 34.9–36.45 it types "May 12, 1998 · 5:00 PM · Tulsa"
//   33.45–36.9 the orbits slow (sine in-out) and freeze into the 1998 sky: Sun 21° Taurus, Mars 21° Taurus (conjunct the Sun that day),
//          Mercury 27° Aries, Venus 9° Aries, Moon 7° Sagittarius · 36.9 freeze ring on each orb, ticks to the ring,
//          their signs glow · 36.6 labels "Sun in Taurus" / "Moon in Sagittarius" (out 39.0–39.35)
//   38.7–39.6 pill, orbs, ticks and glows clear → plain H from 39.6
import { clamp, lerp, prog, ease, el, C, TypeLine, rng } from '../../../../src/lib.js'
import { W, H, SERIF, SANS, MONO, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, getSky, layerCanvas, drawPixelStar } from '../../../sky.js'
import { SIGNS, ELEMENT_COLOR, WHEEL, SKY_H, GRAIN_H, ptOf, angOf, signMid, drawWheelH } from '../../../wheel.js'

const T0 = 19.8, T1 = 40.2
const io = ease.inOutCubic, iq = ease.inOutQuad
const GLYPH_FONT = "'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', sans-serif"
const VS = '︎'

// ── beat 1: elements
const CAP1 = { at: 20.25, out: [26.4, 26.8] }
const ELS = [
  { el: 'fire', word: 'Fire', verb: 'acts.', at: 20.8 },
  { el: 'earth', word: 'Earth', verb: 'builds.', at: 21.75 },
  { el: 'air', word: 'Air', verb: 'talks.', at: 22.7 },
  { el: 'water', word: 'Water', verb: 'feels.', at: 23.65 },
]
const TRI_LEN = 0.95, TRI_OUT = [26.3, 27.1], TRI_R = WHEEL.rIn - 6

// ── beat 2: planets
const CAP2 = { at: 27.1, out: [33.0, 33.35] }
const PLANETS = [
  { id: 'sun', name: 'Sun', glyph: '☉', what: 'who you are', col: ['#fff4cf', '#f6c45a', '#b9731f'], r: 25, rw: 21, row: 27.6, lon: 51.8, lane: 262, laps: 0 },
  { id: 'moon', name: 'Moon', glyph: '☽', what: 'what you need', col: ['#ffffff', '#dcd6f2', '#8a82b4'], r: 22, rw: 19, row: 28.4, lon: 247.2, lane: 306, laps: 0 },
  { id: 'mercury', name: 'Mercury', glyph: '☿', what: 'how you talk', col: ['#f2fbff', '#9fd2e8', '#4f7f9a'], r: 19, rw: 15, row: 29.2, lon: 27.2, lane: 182, laps: 0 },
  { id: 'venus', name: 'Venus', glyph: '♀', what: 'how you love', col: ['#fff0f6', '#f59cc4', '#a8507a'], r: 21, rw: 17, row: 30.0, lon: 9.4, lane: 142, laps: 0 },
  { id: 'mars', name: 'Mars', glyph: '♂', what: 'how you chase', col: ['#ffe2d6', '#f0603a', '#8f2a14'], r: 20, rw: 16, row: 30.8, lon: 51.4, lane: 222, laps: 0 },
]
const ROW_Y = i => WHEEL.cy + (i - 2) * 98, ORB_X = 318, TXT_X = 362
const ROW_FADE = 0.55, ROW_OUT = [33.15, 33.6]

// ── beat 3: your chart
const CAP3 = { at: 33.5, out: [38.5, 38.85] }
const LIFT = [33.4, 34.5]            // list → lanes
const TURN = [33.45, 36.9]           // the sky turns (sine in-out) and comes to rest
const FREEZE = 36.9
const PILL = { y: 1530, w: 900, h: 112, fs: 44, pad: 44, in: [34.4, 34.95], out: [38.7, 39.25] }
const ORB_OUT = [38.8, 39.6]
const LABEL = { in: [36.6, 36.95], out: [39.0, 39.35] }
const TEXT = 'May 12, 1998 · 5:00 PM · Tulsa'
const CHUNKS = [[0, 12, 34.9, 35.62], [12, 22, 35.8, 36.12], [22, 30, 36.22, 36.45]]
const TYPED_AT = (() => {
  const r = rng(512), out = []
  for (const [a, b, t0, t1] of CHUNKS) {
    const w = []; let acc = 0
    for (let i = a; i < b; i++) { acc += 0.6 + r() * 0.8 + (TEXT[i] === ' ' ? 0.5 : 0); w.push(acc) }
    w.forEach(v => out.push(t0 + (v - w[0]) / Math.max(1e-6, acc - w[0]) * (t1 - t0)))
  }
  return out
})()

const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }

/** a glowing planet orb: soft halo, lit sphere, ink glyph, a pixel-star glint */
function drawOrb(ctx, x, y, r, p, a, t, glow = 1) {
  if (a <= 0.002) return
  const [hi, mid, lo] = p.col
  ctx.save()
  ctx.globalAlpha = a
  ctx.globalCompositeOperation = 'lighter'
  const hr = r * (3.4 + 0.25 * Math.sin(t * 2.1 + r))
  const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, hr)
  g.addColorStop(0, hexA(mid, 0.42 * glow)); g.addColorStop(0.45, hexA(mid, 0.12 * glow)); g.addColorStop(1, hexA(mid, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, hr, 0, Math.PI * 2); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
  const b = ctx.createRadialGradient(x - r * 0.38, y - r * 0.42, r * 0.08, x, y, r)
  b.addColorStop(0, hi); b.addColorStop(0.45, mid); b.addColorStop(1, lo)
  ctx.fillStyle = b; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
  ctx.lineWidth = 1.2; ctx.strokeStyle = hexA(hi, 0.55); ctx.stroke()
  ctx.font = `${Math.round(r * 1.12)}px ${GLYPH_FONT}`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(28,14,48,0.82)'
  ctx.fillText(p.glyph + VS, x, y + r * 0.04)
  // glint
  const tw = 0.55 + 0.45 * Math.sin(t * 3.1 + r * 1.7)
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = a * tw * 0.9
  ctx.imageSmoothingEnabled = false
  drawPixelStar(ctx, x + r * 0.62, y - r * 0.66, Math.max(7, Math.round(r * 0.62)), 1, hi, '#ffffff')
  ctx.imageSmoothingEnabled = true
  ctx.restore()
}

/** a wedge of the ring (between rIn and rOut) for sign i */
function wedge(ctx, i, r0 = WHEEL.rIn, r1 = WHEEL.rOut) {
  const a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
  ctx.beginPath()
  ctx.arc(WHEEL.cx, WHEEL.cy, r1, a0, a1, true)
  ctx.arc(WHEEL.cx, WHEEL.cy, r0, a1, a0, false)
  ctx.closePath()
}

/** a sign glyph lit on top of drawWheelH's (same place, glowing) */
function glowGlyph(ctx, i, k) {
  if (k <= 0.002) return
  const s = SIGNS[i], p = ptOf(i * 30 + 15, WHEEL.rGlyph)
  ctx.save()
  ctx.font = `${Math.round(40 * (1 + 0.14 * k))}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.shadowColor = s.color; ctx.shadowBlur = 22 * k
  ctx.globalAlpha = k; ctx.fillStyle = s.color
  ctx.fillText(s.glyph + VS, p.x, p.y)
  ctx.shadowBlur = 0
  ctx.globalAlpha = 0.35 * k; ctx.fillStyle = '#fff6ea'
  ctx.fillText(s.glyph + VS, p.x, p.y)
  ctx.restore()
}

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  getSky()
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' })
  const gx = gC.getContext('2d')
  await document.fonts.load(`italic 72px 'EB Garamond'`).catch(() => {})
  await document.fonts.load(`40px 'EB Garamond'`).catch(() => {})
  await document.fonts.load(`44px 'Inter'`).catch(() => {})

  // ── captions (EB Garamond italic, top band)
  const shadow = '0 2px 26px rgba(11,6,32,0.95), 0 0 10px rgba(11,6,32,0.7)'
  const capStyle = { left: '50%', top: '300px', transform: 'translateX(-50%)', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '76px', lineHeight: '1.1', color: C.bone, textShadow: shadow }
  const typeOpts = { perChar: 0.028, fade: 0.36, accent: ['#f2c75c', '#dcaaf2', '#8fd8f6'] }
  const cap1 = new TypeLine(root, 'Every sign has an element.', { ...capStyle, top: '318px' }, typeOpts)
  const cap2 = new TypeLine(root, 'The planets are the who.', { ...capStyle, top: '318px' }, typeOpts)
  const cap3 = new TypeLine(root, 'Your chart is the sky\nthe moment you were born.', { ...capStyle, top: '276px' }, typeOpts)

  // ── element sub-captions under the wheel
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1450px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '54px', lineHeight: '1.32', color: C.bone, textShadow: shadow }, root)
  const lines = [el('div', {}, sub), el('div', {}, sub)]
  const phrases = ELS.map((e, i) => {
    const sp = el('span', { display: 'inline-block', opacity: 0, margin: '0 0.32em' }, lines[i >> 1])
    el('span', { color: ELEMENT_COLOR[e.el], textShadow: `0 0 18px ${hexA(ELEMENT_COLOR[e.el], 0.45)}, ${shadow}` }, sp, e.word)
    el('span', {}, sp, ' ' + e.verb)
    return sp
  })

  // ── planet rows (text; orbs are on the canvas)
  const rows = PLANETS.map((p, i) => {
    const r = el('div', { position: 'absolute', left: TXT_X + 'px', top: (ROW_Y(i) - 34) + 'px', height: '68px', lineHeight: '68px', whiteSpace: 'pre', fontFamily: SERIF, fontStyle: 'italic', fontSize: '52px', color: C.bone, opacity: 0, textShadow: shadow }, root)
    el('span', {}, r, p.name + ',')
    el('span', { color: 'rgba(239,230,214,0.72)', fontSize: '46px' }, r, ' ' + p.what)
    return r
  })

  // ── chart labels
  const lab = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '40px', color: C.bone, whiteSpace: 'pre', position: 'absolute', opacity: 0, textShadow: shadow }
  const sunP = ptOf(PLANETS[0].lon, PLANETS[0].lane), moonP = ptOf(PLANETS[1].lon, PLANETS[1].lane)
  const labSun = el('div', { ...lab, left: (sunP.x + 38) + 'px', top: (sunP.y - 4) + 'px' }, root)
  labSun.innerHTML = `Sun in <span style="color:${SIGNS[1].color}">Taurus</span>`
  const labMoon = el('div', { ...lab, left: (moonP.x - 40) + 'px', top: (moonP.y + 30) + 'px', transform: 'translateX(-100%)', textAlign: 'right' }, root)
  labMoon.innerHTML = `Moon in <span style="color:${SIGNS[8].color}">Sagittarius</span>`

  // ── birth-data pill (film 1 S4 / birthtime hook recipe, re-laid for vertical)
  const pill = el('div', {
    position: 'absolute', left: (W / 2 - PILL.w / 2) + 'px', top: (PILL.y - PILL.h / 2) + 'px', width: PILL.w + 'px', height: PILL.h + 'px', borderRadius: '999px',
    background: 'linear-gradient(180deg, rgba(52,30,108,0.82) 0%, rgba(40,20,90,0.86) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 2px rgba(196,182,228,0.35), inset 0 -1px 0 rgba(11,6,32,0.35), 0 26px 70px rgba(11,6,32,0.55)',
    backdropFilter: 'blur(10px) saturate(1.35)', overflow: 'hidden', opacity: 0,
  }, root)
  el('div', { position: 'absolute', left: 0, top: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.085), rgba(255,255,255,0))', pointerEvents: 'none' }, pill)
  const pglint = el('div', { position: 'absolute', top: '-30px', width: '140px', height: (PILL.h + 60) + 'px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.08), rgba(255,255,255,0))', transform: 'skewX(-22deg)', pointerEvents: 'none' }, pill)
  const field = el('div', { position: 'absolute', left: PILL.pad + 'px', top: '50%', transform: 'translateY(-50%)', fontFamily: SANS, fontWeight: 400, fontSize: PILL.fs + 'px', color: C.bone, whiteSpace: 'pre', letterSpacing: '-0.01em' }, pill)
  const caret = el('span', { display: 'inline-block', width: '3px', height: Math.round(PILL.fs * 1.08) + 'px', background: C.bone, marginLeft: '3px', verticalAlign: '-8px' }, null)
  const sendD = PILL.h - 32
  el('div', {
    position: 'absolute', right: '16px', top: '16px', width: sendD + 'px', height: sendD + 'px', borderRadius: '999px',
    background: 'linear-gradient(100deg, #f8edff 0%, #fff7ec 38%, #eaf4ff 72%, #ffeff7 100%)', color: '#3a2c4e',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: '38px', fontWeight: 600,
  }, pill, '↑')
  const pillEye = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (PILL.y - PILL.h / 2 - 62) + 'px', textAlign: 'center', textIndent: '0.3em', fontFamily: MONO, fontSize: '30px', letterSpacing: '0.3em', color: 'rgba(239,230,214,0.8)', opacity: 0, textShadow: shadow }, root, 'BORN')

  const C_ = { x: WHEEL.cx, y: WHEEL.cy }
  const triPts = e => [0, 4, 8].map(k => ptOf(signMid(SIGNS.findIndex(s => s.el === e)) + k * 30, TRI_R))

  // each orb leaves its list row along polar coordinates (no crossing straight lines) and travels forward to its natal lon:
  // Venus 345°, Moon 271°, Sun 93°, Mercury 27°, Mars 10°
  PLANETS.forEach((p, i) => {
    const dx = ORB_X - C_.x, dy = ROW_Y(i) - C_.y
    p.rL = Math.hypot(dx, dy)
    p.lonL = ((180 - Math.atan2(dy, dx) * 180 / Math.PI) % 360 + 360) % 360
    let tr = ((p.lon - p.lonL) % 360 + 360) % 360
    p.travel = tr + 360 * p.laps
  })
  const sine = x => 0.5 - 0.5 * Math.cos(Math.PI * x)
  const polarAt = (p, t) => {
    const lon = p.lonL + p.travel * sine(prog(t, TURN[0], TURN[1]))
    const r = lerp(p.rL, p.lane, io(prog(t, LIFT[0], LIFT[1])))
    return ptOf(lon, r)
  }

  return {
    start: T0, end: T1, root,
    update(t) {
      // ── sky + H wheel (exactly H; the rest layers on top)
      drawSky(bx, t, SKY_H)
      drawWheelH(bx)
      const ctx = bx

      // ── beat 1: element wedges, triangles, glyph glows
      const triOut = 1 - iq(prog(t, TRI_OUT[0], TRI_OUT[1]))
      const glyphK = new Array(12).fill(0)
      if (t > 20.5 && t < TRI_OUT[1] + 0.01) {
        // wedges first (underneath)
        ELS.forEach(e => {
          const k = iq(prog(t, e.at + 0.15, e.at + 0.9)) * triOut
          if (k <= 0) return
          SIGNS.forEach((s, i) => {
            if (s.el !== e.el) return
            ctx.save(); wedge(ctx, i)
            ctx.globalAlpha = 0.16 * k; ctx.fillStyle = s.color; ctx.fill()
            ctx.restore()
          })
        })
        ELS.forEach((e, ei) => {
          const p = prog(t, e.at, e.at + TRI_LEN)
          if (p <= 0 || triOut <= 0) return
          const col = ELEMENT_COLOR[e.el], pts = triPts(e.el)
          const d = io(p) * 3
          const path = () => {
            ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
            for (let s = 0; s < 3; s++) {
              const f = clamp(d - s); if (f <= 0) break
              const a = pts[s], b = pts[(s + 1) % 3]
              ctx.lineTo(lerp(a.x, b.x, f), lerp(a.y, b.y, f))
            }
          }
          ctx.save()
          ctx.lineJoin = 'round'; ctx.lineCap = 'round'
          // fill once closed
          const fk = iq(prog(t, e.at + TRI_LEN * 0.8, e.at + TRI_LEN + 0.5)) * triOut
          if (fk > 0) { ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)); ctx.closePath(); ctx.globalAlpha = 0.06 * fk; ctx.fillStyle = col; ctx.fill() }
          ctx.globalAlpha = 0.55 * triOut; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.shadowColor = col; ctx.shadowBlur = 24
          path(); ctx.stroke()
          ctx.shadowBlur = 0
          ctx.globalAlpha = 0.95 * triOut; ctx.lineWidth = 2.5; path(); ctx.stroke()
          ctx.globalAlpha = 0.55 * triOut; ctx.strokeStyle = '#fff6ea'; ctx.lineWidth = 1; path(); ctx.stroke()
          // vertex beads as the line reaches them
          pts.forEach((q, s) => {
            const vk = iq(prog(d, s - 0.02, s + 0.25)) * triOut
            if (vk <= 0) return
            ctx.globalCompositeOperation = 'lighter'
            const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, 26)
            g.addColorStop(0, hexA(col, 0.9 * vk)); g.addColorStop(0.35, hexA(col, 0.35 * vk)); g.addColorStop(1, hexA(col, 0))
            ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, 26, 0, Math.PI * 2); ctx.fill()
            ctx.globalCompositeOperation = 'source-over'
            ctx.globalAlpha = vk; ctx.fillStyle = '#fff6ea'; ctx.beginPath(); ctx.arc(q.x, q.y, 4, 0, Math.PI * 2); ctx.fill()
            // the sign at this vertex lights up
            const si = SIGNS.findIndex(x => x.el === e.el) + s * 4
            glyphK[si] = Math.max(glyphK[si], vk)
          })
          ctx.restore()
        })
      }

      // ── beat 2/3: planets
      const lift = io(prog(t, LIFT[0], LIFT[1]))
      const orbOut = 1 - iq(prog(t, ORB_OUT[0], ORB_OUT[1]))
      const frz = prog(t, FREEZE - 0.1, FREEZE + 0.6)
      // faint orbit lanes while the sky turns
      const laneK = iq(prog(t, 33.7, 34.5)) * (1 - iq(prog(t, 37.2, 38.4)))
      if (laneK > 0) {
        ctx.save(); ctx.strokeStyle = '#efe6d6'; ctx.lineWidth = 1; ctx.setLineDash([2, 9])
        for (const p of PLANETS) { const r = p.lane; ctx.globalAlpha = 0.2 * laneK; ctx.beginPath(); ctx.arc(C_.x, C_.y, r, 0, Math.PI * 2); ctx.stroke() }
        ctx.restore()
      }
      // signs occupied, ticks from orb to ring
      const occK = iq(prog(t, FREEZE - 0.05, FREEZE + 0.6)) * orbOut
      if (occK > 0) {
        ctx.save()
        ;[[1, '#e9b24a'], [8, '#a35cf0'], [0, '#f0603a']].forEach(([i, c]) => { wedge(ctx, i); ctx.globalAlpha = 0.14 * occK; ctx.fillStyle = SIGNS[i].color; ctx.fill() })
        ctx.restore()
        glyphK[1] = Math.max(glyphK[1], occK); glyphK[8] = Math.max(glyphK[8], occK); glyphK[0] = Math.max(glyphK[0], 0.6 * occK)
        PLANETS.forEach(p => {
          const a = ptOf(p.lon, p.lane + p.rw + 8), b = ptOf(p.lon, WHEEL.rIn)
          ctx.save(); ctx.globalAlpha = 0.5 * occK; ctx.strokeStyle = p.col[1]; ctx.lineWidth = 1.5
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(lerp(a.x, b.x, ease.outCubic(prog(t, FREEZE, FREEZE + 0.6))), lerp(a.y, b.y, ease.outCubic(prog(t, FREEZE, FREEZE + 0.6)))); ctx.stroke()
          ctx.restore()
        })
      }
      glyphK.forEach((k, i) => glowGlyph(ctx, i, k))

      PLANETS.forEach((p, i) => {
        const appear = ease.outCubic(prog(t, p.row, p.row + ROW_FADE))
        if (appear <= 0 || orbOut <= 0) return
        const { x, y } = polarAt(p, t)
        const r = lerp(p.r, p.rw, lift) * lerp(0.6, 1, appear)
        // freeze: a thin ring blooms out once
        if (frz > 0 && frz < 1) {
          ctx.save(); ctx.globalAlpha = 0.7 * (1 - frz) * orbOut; ctx.strokeStyle = p.col[0]; ctx.lineWidth = 1.5
          ctx.beginPath(); ctx.arc(x, y, r + 6 + 34 * ease.outCubic(frz), 0, Math.PI * 2); ctx.stroke(); ctx.restore()
        }
        drawOrb(ctx, x, y, r, p, appear * orbOut, t, 1 + 0.6 * Math.sin(Math.PI * clamp(frz)))
      })

      // ── grain
      drawGrain(gx, t)

      // ── type
      const out = (o) => 1 - iq(prog(t, o[0], o[1]))
      cap1.update(t - CAP1.at); cap1.root.style.opacity = String(out(CAP1.out)); cap1.root.style.display = t > CAP1.at - 0.05 && t < CAP1.out[1] ? 'block' : 'none'
      cap2.update(t - CAP2.at); cap2.root.style.opacity = String(out(CAP2.out)); cap2.root.style.display = t > CAP2.at - 0.05 && t < CAP2.out[1] ? 'block' : 'none'
      cap3.update(t - CAP3.at); cap3.root.style.opacity = String(out(CAP3.out)); cap3.root.style.display = t > CAP3.at - 0.05 && t < CAP3.out[1] ? 'block' : 'none'
      phrases.forEach((sp, i) => {
        const k = iq(prog(t, ELS[i].at + 0.3, ELS[i].at + 0.85)) * out([26.75, 27.1])
        sp.style.opacity = String(k)
        sp.style.transform = `translateY(${(1 - k) * 14}px)`
      })
      rows.forEach((r, i) => {
        const k = iq(prog(t, PLANETS[i].row + 0.1, PLANETS[i].row + 0.1 + ROW_FADE)) * out(ROW_OUT)
        r.style.opacity = String(k)
        r.style.transform = `translateX(${(1 - iq(prog(t, PLANETS[i].row + 0.1, PLANETS[i].row + 0.1 + ROW_FADE))) * -16}px)`
      })
      const lk = iq(prog(t, LABEL.in[0], LABEL.in[1])) * out(LABEL.out)
      labSun.style.opacity = labMoon.style.opacity = String(lk)
      // pill
      const pin = ease.outCubic(prog(t, PILL.in[0], PILL.in[1])), pk = pin * out(PILL.out)
      pill.style.opacity = String(pk)
      pill.style.transform = `translateY(${(1 - pin) * 26}px)`
      pillEye.style.opacity = String(0.9 * pk)
      const n = TYPED_AT.filter(v => v <= t).length
      field.textContent = TEXT.slice(0, n)
      const typing = t < TYPED_AT[TYPED_AT.length - 1] + 0.05
      caret.style.opacity = (typing || Math.floor((t - 36.5) * 2.4) % 2 === 0) && t < 38.4 ? '1' : '0'
      field.appendChild(caret)
      pglint.style.left = lerp(-200, PILL.w + 80, prog(t, 36.6, 37.9)) + 'px'
    },
  }
}

export const cues = [
  ['bell', CAP1.at, 587.33, 0.026, 2.6, 0],
  ...ELS.map((e, i) => ['bell', e.at + 0.1, [659.25, 739.99, 880, 987.77][i], 0.014, 2.2, [-0.4, 0.4, -0.25, 0.25][i]]),
  ...ELS.map(e => ['tick', e.at + TRI_LEN, 0.01]),
  ['bell', CAP2.at, 493.88, 0.026, 2.6, 0],
  ...PLANETS.map((p, i) => ['bell', p.row + 0.05, [1174.66, 987.77, 1318.51, 1108.73, 880][i], 0.011, 1.6, [-0.3, 0.3, -0.15, 0.15, 0][i]]),
  ['whoosh', LIFT[0], 1.2, 0.03],
  ['bell', CAP3.at, 440, 0.026, 2.8, 0],
  ...TYPED_AT.map(v => ['tick', v, 0.006]),
  ['glitter', FREEZE - 0.1, FREEZE + 0.9],
  ['bell', FREEZE, 1479.98, 0.014, 2.4, 0],
  ['whoosh', ORB_OUT[0], 1.0, 0.02],
]
