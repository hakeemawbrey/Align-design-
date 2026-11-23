// Houston Star Talk kit: props for the Houston beta / Jan 9 beta-party series (pixel style, flat fills, ink outlines).
// Generic shapes only: no team, brand, agency or event marks (see promo/films/HOUSTON.md). Used with starrace/ep.js.
import { clamp, ease, prog } from '../../src/lib.js'
import { label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB } from '../signs3kit.js'
import { box, txt, FLOOR } from '../starrace/ep.js'

export const HGREEN = '#1f7a4a'          // street-sign green
export const BRAKE = '#ff3a4e'

/** a green street-name sign on a pole (Houston-style blade sign) */
export function streetSign(x, cx, cy, text, { k = 1, pole = true, w = null, sub = null } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 54px ${INTER}`; const tw = w ?? Math.max(300, x.measureText(text).width + 70)
  if (pole) box(x, -10, 40, 20, 520, '#8f96a0', 5)
  box(x, -tw / 2, -46, tw, 92, HGREEN, 7)
  x.strokeStyle = '#e8f1ea'; x.lineWidth = 4; x.strokeRect(-tw / 2 + 9, -37, tw - 18, 74)
  txt(x, text, 0, 2, { size: 54, col: '#f4fbf6' })
  if (sub) { box(x, -tw / 2 + 30, 52, tw - 60, 44, '#14532f', 4); txt(x, sub, 0, 75, { size: 26, col: '#dff0e4', font: MONO, weight: 700 }) }
  x.restore()
}
/** a plain freeway shield with a number (generic shape, no agency marks) */
export function shield(x, cx, cy, num, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const path = () => { x.beginPath(); x.moveTo(-70, -78); x.quadraticCurveTo(0, -96, 70, -78); x.quadraticCurveTo(84, 10, 0, 92); x.quadraticCurveTo(-84, 10, -70, -78); x.closePath() }
  x.fillStyle = INK; x.save(); x.scale(1.12, 1.1); path(); x.fill(); x.restore()
  x.fillStyle = BONE; path(); x.fill(); x.fillStyle = '#2b5fb0'; x.save(); x.scale(0.84, 0.84); path(); x.fill(); x.restore()
  txt(x, num, 0, 4, { size: num.length > 2 ? 58 : 70, col: BONE })
  x.restore()
}
/** a generic downtown skyline silhouette along a baseline */
export function skyline(x, base, t, { col = '#1a1338', lit = '#ffd36b', alpha = 1 } = {}) {
  const T = [[60, 120, 380], [190, 90, 520], [290, 140, 640], [440, 110, 760], [560, 150, 600], [720, 100, 820], [830, 130, 540], [960, 110, 420]]
  x.save(); x.globalAlpha = alpha
  for (const [l, w, h] of T) {
    x.fillStyle = INK; x.fillRect(l - 5, base - h - 5, w + 10, h + 5)
    x.fillStyle = col; x.fillRect(l, base - h, w, h)
    for (let wy = base - h + 24; wy < base - 20; wy += 34) for (let wx = l + 14; wx < l + w - 14; wx += 26) {
      if (((wx * 7 + wy * 3) >> 3) % 3) continue
      const on = Math.sin(t * 0.7 + wx * 0.1 + wy) > -0.3; x.fillStyle = on ? lit : '#2a2250'; x.fillRect(wx, wy, 12, 16)
    }
  }
  x.fillStyle = INK; x.fillRect(720 + 45, base - 900, 10, 90); x.fillStyle = BRAKE; x.fillRect(720 + 43, base - 910, 14, 12)   // a spire light
  x.restore()
}
/** a side-view pixel car (facing right); brake lights glow when braking */
export function car(x, cx, cy, col, { brake = 0, s = 1, flip = false, open = false } = {}) {
  x.save(); x.translate(cx, cy); x.scale(flip ? -s : s, s)
  box(x, -120, -40, 240, 60, col, 6)
  if (open) { x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(40, -40); x.lineTo(70, -84); x.stroke(); x.strokeStyle = '#bfe6ff'; x.lineWidth = 4; x.stroke() }   // a convertible: the star sits in it
  else { box(x, -70, -86, 130, 50, col, 6); x.fillStyle = '#bfe6ff'; x.fillRect(-60, -78, 52, 34); x.fillRect(2, -78, 50, 34) }
  for (const wx of [-72, 72]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, 22, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(wx, 22, 13, 0, Math.PI * 2); x.fill() }
  x.fillStyle = brake > 0 ? BRAKE : '#7a2a33'; x.fillRect(-126, -32, 14, 22)
  if (brake > 0) { x.save(); x.globalAlpha = 0.45 * brake; x.fillStyle = BRAKE; x.beginPath(); x.arc(-140, -21, 46, 0, Math.PI * 2); x.fill(); x.restore() }
  x.fillStyle = '#fff3c4'; x.fillRect(112, -30, 12, 16)
  x.restore()
}
/** freeway: dark lanes with dashed lines; scroll = dash offset */
export function freeway(x, top, h, lanes, scroll = 0) {
  x.fillStyle = '#2a2638'; x.fillRect(0, top, 1080, h)
  x.fillStyle = '#f2c75c'; x.fillRect(0, top + 8, 1080, 8); x.fillRect(0, top + h - 16, 1080, 8)
  for (let k = 1; k < lanes; k++) { const y = top + (h / lanes) * k; for (let d = -((scroll % 120) + 120); d < 1080; d += 120) { x.fillStyle = BONE; x.fillRect(d, y - 4, 64, 8) } }
}
/** heat: a sun with pixel rays and a thermometer reading (a joke number, never a real reading) */
export function heatSun(x, cx, cy, t, r = 90) {
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6 + t * 0.6, rr = r + 22 + 8 * Math.sin(t * 5 + k); x.fillStyle = '#ffd36b'; x.fillRect(cx + Math.cos(a) * rr - 9, cy + Math.sin(a) * rr - 9, 18, 18) }
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill()
  const g = x.createRadialGradient(cx - 20, cy - 20, 8, cx, cy, r); g.addColorStop(0, '#fff6c9'); g.addColorStop(0.6, '#ffc24a'); g.addColorStop(1, '#f08a2c'); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
}
export function sweat(x, cx, cy, t, n = 3) {
  for (let q = 0; q < n; q++) { const ph = (t * 1.2 + q / n) % 1, px = cx + (q - (n - 1) / 2) * 34, py = cy + ph * 70; x.fillStyle = INK; x.fillRect(px - 6, py - 8, 13, 17); x.fillStyle = SKYB; x.fillRect(px - 3, py - 5, 7, 11) }
}
export function shimmer(x, top, h, t) { for (let k = 0; k < 18; k++) { const y = top + (k * 61) % h, ph = Math.sin(t * 4 + k); x.strokeStyle = 'rgba(255,230,180,0.18)'; x.lineWidth = 4; x.beginPath(); x.moveTo(0, y); for (let xx = 0; xx <= 1080; xx += 60) x.lineTo(xx, y + Math.sin(xx * 0.03 + t * 6 + k) * 8 * ph); x.stroke() } }

/** the closing card for the series: the Houston beta party ticket (Jan 9). No venue: that isn't confirmed. */
export function partyCard(x, t, lt, { line = 'See you there.', stars = ['leo', 'cancer', 'scorpio', 'gemini'] } = {}) {
  const a = clamp(lt / 0.4)
  x.fillStyle = `rgba(8,5,22,${(0.9 * a).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
  const k = pop01(t, t - lt + 0.25, 0.45, 1.8)
  if (k > 0) {
    x.save(); x.translate(540, 980); x.rotate(-0.04); x.scale(k, k)
    // ticket body with notches
    const W = 820, H = 520
    x.shadowColor = GOLD; x.shadowBlur = 40
    x.fillStyle = INK; x.fillRect(-W / 2 - 8, -H / 2 - 8, W + 16, H + 16); x.shadowBlur = 0
    x.fillStyle = '#1c1240'; x.fillRect(-W / 2, -H / 2, W, H)
    x.fillStyle = GOLD; x.fillRect(-W / 2, -H / 2, W, 16); x.fillRect(-W / 2, H / 2 - 16, W, 16)
    for (const sy of [-1, 1]) { x.fillStyle = '#08051a'; x.beginPath(); x.arc(sy * W / 2, 0, 40, 0, Math.PI * 2); x.fill() }
    x.setLineDash([14, 12]); x.strokeStyle = 'rgba(242,199,92,0.5)'; x.lineWidth = 4; x.beginPath(); x.moveTo(W / 2 - 170, -H / 2 + 30); x.lineTo(W / 2 - 170, H / 2 - 30); x.stroke(); x.setLineDash([])
    txt(x, 'HOUSTON', -80, -160, { size: 44, col: GOLD, font: MONO, weight: 700 })
    txt(x, 'BETA PARTY', -80, -80, { size: 92, col: BONE })
    txt(x, 'JAN 9', -80, 40, { size: 150, col: GOLD })
    txt(x, 'join the Houston beta', -80, 160, { size: 46, col: PINK, font: SERIF, weight: 500, italic: true })
    x.save(); x.translate(W / 2 - 85, 0); x.rotate(-Math.PI / 2); txt(x, 'ADMIT ONE STAR', 0, 0, { size: 30, col: GOLD, font: MONO, weight: 700 }); x.restore()
    x.restore()
  }
  stars.forEach((id, i) => { const sx = [190, 890, 230, 850][i], sy = [560, 600, 1420, 1400][i]; signChar(x, t, id, sx, sy, 170, { mood: 'heart', pop: pop01(t, t - lt + 0.6 + i * 0.12, 0.4, 1.8), seed: 30 + i, hops: [t - lt + 1.2 + i * 0.2, t - lt + 2.6 + i * 0.2], tears: id === 'pisces' ? 2 : 0 }) })
  if (lt > 0.5) sparkles(x, t, 540, 980, t - lt + 0.5, 14, 420, 6)
  const lk = pop01(t, t - lt + 1.6, 0.4, 1.7)
  if (lk > 0) { x.save(); x.globalAlpha = clamp(lk); txt(x, line, 540, 1640, { size: 60, col: BONE }); x.restore() }
}

/** a small invitation card (the party, Jan 9) */
export function inviteCard(x, cx, cy, s, t, k = 1) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.rotate(0.04 * Math.sin(t * 1.3)); x.scale(s * k, s * k)
  x.shadowColor = GOLD; x.shadowBlur = 30; x.fillStyle = INK; x.fillRect(-268, -178, 536, 356); x.shadowBlur = 0
  x.fillStyle = '#1c1240'; x.fillRect(-260, -170, 520, 340); x.fillStyle = GOLD; x.fillRect(-260, -170, 520, 12); x.fillRect(-260, 158, 520, 12)
  txt(x, "YOU'RE INVITED", 0, -110, { size: 34, col: GOLD, font: MONO, weight: 700 })
  txt(x, 'HOUSTON BETA PARTY', 0, -40, { size: 46, col: BONE })
  txt(x, 'JAN 9', 0, 50, { size: 100, col: GOLD })
  txt(x, 'RSVP', 0, 125, { size: 32, col: PINK, font: MONO, weight: 700 })
  x.restore()
}
export function taco(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 10, 50, Math.PI, 0); x.fill()
  x.fillStyle = '#f4e1b0'; x.beginPath(); x.arc(0, 10, 44, Math.PI, 0); x.fill()
  x.fillStyle = '#f2c75c'; x.fillRect(-30, -18, 22, 12); x.fillStyle = '#c9783a'; x.fillRect(-4, -24, 20, 14); x.fillStyle = '#7dbf5a'; x.fillRect(18, -16, 14, 10)
  x.restore()
}

