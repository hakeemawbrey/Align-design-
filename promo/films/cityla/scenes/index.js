// cityla (15 s, vertical) — "LA: everyone's photo is perfect."
//   0.0–3.48  HOOK: a ring light on a tripod, a phone in the middle, a faceless profile photo on its screen. On the beats
//             the filters stack up as stickers, each with a camera flash: + GOLDEN HOUR (sunset sky + sun), + PALM TREES,
//             + GLOW (rim light, bloom, sparkles), + 1 MORE FILTER (hue cycling). Likes float up. "LA: everyone's | photo is | perfect."
//   3.52–5.56 TURN: "On Align, | the face comes | last." — the stickers fall off and an aura veil washes over the photo.
//   5.45–8.1  The phone pops away; the ring light's glowing ring turns into a birth chart (zodiac wheel); the veiled photo
//             shrinks to an aura orb in the middle ("FACE · LAST"); Sun / Moon / Rising pop in. "Chart | first."
//   8.12–10.4 The chart shrinks up, a little ring light pops in under it… and clicks off. Hearts pop round the chart.
//             "Fall for | the chart, | not the lighting."  → plain sky H from 10.5, end card ("come" + logo + CTA) at 10.6.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { BONE, GOLD, PINK, CYAN, INK, GLYPH_FONT, D2R, rgba, mixHex, pop01, outScale, outK, glowStroke, makeBurst, drawBurst, popText } from './kit.js'

export const DURATION = 15
export const CTA = 'VOTE FOR YOUR CITY'
const END = DURATION - ENDCARD_LEN          // 10.6: the end card takes over here
const SETTLE = 10.5                          // from here only the plain sky H is on screen
const BEAT = 60 / 108, B0 = 0.6              // the 108 bpm grid: beat n at 0.6 + n·0.5556
const beat = n => +(B0 + n * BEAT).toFixed(3)
const TAU = Math.PI * 2
const SUNSET = '#ff9a4a', LILAC = '#b45cf0', DARK = '#140f2a'

const T = {
  hook: 0.1, hookLast: 0.95, hookOut: [3.3, 3.48],
  filters: [beat(1), beat(2), beat(3), beat(4)],          // 1.156 1.711 2.267 2.822
  likes: beat(4) + 0.05,
  turn: 3.52, turnLast: beat(6), veil: [beat(6), beat(6) + 0.7], turnOut: [5.4, 5.56],
  morph: [5.45, 6.05], chart: 5.62, chartLast: beat(10), planets: [6.3, 6.46, 6.62], faceLbl: 6.85, chartOut: [7.95, 8.1],
  shrink: [7.95, 8.5], fall: 8.12, fallLast: 8.6, lamp: 8.2, click: beat(15), tip: 9.3, hearts: beat(15) + 0.05,
  wheelOut: 9.95, fallOut: [10.05, 10.4],
}

// layout
const RL = { cx: 540, cy: 1170, R: 420, w: 56 }             // the big ring light
const PH = { w: 400, h: 700 }                               // the phone (centred in the ring)
const WCH = { cx: 0, cy: 0, rOut: 448, rIn: 372, rGlyph: 410, alpha: 0.92 }
const SMALL = { cx: 540, cy: 1650, R: 100, w: 24 }          // the little ring light at the end
const FINAL = { cy: 1110, s: 0.68 }
// stickers: text, centre, rotation, colour
const STICK = [
  { txt: '+ GOLDEN HOUR', x: 268, y: 905, rot: -8, col: GOLD },
  { txt: '+ PALM TREES', x: 812, y: 1090, rot: 7, col: '#5df29a' },
  { txt: '+ GLOW', x: 230, y: 1300, rot: -5, col: PINK },
  { txt: '+ 1 MORE FILTER', x: 800, y: 1470, rot: 6, col: CYAN },
]
// planets on the chart (ecliptic longitude) — canvas angle = π − lon
const PLANETS = [
  { name: 'SUN', lon: 225, col: GOLD },
  { name: 'MOON', lon: 318, col: '#dfe6f2' },
  { name: 'RISING', lon: 30, col: PINK },
]
const signOf = lon => SIGNS[Math.floor(((lon % 360) + 360) % 360 / 30)]
const lonPt = (lon, r) => ({ x: Math.cos(Math.PI - lon * D2R) * r, y: Math.sin(Math.PI - lon * D2R) * r })

