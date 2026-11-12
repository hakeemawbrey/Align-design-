// r2t0364: star_talk, ROLL CALL (twelve signs), "The signs | at a lighthouse." (~56 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme version of itself on a lighthouse trip. Ending: callback.
//   ♈ raced up all 200 steps · ♉ came for the view, stayed for the snacks · ♊ asked the keeper forty questions
//   · ♋ adopted the lighthouse cat · ♌ stood in the beam · ♍ cleaned the lens, unprompted · ♎ 300 photos for one angle
//   · ♏ found the secret room · ♐ waved at a ship, now boarding it · ♑ asked about the keeper's salary
//   · ♒ bonded with the seagulls · ♓ saw the light, cried beautifully
//  49.2  "One lighthouse. | *Twelve problems.*"
//  52.6  callback: "Leo won't | *leave the beam.*" (Leo comes back, lit up)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const ACC = '#ffe08a', GREY = '#9aa5c4', RED = '#ff6b5a'
const M = { font: MONO, weight: 700 }
const ST = { x: -170 }
const txt = (x, s, X, Y, font, col, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const TOWER = [
  '....YYY....',
  '...KYYYK...',
  '..KKKKKKK..',
  '...RRRRR...',
  '...WWWWW...',
  '...RRRRR...',
  '..WWWWWWW..',
  '..RRRRRRR..',
  '..WWWWWWW..',
  '.RRRRRRRRR.',
  '.WWWWWWWWW.',
  'GGGGGGGGGGG',
]
const TOWER_C = { Y: '#fff1a8', K: INK, R: RED, W: BONE, G: '#6b7591' }
const BASKET = [
  '..K.......K..',
  '...K.....K...',
  '....KKKKK....',
  'BBBBBBBBBBBBB',
  'BbBbBbBbBbBbB',
  'BBBBBBBBBBBBB',
  '.BbBbBbBbBbB.',
  '..BBBBBBBBB..',
]
const CAT = [
  'O.......O',
  'OO.....OO',
  'OOOOOOOOO',
  'OKOOOOOKO',
  'OOOOPOOOO',
  '.OOOOOOO.',
  '..OOOOO..',
  '.OOOOOOO.',
  'OOOOOOOOO',
  'OOOOOOOOOT',
  '.OO...OO.T',
]
const CAT_C = { O: '#ffb34a', K: INK, P: PINK, T: '#ffb34a' }
const CAMERA = [
  '...KKKK......',
  'KKKKKKKKKKKKK',
  'KGGGGKKKGGGGK',
  'KGGGKWWWKGGGK',
  'KGGKWBBBWKGGK',
  'KGGKWBBBWKGGK',
  'KGGGKWWWKGGGK',
  'KGGGGKKKGGGGK',
  'KKKKKKKKKKKKK',
]
const CAMERA_C = { K: INK, G: GREY, W: BONE, B: '#3a3260' }
const DOOR = [
  'KKKKKKKKK',
  'KBBBBBBBK',
  'KBbBBBbBK',
  'KBbBBBbBK',
  'KBBBBBBBK',
  'KBBBBBYBK',
  'KBbBBBbBK',
  'KBbBBBbBK',
  'KBBBBBBBK',
  'KKKKKKKKK',
]
const SHIP = [
  '.......W.......',
  '......WW.......',
  '.....WWW.......',
  '....WWWW.......',
  '...WWWWW.......',
  '.......K.......',
  'RRRRRRRRRRRRRRR',
  '.RRRRRRRRRRRRR.',
  '..BBBBBBBBBBB..',
]
const SHIP_C = { W: BONE, K: INK, R: RED, B: '#3a3260' }
const GULL = ['WW.....WW', '.WW...WW.', '..WWWWW..', '...WYW...']

/** a warm cone of lighthouse light sweeping onto (tx, ty) */
function beam(x, ox, oy, tx, ty, k, w = 170) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.55 * k
  const g = x.createLinearGradient(ox, oy, tx, ty)
  g.addColorStop(0, 'rgba(255,241,168,0.9)'); g.addColorStop(1, 'rgba(255,241,168,0.15)')
  const ang = Math.atan2(ty - oy, tx - ox) + Math.PI / 2
  x.fillStyle = g; x.beginPath(); x.moveTo(ox, oy)
  x.lineTo(tx + Math.cos(ang) * w, ty + Math.sin(ang) * w); x.lineTo(tx - Math.cos(ang) * w, ty - Math.sin(ang) * w); x.closePath(); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Raced up | *all 200 steps.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, TOWER, TOWER_C, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(200, Math.round(200 * ease.outCubic(prog(lt, 0.3, 1.3))))
      label(x, 790, 1150, `STEPS: ${n}/200`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: RED, color: BONE, rot: -0.04, ...M })
    } },
  { sign: 'taurus', cap: 'Came for the view. | *Stayed for the snacks.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BASKET, { K: '#8a4a2e', B: '#c98f4a', b: '#8a5a2e' }, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'VIEW: SKIPPED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.05, ...M })
    } },
  { sign: 'gemini', cap: 'Asked the keeper | *forty questions.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(40, 1 + Math.floor(lt * 18))
      bubble(x, 790, 720, `q #${n}: | but why | a light?`, pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, col: BONE, tail: 'bl' })
      label(x, 790, 1060, 'KEEPER: TIRED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'cancer', cap: 'Adopted | *the lighthouse cat.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 2) * 0.04 })
      label(x, 790, 640, 'NAME: MY BABY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.05, ...M })
      hearts(x, t, 560, 1100, P.t0 + 1.1, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Found the beam. | *Never left it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wink', look: [-1, 0], star: { x: 0 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { beam(x, 900, 520, 540, 900, ease.outCubic(prog(lt, 0.2, 0.8))) },
    front(x, t, lt, P) {
      label(x, 790, 1150, 'MAIN CHARACTER ♛', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, ...M })
      sparkles(x, t, 540, 880, P.t0 + 0.9, 7, 200, 0.2, [GOLD, BONE, '#ffb34a'])
    } },
  { sign: 'virgo', cap: 'Cleaned the lens. | *Unprompted.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), clean = ease.outCubic(prog(lt, 0.4, 1.4))
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(0, 0, 138, 0, Math.PI * 2); x.fill()
        x.fillStyle = `rgba(110,100,80,${(0.75 * (1 - clean)).toFixed(3)})`
        for (const [a, b, r] of [[-50, -40, 46], [40, 20, 56], [-20, 60, 40], [60, -60, 30]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
        x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = 10; x.beginPath(); x.arc(0, 0, 100, -2.4, -1.6); x.stroke()
        x.restore()
      }
      label(x, 790, 1120, 'SPOTLESS NOW', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, ...M })
      if (clean >= 1) sparkles(x, t, 790, 870, P.t0 + 1.4, 6, 170, 0.5)
    } },
  { sign: 'libra', cap: 'Took 300 photos. | *One angle.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(300, 1 + Math.floor(lt * 140))
      drawBits(x, CAMERA, CAMERA_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (Math.floor(t * 6) % 2 === 0 && lt < 2) { x.save(); x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(790, 880, 160, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 660, `PHOTO ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: PINK, rot: 0.04, ...M })
      label(x, 790, 1110, 'PROFILE PIC: FOUND', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'scorpio', cap: 'Found | *the secret room.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, B: '#5a3a8a', b: '#3e2766', Y: GOLD }, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'STAFF ONLY', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: RED, color: BONE, rot: -0.05, ...M })
      label(x, 790, 1140, 'IT’S MOPS. THRILLED.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 26, bg: LAV, rot: 0.04, ...M })
    } },
  { sign: 'sagittarius', cap: 'Waved at a ship. | *Now aboard it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, SHIP, SHIP_C, 800, 900 + Math.sin(t * 2) * 10, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 650, 'bye!! back | never maybe', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Asked about | *the keeper’s salary.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'dental? | pension? | room for growth?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      label(x, 790, 1040, 'CAREER: CONSIDERED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: '#7fd1c7', rot: -0.04, ...M })
    } },
  { sign: 'aquarius', cap: 'Bonded with | *the seagulls.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2)
        drawBits(x, GULL, { W: BONE, Y: GOLD }, 700 + i * 110, 780 + (i % 2) * 60 + Math.sin(t * 4 + i) * 12, 16 * k)
      }
      bubble(x, 790, 1040, 'they | get me.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 52, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Saw the light. | *Cried. Beautifully.*', mood: 'wide', look: [1, 0], star: ST, tears: 3,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { beam(x, 960, 520, 760 + Math.sin(t * 0.8) * 80, 1000, ease.outCubic(prog(lt, 0.2, 0.8)), 140) },
    front(x, t, lt, P) {
      label(x, 790, 640, 'IT’S JUST SO PRETTY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, ...M })
    } },
]

const F = makeFilm({
  id: 'r2t0364', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs | *at a lighthouse.*',
  cameos: CAMEOS,
  group: { cap: 'One lighthouse. | *Twelve problems.*' },
  last: {
    text: 'Leo won’t | *leave the beam.*',
    draw(x, t, lt) {
      const k = ease.outCubic(prog(lt, 0.3, 0.9))
      beam(x, 900, 560, 540, 1140, k, 200)
      signChar(x, t, 'leo', 540, 1140, 280, { mood: 'sparkle', pop: pop01(t, t - lt + 0.5, 0.4, 1.8), hops: [t - lt + 0.6, t - lt + 2.0], seed: 5 })
      sparkles(x, t, 540, 1120, t - lt + 1.0, 7, 200, 0.3, [GOLD, BONE, '#ffb34a'])
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
