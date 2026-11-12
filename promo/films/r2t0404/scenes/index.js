// r2t0404: THE SIGNS AS… v3, SOLO film, "A Cancer’s day off | be like." (topic: Cancers on a day off; ~45 s vertical, signs3kit social cut, music:
// lofi · D). One sign the whole way: nine day-off moments, each the most extreme Cancer version. Ending: callback.
//   0.0–3.6    "A Cancer’s day off | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              plans: the couch, all day · rewatched the same show, ninth time · soup for twelve, lives alone
//              · called mom, three hours · opened the photo album, cried at page one · "are you all okay?" no reason
//              · built a pillow fort · planned to go out, twelve steps · fed the neighbour's cat, now it's their cat
//  37.8        "Home. Snacks. | *Feelings.*"
//  41.2        CALLBACK: "Soup for twelve? | *Fed the street.*"  The pot is back, twelve little bowls.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SIGN_IDS,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', SILVER = '#cfe3ff'

const COUCH = [
  '.PPPPPPPPPPPPPP.',
  'PPpPPPPPPPPPPpPP',
  'PPpPPPPPPPPPPpPP',
  'PPPPPPPPPPPPPPPP',
  'PLLLLLLLLLLLLLLP',
  'PLLLLLLLLLLLLLLP',
  'PPPPPPPPPPPPPPPP',
  '.K............K.',
]
const COUCH_C = { P: '#9a7ad8', p: '#b9a0f0', L: '#c9a6ff', K: INK }
const POT = [
  '..S...S...S...',
  '...S...S...S..',
  'KKKKKKKKKKKKKK',
  'GGGGGGGGGGGGGG',
  'GOOOOOOOOOOOOG',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  '.GGGGGGGGGGGG.',
]
const POT_C = { S: '#d8dbe8', K: INK, G: '#9aa5c4', O: '#ffcf6a' }
const BOWL = [
  'OOOOOOO',
  'BBBBBBB',
  '.BBBBB.',
]
const CAT = [
  'O.....O.',
  'OO...OO.',
  'OOOOOOO.',
  'OKOOOKO.',
  'OOOPOOO.',
  '.OOOOO..',
  '.OOOOOOO',
  '.OOOOOO.',
  '.O.O.O.O',
]
const CAT_C = { O: '#ffb34a', K: INK, P: PINK }
const SHOES = [
  'RRRR...RRRR.',
  'RRRRR..RRRRR',
  'WWWWW..WWWWW',
]
const CUSHION = ['PPPPPP', 'PLPPLP', 'PPPPPP', 'PLPPLP']

