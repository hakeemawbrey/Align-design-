// cityneworleans (30 s vertical Align ad) · story 0–25.6, then the shared END CARD ("come" + the Align logo + CTA).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–5.40   HOOK  "New Orleans: | someone's | always reading | *your cards.*" — a generic French Quarter balcony
//               (iron lace, shutters, two gas lanterns) over a little street card table: a candle, a pictogram reader and
//               three tarot-style cards that flip on the beats (moon, star, heart).
//   5.65–10.70  "The cards say | *love's coming.*" — the heart card flies up big… flips: a blank pictogram and a "?".
//               "They never say | *who.*"
//  10.90–14.70  "Align reads | your *chart.*" — the "?" bursts into a zodiac wheel; "Then deals you a *person.*": three
//               card backs (card-back.png) deal out of the wheel into a fan.
//  14.85–18.70  "Talk cards, | not *small talk.*" — the backs flip one by one into real talk cards (card-talk-*.png).
//  18.95–22.40  "Chart *first.* | Face last." — the fan drops away; a mystery card (card-profile-3.png, aura veil) is
//               dealt in, spinning, and lands in a halo of sign glyphs.
//  22.60–25.30  "Let the *cards* | decide." — the balcony again, two pictograms side by side, card backs flutter down
//               like confetti, a heart of pixel stars.
//  25.30–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack, drawWheelH, SIGNS } from '../../wheel.js'

const W = 1080, H = 1920
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', INK = '#1a1430', DULL = '#b9b3d6'
const LILAC = '#c9a6ff', GREEN = '#5fd3a6', SILVER = '#cfe0ff', PURPLE = '#9a6bff', FLAME = '#ffb347'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const D2R = Math.PI / 180, TAU = Math.PI * 2
const BEAT = n => 0.6 + n * 0.5556

export const END = 25.6
export const T = {
  // hook
  h0: 0.1, h0Late: BEAT(2), bal: 0.1, tab: 0.3, flips: [BEAT(4), BEAT(5), BEAT(6)], h0Out: 5.35, balOut: [5.2, 5.6],
  // the cards say love's coming… never who
  h1: 5.65, h1Late: BEAT(10), fly: [5.6, 6.25], s1: BEAT(12.5), who: BEAT(13), s1Late: BEAT(14), h1Out: 10.65, burst: 10.75,
  // align reads your chart; deals you a person
  h2: 10.9, h2Late: BEAT(19), wheel: [10.8, 11.6], s2: BEAT(20.5), deals: [BEAT(22), BEAT(23), BEAT(24)], h2Out: 14.6,
  // talk cards
  h3: 14.85, h3Late: BEAT(26.5), tflips: [BEAT(27.5), BEAT(28.5), BEAT(29.5)], h3Out: 18.7, fanOut: [18.55, 19.1],
  // chart first, face last
  h4: 18.95, myst: [19.05, 19.55], h4b: BEAT(35), halo: BEAT(35.5), h4Out: 22.35, mystOut: [22.2, 22.6],
  // let the cards decide
  h5: 22.6, h5Late: BEAT(40.5), bal5: [22.5, 23.05], confetti: 22.9, heart: BEAT(42), h5Out: 25.0, bal5Out: [24.85, 25.3],
}

