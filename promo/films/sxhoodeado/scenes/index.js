// sxhoodeado · NEIGHBORHOOD STARS: "EaDo." (Star Talk Shows, show 11, 30 s vertical) · story 0–25.6, then the shared END
// CARD (default CTA). East Downtown's star is the creative: murals, warehouse lofts, a glow of stadium lights over the
// rooftops (generic light towers, no team). It shows everyone its finished murals, and nobody its sketchbook.
// Show bug "★ NEIGHBORHOOD STARS · EADO" top-left the whole story. Beats on the 108 bpm grid (0.6 + n·0.5556).
//   0.00–5.30   HOOK "EaDo's star | *paints* everything." — lofts, light towers sweeping their beams, the EADO STAR (beret)
//               paints a mural across a loft wall: EADO STAR: "three murals before *lunch*." ("MURAL #3" chip)
//   5.40–10.25  "The *sketchbook?* | Off limits." — ♎ LIBRA STAR (its date) pops in: "ooh. can I see your *sketchbook*?"
//               Hide #1: the book whips behind EaDo's back ("what sketchbook?"). Hide #2: under the beret ("nope.").
//               ♓ Pisces cries at the mural from a loft window ("the colors!!").
//  10.35        card cut (flip)
//  10.45–16.20 "Hide #3: | *camouflage.*" — EaDo hops in front of its own mural and paints itself into it; only the eyes
//               give it away. LIBRA: "…I can still see your *eyes*." EaDo blinks, un-camouflages, blushes.
//  16.30–21.95 "Let them see | the *draft.*" — THE STARS: "let them see the *unfinished* part." The book slides out from
//               under the beret and opens: a wobbly doodle of the two of them, one heart scribbled out and redrawn.
//               LIBRA: "wait… is this *us*?" — heart eyes.
//  22.05        card cut (flip)
//  22.15–25.30 "Show them | the *sketch.*" — the light towers swing their beams onto the two; Pisces happy-cries. Last line.
// One canvas (+ an offscreen canvas for the camouflage), DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR as STARC, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, AMBER, sparkle, chip, starFrame, inSprite, tearsCells, aside, showBug, pool, floatHearts, mural, lofts, lightTowers, beret, sketchbook } from './props.js'

export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
const BEAT = n => 0.6 + n * 0.5556
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const inK = (t, a, d = 0.3) => ease.outCubic(prog(t, a, a + d))

const EAD = '#2bd4b8'                                   // the EaDo star: paint-teal, no sign glyph (a neighborhood, not a sign)
const LIB = signStar('libra'), PIS = signStar('pisces')
const LIBC = '#ffc2e2'
const TAG_E = 'EADO STAR', TAG_L = `${LIB.glyph} LIBRA STAR`, TAG_N = 'THE STARS'
const CPS = 28
const BOXES = [
  [[{ t: 1.95, speaker: TAG_E, color: EAD, text: 'three murals before *lunch*.' }], 1.75, 5.25],
  [[{ t: 5.9, speaker: TAG_L, color: LIBC, text: 'ooh. can I see your *sketchbook*?' }], 5.7, 9.95],
  [[{ t: 12.0, speaker: TAG_L, color: LIBC, text: '…I can still see your *eyes*.' }], 11.8, 15.95],
  [[{ t: 16.45, speaker: TAG_N, text: 'let them see the *unfinished* part.' }, { t: 19.5, speaker: TAG_L, color: PINK, text: 'wait… is this *us*?' }], 16.28, 21.95],
]
const ALL = BOXES.flatMap(b => b[0])

// ── timeline
const T = {
  h0: 0.25, h0Late: BEAT(2), h0Out: 5.1, eIn: 0.5, paint: [0.9, 4.2], muralChip: 4.3,
  B: 5.4, h1: 5.42, h1Late: BEAT(9), h1Out: 10.05, lIn: 5.5, hide1: 7.55, hide2: 8.75, pisIn: 6.6, pisCry: 7.0,
  C: 10.4, h2: 10.45, h2Late: BEAT(19), h2Out: 16.05, camo: [11.0, 11.7], peek: [12.0, 14.4], uncamo: [14.6, 15.1],
  h3: 16.3, h3Late: BEAT(28), h3Out: 21.75, narrIn: 16.3, bookOut: [18.0, 18.6], open: [18.7, 19.15], heart: 20.6,
  h4: 22.15, h4Late: BEAT(39), aim: [22.2, 23.0], fade: [24.95, 25.3],
}

