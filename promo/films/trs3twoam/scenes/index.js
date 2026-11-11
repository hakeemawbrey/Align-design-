// trs3twoam: THE SIGNS AS… v3, "Zodiacs at 2 a.m. | be like." (~62 s vertical, signs3kit social cut, music: lofi · F)
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Zodiacs at 2 a.m. | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   what each sign is doing at 2 a.m. instead of sleeping (3.8 s each), pushed to the extreme:
//              ♈ started a business, closed it by 2:15 · ♉ a light snack, course four · ♊ one quick search, sixty tabs
//              · ♋ rereading texts from 2014 · ♌ practised a speech for no award · ♍ alphabetised the spices, then by colour
//              · ♎ can't pick a side of the bed · ♏ a match texted "k.", hour three of analysis
//              · ♐ solved the universe, forgot it · ♑ not up late, up early · ♒ reading their plant's birth chart
//              · ♓ checked compatibility with a book character (and cried)
//  49.2        "Nobody *slept.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Big thoughts can wait. | *Sleep* on them."  STATUS: ASLEEP
//  58.3        "Sag forgot it. | Cancer *saved it.*" over the match card: Sagittarius (forgot the meaning of life) +
//              Cancer (rereads every text, so it's on record).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e'

// ── props
const BOWL = [
  'YYYYYYYYYYYYY',
  'WYWYYWYYWYYWY',
  'RRRRRRRRRRRRR',
  '.RRRRRRRRRRR.',
  '..RRRWWWRRR..',
  '...RRRRRRR...',
  '....KKKKK....',
]
const BOWL_C = { S: '#ffffff', Y: '#ffe7a8', W: '#fff4e2', R: '#e23d4e', K: '#8a4a2e' }
const BRUSH = [
  '.PPPP.',
  'PPPPPP',
  'PWPPWP',
  'PPPPPP',
  'PWPPWP',
  'PPPPPP',
  '.PPPP.',
  '..GG..',
  '..GG..',
  '..GG..',
  '..GG..',
  '..GG..',
  '..GG..',
]
const BRUSH_C = { P: '#ffb34a', W: '#fff1b0', G: '#8a4a2e' }
const JAR = [
  '.LLLL.',
  '.LLLL.',
  'GGGGGG',
  'GSSSSG',
  'GSSSSG',
  'GSSSSG',
  'GSSSSG',
  'GGGGGG',
]
const BED = [
  'B.....................',
  'B.....................',
  'BWW.................B.',
  'BWWW................B.',
  'BQQQQQQQQQQQQQQQQQQQB.',
  'BQQQQQQQQQQQQQQQQQQQB.',
  'BBBBBBBBBBBBBBBBBBBBB.',
  'B..................B..',
]
const BED_C = { B: '#8a4a2e', W: '#fff4e2', Q: '#6fc3ff' }
const GLASS = [
  '..KKKKK....',
  '.KSSSSSK...',
  'KSSWSSSSK..',
  'KSWSSSSSK..',
  'KSSSSSSSK..',
  'KSSSSSSSK..',
  '.KSSSSSK...',
  '..KKKKKBB..',
  '.......BBB.',
  '........BBB',
  '.........BB',
]
const GLASS_C = { K: '#2a2350', S: 'rgba(143,227,255,0.35)', W: '#ffffff', B: '#8a4a2e' }
const BULB = [
  '...YYYY...',
  '..YYYYYY..',
  '.YYYWYYYY.',
  '.YYWYYYYY.',
  '.YYYYYYYY.',
  '..YYYYYY..',
  '...YYYY...',
  '...GGGG...',
  '...gggg...',
  '...GGGG...',
  '....gg....',
]
const BULB_ON = { Y: '#fff1a8', W: '#ffffff', G: '#9aa5c4', g: '#6b62a8' }
const BULB_OFF = { Y: '#4a4570', W: '#6b6590', G: '#9aa5c4', g: '#6b62a8' }
const CLOCK = [
  'BB.........BB',
  'BBB.......BBB',
  '.RRRRRRRRRRR.',
  'RRWWWWWWWWWRR',
  'RWWWWWWWWWWWR',
  'RWWWWWWWWWWWR',
  'RWWWWWWWWWWWR',
  'RWWWWWWWWWWWR',
  'RWWWWWWWWWWWR',
  'RRWWWWWWWWWRR',
  '.RRRRRRRRRRR.',
  '.K.........K.',
]
const CLOCK_C = { B: GOLD, R: '#2fc79a', W: '#fff4e2', K: '#2a2350' }
const PLANT = [
  '...L...L...',
  '..LL..LL.L.',
  'L.LLL.L.LL.',
  'LL.LLLLLL..',
  '.LLLLLLL..L',
  '..LLLLLLLL.',
  '....LLL....',
  '.TTTTTTTTT.',
  '.TTTTTTTTT.',
  '..TTTTTTT..',
  '..TTTTTTT..',
  '...TTTTT...',
]
const PLANT_C = { L: '#5fd068', T: '#e0884a' }
const BOOK = [
  'KKKKKKK.KKKKKKK',
  'KWWWWWWKWWWWWWK',
  'KWLLLLWKWLLLLWK',
  'KWWWWWWKWWWWWWK',
  'KWLLLLWKWLLLLWK',
  'KWWWWWWKWWHHWWK',
  'KWLLLLWKWHHHHWK',
  'KWWWWWWKWWHHWWK',
  'KWWWWWWKWWWWWWK',
  'KKKKKKKKKKKKKKK',
]
const BOOK_C = { K: '#6b62a8', W: '#fff4e2', L: '#9aa5c4', H: '#ff4f86' }

