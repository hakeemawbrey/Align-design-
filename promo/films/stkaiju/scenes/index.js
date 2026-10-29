// stkaiju — "Overthinkzilla." (45 s vertical Align ad, Star Talk "Wild Lessons" #5, music: cinematic · Dm, a monster movie).
// Story 0–40.6, then the shared end card. Brief: promo/films/STARTALK-WILD.md §5 (rules: STARTALK4.md).
//   0.0–3.2    B-movie title card: "A STAR TALK PICTURE" · OVERTHINK (stomp) · zilla. (stomp) · "IT FEEDS ON “WHAT IF.”"
//              A dark kaiju silhouette rises behind it; its eyes flash red on a roar.
//   3.25–7.2   "The date went *great.*"  ♍ VIRGO (your star) floats over a tiny pixel city of good thoughts (rooftop signs:
//              SWEET TEXT · THEY LAUGHED · HUGGED BYE · 2ND DATE? · GOOD CONVO · VIBES). "the date went *so* well." Then:
//              "they said 'see ya.' not 'see *you.*'"
//   7.27       (drop) "Uh oh. | A *what if.*"  A tiny pixel lizard with "?" spines hatches out of Virgo's top point
//              (squeak) and hops down into the street.
//   8.95–20.0  The feeding, each what-if a pink thought cloud it gulps, each gulp a growth spurt (and crushed signs):
//              "what if my laugh is *weird*?" (WEIRD LAUGH?) · card cut 11.95 · "I mentioned my cat *four* times."
//              (CAT ×4: HUGGED BYE + 2ND DATE? flattened) · "what if they were just *nice*?" (JUST NICE?: THEY LAUGHED
//              + GOOD CONVO) · the twist: "what if we marry and their mom *hates* me?" (THEIR MOM?!)
//   20.04      It goes COLOSSAL: the frame fills with legs, the last signs pop flat, Pisces' hiding spot goes and it runs
//              across the frame sobbing. The camera tilts up to the face; it roars "WHAT IF" at the lens.
//              "It was | *one date.*"
//   23.1       card cut. "Put it on | a *diet.*"  THE STARS: "babe. stop *feeding* it. just *ask.*" The monster
//              gives them puppy eyes. Virgo's phone: types "had fun! did you?" → sent. Silence (tape stop): the monster
//              sweats, the typing dots… "YES!! friday again?"
//   28.0       "It *shrinks.*"  Pffft: it deflates, spinning, back down to a tiny squeaky lizard. The signs boing back up.
//   30.45      card cut. 30.6 ★ LESSON UNLOCKED: "Overthinking grows | when you *feed* it." (+1 CALM)
//   35.15      "Ask. Don’t *guess.*"  A talk card deals in: "What made you smile today?" THE STARS: "talk cards ask for
//              you. no *guessing.*"
//   38.8       "City *saved.*"  The lizard hops onto Virgo's head (squeak); Pisces happy-sobs. All pops out by 40.45.
// One canvas (sky + a tilting world for the city and the kaiju + screen-space cast), DOM type, dialogue boxes, the shared
// lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawKaiju, kaijuPoint, drawBuilding, drawThought, drawChat, drawTear, drawPixelHeart, drawDust, starEyes, makeTalkCard, rgba } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', MINT = '#7dffb0', KGREEN = '#8ff0a4'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)
export const KEY = 'Dm'

// ── the timeline
export const T = {
  black: [0, 0.25],
  title: 0.12, stomp1: BEAT(0), stomp2: BEAT(2), tag: 1.95, roar0: BEAT(3), rise: [0.25, 2.2], titleOut: [2.95, 3.2], flash: [3.12, 3.45],
  sceneIn: [3.15, 3.5], h1: 3.32, h1Land: 3.72, l1: 3.45, l2: 6.0, h1Out: [7.05, 7.22],
  hatch: BEAT(12), h2: 7.32, h2Land: 7.64, hop: [8.0, 8.7], h2Out: [8.7, 8.86],
  h3: 8.92, h3Land: 9.26, l3: 8.95, b1: 9.55, g1: BEAT(18), h3Out: [11.7, 11.86],
  cut1: 11.95,
  h4: 12.02, h4Land: 12.36, l4: 12.1, b2: 12.95, g2: BEAT(24), h4Out: [14.95, 15.1],
  h5: 15.15, h5Land: 15.5, l5: 15.2, b3: 15.75, g3: BEAT(29), h5Out: [17.85, 18.0],
  h5b: 18.05, h5bLand: 18.42, l6: 18.05, b4: 19.0, g4: BEAT(35), h5bOut: [19.84, 19.99],
  blown: [20.044, 20.5], tilt: [20.4, 21.05], roar: BEAT(37), run: [20.2, 21.8], close1: 21.45,
  h6: 21.3, h6Land: 21.62, h6Out: [22.85, 23.0],
  cut2: 23.1,
  starsIn: [23.05, 23.5], h7: 23.15, h7Land: 23.5, l7: 23.3, plead: [24.35, 25.05], phone: [25.1, 25.45], type: [25.4, 26.45],
  send: BEAT(47), close2: 26.68, dots: 27.0, reply: BEAT(49), h7Out: [27.75, 27.9], starsOut: [28.0, 28.4],
  shrink: [28.0, 28.9], h8: 28.02, h8Land: 28.36, squeak: 28.98, rebuild: 29.05, phoneOut: [29.5, 29.8], pisBack: 29.25, h8Out: [30.15, 30.32],
  cut3: 30.45,
  lesson: BEAT(54), lessonOut: [34.95, 35.15],
  card: [35.15, 35.65], h9: 35.2, h9Land: 35.56, l9: 35.4, cardOut: [38.35, 38.65], close3: 38.72, h9Out: [38.55, 38.7],
  h10: 38.8, h10Land: 39.14, home: [38.75, 39.2], hopHead: [38.95, 39.45], squeak2: 39.5, out: [40.0, 40.45], h10Out: [40.22, 40.42],
}

