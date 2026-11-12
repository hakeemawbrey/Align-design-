// r2t0563: star_talk, BELIKE, "Car karaoke? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, each one's most extreme way of singing in the car. Ending: callback (Taurus' one song).
//   ♈ started the song before the engine · ♉ one song, on repeat since 2016 · ♊ changed the song mid-chorus, again
//   · ♋ dedicated it to everyone in the car · ♌ window down, for the fans · ♍ corrected your lyrics mid-song
//   · ♎ harmonised, beautifully, unasked · ♏ knows every word of the villain song · ♐ wrong words, confidently
//   · ♑ silent, then nailed the bridge · ♒ only sings the bass line · ♓ cried at the radio ad
//   group "Nobody | *knew the words.*"   last "Next song? | *The same one.*" (Taurus' play count ticks up again)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, phone, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = '#ff8fb1'

const WHEEL = ['...KKKKK...', '.KK.....KK.', 'K.........K', 'K..KKKKK..K', 'KKKK...KKKK', 'K...K.K...K', '.K..K.K..K.', '..KKKKKKK..']
const KEY = ['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y...Y.Y', '.YYY.......']

// a car window frame (the panel becomes the side window)
function carWindow(x, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.fillRect(560, 560, 22, 600)
  x.fillStyle = '#c94a5a'; x.fillRect(566, 560, 10, 600)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Started the song | before *the engine.*', mood: lt => lt > 0.8 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, KEY, { Y: GOLD }, 800, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      label(x, 800, 1090, 'ENGINE: OFF', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 700, 'VOLUME: MAX', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: RED, color: PAPER, rot: -0.05, font: MONO, weight: 700 })
      notes(x, t, 560, 820, { n: 4, cell: 7, col: GOLD, seed: 1 })
    } },
  { sign: 'taurus', cap: 'One song. | On *repeat.* Since 2016.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const n = 4000 + Math.floor(clamp((lt - 0.3) / 1.6) * 12)
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '♪ 3:12', head: 'NOW PLAYING', msg: 'the song | (again)', bg: GOLD, size: 34 })
      label(x, 800, 1100, `PLAYS: ${n.toLocaleString('en-US')}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Changed the song | *mid-chorus.* Again.', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.9) * 15)
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '♪ 0:04', head: `SKIP #${n}`, msg: n % 2 ? 'no wait— | this one' : 'ok THIS | one', bg: MINT, size: 32 })
      bubble(x, 800, 620, 'ooh, wait—', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Dedicated the song | to *everyone in the car.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'virgo', 730, 980, 150 * k, { mood: 'wide', look: [-1, 0], seed: 21, glyph: false }); signChar(x, t, 'leo', 880, 980, 150 * k, { mood: lt > 1.4 ? 'heart' : 'wide', look: [-1, 0], seed: 22, glyph: false }) }
      bubble(x, 800, 680, 'this one’s | for you guys', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Rolled the window down. | *For the fans.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.6],
    back(x, t, lt, P) { carWindow(x, pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'LIVE IN TRAFFIC', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'thank you, | lane two!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      notes(x, t, 380, 760, { n: 4, cell: 7, col: ORANGE, seed: 3 })
    } },
  { sign: 'virgo', cap: 'Corrected your lyrics. | *Mid-song.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      note(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), '“baby, baby, | ooh” | → it’s “ooh, baby.”', { head: 'LYRICS (FIXED)', headBg: MINT, size: 30, w: 330, rot: 0.04, strike: lt > 0.9 ? [0, 1] : [] })
      label(x, 790, 1090, 'FOOTNOTES: 3', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Harmonised. | *Beautifully.* Unasked.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      notes(x, t, 720, 900, { n: 5, cell: 9, col: PINK, seed: 4 })
      notes(x, t, 880, 900, { n: 5, cell: 9, col: LAV, seed: 7 })
      label(x, 800, 700, 'THIRD ABOVE ✦', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1090, 'you’re welcome', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Knows every word | to the *villain song.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 760, 'TRACK 7: THE VILLAIN', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 30, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 950, '♪ mwa-ha-HAAA ♪', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 1110, 'FULL DRAMA', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sang the wrong words. | *Confidently.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 760, '♪ something | about a moose? ♪', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1000, 'NOT THE WORDS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: RED, color: PAPER, rot: 0.04, font: MONO, weight: 700 })
      notes(x, t, 380, 700, { n: 4, cell: 7, col: LAV, seed: 5 })
    } },
  { sign: 'capricorn', cap: 'Silent all ride. | Then *nailed the bridge.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, WHEEL, { K: '#9aa5c4' }, 800, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.1) notes(x, t, 560, 800, { n: 5, cell: 8, col: MINT, seed: 6 })
      label(x, 800, 700, lt > 1.1 ? 'ONE NOTE. PERFECT.' : '…', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: lt > 1.1 ? GOLD : BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 450, 860, P.t0 + 1.45, 7, 160, 0.3)
    } },
  { sign: 'aquarius', cap: 'Only sings | *the bass line.*', mood: lt => Math.floor(lt * 3) % 2 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 }, squash: lt => 0.05 * Math.sin(lt * 14),
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45) + 1)
      bubble(x, 790, 760, ['dum.', 'dum. dum.', 'dum. dum. | dum.'][n - 1], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
      label(x, 790, 1020, 'NO WORDS. JUST BASS.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | *the radio ad.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 740, '“…mattresses for | the whole family!”', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: BONE, tail: 'bl' })
      label(x, 790, 990, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0563', key: 'G', accent: ACC, ending: 'callback',
  title: 'Car karaoke? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *knew the words.*' },
  last: {
    text: 'Next song? | *The same one.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 360, 1120, 280 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      phone(x, 740, 1080, pop01(t, t - lt + 0.6, 0.35, 2), { top: '♪ 0:01', head: 'NOW PLAYING', msg: 'the song | (again)', bg: GOLD, size: 34, rot: 0.06 })
      label(x, 740, 1320, 'PLAYS: 4,013', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      notes(x, t, 360, 960, { n: 4, cell: 8, col: GOLD, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
