// stjealous (45 s vertical Align ad, Star Talk season 2 extra: "Meet the jealousy monster") · story 0–40.6, then the shared
// end card. YOUR STAR (rose) and THEIR STAR (lavender) on a pixel couch. A little green monster sits on your shoulder and
// grows every time their phone buzzes. The AUNTIES name it, ♏ SCORPIO knows it personally, ♓ PISCES cries in the back.
//   0.00–4.30  "Meet the | *jealousy* monster."  (on screen at frame 0) Their phone buzzes; a tiny green monster pops up on
//              your shoulder. THE STARS: "Their phone buzzed. Something woke up."
//   4.40–10.4  "Every | *buzz.*"  BZZT: it grows. AUNTIE TAURUS: "Oh, that's Gerald."  BZZT: bigger.
//              AUNTIE CANCER: "We all have a Gerald, baby."
//  10.60       card cut (flip)
//  10.7–17.3   "Then you | *scroll.*"  They go to make tea. You scroll their likes; Gerald balloons over your head, red-eyed,
//              growling. THE STARS: "Do NOT scroll their likes."  "…and he's huge now." Pisces gasps.
//  17.5–23.9   "A *Scorpio* | steps in."  ♏ SCORPIO slides in, its own monster tiny on its shoulder, wearing a bow.
//              SCORPIO: "Oh, I know Gerald. Personally."  "Say it out loud: 'I felt jealous.' Watch."
//  24.00       card cut (deal)
//  24.1–30.4   "Say it | *out loud.*"  They come back with two mugs. YOU: "I felt jealous when your phone kept buzzing."
//              THEM: "That's my mom's group chat. I'm here."  Gerald shrinks, pop, pop, pop, to a tiny pet with a bow.
//  30.60–34.6  ★ LESSON UNLOCKED (shared lesson.js): "Say the feeling. | It *shrinks.*"  +1 COURAGE
//  34.7–37.3   "Talk | *cards.*"  A talk card: "What helps you feel secure?" Two answers face down, then both flip.
//  37.4–40.45  "Gerald, | *today.*"  Gerald curled up in a tiny bed. THE AUNTIES: "Gerald's fine. Gerald's a pet now."
//              Everything pops out by 40.45; the end card takes over at 40.6.
// One canvas (sky + couch + cast), DOM type + the dialogue boxes, the lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { cast, auntie, bmp, drawHearts, drawSweat, pixelPanel, sparkBurst, headCues, chipCue, scratchCue, wompCue, flutterCue, cricketCue } from './props.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const KEY = 'Bm'
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#7dffb0', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SCO = signStar('scorpio'), PIS = signStar('pisces'), CAN = signStar('cancer'), TAU = signStar('taurus')
const YOU_COL = '#ff9cc0', THEM_COL = '#b9a2ff', GERALD = '#5fd35a'
const S_TAG = 'THE STARS', Y_TAG = '♡ YOUR STAR', M_TAG = '☆ THEIR STAR', O_TAG = `${SCO.glyph} SCORPIO`
const T_TAG = `${TAU.glyph} AUNTIE TAURUS`, C_TAG = `${CAN.glyph} AUNTIE CANCER`, A_TAG = 'THE AUNTIES'

