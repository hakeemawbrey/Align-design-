// sxmail3: STAR MAIL No. 3, "Is it too soon to say I like them?" (30 s vertical, Star Talk Shows §2, music: lofi · Gm)
// Story 0–25.6, then the shared end card. The show look lives in ./mail.js (identical in sxmail1–4).
//   0.00–8.6   "“Is it too soon to | say I *like* them?”"  The STAR MAIL bug pops; the envelope flies in, the seal pops,
//              the letter rises and unfolds (drop 2.82) and writes on: "Dear Stars, It's been 3 dates. I really like
//              them. Is it too soon to say so? Is there a rule?  — a Virgo in a quiet college town". THE STARS read
//              along with the gold quill; ♓ Pisces peeks over the corner.
//   8.6–13.8   "The *committee* | has notes."  A stopwatch, a calendar and a rulebook pop up with angry little eyes and
//              argue: "TOO SOON. wait a month!" → "date FIVE. minimum." → "rule 47: never go first." They bump and
//              shout over each other; Pisces sobs. THE STARS (quill as a gavel): "order! *order* in the sky."
//  13.9        card cut.
//  14.0–22.4   "No clock | on *honesty.*"  ♍ and the ♌ date. The committee, shrunk, mutters in the back. THE STARS:
//              "there's no clock on honesty." POOF: the committee bursts into sparkles. The Virgo, shaking: "I… like
//              spending time with you." THE STARS: "that's never too soon. promise." ♌ LEO: "same!! I was waiting
//              for you." Heart-eyes, blush, Pisces fountains.
//  22.4–25.5   "Too soon? | *Never* heard of her."  The letter comes back and the wax seal THUNKs onto it.
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
  GOLD, BONE, INK, INTER, BEAT, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  buildBug, makeLetter, penAt, drawLetter, drawEnvelope, drawSeal, drawQuill, LW,
} from './mail.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const VIR = signStar('virgo'), LEO = signStar('leo'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.12, h0Out: [8.45, 8.65],
  envFly: [0.15, 0.62], sealPop: 0.98, flap: [1.08, 1.38], rise: [1.38, 1.84], envDrop: [1.78, 2.2], unfold: [1.98, 2.78],
  narIn: 2.1, pisPeek: [2.9, 3.3], gasp: 5.85,
  letterOut: [8.45, 8.8],
  h1: 8.75, h1Out: [13.55, 13.75],
  comIn: [8.8, 9.0, 9.2], say: [9.3, 10.1, 10.9], brawl: [11.6, 13.3], gavel: [11.05, 11.5, 11.95], comOut: [13.45, 13.75],
  cut: 13.9,
  h2: 14.0, h2Out: [22.25, 22.45],
  duoIn: 14.02, poof: 15.6, confess: 16.2, leoHeart: 20.55, blush: 20.8,
  h3: 22.5, letterBack: [22.4, 22.8], seal: 23.35,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE STARS', LSP = `${LEO.glyph}︎ LEO`
const LINES = [
  { t: 11.2, speaker: SPEAK, text: 'order! *order* in the sky.' },
  { t: 14.3, speaker: SPEAK, text: "there's no clock on *honesty.*" },
  { t: 17.6, speaker: SPEAK, text: "that's never *too soon.* promise." },
  { t: 20.4, speaker: LSP, color: '#ffc27a', text: 'same!! I was *waiting* for you.' },
]
const CPS = 30
const BOX1 = { open: 11.0, close: 13.75 }, BOX2 = { open: 14.1, close: 23.1 }

const LETTER = [
  { text: 'Dear Stars,', t: BEAT(4) + 0.03, d: 0.45 },
  { text: "It's been *3 dates.* I really", t: 3.35, d: 0.85 },
  { text: 'like them. Is it too soon', t: 4.25, d: 0.8 },
  { text: 'to say so? Is there a rule?', t: 5.1, d: 0.8 },
  { text: "I don't want to scare them.", t: 5.95, d: 0.8 },
  { text: '— a Virgo in a quiet college town', t: 6.85, d: 0.95, size: 46, align: 'right', y: 128 + 5 * 84 + 22 },
]
const L_AT = { cx: 540, cy: 905 }

