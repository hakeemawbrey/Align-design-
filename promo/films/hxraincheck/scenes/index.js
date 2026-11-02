// hxraincheck: STAR MAIL, Houston letters. "We keep rescheduling for rain." (30 s vertical, music: lofi)
// Story 0–25.6, then the shared end card. The show look lives in ./mail.js (identical in every Pack F film).
//   0.00–8.6   "“We keep rescheduling | for *rain.”*"  Frame 0: the headline is up, the envelope is mid-flight, a
//              light rain is already falling, THE STARS (gold quill) watch it land. The letter unfolds (drop 2.82) and
//              writes on: "Dear Stars, Picnic: rained out. Park day: rained out. Bayou walk: rained out. Is the sky
//              telling us *no*??  — a soggy Gemini, Houston". ♓ Pisces peeks over the corner and sniffles.
//   8.6–13.8   "Rained out. | *Again.*"  Three plan notes (PICNIC · PARK DAY · BAYOU WALK) each get a blue RAINED
//              OUT stamp. ♏ Scorpio: "it's a SIGN. the sky said no." / ♌ Leo: "it's weather. it's Houston." / ♏ "a
//              DARK sign." / ♌ "it's a CLOUD." THE STARS: "the sky isn't *texting* you."
//  13.9        the one card cut.
//  14.0–22.4   "Make a *backup.* | Keep the date."  Indoors: a window with gentle rain outside, a RAIN PLAN note on
//              it (board games · cook together · a movie), ♊ Gemini and ♎ Libra at a little table with a board game.
//              THE STARS: "pick the indoor *backup* first." → "rain or shine, you still *show up*." ♎ LIBRA: "board
//              games at mine? *rain-proof.*" ♊ GEMINI: "warning: I'm *terrible* at games." ♎: "perfect." Rewatch bait:
//              Pisces stands outside the window in the rain under a tiny umbrella, crying anyway.
//  22.4–25.5   "Rain plan: | *still* a plan."  The letter comes back, a talk card ("Favorite rainy-day thing to
//              do?") lands and the wax seal THUNKs. Pisces fountains. Everything pops out by 25.5.
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
  speech, drawTalkCard, drawRain,
} from './mail.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GEM = signStar('gemini'), LIB = signStar('libra'), SCO = signStar('scorpio'), LEO = signStar('leo'), PIS = signStar('pisces')

