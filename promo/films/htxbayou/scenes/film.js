// htxbayou (15 s vertical Align ad) · story 0–10.6, then the shared END CARD ("come" + the logo).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–3.05  HOOK  "Perfect date: | a sunset walk on | *Buffalo Bayou.*" — a winding bayou runs to a sunset behind a
//              generic skyline; a pictogram walks the trail alone, stepping on the beat; an empty dashed slot beside
//              them pops a "?" (2.27).
//   3.10–4.85  "Who *with?*" — the walker stops and looks left, right; little "?"s bubble up.
//   4.85–8.25  ON ALIGN  the camera tilts up into the sky: "Tonight's deck, | dealt from the *stars.*" Five card backs
//              shoot in like falling stars and fan out; the centre card lifts and glows (6.45). "A new deck, *every night.*"
//   8.20–10.45 the glowing card shrinks to a star and falls back to the (now night-time) bayou, far down the trail: a
//              gold figure appears out there and a gold trail joins them. "Your walk | *partner* is out there."
//   10.45→     plain sky only (SKY_H + grain), the end card takes over at 10.6.
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'

export const STORY_END = 10.6
const H = 1920
const BEAT = n => 0.6 + n * 0.5556
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', SUN = '#ffb36b', VIOLET = '#c9a6ff', BLUE = '#8fd8f6'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const D2R = Math.PI / 180, TAU = Math.PI * 2
const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

