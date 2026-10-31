// sxmomtalk — THE STARS EXPLAIN IT TO YOUR MOM, ep. 3: "What's a talk card?" (45 s vertical Align ad, Star Talk Shows
// #5, music: pop, B♭). Story 0–40.6, then the shared end card.
//   0.0–4.45   MOM (♋ Cancer star: grey bun, cardigan, reading glasses) has found one of your talk cards… under her teacup.
//              "Mom found a | *talk card.*"  MOM: "I've been using it as a *coaster.*"
//   4.49       drop: "The Stars Explain It | to *Your Mom.*"  THE STARS rescue the card onto the easel (a tea ring on it).
//              'a *question.* you both answer.'  MOM: "a question? I *love* questions."
//  10.5        card cut.
//  10.55–16.6 "Both answer. | *Nobody peeks.*"  Two locked answer cards. "answers stay *hidden* till you both play."
//              Mom leans over and tries to lift a corner: CLANK, the padlock. MOM: "…not even a *little* peek?"
//  16.6–22.7  "Mom's | *turn.*"  A fresh talk card: "What's your comfort meal?" "Mom! what's your *comfort meal?*"
//              THE STARS write one word and wait, tapping; Mom writes… and writes… *scribble scribble*. Two face-down
//              answers slide in. Drumroll.
//  22.75      card cut.
//  22.8–25.2  "Both answers: | *revealed.*"  Both flip at once. THE STARS: PIZZA.  MOM: "anything, if my kids are at
//              *the table.*"
//  25.2–31.1  "The stars | are *crying.*"  "…we wrote *pizza.*"  Tears. Pisces cries hardest (and largest): "I'M NOT
//              CRYING. *YOU* ARE 😭"  Mom calmly passes the tissues round.
//  31.71–35.9 ★ LESSON UNLOCKED: "Good questions | beat good *lines.*"  +1 DEEP TALK
//  35.95      card cut.
//  36.0–38.6  "*Talk* cards."  A hand of talk cards fans out on the easel. "both answer, *then* see."
//  38.65–40.5 "Mom *wins* | again."  A tiny gold crown lands on Mom's bun; the stars sob and clap.
// One canvas (sky + set through a camera), DOM type + dialogue boxes + the shared lesson + the show bug, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'
import {
  INK, rgba, starFrame, inSprite, cellPt, FOOT, tearsCells, mom, MOM, drawArmchair, drawTeacup, drawLamp, drawRug, drawEasel,
  drawTissues, drawPointer, sparkle, blit,
} from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', ROSE = '#ff9ec4', MINT = '#7dffb0', CYAN = '#7fe0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.25],
  // 0 · the coaster
  l1: 0.85, close1: 4.4,
  // 1 · title
  drop: BEAT(7), easel: [4.5, 5.1], stars: 4.95, rescue: [5.0, 5.6], pis: 6.0, l2: 5.05, l3: 7.82, close2: 10.48,
  cut1: 10.5,
  // 2 · nobody peeks
  backs: 10.9, l4: 11.1, peek: [13.0, 13.9], clank: 13.6, l5: 14.2, close3: 16.6,
  // 3 · Mom's turn
  qcard: [16.75, 17.25], l6: 17.0, write: [19.4, 21.0], starsDone: 19.6, slide: [21.0, 21.4], drum: [21.6, 22.75], close4: 19.95,
  cut2: 22.75,
  // 4 · the reveal + the tears
  flip: [22.95, 23.3], l7: 23.45, l8: 26.45, well: 25.6, l9: 28.55, tissues: [29.3, 29.75, 30.2], close5: 31.2,
  // 5 · lesson
  lesson: BEAT(56), lessonOut: [35.7, 35.9],
  cut3: 35.95,
  // 6 · tie-in
  fan: [36.15, 36.45, 36.75], l10: 36.05, close6: 38.6,
  // 7 · last line
  crown: [38.75, 39.1], out: [40.3, 40.55],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Good questions | beat good *lines.*', chip: '+1 DEEP TALK' }

