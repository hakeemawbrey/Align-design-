// hxcrawfishboil: STAR MAIL, Houston letters. "Bringing my date to the family crawfish boil." (30 s vertical, music: funk)
// Story 0–25.6, then the shared end card. The show look lives in ./mail.js (identical in every Pack F film).
//   0.00–8.6   "“Bringing my date | to the family *crawfish boil.*”"  Frame 0: the headline is up, the envelope is
//              mid-flight, THE STARS (gold quill) watch it land. The letter unfolds (drop 2.82) and writes on: "Dear
//              Stars, Saturday: the family boil. My date has never peeled one crawfish. And my aunts will be WATCHING.
//              Help??  — a nervous Libra, Houston". ♓ Pisces peeks over the corner and sniffles.
//   8.6–13.8   "The family | is *watching.*"  A newspaper-covered table, a red mountain of crawfish, corn and potatoes.
//              Behind it the family: every pair of eyes on ♒ the date, who holds one crawfish like a live grenade of
//              confusion (sweat drops). The aunties argue: ♈ "just throw them in!" / ♋ "warn them! bibs!" / ♈ "sink or
//              PEEL!" / ♋ "TWO bibs!!". THE STARS: "a little of *both*, actually."
//  13.9        the one card cut.
//  14.0–22.4   "Warn them. | Pick a *buddy.*"  A checklist ticks: warn them: it's messy ✓ · seat them by a buddy ✓ ·
//              let them be new at it ✓. ♒ sits by Grandma ♉, who demonstrates; ♒ peels one: the tail pops free.
//              ♒ AQUARIUS: "I got one!! …it's so *tiny?*" The family cheers. Rewatch bait: one crawfish quietly
//              escapes across the bottom of the frame the whole beat.
//  22.4–25.5   "Peel *together.*"  The letter comes back, a talk card ("What's your family's big tradition?") lands
//              and the wax seal THUNKs. Pisces fountains. Everything pops out by 25.5.
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
const AQU = signStar('aquarius'), ARI = signStar('aries'), CAN = signStar('cancer'), TAU = signStar('taurus'), CAP = signStar('capricorn'), PIS = signStar('pisces')

