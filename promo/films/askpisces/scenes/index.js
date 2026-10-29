// askpisces (30 s vertical Align ad, Star Talk season 1 extra "Ask the Stars") · story 0–25.6, then the shared end card.
//   0.00       A DM lands: "How do I get over *someone*?" Below, in a dim pixel room, the ♓ star sniffles beside a box of
//              tissues, a tear rolling, a little radio playing a sad song (slow blue notes), the window shut on the night.
//   2.82 drop  ♓ PISCES STAR: "feel it. cry if you need to. really."  Tissue after tissue pops out; a small pile grows.
//              The REAL ASTROLOGY chip: mutable water, Jupiter (traditional) and Neptune (modern).
//   6.40       "then unfollow. it's not mean. it's mercy."  A phone floats up: FOLLOWING → FOLLOW. It drifts off.
//   10.0       "tell a friend. go outside. drink water."  A chat bubble, a little sun, a glass of water pop in turn.
//   13.6       "one day you'll notice you didn't think of them."  The sunrise: the star opens the window, warm light floods
//              in, the radio's notes turn gold, and it hands you the last tissue (it floats up to camera).
//   17.2       The box shuts, the DM slides away: "Know your | *dealbreakers.*" A card drops; a DEALBREAKERS stamp thunks on.
//   20.55 cut  "Feel it. | Then *let it go.*"  At the open window in the sunrise, the last tissue folds into a paper bird and
//              flies out into the morning; a heart.
// One canvas (sky + room + star + props), DOM type above it. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { askFilm, BEAT, GOLD, BONE, INK, MONO, PINK, sparkles } from './ask.js'

const PIS = signStar('pisces')
const ACC = '#a9a3ff'
const SPEAK = '♓ PISCES STAR'
const T = {
  open: 2.62, l1: BEAT(4) + 0.02, tissues: [3.4, 4.2, 5.0, 5.7],
  l2: 6.4, phone: [6.9, 7.25], unf: 8.0, phoneOut: [9.3, 9.7],
  l3: 10.0, icons: [10.45, 11.25, 12.05], sip: 12.4,
  l4: 13.6, window: [13.9, 14.5], sun: [14.0, 16.0], hand: [15.1, 16.0],
  close: 16.95, dmOut: [16.8, 17.08],
  tie: 17.2, stamp: 18.05, tieChip: 18.4, tieOut: [20.3, 20.52],
  cut: 20.55, last: 20.62, lastLand: 21.05, bird: [22.0, 24.2], heart: 23.2, out: [25.15, 25.45],
}
const LINES = [
  { t: T.l1, text: 'feel it. cry if you need to. *really.*' },
  { t: T.l2, text: "then unfollow. it's not mean. *it's mercy.*" },
  { t: T.l3, text: 'tell a friend. go outside. *drink water.*' },
  { t: T.l4, text: "one day you'll notice you *didn't think of them.*" },
]
const HOPS = [...talkHops(LINES.map(l => ({ ...l, speaker: SPEAK })), SPEAK, { cps: 30 }).filter(h => h > T.l2), T.sip, T.window[0], T.lastLand, T.heart]
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const TEAR = ['.X.', 'XWX', 'XXX', '.X.']
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
const BIRD = ['W.....W', 'WW...WW', '.WWWWW.', '..WWW..', '...W...']
const BUBBLE = ['BBBBBBB', 'BKBKBKB', 'BBBBBBB', '.B.....']
const SUN = ['..Y.Y..', '.YYYYY.', 'YYYYYYY', '.YYYYY.', '..Y.Y..']
const GLASS = ['G.....G', 'GWWWWWG', 'GWBBBWG', 'GBBBBBG', '.GBBBG.', '.GGGGG.']

const sunK = t => ease.inOutCubic(prog(t, ...T.sun))

function pisState(t) {
  if (t < T.l1) return { mood: 'sparkle', look: [0, 1], blink: false }        // teary
  if (t < T.l2) return { mood: 'sparkle', look: [-1, 1] }
  if (t < T.unf) return { mood: 'neutral', look: [1, -1] }
  if (t < T.l3) return { mood: 'squint' }
  if (t < T.l4) return { mood: 'happy' }
  if (t < T.window[1]) return { mood: 'neutral', look: [0, -1] }
  if (t < T.cut) return { mood: 'happy' }
  if (t < T.heart) return { mood: 'happy', look: [0, -1] }
  return { mood: 'heart' }
}

