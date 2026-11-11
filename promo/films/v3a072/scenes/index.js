// v3a072: star_advice, ADVICE ROLLCALL, "How each sign | heals." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: each sign's own way of healing, said kindly, one light gag per card.
//   0.0–3.6    "How each sign | *heals.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ a long run, then a nap (lap 12) · ♉ soup, blanket, slow Sunday (simmering) · ♊ talks it out with everyone
//              (call #7) · ♋ cries, bakes, feels better (batch 3) · ♌ a little self-hype (the mirror: you got this)
//              · ♍ cleans everything, feels lighter (sparkling) · ♎ pretty playlist, prettier sunset (headphones)
//              · ♏ disappears, comes back new (cocoon → butterfly) · ♐ buys a ticket to anywhere (destination: ?)
//              · ♑ makes a plan for healing (checklist) · ♒ alone time, lots of it (do not disturb)
//              · ♓ a good cry, a great bath (bubbles)
//  49.2        "Different ways. | *Same healing.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Heal your way. | It still *counts.*"  STATUS: HEALING
//  58.3        "Even if it’s | *soup again.*"  Taurus' soup comes back.
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#2fc79a', BROWN = '#8a4a2e'

function paper(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head, headBg = PINK, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 54); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 29) }
  for (const l of lines) { if (l.k !== undefined && l.k <= 0.01) continue; x.fillStyle = l.color || INK; x.font = l.font || `800 ${l.size || 34}px ${INTER}`; x.fillText(l.text, l.x || 0, l.y) }
  x.restore()
}
// soft steam wisps rising from (cx, cy)
function steam(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.fillStyle = 'rgba(239,230,214,0.75)'
  for (let i = 0; i < 3; i++) for (let j = 0; j < 6; j++) {
    const ph = ((t * 0.8 + j / 6) % 1)
    x.globalAlpha = k * Math.sin(Math.PI * ph) * 0.8
    x.fillRect(cx + (i - 1) * 50 + Math.sin(ph * 8 + i) * 10 - 6, cy - ph * 140, 12, 12)
  }
  x.restore()
}

// ── props
const SHOE = [
  '.....RRRR.....',
  '....RRWWR.....',
  '...RRRWWRR....',
  '..RRRRRRRRRR..',
  'RRRRRRRRRRRRRR',
  'WWWWWWWWWWWWWW',
]
const SHOE_C = { R: RED, W: CREAM }
const BOWL = [
  'YYYYYYYYYYYYYY',
  'BYYOYYYYYOYYYB',
  '.BBBBBBBBBBBB.',
  '..BBBBBBBBBB..',
  '...BBBBBBBB...',
  '.....BBBB.....',
]
const BOWL_C = { Y: '#ffcf6a', O: ORANGE, B: '#6f8cff' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSGGGGSK',
  'KSGGGGSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSRRSSK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', G: '#7dffb0', R: RED }
const TRAY = [
  '.C..C..C..C.',
  'CCC.CCC.CCC.',
  '.C..C..C..C.',
  'SSSSSSSSSSSS',
  'SSSSSSSSSSSS',
]
const TRAY_C = { C: '#d18f4a', S: '#c9d1e0' }
const MIRROR = [
  '..GGGGGG..',
  '.GSSSSSSG.',
  'GSSWSSSSSG',
  'GSWSSSSSSG',
  'GSSSSSSSSG',
  'GSSSSSSSSG',
  'GSSSSSSSSG',
  '.GSSSSSSG.',
  '..GGGGGG..',
  '....GG....',
  '..GGGGGG..',
]
const MIRROR_C = { G: GOLD, S: '#bfe9ff', W: '#fff' }
const SPRAY = [
  '.WWWW...',
  'WWWWWWW.',
  '.WWWW.W.',
  '..BB....',
  '.BBBB...',
  'BBBBBB..',
  'BBMMBB..',
  'BBMMBB..',
  'BBBBBB..',
  'BBBBBB..',
]
const SPRAY_C = { W: CREAM, B: '#7dffb0', M: GREEN }
const PHONES = [
  '..BBBBBBBBBB..',
  '.BB........BB.',
  'BB..........BB',
  'B............B',
  'B............B',
  'PPP........PPP',
  'PPP........PPP',
  'PPP........PPP',
]
const PHONES_C = { B: '#c9d1e0', P: PINK }
const COCOON = [
  '...SS...',
  '..CCCC..',
  '.CCDCCC.',
  '.CCCCDC.',
  '.CDCCCC.',
  '.CCCDCC.',
  '..CCCC..',
  '...CC...',
]
const COCOON_C = { S: BROWN, C: '#b9a37a', D: '#8f7a55' }
const FLY = [
  'PP.......PP',
  'PPP.....PPP',
  'PPPP.B.PPPP',
  'PPPPPBPPPPP',
  '.PPPPBPPPP.',
  '.LLL.B.LLL.',
  'LLLL...LLLL',
  '.LL.....LL.',
]
const FLY_C = { P: '#b07dff', L: PINK, B: INK }
const PACK = [
  '...GGGG...',
  '..G....G..',
  '.OOOOOOOO.',
  'OOOOOOOOOO',
  'OOYYYYYYOO',
  'OOYOOOOYOO',
  'OOOOOOOOOO',
  'OOOOOOOOOO',
  '.OOOOOOOO.',
]
const PACK_C = { G: BROWN, O: '#ff9f5a', Y: GOLD }
const TUB = [
  '..W.WW..W.W.WW.',
  '.WWWWWWWWWWWWW.',
  'TTTTTTTTTTTTTTT',
  'TTTTTTTTTTTTTTT',
  '.TTTTTTTTTTTTT.',
  '..F.........F..',
]
const TUB_C = { W: '#ffffff', T: '#c6efff', F: '#c9d1e0' }

