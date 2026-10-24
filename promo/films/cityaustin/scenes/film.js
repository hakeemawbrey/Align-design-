// cityaustin (15 s vertical Align ad) · story 0–10.6, then the shared END CARD ("come" + the Align logo + VOTE FOR YOUR CITY).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–2.70   HOOK  "Austin: | everyone's | “in a band.”" — a food truck under string lights, three pictogram
//               guitarists strum on the beat, music notes float up.
//   2.75–5.00   "…and “between | things.”" — the strumming stops; chat bubbles pop over them: "between things",
//               "kinda", "we'll see". Bats stream across the sky.
//   5.20–8.30   "On Align, | Dealbreakers | come *first.*" — a DEALBREAKERS card; three chips stamp on:
//               ✕ "BETWEEN THINGS", ✕ FLAKY PLANS, ✕ "WE'LL SEE".
//   8.45–10.35  "Know what | they're about, | *first.*" — one guitarist plays for a date; the notes turn into a heart of stars.
//  10.40–10.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 10.6.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'

const W = 1080
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff3d3d', CYAN = '#8fd8f6', INK = '#1a1430', DARK = '#140f2a'
const LILAC = '#c9a6ff', TEAL = '#2fc7b0', ORANGE = '#ff9b4a', WOOD = '#8a5428'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const D2R = Math.PI / 180, TAU = Math.PI * 2
const BEATLEN = 0.5556
const BEAT = n => +(0.6 + n * BEATLEN).toFixed(3)

export const END = 10.6
export const T = {
  // hook
  h0: 0.1, h0Late: BEAT(1), truck: 0.12, band: [0.3, 0.42, 0.54], strum: [BEAT(0), BEAT(4)], h0Out: 2.62,
  // between things
  h1: 2.7, h1Late: BEAT(4), bubs: [BEAT(5), BEAT(6), BEAT(7)], bats: [2.8, 5.0], h1Out: 4.95, bandOut: [4.8, 5.15],
  // dealbreakers
  h2: 5.22, h2Late: BEAT(9), card: 5.55, chips: [BEAT(10), BEAT(11), BEAT(12)], h2Out: 8.22,
  // end line
  h3: 8.45, h3Late: BEAT(15), duo: 8.5, notes: BEAT(14.5), heart: BEAT(16), h3Out: 10.15, duoOut: [10.0, 10.38],
}

const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))

/** fill the current path at fa, then stroke it thick with a glow */
function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  x.restore()
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, drop = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em', display: 'none' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, visibility: 'hidden', transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0', margin: '0 0.08em' })
    const big = late > 0 && n >= nW - late
    const wt = big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: wt, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const on = t >= w.t && out > 0
        w.e.style.visibility = on ? 'visible' : 'hidden'
        if (!on) { w.e.style.opacity = '0'; continue }
        if (w.big && drop) {
          const p = prog(t, w.t, w.t + 0.3), land = w.t + 0.3
          const y = -380 * (1 - ease.inQuad(p))
          const sq = t > land ? 0.3 * Math.exp(-(t - land) * 6) * Math.cos((t - land) * 22) : 0
          w.e.style.opacity = String(clamp(p * 4) * out)
          w.e.style.transform = `translateY(${(y + (1 - out) * 10).toFixed(2)}px) scale(${((1 + sq) * lerp(0.9, 1, out)).toFixed(4)}, ${((1 - sq) * lerp(0.9, 1, out)).toFixed(4)})`
          continue
        }
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 7 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ───────────────────────── props (bold line art, flat fills, no faces, no brands)
const GROUND = 1790

/** beat phase 0..1 and index */
const beatPh = t => { const u = (t - 0.6) / BEATLEN; return { n: Math.floor(u), ph: u - Math.floor(u) } }

