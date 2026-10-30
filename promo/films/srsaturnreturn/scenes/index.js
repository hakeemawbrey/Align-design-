// srsaturnreturn — "What's a Saturn return?" (45 s vertical, Star Talk Remix of promo/films/saturnreturn; synthwave, Fm).
// THE STARS (gold) explain it to YOUR STAR (♌), who panics: Saturn laps the Sun in about 29½ years, comes back to where
// it was when you were born… and turns out to be an inspector (it opens its eyes, puts on reading glasses, clipboard).
// Story 0–40.6, then the shared end card.
//   0.00–4.4   "What's a | *Saturn return?*"  a big bouncy Saturn with gold ?s.  THE STARS: "heads up. Saturn's coming
//              *back.*"  YOUR STAR (wide): "back?? did I do *something?*"
//   4.4–11.5   (drop) top-down Sun, Saturn's slow lap, Earth zipping round (EARTH LAPS counter).  "Saturn takes about |
//              *29½ years* | to lap the Sun."  THE STARS: "it's slow. it takes the scenic *route.*"  YOUR STAR's eyes
//              follow Earth round and round: "I'm dizzy just *watching.*"
//  11.62       card cut
//  11.7–22.5   the diagram shrinks above a 0–60 life timeline; Saturn marches to ~29 and lands on the gold birth star:
//              DING (17.82).  "When it gets back to | where it was when | you were born…" → "…that's your | *Saturn return.*"
//              THE STARS: "it comes back to *check on you.*"  YOUR STAR: "like a… *landlord?*"  THE STARS: "a very
//              *thorough* landlord."  Saturn zooms in… opens its EYES, puts on reading glasses, a clipboard pops:
//              INSPECTION · AGE ~29.  Pisces arrives in the back, already crying.
//  22.62       card cut
//  22.7–31.1   (lift) the inspection, ages 27–30: "Big decisions." · "Growing up." · "*Glow up.*"  NEW JOB? ✓ ·
//              MOVING OUT? ✓ · TEXTING THE EX? ✕ LET IT GO · COMMITMENT? ✓ READY (Pisces sobs).  YOUR STAR: "it's asking
//              about my *career.*" … "…and my *ex?!*"  THE STARS: "it asks about *everything.*"
//  31.2        card cut
//  31.25–33.3  "Round two: | *around 58.*"  ♄ SATURN: "see you at *58!*"  YOUR STAR faints flat.
//  33.38–37.4  ★ LESSON UNLOCKED: "Growing pains | mean you're | *growing.*"  +1 BACKBONE
//  37.45–40.55 dealbreakers: YOUR STAR's veiled card gets its dealbreakers stamped; Saturn ticks it.
//              THE STARS: "put your dealbreakers on your *card.*"  Last line: "Saturn's not mean. | It's *thorough.*"
//  40.6        end card.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { BONE, GOLD, PINK, SAT, MONO, makeBurst, drawBurst, wave, saturn, sun, earth, star, flag, boxes, briefcase, weddingRing, clipboard, bigCheck, glowStroke, rgba } from './draw.js'
import { starFrame, cellToWorld, inSprite, tearsCells, sweatDrop, drawChip, planetEyes, drawStamp, STAMP, qmarks, drawMysteryCard, bmp, BM, INK } from './props.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const B = n => +(0.6 + n * 0.5556).toFixed(3)
const P = 29.45
const LEO = signStar('leo'), PIS = signStar('pisces')
const SKY_TAG = 'THE STARS', YS_TAG = `${LEO.glyph}︎ YOUR STAR`, SAT_TAG = '♄︎ SATURN'
const YS_COL = '#ffb36b', SAT_COL = '#f6c886'

// ── the timeline
export const T = {
  h0: 0.15, h0Land: 0.95, h0Out: [4.2, 4.38], satIn: 0.3,
  shrink: [4.4, 5.1], drop: B(7), h1: 4.55, h1Out: [11.3, 11.48], lap: [5.2, 11.2],
  cut1: 11.62,
  dial: [11.55, 12.25], line: [11.9, 12.5], march: [12.4, B(31)], h2: 11.75, h2Out: [16.5, 16.66], h3: 16.75, h3Land: B(31),
  zoom: [19.15, 19.8], eyes: 19.95, glasses: 20.45, clip: 20.6, insp: 20.85, out2: [22.3, 22.55],
  cut2: 22.62,
  lift: B(40), items: [22.9, 24.8, 26.55, 28.55], stampD: 0.75, glowUp: 28.55, out3: [30.9, 31.12],
  cut3: 31.2,
  h5: 31.25, h5Land: 31.75, faint: 32.05, out4: [33.15, 33.35],
  lesson: B(59), lessonOut: [37.25, 37.45],
  card: 37.5, rows: [38.05, 38.55], check: 39.35, h7: 37.5, h7Land: 38.9, out: [40.35, 40.58],
}
T.ding = T.march[1]

