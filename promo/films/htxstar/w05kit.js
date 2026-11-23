// w05kit — Houston "Star Talk Explains" engine (farm worker w05, hst111–hst135; promo/posting/htx/FARM.md, style "explains").
// The season-13 classroom (../stexplain.js) and the Volume 2 episode engine (../nx2e01/scenes/x2kit.js), reworked for
// the Houston beta social cuts:
//   · frame 0: a static HOOK caption (box, from main.js) over a Houston "window" on the board wall (skyline, freeway,
//     heat sun, bayou bats, street sign, food) with motion, the student star mid-"huh?" and a sound sting at t = 0;
//   · the chalkboard pops over the window at 2.75 s; claims carry ✓ / ✦ / ♥ tags, and Houston jokes carry their own
//     ★ HOUSTON LORE tag (so ✓ stays for real astronomy only);
//   · a "HOU BETA · JAN 9" badge after the hook; Pisces cries (the classmate); THE SHORT VERSION, the last line,
//     then the party ticket (kit.js partyCard, ~6 s). No end card; STORY_END = DURATION.
//
//   makeHtxExplainer(cfg) → { HOOK, HOOK_STYLE, HOOK_UNTIL, WATERMARK, SCENES, DURATION, STORY_END, CUES, T }
//   cfg = { id, duration, key, hook, open: 'skyline'|'loop'|'heat'|'bayou'|'street'|'food'|'coast'|'rain'… ,
//           openText?, teacher, student (CHAR as in x2kit), boardTitle, beats, bulb, items, last, lastWho,
//           party: { line, stars }, tint?, cues?(T), front?(x, t, T, rt, rs) }
//   beat lines: [who, text, { tag?: { kind: 'sky'|'astro'|'tip'|'hou', dx, dy, align }, hold?, pre?, point? }]
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H } from '../wheel.js'
import { dialogueBox, talkCues, talkHops, lineTimes } from '../startalk.js'
import { popText } from '../lesson.js'
import { loadExplainFonts, drawClassroom, chalkboard, chalkText, chalkLine, chalkCircle, factTag, lightbulb, drawPointer, gotIt, gotItTimes, questionCues, chalkCues, tagCues, bulbCues, gotItCues, EX } from '../stexplain.js'
import { cryingStar, tearsAt, pop01, outK, R, INK, GOLD, PISCES } from '../nx2e01/scenes/x2kit.js'
import { label, PINK, MONO, INTER, BONE } from '../signs3kit.js'
import { streetSign, shield, skyline, car, freeway, heatSun, shimmer, partyCard, taco, kolache, klobasnek, BRAKE, HGREEN } from './kit.js'

export { chalkText, chalkLine, chalkCircle, EX, R, INK, GOLD, BONE, PINK }
export const SIZE = 250
export const POS = { teacher: { x: 196, y: 1196 }, student: { x: 884, y: 1196 }, hero: { x: 560, y: 1150 } }
export const BOARD = { x: 540, y: 760, w: 860, h: 500 }      // writable rect: x 140…940, y 540…980
export const PARTY = 6.2
const CPS = 28
export const r3 = v => +v.toFixed(3)
const plain = s => s.replace(/\*/g, '')
const ORANGE = '#ff9a3c'

