// v3t057: THE SIGNS AS… v3, SOLO film, "Dating a Cancer | be like." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine moments of dating a Cancer, each the most extreme (and lovable) version.
//   0.0–3.6    "Dating a Cancer | *be like.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              date two: cooked for six · "I'm a bit cold": three blankets · a scrapbook of week one
//              · met your friends, now texts them more · one slightly sad text: already at your door
//              · love language: snacks in your bag · your mom loves them more than you
//              · shell mode for a day, back with pancakes · anniversary? every month
//  37.8        "All heart. | *Every day.*"
//  41.0        LESSON UNLOCKED: "Let a Cancer care for you. | *Then care back.*"  STATUS: COSY
//  46.9        "Month fourteen: | *still celebrating.*" (calls back the monthly anniversary, the cake returns)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BLUE = '#8fc8ff', BROWN = '#8a4a2e'

const POT = [
  '..KKKKKK..',
  'GGGGGGGGGG',
  'GgggggggGG',
  'GGGGGGGGGG',
  'GGGGGGGGGG',
  '.GGGGGGGG.',
]
const PLATE = [
  '.WWWWWW.',
  'WWOOOOWW',
  'WOOYYOOW',
  'WWOOOOWW',
  '.WWWWWW.',
]
const BLANKET = [
  'AAAAAAAAAAAA',
  'AaAaAaAaAaAa',
  'AAAAAAAAAAAA',
  'aAaAaAaAaAaA',
  'AAAAAAAAAAAA',
]
const DOOR = [
  'BBBBBBBB',
  'BbbbbbbB',
  'BbBBBBbB',
  'BbBBBBbB',
  'BbbbbbbB',
  'BbBBBBbB',
  'BbBBBBYB',
  'BbBBBBbB',
  'BbbbbbbB',
  'BBBBBBBB',
]
const BAG = [
  '..KKKKKK..',
  '..K....K..',
  'BBBBBBBBBB',
  'BBBBBBBBBB',
  'BbBBBBBBbB',
  'BBBBBBBBBB',
  'BBBBBBBBBB',
  'BBBBBBBBBB',
]
const SNACKS = [
  ['.OO.', 'OOOO', 'OYYO', 'OOOO'],
  ['PPPP', 'PWWP', 'PPPP'],
  ['.CC.', 'CCCC', 'CdCC', '.CC.'],
]
const PANCAKES = [
  '....YY....',
  '.TTTTTTTT.',
  'TTTTTTTTTT',
  '.tttttttt.',
  '.TTTTTTTT.',
  'TTTTTTTTTT',
  '.tttttttt.',
  'WWWWWWWWWW',
]
const PANCAKES_C = { Y: '#fff1b0', T: '#e0a050', t: '#b8742e', W: '#fff4e2' }
const CAKE = [
  '....F.F.F....',
  '....W.W.W....',
  '.PPPPPPPPPPP.',
  '.PwPwPwPwPwP.',
  '.CCCCCCCCCCC.',
  '.CCCCCCCCCCC.',
  'SSSSSSSSSSSSS',
]
const CAKE_C = { F: GOLD, W: '#fff4e2', P: PINK, w: '#ffd6e4', C: '#fff4e2', S: '#c9c9d8' }

