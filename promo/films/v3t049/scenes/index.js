// v3t049: THE SIGNS AS… v3, "Zodiacs, new friend | be like." (~63 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "Zodiacs, new friend | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   how each sign makes a new friend (3.8 s each), pushed to the extreme:
//              ♈ met at noon, best friends by 12:05 · ♉ fed them immediately · ♊ learned their whole life story
//              · ♋ friends for an hour, made a scrapbook · ♌ new friend joins the fan club · ♍ fixed their collar
//              · ♎ checked their sign, matching outfits · ♏ friendship trial period: 18 months · ♐ met on a train,
//              now on a road trip · ♑ friendship scheduled monthly · ♒ new best friend is a raccoon · ♓ said hi, soulmates
//  49.2        "Friends? | *Instantly.*"
//  52.4        LESSON UNLOCKED: "Say hi first. | *They're hoping too.*"  FRIEND: MADE
//  58.3        "Even *the raccoon.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ff9a4a', BROWN = '#8a4a2e'

const RACCOON = [
  '.G.......G.',
  'GGG.....GGG',
  'GGGGGGGGGGG',
  'GKKWGGGWKKG',
  'GKWKGGGKWKG',
  'GKKKGGGKKKG',
  '.GGGGKGGGG.',
  '..GGWWWGG..',
  '...GGGGG...',
]
const RACCOON_C = { G: '#9aa5c4', K: '#2a2350', W: '#ffffff' }
const PIE = [
  '..CCCCCCC..',
  '.CCYCCCYCC.',
  'CCCCCCCCCCC',
  'RRRRRRRRRRR',
  '.BBBBBBBBB.',
  '..BBBBBBB..',
]
const PIE_C = { C: '#e8a24a', Y: '#ffe7a8', R: RED, B: SKYB }
const TRAIN = [
  '....RRRRRRRRRRR',
  '...RRWWRWWRWWRR',
  '..RRRWWRWWRWWRR',
  '.RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRRR',
  '.KK...KK...KK..',
]
const TRAIN_C = { R: ORANGE, W: SKYB, K: INK }

