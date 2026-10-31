// sxhoodthirdward · NEIGHBORHOOD STARS: "Third Ward." (Star Talk Shows, show 11, 30 s vertical) · story 0–25.6, then the
// shared END CARD (default CTA). Third Ward's star is warm and rooted: a street of porches under an old oak, music
// drifting out of a window, and everybody knows everybody. Advice: bring someone home to your people early.
// Show bug "★ NEIGHBORHOOD STARS · THIRD WARD" top-left the whole story. Beats on the 108 bpm grid (0.6 + n·0.5556).
//   0.00–5.30   HOOK "Third Ward's star | *knows* everybody." — the porches, the oak, notes from a window. THIRD WARD STAR
//               on its porch, waving down the street: "my auntie. my unc. my *whole block*." (AUNTIE ♋ in reading glasses,
//               UNC ♌ in a flat cap, a little ♈ on the steps, ♓ Pisces on the porch.)
//   5.40–10.25  "Date three. | The *invite.*" — the neighbors zip inside. ♑ CAPRICORN STAR (bow tie, sweating) arrives:
//               "date three… and I meet your *people*?" Curtains twitch, eyes peek: one, two, three.
//  10.35        card cut (flip)
//  10.45–16.20 "The *porch* | committee." — everyone bursts back onto the porches. Rapid fire: AUNTIE "you eat yet?",
//               UNC "who's your people?", the kid "you like jazz??" CAPRICORN: "yes ma'am. Capricorn. and… *yes*?"
//               A full plate floats over from Auntie. Pisces sobs.
//  16.30–21.95 "Your people | *tell your story.*" — THE STARS: "your people show them who you *are*." Auntie holds up a baby
//               picture. THIRD WARD STAR: "auntie. not the *baby pictures*!" — Capricorn: heart eyes.
//  22.05        card cut (flip)
//  22.15–25.30 "Meet the | *porch.*" — string lights swag across the porches, everyone hops to the music, Pisces happy-cries.
// One canvas, DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR as STARC, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, PINK, AMBER, sparkle, chip, starFrame, inSprite, tearsCells, aside, showBug, pool, floatHearts, houses, oak, notes, glassesCells, capCells, bowCells, sweatCells, plate, babyPhoto, stringLights } from './props.js'

export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
const BEAT = n => 0.6 + n * 0.5556
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const inK = (t, a, d = 0.3) => ease.outCubic(prog(t, a, a + d))

const TW = '#ff9f5a'                                     // the Third Ward star: warm porch-light orange, no sign glyph
const CAP = signStar('capricorn'), CAN = signStar('cancer'), LEO = signStar('leo'), ARI = signStar('aries'), PIS = signStar('pisces')
const TAG_W = 'THIRD WARD STAR', TAG_C = `${CAP.glyph} CAPRICORN STAR`, TAG_N = 'THE STARS'
const CAPC = '#c9b8ff'
const CPS = 28
const BOXES = [
  [[{ t: 1.95, speaker: TAG_W, color: TW, text: 'my auntie. my unc. my *whole block*.' }], 1.75, 5.25],
  [[{ t: 5.9, speaker: TAG_C, color: CAPC, text: 'date three… and I meet your *people*?' }], 5.7, 9.95],
  [[{ t: 12.7, speaker: TAG_C, color: CAPC, text: "yes ma'am. Capricorn. and… *yes*?" }], 12.5, 16.05],
  [[{ t: 16.38, speaker: TAG_N, text: 'your people show them who you *are*.' }, { t: 19.1, speaker: TAG_W, color: PINK, text: 'auntie. not the *baby pictures*!' }], 16.28, 21.95],
]
const ALL = BOXES.flatMap(b => b[0])

