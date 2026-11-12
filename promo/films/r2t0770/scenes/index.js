// r2t0770: THE SIGNS AS… v3, "The signs | *on a staycation.*" (signs3kit social cut, lofi · F).
// Twelve signs taking a staycation, each the most extreme version of itself. Ending: callback (Cancer, homesick while
// at home, gets the couch back and calls it the best trip ever).
//   ♈ whole itinerary done by 10am · ♉ rated their own bed five stars · ♊ nine activities, one street · ♋ homesick,
//   at home · ♌ "do not disturb" sign (please disturb) · ♍ cleaned the house before relaxing in it · ♎ turned the
//   living room into a resort · ♏ phone off, curtains shut, gone · ♐ tent in the backyard, "wilderness: 4 m"
//   · ♑ staycation, forty emails · ♒ guided tour of their own street · ♓ cried at the sunset from the balcony
//   group "Nobody went | *anywhere.*"   last "Cancer’s review? | *Best trip ever.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, zzz, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Did the whole itinerary. | *By 10 a.m.*', mood: lt => lt > 1.3 ? 'neutral' : 'sparkle', star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 320, head: 'DAY 1', headBg: '#ff6b5a', lines: ['museum ✓', 'park ✓', 'lunch ✓', 'everything ✓'], size: 30, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1100, 'NOW WHAT?', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: 'taurus', cap: 'Rated their own bed. | *Five stars.*', mood: lt => lt > 1.0 ? 'sleepy' : 'heart', star: { x: -170, y: 20 },
    front(x, t, lt, P, F) {
      bits(x, 'PILLOW', 800, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      zzz(x, t, F.x + 90, F.top - 10, { alpha: clamp((lt - 0.9) * 2), size: 46 })
      L(x, 800, 700, '★★★★★', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, -0.04, 44)
      L(x, 800, 1110, '“would sleep again”', pop01(t, P.t0 + 1.6, 0.3, 2.2), CREAM, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Nine activities. | *One street.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'wide', star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 340, head: 'PLANS', headBg: '#ffd23a', headInk: INK, lines: ['9am: pottery', '10am: tango', '11am: kayak?', '…9pm: karaoke'], size: 28, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1110, 'DISTANCE: 200 M', pop01(t, P.t0 + 1.7, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Staycation at home. | *Homesick anyway.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 720, 'i miss | my couch', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl', col: SKYB })
      L(x, 790, 1110, 'THEY’RE ON IT', pop01(t, P.t0 + 1.8, 0.3, 2.2), CREAM, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Hung “do not disturb.” | *Please disturb.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 260, h: 300, head: 'DO NOT', headBg: '#ffb34a', headInk: INK, lines: ['disturb', '', ['(unless it’s', '#6b62a8'], ['to admire me)', '#6b62a8']], size: 30, rot: 0.06 })
      L(x, 800, 1100, 'DOOR: WIDE OPEN', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Cleaned the whole house | *before relaxing in it.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bits(x, 'BROOM', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 6) * 0.25 })
      L(x, 800, 660, 'RELAX AT: 4:59 PM', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 800, 1100, 'RELAXED: 1 MIN', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Turned the living room | *into a resort.*', mood: lt => lt > 1.2 ? 'sparkle' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAMP', 760, 870, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'FLOWER', 880, 900, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 780, 660, 'WELCOME DRINK: WATER', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 26)
      L(x, 800, 1100, 'AMBIENCE: PERFECT', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
      sparkles(x, t, 820, 880, P.t0 + 1.2, 7, 160, 0.3)
    } },
  { sign: 'scorpio', cap: 'Phone off. Curtains shut. | *Gone.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'SHADES', F.x, F.cy - 20, 13 * k)
      const cl = ease.inOutCubic(clamp((lt - 0.6) / 0.9))
      x.save(); x.globalAlpha = 0.55 * clamp(k); x.fillStyle = '#5a1f3a'; x.fillRect(110, 480, 430 * cl, 760); x.fillRect(970 - 430 * cl, 480, 430 * cl, 760); x.restore()
      L(x, 540, 1100, 'STATUS: UNREACHABLE', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Pitched a tent. | *In the backyard.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'TENT', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'WILDERNESS: 4 M', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 34)
      L(x, 800, 1100, 'WIFI: STILL WORKS', pop01(t, P.t0 + 1.6, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Took a day off. | *Answered forty emails.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.floor(clamp((lt - 0.4) / 1.4) * 40)
      L(x, 800, 680, `REPLIED: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 38)
      L(x, 780, 1090, 'OUT OF OFFICE: LIES', pop01(t, P.t0 + 1.7, 0.3, 2.2), '#4fbf8a', 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Gave a guided tour | *of their own street.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      for (const [i, id] of [[0, 'gemini'], [1, 'leo']]) friend(x, t, id, 760 + i * 130, 980, 130, pop01(t, P.t0 + 0.5 + i * 0.25, 0.3, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.5 + i * 0.1] })
      bubble(x, 800, 700, 'and HERE is | a mailbox.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1130, 'TOUR: 3 HOURS', pop01(t, P.t0 + 1.7, 0.3, 2.2), '#6fc3ff', 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried at the sunset. | *From the balcony.*', mood: 'wide', star: ST, tears: 3,
    front(x, t, lt, P) {
      const s = ease.inOutCubic(clamp((lt - 0.2) / 2))
      bits(x, 'SUN', 800, lerp(820, 900, s), 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.fillStyle = INK; x.fillRect(610, 960, 380, 14); for (let i = 0; i < 7; i++) x.fillRect(624 + i * 56, 960, 12, 120); x.restore()
      bubble(x, 800, 660, 'it’s doing it | AGAIN', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0770', key: 'F', accent: ACC, ending: 'callback',
  title: 'The signs | *on a staycation.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody went | *anywhere.*' },
  last: {
    text: 'Cancer’s review? | *Best trip ever.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      bits(x, 'COUCH', 540, 1080, 34 * k)
      if (k > 0.3) signChar(x, t, 'cancer', 540, 930, 220 * k, { mood: 'heart', seed: 4, glyph: false, hops: [t - lt + 1.3] })
      L(x, 540, 1270, 'BACK ON THE COUCH', pop01(t, t - lt + 1.4, 0.3, 2.2), SKYB, -0.03, 36)
      hearts(x, t, 540, 860, t - lt + 1.2, { n: 7, life: 2.0, spread: 300, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
