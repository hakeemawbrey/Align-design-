// r2t0638: star_talk, ROLLCALL (twelve signs), "The signs | *learning to swim.*" (signs3kit social cut, music: lofi · G).
// Each sign's most extreme first swim lesson; every card sits in the same pool. Ending: group.
//   ♈ skipped the lesson, cannonballed · ♉ found the floatie, never left it · ♊ learned four strokes at once · ♋ wore six
//   floaties, just in case · ♌ swam one lap, new profile pic · ♍ read all 400 pool rules · ♎ tested the water for forty
//   minutes · ♏ asked the coach's birth time · ♐ first lesson, booked an ocean swim · ♑ a ten-year swim plan · ♒ invented
//   a new stroke · ♓ swam perfectly, cried until the pool got deeper
//   group "Twelve swimmers. | *One floatie.*" (the Taurus duck floatie, big, bobbing over the photo)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', ST = { x: -180 }
const RING = ['..RRRR..', '.RWWWWR.', 'RW....WR', 'RW....WR', '.RWWWWR.', '..RRRR..']
const RING_C = { R: RED, W: CREAM }

// the pool: a translucent band of water across the bottom of the panel, with a wavy top edge
function pool(x, t, top = 1050, a = 0.72) {
  x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
  x.globalAlpha = a; x.fillStyle = '#3f8fe0'
  x.beginPath(); x.moveTo(110, 1230)
  for (let i = 0; i <= 43; i++) { const px = 110 + i * 20; x.lineTo(px, top + 10 * Math.sin(px / 60 + t * 3)) }
  x.lineTo(970, 1230); x.closePath(); x.fill()
  x.globalAlpha = a * 0.9; x.fillStyle = '#bfe6ff'
  for (let i = 0; i < 43; i += 3) { const px = 110 + i * 20; x.fillRect(px, top - 4 + 10 * Math.sin(px / 60 + t * 3), 30, 8) }
  x.restore()
}
// a splash of droplets from (cx, cy) at t0
function splash(x, t, cx, cy, t0) {
  const tt = t - t0; if (tt < 0 || tt > 1.2) return
  x.save(); x.globalAlpha = 1 - tt / 1.2
  for (let i = 0; i < 16; i++) { const a = -Math.PI / 2 + (i / 15 - 0.5) * 2.6, v = 240 + (i * 53 % 7) * 40; x.fillStyle = i % 2 ? SKYB : '#ffffff'; x.fillRect(cx + Math.cos(a) * v * tt, cy + Math.sin(a) * v * tt + 500 * tt * tt, 16, 22) }
  x.restore()
}
// wrap each card's props so the pool is drawn over the star's lower half
const swim = (fn, top) => (x, t, lt, P, F) => { pool(x, t, typeof top === 'function' ? top(lt) : top); if (fn) fn(x, t, lt, P, F) }

