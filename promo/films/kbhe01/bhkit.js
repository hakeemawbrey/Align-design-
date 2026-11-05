// BRAIN VS HEART show kit (promo/films/month2/m04.md). Owned by kbhe01; kbhe02–kbhe20 import it from here (read-only).
// We are inside one sign's head: a purple control room. The big window at the top is the sign's eyes; the console below
// has one giant button for tonight's decision; tiny BRAIN (pink, round glasses) and tiny HEART (red, zero chill) fight
// over it. The console carries the scoreboard and the PISCES CAM monitor (Pisces watches every episode and cries).
// Everything draws as a pure function of its arguments; nothing touches `document` at module top level.
//
//   L                                    the layout (1080 × 1920): L.WIN window rect, L.DESK desk top y, L.BTN button, L.CAM, L.SCORE
//   drawRoom(x, t, { sign, alarm })      the room behind everything (walls, pipes, blinking lights; alarm 0…1 = red pulse)
//   drawWindow(x, t, fn, { blinks, label, shake }) the eyes: fn(x, R) draws what the sign sees, clipped to the window R;
//                                        blinks: [t…] eyelid blinks (use them to change what the window shows)
//   drawDesk(x, t, { button, score, cam })   the console: the giant button ({ label, press: [t…], col, glow, alpha }),
//                                        the scoreboard ({ b, h, at }: schedules [[t, n]…]), the Pisces cam (camOpts)
//   drawBrain(x, t, P) / drawHeart(x, t, P)  the two leads. P = { x, y (feet), c (cell px, default 12), mood, mouth,
//                                        look [-1…1, -1…1], arms: [aL, aR] (radians, 0 = down, + = outwards/up), reach (0…1.6),
//                                        walk (phase, legs), flip, rot, squash, alpha, pop, tears 0…3, hops [t…], prop }
//       moods: neutral wide angry happy sad shut dizzy love cry sly · mouths: smile open frown flat grin o wobble scream
//   bubble(x, t, B)                      a pixel speech bubble: { x, y, t0, t1, text ('*accent*'), who: 'brain'|'heart'|'stars'|col,
//                                        tail: dx, size, maxW } (pops in at t0, out at t1)
//   drawChat(x, t, R, C)                 a messenger screen inside rect R: { title, msgs: [{ at, side, text, status }],
//                                        typing: [a, b], draft: ops (see draftAt), dim }
//   draftAt(t, ops)                      the draft field text at t from ops [{ t, type: 'type'|'del'|'clear', text?, n?, cps? }]
//   drawCam(x, t, R, camOpts)            the Pisces cam monitor: { tears (n or [[t, n]…]), mood, look, who: 'pisces'|'stars', hops }
//   drawRef(x, t, P)                     THE STARS as the referee (whistle + armband), for the longs
//   buildBug(root, { sign, at })         DOM bug: "BRAIN VS HEART" + "INSIDE: ♈ ARIES"
//   bubbleCues(list)                     a pop + a little chirp per bubble (list of bubble opts)
//   drawLever(x, t, { x, y, a, label })  a console lever (a = 0 up … 1 pulled down)
//   makeBuild(cfg)                       the whole room as a scene builder: { sign, view(x, t, R), blinks, desk(t) → drawDesk opts,
//                                        brain(t) / heart(t) → P (null = hidden), back(x, t) (behind the leads), front(x, t, B, H)
//                                        (after the leads), bubbles, alarm(t), label }
//   stepObj(t, [[t, {…}]…], base)        merged step schedule for poses
//   step(t, [[t, v]…], v0)  key(t, [[t, v, ease?]…])   schedules: step value / tweened number
//   drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK, popOut (re-exported from the STAR MAIL kit)
import { clamp, lerp, prog, ease, el, rng } from '../../src/lib.js'
import { drawStarChar, signStar, STAR } from '../startalk.js'
import { SIGNS, easeOutBack, GRAIN_H } from '../wheel.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK, popOut } from '../sxmail1/scenes/mail.js'
export { drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK, popOut, clamp, lerp, prog, ease, el, easeOutBack, drawStarChar, signStar, STAR }

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff4a5e', SKYB = '#8fe3ff'
export const BRAIN_C = '#ff9ec7', HEART_C = '#ff3b5c'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)
export const L = {
  W: 1080, H: 1920,
  WIN: { x: 70, y: 470, w: 940, h: 560 },
  DESK: 1440,
  BTN: { x: 540, y: 1440, r: 104 },
  BRAIN: { x: 250, y: 1440 }, HEART: { x: 830, y: 1440 },
  CAM: { x: 60, y: 1522, w: 300, h: 236 },
  SCORE: { x: 400, y: 1530, w: 614, h: 112 },
}

// ─────────────────────────────────────────────── schedules
export function step(t, list, v0) { let v = v0; for (const [a, b] of list) if (t >= a) v = b; return v }
export function key(t, keys) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1, e] = keys[i], [t0, v0] = keys[i - 1]
    if (t <= t1) return lerp(v0, v1, (e || ease.inOutCubic)((t - t0) / (t1 - t0)))
  }
  return keys[keys.length - 1][1]
}
const R_ = (x, c, a, b, w, h) => { x.fillStyle = c; x.fillRect(a, b, w, h) }
function rrect(x, a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath() }
export { rrect, R_ as R }
const sigOf = id => SIGNS.find(s => s.id === id) || SIGNS[0]

