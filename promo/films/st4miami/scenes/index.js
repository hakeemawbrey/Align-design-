// st4miami (15 s vertical Align ad, Star Talk season 4, EP 078 · thread A, the vote) · story 0–10.6, then the end card.
//   0.00–4.95  "Dear *Miami.*"  Neon palms, a row of generic pastel deco fronts with neon trim. The ♐ Sagittarius star (starsag:
//              the traveller, Jupiter-ruled) rolls in with a sticker-covered suitcase: a pixel bubble, "just visiting!"
//              Little bone stars with their own suitcases roll past behind it, both ways.
//              Box (THE STARS): "everyone's passing through."
//   4.95–8.40  "Don't just | *pass through.*"  Box: "be the one who *says* what they're looking for."  Sagittarius stops, thinks,
//              and flips its luggage tag up big: LOOKING FOR: SOMETHING REAL.
//   8.45 cut → "Say what you're | *here* for."  A bone star rolls up with a matching tag (SOMETHING REAL). Both suitcases
//              park; heart eyes. Everything pops out by 10.45; the end card takes over at 10.6.
// Easter eggs (stlore.js): the constellation (EP 78) top-left, the EP 078 cartouche, the ghost leans out from a deco wall.
// One canvas (sky + palms + fronts + cast), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 78
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const NEON_P = '#ff5fb4', NEON_C = '#5ff2ff', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SAG = signStar('sagittarius')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [4.75, 4.95],
  roll: [0.35, 1.55], bubble: [1.6, 3.9],
  open: 2.3, l1: 2.45,
  h1: 5.0, h1Land: 5.4, l2: 5.0, think: 6.0, tag: 6.55, close: 8.3, h1Out: [8.2, 8.38],
  cut: 8.45,
  h2: 8.5, h2Land: 8.95, mateIn: [8.6, 9.3], h2Out: [10.2, 10.42], out: [10.05, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "everyone's *passing through.*", color: NEON_C },
  { t: T.l2, speaker: SPEAK, text: "be the one who *says* what they're looking for.", color: NEON_P },
]
const CPS = 32
const GHOST = { at: 3.75, x: 822, y: 1205 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
function bits(x, bm, cols, cx, cy, cell, { rot = 0, a = 1, outline = 'rgba(14,8,32,0.9)' } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  if (outline) { x.fillStyle = outline; bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect(ox + (i - 1) * cell, oy + (j - 1) * cell, cell * 3, cell * 3) })) }
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)