// ── timeline
const T = {
  h0: 0.25, h0Late: BEAT(2), h0Out: 5.1, wIn: 0.5, hoodIn: [0.7, 0.85, 1.0, 1.15], names: [2.3, 2.75, 3.3],
  B: 5.4, h1: 5.42, h1Late: BEAT(9), h1Out: 10.05, duck: 5.45, capIn: 5.55, peek: [7.7, 8.5, 9.25],
  C: 10.4, h2: 10.45, h2Late: BEAT(18), h2Out: 16.05, burst: 10.5, ask: [10.95, 11.55, 12.15], plate: [14.8, 15.4],
  h3: 16.3, h3Late: BEAT(28), h3Out: 21.75, narrIn: 16.3, photo: 18.4, swoon: 19.9,
  h4: 22.15, h4Late: BEAT(38), lights: [22.25, 23.1], fade: [24.95, 25.3],
}

// ── layout
const WP = { x: 540, y: 1235, s: 200 }                  // Third Ward star on its porch (A)
const WS = { x: 360, y: 1470, s: 180 }                  // … down on the sidewalk (B on)
const CS = { x: 720, y: 1470, s: 175 }                  // Capricorn on the sidewalk
const AUN = { x: 165, y: 1250, s: 150 }, UNC = { x: 905, y: 1250, s: 150 }, KID = { x: 1012, y: 1335, s: 78 }, PISP = { x: 300, y: 1270, s: 90 }
const NARR = { x: 545, y: 760, s: 160 }

/** neighbors present on the porches? 1 in A, ducked inside in B, back for C on */
const hoodK = (t, t0) => t < T.B ? pop01(t, t0, 0.4, 2.2) : t < T.C ? 1 - ease.inCubic(prog(t, T.duck, T.duck + 0.3)) : pop01(t, T.burst, 0.4, 2.6)