// ───────────────────────── the ★ HOUSTON LORE tag (same pill grammar as factTag) ─────────────────────────
export function houTag(x, t, { at, x: X, y: Y, align = 'left', text = '★ HOUSTON LORE' }) {
  const k = pop01(t, at, 0.34, 2.4)
  if (k <= 0.01) return
  x.save()
  x.font = `700 26px ${MONO}`
  const w = x.measureText(text).width + 44, h = 54
  const x0 = align === 'left' ? X : align === 'right' ? X - w : X - w / 2
  x.translate(x0 + w / 2, Y); x.rotate(-0.03); x.scale(k, k)
  R(x, INK, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  R(x, '#3a1d08', -w / 2, -h / 2, w, h)
  x.strokeStyle = ORANGE; x.lineWidth = 3; x.strokeRect(-w / 2 + 5, -h / 2 + 5, w - 10, h - 10)
  x.fillStyle = ORANGE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

// ───────────────────────── chalk helpers for the beats (all draw on, in board coordinates via B) ─────────────────────────
/** a filled chalk disc (no draw-on), for things that move */
export function disc(x, cx, cy, r, color = EX.chalk, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.shadowColor = color; x.shadowBlur = 14
  x.fillStyle = color; x.globalAlpha *= 0.35; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.globalAlpha /= 0.35; x.lineWidth = 5; x.strokeStyle = color; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  x.restore()
}
/** a chalk skyline (a row of towers) drawn on from `at` */
export function chalkSkyline(x, t, B, { at, base, color = EX.chalk, x0 = 40, x1 = 760, dur = 1.0 }) {
  const H = [70, 120, 90, 170, 130, 210, 150, 100, 180, 80, 120]
  const n = H.length, w = (x1 - x0) / n
  const pts = [[B.x0 + x0, B.y0 + base]]
  H.forEach((h, i) => { const l = B.x0 + x0 + i * w; pts.push([l, B.y0 + base - h], [l + w * 0.8, B.y0 + base - h], [l + w * 0.8, B.y0 + base - h * 0.4], [l + w, B.y0 + base - h * 0.4]) })
  pts.push([B.x0 + x1, B.y0 + base])
  chalkLine(x, t, { pts, at, dur, color, width: 5 })
}
/** a chalk ring road (an ellipse) — the 610 Loop, Beltway 8, the Grand Parkway */
export function chalkRing(x, t, B, { at, cx, cy, rx, ry, color = EX.chalk, dur = 0.8, width = 6 }) {
  const pts = []
  for (let i = 0; i <= 48; i++) { const a = -Math.PI / 2 + i / 48 * Math.PI * 2; pts.push([B.x0 + cx + Math.cos(a) * rx, B.y0 + cy + Math.sin(a) * ry]) }
  chalkLine(x, t, { pts, at, dur, color, width })
}
/** a chalk pixel star (5 points) */
export function chalkStar(x, t, B, { at, cx, cy, r = 22, color = EX.chalkYellow, dur = 0.4 }) {
  const pts = []
  for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; pts.push([B.x0 + cx + Math.cos(a) * rr, B.y0 + cy + Math.sin(a) * rr]) }
  chalkLine(x, t, { pts, at, dur, color, width: 4 })
}
/** a chalk sun (circle + rays) */
export function chalkSun(x, t, B, { at, cx, cy, r = 50, color = EX.chalkYellow }) {
  chalkCircle(x, t, { x: B.x0 + cx, y: B.y0 + cy, r, at, dur: 0.5, color, width: 5 })
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; chalkLine(x, t, { pts: [[B.x0 + cx + Math.cos(a) * (r + 12), B.y0 + cy + Math.sin(a) * (r + 12)], [B.x0 + cx + Math.cos(a) * (r + 34), B.y0 + cy + Math.sin(a) * (r + 34)]], at: at + 0.4 + i * 0.05, dur: 0.15, color, width: 5 }) }
}
/** a chalk heart */
export function chalkHeart(x, t, B, { at, cx, cy, s = 60, color = '#ff8fb1', dur = 0.7 }) {
  const pts = []
  for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2; const hx = 16 * Math.sin(a) ** 3, hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)); pts.push([B.x0 + cx + hx * s / 16, B.y0 + cy + hy * s / 16]) }
  chalkLine(x, t, { pts, at, dur, color, width: 6 })
}
/** a chalk thermometer with a rising level */
export function chalkThermo(x, t, B, { at, cx, top, h = 260, level = 0.8, color = EX.chalk, fillCol = '#ff6b5a' }) {
  chalkLine(x, t, { pts: [[B.x0 + cx - 18, B.y0 + top], [B.x0 + cx - 18, B.y0 + top + h], [B.x0 + cx + 18, B.y0 + top + h], [B.x0 + cx + 18, B.y0 + top], [B.x0 + cx - 18, B.y0 + top]], at, dur: 0.6, color, width: 5 })
  chalkCircle(x, t, { x: B.x0 + cx, y: B.y0 + top + h + 28, r: 32, at: at + 0.5, dur: 0.4, color, width: 5 })
  const p = ease.outCubic(prog(t, at + 0.8, at + 2.0))
  if (p > 0) { x.save(); x.globalAlpha *= 0.85; x.fillStyle = fillCol; x.shadowColor = fillCol; x.shadowBlur = 12; x.fillRect(B.x0 + cx - 10, B.y0 + top + h - h * level * p, 20, h * level * p); x.beginPath(); x.arc(B.x0 + cx, B.y0 + top + h + 28, 22, 0, Math.PI * 2); x.fill(); x.restore() }
}
/** chalk arrow from a to b */
export const chalkArrow = (x, t, B, a, b, at, o = {}) => chalkLine(x, t, { pts: [[B.x0 + a[0], B.y0 + a[1]], [B.x0 + b[0], B.y0 + b[1]]], at, dur: 0.45, arrow: true, width: 5, ...o })
/** a chalk X (crossed out) */
export function chalkX(x, t, B, { at, cx, cy, s = 40, color = '#ff6b5a' }) {
  chalkLine(x, t, { pts: [[B.x0 + cx - s, B.y0 + cy - s], [B.x0 + cx + s, B.y0 + cy + s]], at, dur: 0.2, color, width: 7 })
  chalkLine(x, t, { pts: [[B.x0 + cx + s, B.y0 + cy - s], [B.x0 + cx - s, B.y0 + cy + s]], at: at + 0.2, dur: 0.2, color, width: 7 })
}
/** a chalk checkmark */
export function chalkCheck(x, t, B, { at, cx, cy, s = 34, color = '#7dffb0' }) {
  chalkLine(x, t, { pts: [[B.x0 + cx - s, B.y0 + cy], [B.x0 + cx - s * 0.3, B.y0 + cy + s * 0.7], [B.x0 + cx + s, B.y0 + cy - s * 0.8]], at, dur: 0.35, color, width: 7 })
}
/** a chalk planet orbit loop (retrograde): the apparent path makes a loop */
export function chalkLoopPath(x, t, B, { at, x0, x1, cy, amp = 60, color = EX.chalk, dur = 1.6 }) {
  const pts = []
  for (let i = 0; i <= 60; i++) { const u = i / 60, px = lerp(x0, x1, u) - Math.sin(u * Math.PI * 2) * (x1 - x0) * 0.22, py = cy - Math.sin(u * Math.PI) * amp; pts.push([B.x0 + px, B.y0 + py]) }
  chalkLine(x, t, { pts, at, dur, color, width: 5, arrow: true })
}
/** a chalk horizon (with an arc of sky above) */
export function chalkHorizon(x, t, B, { at, y, color = EX.chalk }) {
  chalkLine(x, t, { pts: [[B.x0 + 20, B.y0 + y], [B.x1 - B.x0 - 20 + B.x0, B.y0 + y]], at, dur: 0.6, color, width: 5 })
}
/** a tiny moon phase drawing (k = 0 new … 1 full), static once drawn */
export function chalkMoon(x, t, B, { at, cx, cy, r = 36, k = 0.5, color = EX.chalk }) {
  const a = clamp(prog(t, at, at + 0.3))
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.strokeStyle = color; x.lineWidth = 4; x.beginPath(); x.arc(B.x0 + cx, B.y0 + cy, r, 0, Math.PI * 2); x.stroke()
  x.fillStyle = color; x.globalAlpha *= 0.8; x.beginPath()
  x.arc(B.x0 + cx, B.y0 + cy, r - 3, -Math.PI / 2, Math.PI / 2)
  x.ellipse(B.x0 + cx, B.y0 + cy, Math.abs(1 - 2 * k) * (r - 3), r - 3, 0, Math.PI / 2, -Math.PI / 2, k > 0.5)
  x.fill(); x.restore()
}

