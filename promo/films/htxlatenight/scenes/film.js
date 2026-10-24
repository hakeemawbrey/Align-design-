// htxlatenight (15 s vertical Align ad) · story 0–10.6, then the shared END CARD ("come" + the logo).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–3.25  HOOK  "2 AM | taco run. | *Alone. Again.*" — a generic food truck glows in the dark, its neon "TACOS"
//              sign buzzing; a pictogram steps up to the window, ONE taco pops out and hops into their hand (1.05);
//              the late words land on the beat and their arm sinks; the sign's last letter sputters.
//   3.15–3.80  they look up; the camera tilts up off the street into the night sky.
//   3.80–7.70  ON ALIGN  "Tonight's deck | is already *dealt.*" Seven card backs streak in like shooting stars and fan out
//              across the sky; the centre card lifts and glows (5.75). "Someone's up | late *too.*"
//   7.55–10.45 the glowing card shrinks to a star and falls back to the truck: it lands beside our pictogram and becomes a
//              gold one; the window pops a second taco, and the two tacos clink (9.35). "Next run's | for *two.*"
//   10.45→     plain sky only (SKY_H + grain), the end card takes over at 10.6.
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'

export const STORY_END = 10.6
const H = 1920
const BEAT = n => 0.6 + n * 0.5556
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', AMBER = '#ffb36b', VIOLET = '#c9a6ff', BLUE = '#8fd8f6', TEAL = '#7fe0c8'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const D2R = Math.PI / 180, TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

// ── the timeline
export const T = {
  hook: 0.08, alone: BEAT(1), again: BEAT(2) - 0.05, hookOut: [3.08, 3.25],
  truck: 0.0, sign: 0.25, walker: 0.3, taco1: 0.75, hop1: [1.0, 1.32], sink: [2.0, 2.6], sputter: 2.35,
  lookUp: [2.85, 3.3], tilt: [3.2, 3.8],
  turn: 3.62, turnLate: BEAT(6) - 0.1, deal: [3.95, 4.13, 4.31, 4.49, 4.67, 4.85, 5.03], glow: 5.75, sub: 5.95, subLate: 6.35,
  turnOut: [7.48, 7.66], cardsOut: 7.42,
  back: [7.62, 8.2], starFall: [7.75, 8.28], friend: 8.28, end: 8.05, endLate: 8.5,
  taco2: 8.7, hop2: [8.92, 9.22], clink: 9.42, endOut: [10.25, 10.45], sceneOut: [10.05, 10.45],
}

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break.
 *  The last `late` words pop at lateAt (big, optional wobble). */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
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
        if (t < w.t) { w.e.style.opacity = '0'; continue }
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

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
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, Math.max(4, Math.round(size * (1 - 0.35 * p) / 4) * 4), kind, col)
  }
  x.restore()
}

/** a taco: a bold half-moon shell opening up, with lumpy fillings. Centred at (px, py) (the shell's top line), ≈ 130·s wide */
function taco(x, px, py, s, { rot = 0, a = 1, steam = 0, t = 0 } = {}) {
  if (s <= 0 || a <= 0) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(s, s); x.globalAlpha *= a
  // fillings poking above the rim: lettuce bumps, tomato + onion dots
  const bumps = [[-48, 0, 18, '#7fe0a8'], [-24, -8, 20, '#7fe0a8'], [2, -10, 21, '#7fe0a8'], [28, -7, 19, '#7fe0a8'], [50, 0, 15, '#7fe0a8']]
  for (const [bx, by, r, c] of bumps) { x.beginPath(); x.arc(bx, by, r, Math.PI, 0); x.closePath(); ink(x, c, { w: 5, fa: 0.85, fill: '#2fc79a', glow: 8 }) }
  ;[[-30, -14, '#ff6b6b'], [12, -18, '#ff6b6b'], [38, -10, '#fff3e0'], [-8, -16, '#fff3e0']].forEach(([dx, dy, c]) => { x.beginPath(); x.arc(dx, dy, 7, 0, TAU); x.fillStyle = c; x.fill() })
  // the shell
  x.beginPath(); x.moveTo(-66, 0); x.arc(0, 0, 66, Math.PI, 0, true); x.closePath()
  x.fillStyle = '#e8a23a'; x.fill()
  ink(x, '#ffd27a', { w: 7, fa: 0.0, glow: 16 })
  // shell speckles
  x.fillStyle = 'rgba(140,70,20,0.55)'
  ;[[-30, 22], [6, 40], [30, 18], [-8, 16], [-40, 6], [22, 44]].forEach(([dx, dy]) => { x.beginPath(); x.arc(dx, dy, 4, 0, TAU); x.fill() })
  x.restore()
  if (steam > 0) {   // three wavy steam ribbons rising
    x.save(); x.translate(px, py); x.globalAlpha *= a * steam
    x.strokeStyle = 'rgba(255,240,225,0.6)'; x.lineWidth = 6 * s; x.lineCap = 'round'
    for (let k = 0; k < 3; k++) {
      const ph = ((t * 0.9 + k * 0.33) % 1)
      x.globalAlpha = a * steam * Math.sin(Math.PI * ph) * 0.9
      x.beginPath()
      for (let j = 0; j <= 10; j++) {
        const yy = -40 * s - j * 9 * s - ph * 60 * s, xx = (k - 1) * 34 * s + 9 * s * Math.sin(j * 0.8 + t * 5 + k)
        j ? x.lineTo(xx, yy) : x.moveTo(xx, yy)
      }
      x.stroke()
    }
    x.restore()
  }
}