const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))

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
function glow(x, px, py, r, col, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(px, py, 0, px, py, r)
  g.addColorStop(0, rgba(col, 0.55 * a)); g.addColorStop(0.35, rgba(col, 0.18 * a)); g.addColorStop(1, rgba(col, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill(); x.restore()
}

/** springy word-by-word type (as in htxbrunch). `*word*` = accent, `|` = line break, last `late` words pop at lateAt. */
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
/** gas lantern hanging at (0,0) (the hook point); flicker 0..1 */
function lantern(x, t, seed, a = 1, bright = 1) {
  x.save(); x.globalAlpha *= a
  const fl = 0.82 + 0.1 * Math.sin(t * 13 + seed) + 0.08 * Math.sin(t * 29 + seed * 3)
  // bracket + chain
  x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 40); ink(x, BONE, { w: 5, fa: 0, glow: 8 })
  // cap
  x.beginPath(); x.moveTo(-34, 70); x.lineTo(0, 40); x.lineTo(34, 70); x.closePath(); ink(x, BONE, { w: 6, fa: 0.4, glow: 10 })
  // glass body (tapered)
  glow(x, 0, 112, 190 * fl * bright, FLAME, 0.9 * bright)
  x.beginPath(); x.moveTo(-34, 70); x.lineTo(34, 70); x.lineTo(24, 160); x.lineTo(-24, 160); x.closePath()
  x.fillStyle = rgba('#ffd27a', 0.35 + 0.35 * fl * bright); x.fill(); ink(x, BONE, { w: 6, fa: 0, glow: 12 })
  x.beginPath(); x.moveTo(0, 70); x.lineTo(0, 160); x.strokeStyle = rgba(BONE, 0.5); x.lineWidth = 3; x.stroke()
  // flame
  x.beginPath(); x.moveTo(0, 92 - 10 * fl); x.quadraticCurveTo(14, 118, 0, 132); x.quadraticCurveTo(-14, 118, 0, 92 - 10 * fl)
  x.fillStyle = '#fff3d0'; x.shadowColor = FLAME; x.shadowBlur = 24; x.fill(); x.shadowBlur = 0
  // base
  x.beginPath(); x.roundRect(-30, 160, 60, 14, 6); ink(x, BONE, { w: 5, fa: 0.4, glow: 8 })
  x.beginPath(); x.moveTo(0, 174); x.lineTo(0, 196); ink(x, BONE, { w: 5, fa: 0, glow: 8 })
  x.restore()
}

/** a louvered shutter pair (French doors) at (cx, top) w×h with an arched top */
function shutters(x, cx, top, w, h, col) {
  x.beginPath(); x.moveTo(cx - w / 2, top + h); x.lineTo(cx - w / 2, top + w / 2); x.arc(cx, top + w / 2, w / 2, Math.PI, 0); x.lineTo(cx + w / 2, top + h); x.closePath()
  ink(x, col, { w: 6, fa: 0.16, glow: 14 })
  x.save(); x.clip(); x.globalAlpha *= 0.5; x.strokeStyle = col; x.lineWidth = 3
  for (let y = top + w / 2 + 10; y < top + h; y += 22) { x.beginPath(); x.moveTo(cx - w / 2, y); x.lineTo(cx + w / 2, y); x.stroke() }
  x.restore()
  x.beginPath(); x.moveTo(cx, top); x.lineTo(cx, top + h); ink(x, col, { w: 5, fa: 0, glow: 8 })
}

/** French Quarter balcony. (0,0) = centre of the balcony floor. Iron lace, shutters, lanterns, optional ground floor. */
const BAL_H = 440
function balcony(x, t, { a = 1, people = null, lit = 1, ground = false } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  // facade wall
  x.beginPath(); x.rect(-520, -BAL_H, 1040, BAL_H + (ground ? 640 : 0))
  const g = x.createLinearGradient(0, -BAL_H, 0, ground ? 640 : 0); g.addColorStop(0, 'rgba(40,22,66,0.78)'); g.addColorStop(1, 'rgba(22,12,40,0.86)')
  x.fillStyle = g; x.fill()
  // shutters (upper floor)
  shutters(x, -250, -BAL_H + 70, 200, 350, GREEN)
  shutters(x, 250, -BAL_H + 70, 200, 350, GREEN)
  // ground floor: arched doorways
  if (ground) {
    for (const cx of [-250, 250]) shutters(x, cx, 100, 220, 520, LILAC)
    x.beginPath(); x.moveTo(-60, 200); x.lineTo(60, 200); x.lineTo(60, 640); x.moveTo(-60, 640); x.lineTo(-60, 200); ink(x, BONE, { w: 4, fa: 0, glow: 6 })
  }
  // people standing on the balcony (behind the railing)
  if (people) people()
  // roof / gallery slab + lace frieze
  x.beginPath(); x.roundRect(-540, -BAL_H - 28, 1080, 30, 8); ink(x, BONE, { w: 6, fa: 0.4, glow: 14 })
  const posts = [-480, -160, 160, 480]
  for (let i = 0; i < 3; i++) {
    const x0 = posts[i] + 12, x1 = posts[i + 1] - 12, mx = (x0 + x1) / 2
    x.beginPath(); x.moveTo(x0, -BAL_H + 4); x.quadraticCurveTo(x0 + 10, -BAL_H + 60, mx - 50, -BAL_H + 54); x.quadraticCurveTo(mx, -BAL_H + 50, mx, -BAL_H + 4)
    x.moveTo(x1, -BAL_H + 4); x.quadraticCurveTo(x1 - 10, -BAL_H + 60, mx + 50, -BAL_H + 54); x.quadraticCurveTo(mx, -BAL_H + 50, mx, -BAL_H + 4)
    ink(x, LILAC, { w: 5, fa: 0, glow: 12 })
    for (let k = x0 + 30; k < x1 - 20; k += 46) { x.beginPath(); x.arc(k, -BAL_H + 14, 9, 0, Math.PI); ink(x, LILAC, { w: 4, fa: 0, glow: 8 }) }
  }
  // posts
  for (const px of posts) { x.beginPath(); x.moveTo(px, -BAL_H); x.lineTo(px, 0); ink(x, BONE, { w: 9, fa: 0, glow: 14 }) }
  // railing: rails + lace balusters (circle + scrolls), repeated
  x.beginPath(); x.moveTo(-500, -150); x.lineTo(500, -150); x.moveTo(-500, -14); x.lineTo(500, -14); ink(x, BONE, { w: 8, fa: 0, glow: 14 })
  for (let k = -470; k <= 470; k += 62) {
    x.beginPath(); x.moveTo(k, -150); x.lineTo(k, -14); ink(x, LILAC, { w: 4, fa: 0, glow: 8 })
    const m = k + 31
    if (m > 490) continue
    x.beginPath(); x.arc(m, -82, 15, 0, TAU)
    x.moveTo(m, -97); x.quadraticCurveTo(m - 26, -120, m - 4, -146)
    x.moveTo(m, -67); x.quadraticCurveTo(m + 26, -44, m + 4, -18)
    ink(x, LILAC, { w: 4, fa: 0, glow: 10 })
  }
  // floor slab
  x.beginPath(); x.roundRect(-530, -6, 1060, 28, 8); ink(x, BONE, { w: 6, fa: 0.4, glow: 14 })
  // lanterns
  for (const [lx, sd] of [[-320, 1], [320, 4]]) { x.save(); x.translate(lx, -BAL_H + 2); lantern(x, t, sd, 1, lit); x.restore() }
  x.restore()
}

/** pictogram person seated (head + rounded shoulders); (0,0) = where the torso meets the table */
function seated(x, col, a = 1, bob = 0) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(0, bob)
  x.beginPath(); x.moveTo(-104, 20); x.lineTo(-104, -120); x.quadraticCurveTo(-104, -196, -30, -200); x.lineTo(30, -200); x.quadraticCurveTo(104, -196, 104, -120); x.lineTo(104, 20); x.closePath()
  ink(x, col, { w: 8, fa: 0.26, glow: 18 })
  x.beginPath(); x.arc(0, -268, 52, 0, TAU); ink(x, col, { w: 8, fa: 0.34, glow: 22 })
  x.restore()
}
/** pictogram person standing; (0,0) = feet */
function standing(x, col, a = 1, lean = 0) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.rotate(lean * D2R)
  x.beginPath(); x.moveTo(-70, 0); x.lineTo(-74, -170); x.quadraticCurveTo(-74, -236, -20, -240); x.lineTo(20, -240); x.quadraticCurveTo(74, -236, 74, -170); x.lineTo(70, 0); x.closePath()
  ink(x, col, { w: 8, fa: 0.28, glow: 18 })
  x.beginPath(); x.arc(0, -296, 44, 0, TAU); ink(x, col, { w: 8, fa: 0.36, glow: 22 })
  x.restore()
}