// ─────────────────────────────────────────────── the room
export function drawRoom(x, t, { sign = 'aries', alarm = 0, dim = 1 } = {}) {
  const S = sigOf(sign)
  const g = x.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, '#2a1650'); g.addColorStop(0.45, '#3a1f66'); g.addColorStop(0.75, '#251247'); g.addColorStop(1, '#120826')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // curved "skull" ribs (wide pixel arcs) in the sign's colour, faint
  x.save(); x.globalAlpha = 0.16 * dim
  for (let k = 0; k < 5; k++) {
    const r = 760 + k * 150
    x.strokeStyle = k % 2 ? S.color : '#c9a6ff'; x.lineWidth = 18
    x.beginPath(); x.arc(540, 1250, r, Math.PI * 1.08, Math.PI * 1.92); x.stroke()
  }
  x.restore()
  // pipes down both walls with little sliding light pulses ("thoughts")
  for (const side of [0, 1]) {
    const px = side ? 1040 : 22
    R_(x, INK, px - 4, 0, 30, 1920); R_(x, '#4b2d84', px, 0, 22, 1920); R_(x, '#6a46b0', px + 3, 0, 5, 1920)
    for (let k = 0; k < 4; k++) {
      const ph = ((t * 0.35 + k / 4 + side * 0.13) % 1)
      const yy = 1920 - ph * 1920
      x.save(); x.globalCompositeOperation = 'lighter'
      const gg = x.createRadialGradient(px + 11, yy, 0, px + 11, yy, 40); gg.addColorStop(0, 'rgba(255,170,220,0.55)'); gg.addColorStop(1, 'rgba(255,170,220,0)')
      x.fillStyle = gg; x.fillRect(px - 30, yy - 40, 82, 80); x.restore()
      R_(x, '#ffd1ea', px + 6, yy - 8, 10, 16)
    }
  }
  // twinkling neuron lights scattered on the back wall
  const r = rng(77)
  for (let k = 0; k < 26; k++) {
    const a = 70 + r() * 940, b = 120 + r() * 1150, ph = (t * (0.4 + r() * 0.5) + r()) % 1
    const on = Math.sin(ph * Math.PI * 2) > 0.3
    if (!on) continue
    R_(x, k % 3 ? '#c9a6ff' : S.color, Math.round(a / 4) * 4, Math.round(b / 4) * 4, 6, 6)
  }
  if (alarm > 0) {
    x.save(); x.globalAlpha = alarm * (0.18 + 0.14 * Math.sin(t * 18)); x.fillStyle = '#ff2040'; x.fillRect(0, 0, 1080, 1920); x.restore()
  }
}

// ─────────────────────────────────────────────── the window (the sign's eyes)
export function drawWindow(x, t, fn, { blinks = [], label = 'LIVE VIEW', sign = 'aries', R = L.WIN, alpha = 1 } = {}) {
  const { x: wx, y: wy, w, h } = R
  x.save(); x.globalAlpha *= alpha
  // frame: chunky ink + violet bevel + rivets
  x.fillStyle = INK; rrect(x, wx - 22, wy - 22, w + 44, h + 44, 54); x.fill()
  x.fillStyle = '#5a3a9a'; rrect(x, wx - 14, wy - 14, w + 28, h + 28, 48); x.fill()
  x.fillStyle = '#7d5cc4'; rrect(x, wx - 14, wy - 14, w + 28, 10, 5); x.fill()
  for (const [a, b] of [[wx - 2, wy + 30], [wx + w + 2, wy + 30], [wx - 2, wy + h - 30], [wx + w + 2, wy + h - 30]]) { R_(x, INK, a - 7, b - 7, 14, 14); R_(x, '#c9a6ff', a - 4, b - 4, 8, 8) }
  // content
  x.save(); rrect(x, wx, wy, w, h, 40); x.clip()
  x.fillStyle = '#0d0a22'; x.fillRect(wx, wy, w, h)
  fn && fn(x, R)
  // glass sheen
  const sh = x.createLinearGradient(wx, wy, wx + w, wy + h)
  sh.addColorStop(0, 'rgba(255,255,255,0.10)'); sh.addColorStop(0.35, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(255,255,255,0.03)')
  x.fillStyle = sh; x.fillRect(wx, wy, w, h)
  // eyelids
  let lid = 0
  for (const b of blinks) { const d = t - b; if (d > -0.09 && d < 0.13) lid = Math.max(lid, d < 0 ? 1 + d / 0.09 : 1 - d / 0.13) }
  if (lid > 0) {
    const lh = (h / 2 + 6) * ease.inOutQuad(clamp(lid))
    x.fillStyle = '#5a2e6e'; x.fillRect(wx, wy, w, lh); x.fillRect(wx, wy + h - lh, w, lh)
    x.fillStyle = '#3a1a4e'; x.fillRect(wx, wy + lh - 10, w, 10); x.fillRect(wx, wy + h - lh, w, 10)
  }
  x.restore()
  // label tag on the frame: red rec dot + LIVE VIEW
  const S = sigOf(sign)
  const lbl = `${label} · ${S.glyph}︎ ${S.name.toUpperCase()}`
  x.font = `700 24px ${MONO}`
  const tw2 = x.measureText(lbl).width + 64
  const lx = wx + w / 2 - tw2 / 2, ly = wy - 22 - 22
  R_(x, INK, lx, ly, tw2, 44); R_(x, '#2a1a50', lx + 4, ly + 4, tw2 - 8, 36)
  if (Math.floor(t * 1.6) % 2 === 0) { x.fillStyle = '#ff3b5c'; x.beginPath(); x.arc(lx + 26, ly + 22, 8, 0, Math.PI * 2); x.fill() }
  x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(lbl, lx + 44, ly + 23)
  x.restore()
}

// ─────────────────────────────────────────────── the desk, the button, the scoreboard
export function drawButton(x, t, { label = 'SEND', press = [], col = '#ff3b5c', glow = 0.5, alpha = 1, cx = L.BTN.x, cy = L.BTN.y, r = L.BTN.r } = {}) {
  if (alpha <= 0.01) return
  let p = 0
  for (const b of press) { const d = t - b; if (d >= 0 && d < 0.35) p = Math.max(p, d < 0.06 ? d / 0.06 : 1 - (d - 0.06) / 0.29) }
  x.save(); x.globalAlpha *= alpha
  // glow
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy - r * 0.4, 0, cx, cy - r * 0.4, r * 2.4); g.addColorStop(0, `rgba(255,80,110,${0.35 * glow * (0.8 + 0.2 * Math.sin(t * 5))})`); g.addColorStop(1, 'rgba(255,80,110,0)'); x.fillStyle = g; x.fillRect(cx - r * 2.4, cy - r * 2.8, r * 4.8, r * 4.8); x.restore() }
  // base ring
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, r + 30, 34, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c2dc'; x.beginPath(); x.ellipse(cx, cy - 4, r + 20, 26, 0, 0, Math.PI * 2); x.fill()
  // dome
  const dh = r * 0.78 * (1 - 0.55 * p)
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy - 6, r + 8, dh + 8, 0, Math.PI, 0); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy - 6, r, dh, 0, Math.PI, 0); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.4)'; x.beginPath(); x.ellipse(cx - r * 0.35, cy - 6 - dh * 0.6, r * 0.28, dh * 0.16, -0.3, 0, Math.PI * 2); x.fill()
  x.restore()
  // the label plate on the desk front
  if (label) {
    x.save(); x.globalAlpha *= alpha
    x.font = `800 30px ${INTER}`
    const w = x.measureText(label).width + 44
    R_(x, INK, cx - w / 2, cy + 22, w, 50); R_(x, '#f2c75c', cx - w / 2 + 4, cy + 26, w - 8, 42)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, cx, cy + 48)
    x.restore()
  }
}
export function drawDesk(x, t, { button = {}, score = null, cam = {}, deskCol = '#4a2c86' } = {}) {
  const y = L.DESK
  // desk top surface + front panel
  R_(x, INK, 0, y - 12, 1080, 1920 - y + 12)
  R_(x, '#6b49b4', 0, y - 6, 1080, 22)
  R_(x, deskCol, 0, y + 16, 1080, 1920 - y - 16)
  R_(x, '#3a2170', 0, y + 300, 1080, 1920 - y - 300)
  // small blinking switch row
  for (let i = 0; i < 14; i++) {
    const on = Math.sin(t * (1.3 + (i % 5) * 0.37) + i * 1.7) > 0
    R_(x, INK, 404 + i * 44, 1672, 30, 30); R_(x, on ? ['#ffd23a', '#5fd38a', '#ff8fb1', '#7fd0ff'][i % 4] : '#2a1a50', 408 + i * 44, 1676, 22, 22)
  }
  drawButton(x, t, button)
  if (score) drawScore(x, t, score)
  if (cam !== false) drawCam(x, t, L.CAM, cam)
}
export function drawScore(x, t, { b = [[0, 0]], h = [[0, 0]], R = L.SCORE, alpha = 1, labels = ['BRAIN', 'HEART'] } = {}) {
  if (alpha <= 0.01) return
  const { x: sx, y: sy, w, h: sh } = R
  const nb = step(t, b, 0), nh = step(t, h, 0)
  const lastB = Math.max(...b.filter(([a]) => a <= t).map(([a]) => a), -9), lastH = Math.max(...h.filter(([a]) => a <= t).map(([a]) => a), -9)
  x.save(); x.globalAlpha *= alpha
  R_(x, INK, sx, sy, w, sh); R_(x, '#140a2c', sx + 6, sy + 6, w - 12, sh - 12)
  x.textBaseline = 'middle'
  x.font = `800 30px ${INTER}`; x.letterSpacing = '0.12em'
  x.fillStyle = BRAIN_C; x.textAlign = 'left'; x.fillText(labels[0], sx + 26, sy + sh / 2 + 2)
  x.fillStyle = HEART_C; x.textAlign = 'right'; x.fillText(labels[1], sx + w - 26, sy + sh / 2 + 2)
  x.letterSpacing = '0px'
  const fl = k => (t - k < 0.5 ? 1 + 0.5 * Math.sin(Math.PI * clamp((t - k) / 0.5)) : 1)
  x.font = `700 64px ${MONO}`; x.textAlign = 'center'
  x.save(); x.translate(sx + w / 2 - 70, sy + sh / 2 + 4); x.scale(fl(lastB), fl(lastB)); x.fillStyle = '#ffe9a8'; x.fillText(String(nb), 0, 0); x.restore()
  x.fillStyle = '#8a7fb8'; x.fillText(':', sx + w / 2, sy + sh / 2)
  x.save(); x.translate(sx + w / 2 + 70, sy + sh / 2 + 4); x.scale(fl(lastH), fl(lastH)); x.fillStyle = '#ffe9a8'; x.fillText(String(nh), 0, 0); x.restore()
  x.restore()
}

