// srhtxbrunch (30 s vertical, Star Talk Remix of htxbrunch "Another Midtown brunch") · story 0–25.6, then the shared end
// card. THE STARS work your brunch as the waiter (a gold star in a tiny red bow tie, with an order pad); ♓ Pisces cries
// behind your date, as always.
//   0.00–4.95  "Another Midtown | brunch with someone | who's *“just seeing | where it goes.”*"  the brunch table: you
//              (gold) and your date (grey), pancakes, mimosas; the date's "idk lol" bubble shrugs on the beat. The waiter
//              star pops up with its pad. Box: "bottomless mimosas. *bottomless* maybes." (eye-roll)
//   5.00–11.2  "The big questions | show up… *late.*"  three thought clouds rise from your head, each stamped with the
//              brunch it finally showed up at (#3 "No kids?", #7 "Moving to Austin?", #12 "Not looking for anything
//              serious?"); empty flutes pile up; the waiter's pad reads #3 → #7 → #12 and it double-takes at the last.
//              Box: "babe. that's a *day one* question."  The red TOO LATE. stamp slams (9.77); the star rolls its eyes.
//   11.30 cut → "On Align, | dealbreakers | come *first.*"  the waiter presents the DEALBREAKERS card like a menu; three
//              chips stamp on, the last the callback (✕ "JUST SEEING WHERE IT GOES"); Pisces gasps.
//              Box: "menu first. *then* the mimosas." → "it's on your card. *day one.*"
//   17.82      ★ LESSON UNLOCKED: "Ask the big questions | before the *mimosas.*" (+1 BOTTOMLESS HONESTY)
//   22.10 cut → "Brunch with | *intention.*"  the table is back with a new date (pink); two flutes rise and clink, the
//              waiter goes heart-eyed then winks, Pisces cries happy. Box: "table for two. *on purpose.*"  Out by 25.45.
// One canvas (sky + props + stars), DOM type + two dialogue boxes + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  BONE, GOLD, PINK, RED, DULL, MIMOSA, rgba, sparkle, starFrame, inSprite, tearsCells, bowtieCells,
  person, table, flute, pancakes, cloud, trail, sticker, stamp, dealCard, chip, notepad, DCARD, CHIP_Y, CHIPS,
} from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const PIS = signStar('pisces')
const r3 = v => +v.toFixed(3)

