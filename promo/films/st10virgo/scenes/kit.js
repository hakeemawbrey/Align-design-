// st10virgo kit: Virgo's props (the crayon row, the label maker, the paint jar, the spill that becomes a galaxy). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { easeOutBack } from '../../wheel.js'

const INK = '#1b1236'
const r3 = v => +v.toFixed(3)

const R = Math.round
const RAINBOW = ['#ff5a5a', '#ff9a3a', '#ffd23a', '#7ad04a', '#3ab0ff', '#5a6aff', '#a35cf0', '#ff7ac8']

// one standing pixel crayon, base centre (cx, by)
function crayon(x, cx, by, col, { rot = 0, s = 1 } = {}) {
  const c = 6 * s
  x.save(); x.translate(R(cx), R(by)); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-4 * c, -17 * c, 8 * c, 17 * c); x.fillRect(-3 * c, -20 * c, 6 * c, 3 * c); x.fillRect(-1.5 * c, -22 * c, 3 * c, 2 * c)
  x.fillStyle = col; x.fillRect(-3 * c, -16 * c, 6 * c, 15 * c); x.fillRect(-2 * c, -19 * c, 4 * c, 3 * c); x.fillRect(-0.5 * c, -21 * c, 1 * c, 2 * c)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-2 * c, -15 * c, 1 * c, 13 * c)
  x.fillStyle = 'rgba(27,18,54,0.35)'; x.fillRect(-3 * c, -11 * c, 6 * c, 1 * c); x.fillRect(-3 * c, -5 * c, 6 * c, 1 * c)
  x.restore()
}