/** an acoustic guitar in its own frame: body at the origin, neck along −x */
function guitar(x, col) {
  const bodyPath = () => { x.beginPath(); x.arc(34, 0, 76, 0, TAU); x.moveTo(-6 + 58, 0); x.arc(-44, 0, 58, 0, TAU) }
  // neck + headstock (behind the body)
  x.beginPath(); x.roundRect(-330, -13, 240, 26, 6); x.fillStyle = WOOD; x.fill(); x.lineWidth = 5; x.strokeStyle = BONE; x.shadowColor = rgba(GOLD, 0.6); x.shadowBlur = 10; x.stroke(); x.shadowBlur = 0
  x.beginPath(); x.roundRect(-392, -21, 66, 42, 10); x.fillStyle = DARK; x.fill(); x.lineWidth = 5; x.stroke()
  for (let i = 0; i < 3; i++) { x.fillStyle = BONE; x.beginPath(); x.arc(-378 + i * 20, -27, 6, 0, TAU); x.arc(-378 + i * 20, 27, 6, 0, TAU); x.fill() }
  // body: rim pass then fill (so the outline is the union of the two bouts)
  x.save(); bodyPath(); x.strokeStyle = BONE; x.lineWidth = 16; x.shadowColor = rgba(col, 0.9); x.shadowBlur = 22; x.stroke(); x.restore()
  bodyPath(); x.fillStyle = col; x.fill()
  // sheen, sound hole, bridge, strings
  x.save(); bodyPath(); x.clip(); x.fillStyle = 'rgba(255,255,255,0.18)'; x.beginPath(); x.ellipse(10, -40, 120, 30, 0, 0, TAU); x.fill(); x.restore()
  x.beginPath(); x.arc(-26, 0, 24, 0, TAU); x.fillStyle = DARK; x.fill(); x.lineWidth = 4; x.strokeStyle = rgba(DARK, 0.6); x.stroke()
  x.beginPath(); x.roundRect(58, -22, 14, 44, 4); x.fillStyle = DARK; x.fill()
  x.strokeStyle = rgba(BONE, 0.75); x.lineWidth = 2
  for (const dy of [-8, -3, 3, 8]) { x.beginPath(); x.moveTo(64, dy); x.lineTo(-330, dy * 0.8); x.stroke() }
}

/** a standing pictogram person (no face) at (cx, GROUND); optional guitar; strum 0..1 moves the picking hand.
 *  pose.wave: the free hand waves (for the date); flip mirrors. Returns the head-top y. */
function person(x, cx, s, k, shirt, t, { gcol = null, strum = 0, bob = 0, squash = 1, flip = 1, wave = 0, a = 1 } = {}) {
  if (k <= 0.01 || a <= 0) return
  x.save()
  x.globalAlpha = a * clamp(k * 2)
  x.translate(cx, GROUND); x.scale(flip * k * s, k * s * squash); x.translate(0, bob)
  const hipY = -230, shY = -440, headY = -512
  const legs = [-1, 1].map(sd => ({ hip: { x: sd * 32, y: hipY }, ft: { x: sd * 46, y: -30 } }))
  // guitar frame in person coords
  const G = { x: 22, y: -300, r: 38 * D2R, k: 0.82 }
  const gp = (u, v) => { u *= G.k; v *= G.k; return { x: G.x + Math.cos(G.r) * u - Math.sin(G.r) * v, y: G.y + Math.sin(G.r) * u + Math.cos(G.r) * v } }
  let arms
  if (gcol) {
    const neck = gp(-250, 0), pick = gp(30 + 6 * strum, -34 + 46 * strum)
    arms = [
      { sh: { x: -58, y: shY + 24 }, el: { x: -118, y: shY + 150 }, ha: neck },
      { sh: { x: 58, y: shY + 24 }, el: { x: 128, y: shY + 104 }, ha: pick },
    ]
  } else {
    const wv = Math.sin(t * 12) * wave
    arms = [
      { sh: { x: -58, y: shY + 24 }, el: { x: -104, y: shY + 130 }, ha: { x: -70, y: hipY + 20 } },
      { sh: { x: 58, y: shY + 24 }, el: { x: lerp(104, 130, wave), y: lerp(shY + 130, shY - 20, wave) }, ha: { x: lerp(70, 150 + 30 * wv, wave), y: lerp(hipY + 20, shY - 130, wave) } },
    ]
  }
  const limbs = (pass) => {
    const grow = pass ? 0 : 7
    x.lineWidth = 36 + grow * 2
    for (const m of arms) { x.beginPath(); x.moveTo(m.sh.x, m.sh.y); x.lineTo(m.el.x, m.el.y); x.lineTo(m.ha.x, m.ha.y); x.stroke() }
  }
  for (const pass of [0, 1]) {
    x.save()
    const grow = pass ? 0 : 7
    if (!pass) { x.strokeStyle = BONE; x.fillStyle = BONE; x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 16 } else { x.strokeStyle = DARK; x.fillStyle = DARK }
    x.lineCap = 'round'; x.lineJoin = 'round'
    x.lineWidth = 46 + grow * 2
    for (const l of legs) { x.beginPath(); x.moveTo(l.hip.x, l.hip.y); x.lineTo(l.ft.x, l.ft.y); x.stroke() }
    if (!gcol) limbs(pass)
    if (pass) x.fillStyle = shirt
    x.beginPath(); x.roundRect(-72 - grow, shY - grow, 144 + grow * 2, hipY - shY + 30 + grow * 2, [52 + grow, 52 + grow, 20 + grow, 20 + grow]); x.fill()
    if (pass) x.fillStyle = DARK
    x.beginPath(); x.arc(0, headY, 50 + grow, 0, TAU); x.fill()
    x.restore()
  }
  if (gcol) {
    // strap
    x.save(); x.strokeStyle = rgba(DARK, 0.9); x.lineWidth = 12; x.beginPath(); x.moveTo(-50, shY + 10); x.lineTo(60, hipY - 20); x.stroke(); x.restore()
    x.save(); x.translate(G.x, G.y); x.rotate(G.r); x.scale(G.k, G.k); guitar(x, gcol); x.restore()
    for (const pass of [0, 1]) {
      x.save()
      if (!pass) { x.strokeStyle = BONE; x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 16 } else x.strokeStyle = DARK
      x.lineCap = 'round'; x.lineJoin = 'round'
      limbs(pass)
      x.restore()
    }
  }
  x.restore()
}