// ── the dialogue
const MT = '♋︎ MOM', ST = 'THE STARS', PT = '♓︎ PISCES'
const MC = '#8fdcff', SCOL = GOLD
const LINES1 = [{ t: T.l1, speaker: MT, color: MC, text: "I've been using it as a *coaster.*" }]
const LINES2 = [
  { t: T.l2, speaker: ST, color: SCOL, text: 'a *question.* you both answer.' },
  { t: T.l3, speaker: MT, color: MC, text: 'ooh. I *love* questions.' },
]
const LINES3 = [
  { t: T.l4, speaker: ST, color: LAV, text: 'answers stay *hidden* till you both play.' },
  { t: T.l5, speaker: MT, color: MC, text: '…not even a *little* peek?' },
]
const LINES4 = [{ t: T.l6, speaker: ST, color: SCOL, text: "Mom! what's your *comfort meal?*" }]
const LINES5 = [
  { t: T.l7, speaker: MT, color: ROSE, text: 'anything, if my kids are at *the table.*' },
  { t: T.l8, speaker: ST, color: '#ffb36b', text: '…we wrote *pizza.*' },
  { t: T.l9, speaker: PT, color: LAV, text: "I'M NOT CRYING. *YOU* ARE 😭" },
]
const LINES6 = [{ t: T.l10, speaker: ST, color: SCOL, text: 'both answer, *then* see.' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5, ...LINES6]
const CPS = 28
export const BOXES = [[LINES1, T.close1], [LINES2, T.close2], [LINES3, T.close3], [LINES4, T.close4], [LINES5, T.close5], [LINES6, T.close6]]

// ── headlines
const HEADS = [
  { text: 'Mom found a | *talk card.*', top: 150, size: 100, accentSize: 156, at: 0.3, late: 2, lateAt: 0.8, lateGap: 0.12, accentColor: ROSE, out: [4.1, 4.3] },
  { text: 'The Stars Explain It | to *Your Mom.*', top: 150, size: 88, accentSize: 140, at: T.drop + 0.05, gap: 0.08, late: 2, lateAt: BEAT(8), lateGap: 0.14, accentColor: ROSE, out: [10.1, 10.3], fit: true },
  { text: 'Both answer. | *Nobody peeks.*', top: 150, size: 100, accentSize: 150, at: 10.62, gap: 0.08, late: 2, lateAt: 10.95, lateGap: 0.12, accentColor: LAV, out: [16.35, 16.55], fit: true },
  { text: 'Mom’s | *turn.*', top: 150, size: 110, accentSize: 176, at: 16.65, late: 1, lateAt: 16.95, accentColor: GOLD, out: [22.45, 22.65] },
  { text: 'Both answers: | *revealed.*', top: 150, size: 100, accentSize: 156, at: 22.85, gap: 0.08, late: 1, lateAt: T.flip[1], accentColor: MINT, out: [25.15, 25.3] },
  { text: 'The stars | are *crying.*', top: 140, size: 96, accentSize: 146, at: 25.4, late: 2, lateAt: T.well, lateGap: 0.14, accentColor: CYAN, out: [30.95, 31.1] },
  { text: '*Talk* cards.', top: 170, size: 116, accentSize: 176, at: 36.05, late: 0, accentColor: GOLD, out: [38.4, 38.55] },
  { text: 'Mom *wins* | again.', top: 150, size: 112, accentSize: 176, at: 38.65, gap: 0.08, late: 2, lateAt: T.crown[1], lateGap: 0.16, accentColor: GOLD, out: [40.3, 40.5] },
]
function headTimes(h) {
  const ws = h.text.trim().split(/\s+/).filter(w => w && w !== '|'), nW = ws.length, late = h.late || 0, gap = h.gap ?? 0.07, lateGap = h.lateGap ?? 0.1
  return ws.map((_, n) => { const big = late > 0 && n >= nW - late; return { t: big ? h.lateAt + (n - (nW - late)) * lateGap : h.at + n * gap, big } })
}

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── camera
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic }
const IDN = [1, 540, 960, 540, 960]
const CAM = [
  [0, 1.2, 470, 1120, 540, 1100],
  [4.3, 1.22, 470, 1120, 540, 1100, 'lin'],
  [5.0, ...IDN, 'io'],
  // the peek: a quick push onto the padlock
  [12.9, ...IDN, 'lin'], [13.3, 1.18, 560, 760, 540, 900, 'io'], [14.1, 1.18, 560, 760, 540, 900, 'lin'], [14.6, ...IDN, 'io'],
]
function cam(t) {
  let i = 0
  while (i + 1 < CAM.length && CAM[i + 1][0] <= t) i++
  const a = CAM[i], b = CAM[i + 1]
  if (!b) return { z: a[1], fx: a[2], fy: a[3], sx: a[4], sy: a[5] }
  const e = (EZ[b[6]] || EZ.io)(prog(t, a[0], b[0]))
  return { z: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e), sx: lerp(a[4], b[4], e), sy: lerp(a[5], b[5], e) }
}

// ── the set
const FLOOR = 1352
const MOM_AT = { x: 270, size: 300 }, MOM_BASE = 1252
const STARS_AT = { x: 870, size: 240 }
const EASEL = { cx: 560, top: 440, w: 680, h: 470 }
const PIS_AT = { x: 985, y: 500, s: 112 }
const TABLE = { x: 640, top: 1130 }
const SLOT_Y = 650, AW = 200, AH = 290
const SL = 350, SM = 560, SR = 770

