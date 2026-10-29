// stdistance (60 s vertical Align ad, Star Talk season 2 extra: "Long distance, but make it stars") · story 0–55.6, then
// the shared end card. A giant split screen: YOUR STAR (rose) on a morning half, THEIR STAR (lavender) on a night half,
// a glowing seam between. THE BOOTH calls the long-distance league, ♍ VIRGO brings a plan, ♓ PISCES cries on the seam.
//   0.00–4.30  "Long distance, | but make it *stars.*"  (frame 0) Breakfast on the left (8:00 AM), pajamas and a nightcap on
//              the right (11:00 PM). THE STARS: "Two stars. One sky. Different clocks."
//   4.40–10.4  "Missed | *calls.*"  You call; they're asleep (zzz). MISSED CALL stamps, twice.  YOU: "Morning! Wanna talk
//              before work?"  THE STARS: "Your morning is their midnight."
//  10.60       card cut (flip)
//  10.7–16.9   "A goodnight… | at *lunch.*"  12:30 PM / 3:30 AM. THEM: "Goodnight! ♥ Sorry, I fell asleep."  The bubble
//              lands on your lunch. YOU: "…it's lunchtime here." (womp)  Pisces sobs on the seam.
//  17.0–23.1   "The *long-distance* | league."  THE BOOTH rises at the bottom. GEMINI: "Rough night for the long-distance
//              league."  SAG: "Rough morning, technically."
//  23.30       card cut (deal)
//  23.4–35.6   "Make a | *plan.*"  VIRGO with the clipboard on the seam: "Okay. Three things. Ready?"  A shared calendar
//              spans both halves (VISIT circled) · a countdown (12 DAYS) · two TVs playing the same show; both laugh at once.
//  35.85       card cut (shuffle)
//  36.0–42.9   "*Zero* | days."  The countdown races to 0, the seam melts, both halves turn one dusk colour and the two stars
//              meet in the middle. THE STARS: "…and they meet in the middle."  Hearts; Pisces bawls.
//  43.40–48.0  ★ LESSON UNLOCKED (shared lesson.js): "Distance is easier | with a *date* | on the calendar."  +1 PATIENCE
//  48.1–51.4   "Talk | *cards.*"  Split again; one talk card each; both answers flip at once.
//              THE STARS: "Talk cards: hidden till you both play."
//  51.6–55.45  "See you | *soon.*"  NEXT VISIT · 21 DAYS. Both wave across the seam. THE STARS: "Countdown's on. See you soon."
// One canvas (sky + halves + cast), DOM type + the dialogue boxes, the lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { cast, bmp, drawHearts, pixelPanel, sparkBurst, drawClipboard, drawMic, drawDesk, confetti, headCues, chipCue, wompCue, flutterCue } from './props.js'

export const DURATION = 60
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const KEY = 'Db'
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#7dffb0', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const VIR = signStar('virgo'), PIS = signStar('pisces'), GEM = signStar('gemini'), SAG = signStar('sagittarius')
const YOU_COL = '#ff9cc0', THEM_COL = '#b9a2ff'
const S_TAG = 'THE STARS', Y_TAG = '♡ YOUR STAR', M_TAG = '☆ THEIR STAR', V_TAG = `${VIR.glyph} VIRGO`
const G_TAG = `${GEM.glyph} GEMINI · THE BOOTH`, A_TAG = `${SAG.glyph} SAG · THE BOOTH`