// ── props for the story episodes (news parody, courtroom, time loop)
/** an overhead green freeway sign (text + small sub line + arrow) */
export function overheadSign(x, cx, cy, text, sub, k = 1, { gold = false } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (gold) { x.shadowColor = GOLD; x.shadowBlur = 40 }
  box(x, -340, -95, 680, 190, gold ? '#1f6a3a' : HGREEN, 8); x.shadowBlur = 0
  x.strokeStyle = gold ? GOLD : '#e8f1ea'; x.lineWidth = 5; x.strokeRect(-328, -83, 656, 166)
  txt(x, text, -30, -26, { size: text.length > 12 ? 50 : 62, col: '#f4fbf6' })
  if (sub) txt(x, sub, -30, 44, { size: 40, col: gold ? GOLD : '#f4fbf6', font: MONO, weight: 700 })
  x.fillStyle = '#f4fbf6'; x.beginPath(); x.moveTo(260, -40); x.lineTo(310, 0); x.lineTo(260, 40); x.fill()
  x.restore()
}
/** a tear-off calendar page with a year (or a date) */
export function calendar(x, cx, cy, top, big, k = 1, flip = 0) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k * (1 - 0.8 * Math.sin(Math.PI * clamp(flip))))
  box(x, -110, -120, 220, 240, BONE, 7); x.fillStyle = BRAKE; x.fillRect(-110, -120, 220, 62)
  txt(x, top, 0, -88, { size: 32, col: BONE, font: MONO, weight: 700 }); txt(x, big, 0, 30, { size: 74, col: INK })
  x.restore()
}
export function cobweb(x, cx, cy, s = 1, a = 1) {
  x.save(); x.globalAlpha = a; x.strokeStyle = 'rgba(239,230,214,0.75)'; x.lineWidth = 3
  for (let k = 0; k < 6; k++) { const ang = Math.PI / 2 * k / 5; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ang) * 120 * s, cy + Math.sin(ang) * 120 * s); x.stroke() }
  for (let r = 30; r <= 120; r += 30) { x.beginPath(); x.arc(cx, cy, r * s, 0, Math.PI / 2); x.stroke() }
  x.restore()
}
/** news: desk, LIVE bug, chyron with a scrolling ticker */
export function newsDesk(x, t) {
  x.fillStyle = '#16204a'; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? '#1b2858' : '#14204e'; x.fillRect(k * 135, 380, 135, 900) }
  box(x, 150, 1180, 780, 220, '#2b5fb0', 8); x.fillStyle = BONE; x.fillRect(150, 1180, 780, 14)
  txt(x, 'STAR NEWS', 540, 1300, { size: 64, col: BONE })
}
export function liveBug(x, t) { box(x, 80, 260, 150, 64, BRAKE, 5); txt(x, '● LIVE', 155, 293, { size: 32, col: BONE, font: MONO, weight: 700 }) }
export function chyron(x, t, head, ticker, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k)
  box(x, 0, 1420, 1080, 110, BRAKE, 0); x.fillStyle = INK; x.fillRect(0, 1414, 1080, 8)
  txt(x, head, 540, 1476, { size: head.length > 26 ? 44 : 54, col: BONE })
  box(x, 0, 1530, 1080, 64, '#f4efe4', 0)
  x.save(); x.beginPath(); x.rect(0, 1530, 1080, 64); x.clip()
  x.font = `700 32px ${MONO}`; const w = x.measureText(ticker).width + 80, off = (t * 160) % w
  for (let k2 = -1; k2 < 3; k2++) { x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(ticker, k2 * w - off, 1563) }
  x.restore(); x.restore()
}
/** a puffer coat + beanie worn by a star at [cx, cy, size] */
export function puffer(x, P, id, col = '#e05a3a') {
  const [cx, cy, s] = P.at(id)
  for (let k = 0; k < 3; k++) box(x, cx - s * 0.36, cy + s * 0.02 + k * s * 0.13, s * 0.72, s * 0.12, col, 4)
  box(x, cx - s * 0.3, cy - s * 0.62, s * 0.6, s * 0.16, '#2b5fb0', 4); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy - s * 0.66, s * 0.07, 0, Math.PI * 2); x.fill()
}
export function phoneFlash(x, cx, cy, t, text = '55°', lt = 0) {   // one soft camera flash (no strobing)
  box(x, cx - 50, cy - 90, 100, 180, INK, 4); x.fillStyle = '#bfe6ff'; x.fillRect(cx - 40, cy - 78, 80, 150)
  txt(x, text, cx, cy, { size: 36, col: INK }); const d = lt - 1.0; if (d > 0 && d < 0.3) { x.fillStyle = `rgba(255,255,255,${(0.35 * (1 - d / 0.3)).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
}
export function soupPot(x, cx, cy, t) {
  box(x, cx - 120, cy - 60, 240, 130, '#8f96a0', 7); box(x, cx - 140, cy - 76, 280, 26, '#6d7480', 5)
  for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k / 4) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(cx - 60 + k * 40, cy - 90 - ph * 140); x.quadraticCurveTo(cx - 40 + k * 40, cy - 130 - ph * 140, cx - 60 + k * 40, cy - 170 - ph * 140); x.stroke() }
}
export function plantBlanket(x, cx, base) {
  box(x, cx - 70, base - 90, 140, 90, '#c9783a', 6)
  x.fillStyle = '#7dbf5a'; x.beginPath(); x.moveTo(cx - 90, base - 90); x.quadraticCurveTo(cx, base - 300, cx + 90, base - 90); x.fill()
  box(x, cx - 110, base - 260, 220, 150, '#ff8fb1', 6); for (let k = 0; k < 3; k++) { x.fillStyle = '#ffd1e0'; x.fillRect(cx - 90 + k * 70, base - 230, 30, 30) }
}
/** courtroom: wood panelling, the bench, a seal-less banner */
export function courtroom(x) {
  x.fillStyle = '#3a2418'; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 9; k++) { x.fillStyle = k % 2 ? '#4a2e1e' : '#422818'; x.fillRect(k * 120, 300, 120, 1100) }
  box(x, 220, 640, 640, 260, '#6b3b1f', 8); x.fillStyle = '#8a5530'; x.fillRect(220, 640, 640, 22)
  x.fillStyle = '#2a1a10'; x.fillRect(0, 1340, 1080, 580)
}
export function gavel(x, cx, cy, t, hit = 0) {
  x.save(); x.translate(cx, cy); x.rotate(-0.6 + 0.6 * clamp(hit))
  box(x, -8, 0, 16, 110, '#8a5530', 4); box(x, -50, -30, 100, 50, '#6b3b1f', 5); x.restore()
}
export function kolache(x, cx, cy, s = 1) {   // the sweet one: round bun, fruit centre
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8b86a'; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c0304a'; x.beginPath(); x.arc(0, 0, 24, 0, Math.PI * 2); x.fill(); x.restore()
}
export function klobasnek(x, cx, cy, s = 1) {   // the sausage one: a roll with a sausage poking out
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -70, -30, 140, 60, '#e8b86a', 6); box(x, 70, -16, 34, 32, '#a5452a', 5); box(x, -104, -16, 34, 32, '#a5452a', 5); x.restore()
}

// ── props for episodes 7–10 (mission control, nature doc, slab, long distance)
/** mission control: rows of consoles and a big wall screen; draw(cx, cy, w, h) paints inside the screen */
export function missionControl(x, t, draw) {
  x.fillStyle = '#0d1426'; x.fillRect(0, 0, 1080, 1920)
  box(x, 90, 330, 900, 560, '#0a2a3a', 10)
  x.save(); x.beginPath(); x.rect(90, 330, 900, 560); x.clip(); x.fillStyle = '#0b2232'; x.fillRect(90, 330, 900, 560)
  x.strokeStyle = 'rgba(125,255,176,0.12)'; x.lineWidth = 2; for (let gx = 90; gx < 990; gx += 60) { x.beginPath(); x.moveTo(gx, 330); x.lineTo(gx, 890); x.stroke() } for (let gy = 330; gy < 890; gy += 60) { x.beginPath(); x.moveTo(90, gy); x.lineTo(990, gy); x.stroke() }
  draw?.(540, 610, 900, 560); x.restore()
  for (let row = 0; row < 2; row++) { const y = 1380 + row * 230; box(x, 40, y, 1000, 70, '#2a3550', 6); for (let k = 0; k < 6; k++) { const on = Math.sin(t * 4 + k * 1.7 + row) > 0; x.fillStyle = on ? '#7dffb0' : '#ff5a6e'; x.fillRect(90 + k * 160, y + 22, 16, 16); x.fillStyle = '#5ec8ff'; x.fillRect(120 + k * 160, y + 18, 80, 30) } }
}
/** a city map with the three loops (610, Beltway 8, Grand Parkway) for the big screen */
export function loopMap(x, cx, cy, s, t, { dots = [], route = null } = {}) {
  for (const [r, lab] of [[1, 'GRAND PKWY'], [0.66, 'BELTWAY 8'], [0.33, '610']]) { x.strokeStyle = 'rgba(242,199,92,0.7)'; x.lineWidth = 6; x.beginPath(); x.ellipse(cx, cy, 380 * r * s, 230 * r * s, 0, 0, Math.PI * 2); x.stroke(); txt(x, lab, cx + 380 * r * s - 40, cy - 230 * r * s + 22, { size: 18, col: GOLD, font: MONO, weight: 700 }) }
  x.strokeStyle = 'rgba(239,230,214,0.35)'; x.lineWidth = 5; x.beginPath(); x.moveTo(cx - 400 * s, cy + 10); x.lineTo(cx + 400 * s, cy - 10); x.stroke()   // I-10
  if (route) { const [a, b] = route; x.setLineDash([16, 12]); x.strokeStyle = PINK; x.lineWidth = 6; x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); x.setLineDash([]) }
  for (const [dx, dy, col, lab] of dots) { const p = 1 + 0.15 * Math.sin(t * 6); x.fillStyle = col; x.beginPath(); x.arc(dx, dy, 16 * p, 0, Math.PI * 2); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; x.stroke(); if (lab) txt(x, lab, dx, dy - 38, { size: 24, col: BONE, font: MONO, weight: 700 }) }
}
/** nature-doc lower third: a common name and a Latin name */
export function lowerThird(x, name, latin, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); box(x, 70, 1080, 640 * k, 120, 'rgba(14,9,32,0.9)', 0); x.fillStyle = GOLD; x.fillRect(70, 1080, 10, 120)
  txt(x, name, 100, 1120, { size: 38, col: BONE, align: 'left' }); txt(x, latin, 100, 1170, { size: 32, col: GOLD, font: SERIF, weight: 500, italic: true, align: 'left' }); x.restore()
}
/** documentary narration: an italic subtitle at the bottom of the action */
export function narr(x, lt, text, at = 0.2, d = 99) {
  const k = clamp((lt - at) / 0.3) * (1 - clamp((lt - at - d) / 0.3)); if (k <= 0) return
  x.save(); x.globalAlpha = k; x.fillStyle = 'rgba(8,5,22,0.75)'; x.fillRect(60, 1350, 960, 120)
  const [a, b] = text.split(' | '); txt(x, a, 540, b ? 1385 : 1410, { size: 38, col: BONE, font: SERIF, weight: 500, italic: true }); if (b) txt(x, b, 540, 1435, { size: 38, col: BONE, font: SERIF, weight: 500, italic: true }); x.restore()
}
/** a row of identical suburban houses (Katy, master-planned) */
export function houses(x, base, t) {
  for (let k = 0; k < 6; k++) { const cx = 90 + k * 180; box(x, cx - 70, base - 150, 140, 150, '#d9c7a8', 5); x.fillStyle = '#8a4a3a'; x.beginPath(); x.moveTo(cx - 86, base - 150); x.lineTo(cx, base - 230); x.lineTo(cx + 86, base - 150); x.fill(); x.strokeStyle = INK; x.lineWidth = 5; x.stroke()
    x.fillStyle = Math.sin(t + k) > 0 ? '#ffd36b' : '#3a4a6a'; x.fillRect(cx - 50, base - 120, 34, 34); x.fillRect(cx + 16, base - 120, 34, 34); box(x, cx - 16, base - 70, 32, 70, '#6b3b1f', 3) }
}
/** a Montrose-style mural wall: bright blocks and a big heart */
export function mural(x, t) {
  const cols = ['#ff8fb1', '#ffd36b', '#7dffb0', '#8fe3ff', '#c9a6ff', '#ff9a3c']
  for (let k = 0; k < 6; k++) { x.fillStyle = cols[k]; x.fillRect(k * 180, 420, 180, 900) }
  for (let k = 0; k < 14; k++) { x.fillStyle = cols[(k + 3) % 6]; x.beginPath(); x.arc((k * 137) % 1080, 500 + (k * 211) % 760, 40 + (k % 3) * 20, 0, Math.PI * 2); x.fill() }
  txt(x, 'HTX', 540, 760, { size: 200, col: INK })
}
/** a coffee shop front on a feeder road (generic) */
export function coffeeShop(x, cx, base, closed = false) {
  box(x, cx - 260, base - 380, 520, 380, '#c98e5a', 8); box(x, cx - 290, base - 430, 580, 70, '#6b3b1f', 6)
  txt(x, 'COFFEE', cx, base - 395, { size: 46, col: BONE })
  box(x, cx - 200, base - 300, 160, 170, '#bfe6ff', 5); box(x, cx + 40, base - 300, 160, 300, '#6b3b1f', 5)
  if (closed) { x.save(); x.translate(cx + 120, base - 200); x.rotate(-0.1); box(x, -80, -30, 160, 60, BRAKE, 4); txt(x, 'CLOSED', 0, 2, { size: 32, col: BONE }); x.restore() }
}
export function cones(x, base, n = 6, t = 0) { for (let k = 0; k < n; k++) { const cx = 120 + k * 170; x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 40, base); x.lineTo(cx, base - 110); x.lineTo(cx + 40, base); x.fill(); x.fillStyle = '#ff7a2a'; x.beginPath(); x.moveTo(cx - 32, base - 4); x.lineTo(cx, base - 100); x.lineTo(cx + 32, base - 4); x.fill(); x.fillStyle = BONE; x.fillRect(cx - 18, base - 60, 36, 12) } }
/** a slab: long candy-paint car (side view), swangas poking out, optional popped trunk with a lit message */
export function slab(x, cx, cy, t, { paint = 1, col = '#b0306a', col2 = null, elbows = 0, glow = 0, trunk = 0, msg = 'BETA PARTY · JAN 9', s = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  if (glow > 0) { x.save(); x.globalAlpha = 0.5 * glow; x.fillStyle = '#5ee0ff'; x.beginPath(); x.ellipse(0, 70, 380, 40, 0, 0, Math.PI * 2); x.fill(); x.restore() }
  if (trunk > 0) {                                     // popped trunk: a lit sign rises out of the trunk
    const k = clamp(trunk), rise = 240 * ease.outBack(k)
    x.save(); x.translate(-230, -60 - rise); x.shadowColor = GOLD; x.shadowBlur = 50 * k
    box(x, -230, -95, 460, 190, '#1c1240', 8); x.shadowBlur = 0
    x.fillStyle = GOLD; x.fillRect(-230, -95, 460, 12); x.fillRect(-230, 83, 460, 12)
    txt(x, msg.split(' · ')[0], 0, -22, { size: 60, col: GOLD }); txt(x, msg.split(' · ')[1] || '', 0, 46, { size: 52, col: PINK, font: MONO, weight: 700 })
    x.restore(); box(x, -250, -70 - rise + 95, 40, rise, '#2a2638', 4)
  }
  const g = x.createLinearGradient(0, -140, 0, 40)
  g.addColorStop(0, '#ffffff'); g.addColorStop(0.18, col); g.addColorStop(0.6, col2 || col); g.addColorStop(1, '#2a1030')
  x.fillStyle = INK; x.fillRect(-350, -76, 700, 120); x.fillRect(-190, -146, 360, 80)
  x.save(); x.globalAlpha = 0.25 + 0.75 * clamp(paint); x.fillStyle = g; x.fillRect(-342, -68, 684, 104); x.fillRect(-182, -138, 344, 74); x.restore()
  x.fillStyle = '#bfe6ff'; x.fillRect(-170, -128, 140, 56); x.fillRect(-10, -128, 150, 56)
  for (let k = 0; k < 5; k++) { const ph = (t * 0.8 + k * 0.2) % 1; x.fillStyle = `rgba(255,255,255,${(0.7 * Math.sin(Math.PI * ph) * clamp(paint)).toFixed(2)})`; x.fillRect(-320 + ph * 640, -60 + k * 18, 40, 6) }   // the candy shine
  for (const wx of [-220, 220]) {
    x.fillStyle = INK; x.beginPath(); x.arc(wx, 40, 54, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d8dce4'; x.beginPath(); x.arc(wx, 40, 34, 0, Math.PI * 2); x.fill()
    if (elbows > 0) { const L = 90 * clamp(elbows), a = t * 6; for (let k = 0; k < 6; k++) { const an = a + k * Math.PI / 3; x.strokeStyle = '#eef2f8'; x.lineWidth = 6; x.beginPath(); x.moveTo(wx, 40); x.lineTo(wx + Math.cos(an) * 30, 40 + Math.sin(an) * 30); x.stroke() } box(x, wx - 8, 30, L, 20, '#eef2f8', 3) }   // swangas poke out
  }
  x.restore()
}
export function garage(x) { x.fillStyle = '#1e1a2a'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 6; k++) { x.fillStyle = k % 2 ? '#24203a' : '#1f1b30'; x.fillRect(0, 380 + k * 160, 1080, 160) } x.fillStyle = '#2e2a3c'; x.fillRect(0, 1390, 1080, 530); for (let k = 0; k < 3; k++) { x.fillStyle = 'rgba(255,240,200,0.12)'; x.beginPath(); x.moveTo(200 + k * 340, 380); x.lineTo(80 + k * 340, 1390); x.lineTo(360 + k * 340, 1390); x.fill() } }
