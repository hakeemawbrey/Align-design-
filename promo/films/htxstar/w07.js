// Houston Star Talk · worker w07 (hst161–hst185): "your perfect Houston date, by sign" and "Houston dating flags".
// Shared sets, props and scene builders for w07a.js (dates) and w07b.js (flags). Built on starrace/ep.js and kit.js.
// Pure functions of t; no document access at module top level. Generic places and foods only (no brands).
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside } from '../starrace/ep.js'
import { label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, SIGN_IDS, MINT, SKYB, LAV } from '../signs3kit.js'
import { streetSign, skyline, car, heatSun, shimmer, partyCard, taco, kolache, klobasnek, mural, houses, soupPot, puffer, sweat, BRAKE, HGREEN } from './kit.js'

export const Y = 1255, GND = FLOOR + 60
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
export const NAME = id => id[0].toUpperCase() + id.slice(1)
export const nameTag = (x, id, cx, cy) => txt(x, id.toUpperCase(), cx, cy, { size: 34, col: BONE, font: MONO, weight: 700 })
export const music = (style, key, seed, D) => ({ style, key, seed, lufs: -26, musicRel: -15, crackle: false, sections: { drop: 0, outroAt: D - 2.4 } })

// ── little drawing helpers
const sky = (x, top, bot, y = GND) => { const g = x.createLinearGradient(0, 0, 0, y); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, 1080, y) }
const ground = (x, col, y = GND) => { x.fillStyle = col; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = INK; x.fillRect(0, y - 6, 1080, 10) }
const tree = (x, cx, base, s = 1, col = '#3f8a4a') => { box(x, cx - 12 * s, base - 120 * s, 24 * s, 120 * s, '#6b4a2c', 4); for (const [dx, dy, r] of [[0, -170, 70], [-50, -130, 52], [50, -130, 52]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s, base + dy * s, (r + 6) * s, 0, Math.PI * 2); x.fill() } for (const [dx, dy, r] of [[0, -170, 70], [-50, -130, 52], [50, -130, 52]]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx * s, base + dy * s, r * s, 0, Math.PI * 2); x.fill() } }
const water = (x, top, bot, col, t, line = 'rgba(255,255,255,0.25)') => { x.fillStyle = col; x.fillRect(0, top, 1080, bot - top); for (let k = 0; k < 16; k++) { const y = top + 20 + (k * 47) % (bot - top - 30), xx = ((k * 211 + t * 40 * (k % 2 ? 1 : -1)) % 1200 + 1200) % 1200 - 100; x.fillStyle = line; x.fillRect(xx, y, 90, 6) } }
const stars = (x, t, n = 30) => { for (let k = 0; k < n; k++) { const a = 0.3 + 0.7 * Math.abs(Math.sin(t * 1.1 + k * 2.3)); x.fillStyle = `rgba(239,230,214,${a.toFixed(2)})`; x.fillRect((k * 197) % 1080, 60 + (k * 89) % 700, 6, 6) } }
const bulbs = (x, t, y0 = 460, sag = 60) => { x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); for (let xx = 0; xx <= 1080; xx += 20) x.lineTo(xx, y0 + Math.sin(Math.PI * ((xx % 360) / 360)) * sag); x.stroke(); for (let xx = 20; xx < 1080; xx += 60) { const yy = y0 + Math.sin(Math.PI * ((xx % 360) / 360)) * sag + 14, on = Math.sin(t * 3 + xx) > -0.6; x.fillStyle = on ? '#ffe39a' : '#8a7a5a'; x.beginPath(); x.arc(xx, yy, 10, 0, Math.PI * 2); x.fill() } }