const VIR = signStar('virgo'), PIS = signStar('pisces')
const NAME = { vir: `${VIR.glyph}︎ VIRGO`, stars: 'THE STARS' }
const TAG = { vir: '#ff8ab6', stars: GOLD }
const L = (t, id, text) => ({ t, speaker: NAME[id], color: TAG[id], text })
const LINES_A = [
  L(T.l1, 'vir', 'the date went *so* well.'),
  L(T.l2, 'vir', "they said 'see ya.' not 'see *you.*'"),
  L(T.l3, 'vir', 'what if my laugh is *weird*?'),
  L(T.l4, 'vir', 'I mentioned my cat *four* times.'),
  L(T.l5, 'vir', 'what if they were just *nice*?'),
  L(T.l6, 'vir', 'what if we marry and their mom *hates* me?'),
]
const LINES_B = [L(T.l7, 'stars', 'babe. stop *feeding* it. just *ask.*')]
const LINES_C = [L(T.l9, 'stars', 'talk cards ask for you. no *guessing.*')]
export const BOXES = [{ lines: LINES_A, close: T.close1 }, { lines: LINES_B, close: T.close2 }, { lines: LINES_C, close: T.close3 }]
const CPS = 28
export const ALL_LINES = BOXES.flatMap(b => b.lines)
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Overthinking grows | when you *feed* it.', chip: '+1 CALM' }

const FEEDS = [
  { b: T.b1, g: T.g1, text: 'WEIRD LAUGH?', from: 3.5, to: 7 },
  { b: T.b2, g: T.g2, text: 'CAT ×4', from: 7, to: 12 },
  { b: T.b3, g: T.g3, text: 'JUST NICE?', from: 12, to: 20 },
  { b: T.b4, g: T.g4, text: 'THEIR MOM?!', from: 20, to: 40 },
]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inW = (t, a, b) => t >= a && t < b
const nodK = (t, t0, d = 0.42) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(k / d * Math.PI) }
const arcTo = (t, [a, b], p0, p1, h) => { const p = prog(t, a, b), e = ease.inOutCubic(p); return [lerp(p0[0], p1[0], e), lerp(p0[1], p1[1], e) - Math.sin(p * Math.PI) * h, lerp(p0[2] ?? 0, p1[2] ?? 0, e)] }

// ── the stage
const GROUND = 1440, KX = 580
const VIR_HOME = [250, 720, 230], VIR_SMALL = [118, 646, 140], VIR_END = [540, 880, 260]
const STARS_AT = [884, 600, 190]
const CHAT = { x: 52, y: 930, w: 476, h: 430 }
const BUILDINGS = [
  { x: 40, w: 150, h: 210, label: ['SWEET', 'TEXT'], sign: '#ffd36a', crush: T.g4 + 0.12 },
  { x: 205, w: 172, h: 300, label: ['THEY', 'LAUGHED'], sign: '#ff9fc8', crush: T.g3 + 0.1 },
  { x: 393, w: 126, h: 190, label: ['HUGGED', 'BYE'], sign: '#8ff0c8', crush: T.g2 + 0.1 },
  { x: 650, w: 136, h: 250, label: ['2ND', 'DATE?'], sign: '#ffd36a', crush: T.g2 + 0.14 },
  { x: 800, w: 140, h: 330, label: ['GOOD', 'CONVO'], sign: '#9fd8ff', crush: T.g3 + 0.14 },
  { x: 952, w: 112, h: 170, label: ['VIBES'], sign: '#ff9fc8', crush: T.g4 + 0.18 },
].map((b, i) => ({ ...b, g: GROUND, col: ['#3b2b78', '#44307f', '#352670', '#40307c', '#3a2a76', '#46327f'][i], lite: '#5f4bab', dark: '#251852', rebuild: T.rebuild + [0.28, 0.14, 0, 0.07, 0.21, 0.35][i] }))

// camera: the world tilts down (ty > 0) so we look up at the colossal face
function camTy(t) {
  if (t < T.tilt[0]) return 0
  if (t < T.shrink[0]) return 300 * ease.inOutCubic(prog(t, ...T.tilt))
  return 300 * (1 - ease.inOutCubic(prog(t, ...T.shrink)))
}

// ── the kaiju (world coords)
function kaijuPx(t) {
  if (t < T.hatch) return 0
  if (t >= T.shrink[0]) {
    if (t < T.shrink[1]) { const p = prog(t, ...T.shrink); return lerp(40, 3.5, 1 - Math.pow(1 - p, 2.2)) }
    return 3.5
  }
  let px = 3.5 * easeOutBack(prog(t, T.hatch, T.hatch + 0.36), 2.4)
  for (const f of FEEDS) {
    if (t < f.g) break
    const d = f.to > 30 ? 0.5 : 0.42
    px = f.to > 30 ? lerp(f.from, f.to, ease.outCubic(prog(t, f.g, f.g + d))) : lerp(f.from, f.to, easeOutBack(prog(t, f.g, f.g + d), 1.6))
  }
  return px
}
function virgoTop(t) {
  const v = virgo(t)
  return [v.x, v.y - v.size * 0.47]
}
function kaijuPos(t) {
  const ground = [KX, GROUND]
  if (t < T.hop[0]) { const [vx, vy] = virgoTop(t); return [vx, vy + 8] }
  if (t < T.hop[1]) { const [vx, vy] = virgoTop(T.hop[0]); const q = arcTo(t, T.hop, [vx, vy + 8], ground, 280); return [q[0], q[1]] }
  if (t >= T.hopHead[0]) {
    const [vx, vy] = virgoTop(Math.min(t, T.hopHead[1] + 0.01)), q = arcTo(t, T.hopHead, ground, [vx, vy + 10], 300)
    return t < T.hopHead[1] ? [q[0], q[1]] : [vx, virgoTop(t)[1] + 10]
  }
  return ground
}
function kaijuFace(t) {
  const f = { eyes: 'mean', mouth: 'grin', look: [-1, -1], spine: 0.45, sweat: 0 }
  const gulpPrep = FEEDS.some(F => inW(t, F.g - 0.4, F.g))
  const roarAfter = FEEDS.find(F => F.from >= 7 && inW(t, F.g, F.g + 0.55))
  let flash = 0
  for (const F of FEEDS) { const k = t - F.g; if (k >= 0 && k < 1) flash = Math.max(flash, 1.6 * (1 - k)) }
  f.spine = 0.45 + flash
  if (t < T.g1) {
    f.eyes = 'cute'; f.mouth = t < T.hop[1] ? 'smile' : 'smile'; f.look = t < T.hop[1] ? [0, 0] : [-1, -1]
    if (gulpPrep) f.mouth = 'open'
    return f
  }
  if (t < T.g2) { f.eyes = 'mean'; f.mouth = gulpPrep ? 'open' : 'grin'; return f }
  if (t < T.g4) { f.eyes = roarAfter ? 'angry' : 'mean'; f.mouth = gulpPrep || roarAfter ? 'open' : 'grin'; return f }
  if (t < T.cut2) {
    f.spine = Math.max(f.spine, 1)
    if (inW(t, T.g4, T.g4 + 0.5)) { f.eyes = 'angry'; f.mouth = 'open'; f.look = [0, 0] }
    else if (inW(t, T.roar, T.roar + 1.05)) { f.eyes = 'angry'; f.mouth = 'open'; f.look = [0, 0] }
    else { f.eyes = 'mean'; f.mouth = 'grin'; f.look = [-1, 0] }
    return f
  }
  if (t < T.reply) {
    f.spine = 0.8
    if (t < T.plead[0]) { f.eyes = 'mean'; f.mouth = 'grin'; f.look = [1, -1]; return f }
    if (t < T.plead[1]) { f.eyes = 'plead'; f.mouth = 'o'; f.look = [1, -1]; return f }
    f.eyes = 'nervous'; f.mouth = 'wobble'; f.look = [-1, 1]; f.sweat = t >= T.send ? 1 : 0; return f
  }
  if (t < T.shrink[1]) { f.eyes = 'shock'; f.mouth = 'o'; f.look = [-1, 1]; f.spine = 0.2; return f }
  f.eyes = 'cute'; f.mouth = 'smile'; f.spine = 0.3
  f.look = t < T.home[0] ? [-1, -1] : [0, 0]
  return f
}

