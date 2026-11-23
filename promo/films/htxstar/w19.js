// Houston Star Talk · worker w19 (hst453–hst476): shared props and helpers for the traffic and weather skits.
// Scripts: w19-traffic.js (hst453–hst464) and w19-weather.js (hst465–hst476). Engine: starrace/ep.js makeEpisode.
// Pure functions of t (no document at module level). Generic shapes only: no brands, teams, agencies or event marks.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt } from '../starrace/ep.js'
import { label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, SKYB, MINT } from '../signs3kit.js'
import { skyline, car, freeway, shield, heatSun, partyCard, BRAKE, HGREEN, overheadSign, streetSign } from './kit.js'

export { FLOOR, box, txt, label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, SKYB, MINT, skyline, car, freeway, shield, heatSun, partyCard, BRAKE, HGREEN, overheadSign, streetSign, clamp, prog, ease }

export const Y = 1255
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
export const LANE1 = FLOOR - 20, LANE2 = FLOOR + 210

// colour sets: each episode picks its own
export const PAL = {
  noon: { top: '#7cc6f0', bot: '#f6e7b8', city: '#3a4f7a', ground: '#8a7a5a' },
  dusk: { top: '#3a2a6a', bot: '#ff9a6a', city: '#2a1d52', ground: '#3a2a4a' },
  night: { top: '#0b0a22', bot: '#2a1d52', city: '#2a2160', ground: '#221b38' },
  dawn: { top: '#2a3a7a', bot: '#ffc7a0', city: '#2f2f5a', ground: '#3d3550' },
  haze: { top: '#c9d6d0', bot: '#f4e6c2', city: '#7a8a9a', ground: '#9a8a6a' },
  mint: { top: '#1d4a5a', bot: '#7fd6c0', city: '#1a3340', ground: '#2a3a40' },
  rose: { top: '#5a2a5a', bot: '#ff8fb1', city: '#3a1a40', ground: '#3a2038' },
  gold: { top: '#ffb347', bot: '#ffe9a8', city: '#7a4a2a', ground: '#a07a4a' },
  grey: { top: '#8a94a8', bot: '#d6dbe4', city: '#4a5068', ground: '#6a6e7a' },
  teal: { top: '#0f3a4a', bot: '#3fb8b0', city: '#0c2a36', ground: '#1c3a44' },
  plum: { top: '#2a0f3a', bot: '#c05a9a', city: '#200a2a', ground: '#2a1430' },
  lime: { top: '#5ab0e0', bot: '#e8f0a0', city: '#3a5a4a', ground: '#7a8a4a' },
}

export function sky(x, p) { const g = x.createLinearGradient(0, 0, 0, FLOOR + 60); g.addColorStop(0, p.top); g.addColorStop(1, p.bot); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920) }
export function ground(x, p, y = FLOOR + 60) { x.fillStyle = p.ground; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = INK; x.fillRect(0, y - 6, 1080, 10) }