// ─────────────────────────────────────────────── the Pisces cam
export function drawCam(x, t, R = L.CAM, { tears = 1, mood = 'sparkle', look = [0, 0], who = 'pisces', hops = null, label = null, alpha = 1, big = 0, react = null } = {}) {
  if (alpha <= 0.01) return
  const { x: cx0, y: cy0, w, h } = R
  x.save(); x.globalAlpha *= alpha
  R_(x, INK, cx0 - 8, cy0 - 8, w + 16, h + 16); R_(x, '#7d5cc4', cx0 - 4, cy0 - 4, w + 8, h + 8)
  R_(x, '#0f1a3a', cx0, cy0, w, h)
  x.save(); x.beginPath(); x.rect(cx0, cy0, w, h); x.clip()
  // a little bedroom: wall + a lamp glow + a pillow
  const g = x.createRadialGradient(cx0 + w * 0.8, cy0 + 30, 0, cx0 + w * 0.8, cy0 + 30, w); g.addColorStop(0, 'rgba(255,200,150,0.35)'); g.addColorStop(1, 'rgba(255,200,150,0)')
  x.fillStyle = g; x.fillRect(cx0, cy0, w, h)
  R_(x, '#24305e', cx0, cy0 + h * 0.72, w, h * 0.3)
  const tn = Array.isArray(tears) ? step(t, tears, 0) : tears
  const md = Array.isArray(mood) ? step(t, mood, 'sparkle') : mood
  const S = who === 'stars' ? { color: STAR.sky, glyph: null } : signStar('pisces')
  const s = Math.min(w, h) * 0.92
  const px = cx0 + w / 2, py = cy0 + h * 0.6
  drawStarChar(x, px, py, s, t, { color: S.color, mood: md, look, seed: 6, glow: 0.7, hops })
  if (who !== 'stars' && tn > 0) { const F = starFrame(px, py, s, t, { hops, seed: 6 }); inSprite(x, F, () => tearsCells(x, t, tn)) }
  if (react) react(x, t, R)
  x.restore()
  // REC tag
  x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const tag = label || (who === 'stars' ? 'STARS CAM' : 'PISCES CAM')
  const tw2 = x.measureText(tag).width + 40
  R_(x, INK, cx0 + 8, cy0 + 8, tw2, 30)
  if (Math.floor(t * 1.6) % 2 === 0) { x.fillStyle = '#ff3b5c'; x.beginPath(); x.arc(cx0 + 22, cy0 + 23, 6, 0, Math.PI * 2); x.fill() }
  x.fillStyle = BONE; x.fillText(tag, cx0 + 34, cy0 + 24)
  x.restore()
}

