// ZODIAC CONFESSIONAL long-episode kit (kcfe16–kcfe20): the reality-show "house" sets on top of the booth kit
// (../../kcfe01/scenes/cfkit.js). Read-only for kcfe17–20 (import it). Pure f(t); DOM only in build-time helpers.
//   drawHouse(x, t, { lit })                      night exterior of THE HOUSE: sky, stars, facade, lit windows, path
//   walker(x, t, id, { t0, t1, from, to, y, s, mood, tears, bag, look })   a sign star walking in with a bag
//   phoneShot(x, t, { owner, title, msgs, typing, tears, peek })            a full-frame phone close-up
//   CAST3 / dinner(x, t, cast, { rattle, wall, food })                      three at the dinner table (+ the table)
//   flicker(t, times)                            0…1 darkness for a lights-flicker at each time
//   porch(x, t)                                  the porch set (door, step, lamp, night)
//   drawBubbleWave(x, cx, cy, w, t)              a voice-note waveform pill
import {
  lerp, prog, ease, easeOutBack, GOLD, BONE, INK, PINK, INTER, MONO,
  SIGN, seat, blk, rr, drawDiningRoom, drawTable, drawPhone,
} from '../../kcfe01/scenes/cfkit.js'

export function drawHouse(x, t, { lit = 1 } = {}) {
  const g = x.createLinearGradient(0, 0, 0, 1400); g.addColorStop(0, '#0a0820'); g.addColorStop(1, '#2a1a4a')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let i = 0; i < 60; i++) { const sx = (i * 197) % 1080, sy = 300 + (i * 89) % 520, a = 0.4 + 0.6 * Math.max(0, Math.sin(t * 1.3 + i)); x.fillStyle = `rgba(255,247,220,${a})`; x.fillRect(sx, sy, i % 7 ? 4 : 7, i % 7 ? 4 : 7) }
  x.fillStyle = '#f6e7b8'; x.beginPath(); x.arc(880, 420, 50, 0, Math.PI * 2); x.fill()
  // facade
  x.fillStyle = INK; x.beginPath(); x.moveTo(110, 760); x.lineTo(540, 470); x.lineTo(970, 760); x.closePath(); x.fill()
  x.fillStyle = '#6a3a5a'; x.beginPath(); x.moveTo(140, 750); x.lineTo(540, 490); x.lineTo(940, 750); x.closePath(); x.fill()
  blk(x, 160, 750, 760, 520, '#e8d6b8', { r: 4, hi: 0, lo: 0 })
  // windows (lit)
  for (const [wx, wy] of [[230, 820], [710, 820], [230, 1010], [710, 1010]]) {
    blk(x, wx, wy, 140, 130, lit ? '#ffd98a' : '#2a2a4a', { r: 4, hi: 0, lo: 0 })
    x.fillStyle = INK; x.fillRect(wx + 66, wy, 8, 130); x.fillRect(wx, wy + 61, 140, 8)
  }
  // door + lamp
  blk(x, 470, 1050, 140, 220, '#8a3a4a', { r: 6 })
  x.fillStyle = GOLD; x.beginPath(); x.arc(585, 1170, 8, 0, Math.PI * 2); x.fill()
  const lg = x.createRadialGradient(540, 1020, 0, 540, 1020, 300); lg.addColorStop(0, 'rgba(255,214,150,0.35)'); lg.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = lg; x.fillRect(240, 720, 600, 600)
  // sign over the door
  blk(x, 400, 960, 280, 60, INK, { r: 6, hi: 0, lo: 0 })
  x.font = `900 34px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE HOUSE', 540, 992)
  // ground + path
  x.fillStyle = '#1e2a24'; x.fillRect(0, 1270, 1080, 650)
  x.fillStyle = '#5a5060'; x.beginPath(); x.moveTo(470, 1270); x.lineTo(610, 1270); x.lineTo(760, 1920); x.lineTo(320, 1920); x.closePath(); x.fill()
  // string lights on the roofline
  for (let i = 0; i < 16; i++) { const u = i / 15, px = lerp(140, 940, u), py = 750 - (u < 0.5 ? u : 1 - u) * 2 * 260 + 24; x.fillStyle = i % 3 === 0 ? PINK : i % 3 === 1 ? GOLD : '#7fd0f0'; x.globalAlpha = 0.7 + 0.3 * Math.sin(t * 4 + i); x.fillRect(px - 6, py - 6, 12, 12); x.globalAlpha = 1 }
}

export function walker(x, t, id, { t0, t1, from = -200, to = 540, y = 1300, s = 260, mood = 'happy', tears = 0, bag = null, look }) {
  if (t < t0) return null
  const p = ease.outCubic(prog(t, t0, t1))
  const px = lerp(from, to, p), walking = p < 1
  const hop = walking ? Math.abs(Math.sin((t - t0) * 9)) * 26 : 0
  const F = seat(x, t, id, { x: px, y: y - hop, s }, { mood, tears, look: look || [Math.sign(to - from), 0], seed: id.length, squash: walking ? 0.05 * Math.sin((t - t0) * 18) : 0 })
  if (bag) {
    const bx = px + (to > from ? -s * 0.45 : s * 0.45), by = y + s * 0.28
    blk(x, bx - 50, by - 40, 100, 80, bag.color || '#c86a3c', { r: 10 })
    x.fillStyle = INK; x.fillRect(bx - 20, by - 58, 40, 10)
    if (bag.label) { x.font = `800 18px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(bag.label, bx, by + 4) }
  }
  return F
}

