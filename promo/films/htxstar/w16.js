// Houston Star Talk · worker w16 (hst381–hst404): "Houston [sign] starter pack" (12) and "Which one are you?" (12).
// Built on promo/films/starrace/ep.js (makeEpisode) + htxstar/kit.js props; everything is a pure function of t.
// See promo/posting/htx/FARM.md and promo/films/HOUSTON-STARTALK.md (never-use list: no brands, teams, trademarked
// places/events, real people, drink/drug slang, disasters, statistics). Party facts: only the date, Jan 9.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside, heart, tinyStar } from '../starrace/ep.js'
import { sparkles, GOLD, BONE, PINK, INK, INTER, MONO, SERIF } from '../signs3kit.js'
import { streetSign, shield, skyline, car, freeway, heatSun, partyCard, taco, calendar, kolache, klobasnek, houses, mural, BRAKE, HGREEN } from './kit.js'

const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
const NAME = id => id[0].toUpperCase() + id.slice(1)
const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
const B = (x, l, t, w, h, col, ink = 5) => box(x, l, t, w, h, col, ink)
const circ = (x, cx, cy, r, col, ink = 5) => { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + ink, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
const poly = (x, pts, col, ink = 5) => { x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.closePath(); x.fillStyle = col; x.fill(); if (ink) { x.strokeStyle = INK; x.lineWidth = ink; x.lineJoin = 'round'; x.stroke() } }
/** text that shrinks to fit a width */
function fit(x, s, cx, cy, maxW, size, o = {}) {
  x.font = `${o.italic ? 'italic ' : ''}${o.weight ?? 800} ${size}px ${o.font || INTER}`
  const w = x.measureText(s).width, sz = w > maxW ? Math.floor(size * maxW / w) : size
  txt(x, s, cx, cy, { ...o, size: sz })
}

// ── icons (≈ ±70 px at s = 1) ──────────────────────────────────────────────────────────────────────────────
const IC = {
  shoes: (x, t) => { for (const [dx, c] of [[-38, '#ff5a6e'], [38, '#5ec8ff']]) { poly(x, [[dx - 34, 20], [dx - 34, -14], [dx - 6, -14], [dx + 34, 8], [dx + 34, 20]], c); x.fillStyle = BONE; x.fillRect(dx - 34, 20, 68, 10) } },
  paddle: (x, t) => { x.save(); x.rotate(-0.5 + 0.1 * Math.sin(t * 4)); B(x, -10, 20, 20, 60, '#6b3b1f'); circ(x, 0, -20, 46, '#7dffb0'); for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-20 + (k % 3) * 18, -40 + (k >> 1) * 18, 7, 7) } x.restore(); circ(x, 50, 36, 14, '#f2e25c', 4) },
  taco: (x) => taco(x, 0, 20, 1.15),
  towel: (x) => { B(x, -50, -55, 100, 110, '#8fe3ff'); for (let k = 0; k < 3; k++) { x.fillStyle = '#2b5fb0'; x.fillRect(-50, -40 + k * 34, 100, 10) } },
  phone: (x, t, a = ['...']) => { B(x, -42, -70, 84, 140, INK, 3); x.fillStyle = '#bfe6ff'; x.fillRect(-34, -58, 68, 112); a.forEach((l, i) => fit(x, l, 0, -20 + i * 34, 62, 22, { col: INK })) },
  invite: (x) => { B(x, -62, -40, 124, 80, '#1c1240'); x.fillStyle = GOLD; x.fillRect(-62, -40, 124, 8); x.fillRect(-62, 32, 124, 8); txt(x, 'JAN 9', 0, 2, { size: 34, col: GOLD }) },
  chair: (x) => { x.strokeStyle = INK; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(-30, -60); x.lineTo(-30, 30); x.lineTo(34, 30); x.lineTo(34, 60); x.moveTo(-30, 30); x.lineTo(-30, 60); x.stroke(); x.beginPath(); x.ellipse(0, 62, 60, 12, 0, 0, Math.PI); x.stroke(); x.strokeStyle = '#c98e5a'; x.lineWidth = 6; x.beginPath(); x.moveTo(-30, -60); x.lineTo(-30, 30); x.lineTo(34, 30); x.stroke() },
  dog: (x, t) => { B(x, -50, -10, 80, 44, '#c98e5a'); B(x, 20, -46, 44, 44, '#c98e5a'); B(x, 50, -30, 22, 14, '#6b3b1f'); B(x, -46, 34, 12, 22, '#c98e5a', 3); B(x, 12, 34, 12, 22, '#c98e5a', 3); poly(x, [[18, -4], [66, -4], [42, 22]], BRAKE, 4); x.save(); x.translate(-50, -6); x.rotate(-0.6 + 0.4 * Math.sin(t * 10)); B(x, -30, -6, 30, 10, '#c98e5a', 3); x.restore(); x.fillStyle = INK; x.fillRect(38, -34, 7, 7) },
  brisket: (x) => { B(x, -64, -24, 128, 56, '#4a2414'); x.fillStyle = '#d8606a'; x.fillRect(-58, -14, 116, 8); for (let k = 0; k < 4; k++) { x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(-40 + k * 28, -24, 6, 56) } },
  sweater: (x) => { poly(x, [[-40, -50], [40, -50], [70, -10], [50, 4], [40, -12], [40, 56], [-40, 56], [-40, -12], [-50, 4], [-70, -10]], '#c9a6ff'); for (let k = 0; k < 3; k++) { x.fillStyle = BONE; x.fillRect(-36, -20 + k * 24, 72, 6) } },
  plant: (x, t) => { B(x, -34, 14, 68, 50, '#c9783a'); for (let k = 0; k < 5; k++) { x.save(); x.translate(0, 14); x.rotate(-0.9 + k * 0.45 + 0.04 * Math.sin(t * 2 + k)); x.fillStyle = '#3aa65a'; x.beginPath(); x.ellipse(0, -46, 14, 40, 0, 0, Math.PI * 2); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; x.stroke(); x.restore() } },
  coffee: (x, t) => { B(x, -36, -20, 64, 76, BONE); x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.arc(34, 14, 18, -1.4, 1.4); x.stroke(); x.fillStyle = '#8a5530'; x.fillRect(-30, -12, 52, 14); for (let k = 0; k < 2; k++) { const ph = (t * 0.7 + k / 2) % 1; x.strokeStyle = `rgba(255,255,255,${(0.8 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(-14 + k * 22, -30 - ph * 40); x.quadraticCurveTo(-2 + k * 22, -44 - ph * 40, -14 + k * 22, -58 - ph * 40); x.stroke() } },
  townhome: (x) => { for (const dx of [-36, 36]) { B(x, dx - 32, -50, 64, 110, '#e8e4dc'); poly(x, [[dx - 36, -50], [dx + 36, -50], [dx + 36, -66], [dx - 36, -66]], '#4a4a58', 4); x.fillStyle = '#5ec8ff'; x.fillRect(dx - 20, -36, 40, 26); x.fillRect(dx - 20, 0, 40, 26) } },
  mic: (x, t) => { x.save(); x.rotate(0.35); B(x, -10, 0, 20, 70, '#4a4a58'); circ(x, 0, -18, 30, '#c0c6d0'); x.restore(); for (let k = 0; k < 3; k++) { const ph = (t * 1.2 + k / 3) % 1; x.fillStyle = `rgba(242,199,92,${(1 - ph).toFixed(2)})`; x.fillRect(40 + ph * 30, -50 - ph * 30 + k * 14, 12, 12) } },
  boba: (x) => { poly(x, [[-40, -40], [40, -40], [30, 60], [-30, 60]], '#f0d0a0'); for (let k = 0; k < 7; k++) { x.fillStyle = INK; x.beginPath(); x.arc(-20 + (k % 4) * 13, 34 + (k >> 2) * 12, 6, 0, Math.PI * 2); x.fill() } B(x, -46, -50, 92, 12, '#efe6d6', 4); B(x, 8, -86, 12, 40, PINK, 3) },
  hanger: (x) => { x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.arc(0, -62, 10, Math.PI, 0.2); x.moveTo(0, -52); x.lineTo(-56, -26); x.lineTo(56, -26); x.closePath(); x.stroke(); poly(x, [[-30, -26], [30, -26], [50, 60], [-50, 60]], PINK); x.fillStyle = GOLD; x.fillRect(-30, -4, 60, 8) },
  car: (x, t, a = ['#e05a3a']) => car(x, 0, 14, a[0], { s: 0.48 }),
  container: (x) => { B(x, -60, -16, 120, 60, 'rgba(220,240,255,0.95)'); B(x, -66, -34, 132, 20, '#5ec8ff'); x.fillStyle = '#e8b86a'; x.fillRect(-48, 0, 40, 28); x.fillStyle = '#7dbf5a'; x.fillRect(2, 4, 44, 24) },
  kolache: (x) => { kolache(x, -26, 6, 0.75); kolache(x, 30, -6, 0.75) },
  klob: (x) => klobasnek(x, 0, 0, 0.8),
  heart: (x) => heart(x, 0, 0, 13),
  shades: (x) => { B(x, -62, -16, 52, 36, INK, 3); B(x, 10, -16, 52, 36, INK, 3); x.fillStyle = INK; x.fillRect(-12, -10, 24, 8); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-54, -10, 12, 6); x.fillRect(18, -10, 12, 6) },
  camera: (x, t) => { B(x, -60, -34, 120, 76, '#4a4a58'); B(x, -30, -50, 40, 16, '#4a4a58', 4); circ(x, 0, 4, 26, '#8fe3ff'); circ(x, 0, 4, 12, INK, 0); if ((t * 0.8) % 1 < 0.08) { x.fillStyle = 'rgba(255,255,255,0.8)'; x.beginPath(); x.arc(44, -24, 16, 0, Math.PI * 2); x.fill() } },
  boots: (x) => { for (const dx of [-34, 34]) { poly(x, [[dx - 20, -60], [dx + 12, -60], [dx + 12, 22], [dx + 40, 26], [dx + 40, 50], [dx - 20, 50]], '#8a5530'); x.fillStyle = GOLD; x.fillRect(dx - 14, -30, 20, 6) } },
  star: (x, t) => { tinyStar(x, 0, 0, 60 + 4 * Math.sin(t * 5), GOLD) },
  clipboard: (x) => { B(x, -50, -62, 100, 126, '#8a5530'); B(x, -40, -48, 80, 104, BONE, 3); B(x, -20, -70, 40, 18, '#c0c6d0', 3); for (let k = 0; k < 4; k++) { x.fillStyle = INK; x.fillRect(-30, -28 + k * 22, k % 2 ? 40 : 56, 6) } },
  map: (x) => { poly(x, [[-64, -46], [-20, -56], [20, -46], [64, -56], [64, 46], [20, 56], [-20, 46], [-64, 56]], '#f4efe4'); x.strokeStyle = '#2b5fb0'; x.lineWidth = 6; x.beginPath(); x.moveTo(-50, 30); x.lineTo(-20, -10); x.lineTo(10, 20); x.lineTo(50, -30); x.stroke(); for (const [a, b] of [[-36, 12], [-4, 4], [30, -6]]) { x.fillStyle = BRAKE; x.fillRect(a - 6, b - 6, 12, 12) } },
  ruler: (x) => { x.save(); x.rotate(-0.25); B(x, -80, -16, 160, 32, GOLD); for (let k = 0; k < 9; k++) { x.fillStyle = INK; x.fillRect(-70 + k * 17, -16, 4, k % 2 ? 10 : 18) } x.restore() },
  cal: (x, t, a = ['JAN', '9']) => calendar(x, 0, 0, a[0], a[1], 0.5),
  boat: (x, t) => { const b = Math.sin(t * 2.4) * 5; x.fillStyle = '#5ec8ff'; x.fillRect(-80, 40, 160, 16); poly(x, [[-60, 10 + b], [60, 10 + b], [46, 44 + b], [-46, 44 + b]], BONE); B(x, -46, -40 + b, 92, 14, PINK, 4); x.fillStyle = INK; x.fillRect(-40, -26 + b, 6, 36); x.fillRect(34, -26 + b, 6, 36) },
  bags: (x) => { B(x, -62, -20, 60, 74, PINK); B(x, 6, -32, 60, 86, '#7dffb0'); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.arc(-32, -20, 16, Math.PI, 0); x.moveTo(52, -32); x.arc(36, -32, 16, 0, Math.PI, true); x.stroke() },
  bowl: (x, t) => { x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI); x.fill(); x.fillStyle = '#e8b86a'; x.fillRect(-56, -6, 112, 10); x.strokeStyle = '#8a5530'; x.lineWidth = 7; x.beginPath(); x.moveTo(20, -10); x.lineTo(60, -70); x.moveTo(34, -6); x.lineTo(74, -64); x.stroke(); for (let k = 0; k < 2; k++) { const ph = (t * 0.7 + k / 2) % 1; x.strokeStyle = `rgba(255,255,255,${(0.8 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(-30 + k * 26, -14 - ph * 40); x.quadraticCurveTo(-18 + k * 26, -28 - ph * 40, -30 + k * 26, -42 - ph * 40); x.stroke() } },
  ticket: (x, t, a = ['FREE']) => { x.save(); x.rotate(-0.12); B(x, -66, -34, 132, 68, GOLD); x.setLineDash([6, 6]); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(34, -30); x.lineTo(34, 30); x.stroke(); x.setLineDash([]); fit(x, a[0], -14, 2, 86, 30, { col: INK }); x.restore() },
  uturn: (x) => { x.strokeStyle = INK; x.lineWidth = 26; x.lineCap = 'butt'; x.beginPath(); x.moveTo(-34, 60); x.lineTo(-34, -10); x.arc(0, -10, 34, Math.PI, 0); x.lineTo(34, 30); x.stroke(); x.strokeStyle = '#f4fbf6'; x.lineWidth = 14; x.stroke(); poly(x, [[12, 26], [56, 26], [34, 60]], '#f4fbf6', 5) },
  mirror: (x, t) => { x.fillStyle = INK; x.beginPath(); x.ellipse(0, -6, 50, 64, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, -6, 44, 58, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#bfe6ff'; x.beginPath(); x.ellipse(0, -6, 34, 48, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(-18, -30 + 6 * Math.sin(t * 3), 8, 24) },
  bat: (x, t) => { for (const [ox, oy, ph] of [[-30, 10, 0], [34, -20, 1.7]]) { const f = Math.sin(t * 12 + ph) * 14; x.fillStyle = '#2a1a3a'; x.beginPath(); x.moveTo(ox, oy); x.lineTo(ox - 40, oy - 10 - f); x.lineTo(ox - 22, oy + 6); x.lineTo(ox, oy + 12); x.lineTo(ox + 22, oy + 6); x.lineTo(ox + 40, oy - 10 - f); x.closePath(); x.fill(); x.strokeStyle = BONE; x.lineWidth = 2; x.stroke() } },
  muralheart: (x) => { const c = ['#ff8fb1', '#ffd36b', '#7dffb0', '#8fe3ff']; for (let k = 0; k < 4; k++) B(x, -64 + k * 32, -50, 32, 100, c[k], 0); x.strokeStyle = INK; x.lineWidth = 5; x.strokeRect(-64, -50, 128, 100); heart(x, 0, 2, 7, BRAKE) },
  shirt: (x) => { poly(x, [[-30, -50], [30, -50], [66, -20], [48, 0], [36, -10], [36, 56], [-36, 56], [-36, -10], [-48, 0], [-66, -20]], '#1a1622') },
  candle: (x, t) => { B(x, -18, -10, 36, 70, BONE); const f = 1 + 0.12 * Math.sin(t * 9); x.fillStyle = '#ffb34a'; x.beginPath(); x.ellipse(0, -30, 10 * f, 20 * f, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff2b0'; x.beginPath(); x.ellipse(0, -26, 5, 10, 0, 0, Math.PI * 2); x.fill() },
  waves: (x, t) => { circ(x, 30, -30, 26, '#ffd36b', 4); for (let k = 0; k < 3; k++) { x.strokeStyle = ['#9a8a5a', '#8a7a4a', '#7a6a3a'][k]; x.lineWidth = 9; x.beginPath(); for (let i = 0; i <= 12; i++) { const px = -70 + i * 12; x.lineTo(px, 14 + k * 20 + Math.sin(i * 0.9 + t * 3 + k) * 6) } x.stroke() } },
  truck: (x) => { B(x, -70, -40, 112, 70, '#ffd36b'); B(x, 42, -14, 34, 44, '#ffd36b'); B(x, -56, -26, 64, 28, '#5ec8ff', 4); x.fillStyle = BRAKE; x.fillRect(-70, -54, 112, 14); for (const wx of [-42, 50]) circ(x, wx, 36, 14, '#4a4a58', 5) },
  passport: (x) => { B(x, -46, -62, 92, 124, '#2b4a8a'); circ(x, 0, -6, 26, '#2b4a8a', 0); x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, -6, 26, 0, Math.PI * 2); x.moveTo(-26, -6); x.lineTo(26, -6); x.moveTo(0, -32); x.lineTo(0, 20); x.stroke(); x.fillStyle = GOLD; x.fillRect(-26, 36, 52, 6) },
  shield: (x, t, a = ['610']) => shield(x, 0, 0, a[0], 0.72),
  tunnel: (x, t) => { x.fillStyle = INK; x.beginPath(); x.arc(0, 20, 70, Math.PI, 0); x.lineTo(70, 56); x.lineTo(-70, 56); x.fill(); x.fillStyle = '#c0c6d0'; x.beginPath(); x.arc(0, 20, 62, Math.PI, 0); x.lineTo(62, 56); x.lineTo(-62, 56); x.fill(); x.fillStyle = '#3a4a6a'; x.beginPath(); x.arc(0, 26, 40, Math.PI, 0); x.lineTo(40, 56); x.lineTo(-40, 56); x.fill(); for (let k = 0; k < 3; k++) { x.fillStyle = GOLD; x.fillRect(-30 + k * 26, -18, 10, 8) } txt(x, '72°', 0, 38, { size: 26, col: '#8fe3ff', font: MONO, weight: 700 }) },
  clock: (x, t) => { circ(x, 0, 0, 56, BONE); x.strokeStyle = INK; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -38); x.moveTo(0, 0); const a = t * 2; x.lineTo(Math.sin(a) * 30, -Math.cos(a) * 30); x.stroke() },
  hedge: (x) => { B(x, -70, -30, 140, 70, '#2f7a3a'); for (let k = 0; k < 6; k++) { x.fillStyle = '#3a9a4a'; x.fillRect(-62 + k * 22, -22, 12, 12) } B(x, -8, 40, 16, 20, '#6b3b1f', 3) },
  check: (x) => { B(x, -52, -52, 104, 104, BONE); x.strokeStyle = '#2f9a4a'; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.moveTo(-30, 0); x.lineTo(-8, 24); x.lineTo(34, -26); x.stroke() },
  scope: (x, t) => { x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 6); x.lineTo(-36, 62); x.moveTo(0, 6); x.lineTo(36, 62); x.moveTo(0, 6); x.lineTo(0, 62); x.stroke(); x.save(); x.rotate(-0.55); B(x, -60, -16, 110, 32, '#c9a6ff'); B(x, 50, -20, 20, 40, '#8a6ad8', 4); x.restore(); if (Math.sin(t * 3) > 0.6) { x.fillStyle = GOLD; x.fillRect(50, -78, 10, 10) } },
  tree: (x) => { for (let k = 0; k < 3; k++) poly(x, [[0, -66 + k * 30], [-44 + k * -6, -16 + k * 30], [44 + k * 6, -16 + k * 30]], '#2f7a3a'); B(x, -10, 44, 20, 22, '#6b3b1f', 3) },
  orbit: (x, t) => { x.strokeStyle = 'rgba(239,230,214,0.8)'; x.lineWidth = 4; x.beginPath(); x.ellipse(0, 0, 70, 26, -0.3, 0, Math.PI * 2); x.stroke(); circ(x, 0, 0, 28, '#5ec8ff'); const a = t * 2; x.fillStyle = GOLD; x.fillRect(Math.cos(a) * 70 * Math.cos(-0.3) - Math.sin(a) * 26 * Math.sin(-0.3) - 7, Math.cos(a) * 70 * Math.sin(-0.3) + Math.sin(a) * 26 * Math.cos(-0.3) - 7, 14, 14) },
  vinyl: (x, t) => { circ(x, 0, 0, 58, '#1a1622'); x.strokeStyle = 'rgba(255,255,255,0.15)'; x.lineWidth = 3; for (const r of [24, 36, 48]) { x.beginPath(); x.arc(0, 0, r, t * 3, t * 3 + 2); x.stroke() } circ(x, 0, 0, 16, BRAKE, 0); circ(x, 0, 0, 4, INK, 0) },
  jacket: (x) => { poly(x, [[-34, -52], [34, -52], [66, -10], [48, 8], [38, -6], [38, 58], [-38, 58], [-38, -6], [-48, 8], [-66, -10]], '#d8962a'); poly(x, [[-34, -52], [0, 10], [34, -52]], '#ff8fb1', 4); for (let k = 0; k < 3; k++) { x.fillStyle = INK; x.fillRect(-4, 18 + k * 12, 8, 6) } },
  tissues: (x, t) => { B(x, -54, -10, 108, 60, '#8fe3ff'); x.fillStyle = INK; x.fillRect(-26, -12, 52, 8); const w = Math.sin(t * 3) * 6; poly(x, [[-20, -10], [20, -10], [14 + w, -58], [-14 + w, -62]], '#ffffff', 4) },
  coat: (x) => { for (let k = 0; k < 4; k++) B(x, -46 + (k === 0 ? 8 : 0), -54 + k * 28, 92 - (k === 0 ? 16 : 0), 26, '#e05a3a', 4); B(x, -30, -76, 60, 22, '#2b5fb0', 4) },
  journal: (x) => { B(x, -50, -60, 100, 120, '#b0306a'); x.fillStyle = BONE; x.fillRect(36, -60, 8, 120); heart(x, -6, 0, 7, BONE) },
  cup: (x) => { poly(x, [[-36, -36], [36, -36], [28, 60], [-28, 60]], '#c9a6ff'); for (let k = 0; k < 6; k++) { x.fillStyle = INK; x.beginPath(); x.arc(-16 + (k % 3) * 16, 40 + (k / 3 | 0) * 12, 6, 0, Math.PI * 2); x.fill() } B(x, -42, -46, 84, 12, BONE, 4); B(x, 6, -80, 12, 36, '#7dffb0', 3) },
  sun: (x, t) => { x.save(); x.scale(0.55, 0.55); heatSun(x, 0, 0, t, 80); x.restore() },
  pollen: (x, t) => { car(x, 0, 14, '#5ec8ff', { s: 0.48 }); for (let k = 0; k < 16; k++) { x.fillStyle = '#e8d84a'; x.fillRect(-56 + (k * 37) % 112, -30 + (k * 23) % 30 + ((t * 20 + k * 7) % 10), 6, 6) } },
  drop: (x, t) => { const s = 1 + 0.06 * Math.sin(t * 4); x.save(); x.scale(s, s); poly(x, [[0, -66], [40, 6], [30, 40], [0, 54], [-30, 40], [-40, 6]], '#5ec8ff'); x.fillStyle = INK; x.fillRect(-16, 6, 8, 10); x.fillRect(10, 6, 8, 10); x.restore() },
  blinker: (x, t) => { const on = (t * 2) % 1 < 0.5; poly(x, [[-60, -18], [10, -18], [10, -46], [64, 0], [10, 46], [10, 18], [-60, 18]], on ? '#ffb34a' : '#6a4a2a') },
  tortilla: (x, t, a = ['#f4e1b0']) => { circ(x, 0, 0, 60, a[0]); for (let k = 0; k < 8; k++) { x.fillStyle = 'rgba(140,90,40,0.35)'; x.fillRect(-40 + (k * 31) % 80, -40 + (k * 47) % 80, 10, 10) } },
  raspa: (x) => { poly(x, [[-34, 0], [34, 0], [22, 64], [-22, 64]], BONE); const c = ['#ff5a6e', '#ffd36b', '#5ec8ff']; for (let k = 0; k < 3; k++) { x.fillStyle = c[k]; x.beginPath(); x.arc(-22 + k * 22, -4, 24, Math.PI, 0); x.fill() } },
  mango: (x) => { poly(x, [[-36, -40], [36, -40], [28, 60], [-28, 60]], '#ffb34a'); x.strokeStyle = BRAKE; x.lineWidth = 8; x.beginPath(); for (let i = 0; i < 8; i++) x.lineTo(-24 + (i % 2) * 48, -30 + i * 11); x.stroke(); B(x, 10, -84, 12, 46, '#8a3a1a', 3) },
  kingcake: (x) => { x.lineWidth = 30; const c = ['#8a4ad8', '#3aa65a', GOLD]; for (let k = 0; k < 12; k++) { x.strokeStyle = c[k % 3]; x.beginPath(); x.arc(0, 0, 46, k * Math.PI / 6, (k + 1) * Math.PI / 6); x.stroke() } x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.arc(0, 0, 62, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.stroke() },
  crawfish: (x, t) => { const w = Math.sin(t * 5) * 0.15; for (let k = 0; k < 5; k++) B(x, -60 + k * 22, -14 + k * 2, 22, 30 - k * 3, '#e0403a', 4); B(x, 50, -10, 30, 20, '#e0403a', 4); for (const sy of [-1, 1]) { x.save(); x.translate(-56, 0); x.rotate(sy * (0.5 + w)); B(x, -50, -8, 46, 16, '#e0403a', 3); B(x, -66, -14, 20, 28, '#e0403a', 3); x.restore() } x.fillStyle = INK; x.fillRect(-48, -10, 6, 6) },
  corn: (x) => { x.save(); x.rotate(-0.4); B(x, -24, -60, 48, 100, '#f2d24a'); for (let k = 0; k < 8; k++) { x.fillStyle = 'rgba(160,110,20,0.5)'; x.fillRect(-16 + (k % 2) * 16, -50 + k * 11, 10, 6) } x.restore(); circ(x, 40, 34, 26, '#c98e5a') },
  chat: (x) => { B(x, -64, -50, 90, 50, BONE); B(x, -20, 4, 90, 50, '#5ec8ff'); for (let k = 0; k < 3; k++) { x.fillStyle = INK; x.fillRect(-50 + k * 24, -28, 12, 8); x.fillRect(-4 + k * 24, 26, 12, 8) } },
  sheet: (x) => { B(x, -60, -50, 120, 100, BONE); x.fillStyle = '#3aa65a'; x.fillRect(-60, -50, 120, 20); x.strokeStyle = '#9aa0aa'; x.lineWidth = 2; for (let k = 1; k < 4; k++) { x.beginPath(); x.moveTo(-60, -30 + k * 20); x.lineTo(60, -30 + k * 20); x.stroke() } for (let k = 1; k < 3; k++) { x.beginPath(); x.moveTo(-60 + k * 40, -30); x.lineTo(-60 + k * 40, 50); x.stroke() } },
  door: (x, t) => { B(x, -44, -66, 88, 132, '#6b3b1f'); circ(x, 26, 6, 6, GOLD, 3); tinyStar(x, 0, -24, 20 + 3 * Math.sin(t * 6), GOLD) },
  loops: (x) => { for (const [r, c] of [[1, GOLD], [0.68, PINK], [0.36, '#8fe3ff']]) { x.strokeStyle = c; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 0, 70 * r, 50 * r, 0, 0, Math.PI * 2); x.stroke() } },
  feeder: (x) => { B(x, -70, 0, 140, 40, '#3a3450'); x.fillStyle = BONE; for (let k = 0; k < 4; k++) x.fillRect(-60 + k * 36, 16, 20, 6); B(x, -60, -60, 120, 46, HGREEN, 4); fit(x, 'FEEDER RD', 0, -37, 104, 22, { col: '#f4fbf6' }) },
  dress: (x) => { poly(x, [[-20, -56], [20, -56], [30, -20], [60, 60], [-60, 60], [-30, -20]], '#ff8fb1'); x.fillStyle = GOLD; x.fillRect(-30, -24, 60, 8) },
  beach: (x, t) => IC.waves(x, t),
  sneakers: (x, t) => IC.shoes(x, t),
}
function icon(x, t, k, cx, cy, s = 1) {
  if (!k) return
  const [name, ...a] = Array.isArray(k) ? k : [k]
  x.save(); x.translate(cx, cy); x.scale(s, s); IC[name](x, t, a.length ? a : undefined); x.restore()
}

// ── backgrounds (Houston sets; they cover the sky layer) ─────────────────────────────────────────────────────
const grad = (x, a, b, y0 = 0, y1 = FLOOR + 60) => { const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(0, y0, 1080, y1 - y0) }
const ground = (x, col) => { x.fillStyle = col; x.fillRect(0, FLOOR + 60, 1080, 1920 - FLOOR - 60); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10) }
const trees = (x, base, col = '#1f3a2a', t = 0) => { for (let k = 0; k < 9; k++) { const cx = 40 + k * 128, h = 160 + (k * 53) % 90, sw = Math.sin(t * 0.8 + k) * 4; x.fillStyle = col; x.beginPath(); x.ellipse(cx + sw, base - h * 0.6, 70, h * 0.5, 0, 0, Math.PI * 2); x.fill(); x.fillRect(cx - 8, base - h * 0.3, 16, h * 0.3) } }
const water = (x, top, h, col, t, line = 'rgba(255,255,255,0.25)') => { x.fillStyle = col; x.fillRect(0, top, 1080, h); for (let k = 0; k < 14; k++) { const y = top + 18 + (k * 37) % (h - 24), dx = (t * 30 + k * 151) % 1180 - 100; x.fillStyle = line; x.fillRect(dx, y, 70, 5) } }
const BG = {
  night: (x, t) => { skyline(x, FLOOR + 60, t, { alpha: 0.85 }); outside(x, { ground: '#221b38' }) },
  dawn: (x, t) => { grad(x, '#2b2a6b', '#ff9a6b'); circ(x, 540, FLOOR - 60, 120, '#ffd36b', 0); trees(x, FLOOR + 60, '#1f3a2a', t); ground(x, '#2f4a2a'); x.fillStyle = '#c9a06a'; x.fillRect(0, FLOOR + 110, 1080, 40) },
  porch: (x, t) => { grad(x, '#6ec3ff', '#d8f1ff'); B(x, 100, 760, 880, 600, '#f4efe4', 8); poly(x, [[60, 770], [540, 520], [1020, 770]], '#4a6a8a', 8); B(x, 100, 1080, 880, 30, '#c98e5a', 6); for (let k = 0; k < 6; k++) B(x, 130 + k * 160, 1110, 20, 250, BONE, 4); B(x, 200, 860, 160, 160, '#8fe3ff', 6); B(x, 720, 860, 160, 160, '#8fe3ff', 6); ground(x, '#4a8a3a') },
  neon: (x, t) => { grad(x, '#0d0820', '#2a1450'); const S = [['BOBA', '#7dffb0'], ['PHO', '#ff8fb1'], ['KARAOKE', '#8fe3ff'], ['HOT POT', '#ffd36b']]; S.forEach(([w, c], i) => { const cx = 150 + (i % 2) * 520 + (i > 1 ? 260 : 0), cy = 500 + (i > 1 ? 300 : 0) + (i % 2) * 60, a = 0.75 + 0.25 * Math.sin(t * 3 + i * 2); B(x, cx - 130, cy - 50, 260, 100, '#120a26', 6); x.save(); x.globalAlpha = a; x.shadowColor = c; x.shadowBlur = 30; fit(x, w, cx, cy + 2, 230, 56, { col: c }); x.restore() }); for (let k = 0; k < 7; k++) B(x, k * 160, 1000, 150, 390, ['#2a1a4a', '#24183e'][k % 2], 4); for (let k = 0; k < 7; k++) { x.fillStyle = `rgba(255,211,107,${(0.4 + 0.3 * Math.sin(t + k)).toFixed(2)})`; x.fillRect(k * 160 + 30, 1060, 90, 120) } ground(x, '#1a1030') },
  katy: (x, t) => { grad(x, '#ff9a8a', '#ffd3a0'); houses(x, FLOOR + 60, t); ground(x, '#4a7a3a') },
  mural: (x, t) => { x.fillStyle = '#1b1236'; x.fillRect(0, 0, 1080, 420); mural(x, t); ground(x, '#3a3450') },
  lawn: (x, t) => { grad(x, '#8fd3ff', '#e8f6ff'); trees(x, FLOOR - 40, '#2f6a3a', t); for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? '#5aa04a' : '#4a9040'; x.fillRect(0, FLOOR - 40 + k * 14, 1080, 14) } for (let k = 0; k < 6; k++) B(x, 40 + k * 180, FLOOR - 110, 140, 70, '#2f7a3a', 5); ground(x, '#4a9040') },
  lake: (x, t) => { grad(x, '#7ac8ff', '#d8f1ff'); trees(x, FLOOR - 140, '#2f6a3a', t); water(x, FLOOR - 140, 200, '#3a8ac0', t); for (let k = 0; k < 3; k++) { const bx = (k * 380 + t * 24) % 1240 - 80; x.save(); x.translate(bx, FLOOR - 60); IC.boat(x, t + k); x.restore() } ground(x, '#4a9040') },
  bats: (x, t) => { grad(x, '#3a1f5a', '#ff8a5a'); skyline(x, FLOOR - 180, t, { alpha: 0.7, col: '#2a1a40' }); B(x, -10, FLOOR - 190, 1100, 50, '#6a6a7a', 6); for (let k = 0; k < 6; k++) B(x, 60 + k * 190, FLOOR - 140, 26, 140, '#6a6a7a', 5); water(x, FLOOR, 60, '#3a3a6a', t); for (let k = 0; k < 14; k++) { const ph = (t * 0.18 + k / 14) % 1, bx = 540 + Math.sin(k * 2.3 + t * 0.5) * 420 * ph, by = FLOOR - 200 - ph * 900; x.save(); x.translate(bx, by); x.scale(0.4, 0.4); IC.bat(x, t + k); x.restore() } ground(x, '#2a2240') },
  beach: (x, t) => { grad(x, '#7ac8ff', '#ffe0b0'); circ(x, 820, 420, 80, '#ffd36b', 0); water(x, FLOOR - 220, 230, '#8a8a5a', t, 'rgba(255,255,240,0.35)'); for (let k = 0; k < 5; k++) { x.strokeStyle = 'rgba(255,255,240,0.6)'; x.lineWidth = 6; x.beginPath(); for (let i = 0; i <= 20; i++) x.lineTo(i * 56, FLOOR - 10 + k * 3 + Math.sin(i * 0.8 + t * 2 + k) * 6); x.stroke() } ground(x, '#e8c88a') },
  downtown: (x, t) => { grad(x, '#5ab0ff', '#d8f1ff'); x.save(); x.scale(1, 1); heatSun(x, 880, 330, t, 70); x.restore(); skyline(x, FLOOR + 60, t, { col: '#5a6a8a', lit: '#cfe8ff', alpha: 0.95 }); ground(x, '#5a5a6a') },
  clearlake: (x, t) => { grad(x, '#0d1430', '#3a4a8a'); for (let k = 0; k < 30; k++) { const a = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.4 + k)); x.fillStyle = `rgba(239,230,214,${a.toFixed(2)})`; x.fillRect((k * 173) % 1080, 60 + (k * 97) % 600, 5, 5) } water(x, FLOOR - 160, 220, '#1a2a5a', t); for (let k = 0; k < 4; k++) { const bx = 120 + k * 260, b = Math.sin(t * 2 + k) * 6; poly(x, [[bx - 50, FLOOR - 60 + b], [bx + 50, FLOOR - 60 + b], [bx + 36, FLOOR - 30 + b], [bx - 36, FLOOR - 30 + b]], BONE, 4); poly(x, [[bx, FLOOR - 200 + b], [bx, FLOOR - 66 + b], [bx + 60, FLOOR - 66 + b]], '#f4efe4', 4) } ground(x, '#2a3050') },
  sunset: (x, t) => { grad(x, '#6a3a9a', '#ff9a7a'); circ(x, 540, FLOOR - 220, 110, '#ffcf6b', 0); skyline(x, FLOOR - 160, t, { alpha: 0.9, col: '#3a2050', lit: '#ffcf6b' }); water(x, FLOOR - 160, 220, '#7a4a8a', t, 'rgba(255,207,107,0.45)'); ground(x, '#3a2a40') },
  kitchen: (x, t) => { x.fillStyle = '#f4e1c0'; x.fillRect(0, 0, 1080, FLOOR + 60); for (let r = 0; r < 24; r++) for (let c = 0; c < 12; c++) if ((r + c) % 2) { x.fillStyle = '#e8cfa6'; x.fillRect(c * 90, r * 60, 90, 60) } B(x, 0, FLOOR - 20, 1080, 80, '#c98e5a', 6); ground(x, '#6b3b1f') },
  freeway: (x, t) => { grad(x, '#5ab0ff', '#ffe0c0'); skyline(x, FLOOR - 160, t, { col: '#6a7a9a', lit: '#e8f6ff', alpha: 0.8 }); freeway(x, FLOOR - 160, 280, 3, t * 300); shield(x, 900, 560, '610', 0.8) },
  loopnight: (x, t) => { grad(x, '#0d1430', '#2a1a4a'); for (const [r, c] of [[1, GOLD], [0.68, PINK], [0.36, '#8fe3ff']]) { x.strokeStyle = c; x.globalAlpha = 0.25; x.lineWidth = 14; x.beginPath(); x.ellipse(540, 980, 520 * r, 380 * r, 0, 0, Math.PI * 2); x.stroke(); x.globalAlpha = 1 } for (let k = 0; k < 10; k++) { const a = t * 0.6 + k * 0.63, r = [1, 0.68, 0.36][k % 3]; x.fillStyle = k % 2 ? BRAKE : '#fff3c4'; x.fillRect(540 + Math.cos(a) * 520 * r - 6, 980 + Math.sin(a) * 380 * r - 6, 12, 12) } ground(x, '#1a1430') },
  patio: (x, t) => { grad(x, '#ffb0a0', '#ffe8c8'); for (let k = 0; k < 12; k++) { x.fillStyle = ['#ff8fb1', '#ffd36b', '#7dffb0'][k % 3]; x.beginPath(); x.arc(45 + k * 90, 380 + Math.sin(k) * 20, 12 + 3 * Math.sin(t * 3 + k), 0, Math.PI * 2); x.fill() } x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); for (let k = 0; k <= 12; k++) x.lineTo(k * 90, 368 + Math.sin(k) * 20); x.stroke(); for (let k = 0; k < 3; k++) { B(x, 120 + k * 320, FLOOR - 120, 200, 24, BONE); B(x, 210 + k * 320, FLOOR - 96, 20, 156, '#8a6a4a', 4); poly(x, [[110 + k * 320, FLOOR - 260], [330 + k * 320, FLOOR - 260], [220 + k * 320, FLOOR - 330]], ['#ff5a6e', '#5ec8ff', '#3aa65a'][k]) } ground(x, '#c98e5a') },
  lights: (x, t) => { grad(x, '#1a1040', '#3a2a6a'); for (let r = 0; r < 3; r++) { x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); for (let k = 0; k <= 12; k++) x.lineTo(k * 90, 360 + r * 260 + Math.sin(k * 0.9) * 24); x.stroke(); for (let k = 0; k < 12; k++) { const a = 0.6 + 0.4 * Math.sin(t * 3 + k + r); x.fillStyle = `rgba(255,211,107,${a.toFixed(2)})`; x.beginPath(); x.arc(45 + k * 90, 372 + r * 260 + Math.sin(k * 0.9 + 0.45) * 24, 11, 0, Math.PI * 2); x.fill() } } ground(x, '#2a2240') },
}