function drawRoom(x, t, K, vis) {
  const sk = sunK(t)
  // the window: night → dawn inside the frame; panes swing open on "one day"
  const WX = 540, WY = 760, WW = 380, WH = 320
  x.save(); x.globalAlpha = vis
  const g = x.createLinearGradient(0, WY - WH / 2, 0, WY + WH / 2)
  g.addColorStop(0, lerpC('#0d1238', '#ff9a6a', sk)); g.addColorStop(1, lerpC('#1b1650', '#ffd27a', sk))
  x.fillStyle = INK; x.fillRect(WX - WW / 2 - 16, WY - WH / 2 - 16, WW + 32, WH + 32)
  x.fillStyle = g; x.fillRect(WX - WW / 2, WY - WH / 2, WW, WH)
  // night stars / the rising sun
  if (sk < 1) { x.fillStyle = `rgba(255,255,255,${0.8 * (1 - sk)})`; for (let i = 0; i < 8; i++) x.fillRect(WX - 160 + ((i * 97) % 320), WY - 130 + ((i * 53) % 180), 5, 5) }
  if (sk > 0) {
    const sy = lerp(WY + WH / 2 + 60, WY + 30, sk)
    x.save(); x.beginPath(); x.rect(WX - WW / 2, WY - WH / 2, WW, WH); x.clip()
    x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(WX, sy, 70, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,241,176,0.35)'; x.beginPath(); x.arc(WX, sy, 110, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#e07a5a'; x.fillRect(WX - WW / 2, WY + WH / 2 - 40, WW, 40)            // far hills
    x.restore()
  }
  // panes: closed (two halves + cross bar) → swing open (shrink toward the sides)
  const op = ease.outBack(prog(t, ...T.window))
  const pw = lerp(WW / 2, 26, op)
  for (const s of [-1, 1]) {
    const px = s < 0 ? WX - WW / 2 : WX + WW / 2 - pw
    x.fillStyle = `rgba(120,140,200,${0.18 * (1 - op)})`; x.fillRect(px, WY - WH / 2, pw, WH)
    x.fillStyle = '#c9b48a'; x.fillRect(s < 0 ? px + pw - 10 : px, WY - WH / 2, 10, WH)
    x.fillRect(px, WY - 5, pw, 10)
  }
  x.fillStyle = '#c9b48a'; x.fillRect(WX - WW / 2 - 30, WY + WH / 2 + 10, WW + 60, 18)      // sill
  x.restore()
  // warm light spilling in
  if (sk > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.5 * sk * vis
    const lg = x.createLinearGradient(0, WY, 0, 1500); lg.addColorStop(0, 'rgba(255,200,120,0.5)'); lg.addColorStop(1, 'rgba(255,200,120,0)')
    x.fillStyle = lg; x.beginPath(); x.moveTo(WX - WW / 2, WY + WH / 2); x.lineTo(WX + WW / 2, WY + WH / 2); x.lineTo(WX + 420, 1500); x.lineTo(WX - 420, 1500); x.closePath(); x.fill()
    x.restore()
  }
}
function lerpC(a, b, k) {
  const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), A = h(a), B = h(b)
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], k)).toString(16).padStart(2, '0')).join('')
}

function tissueBox(x, t, cx, cy, vis) {
  x.save(); x.globalAlpha = vis; x.translate(cx, cy)
  x.fillStyle = INK; x.fillRect(-90, -50, 180, 100)
  x.fillStyle = '#7fb8e6'; x.fillRect(-82, -42, 164, 84)
  x.fillStyle = '#b7dcf7'; for (let i = 0; i < 4; i++) x.fillRect(-70 + i * 40, -30, 18, 18)
  x.fillStyle = INK; x.fillRect(-36, -50, 72, 10)
  // the tissue peeking out (pops up on each pull)
  let up = 0
  for (const tp of T.tissues) if (t >= tp && t < tp + 0.5) up = Math.sin(Math.PI * (t - tp) / 0.5)
  x.fillStyle = INK; x.fillRect(-30, -96 - up * 30, 60, 52 + up * 30)
  x.fillStyle = '#ffffff'; x.fillRect(-24, -90 - up * 30, 48, 44 + up * 30)
  x.fillStyle = '#e6e6f2'; x.fillRect(-24, -90 - up * 30, 12, 12)
  x.restore()
}

