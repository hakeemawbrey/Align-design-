// sxmail2: STAR MAIL No. 2, "They said 'lol' to my heartfelt text." (30 s vertical, Star Talk Shows §2, music: pop · Eb)
// Story 0–25.6, then the shared end card. The show look lives in ./mail.js (identical in sxmail1–4).
//   0.00–8.6   "“They said ‘lol’ | to my *heartfelt* text.”"  The STAR MAIL bug pops; the envelope flies in, the seal pops,
//              the letter rises and unfolds (drop 2.82) and writes on: "Dear Stars, I sent my date a long, heartfelt
//              text about how much I like them. They replied "lol". Help??  — a Cancer in a sleepy beach town".
//              THE STARS read along with the gold quill; ♓ Pisces peeks over the corner, welling up.
//   8.6–13.8   "Big feelings. | Tiny *reply.*"  A phone: the heartfelt paragraph whooshes across. Typing… typing…
//              typing… "lol". Record scratch. Pisces gasps so hard it squashes, then fountains. THE STARS: "oof. that
//              lol echoed."
//  13.9        card cut.
//  14.0–22.4   "It's not a *no.* | It's a freeze."  ♋ and the ♒ date. The Aquarius holds the paragraph like a scroll
//              that won't stop unrolling, sweating. THE STARS: "some people freeze at big feelings over text." →
//              "so ask in person. kindly." The two scoot together, Cancer: "was my text a lot?" ♒ AQUARIUS: "no! I
//              loved it. I just froze." Blush, heart-eyes, Pisces sobs.
//  22.4–25.5   "Big feelings deserve | *a voice.*"  The letter comes back and the wax seal THUNKs onto it.
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
  GOLD, BONE, INK, INTER, MONO, BEAT, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  buildBug, makeLetter, penAt, drawLetter, drawEnvelope, drawSeal, drawQuill, drawPhone, LW,
} from './mail.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const CAN = signStar('cancer'), AQU = signStar('aquarius'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.12, h0Out: [8.45, 8.65],
  envFly: [0.15, 0.62], sealPop: 0.98, flap: [1.08, 1.38], rise: [1.38, 1.84], envDrop: [1.78, 2.2], unfold: [1.98, 2.78],
  narIn: 2.1, pisPeek: [2.9, 3.3], gasp: 5.85,
  letterOut: [8.45, 8.8],
  h1: 8.75, h1Out: [13.55, 13.75],
  phoneIn: [8.75, 9.1], para: 9.3, typing: [9.95, 10.95], lol: 10.95, pisGasp: 11.0, phoneOut: [13.5, 13.78],
  cut: 13.9,
  h2: 14.0, h2Out: [22.25, 22.45],
  duoIn: 14.02, scroll: [14.4, 16.6], scoot: [17.6, 18.1], ask: 18.2, blush: 21.6, canHeart: 21.75,
  h3: 22.5, h3Land: 23.1, letterBack: [22.4, 22.8], seal: 23.35,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE STARS', ASP = `${AQU.glyph}︎ AQUARIUS`
const LINES = [
  { t: 11.1, speaker: SPEAK, text: 'oof. that *lol* echoed.' },
  { t: 14.3, speaker: SPEAK, text: 'some people *freeze* at big feelings over text.' },
  { t: 17.55, speaker: SPEAK, text: 'so ask in person. *kindly.*' },
  { t: 20.15, speaker: ASP, color: '#9fdcff', text: 'no! I loved it. I just *froze.*' },
]
const CPS = 30
const BOX1 = { open: 10.98, close: 13.55 }, BOX2 = { open: 14.1, close: 23.1 }

