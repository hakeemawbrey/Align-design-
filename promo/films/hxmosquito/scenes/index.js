// hxmosquito — "They Come at Dusk." (45 s vertical Align ad, Star Talk "Wild Lessons", Houston: a horror movie;
// music: synthwave · F#m). Story 0–40.6, then the shared end card. No show bug.
//   0.0–4.5    "They come at *dusk.*"  A Houston backyard at dusk: a live oak, a lawn, a screened porch glowing on the
//              right. ♐ SAGITTARIUS and ♍ VIRGO on a picnic blanket stare up: a giant mosquito silhouette crosses a huge
//              pale moon. VIRGO: "did you hear *something?*"  (♓ Pisces peeks from behind the oak, crying, as ever.)
//   4.6–8.8    "A first date. | *Outdoors.*"  The drop: BZZZZ, it dives. SAG: "it's fine! it's *nature!*"  SLAP (miss).
//              SLAP (own face).
//   8.85–11.9  "It *bites.*"  Virgo gets a bump on a point, itches. VIRGO: "it bit my *point.*"
//   12.0–15.2  "It brought | *friends.*"  A swarm rises out of the lawn. SAG: "that's a *lot* of them."  JUMP SCARE:
//              a mosquito face fills the screen with a red flash.
//  15.3        the one card cut.
//  15.35–19.4 "Nowhere is *safe.*"  They hop the blanket under the oak, then by the fence: the swarm follows every time.
//              SAG: "wait. is it… *me?*"  VIRGO: "no. it's the *bugs.*"
//  19.5–21.9  "The final *escape.*"  Virgo points at the porch; slow-motion run, the swarm behind them; the screen door
//              SLAMS. bonk. bonk. bonk.
//  22.0–28.7  "Safe. | Finally *talking.*"  Inside the porch: a ceiling fan, two glasses of tea. VIRGO: "so. what do you
//              *love* doing?"  SAG: "honestly? *this.* talking."  Outside, a mosquito presses its face to the screen and sighs.
//  28.93      ★ LESSON UNLOCKED: "Change the *setting,* | not the person."
//  33.5–37.85 "Pick the place | *together.*"  A talk card ("Where do we | *talk* best?"); both play face-down; both flip:
//              "The porch." ✓ ✓  VIRGO: "same answer. *no bugs.*"
//  37.95–40.42 "Fine. *Indoors.*"  Pull back to frame 0's shot, changed: the moon, the mosquito crossing it again, but the
//              two are cosy behind the screen. Everything clears by 40.42; the end card takes over at 40.6.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { OUT, GOLD, BONE, PINK, LAV, SKYBLUE, MONO, BEAT, R, bitmap, rgba, pop01, outK, popOut, inW, bump, keyed, S_, win,
  drawPixelHeart, drawTissue, makeFx, drawCardBack, drawTalkCard, drawAnswerCard, SND } from './kit.js'

export { BEAT }
export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
export const KEY = 'F#m'
const RED = '#ff4a5a', MOONC = '#f4ecd2'

const SAG = signStar('sagittarius'), VIR = signStar('virgo'), PIS = signStar('pisces')
const SAG_T = '#ffb45c', VIR_T = '#9fe0b0'

// ── the timeline
export const T = {
  h0Out: [4.3, 4.48], l1: -2.0, sil: [-1.2, 4.2],
  h1: 4.6, h1Land: BEAT(8), h1Out: [8.62, 8.78], dive: BEAT(8), l2: 4.95, slap1: 6.45, slap2: 7.7,
  h2: 8.85, h2Land: 9.2, h2Out: [11.75, 11.9], bite: 9.15, l3: 9.4, itch: [10.6, 11.6],
  h3: 12.0, h3Land: 12.35, h3Out: [14.38, 14.5], swarm: [12.1, 13.0], l4: 12.1, scare: [14.62, 15.2], closeA: 14.6,
  cut: 15.3,
  h4: 15.36, h4Land: 15.75, h4Out: [19.25, 19.4], hop1: [15.45, 15.95], hop2: [16.95, 17.45], l5: 15.95, l6: 18.85,
  h5: 19.5, h5Land: 19.85, h5Out: [21.8, 21.95], point: 19.55, run: [19.95, 21.6], slam: 21.62, bonks: [21.85, 22.15, 22.45], closeB: 21.55,
  h6: 22.05, h6Land: 22.45, h6Out: [28.55, 28.7], l7: 22.4, l8: 25.4, press: 25.0, sigh: 26.6, hearts: 27.0, closeC: 28.55,
  lesson: BEAT(51), lessonOut: [33.25, 33.45],
  h7: 33.5, h7Land: BEAT(60), h7Out: [37.7, 37.85], tie: [33.4, 33.9], talk: [33.5, 33.92], playA: 34.25, playB: 34.42, l9: 34.6, trem: [35.4, BEAT(64)], flip: BEAT(64),
  cardsOut: [37.5, 37.8], closeD: 37.7,
  pull: [37.8, 38.6], h8: 38.0, h8Land: BEAT(68), sil2: [38.3, 40.2], out: [39.98, 40.42], h8Out: [40.18, 40.42],
}

