// r2a0244: star_advice, ADVICE ROLLCALL, "How each sign | loves their family." (~62 s vertical, signs3kit social cut,
// music: lofi · E). Twelve signs, one warm, specific line each with a light visual gag. Ending: lesson.
//   0.0–3.6    "How each sign | *loves their family.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one sign per card (3.8 s each):
//              ♈ shows up first, every time · ♉ seconds are love · ♊ keeps the group chat alive · ♋ knows every birthday
//              (and the cake) · ♌ the loudest fan at every recital · ♍ fixes things before you ask · ♎ keeps the peace at
//              dinner · ♏ has your back, always · ♐ brings stories home · ♑ quietly covers the bill · ♒ loves you exactly
//              as you are · ♓ cries at every family photo
//  49.2        "Different ways. | *Same love.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Love looks different. | It’s *all still love.*"  FAMILY: CLOSE
//  58.3        "Call your mom. | *Pisces already did.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, pill, plate, mug, CREAM, RED, ORANGE, SUN, GREY, WOOD, BROWN, GREEN, clamp, prog, lerp, ease } from './props.js'

const ACC = '#ffb3c7'
const CAKE = ['..F.F.F..', '..W.W.W..', 'PPPPPPPPP', 'CCCCCCCCC', 'PPPPPPPPP', 'CCCCCCCCC']
const CAKE_C = { F: ORANGE, W: CREAM, P: PINK, C: '#8a4a2e' }
const SHIELD = [
  'SSSSSSSSS',
  'SRRRRRRRS',
  'SRRHRHRRS',
  'SRRHHHRRS',
  'SRRRHRRRS',
  '.SRRRRRS.',
  '..SRRRS..',
  '...SSS...',
]
const WRENCH = [
  'GG...GG',
  'GGG.GGG',
  '.GGGGG.',
  '..GGG..',
  '..GGG..',
  '..GGG..',
  '..GGG..',
  '..GGG..',
  '..GGG..',
]

