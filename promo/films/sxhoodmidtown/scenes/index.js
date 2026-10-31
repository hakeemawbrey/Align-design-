// sxhoodmidtown · NEIGHBORHOOD STARS: "Midtown." (Star Talk Shows, show 11, 30 s vertical) · story 0–25.6, then the shared
// END CARD (default CTA). Houston's Midtown gets its own star: the social butterfly, out every night, forty friends at
// brunch. Show bug "★ NEIGHBORHOOD STARS · MIDTOWN" top-left the whole story. Beats on the 108 bpm grid (0.6 + n·0.5556).
//   0.00–5.30   HOOK "Midtown's star | is *always* out." — the Midtown skyline (mid-rises, a crane), the light rail
//               slides past, the MIDTOWN STAR pops in with its phone buzzing; three plan chips pop as it talks:
//               MIDTOWN STAR: "brunch at 11. rooftop at 4. *crawl* at 9."
//   5.40–10.25  "Forty friends. | One *brunch.*" — a brunch table that keeps getting longer; guests pop in row after
//               row (a "PARTY OF 12 → 24 → 40" chip), Midtown waves from the head: "table for forty, please!"; at the
//               far end ♓ Pisces cries into a waffle ("I can't hear anyone!!").
//  10.35        card cut (flip)
//  10.45–16.20 "Then *one* person | sits down." — a two-top on the sidewalk, a candle. ♋ CANCER STAR: "so… I've never
//               told anyone this—" while Midtown's eyes are on the phone: rule of three notifications (GROUP CHAT (38),
//               ROOFTOP CREW, …) → CANCER: "…are you *texting* right now?" → the third ping is from THE STARS: "look up."
//  16.30–21.95 "Put the phone | *down.*" — THE STARS pops in: "Midtown. phone *down*. one person." The phone flips face
//               down, the notifications poof, the skyline dims, a warm pool of light on the table; Midtown finally
//               looks at Cancer. CANCER: "wait… you're *listening*?" Midtown: heart eyes.
//  22.05        card cut (flip)
//  22.15–25.30 "One person. | *Full* attention." — a single card from tonight's deck lands between them; hearts; Pisces
//               happy-cries in a lit window up the tower. Last line = that headline.
// One canvas, DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR as STARC, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, LAV, AMBER, sparkle, chip, starFrame, inSprite, tearsCells, aside, showBug, skyline, train, phone, notif, table, waffle, candle, cardBack, pool, floatHearts } from './props.js'

export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
const BEAT = n => 0.6 + n * 0.5556
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const inK = (t, a, d = 0.3) => ease.outCubic(prog(t, a, a + d))

const MID = '#ff6fcf'                                   // the Midtown star: hot pink, no sign glyph (a neighborhood, not a sign)
const CAN = signStar('cancer'), PIS = signStar('pisces')
const TAG_M = 'MIDTOWN STAR', TAG_C = `${CAN.glyph} CANCER STAR`, TAG_N = 'THE STARS'
const CPS = 28
const BOX1 = [{ t: 1.95, speaker: TAG_M, color: MID, text: 'brunch at 11. rooftop at 4. *crawl* at 9.' }]
const BOX2 = [
  { t: 10.7, speaker: TAG_C, color: '#bfe6ff', text: "so… I've never told anyone this—" },
  { t: 13.7, speaker: TAG_C, color: '#bfe6ff', text: '…are you *texting* right now?' },
]
const BOX3 = [
  { t: 16.45, speaker: TAG_N, text: 'Midtown. phone *down*. one person.' },
  { t: 19.4, speaker: TAG_C, color: PINK, text: "wait… you're *listening*?" },
]
const BOXES = [[BOX1, 1.75, 5.3], [BOX2, 10.5, 16.2], [BOX3, 16.28, 22.0]]

