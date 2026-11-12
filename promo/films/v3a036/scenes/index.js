// v3a036: star_advice, ADVICE SOLO, "Aquarius, you're | allowed to rest." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission to rest, Aquarius-style, one gag each.
//   0.0–3.6    "Aquarius, you’re | allowed *to rest.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              saving the world can wait (a globe: BACK MONDAY) · close the tabs, they'll keep (a browser with a wall of tabs)
//              · the big idea can sleep too (a light bulb in a nightcap) · logging off isn't giving up (laptop: LOGGED OFF)
//              · skip the debate, eat cereal · stargazing counts as rest (a telescope) · the puzzle can stay unsolved
//              · robots recharge too (a little robot, asleep) · lie on the floor, ten minutes (VERY PRODUCTIVE)
//  37.8        "Genius. | *Recharging.*"  Aquarius comes back, sleepy.
//  41.2        callback: "The idea woke up. | *Aquarius didn’t.*" (the light bulb from card three flicks on beside a sleeping Aquarius)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#4fd1e0'
const S = 'aquarius'

function globe(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, 130, 28, 60); x.fillRect(-90, 180, 180, 26)
  x.fillStyle = WOOD; x.fillRect(-84, 184, 168, 16)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#4a8fe0'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.clip()
  const off = (t * 30) % 280
  x.fillStyle = '#5fd068'
  for (const d of [0, -280]) { x.fillRect(-120 + off + d, -60, 90, 70); x.fillRect(-80 + off + d, 10, 50, 90); x.fillRect(30 + off + d, -90, 110, 60); x.fillRect(60 + off + d, -20, 60, 80) }
  x.restore()
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, 166, Math.PI * 0.6, Math.PI * 1.4); x.stroke()
  x.restore()
}
function browser(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 300)
  x.fillStyle = '#2a2350'; x.fillRect(-182, -142, 364, 284)
  const tabW = Math.max(10, 340 / Math.max(1, n))
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(-176 + i * tabW, -136, tabW - 2, 34); x.fillStyle = [TEAL, PINK, GOLD, MINT, LAV][i % 5]; x.fillRect(-174 + i * tabW, -134, Math.max(1, tabW - 6), 30) }
  x.fillStyle = CREAM; x.fillRect(-172, -96, 344, 228)
  x.fillStyle = 'rgba(27,18,54,0.3)'; for (let i = 0; i < 5; i++) x.fillRect(-150, -70 + i * 38, i % 2 ? 200 : 290, 14)
  x.restore()
}
// a pixel light bulb (optionally sleeping in a nightcap)
function bulb(x, t, cx, cy, k, { on = 0, cap = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (on > 0.01) { const g = x.createRadialGradient(0, -20, 10, 0, -20, 260); g.addColorStop(0, `rgba(255,230,120,${0.6 * on})`); g.addColorStop(1, 'rgba(255,230,120,0)'); x.fillStyle = g; x.fillRect(-260, -280, 520, 520) }
  x.fillStyle = INK; x.beginPath(); x.arc(0, -30, 110, 0, Math.PI * 2); x.fill(); x.fillRect(-60, 40, 120, 110)
  x.fillStyle = on > 0.5 ? '#ffe680' : '#e9e2c8'; x.beginPath(); x.arc(0, -30, 100, 0, Math.PI * 2); x.fill(); x.fillRect(-50, 40, 100, 40)
  x.fillStyle = '#9a9ab0'; x.fillRect(-52, 84, 104, 58); x.fillStyle = INK; for (let i = 0; i < 3; i++) x.fillRect(-52, 92 + i * 18, 104, 5)
  // face
  x.fillStyle = INK
  if (on > 0.5) { x.fillRect(-46, -50, 20, 26); x.fillRect(26, -50, 20, 26); x.fillRect(-20, 6, 40, 10) }
  else { x.fillRect(-50, -36, 28, 8); x.fillRect(22, -36, 28, 8); x.fillRect(-10, 6, 20, 8) }
  if (cap && on < 0.5) {
    x.fillStyle = INK; x.beginPath(); x.moveTo(-110, -90); x.quadraticCurveTo(-20, -210, 130, -170); x.lineTo(90, -110); x.closePath(); x.fill()
    x.fillStyle = '#6a7ff0'; x.beginPath(); x.moveTo(-98, -96); x.quadraticCurveTo(-20, -198, 118, -164); x.lineTo(84, -116); x.closePath(); x.fill()
    x.fillStyle = INK; x.beginPath(); x.arc(134, -170, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(134, -170, 16, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff'; x.fillRect(-110, -102, 210, 20)
  }
  x.restore()
  if (on < 0.5) for (let i = 0; i < 3; i++) { const ph = (t * 0.5 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = BONE; x.font = `800 ${Math.round((28 + i * 8) * k)}px ${INTER}`; x.textAlign = 'center'; x.fillText('z', cx + (120 + ph * 60) * k, cy - (120 + ph * 120 + i * 10) * k); x.restore() }
}
function laptop(x, cx, cy, k, shut) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, 60, 400, 34); x.fillStyle = '#9a9ab0'; x.fillRect(-192, 66, 384, 20)
  const h = lerp(230, 14, shut)
  x.fillStyle = INK; x.fillRect(-170, 60 - h, 340, h + 4)
  if (h > 40) { x.fillStyle = '#140c30'; x.fillRect(-158, 72 - h, 316, h - 24); x.fillStyle = MINT; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; if (h > 120) x.fillText('LOGGED OFF :)', 0, 60 - h / 2) }
  x.restore()
}
function cereal(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -30, 170, 50, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f4ff'; x.beginPath(); x.ellipse(0, -34, 158, 42, 0, 0, Math.PI * 2); x.fill()
  const cols = [PINK, GOLD, MINT, TEAL, LAV, RED]
  for (let i = 0; i < 14; i++) { x.fillStyle = cols[i % 6]; x.beginPath(); x.arc(-120 + (i * 37) % 240, -44 + (i % 3) * 10 + 3 * Math.sin(t * 3 + i), 13, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4f4ff'; x.beginPath(); x.arc(-120 + (i * 37) % 240, -44 + (i % 3) * 10 + 3 * Math.sin(t * 3 + i), 5, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-180, -30); x.lineTo(180, -30); x.lineTo(120, 100); x.lineTo(-120, 100); x.closePath(); x.fill()
  x.fillStyle = TEAL; x.beginPath(); x.moveTo(-170, -22); x.lineTo(170, -22); x.lineTo(114, 92); x.lineTo(-114, 92); x.closePath(); x.fill()
  x.fillStyle = INK; x.save(); x.translate(110, -60); x.rotate(-0.6); x.fillRect(-12, -110, 24, 130); x.fillStyle = '#dfe7f2'; x.fillRect(-6, -104, 12, 118); x.restore()
  x.restore()
}
function telescope(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(0, 0); x.lineTo(-90, 200); x.moveTo(0, 0); x.lineTo(90, 200); x.moveTo(0, 0); x.lineTo(0, 210); x.stroke()
  x.strokeStyle = WOOD; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(-90, 200); x.moveTo(0, 0); x.lineTo(90, 200); x.moveTo(0, 0); x.lineTo(0, 210); x.stroke()
  x.rotate(-0.6)
  x.fillStyle = INK; x.fillRect(-150, -40, 300, 80); x.fillRect(140, -54, 50, 108)
  x.fillStyle = '#6a7ff0'; x.fillRect(-142, -32, 284, 64); x.fillStyle = GOLD; x.fillRect(146, -46, 38, 92); x.fillStyle = '#4a5cd0'; x.fillRect(-40, -32, 20, 64)
  x.restore()
}
const CUBE = ['RRRGGGBBB', 'RRRGGGBBB', 'RRRGGGBBB', 'YYYWWWRRR', 'YYYWWWRRR', 'YYYWWWRRR', 'GGGBBBYYY', 'GGGBBBYYY', 'GGGBBBYYY']
function robot(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-6, -200, 12, 50); x.beginPath(); x.arc(0, -206, 16, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; x.beginPath(); x.arc(0, -206, 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-110, -160, 220, 150); x.fillRect(-130, 0, 260, 170)
  x.fillStyle = '#c9c9d9'; x.fillRect(-102, -152, 204, 134); x.fillRect(-122, 8, 244, 154)
  x.fillStyle = INK; x.fillRect(-64, -96, 40, 10); x.fillRect(24, -96, 40, 10); x.fillRect(-20, -54, 40, 8)
  x.fillStyle = MINT; x.fillRect(-70, 50, 140, 70); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SLEEP', 0, 86)
  x.restore()
  for (let i = 0; i < 3; i++) { const ph = (t * 0.5 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = BONE; x.font = `800 ${Math.round((26 + i * 8) * k)}px ${INTER}`; x.textAlign = 'center'; x.fillText('z', cx + (100 + ph * 60) * k, cy - (160 + ph * 120) * k); x.restore() }
}

const CAMEOS = [
  { sign: S, cap: 'Saving the world | *can wait till Monday.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      globe(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.9)
      label(x, 790, 650, 'BACK MONDAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Close the tabs. | *They’ll keep.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = lt < 1.3 ? Math.min(40, 3 + Math.floor(lt * 35)) : Math.max(1, 40 - Math.floor((lt - 1.3) * 80))
      browser(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), n)
      label(x, 790, 1110, lt > 1.6 ? 'ONE TAB. PEACE.' : 'TABS: ALL OF THEM', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 30, bg: lt > 1.6 ? MINT : PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your big idea | *can sleep too.*', mood: 'sleepy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bulb(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.95, { on: 0 })
      label(x, 790, 1130, 'IDEA: NAPPING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Logging off | *isn’t giving up.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      laptop(x, 770, 960, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 1.2, 1.6)))
      label(x, 790, 660, 'THE INTERNET SURVIVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skip the debate. | *Eat cereal.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 1], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'well, actually—', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.1 ? 1 : 0), { size: 36, col: LAV, tail: 'bl' })
      cereal(x, t, 790, 960, pop01(t, P.t0 + 0.9, 0.35, 2))
      label(x, 760, 650, 'CEREAL > DEBATE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stargazing | *counts as rest.*', mood: 'sparkle', look: [1, -1], star: { x: -220, y: 40 },
    back(x, t, lt, P) { for (let i = 0; i < 7; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 4 + i * 2); x.save(); x.globalAlpha = tw; x.fillStyle = i % 2 ? GOLD : BONE; const sx = 640 + (i * 97) % 300, sy = 560 + (i * 53) % 160; x.fillRect(sx - 4, sy - 12, 8, 24); x.fillRect(sx - 12, sy - 4, 24, 8); x.restore() } },
    front(x, t, lt, P) {
      telescope(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.9)
      label(x, 790, 1150, 'OFFICIALLY RESTING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Some puzzles can | *stay unsolved tonight.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), down = ease.inOutCubic(prog(lt, 1.1, 1.5))
      drawBits(x, CUBE, { R: RED, G: '#5fd068', B: '#4a8fe0', Y: GOLD, W: '#fff' }, 790, lerp(860, 980, down), 26 * k, { rot: lerp(0.3 * Math.sin(lt * 6), 0.15, down) })
      label(x, 790, 650, 'LATER, CUBE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even robots | *recharge.*', mood: 'sleepy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      robot(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.85)
      label(x, 790, 1150, 'SO CAN YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lie on the floor. | *Ten minutes.*', mood: 'sleepy', star: { x: 0, y: 110, s: 300 }, squash: lt => lt > 0.6 ? 0.35 : 0,
    front(x, t, lt, P) {
      label(x, 540, 640, 'VERY PRODUCTIVE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a036', key: 'D', accent: TEAL, solo: S, ending: 'callback',
  title: 'Aquarius, you’re | allowed *to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Genius. | *Recharging.*', mood: 'sleepy' },
  last: {
    text: 'The idea woke up. | *Aquarius didn’t.*',
    draw(x, t, lt) {
      const t0 = t - lt
      signChar(x, t, S, 400, 950, 240, { mood: 'sleepy', pop: pop01(t, t0 + 0.2, 0.45, 1.8), seed: 9 })
      bulb(x, t, 720, 880, pop01(t, t0 + 0.5, 0.35, 2) * 0.8, { on: lt > 1.3 ? 1 : 0 })
      if (lt > 1.3) sparkles(x, t, 720, 860, t0 + 1.3, 8, 170, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