const LETTER = [
  { text: 'Dear Stars,', t: BEAT(4) + 0.03, d: 0.45 },
  { text: 'I sent my date a long,', t: 3.35, d: 0.75 },
  { text: 'heartfelt text about how', t: 4.15, d: 0.8 },
  { text: 'much I like them. They', t: 5.0, d: 0.75 },
  { text: 'replied *“lol”.* Help??', t: T.gasp, d: 0.75 },
  { text: '— a Cancer in a sleepy beach town', t: 6.7, d: 0.95, size: 46, align: 'right', y: 128 + 5 * 84 + 22 },
]
const L_AT = { cx: 540, cy: 905 }

const PHONE = { cx: 540, top: 520, w: 560, h: 820 }
const MSGS = [
  { at: T.para, side: 'R', text: "hey! I just wanted to say I really loved tonight. talking to you felt so easy, like I've known you forever. I'd love to see you again soon. sleep well" },
  { at: T.lol, side: 'L', text: 'lol' },
]

// layout
const NAR_A = { x: 150, y: 1250, s: 200 }, NAR_B = { x: 540, y: 1300, s: 150 }
const CAN_A = { x: 300, y: 880, s: 250 }, AQU_A = { x: 780, y: 880, s: 250 }
const CAN_C = { x: 380, y: 900 }, AQU_C = { x: 700, y: 900 }
const CAN_B = { x: 165, y: 1250, s: 190 }, AQU_B = { x: 915, y: 1250, s: 190 }
const LB = { cx: 540, cy: 930, s: 0.66, rot: -0.05 }
const SEAL_AT = { x: 740, y: 1135 }

