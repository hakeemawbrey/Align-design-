// htxbrunch (30 s vertical Align ad) · story 0–25.6, then the shared END CARD ("come" + the Align logo).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–4.80   HOOK  "Another Midtown brunch | with someone who's | “just seeing where it goes.”" — a brunch table:
//               two pictogram people, mimosas fizzing, a pancake stack; a chat bubble "idk lol" shrugs on the beats.
//   4.85–11.00  "The big questions | show up… *late.*" — three thought bubbles land over your head ("No kids?",
//               "Moving to Austin?", "Not looking for anything serious?"), each tagged BRUNCH #3 / #7 / #12 while empty
//               flutes pile up on the table; a red "TOO LATE." stamp slams across them (9.77).
//  11.40–17.80  "On Align, | dealbreakers | come *first.*" — a DEALBREAKERS card; three chips stamp on, the last one the
//               callback (✕ “JUST SEEING WHERE IT GOES”). "Up front. Not at | *brunch #12.*"
//  18.05–22.30  "See how you fit | before the first *mimosa.*" — two zodiac wheels lock; Push / Pull / Align lines.
//  22.50–25.30  "Brunch with | *intention.*" — the table is back; two flutes rise and clink, gold sparkle.
//  25.30–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH, READING } from '../../wheel.js'

const W = 1080, H = 1920
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff3d3d', FIRE = '#f0603a', INK = '#1a1430', DULL = '#b9b3d6'
const MIMOSA = '#ffb347', SILVER = '#e3ecff', LILAC = '#c9a6ff'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const D2R = Math.PI / 180, TAU = Math.PI * 2
const BEAT = n => 0.6 + n * 0.5556

export const END = 25.6
export const T = {
  // hook
  h0: 0.1, h0Late: BEAT(1), table: 0.12, idk: BEAT(3), shrugs: [BEAT(4), BEAT(5), BEAT(6)], h0Out: 4.55,
  // the late questions
  h1: 4.85, h1Late: BEAT(9), bub: [BEAT(10.5), BEAT(12.5), BEAT(14.5)], stamp: BEAT(16.5), h1Out: 10.95, tableOut: [10.9, 11.3],
  // dealbreakers
  h2: 11.4, h2Late: BEAT(20), card: 11.95, chips: [BEAT(22), BEAT(23.5), BEAT(25)], s2: BEAT(26.5), h2Out: 17.75,
  // push / pull / align
  h3: 18.05, h3Late: BEAT(32.5), wA: [18.25, 18.9], wB: [18.45, 19.1], lock: BEAT(33.5), dots: BEAT(34.5),
  lines: [BEAT(35.5), BEAT(36.5), BEAT(37.5)], h3Out: 22.05, wOut: 21.85,
  // end line
  h4: 22.5, h4Late: BEAT(40), table4: 22.5, raise: [23.0, 23.55], clink: BEAT(41.5), h4Out: 25.0, table4Out: [24.85, 25.3],
}

