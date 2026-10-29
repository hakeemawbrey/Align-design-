// st9caphome — Capricorn's home for Star Talk season 9 "A Day in the Life" (promo/films/STARTALK10.md, S9 E46–50).
// Owned by the Sag + Capricorn session. Same diorama box (DIO) and kit as st9saghome.js. Pure f(t), no `document` at top level.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { CAP, CAP_EP, CAP_SPOTS, drawCapHome, drawCapHomeFront, drawCap, saturnClock, wallCalendar, drawSheet } from '../../st9caphome.js'
//
// drawCapHome(ctx, t, { room = 'bed', ep = 'am', dark = 0, lamp = 0, clock = '5:00', friday = 'free', rain = 0 })
//   room  'bed' | 'kitchen' | 'desk' | 'window'. Each room's window is a hole (the sky you drew shows through); the window
//         room's has a pixel mountain range at the bottom of the glass.
//   ep    'am' | 'work' | 'love' | 'crew' | '3am': the binge detail. The little goat pin on the mountain poster climbs one
//         ledge per episode and sits on the summit at 3 AM (resting, not climbing).
//   The three recurring props: the wall calendar (season 4: "BOOKED TILL 2031", every square WORK but one Friday;
//   friday = 'free' (glowing, empty) | 'mtg' (a scribbled "MTG?") | 'heart' (a pink ♥)), the Saturn alarm clock
//   (clock = the time it shows) and the tie on its hook (it is on the hook only when Capricorn isn't wearing it).
//   dark 0…1 night overlay (window kept clear) · lamp 0…1 the brass reading lamp / desk lamp glow · rain 0…1 streaks on
//   the glass (E49). noChair: true clears the armchair out of the window room (E49 needs the floor).
// drawCapHomeFront(ctx, t, opts)  pieces in front of a character: the blanket ('bed'), the desk front + the monitor
//   backs ('desk'), the armchair arm ('window').
// drawCap(ctx, x, y, size, t, opts)  the green ♑ star with its pixel tie (opts.tie = true | 'loose' | false) plus every
//   drawStarChar opt. Returns { x, y, size, top }.
// saturnClock(ctx, cx, cy, r, t, { time, ring = false })   the ringed alarm clock (it shakes while ring is true).
// wallCalendar(ctx, x0, y0, w, h, t, { friday = 'free', glow = 1 })   the BOOKED TILL 2031 calendar.
// CAP = { id, tag: '♑ CAP', color, glyph }   CAP_SPOTS = { room: { x, y, from, where } }   CAP_EP
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp } from '../src/lib.js'
import { drawStarChar, signStar } from './startalk.js'
import { drawBits } from './st5cast.js'
import { DIO, R, blk } from './st9saghome.js'

const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c'
const MONO = "'Space Mono', ui-monospace, monospace"
export const CAP_EP = ['am', 'work', 'love', 'crew', '3am']
const S0 = signStar('capricorn')
export const CAP = { id: 'capricorn', tag: '♑ CAP', color: S0.color, glyph: S0.glyph }

const P = {
  wall: '#1d3b38', wall2: '#244a45', panel: '#2b5750', panelHi: '#356960', trim: '#d9b45a', trim2: '#9c7a32',
  floor: '#4a3a33', floor2: '#3b2e29', floorLine: '#2e2420', rug: '#2f6e60', rug2: '#d9b45a',
  wood: '#5d4335', wood2: '#4a3429', woodHi: '#7a5a46',
  blanket: '#2f8a6e', blanket2: '#47b08f', blanketLo: '#1f5f4c', sheet: BONE, pillow: '#f7efe2',
  metal: '#9aa3b2', metalLo: '#6c7484', counter: '#d8d4cc', screen: '#cfe8ff',
  snow: '#f4f1ea', rock: '#7f8a97', rock2: '#5d6673',
}
const ROOMS = {
  bed: { win: { x0: 640, y0: 650, x1: 960, y1: 950 } },
  kitchen: { win: { x0: 560, y0: 640, x1: 920, y1: 930 } },
  desk: { win: { x0: 790, y0: 650, x1: 990, y1: 900 } },
  window: { win: { x0: 300, y0: 620, x1: 980, y1: 1120 } },
}
export const CAP_SPOTS = {
  bed: { x: 654, y: 1150, from: 'right', where: 'leaning out from behind the nightstand under the Saturn clock' },
  kitchen: { x: 300, y: 928, from: 'below', where: 'rising from behind the coffee machine on the counter' },
  desk: { x: 407, y: 760, from: 'left', where: 'leaning out from behind the BOOKED TILL 2031 calendar' },
  window: { x: 200, y: 1014, from: 'below', where: 'rising over the reading-lamp shade by the armchair' },
  desk3am: { x: 896, y: 1068, from: 'left', where: 'leaning out from behind the right-hand monitor' },
}
const epIdx = ep => Math.max(0, CAP_EP.indexOf(ep))

