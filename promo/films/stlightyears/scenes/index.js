// stlightyears — "Light-Years." (45 s vertical Align ad, Star Talk season 3 #23) · story 0–40.6, then the shared end card.
//   0.00–3.2   "Long distance. | Like, really long."  ♌ YOUR STAR (bottom-left) and ♒ THEIR STAR (top-right) at opposite
//              corners of the frame; a dotted line draws between them: "4 LIGHT-YEARS". (A slow cinematic pull-out.)
//   2.82–7.25  "Message sent."  A "goodnight ☾" bubble squishes into a pixel photon that… crawls. YOU: "sent! they'll see it
//              tonight." Chip: DELIVERED IN: 4 YEARS (womp). Double-take. Crickets. Pisces sniffles.
//   7.27–11.7  "4 years later."  ▶▶ fast-forward: the photon lands, THEIR STAR wakes: "aw! goodnight! you too!" and sends a
//              heart back. Chip: ARRIVES: 4 YEARS.
//  11.71       card cut (flip).
//  11.7–15.0   "8 years later."  YOUR STAR under cobwebs (and a spider). The heart lands; the webs fly off.
//              YOU: "THEY SAID YOU TOO!!"  Pisces sobs happily.
//  15.04–17.8  "Happy birthday!"  A cake photon lands; a party hat pops on THEIR STAR. Chip: LANDED: 4 BIRTHDAYS LATE.
//  17.82–25.6  "Plan B: faster."  A paper plane (ETA: 4 YEARS, the nose droops) · a pigeon in a tiny space helmet (ETA:
//              4 YEARS; a synced eye-roll) · Pisces sobs in the middle · YOUR STAR inhales and YELLS: silence (the music
//              tape-stops). Chip: ETA: NEVER. THE STARS slide in: "sound can't travel in space, babe." The HIIII falls off.
//  25.6        card cut (deal).
//  25.6–31.7   "Real talk."  THE STARS: "you can't fix the distance." … "but you can fix the effort."  "Every night. | Same
//              time."  10:00 PM on both clocks; both stars shine on the beat; a gold constellation line connects them.
//  31.71–36.0  ★ LESSON UNLOCKED: "Distance is | just space. | Effort closes it."  (+1 DEVOTION)
//  36.0–38.3   "Answers stay hidden | till you both play."  A talk card ("Morning person or night owl?"); each star plays
//              a face-down answer; both flip at the same moment: "Night owl." ✓ ✓
//  38.4–40.5   "Same sky. | Same time. | Tonight."  Back to the two corners, the gold line, one more shine together.
// One canvas (sky + line + traffic + stars + props + chips + cards), DOM type + dialogue boxes + the shared LESSON beat
// above it, grain on top. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawBitmap, ICON, ICON_PAL, drawPlane, drawPigeon, drawPartyHat, drawCobweb, drawSpider, drawTears } from '../props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', MINT = '#7dffb0', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)     // 108 bpm grid

// ── the timeline
export const T = {
  black: [0, 0.3],
  h0: 0.25, h0Land: 0.7, h0b: 1.35, h0Out: [3.0, 3.2],
  line: [0.75, 1.55], ly: BEAT(2),                                           // 1.711 "4 LIGHT-YEARS"
  bubble: BEAT(4), send: BEAT(5),                                           // 2.822 · 3.378 (the drop)
  h1: 3.3, h1Land: 3.65, h1Out: [7.05, 7.25],
  lA: 3.95, chip1: BEAT(9), dbl: [5.62, 5.9], crick: [6.25, 6.75], closeA: 7.1,   // 5.6
  ff1: [BEAT(12), 7.85], arr1: 7.87,                                         // 7.267
  h2: 7.3, h2Land: 7.62, h2Out: [11.48, 11.66],
  lB: 8.2, send2: 9.95, chip2: BEAT(18), closeB: 11.3,                       // 10.6
  cut1: BEAT(20),                                                            // 11.711
  h3: 11.76, h3Land: 12.08, ff2: [11.74, 12.35], arr2: 12.38, h3Out: [14.88, 15.05],
  lC: 12.75, sob1: 13.0, closeC: 15.2,
  h4: 15.1, h4Land: 15.42, ff3: [15.06, 15.5], arr3: 15.5, chip3: BEAT(28), h4Out: [17.6, 17.8],   // 16.156
  h5: 17.85, h5Land: 18.2, h5Out: [25.4, 25.58],
  plane: BEAT(32), chip4: BEAT(33), pigeon: BEAT(34), chip5: BEAT(35), roll5: 20.1,   // 18.378 · 18.933 · 19.489 · 20.044
  sob2: 20.3, inhale: [20.62, 21.1], yell: BEAT(37), chip6: BEAT(38),       // 21.156 · 21.711
  gIn: 21.9, lE: 22.0, hiFall: [23.9, 24.7], closeE: 25.25,
  cut2: BEAT(45),                                                            // 25.6
  h6: 25.66, h6Land: 26.0, h6Out: [29.3, 29.47],
  lF1: 25.95, lF2: 28.65, closeF: 31.35,
  h7: 29.5, h7Land: 29.9, clocks: 29.6, shine: [BEAT(53), BEAT(54)], gold: [BEAT(54), 31.0], h7Out: [31.5, 31.68],   // 30.044 · 30.6
  lesson: BEAT(56), lessonOut: [35.8, 36.0],                                 // 31.711
  tie: 35.72, h8: 36.0, h8Land: 36.45, talk: [36.0, 36.35], playA: 36.5, playB: 36.72, roll: [36.8, 37.25],
  flip: BEAT(66), cardsOut: [38.05, 38.32], h8Out: [38.1, 38.28],           // 37.267
  fin: 38.12, gold2: [38.32, 38.7], h9: 38.42, h9Land: 39.2, shine3: BEAT(70), // 39.489
  out: [40.05, 40.48], h9Out: [40.22, 40.46],
}

// ── the dialogue
const YOU = '♌ YOUR STAR', THEY = '♒ THEIR STAR', STARS = 'THE STARS'
const LEO = signStar('leo'), AQU = signStar('aquarius'), PIS = signStar('pisces')
const LA_ = [{ t: T.lA, speaker: YOU, color: LEO.color, text: "sent! they'll see it *tonight.*" }]
const LB_ = [{ t: T.lB, speaker: THEY, color: CYAN, text: 'aw! goodnight! *you too!*' }]
const LC_ = [{ t: T.lC, speaker: YOU, color: LEO.color, text: 'THEY SAID *YOU TOO!!*' }]
const LE_ = [{ t: T.lE, speaker: STARS, text: "sound can't travel in *space,* babe." }]
const LF_ = [
  { t: T.lF1, speaker: STARS, text: "you can't fix the *distance.*" },
  { t: T.lF2, speaker: STARS, text: 'but you can fix the *effort.*' },
]
export const ALL_LINES = [...LA_, ...LB_, ...LC_, ...LE_, ...LF_]
export const BOXES = [[LA_, T.closeA], [LB_, T.closeB], [LC_, T.closeC], [LE_, T.closeE], [LF_, T.closeF]]
const CPS = 28
export const LT = lineTimes(ALL_LINES, { cps: CPS })
const HOPS_YOU = talkHops(ALL_LINES, YOU, { cps: CPS }), HOPS_THEY = talkHops(ALL_LINES, THEY, { cps: CPS }), HOPS_STARS = talkHops(ALL_LINES, STARS, { cps: CPS })
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Distance is | just space. | *Effort* closes it.', chip: '+1 DEVOTION' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inAny = (t, rs) => rs.some(([a, b]) => t >= a && t < b)

