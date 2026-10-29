// st8court (40 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", EP 08) · story 0–35.6, then the shared end card.
//   Genre: the courtroom drama on court TV. "Venus vs. *Mars.* | All rise."  Judge Saturn at the bench, Venus (plaintiff)
//   and Mars (defendant, with his real moons Phobos and Deimos as a hype crew) at the tables, a COURT TV · LIVE bug and a
//   case chyron. The real history as "evidence": in Greek myth (the Odyssey) Aphrodite and Ares were caught in a golden
//   net forged by Hephaestus (kept PG: "caught in a net"). In the gallery sit Libra (ruled by Venus) and Aries (ruled by
//   Mars), a couple since season 4: their rulers are exes.
//   0.00       frame 0: Saturn mid-gavel-slam, the hook card, both parties at their tables.  SATURN: "order. this court
//              hears Venus v. Mars."   3.6 VENUS: "your honor, he keeps bringing up the past."
//   6.9        MARS: "EXHIBIT A, your honor. the net."  8.4 an evidence bag; a courtroom-sketch insert of two stars in a
//              golden net + the fact chip.  VENUS: "OBJECTION. that's a myth. it's ancient."  SATURN: "…sustained."
//   14.6       card cut to the gallery: Libra and Aries, sweating. ARIES: "so our rulers are… exes?"  LIBRA: "please don't
//              make this weird."  (the hidden Comet crosses the high window.)
//   20.0       back in court. MARS (soft underneath): "honestly? i just miss her, your honor." (the moons cry)
//              VENUS: "i miss it too. missing isn't a reason."  23.5 the ghost peeks out from behind the witness stand.
//   26.3       "THE VERDICT" title card. SATURN: "verdict: no case. you dated. it ended."  The gavel; CASE DISMISSED.
//   30.1       the same framing as frame 0: Saturn's gavel comes down again, Mars bows, the moons hug, Venus waves.
//              Last line: "Old love isn't *evidence.*"
// One canvas (sky + courtroom + cast), DOM type (hook card, box, headlines, last line), grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { SATURN, drawSaturn, drawBits, gaspCues } from '../../st5cast.js'
import { VENUS, MARS, drawVenus, drawMars, drawComet, drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'

export const DURATION = 40
const KEY = 'Cm'
const STORY_END = DURATION - ENDCARD_LEN       // 35.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#c8344f', WOOD = '#5a3622', WOOD2 = '#6e4329'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const LIB = signStar('libra'), ARI = signStar('aries')

// ── the timeline
const T = {
  hookOut: 3.1, open: -0.9, l1: -0.7,
  l2: 3.6, lt1: 3.4, l3: 6.9, bag: 8.4, sketch: [9.0, 14.2], chip: 9.4, l4: 9.8, objection: 9.8, l5: 13.0,
  gallery: 14.6, l6: 15.0, comet: 16.2, l7: 17.4, sweat: 15.4,
  court: 20.0, l8: 20.2, gasp: 21.9, l9: 23.3, ghost: 23.5,
  verdict: [26.2, 27.4], l10: 26.6, slam2: 28.45, dismissed: 28.55, close: 29.9,
  last: 30.1, lastLand: 30.65, slam3: 31.2, bow: 31.4, lastOut: [35.0, 35.3], end: [34.95, 35.3],
}
const GAVEL = [0.02, 0.62, 13.05, T.slam2, T.slam3]
const SAT_N = SATURN.tag, VEN_N = VENUS.tag, MAR_N = MARS.tag, ARI_N = '♈ ARIES', LIB_N = '♎ LIBRA'
const LINES = [
  { t: T.l1, speaker: SAT_N, text: 'order. this court hears Venus v. *Mars.*', color: SATURN.tagColor },
  { t: T.l2, speaker: VEN_N, text: 'your honor, he keeps bringing up the *past.*', color: VENUS.tagColor },
  { t: T.l3, speaker: MAR_N, text: 'EXHIBIT A, your honor. the *net.*', color: MARS.tagColor },
  { t: T.l4, speaker: VEN_N, text: 'OBJECTION. that’s a myth. it’s *ancient.*', color: VENUS.tagColor },
  { t: T.l5, speaker: SAT_N, text: '…*sustained.*', color: SATURN.tagColor },
  { t: T.l6, speaker: ARI_N, text: 'so our rulers are… *exes?*', color: ARI.color },
  { t: T.l7, speaker: LIB_N, text: 'please don’t make this *weird.*', color: LIB.color },
  { t: T.l8, speaker: MAR_N, text: 'honestly? i just *miss* her, your honor.', color: MARS.tagColor },
  { t: T.l9, speaker: VEN_N, text: 'i miss it too. missing isn’t a *reason.*', color: VENUS.tagColor },
  { t: T.l10, speaker: SAT_N, text: 'verdict: no case. you dated. it *ended.*', color: SATURN.tagColor },
]
const CPS = 28

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const r3 = v => +v.toFixed(3)

// ── layout
const SAT0 = { x: 540, y: 778, size: 270 }
const BENCH = { x0: 250, x1: 830, y0: 872, y1: 1080 }
const VEN0 = { x: 232, y: 1070, size: 236 }
const MAR0 = { x: 850, y: 1066, size: 206 }
const WIT = { x0: 930, x1: 1080, y0: 940, y1: 1080 }

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
const SWEAT = ['.w.', 'wWw', 'WWW', '.W.']
const SWEAT_C = { w: '#bfe8ff', W: '#7fd0ff' }

export const GHOST = { at: T.ghost, x: 168, y: 760, where: 'peeking out from behind the left purple banner on the courtroom wall' }
export const COMET_AT = T.comet

/** the gavel angle: raised before each strike, down on it, a little bounce after */
function gavelAngle(t) {
  let a = 0.5
  for (const g of GAVEL) {
    if (t < g - 0.4 || t > g + 0.5) continue
    if (t < g) a = lerp(0.5, -0.15, ease.outCubic(prog(t, g - 0.4, g - 0.12))) + 1.5 * ease.inQuad(prog(t, g - 0.12, g))
    else a = 1.35 - 0.12 * Math.sin(prog(t, g, g + 0.5) * Math.PI) - 0.85 * ease.inOutQuad(prog(t, g + 0.15, g + 0.5))
  }
  return t < 0.02 ? 1.35 : a
}
function venState(t) {
  if (t < T.l2) return { mood: 'neutral', look: [0.6, -0.6] }
  if (t < T.l3) return { mood: 'squint', look: [1, 0] }
  if (t < T.l5) return { mood: 'wide', look: [1, -0.4], blink: false }
  if (t < T.l8) return { mood: 'happy', look: [0.5, -0.8] }
  if (t < T.l9) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.bow) return { mood: 'neutral', look: [0.6, -0.6] }
  return { mood: 'happy', look: [1, 0] }
}
function marState(t) {
  if (t < T.l3) return { mood: 'smug', moonMood: 'hype' }
  if (t < T.l4) return { mood: 'smug', moonMood: 'hype' }
  if (t < T.l8) return { mood: 'wide', moonMood: 'neutral' }
  if (t < T.l10) return { mood: 'sad', moonMood: 'cry' }
  if (t < T.bow) return { mood: 'neutral', moonMood: 'neutral' }
  return { mood: 'happy', moonMood: 'heart' }
}
function satState(t) {
  if (t < T.l2) return { mood: 'squint', look: [0, 1] }
  if (t >= T.l4 && t < T.l5) return { mood: 'wide', look: [-1, 0.5] }
  if (t >= T.gasp && t < T.l10) return { mood: 'neutral', look: [1, 0.5] }
  if (t >= T.bow) return { mood: 'happy', look: [0, 0.5] }
  return { mood: 'squint', look: [t % 6 < 3 ? -1 : 1, 0.5] }
}
const VEN_HOPS = talkHops(LINES, VEN_N, { cps: CPS })
const MAR_HOPS = [...talkHops(LINES, MAR_N, { cps: CPS }), T.bow]
const SAT_HOPS = [...talkHops(LINES, SAT_N, { cps: CPS }), ...GAVEL]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "800 40px Inter", "italic 500 34px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Venus vs. *Mars.* | All rise.', at: 0, out: T.hookOut, accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1452, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const HS = [
    [popText(root, 'Exhibit *A.*', { top: 200, size: 120, accentSize: 190, at: 7.0, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: 7.3 }), [8.75, 8.95]],
    [popText(root, 'Meanwhile, | in the *gallery…*', { top: 190, size: 100, accentSize: 160, at: T.gallery + 0.15, gap: 0.08, accentColor: LIB.color, wobble: true, late: 1, lateAt: T.gallery + 0.5, fit: true }), [19.7, 19.9]],
    [popText(root, 'The defense | gets *soft.*', { top: 190, size: 104, accentSize: 168, at: T.court + 0.15, gap: 0.08, accentColor: MARS.tagColor, wobble: true, late: 1, lateAt: T.court + 0.5, fit: true }), [25.9, 26.1]],
  ]
  const LAST = popText(root, 'Old love isn’t | *evidence.*', { top: 196, size: 112, accentSize: 178, at: T.last, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function label(text, cx, cy, { size = 30, color = BONE, font = MONO, weight = 700, align = 'center', alpha = 1, shadow = true, italic = false } = {}) {
    if (alpha <= 0) return
    x.save(); x.globalAlpha *= alpha; x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, cx + 3, cy + 3) }
    x.fillStyle = color; x.fillText(text, cx, cy); x.restore()
  }
  function panel(cx, cy, w, h, { fillC = 'rgba(16,10,40,0.95)', border = GOLD, rot = 0, k = 1 } = {}) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = border; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8); x.fillStyle = fillC; x.fillRect(-w / 2, -h / 2, w, h)
    x.restore()
  }
  /** the courtroom set: wood panelling, the seal, the bench, the tables, the witness stand */
  function courtroom(t) {
    x.fillStyle = '#3b2418'; x.fillRect(0, 600, 1080, 720)
    for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? '#43291c' : '#4a2e1f'; x.fillRect(i * 120, 600, 116, 720) }
    x.fillStyle = INK; x.fillRect(0, 592, 1080, 14)
    x.fillStyle = '#2a170f'; x.fillRect(0, 1240, 1080, 680)
    for (let i = 0; i < 12; i++) { x.fillStyle = i % 2 ? '#311b12' : '#2a170f'; x.fillRect(0, 1240 + i * 56, 1080, 52) }
    // the seal behind the judge
    x.save(); x.fillStyle = INK; x.beginPath(); x.arc(540, 700, 96, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#c99a3a'; x.beginPath(); x.arc(540, 700, 88, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2b1d40'; x.beginPath(); x.arc(540, 700, 72, 0, Math.PI * 2); x.fill(); x.restore()
    label('♄', 540, 700, { size: 80, color: '#c99a3a', font: "'EB Garamond', 'Noto Sans Symbols 2', serif", weight: 600, shadow: false })
    // two banners
    for (const bx of [120, 960]) { x.fillStyle = INK; x.fillRect(bx - 50, 610, 100, 260); x.fillStyle = '#5b2a6e'; x.fillRect(bx - 44, 610, 88, 250); x.fillStyle = GOLD; x.fillRect(bx - 44, 840, 88, 10) }
  }
  function bench(t) {
    const { x0, x1, y0, y1 } = BENCH
    x.fillStyle = INK; x.fillRect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 10)
    x.fillStyle = WOOD2; x.fillRect(x0, y0, x1 - x0, y1 - y0); x.fillStyle = '#82532f'; x.fillRect(x0 - 14, y0 - 14, x1 - x0 + 28, 22)
    for (let i = 0; i < 4; i++) { x.fillStyle = WOOD; x.fillRect(x0 + 30 + i * 140, y0 + 40, 100, y1 - y0 - 60) }
    panel(540, y0 + 76, 260, 54, { fillC: '#efe3c8', border: '#c99a3a' })
    label('JUDGE SATURN', 540, y0 + 77, { size: 26, color: INK, font: INTER, weight: 800, shadow: false })
    // the witness stand (right), where the ghost hides
    x.fillStyle = INK; x.fillRect(WIT.x0 - 8, WIT.y0 - 8, WIT.x1 - WIT.x0 + 8, WIT.y1 - WIT.y0 + 8); x.fillStyle = WOOD2; x.fillRect(WIT.x0, WIT.y0, WIT.x1 - WIT.x0, WIT.y1 - WIT.y0)
    x.fillStyle = '#82532f'; x.fillRect(WIT.x0 - 8, WIT.y0 - 8, WIT.x1 - WIT.x0 + 8, 14)
  }
  function tables(t) {
    for (const [cx, txt, col] of [[232, 'PLAINTIFF ♀', VENUS.color], [850, 'DEFENDANT ♂', MARS.color]]) {
      x.fillStyle = INK; x.fillRect(cx - 190, 1150, 380, 110); x.fillStyle = WOOD2; x.fillRect(cx - 184, 1156, 368, 100); x.fillStyle = '#82532f'; x.fillRect(cx - 196, 1144, 392, 18)
      panel(cx, 1206, 230, 40, { fillC: '#efe3c8', border: col })
      label(txt, cx, 1207, { size: 22, color: INK, shadow: false })
    }
  }
  function gavel(t) {
    const a = gavelAngle(t), px = 690, py = 905
    x.save(); x.translate(px, py); x.rotate(a)
    x.fillStyle = INK; x.fillRect(-8, -150, 16, 156); x.fillStyle = '#a8734f'; x.fillRect(-4, -146, 8, 148)
    x.fillStyle = INK; x.fillRect(-46, -184, 92, 50); x.fillStyle = '#82532f'; x.fillRect(-40, -178, 80, 38); x.fillStyle = '#c99a3a'; x.fillRect(-22, -178, 8, 38); x.fillRect(14, -178, 8, 38)
    x.restore()
    // the sound block + impact lines
    x.fillStyle = INK; x.fillRect(790, 856, 110, 22); x.fillStyle = '#82532f'; x.fillRect(796, 856, 98, 14)
    for (const g of GAVEL) {
      const p = prog(t, g, g + 0.3)
      if (t < g - 0.01 || p >= 1) continue
      x.save(); x.globalAlpha = 1 - p; x.fillStyle = '#fff3c8'
      for (let i = 0; i < 7; i++) { const ang = -Math.PI + i * Math.PI / 6, d = 70 + p * 70; x.fillRect(Math.round(845 + Math.cos(ang) * d) - 5, Math.round(850 + Math.sin(ang) * d * 0.6) - 5, 10, 10) }
      x.restore()
    }
  }
  function chyron(t, k) {
    if (k <= 0) return
    const y0 = 1288, w = lerp(0, 940, ease.outCubic(k))
    x.save(); x.beginPath(); x.rect(70, y0, w, 120); x.clip()
    x.fillStyle = '#efe3c8'; x.fillRect(70, y0, 940, 64); x.fillStyle = 'rgba(10,8,26,0.94)'; x.fillRect(70, y0 + 64, 940, 46)
    x.fillStyle = RED; x.fillRect(70, y0, 16, 110)
    x.font = `800 40px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = INK; x.fillText('VENUS v. MARS', 104, y0 + 34)
    x.font = `700 23px ${MONO}`; x.fillStyle = BONE
    x.fillText(t < T.verdict[0] ? 're: the whole breakup · zodiac superior court' : 'VERDICT: no case · court adjourned', 104, y0 + 88)
    x.restore()
  }
  /** the courtroom sketch (pastel on paper): two little stars caught in a golden net */
  function sketch(t, k) {
    if (k <= 0) return
    x.save(); x.translate(540, 820); x.rotate(-0.03); x.scale(k, k)
    x.fillStyle = 'rgba(0,0,0,0.4)'; x.fillRect(-372, -262, 760, 540)
    x.fillStyle = '#efe3c8'; x.fillRect(-380, -270, 760, 540)
    // pastel scribble background
    for (let i = 0; i < 40; i++) { x.strokeStyle = ['rgba(255,143,177,0.25)', 'rgba(242,199,92,0.25)', 'rgba(127,160,220,0.2)'][i % 3]; x.lineWidth = 10; x.beginPath(); x.moveTo(-340 + (i * 37) % 680, -230 + (i * 53) % 420); x.lineTo(-300 + (i * 37) % 680, -180 + (i * 53) % 420); x.stroke() }
    x.restore()
    x.save(); x.globalAlpha = k
    drawStarChar(x, 470, 830, 170 * k, t, { color: VENUS.color, mood: 'wide', look: [1, 0], blink: false, glow: 0, tips: false })
    drawStarChar(x, 620, 830, 170 * k, t, { color: '#e2543a', mood: 'wide', look: [-1, 0], blink: false, glow: 0, tips: false })
    // the golden net over them
    x.translate(540, 820); x.rotate(-0.03); x.scale(k, k)
    x.strokeStyle = '#d9a632'; x.lineWidth = 5
    for (let i = -6; i <= 6; i++) {
      x.beginPath(); x.moveTo(-230 + i * 6, -190); x.quadraticCurveTo(i * 40, 0, -230 + i * 6 + 460, 190); x.stroke()
      x.beginPath(); x.moveTo(230 + i * 6, -190); x.quadraticCurveTo(-i * 40, 0, 230 + i * 6 - 460, 190); x.stroke()
    }
    x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillStyle = '#5a4e66'; x.fillText('COURTROOM SKETCH · artist’s impression of a myth', -350, 240)
    x.restore()
  }
  function evidenceBag(t) {
    const k = pop01(t, T.bag, 0.3, 2.2) * (1 - prog(t, T.sketch[0], T.sketch[0] + 0.25))
    if (k <= 0) return
    x.save(); x.translate(540, 860); x.rotate(0.06); x.scale(k, k)
    x.fillStyle = 'rgba(220,240,255,0.25)'; x.fillRect(-170, -200, 340, 400); x.strokeStyle = 'rgba(230,245,255,0.8)'; x.lineWidth = 6; x.strokeRect(-170, -200, 340, 400)
    x.fillStyle = RED; x.fillRect(-170, -200, 340, 60)
    x.strokeStyle = '#d9a632'; x.lineWidth = 6
    for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(-120 + i * 48, -110); x.lineTo(-90 + i * 30, 160); x.stroke(); x.beginPath(); x.moveTo(-130, -90 + i * 48); x.lineTo(130, -60 + i * 44); x.stroke() }
    x.restore()
    label('EXHIBIT A', 540 - 10, 860 - 172, { size: 34, color: '#fff', font: INTER, weight: 800, alpha: k })
  }
  /** the gallery shot: the pews, Libra and Aries, a high arched window with the sky */
  function gallery(t) {
    x.fillStyle = '#3b2418'; x.fillRect(0, 600, 1080, 1320)
    for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? '#43291c' : '#4a2e1f'; x.fillRect(i * 120, 600, 116, 1320) }
    // the high window: the sky shows through
    x.save(); x.beginPath(); x.moveTo(330, 900); x.lineTo(330, 700); x.arc(540, 700, 210, Math.PI, 0); x.lineTo(750, 900); x.closePath(); x.clip()
    drawSky(x, t, SKY_H)
    const cp = prog(t, T.comet, T.comet + 1.7)
    if (cp > 0 && cp < 1) drawComet(x, lerp(320, 760, cp), lerp(640, 560, cp), 30, t, { sunDir: [-1, 0.6], aura: false, exPin: false, tail: 90, mood: 'happy', alpha: 0.85 })
    x.restore()
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(330, 900); x.lineTo(330, 700); x.arc(540, 700, 210, Math.PI, 0); x.lineTo(750, 900); x.closePath(); x.stroke()
    x.lineWidth = 8; x.beginPath(); x.moveTo(540, 490); x.lineTo(540, 900); x.moveTo(330, 740); x.lineTo(750, 740); x.stroke()
    // a back row of spectators (tiny, blurred)
    for (let i = 0; i < 7; i++) drawStarChar(x, 90 + i * 150, 1000, 90, t, { color: ['#b8b2c8', '#9a8fb8', '#c9a6ff'][i % 3], mood: t > T.l7 ? 'happy' : 'wide', seed: 30 + i, glow: 0.2, tips: false, look: [i < 3 ? 1 : -1, 0], alpha: 0.6 })
    x.fillStyle = WOOD; x.fillRect(0, 1030, 1080, 40)
    // Libra and Aries, in the front pew
    const sw = t > T.sweat
    const rl = drawStarChar(x, 360, 1130, 270, t, { color: LIB.color, glyph: LIB.glyph, mood: t < T.l7 ? 'wide' : t < T.l7 + 1.5 ? 'squint' : 'happy', look: [1, 0], hops: talkHops(LINES, LIB_N, { cps: CPS }), seed: 21, glow: 0.9, blink: t < T.l7 ? false : undefined })
    const ra = drawStarChar(x, 730, 1130, 270, t, { color: ARI.color, glyph: ARI.glyph, mood: t < T.l6 + 1.2 ? 'wide' : t < T.l7 + 1.5 ? 'neutral' : 'happy', look: [-1, 0], hops: talkHops(LINES, ARI_N, { cps: CPS }), seed: 22, glow: 0.9, blink: t < T.l7 ? false : undefined })
    if (sw) for (const [r, d] of [[rl, -1], [ra, 1]]) { const p = ((t - T.sweat) * 0.9) % 1; drawBits(x, SWEAT, SWEAT_C, Math.round(r.x + d * r.size * 0.3), Math.round(r.y - r.size * 0.25 + p * 60), 6, { alpha: 1 - p }) }
    if (t > T.l7 + 1.6) drawBits(x, HEART, HEART_C, 545, Math.round(1000 - 30 * Math.sin(t * 2)), 7)
    x.fillStyle = INK; x.fillRect(0, 1210, 1080, 120); x.fillStyle = WOOD2; x.fillRect(0, 1218, 1080, 104); x.fillStyle = '#82532f'; x.fillRect(0, 1210, 1080, 18)
    // lower third
    const lk = prog(t, T.gallery + 0.6, T.gallery + 1.0)
    if (lk > 0) {
      x.save(); x.beginPath(); x.rect(70, 1240, 940 * ease.outCubic(lk), 90); x.clip()
      x.fillStyle = 'rgba(10,8,26,0.94)'; x.fillRect(70, 1240, 940, 84)
      x.font = `800 30px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'
      x.fillStyle = LIB.color; x.fillText('♎ LIBRA · ruled by Venus', 96, 1264)
      x.fillStyle = ARI.color; x.fillText('♈ ARIES · ruled by Mars', 96, 1302)
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const inGallery = t >= T.gallery && t < T.court
      if (inGallery) gallery(t)
      else {
        // a slow push-in on the bench at the verdict
        const vk = ease.inOutQuad(prog(t, T.verdict[0], T.verdict[1])) * (1 - ease.inOutQuad(prog(t, T.dismissed + 0.8, T.last)))
        x.save(); if (vk > 0) { const s = 1 + 0.22 * vk; x.translate(540, 800); x.scale(s, s); x.translate(-540, -800) }
        courtroom(t)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 4 })
        drawSaturn(x, SAT0.x, SAT0.y, SAT0.size, t, { ...satState(t), pointer: false, hops: SAT_HOPS, seed: 4 })
        bench(t)
        gavel(t)
        drawVenus(x, VEN0.x, VEN0.y, VEN0.size, t, { ...venState(t), retro: 0.55, hops: [...VEN_HOPS, T.bow + 0.1], seed: 3 })
        const ms = marState(t)
        drawMars(x, MAR0.x, MAR0.y, MAR0.size, t, { mood: ms.mood, moonMood: ms.moonMood, look: [-1, -0.3], hops: MAR_HOPS, seed: 7 })
        tables(t)
        x.restore()
        evidenceBag(t)
        // the sketch + fact chip
        const sk = pop01(t, T.sketch[0], 0.35, 1.8) * outK(t, [T.sketch[1] - 0.25, T.sketch[1]])
        if (sk > 0) {
          x.fillStyle = `rgba(5,4,12,${0.55 * sk})`; x.fillRect(0, 0, 1080, 1920)
          sketch(t, sk)
          const ck = pop01(t, T.chip, 0.3, 2) * outK(t, [T.sketch[1] - 0.25, T.sketch[1]])
          panel(540, 1220, 920, 150, { border: '#7fd0ff', k: ck, rot: -0.015 })
          label('✦ IN GREEK MYTH (the Odyssey):', 540, 1180, { size: 30, color: GOLD, alpha: ck })
          label('Aphrodite and Ares were caught', 540, 1222, { size: 34, color: BONE, font: INTER, weight: 800, alpha: ck })
          label('in Hephaestus’s golden net.', 540, 1264, { size: 34, color: BONE, font: INTER, weight: 800, alpha: ck })
        }
        // OBJECTION!
        const ob = pop01(t, T.objection, 0.2, 3) * outK(t, [T.objection + 1.2, T.objection + 1.45])
        if (ob > 0) { x.save(); x.translate(330, 560); x.rotate(-0.1); x.scale(ob, ob); x.fillStyle = INK; x.fillRect(-250, -60, 500, 120); x.fillStyle = VENUS.color; x.fillRect(-242, -52, 484, 104); x.restore(); label('OBJECTION!', 330, 556, { size: 64, color: '#fff', font: INTER, weight: 800, alpha: ob }) }
        // THE VERDICT card
        const vc = pop01(t, T.verdict[0], 0.3, 2) * outK(t, [T.verdict[1] + 0.6, T.verdict[1] + 0.85])
        if (vc > 0) { panel(540, 470, 640, 120, { k: vc, fillC: '#0b0718' }); label('THE VERDICT', 540, 472, { size: 72, color: GOLD, font: SERIF, italic: true, weight: 500, alpha: vc }) }
        // CASE DISMISSED stamp
        const dk = pop01(t, T.dismissed, 0.18, 3) * outK(t, [T.last - 0.3, T.last])
        if (dk > 0) { x.save(); x.translate(540, 1000); x.rotate(-0.14); x.scale(dk * 1.1, dk * 1.1); x.fillStyle = 'rgba(239,227,200,0.92)'; x.fillRect(-330, -62, 660, 124); x.strokeStyle = RED; x.lineWidth = 10; x.strokeRect(-318, -50, 636, 100); x.font = `800 66px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('CASE DISMISSED', 0, 3); x.restore() }
        // the gasp in court
        const gk = prog(t, T.gasp, T.gasp + 0.9)
        if (gk > 0 && gk < 1) label('*gasp*', 860, 900, { size: 48, color: PINK, font: SERIF, italic: true, weight: 500, alpha: Math.sin(Math.PI * gk) })
        chyron(t, t < T.sketch[0] || t > T.sketch[1] ? prog(t, T.lt1, T.lt1 + 0.4) : 0)
      }
      genreBug(x, t, { text: 'COURT TV · LIVE', x: 70, y: 640, color: RED })
      drawDayChip(x, t, { day: 15, phase: 'retro' })
      const e = prog(t, ...T.end)
      if (e > 0) { x.save(); x.globalAlpha = ease.inQuad(e); drawSky(x, t, SKY_H); x.restore() }
      hook.update(t)
      box.update(t)
      for (const [h, o] of HS) h.update(t, outK(t, o))
      LAST.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 14.6 (court → gallery), 20.0 (gallery → court).
const CUTS = [{ t: T.gallery, kind: 'flip' }, { t: T.court, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E08', fadeIn: 0.01 }), cardCuts(CUTS)]

// ── sound
const NOTE = [523.25, 587.33, 622.25, 783.99, 932.33, 1046.5]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...GAVEL.flatMap(g => [['tom', r3(Math.max(0, g)), 140, { gain: 0.3 }], ['tick', r3(Math.max(0, g)), 0.12]]),
  ...talkCues(LINES, { cps: CPS, pitch: { [SAT_N]: 440, [VEN_N]: 988, [MAR_N]: 392, [ARI_N]: 659.25, [LIB_N]: 880 } }),
  ['whoosh', T.lt1, 0.4, 0.025],
  ...stingerCues(T.bag, { key: KEY, kind: 'noir' }), ['whoosh', T.sketch[0], 0.5, 0.03], ['pop', T.chip, 1046.5, 0.045, 0],
  ...gaspCues(T.objection, { key: KEY }),
  ['tick', T.sweat, 0.03], ['glitter', T.comet, T.comet + 0.9], ['tick', T.ghost + 0.05, 0.015],
  ...stingerCues(T.l7 + 1.3, { key: KEY, kind: 'sitcom' }),
  ['whoosh', T.gasp - 0.1, 0.35, 0.03], ['pop', T.gasp, 1318.51, 0.04, 0.3],
  ...stingerCues(T.verdict[0], { key: KEY, kind: 'trailer' }),
  ['boom', T.dismissed, 0.25], ['crash', T.dismissed, { gain: 0.05, len: 2 }],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1046.5, 0.05, 0], ['pluck', T.lastLand, 1046.5, 0.045, 0.6, 0],
  ['bell', T.bow, 1567.98, 0.03, 1.4, 0], ['pop', T.close, 784, 0.03, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
