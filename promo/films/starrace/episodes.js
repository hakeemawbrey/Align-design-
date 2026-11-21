// The Star Race · Season 1, between Race 1 and Race 2 (a pairs race: signs race tied in twos). One episode per sign,
// ~40 s each. Each one sets up the sign's Race 2 partner; the twelve together make six pairs:
// Taurus & Cancer · Leo & Aries · Capricorn & Aquarius · Pisces & Scorpio · Libra & Gemini · Sagittarius & Virgo.
// Paired episodes show the same moment from both sides (Taurus's cookie / Cancer's scarves, the same door, the same
// "partners?"). House rules: Pisces cries, kind humour, no real brands, no emoji, no dates.
import {
  FLOOR, box, txt, room, outside, windowStars, table, clock, flyer, board, cookie, saturn, screen, tinyStar,
  signpost, mountain, marbleTrack,
} from './ep.js'
import { prog, ease, clamp } from '../../src/lib.js'
import { notes, sparkles, signChar, SIGN_IDS, GOLD, BONE, PINK, INK, LAV, SKYB, MINT } from '../signs3kit.js'
import { signStar } from '../startalk.js'

const Y = 1255                      // a 260 px star standing on the floor
const COL = Object.fromEntries(SIGN_IDS.map(id => [id, signStar(id).color]))
const K = (lt, a, d = 0.3) => ease.outBack ? clamp(ease.outBack(prog(lt, a, a + d))) : clamp(prog(lt, a, a + d))
const pop = (lt, a) => clamp(prog(lt, a, a + 0.25))

// shared bits
const kitchen = (x, t) => { room(x, { wall: '#4a2840', floor: '#5a3a2a' }); windowStars(x, 270, 760, 300, 260, t); box(x, 720, 640, 260, 30, '#7a4a2c'); for (let i = 0; i < 4; i++) box(x, 740 + i * 60, 600, 40, 40, ['#f2c75c', '#ff8fb1', '#8fe3ff', '#7dffb0'][i], 4) }
function scarf(x, cx, cy, len, a = COL.taurus, b = COL.cancer) { for (let i = 0; i < len; i += 26) box(x, cx + i, cy, 24, 34, (i / 26) % 2 ? a : b, 3) }
function bigCookie(x, cx, cy, k, text = 'PARTNERS?') {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 128, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d9a55a'; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  for (const [a, b] of [[-70, -60], [60, -70], [-40, 70], [80, 40], [0, 90]]) { x.fillStyle = '#6b3b1f'; x.fillRect(a - 9, b - 9, 18, 18) }
  txt(x, text, 0, 4, { size: 40, col: '#fff3f8' }); x.restore()
}
function door(x, cx, open = 0, col = '#7a4a2c') { box(x, cx - 130, FLOOR - 440, 260, 500, '#120c24', 10); x.fillStyle = col; x.fillRect(cx - 130, FLOOR - 440, 260 * (1 - open), 500); x.fillStyle = GOLD; if (open < 0.5) x.fillRect(cx + 70 - 260 * open, FLOOR - 200, 20, 20) }
function rock(x, cx, cy, r = 46) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f88a8'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.fillStyle = '#6d6688'; x.fillRect(cx - r * 0.4, cy - r * 0.3, r * 0.5, r * 0.4) }
function blackHole(x, cx, cy, t, r = 90) {
  for (let k = 0; k < 40; k++) { const a = t * (1.6 + (k % 5) * 0.25) + k * 0.73, rr = r + (k * 37 % 90); x.fillStyle = k % 3 ? '#ff9a3c' : LAV; x.fillRect(cx + Math.cos(a) * rr - 5, cy + Math.sin(a) * rr * 0.45 - 5, 10, 10) }
  x.fillStyle = '#000'; x.beginPath(); x.arc(cx, cy, r * 0.8, 0, Math.PI * 2); x.fill(); x.strokeStyle = 'rgba(255,190,120,0.9)'; x.lineWidth = 6; x.stroke()
}
function flash(x, lt, times) { for (const f of times) { const d = lt - f; if (d > 0 && d < 0.3) { x.fillStyle = `rgba(255,250,235,${(0.55 * (1 - d / 0.3)).toFixed(2)})`; x.fillRect(0, 0, 1080, 1920) } } }
function tieRope(x, a, b) { x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(a[0], a[1]); x.quadraticCurveTo((a[0] + b[0]) / 2, Math.max(a[1], b[1]) + 60, b[0], b[1]); x.stroke(); x.strokeStyle = '#d9a55a'; x.lineWidth = 5; x.stroke() }
function sheet(x, cx, cy, w, h, rows, k = 1) {      // a pixel spreadsheet: rows = [[cells…], …], header first
  board(x, cx, cy, w, h, '#f7f3ea'); const cw = w / rows[0].length, rh = Math.min(70, h / rows.length)
  rows.forEach((r, j) => r.forEach((c, i) => { const l = cx - w / 2 + i * cw, tp = cy - h / 2 + j * rh; x.strokeStyle = '#c9c2b2'; x.lineWidth = 2; x.strokeRect(l, tp, cw, rh); if (j === 0) { x.fillStyle = '#d9f2e4'; x.fillRect(l + 1, tp + 1, cw - 2, rh - 2) } if (j <= Math.ceil(k * rows.length)) txt(x, c, l + cw / 2, tp + rh / 2, { size: 26, weight: j ? 700 : 800, col: c === '100%' || c === 'HELP' ? '#e0314f' : INK }) }))
}
function piano(x, cx) { box(x, cx - 260, FLOOR - 260, 520, 120, '#1e1636', 8); for (let i = 0; i < 13; i++) { x.fillStyle = BONE; x.fillRect(cx - 250 + i * 39, FLOOR - 140, 35, 90) } for (let i = 0; i < 12; i++) if (![2, 6, 9].includes(i % 7)) { x.fillStyle = INK; x.fillRect(cx - 225 + i * 39, FLOOR - 140, 22, 54) } box(x, cx - 240, FLOOR - 50, 30, 100, '#1e1636'); box(x, cx + 210, FLOOR - 50, 30, 100, '#1e1636') }
function scroll(x, cx, top, len, lines) { box(x, cx - 150, top, 300, len, '#fbf4e2', 6); lines.forEach((l, i) => { if (28 + i * 44 < len - 20) txt(x, l, cx, top + 34 + i * 44, { size: 26, weight: 700, col: l.startsWith('+') ? '#1d8a54' : '#c23a4e' }) }) }
function mirror(x, cx, cy) { box(x, cx - 170, cy - 260, 340, 520, '#bfe6ff', 12); x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(cx - 120, cy - 220, 30, 200) }
function bulbMirror(x, cx, cy, t) { mirror(x, cx, cy); for (let i = 0; i < 6; i++) for (const s of [-1, 1]) { const a = 0.6 + 0.4 * Math.sin(t * 3 + i); x.fillStyle = `rgba(255,230,150,${a.toFixed(2)})`; x.beginPath(); x.arc(cx + s * 200, cy - 220 + i * 88, 16, 0, Math.PI * 2); x.fill() } }
function podium(x, cx) { box(x, cx - 260, FLOOR - 140, 170, 200, BONE); box(x, cx - 85, FLOOR - 250, 170, 310, GOLD); box(x, cx + 90, FLOOR - 90, 170, 150, BONE); txt(x, '2', cx - 175, FLOOR - 70, { size: 70 }); txt(x, '1', cx, FLOOR - 170, { size: 80 }); txt(x, '3', cx + 175, FLOOR - 20, { size: 64 }) }
function corkboard(x, t, k) {
  board(x, 540, 780, 820, 520, '#b98a5a')
  const pins = [[240, 620, 'gemini'], [420, 700, 'capricorn'], [620, 640, 'scorpio'], [820, 720, 'pisces'], [330, 900, 'taurus'], [720, 900, 'virgo']]
  x.strokeStyle = '#d0213a'; x.lineWidth = 5; x.beginPath(); pins.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
  pins.forEach(([a, b, id]) => { box(x, a - 50, b - 40, 100, 80, BONE, 4); tinyStar(x, a, b, 26, COL[id]); x.fillStyle = '#d0213a'; x.beginPath(); x.arc(a, b - 40, 9, 0, Math.PI * 2); x.fill() })
  if (k > 0) { x.save(); x.globalAlpha = clamp(k); box(x, 330, 980, 420, 70, GOLD, 5); txt(x, 'BLACK HOLE = 3/3 PODIUM', 540, 1015, { size: 28 }); x.restore() }
}
function screens(x, t, lt, zoom = 0) {
  const W = 300, H = 200
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) {
    const cx = 220 + i * 320, cy = 560 + j * 240
    screen(x, cx, cy, W, H, () => {
      x.fillStyle = '#0b0f26'; x.fillRect(cx - W / 2, cy - H / 2, W, H)
      blackHole(x, cx + 60, cy + 30, t + i + j, 34)
      for (let k = 0; k < 4; k++) { const ph = ((t * 0.5 + k * 0.25 + i * 0.1 + j * 0.17) % 1); tinyStar(x, cx - 120 + ph * 200, cy - 80 + ph * 130, 12, Object.values(COL)[(k + i * 3 + j) % 12]) }
    })
  }
}
function tea(x, cx, cy) { box(x, cx - 26, cy - 24, 52, 48, BONE, 4); x.fillStyle = '#b5774a'; x.fillRect(cx - 20, cy - 18, 40, 10); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.arc(cx + 34, cy, 14, -1.2, 1.2); x.stroke() }
function coinAt(x, cx, cy, spin) { const w = Math.max(6, Math.abs(Math.cos(spin)) * 60); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w / 2 + 5, 35, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.ellipse(cx, cy, w / 2, 30, 0, 0, Math.PI * 2); x.fill() }
function signupBooth(x, title = 'RACE 2 SIGN-UP') { outside(x); box(x, 160, FLOOR - 120, 760, 60, '#7a4a2c'); box(x, 200, FLOOR - 60, 30, 120, '#7a4a2c'); box(x, 850, FLOOR - 60, 30, 120, '#7a4a2c'); box(x, 200, 620, 680, 110, PINK, 8); txt(x, title, 540, 676, { size: 52 }); box(x, 380, FLOOR - 170, 140, 50, BONE, 4) }
function mustache(x, P, id) { const [cx, cy, s] = P.at(id); x.fillStyle = '#3a2412'; x.fillRect(cx - s * 0.2, cy + s * 0.08, s * 0.4, s * 0.07); x.fillRect(cx - s * 0.26, cy + s * 0.11, s * 0.08, s * 0.06); x.fillRect(cx + s * 0.18, cy + s * 0.11, s * 0.08, s * 0.06) }
function workshop(x, t) { room(x, { wall: '#1f3b4a', floor: '#2b2b3a' }); board(x, 300, 700, 380, 300, '#2a5c9a'); txt(x, 'MARBLE 2.0', 300, 620, { size: 40, col: BONE }); x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.arc(300, 740, 80, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.moveTo(220, 740); x.lineTo(380, 740); x.stroke(); for (let i = 0; i < 5; i++) box(x, 640 + i * 70, 560, 20, 120 + (i % 2) * 40, ['#8f88a8', '#c9a6ff', '#8fe3ff', '#f2c75c', '#ff8fb1'][i], 4) }
function bubbleMarble(x, cx, cy, r = 220, t = 0) { x.save(); x.globalAlpha = 0.35; x.fillStyle = '#bfefff'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore(); x.strokeStyle = '#eafcff'; x.lineWidth = 10; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke(); x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(cx - r * 0.55, cy - r * 0.6, 30, 70) }
function backpack(x, P, id) { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.62, cy - s * 0.15, s * 0.28, s * 0.42, '#7a5a3a', 5) }
function clipboard(x, P, id, dx = 0.5) { const [cx, cy, s] = P.at(id); box(x, cx + s * dx - 40, cy - 10, 80, 104, BONE, 5); x.fillStyle = '#8a6a4a'; x.fillRect(cx + s * dx - 20, cy - 20, 40, 16); for (let i = 0; i < 3; i++) { x.fillStyle = '#9a92a8'; x.fillRect(cx + s * dx - 28, cy + 18 + i * 22, 56, 6) } }