// ── the lines
const SSAG = `${SAG.glyph}︎ SAGITTARIUS`, SVIR = `${VIR.glyph}︎ VIRGO`
const LINES_A = [
  { t: T.l1, speaker: SVIR, color: VIR_T, text: 'did you hear *something?*' },
  { t: T.l2, speaker: SSAG, color: SAG_T, text: "it's fine! it's *nature!*" },
  { t: T.l3, speaker: SVIR, color: VIR_T, text: 'it bit my *point.*' },
  { t: T.l4, speaker: SSAG, color: SAG_T, text: "that's a *lot* of them." },
]
const LINES_B = [
  { t: T.l5, speaker: SSAG, color: SAG_T, text: 'wait. is it… *me?*' },
  { t: T.l6, speaker: SVIR, color: VIR_T, text: "no. it's the *bugs.*" },
]
const LINES_C = [
  { t: T.l7, speaker: SVIR, color: VIR_T, text: 'so. what do you *love* doing?' },
  { t: T.l8, speaker: SSAG, color: SAG_T, text: 'honestly? *this.* talking.' },
]
const LINES_D = [{ t: T.l9, speaker: SVIR, color: VIR_T, text: 'same answer. *no bugs.*' }]
const CPS = 28
export const LTA = lineTimes(LINES_A, { cps: CPS }), LTB = lineTimes(LINES_B, { cps: CPS }), LTC = lineTimes(LINES_C, { cps: CPS }), LTD = lineTimes(LINES_D, { cps: CPS })
const ALL = [LINES_A, LINES_B, LINES_C, LINES_D]
const HOPS = { sag: ALL.flatMap(L => talkHops(L, SSAG, { cps: CPS })), vir: ALL.flatMap(L => talkHops(L, SVIR, { cps: CPS })) }
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Change the *setting,* | not the person.', chip: 'NO BUGS ★', accentColor: GOLD, dim: 0.62 }

// ── where things are (world == screen at rest)
const LAWN = 1040
const MOON = [450, 600, 140]
const OAK = { x: 150 }
const PORCH = { x0: 600, x1: 1110, roof: 760, floor: 1270, door: [628, 748] }
const BLANKET = [300, 1300]
const SPOTS = {
  sag: [[210, 1185, 200], [150, 1230, 200], [480, 1215, 200]],
  vir: [[400, 1185, 200], [330, 1230, 200], [640, 1215, 200]],
}
const IN = { sag: [790, 1090, 185], vir: [960, 1090, 185] }
const PIS_TREE = [62, 1010, 96], PIS_SWING = [1050, 1080, 92]
const SEED = { sag: 4, vir: 9, pis: 23 }

const SAG_K = [
  [0, S_('wide', [0, -1], { blink: false })], [T.l2, S_('happy', [1, 0])], [T.dive + 0.3, S_('wide', [1, -1], { blink: false })], [T.slap1, S_('squint', [1, -1])],
  [T.slap2, S_('wide', [0, 0], { blink: false, sq: 0.08 })], [T.slap2 + 0.5, S_('squint', [0, 0])],
  [T.bite, S_('wide', [1, 0], { blink: false })], [T.itch[0], S_('neutral', [1, 0])],
  [T.swarm[0], S_('wide', [0, 1], { blink: false })], [T.l4 + 1.2, S_('wide', [0, -1], { blink: false })],
  [T.h4, S_('neutral', [1, 0])], [T.l5, S_('neutral', [0, 1], { blink: 0.35 })], [T.l6, S_('wide', [1, 0], { blink: false })], [T.l6 + 0.8, S_('happy', [1, 0])],
  [T.point, S_('wide', [1, 0], { blink: false })], [T.run[0], S_('squint', [1, 0])], [T.slam, S_('wide', [0, 0], { blink: false })], [T.slam + 0.6, S_('happy', [1, 0])],
  [T.l7, S_('sparkle', [1, 0])], [T.l8, S_('happy', [1, 0])], [T.hearts, S_('heart', [1, 0])],
  [T.lessonOut[0], S_('neutral', [1, -1])], [T.flip, S_('wide', [1, 0])], [T.flip + 0.4, S_('happy', [1, 0])],
  [T.pull[0], S_('heart', [1, 0])], [39.3, S_('happy', [1, 0])],
]
const VIR_K = [
  [0, S_('wide', [0, -1], { blink: false })], [T.l2, S_('squint', [-1, 0])], [T.dive + 0.3, S_('wide', [-1, -1], { blink: false })],
  [T.slap2, S_('eyeroll', [0, -1])], [T.slap2 + 0.8, S_('squint', [-1, 0])],
  [T.bite, S_('wide', [0, 0], { blink: false, sq: -0.06 })], [T.l3, S_('squint', [-1, 0])],
  [T.swarm[0], S_('wide', [0, 1], { blink: false })],
  [T.h4, S_('squint', [-1, 0])], [T.l5, S_('neutral', [-1, 0])], [T.l6, S_('happy', [-1, 0])],
  [T.point, S_('wide', [1, 0], { blink: false })], [T.run[0], S_('squint', [1, 0])], [T.slam, S_('wide', [0, 0], { blink: false })], [T.slam + 0.6, S_('happy', [-1, 0])],
  [T.l7, S_('sparkle', [-1, 0])], [T.l8 + 0.5, S_('heart', [-1, 0])],
  [T.lessonOut[0], S_('neutral', [-1, -1])], [T.flip, S_('wide', [-1, 0])], [T.flip + 0.4, S_('happy', [-1, 0])],
  [T.pull[0], S_('heart', [-1, 0])], [39.5, S_('happy', [-1, 0])],
]

