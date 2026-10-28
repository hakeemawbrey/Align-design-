// st4galveston (EP 051, 20 s vertical, Star Talk season 4, thread F: Cancer × Capricorn) · story 0–15.6, then the end card.
//   0.00–5.10  "Dear | *Galveston.*"  Night on the beach under the seawall (palms and lamps along the top, granite riprap
//              at its foot, the Gulf lapping at the bottom). The ♋ Cancer star builds a house out of its OLD crab shell:
//              the dome lands, a door, a lit window, a little blue flag. CANCER: "home is wherever i bring my *shell*."
//   5.10–10.3  "Then Capricorn | brought a *towel.*"  The ♑ Capricorn star (still in its tie, cast bible) drops in with a neatly
//              folded towel and spreads it on the sand. Cancer goes wide-eyed, then heart-eyed.
//              THE STARS: "home is also who you *share* the beach with."
//   10.3 cut → "Share your | *shell.*"  Both stars sit on the towel, the shell house between them grows a second (green)
//              flag, Capricorn's tie loosens, a pixel heart. Out by 15.4; end card at 15.6 (JOIN THE TEXAS BETA).
// Easter eggs: seed constellation (EP 51) top-left, EP 051 in the frame cartouche, the ghost peeks over the seawall rail.
// One canvas (sky + beach + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 51
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const CAN = signStar('cancer'), CAP = signStar('capricorn')
const AQUA = '#7fd6ff'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.92, 5.1],
  build: [0.55, 1.2, 1.7, 2.15], open: 2.45, l1: 2.65,
  h1: 5.16, h1Land: 5.75, capIn: 5.4, spread: [6.05, 6.55], l2: 6.55, wide: 5.45, heart: 8.4, close: 10.05, h1Out: [10.0, 10.2],
  cut: 10.3,
  h2: 10.36, h2Land: 10.85, sit: [10.3, 10.75], flag2: 11.5, heartPop: 11.9, tie: 12.6, h2Out: [15.15, 15.4], out: [15.0, 15.4],
  ghost: 12.9,
}
const CANCER = '♋ CANCER STAR', SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: CANCER, text: 'home is wherever i bring my *shell*.', color: AQUA },
  { t: T.l2, speaker: SPEAK, text: 'home is also who you *share* the beach with.', color: AQUA },
]
const CPS = 28

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── pixel bits
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
const HEART = ['.HH.HH.', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const TIE = ['.KKK.', '.RRR.', '..R..', '.RRR.', '.RrR.', 'RRrRR', 'RRRRR', '.RRR.', '..R..']
const TIE_C = { K: '#7a1f33', R: '#d8344f', r: '#ffd36b' }
const PALM = [
  '..LL......LL...',
  '.LGGL....LGGL..',
  'LG..GL..LG..GL.',
  'G....GLLG....G.',
  '....LGGGGL.....',
  '...GG..T.GG....',
  '..G....T...G...',
  '.......T.......',
  '.......T.......',
  '........T......',
  '........T......',
  '........T......',
  '........T......',
  '.......TT......',
]
const PALM_C = { L: '#2c5a52', G: '#1d3f3d', T: '#3a2c3f' }

// ── layout
const WALL = { top: 872, face: 892, foot: 1040 }      // seawall: rail top, walk lip, foot (riprap below)
const SAND = 1062, SURF = 1392
const HOUSE = { x: 540, rim: 1292, c: 7 }
const CANS = { x: 225, y: 1170, size: 290 }, CAPS = { x: 858, y: 1160, size: 265 }
const FIN = { can: { x: 330, y: 1222 }, cap: { x: 780, y: 1218 } }
const TOWEL = { x: 560, y: 1352, w: 600, h: 88 }

function cancerState(t) {
  if (t < T.build[3] + 0.3) return { mood: 'happy', look: [1, 0] }
  if (t < T.wide) return { mood: t < T.l1 + 1.6 ? 'sparkle' : 'happy', look: [1, 0] }
  if (t < T.spread[1]) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.heart) return { mood: 'neutral', look: [1, 1] }
  if (t < T.cut) return { mood: 'heart', look: [1, 0] }
  return { mood: 'happy', blush: 1 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear | *Galveston.*', { top: 250, size: 116, accentSize: 176, at: T.h0, gap: 0.12, accentColor: AQUA, wobble: true, late: 1, lateAt: T.h0 + 0.3, lineHeight: 0.98 })
  const H1 = popText(root, 'Then Capricorn | brought a *towel.*', { top: 225, size: 92, accentSize: 140, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.08, accentColor: CAP.color })
  const H2 = popText(root, 'Share your | *shell.*', { top: 200, size: 150, accentSize: 240, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: AQUA, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const CAN_HOPS = [...T.build.map(b => b - 0.05), ...talkHops(LINES, CANCER, { cps: CPS }), T.heart + 0.05]

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, AQUA]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // ── the seawall: a moonlit concrete wall with a rail, palms and lamps along the top, granite riprap at its foot
  function drawSeawall(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    // palms + lamps behind the rail
    ;[[96, 0.9], [452, 1.05], [1000, 0.95]].forEach(([px, s], i) => {
      const sway = Math.sin(t * 1.3 + i * 2) * 0.03
      const c = 10 * s, h = PALM.length * c
      drawBits(x, PALM, PALM_C, px, WALL.top - h / 2 + 4, c, { rot: sway, outline: '#0d0a1f' })
    })
    for (const lx of [270, 760]) {
      const g = x.createRadialGradient(lx, 720, 0, lx, 720, 120)
      g.addColorStop(0, 'rgba(255,214,140,0.38)'); g.addColorStop(1, 'rgba(255,214,140,0)')
      x.fillStyle = g; x.fillRect(lx - 120, 600, 240, 240)
      x.fillStyle = '#231c3d'; x.fillRect(lx - 4, 724, 8, WALL.top - 724); x.fillRect(lx - 18, 712, 36, 8)
      x.fillStyle = '#ffe3a8'; x.fillRect(lx - 14, 720, 28, 12)
    }
    // rail
    x.fillStyle = '#9a96b4'; x.fillRect(0, WALL.top - 30, 1080, 6)
    for (let px = 12; px < 1080; px += 60) x.fillRect(px, WALL.top - 30, 6, 30)
    // walk lip + curved face (bands get darker toward the foot, the curve kicks out at the bottom)
    x.fillStyle = '#b3afc8'; x.fillRect(0, WALL.top, 1080, WALL.face - WALL.top)
    const bands = ['#7d7a98', '#76738f', '#6e6b88', '#666380', '#5e5b78', '#57546f', '#4f4c67', '#48455f', '#413e57', '#3b3850']
    const bh = (WALL.foot - WALL.face) / bands.length
    bands.forEach((col, i) => { x.fillStyle = col; x.fillRect(0, Math.round(WALL.face + i * bh), 1080, Math.ceil(bh) + 1) })
    x.fillStyle = 'rgba(20,14,40,0.35)'
    for (let px = 0; px < 1080; px += 180) x.fillRect(px, WALL.face, 4, WALL.foot - WALL.face)    // expansion joints
    // riprap boulders
    for (let i = 0; i < 18; i++) {
      const bx = i * 64 - 10 + ((i * 37) % 23), bw = 70 + ((i * 53) % 30), bhh = 26 + ((i * 29) % 16)
      x.fillStyle = '#2c2940'; x.fillRect(bx - 3, SAND - bhh - 3, bw + 6, bhh + 6)
      x.fillStyle = i % 3 ? '#5a5672' : '#6b6786'; x.fillRect(bx, SAND - bhh, bw, bhh)
      x.fillStyle = '#8784a2'; x.fillRect(bx + 6, SAND - bhh, bw - 18, 5)
    }
    x.restore()
  }
  // ── the beach: sand with speckles and footprints, the surf line lapping, the Gulf below
  function drawBeach(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    const g = x.createLinearGradient(0, SAND, 0, SURF)
    g.addColorStop(0, '#8d7356'); g.addColorStop(1, '#b8946a')
    x.fillStyle = g; x.fillRect(0, SAND, 1080, SURF - SAND + 20)
    x.fillStyle = 'rgba(70,52,40,0.45)'
    for (let i = 0; i < 70; i++) x.fillRect((i * 151) % 1080, SAND + 14 + ((i * 89) % (SURF - SAND - 20)), 6, 6)
    x.fillStyle = 'rgba(255,240,210,0.35)'
    for (let i = 0; i < 40; i++) x.fillRect((i * 263 + 40) % 1080, SAND + 30 + ((i * 47) % (SURF - SAND - 40)), 6, 6)
    // water
    const wg = x.createLinearGradient(0, SURF, 0, 1920)
    wg.addColorStop(0, '#2d5b84'); wg.addColorStop(1, '#152a52')
    x.fillStyle = wg; x.fillRect(0, SURF + 10, 1080, 1920 - SURF)
    // the lapping foam edge (6 px steps)
    const lap = Math.sin(t * 1.6) * 14
    for (let px = 0; px < 1080; px += 6) {
      const fy = Math.round((SURF + lap + Math.sin(px * 0.018 + t * 2.2) * 8) / 6) * 6
      x.fillStyle = '#e8eef6'; x.fillRect(px, fy, 6, 10)
      x.fillStyle = 'rgba(200,220,240,0.55)'; x.fillRect(px, fy + 10, 6, 8)
    }
    for (let r = 0; r < 4; r++) {
      const yy = SURF + 360 + r * 52, off = (t * 40 * (r % 2 ? 1 : -1) + r * 90) % 240
      x.fillStyle = 'rgba(190,215,240,0.28)'
      for (let px = -240 + off; px < 1080; px += 240) x.fillRect(Math.round(px / 6) * 6, yy, 90, 6)
    }
    x.restore()
  }

  // ── the shell house: Cancer's old coral crab shell, rim on the sand, a door, a lit window, flags on the roof
  const RX = 21, RY = 14
  function drawHouse(t, k) {
    const { x: cx, rim, c } = HOUSE
    const dome = easeOutBack(prog(t, T.build[0], T.build[0] + 0.35), 2.2) * k
    if (dome <= 0.01) return
    const door = prog(t, T.build[1], T.build[1] + 0.18), win = prog(t, T.build[2], T.build[2] + 0.18)
    x.save(); x.translate(Math.round(cx), Math.round(rim)); x.scale(dome, dome)
    // the warm window glow on the sand
    if (win > 0) {
      const g = x.createRadialGradient(9 * c, -7 * c, 0, 9 * c, -7 * c, 22 * c)
      g.addColorStop(0, `rgba(255,214,140,${0.3 * win})`); g.addColorStop(1, 'rgba(255,214,140,0)')
      x.fillStyle = g; x.fillRect(-12 * c, -30 * c, 44 * c, 40 * c)
    }
    const inside = (i, j) => { const u = (i + 0.5) / RX, v = (j + 0.5) / RY; return j >= 0 && u * u + v * v <= 1 }
    const SPOTS = [[-12, 8], [-5, 12], [4, 12], [14, 5], [-16, 3]]
    for (let j = -1; j <= RY + 1; j++) for (let i = -RX - 1; i <= RX; i++) {
      const on = inside(i, j)
      const edge = !on && (inside(i + 1, j) || inside(i - 1, j) || inside(i, j + 1) || inside(i, j - 1))
      if (!on && !edge) continue
      let col = INK
      if (on) {
        const u = (i + 0.5) / RX, v = (j + 0.5) / RY, lit = -u * 0.6 + v * 0.8
        col = lit > 0.75 ? '#ffd2b0' : lit > 0.3 ? '#ff9a6e' : lit > -0.2 ? '#f2734f' : '#c4483a'
        if (j === 0) col = (i + 40) % 3 === 0 ? INK : '#8f2f2a'
        for (const [si, sj] of SPOTS) if ((i - si) ** 2 + (j - sj) ** 2 <= 2.2) col = lit > 0.3 ? '#ffe3cc' : '#ffb894'
        if (door > 0 && i >= -4 && i <= 2 && j <= 8 * door && (j < 7 || (i > -4 && i < 2))) col = j <= 8 * door - 0.5 ? '#3a1630' : col     // arched door
        if (door >= 1 && i === 1 && j === 3) col = GOLD                                                                      // knob
        if (win > 0 && (i - 9) ** 2 + (j - 7) ** 2 <= 5.5) col = win >= 1 ? ((i - 9) ** 2 + (j - 7) ** 2 <= 1.5 ? '#fff4cf' : '#ffd98a') : '#3a1630'
        if (win >= 1 && (i === 9 || j === 7) && (i - 9) ** 2 + (j - 7) ** 2 <= 5.5) col = '#8f2f2a'                        // window cross
      }
      x.fillStyle = col; x.fillRect(i * c, -(j + 1) * c, c + 0.5, c + 0.5)
    }
    // flags on the roof: Cancer's blue first, Capricorn's green joins in the finale
    const flags = [[T.build[3], -3, CAN.color], [T.flag2, 3, CAP.color]]
    for (const [ft, fi, fc] of flags) {
      const fk = easeOutBack(prog(t, ft, ft + 0.3), 2.4)
      if (fk <= 0.01) continue
      const px = fi * c, top = -(RY + 1) * c, ph = 9 * c * fk
      x.fillStyle = INK; x.fillRect(px - c, top - ph - c, 3 * c, ph + c)
      x.fillStyle = BONE; x.fillRect(px, top - ph, c, ph)
      const wav = Math.floor(t * 6) % 2
      x.fillStyle = INK; x.fillRect(px + c, top - ph - c, 6 * c, 5 * c)
      x.fillStyle = fc; x.fillRect(px + c, top - ph, 5 * c - wav * c, 3 * c); x.fillRect(px + c, top - ph + 3 * c, 2 * c, c)
    }
    x.restore()
  }

  // ── Capricorn's towel: neatly folded (it's a Capricorn), then spread on the sand; green / bone / gold stripes
  function drawTowel(t, k, star) {
    if (k <= 0.01) return
    const sp = ease.inOutCubic(prog(t, ...T.spread))
    const cols = [CAP.color, BONE, CAP.color, GOLD, CAP.color, BONE, CAP.color]
    if (sp <= 0) {             // folded, floating at Capricorn's side
      const fx = star.x - 150, fy = star.y + 40
      x.save(); x.translate(Math.round(fx), Math.round(fy)); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-58, -40, 116, 80)
      for (let r = 0; r < 4; r++) { x.fillStyle = r % 2 ? BONE : CAP.color; x.fillRect(-52, -34 + r * 17, 104, 17) }
      x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-52, 16, 104, 18)
      x.restore()
      return
    }
    const w = lerp(116, TOWEL.w, sp), h = lerp(80, TOWEL.h, sp)
    const cx = lerp(CAPS.x - 150, TOWEL.x, sp), cy = lerp(CAPS.y + 40, TOWEL.y, sp) - Math.sin(Math.PI * sp) * 90
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.globalAlpha = k
    x.fillStyle = 'rgba(40,24,30,0.3)'; x.fillRect(-w / 2 + 8, -h / 2 + 12, w, h)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    const sw = w / cols.length
    cols.forEach((col, i) => { x.fillStyle = col; x.fillRect(Math.round(-w / 2 + i * sw), -h / 2, Math.ceil(sw) + 1, h) })
    x.fillStyle = BONE
    for (let px = -w / 2; px < w / 2; px += 18) { x.fillRect(Math.round(px), -h / 2 - 12, 6, 6); x.fillRect(Math.round(px), h / 2 + 6, 6, 6) }    // fringe
    x.restore()
  }

  function drawTie(t, r, size, pop, loose) {
    const s = size * pop, sway = Math.sin(t * 3) * 0.03
    drawBits(x, TIE, TIE_C, Math.round(r.x + loose * s * 0.06), Math.round(r.y + s * 0.29 + loose * s * 0.05), s / 26, { rot: sway + loose * 0.45 })
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const land = ease.outCubic(prog(t, 0.05, 0.5))
    drawSeawall(t, land)
    drawGhostCameo(x, t, { x: 640, y: WALL.top - 30, at: T.ghost, dur: 1.4, from: 'below', cell: 4 })   // peeking over the seawall rail
    drawBeach(t, land)
    drawHouse(t, ok)
    // the two stars: separate in the first half, side by side on the towel in the finale
    const sit = ease.inOutCubic(prog(t, ...T.sit))
    const capK = easeOutBack(prog(t, T.capIn, T.capIn + 0.35), 2) * ok
    const capDrop = 1 - ease.outCubic(prog(t, T.capIn - 0.1, T.capIn + 0.25))
    const capX = lerp(CAPS.x, FIN.cap.x, sit), capY = lerp(CAPS.y, FIN.cap.y, sit) - capDrop * 420
    drawTowel(t, capK, { x: capX, y: capY })
    const st = cancerState(t)
    const canX = lerp(CANS.x, FIN.can.x, sit), canY = lerp(CANS.y, FIN.can.y, sit)
    const cp = easeOutBack(prog(t, 0.2, 0.55), 2) * ok
    drawStarChar(x, canX, canY, CANS.size, t, { color: CAN.color, glyph: CAN.glyph, ...st, pop: cp, hops: [...CAN_HOPS, T.sit[0] + 0.1, T.heartPop], seed: 5, glow: 1.1 })
    if (capK > 0.01) {
      const capMood = t < T.spread[1] ? { mood: 'squint', look: [-1, 1] } : t < T.heart ? { mood: 'neutral', look: [-1, 0] } : t < T.cut ? { mood: 'happy', look: [-1, 0] } : t < T.heartPop ? { mood: 'happy' } : { mood: 'heart', look: [-1, 0] }
      const r = drawStarChar(x, capX, capY, CAPS.size, t, { color: CAP.color, glyph: CAP.glyph, ...capMood, pop: capK, hops: [T.capIn + 0.24, T.spread[1], T.sit[0] + 0.15, T.heartPop + 0.1, T.tie], seed: 9, glow: 1.05 })
      drawTie(t, r, CAPS.size, capK, easeOutBack(prog(t, T.tie, T.tie + 0.35), 2.2))
    }
    for (const b of T.build) sparkles(t, HOUSE.x + (b === T.build[3] ? -20 : b === T.build[2] ? 60 : 0), HOUSE.rim - 60, b, 8, 90, b)
    sparkles(t, TOWEL.x, TOWEL.y, T.spread[1], 10, 260, 3, [CAP.color, BONE, GOLD])
    sparkles(t, HOUSE.x + 20, HOUSE.rim - 150, T.flag2, 8, 90, 1, [CAP.color, BONE, GOLD])
    if (t > T.cut) {
      const hk = easeOutBack(prog(t, T.heartPop, T.heartPop + 0.3), 2.6) * ok
      if (hk > 0.01) {
        const beat = 1 + 0.08 * Math.max(0, Math.sin((t - T.heartPop) * 7))
        drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 545, 1000 + Math.sin(t * 2.2) * 6, 12 * hk * beat)
      }
      sparkles(t, 545, 1000, T.heartPop, 10, 170, 2)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.12 (H0 out → "Then Capricorn…") and 10.3 (box shut → "Share your shell.").
const CUTS = [5.12, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.3, 1174.66, 0.045, 0],
  ['whoosh', 0.1, 0.5, 0.02],
  ...T.build.map((b, i) => ['pop', b + 0.04, NOTE[(i * 2) % 7], 0.04, i % 2 ? 0.2 : -0.2]),
  ['bell', T.build[2] + 0.05, 1318.51, 0.02, 1.0, 0.2], ['pluck', T.build[3] + 0.05, 1174.66, 0.035, 0.5, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 4, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['whoosh', T.capIn - 0.15, 0.35, 0.03], ['boom', T.capIn + 0.2, 0.08], ['tick', T.capIn + 0.22, 0.04],
  ['whoosh', T.spread[0], 0.45, 0.035], ['tick', T.spread[1], 0.05], ['glitter', T.spread[1], T.spread[1] + 0.4],
  ['pluck', T.heart, 1174.66, 0.04, 0.6, 0], ['bell', T.heart + 0.05, 1568, 0.02, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pop', T.flag2 + 0.05, 987.77, 0.04, 0.1], ['pluck', T.heartPop, 1174.66, 0.045, 0.6, 0], ['bell', T.heartPop + 0.05, 1760, 0.026, 1.2, 0],
  ['pop', T.tie, 659.25, 0.03, 0.2],
  ['pop', T.ghost + 0.1, 1318.51, 0.012, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
