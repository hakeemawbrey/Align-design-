// r2t0015: THE SIGNS AS… v3 BE LIKE, "Song on loop? | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order with a song stuck in their head, each the most extreme version of itself. Ending: group.
//   0.0–3.6    "Song on loop? | *Zodiacs be like.*"
//   3.6–49.2   ♈ sang it louder to get it out · ♉ hummed it for three business days · ♊ two songs, mashed them up
//              · ♋ nostalgic for last Tuesday · ♌ performed it in the grocery store · ♍ annotated the lyrics · ♎ can't pick
//              a song to replace it · ♏ silent outside, a concert inside · ♐ bought a ukulele mid-chorus · ♑ scheduled
//              it for after work · ♒ sang it backwards to break the loop · ♓ gave the song a backstory, wept
//  49.2        "Day four. | *Still humming.*"  (the group beat is the ending)
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', TEAL = '#5fe0c8'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
const CART = ['K..........', '.KKKKKKKKKK', '.KWWWWWWWWK', '.KWWWWWWWWK', '..KKKKKKKK.', '..K......K.', '..O......O.']
const UKE = ['.......NN', '......NN.', '.....N...', '....N....', '.BBBN....', 'BBBBBB...', 'BBKBBB...', 'BBBBBB...', '.BBBB....']
const PHOTO = ['WWWWWWWWWW', 'WSSSSSSSSW', 'WSSYYSSSSW', 'WSSYYSSGSW', 'WSGGGSGGGW', 'WGGGGGGGGW', 'WWWWWWWWWW', 'WWWWWWWWWW']
function bigNote(x, cx, cy, cell, k, col, rot = 0) { drawBits(x, NOTE, { X: col }, cx, cy, cell * k, { rot }) }