function backWall(x, win) {
  const { x0, x1, y0, floor } = DIO
  x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, floor - y0); x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0); x.clip('evenodd')
  R(x, P.wall, x0, y0, x1 - x0, floor - y0)
  for (let i = 0; i < 12; i++) R(x, P.wall2, x0 + 20 + i * 84, y0, 6, floor - y0)          // pinstripe
  // wainscot panels
  R(x, P.panel, x0, floor - 190, x1 - x0, 190)
  for (let i = 0; i < 7; i++) { R(x, P.panelHi, x0 + 24 + i * 140, floor - 166, 110, 6); R(x, P.wall, x0 + 24 + i * 140, floor - 160, 110, 120) }
  R(x, P.trim, x0, floor - 196, x1 - x0, 8)
  x.restore()
  const fw = 14
  R(x, INK, win.x0 - fw - 6, win.y0 - fw - 6, win.x1 - win.x0 + 2 * fw + 12, win.y1 - win.y0 + 2 * fw + 12)
  x.save(); x.beginPath(); x.rect(win.x0 - fw - 6, win.y0 - fw - 6, win.x1 - win.x0 + 2 * fw + 12, win.y1 - win.y0 + 2 * fw + 12); x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0); x.clip('evenodd')
  R(x, INK, win.x0 - fw - 6, win.y0 - fw - 6, win.x1 - win.x0 + 2 * fw + 12, win.y1 - win.y0 + 2 * fw + 12)
  R(x, P.trim, win.x0 - fw, win.y0 - fw, win.x1 - win.x0 + 2 * fw, win.y1 - win.y0 + 2 * fw)
  R(x, P.trim2, win.x0 - 6, win.y0 - 6, win.x1 - win.x0 + 12, win.y1 - win.y0 + 12)
  x.restore()
  // panes (a grid: 3 × 2)
  for (let i = 1; i < 3; i++) { const mx = Math.round(lerp(win.x0, win.x1, i / 3)); R(x, INK, mx - 4, win.y0, 8, win.y1 - win.y0) }
  const my = Math.round((win.y0 + win.y1) / 2); R(x, INK, win.x0, my - 4, win.x1 - win.x0, 8)
  R(x, INK, win.x0 - 30, win.y1 + 16, win.x1 - win.x0 + 60, 18); R(x, P.trim, win.x0 - 24, win.y1 + 18, win.x1 - win.x0 + 48, 10)
}
function floorAndBox(x) {
  const { x0, x1, y0, y1, floor } = DIO
  R(x, P.floor, x0, floor, x1 - x0, y1 - floor)
  for (let j = 0; j < 4; j++) {
    const yy = floor + 8 + j * 50
    R(x, P.floorLine, x0, yy + 44, x1 - x0, 4)
    for (let i = 0; i < 5; i++) R(x, P.floorLine, x0 + ((i * 230 + j * 115) % (x1 - x0)), yy, 4, 46)
  }
  R(x, P.floor2, x0, y1 - 26, x1 - x0, 26)
  R(x, INK, x0 - 14, y0 - 14, x1 - x0 + 28, 14); R(x, INK, x0 - 14, y1, x1 - x0 + 28, 14)
  R(x, INK, x0 - 14, y0 - 14, 14, y1 - y0 + 28); R(x, INK, x1, y0 - 14, 14, y1 - y0 + 28)
  R(x, '#2f5a54', x0, y0, x1 - x0, 10)
}
function rug(x, cx, y, w) {
  R(x, INK, cx - w / 2 - 6, y - 6, w + 12, 50); R(x, P.rug, cx - w / 2, y, w, 38)
  for (let i = 0; i < w; i += 48) R(x, P.rug2, cx - w / 2 + i + 10, y + 16, 24, 6)
}