/** a music note (eighth) centred near its head */
function note(x, px, py, s, col, a, rot = 0, dbl = false) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(px, py); x.rotate(rot); x.scale(s, s)
  x.fillStyle = col; x.strokeStyle = col; x.shadowColor = col; x.shadowBlur = 16; x.lineCap = 'round'
  const head = (hx) => { x.beginPath(); x.ellipse(hx, 0, 17, 12, -0.35, 0, TAU); x.fill() }
  head(0); x.lineWidth = 6; x.beginPath(); x.moveTo(14, -4); x.lineTo(14, -70); x.stroke()
  if (dbl) { head(46); x.beginPath(); x.moveTo(60, -4); x.lineTo(60, -70); x.stroke(); x.lineWidth = 12; x.beginPath(); x.moveTo(14, -66); x.lineTo(60, -66); x.stroke() }
  else { x.lineWidth = 6; x.beginPath(); x.moveTo(14, -70); x.quadraticCurveTo(40, -54, 36, -28); x.stroke() }
  x.restore()
}

/** the food truck: teal body, lit serving window with a vendor, striped awning, string lights, TACOS on the side */
function truck(x, t, a, rise) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a; x.translate(0, rise)
  // body
  x.beginPath(); x.roundRect(110, 700, 860, 740, 46); ink(x, TEAL, { w: 9, fa: 0.0, glow: 22 })
  x.save(); x.beginPath(); x.roundRect(110, 700, 860, 740, 46); x.clip()
  const bg = x.createLinearGradient(0, 700, 0, 1440); bg.addColorStop(0, '#174f55'); bg.addColorStop(1, '#0f2f3a'); x.fillStyle = bg; x.fillRect(100, 690, 880, 760)
  x.fillStyle = rgba(TEAL, 0.35); x.fillRect(100, 1300, 880, 26)
  x.restore()
  x.beginPath(); x.roundRect(110, 700, 860, 740, 46); ink(x, TEAL, { w: 9, fa: 0, glow: 22 })
  // window glow
  const wg = x.createRadialGradient(540, 960, 40, 540, 960, 520); wg.addColorStop(0, rgba(ORANGE, 0.35)); wg.addColorStop(1, rgba(ORANGE, 0))
  x.fillStyle = wg; x.fillRect(0, 600, W, 700)
  x.save(); x.beginPath(); x.roundRect(210, 840, 660, 240, 20); x.clip()
  const ig = x.createLinearGradient(0, 840, 0, 1080); ig.addColorStop(0, '#ffe2a0'); ig.addColorStop(1, '#ffa45a'); x.fillStyle = ig; x.fillRect(200, 830, 680, 260)
  // vendor (shoulders + head, swaying)
  const vx = 690 + 10 * Math.sin(t * 2.2)
  x.fillStyle = rgba(DARK, 0.85); x.beginPath(); x.arc(vx, 950, 46, 0, TAU); x.fill()
  x.beginPath(); x.roundRect(vx - 90, 1006, 180, 120, [60, 60, 0, 0]); x.fill()
  // menu board
  x.fillStyle = rgba(DARK, 0.75); x.beginPath(); x.roundRect(260, 880, 200, 150, 10); x.fill()
  x.fillStyle = rgba('#ffe2a0', 0.9); for (let i = 0; i < 4; i++) x.fillRect(282, 908 + i * 32, 150 - (i % 2) * 50, 10)
  x.restore()
  x.beginPath(); x.roundRect(210, 840, 660, 240, 20); ink(x, BONE, { w: 7, fa: 0, glow: 14 })
  // counter
  x.beginPath(); x.roundRect(186, 1072, 708, 28, 10); ink(x, BONE, { w: 6, fa: 0.5, glow: 12 })
  // awning: striped, scalloped
  x.save()
  x.beginPath(); x.moveTo(170, 770); x.lineTo(910, 770); x.lineTo(930, 830)
  const nS = 10
  for (let i = nS; i > 0; i--) { const x1 = 170 - 20 + (780 / nS) * i, x0 = x1 - 780 / nS; x.quadraticCurveTo((x0 + x1) / 2, 870, x0, 830) }
  x.closePath()
  x.save(); x.clip(); x.fillStyle = BONE; x.fillRect(140, 760, 800, 120)
  x.fillStyle = PINK; for (let i = 0; i < nS; i += 2) x.fillRect(150 + (780 / nS) * i, 760, 780 / nS, 120)
  x.restore()
  ink(x, BONE, { w: 5, fa: 0, glow: 12 })
  x.restore()
  // TACOS on the side
  x.font = `900 92px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = GOLD; x.shadowBlur = 20; x.fillStyle = GOLD; x.fillText('TACOS', 540, 1196); x.shadowBlur = 0
  // wheels
  for (const wx of [290, 790]) { x.beginPath(); x.arc(wx, 1440, 70, 0, TAU); x.fillStyle = DARK; x.fill(); ink(x, BONE, { w: 7, fa: 0, glow: 12 }); x.beginPath(); x.arc(wx, 1440, 26, 0, TAU); ink(x, BONE, { w: 5, fa: 0.4, glow: 8 }) }
  // string lights draped over the roof
  const r = rng(11)
  for (const [x0, x1, y0, sag] of [[-20, 540, 640, 70], [540, 1100, 640, 70]]) {
    x.save(); x.strokeStyle = rgba(BONE, 0.6); x.lineWidth = 3; x.beginPath()
    for (let i = 0; i <= 24; i++) { const u = i / 24, px = lerp(x0, x1, u), py = y0 + sag * 4 * u * (1 - u); i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke(); x.restore()
    for (let i = 1; i < 9; i++) {
      const u = i / 9, px = lerp(x0, x1, u), py = y0 + sag * 4 * u * (1 - u) + 12
      const col = [GOLD, PINK, CYAN, ORANGE, LILAC][Math.floor(r() * 5)], tw = 0.65 + 0.35 * Math.sin(t * 6 + r() * 6)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(px, py, 2, px, py, 34); g.addColorStop(0, rgba(col, 0.7 * tw)); g.addColorStop(1, rgba(col, 0))
      x.fillStyle = g; x.beginPath(); x.arc(px, py, 34, 0, TAU); x.fill(); x.restore()
      x.fillStyle = col; x.beginPath(); x.ellipse(px, py, 9, 12, 0, 0, TAU); x.fill()
    }
  }
  x.restore()
}

/** a bat silhouette, flap 0..1 */
function bat(x, px, py, s, flap) {
  x.save(); x.translate(px, py); x.scale(s, s)
  const up = Math.sin(flap * TAU) * 26
  x.beginPath()
  x.moveTo(0, -6)
  for (const sd of [1, -1]) {
    x.lineTo(sd * 20, -10)
    x.quadraticCurveTo(sd * 46, -24 - up, sd * 78, -16 - up * 1.4)
    x.lineTo(sd * 66, -2 - up * 0.6); x.lineTo(sd * 52, 4 - up * 0.3); x.lineTo(sd * 38, 2); x.lineTo(sd * 24, 10); x.lineTo(sd * 8, 8)
    x.lineTo(0, 12)
    if (sd === 1) x.moveTo(0, -6)
  }
  x.closePath()
  x.fillStyle = DARK; x.shadowColor = rgba(LILAC, 0.9); x.shadowBlur = 14; x.fill()
  x.strokeStyle = rgba(LILAC, 0.9); x.lineWidth = 3; x.stroke()
  x.beginPath(); x.arc(0, -12, 9, 0, TAU); x.fill(); x.stroke()
  x.restore()
}

/** chat bubble (white) with a tail toward (tx, ty) relative to its centre */
function chatBubble(x, txt, size, tdx, tdy) {
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(txt).width + size * 1.1, h = size * 1.6
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
  const bx = clamp(tdx, -w / 2 + 50, w / 2 - 50)
  x.moveTo(bx - 26, h / 2 - 4); x.lineTo(tdx, tdy); x.lineTo(bx + 18, h / 2 - 4)
  x.fillStyle = '#f3eefc'; x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 30; x.shadowOffsetY = 10; x.fill(); x.shadowOffsetY = 0
  ink(x, BONE, { w: 5, fa: 0, glow: 16 })
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 3)
}

/** the DEALBREAKERS card (illustrated, not app UI) */
const CARD = { w: 840, h: 780, cx: 540, cy: 1130 }
const CHIP_Y = [-40, 110, 260]
const CHIPS = ['“BETWEEN THINGS”', 'FLAKY PLANS', '“WE’LL SEE”']
function dealCard(x) {
  const { w, h } = CARD
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
  x.fillStyle = 'rgba(18,12,40,0.94)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  const gr = x.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, rgba(LILAC, 0.2)); gr.addColorStop(1, rgba(LILAC, 0.02))
  x.fillStyle = gr; x.fill()
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); ink(x, GOLD, { w: 9, fa: 0, glow: 26 })
  x.save(); x.globalAlpha *= 0.4; x.strokeStyle = GOLD; x.lineWidth = 2; x.beginPath(); x.roundRect(-w / 2 + 18, -h / 2 + 18, w - 36, h - 36, 28); x.stroke(); x.restore()
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = GOLD; x.font = `700 36px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 80)
  x.fillStyle = BONE; x.font = `italic 500 66px ${SERIF}`; x.fillText('Said up front.', 0, -h / 2 + 166)
  CHIP_Y.forEach(y => { x.save(); x.setLineDash([14, 12]); x.strokeStyle = rgba(BONE, 0.32); x.lineWidth = 4; x.beginPath(); x.roundRect(-345, y - 50, 690, 100, 50); x.stroke(); x.restore() })
}
function chip(x, label, hot = 0) {
  const cw = 700, ch = 104
  x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 52)
  x.fillStyle = 'rgba(58,10,22,0.96)'; x.fill()
  ink(x, RED, { w: 7, fa: 0, glow: 18 + 30 * hot })
  x.save(); x.translate(-cw / 2 + 62, 0); x.beginPath(); x.moveTo(-17, -17); x.lineTo(17, 17); x.moveTo(17, -17); x.lineTo(-17, 17); ink(x, '#ff5a52', { w: 10, fa: 0, glow: 12 }); x.restore()
  let fs = 58
  x.font = `900 ${fs}px ${INTER}`
  const room = cw - 170, mw = x.measureText(label).width
  if (mw > room) { fs = Math.floor(fs * room / mw); x.font = `900 ${fs}px ${INTER}` }
  x.fillStyle = '#ffe2dc'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(label, 30, 3)
}

