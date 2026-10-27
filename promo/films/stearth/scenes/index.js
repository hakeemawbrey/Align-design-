// stearth (25 s vertical Align ad, Star Talk batch 3) · story 0–20.6, then the shared end card ("come" + the Align logo).
//   0.00–2.8   "The *earth signs* | plan a date."  The ♉ Taurus (Venus), ♍ Virgo (Mercury) and ♑ Capricorn (Saturn) stars
//              gather under a floating pixel spreadsheet: FIRST_DATE.xls.
//   2.82       the drop: the box opens. Every line adds a row (and a check):
//              TAURUS: "dinner. *the good place.*"      → DINNER · the good place ✓
//              VIRGO: "i made a *backup* reservation."  → BACKUP · 8:15, plan B ✓
//              CAPRICORN: "and a *5-year plan.*"         → 5-YR PLAN · see tab 2 ✓ (+ a tiny growth chart)
//   8.3        "Grounded. | *Very* grounded."
//   11.0       THE STARS: "it's a first date. maybe just… *have fun?*"  → wide eyes; the spreadsheet folds into a paper
//              plane and zips off.
//   14.75      card cut (flip) · "Plan less. | *Feel* more."  The plane loops back and draws a big heart in the sky with its
//              trail; the three stars follow it with their eyes and go heart-eyed. Everything pops out by 20.45.
//   20.45→     plain sky; the end card takes over at 20.6.
// One canvas (sky + sheet + cast), DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, ELEMENT_COLOR, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { GOLD, BONE, PINK, INK, MONO, BEAT, pop01, outK, popOut, popText, drawBits, sparkles, at, wordT, checkLines, NOTE, wordPops } from './kit.js'

export const DURATION = 25
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const TAU_ = signStar('taurus'), VIR = signStar('virgo'), CAP = signStar('capricorn')
const TAU_TAG = `${TAU_.glyph} TAURUS STAR`, VIR_TAG = `${VIR.glyph} VIRGO STAR`, CAP_TAG = `${CAP.glyph} CAPRICORN STAR`, SKY_TAG = 'THE STARS'
const EARTH = ELEMENT_COLOR.earth, SHEET_G = '#2fa36b'

const T = {
  h0: 0.12, h0Land: 0.62, h0Out: [8.1, 8.3],
  sheetIn: 0.3, tauIn: 0.5, virIn: 0.75, capIn: 1.0,
  open: 2.6, l1: BEAT(4) + 0.02, l2: 5.45, l3: 8.35,
  h1: 8.4, h1Land: 8.8, h1Out: [14.3, 14.5],
  l4: 10.95, fold: [13.15, 13.6], fly: [13.6, 14.35], close: 14.5,
  cut: 14.75,
  h2: 14.85, h2Land: 15.3, loop: [15.45, 17.75], hearts: 17.75,
  out: [20.05, 20.42], h2Out: [20.1, 20.36],
}
const CPS = 30
const LINES = [
  { t: T.l1, speaker: TAU_TAG, color: TAU_.color, text: 'dinner. *the good place.*' },
  { t: T.l2, speaker: VIR_TAG, color: VIR.color, text: 'i made a *backup* reservation.' },
  { t: T.l3, speaker: CAP_TAG, color: CAP.color, text: 'and a *5-year plan.*' },
  { t: T.l4, speaker: SKY_TAG, text: "it's a first date. maybe just… *have fun?*" },
]
const LT = lineTimes(LINES, { cps: CPS })
checkLines(LT, LINES, T.close)
const T_GOOD = wordT(LT, LINES, 0, 'the good'), T_BACKUP = wordT(LT, LINES, 1, 'backup'), T_PLAN = wordT(LT, LINES, 2, '5-year'), T_FUN = wordT(LT, LINES, 3, 'have fun')
const ROWS = [
  { t: T_GOOD + 0.15, a: 'DINNER', b: 'the good place' },
  { t: T_BACKUP + 0.15, a: 'BACKUP', b: '8:15, plan B' },
  { t: T_PLAN + 0.15, a: '5-YR PLAN', b: 'see tab 2' },
]

