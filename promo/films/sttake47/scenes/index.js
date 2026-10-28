// sttake47 — "Take 47." (60 s vertical Align ad, Star Talk season 3 #18, music: jazzy, F). Story 0–55.6, then the shared end card.
// A film set floating in the nebula: a café table under a spotlight, a film camera, ♍ VIRGO directing (beret, megaphone,
// a script on a clipboard), ♊ GEMINI playing "you" (an enthusiastic, terrible actor), ♉ TAURUS playing "your date" (bored,
// a napkin tucked in, eating a donut), ♓ PISCES on the boom mic (moved by everything). The lounge jazz plays on every
// "ACTION!" and dies on every "CUT."
//   0.0–4.5    "Your first date. | Take *47.*"  The slate is already up: CLACK. VIRGO: "Okay people, from the top. AGAIN." (all sag)
//   4.5–10.9   "Take 47: | the *interview.*"  ACTION! (the band drops in). GEMINI leans in, chin on point: "So… what do you do?"
//              Taurus chews. Munch. Munch. CUT. VIRGO: "It's a date. Not a job interview."
//  10.92       card cut.
//  10.9–17.4   "Take 48: | the *overshare.*"  GEMINI: "So my ex, right? Long story—" Taurus stops chewing. Pisces sobs, the
//              boom sinks into the shot… BONK on Gemini's head. CUT. CUT. CUT! VIRGO: "We SAID no exes."
//  17.4–23.9   "Take 49: | the *mystery.*"  Shades on, leaning back on two chair legs: "I'm… not like other stars." Leans…
//              leans… the music winds down as the chair tips, and Gemini goes over, out of frame: CRASH! Taurus keeps chewing.
//              VIRGO: "Absolutely not." A synced eye-roll (Virgo + Taurus). Gemini climbs back in, shades askew.
//  23.93       card cut.
//  23.9–27.4   "Take 50. | Take 51. | Take *63.*"  The slate claps faster and faster; Gemini cycles costumes (a rose, a top hat,
//              a mustache, a monocle, a bow tie…), tiny CUT!s, the candle melts down to a stub.
//  27.4–34.2   "Director's *note.*"  The music stops dead. The megaphone slips: CLANG. Virgo sinks, the beret slides over its
//              eyes, the spotlight dims, crickets. VIRGO: "You can't script a first date." It rips the script off the
//              clipboard; Pisces pats it with the boom. "…but you can bring a better question." Under the script: a talk card,
//              glowing. Virgo perks up and flicks it to Gemini.
//  34.3        card cut.
//  34.3–46.3   "Take 64: | a real *question.*"  The real talk card, big: GEMINI reads it: "Planned date or spontaneous date?"
//              Silence. Taurus stops chewing… and DROPS THE DONUT (the band kicks in, the candle flares into a heart).
//              TAURUS (its first words in 64 takes): "Planned. Obviously. Let me explain."  "Nobody's *acting.*"
//              GEMINI: "Wait. Why planned?" They chat, hopping. Virgo raises the megaphone to call cut… lowers it.
//              VIRGO: "…keep rolling."  Pisces bawls behind the boom.
//  46.58       card cut.
//  46.7–51.2   ★ LESSON UNLOCKED: "Don't perform. | Be *curious.*"  +1 NATURAL
//  51.2–55.5   "Skip the script. | Play a *card.*"  A hand of talk cards fans in. VIRGO: "That's a wrap. Go be yourself."
//              All pops out by 55.5; the end card takes over at 55.6.
// One canvas (sky + the set through a camera that pushes in on every take, then screen-space slate/bursts/cards), DOM
// headlines + dialogue boxes + the shared lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, cellToWorld, beretCells, shadesCells, bibCells, costumeCells, tearsCells, drawSlate, drawMegaphone, drawClipboard, drawPageHalf,
  drawDonut, drawTable, drawCandle, drawChair, drawBoom, drawFilmCamera, drawSpotlight, drawBurst, drawBubble, INK } from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff4a5e', CYAN = '#7fe0ff'
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)  // 108 bpm grid
const VIRGO = signStar('virgo'), GEMINI = signStar('gemini'), TAURUS = signStar('taurus'), PISCES = signStar('pisces')

// ── the timeline
const MT = [0, 0.42, 0.8, 1.13, 1.42, 1.67, 1.88, 2.06, 2.22, 2.36, 2.49, 2.61, 2.72, 2.82].map(d => +(24.0 + d).toFixed(3))   // takes 50 → 63
export const T = {
  black: [0, 0.3],
  h0: 0.12, h0Land: 0.78, h0Out: [4.3, 4.5],
  l1: 1.3, sag: 2.62, closeA: 4.42,
  action1: BEAT(7),                                                       // 4.489: the band drops in
  h1: 4.62, h1Land: 4.98, h1Out: [10.55, 10.75],
  l2: 5.0, cut1: 7.3, l3: 7.6, closeB: 10.62,
  c1: 10.92,
  h2: 11.0, h2Land: 11.35, h2Out: [17.2, 17.4],
  action2: BEAT(20),                                                      // 11.711
  l4: 12.05, freeze2: 12.85, sob: 13.3, dip: [13.42, 14.1], bonk: 14.12, cutA: 14.35, cutB: 14.6, cutC: 14.85,
  l5: 15.15, unDip: [15.8, 16.4], closeC: 17.27,
  c2: 17.45,
  h3: 17.52, h3Land: 17.87, h3Out: [23.65, 23.85],
  action3: BEAT(32),                                                      // 18.378
  shades: 18.55, lean1: [18.6, 19.0], l6: 19.0, lean2: [20.35, 21.05], tip: [21.08, 21.45], crash: 21.52,
  l7: 21.8, roll: [22.12, 23.0], back: [22.95, 23.4], closeD: 23.86,
  c3: BEAT(42),                                                           // 23.933: the band is back for the montage
  mont: [24.0, 27.3], h4: 24.0, h4Land: MT[MT.length - 1], h4Out: [27.22, 27.42], melt: [24.0, 27.0],
  c4: 27.45,
  stop: 27.3, h5: 27.5, h5Land: 27.85, h5Out: [34.0, 34.2],
  slip: 27.42, clang: 27.78, sink: [27.5, 28.1], beret: [27.8, 28.45], dim: [27.35, 28.0], crk: [28.2, 29.85],
  l8: 28.6, board: [29.15, 29.55], rip: 30.0, pat: [30.3, 31.35], l9: 31.3, piano: BEAT(55), glow: 31.95, perk: [32.55, 32.95],
  flick: [33.15, 33.75], closeE: 34.15,
  c5: 34.3,
  h6: 34.38, h6Land: 34.73, h6Out: [38.48, 38.68],
  action4: 35.05, ins: [35.2, 35.6], insOut: [37.7, 38.1],
  l10: 35.5, freeze: 36.55, hush: 36.75, drop: BEAT(68),                  // 38.378: the donut drops, the band kicks in
  l11: 38.62, h7: 38.75, h7Land: 39.1, h7Out: [46.15, 46.35],
  c6: 38.7,
  l12: 41.82, chat: [42.75, 55.0], mega: [43.15, 43.55], megaDown: [44.05, 44.6], l13: 44.2, wail: 44.75, closeF: 46.25,
  c7: 46.58, lesson: BEAT(83), lessonOut: [50.95, 51.15],                 // 46.711
  c8: 51.18,
  h8: 51.22, h8Land: 51.6, fan: [51.25, 51.8], l14: 51.85, closeG: 54.98, h8Out: [55.05, 55.3],
  out: [55.05, 55.5],
}
const SLATES = [
  { take: '47', in: -1, clap: 0.6, out: [1.12, 1.45] },
  { take: '48', in: 10.97, clap: 11.42, out: [11.52, 11.85] },
  { take: '49', in: 17.5, clap: 17.92, out: [18.05, 18.38] },
  { take: '64', in: 34.35, clap: 34.77, out: [34.9, 35.22] },
]
const COSTUMES = ['rose', 'tophat', 'mustache', 'monocle', 'bowtie', 'shades']
const MCUTS = [1, 3, 5, 7, 9, 11, 13]                                     // montage takes that get a tiny "CUT!"
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Don’t perform. | Be *curious.*', chip: '+1 NATURAL' }