const BOX_A = [
  { t: 0.5, speaker: SKY_TAG, text: "heads up. Saturn's coming *back.*" },
  { t: 3.35, speaker: YS_TAG, color: YS_COL, text: 'back?? did I do *something?*' },
  { t: 6.1, speaker: SKY_TAG, text: "it's slow. it takes the scenic *route.*" },
  { t: 9.15, speaker: YS_TAG, color: YS_COL, text: "I'm dizzy just *watching.*" },
]
const BOX_B = [
  { t: 12.5, speaker: SKY_TAG, text: 'it comes back to *check on you.*' },
  { t: 15.3, speaker: YS_TAG, color: YS_COL, text: 'like a… *landlord?*' },
  { t: 17.95, speaker: SKY_TAG, text: 'a very *thorough* landlord.' },
]
const BOX_C = [
  { t: 23.15, speaker: YS_TAG, color: YS_COL, text: "it's asking about my *career.*" },
  { t: 26.7, speaker: YS_TAG, color: YS_COL, text: '…and my *ex?!*' },
  { t: 28.65, speaker: SKY_TAG, text: 'it asks about *everything.*' },
]
const BOX_D = [{ t: 31.35, speaker: SAT_TAG, color: SAT_COL, text: 'see you at *58!*' }]
const BOX_E = [{ t: 37.55, speaker: SKY_TAG, text: 'put your dealbreakers on your *card.*' }]
const BOXES = [[BOX_A, 0.3, 11.5], [BOX_B, 12.3, 22.35], [BOX_C, 22.95, 31.1], [BOX_D, 31.25, 33.38], [BOX_E, 37.45, 40.55]]
export const ALL_BOXES = BOXES
const ALL_LINES = BOXES.flatMap(b => b[0])
const CPS = 28
const LT = new Map(BOXES.map(([L]) => [L, lineTimes(L, { cps: CPS })]))
const doneOf = (L, i) => LT.get(L)[i].done
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Growing pains | mean you’re | *growing.*', chip: '+1 BACKBONE' }
const CUTS = [{ t: T.cut1, kind: 'flip', keep: true }, { t: T.cut2, kind: 'deal', keep: true }, { t: T.cut3, kind: 'shuffle', keep: true }]

const ITEMS = [
  { label: 'NEW JOB?', stamp: '✓ CHECKED', col: STAMP.MINT },
  { label: 'MOVING OUT?', stamp: '✓ CHECKED', col: STAMP.MINT },
  { label: 'TEXTING THE EX?', stamp: '✕ LET IT GO', col: STAMP.RED },
  { label: 'COMMITMENT?', stamp: '✓ READY', col: STAMP.MINT },
]

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── geometry
const ORB = { cx: 540, cy: 830, R: 300, rSat: 50, rSun: 62, rEarth: 20, Re: 132 }
const DIAL = { cx: 540, cy: 700, s: 0.62 }
const TL = { x0: 140, x1: 940, y: 1085 }
const ax = age => TL.x0 + (TL.x1 - TL.x0) * age / 60
const satAng = yrs => -Math.PI / 2 - 2 * Math.PI * yrs / P
const yearsAt = t => P * ease.inOutCubic(prog(t, ...T.lap))
const ageAt = t => P * ease.inOutQuad(prog(t, ...T.march))
const earthAng = t => -Math.PI / 2 - 2 * Math.PI * yearsAt(t)
const GUIDE = { x: 200, y: 1268, s: 200 }, YS = { x: 880, y: 1268, s: 200 }

