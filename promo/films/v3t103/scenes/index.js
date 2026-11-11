// v3t103: THE SIGNS AS… v3, "Waiting for a text | be like." (topic: waiting for a text back) (~59 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme version of itself while waiting for a reply. Ending: lesson.
//   aries drove over after four seconds · taurus baked bread · gemini told eight friends · cancer swaddled the phone
//   · leo posted a selfie so they'd notice · virgo found a typo in their own text · libra drafted two replies
//   · scorpio will reply in two hours · sagittarius forgot and learned guitar · capricorn set a deadline: EOD
//   · aquarius sent a carrier pigeon · pisces sobbed with joy at three dots
//  49.2 "Nobody put | the phone *down.*"  · LESSON "They'll reply. | *You* come first."  · last: the pigeon is back: "lol."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', GREY = '#8a87a8'

const CAR = [
  '...RRRRRR.....',
  '..RWWRRWWR....',
  '.RRWWRRWWRRRR.',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRY',
  '.KKK.....KKK..',
  '.KGK.....KGK..',
]
const CAR_C = { R: RED, W: SKYB, Y: GOLD, K: INK, G: GREY }
const LOAF = [
  '..BBBBBBB..',
  '.BbBBbBBbB.',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  '.BBBBBBBBB.',
]
const LOAF_C = { B: '#c98f4a', b: '#f0c27a' }
const PHONE = [
  'KKKKKKK',
  'KSSSSSK',
  'KSSSSSK',
  'KSSSSSK',
  'KSSSSSK',
  'KSSSSSK',
  'KKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff' }
const SWADDLE = [
  '...PPPP...',
  '..PKKKKP..',
  '.PPKSSKPP.',
  'PPPKSSKPPP',
  'PWPPPPPPWP',
  'PPPWPPWPPP',
  '.PPPPPPPP.',
  '..PPPPPP..',
]
const SWADDLE_C = { P: '#ffc2d4', W: '#fff4e2', K: '#2a2350', S: '#8fe3ff' }
const GUITAR = [
  '.........KK',
  '........KK.',
  '.......BK..',
  '......BB...',
  '..OOOBB....',
  '.OOOOOO....',
  'OOOKOOO....',
  'OOOOOOO....',
  '.OOOOO.....',
  '..OOO......',
]
const GUITAR_C = { K: INK, B: BROWN, O: '#e8865a' }
const PIGEON = [
  '...GGG.......',
  '..GGKGG......',
  '.YGGGGG......',
  '...GGGGGGG...',
  '...GPPGGGGGG.',
  '....GGGGGGGGG',
  '.....GGGGG...',
  '......Y..Y...',
]
const PIGEON_C = { G: '#a9a7c4', K: INK, Y: '#ffb34a', P: '#c9a6ff' }
const DOTS = ['WWWWWWWWWWWW', 'WKWWWKWWWKWW', 'WWWWWWWWWWWW']