// ─────────────────────────────────────────────── the leads
const BRAIN_BM = [
  '....PPPPP..PPPPP....',
  '..PPPdPPPP.PPPPdPP..',
  '.PPdPPPPdPPdPPPPdPP.',
  'PPPPPdPPPPPPPdPPPPPP',
  'PdPPPPPdPPPPPPPPdPPP',
  'PPPPdPPPPPdPPdPPPPdP',
  'PPPPPPPPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPPPPPPPP',
  '.PPPPPPPPPPPPPPPPPP.',
  '.PPPPPPPPPPPPPPPPPP.',
  '..PPPPPPPPPPPPPPPP..',
  '....PPPPPPPPPPPP....',
]
const HEART_BM = [
  '..RRRRR.....RRRRR..',
  '.RRRRRRR...RRRRRRR.',
  'RRhhRRRRR.RRRRRRRRR',
  'RRhRRRRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRRRRRRR',
  '.RRRRRRRRRRRRRRRRR.',
  '..RRRRRRRRRRRRRRR..',
  '...RRRRRRRRRRRRR...',
  '....RRRRRRRRRRR....',
  '.....RRRRRRRRR.....',
  '......RRRRRRR......',
  '.......RRRRR.......',
  '........RRR........',
]
// face cells: eyes centred at (ex, ey) cells, mouth at (mx, my)
const FACE = { brain: { el: 6, er: 13, ey: 8, mx: 9.5, my: 11 }, heart: { el: 5.5, er: 12.5, ey: 6, mx: 9, my: 9 } }

function face(x, kind, c, mood, mouth, look, t, seed, blinkOn) {
  const F = FACE[kind]
  const lx = clamp(Math.round((look?.[0] ?? 0) * 1.2), -1, 1), ly = clamp(Math.round((look?.[1] ?? 0) * 1.2), -1, 1)
  const cell = (i, j, col, w = 1, h = 1) => { x.fillStyle = col; x.fillRect(Math.round(i * c), Math.round(j * c), Math.ceil(w * c), Math.ceil(h * c)) }
  for (const [side, ex] of [[-1, F.el], [1, F.er]]) {
    const ox = ex - 1, oy = F.ey - 1.5
    const blink = blinkOn && !['happy', 'shut', 'dizzy', 'love', 'cry'].includes(mood)
    if (blink) { cell(ox - 0.5, oy + 1.5, INK, 3, 0.8); continue }
    if (mood === 'happy') { cell(ox - 0.5, oy + 1.5, INK, 1, 1); cell(ox + 0.5, oy + 0.5, INK, 1, 1); cell(ox + 1.5, oy + 1.5, INK, 1, 1); continue }
    if (mood === 'shut' || mood === 'cry') { cell(ox - 0.5, oy + 1.5, INK, 3, 0.8); if (mood === 'cry') cell(ox - 0.5, oy + 0.6, INK, 0.8, 0.8); continue }
    if (mood === 'dizzy') { cell(ox - 0.5, oy, INK); cell(ox + 1.5, oy, INK); cell(ox + 0.5, oy + 1, INK); cell(ox - 0.5, oy + 2, INK); cell(ox + 1.5, oy + 2, INK); continue }
    if (mood === 'love') { const P = '#ff2a52'; cell(ox - 0.5, oy, P); cell(ox + 1.5, oy, P); cell(ox - 0.5, oy + 1, P, 3, 1); cell(ox + 0.5, oy + 2, P); continue }
    const wide = mood === 'wide'
    cell(ox - (wide ? 0.5 : 0), oy - (wide ? 0.4 : 0), '#ffffff', wide ? 3 : 2, wide ? 3.4 : 3)
    if (wide) cell(ox + 0.5 + lx * 0.6, oy + 1 + ly * 0.6, INK, 1, 1.2)
    else cell(ox + 0.5 + lx * 0.5, oy + 0.8 + ly * 0.6, INK, 1, 1.6)
    if (mood === 'angry') { cell(ox - 0.7 + (side < 0 ? 0 : 1.4), oy - 1.6, INK, 1.4, 0.8); cell(ox + 0.6 + (side < 0 ? 0 : -1.4), oy - 1, INK, 1.4, 0.8) }
    if (mood === 'sad') { cell(ox - 0.7 + (side < 0 ? 1.4 : 0), oy - 1.6, INK, 1.4, 0.8); cell(ox + 0.6 + (side < 0 ? -1.4 : 1.4), oy - 1, INK, 1.4, 0.8) }
    if (mood === 'sly') cell(ox - 0.2, oy - 0.2, kind === 'brain' ? BRAIN_C : HEART_C, 2.4, 1.3)
  }
  // glasses (Brain only): round-ish rims around both eyes + a bridge
  if (kind === 'brain') {
    x.strokeStyle = INK; x.lineWidth = c * 0.55
    for (const ex of [F.el, F.er]) { x.beginPath(); x.arc(ex * c, (F.ey) * c, c * 2.15, 0, Math.PI * 2); x.stroke() }
    x.beginPath(); x.moveTo((F.el + 2.1) * c, F.ey * c - c * 0.4); x.lineTo((F.er - 2.1) * c, F.ey * c - c * 0.4); x.stroke()
  }
  // mouth
  const mx = F.mx, my = F.my + (kind === 'brain' ? 0.8 : 0.6)
  const m = mouth || ({ happy: 'smile', love: 'grin', angry: 'flat', sad: 'frown', wide: 'o', cry: 'wobble', dizzy: 'wobble', sly: 'smile' }[mood] || 'flat')
  if (m === 'smile') { cell(mx - 2, my - 1, INK); cell(mx - 1, my, INK, 2, 1); cell(mx + 1, my - 1, INK) }
  else if (m === 'grin') { cell(mx - 2, my - 1, INK, 4, 1); cell(mx - 1.5, my, INK, 3, 1); cell(mx - 1, my - 0.4, '#ff8fa0', 2, 0.8) }
  else if (m === 'frown') { cell(mx - 2, my, INK); cell(mx - 1, my - 1, INK, 2, 1); cell(mx + 1, my, INK) }
  else if (m === 'o') { cell(mx - 0.75, my - 1.2, INK, 1.5, 1.8) }
  else if (m === 'open') { cell(mx - 1.5, my - 1.2, INK, 3, 2); cell(mx - 0.8, my - 0.2, '#ff6f86', 1.6, 0.9) }
  else if (m === 'scream') { const k = 0.85 + 0.15 * Math.sin(t * 40); cell(mx - 1.6, my - 1.6, INK, 3.2, 3 * k); cell(mx - 0.9, my, '#ff6f86', 1.8, 1 * k) }
  else if (m === 'wobble') { const o = Math.round(Math.sin(t * 22 + seed)); cell(mx - 2, my + (o > 0 ? 0 : -0.5), INK); cell(mx - 1, my - 0.5 + (o > 0 ? -0.5 : 0), INK); cell(mx, my, INK); cell(mx + 1, my - 0.5, INK) }
  else cell(mx - 1.5, my - 0.5, INK, 3, 0.9)
}

