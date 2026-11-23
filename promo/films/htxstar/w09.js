// Houston Star Talk · worker w09 (hst211–hst235): props for the STAR NEWS and the weather-show parodies.
// Pixel style (flat fills, ink outlines), pure functions of t. Generic shapes only: no brands, teams, agencies or events.
import { clamp, ease, prog } from '../../src/lib.js'
import { label, sparkles, hearts, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { box, txt, FLOOR } from '../starrace/ep.js'
import { skyline, freeway, car, shield, streetSign, heatSun, HGREEN, BRAKE, partyCard } from './kit.js'

export { partyCard }
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0], ['whoosh', 0.05, 0.5, 0.02]]
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
export const fadeK = (lt, a, b, d = 0.25) => clamp((lt - a) / d) * (1 - clamp((lt - b) / d))
export const Y = 1255             // standing line for field shots

// ── palettes: each news film gets its own studio colours
export const PAL = {
  navy:   { bg: '#16204a', s1: '#1b2858', s2: '#14204e', desk: '#2b5fb0', chy: BRAKE, kick: GOLD, tick: '#f4efe4', glow: '#5ec8ff' },
  plum:   { bg: '#2a1440', s1: '#341a52', s2: '#2a1446', desk: '#8a3fb0', chy: '#e0457a', kick: MINT, tick: '#f4efe4', glow: '#ff8fb1' },
  teal:   { bg: '#0c2e34', s1: '#103a40', s2: '#0c3238', desk: '#1f8a8a', chy: '#ff7a2a', kick: BONE, tick: '#fff4d8', glow: '#7dffb0' },
  wine:   { bg: '#3a1020', s1: '#46142a', s2: '#3a1224', desk: '#b03048', chy: GOLD, kick: '#ff8fb1', tick: '#f4efe4', glow: '#ffd36b', chyInk: INK },
  forest: { bg: '#10301e', s1: '#143a26', s2: '#10321f', desk: HGREEN, chy: '#2b5fb0', kick: GOLD, tick: '#eef6ee', glow: '#7dffb0' },
  sunset: { bg: '#40200e', s1: '#4a2812', s2: '#40220e', desk: '#e07a2a', chy: '#7a3fb0', kick: GOLD, tick: '#fff1de', glow: '#ffb36b' },
  ice:    { bg: '#1c2c48', s1: '#22365a', s2: '#1c2e4e', desk: '#5ec8ff', chy: INK, kick: SKYB, tick: '#eaf6ff', glow: '#bfe6ff', deskInk: INK },
  candy:  { bg: '#3a1838', s1: '#4a1e48', s2: '#3e1a3c', desk: '#ff5aa0', chy: '#2bd0b0', kick: '#ffd36b', tick: '#fff0f6', glow: '#ff8fb1', chyInk: INK },
}

