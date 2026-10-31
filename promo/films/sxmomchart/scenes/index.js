// sxmomchart — THE STARS EXPLAIN IT TO YOUR MOM, ep. 1: "What's a sun, moon and rising?" (45 s vertical Align ad,
// Star Talk Shows #5, music: dreamy, E♭). Story 0–40.6, then the shared end card.
//   0.0–4.45   MOM (a ♋ Cancer star: grey bun, cardigan, tortoiseshell reading glasses, a cup of tea) sits in her rose
//              armchair squinting at your profile on her phone: ☉ LEO · ☽ PISCES · ↑ VIRGO. "Mom read your *profile.*"
//              MOM: "sweetie, you have *THREE* signs?"
//   4.49       drop: "The Stars Explain It | to *Your Mom.*"  An easel rolls in; THE STARS pop up with a pointer.
//              "three layers. *super* easy."  MOM (sips): "I raised three kids. *go on.*"
//  10.5        card cut.
//  10.55–16.9 "Sun: | *who you are.*"  A pixel sun on the board. "the sun is your core. *who you are.*"  MOM turns her
//              teacup round: a ♋ on the side. "I'm a Cancer. it's on my *mug.*"
//  16.9–22.9  "Moon: | *what you feel.*"  A crescent. "the moon is your *feelings.* the inside."  ♓ PISCES (always crying
//              behind the easel): "I FEEL *EVERYTHING* 😭"  Mom, without looking, lobs a tissue over. HONK.
//  22.9       card cut.
//  22.95–30.9 "Rising: how you | *come across.*"  A sun on a horizon. "rising is your *first impression.*"  Silence: Mom
//              puts the cup down, the camera pushes in. "Mom has | *a theory.*"  "like how I'm nice at *church…*" …
//              "…and *honest* at home."  THE STARS freeze, wide-eyed… "*Exactly.*" confetti, Pisces fountains.
//  31.16–35.35 ★ LESSON UNLOCKED: "You're more than | *one* sign."  +1 MOM GETS IT
//  35.4        card cut.
//  35.45–38.5 "Push. Pull. *Align.*"  The flip chart turns to a night page: two charts, all three layers each, and the
//              reading draws between them. "it reads all three. for *both* of you."
//  38.6–40.5  "Now call | your *mother.*"  Mom holds up her phone: she's already calling you. Ring ring.
// One canvas (sky + set through a camera), DOM type + dialogue boxes + the shared lesson + the show bug, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, drawWheelH, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'
import {
  INK, rgba, starFrame, inSprite, cellPt, FOOT, tearsCells, mom, MOM, drawArmchair, drawTeacup, drawLamp, drawRug, drawEasel,
  drawSunIcon, drawMoonIcon, drawRisingIcon, drawTissues, drawPhone, drawPointer, sparkle, confetti, blit,
} from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', ROSE = '#ff9ec4', SUNC = '#f7b733', MOONC = '#b9c6ff', RISEC = '#ff8f6b'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.25],
  // 0 · the hook: Mom reads your profile
  phone: [0.2, 0.7], l1: 0.85, phoneOut: [4.0, 4.4], close1: 4.4,
  // 1 · title
  drop: BEAT(7), easel: [4.5, 5.1], stars: 4.95, pis: 6.0, l2: 5.15, l3: 7.78, sip: [8.95, 9.75], close2: 10.48,
  cut1: 10.5,
  // 2 · sun
  row1: 10.95, l4: 11.1, l5: 14.05, turn: [14.2, 14.6], close3: 16.95,
  // 3 · moon
  row2: 17.1, l6: 17.3, wail: 20.0, l7: 20.15, toss: [21.0, 21.55], honk: 21.75, close4: 22.85,
  cut2: 22.9,
  // 4 · rising + Mom's theory
  row3: 23.1, l8: 23.15, cupDown: [24.7, 25.1], push: [24.6, 25.5], l9: 25.9, l10: 28.4, freeze: 29.3, exactly: 29.75,
  close5: 30.95,
  // 5 · lesson
  lesson: BEAT(55), lessonOut: [35.15, 35.35],
  cut3: 35.4,
  // 6 · tie-in
  page: [35.45, 35.85], arcs: [36.0, 36.45, 36.9], l11: 35.55, close6: 38.45,
  // 7 · last line
  call: [38.55, 38.9], ring: [39.05, 39.85], out: [40.3, 40.55],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: "You're more than | *one* sign.", chip: '+1 MOM GETS IT' }