const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const wob = (t, a, amp = 1, f = 16, k = 5) => t > a ? amp * Math.exp(-(t - a) * k) * Math.sin((t - a) * f) : 0

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
function orb(x, px, py, r, color, a = 1, halo = 3.2) {
  if (a <= 0 || r <= 0.5) return
  x.save()
  x.globalCompositeOperation = 'lighter'
  const hr = r * halo, g = x.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, hr, 0, TAU); x.fill()
  x.globalCompositeOperation = 'source-over'
  x.globalAlpha = a
  const s = x.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.45, color); s.addColorStop(1, rgba(color, 0.85))
  x.fillStyle = s; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill()
  x.restore()
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  The last `late` words pop at lateAt (big, optional wobble or a heavy drop). `times` overrides per-word times; `colors` per-word colours. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, drop = false, times = null, colors = {}, lineHeight = 1.02 }) {
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
    if (colors[n]) style.color = colors[n]
    const big = late > 0 && n >= nW - late
    const wt = times ? times[n] : big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: wt, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        // a word is fully hidden until its own pop time
        const on = t >= w.t && out > 0
        w.e.style.visibility = on ? 'visible' : 'hidden'
        if (!on) { w.e.style.opacity = '0'; continue }
        if (w.big && drop) {
          const p = prog(t, w.t, w.t + 0.34), land = w.t + 0.34
          const y = -420 * (1 - ease.inQuad(p))
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
const TY = 1440                     // table top
const YOU = { cx: 205, col: GOLD }, DATE = { cx: 875, col: DULL }

/** pictogram person seated behind the table: head + rounded shoulders; (cx, by) = where the torso meets the table */
function person(x, cx, by, col, { a = 1, s = 1, bob = 0, lean = 0 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a; x.translate(cx, by); x.rotate(lean * D2R); x.scale(s, s); x.translate(0, bob)
  // torso
  x.beginPath()
  x.moveTo(-104, 20); x.lineTo(-104, -120)
  x.quadraticCurveTo(-104, -196, -30, -200); x.lineTo(30, -200); x.quadraticCurveTo(104, -196, 104, -120)
  x.lineTo(104, 20); x.closePath()
  ink(x, col, { w: 8, fa: 0.26, glow: 18 })
  // head
  x.beginPath(); x.arc(0, -268, 52, 0, TAU)
  ink(x, col, { w: 8, fa: 0.34, glow: 22 })
  x.restore()
}

/** the table: thick top, tablecloth with a scalloped hem, pedestal */
function table(x, a, k = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  x.translate(540, TY); x.scale(k, k)
  // pedestal + foot
  x.beginPath(); x.moveTo(-26, 150); x.lineTo(-26, 330); x.lineTo(26, 330); x.lineTo(26, 150); x.closePath(); ink(x, BONE, { w: 6, fa: 0.12, glow: 10 })
  x.beginPath(); x.roundRect(-150, 322, 300, 28, 14); ink(x, BONE, { w: 6, fa: 0.2, glow: 10 })
  // cloth
  x.beginPath(); x.moveTo(-430, 0); x.lineTo(-430, 150)
  const n = 9
  for (let i = 0; i < n; i++) { const x0 = -430 + (860 / n) * i, x1 = x0 + 860 / n; x.quadraticCurveTo((x0 + x1) / 2, 186, x1, 150) }
  x.lineTo(430, 0); x.closePath()
  ink(x, PINK, { w: 7, fa: 0.16, glow: 16 })
  // gingham-ish stripes on the cloth
  x.save(); x.clip(); x.globalAlpha *= 0.18; x.fillStyle = PINK
  for (let i = -430; i < 430; i += 72) x.fillRect(i, 0, 30, 200)
  x.restore()
  // top
  x.beginPath(); x.roundRect(-460, -14, 920, 28, 14); ink(x, BONE, { w: 7, fa: 0.3, glow: 18 })
  x.restore()
}

/** a champagne flute standing at (cx, by); level 0..1 of mimosa, bubbles fizz */
function flute(x, cx, by, t, { level = 0.8, a = 1, s = 1, rot = 0, seed = 1, col = BONE } = {}) {
  if (a <= 0 || s <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(cx, by); x.rotate(rot * D2R); x.scale(s, s)
  const top = -250, bowlB = -110
  const bowl = () => { x.beginPath(); x.moveTo(-38, top); x.lineTo(38, top); x.quadraticCurveTo(36, bowlB + 10, 6, bowlB); x.lineTo(-6, bowlB); x.quadraticCurveTo(-36, bowlB + 10, -38, top); x.closePath() }
  if (level > 0.01) {
    x.save(); bowl(); x.clip()
    const ly = lerp(bowlB, top + 14, level)
    const g = x.createLinearGradient(0, ly, 0, bowlB); g.addColorStop(0, '#ffd27a'); g.addColorStop(1, MIMOSA)
    x.fillStyle = g; x.fillRect(-50, ly, 100, bowlB - ly + 4)
    // fizz
    const r = rng(seed)
    x.fillStyle = '#fff3d0'
    for (let i = 0; i < 7; i++) {
      const bx = -20 + r() * 40, sp = 0.5 + r() * 0.6, ph = r()
      const u = ((t * sp + ph) % 1)
      const yy = lerp(bowlB - 4, ly + 6, u)
      x.globalAlpha = a * 0.85 * Math.sin(Math.PI * u); x.beginPath(); x.arc(bx + 3 * Math.sin(t * 5 + i), yy, 3.5 + 2 * r(), 0, TAU); x.fill()
    }
    x.restore()
  }
  bowl(); ink(x, col, { w: 6, fa: 0.08, glow: 14 })
  x.beginPath(); x.moveTo(0, bowlB); x.lineTo(0, -8); ink(x, col, { w: 6, fa: 0, glow: 10 })
  x.beginPath(); x.ellipse(0, -5, 38, 8, 0, 0, TAU); ink(x, col, { w: 6, fa: 0.2, glow: 10 })
  // a glint
  x.globalAlpha = a * 0.7; x.strokeStyle = '#fffaf0'; x.lineWidth = 4; x.lineCap = 'round'
  x.beginPath(); x.moveTo(-24, top + 20); x.lineTo(-20, top + 70); x.stroke()
  x.restore()
}

/** a pancake stack on a plate, butter pat and a syrup drip */
function pancakes(x, cx, by, t, { a = 1, s = 1 } = {}) {
  if (a <= 0 || s <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(cx, by); x.scale(s, s)
  x.beginPath(); x.ellipse(0, -8, 150, 22, 0, 0, TAU); ink(x, BONE, { w: 6, fa: 0.22, glow: 12 })
  for (let i = 0; i < 3; i++) {
    const y = -36 - i * 34
    x.beginPath(); x.roundRect(-110 + i * 6, y - 16, 220 - i * 12, 34, 17); ink(x, GOLD, { w: 6, fa: 0.34, glow: 14 })
  }
  // syrup
  const drip = 18 + 8 * Math.sin(t * 2.2)
  x.beginPath(); x.moveTo(-80, -126); x.quadraticCurveTo(0, -150, 84, -126); x.lineTo(84, -110); x.quadraticCurveTo(70, -104, 66, -96 + drip * 0.4)
  x.arc(60, -96 + drip * 0.4, 6, 0, Math.PI); x.lineTo(52, -112); x.quadraticCurveTo(0, -118, -40, -110); x.lineTo(-44, -88 + drip)
  x.arc(-50, -88 + drip, 6, 0, Math.PI); x.lineTo(-58, -112); x.quadraticCurveTo(-74, -114, -80, -126); x.closePath()
  ink(x, FIRE, { w: 4, fa: 0.75, glow: 12 })
  // butter pat
  x.save(); x.translate(0, -146); x.rotate(-8 * D2R); x.beginPath(); x.roundRect(-24, -14, 48, 26, 5); x.fillStyle = '#ffe9a6'; x.fill(); ink(x, BONE, { w: 4, fa: 0, glow: 8 }); x.restore()
  x.restore()
}

/** speech bubble with a tail toward the bottom right, little arms that shrug (lift 0..1) */
function shrugBubble(x, cx, cy, s, lift, a, t) {
  if (a <= 0 || s <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(cx, cy - lift * 22); x.scale(s * (1 + 0.04 * lift), s * (1 - 0.04 * lift))
  const w = 400, h = 170
  // arms (behind the bubble): shoulder → elbow → open palm, raised on the shrug
  for (const sd of [-1, 1]) {
    const sx = sd * (w / 2 - 6), sy = 14
    const ex = sd * (w / 2 + 52), ey = 52 - lift * 34
    const hx = sd * (w / 2 + 92), hy = 6 - lift * 70
    x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex, ey); x.lineTo(hx, hy); ink(x, BONE, { w: 12, fa: 0, glow: 14 })
    x.beginPath(); x.moveTo(hx - sd * 18, hy - 10 * (0.4 + lift)); x.lineTo(hx + sd * 20, hy + 2 - 12 * lift); ink(x, BONE, { w: 12, fa: 0, glow: 10 })
  }
  // shrug ticks
  if (lift > 0.2) {
    x.save(); x.globalAlpha = a * (lift - 0.2) * 1.25
    for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) {
      const px = sd * (w / 2 + 120 + i * 18), py = -40 - i * 34 - lift * 40
      x.beginPath(); x.moveTo(px, py); x.lineTo(px + sd * 20, py - 14); ink(x, GOLD, { w: 6, fa: 0, glow: 10 })
    }
    x.restore()
  }
  // body + tail
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 70)
  x.moveTo(w / 2 - 110, h / 2 - 4); x.lineTo(w / 2 - 30, h / 2 + 70); x.lineTo(w / 2 - 50, h / 2 - 4)
  x.fillStyle = '#d8d4ea'; x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 36; x.shadowOffsetY = 12; x.fill(); x.shadowOffsetY = 0
  ink(x, BONE, { w: 6, fa: 0, glow: 18 })
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 84px ${INTER}`
  x.fillText('idk lol', 0, 4)
  x.restore()
}

/** a thought cloud of w×h centred at (0,0) with text lines; bumps along the rim */
function cloud(x, w, h, lines, { a = 1, size = 60, fillC = '#f3eefc', rim = BONE } = {}) {
  const bumps = []
  const nx = Math.max(3, Math.round(w / 80)), ny = Math.max(1, Math.round(h / 80))
  const r = 40
  for (let i = 0; i <= nx; i++) { const px = -w / 2 + (w * i) / nx; bumps.push([px, -h / 2, r + ((i * 37) % 3) * 5], [px + 20, h / 2, r + ((i * 53) % 3) * 5]) }
  for (let j = 0; j <= ny; j++) { const py = -h / 2 + (h * j) / ny; bumps.push([-w / 2, py, r], [w / 2, py, r]) }
  x.save(); x.globalAlpha = a
  // rim pass (thick, glowing), then the fill on top
  x.shadowColor = rim; x.shadowBlur = 22; x.fillStyle = rim
  for (const [px, py, rr] of bumps) { x.beginPath(); x.arc(px, py, rr + 7, 0, TAU); x.fill() }
  x.beginPath(); x.rect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14); x.fill()
  x.shadowBlur = 0; x.fillStyle = fillC
  for (const [px, py, rr] of bumps) { x.beginPath(); x.arc(px, py, rr, 0, TAU); x.fill() }
  x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.fill()
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 ${size}px ${INTER}`
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.08 + 3))
  x.restore()
}

/** the BRUNCH #n sticker */
function sticker(x, label, a) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  x.font = `700 32px ${MONO}`
  const tw = x.measureText(label).width + 44
  x.beginPath(); x.roundRect(-tw / 2, -28, tw, 56, 28); x.fillStyle = '#1b1336'; x.fill(); ink(x, GOLD, { w: 5, fa: 0, glow: 16 })
  x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, 2)
  x.restore()
}

