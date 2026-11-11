// v3t116: THE SIGNS AS… v3, "The signs build | furniture." (~57 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "The signs build | *furniture.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one build per sign (3.8 s each), pushed to the extreme:
//              ♈ tossed the manual, built a mystery · ♉ built the couch, hasn't left it since · ♊ built it twice, wrong both times
//              · ♋ built a crib, for the cat · ♌ built a throne (it's a stool) · ♍ found a typo in the manual
//              · ♎ picked a spot, moved it nine times · ♏ one screw missing: opened an investigation
//              · ♐ bored at step two, went hiking · ♑ finished in an hour, billed you for labour
//              · ♒ twelve leftover screws, called it modern · ♓ the box said "easy", sobbing at step one
//  49.2        "Built together. | *Barely standing.*"  The twelve fly up into a group photo.
//  52.6        callback: "Day 41. | Taurus *still there.*"  (the couch, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', WOOD = '#d9a066', ACC = '#d9a066'

const MYSTERY = [
  'WWWW....WW',
  'W..W...WW.',
  'WWWWWWWWW.',
  '...W..W...',
  '..WW..WWW.',
  '..W....W..',
]
const COUCH = [
  'GG............GG',
  'GGGGGGGGGGGGGGGG',
  'GGggggggggggggGG',
  'GGggggggggggggGG',
  'GGGGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGGGG',
  '.B............B.',
]
const COUCH_C = { G: '#5fd068', g: '#8fe08a', B: BROWN }
const CRIB = [
  'W..............W',
  'WWWWWWWWWWWWWWWW',
  'W.W.W.W.W.W.W.WW',
  'W.W.W.W.W.W.W.WW',
  'W.W.W.W.W.W.W.WW',
  'WWWWWWWWWWWWWWWW',
  'W..............W',
]
const CAT = ['K...K.', 'KK.KK.', 'KKKKK.', 'KYKYK.', 'KKKKKK', '.KKKKK']
const STOOL = ['.WWWWWW.', 'WWWWWWWW', '.W....W.', '.W....W.', '.W....W.']
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY']
const SCREW = ['SSS', '.S.', '.S.', '.S.']
const LENS = ['.KKKK.', 'KWWWWK', 'KWWWWK', 'KWWWWK', 'KWWWWK', '.KKKK.', '.....K', '......K']
const BOOT = ['.BBB..', '.BBB..', '.BBB..', '.BBBBB', 'BBBBBB', 'KKKKKK']
const SHELF = ['WWWWWWWWWWWW', 'W..........W', 'WWWWWWWWWWWW', 'W..........W', 'WWWWWWWWWWWW', 'W..........W', 'WWWWWWWWWWWW']
const BOX = [
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBWWWWWWWWBB',
  'BBWWWWWWWWBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
]

