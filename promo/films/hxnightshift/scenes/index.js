// hxnightshift: STAR MAIL, Houston letters. "I work nights at the hospital. When do I date?" (30 s vertical, music: dreamy)
// Story 0–25.6, then the shared end card. The show look lives in ./mail.js (identical in every Pack F film).
//   0.00–8.6   "“I work nights at the hospital. | When do I *date*?”"  Frame 0: the headline is up, the envelope is
//              mid-flight and THE STARS (gold quill) watch it land. The seal pops, the letter unfolds (drop 2.82) and
//              writes on: "Dear Stars, I'm a nurse on nights. Every match asks: "dinner at eight?" I'm mid-shift! So
//              when do I date??  — a sleepy Virgo, Houston". ♓ Pisces peeks over the corner and sniffles.
//   8.6–13.8   "Night or day? | The sky *argues.*"  THE MOON (in a nightcap) and THE SUN (in sunglasses) bicker in
//              bubbles: "dates are for moonlight!" / "she's AT WORK at night!" / "ok… a lunch date?" / "she's ASLEEP
//              at lunch!". THE STARS: "ok. when is she *awake*?" Both, slowly: "…sunrise?"
//  13.9        the one card cut.
//  14.0–22.4   "Love fits | *real* lives."  Sunrise over a pixel Houston skyline: the Sun rises behind it, the Moon
//              hangs on, yawning (it really is often still up after dawn). ♍ Virgo (badge lanyard) shuffles in off
//              shift, z's; ♑ Capricorn is already up with two coffees and pancakes. THE STARS: "dates don't have to be
//              at *night*." → "love fits around *real* lives." ♑: "I'm up at dawn anyway. pancakes?" ♍: "my dinner,
//              your breakfast!" Heart-eyes. Rewatch bait: the Moon's nightcap slides down over its eyes as it dozes off.
//  22.4–25.5   "Breakfast *counts*."  The letter comes back, a talk card ("Best breakfast you've ever had?") lands
//              on it and the wax seal THUNKs. Pisces fountains. Everything pops out by 25.5.
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
  GOLD, BONE, INK, MONO, BEAT, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  buildBug, makeLetter, penAt, drawLetter, drawEnvelope, drawSeal, drawQuill, LW,
  speech, drawTalkCard, drawSkyline,
} from './mail.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const VIR = signStar('virgo'), CAP = signStar('capricorn'), PIS = signStar('pisces')
const MOON = { color: '#c9d4ff' }, SUN = { color: '#ffa43a' }