// ───────────────────────── the frame-0 Houston window (inside the board rect, before the board pops) ─────────────────────────
const WIN = { x0: BOARD.x - BOARD.w / 2, y0: BOARD.y - BOARD.h / 2, w: BOARD.w, h: BOARD.h }
function bats(x, t, cx, cy, n = 14, spread = 260) {
  for (let i = 0; i < n; i++) {
    const a = t * (0.8 + (i % 5) * 0.13) + i * 2.1, r = spread * (0.3 + ((i * 37) % 70) / 100)
    const bx = cx + Math.cos(a) * r, by = cy - Math.abs(Math.sin(a * 0.7)) * r * 0.6 - i * 3
    const f = Math.sin(t * 18 + i) > 0 ? 1 : -1
    x.fillStyle = INK; x.fillRect(bx - 4, by - 3, 8, 7)
    x.fillRect(bx - 16, by - 2 - f * 5, 12, 4); x.fillRect(bx + 4, by - 2 - f * 5, 12, 4)
  }
}
function sky2(x, base, t, o, sc = 0.45) { x.save(); x.translate(0, base); x.scale(1, sc); skyline(x, 0, t, o); x.restore() }
function sceneBG(x, top, bot, h) { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, 1080, h) }
/** draws a 1080 × 630 Houston vignette (scaled into the window) */
const OPENERS = {
  skyline(x, t, o) {          // a night skyline; a few faint stars that wink out in the city glow
    sceneBG(x, '#0b0a26', '#5a2e5e', 630)
    for (let i = 0; i < 9; i++) { const a = 0.5 + 0.5 * Math.sin(t * 2.4 + i * 1.7); x.fillStyle = `rgba(255,246,220,${(0.25 + 0.6 * a * clamp(1 - t / 2.6)).toFixed(3)})`; x.fillRect((i * 173) % 1040 + 20, (i * 71) % 240 + 20, 8, 8) }
    const g = x.createRadialGradient(540, 640, 40, 540, 640, 620); g.addColorStop(0, 'rgba(255,170,90,0.55)'); g.addColorStop(1, 'rgba(255,170,90,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 630)
    x.save(); x.translate(0, 548); x.scale(1, 0.55); skyline(x, 0, t, { col: '#3b2a72', lit: '#ffd36b' }); x.restore()
    freeway(x, 548, 82, 2, t * 260)
    for (let i = 0; i < 5; i++) { const cx = ((i * 260 + t * 300) % 1400) - 160; x.fillStyle = '#ffe9a8'; x.fillRect(cx, 566, 22, 10); x.fillStyle = BRAKE; x.fillRect(1080 - cx, 604, 22, 10) }
  },
  loop(x, t, o) {             // the 610: brake lights forever
    sceneBG(x, '#ff9a5c', '#7a3a7a', 630)
    sky2(x, 330, t, { col: '#3a2252', alpha: 0.7 }, 0.3)
    freeway(x, 330, 300, 3, t * 90)
    const C = ['#e05a3a', '#4a7fd0', '#e8e2d0', '#3aa070', '#c9a6ff']
    for (let i = 0; i < 5; i++) car(x, 140 + i * 210 + Math.sin(t * 2 + i) * 6, 430 + (i % 2) * 100, C[i], { brake: 1, s: 0.72 })
    shield(x, 920, 220, o.openText || '610', 1.15 + 0.04 * Math.sin(t * 5))
  },
  heat(x, t, o) {             // the heat sun over a shimmering street
    sceneBG(x, '#ffb347', '#ff6f61', 630)
    heatSun(x, 540, 250 + Math.sin(t * 2) * 8, t, 120)
    sky2(x, 630, t, { col: '#7a2f4a', alpha: 0.6 }, 0.3)
    shimmer(x, 380, 250, t)
    x.fillStyle = INK; x.fillRect(820, 220, 150, 70); x.fillStyle = '#fff2d8'; x.fillRect(826, 226, 138, 58)
    x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#d03a2a'; x.fillText(o.openText || 'HOT', 895, 257)
  },
  bayou(x, t, o) {            // sunset on the bayou, a bridge, the bats coming out
    sceneBG(x, '#ff8a5c', '#4a2a7a', 630)
    x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(760, 330, 80, 0, Math.PI * 2); x.fill()
    sky2(x, 420, t, { col: '#2a1a4a', alpha: 0.85 }, 0.35)
    x.fillStyle = '#2f5a6a'; x.fillRect(0, 420, 1080, 210)
    for (let i = 0; i < 8; i++) { x.fillStyle = 'rgba(255,210,120,0.4)'; x.fillRect((i * 151 + t * 40) % 1080, 450 + i * 20, 90, 5) }
    x.fillStyle = INK; x.fillRect(0, 400, 1080, 26); for (let i = 0; i < 6; i++) x.fillRect(80 + i * 190, 400, 22, 120)
    bats(x, t, 540, 380, 16, 300)
  },
  street(x, t, o) {           // a swinging green street sign over traffic
    sceneBG(x, '#5ab0e8', '#ffd0a0', 630)
    sky2(x, 470, t, { col: '#4a5a8a', alpha: 0.7 }, 0.4)
    freeway(x, 470, 160, 2, t * 220)
    for (let i = 0; i < 3; i++) car(x, ((i * 420 + t * 260) % 1500) - 200, 560, ['#e05a3a', '#3aa070', '#f2c75c'][i], { s: 0.6 })
    x.save(); x.translate(540, 200); x.rotate(Math.sin(t * 3.2) * 0.07); streetSign(x, 0, 130, o.openText || 'WESTHEIMER', { pole: false }); x.restore()
  },
  food(x, t, o) {             // a kolache, a taco and a klobasnek, steaming
    sceneBG(x, '#ffe0b0', '#ff9a8a', 630)
    for (let i = 0; i < 12; i++) { x.fillStyle = i % 2 ? '#ffd0a0' : '#ffc090'; x.fillRect(i * 90, 0, 45, 630) }
    x.fillStyle = '#c97a4a'; x.fillRect(0, 470, 1080, 160)
    const b = k => Math.sin(t * 4 + k) * 10
    kolache(x, 250, 400 + b(0), 1.3); taco(x, 540, 390 + b(1), 1.3); klobasnek(x, 830, 400 + b(2), 1.3)
    for (let i = 0; i < 9; i++) { const sx = 250 + (i % 3) * 290, sy = 260 - ((t * 60 + i * 40) % 140); x.fillStyle = `rgba(255,255,255,${(0.5 - ((t * 60 + i * 40) % 140) / 300).toFixed(3)})`; x.fillRect(sx + Math.sin(t * 3 + i) * 12, sy, 12, 24) }
  },
  coast(x, t, o) {            // a Gulf day trip: the sun, the water, a gull
    sceneBG(x, '#7ad0ff', '#ffe3b0', 630)
    x.fillStyle = '#fff6c9'; x.beginPath(); x.arc(850, 140, 70, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#8a7a4a'; x.fillRect(0, 380, 1080, 120)
    for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect((i * 200 + t * 80) % 1180 - 100, 400 + (i % 3) * 30, 120, 6) }
    x.fillStyle = '#f2dca0'; x.fillRect(0, 500, 1080, 130)
    const gx = (t * 160) % 1300 - 100, gy = 220 + Math.sin(t * 3) * 20, f = Math.sin(t * 10) > 0 ? 1 : -1
    x.fillStyle = BONE; x.fillRect(gx - 10, gy - 4, 20, 10); x.fillStyle = INK; x.fillRect(gx - 36, gy - 4 - f * 8, 26, 5); x.fillRect(gx + 10, gy - 4 - f * 8, 26, 5)
  },
  rain(x, t, o) {             // a sudden afternoon shower, then sun (no storms, no water rising)
    sceneBG(x, '#6a7aa0', '#b0a0c8', 630)
    sky2(x, 630, t, { col: '#3a3a6a', alpha: 0.8 }, 0.35)
    x.fillStyle = '#4a4a6a'; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(160 + i * 200, 110 + (i % 2) * 20, 90, 0, Math.PI * 2); x.fill() }
    for (let i = 0; i < 60; i++) { const rx = (i * 97) % 1080, ry = ((i * 53 + t * 900) % 560) + 120; x.fillStyle = 'rgba(200,230,255,0.7)'; x.fillRect(rx, ry, 4, 22) }
    heatSun(x, 940, 120, t, 50)
  },
  sky(x, t, o) {              // a dark sky far from the city: the Milky Way band, many stars
    sceneBG(x, '#05061c', '#1a1450', 630)
    x.save(); x.translate(540, 300); x.rotate(-0.5); const g = x.createLinearGradient(0, -90, 0, 90); g.addColorStop(0, 'rgba(200,180,255,0)'); g.addColorStop(0.5, 'rgba(200,180,255,0.35)'); g.addColorStop(1, 'rgba(200,180,255,0)'); x.fillStyle = g; x.fillRect(-800, -90, 1600, 180); x.restore()
    for (let i = 0; i < 90; i++) { const a = 0.5 + 0.5 * Math.sin(t * 3 + i); x.fillStyle = `rgba(255,250,235,${(0.4 + 0.6 * a).toFixed(3)})`; const s = i % 7 ? 4 : 8; x.fillRect((i * 151) % 1070, (i * 89) % 540, s, s) }
    x.fillStyle = '#0a0a20'; x.beginPath(); x.moveTo(0, 630); for (let i = 0; i <= 12; i++) x.lineTo(i * 90, 560 - Math.sin(i * 1.3) * 26); x.lineTo(1080, 630); x.fill()
  },
}
function houWindow(x, t, cfg, k) {
  if (k <= 0) return
  const { x0, y0, w, h } = WIN
  x.save(); x.globalAlpha *= k
  R(x, INK, x0 - 22, y0 - 22, w + 44, h + 44)
  R(x, '#a8693a', x0 - 16, y0 - 16, w + 32, h + 32)
  x.save(); x.beginPath(); x.rect(x0, y0, w, h); x.clip()
  x.translate(x0, y0); x.scale(w / 1080, h / 630)
  ;(OPENERS[cfg.open] || OPENERS.skyline)(x, t, cfg)
  x.restore()
  // the window cross bars
  R(x, '#a8693a', x0 + w / 2 - 6, y0, 12, h); R(x, '#a8693a', x0, y0 + h * 0.42 - 6, w, 12)
  x.restore()
}

