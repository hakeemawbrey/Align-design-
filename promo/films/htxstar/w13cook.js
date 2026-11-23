// Houston Star Talk · worker w13: COOKING SHOW parodies (hst322–hst332). Sports parodies live in w13.js.
// Grammar: "STAR KITCHEN": a host star behind a counter (chef hat), step banners, a guest sign who the dish is for,
// a twist, the taste test, then the party ticket. Generic dishes only (no restaurant or product brands).
import { clamp, prog, ease } from '../../src/lib.js'
import { box, txt } from '../starrace/ep.js'
import { label, sparkles, hearts, pop01, GOLD, BONE, PINK, INK, MONO, SERIF, SKYB, LAV } from '../signs3kit.js'
import { skyline, streetSign, sweat, partyCard, taco, kolache, klobasnek, soupPot, puffer, BRAKE } from './kit.js'
import { BADGE, STING, Kp, ground, crawfish, crawPile, corn, potato, boilPot, phone, stick, tree } from './w13.js'

const TAU = Math.PI * 2
const HY = 1010, GX = 700   // host centre y; guest x
const CT = 1150            // counter top

// ── kitchen set ──────────────────────────────────────────────────────────────────────────────────────────────
function kitchen(x, t, K) {
  x.fillStyle = K.wall; x.fillRect(0, 0, 1080, 1920)
  for (let gy = 520; gy < CT; gy += 60) for (let gx = 0; gx < 1080; gx += 60) { x.fillStyle = ((gx + gy) / 60) % 2 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'; x.fillRect(gx + 2, gy + 2, 56, 56) }
  box(x, 90, 560, 300, 260, '#e0806a', 8); x.save(); x.beginPath(); x.rect(90, 560, 300, 260); x.clip(); const g = x.createLinearGradient(0, 560, 0, 820); g.addColorStop(0, '#5a3a8a'); g.addColorStop(1, '#ffb27a'); x.fillStyle = g; x.fillRect(90, 560, 300, 260); x.restore()   // a window on the skyline at dusk
  x.save(); x.beginPath(); x.rect(90, 560, 300, 260); x.clip(); x.translate(90, 560); x.scale(300 / 1080, 0.3); skyline(x, 860, t, { alpha: 1, col: '#2a1d52' }); x.restore()
  x.fillStyle = INK; x.fillRect(236, 560, 8, 260); x.fillRect(90, 686, 300, 8)
  if (K.temp) { box(x, 150, 836, 180, 60, '#1c1240', 5); txt(x, K.temp, 240, 867, { size: 34, col: K.tempCol || GOLD, font: MONO, weight: 700 }) }
  streetSign(x, 840, 622, K.street || 'WESTHEIMER', { k: 0.55, pole: false })
  box(x, 660, 760, 360, 20, '#8a5530', 4)                           // a shelf with jars
  ;['#ff8fb1', '#f2c75c', '#7dbf5a', '#8fe3ff', '#c9a6ff'].forEach((c, i) => { box(x, 680 + i * 68, 700, 48, 60, c, 4); x.fillStyle = BONE; x.fillRect(684 + i * 68, 704, 40, 10) })
}
function counter(x, t, K) {
  box(x, -10, CT, 1100, 34, K.top || '#e8e0d0', 6)
  box(x, -10, CT + 40, 1100, 260, K.acc, 6); x.fillStyle = 'rgba(0,0,0,0.14)'; x.fillRect(0, CT + 180, 1080, 120)
  txt(x, K.show || 'STAR KITCHEN', 540, CT + 120, { size: 64, col: INK }); txt(x, 'COOKING LIVE IN HOUSTON', 540, CT + 230, { size: 30, col: INK, font: MONO, weight: 700 })
}
export function chefHat(x, P, id) {
  const [cx, cy, s] = P.at(id), top = cy - s * 0.47
  box(x, cx - s * 0.16, top - s * 0.06, s * 0.32, s * 0.09, BONE, 4)
  for (const [dx, r] of [[-0.12, 0.11], [0.12, 0.11], [0, 0.14]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s, top - s * 0.16, r * s + 5, 0, TAU); x.fill() }
  for (const [dx, r] of [[-0.12, 0.11], [0.12, 0.11], [0, 0.14]]) { x.fillStyle = '#ffffff'; x.beginPath(); x.arc(cx + dx * s, top - s * 0.16, r * s, 0, TAU); x.fill() }
}
function banner(x, t, lt, t0, text, col = GOLD) { if (!text) return; const k = pop01(t, t0 + 0.15, 0.3, 1.8); label(x, 540, 510, text, k, { size: 44, bg: col, rot: -0.03, font: MONO, weight: 700 }) }

// ── food props (pixel style) ─────────────────────────────────────────────────────────────────────────────────
const disc = (x, cx, cy, rx, ry, col) => { x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, rx + 5, ry + 5, 0, 0, TAU); x.fill(); x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, 0, TAU); x.fill() }
export function pan(x, cx, cy, t, fill = null, sizzle = 1) {
  box(x, cx + 90, cy - 12, 120, 18, '#2b2f45', 4); disc(x, cx, cy, 100, 26, '#3a3f55')
  if (fill) fill(cx, cy - 6)
  for (let k = 0; k < 5 * sizzle; k++) { const ph = (t * 2 + k / 5) % 1; x.fillStyle = `rgba(255,255,255,${(0.7 * (1 - ph)).toFixed(2)})`; x.fillRect(cx - 70 + k * 34, cy - 30 - ph * 60, 6, 6) }
}
export function burner(x, cx, cy, t) { box(x, cx - 130, cy - 8, 260, 16, '#2b2f45', 4); for (let k = 0; k < 6; k++) { x.fillStyle = Math.sin(t * 12 + k) > 0 ? '#5ec8ff' : '#ff9a3c'; x.fillRect(cx - 60 + k * 22, cy - 18, 10, 10) } }
export function tortilla(x, cx, cy, s = 1, corn = false) { disc(x, cx, cy, 70 * s, 22 * s, corn ? '#e8c45a' : '#f4e1b0'); for (let k = 0; k < 4; k++) { x.fillStyle = corn ? '#c99a3a' : '#d9b47a'; x.fillRect(cx - 40 * s + k * 24 * s, cy - 6 + (k % 2) * 8, 8 * s, 5 * s) } }
export function bowl(x, cx, cy, s = 1, col = BRAKE, rim = BONE) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.arc(0, -6, 66, 0, Math.PI); x.fill(); x.fillStyle = rim; x.beginPath(); x.arc(0, -6, 60, 0, Math.PI); x.fill(); disc(x, 0, -6, 60, 14, col); x.restore() }
export function foil(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -70, -34, 140, 68, '#c9ced8', 5); for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-60 + k * 26, -26 + (k % 2) * 20, 18, 5) } x.restore() }
export function cheese(x, cx, cy, s = 1) { box(x, cx - 50 * s, cy - 30 * s, 100 * s, 60 * s, '#f2c75c', 5); x.fillStyle = '#d9a33a'; for (const [dx, dy] of [[-20, -8], [14, 6], [26, -14]]) { x.beginPath(); x.arc(cx + dx * s, cy + dy * s, 6 * s, 0, TAU); x.fill() } }
export function pepper(x, cx, cy, s = 1, col = '#3f9a3a') { x.save(); x.translate(cx, cy); x.rotate(-0.3); x.scale(s, s); disc(x, 0, 0, 44, 14, col); box(x, 40, -6, 18, 8, '#6b8a3a', 3); x.restore() }
export function tomato(x, cx, cy, s = 1) { disc(x, cx, cy, 28 * s, 26 * s, '#d8432f'); x.fillStyle = '#3f9a3a'; x.fillRect(cx - 8 * s, cy - 30 * s, 16 * s, 8 * s) }
export function lemon(x, cx, cy, s = 1) { disc(x, cx, cy, 30 * s, 22 * s, '#f2e36a'); x.fillStyle = '#fff6b0'; x.fillRect(cx - 12 * s, cy - 10 * s, 10 * s, 6 * s) }
export function wing(x, cx, cy, s = 1, glaze = '#c98e4a') { x.save(); x.translate(cx, cy); x.rotate(0.3); x.scale(s, s); disc(x, -10, 0, 40, 26, glaze); disc(x, 34, -6, 22, 16, glaze); for (let k = 0; k < 5; k++) { x.fillStyle = '#f2e36a'; x.fillRect(-30 + k * 14, -10 + (k % 2) * 10, 5, 5); x.fillStyle = INK; x.fillRect(-26 + k * 13, 6 - (k % 2) * 10, 3, 3) } x.restore() }
export function bun(x, cx, cy, s = 1, fill = '#7a3e22') { x.save(); x.translate(cx, cy); x.scale(s, s); disc(x, 0, 22, 80, 18, '#e0a860'); for (let k = 0; k < 9; k++) box(x, -70 + k * 16, -4 - (k % 3) * 6, 14, 14, fill, 2); x.fillStyle = '#7dbf5a'; x.fillRect(-50, 0, 20, 8); x.fillRect(30, -2, 20, 8); x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 86, Math.PI, 0); x.fill(); x.fillStyle = '#e8b06a'; x.beginPath(); x.arc(0, -10, 80, Math.PI, 0); x.fill(); x.restore() }
export function brisket(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -100, -40, 200, 80, '#5a2a18', 6); x.fillStyle = '#e88a6a'; x.fillRect(-94, -10, 188, 10); x.fillStyle = '#2a1008'; x.fillRect(-94, -34, 188, 14); x.restore() }
export function dough(x, cx, cy, s = 1) { disc(x, cx, cy, 60 * s, 40 * s, '#f0d9a8'); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(cx - 24 * s, cy - 24 * s, 20 * s, 8 * s) }
export function raspa(x, cx, cy, t, s = 1, { mango = 1, chamoy = 1, straw = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-66, -40); x.lineTo(66, -40); x.lineTo(46, 100); x.lineTo(-46, 100); x.closePath(); x.fill()
  x.fillStyle = '#e8f4ff'; x.beginPath(); x.moveTo(-60, -36); x.lineTo(60, -36); x.lineTo(41, 94); x.lineTo(-41, 94); x.closePath(); x.fill()
  disc(x, 0, -40, 66, 46, '#f4f8ff')
  if (mango > 0) for (let k = 0; k < Math.round(7 * clamp(mango)); k++) box(x, -50 + (k * 37) % 90, -74 + (k * 23) % 40, 22, 22, '#ffb02e', 3)
  if (chamoy > 0) { x.strokeStyle = '#b0202a'; x.lineWidth = 9; x.beginPath(); for (let i = 0; i <= 20 * clamp(chamoy); i++) { const u = i / 20; x.lineTo(-56 + u * 112, -50 + Math.sin(u * 14) * 18) } x.stroke() }
  if (straw > 0) box(x, 20, -170 + 60 * (1 - clamp(straw)), 16, 120, '#a5452a', 3)
  x.restore()
}
export function kingCake(x, cx, cy, s = 1, t = 0, bands = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 166, 66, 0, 0, TAU); x.fill(); x.fillStyle = '#d9a55a'; x.beginPath(); x.ellipse(0, 0, 160, 60, 0, 0, TAU); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 66, 22, 0, 0, TAU); x.fill(); x.fillStyle = '#2a1a10'; x.beginPath(); x.ellipse(0, 0, 60, 18, 0, 0, TAU); x.fill()
  if (bands > 0) { const cols = ['#8a3ac0', '#3fa04a', '#f2c75c']; for (let k = 0; k < 9 * clamp(bands); k++) { const a = Math.PI * 0.95 + k * 0.42; x.fillStyle = cols[k % 3]; x.beginPath(); x.ellipse(Math.cos(a) * 112, Math.sin(a) * 40, 30, 22, a, 0, TAU); x.fill() } }
  x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineWidth = 5; x.beginPath(); for (let k = 0; k < 30; k++) { const a = k * 0.22; x.lineTo(Math.cos(a) * 110 + Math.sin(k * 3) * 14, Math.sin(a) * 40) } x.stroke()
  x.restore()
}
export function skewer(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.rotate(-0.2); x.scale(s, s); box(x, -110, -4, 220, 8, '#c9a46a', 2); for (let k = 0; k < 5; k++) { box(x, -90 + k * 38, -20, 32, 40, '#7a3018', 4); x.fillStyle = '#d9822a'; x.fillRect(-86 + k * 38, -16, 8, 8); x.fillRect(-74 + k * 38, 2, 8, 8) } x.restore() }
export function puffs(x, cx, cy, n = 5) { for (let k = 0; k < n; k++) { const px = cx + (k % 3) * 50 - 50, py = cy - Math.floor(k / 3) * 40; disc(x, px, py, 24, 22, '#d9a04a'); x.fillStyle = '#ffffff'; x.fillRect(px - 10, py - 12, 6, 6); x.fillRect(px + 4, py - 4, 6, 6) } }
export function rice(x, cx, cy, t) { soupPot(x, cx, cy, t); disc(x, cx, cy - 64, 110, 14, '#e0582a'); for (let k = 0; k < 8; k++) { x.fillStyle = '#f4a05a'; x.fillRect(cx - 90 + k * 24, cy - 70 + (k % 2) * 6, 8, 5) } }
export function hotPot(x, cx, cy, t, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  disc(x, 0, 0, 170, 60, '#9aa2ae'); x.save(); x.beginPath(); x.ellipse(0, 0, 150, 48, 0, 0, TAU); x.clip(); x.fillStyle = '#c0302a'; x.fillRect(-150, -48, 150, 96); x.fillStyle = '#f0e6cc'; x.fillRect(0, -48, 150, 96); x.restore()
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(0, -48); x.lineTo(0, 48); x.stroke()
  for (let k = 0; k < 8; k++) { const ph = (t * 1.5 + k / 8) % 1; x.fillStyle = k < 4 ? 'rgba(255,200,160,0.8)' : 'rgba(255,255,255,0.8)'; x.beginPath(); x.arc(-120 + k * 34, 10 - ph * 30, 6 * (1 - ph) + 2, 0, TAU); x.fill() }
  for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k / 4) % 1; x.strokeStyle = `rgba(255,255,255,${(0.5 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(-90 + k * 60, -60 - ph * 120); x.quadraticCurveTo(-70 + k * 60, -100 - ph * 120, -90 + k * 60, -140 - ph * 120); x.stroke() }
  x.restore()
}
export function dumpling(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 30, Math.PI, 0); x.fill(); x.fillStyle = '#f4efe4'; x.beginPath(); x.arc(0, 0, 25, Math.PI, 0); x.fill(); x.fillStyle = INK; for (let k = 0; k < 4; k++) x.fillRect(-15 + k * 10, -24, 3, 8); x.fillRect(-30, -2, 60, 5); x.restore() }
export function greens(x, cx, cy, s = 1) { for (let k = 0; k < 5; k++) { x.fillStyle = INK; x.beginPath(); x.ellipse(cx - 40 * s + k * 20 * s, cy, 16 * s, 36 * s, -0.4 + k * 0.2, 0, TAU); x.fill(); x.fillStyle = '#4fb04a'; x.beginPath(); x.ellipse(cx - 40 * s + k * 20 * s, cy, 12 * s, 32 * s, -0.4 + k * 0.2, 0, TAU); x.fill() } }
export function phoBowl(x, cx, cy, t, s = 1, { herbs = 1, noodles = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 126, 0, Math.PI); x.fill(); x.fillStyle = '#f4efe4'; x.beginPath(); x.arc(0, -10, 120, 0, Math.PI); x.fill(); x.fillStyle = '#5ec8ff'; x.fillRect(-110, 20, 220, 10)
  disc(x, 0, -10, 120, 30, '#c98e4a')
  if (noodles > 0) { x.strokeStyle = '#fff6dc'; x.lineWidth = 5; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(-90 + k * 30, -14); x.quadraticCurveTo(-75 + k * 30, -30, -60 + k * 30, -10); x.stroke() } }
  if (herbs > 0) { for (let k = 0; k < 5; k++) { x.fillStyle = '#4fb04a'; x.beginPath(); x.ellipse(-70 + k * 36, -22, 14, 7, k, 0, TAU); x.fill() } x.fillStyle = '#f2e36a'; x.beginPath(); x.arc(84, -18, 14, 0, TAU); x.fill() }
  for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k / 4) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 7; x.beginPath(); x.moveTo(-60 + k * 40, -40 - ph * 140); x.quadraticCurveTo(-40 + k * 40, -80 - ph * 140, -60 + k * 40, -120 - ph * 140); x.stroke() }
  x.restore()
}
export function timer(x, cx, cy, text, t, col = BRAKE) { box(x, cx - 120, cy - 60, 240, 120, '#120c24', 7); txt(x, text, cx, cy + 4, { size: 58, col, font: MONO, weight: 700 }); if (Math.sin(t * 6) > 0) { x.fillStyle = col; x.fillRect(cx + 100, cy - 52, 12, 12) } }
export function spice(x, cx, cy, t, lt, col = '#c0302a') { for (let k = 0; k < 16; k++) { const ph = ((lt * 1.4) + k / 16) % 1; x.fillStyle = col; x.fillRect(cx - 40 + (k * 29) % 90 + Math.sin(k + t * 4) * 10, cy + ph * 120, 7, 7) } }
export function tray(x, cx, cy, w = 340) { box(x, cx - w / 2, cy - 10, w, 22, '#8f96a0', 5) }

// ── the builder ─────────────────────────────────────────────────────────────────────────────────────────────
// S = { hook, host, guest, K: {wall, acc, show, temp?}, endLine, endStars, cues, scenes: [{ dur, step?, guest?: 0|1|'in'|'out',
//       cast?, mood: {h, g, …}, hops, lines [[a, d, 'h'|'g'|sign, text]], items(x,t,lt,P), stove(x,t,lt,P), back, mine, set? }] }
export function cookEp(S) {
  const al = k => k === 'h' ? S.host : k === 'g' ? S.guest : k
  const remap = o => o && Object.fromEntries(Object.entries(o).map(([k, v]) => [al(k), v]))
  return {
    hook: S.hook, badge: BADGE, cues: [...STING, ...(S.cues || [])], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: S.endLine, stars: S.endStars }),
    scenes: S.scenes.map(o => {
      const K = { ...S.K, ...(o.K || {}) }
      const cast = o.cast ? remap(o.cast) : { [S.host]: [[0, o.hx ?? 380, HY, 250]] }
      if (!o.cast && o.guest) cast[S.guest] = o.guest === 'in' ? [[0, 1260, HY, 220], [0.7, GX, HY, 220]] : o.guest === 'out' ? [[0, GX, HY, 220], [o.outAt ?? 1.5, 1260, HY, 220]] : [[0, GX, HY, 220]]
      return {
        dur: o.dur, cast, mood: remap(o.mood), hops: remap(o.hops), look: remap(o.look),
        lines: (o.lines || []).map(([a, d, w, s]) => [a, d, al(w), s]),
        set: (x, t, lt, P) => { if (o.set) o.set(x, t, lt, P); else kitchen(x, t, K) },
        back: o.back,
        front: (x, t, lt, P) => {
          if (!o.set) { counter(x, t, K); if (cast[S.host]) chefHat(x, P, S.host) }
          o.stove?.(x, t, lt, P); o.items?.(x, t, lt, P)
          banner(x, t, lt, t - lt, o.step, o.stepCol)
          if (o.mine) stick(x, t, lt, t - lt, o.mine)
        },
      }
    }),
  }
}

// ── the 11 cooking episodes ─────────────────────────────────────────────────────────────────────────────────
const ON = CT - 4   // things sitting on the counter
const plateTaste = (x, t, lt, at = 0.5) => { if (lt > at) sparkles(x, t, 540, 980, t - lt + at, 14, 320, 6) }

// hst322 · today: a breakfast taco for a Libra (host Taurus)
const ep322 = cookEp({
  hook: 'Today: a breakfast | taco for a Libra', host: 'taurus', guest: 'libra', K: { street: 'KATY FWY', wall: '#2a4a3a', acc: '#f2c75c' }, endLine: 'Make room for both. Jan 9.', endStars: ['libra', 'taurus', 'gemini', 'cancer'],
  cues: [['bell', 26.4, 1318.5, 0.014, 1.2, 0]],
  scenes: [
    { dur: 2.8, stove: (x, t) => { burner(x, 930, ON, t); pan(x, 930, ON - 30, t) }, items: x => { tortilla(x, 200, ON - 16); tortilla(x, 200, ON - 34) }, mood: { h: 'sparkle' }, hops: { h: [0.05, 0.9] } },
    { dur: 3.0, stove: (x, t) => { burner(x, 930, ON, t); pan(x, 930, ON - 30, t) }, mood: { h: 'happy' }, lines: [[0.2, 1.3, 'h', 'hi, you. | welcome back!'], [1.6, 1.3, 'h', "today's guest: | a Libra."]] },
    { dur: 3.2, step: 'STEP 1: THE TORTILLA', items: x => { tortilla(x, 560, ON - 16); tortilla(x, 760, ON - 16, 1, true) }, mood: { h: 'squint' }, lines: [[0.4, 2.4, 'h', 'flour or corn? | for a Libra...']] },
    { dur: 3.2, guest: 'in', items: x => { tortilla(x, 560, ON - 16); tortilla(x, 760, ON - 16, 1, true) }, mood: { h: 'wide', g: 'sparkle' }, hops: { g: [0.8] }, lines: [[0.9, 1.2, 'g', 'can I | have both?'], [2.2, 0.9, 'h', '...yes.']] },
    { dur: 3.2, step: 'STEP 2: EGG + POTATO', guest: 1, stove: (x, t) => { burner(x, 930, ON, t); pan(x, 930, ON - 30, t, (cx, cy) => { disc(x, cx - 20, cy, 50, 14, '#f8e27a'); for (let k = 0; k < 5; k++) box(x, cx - 50 + k * 24, cy - 10, 16, 16, '#d9a55a', 3) }) }, mood: { h: 'happy', g: 'heart' }, lines: [[0.4, 2.2, 'h', 'egg and potato. | a balanced team.']] },
    { dur: 3.2, step: 'STEP 3: THE SALSA', guest: 1, items: x => { bowl(x, 520, ON - 20, 0.8, '#c0302a'); bowl(x, 700, ON - 20, 0.8, '#4f9a3a') }, mood: { h: 'happy', g: 'wide' }, lines: [[0.2, 1.3, 'g', 'red or | green?'], [1.6, 1.4, 'h', 'a little | of each.']] },
    { dur: 3.0, step: 'STEP 4: WRAP IN FOIL', guest: 1, items: (x, t, lt) => foil(x, 560, ON - 34, Kp(lt, 0.3)), mood: { h: 'wink', g: 'happy' }, lines: [[0.4, 2.2, 'h', 'foil keeps it | warm on the 59.']] },
    { dur: 3.4, guest: 1, back: (x, t, lt) => plateTaste(x, t, lt, 0.6), items: (x, t, lt, P) => { const [cx, cy, s] = P.at('libra'); taco(x, cx - s * 0.55, cy + 10, 1.1) }, mood: { h: 'wide', g: 'heart' }, hops: { g: [0.6] }, lines: [[0.8, 2.2, 'g', 'perfectly | balanced.']], mine: [[0.2, 1.0, 'TASTE TEST', PINK]] },
    { dur: 3.2, guest: 1, items: (x, t, lt, P) => { for (let k = 0; k < 3; k++) taco(x, 300 + k * 30, ON - 40 - k * 22, 0.9) }, mood: { h: 'happy', g: 'eyeroll' }, lines: [[0.2, 1.3, 'g', 'one for | you too?'], [1.6, 1.4, 'h', 'already on | my third.']] },
    { dur: 3.2, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), mood: { h: 'heart', g: 'heart' }, lines: [[0.2, 2.4, 'h', 'the Libra recipe: | make room for both.']] },
  ],
})

// hst323 · Capricorn queso, with a five-year plan (host Gemini)
const ep323 = cookEp({
  hook: 'Queso with | a five-year plan | for Capricorn', host: 'gemini', guest: 'capricorn', K: { street: 'WESTHEIMER', wall: '#3a2a4a', acc: '#ff9a3c' }, endLine: 'Leave room for surprises. Jan 9.', endStars: ['capricorn', 'gemini', 'leo', 'aquarius'],
  scenes: [
    { dur: 2.8, stove: (x, t) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t) }, items: x => { cheese(x, 200, ON - 34); pepper(x, 560, ON - 20) }, mood: { h: 'sparkle' }, hops: { h: [0.05, 1.0] } },
    { dur: 3.0, stove: (x, t) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t) }, mood: { h: 'happy' }, lines: [[0.2, 1.3, 'h', "hey you! | it's queso day."], [1.6, 1.3, 'h', 'for a | Capricorn.']] },
    { dur: 3.2, guest: 'in', items: (x, t, lt, P) => { const [cx, cy, s] = P.at('capricorn'); box(x, cx - s * 0.75, cy - 50, 90, 120, BONE, 5); for (let k = 0; k < 4; k++) { x.fillStyle = INK; x.fillRect(cx - s * 0.75 + 12, cy - 30 + k * 24, 64, 5) } }, mood: { h: 'wide', g: 'squint' }, lines: [[0.9, 2.0, 'g', 'I made | a spreadsheet.']] },
    { dur: 3.2, step: 'STEP 1: THE CHEESE', guest: 1, stove: (x, t, lt) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t); cheese(x, 930, ON - 140 + 60 * clamp(lt / 2), 1 - 0.5 * clamp(lt / 2)) }, mood: { h: 'happy', g: 'squint' }, lines: [[0.4, 2.2, 'g', 'melted. | to the minute.']] },
    { dur: 3.2, step: 'STEP 2: TOMATOES + PEPPERS', guest: 1, items: x => { tomato(x, 470, ON - 30); tomato(x, 540, ON - 30); pepper(x, 620, ON - 20, 0.8) }, mood: { h: 'happy', g: 'happy' }, lines: [[0.4, 2.2, 'g', 'measured. | exactly.']] },
    { dur: 3.2, guest: 1, items: (x, t, lt) => { const u = clamp(lt / 0.8); pepper(x, 420 + 380 * u, ON - 60 - Math.sin(Math.PI * u) * 200, 1.1) }, stove: (x, t) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t) }, mood: { h: 'sparkle', g: 'wide' }, lines: [[1.0, 1.9, 'g', "that wasn't | in the plan."]], mine: [[0.2, 1.0, 'EXTRA JALAPEÑO', '#7dbf5a']] },
    { dur: 3.2, step: 'STEP 3: LOW AND SLOW', stepCol: SKYB, guest: 1, stove: (x, t) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t) }, mood: { h: 'happy', g: 'sleepy' }, lines: [[0.4, 2.2, 'g', 'low and slow. | like a career.']] },
    { dur: 3.4, guest: 1, back: (x, t, lt) => plateTaste(x, t, lt, 1.0), items: (x, t, lt) => { bowl(x, 560, ON - 20, 1.0, '#f2c75c'); const u = clamp((lt - 0.3) / 0.8); x.fillStyle = '#f2c75c'; x.fillRect(616, ON - 40 - u * 160, 10, u * 150); box(x, 590, ON - 70 - u * 170, 60, 40, '#e8c45a', 4) }, mood: { h: 'happy', g: 'heart' }, lines: [[1.2, 2.0, 'g', 'the jalapeño | was right.']], mine: [[0.1, 1.0, 'TASTE TEST', PINK]] },
    { dur: 3.2, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), mood: { h: 'wink', g: 'heart' }, lines: [[0.2, 2.4, 'h', 'every plan needs | one surprise.']] },
    { dur: 3.0, guest: 1, mood: { h: 'happy', g: 'wink' }, lines: [[0.2, 2.2, 'g', 'adding it | to the plan.']], mine: [[0.2, 1.4, 'SERVES: A CROWD', GOLD]] },
  ],
})

// hst324 · it's 60° out. Pisces made pho. (host Cancer)
const ep324 = cookEp({
  hook: "It's 60° out. | Pisces made pho.", host: 'cancer', guest: 'pisces', K: { street: 'BELLAIRE BLVD', wall: '#2a3a52', acc: '#8fe3ff', temp: '60°', tempCol: SKYB }, endLine: 'Soup weather or not. Jan 9.', endStars: ['pisces', 'cancer', 'virgo', 'capricorn'],
  scenes: [
    { dur: 2.8, stove: (x, t) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t) }, items: (x, t) => phoBowl(x, 330, ON - 20, t, 0.6), cast: { cancer: [[0, 380, HY, 250]], pisces: [[0, 1250, HY, 220], [1.0, GX, HY, 220]] }, mood: { cancer: 'happy', pisces: 'wide' }, hops: { cancer: [0.05], pisces: [1.0] } },
    { dur: 3.2, guest: 1, stove: (x, t) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t) }, items: (x, t, lt, P) => puffer(x, P, 'pisces', '#7a5ac0'), mood: { h: 'happy', g: 'wide' }, lines: [[0.2, 1.3, 'h', "hey you. | it's 60°."], [1.6, 1.4, 'g', "it's SO | cold."]] },
    { dur: 3.2, step: 'STEP 1: THE BROTH', guest: 1, stove: (x, t) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t) }, items: (x, t, lt, P) => { puffer(x, P, 'pisces', '#7a5ac0'); for (let k = 0; k < 3; k++) { x.fillStyle = '#6b3b1f'; x.save(); x.translate(480 + k * 50, ON - 20); x.rotate(t + k); for (let j = 0; j < 8; j++) { x.rotate(Math.PI / 4); x.fillRect(0, -4, 18, 8) } x.restore() } }, mood: { h: 'squint', g: 'happy' }, lines: [[0.4, 2.2, 'h', 'the broth | goes all day.']] },
    { dur: 3.2, step: 'STEP 2: THE NOODLES', guest: 1, items: (x, t, lt, P) => { puffer(x, P, 'pisces', '#7a5ac0'); phoBowl(x, 560, ON - 20, t, 0.8, { herbs: 0, noodles: Kp(lt, 0.3) }) }, mood: { h: 'happy', g: 'heart' }, lines: [[0.4, 2.2, 'h', 'noodles first. | then the broth.']] },
    { dur: 3.2, step: 'STEP 3: HERBS + LIME', guest: 1, items: (x, t, lt, P) => { puffer(x, P, 'pisces', '#7a5ac0'); phoBowl(x, 560, ON - 20, t, 0.8, { herbs: Kp(lt, 0.3) }) }, mood: { h: 'happy', g: 'sparkle' }, lines: [[0.4, 2.2, 'g', 'basil! sprouts! | lime!']] },
    { dur: 3.2, guest: 1, items: (x, t, lt, P) => { puffer(x, P, 'pisces', '#7a5ac0'); phoBowl(x, 600, ON - 20, t, 0.8) }, mood: { h: 'wide', g: 'heart' }, lines: [[0.2, 1.3, 'h', 'no crying | in the broth.'], [1.6, 1.3, 'g', 'happy | tears!']], mine: [[1.6, 1.2, 'SALT: ADDED', SKYB]] },
    { dur: 3.4, guest: 1, back: (x, t, lt) => plateTaste(x, t, lt, 0.6), items: (x, t, lt, P) => { puffer(x, P, 'pisces', '#7a5ac0'); phoBowl(x, 600, ON - 20, t, 0.8) }, mood: { h: 'happy', g: 'heart' }, hops: { g: [0.7] }, lines: [[0.8, 2.2, 'g', "it's like | a hug."]], mine: [[0.1, 1.0, 'TASTE TEST', PINK]] },
    { dur: 3.2, guest: 1, K: { temp: '81°', tempCol: BRAKE }, items: (x, t, lt, P) => { puffer(x, P, 'pisces', '#7a5ac0'); const [cx, cy, s] = P.at('pisces'); sweat(x, cx + s * 0.3, cy - s * 0.4, t) }, mood: { h: 'eyeroll', g: 'wide' }, lines: [[0.3, 1.2, 'g', "it's 81° | now?"], [1.7, 1.3, 'g', 'keeping | the scarf.']], mine: [[0.1, 1.2, 'UPDATE: 81°', BRAKE]] },
    { dur: 3.2, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), K: { temp: '81°', tempCol: BRAKE }, mood: { h: 'heart', g: 'heart' }, lines: [[0.2, 2.4, 'h', 'comfort food | works in any weather.']] },
  ],
})

// hst325 · Aries, wait. The crawfish must soak. (host Sagittarius, backyard)
const ep325 = cookEp({
  hook: 'Aries, wait. | The crawfish | must soak.', host: 'sagittarius', guest: 'aries', K: { street: 'GULF FWY', wall: '#3a2418', acc: '#ff7a2a' }, endLine: 'Good things take time. Jan 9.', endStars: ['aries', 'sagittarius', 'taurus', 'leo'],
  scenes: [
    { dur: 2.8, stove: (x, t) => boilPot(x, 930, ON - 10, t, 0.9), items: x => { corn(x, 200, ON - 20); potato(x, 300, ON - 20); crawfish(x, 440, ON - 20, 1.2, 0.3) }, mood: { h: 'sparkle' }, hops: { h: [0.05, 1.0] } },
    { dur: 3.0, stove: (x, t) => boilPot(x, 930, ON - 10, t, 0.9), mood: { h: 'happy' }, lines: [[0.2, 1.3, 'h', "hey you. | it's crawfish season."], [1.6, 1.3, 'h', 'barely. | they\'re small.']] },
    { dur: 3.0, guest: 'in', stove: (x, t) => boilPot(x, 930, ON - 10, t, 0.9), mood: { h: 'wide', g: 'sparkle' }, hops: { g: [0.8, 1.2, 1.6] }, lines: [[0.9, 1.0, 'g', 'are they | ready?'], [2.0, 0.9, 'h', 'we haven\'t | started.']] },
    { dur: 3.2, step: 'STEP 1: THE SEASONING', guest: 1, stove: (x, t, lt) => { boilPot(x, 930, ON - 10, t, 0.9); spice(x, 930, ON - 280, t, lt, '#d9622a') }, mood: { h: 'squint', g: 'wide' }, lines: [[0.3, 1.0, 'g', 'now?'], [1.4, 1.6, 'h', 'a lot | of seasoning.']] },
    { dur: 3.2, step: 'STEP 2: CORN + POTATOES', guest: 1, stove: (x, t, lt) => { boilPot(x, 930, ON - 10, t, 0.9); const u = clamp(lt / 0.8); corn(x, 500 + 430 * u, ON - 60 - Math.sin(Math.PI * u) * 160) }, mood: { h: 'happy', g: 'squint' }, lines: [[0.9, 2.0, 'g', 'now??']] },
    { dur: 3.2, step: 'STEP 3: THE SOAK', stepCol: SKYB, guest: 1, stove: (x, t) => boilPot(x, 930, ON - 10, t, 0.9), items: (x, t) => timer(x, 640, 780, '20:00', t), cast: { sagittarius: [[0, 380, HY, 250]], aries: [[0, 560, HY, 210], [0.5, 760, HY, 210], [1.0, 560, HY, 210], [1.5, 760, HY, 210], [2.0, 560, HY, 210], [2.5, 760, HY, 210]] }, mood: { sagittarius: 'happy', aries: 'wide' }, lines: [[0.3, 2.4, 'sagittarius', 'the soak | IS the flavor.']] },
    { dur: 3.0, guest: 1, stove: (x, t) => boilPot(x, 930, ON - 10, t, 0.9), items: (x, t) => timer(x, 640, 780, '19:58', t), mood: { h: 'wink', g: 'squint' }, lines: [[0.3, 1.6, 'g', "I'm patient. | I'm SO patient."]], mine: [[1.8, 1.1, 'IT HAS BEEN 2 SECONDS', BRAKE]] },
    { dur: 3.4, step: 'THE POUR', stepCol: PINK, guest: 1, back: (x, t, lt) => plateTaste(x, t, lt, 0.8), items: (x, t, lt) => { box(x, 160, ON - 14, 760, 20, '#d8d4c8', 4); crawPile(x, 540, ON - 24, Kp(lt, 0.2, 0.8)); corn(x, 330, ON - 30); potato(x, 760, ON - 30) }, mood: { h: 'happy', g: 'heart' }, hops: { g: [0.9, 1.4] }, lines: [[1.4, 1.8, 'g', '...okay. | worth it.']] },
    { dur: 3.2, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), items: (x, t) => { box(x, 160, ON - 14, 760, 20, '#d8d4c8', 4); crawPile(x, 540, ON - 24, 0.6) }, mood: { h: 'heart', g: 'heart' }, lines: [[0.2, 2.4, 'h', 'good things | take a soak.']] },
  ],
})

// hst326 · lemon pepper wet wings, Leo edition (host Virgo)
const ep326 = cookEp({
  hook: 'Lemon pepper wet | wings, Leo edition', host: 'virgo', guest: 'leo', K: { street: 'MLK BLVD', wall: '#4a3a1a', acc: '#f2e36a' }, endLine: 'Share the wings. Jan 9.', endStars: ['leo', 'virgo', 'sagittarius', 'pisces'],
  scenes: [
    { dur: 2.8, stove: (x, t) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t) }, items: x => { lemon(x, 200, ON - 24); lemon(x, 270, ON - 24); wing(x, 520, ON - 30) }, mood: { h: 'squint' }, hops: { h: [0.05, 0.9] } },
    { dur: 3.0, stove: (x, t) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t) }, mood: { h: 'happy' }, lines: [[0.2, 1.3, 'h', 'hi, you. | wings today.'], [1.6, 1.3, 'h', 'for a Leo. | pray for me.']] },
    { dur: 3.2, guest: 'in', mood: { h: 'eyeroll', g: 'sparkle' }, hops: { g: [0.8] }, lines: [[0.9, 2.0, 'g', 'make them | GOLD.']] },
    { dur: 3.2, step: 'STEP 1: FRY CRISPY', guest: 1, stove: (x, t) => { burner(x, 930, ON, t); soupPot(x, 930, ON - 70, t) }, items: x => { for (let k = 0; k < 3; k++) wing(x, 420 + k * 90, ON - 30, 0.8) }, mood: { h: 'squint', g: 'happy' }, lines: [[0.4, 2.2, 'h', 'crispy first. | no shortcuts.']] },
    { dur: 3.2, step: 'STEP 2: LEMON PEPPER', guest: 1, items: (x, t, lt) => { for (let k = 0; k < 3; k++) wing(x, 420 + k * 90, ON - 30, 0.8); spice(x, 510, ON - 200, t, lt, '#f2e36a') }, mood: { h: 'happy', g: 'sparkle' }, lines: [[0.4, 2.2, 'h', 'lemon pepper. | generous.']] },
    { dur: 3.2, step: 'STEP 3: THE "WET"', guest: 1, items: (x, t, lt) => { for (let k = 0; k < 3; k++) wing(x, 420 + k * 90, ON - 30, 0.8, '#e0a040'); box(x, 470, ON - 160, 80, 40, '#f8e27a', 4); const u = clamp(lt / 2); x.fillStyle = '#f8e27a'; x.fillRect(506, ON - 120, 8, 90 * u) }, mood: { h: 'happy', g: 'heart' }, lines: [[0.4, 2.2, 'h', 'wet means | butter. lots.']] },
    { dur: 3.0, guest: 1, mood: { h: 'squint', g: 'sparkle' }, lines: [[0.2, 1.3, 'g', 'can we | add glitter?'], [1.6, 1.0, 'h', 'no.']] },
    { dur: 3.4, guest: 1, back: (x, t, lt) => plateTaste(x, t, lt, 0.6), items: (x, t, lt, P) => { const [cx, cy, s] = P.at('leo'); wing(x, cx - s * 0.5, cy + 20, 1.1, '#e0a040') }, mood: { h: 'happy', g: 'heart' }, hops: { g: [0.7] }, lines: [[0.8, 2.2, 'g', 'iconic. | like me.']], mine: [[0.1, 1.0, 'TASTE TEST', PINK]] },
    { dur: 3.2, guest: 1, items: (x, t, lt, P) => { const u = clamp((lt - 0.4) / 0.8); wing(x, 680 - 260 * u, ON - 60 - Math.sin(Math.PI * u) * 80, 1, '#e0a040') }, mood: { h: 'wide', g: 'happy' }, lines: [[0.2, 1.5, 'g', 'you made them. | you first.']] },
    { dur: 3.2, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), mood: { h: 'heart', g: 'heart' }, lines: [[0.2, 2.4, 'h', 'a Leo who shares. | the rarest dish.']] },
  ],
})

// hst327 · Scorpio's secret chopped beef rub (host Libra; Scorpio is the guest)
const ep327 = cookEp({
  hook: "Scorpio's secret | chopped beef rub", host: 'libra', guest: 'scorpio', K: { street: 'NORTH FWY', wall: '#2a1418', acc: '#c0302a' }, endLine: 'No secrets. Jan 9.', endStars: ['scorpio', 'libra', 'aquarius', 'taurus'],
  scenes: [
    { dur: 2.8, items: x => brisket(x, 560, ON - 40, 0.9), cast: { libra: [[0, 380, HY, 250]], scorpio: [[0, 1250, HY, 220], [1.0, GX, HY, 220]] }, mood: { libra: 'sparkle', scorpio: 'squint' }, hops: { libra: [0.05], scorpio: [1.0] } },
    { dur: 3.2, guest: 1, items: x => brisket(x, 560, ON - 40, 0.9), mood: { h: 'happy', g: 'squint' }, lines: [[0.2, 1.4, 'h', 'hey you. Scorpio | is sharing a recipe.'], [1.8, 1.2, 'g', 'off the | record.']] },
    { dur: 3.4, step: 'STEP 1: THE SECRET RUB', guest: 1, items: (x, t, lt, P) => { brisket(x, 560, ON - 40, 0.9); const [cx, cy, s] = P.at('scorpio'); box(x, cx + s * 0.4, cy - 30, 60, 80, '#2b2f45', 4) }, mood: { h: 'wide', g: 'squint' }, lines: [[0.3, 1.4, 'g', "it's... salt | and pepper."], [1.9, 1.2, 'h', "that's it?"]] },
    { dur: 3.0, guest: 1, items: x => brisket(x, 560, ON - 40, 0.9), mood: { h: 'squint', g: 'wink' }, lines: [[0.2, 2.4, 'g', "that's the | secret."]], mine: [[1.4, 1.2, 'CLASSIFIED', BRAKE]] },
    { dur: 3.2, step: 'STEP 2: LOW AND SLOW', stepCol: SKYB, guest: 1, items: (x, t) => { brisket(x, 300, ON - 40, 0.7); timer(x, 640, 780, '12 HRS', t) }, mood: { h: 'happy', g: 'sleepy' }, lines: [[0.4, 2.2, 'h', 'twelve hours. | no peeking.']] },
    { dur: 3.2, step: 'STEP 3: CHOP IT', guest: 1, items: (x, t, lt) => { const n = Math.floor(clamp(lt / 1.6) * 10); if (n < 1) brisket(x, 560, ON - 40, 0.9); else for (let k = 0; k < n + 4; k++) box(x, 420 + (k * 53) % 280, ON - 40 - (k * 17) % 50, 34, 30, k % 2 ? '#5a2a18' : '#7a3e22', 3) }, mood: { h: 'sparkle', g: 'happy' }, lines: [[0.4, 2.2, 'h', 'chopped. | sauced.']] },
    { dur: 3.2, step: 'STEP 4: BUN + PICKLES', guest: 1, items: (x, t, lt) => bun(x, 560, ON - 40, Kp(lt, 0.2)), mood: { h: 'happy', g: 'happy' }, lines: [[0.6, 2.2, 'g', 'onions. pickles. | no debate.']] },
    { dur: 3.4, guest: 1, back: (x, t, lt) => plateTaste(x, t, lt, 0.6), items: (x, t, lt, P) => { const [cx, cy, s] = P.at('libra'); bun(x, cx + s * 0.55, cy + 30, 0.7) }, mood: { h: 'heart', g: 'squint' }, hops: { h: [0.7] }, lines: [[0.8, 2.2, 'h', 'okay. | WOW.']], mine: [[0.1, 1.0, 'TASTE TEST', PINK]] },
    { dur: 3.2, guest: 1, mood: { h: 'wide', g: 'heart' }, lines: [[0.2, 2.4, 'g', 'real secret? | I made it for you.']] },
    { dur: 3.2, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), mood: { h: 'heart', g: 'heart' }, lines: [[0.2, 2.4, 'h', 'secret ingredient: | being open.']] },
  ],
})

// hst328 · kolache AND klobasnek for a Gemini (host Capricorn; Virgo cameo)
const ep328 = cookEp({
  hook: 'Kolache AND | klobasnek for | a Gemini', host: 'capricorn', guest: 'gemini', K: { street: 'HEIGHTS BLVD', wall: '#1e3a4a', acc: '#ff8fb1' }, endLine: 'Sweet or savory? Both. Jan 9.', endStars: ['gemini', 'capricorn', 'virgo', 'libra'],
  scenes: [
    { dur: 2.8, items: x => { kolache(x, 220, ON - 40, 0.8); klobasnek(x, 400, ON - 34, 0.8) }, stove: (x, t) => { box(x, 760, 940, 300, 210, '#3a3f55', 7); box(x, 790, 990, 240, 120, '#ff9a3c', 5); txt(x, 'OVEN', 910, 965, { size: 24, col: BONE, font: MONO, weight: 700 }) }, mood: { h: 'squint' }, hops: { h: [0.05, 1.0] } },
    { dur: 3.0, mood: { h: 'happy' }, lines: [[0.2, 1.3, 'h', 'hi, you. | Gemini called.'], [1.6, 1.3, 'h', 'they want | both. again.']] },
    { dur: 3.2, guest: 'in', mood: { h: 'eyeroll', g: 'sparkle' }, hops: { g: [0.8] }, lines: [[0.9, 2.0, 'g', 'sweet AND | savory, please!']] },
    { dur: 3.2, step: 'STEP 1: THE DOUGH', guest: 1, items: (x, t, lt) => dough(x, 560, ON - 40, 0.8 + 0.4 * clamp(lt / 2.5)), mood: { h: 'happy', g: 'happy' }, lines: [[0.4, 2.2, 'h', 'let it rise. | like your hopes.']] },
    { dur: 3.2, step: 'STEP 2: FRUIT CENTER', guest: 1, items: (x, t, lt) => kolache(x, 560, ON - 50, Kp(lt, 0.3)), mood: { h: 'happy', g: 'heart' }, lines: [[0.5, 2.2, 'g', "that's the | sweet one!"]] },
    { dur: 3.2, step: 'STEP 3: SAUSAGE ROLL', guest: 1, items: (x, t, lt) => { kolache(x, 420, ON - 50, 0.8); klobasnek(x, 640, ON - 40, Kp(lt, 0.3)) }, mood: { h: 'happy', g: 'sparkle' }, lines: [[0.5, 2.2, 'g', 'and the | savory one!']] },
    { dur: 3.2, cast: { capricorn: [[0, 380, HY, 250]], gemini: [[0, GX, HY, 220]], virgo: [[0, 540, 1700, 200], [0.4, 560, 760, 200]] }, items: x => { kolache(x, 420, ON - 50, 0.8); klobasnek(x, 640, ON - 40, 0.8) }, mood: { capricorn: 'eyeroll', gemini: 'wide', virgo: 'squint' }, lines: [[0.5, 1.4, 'virgo', 'that one is a | KLOBASNEK.'], [2.0, 1.0, 'capricorn', 'we know, | Virgo.']] },
    { dur: 3.4, guest: 1, back: (x, t, lt) => plateTaste(x, t, lt, 0.6), items: (x, t, lt, P) => { tray(x, 560, ON - 20); kolache(x, 480, ON - 60, 0.7); klobasnek(x, 650, ON - 50, 0.7) }, mood: { h: 'happy', g: 'heart' }, hops: { g: [0.7, 1.2] }, lines: [[0.8, 2.2, 'g', 'the duality. | delicious.']], mine: [[0.1, 1.0, 'TASTE TEST', PINK]] },
    { dur: 3.2, guest: 1, mood: { h: 'eyeroll', g: 'sparkle' }, lines: [[0.2, 1.3, 'g', 'can you make | a third one?'], [1.7, 1.3, 'h', 'Gemini.']] },
    { dur: 3.2, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), mood: { h: 'wink', g: 'heart' }, lines: [[0.2, 2.4, 'h', "you don't | have to pick."]] },
  ],
})

// hst329 · raspa season in January? Aquarius says yes. (host Pisces)
const ep329 = cookEp({
  hook: 'Raspa season | in January? | Aquarius says yes.', host: 'pisces', guest: 'aquarius', K: { street: 'NAVIGATION', wall: '#1a3a3a', acc: '#7dffb0', temp: '82°', tempCol: BRAKE }, endLine: 'Stay cool. Jan 9.', endStars: ['aquarius', 'pisces', 'aries', 'scorpio'],
  scenes: [
    { dur: 2.8, items: (x, t) => { raspa(x, 560, ON - 100, t, 0.8) }, cast: { pisces: [[0, 380, HY, 250]], aquarius: [[0, 1250, HY, 220], [1.0, GX, HY, 220]] }, mood: { pisces: 'heart', aquarius: 'sparkle' }, hops: { pisces: [0.05], aquarius: [1.0] } },
    { dur: 3.2, guest: 1, mood: { h: 'happy', g: 'wink' }, lines: [[0.2, 1.4, 'h', "hi, you. it's 82° | in January."], [1.8, 1.2, 'g', 'raspa | season.']] },
    { dur: 3.2, step: 'STEP 1: SHAVED ICE', guest: 1, back: (x, t, lt) => { for (let k = 0; k < 30; k++) { const ph = (lt * 0.8 + k / 30) % 1; x.fillStyle = 'rgba(255,255,255,0.85)'; x.fillRect(420 + (k * 41) % 260, 700 + ph * 420, 8, 8) } }, items: (x, t) => raspa(x, 560, ON - 100, t, 0.9, { mango: 0, chamoy: 0, straw: 0 }), mood: { h: 'happy', g: 'sparkle' }, lines: [[0.4, 2.2, 'h', 'fluffy. | like a cloud.']] },
    { dur: 3.2, step: 'STEP 2: MANGO', guest: 1, items: (x, t, lt) => raspa(x, 560, ON - 100, t, 0.9, { mango: lt / 1.5, chamoy: 0, straw: 0 }), mood: { h: 'heart', g: 'happy' }, lines: [[0.5, 2.2, 'g', 'more mango. | always more.']] },
    { dur: 3.2, step: 'STEP 3: CHAMOY + CHILE', guest: 1, items: (x, t, lt) => { raspa(x, 560, ON - 100, t, 0.9, { chamoy: lt / 1.5, straw: 0 }); spice(x, 560, ON - 300, t, lt, '#c0302a') }, mood: { h: 'happy', g: 'sparkle' }, lines: [[0.5, 2.2, 'h', 'sweet, sour, | spicy.']] },
    { dur: 3.2, guest: 1, items: (x, t) => raspa(x, 560, ON - 100, t, 0.9, { straw: 0 }), mood: { h: 'wide', g: 'sparkle' }, lines: [[0.2, 1.3, 'g', 'what if... | pickle?'], [1.7, 1.3, 'h', "...let's | experiment."]], mine: [[1.7, 1.2, 'NEW FLAVOR', LAV]] },
    { dur: 3.2, step: 'STEP 4: TAMARIND STRAW', guest: 1, items: (x, t, lt) => raspa(x, 560, ON - 100, t, 0.9, { straw: Kp(lt, 0.3) }), mood: { h: 'happy', g: 'heart' }, lines: [[0.5, 2.2, 'h', 'the straw is | a snack too.']] },
    { dur: 3.4, guest: 1, back: (x, t, lt) => plateTaste(x, t, lt, 0.6), items: (x, t, lt, P) => { const [cx, cy, s] = P.at('aquarius'); raspa(x, cx - s * 0.55, cy + 20, t, 0.6) }, mood: { h: 'happy', g: 'heart' }, hops: { g: [0.7] }, lines: [[0.8, 2.2, 'g', 'tastes like | summer forever.']], mine: [[0.1, 1.0, 'TASTE TEST', PINK]] },
    { dur: 3.2, guest: 1, K: { temp: '55°', tempCol: SKYB }, items: (x, t, lt, P) => { puffer(x, P, 'aquarius', '#2b5fb0'); puffer(x, P, 'pisces', '#ff8fb1') }, mood: { h: 'wide', g: 'squint' }, lines: [[0.3, 1.2, 'h', 'cold front. | 55°.'], [1.7, 1.3, 'g', 'still | worth it.']], mine: [[0.1, 1.2, 'UPDATE: 55°', SKYB]] },
    { dur: 3.0, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), K: { temp: '55°', tempCol: SKYB }, mood: { h: 'heart', g: 'heart' }, lines: [[0.2, 2.2, 'g', 'weird is | a flavor.']] },
  ],
})

// hst330 · Cancer is baking for the whole group chat (host Leo, king cake)
const chat = (x, t, lt, msgs) => { msgs.forEach(([a, s, col], i) => { const k = pop01(t, t - lt + a, 0.3, 1.8); if (k <= 0) return; x.save(); x.translate(820, 620 + i * 90); x.scale(k, k); box(x, -190, -34, 380, 68, col || BONE, 5); txt(x, s, 0, 2, { size: 30, col: INK }); x.restore() }) }
const ep330 = cookEp({
  hook: 'Cancer is baking | for the whole | group chat', host: 'leo', guest: 'cancer', K: { street: 'MONTROSE BLVD', wall: '#3a1a4a', acc: '#c9a6ff' }, endLine: 'Save me a slice. Jan 9.', endStars: ['cancer', 'leo', 'gemini', 'virgo'],
  scenes: [
    { dur: 2.8, items: (x, t) => kingCake(x, 560, ON - 50, 0.8, t), mood: { h: 'sparkle' }, hops: { h: [0.05, 1.0] } },
    { dur: 3.0, mood: { h: 'happy' }, items: (x, t) => kingCake(x, 560, ON - 50, 0.8, t), lines: [[0.2, 1.3, 'h', 'hey you! king cake | season started.'], [1.7, 1.2, 'h', 'Jan 6. | it\'s here.']] },
    { dur: 3.2, guest: 'in', items: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); phone(x, cx - s * 0.55, cy, 0.7) }, mood: { h: 'happy', g: 'wide' }, lines: [[0.9, 2.0, 'g', 'one for the | whole group chat.']] },
    { dur: 3.2, step: 'STEP 1: BRAID THE DOUGH', guest: 1, items: (x, t, lt) => { for (let k = 0; k < 3; k++) { x.strokeStyle = INK; x.lineWidth = 30; x.beginPath(); for (let i = 0; i <= 20; i++) x.lineTo(380 + i * 18, ON - 50 + Math.sin(i * 0.8 + k * 2.1 + lt * 3) * 16); x.stroke(); x.strokeStyle = '#e8c48a'; x.lineWidth = 22; x.stroke() } }, mood: { h: 'squint', g: 'happy' }, lines: [[0.4, 2.2, 'h', 'braid it. | like your hair.']] },
    { dur: 3.2, step: 'STEP 2: CINNAMON', guest: 1, items: (x, t, lt) => { kingCake(x, 560, ON - 50, 0.8, t, 0); spice(x, 560, ON - 260, t, lt, '#8a4a2a') }, mood: { h: 'happy', g: 'heart' }, lines: [[0.4, 2.2, 'g', 'smells like | Grandma\'s.']] },
    { dur: 3.2, step: 'STEP 3: PURPLE, GREEN, GOLD', guest: 1, items: (x, t, lt) => kingCake(x, 560, ON - 50, 0.8, t, lt / 1.6), mood: { h: 'sparkle', g: 'sparkle' }, lines: [[0.4, 2.2, 'h', 'the sugar | is the outfit.']] },
    { dur: 3.4, guest: 1, items: (x, t, lt, P) => { kingCake(x, 400, ON - 50, 0.7, t); const [cx, cy, s] = P.at('cancer'); phone(x, cx - s * 0.6, cy + 10, 0.6); chat(x, t, lt, [[0.2, 'can I bring my cousin', '#8fe3ff'], [0.9, 'from Katy?', '#8fe3ff'], [1.6, 'me too!!', PINK], [2.3, 'and my roommate', GOLD]]) }, mood: { h: 'wide', g: 'wide' } },
    { dur: 3.2, guest: 1, items: (x, t, lt) => kingCake(x, 560, ON - 50, 0.8 + 0.5 * Kp(lt, 0.8, 0.6), t), mood: { h: 'wide', g: 'happy' }, lines: [[0.2, 1.4, 'g', 'make it | bigger.'], [1.8, 1.2, 'h', 'BIGGER.']] },
    { dur: 3.4, guest: 1, back: (x, t, lt) => plateTaste(x, t, lt, 0.6), items: (x, t, lt) => { kingCake(x, 560, ON - 50, 1.0, t); for (let k = 0; k < 4; k++) { const u = clamp((lt - 0.6 - k * 0.3) / 0.6); if (u > 0) box(x, 560 + Math.cos(k * 1.6) * 300 * u, ON - 60 - u * 300 - k * 40, 60, 34, '#d9a55a', 4) } }, mood: { h: 'happy', g: 'heart' }, hops: { g: [0.7] }, lines: [[0.8, 2.2, 'g', 'everybody | gets a slice.']] },
    { dur: 3.0, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), mood: { h: 'heart', g: 'heart' }, lines: [[0.2, 2.2, 'h', 'baking for a crowd | is a love language.']] },
  ],
})

// hst331 · jollof and suya for Sagittarius (host Aries → a picnic)
const picnic = (x, t) => { skyline(x, 960, t, { alpha: 0.85 }); x.fillStyle = '#3f8a4a'; x.fillRect(0, 960, 1080, 960); for (let k = 0; k < 5; k++) tree(x, 80 + k * 230, 1000, 0.5, '#4f9a5a'); box(x, 160, 1260, 760, 160, '#c0304a', 6); for (let k = 0; k < 8; k++) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(160 + k * 95, 1260, 40, 160) } }
const ep331 = cookEp({
  hook: 'Jollof and suya | for Sagittarius', host: 'aries', guest: 'sagittarius', K: { street: 'MAIN ST', wall: '#3a2a10', acc: '#ff7a2a' }, endLine: 'Bring a friend. Jan 9.', endStars: ['sagittarius', 'aries', 'taurus', 'gemini'],
  scenes: [
    { dur: 2.8, stove: (x, t) => { burner(x, 930, ON, t); rice(x, 930, ON - 70, t) }, items: x => { tomato(x, 200, ON - 30); pepper(x, 300, ON - 20, 0.8, '#c0302a') }, mood: { h: 'sparkle' }, hops: { h: [0.05, 0.6, 1.2] } },
    { dur: 3.0, stove: (x, t) => { burner(x, 930, ON, t); rice(x, 930, ON - 70, t) }, mood: { h: 'happy' }, lines: [[0.2, 1.3, 'h', 'hey you! | picnic food.'], [1.6, 1.3, 'h', 'for a | Sagittarius.']] },
    { dur: 3.2, step: 'STEP 1: THE JOLLOF', stove: (x, t) => { burner(x, 930, ON, t); rice(x, 930, ON - 70, t) }, items: x => { tomato(x, 440, ON - 30); tomato(x, 510, ON - 30); pepper(x, 600, ON - 20, 0.8, '#c0302a') }, mood: { h: 'squint' }, lines: [[0.4, 2.2, 'h', 'tomatoes, peppers, | patience.']] },
    { dur: 3.2, guest: 'in', stove: (x, t) => { burner(x, 930, ON, t); rice(x, 930, ON - 70, t) }, mood: { h: 'wide', g: 'sparkle' }, hops: { g: [0.8, 1.4] }, lines: [[0.9, 2.0, 'g', 'pack it | to go!']] },
    { dur: 3.2, step: 'STEP 2: THE SUYA', guest: 1, items: (x, t, lt) => { skewer(x, 520, ON - 40); skewer(x, 560, ON - 80); spice(x, 540, ON - 260, t, lt, '#d9622a') }, mood: { h: 'happy', g: 'heart' }, lines: [[0.4, 2.2, 'h', 'the spice | is everything.']] },
    { dur: 3.2, step: 'STEP 3: PUFF-PUFF', guest: 1, items: (x, t, lt) => puffs(x, 560, ON - 30, Math.round(6 * clamp(lt / 1.2))), mood: { h: 'sparkle', g: 'heart' }, lines: [[0.4, 2.2, 'g', 'warm and | sugary!']] },
    { dur: 3.2, set: (x, t) => picnic(x, t), cast: { aries: [[0, 360, 1180, 220]], sagittarius: [[0, 720, 1180, 220]] }, back: (x, t) => { rice(x, 540, 1350, t); }, front: (x, t) => { skewer(x, 300, 1370, 0.7); puffs(x, 820, 1370, 5) }, mood: { aries: 'happy', sagittarius: 'sparkle' }, hops: { sagittarius: [0.3, 0.8] }, lines: [[0.3, 2.2, 'sagittarius', 'Discovery Green. | outside. finally.']] },
    { dur: 3.4, set: (x, t) => picnic(x, t), cast: { aries: [[0, 300, 1180, 200]], sagittarius: [[0, 560, 1180, 200]], taurus: [[0, 1250, 1180, 180], [0.6, 800, 1180, 180]], gemini: [[0, -150, 1180, 180], [1.0, 120, 1180, 180]], libra: [[0, 1250, 1060, 160], [1.4, 960, 1060, 160]] }, back: (x, t) => rice(x, 540, 1350, t), mood: { aries: 'wide', sagittarius: 'heart', taurus: 'happy', gemini: 'sparkle', libra: 'happy' }, lines: [[1.6, 1.6, 'aries', 'you invited | the whole park?']] },
    { dur: 3.4, set: (x, t) => picnic(x, t), cast: { aries: [[0, 300, 1180, 200]], sagittarius: [[0, 560, 1180, 200]], taurus: [[0, 800, 1180, 180]], gemini: [[0, 120, 1180, 180]], libra: [[0, 960, 1060, 160]] }, back: (x, t, lt) => { rice(x, 540, 1350, t); plateTaste(x, t, lt, 0.4) }, mood: { aries: 'heart', sagittarius: 'heart', taurus: 'heart', gemini: 'heart', libra: 'heart' }, hops: { taurus: [0.6], gemini: [0.7], libra: [0.8] }, lines: [[0.3, 2.2, 'sagittarius', 'the more, | the merrier.']] },
    { dur: 3.0, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), mood: { h: 'heart', g: 'heart' }, lines: [[0.2, 2.2, 'h', 'always cook | a little extra.']] },
  ],
})

// hst332 · hot pot for two: the Taurus recipe (host Scorpio)
const ep332 = cookEp({
  hook: 'Hot pot for two: | the Taurus recipe', host: 'scorpio', guest: 'taurus', K: { street: 'BELLAIRE BLVD', wall: '#3a1218', acc: '#ffd36b' }, endLine: 'Share the pot. Jan 9.', endStars: ['taurus', 'scorpio', 'cancer', 'pisces'],
  scenes: [
    { dur: 2.8, items: (x, t) => { hotPot(x, 600, ON - 40, t, 0.9); dumpling(x, 200, ON - 10) }, mood: { h: 'squint' }, hops: { h: [0.05, 1.0] }, hx: 260 },
    { dur: 3.0, items: (x, t) => hotPot(x, 600, ON - 40, t, 0.9), mood: { h: 'happy' }, hx: 260, lines: [[0.2, 1.3, 'h', 'hey you. | hot pot night.'], [1.6, 1.3, 'h', 'for a Taurus. | for two.']] },
    { dur: 3.2, step: 'STEP 1: TWO BROTHS', items: (x, t) => hotPot(x, 600, ON - 40, t, 0.9), mood: { h: 'wink' }, hx: 260, lines: [[0.4, 2.2, 'h', 'one spicy. | one mild.']] },
    { dur: 3.2, guest: 'in', items: (x, t) => hotPot(x, 540, ON - 40, t, 0.8), mood: { h: 'happy', g: 'happy' }, lines: [[0.9, 2.0, 'g', "I'll take | the mild side."]] },
    { dur: 3.2, step: 'STEP 2: THE SAUCE BAR', guest: 1, items: x => { bowl(x, 420, ON - 16, 0.55, '#7a3e22'); bowl(x, 540, ON - 16, 0.55, '#c0302a'); bowl(x, 660, ON - 16, 0.55, '#4f9a3a') }, mood: { h: 'happy', g: 'sparkle' }, lines: [[0.4, 2.2, 'g', 'sesame. garlic. | a little chili.']] },
    { dur: 3.2, step: 'STEP 3: SLICES + GREENS', guest: 1, items: (x, t) => { hotPot(x, 540, ON - 40, t, 0.8); greens(x, 230, ON - 40); for (let k = 0; k < 3; k++) dumpling(x, 830 + k * 60, ON - 10, 0.8) }, mood: { h: 'happy', g: 'heart' }, lines: [[0.4, 2.2, 'h', 'dumplings | go in last.']] },
    { dur: 3.2, guest: 1, items: (x, t, lt) => { hotPot(x, 540, ON - 40, t, 0.8); const u = clamp((lt - 0.2) / 0.8); dumpling(x, 700 - 220 * u, ON - 60 - Math.sin(Math.PI * u) * 160, 0.9) }, mood: { h: 'wide', g: 'happy' }, mine: [[1.1, 1.4, 'WRONG SIDE', BRAKE]], lines: [[1.3, 1.6, 'h', 'Taurus. | that was spicy.']] },
    { dur: 3.2, guest: 1, items: (x, t, lt, P) => { hotPot(x, 540, ON - 40, t, 0.8); const [cx, cy, s] = P.at('taurus'); sweat(x, cx + s * 0.3, cy - s * 0.4, t) }, mood: { h: 'happy', g: 'wide' }, hops: { g: [0.4, 0.8, 1.2] }, lines: [[0.3, 1.3, 'g', "it's... | HOT."], [1.8, 1.2, 'h', 'here. milk tea.']] },
    { dur: 3.4, guest: 1, back: (x, t, lt) => plateTaste(x, t, lt, 0.6), items: (x, t) => hotPot(x, 540, ON - 40, t, 0.8), mood: { h: 'heart', g: 'heart' }, hops: { g: [0.7] }, lines: [[0.8, 2.2, 'g', "okay. I like | your side too."]] },
    { dur: 3.2, guest: 1, back: (x, t, lt) => hearts(x, t, 560, 980, t - lt + 0.3, { n: 6, spread: 300 }), items: (x, t) => hotPot(x, 540, ON - 40, t, 0.8), mood: { h: 'wink', g: 'heart' }, lines: [[0.2, 2.4, 'h', 'Lunar New Year | is coming. more pots.']] },
  ],
})

export const W13COOK = { hst322: ep322, hst323: ep323, hst324: ep324, hst325: ep325, hst326: ep326, hst327: ep327, hst328: ep328, hst329: ep329, hst330: ep330, hst331: ep331, hst332: ep332 }