/** the season-4 calendar: BOOKED TILL 2031, every square WORK but one Friday */
export function wallCalendar(x, x0, y0, w, h, t, { friday = 'free', glow = 1 } = {}) {
  blk(x, x0, y0, w, h, BONE, { o: 7 })
  R(x, '#c94a4a', x0, y0, w, Math.round(h * 0.17))
  x.font = `700 ${Math.round(h * 0.085)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
  x.fillText('BOOKED TILL 2031', x0 + w / 2, y0 + h * 0.09)
  const gx = x0 + 10, gy = y0 + h * 0.21, cw = (w - 20) / 5, ch = (h * 0.77) / 4
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) {
    const cx = gx + i * cw, cy = gy + j * ch, isFri = i === 4 && j === 2
    R(x, '#cfc6b4', cx + 2, cy + 2, cw - 4, ch - 4)
    if (!isFri) { R(x, '#3d6f66', cx + 7, cy + ch * 0.35, cw - 14, 5); R(x, '#3d6f66', cx + 7, cy + ch * 0.6, cw * 0.5, 5); continue }
    const pulse = 0.6 + 0.4 * Math.sin(t * 4)
    R(x, '#fff8de', cx + 2, cy + 2, cw - 4, ch - 4)
    if (friday === 'free' && glow > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * pulse * glow; x.fillStyle = '#ffe9a0'; x.fillRect(cx - 8, cy - 8, cw + 16, ch + 16); x.restore()
      R(x, GOLD, cx + 2, cy + 2, cw - 4, 4); R(x, GOLD, cx + 2, cy + ch - 6, cw - 4, 4)
    }
    if (friday === 'mtg') { x.font = `700 ${Math.round(ch * 0.36)}px ${MONO}`; x.fillStyle = '#c94a4a'; x.fillText('MTG?', cx + cw / 2, cy + ch / 2) }
    if (friday === 'heart') drawBits(x, ['.H.H.', 'HHHHH', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86' }, Math.round(cx + cw / 2), Math.round(cy + ch / 2), Math.max(3, Math.round(ch / 9)))
  }
  x.textAlign = 'left'; x.textBaseline = 'alphabetic'
}
/** the mountain poster: the goat pin climbs a ledge per episode, sits on the summit at 3 AM */
function mountainPoster(x, x0, y0, w, h, ep, t) {
  blk(x, x0, y0, w, h, '#2a3f5f', { o: 7 })
  R(x, P.trim, x0 - 2, y0 - 2, w + 4, 4)
  const base = y0 + h - 8, peak = { x: x0 + w * 0.55, y: y0 + h * 0.16 }
  for (let yy = peak.y; yy < base; yy += 6) {
    const k = (yy - peak.y) / (base - peak.y), hw = k * w * 0.48
    R(x, k < 0.22 ? P.snow : (Math.floor(yy / 6) % 3 ? P.rock : P.rock2), peak.x - hw, yy, hw * 2, 6)
  }
  // switchback ledges + the goat
  const L = [0.92, 0.74, 0.56, 0.38, 0.06]
  for (let i = 0; i < 4; i++) { const yy = lerp(peak.y, base, L[i]); R(x, '#c9a86a', peak.x - (i % 2 ? -1 : 1) * w * 0.12 - 14, yy, 28, 4) }
  const i = epIdx(ep), yy = lerp(peak.y, base, L[i]), gx = i === 4 ? peak.x : peak.x - (i % 2 ? -1 : 1) * w * 0.12
  const hop = i === 4 ? 0 : Math.round(Math.max(0, Math.sin(t * 3)) * 3)
  R(x, INK, gx - 9, yy - 16 - hop, 18, 12); R(x, BONE, gx - 7, yy - 14 - hop, 14, 8); R(x, INK, gx + 5, yy - 22 - hop, 4, 6)   // the goat
  if (i === 4) { R(x, '#ff4f6e', peak.x + 10, peak.y - 26, 4, 24); R(x, '#ff4f6e', peak.x + 14, peak.y - 26, 14, 10) }          // summit flag
}
/** Saturn alarm clock: a ringed pixel planet with an LCD face */
export function saturnClock(x, cx, cy, r, t, { time = '5:00', ring = false } = {}) {
  const sh = ring ? Math.round(Math.sin(t * 60) * 4) : 0
  x.save(); x.translate(cx + sh, cy)
  if (ring) { x.fillStyle = GOLD; for (const s of [-1, 1]) for (let k = 0; k < 3; k++) x.fillRect(s * (r * 1.7 + k * 10), -r * 0.9 - k * 8, 6 * s, 16) }
  const c = Math.max(3, Math.round(r / 6))
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5); if (d > 6.4) continue
    R(x, d > 5.5 ? INK : (j < -1 ? '#f0d9a0' : j < 2 ? '#e2bf72' : '#c99a4c'), i * c, j * c, c, c)
  }
  R(x, INK, -r * 1.7, -c, r * 3.4, 3 * c); R(x, '#a58cd0', -r * 1.6, 0, r * 3.2, c)        // the ring
  R(x, INK, -r * 0.8, -r * 0.55, r * 1.6, r * 0.62); R(x, '#123a2c', -r * 0.72, -r * 0.48, r * 1.44, r * 0.48)
  x.font = `700 ${Math.round(r * 0.42)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#7dffb8'
  x.fillText(time, 0, -r * 0.24); x.textAlign = 'left'; x.textBaseline = 'alphabetic'
  R(x, INK, -r * 0.7, r, r * 0.3, c * 1.5); R(x, INK, r * 0.4, r, r * 0.3, c * 1.5)
  x.restore()
}
const TIE = ['.KK.', 'KTTK', '.TT.', '.TT.', 'TTTT', 'TTsT', 'TTTT', '.TT.']
const TIE_C = { K: '#7a1f2b', T: '#c9364a', s: '#e8606f' }
function tieHook(x, cx, cy) { R(x, INK, cx - 14, cy - 10, 28, 10); R(x, P.trim, cx - 3, cy - 4, 6, 14); drawBits(x, TIE, TIE_C, cx, cy + 40, 9) }
function readingLamp(x, cx, base, glow) {
  if (glow > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, base - 230, 0, cx, base - 230, 320)
    g.addColorStop(0, `rgba(255,214,140,${0.5 * glow})`); g.addColorStop(1, 'rgba(255,214,140,0)')
    x.fillStyle = g; x.fillRect(cx - 320, base - 550, 640, 640); x.restore()
  }
  R(x, INK, cx - 4, base - 240, 8, 240); blk(x, cx - 40, base - 12, 80, 12, P.trim2, { o: 4 })
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 70, base - 200); x.lineTo(cx + 70, base - 200); x.lineTo(cx + 44, base - 290); x.lineTo(cx - 44, base - 290); x.fill()
  x.fillStyle = glow > 0 ? '#ffe2a6' : '#c9a86a'; x.beginPath(); x.moveTo(cx - 60, base - 206); x.lineTo(cx + 60, base - 206); x.lineTo(cx + 38, base - 284); x.lineTo(cx - 38, base - 284); x.fill()
}
function coffeeMachine(x, cx, base, t, steam) {
  blk(x, cx - 60, base - 150, 120, 150, '#3a3f4a', { o: 6, hi: '#555c6b' })
  R(x, INK, cx - 40, base - 70, 80, 60); R(x, P.metal, cx - 34, base - 66, 68, 6)
  blk(x, cx - 20, base - 44, 40, 40, BONE, { o: 4 }); R(x, '#7dffb8', cx + 30, base - 130, 10, 10)
  if (steam) for (let k = 0; k < 3; k++) { const p = ((t * 0.8 + k / 3) % 1); x.globalAlpha = (1 - p) * 0.6; R(x, '#ffffff', cx - 10 + k * 10 + Math.sin(t * 3 + k) * 6, base - 60 - p * 70, 6, 10); x.globalAlpha = 1 }
}
function mountainsInWindow(x, win, dark) {
  x.save(); x.beginPath(); x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0); x.clip()
  const w = win.x1 - win.x0
  for (let i = 0; i < w; i += 6) {
    const xx = win.x0 + i
    const h1 = 80 + 70 * Math.abs(Math.sin(i * 0.006 + 0.4)) + 26 * Math.sin(i * 0.031)
    const h2 = 40 + 40 * Math.abs(Math.sin(i * 0.011 + 2))
    R(x, dark > 0.5 ? '#141634' : '#3c4f72', xx, win.y1 - h1, 6, h1)
    if (h1 > 140) R(x, dark > 0.5 ? '#3a3f66' : P.snow, xx, win.y1 - h1, 6, 10)
    R(x, dark > 0.5 ? '#0c0d24' : '#2a3a56', xx, win.y1 - h2, 6, h2)
  }
  x.restore()
}
function rainOn(x, win, t, k) {
  if (k <= 0) return
  x.save(); x.beginPath(); x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0); x.clip()
  x.globalAlpha = 0.55 * k; x.fillStyle = '#bcd4ff'
  for (let i = 0; i < 60; i++) { const xx = win.x0 + ((i * 53.3) % (win.x1 - win.x0)), yy = win.y0 + (((t * 900) + i * 97) % (win.y1 - win.y0 + 60)) - 30; x.fillRect(xx, yy, 3, 26) }
  x.restore()
}