// ── sets (each paints the whole frame behind the stars)
export const SETS = {
  night: (x, t) => { skyline(x, GND, t, { alpha: 0.85 }); outside(x, { ground: '#221b38' }) },
  trail: (x, t) => { sky(x, '#8fd0ff', '#ffe3b0'); for (let k = 0; k < 7; k++) tree(x, 60 + k * 160, 1120, 1.2 - (k % 2) * 0.2, k % 2 ? '#3f8a4a' : '#2f7a3e'); ground(x, '#4f9a4a'); x.fillStyle = '#c9a06a'; x.beginPath(); x.moveTo(380, GND); x.lineTo(700, GND); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.fill() },
  bayou: (x, t) => { sky(x, '#2a3a7a', '#ff9a6a'); skyline(x, 1060, t, { alpha: 0.9 }); water(x, 1060, GND, '#3a6a6a', t); ground(x, '#3f7a44'); for (let k = 0; k < 6; k++) box(x, 40 + k * 190, GND + 20, 90, 12, '#5aa05a', 3) },
  pond: (x, t) => { sky(x, '#9fdcff', '#fff0c8'); for (let k = 0; k < 6; k++) tree(x, 90 + k * 190, 980, 0.9, '#3f8a4a'); x.fillStyle = '#4f9a4a'; x.fillRect(0, 980, 1080, 410); x.fillStyle = INK; x.beginPath(); x.ellipse(540, 1170, 520, 150, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#4a8ab0'; x.beginPath(); x.ellipse(540, 1170, 510, 140, 0, 0, Math.PI * 2); x.fill(); for (let k = 0; k < 3; k++) paddleBoat(x, 260 + k * 280 + Math.sin(t * 0.6 + k) * 30, 1150 + (k % 2) * 40, t + k, ['#ff8fb1', '#ffd36b', '#8fe3ff'][k], 0.8); ground(x, '#4f9a4a') },
  museum: (x, t) => { x.fillStyle = '#d9cfbd'; x.fillRect(0, 0, 1080, GND); for (const [cx, cy, w, h, c] of [[200, 760, 210, 250, ['#c0304a', '#2b5fb0']], [540, 740, 250, 290, ['#f2c75c', '#1b1236']], [880, 770, 190, 230, ['#7dbf5a', '#ff8fb1']]]) { box(x, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28, '#8a6a3a', 6); x.fillStyle = BONE; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.fillStyle = c[0]; x.fillRect(cx - w / 2 + 20, cy - h / 2 + 20, w - 40, h * 0.45); x.fillStyle = c[1]; x.beginPath(); x.arc(cx, cy + h * 0.2, w * 0.22, 0, Math.PI * 2); x.fill() } ground(x, '#8a5a34'); for (let k = 0; k < 12; k++) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(k * 90, GND, 4, 530) } },
  batBridge: (x, t) => { sky(x, '#3a2a6a', '#ff8a4a'); x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(780, 960, 90, 0, Math.PI * 2); x.fill(); water(x, 1000, GND, '#4a4a7a', t); box(x, 0, 880, 1080, 50, '#6d7480', 6); for (let k = 0; k < 5; k++) box(x, 60 + k * 230, 930, 40, 90, '#6d7480', 5); bats(x, t, 980); ground(x, '#3a3a5a') },
  bellaire: (x, t) => { x.fillStyle = '#120c2a'; x.fillRect(0, 0, 1080, GND); stars(x, t, 14); const S = [['PHO', '#ff5a6e'], ['BOBA', '#7dffb0'], ['KARAOKE', '#c9a6ff'], ['BAKERY', '#ffd36b'], ['HOT POT', '#5ec8ff']]; S.forEach(([s, c], i) => { const l = -40 + i * 230; box(x, l, 700, 220, 690, ['#2a2050', '#24305a', '#2e2448'][i % 3], 6); box(x, l + 20, 1060, 180, 200, '#ffe9b0', 5); const on = Math.sin(t * 5 + i * 2) > -0.8; x.save(); if (on) { x.shadowColor = c; x.shadowBlur = 30 } box(x, l + 15, 760, 190, 90, '#0e0820', 4); txt(x, s, l + 110, 805, { size: s.length > 5 ? 34 : 46, col: on ? c : '#4a4060' }); x.restore() }); ground(x, '#2a2640') },
  mural: (x, t) => { x.fillStyle = '#1b1236'; x.fillRect(0, 0, 1080, 420); mural(x, t); ground(x, '#5a5470') },
  beach: (x, t) => { sky(x, '#7fc8ff', '#e8f4ff', 1000); for (let k = 0; k < 3; k++) { const gx = (t * 60 + k * 400) % 1200 - 60; x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(gx - 20, 300 + k * 60); x.lineTo(gx, 312 + k * 60); x.lineTo(gx + 20, 300 + k * 60); x.stroke() } water(x, 1000, 1250, '#8a8a5a', t, 'rgba(255,250,230,0.5)'); x.fillStyle = '#e3c98f'; x.fillRect(0, 1250, 1080, 670); x.fillStyle = INK; x.fillRect(0, 1246, 1080, 6) },
  lawn: (x, t) => { sky(x, '#2a2060', '#ff9a8a', 1100); skyline(x, 1100, t, { alpha: 0.95 }); x.fillStyle = '#4f9a4a'; x.fillRect(0, 1100, 1080, 820); x.fillStyle = INK; x.fillRect(0, 1096, 1080, 6); bulbs(x, t, 430) },
  porch: (x, t) => { x.fillStyle = '#9ec9d8'; x.fillRect(0, 0, 1080, GND); for (let y = 30; y < GND; y += 44) { x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(0, y, 1080, 6) } box(x, 380, 520, 320, 560, '#6b3b1f', 8); box(x, 90, 560, 200, 240, '#fff3c4', 8); box(x, 790, 560, 200, 240, '#fff3c4', 8); for (const px of [40, 1010]) box(x, px, 300, 30, GND - 300, BONE, 5); box(x, 0, 280, 1080, 40, BONE, 5); ground(x, '#a5753e'); dog(x, 975, GND - 10, t) },
  truck: (x, t) => { sky(x, '#1a1440', '#5a3a7a'); stars(x, t, 16); bulbs(x, t, 380, 40); box(x, 150, 640, 780, 560, '#e0a030', 8); box(x, 260, 740, 400, 220, '#2a2050', 6); box(x, 230, 960, 460, 30, BONE, 5); txt(x, 'TACOS', 540, 690, { size: 64, col: INK }); for (const wx of [300, 780]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, 1210, 56, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(wx, 1210, 24, 0, Math.PI * 2); x.fill() } ground(x, '#3a3450') },
  crawfish: (x, t) => { x.fillStyle = '#2a5a7a'; x.fillRect(0, 0, 1080, GND); bulbs(x, t, 320, 50); box(x, 80, 1100, 920, 120, '#d9d2c0', 8); for (let k = 0; k < 18; k++) { x.fillStyle = 'rgba(40,40,40,0.25)'; x.fillRect(110 + (k * 53) % 860, 1115 + (k % 4) * 24, 40, 6) } for (let k = 0; k < 26; k++) crawdad(x, 260 + (k * 89) % 560, 1090 - (k % 5) * 16, 0.6); box(x, 140, 1226, 30, 170, '#6b4a2c', 4); box(x, 910, 1226, 30, 170, '#6b4a2c', 4); ground(x, '#5a4a3a') },
  kolache: (x, t) => { x.fillStyle = '#ffd1e0'; x.fillRect(0, 0, 1080, GND); for (let k = 0; k < 9; k++) { x.fillStyle = k % 2 ? '#ffc0d4' : '#ffd1e0'; x.fillRect(k * 120, 0, 120, GND) } box(x, 190, 380, 700, 110, '#c0304a', 8); txt(x, 'KOLACHES', 540, 436, { size: 66, col: BONE }); box(x, 60, 1060, 960, 330, '#f4efe4', 8); box(x, 80, 1080, 920, 150, '#bfe6ff', 5); for (let k = 0; k < 7; k++) { if (k % 2) klobasnek(x, 150 + k * 130, 1155, 0.6); else kolache(x, 150 + k * 130, 1155, 0.75) } ground(x, '#8a5a3a') },
  tunnel: (x, t) => { x.fillStyle = '#c9c2b0'; x.fillRect(0, 0, 1080, GND); x.fillStyle = '#b0a890'; x.beginPath(); x.moveTo(0, 0); x.lineTo(1080, 0); x.lineTo(700, 700); x.lineTo(380, 700); x.fill(); for (let k = 0; k < 4; k++) { const y = 90 + k * 150, w = 300 - k * 60; box(x, 540 - w / 2, y, w, 18, '#fffbe0', 3) } box(x, 380, 700, 320, 400, '#8a8270', 6); txt(x, 'TUNNEL', 540, 760, { size: 40, col: BONE, font: MONO, weight: 700 }); snow(x, t); ground(x, '#a09a88') },
  waterwall: (x, t) => { x.fillStyle = '#16123a'; x.fillRect(0, 0, 1080, GND); stars(x, t, 22); box(x, 140, 360, 800, 900, '#8a8a9a', 8); x.fillStyle = '#9ab0c8'; x.fillRect(160, 380, 760, 860); for (let k = 0; k < 40; k++) { const xx = 170 + k * 19, ph = (t * 1.6 + k * 0.37) % 1; x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(xx, 380 + ph * 820, 6, 60) } water(x, 1260, GND, '#4a6a9a', t); ground(x, '#4a4a5a') },
  cistern: (x, t) => { x.fillStyle = '#0a0816'; x.fillRect(0, 0, 1080, GND); for (let k = 0; k < 6; k++) { const cx = 90 + k * 180, h = 900 - Math.abs(k - 2.5) * 40; box(x, cx - 26, 1050 - h, 52, h, '#3a3450', 4); x.fillStyle = 'rgba(255,214,140,0.18)'; x.fillRect(cx - 20, 1050 - h, 8, h) } x.fillStyle = '#141030'; x.fillRect(0, 1050, 1080, GND - 1050); for (let k = 0; k < 6; k++) { const cx = 90 + k * 180; x.fillStyle = 'rgba(58,52,80,0.6)'; x.fillRect(cx - 26 + Math.sin(t * 2 + k) * 4, 1060, 52, 300) } ground(x, '#2a2440') },
  karaoke: (x, t) => { x.fillStyle = '#1a0c2a'; x.fillRect(0, 0, 1080, GND); for (let k = 0; k < 30; k++) { const a = 0.3 + 0.5 * Math.abs(Math.sin(t * 2 + k)); x.fillStyle = [`rgba(255,143,177,${a})`, `rgba(143,227,255,${a})`, `rgba(242,199,92,${a})`][k % 3]; x.fillRect((k * 173 + t * 40) % 1080, 60 + (k * 97) % 900, 14, 14) } box(x, 200, 360, 680, 400, '#0e1630', 10); for (let k = 0; k < 3; k++) { const w = [460, 380, 520][k], fillw = clamp((t * 0.8 - k * 0.4) % 1.6) * w; x.fillStyle = '#3a4a7a'; x.fillRect(540 - w / 2, 480 + k * 90, w, 30); x.fillStyle = GOLD; x.fillRect(540 - w / 2, 480 + k * 90, fillw, 30) } ground(x, '#2a1a3a') },
  garden: (x, t) => { sky(x, '#bfe6ff', '#f4efe4', 900); x.fillStyle = '#e8e0cc'; x.fillRect(0, 900, 1080, GND - 900); for (let k = 0; k < 9; k++) { x.strokeStyle = 'rgba(150,140,110,0.6)'; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 940 + k * 50); for (let xx = 0; xx <= 1080; xx += 30) x.lineTo(xx, 940 + k * 50 + Math.sin(xx * 0.02 + k) * 8); x.stroke() } tree(x, 180, 900, 1.1, '#d0503a'); tree(x, 900, 900, 0.9, '#3f8a4a'); for (const [cx, r] of [[620, 50], [720, 36]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx, 1060, r + 6, Math.PI, 0); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(cx, 1060, r, Math.PI, 0); x.fill() } x.strokeStyle = '#c0304a'; x.lineWidth = 18; x.beginPath(); x.arc(540, 960, 200, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); ground(x, '#7a8a5a') },
  marina: (x, t) => { sky(x, '#ff9a6a', '#ffe3b0', 1080); water(x, 1080, GND, '#3a6a9a', t); for (let k = 0; k < 4; k++) { const bx = 160 + k * 260, by = 1120 + Math.sin(t * 1.4 + k) * 6; box(x, bx - 90, by, 180, 40, BONE, 5); box(x, bx - 4, by - 260, 8, 260, BONE, 2); x.fillStyle = BONE; x.beginPath(); x.moveTo(bx + 6, by - 250); x.lineTo(bx + 90, by - 20); x.lineTo(bx + 6, by - 20); x.fill() } ground(x, '#8a7a6a') },
  shops: (x, t) => { sky(x, '#9fdcff', '#ffffff', 700); ['#c98e5a', '#8fb0d8', '#d8a0b8', '#a0c890'].forEach((c, i) => { const l = i * 270; box(x, l + 10, 560, 250, 830, c, 6); box(x, l + 40, 900, 190, 260, '#bfe6ff', 5); box(x, l + 30, 600, 210, 70, '#f4efe4', 4); txt(x, ['SHOP', 'BOOKS', 'GIFTS', 'TEA'][i], l + 135, 636, { size: 36, col: INK }) }); ground(x, '#8f96a0'); x.save(); x.translate(960, 1240); box(x, -10, -200, 20, 200, '#8f96a0', 4); box(x, -70, -300, 140, 100, BONE, 5); txt(x, 'NO', 0, -270, { size: 30, col: BRAKE }); txt(x, 'PARKING', 0, -232, { size: 24, col: BRAKE }); x.restore() },
  party: (x, t) => { x.fillStyle = '#140c30'; x.fillRect(0, 0, 1080, GND); bulbs(x, t, 360, 70); bulbs(x, t + 1, 560, 50); for (let k = 0; k < 26; k++) { const ph = (t * 0.25 + k / 26) % 1; x.fillStyle = [GOLD, PINK, SKYB, MINT][k % 4]; x.fillRect(40 + (k * 113) % 1000, 300 + ph * 1000, 14, 22) } ground(x, '#2a1d52'); for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? 'rgba(255,143,177,0.18)' : 'rgba(143,227,255,0.18)'; x.fillRect(k * 135, GND, 135, 530) } },
  court: (x, t) => { sky(x, '#8fd0ff', '#d8f0ff', 900); for (let k = 0; k < 4; k++) tree(x, 120 + k * 280, 900, 0.8); x.fillStyle = '#3a7ab0'; x.fillRect(0, 900, 1080, GND - 900); x.fillStyle = BONE; x.fillRect(60, 960, 960, 8); x.fillRect(60, 1320, 960, 8); x.fillRect(536, 960, 8, 360); box(x, 40, 1100, 1000, 16, BONE, 3); for (let k = 0; k < 20; k++) { x.fillStyle = 'rgba(27,18,54,0.6)'; x.fillRect(50 + k * 50, 1050, 4, 50) } ground(x, '#2a6a3a') },
  quiet: (x, t) => { x.fillStyle = '#2a2630'; x.fillRect(0, 0, 1080, GND); for (const [cx, c] of [[220, '#3a1a2a'], [540, '#1a1a30'], [860, '#2a1a3a']]) { box(x, cx - 130, 380, 260, 560, c, 6); x.fillStyle = 'rgba(255,255,255,0.04)'; x.fillRect(cx - 110, 400, 220, 520) } x.fillStyle = 'rgba(255,240,200,0.08)'; x.beginPath(); x.moveTo(400, 0); x.lineTo(680, 0); x.lineTo(820, GND); x.lineTo(260, GND); x.fill(); ground(x, '#3a3440') },
  suburbs: (x, t) => { sky(x, '#8fd0ff', '#fff0c8', 1180); houses(x, 1180, t); x.fillStyle = '#5aa05a'; x.fillRect(0, 1180, 1080, 210); ground(x, '#7a7a88') },
  heat: (x, t) => { sky(x, '#ffb36b', '#fff0a0'); heatSun(x, 820, 400, t, 100); shimmer(x, 700, 600, t); skyline(x, GND, t, { col: '#8a5a3a', lit: '#ffe39a', alpha: 0.6 }); ground(x, '#c9a06a') },
  cold: (x, t) => { sky(x, '#bcd8f0', '#eef6ff'); skyline(x, GND, t, { col: '#5a6a8a', lit: '#e8f4ff', alpha: 0.8 }); for (let k = 0; k < 4; k++) { const ph = (t * 0.2 + k / 4) % 1; x.fillStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.ellipse(((k * 330 + t * 30) % 1300) - 100, 260 + k * 60, 120, 34, 0, 0, Math.PI * 2); x.fill() } ground(x, '#8a9ab0') },
  pickles: null,
}
delete SETS.pickles

