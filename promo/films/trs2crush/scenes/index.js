// trs2crush: THE SIGNS AS… texting their crush. (~64 s vertical, signs2kit v2 calm cut, music: lofi · F)
// Story, then the shared end card. The format look lives in ../../signs2kit.js.
//   0.0–3.6    "The signs texting | their *crush.*"  The twelve line up for roll call, then dive into the pip row.
//   3.6–49.2   the roll call, one stage card per sign (3.8 s each):
//              ♈ texted first, instantly · ♉ waited three days for the moment · ♊ drafted five, sent the first
//              · ♋ asked if they ate today · ♌ sent a selfie "by accident" · ♍ proofread one "hey" ten times
//              · ♎ torn between hi and hey · ♏ left them on read, on purpose · ♐ voice note from a mountain
//              · ♑ scheduled the text for 9 a.m. · ♒ opened with a fun fact · ♓ cried because they said goodnight
//  49.2        "Everyone *hit send.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Just say | *hi.*"  MESSAGE: DELIVERED
//  58.3        "*Delivered* with love."  Hearts rise.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, outK,
  GOLD, BONE, PINK, INK, MINT, LAV,
} from '../../signs2kit.js'

// ── props
const CAL = [
  'RR.RR.RR.R',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  'WWWWWWWWWW',
]
const CAL_C = { R: '#e23d4e', W: '#fff4e2' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSSYYSSK',
  'KSYYYYSK',
  'KSYKYKSK',
  'KSYYYYSK',
  'KSSYYSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', Y: GOLD, G: '#6b62a8' }
const MOUNTAIN = [
  '.....W.....',
  '....WWW....',
  '...WWGWW...',
  '..GGGGGGG..',
  '.GGGGGGGGG.',
  'GGGGGGGGGGG',
]
const MOUNTAIN_C = { W: '#ffffff', G: '#6b62a8' }
const TICK = ['....R', '...R.', 'R.R..', '.R...']

const CAMEOS = [
  { sign: 'aries', cap: 'Texted first. | *Instantly.*', mood: 'sparkle', star: { x: -150 }, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'hey!! want to | grab a snack?', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1080, 'SENT', pop01(t, P.t0 + 0.9, 0.3, 2), { bg: MINT, rot: 0.06 })
    } },
  { sign: 'taurus', cap: 'Waited three days | for *the moment.*', mood: lt => lt < 1.8 ? 'sleepy' : 'happy', star: { x: -150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, CAL, CAL_C, 790, 780, 22 * k, { rot: 0.05 })
      const n = 1 + Math.min(2, Math.floor(Math.max(0, lt - 0.4) / 0.6))
      label(x, 790, 810, `DAY ${n}`, k, { size: 40, bg: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Drafted *five* versions. | Sent the first.', mood: lt => lt > 1.9 ? 'wink' : 'happy', star: { x: -150 },
    front(x, t, lt, P) {
      const DR = ['hey', 'hi!', 'hello there', 'heyyy', 'good morning']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.32))
      const done = lt > 1.9
      label(x, 780, 600, done ? 'SENT: DRAFT 1' : `DRAFT ${n + 1} / 5`, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: done ? MINT : GOLD, rot: 0.05 })
      bubble(x, 780, 760, done ? DR[0] : DR[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Asked if they | *ate today.*', mood: 'sparkle', star: { x: -150 },
    front(x, t, lt, P) {
      bubble(x, 770, 650, 'did you eat | today?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 780, 1000, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Sent a selfie. | *By accident.*', mood: lt => (lt > 1.2 ? 'wink' : 'sparkle'), star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PHONE, PHONE_C, 790, 800, 20 * k, { rot: 0.08 })
      const q = lt - 0.7
      if (q > 0 && q < 0.3) { x.save(); x.globalAlpha = 1 - q / 0.3; x.fillStyle = '#fffbea'; x.beginPath(); x.arc(790, 800, 80 + q * 300, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 610, 'oops (not oops)', pop01(t, P.t0 + 1.3, 0.3, 2), { bg: '#ffb34a', rot: -0.06 })
    } },
  { sign: 'virgo', cap: 'Proofread one *“hey”* | ten times.', mood: lt => lt > 2.0 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'hey', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 52, tail: 'bl' })
      for (let n = 0; n < 10; n++) {
        if (lt > 0.5 + n * 0.15) drawBits(x, TICK, { R: '#e23d4e' }, 640 + (n % 5) * 70, 830 + Math.floor(n / 5) * 60, 8)
      }
    } },
  { sign: 'libra', cap: 'Torn between *hi* | and hey.', mood: lt => lt > 2.0 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const w = lt < 2.0 ? (Math.floor(lt * 2.5) % 2 ? 'hey' : 'hi') : 'hi…hey?'
      bubble(x, 780, 700, w, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Left them on read. | *On purpose.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      bubble(x, 780, 650, 'hey you!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      label(x, 800, 790, 'SEEN', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: '#c9c4d8', rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Sent a voice note. | From *a mountain.*', mood: 'sparkle', star: { x: 150, y: -20, s: 280 }, hops: [0.4],
    back(x, t, lt, P) {
      drawBits(x, MOUNTAIN, MOUNTAIN_C, 320, 960, 29 * pop01(t, P.t0 + 0.1, 0.3, 2), { alpha: 0.95 })
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k <= 0.01) return
      // the voice note: a little bubble of sound bars
      x.save(); x.translate(330, 640); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-165, -50, 330, 100); x.fillStyle = BONE; x.fillRect(-160, -45, 320, 90)
      x.fillStyle = '#c97bff'
      for (let i = 0; i < 12; i++) { const h = 14 + 44 * Math.abs(Math.sin(i * 1.7 + lt * 4)); x.fillRect(-130 + i * 22, -h / 2, 12, h) }
      x.restore()
    } },
  { sign: 'capricorn', cap: 'Scheduled the text. | *For 9 a.m.*', mood: lt => lt < 1.3 ? 'neutral' : 'happy', star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(310, 780); x.scale(k, k)
      for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d < 6.5) { x.fillStyle = d > 5.4 ? INK : '#f4e8cc'; x.fillRect(i * 14 - 7, j * 14 - 7, 14, 14) } }
      const h = lerp(8, 9, ease.inOutCubic(prog(lt, 0.4, 1.3)))
      const ha = (h / 12) * Math.PI * 2 - Math.PI / 2, ma = (h % 1) * Math.PI * 2 - Math.PI / 2
      x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'square'
      x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 40, Math.sin(ha) * 40); x.stroke()
      x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 62, Math.sin(ma) * 62); x.stroke()
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 310, 920, 'SEND AT 9:00', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: '#2fc79a', rot: -0.05 })
    } },
  { sign: 'aquarius', cap: 'Opened with | *a fun fact.*', mood: 'happy', star: { x: -170 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      bubble(x, 750, 660, 'octopuses have | three hearts!', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'They said goodnight. | *Pisces cried.*', mood: lt => lt < 1.1 ? 'sparkle' : 'wide', tears: lt => lt < 1.1 ? 2 : 3, star: { x: -150 },
    front(x, t, lt, P) {
      bubble(x, 780, 650, 'goodnight!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      hearts(x, t, 790, 980, P.t0 + 1.2, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'trs2crush', key: 'F', accent: '#ffd23a',
  title: 'The signs texting | their *crush.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone *hit send.*' },
  lesson: { text: 'Just say | *hi.*', chip: 'MESSAGE: DELIVERED' },
  last: {
    text: '*Delivered* with love.',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