/** the street card table: round top, purple cloth with gold fringe; (0,0) = centre of the table top */
function cardTable(x, t) {
  x.beginPath(); x.moveTo(-380, 0); x.lineTo(-400, 260); x.lineTo(400, 260); x.lineTo(380, 0); x.closePath()
  ink(x, PURPLE, { w: 7, fa: 0.3, glow: 16 })
  x.save(); x.globalAlpha *= 0.9
  for (let i = -390; i <= 390; i += 26) { x.beginPath(); x.moveTo(i, 262); x.lineTo(i + 3 * Math.sin(t * 3 + i), 292); ink(x, GOLD, { w: 5, fa: 0, glow: 8 }) }
  x.restore()
  // star motif on the cloth
  x.save(); x.globalAlpha *= 0.55
  for (const [sx, sy] of [[-250, 130], [0, 170], [250, 130]]) drawPixelStar(x, sx, sy, 26, 0, GOLD)
  x.restore()
  x.beginPath(); x.ellipse(0, 0, 400, 30, 0, 0, TAU); ink(x, BONE, { w: 7, fa: 0.3, glow: 16 })
}
function candle(x, t) {
  const fl = 0.85 + 0.1 * Math.sin(t * 17) + 0.05 * Math.sin(t * 31)
  glow(x, 0, -150, 200 * fl, FLAME, 0.9)
  x.beginPath(); x.ellipse(0, -4, 50, 12, 0, 0, TAU); ink(x, GOLD, { w: 5, fa: 0.4, glow: 10 })
  x.beginPath(); x.roundRect(-20, -120, 40, 116, 6); ink(x, BONE, { w: 6, fa: 0.5, glow: 12 })
  x.beginPath(); x.moveTo(-20, -112); x.quadraticCurveTo(-26, -90, -22, -80); ink(x, BONE, { w: 5, fa: 0, glow: 6 })
  x.beginPath(); x.moveTo(0, -176 - 8 * fl); x.quadraticCurveTo(18, -142, 0, -126); x.quadraticCurveTo(-18, -142, 0, -176 - 8 * fl)
  x.fillStyle = '#fff3d0'; x.shadowColor = FLAME; x.shadowBlur = 30; x.fill(); x.shadowBlur = 0
}