// ── the cast and where they stand: key → [x, y, size]
const CAST = {
  you: { col: LEO.color, glyph: LEO.glyph, seed: 5 },
  they: { col: AQU.color, glyph: AQU.glyph, seed: 9 },
  sky: { col: STAR.sky, glyph: null, seed: 3, gold: true },
  pis: { col: PIS.color, glyph: PIS.glyph, seed: 47, back: true },
}
const ORDER = ['pis', 'sky', 'they', 'you']
const MAIN = { you: [215, 1190, 262], they: [862, 702, 232], pis: [935, 1808, 112] }
const LAY = {
  M: MAIN,
  G: { ...MAIN, sky: [880, 1160, 180] },
  TIE: { you: [150, 1650, 170], they: [930, 1650, 170], pis: [540, 1800, 100] },
}
const SEG = [
  { t: 0, L: LAY.M },
  { t: T.gIn, L: LAY.G, anim: 0.36 },
  { t: T.lesson - 0.1, L: LAY.M, anim: 0.3 },
  { t: T.tie, L: LAY.TIE, anim: 0.45 },
  { t: T.fin, L: LAY.M, anim: 0.45 },
]
function place(k, t) {
  let i = 0
  for (let j = 0; j < SEG.length; j++) if (t >= SEG[j].t) i = j
  const S = SEG[i], cur = S.L[k], stag = (CAST[k].seed % 7) * 0.02
  if (S.anim && i > 0) {
    const prev = SEG[i - 1].L[k], t0 = S.t + stag, p = prog(t, t0, t0 + S.anim)
    if (cur && prev) {
      const e = ease.inOutCubic(p)
      return { p: [lerp(prev[0], cur[0], e), lerp(prev[1], cur[1], e) - Math.sin(Math.PI * p) * 80, lerp(prev[2], cur[2], e)], pk: 1 }
    }
    if (cur) return { p: cur, pk: pop01(t, t0, 0.36, 2.2) }
    if (prev) { const o = popOut(t, [t0, t0 + 0.28]); return o > 0 ? { p: prev, pk: o } : null }
    return null
  }
  if (!cur) return null
  let pk = 1
  if (i === 0) pk = pop01(t, k === 'you' ? 0.25 : k === 'they' ? 0.42 : 1.0, 0.4, 1.7)
  return { p: cur, pk }
}

// the line between them (from just outside each star), and points along it
const lineEnds = t => {
  const a = (place('you', t) || { p: MAIN.you }).p, b = (place('they', t) || { p: MAIN.they }).p
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L
  return { x0: a[0] + ux * a[2] * 0.58, y0: a[1] + uy * a[2] * 0.58, x1: b[0] - ux * b[2] * 0.6, y1: b[1] - uy * b[2] * 0.6, ux, uy, nx: uy, ny: -ux, ang: Math.atan2(dy, dx) }
}
// n = (uy, −ux) points up-left of the line ("above" it)
const along = (E, u, off = 0) => [lerp(E.x0, E.x1, u) + E.nx * off, lerp(E.y0, E.y1, u) + E.ny * off]

// ── the traffic: where each message / attempt is along the line
const crawl = (t, t0, hop, rate) => hop * ease.outCubic(prog(t, t0, t0 + 0.4)) + rate * Math.max(0, t - t0 - 0.4)
function photon1U(t) { const u0 = crawl(T.ff1[0], T.send, 0.035, 0.012); return t < T.ff1[0] ? crawl(t, T.send, 0.035, 0.012) : lerp(u0, 1, ease.inCubic(prog(t, ...T.ff1))) }
function photon2V(t) { const v0 = crawl(T.ff2[0], T.send2, 0.035, 0.012); return t < T.ff2[0] ? crawl(t, T.send2, 0.035, 0.012) : lerp(v0, 1, ease.inCubic(prog(t, ...T.ff2))) }
const planeU = t => crawl(t, T.plane, 0.26, 0.004)
const pigeonU = t => crawl(t, T.pigeon, 0.1, 0.003)
const hiU = t => 0.05 * ease.outCubic(prog(t, T.yell, T.yell + 0.8)) + 0.001 * Math.max(0, t - T.yell - 0.8)

// status chips: [t0, t1, slot, label, value, valueColour, target(t) → [x, y]]
const SA = [600, 1300], SB = [430, 760]
const CHIPS = [
  [T.chip1, T.ff1[0], SA, 'DELIVERED IN:', '4 YEARS', PINK, t => along(lineEnds(t), photon1U(t))],
  [T.chip2, T.cut1, SB, 'ARRIVES:', '4 YEARS', PINK, t => along(lineEnds(t), 1 - photon2V(t))],
  [T.chip3, T.h5, SB, 'LANDED:', '4 BIRTHDAYS LATE', PINK, null],
  [T.chip4, T.chip5 - 0.06, SA, 'ETA:', '4 YEARS', PINK, t => along(lineEnds(t), planeU(t), -8)],
  [T.chip5, T.chip6 - 0.06, SA, 'ETA:', '4 YEARS', PINK, t => along(lineEnds(t), pigeonU(t), -86)],
  [T.chip6, T.cut2, SA, 'ETA:', 'NEVER', '#ff6f6f', t => along(lineEnds(t), hiU(t), 12)],
]
const FFS = [[T.ff1[0], T.ff1[1] + 0.1], [T.ff2[0], T.ff2[1] + 0.06], [T.ff3[0], T.ff3[1] + 0.05]]