function book(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260)
  x.fillStyle = PINK; x.fillRect(-162, -122, 160, 244); x.fillStyle = '#ffd9e4'; x.fillRect(2, -122, 160, 244)
  const n = Math.floor(clamp((lt - 0.3) / 1.2) * 4)
  for (let i = 0; i < n; i++) { const c = i % 2, r = Math.floor(i / 2); x.fillStyle = '#fff4e2'; x.fillRect(-140 + c * 166 + (c ? 4 : 0), -96 + r * 112, 116, 92); x.fillStyle = [GOLD, SKYB, MINT, LAV][i]; x.fillRect(-132 + c * 166 + (c ? 4 : 0), -88 + r * 112, 100, 64) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Met at noon. | *Best friends by 12:05.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const m = Math.min(5, Math.floor(clamp((lt - 0.3) / 1.2) * 5))
      label(x, 800, 720, `12:0${m}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 52, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 950, 'BFF: CONFIRMED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'New friend? | *Fed them immediately.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PIE, PIE_C, 800, 880, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 680, 'you hungry?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1070, 'NOT OPTIONAL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Five minutes in. | Knows *their life story.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const facts = ['3 cousins', 'hates socks', 'was a twin?', 'loves frogs']
      facts.forEach((s, i) => label(x, 800 + (i % 2 ? 40 : -20), 660 + i * 130, s, pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2.2), { size: 34, bg: [SKYB, PINK, GOLD, MINT][i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
    } },
  { sign: 'cancer', cap: 'Friends for an hour. | Made *a scrapbook.*', mood: 'heart', star: { x: -180 },
    front(x, t, lt, P) {
      book(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.3, 2), lt)
      label(x, 790, 1080, '“US” · VOL. 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'New friend? | *Joined the fan club.*', mood: 'sparkle', star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.05); x.scale(1.3 * k, 1.3 * k)
        x.fillStyle = INK; x.fillRect(-160, -100, 320, 200); x.fillStyle = GOLD; x.fillRect(-152, -92, 304, 184)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('LEO FAN CLUB', 0, -48); x.font = `700 28px ${MONO}`; x.fillText('MEMBER #2', 0, 10); x.fillText('(#1: LEO)', 0, 56)
        x.restore()
      }
      sparkles(x, t, 800, 860, P.t0 + 1.0, 7, 200, 0.6)
    } },
  { sign: 'virgo', cap: 'Made a friend. | *Fixed their collar.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 820, 920, 210 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 13, glyph: false })
      label(x, 820, 720, lt > 1.2 ? 'COLLAR: FIXED' : 'COLLAR: CROOKED', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: lt > 1.2 ? MINT : RED, color: lt > 1.2 ? INK : '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 820, 1140, 'oh. thanks?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Checked their sign. | *Matching outfits.*', mood: 'heart', star: { x: -200 }, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 940, 210 * k, { mood: 'heart', look: [-1, 0], seed: 15, glyph: false })
      label(x, 800, 680, 'COMPATIBLE ✓', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.2) { x.save(); x.fillStyle = INK; for (const cx of [340, 820]) { x.fillRect(cx - 44, 1030, 88, 22) } x.fillStyle = PINK; for (const cx of [340, 820]) { x.fillRect(cx - 40, 1034, 80, 14) } x.restore() }
      label(x, 580, 1140, 'MATCHING SCARVES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Friendship trial: | *eighteen months.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 800, 700, 'PROBATION', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: RED, color: '#fff4e2', rot: -0.05 })
      const mo = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 17)
      label(x, 800, 900, `MONTH ${mo} OF 18`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'so far, so good', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Met on a train. | *Now on a road trip.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, TRAIN, TRAIN_C, lerp(1000, 790, ease.outCubic(prog(lt, 0.2, 0.9))), 760, 16)
      label(x, 800, 960, 'STRANGER → BFF', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'DAY 3 OF ???', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'New friend? | *Scheduled monthly.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#fff4e2'; x.fillRect(-142, -142, 284, 284)
        x.fillStyle = TEAL; x.fillRect(-142, -142, 284, 56)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRIENDSHIP', 0, -114)
        for (let i = 0; i < 12; i++) { const c = i % 4, r = Math.floor(i / 4); x.fillStyle = i === 0 || i === 4 || i === 8 ? PINK : '#d8d0c0'; x.fillRect(-122 + c * 62, -66 + r * 68, 50, 54) }
        x.restore()
      }
      label(x, 800, 1090, 'FIRST MONDAYS, 6PM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Their new best friend? | *A raccoon.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, RACCOON, RACCOON_C, 800, 900, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 800, 680, 'his name is Doug', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 800, 820, P.t0 + 1.4, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 8 })
    } },
  { sign: 'pisces', cap: 'Said hi. | *Cried. Soulmates.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 920, 200 * k, { mood: 'heart', look: [-1, 0], seed: 19, glyph: false, tears: lt > 1.2 ? 2 : 0 })
      bubble(x, 820, 660, 'hi!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 46, tail: 'bc' })
      label(x, 820, 1130, 'FRIENDS FOR LIFE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]
const TEAL = '#2fc79a'

const F = makeFilm({
  id: 'v3t049', key: 'F', accent: GOLD, ending: 'lesson',
  title: 'Zodiacs, new friend | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Friends? | *Instantly.*' },
  lesson: { text: 'Say hi first. | *They’re hoping too.*', chip: 'FRIEND: MADE' },
  last: {
    text: 'Even | *the raccoon.*',
    draw(x, t, lt) { drawBits(x, RACCOON, RACCOON_C, 540, 830, 24 * pop01(t, t - lt + 0.6, 0.35, 2)); hearts(x, t, 540, 720, t - lt + 0.9, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 2 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