// ── moods
function momState(t) {
  const st = { mood: 'neutral', look: [1, -1], glassesDown: 0, blink: undefined, squash: 0, lean: 0 }
  if (t < T.drop) { st.mood = t < 2.2 ? 'neutral' : 'wink'; st.look = t < 2.2 ? [1, 1] : [0, 0]; st.glassesDown = 0.6; return st }
  if (t < T.l3) { st.mood = t < T.rescue[1] + 0.4 ? 'wide' : 'neutral'; st.look = [1, -1]; return st }
  if (t < T.cut1) { st.mood = 'sparkle'; st.look = [0, 0]; return st }
  if (t < T.peek[0]) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.l5) { st.mood = t < T.clank ? 'squint' : 'wide'; st.look = [1, -1]; st.lean = Math.sin(Math.PI * prog(t, T.peek[0], T.peek[1] + 0.3)); st.blink = false; return st }
  if (t < T.close3) { st.mood = 'wink'; st.look = [0, 0]; return st }
  if (t < T.write[0]) { st.mood = 'sparkle'; st.look = [1, -1]; return st }
  if (t < T.write[1]) { st.mood = 'squint'; st.look = [1, 1]; st.glassesDown = 0.6; return st }
  if (t < T.cut2) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.l8) { st.mood = 'happy'; st.look = [0, 0]; return st }
  if (t < T.lesson) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.crown[0]) { st.mood = 'happy'; return st }
  st.mood = 'wink'; st.look = [0, 0]
  return st
}
function starsState(t) {
  const st = { mood: 'happy', look: [-1, -1], blink: undefined, squash: 0, point: -1, tears: 0, pencil: 0 }
  if (t < T.l3 - 0.5) { st.mood = 'happy'; st.look = [-1, 0]; return st }
  if (t < T.cut1) { st.mood = 'heart'; st.look = [-1, 0]; return st }
  if (t < T.peek[0]) { st.point = 0; return st }
  if (t < T.l5) { st.mood = t < T.clank ? 'wide' : 'squint'; st.look = [-1, 0]; return st }
  if (t < T.close3) { st.mood = 'eyeroll'; st.look = [-1, -1]; return st }
  if (t < T.write[0]) { st.point = 1; return st }
  if (t < T.write[1]) { st.mood = t < T.starsDone ? 'squint' : 'neutral'; st.look = [-1, 0]; st.pencil = 1; return st }
  if (t < T.cut2) { st.mood = 'wide'; st.look = [-1, -1]; st.blink = false; return st }
  if (t < T.well) { st.mood = t < T.flip[1] + 0.3 ? 'wide' : 'neutral'; st.look = [-1, -1]; return st }
  if (t < T.l8) { st.mood = 'sparkle'; st.look = [-1, 0]; st.tears = 1; return st }
  if (t < T.lesson) { st.mood = 'sparkle'; st.look = [-1, 0]; st.tears = t < T.l9 ? 2 : 3; return st }
  if (t < T.cut3) { st.mood = 'sparkle'; st.tears = 2; return st }
  if (t < T.close6) { st.point = 2; st.mood = 'happy'; return st }
  st.mood = 'sparkle'; st.look = [-1, 0]; st.tears = 3
  return st
}
function pisState(t) {
  const st = { mood: 'sparkle', look: [-1, 0], tears: 1, k: pop01(t, T.pis, 0.35, 2.2), s: PIS_AT.s, x: PIS_AT.x, y: PIS_AT.y }
  if (t >= T.well - 0.4 && t < T.lesson) {
    const g = ease.outBack(prog(t, T.l9 - 0.4, T.l9 + 0.1))
    st.tears = 3; st.s = PIS_AT.s * (1 + 0.4 * g); st.x = PIS_AT.x + 12 * g; st.y = PIS_AT.y + 40 * g
  } else if (t >= T.flip[1]) st.tears = 2
  if (t >= T.crown[0]) st.tears = 3
  return st
}

