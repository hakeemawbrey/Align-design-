// hxnewinhtx: STAR MAIL, Houston letters. "Just moved to Houston. I know nobody." (30 s vertical, music: pop)
// Story 0–25.6, then the shared end card. The show look lives in ./mail.js (identical in every Pack F film).
//   0.00–8.6   "“Just moved to Houston. | I know *nobody.*”"  Frame 0: the headline is up, the envelope is mid-flight,
//              THE STARS (gold quill) watch it land. The seal pops, the letter unfolds (drop 2.82) and writes on:
//              "Dear Stars, Just moved here for work. My plant is my only friend. How do people *meet* people??
//              — a Cancer, new in town". ♓ Pisces peeks over the corner and sniffles.
//   8.6–13.8   "Big city. | *Empty* calendar."  ♋ Cancer sits in a moving box beside its plant, under a blank pixel
//              calendar. ♐ Sagittarius: "go to EVERYTHING. tonight!" (the calendar floods with red X's) · ♉ Taurus:
//              "or… stay in with the plant?" (it wipes clean) · "EVERY. THING." · "the plant needs you!". THE STARS:
//              "both of you. *sit down.*"
//  13.9        the one card cut.
//  14.0–22.4   "Say *yes* | to one thing."  The calendar again: one gold star sticker lands per week, row by row.
//              THE STARS: "one *yes* a week. that's it." → "a market. a class. a *bayou* walk." Tonight's deck (three
//              blind cards, face down) slides in: "and tonight's deck counts too." ♋ Cancer climbs out of the box:
//              "ok. one. *this* week." Rewatch bait: the plant sprouts a new leaf with every gold star.
//  22.4–25.5   "One *yes* a week."  The letter comes back, a talk card ("What made you move here?") lands on it and
//              the wax seal THUNKs. Pisces fountains. Everything pops out by 25.5.
// One canvas (sky + props + stars), DOM type + dialogue box + bug, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, MONO, INTER, BEAT, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  buildBug, makeLetter, penAt, drawLetter, drawEnvelope, drawSeal, drawQuill, LW,
  speech, drawTalkCard,
} from './mail.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const CAN = signStar('cancer'), SAG = signStar('sagittarius'), TAU = signStar('taurus'), PIS = signStar('pisces')