function limb(x, x0, y0, ang, len, c, col, handCol) {
  const x1 = x0 + Math.sin(ang) * len, y1 = y0 + Math.cos(ang) * len
  x.lineCap = 'round'
  x.strokeStyle = INK; x.lineWidth = c * 1.9; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke()
  x.strokeStyle = col; x.lineWidth = c * 0.95; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke()
  x.fillStyle = INK; x.fillRect(x1 - c * 1.3, y1 - c * 1.3, c * 2.6, c * 2.6)
  x.fillStyle = handCol || col; x.fillRect(x1 - c * 0.85, y1 - c * 0.85, c * 1.7, c * 1.7)
  return { x: x1, y: y1 }
}

function hopLift(t, hops) {
  if (!hops) return { lift: 0, sq: 0 }
  let h = -1e9; for (const v of hops) if (v <= t && v > h) h = v
  const d = t - h
  if (d > 0.55) return { lift: 0, sq: 0 }
  if (d < 0.05) return { lift: 0, sq: 0.1 }
  if (d < 0.33) { const p = (d - 0.05) / 0.28; return { lift: Math.sin(Math.PI * p), sq: -0.08 } }
  const e = d - 0.33; return { lift: 0, sq: 0.12 * Math.exp(-e * 12) * Math.cos(e * 26) }
}

/** returns hand positions { hl, hr, top, cx, cy } in canvas coords (for props) */
function drawLead(kind, x, t, P) {
  const { x: px, y: py, c = 14, mood = 'neutral', mouth = null, look, arms = [0.5, 0.5], reach = 1, walk = null, flip = false, rot = 0, squash = 0, alpha = 1, pop = 1, tears = 0, hops = null, seed = kind === 'brain' ? 3 : 8, prop = null, legs = true, sweat = 0 } = P
  if (alpha <= 0.01 || pop <= 0.01) return null
  const bm = kind === 'brain' ? BRAIN_BM : HEART_BM
  const col = kind === 'brain' ? { P: BRAIN_C, d: '#d9659e' } : { R: HEART_C, h: '#ffc2cc' }
  const bodyCol = kind === 'brain' ? BRAIN_C : HEART_C
  const bw = bm[0].length * c, bh = bm.length * c
  const hs = hopLift(t, hops)
  const legH = legs ? c * 3.2 : 0
  const bob = Math.sin(t * 3 + seed) * c * 0.25
  const sq = squash + hs.sq + 0.015 * Math.sin(t * 3.4 + seed)
  const baseY = py - legH - hs.lift * c * 4 + bob
  x.save(); x.globalAlpha *= alpha
  x.translate(px, py); x.scale(pop, pop); x.rotate(rot); x.translate(-px, -py)
  // legs
  if (legs) {
    const ph = walk == null ? 0 : walk
    for (const s of [-1, 1]) {
      const lx = px + s * c * 2.6, sw = walk == null ? 0 : Math.sin(ph * Math.PI * 2 + (s > 0 ? Math.PI : 0)) * c * 1.2
      const ly0 = baseY - c * 0.5
      x.lineCap = 'butt'
      x.strokeStyle = INK; x.lineWidth = c * 1.8; x.beginPath(); x.moveTo(lx, ly0); x.lineTo(lx + sw, py - c * 0.4); x.stroke()
      x.strokeStyle = bodyCol; x.lineWidth = c * 0.9; x.beginPath(); x.moveTo(lx, ly0); x.lineTo(lx + sw, py - c * 0.6); x.stroke()
      x.fillStyle = INK; x.fillRect(lx + sw - c * 1.4 + s * c * 0.3, py - c * 1.3, c * 2.8, c * 1.5)
      x.fillStyle = '#efe6d6'; x.fillRect(lx + sw - c * 1 + s * c * 0.3, py - c * 1, c * 2, c * 0.8)
    }
  }
  // body centre
  const cx = px, cy = baseY - bh / 2
  // arms behind? no: arms in front, drawn after body
  x.save()
  x.translate(cx, baseY); x.scale((1 + sq) * (flip ? -1 : 1), 1 - sq * 0.9); x.translate(-bw / 2, -bh)
  drawBits(x, bm, col, bw / 2, bh / 2, c)
  // blink schedule (per seed)
  const bph = (t * 0.31 + seed * 0.17) % 1, blinkOn = bph < 0.035
  face(x, kind, c, mood, mouth, flip ? [-(look?.[0] ?? 0), look?.[1] ?? 0] : look, t, seed, blinkOn)
  if (tears > 0) {
    const F = FACE[kind]
    for (const ex of [F.el, F.er]) {
      const n = tears >= 3 ? 6 : tears >= 2 ? 4 : 2
      for (let q = 0; q < n; q++) {
        const p2 = ((t * (0.9 + tears * 0.4) + q / n + ex * 0.05) % 1)
        const dx = (ex < 9 ? -1 : 1) * (tears >= 3 ? 5 * p2 : 1.2 * p2)
        x.fillStyle = INK; x.fillRect((ex + dx) * c - c * 0.15, (F.ey + 1.4 + p2 * (tears >= 3 ? 8 : 6)) * c - c * 0.15, c * 1.1, c * 1.5)
        x.fillStyle = SKYB; x.fillRect((ex + dx) * c, (F.ey + 1.4 + p2 * (tears >= 3 ? 8 : 6)) * c, c * 0.8, c * 1.2)
      }
    }
  }
  if (sweat > 0) {
    const p2 = (t * 1.3) % 1
    x.globalAlpha *= sweat
    x.fillStyle = INK; x.fillRect(bw - c * 3.2, c * (2 + p2 * 3) - c * 0.2, c * 1.4, c * 1.8)
    x.fillStyle = SKYB; x.fillRect(bw - c * 3, c * (2 + p2 * 3), c, c * 1.4)
  }
  x.restore()
  // arms
  const shY = cy + bh * 0.12, shX = bw * 0.44
  const len = c * 5.2 * reach
  const fl = flip ? -1 : 1
  const hl = limb(x, cx - shX * (1 + sq), shY, -arms[0], len, c, bodyCol)
  const hr = limb(x, cx + shX * (1 + sq), shY, arms[1], len, c, bodyCol)
  void fl
  const out = { hl, hr, top: baseY - bh, cx, cy, c, bw, bh }
  if (prop) prop(x, t, out)
  x.restore()
  return out
}
export const drawBrain = (x, t, P) => drawLead('brain', x, t, P)
export const drawHeart = (x, t, P) => drawLead('heart', x, t, P)

