// r2t0641: star_talk, SOLO, "Geminis with | a new hobby." (~49 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards), every new-hobby trait pushed to the extreme. Ending: lesson.
//   0.0–3.6    "Geminis with | *a new hobby.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   bought a pottery wheel Monday, sold it Tuesday · one tutorial in, teaching a class · learning guitar while
//              juggling · knitted one scarf, started a podcast · painting and baking at once · profile hobbies change hourly
//              · eleven hobbies, zero finished · told the group chat, forty voice notes · their closet is a hobby museum
//  37.8        "New hobby. | *Every Tuesday.*"  The big Gemini comes back.
//  41.0        LESSON UNLOCKED: "Curious minds | *keep life fun.*"  CURIOSITY: MAXED
//  46.9        "Never stop | *starting.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffd84a', CLAY = '#c9774a', RED = '#e23d4e', GREEN = '#5fd068'
const S = 'gemini'

// ── props
const POT = [
  '..KKKKKKK..',
  '...CCCCC...',
  '..CCCCCCC..',
  '.CCcCCCCCC.',
  'CCCCCCCcCCC',
  'CCCCCCCCCCC',
  '.CCcCCCCCC.',
  '..CCCCCCC..',
  '...CCCCC...',
]
const POT_C = { K: '#8a4a2e', C: CLAY, c: '#e0956a' }
const GUITAR = [
  '.....KK',
  '....KK.',
  '...NN..',
  '...NN..',
  '..NN...',
  'BBBB...',
  'BBhBB..',
  'BBBBB..',
  '.BBB...',
]
const GUITAR_C = { K: INK, N: '#8a4a2e', B: '#ff9a4a', h: INK }
const MIC = [
  '.GGGG.',
  'GgGGgG',
  'GGGGGG',
  'GgGGgG',
  '.GGGG.',
  '..KK..',
  '..KK..',
  '.KKKK.',
]
const MIC_C = { G: '#9aa5c4', g: '#5a6698', K: INK }
const SCARF = [
  'RRRRRRRRRRRRRR',
  'RWRRWRRWRRWRRR',
  'RRRRRRRRRRRRRR',
  '...........RRR',
  '...........RWR',
  '...........RRR',
  '...........W.W',
]
const SCARF_C = { R: PINK, W: BONE }
const CAKE = [
  '....F....',
  '....Y....',
  '.PPPPPPP.',
  'PWPWPWPWP',
  'CCCCCCCCC',
  'CCCCCCCCC',
  'PPPPPPPPP',
  'CCCCCCCCC',
]
const CAKE_C = { F: '#ffb34a', Y: BONE, P: PINK, W: BONE, C: '#c98f2a' }
const BRUSH = ['....BB', '...BB.', '..WW..', '.KK...', 'KK....', 'K.....']
const BRUSH_C = { B: SKYB, W: '#9aa5c4', K: '#8a4a2e' }
const BALL = ['.XX.', 'XXXX', 'XXXX', '.XX.']

