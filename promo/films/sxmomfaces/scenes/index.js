// sxmomfaces — THE STARS EXPLAIN IT TO YOUR MOM, ep. 2: "Why are there no photos?" (45 s vertical Align ad, Star Talk
// Shows #5, music: cinematic, A♭). Story 0–40.6, then the shared end card.
//   0.0–4.45   MOM (♋ Cancer star: grey bun, cardigan, reading glasses, tea) holds your phone up to her nose: tonight's
//              top card is veiled. She shakes the phone, in case the photo falls out. "Wait. | No *photos?*"
//              MOM: "where are the *photos?!*"
//   4.49       drop: "The Stars Explain It | to *Your Mom.*"  The easel rolls in with three empty slots; THE STARS pop up.
//              MOM: "how do you know they're *CUTE?*"  THE STARS: "that's the point. *watch.*"
//  10.5        card cut.
//  10.55–16.6 "Step one: | *the card.*"  A blind mystery card in slot 1. "first: their sign. their *vibe.*"
//              MOM squints: "a Virgo. slow burn. *go on.*"
//  16.6–22.7  "Step two: | *the talk.*"  A talk card in slot 2 (a perfect lazy Sunday). "then you *talk.* real questions."
//              MOM: "'lazy Sunday?' ooh. I *like* this."  Pisces sobs at the question.
//  22.75      card cut.
//  22.8–25.4  "Step three: | *the face.*"  Slot 3: a card back with a big ? "and the face comes *last.*"  Soap snap-zooms
//              (DUN DUN DUN) on Mom: "*LAST?!*"
//  25.5–33.6  The camera pushes in; a sepia memory bubble: a crowded room, string lights, a laugh drifting across.
//              "Mom has | *a story.*"  MOM: "I heard your dad's *laugh* first." … "across the room. *then* I saw him."
//              … "…oh. I *invented* this."  THE STARS sob; Pisces fountains.
//  34.35      card cut.
//  34.49–38.55 ★ LESSON UNLOCKED: "Fall for the | *person* first."  +1 FAMILY APPROVED
//  38.6–40.5  "Card first. | *Face* last."  Slot 3 flips: the face, revealed at last. Mom: heart eyes, thumbs-up hop.
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
  drawTissues, drawPhone, drawPointer, sparkle, blit,
} from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', ROSE = '#ff9ec4', SEPIA = '#e8c79a'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.25],
  // 0 · the hook
  phone: [0.2, 0.7], l1: 0.85, shake: [2.6, 3.5], phoneOut: [4.0, 4.4], close1: 4.4,
  // 1 · title
  drop: BEAT(7), easel: [4.5, 5.1], stars: 4.95, pis: 6.0, l2: 5.15, l3: 7.7, close2: 10.48,
  cut1: 10.5,
  // 2 · step one: the card
  card1: 10.9, l4: 11.1, l5: 13.5, close3: 16.6,
  // 3 · step two: the talk
  card2: 16.85, l6: 17.0, l7: 19.8, sob: 20.9, close4: 22.7,
  cut2: 22.75,
  // 4 · step three: the face
  card3: 22.95, l8: 23.05, zooms: [24.4, 24.65, 24.9], last: 24.4,
  close5: 25.45,
  // 5 · the story
  push: [25.5, 26.4], bubble: [25.9, 26.4], l9: 25.9, laugh: [26.6, 30.6], l10: 28.55, l11: 31.47, cry: 30.4, bubbleOut: [33.6, 34.0], close6: 34.0,
  cut3: 34.35,
  // 6 · lesson
  lesson: BEAT(61), lessonOut: [38.4, 38.55],
  // 7 · card first, face last
  flip: [38.85, 39.25], out: [40.3, 40.55],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Fall for the | *person* first.', chip: '+1 FAMILY APPROVED' }