async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 30px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 18px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const bug = showBug(el, root, 'THIRD WARD')
  const H0 = popText(root, 'Third Ward’s star | *knows* everybody.', { top: 190, size: 104, accentSize: 150, at: T.h0, gap: 0.1, late: 2, lateAt: T.h0Late, lateGap: 0.14, wobble: true, accentColor: TW, fit: true })
  const H1 = popText(root, 'Date three. | The *invite.*', { top: 190, size: 108, accentSize: 160, at: T.h1, gap: 0.1, late: 2, lateAt: T.h1Late, lateGap: 0.14, wobble: true, accentColor: CAPC })
  const H2 = popText(root, 'The *porch* | committee.', { top: 190, size: 112, accentSize: 170, at: T.h2, gap: 0.1, late: 0, wobble: true, accentColor: AMBER })
  const H3 = popText(root, 'Your people | *tell your story.*', { top: 190, size: 104, accentSize: 140, at: T.h3, gap: 0.1, late: 3, lateAt: T.h3Late, lateGap: 0.12, wobble: true, accentColor: GOLD, fit: true })
  const H4 = popText(root, 'Meet the | *porch.*', { top: 190, size: 120, accentSize: 190, at: T.h4, gap: 0.1, late: 1, lateAt: T.h4Late, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.fade[0]]]

  const BOX = { y: 1600, width: 960, height: 236, cps: CPS }
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { ...BOX, lines, open, close }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const MUSIC = [22.6, 23.15, 23.7, 24.25, 24.8]           // E: everybody hops on the beat
  const W_HOPS = [T.wIn + 0.3, ...talkHops(ALL, TAG_W, { cps: CPS }), T.B + 0.1, T.burst + 0.1, T.photo + 0.3, ...MUSIC]
  const C_HOPS = [T.capIn + 0.4, ...talkHops(ALL, TAG_C, { cps: CPS }), T.plate[1], T.swoon, ...MUSIC.map(v => v + 0.05)]
  const N_HOPS = [T.narrIn + 0.3, ...talkHops(ALL, TAG_N, { cps: CPS })]
  const A_HOPS = [T.names[0], T.burst + 0.2, T.ask[0], T.plate[0], T.photo, ...MUSIC]
  const U_HOPS = [T.names[1], T.burst + 0.25, T.ask[1], ...MUSIC.map(v => v + 0.08)]
  const K_HOPS = [T.names[2], T.names[2] + 0.4, T.burst + 0.3, T.ask[2], T.ask[2] + 0.35, ...MUSIC, ...MUSIC.map(v => v + 0.27)]

  function wState(t) {
    if (t < T.B) return { mood: t < 1.95 ? 'happy' : 'sparkle', look: t < T.names[1] ? [-1, 0] : t < T.names[2] ? [1, 0] : [0, 0] }
    if (t < 7.6) return { mood: 'happy', look: [1, 0], blush: 1 }
    if (t < T.C) return { mood: 'eyeroll' }                                       // the curtains…
    if (t < 12.7) return { mood: 'wink', look: [1, 0] }
    if (t < T.h3) return { mood: 'happy', look: [1, 0] }
    if (t < T.photo + 0.2) return { mood: 'happy', look: [0, 0] }
    if (t < 21.0) return { mood: 'wide', look: [-1, -1], blink: false, blush: 1 }   // NOT the baby pictures
    if (t < T.h4) return { mood: 'squint', look: [1, 0], blush: 1 }
    return { mood: 'happy', look: [1, 0], blush: 1 }
  }
  function cState(t) {
    if (t < 7.6) return { mood: 'wide', look: [-1, 0], blink: false, sweat: true }
    if (t < T.C) return { mood: 'wide', look: [0, -1], blink: false, sweat: true }   // the curtains are watching
    if (t < 12.7) return { mood: 'wide', look: t < T.ask[1] ? [-1, -1] : [1, -1], blink: false, sweat: true }
    if (t < T.plate[1]) return { mood: 'happy', look: [0, -1], sweat: t < 14.2 }
    if (t < T.photo + 0.2) return { mood: 'sparkle', look: [-1, 0] }
    if (t < T.swoon) return { mood: 'wide', look: [-1, -1], blink: false }
    return { mood: 'heart' }
  }
  function nState(t) { return t < 16.38 ? { mood: 'wide', look: [0, 1] } : t < T.photo ? { mood: 'happy', look: [0, 1] } : { mood: 'sparkle', look: [-1, 1] } }

  function neighbor(t, P, col, glyph, hops, seed, k, mood, look, wear) {
    if (k <= 0.01) return
    const opts = { color: col, glyph: P.s >= 120 ? glyph : null, mood, look, hops, seed, pop: k, glow: 0.9 }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    if (wear) { const F = starFrame(P.x, P.y, P.s, t, opts); inSprite(x, F, () => wear(F)) }
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const a = 1 - ease.inQuad(prog(t, ...T.fade))
        x.save(); x.globalAlpha = a
        const curtain = i => t > T.B && t < T.C ? Math.max(0, Math.sin(Math.PI * clamp((t - T.peek[[0, 2, 1][i]]) / 0.9))) : 0
        houses(x, t, { a: inK(t, 0.1, 0.5), curtain })
        // eyes in the twitching curtains (B)
        if (t > T.B && t < T.C) [[0, 255], [2, 985], [1, 620]].forEach(([i, wx], n) => {
          const c = curtain(i)
          if (c > 0.3) { x.fillStyle = '#1b1236'; x.fillRect(wx - 24, 1052, 22, 28); x.fillRect(wx + 4, 1052, 22, 28); x.fillStyle = '#fff'; x.fillRect(wx - 21, 1055, 16, 22); x.fillRect(wx + 7, 1055, 16, 22); x.fillStyle = '#1b1236'; x.fillRect(wx - 17 + (n % 2 ? -2 : 4), 1062, 8, 11); x.fillRect(wx + 11 + (n % 2 ? -2 : 4), 1062, 8, 11) }
        })
        oak(x, t, inK(t, 0.1, 0.6))
        notes(x, t, 850, 1000, inK(t, 0.8, 0.6) * (t > T.B && t < T.C ? 0.3 : 1))
        stringLights(x, t, 20, 1060, 1205, 50, ease.inOutCubic(prog(t, ...T.lights)))
        if (t > T.lights[0]) pool(x, 540, 1430, 560, 130, ease.inOutCubic(prog(t, ...T.lights)) * 0.8)
        // the neighbors on their porches
        const happyHood = t > T.plate[0] || t < T.B
        neighbor(t, AUN, CAN.color, CAN.glyph, A_HOPS, 21, hoodK(t, T.hoodIn[0]), t < T.burst + 0.4 && t > T.C ? 'wide' : t > T.photo && t < T.h4 ? 'sparkle' : happyHood ? 'happy' : 'squint', [1, 0.3], () => glassesCells(x, {}))
        neighbor(t, UNC, LEO.color, LEO.glyph, U_HOPS, 22, hoodK(t, T.hoodIn[1]), t < T.burst + 0.4 && t > T.C ? 'wide' : happyHood ? 'happy' : 'squint', [-1, 0.3], () => capCells(x))
        neighbor(t, KID, ARI.color, ARI.glyph, K_HOPS, 23, hoodK(t, T.hoodIn[2]), t > T.C && t < T.plate[0] ? 'sparkle' : 'happy', [-1, 0.5])
        // Pisces on the porch: crying in every beat it's out (sad-happy in A, overwhelmed in C, happy in E)
        const pk = hoodK(t, T.hoodIn[3])
        if (pk > 0.01) {
          const opts = { color: PIS.color, mood: t > T.h4 ? 'happy' : 'squint', look: [1, 0], seed: 11, pop: pk, glow: 0.8, hops: [T.burst + 0.2, ...MUSIC] }
          drawStarChar(x, PISP.x, PISP.y, PISP.s, t, opts)
          const F = starFrame(PISP.x, PISP.y, PISP.s, t, opts); inSprite(x, F, () => tearsCells(x, t, t > T.plate[0] ? 3 : 2))
        }
        // name chips (A)
        ;[['AUNTIE', AUN, 0], ['UNC', UNC, 1], ['THE WHOLE BLOCK', { x: 540, y: 1010 }, 2]].forEach(([s, P, i]) => chip(x, P.x, P.y - (i === 2 ? 0 : 120), s, pop01(t, T.names[i], 0.3, 2.6) * outK(t, T.B - 0.3), { size: i === 2 ? 34 : 28, col: TW, edge: TW }))
        // the Third Ward star: porch (A) → sidewalk (B on)
        const mv = ease.inOutCubic(prog(t, T.B - 0.05, T.B + 0.45))
        const wx = lerp(WP.x, WS.x, mv), wy = lerp(WP.y, WS.y, mv) - Math.sin(Math.PI * mv) * 80, ws = lerp(WP.s, WS.s, mv)
        const w = wState(t)
        drawStarChar(x, wx, wy, ws, t, { color: TW, mood: w.mood, look: w.look, blink: w.blink, blush: w.blush, hops: W_HOPS, seed: 5, pop: pop01(t, T.wIn, 0.45, 2.2), glow: 1.15 })
        // Capricorn
        if (t > T.capIn) {
          const ck = ease.outCubic(prog(t, T.capIn, T.capIn + 0.7))
          const cxp = lerp(1240, CS.x, ck), c = cState(t)
          const opts = { color: CAP.color, glyph: CAP.glyph, mood: c.mood, look: c.look, blink: c.blink, hops: C_HOPS, seed: 9, glow: 1 }
          drawStarChar(x, cxp, CS.y, CS.s, t, opts)
          const F = starFrame(cxp, CS.y, CS.s, t, opts)
          inSprite(x, F, () => { bowCells(x); if (c.sweat) sweatCells(x, t) })
          chip(x, 760, 1000, 'NAMES · MANNERS · SMILE', pop01(t, 6.9, 0.3, 2.4) * outK(t, 7.6), { size: 26, col: CAPC, edge: CAPC })
        }
        // C: the porch committee asks
        aside(x, 260, 1000, 'you eat yet?', pop01(t, T.ask[0], 0.3, 2.4) * outK(t, T.plate[0] - 0.1), { size: 32, edge: CAN.color, tx: AUN.x, ty: AUN.y - 60 })
        aside(x, 800, 1000, "who's your people?", pop01(t, T.ask[1], 0.3, 2.4) * outK(t, T.plate[0] - 0.1), { size: 32, edge: LEO.color, tx: UNC.x, ty: UNC.y - 60 })
        aside(x, 780, 1120, 'you like jazz??', pop01(t, T.ask[2], 0.3, 2.4) * outK(t, T.plate[0] - 0.1), { size: 30, edge: ARI.color, tx: KID.x, ty: KID.y - 40 })
        // the plate: from Auntie to Capricorn
        if (t > T.plate[0] && t < T.h3 + 0.2) {
          const pk2 = ease.inOutCubic(prog(t, ...T.plate))
          plate(x, lerp(AUN.x + 40, CS.x - 10, pk2), lerp(AUN.y - 20, CS.y - 130, pk2) - Math.sin(Math.PI * pk2) * 160, 0.9 * pop01(t, T.plate[0], 0.3, 2.2) * outK(t, T.h3), 1)
          if (t > T.plate[1]) floatHearts(x, t, CS.x, CS.y - 170, T.plate[1], T.plate[1] + 0.4, 3, 6, 120)
        }
        // D: THE STARS + the baby picture
        if (t > T.narrIn && t < T.h4 + 0.4) {
          const n = nState(t)
          drawStarChar(x, NARR.x, NARR.y, NARR.s, t, { color: STARC.sky, mood: n.mood, look: n.look, hops: N_HOPS, seed: 3, pop: pop01(t, T.narrIn, 0.45, 2.2) * outK(t, T.h4 - 0.1, 0.4), glow: 1.2 })
        }
        if (t > T.photo && t < T.h4 + 0.3) {
          const k = pop01(t, T.photo, 0.45, 2.6) * outK(t, T.h4 - 0.1, 0.3)
          babyPhoto(x, 260, 990, 1.05 * k, -0.12 + 0.05 * Math.sin((t - T.photo) * 3), TW, t, 1)
          sparkle(x, 260, 990, t, T.photo + 0.1, { n: 10, R: 180, seed: 41 })
          chip(x, 260, 1150, 'EXHIBIT A', pop01(t, T.photo + 0.5, 0.3, 2.4) * k, { size: 24, col: CAN.color, edge: CAN.color })
        }
        if (t > T.swoon) floatHearts(x, t, CS.x, CS.y - 140, T.swoon, 25, 4, 7, 220)
        x.restore()
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      bug.style.opacity = String(inK(t, 0.15, 0.4) * outK(t, END - 0.35, 0.3))
      for (const [H, o] of HEADS) H.update(t, outK(t, o, 0.22))
      for (const b of boxes) b.update(t)
      drawGrain(gx, t)
    },
  }
}