// ── Virgo (screen space)
function virgo(t) {
  let p = VIR_HOME
  if (t >= T.blown[0] && t < T.shrink[0] + 0.6) p = t < T.blown[1] ? arcTo(t, T.blown, VIR_HOME, VIR_SMALL, 60) : VIR_SMALL
  else if (t >= T.shrink[0] + 0.6 && t < T.home[0]) p = t < T.shrink[1] + 0.3 ? arcTo(t, [T.shrink[0] + 0.6, T.shrink[1] + 0.3], VIR_SMALL, VIR_HOME, 80) : VIR_HOME
  else if (t >= T.home[0]) p = t < T.home[1] ? arcTo(t, T.home, VIR_HOME, VIR_END, 70) : VIR_END
  const shake = inW(t, T.g4, T.cut2) ? Math.sin(t * 61) * 3 : 0
  return { x: p[0] + shake, y: p[1], size: p[2] }
}
function virgoMood(t) {
  const st = (mood, look, o = {}) => ({ mood, look, blink: o.blink, sq: o.sq || 0 })
  if (t < T.l2) return st('happy', [0, 0])
  if (t < T.hatch) return st('neutral', [1, 0], { blink: 0.45 })
  if (t < T.hop[1]) return st('wide', [0, -1], { blink: false, sq: -0.08 * nodK(t, T.hatch, 0.4) })
  if (t < T.g1 + 0.1) return st('squint', [1, 1])
  if (t < T.l4) return st('wide', [1, 1], { blink: false })
  if (t < T.g2) return st('squint', [1, 0])
  if (t < T.l5) return st('wide', [1, 1], { blink: false })
  if (t < T.g3) return st('neutral', [1, 0], { blink: 0.4 })
  if (t < T.l6) return st('wide', [1, 0], { blink: false })
  if (t < T.g4) return st('sparkle', [1, 0])
  if (t < T.cut2) return st('wide', [1, 0], { blink: false, sq: 0.02 * Math.sin(t * 50) })
  if (t < T.phone[0]) return st('neutral', [1, -1])
  if (t < T.send) return st('squint', [1, 1])
  if (t < T.reply) return st('wide', [1, 1], { blink: false })
  if (t < T.shrink[1]) return st('heart', [0, 0])
  if (t < T.lesson) return st('happy', [1, 1])
  if (t < T.card[0]) return st('sparkle', [0, 0])
  if (t < T.home[0]) return st('sparkle', [1, 1])
  if (t < T.hopHead[1]) return st('neutral', [1, 1])
  return st('happy', [0, 0], { sq: 0.1 * nodK(t, T.hopHead[1], 0.4) })
}

