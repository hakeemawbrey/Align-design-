// ─────────────────────────────────────────────── SAME SKY · half B (14.8–30.0): the answer
// Starts on handoff H: drawSky(zoom 1, dx 0, dy 0, dim 1, moon (1716,122) r52 phase .12), grain .5. The two
// lit windows sat at x≈475 / x≈1505, below frame after half A's tilt-up: their charts bloom above them.
// Timing (sound):
//   15.00–15.15  root fades in over half A (identical sky, so only A's last skyline haze dissolves)
//   15.00→       sky starts a slow drift (zero velocity at 15.0, ≈3px/s later; the moon rides with it)
//   15.25–16.45  a thin light rises from each window (below frame) and the two charts bloom: rings draw,
//                ticks, ten planets pop round the wheel (left 15.30, right 15.50)
//   15.80 eyebrow "YOUR CHART" · 16.00 "Align reads your sky." types (→ ≈16.7) · holds · out 19.55–19.85
//   17.90–20.20  a constellation line draws from chart to chart in an arc across the sky; five pixel stars light
//                as the head reaches them (tick each)
//   20.20        CONNECT: the apex node flares gold, both charts pulse, a ring wave from each chart (boom + bell)
//   20.20–21.10  connected: the line holds and glows; fades 20.85–21.10
//   21.10–21.85  both charts shrink and glide into the alignment phone, under it (rises 21.30–21.95, x 1290)
//   21.65–22.50  flare on the phone's aura row as the charts land
//   21.90 eyebrow "YOU ARE NOT ARRIVING ALONE" · 22.05 "And finds who / you're written with." · out 24.20–24.50
//   22.30–23.80  phone push-in 1.0 → 1.35 (origin 50% 22%) so "Venus rules you both." reads · fades 24.20–24.70
//   24.60–25.45  tilt back down: downtown peeks in, the two hero windows (from half A) light warm near the bottom
//   25.12 "Look up. They might be, too." types (0.042/char → ≈26.3); the moon glow swells on "Look up."
//   25.50–26.25  a faint 1px line rises from each window to the moon · skyline fades 27.70–28.10
//   27.88–28.23  line rises · 27.98 rings · 28.03 chakra dots · 28.10 "Align" · 28.20 "BLIND BY DESIGN" (≈28.5)
//   29.00 soft chakra pulse · fade to black 29.60 → 29.95 (last frame 29.967 is black)
import { clamp, lerp, prog, ease, tw, rng, mix, el, C } from '../../../../src/lib.js'
import { W, H, A, SERIF, MONO, fill, img } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, grainOpacity, buildStarSprite, layerCanvas } from '../../../sky.js'
import { CITY, bakeCity, drawLayer, camLayer } from '../a/city.js'

const T0 = 14.8, T1 = 30.01, T_IN = 15.0
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }

// ── camera: slow drift continuing the tilt (sky sinks a touch, slides left); zero velocity at 15.0
const soft = u => (u <= 0 ? 0 : u - (1 - Math.exp(-u)))
const cam = t => { const s = soft(t - T_IN); return { dx: -2.6 * s, dy: 1.6 * s - 70 * cityK(t) } }
const moonAt = t => { const c = cam(t); return { x: 1716 + c.dx, y: 122 + c.dy, r: 52 } }

// ── pixel-art star sprites (fx-stars language)
const STAR_SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x, y, ch === 'C'])).filter(Boolean))
function pixStar(ctx, cx, cy, px, kind, color, centre, a) {
  if (a <= 0.003) return
  ctx.globalAlpha = clamp(a)
  const x0 = Math.round(cx - px * 3.5), y0 = Math.round(cy - px * 3.5)
  for (const [x, y, c] of STAR_SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
  ctx.globalAlpha = 1
}

// ── the two charts (over the two windows)
const CR = 178, CY = 655
const CHARTS = [
  { x: 475, t: 15.3, sign: 'Taurus', sub: 'SUN · EARTH', aura: '95,220,84', aura2: '255,210,63', rot: 0.05, seed: 11 },
  { x: 1505, t: 15.5, sign: 'Libra', sub: 'SUN · AIR', aura: '180,92,255', aura2: '255,143,177', rot: -0.05, seed: 23 },
]
const PLANET_COLS = ['#ff5a4e', '#ffb04a', '#ffe07a', '#7fe08a', '#4fd6e8', '#5a86ff', '#b77bff', '#ff7fb0', '#e8e0ff', '#9fe0c0']
CHARTS.forEach(c => {
  const r = rng(c.seed)
  c.planets = PLANET_COLS.map((col, i) => ({ a: (i / 10) * Math.PI * 2 + (r() - 0.5) * 0.45, orb: r() < 0.35 ? 0.84 : 0.66, s: 7 + r() * 6, col, d: i * 0.055 }))
  c.aspects = Array.from({ length: 5 }, () => [Math.floor(r() * 10), Math.floor(r() * 10)]).filter(([a, b]) => a !== b)
})
const CHART_OUT = 21.1, CHART_IN_PHONE = 21.85

// ── constellation (left chart → arc across the sky → right chart)
const LINE0 = 17.9, LINE1 = 20.2, T_CONNECT = 20.2
const NODES = [
  { x: 475 + CR * 0.62, y: CY - CR * 0.78, k: -1 },
  { x: 718, y: 468, kind: 1, col: '#c9a6ff' },
  { x: 850, y: 400, kind: 3, col: '#ffecc8' },
  { x: 990, y: 374, kind: 0, col: '#f2c75c', apex: true },
  { x: 1128, y: 398, kind: 1, col: '#ff8fb1' },
  { x: 1262, y: 466, kind: 3, col: '#ffecc8' },
  { x: 1505 - CR * 0.62, y: CY - CR * 0.78, k: 1 },
]
const SEG = []; let LEN = 0
for (let i = 0; i + 1 < NODES.length; i++) { const a = NODES[i], b = NODES[i + 1], l = Math.hypot(b.x - a.x, b.y - a.y); SEG.push({ a, b, l0: LEN, l }); LEN += l }
NODES.forEach((n, i) => { n.at = i === 0 ? 0 : SEG[i - 1].l0 + SEG[i - 1].l })
const headP = t => ease.inOutQuad(prog(t, LINE0, LINE1))           // fraction of the path drawn
const nodeT = n => { // time the head reaches node n (invert inOutQuad numerically)
  const f = n.at / LEN; let lo = 0, hi = 1
  for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2; ease.inOutQuad(m) < f ? lo = m : hi = m }
  return lerp(LINE0, LINE1, lo)
}
NODES.forEach(n => { n.t = nodeT(n) })
const APEX = NODES[3]
const LINE_OUT = 20.85, LINE_GONE = 21.1