const NAR_HOPS = [T.narIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
const AQU_HOPS = [T.duoIn + 0.3, ...talkHops(LINES, ASP, { cps: CPS }), T.blush, T.seal + 0.05]
const CAN_HOPS = [T.duoIn + 0.2, T.scoot[0] + 0.1, T.ask, T.canHeart, T.seal + 0.08]
const PIS_HOPS = [T.pisGasp]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 30px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 19px 'EB Garamond'", "italic 500 15px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const L = makeLetter({ lines: LETTER })

  const H0 = popText(root, '“They said ‘lol’ to | my *heartfelt* text.”', { top: 172, size: 84, accentSize: 112, at: T.h0, gap: 0.08, accentColor: CAN.color })
  const H1 = popText(root, 'Big feelings. | Tiny *reply.*', { top: 178, size: 104, accentSize: 140, at: T.h1, gap: 0.12, accentColor: '#7fd0ff' })
  const H2 = popText(root, 'It’s not a *no.* | It’s a freeze.', { top: 178, size: 100, accentSize: 136, at: T.h2, gap: 0.1, accentColor: GOLD })
  const H3 = popText(root, 'Big feelings deserve | *a voice.*', { top: 172, size: 92, accentSize: 150, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: '#ff8fa0' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { ep: 2, at: T.bug })
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
  function pisces(t, P, tears, mood = 'wide', look = [-1, 0], squash = 0) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, squash, blink: mood === 'wide' ? false : undefined }
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
    if (t > T.gasp + 0.3 && t < T.letterOut[0]) { mood = 'wide'; look = [0.8, -1] }
    if (t > T.letterOut[0] && t < T.lol) { mood = 'neutral'; look = [1, -1] }
    if (t > T.lol && t < T.cut) mood = 'squint'
    if (t > T.cut) { mood = 'happy'; look = undefined }
    if (t > T.seal) mood = 'sparkle'
    drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood, look, hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05, blink: mood === 'wide' ? false : undefined })
    const F = starFrame(P.x, P.y, P.s, t, { pop: k, hops: NAR_HOPS, seed: 2 })
    const wig = t < T.letterOut[0] ? 0.08 * Math.sin(t * 9) : 0.04 * Math.sin(t * 2)
    drawQuill(x, F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.12, F.cell * 1.05, 0.55 + wig, clamp(k))
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
  // the paragraph as a scroll the Aquarius can't stop unrolling
  function scroll(t, cx, cy) {
    const u = ease.outCubic(prog(t, ...T.scroll)), gone = prog(t, T.scoot[0] - 0.2, T.scoot[0] + 0.15)
    if (u <= 0 || gone >= 1) return
    const len = 40 + u * 330
    x.save(); x.globalAlpha *= 1 - gone; x.translate(cx, cy); x.rotate(0.05 * Math.sin(t * 7))
    x.fillStyle = INK; x.fillRect(-74, -8, 148, len + 16)
    x.fillStyle = '#f4e8cc'; x.fillRect(-66, 0, 132, len)
    x.fillStyle = '#9aa6cc'
    for (let y = 16; y < len - 10; y += 22) x.fillRect(-52, y, 104 - ((y * 7) % 30), 6)
    x.fillStyle = '#4f8df0'; x.fillRect(-66, 0, 132, 10)
    // the roll at the bottom
    x.fillStyle = INK; x.fillRect(-82, len - 6, 164, 30); x.fillStyle = '#e2cfa6'; x.fillRect(-76, len, 152, 18); x.fillStyle = '#fff3d8'; x.fillRect(-76, len, 152, 5)
    x.restore()
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
    const sc = ease.inOutCubic(prog(t, ...T.scoot))
    const mv = ease.inOutCubic(prog(t, T.h2Out[0] - 0.1, T.h2Out[1] + 0.15))
    const C2 = { x: lerp(lerp(CAN_A.x, CAN_C.x, sc), CAN_B.x, mv), y: lerp(lerp(CAN_A.y, CAN_C.y, sc), CAN_B.y, mv), s: lerp(CAN_A.s, CAN_B.s, mv) }
    const A2 = { x: lerp(lerp(AQU_A.x, AQU_C.x, sc), AQU_B.x, mv), y: lerp(lerp(AQU_A.y, AQU_C.y, sc), AQU_B.y, mv), s: lerp(AQU_A.s, AQU_B.s, mv) }
    const cp = pop01(t, T.duoIn, 0.36, 2.1) * ok, ap = pop01(t, T.duoIn + 0.12, 0.36, 2.1) * ok
    let cm = 'neutral', cl = [1, 0]
    if (t > T.scroll[0] && t < T.scoot[0]) { cm = 'neutral'; cl = [1, 0.5] }
    if (t > T.ask - 0.1) { cm = 'neutral'; cl = [1, 0] }
    if (t > LINES[3].t + 0.4) { cm = 'sparkle'; cl = undefined }
    if (t > T.canHeart) cm = 'heart'
    let am = 'wide', al = [0, 1]
    if (t > T.scoot[0]) { am = 'neutral'; al = [-1, 0] }
    if (t > LINES[3].t) { am = 'happy'; al = undefined }
    if (t > T.blush) am = 'heart'
    drawStarChar(x, C2.x, C2.y, C2.s, t, { color: CAN.color, glyph: CAN.glyph, mood: cm, look: cl, hops: CAN_HOPS, pop: cp, seed: 4, glow: 1.1 })
    scroll(t, A2.x + 150, A2.y + 20)
    drawStarChar(x, A2.x, A2.y, A2.s, t, { color: AQU.color, glyph: AQU.glyph, mood: am, look: al, hops: AQU_HOPS, pop: ap, seed: 9, glow: 1.1, blush: t > T.blush ? 1 : undefined, blink: am === 'wide' ? false : undefined, squash: t < T.scoot[0] ? 0.03 * Math.sin(t * 30) : 0 })
    if (t > T.duoIn + 0.3 && t < T.scoot[0]) { sweat(t, A2.x + 70, A2.y - 120); speech(t, A2.x - 10, A2.y - 200, T.duoIn + 0.5, 'lol??', { life: T.scoot[0] - T.duoIn - 0.5 }) }
    speech(t, C2.x - 20, C2.y - 190, T.ask, 'was my text a lot?', { life: LINES[3].t - T.ask + 0.2 })
    if (t > T.blush && t < T.h2Out[1]) sparkles(x, t, (C2.x + A2.x) / 2, C2.y - 40, T.blush, 10, 200, 3, ['#ff4f86', BONE, GOLD])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      const dtS = t - T.seal, shake = dtS > 0 && dtS < 0.4 ? 14 * Math.exp(-dtS * 10) * Math.sin(dtS * 55) : 0
      // the record scratch: a jolt on "lol"
      const dtL = t - T.lol, jolt = dtL > 0 && dtL < 0.3 ? 10 * Math.exp(-dtL * 12) * Math.sin(dtL * 70) : 0
      drawSky(x, t, base)
      x.save(); x.translate(jolt, shake)
      if (t < T.out[1] + 0.02) {
        const glowA = 0.5 * clamp(prog(t, 0.3, 1.2)) * popOut(t, T.out)
        if (glowA > 0) { const g = x.createRadialGradient(540, 930, 0, 540, 930, 620); g.addColorStop(0, `rgba(255,214,150,${0.2 * glowA})`); g.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1300) }
        const lp = letterPose(t)
        const peek = ease.outBack(prog(t, ...T.pisPeek))
        if (t < T.letterOut[1] && peek > 0.01) pisces(t, { x: 852, y: lerp(600, 448, peek), s: 150, alpha: 1 - prog(t, ...T.letterOut) }, t > T.gasp + 0.3 ? 2 : t > 4.0 ? 1 : 0, t > T.gasp + 0.3 ? 'wide' : 'sparkle', [-1, 1])
        envelope(t, true)
        if (lp && t < T.letterBack[0]) drawLetter(x, t, L, lp)
        envelope(t, false)
        if (t > T.phoneIn[0] && t < T.phoneOut[1]) {
          const pin = easeOutBack(prog(t, ...T.phoneIn), 1.4), po = ease.inCubic(prog(t, ...T.phoneOut))
          // the heartfelt paragraph whooshes in from the side before it lands in the thread
          drawPhone(x, t, { ...PHONE, top: PHONE.top + (1 - pin) * 900 + po * 900, title: `${AQU.glyph}︎ my date`, msgs: MSGS, typing: T.typing, alpha: 1 - po * 0.5 })
          const g = t - T.pisGasp
          const sq = g > 0 && g < 0.6 ? -0.22 * Math.exp(-g * 5) * Math.cos(g * 18) : 0
          pisces(t, { x: 935, y: 1150, s: 150, pop: pin * (1 - po), hops: PIS_HOPS }, t > T.pisGasp + 0.4 ? 3 : 1, t > T.pisGasp ? 'wide' : 'sparkle', [-1, -0.5], sq)
          // the big "lol", slammed over the thread
          const lk = pop01(t, T.lol, 0.22, 3) * (1 - po)
          if (lk > 0.01) {
            x.save(); x.translate(560, 1000); x.rotate(-0.12 + 0.02 * Math.sin(t * 6)); x.scale(lk, lk)
            x.font = `800 210px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
            x.lineWidth = 22; x.strokeStyle = INK; x.strokeText('lol', 0, 0)
            x.fillStyle = '#e9e4ff'; x.fillText('lol', 0, 0)
            x.restore()
          }
          if (g > 0 && g < 0.7) speech(t, 935, 1010, T.pisGasp, 'GASP', { col: '#ffd0e0', size: 32, life: 0.7 })
        }
        duo(t)
        if (t > T.h2 && t < T.h2Out[1]) pisces(t, { x: 960, y: 560, s: 105, pop: pop01(t, T.h2 + 0.6, 0.3, 2) * outK(t, T.h2Out) }, t > T.blush ? 3 : 1, 'sparkle', [-1, 1])
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

// card-cut candidates (cardfx keeps the middle one: 13.9, between the phone and the answer)
const CUTS = [8.65, { t: T.cut, kind: 'flip' }, 22.45]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const scribble = (t0, d, gain = 0.011) => Array.from({ length: Math.floor(d / 0.085) }, (_, i) => ['tick', +(t0 + i * 0.085 + (i % 3) * 0.012).toFixed(3), gain * (0.7 + 0.3 * ((i * 7) % 3) / 2)])
export const CUES = [
  ...wordPops(T.h0, 7, 0.08, 0, 0.022),
  ['whoosh', T.envFly[0], 0.5, 0.05], ['tick', T.envFly[1], 0.05], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
  ['pop', T.sealPop, 1318.51, 0.05, 0], ['pop', T.sealPop + 0.05, 1760, 0.03, 0.2], ['glitter', T.sealPop, T.sealPop + 0.3],
  ['tick', T.flap[0] + 0.05, 0.04], ['whoosh', T.rise[0], 0.4, 0.035], ['whoosh', T.envDrop[0], 0.35, 0.025],
  ['tick', T.unfold[0] + 0.15, 0.045], ['tick', T.unfold[0] + 0.6, 0.045], ['pop', T.narIn + 0.05, 739.99, 0.035, -0.3],
  ...LETTER.flatMap(l => scribble(l.t, l.d)),
  ['pop', T.pisPeek[0] + 0.15, 987.77, 0.025, 0.4], ['pluck', T.gasp + 0.35, 587.33, 0.03, 0.5, 0.4],
  // the phone: the paragraph whoosh, a long typing, "lol", record scratch, Pisces gasps
  ['whoosh', T.phoneIn[0], 0.4, 0.035], ...wordPops(T.h1, 4, 0.12, 2, 0.024),
  ['whoosh', T.para - 0.1, 0.5, 0.05], ['pluck', T.para + 0.1, 1174.66, 0.04, 0.6, 0.25], ['bell', T.para + 0.15, 1760, 0.02, 1.0, 0.25],
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(T.typing[0] + i * 0.14).toFixed(3), 0.018]),
  ['pop', T.lol, 440, 0.06, -0.2],
  ['whoosh', T.lol + 0.02, 0.18, 0.06], ['tick', T.lol + 0.02, 0.07], ['whoosh', T.lol + 0.12, 0.14, 0.05],
  ['pop', T.pisGasp, 1567.98, 0.05, 0.4], ['pop', T.pisGasp + 0.08, 1174.66, 0.04, 0.4], ['glitter', T.pisGasp + 0.4, T.pisGasp + 1.2],
  ['whoosh', T.phoneOut[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS }),
  // the answer: duo, the scroll unrolls, the scoot, the question, the blush
  ...wordPops(T.h2, 6, 0.1, 1, 0.022), ['pop', T.duoIn + 0.05, 880, 0.04, -0.3], ['pop', T.duoIn + 0.17, 659.25, 0.04, 0.3],
  ['riser', T.scroll[0], T.scroll[1], 0.025], ['pop', T.duoIn + 0.5, 1318.51, 0.03, 0.3],
  ['whoosh', T.scoot[0], 0.35, 0.03], ['pop', T.ask, 987.77, 0.035, -0.25],
  ['pluck', T.blush, 1174.66, 0.045, 0.5, 0.2], ['pluck', T.canHeart, 1567.98, 0.04, 0.5, -0.2], ['glitter', T.blush, T.blush + 0.5],
  // the seal
  ['whoosh', T.letterBack[0], 0.4, 0.035],
  ...wordPops(T.h3, 3, 0.07, 0, 0.024), ['pop', T.h3Land, 1174.66, 0.045, 0], ['pop', T.h3Land + 0.1, 1567.98, 0.04, 0],
  ['boom', T.seal, 0.3], ['tom', T.seal, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.seal, 0.07], ['bell', T.seal + 0.08, 1760, 0.03, 1.2, 0], ['glitter', T.seal + 0.05, T.seal + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
