// srtorpatio (20 s vertical, Star Talk Remix of torpatio "Two seasons: winter and patio") · story 0–15.6, then the
// shared end card ("come" + the logo + the default CTA).
//   0.00–3.90  HOOK  "Toronto has | two seasons: | *winter* and *patio.*"  An icy night on a lakeside patio: snow piles on
//              a generic condo skyline (one needle tower, unnamed), the table is a snow mound, and the ♌ Leo star sits
//              bundled in a toque and scarf, shivering. Behind it, ♓ Pisces is frozen in an ice cube on the rail.
//              On the drop (2.82) the world FLIPS to summer in a ring wipe: the toque and scarf fly off, the umbrella pops,
//              string lights swing in, the ice cube shatters. Sunglasses drop onto Leo (3.15). ♌ LEO STAR: "it's short.
//              don't *waste* it."
//   3.95–9.50  "Don't spend | patio season | on the *wrong person.*"  A grey date star drops into the other seat, eyes on
//              its phone: "k." … "gotta run!" and it zips off (6.35). Leo's eye-roll. Pisces weeps for Leo in the back.
//              LEO: "'k.' is not a *conversation.*"
//   9.60 cut → "Dealbreakers | come *first.*"  A DEALBREAKERS card drops over the dimmed patio; Leo hops and two red stamps
//              slam: "✕ FLAKY PLANS", "✕ ONE-WORD TEXTS". LEO: "say them *before* the first date."
//  13.00–15.45 "Make this | patio season | *count.*"  Night: a pink star takes the seat, heart-eyes both ways, two glasses
//              clink with a gold spark (14.0), the string lights flare, two pixel fireworks pop; Pisces cries happy tears.
// One canvas (sky + world + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import {
  BONE, GOLD, PINK, RED, ICE, SNOW, WARM, CORAL, NIGHT, VIOLET, GREY, CYAN, TAU, D2R, BEAT, r3,
  rgba, mixHex, pop01, outK, popOut, glowStroke, popText, drawBits, makeBurst, drawBurst, drawChat, drawDealCard, drawStamp,
  TOQUE, TOQUE_C, SCARF, SCARF_C, SHADES, SHADES_C, drawTears, floatHearts,
} from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const LEO = signStar('leo'), PISCES = signStar('pisces')
const FLIP = BEAT(4)                           // 2.822

// ── the timeline
const T = {
  black: [0, 0.3], h0: 0.12, winter: BEAT(1.5), and: 2.36, flip: FLIP, pile: [0.15, 2.6], wipe: [FLIP - 0.02, FLIP + 0.45],
  toque: [FLIP + 0.02, FLIP + 1.1], shades: [3.12, 3.42], open: FLIP + 0.08, lights: FLIP + 0.1, crack: FLIP + 0.05, h0Out: [3.78, 3.95],
  boxA: 3.38, l1: 3.55,
  h1: 4.0, h1Late: 6.4, date: 4.7, k: 5.3, run: 5.9, zip: [6.35, 6.6], roll: [6.45, 7.6], l2: 6.55, cryA: [6.7, 9.3], boxAClose: 9.42, h1Out: [9.36, 9.54],
  cut: 9.6,
  h2: 9.66, h2Late: 10.0, dim: [9.55, 9.75], card: [9.72, 10.1], stamp1: BEAT(17.5), stamp2: BEAT(18.5), boxB: 10.8, l3: 10.95,
  cardOut: [12.7, 13.02], undim: [12.75, 13.15], h2Out: [12.62, 12.8],
  h3: 13.02, h3Late: 13.5, partner: 13.2, clink: 14.0, fw: [14.3, 14.62], cryB: [14.05, 15.2], boxBClose: 13.75, out: [15.05, 15.45],
}
const SPEAK = '♌ LEO STAR', LEOC = '#ffb347'
const LINES_A = [
  { t: T.l1, speaker: SPEAK, text: "it's short. don't *waste* it.", color: LEOC },
  { t: T.l2, speaker: SPEAK, text: "'k.' is not a *conversation.*", color: LEOC },
]
const LINES_B = [
  { t: T.l3, speaker: SPEAK, text: 'say them *before* the first date.', color: LEOC },
]
const CPS = 30
const HOPS = [...talkHops(LINES_A, SPEAK, { cps: CPS }), ...talkHops(LINES_B, SPEAK, { cps: CPS }), T.shades[1], T.stamp1 - 0.05, T.stamp2 - 0.05, T.clink - 0.1]