// ── the timeline
export const T = {
  hook: 0.08, hookLate: 0.82, river: 0.0, city: 0.1, walker: 0.45, slot: 2.05, q: BEAT(3), hookOut: [2.88, 3.05],
  who: 3.12, whoLate: BEAT(5), stop: [2.9, 3.35], look: 3.45, whoOut: [4.68, 4.85],
  tilt: [4.75, 5.3], turn: 4.98, turnLate: 5.5, deal: [5.2, 5.45, 5.7, 5.95, 6.2], glow: 6.45, sub: 6.62, turnOut: [8.05, 8.25], cardsOut: 8.0,
  back: [8.15, 8.7], end: 8.42, starFall: [8.35, 9.05], figure: 9.05, trail: [9.25, 9.95], endOut: [10.25, 10.45], sceneOut: [10.05, 10.45],
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
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
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

// ── the bayou: ground plane in perspective. Horizon at HZ; world depth z ≥ 1 (z = 1 is the bottom of the frame)
const HZ = 1010, K = H - HZ, S = 760
const yOf = z => HZ + K / z
const xOf = (u, z) => 540 + (u * S) / z
const riverU = z => 0.62 * Math.sin(1.05 * z + 0.2) + 0.25        // the bayou's centre line (world u)
const RIVER_W = 0.36
const pathU = z => riverU(z) - 0.98                                // the trail runs along the left bank
const PATH_W = 0.27
const WALK_Z = 1.5, FAR_Z = 3.8
const walkerZ = t => WALK_Z + 0.07 * Math.min(t, 3.1) / 3.1
// lollipop trees on the banks (u offset from the river, z)
const TREES = [
  { side: 1, off: 0.8, z: 2.2, h: 1.0 }, { side: 1, off: 1.0, z: 3.4, h: 1.1 }, { side: -1, off: 1.55, z: 3.0, h: 0.95 },
  { side: 1, off: 0.75, z: 5.4, h: 1.2 }, { side: -1, off: 1.45, z: 6.5, h: 1.1 }, { side: 1, off: 1.6, z: 1.55, h: 1.05 },
  { side: -1, off: 1.7, z: 1.9, h: 1.0 }, { side: 1, off: 1.05, z: 8.5, h: 1.2 },
]
// a generic skyline on the horizon (no real tower outlines)
const TOWERS = (() => {
  const r = rng(31), out = []
  let px = 190
  while (px < 900) {
    const mid = 1 - Math.min(1, Math.abs(px - 560) / 380)
    const w = 30 + r() * 40, h = 36 + r() * 50 + mid * (50 + r() * 110)
    out.push({ x: px, w, h, top: ['flat', 'spire', 'slant', 'step', 'flat'][Math.floor(r() * 5)], seed: r() * 100 })
    px += w + 3 + r() * 12
  }
  return out
})()
function towerPath(x, b, h) {
  const l = b.x, r = b.x + b.w, y = -h, m = b.x + b.w / 2
  x.beginPath(); x.moveTo(l, 0)
  switch (b.top) {
    case 'spire': x.lineTo(l, y + 16); x.lineTo(m - 5, y + 6); x.lineTo(m, y - 34); x.lineTo(m + 5, y + 6); x.lineTo(r, y + 16); break
    case 'slant': x.lineTo(l, y + 26); x.lineTo(r, y); break
    case 'step': x.lineTo(l, y + 24); x.lineTo(l + b.w * 0.25, y + 24); x.lineTo(l + b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y + 24); x.lineTo(r, y + 24); break
    default: x.lineTo(l, y); x.lineTo(r, y)
  }
  x.lineTo(r, 0); x.closePath()
}

/** a pictogram person seen from behind (no face). (px, py) = feet, s = scale (≈ 300 px tall at 1).
 *  step: walk phase (radians), amp 0..1 how much they stride; look −1..1 turns the head; col = fill/outline */
function person(x, px, py, s, { step = 0, amp = 1, look = 0, a = 1, col = VIOLET, line = BONE, dashed = false, glow = 14, fa = 0.32 } = {}) {
  if (a <= 0 || s <= 0) return
  x.save(); x.translate(px, py); x.scale(s, s); x.globalAlpha *= a
  if (dashed) x.setLineDash([16, 14])
  const sw = Math.sin(step) * amp, bob = Math.abs(Math.cos(step)) * amp * 6
  x.translate(0, -bob)
  const lw = 10 / Math.max(0.4, s) * 0.9
  // legs (thick strokes swinging from the hips)
  ;[-1, 1].forEach(d => {
    const kx = d * 18 + sw * d * 22
    x.beginPath(); x.moveTo(d * 18, -120); x.lineTo(kx, -6 + Math.max(0, sw * d) * 6)
    ink(x, line, { w: 26, fa: 0, glow: glow * 0.6 })
  })
  // body
  x.beginPath(); x.moveTo(-44, -112); x.lineTo(-38, -222); x.quadraticCurveTo(-38, -254, 0, -256); x.quadraticCurveTo(38, -254, 38, -222); x.lineTo(44, -112); x.closePath()
  if (!dashed) { x.fillStyle = '#1c1238'; x.fill() }
  ink(x, line, { w: 9, fa: dashed ? 0 : fa, fill: col, glow })
  // arms swing opposite the legs
  ;[-1, 1].forEach(d => {
    x.beginPath(); x.moveTo(d * 40, -226); x.lineTo(d * 54 - sw * d * 16, -140)
    ink(x, line, { w: 16, fa: 0, glow: glow * 0.5 })
  })
  // head
  x.beginPath(); x.arc(look * 8, -292, 32, 0, TAU)
  ink(x, line, { w: 9, fa: dashed ? 0 : 0.85, fill: line, glow })
  x.restore()
}

/** a lollipop tree at screen (px, base) and scale s */
function tree(x, px, base, s, t, seed, a = 1, night = 0) {
  if (s <= 0 || a <= 0) return
  x.save(); x.translate(px, base); x.scale(s, s); x.globalAlpha *= a
  const sway = 3 * Math.sin(t * 1.4 + seed)
  x.beginPath(); x.moveTo(0, 0); x.lineTo(sway * 0.3, -110); ink(x, '#b39ce8', { w: 12, fa: 0, glow: 6 })
  x.beginPath(); x.ellipse(sway, -170, 66, 78, 0, 0, TAU)
  ink(x, night > 0.5 ? '#7fd0c0' : '#7fe0a8', { w: 9, fa: 0.3, glow: 14, fill: '#2fc79a' })
  x.restore()
}

/** the "?" glyph: a bold rounded question mark, centred at (px, py), height ≈ 120·s */
function qmark(x, px, py, s, col, a = 1, rot = 0) {
  if (s <= 0 || a <= 0) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(s, s); x.globalAlpha *= a
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `900 150px ${INTER}`
  x.shadowColor = col; x.shadowBlur = 24
  x.lineWidth = 10; x.strokeStyle = 'rgba(12,8,30,0.9)'; x.lineJoin = 'round'; x.strokeText('?', 0, 0)
  x.fillStyle = col; x.fillText('?', 0, 0)
  x.restore()
}

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "900 150px Inter", "700 62px Inter", "italic 500 150px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const back = new Image(); back.src = A + 'card-back.png'
  try { await back.decode() } catch (_) { /* drawn only when loaded */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('HOUSTON, TX', SUN), 0.05, T.hookOut], [eyebrow('ON ALIGN'), T.turn, T.turnOut]]
  const H0 = popText(root, 'Perfect date: | a sunset walk on | *Buffalo* *Bayou.*', { top: 200, size: 96, accentSize: 150, at: T.hook, gap: 0.06, late: 2, lateAt: T.hookLate, lateGap: 0.1, wobble: true, accentColor: SUN, lineHeight: 1.0 })
  const H1 = popText(root, 'Who *with?*', { top: 230, size: 170, accentSize: 190, at: T.who, late: 1, lateAt: T.whoLate, wobble: true, accentColor: PINK })
  const H2 = popText(root, "Tonight's deck, | dealt from the *stars.*", { top: 205, size: 100, accentSize: 128, at: T.turn, gap: 0.07, late: 1, lateAt: T.turnLate, wobble: true, accentColor: GOLD })
  const S2 = popText(root, 'A new deck, | *every* *night.*', { top: TYPE.subY - 10, size: 70, weight: 700, accentSize: 92, at: T.sub, gap: 0.08, accentColor: PINK })
  const H3 = popText(root, 'Your walk *partner* | is out there.', { top: 205, size: 96, accentSize: 124, at: T.end, gap: 0.08, accentColor: PINK, wobble: true, late: 0 })
  const HEADS = [[H0, T.hookOut], [H1, T.whoOut], [H2, T.turnOut], [S2, T.turnOut], [H3, T.endOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // camera: the bayou slides down out of frame (we tilt up into the stars) for the deck, and back for the end
  const sceneDY = t => 1150 * ease.inOutCubic(prog(t, ...T.tilt)) * (1 - ease.inOutCubic(prog(t, ...T.back)))
  const sceneA = t => (t < T.tilt[1] ? 1 : t < T.back[0] ? 0 : 1) * outK(t, T.sceneOut) * (t < T.back[0] ? 1 - ease.inQuad(prog(t, T.tilt[0] + 0.15, T.tilt[1])) : ease.outQuad(prog(t, T.back[0], T.back[0] + 0.25)))
  const nightK = t => ease.inOutQuad(prog(t, 3.0, 4.6))                 // the sun goes down during "Who with?"

  // ── the bayou scene
  function drawBayou(t) {
    const a = sceneA(t)
    if (a <= 0) return
    const dy = sceneDY(t), night = nightK(t)
    const open = ease.outCubic(prog(t, 0, 0.7))
    x.save(); x.translate(0, dy + (1 - open) * 140); x.globalAlpha = a

    // sunset glow over the nebula, rising from the horizon
    const sunK = 1 - night
    if (sunK > 0) {
      const g = x.createLinearGradient(0, HZ - 620, 0, HZ)
      g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(0.55, rgba('#e8628a', 0.28 * sunK)); g.addColorStop(1, rgba(SUN, 0.62 * sunK))
      x.fillStyle = g; x.fillRect(0, HZ - 620, W, 620)
      // the sun: a big disc with retro slats, sinking slowly
      const sy = HZ - 150 + 70 * prog(t, 0, 3.0) + 260 * ease.inQuad(night)
      const sr = 250 * pop01(t, 0.05, 0.6, 1.4)
      if (sr > 0) {
        x.save(); x.beginPath(); x.rect(0, 0, W, HZ); x.clip()
        x.globalCompositeOperation = 'lighter'
        const hg = x.createRadialGradient(540, sy, sr * 0.6, 540, sy, sr * 2.4)
        hg.addColorStop(0, rgba(SUN, 0.42 * sunK)); hg.addColorStop(1, rgba(SUN, 0))
        x.fillStyle = hg; x.beginPath(); x.arc(540, sy, sr * 2.4, 0, TAU); x.fill()
        x.globalCompositeOperation = 'source-over'
        const sg = x.createLinearGradient(0, sy - sr, 0, sy + sr)
        sg.addColorStop(0, '#ffe08a'); sg.addColorStop(0.5, '#ff9a5a'); sg.addColorStop(1, '#ff5f7e')
        x.beginPath(); x.arc(540, sy, sr, 0, TAU)
        for (let k = 0; k < 5; k++) { const yy = sy + sr * (0.12 + k * 0.17); x.rect(540 - sr - 2, yy, sr * 2 + 4, 6 + k * 3.2) }
        x.fillStyle = sg; x.globalAlpha = a * sunK; x.fill('evenodd')
        x.restore()
      }
    }

    // skyline on the horizon, springing up tower by tower
    TOWERS.forEach((b, i) => {
      const k = pop01(t, T.city + Math.abs(b.x - 540) * 0.0009 + (i % 3) * 0.03, 0.42, 1.6)
      if (k <= 0) return
      const h = b.h * k
      x.save(); x.translate(0, HZ)
      towerPath(x, b, h); x.fillStyle = '#140c2e'; x.fill()
      x.save(); x.clip()
      for (let wy = -h + 18; wy < -10; wy += 22) for (let wx = b.x + 7; wx < b.x + b.w - 9; wx += 15) {
        const lit = noise1(wx * 0.37 + wy * 0.21, 4 + b.seed)
        if (lit > 0.6 - 0.25 * night) { x.fillStyle = rgba('#ffd98a', (0.35 + 0.5 * night) * (0.7 + 0.3 * noise1(t * 0.7 + wx, wy))); x.fillRect(wx, wy, 6, 9) }
      }
      x.restore()
      towerPath(x, b, h); x.strokeStyle = rgba(night > 0.5 ? VIOLET : PINK, 0.75); x.lineWidth = 3; x.shadowColor = PINK; x.shadowBlur = 8; x.stroke(); x.shadowBlur = 0
      x.restore()
    })

    // ground below the horizon
    const gg = x.createLinearGradient(0, HZ, 0, H)
    gg.addColorStop(0, rgba('#2a1640', 1)); gg.addColorStop(1, '#0c0720')
    x.fillStyle = gg; x.fillRect(0, HZ, W, H - HZ + 200)
    x.strokeStyle = rgba(night > 0.5 ? VIOLET : SUN, 0.8); x.lineWidth = 4; x.shadowColor = SUN; x.shadowBlur = 14
    x.beginPath(); x.moveTo(0, HZ); x.lineTo(W, HZ); x.stroke(); x.shadowBlur = 0

    // the bayou ribbon: sampled polygon, drawn on from the horizon toward us at the open
    const zs = []
    for (let z = 60; z >= 0.92; z /= 1.045) zs.push(z)
    const drawn = ease.outCubic(prog(t, T.river, T.river + 0.55))
    const zMin = lerp(60, 0.92, drawn)
    const band = (cu, hw) => {
      x.beginPath()
      const zz = zs.filter(z => z >= zMin)
      zz.forEach((z, i) => { const px = xOf(cu(z) - hw, z), py = yOf(z); i ? x.lineTo(px, py) : x.moveTo(px, py) })
      for (let i = zz.length - 1; i >= 0; i--) x.lineTo(xOf(cu(zz[i]) + hw, zz[i]), yOf(zz[i]))
      x.closePath()
      return zz
    }
    if (drawn > 0) {
      // water
      band(riverU, RIVER_W)
      const wg = x.createLinearGradient(0, HZ, 0, H)
      wg.addColorStop(0, lerpC('#ff9a6a', '#7f86e0', night)); wg.addColorStop(0.35, lerpC('#b0487e', '#3a3a8a', night)); wg.addColorStop(1, '#1a1446')
      x.fillStyle = wg; x.fill()
      x.save(); x.clip()
      // shimmering reflection slats (sun gold at dusk, moon silver at night)
      for (let k = 0; k < 22; k++) {
        const z = 1 + Math.pow(k / 22, 1.6) * 13
        const py = yOf(z), cx = xOf(riverU(z), z) + 30 * Math.sin(t * 1.3 + k), w = (0.5 * S / z) * (0.4 + 0.6 * noise1(t * 1.6 + k * 0.7, k))
        x.globalAlpha = a * (0.35 + 0.4 * noise1(t * 2 + k, 7)) * clamp(1.2 - k / 30)
        x.fillStyle = night > 0.5 ? '#e3ecff' : '#ffd98a'
        x.beginPath(); x.roundRect(cx - w / 2, py, w, Math.max(2, 9 / z), 4); x.fill()
      }
      x.globalAlpha = a
      x.restore()
      band(riverU, RIVER_W); x.fillStyle = 'rgba(0,0,0,0)'; ink(x, BLUE, { w: 5, fa: 0, glow: 16 })
      // the trail: a pale walkway with paver ticks
      band(pathU, PATH_W)
      x.fillStyle = rgba('#d9b98a', 0.2); x.fill()
      ink(x, BONE, { w: 5, fa: 0, glow: 12 })
      x.save(); x.strokeStyle = rgba(BONE, 0.35)
      for (let z = 1.0; z < 30 && z >= zMin; z *= 1.16) {
        x.lineWidth = Math.max(1, 6 / z)
        x.beginPath(); x.moveTo(xOf(pathU(z) - PATH_W * 0.75, z), yOf(z)); x.lineTo(xOf(pathU(z) + PATH_W * 0.75, z), yOf(z)); x.stroke()
      }
      x.restore()
    }
    // trees, far → near
    const ts = TREES.map((tr, i) => ({ ...tr, i })).sort((p, q) => q.z - p.z)
    for (const tr of ts) {
      if (tr.z < zMin) continue
      const u = tr.side > 0 ? riverU(tr.z) + RIVER_W + tr.off : pathU(tr.z) - PATH_W - tr.off + 0.9
      const k = pop01(t, 0.35 + tr.i * 0.06, 0.4, 2.2)
      tree(x, xOf(u, tr.z), yOf(tr.z), (1.25 * tr.h / tr.z) * k, t, tr.i, 1, night)
    }

    // the far figure (end): a gold silhouette way down the trail; a gold trail draws from us to them
    const FZ = FAR_Z, fx = xOf(pathU(FZ) + 0.1, FZ), fy = yOf(FZ)
    if (t > T.starFall[0]) {
      const lk = ease.inOutCubic(prog(t, ...T.trail))
      if (lk > 0) {
        x.save(); x.setLineDash([2, 22]); x.lineCap = 'round'
        x.beginPath()
        const z0 = walkerZ(t) * 1.32, z1 = lerp(z0, FZ - 0.2, lk)
        for (let z = z0, i = 0; z <= z1; z *= 1.02, i++) { const px = xOf(pathU(z), z), py = yOf(z); i ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.strokeStyle = GOLD; x.lineWidth = 15; x.shadowColor = GOLD; x.shadowBlur = 24; x.stroke()
        x.restore()
      }
      const fk = pop01(t, T.figure, 0.45, 2.4)
      if (fk > 0) {
        const pulse = 1 + 0.08 * Math.sin((t - T.figure) * 6)
        x.save(); x.globalCompositeOperation = 'lighter'
        const gr = x.createRadialGradient(fx, fy - 40, 0, fx, fy - 40, 190 * fk * pulse)
        gr.addColorStop(0, rgba(GOLD, 0.55)); gr.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = gr; x.beginPath(); x.arc(fx, fy - 40, 190 * fk * pulse, 0, TAU); x.fill()
        x.restore()
        person(x, fx, fy, (1.5 / FZ) * fk, { step: (t - 0.6) * 5.655, amp: 0.8, col: GOLD, line: '#ffe7a8', glow: 24, fa: 0.6 })
      }
      sparkle(x, fx, fy - 50, t, T.figure, { n: 12, R: 170, seed: 61, size: 26 })
    }

    // our walker (+ the empty dashed slot beside them during the hook)
    const wz = walkerZ(t), wx = xOf(pathU(wz) - 0.13, wz), wy = yOf(wz)
    const ws = (1.5 / wz) * pop01(t, T.walker, 0.42, 2.2)
    const amp = 1 - ease.inOutQuad(prog(t, ...T.stop)) + ease.inOutQuad(prog(t, T.figure + 0.15, T.figure + 0.5))
    const look = t > T.look ? Math.sin((t - T.look) * 4.2) * clamp((t - T.look) * 3) * (1 - prog(t, 4.6, 4.9)) : 0
    // the empty slot beside them + "?"
    const slotK = pop01(t, T.slot, 0.4, 2.0) * (1 - prog(t, T.whoOut[0], T.whoOut[1] + 0.2))
    const sx = xOf(pathU(wz) + 0.2, wz) + 30
    if (slotK > 0) {
      x.save(); x.globalAlpha = a * (0.55 + 0.25 * Math.sin(t * 5))
      person(x, sx, wy, ws * 0.98 * slotK, { col: PINK, line: PINK, dashed: true, amp: 0, glow: 10 })
      x.restore()
      const qk = pop01(t, T.q, 0.42, 3.0)
      const qbob = 10 * Math.sin((t - T.q) * 4)
      qmark(x, sx, wy - 420 * ws - 70 + qbob, 1.25 * qk * (1 + 0.06 * Math.sin((t - T.q) * 8) * Math.exp(-(t - T.q) * 2)), PINK, clamp(qk * 3), 8 * D2R * Math.sin((t - T.q) * 3))
      sparkle(x, sx, wy - 420 * ws - 70, t, T.q, { n: 10, R: 190, seed: 12, size: 26, cols: [PINK, '#fff3e0', VIOLET] })
      // little "?"s bubble up while they look around
      for (let k = 0; k < 4; k++) {
        const t0 = T.look + 0.08 + k * 0.28
        const p = prog(t, t0, t0 + 1.1)
        if (p <= 0 || p >= 1) continue
        const qx = wx + (k % 2 ? 170 : -150) + 20 * Math.sin(p * 6 + k), qy = wy - 420 * ws - 40 - 260 * ease.outCubic(p)
        qmark(x, qx, qy, 0.42 * easeOutBack(clamp(p * 4), 2.5), k % 2 ? VIOLET : BLUE, 1 - ease.inQuad(p))
      }
    }
    person(x, wx, wy, ws, { step: (t - 0.6) * 5.655, amp, look, col: VIOLET })
    sparkle(x, wx, wy - 150, t, T.walker + 0.15, { n: 8, R: 140, seed: 5, size: 22 })
    x.restore()
  }

  // ── the deck: card backs shoot in like falling stars and fan; the centre card lifts and glows
  const CW = 300, CH = Math.round(300 * 2347 / 1528)
  const FAN = [0, 1, 2, 3, 4].map(i => ({ x: 540 + (i - 2) * 132, y: 1060 + Math.abs(i - 2) * 30, rot: (i - 2) * 11 }))
  const DEAL_ORDER = [0, 4, 1, 3, 2]
  function drawCard(cx, cy, w, h, rot, a = 1) {
    if (a <= 0 || !back.complete || !back.naturalWidth) return
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.globalAlpha = a
    x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 30; x.shadowOffsetY = 12
    x.drawImage(back, -w / 2, -h / 2, w, h); x.restore()
  }
  // where the glowing card becomes a star and where that star lands (on the far trail, in scene space at rest)
  const FZ = FAR_Z, LAND = { x: xOf(pathU(FZ) + 0.1, FZ), y: yOf(FZ) - 60 }
  function drawDeck(t) {
    if (t < T.deal[0] - 0.6 || t > T.starFall[1] + 0.1) return
    for (const pass of [0, 1]) DEAL_ORDER.forEach((ci, k) => {
      if (pass === 0 && ci !== 2) return
      const F = FAN[ci], td = T.deal[k], t0 = td - 0.45
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, td))
      const sx0 = F.x + 560, sy0 = -360
      let cx = lerp(sx0, F.x, p), cy = lerp(sy0, F.y, p) + 6 * Math.sin((t - td) * 2.2 + ci)
      let rot = lerp(F.rot + 55, F.rot, p), sc = lerp(0.35, 1, p)
      if (p < 1 && pass === 1) {   // shooting-star trail
        const tx = cx + (sx0 - F.x) * 0.45 * (1 - p * 0.5), ty = cy + (sy0 - F.y) * 0.45 * (1 - p * 0.5)
        const g = x.createLinearGradient(cx, cy, tx, ty)
        g.addColorStop(0, rgba(GOLD, 0.9)); g.addColorStop(1, rgba(GOLD, 0))
        x.save(); x.strokeStyle = g; x.lineWidth = 18 * (1 - p) + 4; x.lineCap = 'round'; x.shadowColor = GOLD; x.shadowBlur = 20
        x.beginPath(); x.moveTo(cx, cy); x.lineTo(tx, ty); x.stroke(); x.restore()
      }
      const land = t > td ? 0.06 * Math.exp(-(t - td) * 8) * Math.cos((t - td) * 26) : 0
      const isHero = ci === 2
      let a = clamp(prog(t, t0, t0 + 0.1))
      if (!isHero) {
        // side cards: sweep off to the sides at the end
        const o = ease.inCubic(prog(t, T.cardsOut + k * 0.04, T.cardsOut + k * 0.04 + 0.4))
        if (o >= 1) return
        cx += (ci - 2) * 420 * o; cy += 300 * o; rot += (ci - 2) * 30 * o; a *= 1 - o
        drawCard(cx, cy, CW * sc * (1 + land), CH * sc * (1 - land), rot, a)
      } else {
        // the hero card: lifts, straightens and glows; then shrinks into a star that falls to the bayou
        const lp = easeOutBack(prog(t, T.glow, T.glow + 0.45), 1.6)
        cy -= 150 * lp; sc *= 1 + 0.3 * lp; rot = lerp(rot, 0, clamp(lp))
        const gk = clamp(prog(t, T.glow, T.glow + 0.35))
        const sh = prog(t, T.cardsOut, T.starFall[0] + 0.25)            // shrink to a star
        const fp = prog(t, T.starFall[0] + 0.2, T.starFall[1])           // fall to the far trail
        const shE = ease.inCubic(sh)
        if (gk > 0 && pass === 0) {
          const pulse = 1 + 0.08 * Math.sin((t - T.glow) * 6.3)
          x.save(); x.globalCompositeOperation = 'lighter'
          const R = 470 * gk * pulse * (1 - 0.8 * shE)
          const ag = x.createRadialGradient(cx, cy, 30, cx, cy, R)
          ag.addColorStop(0, rgba(GOLD, 0.6 * (1 - fp))); ag.addColorStop(0.45, rgba(PINK, 0.22 * (1 - fp))); ag.addColorStop(1, rgba(PINK, 0))
          x.fillStyle = ag; x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.fill()
          // slow soft rays
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
          if (gk > 0) {   // a gold rim light on the card
            x.save(); x.translate(cx, cy); x.rotate((rot + 200 * shE) * D2R); x.globalAlpha = gk * (0.55 + 0.35 * Math.sin((t - T.glow) * 6.3)) * ss
            const rw = CW * sc * ss * 0.87, rh = CH * sc * ss * 0.895
            x.beginPath(); x.roundRect(-rw / 2, -rh / 2, rw, rh, 20 * sc * ss); ink(x, GOLD, { w: 7, fa: 0, glow: 34 })
            x.restore()
          }
        }
        if (sh > 0.6) {
          // the star, falling in an arc to the far trail (scene slides back up underneath at the same time)
          const sx = lerp(cx, LAND.x + sceneOff(t).x, ease.inOutCubic(fp)), sy = lerp(cy, LAND.y + sceneOff(t).y, ease.inCubic(fp)) - 160 * Math.sin(Math.PI * fp)
          const sz = Math.round((40 + 20 * Math.sin(t * 12)) / 4) * 4
          x.save(); x.globalAlpha = clamp((sh - 0.6) * 4)
          x.globalCompositeOperation = 'lighter'
          const gr = x.createRadialGradient(sx, sy, 0, sx, sy, 120)
          gr.addColorStop(0, rgba(GOLD, 0.8)); gr.addColorStop(1, rgba(GOLD, 0))
          x.fillStyle = gr; x.beginPath(); x.arc(sx, sy, 120, 0, TAU); x.fill()
          x.globalCompositeOperation = 'source-over'
          drawPixelStar(x, sx, sy, sz, 0, '#fff3d0')
          x.restore()
          // a sparkle tail
          for (let k = 1; k < 7; k++) {
            const tt = t - k * 0.045, fq = prog(tt, T.starFall[0] + 0.2, T.starFall[1])
            if (fq <= 0) break
            const qx = lerp(cx, LAND.x, ease.inOutCubic(fq)), qy = lerp(cy, LAND.y + sceneOff(tt).y, ease.inCubic(fq)) - 160 * Math.sin(Math.PI * fq)
            x.save(); x.globalAlpha = (1 - k / 7) * 0.9; drawPixelStar(x, qx, qy, 12, k % 3, k % 2 ? GOLD : PINK); x.restore()
          }
        }
        sparkle(x, cx, cy, t, T.glow + 0.15, { n: 14, R: 360, seed: 44, size: 30 })
      }
      sparkle(x, F.x, F.y - 40, t, td, { n: 9, R: 180, seed: 30 + k, size: 26 })
    })
  }
  const sceneOff = t => ({ x: 0, y: sceneDY(t) })

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.sceneOut[1]) { drawBayou(t); drawDeck(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.35)))
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