export const EPISODES = {
  // ── Taurus & Cancer ───────────────────────────────────────────────────────────
  taurus: {
    hook: 'Race 2 is a pairs race. | Taurus trains | by baking.', pair: ['taurus', 'cancer'],
    lesson: ['Training can look like', 'taking care of each other.'],
    scenes: [
      { dur: 5, title: "TAURUS'S KITCHEN", set: (x, t, lt) => { kitchen(x, t); flyer(x, 800, 860, K(lt, 0.3)) },
        cast: { taurus: [[0, 420, Y]] }, mood: { taurus: lt => lt < 2.8 ? 'wide' : 'happy' }, look: { taurus: [0.8, -0.2] },
        lines: [[0.6, 2.0, 'taurus', 'race 2 is | PAIRS?'], [3.0, 1.8, 'taurus', 'okay. | snacks first.']] },
      { dur: 6, set: (x, t) => kitchen(x, t), cast: { taurus: [[0, 540, 1000]] }, mood: { taurus: 'happy' },
        front: (x, t, lt) => { table(x, 540, 620, 1210); box(x, 420, 1130, 240, 80, '#c9e4f0', 6); const a = lt * 4; x.strokeStyle = '#8a6a4a'; x.lineWidth = 12; x.beginPath(); x.moveTo(540 + Math.cos(a) * 40, 1150); x.lineTo(560 + Math.cos(a) * 60, 1060); x.stroke(); for (let k = 0; k < 8; k++) { const ph = (lt * 0.8 + k / 8) % 1; x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(480 + k * 18, 1120 - ph * 160, 10, 10) } },
        lines: [[0.4, 2.0, 'taurus', 'training: | slow stirring.'], [3.2, 2.2, 'taurus', 'pace is | a skill.']] },
      { dur: 5, set: (x, t, lt) => { kitchen(x, t); box(x, 620, 900, 340, 430, '#3a3a4a', 8); box(x, 660, 980, 260, 200, lt % 1 < 0.5 ? '#ff9a3c' : '#ffb35c', 6); clock(x, 790, 820, lt < 2.5 ? '0:45' : '0:44') },
        cast: { taurus: [[0, 360, Y]] }, mood: { taurus: 'sleepy' },
        lines: [[0.5, 2.0, 'taurus', 'hardest part: | waiting.'], [2.9, 1.8, 'taurus', '...still | waiting.']] },
      { dur: 6, set: (x, t) => kitchen(x, t), cast: { taurus: [[0, 330, Y]], cancer: [[0, 1300, Y], [0.8, 1300, Y], [1.6, 760, Y]] },
        mood: { taurus: 'happy', cancer: lt => lt > 3.3 ? 'heart' : 'wide' },
        front: (x, t, lt) => { box(x, 400, 1170, 200, 20, BONE, 4); for (let i = 0; i < 3; i++) cookie(x, 440 + i * 60, 1140) },
        lines: [[1.9, 1.8, 'cancer', 'is that... | for me?'], [3.7, 2.2, 'taurus', 'half for you. | always.']] },
      { dur: 6, set: (x, t) => kitchen(x, t), cast: { taurus: [[0, 280, Y]], cancer: [[0, 800, Y]] },
        mood: { taurus: 'happy', cancer: lt => lt > 2.4 ? 'heart' : 'wide' },
        front: (x, t, lt) => bigCookie(x, 540, 1000, K(lt, 0.5, 0.4)),
        lines: [[0.3, 1.6, 'taurus', 'one more | thing...'], [2.6, 2.6, 'cancer', '...yes. | obviously yes.']] },
    ],
  },
  cancer: {
    hook: 'Race 2 is a pairs race. | Cancer is too | nervous to ask.', pair: ['cancer', 'taurus'],
    lesson: ['The scary part of asking', 'is the second before.'],
    scenes: [
      { dur: 5, title: "CANCER'S ROOM", set: (x, t, lt) => { room(x, { wall: '#28405c', floor: '#3a3050' }); windowStars(x, 820, 720, 260, 240, t); flyer(x, 330, 820, K(lt, 0.3), 0.05) },
        cast: { cancer: [[0, 660, Y]] }, mood: { cancer: lt => lt < 2.8 ? 'wide' : 'heart' },
        lines: [[0.6, 2.0, 'cancer', 'pairs?? | with who?'], [3.0, 1.8, 'cancer', '...I know | who.']] },
      { dur: 6, set: (x, t) => { room(x, { wall: '#28405c', floor: '#3a3050' }); box(x, 300, 1040, 480, 300, '#8a4a6a', 8) },
        cast: { cancer: [[0, 540, 1080]] }, mood: { cancer: 'happy' },
        front: (x, t, lt) => { scarf(x, 300, 1180, 60 + lt * 80); x.fillStyle = COL.cancer; x.beginPath(); x.arc(760, 1220, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = COL.taurus; x.beginPath(); x.arc(840, 1230, 40, 0, Math.PI * 2); x.fill() },
        lines: [[0.4, 2.2, 'cancer', 'training: | matching scarves.'], [3.2, 2.2, 'cancer', 'one for me. | one for...']] },
      { dur: 6, set: (x, t) => { room(x, { wall: '#28405c', floor: '#3a3050' }); mirror(x, 760, 1000) },
        back: (x, t, lt) => { x.save(); x.globalAlpha = 0.55; signChar(x, t, 'cancer', 760, 1040, 200, { mood: lt > 2.8 ? 'squint' : 'wide', seed: 9 }); x.restore() },
        cast: { cancer: [[0, 360, Y]] }, mood: { cancer: lt => lt > 2.8 ? 'squint' : 'happy' }, look: { cancer: [1, 0] },
        lines: [[0.4, 2.2, 'cancer', 'hi. would you | maybe...'], [2.9, 2.6, 'cancer', 'no. too | dramatic.']] },
      { dur: 5, set: (x, t, lt) => { outside(x); door(x, 820, 0) },
        cast: { cancer: [[0, 150, Y], [2.4, 560, Y]] }, mood: { cancer: 'squint' },
        front: (x, t, lt, P) => { const [cx, cy] = P.at('cancer'); scarf(x, cx - 60, cy + 70, 120) },
        lines: [[0.6, 1.8, 'cancer', 'be brave. | be brave.'], [3.0, 1.6, 'cancer', '*knock knock*']] },
      { dur: 6, set: (x, t, lt) => { outside(x); door(x, 820, clamp(lt / 0.5)) },
        cast: { cancer: [[0, 420, Y]], taurus: [[0, 820, Y]] }, mood: { cancer: lt => lt > 4 ? 'heart' : 'wide', taurus: lt => lt > 4 ? 'heart' : 'happy' },
        front: (x, t, lt, P) => { const [cx, cy] = P.at('cancer'); scarf(x, cx - 60, cy + 70, 120); bigCookie(x, 820, 1060, 0.6 * K(lt, 0.3, 0.3)) },
        lines: [[0.5, 1.6, 'taurus', 'oh! | you first.'], [2.2, 1.5, 'cancer', 'no, you!'], [4.0, 1.9, 'taurus', 'partners?'], [4.0, 1.9, 'cancer', 'partners?']],
        stick: [[4.3, 1.6, 'SAME TIME.', GOLD]] },
    ],
  },
  // ── Capricorn & Aquarius ──────────────────────────────────────────────────────
  capricorn: {
    hook: 'Capricorn lost | by 0.3 seconds. | So: a coach.', pair: ['capricorn', 'aquarius'], pairMood: 'wink',
    lesson: ['Even the top', 'is better with company.'],
    scenes: [
      { dur: 5, title: "CAPRICORN'S OFFICE", set: (x, t) => { room(x, { wall: '#1f3a33', floor: '#2b2a24' }); box(x, 640, 640, 300, 220, BONE, 10); txt(x, 'RACE 1', 790, 690, { size: 34 }); txt(x, '2nd', 790, 760, { size: 70 }); txt(x, 'by 0.3 s', 790, 822, { size: 28, weight: 700 }); table(x, 380, 420) },
        cast: { capricorn: [[0, 380, 1110]] }, mood: { capricorn: 'squint' }, look: { capricorn: [1, -0.5] },
        lines: [[0.5, 2.2, 'capricorn', '0.3 seconds. | never again.'], [3.0, 1.8, 'capricorn', 'I hired | a coach.']] },
      { dur: 6, set: (x, t) => { outside(x); saturn(x, 720, 820, 130, t) },
        cast: { capricorn: [[0, 300, Y], [1.0, 300, Y - 60], [1.4, 300, Y], [2.0, 300, Y - 60], [2.4, 300, Y]] }, mood: { capricorn: lt => lt > 3.8 ? 'happy' : 'squint' },
        lines: [[0.3, 1.6, 'capricorn', 'Coach Saturn.'], [2.0, 2.0, [720, 880, 300], 'discipline. | more laps.'], [4.1, 1.8, 'capricorn', 'finally. | someone gets it.']] },
      { dur: 5, title: 'DAY 12', set: (x, t) => { outside(x); mountain(x, 560, FLOOR + 60, 760, 900, t) },
        cast: { capricorn: [[0, 200, Y, 160], [4.2, 540, 590, 140]] }, mood: { capricorn: 'squint' },
        lines: [[2.6, 1.8, 'capricorn', 'up. | up. | up.']] },
      { dur: 5, set: (x, t, lt) => { outside(x, { ground: '#4b3f7a' }); for (let k = 0; k < 6; k++) { const ph = (lt * 0.9 + k / 6) % 1; x.fillStyle = 'rgba(239,230,214,0.4)'; x.fillRect(1080 - ph * 1200, 700 + k * 90, 120, 6) } },
        cast: { capricorn: [[0, 540, Y]] }, mood: { capricorn: lt => lt > 2.6 ? 'neutral' : 'happy' },
        lines: [[0.4, 1.9, 'capricorn', "top. made it. | ...it's quiet."], [2.7, 2.0, 'capricorn', 'pairs race. | right.']] },
      { dur: 6, set: (x, t) => outside(x),
        back: (x, t, lt, P) => { const [cx, cy] = P.at('aquarius'); bubbleMarble(x, cx, cy, 170, t) },
        cast: { capricorn: [[0, 300, Y]], aquarius: [[0, 1300, Y - 20], [1.4, 760, Y - 20]] }, mood: { capricorn: lt => lt > 4.2 ? 'wink' : 'wide', aquarius: 'happy' },
        lines: [[1.6, 2.0, 'aquarius', 'need a | test pilot?'], [3.8, 1.8, 'capricorn', 'is that | even legal?'], [5.2, 0.8, 'aquarius', 'no idea!']] },
    ],
  },
  aquarius: {
    hook: 'Race 2 is a pairs race. | Aquarius invents | a new marble.', pair: ['aquarius', 'capricorn'], pairMood: 'wink',
    lesson: ['Your own route is fine.', "It's better with a passenger."],
    scenes: [
      { dur: 5, title: "AQUARIUS'S WORKSHOP", set: (x, t) => workshop(x, t), cast: { aquarius: [[0, 760, Y]] }, mood: { aquarius: 'sparkle' },
        lines: [[0.5, 2.0, 'aquarius', 'pairs race? | new marble.'], [2.8, 2.0, 'aquarius', 'a marble | for two.']] },
      { dur: 5.5, set: (x, t) => workshop(x, t), cast: { aquarius: [[0, 760, Y]] }, mood: { aquarius: lt => lt > 2.6 ? 'neutral' : 'happy' },
        front: (x) => { box(x, 220, 1150, 200, 200, '#c9a6ff', 8); box(x, 250, 1180, 140, 140, '#b48cff', 0) },
        lines: [[0.4, 2.0, 'aquarius', 'prototype 1: | the cube.'], [2.8, 2.0, 'aquarius', '...it does | not roll.']] },
      { dur: 5, set: (x, t) => workshop(x, t), cast: { aquarius: [[0, 760, Y]] }, mood: { aquarius: lt => lt > 1.8 ? 'wide' : 'happy' },
        front: (x, t, lt) => { if (lt < 1.8) bubbleMarble(x, 320, 1190, 110 + lt * 30, t); else sparkles(x, t, 320, 1150, 1.8 + (t - lt), 16, 320, 4) },
        lines: [[0.3, 1.4, 'aquarius', 'prototype 2!'], [3.0, 1.8, 'aquarius', 'noted.']], stick: [[1.85, 1.0, 'POP.', SKYB]] },
      { dur: 6, set: (x, t) => workshop(x, t),
        back: (x, t, lt, P) => { const [cx, cy] = P.at('aquarius'); bubbleMarble(x, cx, cy, 200, t) },
        cast: { aquarius: [[0, 300, Y - 40], [2.0, 720, Y - 40]] }, mood: { aquarius: 'sparkle' },
        lines: [[0.4, 2.2, 'aquarius', 'prototype 3: | a bubble for two.'], [3.0, 2.2, 'aquarius', 'now I need | a test pilot.']] },
      { dur: 6.5, set: (x, t) => workshop(x, t),
        back: (x, t, lt, P) => bubbleMarble(x, 720, Y - 40, 200, t),
        front: (x, t, lt, P) => clipboard(x, P, 'capricorn', -0.7),
        cast: { aquarius: [[0, 720, Y - 40]], capricorn: [[0, -200, Y], [1.2, 300, Y]] }, mood: { aquarius: 'happy', capricorn: lt => lt > 5 ? 'wink' : 'squint' },
        lines: [[1.4, 1.8, 'capricorn', 'is that | regulation?'], [3.4, 1.8, 'aquarius', 'it is now. | get in.'], [5.3, 1.2, 'capricorn', '...one lap.']] },
    ],
  },
  // ── Leo & Aries ───────────────────────────────────────────────────────────────
  leo: {
    hook: 'Race 2 is a pairs race. | Leo practises | the victory pose.', pair: ['leo', 'aries'],
    lesson: ['The spotlight gets bigger', 'when you share it.'],
    scenes: [
      { dur: 5, title: "LEO'S DRESSING ROOM", set: (x, t) => { room(x, { wall: '#4a2030', floor: '#3a1e2a' }); bulbMirror(x, 760, 1000, t) },
        back: (x, t) => { x.save(); x.globalAlpha = 0.5; signChar(x, t, 'leo', 760, 1040, 190, { mood: 'sparkle', seed: 9 }); x.restore() },
        cast: { leo: [[0, 340, Y]] }, mood: { leo: 'sparkle' }, look: { leo: [1, 0] },
        lines: [[0.5, 2.0, 'leo', 'race 2 prep: | poses.'], [2.8, 2.0, 'leo', 'the race is | secondary.']] },
      { dur: 6, set: (x, t) => room(x, { wall: '#2a1838', floor: '#3a1e2a' }), front: (x, t, lt) => flash(x, lt, [0.3, 2.3, 4.2]),
        cast: { leo: [[0, 540, Y], [2.0, 540, Y], [2.2, 520, Y - 80, 260], [4.0, 520, Y - 80, 260], [4.2, 560, Y, 200]] }, mood: { leo: lt => lt > 4.1 ? 'squint' : lt > 2.1 ? 'wink' : 'sparkle' },
        lines: [[0.4, 1.6, 'leo', 'pose one: | the sun.'], [2.3, 1.6, 'leo', 'pose two: | also the sun.'], [4.3, 1.6, 'leo', 'pose three: | eclipse.']] },
      { dur: 5, set: (x, t) => { outside(x); podium(x, 540) }, cast: { leo: [[0, 540, FLOOR - 360]] }, mood: { leo: lt => lt > 2.6 ? 'wide' : 'sparkle' },
        lines: [[0.4, 2.0, 'leo', 'first place. | obviously.'], [2.7, 2.0, 'leo', 'wait. a pairs | podium?']], stick: [[3.0, 1.8, 'TWO SPOTS.', GOLD]] },
      { dur: 5.5, set: (x, t) => { outside(x); podium(x, 540); x.save(); x.setLineDash([16, 12]); x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.arc(640, FLOOR - 360, 90, 0, Math.PI * 2); x.stroke(); x.restore() },
        cast: { leo: [[0, 470, FLOOR - 360]], aries: [[0, 1300, Y], [2.6, 1300, Y], [3.4, -250, Y]] }, mood: { leo: lt => lt > 3.3 ? 'wide' : 'neutral', aries: 'squint' }, look: { leo: [1, 0] },
        lines: [[0.4, 2.0, 'leo', 'who would | stand with me?'], [2.7, 1.2, 'aries', 'on your left!'], [4.2, 1.2, 'leo', '...hm.']] },
      { dur: 6, set: (x, t) => { outside(x); marbleTrack(x, 820, t) },
        cast: { aries: [[0, 850, Y]], leo: [[0, -200, Y], [1.0, 380, Y]] }, mood: { aries: lt => lt > 4.4 ? 'happy' : 'squint', leo: 'sparkle' },
        lines: [[0.6, 1.4, 'leo', 'Aries! | wait up!'], [2.3, 1.9, 'aries', 'you can | keep up?'], [4.4, 1.6, 'leo', 'I look great | running.']] },
    ],
  },
  aries: {
    hook: 'Race 2 is a pairs race. | Aries trains alone | at 5 a.m.', pair: ['aries', 'leo'],
    lesson: ['Fast is a gift.', 'Fast together is a team.'],
    scenes: [
      { dur: 4.5, title: '5:00 A.M.', set: (x, t, lt) => { room(x, { wall: '#16122a', floor: '#221a30' }); clock(x, 760, 820, '5:00'); windowStars(x, 260, 760, 260, 240, t) },
        cast: { aries: [[0, 540, Y + 40], [1.0, 540, Y + 40], [1.3, 540, Y - 120], [1.6, 540, Y]] }, mood: { aries: lt => lt < 1.0 ? 'sleepy' : 'squint' },
        lines: [[1.6, 2.2, 'aries', "5 A.M. | LET'S GO."]] },
      { dur: 6, set: (x, t) => { outside(x); marbleTrack(x, 820, t) },
        cast: { aries: [[0, 150, Y], [0.8, 930, Y], [1.6, 150, Y], [2.4, 930, Y], [3.2, 150, Y], [4.0, 540, Y]] }, mood: { aries: 'squint' },
        lines: [[0.3, 1.4, 'aries', 'lap one!'], [2.0, 1.4, 'aries', 'lap forty!'], [4.1, 1.8, 'aries', 'nobody | catches me.']] },
      { dur: 5, set: (x, t, lt) => { outside(x); box(x, 790, 820, 20, 520, '#8a6a4a'); flyer(x, 800, 820, K(lt, 0.2), 0.04) },
        cast: { aries: [[0, 360, Y]] }, mood: { aries: lt => lt > 2.6 ? 'eyeroll' : 'wide' }, look: { aries: [1, -0.5] },
        lines: [[0.4, 2.0, 'aries', 'tied to | someone??'], [2.7, 2.0, 'aries', "they'll | slow me down."]] },
      { dur: 6, set: (x, t) => { outside(x); marbleTrack(x, 820, t) },
        front: (x, t, lt, P) => { const [cx, cy] = P.at('aries'), rx = Math.min(cx - 260, 120 + lt * 120); tieRope(x, [cx - 90, cy + 40], [rx + 30, Y + 70]); rock(x, rx, Y + 70) },
        cast: { aries: [[0, 500, Y], [2.0, 680, Y], [5.0, 700, Y]] }, mood: { aries: lt => lt > 3 ? 'neutral' : 'squint' },
        lines: [[0.3, 2.2, 'aries', 'practice partner: | this rock.'], [3.2, 2.0, 'aries', '...the rock | is slow.']] },
      { dur: 6, set: (x, t) => { outside(x); marbleTrack(x, 820, t) }, front: (x, t, lt) => rock(x, 120, Y + 70),
        cast: { aries: [[0, 700, Y]], leo: [[0, -200, Y], [1.0, 330, Y]] }, mood: { aries: lt => lt > 4 ? 'happy' : 'wide', leo: 'sparkle' },
        lines: [[1.2, 2.2, 'leo', 'need a partner | who keeps up?'], [3.7, 1.8, 'aries', 'race you | to the tree!']] },
    ],
  },
  // ── Pisces & Scorpio ──────────────────────────────────────────────────────────
  pisces: {
    hook: 'Race 2 is a pairs race. | Pisces writes | everyone a song.', pair: ['pisces', 'scorpio'],
    lesson: ['Feeling everything', 'is how you find your people.'],
    scenes: [
      { dur: 5, title: "PISCES'S ROOM", set: (x, t, lt) => { room(x, { wall: '#203a5a', floor: '#2a2a4a' }); for (let k = 0; k < 10; k++) { const ph = (t * 0.2 + k / 10) % 1; x.strokeStyle = 'rgba(191,239,255,0.5)'; x.lineWidth = 4; x.beginPath(); x.arc(100 + k * 95, 1300 - ph * 900, 10 + (k % 3) * 5, 0, Math.PI * 2); x.stroke() } flyer(x, 780, 840, K(lt, 0.3)) },
        cast: { pisces: [[0, 340, Y]] }, mood: { pisces: 'heart' },
        lines: [[0.5, 2.0, 'pisces', 'a pairs race... | so romantic.'], [2.8, 2.0, 'pisces', "I'll write | a song."]] },
      { dur: 6, set: (x, t) => room(x, { wall: '#203a5a', floor: '#2a2a4a' }), front: (x, t) => { piano(x, 600); notes(x, t, 640, 900, { n: 5, col: GOLD }) },
        cast: { pisces: [[0, 600, 960]] }, mood: { pisces: 'happy' },
        lines: [[0.4, 2.4, 'pisces', '~ we roll | as one ~'], [3.2, 2.4, 'pisces', '~ through every | black hole ~']] },
      { dur: 5, set: (x, t) => room(x, { wall: '#203a5a', floor: '#2a2a4a' }), front: (x) => piano(x, 600),
        cast: { pisces: [[0, 600, 960]] }, mood: { pisces: 'wide' },
        lines: [[0.5, 2.0, 'pisces', "it's too | beautiful."], [2.9, 1.6, 'pisces', '*sniff*']] },
      { dur: 6, set: (x, t) => { room(x, { wall: '#203a5a', floor: '#2a2a4a' }); door(x, 860, 1) }, front: (x) => piano(x, 420),
        cast: { pisces: [[0, 420, 960]], scorpio: [[0, 860, Y]] }, mood: { pisces: lt => lt > 2.0 ? 'wide' : 'happy', scorpio: 'neutral' }, look: { scorpio: [-1, 0] },
        lines: [[0.4, 1.4, 'scorpio', '...'], [2.0, 2.0, 'pisces', 'how long were | you there?'], [4.2, 1.6, 'scorpio', 'the whole | song.']] },
      { dur: 6, set: (x, t) => { room(x, { wall: '#203a5a', floor: '#2a2a4a' }); door(x, 860, 1) },
        cast: { pisces: [[0, 380, Y]], scorpio: [[0, 860, Y], [1.0, 700, Y]] }, mood: { pisces: lt => lt > 4 ? 'heart' : 'happy', scorpio: lt => lt > 4 ? 'happy' : 'neutral' },
        lines: [[0.4, 1.8, 'scorpio', 'sing it | again?'], [2.4, 1.7, 'pisces', "it's only | one verse."], [4.2, 1.8, 'scorpio', 'write one | for two.']] },
    ],
  },
  scorpio: {
    hook: 'Race 2 is a pairs race. | Scorpio studies | the footage.', pair: ['scorpio', 'pisces'],
    lesson: ["Pretending you don't care", 'is still caring.'],
    scenes: [
      { dur: 5, title: "SCORPIO'S LAIR", set: (x, t, lt) => { room(x, { wall: '#140c1e', floor: '#1a1224' }); screens(x, t, lt) },
        cast: { scorpio: [[0, 540, Y]] }, mood: { scorpio: 'squint' }, look: { scorpio: [0, -1] },
        lines: [[0.5, 2.0, 'scorpio', 'race 1. | frame by frame.'], [2.8, 2.0, 'scorpio', 'I see | everything.']] },
      { dur: 6, set: (x, t, lt) => { room(x, { wall: '#140c1e', floor: '#1a1224' }); corkboard(x, t, K(lt, 1.8)) },
        cast: { scorpio: [[0, 540, Y + 30]] }, mood: { scorpio: 'squint' }, look: { scorpio: [0, -1] },
        lines: [[0.4, 2.2, 'scorpio', 'black hole: | 3 for 3.'], [3.0, 2.4, 'scorpio', 'the plan: | fall in again.']] },
      { dur: 5, set: (x, t) => { room(x, { wall: '#140c1e', floor: '#1a1224' }); screen(x, 540, 760, 760, 480, () => { x.fillStyle = '#0b0f26'; x.fillRect(160, 520, 760, 480); signChar(x, t, 'pisces', 540, 780, 260, { mood: 'happy', tears: 2, seed: 3 }) }) },
        cast: { scorpio: [[0, 260, Y + 60, 200]] }, mood: { scorpio: lt => lt > 2.6 ? 'wide' : 'neutral' }, look: { scorpio: [1, -1] },
        lines: [[0.4, 2.0, 'scorpio', "who's that | at the back?"], [2.7, 2.2, 'scorpio', 'why do I keep | rewinding this?']] },
      { dur: 6, set: (x, t, lt) => { room(x, { wall: '#140c1e', floor: '#1a1224' }); corkboard(x, t, 1); if (lt > 1.6) { box(x, 130, 500, 820, 560 * clamp((lt - 1.6) / 0.3), '#e8e2f2', 6) } },
        front: (x, t, lt, P) => { const [cx, cy, s] = P.at('pisces'); tea(x, cx + s * 0.4, cy + 20) },
        cast: { scorpio: [[0, 380, Y], [1.6, 600, Y], [2.0, 380, Y]], pisces: [[0, 1300, Y], [0.6, 820, Y]] }, mood: { scorpio: 'wide', pisces: 'happy' },
        lines: [[0.7, 1.4, 'pisces', 'I made tea!'], [2.2, 1.8, 'scorpio', "I wasn't | doing anything."], [4.2, 1.6, 'pisces', 'was that | me?']] },
      { dur: 6, set: (x, t) => { room(x, { wall: '#140c1e', floor: '#1a1224' }); box(x, 130, 500, 820, 560, '#e8e2f2', 6) },
        cast: { scorpio: [[0, 380, Y]], pisces: [[0, 760, Y]] }, mood: { scorpio: lt => lt > 3.8 ? 'heart' : 'neutral', pisces: lt => lt > 4.4 ? 'heart' : 'happy' },
        front: (x, t, lt, P) => { const [cx, cy, s] = P.at('pisces'); tea(x, cx + s * 0.4, cy + 20) },
        lines: [[0.3, 1.4, 'scorpio', 'research.'], [2.0, 1.2, 'pisces', 'aww.'], [3.6, 2.2, 'scorpio', '...partners | for race 2?']] },
    ],
  },
  // ── Libra & Gemini ────────────────────────────────────────────────────────────
  libra: {
    hook: 'Race 2 is a pairs race. | Libra makes a | pros and cons list.', pair: ['libra', 'gemini'],
    lesson: ['There is no perfect choice.', 'Just a good one, made.'],
    scenes: [
      { dur: 5, title: "LIBRA'S DESK", set: (x, t, lt) => { room(x, { wall: '#3a2a4a', floor: '#3a2e3a' }); table(x, 540, 640); scroll(x, 760, 1180, 100, ['PROS / CONS']) },
        cast: { libra: [[0, 440, 1050]] }, mood: { libra: 'happy' },
        lines: [[0.5, 2.0, 'libra', 'pairs race. | who to pick?'], [2.8, 2.0, 'libra', 'pros and | cons. easy.']] },
      { dur: 6, set: (x, t, lt) => { room(x, { wall: '#3a2a4a', floor: '#3a2e3a' }); scroll(x, 760, 560, 200 + lt * 230, ['+ fast', '- too fast', '+ kind', '- also kind', '+ snacks', '- shares snacks', '+ funny', '- too funny', '+ loyal', '- ...']) },
        cast: { libra: [[0, 330, Y]] }, mood: { libra: lt => lt > 4 ? 'wide' : 'neutral' }, look: { libra: [1, -0.3] },
        lines: [[0.4, 1.8, 'libra', "pro: they're | nice."], [2.4, 1.8, 'libra', 'con: everyone | is nice.'], [4.3, 1.5, 'libra', '...more paper.']] },
      { dur: 5, set: (x, t) => room(x, { wall: '#3a2a4a', floor: '#3a2e3a' }),
        front: (x, t, lt) => { const up = lt < 2.4 ? Math.sin(Math.PI * clamp(lt / 2.4)) * 600 : 0; coinAt(x, 700, 1290 - up, lt < 2.4 ? lt * 14 : Math.PI / 2) },
        cast: { libra: [[0, 330, Y]] }, mood: { libra: lt => lt > 2.6 ? 'eyeroll' : 'happy' },
        lines: [[0.3, 1.6, 'libra', 'coin flip. | fair.'], [3.4, 1.5, 'libra', 'of course.']], stick: [[2.5, 1.6, 'ON ITS EDGE.', GOLD]] },
      { dur: 6, set: (x, t) => { room(x, { wall: '#3a2a4a', floor: '#3a2e3a' }); door(x, 860, 1) },
        front: (x, t, lt, P) => { const [cx, cy] = P.at('gemini'); box(x, cx - 230, cy - 30, 90, 110, BONE, 4); box(x, cx + 140, cy - 30, 90, 110, BONE, 4) },
        cast: { libra: [[0, 330, Y]], gemini: [[0, 1300, Y], [0.5, 770, Y]] }, mood: { libra: 'wide', gemini: lt => lt > 3 ? 'neutral' : 'sparkle' },
        lines: [[0.7, 1.8, 'gemini', 'I signed up | twice!'], [2.8, 2.4, 'gemini', 'they said I need | another sign.']] },
      { dur: 6.5, set: (x, t) => { room(x, { wall: '#3a2a4a', floor: '#3a2e3a' }); door(x, 860, 1) },
        cast: { libra: [[0, 360, Y]], gemini: [[0, 740, Y]] }, mood: { libra: lt => lt > 4.4 ? 'sparkle' : 'happy', gemini: lt => lt > 2.4 ? 'heart' : 'wide' },
        lines: [[0.3, 2.0, 'libra', 'I could be | your other one.'], [2.6, 1.6, 'gemini', 'YES. | both of us.'], [4.5, 1.8, 'libra', 'that was... | a decision.']] },
    ],
  },
  gemini: {
    hook: 'Race 2 is a pairs race. | Gemini signs up | twice.', pair: ['gemini', 'libra'],
    lesson: ['Two of you is fun.', 'Someone else is better.'],
    scenes: [
      { dur: 5, set: (x, t) => signupBooth(x),
        cast: { gemini: [[0, 300, Y]], virgo: [[0, 780, 1110, 200]] }, mood: { gemini: 'sparkle', virgo: 'neutral' },
        front: (x, t, lt, P) => clipboard(x, P, 'virgo', -0.6),
        lines: [[0.5, 1.8, 'gemini', 'name: | Gemini.'], [2.7, 2.0, 'gemini', 'partner: | also Gemini.']] },
      { dur: 5.5, set: (x, t) => signupBooth(x), front: (x, t, lt, P) => { mustache(x, P, 'gemini'); clipboard(x, P, 'virgo', -0.6) },
        cast: { gemini: [[0, -200, Y], [0.8, 300, Y]], virgo: [[0, 780, 1110, 200]] }, mood: { gemini: 'wink', virgo: 'squint' },
        lines: [[1.0, 2.0, 'gemini', "hello. I'm a | new person."], [3.3, 2.0, 'gemini', 'partner: | the other one.']] },
      { dur: 5.5, set: (x, t) => signupBooth(x), front: (x, t, lt, P) => { if (lt < 3.4) mustache(x, P, 'gemini'); clipboard(x, P, 'virgo', -0.6) },
        cast: { gemini: [[0, 300, Y]], virgo: [[0, 780, 1110, 200]] }, mood: { gemini: lt => lt > 3.4 ? 'wide' : 'wink', virgo: 'eyeroll' },
        lines: [[0.3, 2.2, 'virgo', "that's you. | with a mustache."], [2.8, 1.6, 'gemini', 'are we | though?']], stick: [[3.6, 1.6, 'DENIED.', PINK]] },
      { dur: 6, set: (x, t) => outside(x),
        front: (x, t, lt, P) => { const [cx, cy] = P.at('libra'); scroll(x, cx + 150, cy - 60, 260, ['+ left', '- right', '+ right', '- left']) },
        cast: { gemini: [[0, 380, Y]], libra: [[0, 1300, Y], [2.6, 1300, Y], [3.6, 700, Y]] }, mood: { gemini: lt => lt > 4 ? 'sparkle' : 'neutral', libra: 'neutral' },
        lines: [[0.4, 2.2, 'gemini', 'I need a | different sign.'], [4.0, 1.8, 'gemini', '...oh. | hello.']] },
      { dur: 6, set: (x, t) => outside(x),
        cast: { gemini: [[0, 380, Y]], libra: [[0, 700, Y]] }, mood: { gemini: 'heart', libra: lt => lt > 2.4 ? 'sparkle' : 'wide' },
        lines: [[0.3, 1.8, 'gemini', 'Libra! | partner?'], [2.4, 2.2, 'libra', 'I could be | your other one.'], [4.7, 1.3, 'gemini', 'YES.']] },
    ],
  },
  // ── Sagittarius & Virgo ───────────────────────────────────────────────────────
  sagittarius: {
    hook: 'Race 2 is a pairs race. | Sagittarius goes | to practice.', pair: ['sagittarius', 'virgo'],
    lesson: ['Getting lost', 'is how you find new places.'],
    scenes: [
      { dur: 5, title: 'PRACTICE DAY', set: (x, t) => outside(x), front: (x, t, lt, P) => backpack(x, P, 'sagittarius'),
        cast: { sagittarius: [[0, 400, Y]] }, mood: { sagittarius: 'sparkle' },
        lines: [[0.5, 2.0, 'sagittarius', 'practice is | at the track.'], [2.8, 1.8, 'sagittarius', 'shortcut!']] },
      { dur: 6, set: (x, t) => { outside(x); signpost(x, 600, FLOOR + 60, [['TRACK', 1, MINT], ['BLACK HOLE', -1, PINK], ['SATURN', 1, GOLD]], t) },
        front: (x, t, lt, P) => backpack(x, P, 'sagittarius'),
        cast: { sagittarius: [[0, 300, Y], [3.4, 300, Y], [4.6, -250, Y]] }, mood: { sagittarius: 'happy' }, look: { sagittarius: [1, -1] },
        lines: [[0.4, 2.0, 'sagittarius', 'left? right? | yes!'], [2.6, 1.8, 'sagittarius', 'this feels | right.']] },
      { dur: 5, set: (x, t) => { outside(x, { ground: '#1a1430' }); blackHole(x, 680, 860, t, 120) }, front: (x, t, lt, P) => backpack(x, P, 'sagittarius'),
        cast: { sagittarius: [[0, 300, Y]] }, mood: { sagittarius: lt => lt > 2.8 ? 'wide' : 'sparkle' },
        lines: [[0.5, 2.0, 'sagittarius', 'hi black hole! | long time!'], [2.9, 1.8, 'sagittarius', '...wrong | way?']] },
      { dur: 5.5, set: (x, t) => { outside(x); saturn(x, 760, 760, 110, t, false) },
        front: (x, t, lt, P) => { backpack(x, P, 'sagittarius'); x.save(); x.translate(440, 1060); x.rotate(Math.PI); box(x, -110, -70, 220, 140, '#efe1b8', 5); x.strokeStyle = '#c23a4e'; x.lineWidth = 5; x.beginPath(); x.moveTo(-80, 40); x.lineTo(0, -20); x.lineTo(70, 30); x.stroke(); txt(x, 'MAP', 0, -45, { size: 30 }); x.restore() },
        cast: { sagittarius: [[0, 300, Y]] }, mood: { sagittarius: lt => lt > 2.8 ? 'happy' : 'wide' },
        lines: [[0.4, 2.2, 'sagittarius', 'the map was | upside down.'], [2.9, 2.0, 'sagittarius', 'best | detour ever.']] },
      { dur: 6.5, set: (x, t) => { outside(x); door(x, 860, 1) }, front: (x, t, lt, P) => { backpack(x, P, 'sagittarius'); clipboard(x, P, 'virgo', -0.6) },
        cast: { sagittarius: [[0, -200, Y], [0.8, 380, Y]], virgo: [[0, 860, Y]] }, mood: { sagittarius: 'sparkle', virgo: lt => lt > 5 ? 'happy' : 'squint' },
        lines: [[1.0, 1.8, 'virgo', "you're three | hours late."], [3.0, 1.8, 'sagittarius', 'I brought | souvenirs!'], [5.0, 1.3, 'virgo', '...show me.']] },
    ],
  },
  virgo: {
    hook: 'Race 2 is a pairs race. | Virgo builds | a spreadsheet.', pair: ['virgo', 'sagittarius'],
    lesson: ['Leave room in the plan', 'for someone to help.'],
    scenes: [
      { dur: 5, title: "VIRGO'S DESK", set: (x, t, lt) => { room(x, { wall: '#26324a', floor: '#2a2a36' }); sheet(x, 540, 760, 820, 420, [['RACE 2', 'PLAN', 'v14'], ['lane', 'left', 'done'], ['pace', 'steady', 'done'], ['snacks', 'none', 'done']], clamp(lt / 2)) },
        cast: { virgo: [[0, 540, Y + 20]] }, mood: { virgo: 'squint' }, look: { virgo: [0, -1] },
        lines: [[0.6, 2.0, 'virgo', 'race 2 plan. | version 14.'], [2.9, 2.0, 'virgo', 'every variable. | accounted for.']] },
      { dur: 6, set: (x, t, lt) => { room(x, { wall: '#26324a', floor: '#2a2a36' }); sheet(x, 540, 780, 840, 470, [['PARTNER', 'SPEED', 'CHAOS'], ['Taurus', 'slow', '5%'], ['Leo', 'fast', '40%'], ['Gemini', '??', '80%'], ['Sagittarius', 'yes', '100%']], clamp(lt / 3)) },
        cast: { virgo: [[0, 540, Y + 40]] }, mood: { virgo: lt => lt > 3.2 ? 'wide' : 'squint' }, look: { virgo: [0, -1] },
        lines: [[0.4, 2.2, 'virgo', 'partner | chaos levels...'], [3.3, 2.2, 'virgo', 'Sagittarius: | off the chart.']] },
      { dur: 5, set: (x, t) => { room(x, { wall: '#26324a', floor: '#2a2a36' }); board(x, 760, 800, 420, 420); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) box(x, 590 + i * 90, 640 + j * 80, 70, 60, (i + j) % 5 === 2 ? PINK : '#e8e2f2', 3); txt(x, 'RETROGRADE?', 760, 1050, { size: 34, col: '#c23a4e' }) },
        cast: { virgo: [[0, 300, Y]] }, mood: { virgo: lt => lt > 2.6 ? 'squint' : 'wide' },
        lines: [[0.4, 2.0, 'virgo', "and if it's | retrograde again?"], [2.8, 1.9, 'virgo', 'plan B. | plan C.']] },
      { dur: 6, set: (x, t, lt) => { room(x, { wall: '#26324a', floor: '#2a2a36' }); sheet(x, 540, 760, 840, 420, [['PLAN', 'B', 'C', 'D'], ['lane', 'pace', 'snacks', (lt % 0.8 < 0.5) ? 'HELP' : '']], 1); for (let k = 0; k < 8; k++) { const ph = (lt * 0.7 + k / 8) % 1; box(x, 120 + k * 110, 600 + ph * 700, 60, 76, BONE, 3) } },
        cast: { virgo: [[0, 540, Y + 30]] }, mood: { virgo: 'wide' },
        lines: [[0.4, 2.0, 'virgo', 'a column called | "help"?'], [2.9, 2.2, 'virgo', 'who added | that column?']] },
      { dur: 6.5, set: (x, t) => { room(x, { wall: '#26324a', floor: '#2a2a36' }); windowStars(x, 800, 760, 320, 300, t) },
        front: (x, t, lt, P) => backpack(x, P, 'sagittarius'),
        cast: { virgo: [[0, 340, Y]], sagittarius: [[0, 800, 1500, 200], [0.5, 800, 800, 200]] }, mood: { virgo: lt => lt > 5 ? 'happy' : 'wide', sagittarius: 'sparkle' },
        lines: [[0.7, 1.6, 'sagittarius', 'I did! | hi!'], [2.5, 1.6, 'virgo', "you're not | in the plan."], [4.2, 1.5, 'sagittarius', "I'm plan B!"], [5.6, 0.9, 'virgo', '...fine.']] },
    ],
  },
}