// ── the dialogue
const MT = '♋︎ MOM', ST = 'THE STARS'
const MC = '#8fdcff', SCOL = GOLD
const LINES1 = [{ t: T.l1, speaker: MT, color: MC, text: 'where are the *photos?!*' }]
const LINES2 = [
  { t: T.l2, speaker: MT, color: MC, text: "how do you know they're *CUTE?*" },
  { t: T.l3, speaker: ST, color: SCOL, text: "that's the point. *watch.*" },
]
const LINES3 = [
  { t: T.l4, speaker: ST, color: PINK, text: 'first: sign and *vibe.*' },
  { t: T.l5, speaker: MT, color: MC, text: 'a Virgo. slow burn. *go on.*' },
]
const LINES4 = [
  { t: T.l6, speaker: ST, color: GOLD, text: 'then you *talk.* real questions.' },
  { t: T.l7, speaker: MT, color: MC, text: "'lazy Sunday?' ooh. I *like* this." },
]
const LINES5 = [{ t: T.l8, speaker: ST, color: LAV, text: 'and the face comes *last.*' }]
const LINES6 = [
  { t: T.l9, speaker: MT, color: SEPIA, text: "I heard your dad's *laugh* first." },
  { t: T.l10, speaker: MT, color: SEPIA, text: 'across the room. *then* I saw him.' },
  { t: T.l11, speaker: MT, color: MC, text: 'oh. I *invented* this.' },
]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5, ...LINES6]
const CPS = 28
export const BOXES = [[LINES1, T.close1], [LINES2, T.close2], [LINES3, T.close3], [LINES4, T.close4], [LINES5, T.close5], [LINES6, T.close6]]