/** a studio: stripes, a skyline window behind the anchor, the desk with the show's name */
export function studio(x, t, { pal = PAL.navy, show = 'STAR NEWS', sky = true, night = false } = {}) {
  x.fillStyle = pal.bg; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? pal.s1 : pal.s2; x.fillRect(k * 135, 380, 135, 900) }
  if (sky) {
    box(x, 120, 520, 840, 600, night ? '#0b0a24' : '#203a6a', 10)
    x.save(); x.beginPath(); x.rect(120, 520, 840, 600); x.clip()
    const g = x.createLinearGradient(0, 520, 0, 1120); g.addColorStop(0, night ? '#0b0a24' : '#ff9a6a'); g.addColorStop(1, night ? '#2a1a52' : '#5a3a8a'); x.fillStyle = g; x.fillRect(120, 520, 840, 600)
    x.translate(540, 0); x.scale(0.78, 1); x.translate(-540, 0); skyline(x, 1120, t, { alpha: 0.95, col: night ? '#120e2e' : '#2a1d52' })
    x.restore()
    x.fillStyle = 'rgba(0,0,0,0.25)'; for (let k = 1; k < 4; k++) x.fillRect(120 + k * 210, 520, 6, 600)
  }
  box(x, 150, 1180, 780, 220, pal.desk, 8); x.fillStyle = BONE; x.fillRect(150, 1180, 780, 14)
  txt(x, show, 540, 1300, { size: show.length > 14 ? 52 : 64, col: pal.deskInk || BONE })
}
/** a small LIVE tag above the chyron (kept out of the hook's area) */
export function liveTag(x, t, text = '● LIVE', col = BRAKE) {
  x.font = `700 30px ${MONO}`; const w = x.measureText(text).width + 40
  box(x, 40, 1352, w, 56, col, 5); txt(x, text, 40 + w / 2, 1381, { size: 30, col: BONE, font: MONO, weight: 700 })
  if (Math.sin(t * 5) > 0) { x.fillStyle = BONE; x.fillRect(52, 1376, 0, 0) }
}
/** the chyron: a kicker tag, a headline, a scrolling ticker */
export function chy(x, t, head, ticker, { pal = PAL.navy, kick = null, clock = null } = {}) {
  box(x, 0, 1420, 1080, 110, pal.chy, 0); x.fillStyle = INK; x.fillRect(0, 1414, 1080, 8)
  let l = 0
  if (kick) { x.font = `800 30px ${INTER}`; const w = x.measureText(kick).width + 36; box(x, 0, 1420, w, 110, pal.kick, 0); x.fillStyle = INK; x.fillRect(w, 1420, 6, 110); txt(x, kick, w / 2, 1476, { size: 30, col: INK }); l = w + 6 }
  const cx = l + (1080 - l) / 2, room = 1080 - l - 40
  x.font = `800 54px ${INTER}`; let sz = 54; while (sz > 30 && (x.font = `800 ${sz}px ${INTER}`, x.measureText(head).width > room)) sz -= 2
  txt(x, head, cx, 1476, { size: sz, col: pal.chyInk || BONE })
  box(x, 0, 1530, 1080, 64, pal.tick, 0)
  x.save(); x.beginPath(); x.rect(0, 1530, 1080, 64); x.clip()
  x.font = `700 32px ${MONO}`; const w = x.measureText(ticker).width + 80, off = (t * 160) % w
  for (let k2 = -1; k2 < 3; k2++) { x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(ticker, k2 * w - off, 1563) }
  x.restore()
  if (clock) { box(x, 900, 1352, 150, 56, INK, 4); txt(x, clock, 975, 1381, { size: 30, col: BONE, font: MONO, weight: 700 }) }
}
/** an over-the-shoulder graphic box beside the anchor: draw(cx, cy, w, h) paints inside */
export function ots(x, cx, cy, w, h, k, draw, { title = null, col = '#0f3a5a' } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
  box(x, cx - w / 2, cy - h / 2, w, h, col, 8)
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); draw?.(cx, cy, w, h); x.restore()
  if (title) { x.font = `800 30px ${INTER}`; const tw = x.measureText(title).width + 30; box(x, cx - w / 2 + 10, cy + h / 2 - 30, tw, 50, GOLD, 4); txt(x, title, cx - w / 2 + 10 + tw / 2, cy + h / 2 - 5, { size: 30 }) }
  x.restore()
}
/** a reporter's lower third (name + where) */
export function repTag(x, name, where, k = 1, col = GOLD, y = 380) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k)
  x.font = `800 36px ${INTER}`; const w = Math.max(x.measureText(name).width, (x.font = `700 28px ${MONO}`, x.measureText(where).width)) + 60
  box(x, 60, y, w * clamp(k), 112, 'rgba(14,9,32,0.92)', 0); x.fillStyle = col; x.fillRect(60, y, 10, 112)
  txt(x, name, 90, y + 34, { size: 36, col: BONE, align: 'left' }); txt(x, where, 90, y + 82, { size: 28, col, font: MONO, weight: 700, align: 'left' })
  x.restore()
}
/** a handheld mic next to a star (P.at); side −1 = held to the left */
export function mic(x, P, id, side = 1, col = BRAKE) {
  const [cx, cy, s] = P.at(id); const mx = cx + side * s * 0.42, my = cy + s * 0.05
  x.save(); x.translate(mx, my); x.rotate(side * -0.35)
  box(x, -9, 0, 18, s * 0.36, '#3a3450', 4); x.fillStyle = INK; x.beginPath(); x.arc(0, -4, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(0, -4, 20, 0, Math.PI * 2); x.fill()
  box(x, -16, s * 0.1, 32, 26, col, 3)
  x.restore()
}
/** a split screen: anchor left box + field right box frames (drawn over the scene) */
export function splitFrame(x, labels = ['STUDIO', 'LIVE']) {
  x.fillStyle = INK; x.fillRect(536, 380, 10, 1040)
  labels.forEach((s, i) => { x.font = `700 26px ${MONO}`; const w = x.measureText(s).width + 26; box(x, 40 + i * 540, 400, w, 44, i ? BRAKE : GOLD, 4); txt(x, s, 40 + i * 540 + w / 2, 422, { size: 26, col: i ? BONE : INK, font: MONO, weight: 700 }) })
}

// ── field sets (Houston places, generic)
const sky = (x, top, bot, a, b) => { const g = x.createLinearGradient(0, top, 0, bot); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(0, top, 1080, bot - top) }
export function tree(x, cx, base, s = 1, col = '#2f7a46') {
  box(x, cx - 14 * s, base - 120 * s, 28 * s, 120 * s, '#6b4a2a', 4)
  for (const [dx, dy, r] of [[0, -190, 90], [-70, -140, 70], [70, -140, 70], [0, -120, 70]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s, base + dy * s, (r + 6) * s, 0, Math.PI * 2); x.fill() }
  for (const [dx, dy, r] of [[0, -190, 90], [-70, -140, 70], [70, -140, 70], [0, -120, 70]]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx * s, base + dy * s, r * s, 0, Math.PI * 2); x.fill() }
}
export function bayou(x, t, { dusk = 0 } = {}) {        // Buffalo Bayou: skyline, trees, brown-green water, the trail
  sky(x, 0, FLOOR + 60, dusk ? '#2a1a52' : '#8fd0ff', dusk ? '#ff9a6a' : '#e8f4ff')
  skyline(x, FLOOR - 120, t, { alpha: 0.9, col: dusk ? '#2a1d52' : '#4a5a8a', lit: dusk ? '#ffd36b' : '#bfe6ff' })
  tree(x, 90, FLOOR - 60, 0.9); tree(x, 990, FLOOR - 40, 1.0, '#3a8a50')
  x.fillStyle = '#5a6a3a'; x.fillRect(0, FLOOR - 60, 1080, 140)
  for (let k = 0; k < 9; k++) { x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(((k * 160 + t * 40) % 1200) - 100, FLOOR - 40 + (k % 3) * 36, 90, 6) }
  x.fillStyle = '#b8a88a'; x.fillRect(0, FLOOR + 80, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 74, 1080, 8)
  x.fillStyle = '#6a8a4a'; x.fillRect(0, FLOOR + 260, 1080, 1920)
}
export function street(x, t, { night = false, ground = '#2a2e48' } = {}) {
  sky(x, 0, FLOOR + 60, night ? '#0b0a24' : '#6ab8ff', night ? '#3a2a6a' : '#cfe8ff')
  skyline(x, FLOOR + 60, t, { alpha: 1, lit: night ? '#ffd36b' : '#bfe6ff', col: night ? '#1a1338' : '#3a3a6a' })
  x.fillStyle = ground; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10)
  for (let k = 0; k < 6; k++) { x.fillStyle = '#f2c75c'; x.fillRect(k * 200 + 40, FLOOR + 200, 110, 10) }
}
export function strip(x, t, { signs = ['PHO', 'BOBA', 'HOT POT', 'KARAOKE'], night = true } = {}) {   // a Bellaire-style strip center at night
  sky(x, 0, FLOOR + 60, night ? '#0b0a24' : '#8fd0ff', night ? '#2a1a52' : '#e8f4ff')
  box(x, 40, 560, 1000, FLOOR - 500, '#3a3050', 8)
  const cols = ['#ff5a6e', '#5ec8ff', '#ffd36b', '#7dffb0', '#c9a6ff', '#ff8fb1']
  signs.forEach((s, i) => {
    const w = 1000 / signs.length, l = 40 + i * w, on = night ? 0.75 + 0.25 * Math.sin(t * 3 + i * 1.7) : 1
    box(x, l + 14, 600, w - 28, 110, '#1b1236', 5); x.save(); if (night) { x.shadowColor = cols[i % 6]; x.shadowBlur = 24 * on } txt(x, s, l + w / 2, 656, { size: s.length > 7 ? 34 : 44, col: cols[i % 6] }); x.restore()
    box(x, l + 30, 760, w - 60, FLOOR - 720, night ? '#ffe9a8' : '#bfe6ff', 5)
  })
  x.fillStyle = '#2a2638'; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10)
  for (let k = 0; k < 7; k++) { x.fillStyle = BONE; x.fillRect(60 + k * 150, FLOOR + 120, 8, 120) }
}
export function bungalow(x, t, { col = '#7ab0a0', dog = true } = {}) {   // the Heights: a porch bungalow
  sky(x, 0, FLOOR + 60, '#8fd0ff', '#e8f4ff'); tree(x, 960, FLOOR + 40, 1.3)
  box(x, 160, 640, 760, FLOOR - 600, col, 8)
  x.fillStyle = INK; x.beginPath(); x.moveTo(110, 650); x.lineTo(540, 400); x.lineTo(970, 650); x.fill(); x.fillStyle = '#8a4a3a'; x.beginPath(); x.moveTo(140, 640); x.lineTo(540, 414); x.lineTo(940, 640); x.fill()
  box(x, 220, 760, 160, 160, '#ffe9a8', 5); box(x, 700, 760, 160, 160, '#ffe9a8', 5); box(x, 470, 780, 140, FLOOR - 720, '#6b3b1f', 5)
  box(x, 120, FLOOR - 20, 840, 40, '#efe6d6', 5)
  x.fillStyle = '#6a9a4a'; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10)
}
export function park(x, t, { lake = true } = {}) {   // a big city park: lawn, a lake with paddle boats
  sky(x, 0, FLOOR, '#7ac8ff', '#e0f4ff'); tree(x, 120, FLOOR - 160, 1.1); tree(x, 980, FLOOR - 170, 1.2, '#3a8a50'); tree(x, 820, FLOOR - 200, 0.8)
  x.fillStyle = '#5aa05a'; x.fillRect(0, FLOOR - 200, 1080, 1920)
  if (lake) { x.fillStyle = INK; x.beginPath(); x.ellipse(540, FLOOR - 90, 470, 96, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#4a9ad0'; x.beginPath(); x.ellipse(540, FLOOR - 90, 460, 88, 0, 0, Math.PI * 2); x.fill()
    for (let k = 0; k < 3; k++) { const bx = 300 + k * 230 + 30 * Math.sin(t * 0.8 + k), by = FLOOR - 100 + 10 * Math.sin(t * 2 + k); paddleBoat(x, bx, by, ['#ffd36b', '#ff8fb1', '#8fe3ff'][k]) } }
  x.fillStyle = '#4a904a'; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
}
export function paddleBoat(x, cx, cy, col) { box(x, cx - 50, cy - 20, 100, 34, col, 4); box(x, cx - 26, cy - 56, 52, 36, '#fff', 4); x.fillStyle = INK; x.beginPath(); x.arc(cx + 40, cy + 4, 14, 0, Math.PI * 2); x.fill() }
export function bridge(x, t, { dusk = 1 } = {}) {   // a bayou bridge at sunset (the bats live under it)
  sky(x, 0, FLOOR + 60, dusk ? '#3a1a5a' : '#8fd0ff', dusk ? '#ff8a5a' : '#e8f4ff')
  if (dusk) { x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(780, FLOOR - 160, 110, 0, Math.PI * 2); x.fill() }
  skyline(x, FLOOR - 120, t, { alpha: 0.7, col: '#2a1d52' })
  x.fillStyle = '#4a4a5a'; x.fillRect(0, FLOOR - 140, 1080, 60); box(x, 0, FLOOR - 160, 1080, 30, '#8f96a0', 5)
  for (let k = 0; k < 5; k++) box(x, 100 + k * 220, FLOOR - 80, 40, 140, '#6a6a7a', 4)
  x.fillStyle = '#3a4a3a'; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
}
export function bats(x, t, t0, n = 40, k = 1) {   // a stream of pixel bats rising from under the bridge
  if (t < t0) return
  for (let i = 0; i < n * clamp(k); i++) {
    const ph = ((t - t0) * 0.35 + i / n) % 1, bx = 540 + Math.sin(i * 2.3 + ph * 4) * 380 * ph + (i % 5 - 2) * 30, by = FLOOR - 120 - ph * 900, f = Math.sin(t * 18 + i) > 0 ? 1 : -1
    x.fillStyle = INK; x.fillRect(bx - 6, by - 4, 12, 8); x.fillRect(bx - 18, by - 4 - f * 6, 12, 6); x.fillRect(bx + 6, by - 4 - f * 6, 12, 6)
  }
}
export function beach(x, t, { dusk = 0 } = {}) {   // the Gulf: brown-green water, sand, gulls
  sky(x, 0, FLOOR - 180, dusk ? '#3a1a5a' : '#7ac8ff', dusk ? '#ff9a6a' : '#e0f4ff')
  if (dusk) { x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(540, FLOOR - 190, 120, Math.PI, 0); x.fill() }
  x.fillStyle = '#8a7a4a'; x.fillRect(0, FLOOR - 180, 1080, 260)
  for (let k = 0; k < 6; k++) { const wy = FLOOR - 150 + k * 40, off = (t * 30 + k * 70) % 160; x.fillStyle = 'rgba(255,255,255,0.35)'; for (let wx = -160 + off; wx < 1080; wx += 160) x.fillRect(wx, wy, 70, 6) }
  x.fillStyle = '#e8d29a'; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = '#d8bf86'; x.fillRect(0, FLOOR + 60, 1080, 14)
  for (let k = 0; k < 3; k++) { const gx = (k * 330 + t * 60) % 1200 - 60, gy = 400 + k * 90 + 20 * Math.sin(t * 2 + k); x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(gx - 26, gy); x.quadraticCurveTo(gx - 12, gy - 16, gx, gy); x.quadraticCurveTo(gx + 12, gy - 16, gx + 26, gy); x.stroke() }
}
export function tunnel(x, t, { busy = 0 } = {}) {   // the downtown tunnels: tiled walls, food-court signs, AC vents
  x.fillStyle = '#d8d0c0'; x.fillRect(0, 0, 1080, 1920)
  for (let r = 0; r < 20; r++) for (let c = 0; c < 12; c++) { x.fillStyle = (r + c) % 2 ? '#cfc6b4' : '#ddd5c4'; x.fillRect(c * 90, 380 + r * 50, 88, 48) }
  box(x, 0, 380, 1080, 70, '#5a6a7a', 0); for (let k = 0; k < 6; k++) { box(x, 60 + k * 180, 395, 120, 40, '#8f96a0', 3); for (let j = 0; j < 4; j++) { x.fillStyle = INK; x.fillRect(70 + k * 180, 402 + j * 9, 100, 3) } }
  for (let k = 0; k < 3; k++) { box(x, 70 + k * 340, 560, 260, 90, ['#e05a3a', '#2b5fb0', HGREEN][k], 5); txt(x, ['LUNCH', 'COFFEE', 'SALADS'][k], 200 + k * 340, 606, { size: 42, col: BONE }) }
  x.fillStyle = '#a89a86'; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
  for (let k = 0; k < 14; k++) { x.fillStyle = 'rgba(255,255,255,0.3)'; const ph = (t * 0.5 + k / 14) % 1; x.fillRect(80 + k * 70, 460 + ph * 60, 4, 20) }   // AC breeze
}
export function cafe(x, t, { wall = '#c98e5a', sign = 'COFFEE' } = {}) {   // inside a coffee shop: counter, window, plants
  x.fillStyle = wall; x.fillRect(0, 0, 1080, FLOOR + 60)
  box(x, 90, 520, 420, 420, '#bfe6ff', 8); x.fillStyle = INK; x.fillRect(296, 520, 8, 420); x.fillRect(90, 726, 420, 8)
  box(x, 600, 560, 380, 120, '#1b1236', 6); txt(x, sign, 790, 620, { size: 50, col: GOLD })
  for (let k = 0; k < 3; k++) { box(x, 630 + k * 110, 760, 70, 80, '#c9783a', 4); x.fillStyle = '#5aa05a'; x.beginPath(); x.arc(665 + k * 110, 740, 46, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#6b3b1f'; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
}
export function office(x, t, { cold = 1 } = {}) {   // a freezing office: vents, a thermostat, frost in the corners
  x.fillStyle = '#c8d6e0'; x.fillRect(0, 0, 1080, FLOOR + 60)
  for (let k = 0; k < 3; k++) { box(x, 120 + k * 320, 420, 200, 60, '#8f96a0', 4); for (let j = 0; j < 4; j++) { const ph = (t * 1.2 + j * 0.25 + k * 0.1) % 1; x.fillStyle = `rgba(143,227,255,${(0.7 * (1 - ph)).toFixed(2)})`; x.fillRect(140 + k * 320 + j * 44, 490 + ph * 160, 8, 30) } }
  box(x, 860, 640, 130, 170, BONE, 5); txt(x, '62°', 925, 715, { size: 52, col: '#2b5fb0' }); txt(x, 'INSIDE', 925, 775, { size: 22, col: INK, font: MONO, weight: 700 })
  if (cold) for (const [cx, cy, sx, sy] of [[0, 380, 1, 1], [1080, 380, -1, 1]]) { x.fillStyle = 'rgba(255,255,255,0.7)'; for (let k = 0; k < 6; k++) x.fillRect(cx + sx * k * 18, cy, sx * (120 - k * 18), 10 + k * 3) }
  box(x, 140, FLOOR - 120, 520, 40, '#8a6a4a', 5); box(x, 300, FLOOR - 290, 200, 150, '#2a2638', 5); x.fillStyle = '#5ec8ff'; x.fillRect(316, FLOOR - 276, 168, 120)
  x.fillStyle = '#8a8a9a'; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8)
}
export function village(x, t) {   // a shop street with a row of parked cars (Rice Village style, generic)
  sky(x, 0, FLOOR, '#8fd0ff', '#e8f4ff')
  const fronts = [['BOOKS', '#c96a5a'], ['TEA', '#5a9ac9'], ['SHOES', '#c9a65a'], ['GIFTS', '#7ab07a']]
  fronts.forEach(([s, c], i) => { box(x, 20 + i * 265, 560, 245, FLOOR - 520, c, 6); box(x, 40 + i * 265, 590, 205, 80, BONE, 4); txt(x, s, 142 + i * 265, 630, { size: 38 }); box(x, 50 + i * 265, 720, 185, 220, '#bfe6ff', 4) })
  x.fillStyle = '#3a3650'; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10)
  for (let k = 0; k < 7; k++) { x.fillStyle = BONE; x.fillRect(k * 160 + 10, FLOOR + 80, 8, 150) }
}
export function crawfishTable(x, t, cx, top, n = 14, k = 1) {   // newspaper on a table with a pile of crawfish, corn, potatoes
  box(x, cx - 380, top, 760, 40, '#ddd2b8', 5); for (let j = 0; j < 6; j++) { x.fillStyle = 'rgba(60,50,40,0.35)'; x.fillRect(cx - 360, top + 6 + j * 5, 300, 2); x.fillRect(cx + 40, top + 6 + j * 5, 300, 2) }
  for (let i = 0; i < n * clamp(k); i++) crawfish(x, cx - 260 + (i * 97) % 520, top - 24 - ((i * 37) % 3) * 26, 1.1 + (i % 3) * 0.1, (i % 2 ? 0.3 : -0.4) + (i % 3 === 0 ? Math.PI : 0))
  for (let i = 0; i < 3; i++) { box(x, cx - 330 + i * 270, top - 50, 70, 34, '#f2c75c', 4) }
}
export function crawfish(x, cx, cy, s = 1, rot = 0) {   // faces left: two claws, antennae, a segmented tail with a fan
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const R = '#d83a2a', H = '#ff7a5a'
  x.strokeStyle = INK; x.lineWidth = 2; x.lineCap = 'round'
  x.beginPath(); x.moveTo(-26, -6); x.quadraticCurveTo(-60, -40, -86, -30); x.moveTo(-26, -2); x.quadraticCurveTo(-56, -26, -90, -12); x.stroke()   // antennae
  for (const d of [-1, 1]) {                                     // arms + claws
    x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.moveTo(-22, d * 6); x.lineTo(-44, d * 20); x.stroke(); x.strokeStyle = R; x.lineWidth = 4; x.stroke()
    x.fillStyle = INK; x.beginPath(); x.ellipse(-58, d * 24, 17, 10, d * 0.25, 0, Math.PI * 2); x.fill()
    x.fillStyle = R; x.beginPath(); x.ellipse(-58, d * 24, 14, 7, d * 0.25, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.beginPath(); x.moveTo(-76, d * 24); x.lineTo(-62, d * 22); x.lineTo(-76, d * 18); x.fill()   // the pincer notch
  }
  x.fillStyle = INK; x.beginPath(); x.moveTo(44, 0); x.lineTo(62, -14); x.lineTo(62, 14); x.closePath(); x.fill(); x.fillStyle = R; x.beginPath(); x.moveTo(47, 0); x.lineTo(59, -10); x.lineTo(59, 10); x.closePath(); x.fill()   // tail fan
  for (let k = 3; k >= 0; k--) { const sx = 6 + k * 10, r = 10 - k * 1.2; x.fillStyle = INK; x.beginPath(); x.ellipse(sx, 0, r + 3, r + 3, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = k % 2 ? R : H; x.beginPath(); x.ellipse(sx, 0, r, r, 0, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.ellipse(-14, 0, 17, 12, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = R; x.beginPath(); x.ellipse(-14, 0, 14, 9, 0, 0, Math.PI * 2); x.fill()   // head
  x.fillStyle = H; x.fillRect(-20, -5, 10, 3)
  x.fillStyle = INK; x.beginPath(); x.arc(-24, -7, 3, 0, Math.PI * 2); x.arc(-24, 7, 3, 0, Math.PI * 2); x.fill()
  x.restore()
}
export function oakPollen(x, t, k = 1, n = 80) {   // drifting yellow-green dust
  if (k <= 0) return
  for (let i = 0; i < n; i++) { const px = (i * 137 + t * (20 + i % 7 * 6)) % 1080, py = (i * 211 + t * (30 + i % 5 * 8)) % 1920; x.fillStyle = `rgba(214,200,60,${(0.7 * clamp(k)).toFixed(2)})`; x.fillRect(px, py, 6 + (i % 3) * 3, 6 + (i % 3) * 3) }
}
export function pollenCar(x, cx, cy, col, cover = 0, s = 1) { car(x, cx, cy, col, { s }); if (cover > 0) { x.save(); x.globalAlpha = 0.85 * clamp(cover); x.fillStyle = '#c8b83a'; x.fillRect(cx - 120 * s, cy - 40 * s, 240 * s, 22 * s); x.fillRect(cx - 70 * s, cy - 86 * s, 130 * s, 16 * s); x.restore() } }
export function mosquito(x, cx, cy, t, s = 1) {   // round body, striped tail, see-through wings, thin legs, a little nose
  const f = Math.sin(t * 40) > 0 ? 1 : 0.55
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = 'rgba(200,235,255,0.75)'; x.strokeStyle = 'rgba(27,18,54,0.6)'; x.lineWidth = 1.5
  for (const d of [-1, 1]) { x.beginPath(); x.ellipse(d * 9, -14, 7, 15 * f, d * 0.5, 0, Math.PI * 2); x.fill(); x.stroke() }
  x.strokeStyle = INK; x.lineWidth = 1.8; x.lineCap = 'round'
  for (const [dx, ex, ey] of [[-6, -18, 16], [0, -4, 20], [6, 12, 18]]) { x.beginPath(); x.moveTo(dx, 2); x.lineTo(ex, ey); x.lineTo(ex - 4, ey + 6); x.stroke() }
  x.beginPath(); x.moveTo(-16, -2); x.lineTo(-28, 10); x.stroke()                                  // the nose
  x.fillStyle = INK; x.beginPath(); x.ellipse(4, -1, 12, 6, 0.2, 0, Math.PI * 2); x.fill()          // body
  x.fillStyle = '#5a5070'; for (let k = 0; k < 3; k++) x.fillRect(2 + k * 5, -4, 2, 6)
  x.fillStyle = INK; x.beginPath(); x.arc(-12, -3, 6, 0, Math.PI * 2); x.fill()                      // head
  x.fillStyle = '#ff5a6e'; x.beginPath(); x.arc(-13, -4, 2, 0, Math.PI * 2); x.fill()
  x.restore()
}
export function loveBugs(x, t, n = 10, k = 1) {   // pairs of little black-and-red bugs drifting together (clean: they just travel in pairs)
  for (let i = 0; i < n * clamp(k); i++) {
    const bx = (i * 173 + t * (60 + i % 4 * 15)) % 1180 - 50, by = 300 + (i * 97) % 900 + 30 * Math.sin(t * 2 + i)
    for (const d of [-1, 1]) { x.fillStyle = INK; x.fillRect(bx + d * 12 - 8, by - 5, 16, 10); x.fillStyle = '#e04040'; x.fillRect(bx + d * 12 - 8 + (d > 0 ? 10 : 0), by - 4, 6, 8) }
  }
}
export function sweatDrops(x, cx, cy, t, n = 3, col = SKYB) {
  for (let q = 0; q < n; q++) { const ph = (t * 1.3 + q / n) % 1, px = cx + (q - (n - 1) / 2) * 30, py = cy + ph * 60; x.fillStyle = INK; x.fillRect(px - 6, py - 8, 13, 17); x.fillStyle = col; x.fillRect(px - 3, py - 5, 7, 11) }
}
export function frizz(x, P, id, t, k = 1) {   // humidity hair: a puff of pixel curls on a star's head
  if (k <= 0) return
  const [cx, cy, s] = P.at(id)
  for (let i = 0; i < 14; i++) { const a = -Math.PI * (0.1 + 0.8 * i / 13), r = s * (0.5 + 0.12 * clamp(k)) + 8 * Math.sin(t * 6 + i); x.fillStyle = INK; x.fillRect(cx + Math.cos(a) * r - 13, cy - s * 0.15 + Math.sin(a) * r - 13, 26, 26); x.fillStyle = '#6b3b1f'; x.fillRect(cx + Math.cos(a) * r - 9, cy - s * 0.15 + Math.sin(a) * r - 9, 18, 18) }
}
export function sweater(x, P, id, col = '#c96a8a') {   // a cardigan over a star's middle
  const [cx, cy, s] = P.at(id)
  box(x, cx - s * 0.34, cy - s * 0.02, s * 0.68, s * 0.3, col, 4); x.fillStyle = BONE; for (let k = 0; k < 3; k++) x.fillRect(cx - 4, cy + s * 0.02 + k * s * 0.08, 8, 8)
}
export function sunnies(x, P, id) { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.3, cy - s * 0.12, s * 0.24, s * 0.1, INK, 3); box(x, cx + s * 0.06, cy - s * 0.12, s * 0.24, s * 0.1, INK, 3); x.fillStyle = INK; x.fillRect(cx - s * 0.06, cy - s * 0.09, s * 0.12, 6) }
export function readers(x, P, id) { const [cx, cy, s] = P.at(id); x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(cx - s * 0.28, cy - s * 0.12, s * 0.22, s * 0.12); x.strokeRect(cx + s * 0.06, cy - s * 0.12, s * 0.22, s * 0.12); x.beginPath(); x.moveTo(cx - s * 0.06, cy - s * 0.07); x.lineTo(cx + s * 0.06, cy - s * 0.07); x.stroke() }
export function clipboard(x, P, id, side = 1) { const [cx, cy, s] = P.at(id); const bx = cx + side * s * 0.45; box(x, bx - 40, cy - 30, 80, 104, '#c98e5a', 4); box(x, bx - 30, cy - 18, 60, 80, BONE, 2); for (let k = 0; k < 4; k++) { x.fillStyle = INK; x.fillRect(bx - 22, cy - 6 + k * 16, 44, 4) } box(x, bx - 16, cy - 40, 32, 16, '#8f96a0', 3) }
export function phone(x, cx, cy, s = 1, lines = [], t = 0) {   // a generic phone with chat-ish rows (no app UI)
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -90, -160, 180, 320, INK, 6); x.fillStyle = '#f4efe4'; x.fillRect(-78, -140, 156, 280)
  lines.forEach((l, i) => { const me = l.startsWith('>'), s2 = me ? l.slice(1) : l; x.font = `700 20px ${INTER}`; const w = Math.min(140, x.measureText(s2).width + 20); box(x, me ? 70 - w : -70, -120 + i * 52, w, 38, me ? '#5ec8ff' : '#e0d6c4', 2); txt(x, s2, me ? 70 - w / 2 : -70 + w / 2, -100 + i * 52, { size: 20 }) })
  x.restore()
}

// ── weather show: studio, a Houston map, icons, a forecast strip
export function wxStudio(x, t, { a = '#1c3a6a', b = '#0c1a3a', floor = '#14244a', accent = '#5ec8ff' } = {}) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 12; k++) { x.strokeStyle = `rgba(255,255,255,${(0.04 + 0.03 * Math.sin(t + k)).toFixed(3)})`; x.lineWidth = 3; x.beginPath(); x.arc(540, 1700, 300 + k * 90, Math.PI, 0); x.stroke() }
  x.fillStyle = floor; x.fillRect(0, FLOOR + 60, 1080, 1920); x.fillStyle = accent; x.fillRect(0, FLOOR + 56, 1080, 8)
}
/** the Houston map panel: three loops, the freeways, the Gulf, place labels. o.cells = [[x, y, kind, label?]] */
export function houMap(x, t, { cx = 540, cy = 830, w = 960, h = 720, land = '#2f6a4a', places = [], heat = 0, title = null, tint = null } = {}) {
  box(x, cx - w / 2, cy - h / 2, w, h, land, 10)
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip()
  for (let k = 0; k < 30; k++) { x.fillStyle = 'rgba(255,255,255,0.03)'; x.fillRect(cx - w / 2 + (k * 131) % w, cy - h / 2 + (k * 77) % h, 60, 30) }
  x.fillStyle = '#2a6aa0'; x.beginPath(); x.moveTo(cx + w * 0.18, cy + h / 2); x.quadraticCurveTo(cx + w * 0.32, cy + h * 0.2, cx + w / 2, cy + h * 0.05); x.lineTo(cx + w / 2, cy + h / 2); x.fill()   // the Gulf, bottom right
  txt(x, 'GULF', cx + w * 0.38, cy + h * 0.38, { size: 30, col: '#bfe6ff', font: MONO, weight: 700 })
  if (heat > 0) { const g = x.createRadialGradient(cx - 40, cy - 20, 20, cx - 40, cy - 20, 420); g.addColorStop(0, `rgba(255,90,60,${0.55 * heat})`); g.addColorStop(1, 'rgba(255,90,60,0)'); x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h) }
  if (tint) { x.fillStyle = tint; x.fillRect(cx - w / 2, cy - h / 2, w, h) }
  const mx = cx - 40, my = cy - 30
  for (const r of [1, 0.66, 0.33]) { x.strokeStyle = 'rgba(242,199,92,0.85)'; x.lineWidth = 6; x.beginPath(); x.ellipse(mx, my, 400 * r, 260 * r, 0, 0, Math.PI * 2); x.stroke() }
  x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 6
  x.beginPath(); x.moveTo(cx - w / 2, my + 10); x.lineTo(cx + w / 2, my - 10); x.stroke()                    // I-10
  x.beginPath(); x.moveTo(mx - 120, cy - h / 2); x.lineTo(mx, my); x.lineTo(cx + w * 0.3, cy + h * 0.32); x.stroke()   // 45
  x.beginPath(); x.moveTo(cx - w / 2, cy + h * 0.38); x.lineTo(mx, my); x.lineTo(mx + 260, cy - h / 2); x.stroke()      // 59/69
  for (const [px, py, lab, col] of places) { x.fillStyle = col || BONE; x.fillRect(px - 8, py - 8, 16, 16); txt(x, lab, px, py - 28, { size: 24, col: BONE, font: MONO, weight: 700 }) }
  x.restore()
  if (title) { x.font = `800 34px ${INTER}`; const tw = x.measureText(title).width + 40; box(x, cx - tw / 2, cy - h / 2 - 34, tw, 60, GOLD, 5); txt(x, title, cx, cy - h / 2 - 4, { size: 34 }) }
}
// place coordinates on the default map (cx 540, cy 830): inside the loop, the suburbs, the coast
export const PL = {
  montrose: [470, 820, 'MONTROSE'], heights: [500, 730, 'HEIGHTS'], eado: [600, 820, 'EADO'], midtown: [530, 870, 'MIDTOWN'],
  katy: [130, 760, 'KATY'], sugarland: [220, 1040, 'SUGAR LAND'], pearland: [600, 1060, 'PEARLAND'], woodlands: [420, 520, 'WOODLANDS'],
  cypress: [200, 580, 'CYPRESS'], clearlake: [800, 1000, 'CLEAR LAKE'], bellaire: [400, 900, 'BELLAIRE'], galveston: [930, 1120, 'GALVESTON'],
  memorial: [330, 780, 'MEMORIAL'], spring: [520, 540, 'SPRING'], downtown: [560, 790, 'DOWNTOWN'],
}
export function wxIcon(x, kind, cx, cy, s, t, k = 1) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(s * k, s * k)
  const cloud = (col = '#e8eef6') => { for (const [dx, dy, r] of [[-40, 10, 40], [0, -14, 52], [44, 10, 40]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 6, 0, Math.PI * 2); x.fill() } x.fillRect(-86, 10, 172, 56); for (const [dx, dy, r] of [[-40, 10, 40], [0, -14, 52], [44, 10, 40]]) { x.fillStyle = col; x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() } x.fillStyle = col; x.fillRect(-80, 14, 160, 46) }
  if (kind === 'sun') heatSun(x, 0, 0, t, 56)
  else if (kind === 'cloud') cloud()
  else if (kind === 'rain' || kind === 'drizzle') { cloud('#b8c4d6'); const n = kind === 'rain' ? 5 : 3; for (let q = 0; q < n; q++) { const ph = (t * 1.6 + q / n) % 1; x.fillStyle = '#5ec8ff'; x.fillRect(-60 + q * (120 / (n - 1)), 70 + ph * 70, 8, 22) } }
  else if (kind === 'heart') { const H = ['.KK.KK.', 'KppKppK', 'KpppppK', '.KpppK.', '..KpK..', '...K...']; const p = 1 + 0.08 * Math.sin(t * 6); x.scale(p, p); H.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = ch === 'K' ? INK : PINK; x.fillRect((i - 3.5) * 16, (j - 3) * 16, 16, 16) } })) }
  else if (kind === 'wind') { for (let q = 0; q < 3; q++) { const off = ((t * 120) + q * 40) % 60; x.strokeStyle = BONE; x.lineWidth = 10; x.beginPath(); x.moveTo(-70 + off - 30, -40 + q * 40); x.lineTo(40 + off - 30, -40 + q * 40); x.arc(40 + off - 30, -52 + q * 40, 12, Math.PI / 2, -Math.PI / 2, true); x.stroke() } }
  else if (kind === 'fog') { for (let q = 0; q < 4; q++) { x.fillStyle = 'rgba(232,238,246,0.85)'; x.fillRect(-80 + 10 * Math.sin(t * 2 + q), -50 + q * 32, 160, 16) } }
  else if (kind === 'pollen') { for (let q = 0; q < 12; q++) { const a = q * 0.52 + t, r = 30 + (q % 3) * 18; x.fillStyle = '#d6c83c'; x.fillRect(Math.cos(a) * r - 7, Math.sin(a) * r - 7, 14, 14) } }
  else if (kind === 'bug') mosquito(x, 0, 0, t, 3.2)
  else if (kind === 'lovebug') { for (const d of [-1, 1]) { x.fillStyle = INK; x.fillRect(d * 24 - 16, -10, 32, 20); x.fillStyle = '#e04040'; x.fillRect(d * 24 - 16 + (d > 0 ? 20 : 0), -8, 12, 16) } }
  else if (kind === 'sunset') { x.fillStyle = '#ff9a6a'; x.beginPath(); x.arc(0, 20, 60, Math.PI, 0); x.fill(); x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(0, 20, 40, Math.PI, 0); x.fill(); x.fillStyle = INK; x.fillRect(-80, 20, 160, 8) }
  else if (kind === 'puffer') { box(x, -50, -60, 100, 120, '#e05a3a', 5); for (let q = 0; q < 3; q++) { x.fillStyle = INK; x.fillRect(-50, -24 + q * 30, 100, 4) } }
  else if (kind === 'shorts') { box(x, -50, -40, 100, 40, '#5ec8ff', 5); box(x, -50, 0, 44, 50, '#5ec8ff', 5); box(x, 6, 0, 44, 50, '#5ec8ff', 5) }
  else if (kind === 'brake') { for (let q = 0; q < 3; q++) { x.fillStyle = BRAKE; x.fillRect(-60 + q * 46, -12, 30, 24); x.save(); x.globalAlpha = 0.35 + 0.3 * Math.sin(t * 5 + q); x.beginPath(); x.arc(-45 + q * 46, 0, 26, 0, Math.PI * 2); x.fill(); x.restore() } }
  x.restore()
}
export function tempTag(x, cx, cy, s, { col = '#ff7a2a', k = 1, size = 52 } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.font = `800 ${size}px ${INTER}`; const w = x.measureText(s).width + 36
  box(x, -w / 2, -size * 0.62, w, size * 1.24, col, 5); txt(x, s, 0, 2, { size, col: BONE }); x.restore()
}
/** a forecast strip: days = [[label, icon, temp, col?]] laid out across y; cur highlights one */
export function strip5(x, t, days, y, { k = 1, cur = -1, h = 250 } = {}) {
  const n = days.length, w = Math.min(200, 1000 / n), l0 = 540 - (n * w) / 2
  days.forEach(([lab, ic, tmp, col], i) => {
    const kk = clamp(k * n - i); if (kk <= 0) return
    const l = l0 + i * w, on = i === cur
    box(x, l + 6, y, w - 12, h, on ? '#2a4a8a' : '#14244a', 5); if (on) { x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(l + 6, y, w - 12, h) }
    txt(x, lab, l + w / 2, y + 34, { size: lab.length > 6 ? 22 : 28, col: GOLD, font: MONO, weight: 700 })
    wxIcon(x, ic, l + w / 2, y + 120, 0.62 * Math.min(1, w / 190), t, ease.outBack(kk))
    txt(x, tmp, l + w / 2, y + h - 40, { size: tmp.length > 4 ? 30 : 40, col: col || BONE })
  })
}
/** the forecaster's pointer: a stick from a star to a point */
export function pointer(x, P, id, tx, ty) { const [cx, cy, s] = P.at(id); const sx = cx + (tx > cx ? 1 : -1) * s * 0.35, sy = cy; x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(sx, sy); x.lineTo(tx, ty); x.stroke(); x.strokeStyle = '#d8dce4'; x.lineWidth = 6; x.stroke(); x.fillStyle = BRAKE; x.beginPath(); x.arc(tx, ty, 12, 0, Math.PI * 2); x.fill() }
/** a big moving front line (cold front triangles / warm front bumps) sweeping across */
export function front(x, x0, y0, x1, y1, kind = 'cold', n = 6) {
  x.strokeStyle = kind === 'cold' ? '#5ec8ff' : kind === 'love' ? PINK : '#ff5a4a'; x.lineWidth = 8; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke()
  x.fillStyle = x.strokeStyle
  for (let k = 0; k < n; k++) { const u = (k + 0.5) / n, px = x0 + (x1 - x0) * u, py = y0 + (y1 - y0) * u, nx = -(y1 - y0), ny = x1 - x0, L = Math.hypot(nx, ny), ox = nx / L, oy = ny / L
    if (kind === 'cold') { x.beginPath(); x.moveTo(px - (x1 - x0) / L * 20, py - (y1 - y0) / L * 20); x.lineTo(px + ox * 30, py + oy * 30); x.lineTo(px + (x1 - x0) / L * 20, py + (y1 - y0) / L * 20); x.fill() }
    else { x.beginPath(); x.arc(px, py, 20, Math.atan2(oy, ox) - Math.PI / 2, Math.atan2(oy, ox) + Math.PI / 2); x.fill() } }
}
export function bigNum(x, s, cx, cy, k = 1, col = BONE, size = 200) { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); x.lineWidth = 16; x.strokeStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.strokeText(s, 0, 0); x.fillStyle = col; x.fillText(s, 0, 0); x.restore() }
export function meter(x, cx, cy, w, v, { lab = '', col = '#ff7a2a', k = 1 } = {}) {   // a horizontal gauge 0..1
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); box(x, cx - w / 2, cy - 26, w, 52, '#14244a', 5); x.fillStyle = col; x.fillRect(cx - w / 2, cy - 26, w * clamp(v), 52)
  if (lab) txt(x, lab, cx, cy + 2, { size: 30, col: BONE, font: MONO, weight: 700 }); x.restore()
}
export { box, txt, FLOOR, label, sparkles, hearts, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV, skyline, freeway, car, shield, streetSign, heatSun, HGREEN, BRAKE, clamp, ease, prog }
