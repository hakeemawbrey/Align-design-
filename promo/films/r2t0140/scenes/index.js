// r2t0140: THE SIGNS AS… v3, "The signs on | Valentine's Day." (~63 s vertical, signs3kit social cut, lofi · F). Ending: 'card'.
//   0.0–3.6    "The signs on | *Valentine's Day.*"
//   3.6–49.2   ♈ gave the gift on February 1st · ♉ booked dinner in November · ♊ texted the whole group chat
//              · ♋ a 400-page scrapbook · ♌ sent themself roses · ♍ the gift came with a manual
//              · ♎ changed outfits eleven times · ♏ already knew what you got them · ♐ surprise road trip, leaving now
//              · ♑ romance scheduled 7:00–7:45 · ♒ threw a party for the single friends · ♓ wrote a love song, sang it sobbing
//  49.2        "Twelve ways | to say *I love you.*"
//  52.4        LESSON: "Love your way. | It's *enough.*"  STATUS: LOVED
//  58.3        "Capricorn booked | *a second song.*" over the match card: Pisces + Capricorn (the song and the schedule).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ROSE = '#ff4f86', WOOD = '#8a4a2e', GREEN = '#5fd068'

function sheet(x, cx, cy, w, h, k, { rot = 0, bg = BONE, head = null, headBg = RED, headInk = '#fff4e2', headSize = 30 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) {
    x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60)
    x.fillStyle = headInk; x.font = `800 ${headSize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 32)
  }
  return true
}
const GIFT = ['...R.R...', '....R....', 'PPPPRPPPP', 'PPPPRPPPP', 'RRRRRRRRR', 'PPPPRPPPP', 'PPPPRPPPP', 'PPPPRPPPP']
const ROSES = ['.R.R.R.', 'RRRRRRR', '.RRRRR.', '..GGG..', '..GGG..', '...G...', '..PPP..', '.PPPPP.']
const BOOK = ['KKKKKKKKKK', 'KPPPPPPPPW', 'KPHPPPPPPW', 'KPPPPPPHPW', 'KPPPPPPPPW', 'KKKKKKKKKK']
const SHIRT = ['TTT.....TTT', 'TTTTT.TTTTT', 'TTTTTTTTTTT', '..TTTTTTT..', '..TTTTTTT..', '..TTTTTTT..']
const CAR = ['...KKKKK....', '..KSSKSSK...', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', '.KK......KK.', '.KK......KK.']
const GUITAR = ['......KK', '.....KK.', '....KK..', '.YYKK...', 'YYYYY...', 'YYKYY...', 'YYYYY...', '.YYY....']

const CAMEOS = [
  { sign: 'aries', cap: 'Gave the gift | on *February 1st.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, GIFT, { R: GOLD, P: ROSE }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 650, 'FEB 1: TOO EXCITED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
      bubble(x, 790, 1080, 'open it NOW', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Booked the dinner | *in November.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 830, 280, 280, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#fff4e2', head: 'RESERVED', headBg: ROSE })) {
        x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FEB 14', 0, -10); x.font = `700 26px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('booked: Nov 2', 0, 50)
        x.restore()
      }
      label(x, 790, 1060, 'BREADSTICKS: UNLIMITED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Texted “love you!” | to *the group chat.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'love you!!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 820, 'SENT TO: 14 PEOPLE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1010, 'love you too??', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Made a scrapbook. | *400 pages.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 5; i++) drawBits(x, BOOK, { K: INK, P: PINK, H: ROSE, W: '#fff4e2' }, 790 + (i % 2 ? 8 : -8), 1040 - i * 70, 22 * k * clamp((lt - 0.2 - i * 0.2) * 4))
      label(x, 790, 650, 'VOLUME 5 OF 5', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#3fb6f0', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Sent themself | *roses.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ROSES, { R: ROSE, G: GREEN, P: '#fff4e2' }, 790, 860, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1070, 'FROM: ME · TO: ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'The gift came | with *a manual.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GIFT, { R: GOLD, P: '#ef5c94' }, 700, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (sheet(x, 840, 780, 220, 280, pop01(t, P.t0 + 0.7, 0.3, 2), { rot: 0.06, bg: '#fff4e2', head: 'HOW TO HUG', headBg: INK, headInk: '#ef5c94', headSize: 24 })) {
        x.fillStyle = '#b9b0a0'; for (let j = 0; j < 5; j++) x.fillRect(-80, -60 + j * 34, 160 - (j % 2) * 40, 14)
        x.restore()
      }
      label(x, 790, 1100, 'STEP 1 OF 12', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Changed outfits | *eleven times.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', star: { x: -170 },
    front(x, t, lt, P, F) {
      const n = 1 + Math.min(10, Math.floor(clamp((lt - 0.2) / 1.6) * 11))
      const C = [ROSE, PINK, RED, LAV, GOLD, MINT, SKYB, '#e163d6', ROSE, '#ffb34a', RED]
      drawBits(x, SHIRT, { T: C[n - 1] }, F.x, F.cy + 100, 10)
      label(x, 790, 820, `OUTFIT #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 42, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1000, 'or the red?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Already knew | what *you got them.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GIFT, { R: GOLD, P: '#e23d66' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'is it a scarf?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 1100, 'IT WAS A SCARF.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Surprise road trip. | Leaving *right now.*', mood: 'sparkle', star: { x: -200 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.3, 1.4))
      drawBits(x, CAR, { K: INK, S: SKYB, R: '#a35cf0' }, lerp(1000, 760, p) + Math.sin(t * 20) * 2, 960, 30)
      label(x, 780, 700, 'PACK IN 5 MIN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 780, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'capricorn', cap: 'Scheduled the romance. | *7:00 to 7:45.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 850, 320, 360, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.03, bg: '#fff4e2', head: 'FEB 14', headBg: '#2fc79a', headInk: INK })) {
        const R = [['6:00', 'WORK', '#d8d0bf'], ['7:00', 'ROMANCE', PINK], ['7:45', 'WORK', '#d8d0bf']]
        R.forEach(([h, s, c], j) => { if (lt < 0.4 + j * 0.3) return; x.fillStyle = c; x.fillRect(-140, -90 + j * 80, 280, 60); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(h, -126, -60 + j * 80); x.font = `800 28px ${INTER}`; x.fillText(s, -30, -60 + j * 80) })
        x.restore()
      }
      label(x, 790, 1100, 'ON TIME. ROMANTIC.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Threw a party | for *the single friends.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      ;['aries', 'gemini', 'sagittarius', 'virgo'].forEach((id, i) => { const k = pop01(t, P.t0 + 0.4 + i * 0.2, 0.3, 2); if (k > 0.01) signChar(x, t, id, 660 + (i % 2) * 180, 760 + Math.floor(i / 2) * 230, 150 * k, { mood: 'happy', seed: 30 + i, glyph: false, glow: 0.7, hops: [P.t0 + 1.2 + i * 0.1] }) })
      label(x, 750, 1120, 'GUEST LIST: EVERYONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: '#38c4ec', rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'Wrote a love song. | Sang it *sobbing.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, GUITAR, { K: WOOD, Y: GOLD }, F.x + 140, F.cy + 60, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      notes(x, t, 800, 900, { n: 5, cell: 8, col: PINK, seed: 1, alpha: clamp(lt - 0.4) })
      label(x, 790, 650, 'VERSE 9', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0140', key: 'F', accent: ROSE, ending: 'card',
  title: 'The signs on | *Valentine\'s Day.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'capricorn', chip: 'ALIGNED' },
  group: { cap: 'Twelve ways | to say *I love you.*' },
  lesson: { text: 'Love your way. | It\'s *enough.*', chip: 'STATUS: LOVED' },
  last: {
    text: 'Capricorn booked | *a second song.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