/** the freeway set: sky, skyline, three lanes (scrolling), an optional shield and an overhead sign */
export function road(x, t, p, { num = null, scroll = 0, sign = null, sub = null, sun = false, city = true } = {}) {
  sky(x, p); if (sun) heatSun(x, 870, 420, t, 70)
  if (city) skyline(x, FLOOR - 150, t, { col: p.city, alpha: 0.95 })
  freeway(x, FLOOR - 160, 600, 3, scroll); x.fillStyle = p.ground; x.fillRect(0, FLOOR + 440, 1080, 480)
  if (num) shield(x, 900, 700, num, 0.8)
  if (sign) overheadSign(x, 540, 810, sign, sub, 1)
}
/** car lanes (car centre y); a star riding in a car sits 115 px above it at size 190 */
export const CA = 1330, CB = 1560, SEAT = 115
/** draw a convertible under a star wherever it is right now (call in front) */
export function rideP(x, P, id, col, t, { brake = 0, flip = false, bump = 0 } = {}) { const [cx, cy, s] = P.at(id); if (s <= 0) return; car(x, cx, cy + SEAT * s / 190 - bump, col, { open: true, brake, flip, s: s / 190 }) }
/** a jam of cars behind the action: brake lights pulse */
export function jam(x, t, lane, cols, { off = 0, s = 0.8, speed = 0 } = {}) {
  cols.forEach((c, i) => { const cx = ((i * 290 + off + t * speed) % 1450) - 180; car(x, cx, lane, c, { brake: 0.6 + 0.4 * Math.sin(t * 3 + i), s }) })
}
/** a car dashboard + steering wheel across the bottom (the driver star sits behind it) */
export function dash(x, t, p, { scroll = 0, wipe = false } = {}) {
  sky(x, p); skyline(x, 900, t, { col: p.city, alpha: 0.9 })
  x.fillStyle = '#2a2638'; x.beginPath(); x.moveTo(0, 1100); x.lineTo(380, 900); x.lineTo(700, 900); x.lineTo(1080, 1100); x.fill()
  for (let k = 0; k < 6; k++) { const ph = ((k / 6) + scroll * 0.002) % 1, y = 900 + ph * ph * 200, w = 6 + ph * 18; x.fillStyle = BONE; x.fillRect(540 - w / 2, y, w, 6 + ph * 20) }
  box(x, 0, 0, 1080, 60, INK, 0); box(x, 0, 0, 40, 1920, INK, 0); box(x, 1040, 0, 40, 1920, INK, 0)   // windshield frame
}
export function dashFront(x, t, { mirror = null } = {}) {
  box(x, 0, 1330, 1080, 600, '#2e2a3c', 0); x.fillStyle = INK; x.fillRect(0, 1322, 1080, 12)
  x.lineWidth = 34; x.strokeStyle = INK; x.beginPath(); x.arc(360, 1420, 150, Math.PI * 1.05, Math.PI * 1.95); x.stroke(); x.lineWidth = 20; x.strokeStyle = '#4a4560'; x.stroke()
  box(x, 640, 1390, 260, 120, '#141024', 6); txt(x, mirror || '♪ ♪', 770, 1450, { size: 36, col: MINT, font: MONO, weight: 700 })
}
/** a phone held up: a map with a route and a big ETA */
export function gps(x, cx, cy, eta, t, { k = 1, col = BRAKE, note = 'ETA' } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -170, -290, 340, 580, INK, 0); box(x, -150, -260, 300, 520, '#dfe8d8', 0)
  x.strokeStyle = '#b8c4b0'; x.lineWidth = 14; for (const yy of [-180, -40, 100]) { x.beginPath(); x.moveTo(-150, yy); x.lineTo(150, yy + 30); x.stroke() }
  x.strokeStyle = col; x.lineWidth = 12; x.beginPath(); x.moveTo(-100, 200); x.lineTo(-60, 60); x.lineTo(40, 20); x.lineTo(80, -150); x.stroke()
  x.fillStyle = col; x.beginPath(); x.arc(80, -150, 16, 0, Math.PI * 2); x.fill()
  box(x, -150, 150, 300, 110, '#141024', 0); txt(x, note, -90, 205, { size: 26, col: BONE, font: MONO, weight: 700 }); txt(x, eta, 40, 205, { size: eta.length > 6 ? 40 : 54, col })
  x.restore()
}
/** a phone with chat bubbles (generic, no app UI): msgs = [[side 'l'|'r', text, shownAt]] */
export function chat(x, cx, cy, lt, msgs, { k = 1, title = '' } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const H = 120 + msgs.length * 84 + (title ? 40 : 0), top = -H / 2
  box(x, -250, top - 20, 500, H + 40, INK, 0); box(x, -230, top, 460, H, '#f4efe4', 0)
  if (title) txt(x, title, 0, top + 34, { size: 28, col: INK, font: MONO, weight: 700 })
  let y = top + (title ? 100 : 70)
  for (const [side, s, at] of msgs) {
    if (lt < at) continue
    const kk = clamp(ease.outBack(prog(lt, at, at + 0.25)))
    x.font = `800 36px ${INTER}`; const w = Math.min(420, x.measureText(s).width + 44), l = side === 'r' ? 210 - w : -210
    x.save(); x.globalAlpha = clamp(kk); box(x, l, y - 32, w, 64, side === 'r' ? '#5ec8ff' : '#e0d6f0', 4); txt(x, s, l + w / 2, y, { size: 36, col: INK }); x.restore()
    y += 84
  }
  x.restore()
}
/** a railroad crossing: the arm and a passing train */
export function train(x, t, lt, { base = FLOOR + 40 } = {}) {
  for (let k = 0; k < 6; k++) { const cx = ((k * 330 - lt * 260) % 1980 + 1980) % 1980 - 300; box(x, cx, base - 330, 310, 250, ['#6a4a8a', '#4a6a8a', '#8a5a3a'][k % 3], 7); for (let w = 0; w < 3; w++) box(x, cx + 30 + w * 90, base - 300, 60, 50, '#bfe6ff', 3); for (const wx of [50, 260]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + wx, base - 70, 24, 0, Math.PI * 2); x.fill() } }
  box(x, 90, base - 600, 22, 600, '#8f96a0', 5); const on = Math.floor(lt * 3) % 2
  for (const [dx, o] of [[-40, on], [40, 1 - on]]) { x.fillStyle = INK; x.beginPath(); x.arc(101 + dx, base - 560, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = o ? BRAKE : '#5a2028'; x.beginPath(); x.arc(101 + dx, base - 560, 22, 0, Math.PI * 2); x.fill() }
  for (let k = 0; k < 6; k++) box(x, 112 + k * 90, base - 470, 90, 26, k % 2 ? BONE : BRAKE, 4)
}
export function roadWork(x, t, base = FLOOR + 40) {
  for (let k = 0; k < 6; k++) { const cx = 100 + k * 175; x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 40, base); x.lineTo(cx, base - 110); x.lineTo(cx + 40, base); x.fill(); x.fillStyle = '#ff7a2a'; x.beginPath(); x.moveTo(cx - 32, base - 4); x.lineTo(cx, base - 100); x.lineTo(cx + 32, base - 4); x.fill(); x.fillStyle = BONE; x.fillRect(cx - 18, base - 60, 36, 12) }
  x.save(); x.translate(840, base - 470); x.rotate(Math.PI / 4); box(x, -110, -110, 220, 220, '#ff9a2a', 8); x.restore(); txt(x, 'ROAD', 840, base - 495, { size: 44, col: INK }); txt(x, 'WORK', 840, base - 445, { size: 44, col: INK })
  if (Math.floor(t * 2) % 2) { x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(840, base - 640, 18, 0, Math.PI * 2); x.fill() }
}
export function parkingLot(x, t, p, { trees = [] } = {}) {
  sky(x, p); skyline(x, 980, t, { col: p.city, alpha: 0.7 }); x.fillStyle = '#4a4656'; x.fillRect(0, 980, 1080, 940)
  for (let k = 0; k < 7; k++) { x.fillStyle = BONE; x.fillRect(40 + k * 160, 1400, 10, 260) }
  for (const cx of trees) tree(x, cx, 1400)
}
export function tree(x, cx, base, { shade = true, s = 1, col = '#3f8a4a', pollen = 0 } = {}) {
  if (shade) { x.fillStyle = 'rgba(10,8,20,0.35)'; x.beginPath(); x.ellipse(cx, base + 40, 260 * s, 70 * s, 0, 0, Math.PI * 2); x.fill() }
  box(x, cx - 22 * s, base - 300 * s, 44 * s, 300 * s, '#6b4a2a', 5)
  for (const [dx, dy, r] of [[0, -400, 150], [-120, -330, 110], [120, -330, 110], [0, -280, 120]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s, base + dy * s, (r + 7) * s, 0, Math.PI * 2); x.fill() }
  for (const [dx, dy, r] of [[0, -400, 150], [-120, -330, 110], [120, -330, 110], [0, -280, 120]]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx * s, base + dy * s, r * s, 0, Math.PI * 2); x.fill() }
  if (pollen > 0) for (let k = 0; k < 18; k++) { x.fillStyle = `rgba(240,210,60,${(0.8 * pollen).toFixed(2)})`; x.fillRect(cx - 200 * s + (k * 97) % (400 * s), base - 480 * s + (k * 53) % (300 * s), 10, 10) }
}
/** drifting yellow pollen dust across the frame */
export function pollen(x, t, a = 1) { for (let k = 0; k < 60; k++) { const px = (k * 173 + t * (40 + k % 5 * 12)) % 1100 - 10, py = (k * 89 + t * 30 + Math.sin(t + k) * 40) % 1500 + 300; x.fillStyle = `rgba(240,210,60,${(a * (0.4 + 0.5 * ((k * 7) % 3) / 2)).toFixed(2)})`; x.fillRect(px, py, 8, 8) } }
/** heat wobble lines */
export function wavy(x, t, top = 900, h = 500, a = 0.2) { for (let k = 0; k < 12; k++) { const y = top + (k * 61) % h; x.strokeStyle = `rgba(255,240,200,${a})`; x.lineWidth = 4; x.beginPath(); x.moveTo(0, y); for (let xx = 0; xx <= 1080; xx += 60) x.lineTo(xx, y + Math.sin(xx * 0.03 + t * 6 + k) * 10); x.stroke() } }
/** pixel mosquitoes buzzing around (cx, cy) */
export function mosquitoes(x, t, cx, cy, n = 6, R = 200) {
  for (let k = 0; k < n; k++) { const a = t * (2.2 + k * 0.3) + k * 2.1, px = cx + Math.cos(a) * R * (0.6 + 0.4 * Math.sin(k)), py = cy + Math.sin(a * 1.3) * R * 0.6
    x.fillStyle = INK; x.fillRect(px - 10, py - 4, 20, 8); x.fillRect(px + 10, py - 2, 14, 3); x.fillStyle = `rgba(220,230,255,${(0.5 + 0.4 * Math.sin(t * 40 + k)).toFixed(2)})`; x.fillRect(px - 8, py - 16, 8, 12); x.fillRect(px + 2, py - 16, 8, 12) }
}
/** love bugs: little black pairs flying joined (clean, cute) */
export function loveBugs(x, t, cx, cy, n = 5, R = 220) {
  for (let k = 0; k < n; k++) { const a = t * (1.2 + k * 0.2) + k * 1.7, px = cx + Math.cos(a) * R * (0.5 + 0.5 * ((k * 3) % 5) / 4), py = cy + Math.sin(a * 0.8) * R * 0.5
    for (const d of [-14, 14]) { x.fillStyle = INK; x.fillRect(px + d - 9, py - 5, 18, 10); x.fillStyle = '#ff5a3a'; x.fillRect(px + d - (d < 0 ? 12 : -6), py - 4, 6, 8) }
    x.fillStyle = 'rgba(220,230,255,0.6)'; x.fillRect(px - 20, py - 16, 12, 9); x.fillRect(px + 8, py - 16, 12, 9) }
}
/** big thermometer reading (a joke number) */
export function thermo(x, cx, cy, deg, { k = 1, hot = true } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -34, -200, 68, 340, BONE, 7); x.fillStyle = INK; x.beginPath(); x.arc(0, 170, 62, 0, Math.PI * 2); x.fill()
  x.fillStyle = hot ? BRAKE : '#5ec8ff'; x.beginPath(); x.arc(0, 170, 52, 0, Math.PI * 2); x.fill(); x.fillRect(-16, (hot ? -170 : 40), 32, (hot ? 330 : 120))
  txt(x, deg, 0, -250, { size: 78, col: hot ? BRAKE : '#5ec8ff' })
  x.restore()
}
/** a weather app on a phone: rows [[time, icon 'sun'|'cloud'|'rain'|'cold', deg]] */
export function forecastPhone(x, cx, cy, rows, lt, { k = 1, title = 'HOUSTON' } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -230, -330, 460, 660, INK, 0); const g = x.createLinearGradient(0, -310, 0, 310); g.addColorStop(0, '#3a6ab0'); g.addColorStop(1, '#8ac0f0'); x.fillStyle = g; x.fillRect(-210, -310, 420, 620)
  txt(x, title, 0, -260, { size: 34, col: BONE, font: MONO, weight: 700 })
  rows.forEach(([tm, ic, deg], i) => { const y = -170 + i * 120, kk = clamp(ease.outBack(prog(lt, 0.2 + i * 0.35, 0.45 + i * 0.35))); if (kk <= 0) return
    x.save(); x.globalAlpha = clamp(kk); txt(x, tm, -130, y, { size: 32, col: BONE, font: MONO, weight: 700 }); icon(x, 0, y, ic); txt(x, deg, 130, y, { size: 46, col: BONE }); x.restore() })
  x.restore()
}
export function icon(x, cx, cy, ic) {
  if (ic === 'sun') { x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(cx, cy, 30, 0, Math.PI * 2); x.fill() }
  if (ic === 'cloud' || ic === 'rain' || ic === 'cold') { x.fillStyle = ic === 'cold' ? '#bfe6ff' : BONE; for (const [dx, r] of [[-20, 22], [8, 28], [32, 18]]) { x.beginPath(); x.arc(cx + dx, cy, r, 0, Math.PI * 2); x.fill() } x.fillRect(cx - 40, cy, 80, 20) }
  if (ic === 'rain') { x.fillStyle = '#5ec8ff'; for (const dx of [-24, 0, 24]) x.fillRect(cx + dx, cy + 26, 6, 18) }
  if (ic === 'cold') { x.fillStyle = BONE; txt(x, '*', cx + 34, cy + 30, { size: 40, col: BONE }) }
}
/** an office with an arctic AC vent (blowing lines, a few snowflakes) */
export function office(x, t, { snow = 1, wall = '#c9d6e8' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#8a9ab8'; x.fillRect(0, FLOOR + 60, 1080, 860); x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 10)
  box(x, 330, 640, 420, 70, '#e8eef6', 6); for (let k = 0; k < 6; k++) { x.fillStyle = '#8a9ab8'; x.fillRect(350 + k * 66, 656, 44, 38) }
  for (let k = 0; k < 8; k++) { const ph = (t * 0.9 + k / 8) % 1; x.strokeStyle = `rgba(255,255,255,${(0.8 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(360 + k * 50, 720 + ph * 300); x.lineTo(360 + k * 50 + Math.sin(t * 3 + k) * 20, 760 + ph * 300); x.stroke() }
  for (let k = 0; k < 24 * snow; k++) { const px = (k * 131 + Math.sin(t + k) * 30) % 1080, py = (k * 97 + t * 80) % 900 + 720; x.fillStyle = 'rgba(255,255,255,0.85)'; x.fillRect(px, py, 10, 10) }
  box(x, 60, 380, 200, 140, '#2a3550', 6); txt(x, '64°', 160, 450, { size: 64, col: '#5ec8ff', font: MONO, weight: 700 })
}
/** a patio at dusk with string lights */
export function patio(x, t, p) {
  sky(x, p); skyline(x, FLOOR - 40, t, { col: p.city, alpha: 0.8 }); ground(x, p, FLOOR + 60)
  for (let k = 0; k < 2; k++) { x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 520 + k * 120); x.quadraticCurveTo(540, 640 + k * 120, 1080, 520 + k * 120); x.stroke()
    for (let b = 0; b < 10; b++) { const u = b / 9, bx = u * 1080, by = (1 - u) * (1 - u) * (520 + k * 120) + 2 * u * (1 - u) * (640 + k * 120) + u * u * (520 + k * 120); x.fillStyle = Math.sin(t * 2 + b + k) > -0.6 ? '#ffd36b' : '#a08040'; x.beginPath(); x.arc(bx, by + 14, 11, 0, Math.PI * 2); x.fill() } }
}
/** bayou trail: water, a path, trees, the skyline */
export function bayou(x, t, p) {
  sky(x, p); skyline(x, 1000, t, { col: p.city, alpha: 0.8 })
  x.fillStyle = '#3a6a5a'; x.fillRect(0, 1000, 1080, 920)
  x.fillStyle = '#4a6a7a'; x.fillRect(0, 1060, 1080, 150); for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(((k * 130 + t * 30) % 1180) - 100, 1090 + (k % 3) * 40, 60, 5) }
  x.fillStyle = '#b8a888'; x.fillRect(0, 1380, 1080, 120)
}
/** an oak-pollen-covered car with a finger-written message (k = how much of the message shows) */
export function pollenCar(x, cx, cy, msg, k = 0, { col = '#5ec8ff', s = 1, layer = 1 } = {}) {
  car(x, cx, cy, col, { s })
  x.save(); x.translate(cx, cy); x.scale(s, s); x.globalAlpha = 0.85 * layer; x.fillStyle = '#e8cf3a'
  x.fillRect(-120, -40, 240, 26); x.fillRect(-70, -86, 130, 18); for (let q = 0; q < 30; q++) x.fillRect(-116 + (q * 37) % 230, -36 + (q * 13) % 50, 8, 8)
  x.restore()
  if (k > 0 && msg) { x.save(); x.font = `800 ${46 * s}px ${INTER}`; const n = Math.round(msg.length * clamp(k)); txt(x, msg.slice(0, n), cx, cy - 26 * s, { size: 38 * s, col: '#5a4a10' }); x.restore() }
}
/** round glasses on a star; fog 0..1 */
export function glasses(x, P, id, fog = 0) {
  const [cx, cy, s] = P.at(id), r = s * 0.13, ey = cy - s * 0.08
  for (const d of [-1, 1]) { x.fillStyle = `rgba(240,244,250,${(0.15 + 0.8 * fog).toFixed(2)})`; x.beginPath(); x.arc(cx + d * s * 0.17, ey, r, 0, Math.PI * 2); x.fill(); x.strokeStyle = INK; x.lineWidth = 7; x.stroke() }
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(cx - s * 0.04, ey); x.lineTo(cx + s * 0.04, ey); x.stroke()
}
/** a coat/scarf layer count on a star (layers 0..4) */
export function layers(x, P, id, n, cols = ['#e05a3a', '#2b5fb0', '#f2c75c', '#7dbf5a']) {
  const [cx, cy, s] = P.at(id)
  for (let k = 0; k < Math.min(4, n); k++) box(x, cx - s * (0.34 + k * 0.03), cy + s * (0.04 + k * 0.09), s * (0.68 + k * 0.06), s * 0.1, cols[k], 4)
  if (n >= 3) { box(x, cx - s * 0.3, cy - s * 0.62, s * 0.6, s * 0.16, cols[1], 4); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy - s * 0.66, s * 0.07, 0, Math.PI * 2); x.fill() }
}
/** sunglasses on a star */
export function shades(x, P, id) { const [cx, cy, s] = P.at(id), ey = cy - s * 0.08; x.fillStyle = INK; x.fillRect(cx - s * 0.32, ey - s * 0.07, s * 0.28, s * 0.14); x.fillRect(cx + s * 0.04, ey - s * 0.07, s * 0.28, s * 0.14); x.fillRect(cx - s * 0.06, ey - s * 0.03, s * 0.12, s * 0.04) }
/** a bowl of soup with steam */
export function bowl(x, cx, cy, t, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 106, 0, Math.PI); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 98, 0, Math.PI); x.fill(); box(x, -110, -14, 220, 20, '#c98e4a', 5)
  for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k / 3) % 1; x.strokeStyle = `rgba(255,255,255,${(0.7 * (1 - ph)).toFixed(2)})`; x.lineWidth = 7; x.beginPath(); x.moveTo(-40 + k * 40, -30 - ph * 120); x.quadraticCurveTo(-20 + k * 40, -70 - ph * 120, -40 + k * 40, -110 - ph * 120); x.stroke() }
  x.restore()
}
/** a sun shade in a windshield */
export function sunShade(x, cx, cy, k = 1) { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, 1); box(x, -200, -60, 400, 120, '#d8dce4', 6); for (let q = -180; q < 200; q += 40) { x.fillStyle = '#aab0bc'; x.fillRect(q, -60, 6, 120) } x.restore() }
/** ★ LESSON UNLOCKED: a gold label plus the lesson line, centred at y */
export function lesson(x, t, lt, text, at = 0.2, y = 560) {
  const k = pop01(t, t - lt + at, 0.35, 1.8); if (k <= 0) return
  label(x, 540, y, '★ LESSON UNLOCKED', k, { size: 44, bg: GOLD, rot: -0.03 })
  const lk = clamp((lt - at - 0.4) / 0.3); if (lk <= 0) return
  const [a, b] = text.split(' | '); x.save(); x.globalAlpha = lk; x.fillStyle = 'rgba(8,5,22,0.72)'; x.fillRect(90, y + 60, 900, b ? 170 : 105); txt(x, a, 540, y + 110, { size: 60, col: BONE, font: SERIF, weight: 500, italic: true }); if (b) txt(x, b, 540, y + 178, { size: 60, col: BONE, font: SERIF, weight: 500, italic: true }); x.restore()
}
/** a dark panel behind big text, for readability on bright skies */
export function plate(x, y, h = 200, a = 0.7) { x.fillStyle = `rgba(8,5,22,${a})`; x.fillRect(40, y - h / 2, 1000, h) }
export function bigText(x, lt, lines, { y = 700, at = 0.1, col = GOLD, size = 96, sub = BONE } = {}) {
  const k = Kp(lt, at, 0.35); if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); lines.forEach((s, i) => txt(x, s, 540, y + i * (size * 1.05), { size: i ? size * 0.7 : size, col: i ? sub : col })); x.restore()
}
/** a time stamp chip (top-right) */
export function stamp(x, s, col = BONE) { x.font = `700 40px ${MONO}`; const w = x.measureText(s).width + 50; box(x, 1020 - w, 250, w, 80, 'rgba(8,5,22,0.85)', 0); txt(x, s, 1020 - w / 2, 290, { size: 40, col, font: MONO, weight: 700 }) }

/** wrap a skit spec with the house defaults (badge, sting, party ticket) */
export function skit(spec) {
  return { badge: BADGE, cues: [...STING, ...(spec.cues || [])], endLen: 6.2, ...spec, end: (x, t, lt) => partyCard(x, t, lt, { line: spec.close, stars: spec.endStars }) }
}