// ── layout
const HERO = { x: 470, y: 1010, size: 300 }
const FIN_A = { x: 330, y: 1060, size: 270 }, FIN_B = { x: 760, y: 1060, size: 270 }
// deco fronts: [x, w, top, body, trim]
const FRONTS = [[-10, 280, 1110, '#2b1f4f', NEON_P], [300, 400, 1230, '#24304f', NEON_C], [822, 270, 1050, '#3a2050', MINT]]
const PALMS = [{ x: 150, top: 640, lean: -0.08 }, { x: 960, top: 560, lean: 0.1 }]
// travellers rolling past behind the hero (bone stars with suitcases): [y, size, speed px/s, start x, dir, seed]
const TRAV = [[1262, 104, 230, -120, 1, 41], [1272, 92, 190, 1200, -1, 43], [1258, 98, 260, -700, 1, 47], [1270, 88, 210, 2000, -1, 53]]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 44px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear *Miami.*', { top: 250, size: 130, accentSize: 200, at: T.h0, gap: 0.12, accentColor: NEON_P, wobble: true, late: 1, lateAt: T.h0 + 0.3 })
  const H1 = popText(root, 'Don’t just | *pass through.*', { top: 215, size: 108, accentSize: 156, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, gap: 0.08, accentColor: NEON_C })
  const H2 = popText(root, 'Say what you’re | *here* for.', { top: 210, size: 108, accentSize: 170, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, gap: 0.09, accentColor: NEON_P })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const sceneK = t => popOut(t, T.out)
  function neonStroke(col, wdt, draw, flick = 1) {
    x.save(); x.strokeStyle = col; x.lineWidth = wdt; x.lineCap = 'round'; x.lineJoin = 'round'
    x.shadowColor = col; x.shadowBlur = 24 * flick; x.globalAlpha *= 0.85 + 0.15 * flick
    draw(); x.stroke(); x.shadowBlur = 0; x.lineWidth = wdt * 0.4; x.strokeStyle = '#ffffff'; x.globalAlpha *= 0.7; draw(); x.stroke()
    x.restore()
  }
  function drawFronts(t) {
    const k = clamp(sceneK(t)) * clamp(prog(t, 0.1, 0.5))
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    FRONTS.forEach(([bx, bw, top, body, trim], i) => {
      x.fillStyle = body; x.fillRect(bx, top, bw, H - top)
      // deco steps on top
      x.fillRect(bx + bw * 0.25, top - 30, bw * 0.5, 30); x.fillRect(bx + bw * 0.4, top - 54, bw * 0.2, 24)
      // windows: porthole rows
      x.fillStyle = 'rgba(255,214,150,0.55)'
      for (let wy = top + 50; wy < H; wy += 70) for (let wx = bx + 30; wx < bx + bw - 30; wx += 60) x.fillRect(wx, wy, 26, 30)
      const fl = (i === 1 && (t * 3.1) % 1 < 0.06) ? 0.3 : 1
      neonStroke(trim, 6, () => { x.beginPath(); x.moveTo(bx + 10, top + 24); x.lineTo(bx + bw - 10, top + 24) }, fl)
      neonStroke(trim, 5, () => { x.beginPath(); x.moveTo(bx + bw * 0.25 + 8, top - 18); x.lineTo(bx + bw * 0.75 - 8, top - 18) }, fl)
    })
    x.restore()
  }
  function drawPalm(t, P) {
    const k = clamp(sceneK(t)) * clamp(prog(t, 0.15, 0.6))
    if (k <= 0) return
    const base = 1330, sway = Math.sin(t * 1.3 + P.x) * 10
    const tx = P.x + P.lean * (base - P.top) + sway, ty = P.top
    x.save(); x.globalAlpha = k
    // trunk: stacked pixel segments
    for (let i = 0; i <= 18; i++) {
      const f = i / 18, cx = lerp(P.x, tx, f * f), cy = lerp(base, ty, f)
      x.fillStyle = 'rgba(14,8,32,0.9)'; x.fillRect(cx - 18, cy - 18, 36, 26)
      x.fillStyle = i % 2 ? '#6a3c5e' : '#80496f'; x.fillRect(cx - 14, cy - 14, 28, 20)
    }
    neonStroke(NEON_P, 5, () => { x.beginPath(); for (let i = 0; i <= 18; i++) { const f = i / 18; const cx = lerp(P.x, tx, f * f) - 20, cy = lerp(base, ty, f); i ? x.lineTo(cx, cy) : x.moveTo(cx, cy) } })
    // fronds: neon arcs
    for (let j = 0; j < 6; j++) {
      const a = -Math.PI / 2 + (j - 2.5) * 0.55 + Math.sin(t * 1.6 + j) * 0.05, L = 150 + (j % 2) * 30
      neonStroke(j % 2 ? NEON_C : MINT, 7, () => { x.beginPath(); x.moveTo(tx, ty); x.quadraticCurveTo(tx + Math.cos(a) * L * 0.6, ty + Math.sin(a) * L * 0.6 - 40, tx + Math.cos(a) * L, ty + Math.sin(a) * L + 50) })
    }
    x.fillStyle = '#5a3a20'; x.fillRect(tx - 14, ty - 6, 12, 12); x.fillRect(tx + 2, ty - 2, 12, 12)
    x.restore()
  }
  // a rolling suitcase: body, stripe, stickers, telescoping handle, wheels
  function suitcase(cx, cy, s, t, rolling, { col = '#d8584f', stickers = true, tag = null } = {}) {
    const w = 120 * s, h = 150 * s
    x.save(); x.translate(cx, cy); x.rotate(rolling ? -0.12 + Math.sin(t * 22) * 0.015 : 0)
    // handle
    const hb = (c, o) => { x.fillStyle = c; x.fillRect(-w * 0.28 - o, -h / 2 - 76 * s - o, 8 * s + 2 * o, 78 * s + o); x.fillRect(w * 0.28 - 8 * s - o, -h / 2 - 76 * s - o, 8 * s + 2 * o, 78 * s + o); x.fillRect(-w * 0.28 - o, -h / 2 - 80 * s - o, w * 0.56 + 2 * o, 10 * s + 2 * o) }
    hb('rgba(14,8,32,0.9)', 4 * s); hb('#b8b8cc', 0)
    x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-w / 2 - 6 * s, -h / 2 - 6 * s, w + 12 * s, h + 12 * s)
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(-w / 2, -h / 2, w, 10 * s)
    x.fillStyle = 'rgba(0,0,0,0.18)'; for (const sx of [-0.25, 0, 0.25]) x.fillRect(sx * w - 3 * s, -h / 2 + 12 * s, 6 * s, h - 24 * s)
    if (stickers) {
      x.fillStyle = NEON_C; x.fillRect(-w * 0.38, -h * 0.3, 34 * s, 24 * s)
      x.fillStyle = GOLD; x.beginPath(); x.arc(w * 0.2, h * 0.18, 16 * s, 0, Math.PI * 2); x.fill()
      x.fillStyle = MINT; x.fillRect(-w * 0.1, h * 0.12, 26 * s, 18 * s)
      drawPixelStar(x, w * 0.24, -h * 0.22, 26 * s, 2, BONE)
    }
    // wheels
    x.fillStyle = '#140c2c'; for (const wx of [-w * 0.32, w * 0.32]) { x.beginPath(); x.arc(wx, h / 2 + 10 * s, 11 * s, 0, Math.PI * 2); x.fill() }
    // a little tag hanging off the handle
    if (tag) {
      x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(-w * 0.2, -h / 2 - 76 * s); x.lineTo(-w * 0.5, -h / 2 - 20 * s); x.stroke()
      x.fillStyle = 'rgba(14,8,32,0.9)'; x.fillRect(-w * 0.5 - 36 * s, -h / 2 - 24 * s, 64 * s, 44 * s)
      x.fillStyle = '#fbf2d8'; x.fillRect(-w * 0.5 - 32 * s, -h / 2 - 20 * s, 56 * s, 36 * s)
      x.fillStyle = NEON_P; x.fillRect(-w * 0.5 - 22 * s, -h / 2 - 8 * s, 36 * s, 6 * s); x.fillRect(-w * 0.5 - 22 * s, -h / 2 + 2 * s, 26 * s, 6 * s)
    }
    x.restore()
  }
  function drawTravellers(t) {
    if (t >= T.cut) return
    const k = clamp(sceneK(t))
    for (const [ty, sz, sp, x0, dir, seed] of TRAV) {
      const span = W + 600
      const px = (((x0 + dir * sp * t) % span) + span) % span - 300
      x.save(); x.globalAlpha = k * 0.9
      drawStarChar(x, px, ty, sz, t, { color: STAR.bone, mood: 'happy', seed, bob: 3, look: [dir, 0], tips: false, glow: 0.6 })
      suitcase(px - dir * sz * 0.62, ty + sz * 0.12, sz / 260, t, true, { col: ['#5a7fd0', '#c8a05a', '#7a5ad0', '#d07a9a'][seed % 4], stickers: false })
      x.restore()
    }
  }
  function sagState(t) {
    if (t < T.roll[1]) return { mood: 'happy', look: [1, 0] }
    if (t < T.bubble[1]) return { mood: 'wink', look: [0, 0] }
    if (t < T.think) return { mood: 'neutral', look: [1, 0] }
    if (t < T.tag) return { mood: 'squint', look: [1, -1] }                      // thinking: what AM i looking for?
    if (t < T.tag + 0.6) return { mood: 'wide', look: [1, -1], blink: false }
    return { mood: 'sparkle', look: [0, 0] }
  }
  function drawSag(t) {
    const fin = t >= T.cut
    const ok = sceneK(t)
    let px, py, size, rolling = false
    if (!fin) {
      const e = ease.outCubic(prog(t, ...T.roll))
      px = lerp(-260, HERO.x, e); py = HERO.y; size = HERO.size; rolling = t < T.roll[1]
    } else { px = FIN_A.x; py = FIN_A.y; size = FIN_A.size }
    const pk = (fin ? pop01(t, T.cut + 0.05, 0.34, 2) : 1) * ok
    if (pk <= 0.02 || t < T.roll[0]) return null
    const st = fin ? { mood: t > T.mateIn[1] ? 'heart' : 'happy', look: [1, 0] } : sagState(t)
    const sq = rolling ? -0.06 : 0
    const hops = fin ? [T.mateIn[1], T.mateIn[1] + 0.6] : [T.roll[1] + 0.02, T.tag + 0.05]
    const r = drawStarChar(x, px, py, size * pk, t, { color: SAG.color, glyph: SAG.glyph, ...st, squash: sq, hops, seed: 6, bob: rolling ? 2 : 6 })
    suitcase(px + size * 0.7 * pk, py + size * 0.14, size * pk / 300, t, rolling, { tag: t >= T.tag || fin ? null : 'small' })
    return r
  }
  // the speech bubble: "just visiting!"
  function drawBubble(t) {
    const k = pop01(t, T.bubble[0], 0.3, 2.4) * (1 - ease.inCubic(prog(t, T.bubble[1] - 0.2, T.bubble[1])))
    if (k <= 0.01) return
    const bx = HERO.x - 40, by = 760
    x.save(); x.translate(bx, by); x.scale(k, k); x.rotate(-0.04)
    x.font = `700 40px ${MONO}`; const tw = x.measureText('just visiting!').width + 60
    x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-tw / 2 - 6, -46, tw + 12, 92); x.fillRect(10, 40, 40, 30)
    x.fillStyle = BONE; x.fillRect(-tw / 2, -40, tw, 80); x.fillRect(18, 40, 24, 18); x.fillRect(30, 58, 12, 8)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('just visiting!', 0, 2)
    x.restore()
  }
  // the big luggage tag: LOOKING FOR: SOMETHING REAL
  function bigTag(cx, cy, k, rot, label = 'SOMETHING | REAL') {
    if (k <= 0.01) return
    const w = 390, h = 220
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.fillStyle = 'rgba(14,8,32,0.92)'
    x.beginPath(); x.moveTo(-w / 2 - 8, -h / 2 + 40); x.lineTo(-w / 2 + 40, -h / 2 - 8); x.lineTo(w / 2 + 8, -h / 2 - 8); x.lineTo(w / 2 + 8, h / 2 + 8); x.lineTo(-w / 2 + 40, h / 2 + 8); x.lineTo(-w / 2 - 8, h / 2 - 40); x.closePath(); x.fill()
    x.fillStyle = '#fbf2d8'
    x.beginPath(); x.moveTo(-w / 2, -h / 2 + 44); x.lineTo(-w / 2 + 44, -h / 2); x.lineTo(w / 2, -h / 2); x.lineTo(w / 2, h / 2); x.lineTo(-w / 2 + 44, h / 2); x.lineTo(-w / 2, h / 2 - 44); x.closePath(); x.fill()
    x.fillStyle = NEON_P; x.fillRect(-w / 2 + 44, -h / 2, w - 44, 16)
    x.fillStyle = INK; x.beginPath(); x.arc(-w / 2 + 34, 0, 12, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fbf2d8'; x.beginPath(); x.arc(-w / 2 + 34, 0, 6, 0, Math.PI * 2); x.fill()
    x.textAlign = 'left'; x.textBaseline = 'middle'
    x.font = `700 24px ${MONO}`; x.fillStyle = '#7a6a8a'; x.letterSpacing = '0.12em'; x.fillText('LOOKING FOR:', -w / 2 + 70, -h / 2 + 52); x.letterSpacing = '0px'
    x.font = `800 42px ${INTER}`; x.fillStyle = INK
    label.split(' | ').forEach((ln, i) => x.fillText(ln, -w / 2 + 70, -h / 2 + 108 + i * 50))
    x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(-w / 2 + 70, -h / 2 + 136, w - 100, 3); x.fillRect(-w / 2 + 70, -h / 2 + 186, w - 100, 3)
    x.restore()
  }
  function drawTags(t, sag) {
    if (t < T.cut) {
      if (t < T.tag || !sag) return
      const k = pop01(t, T.tag, 0.38, 2.2) * sceneK(t)
      // the string from the suitcase handle to the tag
      const hx = HERO.x + HERO.size * 0.7 - 18, hy = HERO.y + HERO.size * 0.14 - 75 - 80
      const cx = 740, cy = 760
      x.save(); x.globalAlpha = clamp(k); x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(hx, hy); x.quadraticCurveTo(hx + 40, cy + 60, cx - 150, cy + 8); x.stroke(); x.restore()
      bigTag(cx, cy, k, -0.06 + Math.sin(t * 2.4) * 0.03)
      return
    }
    const ok = sceneK(t)
    bigTag(FIN_A.x, 760, pop01(t, T.cut + 0.15, 0.34, 2.2) * ok * 0.78, -0.07 + Math.sin(t * 2.4) * 0.03)
    bigTag(FIN_B.x, 760, pop01(t, T.mateIn[1] - 0.1, 0.34, 2.2) * ok * 0.78, 0.07 + Math.sin(t * 2.4 + 1) * 0.03)
  }
  function drawMate(t) {
    if (t < T.cut) return
    const ok = sceneK(t)
    const e = ease.outCubic(prog(t, ...T.mateIn))
    if (e <= 0 || ok <= 0.02) return
    const px = lerp(1300, FIN_B.x, e), rolling = e < 1
    const mood = t > T.mateIn[1] + 0.3 ? 'heart' : rolling ? 'happy' : 'wide'
    drawStarChar(x, px, FIN_B.y, FIN_B.size * ok, t, { color: STAR.bone, mood, look: [-1, 0], squash: rolling ? -0.06 : 0, hops: [T.mateIn[1] + 0.02, T.mateIn[1] + 0.7], seed: 12, bob: rolling ? 2 : 6 })
    suitcase(px + FIN_B.size * 0.66 * ok, FIN_B.y + FIN_B.size * 0.14, FIN_B.size * ok / 300, t, rolling, { col: '#5a7fd0' })
  }
  function floatHearts(t, cx, cy, t0, t1) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, life = 1.4
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 7) / 6 - 0.5
      bits(x, HEART, { X: NEON_P }, cx + side * 240 + Math.sin(p * 4 + i) * 14, cy - p * 200, 7, { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        drawPalm(t, PALMS[0]); drawPalm(t, PALMS[1])
        drawFronts(t)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'right' })
        drawTravellers(t)
        const sag = drawSag(t)
        drawMate(t)
        drawBubble(t)
        drawTags(t, sag)
        if (t >= T.cut && t > T.mateIn[1] + 0.3) floatHearts(t, 545, 1000, T.mateIn[1] + 0.3, T.out[0])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.97 (H0 out → "Don't just pass through") and 8.45 (box shut → the matching tags). cardfx keeps 8.45.