// ── layout
const GROUND = 1410
const WALL = { x: 60, y: 800, w: 470, h: 520 }          // the big mural wall (A, C)
const E_A = { x: 760, y: 1215, s: 250 }
const E_B = { x: 300, y: 1215, s: 240 }
const E_C = { x: 295, y: 1110, s: 250 }
const L_P = { x: 800, y: 1215, s: 240 }
const NARR = { x: 545, y: 800, s: 160 }
const PISW = { x: 560, y: 960, s: 84 }

/** EaDo's place: A (beside the wall) → B (left) → C (in front of the mural) → D/E (left) */
function eadoAt(t) {
  if (t < T.B) return E_A
  if (t < T.C) return E_B
  const k = ease.inOutCubic(prog(t, T.C + 0.1, T.C + 0.5)), back = ease.inOutCubic(prog(t, T.uncamo[1], T.uncamo[1] + 0.6))
  return { x: lerp(E_B.x, E_C.x, k * (1 - back)), y: lerp(E_B.y, E_C.y, k * (1 - back)) - Math.sin(Math.PI * k) * 60 * (1 - back), s: E_B.s }
}

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 30px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 15px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const off = document.createElement('canvas'); off.width = 640; off.height = 640
  const ox = off.getContext('2d')

  const bug = showBug(el, root, 'EADO')
  const H0 = popText(root, 'EaDo’s star | *paints* everything.', { top: 190, size: 104, accentSize: 150, at: T.h0, gap: 0.1, late: 2, lateAt: T.h0Late, lateGap: 0.14, wobble: true, accentColor: EAD, fit: true })
  const H1 = popText(root, 'The *sketchbook?* | Off limits.', { top: 190, size: 104, accentSize: 150, at: T.h1, gap: 0.1, late: 2, lateAt: T.h1Late, lateGap: 0.14, wobble: true, accentColor: AMBER, fit: true })
  const H2 = popText(root, 'Hide #3: | *camouflage.*', { top: 190, size: 108, accentSize: 160, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Late, wobble: true, accentColor: '#9fe08a' })
  const H3 = popText(root, 'Let them see | the *draft.*', { top: 190, size: 108, accentSize: 170, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3Late, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Show them | the *sketch.*', { top: 190, size: 112, accentSize: 176, at: T.h4, gap: 0.1, late: 1, lateAt: T.h4Late, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.fade[0]]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const E_HOPS = [T.eIn + 0.3, ...talkHops(ALL, TAG_E, { cps: CPS }), 2.6, 3.4, T.B + 0.15, T.hide1, T.hide2, T.C + 0.15, T.camo[1], T.uncamo[0], T.bookOut[0], T.heart + 0.3, T.aim[1]]
  const L_HOPS = [T.lIn + 0.3, ...talkHops(ALL, TAG_L, { cps: CPS }), T.hide1 + 0.3, T.heart, T.aim[1] + 0.1]
  const N_HOPS = [T.narrIn + 0.3, ...talkHops(ALL, TAG_N, { cps: CPS }), T.open[1]]

  function eState(t) {
    if (t < 1.95) return { mood: 'happy', look: [-1, -0.4] }
    if (t < T.paint[1]) return { mood: 'sparkle', look: [-1, -0.4] }
    if (t < T.B) return { mood: 'wink', look: [0, 0] }
    if (t < 7.0) return { mood: 'happy', look: [1, 0] }
    if (t < T.hide1) return { mood: 'wide', look: [1, 0], blink: false }       // …the sketchbook?
    if (t < T.hide2) return { mood: 'squint', look: [0, 0] }                    // what sketchbook?
    if (t < T.C) return { mood: 'happy', look: [0, 0], blush: 1 }               // nope.
    if (t < T.camo[1]) return { mood: 'squint', look: [1, 0] }
    if (t < T.peek[0]) return { mood: 'neutral', look: [0, 0] }
    if (t < 13.4) return { mood: 'wide', look: [1, 0], blink: false }           // busted
    if (t < T.uncamo[0]) return { mood: 'neutral', look: [1, 0], blink: 0.5 }
    if (t < 16.45) return { mood: 'happy', look: [1, 0], blush: 1 }
    if (t < T.bookOut[0]) return { mood: 'wide', look: [1, -1], blink: false }
    if (t < T.heart) return { mood: 'neutral', look: [1, 0], blush: 1 }
    if (t < T.h4) return { mood: 'sparkle', look: [1, 0] }
    return { mood: 'heart' }
  }
  function lState(t) {
    if (t < T.hide1) return { mood: 'sparkle', look: [-1, 0] }
    if (t < T.hide2) return { mood: 'squint', look: [-1, 0] }
    if (t < T.C) return { mood: 'eyeroll' }
    if (t < 12.0) return { mood: 'neutral', look: [Math.sin(t * 3) > 0 ? -1 : 0, -0.3] }   // where'd it go?
    if (t < 16.3) return { mood: 'wink', look: [-1, -0.3] }
    if (t < T.open[1]) return { mood: 'neutral', look: [-1, 0] }
    if (t < T.heart) return { mood: 'wide', look: [-1, 0.3], blink: false }
    return { mood: 'heart' }
  }
  function nState(t) {
    if (t < 16.45) return { mood: 'wide', look: [-1, 1] }
    if (t < T.open[1]) return { mood: 'happy', look: [-1, 1] }
    return { mood: 'sparkle', look: [0, 1] }
  }

  /** the EaDo star (+ beret), camouflaged by k into the wall mural */
  function drawEado(t, a, camoK) {
    const P = eadoAt(t), st = eState(t)
    const opts = { color: EAD, mood: st.mood, look: st.look, blink: st.blink, blush: st.blush, hops: E_HOPS, seed: 5, pop: pop01(t, T.eIn, 0.45, 2.2) * a, glow: 1.1 * (1 - camoK) }
    const F = starFrame(P.x, P.y, P.s, t, opts)
    // book under the beret (hide #2 → out at bookOut): the beret rides up on it
    const underK = t < T.hide2 ? 0 : 1 - ease.inOutCubic(prog(t, ...T.bookOut))
    const lift = (t > T.hide2 ? ease.outCubic(prog(t, T.hide2, T.hide2 + 0.3)) : 0) * underK * 26
    if (camoK > 0.001) {
      ox.clearRect(0, 0, 640, 640)
      const dx = P.x - 320, dy = P.y - 340
      ox.save(); ox.translate(-dx, -dy)
      drawStarChar(ox, P.x, P.y, P.s, t, opts)
      if (lift > 0) sketchbook(ox, P.x - 6, P.y - P.s * 0.48 - 8, 0.5, 0.06, 0, t, 1)
      beret(ox, F, opts.pop, -0.25, lift)
      ox.globalCompositeOperation = 'source-atop'; ox.globalAlpha = 0.88 * camoK
      mural(ox, WALL.x, WALL.y, WALL.w, WALL.h, 0, 1, 1)
      ox.restore()
      x.drawImage(off, dx, dy)
      if (camoK > 0.5) {   // only the eyes give it away: two pupils on top
        const c = F.cell
        x.save(); x.globalAlpha = a * clamp((camoK - 0.5) * 3)
        for (const ex of [11.5, 22.5]) { const wx = F.ox + (ex - 18) * c * F.sx, wy = F.oy + (16 - 18) * c * F.sy - F.base * F.sy; x.fillStyle = '#1b1236'; x.fillRect(wx - c, wy - c, 4 * c, 5 * c); x.fillStyle = '#fff'; x.fillRect(wx, wy, 2 * c, 3 * c); x.fillStyle = '#1b1236'; x.fillRect(wx + c, wy + c, c, 2 * c) }
        x.restore()
      }
    } else {
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      if (lift > 0) sketchbook(x, P.x - 6, P.y - P.s * 0.48 - 8, 0.5, 0.06, 0, t, a)
      beret(x, F, opts.pop * a, -0.25, lift)
    }
    return { P, F }
  }

  function drawPisWindow(t, a, t0, happy, W0 = PISW) {
    if (t < t0) return
    const PISW = W0
    const k = pop01(t, t0, 0.4, 2.2) * a
    const opts = { color: PIS.color, mood: happy ? 'happy' : 'squint', look: [-1, 1], seed: 11, pop: k, glow: 0.9, bob: 2 }
    x.save(); x.globalAlpha = a; x.fillStyle = '#1b1236'; x.fillRect(PISW.x - 62, PISW.y - 56, 124, 112); x.fillStyle = '#ffd98a'; x.fillRect(PISW.x - 54, PISW.y - 48, 108, 96); x.restore()
    drawStarChar(x, PISW.x, PISW.y + 6, PISW.s, t, opts)
    const F = starFrame(PISW.x, PISW.y + 6, PISW.s, t, opts); x.save(); x.globalAlpha = a; inSprite(x, F, () => tearsCells(x, t, 3)); x.restore()
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const a = 1 - ease.inQuad(prog(t, ...T.fade))
        const aimK = ease.inOutCubic(prog(t, ...T.aim))
        lightTowers(x, t, { y: 1230, a: inK(t, 0.1, 0.6) * a, aim: aimK > 0 ? { x: lerp(1400, 545, aimK), y: lerp(-400, 1150, aimK) } : null })
        lofts(x, t, { y: GROUND, a: inK(t, 0.1, 0.5) * a })
        if (aimK > 0) pool(x, 545, 1300, 520, 150, aimK * a, '255,240,200')
        // the big wall: painted in A, hidden in B and D/E, the camouflage backdrop in C
        const wallK = t < T.B ? pop01(t, 0.2, 0.5, 1.4) * outK(t, T.B - 0.25) : (t > T.C && t < 16.3) ? inK(t, T.C, 0.3) * outK(t, 16.0, 0.25) : 0
        if (wallK > 0) {
          x.save(); x.globalAlpha = wallK * a
          x.fillStyle = '#1b1236'; x.fillRect(WALL.x - 10, WALL.y - 10, WALL.w + 20, WALL.h + 10)
          x.fillStyle = '#4a2c3a'; x.fillRect(WALL.x, WALL.y, WALL.w, WALL.h)
          x.restore()
          const rv = t < T.B ? lerp(0.05, 1, ease.inOutQuad(prog(t, ...T.paint))) : 1
          mural(x, WALL.x, WALL.y, WALL.w, WALL.h, 0, wallK * a, rv)
          if (t < T.B && rv < 1) {   // the brush at the wet edge
            const bx = WALL.x + WALL.w * rv, by = WALL.y + WALL.h * (0.5 + 0.35 * Math.sin(t * 9))
            x.save(); x.globalAlpha = a; x.fillStyle = '#1b1236'; x.fillRect(bx - 8, by - 30, 30, 120); x.fillStyle = '#c98a1f'; x.fillRect(bx, by, 14, 100); x.fillStyle = '#ffd36b'; x.fillRect(bx - 4, by - 26, 22, 30); x.restore()
          }
          sparkle(x, WALL.x + WALL.w / 2, WALL.y + WALL.h / 2, t, T.paint[1], { n: 12, R: 260, seed: 9 })
        }
        // A: the hook
        if (t < T.B) {
          drawEado(t, outK(t, T.B - 0.2), 0)
          chip(x, 300, 740, 'MURAL #3', pop01(t, T.muralChip, 0.32, 2.6) * outK(t, T.B - 0.3), { size: 34, col: EAD, edge: EAD })
        }
        // B–E
        if (t >= T.B) {
          const sa = inK(t, T.B, 0.25) * a
          if (t < T.C) {
            drawPisWindow(t, sa * outK(t, T.C - 0.25), T.pisIn, false)
            if (t > T.pisCry) aside(x, 560, 850, 'the colors!!', pop01(t, T.pisCry, 0.3, 2.4) * outK(t, T.hide1) * sa, { size: 30, edge: PIS.color, tx: PISW.x, ty: PISW.y - 40 })
          }
          const camoK = ease.inOutCubic(prog(t, ...T.camo)) * (1 - ease.inOutCubic(prog(t, ...T.uncamo)))
          // the sketchbook in B: beside EaDo → behind it (hide #1) → under the beret (hide #2)
          const P0 = eadoAt(t)
          if (t < T.hide2) {
            const back = ease.inOutCubic(prog(t, T.hide1, T.hide1 + 0.25))
            const bk = pop01(t, T.B + 0.2, 0.36, 2.2) * sa
            if (back > 0.5) sketchbook(x, P0.x - 110, P0.y + 10, 0.85 * bk, -0.3, 0, t, 1)    // peeking out behind
            const { F } = drawEado(t, sa, camoK)
            void F
            if (back <= 0.5) sketchbook(x, lerp(P0.x + 150, P0.x - 110, back * 2), P0.y + 20, 0.85 * bk, 0.12, 0, t, 1)
          } else drawEado(t, sa, camoK)
          // Libra
          const ls = lState(t)
          drawStarChar(x, L_P.x, L_P.y, L_P.s, t, { color: LIB.color, glyph: LIB.glyph, mood: ls.mood, look: ls.look, blink: ls.blink, hops: L_HOPS, seed: 9, pop: pop01(t, T.lIn, 0.4, 2.2), alpha: sa })
          // B asides
          aside(x, 330, 930, 'what sketchbook?', pop01(t, T.hide1 + 0.1, 0.3, 2.4) * outK(t, T.hide2 - 0.15) * sa, { size: 30, edge: EAD, tx: E_B.x, ty: E_B.y - 80 })
          aside(x, 300, 930, 'nope.', pop01(t, T.hide2 + 0.15, 0.3, 2.4) * outK(t, T.C - 0.25) * sa, { size: 34, edge: EAD, tx: E_B.x, ty: E_B.y - 80 })
          // D: THE STARS + the open book
          if (t > T.narrIn && t < T.h4 + 0.4) {
            const st = nState(t)
            drawStarChar(x, NARR.x, NARR.y, NARR.s, t, { color: STARC.sky, mood: st.mood, look: st.look, hops: N_HOPS, seed: 3, pop: pop01(t, T.narrIn, 0.45, 2.2) * outK(t, T.h4 - 0.1, 0.4), alpha: sa, glow: 1.2 })
          }
          if (t > T.bookOut[0]) {
            const P = eadoAt(t), mk = ease.inOutCubic(prog(t, ...T.bookOut)), ok = ease.inOutCubic(prog(t, ...T.open))
            const bx = lerp(P.x - 6, 545, mk), by = lerp(P.y - P.s * 0.48 - 8, 1050, mk) - Math.sin(Math.PI * mk) * 80
            sketchbook(x, bx, by, lerp(0.5, 1.25, mk), lerp(0.06, 0, mk), ok, t, sa)
            sparkle(x, 545, 1050, t, T.open[1], { n: 12, R: 200, seed: 21 })
          }
          if (t > T.heart) floatHearts(x, t, 545, 1100, T.heart, 25, 2, 7, 420)
          if (t > T.h4) drawPisWindow(t, a, T.h4 + 0.6, true, { x: 930, y: 900, s: 84 })
        }
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      bug.style.opacity = String(inK(t, 0.15, 0.4) * outK(t, END - 0.35, 0.3))
      for (const [H, o] of HEADS) H.update(t, outK(t, o, 0.22))
      for (const b of boxes) b.update(t)
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-minor palette; the engine moves pitched cues into the key)
const NOTE = [587.33, 659.25, 698.46, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FILM_CUES = [
  // A
  ...wordPops(T.h0, 2, 0.1, 0), ['pop', r3(T.h0Late), 1046.5, 0.045, -0.1], ['pluck', r3(T.h0Late + 0.14), 1174.66, 0.045, 0.6, 0.1],
  ['pop', T.eIn, 783.99, 0.045, 0.3], ['bell', r3(T.eIn + 0.05), 1567.98, 0.02, 1.0, 0.3],
  ...[0, 1, 2, 3, 4, 5].map(i => ['whoosh', r3(T.paint[0] + i * 0.55), 0.22, 0.02]),
  ['glitter', T.paint[1], r3(T.paint[1] + 0.6)], ['pop', T.muralChip, 1174.66, 0.04, -0.3],
  // B
  ...wordPops(T.h1, 2, 0.1, 2, 0.026), ['pop', r3(T.h1Late), 1046.5, 0.05, 0], ['pluck', r3(T.h1Late + 0.14), 880, 0.045, 0.6, 0],
  ['pop', T.lIn, 698.46, 0.04, 0.4], ['pop', T.pisIn, 587.33, 0.03, 0], ['pop', T.pisCry, 523.25, 0.035, 0], ['pop', r3(T.pisCry + 0.12), 440, 0.03, 0],
  ['whoosh', T.hide1, 0.3, 0.05], ['tick', r3(T.hide1 + 0.25), 0.05], ['whoosh', T.hide2, 0.3, 0.05], ['pop', r3(T.hide2 + 0.25), 1318.51, 0.04, -0.3],
  // C
  ...wordPops(T.h2, 2, 0.1, 1, 0.026), ['pop', r3(T.h2Late), 1174.66, 0.05, 0], ['pluck', r3(T.h2Late), 880, 0.045, 0.6, 0],
  ['whoosh', T.C + 0.1, 0.4, 0.03], ['riser', T.camo[0], T.camo[1], 0.03], ['glitter', T.camo[0], T.camo[1]], ['tick', 13.4, 0.05], ['tick', 13.55, 0.05],
  ['whoosh', T.uncamo[0], 0.4, 0.03], ['pop', T.uncamo[1], 659.25, 0.04, -0.3],
  // D
  ...wordPops(T.h3, 3, 0.1, 3, 0.026), ['pop', r3(T.h3Late), 1046.5, 0.05, 0], ['pluck', r3(T.h3Late), 783.99, 0.05, 0.7, 0],
  ['pop', T.narrIn, 1174.66, 0.04, 0], ['bell', r3(T.narrIn + 0.05), 1760, 0.02, 1.2, 0],
  ['whoosh', T.bookOut[0], 0.5, 0.04], ['tick', T.open[0], 0.05], ['boom', T.open[1], 0.08], ['bell', T.open[1], 880, 0.045, 2.0, 0], ['glitter', T.open[1], r3(T.open[1] + 0.6)],
  ['bell', T.heart, 1318.51, 0.035, 1.6, 0.3], ['pluck', r3(T.heart + 0.08), 1567.98, 0.035, 0.5, 0.3],
  // E
  ...wordPops(T.h4, 3, 0.1, 0, 0.028), ['pop', r3(T.h4Late), 1174.66, 0.05, 0], ['pluck', r3(T.h4Late), 1396.91, 0.045, 0.7, 0],
  ['whoosh', T.aim[0], 0.8, 0.04], ['boom', T.aim[1], 0.07], ['glitter', T.aim[1], r3(T.aim[1] + 0.7)], ['pop', r3(T.h4 + 0.6), 783.99, 0.03, 0],
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [TAG_E]: 987.77, [TAG_L]: 783.99, [TAG_N]: 880 } })),
]

// card-motif candidates (cardfx keeps 10.35 + 22.05):
//   5.35  box 1 shut (5.25), H0 out (5.1–5.32) → "The sketchbook?" (5.42)
//  10.35  H1 out (10.05–10.27), box 2 shut (9.95) → "Hide #3: camouflage." (10.45)
//  16.25  box 3 shut (15.95), H2 out (16.27) → "Let them see the draft." (16.3)
//  22.05  box 4 shut (21.95), H3 out (21.97) → "Show them the sketch." (22.15)
const CUTS = [{ t: 5.35, kind: 'flip' }, { t: 10.35, kind: 'flip' }, { t: 16.25, kind: 'deal' }, { t: 22.05, kind: 'flip', dir: -1 }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END }),
  cardFrame({ start: 0, end: END, corners: 'tr bl br' }),
  cardCuts(CUTS),
]
export { T }