function roomBed(x, t, o) {
  const F = DIO.floor
  mountainPoster(x, 130, 650, 300, 260, o.ep, t)
  if (o.tieOnHook) tieHook(x, 520, 680)
  blk(x, 130, 1000, 470, 150, P.wood, { o: 8, hi: P.woodHi })
  blk(x, 110, 1150, 520, 120, P.sheet, { o: 8 })
  blk(x, 170, 1090, 150, 70, P.pillow, { o: 6, lo: '#d9cfbf' })
  R(x, INK, 110, 1270, 20, 34); R(x, INK, 610, 1270, 20, 34)
  blk(x, 660, 1120, 130, 150, P.wood, { o: 6, hi: P.woodHi }); R(x, P.trim, 714, 1196, 22, 8)
  saturnClock(x, 725, 1068, 38, t, { time: o.clock, ring: o.ring })
  rug(x, 790, F + 70, 340)
}
function roomKitchen(x, t, o) {
  const F = DIO.floor
  wallCalendar(x, 110, 680, 300, 260, t, { friday: o.friday })
  blk(x, 80, 1090, 920, 40, P.counter, { o: 8 }); blk(x, 80, 1130, 920, F - 1130, P.wood, { o: 0, hi: P.woodHi })
  for (let k = 0; k < 5; k++) { R(x, INK, 100 + k * 182, 1150, 162, 110); R(x, P.wood2, 106 + k * 182, 1156, 150, 98); R(x, P.trim, 170 + k * 182, 1170, 22, 6) }
  coffeeMachine(x, 300, 1084, t, o.steam !== false)
  blk(x, 860, 1020, 26, 64, '#c94a4a', { o: 4 }); blk(x, 900, 1040, 60, 44, BONE, { o: 4 })   // hot sauce + sugar
  saturnClock(x, 960, 600 + 40, 24, t, { time: o.clock })
}
function roomDesk(x, t, o) {
  wallCalendar(x, 100, 650, 300, 260, t, { friday: o.friday })
  mountainPoster(x, 450, 650, 280, 240, o.ep, t)
  if (o.tieOnHook) tieHook(x, 760, 950)
}
function roomWindow(x, t, o) {
  const F = DIO.floor, win = ROOMS.window.win
  mountainsInWindow(x, win, o.dark)
  rainOn(x, win, t, o.rain)
  readingLamp(x, 200, F + 10, o.lamp)
  // armchair (the seat: drawCapHomeFront draws the arm in front)
  if (!o.noChair) {
    blk(x, 420, 1020, 300, 180, P.blanket, { o: 8, hi: P.blanket2 })
    blk(x, 400, 1190, 340, 90, P.blanketLo, { o: 8 })
    R(x, INK, 420, 1280, 16, 26); R(x, INK, 700, 1280, 16, 26)
  }
  saturnClock(x, 900, 1210, 26, t, { time: o.clock })
  blk(x, 840, 1250, 120, 50, P.wood, { o: 6 })
  rug(x, 570, F + 80, 420)
}