// a scrapbook spread: little polaroids appearing one by one
function scrapbook(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 300)
  x.fillStyle = '#c24a6a'; x.fillRect(-182, -142, 364, 284)
  x.fillStyle = '#fff4e2'; x.fillRect(-170, -130, 166, 260); x.fillRect(4, -130, 166, 260)
  const n = Math.floor(clamp((lt - 0.3) / 1.3) * 4 + 0.001)
  const SP = [[-88, -60, -0.08], [-88, 60, 0.06], [88, -60, 0.05], [88, 60, -0.06]]
  for (let i = 0; i < Math.min(4, n + 1); i++) {
    const [a, b, r] = SP[i]
    x.save(); x.translate(a, b); x.rotate(r)
    x.fillStyle = INK; x.fillRect(-58, -52, 116, 104); x.fillStyle = '#fff'; x.fillRect(-54, -48, 108, 96); x.fillStyle = ['#ffd6e4', '#d8f0ff', '#fff1b0', '#d3f5e0'][i]; x.fillRect(-46, -40, 92, 64)
    x.fillStyle = PINK; x.font = `700 16px ${MONO}`; x.textAlign = 'center'; x.fillText(`day ${i * 2 + 1}`, 0, 38)
    x.restore()
  }
  x.restore()
}
// a phone thread: grey bubbles stacking up
function chat(x, cx, cy, k, lines, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k * 1.25, k * 1.25)
  x.fillStyle = INK; x.fillRect(-150, -226, 300, 452)
  x.fillStyle = '#2a2350'; x.fillRect(-140, -216, 280, 432)
  x.fillStyle = '#140c30'; x.fillRect(-126, -186, 252, 372)
  x.font = `700 24px ${INTER}`; x.textBaseline = 'middle'
  lines.slice(0, n).forEach((l, i) => {
    const w = x.measureText(l.t).width + 28, me = l.me, bx = me ? 110 - w : -110
    x.fillStyle = me ? SKYB : '#e8eaf6'; x.fillRect(bx, -160 + i * 64, w, 46)
    x.fillStyle = INK; x.textAlign = 'left'; x.fillText(l.t, bx + 14, -137 + i * 64)
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'cancer', cap: 'Date two: | they *cooked for six.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, POT, { K: '#3d3566', G: '#9aa5c4', g: '#6c7f8f' }, 790, 680, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 6; i++) drawBits(x, PLATE, { W: '#fff4e2', O: ORANGE, Y: GOLD }, 670 + (i % 3) * 120, 870 + Math.floor(i / 3) * 110, 12 * pop01(t, P.t0 + 0.4 + i * 0.15, 0.3, 2))
      label(x, 790, 1130, 'GUESTS: 2', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: '“I’m a bit cold.” | *Three blankets.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BLANKET, { A: [PINK, BLUE, GOLD][i], a: '#fff4e2' }, 790, 1010 - i * 110, 22 * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2), { rot: (i - 1) * 0.06 })
      bubble(x, 790, 640, 'and tea!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Made a scrapbook. | *Of week one.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      scrapbook(x, t, 770, 840, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 770, 1080, 'VOL. 1 OF MANY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Met your friends. | Now *texts them more.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'heart', star: { x: -180 },
    front(x, t, lt, P) {
      chat(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), [{ t: 'hi bestie!!' }, { t: 'soup recipe?' }, { t: 'lunch sunday?' }, { t: 'miss u guys' }, { t: '(your friends)', me: true }], Math.floor(lt * 2.4) + 1)
    } },
  { sign: 'cancer', cap: 'One slightly sad text. | *Already at your door.*', mood: 'heart', star: { x: -200 }, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, DOOR, { B: '#9a6a4a', b: '#7a4a2e', Y: GOLD }, 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 640, 'knock knock', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1130, '0:04 LATER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Love language: | *snacks in your bag.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BAG, { K: '#5a2e1a', B: '#c97a4a', b: '#a05a2e' }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const COL = [{ O: ORANGE, Y: GOLD }, { P: PINK, W: '#fff4e2' }, { C: '#d9a05a', d: '#6b3a1e' }]
      for (let i = 0; i < 5; i++) { const pop = ease.outCubic(prog(lt, 0.6 + i * 0.2, 1.0 + i * 0.2)); if (pop > 0) drawBits(x, SNACKS[i % 3], COL[i % 3], 690 + i * 50, 880 - pop * (150 + (i % 2) * 70), 14, { rot: (i - 2) * 0.2 }) }
      label(x, 790, 1140, 'FOUND: 11', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Your mom loves them. | *More than you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 900, 210 * k, { mood: 'heart', look: [-1, 0], seed: 26, glyph: false })
      label(x, 820, 1150, 'YOUR MOM', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 620, 'my favourite!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
      hearts(x, t, 820, 800, P.t0 + 1.0, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'cancer', cap: 'Shell mode for a day. | Back *with pancakes.*', mood: lt => lt > 1.1 ? 'heart' : 'sleepy', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PANCAKES, PANCAKES_C, 790, 900, 22 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 660, lt < 1.1 ? 'DO NOT DISTURB' : 'OPEN AGAIN', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 32, bg: lt < 1.1 ? LAV : GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.4, 7, 170, 0.3)
    } },
  { sign: 'cancer', cap: 'Anniversary? | *Every month.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, `MONTH ${Math.min(9, 1 + Math.floor(lt * 4))}!`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3t057', key: 'D', accent: BLUE, solo: 'cancer', ending: 'lesson',
  title: 'Dating a Cancer | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'All heart. | *Every day.*', mood: 'heart' },
  lesson: { text: 'Let a Cancer care for you. | *Then care back.*', chip: 'STATUS: COSY' },
  last: {
    text: 'Month fourteen: | *still celebrating.*',
    draw(x, t, lt) { drawBits(x, CAKE, CAKE_C, 830, 1160, 20 * pop01(t, t - lt + 0.7, 0.3, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