// ── the timeline
const T = {
  bug: -1, h0: -1, h0Land: -0.6, h0Out: [8.45, 8.65],
  envFly: [-0.3, 0.45], sealPop: 0.9, flap: [1.0, 1.3], rise: [1.3, 1.76], envDrop: [1.7, 2.1], unfold: [1.9, 2.72],
  narIn: -1, pisPeek: [2.9, 3.3], gasp: 6.0,
  letterOut: [8.45, 8.8],
  h1: 8.75, h1Out: [13.55, 13.75],
  b2In: 8.8, say: [9.0, 9.6, 10.2, 10.75], b2Out: [13.4, 13.75],
  cut: 13.9,
  h2: 14.0, h2Out: [22.25, 22.45],
  list: [14.6, 16.6, 18.6], demo: [17.0, 18.4], peel: 19.7, cheer: 21.3,
  h3: 22.5, letterBack: [22.4, 22.8], card: [22.7, 23.05], seal: 23.35,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE STARS', ASP = `${AQU.glyph}︎ AQUARIUS`
const LINES = [
  { t: 11.25, speaker: SPEAK, text: 'a little of *both*, actually.' },
  { t: 14.35, speaker: SPEAK, text: "warn them: it's messy. it's *loud*." },
  { t: 16.45, speaker: SPEAK, text: 'seat them next to a *buddy*.' },
  { t: 18.45, speaker: SPEAK, text: 'and let them be *new* at it.' },
  { t: 20.35, speaker: ASP, color: '#9fe8ff', text: 'I got one!! …it\'s so *tiny?*' },
]
const CPS = 30
const BOX1 = { open: 11.05, close: 13.7 }, BOX2 = { open: 14.15, close: 22.8 }

const LETTER = [
  { text: 'Dear Stars,', t: BEAT(4) + 0.03, d: 0.45 },
  { text: 'Saturday: the family boil.', t: 3.3, d: 0.8 },
  { text: 'My date has never peeled', t: 4.15, d: 0.75 },
  { text: '*one* crawfish. And my aunts', t: 4.95, d: 0.85 },
  { text: 'will be WATCHING. Help??', t: 5.85, d: 0.8 },
  { text: '— a nervous Libra, Houston', t: 6.8, d: 0.85, size: 48, align: 'right', y: 128 + 5 * 84 + 22 },
]
const L_AT = { cx: 540, cy: 905 }

// layout
const NAR_A = { x: 150, y: 1250, s: 200 }, NAR_B = { x: 140, y: 1300, s: 130 }
const TABLE = { x0: 120, x1: 960, y: 1080 }
const FAM = [
  { x: 210, y: 900, s: 150, c: ARI, seed: 3, tag: 'AUNTIE' },
  { x: 410, y: 880, s: 135, c: CAP, seed: 5 },
  { x: 670, y: 880, s: 135, c: TAU, seed: 7 },
  { x: 870, y: 900, s: 150, c: CAN, seed: 9, tag: 'AUNTIE' },
]
const AQ_A = { x: 520, y: 1250, s: 170 }, AQ_B = { x: 450, y: 905, s: 160 }, GMA_B = { x: 690, y: 900, s: 165 }
const CARD = { cx: 556, cy: 940, w: 380 }

const NAR_HOPS = [0.2, ...talkHops(LINES, SPEAK, { cps: CPS })]
const AQ_HOPS = [T.b2In + 0.3, T.list[1] + 0.3, T.peel, T.peel + 0.3, ...talkHops(LINES, ASP, { cps: CPS }), T.cheer, T.seal + 0.05]
const ARI_HOPS = [T.say[0], T.say[0] + 0.3, T.say[2], T.say[2] + 0.25, T.cheer, T.cheer + 0.3]
const CAN_HOPS = [T.say[1], T.say[3], T.say[3] + 0.25, T.cheer + 0.1, T.cheer + 0.4]
const FAM_HOPS = [T.b2In + 0.4, T.cheer + 0.05, T.cheer + 0.35]
const GMA_HOPS = [T.demo[0], T.demo[0] + 0.5, T.demo[0] + 1.0, T.peel + 0.2, T.cheer]

// props
const CRAW = [
  'RR.......RR', 'RRR.....RRR', '.RR.....RR.', '..RRRRRRR..', '..RERRRER..', '...RRRRR...', '....RrR....', '....RrR....', '...RRrRR...', '..RR.R.RR..',
]
const CRAW_C = { R: '#e0402e', r: '#ff7a5a', E: INK }
const CORN = ['.GYYYG.', 'GYyYyYG', 'GYYyYYG', 'GYyYyYG', 'GYYyYYG', '.GYYYG.']
const CORN_C = { G: '#5fae4a', Y: '#ffd84a', y: '#e8b52a' }
const POTATO = ['.PPPP.', 'PPpPPP', 'PPPPpP', '.PPPP.']
const CHECK = ['.......G', '......GG', 'G....GG.', 'GG..GG..', '.GGGG...', '..GG....']
const LIST = ["warn them: it's messy", 'seat them by a buddy', 'let them be new at it']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 30px Inter", "700 36px Inter", "italic 500 150px 'EB Garamond'", "italic 500 19px 'EB Garamond'", "italic 500 15px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 16px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const L = makeLetter({ lines: LETTER })

  const H0 = popText(root, '“Bringing my date | to the family | *crawfish boil.”*', { top: 150, size: 88, accentSize: 128, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.05, wobble: true, accentColor: '#ff7a5a' })
  const H1 = popText(root, 'The family | is *watching.*', { top: 178, size: 108, accentSize: 150, at: T.h1, gap: 0.1, accentColor: '#ff7a5a' })
  const H2 = popText(root, 'Warn them. | Pick a *buddy.*', { top: 178, size: 104, accentSize: 146, at: T.h2, gap: 0.12, accentColor: GOLD })
  const H3 = popText(root, 'Peel | *together.*', { top: 172, size: 116, accentSize: 168, at: T.h3, gap: 0.14, accentColor: '#ff7a5a' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const tag = (txt, col) => el('div', { position: 'absolute', left: '0px', top: '0px', width: '320px', textAlign: 'center', font: `700 24px ${MONO}`, letterSpacing: '0.12em', color: col, textShadow: '0 2px 8px rgba(6,4,18,0.95)', display: 'none' }, root, txt)
  const tagA = tag(`${ARI.glyph}︎ AUNTIE ARIES`, '#ff9a8a'), tagC = tag(`${CAN.glyph}︎ AUNTIE CANCER`, '#d8e4ff')
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
    if (t > LINES[0].t && t < T.cut) { mood = 'happy'; look = undefined }
    if (t > T.cut) { mood = 'happy'; look = undefined }
    if (t > T.seal) mood = 'sparkle'
    drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood, look, hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05, blink: mood === 'wide' ? false : undefined })
    const F = starFrame(P.x, P.y, P.s, t, { pop: k, hops: NAR_HOPS, seed: 2 })
    const wig = t < T.letterOut[0] ? 0.08 * Math.sin(t * 9) : 0.04 * Math.sin(t * 2)
    drawQuill(x, F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.12, F.cell * 1.05, 0.55 + wig, clamp(k))
  }

  // the newspaper-covered table with the boil piled on it (k = pop, pile = 0…1 how much is left)
  function table(t, k, pile = 1) {
    if (k <= 0.01) return
    const { x0, x1, y } = TABLE
    x.save(); x.translate(540, y); x.scale(k, k); x.translate(-540, -y)
    x.fillStyle = INK; x.fillRect(x0 - 6, y - 6, x1 - x0 + 12, 70)
    x.fillStyle = '#e9e2cf'; x.fillRect(x0, y, x1 - x0, 58)
    x.fillStyle = '#b9b09a'; for (let i = 0; i < 9; i++) x.fillRect(x0 + 30 + i * 92, y + 14, 60, 4), x.fillRect(x0 + 30 + i * 92, y + 28, 44, 4), x.fillRect(x0 + 30 + i * 92, y + 42, 54, 4)
    x.fillStyle = '#6a4a2e'; x.fillRect(x0, y + 58, x1 - x0, 14)
    x.fillStyle = INK; x.fillRect(x0 + 40, y + 70, 24, 200); x.fillRect(x1 - 64, y + 70, 24, 200)
    // the pile
    const n = Math.round(18 * pile)
    for (let i = 0; i < n; i++) {
      const row = i < 8 ? 0 : i < 14 ? 1 : 2, col = row === 0 ? i : row === 1 ? i - 8 : i - 14
      const per = [8, 6, 4][row], px = 540 + (col - (per - 1) / 2) * 52 + (row % 2) * 10, py = y - 18 - row * 34
      drawBits(x, CRAW, CRAW_C, px, py, 4.4, { rot: ((i * 37) % 11 - 5) * 0.12 })
    }
    if (pile > 0.2) {
      drawBits(x, CORN, CORN_C, 330, y - 22, 7, { rot: 1.2 }); drawBits(x, CORN, CORN_C, 760, y - 20, 7, { rot: -1.1 })
      drawBits(x, POTATO, { P: '#c9a06a', p: '#9a7444' }, 280, y - 10, 7); drawBits(x, POTATO, { P: '#c9a06a', p: '#9a7444' }, 820, y - 12, 7)
    }
    // steam
    for (let i = 0; i < 5; i++) {
      const ph = (t * 0.6 + i / 5) % 1
      x.fillStyle = `rgba(239,230,214,${0.35 * (1 - ph)})`; x.fillRect(Math.round(470 + i * 34 + 10 * Math.sin(ph * 7 + i)), Math.round(y - 120 - ph * 140), 10, 10)
    }
    x.restore()
  }
  function sweat(t, cx, cy, k) {
    for (let i = 0; i < 2; i++) {
      const ph = (t * 1.3 + i * 0.5) % 1
      x.globalAlpha = k * (1 - ph)
      drawBits(x, ['.B.', 'BBB', 'BBB', '.B.'], { B: '#8fe3ff' }, cx + (i ? 30 : -24), cy + ph * 50, 5)
      x.globalAlpha = 1
    }
  }

  // beat 2: everybody watches the date; the aunties argue
  function watching(t) {
    if (t < T.b2In || t > T.b2Out[1]) return
    const ok = outK(t, T.b2Out)
    FAM.forEach((f, i) => {
      const k = pop01(t, T.b2In + 0.08 * i, 0.35, 2.1) * ok
      const arg = (i === 0 || i === 3)
      const talking = arg && T.say.some((s, j) => (j % 2 === (i === 0 ? 0 : 1)) && t > s && t < s + 0.5)
      drawStarChar(x, f.x, f.y, f.s, t, { color: f.c.color, glyph: f.c.glyph, mood: talking ? 'wide' : 'wide', look: talking ? [i === 0 ? 1 : -1, 0] : [(AQ_A.x - f.x) / 400, 1], hops: i === 0 ? ARI_HOPS : i === 3 ? CAN_HOPS : FAM_HOPS, pop: k, seed: f.seed, glow: 0.9, blink: false })
    })
    table(t, pop01(t, T.b2In, 0.35, 1.8) * ok, 1)
    // the date, holding one crawfish, sweating
    const ak = pop01(t, T.b2In + 0.4, 0.35, 2.1) * ok
    drawStarChar(x, AQ_A.x, AQ_A.y, AQ_A.s, t, { color: AQU.color, glyph: AQU.glyph, mood: 'wide', look: [0.6, -0.6], hops: AQ_HOPS, pop: ak, seed: 4, glow: 1.05, blink: false })
    if (ak > 0.5) { drawBits(x, CRAW, CRAW_C, AQ_A.x + 100, AQ_A.y - 30 + 6 * Math.sin(t * 18), 6, { rot: 0.4 + 0.1 * Math.sin(t * 9) }); sweat(t, AQ_A.x, AQ_A.y - 110, ak) }
    // the stare lines from the family to the date
    if (t > T.b2In + 0.6 && t < T.say[0]) {
      x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * prog(t, T.b2In + 0.6, T.say[0])); x.fillStyle = '#ff8fa0'
      for (const f of FAM) for (let s = 0.15; s < 0.85; s += 0.07) x.fillRect(Math.round(lerp(f.x, AQ_A.x, s) / 6) * 6, Math.round(lerp(f.y + 40, AQ_A.y - 60, s) / 6) * 6, 6, 6)
      x.restore()
    }
    const sayL = ['just throw them in!', 'warn them! bibs!', 'sink or PEEL!', 'TWO bibs!!']
    T.say.forEach((s0, i) => speech(x, t, i % 2 ? 790 : 290, 720, s0, sayL[i], { life: (T.say[i + 2] ?? T.b2Out[0]) - s0 - 0.02, col: i % 2 ? '#dfe8ff' : '#ffd0c8', tail: i % 2 ? 0.4 : -0.4, size: 36 }))
    pisces(t, { x: 960, y: 1280, s: 110, pop: pop01(t, T.b2In + 0.8, 0.3, 2) * ok }, 2, 'wide', [-1, -0.5])
  }

  // beat 3: the checklist, the buddy, the first peel
  function buddy(t) {
    if (t < T.h2 || t > T.h2Out[1] + 0.2) return
    const ok = outK(t, [T.h2Out[0] - 0.05, T.h2Out[1] + 0.15])
    // checklist panel
    const pk = pop01(t, T.h2 + 0.2, 0.35, 1.8) * ok
    if (pk > 0.01) {
      x.save(); x.translate(540, 560); x.scale(pk, pk)
      x.fillStyle = INK; x.fillRect(-372, -118, 744, 236); x.fillStyle = '#efe6d6'; x.fillRect(-364, -110, 728, 220)
      x.font = `700 36px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'
      LIST.forEach((s, i) => {
        const yy = -66 + i * 66, on = t > T.list[i]
        x.fillStyle = INK; x.fillRect(-330, yy - 20, 40, 40); x.fillStyle = BONE; x.fillRect(-326, yy - 16, 32, 32)
        if (on) drawBits(x, CHECK, { G: '#2f9e5a' }, -306, yy - 4, 6 * easeOutBack(prog(t, T.list[i], T.list[i] + 0.25), 2.4), { outline: null })
        x.fillStyle = on ? INK : 'rgba(27,18,54,0.35)'; x.fillText(s, -270, yy + 2)
      })
      x.restore()
    }
    // family, small and cheering at the cheer
    FAM.forEach((f, i) => {
      if (i === 2) return
      const k = pop01(t, T.h2 + 0.3 + 0.06 * i, 0.3, 2) * ok
      const X = [150, 300, 0, 930][i]
      drawStarChar(x, X, 880, 110, t, { color: f.c.color, glyph: null, mood: t > T.cheer ? 'happy' : t > T.peel ? 'wide' : 'neutral', look: [(AQ_B.x - X) / 400, 0.5], hops: FAM_HOPS, pop: k, seed: f.seed, glow: 0.8 })
    })
    // the date + Grandma (the buddy) at the table
    const ak = pop01(t, T.h2 + 0.4, 0.35, 2.1) * ok, gk = pop01(t, T.h2 + 0.5, 0.35, 2.1) * ok
    const am = t > T.cheer ? 'sparkle' : t > T.peel ? 'happy' : t > T.list[1] ? 'neutral' : 'wide'
    drawStarChar(x, AQ_B.x, AQ_B.y, AQ_B.s, t, { color: AQU.color, glyph: AQU.glyph, mood: am, look: t < T.peel ? [1, 0.6] : undefined, hops: AQ_HOPS, pop: ak, seed: 4, glow: 1.05 })
    drawStarChar(x, GMA_B.x, GMA_B.y, GMA_B.s, t, { color: TAU.color, glyph: TAU.glyph, mood: t > T.peel ? 'happy' : 'wink', look: [-1, 0.4], hops: GMA_HOPS, pop: gk, seed: 7, glow: 1.05 })
    // Grandma's tiny glasses
    if (gk > 0.3) { const F = starFrame(GMA_B.x, GMA_B.y, GMA_B.s, t, { pop: gk, hops: GMA_HOPS, seed: 7 }); inSprite(x, F, () => { x.strokeStyle = INK; x.lineWidth = 0.9; x.strokeRect(9, 16.5, 8, 6); x.strokeRect(19, 16.5, 8, 6); x.fillStyle = INK; x.fillRect(17, 18.5, 2, 0.9) }) }
    table(t, pop01(t, T.h2 + 0.1, 0.35, 1.8) * ok, 0.62)
    // the demo crawfish (Grandma twists) and the date's crawfish (pops at the peel)
    const dk = ok * clamp(prog(t, T.demo[0], T.demo[0] + 0.2))
    if (dk > 0) drawBits(x, CRAW, CRAW_C, GMA_B.x - 80, GMA_B.y + 50, 7.5, { rot: 0.3 * Math.sin((t - T.demo[0]) * 8) * (t < T.demo[1] ? 1 : 0) + 0.2, alpha: dk })
    if (ak > 0.5) {
      const pp = prog(t, T.peel, T.peel + 0.4)
      if (pp <= 0) drawBits(x, CRAW, CRAW_C, AQ_B.x + 80, AQ_B.y + 50, 7.5, { rot: -0.2 + 0.05 * Math.sin(t * 12) })
      else {
        drawBits(x, CRAW.slice(0, 6), CRAW_C, AQ_B.x + 40 - pp * 20, AQ_B.y + 50, 6, { rot: -0.4 })
        drawBits(x, ['.ww.', 'wwww', 'wwww', '.ww.', 'w..w'], { w: '#ffd9c8' }, AQ_B.x + 90, lerp(AQ_B.y + 70, AQ_B.y - 30, ease.outBack(pp)), 5 + 2 * ease.outBack(pp))
      }
    }
    sparkles(x, t, AQ_B.x + 90, AQ_B.y - 30, T.peel + 0.1, 10, 90, 2, [GOLD, '#ffd9c8', BONE])
    if (t > T.cheer) speech(x, t, 760, 780, T.cheer, 'again! again!', { life: T.h2Out[0] - T.cheer, col: '#fff1c8', size: 34, tail: 0.2 })
    // rewatch bait: one crawfish escapes along the bottom of the frame
    const esc = prog(t, T.h2 + 0.5, T.h2Out[0])
    if (esc > 0 && esc < 1) drawBits(x, CRAW, CRAW_C, lerp(260, 1120, esc), 1365 + 3 * Math.sin(t * 20), 3.5, { rot: Math.PI / 2 })
    pisces(t, { x: 960, y: 1240, s: 105, pop: pop01(t, T.h2 + 1.1, 0.3, 2) * ok }, t > T.cheer ? 3 : 1, 'sparkle', [-1, -0.5])
  }

  function talkCard(t) {
    if (t < T.card[0]) return
    const k = easeOutBack(prog(t, ...T.card), 1.4), ok = popOut(t, T.out)
    if (ok <= 0) return
    drawTalkCard(x, lerp(1300, CARD.cx, k), lerp(700, CARD.cy, k), CARD.w * ok, { q: "What's your family's big tradition?", rot: lerp(0.8, 0.06, k), icon: 'heart' })
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
        watching(t)
        buddy(t)
        if (lp && t >= T.letterBack[0]) drawLetter(x, t, L, lp)
        talkCard(t)
        if (t > T.letterBack[0]) pisces(t, { x: 900, y: 560, s: 140, pop: pop01(t, T.letterBack[0] + 0.1, 0.3, 2) * popOut(t, T.out) }, t > T.seal ? 3 : 2, t > T.seal ? 'happy' : 'wide', [-1, 1])
        drawSeal(x, CARD.cx, CARD.cy + 238, 150, t, T.seal, { alpha: popOut(t, T.out) })
        sparkles(x, t, CARD.cx, CARD.cy + 238, T.seal + 0.02, 12, 150, 1, [GOLD, '#ff7a5a', BONE])
        narrator(t)
      }
      x.restore()
      const lk = pop01(t, T.b2In + 0.35, 0.3, 2) * outK(t, T.b2Out)
      for (const [e, P] of [[tagA, FAM[0]], [tagC, FAM[3]]]) {
        const on = lk > 0.01 && t > T.b2In && t < T.b2Out[1]
        e.style.display = on ? 'block' : 'none'
        if (on) { e.style.left = Math.min(1080 - 340, Math.max(20, P.x - 160)) + 'px'; e.style.top = (P.y - 140) + 'px'; e.style.opacity = String(clamp(lk)); e.style.transform = `scale(${lk.toFixed(3)})` }
      }
      box1.update(t); box2.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.9, between the stare-down and the answer)
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
  // the family stare-down + the aunties
  ['whoosh', T.b2In, 0.4, 0.035], ...wordPops(T.h1, 4, 0.1, 2, 0.022), ['tom', T.b2In + 0.1, 120, { gain: 0.14, decay: 0.2 }],
  ...FAM.map((f, i) => ['pop', +(T.b2In + 0.08 * i).toFixed(3), NOTE[(i * 2) % 7], 0.03, (i - 1.5) * 0.3]),
  ['riser', T.b2In + 0.6, T.say[0], 0.02],
  ...T.say.map((s, i) => ['pop', s, i % 2 ? 987.77 : 1318.51, 0.045, i % 2 ? 0.4 : -0.4]),
  ...talkCues(LINES, { cps: CPS }),
  // the checklist, the demo, the first peel, the cheer
  ...wordPops(T.h2, 5, 0.12, 1, 0.024),
  ...T.list.map((s, i) => ['bell', s + 0.05, [1174.66, 1318.51, 1760][i], 0.03, 0.7, 0]),
  ['tick', T.demo[0], 0.03], ['tick', T.demo[0] + 0.5, 0.03], ['tick', T.demo[0] + 1.0, 0.03],
  ['pop', T.peel, 1567.98, 0.05, 0], ['pop', T.peel + 0.06, 2093, 0.03, 0.1], ['glitter', T.peel + 0.05, T.peel + 0.4],
  ['pluck', T.cheer, 1174.66, 0.04, 0.5, -0.2], ['pluck', T.cheer + 0.12, 1479.98, 0.04, 0.5, 0.2], ['pop', T.cheer + 0.3, 1318.51, 0.03, 0],
  // the seal
  ['whoosh', T.letterBack[0], 0.4, 0.035], ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ...wordPops(T.h3, 2, 0.14, 0, 0.03),
  ['boom', T.seal, 0.3], ['tom', T.seal, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.seal, 0.07], ['bell', T.seal + 0.08, 1760, 0.03, 1.2, 0], ['glitter', T.seal + 0.05, T.seal + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
