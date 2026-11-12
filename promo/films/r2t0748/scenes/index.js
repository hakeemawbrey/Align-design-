// r2t0748: star_talk, BELIKE, "“Almost there”? | Zodiacs *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order on a long ride, told "we're almost there":
//   Aries starts sprinting an hour out · Taurus eats the snacks for the way back · Gemini asks forty times
//   · Cancer is homesick three miles in · Leo changes into the arrival outfit · Virgo checks the map ("we're not")
//   · Libra can't pick the arrival song · Scorpio knew it was a lie · Sagittarius takes a detour anyway
//   · Capricorn does the ETA maths out loud · Aquarius reads everyone's chart to pass the time · Pisces cries happy tears
//  49.2  group "Still not there. | *Everyone’s fine.*"   52.6  callback: "We’re here. | Gemini: *“are we?”*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff'
const CHIPS = ['.KKKKKKK.', 'KYYYYYYYK', 'KYRRRRRYK', 'KYRYYYRYK', 'KYRRRRRYK', 'KYYYYYYYK', 'KYYYYYYYK', '.KKKKKKK.']
const CHIPS_C = { K: INK, Y: '#ffd23a', R: RED }

const CAMEOS = [
  { sign: 'aries', cap: 'Started sprinting. | *An hour away.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.3, 0.6, 0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      L(x, 790, 760, 'ETA: 58 MIN', pop01(t, P.t0 + 0.4, 0.3, 2), STEEL, 0.05, 40)
      bubble(x, 790, 960, 'GO GO GO', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 46, tail: 'bl' })
      for (let i = 0; i < 4; i++) { x.fillStyle = BONE; x.globalAlpha = 0.6; x.fillRect(230 - i * 30, 840 + i * 26, 70, 8); x.globalAlpha = 1 }
    } },
  { sign: 'taurus', cap: 'Ate the snacks | *for the way back.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.max(0, 3 - Math.floor(Math.max(0, lt - 0.4) / 0.4))
      for (let i = 0; i < 3; i++) drawBits(x, CHIPS, CHIPS_C, 680 + i * 110, 900 + (i % 2) * 30, 18 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { alpha: i < n ? 1 : 0.15, rot: (i - 1) * 0.12 })
      L(x, 790, 700, 'BAG: “RETURN TRIP”', pop01(t, P.t0 + 0.4, 0.3, 2), LAV, -0.04, 28)
      L(x, 790, 1110, `LEFT: ${n}`, pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: 'gemini', cap: '“Are we there?” | *Forty times.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 39)
      bubble(x, 790, 700, 'are we there?', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (1 + 0.05 * Math.sin(lt * 18)), { size: 42, tail: 'bl' })
      L(x, 790, 930, `ASKED: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.05, 44)
    } },
  { sign: 'cancer', cap: 'Homesick | *three miles in.*', mood: 'neutral', look: [-1, 0], tears: 1, star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 790, 880, 36 * pop01(t, P.t0 + 0.3, 0.35, 2) * (1 - 0.35 * clamp((lt - 0.6) / 1.2)))
      L(x, 790, 650, 'HOME: MISSED', pop01(t, P.t0 + 0.9, 0.3, 2.4), SKYB, 0.04, 34)
      L(x, 790, 1110, 'MILES: 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Changed into | the *arrival outfit.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      bits(x, 'SHADES', F.x, F.cy - 20, 10 * k)
      const look = 1 + Math.min(6, Math.floor(Math.max(0, lt - 0.3) / 0.28))
      L(x, 790, 820, `LOOK ${look} OF 7`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.05, 40)
      bubble(x, 790, 1010, 'entrance ready', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Checked the map. | *“We’re not.”*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'MAP', 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.04 })
      L(x, 790, 650, 'REAL ETA: 2 HRS', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.04, 34)
      L(x, 790, 1080, 'NOT ALMOST.', pop01(t, P.t0 + 1.7, 0.3, 2.4), BONE, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Can’t pick | the *arrival song.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const side = Math.floor(lt * 2) % 2
      L(x, 690, 760, 'SONG A', pop01(t, P.t0 + 0.3, 0.3, 2) * (side ? 0.8 : 1.15), PINK, -0.06, 38)
      L(x, 890, 900, 'SONG B', pop01(t, P.t0 + 0.5, 0.3, 2) * (side ? 1.15 : 0.8), MINT, 0.06, 38)
      L(x, 790, 1090, 'ARRIVED IN SILENCE', pop01(t, P.t0 + 1.8, 0.3, 2.4), STEEL, -0.03, 28)
    } },
  { sign: 'scorpio', cap: 'Knew it was a lie. | *Said nothing.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, '“almost”', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl', col: STEEL })
      bubble(x, 420, 640, '…sure.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'br', col: LAV })
      L(x, 790, 940, 'NOTED. FOREVER.', pop01(t, P.t0 + 1.6, 0.3, 2.4), '#c04a8a', 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Almost there? | *Detour anyway.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.6))
      x.save(); x.strokeStyle = GOLD; x.lineWidth = 10; x.setLineDash([18, 14]); x.beginPath()
      for (let i = 0; i <= 40 * p; i++) { const u = i / 40; const px = 640 + u * 300, py = 1050 - u * 360 + Math.sin(u * 14) * 70; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke(); x.restore()
      L(x, 790, 640, 'SCENIC ROUTE', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.05, 34)
      L(x, 790, 1110, '+3 HOURS ♡', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Did the ETA maths. | *Out loud.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: 'ETA MATHS', headBg: '#6b62a8', lines: ['distance: far', 'speed: slow', 'traffic: yes', '= not almost'], size: 28, align: 'left', progress: clamp((lt - 0.4) / 1.2) })
      L(x, 790, 1110, 'SHOWED WORK', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Read everyone’s chart | *to pass the time.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: 'BIRTH CHARTS', headBg: ACC, headInk: INK, lines: ['driver: virgo', 'snacks: taurus', 'back seat: chaos', 'trip: written'], size: 26, align: 'left', progress: clamp((lt - 0.4) / 1.2) })
      L(x, 790, 1110, 'IT WAS IN THE STARS', pop01(t, P.t0 + 1.7, 0.3, 2.4), LAV, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Happy tears. | *We’re not there yet.*', mood: 'heart', tears: 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 790, 960, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 790, 700, 'it’s just so | beautiful', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
      L(x, 790, 1120, 'ETA: 1 HR', pop01(t, P.t0 + 1.6, 0.3, 2.4), STEEL, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0748', key: 'G', accent: ACC, ending: 'callback',
  title: '“Almost there”? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Still not there. | *Everyone’s fine.*' },
  last: {
    text: 'We’re here. | Gemini: *“are we?”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.8, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 470, 1060, 300 * k, { mood: 'sparkle', look: [1, 0], seed: 61, hops: [t - lt + 1.3] })
      bubble(x, 760, 880, 'are we there?', pop01(t, t - lt + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 760, 1260, 'ASKED: 41', pop01(t, t - lt + 1.8, 0.3, 2.4), GOLD, 0.05, 44)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