// ── props
export function paddleBoat(x, cx, cy, t, col = '#ff8fb1', s = 1) {
  x.save(); x.translate(cx, cy + Math.sin(t * 2) * 4); x.scale(s, s)
  box(x, -90, -20, 180, 50, col, 6); box(x, -60, -70, 120, 50, BONE, 5); x.fillStyle = INK; x.beginPath(); x.arc(70, 10, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d8dce4'; x.beginPath(); x.arc(70, 10, 18, 0, Math.PI * 2); x.fill()
  x.restore()
}
export function bats(x, t, bridgeY = 940) {
  for (let k = 0; k < 34; k++) {
    const ph = (t * 0.22 + k / 34) % 1, bx = 120 + ph * 980 + Math.sin(k * 3.1) * 60, by = bridgeY - ph * 640 + Math.sin(t * 3 + k) * 30, w = Math.sin(t * 14 + k) > 0 ? 12 : 4
    x.fillStyle = INK; x.fillRect(bx - 4, by - 3, 8, 7); x.fillRect(bx - 16, by - w, 12, 5); x.fillRect(bx + 4, by - w, 12, 5)
  }
}
export function dog(x, cx, base, t) {   // a small dog in a red bandana (the Heights)
  const wag = Math.sin(t * 12) * 0.5
  box(x, cx - 60, base - 70, 120, 50, '#c98e4a', 5); box(x, cx + 40, base - 110, 56, 50, '#c98e4a', 5); box(x, cx + 84, base - 92, 22, 14, INK, 2)
  x.fillStyle = INK; x.fillRect(cx + 74, base - 100, 8, 8)
  for (const lx of [-50, -20, 20, 44]) box(x, cx + lx, base - 22, 12, 22, '#c98e4a', 3)
  x.save(); x.translate(cx - 60, base - 64); x.rotate(-0.8 + wag); box(x, -6, -40, 12, 40, '#c98e4a', 3); x.restore()
  x.fillStyle = BRAKE; x.beginPath(); x.moveTo(cx + 36, base - 66); x.lineTo(cx + 96, base - 66); x.lineTo(cx + 66, base - 40); x.fill()
}
export function crawdad(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.fillRect(-34, -16, 68, 32); x.fillStyle = '#d0402a'; x.fillRect(-30, -12, 60, 24); x.fillStyle = INK; x.fillRect(30, -24, 22, 14); x.fillRect(30, 10, 22, 14); x.fillStyle = '#d0402a'; x.fillRect(33, -21, 16, 8); x.fillRect(33, 13, 16, 8); x.fillStyle = 'rgba(0,0,0,0.25)'; for (let k = 0; k < 3; k++) x.fillRect(-24 + k * 14, -12, 4, 24); x.restore()
}
export function snow(x, t) { for (let k = 0; k < 10; k++) { const ph = (t * 0.3 + k / 10) % 1; const cx = (k * 113) % 1080, cy = 40 + ph * 600; x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(cx - 10, cy - 2, 20, 4); x.fillRect(cx - 2, cy - 10, 4, 20) } }
export function boba(x, cx, cy, s = 1, col = '#e8c8a0') { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.moveTo(-46, -70); x.lineTo(46, -70); x.lineTo(34, 70); x.lineTo(-34, 70); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(-40, -60); x.lineTo(40, -60); x.lineTo(30, 64); x.lineTo(-30, 64); x.fill(); x.fillStyle = INK; for (let k = 0; k < 7; k++) { x.beginPath(); x.arc(-20 + (k % 4) * 13, 40 + Math.floor(k / 4) * 12, 6, 0, Math.PI * 2); x.fill() } box(x, -6, -120, 12, 60, PINK, 3); x.restore() }
export function bowl(x, cx, cy, t, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 86, 0, Math.PI); x.fill(); x.fillStyle = '#f4efe4'; x.beginPath(); x.arc(0, 0, 78, 0, Math.PI); x.fill(); x.fillStyle = '#d8a050'; x.fillRect(-78, -10, 156, 14); x.fillStyle = '#7dbf5a'; x.fillRect(-30, -16, 20, 8); x.fillRect(16, -16, 20, 8); for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; x.strokeStyle = `rgba(255,255,255,${(0.7 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(-30 + k * 30, -30 - ph * 120); x.quadraticCurveTo(-10 + k * 30, -60 - ph * 120, -30 + k * 30, -90 - ph * 120); x.stroke() } x.restore() }
export function raspa(x, cx, cy, s = 1, col = '#ff5a6e') { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.moveTo(-50, -10); x.lineTo(50, -10); x.lineTo(30, 90); x.lineTo(-30, 90); x.fill(); x.fillStyle = BONE; x.beginPath(); x.moveTo(-44, -4); x.lineTo(44, -4); x.lineTo(26, 84); x.lineTo(-26, 84); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 56, Math.PI, 0); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(0, -10, 50, Math.PI, 0); x.fill(); x.fillStyle = '#ffd36b'; x.fillRect(-20, -46, 26, 14); x.restore() }
export function mic(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -10, 0, 20, 120, '#8f96a0', 4); x.fillStyle = INK; x.beginPath(); x.arc(0, -20, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c0c4cc'; x.beginPath(); x.arc(0, -20, 33, 0, Math.PI * 2); x.fill(); x.restore() }
export function paddle(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.rotate(0.3); x.scale(s, s); box(x, -10, 40, 20, 80, '#6b4a2c', 4); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -10, 56, 66, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5ec8ff'; x.beginPath(); x.ellipse(0, -10, 48, 58, 0, 0, Math.PI * 2); x.fill(); x.restore(); x.fillStyle = INK; x.beginPath(); x.arc(cx + 60 * s, cy + 50 * s, 22 * s, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d8f05a'; x.beginPath(); x.arc(cx + 60 * s, cy + 50 * s, 17 * s, 0, Math.PI * 2); x.fill() }
export function kingCake(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 110, 56, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d9a55a'; x.beginPath(); x.ellipse(0, 0, 102, 48, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8d8c0'; x.beginPath(); x.ellipse(0, 0, 44, 18, 0, 0, Math.PI * 2); x.fill(); for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2; x.fillStyle = ['#8a3ab0', '#3a9a4a', '#f2c75c'][k % 3]; x.fillRect(Math.cos(a) * 74 - 8, Math.sin(a) * 34 - 6, 16, 12) } x.restore() }
export function boots(x, cx, base, s = 1) { for (const dx of [-40, 40]) { x.save(); x.translate(cx + dx * s, base); x.scale(s, s); box(x, -20, -110, 40, 90, '#8a4a2a', 5); box(x, -20, -26, 70, 26, '#8a4a2a', 5); x.fillStyle = GOLD; x.fillRect(-12, -90, 24, 6); x.restore() } }
export function lantern(x, cx, cy, t) { x.save(); x.translate(cx, cy + Math.sin(t * 2) * 6); x.fillStyle = INK; x.fillRect(-4, -70, 8, 30); x.beginPath(); x.ellipse(0, 0, 64, 48, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e0303a'; x.beginPath(); x.ellipse(0, 0, 58, 42, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.fillRect(-58, -4, 116, 8); x.fillRect(-6, 40, 12, 30); x.restore() }
export function clipboard(x, P, id) { const [cx, cy, s] = P.at(id); box(x, cx + s * 0.32, cy - s * 0.1, s * 0.3, s * 0.38, '#c98e5a', 4); box(x, cx + s * 0.36, cy - s * 0.04, s * 0.22, s * 0.28, BONE, 2); for (let k = 0; k < 3; k++) { x.fillStyle = INK; x.fillRect(cx + s * 0.39, cy + s * 0.02 + k * s * 0.07, s * 0.15, 4) } }
export function thermo(x, cx, cy, read = '55°', col = '#5ec8ff') { box(x, cx - 90, cy - 50, 180, 100, '#120c24', 6); txt(x, read, cx, cy + 4, { size: 56, col, font: MONO, weight: 700 }) }
export const PROPS = {
  taco: (x, cx, cy) => taco(x, cx, cy, 1.4), kolache: (x, cx, cy) => kolache(x, cx, cy, 1.2), klob: (x, cx, cy) => klobasnek(x, cx, cy, 1.1),
  both: (x, cx, cy) => { kolache(x, cx - 70, cy, 0.9); klobasnek(x, cx + 70, cy, 0.8) },
  boba: (x, cx, cy) => boba(x, cx, cy - 20, 1.1), bowl: (x, cx, cy, t) => bowl(x, cx, cy, t), raspa: (x, cx, cy) => raspa(x, cx, cy - 30, 1.1), mango: (x, cx, cy) => raspa(x, cx, cy - 30, 1.1, '#ffa82a'),
  mic: (x, cx, cy) => mic(x, cx, cy - 60, 1.2), paddle: (x, cx, cy) => paddle(x, cx, cy - 40, 1.1), crawfish: (x, cx, cy) => { for (let k = 0; k < 5; k++) crawdad(x, cx - 80 + (k % 3) * 80, cy - Math.floor(k / 3) * 40, 1) },
  kingcake: (x, cx, cy) => kingCake(x, cx, cy), boots: (x, cx, cy) => boots(x, cx, cy + 60, 1.1), lantern: (x, cx, cy, t) => lantern(x, cx, cy - 120, t),
  thermo: (x, cx, cy) => thermo(x, cx, cy - 80), thermo80: (x, cx, cy) => thermo(x, cx, cy - 80, '81°', BRAKE), soup: (x, cx, cy, t) => soupPot(x, cx, cy, t),
  car: (x, cx, cy, t) => car(x, cx, cy + 40, '#7a8fd8', { s: 0.9 }), dog: (x, cx, cy, t) => dog(x, cx, cy + 110, t), sun: (x, cx, cy, t) => heatSun(x, cx, cy - 120, t, 60),
  heart: (x, cx, cy, t) => { x.save(); x.translate(cx, cy - 60); const p = 1 + 0.12 * Math.sin(t * 8); x.scale(p, p); x.fillStyle = INK; x.beginPath(); x.arc(-28, -10, 40, 0, Math.PI * 2); x.arc(28, -10, 40, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(-66, 4); x.lineTo(0, 76); x.lineTo(66, 4); x.fill(); x.fillStyle = PINK; x.beginPath(); x.arc(-28, -10, 33, 0, Math.PI * 2); x.arc(28, -10, 33, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(-58, 4); x.lineTo(0, 66); x.lineTo(58, 4); x.fill(); x.restore() },
  phone: (x, cx, cy) => { box(x, cx - 70, cy - 200, 140, 250, INK, 4); x.fillStyle = '#bfe6ff'; x.fillRect(cx - 58, cy - 186, 116, 222); box(x, cx - 46, cy - 160, 92, 40, BONE, 3); box(x, cx - 40, cy - 100, 80, 40, PINK, 3) },
  sweater: (x, cx, cy) => { box(x, cx - 80, cy - 120, 160, 140, '#8a3ab0', 6); box(x, cx - 130, cy - 120, 50, 110, '#8a3ab0', 5); box(x, cx + 80, cy - 120, 50, 110, '#8a3ab0', 5); for (let k = 0; k < 3; k++) { x.fillStyle = BONE; x.fillRect(cx - 70, cy - 90 + k * 36, 140, 8) } },
}

// ── flags
export const FLAGCOL = { green: '#2faa5a', red: '#e0303a', beige: '#d9c3a0', tip: GOLD }
export const FLAGTXT = { green: 'GREEN FLAG', red: 'RED FLAG', beige: 'BEIGE FLAG', tip: 'THE FIX' }
/** a pixel flag on a pole, waving (cloth drawn in strips) */
export function flag(x, px, top, base, col, t, { w = 240, h = 160, k = 1 } = {}) {
  if (k <= 0) return
  box(x, px - 9, top, 18, base - top, '#c0c4cc', 5); x.fillStyle = GOLD; x.beginPath(); x.arc(px, top - 6, 16, 0, Math.PI * 2); x.fill()
  const W = w * clamp(k), N = 12, sw = W / N
  for (let i = 0; i < N; i++) { const off = Math.sin(t * 6 - i * 0.6) * 10 * (i / N), y0 = top + 12 + off; x.fillStyle = INK; x.fillRect(px + 9 + i * sw - 1, y0 - 5, sw + 2, h + 10); }
  for (let i = 0; i < N; i++) { const off = Math.sin(t * 6 - i * 0.6) * 10 * (i / N), y0 = top + 12 + off, shade = Math.sin(t * 6 - i * 0.6) > 0.3 ? 0.12 : 0; x.fillStyle = col; x.fillRect(px + 9 + i * sw, y0, sw + 1, h); if (shade) { x.fillStyle = `rgba(0,0,0,${shade})`; x.fillRect(px + 9 + i * sw, y0, sw + 1, h) } }
}

// ── scene builders
const LOOK = [0, 0.15]   // pupils centred: the star looks at you
export const crowd = (y = Y, size = 150) => Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 120 + (i % 6) * 168, i < 6 ? y - 210 : y, size]]]))
export const wave = (ids = SIGN_IDS) => Object.fromEntries(ids.map((id, i) => [id, [0.02 + (i % 6) * 0.07 + (i < 6 ? 0 : 0.04), 1.2 + (i % 6) * 0.07]]))
export const allMood = m => Object.fromEntries(SIGN_IDS.map((id, i) => [id, Array.isArray(m) ? m[i % m.length] : m]))
const DEFMOOD = { aries: 'sparkle', taurus: 'happy', gemini: 'wink', cancer: 'heart', leo: 'sparkle', virgo: 'squint', libra: 'wide', scorpio: 'wink', sagittarius: 'happy', capricorn: 'neutral', aquarius: 'eyeroll', pisces: 'heart' }
export const moodOf = id => DEFMOOD[id]

/** intro scene: the hook plays over a busy Houston set with a hop wave (frame 0 already moving) */
export function intro({ set, dur = 2.7, cast = 'crowd', front = null, ids = null, y = Y, size = 150 }) {
  const c = cast === 'crowd' ? crowd(y, size) : Object.fromEntries((ids || []).map((id, i, a) => [id, [[0, 540 + (i - (a.length - 1) / 2) * 300, Y + 20, 250]]]))
  const who = Object.keys(c)
  return { dur, set: SETS[set], front, cast: c, hops: wave(who), mood: Object.fromEntries(who.map((id, i) => [id, ['sparkle', 'wide', 'happy', 'heart', 'wink'][i % 5]])), look: Object.fromEntries(who.map(id => [id, LOOK])) }
}
/** a sign card: the star looks at you, a green street sign names the place, a prop sits beside it */
export function card(id, set, i, { place, lines, prop, dur = 2.8, stick, mood, sticker, size = 280, extra } = {}) {
  const left = i % 2 === 0, sx = left ? 320 : 760, px = left ? 790 : 290
  return {
    dur,
    set: (x, t, lt) => { SETS[set](x, t, lt); if (place) streetSign(x, 540, 560, place, { k: Kp(lt, 0.02), pole: false }) },
    front: (x, t, lt, P) => { nameTag(x, id, sx, Y + 175); if (prop) { x.save(); PROPS[prop](x, px, 1250, t, lt); x.restore() } if (sticker) { const [txt0, bg, at = 0.1] = sticker; label(x, 540, 700, txt0, Kp(lt, at), { size: 44, bg, rot: -0.04 }) } extra?.(x, t, lt, P) },
    cast: { [id]: [[0, sx, Y, size]] }, mood: { [id]: mood || DEFMOOD[id] }, look: { [id]: LOOK },
    lines: (Array.isArray(lines) ? lines : [[0.15, dur - 0.4, lines]]).map(([a, d, s]) => [a, d, id, s]), stick,
  }
}
/** a flag card: the star next to a waving flag; the flag's colour and its name pop in */
export function flagCard(id, set, i, { kind, line, dur = 2.9, flip = null, at = 0.25, mood } = {}) {
  const left = i % 2 === 0, sx = left ? 320 : 730, px = left ? 720 : 330, fw = 260
  const fx = left ? px : px - fw - 18
  const kindAt = lt => (flip && lt > flip[0] ? flip[1] : kind)
  return {
    dur,
    set: (x, t, lt) => { SETS[set](x, t, lt) },
    back: (x, t, lt) => { const kd = kindAt(lt), k = Kp(lt, at, 0.35); if (left) flag(x, px, 780, GND, FLAGCOL[kd], t, { w: fw, k }); else { x.save(); x.translate(2 * px, 0); x.scale(-1, 1); flag(x, px, 780, GND, FLAGCOL[kd], t, { w: fw, k }); x.restore() } },
    front: (x, t, lt) => {
      nameTag(x, id, sx, Y + 175); const kd = kindAt(lt), a = flip && lt > flip[0] ? flip[0] : at
      label(x, 540, 560, FLAGTXT[kd], Kp(lt, a + 0.05, 0.3), { size: 54, bg: FLAGCOL[kd], color: kd === 'beige' || kd === 'tip' ? INK : BONE, rot: kd === 'red' ? 0.04 : -0.04, font: INTER })
      if (flip && lt > flip[0] && lt < flip[0] + 0.5) sparkles(x, t, 540, 560, t - lt + flip[0], 12, 260, 7)
    },
    cast: { [id]: [[0, sx, Y, 280]] }, mood: { [id]: typeof mood === 'function' ? mood : mood || DEFMOOD[id] }, look: { [id]: LOOK },
    lines: (Array.isArray(line) ? line : [[at + 0.15, dur - at - 0.5, line]]).map(([a, d, s]) => [a, d, id, s]),
  }
}
/** a closing prompt over the crowd ("comment your sign…") */
export function outro({ set = 'night', big, lines = [], dur = 3.2, ids = null }) {
  const c = ids ? Object.fromEntries(ids.map((id, i, a) => [id, [[0, 540 + (i - (a.length - 1) / 2) * 280, Y + 20, 230]]])) : crowd()
  const who = Object.keys(c)
  return { dur, set: SETS[set], cast: c, hops: wave(who), mood: Object.fromEntries(who.map(id => [id, 'happy'])), look: Object.fromEntries(who.map(id => [id, LOOK])),
    front: (x, t, lt) => { const k = Kp(lt, 0.1, 0.35); if (k <= 0) return; x.save(); x.globalAlpha = clamp(k); box(x, 90, 520, 900, 120 + lines.length * 76, 'rgba(14,9,32,0.88)', 6); txt(x, big, 540, 590, { size: 84, col: GOLD }); lines.forEach((l, j) => txt(x, l, 540, 680 + j * 76, { size: 56, col: BONE })); x.restore() } }
}
/** a ★ LESSON UNLOCKED beat (the OG Star Talk banner) */
export function lesson(id, set, { a, b, dur = 3.6, size = 260 } = {}) {
  return { dur, set: SETS[set], cast: { [id]: [[0, 540, Y, size]] }, mood: { [id]: 'heart' }, look: { [id]: LOOK }, hops: { [id]: [0.2, 0.9] },
    front: (x, t, lt) => {
      const k = Kp(lt, 0.15, 0.35); if (k <= 0) return
      x.save(); x.translate(540, 520); x.scale(k, k); box(x, -400, -70, 800, 140, '#1c1240', 8); x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(-388, -58, 776, 116); txt(x, '★ LESSON UNLOCKED', 0, 4, { size: 54, col: GOLD, font: MONO, weight: 700 }); x.restore()
      if (lt > 0.3) sparkles(x, t, 540, 520, t - lt + 0.3, 14, 380, 11)
      const k2 = clamp((lt - 0.7) / 0.3); if (k2 > 0) { x.save(); x.globalAlpha = k2; box(x, 80, 640, 920, 220, 'rgba(14,9,32,0.88)', 6); txt(x, a, 540, 710, { size: 58, col: BONE }); txt(x, b, 540, 790, { size: 62, col: GOLD, font: SERIF, weight: 500, italic: true }); x.restore() }
    } }
}
export const LEVELUP = (t0, base = 523.25) => [0, 1, 2, 3].map(i => ['bell', +(t0 + i * 0.09).toFixed(2), base * [1, 1.26, 1.5, 2][i], 0.012, 0.6, 0])
export { partyCard, sparkles, label, txt, box, clamp, prog, ease, GOLD, BONE, PINK, INK, MONO, SERIF, SIGN_IDS, puffer, sweat, streetSign, skyline, BRAKE, HGREEN, MINT, SKYB, LAV }