// talk hops
const VIR_HOPS = [...talkHops(ALL_LINES, NAME.vir, { cps: CPS }), T.send, T.reply + 0.05, T.reply + 0.5, T.home[1], T.hopHead[1] + 0.02]
const STAR_HOPS = talkHops(ALL_LINES, NAME.stars, { cps: CPS })
const PIS_RUN_HOPS = Array.from({ length: 9 }, (_, i) => +(T.run[0] + 0.05 + i * 0.17).toFixed(3))

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 132px Inter", "800 88px Inter", "800 36px Inter", "800 32px Inter", "700 34px Inter", "italic 500 150px 'EB Garamond'", "italic 600 250px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 20px 'Space Mono'", "400 21px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const lovers = await loadImg('card-talk-6.png')
  const TALK = makeTalkCard(document, lovers, ['What made you', 'smile today?'])
  const TALK_BODY = 612 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HT = (text, o) => popText(root, text, { top: 176, size: 104, accentSize: 140, wobble: true, ...o })
  const H1 = HT('The date went | *great.*', { size: 100, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, accentColor: GOLD })
  const H2 = HT('Uh oh. | A *what if.*', { size: 112, accentSize: 156, at: T.h2, late: 2, lateAt: T.h2Land, accentColor: PINK })
  const H3 = HT('It *eats* | what ifs.', { size: 112, accentSize: 156, at: T.h3, late: 0, accentColor: KGREEN })
  const H4 = HT('Feed it, | it *grows.*', { size: 112, accentSize: 156, at: T.h4, late: 1, lateAt: T.h4Land, accentColor: KGREEN })
  const H5 = HT('Bigger. | *Bigger.*', { size: 116, accentSize: 168, at: T.h5, late: 1, lateAt: T.h5Land, accentColor: KGREEN })
  const H5b = HT('And now, | the *big* one.', { size: 108, accentSize: 156, at: T.h5b, late: 2, lateAt: T.h5bLand, accentColor: PINK })
  const H6 = HT('It was | *one date.*', { size: 120, accentSize: 170, at: T.h6, late: 2, lateAt: T.h6Land, accentColor: PINK })
  const H7 = HT('Put it on | a *diet.*', { size: 112, accentSize: 168, at: T.h7, late: 1, lateAt: T.h7Land, accentColor: GOLD })
  const H8 = HT('It *shrinks.*', { size: 124, accentSize: 176, at: T.h8, late: 1, lateAt: T.h8Land, accentColor: KGREEN })
  const H9 = HT('Ask. | Don’t *guess.*', { size: 116, accentSize: 168, at: T.h9, late: 1, lateAt: T.h9Land, accentColor: GOLD })
  const H10 = HT('City *saved.*', { size: 128, accentSize: 184, at: T.h10, late: 1, lateAt: T.h10Land, accentColor: GOLD })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H5b, T.h5bOut], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out], [H9, T.h9Out], [H10, T.h10Out]]
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1490, width: 960, height: 290, open: b.lines[0].t - 0.22, close: b.close, cps: CPS }))
  const lesson = buildLesson(root, { ...LESSON, dim: 0.62 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6e8', opacity: 0 }, root)

  const shakeAt = t => {
    let a = 0
    const hits = [[T.stomp1, 18], [T.stomp2, 22], [T.roar0, 10], [T.g1, 6], [T.g2, 12], [T.g3, 16], [T.g4, 26], [T.roar, 18], [T.squeak, 4], ...BUILDINGS.map(b => [b.crush, 6])]
    for (const [t0, amp] of hits) { const k = t - t0; if (k >= 0 && k < 0.4) a = Math.max(a, amp * (1 - k / 0.4)) }
    if (inW(t, T.roar, T.roar + 1.0)) a = Math.max(a, 7)
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }
  function sparkleRing(t, cx, cy, t0, n, Rr, seed, life = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p) * 0.8, 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, MINT][i % 4])
    }
    x.restore()
  }
  function tears(eyes, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62, wind = 0 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 34)
    ;[eyes.L, eyes.R].forEach(([ex, ey], si) => {
      const side = si ? 1 : -1
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = wind ? wind * (220 + ((k * 37) % 5) * 40) : side * (120 + ((k * 37) % 5) * 26) * spread, vy = -(160 + ((k * 53) % 4) * 38) * (wind ? 0.4 : 1)
        drawTear(x, ex + vx * a, ey + 6 + vy * a + 900 * a * a, px)
      }
    })
  }

  // ── the title card (screen space)
  function drawTitle(t) {
    if (t > T.titleOut[1]) return
    const o = 1 - ease.inQuad(prog(t, ...T.titleOut))
    // the silhouette rises behind
    const rp = ease.outCubic(prog(t, ...T.rise))
    let jolt = 0
    for (const s of [T.stomp1, T.stomp2]) { const k = t - s; if (k >= 0 && k < 0.3) jolt = Math.max(jolt, 30 * (1 - k / 0.3)) }
    const glow = t >= T.roar0 ? 1 - 0.3 * prog(t, T.roar0 + 0.4, T.roar0 + 0.7) : 0
    drawKaiju(x, 560, lerp(2900, 2130, rp) + jolt, 40, t, { silhouette: true, eyeGlow: glow, spine: 0.6 + glow, alpha: o })
    // red stage light
    const v = x.createRadialGradient(540, 1500, 100, 540, 1500, 1100)
    v.addColorStop(0, `rgba(255,50,90,${0.16 * o * (0.6 + 0.4 * glow)})`); v.addColorStop(1, 'rgba(255,50,90,0)')
    x.fillStyle = v; x.fillRect(0, 0, W, 1920)
    x.save(); x.globalAlpha = o
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    const ls = (v2) => { if ('letterSpacing' in x) x.letterSpacing = v2 }
    // A STAR TALK PICTURE
    const kA = clamp((t - T.title) / 0.4)
    if (kA > 0) { x.globalAlpha = o * kA; x.font = `700 26px ${MONO}`; ls('9px'); x.fillStyle = GOLD; x.fillText('A STAR TALK PICTURE', 540, 268); ls('0px') }
    // OVERTHINK
    const k1 = easeOutBack(prog(t, T.stomp1 - 0.06, T.stomp1 + 0.2), 1.4)
    if (t >= T.stomp1 - 0.06) {
      const s = lerp(2.2, 1, k1)
      x.save(); x.globalAlpha = o * clamp(k1 * 3); x.translate(540, 470); x.scale(s, s)
      x.font = `800 132px ${INTER}`; ls('-2px')
      x.lineJoin = 'round'; x.lineWidth = 14; x.strokeStyle = '#2a0a1e'; x.strokeText('OVERTHINK', 0, 0)
      x.fillStyle = '#ff5468'; x.fillText('OVERTHINK', 6, 6)
      x.fillStyle = BONE; x.fillText('OVERTHINK', 0, 0)
      ls('0px'); x.restore()
    }
    // zilla.
    const k2 = easeOutBack(prog(t, T.stomp2 - 0.06, T.stomp2 + 0.22), 1.6)
    if (t >= T.stomp2 - 0.06) {
      const s = lerp(2.6, 1, k2)
      x.save(); x.globalAlpha = o * clamp(k2 * 3); x.translate(560, 690); x.scale(s, s); x.rotate(-0.05)
      x.font = `italic 600 250px ${SERIF}`
      x.lineJoin = 'round'; x.lineWidth = 16; x.strokeStyle = '#0c2a18'; x.strokeText('zilla.', 0, 0)
      const g = x.createLinearGradient(0, -170, 0, 20); g.addColorStop(0, '#d8ffb8'); g.addColorStop(1, '#4fcf7a')
      x.fillStyle = g; x.fillText('zilla.', 0, 0)
      x.restore()
    }
    // tagline
    const k3 = clamp((t - T.tag) / 0.25)
    if (k3 > 0) {
      x.globalAlpha = o * k3; x.font = `700 34px ${MONO}`; ls('4px'); x.fillStyle = BONE
      x.fillText('IT FEEDS ON “WHAT IF.”', 540 + (1 - k3) * 40, 800); ls('0px')
    }
    x.restore()
  }

  // ── the city (world)
  function buildingK(b, t) {
    if (t < b.crush) return 1
    if (t < b.rebuild) {
      const p = prog(t, b.crush, b.crush + 0.18), a = t - b.crush - 0.18
      return p < 1 ? 1 - 0.86 * ease.inQuad(p) : 0.14 + 0.05 * Math.exp(-a * 9) * Math.sin(a * 30)
    }
    return lerp(0.14, 1, easeOutBack(prog(t, b.rebuild, b.rebuild + 0.36), 2.4))
  }
  function drawGround(t, a) {
    x.save(); x.globalAlpha = a
    x.fillStyle = '#05030e'; x.fillRect(-20, GROUND - 6, W + 40, 8)
    const g = x.createLinearGradient(0, GROUND, 0, GROUND + 520); g.addColorStop(0, '#22184a'); g.addColorStop(1, '#0e0824')
    x.fillStyle = g; x.fillRect(-20, GROUND + 2, W + 40, 900)
    x.fillStyle = '#5f4bab'; x.fillRect(-20, GROUND + 2, W + 40, 6)
    for (let i = 0; i < 12; i++) { x.fillStyle = 'rgba(242,199,92,0.5)'; x.fillRect(20 + i * 96, GROUND + 34, 48, 6) }
    x.restore()
  }
  function drawCity(t, a) {
    x.save(); x.globalAlpha *= a
    for (const b of BUILDINGS) {
      const k = buildingK(b, t)
      drawBuilding(x, b, t, k)
      drawDust(x, b.x + b.w / 2, GROUND, b.w, t - b.crush)
    }
    x.restore()
  }

  // ── the kaiju + its snacks
  function drawMonster(t, a) {
    const px = kaijuPx(t)
    if (px <= 0) return
    const [kx, ky] = kaijuPos(t)
    const f = kaijuFace(t)
    let squash = 0, rot = 0
    for (const F of FEEDS) { const k = t - F.g; if (k >= 0 && k < 0.5) squash = Math.max(squash, 0.12 * Math.exp(-k * 7) * Math.cos(k * 24)) }
    if (inW(t, T.hatch, T.hatch + 0.5)) squash = 0.12 * Math.exp(-(t - T.hatch) * 8) * Math.cos((t - T.hatch) * 26)
    if (inW(t, T.hop[1], T.hop[1] + 0.4)) squash = 0.16 * Math.exp(-(t - T.hop[1]) * 8) * Math.cos((t - T.hop[1]) * 26)
    if (inW(t, ...T.shrink)) { const p = prog(t, ...T.shrink); rot = Math.sin(p * 26) * 0.32 * (1 - p) + p * Math.PI * 2 * 1; squash = 0.1 * Math.sin(p * 40) }
    if (inW(t, T.squeak, T.squeak + 0.5)) squash = 0.2 * Math.exp(-(t - T.squeak) * 7) * Math.cos((t - T.squeak) * 26)
    if (inW(t, T.squeak2, T.squeak2 + 0.5)) squash = 0.2 * Math.exp(-(t - T.squeak2) * 7) * Math.cos((t - T.squeak2) * 26)
    // a little hop now and then while it's tiny and in the street
    let hy = 0
    if (t > T.shrink[1] + 0.5 && t < T.hopHead[0]) { const ph = (t - T.shrink[1]) % 1.6; if (ph < 0.3) hy = -Math.sin(ph / 0.3 * Math.PI) * 18 }
    const rotC = inW(t, ...T.shrink) ? [0, -12.5 * px] : [0, 0]
    x.save(); x.translate(kx + rotC[0] * 0, ky + hy)
    if (rot) { x.translate(0, rotC[1]); x.rotate(rot); x.translate(0, -rotC[1]) }
    drawKaiju(x, 0, 0, px, t, { ...f, squash, alpha: a })
    x.restore()
  }
  function drawSnacks(t) {
    for (const F of FEEDS) {
      if (t < F.b || t > F.g + 0.1) continue
      const v = virgo(t), from = [v.x + v.size * 0.42, v.y - v.size * 0.5]
      const px = kaijuPx(F.g - 0.01), [kx, ky] = kaijuPos(F.g - 0.01)
      const mouth = kaijuPoint(kx, ky, px, 10.5, 7.5)
      const appear = easeOutBack(prog(t, F.b, F.b + 0.24), 2.2)
      const flyA = F.b + 0.32, flyB = F.g - 0.04
      let pt = from, s = appear, rot = -0.05
      if (t >= flyA) {
        const p = prog(t, flyA, flyB), e = ease.inCubic(p)
        pt = [lerp(from[0], mouth[0], e), lerp(from[1], mouth[1], e) - Math.sin(p * Math.PI) * 50]
        s = lerp(1, 0.32, e); rot = Math.sin(p * 9) * 0.12
      }
      drawThought(x, pt[0], pt[1], s, F.text, t, { rot, alpha: t > F.g ? 0 : 1 })
    }
    // crumbs on each gulp
    for (const F of FEEDS) {
      const k = t - F.g
      if (k < 0 || k > 0.5) continue
      const px = kaijuPx(F.g - 0.01), [kx, ky] = kaijuPos(F.g - 0.01), m = kaijuPoint(kx, ky, px, 10.5, 7.5)
      x.save(); x.globalAlpha = 1 - k / 0.5
      for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2, r = 30 + k * 160; x.fillStyle = i % 2 ? '#ffd6ec' : '#f3a9cf'; x.fillRect(m[0] + Math.cos(a) * r - 5, m[1] + Math.sin(a) * r * 0.6 - k * 40 - 5, 10, 10) }
      x.restore()
    }
  }
  // the roar: WHAT IF flying out at the lens (screen space; the mouth is at (KX, GROUND − 18·60 + 600))
  function drawRoarWords(t) {
    if (t < T.roar || t > T.roar + 1.6) return
    const mx = KX, my = GROUND - 18 * 40 + camTy(t) + 20
    for (let i = 0; i < 6; i++) {
      const t0 = T.roar + 0.06 + i * 0.13, a = t - t0
      if (a < 0 || a > 0.75) continue
      const p = a / 0.75, s = lerp(0.35, 3.2, ease.inQuad(p))
      x.save(); x.globalAlpha = (1 - ease.inQuad(p)) * 0.95
      x.translate(lerp(mx, 540 + (i % 2 ? 60 : -60), p), lerp(my, 1060, p)); x.scale(s, s); x.rotate((i % 2 ? 1 : -1) * 0.06)
      x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'
      x.lineWidth = 10; x.strokeStyle = '#2a0a26'; x.strokeText('WHAT IF', 0, 0)
      x.fillStyle = i % 2 ? '#ff8fc8' : '#ffd1ea'; x.fillText('WHAT IF', 0, 0)
      x.restore()
    }
  }
  function drawPop(t, t0, text, px, py, col, size = 46) {
    const a = t - t0
    if (a < 0 || a > 1.1) return
    const k = pop01(t, t0, 0.25, 3), o = 1 - prog(a, 0.8, 1.1)
    x.save(); x.translate(px, py - a * 30); x.rotate(-0.12); x.scale(k, k); x.globalAlpha = o
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'
    x.lineWidth = 10; x.strokeStyle = '#1a1030'; x.strokeText(text, 0, 0); x.fillStyle = col; x.fillText(text, 0, 0)
    x.restore()
  }

  // ── the cast (screen space)
  function drawVirgo(t, a) {
    if (t < T.sceneIn[0]) return null
    const v = virgo(t), m = virgoMood(t)
    const pk = pop01(t, T.sceneIn[0], 0.34, 2) * a
    if (pk <= 0) return null
    const opts = { color: VIR.color, glyph: v.size >= 140 ? VIR.glyph : null, mood: m.mood, look: m.look, blink: m.blink, squash: m.sq, hops: VIR_HOPS, seed: 4, pop: pk, glow: 1 }
    drawStarChar(x, v.x, v.y, v.size, t, opts)
    // a sweat drop while it spirals
    if (inW(t, T.l3, T.g4) || inW(t, T.send, T.reply)) {
      const e = starEyes(v.x, v.y, v.size, t, { seed: 4 }), s = Math.max(4, v.size / 26), ph = (t * 1.3) % 1
      x.save(); x.globalAlpha = Math.sin(ph * Math.PI); x.fillStyle = '#9fdcff'
      const sx = v.x + v.size * 0.32, sy = e.L[1] - v.size * 0.18 + ph * 40
      x.fillRect(sx, sy, s, s * 2); x.fillRect(sx - s, sy + s, s * 3, s * 2); x.fillStyle = '#fff'; x.fillRect(sx, sy + s, s, s)
      x.restore()
    }
    // hearts on the reply
    if (inW(t, T.reply, T.reply + 1.6)) for (let i = 0; i < 6; i++) {
      const born = T.reply + i * 0.2, ag = t - born
      if (ag < 0 || ag > 1.1) continue
      x.save(); x.globalAlpha = 1 - ag / 1.1; drawPixelHeart(x, v.x + (i % 2 ? 1 : -1) * (40 + i * 10), v.y - v.size * 0.4 - ag * 120, 4, i % 2 ? '#ff4f7e' : '#ff8fc8'); x.restore()
    }
    return v
  }
  function drawStars(t) {
    if (t < T.starsIn[0] || t > T.starsOut[1]) return
    const e = ease.outCubic(prog(t, ...T.starsIn)), o = ease.inCubic(prog(t, ...T.starsOut))
    const px = lerp(1200, STARS_AT[0], e) + o * 80, py = lerp(360, STARS_AT[1], e) - o * 700
    const mood = t < T.l7 + 1.9 ? 'happy' : t < T.reply ? 'neutral' : 'wink'
    const look = t < T.plead[1] ? [-1, 1] : [-1, 1]
    drawStarChar(x, px, py, STARS_AT[2], t, { color: STAR.sky, mood, look, blink: inW(t, T.plead[0], T.plead[1]) ? 0.45 : undefined, hops: STAR_HOPS, seed: 9, glow: 1.1 })
    if (inW(t, T.l9 - 0.4, T.cardOut[1])) return
  }
  function drawStarsCard(t) {
    // the narrator peeks in for the talk card
    if (t < T.l9 - 0.4 || t > T.cardOut[1] + 0.05) return
    const k = pop01(t, T.l9 - 0.4, 0.32, 2.2) * (1 - prog(t, ...T.cardOut))
    drawStarChar(x, 905, 760, 170, t, { color: STAR.sky, mood: t < T.l9 + 1.0 ? 'happy' : 'wink', look: [-1, 1], hops: STAR_HOPS, seed: 9, pop: k })
  }
  function drawPisces(t) {
    let p = null, mood = 'sparkle', look = [0, 0], k = 1, sob = null, wind = 0, size = 112, hops = null
    if (t >= T.g2 - 1.2 && t < T.run[0]) {
      p = [1000, 1382]; k = pop01(t, T.g2 - 1.2, 0.3, 2.2); sob = [T.g2 - 0.9, T.run[0]]
      mood = FEEDS.some(F => inW(t, F.g, F.g + 0.5)) ? 'wide' : 'sparkle'; look = [-1, -1]
    } else if (t >= T.run[0] && t < T.run[1]) {
      const pp = prog(t, ...T.run)
      p = [lerp(1010, -140, pp), 1390]; mood = 'wide'; look = [-1, 0]; sob = [T.run[0], T.run[1]]; wind = 1; hops = PIS_RUN_HOPS
    } else if (t >= T.pisBack && t < T.cut3) {
      p = [1000, 1382]; k = pop01(t, T.pisBack, 0.3, 2.2); sob = [T.pisBack + 0.2, T.cut3]; mood = 'sparkle'; look = [-1, 0]
    } else if (t >= T.home[0] && t < T.out[1]) {
      p = [884, 1290]; size = 124; k = pop01(t, T.home[0] + 0.1, 0.3, 2.2) * popOut(t, [T.out[0] + 0.08, T.out[1]]); sob = [T.home[0] + 0.3, T.out[0]]; mood = 'sparkle'; look = [-1, -1]
    }
    if (!p || k <= 0) return
    const o = { color: PIS.color, glyph: null, mood, look, hops, seed: 5, pop: k, glow: 0.9 }
    drawStarChar(x, p[0], p[1], size, t, o)
    if (sob) { const e = starEyes(p[0], p[1], size, t, { seed: 5 }); tears(e, size, t, sob[0], sob[1], { gap: 0.09, spread: 0.8, wind: wind }) }
    if (t >= T.run[0] && t < T.run[1] && t > T.run[0] + 0.2) drawPop(t, T.run[0] + 0.25, 'AAAA!', p[0] + 20, p[1] - 110, '#b7b1ff', 36)
  }
  function drawPhoneAt(t) {
    if (t < T.phone[0] || t > T.phoneOut[1]) return
    const k = easeOutBack(prog(t, ...T.phone), 1.8) * (1 - ease.inCubic(prog(t, ...T.phoneOut)))
    const full = 'had fun! did you?'
    const n = Math.floor(full.length * prog(t, ...T.type))
    drawChat(x, CHAT.x, CHAT.y, CHAT.w, CHAT.h, t, { typed: t >= T.type[0] ? full.slice(0, n) : '', sent: t >= T.send, dots: t >= T.dots ? 1 : 0, reply: t >= T.reply ? 'YES!! friday again?' : '', replyK: easeOutBack(prog(t, T.reply, T.reply + 0.3), 2.4), k })
  }
  function drawTalkCard(t) {
    if (!TALK || t < T.card[0] || t > T.cardOut[1]) return
    const p = prog(t, ...T.card), e = ease.outCubic(p), o = ease.inCubic(prog(t, ...T.cardOut))
    const cx = lerp(1240, 600, e) + o * 60, cy = lerp(1500, 1000, e) - Math.sin(p * Math.PI) * 90 + Math.sin(t * 2) * 6 * e + o * 160
    const rot = lerp(1.2, 0.035, e) + 0.02 * Math.sin(t * 1.5) * e
    const w = 300 / TALK_BODY, h = w * TALK.height / TALK.width
    const gl = x.createRadialGradient(cx, cy, 0, cx, cy, 420); gl.addColorStop(0, rgba(GOLD, 0.3 * e * (1 - o))); gl.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gl; x.fillRect(cx - 420, cy - 420, 840, 840)
    x.save(); x.globalAlpha = 1 - o; x.translate(cx, cy); x.rotate(rot); x.drawImage(TALK, -w / 2, -h / 2, w, h); x.restore()
    sparkleRing(t, cx, cy, T.card[1] - 0.05, 12, 230, 0.4)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const sh = shakeAt(t)
      x.save(); x.translate(sh[0], sh[1])
      drawTitle(t)
      if (t >= T.sceneIn[0] && t < T.out[1] + 0.02) {
        const sIn = clamp(prog(t, ...T.sceneIn) * 1.4), outAll = popOut(t, T.out), a = Math.min(sIn, outAll)
        const ty = camTy(t)
        // world: the city + the kaiju
        x.save(); x.translate(0, ty + (1 - sIn) * 60)
        drawCity(t, a)
        drawGround(t, a)
        if (t < T.hop[1] || t >= T.hopHead[0]) { /* the kaiju is up on Virgo: drawn with the cast */ } else drawMonster(t, a)
        x.restore()
        // screen: the cast
        drawPisces(t)
        drawStars(t)
        drawVirgo(t, a)
        if (t < T.hop[1] || t >= T.hopHead[0]) { x.save(); x.translate(0, ty); drawMonster(t, a); x.restore() }
        drawSnacks(t)
        drawRoarWords(t)
        drawPhoneAt(t)
        drawTalkCard(t)
        drawStarsCard(t)
        // sound words
        const tip = kaijuPos(t), kp = kaijuPx(t)
        drawPop(t, T.hatch + 0.12, 'squeak!', tip[0] + 80, tip[1] - 70, KGREEN, 38)
        drawPop(t, T.squeak, 'squeak.', KX + 70, GROUND - 120, KGREEN, 42)
        drawPop(t, T.squeak2, 'squeak!', tip[0] + 90, tip[1] - 70, KGREEN, 40)
        drawPop(t, T.shrink[0] + 0.12, 'pfffft', 760, 900, BONE, 52)
        for (const F of FEEDS) drawPop(t, F.g + 0.02, 'GULP', kaijuPoint(KX, GROUND, kaijuPx(F.g + 0.4), 10.5, 7)[0] + 120 + (F.to > 30 ? 120 : 0), Math.max(560, kaijuPoint(KX, GROUND, kaijuPx(F.g + 0.4), 10.5, 4)[1] + ty), PINK, F.to > 30 ? 60 : 44)
        void kp
        if (t >= T.hatch && t < T.hatch + 0.8) sparkleRing(t, VIR_HOME[0], VIR_HOME[1] - 110, T.hatch + 0.02, 10, 120, 0.3)
        if (t >= T.shrink[1] && t < T.shrink[1] + 0.8) sparkleRing(t, KX, GROUND - 50, T.shrink[1] + 0.02, 12, 160, 0.9)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1000, T.out[0] + 0.1, 16, 420, 0.2)
      }
      x.restore()
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      const fl = t >= T.flash[0] && t < T.flash[1] ? Math.sin(Math.PI * prog(t, ...T.flash)) * 0.85 : 0
      flash.style.opacity = String(fl)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates. The default selection keeps 11.95 (the first gulp → the cat) and 30.45 (the shrink → LESSON);