// a sign-profile card whose HOBBIES line keeps changing
function profile(x, cx, cy, k, hobby) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const W = 300, H = 400
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = BONE; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = '#2a2350'; x.fillRect(-W / 2 + 20, -H / 2 + 20, W - 40, 160)
  x.fillStyle = YEL; x.font = `700 110px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♊︎', 0, -H / 2 + 104)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.fillText('♊︎ GEMINI', -W / 2 + 22, -H / 2 + 212)
  x.fillText('HOBBIES:', -W / 2 + 22, -H / 2 + 256)
  x.fillStyle = '#7a5cc0'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.fillText(hobby, 0, -H / 2 + 314)
  x.fillStyle = '#9aa5c4'; x.font = `700 18px ${MONO}`; x.fillText('edited just now', 0, -H / 2 + 362)
  x.restore()
}
// a phone with a stack of voice-note pills
function voicePhone(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = MINT; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GROUP CHAT', 0, -132)
  const show = Math.min(4, n)
  for (let i = 0; i < show; i++) {
    const y = -70 + i * 62
    x.fillStyle = YEL; x.fillRect(-92, y - 22, 184, 44)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-78, y - 10); x.lineTo(-78, y + 10); x.lineTo(-62, y); x.fill()
    for (let b = 0; b < 12; b++) { const h = 6 + 14 * Math.abs(Math.sin(b * 1.7 + i)); x.fillRect(-50 + b * 11, y - h / 2, 6, h) }
  }
  x.restore()
}
// a closet with a door open on a stack of abandoned gear
function closet(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -250, 340, 500)
  x.fillStyle = '#5a3a8a'; x.fillRect(-160, -240, 320, 480)
  x.fillStyle = '#2a1a4a'; x.fillRect(-150, -230, 300, 460)
  x.restore()
  // the gear: a tilted stack (drawn in panel coords so drawBits outlines stay crisp)
  const items = [[GUITAR, GUITAR_C, -60, 120, 14, -0.2], [POT, POT_C, 70, 150, 12, 0], [CAKE, CAKE_C, -40, -20, 10, 0.1], [MIC, MIC_C, 80, -10, 12, 0.15], [SCARF, SCARF_C, 0, -150, 10, -0.1]]
  items.forEach(([bm, c, dx, dy, cell, rot], i) => {
    const kk = pop01(lt, 0.3 + i * 0.15, 0.3, 2) * k
    drawBits(x, bm, c, cx + dx * k, cy + dy * k, cell * kk, { rot })
  })
}

const CAMEOS = [
  { sign: S, cap: 'Pottery wheel Monday. | *Sold it Tuesday.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'MON: OBSESSED', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1120, 'TUE: FOR SALE', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 36, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One tutorial in. | Now *teaching a class.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 650, 'TUTORIAL: 1 OF 1', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'welcome, | students!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 54, tail: 'bl' })
      label(x, 790, 1120, 'INSTRUCTOR', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 38, bg: YEL, rot: 0.05 })
    } },
  { sign: S, cap: 'Learning guitar. | *While juggling.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [0, -1], star: { x: -150 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, GUITAR, GUITAR_C, F.x + 150, F.cy + 40, 20 * k, { rot: 0.2 })
      const COLS = [PINK, MINT, SKYB]
      for (let i = 0; i < 3; i++) {
        const a = t * 5 + i * (Math.PI * 2 / 3)
        drawBits(x, BALL, { X: COLS[i] }, F.x + Math.cos(a) * 140, F.cy - 250 + Math.sin(a) * 60 - Math.abs(Math.sin(a)) * 60, 14 * k)
      }
      label(x, 800, 1130, 'MULTITASKING', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Knitted one scarf. | Started *a podcast.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SCARF, SCARF_C, 790, 1060, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, MIC, MIC_C, 790, 790, 22 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 610, 'EP. 1: YARN', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 36, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Painting and baking. | *At the same time.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BRUSH, BRUSH_C, 880, 820, 18 * pop01(t, P.t0 + 0.7, 0.3, 2.2), { rot: 0.3 })
      // a fresh stripe of blue paint across the icing
      const s = ease.outCubic(prog(lt, 0.9, 1.4))
      if (s > 0.01) { x.fillStyle = SKYB; x.fillRect(686, 898, 210 * s, 18) }
      bubble(x, 760, 650, 'cake or art?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'Profile hobbies? | *Updated hourly.*', mood: lt => lt > 1.6 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const H = ['chess', 'surfing', 'yodeling', 'bread', 'falconry', 'chess again']
      const i = Math.min(H.length - 1, Math.floor(Math.max(0, lt - 0.4) / 0.33))
      profile(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), H[i])
    } },
  { sign: S, cap: 'Eleven hobbies. | *Zero finished.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.min(11, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.11))
      label(x, 790, 760, `STARTED: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 48, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 940, 'FINISHED: 0', pop01(t, P.t0 + 1.6, 0.3, 2.6), { size: 48, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Told the group chat. | *Forty voice notes.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(Math.max(0, lt - 0.4) / 0.25)
      voicePhone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), n)
      label(x, 790, 1120, `VOICE NOTES: ${Math.min(40, n * 4)}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their closet? | A *hobby museum.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      closet(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 780, 1150, 'EXHIBIT: UKULELE', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 30, bg: YEL, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0641', key: 'C', accent: YEL, solo: S, ending: 'lesson',
  title: 'Geminis with | *a new hobby.*',
  cameos: CAMEOS,
  group: { cap: 'New hobby. | *Every Tuesday.*', mood: 'sparkle' },
  lesson: { text: 'Curious minds | *keep life fun.*', chip: 'CURIOSITY: MAXED' },
  last: {
    text: 'Never stop | *starting.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1000, t - lt + 0.6, 10, 260, 0.4); hearts(x, t, 540, 1250, t - lt + 0.4, { n: 7, life: 2.2, spread: 640, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