// a cracked pixel heart (the ex)
const HEART = BM(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
const CRACK = BM(`...X... ...X... ..X.... ...X... ..X.... .......`)

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "100px 'DejaVu Sans'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H = (text, o) => popText(root, text, { size: 104, accentSize: 140, wobble: true, late: 1, ...o })
  const HEADS = [
    [H("What's a | *Saturn return?*", { top: 150, at: T.h0, late: 2, lateAt: T.h0Land, accentSize: 136 }), T.h0Out],
    [H('Saturn takes about | *29½ years* | to lap the Sun.', { top: 140, size: 86, accentSize: 112, at: T.h1, late: 0, gap: 0.06 }), T.h1Out],
    [H('When it gets back to | where it was when | you were born…', { top: 140, size: 80, at: T.h2, late: 0, gap: 0.06 }), T.h2Out],
    [H("…that's your | *Saturn return.*", { top: 150, size: 104, accentSize: 140, at: T.h3, late: 2, lateAt: T.h3Land }), T.out2],
    [H('Big decisions.', { top: 135, size: 92, at: T.items[0] - 0.1, late: 0, gap: 0.08 }), T.out3],
    [H('Growing up.', { top: 238, size: 92, at: T.items[1] - 0.1, late: 0, gap: 0.08 }), T.out3],
    [H('*Glow up.*', { top: 330, size: 92, accentSize: 132, at: T.glowUp, late: 2, lateAt: T.glowUp, accentColor: PINK }), T.out3],
    [H('Round two: | *around 58.*', { top: 150, at: T.h5, late: 2, lateAt: T.h5Land }), T.out4],
    [H("Saturn's not mean. | It's *thorough.*", { top: 140, size: 92, accentSize: 138, at: T.h7, gap: 0.08, lateAt: T.h7Land, accentColor: GOLD }), T.out],
  ]
  const eyebrow = el('div', { position: 'absolute', left: 0, width: '1080px', top: '102px', textAlign: 'center', font: `700 30px ${MONO}`, letterSpacing: '0.22em', color: GOLD, textShadow: '0 3px 12px rgba(6,4,18,0.9)', display: 'none' }, root, 'AROUND AGES 27–30')
  const BOX = { y: 1432, width: 960, height: 256, cps: CPS }
  const boxes2 = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── hops
  const G_HOPS = [...talkHops(ALL_LINES, SKY_TAG, { cps: CPS }), T.ding + 0.05, T.lesson + 0.1]
  const Y_HOPS = [...talkHops(ALL_LINES, YS_TAG, { cps: CPS }), T.ding, T.eyes + 0.05, T.lesson + 0.2, T.check + 0.05]
  const P_HOPS = [T.ding + 0.6, T.items[3] + T.stampD, T.check + 0.1]

  function guideState(t) {
    const st = { mood: 'happy', look: [1, -1], squash: 0 }
    if (t < 3.35) st.look = [0, 0]
    else if (t < T.shrink[0]) st.look = [1, 0]
    else if (t < T.cut1) { st.mood = 'neutral'; st.look = [1, -1] }
    else if (t < T.ding) { st.look = [1, -1]; st.mood = t > doneOf(BOX_B, 1) ? 'squint' : 'happy' }
    else if (t < T.eyes) { st.mood = inR(t, BOX_B[2].t, T.eyes) ? 'wink' : 'sparkle'; st.look = [1, 0] }
    else if (t < T.cut2) { st.mood = 'wide'; st.look = [1, -1]; st.squash = 0.12 * bump(t, T.eyes, 0.3) }
    else if (t < T.cut3) { st.mood = inR(t, T.items[2], T.items[3]) ? 'squint' : 'neutral'; st.look = [1, -1]; if (t > BOX_C[2].t) st.mood = 'happy' }
    else if (t < T.lesson) { st.mood = t > T.faint ? 'wide' : 'happy'; st.look = [1, 0] }
    else st.mood = t > T.check ? 'sparkle' : 'happy'
    return st
  }
  function ysState(t) {
    const st = { mood: 'neutral', look: [-1, -1], squash: 0, sweat: 0, flat: 0 }
    if (t < BOX_A[1].t) { st.mood = t > 1.8 ? 'wide' : 'neutral'; st.look = t > 1.8 ? [-1, 0] : [0, 0]; st.squash = 0.14 * bump(t, 1.85, 0.3) }
    else if (t < T.shrink[0]) { st.mood = 'wide'; st.look = [0, 0]; st.sweat = 1 }
    else if (t < T.cut1) {
      const a = earthAng(t); st.look = [Math.cos(a), Math.sin(a)]; st.mood = t > BOX_A[3].t ? 'eyeroll' : 'neutral'
      if (t > BOX_A[3].t) st.look = undefined
    }
    else if (t < T.ding) { st.mood = inR(t, BOX_B[1].t, doneOf(BOX_B, 1) + 0.6) ? 'squint' : 'neutral'; st.look = [-1, -1] }
    else if (t < T.eyes) { st.mood = 'neutral'; st.look = [-1, -1] }
    else if (t < T.cut2) { st.mood = 'wide'; st.look = [-1, -1]; st.sweat = 1; st.squash = 0.16 * bump(t, T.eyes, 0.3) }
    else if (t < T.cut3) {
      st.look = [-1, -1]; st.sweat = 1
      st.mood = t < T.items[2] ? 'squint' : t < T.items[2] + T.stampD ? 'wide' : t < T.items[3] + T.stampD ? 'neutral' : 'sparkle'
      st.squash = 0.14 * bump(t, T.items[2] + T.stampD, 0.3)
    }
    else if (t < T.lesson) {
      st.mood = 'wide'; st.look = [-1, -1]
      if (t > T.faint) { st.flat = ease.outCubic(prog(t, T.faint, T.faint + 0.25)); st.mood = 'sleepy' }
    }
    else { st.mood = t > T.rows[1] ? 'happy' : 'sparkle'; st.look = [-1, -1] }
    return st
  }

  function drawGuide(t) {
    const st = guideState(t)
    drawStarChar(x, GUIDE.x, GUIDE.y, GUIDE.s, t, { color: STAR.sky, mood: st.mood, look: st.look, squash: st.squash, hops: G_HOPS, seed: 3, bob: 6, pop: pop01(t, 0.2, 0.4, 2.4) })
  }
  function drawYS(t) {
    const st = ysState(t)
    const k = pop01(t, 0.35, 0.4, 2.4)
    const opts = { color: LEO.color, glyph: LEO.glyph, mood: st.mood, look: st.look, squash: st.squash + 0.45 * st.flat, hops: st.flat ? null : Y_HOPS, seed: 8, bob: st.flat ? 0 : 6, pop: k, zzz: false }
    drawStarChar(x, YS.x, YS.y + 40 * st.flat, YS.s, t, opts)
    const F = starFrame(YS.x, YS.y + 40 * st.flat, YS.s, t, opts)
    if (st.sweat) { const [sx, sy] = cellToWorld(F, 29, 7); sweatDrop(x, t, sx, sy, 5) }
    if (st.flat > 0.5 && t < T.out4[1]) drawChip(x, YS.x - 30, YS.y - 120, '*faints*', { k: pop01(t, T.faint + 0.15, 0.3, 2.4), size: 26, bar: LEO.color })
  }
  function drawPisces(t) {
    if (!inR(t, T.ding + 0.4, T.out3[1]) && !inR(t, T.card, T.out[1])) return
    const t0 = t < T.cut3 ? T.ding + 0.4 : T.card + 0.2
    const k = pop01(t, t0, 0.35, 2.4) * (t < T.cut3 ? outK(t, T.out3) : outK(t, T.out))
    const px = t < T.cut3 ? 955 : 545, py = t < T.cut2 ? 470 : t < T.cut3 ? 600 : 1300, s = 104
    const opts = { color: PIS.color, mood: 'sparkle', look: [-1, 1], pop: k, seed: 19, bob: 3, glow: 0.8, hops: P_HOPS }
    drawStarChar(x, px, py, s, t, opts)
    const F = starFrame(px, py, s, t, opts)
    if (k > 0.5) inSprite(x, F, () => tearsCells(x, t, inR(t, T.items[3] + T.stampD, T.cut3) ? 3 : 2))
  }
  function eyes(t, cx, cy, r, { open, look, glasses = 0, mood = 'neutral' }) {
    planetEyes(x, cx, cy, r, { open, look, glasses, mood })
  }

  // the big Saturn (hook, the inspector) — sizes/positions per beat
  function bigSaturn(t) {
    // hook
    if (t < T.shrink[1]) {
      const k = pop01(t, T.satIn, 0.5, 2.2)
      const sh = ease.inOutCubic(prog(t, ...T.shrink))
      const bounce = Math.abs(Math.sin((t - 0.6) * Math.PI / 1.111)) * 40 * (1 - sh)
      const cx = lerp(540, ORB.cx + Math.cos(satAng(0)) * ORB.R, sh), cy = lerp(800, ORB.cy + Math.sin(satAng(0)) * ORB.R, sh) - bounce
      const r = lerp(150, ORB.rSat, sh) * k
      saturn(x, cx, cy, r, { t, tilt: -0.36 + 0.08 * Math.sin(t * 2) })
      qmarks(x, t, [[260, 560, 0], [830, 600, 1.5], [870, 990, 3]], 9, clamp(k) * (1 - prog(t, 3.9, 4.3)))
      return
    }
  }
  // the orbit diagram (beat 1 + dial in beat 2)
  function orbit(t) {
    if (t < T.shrink[0] + 0.3 || t > T.zoom[1]) return
    const d = ease.inOutCubic(prog(t, ...T.dial))
    const cx = lerp(ORB.cx, DIAL.cx, d), cy = lerp(ORB.cy, DIAL.cy, d), s = lerp(1, DIAL.s, d)
    const fade = 1 - prog(t, T.zoom[0], T.zoom[0] + 0.3)
    const k = clamp(prog(t, T.shrink[0] + 0.3, T.shrink[1] + 0.2)) * fade
    // orbit ring (dashed)
    x.save(); x.globalAlpha = k * 0.5; x.setLineDash([10, 14]); glowStroke(x, BONE, 3, 6); x.beginPath(); x.arc(cx, cy, ORB.R * s, 0, Math.PI * 2); x.stroke(); x.setLineDash([]); x.restore()
    sun(x, cx, cy, ORB.rSun * s * pop01(t, T.drop - 0.2, 0.4), t, k)
    // earth (only in beat 1)
    if (t < T.cut1) {
      const ek = pop01(t, B(9), 0.35) * k
      const a = earthAng(t)
      x.save(); x.globalAlpha = 0.35 * ek; glowStroke(x, '#4f9cf0', 2, 4); x.beginPath(); x.arc(cx, cy, ORB.Re, 0, Math.PI * 2); x.stroke(); x.restore()
      earth(x, cx + Math.cos(a) * ORB.Re, cy + Math.sin(a) * ORB.Re, ORB.rEarth * ek, ek, t * 4)
      if (ek > 0.5) drawChip(x, cx + Math.cos(a) * ORB.Re, cy + Math.sin(a) * ORB.Re - 44, 'YOU', { k: ek * 0.8, size: 20, bar: '#4f9cf0' })
    }
    // the birth star at the top (beat 2)
    if (t > T.dial[0]) {
      const sk = pop01(t, T.dial[1] - 0.1, 0.4) * fade
      const dk = t > T.ding ? Math.exp(-(t - T.ding) * 2) : 0
      star(x, cx, cy - ORB.R * s, 26 * (1 + 0.5 * dk) * sk, GOLD, sk, 0.2 * Math.sin(t * 1.3), 0.35 + 0.5 * dk)
      if (sk > 0.3) drawChip(x, cx + 150, cy - ORB.R * s, 'YOU WERE BORN', { k: sk * 0.9, size: 24, bar: GOLD })
    }
    // saturn on its orbit
    const yrs = t < T.cut1 ? yearsAt(t) : ageAt(t)
    const a = satAng(yrs)
    saturn(x, cx + Math.cos(a) * ORB.R * s, cy + Math.sin(a) * ORB.R * s, ORB.rSat * s * (1 + 0.25 * bump(t, T.ding, 0.4)), { t, a: k, tilt: -0.36 + 0.07 * Math.sin(t * 1.9), glow: t > T.ding ? Math.exp(-(t - T.ding) * 2) : 0 })
    // earth laps counter (beat 1)
    if (t < T.cut1 && t > T.lap[0] - 0.2) {
      const laps = Math.floor(yearsAt(t))
      drawChip(x, 540, 1188, `EARTH LAPS: ${laps}`, { k: pop01(t, T.lap[0] - 0.2, 0.3) * outK(t, [11.3, 11.5]), size: 30, bar: '#4f9cf0' })
    }
  }
  // the life timeline (beat 2)
  function timeline(t) {
    if (t < T.line[0] || t > T.zoom[1]) return
    const k = clamp(prog(t, ...T.line)) * (1 - prog(t, T.zoom[0], T.zoom[0] + 0.3))
    x.save(); x.globalAlpha = k
    glowStroke(x, BONE, 5, 8); x.beginPath(); x.moveTo(TL.x0, TL.y); x.lineTo(lerp(TL.x0, TL.x1, ease.outCubic(k)), TL.y); x.stroke()
    x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillStyle = BONE; x.shadowBlur = 0
    for (let a = 0; a <= 60; a += 10) { x.fillRect(ax(a) - 2, TL.y - 12, 4, 24); x.fillText(String(a), ax(a), TL.y + 44) }
    x.restore()
    const age = ageAt(t)
    const hop = Math.abs(Math.sin(age * 1.2)) * 22 * (inR(t, ...T.march) ? 1 : 0)
    saturn(x, ax(age), TL.y - 46 - hop, 28, { t, a: k, glow: t > T.ding ? Math.exp(-(t - T.ding) * 2) : 0 })
    flag(x, ax(P), TL.y - 2, pop01(t, T.ding, 0.4) * 1.1 * k, GOLD, '~29')
    if (t > T.march[0] - 0.3) drawChip(x, 540, 1188, `YOUR AGE: ${Math.floor(age)}`, { k: pop01(t, T.march[0] - 0.3, 0.3) * k, size: 30, bar: GOLD })
    if (t >= T.ding && t < T.ding + 0.8) wave(x, ax(P), TL.y - 46, t, T.ding, GOLD, 160, 0.7, 6)
  }
  // the inspector (zoom → beats 2 end, 3, 4, tie-in)
  function inspector(t) {
    if (t < T.zoom[0]) return
    let cx, cy, r, open = 1, glasses = 1, look = [0, 0], mood = 'neutral', a = 1
    if (t < T.cut2) {
      const z = ease.outCubic(prog(t, ...T.zoom))
      const a0 = satAng(P)
      cx = lerp(DIAL.cx + Math.cos(a0) * ORB.R * DIAL.s, 540, z); cy = lerp(DIAL.cy + Math.sin(a0) * ORB.R * DIAL.s, 800, z); r = lerp(ORB.rSat * DIAL.s, 150, z)
      open = t < T.eyes ? 0 : t < T.eyes + 0.12 ? 0.3 : 1
      glasses = pop01(t, T.glasses, 0.3, 2.6)
      look = t < T.insp ? [0, 0] : [1, 1]
      a = outK(t, T.out2)
    } else if (t < T.cut3) {
      cx = 250; cy = 700; r = 104; look = [1, 0.3]
      const it = T.items.findIndex((s, i) => t >= s + T.stampD && (i === 3 || t < T.items[i + 1]))
      if (it === 2 && t < T.items[2] + T.stampD + 0.8) mood = 'squint'
      a = outK(t, T.out3)
    } else if (t < T.lesson) {
      cx = 540; cy = 820; r = 130; look = [1, 1]; mood = t > T.h5Land ? 'happy' : 'neutral'
      a = pop01(t, T.cut3 - 0.05, 0.3) * outK(t, T.out4)
    } else if (t >= T.card) {
      cx = 880; cy = 600; r = 74; look = [-1, 1]; mood = t > T.check ? 'happy' : 'neutral'
      a = pop01(t, T.card + 0.1, 0.35) * outK(t, T.out)
    } else return
    if (a <= 0.01) return
    const wave2 = t >= T.cut3 && t < T.lesson ? 0.12 * Math.sin(t * 9) : 0
    saturn(x, cx, cy, r * a, { t, tilt: -0.36 + 0.06 * Math.sin(t * 1.9) + wave2, glow: t >= T.eyes && t < T.eyes + 1 ? Math.exp(-(t - T.eyes) * 3) : 0 })
    eyes(t, cx, cy, r * a, { open, look, glasses, mood })
    // the clipboard
    let ck = 0, cxp = 0, cyp = 0, checks = [0, 0, 0], sc = 1
    if (t < T.cut2) { ck = pop01(t, T.clip, 0.35, 2.2) * outK(t, T.out2); cxp = 800; cyp = 830; sc = 0.85 }
    else if (t < T.cut3) {
      ck = outK(t, T.out3); cxp = 360; cyp = 905; sc = 0.6
      checks = [0, 1, 3].map(i => clamp(prog(t, T.items[i] + T.stampD, T.items[i] + T.stampD + 0.3)))
    } else if (t >= T.card) { ck = pop01(t, T.check - 0.4, 0.3) * outK(t, T.out); cxp = 880; cyp = 800; sc = 0.6; checks = [clamp(prog(t, T.check, T.check + 0.3)), 0, 0] }
    if (ck > 0.01) clipboard(x, cxp, cyp + 5 * Math.sin(t * 2), sc * ck, checks, { a: clamp(ck * 2), rot: 0.08 })
    if (t < T.cut2 && t > T.insp) drawChip(x, 540, 1040, 'INSPECTION · AGE ~29', { k: pop01(t, T.insp, 0.3, 2.6) * outK(t, T.out2), size: 32, col: GOLD, bar: SAT })
    if (inR(t, T.cut3, T.lesson)) drawChip(x, 540, 1050, 'NEXT VISIT: AGE ~58', { k: pop01(t, T.h5Land + 0.2, 0.3, 2.6) * outK(t, T.out4), size: 30, col: GOLD, bar: SAT })
  }
  // the inspection items (beat 3)
  function items(t) {
    if (t < T.cut2 || t > T.out3[1]) return
    const o = outK(t, T.out3)
    T.items.forEach((t0, i) => {
      const t1 = i < 3 ? T.items[i + 1] : T.out3[1]
      if (t < t0 || t > t1) return
      const k = pop01(t, t0, 0.35, 2.2) * (i < 3 ? 1 - ease.inCubic(prog(t, t1 - 0.25, t1)) : o)
      const cx = 720, cy = 760, s = 1.15 * k
      const rot = 0.05 * Math.sin(t * 2 + i)
      if (i === 0) briefcase(x, cx, cy, s, { rot })
      if (i === 1) boxes(x, cx, cy, s, { rot })
      if (i === 2) { bmp(x, HEART, cx, cy, 26 * k, { X: '#ff5c8a' }, { outline: INK, rot }); if (t > t0 + T.stampD) bmp(x, CRACK, cx, cy, 26 * k, { X: INK }, { rot }) }
      if (i === 3) weddingRing(x, cx, cy - 10, s, t, { rot })
      drawChip(x, cx, cy - 175, ITEMS[i].label, { k, size: 34, bar: SAT })
      drawStamp(x, cx, cy + 170, ITEMS[i].stamp, { k: prog(t, t0 + T.stampD, t0 + T.stampD + 1), col: ITEMS[i].col, alpha: k, rot: i % 2 ? 0.1 : -0.1 })
    })
  }
  // the tie-in card
  function card(t) {
    if (t < T.card || t > T.out[1]) return
    const k = pop01(t, T.card, 0.45, 1.8) * outK(t, T.out)
    const rows = ['DEALBREAKERS', '✕ NOT READY TO GROW UP', '✕ NO PLANS. EVER.']
    const shown = rows.filter((_, i) => i === 0 || t >= T.rows[i - 1])
    drawMysteryCard(x, 455, 830, 620, 660, t, { k, rot: -0.03 + 0.01 * Math.sin(t * 2), glyph: LEO.glyph, badge: LEO.color, lines: shown, lineCols: [GOLD, '#ff8f8f', '#ff8f8f'] })
    T.rows.forEach((r, i) => { if (t >= r && t < r + 0.5) { const p = prog(t, r, r + 0.5); x.save(); x.globalAlpha = (1 - p) * k; x.strokeStyle = '#ff5c5c'; x.lineWidth = 6; x.strokeRect(455 - 290 - p * 30, 830 - 330 + 660 * 0.58 + (i + 1) * 60 - 32 - p * 10, 580 + p * 60, 56 + p * 20); x.restore() } })
    if (t > T.check) bigCheck(x, 880, 1010, 0.8, prog(t, T.check, T.check + 0.35), k)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      bigSaturn(t)
      orbit(t)
      timeline(t)
      items(t)
      inspector(t)
      card(t)
      drawPisces(t)
      drawGuide(t)
      drawYS(t)
      for (const b of boxes2) b.update(t)
      lesson.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      const eb = inR(t, T.items[0] - 0.2, T.out3[1])
      eyebrow.style.display = eb ? 'block' : 'none'
      if (eb) eyebrow.style.opacity = String(clamp(prog(t, T.items[0] - 0.2, T.items[0] + 0.1)) * outK(t, T.out3))
      drawGrain(gx, t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
    },
  }
}

