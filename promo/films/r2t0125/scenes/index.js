// r2t0125: THE SIGNS AS… v3, ROLLCALL, "The signs at | a hot spring." (~62 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each soaking in the same steamy pool, each the most extreme version of itself.
//   0.0–3.6    "The signs at | a *hot spring.*"
//   3.6–49.2   ♈ cannonballed in (it's 42°C) · ♉ got in, has not left (hour 9) · ♊ befriended every single monkey
//              · ♋ folded the towel into a swan · ♌ wore sunglasses in the steam · ♍ reviewed the water: too wet, 4/5
//              · ♎ toe in, toe out, forty minutes · ♏ hottest pool, didn't blink · ♐ found a secret spring up a mountain
//              · ♑ took a work call from the spring · ♒ asked what the spring's sign is · ♓ so relaxed they cried
//  49.2        "Twelve signs. | *Zero stress.*"
//  52.4        LESSON UNLOCKED: "Everyone unwinds | *their own way.*"  MOOD: SOAKED
//  58.3        "Pisces? | *Still in there.*"  The group photo's Pisces gets a little pool of its own: STILL SOAKING.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#7ee08a', WATER = '#5fb8e8'

// ── props
const STEAM = ['.S.', 'S..', '.S.', '..S', '.S.']
const DROP = ['.D.', 'DDD', 'DDD']
const MONKEY = ['..BBBBB..', '.BBFFFBB.', 'BBFKFKFBB', 'BBFFFFFBB', '.BFFRFFB.', '..BBBBB..', '.BBBBBBB.', 'BB.BBB.BB']
const MONKEY_C = { B: '#9a6a4a', F: '#ffb0a8', K: INK, R: '#e86a8a' }
const SWAN = ['.....WW.', '....WWWK', '....WW..', '....W...', 'WW..W...', 'WWWWWW..', 'WWWWWWW.', '.WWWWW..']
const SHADES = ['KKKKK..KKKKK', 'KSSSKKKKSSSK', 'KSSSK..KSSSK', '.KKK....KKK.']
const THERMO = ['.KK.', 'KWWK', 'KRWK', 'KRWK', 'KRRK', 'KRRK', 'KRRK', 'RRRR', 'RRRR', '.RR.']
const PHONE = ['KKKKKK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KKGGKK']
const MOUNTAIN = ['.....W.....', '....WWW....', '...GGGGG...', '..GGGGGGG..', '.GGGGGGGGG.', 'GGGGGGGGGGG']