const T = {
  open1: -1.3, l1: -1.1, h0Out: [4.15, 4.32],
  h1: 4.45, h1Land: 4.85, ring1: 4.6, l2: 5.0, missed1: 6.4, ring2: 7.2, l3: 7.6, missed2: 8.8, close1: 10.45, h1Out: [10.3, 10.47],
  cut1: 10.6,
  h2: 10.7, h2Land: 11.2, open2: 10.8, l4: 11.0, bubble: 12.6, l5: 14.0, womp: 15.0, h2Out: [16.75, 16.92],
  h3: 17.0, h3Land: 17.45, booth: [17.0, 17.45], l6: 17.3, l7: 20.5, close2: 23.05, boothOut: [22.8, 23.1], h3Out: [22.95, 23.12],
  cut2: 23.3,
  h4: 23.4, h4Land: 23.8, virgo: 23.45, open3: 23.5, l8: 23.7, cal: [25.9, 28.6], l9: 26.2, count: [28.8, 31.8], l10: 29.1,
  show: [31.9, 35.4], l11: 32.2, laugh: 34.3, close3: 35.55, h4Out: [35.45, 35.62], virgoOut: [35.3, 35.6],
  cut3: 35.85,
  h5: 36.0, h5Land: 36.4, tick: [36.1, 38.9], open4: 36.8, l12: 37.0, melt: [38.9, 40.0], meet: [39.2, 40.1], close4: 40.9, h5Out: [42.85, 43.05], part: [42.9, 43.3],
  lesson: 43.4, lessonOut: [47.8, 48.05],
  h6: 48.15, h6Land: 48.55, split: [48.0, 48.4], open5: 48.3, l13: 48.5, flip: 50.2, h6Out: [51.35, 51.52], cardsOut: [51.2, 51.5],
  h7: 51.6, h7Land: 52.0, next: 51.7, l14: 51.95, close5: 54.95, h7Out: [55.0, 55.2], out: [55.0, 55.45],
}
const LINES1 = [
  { t: T.l1, speaker: S_TAG, text: 'Two stars. One sky. *Different clocks.*' },
  { t: T.l2, speaker: Y_TAG, color: PINK, text: 'Morning! Wanna talk *before work?*' },
  { t: T.l3, speaker: S_TAG, text: 'Your morning is *their midnight.*' },
]
const LINES2 = [
  { t: T.l4, speaker: M_TAG, color: LAV, text: 'Goodnight! ♥ Sorry, I *fell asleep.*' },
  { t: T.l5, speaker: Y_TAG, color: PINK, text: "…it's *lunchtime* here." },
  { t: T.l6, speaker: G_TAG, color: '#ffe27a', text: 'Rough night for the *long-distance league.*' },
  { t: T.l7, speaker: A_TAG, color: '#ffe27a', text: 'Rough *morning,* technically.' },
]
const LINES3 = [
  { t: T.l8, speaker: V_TAG, color: '#ff9cc0', text: 'Okay. *Three things.* Ready?' },
  { t: T.l9, speaker: Y_TAG, color: PINK, text: 'One: a *shared calendar.*' },
  { t: T.l10, speaker: M_TAG, color: LAV, text: 'Two: a *countdown* to the next visit.' },
  { t: T.l11, speaker: V_TAG, color: '#ff9cc0', text: 'Three: one show. *Same time.* Both of you.' },
]
const LINES4 = [{ t: T.l12, speaker: S_TAG, text: '…and they meet *in the middle.*' }]
const LINES5 = [
  { t: T.l13, speaker: S_TAG, text: 'Talk cards: hidden till you *both* play.' },
  { t: T.l14, speaker: S_TAG, text: "Countdown's on. *See you soon.*" },
]
const CPS = 28
const ALL = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Distance is easier | with a *date* | on the calendar.', chip: '+1 PATIENCE', dim: 0.55, size: 84 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, [a, b]) => t >= a && t < b
const seg = (t, a, b, d = 0.3) => (t < a || t >= b) ? 0 : pop01(t, a, d, 2) * popOut(t, [b - 0.3, b])
function moodAt(M, t) { let m = M[0]; for (const e of M) if (e[0] <= t) m = e; return { mood: m[1], look: m[2] } }

// how split the screen is: 1 = two halves, 0 = one sky (they met)
const splitK = t => t < T.melt[0] ? 1 : t < T.split[0] ? 1 - ease.inOutQuad(prog(t, ...T.melt)) : ease.inOutQuad(prog(t, ...T.split))
const CLOCKS = [[-9, '8:00 AM', '11:00 PM'], [T.cut1, '12:30 PM', '3:30 AM'], [T.cut2, '6:00 PM', '9:00 AM'], [T.split[0], '9:00 PM', '12:00 PM']]

