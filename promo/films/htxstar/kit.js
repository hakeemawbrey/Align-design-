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