function radio(x, t, cx, cy, vis) {
  x.save(); x.globalAlpha = vis; x.translate(cx, cy)
  x.fillStyle = INK; x.fillRect(-90, -60, 180, 120); x.fillRect(30, -110, 8, 54)
  x.fillStyle = '#c98a4e'; x.fillRect(-82, -52, 164, 104)
  x.fillStyle = '#7a4a2a'; for (let j = 0; j < 4; j++) x.fillRect(-70, -38 + j * 20, 80, 8)
  x.fillStyle = GOLD; x.beginPath(); x.arc(50, 0, 22, 0, Math.PI * 2); x.fill()
  x.restore()
  // notes: slow blue (sad) → bouncy gold (after sunrise)
  const sk = sunK(t)
  for (let i = 0; i < 4; i++) {
    const sp = sk > 0.5 ? 0.6 : 0.3, ph = ((t * sp + i * 0.25) % 1 + 1) % 1
    const nx = cx + 20 + Math.sin(ph * 6 + i) * (sk > 0.5 ? 50 : 20), ny = cy - 80 - ph * 240
    drawNote(x, nx, ny, sk > 0.5 ? GOLD : '#7fa8ff', Math.sin(Math.PI * ph) * vis, sk > 0.5 ? Math.sin(t * 8 + i) * 0.3 : 0)
  }
}
function drawNote(x, cx, cy, col, a, rot) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(cx, cy); x.rotate(rot)
  NOTE.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { x.fillStyle = col; x.fillRect((i - 2) * 9, (j - 3) * 9, 9, 9) } }))
  x.restore()
}

