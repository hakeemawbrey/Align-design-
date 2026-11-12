// r2t0408: star_talk, BELIKE, "Full moon? | Zodiacs *be like.*" (~62 s vertical, signs3kit social cut, music: lofi · G)
//   twelve signs under one full moon, each pushed to the extreme:
//   ♈ howled first, loudest · ♉ went to bed at 8 · ♊ texted everyone "look at the moon" · ♋ waved, it's family
//   · ♌ a selfie with the moon · ♍ cleaned everything at 3 am · ♎ 400 photos, all blurry · ♏ a list of who to forgive
//   · ♐ booked a one-way trip to the moon · ♑ didn't notice, was working · ♒ started a moon podcast · ♓ sobbed, beautiful
//   Ending: lesson.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, laptop, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = '#fff1b0'
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

/** a big glowing full moon with craters */
function moon(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.shadowColor = '#fff1b0'; x.shadowBlur = 50
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.shadowBlur = 0
  x.fillStyle = '#fff4d6'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e8d9b0'; for (const [a, b, c] of [[-0.35, -0.3, 0.2], [0.3, 0.1, 0.14], [-0.1, 0.4, 0.12], [0.35, -0.4, 0.09]]) { x.beginPath(); x.arc(a * r, b * r, c * r, 0, Math.PI * 2); x.fill() }
  x.restore()
}
const CAM_BM = ['..KKK.....', 'KKKKKKKKKK', 'KGGGGGGGGK', 'KGGKKKKGGK', 'KGKWWWWKGK', 'KGKWBBWKGK', 'KGKWWWWKGK', 'KGGKKKKGGK', 'KKKKKKKKKK']
const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', 'KKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Howled first. | *Loudest, too.*', mood: 'wide', look: [1, -1], star: ST, hops: [0.6, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      moon(x, t, 820, 640, 90, pop01(t, P.t0 + 0.1, 0.35, 2))
      bubble(x, 760, 920, 'AWOOOOO!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 50, tail: 'bl' })
      lab(x, 790, 1110, 'NEIGHBOURS: AWAKE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: RED, color: BONE, rot: -0.04, size: 30 })
    } },
  { sign: 'taurus', cap: 'Moon came out. | Taurus *went to bed.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      moon(x, t, 820, 700, 90, pop01(t, P.t0 + 0.1, 0.35, 2))
      lab(x, 800, 900, 'BEDTIME: 8:00 PM', pop01(t, P.t0 + 0.8, 0.3, 2), { bg: LAV, rot: 0.04 })
      lab(x, 800, 1010, 'MOON: UNSEEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: GREY, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Texted everyone: | *“look at the moon.”*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 11)
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: `SENT TO ${n}`, headCol: SUN, lines: [
        ['LOOK AT THE MOON', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['look!!!', SUN, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['are u looking', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
      ] })
    } },
  { sign: 'cancer', cap: 'Waved at the moon. | *It’s family.*', mood: 'heart', look: [1, -1], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      moon(x, t, 810, 720, 110, pop01(t, P.t0 + 0.1, 0.35, 2))
      bubble(x, 800, 960, 'hi mom!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 46, tail: 'bl', col: PINK })
      hearts(x, t, 810, 760, P.t0 + 1.0, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Took a selfie | *with the moon.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 300, 400, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: DEEP, rot: 0.04, border: 10 }, () => {
        moon(x, t, 60, -90, 60, 1)
        signChar(x, t, 'leo', -30, 50, 150, { mood: lt > 1.0 ? 'wink' : 'sparkle', seed: 44, glyph: false })
      })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 46)
      lab(x, 790, 1110, `TAKE ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { bg: GOLD, rot: -0.04, size: 38 })
    } },
  { sign: 'virgo', cap: 'Cleaned the whole house. | *Blamed the moon.*', mood: 'squint', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      card(x, 790, 820, 320, 160, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: INK, rot: 0.03 }, () => txt(x, '3:07 AM', 0, 4, { size: 64, font: MONO, weight: 700, color: MINT }))
      sparkles(x, t, 790, 1000, P.t0 + 0.7, 8, 160, 0.4, [MINT, BONE, SKYB])
      lab(x, 790, 1080, 'SPOTLESS. UNHINGED.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: '400 moon photos. | *All blurry.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAM_BM, { K: INK, G: '#c9c9d8', W: '#ffffff', B: '#5fa8ff' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { outline: null })
      if (lt > 0.6 && Math.sin(t * 22) > 0.6) { x.save(); x.globalAlpha = 0.5; x.fillStyle = '#ffffff'; x.beginPath(); x.arc(790, 880, 160, 0, Math.PI * 2); x.fill(); x.restore() }
      const n = Math.floor(clamp((lt - 0.4) / 1.6) * 400)
      lab(x, 790, 660, `PHOTO ${n}/400`, pop01(t, P.t0 + 0.4, 0.3, 2), { bg: PINK, rot: 0.04, size: 36 })
      lab(x, 790, 1110, 'IN FOCUS: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: GREY, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Wrote a list | of *who to forgive.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'FORGIVE:', 0, -120, { size: 34, font: MONO, weight: 700, color: RED })
        if (lt > 0.8) txt(x, '1. the moon', 0, -40, { size: 34 })
        if (lt > 1.3) txt(x, '2. …thinking', 0, 30, { size: 34, color: GREY })
      })
      lab(x, 790, 1110, 'LIST: IN PROGRESS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: LAV, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Booked a ticket. | *One way. Moon.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.7, 1.4, 2.0],
    front(x, t, lt, P) {
      moon(x, t, 860, 620, 70, pop01(t, P.t0 + 0.1, 0.35, 2))
      card(x, 760, 920, 340, 180, pop01(t, P.t0 + 0.5, 0.35, 2), { bg: SUN, rot: -0.06 }, () => {
        txt(x, 'BOARDING PASS', 0, -50, { size: 26, font: MONO, weight: 700 })
        txt(x, 'EARTH → MOON', 0, 10, { size: 36 }); txt(x, 'RETURN: no', 0, 58, { size: 24, font: MONO, weight: 700, color: RED })
      })
    } },
  { sign: 'capricorn', cap: 'What moon? | *Was working.*', mood: 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      moon(x, t, 870, 600, 60, pop01(t, P.t0 + 0.1, 0.35, 2))
      laptop(x, 760, 1000, pop01(t, P.t0 + 0.3, 0.35, 2), () => {
        x.fillStyle = MINT; for (let i = 0; i < 4; i++) x.fillRect(-100, -50 + i * 28, 80 + ((i * 53) % 110), 12)
      }, { rot: -0.03 })
      lab(x, 790, 1130, 'OVERTIME: ALSO FULL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: GREEN, rot: -0.04, size: 30 })
    } },
  { sign: 'aquarius', cap: 'Started a podcast | *about the moon.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, MIC, { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }, F.x + 200, F.cy + 30, 16 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.2 })
      lab(x, 790, 660, '● REC', pop01(t, P.t0 + 0.5, 0.3, 2), { bg: RED, color: BONE, rot: 0.04, size: 38 })
      lab(x, 790, 1110, 'EPISODE 1 OF 300', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: SKYB, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'Looked up. | *Sobbed. Beautiful.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      moon(x, t, 810, 760, 120, pop01(t, P.t0 + 0.1, 0.35, 2))
      lab(x, 800, 1060, 'TISSUES: 1 BOX', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: SKYB, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0408', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Full moon? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'One moon. | *Twelve meltdowns.*',
    draw(x, t, lt) { moon(x, t, 540, 760, 70, pop01(t, t - lt + 0.4, 0.4, 2)) },
  },
  lesson: { text: 'Feel it all tonight. | Then *get some rest.*', chip: 'MOOD: GLOWING' },
  last: { text: 'Goodnight, moon. | *Taurus left at 8.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