// ── the dialogue
const MT = '♋︎ MOM', ST = 'THE STARS', PT = '♓︎ PISCES'
const MC = '#8fdcff', SCOL = GOLD, PC = LAV
const LINES1 = [{ t: T.l1, speaker: MT, color: MC, text: 'sweetie, you have *THREE* signs?' }]
const LINES2 = [
  { t: T.l2, speaker: ST, color: SCOL, text: 'three layers. *super* easy.' },
  { t: T.l3, speaker: MT, color: MC, text: 'I raised three kids. *go on.*' },
]
const LINES3 = [
  { t: T.l4, speaker: ST, color: SUNC, text: 'the sun is your core. *who you are.*' },
  { t: T.l5, speaker: MT, color: MC, text: "I'm a Cancer. it's on my *mug.*" },
]
const LINES4 = [
  { t: T.l6, speaker: ST, color: MOONC, text: 'the moon is your *feelings.*' },
  { t: T.l7, speaker: PT, color: PC, text: 'I FEEL *EVERYTHING* 😭' },
]
const LINES5 = [
  { t: T.l8, speaker: ST, color: RISEC, text: 'rising: your *first impression.*' },
  { t: T.l9, speaker: MT, color: MC, text: "like how I'm nice at *church…*" },
  { t: T.l10, speaker: MT, color: MC, text: '…and *honest* at home.' },
]
const LINES6 = [{ t: T.l11, speaker: ST, color: SCOL, text: 'reads all three, for *both* of you.' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5, ...LINES6]
const CPS = 28
export const BOXES = [[LINES1, T.close1], [LINES2, T.close2], [LINES3, T.close3], [LINES4, T.close4], [LINES5, T.close5], [LINES6, T.close6]]

// ── headlines
const HEADS = [
  { text: 'Mom read your | *profile.*', top: 150, size: 100, accentSize: 156, at: 0.3, late: 1, lateAt: 0.8, accentColor: ROSE, out: [4.1, 4.3] },
  { text: 'The Stars Explain It | to *Your Mom.*', top: 150, size: 88, accentSize: 140, at: T.drop + 0.05, gap: 0.08, late: 2, lateAt: BEAT(8), lateGap: 0.14, accentColor: ROSE, out: [10.1, 10.3], fit: true },
  { text: 'Sun: | *who you are.*', top: 150, size: 100, accentSize: 150, at: 10.62, late: 3, lateAt: 10.95, lateGap: 0.1, accentColor: SUNC, out: [16.55, 16.75] },
  { text: 'Moon: | *what you feel.*', top: 150, size: 100, accentSize: 150, at: 16.95, late: 3, lateAt: 17.15, lateGap: 0.1, accentColor: MOONC, out: [22.55, 22.75] },
  { text: 'Rising: how you | *come across.*', top: 150, size: 92, accentSize: 140, at: 22.98, gap: 0.08, late: 2, lateAt: 23.3, lateGap: 0.12, accentColor: RISEC, out: [24.5, 24.7], fit: true },
  { text: 'Mom has | *a theory.*', top: 150, size: 104, accentSize: 156, at: 25.3, late: 2, lateAt: 25.65, lateGap: 0.12, accentColor: ROSE, out: [29.3, 29.45] },
  { text: '*Exactly.*', top: 190, size: 120, accentSize: 210, at: T.exactly, late: 1, lateAt: T.exactly, accentColor: GOLD, out: [30.85, 31.05] },
  { text: 'Push. Pull. *Align.*', top: 170, size: 100, accentSize: 150, at: 35.55, gap: 0.12, late: 1, lateAt: 35.95, accentColor: READING.align, out: [38.25, 38.45] },
  { text: 'Now call | your *mother.*', top: 150, size: 108, accentSize: 168, at: 38.62, late: 1, lateAt: 39.0, accentColor: ROSE, out: [40.3, 40.5] },
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
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic }
const IDN = [1, 540, 960, 540, 960]
const CAM = [
  [0, 1.16, 420, 1060, 470, 1060],
  [4.3, 1.18, 420, 1060, 470, 1060, 'lin'],
  [5.0, ...IDN, 'io'],
  [24.6, ...IDN, 'lin'], [25.5, 1.38, 330, 1110, 470, 1080, 'io'], [29.3, 1.42, 330, 1110, 470, 1080, 'lin'], [29.75, ...IDN, 'out'],
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
const STARS_AT = { x: 850, size: 250 }
const EASEL = { cx: 560, top: 446, w: 600, h: 440 }
const PIS_AT = { x: 975, y: 520, s: 112 }
const ROWS = [{ y: 528, icon: 'sun', label: 'SUN', sub: 'who you are', col: SUNC, at: T.row1 }, { y: 666, icon: 'moon', label: 'MOON', sub: 'what you feel', col: '#6f7fd0', at: T.row2 }, { y: 804, icon: 'rise', label: 'RISING', sub: 'how you come across', col: '#e0603a', at: T.row3 }]

// ── moods
function momState(t) {
  const st = { mood: 'neutral', look: [1, -1], glassesDown: 0, blink: undefined, squash: 0, sip: 0, show: 0, cupDown: 0, tissue: 0 }
  st.sip = clamp(prog(t, T.sip[0], T.sip[0] + 0.25)) * (1 - prog(t, T.sip[1] - 0.25, T.sip[1]))
  st.show = t >= T.turn[0] && t < T.cut2 ? ease.outBack(prog(t, ...T.turn)) : 0
  st.cupDown = ease.inOutCubic(prog(t, ...T.cupDown)) * (1 - ease.inOutCubic(prog(t, T.cut3, T.cut3 + 0.4)))
  if (t < T.drop) { st.mood = t < 2.5 ? 'squint' : 'wide'; st.look = t < 2.5 ? [1, 0] : [0, 0]; st.glassesDown = 0.8; st.blink = t < 2.5 ? undefined : false; return st }
  if (t < T.l3) { st.mood = t > 6.6 ? 'squint' : 'neutral'; st.look = [1, -1]; return st }
  if (t < T.sip[0]) { st.mood = 'neutral'; st.look = [0, 0]; return st }
  if (t < T.sip[1]) { st.mood = 'happy'; st.look = [0, 0]; return st }
  if (t < T.cut1) { st.mood = 'neutral'; st.look = [1, -1]; st.glassesDown = 0.5; return st }
  if (t < T.l5) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.close3) { st.mood = t < T.turn[1] ? 'neutral' : 'happy'; st.look = [0, 0]; return st }
  if (t < T.wail) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.close4) { st.mood = 'neutral'; st.look = [0, 0]; st.blink = t > T.toss[0] && t < T.toss[0] + 0.25 ? 1 : undefined; return st }
  if (t < T.cupDown[0]) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.l9) { st.mood = 'squint'; st.look = [1, -1]; st.glassesDown = ease.inOutCubic(prog(t, 25.0, 25.5)) * 0.7; return st }
  st.glassesDown = 0.7
  if (t < T.l10 + 0.7) { st.mood = 'neutral'; st.look = [0, 0]; return st }
  if (t < T.exactly) { st.mood = 'wink'; st.look = [0, 0]; return st }
  st.glassesDown = 0.7 * (1 - prog(t, 30.0, 30.4))
  if (t < T.cut3) { st.mood = 'happy'; return st }
  if (t < T.call[0]) { st.mood = 'sparkle'; st.look = [1, -1]; return st }
  st.mood = t < T.ring[0] + 0.3 ? 'neutral' : 'wink'; st.look = [0, 0]
  return st
}
function starsState(t) {
  const st = { mood: 'happy', look: [-1, -1], blink: undefined, squash: 0, point: -1 }
  if (t < T.l2 + 1.1) return st
  if (t < T.l3) { st.mood = 'happy'; st.look = [-1, 0]; return st }
  if (t < T.cut1) { st.mood = t < T.sip[0] ? 'wide' : 'neutral'; st.look = [-1, 0]; return st }
  if (t < T.l5) { st.point = 0; st.mood = 'happy'; return st }
  if (t < T.close3) { st.mood = t > T.turn[1] ? 'wide' : 'neutral'; st.look = [-1, 0]; st.point = 0; return st }
  if (t < T.wail) { st.point = 1; st.mood = 'happy'; return st }
  if (t < T.close4) { st.mood = 'wide'; st.look = [1, -1]; st.point = 1; return st }
  if (t < T.cupDown[0]) { st.point = 2; st.mood = 'happy'; return st }
  if (t < T.freeze) { st.point = 2; st.mood = 'neutral'; st.look = [-1, 0]; return st }
  if (t < T.exactly) { st.mood = 'wide'; st.look = [-1, 0]; st.blink = false; st.point = 2; return st }
  if (t < T.cut3) { st.mood = 'sparkle'; st.look = [-1, 0]; st.squash = 0.1 * bump(t, T.exactly, 0.4); return st }
  if (t < T.close6) { st.mood = 'happy'; st.point = 3; return st }
  st.mood = 'happy'; st.look = [-1, 0]
  return st
}
function pisState(t) {
  const st = { mood: 'sparkle', look: [-1, 0], tears: 1, k: 1, x: PIS_AT.x, y: PIS_AT.y, s: PIS_AT.s }
  st.k = pop01(t, T.pis, 0.35, 2.2)
  if (t < T.wail) return st
  if (t < T.honk) { st.tears = 3; st.mood = 'sparkle'; st.s = PIS_AT.s * (1 + 0.25 * ease.outBack(prog(t, T.wail, T.wail + 0.3))); return st }
  if (t < T.close4) { st.tears = 0; st.mood = 'happy'; st.s = PIS_AT.s * 1.25 * (1 - 0.2 * prog(t, T.honk + 0.5, T.close4)); return st }
  if (t < T.freeze) return st
  if (t < T.cut3) { st.tears = t > T.exactly ? 3 : 2; return st }
  st.tears = 2
  return st
}