const hopsOf = sp => talkHops(ALL_LINES, sp, { cps: CPS })
const M_HOPS = [...hopsOf(MT), T.clank, T.crown[1], T.crown[1] + 0.45]
const S_HOPS = [...hopsOf(ST), T.stars + 0.3, T.rescue[1], T.backs, T.starsDone, T.starsDone + 0.6, T.starsDone + 1.0, T.flip[1], T.lesson + 0.2, ...T.fan, T.crown[1] + 0.1, T.crown[1] + 0.5, T.crown[1] + 0.9]
const P_HOPS = [...hopsOf(PT), T.pis + 0.4, T.flip[1] + 0.2, T.crown[1] + 0.2, T.crown[1] + 0.6]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 34px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, h) => { if (!im) return null; const c = document.createElement('canvas'); c.height = h; c.width = Math.round(h * im.width / im.height); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const ims = await Promise.all(['card-talk-1.png', 'card-talk-5.png', 'card-back.png', 'card-talk-2.png', 'card-talk-6.png', 'card-talk-3.png'].map(loadImg))
  const [cHill, cMeal, cBack, cMorn, cPlan, cSun] = ims.map(im => bake(im, 640))

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1480, width: 960, height: 250, cps: CPS }
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { ...BOX, lines, open: lines[0].t - 0.2, close }))
  const bug = el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: ROSE, textShadow: '0 2px 10px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', pointerEvents: 'none' }, root)
  bug.innerHTML = 'EXPLAIN IT TO MOM<span style="color:rgba(255,255,255,0.6)"> · EP 3</span>'
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.6 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const withCam = (C, fn) => { x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z, C.sy - C.fy * C.z); fn(); x.restore() }
  const text = (s, X, Y, font, col, align = 'left') => { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, X, Y) }
  function card(im, cx, cy, h, { rot = 0, sx = 1, sy = 1, glow = 0, alpha = 1 } = {}) {
    if (!im || alpha <= 0) return
    const w = h * im.width / im.height
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
    if (glow > 0) { x.shadowColor = rgba(GOLD, 0.8 * glow); x.shadowBlur = 40 * glow }
    x.drawImage(im, -w / 2, -h / 2, w, h); x.restore()
  }
  /** a coffee/tea ring on a card (the coaster callback) */
  function teaRing(cx, cy, r) { x.strokeStyle = 'rgba(201,138,74,0.75)'; x.lineWidth = r * 0.16; x.beginPath(); x.arc(cx, cy, r, 0.3, Math.PI * 1.85); x.stroke() }
  function padlock(cx, cy, s, shake = 0) {
    x.save(); x.translate(cx + Math.sin(shake * 40) * 8 * shake, cy); x.rotate(Math.sin(shake * 30) * 0.2 * shake)
    blit(x, ['..KKKK..', '.K....K.', '.K....K.', 'GGGGGGGG', 'GGGKKGGG', 'GGGKKGGG', 'GGGGGGGG'], { K: '#c9c2d8', G: GOLD }, 0, 0, s)
    x.restore()
  }
  /** an answer card: face-down (card back + lock) → flips to a cream answer card */
  function answer(cx, who, t, { at, flipAt = null, lock = 0, shake = 0, body = null }) {
    const k = pop01(t, at, 0.4, 1.8)
    if (k <= 0) return
    const fp = flipAt == null ? 0 : prog(t, flipAt, flipAt + 0.35), sx = Math.abs(Math.cos(Math.PI * fp)) || 0.001
    const face = fp >= 0.5
    x.save(); x.translate(cx, SLOT_Y); x.scale(k * sx, k)
    if (!face) {
      card(cBack, 0, 0, AH)
      if (lock > 0) padlock(0, 0, 9, shake)
    } else {
      x.fillStyle = INK; x.fillRect(-AW / 2 - 6, -AH / 2 - 6, AW + 12, AH + 12)
      x.fillStyle = '#fbf3e6'; x.fillRect(-AW / 2, -AH / 2, AW, AH)
      x.fillStyle = who.col; x.fillRect(-AW / 2, -AH / 2, AW, 46)
      text(who.tag, 0, -AH / 2 + 24, `700 22px ${MONO}`, INK, 'center')
      body(t)
    }
    x.restore()
    text(who.lbl, cx, SLOT_Y + AH / 2 + 36, `700 26px ${MONO}`, who.col, 'center')
  }

  function room(t) {
    const g = x.createRadialGradient(400, FLOOR, 40, 400, FLOOR, 700); g.addColorStop(0, 'rgba(255,180,140,0.16)'); g.addColorStop(1, 'rgba(255,180,140,0)')
    x.fillStyle = g; x.fillRect(-300, FLOOR - 500, W + 600, 900)
    drawRug(x, 520, FLOOR + 6, 560, 64)
    drawLamp(x, 66, FLOOR - 10, 6, t, 1)
  }
  // the hook: a little side table, the talk card lying under Mom's teacup
  function sideTable(t) {
    if (t >= T.easel[1] + 0.3) return
    const o = ease.inCubic(prog(t, T.easel[0], T.easel[1] + 0.3))
    x.save(); x.translate(o * 900, 0)
    blit(x, ['TTTTTTTTTTTTTTTTTTTTTT', 'tttttttttttttttttttttt', '.L..................L.', '.L..................L.', '.L..................L.', '.L..................L.', '.L..................L.', '.L..................L.', '.L..................L.'], { T: '#a8742a', t: '#8a5a2c', L: '#5a3424' }, TABLE.x, TABLE.top + 80, 12)
    x.restore()
    // the card on the table, foreshortened; it flies up to the easel on the rescue
    const rp = ease.inOutCubic(prog(t, ...T.rescue))
    if (rp < 1) {
      const cx = lerp(TABLE.x + o * 900, SM, rp), cy = lerp(TABLE.top + 10, SLOT_Y, rp)
      card(cHill, cx, cy, lerp(400, 220, rp), { sy: lerp(0.5, 1, rp), rot: lerp(-0.08, 0.9, Math.sin(Math.PI * rp) * 0.6) })
      if (rp <= 0) teaRing(cx + 6, cy - 2, 44)
    }
    // the teacup: on the card, then (rescue) it drops to the bare table with a clink
    if (t < T.easel[1] + 0.3) drawTeacup(x, TABLE.x + 4 + o * 900, TABLE.top - 44 + (rp > 0 ? 8 : 0), 11, t, {})
  }
  function board(t) {
    if (t < T.easel[0]) return
    const slide = (1 - ease.outBack(prog(t, ...T.easel))) * 900
    x.save(); x.translate(slide, 0)
    const B = drawEasel(x, EASEL.cx, EASEL.top, EASEL.w, EASEL.h)
    const tieIn = t >= T.cut3
    if (!tieIn) {
      // the centre: the question. First the coaster card (with its tea ring), then the comfort-meal card
      const q2 = prog(t, ...T.qcard)
      if (t >= T.rescue[1]) {
        if (q2 < 0.5) { const s = 1 - q2 * 2; card(cHill, SM, SLOT_Y, 220, { sx: Math.max(0.001, s), rot: 0.02 }); if (s > 0.6) teaRing(SM + 6, SLOT_Y + 50, 30) }
        else card(cMeal, SM, SLOT_Y, 230, { sx: Math.max(0.001, (q2 - 0.5) * 2), glow: q2 >= 1 && t < T.cut2 ? 0.6 : 0 })
      }
      sparkle(x, t, SM, SLOT_Y, T.rescue[1], { n: 8, R: 130, size: 20 })
      // the two answers
      const round2 = t >= T.qcard[0]
      const L = round2 ? { tag: 'ANSWER', lbl: 'THE STARS', col: GOLD } : { tag: 'ANSWER', lbl: 'YOU', col: ROSE }
      const R = round2 ? { tag: 'ANSWER', lbl: 'MOM', col: '#8fdcff' } : { tag: 'ANSWER', lbl: 'THEM', col: LAV }
      const shake = bump(t, T.clank, 0.5)
      if (!round2) {
        answer(SL, L, t, { at: T.backs, lock: 1 })
        answer(SR, R, t, { at: T.backs + 0.15, lock: 1, shake })
        // Mom's peek: the corner of the right card lifts… CLANK
        if (inR(t, T.peek[0], T.clank + 0.2)) { const lp = Math.sin(Math.PI * prog(t, T.peek[0], T.clank + 0.2)); x.fillStyle = '#fbf3e6'; x.beginPath(); x.moveTo(SR - AW / 2, SLOT_Y + AH / 2); x.lineTo(SR - AW / 2 + 70 * lp, SLOT_Y + AH / 2); x.lineTo(SR - AW / 2, SLOT_Y + AH / 2 - 70 * lp); x.fill() }
      } else {
        const slideK = i => ease.outBack(prog(t, T.slide[0] + i * 0.2, T.slide[0] + i * 0.2 + 0.35))
        if (t >= T.slide[0]) {
          const drum = inR(t, ...T.drum) ? Math.sin(t * 50) * 3 : 0
          x.save(); x.translate((1 - slideK(0)) * -500, drum)
          answer(SL, L, t, { at: T.slide[0] - 0.4, flipAt: T.flip[0], lock: 1, body: () => {
            x.save(); x.rotate(-0.08); text('PIZZA.', 0, 20, `700 46px ${MONO}`, '#c9502a', 'center'); x.restore()
            blit(x, ['....Y....', '...YRY...', '..YYYYY..', '.YRYYYRY.', 'YYYYYYYYY', 'CCCCCCCCC'], { Y: '#f7c35a', R: '#d8452a', C: '#c98a4a' }, 0, 90, 8)
          } })
          x.restore()
          x.save(); x.translate((1 - slideK(1)) * 500, -drum)
          answer(SR, R, t, { at: T.slide[0] - 0.4, flipAt: T.flip[0] + 0.12, lock: 1, body: () => {
            const L4 = ['anything,', 'if my kids', 'are at', 'the table.']
            L4.forEach((s, i) => text(s, 0, -AH / 2 + 92 + i * 44, `italic 600 36px ${SERIF}`, '#4a2a3a', 'center'))
            blit(x, ['.R.R.', 'RRRRR', '.RRR.', '..R..'], { R: '#ff6b9a' }, 0, AH / 2 - 34, 6)
          } })
          x.restore()
        }
        sparkle(x, t, SL, SLOT_Y, T.flip[1], { n: 8, R: 150, size: 22, seed: 2 })
        sparkle(x, t, SR, SLOT_Y, T.flip[1] + 0.12, { n: 10, R: 170, size: 26, seed: 5, cols: [ROSE, GOLD, BONE, MINT] })
      }
    } else {
      // tie-in: a hand of talk cards fans out across the board
      const HAND = [cMorn, cSun, cPlan]
      HAND.forEach((im, i) => {
        const p = ease.outBack(prog(t, T.fan[i], T.fan[i] + 0.4))
        if (p <= 0) return
        const a = (i - 1) * 0.28
        card(im, lerp(SM, SM + (i - 1) * 190, p), lerp(SLOT_Y + 400, SLOT_Y + 20 + Math.abs(i - 1) * 24, p), 300, { rot: a * p, glow: i === 1 ? 0.5 : 0 })
        sparkle(x, t, SM + (i - 1) * 190, SLOT_Y, T.fan[i] + 0.3, { n: 7, R: 110, size: 18, seed: i })
      })
    }
    x.restore()
  }
  function cast(t) {
    drawArmchair(x, MOM_AT.x, 1100, 14)
    const M = momState(t)
    const momY = MOM_BASE - FOOT * MOM_AT.size
    const mx = MOM_AT.x + 40 * M.lean
    const F = mom(x, mx, momY - 30 * M.lean, MOM_AT.size, t, { mood: M.mood, look: M.look, blink: M.blink, glassesDown: M.glassesDown, hops: M_HOPS, seed: 2, squash: M.squash - 0.08 * M.lean })
    const hand = cellPt(F, 33, 21)
    if (t >= T.easel[1] + 0.3) drawTeacup(x, hand.x + 18, hand.y, 9, t, {})
    if (t >= T.well - 1) drawTissues(x, 130, 1222, 7, t)
    // Mom's pencil: scribble scribble
    if (inR(t, T.write[0], T.write[1])) {
      const w = Math.sin(t * 34) * 10, pp = cellPt(F, 2, 18)
      x.save(); x.translate(pp.x - 10 + w, pp.y + 20); x.rotate(-0.6)
      blit(x, ['P', 'Y', 'Y', 'Y', 'Y', 'Y', 'W', 'K'], { P: '#ff8fb1', Y: '#f7c35a', W: '#e8c79a', K: INK }, 0, 0, 8); x.restore()
      x.save(); x.translate(270, 950); x.rotate(-0.08); x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 8; x.strokeStyle = INK
      const s = '*scribble scribble*'; x.strokeText(s, 0, 0); x.fillStyle = '#fff2a8'; x.fillText(s, 0, 0); x.restore()
    }
    // tissues, passed round
    T.tissues.forEach((t0, i) => {
      if (!inR(t, t0, t0 + 0.5)) return
      const p = prog(t, t0, t0 + 0.5), tgt = i === 1 ? { x: PIS_AT.x - 40, y: PIS_AT.y + 40 } : { x: STARS_AT.x, y: 1060 }
      const tx = lerp(150, tgt.x, p), ty = lerp(1180, tgt.y, p) - Math.sin(Math.PI * p) * 420
      x.save(); x.translate(tx, ty); x.rotate(p * 9); blit(x, ['..WW..', '.WWWW.', 'WWWWWW', '.WWWW.'], { W: '#ffffff' }, 0, 0, 8); x.restore()
    })
    // the crown
    if (t >= T.crown[0]) {
      const p = prog(t, ...T.crown), top = cellPt(F, 18, -6)
      const cy = lerp(top.y - 500, top.y, easeOutBack(p, 2.4))
      blit(x, ['Y..Y..Y', 'YY.Y.YY', 'YYYYYYY', 'YRYGYRY', 'YYYYYYY'], { Y: GOLD, R: '#ff6b9a', G: '#7fe0ff' }, top.x + 8, cy, 14)
      sparkle(x, t, top.x, top.y, T.crown[1], { n: 10, R: 120, size: 22, seed: 4 })
    }
    // THE STARS + pointer + pencil
    const S = starsState(t), sk = pop01(t, T.stars, 0.4, 2.2)
    if (sk > 0) {
      const sY = 1300 - FOOT * STARS_AT.size
      const o = { color: STAR.sky, mood: S.mood, look: S.look, blink: S.blink, hops: S_HOPS, seed: 5, pop: sk, squash: S.squash }
      const SF = starFrame(STARS_AT.x, sY, STARS_AT.size, t, o)
      if (S.point >= 0 && sk >= 1) {
        const from = cellPt(SF, 4, 14), tgt = S.point === 0 ? { x: SL, y: SLOT_Y + 120 } : { x: SM + 40, y: SLOT_Y + 110 }
        drawPointer(x, from.x, from.y, tgt.x + 40, tgt.y + Math.sin(t * 5) * 6)
      }
      drawStarChar(x, STARS_AT.x, sY, STARS_AT.size, t, o)
      if (S.tears) inSprite(x, SF, () => tearsCells(x, t, S.tears))
      if (S.pencil) {
        const pp = cellPt(SF, 3, 16), tap = t > T.starsDone ? Math.abs(Math.sin(t * 9)) * 12 : Math.sin(t * 40) * 8
        x.save(); x.translate(pp.x - 20, pp.y + tap); x.rotate(0.5)
        blit(x, ['P', 'Y', 'Y', 'Y', 'Y', 'Y', 'W', 'K'], { P: '#ff8fb1', Y: '#7fe0ff', W: '#e8c79a', K: INK }, 0, 0, 8); x.restore()
        if (t > T.starsDone) { x.save(); x.translate(760, 980); x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('*tap tap*', 0, 0); x.fillStyle = GOLD; x.fillText('*tap tap*', 0, 0); x.restore() }
      }
    }
  }
  function pisces(t) {
    const P = pisState(t)
    if (P.k <= 0) return
    const o = { color: PIS.color, glyph: null, mood: P.mood, look: P.look, hops: P_HOPS, seed: 9, pop: P.k }
    drawStarChar(x, P.x, P.y, P.s, t, o)
    inSprite(x, starFrame(P.x, P.y, P.s, t, o), () => tearsCells(x, t, P.tears))
  }
  function clankFx(t) {
    const k = bump(t, T.clank, 0.55)
    if (k <= 0) return
    x.save(); x.translate(SR + 40, SLOT_Y - 190); x.rotate(0.12); x.scale(k, k)
    x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = INK; x.strokeText('CLANK', 0, 0); x.fillStyle = '#fff2a8'; x.fillText('CLANK', 0, 0); x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t)
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * (1 + (C.z - 1) * 0.12), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) } })
      withCam(C, () => {
        room(t)
        board(t)
        pisces(t)
        cast(t)
        sideTable(t)
        clankFx(t)
      })
      const fade = prog(t, ...T.out)
      if (fade > 0) { x.fillStyle = `rgba(5,4,12,${ease.inQuad(fade)})`; x.fillRect(0, 0, W, H) }
      for (const b of boxes) b.update(t)
      for (const h of heads) h.pt.update(t, outK(t, h.out))
      bug.style.opacity = String(clamp(prog(t, 0.3, 0.8)) * (1 - prog(t, ...T.out)))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps indices 1, 3, 5 → 10.5, 22.75, 35.95)