const T = {
  open1: -1.3, l1: -1.1, buzz: [-0.5, 4.45, 6.6], h0Out: [4.15, 4.32],
  h1: 4.5, h1Land: 4.9, aunties: 4.6, l2: 4.95, l3: 7.6, close1: 10.35, h1Out: [10.25, 10.42], auntiesOut: [10.1, 10.4],
  cut1: 10.6,
  h2: 10.7, h2Land: 11.1, leave: [10.65, 11.2], phone: 11.0, l4: 11.3, balloon: [12.8, 15.2], growl: 13.4, l5: 14.6, gasp: 15.0,
  close2: 17.15, h2Out: [17.15, 17.32], phoneOut: [17.1, 17.4],
  h3: 17.45, h3Land: 17.85, sco: [17.5, 18.0], open3: 17.7, l6: 17.9, l7: 20.7, close3: 23.75, h3Out: [23.7, 23.88], scoOut: [23.6, 23.9],
  cut2: 24.0,
  h4: 24.1, h4Land: 24.5, back: [24.05, 24.5], open4: 24.15, l8: 24.3, l9: 27.4, shrink: [28.2, 29.5], close4: 30.35, h4Out: [30.3, 30.45],
  lesson: 30.6, lessonOut: [34.35, 34.6],
  h5: 34.7, h5Land: 35.1, card: [34.7, 35.1], flip: 36.0, cardOut: [37.05, 37.3], h5Out: [37.1, 37.28],
  h6: 37.4, h6Land: 37.8, open5: 37.45, l10: 37.6, close5: 40.05, h6Out: [40.0, 40.2], out: [40.0, 40.45],
}
const LINES1 = [
  { t: T.l1, speaker: S_TAG, text: 'Their phone buzzed. *Something woke up.*' },
  { t: T.l2, speaker: T_TAG, color: '#ffd27a', text: "Oh, that's *Gerald.*" },
  { t: T.l3, speaker: C_TAG, color: '#8fdcff', text: 'We all have a *Gerald,* baby.' },
]
const LINES2 = [
  { t: T.l4, speaker: S_TAG, text: 'Do *NOT* scroll their likes.' },
  { t: T.l5, speaker: S_TAG, text: "…and he's *huge* now." },
]
const LINES3 = [
  { t: T.l6, speaker: O_TAG, color: '#ff8fa8', text: 'Oh, I know Gerald. *Personally.*' },
  { t: T.l7, speaker: O_TAG, color: '#ff8fa8', text: "Say it out loud: *'I felt jealous.'* Watch." },
]
const LINES4 = [
  { t: T.l8, speaker: Y_TAG, color: PINK, text: 'I felt *jealous* when your phone kept buzzing.' },
  { t: T.l9, speaker: M_TAG, color: LAV, text: "That's my mom's group chat. *I'm here.*" },
]
const LINES5 = [{ t: T.l10, speaker: A_TAG, color: MINT, text: "Gerald's fine. *Gerald's a pet now.*" }]
const CPS = 28
const ALL = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Say the feeling. | It *shrinks.*', chip: '+1 COURAGE', dim: 0.55 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, [a, b]) => t >= a && t < b
function moodAt(M, t) { let m = M[0]; for (const e of M) if (e[0] <= t) m = e; return { mood: m[1], look: m[2] } }