// ── the timeline
const T = {
  bug: -1, h0: -1, h0Land: -0.3, h0Out: [8.45, 8.65],
  envFly: [-0.3, 0.45], sealPop: 0.9, flap: [1.0, 1.3], rise: [1.3, 1.76], envDrop: [1.7, 2.1], unfold: [1.9, 2.72],
  narIn: -1, pisPeek: [2.9, 3.3], gasp: 4.75,
  letterOut: [8.45, 8.8],
  h1: 8.75, h1Out: [13.55, 13.75],
  duelIn: 8.8, say: [9.05, 9.75, 10.45, 11.1], both: 12.75, duelOut: [13.4, 13.75],
  cut: 13.9,
  h2: 14.0, h2Out: [22.25, 22.45],
  dawn: [14.0, 17.2], virIn: 14.5, capIn: 14.15, wake: 17.1, myDinner: 21.15, heart: 21.4,
  h3: 22.5, h3Land: 23.1, letterBack: [22.4, 22.8], card: [22.7, 23.05], seal: 23.35,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE STARS', CSP = `${CAP.glyph}︎ CAPRICORN`
const LINES = [
  { t: 11.4, speaker: SPEAK, text: 'ok. when is she *awake?*' },
  { t: 14.35, speaker: SPEAK, text: "dates don't have to be at *night*." },
  { t: 17.05, speaker: SPEAK, text: 'love fits around *real* lives.' },
  { t: 19.45, speaker: CSP, color: '#c9b8ff', text: "I'm up at dawn anyway. *pancakes?*" },
]
const CPS = 30
const BOX1 = { open: 11.2, close: 13.7 }, BOX2 = { open: 14.15, close: 22.8 }

// the letter (handwriting writes on line by line)
const LETTER = [
  { text: 'Dear Stars,', t: BEAT(4) + 0.03, d: 0.45 },
  { text: "I'm a nurse on *nights*.", t: 3.3, d: 0.75 },
  { text: 'Every match asks: "dinner', t: 4.1, d: 0.75 },
  { text: 'at eight?" I\'m mid-shift!', t: 4.9, d: 0.75 },
  { text: 'So when do I *date*??', t: 5.75, d: 0.75 },
  { text: '— a sleepy Virgo, Houston', t: 6.65, d: 0.85, size: 48, align: 'right', y: 128 + 5 * 84 + 22 },
]
const L_AT = { cx: 540, cy: 905 }

// layout
const NAR_A = { x: 150, y: 1250, s: 200 }, NAR_B = { x: 150, y: 1290, s: 150 }
const MOON_A = { x: 290, y: 930, s: 240 }, SUN_A = { x: 790, y: 930, s: 240 }
const MOON_B = { x: 175, y: 560, s: 120 }
const VIR_B = { x: 330, y: 1040, s: 210 }, CAP_B = { x: 750, y: 1040, s: 210 }
const TABLE = { x0: 190, x1: 890, y: 1140 }
const CARD = { cx: 556, cy: 940, w: 380 }
const SKY_BASE = 1150

const NAR_HOPS = [0.2, ...talkHops(LINES, SPEAK, { cps: CPS })]
const CAP_HOPS = [T.capIn + 0.3, ...talkHops(LINES, CSP, { cps: CPS }), T.heart, T.seal + 0.05]
const VIR_HOPS = [T.wake, T.myDinner, T.heart + 0.1, T.seal + 0.08]
const MOON_HOPS = [T.duelIn + 0.2, T.say[0], T.say[0] + 0.3, T.say[2], T.say[2] + 0.3, T.both]
const SUN_HOPS = [T.duelIn + 0.35, T.say[1], T.say[1] + 0.3, T.say[3], T.say[3] + 0.3, T.both + 0.05]

// props (sprite-cell bitmaps)
const PANCAKES = ['....YY....', '.BBBBBBBB.', 'SSSSSSSSSS', '.BBBBBBBB.', 'BBBSBBBBBB', '.BBSBBBBB.', 'BBBBBBBBBB', 'PPPPPPPPPPPP'.slice(0, 10)]
const MUG = ['WWWWW..', 'WCCCWWW', 'WWWWW.W', 'WWWWW.W', 'WWWWWWW', 'WWWWW..', '.WWW...']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 19px 'EB Garamond'", "italic 500 15px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 16px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const L = makeLetter({ lines: LETTER })

  const H0 = popText(root, '“I work nights | at the hospital. | When do I *date?”*', { top: 150, size: 88, accentSize: 128, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: '#9fe6d8' })
  const H1 = popText(root, 'Night or day? | The sky *argues.*', { top: 178, size: 100, accentSize: 138, at: T.h1, gap: 0.1, accentColor: '#ffb35a' })
  const H2 = popText(root, 'Love fits | *real* lives.', { top: 178, size: 108, accentSize: 150, at: T.h2, gap: 0.12, accentColor: GOLD })
  const H3 = popText(root, 'Breakfast | *counts.*', { top: 172, size: 116, accentSize: 156, at: T.h3, gap: 0.12, accentColor: '#ffb35a' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const tag = (txt, col) => el('div', { position: 'absolute', left: '0px', top: '0px', width: '320px', textAlign: 'center', font: `700 26px ${MONO}`, letterSpacing: '0.12em', color: col, textShadow: '0 2px 8px rgba(6,4,18,0.95)', display: 'none' }, root, txt)
  const tagMoon = tag('☾ THE MOON', '#dfe6ff'), tagSun = tag('☀ THE SUN', '#ffc27a')
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
    if (t > T.gasp && t < T.letterOut[0]) { mood = 'wide'; look = [0.8, -1] }
    if (t > T.letterOut[0] && t < T.say[0]) mood = 'squint'
    if (t > T.say[0] && t < T.both) { mood = 'eyeroll'; look = undefined }
    if (t > T.both && t < T.cut) { mood = 'wide'; look = [1, -1] }
    if (t > T.cut) { mood = 'happy'; look = undefined }
    if (t > T.seal) mood = 'sparkle'
    drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood, look, hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05, blink: mood === 'wide' ? false : undefined })
    const F = starFrame(P.x, P.y, P.s, t, { pop: k, hops: NAR_HOPS, seed: 2 })
    const wig = t < T.letterOut[0] ? 0.08 * Math.sin(t * 9) : 0.04 * Math.sin(t * 2)
    drawQuill(x, F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.12, F.cell * 1.05, 0.55 + wig, clamp(k))
  }

  // the Moon: a pale star in a blue nightcap (slides down over its eyes when it dozes: `slip` 0…1)
  function moon(t, P, mood, look, slip = 0, hops = MOON_HOPS) {
    if ((P.pop ?? 1) <= 0.01) return
    const o = { color: MOON.color, mood, look, hops, pop: P.pop, seed: 11, glow: 0.9 }
    drawStarChar(x, P.x, P.y, P.s, t, o)
    const F = starFrame(P.x, P.y, P.s, t, o)
    inSprite(x, F, () => {
      const dy = slip * 9
      x.fillStyle = INK; x.beginPath(); x.moveTo(9, 13 + dy); x.lineTo(27, 13 + dy); x.lineTo(31, 3 + dy * 0.6); x.closePath(); x.fill()
      x.fillStyle = '#4f6fd8'; x.beginPath(); x.moveTo(10.5, 12 + dy); x.lineTo(25.5, 12 + dy); x.lineTo(30, 4.5 + dy * 0.6); x.closePath(); x.fill()
      x.fillStyle = '#7f9cf0'; x.fillRect(12, 10 + dy, 6, 1)
      x.fillStyle = BONE; x.fillRect(9, 12 + dy, 19, 2.4)
      x.fillStyle = INK; x.fillRect(29.4, 2 + dy * 0.6, 4.2, 4.2); x.fillStyle = BONE; x.fillRect(30, 2.6 + dy * 0.6, 3, 3)
    })
  }
  // the Sun: an orange star in pixel sunglasses, with slow-turning rays
  function sun(t, P, mood, look, hops = SUN_HOPS) {
    const k = P.pop ?? 1
    if (k <= 0.01) return
    x.save(); x.translate(P.x, P.y - P.s * 0.04)
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2 + t * 0.4, r0 = P.s * 0.52 * k, r1 = P.s * (0.66 + 0.04 * Math.sin(t * 4 + i)) * k
      const c = Math.max(4, Math.round(P.s / 36))
      for (let r = r0; r < r1; r += c) { x.fillStyle = i % 2 ? '#ffd36a' : '#ff9a3a'; x.fillRect(Math.round(Math.cos(a) * r / c) * c, Math.round(Math.sin(a) * r / c) * c, c, c) }
    }
    x.restore()
    const o = { color: SUN.color, mood, look, hops, pop: k, seed: 13, glow: 1.2 }
    drawStarChar(x, P.x, P.y, P.s, t, o)
    if (P.shades === false) return
    const F = starFrame(P.x, P.y, P.s, t, o)
    inSprite(x, F, () => {
      x.fillStyle = INK; x.fillRect(8, 16.5, 21, 1.4); x.fillRect(8.5, 16.5, 8.5, 5); x.fillRect(19.5, 16.5, 8.5, 5)
      x.fillStyle = '#3a2d74'; x.fillRect(9.5, 17.6, 6.5, 2.9); x.fillRect(20.5, 17.6, 6.5, 2.9)
      x.fillStyle = '#9fe8ff'; x.fillRect(10, 18, 2, 1); x.fillRect(21, 18, 2, 1)
    })
  }

  // beat 2: the Moon and the Sun bicker
  function duel(t) {
    if (t < T.duelIn || t > T.duelOut[1]) return
    const ok = outK(t, T.duelOut)
    const mk = pop01(t, T.duelIn, 0.36, 2.1) * ok, sk = pop01(t, T.duelIn + 0.15, 0.36, 2.1) * ok
    const bump = t > T.say[3] + 0.4 && t < T.both ? 30 * Math.sin(Math.PI * clamp((t - T.say[3] - 0.4) / 0.5)) : 0
    const mm = t > T.both ? 'wide' : t > T.say[1] && t < T.say[2] ? 'squint' : 'neutral'
    const sm = t > T.both ? 'wide' : t > T.say[2] && t < T.say[3] ? 'squint' : 'neutral'
    moon(t, { ...MOON_A, x: MOON_A.x + bump, pop: mk }, mm, t > T.both ? [0.3, 1] : [1, 0])
    sun(t, { ...SUN_A, x: SUN_A.x - bump, pop: sk }, sm, t > T.both ? [-0.3, 1] : [-1, 0])
    const sayL = ['dates are for moonlight!', "she's AT WORK at night!", 'ok… a lunch date?', "she's ASLEEP at lunch!"]
    T.say.forEach((s0, i) => {
      const next = T.say[i + 2] ?? T.both
      speech(x, t, i % 2 ? 750 : 330, i % 2 ? 735 : 610, s0, sayL[i], { life: next - s0 - 0.02, col: i % 2 ? '#ffe2b8' : '#dfe6ff', tail: i % 2 ? 0.3 : -0.3, size: 36 })
    })
    speech(x, t, 540, 690, T.both, '…sunrise?', { life: T.duelOut[0] - T.both, col: '#ffd0a0', size: 40 })
    // Pisces in the corner, crying at the fight
    pisces(t, { x: 950, y: 1250, s: 120, pop: pop01(t, T.duelIn + 0.6, 0.3, 2) * ok }, t > T.say[3] ? 3 : 2, 'wide', [-1, -0.4])
  }

  // beat 3: sunrise, the skyline, breakfast
  function dawn(t) {
    if (t < T.h2 || t > T.h2Out[1] + 0.2) return
    const ok = outK(t, [T.h2Out[0] - 0.05, T.h2Out[1] + 0.15]), d = ease.inOutQuad(prog(t, ...T.dawn))
    // the warm wash
    x.save(); x.globalAlpha = ok * d
    const g = x.createLinearGradient(0, 600, 0, SKY_BASE); g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(0.55, 'rgba(255,128,96,0.32)'); g.addColorStop(1, 'rgba(255,196,110,0.6)')
    x.fillStyle = g; x.fillRect(0, 600, 1080, SKY_BASE - 600)
    x.restore()
    // the Moon hangs on, top left, dozing (rewatch bait: its nightcap slips over its eyes)
    const slip = ease.inOutCubic(prog(t, 18.6, 21.0))
    moon(t, { ...MOON_B, pop: pop01(t, T.h2 + 0.3, 0.36, 2) * ok }, slip > 0.5 ? 'sleepy' : 'sleepy', [0, 0], slip, [T.h2 + 0.6])
    // the Sun rises behind the skyline
    const sy = lerp(SKY_BASE + 40, 800, ease.outCubic(prog(t, T.dawn[0] + 0.2, T.dawn[1])))
    sun(t, { x: 860, y: sy, s: 200, pop: ok }, t > T.wake ? 'happy' : 'neutral', [-1, 0.5], [T.dawn[1], T.heart])
    drawSkyline(x, SKY_BASE, { alpha: ok * clamp(prog(t, T.h2, T.h2 + 0.35) * 1.2), lit: 1 - 0.7 * d, t, seed: 21 })
    // Virgo shuffles in off shift (badge on a lanyard), Capricorn already up
    const vin = ease.outCubic(prog(t, T.virIn, T.virIn + 0.9)), cin = pop01(t, T.capIn, 0.36, 2.1) * ok
    const VX = lerp(-140, VIR_B.x, vin)
    const vm = t < T.wake ? 'sleepy' : t > T.heart ? 'heart' : t > LINES[3].t ? 'sparkle' : 'happy'
    const vo = { color: VIR.color, glyph: VIR.glyph, mood: vm, hops: VIR_HOPS, seed: 5, glow: 1.05, pop: ok, look: t < T.heart ? [1, 0] : undefined }
    drawStarChar(x, VX, VIR_B.y, VIR_B.s, t, vo)
    const F = starFrame(VX, VIR_B.y, VIR_B.s, t, vo)
    inSprite(x, F, () => {
      x.fillStyle = INK; x.fillRect(17.4, 27.6, 1.2, 1.2)
      x.fillStyle = INK; x.fillRect(15.5, 28.6, 5, 4.4); x.fillStyle = BONE; x.fillRect(16, 29.1, 4, 3.4); x.fillStyle = '#4fd0c0'; x.fillRect(16.4, 29.6, 1.4, 1.4); x.fillStyle = '#8a83b8'; x.fillRect(18.2, 29.8, 1.4, 0.5); x.fillRect(18.2, 30.8, 1.4, 0.5)
    })
    const cm = t > T.heart ? 'heart' : t > LINES[3].t ? 'happy' : 'neutral'
    drawStarChar(x, CAP_B.x, CAP_B.y, CAP_B.s, t, { color: CAP.color, glyph: CAP.glyph, mood: cm, look: t < T.heart ? [-1, 0] : undefined, hops: CAP_HOPS, seed: 8, glow: 1.05, pop: cin })
    // the table: pancakes + two coffees (steam)
    const tk = pop01(t, T.h2 + 0.25, 0.3, 1.8) * ok
    if (tk > 0.01) {
      x.save(); x.translate(540, TABLE.y); x.scale(tk, tk); x.translate(-540, -TABLE.y)
      x.fillStyle = INK; x.fillRect(TABLE.x0 - 6, TABLE.y - 6, TABLE.x1 - TABLE.x0 + 12, 46)
      x.fillStyle = '#8a4f34'; x.fillRect(TABLE.x0, TABLE.y, TABLE.x1 - TABLE.x0, 34)
      x.fillStyle = '#b06a44'; x.fillRect(TABLE.x0, TABLE.y, TABLE.x1 - TABLE.x0, 8)
      x.fillStyle = INK; x.fillRect(TABLE.x0 + 40, TABLE.y + 40, 24, 170); x.fillRect(TABLE.x1 - 64, TABLE.y + 40, 24, 170)
      x.fillStyle = '#6a3a26'; x.fillRect(TABLE.x0 + 44, TABLE.y + 40, 16, 166); x.fillRect(TABLE.x1 - 60, TABLE.y + 40, 16, 166)
      drawBits(x, ['PPPPPPPPPPPPPP'], { P: BONE }, 540, TABLE.y - 8, 12)
      drawBits(x, PANCAKES, { Y: '#ffe27a', B: '#e8a85a', S: '#9c4a1c', P: '#e8a85a' }, 540, TABLE.y - 58, 11)
      drawBits(x, MUG, { W: BONE, C: '#6a3a26' }, 410, TABLE.y - 40, 9)
      drawBits(x, MUG, { W: '#ffd0a0', C: '#6a3a26' }, 680, TABLE.y - 40, 9, { sx: -1 })
      for (const mx of [400, 680]) for (let i = 0; i < 3; i++) {
        const ph = ((t * 0.8 + i / 3 + mx) % 1)
        x.fillStyle = `rgba(239,230,214,${0.5 * (1 - ph)})`; x.fillRect(Math.round(mx + 8 * Math.sin(ph * 6 + i)), Math.round(TABLE.y - 80 - ph * 70), 8, 8)
      }
      x.restore()
    }
    speech(x, t, 340, 820, T.myDinner, 'my dinner, your breakfast!', { life: T.h2Out[0] - T.myDinner, col: '#c8f0e4', size: 30, tail: -0.3 })
    if (t > T.heart && t < T.heart + 0.8) sparkles(x, t, 540, 960, T.heart, 10, 220, 3, ['#ff4f86', BONE, GOLD])
    // Pisces peeks over the table edge, sniffling into a napkin
    pisces(t, { x: 965, y: 1235, s: 105, pop: pop01(t, T.h2 + 1.2, 0.3, 2) * ok }, t > T.heart ? 3 : 1, 'sparkle', [-1, -0.5])
  }

  function talkCard(t) {
    if (t < T.card[0]) return
    const k = easeOutBack(prog(t, ...T.card), 1.4), ok = popOut(t, T.out)
    if (ok <= 0) return
    drawTalkCard(x, lerp(1300, CARD.cx, k), lerp(700, CARD.cy, k), CARD.w * ok, { q: "Best breakfast you've ever had?", rot: lerp(0.8, 0.06, k), icon: 'sun' })
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
        const glowA = 0.5 * popOut(t, T.out) * (t < T.h2 || t > T.h2Out[1] ? 1 : 0)
        if (glowA > 0) { const g = x.createRadialGradient(540, 930, 0, 540, 930, 620); g.addColorStop(0, `rgba(255,214,150,${0.2 * glowA})`); g.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1300) }
        const lp = letterPose(t)
        const peek = ease.outBack(prog(t, ...T.pisPeek))
        if (t < T.letterOut[1] && peek > 0.01) pisces(t, { x: 852, y: lerp(600, 448, peek), s: 150, alpha: 1 - prog(t, ...T.letterOut) }, t > T.gasp ? 2 : t > 3.9 ? 1 : 0, t > T.gasp ? 'wide' : 'sparkle', [-1, 1])
        envelope(t, true)
        if (lp && t < T.letterBack[0]) drawLetter(x, t, L, lp)
        envelope(t, false)
        duel(t)
        dawn(t)
        if (lp && t >= T.letterBack[0]) drawLetter(x, t, L, lp)
        talkCard(t)
        if (t > T.letterBack[0]) pisces(t, { x: 900, y: 560, s: 140, pop: pop01(t, T.letterBack[0] + 0.1, 0.3, 2) * popOut(t, T.out) }, t > T.seal ? 3 : 2, t > T.seal ? 'happy' : 'wide', [-1, 1])
        drawSeal(x, CARD.cx, CARD.cy + 238, 150, t, T.seal, { alpha: popOut(t, T.out) })
        sparkles(x, t, CARD.cx, CARD.cy + 238, T.seal + 0.02, 12, 150, 1, [GOLD, '#ffb35a', BONE])
        narrator(t)
      }
      x.restore()
      // name tags under the Moon and the Sun (beat 2)
      const lk = pop01(t, T.duelIn + 0.35, 0.3, 2) * outK(t, T.duelOut)
      for (const [e, P] of [[tagMoon, MOON_A], [tagSun, SUN_A]]) {
        const on = lk > 0.01 && t > T.duelIn && t < T.duelOut[1]
        e.style.display = on ? 'block' : 'none'
        if (on) { e.style.left = (P.x - 160) + 'px'; e.style.top = (P.y + 150) + 'px'; e.style.opacity = String(clamp(lk)); e.style.transform = `scale(${lk.toFixed(3)})` }
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
  // cold open: the envelope lands, seal pop, flap, letter rises + unfolds
  ['pop', 0.02, 1174.66, 0.04, 0], ['whoosh', 0.0, 0.4, 0.04], ['tick', T.envFly[1], 0.05],
  ['pop', T.sealPop, 1318.51, 0.05, 0], ['pop', T.sealPop + 0.05, 1760, 0.03, 0.2], ['glitter', T.sealPop, T.sealPop + 0.3],
  ['tick', T.flap[0] + 0.05, 0.04], ['whoosh', T.rise[0], 0.4, 0.035], ['whoosh', T.envDrop[0], 0.35, 0.025],
  ['tick', T.unfold[0] + 0.15, 0.045], ['tick', T.unfold[0] + 0.6, 0.045],
  ...LETTER.flatMap(l => scribble(l.t, l.d)),
  ['pop', T.pisPeek[0] + 0.15, 987.77, 0.025, 0.4], ['pluck', T.gasp + 0.05, 659.25, 0.03, 0.5, 0.4],
  // the Moon vs the Sun
  ['whoosh', T.duelIn, 0.4, 0.035], ...wordPops(T.h1, 6, 0.1, 2, 0.022),
  ['pop', T.duelIn + 0.05, 659.25, 0.04, -0.4], ['pop', T.duelIn + 0.2, 987.77, 0.04, 0.4],
  ...T.say.map((s, i) => ['pop', s, i % 2 ? 1318.51 : 739.99, 0.045, i % 2 ? 0.4 : -0.4]),
  ['tom', T.say[3] + 0.6, 110, { gain: 0.18, decay: 0.2 }],
  ['pluck', T.both, 880, 0.035, 0.6, 0], ['pluck', T.both + 0.18, 1174.66, 0.035, 0.6, 0],
  ...talkCues(LINES, { cps: CPS }),
  // sunrise + breakfast
  ['riser', T.dawn[0] + 0.2, T.dawn[1], 0.025], ...wordPops(T.h2, 4, 0.12, 1, 0.024), ['bell', T.dawn[1], 1760, 0.025, 1.0, 0.3],
  ['pop', T.capIn + 0.05, 880, 0.035, 0.3], ['whoosh', T.virIn, 0.5, 0.025], ['pop', T.wake, 1174.66, 0.035, -0.3],
  ['pop', T.myDinner, 1318.51, 0.04, -0.3], ['pluck', T.heart, 1174.66, 0.045, 0.5, 0], ['pluck', T.heart + 0.12, 1567.98, 0.04, 0.5, 0], ['glitter', T.heart, T.heart + 0.4],
  // the seal: letter back, talk card lands, THUNK
  ['whoosh', T.letterBack[0], 0.4, 0.035], ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ...wordPops(T.h3, 2, 0.12, 0, 0.03), ['pop', T.h3 + 0.24, 1567.98, 0.04, 0],
  ['boom', T.seal, 0.3], ['tom', T.seal, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.seal, 0.07], ['bell', T.seal + 0.08, 1760, 0.03, 1.2, 0], ['glitter', T.seal + 0.05, T.seal + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