/** a drawn tarot-style card (generic art). face: 'back' | 'moon' | 'star' | 'heart' | 'who'. (0,0) = centre */
const FACE = { moon: ['THE MOON', SILVER], star: ['THE STAR', GOLD], heart: ['LOVE', PINK], who: ['WHO?', GOLD] }
function tarot(x, w, h, face, t) {
  const r = w * 0.1
  x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 30; x.shadowOffsetY = 10
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, r); x.fillStyle = face === 'back' ? '#2a1656' : '#1c1238'; x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, r); ink(x, GOLD, { w: Math.max(3, w * 0.03), fa: 0, glow: 18 })
  x.save(); x.globalAlpha *= 0.55; x.strokeStyle = GOLD; x.lineWidth = Math.max(1.5, w * 0.008)
  x.beginPath(); x.roundRect(-w / 2 + w * 0.07, -h / 2 + w * 0.07, w - w * 0.14, h - w * 0.14, r * 0.6); x.stroke(); x.restore()
  const s = w / 300
  x.save(); x.scale(s, s)
  if (face === 'back') {
    // sun-burst + star diamond
    x.save(); x.globalAlpha *= 0.7
    for (let i = 0; i < 16; i++) { const a = i * TAU / 16; x.beginPath(); x.moveTo(Math.cos(a) * 48, Math.sin(a) * 48); x.lineTo(Math.cos(a) * (i % 2 ? 80 : 104), Math.sin(a) * (i % 2 ? 80 : 104)); ink(x, GOLD, { w: 4, fa: 0, glow: 6 }) }
    x.restore()
    x.beginPath(); x.arc(0, 0, 36, 0, TAU); ink(x, GOLD, { w: 5, fa: 0.25, glow: 12 })
    drawPixelStar(x, 0, 0, 30, 0, '#fff3e0')
    for (const sy of [-170, 170]) { x.beginPath(); x.moveTo(0, sy - 18); x.lineTo(14, sy); x.lineTo(0, sy + 18); x.lineTo(-14, sy); x.closePath(); ink(x, GOLD, { w: 4, fa: 0.4, glow: 8 }) }
  } else {
    const [label, col] = FACE[face]
    // arch window
    x.beginPath(); x.moveTo(-100, 60); x.lineTo(-100, -90); x.arc(0, -90, 100, Math.PI, 0); x.lineTo(100, 60); x.closePath()
    ink(x, GOLD, { w: 4, fa: 0.06, glow: 8 })
    x.save(); x.translate(0, -50)
    if (face === 'moon') {
      x.beginPath(); x.arc(0, 0, 62, 0.25 * Math.PI, 1.75 * Math.PI, false); x.arc(26, -6, 50, 1.62 * Math.PI, 0.38 * Math.PI, true); x.closePath(); ink(x, col, { w: 6, fa: 0.4, glow: 18 })
      drawPixelStar(x, 50, -50, 18, 1, col); drawPixelStar(x, 62, 40, 12, 2, col)
    } else if (face === 'star') {
      x.beginPath()
      for (let i = 0; i < 16; i++) { const a = -Math.PI / 2 + i * Math.PI / 8, rr = i % 2 ? 22 : (i % 4 ? 52 : 74); x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) }
      x.closePath(); ink(x, col, { w: 6, fa: 0.45, glow: 18 })
    } else if (face === 'heart') {
      const pulse = 1 + 0.06 * Math.sin(t * 9)
      x.scale(pulse, pulse)
      x.beginPath(); x.moveTo(0, 50); x.bezierCurveTo(-90, -10, -60, -80, 0, -38); x.bezierCurveTo(60, -80, 90, -10, 0, 50); ink(x, col, { w: 7, fa: 0.5, glow: 22 })
    } else if (face === 'who') {
      x.beginPath(); x.moveTo(-60, 100); x.lineTo(-60, 40); x.quadraticCurveTo(-60, 10, -20, 8); x.lineTo(20, 8); x.quadraticCurveTo(60, 10, 60, 40); x.lineTo(60, 100); ink(x, DULL, { w: 6, fa: 0.25, glow: 10 })
      x.beginPath(); x.arc(0, -30, 30, 0, TAU); ink(x, DULL, { w: 6, fa: 0.3, glow: 10 })
      const wob = 8 * Math.sin(t * 6)
      x.save(); x.translate(0, -30); x.rotate(wob * D2R)
      x.font = `900 120px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = GOLD; x.shadowColor = GOLD; x.shadowBlur = 20; x.fillText('?', 0, 4); x.restore()
    }
    x.restore()
    x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `700 30px ${MONO}`
    x.fillText(label, 0, 130)
    x.save(); x.globalAlpha *= 0.6; x.strokeStyle = GOLD; x.lineWidth = 2; x.beginPath(); x.moveTo(-80, 104); x.lineTo(80, 104); x.moveTo(-80, 156); x.lineTo(80, 156); x.stroke(); x.restore()
    drawPixelStar(x, -110, -h / s / 2 + 34, 14, 0, GOLD); drawPixelStar(x, 110, -h / s / 2 + 34, 14, 0, GOLD)
  }
  x.restore()
}

/** flip a card in place: p 0→1 (back → face). drawBack/drawFace draw at the origin. */
function flipCard(x, p, drawBack, drawFace) {
  const c = Math.cos(Math.PI * clamp(p))
  x.save(); x.scale(Math.max(0.02, Math.abs(c)), 1 + 0.08 * Math.sin(Math.PI * clamp(p)))
  if (c >= 0) drawBack(); else drawFace()
  x.restore()
}

// ── layout
const BAL1 = { x: 540, y: 1215 }, TAB = { x: 540, y: 1600 }
const HOOK_CARDS = [{ x: 380, face: 'moon', rot: -6 }, { x: 540, face: 'star', rot: 0 }, { x: 700, face: 'heart', rot: 6 }]
const BIG = { x: 540, y: 1060, w: 440, h: 700 }
const WC = { cx: 540, cy: 1110 }
const WHEEL_R = { cx: 0, cy: 0, rOut: 420, rIn: 336, rGlyph: 378, alpha: 0.92 }
const FAN = [{ x: 252, y: 1210, rot: -10 }, { x: 540, y: 1170, rot: 0 }, { x: 828, y: 1210, rot: 10 }]
const FAN_W = 312, FAN_H = 499
const MYST = { x: 540, y: 1110, w: 630 }
const BAL5 = { x: 540, y: 1300 }

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 92px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [back, myst, ...talks] = await Promise.all(['card-back.png', 'card-profile-3.png', 'card-talk-1.png', 'card-talk-6.png', 'card-talk-4.png'].map(load))
  const bmp = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const backB = bmp(back, 640), mystB = bmp(myst, 1000), talkB = talks.map(im => bmp(im, 640))

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('THE FRENCH QUARTER · 9 PM'), 0.05, T.h0Out], [eyebrow('ON ALIGN', LILAC), T.h2 - 0.1, T.h4Out]]
  const H0 = popText(root, 'New Orleans: | someone’s | always reading | *your* *cards.*', { top: 200, size: 104, accentSize: 168, at: T.h0, gap: 0.08, late: 2, lateAt: T.h0Late, lateGap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H1 = popText(root, 'The cards say | *love’s* *coming.*', { top: 200, size: 112, accentSize: 150, at: T.h1, gap: 0.08, late: 2, lateAt: T.h1Late, lateGap: 0.12, wobble: true, accentColor: PINK })
  const S1 = popText(root, 'They never say | *who.*', { top: 1500, size: 84, accentSize: 170, at: T.s1, gap: 0.08, late: 1, lateAt: T.s1Late, drop: true, accentColor: GOLD, lineHeight: 0.95 })
  const H2 = popText(root, 'Align reads | your *chart.*', { top: 210, size: 124, accentSize: 160, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Late, wobble: true, accentColor: LILAC })
  const S2 = popText(root, 'Then deals you a *person.*', { top: 1590, size: 70, accentSize: 92, at: T.s2, gap: 0.08, late: 1, lateAt: T.s2 + 0.4, accentColor: PINK })
  const H3 = popText(root, 'Talk cards, | not *small* *talk.*', { top: 210, size: 124, accentSize: 160, at: T.h3, gap: 0.09, late: 2, lateAt: T.h3Late, lateGap: 0.12, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Card *first.* | Face last.', { top: 200, size: 124, accentSize: 160, times: [T.h4 + 0.2, T.h4 + 0.32, T.h4b, T.h4b + 0.1], accentColor: GOLD })
  const H5 = popText(root, 'Let the *cards* | decide.', { top: 230, size: 140, accentSize: 176, at: T.h5, gap: 0.09, late: 1, lateAt: T.h5Late, drop: true, accentColor: GOLD, lineHeight: 1.04 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [S1, T.h1Out], [H2, T.h2Out], [S2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out]]

  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const drawBackImg = (w, h) => () => {
    if (backB) { x.shadowColor = rgba(PURPLE, 0.8); x.shadowBlur = 30; x.drawImage(backB, -w / 2, -h / 2, w, h); x.shadowBlur = 0 }
    else { x.fillStyle = '#3a1f7a'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 20); x.fill() }
  }
  const drawImg = (b, w, h, col) => () => {
    if (b) { x.shadowColor = rgba(col, 0.8); x.shadowBlur = 36; x.drawImage(b, -w / 2, -h / 2, w, h); x.shadowBlur = 0 }
  }

  // ── 1 · the hook: balcony + the street card table
  function drawHook(t) {
    if (t > T.balOut[1] + 0.5) return
    const a = 1 - ease.inCubic(prog(t, ...T.balOut))
    const bk = pop01(t, T.bal, 0.5, 1.6)
    // balcony rises in
    x.save(); x.translate(BAL1.x, BAL1.y + (1 - ease.outCubic(prog(t, T.bal, T.bal + 0.55))) * 220 - 60 * ease.inCubic(prog(t, ...T.balOut)))
    x.scale(lerp(0.92, 1, bk), lerp(0.92, 1, bk))
    balcony(x, t, { a: a * clamp(bk * 2) })
    x.restore()
    sparkle(x, BAL1.x - 320, BAL1.y - 300, t, T.bal + 0.45, { n: 8, R: 120, seed: 1, size: 22, cols: [FLAME, GOLD, '#fff3e0'] })
    sparkle(x, BAL1.x + 320, BAL1.y - 300, t, T.bal + 0.5, { n: 8, R: 120, seed: 2, size: 22, cols: [FLAME, GOLD, '#fff3e0'] })
    // the table, reader, candle and cards
    const tk = pop01(t, T.tab, 0.45, 1.8)
    x.save(); x.translate(TAB.x, TAB.y + (1 - ease.outCubic(prog(t, T.tab, T.tab + 0.5))) * 260 + 80 * ease.inCubic(prog(t, ...T.balOut)))
    x.globalAlpha = a * clamp(tk * 3)
    const rk = pop01(t, T.tab + 0.15, 0.4)
    x.save(); x.scale(rk, rk); seated(x, LILAC, 1, 5 * Math.sin(t * 2.4) - T.flips.reduce((s, tf) => s + 10 * Math.max(0, Math.sin(Math.PI * prog(t, tf - 0.1, tf + 0.25))), 0)); x.restore()
    cardTable(x, t)
    x.save(); x.translate(-300, -6); x.scale(pop01(t, T.tab + 0.3, 0.4), pop01(t, T.tab + 0.3, 0.4)); candle(x, t); x.restore()
    HOOK_CARDS.forEach((C, i) => {
      const k = pop01(t, T.tab + 0.35 + i * 0.08, 0.36, 2.2)
      if (k <= 0) return
      // the heart card leaves for act 2
      if (i === 2 && t >= T.fly[0]) return
      const tf = T.flips[i], fp = ease.inOutCubic(prog(t, tf - 0.12, tf + 0.18))
      const hop = 40 * Math.sin(Math.PI * prog(t, tf - 0.15, tf + 0.25))
      x.save(); x.translate((C.x - 540) * 1.12, -150 - hop); x.rotate(C.rot * D2R); x.scale(k, k)
      flipCard(x, fp, () => tarot(x, 172, 275, 'back', t), () => tarot(x, 172, 275, C.face, t))
      x.restore()
      sparkle(x, C.x - 540, -150, t, tf + 0.05, { n: 9, R: 150, seed: 10 + i, size: 22, cols: [FACE[C.face][1], GOLD, '#fff3e0'] })
    })
    x.restore()
  }

  // ── 2 · the heart card flies up; flips to "who?"
  function drawLove(t) {
    if (t < T.fly[0] || t > T.burst + 0.1) return
    const fp = ease.inOutCubic(prog(t, ...T.fly))
    const from = { x: 719, y: TAB.y - 150 }
    const cx = lerp(from.x, BIG.x, fp), cy = lerp(from.y, BIG.y, fp) - 160 * Math.sin(Math.PI * fp)
    const s = lerp(172 / BIG.w, 1, fp)
    const land = T.fly[1], sq = t > land ? 0.08 * Math.exp(-(t - land) * 6) * Math.cos((t - land) * 22) : 0
    const flip = ease.inOutCubic(prog(t, T.who - 0.15, T.who + 0.2))
    const shake = t > T.s1Late + 0.34 ? 10 * Math.exp(-(t - T.s1Late - 0.34) * 6) * Math.sin((t - T.s1Late) * 40) : 0
    const burst = ease.inCubic(prog(t, T.burst - 0.15, T.burst + 0.05))
    glow(x, cx, cy, 520 * s, flip > 0.5 ? GOLD : PINK, clamp(fp) * (1 - burst) * (0.75 + 0.15 * Math.sin(t * 5)))
    x.save(); x.translate(cx + shake, cy + 8 * Math.sin((t - land) * 2)); x.rotate(lerp(6, -2, fp) * D2R + shake * 0.004)
    x.scale(s * (1 + sq) * (1 + 0.3 * burst), s * (1 - sq) * (1 + 0.3 * burst)); x.globalAlpha = 1 - burst
    flipCard(x, flip, () => tarot(x, BIG.w, BIG.h, 'heart', t), () => tarot(x, BIG.w, BIG.h, 'who', t))
    x.restore()
    sparkle(x, BIG.x, BIG.y, t, land, { n: 14, R: 420, seed: 20, size: 28, cols: [PINK, '#ffd0de', GOLD, '#fff3e0'] })
    sparkle(x, BIG.x, BIG.y, t, T.who + 0.05, { n: 12, R: 400, seed: 21, size: 26, cols: [GOLD, DULL, '#fff3e0'] })
    // little hearts floating off the card while it's still LOVE
    if (t < T.who) {
      x.save()
      for (let i = 0; i < 6; i++) {
        const u = ((t - land) * 0.6 + i / 6) % 1
        if (t < land) break
        const hx = BIG.x + (i % 2 ? 1 : -1) * (260 + 40 * Math.sin(i * 2 + t * 2)), hy = BIG.y + 260 - u * 640
        x.globalAlpha = Math.sin(Math.PI * u) * 0.9 * (1 - prog(t, T.who - 0.3, T.who))
        x.save(); x.translate(hx, hy); x.scale(0.4, 0.4); x.beginPath(); x.moveTo(0, 50); x.bezierCurveTo(-90, -10, -60, -80, 0, -38); x.bezierCurveTo(60, -80, 90, -10, 0, 50); ink(x, PINK, { w: 8, fa: 0.6, glow: 16 }); x.restore()
      }
      x.restore()
    }
  }

  // ── 3+4 · the wheel blooms, deals three backs into a fan; they flip into talk cards
  function drawDeal(t) {
    if (t < T.wheel[0] - 0.1 || t > T.fanOut[1] + 0.05) return
    sparkle(x, WC.cx, WC.cy, t, T.burst, { n: 18, R: 460, seed: 30, size: 32, cols: [GOLD, LILAC, PINK, '#fff3e0'], dur: 0.9 })
    // wheel
    const wp = easeOutBack(prog(t, ...T.wheel), 1.4)
    const wa = clamp(prog(t, T.wheel[0], T.wheel[0] + 0.2)) * lerp(1, 0.32, ease.inOutCubic(prog(t, T.deals[0] - 0.3, T.deals[2] + 0.3))) * (1 - ease.inCubic(prog(t, T.h3Out - 0.3, T.h3Out + 0.2)))
    if (wa > 0) {
      const rot = -1.4 * Math.PI * (1 - ease.outCubic(prog(t, T.wheel[0], T.wheel[1] + 0.4))) + 0.05 * t
      glow(x, WC.cx, WC.cy, 520 * wp, LILAC, wa * 0.6)
      x.save(); x.translate(WC.cx, WC.cy); x.rotate(rot); x.scale(wp, wp); drawWheelH(x, { W: WHEEL_R, k: wa })
      // the chart inside: planets pop on their degrees, aspect lines draw between them
      const PL = [[28, 250, GOLD], [118, 200, SILVER], [196, 270, PINK], [262, 230, '#8fd8f6'], [327, 180, LILAC]]
      const lk = ease.inOutCubic(prog(t, T.wheel[1] + 0.25, T.wheel[1] + 0.9))
      if (lk > 0) {
        x.save(); x.globalAlpha = wa * 0.8
        for (const [i, j] of [[0, 2], [1, 3], [2, 4], [0, 3]]) {
          const A_ = PL[i], B_ = PL[j], ax = Math.cos(Math.PI - A_[0] * D2R) * A_[1], ay = Math.sin(Math.PI - A_[0] * D2R) * A_[1]
          const bx = Math.cos(Math.PI - B_[0] * D2R) * B_[1], by = Math.sin(Math.PI - B_[0] * D2R) * B_[1]
          x.beginPath(); x.moveTo(ax, ay); x.lineTo(lerp(ax, bx, lk), lerp(ay, by, lk)); ink(x, i % 2 ? '#8fd8f6' : '#f59cc4', { w: 4, fa: 0, glow: 12 })
        }
        x.restore()
      }
      PL.forEach(([lon, r, col], i) => {
        const k = pop01(t, T.wheel[1] - 0.1 + i * 0.1, 0.35, 2.4)
        if (k <= 0) return
        const px = Math.cos(Math.PI - lon * D2R) * r, py = Math.sin(Math.PI - lon * D2R) * r
        glow(x, px, py, 70 * k, col, wa)
        x.save(); x.globalAlpha = wa; x.beginPath(); x.arc(px, py, 20 * k, 0, TAU); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 20; x.fill(); x.restore()
      })
      x.restore()
    }
    // the three cards
    const fo = ease.inCubic(prog(t, ...T.fanOut))
    FAN.forEach((F, i) => {
      const td = T.deals[i]
      if (t < td - 0.3) return
      const p = ease.outCubic(prog(t, td - 0.3, td + 0.05))
      const land = td + 0.05, sq = t > land ? 0.07 * Math.exp(-(t - land) * 7) * Math.cos((t - land) * 24) : 0
      const spin = (1 - p) * 540 * (i === 1 ? 1 : i ? 1 : -1)
      const tf = T.tflips[i], fp = ease.inOutCubic(prog(t, tf - 0.14, tf + 0.18))
      const lift = Math.sin(Math.PI * prog(t, tf - 0.18, tf + 0.5))
      const px = lerp(WC.cx, F.x, p), py = lerp(WC.cy, F.y, p) - 60 * lift + 520 * fo
      const sc = lerp(0.2, 1, p) * (1 + 0.22 * lift) * (1 - 0.3 * fo)
      x.save(); x.globalAlpha = 1 - fo
      x.translate(px, py); x.rotate((F.rot * (1 - 0.6 * lift) + spin) * D2R); x.scale(sc * (1 + sq), sc * (1 - sq))
      flipCard(x, fp, drawBackImg(FAN_W, FAN_H), drawImg(talkB[i], FAN_W, FAN_H, GOLD))
      x.restore()
      sparkle(x, F.x, F.y, t, land, { n: 9, R: 220, seed: 40 + i, size: 24, cols: [LILAC, PURPLE, '#fff3e0'] })
      sparkle(x, F.x, F.y - 60, t, tf + 0.05, { n: 12, R: 280, seed: 50 + i, size: 26, cols: [GOLD, '#ffd98a', '#fff3e0'] })
    })
  }

  // ── 5 · the mystery card is dealt
  function drawMyst(t) {
    if (t < T.myst[0] || t > T.mystOut[1]) return
    const o = ease.inCubic(prog(t, ...T.mystOut))
    const p = prog(t, ...T.myst), e = ease.outCubic(p)
    const land = T.myst[1], sq = t > land ? 0.1 * Math.exp(-(t - land) * 6) * Math.cos((t - land) * 22) : 0
    const w = MYST.w, h = mystB ? w * mystB.height / mystB.width : w * 1.5
    const cx = lerp(1300, MYST.x, e), cy = lerp(-400, MYST.y, e) + 8 * Math.sin((t - land) * 1.8)
    const rot = (1 - e) * -400 + 1.5 * Math.sin((t - land) * 1.4)
    // aura halo behind
    const ha = clamp(prog(t, land - 0.1, land + 0.3)) * (1 - o)
    glow(x, MYST.x, MYST.y, 620 + 30 * Math.sin(t * 3), PINK, ha * 0.7)
    glow(x, MYST.x, MYST.y - 120, 460 + 30 * Math.sin(t * 2.3 + 1), PURPLE, ha * 0.8)
    // a halo of sign glyphs orbiting
    const gk = pop01(t, T.halo, 0.5, 1.6) * (1 - o)
    if (gk > 0) {
      x.save(); x.font = `bold 58px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
      SIGNS.forEach((S, i) => {
        const a = i * TAU / 12 + 0.25 * (t - T.halo) - Math.PI / 2
        const R = 500 * gk
        x.globalAlpha = clamp(gk) * 0.95; x.fillStyle = S.color; x.shadowColor = S.color; x.shadowBlur = 16
        x.fillText(S.glyph + '︎', MYST.x + Math.cos(a) * R * 0.86, MYST.y + Math.sin(a) * R * 1.02)
      })
      x.restore()
    }
    x.save(); x.translate(cx, cy + 300 * o); x.rotate(rot * D2R); x.scale((1 + sq) * (1 - 0.3 * o), (1 - sq) * (1 - 0.3 * o)); x.globalAlpha = 1 - o
    if (mystB) { x.shadowColor = rgba(PINK, 0.9); x.shadowBlur = 50; x.drawImage(mystB, -w / 2, -h / 2, w, h); x.shadowBlur = 0 }
    // a soft shimmer sweep across the veil
    const sw = prog(t, land + 0.2, land + 1.1)
    if (sw > 0 && sw < 1) {
      x.save(); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); x.clip(); x.globalCompositeOperation = 'lighter'
      const sx = lerp(-w, w, sw), g = x.createLinearGradient(sx - 120, 0, sx + 120, 0)
      g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,240,255,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)')
      x.fillStyle = g; x.rotate(-0.3); x.fillRect(-w * 1.5, -h, w * 3, h * 2); x.restore()
    }
    x.restore()
    sparkle(x, MYST.x, MYST.y, t, land, { n: 16, R: 480, seed: 60, size: 30, dur: 0.9 })
  }

  // ── 6 · let the cards decide: the balcony, two people, falling cards, a heart
  const CONF = (() => { const r = rng(77); return Array.from({ length: 11 }, (_, i) => ({ x: 60 + r() * 960, d: r() * 1.4, sp: 520 + r() * 260, rot: r() * 360, vr: (r() - 0.5) * 420, sway: 30 + r() * 50, s: 0.8 + r() * 0.5 })) })()
  function drawFinale(t) {
    if (t < T.bal5[0] || t > T.bal5Out[1]) return
    const a = 1 - ease.inCubic(prog(t, ...T.bal5Out))
    const bp = ease.outCubic(prog(t, ...T.bal5)), bk = pop01(t, T.bal5[0], 0.5, 1.5)
    const lean = ease.inOutCubic(prog(t, T.heart - 0.4, T.heart + 0.1))
    x.save(); x.translate(BAL5.x, BAL5.y + (1 - bp) * 600 + 80 * ease.inCubic(prog(t, ...T.bal5Out))); x.scale(lerp(0.92, 1, bk), lerp(0.92, 1, bk))
    balcony(x, t, {
      a, ground: true, lit: 1 + 0.4 * Math.exp(-Math.max(0, t - T.heart) * 3) * (t > T.heart ? 1 : 0),
      people: () => {
        const p1 = pop01(t, T.bal5[0] + 0.3, 0.4), p2 = pop01(t, T.bal5[0] + 0.42, 0.4)
        x.save(); x.translate(-130 + 30 * lean, -10); x.scale(p1, p1); standing(x, GOLD, 1, 5 * lean); x.restore()
        x.save(); x.translate(130 - 30 * lean, -10); x.scale(p2, p2); standing(x, PINK, 1, -5 * lean); x.restore()
      },
    })
    x.restore()
    // heart of pixel stars between them
    const hk = pop01(t, T.heart, 0.5, 2.2)
    if (hk > 0) {
      const cx = 540, hy = BAL5.y - 545 - 50 * ease.outCubic(prog(t, T.heart, T.heart + 1.4)), pulse = 1 + 0.06 * Math.sin((t - T.heart) * 8)
      x.save(); x.globalAlpha = a
      glow(x, cx, hy, 300 * hk, PINK, 0.5)
      for (let i = 0; i < 22; i++) {
        const th = Math.PI + (i / 22) * TAU
        const hx = 16 * Math.pow(Math.sin(th), 3), hyy = -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th))
        drawPixelStar(x, cx + hx * 8 * hk * pulse, hy + hyy * 8 * hk * pulse, i % 4 ? 20 : 28, i % 3, i % 2 ? GOLD : PINK)
      }
      x.restore()
      sparkle(x, cx, hy, t, T.heart, { n: 16, R: 380, seed: 70, size: 30, dur: 0.9 })
    }
    // card backs flutter down like confetti
    if (backB) {
      x.save()
      for (const c of CONF) {
        const tt = t - T.confetti - c.d
        if (tt < 0) continue
        const y = 440 + tt * c.sp
        if (y > H + 120) continue
        if (y < 560) continue
        x.save(); x.globalAlpha = a * 0.95 * clamp((y - 560) / 120); x.translate(c.x + c.sway * Math.sin(tt * 3 + c.rot), y); x.rotate((c.rot + c.vr * tt) * D2R)
        x.scale(c.s * Math.cos(tt * 4 + c.rot), c.s)
        x.drawImage(backB, -40, -61, 80, 122); x.restore()
      }
      x.restore()
    }
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.bal5Out[1]) { drawHook(t); drawLove(t); drawDeal(t); drawMyst(t); drawFinale(t) }
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