function heartPath(x, s) {
  x.beginPath()
  x.moveTo(0, s * 0.35)
  x.bezierCurveTo(-s * 1.1, -s * 0.35, -s * 0.55, -s * 1.05, 0, -s * 0.5)
  x.bezierCurveTo(s * 0.55, -s * 1.05, s * 1.1, -s * 0.35, 0, s * 0.35)
  x.closePath()
}

// a palm tree silhouette, base at (0,0), ~h tall; dir = lean
function palm(x, h, dir, sway, lean = 0.22) {
  x.save()
  x.strokeStyle = '#2a1238'; x.fillStyle = '#2a1238'; x.lineCap = 'round'; x.lineJoin = 'round'
  const topX = dir * h * lean + sway * 8, topY = -h
  x.lineWidth = 22
  x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(dir * h * 0.02, -h * 0.55, topX, topY); x.stroke()
  // trunk rings
  x.lineWidth = 4; x.strokeStyle = rgba(SUNSET, 0.35)
  for (let k = 1; k < 7; k++) { const u = k / 7, px = lerp(0, topX, u * u), py = -h * u; x.beginPath(); x.moveTo(px - 11, py); x.lineTo(px + 11, py - 3); x.stroke() }
  // fronds
  x.strokeStyle = '#2a1238'; x.lineWidth = 16
  for (let f = 0; f < 6; f++) {
    const a = (-170 + f * 32 + sway * 4) * D2R, L = h * 0.42
    const ex = topX + Math.cos(a) * L, ey = topY + Math.sin(a) * L * 0.6 + L * 0.35
    x.beginPath(); x.moveTo(topX, topY); x.quadraticCurveTo(topX + Math.cos(a) * L * 0.55, topY + Math.sin(a) * L * 0.7 - 30, ex, ey); x.stroke()
  }
  x.beginPath(); x.arc(topX, topY, 16, 0, TAU); x.fill()
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 128px Inter", "800 112px Inter", "800 170px Inter", "italic 500 170px 'EB Garamond'", "italic 500 220px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 40px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type
  const H0 = popText(root, 'LA: everyone\'s | photo is | *perfect.*', { top: 150, size: 128, weight: 800, accentSize: 172, at: T.hook, gap: 0.1, accentColor: GOLD, lastAt: T.hookLast, wobble: true })
  const H1 = popText(root, 'On Align, | the face comes | *last.*', { top: 190, size: 112, weight: 800, accentSize: 170, at: T.turn, gap: 0.07, accentColor: PINK, lastAt: T.turnLast, wobble: true })
  const H2 = popText(root, 'Chart | *first.*', { top: 170, size: 170, weight: 800, accentSize: 220, at: T.chart, gap: 0.1, accentColor: GOLD, lastAt: T.chartLast, wobble: true })
  const H3 = popText(root, 'Fall for | the chart, | *not the lighting.*', { top: 180, size: 120, weight: 800, accentSize: 124, at: T.fall, gap: 0.08, accentColor: PINK, lastAt: T.fallLast, wobble: true })
  const TEXTS = [[H0, T.hookOut], [H1, T.turnOut], [H2, T.chartOut], [H3, T.fallOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(900 + k, n, d)
  const B_ST = STICK.map((_, i) => B(i, 8, 130)), B_HOOK = B(5, 10, 190), B_LIKE = B(6, 14, 300)
  const B_MORPH = B(7, 16, 520), B_PL = PLANETS.map((_, i) => B(10 + i, 8, 100)), B_CH = B(14, 10, 200)
  const B_CLICK = B(15, 9, 120), B_HEART = B(16, 16, 380), B_FALL = B(17, 10, 200)

  // flash after each filter beat
  const flashK = t => T.filters.reduce((m, b, i) => Math.max(m, t >= b ? (i === 3 ? 0.34 : 0.22) * Math.exp(-(t - b) * 9) : 0), 0)
  const bumpK = t => T.filters.reduce((m, b) => Math.max(m, t >= b && t < b + 0.4 ? Math.sin(Math.PI * (t - b) / 0.4) * Math.exp(-(t - b) * 4) : 0), 0)
  const filterK = (t, i) => ease.outCubic(prog(t, T.filters[i] - 0.04, T.filters[i] + 0.22))

  // ── ring light (on: 0 = off/grey … 1 = full glow)
  function ringLight(cx, cy, R, w, on, a = 1) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    if (on > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.55)
      g.addColorStop(0, rgba('#ffe7c4', 0)); g.addColorStop(0.28, rgba('#ffe7c4', 0.22 * on)); g.addColorStop(1, rgba('#ffb2d0', 0))
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R * 1.55, 0, TAU); x.fill()
      x.restore()
    }
    x.lineCap = 'round'
    x.strokeStyle = '#2a2440'; x.lineWidth = w * 1.32; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.stroke()
    x.strokeStyle = mixHex('#5a5470', '#fff6e6', on); x.lineWidth = w * 0.86
    x.shadowColor = rgba('#ffd9a0', 0.95 * on); x.shadowBlur = 60 * on
    x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.stroke()
    x.shadowBlur = 0
    // LED dots
    x.fillStyle = on > 0.5 ? '#ffffff' : '#77708c'
    for (let i = 0; i < 36; i++) { const an = i / 36 * TAU; x.beginPath(); x.arc(cx + Math.cos(an) * R, cy + Math.sin(an) * R, w * 0.09, 0, TAU); x.fill() }
    x.restore()
  }
  function tripod(cx, top, bottom, spread, a = 1, w = 14) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    glowStroke(x, '#cfc6d8', w, 10)
    const knee = bottom - (bottom - top) * 0.22
    x.beginPath(); x.moveTo(cx, top); x.lineTo(cx, knee); x.stroke()
    for (const d of [-1, 0, 1]) { x.beginPath(); x.moveTo(cx, knee); x.lineTo(cx + d * spread, bottom + (d ? 0 : -8)); x.stroke() }
    x.restore()
  }

  // ── the profile photo (local coords: screen centred at 0,0; sw × sh)
  function photo(t, sw, sh) {
    const gk = filterK(t, 0), pk = filterK(t, 1), lk = filterK(t, 2), mk = filterK(t, 3)
    const vk = ease.inOutCubic(prog(t, ...T.veil))
    // sky: flat grey-blue → golden-hour sunset
    const g = x.createLinearGradient(0, -sh / 2, 0, sh / 2)
    g.addColorStop(0, mixHex('#3c4060', '#ff6fa8', gk)); g.addColorStop(0.55, mixHex('#4a4e6c', SUNSET, gk)); g.addColorStop(1, mixHex('#2c2e46', '#ffd27a', gk))
    x.fillStyle = g; x.fillRect(-sw / 2, -sh / 2, sw, sh)
    // the sun behind the head
    if (gk > 0) {
      x.save(); x.globalAlpha = gk
      const sg = x.createRadialGradient(0, -20, 10, 0, -20, 240); sg.addColorStop(0, rgba('#fff2c0', 0.95)); sg.addColorStop(0.45, rgba('#ffc861', 0.65)); sg.addColorStop(1, rgba('#ff9a4a', 0))
      x.fillStyle = sg; x.beginPath(); x.arc(0, -20, 240, 0, TAU); x.fill()
      x.fillStyle = '#ffe9a6'; x.beginPath(); x.arc(0, -20, 120 * (0.6 + 0.4 * gk), 0, TAU); x.fill()
      // sun stripes
      x.fillStyle = rgba('#ff8a5a', 0.7)
      for (let k = 0; k < 3; k++) x.fillRect(-130, 30 + k * 26, 260, 8 + k * 3)
      x.restore()
    }
    // palm trees spring up
    if (pk > 0) {
      const sp = easeOutBack(prog(t, T.filters[1] - 0.04, T.filters[1] + 0.36), 2.2), sway = Math.sin(t * 2.6)
      for (const d of [-1, 1]) { x.save(); x.translate(d * sw * 0.28, sh / 2 + 10); x.scale(d * sp, sp); palm(x, sh * 0.64, 1, sway * d, 0.1); x.restore() }
    }
    // the person: faceless head + shoulders, rim-lit once GLOW is on
    const hy = -10 + 3 * Math.sin(t * 2)
    x.save()
    x.beginPath(); x.arc(0, hy, 84, 0, TAU)
    x.moveTo(-150, sh / 2 + 20); x.lineTo(-150, 210); x.quadraticCurveTo(-150, 110, -40, 100); x.lineTo(40, 100); x.quadraticCurveTo(150, 110, 150, 210); x.lineTo(150, sh / 2 + 20); x.closePath()
    x.fillStyle = mixHex('#1a1430', '#2b1c40', gk); x.fill()
    if (lk > 0) { x.globalAlpha = lk; glowStroke(x, '#ffe6b8', 7, 30); x.stroke(); x.shadowBlur = 0 }
    x.restore()
    // hair swoop (stylised, no face)
    x.save(); x.fillStyle = mixHex('#1a1430', '#2b1c40', gk)
    x.beginPath(); x.ellipse(-30, hy - 52, 80, 46, -0.35, 0, TAU); x.fill(); x.restore()
    // glow: bloom + sparkles
    if (lk > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = lk
      const bg = x.createRadialGradient(0, 40, 20, 0, 40, sh * 0.6); bg.addColorStop(0, rgba('#ffd0e4', 0.32)); bg.addColorStop(1, rgba('#ffd0e4', 0))
      x.fillStyle = bg; x.fillRect(-sw / 2, -sh / 2, sw, sh)
      x.restore()
      x.save(); x.fillStyle = '#fff6e0'
      for (let k = 0; k < 9; k++) {
        const px = Math.sin(k * 2.4 + 1) * sw * 0.42, py = Math.cos(k * 1.7) * sh * 0.4
        const tw = 0.5 + 0.5 * Math.sin(t * 7 + k * 1.3), s = (8 + (k % 3) * 5) * tw * lk
        x.beginPath(); x.moveTo(px, py - s * 2); x.lineTo(px + s * 0.5, py - s * 0.5); x.lineTo(px + s * 2, py); x.lineTo(px + s * 0.5, py + s * 0.5)
        x.lineTo(px, py + s * 2); x.lineTo(px - s * 0.5, py + s * 0.5); x.lineTo(px - s * 2, py); x.lineTo(px - s * 0.5, py - s * 0.5); x.closePath(); x.fill()
      }
      x.restore()
    }
    // one more filter: the hue goes wild
    if (mk > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.3 * mk
      const hue = (t * 260) % 360
      const hg = x.createLinearGradient(-sw / 2, -sh / 2, sw / 2, sh / 2)
      hg.addColorStop(0, `hsl(${hue},95%,55%)`); hg.addColorStop(0.5, `hsl(${(hue + 120) % 360},95%,55%)`); hg.addColorStop(1, `hsl(${(hue + 240) % 360},95%,55%)`)
      x.fillStyle = hg; x.fillRect(-sw / 2, -sh / 2, sw, sh)
      x.restore()
    }
    // the aura veil washes up over everything
    if (vk > 0) {
      x.save()
      x.fillStyle = rgba('#1a0f2e', 0.85 * vk); x.fillRect(-sw / 2, -sh / 2, sw, sh)
      x.globalCompositeOperation = 'lighter'
      const blobs = [[-60, 40, '#ff6fa8', 0], [80, -60, '#ffa45c', 1.7], [0, 160, LILAC, 3.1], [-40, -150, '#ff6fa8', 4.4]]
      for (const [bx, by, col, ph] of blobs) {
        const r = sh * 0.55 * vk, cx = bx + 30 * Math.sin(t * 1.3 + ph), cy = by + (1 - vk) * sh * 0.7 + 24 * Math.cos(t * 1.1 + ph)
        const bg = x.createRadialGradient(cx, cy, 0, cx, cy, r); bg.addColorStop(0, rgba(col, 0.6 * vk)); bg.addColorStop(1, rgba(col, 0))
        x.fillStyle = bg; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill()
      }
      x.restore()
    }
  }

  function phone(t, k, rot) {
    if (k <= 0) return
    const bump = bumpK(t)
    x.save(); x.translate(RL.cx, RL.cy + 6 * Math.sin(t * 1.8)); x.rotate(rot); x.scale(k * (1 + 0.05 * bump), k * (1 - 0.03 * bump))
    // body
    x.beginPath(); x.roundRect(-PH.w / 2, -PH.h / 2, PH.w, PH.h, 58); x.fillStyle = '#0d0a1c'; x.fill()
    glowStroke(x, BONE, 8, 16); x.stroke(); x.shadowBlur = 0
    const sw = PH.w - 36, sh = PH.h - 36
    x.save(); x.beginPath(); x.roundRect(-sw / 2, -sh / 2, sw, sh, 42); x.clip()
    photo(t, sw, sh)
    // profile-photo chrome: a heart that thumps on the beats
    const lb = t >= T.likes ? Math.exp(-(t - T.likes) * 5) : 0
    x.save(); x.translate(sw / 2 - 52, sh / 2 - 56); x.scale(1 + 0.5 * lb, 1 + 0.5 * lb); heartPath(x, 30)
    x.fillStyle = t >= T.likes && t < T.veil[0] ? '#ff4d7a' : 'rgba(255,255,255,0.0)'; x.fill(); x.lineWidth = 5; x.strokeStyle = rgba('#ffffff', 0.9 * (1 - ease.inOutCubic(prog(t, ...T.veil)))); x.stroke(); x.restore()
    x.restore()
    // notch
    x.fillStyle = '#0d0a1c'; x.beginPath(); x.roundRect(-56, -sh / 2 - 2, 112, 30, 15); x.fill()
    x.restore()
  }

  function stickers(t) {
    STICK.forEach((S, i) => {
      const t0 = T.filters[i]
      if (t < t0 - 0.02) return
      const k = easeOutBack(prog(t, t0 - 0.02, t0 + 0.3), 2.6)
      const fp = prog(t, T.veil[0] + i * 0.05, T.veil[0] + 0.9 + i * 0.05)
      if (fp >= 1) return
      const e = ease.inQuad(fp)
      x.save(); x.translate(S.x + (i % 2 ? 80 : -80) * fp, S.y + 1300 * e - 120 * Math.sin(Math.PI * Math.min(1, fp * 2)) * (1 - fp)); x.rotate((S.rot + (i % 2 ? 1 : -1) * 260 * e) * D2R); x.scale(k, k)
      x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
      const w = x.measureText(S.txt).width + 56
      x.beginPath(); x.roundRect(-w / 2, -40, w, 80, 40); x.fillStyle = S.col; x.shadowColor = 'rgba(6,4,18,0.8)'; x.shadowBlur = 24; x.fill(); x.shadowBlur = 0
      x.lineWidth = 6; x.strokeStyle = BONE; x.stroke()
      x.fillStyle = INK; x.fillText(S.txt, 0, 3)
      x.restore()
      drawBurst(x, B_ST[i], S.x, S.y, t, t0, S.col, 0.6)
    })
  }

  function likes(t) {
    if (t < T.likes || t > T.likes + 2) return
    for (let i = 0; i < 9; i++) {
      const t0 = T.likes + i * 0.07, p = prog(t, t0, t0 + 1.2)
      if (p <= 0 || p >= 1) continue
      const px = RL.cx + 150 + Math.sin(i * 2.1) * 160 + 30 * Math.sin(t * 5 + i), py = RL.cy + 250 - 720 * ease.outCubic(p)
      x.save(); x.translate(px, py); const s = (22 + (i % 3) * 10) * easeOutBack(Math.min(1, p * 4), 2); x.globalAlpha = 1 - ease.inQuad(p)
      heartPath(x, s); x.fillStyle = i % 2 ? '#ff4d7a' : PINK; x.shadowColor = '#ff4d7a'; x.shadowBlur = 18; x.fill(); x.restore()
    }
  }

  // the chart: the big ring light's ring becomes a zodiac wheel
  function wheelXform(t) {
    const sh = ease.inOutCubic(prog(t, ...T.shrink))
    const out = outScale(t, T.wheelOut, 0.4)
    return { cy: lerp(RL.cy, FINAL.cy, sh), s: lerp(1, FINAL.s, sh) * out, out, sh }
  }
  function chart(t) {
    const m = ease.inOutCubic(prog(t, ...T.morph))
    if (m <= 0) return
    const { cy, s, out } = wheelXform(t)
    if (out <= 0) return
    const spin = (1 - ease.outCubic(prog(t, T.morph[0], T.morph[1] + 0.5))) * -1.6 + t * 0.05
    const click = t >= T.click ? 1 : 0
    // aura behind the chart (brighter once the lamp clicks off)
    x.save(); x.globalCompositeOperation = 'lighter'
    const ak = m * out * (0.7 + 0.5 * click * (0.6 + 0.4 * Math.exp(-(t - T.click) * 3)))
    const R = 640 * s
    const g = x.createRadialGradient(RL.cx, cy, 30, RL.cx, cy, R); g.addColorStop(0, rgba('#ff6fa8', 0.34 * ak)); g.addColorStop(0.45, rgba(LILAC, 0.18 * ak)); g.addColorStop(1, rgba(LILAC, 0))
    x.fillStyle = g; x.beginPath(); x.arc(RL.cx, cy, R, 0, TAU); x.fill()
    x.restore()
    x.save(); x.translate(RL.cx, cy); x.scale(s, s)
    x.save(); x.rotate(spin)
    x.globalAlpha = m; x.beginPath(); x.arc(0, 0, WCH.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.72)'; x.fill(); x.globalAlpha = 1
    drawWheelH(x, { W: WCH, k: m, glyphK: ease.outCubic(prog(t, T.morph[0] + 0.3, T.morph[1] + 0.2)) })
    x.restore()
    // gold flash ring when it lands
    const fk = prog(t, T.morph[1] - 0.05, T.morph[1] + 0.55)
    if (fk > 0 && fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(0, 0, 460 + 160 * ease.outCubic(fk), 0, TAU); glowStroke(x, GOLD, 14 * (1 - fk) + 2, 30); x.stroke(); x.restore() }
    // the veiled face, now a little aura orb in the middle
    const ok = easeOutBack(prog(t, T.morph[0] + 0.15, T.morph[1] + 0.1), 1.8)
    if (ok > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      for (const [col, ph, r] of [['#ff6fa8', 0, 120], ['#ffa45c', 2, 90], [LILAC, 4, 110]]) {
        const ox = 18 * Math.sin(t * 1.4 + ph), oy = 14 * Math.cos(t * 1.2 + ph)
        const og = x.createRadialGradient(ox, oy, 0, ox, oy, r * ok); og.addColorStop(0, rgba(col, 0.7)); og.addColorStop(1, rgba(col, 0))
        x.fillStyle = og; x.beginPath(); x.arc(ox, oy, r * ok, 0, TAU); x.fill()
      }
      x.restore()
      x.save(); x.globalAlpha = clamp(ok); x.beginPath(); x.arc(0, 0, 96 * ok, 0, TAU); glowStroke(x, BONE, 4, 14); x.stroke(); x.restore()
    }
    // FACE · LAST
    const fl = pop01(t, T.faceLbl, 0.32) * (1 - prog(t, T.shrink[0], T.shrink[0] + 0.25))
    if (fl > 0) {
      x.save(); x.translate(0, 150); x.scale(fl, fl); x.globalAlpha = clamp(fl * 2)
      x.font = "700 34px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = BONE; x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 12; x.fillText('FACE · LAST', 0, 0); x.restore()
    }
    // Sun / Moon / Rising
    PLANETS.forEach((P, i) => {
      const k = pop01(t, T.planets[i], 0.36)
      if (k <= 0) return
      const p = lonPt(P.lon, 262), sg = signOf(P.lon)
      x.save(); x.translate(p.x, p.y); x.scale(k, k)
      x.save(); x.globalCompositeOperation = 'lighter'
      const pg = x.createRadialGradient(0, 0, 0, 0, 0, 80); pg.addColorStop(0, rgba(P.col, 0.7)); pg.addColorStop(1, rgba(P.col, 0)); x.fillStyle = pg; x.beginPath(); x.arc(0, 0, 80, 0, TAU); x.fill()
      x.restore()
      x.beginPath(); x.arc(0, 0, 26, 0, TAU); x.fillStyle = P.col; x.fill(); x.fillStyle = '#fff'; x.fillRect(-12, -12, 9, 9)
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 14
      x.font = "700 32px 'Space Mono', monospace"; x.fillStyle = BONE; x.fillText(P.name, 0, 58)
      x.font = `bold 52px ${GLYPH_FONT}`; x.fillStyle = sg.color; x.fillText(sg.glyph + '︎', 0, 104)
      x.restore()
    })
    x.restore()
    drawBurst(x, B_MORPH, RL.cx, cy, t, T.morph[1] - 0.05, GOLD, 0.9)
    PLANETS.forEach((P, i) => { const p = lonPt(P.lon, 262); drawBurst(x, B_PL[i], RL.cx + p.x * s, cy + p.y * s, t, T.planets[i] + 0.05, P.col, 0.6) })
    drawBurst(x, B_CH, 540, 520, t, T.chartLast + 0.1, GOLD, 0.7)
  }

  // the hook stage: big ring light + tripod + phone, until the morph
  function rig(t) {
    const m = ease.inOutCubic(prog(t, ...T.morph))
    const inK = pop01(t, 0.05, 0.5)
    const fl = flashK(t)
    if (m < 1) {
      const drop = ease.inCubic(prog(t, T.morph[0], T.morph[0] + 0.45))
      tripod(RL.cx, RL.cy + RL.R + 20 + drop * 500, 1900 + drop * 500, 190, inK * (1 - drop))
      // the phone holder
      x.save(); x.globalAlpha = inK * (1 - drop); glowStroke(x, '#cfc6d8', 16, 10)
      x.beginPath(); x.moveTo(RL.cx, RL.cy + PH.h / 2 - 10); x.lineTo(RL.cx, RL.cy + RL.R + 10); x.stroke(); x.restore()
      x.save(); x.translate(RL.cx, RL.cy); x.scale(inK, inK); x.translate(-RL.cx, -RL.cy)
      ringLight(RL.cx, RL.cy, RL.R, RL.w, clamp(0.85 + fl * 2), 1 - m)
      x.restore()
    }
    const pk = pop01(t, 0.14, 0.5) * outScale(t, T.morph[0], 0.4)
    phone(t, pk, -3 * D2R * Math.sin(t * 1.3))
    drawBurst(x, B_HOOK, 540, 560, t, T.hookLast + 0.1, GOLD, 0.7)
    drawBurst(x, B_LIKE, RL.cx, RL.cy, t, T.filters[3], CYAN, 0.9)
  }

  // the little ring light at the end: pops in on, clicks off, tips over
  function lamp(t) {
    if (t < T.lamp || t > T.tip + 0.8) return
    const k = pop01(t, T.lamp, 0.4)
    const since = t - T.click
    let on = 1
    if (since > 0) on = since < 0.06 ? 0.2 : since < 0.12 ? 0.8 : 0
    const tp = ease.inCubic(prog(t, T.tip, T.tip + 0.5))
    const a = 1 - prog(t, T.tip + 0.3, T.tip + 0.6)
    const shake = since > 0 && since < 0.4 ? 5 * Math.sin(since * 50) * Math.exp(-since * 8) : 0
    x.save(); x.translate(SMALL.cx, 1890); x.rotate((tp * 95 + shake) * D2R); x.scale(k, k); x.translate(-SMALL.cx, -1890)
    tripod(SMALL.cx, SMALL.cy + SMALL.R + 8, 1890, 90, a, 9)
    ringLight(SMALL.cx, SMALL.cy, SMALL.R, SMALL.w, on, a)
    x.restore()
    drawBurst(x, B_CLICK, SMALL.cx, SMALL.cy, t, T.click, BONE, 0.5)
  }

  function hearts(t) {
    if (t < T.hearts || t > T.wheelOut + 0.4) return
    const { cy, s } = wheelXform(t)
    const out = outScale(t, T.wheelOut, 0.4)
    for (let i = 0; i < 8; i++) {
      const an = (i / 8) * TAU - Math.PI / 2 + 0.2, t0 = T.hearts + i * 0.05
      const k = pop01(t, t0, 0.4) * out
      if (k <= 0) continue
      const rr = (448 + 70) * s + 10 * Math.sin(t * 3 + i)
      x.save(); x.translate(RL.cx + Math.cos(an) * rr, cy + Math.sin(an) * rr); x.rotate(Math.sin(t * 4 + i) * 0.2); x.scale(k, k)
      heartPath(x, 30 + (i % 2) * 8); x.fillStyle = i % 2 ? PINK : '#ff4d7a'; x.shadowColor = '#ff4d7a'; x.shadowBlur = 20; x.fill(); x.restore()
    }
    drawBurst(x, B_HEART, RL.cx, cy, t, T.hearts, PINK, 0.9)
    drawBurst(x, B_FALL, 540, 560, t, T.fallLast + 0.1, PINK, 0.7)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < SETTLE) {
        rig(t); stickers(t); likes(t); chart(t); lamp(t); hearts(t)
        const fl = flashK(t)
        if (fl > 0.002) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = rgba('#fff4e6', fl); x.fillRect(0, 0, 1080, 1920); x.restore() }
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.2)))
      for (const [h, o] of TEXTS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: END, cta: CTA })]