// ── the timeline
const T = {
  bug: -1, h0: -1, h0Land: -0.3, h0Out: [8.45, 8.65],
  envFly: [-0.3, 0.45], sealPop: 0.9, flap: [1.0, 1.3], rise: [1.3, 1.76], envDrop: [1.7, 2.1], unfold: [1.9, 2.72],
  narIn: -1, pisPeek: [2.9, 3.3], gasp: 5.9,
  letterOut: [8.45, 8.8],
  h1: 8.75, h1Out: [13.55, 13.75],
  b2In: 8.8, stamp: [9.15, 9.5, 9.85], say: [10.1, 10.6, 11.0, 11.4], b2Out: [13.4, 13.75],
  cut: 13.9,
  h2: 14.0, h2Out: [22.25, 22.45],
  roomIn: 14.05, note: 15.2, move: [17.4, 19.6, 21.0], perfect: 21.45,
  h3: 22.5, letterBack: [22.4, 22.8], card: [22.7, 23.05], seal: 23.35,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE STARS', LSP = `${LIB.glyph}︎ LIBRA`, GSP = `${GEM.glyph}︎ GEMINI`
const LINES = [
  { t: 11.85, speaker: SPEAK, text: "the sky isn't *texting* you." },
  { t: 14.35, speaker: SPEAK, text: 'pick the indoor *backup* first.' },
  { t: 16.3, speaker: SPEAK, text: 'rain or shine, you still *show up*.' },
  { t: 18.3, speaker: LSP, color: '#ffc8e0', text: 'board games at mine? *rain-proof.*' },
  { t: 20.15, speaker: GSP, color: '#ffe27a', text: "warning: I'm *terrible* at games." },
]
const CPS = 30
const BOX1 = { open: 11.65, close: 13.7 }, BOX2 = { open: 14.15, close: 22.8 }

const LETTER = [
  { text: 'Dear Stars,', t: BEAT(4) + 0.03, d: 0.45 },
  { text: 'Picnic: *rained out.*', t: 3.3, d: 0.65 },
  { text: 'Park day: *rained out.*', t: 4.05, d: 0.7 },
  { text: 'Bayou walk: *rained out.*', t: 4.85, d: 0.75 },
  { text: 'Is the sky telling us *no*??', t: 5.75, d: 0.8 },
  { text: '— a soggy Gemini, Houston', t: 6.75, d: 0.85, size: 48, align: 'right', y: 128 + 5 * 84 + 22 },
]
const L_AT = { cx: 540, cy: 905 }

// layout
const NAR_A = { x: 150, y: 1250, s: 200 }, NAR_B = { x: 140, y: 1300, s: 130 }
const NOTES = [{ x: 250, y: 640, w: 270, txt: 'PICNIC', r: -0.06 }, { x: 540, y: 610, w: 270, txt: 'PARK DAY', r: 0.04 }, { x: 830, y: 645, w: 290, txt: 'BAYOU WALK', r: -0.03 }]
const SCO_A = { x: 260, y: 1020, s: 200 }, LEO_A = { x: 820, y: 1020, s: 200 }
const WIN = { x0: 190, y0: 440, x1: 890, y1: 840 }
const GEM_B = { x: 300, y: 1040, s: 200 }, LIB_B = { x: 780, y: 1040, s: 200 }
const TBL = { x0: 360, x1: 720, y: 1130 }
const CARD = { cx: 556, cy: 940, w: 380 }

const NAR_HOPS = [0.2, ...talkHops(LINES, SPEAK, { cps: CPS })]
const SCO_HOPS = [T.b2In + 0.3, T.say[0], T.say[0] + 0.3, T.say[2], T.say[2] + 0.25]
const LEO_HOPS = [T.b2In + 0.45, T.say[1], T.say[1] + 0.3, T.say[3], T.say[3] + 0.25]
const LIB_HOPS = [T.roomIn + 0.3, ...talkHops(LINES, LSP, { cps: CPS }), T.perfect, T.seal + 0.05]
const GEM_HOPS = [T.roomIn + 0.4, ...T.move, ...talkHops(LINES, GSP, { cps: CPS }), T.seal + 0.08]

const UMB = ['...KKKK...', '.KKKKKKKK.', 'KKKKKKKKKK', 'K.K.K.K.K.', '....s.....', '....s.....', '....s.....', '..s.s.....', '...s......']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "800 32px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 19px 'EB Garamond'", "italic 500 15px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 16px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const L = makeLetter({ lines: LETTER })

  const H0 = popText(root, '“We keep | rescheduling | for *rain.”*', { top: 150, size: 96, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: '#8fc4ff' })
  const H1 = popText(root, 'Rained out. | *Again.*', { top: 178, size: 108, accentSize: 156, at: T.h1, gap: 0.12, accentColor: '#8fc4ff' })
  const H2 = popText(root, 'Make a *backup.* | Keep the date.', { top: 178, size: 100, accentSize: 140, at: T.h2, gap: 0.1, accentColor: GOLD })
  const H3 = popText(root, 'Rain plan: | *still* a plan.', { top: 172, size: 108, accentSize: 156, at: T.h3, gap: 0.12, accentColor: '#8fc4ff' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const tag = (txt, col) => el('div', { position: 'absolute', left: '0px', top: '0px', width: '320px', textAlign: 'center', font: `700 26px ${MONO}`, letterSpacing: '0.12em', color: col, textShadow: '0 2px 8px rgba(6,4,18,0.95)', display: 'none' }, root, txt)
  const tagS = tag(`${SCO.glyph}︎ SCORPIO`, '#ff8fa0'), tagL = tag(`${LEO.glyph}︎ LEO`, '#ffcf6e')
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
  function pisces(t, P, tears, mood = 'wide', look = [-1, 0], umbrella = false) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops }
    if (opts.pop <= 0.01) return
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    if (umbrella) drawBits(x, UMB, { K: '#ffd84a', s: '#8a83b8' }, P.x + P.s * 0.2, P.y - P.s * 0.62, P.s / 22 * opts.pop, { rot: -0.15 })
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
    if (t > T.gasp && t < T.letterOut[0]) { mood = 'squint'; look = [0.8, -1] }
    if (t > T.letterOut[0] && t < T.say[0]) mood = 'wide'
    if (t > T.say[0] && t < LINES[0].t) { mood = 'eyeroll'; look = undefined }
    if (t > LINES[0].t) { mood = 'happy'; look = undefined }
    if (t > T.seal) mood = 'sparkle'
    drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood, look, hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05, blink: mood === 'wide' ? false : undefined })
    const F = starFrame(P.x, P.y, P.s, t, { pop: k, hops: NAR_HOPS, seed: 2 })
    const wig = t < T.letterOut[0] ? 0.08 * Math.sin(t * 9) : 0.04 * Math.sin(t * 2)
    drawQuill(x, F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.12, F.cell * 1.05, 0.55 + wig, clamp(k))
  }

  // a plan note + its RAINED OUT stamp (THUNK at ts)
  function note(t, N, k, ts) {
    if (k <= 0.01) return
    x.save(); x.translate(N.x, N.y); x.rotate(N.r); x.scale(k, k)
    const w = N.w, h = 150
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 12, -h / 2 + 14, w, h)
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
    x.fillStyle = '#fff3b8'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#f0dd88'; x.fillRect(-w / 2, -h / 2, w, 22)
    x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(N.txt, 0, -18)
    const sp = prog(t, ts - 0.12, ts)
    if (sp > 0) {
      const sc = lerp(2.2, 1, ease.inQuad(sp)), dt = t - ts, sq = dt > 0 ? 1 + 0.12 * Math.exp(-dt * 10) * Math.cos(dt * 30) : 1
      x.save(); x.translate(0, 40); x.rotate(-0.12); x.scale(0.82 * sc * sq, 0.82 * sc / sq); x.globalAlpha = clamp(sp * 2) * 0.92
      x.strokeStyle = '#2f6fd8'; x.lineWidth = 7; x.strokeRect(-122, -30, 244, 60)
      x.fillStyle = '#2f6fd8'; x.font = `700 32px ${MONO}`; x.fillText('RAINED OUT', 0, 2)
      x.restore()
    }
    x.restore()
  }

  // beat 2: three stamps, then Scorpio vs Leo
  function stamps(t) {
    if (t < T.b2In || t > T.b2Out[1]) return
    const ok = outK(t, T.b2Out)
    NOTES.forEach((N, i) => note(t, N, pop01(t, T.b2In + 0.07 * i, 0.3, 2) * ok, T.stamp[i]))
    const sk = pop01(t, T.b2In + 0.25, 0.35, 2.1) * ok, lk = pop01(t, T.b2In + 0.4, 0.35, 2.1) * ok
    const sTalk = t > T.say[0] && (t < T.say[1] || (t > T.say[2] && t < T.say[3]))
    drawStarChar(x, SCO_A.x, SCO_A.y, SCO_A.s, t, { color: SCO.color, glyph: SCO.glyph, mood: sTalk ? 'squint' : t > T.say[0] ? 'eyeroll' : 'wide', look: [1, -0.2], hops: SCO_HOPS, pop: sk, seed: 3, glow: 1.05 })
    drawStarChar(x, LEO_A.x, LEO_A.y, LEO_A.s, t, { color: LEO.color, glyph: LEO.glyph, mood: t > T.say[1] && !sTalk ? 'happy' : t > T.say[0] ? 'eyeroll' : 'wide', look: [-1, -0.2], hops: LEO_HOPS, pop: lk, seed: 8, glow: 1.1 })
    const sayL = ["it's a SIGN. the sky said no.", "it's weather. it's Houston.", 'a DARK sign.', "it's a CLOUD."]
    T.say.forEach((s0, i) => speech(x, t, i % 2 ? 760 : 320, i % 2 ? 860 : 800, s0, sayL[i], { life: (T.say[i + 2] ?? T.b2Out[0]) - s0 - 0.02, col: i % 2 ? '#ffe9b8' : '#ffd0dc', tail: i % 2 ? 0.4 : -0.4, size: 34 }))
    pisces(t, { x: 955, y: 1270, s: 110, pop: pop01(t, T.b2In + 0.8, 0.3, 2) * ok }, 2, 'wide', [-1, -0.5], true)
  }

  // beat 3: indoors, a window, a board game
  function cozy(t) {
    if (t < T.h2 || t > T.h2Out[1] + 0.2) return
    const ok = outK(t, [T.h2Out[0] - 0.05, T.h2Out[1] + 0.15])
    const wk = pop01(t, T.roomIn, 0.35, 1.8) * ok
    if (wk > 0.01) {
      // warm lamp glow
      const g = x.createRadialGradient(540, 1060, 0, 540, 1060, 560); g.addColorStop(0, `rgba(255,190,120,${0.28 * wk})`); g.addColorStop(1, 'rgba(255,190,120,0)'); x.fillStyle = g; x.fillRect(0, 500, 1080, 1100)
      x.save(); x.translate(540, (WIN.y0 + WIN.y1) / 2); x.scale(wk, wk); x.translate(-540, -(WIN.y0 + WIN.y1) / 2)
      const { x0, y0, x1, y1 } = WIN
      x.fillStyle = INK; x.fillRect(x0 - 26, y0 - 26, x1 - x0 + 52, y1 - y0 + 52)
      x.fillStyle = '#8a5a3a'; x.fillRect(x0 - 20, y0 - 20, x1 - x0 + 40, y1 - y0 + 40)
      x.fillStyle = '#1b2a5a'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
      x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip()
      drawRain(x, t, { x0, y0, w: x1 - x0, h: y1 - y0, n: 70, k: 1, seed: 9 })
      // Pisces outside in the rain, under a tiny umbrella, crying anyway (rewatch bait)
      pisces(t, { x: 790, y: 780, s: 95, pop: pop01(t, T.roomIn + 1.5, 0.3, 2) }, t > T.perfect ? 3 : 1, 'sparkle', [-1, 0.5], true)
      x.restore()
      x.fillStyle = '#8a5a3a'; x.fillRect(538 - 12, y0, 24, y1 - y0); x.fillRect(x0, (y0 + y1) / 2 - 12, x1 - x0, 24)
      x.fillStyle = INK; x.fillRect(x0 - 40, y1 + 20, x1 - x0 + 80, 26); x.fillStyle = '#a86c44'; x.fillRect(x0 - 36, y1 + 22, x1 - x0 + 72, 18)
      x.restore()
      // the RAIN PLAN note on the glass
      const nk = pop01(t, T.note, 0.35, 2.2) * ok
      if (nk > 0.01) {
        x.save(); x.translate(330, 600); x.rotate(-0.06); x.scale(nk, nk)
        x.fillStyle = INK; x.fillRect(-125, -115, 250, 230); x.fillStyle = '#fff3b8'; x.fillRect(-120, -110, 240, 220)
        x.fillStyle = '#2f6fd8'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('RAIN PLAN', 0, -78)
        x.fillStyle = INK; x.font = `700 24px ${INTER}`; x.textAlign = 'left'
        ;['board games', 'cook together', 'a movie'].forEach((s, i) => { drawBits(x, ['.KKK.', 'KKKKK', '..s..', '.ss..'], { K: '#2f6fd8', s: INK }, -92, -26 + i * 48, 4, { outline: null }); x.fillStyle = INK; x.fillText(s, -70, -24 + i * 48) })
        x.restore()
      }
    }
    // Gemini + Libra and the board game
    const gk = pop01(t, T.roomIn + 0.25, 0.35, 2.1) * ok, lk = pop01(t, T.roomIn + 0.35, 0.35, 2.1) * ok
    const gm = t > T.perfect ? 'heart' : t > LINES[4].t ? 'wink' : t > T.move[0] ? 'happy' : 'neutral'
    const lm = t > T.perfect ? 'heart' : t > LINES[3].t ? 'happy' : 'neutral'
    drawStarChar(x, GEM_B.x, GEM_B.y, GEM_B.s, t, { color: GEM.color, glyph: GEM.glyph, mood: gm, look: [1, 0.6], hops: GEM_HOPS, pop: gk, seed: 4, glow: 1.05 })
    drawStarChar(x, LIB_B.x, LIB_B.y, LIB_B.s, t, { color: LIB.color, glyph: LIB.glyph, mood: lm, look: [-1, 0.6], hops: LIB_HOPS, pop: lk, seed: 5, glow: 1.05 })
    const tk = pop01(t, T.roomIn + 0.15, 0.3, 1.8) * ok
    if (tk > 0.01) {
      x.save(); x.translate(540, TBL.y); x.scale(tk, tk); x.translate(-540, -TBL.y)
      x.fillStyle = INK; x.fillRect(TBL.x0 - 6, TBL.y - 6, TBL.x1 - TBL.x0 + 12, 44); x.fillStyle = '#8a4f34'; x.fillRect(TBL.x0, TBL.y, TBL.x1 - TBL.x0, 32)
      x.fillStyle = INK; x.fillRect(TBL.x0 + 30, TBL.y + 36, 20, 180); x.fillRect(TBL.x1 - 50, TBL.y + 36, 20, 180)
      // the board (a checker grid) seen from the side-ish
      const B = { x: 440, y: TBL.y - 46, w: 200, h: 40 }
      x.fillStyle = INK; x.fillRect(B.x - 4, B.y - 4, B.w + 8, B.h + 8)
      for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? '#efe6d6' : '#c8283c'; x.fillRect(B.x + i * 25, B.y + j * 20, 25, 20) }
      // pieces: Gemini's keep "moving" on their own (it is terrible at games)
      const pcs = [[1, '#ffd84a'], [3, '#ffd84a'], [5, '#ff8fb1'], [6, '#ff8fb1']]
      pcs.forEach(([i, c], n) => {
        let px = B.x + i * 25 + 12
        if (n === 0) px += 25 * T.move.filter(m => t > m).length
        const hop = n === 0 ? Math.max(0, ...T.move.map(m => t > m && t < m + 0.3 ? Math.sin(Math.PI * (t - m) / 0.3) * 30 : 0)) : 0
        x.fillStyle = INK; x.fillRect(px - 12, B.y - 18 - hop, 24, 20); x.fillStyle = c; x.fillRect(px - 9, B.y - 15 - hop, 18, 14)
      })
      x.restore()
    }
    speech(x, t, 800, 820, T.perfect, 'perfect.', { life: T.h2Out[0] - T.perfect, col: '#ffd9ea', size: 38, tail: -0.2 })
    if (t > T.perfect && t < T.perfect + 0.8) sparkles(x, t, 540, 960, T.perfect, 10, 220, 3, ['#ff4f86', BONE, GOLD])
  }

  function talkCard(t) {
    if (t < T.card[0]) return
    const k = easeOutBack(prog(t, ...T.card), 1.4), ok = popOut(t, T.out)
    if (ok <= 0) return
    drawTalkCard(x, lerp(1300, CARD.cx, k), lerp(700, CARD.cy, k), CARD.w * ok, { q: 'Favorite rainy-day thing to do?', rot: lerp(0.8, 0.06, k), icon: 'moon' })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      const dtS = t - T.seal, shake = dtS > 0 && dtS < 0.4 ? 14 * Math.exp(-dtS * 10) * Math.sin(dtS * 55) : 0
      drawSky(x, t, base)
      // a light rain over the letter and the stamps (never heavy); it stops for the indoor beat and the seal
      const rk = 0.55 * (1 - prog(t, 12.9, 13.7)) + 0.0
      drawRain(x, t, { k: rk, n: 80, seed: 4 })
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
        stamps(t)
        cozy(t)
        if (lp && t >= T.letterBack[0]) drawLetter(x, t, L, lp)
        talkCard(t)
        if (t > T.letterBack[0]) pisces(t, { x: 900, y: 560, s: 140, pop: pop01(t, T.letterBack[0] + 0.1, 0.3, 2) * popOut(t, T.out) }, t > T.seal ? 3 : 2, t > T.seal ? 'happy' : 'wide', [-1, 1])
        drawSeal(x, CARD.cx, CARD.cy + 238, 150, t, T.seal, { alpha: popOut(t, T.out) })
        sparkles(x, t, CARD.cx, CARD.cy + 238, T.seal + 0.02, 12, 150, 1, [GOLD, '#8fc4ff', BONE])
        narrator(t)
      }
      x.restore()
      const lk = pop01(t, T.b2In + 0.35, 0.3, 2) * outK(t, T.b2Out)
      for (const [e, P] of [[tagS, SCO_A], [tagL, LEO_A]]) {
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

// card-cut candidates (cardfx keeps the middle one: 13.9, between the stamps and the rain plan)
const CUTS = [8.65, { t: T.cut }, 22.45]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const scribble = (t0, d, gain = 0.011) => Array.from({ length: Math.floor(d / 0.085) }, (_, i) => ['tick', +(t0 + i * 0.085 + (i % 3) * 0.012).toFixed(3), gain * (0.7 + 0.3 * ((i * 7) % 3) / 2)])
const drizzle = (a, b, gain = 0.006) => Array.from({ length: Math.floor((b - a) / 0.11) }, (_, i) => ['tick', +(a + i * 0.11 + ((i * 7) % 5) * 0.017).toFixed(3), gain * (0.6 + 0.4 * ((i * 3) % 4) / 3)])
export const CUES = [
  ['pop', 0.02, 1174.66, 0.04, 0], ['whoosh', 0.0, 0.4, 0.04], ['tick', T.envFly[1], 0.05],
  ...drizzle(0.1, 13.6), ...drizzle(14.3, 22.2, 0.004),
  ['pop', T.sealPop, 1318.51, 0.05, 0], ['pop', T.sealPop + 0.05, 1760, 0.03, 0.2], ['glitter', T.sealPop, T.sealPop + 0.3],
  ['tick', T.flap[0] + 0.05, 0.04], ['whoosh', T.rise[0], 0.4, 0.035], ['whoosh', T.envDrop[0], 0.35, 0.025],
  ['tick', T.unfold[0] + 0.15, 0.045], ['tick', T.unfold[0] + 0.6, 0.045],
  ...LETTER.flatMap(l => scribble(l.t, l.d)),
  ['pop', T.pisPeek[0] + 0.15, 987.77, 0.025, 0.4], ['pluck', T.gasp + 0.05, 659.25, 0.03, 0.5, 0.4],
  // three stamps, then Scorpio vs Leo
  ['whoosh', T.b2In, 0.4, 0.035], ...wordPops(T.h1, 3, 0.12, 2, 0.022),
  ...T.stamp.flatMap(s => [['tom', s, 100, { gain: 0.2, decay: 0.18 }], ['tick', s, 0.06]]),
  ...T.say.map((s, i) => ['pop', s, i % 2 ? 987.77 : 739.99, 0.045, i % 2 ? 0.4 : -0.4]),
  ...talkCues(LINES, { cps: CPS }),
  // indoors
  ...wordPops(T.h2, 6, 0.1, 1, 0.024), ['pop', T.roomIn + 0.05, 880, 0.035, 0], ['pluck', T.note, 1174.66, 0.035, 0.5, -0.3],
  ...T.move.map(m => ['tick', m + 0.28, 0.05]),
  ['pluck', T.perfect, 1174.66, 0.045, 0.5, 0.2], ['pluck', T.perfect + 0.12, 1567.98, 0.04, 0.5, 0.2], ['glitter', T.perfect, T.perfect + 0.4],
  // the seal
  ['whoosh', T.letterBack[0], 0.4, 0.035], ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ...wordPops(T.h3, 5, 0.12, 0, 0.03),
  ['boom', T.seal, 0.3], ['tom', T.seal, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.seal, 0.07], ['bell', T.seal + 0.08, 1760, 0.03, 1.2, 0], ['glitter', T.seal + 0.05, T.seal + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