// label-maker strip: white tape, black Space Mono caps
export function labelStrip(x, cx, cy, text, { size = 16, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.font = `700 ${size}px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const w = x.measureText(text).width + size
  x.fillStyle = INK; x.fillRect(R(-w / 2 - 2), R(-size * 0.75 - 2), R(w + 4), R(size * 1.5 + 4))
  x.fillStyle = '#fbfbf6'; x.fillRect(R(-w / 2), R(-size * 0.75), R(w), R(size * 1.5))
  x.fillStyle = INK; x.fillText(text, 0, 1)
  x.restore()
}

// the nursery crayon row: seven in a perfect rainbow, the eighth travelling from Virgo's hand into its slot by placeAt;
// the crayon box (labelled) at the end of the row
export function crayonRow(x, t, { y = 1470, placeAt = 2.2, hand = [700, 1280] } = {}) {
  const X0 = 190, DX = 76
  for (let i = 0; i < 7; i++) crayon(x, X0 + i * DX, y, RAINBOW[i])
  const k = ease.inOutCubic(prog(t, placeAt - 0.8, placeAt))
  const hx = lerp(hand[0], X0 + 7 * DX, k), hy = lerp(hand[1], y, k) - 30 * Math.sin(Math.PI * k)
  crayon(x, hx, hy, RAINBOW[7], { rot: lerp(0.5, 0, k) })
  if (t > placeAt && t < placeAt + 0.6) { const p = prog(t, placeAt, placeAt + 0.6); for (let i = 0; i < 5; i++) drawPixelStar(x, X0 + 7 * DX + Math.cos(i * 1.26) * 70 * p, y - 70 + Math.sin(i * 1.26) * 70 * p, 10 * (1 - p) + 2, i % 2, '#ffd23a', '#fff6d0') }
  // the box
  x.save(); x.translate(860, y); x.rotate(0.05)
  x.fillStyle = INK; x.fillRect(-58, -96, 116, 96); x.fillStyle = '#ffd23a'; x.fillRect(-52, -90, 104, 84)
  x.fillStyle = '#7ad04a'; x.fillRect(-52, -90, 104, 22)
  x.restore()
  labelStrip(x, 862, y - 40, 'LABELED BY VIRGO', { size: 11, rot: 0.05 })
}

// Pisces's jar of blue paint with a brush in it; it tips toward Virgo's desk from tipAt and pours a puddle
export function paintJar(x, t, { x: cx, y: by, tipAt }) {
  const k = ease.outCubic(prog(t, tipAt + 0.1, tipAt + 0.9))
  const wob = t > tipAt - 0.1 && t < tipAt + 0.1 ? Math.sin(t * 60) * 0.1 : 0
  // the puddle running left along the desks
  if (k > 0.3) {
    const p = prog(t, tipAt + 0.6, tipAt + 2.2)
    x.save(); x.fillStyle = '#3b6fd8'
    x.beginPath(); x.ellipse(cx - 60 - 160 * p, by + 4, 40 + 200 * p, 12 + 8 * p, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#7fa8ff'; x.fillRect(R(cx - 120 - 160 * p), by - 6, R(60 + 80 * p), 5)
    x.restore()
  }
  x.save(); x.translate(R(cx), R(by)); x.rotate(-1.5 * k + wob)
  x.fillStyle = INK; x.fillRect(-34, -84, 68, 84)
  x.fillStyle = 'rgba(220,235,255,0.9)'; x.fillRect(-28, -78, 56, 72)
  x.fillStyle = '#3b6fd8'; x.fillRect(-28, -50, 56, 44)
  x.fillStyle = '#c4572f'; x.fillRect(4, -140, 8, 92); x.fillStyle = INK; x.fillRect(2, -152, 12, 14)
  x.restore()
  if (k > 0 && k < 1) { x.save(); x.fillStyle = '#3b6fd8'; for (let i = 0; i < 4; i++) x.fillRect(R(cx - 70 - i * 18), R(by - 40 + i * 10 + 10 * Math.sin(t * 20 + i)), 12, 12); x.restore() }
}

// Pisces's thought bubble: Fish, its imaginary friend (S10 E12)
export function thoughtFish(x, t, cx, cy) {
  x.save()
  x.fillStyle = 'rgba(251,244,230,0.92)'
  x.beginPath(); x.arc(cx - 70, cy + 120, 10, 0, 7); x.fill(); x.beginPath(); x.arc(cx - 50, cy + 90, 16, 0, 7); x.fill()
  x.beginPath(); x.ellipse(cx, cy, 120, 74, 0, 0, Math.PI * 2); x.fill()
  const fx = cx + 14 * Math.sin(t * 1.6), fy = cy - 6 + 6 * Math.sin(t * 2.3)
  x.fillStyle = '#7c74f0'; x.fillRect(R(fx - 44), R(fy - 22), 64, 44); x.fillRect(R(fx + 20), R(fy - 14), 12, 28)
  x.beginPath(); x.moveTo(fx - 44, fy); x.lineTo(fx - 76, fy - 28); x.lineTo(fx - 76, fy + 28); x.closePath(); x.fill()
  x.fillStyle = '#fff'; x.fillRect(R(fx + 6), R(fy - 12), 12, 12); x.fillStyle = INK; x.fillRect(R(fx + 10), R(fy - 8), 6, 6)
  x.fillStyle = INK; x.font = "700 18px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillText('FISH', cx, cy + 58)
  x.restore()
}

// the galaxy's two arms (log spiral) around (cx, cy); turn = how wound
function arms(cx, cy, turn, n = 28) {
  const out = []
  for (const s of [0, Math.PI]) {
    const a = []
    for (let i = 0; i < n; i++) { const u = i / (n - 1), th = s + u * (2.4 + turn), r = 30 + u * 300; a.push([cx + Math.cos(th) * r, cy + Math.sin(th) * r * 0.78]) }
    out.push(a)
  }
  return out
}
// the stars Virgo dots along the arms (fixed positions)
const DOTS = (() => { const A = arms(560, 980, 1.2); const d = []; for (let i = 0; i < 14; i++) { const arm = A[i % 2], p = arm[4 + Math.floor(i / 2) * 3]; d.push(p) } return d })()

// the paper, close up (canonical coords: the sheet centred on 540, 1000). mode: 'grid' | 'spill' | 'swirl' | 'dots' | 'final'
function paper(x, t, { mode, gridAt = 0, spillAt = 0, swirlAt = 0, dotsAt = 0, signAt = 0 }) {
  const fin = mode === 'final'
  x.save(); x.translate(540, 1000); x.rotate(-0.02); x.translate(-540, -1000)
  x.fillStyle = INK; x.fillRect(92, 392, 896, 1216)
  x.fillStyle = '#fbf8f0'; x.fillRect(100, 400, 880, 1200)
  x.fillStyle = 'rgba(120,150,220,0.18)'; for (let i = 0; i < 22; i++) x.fillRect(100, 450 + i * 52, 880, 2)
  // the ruled grid of stars, each labelled
  const N = 16
  for (let i = 0; i < N; i++) {
    const k = fin ? 1 : easeOutBack(clamp(prog(t, gridAt + i * 0.25, gridAt + i * 0.25 + 0.25)), 2)
    if (k <= 0) continue
    const gx = 260 + (i % 4) * 187, gy = 620 + Math.floor(i / 4) * 230
    x.save(); x.translate(gx, gy); x.scale(k, k)
    drawPixelStar(x, 0, 0, 64, 0, '#3a2a5a', '#7a6a9a')
    x.restore()
    if (k > 0.8) labelStrip(x, gx, gy + 78, 'STAR ' + String(i + 1).padStart(2, '0'), { size: 14 })
  }
  // the pencil ruler line
  x.fillStyle = 'rgba(58,42,90,0.4)'; for (let r = 0; r < 4; r++) x.fillRect(200, 690 + r * 230, 680, 2)
  // the spill
  const sp = fin || mode !== 'grid' ? (fin ? 1 : ease.outCubic(prog(t, spillAt, spillAt + 1.6))) : 0
  if (sp > 0) {
    x.save(); x.beginPath(); x.rect(100, 400, 880, 1200); x.clip()
    const blobs = [[900, 520, 260], [760, 760, 300], [560, 980, 360], [400, 1180, 280], [700, 1220, 260], [320, 820, 220], [600, 620, 220]]
    blobs.forEach(([bx, by, br], i) => {
      const kk = clamp(sp * 1.6 - i * 0.12)
      if (kk <= 0) return
      const wob = 1 + 0.03 * Math.sin(t * 3 + i)
      x.fillStyle = '#2f5fcf'; x.beginPath(); x.ellipse(lerp(980, bx, kk), lerp(400, by, kk), br * kk * wob, br * 0.86 * kk * wob, i, 0, Math.PI * 2); x.fill()
    })
    x.fillStyle = 'rgba(20,30,90,0.35)'; x.beginPath(); x.ellipse(560, 980, 320 * sp, 260 * sp, 0, 0, Math.PI * 2); x.fill()
    // the swirl: two bright arms wound in by Pisces's brush
    const sw = fin ? 1 : mode === 'swirl' || mode === 'dots' ? ease.inOutCubic(prog(t, swirlAt, swirlAt + 2.2)) : 0
    if (sw > 0) {
      const A = arms(560, 980, 1.2 * sw)
      x.save(); x.globalAlpha = sw; x.lineCap = 'round'; x.lineJoin = 'round'
      for (const arm of A) {
        x.strokeStyle = 'rgba(160,200,255,0.75)'; x.lineWidth = 46; x.beginPath(); arm.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
        x.strokeStyle = 'rgba(236,244,255,0.9)'; x.lineWidth = 14; x.beginPath(); arm.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
      }
      const g = x.createRadialGradient(560, 980, 0, 560, 980, 120); g.addColorStop(0, 'rgba(255,250,230,0.95)'); g.addColorStop(1, 'rgba(255,250,230,0)')
      x.fillStyle = g; x.fillRect(440, 860, 240, 240)
      x.restore()
    }
    x.restore()
  }
  // Virgo's tiny precise stars along the arms
  if (fin || mode === 'dots') DOTS.forEach(([a, b], i) => {
    const k = fin ? 1 : easeOutBack(clamp(prog(t, dotsAt + 0.3 + i * 0.22, dotsAt + 0.5 + i * 0.22)), 2.2)
    if (k <= 0) return
    drawPixelStar(x, a, b, (34 + 5 * Math.sin(t * 4 + i)) * k, i % 2, '#ffd36e', '#fffbe8')
  })
  // the signatures
  const sg = fin ? 1 : mode === 'dots' ? easeOutBack(clamp(prog(t, signAt, signAt + 0.35)), 2) : 0
  if (sg > 0) {
    x.save(); x.translate(820, 1520); x.scale(sg, sg); x.rotate(-0.06)
    x.font = "800 54px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = '#ef5c94'; x.fillText('♍', -64, 0); x.fillStyle = INK; x.fillText('+', 0, 0); x.fillStyle = '#7c74f0'; x.fillText('♓', 64, 0)
    x.restore()
  }
  x.restore()
}

// the close-up insert: the art table under the paper, plus whichever stage the picture is at
export function paperInsert(x, t, opts) {
  x.fillStyle = '#b97a4e'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#a86a40'; for (let i = 0; i < 12; i++) x.fillRect(0, 120 + i * 160, 1080, 6)
  paper(x, t, opts)
  // the ruler (the grid stage) and the brush (the swirl / dots stages)
  if (opts.mode === 'grid') {
    x.save(); x.translate(160, 1660); x.rotate(-0.05)
    x.fillStyle = INK; x.fillRect(0, 0, 780, 70); x.fillStyle = '#ffd23a'; x.fillRect(6, 6, 768, 58)
    x.fillStyle = INK; for (let i = 0; i < 39; i++) x.fillRect(12 + i * 20, 6, 3, i % 5 ? 16 : 30)
    x.restore()
  } else if (opts.mode === 'swirl' || opts.mode === 'dots') {
    const fine = opts.mode === 'dots'
    let bx, by
    if (fine) { const i = clamp(Math.floor((t - opts.dotsAt - 0.3) / 0.22), 0, DOTS.length - 1); [bx, by] = DOTS[i]; by -= 8 * Math.abs(Math.sin(t * 14)) }
    else { const p = prog(t, opts.swirlAt, opts.swirlAt + 2.2), th = p * 8; bx = 560 + Math.cos(th) * (60 + 220 * p); by = 980 + Math.sin(th) * (50 + 170 * p) }
    x.save(); x.translate(bx, by); x.rotate(-0.7)
    x.fillStyle = INK; x.fillRect(-7, -330, 14, 300); x.fillStyle = fine ? '#ef5c94' : '#7c74f0'; x.fillRect(-4, -326, 8, 292)
    x.fillStyle = '#c9c4d8'; x.fillRect(-8, -40, 16, 22)
    x.fillStyle = fine ? '#ffd36e' : '#3b6fd8'; x.fillRect(fine ? -3 : -8, -18, fine ? 6 : 16, fine ? 18 : 22)
    x.restore()
  }
}

// the finished painting pinned in the hall: s = scale, a gold star sticker and the FIRST COLLAB ribbon pop in at pinAt
export function painting(x, t, { x: cx, y: cy, s = 0.6, pinAt = 0 }) {
  const k = easeOutBack(clamp(prog(t, pinAt, pinAt + 0.4)), 1.6)
  x.save(); x.translate(cx, cy); x.scale(s * k, s * k); x.translate(-540, -1000)
  x.fillStyle = '#c4572f'; x.fillRect(70, 370, 940, 1260)
  paper(x, t, { mode: 'final' })
  x.restore()
  const sk = easeOutBack(clamp(prog(t, pinAt + 0.5, pinAt + 0.8)), 2.4)
  if (sk > 0) {
    x.save(); x.translate(cx + 250 * s, cy - 340 * s); x.scale(sk, sk); x.rotate(0.2)
    drawPixelStar(x, 0, 0, 46, 0, '#f2c75c', '#fff6d0')
    x.restore()
    x.save(); x.translate(cx, cy + 420 * s); x.scale(sk, sk)
    x.fillStyle = INK; x.fillRect(-170, -30, 340, 60); x.fillStyle = '#f2c75c'; x.fillRect(-164, -24, 328, 48)
    x.fillStyle = INK; x.font = "700 28px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('★ FIRST COLLAB', 0, 2)
    x.restore()
  }
}

// paint on their joined hands: a blue print and a pink print where the two stars' arms touch
export function handprints(x, t, cx, cy, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  for (const [dx, col] of [[-22, '#3b6fd8'], [22, '#ef5c94']]) {
    x.fillStyle = col
    x.fillRect(R(cx + dx - 14), R(cy - 12), 28, 24)
    for (let f = 0; f < 4; f++) x.fillRect(R(cx + dx - 14 + f * 8), R(cy - 24), 5, 12)
  }
  x.restore()
}
