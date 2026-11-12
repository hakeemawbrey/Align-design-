// r2a0435: star_advice, ADVICE ROLL CALL, "Each sign’s | *role in the family.*" (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific, relatable family role each, with one light visual gag. Ending: lesson.
//   0.0–3.6    hook · 3.6–49.2 twelve cards (3.8 s each):
//              ♈ the family hype captain · ♉ keeper of the snack drawer · ♊ runs the family group chat · ♋ the family photo album
//              · ♌ makes everyone laugh at dinner · ♍ fixes everyone's problems · ♎ the peacemaker · ♏ keeps every secret safe
//              · ♐ brings back the best stories · ♑ the one with the plan · ♒ the one with the wildest ideas
//              · ♓ feels everyone's feelings
//  49.2        "Every seat | at the *table.*" · 52.4 LESSON: "Every family needs | *every one of us.*"  FAMILY: COMPLETE
//  58.3        "Which one | *are you?*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff8ea', SLATE = '#9fb4c8', WOOD = '#c98f5a', SAND = '#f3d79a', ORANGE = '#ffb34a', GREEN = '#5fd068', BROWN = '#8a4a2e'
// ── shared props (each film carries its own copy)
/** a paper sheet / screen with a coloured header and text rows: [text, colour?, k?] */
function sheet(x, cx, cy, k, { w = 330, h = 380, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30, scale = 1.12, paper = CREAM, ink = INK, font = MONO } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  const top = -h / 2 + (head ? 60 : 0) + 44
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || ink; x.font = `700 ${size}px ${font}`
    x.fillText(txt, -w / 2 + 22, top + i * (size + 16)); x.restore()
  })
  x.restore()
}
/** a phone with message bubbles: [text, colour, k, right?] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 30px ${INTER}`; const w = x.measureText(txt).width + 28
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 14, 2)
    x.restore()
  })
  x.restore()
}
/** a mini birth-chart wheel */
function chartWheel(x, t, cx, cy, k, r = 150) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * r / 150, k * r / 150); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', SAND, SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18
    const py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a pixel bitmap that pops in at t0 (cell size c) */