export const SCENES = [build]

// ── sound (pitched SFX are shifted into the film's key by the sound engine)
const NOTE = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 1046.5, 1174.66]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ['whoosh', 0.05, 0.6, 0.03], ...wordPops(T.hook, 6, 0.06, 0, 0.026),
  ['pluck', T.hookLate, 880, 0.05, 0.6, 0], ['pop', T.hookLate, 1046.5, 0.05, -0.1], ['pop', r3(T.hookLate + 0.1), 1174.66, 0.05, 0.1],
  ['glitter', 0.2, 0.8], ['pop', T.walker + 0.15, 659.25, 0.04, -0.3],
  ...[1, 2, 3, 4].map(n => ['tick', r3(BEAT(n)), 0.025]),                            // footsteps on the beat
  ['pop', T.slot, 523.25, 0.04, 0.2], ['pluck', T.q, 1046.5, 0.05, 0.5, 0.2], ['pop', T.q, 1318.51, 0.05, 0.2], ['glitter', T.q, T.q + 0.5],
  // who with?
  ['pop', T.who, 698.46, 0.035, 0], ['pluck', T.whoLate, 783.99, 0.05, 0.6, 0], ['pop', T.whoLate, 1174.66, 0.05, 0],
  ...[0, 1, 2, 3].map(k => ['pop', r3(T.look + 0.1 + k * 0.28), [880, 987.77, 1046.5, 1174.66][k], 0.025, k % 2 ? 0.4 : -0.4]),
  // tilt up + deck
  ['riser', 4.45, T.tilt[1], 0.04], ['whoosh', T.tilt[0], 0.6, 0.04],
  ...wordPops(T.turn, 5, 0.07, 2, 0.024), ['pluck', T.turnLate, 1046.5, 0.05, 0.6, 0],
  ...T.deal.map(s => ['whoosh', r3(s - 0.4), 0.35, 0.028]),
  ...T.deal.map((s, i) => ['pop', r3(s), [523.25, 587.33, 659.25, 783.99, 880][i], 0.05, ((i % 2) - 0.5) * 0.4]),
  ['bell', T.glow, 1046.5, 0.05, 2.0, 0], ['bell', r3(T.glow + 0.07), 1567.98, 0.03, 2.0, 0.2], ['glitter', T.glow, r3(T.glow + 0.8)],
  ...wordPops(T.sub, 5, 0.08, 1, 0.022),
  // star falls back to the bayou
  ['whoosh', T.cardsOut, 0.5, 0.04], ['glitter', T.starFall[0], T.starFall[1]],
  ...wordPops(T.end, 6, 0.08, 0, 0.026),
  ['bell', T.figure, 783.99, 0.05, 1.8, 0], ['bell', r3(T.figure + 0.08), 1174.66, 0.035, 1.8, 0.2], ['pop', T.figure, 1046.5, 0.045, 0],
  ['pluck', T.trail[0], 659.25, 0.035, 0.5, -0.2], ['pluck', r3(T.trail[0] + 0.28), 783.99, 0.035, 0.5, 0], ['pluck', r3(T.trail[0] + 0.56), 1046.5, 0.04, 0.6, 0.2],
]