// hook band: three guitarists in front of the truck
const BAND = [
  { x: 190, s: 0.86, shirt: '#e163d6', g: GOLD },
  { x: 540, s: 0.96, shirt: '#3f7cf0', g: ORANGE },
  { x: 890, s: 0.88, shirt: '#f0603a', g: CYAN },
]
// the vague replies, over each head
const BUBS = [
  { txt: 'between things', x: 290, y: 1010, rot: -4, tx: 190 },
  { txt: 'kinda', x: 560, y: 1150, rot: 3, tx: 540 },
  { txt: 'we’ll see', x: 830, y: 1010, rot: 4, tx: 890 },
]
// bats: start x offset, y, scale, speed, flap phase
const BATS = [[0, 560, 0.9, 1, 0], [140, 610, 0.7, 1.1, 0.3], [260, 540, 0.6, 0.95, 0.6], [380, 640, 0.8, 1.05, 0.15], [520, 580, 0.55, 1.0, 0.8], [640, 625, 0.65, 1.12, 0.45], [760, 555, 0.5, 0.9, 0.7]]

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 80px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('AUSTIN, TX · FRIDAY NIGHT'), 0.05, T.h1Out], [eyebrow('ON ALIGN'), T.h2, T.h2Out]]
  const H0 = popText(root, 'Austin: | everyone’s | *“in* *a* *band.”*', { top: 200, size: 128, accentSize: 156, at: T.h0, gap: 0.12, late: 3, lateAt: T.h0Late, lateGap: 0.11, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H1 = popText(root, '…and *“between* | *things.”*', { top: 210, size: 128, accentSize: 156, at: T.h1, gap: 0.08, late: 2, lateAt: T.h1Late, lateGap: 0.14, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H2 = popText(root, 'Dealbreakers | come *first.*', { top: 215, size: 124, accentSize: 160, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Late, drop: true, accentColor: GOLD })
  const H3 = popText(root, 'Know what | they’re about, | *first.*', { top: 200, size: 112, accentSize: 168, at: T.h3, gap: 0.07, late: 1, lateAt: T.h3Late, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]

  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const strumAt = (t, from, to) => {
    if (t < from - 0.05 || t > to) return 0
    const { ph } = beatPh(t)
    // fast downstroke on the beat, slow return
    return ph < 0.18 ? ease.outCubic(ph / 0.18) : 1 - ease.inOutQuad((ph - 0.18) / 0.82)
  }

  // ── 1+2 · the food truck, the band, the vague replies, the bats
  function drawHook(t) {
    if (t > T.bandOut[1]) return
    const a = 1 - ease.inCubic(prog(t, ...T.bandOut))
    const rise = 220 * (1 - ease.outCubic(prog(t, T.truck, T.truck + 0.55))) + 80 * ease.inCubic(prog(t, ...T.bandOut))
    const vague = prog(t, T.h1Late - 0.1, T.h1Late + 0.3)            // the strumming stops, the truck dims
    // bats (behind the truck roof, across the sky)
    if (t > T.bats[0] && t < T.bats[1]) {
      const u = prog(t, ...T.bats)
      BATS.forEach(([off, by, s, sp, ph], i) => {
        const bx = 1240 + off - u * (1700 + off) * sp
        bat(x, bx, by + 22 * Math.sin(t * 3 + i), s * 1.35, (t * 3.4 + ph) % 1)
      })
    }
    truck(x, t, a * lerp(1, 0.6, vague), rise)
    // the band
    BAND.forEach((P, i) => {
      const k = pop01(t, T.band[i], 0.42, 2.2)
      const st = strumAt(t, T.strum[0], T.strum[1]) * (1 - vague)
      const { ph } = beatPh(t)
      const groove = t < T.strum[1] ? -12 * Math.sin(Math.PI * ph) : 0
      // on their bubble, a little deflating slump
      const bt = T.bubs[i], sl = t > bt ? Math.exp(-(t - bt) * 5) * Math.sin((t - bt) * 22) : 0
      const slump = t > bt ? ease.outCubic(prog(t, bt, bt + 0.3)) : 0
      person(x, P.x, P.s, k, P.shirt, t, { gcol: P.g, strum: st, bob: groove + 14 * slump + rise / P.s * 0.5, squash: 1 - 0.06 * sl, a })
    })
    // notes rising from the guitars on every beat of the hook
    if (t < T.strum[1] + 1.0) {
      BAND.forEach((P, i) => {
        for (let n = 0; n < 6; n++) {
          const t0 = BEAT(n) + i * 0.08
          if (t0 > T.strum[1]) continue
          const age = t - t0
          if (age < 0 || age > 1.2) continue
          const p = age / 1.2
          const col = [GOLD, PINK, CYAN][(n + i) % 3]
          note(x, P.x + 70 + 40 * Math.sin(age * 5 + n) + (n % 2 ? 30 : -10), 1440 - 360 * ease.outCubic(p) + rise, 0.9 + 0.2 * (n % 2), col, a * Math.sin(Math.PI * Math.min(1, p * 1.4)) * (1 - p * 0.3), 0.25 * Math.sin(age * 4 + i), n % 3 === 1)
        }
      })
    }
    // the vague replies
    BUBS.forEach((B, i) => {
      const t0 = T.bubs[i]
      if (t < t0) return
      const k = pop01(t, t0, 0.4, 2.6)
      const wob = Math.exp(-(t - t0) * 3.5) * Math.sin((t - t0) * 16) * 6
      // a shrug bob every beat after landing
      const { ph } = beatPh(t)
      const shrug = -10 * Math.max(0, Math.sin(Math.PI * ph))
      x.save(); x.globalAlpha = a; x.translate(B.x, B.y + rise + shrug); x.rotate((B.rot + wob) * D2R); x.scale(k, k)
      chatBubble(x, B.txt, i === 0 ? 58 : 66, B.tx - B.x, (i === 1 ? 1225 : 1250) - B.y)
      x.restore()
      sparkle(x, B.x, B.y + rise, t, t0 + 0.05, { n: 9, R: 220, seed: 30 + i, size: 22, cols: [BONE, LILAC, PINK] })
    })
    sparkle(x, 540, 900 + rise, t, T.truck + 0.45, { n: 12, R: 420, seed: 3, size: 26 })
  }

  // ── 3 · dealbreakers come first
  function drawDeal(t) {
    if (t < T.card - 0.05 || t > T.h2Out + 0.45) return
    const o = ease.inCubic(prog(t, T.h2Out - 0.1, T.h2Out + 0.35))
    const ck = pop01(t, T.card, 0.5, 1.8)
    const thumps = T.chips.reduce((s, tc) => s + (t > tc ? Math.sin((t - tc) * 26) * Math.exp(-(t - tc) * 8) : 0), 0)
    x.save()
    x.translate(CARD.cx, CARD.cy + 10 * Math.sin((t - T.card) * 2) + 10 * thumps + 160 * o - 260 * (1 - ease.outCubic(prog(t, T.card, T.card + 0.4))))
    x.rotate((-2 + 1.2 * Math.sin((t - T.card) * 1.6)) * D2R)
    x.scale(ck * (1 - 0.03 * thumps) * (1 - 0.2 * o), ck * (1 + 0.03 * thumps) * (1 - 0.2 * o))
    x.globalAlpha = clamp(ck * 3) * (1 - o)
    dealCard(x)
    T.chips.forEach((tc, i) => {
      if (t < tc - 0.18) return
      const sp = prog(t, tc - 0.18, tc)
      const sc = lerp(2.3, 1, ease.inCubic(sp)) * (t > tc ? 1 + 0.07 * Math.sin((t - tc) * 30) * Math.exp(-(t - tc) * 9) : 1)
      const hot = Math.exp(-Math.max(0, t - tc) * 3)
      x.save(); x.translate(0, CHIP_Y[i]); x.rotate([-2, 1.5, -1][i] * D2R); x.scale(sc, sc); x.globalAlpha *= clamp(sp * 3)
      chip(x, CHIPS[i], hot)
      x.restore()
    })
    x.restore()
    sparkle(x, CARD.cx, CARD.cy, t, T.card + 0.2, { n: 12, R: 480, seed: 50, size: 28 })
    T.chips.forEach((tc, i) => sparkle(x, CARD.cx, CARD.cy + CHIP_Y[i], t, tc, { n: i === 2 ? 16 : 10, R: i === 2 ? 470 : 390, seed: 60 + i, size: i === 2 ? 30 : 24, cols: [RED, '#ff8a80', GOLD, '#fff3e0'] }))
  }

  // ── 4 · know what they're about: a serenade, the notes become a heart of stars
  const HX = 540, HY = 1060
  function drawEnd(t) {
    if (t < T.duo || t > T.duoOut[1]) return
    const a = 1 - ease.inCubic(prog(t, ...T.duoOut))
    const rise = 200 * (1 - ease.outCubic(prog(t, T.duo, T.duo + 0.5))) + 60 * ease.inCubic(prog(t, ...T.duoOut))
    const pk = pop01(t, T.duo + 0.02, 0.42, 2.2), dk = pop01(t, T.duo + 0.14, 0.42, 2.2)
    const st = strumAt(t, T.notes, T.duoOut[1])
    const { ph } = beatPh(t)
    const groove = -10 * Math.sin(Math.PI * ph)
    const hop = t > T.heart ? -40 * Math.max(0, Math.sin(Math.PI * prog(t, T.heart, T.heart + 0.35))) : 0
    const wave = ease.inOutCubic(prog(t, T.heart - 0.1, T.heart + 0.25))
    person(x, 320, 1.04, pk, GOLD, t, { gcol: ORANGE, strum: st, bob: groove + rise, a })
    person(x, 790, 1.02, dk, PINK, t, { flip: -1, bob: groove * 0.6 + rise + hop, wave, a })
    // notes drift from the guitar toward the middle, then gather into the heart
    const gather = ease.inOutCubic(prog(t, T.heart - 0.25, T.heart + 0.15))
    for (let n = 0; n < 7; n++) {
      const t0 = T.notes + n * 0.14
      if (t < t0) continue
      const age = t - t0
      const sx = 370, sy = 1470 + rise
      const fx = 430 + n * 32 + 30 * Math.sin(age * 4 + n), fy = 1300 - 140 * Math.min(1, age / 0.9) - (n % 3) * 50 + rise
      const th = Math.PI + (n / 7) * TAU
      const hx = HX + 16 * Math.pow(Math.sin(th), 3) * 9, hy = HY - (13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th)) * 9
      const fk = ease.outCubic(Math.min(1, age / 0.5))
      const px = lerp(lerp(sx, fx, fk), hx, gather), py = lerp(lerp(sy, fy, fk), hy, gather)
      note(x, px, py, 1.0, [GOLD, PINK, CYAN][n % 3], a * clamp(age * 5) * (1 - gather), 0.2 * Math.sin(age * 5 + n), n % 3 === 1)
    }
    if (t > T.heart - 0.05) {
      const hk = pop01(t, T.heart, 0.5, 2.2), pulse = 1 + 0.07 * Math.sin((t - T.heart) * 9)
      const fk = prog(t, T.heart, T.heart + 0.55)
      if (fk > 0 && fk < 1) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(HX, HY, 0, HX, HY, 320 * ease.outCubic(fk))
        g.addColorStop(0, rgba(GOLD, 0.6 * (1 - fk))); g.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = g; x.beginPath(); x.arc(HX, HY, 320, 0, TAU); x.fill(); x.restore()
      }
      x.save(); x.globalAlpha = a
      for (let i = 0; i < 24; i++) {
        const th = Math.PI + (i / 24) * TAU
        const hx = 16 * Math.pow(Math.sin(th), 3), hyy = -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th))
        drawPixelStar(x, HX + hx * 11 * hk * pulse, HY + hyy * 11 * hk * pulse - 30 * ease.outCubic(prog(t, T.heart, T.heart + 1.2)), i % 4 ? 22 : 32, i % 3, i % 2 ? GOLD : PINK)
      }
      x.restore()
      sparkle(x, HX, HY, t, T.heart, { n: 18, R: 380, seed: 70, size: 32, dur: 0.9 })
    }
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 2.5))
      drawSky(x, t, t < 2.5 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.duoOut[1]) { drawHook(t); drawDeal(t); drawEnd(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.25)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]