export function phoneShot(x, t, { owner, title = '', msgs = [], typing = null, tears = 0, peekMood = 'wide', screen = '#10162e' } = {}) {
  x.fillStyle = '#120a1e'; x.fillRect(0, 0, 1080, 1920)
  const g = x.createRadialGradient(540, 980, 0, 540, 980, 820); g.addColorStop(0, 'rgba(150,190,255,0.22)'); g.addColorStop(1, 'rgba(150,190,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  drawPhone(x, t, { cx: 540, cy: 980, w: 660, h: 1120, rot: -0.02, title, msgs, typing, screen })
  if (owner) seat(x, t, owner, { x: 900, y: 1650, s: 230 }, { mood: peekMood, look: [-1, -1], tears, seed: 5 })
}

export const CAST3 = [{ x: 250, y: 1010, s: 270 }, { x: 540, y: 990, s: 270 }, { x: 830, y: 1010, s: 270 }]
/** cast: [{ id, mood, look, tears, hops, sweat, squash }] (three seats) */
export function dinner(x, t, cast, { rattle = 0, wall = '#4a2a4e', food = true, plates } = {}) {
  drawDiningRoom(x, t, { wall })
  cast.forEach((c, i) => { if (c) seat(x, t, c.id, { ...CAST3[i], ...(c.pos || {}), hops: c.hops }, { mood: c.mood || 'neutral', look: c.look, tears: c.tears || 0, seed: 30 + i, sweat: c.sweat || 0, squash: c.squash || 0, color: c.color }) })
  drawTable(x, t, { y: 1150, plates: plates || CAST3.map(p => p.x), candles: [395, 685], food, rattle })
}

export function flicker(t, times) {
  let d = 0
  for (const a of times) { const u = t - a; if (u >= 0 && u < 0.5) d = Math.max(d, (Math.floor(u * 16) % 2 ? 0.8 : 0.15)) }
  return d
}

export function porch(x, t) {
  const g = x.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, '#0a0820'); g.addColorStop(1, '#22184a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let i = 0; i < 40; i++) { const sx = (i * 233) % 1080, sy = 300 + (i * 71) % 400; x.fillStyle = `rgba(255,247,220,${0.4 + 0.6 * Math.max(0, Math.sin(t + i))})`; x.fillRect(sx, sy, 5, 5) }
  blk(x, 0, 760, 1080, 520, '#d8c4a6', { r: 0, hi: 0, lo: 0 })
  for (let i = 0; i < 10; i++) { x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(0, 780 + i * 52, 1080, 4) }
  blk(x, 700, 820, 220, 450, '#8a3a4a', { r: 6 })
  x.fillStyle = GOLD; x.beginPath(); x.arc(890, 1060, 9, 0, Math.PI * 2); x.fill()
  blk(x, 160, 830, 180, 160, '#ffd98a', { r: 4, hi: 0, lo: 0 }); x.fillStyle = INK; x.fillRect(244, 830, 8, 160); x.fillRect(160, 906, 180, 8)
  const lg = x.createRadialGradient(620, 820, 0, 620, 820, 420); lg.addColorStop(0, 'rgba(255,214,150,0.35)'); lg.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = lg; x.fillRect(200, 400, 840, 900)
  blk(x, 590, 780, 60, 80, '#f2c06a', { r: 8 })
  blk(x, -20, 1270, 1120, 70, '#8a6a4a', { r: 4 })
  x.fillStyle = '#1e2a24'; x.fillRect(0, 1346, 1080, 580)
}

export function drawBubbleWave(x, cx, cy, w, t, { col = '#4f8dff', k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; rr(x, -w / 2 - 6, -46, w + 12, 92, 46); x.fill(); x.fillStyle = col; rr(x, -w / 2, -40, w, 80, 40); x.fill()
  x.fillStyle = '#fff'; x.beginPath(); x.moveTo(-w / 2 + 34, -18); x.lineTo(-w / 2 + 64, 0); x.lineTo(-w / 2 + 34, 18); x.closePath(); x.fill()
  for (let i = 0; i < 22; i++) { const h = 8 + 26 * Math.abs(Math.sin(i * 1.7 + t * 6)); x.fillRect(-w / 2 + 90 + i * ((w - 130) / 22), -h / 2, 6, h) }
  x.restore()
}