// Brain's clipboard prop (use as P.prop for drawBrain)
export function clipboard(side = 'r', { text = '' } = {}) {
  return (x, t, o) => {
    const h = side === 'r' ? o.hr : o.hl, c = o.c
    x.save(); x.translate(h.x + (side === 'r' ? c * 1.5 : -c * 1.5), h.y - c * 2); x.rotate(side === 'r' ? 0.18 : -0.18)
    R_(x, INK, -c * 3, -c * 4, c * 6, c * 8); R_(x, '#c98a4a', -c * 2.6, -c * 3.6, c * 5.2, c * 7.2); R_(x, '#fffbea', -c * 2.1, -c * 2.8, c * 4.2, c * 6)
    R_(x, '#9aa0b8', -c * 1.2, -c * 4.3, c * 2.4, c * 1.2)
    for (let i = 0; i < 4; i++) R_(x, '#7d6fb0', -c * 1.6, -c * 1.8 + i * c * 1.3, c * (i % 2 ? 2.2 : 3.2), c * 0.5)
    void text
    x.restore()
  }
}

// THE STARS, refereeing (longs): a gold star with a whistle and a striped armband
export function drawRef(x, t, { x: px, y: py, s = 170, mood = 'neutral', look, hops, pop = 1, alpha = 1, whistle = [] } = {}) {
  if (pop <= 0.01 || alpha <= 0.01) return
  drawStarChar(x, px, py, s, t, { color: STAR.sky, mood, look, hops, pop, alpha, seed: 2, glow: 0.9 })
  const F = starFrame(px, py, s, t, { pop, hops, seed: 2 })
  let blow = 0
  for (const w of whistle) { const d = t - w; if (d >= 0 && d < 0.5) blow = Math.max(blow, 1 - d / 0.5) }
  inSprite(x, F, () => {
    x.globalAlpha = alpha
    // armband stripes on the left arm
    for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? '#ffffff' : INK; x.fillRect(4 + i, 15, 1, 3) }
    // whistle at the mouth (a little silver pixel shape on a cord)
    x.fillStyle = INK; x.fillRect(19.5, 22.5, 6, 3); x.fillStyle = '#d8dce8'; x.fillRect(20, 23, 5, 2); x.fillStyle = '#ffffff'; x.fillRect(20.5, 23, 1.5, 0.8)
    x.fillStyle = '#ff3b5c'; x.fillRect(17, 21, 0.6, 3)
  })
  if (blow > 0) {
    x.save(); x.globalAlpha = blow * alpha; x.strokeStyle = BONE; x.lineWidth = 6
    for (let k = 0; k < 3; k++) { const a = -0.5 + k * 0.5, r = s * (0.5 + (1 - blow) * 0.3); x.beginPath(); x.moveTo(px + s * 0.28 + Math.cos(a) * r * 0.6, py + s * 0.08 + Math.sin(a) * r * 0.6); x.lineTo(px + s * 0.28 + Math.cos(a) * r, py + s * 0.08 + Math.sin(a) * r); x.stroke() }
    x.restore()
  }
}