// ── the halves
function drawHalves(x, t) {
  const k = splitK(t)
  // left: a morning wash, right: a deep night; melting into one dusk when they meet
  const morn = [255, 170, 110], night = [40, 40, 120], dusk = [200, 110, 170]
  const mix = (a, b, u) => a.map((v, i) => Math.round(lerp(v, b[i], u)))
  const L = mix(dusk, morn, k), R = mix(dusk, night, k)
  x.save()
  let g = x.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, `rgba(${L},${0.36})`); g.addColorStop(0.7, `rgba(${L},0.12)`); g.addColorStop(1, `rgba(${L},0.04)`)
  x.fillStyle = g; x.fillRect(0, 0, 540, 1920)
  g = x.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, `rgba(${R},0.5)`); g.addColorStop(0.7, `rgba(${R},0.25)`); g.addColorStop(1, `rgba(${R},0.08)`)
  x.fillStyle = g; x.fillRect(540, 0, 540, 1920)
  // the sun (left) and an extra moon glow (right)
  x.globalAlpha = k
  x.fillStyle = 'rgba(255,214,120,0.9)'; x.beginPath(); x.arc(90, 680, 46, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,214,120,0.25)'; x.beginPath(); x.arc(90, 680, 80, 0, Math.PI * 2); x.fill()
  // the seam
  if (k > 0.01) {
    x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(531, 0, 18, 1920)
    x.save(); x.shadowColor = GOLD; x.shadowBlur = 24; x.fillStyle = GOLD; x.fillRect(536, 0, 8, 1920); x.restore()
    for (let i = 0; i < 8; i++) { const y = ((t * 120 + i * 260) % 1920); drawPixelStar(x, 540, y, 18, 1, BONE) }
  }
  x.restore()
}
function drawClockChips(x, t) {
  const k = splitK(t)
  if (k < 0.05 || inR(t, [T.lesson - 0.3, T.lessonOut[1]])) return
  let c = CLOCKS[0]; for (const e of CLOCKS) if (e[0] <= t) c = e
  const flip = CLOCKS.reduce((a, e) => Math.max(a, inR(t, [e[0], e[0] + 0.3]) ? 1 - prog(t, e[0], e[0] + 0.3) : 0), 0)
  for (const [cx, txt, col] of [[270, c[1], '#ffcf8a'], [810, c[2], '#9fb4ff']]) {
    x.save(); x.globalAlpha = k; x.translate(cx, 545); x.scale(1, 1 - 0.8 * flip)
    pixelPanel(x, -130, -36, 260, 72, { P: 6, fill: 'rgba(13,8,32,0.9)', border: col, glow: 0.25 })
    x.font = `700 38px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(txt, 0, 2)
    x.restore()
  }
}

// ── props
function drawTable(x, cx, y, w) { x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, y - 6, w + 12, 30); x.fillStyle = '#a8693a'; x.fillRect(cx - w / 2, y, w, 18); x.fillStyle = '#d08a50'; x.fillRect(cx - w / 2, y, w, 5); x.fillStyle = INK; x.fillRect(cx - w / 2 + 20, y + 18, 14, 140); x.fillRect(cx + w / 2 - 34, y + 18, 14, 140) }
const TOAST = ['.KKKKKK.', 'KTTTTTTK', 'KTttttTK', 'KTttttTK', 'KTttttTK', 'KTTTTTTK', 'KKKKKKKK']
const BOWL = ['KKKKKKKKKK', 'KwwwwwwwwK', '.KBBBBBBK.', '..KBBBBK..', '...KKKK...']
const CAP = ['.......KK', '......KWK', '....KKBK.', '..KKBBBK.', '.KBBbBBK.', 'KBBBBBbBK', 'KWWWWWWWK', 'KKKKKKKKK']
function drawBreakfast(x, cx, y, k) { if (k <= 0) return; x.save(); x.globalAlpha *= k; bmp(x, BOWL, cx - 110, y - 40, 8, { K: INK, w: '#fff6ea', B: '#7fe0ff' }); bmp(x, TOAST, cx + 50, y - 56, 8, { K: INK, T: '#a8693a', t: '#f0c088' }); x.restore() }
function drawPhone(x, t, cx, cy, s, ring, screen = '#2a2f5c') {
  const sh = ring > 0 ? Math.sin(t * 70) * 5 * ring : 0
  x.save(); x.translate(cx + sh, cy); x.rotate(sh * 0.01); x.scale(s, s)
  x.fillStyle = INK; x.fillRect(-30, -52, 60, 104); x.fillStyle = '#3d3a6b'; x.fillRect(-26, -48, 52, 96)
  x.fillStyle = ring > 0 ? '#7dffb0' : screen; x.fillRect(-22, -40, 44, 76)
  if (ring > 0) { x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillText('☎', 0, 8) }
  x.restore()
}
function stamp(x, t, t0, cx, cy, txt, col = '#ff5c7a') {
  if (t < t0) return
  const k = 1 + 1.4 * (1 - ease.outCubic(prog(t, t0, t0 + 0.18)))
  x.save(); x.translate(cx, cy); x.rotate(-0.14); x.scale(k, k); x.globalAlpha = clamp(prog(t, t0, t0 + 0.1))
  x.strokeStyle = col; x.lineWidth = 8; x.strokeRect(-150, -38, 300, 76)
  x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(txt, 0, 2)
  x.restore()
}
function bubble(x, t, cx, cy, k, lines, col = '#6c5ce7') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 380, h = 64 + 52 * lines.length
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  for (let i = 0; i < 4; i++) x.fillRect(-8 * (3 - i), h / 2 + i * 8, 16 * (3 - i), 8)
  x.font = `700 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'
  lines.forEach((l, i) => x.fillText(l, 0, -((lines.length - 1) * 26) + i * 52))
  x.restore()
}
function drawCalendar(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 830); x.rotate((1 - k) * 0.15); x.scale(k, k)
  pixelPanel(x, -360, -200, 720, 400, { P: 10, fill: '#fbf3e2', border: GOLD, glow: 0.5 })
  x.fillStyle = '#d6324d'; x.fillRect(-350, -190, 700, 70)
  x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('SHARED CALENDAR', 0, -155)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
    const cx = -300 + c * 100, cy = -80 + r * 72, n = r * 7 + c + 1
    x.fillStyle = 'rgba(27,18,54,0.08)'; x.fillRect(cx - 44, cy - 30, 88, 60)
    x.font = `700 24px ${MONO}`; x.fillStyle = 'rgba(27,18,54,0.55)'; x.fillText(String(n), cx - 22, cy - 12)
    if (n === 20) {
      const ck = clamp(prog(t, T.cal[0] + 0.6, T.cal[0] + 1.1))
      x.strokeStyle = '#d6324d'; x.lineWidth = 6; x.beginPath(); x.ellipse(cx, cy, 52, 38, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ck); x.stroke()
      if (ck >= 1) { x.font = `700 20px ${MONO}`; x.fillStyle = '#d6324d'; x.fillText('VISIT', cx + 2, cy + 12) }
    }
    if (n === 6 || n === 13 || n === 27) { x.font = `700 18px ${MONO}`; x.fillStyle = '#6c5ce7'; x.fillText('CALL', cx + 2, cy + 12) }
  }
  x.restore()
}
function drawCountdown(x, t, cx, cy, k, days, label = 'NEXT VISIT', col = GOLD) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  pixelPanel(x, -260, -110, 520, 220, { P: 10, fill: 'rgba(13,8,32,0.95)', border: col, glow: 0.6 })
  x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.75)'; x.fillText(label, 0, -62)
  x.font = `700 92px ${MONO}`; x.fillStyle = col; x.fillText(`${days} DAY${days === 1 ? '' : 'S'}`, 0, 24)
  x.restore()
}
function drawTV(x, t, cx, cy, k, laugh) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 210); x.fillStyle = '#5d6288'; x.fillRect(-142, -102, 284, 194)
  x.fillStyle = '#121030'; x.fillRect(-124, -86, 220, 160)
  // the same show on both: a little pixel comet crossing a sky, synced by t
  const p = ((t - T.show[0]) * 0.6) % 1
  x.fillStyle = '#1f2a5c'; x.fillRect(-124, -86, 220, 160)
  drawPixelStar(x, -110 + p * 190, -50 + Math.sin(p * 6) * 30, 30, 2, GOLD)
  x.fillStyle = '#ffffff'; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.fillText('▶ EP. 4', -118, 64)
  x.fillStyle = INK; x.fillRect(108, -60, 22, 22); x.fillRect(108, -20, 22, 22)
  x.fillRect(-60, 100, 20, 30); x.fillRect(40, 100, 20, 30)
  x.restore()
  if (laugh > 0) { x.save(); x.globalAlpha = laugh; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('HA!', cx + Math.sin(t * 30) * 4, cy - 150); x.restore() }
}
function drawTalkCard(x, t, cx, cy, k, ans) {
  if (k <= 0.01) return
  const f = prog(t, T.flip, T.flip + 0.35), up = f > 0.5
  x.save(); x.translate(cx, cy); x.scale(k * Math.max(0.05, Math.abs(Math.cos(f * Math.PI))), k)
  pixelPanel(x, -170, -120, 340, 240, { P: 8, fill: up ? '#fbf3e2' : '#3d2c68', border: up ? MINT : GOLD, glow: 0.4 })
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (!up) { x.font = `700 26px ${MONO}`; x.fillStyle = GOLD; x.fillText('TALK CARD', 0, -70); x.font = `700 90px ${MONO}`; x.fillText('?', 0, 20) }
  else { x.font = `700 22px ${MONO}`; x.fillStyle = '#8e3b5c'; x.fillText('BEST PART OF', 0, -78); x.fillText('YOUR DAY?', 0, -50); x.font = `italic 600 38px 'EB Garamond', serif`; x.fillStyle = INK; ans.forEach((a, i) => x.fillText(a, 0, 10 + i * 44)) }
  x.restore()
}