// ── the timeline
const T = {
  // hook
  h0: 0.12, h0Late: BEAT(2), h0Out: [4.75, 4.93], tableIn: 0.2, idk: BEAT(3), shrugs: [BEAT(4), BEAT(5), BEAT(6)], idkOut: [4.6, 4.9],
  waiterIn: 1.45, open: 2.2, roll1: [3.75, 4.5],
  // late questions
  h1: 5.05, h1Late: BEAT(9), h1Out: [10.95, 11.15], glide: [4.85, 5.55], pisIn: 5.4,
  bub: [BEAT(10), BEAT(12), BEAT(14)], stamp: BEAT(16.5), roll2: [10.25, 11.0], b2Out: [11.0, 11.25],
  cut1: 11.3,
  // dealbreakers
  h2: 11.36, h2Late: BEAT(20), h2Out: [17.45, 17.65], card: 11.75, chips: [BEAT(22), BEAT(23.5), BEAT(25)], b3Out: [17.5, 17.78],
  close1: 17.6,
  lesson: BEAT(31), lessonOut: [21.85, 22.05],
  cut2: 22.1,
  // brunch with intention
  h3: 22.15, h3Late: BEAT(39.5), raise: [22.75, BEAT(41)], clink: BEAT(41), wink: [24.3, 24.75], open2: 22.3, close2: 25.3,
  out: [25.05, 25.45], h3Out: [25.15, 25.42],
}
const SPEAK = 'THE STARS'
const LINES1 = [
  { t: 2.4, speaker: SPEAK, text: 'bottomless mimosas. *bottomless* maybes.' },
  { t: 8.55, speaker: SPEAK, text: "babe. that's a *day one* question." },
  { t: 12.25, speaker: SPEAK, text: 'menu first. *then* the mimosas.' },
  { t: 14.75, speaker: SPEAK, text: "it's on your card. *day one.*" },
]
const LINES2 = [
  { t: 22.5, speaker: SPEAK, text: 'table for two. *on purpose.*' },
]
const CPS = 30
const HOPS = [T.waiterIn + 0.35, ...talkHops(LINES1, SPEAK, { cps: CPS }), ...talkHops(LINES2, SPEAK, { cps: CPS }), ...T.chips.map(c => c + 0.04), T.clink + 0.05, T.clink + 0.6]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Ask the big questions | before the *mimosas.*', chip: '+1 BOTTOMLESS HONESTY' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const TY = 1185, TK = 0.86                         // table top, table scale
const YOU = { x: 205, col: GOLD }, DATE = { x: 875 }
const W1 = { x: 460, y: 790, size: 260 }            // the waiter, hook
const W2 = { x: 915, y: 700, size: 200 }            // the waiter, late questions (behind the date)
const W3 = { x: 185, y: 1290, size: 240 }           // presenting the card
const W4 = { x: 540, y: 690, size: 260 }            // over the clink
const PIS2 = { x: 995, y: 875, size: 120 }, PIS3 = { x: 910, y: 1335, size: 160 }, PIS4 = { x: 990, y: 860, size: 130 }
const CARD = { x: 560, y: 960, s: 0.9 }
const BUBS = [
  { lines: ['No kids?'], tag: 'BRUNCH #3', x: 470, y: 885, w: 360, h: 80, rot: -2 },
  { lines: ['Moving to Austin?'], tag: 'BRUNCH #7', x: 420, y: 720, w: 560, h: 80, rot: 2 },
  { lines: ['Not looking for', 'anything serious?'], tag: 'BRUNCH #12', x: 420, y: 540, w: 580, h: 140, rot: -1.5 },
]
const EMPTIES = [[330, -4], [745, 6], [445, 3], [640, -8], [300, 82], [790, -3]]