// ── sound (pop / pluck / bell are written in D major; the engine moves them into the score's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ...(land != null ? [['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]] : [])]
const chip = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.035, duty: 0.25, decay: 0.08, sustain: 0.6, rev: 0.06, dly: 0, bus: 'fx', ...o }]
const ding = (t, g = 1) => [['bell', +t.toFixed(3), 1479.98, 0.045 * g, 1.6, 0], ['bell', +(t + 0.22).toFixed(3), 1174.66, 0.045 * g, 2.0, 0]]
const stampHit = t => [['boom', +t.toFixed(3), 0.1], ['tick', +t.toFixed(3), 0.12], chip(t, 220, 0.12, { wave: 'noise', gain: 0.04, decay: 0.1, sustain: 0 })]

export const CUES = [
  // hook
  ...head(T.h0, 2, T.h0Land, 0), ['whoosh', T.satIn, 0.5, 0.04], ['pop', T.satIn + 0.2, 392, 0.05, 0],
  ...[0, 1, 2].map(i => ['tick', B(1 + 2 * i), 0.05]),
  ['pop', 1.85, 1318, 0.04, 0.5],
  // orbit
  ['whoosh', T.shrink[0], 0.6, 0.05], ...head(T.h1, 5, null, 1), ['pop', B(7), 587.33, 0.05, 0], ['pop', B(9), 880, 0.04, 0.2],
  ...Array.from({ length: 24 }, (_, i) => ['tick', +(T.lap[0] + 0.15 + i * 0.25).toFixed(3), 0.02]),
  // timeline + ding
  ['whoosh', T.dial[0], 0.5, 0.04], ...head(T.h2, 6, null, 2),
  ...Array.from({ length: 9 }, (_, i) => ['tick', +(T.march[0] + 0.3 + i * 0.556).toFixed(3), 0.035]),
  ...head(T.h3, 2, T.h3Land, 3), ...ding(T.ding, 1.2), ['glitter', T.ding, T.ding + 0.9],
  // the eyes
  ['whoosh', T.zoom[0], 0.5, 0.05], ['tapeStop', T.eyes - 0.35, 0.3], ['boom', T.eyes, 0.14], chip(T.eyes, 880, 0.2, { slide: 12, gain: 0.04 }),
  ['pop', T.glasses, 1568, 0.04, 0], ['tick', T.glasses + 0.05, 0.06], ['pop', T.clip, 784, 0.045, 0.4], ['tick', T.insp, 0.08], ['pop', T.insp, 1174.66, 0.04, 0],
  // inspection
  ...head(T.items[0] - 0.1, 2, null, 0), ...head(T.items[1] - 0.1, 2, null, 2), ...head(T.glowUp, 0, T.glowUp, 0), ['glitter', T.glowUp, T.glowUp + 0.8],
  ...T.items.flatMap((t0, i) => [['whoosh', t0 - 0.1, 0.3, 0.03], ['pop', t0, [784, 880, 659.25, 988][i], 0.045, 0.3], ...stampHit(t0 + T.stampD),
    ...(i === 2 ? [chip(t0 + T.stampD, 330, 0.35, { slide: -10, wave: 'tri', gain: 0.05 })] : [['bell', +(t0 + T.stampD + 0.05).toFixed(3), 1760, 0.02, 0.8, 0.3]])]),
  // round two
  ...head(T.h5, 2, T.h5Land, 1), ['whoosh', T.faint, 0.4, 0.04], chip(T.faint, 660, 0.5, { wave: 'tri', slide: -14, gain: 0.045, decay: 0.45 }), ['boom', T.faint + 0.25, 0.08],
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Fm' }),
  // tie-in + last line
  ['whoosh', T.card, 0.5, 0.04], ['bell', T.card + 0.45, 1760, 0.03, 1.2, 0], ...T.rows.flatMap(r => stampHit(r)),
  ['pop', T.check, 1318, 0.05, 0.4], ['bell', T.check + 0.1, 1760, 0.03, 1.2, 0.4],
  ...head(T.h7, 3, null, 0), ['pop', T.h7Land, 1174.66, 0.05, 0], ['pluck', T.h7Land, 1174.66, 0.04, 0.6, 0],
  // dialogue + cuts + end card
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [SKY_TAG]: 880, [YS_TAG]: 659.25, [SAT_TAG]: 440 } })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