function manual(x, cx, cy, k, lt, circ) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = '#fff4e2'; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('STEP 4', 0, -140)
  x.font = `700 26px ${MONO}`; x.fillText('attach the', 0, -60); x.fillText('shlef', 0, -20)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-100, 40 + i * 34, 200 - (i % 2) * 50, 12)
  if (circ > 0) { x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(0, -20, 80, 34, 0, 0, Math.PI * 2 * circ); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Tossed the manual. | Built *a mystery.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      const p = prog(lt, 0.2, 0.8)
      if (p > 0 && p < 1) drawBits(x, ['WWWW', 'WKKW', 'WWWW', 'WKKW', 'WWWW'], { W: '#fff4e2', K: '#b9b0a0' }, lerp(500, 980, p), 700 - 200 * Math.sin(Math.PI * p), 12, { rot: p * 8 })
      drawBits(x, MYSTERY, { W: WOOD }, 790, 940, 24 * pop01(t, P.t0 + 0.9, 0.35, 2), { rot: 0.1 })
      label(x, 790, 700, 'IT WAS A DESK?', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Built the couch. | *Hasn’t left it since.*', mood: 'sleepy', star: { x: -40, y: -30 },
    back(x, t, lt, P) { drawBits(x, COUCH, COUCH_C, 540, 1010, 32 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 620, 'DAY 9', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
      bubble(x, 300, 620, 'step 2: nap', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'gemini', cap: 'Built it twice. | Wrong *both times.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SHELF, { W: WOOD }, 720, 920, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.PI / 2 })
      drawBits(x, SHELF, { W: WOOD }, 870, 920, 16 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: Math.PI })
      label(x, 720, 700, 'V1: SIDEWAYS', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 26, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 860, 1110, 'V2: UPSIDE DOWN', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 26, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Built a crib. | *For the cat.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CRIB, { W: '#fff4e2' }, 790, 950, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAT, { K: '#9aa5c4', Y: GOLD }, 790, 930, 14 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 720, 'NURSERY: CAT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 880, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Built a throne. | *It’s a stool.*', mood: 'sparkle', star: { x: -100, y: -60, s: 260 }, hops: [1.0],
    back(x, t, lt, P, F) { drawBits(x, STOOL, { W: WOOD }, F.x, 1100, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, { Y: GOLD, R: RED, B: SKYB }, F.x, F.top - 20, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 720, 'THRONE*', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: ORANGE, rot: 0.05 })
      label(x, 790, 860, '*STOOL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Found a typo | *in the manual.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      manual(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt, clamp((lt - 0.8) / 0.5))
      label(x, 790, 1120, 'EMAILED THE COMPANY', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 26, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picked a spot. | Moved it *nine times.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const pos = [[720, 960], [880, 960], [800, 860], [720, 1040], [880, 1040]]
      const i = Math.floor(lt * 2.5) % pos.length
      drawBits(x, SHELF, { W: WOOD }, pos[i][0], pos[i][1], 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1150, `MOVE #${Math.min(9, Math.floor(lt * 2.5) + 1)}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'is this spot | compatible?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'One screw missing. | *Opened an investigation.*', mood: 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LENS, { K: INK, W: SKYB }, 790 + 40 * Math.sin(t * 2), 900 + 20 * Math.cos(t * 3), 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 660, 'CASE #1: THE SCREW', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1120, 'SUSPECTS: ALL OF YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 26, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Bored at step two. | *Went hiking.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, BOX, { B: WOOD, W: '#fff4e2' }, 330, 1020, 18 * pop01(t, P.t0 + 0.1, 0.3, 2))
      label(x, 330, 960, 'STEP 2 OF 40', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, BOOT, { B: BROWN, K: INK }, 330, 740, 16 * pop01(t, P.t0 + 1.0, 0.3, 2))
      bubble(x, 330, 600, 'back by May!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Done in an hour. | *Billed you for labour.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = '#fff4e2'; x.fillRect(-142, -162, 284, 324)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVOICE', 0, -120)
        x.font = `700 22px ${MONO}`; x.textAlign = 'left'
        ;['LABOUR    1 HR', 'EXPERTISE  YES', 'SNACKS     2'].forEach((s, i) => { if (lt > 0.8 + i * 0.25) x.fillText(s, -120, -60 + i * 44) })
        x.fillStyle = '#2fc79a'; x.fillRect(-120, 90, 240, 46); x.fillStyle = INK; x.textAlign = 'center'; x.font = `800 26px ${INTER}`; x.fillText('DUE: FRIDAY', 0, 114)
        x.restore()
      }
    } },
  { sign: 'aquarius', cap: 'Twelve screws left over. | Called it *modern.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 12; i++) drawBits(x, SCREW, { S: '#c9c9d8' }, 690 + (i % 6) * 40, 1080 + Math.floor(i / 6) * 50, 9 * pop01(t, P.t0 + 0.2 + i * 0.05, 0.3, 2), { rot: i * 0.7 })
      drawBits(x, SHELF, { W: WOOD }, 790, 820, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.35 })
      label(x, 790, 640, 'DESIGN CHOICE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The box said “easy.” | *Sobbing at step one.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, { B: WOOD, W: '#fff4e2' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 860, 'EASY!', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.05 })
      label(x, 790, 1120, 'STEP 1 OF 112', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t116', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs build | *furniture.*',
  cameos: CAMEOS,
  group: { cap: 'Built together. | *Barely standing.*' },
  last: {
    text: 'Day 41. | Taurus *still there.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      drawBits(x, COUCH, COUCH_C, 540, 1110, 40 * k)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1000, 260 * k, { mood: 'sleepy', seed: 5 })
      label(x, 540, 1330, 'COUCH: CLAIMED', pop01(t, t - lt + 1.3, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
