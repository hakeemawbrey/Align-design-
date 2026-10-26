// torpatio (15 s, vertical, house) — "Toronto has two seasons: winter and patio."
//   0.0–3.3   HOOK: an icy night. Snow falls and piles up on a generic condo skyline (with a needle tower), a frozen lake,
//             a snowed-in patio rail and a closed umbrella over a table buried under a snow mound. "Toronto has | two
//             seasons: | winter" … and on the beat "and patio." the whole scene FLIPS to summer in a warm ring wipe: the
//             snow bursts into sparkles, the umbrella pops open, string lights swing in and pop on, the lake glints.
//   3.38–5.48 "Don't spend patio season | on the wrong person." A gold pictogram at the patio table; a grey date on
//             their phone replies "k." then "gotta run!" and zips off. Ours slumps.
//   5.65–8.36 TURN (ON ALIGN): "Dealbreakers | come first." A DEALBREAKERS card; two red stamps slam on the beat:
//             "✕ FLAKY PLANS", "✕ ONE-WORD TEXTS". "Said before the first date."
//   8.45–10.45 "Make this | patio season | count." Night on the patio: a pink pictogram takes the empty seat, two glasses
//             rise and clink with a gold spark, the string lights flare and two little fireworks pop over the skyline.
//   10.5→     plain sky only; the end card ("come" + the seed-of-life logo + Align, JOIN THE WAITLIST) takes over at 10.6.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { BONE, GOLD, PINK, RED, CYAN, ICE, SNOW, WARM, CORAL, DARK, GREY, LAKE, INTER, MONO, SHADOW, D2R, TAU,
  rgba, mixHex, pop01, outScale, outK, glowStroke, makeBurst, drawBurst, popText, drawPerson, drawChat, drawDealCard, drawStamp } from './kit.js'

export const DURATION = 15
export const CTA = 'JOIN THE WAITLIST'
const END = DURATION - ENDCARD_LEN          // 10.6: the end card takes over here
const SETTLE = 10.5                          // from here only the plain sky is on screen
const BEAT = 60 / 108, B0 = 0.6
const beat = n => +(B0 + n * BEAT).toFixed(3)
const NIGHT = '#1b1440', VIOLET = '#c9a6ff'

const FLIP = beat(2)                         // 1.711: winter → patio
export const T = {
  hook: 0.1, winter: beat(0.5), and: 1.58, flip: FLIP, pile: [0.15, 1.6], wipe: [FLIP - 0.02, FLIP + 0.42],
  lights: FLIP + 0.1, open: FLIP + 0.08, hookOut: [3.12, 3.3],
  waste: 3.38, wasteLast: beat(6), me: 3.45, date: 3.6, k: beat(7), run: beat(8), zip: [5.12, 5.36], slump: [5.14, 5.4], wasteOut: [5.3, 5.48],
  dim: [5.3, 5.66], undim: [8.2, 8.6],
  turn: 5.65, turnLast: 6.0, card: 5.7, stamp1: beat(10), stamp2: beat(11), sub: 7.15, cardOut: 8.1, turnOut: [8.2, 8.36],
  save: 8.45, saveLast: 8.85, partner: 8.9, reach: [9.0, 9.42], clink: beat(16), fw1: 9.62, fw2: 9.86, endOut: 10.08, saveOut: [10.25, 10.45],
}
const SB = 1250                               // skyline base = lake top
const RAIL = 1440                             // patio rail
const GY = 1640                               // people's feet (behind the table)
const TB = { x: 540, top: 1480, w: 620 }      // the patio table
const PS = 0.8                                // people scale
const ME = 300, YOU = 780
const NOTE = [392, 440, 493.88, 587.33, 659.25, 783.99, 880, 987.77, 1174.66, 1318.51]   // G major pentatonic