// ── phone (alignment reading)
const PH = 900, PW = Math.round(PH * 1170 / 2532), PX = 1290, PY = 540
const PHONE_IN = 21.3, PHONE_LAND = 21.95, PHONE_OUT = 24.2, PHONE_GONE = 24.7
const PUSH0 = 22.3, PUSH1 = 23.8
const AURA_PT = [{ x: PX - PW / 2 + PW * 0.455, y: PY - PH / 2 + PH * 0.22 }, { x: PX - PW / 2 + PW * 0.575, y: PY - PH / 2 + PH * 0.22 }]

// ── captions
const CAP1 = { eb: 15.8, type: 16.0, per: 0.032, out: 19.55, gone: 19.85 }
const CAP2 = { eb: 21.9, line: 22.05, out: 24.2, gone: 24.5 }
const LINE1_TXT = 'Align reads your sky.'

// ── end
const END = 'Look up. They might be, too.'
const T_TYPE = 25.12, PER = 0.042, FADE = 0.1
const T_RISE = 27.88, T_RINGS = 27.98, T_DOTS = 28.03, T_WORD = 28.1, T_SUB = 28.2
const T_PULSE = 29.0, T_OUT = 29.6, T_BLACK = 29.95
const T_HOLD = T_RINGS + 0.45
const LINE_Y0 = H / 2, LINE_Y1 = 230, LINE_FS = 112
const MARK = 250, MARK_CY = 507, WORD_TOP = 647, WORD_FS = 118, SUB_TOP = 821, SUB_FS = 30
// the city returns under the end line: tilt down until downtown peeks in and the two hero windows sit near the bottom
const CITY_IN0 = 24.6, CITY_IN1 = 25.45, CITY_OUT0 = 27.7, CITY_OUT1 = 28.1, MOONLINE0 = 25.5, MOONLINE1 = 26.25
const CZ = 0.72, CF = [960, 660], CPAN = 26
const TILT_END = (() => { const T = camLayer({ Z: CZ, F: CF, pan: CPAN, tilt: 0 }, 0.75), k = 1 + 0.14 * 0.75; return (1005 - CITY.HA.y * T.s - T.oy) / k })()
const cityK = t => ease.outCubic(prog(t, CITY_IN0, CITY_IN1))
const cityCam = t => ({ Z: CZ, F: CF, pan: CPAN, tilt: TILT_END + 780 * (1 - cityK(t)) + 90 * ease.inQuad(prog(t, CITY_OUT0, CITY_OUT1)) })
const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']

function pocketCanvas(cx, cy, rx, ry, a) {
  const c = canvas(W, H), k = c.getContext('2d')
  k.save(); k.translate(cx, cy); k.scale(1, ry / rx)
  const g = k.createRadialGradient(0, 0, 0, 0, 0, rx)
  g.addColorStop(0, `rgba(11,6,32,${a})`); g.addColorStop(0.55, `rgba(11,6,32,${a * 0.65})`); g.addColorStop(1, 'rgba(11,6,32,0)')
  k.fillStyle = g; k.fillRect(-rx, -rx, rx * 2, rx * 2); k.restore()
  return c
}