export function drawCapHome(x, t, o = {}) {
  const opts = { room: 'bed', ep: 'am', dark: 0, lamp: 0, clock: '5:00', friday: 'free', rain: 0, tieOnHook: true, ring: false, ...o }
  const win = ROOMS[opts.room].win
  backWall(x, win)
  floorAndBox(x)
  ;({ bed: roomBed, kitchen: roomKitchen, desk: roomDesk, window: roomWindow })[opts.room](x, t, opts)
  if (opts.dark > 0) {
    const { x0, x1, y0, y1 } = DIO
    x.save(); x.beginPath(); x.rect(x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 28); x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0); x.clip('evenodd')
    x.fillStyle = `rgba(6,10,30,${0.78 * clamp(opts.dark)})`; x.fillRect(x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 28)
    x.restore()
    if (opts.room === 'window' && opts.lamp > 0) readingLamp(x, 200, DIO.floor + 10, opts.lamp)
  }
}
export function drawCapHomeFront(x, t, o = {}) {
  const opts = { room: 'bed', dark: 0, screen: 0, ...o }
  if (opts.room === 'bed') {
    blk(x, 290, 1140, 340, 130, P.blanket, { o: 8, hi: P.blanket2, lo: P.blanketLo })
    R(x, P.sheet, 290, 1140, 340, 18)                                  // hospital-corner fold
  }
  if (opts.room === 'desk') {
    // two monitor backs (the vlog camera sits between them), a desk lamp, the desk
    for (const mx of [270, 690]) { blk(x, mx, 1010, 200, 130, '#2a2f3a', { o: 6, hi: '#3b4250' }); R(x, INK, mx + 90, 1140, 20, 30) }
    if (opts.screen > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(540, 1060, 0, 540, 1060, 420)
      g.addColorStop(0, `rgba(160,210,255,${0.32 * opts.screen})`); g.addColorStop(1, 'rgba(160,210,255,0)')
      x.fillStyle = g; x.fillRect(120, 640, 840, 840); x.restore()
    }
    blk(x, 180, 1170, 720, 36, P.woodHi, { o: 8 }); blk(x, 200, 1206, 680, DIO.floor - 1206 + 40, P.wood, { o: 0 })
    R(x, INK, 200, 1206, 680, 6); for (let k = 0; k < 3; k++) R(x, P.trim, 290 + k * 220, 1240, 40, 6)
  }
  if (opts.room === 'window' && !opts.noChair) blk(x, 690, 1110, 60, 120, P.blanket2, { o: 8 })
  if (opts.dark > 0) {
    x.save(); x.globalAlpha = 0.78 * clamp(opts.dark); x.fillStyle = 'rgb(6,10,30)'
    if (opts.room === 'bed') x.fillRect(282, 1132, 356, 146)
    if (opts.room === 'desk') { x.fillRect(172, 1162, 736, DIO.floor - 1162 + 48); x.globalAlpha *= 0.6; x.fillRect(264, 1004, 212, 166); x.fillRect(684, 1004, 212, 166) }
    if (opts.room === 'window') x.fillRect(682, 1102, 76, 136)
    x.restore()
  }
}