export const CUTS = [4.45, T.cut1, 16.62, T.cut2, 25.3, T.cut3, 38.62]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]
export const _T = T, _LESSON = LESSON, _HEADS = HEADS
void lessonTimes; void lineTimes

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { Bb2: 116.54, F3: 174.61, Bb3: 233.08, D4: 293.66, F4: 349.23, Bb4: 466.16, Eb4: 311.13, G3: 196.0 }
const r3 = v => +v.toFixed(3)
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const sob = t0 => [0, 0.16, 0.3].map((d, i) => ['chip', r3(t0 + d), 760 - i * 60, 0.13, { duty: 0.5, slide: -6, vib: 0.06, gain: 0.014, decay: 0.1, sustain: 0.5, rev: 0.25, dly: 0, bus: 'fx' }])
const bigSob = t0 => [0, 0.2, 0.42, 0.66].map((d, i) => ['chip', r3(t0 + d), 880 - i * 70, 0.18, { duty: 0.5, slide: -8, vib: 0.1, gain: 0.02, decay: 0.14, sustain: 0.5, rev: 0.3, dly: 0, bus: 'fx' }])
const drumroll = [], scribble = []
for (let tt = T.drum[0]; tt < T.drum[1] - 0.02; tt += 0.055) drumroll.push(['tick', r3(tt), r3(0.02 + 0.03 * (tt - T.drum[0]) / (T.drum[1] - T.drum[0]))])
for (let tt = T.write[0]; tt < T.write[1]; tt += 0.07) scribble.push(['chip', r3(tt), r3(2600 + ((tt * 997) % 1) * 900), 0.05, { wave: 'noise', gain: 0.008, decay: 0.04, sustain: 0.3, rev: 0, dly: 0, bus: 'fx' }])
export const CUES = [
  // 0 · the coaster
  ...headCues(HEADS[0]), ['tick', 0.5, 0.03], ['pop', 2.3, 784, 0.03, 0],
  ['riser', 3.4, 4.47, 0.04],
  // 1 · title
  ['boom', T.drop, 0.3], ['brass', T.drop, [N.Bb2, N.F3, N.Bb3, N.D4], 0.9, { gain: 0.04, bright: 1.15, ...FXB }],
  ...headCues(HEADS[1]),
  ['whoosh', T.easel[0], 0.5, 0.06], ['tom', T.easel[1], 110, { gain: 0.2, decay: 0.3, rev: 0.3, bus: 'fx' }],
  ['whoosh', T.rescue[0], 0.5, 0.05], ['pop', T.rescue[1], 1174.66, 0.04, 0], ['bell', r3(T.rescue[0] + 0.05), 1567.98, 0.02, 0.6, 0.4],   // the cup's clink
  ['pop', T.stars, 988, 0.04, 0.4], ['glitter', T.stars, r3(T.stars + 0.6)],
  ['pop', T.pis, 880, 0.03, 0.6], ...sob(T.pis + 0.4),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [MT]: 659.25, [ST]: 880, [PT]: 1174.66 } }),
  // 2 · nobody peeks
  ...headCues(HEADS[2]), ['whoosh', T.backs, 0.3, 0.04], ['tick', r3(T.backs + 0.3), 0.04], ['tick', r3(T.backs + 0.45), 0.04],
  ['chip', T.peek[0], 400, 0.8, { wave: 'tri', slide: 6, gain: 0.015, decay: 0.7, sustain: 0.6, rev: 0.2, dly: 0, bus: 'fx' }],
  ['tom', T.clank, 180, { gain: 0.3, decay: 0.2, rev: 0.3, bus: 'fx' }], ['chip', T.clank, 1400, 0.25, { duty: 0.125, slide: -10, gain: 0.03, decay: 0.2, sustain: 0.3, rev: 0.3, dly: 0, bus: 'fx' }], ['tick', T.clank, 0.07],
  // 3 · Mom's turn
  ...headCues(HEADS[3]), ['whoosh', T.qcard[0], 0.35, 0.04], ['pop', T.qcard[1], 1318.51, 0.04, 0], ['glitter', T.qcard[1], r3(T.qcard[1] + 0.5)],
  ...scribble, ['pop', T.starsDone, 1567.98, 0.035, 0.5], ...[0, 1, 2, 3, 4].map(i => ['tick', r3(T.starsDone + 0.4 + i * 0.33), 0.035]),
  ['whoosh', T.slide[0], 0.3, 0.04], ['whoosh', r3(T.slide[0] + 0.2), 0.3, 0.04], ...drumroll,
  // 4 · reveal + tears
  ['boom', T.flip[1], 0.3], ['brass', T.flip[1], [N.Bb3, N.D4, N.F4, N.Bb4], 0.7, { gain: 0.045, bright: 1.2, ...FXB }], ['glitter', T.flip[1], r3(T.flip[1] + 0.8)],
  ...headCues(HEADS[4]),
  ['strings', T.well, 31.0, [N.Bb3, N.D4, N.F4, N.Bb4], { gain: 0.01, attack: 0.9, release: 1.2, rev: 0.6, bus: 'fx' }],
  ...headCues(HEADS[5]), ...sob(T.well + 0.3), ...sob(27.6), ...bigSob(T.l9 - 0.3), ...bigSob(T.l9 + 1.4),
  ...T.tissues.flatMap(t0 => [['whoosh', t0, 0.4, 0.03], ['pop', r3(t0 + 0.5), 1046.5, 0.025, 0.4]]),
  // 5 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Bb' }),
  // 6 · tie-in
  ...headCues(HEADS[6]), ...T.fan.flatMap((f, i) => [['whoosh', f, 0.3, 0.035], ['pop', r3(f + 0.35), NOTE[3 + i], 0.04, (i - 1) * 0.4]]),
  // 7 · last line
  ['whoosh', T.crown[0], 0.35, 0.05], ['bell', T.crown[1], 1174.66, 0.04, 1.4, 0], ['glitter', T.crown[1], r3(T.crown[1] + 0.8)],
  ...headCues(HEADS[7]), ['brass', T.crown[1], [N.Bb3, N.D4, N.F4, N.Bb4], 0.6, { gain: 0.04, bright: 1.2, ...FXB }], ...bigSob(T.crown[1] + 0.3),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