const CUTS = [4.97, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const rattle = (t0, t1) => { const o = []; for (let t = t0; t < t1; t += 0.12) o.push(['tick', +t.toFixed(3), 0.018]); return o }
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.3, 1174.66, 0.045, 0],
  ['whoosh', T.roll[0], 0.6, 0.035], ...rattle(T.roll[0], T.roll[1]), ['tick', T.roll[1], 0.05],
  ['pop', T.bubble[0], 880, 0.04, -0.2], ['pop', T.bubble[0] + 0.07, 1174.66, 0.035, -0.2],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 2, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ['pop', T.think, 440, 0.025, 0.2], ['pop', T.think + 0.2, 494, 0.025, 0.2],
  ['whoosh', T.tag - 0.1, 0.3, 0.03], ['pop', T.tag, 1318.51, 0.05, 0.3], ['bell', T.tag + 0.05, 1760, 0.025, 1.2, 0.3], ['glitter', T.tag, T.tag + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.09, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ...rattle(T.mateIn[0], T.mateIn[1]), ['pop', T.mateIn[1], 1318.51, 0.045, 0.3], ['bell', T.mateIn[1] + 0.3, 1760, 0.022, 1.0, 0], ['glitter', T.mateIn[1] + 0.2, T.mateIn[1] + 0.7],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