/** the ♑ star with its tie */
export function drawCap(x, cx, cy, size, t, o = {}) {
  const { tie = true, ...rest } = o
  const r = drawStarChar(x, cx, cy, size, t, { color: CAP.color, glyph: size >= 120 ? CAP.glyph : null, glow: 0.8, ...rest })
  if (tie && (rest.pop ?? 1) > 0.05) {
    const c = Math.max(3, Math.round(size / 34 * (rest.pop ?? 1)))
    drawBits(x, TIE, TIE_C, Math.round(r.x + (tie === 'loose' ? c * 2 : 0)), Math.round(r.y + size * 0.2), c, { rot: tie === 'loose' ? 0.35 : 0, alpha: rest.alpha ?? 1 })
  }
  return r
}

// ── the spreadsheet (Capricorn's love language): a pixel laptop-window with a green title bar, a formula bar and a
// two-or-three-column grid whose rows type on.
// drawSheet(ctx, t, { x, y, w = 620, h = 440, title = 'PLAN.xlsx', cols = ['A', 'B'], widths, rows = [], formula = null,
//                     pop = 1, cps = 26, size = 30 })
//   (x, y) = the window's centre. rows: [{ at, cells: ['5:00', 'COFFEE'], check, hl: { at, color }, color }]
//   Each row types on from `at` (cell by cell); check: true adds a green ✓ when it's typed (false = a red ✗ box);
//   hl highlights the row's fill from hl.at (a sweeping marker). formula: a string for the "fx" bar (typed by the caller).
export function drawSheet(x, t, { x: cx, y: cy, w = 620, h = 440, title = 'PLAN.xlsx', cols = ['A', 'B'], widths = null, rows = [], formula = null, pop = 1, cps = 26, size = 30 } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(pop, pop)
  const x0 = -w / 2, y0 = -h / 2
  blk(x, x0, y0, w, h, '#f7f5ef', { o: 8 })
  R(x, '#1f7a4f', x0, y0, w, 46)
  x.font = `700 24px ${MONO}`; x.fillStyle = '#ffffff'; x.textBaseline = 'middle'; x.textAlign = 'left'
  x.fillText(title, x0 + 16, y0 + 24)
  for (let k = 0; k < 3; k++) R(x, '#ffffff', x0 + w - 28 - k * 26, y0 + 18, 14, 10)
  let gy = y0 + 46
  if (formula != null) {
    R(x, '#e6e2d8', x0, gy, w, 46); R(x, '#cfc9bb', x0, gy + 44, w, 2)
    x.font = `italic 700 24px ${MONO}`; x.fillStyle = '#1f7a4f'; x.fillText('fx', x0 + 14, gy + 24)
    x.font = `700 26px ${MONO}`; x.fillStyle = INK; x.fillText(formula, x0 + 62, gy + 24)
    gy += 46
  }
  const n = cols.length, ws = widths || cols.map(() => (w - 44) / n)
  // the header row
  R(x, '#dfe9e2', x0, gy, w, 34)
  let cx2 = x0 + 44
  x.font = `700 20px ${MONO}`; x.fillStyle = '#3d6f66'
  cols.forEach((c, i) => { x.fillText(c, cx2 + 10, gy + 18); cx2 += ws[i] })
  gy += 34
  const rh = Math.min(62, (y0 + h - gy) / Math.max(5, rows.length))
  rows.forEach((r, j) => {
    const ry = gy + j * rh
    R(x, '#dfe9e2', x0, ry, 44, rh); x.font = `700 18px ${MONO}`; x.fillStyle = '#3d6f66'; x.fillText(String(j + 1), x0 + 12, ry + rh / 2)
    if (r.hl && t >= r.hl.at) { const p = clamp((t - r.hl.at) / 0.4); R(x, r.hl.color || '#ffe680', x0 + 44, ry + 2, (w - 44) * p, rh - 4) }
    R(x, '#d6d1c4', x0 + 44, ry + rh - 2, w - 44, 2)
    if (t < r.at) return
    let typed = Math.floor((t - r.at) * cps), cx3 = x0 + 44
    x.font = `700 ${size}px ${MONO}`
    r.cells.forEach((c, i) => {
      const vis = c.slice(0, Math.max(0, typed)); typed -= c.length
      x.fillStyle = r.color || INK; x.fillText(vis, cx3 + 10, ry + rh / 2 + 1)
      cx3 += ws[i]
    })
    const done = r.at + r.cells.join('').length / cps
    if (r.check != null && t >= done) {
      const bx = x0 + w - 50, by = ry + rh / 2 - 15
      if (r.check) { R(x, '#1f9a5f', bx, by, 30, 30); x.fillStyle = '#ffffff'; x.font = `700 24px ${MONO}`; x.fillText('✓', bx + 5, by + 16) }
      else { R(x, '#c94a4a', bx, by, 30, 30); R(x, '#ffffff', bx + 5, by + 5, 20, 20) }
    }
  })
  for (let i = 1; i < n; i++) { const vx = x0 + 44 + ws.slice(0, i).reduce((a, b) => a + b, 0); R(x, '#d6d1c4', vx, gy - 34, 2, h - (gy - 34 - y0)) }
  x.restore(); x.textBaseline = 'alphabetic'
}
