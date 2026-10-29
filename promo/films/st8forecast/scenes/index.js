// st8forecast (25 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", EP 06) · story 0–20.6, then the shared end card.
//   Genre: the local TV weather report. "Today: 90% chance of *nostalgia.*"  Venus is retrograde (♀ Rx DAY 09), and on
//   the zodiac weather map rose-tint fronts (warm-front semicircles, in pink) roll in over Taurus and Libra: the two signs
//   Venus really rules. Aquarius is the forecaster ("chief METEOR-ologist"; the Meteor is an ex, so that's a pun).
//   0.00       frame 0: the hook card over the studio map, Aquarius mid-point with the clicker stick, the fronts already
//              rolling in, the radar sweeping, the LIVE bug, the 5-day ticker.
//   1.2        AQUARIUS: "a rose-tint front is rolling in over Taurus and Libra."
//   3.2        punch-in on the map + fact chip "Venus rules Taurus and Libra." · AQUARIUS: "astrology says retrograde is
//              for looking back."  6.7 "WE GO LIVE TO TAURUS" (news stinger).
//   8.0        field cam: Taurus in a yellow raincoat in pink rain, flipping rose-tinted photos (a flip every 1.2 s).
//              TAURUS: "these old photos are so pretty. were we this happy?"  (the hidden Comet crosses the sky; the
//              ghost peeks from behind the lamp post; the Orbiter blinks up in the clouds, "viewed".)
//   13.4       back to the studio: the radar zooms 2× · 4× · 8× into Taurus's pink cloud: a photo inside it. The pink
//              filter wipes off: the same photo, unfiltered: Taurus alone at the table, the clock late, "running late
//              (again)". AQUARIUS: "zooming in on that pink cloud… there." → "the cloud was pink. the photo wasn't."
//   17.9       zoom back out: the same map as frame 0, now clear: the fronts gone, a sun over ♉, the 90% chip rolls down
//              to CLEARING, Taurus (in the corner box) with the hood down. Last line: "Nostalgia is a *filter.*"
// One canvas (sky + studio + field + map), DOM type (hook card, dialogue box, last line), grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { drawVenus, drawComet, drawSatellite, drawDayChip, hookCard, hookCues, genreBug, drawTicker, stingerCues } from '../../st8cast.js'

export const DURATION = 25
const KEY = 'Eb'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', ROSE = '#ff6fa3', INK = '#1b1236', SKYB = '#7fd0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const AQU = signStar('aquarius'), TAU = signStar('taurus')

// ── the timeline
const T = {
  hookOut: 3.0,
  open: -0.9, l1: -0.7, punch: [3.2, 3.75], chip: 3.35, chipOut: [7.25, 7.5], l2: 4.9,
  live: 6.75, liveOut: [7.7, 7.95],
  field: 8.0, l3: 8.4, flips: [9.6, 10.8, 12.0], comet: 10.0, ghost: 11.0, orbiter: [9.0, 13.3],
  studio: 13.4, l4: 13.6, zoom: [13.85, 14.35, 14.85], close: 14.95, wipe: [15.35, 16.15], l5: 16.3,
  out: 17.75, back: [17.75, 18.35], last: 18.0, lastLand: 18.45, clear: 18.3, boxClose: 19.4, lastOut: [20.3, 20.55], end: [20.2, 20.55],
}
const AQN = '♒ AQUARIUS', TAN = '♉ TAURUS'
const LINES = [
  { t: T.l1, speaker: AQN, text: 'a rose-tint front is rolling in over Taurus and Libra.', color: AQU.color },
  { t: T.l2, speaker: AQN, text: 'astrology says retrograde is for *looking back.*', color: AQU.color },
  { t: T.l3, speaker: TAN, text: 'these old photos are *so* pretty. were we this happy?', color: TAU.color },
  { t: T.l4, speaker: AQN, text: 'zooming in on that pink cloud… *there.*', color: AQU.color },
  { t: T.l5, speaker: AQN, text: 'the cloud was pink. the photo *wasn’t.*', color: AQU.color },
]
const CPS = 28
const TICKER = '5-DAY OUTLOOK ·  MON ♡ NOSTALGIA  ·  TUE ♡ NOSTALGIA  ·  WED ♡ NOSTALGIA  ·  THU ♡ NOSTALGIA  ·  FRI ☀ CLEARING  ·  ' +
  'SATELLITE IMAGERY COURTESY OF THE ORBITER (HE SEES EVERYTHING)  ·  '

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const r3 = v => +v.toFixed(3)

