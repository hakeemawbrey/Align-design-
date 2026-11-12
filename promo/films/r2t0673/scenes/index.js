// r2t0673: star_talk, ROLLCALL, "The signs | *at a pool party.*" (signs3kit social cut, music: lofi · G).
// Ending: callback.
//   3.6–49.2   one pool-party moment per sign (3.8 s each):
//              ♈ cannonball before saying hi · ♉ never got in, guarded the snacks · ♊ asked everyone's sign from a
//              floatie · ♋ sunscreened everyone, twice · ♌ a floatie shaped like themself · ♍ tested the water with a
//              lab kit · ♎ shallow end or deep end, still deciding · ♏ deep end, eyes just above the water · ♐ invented
//              a game, no rules · ♑ swam forty laps at a party · ♒ a rubber duck with a backstory · ♓ got splashed, cried
//  49.2        "Twelve signs. | *One cannonball.*"
//  52.6        last "Aries is still | *cannonballing.*" (card 1 paid off: the splash comes back)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, water, splash, ring, ball, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'
import { drawPixelStar } from '../../sky.js'

const ACC = '#3fa9e8', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Cannonball. | *Before saying hi.*', mood: lt => lt > 0.9 ? 'sparkle' : 'squint', star: { x: -170, y: -60 }, hops: [0.5],
    back(x, t, lt, P) { water(x, t, 170, 1000, 740, 220, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      splash(x, 370, 1010, clamp((lt - 0.6) / 1.2))
      L(x, 800, 700, 'HI, I’M ARIES', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.05, 34)
      L(x, 800, 880, 'EVERYONE: SOAKED', pop01(t, P.t0 + 1.9, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Never got in. | *Guarded the snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'SNACK SECURITY', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 34)
      bubble(x, 800, 1110, 'dry hands only', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Asked everyone’s sign | *from a floatie.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -170, y: -40 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { water(x, t, 170, 1030, 740, 190, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      ring(x, 370 + Math.sin(t * 2) * 10, 1040, 120, pop01(t, P.t0 + 0.2, 0.3, 2), '#ffd23a')
      bubble(x, 800, 700, 'wait, your rising??', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 900, 'SIGNS LOGGED: 14', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Sunscreened everyone. | *Twice.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SPRAY', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      L(x, 800, 650, 'REAPPLY: NOW', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.05, 34)
      bubble(x, 800, 1110, 'even you, sun', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Brought a floatie | *shaped like themself.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'leo', 800, 900 + Math.sin(t * 2) * 10, 280 * k, { mood: 'sparkle', glyph: false, seed: 44, glow: 0.4, squash: 0.18 })
      L(x, 800, 650, 'SIZE: LIFE', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 36)
      sparkles(x, t, 800, 900, P.t0 + 1.0, 7, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Tested the water. | *With a lab kit.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'TUBE', 700 + i * 100, 880, 22 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { rot: (i - 1) * 0.08 })
      L(x, 800, 650, 'SAMPLE 3 OF 3', pop01(t, P.t0 + 0.9, 0.3, 2.2), CREAM, 0.04, 32)
      L(x, 800, 1110, 'VERDICT: SWIMMABLE', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Shallow end or deep end? | *Still deciding.*', mood: 'neutral', look: lt => [Math.sin(lt * 3) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const which = Math.floor(lt * 1.5) % 2
      L(x, 800, 760, which ? 'DEEP END?' : 'SHALLOW END?', 1, which ? '#3a5a9a' : SKYB, which ? 0.05 : -0.05, 38)
      L(x, 800, 1020, 'PARTY: ENDING', pop01(t, P.t0 + 1.7, 0.3, 2.2), RED, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Stayed in the deep end. | *Eyes above water.*', mood: 'squint', look: lt => [Math.round(Math.sin(lt * 2)), 0], star: { x: -170, y: 60 },
    front(x, t, lt, P) {
      water(x, t, 170, 1000, 740, 230, pop01(t, P.t0 + 0.1, 0.3, 2), 0.92)
      L(x, 800, 700, 'SEEN: EVERYTHING', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Invented a pool game. | *No rules.*', mood: 'sparkle', star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      ball(x, t, 800, 880 - Math.abs(Math.sin(t * 4)) * 80, 70, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'RULES: VIBES', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.04, 36)
      bubble(x, 800, 1110, 'I’M WINNING', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Swam laps. | *At a party.*', mood: 'neutral', star: { x: -170, y: -40 },
    back(x, t, lt, P) {
      water(x, t, 170, 1020, 740, 200, pop01(t, P.t0 + 0.1, 0.3, 2))
      x.save(); x.fillStyle = BONE; for (let i = 0; i < 3; i++) x.fillRect(170, 1080 + i * 50, 740, 6); x.restore()
    },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 39)
      L(x, 800, 720, `LAP ${n} / 40`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.04, 40)
      L(x, 800, 900, 'FUN: SCHEDULED', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Brought a rubber duck. | *It has a backstory.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DUCK', 800, 900 + Math.sin(t * 3) * 8, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, 'he’s from the future', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 800, 1110, 'HIS NAME: KEVIN', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Got splashed. | Cried. *Already wet.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 1, star: ST,
    front(x, t, lt, P) {
      splash(x, 380, 760, clamp((lt - 0.3) / 1.0), { n: 12, R: 200, size: 14 })
      L(x, 800, 760, 'WET: COMPLETELY', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, 0.04, 34)
      bubble(x, 800, 980, 'happy tears!!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0673', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs | *at a pool party.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One cannonball.*' },
  last: {
    text: 'Aries is still | *cannonballing.*',
    draw(x, t, lt) {
      water(x, t, 170, 1330, 740, 200, pop01(t, t - lt + 0.4, 0.35, 2))
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      const ph = ((lt - 0.6) % 1.6) / 1.6
      if (k > 0.01) signChar(x, t, 'aries', 540, lerp(900, 1300, ease.inCubic(clamp(ph * 2))), 250 * k, { mood: 'sparkle', glyph: false, seed: 51 })
      if (lt > 0.6) splash(x, 540, 1330, clamp(ph * 2 - 1))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