const CAMEOS = [
  { sign: 'aries', cap: 'Shows up first. | *Every time.*', mood: 'sparkle', star: { x: -180 }, hops: [0.5, 1.3],
    front(x, t, lt, P) {
      card(x, 790, 820, 260, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: WOOD, rot: 0 }, () => { x.fillStyle = BROWN; x.fillRect(-100, -120, 200, 240); x.fillStyle = GOLD; x.fillRect(60, 0, 20, 20) })
      label(x, 790, 640, 'PARTY STARTS AT 7', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 28, bg: CREAM })
      label(x, 790, 1050, 'ARRIVED: 5:45', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SUN, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Feeds everyone. | *Seconds are love.*', mood: 'heart', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) plate(x, 790, 1010 - i * 46, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), { w: 240 }, () => { x.fillStyle = INK; x.fillRect(-60, -34, 120, 30); x.fillStyle = '#e8a24a'; x.fillRect(-55, -30, 110, 22) })
      bubble(x, 790, 680, 'have more!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Keeps the family chat | *alive.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'FAMILY ♥', headCol: SUN }, () => {
        const M = ['morning!!', 'pic of the dog', 'who took my hat', 'love u all']
        const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.35) + 1)
        for (let i = 0; i < n; i++) pill(x, M[i], (i % 2 ? 12 : -12), -90 + i * 56, 1, { col: i % 2 ? SUN : BONE, size: 22 })
      })
      label(x, 790, 1110, 'NEW: 84', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Knows every birthday. | *And the cake flavor.*', mood: 'heart', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'NANA: LEMON', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: SUN, rot: -0.04 })
      label(x, 790, 1070, 'CUZ: NO RAISINS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: CREAM, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Loudest fan | at *every recital.*', mood: 'sparkle', star: { x: -180 }, hops: [0.6, 1.1, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 800, 320, 190, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: ORANGE, rot: Math.sin(t * 7) * 0.06 }, () => { txt(x, 'THAT’S MY', 0, -36, { size: 34 }); txt(x, 'SISTER!!', 0, 30, { size: 56 }) })
      x.fillStyle = INK; x.fillRect(782, 890, 16, 170 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 800, P.t0 + 1.0, 7, 210, 0.2)
    } },
  { sign: 'virgo', cap: 'Fixes things | *before you ask.*', mood: 'squint', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, WRENCH, { G: GREY }, 760, 860, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.5 + Math.sin(t * 8) * 0.2 * (lt < 1.2 ? 1 : 0) })
      label(x, 800, 650, 'SQUEAKY DOOR', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: CREAM, rot: 0.04 })
      label(x, 800, 1060, 'FIXED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Keeps the peace | *at every dinner.*', mood: 'happy', star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 700, 650, 'well actually—', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (1 - prog(lt, 1.2, 1.4)), { size: 32, col: RED, tail: 'bl' })
      bubble(x, 860, 760, 'no YOU—', pop01(t, P.t0 + 0.6, 0.25, 2.2) * (1 - prog(lt, 1.2, 1.4)), { size: 32, col: ORANGE, tail: 'br' })
      bubble(x, 790, 880, 'more pie, anyone?', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 780, P.t0 + 1.5, { n: 4, life: 1.4, spread: 200, cell: 6, seed: 8 })
    } },
  { sign: 'scorpio', cap: 'Has your back. | *Always.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SHIELD, { S: GREY, R: '#c93d6a', H: PINK }, 790, 860, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1080, 'FAMILY: PROTECTED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Brings the best stories | *home.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      ['MOUNTAINS', 'A CAMEL', 'LOST, FOUND'].forEach((s, i) => card(x, 760 + i * 30, 700 + i * 120, 260, 150, pop01(t, P.t0 + 0.2 + i * 0.4, 0.3, 2), { bg: [SKYB, SUN, MINT][i], rot: (i - 1) * 0.08 }, () => {
        x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(-130, -75, 260, 30); txt(x, 'POSTCARD', 0, -60, { size: 18, font: MONO, weight: 700 }); txt(x, s, 0, 20, { size: 30 })
      }))
    } },
  { sign: 'capricorn', cap: 'Quietly covered | *the whole bill.*', mood: 'neutral', look: [-1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 840, 240, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'BILL', 0, -110, { size: 34, font: MONO, weight: 700 })
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-90, -60 + i * 34, 180 - (i % 2) * 40, 12)
        if (lt > 1.1) { x.save(); x.rotate(-0.2); x.strokeStyle = '#2fa36b'; x.lineWidth = 8; x.strokeRect(-90, 70, 180, 60); txt(x, 'PAID', 0, 100, { size: 42, color: '#2fa36b' }); x.restore() }
      })
      bubble(x, 380, 620, 'don’t mention it', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Loves you | *exactly as you are.*', mood: 'heart', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 900, 200 * k, { mood: 'wide', seed: 61, glyph: false })
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = '#7dffb0'; x.fillRect(740, 760, 100, 20); x.fillRect(770, 700, 40, 70); x.restore()
      label(x, 790, 1090, 'NEW HAIR? ICONIC.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: SKYB })
      hearts(x, t, 790, 800, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: 'pisces', cap: 'Cries at every | *family photo.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 840, 280, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: GOLD, rot: -0.05 }, () => {
        x.fillStyle = '#2a2350'; x.fillRect(-120, -100, 240, 200)
        const ids = ['cancer', 'leo', 'taurus']
        ids.forEach((id, i) => signChar(x, t, id, -70 + i * 70, 10, 80, { mood: 'happy', seed: 80 + i, glyph: false, glow: 0.5 }))
      })
      label(x, 790, 1060, 'EVEN THE BLURRY ONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: LAV })
    } },
]

const F = makeFilm({
  id: 'r2a0244', key: 'E', accent: ACC, ending: 'lesson',
  title: 'How each sign | *loves their family.*',
  cameos: CAMEOS,
  group: { cap: 'Different ways. | *Same love.*' },
  lesson: { text: 'Love looks different. | It’s *all still love.*', chip: 'FAMILY: CLOSE' },
  last: { text: 'Call your mom. | *Pisces already did.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