// ── sound (F-major palette; the engine moves pitched cues into the key)
const NOTE = [698.46, 783.99, 880, 932.33, 1046.5, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FILM_CUES = [
  // A
  ...wordPops(T.h0, 2, 0.1, 0), ['pop', r3(T.h0Late), 1046.5, 0.045, -0.1], ['pluck', r3(T.h0Late + 0.14), 1396.91, 0.045, 0.6, 0.1],
  ['pop', T.wIn, 880, 0.045, 0], ['bell', r3(T.wIn + 0.05), 1760, 0.02, 1.0, 0],
  ...T.hoodIn.map((v, i) => ['pop', v, NOTE[(i * 2) % 7], 0.025, [-0.6, 0.6, 0.8, -0.3][i]]),
  ...T.names.map((v, i) => ['pluck', v, [1046.5, 1174.66, 1396.91][i], 0.04, 0.5, [-0.5, 0.5, 0][i]]),
  // B
  ...wordPops(T.h1, 2, 0.1, 2, 0.026), ['pop', r3(T.h1Late), 1046.5, 0.05, 0], ['pluck', r3(T.h1Late + 0.14), 880, 0.045, 0.6, 0],
  ['whoosh', T.duck, 0.3, 0.05], ['tick', r3(T.duck + 0.12), 0.04], ['tick', r3(T.duck + 0.2), 0.04], ['whoosh', T.capIn, 0.6, 0.03],
  ...T.peek.map((v, i) => ['tick', r3(v + 0.2), 0.05]), ...T.peek.map((v, i) => ['pop', r3(v + 0.3), 1567.98, 0.025, [-0.5, 0.5, 0][i]]),
  // C
  ...wordPops(T.h2, 3, 0.1, 1, 0.028), ['boom', T.burst, 0.07], ['glitter', T.burst, r3(T.burst + 0.5)],
  ...T.ask.map((v, i) => ['pop', v, [880, 783.99, 1174.66][i], 0.04, [-0.4, 0.4, 0.3][i]]),
  ['whoosh', T.plate[0], 0.6, 0.035], ['bell', T.plate[1], 1046.5, 0.04, 1.6, 0.2], ['pop', r3(T.plate[0] + 0.2), 659.25, 0.03, -0.5],
  // D
  ...wordPops(T.h3, 2, 0.1, 3, 0.026), ...wordPops(T.h3Late, 3, 0.12, 4, 0.04),
  ['pop', T.narrIn, 1174.66, 0.04, 0], ['bell', r3(T.narrIn + 0.05), 1760, 0.02, 1.2, 0],
  ['whoosh', T.photo, 0.3, 0.05], ['pop', r3(T.photo + 0.2), 1396.91, 0.05, -0.4], ['glitter', r3(T.photo + 0.1), r3(T.photo + 0.6)],
  ['bell', T.swoon, 1318.51, 0.035, 1.6, 0.3], ['pluck', r3(T.swoon + 0.08), 1567.98, 0.035, 0.5, 0.3],
  // E
  ...wordPops(T.h4, 2, 0.1, 0, 0.028), ['pop', r3(T.h4Late), 1174.66, 0.05, 0], ['pluck', r3(T.h4Late), 1396.91, 0.045, 0.7, 0],
  ...Array.from({ length: 14 }, (_, i) => ['pop', r3(T.lights[0] + i * 0.06), NOTE[i % 7] * 2, 0.012, -0.8 + i * 0.12]),
  ['glitter', T.lights[1], r3(T.lights[1] + 0.8)],
  ...BOXES.flatMap(([L]) => talkCues(L, { cps: CPS, pitch: { [TAG_W]: 880, [TAG_C]: 698.46, [TAG_N]: 1046.5 } })),
]

// card-motif candidates (cardfx keeps 10.35 + 22.05):
//   5.35  box 1 shut (5.25), H0 out (5.1–5.32) → "Date three." (5.42)
//  10.35  H1 out (10.05–10.27), box 2 shut (9.95) → "The porch committee." (10.45)
//  16.25  box 3 shut (16.05), H2 out (16.27) → "Your people tell your story." (16.3)
//  22.05  box 4 shut (21.95), H3 out (21.97) → "Meet the porch." (22.15)
const CUTS = [{ t: 5.35, kind: 'flip' }, { t: 10.35, kind: 'flip' }, { t: 16.25, kind: 'deal' }, { t: 22.05, kind: 'flip', dir: -1 }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END }),
  cardFrame({ start: 0, end: END, corners: 'tr bl br' }),
  cardCuts(CUTS),
]
export { T }