// ── timeline
const T = {
  h0: 0.25, h0Late: BEAT(2), h0Out: 5.1, midIn: 0.55, train: [0.4, 4.9], plans: [2.3, 2.95, 3.55], buzz: [0.9, 1.7],
  B: 5.4, h1: 5.42, h1Late: BEAT(9), h1Out: 10.05, grow: [5.6, 8.2], rows: [5.9, 6.9, 7.8], pisIn: 7.1, wave: 8.4, pisCry: 8.9,
  C: 10.4, h2: 10.45, h2Late: BEAT(18), h2Out: 16.05, n1: 12.4, n2: 13.05, n3: 15.25, eyesUp: 15.6,
  h3: 16.3, h3Late: BEAT(28), h3Out: 21.75, narrIn: 16.3, flip: [18.2, 18.55], dim: [18.4, 19.2], looks: 18.6, heart: 20.6,
  h4: 22.15, h4Late: BEAT(39), card: 22.35, cardLand: 22.85, pisWin: 23.2, fade: [24.95, 25.3],
}
const inB = t => t >= T.B && t < T.C
const inA = t => t < T.B
const late = t => t >= T.C                         // the two-top (C, D, E)

// ── layout
const GROUND = 1410
const M_A = { x: 520, y: 1150, s: 300 }
const M_B = { x: 170, y: 1185, s: 190 }
const M_C = { x: 300, y: 1215, s: 230 }, C_C = { x: 790, y: 1215, s: 230 }
const TABLE_Y = 1348
const NARR = { x: 545, y: 800, s: 160 }