// ── the mosquito (facing right; centre-anchored)
const MOSQ = [
  [
    '......WW..WW........',
    '.....WWWWWWWW.......',
    '......WWWWWW........',
    '....OOOO.OOO........',
    '..OOBBBBOHHHOO......',
    '.OBSBSBSBOHEHOPPPPPP',
    '..OOBBBBOOHHO.......',
    '....O.O..O.O........',
    '...O...O..O.O.......',
    '..O....O...O.O......',
    '.O.....O....O.O.....',
  ],
  [
    '....................',
    '....................',
    '....WWWWWWWWW.......',
    '....OOOOWWWOO.......',
    '..OOBBBBOHHHOO......',
    '.OBSBSBSBOHEHOPPPPPP',
    '..OOBBBBOOHHO.......',
    '....O.O..O.O........',
    '...O...O..O.O.......',
    '..O....O...O.O......',
    '.O.....O....O.O.....',
  ],
]
function mosquito(x, mx, my, px, t, { dir = 1, alpha = 1, sil = false, rot = 0, sad = false } = {}) {
  if (alpha <= 0.01) return
  const f = MOSQ[Math.floor(t * 30) % 2]
  const pal = sil ? { O: '#0a0610', B: '#0a0610', S: '#0a0610', H: '#0a0610', E: RED, P: '#0a0610', W: 'rgba(10,6,16,0.75)' }
    : { O: '#120a14', B: '#4a3a46', S: '#d8d0c0', H: '#5a4650', E: sad ? '#7fd3ff' : RED, P: '#2a2024', W: 'rgba(220,232,255,0.55)' }
  x.save(); x.globalAlpha *= alpha; x.translate(mx, my); x.rotate(rot); x.scale(dir, 1)
  bitmap(x, f, pal, -10 * px, -5.5 * px, px)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "italic 500 190px 'EB Garamond'", "italic 600 60px 'EB Garamond'", "500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 36px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const { ono, sparkleRing, tears } = makeFx(x)

  const H0 = popText(root, 'They come | at *dusk.*', { top: 172, size: 120, accentSize: 190, at: -2, late: 1, lateAt: -1, accentColor: RED })
  const H1 = popText(root, 'A first date. | *Outdoors.*', { top: 172, size: 100, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: RED })
  const H2 = popText(root, 'It *bites.*', { top: 196, size: 124, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: RED })
  const H3 = popText(root, 'It brought | *friends.*', { top: 172, size: 110, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: RED })
  const H4 = popText(root, 'Nowhere is *safe.*', { top: 196, size: 104, accentSize: 160, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: RED, fit: true })
  const H5 = popText(root, 'The final *escape.*', { top: 196, size: 104, accentSize: 160, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: GOLD, fit: true })
  const H6 = popText(root, 'Safe. | Finally *talking.*', { top: 172, size: 104, accentSize: 160, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: PINK, fit: true })
  const H7 = popText(root, 'Pick the place | *together.*', { top: 168, size: 96, accentSize: 150, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: LAV, fit: true })
  const H8 = popText(root, 'Fine. *Indoors.*', { top: 196, size: 116, accentSize: 176, at: T.h8, late: 1, lateAt: T.h8Land, wobble: true, gap: 0.12, accentColor: PINK, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out]]
  const box = (L, open, close) => dialogueBox(root, { lines: L, y: 1478, width: 960, height: 290, open, close, cps: CPS })
  const boxes = [box(LINES_A, -2.3, T.closeA), box(LINES_B, T.l5 - 0.24, T.closeB), box(LINES_C, T.l7 - 0.24, T.closeC), box(LINES_D, T.l9 - 0.24, T.closeD)]
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── camera
  const inside = t => t >= T.slam && t < T.pull[0]
  function cam(t) {
    let s = 1, fx = 540, fy = 1000
    s = 1 + 0.04 * ease.inOutQuad(prog(t, 0, 4.4))
    const kr = ease.inOutCubic(prog(t, T.run[0], T.slam)) * (1 - ease.inOutCubic(prog(t, T.pull[0], T.pull[1])))
    s = lerp(s, 1.7, kr); fx = lerp(fx, 870, kr); fy = lerp(fy, 1080, kr)
    if (t >= T.slam && t < T.pull[0]) s += 0.06 * ease.inOutQuad(prog(t, T.h6, T.closeC))
    const ks = win(t, T.swarm[0], T.h3Out[1], 0.4)
    s += 0.08 * ks; fy = lerp(fy, 1120, ks)
    s += 0.05 * bump(t, T.dive, 0.35) + 0.04 * bump(t, T.slap1, 0.25) + 0.05 * bump(t, T.slap2, 0.25) + 0.06 * bump(t, T.slam, 0.35)
    return { s, fx, fy }
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.dive, 7], [T.slap1, 6], [T.slap2, 9], [T.scare[0], 16], [T.slam, 12], ...T.bonks.map(b => [b, 3])]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }
  const worldK = t => 1 - ease.inCubic(prog(t, T.out[0] + 0.1, T.out[1]))

  // ── the yard
  function drawMoon(t) {
    const [mx, my, mr] = MOON
    const g = x.createRadialGradient(mx, my, mr * 0.8, mx, my, mr * 2.6); g.addColorStop(0, 'rgba(255,240,200,0.32)'); g.addColorStop(1, 'rgba(255,240,200,0)')
    x.fillStyle = g; x.fillRect(mx - mr * 2.6, my - mr * 2.6, mr * 5.2, mr * 5.2)
    const px = 10
    for (let j = -mr; j <= mr; j += px) { const hw = Math.sqrt(Math.max(0, mr * mr - j * j)); R(x, mx - hw, my + j, hw * 2, px, MOONC) }
    for (const [cx, cy, r] of [[-50, -40, 26], [40, 30, 34], [-20, 60, 18], [60, -60, 16]]) for (let j = -r; j <= r; j += px) { const hw = Math.sqrt(Math.max(0, r * r - j * j)); R(x, mx + cx - hw, my + cy + j, hw * 2, px, '#ddd2b4') }
    void t
  }
  function drawYard(t) {
    // the treeline + the lawn
    x.fillStyle = '#140c24'
    for (let i = 0; i < 24; i++) { const bx = i * 50 - 40, bh = 70 + ((i * 37) % 5) * 22; x.fillRect(bx, LAWN - bh, 56, bh) }
    const g = x.createLinearGradient(0, LAWN, 0, H + 200); g.addColorStop(0, '#24402e'); g.addColorStop(0.35, '#1a2e24'); g.addColorStop(1, '#0c1410')
    x.fillStyle = g; x.fillRect(-300, LAWN, W + 600, H + 400 - LAWN)
    for (let i = 0; i < 70; i++) { const px = (i * 137.3) % (W + 200) - 100, py = LAWN + 20 + (i * 59.1) % 760; R(x, px, py, 6, 14, i % 3 ? 'rgba(90,150,100,0.35)' : 'rgba(10,20,14,0.35)') }
    // a wooden fence on the far left
    for (let k = 0; k < 6; k++) R(x, -20 + k * 60, LAWN - 120, 48, 130, k % 2 ? '#3a2a30' : '#33242a')
    // the live oak
    R(x, OAK.x - 34, 760, 68, LAWN + 30 - 760, OUT); R(x, OAK.x - 26, 760, 52, LAWN + 26 - 760, '#3a2a2e')
    for (const [dx, dy, r] of [[-60, 720, 120], [70, 690, 130], [0, 640, 120], [150, 740, 100], [-130, 780, 90]]) {
      for (let j = -r; j <= r; j += 10) { const hw = Math.sqrt(Math.max(0, r * r - j * j)); R(x, OAK.x + dx - hw, dy + j, hw * 2, 10, '#16241c') }
    }
    // fireflies (a warm horror-movie cheat)
    for (let i = 0; i < 9; i++) { const a = Math.sin(t * 1.3 + i * 2.1); if (a > 0.3) R(x, 60 + (i * 113) % 520 + Math.sin(t * 0.7 + i) * 20, 900 + (i * 71) % 260, 6, 6, `rgba(220,255,140,${a})`) }
  }
  function drawBlanket(t) {
    const [bx, by] = BLANKET
    x.save(); x.translate(bx, by); x.scale(1, 0.32)
    for (let j = -260; j < 260; j += 40) for (let i = -300; i < 300; i += 40) { if (i * i / 90000 + j * j / 67600 > 1) continue; x.fillStyle = ((i + j) / 40) % 2 ? '#c8324a' : '#efe6d6'; x.fillRect(i, j, 40, 40) }
    x.restore()
    // the candle
    R(x, bx + 160, by - 50, 24, 44, '#efe6d6'); R(x, bx + 158, by - 8, 28, 8, OUT)
    const fl = 0.8 + 0.2 * Math.sin(t * 17)
    const g = x.createRadialGradient(bx + 172, by - 64, 0, bx + 172, by - 64, 90 * fl); g.addColorStop(0, 'rgba(255,200,100,0.45)'); g.addColorStop(1, 'rgba(255,200,100,0)')
    x.fillStyle = g; x.fillRect(bx + 80, by - 160, 190, 190)
    R(x, bx + 166, by - 70, 12, 16 * fl, '#ffd23f')
  }
  function drawPorchBack(t) {
    const { x0, x1, roof, floor } = PORCH
    // the house wall + the lit interior
    R(x, x0 - 10, roof - 10, x1 - x0 + 20, floor - roof + 30, OUT)
    const g = x.createLinearGradient(0, roof, 0, floor); g.addColorStop(0, '#5a3a2e'); g.addColorStop(1, '#3a2420')
    x.fillStyle = g; x.fillRect(x0, roof, x1 - x0, floor - roof)
    const gl = x.createRadialGradient(870, 860, 20, 870, 900, 420); gl.addColorStop(0, 'rgba(255,200,110,0.55)'); gl.addColorStop(1, 'rgba(255,200,110,0.05)')
    x.fillStyle = gl; x.fillRect(x0, roof, x1 - x0, floor - roof)
    // siding lines
    for (let y = roof + 30; y < floor; y += 34) R(x, x0, y, x1 - x0, 3, 'rgba(30,14,14,0.35)')
    // a lit window into the house
    R(x, 880, 860, 150, 120, OUT); R(x, 888, 868, 134, 104, '#ffcf6a'); R(x, 952, 868, 6, 104, OUT)
    // the porch light
    const pl = 0.85 + 0.15 * Math.sin(t * 5)
    R(x, 790, roof + 20, 30, 24, '#ffe08a')
    const g2 = x.createRadialGradient(805, roof + 40, 0, 805, roof + 40, 200); g2.addColorStop(0, `rgba(255,224,138,${0.4 * pl})`); g2.addColorStop(1, 'rgba(255,224,138,0)')
    x.fillStyle = g2; x.fillRect(605, roof - 160, 400, 400)
    // the ceiling fan
    const fa = t * 9
    R(x, 925, roof + 4, 8, 50, OUT)
    for (const k of [0, 1]) { const w = 130 * Math.abs(Math.cos(fa + k * Math.PI / 2)); R(x, 929 - w, roof + 52, w * 2, 10, '#5a3a2e') }
    R(x, 915, roof + 48, 28, 20, OUT)
    // the floor
    R(x, x0 - 10, floor, x1 - x0 + 20, 26, OUT); R(x, x0, floor + 4, x1 - x0, 16, '#8a5a3c')
    // a little table with two glasses of tea
    R(x, 860, floor - 100, 80, 14, OUT); R(x, 892, floor - 86, 16, 86, OUT)
    for (const dx of [866, 912]) { R(x, dx - 4, floor - 146, 30, 46, OUT); R(x, dx, floor - 142, 22, 40, '#c87a3a'); R(x, dx, floor - 142, 22, 10, '#f4dca0') }
    // the porch swing (Pisces' spot)
    R(x, 1000, roof + 10, 4, 260, '#2a1a1a'); R(x, 1096, roof + 10, 4, 260, '#2a1a1a'); R(x, 990, roof + 268, 120, 20, OUT); R(x, 994, roof + 270, 112, 14, '#8a5a3c')
  }
  function drawPorchFront(t, doorOpen) {
    const { x0, x1, roof, floor, door } = PORCH
    // the screen mesh over the porch (anyone inside shows through it)
    x.save(); x.fillStyle = 'rgba(200,210,230,0.12)'; x.fillRect(x0, roof + 70, x1 - x0, floor - roof - 70)
    x.fillStyle = 'rgba(30,24,40,0.18)'
    for (let y = roof + 70; y < floor; y += 8) x.fillRect(x0, y, x1 - x0, 1)
    for (let xx = x0; xx < x1; xx += 8) x.fillRect(xx, roof + 70, 1, floor - roof - 70)
    x.restore()
    // the frame: posts, the rail, the roof
    for (const px of [x0, door[1] + 4, 900, x1 - 14]) { R(x, px - 6, roof + 60, 24, floor - roof - 60, OUT); R(x, px, roof + 60, 12, floor - roof - 60, '#efe6d6') }
    R(x, x0 - 8, floor - 70, x1 - x0 + 16, 14, OUT); R(x, x0, floor - 66, x1 - x0, 6, '#efe6d6')
    // the screen door (swings open toward us)
    const dw = door[1] - door[0], sx = 1 - 0.85 * doorOpen
    x.save(); x.translate(door[0], 0); x.scale(sx, 1)
    R(x, -4, roof + 96, dw + 8, floor - roof - 96, OUT); x.fillStyle = 'rgba(200,210,230,0.18)'; x.fillRect(4, roof + 104, dw - 8, floor - roof - 112)
    R(x, 4, roof + 104, dw - 8, 10, '#efe6d6'); R(x, 4, (roof + floor) / 2 + 40, dw - 8, 10, '#efe6d6'); R(x, 4, floor - 18, dw - 8, 10, '#efe6d6')
    R(x, dw - 22, (roof + floor) / 2 + 10, 10, 18, GOLD)
    x.restore()
    // the roof
    for (let k = 0; k < 4; k++) { R(x, x0 - 40 + k * 10, roof - 40 + k * 26, x1 - x0 + 80 - k * 20, 30, OUT); R(x, x0 - 34 + k * 10, roof - 36 + k * 26, x1 - x0 + 68 - k * 20, 22, k % 2 ? '#3a2a40' : '#463252') }
    void t
  }

  // ── the cast
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1, scale = 1 } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    const col = id === 'sag' ? SAG.color : id === 'vir' ? VIR.color : PIS.color
    const g = glyph && sz >= 120 ? (id === 'sag' ? SAG.glyph : id === 'vir' ? VIR.glyph : null) : null
    return drawStarChar(x, px0, py0 + (st.dy || 0), sz * scale, t, { color: col, glyph: g, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id], pop, glow: 0.9, alpha })
  }
  function place(t, who) {
    const S = SPOTS[who], I = IN[who]
    const hop = (A, B, a, b, hgt = 120) => { const p = prog(t, a, b), e = ease.inOutCubic(p); return [lerp(A[0], B[0], e), lerp(A[1], B[1], e) - Math.sin(p * Math.PI) * hgt, lerp(A[2], B[2], e)] }
    if (t < T.hop1[0]) return S[0]
    if (t < T.hop2[0]) return hop(S[0], S[1], ...T.hop1)
    if (t < T.run[0]) return hop(S[1], S[2], ...T.hop2)
    if (t < T.pull[0]) {
      // the slow-motion run: across the lawn, through the door
      const p = prog(t, T.run[0], T.slam - 0.05), e = ease.inOutQuad(p)
      const bounce = Math.abs(Math.sin(p * Math.PI * 4)) * 50 * (1 - p)
      return [lerp(S[2][0], I[0], e), lerp(S[2][1], I[1], e) - bounce, lerp(S[2][2], I[2], e)]
    }
    return I
  }
  function drawDater(t, who, k) {
    const P = place(t, who), st = keyed(t, who === 'sag' ? SAG_K : VIR_K)
    const hops = [...HOPS[who], T.slam + 0.3, T.hearts, T.flip + 0.35, 38.6, 39.4]
    if (who === 'sag') hops.push(T.slap1, T.slap2)
    let sq = st.sq || 0
    if (who === 'vir') sq += 0.1 * Math.sin((t - T.bite) * 30) * Math.exp(-(t - T.bite) * 6) * (t > T.bite ? 1 : 0)
    const r = star(who, P, t, { ...st, sq }, { pop: k, hops })
    if (!r) return null
    // Virgo's bite bump (from the bite until the porch)
    if (who === 'vir' && t >= T.bite && t < T.lessonOut[0]) {
      const bk = pop01(t, T.bite, 0.25, 2.6)
      x.save(); x.translate(r.x + r.size * 0.36, r.y - r.size * 0.18); x.scale(bk, bk)
      R(x, -10, -10, 20, 20, OUT); R(x, -7, -7, 14, 14, '#ff6a7a'); R(x, -3, -5, 5, 4, '#ffc0c8')
      x.restore()
      if (inW(t, ...T.itch)) for (let i = 0; i < 3; i++) R(x, r.x + r.size * 0.45 + i * 12, r.y - r.size * 0.25 + Math.sin(t * 40 + i) * 8, 6, 14, BONE)
    }
    // Sagittarius' slapping hand-point: a little pale motion fan
    if (who === 'sag') for (const sl of [T.slap1, T.slap2]) {
      const a = t - sl
      if (a >= -0.12 && a < 0.2) { x.save(); x.globalAlpha = 1 - Math.abs(a) * 4; x.fillStyle = BONE; for (let i = 0; i < 3; i++) x.fillRect(r.x + (sl === T.slap2 ? -40 : 80) + i * 18, r.y - r.size * 0.4 - i * 22, 12, 40); x.restore() }
    }
    return r
  }
  function drawPisces(t, k) {
    const inPorch = t >= T.h5
    const P = inPorch ? PIS_SWING : PIS_TREE
    const st = inW(t, T.scare[0], T.scare[0] + 0.8) ? S_('wide', [0, 0], { blink: false }) : S_('sparkle', [inPorch ? -1 : 1, 0])
    const sw = inPorch ? Math.sin(t * 1.6) * 10 : 0
    const r = star('pis', [P[0] + sw, P[1], P[2]], t, st, { pop: k, hops: [T.scare[0], T.slam, T.hearts, T.flip], glyph: false })
    if (!r) return
    drawTissue(x, r.x + (inPorch ? -1 : 1) * r.size * 0.45, r.y + r.size * 0.25, 3, t)
    for (const [a, b] of [[0.3, 4.0], [T.scare[0], T.scare[1] + 0.8], [T.l8, T.closeC], [T.flip, T.flip + 1], [T.h8, T.out[0]]]) tears(r.x, r.y, r.size, t, a, b, { gap: 0.11, spread: 0.6, life: 0.45 })
  }
  // the mosquito(es)
  function hero(t) {
    // where the lead mosquito is
    if (t < T.dive - 0.4) return { mx: 610 + Math.sin(t * 1.3) * 60, my: 520 + Math.sin(t * 2.1) * 30, px: 10, dir: -1 }
    if (t < T.swarm[0]) {
      const tgt = t < T.bite ? place(t, 'sag') : place(t, 'vir')
      const p = ease.outCubic(prog(t, T.dive - 0.4, T.dive + 0.2))
      const mx = lerp(610, tgt[0] + 40 * Math.sin(t * 7.3), p), my = lerp(520, tgt[1] - 160 + 30 * Math.sin(t * 9.1), p)
      const dodge = (t - T.slap1 > 0 && t - T.slap1 < 0.4) || (t - T.slap2 > 0 && t - T.slap2 < 0.4) ? 120 : 0
      return { mx: mx + dodge, my: my - dodge * 0.5, px: 10, dir: Math.cos(t * 7.3) > 0 ? -1 : 1 }
    }
    if (t < T.slam) {
      const tgt = place(t, 'vir')
      return { mx: tgt[0] + 90 + 50 * Math.sin(t * 6.1), my: tgt[1] - 190 + 30 * Math.sin(t * 8.3), px: 10, dir: -1 }
    }
    if (t < T.pull[0]) {
      // pressed flat against the screen
      const p = ease.outBack(prog(t, T.press, T.press + 0.4))
      if (t < T.press) return { mx: 560 + 30 * Math.sin(t * 5), my: 1000 + 20 * Math.sin(t * 7), px: 10, dir: 1 }
      return { mx: lerp(560, 660, p), my: 990, px: lerp(10, 12, p), dir: 1, sad: t >= T.sigh }
    }
    return { mx: 560, my: 1000, px: 10, dir: 1, sad: true }
  }
  const SW = Array.from({ length: 11 }, (_, i) => ({ ph: i * 1.7, r: 70 + (i % 4) * 38, sp: 2.6 + (i % 3) * 0.8, ox: ((i * 53) % 7) * 18 - 60 }))
  function drawSwarm(t, k) {
    if (t < T.swarm[0] || t >= T.bonks[2] + 0.3 || k <= 0.01) return
    const rise = ease.outCubic(prog(t, ...T.swarm))
    const c = t < T.run[0] ? place(t, 'vir') : t < T.slam ? place(t, 'sag') : [PORCH.door[0] - 40, 1080, 0]
    SW.forEach((m, i) => {
      const bx = c[0] - 40 + m.ox + Math.cos(t * m.sp + m.ph) * m.r * (t < T.slam ? 1 : 0.4)
      const by = lerp(LAWN + 260, c[1] - 200, rise) + Math.sin(t * m.sp * 1.3 + m.ph) * m.r * 0.5
      const afterSlam = t >= T.slam ? clamp(1 - (t - T.bonks[0]) / 0.8) : 1
      mosquito(x, bx, by, 6, t + i * 0.37, { dir: Math.cos(t * m.sp + m.ph) > 0 ? -1 : 1, alpha: clamp(rise * 2) * k * afterSlam })
    })
  }

  // ── the jump scare (screen space)
  function drawScare(t) {
    if (!inW(t, ...T.scare)) return
    const p = prog(t, ...T.scare), k = p < 0.15 ? ease.outBack(p / 0.15) : 1 - ease.inCubic(prog(p, 0.65, 1))
    x.save()
    x.fillStyle = `rgba(160,10,24,${0.75 * (1 - p)})`; x.fillRect(0, 0, W, H)
    x.translate(540 + Math.sin(t * 80) * 10, 980); x.scale(k, k)
    mosquito(x, 0, 0, 52, t, { dir: -1 })
    x.restore()
  }
  function drawHorrorChrome(t, inPorch) {
    // flicker + a heavy vignette outside; lighter inside
    const fl = (Math.sin(t * 61.3) * Math.sin(t * 17.9)) > 0.86 ? 0.12 : 0
    const v = inPorch ? 0.45 : 0.72
    const g = x.createRadialGradient(540, 1000, 380, 540, 1000, 1150); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(6,2,10,${v})`)
    x.fillStyle = g; x.fillRect(0, 0, W, H)
    if (fl) { x.fillStyle = `rgba(0,0,0,${fl})`; x.fillRect(0, 0, W, H) }
    // the slow-mo run letterbox
    const kb = win(t, T.run[0] - 0.1, T.slam + 0.3, 0.25)
    if (kb > 0) { x.fillStyle = 'rgba(4,2,10,0.95)'; x.fillRect(0, 0, W, 130 * kb); x.fillRect(0, H - 130 * kb, W, 130 * kb) }
    if (inW(t, T.run[0], T.slam)) ono('SLOW MOTION', 540, 1440, t, T.run[0] + 0.1, { size: 34, life: 1.4, rise: 0, ticks: false, color: 'rgba(239,230,214,0.8)' })
  }

  // ── the tie-in
  const TALK_AT = { x: 540, y: 760, w: 400 }, ANS_W = 182
  const ANS = [{ x: 388, y: 1260, from: 'sag', tp: T.playA, rot: -0.06 }, { x: 692, y: 1260, from: 'vir', tp: T.playB, rot: 0.06 }]
  function drawTie(t, toScreen) {
    if (t < T.tie[0] || t >= T.cardsOut[1]) return
    const o = ease.inCubic(prog(t, ...T.cardsOut))
    x.fillStyle = rgba('#07041a', 0.55 * ease.outCubic(prog(t, ...T.tie)) * (1 - o)); x.fillRect(0, 0, W, H)
    const tp = easeOutBack(prog(t, ...T.talk), 1.6)
    drawTalkCard(x, TALK_AT.x, TALK_AT.y - o * 800, TALK_AT.w * clamp(tp, 0, 1.2), 'Where do we | *talk* best?', { rot: (1 - clamp(tp)) * -0.4, alpha: clamp(tp * 3) * (1 - o) })
    ANS.forEach((C, i) => {
      if (t < C.tp) return
      const S0 = toScreen(place(t, C.from)), p = prog(t, C.tp, C.tp + 0.36), e = ease.outCubic(p)
      const tr = prog(t, ...T.trem), jit = tr > 0 && tr < 1 ? 2 + tr * 6 : 0
      const cx = lerp(S0[0], C.x, e) + jit * Math.sin(t * 61 + i * 2), cy = lerp(S0[1] - 60, C.y, e) - Math.sin(Math.PI * p) * 80 + o * 900
      const rot = lerp(i ? 0.8 : -0.8, C.rot, e)
      const f = prog(t, T.flip, T.flip + 0.22), sx = Math.cos(f * Math.PI)
      if (sx > 0) drawCardBack(x, cx, cy, ANS_W, { rot, sx, alpha: clamp(p * 4) })
      else drawAnswerCard(x, cx, cy, ANS_W, 'The | porch.', { rot, sx: -sx, stampK: prog(t, T.flip + 0.3 + i * 0.1, T.flip + 0.55 + i * 0.1) })
      if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, T.flip + 0.1, 10, 170, 1 + i, 0.7)
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t), wk = worldK(t), k = popOut(t, T.out)
        const toScreen = P => [540 + (P[0] - C.fx) * C.s, 1000 + (P[1] - C.fy) * C.s]
        x.save(); x.globalAlpha = wk
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        drawMoon(t)
        // the silhouette crossing the moon (frame 0, and again at the end)
        for (const [a, b, d] of [[T.sil[0], T.sil[1], 1], [T.sil2[0], T.sil2[1], 1]]) {
          if (!inW(t, a, b)) continue
          const p = prog(t, a, b)
          mosquito(x, lerp(MOON[0] + 260, MOON[0] - 260, p), MOON[1] + 20 + Math.sin(p * 9) * 18, 14, t, { dir: -d, sil: true })
        }
        drawYard(t)
        drawPorchBack(t)
        drawPisces(t, k)
        const inP = inside(t) || t >= T.pull[0]
        if (inP) { drawDater(t, 'sag', k); drawDater(t, 'vir', k) }
        const doorOpen = ease.outCubic(prog(t, T.run[1] - 0.5, T.run[1] - 0.25)) * (1 - ease.inCubic(prog(t, T.slam - 0.06, T.slam)))
        drawPorchFront(t, doorOpen)
        if (!inP) {
          drawBlanket(t)
          drawDater(t, 'sag', k); drawDater(t, 'vir', k)
        } else if (t < T.lessonOut[0] || t >= T.pull[0]) {
          // the blanket left behind on the lawn
          drawBlanket(t)
        }
        drawSwarm(t, k)
        const hm = hero(t)
        if (t >= T.dive - 1.2) mosquito(x, hm.mx, hm.my, hm.px, t, { dir: hm.dir, sad: hm.sad, alpha: clamp(k) })
        else if (t >= 2.6) mosquito(x, hm.mx, hm.my, hm.px, t, { dir: hm.dir, alpha: ease.outCubic(prog(t, 2.6, 3.2)) })
        // onomatopoeia
        ono('bzzzzz…', 640, 470, t, 1.8, { size: 40, life: 1.6, rise: 20, ticks: false, color: 'rgba(239,230,214,0.85)' })
        ono('BZZZZT!', hm.mx, hm.my - 90, t, T.dive, { size: 58, life: 0.9, rise: 24, color: RED })
        ono('*SLAP*', place(t, 'sag')[0] + 90, place(t, 'sag')[1] - 220, t, T.slap1, { size: 50, life: 0.7, rise: 16, color: '#ffd0a0' })
        ono('*SLAP*', place(t, 'sag')[0] - 40, place(t, 'sag')[1] - 230, t, T.slap2, { size: 56, life: 0.8, rise: 16, color: '#ffd0a0', rot: -0.1 })
        ono('*ow.*', place(t, 'sag')[0], place(t, 'sag')[1] - 150, t, T.slap2 + 0.35, { size: 40, life: 0.7, rise: 12 })
        ono('*bite*', place(t, 'vir')[0] + 90, place(t, 'vir')[1] - 160, t, T.bite, { size: 46, life: 0.8, rise: 16, color: RED })
        ono('*itch itch*', place(t, 'vir')[0] + 30, place(t, 'vir')[1] - 220, t, T.itch[0], { size: 40, life: 1.0, rise: 16 })
        ono('!', place(t, 'vir')[0] + 60, place(t, 'vir')[1] - 230, t, T.point, { size: 64, life: 0.6, rise: 10, ticks: false, color: GOLD })
        ono('*SLAM*', PORCH.door[0] + 60, PORCH.roof + 80, t, T.slam, { size: 54, life: 0.8, rise: 14, color: '#ffd0a0' })
        T.bonks.forEach((b, i) => ono('bonk', PORCH.door[0] - 50 + i * 26, 980 - i * 40, t, b, { size: 34, life: 0.5, rise: 10, ticks: false }))
        ono('*sigh*', hm.mx, hm.my - 80, t, T.sigh, { size: 38, life: 1.0, rise: 16, ticks: false, color: SKYBLUE })
        if (t >= T.hearts && t < T.lessonOut[0]) {
          const hk = pop01(t, T.hearts, 0.3, 2.4) * (1 - ease.inQuad(prog(t, T.lesson, T.lesson + 0.3)))
          if (hk > 0.02) { x.save(); x.translate(882, 990 - 6 * Math.sin(t * 3)); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 7); x.restore() }
        }
        if (t >= 38.7) {
          const hk = pop01(t, 38.7, 0.34, 2.4) * popOut(t, T.out)
          if (hk > 0.02) { x.save(); x.translate(882, 990 - 8 * Math.sin((t - 38.7) * 3)); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 8); x.restore() }
        }
        x.restore()
        drawHorrorChrome(t, inside(t))
        drawTie(t, toScreen)
        drawScare(t)
        if (t >= T.slam + 0.3 && t < T.slam + 1.0) sparkleRing(t, 870, 1050, T.slam + 0.3, 12, 300, 0.6)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      for (const b of boxes) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// the one card transition: the jump scare → "Nowhere is safe."
export const CUTS = [T.cut]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const { N, FX } = SND
const buzzing = (t0, len, g = 0.012, f = 220) => { const out = []; for (let t = t0; t < t0 + len; t += 0.25) out.push(['chip', +t.toFixed(3), f * (1 + 0.03 * Math.sin(t * 7)), 0.26, { ...FX, wave: 'square', duty: 0.12, vib: 0.04, gain: g, decay: 0.02, sustain: 1 }]); return out }
const sting = (t, g = 0.06) => [['boom', +t.toFixed(3), g], ['chip', +t.toFixed(3), 466.16, 0.8, { ...FX, wave: 'square', duty: 0.12, gain: 0.03, decay: 0.5, sustain: 0.4, vib: 0.03 }], ['chip', +t.toFixed(3), 493.88, 0.8, { ...FX, wave: 'square', duty: 0.12, gain: 0.03, decay: 0.5, sustain: 0.4, vib: 0.03 }], ['whoosh', +(t - 0.05).toFixed(3), 0.3, 0.06]]
const slap = t => [['clap', +t.toFixed(3), { ...FX, gain: 0.14 }], ['tick', +t.toFixed(3), 0.07]]
const PITCH = { [SSAG]: 820, [SVIR]: 1050 }
const CUES_ = [
  ['busFx', 'sfx', { gain: 25 }],
  ...buzzing(0, 4.2, 0.008, 210),
  ...SND.sob(0.6, N.E6), ...SND.sob(2.4, N.D6),
  // 2 · outdoors: the dive, two slaps
  ...SND.head(T.h1, 3, T.h1Land, 2), ...sting(T.dive, 0.05), ...buzzing(T.dive, 3.6, 0.012, 260),
  ...slap(T.slap1), ['whoosh', T.slap1 + 0.05, 0.3, 0.04], ...slap(T.slap2), ...SND.womp(T.slap2 + 0.3),
  // 3 · it bites
  ...SND.head(T.h2, 1, T.h2Land, 3), ['pop', T.bite, N.E6, 0.05, 0.2], ...sting(T.bite + 0.02, 0.03),
  ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.itch[0] + i * 0.16).toFixed(3), 0.04]),
  // 4 · friends, the jump scare
  ...SND.head(T.h3, 2, T.h3Land, 1), ['swell', T.swarm[0], T.swarm[1] + 0.6, { bus: 'sfx', gain: 0.04, f0: 200, f1: 900 }], ...buzzing(T.swarm[0], 2.3, 0.016, 300), ...buzzing(T.swarm[0] + 0.1, 2.2, 0.012, 330),
  ...sting(T.scare[0], 0.1), ['chip', T.scare[0], 880, 0.5, { ...FX, wave: 'square', duty: 0.12, slide: 12, gain: 0.04, decay: 0.3, sustain: 0.6 }], ...SND.sob(T.scare[0] + 0.2, N.E6),
  // 5 · nowhere is safe: two hops, the swarm follows
  ...SND.head(T.h4, 2, T.h4Land, 0), ...[T.hop1, T.hop2].flatMap(h => [['whoosh', h[0], 0.3, 0.04], ...SND.thud(h[1], 0.08, 150)]), ...buzzing(T.h4, 4.0, 0.01, 280),
  // 6 · the escape: slow motion, SLAM, bonks
  ...SND.head(T.h5, 2, T.h5Land, 3), ['pop', T.point, N.A5, 0.04, 0.3],
  ['swell', T.run[0], T.slam, { bus: 'sfx', gain: 0.05, f0: 300, f1: 2000 }], ...buzzing(T.run[0], 1.6, 0.016, 240),
  ['whoosh', T.run[1] - 0.5, 0.3, 0.05], ...SND.thud(T.slam, 0.24, 90), ['boom', T.slam, 0.06], ['clap', T.slam + 0.005, { ...FX, gain: 0.12 }],
  ...T.bonks.map((b, i) => ['pop', b, [N.B5, N.A5, N.Fs5][i], 0.035, 0.2]),
  // 7 · safe; finally talking (the breakdown)
  ...SND.head(T.h6, 3, T.h6Land, 2), ['bell', T.h6Land, N.A5, 0.035, 1.6, 0],
  ['tick', T.press + 0.3, 0.05], ['chip', T.sigh, 392, 0.7, { ...FX, wave: 'tri', slide: -5, gain: 0.022, decay: 0.4, sustain: 0.5 }],
  ['pop', T.hearts, N.A5, 0.04, 0], ['bell', T.hearts + 0.02, N.E6, 0.03, 1.2, 0], ...SND.sob(T.hearts + 0.2, N.E6),
  // 8 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 9 · talk cards
  ...SND.head(T.h7, 3, T.h7Land, 2),
  ['whoosh', T.talk[0], 0.4, 0.05], ['bell', T.talk[1], N.E6, 0.03, 1.2, 0],
  ['whoosh', T.playA, 0.25, 0.04], ['tick', T.playA + 0.36, 0.06], ['whoosh', T.playB, 0.25, 0.04], ['tick', T.playB + 0.36, 0.06],
  ['tick', T.flip, 0.08], ['bell', T.flip + 0.1, N.A5, 0.04, 1.6, -0.2], ['bell', T.flip + 0.1, N.E6, 0.03, 1.6, 0.2], ['glitter', T.flip, T.flip + 0.6],
  ['pop', T.flip + 0.3, N.D6, 0.04, -0.3], ['pop', T.flip + 0.4, N.E6, 0.04, 0.3], ['whoosh', T.cardsOut[0], 0.3, 0.035],
  // 10 · fine. indoors.
  ['whoosh', T.pull[0], 0.6, 0.05], ...SND.head(T.h8, 1, T.h8Land, 0), ...buzzing(T.sil2[0], 1.6, 0.006, 210),
  ['pop', 38.7, N.A5, 0.04, 0], ['bell', 38.72, N.E6, 0.03, 1.2, 0], ...SND.sob(38.9, N.D6),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES_A, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_B, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_C, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_D, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CUES = CUES_.filter(c => typeof c[1] !== 'number' || c[1] >= 0)
