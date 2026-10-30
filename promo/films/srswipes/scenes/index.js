// srswipes — "312 swipes. 0 butterflies." (20 s vertical Align ad, Star Talk Remix of promo/films/swipes) · story
// 0–15.6, then the shared end card. Synthwave · Bb.
//   0.00–3.40  "312 swipes. | *0 butterflies.*"  A phone in the dark, faces flicking off it faster and faster; the
//              SWIPES TODAY counter ticks 300 → 312. THE STARS (the gold narrator star) peeks in from the right, eyes
//              darting left with every swipe… then a right… then the eyes spin (dizzy). A tiny pixel butterfly lies
//              asleep on the top edge of the phone (zzz): the "0 butterflies", literally.
//   3.40–7.50  312 dings. THE STARS: "babe. 312 faces and not one flutter?" → "put the phone down. look *up.*"
//              (headline swaps to "Eyes *up* here.")
//   7.55–8.30  the phone sinks out of frame (the sleeping butterfly goes with it); the star floats up to the middle
//              and the sky wakes up: little sign stars blink open all around, all looking at you.
//   8.38       the drop · "Tonight's | *deck.*"  three veiled cards deal out of the star, one at a time.
//              THE STARS: "one small deck a night. dealt by *us.*"  The middle card glows and the butterfly flutters
//              out of it, awake (BUTTERFLIES: 1, ding); the star goes heart-eyed.
//  12.27       card cut (flip) · "Slow down. | *Look up.*"  Every star in the sky looks up at once… then back at you;
//              the gold star winks. Everything pops out by 15.5; the end card takes over at 15.6.
// One canvas (sky + phone + cards + stars + butterfly), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', CYAN = '#7fdcff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const D2R = Math.PI / 180

// ── the swipes: 12 of them, faster and faster (the one at #7 is a right swipe that changes nothing)
const GAPS = [0.42, 0.38, 0.34, 0.3, 0.27, 0.24, 0.21, 0.19, 0.17, 0.15, 0.14]
const SW = (() => { const a = []; let t = 0.42; for (let i = 0; i < 12; i++) { a.push({ t, dir: i === 6 ? 1 : -1, dur: Math.min(0.36, (GAPS[i] ?? 0.14) * 1.25) }); t += GAPS[i] ?? 0.14 } return a })()
const LAST_SWIPE = SW[SW.length - 1].t                                  // ≈3.23
const swipesBy = t => { let n = 0; for (const s of SW) if (t >= s.t) n++; return n }

// ── the timeline
const T = {
  h0: 0.15, h0Late: 1.1, h0Out: [6.05, 6.22],
  dizzy: [2.45, 3.45], ding: 3.42,
  open: 3.62, l1: 3.82, l2: 6.3,
  h1: 6.3, h1Land: 6.62, h1Out: [8.1, 8.26],
  sink: [7.55, 8.25], rise: [7.85, 8.45],
  crowd: 8.42, h2: BEAT(14), h2Land: BEAT(14) + 0.32, deal: [8.62, 8.9, 9.18], l3: 9.4,
  glow: 10.55, bfly: 10.75, tag: 11.05, heart: 11.05, close: 12.0, h2Out: [12.0, 12.18],
  h3: BEAT(21) + 0.06, h3Land: BEAT(21) + 0.5, lookUp: [12.75, 13.85], wink: [14.15, 14.6], h3Out: [15.18, 15.38], out: [15.12, 15.5],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'babe. 312 faces and not one *flutter?*' },
  { t: T.l2, speaker: SPEAK, text: 'put the phone down. look *up.*' },
  { t: T.l3, speaker: SPEAK, text: 'one small deck a night. dealt by *us.*' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const pulse = (t, t0, d) => (t < t0 || t > t0 + d) ? 0 : Math.sin(Math.PI * (t - t0) / d)
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }

// ── pixel bits
const BF_OPEN = ['..B.....B..', '...B...B...', 'PP..B.B..PP', 'PPPP.B.PPPP', 'PWPPPBPPPWP', 'PPPPPBPPPPP', '.PPPPBPPPP.', '..PP.B.PP..', '.PPP.B.PPP.', '.PP.....PP.']
const BF_SHUT = ['..B.....B..', '...B...B...', '....B.B....', '...PPBPP...', '..PPPBPPP..', '...PPBPP...', '....PBP....', '....PBP....', '.....B.....', '...........']
const BF_C = { P: PINK, W: '#fff1f6', B: '#2a1d4f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// ── pixel faces for the profile cards (16 × 18 cells, generated, no real people)
const SKIN = ['#f1c9a5', '#d9a07a', '#a8714d', '#7a4a2e', '#e8b48f', '#c48a62']
const HAIR = ['#2a1a12', '#5a3420', '#c9963c', '#111014', '#8a3b22', '#3b2a50']
const SHIRT = ['#5fd0ff', '#ff8fb1', '#f2c75c', '#9a7be0', '#5fe0b0', '#f29a4a']
const BGS = [['#3a2c74', '#1d1440'], ['#5b2a74', '#24164f'], ['#2c4a74', '#141c40'], ['#743a4a', '#2a1430'], ['#2c6a64', '#122a30'], ['#6a5a2c', '#2a2414']]
const NAMES = ['Lena, 23', 'Theo, 29', 'Rosa, 28', 'Jun, 27', 'Ama, 25', 'Cole, 31', 'Maya, 24', 'Nia, 26', 'Dev, 26', 'Ivy, 27', 'Kofi, 30', 'Sara, 25', 'Ezra, 28']
function faceSprite(doc, i) {
  const c = doc.createElement('canvas'); c.width = 16; c.height = 18
  const g = c.getContext('2d')
  const skin = SKIN[(i * 5 + 1) % SKIN.length], hair = HAIR[(i * 7 + 2) % HAIR.length], shirt = SHIRT[i % SHIRT.length], style = (i * 3) % 4
  const px = (X, Y, col) => { g.fillStyle = col; g.fillRect(X, Y, 1, 1) }
  for (let y = 0; y < 18; y++) for (let X = 0; X < 16; X++) {
    const u = (X + 0.5 - 8) / 5.6, v = (y + 0.5 - 18.6) / 3.6
    if (y >= 14 && u * u + v * v <= 1) px(X, y, shirt)
  }
  for (let y = 12; y < 15; y++) for (let X = 7; X < 9; X++) px(X, y, skin)
  if (style === 1) for (let y = 3; y < 15; y++) { px(2, y, hair); px(3, y, hair); px(12, y, hair); px(13, y, hair) }
  for (let y = 0; y < 14; y++) for (let X = 0; X < 16; X++) {
    const u = (X + 0.5 - 8) / 4.6, v = (y + 0.5 - 7.4) / 5.6
    if (u * u + v * v <= 1) px(X, y, skin)
  }
  for (let y = 0; y < 6; y++) for (let X = 0; X < 16; X++) {
    const u = (X + 0.5 - 8) / 5.2, v = (y + 0.5 - 5.4) / 4.4
    if (u * u + v * v <= 1 && (y < 4 || X < 5 || X > 10)) px(X, y, hair)
  }
  if (style === 2) for (let y = 0; y < 3; y++) for (let X = 6; X < 10; X++) px(X, y - 1 < 0 ? 0 : y - 1, hair)
  if (style === 3) for (const [X, y] of [[3, 3], [12, 3], [2, 5], [13, 5], [4, 1], [11, 1]]) px(X, y, hair)
  px(6, 8, '#1b1236'); px(9, 8, '#1b1236'); px(7, 11, '#a0405a'); px(8, 11, '#a0405a')
  g.globalAlpha = 0.35; px(5, 10, '#ff6f8f'); px(10, 10, '#ff6f8f')
  return c
}

// ── layout
const PHONE = { x: 440, y: 965, w: 400, h: 740 }
const S0 = { x: 856, y: 720, size: 232 }       // the gold star, peeking in beside the phone
const S1 = { x: 540, y: 760, size: 292 }       // …then centre stage
const DECK = { xs: [300, 540, 780], y: 1140, w: 216, rot: [-0.09, 0, 0.09] }
const CROWD = [
  { x: 92, y: 640, s: 74, sign: 'pisces' }, { x: 214, y: 800, s: 62, sign: 'aries' }, { x: 96, y: 960, s: 70, sign: 'cancer' }, { x: 104, y: 1316, s: 64, sign: 'libra' },
  { x: 988, y: 628, s: 72, sign: 'leo' }, { x: 870, y: 790, s: 60, sign: 'gemini' }, { x: 990, y: 960, s: 70, sign: 'scorpio' }, { x: 976, y: 1316, s: 66, sign: 'taurus' },
]
const COL = id => SIGNS.find(s => s.id === id).color

const STAR_HOPS = [...talkHops(LINES, SPEAK, { cps: CPS }), T.rise[1] - 0.05, T.ding + 0.02, T.heart, T.h3Land, T.wink[0]].sort((a, b) => a - b)

const LOW = 130                                 // after the box shuts (under the 12.27 cut) the stage drops into the freed space
const lowY = t => LOW * ease.inOutCubic(prog(t, 12.2, 12.34))
function starPos(t) {
  const r = ease.inOutCubic(prog(t, ...T.rise))
  return { x: lerp(S0.x, S1.x, r), y: lerp(S0.y, S1.y, r) - Math.sin(Math.PI * r) * 60 + lowY(t), size: lerp(S0.size, S1.size, r) }
}
function starState(t) {
  if (t < 0.4) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.dizzy[0]) {
    // eyes follow every swipe (left… left… right…)
    const n = swipesBy(t), s = SW[n - 1]
    if (s && t - s.t < 0.22) return { mood: s.dir > 0 ? 'wide' : 'neutral', look: [s.dir, 1], blink: false }
    return { mood: 'neutral', look: [-0.4, 1], blink: false }
  }
  if (t < T.dizzy[1]) return { mood: 'eyeroll', blink: false }
  if (t < T.l1 + 0.2) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.l2) return { mood: 'squint', look: [-1, 1] }
  if (t < T.sink[0]) return { mood: 'neutral', look: [0, 0] }
  if (t < T.rise[1]) return { mood: 'happy' }
  if (t < T.glow) return { mood: 'happy', look: [0, 1] }
  if (t < T.heart) return { mood: 'wide', look: [0, 1], blink: false }
  if (t < T.h3) return { mood: 'heart' }
  if (t < T.lookUp[0]) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.lookUp[1]) return { mood: 'neutral', look: [0, -1], blink: false }
  if (t < T.wink[0]) return { mood: 'happy', look: [0, 0] }
  if (t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  return { mood: 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "800 44px Inter", "italic 500 170px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const backIm = await loadImg('card-back.png')
  const BACK_BODY = 1320 / 1528
  const FACES = Array.from({ length: 13 }, (_, i) => faceSprite(document, i))

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HEADS = [
    [popText(root, '312 swipes. | *0 butterflies.*', { top: 196, size: 120, accentSize: 150, at: T.h0, gap: 0.14, late: 2, lateAt: T.h0Late, lateGap: 0.16, wobble: true, accentColor: PINK, lineHeight: 1.04 }), T.h0Out],
    [popText(root, 'Eyes *up* here.', { top: 230, size: 124, accentSize: 176, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: GOLD }), T.h1Out],
    [popText(root, "Tonight's | *deck.*", { top: 196, size: 124, accentSize: 186, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: LAV, lineHeight: 0.98 }), T.h2Out],
    [popText(root, 'Slow down. | *Look up.*', { top: 196, size: 124, accentSize: 180, at: T.h3, gap: 0.16, late: 2, lateAt: T.h3Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 1.0 }), T.h3Out],
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }

  // ─────────────────────────────── one profile card (phone-local), optional ✕ / ♥ stamp
  function drawProfile(j, cx, cy, w, h, rot, alpha, sd = 0, sk = 0) {
    if (alpha <= 0.01) return
    const bg = BGS[j % BGS.length]
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
    rr(-w / 2, -h / 2, w, h, 26); x.save(); x.clip()
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, bg[0]); g.addColorStop(1, bg[1]); x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    const cell = 17, pw = 16 * cell, ph = 18 * cell
    const sm = x.imageSmoothingEnabled; x.imageSmoothingEnabled = false
    x.drawImage(FACES[j % FACES.length], -pw / 2, h / 2 - ph, pw, ph)
    x.imageSmoothingEnabled = sm
    const ig = x.createLinearGradient(0, h / 2 - 130, 0, h / 2); ig.addColorStop(0, 'rgba(10,6,28,0)'); ig.addColorStop(1, 'rgba(10,6,28,0.9)'); x.fillStyle = ig; x.fillRect(-w / 2, h / 2 - 130, w, 130)
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = BONE; x.font = `800 40px ${INTER}`
    x.fillText(NAMES[j % NAMES.length], -w / 2 + 26, h / 2 - 30)
    x.restore()
    x.lineWidth = 4; x.strokeStyle = 'rgba(255,255,255,0.3)'; rr(-w / 2, -h / 2, w, h, 26); x.stroke()
    if (sk > 0 && sd) {
      x.save(); x.globalAlpha *= clamp(sk); x.translate(sd < 0 ? w * 0.2 : -w * 0.2, -h * 0.3); x.rotate(sd < 0 ? 0.3 : -0.3)
      const col = sd < 0 ? '#ff5a6e' : '#ff6fae'
      x.lineWidth = 9; x.strokeStyle = col; rr(-58, -52, 116, 104, 18); x.stroke()
      x.fillStyle = col; x.textAlign = 'center'; x.font = `800 78px ${INTER}`; x.fillText(sd < 0 ? '✕' : '♥', 0, 28)
      x.restore()
    }
    x.restore()
  }

  // ─────────────────────────────── the phone (with the sleeping butterfly on its top edge)
  function phoneY(t) { return PHONE.y + 1500 * ease.inCubic(prog(t, ...T.sink)) }
  function drawPhone(t) {
    if (t >= T.sink[1]) return
    const k = easeOutBack(prog(t, 0.0, 0.35), 1.6)
    const n = swipesBy(t), dg = pulse(t, T.ding, 0.3)
    const py = phoneY(t), tilt = -3 + 4 * ease.inCubic(prog(t, ...T.sink))
    x.save()
    x.translate(PHONE.x, py); x.rotate(tilt * D2R); x.scale(k * (1 + 0.04 * dg), k * (1 + 0.04 * dg))
    const w = PHONE.w, h = PHONE.h, hw = w / 2, hh = h / 2
    x.save(); x.shadowColor = rgba(LAV, 0.55); x.shadowBlur = 80
    rr(-hw, -hh, w, h, 60); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 60); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 46); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#1c1340'); g.addColorStop(1, '#3b2370')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    // the counter pill
    x.fillStyle = 'rgba(10,6,28,0.6)'; rr(-150, sy + 58, 300, 62, 31); x.fill()
    x.textBaseline = 'alphabetic'; x.textAlign = 'left'; x.font = `700 22px ${MONO}`; x.fillStyle = rgba(BONE, 0.75); x.fillText('SWIPES TODAY', -128, sy + 97)
    const bump = n > 0 ? pulse(t, SW[n - 1].t, 0.16) : 0
    x.save(); x.translate(104, sy + 89); x.scale(1 + 0.2 * bump + 0.35 * dg, 1 + 0.2 * bump + 0.35 * dg)
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 40px ${INTER}`; x.fillStyle = dg > 0.02 || n >= 12 ? '#ff8fa8' : BONE
    x.fillText(String(300 + n), 0, 2); x.restore()
    // the card stack
    const cw = 320, ch = 440, cy = sy + 140 + ch / 2
    const prev = n > 0 ? SW[n - 1] : null, up = prev ? clamp((t - prev.t) / prev.dur) : 1
    drawProfile(n, 0, cy + (1 - ease.outCubic(up)) * 10, cw * lerp(0.94, 1, ease.outCubic(up)), ch * lerp(0.94, 1, ease.outCubic(up)), 0, 1)
    for (let j = Math.max(0, n - 4); j < n; j++) {
      const s = SW[j], p = (t - s.t) / s.dur
      if (p < 0 || p >= 1.4) continue
      for (const [lag, a] of [[0.4, 0.12], [0.26, 0.22], [0.13, 0.4], [0, 1]]) {
        const q = p - lag
        if (q < 0 || q >= 1) continue
        const e = ease.inQuad(q)
        drawProfile(j, s.dir * e * 560, cy + e * 50, cw, ch, s.dir * 0.42 * e, a * (1 - q * 0.25), s.dir, clamp(q * 4))
      }
    }
    // ✕ / ♥ buttons
    const by = sy + sh - 74
    let fl = 0, fr = 0
    if (prev && t - prev.t < 0.13) { if (prev.dir < 0) fl = 1; else fr = 1 }
    for (const [bx, sym, col, f] of [[-80, '✕', '#ff5a6e', fl], [80, '♥', '#ff6fae', fr]]) {
      x.save(); x.translate(bx, by); x.scale(1 + 0.18 * f, 1 + 0.18 * f)
      x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fillStyle = f ? col : 'rgba(15,8,34,0.75)'; x.fill()
      x.lineWidth = 4; x.strokeStyle = col; x.stroke()
      x.fillStyle = f ? '#ffffff' : col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 40px ${INTER}`; x.fillText(sym, 0, 2)
      x.restore()
    }
    x.fillStyle = '#140d2a'; rr(-56, sy + 12, 112, 28, 14); x.fill()
    x.globalAlpha = 0.06; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + sw * 0.55, sy); x.lineTo(sx, sy + sh * 0.45); x.fill(); x.globalAlpha = 1
    x.restore()
    // the butterfly, asleep on its back on the top edge
    const bx = -100, byy = -hh - 34
    drawBits(x, BF_SHUT, BF_C, bx, byy, 8, { rot: Math.PI / 2 + 0.05 * Math.sin(t * 2) })
    x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    for (let i = 0; i < 3; i++) {
      const ph = ((t * 0.55 + i / 3) % 1)
      x.globalAlpha = Math.sin(Math.PI * ph) * 0.9; x.fillStyle = LAV
      x.font = `700 ${Math.round(20 + 14 * ph)}px ${MONO}`
      x.fillText('z', bx + 48 + ph * 40, byy - 26 - ph * 90)
    }
    x.globalAlpha = 1
    x.restore()
  }

  // ─────────────────────────────── the gold star
  function drawStar(t) {
    const ok = popOut(t, T.out)
    const pk = pop01(t, 0.25, 0.4, 2) * ok
    if (pk <= 0.02) return null
    const P = starPos(t), st = starState(t)
    const dz = t >= T.dizzy[0] && t < T.dizzy[1] ? 0.06 * Math.sin((t - T.dizzy[0]) * 18) : 0
    const gasp = t >= T.ding && t < T.ding + 0.5 ? -0.12 * Math.exp(-(t - T.ding) * 7) * Math.cos((t - T.ding) * 20) : 0
    const lean = t < T.rise[0] ? -0.14 : 0
    x.save(); x.translate(P.x, P.y); x.rotate(lean + dz); x.translate(-P.x, -P.y)
    const r = drawStarChar(x, P.x, P.y, P.size, t, { color: STAR.sky, ...st, hops: STAR_HOPS, pop: pk, squash: gasp, seed: 4, glow: 1.1 + (t > T.heart ? 0.25 : 0) })
    x.restore()
    // dizzy swirl over the head
    if (t >= T.dizzy[0] && t < T.dizzy[1]) {
      const a = Math.sin(Math.PI * prog(t, ...T.dizzy))
      for (let i = 0; i < 3; i++) {
        const an = t * 9 + i * 2.1
        x.save(); x.globalAlpha = a; drawPixelStar(x, P.x + Math.cos(an) * 90, P.y - P.size * 0.62 + Math.sin(an) * 22, 26, 2, i % 2 ? GOLD : BONE); x.restore()
      }
    }
    return r
  }

  // ─────────────────────────────── the crowd that wakes up
  function drawCrowd(t) {
    const ok = popOut(t, [T.out[0] - 0.1, T.out[1] - 0.05])
    CROWD.forEach((c, i) => {
      const t0 = T.crowd + i * 0.07
      const pk = pop01(t, t0, 0.32, 2.2) * ok
      if (pk <= 0.02) return
      let look = [clamp((540 - c.x) / 300, -1, 1), 0.4], mood = 'neutral', blink
      if (t < t0 + 0.5) { mood = 'wide'; look = [0, 0]; blink = false }                         // eyes open on you
      else if (t > T.heart && t < T.h3) mood = 'happy'
      if (t >= T.lookUp[0] + i * 0.02 && t < T.lookUp[1]) { look = [0, -1]; blink = false; mood = 'neutral' }
      else if (t >= T.lookUp[1]) { look = [0, 0]; mood = 'happy' }
      const cry = c.sign === 'pisces' && t > T.tag && t < T.lookUp[0]             // Pisces, in the back, sobbing (happy)
      if (cry) mood = 'happy'
      drawStarChar(x, c.x, c.y, c.s, t, { color: COL(c.sign), mood, look, blink, pop: pk, seed: 10 + i, glow: 0.8, tips: false, hops: [t0 + 0.32, T.h3Land + 0.05 * i], squash: cry ? 0.05 * Math.sin(t * 22) : 0 })
      if (cry) for (let k = 0; k < 4; k++) {
        const ph = ((t - T.tag) * 1.6 + k * 0.25) % 1, side = k % 2 ? 1 : -1
        x.globalAlpha = (1 - ph) * pk; x.fillStyle = '#7fdcff'
        x.fillRect(Math.round(c.x + side * (c.s * 0.16 + ph * 26)), Math.round(c.y - c.s * 0.02 + ph * 70), 6, 8); x.globalAlpha = 1
      }
    })
  }

  // ─────────────────────────────── tonight's deck
  function drawCardImg(img, cx, cy, wBody, rot, alpha = 1) {
    if (!img || alpha <= 0) return
    const w = wBody / BACK_BODY, h = w * img.height / img.width
    x.save(); x.globalAlpha = alpha; x.translate(cx, cy); x.rotate(rot); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawDeck(t, P) {
    const ok = popOut(t, [T.out[0] - 0.05, T.out[1]])
    if (ok <= 0) return
    for (let i = 0; i < 3; i++) {
      const p = prog(t, T.deal[i], T.deal[i] + 0.5)
      if (p <= 0) continue
      const e = easeOutBack(p, 1.3)
      let cx = lerp(P.x, DECK.xs[i], e), cy = lerp(P.y, DECK.y + lowY(t), e), wB = DECK.w * lerp(0.3, 1, ease.outCubic(p)) * ok
      const rot = lerp(-0.6 * (i - 1) - 0.4, DECK.rot[i], e)
      if (i === 1) {
        const gl = prog(t, T.glow, T.glow + 0.3)
        cy -= 18 * ease.outCubic(gl) + 6 * Math.sin(t * 3) * gl
        if (gl > 0) {
          const halo = gl * (0.85 + 0.15 * Math.sin(t * 6))
          const gg = x.createRadialGradient(cx, cy, 0, cx, cy, 300); gg.addColorStop(0, rgba(PINK, 0.38 * halo * ok)); gg.addColorStop(1, rgba(PINK, 0)); x.fillStyle = gg; x.fillRect(cx - 300, cy - 300, 600, 600)
        }
      }
      drawCardImg(backIm, cx, cy, wB, rot)
    }
  }

  // ─────────────────────────────── the butterfly, awake
  function drawButterfly(t) {
    if (t < T.bfly) return
    const ok = popOut(t, [T.out[0] - 0.05, T.out[1] - 0.05])
    if (ok <= 0) return
    const P = starPos(t)
    const k = prog(t, T.bfly, T.bfly + 1.1)
    let bx, by
    if (k < 1) {                                               // out of the card, up and over to the star
      const e = ease.inOutCubic(k)
      bx = lerp(540, P.x + 200, e) + Math.sin(k * 9) * 40 * (1 - k); by = lerp(DECK.y - 40 + lowY(t), P.y - 120, e)
    } else {                                                   // a lazy figure-eight around the star
      const u = (t - T.bfly - 1.1) * 1.5
      bx = P.x + 200 * Math.cos(u); by = P.y - 120 + 60 * Math.sin(2 * u)
    }
    by += Math.sin(t * 11) * 6
    const flap = Math.floor(t * 12) % 2
    drawBits(x, flap ? BF_OPEN : BF_SHUT, BF_C, bx, by, 9 * pop01(t, T.bfly, 0.3, 2.4) * ok, { rot: 0.15 * Math.sin(t * 3) })
    // a trail of pixel sparkles
    for (let i = 1; i <= 4; i++) {
      const tt = t - i * 0.09
      if (tt < T.bfly) continue
      x.save(); x.globalAlpha = 0.5 * (1 - i / 5) * ok
      drawPixelStar(x, bx - i * 16 * Math.sign(Math.cos(t)), by + i * 10, 14, 1, i % 2 ? PINK : GOLD); x.restore()
    }
  }

  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.18, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 240 + Math.sin(p * 7 + i) * 16), Math.round(cy - 60 - p * 240), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // the BUTTERFLIES: 1 tag (pixel pill, canvas)
  function drawTag(t) {
    const k = pop01(t, T.tag, 0.36, 2.6) * outK(t, [12.0, 12.16])
    if (k <= 0.01) return
    x.save(); x.translate(540, 560); x.scale(k, k)
    x.fillStyle = 'rgba(16,9,38,0.92)'; rr(-210, -34, 420, 68, 12); x.fill()
    x.lineWidth = 4; x.strokeStyle = PINK; rr(-210, -34, 420, 68, 12); x.stroke()
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `700 30px ${MONO}`; x.fillStyle = BONE
    x.fillText('BUTTERFLIES: 1', 0, 2)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const tilt = ease.inOutCubic(prog(t, T.sink[0], T.rise[1]))
      const dim = lerp(0.45, 1, tilt)                                     // the room is dark; looking up, the sky is lit
      drawSky(x, t, { ...SKY_H, zoom: lerp(1.62, SKY_H.zoom, tilt), dy: lerp(70, 0, tilt), dim: (SKY_H.dim ?? 1) * dim })
      if (t < T.out[1] + 0.05) {
        drawCrowd(t)
        drawPhone(t)
        const P = starPos(t)
        drawDeck(t, P)
        const r = drawStar(t)
        if (r && t > T.heart) floatHearts(t, P.x, P.y - 40, T.heart, T.h3 - 0.6, 2)
        sparkles(t, P.x, P.y, T.rise[1] - 0.05, 10, 220, 1)
        sparkles(t, 540, DECK.y - 60, T.bfly, 10, 160, 2, [PINK, GOLD, BONE])
        drawButterfly(t)
        drawTag(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 8.4 (the phone gone → tonight's deck) and 12.27 (box shut → "Slow down. Look up.").
// cardfx keeps one for a 20 s film (the 12.27 flip). End card flips at 15.6.
const CUTS = [8.4, { t: 12.27, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // the swiping: a whoosh + a counter tick per swipe, the right swipe gets a limp little pop
  ...wordPops(T.h0, 2, 0.14, 0, 0.024), ['pop', T.h0Late, 1174.66, 0.04, 0], ['pop', T.h0Late + 0.16, 1318.51, 0.045, 0],
  ...SW.flatMap((s, i) => [['whoosh', s.t, 0.16, 0.022 + i * 0.0012], ['tick', s.t + 0.05, 0.03]]),
  ['pop', SW[6].t + 0.06, 440, 0.03, 0.3],
  ['glitter', T.dizzy[0], T.dizzy[1] - 0.2],
  ['bell', T.ding, 1760, 0.04, 0.9, 0], ['pop', T.ding, 880, 0.04, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 1, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.1, 1318.51, 0.04, 0],
  // the phone sinks, the star rises, the sky wakes up
  ['whoosh', T.sink[0], 0.6, 0.045], ['boom', T.sink[1] - 0.05, 0.12],
  ['whoosh', T.rise[0], 0.5, 0.03], ['pluck', T.rise[1] - 0.05, 1174.66, 0.04, 0.6, 0],
  ...Array.from({ length: 8 }, (_, i) => ['pop', +(T.crowd + i * 0.07 + 0.05).toFixed(3), NOTE[(i * 2) % 7] * 2, 0.02, (i < 4 ? -0.5 : 0.5)]),
  // tonight's deck
  ...wordPops(T.h2, 1, 0.1, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0],
  ...T.deal.map((d, i) => ['whoosh', d, 0.25, 0.03]), ...T.deal.map((d, i) => ['pop', d + 0.3, NOTE[i * 2], 0.035, (i - 1) * 0.4]),
  ['bell', T.glow, 1318.51, 0.025, 1.0, 0], ['glitter', T.bfly, T.bfly + 0.6],
  ['pluck', T.tag, 1567.98, 0.045, 0.6, 0], ['bell', T.tag + 0.04, 2093, 0.03, 1.0, 0],
  ['pluck', T.heart + 0.1, 1174.66, 0.035, 0.5, -0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // slow down. look up.
  ...wordPops(T.h3, 2, 0.16, 0, 0.026), ['pop', T.h3Land, 1174.66, 0.045, 0], ['pop', T.h3Land + 0.14, 1318.51, 0.05, 0],
  ['whoosh', T.lookUp[0], 0.4, 0.025], ['bell', T.lookUp[0] + 0.1, 1760, 0.022, 1.2, 0],
  ['tick', T.lookUp[1], 0.03], ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