// ── sound (pitched SFX are written in the films' D-major palette; the engine moves them into the film's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ...wordPops(T.h0, 2, 0.12, 0, 0.03), ['whoosh', T.truck, 0.5, 0.035], ['glitter', T.truck + 0.45, T.truck + 0.95],
  ...T.band.map((tb, i) => ['pop', tb + 0.05, [587.33, 739.99, 880][i], 0.05, (i - 1) * 0.5]),
  ...[0, 1, 2].map(i => ['pop', +(T.h0Late + i * 0.11).toFixed(3), NOTE[(3 + i) % 7], 0.045, (i - 1) * 0.2]),
  ...[0, 1, 2, 3].map(n => ['pluck', BEAT(n), [587.33, 739.99, 880, 739.99][n], 0.035, 0.35, [-0.5, 0, 0.5, 0][n]]),
  // between things
  ['pop', T.h1, 659.25, 0.03, 0], ['whoosh', T.h1Late - 0.05, 0.3, 0.03],
  ['pop', T.h1Late, 987.77, 0.045, -0.2], ['pop', T.h1Late + 0.14, 880, 0.045, 0.2],
  ['whoosh', T.bats[0] + 0.2, 1.2, 0.025],
  ...T.bubs.flatMap((tb, i) => [['pop', tb, [880, 739.99, 587.33][i], 0.06, (i - 1) * 0.5], ['pluck', tb + 0.12, [659.25, 587.33, 493.88][i], 0.04, 0.3, (i - 1) * 0.5]]),
  // dealbreakers
  ...wordPops(T.h2, 2, 0.1, 2), ['whoosh', T.h2Late - 0.3, 0.3, 0.035], ['boom', T.h2Late, 0.08], ['tick', T.h2Late, 0.07],
  ['pop', T.card, 880, 0.055, -0.2], ['whoosh', T.card - 0.1, 0.4, 0.035], ['glitter', T.card + 0.2, T.card + 0.7],
  ...T.chips.flatMap((tc, i) => [['whoosh', tc - 0.2, 0.2, 0.035], ['tick', tc, 0.08], ['pop', tc, [739.99, 880, 1174.66][i], 0.05, 0], i === 2 ? ['boom', tc, 0.14] : ['pluck', tc + 0.02, 587.33, 0.035, 0.4, 0]]),
  ['bell', T.chips[2] + 0.04, 587.33, 0.04, 1.0, 0],
  // know what they're about, first
  ...wordPops(T.h3, 4, 0.07, 0, 0.025), ['pop', T.h3Late, 1318.51, 0.055, 0], ['pluck', T.h3Late, 1174.66, 0.05, 0.6, 0],
  ['whoosh', T.duo, 0.45, 0.03],
  ...[0, 1, 2].map(n => ['pluck', +(T.notes + n * BEATLEN).toFixed(3), [739.99, 880, 987.77][n], 0.035, 0.35, -0.3]),
  ['riser', T.notes, T.heart, 0.03],
  ['bell', T.heart, 1760, 0.055, 1.4, -0.1], ['bell', T.heart + 0.03, 2349.32, 0.035, 1.4, 0.1], ['glitter', T.heart, T.heart + 0.8],
]
