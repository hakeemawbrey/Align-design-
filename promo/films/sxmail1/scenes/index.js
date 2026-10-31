// sxmail1: STAR MAIL No. 1, "My Gemini texts in paragraphs." (30 s vertical, Star Talk Shows §2, music: chiptune · A)
// Story 0–25.6, then the shared end card. The show look lives in ./mail.js (identical in sxmail1–4).
//   0.00–8.6   "“My Gemini texts | in *paragraphs.*”"  The STAR MAIL bug pops. An envelope flies in, its wax seal pops,
//              the flap opens, the letter rises out and unfolds in thirds (on the drop, 2.82). The handwriting writes on:
//              "Dear Stars, My Gemini sends 9 texts in a row. I send one. Are they way more into me than I am into
//              them??  — a Taurus in a quiet suburb". THE STARS (gold quill) read along; ♓ Pisces peeks over the top
//              corner and starts sniffling.
//   8.6–13.8   "Nine texts. | *One* reply."  The letter drops away, a phone rises: nine Gemini bubbles pile up and the
//              thread scrolls (one is a whole paragraph about a dog in a raincoat). THE STARS: "sweetie. that's a lot
//              of thumbs." The Taurus sends one: "sounds good". Crickets… typing… "is that a GOOD sounds good??"
//  13.9        card cut.
//  14.0–22.4   "Different style. | Same *interest.*"  ♊ and ♉ side by side, two INTEREST meters: the Gemini's fills in
//              a frantic zig-zag, the Taurus's in one slow steady pour: both hit full, "=" pops. THE STARS: "texting
//              style isn't interest level." → "so say your style out loud." ♉ TAURUS: "I'm a one-text person. it's not
//              you!" Gemini goes heart-eyed and answers with ONE text… then three more (callback).
//  22.4–25.5   "Seal it with a | *talk card.*"  The letter comes back, a talk card ("Morning person or night owl?") lands
//              on it and the wax seal THUNKs down on the pair. Pisces: fountains. Everything pops out by 25.5.
// One canvas (sky + props + stars), DOM type + dialogue box + bug, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, INTER, MONO, BEAT, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  buildBug, makeLetter, penAt, drawLetter, drawEnvelope, drawSeal, drawSealBlob, drawQuill, drawPhone, LW,
} from './mail.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GEM = signStar('gemini'), TAU = signStar('taurus'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.12, h0Land: 0.72, h0Out: [8.45, 8.65],
  envFly: [0.15, 0.62], sealPop: 0.98, flap: [1.08, 1.38], rise: [1.38, 1.84], envDrop: [1.78, 2.2], unfold: [1.98, 2.78],
  narIn: 2.1, pisPeek: [2.9, 3.3], gasp: 5.75,
  letterOut: [8.45, 8.8],
  h1: 8.75, h1Out: [13.55, 13.75],
  phoneIn: [8.75, 9.1], reply: 11.85, crick: 12.15, typing: [12.45, 12.85], panic: 12.85, phoneOut: [13.5, 13.78],
  cut: 13.9,
  h2: 14.0, h2Out: [22.25, 22.45],
  duoIn: 14.02, meterG: [15.0, 15.9], meterT: [15.0, 16.4], equal: 16.7,
  gemHeart: 21.27, cb: [21.4, 21.68, 21.86, 22.04], tauLaugh: 22.06,
  h3: 22.5, h3Land: 23.1, letterBack: [22.4, 22.8], card: [22.7, 23.05], seal: 23.35,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE STARS', TSP = `${TAU.glyph}︎ TAURUS`
const LINES = [
  { t: 9.55, speaker: SPEAK, text: "sweetie. that's a *lot* of thumbs." },
  { t: 14.3, speaker: SPEAK, text: "texting style isn't *interest level*." },
  { t: 17.35, speaker: SPEAK, text: 'so say your *style* out loud.' },
  { t: 19.8, speaker: TSP, color: '#9fe6b0', text: "I'm a one-text person. it's not *you!*" },
]
const CPS = 30
const BOX1 = { open: 9.35, close: 13.45 }, BOX2 = { open: 14.1, close: 22.8 }