// ── the world geometry (raised so the dialogue box sits on the deck)
const SB = 1130                 // skyline base = lake top
const RAIL = 1290               // patio rail
const TB = { x: 540, top: 1400, w: 640, bot: 1570 }
const SEAT = { me: 290, you: 790, y: 1290, size: 280 }
const PIS = { x: 965, y: 1210, size: 120 }
const NEEDLE = { x: 330, h: 600 }
const TOWERS = (() => {
  const r = rng(31), out = []
  const spec = [[-20, 120, 230], [92, 92, 320], [186, 112, 260], [400, 96, 380], [494, 118, 290], [606, 86, 410], [690, 128, 270], [816, 96, 350], [910, 108, 250], [1016, 100, 310]]
  for (const [tx, w, h] of spec) {
    const win = []
    for (let yy = 28; yy < h - 18; yy += 32) for (let xx = 14; xx < w - 16; xx += 24) if (r() < 0.38) win.push([xx, yy, r()])
    out.push({ x: tx, w, h, win, bal: r() < 0.5 })
  }
  return out
})()
const FLAKES = (() => { const r = rng(77); return Array.from({ length: 80 }, () => ({ x0: r() * 1160, y0: r() * 2000, sp: 110 + r() * 230, d: 0.3 + r() * 0.7, w: 0.8 + r() * 1.6, ph: r() * TAU, big: r() < 0.22 })) })()
const STRANDS = [{ a: [-30, 600], b: [1110, 680], sag: 140, n: 15 }, { a: [-30, 770], b: [1110, 700], sag: 100, n: 15 }]
const BULB_COLS = [GOLD, WARM, PINK, BONE, '#ffd98a']
const strandPt = (s, u, drop = 0) => [lerp(s.a[0], s.b[0], u), lerp(s.a[1], s.b[1], u) + s.sag * 4 * u * (1 - u) - drop]
const SHARDS = (() => { const r = rng(9); return Array.from({ length: 12 }, (_, i) => ({ a: (i / 12) * TAU + r() * 0.4, v: 260 + r() * 260, s: 14 + r() * 18, spin: (r() - 0.5) * 12 })) })()

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 104px Inter", "italic 500 150px 'EB Garamond'", "italic 500 200px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 40px 'Space Mono'", "900 46px Inter", "800 40px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Toronto has | two seasons: | *winter* and *patio.*', { top: 150, size: 112, accentSize: 150, accentColor: WARM, wobble: true,
    times: [T.h0, T.h0 + 0.1, T.h0 + 0.24, T.h0 + 0.34, T.winter, T.and, T.flip] })
  const H1 = popText(root, "Don't spend | patio season | on the *wrong* *person.*", { top: 160, size: 104, accentSize: 132, accentColor: PINK, at: T.h1, gap: 0.07, late: 4, lateAt: T.h1Late, lateGap: 0.09, wobble: true })
  const H2 = popText(root, 'Dealbreakers | come *first.*', { top: 170, size: 116, accentSize: 160, accentColor: GOLD, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Late, wobble: true })
  const H3 = popText(root, 'Make this | patio season | *count.*', { top: 150, size: 112, accentSize: 200, accentColor: GOLD, at: T.h3, gap: 0.08, late: 1, lateAt: T.h3Late, wobble: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1600, width: 960, height: 270, open: T.boxA, close: T.boxAClose, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1600, width: 960, height: 270, open: T.boxB, close: T.boxBClose, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B_FLIP = makeBurst(2, 18, 440), B_DATE = makeBurst(6, 8, 140), B_ST1 = makeBurst(10, 14, 300), B_ST2 = makeBurst(11, 14, 300)
  const B_PART = makeBurst(12, 8, 150), B_CLINK = makeBurst(13, 14, 200), B_FW1 = makeBurst(14, 18, 210), B_FW2 = makeBurst(15, 18, 180), B_SH = makeBurst(16, 10, 160)

  const pileK = t => ease.outCubic(prog(t, ...T.pile))
  const nightK = t => ease.inOutQuad(prog(t, T.cut, T.h3 + 0.3))
  const worldK = t => outK(t, T.out)
  const dimK = t => 0.72 * ease.inOutQuad(prog(t, ...T.dim)) * (1 - ease.inOutQuad(prog(t, ...T.undim)))

  // ═════════════ the world in one season (s = 0 winter, 1 summer)
  function tint(t, s) {
    if (!s) {
      const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, rgba('#6a8cff', 0.14)); g.addColorStop(0.6, rgba(ICE, 0.2)); g.addColorStop(1, rgba(ICE, 0.32))
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); return
    }
    const warm = lerp(1, 0.4, nightK(t))
    const g = x.createLinearGradient(0, 380, 0, SB + 40); g.addColorStop(0, rgba('#b04ab0', 0)); g.addColorStop(0.55, rgba(CORAL, 0.32 * warm)); g.addColorStop(1, rgba(WARM, 0.55 * warm))
    x.fillStyle = g; x.fillRect(0, 380, 1080, SB + 40 - 380)
  }
  function needle(s, pile) {
    const cx = NEEDLE.x, edge = s ? VIOLET : ICE
    x.beginPath(); x.moveTo(cx - 32, SB); x.lineTo(cx - 9, SB - 400); x.lineTo(cx + 9, SB - 400); x.lineTo(cx + 32, SB); x.closePath()
    x.fillStyle = NIGHT; x.fill(); glowStroke(x, edge, 4, 12); x.stroke(); x.shadowBlur = 0
    x.beginPath(); x.ellipse(cx, SB - 410, 58, 24, 0, 0, TAU); x.fillStyle = NIGHT; x.fill(); glowStroke(x, edge, 4, 12); x.stroke(); x.shadowBlur = 0
    x.fillStyle = rgba(GOLD, 0.8); for (let i = -3; i <= 3; i++) x.fillRect(cx + i * 14 - 4, SB - 414, 8, 8)
    x.beginPath(); x.rect(cx - 7, SB - 520, 14, 104); x.fillStyle = NIGHT; x.fill(); glowStroke(x, edge, 3, 10); x.stroke(); x.shadowBlur = 0
    x.beginPath(); x.moveTo(cx, SB - 520); x.lineTo(cx, SB - NEEDLE.h); x.strokeStyle = edge; x.lineWidth = 4; x.stroke()
    const blink = 0.5 + 0.5 * Math.sin(x.__t * 5)
    x.beginPath(); x.arc(cx, SB - NEEDLE.h, 7, 0, TAU); x.fillStyle = rgba('#ff5a4a', 0.4 + 0.6 * blink); x.fill()
    if (!s && pile > 0) {
      x.fillStyle = SNOW; x.beginPath(); x.ellipse(cx, SB - 428, 54 * Math.min(1, pile * 1.4), 6 + 12 * pile, 0, Math.PI, TAU); x.fill()
    }
  }
  function skyline(t, s) {
    const pile = s ? 0 : pileK(t)
    x.__t = t
    needle(s, pile)
    for (const tw of TOWERS) {
      const top = SB - tw.h
      x.beginPath(); x.rect(tw.x, top, tw.w, tw.h); x.fillStyle = NIGHT; x.fill()
      glowStroke(x, rgba(s ? VIOLET : ICE, 0.85), 4, 12); x.stroke(); x.shadowBlur = 0
      if (tw.bal) { x.strokeStyle = rgba(s ? VIOLET : ICE, 0.35); x.lineWidth = 2; for (let yy = top + 40; yy < SB - 10; yy += 32) { x.beginPath(); x.moveTo(tw.x + 6, yy); x.lineTo(tw.x + tw.w - 6, yy); x.stroke() } }
      for (const [wx, wy, q] of tw.win) {
        const on = 0.55 + 0.45 * Math.sin(t * (0.6 + q) + q * 40)
        x.fillStyle = rgba(q > 0.72 ? (s ? PINK : ICE) : GOLD, (0.3 + 0.5 * on) * (s ? 1 : 0.8)); x.fillRect(tw.x + wx, top + wy, 11, 15)
      }
      if (pile > 0) {
        const h = 4 + 28 * pile
        x.fillStyle = SNOW; x.beginPath(); x.moveTo(tw.x - 6, top + 4); x.quadraticCurveTo(tw.x + tw.w * 0.2, top - h * 1.1, tw.x + tw.w * 0.5, top - h); x.quadraticCurveTo(tw.x + tw.w * 0.85, top - h * 0.95, tw.x + tw.w + 6, top + 4); x.closePath(); x.fill()
      }
    }
  }
  function lake(t, s) {
    if (!s) {
      const g = x.createLinearGradient(0, SB, 0, RAIL); g.addColorStop(0, '#5f7fae'); g.addColorStop(1, '#a8c7e8')
      x.fillStyle = g; x.fillRect(0, SB, 1080, RAIL - SB)
      x.fillStyle = rgba(SNOW, 0.15 + 0.3 * pileK(t)); x.fillRect(0, SB, 1080, RAIL - SB)
      x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = 3
      for (const [ax, ay, bx, by, cx2, cy2] of [[120, 1170, 220, 1200, 300, 1186], [560, 1160, 640, 1220, 760, 1210]]) { x.beginPath(); x.moveTo(ax, ay); x.lineTo(bx, by); x.lineTo(cx2, cy2); x.stroke() }
      return
    }
    const nk = nightK(t)
    const g = x.createLinearGradient(0, SB, 0, RAIL); g.addColorStop(0, mixHex('#2c5fb0', '#1a2a66', nk)); g.addColorStop(1, mixHex('#1b2f6e', '#0e1338', nk))
    x.fillStyle = g; x.fillRect(0, SB, 1080, RAIL - SB)
    x.save(); x.globalCompositeOperation = 'lighter'
    const r = rng(5)
    for (let i = 0; i < 22; i++) {
      const gy = SB + 14 + r() * (RAIL - SB - 30), gx0 = r() * 1200 - 60, len = 24 + r() * 60, sp = 20 + r() * 30
      const tw = 0.5 + 0.5 * Math.sin(t * (3 + r() * 4) + i * 1.7), xx = ((gx0 + t * sp) % 1200) - 60
      x.strokeStyle = rgba(i % 3 ? GOLD : '#fff3d0', 0.25 + 0.6 * tw); x.lineWidth = 4; x.lineCap = 'round'
      x.beginPath(); x.moveTo(xx, gy); x.lineTo(xx + len * (0.6 + 0.4 * tw), gy); x.stroke()
    }
    x.restore()
    glowStroke(x, rgba(GOLD, 0.8), 4, 14); x.beginPath(); x.moveTo(0, SB); x.lineTo(1080, SB); x.stroke(); x.shadowBlur = 0
  }
  function deck(t, s) {
    const railC = s ? BONE : ICE
    x.save()
    glowStroke(x, railC, 7, 14)
    x.beginPath(); x.moveTo(0, RAIL); x.lineTo(1080, RAIL); x.stroke()
    x.lineWidth = 5; x.beginPath(); x.moveTo(0, RAIL + 50); x.lineTo(1080, RAIL + 50); x.stroke()
    x.lineWidth = 6; for (let px = 30; px < 1080; px += 90) { x.beginPath(); x.moveTo(px, RAIL); x.lineTo(px, RAIL + 110); x.stroke() }
    x.shadowBlur = 0
    const g = x.createLinearGradient(0, RAIL + 110, 0, 1920); g.addColorStop(0, s ? '#3a2448' : '#3a4a6e'); g.addColorStop(1, s ? '#1d1230' : '#202a48')
    x.fillStyle = g; x.fillRect(0, RAIL + 110, 1080, 1920 - RAIL - 110)
    x.strokeStyle = rgba(s ? WARM : ICE, 0.22); x.lineWidth = 3
    for (let yy = RAIL + 150; yy < 1920; yy += 56) { x.beginPath(); x.moveTo(0, yy); x.lineTo(1080, yy); x.stroke() }
    if (!s) {
      const p = pileK(t)
      x.fillStyle = SNOW; x.beginPath(); x.roundRect(-10, RAIL - 6 - 18 * p, 1100, 8 + 18 * p, 10); x.fill()
      const top = lerp(1930, RAIL + 170, p)
      x.beginPath(); x.moveTo(0, 1920); x.lineTo(0, top + 30)
      for (let px = 0; px <= 1080; px += 60) x.lineTo(px, top + 22 * Math.sin(px * 0.013 + 1.3) + 14 * Math.sin(px * 0.031))
      x.lineTo(1080, 1920); x.closePath()
      const sg = x.createLinearGradient(0, top - 30, 0, 1920); sg.addColorStop(0, SNOW); sg.addColorStop(0.35, '#c9dcf2'); sg.addColorStop(1, '#7f97c4')
      x.fillStyle = sg; x.fill()
    }
    x.restore()
  }
  function umbrella(t, s) {
    const top = 940, rim = 1040, half = 280
    x.save()
    x.strokeStyle = BONE; x.lineWidth = 12; x.lineCap = 'round'
    x.beginPath(); x.moveTo(TB.x, TB.top); x.lineTo(TB.x, top - 16); x.stroke()
    if (!s) {
      x.beginPath(); x.moveTo(TB.x, top - 10); x.quadraticCurveTo(TB.x + 34, top + 100, TB.x + 12, top + 190); x.lineTo(TB.x - 12, top + 190); x.quadraticCurveTo(TB.x - 34, top + 100, TB.x, top - 10); x.closePath()
      x.fillStyle = mixHex(PINK, NIGHT, 0.35); x.fill(); glowStroke(x, ICE, 5, 12); x.stroke(); x.shadowBlur = 0
      const p = pileK(t); x.fillStyle = SNOW; x.beginPath(); x.ellipse(TB.x, top - 6, 18 + 14 * p, 6 + 16 * p, 0, Math.PI, TAU); x.fill()
      x.restore(); return
    }
    const ok = easeOutBack(prog(t, T.open, T.open + 0.42), 2.6)
    const w = half * Math.max(0.06, ok), dip = lerp(140, 0, clamp(ok)), segs = 6
    for (let i = 0; i < segs; i++) {
      const xa = TB.x - w + 2 * w * i / segs, xb = TB.x - w + 2 * w * (i + 1) / segs
      x.beginPath(); x.moveTo(TB.x, top + dip * 0.4); x.lineTo(xa, rim + dip); x.quadraticCurveTo((xa + xb) / 2, rim + dip + 26, xb, rim + dip); x.closePath()
      x.fillStyle = i % 2 ? mixHex(BONE, NIGHT, 0.1) : PINK; x.fill()
    }
    x.beginPath(); x.moveTo(TB.x, top + dip * 0.4); x.lineTo(TB.x - w, rim + dip)
    for (let i = 0; i < segs; i++) { const xa = TB.x - w + 2 * w * i / segs, xb = TB.x - w + 2 * w * (i + 1) / segs; x.quadraticCurveTo((xa + xb) / 2, rim + dip + 26, xb, rim + dip) }
    x.closePath(); glowStroke(x, BONE, 6, 16); x.stroke(); x.shadowBlur = 0
    x.fillStyle = GOLD; x.beginPath(); x.arc(TB.x, top + dip * 0.4 - 6, 10, 0, TAU); x.fill()
    x.restore()
  }
  function glass(cx, by, a = 1, tilt = 0) {
    if (a <= 0) return
    x.save(); x.globalAlpha *= a; x.translate(cx, by); x.rotate(tilt)
    x.fillStyle = rgba(WARM, 0.85); x.beginPath(); x.moveTo(-22, -58); x.lineTo(22, -58); x.lineTo(16, -6); x.lineTo(-16, -6); x.closePath(); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.75)'; x.beginPath(); x.ellipse(-8, -48, 4, 9, 0.2, 0, TAU); x.fill()
    glowStroke(x, BONE, 5, 10); x.beginPath(); x.moveTo(-28, -84); x.lineTo(28, -84); x.lineTo(19, -2); x.lineTo(-19, -2); x.closePath(); x.stroke(); x.shadowBlur = 0
    x.restore()
  }
  function table(t, s) {
    x.save()
    x.fillStyle = s ? '#2c1f4a' : '#2a3558'
    x.beginPath(); x.moveTo(TB.x - TB.w / 2 + 20, TB.top + 20); x.lineTo(TB.x + TB.w / 2 - 20, TB.top + 20); x.lineTo(TB.x + TB.w / 2 + 30, TB.bot); x.lineTo(TB.x - TB.w / 2 - 30, TB.bot); x.closePath(); x.fill()
    glowStroke(x, s ? PINK : ICE, 5, 12); x.stroke(); x.shadowBlur = 0
    x.fillStyle = s ? '#3d2c63' : '#3c4c78'; x.beginPath(); x.roundRect(TB.x - TB.w / 2, TB.top - 10, TB.w, 34, 14); x.fill(); glowStroke(x, BONE, 6, 16); x.stroke(); x.shadowBlur = 0
    if (!s) {
      const p = pileK(t), h = 16 + 64 * p
      x.fillStyle = SNOW
      x.beginPath(); x.moveTo(TB.x - TB.w / 2 - 14, TB.top + 4)
      x.bezierCurveTo(TB.x - TB.w * 0.42, TB.top - h * 0.9, TB.x - TB.w * 0.15, TB.top - h * 1.1, TB.x + 10, TB.top - h)
      x.bezierCurveTo(TB.x + TB.w * 0.2, TB.top - h * 0.95, TB.x + TB.w * 0.44, TB.top - h * 0.7, TB.x + TB.w / 2 + 14, TB.top + 4); x.closePath(); x.fill()
      x.strokeStyle = rgba(ICE, 0.7); x.lineWidth = 4; x.stroke()
    } else {
      // two glasses; on the payoff they slide together and clink
      const reach = ease.inOutCubic(prog(t, T.clink - 0.5, T.clink))
      const back = ease.inOutCubic(prog(t, T.clink + 0.35, T.clink + 0.8))
      const d = lerp(150, 34, reach * (1 - back * 0.6))
      const tilt = reach * (1 - back) * 0.18
      glass(TB.x - d, TB.top - 6, 1, tilt); glass(TB.x + d, TB.top - 6, 1, -tilt)
    }
    x.restore()
  }
  function lights(t, s) {
    if (!s) return
    const nk = nightK(t), flare = t > T.clink ? Math.exp(-(t - T.clink) * 2.5) : 0
    STRANDS.forEach((st, si) => {
      const drop = (1 - easeOutBack(prog(t, T.lights + si * 0.06, T.lights + 0.42 + si * 0.06), 1.6)) * 520
      x.strokeStyle = 'rgba(42,32,64,0.95)'; x.lineWidth = 4; x.beginPath()
      for (let j = 0; j <= 40; j++) { const [px, py] = strandPt(st, j / 40, drop); j ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke()
      for (let i = 0; i < st.n; i++) {
        const [px, py0] = strandPt(st, (i + 0.5) / st.n, drop), py = py0 + 10
        const on = prog(t, T.lights + 0.18 + i * 0.035 + si * 0.05, T.lights + 0.24 + i * 0.035 + si * 0.05)
        const tw = 0.82 + 0.18 * Math.sin(t * 6 + i * 2.1 + si * 3), col = BULB_COLS[(i + si * 2) % BULB_COLS.length]
        const glow = on * tw * (1 + 0.4 * nk + 0.6 * flare)
        if (glow > 0.01) {
          x.save(); x.globalCompositeOperation = 'lighter'
          const R = 46 + 16 * nk + 22 * flare, g = x.createRadialGradient(px, py + 8, 2, px, py + 8, R)
          g.addColorStop(0, rgba(col, 0.55 * glow)); g.addColorStop(1, rgba(col, 0)); x.fillStyle = g; x.beginPath(); x.arc(px, py + 8, R, 0, TAU); x.fill(); x.restore()
        }
        x.fillStyle = '#2a2040'; x.fillRect(px - 6, py - 8, 12, 10)
        x.beginPath(); x.ellipse(px, py + 12, 11, 15, 0, 0, TAU); x.fillStyle = on > 0 ? mixHex('#5a4a70', col, on) : '#5a4a70'; x.fill()
      }
    })
  }
  function flakes(t, s) {
    const fade = s ? 1 - prog(t, FLIP, FLIP + 0.8) : 1
    if (fade <= 0) return
    x.save()
    for (const f of FLAKES) {
      const px = ((f.x0 + Math.sin(t * f.w + f.ph) * 26 - t * 30 * f.d) % 1160 + 1160) % 1160 - 40
      let py = ((f.y0 + t * f.sp) % 2000 + 2000) % 2000 - 40
      if (s) py -= (t - FLIP) * 600          // after the flip: the snow bursts up and away as sparkles
      x.globalAlpha = (0.45 + 0.55 * f.d) * fade
      x.fillStyle = s ? [GOLD, WARM, PINK][Math.floor(f.ph) % 3] : SNOW
      const r = (f.big ? 6 : 3.5) * (0.6 + f.d)
      x.fillRect(Math.round(px - r), Math.round(py - r), Math.round(r * 2), Math.round(r * 2))
    }
    x.restore()
  }
  // Pisces: frozen in an ice cube on the rail (winter), then free, then weeping on cue
  function pisces(t, s) {
    const r = drawStarChar(x, PIS.x, PIS.y, PIS.size, t, { color: PISCES.color, glyph: null, mood: !s ? 'wide' : t < T.crack + 0.8 ? 'wide' : (t > T.cryA[0] && t < T.cryA[1]) ? 'squint' : t > T.cryB[0] ? 'heart' : 'neutral',
      look: s ? [-1, 0] : [0, 0], blink: s ? undefined : false, bob: s ? 4 : 0, seed: 9, glow: 0.8, hops: s ? [T.crack + 0.1] : null })
    if (!s) {
      const k = 1 - 0.3 * pileK(t)
      x.save(); x.fillStyle = rgba(ICE, 0.42 * (2 - k)); x.strokeStyle = rgba('#ffffff', 0.9); x.lineWidth = 5
      x.beginPath(); x.roundRect(PIS.x - 84, PIS.y - 84, 168, 160, 14); x.fill(); x.stroke()
      x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(PIS.x - 66, PIS.y - 70, 14, 50); x.fillRect(PIS.x - 66, PIS.y - 14, 14, 14)
      x.restore()
    } else {
      // shards fly
      const p = prog(t, T.crack, T.crack + 0.7)
      if (p > 0 && p < 1) {
        x.save(); x.globalAlpha = 1 - p
        for (const q of SHARDS) {
          const d = q.v * ease.outCubic(p)
          x.save(); x.translate(PIS.x + Math.cos(q.a) * d, PIS.y + Math.sin(q.a) * d + 300 * p * p); x.rotate(q.spin * p)
          x.fillStyle = rgba(ICE, 0.8); x.strokeStyle = '#fff'; x.lineWidth = 3; x.beginPath(); x.moveTo(0, -q.s); x.lineTo(q.s * 0.8, q.s * 0.6); x.lineTo(-q.s * 0.7, q.s * 0.5); x.closePath(); x.fill(); x.stroke()
          x.restore()
        }
        x.restore()
      }
      drawTears(x, r, t, T.cryA[0], T.cryA[1], 5)
      drawTears(x, r, t, T.cryB[0], T.cryB[1], 5)
      if (t > T.cryB[0]) floatHearts(x, t, PIS.x, PIS.y, T.cryB[0] + 0.1, T.out[0], 5, 5, 90)
    }
  }
  function leoMood(t) {
    if (t < FLIP) return { mood: 'squint', look: [0, 0], blink: false }
    if (t < T.shades[1]) return { mood: 'wide', look: [0, -1], blink: false }
    if (t < T.date + 0.2) return { mood: 'happy' }
    if (t < T.k) return { mood: 'neutral', look: [1, 0] }
    if (t < T.zip[0]) return { mood: 'wide', look: [1, 0], blink: false }
    if (t >= T.roll[0] && t < T.roll[1]) return { mood: 'eyeroll', blink: false }
    if (t < T.cut) return { mood: 'neutral', look: [0, 0] }
    if (t < T.stamp1) return { mood: 'squint', look: [1, -1] }
    if (t < T.partner + 0.2) return { mood: 'happy' }
    return { mood: 'heart' }
  }
  function leo(t, s) {
    const st = leoMood(t)
    const shiver = s ? 0 : 5 * Math.sin(t * 61) * (0.4 + 0.6 * pileK(t))
    const flipJolt = t > FLIP && t < FLIP + 0.6 ? -0.18 * Math.exp(-(t - FLIP) * 6) * Math.cos((t - FLIP) * 22) : 0
    const r = drawStarChar(x, SEAT.me + shiver, SEAT.y, SEAT.size, t, { color: LEO.color, glyph: LEO.glyph, ...st, hops: HOPS, squash: (s ? 0 : -0.06) + flipJolt, seed: 4, glow: 1.1 })
    const c = r.size / 36
    if (!s) {
      drawBits(x, SCARF, SCARF_C, Math.round(r.x + 1.5 * c), Math.round(r.y + 8.2 * c), c * 0.85)
      drawBits(x, TOQUE, TOQUE_C, Math.round(r.x), Math.round(r.top + 2.2 * c), c * 0.72)
    } else {
      // the toque and scarf fly off on the flip
      const p = prog(t, ...T.toque)
      if (p < 1) {
        drawBits(x, TOQUE, TOQUE_C, Math.round(r.x + 220 * p), Math.round(r.top + 2.2 * c - 700 * p + 500 * p * p), c * 0.72, { rot: p * 5, alpha: 1 - p * 0.3 })
        drawBits(x, SCARF, SCARF_C, Math.round(r.x - 260 * p), Math.round(r.y + 8.2 * c - 500 * p + 700 * p * p), c * 0.85, { rot: -p * 4, alpha: 1 - p })
      }
      // sunglasses drop from above onto the eyes (pushed up on the forehead for the heart-eye payoff)
      const sp = ease.outBounce ? ease.outBounce(prog(t, ...T.shades)) : ease.outCubic(prog(t, ...T.shades))
      if (t > T.shades[0]) {
        const up = ease.inOutCubic(prog(t, T.partner - 0.1, T.partner + 0.2))
        const gyEyes = r.y + 1.3 * c, gyTop = r.y - 5.2 * c
        const gy = lerp(r.y - 600, lerp(gyEyes, gyTop, up), sp)
        drawBits(x, SHADES, SHADES_C, Math.round(r.x), Math.round(gy), c * 0.66)
      }
    }
    return r
  }
  function date(t) {
    if (t < T.date || t > T.zip[1] + 0.05) return
    const k = pop01(t, T.date, 0.36, 2.2)
    const zp = ease.inCubic(prog(t, ...T.zip))
    const dx = SEAT.you + 900 * zp
    const r = drawStarChar(x, dx, SEAT.y, SEAT.size * 0.92, t, { color: GREY, mood: t < T.run + 0.1 ? 'neutral' : 'wide', look: t < T.run ? [-1, 1] : [1, 0], pop: k, seed: 12, glow: 0.5, squash: zp > 0 ? -0.15 : 0 })
    // phone glow + a little phone
    if (zp <= 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(dx - 70, SEAT.y + 60, 4, dx - 70, SEAT.y + 60, 140); g.addColorStop(0, rgba(CYAN, 0.5 * k)); g.addColorStop(1, rgba(CYAN, 0))
      x.fillStyle = g; x.beginPath(); x.arc(dx - 70, SEAT.y + 60, 140, 0, TAU); x.fill(); x.restore()
      x.fillStyle = '#dff6ff'; x.beginPath(); x.roundRect(dx - 100, SEAT.y + 40, 44, 72, 8); x.fill()
    } else {
      x.save(); x.globalAlpha = 1 - prog(t, T.zip[1] - 0.1, T.zip[1] + 0.05)
      for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? BONE : '#cfd6ec'; const len = 160 + (i * 47) % 120; x.fillRect(Math.round(dx - 180 - len), Math.round(SEAT.y - 100 + i * 36), len, 8) }
      x.restore()
    }
    // bubbles
    const kb1 = pop01(t, T.k, 0.3, 2.4) * (1 - prog(t, T.run - 0.08, T.run))
    drawChat(x, SEAT.you + 40, SEAT.y - 230, 150, 96, 'k.', kb1, { tail: -1, size: 0.55 })
    const kb2 = pop01(t, T.run, 0.3, 2.4) * (1 - prog(t, T.zip[0] + 0.1, T.zip[0] + 0.3))
    drawChat(x, SEAT.you + 10, SEAT.y - 240, 330, 100, 'gotta run!', kb2, { tail: -1, size: 0.42 })
    void r
  }
  function partner(t) {
    if (t < T.partner) return
    const k = pop01(t, T.partner, 0.4, 2.2) * popOut(t, T.out)
    const r = drawStarChar(x, SEAT.you, SEAT.y, SEAT.size, t, { color: PINK, mood: t < T.partner + 0.4 ? 'wide' : 'heart', look: [-1, 0], pop: k, seed: 7, glow: 1.1, hops: [T.clink - 0.1] })
    drawBurst(x, B_PART, SEAT.you, SEAT.y, t, T.partner, [PINK, GOLD, BONE])
    return r
  }
  function fireworks(t) {
    drawBurst(x, B_FW1, 220, 470, t, T.fw[0], [GOLD, PINK, WARM], 0.9)
    drawBurst(x, B_FW2, 870, 430, t, T.fw[1], [CYAN, GOLD, PINK], 0.9)
  }

  function world(t, s) {
    tint(t, s); skyline(t, s); lake(t, s); deck(t, s); umbrella(t, s)
    pisces(t, s)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: lerp(SKY_H.dim, 0.42, nightK(t)) })
      const wk = worldK(t)
      if (wk > 0) {
        x.save(); x.globalAlpha = wk
        const s = t >= FLIP ? 1 : 0
        // summer (or winter) world, stars at the table
        world(t, s)
        const r = leo(t, s)
        if (s) { date(t); partner(t) }
        table(t, s)
        flakes(t, s)
        lights(t, s)
        // the ring wipe: winter stays outside the growing ring for a beat after the flip
        const wp = prog(t, ...T.wipe)
        if (s && wp < 1) {
          const R = 30 + 1500 * ease.inOutCubic(wp)
          x.save(); x.beginPath(); x.rect(0, 0, 1080, 1920); x.arc(540, 1000, R, 0, TAU, true); x.clip('evenodd')
          drawSky(x, t, SKY_H); world(t, 0); leo(t, 0); table(t, 0); flakes(t, 0)
          x.restore()
          x.save(); x.globalCompositeOperation = 'lighter'; x.strokeStyle = rgba(WARM, 0.9 * (1 - wp)); x.lineWidth = 40; x.shadowColor = WARM; x.shadowBlur = 40
          x.beginPath(); x.arc(540, 1000, R, 0, TAU); x.stroke(); x.restore()
        }
        drawBurst(x, B_FLIP, 540, 1000, t, FLIP, [GOLD, WARM, PINK, BONE], 0.9)
        drawBurst(x, B_SH, PIS.x, PIS.y, t, T.crack, [ICE, BONE], 0.6)
        if (r && t > T.shades[1] && t < T.shades[1] + 0.6) drawBurst(x, B_DATE, r.x, r.y, t, T.shades[1], [GOLD, BONE])
        fireworks(t)
        if (r && t > T.partner + 0.3) floatHearts(x, t, (SEAT.me + SEAT.you) / 2, SEAT.y - 60, T.partner + 0.3, T.out[0], 3, 9, 420)
        // clink spark
        const ck = t - T.clink
        if (ck > 0 && ck < 0.8) {
          x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 1 - ck / 0.8
          const g = x.createRadialGradient(TB.x, TB.top - 80, 2, TB.x, TB.top - 80, 120); g.addColorStop(0, rgba('#fff3c4', 1)); g.addColorStop(1, rgba(GOLD, 0))
          x.fillStyle = g; x.beginPath(); x.arc(TB.x, TB.top - 80, 120, 0, TAU); x.fill(); x.restore()
        }
        drawBurst(x, B_CLINK, TB.x, TB.top - 80, t, T.clink, [GOLD, BONE, PINK], 0.8)
        x.restore()

        // ── the dealbreakers card over a dimmed patio; Leo stays bright on top
        const dk = dimK(t)
        if (dk > 0) {
          x.fillStyle = `rgba(8,5,20,${dk.toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
          if (t > T.card[0] && t < T.cardOut[1]) leo(t, 1)
        }
        if (t > T.card[0] && t < T.cardOut[1]) {
          const ink = easeOutBack(prog(t, ...T.card), 1.7)
          const outp = ease.inCubic(prog(t, ...T.cardOut))
          const cx = 560, cy = lerp(-400, 900, ink) - 0 * outp
          const sc = lerp(1, 0.2, outp)
          x.save(); x.translate(lerp(cx, TB.x, outp), lerp(cy, TB.top - 60, outp)); x.rotate((1 - clamp(ink)) * -0.2); x.scale(sc, sc); x.globalAlpha = 1 - outp * 0.8
          drawDealCard(x, 600, 520)
          for (const [st, txt, yy, rot] of [[T.stamp1, '✕ FLAKY PLANS', -40, -0.05], [T.stamp2, '✕ ONE-WORD TEXTS', 140, 0.04]]) {
            const p = prog(t, st - 0.12, st)
            if (p <= 0) continue
            const big = lerp(2.2, 1, ease.inCubic(p)), shake = t > st && t < st + 0.25 ? 6 * Math.sin((t - st) * 80) * (1 - (t - st) / 0.25) : 0
            x.save(); x.translate(shake, yy); x.rotate(rot); x.scale(big, big); drawStamp(x, txt, clamp(p * 2), 42); x.restore()
          }
          x.restore()
          drawBurst(x, B_ST1, 560, 860, t, T.stamp1, [RED, GOLD, BONE])
          drawBurst(x, B_ST2, 560, 1040, t, T.stamp2, [RED, GOLD, BONE])
        }
      }
      boxA.update(t); boxB.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      const shiv = (i, tt) => (i === 4 && tt < FLIP ? { dx: 3.4 * Math.sin(tt * 71) * prog(tt, T.winter + 0.3, T.winter + 0.5), rot: 1.5 * Math.sin(tt * 53) * prog(tt, T.winter + 0.3, T.winter + 0.5) } : null)
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o), hd === H0 ? shiv : null)
      drawGrain(gx, t)
    },
  }
}

// card motif: one cut for a 20 s film, where the date has left and the box has shut → "Dealbreakers come first."
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: winter
  ...wordPops(T.h0, 4, 0.11), ['whoosh', 0.05, 0.9, 0.03], ['glitter', 0.3, 1.4],
  ...[0, 1, 2, 3, 4, 5].map(i => ['tick', r3(0.5 + i * 0.3), 0.018]),            // chattering teeth
  ['pop', T.winter, 1174.66, 0.05, 0], ['bell', r3(T.winter + 0.02), 1318.51, 0.03, 1.2, 0], ['pluck', T.winter, 293.66, 0.04, 0.6, 0],
  ['riser', 1.2, T.flip, 0.04], ['pop', T.and, 659.25, 0.035, 0],
  // the flip
  ['boom', T.flip, 0.15], ['pop', T.flip, 1174.66, 0.065, 0], ['pluck', T.flip, 440, 0.05, 0.6, 0], ['glitter', T.flip, r3(T.flip + 0.8)], ['whoosh', T.flip, 0.5, 0.045],
  ['tick', T.crack, 0.07], ['tick', r3(T.crack + 0.06), 0.05], ['bell', r3(T.crack + 0.04), 2093, 0.025, 0.6, 0.5],
  ['whoosh', r3(T.toque[0] + 0.02), 0.35, 0.035],
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ['pop', r3(T.lights + 0.18 + i * 0.07), NOTE[(2 + i) % NOTE.length], 0.02, (i % 2 ? 0.35 : -0.35)]),
  ['whoosh', T.shades[0], 0.25, 0.03], ['pop', T.shades[1], 739.99, 0.05, -0.3], ['bell', r3(T.shades[1] + 0.03), 1760, 0.03, 0.9, -0.3],
  ['pop', T.boxA, 739.99, 0.035, 0], ['pop', r3(T.boxA + 0.06), 987.77, 0.03, 0],
  ...talkCues(LINES_A, { cps: CPS }), ...talkCues(LINES_B, { cps: CPS }),
  // the wrong person
  ...wordPops(T.h1, 6, 0.07, 1, 0.022), ...wordPops(T.h1Late, 4, 0.09, 3, 0.04),
  ['pop', T.date, 493.88, 0.045, 0.4], ['tick', T.k, 0.06], ['pop', T.k, 493.88, 0.05, 0.4],
  ['tick', T.run, 0.06], ['pop', T.run, 659.25, 0.05, 0.3], ['whoosh', T.zip[0], 0.3, 0.05],
  ['pluck', T.roll[0], 196, 0.045, 0.5, -0.3], ['pluck', r3(T.roll[0] + 0.18), 174.61, 0.04, 0.6, -0.3],    // bwomp
  // dealbreakers
  ...wordPops(T.h2, 2, 0.1, 3), ['pop', T.h2Late, 1318.51, 0.06, 0], ['pluck', T.h2Late, 987.77, 0.045, 0.6, 0],
  ['whoosh', r3(T.card[0] - 0.05), 0.4, 0.04], ['pop', r3(T.card[0] + 0.25), 739.99, 0.05, 0],
  ...[T.stamp1, T.stamp2].flatMap((s, i) => [['whoosh', r3(s - 0.2), 0.2, 0.04], ['boom', s, i ? 0.16 : 0.12], ['tick', s, 0.09], ['bell', r3(s + 0.04), i ? 880 : 659.25, 0.04, 1.0, 0]]),
  ['pop', T.boxB, 739.99, 0.035, 0],
  ['whoosh', T.cardOut[0], 0.4, 0.035],
  // make it count
  ...wordPops(T.h3, 4, 0.08, 2), ['pop', T.h3Late, 1174.66, 0.065, 0], ['pluck', T.h3Late, 440, 0.05, 0.6, 0],
  ['pop', T.partner, 880, 0.055, 0.3], ['glitter', T.partner, r3(T.partner + 0.5)],
  ['bell', T.clink, 1567.98, 0.05, 1.6, -0.1], ['bell', r3(T.clink + 0.04), 2093, 0.035, 1.6, 0.1], ['glitter', T.clink, r3(T.clink + 0.7)],
  ...T.fw.flatMap((f, i) => [['whoosh', r3(f - 0.3), 0.3, 0.03], ['pop', f, i ? 987.77 : 739.99, 0.05, i ? 0.4 : -0.4], ['glitter', f, r3(f + 0.5)]]),
  ['whoosh', T.out[0], 0.4, 0.035],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