// ─────────────────────────────────────────────── speech bubbles
const WHO = { brain: { bg: '#ffe3f0', fg: INK, acc: '#c23b7e', tag: 'BRAIN' }, heart: { bg: '#ffd9de', fg: INK, acc: '#e0203f', tag: 'HEART' }, stars: { bg: '#fff1c8', fg: INK, acc: '#b07a10', tag: 'REF' } }
function parseAcc(text) { const out = []; let acc = false, cur = ''; for (const ch of text) { if (ch === '*') { if (cur) out.push({ s: cur, acc }); cur = ''; acc = !acc; continue } cur += ch } if (cur) out.push({ s: cur, acc }); return out }
function wrapRuns(x, text, maxW) {
  // split into words keeping accent flags, then wrap
  const words = []
  for (const r of parseAcc(text)) for (const [i, w] of r.s.split(' ').entries()) { if (i > 0) words.push({ s: ' ', acc: r.acc, sp: true }); if (w) words.push({ s: w, acc: r.acc }) }
  const lines = [[]]; let w = 0
  for (const wd of words) {
    const ww = x.measureText(wd.s).width
    if (wd.sp) { if (w > 0) { lines[lines.length - 1].push(wd); w += ww } continue }
    if (w + ww > maxW && w > 0) { const ln = lines[lines.length - 1]; while (ln.length && ln[ln.length - 1].sp) ln.pop(); lines.push([]); w = 0 }
    lines[lines.length - 1].push(wd); w += ww
  }
  return lines.map(ln => ({ runs: ln, w: ln.reduce((a, r) => a + x.measureText(r.s).width, 0) }))
}
export function bubble(x, t, { x: bx, y: by, t0, t1 = 1e9, text, who = 'brain', tail = 0, size = 44, maxW = 600, tag = true, shake = 0 }) {
  if (t < t0 || t > t1 + 0.25) return
  const k = pop01(t, t0, 0.24, 2.4) * (t > t1 ? 1 - ease.inQuad(prog(t, t1, t1 + 0.2)) : 1)
  if (k <= 0.01) return
  const W2 = typeof who === 'string' ? WHO[who] : who
  x.save()
  x.font = `800 ${size}px ${INTER}`
  const lines = wrapRuns(x, text, maxW)
  const lh = size * 1.12, pad = 28
  const w = Math.max(...lines.map(l => l.w)) + pad * 2, h = lines.length * lh + pad * 1.3
  const sx = shake ? Math.sin(t * 60) * shake : 0
  x.translate(bx + sx, by); x.scale(k, k)
  const P = 6
  // stepped pixel bubble
  const box = (o, col) => { x.fillStyle = col; x.fillRect(-w / 2 + P - o, -h - o, w - 2 * P + 2 * o, h + 2 * o); x.fillRect(-w / 2 - o, -h + P - o, w + 2 * o, h - 2 * P + 2 * o) }
  box(6, INK); box(0, W2.bg)
  // tail
  const tx = clamp(tail, -w / 2 + 40, w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 16, -6, 32, 22); x.fillRect(tx - 8, 14, 16, 14)
  x.fillStyle = W2.bg; x.fillRect(tx - 10, -8, 20, 18); x.fillRect(tx - 3, 8, 8, 12)
  // tag
  if (tag && W2.tag) {
    x.font = `800 20px ${INTER}`; x.letterSpacing = '0.16em'
    const tw2 = x.measureText(W2.tag).width + 26
    x.fillStyle = INK; x.fillRect(-w / 2 + 14, -h - 18, tw2, 30)
    x.fillStyle = W2.acc; x.fillRect(-w / 2 + 17, -h - 15, tw2 - 6, 24)
    x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(W2.tag, -w / 2 + 28, -h - 2)
    x.letterSpacing = '0px'
  }
  x.font = `800 ${size}px ${INTER}`; x.textBaseline = 'alphabetic'; x.textAlign = 'left'
  lines.forEach((ln, i) => {
    let xx = -ln.w / 2
    const yy = -h + pad * 0.75 + (i + 0.8) * lh
    for (const r of ln.runs) { x.fillStyle = r.acc ? W2.acc : W2.fg; x.fillText(r.s, xx, yy); xx += x.measureText(r.s).width }
  })
  x.restore()
}

// ─────────────────────────────────────────────── the messenger screen (inside the window)
export function draftAt(t, ops = []) {
  let s = ''
  for (const o of ops) {
    if (t < o.t) break
    const cps = o.cps || 16
    if (o.type === 'type') { const n = Math.min(o.text.length, Math.floor((t - o.t) * cps)); s += o.text.slice(0, n) }
    else if (o.type === 'del') { const n = Math.min(o.n ?? s.length, Math.floor((t - o.t) * (o.cps || 30))); s = s.slice(0, Math.max(0, s.length - n)) }
    else if (o.type === 'clear') s = ''
  }
  return s
}
export function drawChat(x, t, R, { title = 'them', sub = 'online', msgs = [], typing = null, draft = null, font = 36, avatar = '#7fd0ff', dim = 0, sendFlash = [] } = {}) {
  const { x: rx, y: ry, w, h } = R
  x.save()
  x.fillStyle = '#17112e'; x.fillRect(rx, ry, w, h)
  // header
  const HH = 104
  x.fillStyle = '#231a48'; x.fillRect(rx, ry, w, HH)
  x.fillStyle = INK; x.beginPath(); x.arc(rx + 92, ry + HH / 2 + 4, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = avatar; x.beginPath(); x.arc(rx + 92, ry + HH / 2 + 4, 29, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.font = `800 36px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(title, rx + 142, ry + HH / 2 - 8)
  x.fillStyle = '#8fe3a8'; x.font = `600 22px ${INTER}`; x.fillText(sub, rx + 142, ry + HH / 2 + 26)
  // draft field
  const FH = draft ? 96 : 0
  const body = { y0: ry + HH, y1: ry + h - FH }
  x.save(); x.beginPath(); x.rect(rx, body.y0, w, body.y1 - body.y0); x.clip()
  x.font = `600 ${font}px ${INTER}`; x.textBaseline = 'alphabetic'
  const maxW = w * 0.7, pad = 22, lh = font * 1.24, gap = 16
  const lay = msgs.map(m => {
    const words = m.text.split(' '), lines = []; let cur = ''
    for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr).width > maxW - 2 * pad && cur) { lines.push(cur); cur = wd } else cur = tr }
    lines.push(cur)
    const bw = Math.min(maxW, Math.max(...lines.map(l => x.measureText(l).width)) + 2 * pad)
    return { ...m, lines, bw, bh: lines.length * lh + pad * 1.2 + (m.status ? 30 : 0) }
  })
  const vis = lay.filter(m => t >= m.at && (m.until == null || t < m.until) && (m.from == null || t >= m.from))
  const typingOn = typing && t >= typing[0] && t < typing[1]
  const tot = k => { let s2 = 0; for (let i = 0; i < k; i++) s2 += vis[i].bh + gap; return s2 }
  let H = tot(vis.length)
  if (vis.length) { const lm = vis[vis.length - 1], e = ease.outCubic(prog(t, lm.at, lm.at + 0.2)); H = lerp(tot(vis.length - 1), tot(vis.length), e) }
  if (typingOn) H += 84 * ease.outCubic(prog(t, typing[0], typing[0] + 0.15))
  let y = body.y1 - 20 - H
  for (const m of vis) {
    const k = pop01(t, m.at, 0.22, 2.2)
    const bx = m.side === 'L' ? rx + 34 : rx + w - 34 - m.bw
    const bh = m.bh - (m.status ? 30 : 0)
    x.save(); x.translate(m.side === 'L' ? bx : bx + m.bw, y + bh); x.scale(k, k); x.translate(m.side === 'L' ? 0 : -m.bw, -bh)
    x.fillStyle = m.side === 'L' ? '#3b3466' : (m.col || '#6c5cf0')
    rrect(x, 0, 0, m.bw, bh, 22); x.fill()
    x.fillStyle = BONE; x.textAlign = 'left'
    m.lines.forEach((l, i) => x.fillText(l, pad, pad * 0.6 + (i + 0.82) * lh))
    if (m.status) { x.font = `600 22px ${INTER}`; x.fillStyle = '#9a90c8'; x.textAlign = 'right'; x.fillText(m.status, m.bw - 6, bh + 26); x.font = `600 ${font}px ${INTER}` }
    x.restore()
    y += m.bh + gap
  }
  if (typingOn) {
    x.fillStyle = '#3b3466'; rrect(x, rx + 34, body.y1 - 20 - 68, 130, 68, 26); x.fill()
    for (let i = 0; i < 3; i++) { const on = Math.floor((t - typing[0]) * 8) % 3 === i; x.fillStyle = on ? BONE : '#8a83b8'; x.beginPath(); x.arc(rx + 34 + 34 + i * 31, body.y1 - 20 - 34, 9, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
  if (draft) {
    const txt = draftAt(t, draft)
    const fy = ry + h - FH + 14
    x.fillStyle = '#231a48'; x.fillRect(rx, ry + h - FH, w, FH)
    x.fillStyle = '#0f0b22'; rrect(x, rx + 28, fy, w - 150, FH - 28, 30); x.fill()
    x.font = `600 32px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    let shown = txt
    while (shown.length && x.measureText(shown).width > w - 210) shown = shown.slice(1)
    x.fillStyle = txt ? BONE : '#6a6290'; x.fillText(txt ? shown : 'Message…', rx + 56, fy + (FH - 28) / 2 + 2)
    if (txt && Math.floor(t * 2.4) % 2 === 0) { const cw = x.measureText(shown).width; x.fillStyle = BONE; x.fillRect(rx + 58 + cw, fy + 16, 4, FH - 60) }
    let fl = 0; for (const s of sendFlash) { const d = t - s; if (d >= 0 && d < 0.4) fl = 1 - d / 0.4 }
    x.fillStyle = fl > 0 ? '#ffffff' : '#6c5cf0'; x.beginPath(); x.arc(rx + w - 66, fy + (FH - 28) / 2, 30, 0, Math.PI * 2); x.fill()
    x.fillStyle = fl > 0 ? '#6c5cf0' : BONE; x.beginPath(); x.moveTo(rx + w - 78, fy + (FH - 28) / 2 - 14); x.lineTo(rx + w - 50, fy + (FH - 28) / 2); x.lineTo(rx + w - 78, fy + (FH - 28) / 2 + 14); x.closePath(); x.fill()
  }
  if (dim > 0) { x.fillStyle = `rgba(8,4,20,${dim})`; x.fillRect(rx, ry, w, h) }
  x.restore()
}

// ─────────────────────────────────────────────── the bug (DOM)
export function buildBug(root, { sign = 'aries', at = 0 } = {}) {
  const S = sigOf(sign)
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', display: 'flex', flexDirection: 'column', gap: '6px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box,
    `BRAIN&nbsp;<span style="color:rgba(255,255,255,0.6)">VS</span>&nbsp;HEART`)
  el('div', { font: `700 20px ${MONO}`, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.72)', whiteSpace: 'nowrap' }, box, `INSIDE: ${S.glyph}︎ ${S.name.toUpperCase()}`)
  return {
    update(t, out = 1) {
      const k = t < at ? 0 : out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k))
    },
  }
}

