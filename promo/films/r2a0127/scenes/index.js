// r2a0127: star_advice, ADVICE SOLO, "How to befriend | a Cancer." (topic: How to make friends with a Cancer) (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm tip, one gag each.
//   0.0–3.6    "How to befriend | *a Cancer.*"
//   3.6–37.8   remember the little things (they do: a wall of notes) · accept the soup · text back (worry drops)
//              · come over (the guest bed is made) · shell first, heart second · look at the old photos (all of them)
//              · "I'm fine" (they know) · keep showing up (that's the secret) · let them fuss (a little)
//  37.8        "Soft shell. | *Softer heart.*"
//  41.0        LESSON: "Be gentle with a Cancer. | They *keep you forever.*"  FRIEND: FOR LIFE
//  46.9        "Accept the soup. | *Get a best friend.*"  The soup comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SILVER = '#bfe3ff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CRAB = '#ff8a5c'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const BOWL = ['RRRRRRRRRRRRRR', 'RSSSSSSSSSSSSR', 'RSSOSSSSSOSSSR', '.RRRRRRRRRRRR.', '..RRRRRRRRRR..', '...RRRRRRRR...', '.....RRRR.....']
const BOWL_C = { R: '#ff8fb1', S: '#ffd27a', O: ORANGE }
function soup(x, t, cx, cy, cell, k) {
  if (k <= 0.01) return
  drawBits(x, BOWL, BOWL_C, cx, cy, cell * k)
  x.save(); x.globalAlpha = k; x.strokeStyle = 'rgba(239,230,214,0.75)'; x.lineWidth = cell * 0.7; x.lineCap = 'round'
  for (let i = -1; i <= 1; i++) { x.beginPath(); for (let j = 0; j <= 10; j++) { const yy = cy - cell * 5 - j * cell * 1.2, xx = cx + i * cell * 3.5 + Math.sin(t * 3 + j * 0.7 + i) * cell * 0.8; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
  x.restore()
}
const SHELL = ['....CCCCCC....', '..CCCCCCCCCC..', '.CCcCCCCCCcCC.', 'CCCCCCCCCCCCCC', 'CCCCcCCCCcCCCC', 'CCCCCCCCCCCCCC']
const BED = ['PP..............PP', 'PPWWWW..........PP', 'PPWWWWQQQQQQQQQQPP', 'PPQQQQQQQQQQQQQQPP', 'PPQQQqQQQQqQQQQQPP', 'PPPPPPPPPPPPPPPPPP', 'PP..............PP']
const BED_C = { P: BROWN, W: CREAM, Q: '#9fd8ff', q: '#ffffff' }
const SCARF = ['RRRRRRRRRRRR', 'RWRWRWRWRWRW', 'RRRRRRRRRRRR', '.........RRR', '.........RWR', '.........RRR', '.........R.R']

const S = 'cancer'
const CAMEOS = [
  // 1 · they remember everything
  { sign: S, cap: 'Remember the little things. | *They do.*', mood: lt => lt < 1.3 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const NOTES = ['fav: grapes', 'cat: Mochi', 'no: cilantro', 'b-day: 3/14', 'shoe: 8', 'dream: Lisbon']
      const COL = ['#fff1a8', '#ffd1e0', '#c9f2d8', '#cfe6ff', '#fff1a8', '#ffd1e0']
      NOTES.forEach((n, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2)
        if (card(x, 690 + (i % 2) * 190, 640 + Math.floor(i / 2) * 160, 176, 112, COL[i], k, (i % 3 - 1) * 0.07)) {
          x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(n, 0, 4); x.restore()
        }
      })
      label(x, 790, 1150, 'NOTES ON YOU: 212', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  // 2 · the soup
  { sign: S, cap: 'They offer soup? | *Accept the soup.*', mood: lt => lt < 1.2 ? 'happy' : 'heart', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      soup(x, t, 790, 920, 22, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'you look | cold', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1120, 'SOUP: NON-NEGOTIABLE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 3 · text back
  { sign: S, cap: 'Text back. | Even *one word.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', look: [1, 0], tears: lt => lt < 1.2 ? 1 : 0, star: { x: -190 },
    front(x, t, lt, P) {
      const worried = lt < 1.2
      label(x, 790, 620, worried ? 'WORRY: MAXIMUM' : 'WORRY: GONE', pop01(t, P.t0 + (worried ? 0.15 : 1.25), 0.3, 2), { size: 36, bg: worried ? RED : MINT, color: worried ? CREAM : INK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'here!', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 64, col: SILVER, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.25, 7, 180, 0.3)
    } },
  // 4 · come over
  { sign: S, cap: 'Come over. | The *guest bed’s made.*', mood: 'sparkle', look: [1, 0], star: { x: -200, y: 20 },
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'MADE: 2019', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 800, 'stay forever?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  // 5 · shell first, heart second
  { sign: S, cap: 'Shell first. | *Heart second.*', mood: lt => lt < 1.2 ? 'neutral' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), open = ease.outCubic(prog(lt, 1.0, 1.5))
      if (lt > 1.0) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 790, 940 - 30 * open, 22 * open)
      drawBits(x, SHELL, { C: CRAB, c: '#ffc2a8' }, 790, 900 - 170 * open, 22 * k, { rot: -0.5 * open })
      drawBits(x, ['CCCCCCCCCCCCCC', '.CCCCCCCCCCCC.'], { C: CRAB }, 790, 1010, 22 * k)
      label(x, 790, 1130, 'OPENS SLOWLY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SILVER, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 6 · the photo albums
  { sign: S, cap: 'Look at the old photos. | *All of them.*', mood: 'heart', look: [1, 0], tears: 1, star: { x: -190 },
    front(x, t, lt, P) {
      const n = Math.min(7, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.22))
      const COL = [RED, '#6b62a8', MINT, ORANGE, SKYB, PINK, GOLD]
      for (let i = 0; i < n; i++) if (card(x, 790 + (i % 2 ? 14 : -14), 1110 - i * 66, 260, 56, COL[i], pop01(t, P.t0 + 0.2 + i * 0.22, 0.2, 2), 0)) { x.fillStyle = CREAM; x.fillRect(-100, -6, 200, 12); x.restore() }
      label(x, 790, 560, 'ALBUM 1 OF 9', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  // 7 · "I'm fine"
  { sign: S, cap: 'Said “I’m fine”? | They *already know.*', mood: lt => lt < 1.0 ? 'squint' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'i’m fine', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, col: BONE, tail: 'br' })
      // a little antenna on top of the star, pinging
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(350, 720); x.lineTo(350, 600 - 20 * k); x.stroke(); x.fillStyle = RED; x.beginPath(); x.arc(350, 590 - 20 * k, 18 * k, 0, Math.PI * 2); x.fill()
        for (let i = 0; i < 3; i++) { const ph = ((t * 1.5 + i / 3) % 1); x.strokeStyle = `rgba(191,227,255,${(1 - ph).toFixed(3)})`; x.lineWidth = 6; x.beginPath(); x.arc(350, 590 - 20 * k, 30 + ph * 110, -Math.PI * 0.9, -Math.PI * 0.1); x.stroke() }
        x.restore()
      }
      label(x, 790, 1060, 'FEELINGS: DETECTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SILVER, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 8 · Align: keep showing up
  { sign: S, cap: 'Keep showing up. | *That’s the secret.*', mood: lt => lt < 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 790, 590, '✦ FRIEND MATCH: YOU', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (card(x, 790, 860, 340, 300, CREAM, pop01(t, P.t0 + 0.35, 0.3, 2), 0.03)) {
        const n = Math.floor(clamp((lt - 0.5) / 1.2) * 20)
        for (let i = 0; i < 20; i++) { const cx = -130 + (i % 5) * 65, cy = -100 + Math.floor(i / 5) * 66; x.fillStyle = i < n ? MINT : '#d8d2c4'; x.fillRect(cx - 24, cy - 24, 48, 48); if (i < n) { x.fillStyle = INK; x.fillRect(cx - 10, cy, 8, 12); x.fillRect(cx - 2, cy - 12, 8, 22); x.fillRect(cx + 6, cy - 18, 8, 10) } }
        x.restore()
      }
      label(x, 790, 1110, 'STREAK: 20 WEEKS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 9 · let them fuss
  { sign: S, cap: 'Let them fuss over you. | *A little.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 790, 900, 220 * k, { mood: lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      const drop = ease.outCubic(prog(lt, 0.6, 1.1))
      if (lt > 0.55) drawBits(x, SCARF, { R: RED, W: CREAM }, 790, lerp(560, 1000, drop), 14)
      bubble(x, 790, 620, 'it’s 21°…', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      label(x, 790, 1130, 'SCARF: ON', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0127', key: 'F', accent: SILVER, solo: 'cancer', ending: 'lesson',
  title: 'How to befriend | *a Cancer.*',
  cameos: CAMEOS,
  group: { cap: 'Soft shell. | *Softer heart.*', mood: 'heart' },
  lesson: { text: 'Be gentle with a Cancer. | They *keep you forever.*', chip: 'FRIEND: FOR LIFE' },
  last: {
    text: 'Accept the soup. | *Get a best friend.*',
    draw(x, t, lt) { soup(x, t, 540, 1440, 20, pop01(t, t - lt + 0.6, 0.4, 2)); hearts(x, t, 540, 1330, t - lt + 1.0, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