// a little night-sky phone: a dark screen with chat bubbles scrolling upward (Cancer's old texts)
function oldTexts(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -190, 240, 380)
  x.fillStyle = '#140c30'; x.fillRect(-108, -160, 216, 320)
  x.save(); x.beginPath(); x.rect(-108, -160, 216, 320); x.clip()
  const MSG = ['hey!!', 'miss u :)', 'lol', 'ok goodnight', 'see u soon', 'hehe', 'thx!!', 'omg same']
  const scroll = (lt * 160) % (MSG.length * 70)
  x.font = `800 26px ${INTER}`; x.textBaseline = 'middle'
  for (let r = 0; r < MSG.length * 2; r++) {
    const m = MSG[r % MSG.length], left = r % 2 === 0
    const y = -130 + r * 70 - scroll
    if (y < -200 || y > 200) continue
    const w = x.measureText(m).width + 26
    const bx = left ? -96 : 96 - w
    x.fillStyle = left ? BONE : '#ffb7d0'; x.fillRect(bx, y - 22, w, 44)
    x.fillStyle = INK; x.textAlign = 'left'; x.fillText(m, bx + 13, y + 1)
  }
  x.restore()
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 168, 60, 10)
  x.restore()
}
// Gemini's tabs: browser windows stacking up, each a different 2 a.m. rabbit hole
const TABS = ['how owls sleep', 'learn violin', 'octopus facts', 'start a podcast?', 'are clouds heavy', 'learn italian', 'build a canoe']
function tabs(x, cx, cy, lt) {
  const n = Math.min(TABS.length, Math.floor(Math.max(0, lt - 0.15) / 0.24) + 1)
  for (let i = 0; i < n; i++) {
    const k = pop01(lt, 0.15 + i * 0.24, 0.2, 2)
    const wx = cx - 70 + i * 26, wy = cy - 190 + i * 52
    x.save(); x.translate(wx, wy); x.rotate(-0.04 + (i % 3) * 0.03); x.scale(k, k)
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -36, 316, 92)
    x.fillStyle = INK; x.fillRect(-160, -46, 320, 92)
    x.fillStyle = BONE; x.fillRect(-154, -40, 308, 80)
    x.fillStyle = ['#ffd23a', '#8fe3ff', '#ff8fb1', '#7dffb0'][i % 4]; x.fillRect(-154, -40, 308, 20)
    x.fillStyle = RED; x.fillRect(128, -36, 12, 12)
    x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(TABS[i], 0, 12)
    x.restore()
  }
}
// a small birth-chart wheel (Aquarius reads the plant's)
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD
  for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 7, Math.sin(a) * r * 0.4 - 7, 14, 14)
  x.restore()
}