// ─────────────────────────────────────────────── sound helpers + a lever
const PITCH = { brain: 987.77, heart: 739.99, stars: 1174.66 }
export function bubbleCues(list) {
  const out = []
  for (const B of list) {
    const who = typeof B.who === 'string' ? B.who : 'stars', p = PITCH[who] || 880
    const t0 = +B.t0.toFixed(3)
    out.push(['pop', t0, p, 0.04, who === 'brain' ? -0.3 : who === 'heart' ? 0.3 : 0], ['pop', +(t0 + 0.07).toFixed(3), p * 1.5, 0.025, 0])
    const n = Math.min(8, Math.round(B.text.replace(/[^a-z]/gi, '').length / 4))
    for (let i = 0; i < n; i++) out.push(['pop', +(t0 + 0.14 + i * 0.075).toFixed(3), p * [1, 1.12, 0.94, 1.26][i % 4], 0.012, 0])
  }
  return out
}
export function drawLever(x, t, { x: lx, y: ly, a = 0, label = null, col = '#7fd0ff', alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  R_(x, INK, lx - 40, ly - 22, 80, 34); R_(x, '#9a90c8', lx - 34, ly - 16, 68, 22)
  const ang = lerp(-0.55, 0.75, a), len = 120
  const ex = lx + Math.sin(ang) * len, ey = ly - Math.cos(ang) * len
  x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.moveTo(lx, ly - 6); x.lineTo(ex, ey); x.stroke()
  x.strokeStyle = '#d8dce8'; x.lineWidth = 10; x.beginPath(); x.moveTo(lx, ly - 6); x.lineTo(ex, ey); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(ex, ey, 30, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(ex, ey, 23, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(ex - 12, ey - 14, 9, 7)
  if (label) { x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; R_(x, INK, lx - 46, ly + 18, 92, 34); x.fillStyle = col; x.fillText(label, lx, ly + 36) }
  x.restore()
  return { x: ex, y: ey }
}

export function stepObj(t, list, base = {}) { let o = { ...base }; for (const [a, v] of list) if (t >= a) o = { ...o, ...v }; return o }

export function makeBuild(cfg) {
  const { sign = 'aries', view = null, blinks = [], desk = () => ({}), brain = null, heart = null, back = null, front = null, bubbles = [], alarm = () => 0, label = 'LIVE VIEW', win = true, top = null } = cfg
  return async stage => {
    const root = fill(stage, { background: '#120826' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const bug = buildBug(root, { sign })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: 0, end: 1e4, root,
      update(t) {
        drawRoom(x, t, { sign, alarm: alarm(t) })
        if (top) top(x, t)
        if (win) drawWindow(x, t, view ? (c, R) => view(c, t, R) : null, { sign, blinks, label })
        drawDesk(x, t, desk(t))
        if (back) back(x, t)
        const B = brain ? (P => P && drawBrain(x, t, P))(brain(t)) : null
        const H = heart ? (P => P && drawHeart(x, t, P))(heart(t)) : null
        if (front) front(x, t, B, H)
        for (const b of bubbles) bubble(x, t, b)
        bug.update(t)
        drawGrain(gx, t)
      },
    }
  }
}
