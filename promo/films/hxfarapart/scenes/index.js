// hxfarapart: STAR MAIL, Houston letters. "They live across the Beltway." (30 s vertical, music: cinematic)
// Story 0–25.6, then the shared end card. The show look lives in ./mail.js (identical in every Pack F film).
//   0.00–8.6   "“They live across | the *Beltway.”*"  Frame 0: the headline is up, the envelope is mid-flight, THE STARS
//              (gold quill) watch it land. The letter unfolds (drop 2.82) and writes on: "Dear Stars, I live inside
//              the Loop. They live way out past the *Beltway*. Who drives?? Every time it's me.  — a tired Taurus,
//              Houston". ♓ Pisces peeks over the corner and sniffles.
//   8.6–13.8   "Inside the Loop. | *Outside* the Beltway."  A pixel map: two rings (the Loop, the Beltway), ♉ in the
//              middle, ♐ way out past the outer ring, and one little green car that makes every trip. ♑ Capricorn:
//              "split it EXACTLY. spreadsheet!" / ♈ Aries: "whoever likes them more drives!" / ♑ "track the MILES!" /
//              ♈ "make it a RACE!". THE STARS: "no *scorekeeping.*"
//  13.9        the one card cut.
//  14.0–22.4   "The middle is | a *place* too."  The map again: a pin drops halfway, a little park with a pond. Both
//              cars drive in and meet there; a TURN sign flips between ♉ and ♐. THE STARS: "take *turns* driving.
//              simple." → "and the middle is a *place* too." ♐: "halfway? there's a park with *ducks*." ♉: "…I *love*
//              ducks." Rewatch bait: a duck waddles all the way round the Beltway, both beats.
//  22.4–25.5   "Take *turns.*"  The letter comes back, a talk card ("Road trip snacks: sweet or salty?") lands and the
//              wax seal THUNKs. Pisces fountains. Everything pops out by 25.5.
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
  speech, drawTalkCard,
} from './mail.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const TAU = signStar('taurus'), SAG = signStar('sagittarius'), CAP = signStar('capricorn'), ARI = signStar('aries'), PIS = signStar('pisces')