function waiterState(t) {
  if (t < T.open) return { mood: 'happy' }
  if (t >= T.roll1[0] && t < T.roll1[1]) return { mood: 'eyeroll', blink: false }
  if (t < T.bub[0]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.bub[1]) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.bub[2]) return { mood: 'squint', look: [-1, -1] }
  if (t < T.stamp) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t >= T.roll2[0] && t < T.roll2[1]) return { mood: 'eyeroll', blink: false }
  if (t < T.cut1) return { mood: 'squint', look: [-1, 0] }
  if (t < T.chips[0]) return { mood: 'happy' }
  if (t < T.lesson) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.clink) return { mood: 'sparkle', look: [0, 1] }
  if (t < T.wink[0]) return { mood: 'heart' }
  if (t < T.wink[1]) return { mood: 'wink' }
  return { mood: 'happy' }
}
function pisState(t) {
  if (t < T.stamp) return { mood: 'squint', tears: 2 }
  if (t < T.cut1) return { mood: 'squint', tears: 3 }
  if (t < T.chips[2]) return { mood: 'neutral', look: [-1, -1], tears: 0 }
  if (t < T.lesson) return { mood: 'wide', look: [-1, -1], tears: 0, blink: false }
  if (t < T.clink) return { mood: 'heart', tears: 1 }
  return { mood: 'happy', tears: 3 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 80px Inter", "italic 500 150px 'EB Garamond'", "italic 500 62px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Another Midtown | brunch with someone | who’s *“just seeing* | *where it goes.”*', { top: 150, size: 84, accentSize: 110, at: T.h0, gap: 0.06, late: 4, lateAt: T.h0Late, lateGap: 0.12, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H1 = popText(root, 'The big questions | show up… *late.*', { top: 170, size: 92, accentSize: 140, at: T.h1, gap: 0.07, late: 1, lateAt: T.h1Late, wobble: true, accentColor: RED, lineHeight: 1.0 })
  const H2 = popText(root, 'On Align, | dealbreakers | come *first.*', { top: 150, size: 100, accentSize: 150, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Late, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H3 = popText(root, 'Brunch with | *intention.*', { top: 190, size: 130, accentSize: 176, at: T.h3, gap: 0.08, late: 1, lateAt: T.h3Late, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1450, width: 960, height: 290, open: T.open, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1450, width: 960, height: 290, open: T.open2, close: T.close2, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the "idk lol" speech bubble with shrugging arms (the date's)
  function idkBubble(t, cx, cy, s, a) {
    if (a <= 0 || s <= 0.01) return
    let lift = 0
    for (const sh of T.shrugs) if (t >= sh && t < sh + 0.5) lift = Math.sin(Math.PI * (t - sh) / 0.5)
    x.save(); x.globalAlpha *= a; x.translate(cx, cy - lift * 22); x.scale(s * (1 + 0.04 * lift), s * (1 - 0.04 * lift))
    const w = 400, h = 170
    for (const sd of [-1, 1]) {
      const sx = sd * (w / 2 - 6), sy = 14, ex = sd * (w / 2 + 52), ey = 52 - lift * 34, hx = sd * (w / 2 + 92), hy = 6 - lift * 70
      x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex, ey); x.lineTo(hx, hy); x.lineJoin = 'round'; x.lineCap = 'round'; x.strokeStyle = BONE; x.lineWidth = 12; x.shadowColor = BONE; x.shadowBlur = 14; x.stroke(); x.shadowBlur = 0
    }
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 70)
    x.moveTo(w / 2 - 120, h / 2 - 4); x.lineTo(w / 2 - 40, h / 2 + 80); x.lineTo(w / 2 - 60, h / 2 - 4)
    x.fillStyle = '#d8d4ea'; x.fill(); x.strokeStyle = BONE; x.lineWidth = 6; x.shadowColor = BONE; x.shadowBlur = 18; x.stroke(); x.shadowBlur = 0
    x.fillStyle = '#1a1430'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = "800 84px Inter, 'Helvetica Neue', Arial, sans-serif"
    x.fillText('idk lol', 0, 4)
    x.restore()
  }

  // the waiter (THE STARS): position per beat, pad in hand
  function waiterPos(t) {
    if (t < T.glide[0]) return W1
    if (t < T.cut1) { const e = ease.inOutCubic(prog(t, ...T.glide)); return { x: lerp(W1.x, W2.x, e), y: lerp(W1.y, W2.y, e) - Math.sin(Math.PI * e) * 120, size: lerp(W1.size, W2.size, e) } }
    if (t < T.cut2) return W3
    return W4
  }
  function drawWaiter(t, ok) {
    const inT = t < T.cut1 ? T.waiterIn : t < T.cut2 ? T.card - 0.2 : T.h3 + 0.25
    const pp = pop01(t, inT, 0.38, 2.2) * ok
    if (pp <= 0.02) return
    const P = waiterPos(t), st = waiterState(t)
    let squash = 0
    if (t >= T.bub[2] && t < T.bub[2] + 0.35) squash = -0.14 * Math.exp(-(t - T.bub[2]) * 8) * Math.cos((t - T.bub[2]) * 22)
    if (t >= T.stamp && t < T.stamp + 0.5) squash += 0.2 * Math.exp(-(t - T.stamp) * 7) * Math.cos((t - T.stamp) * 20)
    const opts = { hops: HOPS, seed: 3, pop: pp, squash }
    const r = drawStarChar(x, P.x, P.y, P.size, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, glow: 1.1, ...opts })
    inSprite(x, starFrame(P.x, P.y, P.size, t, opts), () => bowtieCells(x))
    // the order pad (beats 1–2): writes the brunch number
    if (t < T.cut1) {
      let k = prog(t, T.waiterIn + 0.4, T.waiterIn + 1.6), txt = null
      T.bub.forEach((b, i) => { if (t >= b) { k = prog(t, b, b + 0.6); txt = ['#3', '#7', '#12'][i] } })
      const side = P.x > 700 ? -1 : 1
      notepad(x, r.x + side * P.size * 0.52, r.y + P.size * 0.12, k, { a: pp, rot: side * 0.14, text: txt, s: P.size / 230 })
    }
  }
  function drawPisces(t, ok, at, P) {
    const pp = pop01(t, at, 0.36, 2.1) * ok
    if (pp <= 0.02) return
    const st = pisState(t)
    const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const opts = { hops: [at + 0.3, T.chips[2] + 0.05, T.clink + 0.12, T.clink + 0.74], seed: 6, pop: pp, squash: sob }
    drawStarChar(x, P.x, P.y, P.size, t, { color: PIS.color, glyph: null, mood: st.mood, look: st.look, blink: st.blink, glow: 0.9, ...opts })
    inSprite(x, starFrame(P.x, P.y, P.size, t, opts), () => tearsCells(x, t, st.tears))
  }

  function brunchTable(t, k, { dateCol = DULL, empties = 0, flutesOn = true, raise = 0, ok = 1 }) {
    if (k <= 0.01) return
    x.save(); x.globalAlpha *= clamp(k * 2) * ok
    person(x, YOU.x, TY + 10, YOU.col, { s: 0.86 * k, bob: Math.sin(t * 2.1) * 3 })
    person(x, DATE.x, TY + 10, dateCol, { s: 0.86 * k, bob: Math.sin(t * 2.1 + 1.3) * 3 })
    table(x, 540, TY, 1, TK * k)
    pancakes(x, 540, TY - 6, t, { s: 0.78 * k })
    // empties pile up (late questions)
    EMPTIES.forEach(([ex, rot], i) => {
      if (i >= empties) return
      const p = pop01(t, T.bub[Math.floor(i / 2)] + (i % 2) * 0.18, 0.3, 2.2)
      flute(x, ex, TY - 6, t, { level: 0, s: 0.6 * p * k, rot, col: DULL })
    })
    if (flutesOn) {
      // your flute and theirs; on the raise they lift and meet over the pancakes
      const e = ease.inOutCubic(raise), land = raise >= 1 ? t - T.clink : -1
      const jig = land >= 0 && land < 0.4 ? -14 * Math.exp(-land * 9) * Math.cos(land * 30) : 0
      flute(x, lerp(370, 490, e) + jig, lerp(TY - 6, 985, e), t, { level: 0.82, s: 0.72 * k, rot: lerp(0, 20, e), seed: 2 })
      flute(x, lerp(710, 590, e) - jig, lerp(TY - 6, 985, e), t, { level: 0.82, s: 0.72 * k, rot: lerp(0, -20, e), seed: 5 })
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)

      if (t < T.cut1) {
        // ── beats 1–2: the brunch
        const k = pop01(t, T.tableIn, 0.5, 1.6) * outK(t, T.b2Out)
        brunchTable(t, k, { empties: t >= T.bub[0] ? (t >= T.bub[2] ? 6 : t >= T.bub[1] ? 4 : 2) : 0 })
        const ia = pop01(t, T.idk, 0.35, 2.2) * outK(t, T.idkOut)
        idkBubble(t, 838, 715, 0.56 * ia, clamp(ia * 2))
        // Pisces peeks out behind the date (late questions)
        drawPisces(t, outK(t, T.b2Out), T.pisIn, PIS2)
        drawWaiter(t, 1)
        // thought clouds rise from your head, each tagged with the brunch it finally showed up at
        const ca = outK(t, T.b2Out)
        trail(x, YOU.x + 20, TY - 265, BUBS[0].x - BUBS[0].w / 2 + 10, BUBS[0].y + 30, pop01(t, T.bub[0] - 0.15, 0.3) * ca)
        BUBS.forEach((B, i) => {
          const p = pop01(t, T.bub[i], 0.4, 2.0)
          if (p <= 0.01) return
          x.save(); x.translate(B.x, B.y); x.rotate(B.rot * Math.PI / 180); x.scale(p, p)
          cloud(x, B.w, B.h, B.lines, { a: ca, size: 56 })
          x.translate(B.w / 2 - 30, -B.h / 2 - 34); x.rotate(0.12); sticker(x, B.tag, ca * clamp((t - T.bub[i] - 0.15) * 4))
          x.restore()
        })
        // TOO LATE.
        if (t >= T.stamp - 0.12) {
          const sp = prog(t, T.stamp - 0.12, T.stamp), sc = lerp(2.4, 1, ease.inQuad(sp)) + (t > T.stamp ? 0.08 * Math.exp(-(t - T.stamp) * 9) * Math.cos((t - T.stamp) * 30) : 0)
          x.save(); x.translate(540, 730); x.rotate(-0.12); x.scale(sc, sc)
          stamp(x, 'TOO LATE.', ca * clamp(sp * 2.5), { w: 800, h: 220, size: 140 })
          x.restore()
          sparkle(x, 540, 730, t, T.stamp, { n: 16, R: 420, seed: 40, size: 30, cols: [RED, '#ff8a80', '#fff3e0'] })
        }
      } else if (t < T.cut2) {
        // ── beat 3: the dealbreakers card, presented like a menu
        const a = outK(t, T.b3Out)
        const ck = pop01(t, T.card, 0.45, 1.7) * a
        if (ck > 0.01) {
          x.save(); x.translate(CARD.x, CARD.y + Math.sin(t * 1.6) * 6); x.rotate(0.015 * Math.sin(t * 1.2)); x.scale(CARD.s * ck, CARD.s * ck); x.globalAlpha *= clamp(ck * 2)
          dealCard(x)
          T.chips.forEach((tc, i) => {
            if (t < tc - 0.12) return
            const sp = prog(t, tc - 0.12, tc), sc = lerp(1.9, 1, ease.inQuad(sp)) + (t > tc ? 0.06 * Math.exp(-(t - tc) * 9) * Math.cos((t - tc) * 30) : 0)
            x.save(); x.translate(0, CHIP_Y[i]); x.scale(sc, sc); x.globalAlpha *= clamp(sp * 2.5)
            chip(x, CHIPS[i], clamp(1 - (t - tc) * 2))
            x.restore()
          })
          x.restore()
          T.chips.forEach((tc, i) => sparkle(x, CARD.x, CARD.y + CHIP_Y[i] * CARD.s, t, tc, { n: i === 2 ? 16 : 10, R: i === 2 ? 440 : 360, seed: 60 + i, size: i === 2 ? 30 : 24, cols: [RED, '#ff8a80', GOLD, '#fff3e0'] }))
        }
        drawPisces(t, a, T.card + 0.15, PIS3)
        drawWaiter(t, a)
      } else {
        // ── beat 4: brunch with intention
        const k = pop01(t, T.h3 - 0.05, 0.5, 1.6)
        brunchTable(t, k, { dateCol: PINK, raise: prog(t, ...T.raise), ok })
        drawPisces(t, ok, T.h3 + 0.4, PIS4)
        drawWaiter(t, ok)
        if (t >= T.clink) {
          sparkle(x, 540, 790, t, T.clink, { n: 16, R: 260, seed: 7, size: 30, cols: [GOLD, '#ffd98a', PINK, '#fff3e0'] })
          // little hearts drift up from the waiter
          for (let i = 0; i < 5; i++) {
            const born = T.clink + 0.1 + i * 0.3, p = (t - born) / 1.2
            if (p < 0 || p >= 1) continue
            x.save(); x.globalAlpha *= Math.sin(Math.PI * p) * ok; drawPixelStar(x, W4.x + (i % 2 ? 150 : -150) + Math.sin(p * 6 + i) * 24, W4.y - 60 - p * 200, 22, 2, PINK); x.restore()
          }
        }
      }

      box1.update(t); box2.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.97 (hook → late questions), 11.3 (TOO LATE → dealbreakers), 17.8 (→ lesson), 22.1
// (lesson → "Brunch with intention."). cardfx keeps two for a 30 s film: the 11.3 flip and the 22.1 shuffle.
const CUTS = [4.97, { t: T.cut1, kind: 'flip' }, 17.8, { t: T.cut2, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop/pluck/bell are re-keyed by the engine; chip/tom/clap sit on a private sfx bus)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.14, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base) => [...wordPops(t0, n, gap, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const stampSfx = (t, g = 0.3) => [['tom', t, 82, { ...FX, gain: g, decay: 0.3 }], ['boom', t, 0.12], ['clap', r3(t + 0.005), { ...FX, gain: 0.15 }], ['tick', t, 0.09]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const fizz = t => [0, 0.05, 0.11, 0.16].map((d, i) => ['tick', r3(t + d), 0.012 + 0.004 * (i % 2)])

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // hook: brunch table, the shrug
  ...wordPops(T.h0, 8, 0.06, 0, 0.022), ...[0, 1, 2, 3].map(i => ['pop', r3(T.h0Late + i * 0.12), NOTE[(3 + i) % 7], 0.04, 0]), ['pluck', T.h0Late + 0.36, 1174.66, 0.04, 0.6, 0],
  ['pop', T.tableIn + 0.1, 587.33, 0.04, 0], ['boom', T.tableIn, 0.08], ...fizz(0.9),
  ['pop', T.idk, 880, 0.04, 0.3], ...T.shrugs.map(s => ['pluck', s, 739.99, 0.03, 0.3, 0.3]),
  ['pop', T.waiterIn + 0.05, 739.99, 0.045, -0.2], ['bell', T.waiterIn + 0.1, 1318.51, 0.02, 0.8, -0.2],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES1, { cps: CPS, pitch: { [SPEAK]: 740 } }), ...talkCues(LINES2, { cps: CPS, pitch: { [SPEAK]: 740 } }),
  ['whoosh', T.roll1[0], 0.4, 0.02],
  // late questions: clouds, empties, the stamp
  ['whoosh', T.h0Out[0], 0.3, 0.035], ['whoosh', T.glide[0] + 0.1, 0.5, 0.03], ...head(T.h1, 4, 0.07, T.h1Late, 2),
  ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ...sob(6.4, 1320), ...sob(9.95, 1250, 3),
  ...T.bub.flatMap((b, i) => [['pop', b, [659.25, 739.99, 880][i], 0.045, -0.2], ['pop', r3(b + 0.08), [880, 987.77, 1174.66][i], 0.035, -0.1], ['tick', r3(b + 0.2), 0.05], ['tick', r3(b + 0.38), 0.04]]),
  ['pop', T.bub[2] + 0.02, 440, 0.04, 0.3], ['whoosh', T.bub[2], 0.2, 0.03],
  ['whoosh', T.stamp - 0.2, 0.2, 0.045], ...stampSfx(T.stamp, 0.34),
  ...[880, 783.99, 659.25, 554.37, 440].map((f, i) => ['pluck', r3(T.stamp + 0.2 + i * 0.11), f, 0.03, 0.3, -0.2 + i * 0.1]),
  ['whoosh', T.roll2[0], 0.4, 0.02],
  // dealbreakers: the card, three chips
  ...head(T.h2, 4, 0.08, T.h2Late, 1),
  ['whoosh', T.card - 0.05, 0.35, 0.05], ['bell', T.card + 0.35, 1174.66, 0.035, 1.4, 0], ['glitter', T.card + 0.3, T.card + 0.9],
  ...T.chips.flatMap((tc, i) => [['whoosh', r3(tc - 0.2), 0.2, 0.035], ...stampSfx(tc, i === 2 ? 0.32 : 0.2), ['pop', tc, [739.99, 880, 1174.66][i], 0.045, 0]]),
  ['bell', T.chips[2] + 0.04, 587.33, 0.04, 1.0, 0], ['pop', T.chips[2] + 0.12, 1318.51, 0.03, 0.4],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Fm' }),
  // brunch with intention: the clink
  ...wordPops(T.h3, 2, 0.08, 1), ['pop', T.h3Late, 1318.51, 0.05, 0], ['pluck', T.h3Late, 1174.66, 0.045, 0.7, 0], ['glitter', T.h3Late, T.h3Late + 0.6],
  ['pop', T.open2, 739.99, 0.04, 0], ['whoosh', T.raise[0], 0.5, 0.025],
  ['bell', T.clink, 2349.32, 0.05, 1.6, -0.1], ['bell', r3(T.clink + 0.02), 2793.83, 0.04, 1.6, 0.1], ['glitter', T.clink, T.clink + 0.8], ...fizz(T.clink + 0.2),
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ...sob(T.clink + 0.2, 1568), ...sob(T.clink + 0.9, 1660, 2),
  ['pop', T.close2, 880, 0.03, 0], ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