async function build(stage) {
  try {
    await Promise.all(["800 124px Inter", "800 66px Inter", "italic 500 170px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, talkIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-2.png')])
  const BACK = bake(backIm, 420), TALK = bake(talkIm, 560)
  const BACK_BODY = 1320 / 1528, TALK_BODY = 610 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Long *distance.*', { top: 196, size: 118, accentSize: 158, fit: true, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD })
  const H0b = popText(root, 'Like, really long.', { top: 420, size: 66, at: T.h0b, gap: 0.1 })
  const H1 = popText(root, 'Message *sent.*', { top: 200, size: 120, accentSize: 168, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, '4 years *later.*', { top: 200, size: 120, accentSize: 168, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: LAV })
  const H3 = popText(root, '8 years *later.*', { top: 200, size: 120, accentSize: 168, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: LAV })
  const H4 = popText(root, 'Happy *birthday!*', { top: 200, size: 116, accentSize: 162, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: PINK })
  const H5 = popText(root, 'Plan B: *faster.*', { top: 200, size: 116, accentSize: 164, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: CYAN })
  const H6 = popText(root, 'Real *talk.*', { top: 200, size: 124, accentSize: 172, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: GOLD })
  const H7 = popText(root, 'Every night. | *Same time.*', { top: 178, size: 104, accentSize: 146, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: GOLD, lineHeight: 1.06 })
  const H8 = popText(root, 'Answers stay hidden | till you *both play.*', { top: 168, size: 82, accentSize: 112, at: T.h8, late: 2, lateAt: T.h8Land, wobble: true, accentColor: LAV, lineHeight: 1.12, fit: true })
  const H9 = popText(root, 'Same sky. | Same *time.* | Tonight.', { top: 178, size: 108, accentSize: 150, at: T.h9, gap: 0.16, late: 1, lateAt: T.h9Land, wobble: true, accentColor: GOLD, lineHeight: 1.04 })
  const HEADS = [[H0, T.h0Out], [H0b, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out], [H9, T.h9Out]]
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { lines, y: 1400, width: 960, height: 300, close, cps: CPS }))

  // ── the shared LESSON beat (on top of the scene and the type), then grain
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.58 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }

  // ─────────────────────────────── camera: a slow pull-out on the hook, a slow push through the turn
  function camK(t) {
    const a = lerp(1.09, 1, ease.outCubic(prog(t, 0, 2.2)))
    const b = 0.045 * ease.inOutCubic(prog(t, T.cut2, T.lesson)) * (1 - ease.inOutCubic(prog(t, T.lesson, T.lesson + 0.6)))
    return a + b
  }
  const CAMF = [540, 960]
  const camOn = t => { const k = camK(t); x.setTransform(k, 0, 0, k, CAMF[0] * (1 - k), CAMF[1] * (1 - k)) }
  const camOff = () => x.setTransform(1, 0, 0, 1, 0, 0)

  // ─────────────────────────────── the line: dotted (the distance) → gold (the ritual)
  function lineVis(t) {
    if (t < T.line[0]) return { dot: 0, gold: 0 }
    const draw = prog(t, ...T.line)
    const tieOut = 1 - prog(t, T.tie - 0.1, T.tie + 0.2), back = prog(t, ...T.gold2)
    const goldA = t < T.tie ? ease.outCubic(prog(t, ...T.gold)) : ease.outCubic(back)
    const k = t < T.tie ? tieOut : back
    return { draw: t < T.tie ? draw : back, dot: k * (1 - (t < T.tie ? goldA : 1)) * popOut(t, T.out), gold: (t < T.tie ? goldA * tieOut : goldA) * popOut(t, T.out), goldDraw: t < T.tie ? prog(t, ...T.gold) : back }
  }
  function drawLine(t) {
    const V = lineVis(t)
    if (!V.dot && !V.gold) return
    const E = lineEnds(t), L = Math.hypot(E.x1 - E.x0, E.y1 - E.y0)
    if (V.dot > 0) {
      x.save(); x.globalAlpha = V.dot
      const step = 26, off = (t * 9) % step
      for (let s = off; s < L * V.draw; s += step) {
        const [px, py] = [E.x0 + E.ux * s, E.y0 + E.uy * s]
        x.fillStyle = rgba(BONE, 0.62); x.fillRect(Math.round(px - 4), Math.round(py - 4), 8, 8)
      }
      // end ticks
      if (V.draw >= 1) for (const [ex, ey] of [[E.x0, E.y0], [E.x1, E.y1]]) { x.fillStyle = rgba(BONE, 0.8); for (let k = -3; k <= 3; k++) x.fillRect(Math.round(ex + E.nx * k * 6 - 3), Math.round(ey + E.ny * k * 6 - 3), 6, 6) }
      // the label, along the line
      const lp = pop01(t, T.ly, 0.36, 2.4)
      if (lp > 0 && t < T.tie) {
        const [mx, my] = along(E, 0.5, 52)
        x.translate(mx, my); x.rotate(E.ang); x.scale(lp, lp)
        x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const label = '◂ 4 LIGHT-YEARS ▸', tw = x.measureText(label).width + 40
        x.fillStyle = 'rgba(16,9,38,0.88)'; rr(-tw / 2, -27, tw, 54, 10); x.fill()
        x.lineWidth = 3; x.strokeStyle = rgba(GOLD, 0.85); x.stroke()
        x.fillStyle = GOLD; x.fillText(label, 0, 2)
      }
      x.restore()
    }
    if (V.gold > 0) {
      const d = clamp(V.goldDraw), ex = lerp(E.x0, E.x1, d), ey = lerp(E.y0, E.y1, d)
      x.save(); x.globalAlpha = V.gold; x.lineCap = 'round'
      x.shadowColor = rgba(GOLD, 0.9); x.shadowBlur = 30; x.strokeStyle = GOLD; x.lineWidth = 9
      x.beginPath(); x.moveTo(E.x0, E.y0); x.lineTo(ex, ey); x.stroke()
      x.shadowBlur = 0; x.strokeStyle = '#fff3c8'; x.lineWidth = 3; x.beginPath(); x.moveTo(E.x0, E.y0); x.lineTo(ex, ey); x.stroke()
      for (const u of [0.33, 0.66]) if (d >= u) { const [px, py] = along(E, u); drawPixelStar(x, px, py, 34 + 6 * Math.sin(t * 5 + u * 9), 2, '#fff3c8') }
      if (d > 0 && d < 1) drawPixelStar(x, ex, ey, 46, 2, '#ffffff')
      x.restore()
    }
  }

  // ─────────────────────────────── the traffic
  function photon(px, py, icon, t, { trail = [0, 0], alpha = 1, streak = 0 } = {}) {
    x.save(); x.globalAlpha = alpha
    // trail: fading pixel squares behind it
    for (let k = 1; k <= 7; k++) {
      x.globalAlpha = alpha * (0.5 - k * 0.06) * (1 + streak)
      const s = Math.max(3, 12 - k)
      x.fillStyle = k % 2 ? '#fff3c8' : LAV
      x.fillRect(Math.round(px - trail[0] * k * (14 + streak * 40) - s / 2), Math.round(py - trail[1] * k * (14 + streak * 40) - s / 2), s, s)
    }
    x.globalAlpha = alpha
    const g = x.createRadialGradient(px, py, 0, px, py, 70)
    g.addColorStop(0, 'rgba(255,243,200,0.65)'); g.addColorStop(0.35, 'rgba(201,166,255,0.25)'); g.addColorStop(1, 'rgba(201,166,255,0)')
    x.fillStyle = g; x.fillRect(px - 70, py - 70, 140, 140)
    x.fillStyle = 'rgba(20,12,44,0.9)'; x.beginPath(); x.arc(px, py, 27, 0, Math.PI * 2); x.fill()
    x.lineWidth = 4; x.strokeStyle = '#fff3c8'; x.stroke()
    drawBitmap(x, ICON[icon], px, py, 5, ICON_PAL)
    // a tiny twinkle on the rim
    const tw = 0.5 + 0.5 * Math.sin(t * 7)
    x.fillStyle = `rgba(255,255,255,${tw})`; x.fillRect(Math.round(px + 18), Math.round(py - 24), 5, 5)
    x.restore()
  }
  function burst(t, cx, cy, t0, n, R, seed, dur = 0.7, size = 28, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.4 + 0.8 * p), cy + Math.sin(a) * R * (0.4 + 0.8 * p) * 0.85, size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function confetti(t, cx, cy, t0, dur = 1.4) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const cols = [PINK, CYAN, GOLD, MINT, LAV]
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < 26; i++) {
      const a = -Math.PI / 2 + (i / 26 - 0.5) * 2.6, v = 380 + (i * 53) % 260
      const px = cx + Math.cos(a) * v * tt, py = cy + Math.sin(a) * v * tt + 520 * tt * tt
      x.fillStyle = cols[i % 5]; const s = 8 + (i % 3) * 3
      x.save(); x.translate(px, py); x.rotate(tt * (6 + i % 5)); x.fillRect(-s / 2, -s / 4, s, s / 2); x.restore()
    }
    x.restore()
  }
  function drawTraffic(t) {
    const E = lineEnds(t), dir = [E.ux, E.uy], back = [-E.ux, -E.uy]
    // goodnight: the bubble squishes into a photon
    if (t >= T.bubble && t < T.send + 0.25) {
      const p = pop01(t, T.bubble, 0.34, 2.2), s = 1 - ease.inBack ? 1 - ease.inCubic(prog(t, T.send - 0.02, T.send + 0.2)) : 1
      const bx = lerp(250, E.x0, ease.inCubic(prog(t, T.send - 0.02, T.send + 0.2))), by = lerp(995, E.y0, ease.inCubic(prog(t, T.send - 0.02, T.send + 0.2)))
      const k = p * s
      if (k > 0.02) {
        x.save(); x.translate(bx, by); x.scale(k, k)
        x.fillStyle = 'rgba(239,230,214,0.96)'; rr(-150, -44, 300, 88, 22); x.fill()
        x.beginPath(); x.moveTo(-40, 40); x.lineTo(-62, 74); x.lineTo(-10, 42); x.fill()
        x.fillStyle = INK; x.font = `700 38px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('goodnight', -126, 2)
        drawBitmap(x, ICON.moon, 100, 0, 6, { ...ICON_PAL, M: '#7a54c8', m: '#a98be8' })
        x.restore()
      }
    }
    // photon 1 (☾): crawls, fast-forwards, lands on THEIR STAR
    if (t >= T.send && t < T.arr1) {
      const ff = prog(t, ...T.ff1)
      const [px, py] = along(E, photon1U(t))
      photon(px, py, 'moon', t, { trail: dir, streak: ff > 0 && ff < 1 ? ff : 0, alpha: pop01(t, T.send, 0.25, 2) })
    }
    burst(t, E.x1, E.y1, T.arr1, 12, 150, 0.4, 0.6, 26)
    // photon 2 (♥): THEIR STAR → you
    if (t >= T.send2 && t < T.arr2) {
      const ff = prog(t, ...T.ff2)
      const [px, py] = along(E, 1 - photon2V(t))
      photon(px, py, 'heart', t, { trail: back, streak: ff > 0 && ff < 1 ? ff : 0, alpha: pop01(t, T.send2, 0.25, 2) })
    }
    burst(t, E.x1, E.y1, T.send2, 8, 110, 1.2, 0.45, 20)
    burst(t, E.x0, E.y0, T.arr2, 12, 160, 0.9, 0.6, 26, [PINK, BONE, GOLD])
    // photon 3 (cake): already most of the way (sent 4 years ago), lands on THEIR STAR
    if (t >= T.ff3[0] && t < T.arr3) {
      const p = prog(t, ...T.ff3), [px, py] = along(E, lerp(0.5, 1, ease.inCubic(p)))
      photon(px, py, 'cake', t, { trail: dir, streak: p, alpha: clamp(p * 6) })
    }
    confetti(t, E.x1 + E.ux * 60, E.y1 + E.uy * 60 - 40, T.arr3)
    // the attempts (they all stay stuck on the line until the cut)
    if (t >= T.plane && t < T.cut2) {
      const u = planeU(t), [px, py] = along(E, u, -8), dr = clamp((t - T.plane - 0.6) / 2.5)
      const bob = Math.sin(t * 3) * 4 * (1 - dr)
      drawPlane(x, px, py + bob, 7, E.ang, dr)
      if (t < T.plane + 0.5) burst(t, px, py, T.plane, 6, 70, 0.2, 0.4, 16, [BONE])
    }
    if (t >= T.pigeon && t < T.cut2) {
      const u = pigeonU(t), [px, py] = along(E, u, -86)
      drawPigeon(x, px, py + Math.sin(t * 8) * 5, 6, t)
    }
    if (t >= T.yell && t < T.cut2) {
      const u = hiU(t), [px, py] = along(E, u, 12), k = prog(t, T.yell, T.yell + 0.8)
      const size = lerp(84, 30, ease.outCubic(k))
      x.save(); x.font = `700 ${Math.round(size)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const word = 'HIIIIII', cw = size * 0.62
      for (let i = 0; i < word.length; i++) {
        const ft = T.hiFall[0] + (word.length - 1 - i) * ((T.hiFall[1] - T.hiFall[0]) / word.length), fp = Math.max(0, t - ft)
        const lx = px + (i - (word.length - 1) / 2) * cw * Math.cos(E.ang), ly = py + (i - (word.length - 1) / 2) * cw * Math.sin(E.ang) + 900 * fp * fp + Math.sin(t * 30 + i) * (k < 1 ? 3 : 1)
        x.save(); x.globalAlpha = 1 - clamp(fp * 1.4); x.translate(lx, ly); x.rotate(E.ang + fp * 4 * (i % 2 ? 1 : -1))
        x.fillStyle = INK; x.fillText(word[i], 3, 3); x.fillStyle = '#ffffff'; x.fillText(word[i], 0, 0)
        x.restore()
      }
      x.restore()
    }
  }

  // ─────────────────────────────── chips (status readouts) + the fast-forward HUD
  function chip(cx, cy, label, value, vcol, k, alpha = 1) {
    x.save(); x.globalAlpha = alpha
    x.font = `700 32px ${MONO}`
    const lw = x.measureText(label + ' ').width, vw = x.measureText(value).width, w = lw + vw + 56, h = 66
    x.translate(cx, cy); x.scale(k, k); x.rotate(-0.02)
    const P = 6, stp = (o, col) => { x.fillStyle = col; x.fillRect(-w / 2 + o + 2 * P, -h / 2 + o, w - 2 * o - 4 * P, h - 2 * o); x.fillRect(-w / 2 + o, -h / 2 + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); x.fillRect(-w / 2 + o + P, -h / 2 + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
    x.save(); x.shadowColor = rgba(vcol, 0.6); x.shadowBlur = 24; stp(0, vcol); x.restore()
    stp(P, INK); stp(P * 1.6, 'rgba(18,10,40,0.97)')
    x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillStyle = BONE; x.fillText(label, -w / 2 + 28, 3)
    x.fillStyle = vcol; x.fillText(value, -w / 2 + 28 + lw, 3)
    x.restore()
  }
  function drawChips(t) {
    for (const [t0, t1, [cx, cy], label, value, vcol, target] of CHIPS) {
      if (t < t0 || t >= t1) continue
      const k = pop01(t, t0, 0.3, 2.6), o = 1 - prog(t, t1 - 0.12, t1)
      if (target) {
        const [tx, ty] = target(t), d = Math.hypot(tx - cx, ty - cy), n = Math.floor(d / 18)
        x.save(); x.globalAlpha = 0.55 * clamp(k) * o; x.fillStyle = vcol
        for (let i = 2; i < n - 2; i++) { const f = i / n; if (f * d > 46) x.fillRect(Math.round(lerp(cx, tx, f) - 3), Math.round(lerp(cy, ty, f) - 3), 6, 6) }
        x.restore()
      }
      chip(cx, cy, label, value, vcol, k, o)
    }
  }
  function drawFF(t) {
    const on = FFS.find(([a, b]) => t >= a && t < b)
    if (!on) return
    const blink = Math.floor((t - on[0]) * 6) % 2 === 0
    // VHS: a rolling bright band + faint scanlines
    const bandY = ((t - on[0]) * 2600) % 2200 - 140
    x.save()
    x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(0, bandY, W, 90)
    x.fillStyle = 'rgba(0,0,0,0.12)'; for (let yy = 0; yy < H; yy += 6) x.fillRect(0, yy, W, 2)
    if (blink) {
      x.fillStyle = BONE; x.shadowColor = 'rgba(0,0,0,0.8)'; x.shadowBlur = 8
      const X0 = 84, Y0 = 466
      for (const ox of [0, 30]) { x.beginPath(); x.moveTo(X0 + ox, Y0); x.lineTo(X0 + ox + 30, Y0 + 20); x.lineTo(X0 + ox, Y0 + 40); x.fill() }
      x.font = `700 34px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('FAST-FORWARD', X0 + 80, Y0 + 21)
    }
    x.restore()
  }

  // ─────────────────────────────── ritual clocks
  function clockChip(cx, cy, k) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 30px ${MONO}`; const w = x.measureText('10:00 PM').width + 74
    x.fillStyle = 'rgba(18,10,40,0.94)'; rr(-w / 2, -28, w, 56, 12); x.fill(); x.lineWidth = 3; x.strokeStyle = GOLD; x.stroke()
    // a little pixel clock face
    x.fillStyle = GOLD; x.beginPath(); x.arc(-w / 2 + 30, 0, 14, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.fillRect(-w / 2 + 28, -10, 4, 12); x.fillRect(-w / 2 + 28, -2, 10, 4)
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('10:00 PM', -w / 2 + 54, 2)
    x.restore()
  }

  // ─────────────────────────────── the tie-in: a talk card, two face-down answers, one flip
  function cardImg(img, body, cx, cy, wBody, rot = 0, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / body, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function answerFace(cx, cy, w, sx, stampK, rot = 0, alpha = 1) {
    const h = w * 1.52
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
    x.save(); x.shadowColor = 'rgba(242,199,92,0.5)'; x.shadowBlur = 30
    rr(-w / 2, -h / 2, w, h, 20); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2e1c62'); g.addColorStop(1, '#130a2e'); x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 6; x.strokeStyle = GOLD; rr(-w / 2, -h / 2, w, h, 20); x.stroke()
    x.lineWidth = 2; x.strokeStyle = 'rgba(242,199,92,0.55)'; rr(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 10); x.stroke()
    x.fillStyle = GOLD; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('A N S W E R', 0, -h / 2 + 42)
    x.fillStyle = BONE; x.font = `italic 500 50px ${SERIF}`
    ;['Night', 'owl.'].forEach((s, i) => x.fillText(s, 0, -h / 2 + 128 + i * 54))
    drawBitmap(x, ICON.moon, 0, -h / 2 + 222, 4, ICON_PAL)
    if (stampK > 0) {
      const k = easeOutBack(clamp(stampK), 2.6)
      x.save(); x.translate(0, h / 2 - 58); x.rotate(-0.18); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#46cf82'; x.beginPath(); x.arc(0, 0, 35, 0, Math.PI * 2); x.fill()
      x.strokeStyle = '#ffffff'; x.lineWidth = 10; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(-16, 2); x.lineTo(-4, 14); x.lineTo(18, -13); x.stroke()
      x.restore()
    }
    x.restore()
  }
  const TALK_AT = { x: 540, y: 790, w: 270 }, ANS = [{ x: 345, y: 1290, from: 'you', tp: T.playA, rot: -0.05 }, { x: 735, y: 1290, from: 'they', tp: T.playB, rot: 0.05 }], ANS_W = 196
  function drawTie(t) {
    if (t < T.talk[0] || t >= T.cardsOut[1]) return
    const o = ease.inCubic(prog(t, ...T.cardsOut))
    // halo + the talk card
    const tp = easeOutBack(prog(t, ...T.talk), 1.6)
    const g = x.createRadialGradient(TALK_AT.x, TALK_AT.y, 0, TALK_AT.x, TALK_AT.y, 480)
    g.addColorStop(0, rgba(LAV, 0.28 * clamp(tp) * (1 - o))); g.addColorStop(1, rgba(LAV, 0)); x.fillStyle = g; x.fillRect(TALK_AT.x - 480, TALK_AT.y - 480, 960, 960)
    cardImg(TALK, TALK_BODY, TALK_AT.x, TALK_AT.y - o * 700, TALK_AT.w * tp, (1 - clamp(tp)) * -0.4, 1, clamp(tp * 3) * (1 - o))
    // the answers: slide from each star, face-down; tremble; flip together; stamp
    ANS.forEach((C, i) => {
      if (t < C.tp) return
      const S0 = LAY.TIE[C.from], p = prog(t, C.tp, C.tp + 0.36), e = ease.outCubic(p)
      const roll = prog(t, ...T.roll), jit = roll > 0 && roll < 1 ? 2 + roll * 6 : 0
      const cx = lerp(S0[0], C.x, e) + jit * Math.sin(t * 61 + i * 2), cy = lerp(S0[1] - 60, C.y, e) - Math.sin(Math.PI * p) * 80 + o * 900
      const rot = lerp(i ? 0.8 : -0.8, C.rot, e)
      const f = prog(t, T.flip, T.flip + 0.22), sx = Math.cos(f * Math.PI)
      if (sx > 0) cardImg(BACK, BACK_BODY, cx, cy, ANS_W, rot, sx, clamp(p * 4))
      else answerFace(cx, cy, ANS_W, -sx, prog(t, T.flip + 0.3 + i * 0.1, T.flip + 0.55 + i * 0.1), rot)
      if (f > 0.5 && f < 1) burst(t, cx, cy, T.flip + 0.1, 10, 190, 1 + i, 0.7, 24)
    })
  }

  // ─────────────────────────────── the cast: moods, reactions, props
  const shineK = t => Math.max(...[...T.shine, T.shine3].map(s => pulse(t, s - 0.04, 0.5)))
  function hopsFor(k) {
    const st = (CAST[k].seed % 5) * 0.03
    const h = [T.flip + 0.3 + st, T.lesson + 0.1 + st, T.h9Land + st]
    if (k === 'you') h.push(...HOPS_YOU, T.bubble, T.send, T.arr2 + 0.02, T.plane, T.pigeon, ...T.shine, T.shine3)
    if (k === 'they') h.push(...HOPS_THEY, T.arr1 + 0.02, T.send2, T.arr3 + 0.05, ...T.shine, T.shine3)
    if (k === 'sky') h.push(...HOPS_STARS)
    if (k === 'pis') h.push(T.arr2 + 0.3, T.gold[0] + 0.2)
    return h
  }
  const HOPS = Object.fromEntries(Object.keys(CAST).map(k => [k, hopsFor(k)]))
  const AT_THEY = [1, -1], AT_YOU = [-1, 1]

  function stateOf(k, t) {
    let mood = 'neutral', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0, glow = 1
    const sh = shineK(t)
    if (k === 'you') {
      if (t < T.send) { mood = t < T.bubble ? 'heart' : 'happy'; look = AT_THEY }
      else if (t < T.chip1) { mood = 'happy'; look = AT_THEY }
      else if (t < T.ff1[0]) {
        if (t < T.dbl[0] + 0.12) { mood = 'neutral'; look = [1, 1] }
        else if (t < T.dbl[1]) { mood = 'neutral'; look = [0, 0] }
        else { mood = 'wide'; look = [0, 0]; blink = false; const kk = t - T.dbl[1]; squash = 0.2 * Math.exp(-kk * 6) * Math.cos(kk * 22) }
        if (t >= T.dbl[0] + 0.12 && t < T.dbl[1]) { mood = 'neutral'; look = [1, 1] }
      } else if (t < T.cut1) { mood = 'sleepy'; look = [0, 0] }
      else if (t < T.arr2) { mood = 'sleepy' }
      else if (t < T.h4) {
        const kk = t - T.arr2
        mood = kk < 0.35 ? 'wide' : t < LT[2].done + 0.3 ? 'sparkle' : 'heart'; look = [0, 0]; blink = kk < 0.35 ? false : undefined
        squash = -0.28 * Math.exp(-kk * 5) * Math.cos(kk * 20)
      } else if (t < T.h5) {
        mood = t < T.chip3 ? 'happy' : 'squint'; look = AT_THEY
        if (t >= T.chip3 && t < T.chip3 + 0.5) look = [1, 1]
      } else if (t < T.cut2) {
        mood = 'happy'; look = AT_THEY
        if (t >= T.chip4 && t < T.pigeon) { mood = 'neutral'; look = [1, 1] }
        if (t >= T.chip5 && t < T.inhale[0]) { mood = 'eyeroll' }
        if (t >= T.inhale[0] && t < T.yell) { mood = 'wide'; squash = -0.2 * ease.inOutCubic(prog(t, ...T.inhale)); look = AT_THEY; blink = false }
        if (t >= T.yell && t < T.chip6) { mood = 'squint'; squash = 0.3 * (1 - 0.3 * prog(t, T.yell, T.chip6)); dx = Math.sin(t * 90) * 5; look = AT_THEY }
        if (t >= T.chip6) { mood = 'neutral'; look = [1, 1]; squash = 0.1 * ease.outCubic(prog(t, T.chip6, T.chip6 + 0.4)) }
        if (t >= T.lE) { mood = 'neutral'; look = [1, 0] }
        if (t >= T.hiFall[0]) { mood = 'neutral'; look = [1, 1] }
        if (t >= LT[3].done + 0.2) { mood = 'squint'; look = [1, 0] }
      } else if (t < T.h7) {
        mood = 'neutral'; look = [1, 0]
        if (t >= T.lF2 + 0.5) mood = 'sparkle'
      } else if (t < T.lesson) { mood = t < T.shine[0] ? 'happy' : 'heart'; look = AT_THEY }
      else if (t < T.tie) { mood = 'sparkle'; look = [1, -1] }
      else if (t < T.fin) { mood = t < T.flip + 0.25 ? 'neutral' : 'heart'; look = t < T.flip ? [1, -1] : [1, -1] }
      else { mood = t < T.shine3 - 0.1 ? 'happy' : 'heart'; look = AT_THEY }
    } else if (k === 'they') {
      if (t < T.send + 0.6) { mood = t < T.bubble ? 'heart' : 'happy'; look = AT_YOU }
      else if (t < T.arr1) { mood = 'sleepy' }
      else if (t < T.cut1) {
        const kk = t - T.arr1
        mood = kk < 0.32 ? 'wide' : 'happy'; look = kk < 0.32 ? [0, 0] : AT_YOU; blink = kk < 0.32 ? false : undefined
        squash = -0.26 * Math.exp(-kk * 5) * Math.cos(kk * 20)
        if (t >= T.chip2) { mood = 'wide'; look = [-1, 1] }
        if (t >= T.chip2 + 0.6) { mood = 'sleepy' }
      } else if (t < T.arr3) { mood = 'sleepy' }
      else if (t < T.h5) {
        const kk = t - T.arr3
        mood = kk < 0.3 ? 'wide' : 'happy'; look = [0, 0]; squash = -0.22 * Math.exp(-kk * 5) * Math.cos(kk * 20)
        if (t >= T.chip3) { mood = 'squint'; look = [-1, 1] }
        if (t >= T.chip3 + 0.7) { mood = 'squint'; look = [0, 0] }
      } else if (t < T.cut2) {
        mood = 'neutral'; look = AT_YOU
        if (t >= T.chip5 && t < T.inhale[0]) mood = 'eyeroll'
        if (t >= T.yell && t < T.chip6 + 0.6) { mood = 'neutral'; look = AT_YOU }
        if (t >= T.lE) look = [0, 1]
      } else if (t < T.h7) { mood = 'neutral'; look = [0, 1]; if (t >= T.lF2 + 0.5) mood = 'sparkle' }
      else if (t < T.lesson) { mood = t < T.shine[0] ? 'happy' : 'heart'; look = AT_YOU }
      else if (t < T.tie) { mood = 'sparkle'; look = [-1, -1] }
      else if (t < T.fin) { mood = t < T.flip + 0.25 ? 'neutral' : 'heart'; look = [-1, -1] }
      else { mood = t < T.shine3 - 0.1 ? 'happy' : 'heart'; look = AT_YOU }
    } else if (k === 'sky') {
      mood = 'squint'; look = [-1, 0]
      if (t >= LT[3].done + 0.3) { mood = 'neutral'; look = [0, 0] }
      if (t >= T.cut2) { mood = 'neutral'; look = [0, 0] }
      if (t >= T.lF2) { mood = 'happy' }
      if (t >= T.h7) { mood = 'sparkle'; look = [-1, -1] }
    } else if (k === 'pis') {
      look = [-1, -1]
      if (inAny(t, [[T.dbl[1], T.ff1[0]]])) { mood = 'squint'; tears = 0.6 }
      if (inAny(t, [[T.sob1, T.h4]])) { mood = 'happy'; tears = 0.85 }
      if (inAny(t, [[T.sob2, T.inhale[1]]])) { mood = 'squint'; tears = 1; squash = 0.06 * Math.abs(Math.sin(t * 10)); dy = -Math.abs(Math.sin(t * 10)) * 6 }
      if (inAny(t, [[T.gold[0] + 0.15, T.lesson + 0.5]])) { mood = 'happy'; tears = 0.8 }
      if (inAny(t, [[T.flip + 0.3, T.cardsOut[1]]])) { mood = 'happy'; tears = 0.7 }
      if (t >= T.lesson + 0.5 && t < T.flip + 0.3) look = [0, -1]
    }
    if ((k === 'you' || k === 'they') && sh > 0) { glow = 1 + 1.2 * sh; squash -= 0.12 * sh }
    return { mood, look, blink, squash, dx, dy, tears, glow }
  }

  function rays(cx, cy, S, k, t) {
    if (k <= 0.01) return
    x.save(); x.globalAlpha = k; x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6 + t * 0.4, len = S * (0.7 + 0.35 * k) * (i % 2 ? 0.7 : 1)
      for (let s = 0; s < 5; s++) {
        const d = S * 0.48 + (len - S * 0.48) * s / 5, c = Math.max(4, Math.round(S / 30))
        x.fillStyle = s < 2 ? '#fff3c8' : GOLD
        x.fillRect(Math.round(cx + Math.cos(a) * d - c / 2), Math.round(cy + Math.sin(a) * d - c / 2), c, c)
      }
    }
    x.restore()
  }

  function drawActor(k, t, ok) {
    const P = place(k, t)
    if (!P) return
    const p = P.p, pk = P.pk * ok
    if (pk <= 0.02) return
    const C = CAST[k], st = stateOf(k, t)
    const sh = (k === 'you' || k === 'they') ? shineK(t) : 0
    if (sh > 0) rays(p[0], p[1], p[2], sh, t)
    const R = drawStarChar(x, p[0] + st.dx, p[1] + st.dy, p[2], t, { color: C.col, glyph: p[2] >= 110 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: (C.gold ? 1.1 : 0.9) * st.glow, bob: k === 'you' && t >= T.cut1 && t < T.arr2 ? 0 : undefined, alpha: C.back ? 0.92 : 1 })
    const S = R.size
    // 8 years later: cobwebs + a spider + dust on YOUR STAR (until the heart lands, then it all flies off)
    if (k === 'you' && t >= T.cut1 - 0.02 && t < T.arr2 + 1.2) {
      const f = Math.max(0, t - T.arr2), a = 1 - clamp(f / 1.0), drop = 600 * f * f
      drawCobweb(x, R.x - S * 0.19, R.y - S * 0.1 + drop, S * 0.36, -Math.PI * 0.98, -Math.PI * 0.62, a)
      drawCobweb(x, R.x + S * 0.19, R.y - S * 0.1 + drop * 1.2, S * 0.34, -Math.PI * 0.4, -Math.PI * 0.03, a)
      drawCobweb(x, R.x - S * 0.12, R.y + S * 0.3 + drop * 0.8, S * 0.22, Math.PI * 0.55, Math.PI * 0.95, a)
      drawSpider(x, R.x + S * 0.36, R.y - S * 0.04 + drop, S * 0.18 + 10 * Math.sin(t * 1.3), Math.max(3, S / 60), t, a)
      if (f <= 0) {
        x.save(); x.globalAlpha = 0.42; x.fillStyle = '#b8ac98'
        for (let i = 0; i < 40; i++) { const u = ((i * 37) % 100) / 100 - 0.5, v = ((i * 61) % 100) / 100 - 0.5; if (Math.abs(u) + Math.abs(v) < 0.5) x.fillRect(Math.round(R.x + u * S * 0.8), Math.round(R.y + v * S * 0.8), 6, 6) }
        x.restore()
      }
      // dust puff on the wake
      const dt = t - T.arr2
      if (dt >= 0 && dt < 0.8) {
        x.save(); x.globalAlpha = 0.7 * (1 - dt / 0.8); x.fillStyle = '#cfc4b0'
        for (let i = 0; i < 18; i++) { const a2 = i / 18 * Math.PI * 2, d = S * (0.4 + 0.7 * ease.outCubic(dt / 0.8)); const s = 10 + (i % 3) * 5; x.fillRect(Math.round(R.x + Math.cos(a2) * d - s / 2), Math.round(R.y + Math.sin(a2) * d * 0.7 - s / 2), s, s) }
        x.restore()
      }
    }
    // the party hat, four years late
    if (k === 'they' && t >= T.arr3 && t < T.cut2) {
      const hp = easeOutBack(prog(t, T.arr3, T.arr3 + 0.32), 2.6)
      drawPartyHat(x, R.x + S * 0.03, R.top + S * 0.12, Math.max(3, Math.round(S / 24)) * hp, 0.22 + 0.05 * Math.sin(t * 3))
    }
    if (st.tears > 0) {
      const ey = R.y + S * 0.07, exo = S * 0.17
      drawTears(x, [[R.x - exo, ey], [R.x + exo, ey]], t, 0, { cell: Math.max(4, S / 22), strength: st.tears })
    }
  }
  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    for (const k of ORDER) drawActor(k, t, ok)
  }

  // ─────────────────────────────── the sky
  function drawWorld(t) {
    let ffdx = 0
    for (const [a, b] of FFS) ffdx += 900 * ease.inOutCubic(prog(t, a, b))
    drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * camK(t), dx: -ffdx * 0.3, dy: ffdx * 0.22, dim: SKY_H.dim * 1.05 })
    // a soft warm pool behind each star (the two "homes")
    for (const [k, col] of [['you', LEO.color], ['they', AQU.color]]) {
      const P = place(k, t); if (!P) continue
      const g = x.createRadialGradient(P.p[0], P.p[1], 0, P.p[0], P.p[1], P.p[2] * 1.6)
      g.addColorStop(0, rgba(col, 0.16 * P.pk)); g.addColorStop(1, rgba(col, 0)); x.fillStyle = g; x.fillRect(P.p[0] - P.p[2] * 1.6, P.p[1] - P.p[2] * 1.6, P.p[2] * 3.2, P.p[2] * 3.2)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawWorld(t)
      if (t < T.out[1] + 0.02) {
        camOn(t)
        drawLine(t)
        drawTraffic(t)
        drawCast(t)
        if (t >= T.clocks && t < T.lesson) {
          const k = pop01(t, T.clocks, 0.3, 2.4) * (1 - prog(t, T.lesson - 0.2, T.lesson)), A0 = place('you', t), B0 = place('they', t)
          if (A0) clockChip(A0.p[0] - 50, A0.p[1] - A0.p[2] * 0.8, k)
          if (B0) clockChip(B0.p[0], B0.p[1] - B0.p[2] * 0.66 - 44, pop01(t, T.clocks + 0.12, 0.3, 2.4) * (1 - prog(t, T.lesson - 0.2, T.lesson)))
        }
        drawChips(t)
        camOff()
        drawTie(t)
        burst(t, 540, 960, T.h9Land, 12, 420, 0.3, 0.8, 26)
      }
      drawFF(t)
      for (const b of boxes) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps the 2nd + 4th: 11.71 flip and 25.6 deal). The others stay inert:
// 7.27 (sent → 4 years later, a fast-forward), 17.82 (birthday → plan B), 35.9 (lesson → tie-in).
export const CUTS = [T.ff1[0], { t: T.cut1, kind: 'flip' }, BEAT(31), { t: T.cut2, kind: 'deal' }, 35.9]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine; written in the D-major palette)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const chirp = (t0, gain = 0.014) => [0, 1, 2].map(i => ['pop', r3(t0 + i * 0.045), 4186, gain, 0.4])
const sob = (t0, gain = 0.022) => [['pop', r3(t0), 659.25, gain, 0.4], ['pop', r3(t0 + 0.11), 587.33, gain * 0.9, 0.4], ['pop', r3(t0 + 0.22), 493.88, gain * 0.8, 0.4]]
const womp = (t0, gain = 0.04) => [['pluck', r3(t0), 440, gain, 0.5, 0], ['pluck', r3(t0 + 0.2), 415.3, gain, 0.5, 0], ['pluck', r3(t0 + 0.4), 392, gain * 1.1, 1.1, 0]]
const stamp = t0 => [['boom', r3(t0), 0.06], ['tick', r3(t0), 0.07], ['pop', r3(t0 + 0.01), 220, 0.04, 0]]
const ding = (t0, f = 1318.51) => [['bell', r3(t0), f, 0.035, 1.4, 0], ['pop', r3(t0), f, 0.035, 0], ['glitter', r3(t0), r3(t0 + 0.4)]]
const ffwd = ([a, b]) => [['riser', r3(a), r3(b), 0.035], ...Array.from({ length: Math.round((b - a) / 0.05) }, (_, i) => ['tick', r3(a + i * 0.05), 0.02])]
const roll = (a, b) => { const n = Math.round((b - a) / 0.028); return Array.from({ length: n }, (_, i) => ['tick', r3(a + i * 0.028), 0.012 + 0.03 * (i / n)]) }
const PITCH = { [YOU]: 739.99, [THEY]: 987.77, [STARS]: 880 }

export const CUES = [
  // 1 · the hook: a long, long way
  ...head(T.h0, 1, T.h0Land, 2), ...wordPops(T.h0b, 3, 0.1, 4, 0.02),
  ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.line[0] + i * 0.1), 0.025]),
  ['pop', T.ly, 880, 0.04, 0], ['pluck', T.ly, 1318.51, 0.03, 0.8, 0],
  // 2 · goodnight → the photon crawls → DELIVERED IN: 4 YEARS
  ['pop', T.bubble, 1174.66, 0.035, -0.3], ['pop', r3(T.bubble + 0.07), 1479.98, 0.03, -0.3],
  ['whoosh', r3(T.send - 0.05), 0.35, 0.05], ['pop', T.send, 880, 0.04, -0.2], ['pop', r3(T.send + 0.06), 1760, 0.03, -0.2],
  ...head(T.h1, 1, T.h1Land, 0),
  ...stamp(T.chip1), ...womp(r3(T.chip1 + 0.15)),
  ['whoosh', T.dbl[0], 0.12, 0.04], ['pop', T.dbl[1], 1174.66, 0.04, 0], ['bell', r3(T.dbl[1] + 0.02), 1318.51, 0.02, 0.6, 0],
  ...T.crick.flatMap(c => [...chirp(c), ...chirp(r3(c + 0.22), 0.011)]),
  ...sob(r3(T.dbl[1] + 0.2), 0.016),
  // 3 · 4 years later: fast-forward, the landing, the reply
  ...ffwd(T.ff1), ...head(T.h2, 1, T.h2Land, 3), ...ding(T.arr1),
  ['pop', r3(T.lB - 0.2), 987.77, 0.03, 0.3],
  ['whoosh', r3(T.send2 - 0.05), 0.3, 0.04], ['pop', T.send2, 1318.51, 0.035, 0.3], ['pop', r3(T.send2 + 0.06), 987.77, 0.03, 0.3],
  ...stamp(T.chip2), ...womp(r3(T.chip2 + 0.15), 0.034),
  // 4 · 8 years later: cobwebs; the heart lands; the webs fly off
  ...ffwd(T.ff2), ...head(T.h3, 1, T.h3Land, 4), ...ding(T.arr2, 1567.98),
  ['whoosh', r3(T.arr2 + 0.05), 0.4, 0.05], ['boom', r3(T.arr2 + 0.02), 0.08],
  ...sob(T.sob1, 0.02), ...sob(r3(T.sob1 + 0.55), 0.018),
  // 5 · happy birthday (4 birthdays late)
  ...ffwd(T.ff3), ...head(T.h4, 1, T.h4Land, 1),
  ...ding(T.arr3, 1174.66), ['pop', r3(T.arr3 + 0.04), 1760, 0.03, 0.3], ['whoosh', r3(T.arr3 + 0.02), 0.5, 0.045],
  ...[0, 1, 2, 3, 4].map(i => ['pop', r3(T.arr3 + 0.08 + i * 0.05), NOTE[(i * 2) % 7], 0.022, (i % 2 ? 0.4 : -0.4)]),
  ...stamp(T.chip3), ...[880, 830.61, 783.99, 739.99, 698.46].map((f, i) => ['pop', r3(T.chip3 + 0.2 + i * 0.07), f * 0.5, 0.03, 0.3]),   // a party horn deflating
  // 6 · plan B: faster. the plane, the pigeon, Pisces, the yell (silence), ETA: NEVER
  ...head(T.h5, 2, T.h5Land, 2),
  ['whoosh', T.plane, 0.5, 0.06], ['pop', T.plane, 1174.66, 0.03, -0.3],
  ...stamp(T.chip4), ...womp(r3(T.chip4 + 0.15), 0.032),
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.pigeon + i * 0.07), 0.03]),
  ['pop', r3(T.pigeon + 0.25), 330, 0.035, 0.2], ['pop', r3(T.pigeon + 0.42), 294, 0.03, 0.2],          // coo-coo
  ...stamp(T.chip5), ['whoosh', r3(T.chip5 + 0.12), 0.25, 0.035], ['pop', r3(T.chip5 + 0.15), 392, 0.025, -0.3], ['pop', r3(T.chip5 + 0.3), 349.23, 0.025, 0.3],
  ...sob(T.sob2, 0.026), ...sob(r3(T.sob2 + 0.33), 0.024),
  ['riser', T.inhale[0], T.yell, 0.04],
  ['tapeStop', r3(T.yell - 0.02), 0.45],                                                                   // the yell: nothing. (space)
  ...chirp(r3(T.yell + 0.35)), ...chirp(r3(T.yell + 0.57), 0.011),
  ...stamp(T.chip6), ['pluck', r3(T.chip6 + 0.15), 293.66, 0.04, 1.2, 0],
  ['whoosh', r3(T.gIn + 0.05), 0.3, 0.04], ['pop', r3(T.gIn + 0.2), 880, 0.03, 0.3],
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['pop', r3(T.hiFall[0] + i * (T.hiFall[1] - T.hiFall[0]) / 7 + 0.1), 784 - i * 60, 0.016, 0.1]),
  // 7 · real talk; the ritual: 10:00 PM, shine, shine, the gold line
  ...head(T.h6, 1, T.h6Land, 0),
  ...head(T.h7, 2, T.h7Land, 3),
  ['pop', T.clocks, 1318.51, 0.03, -0.3], ['pop', r3(T.clocks + 0.12), 1318.51, 0.03, 0.3],
  ...T.shine.flatMap((s, i) => [['bell', s, NOTE[i ? 5 : 3], 0.035, 1.6, -0.3], ['bell', r3(s + 0.01), NOTE[i ? 6 : 4], 0.03, 1.6, 0.3], ['glitter', s, r3(s + 0.35)]]),
  ['whoosh', T.gold[0], 0.5, 0.04], ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['pluck', r3(T.gold[0] + 0.05 + i * 0.08), f, 0.03, 1.2, (i - 1.5) * 0.2]),
  // 8 · LESSON UNLOCKED
  ...roll(T.lesson - 0.6, T.lesson - 0.04),
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Db' }),
  ['whoosh', T.lessonOut[0], 0.35, 0.03],
  // 9 · talk cards: both play, both flip
  ...head(T.h8, 3, T.h8Land, 1),
  ['whoosh', T.talk[0], 0.3, 0.04], ['bell', r3(T.talk[0] + 0.25), 1318.51, 0.025, 1.0, 0],
  ['tick', r3(T.playA + 0.3), 0.05], ['tick', r3(T.playB + 0.3), 0.05],
  ...roll(...T.roll),
  ['pop', T.flip, 1174.66, 0.045, -0.2], ['pop', r3(T.flip + 0.02), 1174.66, 0.045, 0.2], ['bell', r3(T.flip + 0.05), 1567.98, 0.035, 1.4, 0], ['glitter', T.flip, r3(T.flip + 0.6)],
  ['pop', r3(T.flip + 0.3), 1318.51, 0.035, -0.3], ['pop', r3(T.flip + 0.4), 1760, 0.035, 0.3],
  ['whoosh', T.cardsOut[0], 0.3, 0.035],
  // 10 · the last line
  ...wordPops(T.h9, 4, 0.16, 1, 0.022), ['pop', T.h9Land, 1174.66, 0.045, 0], ['pluck', T.h9Land, 880, 0.04, 0.8, 0], ['glitter', T.h9Land, r3(T.h9Land + 0.5)],
  ['whoosh', T.gold2[0], 0.4, 0.03], ['bell', T.shine3, 1174.66, 0.03, 1.6, -0.2], ['bell', r3(T.shine3 + 0.01), 1479.98, 0.026, 1.6, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export { LESSON }