// ── cast moods
const Y_MOOD = [[-9, 'happy', [1, 0]], [T.ring1, 'sparkle', [1, 0]], [T.missed1, 'neutral', [1, 0]], [T.missed2, 'squint', [1, 0]], [T.cut1, 'neutral', [0, 1]],
  [T.bubble + 0.2, 'wide', [0, 1]], [T.l5 + 0.4, 'squint', [0, 0]], [T.booth[0], 'neutral', [0, 1]], [T.virgo, 'neutral', [1, -1]], [T.cal[0], 'sparkle', [1, -1]],
  [T.laugh, 'happy'], [T.h5, 'sparkle', [1, -1]], [T.meet[0], 'happy'], [T.lessonOut[1], 'sparkle', [1, 0]], [T.flip + 0.3, 'happy'], [T.next, 'happy', [1, 0]]]
const M_MOOD = [[-9, 'sleepy'], [T.cut1, 'sleepy'], [T.l4 - 0.4, 'neutral', [0, 1]], [T.l4 + 1.2, 'happy', [-1, 0]], [T.l5, 'sleepy'], [T.virgo, 'neutral', [-1, -1]],
  [T.cal[0], 'sparkle', [-1, -1]], [T.laugh, 'happy'], [T.h5, 'sparkle', [-1, -1]], [T.meet[0], 'happy'], [T.lessonOut[1], 'sparkle', [-1, 0]], [T.flip + 0.3, 'happy'], [T.next, 'happy', [-1, 0]]]