// the spice jars: alphabetical first, then they shuffle into a rainbow
const SPICES = [['A', '#c9a06a'], ['B', '#5fd068'], ['C', '#e23d4e'], ['D', '#ffd23a'], ['G', '#ff9a4a'], ['P', '#b7533a']]
const RAINBOW = [2, 5, 4, 3, 1, 0]   // the order the jars end up in (red → orange → yellow → green → brown-ish)
function spices(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const sh = ease.inOutCubic(prog(lt, 1.0, 1.5))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#8a4a2e'; x.fillRect(-210, 90, 420, 18); x.fillStyle = INK; x.fillRect(-210, 108, 420, 6)
  SPICES.forEach(([l, c], i) => {
    const from = -170 + i * 68, to = -170 + RAINBOW.indexOf(i) * 68
    const px = lerp(from, to, sh), py = 40 - Math.sin(Math.PI * sh) * (40 + 20 * (i % 3))
    drawBits(x, JAR, { L: '#2a2350', G: '#fff4e2', S: c }, px, py, 11)
    x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(l, px, py + 12)
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Started a business. | Closed it *by 2:15.*', mood: lt => lt > 1.5 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [0.4, 0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 780, 640, 'EST. 2:01 A.M.', pop01(t, P.t0 + 0.25, 0.3, 2), { size: 34, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      const shut = lt > 1.45
      const k = shut ? pop01(t, P.t0 + 1.45, 0.3, 2.6) : pop01(t, P.t0 + 0.5, 0.3, 2.2)
      label(x, 790, 860, shut ? 'CLOSED' : 'OPEN!', k, { size: 84, bg: shut ? RED : MINT, color: shut ? '#fff4e2' : INK, rot: shut ? 0.08 : -0.04 })
      label(x, 790, 1010, 'by 2:15', pop01(t, P.t0 + 1.75, 0.3, 2), { size: 32, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 790, 860, P.t0 + 0.6, 6, 150, 0.4)
    } },
  { sign: 'taurus', cap: 'A light snack. | *Course four.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', star: { x: -160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, BOWL, BOWL_C, 790, 1010, 22 * k)
      if (k > 0.9) {
        x.save(); x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = 10; x.lineCap = 'round'
        for (const dx of [-60, 0, 60]) { x.beginPath(); for (let j = 0; j <= 10; j++) { const yy = 930 - j * 9, xx = 790 + dx + Math.sin(j * 0.8 + t * 4 + dx) * 10; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
        x.restore()
      }
    },
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.35))
      label(x, 790, 720, `COURSE ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: GOLD, rot: 0.05 })
      bubble(x, 600, 600, 'just a | little one', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'One quick search. | *Sixty tabs.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      tabs(x, 720, 830, lt)
      label(x, 740, 1150, 'TABS: 60', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Rereading texts | *from 2014.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      oldTexts(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      const yr = Math.max(2014, 2026 - Math.floor(Math.max(0, lt - 0.4) * 8))
      label(x, 790, 610, `SCROLLED TO: ${yr}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: '#8fe3ff', rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 1000, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Practised a speech | for *no award.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BRUSH, BRUSH_C, 610, 960, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.35 })
      bubble(x, 780, 660, "I'd like to | thank… me.", pop01(t, P.t0 + 0.45, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 920, 'BEST ME: NOMINEE', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: '#ffb34a', rot: 0.06 })
      sparkles(x, t, 390, 860, P.t0 + 1.25, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Alphabetised the spices. | Then *by colour.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      spices(x, 760, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      const late = lt > 1.15
      label(x, 760, 680, late ? 'BY COLOUR' : 'A → Z', late ? pop01(t, P.t0 + 1.15, 0.3, 2.4) : pop01(t, P.t0 + 0.4, 0.3, 2), { size: 42, bg: late ? PINK : MINT, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Can’t pick a side | *of the bed.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: -150, s: 250 },
    back(x, t, lt, P) {
      drawBits(x, BED, BED_C, 540, 1040, 30 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      const right = Math.floor(lt * 2.5) % 2
      const k = pop01(t, P.t0 + 0.4, 0.25, 2.2)
      bubble(x, right ? 790 : 290, 640, right ? 'this side?' : 'that side?', k, { size: 40, tail: right ? 'bl' : 'br' })
      label(x, 540, 1170, 'NIGHT 4 OF DECIDING', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: PINK, rot: -0.03 })
    } },
  { sign: 'scorpio', cap: 'Match texted “k.” | *Hour three* of analysis.', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 610, '✦ MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 760, 760, 'k.', pop01(t, P.t0 + 0.35, 0.25, 2.4), { size: 130, col: LAV, tail: 'bl' })
      const g = pop01(t, P.t0 + 0.8, 0.3, 2)
      drawBits(x, GLASS, GLASS_C, 900 + 12 * Math.sin(lt * 3), 900 + 8 * Math.cos(lt * 3), 13 * g, { rot: -0.2 })
      label(x, 760, 1090, 'NOTES: PAGE 9', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 32, bg: '#c97bff', color: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Solved the universe. | *Forgot it.*', mood: lt => lt > 1.55 ? 'wide' : 'sparkle', star: { x: 150 }, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      const off = lt > 1.5
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (!off && k > 0.9) { x.save(); x.globalAlpha = 0.25 + 0.1 * Math.sin(t * 9); x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(320, 780, 150, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, BULB, off ? BULB_OFF : BULB_ON, 320, 780, 20 * k)
      bubble(x, off ? 330 : 360, off ? 1010 : 590, off ? '…wait, what?' : 'IT ALL | MAKES SENSE!', off ? pop01(t, P.t0 + 1.55, 0.25, 2.2) : pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'br' })
      sparkles(x, t, 320, 780, P.t0 + 0.4, 8, 160, 0.3)
    } },
  { sign: 'capricorn', cap: 'Not up late. | Up *early.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const shake = lt > 0.5 && lt < 1.3 ? Math.sin(t * 60) * 5 : 0
      drawBits(x, CLOCK, CLOCK_C, 320 + shake, 800, 24 * k)
      if (k > 0.5) { x.save(); x.fillStyle = INK; x.font = `700 60px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.globalAlpha = clamp((k - 0.5) * 2); x.fillText('2:00', 320 + shake, 806); x.restore() }
      label(x, 320, 1040, 'BIG DAY. LET’S GO.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: '#2fc79a', rot: -0.05 })
    } },
  { sign: 'aquarius', cap: 'Reading the birth chart | of *their plant.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 1010, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      chart(x, 790, 700, 115, pop01(t, P.t0 + 0.5, 0.35, 2), t)
      label(x, 790, 860, 'FERN: LEO RISING', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Checked compatibility | with a *book character.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 640, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05 })
      hearts(x, t, 800, 1060, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'trs3twoam', key: 'F', accent: '#8fe3ff',
  title: 'Zodiacs at 2 a.m. | *be like.*',
  cameos: CAMEOS,
  card: { a: 'sagittarius', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Nobody *slept.*' },
  lesson: { text: 'Big thoughts can wait. | *Sleep* on them.', chip: 'STATUS: ASLEEP' },
  last: {
    text: 'Sag forgot it. | Cancer *saved it.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
