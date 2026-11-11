// v3t101: THE SIGNS AS… v3, SOLO film, "Things only | Capricorns get." (~47 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine situations, each the most extreme (and lovable) Capricorn version. Ending: group.
//   0.0–3.6    "Things only | *Capricorns* get."
//   3.6–37.8   nine cards: day off, nine emails · birthday wish: a good printer · invested in a lemonade stand
//              · vacation photo: on a call · networked the dog at a party · asked their horoscope for a quarterly
//              · dating profile is a résumé · business card at age seven · "I love you", notarised
//  37.8        "Old soul. | *Born boss.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', YEL = '#ffe36a', GREY = '#8a87a8'

const PRINTER = [
  '...WWWWWW...',
  '...WWWWWW...',
  'GGGGGGGGGGGG',
  'GggggggggggG',
  'GGGGGGGGGGMG',
  'GGGGGGGGGGGG',
  'GKKKKKKKKKKG',
  'GGGGGGGGGGGG',
]
const PRINTER_C = { W: '#fff4e2', G: '#c9c9d8', g: '#8a8aa0', M: '#5fd068', K: '#2a2350' }
const CAKE = [
  '.....F.....',
  '.....K.....',
  '.PPPPPPPPP.',
  'PWPWPWPWPWP',
  'PPPPPPPPPPP',
  'CCCCCCCCCCC',
  'CCCCCCCCCCC',
]
const CAKE_C = { F: '#ffb34a', K: INK, P: PINK, W: '#fff4e2', C: '#c98f6a' }
const STAND = [
  'YYYYYYYYYYYYYY',
  'YRYRYRYRYRYRYR',
  'B............B',
  'B............B',
  'B............B',
  'BBBBBBBBBBBBBB',
  'BWWWWWWWWWWWWB',
  'BWWWWWWWWWWWWB',
  'BBBBBBBBBBBBBB',
  'B............B',
]
const STAND_C = { Y: YEL, R: RED, B: BROWN, W: '#fff4e2' }
const DOG = [
  'BB.....BB',
  'BBBBBBBBB',
  'BWBBBBBWB',
  'BBBBKBBBB',
  '.BBBBBBB.',
  '..BBBBB..',
  '.BBBBBBBB',
  '.BB...BB.',
]
const DOG_C = { B: '#c98f6a', W: '#fff4e2', K: INK }
const STAMP = [
  '...KKK...',
  '...KKK...',
  '...KKK...',
  '.RRRRRRR.',
  'RRRRRRRRR',
  'RRRRRRRRR',
]
const STAMP_C = { K: BROWN, R: RED }

// a laptop with an inbox counter that ticks up while an "OUT OF OFFICE" sticker peels off
function laptop(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -110, 312, 240)
  x.fillStyle = INK; x.fillRect(-160, -124, 320, 214)
  x.fillStyle = '#2a2350'; x.fillRect(-150, -114, 300, 194)
  x.fillStyle = '#fff4e2'; x.fillRect(-136, -100, 272, 166)
  const n = Math.floor(clamp((lt - 0.4) / 1.4) * 9 + 0.001)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  for (let i = 0; i < Math.min(n, 4); i++) { x.fillStyle = '#c9c9d8'; x.fillRect(-120, -80 + i * 34, 170, 18); x.fillStyle = '#5fd068'; x.fillRect(64, -80 + i * 34, 44, 18) }
  x.fillStyle = INK; x.fillRect(-190, 90, 380, 26); x.fillStyle = '#c9c9d8'; x.fillRect(-182, 92, 364, 16)
  x.restore()
  return n
}
// a profile card laid out like a CV
function resume(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -182, 300, 380)
  x.fillStyle = INK; x.fillRect(-156, -196, 312, 392)
  x.fillStyle = '#fff4e2'; x.fillRect(-148, -188, 296, 376)
  x.fillStyle = '#2a2350'; x.fillRect(-148, -188, 296, 120)
  signChar(x, t, 'capricorn', -84, -128, 100, { mood: 'neutral', seed: 51, glyph: false, glow: 0.4 })
  x.fillStyle = '#fff4e2'; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('♑︎ CAPRICORN', -26, -140)
  x.font = `700 18px ${MONO}`; x.fillStyle = '#c9a6ff'; x.fillText('seeking: commitment', -26, -106)
  x.fillStyle = INK; x.font = `800 24px ${INTER}`
  const rows = ['EXPERIENCE', 'REFERENCES', 'SKILLS']
  rows.forEach((r, i) => { x.fillText(r, -128, -36 + i * 76); x.fillStyle = '#c9c9d8'; x.fillRect(-128, -14 + i * 76, 250, 12); x.fillRect(-128, 4 + i * 76, 190, 12); x.fillStyle = INK })
  x.restore()
}

