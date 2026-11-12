// r2t0477: star_talk, BE LIKE, "Zodiacs with | the hiccups *be like.*" (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, each the most extreme version of themselves with a case of the hiccups. Ending: lesson.
//   0.0–3.6    "Zodiacs with | the hiccups *be like.*"
//   3.6–49.2   ♈ every cure in ten seconds · ♉ kept eating anyway · ♊ hiccupped mid-story, started three more (on a date)
//              · ♋ called their mom · ♌ hiccups in rhythm, called it a remix · ♍ logged every hiccup in a spreadsheet
//              · ♎ apologised for each one · ♏ glared at them, they stopped · ♐ laughed so hard the hiccups got hiccups
//              · ♑ scheduled them for 3 p.m. · ♒ built a hiccup machine, it hiccups now · ♓ hiccups → crying → hiccups
//  49.2        "Twelve signs. | *Zero cures.*"
//  52.4        LESSON: "Nobody’s cool all the time. | That’s *the charm.*"  HICCUPS: CURED
//  58.3        "Aquarius’ machine? | *Still hiccuping.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350', GREEN = '#5fd068', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, color = INK } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 320, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a profile card with a sign star inside */
function profile(x, t, cx, cy, k, id, title, { w = 250, h = 320, mood = 'sparkle', rot = 0.05, bg = DEEP, col = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 90)
  signChar(x, t, id, 0, -26, 150, { mood, seed: 71, glyph: false, glow: 0.9, tears: id === 'pisces' ? 1 : 0 })
  x.fillStyle = col; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(title, 0, h / 2 - 38)
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a box with a lid (gift): open = 0…1 lifts the lid */
function giftBox(x, cx, cy, k, open = 0, { body = PINK, ribbon = GOLD, w = 200, h = 160, bow = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = body; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = ribbon; x.fillRect(-14, -h / 2, 28, h)
  const ly = -h / 2 - 30 - open * 120, lr = open * -0.5
  x.save(); x.translate(0, ly); x.rotate(lr)
  x.fillStyle = INK; x.fillRect(-w / 2 - 22, -6, w + 44, 48)
  x.fillStyle = body; x.fillRect(-w / 2 - 16, 0, w + 32, 36)
  x.fillStyle = ribbon; x.fillRect(-14, 0, 28, 36)
  if (bow) { x.fillStyle = INK; x.fillRect(-62, -40, 124, 46); x.fillStyle = ribbon; x.fillRect(-56, -34, 46, 34); x.fillRect(10, -34, 46, 34); x.fillStyle = '#c98f2a'; x.fillRect(-12, -30, 24, 30) }
  x.restore()
  x.restore()
}

const ACC = '#8fe3ff'
const hic = (x, cx, cy, k, size = 40, text = 'hic!') => bubble(x, cx, cy, text, k, { size, col: CREAM, tail: 'bl' })
const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', '.BBBBBBBBBB.']
const SANDWICH_C = { B: '#e8a24a', G: GREEN, R: RED, Y: GOLD }
const MACHINE = [
  '....SS..SS....',
  '....SS..SS....',
  'KKKKKKKKKKKKKK',
  'KGGGGGGGGGGGGK',
  'KGRRGGGGGBBGGK',
  'KGRRGGGGGBBGGK',
  'KGGGGGGGGGGGGK',
  'KGGYYYYYYYYGGK',
  'KGGGGGGGGGGGGK',
  'KKKKKKKKKKKKKK',
  '.WW........WW.',
]
const MACHINE_C = { S: SKYB, K: INK, G: GREY, R: RED, B: MINT, Y: GOLD, W: DEEP }

const CAMEOS = [
  { sign: 'aries', cap: 'Tried every cure | *in ten seconds.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', star: ST, hops: [0.4, 0.8, 1.2, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const CURES = ['water', 'breath', 'jump', 'sugar', 'scream']
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.25))
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), CURES.map((c, i) => (i < n ? '✓ ' : '· ') + c), { w: 290, bg: CREAM, size: 34, rot: 0.04, font: MONO, weight: 700 })
      L(x, 790, 1130, 'TIME: 00:10', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, -0.04, 34, CREAM)
      hic(x, 560, 620, pop01(t, P.t0 + 1.9, 0.25, 2.2))
    } },
  { sign: 'taurus', cap: 'Hiccups? | *Kept eating anyway.*', mood: lt => Math.floor(lt * 2.2) % 2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const bite = Math.floor(clamp((lt - 0.4) / 1.6) * 4)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SANDWICH.map(r => r.slice(0, 12 - bite * 2) + '.'.repeat(bite * 2)), SANDWICH_C, 790, 960, 28 * k)
      hic(x, 740, 680, pop01(t, P.t0 + 0.6, 0.25, 2.2), 40, 'hic!')
      hic(x, 860, 780, pop01(t, P.t0 + 1.2, 0.25, 2.2), 40, '*chew* hic!')
      L(x, 790, 1130, 'PRIORITIES', pop01(t, P.t0 + 1.7, 0.3, 2.2), GREEN, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Hiccupped mid-story. | Started *three new ones.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const S = ['so my aunt—', 'hic! ANYWAY', 'oh! sharks—', 'hic! also—']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 780, 700, S[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 880, `STORIES OPEN: ${n + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.05, 30)
      L(x, 790, 1060, 'FIRST DATE: STILL LISTENING', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 24)
    } },
  { sign: 'cancer', cap: 'Got the hiccups. | *Called their mom.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM ♡ CALLING', headCol: PINK, lines: [
        ['hic!', BONE, pop01(t, P.t0 + 0.5, 0.2, 2), true], ['sip water,', PINK, pop01(t, P.t0 + 0.9, 0.2, 2)], ['sweetie', PINK, pop01(t, P.t0 + 1.1, 0.2, 2)], ['hic! ok', BONE, pop01(t, P.t0 + 1.5, 0.2, 2), true],
      ] })
      L(x, 790, 1130, 'CALL: 2 HOURS', pop01(t, P.t0 + 1.8, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Hiccups in rhythm? | Called it *a remix.*', mood: 'sparkle', star: ST, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 5, cell: 8, col: ORANGE, seed: 3 })
      L(x, 790, 650, 'NEW SINGLE', pop01(t, P.t0 + 0.3, 0.3, 2.2), ORANGE, -0.04, 38)
      L(x, 790, 760, 'LEO ft. HICCUPS', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 32)
      hic(x, 800, 1100, pop01(t, P.t0 + 1.5, 0.25, 2.2), 40, 'hic! (on beat)')
    } },
  { sign: 'virgo', cap: 'Logged every hiccup. | *In a spreadsheet.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k); x.rotate(0.03)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = CREAM; x.fillRect(-162, -142, 324, 284)
        x.fillStyle = MINT; x.fillRect(-162, -142, 324, 44)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HIC_LOG.SHEET', 0, -120)
        x.strokeStyle = GREY; x.lineWidth = 2
        for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(-162, -98 + i * 40); x.lineTo(162, -98 + i * 40); x.stroke() }
        x.beginPath(); x.moveTo(-60, -98); x.lineTo(-60, 142); x.stroke()
        const n = Math.min(6, Math.floor(Math.max(0, lt - 0.4) / 0.25))
        x.font = `700 22px ${MONO}`
        for (let i = 0; i < n; i++) { x.fillText(`#${i + 31}`, -110, -78 + i * 40); x.fillText(`12:0${i}:${10 + i * 7}`, 50, -78 + i * 40) }
        x.restore()
      }
      L(x, 790, 1110, 'TREND: HICCUPY', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Hiccupped politely. | *Apologised each time.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wide' : 'happy', star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 650, 'hic! sorry!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 820, 820, 'so sorry! hic!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.5) / 1.7) * 26)
      L(x, 790, 1020, `SORRY ×${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), PINK, -0.04, 40)
    } },
  { sign: 'scorpio', cap: 'Glared at the hiccups. | *They stopped.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      hic(x, 790, 720, pop01(t, P.t0 + 0.3, 0.25, 2.2) * (1 - prog(lt, 1.0, 1.3)), 46, 'hic—')
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.6 * k; x.fillStyle = RED; x.fillRect(560, 840, 240, 10); x.fillRect(560, 870, 240, 10); x.restore() }
      L(x, 790, 980, 'HICCUPS: LEFT', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, -0.04, 36, CREAM)
      bubble(x, 790, 1120, 'good.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Laughed so hard | the hiccups *got hiccups.*', mood: lt => lt > 0.4 ? 'sparkle' : 'happy', star: { x: 150 }, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P) {
      bubble(x, 320, 660, 'HAHAHA', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, tail: 'br' })
      hic(x, 320, 860, pop01(t, P.t0 + 0.8, 0.25, 2.2), 52, 'HIC!')
      hic(x, 420, 960, pop01(t, P.t0 + 1.3, 0.25, 2.2), 26, 'hic!')
      hic(x, 470, 1030, pop01(t, P.t0 + 1.6, 0.25, 2.2), 16, 'hic')
    } },
  { sign: 'capricorn', cap: 'Scheduled the hiccups. | *For 3 p.m.*', mood: 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      note(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['2:30  meeting', '3:00  HICCUPS', '3:05  back to it'], { w: 380, bg: CREAM, size: 30, rot: -0.04, font: MONO, weight: 700 })
      L(x, 320, 1080, 'ON SCHEDULE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 34)
      if (lt > 1.8) hic(x, 600, 660, pop01(t, P.t0 + 1.85, 0.25, 2.2), 36, 'hic. (3:00)')
    } },
  { sign: 'aquarius', cap: 'Built a hiccup cure machine. | *It hiccups now.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const jolt = lt > 1.2 ? Math.max(0, Math.sin((lt - 1.2) * 9)) * 18 : 0
      drawBits(x, MACHINE, MACHINE_C, 790, 930 - jolt, 18 * k)
      L(x, 790, 700, 'CURE-O-TRON', pop01(t, P.t0 + 0.4, 0.3, 2), SKYB, -0.04, 34)
      hic(x, 860, 1110, pop01(t, P.t0 + 1.3, 0.25, 2.2), 40, '*beep* hic!')
    } },
  { sign: 'pisces', cap: 'Hiccups made them cry. | Crying made *more hiccups.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 700, 'HIC', pop01(t, P.t0 + 0.3, 0.3, 2), CREAM, -0.04, 40)
      L(x, 790, 860, '↓ SOB', pop01(t, P.t0 + 0.7, 0.3, 2), SKYB, 0.04, 40)
      L(x, 790, 1020, '↓ HIC', pop01(t, P.t0 + 1.1, 0.3, 2), CREAM, -0.04, 40)
      bubble(x, 790, 1140, 'it’s a loop', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0477', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Zodiacs with | the hiccups *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero cures.*' },
  lesson: { text: 'Nobody’s cool all the time. | That’s *the charm.*', chip: 'HICCUPS: CURED' },
  last: {
    text: 'Aquarius’ machine? | *Still hiccuping.*',
    draw(x, t, lt) {
      const t0 = t - lt, jolt = Math.max(0, Math.sin(lt * 9)) * 16
      drawBits(x, MACHINE, MACHINE_C, 540, 820 - jolt, 18 * pop01(t, t0 + 0.4, 0.35, 2))
      hic(x, 730, 700, pop01(t, t0 + 1.0, 0.25, 2.2), 42, 'hic!')
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
