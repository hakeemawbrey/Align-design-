// r2t0700: star_talk, ROLLCALL, "The signs | *as neighbours.*" (signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme neighbour version of itself. Ending: lesson.
//   ♈ mows the lawn at 6 a.m. · ♉ grows tomatoes, counts every one · ♊ already knows the new neighbour's sign
//   · ♋ welcomed you with four casseroles · ♌ house lights visible from space · ♍ measured your hedge (2 cm over)
//   · ♎ repainted the door nine times · ♏ curtains always closed, waves anyway · ♐ moved in Monday, out Friday
//   · ♑ chairs the street committee · ♒ telescope on the roof, aimed at Saturn · ♓ feeds every stray cat, cries
//   group "One street. | *Twelve energies.*"  LESSON "A friendly wave | *goes a long way.*"
//   last "Welcome to | *the street.*" (Cancer's casserole, one more)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, RED, CREAM, STEEL, WOOD, clamp, ease, prog, lerp } from './props.js'

const ST = { x: -200 }
const MOWER = ['........KK', '.......K..', '......K...', '.RRRRRRR..', 'RRRRRRRRR.', 'RRRRRRRRR.', '.K.....K..']
const TOMATO = ['..G.G..', '...G...', '.RRRRR.', 'RRWRRRR', 'RRRRRRR', 'RRRRRRR', '.RRRRR.']
const HEDGE = ['..GGGGGG..', '.GGgGGGgG.', 'GGGGGgGGGG', 'GgGGGGGGgG', 'GGGGgGGGGG', 'GGgGGGGgGG', '.GGGGGGGG.']
const SCOPE = ['.......SS', '.....SSSS', '...SSSS..', '.SSSS....', 'SSS......', '...K.....', '..K.K....', '.K...K...']
const CAT = ['K...K....', 'KK.KK....', 'KKKKK....', 'KWKWK...K', 'KKPKK...K', '.KKKKKKKK', '.KKKKKKK.', '.K.K.K.K.']
const CURTAIN = ['RRRRRRRRRRRR', 'RRRRR..RRRRR', 'RRRRR..RRRRR', 'RRRRR..RRRRR', 'RRRRR..RRRRR', 'RRRRR..RRRRR', 'RRRRR..RRRRR', 'RRRRRRRRRRRR']

