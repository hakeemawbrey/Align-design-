// r2t0407: star_talk, BELIKE, "Tea gone cold? | Zodiacs *be like.*" (~53 s vertical, signs3kit social cut, music: lofi · E)
//   twelve cold cups of tea, each sign's most extreme reaction:
//   ♈ chugged it out of spite · ♉ microwaved it, forgot it again · ♊ made a second cup, forgot both · ♋ apologised to the tea
//   · ♌ rang for a fresh one · ♍ took its temperature · ♎ renamed it iced tea · ♏ knows who distracted them
//   · ♐ left it in another country · ♑ booked a tea break, worked through it · ♒ prefers it cold · ♓ cried into it
//   Ending: callback, Taurus's microwave, reheat #9.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, confetti, clock, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = '#7fd0ff'
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

/** a mug of tea; steam: wisps rising, cold: frosty blue tea with a little "brr" frost */
function mug(x, t, cx, cy, k, { col = PINK, steam = false, cold = true, rot = 0, level = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.3, k * 1.3)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-80, -70, 180, 170)
  x.fillStyle = INK; x.fillRect(-96, -90, 172, 180); x.fillRect(60, -50, 64, 100)
  x.fillStyle = col; x.fillRect(-88, -82, 156, 164)
  x.fillStyle = col; x.fillRect(76, -36, 36, 72); x.fillStyle = INK; x.fillRect(76, -20, 20, 40)
  x.fillStyle = cold ? '#8fb7c9' : '#b8743a'; x.fillRect(-78, -74, 136, 30 * level)
  if (cold) { x.fillStyle = '#e8fbff'; for (const [a, b] of [[-60, -58], [-10, -62], [30, -56]]) x.fillRect(a, b, 10, 6) }
  x.restore()
  if (steam && k > 0.5) {
    x.save(); x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 8; x.lineCap = 'round'
    for (let i = 0; i < 3; i++) { x.beginPath(); for (let j = 0; j <= 10; j++) { const yy = cy - 110 - j * 14, xx = cx - 40 + i * 40 + Math.sin(t * 4 + j * 0.7 + i) * 10; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
    x.restore()
  }
}
/** a microwave with a window and a timer readout */
function microwave(x, t, cx, cy, k, readout, { spin = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -100, 340, 220)
  x.fillStyle = INK; x.fillRect(-176, -116, 352, 232)
  x.fillStyle = '#d8dbe8'; x.fillRect(-168, -108, 336, 216)
  x.fillStyle = '#2a2350'; x.fillRect(-150, -90, 220, 180)
  x.fillStyle = spin ? '#ffe7a8' : '#3a2f66'; x.globalAlpha = spin ? 0.35 + 0.15 * Math.sin(t * 8) : 1; x.fillRect(-140, -80, 200, 160); x.globalAlpha = 1
  x.fillStyle = INK; x.fillRect(84, -90, 74, 44); txt(x, readout, 121, -67, { size: 22, font: MONO, weight: 700, color: MINT })
  x.fillStyle = GREY; for (let i = 0; i < 6; i++) x.fillRect(96 + (i % 2) * 30, -20 + Math.floor(i / 2) * 32, 20, 20)
  x.restore()
}
const BELL = ['...K...', '..YYY..', '.YYYYY.', '.YYYYY.', 'YYYYYYY', 'KKKKKKK']
const THERMO = ['.KK.', 'KWWK', 'KWWK', 'KWWK', 'KWWK', 'KRRK', 'KRRK', 'RRRR', 'RRRR', '.RR.']

const CAMEOS = [
  { sign: 'aries', cap: 'Chugged it anyway. | *Out of spite.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const tip = ease.inOutCubic(prog(lt, 0.6, 1.0))
      mug(x, t, 790 - tip * 120, 900 - tip * 120, pop01(t, P.t0 + 0.2, 0.35, 2), { col: RED, rot: -tip * 1.6, level: 1 - tip })
      bubble(x, 800, 640, 'GULP.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 46, tail: 'bl' })
      lab(x, 790, 1110, 'EMPTY IN 0.5 SEC', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: RED, color: BONE, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Microwaved it. | *Forgot it again.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 7)
      microwave(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 'BEEP', { spin: false })
      lab(x, 790, 1090, `REHEAT #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { bg: GREEN, rot: 0.04, size: 40 })
    } },
  { sign: 'gemini', cap: 'Made a second cup. | Forgot *both.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mug(x, t, 640, 1020, pop01(t, P.t0 + 0.2, 0.35, 2), { col: SUN })
      mug(x, t, 820, 830, pop01(t, P.t0 + 0.6, 0.35, 2), { col: MINT, steam: lt < 1.2, cold: lt >= 1.2 })
      bubble(x, 400, 610, 'wait, which | one is new?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Apologised | *to the tea.*', mood: 'heart', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      mug(x, t, 800, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { col: SKYB })
      bubble(x, 790, 700, 'i’m so sorry, | little guy', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl', col: PINK })
      hearts(x, t, 560, 1100, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Rang for | a *fresh one.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BELL, { K: INK, Y: GOLD }, 780, 980 + (lt > 0.7 && lt < 1.1 ? Math.sin(t * 40) * 4 : 0), 32 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 690, 'TEA SERVICE!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      lab(x, 790, 1130, 'STAFF: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: GREY, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Took its temperature. | *Filed a report.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mug(x, t, 760, 990, pop01(t, P.t0 + 0.2, 0.35, 2), { col: MINT })
      drawBits(x, THERMO, { K: INK, W: '#ffffff', R: RED }, 830, 820, 16 * pop01(t, P.t0 + 0.5, 0.35, 2), { rot: 0.3 })
      lab(x, 790, 660, '41°: UNACCEPTABLE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: SUN, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Renamed it | *iced tea.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mug(x, t, 800, 950, pop01(t, P.t0 + 0.2, 0.35, 2), { col: PINK })
      lab(x, 800, 720, 'ICED TEA ✓', pop01(t, P.t0 + 0.8, 0.3, 2.4), { bg: MINT, rot: -0.05, size: 42 })
      lab(x, 800, 1120, 'VIBE: INTENTIONAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: LAV, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Knows exactly | *who distracted them.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mug(x, t, 640, 1020, pop01(t, P.t0 + 0.2, 0.35, 2), { col: '#c9c9d8' })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 860, 900, 170 * k, { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 800, 660, 'it was you.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'br', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Left it | in *another country.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      card(x, 790, 820, 320, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'LOST & FOUND', 0, -70, { size: 28, font: MONO, weight: 700, color: RED })
        txt(x, '1 mug, cold', 0, -10, { size: 32 }); txt(x, 'owner: gone', 0, 50, { size: 32, color: GREY })
      })
      lab(x, 790, 1080, 'LAST SEEN: PERU', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: SUN, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Booked a tea break. | *Worked through it.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clock(x, 800, 760, 110, pop01(t, P.t0 + 0.2, 0.35, 2), 3 + Math.floor(clamp((lt - 0.3) / 1.6) * 4), (lt * 200) % 60)
      lab(x, 800, 960, 'BREAK: 3:00 PM', pop01(t, P.t0 + 0.6, 0.3, 2), { bg: BONE, rot: 0.04 })
      lab(x, 800, 1060, 'TEA: SINCE 3:00', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: SKYB, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Likes it cold. | *Always has.*', mood: lt => lt > 1.1 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mug(x, t, 800, 940, pop01(t, P.t0 + 0.2, 0.35, 2), { col: ACC })
      lab(x, 800, 700, 'ICED BEFORE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: LAV, rot: 0.04 })
      lab(x, 800, 770, 'IT WAS COOL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: LAV, rot: -0.03 })
    } },
  { sign: 'pisces', cap: 'Cried into it. | Now it’s *salty.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 1], star: ST,
    front(x, t, lt, P) {
      mug(x, t, 800, 990, pop01(t, P.t0 + 0.2, 0.35, 2), { col: LAV })
      lab(x, 800, 720, 'TEA + TEARS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: SKYB, rot: 0.04, size: 38 })
    } },
]

const F = makeFilm({
  id: 'r2t0407', key: 'E', accent: ACC, ending: 'callback',
  title: 'Tea gone cold? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve mugs. | *All cold.*' },
  last: {
    text: 'Taurus, reheat #9: | *still cold.*',
    draw(x, t, lt) {
      const t0 = t - lt
      microwave(x, t, 660, 1100, pop01(t, t0 + 0.3, 0.45, 2), lt > 1.4 ? 'BEEP' : '0:30', { spin: lt < 1.4 })
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 330, 1100, 230 * k, { mood: lt > 1.6 ? 'sleepy' : 'happy', seed: 9, look: [1, 0], hops: [t0 + 1.2] })
      lab(x, 600, 1320, 'SEE YOU AT #10', pop01(t, t0 + 1.6, 0.3, 2.4), { bg: GREEN, rot: -0.03, size: 40 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