// the brunch: guests in three rows behind the long table
const GUESTS = (() => {
  const out = [], cols = ['#ffb86b', '#8fd8f6', '#c9a6ff', '#f59cc4', '#9fe08a', '#ffd98a', '#ff8fb1', '#7fd1c7']
  ;[[1265, 84, 330, 980, 80], [1180, 66, 360, 1010, 64], [1110, 52, 380, 1040, 52]].forEach(([y, s, x0, x1, step], row) => {
    for (let x = x0, i = 0; x <= x1; x += step, i++) out.push({ x, y, s, row, col: cols[(i * 3 + row * 5) % cols.length], seed: 20 + row * 17 + i })
  })
  return out
})()

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 36px Inter", "800 30px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const bug = showBug(el, root, 'MIDTOWN')
  const H0 = popText(root, 'Midtown’s star | is *always* out.', { top: 190, size: 104, accentSize: 150, at: T.h0, gap: 0.1, late: 2, lateAt: T.h0Late, lateGap: 0.14, wobble: true, accentColor: MID })
  const H1 = popText(root, 'Forty friends. | One *brunch.*', { top: 190, size: 108, accentSize: 156, at: T.h1, gap: 0.1, late: 1, lateAt: T.h1Late, wobble: true, accentColor: AMBER })
  const H2 = popText(root, 'Then *one* person | sits down.', { top: 190, size: 104, accentSize: 150, at: T.h2, gap: 0.1, late: 0, wobble: true, accentColor: '#bfe6ff', fit: true })
  const H3 = popText(root, 'Put the phone | *down.*', { top: 190, size: 108, accentSize: 170, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3Late, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'One person. | *Full* attention.', { top: 190, size: 108, accentSize: 160, at: T.h4, gap: 0.1, late: 0, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.fade[0]]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const M_HOPS = [T.midIn + 0.3, ...talkHops(BOX1, TAG_M, { cps: CPS }), T.B + 0.2, T.wave, T.wave + 0.45, T.C + 0.15, T.eyesUp, T.looks, T.heart, T.cardLand + 0.1]
  const C_HOPS = [T.C + 0.25, ...talkHops([...BOX2, ...BOX3], TAG_C, { cps: CPS }), T.cardLand]
  const N_HOPS = [T.narrIn + 0.3, ...talkHops(BOX3, TAG_N, { cps: CPS }), T.flip[1]]

  function midState(t) {
    if (t < 1.95) return { mood: 'happy', look: [1, 0.4] }                   // checking the phone
    if (t < 3.9) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.B) return { mood: 'wink', look: [0, 0] }
    if (t < T.wave) return { mood: 'happy', look: [1, 0] }
    if (t < T.pisCry) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.C) return { mood: 'wide', look: [1, 0], blink: false }          // …is Pisces ok
    if (t < T.eyesUp) return { mood: 'happy', look: [1, 1], blink: false }    // eyes on the phone the whole time
    if (t < 16.45) return { mood: 'wide', look: [0, -1], blink: false }       // "look up." …from the STARS?
    if (t < T.looks) return { mood: 'squint', look: [1, -1] }
    if (t < T.heart) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.h4) return { mood: 'heart' }
    return { mood: 'happy', look: [1, 0], blush: 1 }
  }
  function canState(t) {
    if (t < 12.4) return { mood: 'happy', look: [-1, 0], blush: 0.6 }
    if (t < 13.7) return { mood: 'neutral', look: [-1, 0.6] }                 // …notices the phone
    if (t < 16.3) return { mood: 'squint', look: [-1, 0.6] }
    if (t < T.looks) return { mood: 'neutral', look: [-1, 0] }
    if (t < 19.4) return { mood: 'wide', look: [-1, 0], blink: false }       // she looked up!
    if (t < T.h4) return { mood: 'sparkle', look: [-1, 0] }
    return { mood: 'happy', look: [-1, 0], blush: 1 }
  }
  function narrState(t) {
    if (t < 16.45) return { mood: 'wide', look: [-1, 1] }
    if (t < T.flip[0]) return { mood: 'squint', look: [-1, 1] }
    if (t < 20.6) return { mood: 'happy', look: [0, 0] }
    return { mood: 'sparkle', look: [0, 1] }
  }

  // ── A: the hook
  function drawA(t) {
    const tx = lerp(-60, 1500, ease.inOutQuad(prog(t, ...T.train)))
    if (t > T.train[0] && t < T.train[1]) train(x, tx, GROUND + 100, t, 0.9)
    const k = pop01(t, T.midIn, 0.45, 2.2) * outK(t, T.B - 0.2)
    const st = midState(t)
    drawStarChar(x, M_A.x, M_A.y, M_A.s, t, { color: MID, mood: st.mood, look: st.look, blink: st.blink, hops: M_HOPS, seed: 5, pop: k, glow: 1.15 })
    const buzz = (t > T.buzz[0] && t < T.buzz[1]) || (t > T.plans[0] && t < T.plans[2] + 0.4) ? 1 : 0
    phone(x, M_A.x + 215, M_A.y + 20, 1.15 * k, 0.22, t, { a: k, buzz })
    sparkle(x, M_A.x, M_A.y, t, T.midIn + 0.2, { n: 10, R: 200, seed: 4 })
    const PL = [['11 AM · BRUNCH', 290, 620, AMBER], ['4 PM · ROOFTOP', 790, 700, '#8fd8f6'], ['9 PM · CRAWL', 300, 780, MID]]
    PL.forEach(([s, px, py, c], i) => chip(x, px, py, s, pop01(t, T.plans[i], 0.34, 2.6) * outK(t, T.B - 0.3), { size: 32, col: c, edge: c }))
  }

  // ── B: the forty-friend brunch
  function drawB(t) {
    const a = inK(t, T.B, 0.25) * outK(t, T.C - 0.2, 0.2)
    const g = ease.inOutCubic(prog(t, ...T.grow))
    const x0 = lerp(120, -40, g), x1 = lerp(560, 1120, g)
    // guests (behind the table), row by row
    GUESTS.forEach((G, i) => {
      if (G.x > x1 - 30) return
      const k = pop01(t, T.rows[G.row] + (G.x - 330) / 2400, 0.3, 2.4) * a
      if (k <= 0) return
      drawStarChar(x, G.x, G.y, G.s, t, { color: G.col, mood: (i + Math.floor(t * 0.7)) % 4 ? 'happy' : 'neutral', seed: G.seed, pop: k, glow: 0.6, tips: false, bob: 3 })
    })
    table(x, x0, x1, TABLE_Y, { a, cloth: BONE, edge: AMBER })
    for (let px = 360; px < x1 - 40; px += 80) waffle(x, px, TABLE_Y - 2, 0.85 * pop01(t, T.rows[0] + (px - 330) / 2400 + 0.1, 0.3, 2.4) * a)
    // Pisces at the far end, crying into its waffle
    if (t > T.pisIn) {
      const k = pop01(t, T.pisIn, 0.36, 2.2) * a
      const opts = { color: PIS.color, mood: t < T.pisCry ? 'neutral' : 'squint', look: [-1, 0], seed: 11, pop: k, glow: 0.8, hops: [T.pisIn + 0.3, T.pisCry] }
      const P = { x: 985, y: 1262, s: 104 }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      if (t > T.pisCry) { const F = starFrame(P.x, P.y, P.s, t, opts); x.save(); x.globalAlpha = a; inSprite(x, F, () => tearsCells(x, t, 3)); x.restore() }
      aside(x, 760, 1010, "I can't hear anyone!!", pop01(t, T.pisCry, 0.3, 2.4) * a, { size: 30, edge: PIS.color, tx: P.x, ty: P.y - 40 })
    }
    // Midtown at the head of the table, waving everyone in
    const st = midState(t)
    const wave = t > T.wave && t < T.wave + 1 ? 0.12 * Math.sin((t - T.wave) * 18) : 0
    drawStarChar(x, M_B.x, M_B.y, M_B.s, t, { color: MID, mood: st.mood, look: st.look, blink: st.blink, hops: M_HOPS, seed: 5, pop: pop01(t, T.B, 0.4, 2.2) * a, glow: 1.1, squash: wave })
    aside(x, 330, 960, 'table for forty, please!', pop01(t, T.wave - 0.15, 0.3, 2.4) * outK(t, T.pisCry + 0.5) * a, { size: 30, edge: MID, tx: M_B.x, ty: M_B.y - 60 })
    const n = t < T.rows[1] ? 12 : t < T.rows[2] ? 24 : 40
    const bump = t > T.rows[1] && t < T.rows[1] + 0.25 || t > T.rows[2] && t < T.rows[2] + 0.25 ? 1.12 : 1
    chip(x, 540, 620, `PARTY OF ${n}`, pop01(t, T.rows[0], 0.3, 2.4) * a * bump, { size: 38, col: AMBER, edge: AMBER })
  }

  // ── C–E: the two-top on the sidewalk
  function drawLate(t) {
    const a = inK(t, T.C, 0.2) * (1 - ease.inQuad(prog(t, ...T.fade)))
    const dim = ease.inOutCubic(prog(t, ...T.dim))
    pool(x, 545, TABLE_Y, 420, 140, dim * a)
    // Pisces' window: happy tears, up the tower (E)
    if (t > T.pisWin) {
      const k = pop01(t, T.pisWin, 0.4, 2.2) * a
      const opts = { color: PIS.color, mood: 'happy', look: [1, 1], seed: 11, pop: k, glow: 0.9, bob: 2 }
      const P = { x: 905, y: 880, s: 84 }
      x.save(); x.globalAlpha = a; x.fillStyle = '#1b1236'; x.fillRect(P.x - 62, P.y - 56, 124, 112); x.fillStyle = '#ffd98a'; x.fillRect(P.x - 54, P.y - 48, 108, 96); x.restore()
      drawStarChar(x, P.x, P.y + 6, P.s, t, opts)
      const F = starFrame(P.x, P.y + 6, P.s, t, opts); x.save(); x.globalAlpha = a; inSprite(x, F, () => tearsCells(x, t, 3)); x.restore()
    }
    // the stars
    const ms = midState(t), cs = canState(t)
    drawStarChar(x, C_C.x, C_C.y, C_C.s, t, { color: CAN.color, glyph: CAN.glyph, mood: cs.mood, look: cs.look, blink: cs.blink, blush: cs.blush, hops: C_HOPS, seed: 9, pop: pop01(t, T.C + 0.05, 0.4, 2.2), alpha: a })
    drawStarChar(x, M_C.x, M_C.y, M_C.s, t, { color: MID, mood: ms.mood, look: ms.look, blink: ms.blink, blush: ms.blush, hops: M_HOPS, seed: 5, pop: pop01(t, T.C, 0.4, 2.2), alpha: a, glow: 1.1 })
    table(x, 250, 840, TABLE_Y, { a, cloth: '#3a2d78', edge: LAV })
    // candle (C, D) → the card (E)
    const cardK = pop01(t, T.card, 0.5, 1.6)
    candle(x, 690, TABLE_Y, t, a)
    if (t > T.card) {
      const land = ease.outCubic(prog(t, T.card, T.cardLand))
      cardBack(x, 545, lerp(1500, TABLE_Y - 92, land), 116, lerp(0.5, -0.06, land), a, cardK)
      sparkle(x, 545, TABLE_Y - 92, t, T.cardLand - 0.05, { n: 10, R: 150, seed: 77 })
      chip(x, 545, TABLE_Y - 210, "TONIGHT'S DECK · 1 CARD", pop01(t, T.cardLand + 0.1, 0.3, 2.4) * a, { size: 28, col: GOLD, edge: GOLD })
    }
    // the phone on the table (face up → face down)
    const down = ease.inOutCubic(prog(t, ...T.flip)), lift = Math.sin(Math.PI * down) * 70
    const buzz = [T.n1, T.n2, T.n3].some(n => t > n && t < n + 0.45) ? 1 : 0
    phone(x, 400, TABLE_Y - 34 - lift, 0.62, -1.45 + 0.1 * down, t, { a: a * (t < T.h4 ? 1 : outK(t, T.h4, 0.3)), down, buzz })
    if (t > T.flip[1]) sparkle(x, 400, TABLE_Y - 60, t, T.flip[1], { n: 8, R: 120, seed: 5 })
    // notifications stack above Midtown
    const nOut = t => outK(t, T.flip[0] + 0.05, 0.25)
    notif(x, 330, 600, 'GROUP CHAT (38)', 'where r u??', pop01(t, T.n1, 0.3, 2.4) * nOut(t) * a, { edge: LAV, fromCol: LAV, w: 440 })
    notif(x, 345, 720, 'ROOFTOP CREW', '4PM!! bring ppl', pop01(t, T.n2, 0.3, 2.4) * nOut(t) * a, { edge: '#8fd8f6', fromCol: '#8fd8f6', w: 440 })
    notif(x, 330, 840, 'THE STARS', 'look up.', pop01(t, T.n3, 0.36, 2.8) * nOut(t) * a, { edge: GOLD, fromCol: GOLD, w: 440 })
    for (const [ny, n] of [[600, 0], [720, 1], [840, 2]]) sparkle(x, 330, ny, t, T.flip[0] + 0.05 + n * 0.03, { n: 6, R: 120, seed: 40 + n, size: 22 })
    // THE STARS (D)
    if (t > T.narrIn && t < T.h4 + 0.4) {
      const st = narrState(t)
      drawStarChar(x, NARR.x + 200, NARR.y - 20, NARR.s, t, { color: STARC.sky, mood: st.mood, look: st.look, hops: N_HOPS, seed: 3, pop: pop01(t, T.narrIn, 0.45, 2.2) * outK(t, T.h4 - 0.1, 0.4), alpha: a, glow: 1.2 })
    }
    if (t > T.heart) floatHearts(x, t, 545, 1090, T.heart, 25, 1, 7, 360)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const fadeAll = 1 - ease.inQuad(prog(t, ...T.fade))
        const dim = ease.inOutCubic(prog(t, ...T.dim))
        skyline(x, t, { y: GROUND, alpha: inK(t, 0.1, 0.5) * fadeAll * (late(t) ? lerp(1, 0.75, dim) : 1), lit: 0.5, dim })
        if (inA(t)) drawA(t)
        if (inB(t)) drawB(t)
        if (late(t)) drawLate(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      bug.style.opacity = String(inK(t, 0.15, 0.4) * outK(t, END - 0.35, 0.3))
      for (const [H, o] of HEADS) H.update(t, outK(t, o, 0.22))
      for (const b of boxes) b.update(t)
      drawGrain(gx, t)
    },
  }
}