const hopsOf = sp => talkHops(ALL_LINES, sp, { cps: CPS })
const M_HOPS = [...hopsOf(MT), T.turn[1], T.exactly + 0.1, T.ring[0], T.ring[0] + 0.45]
const S_HOPS = [...hopsOf(ST), T.stars + 0.3, T.row1, T.row2, T.row3, T.exactly, T.exactly + 0.45, T.exactly + 0.9, T.lesson + 0.2, ...T.arcs]
const P_HOPS = [...hopsOf(PT), T.pis + 0.4, T.honk, T.exactly + 0.15, T.exactly + 0.6]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1480, width: 960, height: 250, cps: CPS }
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { ...BOX, lines, open: lines[0].t - 0.2, close }))
  // the show bug: top-left, the whole runtime
  const bug = el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: ROSE, textShadow: '0 2px 10px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', pointerEvents: 'none' }, root)
  bug.innerHTML = 'EXPLAIN IT TO MOM<span style="color:rgba(255,255,255,0.6)"> · EP 1</span>'
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.6 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const withCam = (C, fn) => { x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z, C.sy - C.fy * C.z); fn(); x.restore() }
  const text = (s, X, Y, font, col, align = 'left') => { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, X, Y) }

  // ═══ the room
  function room(t) {
    // a soft warm floor glow + the rug
    const g = x.createRadialGradient(400, FLOOR, 40, 400, FLOOR, 700); g.addColorStop(0, 'rgba(255,180,140,0.16)'); g.addColorStop(1, 'rgba(255,180,140,0)')
    x.fillStyle = g; x.fillRect(-300, FLOOR - 500, W + 600, 900)
    drawRug(x, 520, FLOOR + 6, 560, 64)
    drawLamp(x, 66, FLOOR - 10, 6, t, 1)
  }
  // ═══ the flip chart
  function board(t) {
    const k = t < T.easel[0] ? 0 : t >= T.out[0] ? 1 - prog(t, ...T.out) : 1
    if (k <= 0) return
    const slide = (1 - ease.outBack(prog(t, ...T.easel))) * 900
    x.save(); x.translate(slide, 0)
    x.globalAlpha *= 1 - 0.78 * clamp(prog(t, 24.6, 25.3)) * (1 - prog(t, 29.5, 29.9))   // the board recedes while Mom has the floor
    const B = drawEasel(x, EASEL.cx, EASEL.top, EASEL.w, EASEL.h)
    const pageK = ease.inOutCubic(prog(t, ...T.page))
    // the three layers
    ROWS.forEach((R, i) => {
      const pk = pop01(t, R.at, 0.4, 2.2)
      if (pk <= 0 || pageK >= 1) return
      const focus = starsState(t).point === i
      if (focus) { x.fillStyle = rgba(R.col, 0.14); x.fillRect(B.x + 14, R.y - 62, B.w - 28, 124) }
      x.save(); x.translate(B.x + 96, R.y); x.scale(pk * 1.2, pk * 1.2)
      if (R.icon === 'sun') drawSunIcon(x, 0, 0, 40, t)
      else if (R.icon === 'moon') drawMoonIcon(x, 0, 0, 44)
      else drawRisingIcon(x, 0, 18, 42, t)
      x.restore()
      x.save(); x.globalAlpha *= clamp(pk)
      text(R.label, B.x + 186, R.y - 28, `700 40px ${MONO}`, R.col)
      text(R.sub, B.x + 186, R.y + 24, `italic 500 ${R.icon === 'rise' ? 46 : 56}px ${SERIF}`, '#4a2a3a')
      x.restore()
      if (i < 2) { x.fillStyle = 'rgba(122,58,42,0.25)'; x.fillRect(B.x + 30, R.y + 68, B.w - 60, 3) }
      sparkle(x, t, B.x + 92, R.y, R.at + 0.15, { n: 8, R: 80, size: 20, seed: i })
    })
    // the tie-in page: a night-sky sheet flips down over the board; two charts, three layers each, the reading between
    if (pageK > 0) {
      const ph = B.h * pageK
      x.fillStyle = '#1a1238'; x.fillRect(B.x, B.y, B.w, ph)
      x.fillStyle = '#2a1b52'; x.fillRect(B.x, B.y + ph - 10, B.w, 10)
      if (pageK >= 1) {
        const cy = B.y + B.h * 0.5, L = { x: B.x + 108, y: cy }, Rr = { x: B.x + B.w - 108, y: cy }, r = 88
        for (const [P, lbl] of [[L, 'YOU'], [Rr, 'THEM']]) {
          drawWheelH(x, { W: { cx: P.x, cy: P.y, rOut: r, rIn: r - 20, rGlyph: r - 10, alpha: 0.85 }, k: 1, glyphK: 0 })
          drawSunIcon(x, P.x, P.y - 34, 15, t, { face: false }); drawMoonIcon(x, P.x - 32, P.y + 22, 15); drawRisingIcon(x, P.x + 32, P.y + 28, 14, t)
          text(lbl, P.x, P.y + r + 30, `700 24px ${MONO}`, BONE, 'center')
        }
        const ARCS = [{ col: READING.push, lbl: 'PUSH', dy: -150 }, { col: READING.pull, lbl: 'PULL', dy: 0 }, { col: READING.align, lbl: 'ALIGN', dy: 150 }]
        ARCS.forEach((A, i) => {
          const p = ease.inOutCubic(prog(t, T.arcs[i], T.arcs[i] + 0.4))
          if (p <= 0) return
          const x0 = L.x + r - 6, x1 = Rr.x - r + 6, mx = (x0 + x1) / 2, my = cy + A.dy * 0.9
          x.strokeStyle = A.col; x.lineWidth = 7; x.lineCap = 'round'
          x.beginPath()
          for (let s = 0; s <= 24 * p; s++) { const u = s / 24, qx = (1 - u) ** 2 * x0 + 2 * (1 - u) * u * mx + u * u * x1, qy = (1 - u) ** 2 * cy + 2 * (1 - u) * u * my + u * u * cy; s ? x.lineTo(qx, qy) : x.moveTo(qx, qy) }
          x.stroke()
          const lblK = 1 - prog(t, 38.2, 38.45)        // no 'ALIGN' on screen in the last 2 s before the end card
          if (p >= 1 && lblK > 0) {
            x.save(); x.globalAlpha *= lblK
            const lx = mx, ly = cy + A.dy * 0.45
            x.font = `700 22px ${MONO}`; const tw = x.measureText(A.lbl).width + 20
            x.fillStyle = '#1a1238'; x.fillRect(lx - tw / 2, ly - 16, tw, 32); x.strokeStyle = A.col; x.lineWidth = 3; x.strokeRect(lx - tw / 2, ly - 16, tw, 32)
            text(A.lbl, lx, ly + 1, `700 22px ${MONO}`, A.col, 'center')
            sparkle(x, t, lx, ly, T.arcs[i] + 0.4, { n: 6, R: 50, size: 16, seed: i + 3 })
            x.restore()
          }
        })
      }
    }
    x.restore()
  }
  // ═══ the cast
  function cast(t) {
    // the armchair + Mom
    drawArmchair(x, MOM_AT.x, 1100, 14)
    const M = momState(t)
    const momY = MOM_BASE - FOOT * MOM_AT.size
    const momOpts = { mood: M.mood, look: M.look, blink: M.blink, glassesDown: M.glassesDown, hops: M_HOPS, seed: 2, squash: M.squash }
    const F = mom(x, MOM_AT.x, momY, MOM_AT.size, t, momOpts)
    // the teacup in her right point (viewer's right): sips lift it to her face; set down on the chair arm for the theory
    const hand = cellPt(F, 33, 21)
    const cupX = lerp(lerp(hand.x + 14, MOM_AT.x + 70, M.sip), 415, M.cupDown), cupY = lerp(lerp(hand.y, F.oy - 150, M.sip), 1180, M.cupDown)
    if (t < T.call[0]) drawTeacup(x, cupX, cupY, 9, t, { show: M.show, tilt: -0.5 * M.sip, steam: 1 - M.sip })
    // the tissue box on the left arm, from the moon beat
    if (t >= T.row2 && t < T.cut3) drawTissues(x, 130, 1222, 7, t)
    // the tissue toss: an arc from Mom's chair to Pisces
    if (inR(t, T.toss[0], T.toss[1] + 0.1)) {
      const p = clamp(prog(t, ...T.toss)), tx = lerp(150, PIS_AT.x - 40, p), ty = lerp(1180, PIS_AT.y, p) - Math.sin(Math.PI * p) * 520
      x.save(); x.translate(tx, ty); x.rotate(p * 9); blit(x, ['..WW..', '.WWWW.', 'WWWWWW', '.WWWW.'], { W: '#ffffff' }, 0, 0, 8); x.restore()
    }
    // the phone (hook + last line), held up in her left point
    if (t >= T.call[0]) {
      const k = pop01(t, T.call[0], 0.35, 2)
      const ring = inR(t, ...T.ring) ? Math.sin(t * 60) * 0.06 : 0
      drawPhone(x, MOM_AT.x + 190, 1010, 200, 330, (X0, Y0, w, h) => callScreen(t, X0, Y0, w, h), { k, rot: -0.12 + ring })
      if (inR(t, T.ring[0], T.out[0])) for (let i = 0; i < 3; i++) {
        const ph = ((t - T.ring[0]) * 1.4 + i / 3) % 1
        x.strokeStyle = rgba('#7dffb0', 1 - ph); x.lineWidth = 6; x.beginPath(); x.arc(MOM_AT.x + 190, 1010, 190 + ph * 160, -1.1, -0.2); x.stroke()
      }
    }
    // THE STARS + the pointer
    const S = starsState(t), sk = pop01(t, T.stars, 0.4, 2.2)
    if (sk > 0) {
      const sY = 1300 - FOOT * STARS_AT.size
      const SF = starFrame(STARS_AT.x, sY, STARS_AT.size, t, { pop: sk, hops: S_HOPS, seed: 5, squash: S.squash })
      if (S.point >= 0 && sk >= 1) {
        const from = cellPt(SF, 4, 14)
        const tgt = S.point < 3 ? { x: EASEL.cx - 120, y: ROWS[S.point].y + 30 } : { x: EASEL.cx + 40, y: EASEL.top + 250 }
        const wig = Math.sin(t * 5) * 6
        drawPointer(x, from.x, from.y, tgt.x + 230, tgt.y + 40 + wig)
      }
      drawStarChar(x, STARS_AT.x, sY, STARS_AT.size, t, { color: STAR.sky, mood: S.mood, look: S.look, blink: S.blink, hops: S_HOPS, seed: 5, pop: sk, squash: S.squash })
    }
  }
  function pisces(t) {
    const P = pisState(t)
    if (P.k <= 0) return
    const o = { color: PIS.color, glyph: null, mood: P.mood, look: P.look, hops: P_HOPS, seed: 9, pop: P.k }
    drawStarChar(x, P.x, P.y, P.s, t, o)
    const F = starFrame(P.x, P.y, P.s, t, o)
    inSprite(x, F, () => tearsCells(x, t, P.tears))
    if (t >= T.honk && t < T.honk + 0.6) {
      const k = bump(t, T.honk, 0.6)
      x.save(); x.translate(P.x - 70, P.y - 90); x.rotate(-0.15); x.scale(k, k)
      x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('HONK', 0, 0); x.fillStyle = '#fff2a8'; x.fillText('HONK', 0, 0); x.restore()
    }
  }
  // the hook's phone screen: your profile
  function profileScreen(t, X0, Y0, w, h) {
    x.fillStyle = '#1a1238'; x.fillRect(X0, Y0, w, h)
    text('YOUR PROFILE', X0 + w / 2, Y0 + 52, `700 22px ${MONO}`, LAV, 'center')
    const R = [['sun', 'LEO', SUNC], ['moon', 'PISCES', MOONC], ['rise', 'VIRGO', RISEC]]
    R.forEach(([ic, lbl, col], i) => {
      const k = pop01(t, 0.7 + i * 0.35, 0.3, 2.2)
      if (k <= 0) return
      const yy = Y0 + 140 + i * 120
      x.save(); x.translate(X0 + 70, yy); x.scale(k, k)
      if (ic === 'sun') drawSunIcon(x, 0, 0, 22, t, { face: false }); else if (ic === 'moon') drawMoonIcon(x, 0, 0, 24); else drawRisingIcon(x, 0, 10, 24, t)
      x.restore()
      x.save(); x.globalAlpha *= clamp(k); text(lbl, X0 + 120, yy, `700 34px ${MONO}`, col); x.restore()
    })
  }
  function callScreen(t, X0, Y0, w, h) {
    x.fillStyle = '#123a2c'; x.fillRect(X0, Y0, w, h)
    text('calling…', X0 + w / 2, Y0 + 56, `700 20px ${MONO}`, '#bff7d8', 'center')
    text('MOM ♥', X0 + w / 2, Y0 + 100, `800 34px ${INTER}`, '#ffffff', 'center')
    // a tiny pixel Mom avatar
    x.fillStyle = MOM.color; x.beginPath(); x.arc(X0 + w / 2, Y0 + 165, 34, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.fillRect(X0 + w / 2 - 14, Y0 + 160, 8, 10); x.fillRect(X0 + w / 2 + 6, Y0 + 160, 8, 10)
    x.fillStyle = '#ff5c6a'; x.beginPath(); x.arc(X0 + 48, Y0 + h - 44, 22, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#3ad07a'; x.beginPath(); x.arc(X0 + w - 48, Y0 + h - 44, 22 + 3 * Math.sin(t * 12), 0, Math.PI * 2); x.fill()
  }
  function hookPhone(t) {
    if (t >= T.phoneOut[1]) return
    const k = ease.outBack(prog(t, ...T.phone)), o = ease.inCubic(prog(t, ...T.phoneOut))
    drawPhone(x, 700 + o * 700, 880 + (1 - k) * 900, 330, 480, (X0, Y0, w, h) => profileScreen(t, X0, Y0, w, h), { rot: 0.05 + o * 0.4 })
    // Mom's reading line: a dotted gaze from her glasses to the screen
    if (t > 1.0 && t < 2.6) { x.fillStyle = rgba(MC, 0.5); for (let i = 0; i < 6; i++) x.fillRect(Math.round(lerp(380, 600, i / 5)), Math.round(lerp(1100, 960, i / 5)), 8, 8) }
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
      // a dark scrim under the headline while the camera pushes in on Mom (the board rises behind the type)
      const scr = clamp(prog(t, 24.6, 25.3)) * (1 - prog(t, 29.5, 29.9))
      if (scr > 0) { const g = x.createLinearGradient(0, 0, 0, 560); g.addColorStop(0, `rgba(6,4,18,${0.85 * scr})`); g.addColorStop(0.75, `rgba(6,4,18,${0.7 * scr})`); g.addColorStop(1, 'rgba(6,4,18,0)'); x.fillStyle = g; x.fillRect(0, 0, W, 560) }
      confetti(x, t, T.exactly, { n: 80, life: 2.8 })
      sparkle(x, t, STARS_AT.x, 1150, T.exactly, { n: 12, R: 200, size: 30 })
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

// card-motif candidates (the default selection keeps indices 1, 3, 5 → 10.5, 22.9, 35.4)
export const CUTS = [4.45, T.cut1, 16.9, T.cut2, 29.7, T.cut3, 38.55]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]
export const _T = T, _LESSON = LESSON, _HEADS = HEADS
void lessonTimes; void lineTimes

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { Eb3: 155.56, G3: 196.0, Bb3: 233.08, Eb4: 311.13, G4: 392.0, Bb4: 466.16, C4: 261.63, Ab3: 207.65 }
const r3 = v => +v.toFixed(3)
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const sob = t0 => [0, 0.16, 0.3].map((d, i) => ['chip', r3(t0 + d), 760 - i * 60, 0.13, { duty: 0.5, slide: -6, vib: 0.06, gain: 0.014, decay: 0.1, sustain: 0.5, rev: 0.25, dly: 0, bus: 'fx' }])
const slurp = t0 => [['chip', r3(t0), 1600, 0.45, { wave: 'noise', slide: 10, gain: 0.02, decay: 0.4, sustain: 0.5, rev: 0.1, dly: 0, bus: 'fx' }]]
const ring = t0 => [0, 0.09, 0.18, 0.27].map((d, i) => ['chip', r3(t0 + d), i % 2 ? 1318.51 : 1046.5, 0.08, { duty: 0.25, gain: 0.02, decay: 0.07, sustain: 0.5, rev: 0.15, dly: 0, bus: 'fx' }])
export const CUES = [
  // 0 · the hook
  ['whoosh', T.phone[0], 0.4, 0.05], ['pop', T.phone[1], 784, 0.035, 0.3],
  ...headCues(HEADS[0]),
  ...[0, 1, 2].map(i => ['pop', r3(0.7 + i * 0.35 + 0.1), NOTE[2 + i * 2], 0.03, 0.3]),
  ['chip', 2.55, 520, 0.3, { wave: 'tri', slide: 8, gain: 0.03, decay: 0.25, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }],   // Mom's "hm?"
  ['riser', 3.4, 4.47, 0.04], ['whoosh', T.phoneOut[0], 0.45, 0.06],
  // 1 · title
  ['boom', T.drop, 0.3], ['brass', T.drop, [N.Eb3, N.G3, N.Bb3, N.Eb4], 1.0, { gain: 0.04, bright: 1.1, ...FXB }],
  ...headCues(HEADS[1]),
  ['whoosh', T.easel[0], 0.5, 0.06], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.easel[0] + i * 0.09), 0.02]), ['tom', T.easel[1], 110, { gain: 0.2, decay: 0.3, rev: 0.3, bus: 'fx' }],
  ['pop', T.stars, 988, 0.04, 0.4], ['glitter', T.stars, r3(T.stars + 0.6)],
  ['pop', T.pis, 880, 0.03, 0.6], ...sob(T.pis + 0.4),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [MT]: 659.25, [ST]: 880, [PT]: 1174.66 } }),
  ...slurp(T.sip[0] + 0.25),
  // 2 · sun
  ...headCues(HEADS[2]), ['pop', T.row1, 1174.66, 0.045, -0.2], ['bell', r3(T.row1 + 0.05), 1318.51, 0.03, 1.2, -0.2], ['glitter', T.row1, r3(T.row1 + 0.5)],
  ['whoosh', T.turn[0], 0.3, 0.04], ['pop', T.turn[1], 784, 0.04, -0.4], ['bell', r3(T.turn[1] + 0.03), 1567.98, 0.025, 1.0, -0.4],
  // 3 · moon
  ...headCues(HEADS[3]), ['pop', T.row2, 1174.66, 0.045, -0.2], ['bell', r3(T.row2 + 0.05), 1174.66, 0.03, 1.2, -0.2], ['glitter', T.row2, r3(T.row2 + 0.5)],
  ...sob(T.wail), ...sob(T.wail + 0.5), ...sob(T.wail + 1.0),
  ['whoosh', T.toss[0], 0.5, 0.04], ['pop', T.toss[1], 1046.5, 0.03, 0.6],
  ['chip', T.honk, 196, 0.35, { duty: 0.5, slide: -3, gain: 0.05, decay: 0.3, sustain: 0.6, rev: 0.2, dly: 0, bus: 'fx' }],
  // 4 · rising + the theory
  ...headCues(HEADS[4]), ['pop', T.row3, 1174.66, 0.045, -0.2], ['bell', r3(T.row3 + 0.05), 1567.98, 0.03, 1.2, -0.2], ['glitter', T.row3, r3(T.row3 + 0.5)],
  ['tick', r3(T.cupDown[1]), 0.05], ['pop', r3(T.cupDown[1]), 523.25, 0.02, -0.4],
  ...headCues(HEADS[5]),
  ['tapeStop', r3(T.freeze), 0.35],
  ['boom', T.exactly, 0.34], ['brass', T.exactly, [N.Eb3, N.Bb3, N.Eb4, N.G4, N.Bb4], 1.2, { gain: 0.05, bright: 1.2, ...FXB }],
  ['glitter', T.exactly, r3(T.exactly + 1.4)], ...headCues(HEADS[6]), ...sob(T.exactly + 0.3), ...sob(T.exactly + 0.8),
  // 5 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Eb' }),
  // 6 · tie-in
  ['whoosh', T.page[0], 0.4, 0.05], ['tick', T.page[1], 0.04],
  ...headCues(HEADS[7]),
  ...T.arcs.flatMap((a, i) => [['whoosh', a, 0.35, 0.03], ['pop', r3(a + 0.4), NOTE[3 + i], 0.04, (i - 1) * 0.4]]),
  // 7 · last line
  ['pop', T.call[0], 659.25, 0.04, -0.3], ...headCues(HEADS[8]),
  ...ring(T.ring[0]), ...ring(T.ring[0] + 0.5),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