// ── starter pack ─────────────────────────────────────────────────────────────────────────────────────────────
const CELL = k => ({ cx: k % 2 ? 772 : 308, cy: 420 + (k >> 1) * 220, w: 436, h: 192 })
function packBoard(x, t, S, n, lt, fresh, dim = 0) {
  box(x, 64, 236, 952, 808, S.panel, 8)
  x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(64, 236, 952, 74)
  fit(x, `HOUSTON ${S.sign.toUpperCase()} STARTER PACK`, 540, 274, 880, 44, { col: BONE })
  for (let k = 0; k < 6; k++) {
    const { cx, cy, w, h } = CELL(k)
    if (k >= n) { x.setLineDash([14, 10]); x.strokeStyle = 'rgba(239,230,214,0.45)'; x.lineWidth = 4; x.strokeRect(cx - w / 2, cy - h / 2, w, h); x.setLineDash([]); txt(x, String(k + 1), cx, cy + 4, { size: 64, col: 'rgba(239,230,214,0.35)' }); continue }
    const kk = k === n - 1 && fresh ? Kp(lt, 0.02, 0.35) : 1
    if (kk <= 0) continue
    const wob = k === n - 1 && fresh ? 0 : Math.sin(t * 2 + k) * 0.012
    x.save(); x.translate(cx, cy); x.rotate(wob + (k % 2 ? 0.012 : -0.012)); x.scale(kk, kk)
    if (k === n - 1 && fresh) { x.shadowColor = GOLD; x.shadowBlur = 36 }
    box(x, -w / 2, -h / 2, w, h, BONE, 6); x.shadowBlur = 0
    const [it, cap] = S.items[k]
    icon(x, t, it, -w / 2 + 92, 4, 1)
    const L = cap.split(' | ')
    L.forEach((l, i) => fit(x, l, 74, (L.length === 1 ? 4 : -24 + i * 52), 262, 40, { col: INK }))
    circ(x, -w / 2 + 6, -h / 2 + 6, 20, S.panel, 4); txt(x, String(k + 1), -w / 2 + 6, -h / 2 + 8, { size: 26, col: BONE })
    x.restore()
  }
  if (dim > 0) { x.fillStyle = `rgba(8,5,22,${(0.72 * dim).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
}
export function starterPack(S) {
  const bg = BG[S.bg], id = S.sign, SY = 1318, SS = 230
  const xs = S.items.map((_, k) => k % 2 ? 760 : 320)
  const items = S.items.map(([icn, cap, line], k) => ({
    dur: 3.2, set: (x, t, lt) => { bg(x, t); packBoard(x, t, S, k + 1, lt, true) },
    cast: { [id]: [[0, k ? xs[k - 1] : 540, SY, SS], [0.45, xs[k], SY, SS]] }, mood: { [id]: S.moods?.[k] || ['happy', 'wink', 'sparkle', 'happy', 'wide', 'heart'][k] },
    lines: [[0.55, 2.5, id, line]],
  }))
  return {
    hook: S.hook, badge: BADGE, cues: [...STING, ['glitter', 2.8 + 6 * 3.2 + 0.1, 2.8 + 6 * 3.2 + 1.0]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: S.endLine, stars: S.endStars }),
    scenes: [
      { dur: 2.8, set: (x, t, lt) => {
          bg(x, t); streetSign(x, 540, 760, `HOUSTON ${id.toUpperCase()}`, { k: 1, pole: false, w: Math.max(560, id.length * 40 + 380), sub: 'STARTER PACK' })
          S.items.forEach(([icn], k) => { const a = t * 1.6 + k * Math.PI / 3, px = 540 + Math.cos(a) * 420, py = 1330 + Math.sin(a) * 120; if (Math.sin(a) < 0) icon(x, t, icn, px, py, 0.7) })
        },
        front: (x, t) => S.items.forEach(([icn], k) => { const a = t * 1.6 + k * Math.PI / 3, px = 540 + Math.cos(a) * 420, py = 1330 + Math.sin(a) * 120; if (Math.sin(a) >= 0) icon(x, t, icn, px, py, 0.8) }),
        cast: { [id]: [[0, 540, SY, 280]] }, hops: { [id]: [0.0, 0.7, 1.4, 2.1] }, mood: { [id]: 'sparkle' },
        lines: [[0.25, 2.45, id, S.intro]] },
      ...items,
      { dur: 3.0, set: (x, t, lt) => { bg(x, t); packBoard(x, t, S, 6, lt, false) },
        cast: { [id]: [[0, xs[5], SY, SS], [0.4, 540, SY, 250]] }, hops: { [id]: [0.5, 1.1, 1.7] }, mood: { [id]: 'happy' },
        stick: [[0.3, 2.6, '★ PACK COMPLETE', GOLD]], lines: [[0.6, 2.3, id, S.done]] },
      { dur: 3.4, set: (x, t, lt) => { bg(x, t); packBoard(x, t, S, 6, lt, false, clamp(lt / 0.3)) },
        front: (x, t, lt) => { const k = Kp(lt, 0.1, 0.35); if (k > 0) { x.save(); x.globalAlpha = clamp(k); txt(x, S.prompt[0], 540, 560, { size: 92, col: GOLD }); fit(x, S.prompt[1], 540, 680, 900, 56, { col: BONE }); fit(x, S.prompt[2], 540, 760, 900, 56, { col: BONE }); x.restore() } },
        cast: { [id]: [[0, 540, SY, 250]] }, mood: { [id]: 'wink' }, lines: [[0.5, 2.7, id, S.ask]] },
    ],
  }
}

// ── which one are you? ───────────────────────────────────────────────────────────────────────────────────────
const LET = ['A', 'B', 'C', 'D'], LCOL = ['#ff5a6e', '#5ec8ff', '#7dffb0', '#f2c75c']
const SLOT = k => ({ cx: k % 2 ? 760 : 320, cy: 800 + (k >> 1) * 266 })
function optCard(x, t, W, k, cx, cy, sc, { big = false, glow = false, dim = 0 } = {}) {
  if (sc <= 0) return
  const [, title, ic] = W.opts[k], w = big ? 880 : 412, h = big ? 440 : 232, band = big ? 96 : 54
  x.save(); x.translate(cx, cy); x.rotate(big ? -0.015 : (k % 2 ? 0.02 : -0.02)); x.scale(sc, sc)
  if (glow) { x.shadowColor = LCOL[k]; x.shadowBlur = 40 }
  box(x, -w / 2, -h / 2, w, h, BONE, big ? 8 : 6); x.shadowBlur = 0
  x.fillStyle = LCOL[k]; x.fillRect(-w / 2, -h / 2, w, band)
  circ(x, -w / 2 + band * 0.62, -h / 2 + band / 2, band * 0.36, INK, 0); txt(x, LET[k], -w / 2 + band * 0.62, -h / 2 + band / 2 + 3, { size: band * 0.5, col: BONE })
  fit(x, big ? `OPTION ${LET[k]}` : W.short || 'PICK ONE', 20, -h / 2 + band / 2 + 2, w - band * 2, big ? 40 : 24, { col: INK, font: MONO, weight: 700 })
  const L = title.split(' | ')
  if (big) { L.forEach((l, i) => fit(x, l, 0, -h / 2 + band + 54 + i * 60, w - 60, 54, { col: INK })); icon(x, t, ic, 0, 96 + (L.length > 1 ? 20 : 0), 1.45) }
  else { icon(x, t, ic, -138, 30, 0.66); L.forEach((l, i) => fit(x, l, 50, (L.length > 1 ? 8 : 30) + i * 46, 280, 40, { col: INK })) }
  x.restore()
  if (dim > 0) { x.save(); x.translate(cx, cy); x.fillStyle = `rgba(8,5,22,${(0.55 * dim).toFixed(3)})`; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.restore() }
}
export function whichOne(W) {
  const bg = BG[W.bg], host = W.host, PEEK = k => [SLOT(k).cx + 150, SLOT(k).cy - 112, 104]
  const grid = (x, t, lt, pop = false, dimAll = 0) => { for (let k = 0; k < 4; k++) { const { cx, cy } = SLOT(k); optCard(x, t, W, k, cx, cy + (pop ? Math.sin(t * 3 + k * 1.6) * 8 : 0), 1, { dim: dimAll }) } }
  const peek = Object.fromEntries(W.opts.map(([s], k) => [s, [[0, ...PEEK(k)]]]))
  const OPT = W.opts.map(([s, title, ic, l1, l2], k) => ({
    dur: 4.2, set: (x, t, lt) => { bg(x, t); optCard(x, t, W, k, 540, 760, Kp(lt, 0.02, 0.35), { big: true, glow: true }) },
    cast: { [s]: [[0, k % 2 ? 1200 : -120, 1320, 240], [0.4, 540, 1320, 240]] }, mood: { [s]: lt => lt > 2.2 ? 'heart' : W.moods?.[k] || 'sparkle' },
    lines: [[0.45, 1.8, s, l1], [2.35, 1.8, s, l2]],
  }))
  return {
    hook: W.hook, badge: BADGE, cues: STING, endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: W.endLine, stars: W.endStars || W.opts.map(o => o[0]) }),
    scenes: [
      { dur: 2.8, set: (x, t, lt) => { bg(x, t); grid(x, t, lt, true) }, cast: { ...peek, [host]: [[0, 540, 1450, 190]] },
        hops: Object.fromEntries([...W.opts.map(([s], k) => [s, [0.02 + k * 0.1, 0.9 + k * 0.1, 1.8 + k * 0.1]]), [host, [0.05, 1.2]]]),
        mood: Object.fromEntries([...W.opts.map(([s], k) => [s, ['wink', 'happy', 'sparkle', 'wide'][k]]), [host, 'sparkle']]),
        lines: [[0.3, 2.4, host, W.intro]] },
      ...OPT,
      { dur: 3.0, set: (x, t, lt) => { bg(x, t); grid(x, t, lt) }, cast: { ...peek, [host]: [[0, 540, 1450, 190]] },
        hops: Object.fromEntries(W.opts.map(([s], k) => [s, [0.2 + k * 0.15, 1.4 + k * 0.15]])), mood: Object.fromEntries([...W.opts.map(([s]) => [s, 'happy']), [host, 'wink']]),
        lines: [[0.3, 2.5, host, W.recap]] },
      { dur: 3.4, set: (x, t, lt) => { bg(x, t); grid(x, t, lt, false, clamp(lt / 0.3)) },
        front: (x, t, lt) => { const k = Kp(lt, 0.1, 0.35); if (k > 0) { x.save(); x.translate(540, 820); x.scale(k, k); box(x, -440, -190, 880, 380, '#1c1240', 8); x.fillStyle = GOLD; x.fillRect(-440, -190, 880, 14); txt(x, 'COMMENT', 0, -110, { size: 64, col: GOLD, font: MONO, weight: 700 }); LET.forEach((l, i) => { circ(x, -270 + i * 180, 10, 58, LCOL[i], 6); txt(x, l, -270 + i * 180, 14, { size: 72, col: INK }) }); fit(x, W.plus || '+ your sign', 0, 130, 800, 50, { col: BONE }); x.restore() } },
        cast: { [host]: [[0, 540, 1380, 230]] }, mood: { [host]: 'happy' }, hops: { [host]: [0.4, 1.6] }, lines: [[0.6, 2.6, host, W.ask]] },
    ],
  }
}

// ════════════════════════════════════ the 24 scripts ════════════════════════════════════
export const W16 = {
  // ── starter packs (hook templates: A "Houston X | starter pack", B "Your X starter pack: | Houston edition",
  //    C "If you're a Houston X, | you own these", D "POV: you're a Houston X | (starter pack)"; 3 each)
  hst381: starterPack({ sign: 'aries', bg: 'dawn', panel: '#c0402a', hook: 'Houston Aries | starter pack', intro: 'hey Aries. | yes, you.',
    items: [['shoes', '5am loop | at Memorial', 'you ran it | before sunrise.'], ['paddle', 'pickleball | rematch', 'you challenged | a stranger. again.'],
      ['taco', 'taco eaten | at a red light', 'breakfast is | a speed event.'], ['towel', 'sweat towel | in January', "it's 80 out. | you ran anyway."],
      [['phone', "'leaving", "now'"], "'leaving now' | (already there)", "you're early | to everything."], ['invite', 'first RSVP | for Jan 9', 'obviously you | RSVP\'d first.']],
    done: "that's you. | admit it.", prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Aries essential.'], ask: 'tell me. | fast.', endLine: 'Race you there, Aries.', endStars: ['aries', 'leo', 'sagittarius', 'gemini'] }),
  hst382: starterPack({ sign: 'taurus', bg: 'porch', panel: '#2f7a5a', hook: 'Your Taurus | starter pack: | Houston edition', intro: 'hey Taurus. | this is you.',
    items: [['chair', 'Heights porch | rocking chair', "you're not | leaving the Heights."], ['dog', 'a dog | in a bandana', 'your dog | dresses better.'],
      ['brisket', 'brisket opinions | (bark matters)', 'you have notes. | on the bark.'], ['sweater', 'a sweater | for the AC', "inside is freezing. | you're ready."],
      ['plant', 'plants. | so many plants.', 'they all | have names.'], ['coffee', 'slow brunch. | no rush.', 'a two-hour wait? | you brought snacks.']],
    done: 'cozy. | correct.', prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Taurus essential.'], ask: 'take your time. | I have snacks.', endLine: 'Comfy shoes. Jan 9.', endStars: ['taurus', 'cancer', 'virgo', 'pisces'] }),
  hst383: starterPack({ sign: 'gemini', bg: 'neon', panel: '#6a3ac8', hook: "If you're a | Houston Gemini, | you own these", intro: 'Gemini. | both of you.',
    items: [[['tortilla', '#f4e1b0'], 'one flour, | one corn', "you couldn't pick. | so, both."], ['townhome', 'EaDo townhome | (or East End?)', 'you say both. | depends who asks.'],
      ['mic', 'karaoke mic | on Bellaire', 'you sang | the duet. solo.'], ['chat', '17 group chats | all active', 'you reply | in all of them.'],
      ['boba', 'boba with | every topping', "you said | 'surprise me.'"], ['hanger', 'two outfits | for one night', "Jan 9: | you'll wear both."]],
    done: 'all of it. | at once.', prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Gemini essential.'], ask: 'comment twice. | I know you will.', endLine: 'See you. Both of you.', endStars: ['gemini', 'libra', 'aquarius', 'aries'] }),
  hst384: starterPack({ sign: 'cancer', bg: 'katy', panel: '#2b5fb0', hook: "POV: you're a | Houston Cancer | (starter pack)", intro: 'hi, Cancer. | did you eat?',
    items: [[['car', '#7a5ab0'], 'cousins in Katy | (all of them)', "you know every | cousin's order."], ['container', 'leftovers | for everyone', 'you packed me | a plate. again.'],
      ['kolache', 'a dozen kolaches | for the office', 'you fed | the whole floor.'], ['sweater', 'spare sweater | for a friend', 'the AC is arctic. | you knew.'],
      ['chat', "'where'd you go | to high school?'", "you're | connecting dots."], ['heart', 'remembers | every birthday', 'you text first. | every time.']],
    done: "you're the | group's home.", prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Cancer essential.'], ask: 'and bring | a sweater.', endLine: 'Bring your people. Jan 9.', endStars: ['cancer', 'taurus', 'pisces', 'capricorn'] }),
  hst385: starterPack({ sign: 'leo', bg: 'mural', panel: '#c0802a', hook: 'Houston Leo | starter pack', intro: 'Leo. | look at you.',
    items: [['shades', "sunglasses | (it's November)", "you're shining. | it's also sunny."], ['camera', 'the mural photo | (37 takes)', 'you found | your light.'],
      ['dress', 'brunch outfit | planned Tuesday', 'you planned it | days ahead.'], ['boots', 'boots out for | rodeo season', 'your boots | have fans.'],
      [['car', '#d8b23a'], 'dressed up | for errands', 'Uptown errands? | you dressed up.'], ['door', 'the Jan 9 | entrance', "you're rehearsing | your entrance."]],
    done: 'iconic. | as expected.', prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Leo essential.'], ask: 'hype me up. | in the comments.', endLine: 'Your entrance awaits.', endStars: ['leo', 'aries', 'libra', 'sagittarius'] }),
  hst386: starterPack({ sign: 'virgo', bg: 'lawn', panel: '#4a6a3a', hook: 'Your Virgo | starter pack: | Houston edition', intro: 'Virgo. | you made a list.',
    items: [['clipboard', 'kolache vs | klobasnek chart', 'you correct people. | kindly.'], ['pollen', 'a car wash | (oak pollen)', 'the pollen | came back. again.'],
      ['map', 'a map of every | Westheimer bump', 'you know | every bump.'], ['ruler', 'lawn edged | with a ruler', 'your lawn | has standards.'],
      ['tunnel', 'downtown tunnel | hours memorized', 'closed weekends. | you know.'], [['cal', 'JAN', '9'], 'Jan 9 in | the calendar. in pen.', 'you blocked it | months ago.']],
    done: 'organized. | alphabetized.', prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Virgo essential.'], ask: 'spelling counts. | lovingly.', endLine: "It's in your calendar. Good.", endStars: ['virgo', 'capricorn', 'taurus', 'scorpio'] }),
  hst387: starterPack({ sign: 'libra', bg: 'lake', panel: '#c05a8a', hook: "If you're a | Houston Libra, | you own these", intro: 'Libra. | hi, gorgeous.',
    items: [['boat', 'paddle boat | date idea', 'you love | a pretty date.'], ['bags', 'shopping bags | from Rice Village', "you couldn't | pick one shop."],
      ['bowl', 'pho or hot pot? | (still deciding)', 'you polled | the group. twice.'], [['ticket', 'FREE'], 'free museum | Thursday', 'art and free? | your love language.'],
      ['uturn', 'the Texas | U-turn (maybe)', 'you turned. | then un-turned.'], ['mirror', 'a mirror for | outfit votes', 'the group chat | is voting.']],
    done: 'balanced. | beautifully.', prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Libra essential.'], ask: 'no pressure. | but pick one.', endLine: 'Yes or yes, Libra?', endStars: ['libra', 'gemini', 'leo', 'pisces'] }),
  hst388: starterPack({ sign: 'scorpio', bg: 'bats', panel: '#3a1f5a', hook: "POV: you're a | Houston Scorpio | (starter pack)", intro: 'Scorpio. | I see you.',
    items: [['bat', 'Waugh bridge bats | at sunset', 'you love | a mysterious date.'], ['muralheart', 'a mural | nobody knows', "you won't say | where it is."],
      ['shirt', 'all black | in 90 degrees', "you're committed | to the look."], [['phone', 'seen', '5:02'], "'seen' | 5:02 PM", "you read it. | you're thinking."],
      ['bowl', 'late-night pho | alone. happily.', 'you love | your own company.'], ['candle', 'the quiet | chapel visit', 'you recharge | in silence.']],
    done: "deep. | that's the pack.", prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Scorpio essential.'], ask: "you'll comment | at 2am. fine.", endLine: 'Mysterious arrival. Jan 9.', endStars: ['scorpio', 'cancer', 'pisces', 'virgo'] }),
  hst389: starterPack({ sign: 'sagittarius', bg: 'beach', panel: '#c0602a', hook: 'Houston Sag | starter pack', intro: 'Sag! | where are we going?',
    items: [['bowl', 'six-stop crawl | on Bellaire', 'you plan dinner | by street.'], ['waves', 'Galveston | day trip', 'you said yes | before I finished.'],
      ['map', "'Houston is an | hour from Houston'", 'you drive | anywhere for food.'], ['truck', 'a food truck | finder', 'you know | where they park.'],
      ['passport', 'eat the world | on one street', "you've tried | everything. twice."], [['phone', "'in!", "where?'"], "'in! | where is it?'", "Jan 9? | you're already in."]],
    done: 'packed. | already gone.', prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Sag essential.'], ask: 'tell me | your next spot.', endLine: 'Next stop: Jan 9.', endStars: ['sagittarius', 'aries', 'gemini', 'aquarius'] }),
  hst390: starterPack({ sign: 'capricorn', bg: 'downtown', panel: '#2a3a4a', hook: 'Your Capricorn | starter pack: | Houston edition', intro: 'Capricorn. | right on time.',
    items: [[['cal', '2031', 'PLAN'], 'five-year plan | (laminated)', 'you plan | your plans.'], [['shield', '99'], 'Grand Parkway: | the third loop', 'you mapped | three routes.'],
      ['tunnel', 'downtown | tunnel lunch', 'cool air. | no sun. efficient.'], ['clock', 'leaves | two hours early', "'for traffic,' | you say."],
      ['hedge', 'perfect hedges | River Oaks energy', 'even your hedges | are on time.'], ['sheet', 'Jan 9 RSVP | in a spreadsheet', 'you RSVP\'d | with columns.']],
    done: 'efficient. | respected.', prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Capricorn essential.'], ask: 'be concise. | I have a meeting.', endLine: "Two hours early. We know.", endStars: ['capricorn', 'virgo', 'scorpio', 'taurus'] }),
  hst391: starterPack({ sign: 'aquarius', bg: 'clearlake', panel: '#1f6a7a', hook: "If you're a | Houston Aquarius, | you own these", intro: 'Aquarius. | you weirdo. (nice)',
    items: [['scope', 'a telescope | (city glow says no)', 'you look up | anyway.'], ['tree', 'The Woodlands | (Houston? kind of)', 'you live in | a nice bubble.'],
      ['orbit', 'a neighbor who | talks orbits', 'Clear Lake. | of course.'], ['vinyl', 'zydeco and | Tejano vinyl', 'your playlist | has range.'],
      ['jacket', 'Montrose | vintage jacket', 'you thrifted it | before it was cool.'], ['star', 'a surprise | entrance plan', "Jan 9? | you'll just appear."]],
    done: 'original. | obviously.', prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Aquarius essential.'], ask: 'surprise me. | in the comments.', endLine: 'Appear anywhere. Jan 9.', endStars: ['aquarius', 'gemini', 'sagittarius', 'libra'] }),
  hst392: starterPack({ sign: 'pisces', bg: 'sunset', panel: '#5a4ab0', hook: "POV: you're a | Houston Pisces | (starter pack)", intro: 'oh, Pisces. | come here.',
    items: [['tissues', 'tissues | (bayou sunset)', 'the sunset | got you.'], ['waves', 'Galveston: | still romantic', 'you think brown | water is dreamy.'],
      ['coat', 'a puffer for | the one cold day', 'you cried | when it ended.'], ['journal', 'a journal | full of crushes', 'you wrote | a bayou poem.'],
      ['cup', 'boba | for comfort', 'boba fixes | most things.'], ['heart', 'already crying | about Jan 9', "you're | already emotional."]],
    done: 'soft. | perfect.', prompt: ["WHAT'S MISSING?", 'Comment your Houston', 'Pisces essential.'], ask: "I'm not crying. | you're crying.", endLine: 'Happy tears only. Jan 9.', endStars: ['pisces', 'cancer', 'libra', 'taurus'] }),

  // ── which one are you? (hook templates: A "Which Houston X | are you?", B "You can only pick one: | X",
  //    C "Be honest: which | Houston X are you?", D "Pick your letter: | your X"; 3 each)
  hst393: whichOne({ bg: 'kitchen', host: 'leo', short: 'TACO', hook: 'Which Houston | breakfast taco | are you?', intro: 'pick yours. | be honest.',
    opts: [['taurus', 'FLOUR TORTILLA', ['tortilla', '#f4e1b0'], "you're soft. | warm. dependable.", "in love: | you're the safe place."],
      ['scorpio', 'CORN TORTILLA', ['tortilla', '#f2c75c'], "you're classic. | a little intense.", 'in love: | loyal for life.'],
      ['gemini', 'ONE OF EACH', 'taco', "you can't choose. | you shouldn't.", 'in love: | never boring.'],
      ['aries', 'EATEN IN | THE CAR', ['car', '#e05a3a'], "you're always | on the move.", 'in love: | first to say hi.']],
    recap: 'so... which taco | are you?', ask: 'no wrong answers. | mostly.', endLine: 'Tacos and stars. Jan 9.' }),
  hst394: whichOne({ bg: 'downtown', host: 'sagittarius', short: 'WEATHER', hook: 'Which Houston | weather day | are you?', intro: "what's your | forecast, babe?",
    opts: [['pisces', 'THE ONE | 55° DAY', 'coat', "you're rare. | everyone posts you.", 'in love: | unforgettable.'],
      ['leo', 'OCTOBER | (STILL SUMMER)', 'sun', "you're warm. | all year.", 'in love: | you go all in.'],
      ['virgo', 'OAK POLLEN | DAY', 'pollen', 'you leave a mark | on everyone.', 'in love: | you notice details.'],
      ['cancer', 'THE HUMID | DAY', 'drop', "you're a big | warm hug.", 'in love: | clingy, but cute.']],
    recap: 'so which day | are you?', ask: "I'm the humid one. | sorry.", endLine: 'Forecast: Jan 9. 100% fun.' }),
  hst395: whichOne({ bg: 'loopnight', host: 'gemini', short: 'LOOP', hook: 'Be honest: | which Houston loop | are you?', intro: 'inside? outside? | tell me.',
    opts: [['capricorn', 'INSIDE | THE 610', ['shield', '610'], "you're central. | everyone's halfway.", 'in love: | you want them close.'],
      ['sagittarius', 'BELTWAY 8', ['shield', '8'], "you're in the middle | of everything.", 'in love: | open to the drive.'],
      ['aquarius', 'GRAND PARKWAY | (THE THIRD LOOP)', 'loops', "you're | way out there.", 'in love: | you need space.'],
      ['libra', 'THE FEEDER | ROAD', 'feeder', "you're the | in-between.", 'in love: | you compromise.']],
    recap: 'which loop | is your heart?', plus: '+ your side of town', ask: "I'm all four. | it's a Gemini thing.", endLine: 'Every loop leads to Jan 9.' }),
  hst396: whichOne({ bg: 'lake', host: 'libra', short: 'FIRST DATE', hook: 'You can only | pick one: | Houston first date', intro: 'one date. | choose wisely.',
    opts: [['pisces', 'PADDLE BOATS | AT HERMANN PARK', 'boat', "you're a | romantic. obviously.", 'in love: | you want the movie scene.'],
      ['aries', 'BAYOU | TRAIL RUN', 'shoes', 'you date | at a jog.', 'in love: | active and honest.'],
      ['virgo', 'FREE MUSEUM | THURSDAY', ['ticket', 'FREE'], 'you like a plan | and a plaque.', 'in love: | curious about them.'],
      ['taurus', 'BELLAIRE | FOOD CRAWL', 'bowl', 'you date | with your stomach.', 'in love: | you show up with snacks.']],
    recap: 'so which date | is yours?', ask: "I'd pick all four. | I'm a Libra.", endLine: 'Or skip to Jan 9.' }),
  hst397: whichOne({ bg: 'freeway', host: 'scorpio', short: 'DRIVER', hook: 'Pick your letter: | your Houston | driving style', intro: "how do you drive? | I'm watching.",
    opts: [['virgo', 'SIGNAL ON | SINCE KIRBY', 'blinker', "you're | very clear.", 'in love: | no mixed signals.'],
      ['libra', 'TEXAS U-TURN | EXPERT', 'uturn', 'you change your mind | gracefully.', 'in love: | you come back around.'],
      ['sagittarius', 'FEEDER ROAD | FREE SPIRIT', 'feeder', 'you always | find a way.', 'in love: | adventurous.'],
      ['cancer', "'20 MINUTES | WITHOUT TRAFFIC'", 'clock', "you're | an optimist.", 'in love: | you believe in it.']],
    recap: 'which driver | are you?', ask: "I already know. | I'm a Scorpio.", endLine: 'Drive safe. See you Jan 9.' }),
  hst398: whichOne({ bg: 'kitchen', host: 'cancer', short: 'KOLACHE', hook: 'Be honest: | which kolache | person are you?', intro: 'the big debate. | your turn.',
    opts: [['taurus', 'SWEET KOLACHE | ONLY', 'kolache', "you're | a classic.", 'in love: | sweet and steady.'],
      ['aries', 'THE SAUSAGE | ONE', 'klob', "you're | savory and bold.", 'in love: | you say what you mean.'],
      ['virgo', "'IT'S A KLOBASNEK, | ACTUALLY'", 'clipboard', 'you correct | so gently.', 'in love: | you love the details.'],
      ['gemini', 'ONE OF EACH', ['kolache'], 'you want | the whole box.', 'in love: | you contain multitudes.']],
    recap: 'so... which one | are you?', ask: "I brought | a dozen. share.", endLine: 'Bring kolaches. Jan 9.' }),
  hst399: whichOne({ bg: 'night', host: 'aquarius', short: 'GROUP CHAT', hook: 'Which Houston | group chat member | are you?', intro: 'every chat | has all four.',
    opts: [['capricorn', 'THE PLANNER', 'sheet', 'you made | a spreadsheet.', 'in love: | you plan the dates.'],
      ['cancer', "'OMW' | FROM KATY", ['car', '#7a5ab0'], "you're coming. | eventually.", 'in love: | you always show up.'],
      ['taurus', 'SENDS | 40 FOOD PICS', 'camera', 'you post | every plate.', 'in love: | you feed people.'],
      ['scorpio', 'READ AT | 5:02 PM', ['phone', 'seen'], "you saw it. | you're thinking.", 'in love: | slow to open up.']],
    recap: 'which one | are YOU?', ask: 'tag the planner. | they know.', endLine: 'Group chat, assemble. Jan 9.' }),
  hst400: whichOne({ bg: 'patio', host: 'pisces', short: 'BRUNCH', hook: 'You can only | pick one: | Houston brunch', intro: 'brunch | reveals all.',
    opts: [['leo', 'OUTFIT PLANNED | ON TUESDAY', 'dress', 'you dress | for the moment.', 'in love: | you make it special.'],
      ['taurus', 'HAPPY TO WAIT | TWO HOURS', 'clock', "you're | so patient.", 'in love: | you take it slow.'],
      ['gemini', 'PHOTO | BEFORE FOOD', 'camera', 'you document | everything.', 'in love: | you share the moment.'],
      ['cancer', 'ORDERS FOR | THE TABLE', 'taco', 'you take | care of everyone.', 'in love: | the provider.']],
    recap: 'which brunch | person are you?', ask: "I'm crying at | the menu. normal.", endLine: 'Dress up. Jan 9.' }),
  hst401: whichOne({ bg: 'beach', host: 'virgo', short: 'WEEKEND', hook: 'Be honest: | which Houston | weekend are you?', intro: "it's Saturday. | where are you?",
    opts: [['sagittarius', 'GALVESTON | DAY TRIP', 'waves', "you're | always going.", 'in love: | the road trip partner.'],
      ['aries', 'RUN CLUB + | PICKLEBALL', 'paddle', "you're booked | and active.", 'in love: | run-club meet-cute.'],
      ['scorpio', 'QUIET CHAPEL | + MUSEUM', 'candle', 'you recharge | alone.', 'in love: | deep talks only.'],
      ['gemini', 'KARAOKE | ON BELLAIRE', 'mic', "you're | the duet.", 'in love: | you sing it to them.']],
    recap: 'which weekend | is yours?', ask: 'I made a | color-coded plan.', endLine: 'Weekend plans: Jan 9.' }),
  hst402: whichOne({ bg: 'neon', host: 'aries', short: 'ARRIVAL', hook: 'Pick your letter: | your Jan 9 arrival', intro: "party's Jan 9. | how do you arrive?",
    opts: [['capricorn', 'TWO HOURS | EARLY', 'clock', "you're | never late.", 'in love: | always there.'],
      ['leo', 'FASHIONABLY | LATE', 'shades', "you're | the entrance.", 'in love: | all eyes on you.'],
      ['cancer', 'BRINGS THE | KATY COUSIN', ['car', '#7a5ab0'], 'you bring | your people.', 'in love: | family first.'],
      ['aquarius', 'SURPRISE | ENTRANCE', 'door', "you're | unpredictable.", 'in love: | full of surprises.']],
    recap: 'which one | is you?', ask: "I'm already | outside.", endLine: 'However you arrive: Jan 9.' }),
  hst403: whichOne({ bg: 'mural', host: 'taurus', short: 'SWEET TREAT', hook: 'You can only | pick one: | Houston sweet treat', intro: 'dessert first. | always.',
    opts: [['pisces', 'RAINBOW | RASPA', 'raspa', "you're | colorful and sweet.", 'in love: | a total softie.'],
      ['leo', 'MANGONADA', 'mango', "you're sweet | AND spicy.", 'in love: | you keep it exciting.'],
      ['libra', 'BOBA | (HALF SWEET)', 'boba', "you're | balanced.", 'in love: | just the right amount.'],
      ['cancer', "KING CAKE | (IT'S JANUARY)", 'kingcake', "you're | the tradition.", 'in love: | you make it a ritual.']],
    recap: 'which treat | are you?', ask: 'I want all four. | obviously.', endLine: 'Sweet plans: Jan 9.' }),
  hst404: whichOne({ bg: 'lights', host: 'sagittarius', short: 'CRAWFISH', hook: 'Pick your letter: | your crawfish | eating style', intro: "season's starting. | how do you eat?",
    opts: [['aries', 'EXTRA SPICY | VIET-CAJUN', 'crawfish', 'you like it | hot.', 'in love: | passionate.'],
      ['cancer', 'PEELS FOR | EVERYONE', 'heart', 'you take | care of us.', 'in love: | acts of service.'],
      ['capricorn', 'WAITS FOR MARCH | (BIGGER ONES)', ['cal', 'MARCH', 'SOON'], "you're | patient.", 'in love: | worth the wait.'],
      ['taurus', 'HERE FOR THE | CORN + POTATOES', 'corn', 'you know | the best part.', 'in love: | low-key loyal.']],
    recap: 'which one | are you?', ask: "I'm bringing | the newspaper.", endLine: 'Bibs optional. Jan 9.' }),
}
