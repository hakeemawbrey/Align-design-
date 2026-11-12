// r2t0131: THE SIGNS AS… v3, "Every sign | as a cat." (~59 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs, each the most extreme cat version of itself. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Every sign | *as a cat.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ knocked the glass off, held eye contact · ♉ screaming for dinner at 5:59 · ♊ wants out, in, out
//              · ♋ brought you a gift: one sock · ♌ found the only sunbeam, made it VIP · ♍ one speck in the litter, filed
//              a complaint · ♎ you opened the door, still deciding · ♏ sat on your birth chart, judged it
//              · ♐ slipped out for a minute, came back with a passport · ♑ sat in a box, called it the office
//              · ♒ ignored every toy, loves a bottle cap · ♓ watched a bird outside, wept
//  49.2        "Nine lives. | *Zero chill.*"
//  52.4        LESSON UNLOCKED: "Be a little odd. | Your people *love it.*"  STATUS: PURRING
//  58.3        "Aries just knocked | *this video off.*"  (the glass comes back and falls)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP } from './props.js'

const GLASS = ['W......W', 'WSSSSSSW', 'WSSSSSSW', 'WSSSSSSW', 'WSSSSSSW', '.WSSSSW.', '.WWWWWW.']
const GLASS_C = { W: '#e8f6ff', S: SKYB }
const BOWL = ['K..........K', 'KKKKKKKKKKKK', '.KRRRRRRRRK.', '..KKKKKKKK..']
const BOWL_C = { K: INK, R: RED }
const SOCK = ['..PPPP', '..PWWP', '..PPPP', '..PPPP', '..PPPP', 'PPPPPP', 'PPPPPP', 'WWPPP.']
const SOCK_C = { P: PINK, W: CREAM }
const CAP = ['.YYYYYY.', 'YKYKYKYY', 'YYYYYYYY', '.YYYYYY.']
const CAP_C = { Y: GOLD, K: '#c98f2a' }
const BIRD = ['..BB..', '.BBKB.', 'BBBBBO', '.BBBB.', '..BB..']
const BIRD_C = { B: SKYB, K: INK, O: ORANGE }
const MOUSE = ['..GG...', '.GGGG.G', 'GGKGGGG', '.GGGG..']
const BALL = ['.RRRR.', 'RRWRRR', 'RRRRWR', 'RWRRRR', '.RRRR.']