/** a pictogram person seen from behind (no face). (px, py) = feet, s = scale (≈ 330 px tall at 1).
 *  hand: { l, r } local hand targets ([x, y]) or null for the resting arm; look tilts the head up (0..1) */
function person(x, px, py, s, { a = 1, col = VIOLET, line = BONE, glow = 14, fa = 0.32, look = 0, hands = {}, slump = 0, bob = 0 } = {}) {
  if (a <= 0 || s <= 0) return
  x.save(); x.translate(px, py); x.scale(s, s); x.globalAlpha *= a
  x.translate(0, -bob)
  ;[-1, 1].forEach(d => {
    x.beginPath(); x.moveTo(d * 18, -120); x.lineTo(d * 22, -6)
    ink(x, line, { w: 26, fa: 0, glow: glow * 0.6 })
  })
  const sh = slump * 10
  x.beginPath(); x.moveTo(-44, -112); x.lineTo(-38, -222 + sh); x.quadraticCurveTo(-38, -254 + sh, 0, -256 + sh); x.quadraticCurveTo(38, -254 + sh, 38, -222 + sh); x.lineTo(44, -112); x.closePath()
  x.fillStyle = '#1c1238'; x.fill()
  ink(x, line, { w: 9, fa, fill: col, glow })
  ;[-1, 1].forEach(d => {
    const hd = d < 0 ? hands.l : hands.r
    const hx = hd ? hd[0] : d * 56, hy = hd ? hd[1] : -136 + slump * 6
    const sx = d * 40, sy = -226 + sh
    // a gentle elbow so raised arms read as arms
    const ex = lerp(sx, hx, 0.5) + d * 18, ey = lerp(sy, hy, 0.5) + 10
    x.beginPath(); x.moveTo(sx, sy); x.quadraticCurveTo(ex, ey, hx, hy)
    ink(x, line, { w: 16, fa: 0, glow: glow * 0.5 })
  })
  x.beginPath(); x.arc(0, -292 + sh * 1.4 - look * 10, 32, 0, TAU)
  ink(x, line, { w: 9, fa: 0.85, fill: line, glow })
  x.restore()
}

