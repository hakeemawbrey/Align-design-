// v3a077: star_advice, ADVICE ROLLCALL, "Each sign's sign | to text first." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: the little cue that says "text them first", warmly, one light gag per card.
//   0.0–3.6    "Each sign’s sign | *to text first.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ thinking it? a big SEND button · ♉ saved them the last slice · ♊ a new fun fact (otters hold hands)
//              · ♋ you miss them (a photo with a heart) · ♌ you look cute today (camera flash) · ♍ remembered their big day
//              (calendar: "good luck today!") · ♎ a song reminded you of them (a little radio) · ♏ waited long enough
//              (day 6 → send it) · ♐ saw something funny (a duck in a hat) · ♑ the calendar has one gap (free: 7 p.m.)
//              · ♒ found a very weird article ("read this!!") · ♓ dreamt about them (a dream cloud)
//  49.2        "Any reason works. | *Just say hi.*"  The twelve fly up into a group photo.
//  52.6        callback: "They texted back: | *“save me a slice?”*"  Taurus' slice comes back: ALREADY DID.
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#2fc79a', BROWN = '#8a4a2e', YEL = '#ffd23a'

function paper(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head, headBg = PINK, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 54); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 29) }
  for (const l of lines) { if (l.k !== undefined && l.k <= 0.01) continue; x.fillStyle = l.color || INK; x.font = l.font || `800 ${l.size || 34}px ${INTER}`; x.fillText(l.text, l.x || 0, l.y) }
  x.restore()
}

// ── props
const SLICE = [
  'CCCCCCCCCCC',
  'YYRYYYYYRYY',
  '.YYYYRYYYY.',
  '..YRYYYYY..',
  '...YYYRY...',
  '....YYY....',
  '.....Y.....',
]
const SLICE_C = { C: '#d18f4a', Y: '#ffd86a', R: RED }
const CAMERA = [
  '...KKK......',
  'KKKKKKKKKKKK',
  'KGGGGGGGGGWK',
  'KGGGLLLLGGGK',
  'KGGLLBBLLGGK',
  'KGGLLBBLLGGK',
  'KGGGLLLLGGGK',
  'KGGGGGGGGGGK',
  'KKKKKKKKKKKK',
]
const CAMERA_C = { K: INK, G: '#c9d1e0', W: '#fff', L: '#2a2350', B: SKYB }
const RADIO = [
  '.........A',
  '........A.',
  '.......A..',
  'RRRRRRRRRR',
  'RWWWWRYYYR',
  'RWKWKRYYYR',
  'RWWWWRRRRR',
  'RWKWKRBRBR',
  'RWWWWRRRRR',
  'RRRRRRRRRR',
]
const RADIO_C = { A: '#c9d1e0', R: '#ff9f5a', W: CREAM, K: '#2a2350', Y: MINT, B: INK }
const DUCK = [
  '....PPP.....',
  '...PPPPP....',
  '...YYYY.....',
  '..YYYYYY....',
  '..YKYYYYOO..',
  '..YYYYYYOOO.',
  '...YYYY.....',
  '.YYYYYYYYY..',
  'YYYYYYYYYYY.',
  '.YYYYYYYYY..',
]
const DUCK_C = { P: '#b07dff', Y: YEL, K: INK, O: ORANGE }
const CLOUD = [
  '.....WWWW.........',
  '...WWWWWWWW.WWWW..',
  '.WWWWWWWWWWWWWWWW.',
  'WWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWW',
  '.WWWWWWWWWWWWWWWW.',
  '..WWWW...WWWWWW...',
]

