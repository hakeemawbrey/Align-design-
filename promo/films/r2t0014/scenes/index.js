// r2t0014: THE SIGNS AS… v3 BE LIKE, "Waved at nobody? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each waving back at someone who was waving at someone else. Ending: callback.
//   0.0–3.6    "Waved at nobody? | *Zodiacs be like.*"
//   3.6–49.2   ♈ waved back, then ran over to hug · ♉ turned it into a stretch · ♊ befriended the actual person
//              · ♋ moved to a new city · ♌ took a bow anyway · ♍ still replays it every night · ♎ turned it into
//              fixing their hair · ♏ never waves first, saw it coming · ♐ waved at everyone, started a parade
//              · ♑ turned it into checking the time · ♒ was waving at a satellite · ♓ two-second cringe, two-day cry
//  49.2        "Nobody was | *waving at them.*"
//  52.6        CALLBACK: "Gemini’s new | *brunch buddy.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { drawStarChar } from '../../startalk.js'

const RED = '#e23d4e', PEACH = '#ffb38a'

const HAND = ['..F.F.F..', '.FFFFFFF.', '.FFFFFFF.', 'FFFFFFFF.', 'FFFFFFFF.', '.FFFFFFF.', '..FFFFF..', '..FFFFF..']
/** a waving pixel hand */
function wave(x, cx, cy, k, t, { col = GOLD, speed = 9, amp = 0.45, cell = 16 } = {}) {
  if (k <= 0.01) return
  drawBits(x, HAND, { F: col }, cx, cy, cell * k, { rot: Math.sin(t * speed) * amp })
}
function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
/** "the stranger": a little grey star waving past the hero at someone off-panel */
function stranger(x, t, cx, cy, k, seed = 1, mood = 'happy') {
  if (k <= 0.01) return
  drawStarChar(x, cx, cy, 150 * k, t, { color: '#a9b0c8', mood, look: [1, 0], seed: 60 + seed, glow: 0.4 })
}
const SUITCASE = ['...KKKKK...', '...K...K...', 'PPPPPPPPPPP', 'PWPPPPPPPWP', 'PPPPPPPPPPP', 'PPPPPPPPPPP', 'PWPPPPPPPWP', 'PPPPPPPPPPP', '.K.......K.']
const SAT = ['SS.......SS', 'SS.......SS', 'SS..GGG..SS', 'SSKKGGGKKSS', 'SS..GGG..SS', 'SS...W...SS', 'SS.......SS']
const FLAG = ['KRRRRR', 'KRRRRR', 'KYYYYY', 'KYYYYY', 'K.....', 'K.....', 'K.....']