// ── the timeline
const T = {
  bug: -1, h0: -1, h0Land: -0.3, h0Out: [8.45, 8.65],
  envFly: [-0.3, 0.45], sealPop: 0.9, flap: [1.0, 1.3], rise: [1.3, 1.76], envDrop: [1.7, 2.1], unfold: [1.9, 2.72],
  narIn: -1, pisPeek: [2.9, 3.3], gasp: 4.9,
  letterOut: [8.45, 8.8],
  h1: 8.75, h1Out: [13.55, 13.75],
  b2In: 8.8, say: [9.2, 9.8, 10.4, 10.9], b2Out: [13.4, 13.75],
  cut: 13.9,
  h2: 14.0, h2Out: [22.25, 22.45],
  mapIn: 14.05, pin: 15.0, drive: [16.0, 17.6], meet: 17.6, turn: [18.2, 19.4, 20.6, 21.8], ducks: 20.75,
  h3: 22.5, letterBack: [22.4, 22.8], card: [22.7, 23.05], seal: 23.35,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE STARS', SSP = `${SAG.glyph}︎ SAGITTARIUS`, TSP = `${TAU.glyph}︎ TAURUS`
const LINES = [
  { t: 11.6, speaker: SPEAK, text: 'no *scorekeeping.*' },
  { t: 14.35, speaker: SPEAK, text: 'take *turns* driving. simple.' },
  { t: 16.3, speaker: SPEAK, text: 'and the middle is a *place* too.' },
  { t: 18.3, speaker: SSP, color: '#ffb38a', text: "halfway? there's a park with *ducks*." },
  { t: 20.55, speaker: TSP, color: '#9fe6b0', text: '…I *love* ducks.' },
]
const CPS = 30
const BOX1 = { open: 11.4, close: 13.7 }, BOX2 = { open: 14.15, close: 22.8 }

const LETTER = [
  { text: 'Dear Stars,', t: BEAT(4) + 0.03, d: 0.45 },
  { text: 'I live inside the Loop.', t: 3.3, d: 0.75 },
  { text: 'They live way out past', t: 4.1, d: 0.7 },
  { text: 'the *Beltway*. Who drives??', t: 4.85, d: 0.85 },
  { text: "Every time it's me.", t: 5.8, d: 0.65 },
  { text: '— a tired Taurus, Houston', t: 6.7, d: 0.85, size: 48, align: 'right', y: 128 + 5 * 84 + 22 },
]
const L_AT = { cx: 540, cy: 905 }

// layout
const NAR_A = { x: 150, y: 1250, s: 200 }, NAR_B = { x: 140, y: 1300, s: 130 }
const MAP = { cx: 540, cy: 880, loop: 125, belt: 300 }
const HOME_T = { x: 540, y: 875 }, HOME_S = { x: 890, y: 1170 }
const MID = { x: lerp(HOME_T.x, HOME_S.x, 0.56), y: lerp(HOME_T.y, HOME_S.y, 0.56) }
const CAP_A = { x: 165, y: 600, s: 130 }, ARI_A = { x: 915, y: 600, s: 130 }
const CARD = { cx: 556, cy: 940, w: 380 }

const NAR_HOPS = [0.2, ...talkHops(LINES, SPEAK, { cps: CPS })]
const CAP_HOPS = [T.b2In + 0.3, T.say[0], T.say[0] + 0.3, T.say[2], T.say[2] + 0.3]
const ARI_HOPS = [T.b2In + 0.45, T.say[1], T.say[1] + 0.3, T.say[3], T.say[3] + 0.25]
const TAU_HOPS = [T.meet, T.meet + 0.35, ...talkHops(LINES, TSP, { cps: CPS }), T.seal + 0.05]
const SAG_HOPS = [T.meet + 0.1, ...talkHops(LINES, SSP, { cps: CPS }), T.ducks + 0.3]

const CAR = ['..CCCC..', '.CwwwwC.', 'CCCCCCCC', 'CCcCCcCC', '.k....k.']
const DUCK = ['.YY..', 'YYYO.', '.YY..', 'YYYYY', '.YYY.']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 19px 'EB Garamond'", "italic 500 15px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 16px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const L = makeLetter({ lines: LETTER })

  const H0 = popText(root, '“They live across | the *Beltway.”*', { top: 160, size: 100, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: '#8fb8ff' })
  const H1 = popText(root, 'Inside the Loop. | *Outside* the Beltway.', { top: 178, size: 82, accentSize: 116, at: T.h1, gap: 0.08, accentColor: '#8fb8ff' })
  const H2 = popText(root, 'The middle is | a *place* too.', { top: 178, size: 100, accentSize: 146, at: T.h2, gap: 0.1, accentColor: GOLD })
  const H3 = popText(root, 'Take | *turns.*', { top: 172, size: 120, accentSize: 176, at: T.h3, gap: 0.14, accentColor: '#9fe6b0' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const tag = (txt, col) => el('div', { position: 'absolute', left: '0px', top: '0px', width: '320px', textAlign: 'center', font: `700 24px ${MONO}`, letterSpacing: '0.12em', color: col, textShadow: '0 2px 8px rgba(6,4,18,0.95)', display: 'none' }, root, txt)
  const tagC = tag(`${CAP.glyph}︎ CAPRICORN`, '#c9b8ff'), tagA = tag(`${ARI.glyph}︎ ARIES`, '#ff9a8a')
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
    if (t > T.say[0] && t < LINES[0].t) { mood = 'eyeroll'; look = undefined }
    if (t > LINES[0].t) { mood = 'happy'; look = undefined }
    if (t > T.seal) mood = 'sparkle'
    drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood, look, hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05, blink: mood === 'wide' ? false : undefined })
    const F = starFrame(P.x, P.y, P.s, t, { pop: k, hops: NAR_HOPS, seed: 2 })
    const wig = t < T.letterOut[0] ? 0.08 * Math.sin(t * 9) : 0.04 * Math.sin(t * 2)
    drawQuill(x, F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.12, F.cell * 1.05, 0.55 + wig, clamp(k))
  }

  // the pixel map: two stepped rings + faint freeway spokes (schematic, not to scale)
  function ring(r, col, C = 10) {
    const n = Math.ceil(2 * Math.PI * r / C)
    x.fillStyle = col
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; x.fillRect(Math.round((MAP.cx + Math.cos(a) * r) / C) * C - C / 2, Math.round((MAP.cy + Math.sin(a) * r) / C) * C - C / 2, C * 1.6, C * 1.6) }
  }
  function map(t, k) {
    if (k <= 0.01) return
    x.save(); x.translate(MAP.cx, MAP.cy); x.scale(k, k); x.translate(-MAP.cx, -MAP.cy)
    x.fillStyle = 'rgba(20,13,51,0.72)'; x.beginPath(); x.arc(MAP.cx, MAP.cy, MAP.belt + 330, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(143,184,255,0.18)'
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.2; for (let r = MAP.loop; r < MAP.belt + 300; r += 18) x.fillRect(Math.round(MAP.cx + Math.cos(a) * r) - 4, Math.round(MAP.cy + Math.sin(a) * r) - 4, 8, 8) }
    ring(MAP.belt, '#8fb8ff'); ring(MAP.loop, GOLD)
    x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = GOLD; x.fillText('THE LOOP', MAP.cx, MAP.cy - MAP.loop - 26)
    x.fillStyle = '#8fb8ff'; x.fillText('BELTWAY', MAP.cx, MAP.cy - MAP.belt - 26)
    x.restore()
  }
  function home(X, Y, col) {
    drawBits(x, ['..R..', '.RRR.', 'RRRRR', '.WWW.', '.WDW.'], { R: col, W: BONE, D: INK }, X, Y, 7)
  }
  function car(X, Y, col, flip = false, k = 1) {
    if (k <= 0.01) return
    drawBits(x, CAR, { C: col, w: '#cfe8ff', c: BONE, k: INK }, X, Y, 8 * k, { sx: flip ? -1 : 1 })
  }
  function duck(t, a0, k) {
    if (k <= 0.01) return
    const a = a0 + t * 0.18, r = MAP.belt + 22
    drawBits(x, DUCK, { Y: '#ffd84a', O: '#ff9a3a' }, MAP.cx + Math.cos(a) * r, MAP.cy + Math.sin(a) * r + Math.abs(Math.sin(t * 10)) * -3, 4 * k, { sx: -1 })
  }

  // beat 2: one car does every trip; the arguers
  function trips(t) {
    if (t < T.b2In || t > T.b2Out[1]) return
    const ok = outK(t, T.b2Out)
    const mk = pop01(t, T.b2In, 0.4, 1.8) * ok
    map(t, mk)
    if (mk > 0.5) {
      home(HOME_T.x, HOME_T.y + 60, '#5fd38a'); home(HOME_S.x, HOME_S.y + 60, '#ff9a5a')
      drawStarChar(x, HOME_T.x, HOME_T.y, 120, t, { color: TAU.color, mood: t > T.say[0] ? 'sleepy' : 'neutral', zzz: true, look: [1, 1], seed: 9, glow: 0.9, pop: mk })
      drawStarChar(x, HOME_S.x, HOME_S.y, 120, t, { color: SAG.color, mood: 'happy', look: [-1, -1], seed: 7, glow: 0.9, pop: mk })
      // the one green car, back and forth, back and forth (a dotted trail)
      const ph = ((t - T.b2In) / 1.1) % 2, f = ph < 1 ? ease.inOutQuad(ph) : ease.inOutQuad(2 - ph)
      x.fillStyle = 'rgba(95,211,138,0.5)'
      for (let s = 0.1; s < 0.92; s += 0.06) x.fillRect(Math.round(lerp(HOME_T.x, HOME_S.x, s) / 6) * 6, Math.round(lerp(HOME_T.y + 40, HOME_S.y + 40, s) / 6) * 6, 6, 6)
      car(lerp(HOME_T.x + 40, HOME_S.x - 50, f), lerp(HOME_T.y + 40, HOME_S.y + 30, f), '#5fd38a', ph >= 1)
      duck(t, 2.2, mk)
    }
    const ck = pop01(t, T.b2In + 0.3, 0.35, 2.1) * ok, ak = pop01(t, T.b2In + 0.45, 0.35, 2.1) * ok
    drawStarChar(x, CAP_A.x, CAP_A.y, CAP_A.s, t, { color: CAP.color, glyph: CAP.glyph, mood: t > T.say[0] ? 'squint' : 'neutral', look: [1, 0.3], hops: CAP_HOPS, pop: ck, seed: 5, glow: 1 })
    drawStarChar(x, ARI_A.x, ARI_A.y, ARI_A.s, t, { color: ARI.color, glyph: ARI.glyph, mood: t > T.say[1] ? 'wide' : 'happy', look: [-1, 0.3], hops: ARI_HOPS, pop: ak, seed: 3, glow: 1.05 })
    const sayL = ['split it EXACTLY. spreadsheet!', 'whoever likes them more drives!', 'track the MILES!', 'make it a RACE!']
    T.say.forEach((s0, i) => speech(x, t, i % 2 ? 720 : 360, i % 2 ? 515 : 455, s0, sayL[i], { life: (T.say[i + 2] ?? T.b2Out[0]) - s0 - 0.02, col: i % 2 ? '#ffd0c8' : '#e4dcff', tail: i % 2 ? 0.7 : -0.7, size: 32 }))
    pisces(t, { x: 110, y: 1010, s: 100, pop: pop01(t, T.b2In + 0.8, 0.3, 2) * ok }, 2, 'wide', [1, -0.5])
  }

  // beat 3: the halfway park, two cars, turns
  function middle(t) {
    if (t < T.h2 || t > T.h2Out[1] + 0.2) return
    const ok = outK(t, [T.h2Out[0] - 0.05, T.h2Out[1] + 0.15])
    const mk = pop01(t, T.mapIn, 0.4, 1.8) * ok
    map(t, mk)
    if (mk < 0.3) return
    home(HOME_T.x, HOME_T.y + 60, '#5fd38a'); home(HOME_S.x, HOME_S.y + 60, '#ff9a5a')
    duck(t, 4.0, mk)
    // the pin + the park (a pond with ducks)
    const pk = easeOutBack(prog(t, T.pin, T.pin + 0.35), 2)
    if (pk > 0) {
      x.save(); x.globalAlpha = ok
      x.fillStyle = '#2f9e5a'; x.beginPath(); x.ellipse(MID.x, MID.y + 20, 100 * pk, 54 * pk, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#4f8df0'; x.beginPath(); x.ellipse(MID.x + 10, MID.y + 26, 48 * pk, 22 * pk, 0, 0, Math.PI * 2); x.fill()
      if (pk > 0.9) { for (let i = 0; i < 2; i++) drawBits(x, DUCK, { Y: '#ffd84a', O: '#ff9a3a' }, MID.x - 10 + i * 34 + 6 * Math.sin(t * 1.5 + i), MID.y + 22, 3.4) }
      const py = MID.y - 60 - (1 - clamp(prog(t, T.pin, T.pin + 0.25))) * 300
      drawBits(x, ['.RRR.', 'RRWRR', 'RRRRR', '.RRR.', '..R..', '..R..'], { R: '#ff4f6a', W: BONE }, MID.x, py, 8)
      x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('HALFWAY PARK', MID.x, MID.y + 120)
      x.restore()
    }
    // both cars drive in and meet
    const d = ease.inOutCubic(prog(t, ...T.drive))
    if (t > T.drive[0] - 0.3) {
      car(lerp(HOME_T.x + 30, MID.x - 70, d), lerp(HOME_T.y + 40, MID.y - 10, d), '#5fd38a', false, ok)
      car(lerp(HOME_S.x - 40, MID.x + 70, d), lerp(HOME_S.y + 30, MID.y - 10, d), '#ff9a5a', true, ok)
    }
    // the two of them pop out at the park
    const sk = pop01(t, T.meet, 0.35, 2.2) * ok
    const tm = t > T.ducks ? 'heart' : t > LINES[3].t ? 'wide' : 'happy'
    drawStarChar(x, MID.x - 120, MID.y - 110, 120, t, { color: TAU.color, glyph: TAU.glyph, mood: tm, look: [1, 0], hops: TAU_HOPS, pop: sk, seed: 9, glow: 1 })
    drawStarChar(x, MID.x + 120, MID.y - 110, 120, t, { color: SAG.color, glyph: SAG.glyph, mood: t > T.ducks ? 'heart' : 'happy', look: [-1, 0], hops: SAG_HOPS, pop: sk, seed: 7, glow: 1 })
    if (t > T.ducks && t < T.ducks + 0.8) sparkles(x, t, MID.x, MID.y - 110, T.ducks, 10, 160, 3, ['#ff4f86', BONE, GOLD])
    // the TURN sign flips between ♉ and ♐
    const tk = pop01(t, T.turn[0] - 0.3, 0.35, 2) * ok
    if (tk > 0.01) {
      const n = T.turn.filter(s => t > s).length, flip = Math.min(...T.turn.map(s => Math.abs(t - s))), sx = flip < 0.12 ? Math.abs(flip / 0.12) : 1
      x.save(); x.translate(250, 600); x.scale(tk * sx, tk)
      x.fillStyle = INK; x.fillRect(-110, -60, 220, 120); x.fillStyle = n % 2 ? '#ffe2cf' : '#d4f5dc'; x.fillRect(-104, -54, 208, 108)
      x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DRIVER:', 0, -24)
      x.font = `800 34px Inter`; x.fillStyle = n % 2 ? '#c8582a' : '#2f9e5a'; x.fillText(n % 2 ? `${SAG.glyph}︎ SAG` : `${TAU.glyph}︎ TAURUS`, 0, 20)
      x.restore()
    }
    pisces(t, { x: 920, y: 600, s: 105, pop: pop01(t, T.h2 + 1, 0.3, 2) * ok }, t > T.ducks ? 3 : 1, 'sparkle', [-1, 0.5])
  }

  function talkCard(t) {
    if (t < T.card[0]) return
    const k = easeOutBack(prog(t, ...T.card), 1.4), ok = popOut(t, T.out)
    if (ok <= 0) return
    drawTalkCard(x, lerp(1300, CARD.cx, k), lerp(700, CARD.cy, k), CARD.w * ok, { q: 'Road trip snacks: sweet or salty?', rot: lerp(0.8, 0.06, k), icon: 'star' })
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
        trips(t)
        middle(t)
        if (lp && t >= T.letterBack[0]) drawLetter(x, t, L, lp)
        talkCard(t)
        if (t > T.letterBack[0]) pisces(t, { x: 900, y: 560, s: 140, pop: pop01(t, T.letterBack[0] + 0.1, 0.3, 2) * popOut(t, T.out) }, t > T.seal ? 3 : 2, t > T.seal ? 'happy' : 'wide', [-1, 1])
        drawSeal(x, CARD.cx, CARD.cy + 238, 150, t, T.seal, { alpha: popOut(t, T.out) })
        sparkles(x, t, CARD.cx, CARD.cy + 238, T.seal + 0.02, 12, 150, 1, [GOLD, '#9fe6b0', BONE])
        narrator(t)
      }
      x.restore()
      const lk = pop01(t, T.b2In + 0.35, 0.3, 2) * outK(t, T.b2Out)
      for (const [e, P] of [[tagC, CAP_A], [tagA, ARI_A]]) {
        const on = lk > 0.01 && t > T.b2In && t < T.b2Out[1]
        e.style.display = on ? 'block' : 'none'
        if (on) { e.style.left = Math.min(1080 - 340, Math.max(20, P.x - 160)) + 'px'; e.style.top = (P.y + 85) + 'px'; e.style.opacity = String(clamp(lk)); e.style.transform = `scale(${lk.toFixed(3)})` }
      }
      box1.update(t); box2.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.9, between the one-car map and the halfway park)
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
  // the map, one car doing every trip, the arguers
  ['whoosh', T.b2In, 0.5, 0.035], ...wordPops(T.h1, 6, 0.08, 2, 0.022),
  ...Array.from({ length: 4 }, (_, i) => ['whoosh', +(T.b2In + 0.6 + i * 1.1).toFixed(3), 0.5, 0.012]),
  ...T.say.map((s, i) => ['pop', s, i % 2 ? 1318.51 : 739.99, 0.045, i % 2 ? 0.4 : -0.4]),
  ...talkCues(LINES, { cps: CPS }),
  // the halfway park
  ...wordPops(T.h2, 6, 0.1, 1, 0.024), ['pop', T.mapIn + 0.05, 880, 0.035, 0],
  ['tom', T.pin + 0.25, 110, { gain: 0.18, decay: 0.2 }], ['bell', T.pin + 0.3, 1760, 0.025, 0.8, 0.2],
  ['riser', T.drive[0], T.drive[1], 0.02], ['pop', T.meet, 1174.66, 0.04, -0.2], ['pop', T.meet + 0.08, 1318.51, 0.04, 0.2],
  ...T.turn.map(s => ['tick', s, 0.04]),
  ['pluck', T.ducks, 1174.66, 0.045, 0.5, 0], ['pluck', T.ducks + 0.12, 1567.98, 0.04, 0.5, 0], ['glitter', T.ducks, T.ducks + 0.4],
  // the seal
  ['whoosh', T.letterBack[0], 0.4, 0.035], ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ...wordPops(T.h3, 2, 0.14, 0, 0.03),
  ['boom', T.seal, 0.3], ['tom', T.seal, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.seal, 0.07], ['bell', T.seal + 0.08, 1760, 0.03, 1.2, 0], ['glitter', T.seal + 0.05, T.seal + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