// layout
const NAR_A = { x: 150, y: 1250, s: 200 }, NAR_B = { x: 540, y: 1300, s: 150 }
const VIR_A = { x: 300, y: 900, s: 250 }, LEO_A = { x: 780, y: 900, s: 250 }
const VIR_B = { x: 165, y: 1250, s: 190 }, LEO_B = { x: 915, y: 1250, s: 190 }
const LB = { cx: 540, cy: 930, s: 0.66, rot: -0.05 }
const SEAL_AT = { x: 740, y: 1135 }
// the committee: big (the argument) → small, muttering behind the duo (the answer)
const COM_A = [{ x: 250, y: 870 }, { x: 560, y: 1080 }, { x: 840, y: 850 }]
const COM_B = [{ x: 400, y: 1150 }, { x: 540, y: 1180 }, { x: 680, y: 1150 }]

const NAR_HOPS = [T.narIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS }), ...T.gavel]
const LEO_HOPS = [T.duoIn + 0.3, ...talkHops(LINES, LSP, { cps: CPS }), T.seal + 0.05]
const VIR_HOPS = [T.duoIn + 0.2, T.confess, T.blush, T.seal + 0.08]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 19px 'EB Garamond'", "italic 500 15px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const L = makeLetter({ lines: LETTER })

  const H0 = popText(root, '“Is it too soon to | say I *like* them?”', { top: 172, size: 88, accentSize: 122, at: T.h0, gap: 0.08, accentColor: VIR.color })
  const H1 = popText(root, 'The *committee* | has notes.', { top: 178, size: 104, accentSize: 140, at: T.h1, gap: 0.12, accentColor: '#ff8f8f' })
  const H2 = popText(root, 'No clock | on *honesty.*', { top: 178, size: 104, accentSize: 146, at: T.h2, gap: 0.12, accentColor: GOLD })
  const H3 = popText(root, 'Too soon? | *Never* heard of her.', { top: 172, size: 86, accentSize: 120, at: T.h3, gap: 0.1, wobble: true, accentColor: '#ff8fa0' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { ep: 3, at: T.bug })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function envelope(t, behind) {
    const fly = ease.outCubic(prog(t, ...T.envFly)), drop = ease.inCubic(prog(t, ...T.envDrop))
    if (t < T.envFly[0] || drop >= 1) return
    const cx = lerp(980, 540, fly), cy = lerp(1820, 1000, fly) + drop * 760
    const rot = lerp(0.55, -0.03, fly) + drop * 0.25 + (fly < 1 ? 0 : 0.015 * Math.sin(t * 5))
    const seal = 1 - prog(t, T.sealPop, T.sealPop + 0.1)
    drawEnvelope(x, cx, cy, lerp(0.5, 1, fly), { flap: prog(t, ...T.flap), seal, rot, alpha: 1 - drop * 0.6, behind })
  }
  function letterPose(t) {
    if (t < T.rise[0]) return null
    const r = ease.outCubic(prog(t, ...T.rise))
    let cx = 540, cy = lerp(1010, L_AT.cy, r), s = lerp(0.62, 1, ease.inOutCubic(prog(t, T.rise[1] - 0.1, T.unfold[1]))), rot = 0, alpha = 1
    const o = ease.inCubic(prog(t, ...T.letterOut))
    if (o > 0 && t < T.letterBack[0]) { cy += o * 700; s *= 1 - 0.45 * o; rot = 0.2 * o; alpha = 1 - o }
    if (t >= T.letterBack[0]) {
      const b = easeOutBack(prog(t, ...T.letterBack), 1.3)
      cx = LB.cx; cy = lerp(1700, LB.cy, b); s = LB.s; rot = LB.rot; alpha = clamp(b * 3) * popOut(t, T.out)
    }
    return { cx, cy, s, rot, alpha, unfold: prog(t, ...T.unfold) }
  }
  function pisces(t, P, tears, mood = 'wide', look = [-1, 0]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, blink: mood === 'wide' ? false : undefined }
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
    const lp = letterPose(t), pen = penAt(L, t)
    if (pen && lp) { const wx = lp.cx + (pen.x - LW / 2) * lp.s; look = [clamp((wx - P.x) / 380, -1, 1), -0.9] }
    if (t > T.letterOut[0] && t < T.gavel[0]) { mood = 'wide'; look = [1, -1] }
    if (t > T.gavel[0] && t < T.cut) mood = 'squint'
    if (t > T.cut) { mood = 'happy'; look = undefined }
    if (t > T.seal) mood = 'sparkle'
    drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood, look, hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05, blink: mood === 'wide' ? false : undefined })
    const F = starFrame(P.x, P.y, P.s, t, { pop: k, hops: NAR_HOPS, seed: 2 })
    // the quill doubles as a gavel: three bangs
    let bang = 0
    for (const g of T.gavel) { const d = t - g; if (d > -0.15 && d < 0.2) bang = Math.max(bang, d < 0 ? 1 + d / 0.15 : 1 - d / 0.2) }
    const wig = t < T.letterOut[0] ? 0.08 * Math.sin(t * 9) : 0.04 * Math.sin(t * 2)
    drawQuill(x, F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.12, F.cell * 1.05, 0.55 + wig + bang * 1.1, clamp(k))
  }
  function speech(t, cx, cy, t0, text, { col = BONE, size = 30, life = 9 } = {}) {
    const k = pop01(t, t0, 0.25, 2.4) * (1 - prog(t, t0 + life - 0.15, t0 + life))
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 ${size}px ${INTER}`
    const w = x.measureText(text).width + 40, h = size + 30
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = INK; x.fillRect(-12, h / 2 + 4, 12, 10); x.fillStyle = col; x.fillRect(-8, h / 2, 8, 8)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    x.restore()
  }

  // ── the committee: three cranky props with pixel faces
  function face(c, fy, angry) {
    x.fillStyle = INK
    for (const d of [-1, 1]) {
      x.fillRect((d * 3 - 1) * c, fy * c, 2 * c, 2 * c)
      if (angry) { x.fillRect((d * 2 - (d > 0 ? 1 : 2)) * c, (fy - 2) * c, 2 * c, c); x.fillRect((d * 4 - (d > 0 ? 1 : 0)) * c, (fy - 3) * c, c, c) }
    }
    x.fillRect(-1.5 * c, (fy + 3) * c, 3 * c, c)
  }
  function stopwatch(t, c, angry) {
    for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) {
      const d = Math.hypot(i + 0.5, j + 0.5)
      if (d > 8.2) continue
      x.fillStyle = d > 7.2 ? INK : d > 6 ? '#c9cbe0' : '#f4efe2'
      x.fillRect(i * c, j * c, c + 0.4, c + 0.4)
    }
    x.fillStyle = INK; x.fillRect(-2 * c, -11 * c, 4 * c, 3 * c); x.fillStyle = '#c9cbe0'; x.fillRect(-1 * c, -10.5 * c, 2 * c, 2 * c)
    // the hand, racing
    const a = t * 7
    x.fillStyle = '#e8344e'
    for (let r = 0; r < 5; r++) x.fillRect(Math.round(Math.cos(a) * r) * c, Math.round(Math.sin(a) * r - 3) * c, c, c)
    face(c, 1, angry)
  }
  function calendar(t, c, angry) {
    x.fillStyle = INK; x.fillRect(-8 * c, -9 * c, 16 * c, 18 * c)
    x.fillStyle = '#f4efe2'; x.fillRect(-7 * c, -8 * c, 14 * c, 16 * c)
    x.fillStyle = '#e8344e'; x.fillRect(-7 * c, -8 * c, 14 * c, 4 * c)
    x.fillStyle = '#c9cbe0'; x.fillRect(-5 * c, -10 * c, c, 3 * c); x.fillRect(4 * c, -10 * c, c, 3 * c)
    x.fillStyle = INK; x.font = `800 ${Math.round(4.4 * c)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText("5", 0, -1.3 * c)
    x.fillStyle = '#efe6d6'; x.font = `800 ${Math.round(2.2 * c)}px ${INTER}`; x.fillText('DATE', 0, -6 * c)
    face(c, 3.2, angry)
  }
  function rulebook(t, c, angry) {
    x.fillStyle = INK; x.fillRect(-7 * c, -9 * c, 15 * c, 18 * c)
    x.fillStyle = '#efe6d6'; x.fillRect(5 * c, -8 * c, 2 * c, 16 * c)
    x.fillStyle = '#b8324a'; x.fillRect(-6 * c, -8 * c, 11 * c, 16 * c)
    x.fillStyle = '#7d1d33'; x.fillRect(-6 * c, -8 * c, 2 * c, 16 * c)
    x.fillStyle = GOLD; x.font = `800 ${Math.round(2.4 * c)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('RULES', 0.6 * c, -5 * c)
    x.fillRect(-3 * c, -3 * c, 8 * c, 0.6 * c)
    x.save(); x.translate(0.6 * c, 0); face(c, 0, angry); x.restore()
  }
  const PROPS = [stopwatch, calendar, rulebook]
  const SAYS = ['TOO SOON. wait a month!', 'date FIVE. minimum.', 'rule 47: never go first.']
  function committee(t) {
    if (t < T.comIn[0] || t > T.poof + 0.05) return
    const sh = ease.inOutCubic(prog(t, ...T.comOut)), back = t > T.cut
    PROPS.forEach((fn, i) => {
      let k = pop01(t, T.comIn[i], 0.32, 2.2)
      if (!back) k *= 1 - sh
      else k = pop01(t, T.duoIn + 0.15 * i, 0.3, 2) * 0.5
      if (k <= 0.01) return
      const P = back ? COM_B[i] : COM_A[i]
      // bounce when talking; shove in the brawl
      const dt = t - T.say[i]
      const talk = dt > 0 && dt < 0.5 ? 0.12 * Math.exp(-dt * 7) * Math.cos(dt * 25) : 0
      const brawl = t > T.brawl[0] && t < T.brawl[1] && !back ? 1 : 0
      const jx = brawl ? 14 * Math.sin(t * 31 + i * 2) : back ? 3 * Math.sin(t * 20 + i) : 0
      const jy = brawl ? 8 * Math.cos(t * 27 + i) : 0
      x.save(); x.translate(P.x + jx, P.y + jy + Math.sin(t * 2.4 + i) * 6); x.rotate(brawl ? 0.12 * Math.sin(t * 19 + i) : 0); x.scale(k * (1 + talk), k * (1 - talk))
      fn(t, back ? 9 : 14, true)
      x.restore()
    })
    if (!back) {
      SAYS.forEach((s, i) => speech(t, COM_A[i].x + [70, 0, -90][i], COM_A[i].y - 200, T.say[i], s, { life: T.brawl[1] - T.say[i], size: 32 }))
      if (t > T.brawl[0] && t < T.brawl[1]) for (let i = 0; i < 3; i++) speech(t, 540 + [-200, 40, 230][i], 620 + [0, 60, -20][i], T.brawl[0] + i * 0.12, ['!!', '#@!', '!!'][i], { col: '#ffd0d0', size: 34, life: T.brawl[1] - T.brawl[0] - i * 0.12 })
    } else if (t < T.poof) {
      speech(t, 540, 1050, T.duoIn + 0.5, 'mutter mutter', { col: '#d8d0f0', size: 24, life: T.poof - T.duoIn - 0.5 })
    }
  }

  function sweat(t, cx, cy) {
    for (let i = 0; i < 2; i++) {
      const ph = ((t * 1.4 + i * 0.5) % 1)
      drawBits(x, ['.B.', 'BBB', 'BWB', '.B.'], { B: '#8fe3ff', W: '#ffffff' }, cx + i * 30, cy + ph * 40, 6, { alpha: 1 - ph })
    }
  }
  function duo(t) {
    if (t < T.duoIn || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const mv = ease.inOutCubic(prog(t, T.h2Out[0] - 0.1, T.h2Out[1] + 0.15))
    const V2 = { x: lerp(VIR_A.x, VIR_B.x, mv), y: lerp(VIR_A.y, VIR_B.y, mv), s: lerp(VIR_A.s, VIR_B.s, mv) }
    const L2 = { x: lerp(LEO_A.x, LEO_B.x, mv), y: lerp(LEO_A.y, LEO_B.y, mv), s: lerp(LEO_A.s, LEO_B.s, mv) }
    const vp = pop01(t, T.duoIn, 0.36, 2.1) * ok, lp = pop01(t, T.duoIn + 0.12, 0.36, 2.1) * ok
    let vm = 'wide', vl = [0, 1]
    if (t > T.poof) { vm = 'neutral'; vl = [1, 0] }
    if (t > T.confess) { vm = 'squint'; vl = [1, 0] }
    if (t > LINES[3].t) { vm = 'sparkle'; vl = undefined }
    if (t > T.blush) vm = 'heart'
    let lm = 'neutral', ll = [-1, 0]
    if (t > T.confess + 0.3) { lm = 'wide'; ll = [-1, 0] }
    if (t > LINES[3].t) { lm = 'happy'; ll = undefined }
    if (t > T.leoHeart) lm = 'heart'
    const shake = t > T.duoIn && t < LINES[3].t ? 0.025 * Math.sin(t * 34) : 0
    drawStarChar(x, V2.x, V2.y, V2.s, t, { color: VIR.color, glyph: VIR.glyph, mood: vm, look: vl, hops: VIR_HOPS, pop: vp, seed: 4, glow: 1.1, squash: shake, blush: t > T.confess ? 1 : undefined, blink: vm === 'wide' ? false : undefined })
    drawStarChar(x, L2.x, L2.y, L2.s, t, { color: LEO.color, glyph: LEO.glyph, mood: lm, look: ll, hops: LEO_HOPS, pop: lp, seed: 9, glow: 1.1, blink: lm === 'wide' ? false : undefined })
    if (t > T.duoIn + 0.3 && t < LINES[3].t) sweat(t, V2.x + 70, V2.y - 120)
    speech(t, V2.x + 60, V2.y - 200, T.confess, 'I… like spending time with you.', { life: T.h2Out[0] - T.confess, size: 28 })
    if (t > T.leoHeart && t < T.h2Out[1]) sparkles(x, t, (V2.x + L2.x) / 2, V2.y - 40, T.leoHeart, 10, 200, 3, ['#ff4f86', BONE, GOLD])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      const dtS = t - T.seal, shake = dtS > 0 && dtS < 0.4 ? 14 * Math.exp(-dtS * 10) * Math.sin(dtS * 55) : 0
      let bang = 0
      for (const g of T.gavel) { const d = t - g; if (d > 0 && d < 0.25) bang += 7 * Math.exp(-d * 14) * Math.sin(d * 60) }
      drawSky(x, t, base)
      x.save(); x.translate(0, shake + bang)
      if (t < T.out[1] + 0.02) {
        const glowA = 0.5 * clamp(prog(t, 0.3, 1.2)) * popOut(t, T.out)
        if (glowA > 0) { const g = x.createRadialGradient(540, 930, 0, 540, 930, 620); g.addColorStop(0, `rgba(255,214,150,${0.2 * glowA})`); g.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1300) }
        const lp = letterPose(t)
        const peek = ease.outBack(prog(t, ...T.pisPeek))
        if (t < T.letterOut[1] && peek > 0.01) pisces(t, { x: 852, y: lerp(600, 448, peek), s: 150, alpha: 1 - prog(t, ...T.letterOut) }, t > T.gasp ? 2 : t > 4.0 ? 1 : 0, t > T.gasp ? 'wide' : 'sparkle', [-1, 1])
        envelope(t, true)
        if (lp && t < T.letterBack[0]) drawLetter(x, t, L, lp)
        envelope(t, false)
        // the argument
        if (t > T.comIn[0] && t < T.cut) pisces(t, { x: 950, y: 1180, s: 140, pop: pop01(t, 9.4, 0.3, 2) * (1 - ease.inCubic(prog(t, ...T.comOut))) }, t > T.brawl[0] ? 3 : 2, 'wide', [-1, -0.5])
        committee(t)
        if (t > T.poof && t < T.poof + 0.8) COM_B.forEach((P, i) => sparkles(x, t, P.x, P.y, T.poof + i * 0.06, 8, 70, i, [GOLD, BONE, '#ff8f8f']))
        duo(t)
        if (t > T.h2 && t < T.h2Out[1]) pisces(t, { x: 960, y: 560, s: 105, pop: pop01(t, T.h2 + 0.6, 0.3, 2) * outK(t, T.h2Out) }, t > T.leoHeart ? 3 : 1, 'sparkle', [-1, 1])
        if (lp && t >= T.letterBack[0]) drawLetter(x, t, L, lp)
        if (t > T.letterBack[0]) pisces(t, { x: 900, y: 560, s: 140, pop: pop01(t, T.letterBack[0] + 0.1, 0.3, 2) * popOut(t, T.out) }, t > T.seal ? 3 : 2, t > T.seal ? 'happy' : 'wide', [-1, 1])
        drawSeal(x, SEAL_AT.x, SEAL_AT.y, 160, t, T.seal, { alpha: popOut(t, T.out) })
        sparkles(x, t, SEAL_AT.x, SEAL_AT.y, T.seal + 0.02, 12, 160, 1, [GOLD, '#ff8fa0', BONE])
        narrator(t)
      }
      x.restore()
      box1.update(t); box2.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.9, between the argument and the answer)
const CUTS = [8.65, { t: T.cut, kind: 'flip' }, 22.45]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const scribble = (t0, d, gain = 0.011) => Array.from({ length: Math.floor(d / 0.085) }, (_, i) => ['tick', +(t0 + i * 0.085 + (i % 3) * 0.012).toFixed(3), gain * (0.7 + 0.3 * ((i * 7) % 3) / 2)])
export const CUES = [
  ...wordPops(T.h0, 9, 0.08, 0, 0.022),
  ['whoosh', T.envFly[0], 0.5, 0.05], ['tick', T.envFly[1], 0.05], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
  ['pop', T.sealPop, 1318.51, 0.05, 0], ['pop', T.sealPop + 0.05, 1760, 0.03, 0.2], ['glitter', T.sealPop, T.sealPop + 0.3],
  ['tick', T.flap[0] + 0.05, 0.04], ['whoosh', T.rise[0], 0.4, 0.035], ['whoosh', T.envDrop[0], 0.35, 0.025],
  ['tick', T.unfold[0] + 0.15, 0.045], ['tick', T.unfold[0] + 0.6, 0.045], ['pop', T.narIn + 0.05, 739.99, 0.035, -0.3],
  ...LETTER.flatMap(l => scribble(l.t, l.d)),
  ['pop', T.pisPeek[0] + 0.15, 987.77, 0.025, 0.4],
  // the committee: ticking stopwatch, three pops, the brawl, three gavel bangs
  ...wordPops(T.h1, 4, 0.12, 2, 0.024),
  ...T.comIn.map((c, i) => ['pop', c + 0.05, NOTE[i * 2], 0.04, [-0.4, 0, 0.4][i]]),
  ...Array.from({ length: 16 }, (_, i) => ['tick', +(T.comIn[0] + 0.2 + i * 0.25).toFixed(3), 0.012]),
  ...T.say.map((c, i) => ['pop', c, NOTE[(i * 2 + 1) % 7] * 0.5, 0.045, [-0.4, 0, 0.4][i]]),
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.brawl[0] + i * 0.11).toFixed(3), NOTE[(i * 5) % 7] * (i % 2 ? 0.5 : 1), 0.022, (i % 3 - 1) * 0.4]),
  ...T.gavel.flatMap(g => [['tom', g, 110, { gain: 0.25, decay: 0.18 }], ['tick', g, 0.06]]),
  ['whoosh', T.comOut[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS }),
  // the answer: duo, the poof, the confession, the hearts
  ...wordPops(T.h2, 4, 0.12, 1, 0.024), ['pop', T.duoIn + 0.05, 880, 0.04, -0.3], ['pop', T.duoIn + 0.17, 659.25, 0.04, 0.3],
  ['pop', T.poof, 1567.98, 0.045, 0], ['whoosh', T.poof, 0.3, 0.035], ['glitter', T.poof, T.poof + 0.5],
  ['pop', T.confess, 739.99, 0.035, -0.25], ['pluck', T.confess + 0.2, 987.77, 0.03, 0.5, -0.25],
  ['pluck', T.leoHeart, 1174.66, 0.045, 0.5, 0.2], ['pluck', T.blush, 1567.98, 0.04, 0.5, -0.2], ['glitter', T.leoHeart, T.leoHeart + 0.5],
  // the seal
  ['whoosh', T.letterBack[0], 0.4, 0.035],
  ...wordPops(T.h3, 6, 0.1, 0, 0.024),
  ['boom', T.seal, 0.3], ['tom', T.seal, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.seal, 0.07], ['bell', T.seal + 0.08, 1760, 0.03, 1.2, 0], ['glitter', T.seal + 0.05, T.seal + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