// ── headlines
const HEADS = [
  { text: 'Wait. | No *photos?*', top: 150, size: 108, accentSize: 168, at: 0.3, late: 1, lateAt: 0.9, accentColor: ROSE, out: [4.1, 4.3] },
  { text: 'The Stars Explain It | to *Your Mom.*', top: 150, size: 88, accentSize: 140, at: T.drop + 0.05, gap: 0.08, late: 2, lateAt: BEAT(8), lateGap: 0.14, accentColor: ROSE, out: [10.1, 10.3], fit: true },
  { text: 'Step one: | *the card.*', top: 150, size: 100, accentSize: 156, at: 10.62, late: 2, lateAt: 10.95, lateGap: 0.12, accentColor: PINK, out: [16.35, 16.55] },
  { text: 'Step two: | *the talk.*', top: 150, size: 100, accentSize: 156, at: 16.7, late: 2, lateAt: 16.95, lateGap: 0.12, accentColor: GOLD, out: [22.45, 22.65] },
  { text: 'Step three: | *the face.*', top: 150, size: 100, accentSize: 156, at: 22.85, late: 2, lateAt: 23.1, lateGap: 0.12, accentColor: LAV, out: [24.25, 24.4] },
  { text: '*LAST?!*', top: 170, size: 120, accentSize: 230, at: T.last, late: 1, lateAt: T.last, accentColor: '#ff6b9a', out: [25.3, 25.45] },
  { text: 'Mom has | *a story.*', top: 150, size: 104, accentSize: 160, at: 25.6, late: 2, lateAt: 25.95, lateGap: 0.12, accentColor: SEPIA, out: [33.75, 33.95] },
  { text: 'Card first. | *Face* last.', top: 150, size: 108, accentSize: 168, at: 38.6, gap: 0.1, late: 2, lateAt: T.flip[1], lateGap: 0.14, accentColor: ROSE, out: [40.3, 40.5] },
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

// ── camera: keys [t, zoom, focusX, focusY, screenX, screenY, ease]
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic, step: x => (x > 0 ? 1 : 0) }
const IDN = [1, 540, 960, 540, 960]
const MF = [300, 1110, 540, 1100]          // Mom's face
const CAM = [
  [0, 1.16, 420, 1060, 470, 1060],
  [4.3, 1.18, 420, 1060, 470, 1060, 'lin'],
  [5.0, ...IDN, 'io'],
  // the soap snap-zooms: three hard cuts in, then ease back out
  [24.39, ...IDN, 'lin'], [24.4, 1.3, ...MF, 'step'], [24.64, 1.3, ...MF, 'lin'], [24.65, 1.65, ...MF, 'step'], [24.89, 1.65, ...MF, 'lin'], [24.9, 2.1, ...MF, 'step'],
  [25.25, 2.12, ...MF, 'lin'], [25.5, ...IDN, 'out'],
  // the story push-in
  [25.6, ...IDN, 'lin'], [26.4, 1.3, 300, 1130, 330, 1250, 'io'], [33.6, 1.34, 300, 1130, 330, 1250, 'lin'], [34.3, ...IDN, 'io'],
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
const SLOTS = [{ x: 330, at: T.card1, lbl: '1 · CARD', col: PINK }, { x: 560, at: T.card2, lbl: '2 · TALK', col: GOLD }, { x: 790, at: T.card3, lbl: '3 · FACE', col: LAV }]
const SLOT_Y = 650, CARD_H = 300

// ── moods
function momState(t) {
  const st = { mood: 'neutral', look: [1, -1], glassesDown: 0, blink: undefined, squash: 0, tears: 0 }
  if (t < T.drop) { st.mood = t < 2.4 ? 'squint' : 'wide'; st.look = t < 2.4 ? [1, -1] : [1, -1]; st.glassesDown = 0.9; st.blink = t < 2.4 ? undefined : false; return st }
  if (t < T.l3) { st.mood = 'wide'; st.look = [0, 0]; st.blink = false; return st }
  if (t < T.cut1) { st.mood = 'squint'; st.look = [1, -1]; return st }
  if (t < T.l5) { st.mood = 'squint'; st.look = [1, -1]; st.glassesDown = 0.6; return st }
  if (t < T.close3) { st.mood = 'neutral'; st.look = [0, 0]; st.glassesDown = 0.6; return st }
  if (t < T.l7) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.cut2) { st.mood = 'sparkle'; st.look = [1, -1]; return st }
  if (t < T.last) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.push[0]) { st.mood = 'wide'; st.look = [0, 0]; st.blink = false; st.squash = -0.08 * bump(t, T.last, 0.5); return st }
  if (t < T.l9) { st.mood = 'neutral'; st.look = [-1, -1]; st.glassesDown = ease.inOutCubic(prog(t, 25.6, 26.1)) * 0.7; return st }
  st.glassesDown = 0.7
  if (t < T.l11) { st.mood = 'sparkle'; st.look = [1, -1]; st.tears = t > T.cry ? 1 : 0; return st }
  if (t < T.cut3) { st.mood = t < T.l11 + 0.5 ? 'wide' : 'happy'; st.look = [0, 0]; st.blink = t < T.l11 + 0.5 ? false : undefined; return st }
  st.glassesDown = 0
  if (t < T.flip[0]) { st.mood = 'happy'; st.look = [1, -1]; return st }
  st.mood = 'heart'; st.look = [1, -1]
  return st
}
function starsState(t) {
  const st = { mood: 'happy', look: [-1, -1], blink: undefined, squash: 0, point: -1, tears: 0 }
  if (t < T.l3 - 0.5) { st.mood = t > T.l2 + 0.8 ? 'wide' : 'happy'; st.look = [-1, 0]; return st }
  if (t < T.cut1) { st.mood = 'wink'; st.look = [0, 0]; return st }
  if (t < T.close3) { st.point = 0; st.mood = t > T.l5 + 0.4 ? 'happy' : 'neutral'; return st }
  if (t < T.close4) { st.point = 1; st.mood = t > T.l7 + 0.6 ? 'heart' : 'happy'; return st }
  if (t < T.last) { st.point = 2; st.mood = 'neutral'; return st }
  if (t < T.push[0]) { st.mood = 'wide'; st.look = [-1, 0]; st.blink = false; return st }
  if (t < T.cry) { st.mood = 'sparkle'; st.look = [-1, 0]; return st }
  if (t < T.l11) { st.mood = 'sparkle'; st.look = [-1, 0]; st.tears = 2; return st }
  if (t < T.cut3) { st.mood = t < T.l11 + 0.6 ? 'wide' : 'sparkle'; st.look = [-1, 0]; st.tears = 3; st.blink = false; return st }
  if (t < T.flip[0]) { st.mood = 'happy'; st.look = [-1, 0]; return st }
  st.mood = 'sparkle'; st.look = [-1, -1]
  return st
}
function pisState(t) {
  const st = { mood: 'sparkle', look: [-1, 0], tears: 1, k: pop01(t, T.pis, 0.35, 2.2) }
  if (inR(t, T.sob, T.sob + 1.6)) st.tears = 3
  if (inR(t, T.last, T.push[0])) { st.mood = 'wide'; st.tears = 0 }
  if (t >= T.cry && t < T.cut3) st.tears = 3
  if (t >= T.flip[1]) st.tears = 3
  return st
}