// 23.1 (the colossal roar → the diet) is kept by hand. 3.25 (title → city) and 35.15 (lesson → talk card) play as the film's own beats.
export const CUTS = [3.25, T.cut1, { t: T.cut2, keep: true }, T.cut3, 35.12]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched pop/pluck/bell are moved into the key by the engine; chip/tom on a private sfx bus, written in D minor)
const D = { D3: 146.83, F3: 174.61, A3: 220, D4: 293.66, F4: 349.23, A4: 440, C5: 523.25, D5: 587.33, F5: 698.46, A5: 880, D6: 1174.66 }
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.14, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.024) => [...wordPops(t0, n, 0.07, base, gain), ...(land ? [['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]] : [])]
const stomp = (t, g = 1) => [['boom', t, 0.18 * g], ['tom', t, 58, { ...FX, gain: 0.32 * g, decay: 0.5 }], ['crash', t, { bus: 'sfx', gain: 0.0025 * g, len: 1.2 }]]
const roar = (t, len = 0.9, g = 1) => [
  ['chip', t, 196, len, { ...FX, wave: 'square', duty: 0.3, slide: -9, vib: 0.05, gain: 0.05 * g, decay: 0.5, sustain: 0.8 }],
  ['chip', t, 98, len, { ...FX, wave: 'square', duty: 0.12, slide: -7, vib: 0.04, gain: 0.04 * g, decay: 0.5, sustain: 0.8 }],
  ['chip', t, 300, len * 0.9, { ...FX, wave: 'noise', gain: 0.03 * g, decay: 0.4, sustain: 0.6 }],
  ['whoosh', t, len, 0.07 * g],
]
const squeak = (t, f = 2349) => [['chip', t, f, 0.07, { ...FX, wave: 'square', duty: 0.25, slide: 5, gain: 0.035, decay: 0.04, sustain: 0.7 }], ['chip', t + 0.09, f * 1.12, 0.09, { ...FX, wave: 'square', duty: 0.25, slide: 7, gain: 0.035, decay: 0.05, sustain: 0.7 }]]
const gulp = (t, g = 1) => [['pop', t - 0.02, 220, 0.06 * g, 0], ['chip', t, 330, 0.18, { ...FX, wave: 'tri', slide: -14, gain: 0.05 * g, decay: 0.1, sustain: 0.6 }], ['tick', t, 0.06]]
const growUp = (t, len, g = 1) => [['chip', t + 0.04, 110, len, { ...FX, wave: 'square', duty: 0.4, slide: 12, gain: 0.035 * g, decay: 0.3, sustain: 0.8 }], ['boom', t + 0.05, 0.12 * g]]
const crush = t => [['tom', t, 90, { ...FX, gain: 0.18, decay: 0.2 }], ['clap', t + 0.01, { ...FX, gain: 0.08 }], ['chip', t, 600, 0.12, { ...FX, wave: 'noise', gain: 0.02, decay: 0.08, sustain: 0.4 }]]
const crickets = t => Array.from({ length: 4 }, (_, i) => ['pop', +(t + i * 0.035).toFixed(3), 3520, 0.012, 0.5])
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const boing = (t, f) => [['chip', t, f, 0.22, { ...FX, wave: 'tri', slide: 12, vib: 0.03, gain: 0.03, decay: 0.15, sustain: 0.6 }]]
const deflate = (t, len) => [['chip', t, 1400, len, { ...FX, wave: 'tri', slide: -30, vib: 0.05, gain: 0.05, decay: 0.6, sustain: 0.9 }], ['chip', t, 900, len, { ...FX, wave: 'noise', gain: 0.022, decay: 0.6, sustain: 0.8 }], ['whoosh', t, len, 0.05]]
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.03, f0: 900, f1: 2600 }]]; for (let k = 0; k < 10; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.06, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

const PITCH = { [NAME.vir]: 1050, [NAME.stars]: 880 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // the title card
  ['riser', 0.1, T.stomp1, 0.04], ...stomp(T.stomp1), ...stomp(T.stomp2, 1.15), ['tick', T.tag, 0.05], ...wordPops(T.tag, 4, 0.06, 1, 0.02),
  ...roar(T.roar0, 0.7, 0.8),
  ['whoosh', T.titleOut[0], 0.4, 0.06], ['glitter', T.flash[0], T.flash[0] + 0.4],
  // the date went great
  ...head(T.h1, 3, T.h1Land, 0), ['bell', T.l1 + 0.2, 1174.66, 0.02, 1.2, 0.3],
  // the hatch
  ['pop', T.hatch, 1567.98, 0.05, -0.3], ['tick', T.hatch, 0.08], ...squeak(T.hatch + 0.12), ['glitter', T.hatch, T.hatch + 0.5],
  ...head(T.h2, 2, T.h2Land, 2),
  ['whoosh', T.hop[0], 0.5, 0.04], ...squeak(T.hop[1], 2093), ['pop', T.hop[1], 392, 0.03, 0],
  // the feeding
  ...head(T.h3, 4, null, 3),
  ...FEEDS.flatMap((F, i) => [['pop', F.b, NOTE[(i * 2) % 7], 0.035, -0.3], ['whoosh', F.b + 0.32, F.g - F.b - 0.36, 0.035], ...gulp(F.g, 1 + i * 0.2), ...growUp(F.g, i === 3 ? 0.5 : 0.4, 1 + i * 0.25)]),
  ...roar(T.g2 + 0.04, 0.5, 0.6), ...roar(T.g3 + 0.04, 0.55, 0.8),
  ...BUILDINGS.flatMap(b => crush(b.crush)),
  ...head(T.h4, 2, T.h4Land, 1), ...head(T.h5, 1, T.h5Land, 4), ...head(T.h5b, 2, T.h5bLand, 2),
  // colossal
  ...stomp(T.g4 + 0.02, 1.4), ['riser', T.g4 + 0.1, T.tilt[1], 0.05],
  ...roar(T.roar, 1.1, 1.3), ['crash', T.roar, { bus: 'sfx', gain: 0.004, len: 2.2 }],
  ...sob(T.run[0] + 0.1, D.D6), ...sob(T.run[0] + 0.6, D.A5), ...PIS_RUN_HOPS.map(h => ['tick', h, 0.03]),
  ...head(T.h6, 2, T.h6Land, 0),
  // the diet
  ...head(T.h7, 3, T.h7Land, 1), ['glitter', T.starsIn[0], T.starsIn[1]], ['bell', T.starsIn[1], 1174.66, 0.025, 1.6, 0.3],
  ['chip', T.plead[0], D.A5, 0.5, { ...FX, wave: 'tri', slide: -3, vib: 0.03, gain: 0.03, decay: 0.3, sustain: 0.7 }],
  ['pop', T.phone[0] + 0.1, 784, 0.03, -0.3],
  ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.type[0] + i * 0.13).toFixed(3), 0.03]),
  ['whoosh', T.send, 0.3, 0.05], ['pop', T.send, 1318.51, 0.04, -0.2],
  ['tapeStop', T.send + 0.05, +(T.reply - T.send - 0.1).toFixed(3)],
  ...crickets(T.dots - 0.1), ...crickets(T.dots + 0.35),
  ['bell', T.reply, 1567.98, 0.05, 1.4, -0.2], ['pop', T.reply, 1318.51, 0.05, -0.2], ['glitter', T.reply, T.reply + 0.5],
  // it shrinks
  ...deflate(T.shrink[0], 0.9), ...head(T.h8, 1, T.h8Land, 3), ...squeak(T.squeak, 2637),
  ...BUILDINGS.flatMap((b, i) => boing(b.rebuild, NOTE[i % 7])),
  ...sob(T.pisBack + 0.25, D.D6, 2),
  // the lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // the talk card
  ['whoosh', T.card[0], 0.45, 0.06], ['tick', T.card[1] - 0.04, 0.07], ['pop', T.card[1], 1174.66, 0.04, 0.2],
  ...head(T.h9, 2, T.h9Land, 2),
  // city saved
  ...head(T.h10, 1, T.h10Land, 0), ['whoosh', T.hopHead[0], 0.45, 0.04], ...squeak(T.squeak2, 2637), ...cheers(T.squeak2 + 0.05, T.squeak2 + 1.0), ...sob(T.home[0] + 0.4, D.D6, 2),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