// ── the generic skyline: condo towers + one needle tower (unnamed)
const NEEDLE = { x: 330, h: 700 }
const TOWERS = (() => {
  const r = rng(31), out = []
  const spec = [[-20, 120, 250], [92, 92, 350], [186, 112, 290], [400, 96, 420], [494, 118, 320], [606, 86, 470], [690, 128, 300], [816, 96, 390], [910, 108, 270], [1016, 100, 340]]
  for (const [tx, w, h] of spec) {
    const win = []
    for (let yy = 28; yy < h - 18; yy += 32) for (let xx = 14; xx < w - 16; xx += 24) if (r() < 0.38) win.push([xx, yy, r()])
    out.push({ x: tx, w, h, win, bal: r() < 0.5 })
  }
  return out
})()
// ── snowflakes
const FLAKES = (() => {
  const r = rng(77)
  return Array.from({ length: 90 }, () => ({ x0: r() * 1160, y0: r() * 2000, sp: 110 + r() * 230, d: 0.3 + r() * 0.7, w: 0.8 + r() * 1.6, ph: r() * TAU, big: r() < 0.22, kind: Math.floor(r() * 4), warm: [GOLD, WARM, PINK, BONE][Math.floor(r() * 4)] }))
})()
// ── string lights: two strands (catenary-ish quadratic sag)
const STRANDS = [{ a: [-30, 610], b: [1110, 690], sag: 150, n: 15 }, { a: [-30, 790], b: [1110, 720], sag: 110, n: 15 }]
const BULB_COLS = [GOLD, WARM, PINK, BONE, '#ffd98a']
function strandPt(s, u, drop = 0) {
  const px = lerp(s.a[0], s.b[0], u), py = lerp(s.a[1], s.b[1], u) + s.sag * 4 * u * (1 - u)
  return [px, py - drop]
}

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "800 112px Inter", "800 120px Inter", "800 150px Inter", "900 60px Inter", "700 64px Inter", "800 70px Inter",
      "italic 500 130px 'EB Garamond'", "italic 500 150px 'EB Garamond'", "italic 500 196px 'EB Garamond'", "700 38px 'Space Mono'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: '1080px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('ON ALIGN'), T.turn, T.turnOut]]

  // ── type
  const shiver = (i, t) => (i === 4 && t < FLIP ? { dx: 3.2 * Math.sin(t * 71) * prog(t, T.winter + 0.3, T.winter + 0.5), rot: 1.5 * Math.sin(t * 53) * prog(t, T.winter + 0.3, T.winter + 0.5) } : null)
  const H0 = popText(root, 'Toronto has | two seasons: | ~winter~ and *patio.*', { top: 168, size: 112, weight: 800, accentSize: 140, accentColor: WARM, accent2: ICE,
    times: [T.hook, T.hook + 0.1, T.hook + 0.24, T.hook + 0.34, T.winter, T.and, T.flip], bigs: [4, 6], wobble: true, fx: shiver })
  const H1 = popText(root, "Don't spend | patio season | on the *wrong* *person.*", { top: 186, size: 104, weight: 800, accentSize: 128, accentColor: PINK, at: T.waste, gap: 0.055, lastAt: T.wasteLast, wobble: true })
  const H2 = popText(root, 'Dealbreakers | come *first.*', { top: 210, size: 120, weight: 800, accentSize: 150, accentColor: GOLD, at: T.turn, gap: 0.1, lastAt: T.turnLast, wobble: true })
  const S2 = popText(root, 'Said *before* the first date.', { top: 1555, size: 64, weight: 700, accentSize: 78, accentColor: PINK, at: T.sub, gap: 0.07 })
  const H3 = popText(root, 'Make this | patio season | *count.*', { top: 176, size: 120, weight: 800, accentSize: 196, accentColor: GOLD, at: T.save, gap: 0.08, lastAt: T.saveLast, wobble: true })
  const TEXTS = [[H0, T.hookOut], [H1, T.wasteOut], [H2, T.turnOut], [S2, T.turnOut], [H3, T.saveOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(700 + k, n, d)
  const B_WIN = B(1, 10, 200), B_FLIP = B(2, 16, 420), B_MOUND = B(3, 14, 260), B_HEAD = B(4, 10, 220), B_ME = B(5, 8, 120), B_DATE = B(6, 8, 120)
  const B_K = B(7, 8, 110), B_RUN = B(8, 10, 150), B_CARD = B(9, 10, 300), B_ST1 = B(10, 14, 330), B_ST2 = B(11, 14, 330)
  const B_PART = B(12, 8, 140), B_CLINK = B(13, 14, 200), B_FW1 = B(14, 18, 230), B_FW2 = B(15, 18, 200), B_COUNT = B(16, 12, 260)

  // overall envelopes
  const worldK = t => ease.outCubic(prog(t, 0, 0.4)) * outK(t, [T.endOut, T.saveOut[1]])
  const dimK = t => 1 - 0.8 * ease.inOutQuad(prog(t, ...T.dim)) + 0.8 * ease.inOutQuad(prog(t, ...T.undim))
  const pileK = t => ease.outCubic(prog(t, ...T.pile))
  const nightK = t => ease.inOutQuad(prog(t, T.turn, T.save + 0.3))          // summer dusk → night by the last beat

  // ═════════════════════════ the world, drawn in one season (s = 0 winter, 1 summer)
  function drawTint(t, s) {
    if (!s) {
      const g = x.createLinearGradient(0, 0, 0, 1920)
      g.addColorStop(0, rgba('#6a8cff', 0.14)); g.addColorStop(0.6, rgba(ICE, 0.2)); g.addColorStop(1, rgba(ICE, 0.32))
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
      return
    }
    const warm = lerp(1, 0.45, nightK(t))
    const g = x.createLinearGradient(0, 380, 0, SB + 40)
    g.addColorStop(0, rgba('#b04ab0', 0)); g.addColorStop(0.55, rgba(CORAL, 0.32 * warm)); g.addColorStop(1, rgba(WARM, 0.55 * warm))
    x.fillStyle = g; x.fillRect(0, 380, 1080, SB + 40 - 380)
  }

  function drawNeedle(x, s, pile) {
    const cx = NEEDLE.x, top = SB - NEEDLE.h
    x.beginPath()
    x.moveTo(cx - 34, SB); x.lineTo(cx - 9, SB - 470); x.lineTo(cx + 9, SB - 470); x.lineTo(cx + 34, SB); x.closePath()
    x.fillStyle = NIGHT; x.fill(); glowStroke(x, s ? rgba(VIOLET, 0.9) : rgba(ICE, 0.9), 4, 12); x.stroke(); x.shadowBlur = 0
    // main pod, upper pod, mast
    x.beginPath(); x.ellipse(cx, SB - 480, 62, 26, 0, 0, TAU); x.fillStyle = NIGHT; x.fill(); glowStroke(x, s ? VIOLET : ICE, 4, 12); x.stroke(); x.shadowBlur = 0
    x.fillStyle = rgba(GOLD, 0.8); for (let i = -3; i <= 3; i++) x.fillRect(cx + i * 15 - 4, SB - 484, 8, 8)
    x.beginPath(); x.rect(cx - 7, SB - 610, 14, 120); x.fillStyle = NIGHT; x.fill(); glowStroke(x, s ? VIOLET : ICE, 3, 10); x.stroke(); x.shadowBlur = 0
    x.beginPath(); x.ellipse(cx, SB - 600, 20, 10, 0, 0, TAU); x.fillStyle = NIGHT; x.fill(); x.stroke()
    x.beginPath(); x.moveTo(cx, SB - 610); x.lineTo(cx, top); x.strokeStyle = s ? VIOLET : ICE; x.lineWidth = 4; x.stroke()
    if (!s && pile > 0) {
      x.fillStyle = SNOW; x.shadowColor = SNOW; x.shadowBlur = 10
      x.beginPath(); x.ellipse(cx, SB - 500, 58 * Math.min(1, pile * 1.4), 6 + 12 * pile, 0, Math.PI, TAU); x.fill()
      x.beginPath(); x.ellipse(cx, SB - 608, 18, 4 + 7 * pile, 0, Math.PI, TAU); x.fill(); x.shadowBlur = 0
    }
  }
  function drawSkyline(t, s) {
    const pile = s ? 0 : pileK(t)
    const blink = 0.5 + 0.5 * Math.sin(t * 5)
    drawNeedle(x, s, pile)
    x.beginPath(); x.arc(NEEDLE.x, SB - NEEDLE.h, 7, 0, TAU); x.fillStyle = rgba('#ff5a4a', 0.4 + 0.6 * blink); x.shadowColor = '#ff5a4a'; x.shadowBlur = 16 * blink; x.fill(); x.shadowBlur = 0
    for (const tw of TOWERS) {
      const top = SB - tw.h
      x.beginPath(); x.rect(tw.x, top, tw.w, tw.h)
      x.fillStyle = NIGHT; x.fill()
      glowStroke(x, s ? rgba(VIOLET, 0.85) : rgba(ICE, 0.85), 4, 12); x.stroke(); x.shadowBlur = 0
      // condo balconies: thin ledges
      if (tw.bal) { x.strokeStyle = rgba(s ? VIOLET : ICE, 0.35); x.lineWidth = 2; for (let yy = top + 40; yy < SB - 10; yy += 32) { x.beginPath(); x.moveTo(tw.x + 6, yy); x.lineTo(tw.x + tw.w - 6, yy); x.stroke() } }
      for (const [wx, wy, q] of tw.win) {
        const on = 0.55 + 0.45 * Math.sin(t * (0.6 + q) + q * 40)
        x.fillStyle = rgba(q > 0.72 ? (s ? PINK : ICE) : GOLD, (0.3 + 0.5 * on) * (s ? 1 : 0.8))
        x.fillRect(tw.x + wx, top + wy, 11, 15)
      }
      if (pile > 0) {      // a snow cap that piles up
        const h = 4 + 30 * pile
        x.fillStyle = SNOW; x.shadowColor = SNOW; x.shadowBlur = 10
        x.beginPath(); x.moveTo(tw.x - 6, top + 4); x.quadraticCurveTo(tw.x + tw.w * 0.2, top - h * 1.1, tw.x + tw.w * 0.5, top - h); x.quadraticCurveTo(tw.x + tw.w * 0.85, top - h * 0.95, tw.x + tw.w + 6, top + 4); x.closePath(); x.fill()
        x.shadowBlur = 0
      }
    }
  }
  function drawLake(t, s) {
    if (!s) {
      const g = x.createLinearGradient(0, SB, 0, RAIL); g.addColorStop(0, '#5f7fae'); g.addColorStop(1, '#a8c7e8')
      x.fillStyle = g; x.fillRect(0, SB, 1080, RAIL - SB)
      x.fillStyle = rgba(SNOW, 0.15 + 0.3 * pileK(t)); x.fillRect(0, SB, 1080, RAIL - SB)
      // ice cracks
      x.strokeStyle = rgba('#ffffff', 0.6); x.lineWidth = 3
      for (const [ax, ay, bx, by, cx2, cy2] of [[120, 1300, 220, 1330, 300, 1316], [620, 1290, 700, 1350, 820, 1340], [860, 1380, 960, 1360, 1040, 1395]]) { x.beginPath(); x.moveTo(ax, ay); x.lineTo(bx, by); x.lineTo(cx2, cy2); x.stroke() }
      glowStroke(x, ICE, 5, 14); x.beginPath(); x.moveTo(0, SB); x.lineTo(1080, SB); x.stroke(); x.shadowBlur = 0
      return
    }
    const nk = nightK(t)
    const g = x.createLinearGradient(0, SB, 0, RAIL); g.addColorStop(0, mixHex('#2c5fb0', '#1a2a66', nk)); g.addColorStop(1, mixHex('#1b2f6e', '#0e1338', nk))
    x.fillStyle = g; x.fillRect(0, SB, 1080, RAIL - SB)
    // the warm sky reflected + moving glints
    x.save(); x.globalCompositeOperation = 'lighter'
    const rg = x.createLinearGradient(0, SB, 0, SB + 90); rg.addColorStop(0, rgba(WARM, 0.3 * (1 - nk * 0.6))); rg.addColorStop(1, rgba(WARM, 0))
    x.fillStyle = rg; x.fillRect(0, SB, 1080, 90)
    const r = rng(5)
    for (let i = 0; i < 26; i++) {
      const gy = SB + 14 + r() * (RAIL - SB - 30), gx0 = r() * 1200 - 60, len = 24 + r() * 60, sp = 20 + r() * 30
      const tw = 0.5 + 0.5 * Math.sin(t * (3 + r() * 4) + i * 1.7)
      const xx = ((gx0 + t * sp) % 1200) - 60
      x.strokeStyle = rgba(i % 3 ? GOLD : '#fff3d0', 0.25 + 0.6 * tw); x.lineWidth = 4; x.lineCap = 'round'
      x.beginPath(); x.moveTo(xx, gy); x.lineTo(xx + len * (0.6 + 0.4 * tw), gy); x.stroke()
    }
    x.restore()
    glowStroke(x, rgba(GOLD, 0.8), 4, 14); x.beginPath(); x.moveTo(0, SB); x.lineTo(1080, SB); x.stroke(); x.shadowBlur = 0
    // a little sailboat drifting
    const bx = 880 - 40 * t / 10, by = SB + 66 + 5 * Math.sin(t * 2.4)
    x.save(); x.translate(bx, by); x.rotate(2.5 * D2R * Math.sin(t * 2.4))
    x.beginPath(); x.moveTo(-50, 0); x.lineTo(50, 0); x.lineTo(36, 18); x.lineTo(-36, 18); x.closePath(); x.fillStyle = NIGHT; x.fill(); glowStroke(x, BONE, 4, 10); x.stroke()
    x.beginPath(); x.moveTo(-2, -4); x.lineTo(-2, -96); x.lineTo(-44, -8); x.closePath(); x.fillStyle = rgba(BONE, 0.85); x.fill(); x.stroke()
    x.beginPath(); x.moveTo(4, -84); x.lineTo(4, -8); x.lineTo(40, -8); x.closePath(); x.fillStyle = rgba(PINK, 0.85); x.fill(); glowStroke(x, PINK, 4, 10); x.stroke(); x.shadowBlur = 0
    x.restore()
  }
  function drawDeck(t, s) {
    // rail
    x.save()
    const railC = s ? BONE : ICE
    glowStroke(x, railC, 7, 14)
    x.beginPath(); x.moveTo(0, RAIL); x.lineTo(1080, RAIL); x.stroke()
    x.lineWidth = 5; x.beginPath(); x.moveTo(0, RAIL + 56); x.lineTo(1080, RAIL + 56); x.stroke()
    x.lineWidth = 6; for (let px = 30; px < 1080; px += 90) { x.beginPath(); x.moveTo(px, RAIL); x.lineTo(px, RAIL + 120); x.stroke() }
    x.shadowBlur = 0
    // deck boards
    const g = x.createLinearGradient(0, RAIL + 120, 0, 1920); g.addColorStop(0, s ? '#3a2448' : '#3a4a6e'); g.addColorStop(1, s ? '#1d1230' : '#202a48')
    x.fillStyle = g; x.fillRect(0, RAIL + 120, 1080, 1920 - RAIL - 120)
    x.strokeStyle = rgba(s ? WARM : ICE, 0.22); x.lineWidth = 3
    for (let yy = RAIL + 160; yy < 1920; yy += 56) { x.beginPath(); x.moveTo(0, yy); x.lineTo(1080, yy); x.stroke() }
    glowStroke(x, rgba(railC, 0.8), 4, 10); x.beginPath(); x.moveTo(0, RAIL + 120); x.lineTo(1080, RAIL + 120); x.stroke(); x.shadowBlur = 0
    if (!s) {
      const p = pileK(t)
      // snow on the rail + a growing drift on the deck
      x.fillStyle = SNOW; x.shadowColor = SNOW; x.shadowBlur = 10
      x.beginPath(); x.roundRect(-10, RAIL - 6 - 18 * p, 1100, 8 + 18 * p, 10); x.fill()
      const top = lerp(1930, RAIL + 150, p)
      x.beginPath(); x.moveTo(0, 1920); x.lineTo(0, top + 30)
      for (let px = 0; px <= 1080; px += 60) x.lineTo(px, top + 22 * Math.sin(px * 0.013 + 1.3) + 14 * Math.sin(px * 0.031))
      x.lineTo(1080, 1920); x.closePath()
      const sg = x.createLinearGradient(0, top - 30, 0, 1920); sg.addColorStop(0, SNOW); sg.addColorStop(0.35, '#c9dcf2'); sg.addColorStop(1, '#7f97c4')
      x.fillStyle = sg; x.fill(); x.shadowBlur = 0
      x.strokeStyle = rgba(ICE, 0.9); x.lineWidth = 4; x.stroke()
    }
    x.restore()
  }
  function drawUmbrella(t, s) {
    const top = 1030, rim = 1130, half = 290
    x.save()
    // pole
    x.strokeStyle = BONE; x.lineWidth = 12; x.lineCap = 'round'; x.shadowColor = rgba(GOLD, 0.6); x.shadowBlur = 10
    x.beginPath(); x.moveTo(TB.x, TB.top); x.lineTo(TB.x, top - 16); x.stroke(); x.shadowBlur = 0
    if (!s) {
      // closed: a slim spindle, snow on its tip
      x.beginPath(); x.moveTo(TB.x, top - 10); x.quadraticCurveTo(TB.x + 34, top + 100, TB.x + 12, top + 190); x.lineTo(TB.x - 12, top + 190); x.quadraticCurveTo(TB.x - 34, top + 100, TB.x, top - 10); x.closePath()
      x.fillStyle = mixHex(PINK, NIGHT, 0.35); x.fill(); glowStroke(x, ICE, 5, 12); x.stroke(); x.shadowBlur = 0
      const p = pileK(t)
      x.fillStyle = SNOW; x.beginPath(); x.ellipse(TB.x, top - 6, 18 + 14 * p, 6 + 16 * p, 0, Math.PI, TAU); x.fill()
      x.restore(); return
    }
    const ok = easeOutBack(prog(t, T.open, T.open + 0.42), 2.6)
    const w = half * Math.max(0.06, ok), dip = lerp(140, 0, clamp(ok))
    const segs = 6
    for (let i = 0; i < segs; i++) {
      const u0 = i / segs, u1 = (i + 1) / segs
      const xa = TB.x - w + 2 * w * u0, xb = TB.x - w + 2 * w * u1
      x.beginPath(); x.moveTo(TB.x, top + dip * 0.4)
      x.lineTo(xa, rim + dip); x.quadraticCurveTo((xa + xb) / 2, rim + dip + 26, xb, rim + dip); x.closePath()
      x.fillStyle = i % 2 ? mixHex(BONE, NIGHT, 0.1) : PINK; x.fill()
    }
    x.beginPath(); x.moveTo(TB.x, top + dip * 0.4); x.lineTo(TB.x - w, rim + dip); for (let i = 0; i < segs; i++) { const xa = TB.x - w + 2 * w * i / segs, xb = TB.x - w + 2 * w * (i + 1) / segs; x.quadraticCurveTo((xa + xb) / 2, rim + dip + 26, xb, rim + dip) } x.closePath()
    glowStroke(x, BONE, 6, 16); x.stroke(); x.shadowBlur = 0
    x.fillStyle = GOLD; x.beginPath(); x.arc(TB.x, top + dip * 0.4 - 6, 10, 0, TAU); x.fill()
    x.restore()
  }
  function drawGlass(cx, by, a = 1, tilt = 0) {
    if (a <= 0) return
    x.save(); x.globalAlpha *= a; x.translate(cx, by); x.rotate(tilt)
    x.fillStyle = rgba(WARM, 0.85); x.beginPath(); x.moveTo(-22, -58); x.lineTo(22, -58); x.lineTo(16, -6); x.lineTo(-16, -6); x.closePath(); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.75)'; x.beginPath(); x.ellipse(-8, -48, 4, 9, 0.2, 0, TAU); x.fill()
    glowStroke(x, BONE, 5, 10); x.beginPath(); x.moveTo(-28, -84); x.lineTo(28, -84); x.lineTo(19, -2); x.lineTo(-19, -2); x.closePath(); x.stroke(); x.shadowBlur = 0
    x.restore()
  }
  function drawTable(t, s) {
    x.save()
    x.fillStyle = s ? '#2c1f4a' : '#2a3558'
    x.beginPath(); x.moveTo(TB.x - TB.w / 2 + 20, TB.top + 20); x.lineTo(TB.x + TB.w / 2 - 20, TB.top + 20); x.lineTo(TB.x + TB.w / 2 + 30, 1700); x.lineTo(TB.x - TB.w / 2 - 30, 1700); x.closePath(); x.fill()
    glowStroke(x, s ? PINK : ICE, 5, 12); x.stroke(); x.shadowBlur = 0
    x.fillStyle = s ? '#3d2c63' : '#3c4c78'; x.beginPath(); x.roundRect(TB.x - TB.w / 2, TB.top - 10, TB.w, 34, 14); x.fill(); glowStroke(x, BONE, 6, 16); x.stroke(); x.shadowBlur = 0
    if (!s) {
      // buried: a big snow mound on top
      const p = pileK(t), h = 20 + 150 * p
      x.fillStyle = SNOW; x.shadowColor = SNOW; x.shadowBlur = 14
      x.beginPath(); x.moveTo(TB.x - TB.w / 2 - 14, TB.top + 4)
      x.bezierCurveTo(TB.x - TB.w * 0.42, TB.top - h * 0.9, TB.x - TB.w * 0.15, TB.top - h * 1.1, TB.x + 10, TB.top - h)
      x.bezierCurveTo(TB.x + TB.w * 0.2, TB.top - h * 0.95, TB.x + TB.w * 0.44, TB.top - h * 0.7, TB.x + TB.w / 2 + 14, TB.top + 4); x.closePath(); x.fill(); x.shadowBlur = 0
      x.strokeStyle = rgba(ICE, 0.7); x.lineWidth = 4; x.stroke()
      // a snow drift on the table front too
      x.fillStyle = SNOW; x.beginPath(); x.roundRect(TB.x - TB.w / 2 - 6, TB.top - 4, TB.w + 12, 14 + 10 * p, 8); x.fill()
    }
    x.restore()
  }
  function drawLights(t, s) {
    if (!s) return
    const nk = nightK(t)
    const flare = t > T.clink ? Math.exp(-(t - T.clink) * 2.5) : 0
    for (let si = 0; si < STRANDS.length; si++) {
      const st = STRANDS[si]
      const drop = (1 - easeOutBack(prog(t, T.lights + si * 0.06, T.lights + 0.42 + si * 0.06), 1.6)) * 520
      x.save()
      x.strokeStyle = rgba('#2a2040', 0.95); x.lineWidth = 4
      x.beginPath()
      for (let j = 0; j <= 40; j++) { const [px, py] = strandPt(st, j / 40, drop); j ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke()
      for (let i = 0; i < st.n; i++) {
        const u = (i + 0.5) / st.n
        const [px, py0] = strandPt(st, u, drop)
        const sway = 4 * Math.sin(t * 2.2 + i * 0.7 + si)
        const py = py0 + 10, bx = px + sway * 0.3
        const on = prog(t, T.lights + 0.18 + i * 0.035 + si * 0.05, T.lights + 0.24 + i * 0.035 + si * 0.05)
        const tw = 0.82 + 0.18 * Math.sin(t * 6 + i * 2.1 + si * 3)
        const col = BULB_COLS[(i + si * 2) % BULB_COLS.length]
        const glow = on * tw * (1 + 0.4 * nk + 0.6 * flare)
        if (glow > 0.01) {
          x.save(); x.globalCompositeOperation = 'lighter'
          const R = 46 + 16 * nk + 22 * flare
          const g = x.createRadialGradient(bx, py + 8, 2, bx, py + 8, R); g.addColorStop(0, rgba(col, 0.55 * glow)); g.addColorStop(1, rgba(col, 0))
          x.fillStyle = g; x.beginPath(); x.arc(bx, py + 8, R, 0, TAU); x.fill(); x.restore()
        }
        x.fillStyle = '#2a2040'; x.fillRect(bx - 6, py - 8, 12, 10)
        x.beginPath(); x.ellipse(bx, py + 12, 11, 15, 0, 0, TAU)
        x.fillStyle = on > 0 ? mixHex('#5a4a70', col, on) : '#5a4a70'; if (on > 0) { x.shadowColor = col; x.shadowBlur = 18 * on } x.fill(); x.shadowBlur = 0
        if (on > 0.5) { x.fillStyle = 'rgba(255,255,255,0.8)'; x.beginPath(); x.arc(bx - 3, py + 7, 3.5, 0, TAU); x.fill() }
      }
      x.restore()
    }
  }
  function drawFlakes(t, s) {
    x.save()
    const fade = s ? 1 - prog(t, FLIP, FLIP + 0.8) : 1
    if (fade <= 0) { x.restore(); return }
    const fallIn = ease.outCubic(prog(t, 0, 0.3))
    for (const f of FLAKES) {
      const px = ((f.x0 + Math.sin(t * f.w + f.ph) * 26 - t * 30 * f.d) % 1160 + 1160) % 1160 - 40
      const py = ((f.y0 + t * f.sp) % 2000 + 2000) % 2000 - 40
      if (!s) {
        x.globalAlpha = (0.45 + 0.55 * f.d) * fallIn
        if (f.big) {
          x.save(); x.translate(px, py); x.rotate(t * f.w + f.ph); x.strokeStyle = SNOW; x.lineWidth = 3.5; x.lineCap = 'round'; x.shadowColor = SNOW; x.shadowBlur = 8
          const sz = 10 + 9 * f.d
          x.beginPath(); for (let k = 0; k < 6; k++) { const c = Math.cos(k * TAU / 6), sn = Math.sin(k * TAU / 6); x.moveTo(0, 0); x.lineTo(c * sz, sn * sz) } x.stroke(); x.restore()
        } else { x.fillStyle = SNOW; x.beginPath(); x.arc(px, py, 3 + 5 * f.d, 0, TAU); x.fill() }
      } else {
        // summer: the snow turns into warm sparkles that rise and fade
        const up = (t - FLIP) * 260 * f.d
        x.globalAlpha = fade * (0.6 + 0.4 * Math.sin(t * 9 + f.ph))
        drawPixelStar(x, px, py - up, (14 + 16 * f.d) * (1 + 0.5 * Math.sin(Math.PI * clamp(fade))), f.kind, f.warm)
      }
    }
    x.restore()
  }

  // ── the people + the props of each beat (summer only)
  function drawPeople(t) {
    // beat 2: me + the date
    const meK = t < T.save ? pop01(t, T.me, 0.42) * outScale(t, T.wasteOut[0] + 0.05, 0.3) : pop01(t, T.save + 0.05, 0.42) * outScale(t, T.endOut, 0.34)
    const sl = t < T.save ? ease.outCubic(prog(t, ...T.slump)) : 0
    const reach = ease.inOutCubic(prog(t, ...T.reach))
    const joyJ = t > T.clink ? Math.sin((t - T.clink) * 12) * Math.exp(-(t - T.clink) * 4) : 0
    if (meK > 0) drawPerson(x, { px: ME, gy: GY - 30 * joyJ, s: PS, col: GOLD, pose: 'stand', k: meK, slump: sl, lean: -5 * sl, toast: t >= T.save ? reach : 0, dir: 1 })
    drawBurst(x, B_ME, ME, GY - 420, t, T.me + 0.1, GOLD, 0.6)
    if (t < T.save) {
      const dk = pop01(t, T.date, 0.42)
      const zp = ease.inCubic(prog(t, ...T.zip))
      if (dk > 0 && zp < 1) drawPerson(x, { px: YOU + 560 * zp, gy: GY, s: PS, col: GREY, pose: zp > 0 ? 'stand' : 'phone', k: dk, lean: 8 + 18 * zp })
      drawBurst(x, B_DATE, YOU, GY - 420, t, T.date + 0.1, GREY, 0.6)
      // speed lines as they zip off
      if (zp > 0 && zp < 1) { x.save(); x.globalAlpha = Math.sin(Math.PI * zp); x.strokeStyle = BONE; x.lineWidth = 6; x.lineCap = 'round'; for (let i = 0; i < 4; i++) { const yy = GY - 160 - i * 90, xx = YOU + 560 * zp - 120; x.beginPath(); x.moveTo(xx - 160 - i * 20, yy); x.lineTo(xx, yy); x.stroke() } x.restore() }
    } else {
      const pk = pop01(t, T.partner, 0.42) * outScale(t, T.endOut + 0.06, 0.34)
      if (pk > 0) drawPerson(x, { px: YOU, gy: GY - 30 * joyJ, s: PS, col: PINK, pose: 'stand', k: pk, toast: reach, dir: -1 })
      drawBurst(x, B_PART, YOU, GY - 420, t, T.partner + 0.1, PINK, 0.6)
    }
  }
  const handPos = (px, dir, gy = GY) => [px + dir * 260 * PS, gy + (-425 + 30) * PS]
  function drawTableProps(t) {
    // two glasses on the table (beat 2 and 4); in beat 4 they rise into the toast
    const inK = t < T.save ? pop01(t, T.me + 0.15, 0.35) * outScale(t, T.wasteOut[0], 0.3) : pop01(t, T.save + 0.15, 0.35) * outScale(t, T.endOut, 0.3)
    if (inK <= 0) return
    const reach = t >= T.save ? ease.inOutCubic(prog(t, ...T.reach)) : 0
    const joyJ = t > T.clink ? Math.sin((t - T.clink) * 12) * Math.exp(-(t - T.clink) * 4) : 0
    for (const [px, dir, tx] of [[ME, 1, TB.x - 170], [YOU, -1, TB.x + 170]]) {
      const [hx, hy] = handPos(px, dir, GY - 30 * joyJ)
      const gxp = lerp(tx, hx, reach), gyp = lerp(TB.top - 8, hy + 50, reach) - 40 * Math.sin(Math.PI * reach)
      const tilt = dir * 14 * D2R * reach
      x.save(); x.translate(gxp, gyp); x.scale(inK, inK); x.translate(-gxp, -gyp); drawGlass(gxp, gyp, 1, tilt); x.restore()
    }
  }
  function drawBubbles(t) {
    if (t >= T.save) return
    const out = outScale(t, T.wasteOut[0], 0.3)
    const kk = pop01(t, T.k, 0.36) * outScale(t, T.run - 0.04, 0.2) * out
    drawChat(x, 820, 960 - 6 * Math.sin((t - T.k) * 3), 200, 128, 'k.', kk, { tail: -1, size: 0.56 })
    drawBurst(x, B_K, 820, 960, t, T.k + 0.05, CYAN, 0.6)
    const rk = pop01(t, T.run, 0.36) * out
    drawChat(x, 760, 950 - 6 * Math.sin((t - T.run) * 3), 470, 130, 'gotta run!', rk, { tail: 1, size: 0.44 })
    drawBurst(x, B_RUN, 760, 950, t, T.run + 0.05, PINK, 0.6)
  }
  function drawSpark(t) {
    if (t < T.clink - 0.02 || t > T.endOut + 0.4) return
    const sk = pop01(t, T.clink, 0.4) * outScale(t, T.endOut + 0.06, 0.34)
    const cx = TB.x, cy = handPos(ME, 1)[1] - 40
    if (sk > 0) {
      x.save(); x.translate(cx, cy); x.scale(sk, sk); x.rotate((t - T.clink) * 1.5)
      x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(0, 0, 4, 0, 0, 150); g.addColorStop(0, rgba(GOLD, 0.8)); g.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = g; x.beginPath(); x.arc(0, 0, 150, 0, TAU); x.fill()
      x.globalCompositeOperation = 'source-over'
      x.fillStyle = '#fff3c8'; x.shadowColor = GOLD; x.shadowBlur = 30
      x.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? 14 : 50; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } x.closePath(); x.fill()
      x.restore()
    }
    drawBurst(x, B_CLINK, cx, cy, t, T.clink, [GOLD, PINK, BONE, WARM], 0.8)
  }
  function drawFireworks(t) {
    for (const [t0, fx, fy, parts, col] of [[T.fw1, 190, 700, B_FW1, PINK], [T.fw2, 880, 660, B_FW2, CYAN]]) {
      // a rising trail then a bloom
      const rp = prog(t, t0 - 0.3, t0)
      if (rp > 0 && rp < 1) { x.save(); x.globalAlpha = 0.9; drawPixelStar(x, fx, lerp(SB, fy, ease.outCubic(rp)), 16, 0, col); x.restore() }
      const p = prog(t, t0, t0 + 0.9)
      if (p > 0 && p < 1) {
        x.save(); x.globalAlpha = (1 - p); x.strokeStyle = col; x.lineWidth = 5; x.lineCap = 'round'; x.shadowColor = col; x.shadowBlur = 16
        const e = ease.outCubic(p)
        for (let i = 0; i < 12; i++) { const a = i / 12 * TAU, r0 = 40 + 120 * e, r1 = 70 + 170 * e; x.beginPath(); x.moveTo(fx + Math.cos(a) * r0, fy + Math.sin(a) * r0 + 30 * p * p); x.lineTo(fx + Math.cos(a) * r1, fy + Math.sin(a) * r1 + 30 * p * p); x.stroke() }
        x.restore()
      }
      drawBurst(x, parts, fx, fy, t, t0, [col, BONE, GOLD], 1.0)
    }
  }

  // ── the turn: the DEALBREAKERS card + stamps
  const CARD = { x: 540, y: 1060, w: 700, h: 760 }
  const STAMPS = [{ at: T.stamp1, y: -60, rot: -5, text: '✕ FLAKY PLANS', burst: B_ST1 }, { at: T.stamp2, y: 150, rot: 4, text: '✕ ONE-WORD TEXTS', burst: B_ST2 }]
  function drawTurn(t) {
    if (t < T.card || t > T.cardOut + 0.5) return
    const out = outScale(t, T.cardOut, 0.36)
    const k = pop01(t, T.card, 0.45) * out
    if (k <= 0) return
    let thump = 0
    for (const s of STAMPS) if (t > s.at) thump += Math.sin((t - s.at) * 26) * Math.exp(-(t - s.at) * 7)
    const cy = CARD.y + 10 * Math.sin((t - T.card) * 2.2) + 10 * thump
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(CARD.x, cy, 60, CARD.x, cy, 640); g.addColorStop(0, rgba(GOLD, 0.28 * k)); g.addColorStop(0.5, rgba('#b45cf0', 0.14 * k)); g.addColorStop(1, rgba('#7c74f0', 0))
    x.fillStyle = g; x.beginPath(); x.arc(CARD.x, cy, 640, 0, TAU); x.fill(); x.restore()
    x.save(); x.translate(CARD.x, cy); x.rotate((lerp(-10, 0, ease.outCubic(prog(t, T.card, T.card + 0.5))) + 2 * thump) * D2R)
    x.scale(k * (1 - 0.04 * thump), k * (1 + 0.04 * thump)); x.globalAlpha = clamp(k * 3)
    drawDealCard(x, CARD.w, CARD.h)
    for (const s of STAMPS) {
      if (t < s.at - 0.18) continue
      const sp = prog(t, s.at - 0.18, s.at)
      const sc = lerp(2.5, 1, ease.inCubic(sp)) * (t > s.at ? 1 + 0.08 * Math.sin((t - s.at) * 30) * Math.exp(-(t - s.at) * 9) : 1)
      x.save(); x.translate(0, s.y); x.rotate(s.rot * D2R); x.scale(sc, sc); drawStamp(x, s.text, clamp(sp * 2.5)); x.restore()
    }
    x.restore()
    drawBurst(x, B_CARD, CARD.x, cy, t, T.card + 0.2, GOLD, 0.6)
    for (const s of STAMPS) drawBurst(x, s.burst, CARD.x, cy + s.y, t, s.at, RED, 0.75)
  }

  // one season's whole world (backdrop + patio)
  function drawWorld(t, s) {
    drawSky(x, t, SKY_H)
    const wk = worldK(t), dk = s ? dimK(t) : 1
    x.save(); x.globalAlpha = wk
    drawTint(t, s)
    x.globalAlpha = wk * dk
    drawSkyline(t, s)
    drawLake(t, s)
    drawDeck(t, s)
    drawUmbrella(t, s)
    if (s) drawPeople(t)
    drawTable(t, s)
    if (s) drawTableProps(t)
    x.globalAlpha = wk * (s ? lerp(1, 0.55, 1 - dk) : 1)
    drawLights(t, s)
    x.globalAlpha = wk
    if (s) drawFireworks(t)
    x.globalAlpha = 1
    drawFlakes(t, s)
    x.restore()
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      if (t >= SETTLE) { drawSky(x, t, SKY_H) }
      else if (t < T.wipe[0]) drawWorld(t, 0)
      else if (t >= T.wipe[1]) drawWorld(t, 1)
      else {
        // the season flip: a warm ring wipes summer in from the "patio." word
        const p = ease.inOutCubic(prog(t, ...T.wipe)), R = lerp(0, 2300, p), cx = 700, cy = 470
        drawWorld(t, 0)
        x.save(); x.beginPath(); x.arc(cx, cy, R, 0, TAU); x.clip(); drawWorld(t, 1); x.restore()
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(cx, cy, Math.max(0, R - 90), cx, cy, R + 30); g.addColorStop(0, rgba(WARM, 0)); g.addColorStop(0.75, rgba(WARM, 0.7)); g.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore()
      }
      if (t < SETTLE) {
        drawBurst(x, B_WIN, 540, 420, t, T.winter + 0.12, [ICE, SNOW, CYAN], 0.7)
        drawBurst(x, B_FLIP, 700, 470, t, T.flip + 0.05, [GOLD, WARM, PINK, BONE], 0.9, 1.5)
        drawBurst(x, B_MOUND, TB.x, TB.top - 80, t, T.flip + 0.2, [SNOW, GOLD, WARM], 0.8, 1.3)
        drawBubbles(t)
        drawSpark(t)
        drawTurn(t)
        drawBurst(x, B_HEAD, 540, 520, t, T.wasteLast + 0.1, PINK, 0.7)
        drawBurst(x, B_COUNT, 540, 560, t, T.saveLast + 0.1, [GOLD, WARM, PINK], 0.8, 1.3)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.2)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of TEXTS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   3.34 hook line out (3.12–3.3) → "Don't spend patio season" (3.38) · 5.58 the date's gone + line out (5.48) → "Dealbreakers" (5.65)
//   8.4 the DEALBREAKERS card out (8.36) → "Make this patio season count." (8.45) · the end card does its own card flip at 10.6
const CUTS = [{ t: 3.34, kind: 'shuffle' }, { t: 5.58, kind: 'flip' }, { t: 8.4, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END, cta: CTA }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]

// ── cues (G major pentatonic pops on the 108 bpm grid; the house score is arranged by the style engine)
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: winter
  ['pop', T.hook, 587.33, 0.03, -0.15], ['pop', r3(T.hook + 0.1), 659.25, 0.03, 0.15], ['pop', r3(T.hook + 0.24), 783.99, 0.03, -0.15], ['pop', r3(T.hook + 0.34), 880, 0.03, 0.15],
  ['whoosh', 0.05, 0.9, 0.03], ['glitter', 0.3, 1.4],
  ['whoosh', r3(T.winter - 0.15), 0.5, 0.04], ['pop', T.winter, 1174.66, 0.055, 0], ['bell', r3(T.winter + 0.02), 1318.51, 0.035, 1.2, 0], ['pluck', T.winter, 293.66, 0.04, 0.6, 0],
  ...[0, 1, 2, 3].map(i => ['tick', r3(1.0 + i * 0.14), 0.02 + i * 0.006]),
  ['riser', 0.95, T.flip, 0.04],
  // the flip to patio
  ['pop', T.and, 659.25, 0.035, 0],
  ['boom', T.flip, 0.15], ['pop', T.flip, 1174.66, 0.065, 0], ['pluck', T.flip, 392, 0.05, 0.6, 0], ['glitter', T.flip, r3(T.flip + 0.8)], ['whoosh', T.flip, 0.5, 0.045],
  ['whoosh', r3(T.open - 0.02), 0.3, 0.035], ['pop', r3(T.open + 0.2), 783.99, 0.05, 0],
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ['pop', r3(T.lights + 0.18 + i * 0.07), NOTE[(2 + i) % NOTE.length], 0.022, (i % 2 ? 0.35 : -0.35)]),
  ['bell', r3(T.lights + 0.75), 1567.98, 0.025, 1.2, 0.2],
  // don't spend patio season on the wrong person
  ...wordPops(T.waste, 7, 0.055, 0, 0.022),
  ['pop', T.wasteLast, 987.77, 0.06, 0], ['bell', r3(T.wasteLast + 0.03), 1318.51, 0.03, 1.2, 0],
  ['pop', T.me, 587.33, 0.045, -0.4], ['pop', T.date, 493.88, 0.045, 0.4],
  ['tick', T.k, 0.06], ['pop', T.k, 493.88, 0.05, 0.4],
  ['tick', T.run, 0.06], ['pop', T.run, 659.25, 0.05, 0.3],
  ['whoosh', T.zip[0], 0.3, 0.05], ['pluck', T.slump[0] + 0.08, 196, 0.045, 0.5, -0.4],
  // the turn
  ...wordPops(T.turn, 3, 0.1, 3), ['pop', T.turnLast, 1318.51, 0.06, 0], ['pluck', T.turnLast, 987.77, 0.045, 0.6, 0],
  ['whoosh', r3(T.card - 0.05), 0.4, 0.04], ['pop', r3(T.card + 0.2), 783.99, 0.06, 0],
  ...[T.stamp1, T.stamp2].flatMap((s, i) => [['whoosh', r3(s - 0.2), 0.2, 0.04], ['boom', s, i ? 0.16 : 0.12], ['tick', s, 0.09], ['bell', r3(s + 0.04), i ? 783.99 : 587.33, 0.04, 1.0, 0]]),
  ...wordPops(T.sub, 5, 0.07, 1, 0.02),
  ['whoosh', T.cardOut, 0.45, 0.04],
  // make this patio season count
  ...wordPops(T.save, 4, 0.08, 2), ['pop', T.saveLast, 1174.66, 0.065, 0], ['pluck', T.saveLast, 392, 0.05, 0.6, 0],
  ['pop', T.partner, 783.99, 0.055, 0.3],
  ['whoosh', T.reach[0], 0.4, 0.035],
  ['bell', T.clink, 1567.98, 0.05, 1.6, -0.1], ['bell', r3(T.clink + 0.04), 2093, 0.035, 1.6, 0.1], ['glitter', T.clink, r3(T.clink + 0.7)],
  ...[T.fw1, T.fw2].flatMap((f, i) => [['whoosh', r3(f - 0.3), 0.3, 0.03], ['pop', f, i ? 987.77 : 783.99, 0.05, i ? 0.4 : -0.4], ['glitter', f, r3(f + 0.5)]]),
  ['whoosh', T.endOut, 0.4, 0.035],
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