/** a big red rubber stamp */
function stamp(x, l1, a, { w = 720, h = 210, size = 132 } = {}) {
  x.save(); x.globalAlpha *= a
  x.strokeStyle = RED; x.lineWidth = 14; x.shadowColor = rgba(RED, 0.8); x.shadowBlur = 28
  x.fillStyle = 'rgba(40,6,14,0.72)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 24); x.fill(); x.stroke()
  x.lineWidth = 5; x.beginPath(); x.roundRect(-w / 2 + 18, -h / 2 + 18, w - 36, h - 36, 14); x.stroke()
  x.shadowBlur = 16; x.fillStyle = '#ff5a52'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `900 ${size}px ${INTER}`; x.fillText(l1, 0, 8)
  x.restore()
}

/** the DEALBREAKERS card (illustrated, not app UI): dark glass, gold rim, the app's question, three chip slots */
const CARD = { w: 820, h: 760, cx: 540, cy: 1110 }
const CHIP_Y = [-50, 80, 240]
const CHIPS = [['NO KIDS EVER'], ['NOT LOOKING FOR SERIOUS'], ['“JUST SEEING', 'WHERE IT GOES”']]
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
  x.fillStyle = GOLD; x.font = `700 36px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 76)
  x.fillStyle = BONE; x.font = `italic 500 64px ${SERIF}`; x.fillText('What ends it before it starts?', 0, -h / 2 + 158)
  // empty slots
  CHIP_Y.forEach((y, i) => { const ch = i === 2 ? 150 : 92; x.save(); x.setLineDash([14, 12]); x.strokeStyle = rgba(BONE, 0.32); x.lineWidth = 4; x.beginPath(); x.roundRect(-340, y - ch / 2, 680, ch, 46); x.stroke(); x.restore() })
}
function chip(x, lines, hot = 0) {
  const cw = 690, ch = lines.length > 1 ? 154 : 96
  x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 48)
  x.fillStyle = 'rgba(58,10,22,0.95)'; x.fill()
  ink(x, RED, { w: 7, fa: 0, glow: 18 + 30 * hot })
  // ✕
  x.save(); x.translate(-cw / 2 + 58, 0); x.beginPath(); x.moveTo(-16, -16); x.lineTo(16, 16); x.moveTo(16, -16); x.lineTo(-16, 16); ink(x, '#ff5a52', { w: 9, fa: 0, glow: 12 }); x.restore()
  // label, auto-fit
  let fs = 50
  x.font = `900 ${fs}px ${INTER}`
  const room = cw - 150
  const mw = Math.max(...lines.map(l => x.measureText(l).width))
  if (mw > room) { fs = Math.floor(fs * room / mw); x.font = `900 ${fs}px ${INTER}` }
  x.fillStyle = '#ffe2dc'; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 28, 3 + (i - (lines.length - 1) / 2) * fs * 1.12))
}

// ── wheels (as in htxspacecity)
const WC = { cx: 540, cy: 1080 }
const WA = { cx: 0, cy: 0, rOut: 430, rIn: 344, rGlyph: 387, alpha: 0.92 }
const WB = { cx: 0, cy: 0, rOut: 328, rIn: 256, rGlyph: 292, alpha: 0.92 }
const pt = (lon, r) => ({ x: WC.cx + Math.cos(Math.PI - lon * D2R) * r, y: WC.cy + Math.sin(Math.PI - lon * D2R) * r })
const PAIRS = [
  { a: 20, b: 110, col: READING.push },
  { a: 145, b: 265, col: READING.pull },
  { a: 228, b: 48, col: READING.align },
]
const R_A = 220, R_B = 128

// ── the late questions: thought clouds stacked over your head
const BUBS = [
  { lines: ['No kids?'], tag: 'BRUNCH #3', x: 590, y: 1050, w: 420, h: 84, rot: -2 },
  { lines: ['Moving to Austin?'], tag: 'BRUNCH #7', x: 540, y: 850, w: 680, h: 84, rot: 2 },
  { lines: ['Not looking for', 'anything serious?'], tag: 'BRUNCH #12', x: 540, y: 630, w: 690, h: 150, rot: -1.5 },
]
// empty flutes pile up on the table, two per question (x, tipped-over angle)
const EMPTIES = [[330, -4], [745, 6], [430, 3], [655, -8], [295, 82], [800, -3]]

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 80px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('MIDTOWN · SUNDAY · 11 AM'), 0.05, T.h0Out], [eyebrow('ON ALIGN'), T.h2, T.h2Out]]
  const H0 = popText(root, 'Another Midtown | brunch with | someone who’s | *“just* *seeing* *where* | *it* *goes.”*', { top: 200, size: 104, accentSize: 122, at: T.h0, gap: 0.06, late: 5, lateAt: T.h0Late, lateGap: 0.09, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H1 = popText(root, 'The big questions | show up… *late.*', { top: 200, size: 92, accentSize: 140, at: T.h1, gap: 0.07, late: 1, lateAt: T.h1Late, drop: true, accentColor: RED })
  const H2 = popText(root, 'Dealbreakers | come *first.*', { top: 205, size: 124, accentSize: 156, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Late, wobble: true, accentColor: GOLD })
  const S2 = popText(root, 'Up front. Not at | *brunch* *#12.*', { top: 1570, size: 72, weight: 800, accentSize: 88, at: T.s2, gap: 0.07, late: 2, lateAt: T.s2 + 0.3, accentColor: PINK })
  const H3 = popText(root, 'See how you fit | before the first | *mimosa.*', { top: 190, size: 100, accentSize: 140, at: T.h3, gap: 0.06, late: 1, lateAt: T.h3Late, wobble: true, accentColor: MIMOSA })
  const S3 = popText(root, 'Push. Pull. *Align.*', { top: 1620, size: 76, weight: 800, accentSize: 90, times: T.lines, colors: { 0: READING.push, 1: READING.pull }, accentColor: READING.align })
  const H4 = popText(root, 'Brunch with | *intention.*', { top: 210, size: 140, accentSize: 176, at: T.h4, gap: 0.08, late: 1, lateAt: T.h4Late, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [S2, T.h2Out], [H3, T.h3Out], [S3, T.h3Out], [H4, T.h4Out]]

  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── 1+2 · the brunch table (hook and the late questions share it)
  function drawBrunch(t) {
    if (t > T.tableOut[1]) return
    const a = 1 - ease.inCubic(prog(t, ...T.tableOut))
    const rise = 1 - ease.outCubic(prog(t, T.table, T.table + 0.6))
    const late = t >= T.h1 - 0.2                     // second act: the questions
    x.save(); x.translate(0, rise * 160 + 60 * ease.inCubic(prog(t, ...T.tableOut)))
    // people (behind the table)
    const pk = pop01(t, T.table + 0.05, 0.4), dk = pop01(t, T.table + 0.15, 0.4)
    const sigh = late ? ease.inOutCubic(prog(t, T.stamp - 0.1, T.stamp + 0.5)) : 0
    person(x, YOU.cx, TY, YOU.col, { a: a * clamp(pk * 3), s: pk, bob: 6 * Math.sin(t * 2.6) + 30 * sigh, lean: -4 * sigh })
    const dateA = late ? lerp(1, 0.45, ease.inOutQuad(prog(t, T.h1, T.h1 + 0.5))) : 1
    const shrugBob = T.shrugs.reduce((s, ts) => s + Math.max(0, Math.sin(Math.PI * prog(t, ts, ts + 0.4))), 0)
    person(x, DATE.cx, TY, DATE.col, { a: a * clamp(dk * 3) * dateA, s: dk, bob: 5 * Math.sin(t * 2.6 + 1) - 16 * shrugBob })
    table(x, a, lerp(0.7, 1, pop01(t, T.table, 0.45)))
    // pancakes (gone by the questions)
    const pkA = a * (1 - ease.inQuad(prog(t, T.bub[0] - 0.4, T.bub[0])))
    pancakes(x, 540, TY - 12, t, { a: pkA, s: pop01(t, T.table + 0.35, 0.4) })
    // the two mimosas: they drain as the brunches pile up
    const drain = late ? ease.inOutQuad(prog(t, T.bub[0], T.bub[2] + 0.4)) : 0
    flute(x, 365, TY - 12, t, { level: lerp(0.82, 0, drain), a, s: pop01(t, T.table + 0.25, 0.4), seed: 3, rot: -3 })
    flute(x, 715, TY - 12, t, { level: lerp(0.82, 0, drain), a, s: pop01(t, T.table + 0.3, 0.4), seed: 7, rot: 3 })
    // the empties pile up, two per question
    EMPTIES.forEach(([ex, rot], i) => {
      const t0 = T.bub[Math.floor(i / 2)] + 0.12 + (i % 2) * 0.12
      const k = pop01(t, t0, 0.32, 2.4)
      if (k <= 0) return
      const tipped = Math.abs(rot) > 45
      flute(x, ex, TY - (tipped ? 30 : 12), t, { level: 0, a: a * clamp(k * 3), s: 0.82 * k, rot, col: DULL })
    })
    sparkle(x, 365, TY - 220, t, T.table + 0.45, { n: 8, R: 110, seed: 2, size: 22, cols: [MIMOSA, GOLD, '#fff3e0'] })
    sparkle(x, 715, TY - 220, t, T.table + 0.5, { n: 8, R: 110, seed: 4, size: 22, cols: [MIMOSA, GOLD, '#fff3e0'] })
    // the shrugging "idk lol"
    if (t >= T.idk && t < T.h0Out + 0.4) {
      const bk = pop01(t, T.idk, 0.42, 2.2)
      const lift = T.shrugs.reduce((s, ts) => s + Math.max(0, Math.sin(Math.PI * prog(t, ts, ts + 0.4))), 0)
      shrugBubble(x, 640, 960, bk, lift, a * clamp(bk * 3) * outK(t, T.h0Out, 0.3), t)
      sparkle(x, 640, 960, t, T.idk + 0.15, { n: 10, R: 280, seed: 6, size: 26 })
    }
    // the late questions
    if (late) drawQuestions(t, a)
    x.restore()
  }

  function drawQuestions(t, a) {
    const shake = t > T.stamp ? 14 * Math.exp(-(t - T.stamp) * 6) * Math.sin((t - T.stamp) * 40) : 0
    // thought trail from your head up to the first cloud
    const tk = prog(t, T.bub[0] - 0.25, T.bub[0])
    ;[[262, 1118, 12], [300, 1098, 17], [345, 1076, 22]].forEach(([px, py, r], i) => {
      const k = pop01(t, T.bub[0] - 0.3 + i * 0.07, 0.25)
      if (k <= 0 || tk <= 0) return
      x.beginPath(); x.arc(px, py, r * k, 0, TAU); ink(x, BONE, { w: 5, fa: 0.85, glow: 14, fill: '#f3eefc' })
    })
    BUBS.forEach((B, i) => {
      const t0 = T.bub[i]
      if (t < t0) return
      // thuds down into place (heavy, "too late"), squashes, settles
      const p = prog(t, t0, t0 + 0.3), land = t0 + 0.3
      const y = B.y - 90 * (1 - ease.inQuad(p)), pk = lerp(0.55, 1, ease.outCubic(p))
      const sq = t > land ? 0.16 * Math.exp(-(t - land) * 7) * Math.cos((t - land) * 24) : 0
      const dim = 1 - 0.25 * ease.inOutQuad(prog(t, T.stamp, T.stamp + 0.3))
      x.save(); x.translate(B.x + shake * (i % 2 ? 1 : -1), y + Math.abs(shake) * 0.3); x.rotate((B.rot + shake * 0.2) * D2R); x.scale(pk * (1 + sq), pk * (1 - sq))
      cloud(x, B.w, B.h, B.lines, { a: a * clamp(p * 4) * dim, size: 66 })
      // sticker on the corner
      const sk = pop01(t, t0 + 0.32, 0.3, 2.6)
      if (sk > 0) { x.save(); x.translate(B.w / 2 - 10, -B.h / 2 - 34); x.rotate(8 * D2R); x.scale(sk, sk); sticker(x, B.tag, a * dim); x.restore() }
      x.restore()
      sparkle(x, B.x, B.y + B.h / 2 + 40, t, land, { n: 8, R: 220, seed: 30 + i, size: 22, cols: [BONE, LILAC, GOLD] })
    })
    // TOO LATE.
    if (t >= T.stamp - 0.18) {
      const sp = prog(t, T.stamp - 0.18, T.stamp)
      const sc = lerp(2.6, 1, ease.inCubic(sp)) * (t > T.stamp ? 1 + 0.08 * Math.sin((t - T.stamp) * 30) * Math.exp(-(t - T.stamp) * 9) : 1)
      x.save(); x.translate(540, 860); x.rotate(-9 * D2R); x.scale(sc, sc)
      stamp(x, 'TOO LATE.', a * clamp(sp * 2.5), { w: 800, h: 220, size: 140 })
      x.restore()
      sparkle(x, 540, 860, t, T.stamp, { n: 16, R: 420, seed: 40, size: 30, cols: [RED, '#ff8a80', '#fff3e0'] })
    }
  }

  // ── 3 · dealbreakers come first
  function drawDeal(t) {
    if (t < T.card - 0.05 || t > T.h2Out + 0.45) return
    const o = ease.inCubic(prog(t, T.h2Out - 0.1, T.h2Out + 0.35))
    const ck = pop01(t, T.card, 0.5, 1.8)
    const thumps = T.chips.reduce((s, tc) => s + (t > tc ? Math.sin((t - tc) * 26) * Math.exp(-(t - tc) * 8) : 0), 0)
    x.save()
    x.translate(CARD.cx, CARD.cy + 10 * Math.sin((t - T.card) * 2) + 10 * thumps + 160 * o)
    x.rotate((-2 + 1.2 * Math.sin((t - T.card) * 1.6)) * D2R)
    x.scale(ck * (1 - 0.03 * thumps) * (1 - 0.2 * o), ck * (1 + 0.03 * thumps) * (1 - 0.2 * o))
    x.globalAlpha = clamp(ck * 3) * (1 - o)
    dealCard(x)
    T.chips.forEach((tc, i) => {
      if (t < tc - 0.18) return
      const sp = prog(t, tc - 0.18, tc)
      const sc = lerp(2.2, 1, ease.inCubic(sp)) * (t > tc ? 1 + 0.07 * Math.sin((t - tc) * 30) * Math.exp(-(t - tc) * 9) : 1)
      const hot = Math.exp(-Math.max(0, t - tc) * 3)
      x.save(); x.translate(0, CHIP_Y[i]); x.rotate((i === 2 ? -2.5 : i ? 1.5 : -1) * D2R); x.scale(sc, sc); x.globalAlpha *= clamp(sp * 3)
      chip(x, CHIPS[i], hot)
      x.restore()
    })
    x.restore()
    sparkle(x, CARD.cx, CARD.cy, t, T.card + 0.2, { n: 12, R: 470, seed: 50, size: 28 })
    T.chips.forEach((tc, i) => sparkle(x, CARD.cx, CARD.cy + CHIP_Y[i], t, tc, { n: i === 2 ? 16 : 10, R: i === 2 ? 460 : 380, seed: 60 + i, size: i === 2 ? 30 : 24, cols: [RED, '#ff8a80', GOLD, '#fff3e0'] }))
  }

  // ── 4 · two wheels lock; Push / Pull / Align
  function drawWheels(t) {
    if (t < T.wA[0] - 0.05 || t > T.h3Out + 0.4) return
    const o = 1 - ease.inCubic(prog(t, T.wOut, T.wOut + 0.4))
    const os = lerp(0.6, 1, o)
    const bump = 1 + 0.06 * Math.exp(-Math.max(0, t - T.lock) * 7) * (t > T.lock ? 1 : 0)
    const pa = easeOutBack(prog(t, ...T.wA), 1.3), pb = easeOutBack(prog(t, ...T.wB), 1.3)
    const ra = -1.75 * Math.PI * (1 - ease.outCubic(prog(t, T.wA[0], T.lock))), rb = 1.5 * Math.PI * (1 - ease.outCubic(prog(t, T.wB[0], T.lock)))
    const ax = lerp(-560, WC.cx, pa), bx = lerp(1640, WC.cx, pb)
    x.save(); x.globalAlpha = o
    if (t >= T.wA[0]) { x.save(); x.translate(ax, WC.cy); x.rotate(ra); x.scale(bump * os, bump * os); drawWheelH(x, { W: WA, k: o }); x.restore() }
    if (t >= T.wB[0]) { x.save(); x.translate(bx, WC.cy); x.rotate(rb); x.scale(bump * os, bump * os); drawWheelH(x, { W: WB, k: o }); x.restore() }
    x.restore()
    const fk = prog(t, T.lock, T.lock + 0.6)
    if (fk > 0 && fk < 1) {
      x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(WC.cx, WC.cy, 340 + 120 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 10 * (1 - fk) + 2, fa: 0, glow: 30 }); x.restore()
    }
    sparkle(x, WC.cx, WC.cy, t, T.lock, { n: 16, R: 420, seed: 9, size: 30 })
    PAIRS.forEach((P, i) => {
      const A_ = pt(P.a, R_A * os), B_ = pt(P.b, R_B * os)
      const dk = pop01(t, T.dots + i * 0.08, 0.36, 2.2) * o
      const lk = ease.inOutCubic(prog(t, T.lines[i], T.lines[i] + 0.38)) * o
      if (lk > 0) {
        const pulse = 1 + 0.25 * Math.exp(-Math.max(0, t - T.lines[i] - 0.38) * 4)
        x.save(); x.globalAlpha = o; x.beginPath(); x.moveTo(A_.x, A_.y); x.lineTo(lerp(A_.x, B_.x, lk), lerp(A_.y, B_.y, lk)); ink(x, P.col, { w: 10 * pulse, fa: 0, glow: 26 }); x.restore()
        sparkle(x, B_.x, B_.y, t, T.lines[i] + 0.36, { n: 8, R: 100, seed: 20 + i, cols: [P.col, '#fff3e0'], size: 22 })
      }
      if (dk > 0) {
        orb(x, A_.x, A_.y, 24 * dk, GOLD, clamp(dk * 2) * o)
        orb(x, B_.x, B_.y, 24 * dk, SILVER, clamp(dk * 2) * o)
      }
    })
  }

  // ── 5 · brunch with intention: the table is back, two flutes rise and clink
  function drawEnd(t) {
    if (t < T.table4 || t > T.table4Out[1]) return
    const a = 1 - ease.inCubic(prog(t, ...T.table4Out))
    const rise = 1 - ease.outCubic(prog(t, T.table4, T.table4 + 0.55))
    x.save(); x.translate(0, rise * 200 + 70 * ease.inCubic(prog(t, ...T.table4Out)))
    const pk = pop01(t, T.table4 + 0.05, 0.4), dk = pop01(t, T.table4 + 0.12, 0.4)
    const rp = ease.inOutCubic(prog(t, ...T.raise))
    const ck = t > T.clink ? Math.exp(-(t - T.clink) * 5) * Math.sin((t - T.clink) * 30) : 0
    // flute paths: from the table to the clink point (they lean in, rims touching)
    const L = { x: lerp(365, 446, rp) - 10 * ck, y: lerp(TY - 12, 1170, rp), rot: lerp(-3, 14, rp) }
    const R = { x: lerp(715, 634, rp) + 10 * ck, y: lerp(TY - 12, 1170, rp), rot: lerp(3, -14, rp) }
    // hands reach up: draw the people, then their arms to the flute stems
    person(x, YOU.cx, TY, GOLD, { a: a * clamp(pk * 3), s: pk, bob: 5 * Math.sin(t * 2.6), lean: 4 * rp })
    person(x, DATE.cx, TY, PINK, { a: a * clamp(dk * 3), s: dk, bob: 5 * Math.sin(t * 2.6 + 1), lean: -4 * rp })
    if (rp > 0) {
      for (const [P, sh, col] of [[L, { x: YOU.cx + 80, y: TY - 150 }, GOLD], [R, { x: DATE.cx - 80, y: TY - 150 }, PINK]]) {
        const hx = P.x + Math.sin(P.rot * D2R) * 60, hy = P.y - Math.cos(P.rot * D2R) * 60
        const mx = lerp(sh.x, hx, 0.5), my = Math.max(sh.y, hy) + 50
        x.save(); x.globalAlpha = a * clamp(rp * 4); x.beginPath(); x.moveTo(sh.x, sh.y); x.quadraticCurveTo(mx, my, hx, hy); ink(x, col, { w: 16, fa: 0, glow: 16 }); x.restore()
      }
    }
    table(x, a, lerp(0.7, 1, pop01(t, T.table4, 0.45)))
    pancakes(x, 540, TY - 12, t, { a, s: pop01(t, T.table4 + 0.3, 0.4) })
    flute(x, L.x, L.y, t, { level: 0.82, a, s: pop01(t, T.table4 + 0.2, 0.4), seed: 3, rot: L.rot })
    flute(x, R.x, R.y, t, { level: 0.82, a, s: pop01(t, T.table4 + 0.25, 0.4), seed: 7, rot: R.rot })
    // the clink: gold flash + sparkles + a little heart of stars
    const fk = prog(t, T.clink, T.clink + 0.5)
    const cx = 540, cy = 1170 - 236
    if (fk > 0 && fk < 1) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, 260 * ease.outCubic(fk))
      g.addColorStop(0, rgba(GOLD, 0.65 * (1 - fk))); g.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 260, 0, TAU); x.fill(); x.restore()
    }
    sparkle(x, cx, cy, t, T.clink, { n: 18, R: 360, seed: 70, size: 32, dur: 0.9 })
    // a heart of pixel stars floats up from the clink
    const hk = pop01(t, T.clink + 0.12, 0.5, 2.2)
    if (hk > 0) {
      const hy = cy - 120 - 90 * ease.outCubic(prog(t, T.clink, T.clink + 1.4)), pulse = 1 + 0.06 * Math.sin((t - T.clink) * 8)
      x.save(); x.globalAlpha = a
      for (let i = 0; i < 22; i++) {
        const th = Math.PI + (i / 22) * TAU
        const hx = 16 * Math.pow(Math.sin(th), 3), hyy = -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th))
        drawPixelStar(x, cx + hx * 8.5 * hk * pulse, hy + hyy * 8.5 * hk * pulse, i % 4 ? 20 : 28, i % 3, i % 2 ? GOLD : PINK)
      }
      x.restore()
    }
    // ting lines
    if (t > T.clink && t < T.clink + 0.6) {
      const p = prog(t, T.clink, T.clink + 0.6)
      x.save(); x.globalAlpha = a * (1 - p)
      for (let i = 0; i < 6; i++) {
        const ang = -Math.PI / 2 + (i - 2.5) * 0.42, r0 = 70 + 80 * ease.outCubic(p), r1 = r0 + 50
        x.beginPath(); x.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0); x.lineTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1); ink(x, GOLD, { w: 8, fa: 0, glow: 16 })
      }
      x.restore()
    }
    x.restore()
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.table4Out[1]) { drawBrunch(t); drawDeal(t); drawWheels(t); drawEnd(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
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

// ── sound (pitched SFX are written in the films' D-major palette; the engine moves them into C)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ...wordPops(T.h0, 6, 0.06, 0, 0.028), ['pop', T.table + 0.05, 587.33, 0.05, -0.4], ['pop', T.table + 0.15, 659.25, 0.05, 0.4],
  ['whoosh', T.table, 0.5, 0.03], ['glitter', T.table + 0.45, T.table + 0.95],
  ...[0, 1, 2, 3, 4].map(i => ['pop', +(T.h0Late + i * 0.09).toFixed(3), NOTE[(2 + i) % 7], 0.04, (i - 2) * 0.15]),
  ['pluck', T.h0Late + 0.36, 1174.66, 0.05, 0.6, 0],
  ['pop', T.idk, 880, 0.06, 0.2], ['whoosh', T.idk - 0.05, 0.3, 0.03],
  ...T.shrugs.map((s, i) => ['pluck', s, [659.25, 587.33, 493.88][i], 0.04, 0.25, 0.25]),
  // the late questions
  ...wordPops(T.h1, 5, 0.07, 1, 0.025), ['whoosh', T.h1Late, 0.34, 0.035], ['boom', T.h1Late + 0.34, 0.08], ['tick', T.h1Late + 0.34, 0.07],
  ...T.bub.flatMap((tb, i) => [['whoosh', tb, 0.3, 0.03], ['tick', tb + 0.3, 0.07], ['pluck', tb + 0.3, [440, 392, 329.63][i], 0.045, 0.3, (i - 1) * 0.3],
    ['pop', tb + 0.42, 987.77, 0.03, 0.3], ['pop', tb + 0.54, 880, 0.03, -0.3]]),
  ['whoosh', T.stamp - 0.2, 0.2, 0.045], ['boom', T.stamp, 0.18], ['tick', T.stamp, 0.09],
  ...[880, 783.99, 659.25, 554.37, 440].map((f, i) => ['pluck', +(T.stamp + 0.2 + i * 0.11).toFixed(3), f, 0.035, 0.3, -0.2 + i * 0.1]),
  // dealbreakers
  ...wordPops(T.h2, 2, 0.08, 2), ['pop', T.h2Late, 1318.51, 0.05, 0], ['pluck', T.h2Late, 987.77, 0.045, 0.6, 0],
  ['pop', T.card, 880, 0.055, -0.2], ['whoosh', T.card - 0.1, 0.4, 0.035], ['glitter', T.card + 0.2, T.card + 0.7],
  ...T.chips.flatMap((tc, i) => [['whoosh', tc - 0.2, 0.2, 0.035], ['tick', tc, 0.08], ['pop', tc, [739.99, 880, 1174.66][i], 0.05, 0], i === 2 ? ['boom', tc, 0.14] : ['pluck', tc + 0.02, 587.33, 0.035, 0.4, 0]]),
  ['bell', T.chips[2] + 0.04, 587.33, 0.04, 1.0, 0],
  ...wordPops(T.s2, 4, 0.07, 1, 0.022), ['pop', T.s2 + 0.3, 1174.66, 0.04, 0.2], ['pop', T.s2 + 0.4, 1318.51, 0.04, -0.2],
  // push / pull / align
  ...wordPops(T.h3, 7, 0.06, 0, 0.022), ['pop', T.h3Late, 1318.51, 0.05, 0], ['pluck', T.h3Late, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.wA[0], 0.6, 0.04], ['whoosh', T.wB[0], 0.6, 0.035], ['bell', T.lock, 880, 0.05, 1.2, 0], ['glitter', T.lock, T.lock + 0.6],
  ...[0, 1, 2].map(i => ['pop', +(T.dots + i * 0.08).toFixed(3), NOTE[3 + i], 0.035, (i - 1) * 0.4]),
  ...T.lines.map((tl, i) => ['pluck', tl, [739.99, 880, 1174.66][i], 0.05, 0.5, (i - 1) * 0.4]),
  ['bell', T.lines[2] + 0.36, 1174.66, 0.04, 1.2, 0],
  // brunch with intention
  ...wordPops(T.h4, 2, 0.08, 2, 0.03), ['pop', T.h4Late, 1318.51, 0.055, 0], ['pluck', T.h4Late, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.table4, 0.5, 0.03], ['riser', T.raise[0] - 0.1, T.clink, 0.035],
  ['bell', T.clink, 1760, 0.06, 1.4, -0.1], ['bell', T.clink + 0.03, 2349.32, 0.04, 1.4, 0.1], ['glitter', T.clink, T.clink + 0.8],
]