// the pool: a steamy water band in front of the star's lower half
function soak(x, t, P, k = 1, y = 1005, cx = 400, w = 250, h = 80) {
  if (P.k <= 0.01) return
  x.save(); x.globalAlpha = 0.86 * clamp(P.k * k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, y + 30, w + 8, h + 8, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = WATER; x.beginPath(); x.ellipse(cx, y + 30, w, h, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 4; i++) x.fillRect(cx - w * 0.7 + i * w * 0.4 + Math.sin(t * 2 + i) * 10, y - 20 + (i % 2) * 22, 50, 6)
  x.restore()
  for (const d of [-1, 1]) drawBits(x, STEAM, { S: BONE }, cx + d * (w - 30), y - 60 - ((t * 40 + (d + 1) * 20) % 70), 10, { alpha: 0.55 * clamp(P.k) })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Cannonballed in. | *It’s 42°C.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', star: { x: -140 }, hops: [0.5],
    front(x, t, lt, P) {
      soak(x, t, P)
      const sp = ease.outCubic(prog(lt, 0.6, 1.2)), fade = 1 - prog(lt, 1.2, 1.8)
      for (let i = 0; i < 9; i++) { const a = -Math.PI * (0.15 + 0.7 * i / 8); drawBits(x, DROP, { D: SKYB }, 400 + Math.cos(a) * 240 * sp, 1000 + Math.sin(a) * 220 * sp, 12, { alpha: fade }) }
      label(x, 800, 760, 'HOT HOT HOT', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Got in. | *Has not left.*', mood: 'sleepy', star: { x: -140 },
    front(x, t, lt, P) {
      soak(x, t, P)
      const h = 1 + Math.floor(clamp((lt - 0.3) / 1.8) * 8)
      label(x, 800, 780, `HOUR ${h}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 60, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'never leaving', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Befriended every | *single monkey.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -140 },
    front(x, t, lt, P) {
      soak(x, t, P, 1, 1040, 540, 400)
      for (let i = 0; i < 3; i++) drawBits(x, MONKEY, MONKEY_C, 680 + i * 100, 1000 - (i % 2) * 30, 11 * pop01(t, P.t0 + 0.4 + i * 0.25, 0.3, 2))
      bubble(x, 800, 760, 'besties!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, tail: 'bl', col: '#fff1a8' })
    } },
  { sign: 'cancer', cap: 'Folded the towel | into *a swan.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -140 },
    front(x, t, lt, P) {
      soak(x, t, P)
      drawBits(x, SWAN, { W: CREAM, K: '#ff9a4a' }, 790, 880, 22 * pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 790, 1090, 'TOWEL ART', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Wore sunglasses. | *In the steam.*', mood: 'happy', star: { x: -140 },
    front(x, t, lt, P, F) {
      soak(x, t, P)
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) { const fog = clamp((lt - 1.0) / 0.8); drawBits(x, SHADES, { K: INK, S: fog > 0.5 ? '#e8eef7' : '#2a2350' }, F.x, F.cy - 4, 12 * k) }
      label(x, 800, 760, 'FOGGED. STILL ICONIC.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Reviewed the water: | *“Too wet.”*', mood: lt => lt > 1.0 ? 'eyeroll' : 'neutral', look: [1, 0], star: { x: -140 },
    front(x, t, lt, P) {
      soak(x, t, P)
      drawBits(x, THERMO, { K: INK, W: CREAM, R: RED }, 700, 820, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 840, 780, '★★★★☆', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: BONE, rot: 0.04 })
      label(x, 840, 900, '4/5. TOO WET.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Toe in. Toe out. | *Forty minutes.*', mood: lt => Math.floor(lt * 1.6) % 2 ? 'wide' : 'neutral', star: { x: -140 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      soak(x, t, P, 1, 1080)
      const m = Math.floor(clamp((lt - 0.3) / 1.8) * 40)
      label(x, 800, 780, `${m} MIN`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 56, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 920, 'DECIDING…', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'The hottest pool. | *Didn’t blink.*', mood: 'neutral', star: { x: -140 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      soak(x, t, P)
      for (let i = 0; i < 3; i++) drawBits(x, STEAM, { S: '#ffb0a8' }, 640 + i * 60, 1000 - ((t * 60 + i * 30) % 120), 12, { alpha: 0.7 * clamp(P.k) })
      label(x, 800, 780, '54°C', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 64, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 920, 'LUKEWARM.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Found a secret spring. | *Up a mountain.*', mood: 'sparkle', look: [1, 0], star: { x: -140 },
    back(x, t, lt, P) { drawBits(x, MOUNTAIN, { W: CREAM, G: '#6b62a8' }, 760, 820, 36 * pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      soak(x, t, P)
      label(x, 800, 1100, '+3 HRS HIKE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Took a work call | *from the spring.*', mood: 'neutral', look: [1, 0], star: { x: -140 },
    front(x, t, lt, P, F) {
      soak(x, t, P)
      drawBits(x, PHONE, { K: '#2a2350', S: SKYB, G: '#6b62a8' }, F.x + 130, F.cy - 20, 13 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.15 })
      bubble(x, 790, 760, 'per my last | email…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Asked what sign | *the spring is.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -140 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      soak(x, t, P)
      bubble(x, 790, 740, 'are you | a Pisces?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl', col: '#bff0ff' })
      label(x, 800, 920, '♓︎ CONFIRMED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: '#5fd0c8', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'So relaxed | they *cried.*', mood: 'sleepy', tears: lt => lt > 0.6 ? 3 : 1, star: { x: -140 },
    front(x, t, lt, P) {
      soak(x, t, P)
      label(x, 800, 800, 'PEACE: TOO MUCH', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0125', key: 'F', accent: SKYB, ending: 'lesson',
  title: 'The signs at | a *hot spring.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero stress.*', moods: ['wide', 'sleepy', 'wink', 'heart', 'sparkle', 'eyeroll', 'neutral', 'neutral', 'sparkle', 'neutral', 'sparkle', 'sleepy'] },
  lesson: { text: 'Everyone unwinds | *their own way.*', chip: 'MOOD: SOAKED' },
  last: {
    text: 'Pisces? | *Still in there.*',
    draw(x, t, lt) {
      // the group photo is still up: give its Pisces (bottom-right) a little pool of its own
      const k = pop01(t, t - lt + 0.6, 0.45, 1.8)
      if (k <= 0.01) return
      soak(x, t, { k }, 1, 1325, 952, 120, 34)
      label(x, 900, 1440, 'STILL SOAKING', pop01(t, t - lt + 1.2, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