function sendButton(x, t, cx, cy, k, press) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const d = press ? 10 : 0
  x.fillStyle = INK; x.fillRect(-150, -60, 300, 140)
  x.fillStyle = '#a3243a'; x.fillRect(-142, -40, 284, 112)
  x.fillStyle = RED; x.fillRect(-142, -52 + d, 284, 100 - d)
  x.fillStyle = '#fff'; x.font = `800 56px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEND', 0, -2 + d)
  x.restore()
}
function calendarGrid(x, cx, cy, k, glow) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -140, 316, 300)
  x.fillStyle = INK; x.fillRect(-162, -152, 324, 304)
  x.fillStyle = CREAM; x.fillRect(-154, -144, 308, 288)
  x.fillStyle = GREEN; x.fillRect(-154, -144, 308, 50)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEK', 0, -118)
  const COLS = ['#9aa7c7', '#6f8cff', '#b07dff', '#ff9f5a']
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    const gx = -140 + c * 72, gy = -82 + r * 54
    if (r === 2 && c === 1) {
      x.fillStyle = `rgba(125,255,176,${(0.4 + 0.6 * glow).toFixed(2)})`; x.fillRect(gx, gy, 64, 46)
      continue
    }
    x.fillStyle = COLS[(r * 3 + c) % 4]; x.fillRect(gx, gy, 64, 46)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Thinking about it? | *Send it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      sendButton(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.1 && lt < 1.5)
      bubble(x, 790, 680, 'hey, you!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 790, 880, P.t0 + 1.1, 8, 190, 0.2)
      label(x, 790, 1090, 'SENT ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'You saved them | *the last slice.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SLICE, SLICE_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      label(x, 790, 1080, 'SAVED FOR: THEM', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'You learned | *a fun fact.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'otters hold | hands to sleep!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1020, 'MUST SHARE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.04 })
      hearts(x, t, 790, 940, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'cancer', cap: 'You miss them. | *That’s enough.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      paper(x, 790, 850, 260, 300, k, { rot: 0.06, bg: '#fff' })
      if (k > 0.9) { x.save(); x.translate(790, 830); x.rotate(0.06); x.fillStyle = '#3a2d70'; x.fillRect(-110, -130, 220, 200); x.restore(); drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 820, 18) }
      label(x, 790, 1090, 'MISSING YOU', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'You look cute today. | *Share it.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const fl = prog(lt, 0.9, 1.1) * (1 - prog(lt, 1.1, 1.5))
      if (fl > 0.01) { x.save(); x.globalAlpha = 0.6 * fl; x.fillStyle = '#fff'; x.fillRect(150, 490, 780, 720); x.restore() }
      label(x, 790, 1080, 'NEW PIC: SENT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'You remembered | *their big day.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 780, 300, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, head: 'THURSDAY', headBg: MINT,
        lines: [{ text: 'their interview!', y: 30, size: 34, color: RED }] })
      bubble(x, 790, 1040, 'good luck today!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'A song | *made you think of them.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, RADIO, RADIO_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 790, 760, { n: 4, cell: 7, col: PINK, alpha: clamp((lt - 0.4) / 0.4) })
      label(x, 790, 680, 'NOW PLAYING: THEM', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'You’ve waited | *long enough.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const day = 1 + Math.min(5, Math.floor(Math.max(0, lt - 0.2) / 0.22))
      paper(x, 790, 820, 220, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04, head: 'WAITING', headBg: '#ff6b81',
        lines: [{ text: `DAY ${day}`, y: 30, size: 56 }] })
      bubble(x, 790, 1060, 'okay. hi.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'You saw | *something funny.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [-1, 0], star: { x: 160 }, hops: [1.1, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      paper(x, 320, 840, 280, 280, k, { rot: -0.05, bg: '#bfe9ff' })
      drawBits(x, DUCK, DUCK_C, 320, 850, 18 * k, { rot: -0.05 })
      label(x, 320, 1070, 'THEY’D LOVE THIS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Your calendar | *has one gap.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      calendarGrid(x, 320, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 0.5 + 0.5 * Math.sin(t * 6))
      label(x, 320, 1080, 'FREE: 7 P.M.', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'You found | *a very weird article.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 820, 300, 230, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, head: 'BREAKING', headBg: SKYB,
        lines: [{ text: 'snail runs for', y: 10, size: 32 }, { text: 'town mayor', y: 55, size: 32 }] })
      bubble(x, 790, 1070, 'read this!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'You dreamt | *about them.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', tears: lt => lt > 1.0 ? 2 : 1, look: [1, -1], star: { x: -170, y: 40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, CLOUD, { W: '#f4f0ff' }, 760, 700, 18 * k)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 760, 700, 10 * k)
      for (let i = 0; i < 3; i++) drawBits(x, ['WW', 'WW'], { W: '#f4f0ff' }, 560 + i * 50, 860 - i * 40, (8 + i * 3) * k)
      label(x, 790, 1060, 'DREAM: CUTE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a077', key: 'E', accent: SKYB, ending: 'callback',
  title: 'Each sign’s sign | *to text first.*',
  cameos: CAMEOS,
  group: { cap: 'Any reason works. | *Just say hi.*' },
  last: {
    text: 'They texted back: | *“save me a slice?”*',
    draw(x, t, lt) {
      drawBits(x, SLICE, SLICE_C, 540, 1020, 30 * pop01(t, t - lt + 0.8, 0.35, 2), { rot: 0.08 })
      label(x, 540, 1260, 'ALREADY DID.', pop01(t, t - lt + 1.4, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.03 })
      hearts(x, t, 540, 940, t - lt + 1.5, { n: 8, life: 2.0, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
