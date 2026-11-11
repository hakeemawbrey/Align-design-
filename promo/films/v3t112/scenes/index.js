// v3t112: THE SIGNS AS… v3, "The signs at | a baby shower." (~57 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "The signs at | a *baby shower.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one baby shower per sign (3.8 s each), each pushed to the extreme:
//              ♈ opened the gifts (not theirs) · ♉ ate the reveal cake, still doesn't know · ♊ pitched forty names
//              · ♋ asked to hold the baby (it's not born) · ♌ wrapped the gift in their own face · ♍ a binder for ages 0–18
//              · ♎ pink or blue? wore both · ♏ guessed the name before the parents · ♐ showed up late, by canoe
//              · ♑ gift: a piggy bank college fund · ♒ got the baby a space helmet · ♓ saw tiny socks, never recovered
//  49.2        "Best party. | *No guest of honour.*"  The twelve fly up into a group photo.
//  52.6        callback: "It's Theo. | *Scorpio knew.*"  (the name card, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', BLUE = '#6fc3ff'

const GIFT = [
  '...R..R...',
  '....RR....',
  'BBBBRRBBBB',
  'BBBBRRBBBB',
  'RRRRRRRRRR',
  'BBBBRRBBBB',
  'BBBBRRBBBB',
  'BBBBRRBBBB',
]
const CAKE = [
  '....F.F....',
  '....Y.Y....',
  '.PPPPPPPPP.',
  'PWPWPWPWPWP',
  'CCCCCCCCCCC',
  'PPPPPPPPPPP',
  'CCCCCCCCCCC',
]
const CAKE_C = { F: '#ffb34a', Y: '#fff1b0', P: PINK, W: '#fff4e2', C: '#c98a5a' }
const CRUMBS = ['W.....W...', '..W.W....W', '.W....W.W.', 'WWWWWWWWWW']
const BINDER = [
  'KKKKKKKKKKKK',
  'KWWWWWWWWWWK',
  'KWWWWWWWWWWK',
  'KWWWWWWWWWWK',
  'KWWWWWWWWWWK',
  'KWWWWWWWWWWK',
  'KWWWWWWWWWWK',
  'KWWWWWWWWWWK',
  'KWWWWWWWWWWK',
  'KWWWWWWWWWWK',
  'KKKKKKKKKKKK',
]
const BALLOON = ['.BBB.', 'BBBBB', 'BWBBB', 'BBBBB', '.BBB.', '..B..', '..S..', '..S..', '..S..', '..S..']
const CANOE = [
  'B..............B',
  'BB............BB',
  '.BBBBBBBBBBBBBB.',
  '..BBBBBBBBBBBB..',
]
const PIG = [
  '..PP......',
  '.PPPPPPPP.',
  'PPPPKKPPPP',
  'PPPPPPPPNN',
  'PPKPPPPPNN',
  'PPPPPPPPP.',
  '.PPPPPPPP.',
  '.P.P..P.P.',
]
const PIG_C = { P: '#ff9fbf', K: INK, N: '#ff6f9a' }
const COIN = ['.GGG.', 'GGYGG', 'GYGGG', 'GGGGG', '.GGG.']
const HELMET = [
  '...WWWWWW...',
  '.WWWWWWWWWW.',
  'WWSSSSSSSSWW',
  'WSSSSSSSSSSW',
  'WSSWSSSSSSSW',
  'WSSSSSSSSSSW',
  'WWSSSSSSSSWW',
  'RWWWWWWWWWWR',
  'RRRRRRRRRRRR',
]
const HELMET_C = { W: '#e8ecf6', S: '#6fc3ff', R: RED }
const SOCK = ['.SSS', '.SSS', '.SSS', '.SSS', 'SSSS', 'SSSS', 'SSS.']