// ── sound (C-major palette; the engine moves pitched cues into the key)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FILM_CUES = [
  // A
  ...wordPops(T.h0, 3, 0.1, 0), ['pop', r3(T.h0Late), 1046.5, 0.045, -0.1], ['pluck', r3(T.h0Late + 0.14), 1318.51, 0.045, 0.6, 0.1],
  ['whoosh', T.train[0], 1.6, 0.03], ['pop', T.midIn, 783.99, 0.045, 0], ['bell', r3(T.midIn + 0.05), 1567.98, 0.02, 1.0, 0],
  ['tick', T.buzz[0], 0.04], ['tick', r3(T.buzz[0] + 0.12), 0.04], ['tick', r3(T.buzz[0] + 0.5), 0.04], ['tick', r3(T.buzz[0] + 0.62), 0.04],
  ...T.plans.map((p, i) => ['pop', p, [880, 1046.5, 1318.51][i], 0.04, (i - 1) * 0.4]),
  // B
  ...wordPops(T.h1, 3, 0.1, 2, 0.026), ['pop', r3(T.h1Late), 1174.66, 0.05, 0], ['pluck', r3(T.h1Late), 880, 0.045, 0.6, 0],
  ['whoosh', T.grow[0], 2.4, 0.035],
  ...T.rows.flatMap((r, i) => [0, 1, 2, 3].map(j => ['pop', r3(r + j * 0.09), NOTE[(i * 2 + j) % 7] * 1.5, 0.018, (j % 2 ? 0.4 : -0.4)])),
  ['pop', T.wave, 1046.5, 0.035, -0.4], ['pop', r3(T.wave + 0.45), 1174.66, 0.03, -0.4],
  ['pop', T.pisIn, 659.25, 0.035, 0.5], ['pop', T.pisCry, 523.25, 0.04, 0.5], ['pop', r3(T.pisCry + 0.12), 440, 0.035, 0.5],
  // C
  ...wordPops(T.h2, 5, 0.1, 1, 0.026),
  ...[T.n1, T.n2].flatMap(n => [['pop', n, 1567.98, 0.04, -0.3], ['tick', r3(n + 0.05), 0.04], ['tick', r3(n + 0.2), 0.04]]),
  ['bell', T.n3, 1318.51, 0.05, 1.6, -0.3], ['bell', r3(T.n3 + 0.05), 1975.53, 0.03, 1.6, -0.3],
  // D
  ...wordPops(T.h3, 3, 0.1, 3, 0.026), ['pop', r3(T.h3Late), 1046.5, 0.05, 0], ['pluck', r3(T.h3Late), 783.99, 0.05, 0.7, 0],
  ['pop', T.narrIn, 1174.66, 0.04, 0.4], ['bell', r3(T.narrIn + 0.05), 1760, 0.02, 1.2, 0.4],
  ['whoosh', T.flip[0], 0.4, 0.04], ['boom', T.flip[1], 0.09], ['tick', T.flip[1], 0.06], ['glitter', T.flip[1], r3(T.flip[1] + 0.6)],
  ['pluck', T.looks, 1046.5, 0.04, 0.6, 0], ['bell', T.heart, 1318.51, 0.035, 1.6, 0], ['pluck', r3(T.heart + 0.08), 1567.98, 0.035, 0.5, 0],
  // E
  ...wordPops(T.h4, 4, 0.1, 0, 0.028),
  ['whoosh', T.card, 0.4, 0.04], ['tick', T.cardLand, 0.06], ['bell', T.cardLand, 1046.5, 0.04, 2.0, 0], ['glitter', T.cardLand, r3(T.cardLand + 0.7)],
  ['pop', T.pisWin, 783.99, 0.03, 0.4],
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [TAG_M]: 1046.5, [TAG_C]: 659.25, [TAG_N]: 880 } })),
]

// card-motif candidates (cardfx keeps 10.35 + 22.05):
//   5.35  box 1 shut (5.3), H0 out (5.1–5.32) → "Forty friends." (5.42)
//  10.35  H1 out (10.05–10.27), the brunch out (10.2–10.4) → the two-top (10.4)
//  16.25  box 2 shut (16.2), H2 out (16.27) → "Put the phone down." (16.3)
//  22.05  box 3 shut (22.0), H3 out (21.97) → "One person. Full attention." (22.15)
const CUTS = [{ t: 5.35, kind: 'flip' }, { t: 10.35, kind: 'flip' }, { t: 16.25, kind: 'deal' }, { t: 22.05, kind: 'flip', dir: -1 }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END }),
  cardFrame({ start: 0, end: END, corners: 'tr bl br' }),
  cardCuts(CUTS),
]
export { T }
