// v3a042: star_advice, ADVICE ROLLCALL, "Each sign's | daily reminder." (topic: reminder for today; shortened to fit two lines) (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm reminder each with one light visual gag. Ending: 'lesson'.
//   0.0–3.6    "Each sign's | *daily reminder.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ strolls past the finish line with a flower · ♉ new slippers: APPROVED · ♊ 47 tabs → 1
//              · ♋ a big heart: SIZE: PERFECT · ♌ empty seats, PRIDE: FULL · ♍ a wobbly drawing, ON THE FRIDGE
//              · ♎ the vote slips in: COUNTED · ♏ puts the magnifier down: CASE CLOSED · ♐ the signpost: COUCH
//              · ♑ the output chart turns into a heart · ♒ "need company?" ALONE TIME: PAUSED · ♓ cries, then a glass of water
//  49.2        "Small steps. | *Still steps.*"  group photo.
//  52.4        LESSON UNLOCKED: "Be gentle with yourself. | *Today counts.*"  REMINDER: SET
//  58.3        "Save this | *for tomorrow too.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', TEAL = '#2fc79a', SUN = '#ffd23a'

function slab(x, cx, cy, w, h, k, { bg = BONE, rot = 0, inner = null, pad = 14 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (inner) { x.fillStyle = inner; x.fillRect(-w / 2 + pad, -h / 2 + pad, w - 2 * pad, h - 2 * pad) }
  return true
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..', '..G..']
const SLIPPER = ['....PPPPPP..', '..PPwwwwwwP.', '.PPwwwwwwwwP', 'PPPPPPPPPPPP', 'SSSSSSSSSSSS']
const SLIPPER_C = { P: PINK, w: '#fff4e2', S: '#8a4a2e' }
const BIGHEART = ['.HHH...HHH.', 'HHHHH.HHHHH', 'HWHHHHHHHHH', 'HHHHHHHHHHH', '.HHHHHHHHH.', '..HHHHHHH..', '...HHHHH...', '....HHH....', '.....H.....']
const SEAT = ['.RRRR.', 'RRRRRR', 'RRRRRR', 'rrrrrr', 'R....R']
const GLASS = ['W......W', 'W......W', 'WBBBBBBW', 'WBbBBBBW', 'WBBBBBBW', 'WBBBBbBW', '.WBBBBW.', '..WWWW..']
const GLASS_C = { W: '#e6f6ff', B: '#6fc3ff', b: '#c9f1ff' }

const CAMEOS = [
  { sign: 'aries', cap: "You don't have to | *win today.*", mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -150 }, hops: [0.5, 1.0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k)
        x.fillStyle = INK; x.fillRect(650, 640, 16, 470); x.fillRect(920, 640, 16, 470)
        x.fillStyle = BONE; x.fillRect(654, 644, 8, 462); x.fillRect(924, 644, 8, 462)
        for (let i = 0; i < 9; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? INK : BONE; x.fillRect(666 + i * 28.5, 650 + j * 28, 28.5, 28) }
        x.fillStyle = RED; x.fillRect(666, 900, 254, 10)
        x.restore()
      }
    },
    front(x, t, lt, P, F) {
      drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: '#5fd068' }, F.x + 140, F.cy + 10, 11 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.2 })
      label(x, 790, 1150, 'WALKING IS ALLOWED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'New can still be | *cozy.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 1], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, SLIPPER, SLIPPER_C, 740, 1020, 16 * k)
      drawBits(x, SLIPPER, SLIPPER_C, 870, 1000, 16 * k, { sx: -1 })
      label(x, 800, 660, 'NEW SLIPPERS:', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 750, 'APPROVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.04 })
      sparkles(x, t, 800, 1000, P.t0 + 1.3, 7, 170, 0.4)
    } },
  { sign: 'gemini', cap: 'One tab at a time | is *enough.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 790, 860, 340, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2a2350', rot: 0.03 })) {
        const n = lt < 0.9 ? 47 : 1
        const shown = Math.min(n, 14)
        for (let i = 0; i < shown; i++) { x.fillStyle = i === 0 ? '#fff4e2' : ['#6b62a8', '#8a80c8'][i % 2]; x.fillRect(-160 + i * (n === 1 ? 0 : 22.8), -140, n === 1 ? 150 : 21, 34) }
        if (n === 1) txt(x, 'one thing', -85, -122, 22, INK, INTER, 800)
        x.fillStyle = '#fff4e2'; x.fillRect(-160, -100, 320, 236)
        txt(x, `TABS: ${n}`, 0, 20, 54, n === 1 ? TEAL : RED, MONO, 700)
        x.restore()
      }
      label(x, 790, 1100, 'BRAIN: QUIET', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: "Your feelings | *aren't too much.*", mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = pop01(t, P.t0 + 0.3, 0.4, 1.6) * (1 + 0.5 * ease.outBack(prog(lt, 0.6, 1.2))) * (1 + 0.04 * Math.sin(t * 9))
      drawBits(x, BIGHEART, { H: '#ff4f86', W: '#fff' }, 790, 860, 17 * g)
      label(x, 790, 1120, 'SIZE: PERFECT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'No audience needed | to be *proud.*', mood: 'sparkle', star: { x: 0, y: -40, s: 280 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) drawBits(x, SEAT, { R: '#b03050', r: '#7a1f38' }, 215 + i * 130 + r * 40, 1040 + r * 90, 13 * k)
      label(x, 290, 640, 'SEATS: EMPTY', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 640, 'PRIDE: FULL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 540, 780, P.t0 + 1.3, 8, 200, 0.6)
    } },
  { sign: 'virgo', cap: 'Done is better | than *perfect.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 790, 840, 280, 330, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#f2f2f6', rot: 0.06 })) {
        // a wobbly crayon star drawing with a magnet on top
        x.strokeStyle = '#ff6b5a'; x.lineWidth = 8; x.beginPath()
        for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = (i % 2 ? 44 : 104) + 9 * Math.sin(i * 3.1); i ? x.lineTo(Math.cos(a) * r + 6 * Math.sin(i), Math.sin(a) * r + 10) : x.moveTo(Math.cos(a) * r, Math.sin(a) * r + 10) }
        x.stroke(); x.fillStyle = INK; x.fillRect(-36, 60, 10, 10); x.fillRect(20, 52, 10, 10)
        x.fillStyle = '#6fc3ff'; x.fillRect(-26, -180, 52, 34)
        x.restore()
      }
      label(x, 790, 1110, 'ON THE FRIDGE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Your opinion | *counts too.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (slab(x, 800, 960, 260, 200, k, { bg: '#6b62a8', rot: 0 })) {
        x.fillStyle = INK; x.fillRect(-70, -100, 140, 14); txt(x, 'VOTES', 0, 20, 40, '#fff4e2')
        x.restore()
      }
      const d = ease.inCubic(prog(lt, 0.5, 1.1))
      if (lt > 0.4 && d < 1) { x.save(); x.translate(800, lerp(640, 860, d)); x.rotate(0.1); x.fillStyle = INK; x.fillRect(-60, -40, 120, 80); x.fillStyle = '#fff4e2'; x.fillRect(-54, -34, 108, 68); txt(x, '✓ ME', 0, 2, 30); x.restore() }
      label(x, 800, 1140, 'YOUR VOTE: COUNTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 1.1, 7, 150, 0.2)
    } },
  { sign: 'scorpio', cap: 'Not everything | needs *investigating.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 800, 900, 300, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#e8c27a', rot: -0.04 })) {
        x.fillStyle = '#d4a85a'; x.fillRect(-150, -110, 120, 30)
        txt(x, 'CASE:', 0, -40, 34, INK, MONO, 700); txt(x, 'why they', 0, 10, 34, INK, INTER, 800); txt(x, 'said "hey"', 0, 52, 34, INK, INTER, 800)
        if (lt > 1.2) { x.save(); x.rotate(-0.2); x.fillStyle = 'rgba(255,244,226,0.85)'; x.fillRect(-120, -42, 240, 84); x.strokeStyle = RED; x.lineWidth = 7; x.strokeRect(-120, -42, 240, 84); txt(x, 'CLOSED', 0, 2, 52, RED, MONO, 700); x.restore() }
        x.restore()
      }
      const down = ease.inOutCubic(prog(lt, 0.6, 1.1))
      const gx = lerp(680, 900, down), gy = lerp(690, 1080, down)
      if (lt > 0.2) { x.save(); x.translate(gx, gy); x.rotate(lerp(-0.6, 0.4, down)); x.fillStyle = INK; x.fillRect(-8, 40, 20, 90); x.fillStyle = '#8a4a2e'; x.fillRect(-4, 44, 12, 82); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 54, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9f1ff'; x.beginPath(); x.arc(0, 0, 42, 0, Math.PI * 2); x.fill(); x.restore() }
    } },
  { sign: 'sagittarius', cap: 'Rest is also | an *adventure.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: { x: -200 }, hops: [0.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-14, -150, 28, 400); x.fillStyle = '#8a4a2e'; x.fillRect(-8, -144, 16, 388)
        const sign = (y, w, text, col, dir) => { x.fillStyle = INK; x.fillRect(-w / 2 - 6, y - 36, w + 12, 72); x.fillStyle = col; x.fillRect(-w / 2, y - 30, w, 60); x.fillStyle = col; x.beginPath(); x.moveTo(dir * (w / 2), y - 30); x.lineTo(dir * (w / 2 + 30), y); x.lineTo(dir * (w / 2), y + 30); x.fill(); txt(x, text, 0, y + 2, 28, INK, MONO, 700) }
        sign(-110, 230, 'EVEREST', '#9aa5c4', -1)
        sign(-20, 230, 'THE JUNGLE', '#9aa5c4', 1)
        if (lt > 1.0) sign(70, 240, 'THE COUCH ✓', GOLD, 1)
        x.restore()
      }
      label(x, 780, 1150, 'DESTINATION: SET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 820, 930, P.t0 + 1.35, 7, 160, 0.5)
    } },
  { sign: 'capricorn', cap: "Your worth isn't | your *output.*", mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 800, 860, 320, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff4e2', rot: 0.03 })) {
        txt(x, 'OUTPUT', 0, -116, 30, INK, MONO, 700)
        const m = ease.inOutCubic(prog(lt, 0.8, 1.3))
        if (m < 1) { x.globalAlpha = 1 - m; const H = [60, 100, 140, 180]; H.forEach((h, i) => { x.fillStyle = '#6fc3ff'; x.fillRect(-120 + i * 64, 120 - h, 44, h) }); x.globalAlpha = 1 }
        if (m > 0) drawBits(x, BIGHEART, { H: '#ff4f86', W: '#fff' }, 0, 20, 17 * m)
        x.restore()
      }
      label(x, 800, 1110, 'STILL ENOUGH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: "It's okay | to need *people.*", mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 800, 940, 210 * k, { mood: 'happy', look: [-1, 0], seed: 35, glyph: false, hops: [P.t0 + 1.4] })
      bubble(x, 800, 650, 'need company?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 540, 1150, 'ALONE TIME: PAUSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cry it out. | Then *drink water.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', tears: lt => lt > 1.4 ? 1 : 3, star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 800, 900, 22 * pop01(t, P.t0 + 0.9, 0.35, 2))
      label(x, 800, 1110, 'HYDRATED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.04 })
      sparkles(x, t, 800, 900, P.t0 + 1.0, 6, 150, 0.3, [SKYB, BONE, GOLD])
    } },
]

const F = makeFilm({
  id: 'v3a042', key: 'E', accent: SUN, ending: 'lesson',
  title: "Each sign's | *daily reminder.*",
  cameos: CAMEOS,
  group: { cap: 'Small steps. | *Still steps.*' },
  lesson: { text: 'Be gentle with yourself. | *Today counts.*', chip: 'REMINDER: SET' },
  last: {
    text: 'Save this | *for tomorrow too.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1050, t - lt + 0.6, 12, 360, 0.3, [SUN, BONE, PINK]); hearts(x, t, 540, 1250, t - lt + 0.8, { n: 8, life: 2, spread: 700, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
