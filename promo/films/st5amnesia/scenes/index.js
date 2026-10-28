// st5amnesia (35 s vertical Align ad, Star Talk season 5 "STAR-CROSSED", EP 06) · story 0–30.6, then the shared end card.
//   "Retro has *amnesia*."  Mercury goes retrograde again (it really does, about three times a year) and Retro, the
//   backwards-spinning ☿ orb, forgets everything it learned in season 4: it is drafting "u up?" to everyone's exes again.
//   The stars hold an intervention with a scrapbook of its season-4 apology (st4retrosorry, EP 092: "i did that. i'm
//   sorry." / "learned: think before i spin."). Nobody is cruel to it: it reads, blushes and writes itself a note.
//   0.00–2.40  title sting: "★ STAR-CROSSED ★ / EPISODE 6".
//   2.50       "Retro has | *amnesia.*"  Retro spins the wrong way, question marks orbiting its head (℞ RETROGRADE tag);
//              its phone fills with drafts, "♈ ex: u up?", "♋ ex: u up?"… DRAFTS (11).
//              RETRO: "new phone, who dis? *u up?*"  Gasp zoom on Leo, Cancer and Virgo.
//              CANCER: "Retro! you *apologized* for this!"  RETRO: "i did? i forgot *everything.*"
//   ~10.9      "The | *intervention.*"  The phone is gone; the scrapbook flies in and its cover flips open: a polaroid of
//              Retro going ▶ DIRECT (EP 092) and the apology note. THE STARS: "page one: your *apology.*"
//              Gasp zoom on Retro.  RETRO: "…i said *that?*"  THE STARS: "write it down so you don't *relearn* it."
//              Retro stops spinning, sticks a note on the page: "READ THIS EVERY RETROGRADE ✓".
//              (Ghost: leans out from behind the scrapbook's right edge.)
//   lesson     ★ LESSON UNLOCKED: "Write down what | you *learned.*"
//   last       "Remember | the *lesson.*"  A page turns by itself to the scrapbook's last page: a polaroid from the night
//              of the eclipse… Leo's ring box, in Ophiuchus's hands. Gasp zoom on the photo.
//   NEXT TIME  "The *proposal…* | interrupted."  The plain sky at 30.6, end card.
// One canvas (sky + constellation + Retro + phone + scrapbook + cast), DOM type, the dialogue box and the lesson above it,
// grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'
import { OPH, drawOphiuchus, drawBits, drawTitleSting, titleStingCues, drawNextTime, nextTimeCues, gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'

export const DURATION = 35
const EP = 6
const KEY = 'Bbm'
const STORY_END = DURATION - ENDCARD_LEN       // 30.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#ff5a5a', MINT = '#7fe0b8'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const SYM = "'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const CPS = 28

// ── the dialogue, chained so every line holds ≥ 1.5 s after it finishes typing
const NARR = 'THE STARS', RETRO = '☿ RETRO', CANN = '♋ CANCER'
const SPEC = [
  ['l1', 3.2, RETRO, 'new phone, who dis? *u up?*', GOLD],
  ['l2', null, CANN, 'Retro! you *apologized* for this!', signStar('cancer').color],
  ['l3', null, RETRO, 'i did? i forgot *everything.*', GOLD],
  ['l4', null, NARR, 'page one: your *apology.*'],
  ['l5', null, RETRO, '…i said *that?*', GOLD],
  ['l6', null, NARR, 'write it down so you don’t *relearn* it.'],
]
const LINES = [], LT = []
for (const [, t0, speaker, text, color] of SPEC) {
  const t = t0 ?? +(LT[LT.length - 1].done + 1.52).toFixed(2)
  LINES.push({ t, speaker, text, ...(color ? { color } : {}) })
  LT.push(lineTimes([{ t, text }], { cps: CPS })[0])
}
export const LINES_ALL = LINES
const L = Object.fromEntries(SPEC.map(([k], i) => [k, LINES[i].t]))
const DONE = Object.fromEntries(SPEC.map(([k], i) => [k, LT[i].done]))

const LESSON_TEXT = 'Write down what | you *learned.*'
const T = {
  sting: 0,
  h0: 2.5, h0Land: 2.95, h0Out: [DONE.l3 + 0.15, DONE.l3 + 0.35],
  retroIn: 2.45, phoneIn: 2.7, drafts: 3.4, cast: 2.6, open: 3.0,
  gasp1: DONE.l1 + 0.15,
  phoneOut: [DONE.l3 + 0.1, DONE.l3 + 0.5], move: [DONE.l3 + 0.1, DONE.l3 + 0.8],
  h1: DONE.l3 + 0.45, bookIn: [DONE.l3 + 0.45, DONE.l3 + 1.0], cover: [DONE.l3 + 1.05, DONE.l3 + 1.5],
  gasp2: DONE.l4 + 0.2,
  stop: [L.l6, L.l6 + 1.2], sticky: DONE.l6 + 0.1,
  ghost: L.l6 + 0.35,
  close: +(DONE.l6 + 1.5).toFixed(2),
}
T.h1Out = [T.close - 0.2, T.close]
T.lesson = +(T.close + 0.1).toFixed(2)
const LESSON_END = lessonTimes({ at: T.lesson, text: LESSON_TEXT }).end
T.lessonOut = [+(LESSON_END + 2.5).toFixed(2), +(LESSON_END + 2.68).toFixed(2)]
T.h3 = T.lessonOut[1] + 0.03; T.h3Land = T.h3 + 0.45
T.flip = [T.h3 + 0.1, T.h3 + 0.6]; T.gasp3 = T.h3 + 0.85
T.next = 26.4
T.out = [T.next - 0.4, T.next - 0.05]; T.h3Out = [T.next - 0.25, T.next - 0.05]
export const TIMES = T
const LESSON = { at: T.lesson, out: T.lessonOut, text: LESSON_TEXT, accentColor: GOLD, dim: 0.62, top: 300, textTop: 498 }
const TEASE = 'The *proposal…* | interrupted.'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
const ARROW = BMP(`..X.. .XX.. XXXXX .XX.. ..X..`)          // points left (−x)
const QMARK = BMP(`.XXX. X...X ....X ...X. ..X.. ..... ..X..`)
const DROP = BMP(`..X.. ..X.. .XXX. XXWXX XXXXX .XXX.`)
function bits(x, bm, cx, cy, cell, col, { rot = 0, a = 1, col2 = '#ffffff' } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'W' ? col2 : col; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }

// ── layout
const ORB_A = { x: 360, y: 880, r: 118 }, ORB_B = { x: 540, y: 600, r: 84 }
const PHONE = { x: 790, y: 880, w: 300, h: 470 }
const BOOK = { x: 540, y: 1000, w: 940, h: 460 }
const CAST = [
  { id: 'leo', x: 190, y: 1346, size: 170, seed: 71 },
  { id: 'cancer', x: 540, y: 1352, size: 170, seed: 72 },
  { id: 'virgo', x: 890, y: 1346, size: 170, seed: 73 },
].map((m, i) => ({ ...m, at: T.cast + 0.12 * i }))
const DRAFTS = ['♈', '♉', '♋', '♌', '♎', '♓']
export const GHOST = { at: T.ghost, x: BOOK.x + BOOK.w / 2 - 2, y: BOOK.y - 40, where: 'leaning out from behind the scrapbook’s right edge, mid-height' }

// Retro's spin (pure): backwards (wrong way), slowing to a stop while it writes its note
function spinAngle(t) {
  const v0 = 2.6, [a, b] = T.stop
  if (t < a) return -v0 * t
  if (t < b) { const u = t - a; return -v0 * a - v0 * (u - u * u / (2 * (b - a))) }
  return -v0 * a - v0 * (b - a) / 2
}
function orbMood(t) {
  if (t < L.l1) return { eyes: 'open', look: [1, 0] }
  if (t < DONE.l1 + 0.3) return { eyes: 'happy', look: [0, 0] }
  if (t < L.l3) return { eyes: 'open', look: [0, 1] }
  if (t < T.move[1]) return { eyes: 'dizzy', look: [0, 0] }
  if (t < T.gasp2) return { eyes: 'open', look: [0, 1] }
  if (t < L.l5 + 0.3) return { eyes: 'wide', look: [0, 1] }
  if (t < T.stop[1]) return { eyes: 'sad', look: [0, 1] }
  if (t < T.h3) return { eyes: 'happy', look: [0, 0] }
  if (t < T.gasp3 - 0.1) return { eyes: 'open', look: [0, 1] }
  return { eyes: 'wide', look: [0, 1] }
}
function castState(t, m) {
  const toRetro = [clamp((ORB_A.x - m.x) / 300, -1, 1), -1]
  if (t < L.l1) return { mood: 'neutral', look: toRetro }
  if (t < L.l3) return { mood: 'wide', look: toRetro, blink: false }
  if (t < T.bookIn[1]) return { mood: 'squint', look: [0, -1] }
  if (t < L.l5) return { mood: 'neutral', look: [0, -1] }
  if (t < T.sticky) return { mood: 'happy', look: [0, -1] }
  if (t < T.h3) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.gasp3) return { mood: 'neutral', look: [0, -1] }
  return { mood: 'wide', look: [clamp((BOOK.x - 200 - m.x) / 300, -1, 1), -1], blink: false }
}
const CAN_HOPS = talkHops(LINES, CANN, { cps: CPS })

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'", "700 74px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Retro has | *amnesia.*', { top: 190, size: 120, accentSize: 184, at: T.h0, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land, fit: true })
  const H1 = popText(root, 'The | *intervention.*', { top: 150, size: 110, accentSize: 168, at: T.h1, accentColor: LAV, wobble: true, late: 1, lateAt: T.h1 + 0.45, fit: true, lineHeight: 0.95 })
  const H3 = popText(root, 'Remember | the *lesson.*', { top: 150, size: 116, accentSize: 172, at: T.h3, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h3Land, fit: true, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#05040c' }, root)

  // the orb sprite (16-cell gold ball), as in stretro
  const ORB_G = 16
  const orbBuf = document.createElement('canvas'); orbBuf.width = orbBuf.height = ORB_G
  {
    const o = orbBuf.getContext('2d'), h = ORB_G / 2
    for (let j = 0; j < ORB_G; j++) for (let i = 0; i < ORB_G; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d > 1) continue
      let c = d > 0.86 ? '#b8792a' : (u * 0.6 + v * 0.8 > 0.35 ? '#e0a743' : '#f7cf68')
      if (d <= 0.86 && Math.hypot(u + 0.38, v + 0.4) < 0.24) c = '#fff1c8'
      if (d > 0.86 && u + v < -0.6) c = '#ffd98a'
      o.fillStyle = c; o.fillRect(i, j, 1, 1)
    }
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  /** Retro: gold orb, chasing arrows the wrong way, a face that stays upright, its ☿ badge */
  function orb(cx, cy, r, t, { k = 1, mood, arrows = 1, fwd = false, tag = true, badge = true } = {}) {
    if (k <= 0.01) return
    glow(cx, cy, r * 3, GOLD, 0.8 * clamp(k))
    const spin = fwd ? t * 1.6 : spinAngle(t)
    if (arrows > 0.01) {
      const R = r * 1.62, cell = Math.max(3, Math.round(r * 0.07)) * k, dir = fwd ? 1 : -1
      x.save(); x.globalAlpha *= arrows
      for (let i = 0; i < 3; i++) {
        const a = spin + i * Math.PI * 2 / 3
        for (let s = 1; s <= 4; s++) {
          const b = a - dir * s * 0.16
          x.fillStyle = rgba(fwd ? MINT : GOLD, 0.55 - s * 0.11); const q = cell * (1.6 - s * 0.25)
          x.fillRect(Math.round(cx + Math.cos(b) * R * k - q / 2), Math.round(cy + Math.sin(b) * R * k - q / 2), q, q)
        }
        bits(x, ARROW, cx + Math.cos(a) * R * k, cy + Math.sin(a) * R * k, cell, fwd ? '#d9fff0' : '#fff1c8', { rot: a + (fwd ? -Math.PI / 2 : Math.PI / 2) })
      }
      x.restore()
    }
    const S = Math.round(r * 2 * k / ORB_G) * ORB_G || r * 2 * k
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(spin); x.imageSmoothingEnabled = false
    x.fillStyle = 'rgba(14,8,32,0.6)'; x.beginPath(); x.arc(0, 0, S / 2 + 5, 0, Math.PI * 2); x.fill()
    x.drawImage(orbBuf, -S / 2, -S / 2, S, S)
    x.restore()
    const M = mood, c = Math.max(3, Math.round(r * k / 9)), [lx, ly] = M.look
    const blinkT = (t + 0.3) % 3.3 < 0.13
    for (const s of [-1, 1]) {
      const ex = Math.round(cx + s * 2.6 * c), ey = Math.round(cy - 0.6 * c)
      x.fillStyle = INK
      if (M.eyes === 'happy') { x.fillRect(ex - 1.5 * c, ey + 0.5 * c, c, c); x.fillRect(ex - 0.5 * c, ey - 0.5 * c, c, c); x.fillRect(ex + 0.5 * c, ey + 0.5 * c, c, c) }
      else if (M.eyes === 'dizzy') {                               // little spirals: it really doesn't remember
        const ph = Math.floor(t * 8) % 4, sq = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]]
        x.fillRect(ex - 0.5 * c, ey - 0.5 * c, c, c)
        sq.forEach(([u, v], i) => { if ((i + ph) % 4 !== 0) x.fillRect(ex + (u - 0.5) * c, ey + (v - 0.5) * c, c * 0.9, c * 0.9) })
      } else if (blinkT) x.fillRect(ex - 1.5 * c, ey + 0.5 * c, 3 * c, c * 0.8)
      else {
        const tall = M.eyes === 'wide' ? 3.2 : 2.4, wd = M.eyes === 'wide' ? 2.3 : 2
        x.fillRect(ex - c + lx * c * 0.6, ey - c + ly * c * 0.6, wd * c, tall * c)
        x.fillStyle = '#ffffff'; x.fillRect(ex - c + lx * c * 0.6, ey - c + ly * c * 0.6, c * 0.8, c * 0.8)
        if (M.eyes === 'sad') { x.fillStyle = INK; x.fillRect(ex - (s > 0 ? 1.4 : 0.6) * c, ey - 2.2 * c, 2 * c, c * 0.6); x.fillRect(ex - (s > 0 ? -0.4 : 1.6) * c, ey - 1.8 * c, c, c * 0.6) }
      }
    }
    if (M.eyes === 'sad' || M.eyes === 'happy') { x.fillStyle = rgba('#ff8fb1', 0.7); for (const s of [-1, 1]) x.fillRect(Math.round(cx + s * 4.6 * c - c), Math.round(cy + 1.6 * c), 2 * c, c) }
    if (badge) {
      const bx = cx + r * 0.72 * k, by = cy + r * 0.72 * k, br = r * 0.3 * k
      x.fillStyle = 'rgba(14,8,32,0.9)'; x.beginPath(); x.arc(bx, by, br + 4, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(bx, by, br, 0, Math.PI * 2); x.fill()
      x.font = `700 ${Math.round(br * 1.5)}px ${SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('☿︎', bx, by + br * 0.08)
    }
    if (tag) pill(fwd ? '▶  DIRECT' : '℞  RETROGRADE', fwd ? MINT : GOLD, cx, cy - r * 1.62 - 50, k)
  }
  function pill(label, col, px, py, k, size = 30) {
    if (k <= 0.01) return
    x.save(); x.translate(px, py); x.scale(k, k)
    x.font = `700 ${size}px ${MONO}`; x.letterSpacing = '4px'; const tw = x.measureText(label).width
    const pw = tw + 44, ph = size * 1.9
    x.fillStyle = 'rgba(20,12,44,0.92)'; x.beginPath(); x.roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2); x.fill()
    x.lineWidth = 3; x.strokeStyle = rgba(col, 0.9); x.stroke()
    x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 2, 2); x.letterSpacing = '0px'
    x.restore()
  }
  /** orbiting question marks: the amnesia */
  function amnesia(cx, cy, r, t, a) {
    if (a <= 0.01) return
    for (let i = 0; i < 3; i++) {
      const ang = -t * 1.8 + i * Math.PI * 2 / 3
      bits(x, QMARK, cx + Math.cos(ang) * r * 1.25, cy - r * 1.05 + Math.sin(ang) * r * 0.32, Math.max(3, Math.round(r / 22)), i === 1 ? LAV : '#fff1c8', { a: a * (0.6 + 0.4 * Math.sin(ang)) })
    }
  }

  // ── the phone: DRAFTS (11), "u up?" to every ex
  function phone(t) {
    const up = easeOutBack(prog(t, T.phoneIn, T.phoneIn + 0.45), 1.4), o = ease.inCubic(prog(t, ...T.phoneOut))
    if (up <= 0 || o >= 1) return
    const { w, h } = PHONE, cx = PHONE.x + o * 600, cy = lerp(2300, PHONE.y, up) + Math.sin(t * 2.1) * 5
    x.save(); x.translate(cx, cy); x.rotate(0.06 + o * 0.4)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 46); x.fill()
    x.fillStyle = '#2a2350'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 40); x.fill()
    x.fillStyle = '#120c2a'; x.beginPath(); x.roundRect(-w / 2 + 14, -h / 2 + 40, w - 28, h - 70, 18); x.fill()
    x.fillStyle = '#2a2350'; x.fillRect(-36, -h / 2 + 16, 72, 10)
    x.font = `700 24px ${MONO}`; x.letterSpacing = '3px'; x.textAlign = 'center'; x.textBaseline = 'middle'
    const n = Math.min(11, Math.max(0, Math.floor((t - T.drafts) / 0.22) + 1))
    x.fillStyle = PINK; x.fillText(`DRAFTS (${n})`, 2, -h / 2 + 72); x.letterSpacing = '0px'
    DRAFTS.forEach((g, i) => {
      const at = T.drafts + i * 0.22, k = pop01(t, at, 0.25, 2.2)
      if (k <= 0.01) return
      const ry = -h / 2 + 122 + i * 54
      x.save(); x.translate(0, ry); x.scale(k, k)
      x.fillStyle = 'rgba(255,143,177,0.16)'; x.beginPath(); x.roundRect(-w / 2 + 26, -22, w - 52, 44, 12); x.fill()
      x.textAlign = 'left'; x.font = `700 26px ${SYM}`; x.fillStyle = '#fff1c8'; x.fillText(g + '︎', -w / 2 + 40, 2)
      x.font = `700 24px ${MONO}`; x.fillStyle = BONE; x.fillText('ex: u up?', -w / 2 + 76, 2)
      x.restore()
    })
    // the SEND button, pulsing
    const pulse = 0.5 + 0.5 * Math.sin(t * 6)
    x.fillStyle = rgba(GOLD, 0.7 + 0.3 * pulse); x.beginPath(); x.roundRect(-70, h / 2 - 76, 140, 44, 22); x.fill()
    x.font = `700 24px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.letterSpacing = '4px'; x.fillText('SEND', 2, h / 2 - 53); x.letterSpacing = '0px'
    x.restore()
  }

  // ── the scrapbook: cover, then spread 1 (EP 092), then the last page (the photo)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function polaroid(px, py, w, h, rot, caption, paint) {
    x.save(); x.translate(px, py); x.rotate(rot)
    x.save(); x.shadowColor = 'rgba(0,0,0,0.35)'; x.shadowBlur = 16; x.shadowOffsetY = 6; x.fillStyle = '#fbf8f0'; x.fillRect(-w / 2, -h / 2, w, h); x.restore()
    const iw = w - 28, ih = h - 74
    x.save(); x.beginPath(); x.rect(-iw / 2, -h / 2 + 14, iw, ih); x.clip()
    x.fillStyle = '#140d30'; x.fillRect(-iw / 2, -h / 2 + 14, iw, ih)
    paint(0, -h / 2 + 14 + ih / 2, iw, ih)
    x.restore()
    x.font = `700 20px ${MONO}`; x.letterSpacing = '3px'; x.fillStyle = '#2a1f5a'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(caption, 2, h / 2 - 30); x.letterSpacing = '0px'
    // tape
    x.fillStyle = 'rgba(255,214,140,0.7)'; x.fillRect(-30, -h / 2 - 12, 60, 24)
    x.restore()
  }
  function pageBase(x0, y0, w, h, left) {
    x.fillStyle = '#f6efdc'; x.fillRect(x0, y0, w, h)
    const g = x.createLinearGradient(left ? x0 + w - 40 : x0, 0, left ? x0 + w : x0 + 40, 0)
    g.addColorStop(left ? 0 : 1, 'rgba(60,40,90,0)'); g.addColorStop(left ? 1 : 0, 'rgba(60,40,90,0.28)')
    x.fillStyle = g; x.fillRect(left ? x0 + w - 40 : x0, y0, 40, h)
  }
  function spread1(t, x0, y0, pw, ph) {
    // left: the polaroid of Retro going ▶ DIRECT (EP 092)
    polaroid(x0 + pw / 2, y0 + ph / 2 - 6, 290, 340, -0.06, 'EP 092', (cx, cy) => {
      x.save(); x.fillStyle = '#21184a'; x.fillRect(cx - 200, cy - 200, 400, 400); x.restore()
      orb(cx, cy + 10, 62, t, { mood: { eyes: 'happy', look: [0, 0] }, fwd: true, tag: false, badge: false, arrows: 1 })
      pill('▶ DIRECT', MINT, cx, cy - 92, 1, 18)
    })
    // right: the apology note, in its own handwriting
    const rx = x0 + pw + 34
    for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(80,120,200,0.25)'; x.fillRect(rx - 10, y0 + 92 + i * 62, pw - 50, 2) }
    x.fillStyle = 'rgba(255,143,177,0.5)'; x.fillRect(rx - 14, y0 + 20, 3, ph - 40)
    x.font = `700 20px ${MONO}`; x.letterSpacing = '4px'; x.fillStyle = '#2a1f5a'; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.fillText('MY APOLOGY', rx, y0 + 50); x.letterSpacing = '0px'
    x.font = `italic 500 40px ${SERIF}`
    const rows = [['i did that.', '#2a1f5a'], ['i’m sorry. ✓', '#2a1f5a'], ['learned: think', '#1f7a58'], ['before i spin.', '#1f7a58']]
    rows.forEach(([s, c], i) => { x.fillStyle = c; x.fillText(s, rx, y0 + 86 + i * 62) })
    // the sticky note it adds
    const sk = pop01(t, T.sticky, 0.35, 2.2)
    if (sk > 0.01) {
      x.save(); x.translate(rx + 250, y0 + ph - 60); x.rotate(0.08); x.scale(sk, sk)
      x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-92, -48, 190, 104)
      x.fillStyle = '#ffe36e'; x.fillRect(-96, -54, 190, 104)
      x.font = `700 19px ${MONO}`; x.fillStyle = '#3a2a10'; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('READ THIS', 0, -26); x.fillText('EVERY', 0, -2); x.fillText('RETROGRADE ✓', 0, 22)
      x.restore()
    }
  }
  function spread2(t, x0, y0, pw, ph) {
    // left: the photo from the night of the eclipse: Leo's ring box, in Ophiuchus's hands
    polaroid(x0 + pw / 2, y0 + ph / 2 - 6, 300, 360, 0.05, 'ECLIPSE NIGHT', (cx, cy) => {
      x.save(); x.fillStyle = '#0b0820'; x.fillRect(cx - 200, cy - 200, 400, 400)
      const g = x.createRadialGradient(cx + 60, cy - 120, 0, cx + 60, cy - 120, 90); g.addColorStop(0, 'rgba(255,246,220,0.6)'); g.addColorStop(1, 'rgba(255,246,220,0)')
      x.fillStyle = g; x.fillRect(cx - 200, cy - 200, 400, 400)
      x.fillStyle = '#1b1242'; x.beginPath(); x.arc(cx + 60, cy - 120, 26, 0, Math.PI * 2); x.fill()
      x.restore()
      drawOphiuchus(x, cx - 10, cy - 10, 190, t, { mood: 'wink', look: [1, 0], glitter: 0.6, side: 1, bob: 0 })
      // the ring box, held up front
      x.save(); x.translate(cx - 4, cy + 118)
      x.fillStyle = INK; x.fillRect(-30, -34, 60, 36); x.fillRect(-28, -66, 56, 34)
      x.fillStyle = '#7a1838'; x.fillRect(-26, -62, 52, 28); x.fillStyle = '#b8264f'; x.fillRect(-26, -30, 52, 28)
      x.fillStyle = '#f7c948'; x.fillRect(-10, -50, 20, 4); x.fillRect(-10, -38, 20, 4); x.fillRect(-14, -46, 4, 8); x.fillRect(10, -46, 4, 8)
      x.fillStyle = '#bff3ff'; x.fillRect(-5, -58, 10, 8)
      x.restore()
      // the flash glare of a hurried snapshot
      x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(cx - 200, cy - 200, 400, 30)
    })
    const rx = x0 + pw + 34
    x.font = `700 20px ${MONO}`; x.letterSpacing = '4px'; x.fillStyle = '#2a1f5a'; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.fillText('THE LAST PAGE', rx, y0 + 50); x.letterSpacing = '0px'
    x.font = `italic 500 42px ${SERIF}`; x.fillStyle = '#a0204a'
    x.fillText('who took', rx, y0 + 150); x.fillText('this photo?!', rx, y0 + 210)
    x.font = `700 110px ${MONO}`; x.fillStyle = 'rgba(160,32,74,0.85)'; x.fillText('?', rx + 230, y0 + ph - 50)
  }
  function scrapbook(t, ok) {
    const up = easeOutBack(prog(t, ...T.bookIn), 1.3)
    if (up <= 0 || ok <= 0) return null
    const { w, h } = BOOK, cx = BOOK.x, cy = lerp(2400, BOOK.y, up) + Math.sin(t * 1.5) * 4
    const pw = w / 2 - 16, ph = h - 32, x0 = cx - w / 2 + 16, y0 = cy - h / 2 + 16
    x.save(); x.globalAlpha *= clamp(ok)
    // the binding + a little shadow
    x.save(); x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 40; x.shadowOffsetY = 14
    rr(cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12, 18); x.fillStyle = INK; x.fill(); x.restore()
    rr(cx - w / 2, cy - h / 2, w, h, 14); x.fillStyle = '#5a2f8a'; x.fill()
    const fp = prog(t, ...T.flip), last = fp > 0.5
    // the pages under everything
    pageBase(x0, y0, pw, ph, true); pageBase(cx, y0, pw, ph, false)
    if (!last) spread1(t, x0, y0, pw, ph)
    else spread2(t, x0, y0, pw, ph)
    // page turn (right → left) to the last page
    if (fp > 0 && fp < 1) {
      const a = Math.cos(fp * Math.PI), ww = pw * Math.abs(a)
      x.fillStyle = a > 0 ? '#efe6d0' : '#f6efdc'
      if (a > 0) x.fillRect(cx, y0 - 6 * Math.sin(fp * Math.PI), ww, ph)
      else x.fillRect(cx - ww, y0 - 6 * Math.sin(fp * Math.PI), ww, ph)
      x.fillStyle = 'rgba(60,40,90,0.25)'; x.fillRect(a > 0 ? cx + ww - 4 : cx - ww, y0, 4, ph)
    }
    // the cover: closed over the right page, swings open over to the left
    const cp = prog(t, ...T.cover)
    if (cp < 1) {
      const a = Math.cos(cp * Math.PI), ww = (pw + 16) * Math.abs(a)
      x.fillStyle = a > 0 ? '#6b38a3' : '#4b2775'
      if (a > 0) {
        x.fillRect(cx - 2, cy - h / 2, ww, h)
        // closed: the cover covers both pages (draw the left half too until it opens)
        if (cp <= 0) { x.fillRect(cx - w / 2, cy - h / 2, w / 2, h) }
        if (a > 0.3) {
          x.save(); x.translate(cx + ww / 2, cy); x.scale(Math.abs(a), 1)
          x.fillStyle = GOLD; x.fillRect(-150, -120, 300, 6); x.fillRect(-150, 114, 300, 6)
          x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '5px'
          x.fillText('RETRO’S', 4, -40); x.fillText('SCRAPBOOK', 4, 10); x.letterSpacing = '0px'
          x.font = `700 46px ${SYM}`; x.fillText('☿︎', 0, 70)
          x.restore()
        }
      } else x.fillRect(cx - ww, cy - h / 2, ww, h)
    }
    // the spine
    x.fillStyle = 'rgba(30,16,60,0.6)'; x.fillRect(cx - 3, cy - h / 2 + 8, 6, h - 16)
    x.restore()
    return { cx, cy, x0, y0, pw, ph }
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, MINT, LAV]) {
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
  function drawCast(t, ok) {
    for (const m of CAST) {
      const p = pop01(t, m.at, 0.35, 2.2) * ok
      if (p <= 0.02) continue
      const st = signStar(m.id), s = castState(t, m)
      const hops = m.id === 'cancer' ? [m.at + 0.3, ...CAN_HOPS, T.gasp1, T.gasp3] : [m.at + 0.3, T.gasp1 + (m.seed % 3) * 0.06, T.sticky + 0.2, T.gasp3 + (m.seed % 3) * 0.05]
      const r = drawStarChar(x, m.x, m.y, m.size, t, { color: st.color, glyph: st.glyph, ...s, pop: p, seed: m.seed, glow: 0.85, hops })
      if (m.id === 'leo') drawBits(x, CROWN, CROWN_C, Math.round(r.x), Math.round(r.top + 2), 6 * p, { rot: -0.16 + 0.04 * Math.sin(t * 3) })
      if (m.id === 'cancer' && t > L.l3 + 0.4 && t < T.bookIn[0]) bits(x, DROP, r.x + 70, r.top + 50 + ((t * 0.7) % 1) * 30, 5, '#8fd8f6', { a: 0.9 })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.55 })
      const ok = popOut(t, T.out)
      const z1 = gaspZoom(t, { at: T.gasp1, dur: 1.2, x: 540, y: 1340, amount: 0.25, follow: 0.3 })
      const z2 = gaspZoom(t, { at: T.gasp2, dur: 1.3, x: ORB_B.x, y: ORB_B.y, amount: 0.45, follow: 0.4, cy: 800 })
      const z3 = gaspZoom(t, { at: T.gasp3, dur: 1.3, x: BOOK.x - BOOK.w / 4, y: BOOK.y, amount: 0.38, follow: 0.6, cy: 1000 })
      x.save(); z1.apply(x); z2.apply(x); z3.apply(x)
      if (t >= T.retroIn && ok > 0) {
        // Retro: big beside its phone, then up top, small, over the scrapbook
        const mv = ease.inOutCubic(prog(t, ...T.move))
        const ox = lerp(ORB_A.x, ORB_B.x, mv), oy = lerp(ORB_A.y, ORB_B.y, mv) - Math.sin(Math.PI * mv) * 80 + Math.sin(t * 2.3) * 6, orr = lerp(ORB_A.r, ORB_B.r, mv)
        const ko = pop01(t, T.retroIn, 0.45, 1.8) * ok
        const M = orbMood(t)
        orb(ox, oy, orr, t, { k: ko, mood: M, arrows: 1 - prog(t, T.stop[0] + 0.4, T.stop[1]), tag: t < T.move[0] })
        amnesia(ox, oy, orr * ko, t, (1 - prog(t, L.l5, L.l5 + 0.5)) * clamp(ko))
        phone(t)
        sparkles(t, ox, oy, T.stop[1] - 0.1, 10, 150, 1, [GOLD, BONE, MINT, PINK])
        const B = scrapbook(t, ok)
        if (B) {
          drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'left', cell: 3 })
          sparkles(t, B.cx + 250, B.y0 + B.ph - 60, T.sticky, 10, 120, 0.5, [GOLD, '#ffe36e', BONE, MINT])
          sparkles(t, B.x0 + B.pw / 2, B.cy, T.flip[1], 14, 260, 0.2, [OPH.teal, OPH.violet, PINK, GOLD])
        }
        drawCast(t, ok)
      }
      x.restore()
      drawGaspLines(x, t, { at: T.gasp1, dur: 1.2, x: 540, y: 1340, follow: 0.3, color: signStar('cancer').color })
      drawGaspLines(x, t, { at: T.gasp2, dur: 1.3, x: ORB_B.x, y: ORB_B.y, follow: 0.4, cy: 800, color: GOLD })
      drawGaspLines(x, t, { at: T.gasp3, dur: 1.3, x: BOOK.x - BOOK.w / 4, y: BOOK.y, follow: 0.6, cy: 1000, color: OPH.teal })
      drawTitleSting(x, t, { ep: EP, at: T.sting })
      drawNextTime(x, t, { at: T.next, tease: TEASE, y: 760, size: 70, accentSize: 100 })
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 2.42 (sting out → Retro), the lesson out → the last page, the cast out → NEXT TIME.
// cardfx keeps the middle one.
const CUTS = [{ t: 2.42, kind: 'flip' }, { t: +(T.lessonOut[1] - 0.02).toFixed(2), kind: 'flip' }, { t: +(T.out[1] - 0.05).toFixed(2), kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S5 E06' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine; st5cast writes its brass in KEY)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...titleStingCues(T.sting, { key: KEY, ep: EP }),
  ...wordPops(T.h0, 2, 0.08, 0, 0.025), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  // backwards spin: a descending wobble of pops
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(T.retroIn + 0.1 + i * 0.12), NOTE[6 - i], 0.02, 0]),
  ['whoosh', T.phoneIn, 0.35, 0.03],
  ...DRAFTS.map((_, i) => ['pop', r3(T.drafts + i * 0.22), 1318.51 - i * 60, 0.022, 0.4]),
  ...CAST.map((m, i) => ['pop', r3(m.at + 0.05), NOTE[i % NOTE.length], 0.026, (m.x - 540) / 700]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [RETRO]: 520, [CANN]: 880, [NARR]: 784 } }),
  ...gaspCues(T.gasp1, { key: KEY }),
  ['whoosh', T.phoneOut[0], 0.35, 0.035],
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1 + 0.45, 880, 0.045, 0],
  ['whoosh', T.bookIn[0], 0.5, 0.04], ['tom', T.bookIn[1] - 0.05, 110, { gain: 0.2, decay: 0.3 }], ['pluck', T.cover[1], 1174.66, 0.04, 0.5, 0], ['bell', T.cover[1] + 0.05, 1568, 0.025, 1.2, 0],
  ...gaspCues(T.gasp2, { key: KEY }),
  // stopping: the wobble slows
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.stop[0] + 0.2 + i * 0.25 + i * i * 0.04), NOTE[3 - i], 0.018, 0]),
  ['pop', T.sticky, 1318.51, 0.045, 0.2], ['glitter', T.sticky, T.sticky + 0.4],
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...wordPops(T.h3, 2, 0.08, 1, 0.026), ['pop', T.h3Land, 1174.66, 0.05, 0],
  ['whoosh', T.flip[0], 0.35, 0.035],
  ...twistCues(T.flip[1] - 0.35, { key: KEY, gap: 0.2 }).filter(c => c[1] < T.gasp3 - 0.05),
  ...gaspCues(T.gasp3, { key: KEY }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...nextTimeCues(T.next, { key: KEY, tease: TEASE }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
