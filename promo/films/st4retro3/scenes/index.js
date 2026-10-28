// st4retro3 (EP 057, 20 s vertical Align ad, Star Talk season 4, thread E3: Retro the gremlin) · story 0–15.6, then the
// shared end card ("come" + the Align logo, JOIN THE TEXAS BETA).
//   0.00–6.40  "Retro is on the | *road* trip."  The road-trip van rolls along a West Texas highway at dusk (mesas, poles).
//              Sagittarius drives, Virgo rides shotgun. Retro, the backwards-spinning Mercury ☿ orb (stretro), drops onto the
//              van's GPS; on the drop (2.27) the screen glitches red: a U-turn arrow, "EX'S TOWN ♥".
//              Box (☿ RETRO): "turn around. go back. to your ex's town."  Sagittarius goes heart-eyed, the blinker ticks,
//              and the van starts to swing round (it slows, squashes and turns toward us).
//   6.35–12.5  "Don't *U-turn.*"  A paper map pops out of Virgo's window. Box (♍ VIRGO): "that's not on the map."  The van snaps
//              straight. The ghost rises from behind a mesa (7.4). Box (THE STARS): "going back isn't the same as going
//              *forward.*"  Retro gets bumped off the GPS onto the roof rack; the screen turns green: ▲ STRAIGHT AHEAD.
//  12.65       card cut (flip).
//  12.75–15.5  "Eyes on the road | *ahead.*"  Sunrise glow up the road, the van speeds on, Retro rides the roof, dizzy.
// Astrology: Mercury rules travel and communication; when it's retrograde it seems to move backwards (about three times a year).
// One canvas, DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 57
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5a5a', INK = '#1b1236', MINT = '#7dffb0', AMBER = '#ffb347'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const SAG = signStar('sagittarius'), VIR = signStar('virgo')

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.9, h0Out: [6.15, 6.35],
  vanIn: [0.1, 1.0], gpsIn: 0.55, orbDrop: [1.55, 2.2], hijack: BEAT(3),          // 2.27: the drop
  open: 2.45, r1: 2.6, heart: 3.6, blink: [4.6, 6.4], turn: [5.0, 6.2], snap: [6.45, 6.95],
  h1: 6.4, h1Land: 6.75, h1Out: [12.3, 12.5],
  map: 6.3, v1: 6.4, ghost: 7.4, s1: 8.95, bump: [9.7, 10.4], recover: 9.9, close: 12.5,
  cut: 12.65,
  h2: 12.75, h2Land: 13.15, h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const RET = '☿ RETRO', VIRN = '♍ VIRGO', NARR = 'THE STARS'