const CAMEOS = [
  { sign: 'capricorn', cap: 'A day off. | Answered *nine emails.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const n = laptop(x, 790, 860, k, lt) || 0
      label(x, 790, 640, 'OUT OF OFFICE', pop01(t, P.t0 + 0.35, 0.3, 2) * (1 - ease.inCubic(prog(lt, 0.9, 1.2))), { size: 30, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, `REPLIED: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Birthday wish: | a *good printer.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 1020, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'I wish for…', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (lt < 1.3 ? 1 : 0), { size: 38, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.35, 0.35, 2.2)
      drawBits(x, PRINTER, PRINTER_C, 790, 760, 20 * k)
      sparkles(x, t, 790, 760, P.t0 + 1.4, 7, 170, 0.4)
    } },
  { sign: 'capricorn', cap: 'Kid’s lemonade stand? | Capricorn *invested.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, STAND, STAND_C, 790, 900, 22 * k)
      if (k > 0.9) { x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LEMONADE', 790, 934) }
      label(x, 790, 640, 'TERM SHEET', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1130, '10% STAKE ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: YEL, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Vacation photo: | them *on a call.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = '#8fe3ff'; x.fillRect(130, 520, 820, 330)
      x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(820, 610, 46, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#3aa0d8'; x.fillRect(130, 760, 820, 90)
      x.fillStyle = '#f5d9a0'; x.fillRect(130, 850, 820, 370)
      x.restore()
    },
    front(x, t, lt, P, F) {
      bubble(x, 760, 700, 'circling back | on Q3…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 760, 1110, 'WISH YOU WERE HERE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04 })
      x.fillStyle = INK; x.fillRect(F.x + 120, F.cy - 70, 44, 80); x.fillStyle = '#2a2350'; x.fillRect(F.x + 126, F.cy - 64, 32, 68)
    } },
  { sign: 'capricorn', cap: 'Went to a party. | *Networked* the dog.', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DOG, DOG_C, 800, 990, 22 * k)
      const slide = ease.outCubic(prog(lt, 0.6, 1.1))
      if (lt > 0.55) label(x, lerp(520, 760, slide), lerp(900, 870, slide), 'CARD', 1, { size: 26, bg: BONE, rot: -0.1, font: MONO, weight: 700 })
      bubble(x, 800, 650, 'let’s connect', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 860, 1170, 'woof?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Read their horoscope. | Asked for *a quarterly.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = '#fff4e2'; x.fillRect(-142, -162, 284, 324)
        x.fillStyle = '#2a2350'; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TODAY:', 0, -120)
        x.font = `700 24px ${MONO}`; x.fillText('“good things', 0, -70); x.fillText('are coming”', 0, -36)
        x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(-110, 10); x.lineTo(0, 40); x.lineTo(110, 10); x.stroke()
        x.fillStyle = RED; x.font = `800 24px ${INTER}`; x.fillText('WHEN? HOW MUCH?', 0, 80)
        x.restore()
      }
      label(x, 790, 1120, 'Q3 FORECAST PLS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Their dating profile? | A *résumé.*', mood: 'neutral', star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      resume(x, t, 790, 850, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 1130, 'REFERENCES: 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Age seven. | Had a *business card.*', star: { x: 0, y: 40, s: 200 }, mood: 'neutral', hops: [1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(540, 680); x.rotate(-0.05); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-196, -84, 400, 180)
        x.fillStyle = INK; x.fillRect(-206, -96, 412, 192); x.fillStyle = '#fff4e2'; x.fillRect(-198, -88, 396, 176)
        x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CEO', 0, -30)
        x.font = `700 24px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('(age 7) · serious', 0, 22); x.fillText('inquiries only', 0, 56)
        x.restore()
      }
      label(x, 540, 1130, 'GRADE 2 · ALREADY CEO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Said “I love you.” | Got it *notarised.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.rotate(-0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -120, 300, 240); x.fillStyle = '#fff4e2'; x.fillRect(-142, -112, 284, 224)
        x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('“I love you.”', 0, -40)
        x.fillStyle = '#c9c9d8'; x.fillRect(-100, 30, 200, 6); x.fillStyle = '#6b62a8'; x.font = `700 20px ${MONO}`; x.fillText('signed · witnessed', 0, 64)
        if (lt > 1.3) { x.save(); x.rotate(-0.2); x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-6, -4, 140, 56); x.fillStyle = RED; x.font = `800 26px ${INTER}`; x.fillText('OFFICIAL', 64, 24); x.restore() }
        x.restore()
      }
      const drop = ease.inCubic(prog(lt, 0.9, 1.25)), up = ease.outCubic(prog(lt, 1.3, 1.7))
      if (lt > 0.8) drawBits(x, STAMP, STAMP_C, 850, lerp(lerp(620, 860, drop), 640, up), 14)
      hearts(x, t, 790, 760, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'v3t101', key: 'C', accent: '#2fc79a', solo: 'capricorn', ending: 'group',
  title: 'Things only | *Capricorns* get.',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'virgo', chip: 'ALIGNED' },
  group: { cap: 'Old soul. | *Born boss.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