// ── the lines
const VIR = `${VIRGO.glyph}︎ VIRGO · DIRECTOR`, GEM = `${GEMINI.glyph}︎ GEMINI (AS YOU)`, TAU = `${TAURUS.glyph}︎ TAURUS (AS YOUR DATE)`
const VIR_T = '#ff9ec4', GEM_T = '#ffe066', TAU_T = '#ffb86b'
const LINES = {
  A: [{ t: T.l1, speaker: VIR, color: VIR_T, text: 'Okay people, from the top. *AGAIN.*' }],
  B: [{ t: T.l2, speaker: GEM, color: GEM_T, text: 'So… what do you *do?*' }, { t: T.l3, speaker: VIR, color: VIR_T, text: 'It’s a date. Not a *job interview.*' }],
  C: [{ t: T.l4, speaker: GEM, color: GEM_T, text: 'So my ex, right? *Long story—*' }, { t: T.l5, speaker: VIR, color: VIR_T, text: 'We SAID no *exes.*' }],
  D: [{ t: T.l6, speaker: GEM, color: GEM_T, text: 'I’m… not like other *stars.*' }, { t: T.l7, speaker: VIR, color: VIR_T, text: 'Absolutely *not.*' }],
  E: [{ t: T.l8, speaker: VIR, color: VIR_T, text: 'You can’t script a first *date.*' }, { t: T.l9, speaker: VIR, color: VIR_T, text: '…but you can bring a better *question.*' }],
  F: [{ t: T.l10, speaker: GEM, color: GEM_T, text: 'Planned date or spontaneous *date?*' }, { t: T.l11, speaker: TAU, color: TAU_T, text: 'Planned. Obviously. Let me *explain.*' },
    { t: T.l12, speaker: GEM, color: GEM_T, text: 'Wait. Why *planned?*' }, { t: T.l13, speaker: VIR, color: VIR_T, text: '…keep *rolling.*' }],
  G: [{ t: T.l14, speaker: VIR, color: VIR_T, text: 'That’s a wrap. Go be *yourself.*' }],
}
const BOXES = [['A', T.closeA], ['B', T.closeB], ['C', T.closeC], ['D', T.closeD], ['E', T.closeE], ['F', T.closeF], ['G', T.closeG]]
const ALL = Object.values(LINES).flat()
const CPS = 28
const ALL_LT = lineTimes(ALL, { cps: CPS })
export const LINE_CHECK = BOXES.map(([k, close]) => ({ k, close, lines: LINES[k].map(L => ({ text: L.text, t: L.t, done: ALL_LT[ALL.indexOf(L)].done })) }))
const CHAT_T = Array.from({ length: 22 }, (_, i) => +(T.chat[0] + i * 0.56).toFixed(3)).filter(t => t < T.chat[1])
const VIR_HOPS = [...talkHops(ALL, VIR, { cps: CPS }), T.action1 - 0.05, T.cut1 - 0.05, T.cutA - 0.05, T.cutB - 0.05, T.cutC - 0.05, T.action2 - 0.05, T.action3 - 0.05, ...MCUTS.map(i => MT[i] - 0.04), T.perk[0]]
const GEM_HOPS = [...talkHops(ALL, GEM, { cps: CPS }), ...MT, T.back[1] - 0.05, ...CHAT_T.filter((_, i) => i % 2 === 1)]
const TAU_HOPS = [...talkHops(ALL, TAU, { cps: CPS }), T.drop + 0.4, ...CHAT_T.filter((_, i) => i % 2 === 0)]

// ── easing helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const io = (t, a, b) => ease.inOutCubic(prog(t, a, b))

// ── geometry (world = screen at camera zoom 1)
const FLOOR = 1262
const GEM_AT = { x: 312, y: 1032, s: 252 }, TAU_AT = { x: 768, y: 1032, s: 252 }
const VIR_AT = { x: 196, y: 1344, s: 216 }, PIS_AT = { x: 158, y: 612, s: 144 }
const TABLE = { x: 540, top: 1094, w: 300 }, CANDLE = { x: 606, y: 1092 }
const CAM = { x: 905, y: 1338 }, SPOT = { x: 540, y: 470 }
const PIVOT = { x: 236, y: FLOOR }                                        // Gemini's chair tips on its back legs
const MIC0 = [528, 812]
const PUSH = { x: 540, y: 1030 }
const SLATE_AT = { x: 540, y: 760 }
const BELL = [352, 1258]                                                  // where the megaphone's bell sits (world, at rest)

// rolling: ACTION → CUT (the camera pushes in, the reels spin, the tally blinks)
const ROLL = [[T.action1, T.cut1], [T.action2, T.cutA], [T.action3, T.tip[0] + 0.25], [T.mont[0], T.stop], [T.action4, STORY_END]]
const PUSHES = ROLL.slice(0, 3)
const pushK = t => PUSHES.reduce((m, [a, b]) => Math.max(m, io(t, a - 0.05, a + 0.5) * (1 - io(t, b, b + 0.45))), 0)
const spinAt = t => ROLL.reduce((s, [a, b]) => s + clamp(t - a, 0, b - a), 0) * 7
const rolling = t => ROLL.some(([a, b]) => inR(t, a, b))