// ── Gerald: pixel size by time (each buzz = a step up; the scroll balloons him; saying it shrinks him)
function geraldPx(t) {
  let px = 0
  if (t >= T.buzz[0]) px = 6 * easeOutBack(prog(t, T.buzz[0], T.buzz[0] + 0.3), 2.5)
  if (t >= T.buzz[1]) px = lerp(6, 10, easeOutBack(prog(t, T.buzz[1], T.buzz[1] + 0.3), 3))
  if (t >= T.buzz[2]) px = lerp(10, 14, easeOutBack(prog(t, T.buzz[2], T.buzz[2] + 0.3), 3))
  if (t >= T.balloon[0]) { const p = prog(t, ...T.balloon); px = lerp(14, 34, ease.inOutCubic(p)) + 1.2 * Math.sin(t * 9) * p }
  if (t >= T.l8 + 0.6) px = lerp(34, 26, ease.outCubic(prog(t, T.l8 + 0.6, T.l8 + 1.6)))
  if (t >= T.shrink[0]) {      // three pops down to a pet
    const steps = [26, 16, 9, 5], q = prog(t, ...T.shrink) * 3, i = Math.min(2, Math.floor(q))
    px = lerp(steps[i], steps[i + 1], easeOutBack(clamp((q - i) * 2.2), 2.6))
  }
  if (t >= T.lessonOut[1]) px = 5
  if (t >= T.h6) px = 9
  return px
}
const GER = [
  '..H........H..', '.HH........HH.', '.KGGGGGGGGGGK.', 'KGGGGGGGGGGGGK', 'KGGWWGGGGWWGGK', 'KGGWEGGGGWEGGK', 'KGGGGGGGGGGGGK',
  'KGGKWKWKWKWGGK', 'KGGKKKKKKKKGGK', 'KGGGGGGGGGGGGK', '.KGGGGGGGGGGK.', '.KGK.KGGK.KGK.', '..K...KK...K..',
]
const PET = [
  '..H........H..', '.HH...pp...HH.', '.KGGGpPPpGGGK.', 'KGGGGGppGGGGGK', 'KGGGGGGGGGGGGK', 'KGGKKGGGGKKGGK', 'KGGGGGGGGGGGGK',
  'KGbGGGKKGGGbGK', 'KGGGGGGGGGGGGK', 'KGGGGGGGGGGGGK', '.KGGGGGGGGGGK.', '.KGK.KGGK.KGK.', '..K...KK...K..',
]
function drawGerald(x, t, cx, by, px, { angry = 0, pet = false, blink = false, alpha = 1 } = {}) {
  if (px <= 0.5) return
  const rows = pet ? PET : GER
  const sq = 1 + 0.05 * Math.sin(t * (angry ? 14 : 5))
  x.save(); x.globalAlpha *= alpha; x.translate(cx, by); x.scale(1 / sq, sq)
  const pal = { K: INK, G: GERALD, H: '#e9ffd8', W: '#ffffff', E: angry > 0.5 ? '#ff2a2a' : INK, p: '#ff5c8a', P: '#ffb3c8', b: '#ff9cc0' }
  if (blink) pal.W = GERALD, pal.E = INK
  bmp(x, rows, -7 * px, -13 * px, px, pal)
  // a darker belly band so he reads as a creature, not a block
  x.fillStyle = 'rgba(20,80,30,0.25)'; x.fillRect(-4 * px, -4 * px, 8 * px, 2 * px)
  x.restore()
}

// ── the couch
function drawCouch(x, t) {
  const y = 1180, x0 = 110, x1 = 970, P = 8
  x.fillStyle = INK; x.fillRect(x0 - P, y - 170, x1 - x0 + 2 * P, 330)
  x.fillStyle = '#8e3b5c'; x.fillRect(x0, y - 162, x1 - x0, 150)                 // back
  x.fillStyle = '#b4527a'; x.fillRect(x0 + P, y - 154, x1 - x0 - 2 * P, 12)
  x.fillStyle = '#7a2f4e'; x.fillRect(x0, y - 12, x1 - x0, 110)                   // seat
  x.fillStyle = '#9c4268'; x.fillRect(x0 + 2 * P, y - 4, (x1 - x0) / 2 - 3 * P, 22); x.fillRect((x0 + x1) / 2 + P, y - 4, (x1 - x0) / 2 - 3 * P, 22)
  x.fillStyle = INK; x.fillRect(x0 - 40, y - 70, 70, 190); x.fillRect(x1 - 30, y - 70, 70, 190)
  x.fillStyle = '#a24a70'; x.fillRect(x0 - 34, y - 64, 58, 178); x.fillRect(x1 - 24, y - 64, 58, 178)
  x.fillStyle = INK; x.fillRect(x0, y + 98, 22, 50); x.fillRect(x1 - 22, y + 98, 22, 50)
  // the rug
  x.fillStyle = 'rgba(201,166,255,0.18)'; x.fillRect(60, y + 150, 960, 30)
}