// ── cues (E major pops on the 108 bpm grid; the pop score is arranged by the style engine)
const NOTE = [329.63, 369.99, 415.3, 493.88, 554.37, 659.25, 739.99, 830.61, 987.77, 1108.73]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ...wordPops(T.hook, 4, 0.1, 0),
  ['pop', T.hookLast, 659.25, 0.06, 0], ['pluck', T.hookLast, 329.63, 0.05, 0.6, 0], ['glitter', T.hookLast, T.hookLast + 0.4],
  // the filters: shutter click + sticker pop each beat; the last one sparkles
  ...T.filters.flatMap((b, i) => [['tick', r3(b - 0.01), 0.07], ['whoosh', r3(b - 0.06), 0.12, 0.02], ['pop', r3(b + 0.02), NOTE[3 + i * 2], 0.06, (STICK[i].x - 540) / 600], ['pluck', r3(b + 0.03), NOTE[1 + i * 2] / 2, 0.03, 0.4, 0]]),
  ['bell', T.filters[2] + 0.05, 1318.51, 0.03, 1.0, -0.3], ['glitter', T.filters[2], T.filters[2] + 0.5],
  ['boom', T.filters[3], 0.08], ['glitter', T.filters[3], T.filters[3] + 0.8],
  ...[0, 1, 2, 3, 4].map(j => ['pop', r3(T.likes + j * 0.14), NOTE[5 + (j % 4)], 0.022, 0.4]),
  // the turn
  ...wordPops(T.turn, 5, 0.07, 2, 0.026),
  ['pop', T.turnLast, 830.61, 0.06, 0], ['bell', T.turnLast + 0.03, 1318.51, 0.035, 1.2, 0],
  ...[0, 1, 2, 3].map(j => ['whoosh', r3(T.veil[0] + j * 0.05), 0.35, 0.025]),
  ['riser', T.veil[0], T.morph[1], 0.035],
  // the chart
  ['whoosh', T.morph[0], 0.45, 0.045],
  ['pop', T.morph[1], 329.63, 0.07, 0], ['pluck', T.morph[1], 659.25, 0.05, 0.8, 0], ['bell', T.morph[1] + 0.05, 987.77, 0.04, 1.6, 0], ['glitter', T.morph[1], T.morph[1] + 0.7],
  ...wordPops(T.chart, 1, 0.1, 3),
  ['pop', T.chartLast, 987.77, 0.06, 0], ['bell', T.chartLast + 0.03, 1318.51, 0.03, 1.2, 0],
  ...T.planets.map((p, i) => ['pop', p, NOTE[5 + i * 2], 0.05, [0.3, -0.3, -0.4][i]]),
  ...T.planets.map((p, i) => ['bell', r3(p + 0.03), NOTE[5 + i * 2] * 2, 0.022, 0.9, [0.3, -0.3, -0.4][i]]),
  ['tick', T.faceLbl, 0.04],
  ['whoosh', T.shrink[0], 0.4, 0.035],
  // fall for the chart, not the lighting
  ...wordPops(T.fall, 4, 0.08, 1),
  ['pop', T.fallLast, 830.61, 0.06, 0], ['pluck', T.fallLast, 415.3, 0.04, 0.6, 0],
  ['pop', T.lamp, 659.25, 0.04, 0],
  ['tick', T.click, 0.12], ['tick', T.click + 0.06, 0.06], ['tick', T.click + 0.12, 0.08],
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(j => ['pop', r3(T.hearts + j * 0.05), NOTE[3 + (j % 6)], 0.026, ((j % 4) - 1.5) * 0.25]),
  ['bell', T.hearts + 0.05, 987.77, 0.045, 1.8, -0.2], ['bell', T.hearts + 0.12, 1244.51, 0.04, 1.8, 0.2], ['glitter', T.hearts, T.hearts + 0.8],
  ['whoosh', T.tip, 0.35, 0.03], ['tick', T.tip + 0.5, 0.05],
  ['whoosh', T.wheelOut, 0.4, 0.035],
  ...endcardCues(END),
]
