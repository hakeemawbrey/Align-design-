// sxmail4: STAR MAIL No. 4, "I roasted Virgos for years. Now I'm dating one." (30 s vertical, Star Talk Shows §2, music: funk · D)
// Story 0–25.6, then the shared end card. The show look lives in ./mail.js (identical in sxmail1–4).
//   0.00–8.6   "“I roasted Virgos for years. | Now I'm *dating* one.”"  The STAR MAIL bug pops; the envelope flies in, the
//              seal pops, the letter rises and unfolds (drop 2.82) and writes on: "Dear Stars, For years my group chat
//              roasted Virgos. Every day. Now I'm dating one. And they're… lovely?? Help.  — a Sagittarius in a busy
//              city". THE STARS read along with the gold quill; ♓ Pisces peeks over the corner.
//   8.6–13.8   "The group chat | *remembers.*"  A phone: "the roast crew". Virgo jokes pile up (the writer joins in), then
//              the writer: "…so I'm dating a Virgo." Crickets. THE STARS: "uh oh. the chat went quiet." The chat, not
//              quiet at all: "oh no" · "OH NO" · "wait WHAT".
//  13.9        card cut.
//  14.0–22.6   "Signs are a start, | not a *sentence.*"  ♍ (with a clipboard) and the nervous ♐. The Sag braces for
//              notes… the clipboard reads "things I like about you": your laugh ✓, your stories ✓, on time (once) ✓.
//              THE STARS: "signs are a starting point. not a sentence." → "let people surprise you." ♍ VIRGO: "also I
//              saw the roasts. some were fair." Sag gasps, then both crack up. Pisces sobs.
//  22.65–25.5  "Eat the roast. | *Gracefully.*"  The letter comes back and the wax seal THUNKs onto it.
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
const VIR = signStar('virgo'), SAG = signStar('sagittarius'), PIS = signStar('pisces')
const g = id => signStar(id).glyph + '︎'

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.12, h0Out: [8.45, 8.65],
  envFly: [0.15, 0.62], sealPop: 0.98, flap: [1.08, 1.38], rise: [1.38, 1.84], envDrop: [1.78, 2.2], unfold: [1.98, 2.78],
  narIn: 2.1, pisPeek: [2.9, 3.3], gasp: 5.85,
  letterOut: [8.45, 8.8],
  h1: 8.75, h1Out: [13.55, 13.75],
  phoneIn: [8.75, 9.1], reveal: 10.95, crick: 11.15, ohno: [12.05, 12.25, 12.45], phoneOut: [13.5, 13.78],
  cut: 13.9,
  h2: 14.0, h2Out: [22.45, 22.65],
  duoIn: 14.02, brace: 15.6, clip: 16.0, items: [16.45, 17.0, 17.55], melt: 17.8, sagGasp: 21.65, laugh: 22.0,
  h3: 22.7, h3Land: 23.25, letterBack: [22.6, 23.0], seal: 23.55,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE STARS', VSP = `${VIR.glyph}︎ VIRGO`
const LINES = [
  { t: 11.1, speaker: SPEAK, text: 'uh oh. the chat went *quiet.*' },
  { t: 14.3, speaker: SPEAK, text: 'signs are a starting point. not a *sentence.*' },
  { t: 17.75, speaker: SPEAK, text: 'let people *surprise* you.' },
  { t: 20.1, speaker: VSP, color: '#b9f0a0', text: 'also I saw the roasts. some were *fair.*' },
]
const CPS = 30
const BOX1 = { open: 10.95, close: 13.75 }, BOX2 = { open: 14.1, close: 23.2 }

const LETTER = [
  { text: 'Dear Stars,', t: BEAT(4) + 0.03, d: 0.45 },
  { text: 'For years my group chat', t: 3.35, d: 0.75 },
  { text: 'roasted Virgos. *Every day.*', t: 4.15, d: 0.85 },
  { text: "Now I'm dating one. And", t: 5.05, d: 0.75 },
  { text: "they're… *lovely??* Help.", t: T.gasp, d: 0.75 },
  { text: '— a Sagittarius in a busy city', t: 6.7, d: 0.95, size: 46, align: 'right', y: 128 + 5 * 84 + 22 },
]
const L_AT = { cx: 540, cy: 905 }

const PHONE = { cx: 540, top: 520, w: 560, h: 820 }
const MSGS = [
  { at: 9.15, side: 'L', text: `${g('aries')} virgos alphabetize their snacks` },
  { at: 9.5, side: 'L', text: `${g('leo')} a virgo fact-checked my horoscope` },
  { at: 9.85, side: 'R', text: 'lmao they bring a label maker on dates' },
  { at: 10.2, side: 'L', text: `${g('gemini')} virgo texts come with footnotes` },
  { at: 10.55, side: 'L', text: `${g('aries')} anyway how's the new date??` },
  { at: T.reveal, side: 'R', text: "…they're a Virgo." },
  { at: T.ohno[0], side: 'L', text: `${g('leo')} oh no` },
  { at: T.ohno[1], side: 'L', text: `${g('gemini')} OH NO` },
  { at: T.ohno[2], side: 'L', text: `${g('aries')} wait WHAT` },
]