const YX = t => t < T.meet[0] ? 270 : t < T.part[0] ? lerp(270, 425, ease.inOutCubic(prog(t, ...T.meet))) : lerp(425, 270, ease.inOutCubic(prog(t, ...T.part)))
const MX = t => t < T.meet[0] ? 810 : t < T.part[0] ? lerp(810, 655, ease.inOutCubic(prog(t, ...T.meet))) : lerp(655, 810, ease.inOutCubic(prog(t, ...T.part)))
const STAR_Y = 1120, STAR_S = 250

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 44px Inter", "700 40px Inter", "italic 500 190px 'EB Garamond'", "italic 600 38px 'EB Garamond'", "700 52px 'Space Mono'", "700 92px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H = (text, at, land, out, o = {}) => [popText(root, text, { top: 160, size: 112, accentSize: 156, at, late: 1, lateAt: land, wobble: true, fit: true, ...o }), out]
  const HEADS = [
    H('Long distance, | but make it *stars.*', -1.2, -0.7, T.h0Out, { size: 100, accentSize: 150 }),
    H('Missed | *calls.*', T.h1, T.h1Land, T.h1Out, { accentColor: '#ff7a8a' }),
    H('A goodnight… | at *lunch.*', T.h2, T.h2Land, T.h2Out, { accentColor: '#ffcf8a' }),
    H('The *long-distance* | league.', T.h3, T.h3Land, T.h3Out, { late: 0, size: 100, accentSize: 140, accentColor: '#ffe27a' }),
    H('Make a | *plan.*', T.h4, T.h4Land, T.h4Out, { accentColor: MINT }),
    H('*Zero* | days.', T.h5, T.h5Land, T.h5Out, { late: 0, accentColor: GOLD }),
    H('Talk | *cards.*', T.h6, T.h6Land, T.h6Out, { accentColor: GOLD }),
    H('See you | *soon.*', T.h7, T.h7Land, T.h7Out, { accentColor: PINK }),
  ]
  const B = (lines, open, close) => dialogueBox(root, { lines, y: 1450, width: 960, height: 290, open, close, cps: CPS })
  const boxes = [B(LINES1, T.open1, T.close1), B(LINES2, T.open2, T.close2), B(LINES3, T.open3, T.close3), B(LINES4, T.open4, T.close4), B(LINES5, T.open5, T.close5)]
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const o = popOut(t, T.out)
        x.save(); x.globalAlpha = clamp(o); drawHalves(x, t); x.restore()
        drawClockChips(x, t)
        // tables (left: breakfast), a pillow + lamp on the right
        const sk = splitK(t) * clamp(o)
        if (sk > 0.02) {
          x.save(); x.globalAlpha = sk
          drawTable(x, 270, 1230, 360); drawTable(x, 810, 1230, 360)
          drawBreakfast(x, 270, 1230, t < T.cut1 ? 1 : 0)
          if (inR(t, [T.cut1, T.cut2])) bmp(x, ['.KKKKKK.', 'KGGGGGGK', 'KGgggGGK', 'KGGGGGGK', '.KKKKKK.'], 330, 1194, 8, { K: INK, G: '#7dffb0', g: '#c9ffd8' })   // lunch
          x.fillStyle = INK; x.fillRect(930, 1110, 14, 120); x.fillStyle = '#ffd27a'; x.fillRect(900, 1070, 74, 44)                                     // a lamp
          x.restore()
        }
        // Pisces sits on the seam, always crying
        const pk = inR(t, [T.lesson - 0.2, T.lessonOut[1]]) ? 0 : 1
        if (pk) cast(x, 540, inR(t, [T.booth[0], T.boothOut[1]]) ? 630 : 700, 120, t, { color: PIS.color, glyph: null, mood: inR(t, [T.womp, T.cut2]) ? 'neutral' : 'happy', seed: 17, pop: o, tears: inR(t, [T.womp, T.cut2]) || inR(t, [T.meet[1], T.lesson]) ? 3 : 1, hops: [T.womp, T.meet[1]] })
        // the stars
        const ym = moodAt(Y_MOOD, t), mm = moodAt(M_MOOD, t)
        const hugSq = inR(t, [T.meet[1], T.part[0]]) ? 0.12 * ease.outCubic(prog(t, T.meet[1], T.meet[1] + 0.25)) : 0
        const ry = cast(x, YX(t), STAR_Y, STAR_S, t, { color: YOU_COL, mood: ym.mood, look: ym.look, seed: 2, pop: o, squash: hugSq, hops: [...talkHops(ALL, Y_TAG, { cps: CPS }), T.ring1, T.ring2, T.laugh, T.meet[1], T.flip + 0.2, T.next + 0.3, T.next + 1.4] })
        const nightcap = splitK(t) > 0.5 && !inR(t, [T.cut2, T.split[1]])
        const rm = cast(x, MX(t), STAR_Y, STAR_S, t, { color: THEM_COL, mood: mm.mood, look: mm.look, seed: 5, pop: o, squash: hugSq, zzz: t < T.cut1, hops: [...talkHops(ALL, M_TAG, { cps: CPS }), T.laugh + 0.05, T.meet[1] + 0.05, T.flip + 0.25, T.next + 0.5, T.next + 1.6] })
        if (nightcap) bmp(x, CAP, rm.x - 30, rm.top - 30, 8, { K: INK, B: '#6c5ce7', b: '#ffe27a', W: '#efe6d6' }, clamp(o))
        // calls
        if (t < T.cut1) {
          const ring = [T.ring1, T.ring2].reduce((a, r) => Math.max(a, inR(t, [r, r + 1.5]) ? 1 : 0), 0)
          drawPhone(x, t, ry.x + ry.size * 0.52, ry.y - 10, 1, ring)
          drawPhone(x, t, rm.x + rm.size * 0.55, 1190, 0.9, ring)
          stamp(x, t, T.missed1, 810, 800, 'MISSED CALL'); stamp(x, t, T.missed2, 810, 920, 'MISSED CALL')
        }
        // the goodnight
        if (inR(t, [T.cut1, T.h3])) {
          drawPhone(x, t, rm.x - rm.size * 0.52, rm.y - 10, 1, 0, '#7fe0ff')
          const bx = lerp(810, 270, ease.inOutCubic(prog(t, T.bubble - 0.8, T.bubble)))
          bubble(x, t, bx, 860, pop01(t, T.l4 + 0.3, 0.3, 2) * popOut(t, [T.h2Out[0], T.h2Out[1]]), ['goodnight! ♥'])
          if (t >= T.bubble) stamp(x, t, T.bubble, 270, 740, '12:30 PM', '#ffcf8a')
        }
        // the booth
        const bk = seg(t, T.booth[0], T.boothOut[1])
        if (bk > 0.01) {
          x.save(); x.translate(0, (1 - Math.min(1, bk)) * 900)
          cast(x, 430, 790, 150, t, { color: GEM.color, glyph: null, mood: 'squint', look: [1, 0], seed: 6, headset: '#ff8fb1', hops: talkHops(ALL, G_TAG, { cps: CPS }) })
          cast(x, 650, 790, 150, t, { color: SAG.color, glyph: null, mood: inR(t, [T.l7, T.l7 + 2]) ? 'wink' : 'neutral', look: [-1, 0], seed: 9, headset: '#7fe0ff', hops: talkHops(ALL, A_TAG, { cps: CPS }) })
          drawDesk(x, 310, 770, 840, 100); drawMic(x, 540, 846, Math.sin(t * 2) * 0.3, 0.7)
          x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('THE BOOTH', 540, 912)
          x.restore()
        }
        // Virgo and the plan
        const vk = seg(t, T.virgo, T.virgoOut[1], 0.4)
        if (vk > 0.01) {
          const rv = cast(x, 540, 1290, 150, t, { color: VIR.color, glyph: VIR.glyph, mood: inR(t, [T.laugh, T.laugh + 1]) ? 'happy' : 'neutral', look: [0, -1], seed: 21, pop: vk, hops: [...talkHops(ALL, V_TAG, { cps: CPS }), T.cal[0], T.count[0], T.show[0]] })
          drawClipboard(x, rv.x + 70, rv.y + 10, 4, { rot: 0.15, page: t > T.count[0] ? 1 : 0 })
        }
        drawCalendar(x, t, seg(t, T.cal[0], T.cal[1], 0.4))
        const ck = seg(t, T.count[0], T.count[1], 0.4)
        drawCountdown(x, t, 540, 830, ck, 12)
        const tv = seg(t, T.show[0], T.show[1], 0.4), laugh = inR(t, [T.laugh, T.laugh + 1.1]) ? 1 - prog(t, T.laugh + 0.8, T.laugh + 1.1) : 0
        drawTV(x, t, 270, 850, tv, laugh); drawTV(x, t, 810, 850, tv, laugh)
        // zero days: the countdown races
        const zk = seg(t, T.tick[0], T.h5Out[1], 0.35)
        if (zk > 0.01) {
          const d = Math.max(0, Math.ceil(12 * (1 - ease.inQuad(prog(t, ...T.tick)))))
          drawCountdown(x, t, 540, 830, zk * (d === 0 ? 1 + 0.1 * Math.max(0, 1 - (t - T.tick[1]) * 3) : 1), d, d === 0 ? 'TODAY' : 'NEXT VISIT', d === 0 ? MINT : GOLD)
          if (inR(t, [T.tick[1], T.tick[1] + 0.8])) sparkBurst(x, t, 540, 830, T.tick[1], { n: 16, R: 420, size: 30, seed: 3 })
        }
        if (inR(t, [T.meet[1] - 0.1, T.part[0]])) drawHearts(x, t, T.meet[1] - 0.1, 540, ry.top + 40, { n: 9, px: 8, spread: 260, life: 1.6 })
        confetti(x, t, T.meet[1], { x0: 540, y0: 1250, n: 70, seed: 7, life: 2.6 })
        // talk cards
        const tk = seg(t, T.split[1], T.cardsOut[1], 0.35)
        drawTalkCard(x, t, 270, 830, tk, ['laughing at', 'your voice memo']); drawTalkCard(x, t, 810, 830, tk, ['your voice', 'memo, honestly'])
        if (inR(t, [T.flip + 0.35, T.flip + 1.1])) drawHearts(x, t, T.flip + 0.35, 540, 700, { n: 6, px: 7, spread: 500, life: 1.2 })
        // see you soon
        drawCountdown(x, t, 540, 830, t < T.next ? 0 : pop01(t, T.next, 0.4, 2) * popOut(t, T.out), 21)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates; the default selection keeps 10.6, 23.3 and 35.85