const st = { x: -200 }
const CAMEOS = [
  { sign: 'aries', cap: 'Waved back. | Then *ran in for a hug.*', mood: 'sparkle', look: [1, 0], star: st, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P, F) {
      stranger(x, t, 840, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), 1, lt > 1.3 ? 'wide' : 'happy')
      wave(x, F.x + 120, F.cy - 60, pop01(t, P.t0 + 0.3, 0.3, 2), t, { col: RED })
      bubble(x, 760, 680, 'HIIII!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 52, col: RED, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Pretended it was | *a stretch.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: st,
    front(x, t, lt, P, F) {
      const up = ease.inOutCubic(prog(lt, 0.9, 1.4))
      wave(x, F.x + 110 + up * 40, F.cy - 70 - up * 70, pop01(t, P.t0 + 0.3, 0.3, 2), t * (1 - up), { col: GOLD, amp: 0.45 * (1 - up) })
      label(x, 800, 880, 'JUST STRETCHING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Befriended | *the actual person.*', mood: 'heart', look: [1, 0], star: st,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      stranger(x, t, 840, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), 2, lt > 1.2 ? 'heart' : 'happy')
      bubble(x, 800, 720, 'love your | energy!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      hearts(x, t, 700, 960, P.t0 + 1.3, { n: 4, life: 1.6, spread: 180, cell: 6, seed: 2 })
    } },
  { sign: 'cancer', cap: 'Waved wrong. | *Moved to a new city.*', mood: 'wide', look: [1, 0], star: st,
    front(x, t, lt, P) {
      const drive = ease.inCubic(prog(lt, 1.1, 2.2))
      drawBits(x, SUITCASE, { K: INK, P: SKYB, W: BONE }, 800 + drive * 60, 950, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 700, 'NEW ADDRESS', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Wasn’t for them? | *Took a bow anyway.*', mood: 'sparkle', look: [1, 0], star: st, squash: lt => lt > 0.9 && lt < 1.6 ? 0.18 : 0,
    front(x, t, lt, P, F) {
      for (let i = 0; i < 6; i++) { const p = pop01(t, P.t0 + 1.0 + i * 0.08, 0.3, 2); if (p > 0.01) drawBits(x, ['.R.', 'RRR', '.G.', '.G.'], { R: i % 2 ? RED : PINK, G: '#5fd068' }, 680 + (i % 3) * 110, 700 + Math.floor(i / 3) * 90 + (1 - p) * -200, 14 * p, { rot: i * 0.4 }) }
      label(x, 800, 1010, 'THANK YOU, THANK YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Still replays it. | *Every night.*', mood: 'wide', look: [0, -1], star: st,
    front(x, t, lt, P) {
      card(x, 800, 860, 300, 200, '#2a2350', pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.8) { x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('↻ REPLAY #' + (300 + Math.floor(lt * 40)), 800, 860) }
      label(x, 800, 1040, '3:12 AM', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Smoothly turned it | into *a hair fix.*', mood: lt => lt > 1.1 ? 'wink' : 'happy', look: [1, 0], star: st,
    front(x, t, lt, P, F) {
      const up = ease.inOutCubic(prog(lt, 0.8, 1.2))
      wave(x, lerp(F.x + 120, F.x + 60, up), lerp(F.cy - 60, F.top - 10, up), pop01(t, P.t0 + 0.3, 0.3, 2), t * (1 - up), { col: PINK, amp: 0.45 * (1 - up) })
      sparkles(x, t, F.x + 40, F.top, P.t0 + 1.3, 6, 90, 0.2)
      label(x, 800, 880, 'FLAWLESS SAVE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Never waves first. | *Saw it coming.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: st,
    front(x, t, lt, P) {
      stranger(x, t, 840, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), 3)
      wave(x, 920, 900, pop01(t, P.t0 + 0.3, 0.3, 2), t, { col: '#9aa5c4', cell: 9 })
      label(x, 800, 720, 'CALLED IT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: RED, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Waved at everyone. | *Started a parade.*', mood: 'sparkle', look: [1, 0], star: st, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: BONE, R: RED, Y: GOLD }, 860, 760, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      for (let i = 0; i < 3; i++) { const p = pop01(t, P.t0 + 0.6 + i * 0.25, 0.3, 2); if (p > 0.01) signChar(x, t, ['aries', 'leo', 'gemini'][i], 680 + i * 110, 1040, 100 * p, { mood: 'sparkle', seed: 40 + i, glyph: false, hops: [P.t0 + 1.2 + i * 0.2, P.t0 + 1.8 + i * 0.2] }) }
      notes(x, t, 780, 930, { n: 4, cell: 7, col: GOLD, alpha: pop01(t, P.t0 + 0.8, 0.3, 2) })
    } },
  { sign: 'capricorn', cap: 'Turned it into | *checking the time.*', mood: 'neutral', look: [1, 0], star: st,
    front(x, t, lt, P, F) {
      const turn = ease.inOutCubic(prog(lt, 0.8, 1.2))
      wave(x, F.x + 120, F.cy - 60 + turn * 60, pop01(t, P.t0 + 0.3, 0.3, 2), t * (1 - turn), { col: MINT, amp: 0.45 * (1 - turn) })
      label(x, 800, 820, 'OH LOOK, 2:15', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Was waving | *at a satellite.*', mood: 'sparkle', look: [1, -1], star: st,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      wave(x, F.x + 120, F.cy - 60, pop01(t, P.t0 + 0.3, 0.3, 2), t, { col: SKYB })
      drawBits(x, SAT, { S: SKYB, G: GOLD, K: INK, W: BONE }, 820 + Math.sin(t) * 20, 700, 18 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.3 })
      bubble(x, 800, 920, 'hi buddy', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Two-second cringe. | *Two-day cry.*', mood: 'wide', tears: 3, look: [1, 0], star: st,
    front(x, t, lt, P) {
      label(x, 800, 760, 'CRINGE: 0:02', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: BONE, font: MONO, weight: 700 })
      label(x, 800, 900, 'CRYING: 48:00', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 40, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0014', key: 'D', accent: PEACH, ending: 'callback',
  title: 'Waved at nobody? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody was | *waving at them.*' },
  last: {
    text: 'Gemini’s new | *brunch buddy.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'gemini', 400, 1080, 240 * k, { mood: 'heart', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      stranger(x, t, 700, 1110, 1.5 * pop01(t, t - lt + 0.7, 0.35, 2), 5, 'heart')
      label(x, 550, 1320, 'EVERY SUNDAY', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700 })
      hearts(x, t, 550, 960, t - lt + 1.5, { n: 6, life: 1.6, spread: 300, cell: 6, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