const st = { x: -200 }
const CAMEOS = [
  { sign: 'aries', cap: 'Sang it louder | *to get it out.*', mood: 'wide', look: [1, 0], star: st, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bigNote(x, 720 + (i % 2) * 150 + Math.sin(t * 6 + i) * 10, 720 + Math.floor(i / 2) * 170, 18, pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2.2), i % 2 ? RED : GOLD, Math.sin(t * 8 + i) * 0.3)
      label(x, 790, 1120, 'VOLUME: 11', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 40, bg: RED, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Hummed it | for *three business days.*', mood: 'sleepy', look: [1, 0], star: st,
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 4, cell: 8, col: GOLD, alpha: pop01(t, P.t0 + 0.2, 0.3, 2) })
      label(x, 790, 760, `DAY ${1 + Math.min(2, Math.floor(prog(lt, 0.3, 1.6) * 3))}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 60, bg: BONE, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'mmm-hmm-hmm', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Two songs stuck. | *Mashed them up.*', mood: 'sparkle', look: [1, 0], star: st,
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.8, 1.3))
      bigNote(x, lerp(680, 790, m), 820, 20, pop01(t, P.t0 + 0.2, 0.3, 2), PINK, -0.2 * (1 - m))
      bigNote(x, lerp(900, 790, m), 820, 20, pop01(t, P.t0 + 0.4, 0.3, 2), SKYB, 0.2 * (1 - m))
      if (m > 0.95) sparkles(x, t, 790, 820, P.t0 + 1.3 * 1.29, 7, 140, 0.3)
      label(x, 790, 1060, 'REMIX: DONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Nostalgic | *for last Tuesday.*', mood: 'heart', look: [1, 0], star: st,
    front(x, t, lt, P) {
      drawBits(x, PHOTO, { W: BONE, S: SKYB, Y: GOLD, G: '#5fd068' }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1080, 'THE GOOD OLD DAYS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: SKYB, font: MONO, weight: 700 })
      hearts(x, t, 640, 700, P.t0 + 1.3, { n: 3, life: 1.4, spread: 80, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Performed it. | *In the grocery store.*', mood: 'sparkle', look: [1, 0], star: st, hops: [1.0],
    back(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.3, 0.8))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#fff1c8'; x.beginPath(); x.moveTo(F.x - 30, 470); x.lineTo(F.x + 30, 470); x.lineTo(F.x + 200, 1180); x.lineTo(F.x - 200, 1180); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      drawBits(x, CART, { K: BONE, W: '#9aa5c4', O: GOLD }, 780, 1000, 24 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 720, 'AISLE 5 TOUR', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Looked up the lyrics. | *Annotated them.*', mood: 'squint', look: [1, 0], star: st,
    front(x, t, lt, P) {
      card(x, 800, 860, 260, 340, BONE, pop01(t, P.t0 + 0.2, 0.3, 2), 0.03)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.8) {
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < 7; i++) x.fillRect(700, 730 + i * 38, 170 - (i % 3) * 30, 10)
        const r = ease.outCubic(prog(lt, 0.7, 1.5))
        x.strokeStyle = RED; x.lineWidth = 6
        for (let i = 0; i < 3; i++) if (r > i / 3) { x.beginPath(); x.ellipse(760 + (i % 2) * 40, 744 + i * 76, 70, 18, 0, 0, Math.PI * 2); x.stroke() }
      }
      label(x, 800, 1080, 'SEE FOOTNOTE 4', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Can’t pick a song | *to replace it.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], star: st,
    front(x, t, lt, P) {
      const opts = ['song A?', 'song B?', 'song C?']
      opts.forEach((s, i) => label(x, 800 + (i - 1) * 20, 740 + i * 120, s, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), { size: 40, bg: [PINK, LAV, SKYB][i], rot: (i - 1) * 0.06, font: MONO, weight: 700 }))
      label(x, 800, 1110, 'STILL THE OLD ONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Silent outside. | *A concert inside.*', mood: 'neutral', look: [1, 0], star: st,
    front(x, t, lt, P, F) {
      bubble(x, 800, 700, '…', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 60, tail: 'bl' })
      notes(x, t, F.x, F.top + 40, { n: 6, cell: 7, col: PINK, alpha: pop01(t, P.t0 + 0.8, 0.3, 2) })
      label(x, 800, 960, 'SOLD OUT (IN HERE)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: RED, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Bought a ukulele | *mid-chorus.*', mood: 'sparkle', look: [1, 0], star: st, hops: [1.1, 1.6],
    front(x, t, lt, P) {
      drawBits(x, UKE, { N: '#8a4a2e', B: '#ff9a4a', K: INK }, 800, 880, 30 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 6) * 0.08 })
      notes(x, t, 820, 820, { n: 3, cell: 7, col: GOLD, alpha: pop01(t, P.t0 + 1.0, 0.3, 2) })
      label(x, 800, 1120, 'NEW HOBBY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: '#ff9a4a', font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Scheduled the song | for *after work.*', mood: 'neutral', look: [1, 0], star: st,
    front(x, t, lt, P) {
      card(x, 800, 860, 300, 300, BONE, pop01(t, P.t0 + 0.2, 0.3, 2), -0.03)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.8) {
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        ;['9:00 WORK', '1:00 WORK', '6:00 ♪ SONG'].forEach((s, i) => { x.fillStyle = i === 2 ? MINT : '#d8cfe6'; x.fillRect(670, 750 + i * 80, 260, 56); x.fillStyle = INK; x.fillText(s, 686, 778 + i * 80) })
      }
    } },
  { sign: 'aquarius', cap: 'Sang it backwards | *to break the loop.*', mood: 'sparkle', look: [1, 0], star: st,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bigNote(x, 680 + i * 110, 820, 16, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), TEAL, Math.PI)
      bubble(x, 800, 1020, 'la-la-al', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: TEAL, tail: 'bl' })
      label(x, 800, 660, 'LOOP: STILL ON', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Gave the song | *a backstory.* Wept.', mood: 'heart', tears: 3, look: [1, 0], star: st,
    front(x, t, lt, P) {
      card(x, 800, 860, 260, 320, '#f3e2b8', pop01(t, P.t0 + 0.2, 0.3, 2), 0.05)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.8) { x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('CHAPTER 1:', 800, 740); x.fillText('THE CHORUS', 800, 774); x.fillStyle = '#b39b6a'; for (let i = 0; i < 4; i++) x.fillRect(700, 820 + i * 34, 190 - (i % 2) * 40, 10) }
      notes(x, t, 560, 1150, { n: 3, cell: 6, col: SKYB, alpha: pop01(t, P.t0 + 0.8, 0.3, 2) })
    } },
]

const F = makeFilm({
  id: 'r2t0015', key: 'F', accent: TEAL, ending: 'group',
  title: 'Song on loop? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Day four. | *Still humming.*',
    draw(x, t, lt) { notes(x, t, 540, 1350, { n: 6, cell: 8, col: GOLD, alpha: pop01(t, t - lt + 1.2, 0.4, 2) }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