const hopsOf = sp => talkHops(ALL_LINES, sp, { cps: CPS })
const M_HOPS = [...hopsOf(MT), T.last, T.flip[1] + 0.05, T.flip[1] + 0.45]
const S_HOPS = [...hopsOf(ST), T.stars + 0.3, T.card1, T.card2, T.card3, T.lesson + 0.2, T.flip[1], T.flip[1] + 0.5]
const P_HOPS = [T.pis + 0.4, T.sob, T.sob + 0.4, T.sob + 0.8, T.cry, T.cry + 0.4, T.flip[1] + 0.2]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, h) => { if (!im) return null; const c = document.createElement('canvas'); c.height = h; c.width = Math.round(h * im.width / im.height); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [imProfile, imTalk, imBack, imReveal] = await Promise.all(['card-profile-1.png', 'card-talk-3.png', 'card-back.png', 'card-reveal.png'].map(loadImg))
  const CARD = { profile: bake(imProfile, 640), talk: bake(imTalk, 640), back: bake(imBack, 640), reveal: bake(imReveal, 640) }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1480, width: 960, height: 250, cps: CPS }
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { ...BOX, lines, open: lines[0].t - 0.2, close }))
  const bug = el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: ROSE, textShadow: '0 2px 10px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', pointerEvents: 'none' }, root)
  bug.innerHTML = 'EXPLAIN IT TO MOM<span style="color:rgba(255,255,255,0.6)"> · EP 2</span>'
  const lesson = buildLesson(root, { ...LESSON, accentColor: ROSE, dim: 0.6 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const withCam = (C, fn) => { x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z, C.sy - C.fy * C.z); fn(); x.restore() }
  const text = (s, X, Y, font, col, align = 'left') => { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, X, Y) }
  /** a card image centred at (cx, cy), height h, with a flip (sx ∈ −1…1) and a glow */
  function card(im, cx, cy, h, { rot = 0, sx = 1, glow = 0, alpha = 1 } = {}) {
    if (!im || alpha <= 0) return
    const w = h * im.width / im.height
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
    if (glow > 0) { x.shadowColor = rgba(GOLD, 0.8 * glow); x.shadowBlur = 40 * glow }
    x.drawImage(im, -w / 2, -h / 2, w, h); x.restore()
  }

  function room(t) {
    const g = x.createRadialGradient(400, FLOOR, 40, 400, FLOOR, 700); g.addColorStop(0, 'rgba(255,180,140,0.16)'); g.addColorStop(1, 'rgba(255,180,140,0)')
    x.fillStyle = g; x.fillRect(-300, FLOOR - 500, W + 600, 900)
    drawRug(x, 520, FLOOR + 6, 560, 64)
    drawLamp(x, 66, FLOOR - 10, 6, t, 1)
  }
  function board(t) {
    if (t < T.easel[0]) return
    const slide = (1 - ease.outBack(prog(t, ...T.easel))) * 900
    x.save(); x.translate(slide, 0)
    x.globalAlpha *= 1 - 0.8 * clamp(prog(t, 25.5, 26.2)) * (1 - prog(t, 33.6, 34.2))   // the board recedes while Mom tells her story
    const B = drawEasel(x, EASEL.cx, EASEL.top, EASEL.w, EASEL.h)
    const point = starsState(t).point
    SLOTS.forEach((S, i) => {
      // the empty slot: a dashed outline + its label
      x.strokeStyle = 'rgba(122,58,42,0.35)'; x.lineWidth = 4; x.setLineDash([14, 10]); x.strokeRect(S.x - 100, SLOT_Y - CARD_H / 2, 200, CARD_H); x.setLineDash([])
      text(S.lbl, S.x, B.y + B.h - 34, `700 28px ${MONO}`, i === point ? S.col : '#7a3a2a', 'center')
      const k = pop01(t, S.at, 0.45, 1.8)
      if (k <= 0) return
      const focus = i === point ? 1 : 0
      const h = CARD_H * (0.94 + 0.06 * focus) * k
      const rot = (1 - ease.outCubic(prog(t, S.at, S.at + 0.45))) * 0.6 + (i - 1) * 0.03
      if (i === 0) card(CARD.profile, S.x, SLOT_Y, h, { rot, glow: focus })
      else if (i === 1) card(CARD.talk, S.x, SLOT_Y, h, { rot, glow: focus })
      else {
        // the face card: a card back with a big "?" — until the very end, when it flips to the face
        const fp = prog(t, ...T.flip), sx = fp <= 0 ? 1 : fp >= 1 ? 1 : Math.abs(Math.cos(Math.PI * fp))
        const showFace = fp >= 0.5
        card(showFace ? CARD.reveal : CARD.back, S.x, SLOT_Y, h * (showFace ? 1.04 : 1), { rot, sx, glow: showFace ? 1 : focus })
        if (!showFace && k > 0.3) {
          x.save(); x.translate(S.x, SLOT_Y); x.rotate(rot); x.scale(sx * k, k)
          x.font = `800 150px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('?', 0, -10); x.fillStyle = BONE; x.fillText('?', 0, -10)
          // the LAST stamp
          const sk = pop01(t, T.last, 0.25, 2.6)
          if (sk > 0) {
            x.rotate(-0.2); x.scale(sk, sk)
            x.strokeStyle = '#ff6b9a'; x.lineWidth = 7; x.strokeRect(-82, 66, 164, 54)
            x.font = `700 38px ${MONO}`; x.fillStyle = '#ff6b9a'; x.fillText('LAST', 0, 95)
          }
          x.restore()
        }
      }
      sparkle(x, t, S.x, SLOT_Y, S.at + 0.3, { n: 9, R: 150, size: 22, seed: i })
    })
    sparkle(x, t, SLOTS[2].x, SLOT_Y, T.flip[1], { n: 14, R: 220, size: 30, seed: 7 })
    x.restore()
  }
  function cast(t) {
    drawArmchair(x, MOM_AT.x, 1100, 14)
    const M = momState(t)
    const momY = MOM_BASE - FOOT * MOM_AT.size
    const F = mom(x, MOM_AT.x, momY, MOM_AT.size, t, { mood: M.mood, look: M.look, blink: M.blink, glassesDown: M.glassesDown, hops: M_HOPS, seed: 2, squash: M.squash, tears: M.tears })
    const hand = cellPt(F, 33, 21)
    if (t >= T.phoneOut[1]) drawTeacup(x, hand.x + 18, hand.y, 9, t, {})
    if (t >= T.card2 && t < T.cut3) drawTissues(x, 130, 1222, 7, t)
    // THE STARS + the pointer
    const S = starsState(t), sk = pop01(t, T.stars, 0.4, 2.2)
    if (sk > 0) {
      const sY = 1300 - FOOT * STARS_AT.size
      const o = { color: STAR.sky, mood: S.mood, look: S.look, blink: S.blink, hops: S_HOPS, seed: 5, pop: sk, squash: S.squash }
      const SF = starFrame(STARS_AT.x, sY, STARS_AT.size, t, o)
      if (S.point >= 0 && sk >= 1) {
        const from = cellPt(SF, 4, 14), tgt = SLOTS[S.point]
        drawPointer(x, from.x, from.y, tgt.x + 60, SLOT_Y + CARD_H / 2 + 20 + Math.sin(t * 5) * 6)
      }
      drawStarChar(x, STARS_AT.x, sY, STARS_AT.size, t, o)
      if (S.tears) inSprite(x, SF, () => tearsCells(x, t, S.tears))
    }
  }
  function pisces(t) {
    const P = pisState(t)
    if (P.k <= 0) return
    const o = { color: PIS.color, glyph: null, mood: P.mood, look: P.look, hops: P_HOPS, seed: 9, pop: P.k }
    drawStarChar(x, PIS_AT.x, PIS_AT.y, PIS_AT.s, t, o)
    inSprite(x, starFrame(PIS_AT.x, PIS_AT.y, PIS_AT.s, t, o), () => tearsCells(x, t, P.tears))
  }
  // the hook: your phone, tonight's top card veiled; Mom shakes it in case the photo falls out
  function hookPhone(t) {
    if (t >= T.phoneOut[1]) return
    const k = ease.outBack(prog(t, ...T.phone)), o = ease.inCubic(prog(t, ...T.phoneOut))
    const sh = inR(t, ...T.shake) ? Math.sin(t * 46) * 0.12 * Math.sin(Math.PI * prog(t, ...T.shake)) : 0
    drawPhone(x, 690 + o * 700 + sh * 120, 900 + (1 - k) * 900, 330, 520, (X0, Y0, w, h) => {
      x.fillStyle = '#1a1238'; x.fillRect(X0, Y0, w, h)
      text("TONIGHT'S DECK", X0 + w / 2, Y0 + 44, `700 20px ${MONO}`, LAV, 'center')
      card(CARD.profile, X0 + w / 2, Y0 + h / 2 + 24, h - 110)
    }, { rot: 0.05 + o * 0.4 + sh })
    if (inR(t, T.shake[0] + 0.1, T.shake[1])) { x.save(); x.translate(720, 600); x.rotate(0.12); x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('*shake shake*', 0, 0); x.fillStyle = '#fff2a8'; x.fillText('*shake shake*', 0, 0); x.restore() }
  }
  // the memory bubble (screen space): a sepia room, string lights, a laugh drifting across to a young Mom
  function bubble(t) {
    if (t < T.bubble[0] || t >= T.bubbleOut[1]) return
    const k = ease.outBack(prog(t, ...T.bubble)) * (1 - ease.inCubic(prog(t, ...T.bubbleOut)))
    if (k <= 0) return
    const cx = 600, cy = 760, w = 820, h = 520
    x.save(); x.translate(cx, cy); x.scale(k, k)
    // thought dots back toward Mom
    for (const [dx, dy, r] of [[-330, 330, 18], [-380, 400, 12]]) { x.fillStyle = INK; x.fillRect(dx - r - 6, dy - r - 6, 2 * r + 12, 2 * r + 12); x.fillStyle = '#f3e2c4'; x.fillRect(dx - r, dy - r, 2 * r, 2 * r) }
    // the bubble: a stepped pixel cloud
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 + 24, w + 12, h - 48); x.fillRect(-w / 2 + 24, -h / 2 - 6, w - 48, h + 12)
    x.fillStyle = '#f3e2c4'; x.fillRect(-w / 2, -h / 2 + 30, w, h - 60); x.fillRect(-w / 2 + 30, -h / 2, w - 60, h)
    x.save(); x.beginPath(); x.rect(-w / 2 + 20, -h / 2 + 20, w - 40, h - 40); x.clip()
    // sepia room
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#4a3238'); g.addColorStop(1, '#2e1f2a'); x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#5a3a2c'; x.fillRect(-w / 2, 120, w, h)          // the floor
    for (let i = 0; i < 16; i++) { const lx = -w / 2 + 40 + i * 50, ly = -h / 2 + 50 + Math.sin(i * 0.9) * 14; x.fillStyle = '#2a1b20'; x.fillRect(lx - 25, ly - 2, 50, 3); x.fillStyle = i % 2 ? '#ffd98a' : '#ffb38a'; x.globalAlpha = 0.7 + 0.3 * Math.sin(t * 4 + i); x.fillRect(lx - 6, ly, 12, 12); x.globalAlpha = 1 }
    // the crowd (soft silhouettes) and, across the room, the laugher
    for (const [px, s, sd] of [[-120, 120, 11], [40, 110, 12], [150, 128, 13]]) drawStarChar(x, px, 150 - FOOT * s, s, t, { color: '#7a5a6a', glyph: null, mood: 'neutral', look: [1, 0], seed: sd, glow: 0.2, tips: false })
    const lp = prog(t, ...T.laugh)
    drawStarChar(x, 290, 150 - FOOT * 140, 140, t, { color: '#e9b24a', glyph: null, mood: 'happy', seed: 14, hops: [26.7, 27.1, 27.5, 27.9, 28.3, 28.7], glow: 0.6, tips: false })
    // young Mom, far left, turning round toward the laugh
    const turned = t > 27.6
    drawStarChar(x, -300, 150 - FOOT * 130, 130, t, { color: MOM.color, glyph: null, mood: turned ? 'heart' : 'neutral', look: turned ? [1, 0] : [-1, 0], seed: 15, blink: false, tips: false })
    // HA HA HA drifts across the room to her
    for (let i = 0; i < 4; i++) {
      const p = clamp((lp * 1.6 - i * 0.18)), xx = lerp(240, -260, p), yy = -40 - Math.sin(Math.PI * p) * 70 - i * 6
      if (p <= 0 || p >= 1) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * p); x.translate(xx, yy); x.rotate(-0.1 + i * 0.07)
      x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('HA', 0, 0); x.fillStyle = '#ffd98a'; x.fillText('HA', 0, 0); x.restore()
    }
    // sepia wash + vignette
    x.fillStyle = 'rgba(232,199,154,0.18)'; x.fillRect(-w / 2, -h / 2, w, h)
    x.restore()
    text('ONE NIGHT, LONG AGO', 0, h / 2 - 2, `700 22px ${MONO}`, '#7a5a3a', 'center')
    x.restore()
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
        hookPhone(t)
      })
      // the soap zoom: a pink flash + letterbox bars
      const sz = Math.max(...T.zooms.map(z => bump(t, z, 0.18)))
      if (sz > 0) { x.fillStyle = `rgba(255,107,154,${0.22 * sz})`; x.fillRect(0, 0, W, H) }
      const bars = clamp(prog(t, T.last, T.last + 0.2)) * (1 - prog(t, 25.25, 25.5))
      if (bars > 0) { x.fillStyle = '#05040c'; x.fillRect(0, 0, W, 110 * bars); x.fillRect(0, H - 110 * bars, W, 110 * bars) }
      // a dark scrim under the headline while the camera pushes in
      const scr = clamp(prog(t, 25.5, 26.2)) * (1 - prog(t, 33.6, 34.2))
      if (scr > 0) { const g = x.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, `rgba(6,4,18,${0.85 * scr})`); g.addColorStop(0.75, `rgba(6,4,18,${0.6 * scr})`); g.addColorStop(1, 'rgba(6,4,18,0)'); x.fillStyle = g; x.fillRect(0, 0, W, 520) }
      bubble(t)
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

// card-motif candidates (the default selection keeps indices 1, 3, 5 → 10.5, 22.75, 34.35)
export const CUTS = [4.45, T.cut1, 16.65, T.cut2, 25.5, T.cut3, 38.58]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]
export const _T = T, _LESSON = LESSON, _HEADS = HEADS
void lessonTimes; void lineTimes

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { Ab2: 103.83, Eb3: 155.56, Ab3: 207.65, C4: 261.63, Eb4: 311.13, Ab4: 415.3, F3: 174.61, Db4: 277.18 }
const r3 = v => +v.toFixed(3)
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const sob = t0 => [0, 0.16, 0.3].map((d, i) => ['chip', r3(t0 + d), 760 - i * 60, 0.13, { duty: 0.5, slide: -6, vib: 0.06, gain: 0.014, decay: 0.1, sustain: 0.5, rev: 0.25, dly: 0, bus: 'fx' }])
const sting = (t, notes, len = 0.6, gain = 0.05) => [['brass', r3(t), notes, len, { gain, bright: 1.25, ...FXB }], ['tom', r3(t), 70, { gain: 0.32, decay: 0.6, rev: 0.4, bus: 'fx' }]]
export const CUES = [
  // 0 · the hook
  ['whoosh', T.phone[0], 0.4, 0.05], ['pop', T.phone[1], 784, 0.035, 0.3],
  ...headCues(HEADS[0]),
  ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.shake[0] + 0.1 + i * 0.1), 0.035]),
  ['riser', 3.4, 4.47, 0.04], ['whoosh', T.phoneOut[0], 0.45, 0.06],
  // 1 · title
  ['boom', T.drop, 0.32], ...sting(T.drop, [N.Ab2, N.Eb3, N.Ab3, N.C4], 1.2, 0.045),
  ['strings', T.drop, r3(T.drop + 2.0), [N.Ab3, N.C4, N.Eb4, N.Ab4], { gain: 0.011, attack: 0.08, release: 0.8, rev: 0.5, bus: 'fx' }],
  ...headCues(HEADS[1]),
  ['whoosh', T.easel[0], 0.5, 0.06], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.easel[0] + i * 0.09), 0.02]), ['tom', T.easel[1], 110, { gain: 0.2, decay: 0.3, rev: 0.3, bus: 'fx' }],
  ['pop', T.stars, 988, 0.04, 0.4], ['glitter', T.stars, r3(T.stars + 0.6)],
  ['pop', T.pis, 880, 0.03, 0.6], ...sob(T.pis + 0.4),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [MT]: 659.25, [ST]: 880 } }),
  // 2–4 · the three steps
  ...headCues(HEADS[2]), ['whoosh', T.card1, 0.35, 0.04], ['pop', r3(T.card1 + 0.35), 1174.66, 0.045, 0], ['glitter', r3(T.card1 + 0.3), r3(T.card1 + 0.8)],
  ...headCues(HEADS[3]), ['whoosh', T.card2, 0.35, 0.04], ['pop', r3(T.card2 + 0.35), 1318.51, 0.045, 0], ['glitter', r3(T.card2 + 0.3), r3(T.card2 + 0.8)],
  ...sob(T.sob), ...sob(T.sob + 0.45),
  ...headCues(HEADS[4]), ['whoosh', T.card3, 0.35, 0.04], ['pop', r3(T.card3 + 0.35), 987.77, 0.045, 0],
  // the soap snap-zooms: DUN · DUN · DUNNN
  ...sting(T.zooms[0], [N.Ab2, N.Eb3, N.Ab3], 0.22, 0.045), ...sting(T.zooms[1], [N.F3, N.Ab3, N.C4], 0.22, 0.05), ...sting(T.zooms[2], [N.Eb3, N.Ab3, N.Db4, N.Eb4], 0.9, 0.06),
  ['boom', T.zooms[2], 0.3], ...headCues(HEADS[5]), ['tick', T.last, 0.06],
  // 5 · the story
  ['tapeStop', 25.35, 0.3], ['whoosh', T.bubble[0], 0.6, 0.05], ['glitter', T.bubble[0], r3(T.bubble[1] + 0.3)],
  ['strings', 26.0, 33.4, [N.Ab3, N.C4, N.Eb4, N.Ab4], { gain: 0.009, attack: 1.2, release: 1.5, rev: 0.6, bus: 'fx' }],
  ...headCues(HEADS[6]),
  ...[26.7, 27.1, 27.5, 27.9, 28.3].map((tt, i) => ['chip', tt, 520 + (i % 2) * 60, 0.12, { duty: 0.5, slide: -4, gain: 0.016, decay: 0.1, sustain: 0.4, rev: 0.4, dly: 0, bus: 'fx' }]),   // the far-off laugh
  ['bell', 27.6, 1318.51, 0.03, 1.6, -0.4], ['glitter', 27.6, 28.2],
  ...sob(T.cry), ...sob(T.cry + 0.5), ...sob(T.l11 + 0.8), ...sob(T.l11 + 1.3),
  ['pop', r3(T.l11 + 0.6), 1567.98, 0.04, 0], ['tick', r3(T.l11 + 0.6), 0.04],
  // 6 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Ab' }),
  // 7 · card first, face last
  ...headCues(HEADS[7]), ['whoosh', T.flip[0], 0.4, 0.05], ['tick', r3((T.flip[0] + T.flip[1]) / 2), 0.05],
  ['bell', T.flip[1], 1174.66, 0.035, 1.4, 0.3], ['glitter', T.flip[1], r3(T.flip[1] + 0.8)],
  ['brass', T.flip[1], [N.Ab3, N.C4, N.Eb4, N.Ab4], 0.8, { gain: 0.035, bright: 1.1, ...FXB }], ...sob(T.flip[1] + 0.3),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