function phoneScreen(x, cx, cy, k, lines, { rot = 0.04, w = 260, h = 420 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 30, w - 28, h - 60)
  lines(x, w, h)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Waited four seconds. | *Drove over.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', star: { x: -180 }, hops: [0.9, 1.2],
    front(x, t, lt, P) {
      const s = Math.min(4, Math.floor(lt / 0.25))
      label(x, 790, 640, `WAITED: 0:0${s}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      const d = ease.outCubic(prog(lt, 1.0, 1.5))
      drawBits(x, CAR, CAR_C, lerp(1100, 800, d), 920, 20, { alpha: clamp(d * 3) })
      bubble(x, 800, 1120, 'I’m outside', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Phone face down. | *Baked bread.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: INK, S: '#2a2350' }, 640, 1100, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.PI / 2 })
      for (let i = 0; i < 3; i++) drawBits(x, LOAF, LOAF_C, 820, 960 - i * 110, 16 * pop01(t, P.t0 + 0.6 + i * 0.4, 0.3, 2))
      label(x, 800, 640, 'LOAF 3', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told *eight friends* | about it. Live.', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const W = ['no reply yet', 'update: none', 'still nothing', 'ok so…', 'BREAKING', 'nothing', 'thoughts?', 'help']
      for (let i = 0; i < 8; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2)
        bubble(x, 690 + (i % 2) * 190, 600 + Math.floor(i / 2) * 140, W[i], k, { size: 26, tail: i % 2 ? 'br' : 'bl', col: i % 3 ? BONE : '#fff1b0' })
      }
    } },
  { sign: 'cancer', cap: 'Swaddled the phone. | *Rocked it.*', mood: 'heart', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      const r = Math.sin(t * 3.2) * 0.18
      drawBits(x, SWADDLE, SWADDLE_C, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: r })
      bubble(x, 800, 640, 'shh, they’ll | text soon', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      hearts(x, t, 800, 1060, P.t0 + 1.2, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Posted a selfie | so they’d *notice.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      const likes = Math.floor(clamp((lt - 0.5) / 1.6) * 999)
      phoneScreen(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), (x, w, h) => {
        x.fillStyle = '#ffd23a'; x.fillRect(-w / 2 + 30, -h / 2 + 50, w - 60, 200)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillStyle = '#fff4e2'; x.fillText(`♥ ${likes}`, 0, 90)
        x.fillStyle = PINK; x.font = `700 22px ${MONO}`; x.fillText('them: 0', 0, 140)
      })
      sparkles(x, t, 790, 760, P.t0 + 0.8, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Reread their own text. | Found *a typo.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 820, 'see you | tomorow!', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, col: SKYB, tail: 'br' })
      if (lt > 1.2) { x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(810, 850, 120, 40, -0.05, 0, Math.PI * 2 * clamp((lt - 1.2) / 0.4)); x.stroke(); x.restore() }
      label(x, 790, 1080, 'TOMORROW. 2 Rs.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Drafted two replies. | *Can’t pick* one.', mood: lt => Math.floor(lt * 1.6) % 2 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 1.6) % 2 ? 1 : -1, 0], star: { x: 0, y: 70, s: 250 },
    front(x, t, lt, P) {
      bubble(x, 340, 640, 'yay!! 🎉'.replace(' 🎉', ''), pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, col: '#fff1b0', tail: 'br' })
      bubble(x, 740, 640, 'cool.', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 48, col: BONE, tail: 'bl' })
      label(x, 540, 1140, 'DRAFT 41', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'They took an hour? | Scorpio takes *two.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 136, 0, Math.PI * 2); x.fill()
        const a = -Math.PI / 2 + clamp(lt / 2) * Math.PI * 4
        x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 110, Math.sin(a) * 110); x.stroke()
        x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a / 12 - 1.4) * 70, Math.sin(a / 12 - 1.4) * 70); x.stroke()
        x.restore()
      }
      label(x, 790, 1090, 'REPLYING AT 2:00:01', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: '#c94a8a', color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Forgot they texted. | Learned *guitar.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      drawBits(x, GUITAR, GUITAR_C, F.x + 150, F.cy + 30, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      label(x, 790, 640, 'DAY 3 OF GUITAR', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1110, '1 UNREAD · OOPS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Set a reply deadline. | *End of business.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phoneScreen(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), (x, w, h) => {
        x.fillStyle = '#fff4e2'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('REMINDER', 0, -110)
        x.font = `700 24px ${MONO}`; x.fillStyle = MINT; x.fillText('reply due', 0, -40); x.fillText('5:00 PM', 0, 0)
        x.fillStyle = PINK; x.fillText('(firm)', 0, 50)
      })
      label(x, 790, 1130, 'NO EXTENSIONS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Distrusts phones. | Sent a *carrier pigeon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.4, 1.6))
      drawBits(x, PIGEON, PIGEON_C, lerp(560, 830, fly), lerp(900, 720, fly) + Math.sin(t * 9) * 8, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 1080, 'ETA: TUESDAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw the three dots. | *Wept* with joy.', mood: lt => lt > 1.0 ? 'heart' : 'wide', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      const b = Math.floor(t * 3) % 3
      drawBits(x, DOTS, { W: '#fff4e2', K: b === 0 ? INK : '#6b62a8' }, 800, 860, 30 * k)
      label(x, 800, 1080, 'THEY’RE TYPING!!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04 })
      hearts(x, t, 380, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3t103', key: 'E', accent: SKYB, ending: 'lesson',
  title: 'Waiting for a text | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody put | the phone *down.*' },
  lesson: { text: 'They’ll reply. | *You* come first.', chip: 'PHONE: DOWN' },
  last: {
    text: 'The pigeon’s back. | It says *“lol.”*',
    draw(x, t, lt) {
      const fly = ease.outCubic(clamp(lt / 1.0))
      drawBits(x, PIGEON, PIGEON_C, lerp(1200, 440, fly), 800 + Math.sin(t * 9) * 8, 20, { sx: -1 })
      if (lt > 1.0) label(x, 680, 760, 'lol', pop01(t, t - lt + 1.0, 0.3, 2.4), { size: 44, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