// ── the bursts (megaphone shouts, screen space)
const BURSTS = [
  { t: T.action1, text: 'ACTION!', to: [560, 1236], size: 118, fill: '#ffd95a', rot: -0.06, d: 0.85 },
  { t: T.cut1, text: 'CUT.', to: [560, 1236], size: 134, fill: RED, rot: -0.05, d: 0.9 },
  { t: T.action2, text: 'ACTION!', to: [560, 1236], size: 118, fill: '#ffd95a', rot: -0.06, d: 0.85 },
  { t: T.cutA, text: 'CUT.', to: [470, 1250], size: 100, fill: RED, rot: -0.1, d: 0.26 },
  { t: T.cutB, text: 'CUT.', to: [620, 1222], size: 118, fill: RED, rot: 0.06, d: 0.26 },
  { t: T.cutC, text: 'CUT!', to: [550, 1196], size: 156, fill: RED, rot: -0.05, d: 1.0 },
  { t: T.action3, text: 'ACTION!', to: [560, 1236], size: 118, fill: '#ffd95a', rot: -0.06, d: 0.85 },
  ...MCUTS.map((i, k) => ({ t: MT[i] + 0.02, text: 'CUT!', to: [k % 2 ? 700 : 430, 1240 - (k % 3) * 22], size: 74, fill: RED, rot: k % 2 ? 0.08 : -0.08, d: 0.3 })),
  { t: T.action4, text: '…action.', to: [560, 1244], size: 70, fill: BONE, rot: -0.03, d: 1.2, weight: 700 },
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 70px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "700 112px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [i6, i2, i4] = await Promise.all(['card-talk-6.png', 'card-talk-2.png', 'card-talk-4.png'].map(loadImg))
  const CARD = bake(i6, 560), CARD2 = bake(i2, 360), CARD4 = bake(i4, 360)
  const BODY = 610 / 732                                                  // opaque card body / png width

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HP = (txt, o) => popText(root, txt, { wobble: true, lineHeight: 1.0, accentColor: GOLD, ...o })
  const HEADS = [
    [HP('Your first date. | Take *47.*', { top: 118, size: 98, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, gap: 0.08 }), T.h0Out],
    [HP('Take 47: | the *interview.*', { top: 122, size: 96, accentSize: 140, at: T.h1, late: 1, lateAt: T.h1Land, accentColor: PINK }), T.h1Out],
    [HP('Take 48: | the *overshare.*', { top: 122, size: 96, accentSize: 140, at: T.h2, late: 1, lateAt: T.h2Land, accentColor: CYAN }), T.h2Out],
    [HP('Take 49: | the *mystery.*', { top: 122, size: 96, accentSize: 140, at: T.h3, late: 1, lateAt: T.h3Land, accentColor: LAV }), T.h3Out],
    [HP('Take 50. | Take 51. | Take *63.*', { top: 96, size: 84, accentSize: 128, at: T.h4, gap: 0.16, late: 2, lateAt: T.h4Land - 0.3, lateGap: 0.3, accentColor: RED }), T.h4Out],
    [HP('Director’s *note.*', { top: 168, size: 104, accentSize: 156, at: T.h5, late: 1, lateAt: T.h5Land, accentColor: GOLD }), T.h5Out],
    [HP('Take 64: | a real *question.*', { top: 122, size: 96, accentSize: 140, at: T.h6, late: 1, lateAt: T.h6Land, accentColor: GOLD }), T.h6Out],
    [HP('Nobody’s | *acting.*', { top: 118, size: 104, accentSize: 156, at: T.h7, late: 1, lateAt: T.h7Land, accentColor: PINK }), T.h7Out],
    [HP('Skip the script. | Play a *card.*', { top: 118, size: 96, accentSize: 140, at: T.h8, late: 1, lateAt: T.h8Land, accentColor: GOLD }), T.h8Out],
  ]
  const BOX = { y: 1500, width: 960, height: 250, cps: CPS }
  const boxes = BOXES.map(([k, close]) => dialogueBox(root, { ...BOX, lines: LINES[k], open: LINES[k][0].t - 0.24, close }))

  // ── ★ LESSON UNLOCKED (shared module), above the scene, under grain + the card cuts
  const lesson = buildLesson(root, { ...LESSON, dim: 0.6 })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ helpers ═══════════════════════
  const camZ = t => 1 + 0.07 * pushK(t)
  const toScreen = (t, [wx, wy]) => { const z = camZ(t); return [PUSH.x + (wx - PUSH.x) * z, PUSH.y + (wy - PUSH.y) * z] }
  function cardImg(img, cx, cy, wBody, rot = 0, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / BODY, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function star(at, t, opts, { dx = 0, dy = 0, rot = 0, props } = {}) {
    x.save(); x.translate(at.x + dx, at.y + dy); x.rotate(rot)
    drawStarChar(x, 0, 0, at.s, t, opts)
    const F = starFrame(0, 0, at.s, t, opts)
    if (props) inSprite(x, F, () => props(F))
    x.restore()
    return F
  }
  const sparkle = (t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV]) => {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.7 + 0.5 * p), cy + Math.sin(a) * R0 * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  function canvasWord(txt, cx, cy, t0, d, { size = 56, fill = BONE, rot = 0 } = {}) {
    const k = t - 0
    void k
    return { txt, cx, cy, t0, d, size, fill, rot }
  }
  void canvasWord

  // ═══════════════════════ the cast's states ═══════════════════════
  const montIdx = t => { let k = -1; for (let i = 0; i < MT.length; i++) if (t >= MT[i]) k = i; return k }
  function gemState(t) {
    let mood = 'neutral', look = [1, 0], squash = 0, blink, dx = 0, dy = 0, rot = 0, grp = 0, gx2 = 0, gy2 = 0, costume = null, shades = 0, askew = 0, pop = 1
    if (t < T.sag) { look = [1, 0] }
    else if (t < T.action1) { mood = 'sleepy'; look = [0, 1]; squash = 0.1 * io(t, T.sag, T.sag + 0.3) }
    else if (t < T.cut1) { mood = t < T.l2 + 1.2 ? 'sparkle' : 'neutral'; const k = io(t, T.action1, T.action1 + 0.4); dx = 16 * k; rot = 0.08 * k; look = [1, 0] }
    else if (t < T.c1) { mood = t < T.l3 + 1 ? 'wide' : 'sleepy'; look = t < T.l3 + 1 ? [-1, 1] : [0, 1]; squash = t > T.l3 + 1 ? 0.08 : 0 }
    else if (t < T.action2) { mood = 'neutral'; look = [1, 0] }
    else if (t < T.bonk) { mood = 'wide'; look = [1, 0]; dx = 12; rot = 0.05 }
    else if (t < T.c2) {
      const d = t - T.bonk
      squash = 0.28 * Math.exp(-d * 6) * Math.cos(d * 22); mood = d < 1.6 ? 'squint' : 'neutral'; look = d < 1.6 ? [0, -1] : [-1, 1]; dy = d < 0.12 ? 10 : 0
    }
    else if (t < T.action3) { look = [1, 0] }
    else if (t < T.tip[0]) {
      shades = t >= T.shades ? 1 : 0; mood = 'neutral'
      const w = inR(t, T.lean2[0], T.lean2[1]) ? 0.035 * Math.sin((t - T.lean2[0]) * 19) : 0
      grp = -0.16 * io(t, ...T.lean1) - 0.18 * io(t, ...T.lean2) + w
    }
    else if (t < T.back[0]) {
      shades = 1; const p = ease.inQuad(prog(t, ...T.tip))
      grp = -0.34 - 1.6 * p; gx2 = -330 * p; gy2 = 60 * p
    }
    else if (t < T.c3 + 0.1) {
      shades = 1; askew = 1; mood = 'wide'; look = [1, -1]
      const p = io(t, ...T.back); gx2 = lerp(-330, 0, p); gy2 = -Math.sin(Math.PI * p) * 120
    }
    else if (t < T.stop) {
      const k = montIdx(t); costume = k >= 0 ? COSTUMES[k % COSTUMES.length] : null
      mood = k % 3 === 0 ? 'wink' : k % 3 === 1 ? 'sparkle' : 'happy'; look = [1, 0]
      if (k < 0) { shades = 1; askew = 1; mood = 'wide' }
    }
    else if (t < T.perk[0]) { mood = 'sleepy'; look = [-1, 1]; squash = 0.1 * io(t, T.stop, T.stop + 0.5) }
    else if (t < T.flick[1]) { mood = 'wide'; look = [-1, 1] }
    else if (t < T.action4) { mood = 'sparkle'; look = [-1, 0] }
    else if (t < T.freeze) { mood = 'neutral'; look = t < T.insOut[0] ? [0, 0] : [1, 0] }
    else if (t < T.drop) { mood = 'neutral'; look = [1, 0]; blink = false }
    else if (t < T.l12) { mood = t < T.drop + 0.6 ? 'wide' : 'sparkle'; look = [1, 0]; dx = 10 * io(t, T.drop + 0.6, T.drop + 1.2) }
    else if (t < T.l13) { mood = 'sparkle'; look = [1, 0]; dx = 14; rot = 0.06 }
    else { mood = Math.floor(t / 1.3) % 2 ? 'happy' : 'sparkle'; look = [1, 0]; dx = 12; rot = 0.05 }
    return { mood, look, squash, blink, dx, dy, rot, grp, gx2, gy2, costume, shades, askew, pop }
  }
  function tauState(t) {
    let mood = 'neutral', look = [-1, 0], squash = 0, blink = 0.55, chew = true, dx = 0, rot = 0, heart = false
    if (t < T.sag) { }
    else if (t < T.action1) { squash = 0.08 * io(t, T.sag, T.sag + 0.3); look = [0, 1] }
    else if (t < T.freeze2) { }
    else if (t < T.bonk + 0.3) { mood = 'wide'; blink = undefined; chew = false }
    else if (t < T.roll[0]) { look = t > T.l6 && t < T.crash ? [-1, 0] : [-1, 0] }
    else if (t < T.roll[1]) { mood = 'eyeroll'; blink = undefined }
    else if (t < T.stop) { look = [-1, 0] }
    else if (t < T.freeze) { look = t < T.perk[0] ? [-1, 1] : [-1, 0] }
    else if (t < T.drop) { chew = false; mood = t > T.freeze + 0.9 ? 'wide' : 'neutral'; blink = t > T.freeze + 0.9 ? undefined : lerp(0.55, 0.2, prog(t, T.freeze, T.freeze + 0.8)) }
    else { chew = false; mood = t < T.drop + 0.25 ? 'wide' : 'heart'; blink = undefined; heart = true; dx = -14 * io(t, T.drop + 0.2, T.drop + 0.7); rot = -0.07 * io(t, T.drop + 0.2, T.drop + 0.7) }
    if (chew) squash += 0.05 * Math.max(0, Math.sin(t * (inR(t, ...T.mont) ? 26 : 13)))
    return { mood, look, squash, blink, dx, rot, heart }
  }
  function virState(t) {
    let mood = 'squint', look = [1, -1], squash = 0, dy = 0, beret = 0, blink
    let mega = { held: true, ang: -0.72 }
    if (t < T.l1) { mood = 'neutral' }
    else if (t < T.action1) { mood = t > T.sag - 0.1 ? 'eyeroll' : 'squint'; look = [1, -1] }
    else if (t < T.cut1 - 0.1) { mood = 'neutral'; look = [1, -1] }
    else if (t < T.c1) { mood = 'squint'; look = [1, -1] }
    else if (t < T.cutA - 0.1) { mood = t > T.bonk - 0.5 ? 'wide' : 'neutral'; look = [1, -1] }
    else if (t < T.c2) { mood = t < T.l5 + 0.9 ? 'squint' : 'neutral'; look = [1, -1] }
    else if (t < T.crash) { mood = 'neutral'; look = [1, -1] }
    else if (t < T.roll[0]) { mood = 'squint'; look = [0, -1]; blink = 0.55 }
    else if (t < T.roll[1]) { mood = 'eyeroll' }
    else if (t < T.stop) {
      const k = montIdx(t); mood = k < 4 ? 'squint' : k < 9 ? 'neutral' : 'sleepy'; look = [1, -1]; beret = k < 0 ? 0 : 0.08 * (k / 13)
      squash = k >= 9 ? 0.04 : 0
    }
    else if (t < T.perk[0]) {
      mood = 'sleepy'; look = [0, 1]; dy = 14 * io(t, ...T.sink); squash = 0.12 * io(t, ...T.sink)
      beret = io(t, ...T.beret)
      mega = t < T.slip ? { held: true, ang: -0.72 } : { held: false }
      if (t > T.glow) { mood = 'wide'; look = [1, -1] }
    }
    else if (t < T.c5) {
      const p = io(t, ...T.perk); dy = 14 * (1 - p); squash = 0.12 * (1 - p); beret = 1 - p; mood = 'sparkle'; look = [1, -1]
      mega = { held: false }
    }
    else if (t < T.drop) { mood = 'squint'; look = [1, -1]; mega = { held: true, ang: -0.72 } }
    else if (t < T.mega[0]) { mood = 'wide'; look = [1, -1]; mega = { held: true, ang: -0.72 } }
    else if (t < T.megaDown[1]) {
      const up = io(t, ...T.mega), down = io(t, ...T.megaDown)
      mega = { held: true, ang: -0.72 - 0.35 * up + 1.25 * down }
      mood = t < T.megaDown[0] ? 'squint' : 'sparkle'; look = [1, -1]; squash = -0.08 * up * (1 - down)
    }
    else if (t < T.lesson) { mood = 'happy'; mega = { held: true, ang: 0.53 } }
    else { mood = t > T.l14 && t < T.l14 + 1.4 ? 'sparkle' : 'happy'; look = [1, -1]; mega = { held: true, ang: lerp(0.53, -0.72, io(t, T.l14 - 0.5, T.l14 - 0.1)) } }
    return { mood, look, squash, dy, beret, blink, mega }
  }
  function pisState(t) {
    let mood = 'sparkle', look = [1, 1], tears = 1, squash = 0
    if (t < T.sob - 0.5) { }
    else if (t < T.bonk) { tears = t > T.sob ? 3 : 2; squash = t > T.sob ? 0.06 * Math.sin(t * 20) : 0 }
    else if (t < T.bonk + 0.5) { mood = 'wide'; tears = 1 }
    else if (t < T.unDip[1]) { mood = 'squint'; look = [-1, 0]; tears = 1 }
    else if (t < T.crash) { }
    else if (t < T.roll[1]) { mood = 'wide'; tears = 0; look = [0, 1] }
    else if (t < T.stop) { tears = 2 }
    else if (t < T.c5) { tears = 2; look = [0, 1] }
    else if (t < T.drop) { mood = t > T.freeze ? 'wide' : 'sparkle'; tears = 1 }
    else if (t < T.wail) { tears = 2 }
    else { mood = 'happy'; tears = t < T.lesson ? 3 : 2; squash = t < T.lesson ? 0.06 * Math.sin(t * 22) : 0 }
    return { mood, look, tears, squash }
  }

  // the boom mic: where its windscreen is (world)
  const GRIP = (t, F) => { const [hx, hy] = cellToWorld(F, 33, 14); return [PIS_AT.x + hx, PIS_AT.y + hy] }
  function micAt(t, grip) {
    const sway = [Math.sin(t * 1.3) * 8, Math.sin(t * 1.7 + 1) * 5]
    const rest = [MIC0[0] + sway[0], MIC0[1] + sway[1]]
    const g = gemState(t)
    const head = [GEM_AT.x + 12 + 4, GEM_AT.y - 126 + 14 - 34]          // just above Gemini's top point (leaning in)
    const vir = [VIR_AT.x + 4, VIR_AT.y + 14 - 108 + 12 - 34]
    void g
    const via = (a, b, p) => {           // swing along an arc around the grip (angle + length)
      const a0 = Math.atan2(a[1] - grip[1], a[0] - grip[0]), a1 = Math.atan2(b[1] - grip[1], b[0] - grip[0])
      const l0 = Math.hypot(a[0] - grip[0], a[1] - grip[1]), l1 = Math.hypot(b[0] - grip[0], b[1] - grip[1])
      const an = lerp(a0, a1, p), l = lerp(l0, l1, p)
      return [grip[0] + Math.cos(an) * l, grip[1] + Math.sin(an) * l]
    }
    if (inR(t, T.dip[0], T.unDip[1])) {
      if (t < T.bonk) return via(rest, head, ease.inQuad(prog(t, ...T.dip)))
      if (t < T.unDip[0]) { const d = t - T.bonk; return [head[0], head[1] - 26 * Math.exp(-d * 5) * Math.abs(Math.sin(d * 12))] }
      return via(head, rest, io(t, ...T.unDip))
    }
    if (inR(t, T.pat[0] - 0.4, T.pat[1] + 0.45)) {
      const pv = [vir[0], vir[1] - 30 * Math.abs(Math.sin((t - T.pat[0]) * Math.PI * 3 / (T.pat[1] - T.pat[0])))]
      if (t < T.pat[0]) return via(rest, vir, io(t, T.pat[0] - 0.4, T.pat[0]))
      if (t < T.pat[1]) return pv
      return via(vir, rest, io(t, T.pat[1], T.pat[1] + 0.45))
    }
    return rest
  }

  // ═══════════════════════ the world (through the camera) ═══════════════════════
  function drawWorld(t) {
    const g = gemState(t), ta = tauState(t), v = virState(t), pi = pisState(t)
    // stage light (dims when the director gives up)
    const spotK = 1 - 0.55 * io(t, ...T.dim) * (1 - io(t, T.perk[0], T.perk[1]))
    drawSpotlight(x, SPOT.x, SPOT.y, FLOOR, { k: spotK, t })
    // Pisces + the boom (behind the actors' chairs? no: the boom hangs above the set)
    const pisOpts = { color: PISCES.color, glyph: PISCES.glyph, mood: pi.mood, look: pi.look, squash: pi.squash, seed: 12, bob: 5, glow: 0.8 }
    const PF = star(PIS_AT, t, pisOpts, { props: () => tearsCells(x, t, pi.tears) })
    const grip = GRIP(t, PF), mic = micAt(t, grip)
    const dir = Math.atan2(mic[1] - grip[1], mic[0] - grip[0])
    // chairs, Taurus, Gemini (with its chair: it tips back on two legs)
    drawChair(x, TAU_AT.x, 1146, FLOOR, 1)
    const tauOpts = { color: TAURUS.color, glyph: TAURUS.glyph, mood: ta.mood, look: ta.look, blink: ta.blink, squash: ta.squash, hops: TAU_HOPS, seed: 5, bob: 3, glow: 0.85 }
    const TF = star(TAU_AT, t, tauOpts, { dx: ta.dx, rot: ta.rot, props: () => bibCells(x) })
    x.save()
    x.translate(PIVOT.x + g.gx2, PIVOT.y + g.gy2); x.rotate(g.grp); x.translate(-PIVOT.x, -PIVOT.y)
    drawChair(x, GEM_AT.x, 1146, FLOOR, -1)
    const gemOpts = { color: GEMINI.color, glyph: GEMINI.glyph, mood: g.mood, look: g.look, blink: g.blink, squash: g.squash, hops: GEM_HOPS, seed: 3, bob: 3, glow: 0.85 }
    const GF = star(GEM_AT, t, gemOpts, { dx: g.dx, dy: g.dy, rot: g.rot, props: () => {
      if (g.shades) shadesCells(x, { askew: g.askew })
      if (g.costume) costumeCells(x, g.costume)
    } })
    // the talk card in Gemini's hand (caught → the insert)
    const hand = (() => { const [hx, hy] = cellToWorld(GF, 33, 15); return [GEM_AT.x + g.dx + hx, GEM_AT.y + g.dy + hy] })()
    if (t >= T.flick[1] && t < T.ins[0]) cardImg(CARD, hand[0] + 12, hand[1] + 10, 64, 0.2)
    x.restore()
    // the table, the candle, the card on the table
    drawTable(x, TABLE.x, TABLE.top, TABLE.w, FLOOR)
    const melt = prog(t, ...T.melt)
    const flare = io(t, T.drop + 0.1, T.drop + 0.4) * (1 - 0.5 * io(t, T.drop + 3, T.drop + 4))
    drawCandle(x, CANDLE.x, CANDLE.y, t, { h: lerp(58, 10, melt), flare, dim: io(t, ...T.dim) * (1 - io(t, ...T.perk)) })
    if (t >= T.insOut[1]) cardImg(CARD, 492, 1068, 60, -0.06)
    // Taurus' donut: held… then dropped (bounces on the table, rolls off)
    const bites = t < 9 ? 0 : t < 20 ? 1 : t < 26 ? 2 : 3
    const [dhx, dhy] = cellToWorld(TF, 2, 15), held = [TAU_AT.x + ta.dx + dhx - 6, TAU_AT.y + dhy + 26]
    if (t < T.drop) drawDonut(x, held[0], held[1], 4, { bites, rot: 0.2 + 0.08 * Math.sin(t * 13) * (t < T.freeze ? 1 : 0) })
    else {
      const d = t - T.drop
      if (d < 2.2) {
        let px, py, r
        if (d < 0.26) { px = held[0]; py = held[1] + 900 * d * d * 1.6; r = 0.2 + d * 4 }
        else if (d < 0.62) { const u = (d - 0.26) / 0.36; px = held[0] - 40 * u; py = 1062 - 46 * Math.sin(Math.PI * u); r = 1.2 + u * 3 }
        else { const u = d - 0.62; px = held[0] - 40 - 230 * u; py = u < 0.5 ? 1062 : 1062 + 1600 * (u - 0.5) ** 2; r = 2.4 - u * 9 }
        drawDonut(x, px, py, 4, { bites, rot: r })
      }
    }
    // the camera (rolling)
    drawFilmCamera(x, CAM.x, CAM.y, t, { spin: spinAt(t), tally: rolling(t) ? 1 : 0 })
    // the boom (in front of the set, hanging over it)
    const tail = [grip[0] - Math.cos(dir) * 70, grip[1] - Math.sin(dir) * 70]
    drawBoom(x, tail, mic, t)
    // Pisces' grip over the pole: redraw its hand cells? (a little ink cuff reads as the hand on the pole)
    x.fillStyle = INK; x.beginPath(); x.arc(grip[0], grip[1], 13, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#b9b2f6'; x.beginPath(); x.arc(grip[0], grip[1], 8, 0, Math.PI * 2); x.fill()
    // Virgo: the clipboard (tucked, or up front in the turn), the megaphone, the beret
    const vOpts = { color: VIRGO.color, glyph: VIRGO.glyph, mood: v.mood, look: v.look, blink: v.blink, squash: v.squash, hops: VIR_HOPS, seed: 7, bob: 3, glow: 0.85, zzz: false }
    const front = inR(t, T.board[0], T.flick[1] + 0.5)
    const boardUp = io(t, ...T.board) * (1 - io(t, T.flick[1], T.flick[1] + 0.5))
    const clipAt = [lerp(108, 318, boardUp), lerp(1420, 1262 + v.dy, boardUp)]
    const page = t < T.rip ? 1 : 0, cardOn = t >= T.rip && t < T.flick[0]
    const glowK = cardOn ? io(t, T.glow - 0.2, T.glow + 0.2) * (0.8 + 0.2 * Math.sin(t * 8)) : 0
    if (!front) drawClipboard(x, clipAt[0], clipAt[1], 5, { rot: -0.32, page })
    const VF = star(VIR_AT, t, vOpts, { dy: v.dy, props: () => beretCells(x, { slide: v.beret }) })
    if (front) drawClipboard(x, clipAt[0], clipAt[1], 5, { rot: lerp(-0.32, 0.08, boardUp), page, card: cardOn ? CARD : null, cardBody: BODY, glow: glowK })
    if (cardOn && t > T.glow - 0.1) sparkle(t, clipAt[0], clipAt[1], T.glow, 9, 90, 1)
    const [mhx, mhy] = cellToWorld(VF, 33, 14)
    if (v.mega.held) drawMegaphone(x, VIR_AT.x + mhx, VIR_AT.y + v.dy + mhy + 10, v.mega.ang, 6)
    else {
      // slipped: falls to the floor and lies there, until Virgo perks up
      const p = ease.inQuad(prog(t, T.slip, T.clang)), b = bump(t, T.clang, 0.22)
      const fx = lerp(VIR_AT.x + mhx, 330, p), fy = lerp(VIR_AT.y + mhy + 10, 1462, p) - 18 * b
      if (t < T.perk[0] + 0.05) drawMegaphone(x, fx, fy, lerp(-0.72, -3.0, p), 6)
    }
    // the torn script halves
    if (t >= T.rip && t < T.rip + 1.6) {
      const d = t - T.rip
      drawPageHalf(x, clipAt[0] - 24 - 140 * d, clipAt[1] - 40 - 260 * d + 420 * d * d, 5, -d * 4, -1)
      drawPageHalf(x, clipAt[0] + 24 + 180 * d, clipAt[1] - 30 - 220 * d + 420 * d * d, 5, d * 5, 1)
    }
    // the flick: the card spins over to Gemini's hand
    if (inR(t, T.flick[0], T.flick[1])) {
      const p = ease.inOutQuad(prog(t, ...T.flick))
      cardImg(CARD, lerp(clipAt[0], hand[0] + 12, p), lerp(clipAt[1], hand[1] + 10, p) - Math.sin(Math.PI * p) * 220, 64, p * Math.PI * 4 + 0.2)
    }
    if (t >= T.flick[1]) sparkle(t, hand[0] + 12, hand[1] + 10, T.flick[1], 8, 70, 2)
    // BONK: dizzy stars over Gemini
    if (inR(t, T.bonk, T.bonk + 1.7)) {
      const d = t - T.bonk
      for (let i = 0; i < 3; i++) { const a = d * 6 + i * 2.1; drawPixelStar(x, GEM_AT.x + 12 + Math.cos(a) * 70, GEM_AT.y - 140 + Math.sin(a) * 18, 26, i % 2 ? 1 : 2, [GOLD, BONE, PINK][i]) }
    }
    // chat bubbles (the real conversation)
    for (let i = 0; i < CHAT_T.length; i++) {
      const t0 = CHAT_T[i], k = pop01(t, t0, 0.22, 2.4) * (1 - prog(t, t0 + 0.75, t0 + 0.95))
      if (k <= 0.01 || inR(t, T.lesson, T.lessonOut[1] + 0.1)) continue
      const tau = i % 2 === 0
      const icons = tau ? ['cal', '!', 'cal', 'heart', '!'] : ['?', 'plane', '?', 'heart', '?']
      drawBubble(x, tau ? 862 : 214, 830 + (i % 3) * 10, k, icons[Math.floor(i / 2) % icons.length], { flip: !tau })
    }
    return { g, GF }
  }

  function slateAt(t) {
    for (const S of SLATES) {
      if (t < S.in || t >= S.out[1]) continue
      const pin = S.in < 0 ? 1 : easeOutBack(prog(t, S.in, S.in + 0.3), 1.6)
      const po = ease.inCubic(prog(t, ...S.out))
      const cl = t - S.clap
      const open = cl < 0 ? 1 - 0.15 * bump(t, S.clap - 0.4, 0.3) : cl < 0.05 ? 1 - cl / 0.05 : 0.12 * bump(t, S.clap + 0.05, 0.12)
      return { x: SLATE_AT.x - 160 * po, y: SLATE_AT.y + (1 - pin) * 900 + 1100 * po + (cl > 0 && cl < 0.2 ? 8 * Math.sin(cl * 50) * (1 - cl / 0.2) : 0), rot: (1 - pin) * 0.2 - 0.35 * po - 0.04, k: 1, open, take: S.take, impact: cl > 0 && cl < 0.3 ? 1 - cl / 0.3 : 0 }
    }
    if (inR(t, T.mont[0] - 0.07, T.mont[1] + 0.3)) {
      const k = montIdx(t), pin = easeOutBack(prog(t, T.mont[0] - 0.07, T.mont[0] + 0.2), 1.7), po = ease.inCubic(prog(t, T.mont[1], T.mont[1] + 0.3))
      const tc = k >= 0 ? MT[k] : MT[0], cl = t - tc, nxt = MT[k + 1] ?? MT[k] + 0.4
      const open = k < 0 ? 1 : cl < 0.04 ? 1 - cl / 0.04 : Math.min(1, prog(t, tc + 0.05, Math.min(nxt, tc + 0.3)) * 1.0) * (k === MT.length - 1 ? 0 : 1)
      return { x: 540, y: 636 + 1000 * po + (cl < 0.12 ? 6 * Math.sin(cl * 60) : 0), rot: -0.05 + 0.04 * Math.sin(k * 2.1), k: 0.62 * pin, open, take: String(50 + Math.max(0, k)), impact: cl < 0.2 ? 1 - cl / 0.2 : 0 }
    }
    return null
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const outP = 1 - ease.inCubic(prog(t, ...T.out))
      if (outP > 0) {
        const z = camZ(t) * lerp(0.94, 1, outP)
        x.save(); x.globalAlpha = outP
        x.translate(PUSH.x, PUSH.y); x.scale(z, z); x.translate(-PUSH.x, -PUSH.y)
        drawWorld(t)
        x.restore()
        x.save(); x.globalAlpha = outP
        // CRASH (off-screen left)
        if (inR(t, T.crash, T.crash + 1.0)) { const d = t - T.crash; drawBurst(x, 'CRASH!', 190, 1120 - d * 20, { size: 84, fill: '#ffb45c', k: easeOutBack(prog(d, 0, 0.2), 3), rot: -0.22, alpha: 1 - prog(d, 0.7, 1.0) }) }
        // BONK
        if (inR(t, T.bonk, T.bonk + 0.9)) { const d = t - T.bonk, [sx, sy] = toScreen(t, [GEM_AT.x + 150, GEM_AT.y - 190]); drawBurst(x, 'BONK!', sx, sy, { size: 76, fill: CYAN, k: easeOutBack(prog(d, 0, 0.18), 3), rot: 0.14, alpha: 1 - prog(d, 0.65, 0.9) }) }
        // crickets
        for (const [ct, cx2, cy2] of [[T.crk[0], 820, 1180], [T.crk[1], 690, 860]]) { const d = t - ct; if (d > 0 && d < 1.1) drawBurst(x, 'chirp.', cx2, cy2 - d * 18, { size: 40, fill: '#9cf08a', k: 1, alpha: Math.sin(Math.PI * d / 1.1), font: "'Space Mono', monospace", weight: 700 }) }
        // megaphone bursts: out of the bell, flying to their spot
        for (const B of BURSTS) {
          const d = t - B.t
          if (d < 0 || d > B.d) continue
          const p = ease.outCubic(prog(d, 0, 0.2)), [bx, by] = toScreen(t, BELL)
          drawBurst(x, B.text, lerp(bx, B.to[0], p), lerp(by, B.to[1], p), { size: B.size, fill: B.fill, k: 0.35 + 0.65 * easeOutBack(prog(d, 0, 0.24), 2.6), rot: B.rot + (B.fill === RED ? 0.03 * Math.sin(d * 40) * (1 - p) : 0), alpha: 1 - prog(d, B.d - 0.18, B.d), weight: B.weight || 800 })
        }
        // the slate (held up to the camera)
        const S = slateAt(t)
        if (S) drawSlate(x, S.x, S.y, S)
        // the insert: the real talk card, big
        if (inR(t, T.ins[0], T.insOut[1])) {
          const a = io(t, ...T.ins), b = io(t, ...T.insOut), k = a * (1 - b)
          x.fillStyle = `rgba(6,4,16,${0.55 * k})`; x.fillRect(0, 0, W, 1920)
          const [hx, hy] = toScreen(t, [GEM_AT.x + 150, GEM_AT.y - 18])
          const [tx, ty] = toScreen(t, [492, 1068])
          const cx2 = b > 0 ? lerp(540, tx, b) : lerp(hx, 540, a), cy2 = b > 0 ? lerp(800, ty, b) : lerp(hy, 800, a)
          const w = b > 0 ? lerp(380, 60, b) : lerp(64, 380, a)
          const gl = x.createRadialGradient(cx2, cy2, 0, cx2, cy2, 480); gl.addColorStop(0, `rgba(242,199,92,${0.28 * k})`); gl.addColorStop(1, 'rgba(242,199,92,0)'); x.fillStyle = gl; x.fillRect(cx2 - 480, cy2 - 480, 960, 960)
          cardImg(CARD, cx2, cy2, w, b > 0 ? -0.08 * b : 0.2 * (1 - a))
          if (a > 0.3 && a < 1) sparkle(t, cx2, cy2, T.ins[0] + 0.18, 10, 280, 2)
        }
        // the tie-in: a hand of talk cards fans in
        if (t >= T.fan[0]) {
          const items = [[CARD2, -168, -0.24, 0], [CARD4, 168, 0.24, 0.08], [CARD, 0, 0, 0.16]]
          for (const [im, ox, r, dl] of items) {
            const p = easeOutBack(prog(t, T.fan[0] + dl, T.fan[0] + dl + 0.45), 1.5)
            if (p <= 0) continue
            cardImg(im, 540 + ox * p, lerp(1500, 690 + Math.abs(ox) * 0.12, p), 230, r * p)
          }
          sparkle(t, 540, 690, T.fan[0] + 0.5, 12, 300, 3)
        }
        x.restore()
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: every beat change. The default selection keeps 4 of these 9 (indices 1, 3, 5, 7):
// 10.92 (→ take 48), 23.93 (→ the montage), 34.3 (→ take 64), 46.58 (→ LESSON UNLOCKED). End card flips at 55.6.
export const CUTS = [4.45, T.c1, T.c2, T.c3, T.c4, T.c5, T.c6, T.c7, T.c8]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
/** real silence in the score: a tape stop at t0, then more stops chained over its silent tail until `until` */
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L; q0 = +(q0 + L * 0.84).toFixed(4) }
  return out
}
const clack = (t, g = 1) => [['tick', t, 0.16 * g], ['pop', t, 330, 0.06 * g, 0], ['pop', +(t + 0.012).toFixed(3), 1318.51, 0.025 * g, 0.2], ['tick', +(t + 0.03).toFixed(3), 0.06 * g]]
const scratch = t => [['whoosh', t, 0.09, 0.16], ['whoosh', +(t + 0.08).toFixed(3), 0.15, 0.18], ['tick', t, 0.1], ['tick', +(t + 0.085).toFixed(3), 0.07]]
const action = t => [['pop', t, 880, 0.04, -0.3], ['pop', +(t + 0.07).toFixed(3), 1174.66, 0.04, -0.3], ['pluck', +(t + 0.07).toFixed(3), 1174.66, 0.03, 0.5, -0.3]]
const munch = t => [['pop', t, 196, 0.034, 0.3], ['tick', +(t + 0.02).toFixed(3), 0.02], ['pop', +(t + 0.14).toFixed(3), 174.61, 0.028, 0.3]]
const cricket = (t, pan = 0.55) => [0, 0.045, 0.09, 0.26, 0.305, 0.35].map(d => ['pop', +(t + d).toFixed(3), 4186, 0.022, pan])
const LT = lineTimes(ALL, { cps: CPS })
void LT
export const CUES = [
  // 0 · cold open
  ...clack(SLATES[0].clap), ['whoosh', SLATES[0].out[0], 0.3, 0.05],
  ...head(T.h0, 4, T.h0Land, 0),
  ['pop', T.sag, 523.25, 0.03, 0], ['pop', T.sag + 0.12, 440, 0.03, 0], ['pluck', T.sag + 0.2, 392, 0.03, 0.5, 0],
  ...talkCues(ALL, { cps: CPS, pitch: { [VIR]: 760, [GEM]: 1100, [TAU]: 520 } }),
  // 1 · take 47
  ...action(T.action1), ...head(T.h1, 3, T.h1Land, 2),
  ...[6.15, 6.6, 7.05].flatMap(munch),
  ...scratch(T.cut1), ...silence(T.cut1, 0.45, T.action2),
  // 2 · take 48
  ['whoosh', SLATES[1].in, 0.3, 0.05], ...clack(SLATES[1].clap), ['whoosh', SLATES[1].out[0], 0.3, 0.04],
  ...head(T.h2, 3, T.h2Land, 1), ...action(T.action2),
  ...[0, 0.16, 0.3, 0.5, 0.64, 0.82].map((d, i) => ['pop', +(T.sob + d).toFixed(3), [659.25, 587.33, 523.25, 659.25, 587.33, 493.88][i], 0.024, -0.4]),
  ['whoosh', T.dip[0] + 0.2, 0.5, 0.03],
  ['pop', T.bonk, 140, 0.09, -0.2], ['boom', T.bonk, 0.12], ['bell', T.bonk + 0.02, 1975.53, 0.022, 0.4, -0.2],
  ...[0.3, 0.55, 0.8, 1.05].map((d, i) => ['pop', +(T.bonk + d).toFixed(3), i % 2 ? 1567.98 : 1318.51, 0.015, -0.2]),
  ...scratch(T.cutA), ...silence(T.cutA, 0.45, T.action3), ['tick', T.cutB, 0.08], ['pop', T.cutB, 220, 0.04, 0.2], ['tick', T.cutC, 0.1], ['pop', T.cutC, 196, 0.05, 0],
  ...[15.95, 16.4].flatMap(munch),
  // 3 · take 49
  ['whoosh', SLATES[2].in, 0.3, 0.05], ...clack(SLATES[2].clap), ['whoosh', SLATES[2].out[0], 0.3, 0.04],
  ...head(T.h3, 3, T.h3Land, 4), ...action(T.action3),
  ['pop', T.shades, 1318.51, 0.03, -0.3], ['bell', T.shades + 0.05, 2349.32, 0.018, 0.5, -0.3],
  ['tick', 20.5, 0.03], ['tick', 20.75, 0.035], ['tick', 20.95, 0.04],
  ...silence(T.tip[0], 0.6, T.c3), ['whoosh', T.tip[0], 0.45, 0.07],
  ['boom', T.crash, 0.22], ...[0, 0.07, 0.15, 0.26, 0.4].map((d, i) => ['tick', +(T.crash + d).toFixed(3), 0.1 - i * 0.015]), ['bell', T.crash + 0.05, 2093, 0.03, 0.9, -0.6], ['pop', T.crash + 0.1, 160, 0.06, -0.6],
  ...[22.1, 22.55].flatMap(munch), ['pluck', T.roll[0] + 0.1, 1760, 0.022, 0.25, 0],
  ['whoosh', T.back[0], 0.35, 0.04], ['pop', T.back[1], 659.25, 0.035, -0.3],
  // 4 · takes 50 → 63
  ...head(T.h4, 5, T.h4Land, 0, 0.022),
  ...MT.flatMap((t, i) => clack(t, 0.75 + 0.25 * (i / MT.length))),
  ...MT.map((t, i) => ['pop', +(t + 0.03).toFixed(3), NOTE[i % NOTE.length], 0.02, i % 2 ? 0.4 : -0.4]),
  ...MCUTS.map(i => ['pop', +(MT[i] + 0.04).toFixed(3), 196, 0.03, -0.3]),
  // 5 · the turn (the music stops dead)
  ...silence(T.stop, 0.45, T.piano), ['whoosh', T.stop, 0.2, 0.06],
  ...head(T.h5, 2, T.h5Land, 2),
  ['whoosh', T.slip, 0.3, 0.03], ['bell', T.clang, 1975.53, 0.04, 0.9, -0.4], ['bell', T.clang + 0.05, 2637, 0.025, 0.6, -0.4], ['pop', T.clang, 300, 0.05, -0.4], ['tick', T.clang + 0.18, 0.05], ['bell', T.clang + 0.2, 1975.53, 0.018, 0.5, -0.4],
  ['pluck', T.sink[0] + 0.1, 392, 0.035, 0.6, 0], ['pluck', T.sink[0] + 0.35, 349.23, 0.035, 0.9, 0],
  ...cricket(T.crk[0] + 0.05), ...cricket(T.crk[1] + 0.05, -0.4),
  ['whoosh', T.board[0], 0.3, 0.03],
  ['whoosh', T.rip, 0.16, 0.1], ...[0, 0.03, 0.06, 0.09, 0.12].map(d => ['tick', +(T.rip + d).toFixed(3), 0.05]), ['whoosh', T.rip + 0.1, 0.5, 0.03],
  ...[0, 1, 2].map(i => ['pop', +(T.pat[0] + (i + 0.5) * (T.pat[1] - T.pat[0]) / 3).toFixed(3), 261.63, 0.035, -0.4]),
  ['bell', T.glow, 1760, 0.04, 1.4, -0.3], ['glitter', T.glow, T.glow + 0.7], ['pluck', T.glow + 0.1, 1318.51, 0.03, 0.6, -0.3],
  ['pop', T.perk[0], 587.33, 0.04, -0.4], ['pop', T.perk[0] + 0.08, 880, 0.04, -0.4], ['pluck', T.perk[0] + 0.12, 1174.66, 0.035, 0.5, -0.4],
  ['whoosh', T.flick[0], 0.55, 0.06], ['pop', T.flick[1], 880, 0.04, -0.3], ['glitter', T.flick[1], T.flick[1] + 0.4],
  // 6 · take 64
  ['whoosh', SLATES[3].in, 0.3, 0.05], ...clack(SLATES[3].clap, 0.8), ['whoosh', SLATES[3].out[0], 0.3, 0.04],
  ...head(T.h6, 4, T.h6Land, 3),
  ['pop', T.action4, 659.25, 0.025, -0.3], ['pop', T.action4 + 0.1, 880, 0.02, -0.3],
  ['whoosh', T.ins[0] + 0.1, 0.35, 0.03], ['bell', T.ins[1], 1318.51, 0.03, 1.2, 0], ['glitter', T.ins[0] + 0.2, T.ins[1] + 0.5], ['whoosh', T.insOut[0] + 0.1, 0.3, 0.025],
  ...silence(T.hush, 0.12, T.drop),
  ['pop', 37.15, 98, 0.06, 0], ['pop', 37.4, 98, 0.045, 0], ['pop', 37.82, 98, 0.06, 0], ['pop', 38.07, 98, 0.045, 0],
  ['whoosh', T.drop, 0.25, 0.05], ['pop', T.drop + 0.26, 180, 0.07, 0.3], ['pop', T.drop + 0.62, 200, 0.05, 0.2], ...[0.75, 0.85, 0.95, 1.05].map(d => ['tick', +(T.drop + d).toFixed(3), 0.03]), ['pop', T.drop + 1.45, 120, 0.06, 0.4],
  ['whoosh', T.drop + 0.05, 0.3, 0.05], ['glitter', T.drop + 0.1, T.drop + 0.8],
  ['pluck', T.drop + 0.3, 1174.66, 0.04, 0.6, 0.3], ['pluck', T.drop + 0.42, 1567.98, 0.04, 0.8, 0.3],
  ...head(T.h7, 2, T.h7Land, 1),
  ...CHAT_T.map((t, i) => ['pop', t, i % 2 ? 987.77 : 739.99, 0.02, i % 2 ? -0.4 : 0.4]),
  ['tick', T.mega[0], 0.04], ['pop', T.mega[1], 880, 0.03, -0.4], ['pop', T.megaDown[0] + 0.1, 659.25, 0.03, -0.4], ['pop', T.megaDown[0] + 0.25, 587.33, 0.03, -0.4], ['pop', T.megaDown[0] + 0.4, 493.88, 0.03, -0.4],
  ...Array.from({ length: 8 }, (_, i) => ['pop', +(T.wail + i * 0.14).toFixed(3), [1174.66, 1318.51, 1174.66, 987.77][i % 4], 0.018, -0.5]),
  // 7 · ★ lesson unlocked
  ['whoosh', T.c7 + 0.05, 0.3, 0.03],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'F' }),
  // 8 · that's a wrap
  ...head(T.h8, 5, T.h8Land, 2),
  ['whoosh', T.fan[0], 0.4, 0.05], ...[0, 0.08, 0.16].map((d, i) => ['pop', +(T.fan[0] + 0.3 + d).toFixed(3), [880, 1046.5, 1318.51][i], 0.03, (i - 1) * 0.3]), ['glitter', T.fan[0] + 0.45, T.fan[0] + 1.0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