const CUTS = [4.38, { t: T.cut1, kind: 'flip' }, 16.95, { t: T.cut2, kind: 'deal' }, 29.0, { t: T.cut3, kind: 'shuffle' }, 51.55]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const ringCue = t => [0, 0.2, 0.75, 0.95].map(d => chipCue(t + d, 1318.51, 0.14, { wave: 'square', duty: 0.25, gain: 0.03, vib: 0.05, dly: 0 }))
const stampCue = t => [['tom', +t.toFixed(3), 80, { gain: 0.22, decay: 0.25, rev: 0.15 }], ['tick', +t.toFixed(3), 0.06]]
export const CUES = [
  ['pop', 0.2, 659.25, 0.03, 0],
  ...headCues(T.h1, 2, T.h1Land, 0), ...ringCue(T.ring1), ...stampCue(T.missed1), ...ringCue(T.ring2), ...stampCue(T.missed2),
  ...headCues(T.h2, 3, T.h2Land, 2), ['pop', T.l4 + 0.3, 880, 0.04, 0.3], ['whoosh', T.bubble - 0.8, 0.8, 0.04], ['pop', T.bubble, 1046.5, 0.05, -0.3], ...stampCue(T.bubble),
  ...wompCue(T.womp, 415.3),
  ...headCues(T.h3, 2, T.h3Land, 4), ['whoosh', T.booth[0], 0.45, 0.05], ['pluck', T.l7 + 1.1, 1318.51, 0.03, 0.6, 0.3],
  ...headCues(T.h4, 2, T.h4Land, 1), ['pop', T.virgo + 0.1, 880, 0.04, 0],
  ['whoosh', T.cal[0], 0.4, 0.04], ['pop', T.cal[0] + 0.3, 784, 0.04, 0], ...flutterCue(T.cal[0] + 0.6, 6, 0.08), ['pluck', T.cal[0] + 1.1, 1318.51, 0.04, 0.6, 0],
  ['whoosh', T.count[0], 0.4, 0.04], ['pop', T.count[0] + 0.3, 988, 0.04, 0], ['bell', T.count[0] + 0.4, 1567.98, 0.03, 1.2, 0],
  ['whoosh', T.show[0], 0.4, 0.04], ['pop', T.show[0] + 0.3, 659.25, 0.04, -0.4], ['pop', T.show[0] + 0.3, 659.25, 0.04, 0.4],
  ['pop', T.laugh, 1046.5, 0.05, -0.4], ['pop', T.laugh, 1046.5, 0.05, 0.4], ['pop', T.laugh + 0.15, 1174.66, 0.04, -0.4], ['pop', T.laugh + 0.15, 1174.66, 0.04, 0.4],
  ...headCues(T.h5, 2, T.h5Land, 3),
  ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.tick[0] + Math.sqrt(i / 12) * (T.tick[1] - T.tick[0])).toFixed(3), 0.04]),
  ['bell', T.tick[1], 2093, 0.04, 1.4, 0], ['glitter', T.tick[1], T.tick[1] + 0.8],
  ['swell', T.melt[0], T.meet[1], { gain: 0.05, f0: 600, f1: 5000, bus: 'drums' }], ['crash', T.meet[1], { gain: 0.05, len: 2.2 }],
  ['pop', T.meet[1], 523.25, 0.045, -0.3], ['pop', T.meet[1] + 0.05, 659.25, 0.045, 0.3],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...headCues(T.h6, 2, T.h6Land, 0), ['whoosh', T.split[0], 0.4, 0.04], ['pop', T.flip, 784, 0.04, -0.4], ['pop', T.flip, 988, 0.04, 0.4], ['bell', T.flip + 0.35, 1318.51, 0.03, 1, 0],
  ...headCues(T.h7, 2, T.h7Land, 2), ['pop', T.next, 880, 0.04, 0], ['bell', T.next + 0.2, 1567.98, 0.025, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [S_TAG]: 659.25, [Y_TAG]: 987.77 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [M_TAG]: 783.99, [Y_TAG]: 987.77, [G_TAG]: 987.77, [A_TAG]: 783.99 } }),
  ...talkCues(LINES3, { cps: CPS, pitch: { [V_TAG]: 880, [Y_TAG]: 987.77, [M_TAG]: 783.99 } }),
  ...talkCues(LINES4, { cps: CPS, pitch: { [S_TAG]: 659.25 } }),
  ...talkCues(LINES5, { cps: CPS, pitch: { [S_TAG]: 659.25 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