// ── the street scene (scene coordinates at rest)
const GROUND = 1462
const TRUCK = { l: 130, r: 950, top: 880, bot: 1392 }
const WIN = { l: 392, r: 868, top: 968, bot: 1172 }
const P1 = { x: 420, y: 1740, s: 1.55 }, P2 = { x: 700, y: 1740, s: 1.55 }
const toScreen = (P, lx, ly) => ({ x: P.x + lx * P.s, y: P.y + ly * P.s })
const CLINK = [(560 - P1.x) / P1.s, -312]          // both hands meet here (local coords of P1; mirrored for P2)
const SIGN_TXT = 'TACOS'

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 150px Inter", "700 62px Inter", "italic 500 150px 'EB Garamond'", "700 34px 'Space Mono'", "900 92px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const back = new Image(); back.src = A + 'card-back.png'
  try { await back.decode() } catch (_) { /* drawn only when loaded */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 40) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('HOUSTON · 2:00 AM', AMBER), 0.05, T.hookOut], [eyebrow('ON ALIGN'), T.turn, T.turnOut]]
  const H0 = popText(root, '2 AM | taco run. | *Alone.* *Again.*', { top: 178, size: 150, accentSize: 150, at: T.hook, gap: 0.08, late: 2, lateAt: T.alone, lateGap: T.again - T.alone, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H1 = popText(root, "Tonight's deck | is already *dealt.*", { top: 190, size: 100, accentSize: 132, at: T.turn, gap: 0.07, late: 1, lateAt: T.turnLate, wobble: true, accentColor: GOLD })
  const S1 = popText(root, "Someone's up | late *too.*", { top: TYPE.subY - 40, size: 84, weight: 700, accentSize: 112, at: T.sub, gap: 0.08, late: 1, lateAt: T.subLate, wobble: true, accentColor: PINK })
  const H2 = popText(root, "Next run's | for *two.*", { top: 190, size: 124, accentSize: 168, at: T.end, gap: 0.08, late: 1, lateAt: T.endLate, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.hookOut], [H1, T.turnOut], [S1, T.turnOut], [H2, T.endOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // camera: the street slides down out of frame (we tilt up into the stars) for the deck, and back for the end
  const TILT = 1250
  const sceneDY = t => TILT * ease.inOutCubic(prog(t, ...T.tilt)) * (1 - ease.inOutCubic(prog(t, ...T.back)))
  const sceneA = t => outK(t, T.sceneOut) * (t < T.back[0] ? 1 - ease.inQuad(prog(t, T.tilt[0] + 0.2, T.tilt[1])) : ease.outQuad(prog(t, T.back[0], T.back[0] + 0.3)))

  // where each taco is. hook: in the window → hops into P1's raised right hand → held low (sad); end: raised to clink
  const p1Hand = t => {
    const up = [84, -300], low = [66, -168]
    let h = up
    const sk = ease.inOutCubic(prog(t, ...T.sink))
    h = [lerp(up[0], low[0], sk), lerp(up[1], low[1], sk)]
    const rk = ease.inOutCubic(prog(t, T.hop2[1] - 0.05, T.clink))
    h = [lerp(h[0], CLINK[0], rk), lerp(h[1], CLINK[1], rk)]
    const hit = t > T.clink ? Math.exp(-(t - T.clink) * 6) * Math.sin((t - T.clink) * 30) * 10 : 0
    return [h[0] - Math.abs(hit), h[1] - hit * 0.5]
  }
  const p2Hand = t => {
    const up = [-84, -300]
    const rk = ease.inOutCubic(prog(t, T.hop2[1] - 0.05, T.clink))
    const h = [lerp(up[0], -CLINK[0], rk), lerp(up[1], CLINK[1], rk)]
    const hit = t > T.clink ? Math.exp(-(t - T.clink) * 6) * Math.sin((t - T.clink) * 30) * 10 : 0
    return [h[0] + Math.abs(hit), h[1] - hit * 0.5]
  }
  const armUp1 = t => clamp(prog(t, T.hop1[0] - 0.15, T.hop1[1] - 0.05))
  const armUp2 = t => clamp(prog(t, T.hop2[0] - 0.15, T.hop2[1] - 0.05))

  function drawTacoHop(t, P, handFn, tPop, hop, flip, seed) {
    if (t < tPop) return
    const winPos = { x: 600 + (flip ? 120 : 0), y: WIN.bot - 2 }
    const hp = handFn(t), hand = toScreen(P, hp[0], hp[1])
    const tgt = { x: hand.x + (flip ? -8 : 8), y: hand.y - 22 }
    const k = prog(t, ...hop)
    const pk = pop01(t, tPop, 0.36, 2.6)
    let px, py, rot
    if (k <= 0) { px = winPos.x; py = winPos.y - 4 * Math.abs(Math.sin((t - tPop) * 9)) * (1 - prog(t, tPop, tPop + 0.4)); rot = 0 }
    else {
      const e = ease.inOutQuad(k)
      px = lerp(winPos.x, tgt.x, e); py = lerp(winPos.y, tgt.y, e) - 170 * Math.sin(Math.PI * k); rot = (flip ? -1 : 1) * TAU * ease.inOutCubic(k)
    }
    const land = k >= 1 ? 1 + 0.18 * Math.exp(-(t - hop[1]) * 7) * Math.cos((t - hop[1]) * 24) : 1
    taco(x, px, py, 0.95 * pk * land, { rot, steam: clamp(prog(t, hop[1], hop[1] + 0.3)), t })
    sparkle(x, winPos.x, winPos.y - 40, t, tPop, { n: 8, R: 130, seed, size: 22, cols: [AMBER, '#fff3e0', GOLD, PINK] })
  }

  // ── the street + truck
  const STR = (() => { const r = rng(9); return Array.from({ length: 12 }, (_, i) => ({ c: [PINK, GOLD, BLUE, TEAL, VIOLET, AMBER][i % 6], ph: r() * 6 })) })()
  function drawStreet(t) {
    const a = sceneA(t)
    if (a <= 0) return
    const dy = sceneDY(t)
    const open = ease.outCubic(prog(t, 0, 0.6))
    x.save(); x.translate(0, dy + (1 - open) * 120); x.globalAlpha = a

    // ground: dark asphalt, a curb line, faint lane dashes
    const gg = x.createLinearGradient(0, GROUND, 0, H + 200)
    gg.addColorStop(0, '#22143a'); gg.addColorStop(1, '#0a0618')
    x.fillStyle = gg; x.fillRect(0, GROUND, W, H - GROUND + 400)
    x.strokeStyle = rgba(VIOLET, 0.7); x.lineWidth = 4; x.shadowColor = VIOLET; x.shadowBlur = 12
    x.beginPath(); x.moveTo(0, GROUND); x.lineTo(W, GROUND); x.stroke(); x.shadowBlur = 0
    x.fillStyle = rgba(BONE, 0.14)
    for (let k = 0; k < 6; k++) x.fillRect(-60 + k * 220, 1880, 120, 12)

    // warm window light spilling onto the pavement
    const flick = 0.9 + 0.1 * noise1(t * 6, 2)
    const lk = ease.outCubic(prog(t, T.sign, T.sign + 0.5))
    x.save(); x.globalCompositeOperation = 'lighter'
    const sg = x.createRadialGradient(630, GROUND + 80, 20, 630, GROUND + 80, 560)
    sg.addColorStop(0, rgba(AMBER, 0.38 * lk * flick)); sg.addColorStop(1, rgba(AMBER, 0))
    x.fillStyle = sg; x.beginPath(); x.ellipse(630, GROUND + 80, 560, 220, 0, 0, TAU); x.fill()
    const hg = x.createRadialGradient(630, WIN.top + 100, 60, 630, WIN.top + 100, 640)
    hg.addColorStop(0, rgba('#ff9a5a', 0.3 * lk * flick)); hg.addColorStop(1, rgba('#ff9a5a', 0))
    x.fillStyle = hg; x.beginPath(); x.arc(630, WIN.top + 100, 640, 0, TAU); x.fill()
    x.restore()

    // the truck pops up
    const tk = pop01(t, T.truck + 0.05, 0.5, 1.7)
    x.save(); x.translate(540, GROUND); x.scale(lerp(0.85, 1, clamp(tk)), tk); x.translate(-540, -GROUND)
    // wheels
    ;[310, 790].forEach(wx => {
      x.beginPath(); x.arc(wx, TRUCK.bot + 6, 64, 0, TAU); x.fillStyle = '#120b26'; x.fill(); ink(x, BONE, { w: 8, fa: 0, glow: 10 })
      x.beginPath(); x.arc(wx, TRUCK.bot + 6, 24, 0, TAU); ink(x, VIOLET, { w: 6, fa: 0.4, glow: 8 })
    })
    // body (box + rounded cab nose on the left)
    x.beginPath()
    x.moveTo(TRUCK.l + 70, TRUCK.top); x.lineTo(TRUCK.r - 30, TRUCK.top); x.quadraticCurveTo(TRUCK.r, TRUCK.top, TRUCK.r, TRUCK.top + 30)
    x.lineTo(TRUCK.r, TRUCK.bot); x.lineTo(TRUCK.l, TRUCK.bot); x.lineTo(TRUCK.l, TRUCK.top + 190); x.quadraticCurveTo(TRUCK.l, TRUCK.top + 120, TRUCK.l + 40, TRUCK.top + 60)
    x.lineTo(TRUCK.l + 70, TRUCK.top); x.closePath()
    x.fillStyle = '#1b1336'; x.fill()
    ink(x, BONE, { w: 9, fa: 0.16, fill: TEAL, glow: 16 })
    // a stripe along the bottom
    x.beginPath(); x.rect(TRUCK.l + 6, TRUCK.bot - 86, TRUCK.r - TRUCK.l - 12, 30); x.fillStyle = rgba(PINK, 0.55); x.fill()
    // cab window + door line
    x.beginPath(); x.moveTo(TRUCK.l + 30, TRUCK.top + 200); x.lineTo(TRUCK.l + 60, TRUCK.top + 90); x.lineTo(TRUCK.l + 210, TRUCK.top + 90); x.lineTo(TRUCK.l + 210, TRUCK.top + 200); x.closePath()
    ink(x, BONE, { w: 6, fa: 0.3, fill: '#6a5ab8', glow: 8 })
    x.beginPath(); x.moveTo(TRUCK.l + 230, TRUCK.top + 60); x.lineTo(TRUCK.l + 230, TRUCK.bot - 100); ink(x, rgba(BONE, 1), { w: 4, fa: 0, glow: 0 })

    // the serving window: warm interior, a silhouetted cook, a little LED clock
    x.save(); x.beginPath(); x.roundRect(WIN.l, WIN.top, WIN.r - WIN.l, WIN.bot - WIN.top, 14); x.clip()
    const wg = x.createLinearGradient(0, WIN.top, 0, WIN.bot)
    wg.addColorStop(0, lerpC('#3a2440', '#ffd27a', lk)); wg.addColorStop(1, lerpC('#2a1838', '#ff8a5a', lk))
    x.fillStyle = wg; x.fillRect(WIN.l, WIN.top, WIN.r - WIN.l, WIN.bot - WIN.top)
    // shelves
    x.fillStyle = 'rgba(120,50,40,0.35)'; x.fillRect(WIN.l, WIN.top + 56, WIN.r - WIN.l, 8)
    ;[0, 1, 2, 3, 4].forEach(k => { x.beginPath(); x.roundRect(WIN.l + 30 + k * 34, WIN.top + 22, 22, 34, 5); x.fillStyle = ['#ff6b6b', '#7fe0a8', '#ffd27a', '#ff6b6b', '#c9a6ff'][k]; x.globalAlpha = a * 0.75; x.fill() })
    x.globalAlpha = a
    // cook: head + shoulders, bobbing on the beat
    const cb = 6 * Math.abs(Math.sin((t - 0.6) * Math.PI / 0.5556))
    const reach = Math.max(Math.exp(-Math.max(0, t - T.taco1) * 5) * (t > T.taco1 - 0.2 ? 1 : 0), Math.exp(-Math.max(0, t - T.taco2) * 5) * (t > T.taco2 - 0.2 ? 1 : 0))
    x.fillStyle = '#3a1838'
    x.beginPath(); x.arc(640, WIN.top + 112 - cb, 40, 0, TAU); x.fill()
    x.beginPath(); x.moveTo(560, WIN.bot + 4); x.quadraticCurveTo(565, WIN.top + 158 - cb, 640, WIN.top + 156 - cb); x.quadraticCurveTo(715, WIN.top + 158 - cb, 720, WIN.bot + 4); x.fill()
    // cook's arm reaching out with each taco
    x.strokeStyle = '#3a1838'; x.lineWidth = 26; x.lineCap = 'round'
    x.beginPath(); x.moveTo(690, WIN.top + 172 - cb); x.lineTo(690 - 70 * reach, WIN.bot - 10 + 4 * reach); x.stroke()
    // LED clock
    x.font = "700 34px 'Space Mono', monospace"; x.textAlign = 'right'; x.textBaseline = 'top'
    x.fillStyle = '#ff5f6b'; x.shadowColor = '#ff5f6b'; x.shadowBlur = 10
    x.fillText(Math.floor(t * 1.8) % 2 ? '2 00' : '2:00', WIN.r - 22, WIN.top + 16)
    x.shadowBlur = 0
    x.restore()
    x.beginPath(); x.roundRect(WIN.l, WIN.top, WIN.r - WIN.l, WIN.bot - WIN.top, 14); ink(x, BONE, { w: 8, fa: 0, glow: 14 })
    // counter ledge
    x.beginPath(); x.roundRect(WIN.l - 26, WIN.bot, WIN.r - WIN.l + 52, 22, 8); x.fillStyle = '#2a1d4a'; x.fill(); ink(x, BONE, { w: 6, fa: 0, glow: 10 })

    // awning: pink / bone stripes with a scalloped edge
    const AW = { l: WIN.l - 40, r: WIN.r + 40, top: WIN.top - 62, bot: WIN.top + 4 }
    const n = 12, sw = (AW.r - AW.l) / n
    for (let i = 0; i < n; i++) {
      x.beginPath(); x.moveTo(AW.l + i * sw + 10, AW.top); x.lineTo(AW.l + (i + 1) * sw - 10 + 0, AW.top); x.lineTo(AW.l + (i + 1) * sw, AW.bot)
      x.arc(AW.l + (i + 0.5) * sw, AW.bot, sw / 2, 0, Math.PI); x.closePath()
      x.fillStyle = i % 2 ? rgba(BONE, 0.92) : rgba(PINK, 0.95); x.fill()
    }
    x.beginPath(); x.moveTo(AW.l + 10, AW.top); x.lineTo(AW.r - 10, AW.top); x.lineTo(AW.r, AW.bot)
    for (let i = n - 1; i >= 0; i--) x.arc(AW.l + (i + 0.5) * sw, AW.bot, sw / 2, 0, Math.PI, false)
    x.closePath(); ink(x, BONE, { w: 5, fa: 0, glow: 10 })

    // string lights along the roof edge
    x.save(); x.strokeStyle = rgba(BONE, 0.5); x.lineWidth = 3
    x.beginPath(); x.moveTo(TRUCK.l + 70, TRUCK.top + 8)
    for (let i = 1; i <= 4; i++) { const x0 = TRUCK.l + 70 + (i - 1) * 205, x1 = x0 + 205; x.quadraticCurveTo((x0 + x1) / 2, TRUCK.top + 58, x1, TRUCK.top + 8) }
    x.stroke(); x.restore()
    STR.forEach((b, i) => {
      const seg = Math.floor(i / 3), u = (i % 3 + 0.5) / 3, x0 = TRUCK.l + 70 + seg * 205
      const bx = lerp(x0, x0 + 205, u), by = TRUCK.top + 8 + 4 * 50 * u * (1 - u) + 12
      const on = 0.55 + 0.45 * Math.sin(t * 3 + b.ph)
      const bk = pop01(t, 0.35 + i * 0.03, 0.3, 2.5)
      if (bk <= 0) return
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = a * on * 0.6
      const g = x.createRadialGradient(bx, by, 0, bx, by, 30); g.addColorStop(0, b.c); g.addColorStop(1, rgba(b.c, 0))
      x.fillStyle = g; x.beginPath(); x.arc(bx, by, 30, 0, TAU); x.fill(); x.restore()
      x.beginPath(); x.arc(bx, by, 9 * bk, 0, TAU); x.fillStyle = b.c; x.fill()
    })

    // the roof neon sign: "TACOS" with a taco glyph; the last letter sputters at 2.35
    const sk = pop01(t, T.sign, 0.45, 2.2)
    if (sk > 0) {
      const SB = { l: 330, r: 860, top: 770, bot: 866 }
      x.save(); x.translate(595, SB.bot); x.scale(sk, sk); x.translate(-595, -SB.bot)
      x.beginPath(); x.moveTo(420, SB.bot); x.lineTo(420, TRUCK.top); x.moveTo(770, SB.bot); x.lineTo(770, TRUCK.top); ink(x, BONE, { w: 6, fa: 0, glow: 0 })
      x.beginPath(); x.roundRect(SB.l, SB.top, SB.r - SB.l, SB.bot - SB.top, 18); x.fillStyle = '#120b26'; x.fill(); ink(x, VIOLET, { w: 6, fa: 0, glow: 14 })
      x.font = `900 76px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      const lx0 = 470
      let cx0 = lx0
      for (let i = 0; i < SIGN_TXT.length; i++) {
        const ch = SIGN_TXT[i], cw = x.measureText(ch).width
        let on = 0.88 + 0.12 * noise1(t * 9 + i, 5)
        if (i === SIGN_TXT.length - 1 && t > T.sputter && t < T.sputter + 0.75) on = noise1(t * 40, 11) > 0.55 ? 1 : 0.12
        x.save(); x.globalAlpha = a * on; x.shadowColor = PINK; x.shadowBlur = 26 * on
        x.fillStyle = '#ffd1e0'; x.fillText(ch, cx0, (SB.top + SB.bot) / 2 + 4)
        x.lineWidth = 3; x.strokeStyle = PINK; x.strokeText(ch, cx0, (SB.top + SB.bot) / 2 + 4)
        x.restore()
        cx0 += cw + 4
      }
      // little neon taco at the left of the word
      x.save(); x.globalAlpha = a * (0.9 + 0.1 * noise1(t * 7, 3))
      x.beginPath(); x.moveTo(370, SB.top + 56); x.arc(410, SB.top + 56, 40, Math.PI, 0, true); x.closePath(); ink(x, AMBER, { w: 6, fa: 0.25, glow: 18 })
      x.beginPath(); for (let k = 0; k < 4; k++) x.arc(382 + k * 19, SB.top + 54, 9, Math.PI, 0); ink(x, '#7fe0a8', { w: 5, fa: 0, glow: 12 })
      x.restore()
      x.restore()
    }
    x.restore()   // truck pop

    // the friend (end): a gold pictogram pops in where the star lands
    const fk = pop01(t, T.friend, 0.45, 2.4)
    if (t > T.friend && fk > 0) {
      const pulse = 1 + 0.06 * Math.sin((t - T.friend) * 6)
      x.save(); x.globalCompositeOperation = 'lighter'
      const gr = x.createRadialGradient(P2.x, P2.y - 260, 0, P2.x, P2.y - 260, 330 * fk * pulse)
      gr.addColorStop(0, rgba(GOLD, 0.42)); gr.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = gr; x.beginPath(); x.arc(P2.x, P2.y - 260, 330 * fk * pulse, 0, TAU); x.fill()
      x.restore()
      const h2 = p2Hand(t), up2 = armUp2(t)
      person(x, P2.x, P2.y, P2.s * fk, { col: GOLD, line: '#ffe7a8', glow: 24, fa: 0.6, hands: { l: [lerp(-56, h2[0], up2), lerp(-136, h2[1], up2)] }, bob: 6 * Math.max(0, Math.sin((t - T.clink) * 9)) * (t > T.clink ? Math.exp(-(t - T.clink) * 2) : 0) })
      sparkle(x, P2.x, P2.y - 280, t, T.friend, { n: 12, R: 220, seed: 61, size: 28 })
    }

    // our pictogram
    const wk = pop01(t, T.walker, 0.42, 2.2)
    const h1 = p1Hand(t), up1 = armUp1(t)
    const look = ease.inOutCubic(prog(t, ...T.lookUp)) * (1 - ease.inOutCubic(prog(t, T.back[0], T.back[1])))
    const slump = ease.inOutCubic(prog(t, ...T.sink)) * (1 - ease.inOutCubic(prog(t, T.friend, T.friend + 0.4)))
    const hop = t > T.clink ? 6 * Math.max(0, Math.sin((t - T.clink) * 9)) * Math.exp(-(t - T.clink) * 2) : 0
    person(x, P1.x, P1.y, P1.s * wk, { col: VIOLET, look, slump, hands: { r: [lerp(56, h1[0], up1), lerp(-136, h1[1], up1)] }, bob: hop })
    sparkle(x, P1.x, P1.y - 250, t, T.walker + 0.15, { n: 8, R: 160, seed: 5, size: 22 })

    // the tacos
    drawTacoHop(t, P1, p1Hand, T.taco1, T.hop1, false, 21)
    if (t > T.taco2) drawTacoHop(t, P2, p2Hand, T.taco2, T.hop2, true, 23)
    // the clink: a burst + a little pixel heart of sparks between them
    const cp = toScreen(P1, CLINK[0], CLINK[1] - 30)
    if (t > T.clink && t < T.clink + 1.2) {
      const ck = prog(t, T.clink, T.clink + 0.5)
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = a * (1 - ck)
      const rg = x.createRadialGradient(cp.x, cp.y, 0, cp.x, cp.y, 260 * ease.outCubic(ck) + 20)
      rg.addColorStop(0, rgba(GOLD, 0.8)); rg.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = rg; x.beginPath(); x.arc(cp.x, cp.y, 280, 0, TAU); x.fill()
      x.restore()
    }
    sparkle(x, cp.x, cp.y, t, T.clink, { n: 16, R: 260, seed: 77, size: 30, dur: 0.9 })
    if (t > T.clink + 0.1) {
      const hk = pop01(t, T.clink + 0.1, 0.4, 2.6), hy = cp.y - 120 - 40 * ease.outCubic(prog(t, T.clink, T.clink + 1.4))
      heart(x, cp.x, hy, 1.1 * hk, a * (1 - prog(t, T.sceneOut[0] - 0.2, T.sceneOut[0] + 0.2)))
    }

    x.restore()
  }

  // ── the deck: seven card backs streak in like shooting stars and fan across the sky; the centre card lifts and glows
  const CW = 236, CH = Math.round(236 * 2347 / 1528)
  const FAN = Array.from({ length: 7 }, (_, i) => ({ x: 540 + (i - 3) * 118, y: 1040 + Math.pow(Math.abs(i - 3), 1.6) * 26, rot: (i - 3) * 9.5 }))
  const DEAL_ORDER = [0, 6, 1, 5, 2, 4, 3]
  function drawCard(cx, cy, w, h, rot, a = 1) {
    if (a <= 0 || !back.complete || !back.naturalWidth) return
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.globalAlpha = a
    x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 30; x.shadowOffsetY = 12
    x.drawImage(back, -w / 2, -h / 2, w, h); x.restore()
  }
  const sceneOff = t => sceneDY(t)
  const LAND = { x: P2.x, y: P2.y - 260 }
  function drawDeck(t) {
    if (t < T.deal[0] - 0.6 || t > T.starFall[1] + 0.1) return
    for (const pass of [0, 1]) DEAL_ORDER.forEach((ci, k) => {
      if (pass === 0 && ci !== 3) return
      const F = FAN[ci], td = T.deal[k], t0 = td - 0.42
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, td))
      const sx0 = F.x + 600 - ci * 40, sy0 = -380
      let cx = lerp(sx0, F.x, p), cy = lerp(sy0, F.y, p) + 6 * Math.sin((t - td) * 2.2 + ci)
      let rot = lerp(F.rot + 60, F.rot, p), sc = lerp(0.35, 1, p)
      if (p < 1 && pass === 1) {   // shooting-star trail
        const tx = cx + (sx0 - F.x) * 0.45 * (1 - p * 0.5), ty = cy + (sy0 - F.y) * 0.45 * (1 - p * 0.5)
        const g = x.createLinearGradient(cx, cy, tx, ty)
        g.addColorStop(0, rgba(GOLD, 0.9)); g.addColorStop(1, rgba(GOLD, 0))
        x.save(); x.strokeStyle = g; x.lineWidth = 18 * (1 - p) + 4; x.lineCap = 'round'; x.shadowColor = GOLD; x.shadowBlur = 20
        x.beginPath(); x.moveTo(cx, cy); x.lineTo(tx, ty); x.stroke(); x.restore()
      }
      const land = t > td ? 0.06 * Math.exp(-(t - td) * 8) * Math.cos((t - td) * 26) : 0
      let a = clamp(prog(t, t0, t0 + 0.1))
      if (ci !== 3) {
        // side cards dim a touch when the hero glows, then sweep off to the sides
        a *= 1 - 0.3 * clamp(prog(t, T.glow, T.glow + 0.4))
        const o = ease.inCubic(prog(t, T.cardsOut + k * 0.03, T.cardsOut + k * 0.03 + 0.38))
        if (o >= 1) return
        cx += (ci - 3) * 300 * o; cy += 260 * o; rot += (ci - 3) * 22 * o; a *= 1 - o
        drawCard(cx, cy, CW * sc * (1 + land), CH * sc * (1 - land), rot, a)
      } else {
        const lp = easeOutBack(prog(t, T.glow, T.glow + 0.45), 1.6)
        cy -= 170 * lp; sc *= 1 + 0.42 * lp; rot = lerp(rot, 0, clamp(lp))
        const gk = clamp(prog(t, T.glow, T.glow + 0.35))
        const sh = prog(t, T.cardsOut, T.starFall[0] + 0.2)
        const fp = prog(t, T.starFall[0] + 0.12, T.starFall[1])
        const shE = ease.inCubic(sh)
        if (gk > 0 && pass === 0) {
          const pulse = 1 + 0.08 * Math.sin((t - T.glow) * 6.3)
          x.save(); x.globalCompositeOperation = 'lighter'
          const R = 470 * gk * pulse * (1 - 0.8 * shE)
          const ag = x.createRadialGradient(cx, cy, 30, cx, cy, R)
          ag.addColorStop(0, rgba(GOLD, 0.6 * (1 - fp))); ag.addColorStop(0.45, rgba(PINK, 0.22 * (1 - fp))); ag.addColorStop(1, rgba(PINK, 0))
          x.fillStyle = ag; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill()
          x.translate(cx, cy); x.rotate((t - T.glow) * 0.4)
          const rg = x.createRadialGradient(0, 0, 120, 0, 0, 600)
          rg.addColorStop(0, rgba('#ffd98a', 0.32 * gk * (1 - shE))); rg.addColorStop(1, rgba('#ffd98a', 0))
          x.fillStyle = rg
          for (let r = 0; r < 10; r++) {
            x.rotate(TAU / 10)
            x.beginPath(); x.moveTo(0, 0); x.lineTo(-34, -600); x.lineTo(34, -600); x.closePath(); x.fill()
          }
          x.restore()
        }
        if (pass === 0) return
        if (sh < 1) {
          const ss = 1 - shE
          drawCard(cx, cy, CW * sc * (1 + land) * ss, CH * sc * (1 - land) * ss, rot + 200 * shE, a * (sh > 0.85 ? 1 - (sh - 0.85) / 0.15 : 1))
          if (gk > 0) {
            x.save(); x.translate(cx, cy); x.rotate((rot + 200 * shE) * D2R); x.globalAlpha = gk * (0.55 + 0.35 * Math.sin((t - T.glow) * 6.3)) * ss
            const rw = CW * sc * ss * 0.87, rh = CH * sc * ss * 0.895
            x.beginPath(); x.roundRect(-rw / 2, -rh / 2, rw, rh, 20 * sc * ss); ink(x, GOLD, { w: 7, fa: 0, glow: 34 })
            x.restore()
          }
        }
        if (sh > 0.6) {
          const sx = lerp(cx, LAND.x, ease.inOutCubic(fp)), sy = lerp(cy, LAND.y + sceneOff(t), ease.inCubic(fp)) - 160 * Math.sin(Math.PI * fp)
          const sz = Math.round((40 + 20 * Math.sin(t * 12)) / 4) * 4
          x.save(); x.globalAlpha = clamp((sh - 0.6) * 4) * (1 - prog(t, T.starFall[1] - 0.04, T.starFall[1] + 0.06))
          x.globalCompositeOperation = 'lighter'
          const gr = x.createRadialGradient(sx, sy, 0, sx, sy, 120)
          gr.addColorStop(0, rgba(GOLD, 0.8)); gr.addColorStop(1, rgba(GOLD, 0))
          x.fillStyle = gr; x.beginPath(); x.arc(sx, sy, 120, 0, TAU); x.fill()
          x.globalCompositeOperation = 'source-over'
          drawPixelStar(x, sx, sy, sz, 0, '#fff3d0')
          x.restore()
          for (let j = 1; j < 7; j++) {
            const tt = t - j * 0.045, fq = prog(tt, T.starFall[0] + 0.12, T.starFall[1])
            if (fq <= 0 || fq >= 1) continue
            const qx = lerp(cx, LAND.x, ease.inOutCubic(fq)), qy = lerp(cy, LAND.y + sceneOff(tt), ease.inCubic(fq)) - 160 * Math.sin(Math.PI * fq)
            x.save(); x.globalAlpha = (1 - j / 7) * 0.9; drawPixelStar(x, qx, qy, 12, j % 3, j % 2 ? GOLD : PINK); x.restore()
          }
        }
        sparkle(x, cx, cy, t, T.glow + 0.15, { n: 14, R: 360, seed: 44, size: 30 })
      }
      sparkle(x, F.x, F.y - 40, t, td, { n: 8, R: 160, seed: 30 + k, size: 24 })
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.sceneOut[1]) { drawStreet(t); drawDeck(t) }
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
function lerpC(a, b, k) { const A1 = h2r(a), B1 = h2r(b); return `rgb(${A1.map((v, i) => Math.round(lerp(v, B1[i], k))).join(',')})` }
/** a chunky glowing heart centred at (px, py), ≈ 70·s wide */
function heart(x, px, py, s, a = 1) {
  if (s <= 0 || a <= 0) return
  x.save(); x.translate(px, py); x.scale(s, s); x.globalAlpha *= a
  x.beginPath(); x.moveTo(0, 26); x.bezierCurveTo(-46, -4, -36, -44, 0, -20); x.bezierCurveTo(36, -44, 46, -4, 0, 26); x.closePath()
  ink(x, PINK, { w: 6, fa: 0.85, fill: PINK, glow: 22 })
  x.restore()
}

export const SCENES = [build]

// ── sound (pitched SFX are shifted into the film's key by the sound engine)
const NOTE = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 1046.5, 1174.66]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ['whoosh', 0.04, 0.5, 0.03], ...wordPops(T.hook, 4, 0.08, 0, 0.03),
  ['pop', T.sign, 783.99, 0.035, 0.2], ['glitter', 0.35, 0.95], ['pop', T.walker + 0.15, 659.25, 0.035, -0.3],
  ['pop', T.taco1, 880, 0.05, 0.15], ['whoosh', T.hop1[0], 0.3, 0.025], ['pluck', T.hop1[1], 1046.5, 0.045, 0.4, 0],
  ['pluck', T.alone, 659.25, 0.05, 0.6, -0.1], ['pop', T.alone, 880, 0.05, -0.1],
  ['pluck', T.again, 523.25, 0.05, 0.7, 0.1], ['pop', T.again, 659.25, 0.05, 0.1],
  ...[0, 1, 2, 3].map(k => ['tick', r3(T.sputter + k * 0.17), 0.03]),
  // tilt up + deck
  ['riser', 2.85, T.tilt[1], 0.04], ['whoosh', T.tilt[0], 0.6, 0.04],
  ...wordPops(T.turn, 4, 0.07, 2, 0.024), ['pluck', T.turnLate, 1046.5, 0.05, 0.6, 0], ['pop', T.turnLate, 1318.51, 0.04, 0],
  ...T.deal.map(s => ['whoosh', r3(s - 0.36), 0.3, 0.022]),
  ...T.deal.map((s, i) => ['pop', r3(s), [523.25, 587.33, 659.25, 698.46, 783.99, 880, 1046.5][i], 0.045, ((i % 2) - 0.5) * 0.5]),
  ['bell', T.glow, 1046.5, 0.05, 2.0, 0], ['bell', r3(T.glow + 0.07), 1567.98, 0.03, 2.0, 0.2], ['glitter', T.glow, r3(T.glow + 0.8)],
  ...wordPops(T.sub, 3, 0.08, 1, 0.022), ['pluck', T.subLate, 1174.66, 0.045, 0.5, 0.2],
  // star falls back to the truck
  ['whoosh', T.cardsOut, 0.5, 0.04], ['glitter', T.starFall[0], T.starFall[1]],
  ...wordPops(T.end, 3, 0.08, 0, 0.026), ['pluck', T.endLate, 1046.5, 0.05, 0.6, 0], ['pop', T.endLate, 1318.51, 0.045, 0],
  ['bell', T.friend, 783.99, 0.05, 1.8, 0], ['bell', r3(T.friend + 0.08), 1174.66, 0.035, 1.8, 0.2],
  ['pop', T.taco2, 880, 0.045, 0.3], ['whoosh', T.hop2[0], 0.3, 0.025], ['pluck', T.hop2[1], 987.77, 0.04, 0.4, 0.2],
  ['bell', T.clink, 1567.98, 0.05, 1.6, 0], ['bell', r3(T.clink + 0.05), 2093, 0.03, 1.4, 0.1], ['glitter', T.clink, r3(T.clink + 0.7)],
]