const bits = (x, t, bm, cols, cx, cy, c, t0, o = {}) => drawBits(x, bm, cols, cx, cy, c * pop01(t, t0, 0.3, 2), o)
const MEGA = ['.....KK', '...KKRK', 'KKKRRRK', 'KWWRRRK', 'KWWRRRK', 'KKKRRRK', '...KKRK', '.....KK']
const MEGA_C = { K: INK, R: RED, W: BONE }
const DRAWER = ['KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KWWWWGGWWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const DRAWER_C = { K: INK, W: '#c98f5a', G: GOLD }
const COOKIE = ['.CCCC.', 'CCKCCC', 'CCCCKC', 'CKCCCC', 'CCCKCC', '.CCCC.']
const COOKIE_C = { C: '#e0b070', K: '#6b3a1e' }
const ALBUM = ['KKKKKKKKKKKKKK', 'KRRRRRRRRRRRRK', 'KRWWWWRRWWWWRK', 'KRWSSWRRWPPWRK', 'KRWWWWRRWWWWRK', 'KRRRRRRRRRRRRK', 'KRWWWWRRWWWWRK', 'KRWGGWRRWYYWRK', 'KRWWWWRRWWWWRK', 'KRRRRRRRRRRRRK', 'KKKKKKKKKKKKKK']
const ALBUM_C = { K: INK, R: '#8a4a2e', W: CREAM, S: SKYB, P: PINK, G: MINT, Y: GOLD }
const TOOLBOX = ['....KKKK....', '...K....K...', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRYYRRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']
const TOOLBOX_C = { K: INK, R: RED, Y: GOLD }
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'YYYYYYYY', 'YYYKKYYY', 'YYYKKYYY', 'YYYYKYYY', 'YYYYYYYY']
const LOCK_C = { K: INK, Y: GOLD }
const BULB = ['..YYYY..', '.YYWYYY.', 'YYYWYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..SSSS..', '..SSSS..', '...SS...']
const BULB_C = { Y: '#ffe066', W: '#ffffff', S: '#a9a9bf' }

const CAMEOS = [
  { sign: 'aries', cap: 'The family | *hype captain.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bits(x, t, MEGA, MEGA_C, 790, 860, 24, P.t0 + 0.2, { rot: -0.15 })
      bubble(x, 790, 660, 'GO GRANDMA!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      label(x, 790, 1100, 'AT EVERY GAME', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Keeper of | *the snack drawer.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, DRAWER, DRAWER_C, 790, 960, 24, P.t0 + 0.2)
      for (let i = 0; i < 3; i++) bits(x, t, COOKIE, COOKIE_C, 720 + i * 70, 820 - (i % 2) * 30, 12, P.t0 + 0.6 + i * 0.2)
      label(x, 790, 660, 'ALWAYS STOCKED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: SAND, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Runs the | *family group chat.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'FAMILY (14)', headCol: '#ffe066', lines: [
        ['dinner sunday?', BONE, pop01(t, P.t0 + 0.5, 0.2, 2), true], ['who has the dog', BONE, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['grandma joined!!', MINT, pop01(t, P.t0 + 1.3, 0.2, 2), true],
      ] })
    } },
  { sign: 'cancer', cap: 'The family | *photo album.*', mood: 'heart', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, t, ALBUM, ALBUM_C, 790, 860, 22, P.t0 + 0.2)
      label(x, 790, 1100, 'VOLUME 37', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 1.2, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Makes everyone | *laugh at dinner.*', mood: 'sparkle', star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      ;['HA!', 'HAHA', 'HA HA HA'].forEach((s, i) => bubble(x, 760 + (i % 2) * 50, 680 + i * 160, s, pop01(t, P.t0 + 0.4 + i * 0.4, 0.25, 2.2), { size: 38 + i * 4, col: i === 2 ? GOLD : BONE, tail: 'bl' }))
    } },
  { sign: 'virgo', cap: 'Fixes | *everyone’s problems.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, TOOLBOX, TOOLBOX_C, 790, 900, 22, P.t0 + 0.2)
      label(x, 790, 680, 'WIFI: FIXED ✓', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: '#b6e08a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'TAXES: FIXED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'The family | *peacemaker.*', mood: 'heart', star: { x: -40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), j = ease.inOutCubic(prog(lt, 0.6, 1.5))
      signChar(x, t, 'aries', lerp(200, 270, j), 980, 140 * k, { mood: lt > 1.5 ? 'happy' : 'wide', look: [1, 0], seed: 41, glyph: false })
      signChar(x, t, 'taurus', lerp(880, 810, j), 980, 140 * k, { mood: lt > 1.5 ? 'happy' : 'squint', look: [-1, 0], seed: 42, glyph: false })
      label(x, 540, 650, lt < 1.5 ? 'WHO ATE THE PIE?' : 'PIE: SHARED ♡', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: lt < 1.5 ? BONE : PINK, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Keeps every | *secret safe.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, LOCK, LOCK_C, 790, 880, 24, P.t0 + 0.2)
      label(x, 760, 660, 'SECRETS: 412', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: '#b07bff', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'LEAKED: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Brings back | *the best stories.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bubble(x, 770, 700, 'so there i was, | on a camel…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 950, 'STORY 1 OF 30', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'NOBODY LEAVES', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'The one | *with the plan.*', mood: lt => lt < 1.0 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 330, h: 380, head: 'HOLIDAY PLAN', headCol: SLATE, rows: [
        ['9:00 drive', INK, pop01(t, P.t0 + 0.4, 0.2, 2)], ['12:00 lunch', INK, pop01(t, P.t0 + 0.6, 0.2, 2)], ['2:00 photo', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['backup: plan B', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
  { sign: 'aquarius', cap: 'The one with | *the wildest ideas.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, t, BULB, BULB_C, 790, 820, 22, P.t0 + 0.2)
      sparkles(x, t, 790, 820, P.t0 + 0.6, 7, 160, 0.4)
      bubble(x, 790, 1060, 'family band?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Feels | *everyone’s feelings.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, 'MOM’S HAPPY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 860, 'DAD’S PROUD', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1020, 'PISCES: SOBBING', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0435', key: 'G', accent: GOLD, ending: 'lesson',
  title: 'Each sign’s | *role in the family.*',
  cameos: CAMEOS,
  group: { cap: 'Every seat | at the *table.*' },
  lesson: { text: 'Every family needs | *every one of us.*', chip: 'FAMILY: COMPLETE' },
  last: {
    text: 'Which one | *are you?*',
    draw(x, t, lt) { hearts(x, t, 540, 1350, t - lt + 0.4, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-50px', width: '1180px', transformOrigin: '50% 0', transform: 'scale(0.9)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