const CAMEOS = [
  { sign: 'aries', cap: 'Mows the lawn | *at 6 a.m.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      drawBits(x, MOWER, { R: RED, K: INK }, 760 + Math.sin(t * 6) * 40, 960, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 820, 'VRRRMMM', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 650, '6:00 AM ☀', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 40)
    } },
  { sign: 'taurus', cap: 'Grows tomatoes. | *Counts every one.*', mood: lt => lt > 1.2 ? 'squint' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, TOMATO, { R: RED, G: '#4fbf6a', W: '#ffb0b0' }, 680 + (i % 3) * 100, 860 + Math.floor(i / 3) * 110, 12 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      L(x, 790, 680, `COUNT: ${1 + Math.floor(clamp((lt - 0.4) / 1.4) * 39)}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), MINT, -0.04, 38)
      L(x, 790, 1120, 'ALL PRESENT ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Already knows | *the new neighbour’s sign.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'did you hear?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 880, 'they’re a | SCORPIO.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl', col: '#ffd23a' })
      L(x, 790, 1110, 'STREET NEWS', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Welcomed you | with *four casseroles.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'DISH', 790 + (i % 2 ? 14 : -10), 1080 - i * 95, 16 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2))
      L(x, 790, 640, 'WELCOME!! ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.05, 36)
    } },
  { sign: 'leo', cap: 'House lights. | *Visible from space.*', mood: 'sparkle', star: ST, hops: [1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'HOUSE', 790, 900, 34 * k)
      if (k > 0.5) for (let i = 0; i < 14; i++) { x.fillStyle = [GOLD, PINK, MINT, SKYB][(i + Math.floor(t * 6)) % 4]; x.fillRect(680 + i * 17, 790 + Math.abs(i - 6.5) * -9 + 60, 12, 12) }
    },
    front(x, t, lt, P) {
      sparkles(x, t, 790, 860, P.t0 + 1.0, 8, 220, 0.4)
      L(x, 790, 1120, 'SEEN FROM ORBIT', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Measured your hedge. | *Two centimetres over.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HEDGE, { G: '#3a9a4a', g: '#5fd068' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sheet(x, 820, 1080, pop01(t, P.t0 + 1.1, 0.3, 2), { w: 260, h: 120, lines: ['a friendly note:', ['trim 2 cm ♡', RED]], size: 26, rot: 0.05 })
    } },
  { sign: 'libra', cap: 'Painted the door. | *Repainted it nine times.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = [PINK, SKYB, MINT, GOLD, LAV, '#ff9a5a', '#b5d98a', '#ffd0e0', '#9aa5c4'], n = Math.min(8, Math.floor(lt * 3.6))
      bits(x, 'DOORX', 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.fillStyle = cols[n]; x.fillRect(790 - 26 * 3, 880 - 26 * 3, 26 * 6, 26 * 7)
      x.fillStyle = GOLD; x.fillRect(790 + 26, 880 + 26 * 0.5, 22, 22)
      L(x, 790, 1120, `COAT ${n + 1}`, 1, cols[n], 0.04, 38)
    } },
  { sign: 'scorpio', cap: 'Curtains always closed. | *Waves anyway.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CURTAIN, { R: '#5a2a6a' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.9) { const w = Math.sin(t * 10) * 10; x.fillStyle = INK; x.fillRect(778 + w, 830, 28, 40); x.fillStyle = '#ff5a7a'; x.fillRect(782 + w, 834, 20, 32) }
      L(x, 790, 1120, 'HI. (MYSTERIOUSLY)', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Moved in Monday. | *Moving out Friday.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BOX', 760 + i * 30, 1060 - i * 90, 18 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 790, 680, lt < 1.2 ? 'NEW HOME!' : 'NEW CITY!', 1, lt < 1.2 ? MINT : GOLD, 0.05, 40)
    } },
  { sign: 'capricorn', cap: 'Chairs the | *street committee.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'AGENDA', headBg: '#3a6a5a', lines: ['1. bins', '2. bins', ['3. ARIES’ MOWER', RED]], size: 28, progress: clamp((lt - 0.4) / 1.0), align: 'left' })
      L(x, 790, 1110, 'MEETING: WEEKLY', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Telescope on the roof. | *Aimed at Saturn.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCOPE, { S: STEEL, K: INK }, 790, 930, 32 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(870, 650); x.scale(k, k); x.fillStyle = '#ffd08a'; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill(); x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 0, 62, 16, -0.3, 0, Math.PI * 2); x.stroke(); x.restore() }
      L(x, 720, 1120, 'HI, SATURN', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Feeds every stray cat. | *Named them after signs.*', mood: 'heart', look: [1, 0], tears: lt => lt > 1.0 ? 3 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CAT, { K: ['#ffb34a', '#9aa5c4', '#2a2350'][i], W: BONE, P: PINK }, 680 + i * 115, 970 - (i % 2) * 40, 15 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2))
      L(x, 790, 700, 'MEET LEO & LIBRA', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.04, 32)
      hearts(x, t, 790, 920, P.t0 + 1.4, { n: 4, life: 1.4, spread: 200, cell: 6, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0700', key: 'F', accent: '#7ed38a', ending: 'lesson',
  title: 'The signs | *as neighbours.*',
  cameos: CAMEOS,
  group: { cap: 'One street. | *Twelve energies.*' },
  lesson: { text: 'A friendly wave | *goes a long way.*', chip: 'STREET: ALIGNED' },
  last: {
    text: 'Welcome to | *the street.*',
    draw(x, t, lt) { bits(x, 'DISH', 540, 1500, 22 * pop01(t, t - lt + 0.8, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