// layout
const SHEET = { x: 540, y: 560, w: 740 }          // top-centre of the sheet
const TAU1 = { x: 195, y: 1090, s: 235 }, VIR1 = { x: 540, y: 1150, s: 240 }, CAP1 = { x: 885, y: 1090, s: 235 }
const TAU2 = { x: 205, y: 1400, s: 240 }, VIR2 = { x: 540, y: 1450, s: 245 }, CAP2 = { x: 875, y: 1400, s: 240 }
const HEART_C = { x: 540, y: 860, s: 15 }
const after = t => t >= T.cut

const TAU_HOPS = [T.tauIn + 0.3, ...talkHops(LINES, TAU_TAG, { cps: CPS }), T_FUN + 0.4, T.hearts]
const VIR_HOPS = [T.virIn + 0.3, ...talkHops(LINES, VIR_TAG, { cps: CPS }), T_FUN + 0.45, T.hearts + 0.08]
const CAP_HOPS = [T.capIn + 0.3, ...talkHops(LINES, CAP_TAG, { cps: CPS }), T_FUN + 0.5, T.hearts + 0.16]

// the plane's heart path (after the cut): enters from the left, traces a heart, exits upward-right
function heartPt(s) {          // s 0…1 around the heart, starting at the bottom tip
  const a = Math.PI + s * Math.PI * 2
  const hx = 16 * Math.sin(a) ** 3, hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))
  return { x: HEART_C.x + hx * HEART_C.s, y: HEART_C.y + hy * HEART_C.s }
}
function planePos(t) {
  if (!after(t)) {
    const f = prog(t, ...T.fly)
    if (f <= 0) return null
    const e = ease.inQuad(f)
    return { x: lerp(SHEET.x, 1250, e), y: lerp(SHEET.y + 140, 640, e) - Math.sin(Math.PI * f) * 60, a: -0.5, k: 1 }
  }
  const p = prog(t, ...T.loop)
  if (p <= 0) return null
  if (p >= 1) { const q = prog(t, T.loop[1], T.loop[1] + 0.6); const h = heartPt(0); return q >= 1 ? null : { x: lerp(h.x, h.x + 700, ease.inQuad(q)), y: lerp(h.y, h.y - 500, ease.inQuad(q)), a: -0.6, k: 1 } }
  const e = ease.inOutQuad(p)
  const P = heartPt(e), Q = heartPt(Math.min(1, e + 0.01))
  return { ...P, a: Math.atan2(Q.y - P.y, Q.x - P.x), k: 1, s: e }
}

const LOOK_PLANE = (t, from) => { const p = planePos(t); if (!p) return [0, -1]; return [clamp((p.x - from.x) / 300, -1, 1), clamp((p.y - from.y) / 300, -1, 1)] }

const TAU_ST = [
  [0, { mood: 'happy' }], [T.l1, { mood: 'sparkle', look: [0, 0] }], [T.l1 + 1.6, { mood: 'happy' }],
  [T.l2, { mood: 'neutral', look: [1, 0] }], [T_BACKUP + 0.2, { mood: 'wide', look: [1, 0], blink: false }], [T.l2 + 1.8, { mood: 'neutral', look: [1, -1] }],
  [T.l3, { mood: 'neutral', look: [1, 0] }], [T_PLAN + 0.2, { mood: 'eyeroll' }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_FUN, { mood: 'wide', look: [0, 0], blink: false }], [T.fold[0], { mood: 'wide', look: [0, -1], blink: false }], [T.fly[1], { mood: 'happy' }],
  [T.cut, 'plane'], [T.hearts, { mood: 'heart' }],
]
const VIR_ST = [
  [0, { mood: 'squint', look: [0, -1] }], [T.l1, { mood: 'squint', look: [-1, 0] }],
  [T.l2, { mood: 'sparkle', look: [0, 0] }], [T.l2 + 1.6, { mood: 'happy' }],
  [T.l3, { mood: 'wide', look: [1, 0], blink: false }], [T_PLAN + 0.4, { mood: 'heart' }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_FUN, { mood: 'wide', look: [0, 0], blink: false }], [T.fold[0], { mood: 'wide', look: [0, -1], blink: false }], [T.fly[1], { mood: 'happy' }],
  [T.cut, 'plane'], [T.hearts + 0.08, { mood: 'heart' }],
]
const CAP_ST = [
  [0, { mood: 'neutral', look: [0, -1] }], [T.l1, { mood: 'neutral', look: [-1, 0] }],
  [T.l2, { mood: 'squint', look: [-1, 0] }],
  [T.l3, { mood: 'squint', look: [0, 0] }], [T_PLAN + 0.3, { mood: 'sparkle', look: [0, -1] }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_FUN, { mood: 'wide', look: [0, 0], blink: false }], [T.fold[0], { mood: 'wide', look: [-1, -1], blink: false }], [T.fly[1], { mood: 'happy' }],
  [T.cut, 'plane'], [T.hearts + 0.16, { mood: 'heart' }],
]