// a door frame: dark doorway, a crack of light
function door(x, cx, cy, k, open = 1) {
  card(x, cx, cy, 230, 400, k, { bg: '#6b4a2e', rot: 0 }, () => {
    x.fillStyle = '#fff1b0'; x.fillRect(-100, -184, 200 * open, 370)
    x.fillStyle = '#3a2a40'; x.fillRect(-100 + 200 * open, -184, 200 * (1 - open), 370)
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Knocked the glass off. | *Held eye contact.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [-1, 0], star: { x: -170 }, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      card(x, 800, 900, 300, 26, k, { bg: WOOD, rot: 0, border: 5 })
      const f = ease.inQuad(prog(lt, 0.9, 1.4)), slide = ease.outCubic(prog(lt, 0.4, 0.9))
      drawBits(x, GLASS, GLASS_C, lerp(780, 950, slide) + f * 60, 850 + f * 300, 13 * k, { rot: f * 2.2, alpha: lt > 1.4 ? 0 : 1 })
      if (lt > 1.4) for (let i = 0; i < 6; i++) { x.fillStyle = SKYB; x.fillRect(930 + Math.cos(i) * 40 * prog(lt, 1.4, 1.7), 1170 - Math.abs(Math.sin(i * 1.3)) * 30, 12, 8) }
    },
    front(x, t, lt, P) {
      label(x, 790, 640, 'NO REGRETS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: RED, color: CREAM, rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Dinner’s at six. | Screaming *at 5:59.*', mood: lt => lt > 0.8 ? 'wide' : 'neutral', star: { x: -170 }, hops: [0.8, 1.3],
    front(x, t, lt, P) {
      clock(x, 790, 700, 110, pop01(t, P.t0 + 0.15, 0.3, 2), 5, 59)
      drawBits(x, BOWL, BOWL_C, 790, 1050, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 960, 'EMPTY', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 420, 590, 'FEED ME', pop01(t, P.t0 + 0.8, 0.25, 2.2) * (1 + 0.05 * Math.sin(t * 20)), { size: 52, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Wants out. Wants in. | *Wants out.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), n = Math.floor(lt * 2.4) % 2
      door(x, 790, 860, k, n ? 0.15 : 0.85)
      label(x, 790, 610, n ? 'IN' : 'OUT', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: n ? MINT : GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, `TRIP ${1 + Math.floor(lt * 2.4)}`, pop01(t, P.t0 + 1.0, 0.3, 2), { size: 32, bg: PINK, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Brought you a gift. | It’s *one sock.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, SOCK, SOCK_C, lerp(F.x + 120, 800, ease.outCubic(prog(lt, 0.3, 0.9))), 900, 22 * k, { rot: -0.2 })
      label(x, 800, 1110, 'FOR YOU ♡', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 36, bg: PINK, rot: -0.05 })
      hearts(x, t, 800, 820, P.t0 + 1.1, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
      bubble(x, 800, 640, 'you’re welcome', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Found the only sunbeam. | Made it *VIP.*', mood: 'sparkle', star: { x: -150 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.2, 0.6))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(480, 480); x.lineTo(620, 480); x.lineTo(560, 1180); x.lineTo(220, 1180); x.closePath(); x.fill()
      x.globalAlpha = 0.5 * k; x.beginPath(); x.ellipse(390, 1150, 190, 34, 0, 0, Math.PI * 2); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (k > 0.01) { x.fillStyle = RED; x.fillRect(610, 1020 - 6, 330 * k, 12); for (const px of [610, 940]) { x.fillStyle = GOLD; x.fillRect(px - 8, 960, 16, 130 * k) } }
      label(x, 790, 860, 'VIP ONLY', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 390, 860, P.t0 + 0.6, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'One speck in the litter. | Filed *a complaint.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 330, pop01(t, P.t0 + 0.25, 0.3, 2), { bg: CREAM, rot: 0.05 }, () => {
        x.fillStyle = '#6b62a8'; x.fillRect(-130, -165, 260, 60)
        txt(x, 'COMPLAINT', 0, -134, { size: 30, color: CREAM })
        for (let i = 0; i < 4; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-100, -70 + i * 50, 200 * clamp((lt - 0.5 - i * 0.15) * 4), 12) }
        txt(x, 're: 1 speck', 0, 135, { size: 28, font: MONO, weight: 700, color: RED })
      })
      label(x, 790, 650, 'URGENT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.06 })
    } },
  { sign: 'libra', cap: 'You opened the door. | *Still deciding.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      door(x, 800, 850, pop01(t, P.t0 + 0.15, 0.3, 2), 0.9)
      bubble(x, 800, 610, Math.floor(lt * 2) % 2 ? 'in?' : 'out?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 1110, `MINUTE ${12 + Math.floor(lt * 12)}`, pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Sat on your birth chart. | *Judged it.*', mood: lt => lt > 1.3 ? 'eyeroll' : 'neutral', star: { x: 0, y: -60, s: 260 },
    back(x, t, lt, P) { chart(x, 540, 1010, 170, pop01(t, P.t0 + 0.05, 0.35, 2), t, 0.05) },
    front(x, t, lt, P) {
      label(x, 800, 620, 'MOON IN WHAT?', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.05 })
      label(x, 290, 700, 'HMM.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: BONE, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Out for a minute. | Back *with a passport.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      card(x, 790, 860, 220, 300, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: '#2f5fa8', rot: 0.08 }, () => {
        x.fillStyle = GOLD; x.beginPath(); x.arc(0, -30, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2f5fa8'; x.beginPath(); x.arc(0, -30, 38, 0, Math.PI * 2); x.fill()
        txt(x, 'PASSPORT', 0, 80, { size: 28, font: MONO, weight: 700, color: GOLD })
      })
      const STAMPS = [[700, 700, RED], [880, 760, MINT], [720, 1040, GOLD], [890, 1000, PINK]]
      STAMPS.forEach(([sx, sy, c], i) => label(x, sx, sy, 'STAMP', pop01(t, P.t0 + 0.9 + i * 0.2, 0.25, 2.4), { size: 24, bg: c, rot: -0.2 + i * 0.12, font: MONO, weight: 700 }))
    } },
  { sign: 'capricorn', cap: 'Sat in a box. | Called it *the office.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', star: { x: -150, y: -30 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      card(x, F.x, 1060, 340, 170, k, { bg: '#c8975a', rot: 0 }, () => { x.fillStyle = '#a57a44'; x.fillRect(-170, -85, 340, 22); txt(x, 'CEO', 0, 20, { size: 54, color: INK }) })
      label(x, 790, 700, 'IN A MEETING', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: '#2fc79a', rot: 0.05 })
      bubble(x, 800, 880, 'book a slot', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Ignored every toy. | Loves *a bottle cap.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, MOUSE, { G: GREY, K: INK }, 700, 1100, 12 * k, { alpha: 0.6 })
      drawBits(x, BALL, { R: RED, W: CREAM }, 900, 1110, 12 * k, { alpha: 0.6 })
      label(x, 800, 1010, 'UNTOUCHED', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 26, bg: GREY, rot: -0.05, font: MONO, weight: 700 })
      const c = pop01(t, P.t0 + 1.0, 0.35, 2.2)
      drawBits(x, CAP, CAP_C, 800, 780, 22 * c, { rot: 0.2 * Math.sin(t * 5) })
      sparkles(x, t, 800, 780, P.t0 + 1.1, 7, 130, 0.3)
      label(x, 800, 640, 'MY FAVOURITE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'Watched a bird outside. | *Wept.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 790, 280, 300, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: '#8fd0ff', rot: 0 }, () => {
        x.fillStyle = INK; x.fillRect(-6, -150, 12, 300); x.fillRect(-140, -6, 280, 12)
        drawBits(x, BIRD, BIRD_C, 60 + 6 * Math.sin(t * 4), -60, 12)
      })
      label(x, 800, 1060, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.05 })
      hearts(x, t, 800, 700, P.t0 + 1.0, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0131', key: 'C', accent: '#ffb34a', ending: 'lesson',
  title: 'Every sign | *as a cat.*',
  cameos: CAMEOS,
  group: { cap: 'Nine lives. | *Zero chill.*' },
  lesson: { text: 'Be a little odd. | Your people *love it.*', chip: 'STATUS: PURRING' },
  last: {
    text: 'Aries just knocked | *this video off.*',
    draw(x, t, lt) {
      const f = ease.inQuad(prog(lt, 0.9, 1.8))
      drawBits(x, GLASS, GLASS_C, 540 + f * 140, 1050 + f * 700, 18 * pop01(lt, 0.3, 0.3, 2), { rot: f * 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