// ── the studio map: a zodiac wheel drawn as a weather radar. Signs counter-clockwise from Aries on the left.
const PANEL = { x0: 70, y0: 598, x1: 1010, y1: 1238 }
const WC = { x: 520, y: 912, r: 250 }
const GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
const signPos = (i, r = WC.r) => { const a = (180 + i * 30) * Math.PI / 180; return { x: WC.x + Math.cos(a) * r, y: WC.y - Math.sin(a) * r } }
const TAU_P = signPos(1), LIB_P = signPos(6)
const FORE = { x: 890, y: 1120, size: 220 }
const ZOOM_AT = TAU_P

// pixel bits
const HOOD = ['.....YY.....', '....YYYY....', '...YYYYYY...', '..YYYYYYYY..', '.YYYyyyyYYY.', 'YYYy....yYYY', 'YYy......yYY', 'Yy........yY']
const HOOD_C = { Y: '#ffd23f', y: '#e8b21c' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
const SUN = ['..Y..Y..', '...YY...', 'Y.YYYY.Y', '.YYwYYY.', '.YYYYYY.', 'Y.YYYY.Y', '...YY...', '..Y..Y..']
const SUN_C = { Y: '#ffd23f', w: '#fff6c8' }

export const GHOST = { at: T.ghost, x: 952, y: 1040, where: 'leaning out from behind the lamp post on the field-cam street, right edge' }
export const COMET_AT = T.comet

function aquState(t) {
  if (t < T.l2) return { mood: 'happy', look: [-1, 0] }
  if (t < T.field) return { mood: 'neutral', look: [-1, -0.3] }
  if (t < T.wipe[0]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.out) return { mood: 'wide', look: [-1, 0], blink: false }
  return { mood: 'happy', look: [-1, 0] }
}
function tauState(t) {
  if (t < T.flips[0]) return { mood: 'sparkle', look: [0.6, 0.6] }
  if (t < T.flips[2]) return { mood: 'heart', look: [0.6, 0.6] }
  return { mood: 'sparkle', look: [0.7, 0.5] }
}
const AQ_HOPS = [...talkHops(LINES, AQN, { cps: CPS }), T.zoom[2], T.lastLand]
const TA_HOPS = [...talkHops(LINES, TAN, { cps: CPS }), ...T.flips]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "800 40px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Today: 90% chance | of *nostalgia.*', at: 0, out: T.hookOut, accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1452, width: 960, height: 280, open: T.open, close: T.boxClose, cps: CPS })
  const FH = popText(root, 'Reporting live | from the *past.*', { top: 200, size: 104, accentSize: 160, at: T.field + 0.25, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.field + 0.6, fit: true })
  const LAST = popText(root, 'Nostalgia is | a *filter.*', { top: 196, size: 116, accentSize: 178, at: T.last, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── small drawing helpers
  function label(text, cx, cy, { size = 30, color = BONE, font = MONO, weight = 700, align = 'center', alpha = 1, shadow = true } = {}) {
    x.save(); x.globalAlpha *= alpha; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, cx + 3, cy + 3) }
    x.fillStyle = color; x.fillText(text, cx, cy); x.restore()
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
  }
  /** a pink cloud blob of pixel discs */
  function cloud(cx, cy, s, a, seed = 0) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const B = [[0, 0, 1], [-0.9, 0.25, 0.75], [0.95, 0.2, 0.8], [-0.35, -0.45, 0.8], [0.45, -0.5, 0.7]]
    for (const pass of [0, 1]) for (const [bx, by, br] of B) {
      const rr = s * br * (pass ? 0.92 : 1.0) + Math.sin(seed + bx * 3) * 2
      x.fillStyle = pass ? '#ffb3cf' : '#c94d84'
      x.beginPath(); x.arc(Math.round(cx + bx * s), Math.round(cy + by * s + (pass ? -3 : 3)), rr, 0, Math.PI * 2); x.fill()
    }
    x.fillStyle = 'rgba(255,240,246,0.7)'; x.fillRect(Math.round(cx - s * 0.6), Math.round(cy - s * 0.65), Math.round(s * 0.35), 5)
    x.restore()
  }
  function rain(t, x0, y0, x1, y1, n, a, seed = 1, col = '#ff9cc2', speed = 900) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a; x.fillStyle = col
    for (let i = 0; i < n; i++) {
      const rx = x0 + ((i * 97.3 + seed * 31) % (x1 - x0)), ph = ((t * speed / (y1 - y0)) + i * 0.137 + seed * 0.3) % 1
      const ry = y0 + ph * (y1 - y0)
      x.fillRect(Math.round(rx - ph * 30), Math.round(ry), 4, 18)
    }
    x.restore()
  }
  /** a warm front in pink: a thick line with semicircle bumps on its leading side, sliding by `off` px */
  function front(pts, off, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a; x.translate(off.x, off.y)
    x.strokeStyle = ROSE; x.lineWidth = 9; x.lineJoin = 'round'
    x.beginPath(); pts.forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.stroke()
    x.fillStyle = ROSE
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[i + 1], dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy)
      const nx = -dy / L, ny = dx / L
      for (let s = 0.25; s < 1; s += 0.5) {
        const mx = ax + dx * s, my = ay + dy * s, ang = Math.atan2(dy, dx)
        x.beginPath(); x.arc(mx + nx * 2, my + ny * 2, 15, ang + Math.PI, ang + 2 * Math.PI); x.fill()
      }
    }
    x.restore()
  }
  function panelBg(k) {
    const { x0, y0, x1, y1 } = PANEL
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16)
    const g = x.createRadialGradient(WC.x, WC.y, 40, WC.x, WC.y, 620)
    g.addColorStop(0, '#16426a'); g.addColorStop(1, '#0a1834')
    x.fillStyle = g; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    x.strokeStyle = 'rgba(127,208,255,0.12)'; x.lineWidth = 2
    for (let gx2 = x0 + 47; gx2 < x1; gx2 += 94) { x.beginPath(); x.moveTo(gx2, y0); x.lineTo(gx2, y1); x.stroke() }
    for (let gy = y0 + 40; gy < y1; gy += 94) { x.beginPath(); x.moveTo(x0, gy); x.lineTo(x1, gy); x.stroke() }
    x.restore()
  }
  /** the zodiac radar map. storm 0…1 = how much nostalgia weather is on it; clearK 0…1 = sunny */
  function drawMap(t, storm, clearK) {
    const { x0, y0, x1, y1 } = PANEL
    x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip()
    panelBg(1)
    // rings
    x.strokeStyle = 'rgba(127,208,255,0.35)'; x.lineWidth = 3
    for (const rr of [WC.r * 0.42, WC.r, WC.r * 1.24]) { x.beginPath(); x.arc(WC.x, WC.y, rr, 0, Math.PI * 2); x.stroke() }
    for (let i = 0; i < 12; i++) { const a = (195 + i * 30) * Math.PI / 180; x.beginPath(); x.moveTo(WC.x + Math.cos(a) * WC.r * 0.42, WC.y - Math.sin(a) * WC.r * 0.42); x.lineTo(WC.x + Math.cos(a) * WC.r * 1.24, WC.y - Math.sin(a) * WC.r * 1.24); x.stroke() }
    // radar sweep
    const sa = t * 1.6
    x.save(); x.globalCompositeOperation = 'lighter'
    for (let k = 0; k < 14; k++) {
      x.fillStyle = `rgba(110,255,170,${0.05 * (1 - k / 14)})`
      x.beginPath(); x.moveTo(WC.x, WC.y); x.arc(WC.x, WC.y, WC.r * 1.24, sa - (k + 1) * 0.05, sa - k * 0.05); x.closePath(); x.fill()
    }
    x.restore()
    // the fronts: one from the left onto ♉, one from the right onto ♎ (already mid-roll at frame 0)
    const fk = ease.outCubic(prog(t, -2.5, 4.5))
    front([[60, 820], [120, 930], [140, 1060], [110, 1170]], { x: lerp(-40, 120, fk) - 260 * clearK, y: 0 }, storm)
    front([[985, 760], [930, 860], [925, 990]].map(([a, b]) => [a, b]), { x: lerp(60, -110, fk) + 300 * clearK, y: 0 }, storm)
    // rose-tint clouds and pink rain over Taurus and Libra
    for (const [P, s, sd] of [[TAU_P, 62, 1], [LIB_P, 58, 2]]) {
      const ca = storm * ease.outCubic(prog(t, -1, 2.2))
      rain(t, P.x - 70, P.y + 10, P.x + 70, P.y + 120, 10, ca * 0.9, sd)
      cloud(P.x + Math.sin(t * 0.8 + sd) * 6, P.y - 16, s, ca, sd)
      if (ca > 0.2) drawBits(x, HEART, HEART_C, Math.round(P.x + 30), Math.round(P.y - 70 + Math.sin(t * 3 + sd) * 5), 5, { alpha: ca })
      glow(P.x, P.y, 140, ROSE, 0.22 * ca)
    }
    // the sun, once it clears
    if (clearK > 0) {
      glow(TAU_P.x, TAU_P.y - 10, 160, '#ffd23f', 0.4 * clearK)
      drawBits(x, SUN, SUN_C, Math.round(TAU_P.x), Math.round(TAU_P.y - 14), 9 * easeOutBack(clearK, 2), { rot: t * 0.6 })
      drawBits(x, SUN, SUN_C, Math.round(LIB_P.x), Math.round(LIB_P.y - 14), 8 * easeOutBack(clamp(clearK * 1.2 - 0.2), 2), { rot: -t * 0.6 })
    }
    // the sign "cities"
    for (let i = 0; i < 12; i++) {
      const P = signPos(i, WC.r * 1.12), hot = (i === 1 || i === 6)
      label(GLYPHS[i], P.x, P.y, { size: hot ? 46 : 34, color: hot ? (storm > 0.3 ? '#ffd1e3' : '#fff6c8') : 'rgba(239,230,214,0.8)', font: "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols 2', serif", weight: 600 })
    }
    // the low-pressure centre: Venus, retrograde
    drawVenus(x, WC.x, WC.y, 118, t, { retro: lerp(1, 0.6, clearK), mood: clearK > 0.5 ? 'happy' : 'neutral', look: [-0.6, 0.4], seed: 3 })
    // corner chips: the % meter
    const pct = Math.round(lerp(90, 10, ease.inOutQuad(clearK)))
    x.save(); x.fillStyle = 'rgba(8,14,34,0.88)'; x.fillRect(x0 + 18, y1 - 92, 330, 72); x.strokeStyle = clearK > 0.5 ? '#ffd23f' : ROSE; x.lineWidth = 4; x.strokeRect(x0 + 18, y1 - 92, 330, 72); x.restore()
    label(`♡ ${pct}%`, x0 + 40, y1 - 64, { size: 34, color: clearK > 0.5 ? '#ffd23f' : PINK, align: 'left', font: INTER, weight: 800 })
    label(clearK > 0.5 ? 'CLEARING' : 'NOSTALGIA', x0 + 40, y1 - 33, { size: 22, color: BONE, align: 'left' })
    x.restore()
    // frame of the panel
    x.save(); x.strokeStyle = 'rgba(127,208,255,0.55)'; x.lineWidth = 4; x.strokeRect(x0, y0, x1 - x0, y1 - y0); x.restore()
    genreBug(x, t, { text: 'LIVE', x: x0 + 26, y: y0 + 30, color: '#ff4057' })
    label('☀ STAR WEATHER', x1 - 26, y0 + 34, { size: 26, color: SKYB, align: 'right' })
  }
  function lowerThird(t, k, title, sub, col) {
    if (k <= 0) return
    const y0 = 1262, w = lerp(0, 940, ease.outCubic(k))
    x.save(); x.beginPath(); x.rect(70, y0, w, 112); x.clip()
    x.fillStyle = col; x.fillRect(70, y0, 940, 62)
    x.fillStyle = 'rgba(10,8,26,0.92)'; x.fillRect(70, y0 + 62, 940, 46)
    x.font = `800 40px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = INK; x.fillText(title, 96, y0 + 33)
    x.font = `700 24px ${MONO}`; x.fillStyle = BONE; x.fillText(sub, 96, y0 + 86)
    x.restore()
  }
  /** a polaroid. kind 0 = beach at sunset, 1 = the café (the one that gets unfiltered), 2 = a concert. filt 0…1 = rose filter */
  function photo(t, cx, cy, w, rot, kind, filt, a = 1) {
    if (a <= 0) return
    const h = w * 1.18, iw = w - 28, ih = w - 30
    x.save(); x.globalAlpha = a; x.translate(cx, cy); x.rotate(rot)
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
    x.fillStyle = '#f6efe2'; x.fillRect(-w / 2, -h / 2, w, h)
    x.save(); x.translate(-iw / 2, -h / 2 + 14); x.beginPath(); x.rect(0, 0, iw, ih); x.clip()
    if (kind === 0) {
      const g = x.createLinearGradient(0, 0, 0, ih); g.addColorStop(0, '#ff9a6b'); g.addColorStop(1, '#ffd08a'); x.fillStyle = g; x.fillRect(0, 0, iw, ih)
      x.fillStyle = '#ffe9a8'; x.beginPath(); x.arc(iw / 2, ih * 0.62, iw * 0.16, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#3d6fa8'; x.fillRect(0, ih * 0.66, iw, ih * 0.34)
      drawPixelStar(x, iw * 0.34, ih * 0.6, iw * 0.24, 1, TAU.color); drawPixelStar(x, iw * 0.64, ih * 0.6, iw * 0.24, 1, '#b8b2c8')
    } else if (kind === 2) {
      x.fillStyle = '#2a1846'; x.fillRect(0, 0, iw, ih)
      for (let i = 0; i < 5; i++) { x.fillStyle = ['#ff6fa3', '#7fd0ff', '#ffd23f'][i % 3]; x.globalAlpha = a * 0.5; x.beginPath(); x.moveTo(iw * (0.1 + i * 0.2), 0); x.lineTo(iw * (0.05 + i * 0.2), ih); x.lineTo(iw * (0.2 + i * 0.2), ih); x.fill() }
      x.globalAlpha = a
      drawPixelStar(x, iw * 0.38, ih * 0.72, iw * 0.24, 1, TAU.color); drawPixelStar(x, iw * 0.62, ih * 0.72, iw * 0.24, 1, '#b8b2c8')
    } else {
      // the café: Taurus at a table, the other chair empty, the clock way past the time, the phone: "running late (again)"
      x.fillStyle = '#8a7f74'; x.fillRect(0, 0, iw, ih)
      x.fillStyle = '#6d6259'; x.fillRect(0, ih * 0.7, iw, ih * 0.3)
      x.fillStyle = '#efe6d6'; x.beginPath(); x.arc(iw * 0.78, ih * 0.2, iw * 0.1, 0, Math.PI * 2); x.fill()
      x.strokeStyle = '#2b2430'; x.lineWidth = 4; x.beginPath(); x.moveTo(iw * 0.78, ih * 0.2); x.lineTo(iw * 0.78, ih * 0.12); x.moveTo(iw * 0.78, ih * 0.2); x.lineTo(iw * 0.84, ih * 0.24); x.stroke()
      x.fillStyle = '#3d332e'; x.fillRect(iw * 0.18, ih * 0.62, iw * 0.64, 10); x.fillRect(iw * 0.48, ih * 0.62, 10, ih * 0.3)
      x.fillStyle = '#4a403a'; x.fillRect(iw * 0.72, ih * 0.5, 12, ih * 0.4); x.fillRect(iw * 0.72, ih * 0.68, iw * 0.16, 10)   // the empty chair
      drawStarChar(x, iw * 0.3, ih * 0.52, iw * 0.34, t, { color: TAU.color, mood: filt > 0.5 ? 'happy' : 'sleepy', look: [1, 0], blink: false, bob: 0, tips: false, glow: 0.4, zzz: false })
      // the phone
      x.fillStyle = '#1b1236'; x.fillRect(iw * 0.52, ih * 0.5, iw * 0.08, ih * 0.11)
      x.fillStyle = '#efe6d6'; x.fillRect(iw * 0.36, ih * 0.3, iw * 0.42, ih * 0.13)
      x.font = `700 ${Math.round(iw * 0.042)}px ${MONO}`; x.fillStyle = '#1b1236'; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('running late', iw * 0.57, ih * 0.345); x.fillText('(again)', iw * 0.57, ih * 0.395)
    }
    if (filt > 0) {
      x.globalCompositeOperation = 'source-over'
      x.fillStyle = `rgba(255,111,163,${0.62 * filt})`; x.fillRect(0, 0, iw, ih)
      x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(iw / 2, ih / 2, 0, iw / 2, ih / 2, iw * 0.7); g.addColorStop(0, `rgba(255,200,220,${0.4 * filt})`); g.addColorStop(1, 'rgba(255,200,220,0)')
      x.fillStyle = g; x.fillRect(0, 0, iw, ih)
      x.globalCompositeOperation = 'source-over'
      for (let i = 0; i < 3; i++) drawBits(x, HEART, HEART_C, Math.round(iw * (0.2 + i * 0.3)), Math.round(ih * (0.2 + 0.1 * Math.sin(t * 2 + i))), Math.max(3, iw * 0.014), { alpha: filt })
    }
    x.restore()
    x.restore()
  }

  /** the studio (map + forecaster). camera: punch-in k and the radar zoom */
  function studio(t, storm, clearK, cam) {
    x.save()
    if (cam.s !== 1) { x.translate(cam.x, cam.y); x.scale(cam.s, cam.s); x.translate(-cam.fx, -cam.fy) }
    drawMap(t, storm, clearK)
    x.restore()
    // Aquarius at the map, with the pixel clicker stick
    const r = drawStarChar(x, FORE.x, FORE.y, FORE.size, t, { color: AQU.color, glyph: AQU.glyph, ...aquState(t), hops: AQ_HOPS, seed: 11, glow: 0.9 })
    const tip = t < T.field ? { x: lerp(LIB_P.x, TAU_P.x + 30, ease.inOutQuad(prog(t, 3.0, 4.2))), y: lerp(LIB_P.y, TAU_P.y, ease.inOutQuad(prog(t, 3.0, 4.2))) } : t < T.out ? TAU_P : { x: TAU_P.x + 40, y: TAU_P.y - 30 }
    const sx = r.x - r.size * 0.42, sy = r.y - r.size * 0.05, wob = Math.sin(t * 5) * 6
    const dx = tip.x - sx, dy = tip.y + wob - sy, L = Math.hypot(dx, dy), n = Math.floor(Math.min(L - 10, 560) / 12)
    x.save(); x.fillStyle = INK
    for (let i = 0; i < n; i++) x.fillRect(Math.round(sx + dx / L * i * 12) - 5, Math.round(sy + dy / L * i * 12) - 5, 12, 12)
    x.fillStyle = '#c9c2d8'
    for (let i = 0; i < n; i++) x.fillRect(Math.round(sx + dx / L * i * 12) - 3, Math.round(sy + dy / L * i * 12) - 3, 8, 8)
    x.fillStyle = '#ff4057'; x.fillRect(Math.round(sx + dx / L * n * 12) - 7, Math.round(sy + dy / L * n * 12) - 7, 14, 14)
    x.restore()
  }
  /** the field cam: Taurus on a rainy street with the photos */
  function field(t) {
    const tt = t - T.field
    // street
    x.save()
    x.fillStyle = 'rgba(14,10,32,0.55)'; x.fillRect(0, 0, 1080, 1920)
    x.fillStyle = '#231a3a'; x.fillRect(0, 1238, 1080, 682)
    x.fillStyle = '#2f2550'; x.fillRect(0, 1238, 1080, 10)
    for (let i = 0; i < 6; i++) { x.fillStyle = `rgba(255,143,177,${0.08 + 0.04 * Math.sin(t * 2 + i)})`; x.fillRect(80 + i * 170, 1262 + (i % 2) * 30, 120, 8) }   // pink puddles
    // the lamp post (right) — the ghost hides behind it
    x.fillStyle = INK; x.fillRect(930, 640, 26, 600); x.fillRect(900, 620, 86, 30)
    x.fillStyle = '#ffe9b0'; x.fillRect(910, 650, 66, 24)
    x.restore()
    glow(943, 700, 260, '#ffd8a0', 0.28)
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 4 })
    // the hidden Comet: a tiny one crosses the sky, tail pointing away from the (off-screen, lower-left) Sun
    const cp = prog(t, T.comet, T.comet + 1.6)
    if (cp > 0 && cp < 1) drawComet(x, lerp(1100, 560, cp), lerp(560, 640, cp), 30, t, { sunDir: [-1, 1], aura: false, exPin: false, tail: 90, mood: 'happy', alpha: 0.8 })
    // the Orbiter, high in the clouds, "viewed"
    const ok = prog(t, T.orbiter[0], T.orbiter[0] + 0.6) * (1 - prog(t, T.orbiter[1] - 0.4, T.orbiter[1]))
    if (ok > 0) drawSatellite(x, 180 + Math.sin(t * 0.7) * 30, 660 + Math.cos(t * 0.9) * 14, 96, t, { aura: false, exPin: false, alpha: 0.75 * ok })
    // Taurus in the raincoat
    const r = drawStarChar(x, 380, 1040, 300, t, { color: TAU.color, glyph: TAU.glyph, ...tauState(t), hops: TA_HOPS, seed: 4, glow: 0.9, pop: pop01(t, T.field + 0.02, 0.35, 2) })
    drawBits(x, HOOD, HOOD_C, Math.round(r.x), Math.round(r.top + r.size * 0.2), Math.round(r.size / 17))
    // the photo stack: kinds cycle beach → concert → café → beach; the top one slides away at each flip
    const order = [0, 2, 1, 0]
    let idx = 0; for (const f of T.flips) if (t >= f + 0.35) idx++
    for (let k = Math.min(idx + 2, order.length - 1); k >= idx; k--) {
      const depth = k - idx, base = { x: 760 + depth * 10, y: 1110 + depth * 8 }
      photo(t, base.x, base.y, 300, -0.06 + depth * 0.07, order[k], 1, 1)
    }
    const fl = T.flips.findIndex(f => t >= f && t < f + 0.35)
    if (fl >= 0) { const p = ease.inQuad(prog(t, T.flips[fl], T.flips[fl] + 0.35)); photo(t, 760 + p * 420, 1110 - p * 160, 300, -0.06 + p * 0.8, order[fl], 1, 1 - p * 0.5) }
    rain(t, 0, 560, 1080, 1260, 70, 0.75, 7)
    lowerThird(t, prog(t, T.field + 0.15, T.field + 0.5), 'LIVE · ON THE SCENE', '♉ TAURUS · field reporter (emotionally)', '#ffd23f')
    void tt
  }
  /** the radar close-up: the pink cloud with a photo inside it, then the filter wipes off */
  function closeUp(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    panelBg(1)
    const { x0, y0, x1, y1 } = PANEL
    x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip()
    for (let i = 0; i < 7; i++) cloud(150 + i * 130, 660 + (i % 2) * 40, 110, 0.85, i)
    for (let i = 0; i < 7; i++) cloud(120 + i * 140, 1170 - (i % 2) * 40, 110, 0.85, i + 3)
    rain(t, x0, y0, x1, y1, 40, 0.6, 3)
    // the photo: filtered until the wipe, then the true café
    const w = prog(t, ...T.wipe), cx = 540, cy = 918
    photo(t, cx, cy, 420, 0.03, 1, 0, 1)
    if (w < 1) {
      x.save(); x.beginPath(); x.rect(lerp(cx - 260, cx + 260, ease.inOutQuad(w)), 600, 700, 700); x.clip()
      photo(t, cx, cy, 420, 0.03, 1, 1, 1)
      x.restore()
      if (w > 0) { const sxw = lerp(cx - 260, cx + 260, ease.inOutQuad(w)); x.fillStyle = 'rgba(255,240,246,0.9)'; x.fillRect(sxw - 4, 640, 8, 560) }
    }
    x.restore()
    x.strokeStyle = 'rgba(127,208,255,0.55)'; x.lineWidth = 4; x.strokeRect(x0, y0, x1 - x0, y1 - y0)
    genreBug(x, t, { text: 'LIVE', x: x0 + 26, y: y0 + 30, color: '#ff4057' })
    label('RADAR · 8×', x1 - 26, y0 + 34, { size: 26, color: SKYB, align: 'right' })
    label(w >= 1 ? 'FILTER: OFF' : 'FILTER: ROSE', x0 + 30, y1 - 40, { size: 28, color: w >= 1 ? BONE : PINK, align: 'left' })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const inField = t >= T.field && t < T.studio
      if (!inField) {
        // the studio camera: a punch-in at 3.2, the stepped radar zoom 13.85–14.85, the pull back out at 17.75
        const pk = ease.outCubic(prog(t, ...T.punch)) * (1 - ease.inOutQuad(prog(t, T.live - 0.2, T.live + 0.3)))
        let s = 1 + 0.18 * pk, fx = lerp(540, 520, pk), fy = lerp(918, 960, pk), cxp = 540, cyp = 918
        if (t >= T.studio && t < T.back[1]) {
          let z = 1; for (const [i, zt] of T.zoom.entries()) z = lerp(z, [2, 4, 8][i], ease.outBack(prog(t, zt, zt + 0.22)))
          z = lerp(z, 1, ease.inOutCubic(prog(t, ...T.back)))
          s = z; fx = ZOOM_AT.x; fy = ZOOM_AT.y; cxp = 540; cyp = 918
        }
        const storm = 1 - ease.inOutQuad(prog(t, T.clear - 0.1, T.clear + 0.8))
        const clearK = ease.outCubic(prog(t, T.clear, T.clear + 0.9))
        const cu = t >= T.studio ? clamp(prog(t, T.zoom[2] + 0.05, T.zoom[2] + 0.25)) * (1 - prog(t, T.back[0], T.back[0] + 0.25)) : 0
        if (cu < 1) studio(t, storm, clearK, { s, x: cxp, y: cyp, fx, fy })
        closeUp(t, cu)
        // the zoom-step labels
        T.zoom.forEach((zt, i) => { const p = prog(t, zt, zt + 0.5); if (p > 0 && p < 1) label(['ZOOM 2×', 'ZOOM 4×', 'ZOOM 8×'][i], 540, 1080, { size: 64, color: '#6effaa', font: MONO, alpha: 1 - ease.inQuad(p) }) })
        // the lower third (studio) and the corner box with Taurus at the end
        const lt = t < T.field ? prog(t, -1, 0) : prog(t, T.studio + 0.1, T.studio + 0.45)
        lowerThird(t, lt * (t < T.out ? 1 : 1), '♒ AQUARIUS', 'chief METEOR-ologist · ♀ Rx forecast', AQU.color)
        if (t >= T.clear) {
          const pk2 = pop01(t, T.clear + 0.2, 0.35, 2)
          x.save(); x.translate(860, 760); x.scale(pk2, pk2)
          x.fillStyle = INK; x.fillRect(-120, -100, 240, 200); x.fillStyle = '#ffe9a8'; x.fillRect(-112, -92, 224, 184)
          x.restore()
          if (pk2 > 0.3) { drawStarChar(x, 860, 780, 150 * pk2, t, { color: TAU.color, mood: 'happy', look: [-1, 0], seed: 4, glow: 0.6, tips: false }); label('♉ LIVE', 860, 690, { size: 22, color: INK, shadow: false, alpha: pk2 }) }
        }
        // fact chip at 3.35
        const ck = pop01(t, T.chip, 0.35, 2) * outK(t, T.chipOut)
        if (ck > 0 && t < T.field) {
          x.save(); x.translate(540, 440); x.scale(ck, ck); x.rotate(-0.02)
          x.fillStyle = INK; x.fillRect(-400, -52, 800, 104); x.fillStyle = 'rgba(16,10,40,0.95)'; x.fillRect(-392, -44, 784, 88)
          x.strokeStyle = SKYB; x.lineWidth = 4; x.strokeRect(-392, -44, 784, 88)
          x.restore()
          label('✦ REAL: Venus rules Taurus & Libra.', 540, 440, { size: 34, color: BONE, font: INTER, weight: 800, alpha: ck })
        }
        // "WE GO LIVE TO TAURUS"
        const lv = pop01(t, T.live, 0.3, 2.2) * outK(t, T.liveOut)
        if (lv > 0) {
          x.save(); x.translate(540, 1060); x.rotate(-0.04); x.scale(lv, lv)
          x.fillStyle = '#ff4057'; x.fillRect(-430, -70, 860, 140); x.fillStyle = INK; x.fillRect(-430, 56, 860, 14)
          x.restore()
          label('WE GO LIVE TO ♉ TAURUS', 540, 1058, { size: 54, color: '#fff', font: INTER, weight: 800, alpha: lv })
        }
      } else field(t)
      drawTicker(x, t, { text: TICKER, y: 1790 })
      drawDayChip(x, t, { day: 9, phase: 'retro' })
      // everything pops out for the end card
      const e = prog(t, ...T.end)
      if (e > 0) { x.save(); x.globalAlpha = ease.inQuad(e); drawSky(x, t, SKY_H); x.restore() }
      hook.update(t)
      box.update(t)
      FH.update(t, t < T.studio ? outK(t, [T.studio - 0.25, T.studio - 0.05]) : 0)
      LAST.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 8.0 (studio → field), 13.4 (field → studio). cardfx keeps one.
const CUTS = [{ t: T.field, kind: 'flip' }, { t: T.studio, kind: 'flip', dir: -1 }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E06', fadeIn: 0.01 }), cardCuts(CUTS)]

// ── sound
const NOTE = [622.25, 698.46, 783.99, 932.33, 1046.5, 1244.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ['pop', T.open, 783.99, 0.04, 0], ['pop', T.open + 0.06, 1046.5, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [AQN]: 880, [TAN]: 587.33 } }),
  ['whoosh', T.punch[0], 0.4, 0.03], ['pop', T.chip, 1244.51, 0.045, 0], ['bell', T.chip + 0.05, 1567.98, 0.025, 1.2, 0],
  ...stingerCues(T.live, { key: KEY, kind: 'news' }),
  ...T.flips.map((f, i) => ['whoosh', r3(f), 0.3, 0.025]), ...T.flips.map((f, i) => ['tick', r3(f + 0.05), 0.03]),
  ['tick', T.ghost + 0.05, 0.015], ['glitter', T.comet, T.comet + 0.9],
  ...T.zoom.map((z, i) => ['pop', r3(z), [783.99, 1046.5, 1567.98][i], 0.05, 0]),
  ['whoosh', T.wipe[0], 0.7, 0.04], ['glitter', T.wipe[0] + 0.2, T.wipe[1]],
  ['whoosh', T.back[0], 0.5, 0.035], ['bell', T.clear + 0.2, 1244.51, 0.035, 1.6, 0], ['glitter', T.clear, T.clear + 0.8],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1244.51, 0.05, 0], ['pluck', T.lastLand, 1244.51, 0.045, 0.6, 0],
  ['pop', T.boxClose, 880, 0.03, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