// ── the timeline
const T = {
  bug: -1, h0: -1, h0Land: -0.3, h0Out: [8.45, 8.65],
  envFly: [-0.3, 0.45], sealPop: 0.9, flap: [1.0, 1.3], rise: [1.3, 1.76], envDrop: [1.7, 2.1], unfold: [1.9, 2.72],
  narIn: -1, pisPeek: [2.9, 3.3], gasp: 5.6,
  letterOut: [8.45, 8.8],
  h1: 8.75, h1Out: [13.55, 13.75],
  b2In: 8.8, say: [9.05, 9.85, 10.65, 11.2], sit: 12.3, b2Out: [13.4, 13.75],
  cut: 13.9,
  h2: 14.0, h2Out: [22.25, 22.45],
  calIn: 14.1, stick: [15.0, 15.6, 16.2, 16.8], deck: [18.4, 18.9], climb: 20.0, go: 21.3,
  h3: 22.5, letterBack: [22.4, 22.8], card: [22.7, 23.05], seal: 23.35,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE STARS', CSP = `${CAN.glyph}︎ CANCER`
const LINES = [
  { t: 11.75, speaker: SPEAK, text: 'both of you. *sit down.*' },
  { t: 14.35, speaker: SPEAK, text: "one *yes* a week. that's it." },
  { t: 16.3, speaker: SPEAK, text: 'a market. a class. a *bayou* walk.' },
  { t: 18.45, speaker: SPEAK, text: "and tonight's *deck* counts too." },
  { t: 20.45, speaker: CSP, color: '#cfe0ff', text: 'ok. one. *this* week.' },
]
const CPS = 30
const BOX1 = { open: 11.55, close: 13.7 }, BOX2 = { open: 14.15, close: 22.8 }

const LETTER = [
  { text: 'Dear Stars,', t: BEAT(4) + 0.03, d: 0.45 },
  { text: 'Just moved here for work.', t: 3.3, d: 0.8 },
  { text: 'My plant is my only friend.', t: 4.15, d: 0.8 },
  { text: 'How do people *meet*', t: 5.0, d: 0.6 },
  { text: 'people??', t: 5.65, d: 0.4 },
  { text: '— a Cancer, new in town', t: 6.6, d: 0.85, size: 48, align: 'right', y: 128 + 5 * 84 + 22 },
]
const L_AT = { cx: 540, cy: 905 }

// layout
const NAR_A = { x: 150, y: 1250, s: 200 }, NAR_B = { x: 150, y: 1300, s: 140 }
const CAL = { cx: 540, top: 470, cw: 70, gap: 8, cols: 7, rows: 4 }
const SAG_A = { x: 190, y: 960, s: 180 }, TAU_A = { x: 895, y: 960, s: 180 }
const BOXA = { x: 540, y: 1170 }, BOXB = { x: 330, y: 1180 }
const DECK = { x: 790, y: 1150 }
const CARD = { cx: 556, cy: 940, w: 380 }

const NAR_HOPS = [0.2, ...talkHops(LINES, SPEAK, { cps: CPS })]
const CAN_HOPS = [T.b2In + 0.3, T.sit + 0.1, ...T.stick.map(s => s + 0.05), T.climb, T.climb + 0.35, ...talkHops(LINES, CSP, { cps: CPS }), T.go, T.seal + 0.05]
const SAG_HOPS = [T.b2In + 0.25, T.say[0], T.say[0] + 0.3, T.say[2], T.say[2] + 0.25, T.say[2] + 0.5]
const TAU_HOPS = [T.b2In + 0.4, T.say[1], T.say[3], T.sit]

// calendar marks: a red X per cell (Sagittarius) in a scrambled order
const XORDER = Array.from({ length: 28 }, (_, i) => (i * 11) % 28)
const STICK = [{ c: 2, r: 0 }, { c: 5, r: 1 }, { c: 1, r: 2 }, { c: 4, r: 3 }]
const POT = ['.TTTTTT.', 'TTTTTTTT', '.tTTTTt.', '.tTTTTt.', '..tttt..']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 19px 'EB Garamond'", "italic 500 15px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 16px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const L = makeLetter({ lines: LETTER })

  const H0 = popText(root, '“Just moved | to Houston. | I know *nobody.”*', { top: 160, size: 88, accentSize: 136, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: '#8fb8ff' })
  const H1 = popText(root, 'Big city. | *Empty* calendar.', { top: 178, size: 104, accentSize: 140, at: T.h1, gap: 0.1, accentColor: '#ff8f8f' })
  const H2 = popText(root, 'Say *yes* | to one thing.', { top: 178, size: 108, accentSize: 150, at: T.h2, gap: 0.12, accentColor: GOLD })
  const H3 = popText(root, 'One *yes* | a week.', { top: 172, size: 116, accentSize: 160, at: T.h3, gap: 0.12, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const tag = (txt, col) => el('div', { position: 'absolute', left: '0px', top: '0px', width: '320px', textAlign: 'center', font: `700 26px ${MONO}`, letterSpacing: '0.12em', color: col, textShadow: '0 2px 8px rgba(6,4,18,0.95)', display: 'none' }, root, txt)
  const tagSag = tag(`${SAG.glyph}︎ SAGITTARIUS`, '#ffb38a'), tagTau = tag(`${TAU.glyph}︎ TAURUS`, '#9fe6b0')
  const bug = buildBug(root, { at: T.bug })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── pieces
  function envelope(t, behind) {
    const fly = ease.outCubic(prog(t, ...T.envFly)), drop = ease.inCubic(prog(t, ...T.envDrop))
    if (drop >= 1) return
    const cx = lerp(1060, 540, fly), cy = lerp(1500, 1000, fly) + drop * 760
    const rot = lerp(0.55, -0.03, fly) + drop * 0.25 + (fly < 1 ? 0 : 0.015 * Math.sin(t * 5))
    const seal = 1 - prog(t, T.sealPop, T.sealPop + 0.1)
    drawEnvelope(x, cx, cy, lerp(0.62, 1, fly), { flap: prog(t, ...T.flap), seal, rot, alpha: 1 - drop * 0.6, behind })
  }
  function letterPose(t) {
    if (t < T.rise[0]) return null
    const r = ease.outCubic(prog(t, ...T.rise))
    let cx = 540, cy = lerp(1010, L_AT.cy, r), s = lerp(0.62, 1, ease.inOutCubic(prog(t, T.rise[1] - 0.1, T.unfold[1]))), rot = 0, alpha = 1
    const o = ease.inCubic(prog(t, ...T.letterOut))
    if (o > 0 && t < T.letterBack[0]) { cy += o * 700; s *= 1 - 0.45 * o; rot = 0.2 * o; alpha = 1 - o }
    if (t >= T.letterBack[0]) {
      const b = easeOutBack(prog(t, ...T.letterBack), 1.3)
      cx = 520; cy = lerp(1700, 930, b); s = 0.6; rot = -0.07; alpha = clamp(b * 3) * popOut(t, T.out)
    }
    return { cx, cy, s, rot, alpha, unfold: prog(t, ...T.unfold) }
  }
  function pisces(t, P, tears, mood = 'wide', look = [-1, 0]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops }
    if (opts.pop <= 0.01) return
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
  }
  function narrator(t) {
    if (t >= T.out[1]) return
    const k = pop01(t, T.narIn, 0.38, 2.1) * popOut(t, T.out)
    if (k <= 0.02) return
    const m = ease.inOutCubic(prog(t, T.cut - 0.12, T.cut + 0.05))
    const fin = ease.inOutCubic(prog(t, T.h2Out[0], T.h2Out[1] + 0.1))
    const P = { x: lerp(NAR_A.x, NAR_B.x, m), y: lerp(NAR_A.y, NAR_B.y, m), s: lerp(NAR_A.s, NAR_B.s, m) }
    if (fin > 0) { P.x = lerp(P.x, 540, fin); P.y = lerp(P.y, 1530, fin); P.s = lerp(P.s, 150, fin) }
    let look = [0.6, -0.8], mood = 'neutral'
    if (t < T.rise[0]) { mood = 'wide'; look = [1, -0.4] }
    const lp = letterPose(t), pen = penAt(L, t)
    if (pen && lp) { const wx = lp.cx + (pen.x - LW / 2) * lp.s; look = [clamp((wx - P.x) / 380, -1, 1), -0.9] }
    if (t > T.gasp && t < T.letterOut[0]) { mood = 'sparkle'; look = [0.8, -1] }
    if (t > T.letterOut[0] && t < T.say[0]) mood = 'squint'
    if (t > T.say[0] && t < LINES[0].t) { mood = 'wide'; look = undefined }
    if (t > LINES[0].t && t < T.cut) { mood = 'squint'; look = [1, -0.5] }
    if (t > T.cut) { mood = 'happy'; look = undefined }
    if (t > T.seal) mood = 'sparkle'
    drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood, look, hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05, blink: mood === 'wide' ? false : undefined })
    const F = starFrame(P.x, P.y, P.s, t, { pop: k, hops: NAR_HOPS, seed: 2 })
    const wig = t < T.letterOut[0] ? 0.08 * Math.sin(t * 9) : 0.04 * Math.sin(t * 2)
    drawQuill(x, F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.12, F.cell * 1.05, 0.55 + wig, clamp(k))
  }

  // the blank pixel calendar (no dates on it: just weeks). xs: how many red X's · sticks: gold stars landed
  function calendar(t, k, { xs = 0, sticks = [] } = {}) {
    if (k <= 0.01) return
    const { cx, top, cw, gap, cols, rows } = CAL, W2 = cols * (cw + gap) + gap, H2 = 70 + rows * (cw + gap) + gap
    x.save(); x.translate(cx, top + H2 / 2); x.scale(k, k); x.translate(-W2 / 2, -H2 / 2)
    x.fillStyle = INK; x.fillRect(-8, -8, W2 + 16, H2 + 16)
    x.fillStyle = BONE; x.fillRect(0, 0, W2, H2)
    x.fillStyle = '#e0505e'; x.fillRect(0, 0, W2, 62)
    x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MY CALENDAR', W2 / 2, 33)
    x.fillStyle = INK; x.fillRect(W2 * 0.2, -22, 12, 34); x.fillRect(W2 * 0.8 - 12, -22, 12, 34)
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const X = gap + c * (cw + gap), Y = 70 + gap + r * (cw + gap)
      x.fillStyle = '#d8ccb4'; x.fillRect(X, Y, cw, cw); x.fillStyle = '#f7efe0'; x.fillRect(X + 3, Y + 3, cw - 6, cw - 6)
      const idx = XORDER.indexOf(r * cols + c)
      if (idx < xs) { x.fillStyle = '#d8283c'; for (let i = 0; i < 6; i++) { x.fillRect(X + 12 + i * 8, Y + 12 + i * 8, 10, 10); x.fillRect(X + cw - 22 - i * 8, Y + 12 + i * 8, 10, 10) } }
    }
    for (const s of sticks) {
      const X = gap + s.c * (cw + gap) + cw / 2, Y = 70 + gap + s.r * (cw + gap) + cw / 2
      x.save(); x.translate(X, Y); x.scale(s.k, s.k); x.rotate(s.k < 1 ? (1 - s.k) * 0.8 : -0.1)
      drawBits(x, ['...G...', '..GGG..', 'GGGGGGG', '.GGGGG.', '..GGG..', '.GG.GG.', 'GG...GG'], { G: GOLD }, 0, 0, 9)
      x.restore()
    }
    x.restore()
  }

  // the moving box (Cancer sits in it), the plant (leaves = 1 + gold stars so far)
  function movingBox(t, X, Y, k, front) {
    if (k <= 0.01) return
    x.save(); x.translate(X, Y); x.scale(k, k)
    if (!front) { x.fillStyle = INK; x.fillRect(-150, -120, 300, 16); x.fillStyle = '#9c6a3a'; x.fillRect(-146, -116, 292, 10); x.restore(); return }
    x.fillStyle = INK; x.fillRect(-156, -110, 312, 200)
    x.fillStyle = '#c48a4f'; x.fillRect(-150, -104, 300, 188)
    x.fillStyle = '#d9a466'; x.fillRect(-150, -104, 300, 14)
    x.fillStyle = '#e8d49a'; x.fillRect(-30, -104, 60, 188)
    // flaps flopping open
    x.fillStyle = INK; x.save(); x.rotate(-0.35); x.fillRect(-196, -140, 110, 34); x.fillStyle = '#b77d44'; x.fillRect(-192, -136, 102, 26); x.restore()
    x.save(); x.rotate(0.35); x.fillStyle = INK; x.fillRect(86, -140, 110, 34); x.fillStyle = '#b77d44'; x.fillRect(90, -136, 102, 26); x.restore()
    x.fillStyle = '#5a3a1e'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRAGILE', -92, 20); x.fillText('ME', 92, 20)
    x.restore()
  }
  function plant(t, X, Y, k, leaves) {
    if (k <= 0.01) return
    x.save(); x.translate(X, Y); x.scale(k, k)
    const sway = Math.sin(t * 2) * 0.06
    const LV = [[-0.6, 70], [0.55, 80], [-0.15, 100], [0.9, 62], [-1.0, 58]]
    const n = Math.min(LV.length, Math.ceil(leaves - 1e-6))
    for (let i = 0; i < n; i++) {
      const [a, len] = LV[i], g = i === n - 1 ? 1 - (n - leaves) : 1
      x.save(); x.rotate(a + sway); const L2 = Math.max(6, len * g)
      x.fillStyle = INK; x.fillRect(-10, -L2 - 6, 20, L2 + 6)
      x.fillStyle = '#4fbf6a'; x.fillRect(-6, -L2, 12, L2); x.fillStyle = '#8fe39a'; x.fillRect(-6, -L2, 4, L2 * 0.7)
      x.restore()
    }
    drawBits(x, POT, { T: '#d0663a', t: '#a84a2a' }, 0, 22, 10)
    x.restore()
  }
  function deck(t, k, X, Y) {
    if (k <= 0.01) return
    x.save(); x.translate(X, Y); x.scale(k, k)
    for (let i = 0; i < 3; i++) {
      const a = (i - 1) * 0.22, hover = i === 1 && t > T.climb + 0.6 ? -14 - 6 * Math.sin(t * 5) : 0
      x.save(); x.rotate(a); x.translate((i - 1) * 46, hover)
      x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-52, -70, 112, 156)
      x.fillStyle = INK; x.fillRect(-60, -84, 120, 168)
      x.fillStyle = GOLD; x.fillRect(-56, -80, 112, 160)
      x.fillStyle = '#2a1a5e'; x.fillRect(-50, -74, 100, 148)
      x.strokeStyle = 'rgba(242,199,92,0.8)'; x.lineWidth = 3
      for (const [ox, oy] of [[0, 0], [0, -16], [0, 16], [14, -8], [-14, -8], [14, 8], [-14, 8]]) { x.beginPath(); x.arc(ox, oy - 8, 16, 0, Math.PI * 2); x.stroke() }
      x.fillStyle = GOLD; x.font = `700 15px ${MONO}`; x.textAlign = 'center'; x.fillText('?', 0, 52)
      x.restore()
    }
    x.fillStyle = GOLD; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText("TONIGHT'S DECK", 0, 128)
    x.restore()
  }

  function cancer(t, X, Y, s, mood, look, k) {
    drawStarChar(x, X, Y, s, t, { color: CAN.color, glyph: CAN.glyph, mood, look, hops: CAN_HOPS, pop: k, seed: 4, glow: 1.05 })
  }

  // beat 2: the empty calendar + the argument
  function argue(t) {
    if (t < T.b2In || t > T.b2Out[1]) return
    const ok = outK(t, T.b2Out)
    let xs = 0
    if (t > T.say[0]) xs = Math.floor(28 * clamp((t - T.say[0]) / 0.7))
    if (t > T.say[1]) xs = Math.floor(28 * (1 - clamp((t - T.say[1]) / 0.4)))
    if (t > T.say[2]) xs = Math.floor(28 * clamp((t - T.say[2]) / 0.35))
    if (t > T.say[3]) xs = Math.floor(28 * (1 - clamp((t - T.say[3]) / 0.3)))
    calendar(t, pop01(t, T.b2In, 0.35, 2) * ok, { xs })
    const bk = pop01(t, T.b2In + 0.1, 0.35, 2) * ok
    movingBox(t, BOXA.x, BOXA.y, bk, false)
    const cm = t > T.sit ? 'happy' : t > T.say[0] ? 'wide' : 'neutral'
    cancer(t, BOXA.x, BOXA.y - 160, 200, cm, t > T.say[0] && t < T.sit ? [Math.sin(t * 3) > 0 ? -1 : 1, 0] : [0.6, 0.6], bk)
    movingBox(t, BOXA.x, BOXA.y, bk, true)
    plant(t, BOXA.x + 210, BOXA.y + 30, bk * 0.9, 1)
    const sk = pop01(t, T.b2In + 0.2, 0.35, 2) * ok, tk = pop01(t, T.b2In + 0.35, 0.35, 2) * ok
    const sitK = ease.inOutCubic(prog(t, T.sit, T.sit + 0.3))
    drawStarChar(x, SAG_A.x, SAG_A.y + sitK * 30, SAG_A.s, t, { color: SAG.color, glyph: SAG.glyph, mood: t > T.sit ? 'squint' : 'sparkle', look: [1, -0.3], hops: SAG_HOPS, pop: sk, seed: 7, glow: 1.1, squash: sitK * 0.15 })
    drawStarChar(x, TAU_A.x, TAU_A.y + sitK * 30, TAU_A.s, t, { color: TAU.color, glyph: TAU.glyph, mood: t > T.sit ? 'squint' : 'sleepy', zzz: false, look: [-1, 0], hops: TAU_HOPS, pop: tk, seed: 9, glow: 1.05, squash: sitK * 0.15 })
    const sayL = ['go to EVERYTHING. tonight!', 'or… stay in with the plant?', 'EVERY. THING.', 'the plant needs you!']
    T.say.forEach((s0, i) => speech(x, t, i % 2 ? 750 : 330, 870, s0, sayL[i], { life: (T.say[i + 1] ?? T.sit) - s0 - 0.02, col: i % 2 ? '#d4f5dc' : '#ffd9c4', tail: i % 2 ? 0.5 : -0.5, size: 34 }))
    pisces(t, { x: 960, y: 1290, s: 110, pop: pop01(t, T.b2In + 0.8, 0.3, 2) * ok }, 2, 'wide', [-1, -0.5])
  }

  // beat 3: one gold star a week, tonight's deck, out of the box
  function answer(t) {
    if (t < T.h2 || t > T.h2Out[1] + 0.2) return
    const ok = outK(t, [T.h2Out[0] - 0.05, T.h2Out[1] + 0.15])
    const sticks = STICK.map((s, i) => ({ ...s, k: easeOutBack(prog(t, T.stick[i], T.stick[i] + 0.3), 2.2) })).filter(s => s.k > 0)
    calendar(t, pop01(t, T.calIn, 0.35, 2) * ok, { sticks })
    for (let i = 0; i < 4; i++) {
      const s = STICK[i], X = CAL.cx - (CAL.cols * (CAL.cw + CAL.gap) + CAL.gap) / 2 + CAL.gap + s.c * (CAL.cw + CAL.gap) + CAL.cw / 2
      sparkles(x, t, X, CAL.top + 70 + CAL.gap + s.r * (CAL.cw + CAL.gap) + CAL.cw / 2, T.stick[i] + 0.1, 6, 60, i, [GOLD, BONE])
    }
    const leaves = 1 + T.stick.reduce((a, s) => a + clamp((t - s - 0.15) / 0.3), 0)
    const bk = pop01(t, T.h2 + 0.15, 0.35, 2) * ok
    const climb = ease.inOutCubic(prog(t, T.climb, T.climb + 0.5))
    movingBox(t, BOXB.x, BOXB.y, bk, false)
    const cm = t > T.go ? 'sparkle' : t > T.climb ? 'happy' : t > T.stick[0] ? 'wide' : 'neutral'
    cancer(t, BOXB.x + climb * 150, BOXB.y - 160 + climb * 40, 200, cm, t < T.climb ? [0.6, -1] : [1, 0], bk)
    movingBox(t, BOXB.x, BOXB.y, bk * (1 - 0.25 * climb), true)
    plant(t, 560 + 0 * climb, BOXB.y + 40, bk * 0.9, leaves)
    deck(t, pop01(t, T.deck[0], 0.4, 2) * ok, DECK.x, DECK.y)
    if (t > T.go) sparkles(x, t, DECK.x, DECK.y - 30, T.go, 10, 140, 2, [GOLD, BONE, '#8fb8ff'])
    pisces(t, { x: 955, y: 820, s: 105, pop: pop01(t, T.h2 + 1, 0.3, 2) * ok }, t > T.go ? 3 : 1, 'sparkle', [-1, 0.5])
  }

  function talkCard(t) {
    if (t < T.card[0]) return
    const k = easeOutBack(prog(t, ...T.card), 1.4), ok = popOut(t, T.out)
    if (ok <= 0) return
    drawTalkCard(x, lerp(1300, CARD.cx, k), lerp(700, CARD.cy, k), CARD.w * ok, { q: 'What made you move here?', rot: lerp(0.8, 0.06, k), icon: 'star' })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      const dtS = t - T.seal, shake = dtS > 0 && dtS < 0.4 ? 14 * Math.exp(-dtS * 10) * Math.sin(dtS * 55) : 0
      drawSky(x, t, base)
      x.save(); x.translate(0, shake)
      if (t < T.out[1] + 0.02) {
        const glowA = 0.5 * popOut(t, T.out)
        if (glowA > 0) { const g = x.createRadialGradient(540, 930, 0, 540, 930, 620); g.addColorStop(0, `rgba(255,214,150,${0.2 * glowA})`); g.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1300) }
        const lp = letterPose(t)
        const peek = ease.outBack(prog(t, ...T.pisPeek))
        if (t < T.letterOut[1] && peek > 0.01) pisces(t, { x: 852, y: lerp(600, 448, peek), s: 150, alpha: 1 - prog(t, ...T.letterOut) }, t > T.gasp ? 2 : t > 3.9 ? 1 : 0, t > T.gasp ? 'wide' : 'sparkle', [-1, 1])
        envelope(t, true)
        if (lp && t < T.letterBack[0]) drawLetter(x, t, L, lp)
        envelope(t, false)
        argue(t)
        answer(t)
        if (lp && t >= T.letterBack[0]) drawLetter(x, t, L, lp)
        talkCard(t)
        if (t > T.letterBack[0]) pisces(t, { x: 900, y: 560, s: 140, pop: pop01(t, T.letterBack[0] + 0.1, 0.3, 2) * popOut(t, T.out) }, t > T.seal ? 3 : 2, t > T.seal ? 'happy' : 'wide', [-1, 1])
        drawSeal(x, CARD.cx, CARD.cy + 238, 150, t, T.seal, { alpha: popOut(t, T.out) })
        sparkles(x, t, CARD.cx, CARD.cy + 238, T.seal + 0.02, 12, 150, 1, [GOLD, '#8fb8ff', BONE])
        narrator(t)
      }
      x.restore()
      const lk = pop01(t, T.b2In + 0.35, 0.3, 2) * outK(t, T.b2Out)
      for (const [e, P] of [[tagSag, SAG_A], [tagTau, TAU_A]]) {
        const on = lk > 0.01 && t > T.b2In && t < T.b2Out[1]
        e.style.display = on ? 'block' : 'none'
        if (on) { e.style.left = Math.min(1080 - 340, Math.max(20, P.x - 160)) + 'px'; e.style.top = (P.y + 120) + 'px'; e.style.opacity = String(clamp(lk)); e.style.transform = `scale(${lk.toFixed(3)})` }
      }
      box1.update(t); box2.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.9, between the argument and the answer)