// the letter (handwriting writes on line by line)
const LETTER = [
  { text: 'Dear Stars,', t: BEAT(4) + 0.03, d: 0.45 },
  { text: 'My Gemini sends *9 texts*', t: 3.35, d: 0.8 },
  { text: 'in a row. I send one.', t: 4.2, d: 0.7 },
  { text: 'Are they way more into', t: 4.95, d: 0.75 },
  { text: 'me than I am into them??', t: 5.75, d: 0.8 },
  { text: '— a Taurus in a quiet suburb', t: 6.65, d: 0.85, size: 48, align: 'right', y: 128 + 5 * 84 + 22 },
]
const L_AT = { cx: 540, cy: 905 }

// the phone thread
const PHONE = { cx: 540, top: 520, w: 560, h: 820 }
const MSGS = [
  { at: 9.2, side: 'L', text: 'omg' },
  { at: 9.42, side: 'L', text: 'ok wait' },
  { at: 9.62, side: 'L', text: 'so' },
  { at: 9.84, side: 'L', text: 'LISTEN' },
  { at: 10.15, side: 'L', text: 'ok so I saw a dog in a tiny raincoat and it looked SO proud of itself and I thought of you immediately because' },
  { at: 10.75, side: 'L', text: 'anyway' },
  { at: 10.95, side: 'L', text: 'also hi!!' },
  { at: 11.15, side: 'L', text: 'how was your day' },
  { at: 11.35, side: 'L', text: "ok that's all" },
  { at: T.reply, side: 'R', text: 'sounds good' },
  { at: T.panic, side: 'L', text: "is that a GOOD 'sounds good'??" },
]

// layout
const NAR_A = { x: 150, y: 1250, s: 200 }, NAR_B = { x: 540, y: 1300, s: 150 }
const GEM_A = { x: 300, y: 880, s: 250 }, TAU_A = { x: 780, y: 880, s: 250 }
const GEM_B = { x: 165, y: 1210, s: 190 }, TAU_B = { x: 915, y: 1210, s: 190 }
const CARD = { cx: 556, cy: 962, w: 330 }