// ── a phone (their phone, buzzing) and the big scroll phone
function drawPhone(x, t, cx, cy, s, buzz) {
  const sh = buzz > 0 ? Math.sin(t * 90) * 6 * buzz : 0
  x.save(); x.translate(cx + sh, cy); x.scale(s, s)
  x.fillStyle = INK; x.fillRect(-34, -58, 68, 116); x.fillStyle = '#3d3a6b'; x.fillRect(-30, -54, 60, 108)
  x.fillStyle = buzz > 0 ? '#7fe0ff' : '#2a2f5c'; x.fillRect(-26, -46, 52, 86)
  if (buzz > 0) {
    x.fillStyle = '#ffffff'; x.fillRect(-20, -30, 40, 8); x.fillRect(-20, -16, 28, 6)
    x.globalAlpha = buzz; x.fillStyle = BONE
    for (const d of [-1, 1]) for (let i = 0; i < 3; i++) x.fillRect(d * (50 + i * 16) - 3, -26 + i * 20, 8, 14)
  }
  x.restore()
  if (buzz > 0.2) { x.save(); x.globalAlpha = buzz; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('BZZT', cx + 4 + sh, cy - 92 * s); x.restore() }
}
const LIKES = ['liked a post', 'liked a photo', 'liked a comment', 'liked a post', 'liked a reel', 'liked a photo', 'liked a post', 'liked a meme', 'liked a photo', 'liked a post']
function drawScrollPhone(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const w = 400, h = 560
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k * 0.82, k * 0.82)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = '#2a2a4c'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#121030'; x.fillRect(-w / 2 + 14, -h / 2 + 50, w - 28, h - 80)
  x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillStyle = 'rgba(239,230,214,0.8)'; x.fillText('THEIR LIKES', 0, -h / 2 + 34)
  x.save(); x.beginPath(); x.rect(-w / 2 + 14, -h / 2 + 50, w - 28, h - 80); x.clip()
  const speed = 60 + 240 * clamp(prog(t, T.phone, T.balloon[1])), off = ((t - T.phone) * speed) % 80
  for (let i = -1; i < 9; i++) {
    const y = -h / 2 + 90 + i * 80 - off
    const n = Math.floor((t - T.phone) * speed / 80) + i
    x.fillStyle = '#ff5c8a'; x.fillRect(-w / 2 + 34, y - 14, 24, 24)
    x.fillStyle = '#ffffff'; x.fillRect(-w / 2 + 38, y - 10, 6, 6)
    x.font = `600 28px ${INTER}`; x.textAlign = 'left'; x.fillStyle = BONE; x.fillText(LIKES[((n % LIKES.length) + LIKES.length) % LIKES.length], -w / 2 + 76, y + 8)
    x.fillStyle = 'rgba(239,230,214,0.12)'; x.fillRect(-w / 2 + 24, y + 30, w - 48, 2)
  }
  x.restore()
  // the thumb
  const th = Math.sin(t * 7) * 30
  x.fillStyle = INK; x.fillRect(-250, 120 + th, 70, 110); x.fillStyle = YOU_COL; x.fillRect(-244, 126 + th, 58, 98)
  x.restore()
}

// ── two mugs, a little bed, the talk card
function drawMug(x, cx, cy, s, col) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.fillRect(-26, -30, 52, 60); x.fillRect(24, -16, 18, 30); x.fillStyle = col; x.fillRect(-22, -26, 44, 52); x.fillStyle = '#ffffff'; x.fillRect(-18, -22, 10, 6); x.fillStyle = '#fff6ea'; x.globalAlpha = 0.7; x.fillRect(-8, -50, 6, 14); x.fillRect(4, -60, 6, 14); x.restore() }
function drawBed(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -36, 260, 76); x.fillStyle = '#c9a6ff'; x.fillRect(-122, -28, 244, 60)
  x.fillStyle = '#efe6d6'; x.fillRect(-104, -42, 208, 30); x.fillStyle = '#ffb3c8'; for (let i = -100; i < 100; i += 30) x.fillRect(i, -36, 14, 14)
  x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('GERALD', 0, 18)
  x.restore()
}
function drawTalkCard(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 800); x.rotate((1 - k) * -0.2); x.scale(k, k)
  pixelPanel(x, -320, -230, 640, 300, { P: 10, fill: '#fbf3e2', border: GOLD, glow: 0.6 })
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#8e3b5c'; x.fillText('TALK CARD', 0, -180)
  x.font = `800 50px ${INTER}`; x.fillStyle = INK; x.fillText('What helps you', 0, -110)
  x.font = `italic 600 64px 'EB Garamond', serif`; x.fillStyle = '#8e3b5c'; x.fillText('feel secure?', 0, -45)
  x.font = `700 22px ${MONO}`; x.fillStyle = 'rgba(27,18,54,0.6)'; x.fillText('answers hidden till you both play', 0, 20)
  // the two answers: face down, then they flip together
  for (const [d, txt] of [[-1, 'saying it out loud'], [1, 'a heads-up text']]) {
    const f = prog(t, T.flip, T.flip + 0.35), sx = Math.abs(Math.cos(f * Math.PI))
    x.save(); x.translate(d * 160, 180); x.scale(Math.max(0.04, sx), 1)
    const up = f > 0.5
    pixelPanel(x, -140, -56, 280, 112, { P: 8, fill: up ? '#1b1236' : '#3d2c68', border: up ? MINT : GOLD, glow: 0.3 })
    x.textAlign = 'center'; x.textBaseline = 'middle'
    if (up) { x.font = `italic 600 34px 'EB Garamond', serif`; x.fillStyle = BONE; x.fillText(txt, 0, 2) }
    else { x.font = `700 40px ${MONO}`; x.fillStyle = GOLD; x.fillText('?', 0, 2) }
    x.restore()
  }
  x.restore()
}