const PLANE_BM = [
  'WW..........',
  'WwWW........',
  '.WwwWWW.....',
  '.WwwwwwWWW..',
  '..WwwwwwwwWW',
  '..WggggggWW.',
  '...WgggWW...',
  '...WgWW.....',
  '....W.......',
]
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The *earth signs* | plan a date.', { top: 190, size: 104, accentSize: 140, at: T.h0, times: [T.h0, T.h0Land, T.h0Land + 0.12, T.h0Land + 0.4, T.h0Land + 0.48, T.h0Land + 0.56], wobble: true, accentColor: EARTH })
  const H1 = popText(root, 'Grounded. | *Very* grounded.', { top: 196, size: 112, accentSize: 150, at: T.h1, times: [T.h1, T.h1Land, T.h1Land + 0.14], wobble: true, accentColor: CAP.color })
  const H2 = popText(root, 'Plan less. | *Feel* more.', { top: 200, size: 124, accentSize: 176, at: T.h2, times: [T.h2, T.h2 + 0.1, T.h2Land, T.h2Land + 0.18], wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the spreadsheet (pixel panel, grid, rows typed in with a check)
  function drawSheet(t, o) {
    const pk = pop01(t, T.sheetIn, 0.4, 2) * o
    const f = prog(t, ...T.fold)
    if (pk <= 0.01 || t >= T.fold[1]) return
    const rowsOn = ROWS.filter(r => t >= r.t).length
    const grow = ROWS.reduce((s, r) => s + ease.outCubic(prog(t, r.t, r.t + 0.3)), 0)
    const P = 6, W_ = SHEET.w, head = 60, colH = 46, rowH = 70
    const H_ = head + colH + rowH * (1 + grow)
    // fold: squash into a triangle-ish sliver toward the centre
    const sx = lerp(1, 0.12, ease.inCubic(f)), sy = lerp(1, 0.35, ease.inCubic(f))
    x.save(); x.translate(SHEET.x, SHEET.y + H_ / 2 + Math.sin(t * 1.6) * 6); x.rotate(-0.025 + f * 0.6); x.scale(pk * sx, pk * sy); x.translate(-W_ / 2, -H_ / 2)
    x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-P, -P, W_ + 2 * P, H_ + 2 * P)
    x.fillStyle = '#fbf6ea'; x.fillRect(0, 0, W_, H_)
    x.fillStyle = SHEET_G; x.fillRect(0, 0, W_, head)
    x.font = `700 30px ${MONO}`; x.textBaseline = 'middle'; x.fillStyle = '#fbf6ea'; x.fillText('FIRST_DATE.xls', 22, head / 2 + 2)
    // window dots
    for (let i = 0; i < 3; i++) { x.fillStyle = ['#ff8fb1', '#ffd98a', '#9ff0c6'][i]; x.fillRect(W_ - 34 - i * 30, head / 2 - 8, 16, 16) }
    // column headers
    const C1 = 232, C2 = W_ - 84
    x.fillStyle = '#e4ddc9'; x.fillRect(0, head, W_, colH)
    x.fillStyle = '#5a5070'; x.font = `700 24px ${MONO}`
    x.fillText('WHAT', 18, head + colH / 2 + 2); x.fillText('DETAILS', C1 + 18, head + colH / 2 + 2); x.fillText('OK', C2 + 18, head + colH / 2 + 2)
    // grid
    x.fillStyle = '#cfc6b0'
    x.fillRect(C1, head, 3, H_ - head); x.fillRect(C2, head, 3, H_ - head)
    for (let r = 0; r <= 3; r++) { const yy = head + colH + r * rowH; if (yy < H_) x.fillRect(0, yy, W_, 3) }
    // rows
    x.font = `700 33px ${MONO}`
    ROWS.forEach((R, i) => {
      if (t < R.t) return
      const yy = head + colH + i * rowH + rowH / 2 + 2, k = prog(t, R.t, R.t + 0.3)
      x.globalAlpha = clamp(k * 2)
      x.fillStyle = INK; x.fillText(R.a, 18, yy)
      const n = Math.floor(R.b.length * prog(t, R.t + 0.1, R.t + 0.6))
      x.fillStyle = '#3a3150'; x.fillText(R.b.slice(0, n), C1 + 18, yy)
      // check
      const ck = pop01(t, R.t + 0.6, 0.28, 2.6)
      if (ck > 0) drawBits(x, ['......X', '.....XX', 'X...XX.', 'XX.XX..', '.XXX...', '..X....'], { X: SHEET_G }, C2 + 40, yy - 2, 6, { sc: ck, outline: null })
      x.globalAlpha = 1
    })
    // the 5-year plan's tiny growth chart in the last row's details
    if (rowsOn >= 3) {
      const k = prog(t, ROWS[2].t + 0.6, ROWS[2].t + 1.2), yy = head + colH + 2 * rowH
      for (let b = 0; b < 5; b++) { const h = (10 + b * 9) * ease.outCubic(clamp(k * 5 - b)); x.fillStyle = b === 4 ? '#ff8fb1' : SHEET_G; x.fillRect(C1 + 220 + b * 22, yy + rowH - 10 - h, 14, h) }
    }
    x.restore()
  }
  function drawPlane(t) {
    const p = planePos(t)
    if (!p) return
    const pk = after(t) ? 1 : ease.outCubic(prog(t, T.fold[1] - 0.05, T.fold[1] + 0.15))
    drawBits(x, PLANE_BM, { W: '#2a2350', w: '#fbf6ea', g: '#d9d0bb' }, p.x, p.y, 11, { rot: p.a + 0.35, sc: pk })
  }
  function drawTrail(t, o) {
    if (!after(t)) {
      const f = prog(t, ...T.fly)
      if (f <= 0 || f >= 1) return
      for (let k = 1; k < 14; k++) { const q = Math.max(0, f - k * 0.025), e = ease.inQuad(q); x.globalAlpha = 0.6 * (1 - k / 14); x.fillStyle = BONE; x.fillRect(lerp(SHEET.x, 1250, e), lerp(SHEET.y + 140, 640, e) - Math.sin(Math.PI * q) * 60, 8, 8) }
      x.globalAlpha = 1
      return
    }
    const p = prog(t, ...T.loop)
    if (p <= 0) return
    const e = ease.inOutQuad(p), N = 90
    const fade = o * (1 - prog(t, T.hearts + 1.2, T.hearts + 2.0) * 0.4)
    x.save()
    for (let i = 0; i <= N * e; i++) {
      const P = heartPt(i / N)
      x.globalAlpha = fade * (p >= 1 ? 1 : 0.5 + 0.5 * (i / (N * e)))
      x.fillStyle = i % 2 ? '#ff8fb1' : '#fff1f5'
      x.fillRect(Math.round(P.x / 6) * 6 - 5, Math.round(P.y / 6) * 6 - 5, 10, 10)
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, p = (t - born) / 1.3
      if (p < 0 || p >= 1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, cx + (((i * 37) % 9) / 8 - 0.5) * 560 + Math.sin(p * 7 + i) * 16, cy - p * 220, 7, { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawScene(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    const two = after(t)
    drawTrail(t, o)
    drawSheet(t, o)
    const gasp = t > T_FUN && t < T_FUN + 0.6 ? -0.1 * Math.exp(-(t - T_FUN) * 7) * Math.cos((t - T_FUN) * 20) : 0
    const cast = [
      { P: two ? TAU2 : TAU1, c: TAU_, st: TAU_ST, hops: TAU_HOPS, tin: T.tauIn, seed: 2 },
      { P: two ? VIR2 : VIR1, c: VIR, st: VIR_ST, hops: VIR_HOPS, tin: T.virIn, seed: 6 },
      { P: two ? CAP2 : CAP1, c: CAP, st: CAP_ST, hops: CAP_HOPS, tin: T.capIn, seed: 10 },
    ]
    cast.forEach(m => {
      const pk = pop01(t, m.tin, 0.36, 2.2) * o
      if (pk <= 0.01) return
      let st = at(t, m.st)
      if (st === 'plane') st = { mood: 'sparkle', look: LOOK_PLANE(t, m.P) }
      drawStarChar(x, m.P.x, m.P.y, m.P.s, t, { color: m.c.color, glyph: m.c.glyph, ...st, hops: m.hops, seed: m.seed, pop: pk, squash: gasp })
    })
    drawPlane(t)
    for (const R of ROWS) sparkles(x, t, SHEET.x + 290, SHEET.y + 200, R.t + 0.6, { n: 6, R: 60, size: 16, seed: R.t, dur: 0.4, cols: [SHEET_G, BONE, GOLD] })
    sparkles(x, t, SHEET.x, SHEET.y + 160, T.fold[1], { n: 10, R: 120, size: 22, seed: 3, cols: [BONE, GOLD] })
    if (two) {
      sparkles(x, t, HEART_C.x, HEART_C.y, T.loop[1], { n: 14, R: 300, size: 26, seed: 5, cols: [PINK, GOLD, BONE, '#ff4f86'] })
      if (t > T.hearts) floatHearts(t, 540, 1290, T.hearts)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: 14.75 (box shut, the plane gone → the heart loop). End card flips at 20.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

const PITCH = { [TAU_TAG]: 739.99, [VIR_TAG]: 1174.66, [CAP_TAG]: 659.25, [SKY_TAG]: 880 }
export const CUES = [
  ['pop', T.h0, 880, 0.03, 0], ['pop', T.h0Land, 987.77, 0.045, -0.1], ['pop', T.h0Land + 0.12, 1174.66, 0.045, 0.1], ...wordPops(T.h0Land + 0.4, 3, 0.08, 2, 0.026),
  ['whoosh', T.sheetIn, 0.4, 0.03], ['pop', T.sheetIn + 0.2, 739.99, 0.04, 0],
  ['pop', T.tauIn + 0.05, 739.99, 0.04, -0.5], ['pop', T.virIn + 0.05, 1174.66, 0.04, 0], ['pop', T.capIn + 0.05, 659.25, 0.04, 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: PITCH }),
  ...ROWS.flatMap((R, i) => [['tick', +(R.t + 0.12).toFixed(3), 0.025], ['tick', +(R.t + 0.3).toFixed(3), 0.02], ['pluck', +(R.t + 0.6).toFixed(3), NOTE[[2, 4, 6][i]], 0.04, 0.4, 0.2]]),
  ...wordPops(T.h1, 1, 0.1, 1, 0.028), ['pop', T.h1Land, 659.25, 0.045, 0], ['pop', T.h1Land + 0.14, 587.33, 0.035, 0],
  ['pop', T_FUN, 440, 0.035, 0], ['pop', T_FUN + 0.06, 392, 0.03, 0],
  ['tick', T.fold[0] + 0.05, 0.04], ['tick', T.fold[0] + 0.2, 0.04], ['tick', T.fold[0] + 0.35, 0.04],
  ['whoosh', T.fly[0], 0.75, 0.04], ['pluck', T.fly[0] + 0.1, 1318.51, 0.035, 0.5, 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['pop', T.h2, 880, 0.03, 0], ['pop', T.h2 + 0.1, 987.77, 0.03, 0], ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.loop[0], 1.0, 0.03], ['whoosh', T.loop[0] + 1.15, 1.0, 0.03], ['glitter', T.loop[0] + 0.3, T.loop[1]],
  ['bell', T.loop[1], 1760, 0.03, 1.2, 0], ['glitter', T.hearts, T.hearts + 0.6], ['pluck', T.hearts, 1174.66, 0.04, 0.5, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