function phone(x, t, K) {
  if (t < T.phone[0] || t > T.phoneOut[1]) return
  const pin = K.pop01(t, T.phone[0], 0.35, 2), o = ease.inCubic(prog(t, ...T.phoneOut))
  const cx = 800 + o * 300, cy = 900 - o * 200
  x.save(); x.globalAlpha = 1 - o; x.translate(cx, cy); x.rotate(0.06 + o * 0.4); x.scale(pin, pin)
  x.fillStyle = INK; x.fillRect(-120, -190, 240, 380)
  x.fillStyle = '#d9b25a'; x.fillRect(-112, -182, 224, 364)
  x.fillStyle = '#2b1c55'; x.fillRect(-100, -160, 200, 320)
  // a blurred-out profile (no face: just a soft circle) + the button
  x.fillStyle = '#4a3a80'; x.beginPath(); x.arc(0, -70, 50, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(-60, -6, 120, 12); x.fillRect(-44, 16, 88, 10)
  const flipped = t >= T.unf
  const k = flipped ? K.pop01(t, T.unf, 0.3, 2.6) : 1
  x.save(); x.translate(0, 80); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-86, -30, 172, 60)
  x.fillStyle = flipped ? '#5fb3ff' : '#6a6a80'; x.fillRect(-80, -24, 160, 48)
  x.fillStyle = BONE; x.font = `700 ${flipped ? 30 : 24}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(flipped ? 'FOLLOW' : 'FOLLOWING', 0, 2)
  x.restore()
  x.restore()
  sparkles(x, t, cx, cy + 80, T.unf + 0.05, 8, 120, 0.3, [BONE, ACC, GOLD])
}

function drawStage(x, t, K) {
  const out = K.popOut(t, T.out)
  if (out <= 0) return
  const last = t >= T.cut
  const tieHide = !last && t >= T.tie - 0.12 ? ease.inOutCubic(prog(t, T.tie - 0.12, T.tie + 0.2)) : 0
  const vis = out * (1 - tieHide)
  if (vis <= 0.01) return
  // dim room tint early; warms with the sun
  const sk = sunK(t)
  x.save(); x.fillStyle = `rgba(8,6,28,${0.32 * (1 - sk) * vis})`; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = `rgba(255,150,90,${0.1 * sk * vis})`; x.fillRect(0, 0, 1080, 1920); x.restore()
  drawRoom(x, t, K, vis)
  // floor line
  x.save(); x.globalAlpha = vis; x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(80, 1262, 920, 6); x.restore()
  if (!last) {
    tissueBox(x, t, 230, 1210, vis)
    // the pile of used tissues grows
    const n = T.tissues.filter(v => t > v + 0.4).length
    for (let i = 0; i < n; i++) { x.save(); x.globalAlpha = vis; x.fillStyle = INK; x.fillRect(110 + i * 34 - 4, 1226 - (i % 2) * 18 - 4, 44, 36); x.fillStyle = '#ffffff'; x.fillRect(110 + i * 34, 1226 - (i % 2) * 18, 36, 28); x.restore() }
  }
  radio(x, t, 860, 1200, vis)
  // the star (rises a little toward the window on "one day")
  const toWin = ease.inOutCubic(prog(t, T.window[0] - 0.4, T.window[0]))
  const P = last ? { x: 540, y: 1110, size: 300 } : { x: 540, y: lerp(1120, 1080, toWin), size: 300 }
  const sniff = t < T.l2 && (t % 1.6) < 0.2 ? 0.06 : 0
  const opts = { color: PIS.color, glyph: PIS.glyph, ...pisState(t), hops: HOPS, seed: 7, glow: 1.15 + 0.3 * sk, pop: vis, squash: sniff }
  const r = drawStarChar(x, P.x, P.y, P.size, t, opts)
  // tears (before line 3)
  if (t < T.l3) for (let i = 0; i < 2; i++) {
    const ph = ((t * 0.7 + i * 0.5) % 1 + 1) % 1
    K.drawBits(x, TEAR, { X: '#7fd0ff', W: '#ffffff' }, r.x + (i ? 52 : -52), r.y + 10 + ph * 110, 7, { alpha: Math.sin(Math.PI * ph) * vis })
  }
  phone(x, t, K)
  // line 3: friend · outside · water
  if (!last && t >= T.icons[0] && t < T.l4 + 0.4) {
    const o = 1 - prog(t, T.l4, T.l4 + 0.35)
    const set = [[BUBBLE, { B: BONE, K: INK }, 300], [SUN, { Y: '#ffd24a' }, 540], [GLASS, { G: '#cfe8ff', W: '#ffffff', B: '#5fb3ff' }, 780]]
    set.forEach(([bm, c, ix], i) => { const k = K.pop01(t, T.icons[i], 0.32, 2.6) * o; if (k > 0.01) K.drawBits(x, bm, c, ix, 560 + 380, 15 * k * vis) })
    sparkles(x, t, 780, 940, T.sip, 8, 90, 0.2, ['#5fb3ff', BONE, GOLD])
  }
  // the last tissue: handed to you (floats up to camera), then in the last beat it folds into a bird and flies out
  if (!last && t >= T.hand[0]) {
    const p = ease.inOutCubic(prog(t, ...T.hand)), s = lerp(1, 3.2, p)
    const cx = lerp(r.x + 120, 640, p), cy = lerp(r.y, 1180, p)
    const fade = 1 - prog(t, T.close - 0.3, T.close)
    x.save(); x.globalAlpha = vis * fade; x.translate(cx, cy); x.rotate(-0.1 + Math.sin(t * 2) * 0.05); x.scale(s, s)
    x.fillStyle = INK; x.fillRect(-34, -30, 68, 60); x.fillStyle = '#ffffff'; x.fillRect(-28, -24, 56, 48); x.fillStyle = '#e6e6f2'; x.fillRect(-28, -24, 14, 14)
    x.restore()
  }
  if (last) {
    const bp = prog(t, ...T.bird)
    if (bp <= 0) {
      const k = K.pop01(t, T.cut + 0.05, 0.3, 2)
      x.save(); x.translate(r.x + 150, r.y - 40); x.scale(k, k); x.fillStyle = INK; x.fillRect(-34, -30, 68, 60); x.fillStyle = '#ffffff'; x.fillRect(-28, -24, 56, 48); x.restore()
    } else if (bp < 1) {
      const fx = lerp(r.x + 150, 540, ease.inOutQuad(bp)) + Math.sin(bp * 9) * 30, fy = lerp(r.y - 40, 720, ease.inOutQuad(bp)) - Math.sin(Math.PI * bp) * 120
      const flap = Math.floor(t * 8) % 2 ? BIRD : ['.......', 'W.....W', '.WWWWW.', '..WWW..', '...W...']
      K.drawBits(x, flap, { W: '#ffffff' }, fx, fy, lerp(12, 4, bp), { alpha: bp > 0.85 ? (1 - bp) / 0.15 : 1 })
    }
    if (t > T.bird[0] && t < T.bird[0] + 0.7) sparkles(x, t, r.x + 150, r.y - 40, T.bird[0], 8, 90, 0.3, [BONE, GOLD, PINK])
    if (t > T.heart) for (let i = 0; i < 3; i++) { const b = T.heart + i * 0.4, p = prog(t, b, b + 1.2); if (p > 0 && p < 1) K.drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 540 + (i - 1) * 130, 960 - p * 160, 8, { alpha: Math.sin(Math.PI * p) }) }
  }
  sparkles(x, t, 540, 760, T.window[1], 12, 260, 0.2, [GOLD, '#ffb38a', BONE])
}

// ── the tie-in: a card drops; a DEALBREAKERS stamp thunks onto it
function drawTie(x, t, K) {
  if (t < T.tie || t >= T.cut) return
  const im = K.img('card-back.png')
  if (!im) return
  const pin = K.pop01(t, T.tie, 0.42, 1.8), o = ease.inCubic(prog(t, ...T.tieOut))
  const h = 720, w = h * im.width / im.height, cx = 540, cy = 920 + (1 - pin) * 500 + o * 900
  x.save(); x.globalAlpha = clamp(pin * 1.6) * (1 - o); x.translate(cx, cy); x.rotate(-0.04 + o * 0.4)
  const gl = x.createRadialGradient(0, 0, 40, 0, 0, h * 0.7); gl.addColorStop(0, 'rgba(242,199,92,0.25)'); gl.addColorStop(1, 'rgba(242,199,92,0)')
  x.fillStyle = gl; x.fillRect(-h, -h, 2 * h, 2 * h)
  x.drawImage(im, -w / 2, -h / 2, w, h)
  // the stamp
  const sp = prog(t, T.stamp - 0.18, T.stamp)
  if (sp > 0) {
    const s = lerp(2.2, 1, ease.inQuad(sp)), a = clamp(sp * 1.5)
    x.save(); x.translate(0, 120); x.rotate(-0.14); x.scale(s, s); x.globalAlpha *= a
    x.strokeStyle = '#ff5c7a'; x.lineWidth = 10; x.strokeRect(-200, -52, 400, 104)
    x.fillStyle = 'rgba(255,92,122,0.12)'; x.fillRect(-200, -52, 400, 104)
    x.fillStyle = '#ff5c7a'; x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DEALBREAKERS', 0, 3)
    x.restore()
  }
  x.restore()
  sparkles(x, t, cx, cy + 120, T.stamp, 10, 260, 0.2, ['#ff5c7a', GOLD, BONE])
}

const F = askFilm({
  duration: 30, sign: 'pisces', speaker: SPEAK, accent: ACC,
  question: 'How do I get over | *someone*?', qSize: 96,
  dmOut: T.dmOut,
  lines: LINES, open: T.open, close: T.close,
  note: { t: 1.3, out: [16.75, 16.95], rows: ['♓ PISCES · MUTABLE WATER', 'RULED BY JUPITER (TRADITIONAL)', 'AND NEPTUNE (MODERN)'], w: 780, top: 1234 },
  heads: [
    { text: 'Know your | *dealbreakers.*', at: T.tie + 0.05, out: T.tieOut, top: 150, size: 104, accentSize: 150, accentColor: GOLD, late: 1, lateAt: T.tie + 0.42 },
    { text: 'Feel it. | Then *let* *it* *go.*', at: T.last, out: T.out, top: 210, size: 116, accentSize: 168, accentColor: ACC, late: 3, lateAt: T.lastLand, lineHeight: 1.02 },
  ],
  load: ['card-back.png'],
  drawBack: drawStage, drawFront: drawTie,
  cues: [
    ['pluck', 0.3, 659.25, 0.025, 1.2, 0.4], ['pluck', 1.3, 587.33, 0.025, 1.2, 0.4], ['pluck', 2.3, 523.25, 0.025, 1.2, 0.4],
    ...T.tissues.flatMap(v => [['whoosh', v, 0.18, 0.025], ['pop', v + 0.08, 1174.66, 0.02, -0.4]]),
    ['pop', T.phone[0], 739.99, 0.04, 0.4], ['pluck', T.unf, 1318.51, 0.045, 0.5, 0.4], ['glitter', T.unf, T.unf + 0.4], ['whoosh', T.phoneOut[0], 0.4, 0.03],
    ...T.icons.map((v, i) => ['pop', v, [880, 987.77, 1174.66][i], 0.045, (i - 1) * 0.4]), ['tick', T.sip, 0.04], ['tick', T.sip + 0.15, 0.03],
    ['whoosh', T.window[0], 0.5, 0.035], ['bell', T.window[1], 1318.51, 0.035, 2.0, 0], ['glitter', T.window[1], T.window[1] + 0.8], ['riser', T.sun[0], T.sun[1], 0.03],
    ['whoosh', T.hand[0], 0.6, 0.025],
    ['whoosh', T.tie, 0.4, 0.035], ['boom', T.stamp, 0.16], ['tick', T.stamp, 0.07], ['glitter', T.stamp, T.stamp + 0.4], ['whoosh', T.tieOut[0], 0.35, 0.03],
    ['whoosh', T.bird[0], 0.8, 0.03], ['pluck', T.bird[0] + 0.1, 1567.98, 0.04, 0.6, 0], ['pluck', T.bird[0] + 0.5, 1760, 0.03, 0.6, 0.2], ['pluck', T.heart, 1174.66, 0.04, 0.6, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [T.tie - 0.04, { t: T.cut, kind: 'flip' }],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