// ── positions + moods
const YOU = { x: 340, y: 1050, s: 270 }, THEM = { x: 740, y: 1050, s: 270 }, SCOP = { x: 760, y: 1040, s: 270 }
const AUNT_T = { x: 170, y: 640, s: 180 }, AUNT_C = { x: 910, y: 640, s: 180 }, PISP = { x: 960, y: 520, s: 120 }
const Y_MOOD = [[-9, 'wide', [1, 0]], [0.6, 'squint', [1, 0]], [T.buzz[1], 'wide', [1, 0]], [T.l3, 'neutral', [-1, -1]], [T.leave[0], 'neutral', [1, 0]],
  [T.phone, 'squint', [0, -1]], [T.balloon[0] + 1, 'wide', [0, -1]], [T.sco[0], 'wide', [1, 0]], [T.l7 + 1.2, 'squint', [1, 0]], [T.back[0], 'neutral', [1, 0]],
  [T.l8, 'squint', [1, 0]], [T.l9 + 0.6, 'sparkle', [1, 0]], [T.shrink[1], 'happy'], [T.h5, 'neutral', [0, -1]], [T.flip + 0.3, 'happy'], [T.h6, 'happy', [-1, 1]]]
const M_MOOD = [[-9, 'happy', [1, 1]], [T.buzz[1], 'neutral', [1, 1]], [T.l3, 'happy', [1, 1]], [T.back[0], 'happy', [-1, 0]], [T.l8 + 1, 'wide', [-1, 0]],
  [T.l9, 'sparkle', [-1, 0]], [T.shrink[1], 'heart'], [T.h5, 'neutral', [0, -1]], [T.flip + 0.3, 'happy'], [T.h6, 'happy', [-1, 1]]]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 50px Inter", "600 28px Inter", "italic 500 190px 'EB Garamond'", "italic 600 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H = (text, at, land, out, o = {}) => [popText(root, text, { top: 160, size: 112, accentSize: 156, at, late: 1, lateAt: land, wobble: true, fit: true, ...o }), out]
  const HEADS = [
    H('Meet the | *jealousy* monster.', -1.2, -0.7, T.h0Out, { size: 104, accentSize: 150, late: 2, lateGap: 0.12, accentColor: GERALD }),
    H('Every | *buzz.*', T.h1, T.h1Land, T.h1Out, { accentColor: GOLD }),
    H('Then you | *scroll.*', T.h2, T.h2Land, T.h2Out, { accentColor: '#ff6a6a' }),
    H('A *Scorpio* | steps in.', T.h3, T.h3Land, T.h3Out, { late: 0, accentColor: '#ff8fa8' }),
    H('Say it | *out loud.*', T.h4, T.h4Land, T.h4Out, { accentColor: PINK }),
    H('Talk | *cards.*', T.h5, T.h5Land, T.h5Out, { accentColor: GOLD }),
    H('Gerald, | *today.*', T.h6, T.h6Land, T.h6Out, { accentColor: GERALD }),
  ]
  const B = (lines, open, close) => dialogueBox(root, { lines, y: 1450, width: 960, height: 290, open, close, cps: CPS })
  const boxes = [B(LINES1, T.open1, T.close1), B(LINES2, T.l4 - 0.2, T.close2), B(LINES3, T.open3, T.close3), B(LINES4, T.open4, T.close4), B(LINES5, T.open5, T.close5)]
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const themK = t => t < T.leave[0] ? 1 : t < T.back[0] ? 1 - ease.inCubic(prog(t, ...T.leave)) : pop01(t, T.back[0], 0.4, 2) * popOut(t, T.out)
  const themX = t => t < T.leave[0] ? THEM.x : t < T.back[0] ? lerp(THEM.x, 1250, ease.inCubic(prog(t, ...T.leave))) : lerp(1250, THEM.x, ease.outCubic(prog(t, ...T.back)))

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = popOut(t, T.out)
        const angry = t >= T.balloon[0] && t < T.shrink[0] ? 1 : 0
        if (angry) { x.save(); x.fillStyle = `rgba(60,255,90,${0.08 * ease.inOutQuad(prog(t, ...T.balloon)) * (1 - prog(t, T.l9, T.shrink[1]))})`; x.fillRect(0, 0, 1080, 1920); x.restore() }
        x.save(); x.globalAlpha = clamp(o); drawCouch(x, t); x.restore()
        // Pisces in the back
        const pm = inR(t, [T.balloon[0], T.sco[0]]) ? 'wide' : 'sparkle'
        cast(x, PISP.x, PISP.y, PISP.s, t, { color: PIS.color, glyph: null, mood: pm, look: [-1, 1], seed: 17, pop: o, tears: inR(t, [T.shrink[0], T.lesson]) || t >= T.h6 ? 3 : pm === 'wide' ? 0 : 1, hops: [T.gasp, T.shrink[1]] })
        // the aunties (they pop in to name him)
        const ak = t < T.aunties ? 0 : pop01(t, T.aunties, 0.35, 2.2) * popOut(t, T.auntiesOut)
        const ak2 = t < T.h6 ? 0 : pop01(t, T.h6 + 0.1, 0.35, 2.2) * o
        const AK = Math.max(ak, ak2)
        if (AK > 0.01) {
          auntie(x, AUNT_T.x, AUNT_T.y, AUNT_T.s, t, { color: TAU.color, glyph: TAU.glyph, mood: inR(t, [T.l2, T.l3]) ? 'squint' : 'happy', look: [1, 1], seed: 8, pop: AK, hops: talkHops(ALL, T_TAG, { cps: CPS }).concat(talkHops(ALL, A_TAG, { cps: CPS })), glasses: { frame: '#5a2e14', hi: '#ffd98a', down: inR(t, [T.l2, T.l3]) ? 1 : 0 } })
          auntie(x, AUNT_C.x, AUNT_C.y, AUNT_C.s, t, { color: CAN.color, glyph: CAN.glyph, mood: inR(t, [T.l3, T.close1]) ? 'sparkle' : 'happy', look: [-1, 1], seed: 3, pop: AK, hops: talkHops(ALL, C_TAG, { cps: CPS }).concat(talkHops(ALL, A_TAG, { cps: CPS })), glasses: { frame: '#b3203f', hi: '#ffe08a', chain: true } })
        }
        // Scorpio
        const sk = t < T.sco[0] ? 0 : easeOutBack(prog(t, ...T.sco), 1.6) * popOut(t, T.scoOut)
        if (sk > 0.01) {
          const sx = lerp(1300, SCOP.x, ease.outCubic(prog(t, ...T.sco)))
          const rs = cast(x, sx, SCOP.y, SCOP.s, t, { color: SCO.color, glyph: SCO.glyph, mood: t < T.l7 ? 'squint' : t < T.l7 + 1.4 ? 'neutral' : 'wink', look: [-1, 0], seed: 13, pop: Math.min(1, sk), hops: talkHops(ALL, O_TAG, { cps: CPS }) })
          drawGerald(x, t, rs.x + rs.size * 0.36, rs.top + rs.size * 0.42, 5, { pet: true, alpha: clamp(sk) })
        }
        // them
        const mk = themK(t)
        if (mk > 0.01) {
          const m = moodAt(M_MOOD, t), mx = themX(t)
          const rm = cast(x, mx, THEM.y, THEM.s, t, { color: THEM_COL, mood: m.mood, look: m.look, seed: 5, pop: Math.min(1, mk), hops: [...talkHops(ALL, M_TAG, { cps: CPS }), T.back[1], T.shrink[1] + 0.1, T.flip + 0.2] })
          const bz = T.buzz.reduce((a, b) => Math.max(a, inR(t, [b, b + 0.9]) ? 1 - prog(t, b + 0.5, b + 0.9) : 0), 0)
          if (t < T.leave[0]) drawPhone(x, t, rm.x + rm.size * 0.5, rm.y + 10, 1.1, bz)
          if (inR(t, [T.back[0], T.lesson])) { drawMug(x, rm.x - rm.size * 0.5, rm.y + 30, 1, '#ff9cc0'); drawMug(x, rm.x + rm.size * 0.5, rm.y + 30, 1, '#7fe0ff') }
        }
        // you + Gerald
        const ym = moodAt(Y_MOOD, t)
        const scared = inR(t, [T.balloon[0], T.l8])
        const ry = cast(x, YOU.x, YOU.y, YOU.s, t, { color: YOU_COL, mood: ym.mood, look: ym.look, seed: 2, pop: o, squash: scared ? 0.08 : 0, hops: [...talkHops(ALL, Y_TAG, { cps: CPS }), ...T.buzz.slice(1), T.shrink[1], T.flip + 0.25] })
        if (scared) drawSweat(x, t, ry.x - ry.size * 0.45, ry.y - ry.size * 0.5, 7, 1)
        const gp = geraldPx(t)
        const pet = t >= T.shrink[1] - 0.25
        if (t < T.h5 || t >= T.h6) {
          let gx_ = ry.x + ry.size * 0.4, gy_ = ry.top + ry.size * 0.5
          if (t >= T.h6) { gx_ = 540; gy_ = 1330; drawBed(x, 540, 1360, pop01(t, T.h6, 0.4, 2) * o) }
          drawGerald(x, t, gx_, gy_, gp * (t >= T.h6 ? pop01(t, T.h6 + 0.15, 0.4, 2.4) * o : o), { angry, pet, blink: pet && (t % 3) < 0.15 })
          if (inR(t, [T.growl, T.growl + 1.6])) { x.save(); x.font = `800 ${Math.round(70 + 30 * prog(t, T.growl, T.growl + 0.4))}px ${INTER}`; x.textAlign = 'center'; x.fillStyle = '#ff5050'; x.globalAlpha = 1 - prog(t, T.growl + 1.1, T.growl + 1.6); x.fillText('GRRR', 300 + Math.sin(t * 40) * 6, 560); x.restore() }
          if (t >= T.shrink[0] && t < T.shrink[1] + 0.6) for (let i = 0; i < 3; i++) sparkBurst(x, t, gx_, gy_ - 60, T.shrink[0] + i * (T.shrink[1] - T.shrink[0]) / 3, { n: 8, R: 160 - i * 30, size: 22, seed: i + 3, cols: [GERALD, BONE, PINK] })
          if (pet && t < T.h5) drawHearts(x, t, T.shrink[1], gx_, gy_ - 80, { n: 5, px: 6, spread: 100, life: 1.2 })
          if (t >= T.h6) drawHearts(x, t, T.h6 + 0.6, 540, 1240, { n: 6, px: 6, spread: 140, life: 1.4 })
        }
        drawScrollPhone(x, t, 800, 800, t < T.phone ? 0 : pop01(t, T.phone, 0.35, 2) * popOut(t, T.phoneOut))
        drawTalkCard(x, t, easeOutBack(prog(t, ...T.card), 1.8) * (1 - ease.inCubic(prog(t, ...T.cardOut))))
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates; the default selection keeps 10.6 and 24.0
const CUTS = [4.38, { t: T.cut1, kind: 'flip' }, 17.4, { t: T.cut2, kind: 'deal' }, 30.5]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const bzzt = t => [chipCue(t, 110, 0.18, { wave: 'square', duty: 0.5, gain: 0.05, vib: 0.3, bus: 'drums', dly: 0 }), chipCue(t + 0.24, 110, 0.18, { wave: 'square', duty: 0.5, gain: 0.05, vib: 0.3, bus: 'drums', dly: 0 })]
const grow = (t, f) => [['pop', +t.toFixed(3), f, 0.05, 0.3], chipCue(t + 0.05, f / 2, 0.25, { slide: 3, gain: 0.04, duty: 0.5 })]
export const CUES = [
  ['pop', 0.2, 659.25, 0.03, 0], ...bzzt(0.5),
  // every buzz
  ...headCues(T.h1, 2, T.h1Land, 0), ...bzzt(T.buzz[1]), ...grow(T.buzz[1] + 0.05, 440), ['pop', T.aunties, 880, 0.04, -0.3], ['pop', T.aunties + 0.06, 784, 0.04, 0.3],
  ...bzzt(T.buzz[2]), ...grow(T.buzz[2] + 0.05, 330), ['pluck', T.l3 + 1.2, 1318.51, 0.03, 0.6, 0.3],
  // the scroll
  ...headCues(T.h2, 2, T.h2Land, 2), ['whoosh', T.leave[0], 0.4, 0.04], ['pop', T.phone, 784, 0.04, -0.3],
  ...flutterCue(T.phone + 0.2, 26, 0.12, 0.025),
  ['swell', T.balloon[0], T.balloon[1], { gain: 0.05, f0: 200, f1: 2400, bus: 'drums' }],
  chipCue(T.growl, 82, 1.4, { wave: 'saw', gain: 0.07, vib: 0.2, slide: -0.3, bus: 'drums', dly: 0, rev: 0.2 }), ['boom', T.growl, 0.14],
  ['pop', T.gasp, 392, 0.05, 0.4], ['pop', T.gasp + 0.04, 349.23, 0.05, 0.4],
  // Scorpio
  ...headCues(T.h3, 3, T.h3Land, 4), ...scratchCue(T.sco[0]), ['whoosh', T.sco[0], 0.5, 0.05],
  ['pluck', T.l7 + 1.6, 1567.98, 0.035, 0.6, 0.3],
  // say it
  ...headCues(T.h4, 2, T.h4Land, 1), ['whoosh', T.back[0], 0.4, 0.04], ['pop', T.back[1], 659.25, 0.04, 0.3],
  ...cricketCue(T.l8 + 1.7, 2),
  ...[0, 1, 2].map(i => ['pop', +(T.shrink[0] + i * 0.433).toFixed(3), [523.25, 783.99, 1046.5][i], 0.06, 0]),
  ...[0, 1, 2].map(i => chipCue(T.shrink[0] + i * 0.433, [330, 494, 660][i], 0.12, { slide: 4, gain: 0.04 })),
  ['bell', T.shrink[1], 1567.98, 0.03, 1.4, 0], ['glitter', T.shrink[1], T.shrink[1] + 0.6],
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // talk cards + last line
  ...headCues(T.h5, 2, T.h5Land, 3), ['whoosh', T.card[0], 0.4, 0.04], ['pop', T.flip, 784, 0.04, -0.3], ['pop', T.flip + 0.05, 988, 0.04, 0.3], ['bell', T.flip + 0.35, 1318.51, 0.03, 1, 0],
  ...headCues(T.h6, 2, T.h6Land, 0), ['pop', T.h6 + 0.2, 1174.66, 0.04, 0], ['pluck', T.l10 + 1.2, 1318.51, 0.03, 0.6, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [S_TAG]: 659.25, [T_TAG]: 659.25, [C_TAG]: 880 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [S_TAG]: 659.25 } }),
  ...talkCues(LINES3, { cps: CPS, pitch: { [O_TAG]: 523.25 } }),
  ...talkCues(LINES4, { cps: CPS, pitch: { [Y_TAG]: 987.77, [M_TAG]: 783.99 } }),
  ...talkCues(LINES5, { cps: CPS, pitch: { [A_TAG]: 783.99 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