const CAMEOS = [
  { sign: 'aries', cap: 'A long run. | *Then a nap.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SHOE, SHOE_C, 790, 900, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.08 + 0.06 * Math.sin(t * 9) * (lt < 1.4 ? 1 : 0) })
      label(x, 790, 720, 'LAP 12', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05 })
      label(x, 790, 1090, 'NOW: NAP', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Soup. Blanket. | *Slow Sunday.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      steam(x, t, 790, 860, k)
      drawBits(x, BOWL, BOWL_C, 790, 920, 22 * k)
      label(x, 790, 1100, 'SIMMERING…', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Talks it out. | *With everyone.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 880, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.08 })
      const n = 1 + Math.min(6, Math.floor(Math.max(0, lt - 0.4) / 0.25))
      label(x, 790, 660, `CALL #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05 })
      bubble(x, 790, 1100, 'so anyway…', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Cries, bakes, | *feels better.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 0 : 1, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      steam(x, t, 790, 850, k)
      drawBits(x, TRAY, TRAY_C, 790, 900, 22 * k)
      label(x, 790, 1080, 'BATCH 3', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'A little | *self-hype.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MIRROR, MIRROR_C, 800, 880, 24 * pop01(t, P.t0 + 0.25, 0.3, 2))
      sparkles(x, t, 800, 840, P.t0 + 0.9, 6, 150, 0.2)
      bubble(x, 760, 620, 'you got this.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Cleans everything. | *Feels lighter.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SPRAY, SPRAY_C, 600, 900, 18 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.1 })
      sparkles(x, t, 820, 840, P.t0 + 0.8, 8, 140, 0.3, [MINT, BONE, SKYB])
      sparkles(x, t, 820, 840, P.t0 + 1.3, 8, 110, 0.9, [MINT, BONE, SKYB])
      label(x, 820, 1080, 'SPARKLING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Pretty playlist. | *Prettier sunset.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 1.2))
      if (k <= 0.01) return
      x.save(); x.beginPath(); x.rect(560, 480, 410, 640); x.clip()
      x.globalAlpha = k; x.fillStyle = INK; x.beginPath(); x.arc(790, 900, 132, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ff9f7a'; x.beginPath(); x.arc(790, 900, 124, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffd08a'; x.beginPath(); x.arc(760, 870, 60, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#3a2d70'; x.fillRect(560, 950, 410, 200)
      x.restore()
    },
    front(x, t, lt, P, F) {
      drawBits(x, PHONES, PHONES_C, F.x, F.top + 40, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 790, 760, { n: 4, cell: 7, col: PINK, alpha: clamp((lt - 0.4) / 0.4) })
      label(x, 790, 1080, 'TRACK: CALM', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Disappears. | Comes back *new.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const swap = lt > 1.2
      if (!swap) drawBits(x, COCOON, COCOON_C, 790, 880, 26 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.05 * Math.sin(t * 4) })
      else drawBits(x, FLY, FLY_C, 790, 860 + 12 * Math.sin(t * 5), 24 * pop01(t, P.t0 + 1.2, 0.35, 2.4), { sy: 0.8 + 0.2 * Math.abs(Math.sin(t * 7)) })
      sparkles(x, t, 790, 870, P.t0 + 1.2, 8, 170, 0.2, [LAV, BONE, PINK])
      label(x, 790, 1100, swap ? 'BACK. NEW.' : 'GONE. BRB.', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: '#b07dff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Buys a ticket. | *Anywhere.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 320, 860, 22 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 320, 1070, 'DESTINATION: ?', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 320, 650, 'see ya!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Makes a plan. | *For healing.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const lk = i => pop01(t, P.t0 + 0.7 + i * 0.35, 0.25, 2)
      paper(x, 320, 850, 300, 320, pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.04, head: 'HEAL: TO-DO', headBg: GREEN,
        lines: [{ text: '✓ water', y: -40, size: 36, k: lk(0) }, { text: '✓ rest', y: 20, size: 36, k: lk(1) }, { text: '✓ cry once', y: 80, size: 36, color: RED, k: lk(2) }] })
    } },
  { sign: 'aquarius', cap: 'Alone time. | *Lots of it.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 850, 230, 330, pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.06, bg: SKYB, lines: [{ text: 'DO', y: -80, size: 56 }, { text: 'NOT', y: -10, size: 56 }, { text: 'DISTURB', y: 60, size: 46 }] })
      label(x, 790, 1090, 'BACK… EVENTUALLY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A good cry. | *A great bath.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 2 : 3, star: { x: -170, y: -40 },
    front(x, t, lt, P) {
      drawBits(x, TUB, TUB_C, 370, 1080, 30 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 820, 'BUBBLES: MAX', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04 })
      hearts(x, t, 790, 980, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'v3a072', key: 'E', accent: MINT, ending: 'lesson',
  title: 'How each sign | *heals.*',
  cameos: CAMEOS,
  group: { cap: 'Different ways. | *Same healing.*' },
  lesson: { text: 'Heal your way. | It still *counts.*', chip: 'STATUS: HEALING' },
  last: {
    text: 'Even if it’s | *soup again.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.35, 2)
      steam(x, t, 540, 740, k)
      drawBits(x, BOWL, BOWL_C, 540, 800, 24 * k)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