// layout
const NAR_A = { x: 150, y: 1250, s: 200 }, NAR_B = { x: 760, y: 1300, s: 150 }
const VIR_A = { x: 300, y: 820, s: 240 }, SAG_A = { x: 790, y: 840, s: 250 }
const VIR_B = { x: 165, y: 1250, s: 190 }, SAG_B = { x: 915, y: 1250, s: 190 }
const CLIP = { x: 330, y: 1120, w: 300, h: 300 }
const LB = { cx: 540, cy: 930, s: 0.66, rot: -0.05 }
const SEAL_AT = { x: 740, y: 1135 }

const NAR_HOPS = [T.narIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
const VIR_HOPS = [T.duoIn + 0.2, T.clip, ...T.items, ...talkHops(LINES, VSP, { cps: CPS }), T.laugh, T.seal + 0.08]
const SAG_HOPS = [T.duoIn + 0.3, T.melt, T.sagGasp, T.laugh + 0.1, T.laugh + 0.45, T.seal + 0.05]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 30px Inter", "700 30px Inter", "700 24px Inter", "italic 500 150px 'EB Garamond'", "italic 500 19px 'EB Garamond'", "italic 500 15px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const L = makeLetter({ lines: LETTER })

  const H0 = popText(root, '“I roasted Virgos | for years. Now I’m | *dating* one.”', { top: 150, size: 74, accentSize: 100, at: T.h0, gap: 0.07, accentColor: VIR.color })
  const H1 = popText(root, 'The group chat | *remembers.*', { top: 178, size: 104, accentSize: 146, at: T.h1, gap: 0.12, accentColor: '#ff9a6a' })
  const H2 = popText(root, 'Signs are a start, | not a *sentence.*', { top: 178, size: 92, accentSize: 128, at: T.h2, gap: 0.1, accentColor: GOLD })
  const H3 = popText(root, 'Eat the roast. | *Gracefully.*', { top: 172, size: 104, accentSize: 150, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: '#ff8fa0' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { ep: 4, at: T.bug })
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
    if (t > T.gasp + 0.3 && t < T.letterOut[0]) { mood = 'sparkle'; look = [0.8, -1] }
    if (t > T.letterOut[0] && t < T.reveal) { mood = 'squint'; look = [1, -1] }
    if (t > T.reveal && t < T.cut) { mood = 'wide'; look = [1, -1] }
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
  // the Virgo's clipboard: "things I like about you" (not the notes the Sag braced for)
  function clipboard(t, ok) {
    const k = pop01(t, T.clip, 0.35, 2) * ok * outK(t, [T.h2Out[0] - 0.15, T.h2Out[0] + 0.05])
    if (k <= 0.01) return
    const { w, h } = CLIP
    x.save(); x.translate(CLIP.x, CLIP.y); x.rotate(-0.05 + 0.02 * Math.sin(t * 2)); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#a8743c'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#f4efe2'; x.fillRect(-w / 2 + 18, -h / 2 + 34, w - 36, h - 52)
    x.fillStyle = INK; x.fillRect(-56, -h / 2 - 16, 112, 44); x.fillStyle = '#c9cbe0'; x.fillRect(-48, -h / 2 - 10, 96, 32)
    x.fillStyle = '#4a3a8a'; x.font = `800 24px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.fillText('things I like', -w / 2 + 34, -h / 2 + 76); x.fillText('about you:', -w / 2 + 34, -h / 2 + 104)
    const ITEMS = ['your laugh', 'your stories', 'on time (once)']
    ITEMS.forEach((s, i) => {
      const p = pop01(t, T.items[i], 0.22, 2.2)
      if (p <= 0.01) return
      const y = -h / 2 + 152 + i * 46
      x.save(); x.globalAlpha *= clamp(p * 2)
      x.fillStyle = '#2c2a7a'; x.font = `700 24px ${INTER}`; x.fillText(s, -w / 2 + 34, y)
      drawBits(x, ['.....G', '....GG', 'G..GG.', 'GGGG..', '.GG...'], { G: '#3fae5a' }, w / 2 - 50, y - 9, 4.5 * p, { outline: null })
      x.restore()
    })
    x.restore()
  }
  function duo(t) {
    if (t < T.duoIn || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const mv = ease.inOutCubic(prog(t, T.h2Out[0] - 0.1, T.h2Out[1] + 0.15))
    const V2 = { x: lerp(VIR_A.x, VIR_B.x, mv), y: lerp(VIR_A.y, VIR_B.y, mv), s: lerp(VIR_A.s, VIR_B.s, mv) }
    const S2 = { x: lerp(SAG_A.x, SAG_B.x, mv), y: lerp(SAG_A.y, SAG_B.y, mv), s: lerp(SAG_A.s, SAG_B.s, mv) }
    const vp = pop01(t, T.duoIn, 0.36, 2.1) * ok, sp = pop01(t, T.duoIn + 0.12, 0.36, 2.1) * ok
    let vm = 'neutral', vl = [1, 0]
    if (t > T.clip) { vm = 'happy'; vl = undefined }
    if (t > LINES[3].t && t < T.laugh) { vm = 'wink'; vl = undefined }
    if (t > T.laugh) vm = 'happy'
    let sm = 'neutral', sl = [-1, 0]
    if (t > T.brace && t < T.items[0]) { sm = 'squint'; sl = [-1, 0] }
    if (t > T.items[0]) { sm = 'wide'; sl = [-1, 1] }
    if (t > T.melt) { sm = 'heart'; sl = undefined }
    if (t > T.sagGasp && t < T.laugh) { sm = 'wide'; sl = [-1, 0] }
    if (t > T.laugh) sm = 'happy'
    const brace = t > T.brace && t < T.items[0] ? 0.12 * ease.outCubic(prog(t, T.brace, T.brace + 0.2)) : 0
    drawStarChar(x, V2.x, V2.y, V2.s, t, { color: VIR.color, glyph: VIR.glyph, mood: vm, look: vl, hops: VIR_HOPS, pop: vp, seed: 4, glow: 1.1 })
    drawStarChar(x, S2.x, S2.y, S2.s, t, { color: SAG.color, glyph: SAG.glyph, mood: sm, look: sl, hops: SAG_HOPS, pop: sp, seed: 9, glow: 1.1, squash: brace, blush: t > T.melt ? 1 : undefined, blink: sm === 'wide' ? false : undefined })
    if (t > T.brace && t < T.items[0] + 0.1) speech(t, S2.x, S2.y - 190, T.brace, 'here come the notes…', { size: 26, life: T.items[0] - T.brace + 0.1 })
    if (mv < 0.5) clipboard(t, ok)
    if (t > T.melt && t < T.melt + 0.8) sparkles(x, t, S2.x, S2.y, T.melt, 10, 170, 3, ['#ff4f86', BONE, GOLD])
    if (t > T.laugh && t < T.h2Out[0]) speech(t, (V2.x + S2.x) / 2, V2.y - 200, T.laugh, 'HA HA HA', { col: '#ffe9a8', size: 32, life: T.h2Out[0] - T.laugh })
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
        const glowA = 0.5 * clamp(prog(t, 0.3, 1.2)) * popOut(t, T.out)
        if (glowA > 0) { const gr = x.createRadialGradient(540, 930, 0, 540, 930, 620); gr.addColorStop(0, `rgba(255,214,150,${0.2 * glowA})`); gr.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = gr; x.fillRect(0, 300, 1080, 1300) }
        const lp = letterPose(t)
        const peek = ease.outBack(prog(t, ...T.pisPeek))
        if (t < T.letterOut[1] && peek > 0.01) pisces(t, { x: 852, y: lerp(600, 448, peek), s: 150, alpha: 1 - prog(t, ...T.letterOut) }, t > T.gasp + 0.3 ? 2 : t > 4.0 ? 1 : 0, t > T.gasp + 0.3 ? 'sparkle' : 'wide', [-1, 1])
        envelope(t, true)
        if (lp && t < T.letterBack[0]) drawLetter(x, t, L, lp)
        envelope(t, false)
        if (t > T.phoneIn[0] && t < T.phoneOut[1]) {
          const pin = easeOutBack(prog(t, ...T.phoneIn), 1.4), po = ease.inCubic(prog(t, ...T.phoneOut))
          drawPhone(x, t, { ...PHONE, top: PHONE.top + (1 - pin) * 900 + po * 900, title: 'the roast crew', msgs: MSGS, font: 28, alpha: 1 - po * 0.5 })
          if (t > T.crick && t < T.ohno[0]) { x.save(); x.globalAlpha = Math.sin(Math.PI * prog(t, T.crick, T.ohno[0])); x.font = `700 30px ${MONO}`; x.fillStyle = '#9fe6b0'; x.textAlign = 'center'; x.fillText('* chirp *', 540, 1345); x.restore() }
          pisces(t, { x: 935, y: 1150, s: 150, pop: pin * (1 - po) }, t > T.reveal ? 3 : 1, t > T.reveal ? 'wide' : 'squint', [-1, -0.5])
        }
        duo(t)
        if (t > T.h2 && t < T.h2Out[1]) pisces(t, { x: 960, y: 560, s: 105, pop: pop01(t, T.h2 + 0.6, 0.3, 2) * outK(t, T.h2Out) }, t > T.melt ? 3 : 1, 'sparkle', [-1, 1])
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

// card-cut candidates (cardfx keeps the middle one: 13.9, between the group chat and the answer)
const CUTS = [8.65, { t: T.cut, kind: 'flip' }, 22.65]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const scribble = (t0, d, gain = 0.011) => Array.from({ length: Math.floor(d / 0.085) }, (_, i) => ['tick', +(t0 + i * 0.085 + (i % 3) * 0.012).toFixed(3), gain * (0.7 + 0.3 * ((i * 7) % 3) / 2)])
export const CUES = [
  ...wordPops(T.h0, 9, 0.07, 0, 0.022),
  ['whoosh', T.envFly[0], 0.5, 0.05], ['tick', T.envFly[1], 0.05], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
  ['pop', T.sealPop, 1318.51, 0.05, 0], ['pop', T.sealPop + 0.05, 1760, 0.03, 0.2], ['glitter', T.sealPop, T.sealPop + 0.3],
  ['tick', T.flap[0] + 0.05, 0.04], ['whoosh', T.rise[0], 0.4, 0.035], ['whoosh', T.envDrop[0], 0.35, 0.025],
  ['tick', T.unfold[0] + 0.15, 0.045], ['tick', T.unfold[0] + 0.6, 0.045], ['pop', T.narIn + 0.05, 739.99, 0.035, -0.3],
  ...LETTER.flatMap(l => scribble(l.t, l.d)),
  ['pop', T.pisPeek[0] + 0.15, 987.77, 0.025, 0.4], ['pluck', T.gasp + 0.35, 1174.66, 0.03, 0.5, 0.4],
  // the group chat: roast pings, the reveal, crickets, the "oh no"s
  ['whoosh', T.phoneIn[0], 0.4, 0.035], ...wordPops(T.h1, 4, 0.12, 2, 0.024),
  ...MSGS.slice(0, 5).map((m, i) => ['pop', m.at, NOTE[(i * 2) % 7] * (m.side === 'R' ? 0.75 : 1.5), 0.04, m.side === 'R' ? 0.25 : -0.2]),
  ['pop', T.reveal, 440, 0.055, 0.25], ['tick', T.reveal + 0.02, 0.05],
  ['pluck', T.crick + 0.1, 2637, 0.012, 0.1, 0.3], ['pluck', T.crick + 0.19, 2637, 0.012, 0.1, 0.3], ['pluck', T.crick + 0.5, 2637, 0.012, 0.1, 0.3], ['pluck', T.crick + 0.59, 2637, 0.012, 0.1, 0.3],
  ...T.ohno.map((c, i) => ['pop', c, NOTE[i + 3] * 1.5, 0.045, -0.2]),
  ['whoosh', T.phoneOut[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS }),
  // the answer: duo, the brace, the clipboard, three ticks, the melt, the laugh
  ...wordPops(T.h2, 7, 0.1, 1, 0.022), ['pop', T.duoIn + 0.05, 880, 0.04, -0.3], ['pop', T.duoIn + 0.17, 659.25, 0.04, 0.3],
  ['tick', T.brace, 0.04], ['whoosh', T.clip - 0.05, 0.3, 0.03], ['pop', T.clip + 0.1, 739.99, 0.04, -0.3],
  ...T.items.map((c, i) => ['pluck', c, NOTE[i * 2 + 2], 0.04, 0.4, -0.3]),
  ['pluck', T.melt, 1174.66, 0.045, 0.5, 0.3], ['pluck', T.melt + 0.12, 1567.98, 0.04, 0.5, 0.3], ['glitter', T.melt, T.melt + 0.5],
  ['pop', T.sagGasp, 1567.98, 0.045, 0.3],
  ...[0, 0.15, 0.3, 0.45].map((d, i) => ['pop', T.laugh + d, NOTE[(i * 2 + 1) % 7], 0.03, i % 2 ? 0.25 : -0.25]),
  // the seal
  ['whoosh', T.letterBack[0], 0.4, 0.035],
  ...wordPops(T.h3, 3, 0.08, 0, 0.024), ['pop', T.h3Land, 1174.66, 0.045, 0],
  ['boom', T.seal, 0.3], ['tom', T.seal, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.seal, 0.07], ['bell', T.seal + 0.08, 1760, 0.03, 1.2, 0], ['glitter', T.seal + 0.05, T.seal + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