// ═══ The night before Race 2: one episode per pair. Each one plants what happens in the race (marblerace2):
// the scarf becomes Taurus & Cancer's rope ("just float, with me") · Leo & Aries's deal and their left/left tangle ·
// Capricorn's route vs Aquarius's shortcut ("...no.") · Scorpio's jump plan (they miss) · Libra & Gemini can't pick a
// lane (they get sent back to the start; everyone waits) · Virgo's schedule and Sagittarius's paper-plane map.
const night = (x, t) => { room(x, { wall: '#1c1638', floor: '#2a2140' }); windowStars(x, 820, 700, 300, 260, t) }
export const NIGHT = {
  'taurus-cancer': {
    hook: 'The night before Race 2. | Taurus & Cancer.', pair: ['taurus', 'cancer'],
    lesson: ['Go at the pace', 'you can keep together.'],
    scenes: [
      { dur: 5, title: 'THE NIGHT BEFORE', set: (x, t) => kitchen(x, t),
        front: (x, t, lt) => { box(x, 380, 1160, 320, 120, '#c98e4a', 6); for (let i = 0; i < Math.min(5, Math.floor(lt * 1.6)); i++) cookie(x, 420 + i * 60, 1150) },
        cast: { taurus: [[0, 300, Y]], cancer: [[0, 820, Y]] }, mood: { taurus: 'happy', cancer: 'happy' },
        lines: [[0.6, 1.8, 'cancer', 'did you pack | enough?'], [2.8, 1.8, 'taurus', 'for everyone.']] },
      { dur: 6, set: (x, t) => kitchen(x, t), cast: { taurus: [[0, 330, Y]], cancer: [[0, 750, Y]] },
        mood: { cancer: lt => lt > 4 ? 'heart' : 'wide', taurus: 'happy' },
        lines: [[0.3, 2.2, 'cancer', 'what if gravity | goes UP again?'], [2.7, 1.4, 'taurus', 'then we float.'], [4.3, 1.6, 'taurus', 'together.']] },
      { dur: 6, set: (x, t) => kitchen(x, t), cast: { taurus: [[0, 330, Y]], cancer: [[0, 750, Y]] }, mood: { taurus: 'heart', cancer: 'heart' },
        front: (x, t, lt) => { const k = clamp(lt / 1.2); scarf(x, 400, Y + 10, 280 * k) },
        lines: [[0.3, 2.0, 'cancer', 'can our rope | be the scarf?'], [2.6, 1.6, 'taurus', 'obviously.']] },
      { dur: 5.5, set: (x, t) => kitchen(x, t), cast: { taurus: [[0, 260, Y], [3.0, 400, Y], [5.2, 560, Y]], cancer: [[0, 520, Y], [3.0, 660, Y], [5.2, 820, Y]] }, mood: { taurus: 'happy', cancer: 'happy' },
        front: (x, t, lt, P) => { const [ax, ay] = P.at('taurus'), [bx] = P.at('cancer'); scarf(x, ax + 60, ay + 10, bx - ax - 120) },
        lines: [[0.3, 1.8, 'taurus', 'practice. | slowly.'], [2.6, 1.6, 'cancer', 'slower.'], [4.2, 1.2, 'taurus', 'perfect.']] },
      { dur: 6, set: (x, t) => outside(x), cast: { taurus: [[0, 400, Y]], cancer: [[0, 680, Y]] }, mood: { taurus: 'heart', cancer: 'heart' }, look: { taurus: [0.3, -1], cancer: [-0.3, -1] },
        front: (x, t, lt) => scarf(x, 460, Y + 60, 160),
        lines: [[0.4, 2.2, 'cancer', 'whatever happens | tomorrow...'], [3.0, 2.2, 'taurus', '...we finish | together.']] },
    ],
  },
  'leo-aries': {
    hook: 'The night before Race 2. | Leo & Aries.', pair: ['leo', 'aries'],
    lesson: ['Two leaders can work.', 'Take turns.'],
    scenes: [
      { dur: 5, title: 'THE NIGHT BEFORE', set: (x, t) => { outside(x); marbleTrack(x, 820, t) },
        front: (x, t, lt, P) => tieRope(x, P.at('leo').slice(0, 2), P.at('aries').slice(0, 2)),
        cast: { leo: [[0, 360, Y]], aries: [[0, 520, Y], [1.0, 760, Y]] }, mood: { leo: 'wide', aries: 'squint' },
        lines: [[1.2, 1.4, 'aries', 'faster!'], [2.9, 1.8, 'leo', 'mind | my angle!']] },
      { dur: 5.5, set: (x, t) => { outside(x); box(x, 528, FLOOR - 380, 24, 440, '#8a6a4a') },
        front: (x, t, lt, P) => { const a = P.at('leo'), b = P.at('aries'); tieRope(x, a.slice(0, 2), [540, FLOOR - 150]); tieRope(x, [540, FLOOR - 150], b.slice(0, 2)) },
        cast: { leo: [[0, 380, Y], [1.6, 380, Y]], aries: [[0, 700, Y]] }, mood: { leo: 'eyeroll', aries: 'eyeroll' },
        lines: [[0.3, 1.5, 'leo', 'you go left!'], [2.0, 1.5, 'aries', 'no, YOU | go left!']], stick: [[3.7, 1.6, 'TANGLED.', PINK]] },
      { dur: 6, set: (x, t) => outside(x), front: (x, t, lt, P) => tieRope(x, P.at('leo').slice(0, 2), P.at('aries').slice(0, 2)),
        cast: { leo: [[0, 400, Y + 30]], aries: [[0, 680, Y + 30]] }, mood: { leo: lt => lt > 3 ? 'happy' : 'neutral', aries: lt => lt > 3 ? 'happy' : 'neutral' },
        lines: [[0.4, 2.0, 'aries', "you're... | actually fast."], [2.8, 2.0, 'leo', "you're | actually fun."]] },
      { dur: 6, set: (x, t) => outside(x), front: (x, t, lt, P) => tieRope(x, P.at('leo').slice(0, 2), P.at('aries').slice(0, 2)),
        cast: { leo: [[0, 400, Y]], aries: [[0, 680, Y]] }, mood: { leo: 'sparkle', aries: 'squint' },
        lines: [[0.3, 2.2, 'leo', 'tomorrow: | I lead, you shine?'], [2.8, 1.2, 'aries', 'deal!'], [4.3, 1.5, 'aries', '...I also lead.']] },
    ],
  },
  'capricorn-aquarius': {
    hook: 'The night before Race 2. | Capricorn & Aquarius.', pair: ['capricorn', 'aquarius'], pairMood: 'wink',
    lesson: ['Your plan and their idea', 'can share one rope.'],
    scenes: [
      { dur: 5, title: 'THE NIGHT BEFORE', set: (x, t) => workshop(x, t), front: (x, t, lt, P) => clipboard(x, P, 'capricorn', -0.7),
        cast: { capricorn: [[0, 360, Y]], aquarius: [[0, 760, Y]] }, mood: { capricorn: 'squint', aquarius: lt => lt > 3 ? 'wide' : 'happy' },
        lines: [[0.4, 2.0, 'capricorn', 'rule 4: | no bubbles.'], [2.8, 1.4, 'aquarius', 'rude.']] },
      { dur: 6, set: (x, t, lt) => { workshop(x, t); board(x, 760, 760, 420, 340, '#f4efe4'); x.strokeStyle = '#2a5c9a'; x.lineWidth = 8; x.beginPath(); x.moveTo(600, 640); x.lineTo(600 + 320 * clamp(lt / 1.4), 880); x.stroke(); if (lt > 2.6) { x.strokeStyle = '#d0213a'; x.beginPath(); for (let k = 0; k <= 30 * clamp((lt - 2.6) / 1.4); k++) { const u = k / 30; x.lineTo(600 + u * 320 + Math.sin(u * 14) * 60, 640 + u * 240) } x.stroke() } },
        cast: { capricorn: [[0, 260, Y]], aquarius: [[0, 480, Y]] }, mood: { capricorn: 'squint', aquarius: 'sparkle' },
        lines: [[0.3, 2.0, 'capricorn', 'the route. | straight down.'], [2.7, 2.0, 'aquarius', 'or... | a shortcut?'], [4.8, 1.2, 'capricorn', '...no.']] },
      { dur: 6, set: (x, t) => workshop(x, t), cast: { capricorn: [[0, 380, Y]], aquarius: [[0, 700, Y]] }, mood: { capricorn: 'neutral', aquarius: 'happy' },
        lines: [[0.3, 2.2, 'capricorn', "what if we're | 2nd again?"], [2.9, 2.4, 'aquarius', "then we're 2nd | together."]] },
      { dur: 6, set: (x, t) => workshop(x, t), front: (x, t, lt, P) => tieRope(x, P.at('capricorn').slice(0, 2), P.at('aquarius').slice(0, 2)),
        cast: { capricorn: [[0, 380, Y]], aquarius: [[0, 700, Y]] }, mood: { capricorn: lt => lt > 3 ? 'wink' : 'squint', aquarius: 'sparkle' },
        lines: [[0.3, 2.2, 'aquarius', 'I improved | the rope.'], [2.8, 1.6, 'capricorn', 'is it | regulation?'], [4.6, 1.3, 'aquarius', 'it is now.']] },
    ],
  },
  'pisces-scorpio': {
    hook: 'The night before Race 2. | Pisces & Scorpio.', pair: ['pisces', 'scorpio'],
    lesson: ['Even if the plan fails,', 'you still have each other.'],
    scenes: [
      { dur: 6, title: 'THE NIGHT BEFORE', set: (x, t, lt) => { room(x, { wall: '#140c1e', floor: '#1a1224' }); corkboard(x, t, 1) },
        cast: { scorpio: [[0, 380, Y]], pisces: [[0, 760, Y]] }, mood: { scorpio: 'squint', pisces: 'sparkle' },
        lines: [[0.4, 2.0, 'scorpio', 'the plan: | the black hole.'], [2.8, 2.2, 'scorpio', 'on three, | we jump.']] },
      { dur: 5.5, set: (x, t, lt) => { room(x, { wall: '#140c1e', floor: '#1a1224' }); corkboard(x, t, 1) },
        cast: { scorpio: [[0, 380, Y]], pisces: [[0, 760, Y]] }, mood: { scorpio: 'neutral', pisces: 'wide' },
        lines: [[0.3, 2.0, 'pisces', 'what if | we miss?'], [2.6, 1.6, 'scorpio', 'we won\'t.'], [4.3, 1.2, 'pisces', '...okay.']] },
      { dur: 6, set: (x, t) => room(x, { wall: '#203a5a', floor: '#2a2a4a' }), front: (x, t) => { piano(x, 420); notes(x, t, 460, 900, { n: 4, col: GOLD }) },
        cast: { pisces: [[0, 420, 960]], scorpio: [[0, 820, Y]] }, mood: { pisces: 'happy', scorpio: lt => lt > 3 ? 'heart' : 'neutral' },
        lines: [[0.3, 2.4, 'pisces', '~ verse two: | we fall in together ~'], [3.2, 1.8, 'scorpio', "...that's | a good verse."]] },
      { dur: 6, set: (x, t) => outside(x), front: (x, t, lt, P) => tieRope(x, P.at('scorpio').slice(0, 2), P.at('pisces').slice(0, 2)),
        cast: { scorpio: [[0, 400, Y]], pisces: [[0, 680, Y]] }, mood: { scorpio: 'happy', pisces: 'heart' },
        lines: [[0.3, 2.2, 'scorpio', 'if anything | goes wrong...'], [2.9, 2.0, 'pisces', 'we go | together.']] },
    ],
  },
  'libra-gemini': {
    hook: 'The night before Race 2. | Libra & Gemini.', pair: ['libra', 'gemini'],
    lesson: ['One of you decides.', 'One of you steadies.'],
    scenes: [
      { dur: 5, title: 'THE NIGHT BEFORE', set: (x, t) => { outside(x); signpost(x, 540, FLOOR + 60, [['LEFT LANE', -1, MINT], ['RIGHT LANE', 1, PINK]], t) },
        cast: { libra: [[0, 260, Y]], gemini: [[0, 820, Y]] }, mood: { libra: 'wide', gemini: 'sparkle' },
        lines: [[0.4, 1.8, 'libra', 'left lane | or right lane?'], [2.6, 1.4, 'gemini', 'BOTH!']] },
      { dur: 5.5, set: (x, t) => { outside(x); signpost(x, 540, FLOOR + 60, [['LEFT LANE', -1, MINT], ['RIGHT LANE', 1, PINK]], t) },
        front: (x, t, lt, P) => tieRope(x, P.at('libra').slice(0, 2), P.at('gemini').slice(0, 2)),
        cast: { libra: [[0, 300, Y]], gemini: [[0, 780, Y]] }, mood: { libra: 'eyeroll', gemini: 'wide' },
        lines: [[0.4, 2.0, 'libra', "we're tied | together."], [2.8, 1.6, 'gemini', 'oh. | right.']] },
      { dur: 5, set: (x, t) => outside(x),
        front: (x, t, lt) => { const up = lt < 2.0 ? Math.sin(Math.PI * clamp(lt / 2.0)) * 500 : 0; coinAt(x, 560, Y - 60 - up, lt < 2.0 ? lt * 14 : 0.2) },
        cast: { libra: [[0, 360, Y]], gemini: [[0, 760, Y]] }, mood: { libra: 'happy', gemini: lt => lt > 2.0 ? 'sparkle' : 'happy' },
        lines: [[0.2, 1.4, 'libra', 'coin flip?'], [2.3, 1.6, 'gemini', 'caught it. | left!']] },
      { dur: 6, set: (x, t) => outside(x), front: (x, t, lt, P) => tieRope(x, P.at('libra').slice(0, 2), P.at('gemini').slice(0, 2)),
        cast: { libra: [[0, 400, Y]], gemini: [[0, 680, Y]] }, mood: { libra: 'heart', gemini: 'heart' },
        lines: [[0.3, 2.2, 'libra', 'thank you | for deciding.'], [2.8, 2.4, 'gemini', 'thank you for | being my other one.']] },
    ],
  },
  'sagittarius-virgo': {
    hook: 'The night before Race 2. | Sagittarius & Virgo.', pair: ['sagittarius', 'virgo'],
    lesson: ['The right partner', 'makes getting lost fun.'],
    scenes: [
      { dur: 5, title: 'THE NIGHT BEFORE', set: (x, t) => night(x, t), front: (x, t, lt, P) => { const [cx, cy] = P.at('virgo'); box(x, cx + 120, cy - 60, 220, 150, '#efe1b8', 5); x.strokeStyle = '#c23a4e'; x.lineWidth = 5; x.beginPath(); x.moveTo(cx + 140, cy + 60); x.lineTo(cx + 230, cy - 20); x.lineTo(cx + 320, cy + 40); x.stroke() },
        cast: { virgo: [[0, 300, Y]], sagittarius: [[0, 860, Y]] }, mood: { virgo: 'squint', sagittarius: 'happy' },
        lines: [[0.4, 2.0, 'virgo', 'the route. | printed. laminated.'], [2.8, 1.6, 'sagittarius', 'ooh. | can I hold it?']] },
      { dur: 5.5, set: (x, t) => night(x, t),
        front: (x, t, lt) => { const u = clamp((lt - 1.6) / 1.8), px0 = 700 - u * 600, py0 = 1100 - Math.sin(Math.PI * u) * 300; x.fillStyle = '#efe1b8'; x.beginPath(); x.moveTo(px0 - 60, py0); x.lineTo(px0 + 60, py0 - 16); x.lineTo(px0 + 10, py0 + 20); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; x.stroke() },
        cast: { virgo: [[0, 300, Y]], sagittarius: [[0, 760, Y]] }, mood: { virgo: lt => lt > 2 ? 'wide' : 'squint', sagittarius: 'sparkle' },
        lines: [[0.3, 1.4, 'sagittarius', 'whoosh!'], [3.4, 1.8, 'virgo', 'that was | the map.']] },
      { dur: 6, set: (x, t) => night(x, t), cast: { virgo: [[0, 360, Y]], sagittarius: [[0, 720, Y]] }, mood: { virgo: lt => lt > 4.2 ? 'happy' : 'neutral', sagittarius: 'happy' },
        lines: [[0.3, 2.0, 'sagittarius', 'what if we | get lost?'], [2.5, 1.4, 'virgo', "we won't."], [4.1, 1.6, 'sagittarius', 'but what if?']] },
      { dur: 6, set: (x, t) => night(x, t), front: (x, t, lt, P) => tieRope(x, P.at('virgo').slice(0, 2), P.at('sagittarius').slice(0, 2)),
        cast: { virgo: [[0, 400, Y]], sagittarius: [[0, 680, Y]] }, mood: { virgo: 'wink', sagittarius: 'heart' },
        lines: [[0.4, 2.4, 'virgo', "...then we'll | have souvenirs."], [3.2, 1.8, 'sagittarius', 'best | partner.']] },
    ],
  },
}
