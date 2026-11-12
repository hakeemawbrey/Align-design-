// r2t0562: star_talk, BELIKE, "Your friend is sad? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, each one's most extreme way of cheering up a sad friend. Ending: lesson.
//   ♈ wants a name · ♉ brought soup, a whole pot · ♊ forty memes a minute · ♋ moved in, indefinitely
//   · ♌ declared you the main character · ♍ a twelve-step plan · ♎ weighed both sides, out loud (oops)
//   · ♏ snacks and a revenge playlist · ♐ told a joke at the worst time · ♑ updated your résumé, just in case
//   · ♒ a fun fact about octopuses · ♓ cried harder than you did
//   group "Twelve friends. | *Zero chill.*"   lesson "Everyone loves differently. | Let them *show up.*"   last "Pisces is | *still crying.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, phone, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = SKYB

const POT = ['KKKKKKKKKKK', '.GGGGGGGGG.', 'GGGGGGGGGGG', 'GGGGGGGGGGG', 'GGGGGGGGGGG', '.GGGGGGGGG.']
const POT_C = { S: BONE, K: '#4a4a60', G: '#7a7a96' }

// a balance scale that tips
function scale_(x, cx, cy, k, tilt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 300); x.fillRect(-90, 140, 180, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 288); x.fillRect(-84, 146, 168, 14)
  x.save(); x.translate(0, -140); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-170, -8, 340, 16); x.fillStyle = GOLD; x.fillRect(-166, -4, 332, 8)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 150, 0); x.rotate(-tilt)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 90); x.moveTo(0, 0); x.lineTo(50, 90); x.stroke()
    x.fillStyle = INK; x.fillRect(-64, 86, 128, 20); x.fillStyle = GOLD; x.fillRect(-60, 88, 120, 14)
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText(s < 0 ? 'YOU' : 'THEM', 0, 74)
    x.restore()
  }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Who did this? | Give me *a name.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'NAME. | NOW.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 56, col: '#ff8a7a', tail: 'bl' })
      label(x, 790, 980, 'SLEEVES: ROLLED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Brought soup. | *A whole pot.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, POT, POT_C, 790, 900, 26 * k)
      for (let i = 0; i < 4; i++) { const ph = ((t * 0.7 + i / 4) % 1); x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph) * clamp(k); x.fillStyle = BONE; x.fillRect(720 + i * 44 + Math.sin(ph * 6 + i) * 10, 760 - ph * 140, 12, 26); x.restore() }
      label(x, 790, 1090, 'SERVES: 40', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Sent forty memes. | *Per minute.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.9) * 39)
      phone(x, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '2:14', head: `MEME ${n}/40`, msg: n % 2 ? 'lol | look' : 'ok but | THIS one', bg: GOLD, size: 34 })
      bubble(x, 800, 610, 'feel better??', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Moved in. | *Indefinitely.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'suitcase', 760, 960, 24 * k); bits(x, 'suitcase', 860, 870, 18 * k, { rot: 0.08 }); bits(x, 'pillow', 800, 760, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 800, 1110, 'STAYING: FOREVER?', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Declared you | the *main character.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      label(x, 790, 760, 'NOW STARRING:', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 880, 'YOU', pop01(t, P.t0 + 0.9, 0.35, 2.4), { size: 90, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 8, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Made a twelve-step | *recovery plan.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), '1. water | 2. sleep | 3. walk | … | 12. thrive', { head: 'YOU: v2.0', headBg: MINT, size: 32, w: 290, rot: 0.04 })
      label(x, 790, 1110, 'COLOUR-CODED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Weighed both sides. | *Out loud.* Oops.', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const tilt = 0.18 * Math.sin(lt * 4) * (1 - clamp((lt - 1.2) / 0.3)) + (lt > 1.2 ? -0.2 : 0)
      scale_(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), tilt)
      bubble(x, 790, 620, 'to be fair…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1120, 'WRONG MOMENT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: RED, color: PAPER, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Brought snacks. | And a *revenge playlist.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'cookie', 720, 990, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      note(x, 830, 820, pop01(t, P.t0 + 0.6, 0.3, 2), 'track 1: rise | track 2: thrive | track 3: glow', { head: '♏︎ PLAYLIST', headBg: '#c97bff', size: 26, w: 300, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Told a joke. | At the *worst time.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'so a horse | walks into—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1000, '…TOO SOON?', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Updated your résumé. | *Just in case.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'skills: | strong | resilient | “a delight”', { head: 'RÉSUMÉ v7', headBg: SKYB, size: 32, w: 290, rot: -0.04 })
      label(x, 790, 1110, 'REFERENCES: ME', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Sent a fun fact | about *octopuses.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'they have | THREE hearts!', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      label(x, 790, 980, 'HELPFUL? UNCLEAR.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 620, 1060, P.t0 + 1.0, { n: 3, life: 1.6, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: 'pisces', cap: 'Cried harder | *than you did.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'no, YOU | hug ME', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 790, 980, 'TISSUES: GONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0562', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Your friend is sad? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve friends. | *Zero chill.*' },
  lesson: { text: 'Everyone loves differently. | Let them *show up.*', chip: 'FRIENDSHIP: STRONG' },
  last: { text: 'Pisces is | *still crying.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