async function build(stage) {
  const root = fill(stage, { background: C.void, opacity: 0 })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  const spriteS = buildStarSprite(true)
  const pkTop = pocketCanvas(W / 2, 250, 760, 230, 0.55)
  const pkLeft = pocketCanvas(560, 520, 620, 360, 0.6)
  bakeCity()
  const pkEnd = pocketCanvas(W / 2, H / 2, 820, 510, 0.58)


  // ambient pixel twinkles, clear of the captions, charts and the moon
  const pr = rng(5150), PIXC = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ff8fb1', '#c9a6ff', '#ffd98a']
  const PIX = []
  while (PIX.length < 16) {
    const x = pr() * W, y = pr() * H
    if (x > 380 && x < 1540 && y > 120 && y < 400) continue
    if (x > 1540 && y < 300) continue
    if (Math.hypot(x - 475, y - CY) < CR + 90 || Math.hypot(x - 1505, y - CY) < CR + 90) continue
    PIX.push({ x, y, px: pr() < 0.3 ? 4 : 3, col: PIXC[Math.floor(pr() * PIXC.length)], ph: pr() * 6.28, sp: 2 + pr() * 3, kind: Math.floor(pr() * 4), t0: 15.4 + pr() * 1.2 })
  }
  // motes rising from the windows (light leaving the city)
  const mr = rng(808)
  const MOTES = Array.from({ length: 22 }, (_, i) => ({ c: i % 2, ox: (mr() - 0.5) * 90, t0: 15.15 + mr() * 1.1, dur: 0.9 + mr() * 0.7, px: mr() < 0.4 ? 3 : 2 }))

  // ── chart wheel (drawn live: rings draw, ticks, planets pop)
  function drawChart(c, t, { x, y, R, a, pulse = 0, fly = 0 }) {
    const lab = 1 - prog(fly, 0, 0.28)   // sign text and inner disc leave first, before the phone arrives
    if (a <= 0.003) return
    const p = prog(t, c.t, c.t + 1.1)
    if (p <= 0) return
    const rot = c.rot * (t - c.t)
    const ringP = ease.outCubic(prog(p, 0.05, 0.6))
    bx.save()
    // aura
    const au = ease.outQuad(prog(p, 0, 0.5)) * a * (1 + 0.5 * pulse)
    let g = bx.createRadialGradient(x, y, R * 0.2, x, y, R * 1.9)
    g.addColorStop(0, `rgba(${c.aura},${0.34 * au})`); g.addColorStop(0.45, `rgba(${c.aura2},${0.12 * au})`); g.addColorStop(1, `rgba(${c.aura},0)`)
    bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(x - R * 2, y - R * 2, R * 4, R * 4)
    bx.globalCompositeOperation = 'source-over'
    // dark inner disc
    bx.globalAlpha = a * lab * ease.inOutQuad(prog(p, 0.3, 0.8))
    g = bx.createRadialGradient(x, y, 0, x, y, R * 0.46)
    g.addColorStop(0, 'rgba(11,6,32,0.78)'); g.addColorStop(0.8, 'rgba(11,6,32,0.62)'); g.addColorStop(1, 'rgba(11,6,32,0)')
    bx.fillStyle = g; bx.beginPath(); bx.arc(x, y, R * 0.47, 0, Math.PI * 2); bx.fill()
    // rings
    bx.lineCap = 'round'
    const arc = (r, lw, al, dir = 1) => {
      bx.globalAlpha = a * al; bx.lineWidth = lw; bx.beginPath()
      const s = -Math.PI / 2 + rot * dir
      bx.arc(x, y, r, s, s + Math.PI * 2 * ringP * dir, dir < 0); bx.stroke()
    }
    bx.strokeStyle = '#efe6d6'
    arc(R, 1.6, 0.75); arc(R * 0.86, 1.1, 0.5, -1); arc(R * 0.47, 1.2, 0.55)
    bx.strokeStyle = `rgb(${c.aura})`; arc(R * 0.66, 1, 0.35)
    // zodiac ticks (12 signs, 6 minor each)
    const tk = prog(p, 0.25, 0.75)
    bx.strokeStyle = '#efe6d6'
    for (let i = 0; i < 72; i++) {
      if (i / 72 > tk) break
      const an = -Math.PI / 2 + (i / 72) * Math.PI * 2 - rot * 0.5, major = i % 6 === 0
      const r0 = major ? R * 0.86 : R * 0.93
      bx.globalAlpha = a * (major ? 0.75 : 0.35); bx.lineWidth = major ? 1.4 : 1
      bx.beginPath(); bx.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); bx.lineTo(x + Math.cos(an) * R, y + Math.sin(an) * R); bx.stroke()
    }
    // planets
    const pos = pl => { const an = pl.a + rot; return [x + Math.cos(an) * R * pl.orb, y + Math.sin(an) * R * pl.orb] }
    // aspect chords
    const asp = prog(p, 0.75, 1)
    if (asp > 0) {
      bx.strokeStyle = `rgb(${c.aura2})`; bx.lineWidth = 1
      c.aspects.forEach(([i, j], k) => {
        const [x1, y1] = pos(c.planets[i]), [x2, y2] = pos(c.planets[j]), q = clamp(asp * 1.6 - k * 0.12)
        bx.globalAlpha = a * 0.28 * q; bx.beginPath(); bx.moveTo(x1, y1); bx.lineTo(lerp(x1, x2, q), lerp(y1, y2, q)); bx.stroke()
      })
    }
    c.planets.forEach(pl => {
      const q = prog(p, 0.3 + pl.d, 0.48 + pl.d)
      if (q <= 0) return
      const sc = ease.outBack(q), [px, py] = pos(pl), s = pl.s * sc * (R / CR)
      bx.globalAlpha = a
      const hg = bx.createRadialGradient(px, py, 0, px, py, s * 2.6)
      hg.addColorStop(0, pl.col + '88'); hg.addColorStop(1, pl.col + '00')
      bx.globalCompositeOperation = 'lighter'; bx.fillStyle = hg; bx.fillRect(px - s * 2.6, py - s * 2.6, s * 5.2, s * 5.2)
      bx.globalCompositeOperation = 'source-over'
      const sg = bx.createRadialGradient(px - s * 0.35, py - s * 0.4, s * 0.1, px, py, s)
      sg.addColorStop(0, '#ffffff'); sg.addColorStop(0.35, pl.col); sg.addColorStop(1, mix(pl.col, '#140a2e', 0.55))
      bx.fillStyle = sg; bx.beginPath(); bx.arc(px, py, s, 0, Math.PI * 2); bx.fill()
    })
    // centre: the sign
    const tp = ease.outQuad(prog(p, 0.45, 0.85))
    if (tp > 0 && R > 60) {
      bx.globalAlpha = a * tp * lab; bx.fillStyle = '#efe6d6'; bx.textAlign = 'center'; bx.textBaseline = 'middle'
      bx.font = `italic ${Math.round(R * 0.25)}px 'EB Garamond', Georgia, serif`
      bx.fillText(c.sign, x, y + R * 0.03)
      bx.font = `${Math.round(R * 0.075)}px 'Space Mono', monospace`
      bx.fillStyle = `rgb(${c.aura})`
      bx.globalAlpha = a * tp * 0.9 * lab
      bx.fillText(c.sub.split('').join(String.fromCharCode(8202)), x, y + R * 0.2)
    }
    bx.restore()
  }

  // ── captions
  function eyebrow(parent, txt, style = {}) {
    return el('div', { position: 'absolute', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.bone, whiteSpace: 'nowrap',
      textShadow: '0 0 16px rgba(8,4,24,0.9), 0 0 5px rgba(8,4,24,0.7)', opacity: 0, ...style }, parent, txt)
  }
  const SH = '0 0 26px rgba(8,4,24,0.8), 0 0 8px rgba(8,4,24,0.6), 0 2px 3px rgba(4,2,14,0.5)'

  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' })
  const gx = gC.getContext('2d')
  // phone layer (above grain, like f6/f7)
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '2000px' }, root)
  const pAura = el('div', { position: 'absolute', left: (PX - 460) + 'px', top: (PY - 560) + 'px', width: '920px', height: '1120px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(214,170,255,0.5), rgba(180,92,255,0.2) 55%, rgba(180,92,255,0) 100%)' }, persp)
  const phone = el('div', { position: 'absolute', left: (PX - PW / 2) + 'px', top: (PY - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', opacity: 0, willChange: 'transform', transformOrigin: '50% 22%' }, persp)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '54px', overflow: 'hidden', background: C.canvas,
    boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 70px rgba(255,150,232,0.22), 0 0 0 1.5px rgba(239,230,214,0.35)' }, phone)
  img(scr, A + 'screen-alignment.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  const flare = el('div', { position: 'absolute', left: (PW * 0.515 - 150) + 'px', top: (PH * 0.22 - 110) + 'px', width: '300px', height: '220px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(255,236,250,0.9), rgba(220,160,255,0.35) 50%, rgba(180,92,255,0) 100%)' }, phone)

  const capLayer = fill(root, { background: 'transparent' })
  // caption 1: top centre
  const eb1 = eyebrow(capLayer, '✦&nbsp;&nbsp;Your chart&nbsp;&nbsp;✦', { left: 0, width: W + 'px', textAlign: 'center', top: '168px', textIndent: '0.26em' })
  const l1 = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '218px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '108px', lineHeight: 1, color: C.bone, whiteSpace: 'pre', textShadow: SH }, capLayer)
  const l1chars = [...LINE1_TXT].map(ch => el('span', { opacity: 0 }, l1, ch === ' ' ? ' ' : ch))
  // caption 2: left of the phone
  const c2 = el('div', { position: 'absolute', left: '180px', top: '372px', opacity: 0 }, capLayer)
  const eb2 = eyebrow(c2, '✦&nbsp;&nbsp;You are not arriving alone', { position: 'relative', marginBottom: '26px' })
  const l2 = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '100px', lineHeight: 1.04, color: C.bone, whiteSpace: 'nowrap', textShadow: SH }, c2, 'And finds who<br>you’re written with.')

  // end line (per-char spans)
  const lineBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', textAlign: 'center', transformOrigin: '50% 50%', willChange: 'transform' }, root)
  const lineE = el('div', { display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontSize: LINE_FS + 'px', lineHeight: '1', whiteSpace: 'pre', color: C.bone,
    textShadow: '0 0 30px rgba(11,6,32,0.85), 0 2px 10px rgba(11,6,32,0.7)' }, lineBox)
  const chars = [...END].map(ch => el('span', { opacity: 0 }, lineE, ch === ' ' ? ' ' : ch))
  const ACC = [C.rub, C.amber, C.gold, C.plum]

  // lockup (g4/f8 recipe)
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${MARK_CY + 120}px` })
  const glow = el('div', { position: 'absolute', left: (W / 2 - 520) + 'px', top: (MARK_CY - 380) + 'px', width: '1040px', height: '760px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(154,123,224,0.34), rgba(154,123,224,0.12) 55%, rgba(11,6,32,0) 100%)' }, lock)
  const RR = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * RR, Math.sin(a) * RR] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: RR })), { x: 0, y: 0, r: 40 }]
  const defs = CHK.map((c, i) => `<radialGradient id="ssg${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="ssc${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px', opacity: 0 }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.15" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#ssg${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#ssc${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.1, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'BLIND BY DESIGN')

  const black = fill(root, { background: '#000', opacity: 0 })

  return {
    start: T0, end: T1, root,
    update(t) {
      root.style.opacity = String(ease.inOutQuad(prog(t, T_IN, T_IN + 0.15)))
      const c = cam(t), m = moonAt(t), fr = Math.round(t * 30)
      const ddx = c.dx * 1.2, ddy = c.dy * 1.2       // foreground (charts/line/twinkles) parallax

      // ── sky + the one moon (brightens on "Look up.")
      drawSky(bx, t, { zoom: 1, dx: c.dx, dy: c.dy, dim: 1, moon: { x: m.x, y: m.y, r: m.r, phase: 0.12, alpha: 1 } })
      {
        const mb = tw(t, [[T_TYPE + 0.05, 0], [T_TYPE + 0.45, 1, ease.outQuad], [27.0, 1], [28.1, 0.5, ease.inOutQuad], [T_PULSE, 0.5], [T_PULSE + 0.3, 0.8, ease.outQuad], [29.4, 0.45, ease.inOutQuad]])
        if (mb > 0.003) {
          const g = bx.createRadialGradient(m.x, m.y, m.r * 0.8, m.x, m.y, m.r * 5)
          g.addColorStop(0, `rgba(255,240,214,${0.45 * mb})`); g.addColorStop(0.4, `rgba(255,240,214,${0.12 * mb})`); g.addColorStop(1, 'rgba(255,240,214,0)')
          bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(m.x - m.r * 5, m.y - m.r * 5, m.r * 10, m.r * 10)
          bx.globalCompositeOperation = 'source-over'
        }
      }
      // ambient twinkles
      bx.imageSmoothingEnabled = false
      const tick2 = fr >> 1
      PIX.forEach((s, i) => {
        const a = ease.outQuad(prog(t, s.t0, s.t0 + 0.4)) * (0.45 + 0.55 * Math.sin(t * s.sp + s.ph)) * (1 - 0.6 * prog(t, 25.0, 25.6))
        pixStar(bx, s.x + ddx, s.y + ddy, s.px, (tick2 + i) % 5 === 0 ? 2 : s.kind, s.col, '#fff3e0', a)
      })
      bx.imageSmoothingEnabled = true

      // caption pockets (keep bone type on dark)
      const pk1 = ease.inOutQuad(prog(t, 15.5, 16.1)) * (1 - ease.inOutQuad(prog(t, CAP1.out, CAP1.gone + 0.1)))
      if (pk1 > 0.003) { bx.globalAlpha = pk1; bx.drawImage(pkTop, 0, 0); bx.globalAlpha = 1 }
      const pk2 = ease.inOutQuad(prog(t, 21.6, 22.2)) * (1 - ease.inOutQuad(prog(t, CAP2.out, CAP2.gone + 0.15)))
      if (pk2 > 0.003) { bx.globalAlpha = pk2; bx.drawImage(pkLeft, 0, 0); bx.globalAlpha = 1 }
      const pk3 = ease.inOutQuad(prog(t, 25.0, 25.6))
      if (pk3 > 0.003) { bx.globalAlpha = pk3; bx.drawImage(pkEnd, 0, 0); bx.globalAlpha = 1 }

      // ── the city again: downtown peeks in, the two windows lit warm, a faint line from each up to the moon
      const ca = cityK(t) * (1 - ease.inOutQuad(prog(t, CITY_OUT0, CITY_OUT1)))
      if (ca > 0.003) {
        const cc = cityCam(t), Ls = CITY.layers
        bx.save(); bx.globalAlpha = ca
        {
          const Tr = camLayer(cc, Ls[0].f), y = v => v * Tr.s + Tr.oy
          const g = bx.createLinearGradient(0, y(430), 0, y(860))
          g.addColorStop(0, 'rgba(110,80,180,0)'); g.addColorStop(0.55, `rgba(118,86,186,${0.2 * ca})`); g.addColorStop(0.85, `rgba(150,104,170,${0.34 * ca})`); g.addColorStop(1, `rgba(196,120,120,${0.3 * ca})`)
          bx.fillStyle = g; bx.fillRect(0, y(430), W, Math.max(0, H - y(430)))
        }
        for (const L of Ls) drawLayer(bx, cc, L, ca)
        const T2 = camLayer(cc, Ls[2].f)
        const lit = ease.outQuad(prog(t, CITY_IN1 - 0.3, CITY_IN1 + 0.15))
        const ml = ease.inOutQuad(prog(t, MOONLINE0, MOONLINE1))
        ;[[CITY.HA, 0.62], [CITY.HB, 0.38]].forEach(([w, fx], k) => {
          const cx = (w.x + w.w / 2) * T2.s + T2.ox, cy = (w.y + w.h / 2) * T2.s + T2.oy
          const ww = 22, hh = 26, br = 0.9 + 0.1 * Math.sin(t * 2.2 + k * 1.7)
          const G = 110
          const g = bx.createRadialGradient(cx, cy, 0, cx, cy, G)
          g.addColorStop(0, `rgba(255,198,132,${0.42 * lit * br * ca})`); g.addColorStop(0.3, `rgba(255,198,132,${0.12 * lit * ca})`); g.addColorStop(1, 'rgba(255,198,132,0)')
          bx.globalAlpha = 1; bx.fillStyle = g; bx.fillRect(cx - G, cy - G, G * 2, G * 2)
          bx.globalAlpha = ca * lit; bx.fillStyle = `rgb(255,${Math.round(206 * br)},146)`; bx.fillRect(cx - ww / 2, cy - hh / 2, ww, hh)
          // a figure at the glass, head tipped up toward the moon (which is up and to the right)
          bx.fillStyle = 'rgba(14,8,30,0.92)'
          const px = cx - ww / 2 + ww * fx, py = cy + hh / 2
          bx.beginPath(); bx.ellipse(px + 1.2, py - hh * 0.58, ww * 0.15, ww * 0.17, -0.35, 0, Math.PI * 2); bx.fill()   // head
          bx.fillRect(px - ww * 0.06, py - hh * 0.46, ww * 0.12, hh * 0.12)                                                // neck
          bx.beginPath(); bx.ellipse(px, py, ww * 0.34, hh * 0.36, 0, Math.PI, 0); bx.fill()                              // shoulders
          // frame: a thin dark sill + top edge so it reads as a window
          bx.fillStyle = 'rgba(14,8,30,0.6)'; bx.fillRect(cx - ww / 2 - 2, cy + hh / 2, ww + 4, 2); bx.fillRect(cx - ww / 2, cy - hh / 2, ww, 1.5)
          // the line up to the moon
          if (ml > 0) {
            const x0 = cx, y0 = cy - hh / 2 - 3, x1 = lerp(x0, m.x, ml), y1 = lerp(y0, m.y + m.r * 0.9, ml)
            // drawn twice (soft glow + core), in short pieces that fade out within 40px of the end line's box
            const N = 90, mask = (x, y) => { const dx = Math.max(370 - x, 0, x - 1550), dy = Math.max(470 - y, 0, y - 620); return clamp(Math.hypot(dx, dy) / 40) }
            bx.strokeStyle = '#ffecd2'; bx.lineCap = 'round'
            for (const [lw, la] of [[7, 0.12], [2, 0.75]]) {
              bx.lineWidth = lw
              for (let i = 0; i < N; i++) {
                const a0 = i / N, a1 = (i + 1) / N, mx = lerp(x0, x1, (a0 + a1) / 2), my = lerp(y0, y1, (a0 + a1) / 2)
                const mk = mask(mx, my) * (0.55 + 0.45 * a1)
                if (mk <= 0.01) continue
                bx.globalAlpha = la * ca * mk
                bx.beginPath(); bx.moveTo(lerp(x0, x1, a0), lerp(y0, y1, a0)); bx.lineTo(lerp(x0, x1, a1), lerp(y0, y1, a1)); bx.stroke()
              }
            }
            // a soft glint at the head as it climbs
            if (ml < 1) { bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = 0.7 * ca * mask(x1, y1); bx.drawImage(spriteS, x1 - 26, y1 - 26, 52, 52); bx.globalCompositeOperation = 'source-over' }
          }
        })
        bx.restore()
      }

      // ── light rising from the two windows (below frame) + motes
      CHARTS.forEach((ch, i) => {
        const b = tw(t, [[ch.t - 0.15, 0], [ch.t + 0.25, 1, ease.outQuad], [ch.t + 1.5, 0.25, ease.inOutQuad], [CHART_OUT, 0, ease.inOutQuad]])
        if (b <= 0.003) return
        const x = ch.x + ddx, top = lerp(H, CY + ddy, ease.outCubic(prog(t, ch.t - 0.15, ch.t + 0.45)))
        const hgt = H - top + 60
        bx.save(); bx.globalCompositeOperation = 'lighter'
        bx.translate(x, H + 30); bx.scale(1, hgt / 70)
        const g = bx.createRadialGradient(0, 0, 0, 0, 0, 70)
        g.addColorStop(0, `rgba(${ch.aura2},${0.3 * b})`); g.addColorStop(0.5, `rgba(${ch.aura},${0.1 * b})`); g.addColorStop(1, `rgba(${ch.aura},0)`)
        bx.fillStyle = g; bx.fillRect(-70, -70, 140, 140)
        bx.restore()
        // soft core line
        bx.save(); bx.globalCompositeOperation = 'lighter'
        const cg = bx.createLinearGradient(0, H, 0, top)
        cg.addColorStop(0, `rgba(255,236,205,0)`); cg.addColorStop(0.35, `rgba(255,236,205,${0.3 * b})`); cg.addColorStop(1, `rgba(255,236,205,0)`)
        bx.fillStyle = cg; bx.fillRect(x - 1, top, 2, H - top)
        bx.restore()

      })
      bx.imageSmoothingEnabled = false
      MOTES.forEach((mo, i) => {
        const ch = CHARTS[mo.c], q = prog(t, mo.t0 + (ch.t - 15.3), mo.t0 + (ch.t - 15.3) + mo.dur)
        if (q <= 0 || q >= 1) return
        const x = ch.x + ddx + mo.ox * (0.4 + q), y = lerp(H + 10, CY + 80, ease.outQuad(q)) + ddy
        pixStar(bx, x, y, mo.px, 2, i % 3 ? '#ffecc8' : `rgb(${ch.aura2})`, '#fff6e6', Math.sin(Math.PI * q) * 0.9)
      })
      bx.imageSmoothingEnabled = true

      // ── charts: bloom, pulse on connect, then glide into the phone's aura row
      const pin = ease.outCubic(prog(t, PHONE_IN, PHONE_LAND)), pout = ease.inOutQuad(prog(t, PHONE_OUT, PHONE_GONE))
      const phoneDY = lerp(720, 0, pin) + 30 * pout
      const fly = ease.inOutCubic(prog(t, CHART_OUT, CHART_IN_PHONE))
      const pulse = tw(t, [[T_CONNECT - 0.02, 0], [T_CONNECT + 0.1, 1, ease.outQuad], [T_CONNECT + 0.6, 0, ease.inOutQuad]])
      CHARTS.forEach((ch, i) => {
        const x0 = ch.x + ddx, y0 = CY + ddy, tgt = AURA_PT[i]
        const x = lerp(x0, tgt.x, fly), y = lerp(y0, tgt.y + phoneDY, fly) - Math.sin(Math.PI * fly) * 40
        const R = lerp(CR, 34, fly) * (1 + 0.04 * pulse)
        const a = 1 - ease.inQuad(prog(fly, 0.55, 0.9))
        drawChart(ch, t, { x, y, R, a, pulse, fly })
      })
      // ring waves on connect
      {
        const q = prog(t, T_CONNECT, T_CONNECT + 0.9)
        if (q > 0 && q < 1) {
          bx.save(); bx.strokeStyle = '#efe6d6'; bx.lineWidth = 2
          CHARTS.forEach(ch => {
            bx.globalAlpha = 0.45 * (1 - q) * (1 - q)
            bx.beginPath(); bx.arc(ch.x + ddx, CY + ddy, CR * (1 + 0.9 * ease.outCubic(q)), 0, Math.PI * 2); bx.stroke()
          })
          bx.restore()
        }
      }

      // ── constellation line between the two charts
      const lineA = 1 - ease.inOutQuad(prog(t, LINE_OUT, LINE_GONE))
      const hp = headP(t)
      if (hp > 0 && lineA > 0.003) {
        const d = hp * LEN
        bx.save(); bx.lineCap = 'round'; bx.lineJoin = 'round'
        const flash = tw(t, [[T_CONNECT - 0.02, 0], [T_CONNECT + 0.08, 1, ease.outQuad], [T_CONNECT + 0.7, 0.25, ease.inOutQuad]])
        for (const pass of [[10, 0.12], [3, 0.75]]) {
          bx.lineWidth = pass[0]; bx.strokeStyle = pass[0] > 3 ? 'rgb(201,166,255)' : 'rgb(255,240,220)'
          bx.globalAlpha = lineA * (pass[1] + 0.2 * flash)
          bx.beginPath(); bx.moveTo(NODES[0].x + ddx, NODES[0].y + ddy)
          for (const s of SEG) {
            if (d <= s.l0) break
            const f = Math.min(1, (d - s.l0) / s.l)
            bx.lineTo(lerp(s.a.x, s.b.x, f) + ddx, lerp(s.a.y, s.b.y, f) + ddy)
          }
          bx.stroke()
        }
        // travelling head (soft glint while drawing)
        if (hp < 1) {
          let hx = 0, hy = 0
          for (const s of SEG) if (d >= s.l0 && d <= s.l0 + s.l) { const f = (d - s.l0) / s.l; hx = lerp(s.a.x, s.b.x, f); hy = lerp(s.a.y, s.b.y, f) }
          bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = 0.85 * lineA
          bx.drawImage(spriteS, hx + ddx - 36, hy + ddy - 36, 72, 72)
        }
        bx.restore()
      }
      // nodes
      bx.imageSmoothingEnabled = false
      NODES.forEach((n, j) => {
        if (n.k) return
        const q = prog(t, n.t - 0.02, n.t + 0.12)
        if (q <= 0) return
        const blink = ((fr >> 1) + j) & 3
        const fl = n.apex ? tw(t, [[T_CONNECT - 0.03, 0], [T_CONNECT + 0.08, 1, ease.outQuad], [T_CONNECT + 0.8, 0.3, ease.inOutQuad]]) : 0
        const pop = Math.exp(-Math.pow((t - n.t - 0.08) / 0.1, 2))
        const a = lineA * ease.outQuad(q)
        if (pop + fl > 0.02) {
          bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = a * Math.min(1, 0.55 * pop + 0.9 * fl)
          const s = 70 + 260 * fl
          bx.drawImage(spriteS, n.x + ddx - s / 2, n.y + ddy - s / 2, s, s)
          bx.globalCompositeOperation = 'source-over'
        }
        pixStar(bx, n.x + ddx, n.y + ddy, fl > 0.5 ? 5 : 4, blink === 0 && !n.apex ? 2 : n.kind, n.col, '#fff3e0', a)
      })
      bx.imageSmoothingEnabled = true

      // ── caption 1
      eb1.style.opacity = String(ease.outQuad(prog(t, CAP1.eb, CAP1.eb + 0.3)) * (1 - ease.inOutQuad(prog(t, CAP1.out, CAP1.gone))))
      const out1 = 1 - ease.inOutQuad(prog(t, CAP1.out, CAP1.gone))
      l1chars.forEach((s, i) => {
        const p = prog(t, CAP1.type + i * CAP1.per, CAP1.type + i * CAP1.per + 0.14)
        s.style.opacity = String(ease.outQuad(p) * out1)
        s.style.color = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
      })
      l1.style.transform = `translateY(${lerp(6, 0, ease.outCubic(prog(t, CAP1.type, CAP1.type + 0.8))) - 8 * prog(t, CAP1.out, CAP1.gone)}px)`

      // ── phone
      phone.style.opacity = String(ease.outQuad(prog(t, PHONE_IN, PHONE_IN + 0.07)) * (1 - pout))
      const push = lerp(1, 1.35, ease.inOutCubic(prog(t, PUSH0, PUSH1)))
      phone.style.transform = `translateY(${phoneDY}px) rotateX(${lerp(14, 0, pin)}deg) rotateY(${lerp(-10, -3, pin) + 2 * prog(t, PHONE_LAND, PHONE_OUT)}deg) scale(${push * lerp(1, 0.95, pout)})`
      pAura.style.opacity = String(ease.inOutQuad(prog(t, 20.9, 21.6)) * (0.8 + 0.2 * Math.sin((t - 21) * 1.7)) * (1 - pout))
      flare.style.opacity = String(tw(t, [[21.65, 0], [21.85, 0.9, ease.outQuad], [22.5, 0, ease.inOutQuad]]))

      // ── caption 2
      const c2in = ease.outCubic(prog(t, CAP2.eb, CAP2.eb + 0.4)), c2out = ease.inOutQuad(prog(t, CAP2.out, CAP2.gone))
      c2.style.opacity = String(1 - c2out)
      eb2.style.opacity = String(c2in)
      l2.style.opacity = String(ease.outQuad(prog(t, CAP2.line, CAP2.line + 0.45)))
      l2.style.transform = `translateY(${lerp(14, 0, ease.outCubic(prog(t, CAP2.line, CAP2.line + 0.6)))}px)`
      l2.style.filter = t < CAP2.line + 0.4 ? `blur(${lerp(6, 0, ease.outQuad(prog(t, CAP2.line, CAP2.line + 0.4)))}px)` : 'none'

      // ── end line
      chars.forEach((s, i) => {
        const t0 = T_TYPE + i * PER, p = prog(t, t0, t0 + FADE)
        s.style.opacity = String(ease.outQuad(p))
        s.style.color = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
      })
      const rise = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.35))
      const ly = lerp(LINE_Y0, LINE_Y1, rise) - LINE_FS * 0.55
      lineBox.style.transform = `translateY(${ly}px) scale(${lerp(0.985, 1, ease.outCubic(prog(t, T_TYPE, T_TYPE + 1.2)))})`

      // ── lockup
      rings.forEach((r, i) => r.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.02, T_RINGS + 0.24 + i * 0.02)))))
      const pulseC = i => 0.6 * tw(t, [[T_PULSE + i * 0.05, 0], [T_PULSE + 0.07 + i * 0.05, 1, ease.outQuad], [T_PULSE + 0.4 + i * 0.05, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.05 * Math.sin((t - T_HOLD) * 2.4 - i * 0.5) * prog(t, T_HOLD, T_HOLD + 0.3)
      halos.forEach((h, i) => {
        const p = ease.outCubic(prog(t, T_DOTS + i * 0.03, T_DOTS + i * 0.03 + 0.15))
        h.setAttribute('r', String(11.1 * p * breathe(i) * (1 + 0.45 * pulseC(i))))
        h.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulseC(i))))
      })
      cores.forEach((cc, i) => {
        const p = prog(t, T_DOTS + i * 0.03, T_DOTS + i * 0.03 + 0.14)
        cc.setAttribute('r', String(tw(p, [[0, 0], [0.6, 5.55], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulseC(i))))
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
      lock.style.transform = `scale(${lerp(1, 1.012, prog(t, T_RINGS, T_BLACK))})`

      // ── grain + fade to black
      drawGrain(gx, t)
      black.style.opacity = String(ease.inOutQuad(prog(t, T_OUT, T_BLACK)))
    },
  }
}