const LINES = [
  { t: T.r1, speaker: RET, color: GOLD, text: 'turn around. go back. to your *ex’s town.*' },
  { t: T.v1, speaker: VIRN, color: PINK, text: 'that’s not on the *map.*' },
  { t: T.s1, speaker: NARR, text: 'going back isn’t the same as going *forward.*' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── pixel bits
const BMP = s => s.trim().split(/\s+/)
const ARROW = BMP(`..X.. .XX.. XXXXX .XX.. ..X..`)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
const UTURN = BMP(`
..XXXXXX....
.XXXXXXXX...
XXX....XXX..
XX......XX..
XX......XX..
XX......XX..
XX....XXXXXX
XX.....XXXX.
XX......XX..`)
const UP = BMP(`....XX.... ...XXXX... ..XXXXXX.. .XXXXXXXX. XXXXXXXXXX ...XXXX... ...XXXX... ...XXXX... ...XXXX...`)
function bits(x, bm, cx, cy, cell, col, { rot = 0, a = 1, outline = true } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  if (outline) {
    x.fillStyle = 'rgba(14,8,32,0.88)'
    bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  }
  x.fillStyle = col
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── layout
const HORIZON = 1000, ROAD = [1205, 1345]
const VAN = { x: 540, y: 1290 }                     // y = where the wheels meet the road
const GPS = { x: 520, y: 690, w: 600, h: 280 }
const ORB_GPS = { x: 836, y: 566, r: 62 }, ORB_ROOF = { x: 590, y: 984, r: 44 }
const MESA = { x0: 760, x1: 990, top: 960 }
// how far the road has scrolled: 640 px/s, braking to 120 while the van tries the U-turn, then back to speed
const roadPos = t => 640 * t - 520 * clamp(t - T.turn[0], 0, T.snap[1] - T.turn[0]) + 300 * clamp(t - T.cut, 0, 4)

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 44px Inter", "800 30px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Retro is on the | *road* trip.', { top: 196, size: 104, accentSize: 160, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.12, wobble: true, gap: 0.09, accentColor: GOLD })
  const H1 = popText(root, 'Don’t *U-turn.*', { top: 236, size: 120, accentSize: 172, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Eyes on the road | *ahead.*', { top: 196, size: 104, accentSize: 170, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.08, accentColor: MINT })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the orb sprite (stretro's 16-cell gold ball)
  const ORB_G = 16
  const orbBuf = document.createElement('canvas'); orbBuf.width = orbBuf.height = ORB_G
  {
    const o = orbBuf.getContext('2d'), h = ORB_G / 2
    for (let j = 0; j < ORB_G; j++) for (let i = 0; i < ORB_G; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d > 1) continue
      let c = d > 0.86 ? '#b8792a' : (u * 0.6 + v * 0.8 > 0.35 ? '#e0a743' : '#f7cf68')
      if (d <= 0.86 && Math.hypot(u + 0.38, v + 0.4) < 0.24) c = '#fff1c8'
      if (d > 0.86 && u + v < -0.6) c = '#ffd98a'
      o.fillStyle = c; o.fillRect(i, j, 1, 1)
    }
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── the land: dusk ground, a flat-topped mesa (the ghost's hiding place), far hills, the road, poles going by
  function drawLand(t, fade) {
    const dawn = ease.inOutQuad(prog(t, T.cut, T.cut + 1.2))
    x.save(); x.globalAlpha = fade
    // a sunrise glow up the road in the last beat
    if (dawn > 0) glow(860, HORIZON, 520, '#ffb070', 0.9 * dawn)
    // far hills
    x.fillStyle = '#2b1e4e'
    x.beginPath(); x.moveTo(0, HORIZON)
    for (let px = 0; px <= W; px += 30) x.lineTo(px, HORIZON - 26 - 18 * Math.sin(px * 0.011 + 1) - 10 * Math.sin(px * 0.031))
    x.lineTo(W, HORIZON); x.closePath(); x.fill()
    // the mesa (stepped pixel edges)
    x.fillStyle = '#3a2558'
    x.beginPath(); x.moveTo(MESA.x0 - 60, HORIZON); x.lineTo(MESA.x0 - 30, HORIZON - 20); x.lineTo(MESA.x0, MESA.top); x.lineTo(MESA.x1, MESA.top); x.lineTo(MESA.x1 + 30, HORIZON - 20); x.lineTo(MESA.x1 + 60, HORIZON); x.closePath(); x.fill()
    x.fillStyle = '#5a3a78'; x.fillRect(MESA.x0, MESA.top, MESA.x1 - MESA.x0, 6)
    x.restore()
  }
  function drawGround(t, fade) {
    x.save(); x.globalAlpha = fade
    const g = x.createLinearGradient(0, HORIZON, 0, 1920)
    g.addColorStop(0, '#4a2a52'); g.addColorStop(0.3, '#3a2046'); g.addColorStop(1, '#1a1030')
    x.fillStyle = g; x.fillRect(0, HORIZON, W, 1920 - HORIZON)
    // scrub dots scrolling slower than the road
    const p = roadPos(t)
    for (let i = 0; i < 22; i++) {
      const px = ((i * 173 - p * 0.45) % (W + 200) + W + 200) % (W + 200) - 100, py = HORIZON + 40 + (i * 61) % 150
      x.fillStyle = i % 3 ? '#2e5a3a' : '#5a4a2a'; x.fillRect(px, py, 14 + (i % 3) * 6, 8 + (i % 2) * 6)
    }
    // the road
    x.fillStyle = '#26203a'; x.fillRect(0, ROAD[0], W, ROAD[1] - ROAD[0])
    x.fillStyle = '#3a3356'; x.fillRect(0, ROAD[0], W, 6); x.fillRect(0, ROAD[1] - 6, W, 6)
    x.fillStyle = AMBER
    for (let k = -1; k < 8; k++) { const dx = ((k * 200 - p) % 200 + 200) % 200 + (k - 1) * 200 + 200; x.fillRect(dx - 400 + 400 % 200, (ROAD[0] + ROAD[1]) / 2 - 4, 100, 8) }
    // telephone poles going by
    for (let k = 0; k < 4; k++) {
      const px = ((k * 420 - p * 1.1) % 1680 + 1680) % 1680 - 200
      x.fillStyle = '#1e1636'; x.fillRect(px, HORIZON - 150, 14, ROAD[0] - HORIZON + 150 - 10); x.fillRect(px - 40, HORIZON - 140, 94, 10)
    }
    x.restore()
  }

  // ── the van (side view, facing right). local units: wheels on y = 0, roof at about −250
  function vanState(t) {
    const tin = ease.outCubic(prog(t, ...T.vanIn))
    const turnK = ease.inOutCubic(prog(t, ...T.turn)) * (1 - prog(t, T.snap[0], T.snap[0] + 0.12))
    const snapP = prog(t, ...T.snap)
    const snapO = snapP > 0 && snapP < 1 ? Math.sin(snapP * Math.PI * 2.5) * (1 - snapP) * 0.14 : 0
    const sx = Math.max(0.24, 1 - 0.7 * turnK) * (1 + snapO)
    const cutX = t >= T.cut ? 30 * Math.sin((t - T.cut) * 1.6) : 0
    return { x: lerp(-400, VAN.x, tin) + cutX, sx, tilt: -0.05 * turnK + (snapO * 0.3), bounce: Math.abs(Math.sin(t * 13)) * 3, turnK }
  }
  const WIN = { mid: [-110, 40], front: [52, 182], top: -240, bot: -132 }
  function drawVan(t, fade) {
    if (fade <= 0) return
    const V = vanState(t)
    x.save(); x.globalAlpha = fade
    x.translate(V.x, VAN.y - V.bounce); x.rotate(V.tilt); x.scale(V.sx, 1)
    // shadow
    x.fillStyle = 'rgba(6,4,16,0.5)'; x.beginPath(); x.ellipse(0, 6 + V.bounce, 300, 18, 0, 0, Math.PI * 2); x.fill()
    // roof rack + luggage (Sagittarius's backpack, a cooler)
    x.fillStyle = INK; x.fillRect(-230, -268, 380, 10)
    x.fillStyle = '#a35cf0'; x.fillRect(-200, -322, 96, 56); x.fillStyle = '#7a3ec4'; x.fillRect(-200, -282, 96, 16); x.fillStyle = '#c9a6ff'; x.fillRect(-180, -314, 56, 10)
    x.fillStyle = '#7fe0ff'; x.fillRect(-80, -306, 110, 40); x.fillStyle = BONE; x.fillRect(-80, -306, 110, 10)
    // body: cream top, lavender bottom, gold stripe; slanted nose
    const body = () => { x.beginPath(); x.moveTo(-275, -60); x.lineTo(-275, -235); x.quadraticCurveTo(-275, -258, -250, -258); x.lineTo(170, -258); x.lineTo(258, -150); x.lineTo(272, -120); x.lineTo(272, -60); x.closePath() }
    x.fillStyle = INK; x.save(); x.translate(0, 0); x.scale(1.03, 1.03); body(); x.fill(); x.restore()
    x.save(); body(); x.clip()
    x.fillStyle = '#f3e6c8'; x.fillRect(-300, -270, 600, 140)
    x.fillStyle = '#9a7be0'; x.fillRect(-300, -130, 600, 80)
    x.fillStyle = GOLD; x.fillRect(-300, -136, 600, 12)
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-270, -252, 420, 6)
    x.restore()
    // wheels
    for (const wx of [-170, 160]) {
      x.fillStyle = INK; x.beginPath(); x.arc(wx, -46, 50, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#3a3356'; x.beginPath(); x.arc(wx, -46, 40, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#c9c3e0'; x.beginPath(); x.arc(wx, -46, 18, 0, Math.PI * 2); x.fill()
      const a = roadPos(t) / 44
      x.fillStyle = INK; x.fillRect(wx - 3 + Math.cos(a) * 26, -49 + Math.sin(a) * 26, 8, 8)
    }
    // windshield + lights
    x.fillStyle = '#2a3a6a'; x.beginPath(); x.moveTo(190, -244); x.lineTo(250, -160); x.lineTo(190, -160); x.closePath(); x.fill()
    x.fillStyle = '#fff4c8'; x.fillRect(256, -112, 16, 22)
    x.fillStyle = '#ff5a5a'; x.fillRect(-275, -120, 10, 26)
    // the blinker (left = toward the U-turn), amber, front corner + back corner
    if (t > T.blink[0] && t < T.blink[1] && Math.floor((t - T.blink[0]) * 3.6) % 2 === 0) {
      x.fillStyle = AMBER; x.fillRect(252, -140, 20, 14); x.fillRect(-275, -146, 12, 16)
      glow(262, -133, 60, AMBER, 0.8)
    }
    x.restore()
    return V
  }
  // the two of them, seated in the windows (clipped to the glass)
  function drawRiders(t, V, fade) {
    if (fade <= 0) return
    const winRect = (w) => [w[0], WIN.top, w[1] - w[0], WIN.bot - WIN.top]
    const toWorld = (lx, ly) => {
      const c = Math.cos(V.tilt), s = Math.sin(V.tilt), X = lx * V.sx
      return [V.x + X * c - ly * s, VAN.y - V.bounce + X * s + ly * c]
    }
    const riders = [
      { w: WIN.front, col: SAG.color, glyph: null, st: sagState(t), seed: 7, hops: [T.heart, T.snap[0] + 0.1, T.recover + 0.2, T.h2Land, 14.2] },
      { w: WIN.mid, col: VIR.color, glyph: null, st: virState(t), seed: 5, hops: [T.hijack + 0.1, T.v1 + 0.05, T.v1 + 0.6, T.recover + 0.25, T.h2Land + 0.1, 14.4] },
    ]
    for (const r of riders) {
      const [rx, ry, rw, rh] = winRect(r.w)
      x.save(); x.globalAlpha = fade
      x.translate(V.x, VAN.y - V.bounce); x.rotate(V.tilt); x.scale(V.sx, 1)
      x.fillStyle = INK; x.fillRect(rx - 7, ry - 7, rw + 14, rh + 14)
      x.fillStyle = '#2a3a6a'; x.fillRect(rx, ry, rw, rh)
      x.beginPath(); x.rect(rx, ry, rw, rh); x.clip()
      x.scale(1 / V.sx, 1)                                     // keep the star itself round while the van turns
      drawStarChar(x, (rx + rw / 2) * V.sx, ry + rh * 0.78, 178, t, { color: r.col, ...r.st, hops: r.hops, seed: r.seed, glow: 0.7, bob: 2, tips: false })
      x.restore()
      // glass glare on top
      x.save(); x.globalAlpha = fade * 0.25
      x.translate(V.x, VAN.y - V.bounce); x.rotate(V.tilt); x.scale(V.sx, 1)
      x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(rx + rw - 40, ry); x.lineTo(rx + rw - 18, ry); x.lineTo(rx + rw - 60, ry + rh); x.lineTo(rx + rw - 82, ry + rh); x.closePath(); x.fill()
      x.restore()
    }
    // hearts over Sagittarius while the ex's town calls
    if (t > T.heart && t < T.v1 + 0.4) {
      const [hx, hy] = toWorld(115, -260)
      floatHearts(t, hx, hy, T.heart, T.v1, 120)
    }
    // Virgo's paper map, popping out of the window
    const mk = pop01(t, T.map, 0.34, 2.2) * (1 - ease.inCubic(prog(t, T.s1 + 0.3, T.s1 + 0.6)))
    if (mk > 0.01) {
      const [mx, my] = toWorld(-30, -330)
      x.save(); x.translate(mx, my); x.rotate(-0.08 + 0.05 * Math.sin(t * 7)); x.scale(mk, mk)
      x.fillStyle = INK; x.fillRect(-128, -78, 256, 156)
      const panels = ['#f3e6c8', '#e4d3ae', '#f3e6c8', '#e4d3ae']
      panels.forEach((c, i) => { x.fillStyle = c; x.fillRect(-122 + i * 61, -72, 61, 144) })
      // the route: a bold line forward with a star at the end, and the ex's town crossed off
      x.strokeStyle = '#2fa36b'; x.lineWidth = 8; x.beginPath(); x.moveTo(-100, 40); x.lineTo(-30, 10); x.lineTo(30, 20); x.lineTo(96, -30); x.stroke()
      drawPixelStar(x, 96, -36, 34, 2, GOLD)
      x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.moveTo(-112, -60); x.lineTo(-70, -22); x.moveTo(-70, -60); x.lineTo(-112, -22); x.stroke()
      x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('NOPE', -90, -2)
      x.restore()
    }
  }
  function sagState(t) {
    if (t < T.hijack) return { mood: 'happy', look: [1, 0] }
    if (t < T.heart) return { mood: 'wide', look: [0, -1] }
    if (t < T.v1 + 0.3) return { mood: 'heart', look: [0, -1] }
    if (t < T.s1) return { mood: 'wide', look: [-1, 0], blink: false }
    if (t < T.recover) return { mood: 'neutral', look: [0, 0] }
    if (t < T.cut) return { mood: 'happy', look: [1, 0] }
    return { mood: 'sparkle', look: [1, 0] }
  }
  function virState(t) {
    if (t < T.hijack) return { mood: 'neutral', look: [1, 0] }
    if (t < T.r1 + 1.5) return { mood: 'wide', look: [1, -1] }
    if (t < T.map) return { mood: 'squint', look: [1, 0] }
    if (t < LT[1].done + 0.2) return { mood: 'squint', look: [0, 0] }
    if (t < T.s1) return { mood: 'eyeroll' }
    if (t < T.cut) return { mood: 'happy', look: [1, 0] }
    return { mood: 'happy', look: [1, 0] }
  }

  // ── the GPS: a floating nav screen with a pointer tail down to the van
  function drawGPS(t) {
    const k = pop01(t, T.gpsIn, 0.4, 1.8) * popOut(t, T.out)
    if (k <= 0.01) return
    const { x: cx, y: cy, w, h } = GPS
    const hacked = t >= T.hijack && t < T.recover
    const glitch = hacked && (Math.sin(t * 37) > 0.75 || t < T.hijack + 0.25)
    x.save(); x.translate(cx + (glitch ? 6 * Math.sin(t * 91) : 0), cy); x.scale(k, k)
    // tail toward the dash
    x.fillStyle = INK; x.beginPath(); x.moveTo(-30, h / 2 - 4); x.lineTo(30, h / 2 - 4); x.lineTo(0, h / 2 + 60); x.closePath(); x.fill()
    x.save(); x.shadowColor = hacked ? rgba(RED, 0.8) : rgba(MINT, 0.5); x.shadowBlur = 50
    x.fillStyle = '#100a24'; x.beginPath(); x.roundRect(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32, 26); x.fill(); x.restore()
    x.lineWidth = 5; x.strokeStyle = hacked ? RED : rgba(BONE, 0.8); x.beginPath(); x.roundRect(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32, 26); x.stroke()
    // screen
    x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2)
    if (hacked) { g.addColorStop(0, '#3a0d22'); g.addColorStop(1, '#1e0816') } else { g.addColorStop(0, '#0f2a2a'); g.addColorStop(1, '#0a1a22') }
    x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    // map grid
    x.strokeStyle = hacked ? 'rgba(255,90,90,0.18)' : 'rgba(125,255,176,0.14)'; x.lineWidth = 2
    for (let gx2 = -w / 2; gx2 < w / 2; gx2 += 40) { x.beginPath(); x.moveTo(gx2, -h / 2); x.lineTo(gx2 - 30, h / 2); x.stroke() }
    x.textAlign = 'center'; x.textBaseline = 'middle'
    if (!hacked) {
      // the road straight up, the arrow, STRAIGHT AHEAD
      x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(-120 - 30, -h / 2, 60, h)
      bits(x, UP, -120, 10 - ((t * 40) % 20), 9, MINT)
      x.fillStyle = MINT; x.font = `700 40px ${MONO}`; x.fillText('▲ STRAIGHT', 110, -36); x.fillText('AHEAD', 110, 22)
      x.font = `700 22px ${MONO}`; x.fillStyle = rgba(BONE, 0.7); x.fillText(t >= T.cut ? 'NEXT: NEW TOWNS' : 'NEXT STOP', 110, 82)
    } else {
      // U-TURN NOW, a heart pin labelled EX'S TOWN behind you
      x.fillStyle = 'rgba(239,230,214,0.25)'; x.fillRect(-150, -h / 2, 60, h)
      bits(x, UTURN, -150, 0, 12, RED, { rot: Math.PI })
      x.fillStyle = RED; x.font = `700 46px ${MONO}`; x.fillText('U-TURN', 110, -52); x.fillText('NOW', 110, 2)
      bits(x, HEART, 30, 70, 5, PINK)
      x.fillStyle = PINK; x.font = `700 24px ${MONO}`; x.fillText('EX’S TOWN', 136, 70)
      // scanlines + tear
      x.fillStyle = 'rgba(0,0,0,0.25)'; for (let sy = -h / 2; sy < h / 2; sy += 8) x.fillRect(-w / 2, sy, w, 3)
      if (glitch) { x.fillStyle = rgba(RED, 0.4); x.fillRect(-w / 2, -40 + 60 * Math.sin(t * 13), w, 18) }
    }
    x.restore()
    x.restore()
  }

  // ── Retro: drops onto the GPS, spins backwards; bumped onto the roof rack, dizzy, in beat 2–3
  function orbState(t, V) {
    const roof = () => {
      const c = Math.cos(V.tilt), s = Math.sin(V.tilt), lx = (ORB_ROOF.x - VAN.x) * V.sx
      return { x: V.x + lx * c - (ORB_ROOF.y - VAN.y) * s, y: VAN.y - V.bounce + lx * s + (ORB_ROOF.y - VAN.y) * c }
    }
    if (t < T.bump[0]) {
      const p = prog(t, ...T.orbDrop), e = ease.outBounce ? ease.outBounce(p) : ease.outCubic(p)
      return { x: lerp(1180, ORB_GPS.x, ease.outCubic(p)), y: lerp(420, ORB_GPS.y, e), r: ORB_GPS.r, k: t >= T.orbDrop[0] ? 1 : 0, retro: true }
    }
    const p = prog(t, ...T.bump), R = roof()
    return { x: lerp(ORB_GPS.x, R.x, ease.inOutCubic(p)), y: lerp(ORB_GPS.y, R.y, ease.inOutCubic(p)) - Math.sin(Math.PI * p) * 260, r: lerp(ORB_GPS.r, ORB_ROOF.r, p), k: popOut(t, T.out), retro: true, dizzy: p >= 1, spinP: p }
  }
  function drawOrb(t, V) {
    const S0 = orbState(t, V), { r, k } = S0
    if (k <= 0.01) return
    const cx = S0.x, cy = S0.y + Math.sin(t * 2.3) * 4
    glow(cx, cy, r * 3, GOLD, 0.8 * clamp(k))
    const spin = -t * (S0.dizzy ? 1.2 : 2.8) - (S0.spinP || 0) * 8
    const R = r * 1.62, cell = Math.max(3, Math.round(r * 0.08)) * k
    for (let i = 0; i < 3; i++) {
      const a = spin + i * Math.PI * 2 / 3
      for (let s = 1; s <= 4; s++) {
        const b = a + s * 0.16
        x.fillStyle = rgba(GOLD, 0.55 - s * 0.11); const q = cell * (1.6 - s * 0.25)
        x.fillRect(Math.round(cx + Math.cos(b) * R * k - q / 2), Math.round(cy + Math.sin(b) * R * k - q / 2), q, q)
      }
      bits(x, ARROW, cx + Math.cos(a) * R * k, cy + Math.sin(a) * R * k, cell, '#fff1c8', { rot: a + Math.PI / 2 })
    }
    const SZ = Math.round(r * 2 * k / ORB_G) * ORB_G || r * 2 * k
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(spin); x.imageSmoothingEnabled = false
    x.fillStyle = 'rgba(14,8,32,0.6)'; x.beginPath(); x.arc(0, 0, SZ / 2 + 5, 0, Math.PI * 2); x.fill()
    x.drawImage(orbBuf, -SZ / 2, -SZ / 2, SZ, SZ)
    x.rotate(-spin)
    x.font = `700 ${Math.round(r * 1.3 * k)}px ${SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillText('☿︎', 0, r * 0.08 * k)
    x.restore()
    // dizzy pixel stars circling Retro on the roof
    if (S0.dizzy) for (let i = 0; i < 3; i++) {
      const a = t * 3 + i * 2.1
      drawPixelStar(x, cx + Math.cos(a) * r * 1.3, cy - r * 1.25 + Math.sin(a) * r * 0.3, 22, 1, [GOLD, BONE, LAV][i])
    }
  }

  function floatHearts(t, cx, cy, t0, t1, spread = 200) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.25, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 9) / 8 - 0.5
      bits(x, HEART, cx + side * spread + Math.sin(p * 7 + i) * 12, cy - p * 200, 5 + (i % 2), [PINK, '#ff4f86', GOLD][i % 3], { a: Math.sin(Math.PI * p) })
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const fade = 1 - ease.inOutQuad(prog(t, T.out[0] + 0.1, T.out[1] + 0.1))
      drawLand(t, fade)
      drawGhostCameo(x, t, { x: (MESA.x0 + MESA.x1) / 2, y: MESA.top, at: T.ghost, dur: 1.4, from: 'below', cell: 3 })
      drawGround(t, fade)
      // speed lines in the last beat
      if (t >= T.cut) {
        x.save(); x.globalAlpha = 0.5 * fade
        for (let i = 0; i < 6; i++) { const px = ((i * 260 - (t - T.cut) * 1600) % 1300 + 1300) % 1300 - 200; x.fillStyle = BONE; x.fillRect(px, 1080 + i * 22, 120, 4) }
        x.restore()
      }
      const V = drawVan(t, fade) || vanState(t)
      drawRiders(t, V, fade)
      drawGPS(t)
      drawOrb(t, V)
      sparkles(t, GPS.x, GPS.y, T.recover, 12, 300, 1, [MINT, BONE, GOLD])
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.35 (inert: the headline swaps), 12.65 (box shut → the last line, the one that plays).
const CUTS = [6.35, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: the van rolls in, the GPS pops up, Retro drops on it and hijacks it
  ...wordPops(T.h0, 4, 0.09, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pop', T.h0Land + 0.12, 880, 0.04, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['whoosh', T.vanIn[0], 0.6, 0.04], ['pop', T.gpsIn + 0.15, 880, 0.035, 0],
  ['whoosh', T.orbDrop[0], 0.4, 0.03], ['pop', T.orbDrop[1] - 0.1, 523.25, 0.04, 0.4],
  ...[0, 1, 2, 3, 4].map(i => ['pop', +(T.orbDrop[1] + i * 0.07).toFixed(3), NOTE[6 - i], 0.02, 0.4]),
  ['boom', T.hijack, 0.18], ['chip', T.hijack, 220, 0.3, { duty: 0.5, gain: 0.02 }], ['chip', T.hijack + 0.08, 330, 0.2, { duty: 0.125, gain: 0.018 }],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [RET]: 440, [VIRN]: 1046.5, [NARR]: 880 } }),
  ['bell', T.heart, 1318.51, 0.03, 1.2, 0.3],
  ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.blink[0] + i * 0.2778).toFixed(3), 0.03]),
  ['whoosh', T.turn[0], 0.8, 0.03],
  // Virgo: the map, the snap back; the ghost; the stars; Retro bumped to the roof
  ['pop', T.map + 0.12, 1174.66, 0.04, -0.2], ['tick', T.snap[0], 0.05], ['whoosh', T.snap[0], 0.3, 0.035],
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['whoosh', T.bump[0], 0.6, 0.03], ['pop', T.bump[1], 440, 0.04, -0.3],
  ['bell', T.recover + 0.05, 1318.51, 0.04, 1.2, 0], ['glitter', T.recover, T.recover + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // eyes on the road ahead
  ...wordPops(T.h2, 4, 0.08, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['whoosh', T.cut + 0.2, 0.7, 0.03], ['pluck', 14.2, 1318.51, 0.035, 0.5, -0.2], ['bell', 14.25, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