const CAMEOS = [
  { sign: 'aries', cap: 'Skipped the lesson. | *Cannonballed.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -180, y: 60 }, hops: [0.6],
    front: swim((x, t, lt, P) => {
      splash(x, t, 360, 1050, P.t0 + 0.85)
      L(x, 800, 680, 'LESSON 1: SKIPPED', pop01(t, P.t0 + 0.3, 0.3, 2), RED, -0.04, 32)
      L(x, 800, 860, 'DEEP END ✓', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.05, 38)
    }, 1050) },
  { sign: 'taurus', cap: 'Found the floatie. | *Never left it.*', mood: 'sleepy', star: { x: -180, y: 20 },
    back(x, t, lt, P) { bits(x, 'DUCK', 360, 1040 + 8 * Math.sin(t * 2), 34 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front: swim((x, t, lt, P) => {
      L(x, 800, 700, `HOURS: ${Math.min(6, 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 6))}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.05, 38)
      bubble(x, 800, 880, 'this is my | home now', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    }, 1080) },
  { sign: 'gemini', cap: 'Learned four strokes. | *At once.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'wide', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST, hops: [0.8, 1.4],
    front: swim((x, t, lt, P) => {
      const SK = ['FREESTYLE', 'BACKSTROKE', 'BUTTERFLY', 'DOGGY PADDLE']
      SK.forEach((s, i) => L(x, 800, 640 + i * 95, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), [SKYB, MINT, PINK, GOLD][i], (i % 2 ? 0.05 : -0.05), 36))
      splash(x, t, 360, 1040, P.t0 + 1.0)
    }, 1060) },
  { sign: 'cancer', cap: 'Wore six floaties. | *Just in case.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front: swim((x, t, lt, P, F) => {
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.22))
      const spots = [[-130, -40], [130, -40], [-150, 60], [150, 60], [-90, 140], [90, 140]]
      for (let i = 0; i < n; i++) drawBits(x, RING, RING_C, F.x + spots[i][0], F.cy + spots[i][1], 11 * pop01(t, P.t0 + 0.2 + i * 0.22, 0.2, 2))
      L(x, 800, 720, 'SAFETY: MAXIMUM', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 32)
    }, 1080) },
  { sign: 'leo', cap: 'Swam one lap. | *New profile pic.*', mood: 'sparkle', look: [1, 0], star: ST,
    front: swim((x, t, lt, P) => {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      phone(x, t, 770, 790, 1.1 * k, { head: 'NEW PROFILE PIC', headCol: GOLD, size: 30, lines: [['♌ 1 lap!!', GOLD, pop01(t, P.t0 + 0.8, 0.25, 2), false], ['♡ 212', PINK, pop01(t, P.t0 + 1.4, 0.25, 2), true]] })
      sparkles(x, t, 800, 760, P.t0 + 0.6, 7, 200, 0.3)
    }, 1060) },
  { sign: 'virgo', cap: 'Read the pool rules. | *All 400.*', mood: 'squint', look: [1, 0], star: ST,
    front: swim((x, t, lt, P) => {
      sheet(x, 800, 790, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 380, h: 420, head: 'POOL RULES', headBg: '#2fc79a', headInk: INK, lines: ['1. no running', '2. no splashing', '…', `${Math.floor(lerp(3, 400, clamp((lt - 0.5) / 1.2)))}. no fun?`], size: 32, align: 'left', progress: clamp((lt - 0.3) / 0.8) })
    }, 1090) },
  { sign: 'libra', cap: 'Tested the water | *for forty minutes.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 1], star: { x: -180, y: -40 },
    front: swim((x, t, lt, P) => {
      swapLabelish(x, t, lt, P)
      L(x, 800, 900, `MINUTES: ${Math.floor(lerp(1, 40, clamp((lt - 0.3) / 1.5)))}`, pop01(t, P.t0 + 0.6, 0.3, 2), PINK, 0.05, 36)
    }, 1080) },
  { sign: 'scorpio', cap: 'Asked the coach’s | *birth time.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front: swim((x, t, lt, P) => {
      bubble(x, 800, 680, 'birth time?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      bubble(x, 800, 860, 'uh… 3 am?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: STEEL, tail: 'br' })
      L(x, 800, 1000, 'TRUST: PENDING', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#c97bff', 0.04, 32)
    }, 1080) },
  { sign: 'sagittarius', cap: 'First lesson. | Booked *an ocean swim.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0],
    front: swim((x, t, lt, P) => {
      bits(x, 'MAP', 800, 760, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 930, 'ACROSS IT. TUESDAY.', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 32)
    }, 1060) },
  { sign: 'capricorn', cap: 'Made a | *ten-year swim plan.*', mood: 'neutral', look: [1, 0], star: ST,
    front: swim((x, t, lt, P) => {
      sheet(x, 800, 790, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 380, h: 400, head: 'THE PLAN', headBg: STEEL, headInk: INK, lines: ['year 1: toes', 'year 3: knees', 'year 7: float', 'year 10: lap'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
    }, 1090) },
  { sign: 'aquarius', cap: 'Invented | *a new stroke.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.7, 1.3, 1.9],
    front: swim((x, t, lt, P) => {
      L(x, 800, 700, 'THE SIDEWAYS FLAP', pop01(t, P.t0 + 0.6, 0.3, 2), '#6fc3ff', -0.04, 34)
      L(x, 800, 860, 'PATENT: FILED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.05, 32)
      splash(x, t, 360, 1040, P.t0 + 0.75); splash(x, t, 360, 1040, P.t0 + 1.35)
    }, 1060) },
  { sign: 'pisces', cap: 'Swam perfectly. | Cried *anyway.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front: swim((x, t, lt, P) => {
      L(x, 800, 660, 'FORM: PERFECT', pop01(t, P.t0 + 0.3, 0.3, 2), MINT, -0.04, 34)
      L(x, 800, 800, 'POOL LEVEL: RISING', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, 0.04, 32)
    }, lt => lerp(1080, 960, clamp((lt - 0.6) / 1.6))) },
]
// Libra's toe-test: a big label that flips between too cold and too warm
function swapLabelish(x, t, lt, P) {
  const cold = Math.floor(lt * 2.2) % 2 === 0
  L(x, 800, 700, cold ? 'TOO COLD?' : 'TOO WARM?', pop01(t, P.t0 + 0.2, 0.3, 2), cold ? SKYB : '#ff9a4a', cold ? -0.05 : 0.05, 40)
}

const F = makeFilm({
  id: 'r2t0638', key: 'G', accent: ACC, ending: 'group',
  title: 'The signs | *learning to swim.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve swimmers. | *One floatie.*',
    draw(x, t, lt) { bits(x, 'DUCK', 540, 680 + 10 * Math.sin(t * 2), 26 * pop01(t, t - lt + 1.2, 0.4, 2)) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