const CUTS = [8.65, { t: T.cut }, 22.45]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const scribble = (t0, d, gain = 0.011) => Array.from({ length: Math.floor(d / 0.085) }, (_, i) => ['tick', +(t0 + i * 0.085 + (i % 3) * 0.012).toFixed(3), gain * (0.7 + 0.3 * ((i * 7) % 3) / 2)])
export const CUES = [
  ['pop', 0.02, 1174.66, 0.04, 0], ['whoosh', 0.0, 0.4, 0.04], ['tick', T.envFly[1], 0.05],
  ['pop', T.sealPop, 1318.51, 0.05, 0], ['pop', T.sealPop + 0.05, 1760, 0.03, 0.2], ['glitter', T.sealPop, T.sealPop + 0.3],
  ['tick', T.flap[0] + 0.05, 0.04], ['whoosh', T.rise[0], 0.4, 0.035], ['whoosh', T.envDrop[0], 0.35, 0.025],
  ['tick', T.unfold[0] + 0.15, 0.045], ['tick', T.unfold[0] + 0.6, 0.045],
  ...LETTER.flatMap(l => scribble(l.t, l.d)),
  ['pop', T.pisPeek[0] + 0.15, 987.77, 0.025, 0.4], ['pluck', T.gasp + 0.05, 659.25, 0.03, 0.5, 0.4],
  // the empty calendar + the argument (X's flood in, wipe out, flood, wipe)
  ['whoosh', T.b2In, 0.4, 0.035], ...wordPops(T.h1, 4, 0.1, 2, 0.022), ['tom', T.b2In + 0.15, 130, { gain: 0.12, decay: 0.2 }],
  ...T.say.map((s, i) => ['pop', s, i % 2 ? 739.99 : 1318.51, 0.045, i % 2 ? 0.4 : -0.4]),
  ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.say[0] + 0.05 + i * 0.08).toFixed(3), 0.03]), ['whoosh', T.say[1] + 0.05, 0.3, 0.03],
  ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.say[2] + 0.05 + i * 0.055).toFixed(3), 0.035]), ['whoosh', T.say[3] + 0.05, 0.3, 0.03],
  ['tom', T.sit, 98, { gain: 0.16, decay: 0.2 }], ['tom', T.sit + 0.05, 92, { gain: 0.14, decay: 0.2 }],
  ...talkCues(LINES, { cps: CPS }),
  // one gold star a week
  ...wordPops(T.h2, 5, 0.1, 1, 0.024), ['pop', T.calIn + 0.05, 880, 0.035, 0],
  ...T.stick.map((s, i) => ['bell', s + 0.1, [1174.66, 1318.51, 1479.98, 1760][i], 0.03, 0.8, (i - 1.5) * 0.2]),
  ['whoosh', T.deck[0], 0.4, 0.03], ['tick', T.deck[0] + 0.3, 0.04], ['tick', T.deck[0] + 0.38, 0.04], ['tick', T.deck[0] + 0.46, 0.04],
  ['pop', T.climb, 659.25, 0.04, -0.2], ['pop', T.climb + 0.35, 987.77, 0.04, 0], ['pluck', T.go, 1174.66, 0.045, 0.5, 0.2], ['glitter', T.go, T.go + 0.4],
  // the seal
  ['whoosh', T.letterBack[0], 0.4, 0.035], ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ...wordPops(T.h3, 4, 0.12, 0, 0.03),
  ['boom', T.seal, 0.3], ['tom', T.seal, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.seal, 0.07], ['bell', T.seal + 0.08, 1760, 0.03, 1.2, 0], ['glitter', T.seal + 0.05, T.seal + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