const NAR_HOPS = [T.narIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
const TAU_HOPS = [T.duoIn + 0.3, ...talkHops(LINES, TSP, { cps: CPS }), T.tauLaugh, T.seal + 0.05]
const GEM_HOPS = [T.duoIn + 0.2, T.meterG[0] + 0.1, T.meterG[0] + 0.4, T.meterG[0] + 0.7, T.gemHeart, ...T.cb, T.seal + 0.08]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 30px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 19px 'EB Garamond'", "italic 500 15px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const cardImg = await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + 'card-talk-2.png' })

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const L = makeLetter({ lines: LETTER })

  const H0 = popText(root, '“My Gemini texts | in *paragraphs.”*', { top: 168, size: 96, accentSize: 132, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GEM.color })
  const H1 = popText(root, 'Nine texts. | *One* reply.', { top: 178, size: 104, accentSize: 140, at: T.h1, gap: 0.12, accentColor: '#7fd0ff' })
  const H2 = popText(root, 'Different style. | Same *interest.*', { top: 178, size: 100, accentSize: 136, at: T.h2, gap: 0.1, accentColor: GOLD })
  const H3 = popText(root, 'Seal it with a | *talk card.*', { top: 172, size: 104, accentSize: 150, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: '#ff8fa0' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  // meter labels (DOM, crisp)
  const lab = (txt, left, col) => el('div', { position: 'absolute', left: left + 'px', top: '1080px', width: '300px', textAlign: 'center', font: `700 28px ${MONO}`, letterSpacing: '0.1em', color: col, textShadow: '0 2px 8px rgba(6,4,18,0.95)', display: 'none' }, root, txt)
  const labG = lab(`${GEM.glyph}︎ 9 TEXTS`, GEM_A.x - 150, '#ffe27a'), labT = lab(`${TAU.glyph}︎ 1 TEXT`, TAU_A.x - 150, '#9fe6b0')
  const bug = buildBug(root, { ep: 1, at: T.bug })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── pieces
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
      cx = 520; cy = lerp(1700, 930, b); s = 0.6; rot = -0.07; alpha = clamp(b * 3) * popOut(t, T.out)
    }
    return { cx, cy, s, rot, alpha, unfold: prog(t, ...T.unfold) }
  }

  function pisces(t, P, tears, mood = 'wide', look = [-1, 0]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops }
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
    // reads along: the pupils follow the pen
    let look = [0.6, -0.8], mood = 'neutral'
    const lp = letterPose(t), pen = penAt(L, t)
    if (pen && lp) { const wx = lp.cx + (pen.x - LW / 2) * lp.s; look = [clamp((wx - P.x) / 380, -1, 1), -0.9] }
    if (t > T.gasp && t < T.letterOut[0]) { mood = 'wide'; look = [0.8, -1] }
    if (t > T.letterOut[0] && t < 9.5) mood = 'squint'
    if (t > T.reply && t < T.panic) { mood = 'neutral'; look = [1, -1] }
    if (t > T.panic && t < T.cut) mood = 'wide'
    if (t > T.cut) { mood = 'happy'; look = undefined }
    if (t > T.seal) mood = 'sparkle'
    drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood, look, hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05, blink: mood === 'wide' ? false : undefined })
    const F = starFrame(P.x, P.y, P.s, t, { pop: k, hops: NAR_HOPS, seed: 2 })
    const wig = t < T.letterOut[0] ? 0.08 * Math.sin(t * 9) : 0.04 * Math.sin(t * 2)
    drawQuill(x, F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.12, F.cell * 1.05, 0.55 + wig, clamp(k))
  }

  function speech(t, cx, cy, t0, text, { col = BONE, size = 30, life = 9 } = {}) {
    const k = pop01(t, t0, 0.25, 2.4)
    if (k <= 0.01 || t > t0 + life) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 ${size}px ${INTER}`
    const w = x.measureText(text).width + 40, h = size + 30
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = INK; x.fillRect(-12, h / 2 + 4, 12, 10); x.fillStyle = col; x.fillRect(-8, h / 2, 8, 8)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    x.restore()
  }

  function meter(t, cx, cy, [a, b], zig, col) {
    const W2 = 280, Hh = 34
    const k = pop01(t, T.duoIn + 0.3, 0.3, 2) * outK(t, T.h2Out)
    if (k <= 0.01) return
    let f = prog(t, a, b)
    if (zig) f = clamp(f + 0.22 * Math.sin(f * 22) * (1 - f) * (f > 0 ? 1 : 0))     // the Gemini meter: frantic
    else f = ease.inOutQuad(f)                                                         // the Taurus meter: one slow pour
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-W2 / 2 - 8, -Hh / 2 - 8, W2 + 16, Hh + 16)
    x.fillStyle = '#2a1f55'; x.fillRect(-W2 / 2, -Hh / 2, W2, Hh)
    const n = 14, cw = W2 / n
    for (let i = 0; i < n; i++) if ((i + 1) / n <= f + 0.001) { x.fillStyle = i % 2 ? col : '#fff1c8'; x.fillRect(-W2 / 2 + i * cw + 2, -Hh / 2 + 3, cw - 4, Hh - 6); x.fillStyle = col; x.fillRect(-W2 / 2 + i * cw + 2, -Hh / 2 + 9, cw - 4, Hh - 12) }
    x.restore()
  }

  function duo(t) {
    if (t < T.duoIn || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const mv = ease.inOutCubic(prog(t, T.h2Out[0] - 0.1, T.h2Out[1] + 0.15))
    const G2 = { x: lerp(GEM_A.x, GEM_B.x, mv), y: lerp(GEM_A.y, GEM_B.y, mv), s: lerp(GEM_A.s, GEM_B.s, mv) }
    const T2 = { x: lerp(TAU_A.x, TAU_B.x, mv), y: lerp(TAU_A.y, TAU_B.y, mv), s: lerp(TAU_A.s, TAU_B.s, mv) }
    const gp = pop01(t, T.duoIn, 0.36, 2.1) * ok, tp = pop01(t, T.duoIn + 0.12, 0.36, 2.1) * ok
    // the Gemini's orbiting thought-bubbles (it never stops typing)
    if (t < T.gemHeart && gp > 0.5) for (let i = 0; i < 9; i++) {
      const born = T.duoIn + 0.2 + i * 0.12
      if (t < born) continue
      const a = (t - born) * 1.8 + i * 0.7, R = 165 + 18 * Math.sin(i * 3.1)
      drawBits(x, ['.BBBBB.', 'BBBBBBB', 'BDBDBDB', 'BBBBBBB', '.BBBBB.', '.B.....'], { B: BONE, D: INK }, G2.x + Math.cos(a) * R, G2.y - 30 + Math.sin(a) * R * 0.75, 4.5 * pop01(t, born, 0.2, 2), { alpha: outK(t, [T.gemHeart - 0.2, T.gemHeart]) })
    }
    let gm = 'happy', gl
    if (t > T.equal) { gm = 'sparkle' }
    if (t > T.gemHeart) gm = 'heart'
    let tm = 'neutral', tl = [-1, 0]
    if (t > T.meterT[0] - 0.4 && t < T.equal) { tm = 'neutral'; tl = [0, 1] }
    if (t > T.equal) { tm = 'happy'; tl = undefined }
    if (t > LINES[3].t && t < T.gemHeart) { tm = 'happy'; tl = [-1, 0] }
    if (t > T.cb[2] && t < T.tauLaugh) { tm = 'eyeroll'; tl = undefined }
    if (t > T.tauLaugh) tm = 'happy'
    drawStarChar(x, G2.x, G2.y, G2.s, t, { color: GEM.color, glyph: GEM.glyph, mood: gm, look: gl, hops: GEM_HOPS, pop: gp, seed: 4, glow: 1.1 })
    drawStarChar(x, T2.x, T2.y, T2.s, t, { color: TAU.color, glyph: TAU.glyph, mood: tm, look: tl, hops: TAU_HOPS, pop: tp, seed: 9, glow: 1.1 })
    // the Taurus's one big heart text
    if (t < T.h2Out[0]) {
      const hk = pop01(t, T.duoIn + 0.5, 0.3, 2.4) * outK(t, [T.h2Out[0] - 0.2, T.h2Out[0]])
      if (hk > 0.01) drawBits(x, ['.BBBBBBB.', 'BBBBBBBBB', 'BBHBBBHBB', 'BHHHBHHHB', 'BHHHHHHHB', 'BBHHHHHBB', 'BBBHHHBBB', 'BBBBHBBBB', '.BBBBBBB.', '.....BB..', '.....B...'], { B: BONE, H: '#ff4f86' }, T2.x + 10, T2.y - 205, 7.5 * hk)
    }
    // meters + "="
    if (t < T.h2Out[1]) {
      meter(t, GEM_A.x, 1150, T.meterG, true, '#ffd23a')
      meter(t, TAU_A.x, 1150, T.meterT, false, '#5fd38a')
      const ek = pop01(t, T.equal, 0.3, 2.6) * outK(t, T.h2Out)
      if (ek > 0.01) drawBits(x, ['GGGGGG', '......', 'GGGGGG'], { G: GOLD }, 540, 1150, 12 * ek)
      sparkles(x, t, GEM_A.x + 140, 1150, T.meterG[1], 6, 40, 1, [GOLD, BONE])
      sparkles(x, t, TAU_A.x + 140, 1150, T.meterT[1], 6, 40, 2, ['#5fd38a', BONE])
    }
    // the callback: ONE text… then three more
    const cbs = ['got it! one text.', 'ok', 'wait', 'ok bye!!']
    cbs.forEach((s, i) => speech(t, GEM_A.x + [10, 70, -40, 60][i], 650 - i * 76, T.cb[i], s, { life: T.h2Out[0] - T.cb[i] - 0.05, size: i ? 28 : 30 }))
    if (t > T.gemHeart && t < T.gemHeart + 0.8) sparkles(x, t, G2.x, G2.y, T.gemHeart, 10, 170, 3, ['#ff4f86', BONE, GOLD])
  }

  function talkCard(t) {
    if (!cardImg || t < T.card[0]) return
    const k = easeOutBack(prog(t, ...T.card), 1.4), ok = popOut(t, T.out)
    if (ok <= 0) return
    const w = CARD.w * ok, h = w * cardImg.height / cardImg.width
    const cx = lerp(1300, CARD.cx, k), cy = lerp(700, CARD.cy, k), rot = lerp(0.8, 0.06, k)
    x.save(); x.translate(cx, cy); x.rotate(rot)
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 18, -h / 2 + 22, w, h)
    x.drawImage(cardImg, -w / 2, -h / 2, w, h)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      // camera shake from the seal THUNK
      const dtS = t - T.seal, shake = dtS > 0 && dtS < 0.4 ? 14 * Math.exp(-dtS * 10) * Math.sin(dtS * 55) : 0
      drawSky(x, t, base)
      x.save(); x.translate(0, shake)
      if (t < T.out[1] + 0.02) {
        // warm reading-lamp glow behind the letter
        const glowA = 0.5 * clamp(prog(t, 0.3, 1.2)) * popOut(t, T.out)
        if (glowA > 0) { const g = x.createRadialGradient(540, 930, 0, 540, 930, 620); g.addColorStop(0, `rgba(255,214,150,${0.2 * glowA})`); g.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1300) }
        const lp = letterPose(t)
        // Pisces reads over the letter's shoulder (drawn first: the letter hides its lower half)
        const peek = ease.outBack(prog(t, ...T.pisPeek))
        if (t < T.letterOut[1] && peek > 0.01) pisces(t, { x: 852, y: lerp(600, 448, peek), s: 150, alpha: 1 - prog(t, ...T.letterOut) }, t > T.gasp ? 2 : t > 3.9 ? 1 : 0, t > T.gasp ? 'wide' : 'sparkle', [-1, 1])
        envelope(t, true)
        if (lp && t < T.letterBack[0]) drawLetter(x, t, L, lp)
        envelope(t, false)
        // the phone
        if (t > T.phoneIn[0] && t < T.phoneOut[1]) {
          const pin = easeOutBack(prog(t, ...T.phoneIn), 1.4), po = ease.inCubic(prog(t, ...T.phoneOut))
          drawPhone(x, t, { ...PHONE, top: PHONE.top + (1 - pin) * 900 + po * 900, title: `${GEM.glyph}︎ my Gemini`, msgs: MSGS, typing: T.typing, alpha: 1 - po * 0.5 })
          // crickets after "sounds good"
          if (t > T.crick && t < T.typing[0] + 0.1) { x.save(); x.globalAlpha = Math.sin(Math.PI * prog(t, T.crick, T.typing[0] + 0.1)); x.font = `700 30px ${MONO}`; x.fillStyle = '#9fe6b0'; x.textAlign = 'center'; x.fillText('* chirp *', 540, 1385 - 40); x.restore() }
          pisces(t, { x: 935, y: 1150, s: 150, pop: pin * (1 - po) }, t > T.panic ? 3 : 2, 'wide', [-1, -0.5])
        }
        // the answer
        duo(t)
        if (t > T.h2 && t < T.h2Out[1]) pisces(t, { x: 960, y: 560, s: 105, pop: pop01(t, T.h2 + 0.6, 0.3, 2) * outK(t, T.h2Out) }, t > T.equal ? 2 : 1, 'sparkle', [-1, 1])
        // the seal beat
        if (lp && t >= T.letterBack[0]) drawLetter(x, t, L, lp)
        talkCard(t)
        if (t > T.letterBack[0]) pisces(t, { x: 900, y: 560, s: 140, pop: pop01(t, T.letterBack[0] + 0.1, 0.3, 2) * popOut(t, T.out) }, t > T.seal ? 3 : 2, t > T.seal ? 'happy' : 'wide', [-1, 1])
        drawSeal(x, CARD.cx, CARD.cy + 238, 150, t, T.seal, { alpha: popOut(t, T.out) })
        sparkles(x, t, CARD.cx, CARD.cy + 238, T.seal + 0.02, 12, 150, 1, [GOLD, '#ff8fa0', BONE])
        narrator(t)
      }
      x.restore()
      // meter labels
      const lk = pop01(t, T.duoIn + 0.35, 0.3, 2) * outK(t, T.h2Out)
      for (const e of [labG, labT]) { e.style.display = lk > 0.01 && t < T.h2Out[1] ? 'block' : 'none'; e.style.opacity = String(clamp(lk)); e.style.transform = `scale(${lk.toFixed(3)})` }
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
  // cold open: headline, envelope, seal pop, flap, letter rises + unfolds
  ...wordPops(T.h0, 4, 0.07, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['whoosh', T.envFly[0], 0.5, 0.05], ['tick', T.envFly[1], 0.05], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
  ['pop', T.sealPop, 1318.51, 0.05, 0], ['pop', T.sealPop + 0.05, 1760, 0.03, 0.2], ['glitter', T.sealPop, T.sealPop + 0.3],
  ['tick', T.flap[0] + 0.05, 0.04], ['whoosh', T.rise[0], 0.4, 0.035], ['whoosh', T.envDrop[0], 0.35, 0.025],
  ['tick', T.unfold[0] + 0.15, 0.045], ['tick', T.unfold[0] + 0.6, 0.045], ['pop', T.narIn + 0.05, 739.99, 0.035, -0.3],
  // the handwriting scratches on
  ...LETTER.flatMap(l => scribble(l.t, l.d)),
  ['pop', T.pisPeek[0] + 0.15, 987.77, 0.025, 0.4], ['pluck', T.gasp + 0.05, 659.25, 0.03, 0.5, 0.4],
  // the phone: nine bubbles, the paragraph whoosh, one reply, crickets, typing, panic
  ['whoosh', T.phoneIn[0], 0.4, 0.035], ...wordPops(T.h1, 4, 0.12, 2, 0.024),
  ...MSGS.slice(0, 9).map((m, i) => ['pop', m.at, NOTE[i % 7] * (i % 2 ? 1 : 1.5), 0.04, -0.2]),
  ['whoosh', MSGS[4].at, 0.45, 0.04],
  ['pop', T.reply, 440, 0.05, 0.25],
  ['pluck', T.crick, 2637, 0.012, 0.1, 0.3], ['pluck', T.crick + 0.09, 2637, 0.012, 0.1, 0.3], ['pluck', T.crick + 0.33, 2637, 0.012, 0.1, 0.3], ['pluck', T.crick + 0.42, 2637, 0.012, 0.1, 0.3],
  ['tick', T.typing[0], 0.02], ['tick', T.typing[0] + 0.13, 0.02], ['tick', T.typing[0] + 0.26, 0.02],
  ['pop', T.panic, 1318.51, 0.05, -0.2], ['pop', T.panic + 0.06, 1567.98, 0.035, -0.2],
  ['whoosh', T.phoneOut[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS }),
  // the answer: duo pops, meters (zig-zag vs one pour), the "="
  ...wordPops(T.h2, 4, 0.1, 1, 0.024), ['pop', T.duoIn + 0.05, 880, 0.04, -0.3], ['pop', T.duoIn + 0.17, 659.25, 0.04, 0.3],
  ...Array.from({ length: 9 }, (_, i) => ['pop', +(T.meterG[0] + i * 0.1).toFixed(3), NOTE[(i * 3) % 7] * 2, 0.012, -0.3]),
  ['riser', T.meterT[0], T.meterT[1], 0.03], ['bell', T.meterG[1], 1760, 0.025, 0.8, -0.3], ['bell', T.meterT[1], 1760, 0.03, 0.9, 0.3],
  ['pop', T.equal, 1174.66, 0.05, 0], ['bell', T.equal + 0.05, 2349.32, 0.025, 1.0, 0], ['glitter', T.equal, T.equal + 0.4],
  ['pluck', T.gemHeart, 1174.66, 0.045, 0.5, -0.2], ['pluck', T.gemHeart + 0.12, 1567.98, 0.04, 0.5, -0.2],
  ...T.cb.map((c, i) => ['pop', c, NOTE[(i * 2 + 3) % 7], 0.035, -0.25]),
  ['pop', T.tauLaugh, 987.77, 0.03, 0.3], ['pop', T.tauLaugh + 0.1, 1174.66, 0.025, 0.3],
  // the seal: letter back, talk card lands, THUNK
  ['whoosh', T.letterBack[0], 0.4, 0.035], ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ...wordPops(T.h3, 3, 0.07, 0, 0.024), ['pop', T.h3Land, 1174.66, 0.045, 0], ['pop', T.h3Land + 0.1, 1567.98, 0.04, 0],
  ['boom', T.seal, 0.3], ['tom', T.seal, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.seal, 0.07], ['bell', T.seal + 0.08, 1760, 0.03, 1.2, 0], ['glitter', T.seal + 0.05, T.seal + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