// ── sound (pitched SFX written in D major; the engine moves them into the score's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ...wordPops(T.h0, 5, 0.08, 0, 0.028), ['whoosh', T.bal, 0.5, 0.03], ['glitter', T.bal + 0.45, T.bal + 0.95],
  ['pop', T.tab + 0.15, 587.33, 0.05, 0], ['pop', T.tab + 0.35, 880, 0.04, -0.3], ['pop', T.tab + 0.43, 987.77, 0.04, 0], ['pop', T.tab + 0.51, 1174.66, 0.04, 0.3],
  ['pop', T.h0Late, 1174.66, 0.05, -0.1], ['pop', T.h0Late + 0.12, 1318.51, 0.05, 0.1], ['pluck', T.h0Late + 0.12, 1174.66, 0.05, 0.6, 0],
  ...T.flips.flatMap((tf, i) => [['whoosh', tf - 0.12, 0.22, 0.025], ['pluck', tf, [739.99, 880, 1174.66][i], 0.05, 0.5, (i - 1) * 0.4], ['tick', tf, 0.05]]),
  ['bell', T.flips[2] + 0.04, 1174.66, 0.04, 1.0, 0.3],
  // love's coming… who?
  ...wordPops(T.h1, 3, 0.08, 1, 0.026), ['pop', T.h1Late, 1174.66, 0.05, -0.1], ['pop', T.h1Late + 0.12, 1318.51, 0.05, 0.1],
  ['whoosh', T.fly[0], 0.6, 0.04], ['glitter', T.fly[1], T.fly[1] + 0.7], ['bell', T.fly[1], 1760, 0.04, 1.2, 0],
  ...wordPops(T.s1, 3, 0.08, 3, 0.024), ['whoosh', T.who - 0.15, 0.3, 0.035], ['pluck', T.who + 0.05, 440, 0.05, 0.5, 0],
  ['whoosh', T.s1Late, 0.34, 0.035], ['boom', T.s1Late + 0.34, 0.1], ['tick', T.s1Late + 0.34, 0.07],
  ...[880, 783.99, 659.25].map((f, i) => ['pluck', +(T.s1Late + 0.5 + i * 0.12).toFixed(3), f, 0.03, 0.3, -0.2 + i * 0.2]),
  // align reads your chart
  ['riser', T.burst - 0.8, T.burst, 0.035], ['glitter', T.burst, T.burst + 0.8], ['bell', T.wheel[0] + 0.3, 880, 0.05, 1.4, 0],
  ...wordPops(T.h2, 3, 0.09, 0, 0.028), ['pop', T.h2Late, 1318.51, 0.05, 0], ['pluck', T.h2Late, 1174.66, 0.045, 0.6, 0],
  ...wordPops(T.s2, 4, 0.08, 2, 0.022), ['pop', T.s2 + 0.4, 1318.51, 0.04, 0],
  ...T.deals.flatMap((td, i) => [['whoosh', td - 0.3, 0.32, 0.035], ['tick', td + 0.05, 0.06], ['pop', td + 0.05, [739.99, 880, 987.77][i], 0.045, (i - 1) * 0.5]]),
  // talk cards
  ...wordPops(T.h3, 2, 0.09, 1, 0.028), ['pop', T.h3Late, 1174.66, 0.05, -0.1], ['pop', T.h3Late + 0.12, 1318.51, 0.05, 0.1],
  ...T.tflips.flatMap((tf, i) => [['whoosh', tf - 0.14, 0.22, 0.03], ['pluck', tf + 0.02, [880, 987.77, 1174.66][i], 0.05, 0.6, (i - 1) * 0.5], ['glitter', tf + 0.02, tf + 0.4]]),
  ['whoosh', T.fanOut[0], 0.45, 0.03],
  // chart first, face last
  ['whoosh', T.myst[0], 0.5, 0.045], ['boom', T.myst[1], 0.12], ['bell', T.myst[1] + 0.02, 1174.66, 0.05, 1.4, 0], ['glitter', T.myst[1], T.myst[1] + 0.9],
  ['pop', T.h4 + 0.2, 880, 0.04, -0.1], ['pop', T.h4 + 0.32, 1174.66, 0.05, 0.1], ['pop', T.h4b, 987.77, 0.04, -0.1], ['pop', T.h4b + 0.1, 1318.51, 0.05, 0.1],
  ...SIGNS.slice(0, 6).map((_, i) => ['pop', +(T.halo + i * 0.06).toFixed(3), NOTE[i], 0.022, (i - 2.5) * 0.15]),
  // let the cards decide
  ['whoosh', T.bal5[0], 0.5, 0.035], ...wordPops(T.h5, 3, 0.09, 1, 0.028),
  ['whoosh', T.h5Late, 0.34, 0.035], ['boom', T.h5Late + 0.34, 0.09], ['tick', T.h5Late + 0.34, 0.06],
  ['glitter', T.confetti, T.confetti + 1.4], ['bell', T.heart, 1760, 0.055, 1.4, -0.1], ['bell', T.heart + 0.03, 2349.32, 0.035, 1.4, 0.1],
]