// ───────────────────────── the schedule (pure; shared by picture and sound) ─────────────────────────
export function schedule(cfg) {
  const D = cfg.duration, P = r3(D - PARTY)
  const T = { D, P, STORY_END: D, qOut: [2.5, 2.8], walk: [2.35, 3.0], board: 2.75 }
  T.last = r3(P - 2.5)
  const RECAP_NEED = gotItTimes(0, cfg.items).end + 1.0
  const cast = { teacher: cfg.teacher, student: cfg.student }
  const flat = []
  cfg.beats.forEach((b, bi) => b.lines.forEach(([who, text, o = {}]) => flat.push({ who, text, o, bi })))
  flat.push({ who: 'student', text: cfg.bulb, o: { pre: 0.35 }, bi: 'bulb' })
  const lay = extra => {
    let t = 3.25
    const out = []
    for (const f of flat) {
      const L = { t: r3(t + (f.o.pre || 0)), speaker: cast[f.who].tag, text: f.text, color: cast[f.who].accent || cast[f.who].color, who: f.who, bi: f.bi, o: f.o }
      out.push(L)
      const tm = lineTimes([L], { cps: CPS })[0]
      t = tm.done + (f.o.hold ?? 1.55) + extra
    }
    return out
  }
  const base = lay(0)
  const baseClose = lineTimes(base, { cps: CPS }).at(-1).done + 1.5
  const room = T.last - RECAP_NEED - baseClose
  if (room < -0.01) throw new Error(`${cfg.id}: ${(-room).toFixed(2)} s too long`)
  const extra = Math.min(0.9, room / flat.length)
  const LINES = lay(extra)
  T.lines = LINES
  T.times = lineTimes(LINES, { cps: CPS })
  const bi = LINES.length - 1
  T.bulb = r3(LINES[bi].t - 0.3)
  T.boxClose = r3(T.times[bi].done + 1.5)
  T.recap = r3(T.boxClose - 0.1)
  T.slack = r3(T.last - RECAP_NEED - T.boxClose)
  T.beats = cfg.beats.map((b, i) => {
    const idx = LINES.map((L, n) => (L.bi === i ? n : -1)).filter(n => n >= 0)
    return { at: r3(LINES[idx[0]].t - 0.25), lines: idx.map(n => ({ t: LINES[n].t, done: T.times[n].done, o: LINES[n].o, who: LINES[n].who })) }
  })
  T.beats.forEach((b, i) => { b.out = i + 1 < T.beats.length ? T.beats[i + 1].at : r3(T.recap) })
  T.boardOut = [r3(T.recap - 0.1), r3(T.recap + 0.35)]
  T.out = [r3(P - 0.4), r3(P - 0.05)]
  return T
}