// a little TV with an episode card
function tv(x, t, cx, cy, k, txt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-166, -126, 332, 232); x.fillRect(-60, 106, 120, 20); x.fillRect(-100, 126, 200, 14)
  x.fillStyle = '#3a3360'; x.fillRect(-158, -118, 316, 216)
  x.fillStyle = '#1a6b8a'; x.fillRect(-140, -100, 280, 180)
  x.fillStyle = 'rgba(255,255,255,0.08)'; for (let i = 0; i < 9; i++) x.fillRect(-140, -100 + ((t * 60 + i * 20) % 180), 280, 4)
  x.fillStyle = '#fff'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, -10)
  x.restore()
}
// a phone showing a call timer
function callPhone(x, cx, cy, k, secs) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -200, 240, 400)
  x.fillStyle = '#2a2350'; x.fillRect(-110, -190, 220, 380)
  x.fillStyle = '#140c30'; x.fillRect(-96, -160, 192, 320)
  x.fillStyle = PINK; x.fillRect(-40, -120, 80, 80); x.fillStyle = INK; x.fillRect(-20, -100, 12, 12); x.fillRect(8, -100, 12, 12); x.fillRect(-16, -70, 32, 8)
  x.fillStyle = BONE; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MOM ♥︎', 0, 0)
  const h = Math.floor(secs / 3600), m = Math.floor(secs / 60) % 60, s = Math.floor(secs) % 60
  x.fillStyle = MINT; x.font = `700 36px ${MONO}`; x.fillText(`${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`, 0, 60)
  x.restore()
}
// an open photo album
function album(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -116, 352, 232)
  x.fillStyle = '#8a4a2e'; x.fillRect(-170, -110, 340, 220)
  x.fillStyle = PAPER; x.fillRect(-160, -100, 154, 200); x.fillRect(6, -100, 154, 200)
  const pics = [[-83, -40], [83, -40], [-83, 50], [83, 50]], ids = ['cancer', 'taurus', 'pisces', 'leo']
  pics.forEach(([px, py], i) => { x.fillStyle = INK; x.fillRect(px - 58, py - 40, 116, 80); x.fillStyle = ['#ffe7a8', '#cfe3ff', '#ffd0de', '#d8ffd0'][i]; x.fillRect(px - 54, py - 36, 108, 72); signChar(x, t, ids[i], px, py + 4, 58, { mood: 'happy', seed: 40 + i, glyph: false, glow: 0.3, tears: ids[i] === 'pisces' ? 1 : 0 }) })
  x.restore()
}
// a pillow fort: two cushions and a blanket roof
function fort(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  drawBits(x, CUSHION, { P: SKYB, L: '#ffffff' }, -120, 60, 22)
  drawBits(x, CUSHION, { P: SKYB, L: '#ffffff' }, 120, 60, 22)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 20); x.lineTo(0, -150); x.lineTo(200, 20); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.moveTo(-186, 12); x.lineTo(0, -138); x.lineTo(186, 12); x.fill()
  x.fillStyle = '#ffd0de'; for (let i = 0; i < 4; i++) x.fillRect(-100 + i * 60, -40, 20, 20)
  x.fillStyle = INK; x.fillRect(-4, -190, 8, 52); x.fillStyle = GOLD; x.fillRect(4, -190, 44, 26)
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'cancer', cap: 'The plan for today: | *the couch.*', mood: 'sleepy', star: { x: -170, y: -40 },
    back(x, t, lt, P) { drawBits(x, COUCH, COUCH_C, 540, 1000, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 680, 'DO NOT MOVE ME', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Comfort show, again. | *Ninth time.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: STAR, tears: lt => lt > 1.5 ? 1 : 0,
    front(x, t, lt, P) {
      tv(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'EPISODE 1')
      label(x, 790, 680, 'WATCH #9', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'it’s like home', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Made soup for twelve. | *Lives alone.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: STAR, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'SERVES: 12', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'HOUSEHOLD: 1', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Called mom. | *Three hours.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: STAR,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      callPhone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(0, 3 * 3600 + 7 * 60, ease.inCubic(clamp((lt - 0.3) / 1.9))))
      bubble(x, 560, 650, '…and ANOTHER thing', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Opened the photo album. | Cried at *page one.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 1], star: STAR, tears: lt => lt > 1.0 ? 3 : 0,
    front(x, t, lt, P) {
      album(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'PAGE 1 OF 300', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Texted the group chat: | *“are you all okay?”*', mood: 'wide', look: [1, 0], star: STAR, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'are you all | okay?? ♥︎', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 750, 900, 'why?? what happened', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 30, col: LAV, tail: 'br' })
      label(x, 790, 1090, 'REASON: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Built a pillow fort. | *Moved in.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      fort(x, t, 760, 980, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85)
      label(x, 790, 680, 'POPULATION: 1', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Planned to go out. | *Twelve steps.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: STAR, hops: [0.6, 1.0],
    front(x, t, lt, P) {
      drawBits(x, SHOES, { R: RED, W: '#fff' }, 790, 1100, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(12, Math.floor(clamp((lt - 0.3) / 0.9) * 12))
      label(x, 790, 760, `STEPS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 42, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'too far. home.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Fed the neighbour’s cat. | *Now it’s their cat.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: STAR, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 800, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'NAME: BABY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04 })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0404', key: 'D', accent: SILVER, solo: 'cancer', ending: 'callback',
  title: 'A Cancer’s day off | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Home. Snacks. | *Feelings.*', mood: 'heart' },
  last: {
    text: 'Soup for twelve? | *Fed the street.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      drawBits(x, POT, POT_C, 540, 1010, 18 * k)
      for (let i = 0; i < 12; i++) {
        const kk = pop01(t, t - lt + 0.7 + i * 0.08, 0.3, 2)
        const bx = 540 + ((i % 6) - 2.5) * 130, by = 1180 + Math.floor(i / 6) * 130
        if (kk > 0.01) { signChar(x, t, SIGN_IDS[i], bx, by, 92 * kk, { mood: 'heart', seed: 50 + i, glyph: false, glow: 0.5, tears: i === 11 ? 1 : 0 }); drawBits(x, BOWL, { O: '#ffcf6a', B: '#9aa5c4' }, bx, by + 54, 7 * kk) }
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