export const SCENES = [build]
export const CUES = [
  ['riser', 15.0, 15.6, 0.05],
  ['bell', CHARTS[0].t + 0.05, 293.66, 0.05, 2.6, -0.5],                   // left chart blooms
  ['bell', CHARTS[1].t + 0.05, 369.99, 0.05, 2.6, 0.5],                    // right chart blooms
  ['glitter', 15.4, 16.5],
  ...[...LINE1_TXT].map((ch, i) => ch === ' ' ? null : ['tick', CAP1.type + i * CAP1.per, 0.018]).filter(Boolean),
  ['riser', LINE0, T_CONNECT, 0.07],                                        // the line draws across the sky
  ...NODES.filter(n => !n.k).map((n, i) => ['bell', n.t + 0.04, [587.33, 659.25, 739.99, 880, 987.77][i], 0.03, 1.4, (n.x - 960) / 960 * 0.6]),
  ['boom', T_CONNECT, 0.26],                                                // connect
  ['bell', T_CONNECT + 0.01, 1174.66, 0.03, 2.0, 0],
  ['glitter', T_CONNECT, T_CONNECT + 0.7],
  ['whoosh', PHONE_IN - 0.04, 0.6, 0.09],                                   // charts glide into the phone
  ['tick', PHONE_LAND - 0.08, 0.12], ['boom', PHONE_LAND - 0.08, 0.18],
  ['bell', CAP2.line, 440, 0.035, 2.4, -0.3],
  ['whoosh', PHONE_OUT, 0.5, 0.05],
  ['whoosh', CITY_IN0, 0.9, 0.05],                                          // tilt back down to the city
  ['bell', CITY_IN1 - 0.2, 392, 0.03, 2.4, -0.4], ['bell', CITY_IN1 - 0.1, 493.88, 0.03, 2.4, 0.4],   // the two windows light
  ['glitter', MOONLINE0, MOONLINE1],
  ...[...END].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.02]).filter(Boolean),
  ['bell', T_TYPE + 0.02, 587.33, 0.04, 2.4, 0],
  ['glitter', T_TYPE + 0.1, T_TYPE + 0.6],                                  // the moon brightens on "Look up."
  ['whoosh', T_RISE - 0.02, 0.5, 0.08],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T_DOTS + i * 0.03, f, 0.06, 2.2, (i - 3) * 0.12]),
  ['boom', T_WORD, 0.2],
  ['bell', T_WORD + 0.02, 146.83, 0.05, 3.2, 0],
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_PULSE + i * 0.05, f, 0.018, 1.6, (i - 3) * 0.1]),
  ['boom', T_OUT + 0.05, 0.3],
  ['bell', T_OUT + 0.06, 73.42, 0.05, 3.0, 0],
]