const isPisces = c => /PISCES/.test(c.tag || '')

export function makeHtxExplainer(cfg) {
  const T = schedule(cfg)
  const LINES = T.lines, D = cfg.duration, P = T.P
  const CM = cfg.classmate === false || isPisces(cfg.teacher) || isPisces(cfg.student) ? null : { x: 540, y: 1250, size: 168, ...(cfg.classmate || {}) }
  T.cm = r3(LINES[0].t + 0.6)
  const tagT = cfg.teacher.tag, tagS = cfg.student.tag
  const HOPS = {
    teacher: [T.walk[1] - 0.05, ...talkHops(LINES, tagT, { cps: CPS }), ...(cfg.lastWho === 'teacher' ? [T.last + 0.05, T.last + 0.5] : [])],
    student: [0.02, 0.45, 0.95, 1.6, ...talkHops(LINES, tagS, { cps: CPS }), T.bulb + 0.05, T.bulb + 0.4, ...(cfg.lastWho === 'student' ? [T.last + 0.05, T.last + 0.5] : [])],
  }
  const phaseAt = t => {
    if (t >= T.last) return 'last'
    if (t >= T.recap) return 'recap'
    if (t >= T.bulb) return 'bulb'
    let p = 'q'
    T.beats.forEach((b, i) => { if (t >= b.at) p = i })
    return p
  }
  const lineAt = t => { let s = null; LINES.forEach((L, i) => { if (t >= L.t && t < T.times[i].done + 0.6) s = i }); return s }
  const speaker = t => {
    if (t >= T.last) return cfg.lastWho
    if (t < LINES[0].t) return null
    const i = lineAt(t)
    return i === null ? null : LINES[i].who
  }
  const defaultMoods = (ph, t) => {
    const talking = speaker(t)
    if (ph === 'q') return [{ mood: 'happy', look: [1, 0] }, { mood: 'wide', look: [0, -1] }]
    if (ph === 'bulb') return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    if (ph === 'recap' || ph === 'last') return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
    return [
      talking === 'teacher' ? { mood: 'happy', look: [1, -1] } : { mood: 'neutral', look: [1, 0] },
      talking === 'student' ? { mood: 'wide', look: [-1, 0] } : { mood: 'squint', look: [-1, -1] },
    ]
  }

  async function build(stage) {
    await loadExplainFonts()
    try { await Promise.all(["700 48px 'Space Mono'", "italic 500 140px 'EB Garamond'", "800 92px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const recap = gotIt(root, { items: cfg.items, at: T.recap, out: [T.out[0], T.out[1]] })
    const box = dialogueBox(root, { lines: LINES, y: 1400, height: 270, open: LINES[0].t - 0.22, close: T.boxClose, cps: CPS, size: 46 })
    const who = cfg[cfg.lastWho]
    const tag = el('div', { position: 'absolute', left: '0', width: '1080px', top: '1418px', textAlign: 'center', font: "700 30px 'Space Mono', monospace", letterSpacing: '0.08em', color: who.accent || who.color, textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, who.tag)
    const last = popText(root, cfg.last, { top: 1470, size: 88, accentSize: 128, at: T.last + 0.12, gap: 0.08, accentColor: who.accent || who.color, wobble: true, fit: true })
    const cv2 = layerCanvas(root, { pointerEvents: 'none' }), x2 = cv2.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function caret(r, color, t) {
      const y = r.top - 34 + Math.sin(t * 8) * 6
      x.fillStyle = INK; x.beginPath(); x.moveTo(r.x - 22, y - 16); x.lineTo(r.x + 22, y - 16); x.lineTo(r.x, y + 10); x.fill()
      x.fillStyle = color; x.beginPath(); x.moveTo(r.x - 15, y - 12); x.lineTo(r.x + 15, y - 12); x.lineTo(r.x, y + 4); x.fill()
    }
    function huh(r, t, k) {
      if (k <= 0) return
      const y = r.top + 10 + Math.sin(t * 5) * 8, xx = r.x + 175
      x.save(); x.globalAlpha *= k; x.translate(xx, y); x.rotate(0.18 + Math.sin(t * 3) * 0.06)
      x.font = `800 110px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('?', 0, 0); x.fillStyle = cfg.qAccent || GOLD; x.fillText('?', 0, 0)
      x.restore()
    }
    const drawOf = c => c.draw || ((ctx, X, Y, s, t, o) => cryingStar(ctx, X, Y, s, t, { color: c.color, glyph: c.glyph, ...o }, isPisces(c) ? tearsAt(t, T) : 0))
    function classmate(t) {
      if (!CM) return
      const p = pop01(t, T.cm, 0.4, 2.2)
      if (p <= 0.01) return
      const k = tearsAt(t, T)
      const mood = k >= 2 ? 'wide' : k >= 1 ? 'sparkle' : 'neutral'
      cryingStar(x, CM.x, CM.y, CM.size, t, { color: PISCES.color, glyph: PISCES.glyph, mood, look: k >= 1 ? [1, -1] : [0, -1], seed: 6, glow: 0.7, pop: p, hops: [T.cm + 0.2, T.bulb + 0.1, T.recap + 0.1, T.last + 0.1] }, k)
    }
    function bug(t) {                       // STAR TALK EXPLAINS + the HOU BETA badge, after the hook
      const k = pop01(t, 2.7, 0.36, 2.2) * outK(t, T.out[0], T.out[1])
      if (k <= 0.01) return
      x2.save(); x2.globalAlpha = clamp(k * 2)
      x2.translate(56, 78); x2.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k)
      R(x2, '#a8693a', -4, -24, 48, 48); R(x2, '#17302a', 0, -20, 40, 40)
      x2.font = `800 30px ${INTER}`; x2.textAlign = 'center'; x2.textBaseline = 'middle'; x2.fillStyle = '#ffe27a'; x2.fillText('?', 20, 1)
      x2.textAlign = 'left'; x2.fillStyle = GOLD; x2.shadowColor = 'rgba(6,4,18,0.9)'; x2.shadowBlur = 12
      x2.font = `800 30px ${INTER}`; x2.fillText('S T A R   T A L K   E X P L A I N S', 58, 2)
      x2.restore()
      label(x2, 250, 158, 'HOU BETA · JAN 9', clamp(k), { size: 34, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        const ok = outK(t, ...T.out)
        const ph = phaseAt(t)
        const sp = speaker(t)
        x.clearRect(0, 0, 1080, 1920)
        drawClassroom(x, t, { dim: 0.25 * clamp(prog(t, T.recap, T.recap + 0.4)) })
        if (cfg.tint) { x.save(); x.globalCompositeOperation = 'soft-light'; x.fillStyle = cfg.tint; x.globalAlpha = 0.55; x.fillRect(0, 0, 1080, 1920); x.restore() }
        x.save(); x.globalAlpha = ok
        // frame 0: the Houston window, until the board pops over it
        houWindow(x, t, cfg, 1 - clamp(prog(t, T.board + 0.2, T.board + 0.35)))
        const bk = outK(t, ...T.boardOut)
        let B = null
        if (bk > 0 && t >= T.board) {
          B = chalkboard(x, t, { ...BOARD, at: T.board, out: T.boardOut, title: cfg.boardTitle })
          T.beats.forEach((b, i) => {
            const k = i + 1 < T.beats.length ? outK(t, b.out - 0.25, b.out + 0.05) : 1
            if (t < b.at || k <= 0) return
            x.save(); x.globalAlpha *= k
            if (cfg.beats[i].draw) cfg.beats[i].draw(x, t, B, b, T)
            for (const c of cfg.beats[i].chalk || []) chalkText(x, t, { ...c, x: B.x0 + c.x, y: B.y0 + c.y, at: (c.line != null ? b.lines[c.line].t : b.at) + c.dt })
            let nt = 0
            for (const L of b.lines) if (L.o.tag) {
              const tg = { ...L.o.tag, dy: L.o.tag.fixed ? L.o.tag.dy : 14 + 66 * nt++ }
              if (tg.kind === 'hou') houTag(x, t, { at: L.t + 0.05, x: B.x0 + tg.dx, y: B.y0 + tg.dy, align: tg.align || 'left', text: tg.text })
              else factTag(x, t, { kind: tg.kind, at: L.t + 0.05, out: null, x: B.x0 + tg.dx, y: B.y0 + tg.dy, align: tg.align || 'left' })
            }
            x.restore()
          })
        }
        const [mt, ms] = (cfg.moods && cfg.moods(ph, t, T)) || defaultMoods(ph, t)
        const wk = ease.inOutCubic(prog(t, ...T.walk))
        const sx = lerp(POS.hero.x, POS.student.x, wk), sy = lerp(POS.hero.y, POS.student.y, wk), ss = lerp(330, SIZE, wk)
        const tilt = (1 - wk) * (-0.14 + 0.05 * Math.sin(t * 3.4))
        const tx = lerp(-200, POS.teacher.x, ease.outCubic(prog(t, T.walk[0], T.walk[1] + 0.1)))
        classmate(t)
        const rt = t >= T.walk[0] ? drawOf(cfg.teacher)(x, tx, POS.teacher.y, SIZE, t, { seed: 4, hops: HOPS.teacher, ...mt }) : null
        x.save(); x.translate(sx, sy + ss * 0.4); x.rotate(tilt); x.translate(-sx, -(sy + ss * 0.4))
        const rs = drawOf(cfg.student)(x, sx, sy, ss, t, { seed: 9, hops: HOPS.student, ...ms })
        x.restore()
        huh(rs, t, 1 - clamp(prog(t, T.walk[0], T.walk[0] + 0.3)))
        if (rt && cfg.teacher.prop) cfg.teacher.prop(x, rt, t, T, 'teacher')
        if (cfg.student.prop) cfg.student.prop(x, rs, t, T, 'student')
        if (rt && B && bk > 0) {
          let aim = null
          T.beats.forEach(b => b.lines.forEach(L => { if (L.who === 'teacher' && t >= L.t - 0.2 && t < L.done + 1.2) aim = L.o.point || [320, 220] }))
          const hx = rt.x + 92, hy = rt.y - 10
          const ang = aim ? Math.atan2(B.y0 + aim[1] - hy, B.x0 + aim[0] - hx) : -1.1
          drawPointer(x, hx, hy, ang, { tap: aim ? Math.max(0, Math.sin(t * 9)) : 0 })
        }
        if (cfg.front) cfg.front(x, t, T, rt, rs)
        if (sp === 'teacher' && rt) caret(rt, cfg.teacher.accent || cfg.teacher.color, t)
        if (sp === 'student') caret(rs, cfg.student.accent || cfg.student.color, t)
        x.restore()
        x2.clearRect(0, 0, 1080, 1920)
        x2.save(); x2.globalAlpha = ok
        lightbulb(x2, t, { at: T.bulb, x: rs.x, y: rs.top - 70, dur: 1.8 })
        x2.restore()
        bug(t)
        box.update(t)
        recap.update(t)
        const on = t >= T.last && ok > 0
        tag.style.display = on ? 'block' : 'none'
        if (on) { const p = clamp(prog(t, T.last, T.last + 0.2)); tag.style.opacity = String(p * ok); tag.style.transform = `translateY(${(1 - p) * 14}px)` }
        last.update(t, ok)
        // the party ticket
        if (t >= P) { x2.save(); partyCard(x2, t, t - P, cfg.party); x2.restore() }
        drawGrain(gx, t)
      },
    }
  }

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const pitch = { [tagT]: cfg.teacher.pitch || 440, [tagS]: cfg.student.pitch || 700 }
  const CUES = [
    ['bell', 0, 1318.51, 0.03, 1.2, 0],
    ...questionCues(0, { key: cfg.key }),
    ['whoosh', r3(T.walk[0]), 0.4, 0.03],
    ['pop', r3(T.board), 659.25, 0.04, 0],
    ...talkCues(LINES, { cps: CPS, pitch }),
    ...T.beats.flatMap(b => b.lines.filter(L => L.o.tag).flatMap(L => tagCues(r3(L.t + 0.05), L.o.tag.kind === 'hou' ? 'tip' : L.o.tag.kind))),
    ...cfg.beats.flatMap((bt, i) => (bt.chalk || []).flatMap(c => chalkCues(r3((c.line != null ? T.beats[i].lines[c.line].t : T.beats[i].at) + c.dt), c.text, { cps: c.cps || 22 }))),
    ...bulbCues(T.bulb),
    ...gotItCues(T.recap, { items: cfg.items, key: cfg.key }),
    ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.last + 0.12 + i * 0.08), NOTE[(i + 2) % NOTE.length], 0.03, i % 2 ? 0.15 : -0.15]),
    ['pluck', r3(T.last + 0.5), 1046.5, 0.04, 0.6, 0],
    ['whoosh', r3(T.out[0]), 0.35, 0.025],
    ['glitter', r3(P + 0.5), r3(P + 1.3)],
    ['bell', r3(P + 1.25), 1046.5, 0.03, 1.8, 0],
    ...(cfg.cues ? cfg.cues(T) : []),
    ...(CM ? [['pop', T.cm + 0.05, 1174.66, 0.025, 0.1], ['bell', r3(T.bulb + 0.2), 1567.98, 0.02, 1.2, 0]] : []),
  ].sort((a, b) => a[1] - b[1])
  return { HOOK: cfg.hook, HOOK_STYLE: 'box', HOOK_UNTIL: 2.6, WATERMARK: false, SCENES: [build], DURATION: D, STORY_END: D, CUES, T }
}

/** text checks (box lines ≤ 46, recap items ≤ 34, hook ≤ 8 words with no lone word on a line) */
export function checkText(cfg) {
  const bad = []
  for (const b of cfg.beats) for (const [, s] of b.lines) if (plain(s).length > 46) bad.push(s)
  if (plain(cfg.bulb).length > 46) bad.push(cfg.bulb)
  for (const s of cfg.items) if (plain(s).length > 34) bad.push(s)
  const hw = plain(cfg.hook).replace(/\|/g, ' ').split(/\s+/).filter(Boolean)
  if (hw.length > 8) bad.push('hook words: ' + cfg.hook)
  for (const ln of cfg.hook.split('|')) {
    if (ln.trim().split(/\s+/).length < 2) bad.push('hook lone word: ' + cfg.hook)
    if (plain(ln).trim().length > 19) bad.push('hook line too long (wraps): ' + ln)
  }
  return bad
}
export { HGREEN, BRAKE, MONO, INTER }