const CAMEOS = [
  { sign: 'aries', cap: 'Opened all the gifts. | *Not theirs.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const open = lt > 0.5 + i * 0.4
        const k = pop01(t, P.t0 + 0.15 + i * 0.12, 0.3, 2)
        drawBits(x, GIFT, { B: [SKYB, MINT, LAV][i], R: [PINK, GOLD, RED][i] }, 670 + i * 110, 1060 - (i % 2) * 40, 13 * k, { alpha: open ? 0.35 : 1, rot: open ? 0.2 : 0 })
        if (open) drawBits(x, ['W.W.W', '.W.W.', 'W.W.W'], { W: [PINK, GOLD, RED][i] }, 670 + i * 110, 960, 10)
      }
      label(x, 790, 680, 'TO: THE BABY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 840, 'oops. all of them', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Ate the reveal cake. | Still *doesn’t know.*', mood: lt => lt > 1.5 ? 'sleepy' : 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const gone = prog(lt, 0.6, 1.3)
      drawBits(x, CAKE, CAKE_C, 790, 980, 20 * k, { alpha: 1 - gone })
      if (gone > 0) drawBits(x, CRUMBS, { W: '#c98a5a' }, 790, 1060, 14, { alpha: gone })
      label(x, 790, 700, 'IT’S A… ?', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 44, bg: PINK, rot: -0.05 })
      bubble(x, 790, 850, 'it was | delicious', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Pitched forty names. | *Still going.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const N = ['Juniper?', 'Toast?', 'Comet?', 'Gerald?', 'Pickle?', 'Gerald 2?']
      const n = Math.min(N.length - 1, Math.floor(Math.max(0, lt - 0.3) / 0.33))
      bubble(x, 780, 700, N[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 900, `NAME #${n + 35}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Asked to hold the baby. | *It’s not born.*', mood: lt => lt > 1.4 ? 'wide' : 'heart', star: { x: -150 }, hops: [0.8],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'my turn?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 860, 'DUE: IN MARCH', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'I’ll wait here', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Wrapped the gift | in *their own face.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300)
        x.fillStyle = '#ffd7a0'; x.fillRect(-150, -140, 300, 280)
        x.restore()
        for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) signChar(x, t, 'leo', 790 + (i - 1) * 96 * k, 840 + j * 120 * k, 82 * k, { mood: 'wink', seed: 30 + i + j * 3, glyph: false, glow: 0.4 })
        x.fillStyle = RED; x.fillRect(790 - 12 * k, 900 - 140 * k, 24 * k, 280 * k)
        drawBits(x, ['R..R', '.RR.', 'R..R'], { R: RED }, 790, 900 - 150 * k, 14 * k)
      }
      label(x, 790, 620, 'FROM: GUESS WHO', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: '#ffb34a', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Brought a binder: | *ages 0 to 18.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BINDER, { K: '#2fc79a', W: '#fff4e2' }, 790, 880, 26 * k, { rot: 0.04 })
      if (k > 0.9) {
        const TABS = ['NAPS', 'TEETH', 'BIRTH CHART', 'COLLEGE']
        x.save(); x.translate(790, 880); x.rotate(0.04)
        x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        TABS.forEach((s, i) => { if (lt > 0.4 + i * 0.3) { x.fillStyle = [PINK, SKYB, GOLD, LAV][i]; x.fillRect(-110, -95 + i * 58, 220, 40); x.fillStyle = INK; x.fillText(s, 0, -75 + i * 58) } })
        x.restore()
      }
      label(x, 790, 1130, 'VOL. 1 OF 6', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Pink or blue? | Wore *both.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -150, y: 20 },
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, ['PPPPPBBBBB', 'PPPPPBBBBB'], { P: PINK, B: BLUE }, F.x, F.cy + 120, 22 * k)
    },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, ['PP...BB', 'PPP.BBB', 'PPPKBBB', 'PPP.BBB', 'PP...BB'], { P: PINK, B: BLUE, K: INK }, F.x, F.top - 30, 14 * k)
      drawBits(x, BALLOON, { B: PINK, W: '#fff', S: BONE }, 720, 740 + 10 * Math.sin(t * 2), 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      drawBits(x, BALLOON, { B: BLUE, W: '#fff', S: BONE }, 860, 760 + 10 * Math.sin(t * 2 + 1), 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 1060, 'TEAM: BOTH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'scorpio', cap: 'Guessed the name. | *Before the parents.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'it’s Theo.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 48, col: LAV, tail: 'bl' })
      label(x, 790, 860, 'PARENTS: ???', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1010, 'SOURCE: THE CHART', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Showed up late. | *By canoe.*', mood: 'sparkle', star: { x: 120, y: -40 }, hops: [0.6],
    back(x, t, lt, P) {
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      x.fillStyle = 'rgba(111,195,255,0.35)'
      for (let i = 0; i < 9; i++) x.fillRect(110 + i * 100 + ((t * 60) % 100), 1080 + (i % 2) * 14, 70, 12)
      x.restore()
    },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      drawBits(x, CANOE, { B: BROWN }, F.x, F.cy + 130, 24 * k)
      x.fillStyle = BROWN; x.fillRect(F.x + 120, F.cy - 40 + 20 * Math.sin(t * 4), 12, 200)
      label(x, 320, 700, 'ETA: 3 HRS AGO', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 32, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 320, 880, 'traffic!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Gift: a college fund. | *Already growing.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, PIG, PIG_C, 790, 960, 24 * k)
      for (let i = 0; i < 4; i++) { const p = prog(lt, 0.5 + i * 0.3, 0.8 + i * 0.3); if (p > 0 && p < 1) drawBits(x, COIN, { G: GOLD, Y: '#fff1b0' }, 760 + i * 10, lerp(600, 860, ease.inQuad(p)), 9) }
      label(x, 790, 1160, 'COLLEGE: FUNDED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Got the baby | *a space helmet.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, HELMET, HELMET_C, 790, 880, 22 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.05 })
      label(x, 790, 650, 'SIZE: NEWBORN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'just in case', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 790, 880, P.t0 + 0.7, 6, 170, 0.2)
    } },
  { sign: 'pisces', cap: 'Saw the tiny socks. | *Never recovered.*', mood: lt => lt < 0.8 ? 'sparkle' : 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SOCK, { S: PINK }, 750, 880, 18 * k, { rot: -0.1 })
      drawBits(x, SOCK, { S: SKYB }, 850, 900, 18 * k, { rot: 0.1 })
      label(x, 790, 1060, 'THEY’RE SO SMALL', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 800, 780, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t112', key: 'D', accent: '#ff9fbf', ending: 'callback',
  title: 'The signs at | a *baby shower.*',
  cameos: CAMEOS,
  group: { cap: 'Best party. | *No guest of honour.*' },
  last: {
    text: 'It’s Theo. | *Scorpio knew.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'scorpio', 540, 1020, 300 * k, { mood: lt > 1.4 ? 'wink' : 'neutral', seed: 9, hops: [t - lt + 1.5] })
      label(x, 540, 1300, 'IT’S A BOY: THEO', pop01(t, t - lt + 1.1, 0.3, 2.2), { size: 44, bg: BLUE, rot: -0.04 })
      sparkles(x, t, 540, 1020, t - lt + 1.2, 8, 220, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
