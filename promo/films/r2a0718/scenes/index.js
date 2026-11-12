// r2a0718: star_advice, ADVICE SOLO (pisces), "Pisces, softness | is a superpower." (the batch hook "Pisces, your
// softness | is a superpower." re-cut so it fits two lines) (signs3kit social cut, lofi · C). Ending: lesson.
// One sign the whole way (Pisces cries in every card): nine soft traits, each reframed as a strength, one light gag each.
//   cried at an advert, heart works · feelings antenna picks up every mood · remembers the little things
//   · water beats rock · daydream cloud full of ideas · forgiving with boundaries (a soft shield) · moved a snail off
//   the path · a mix that made a friend cry (the good kind) · a tiny superhero cape
//   group "Soft heart. | Strong soul."   LESSON "Feeling deeply | is a kind of strength."   last "Cape on. | Tissues ready."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, rain, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'
import { drawPixelStar } from '../../sky.js'

const ACC = '#9fb4ff', S = 'pisces', ST = { x: -190 }
const SNAIL = ['....SSSS....', '...SBBBBS...', '..SBSSSSBS..', '..SBSBBSBS..', '..SBSSBSBS..', 'G..SBBBBS...', 'GG..SSSS....', 'GGGGGGGGGGGG', '.GGGGGGGGGG.']
const SNAIL_C = { S: '#c98f5a', B: '#ffcf8a', G: '#9fe07a' }
const T2 = lt => lt > 1.2 ? 2 : 1

/** a little antenna on the star's head with signal rings */
function antenna(x, t, F, k) {
  if (k <= 0.01) return
  const top = F.top - 10
  x.save(); x.globalAlpha *= clamp(k)
  x.fillStyle = INK; x.fillRect(F.x - 4, top - 70, 8, 72); x.fillStyle = PINK; x.fillRect(F.x - 12, top - 88, 24, 24)
  x.strokeStyle = SKYB; x.lineWidth = 5
  for (let i = 0; i < 3; i++) { const r = 30 + ((t * 60 + i * 30) % 90); x.globalAlpha = k * (1 - r / 120); x.beginPath(); x.arc(F.x, top - 76, r, -2.6, -0.5); x.stroke() }
  x.restore()
}
/** a little cape behind the star */
function cape(x, t, F, k) {
  if (k <= 0.01) return
  const w = 1 + 0.06 * Math.sin(t * 6)
  x.save(); x.translate(F.x, F.cy - 40); x.scale(k * w, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -10); x.lineTo(70, -10); x.lineTo(150, 190); x.lineTo(-150, 190); x.closePath(); x.fill()
  x.fillStyle = '#ff5a8a'; x.beginPath(); x.moveTo(-62, -4); x.lineTo(62, -4); x.lineTo(138, 180); x.lineTo(-138, 180); x.closePath(); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Cried at an advert? | *Your heart works.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 800, 860, P.t0 + 0.6, { n: 3, life: 1.6, spread: 90, cell: 6, seed: 2 })
      L(x, 800, 1090, 'HEART: FULLY ON', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Feel every mood in the room? | *That’s a gift.*', mood: 'sparkle', tears: 1, star: { x: -150 },
    back(x, t, lt, P, F) { antenna(x, t, F, pop01(t, P.t0 + 0.3, 0.35, 2)) },
    front(x, t, lt, P) {
      L(x, 810, 700, 'SIGNAL: STRONG', pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, 0.05, 32)
      L(x, 810, 1040, 'EMPATHY: MAX', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 36)
    } },
  { sign: S, cap: 'You remember the little things. | *People feel seen.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 360, head: 'I REMEMBER', headBg: ACC, headInk: INK, lines: ['oat milk', 'hates mondays', 'dog: biscuit', 'b-day: 3rd'], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.2) })
      L(x, 800, 1110, 'FRIEND: TOUCHED', pop01(t, P.t0 + 1.8, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Soft isn’t weak. | *Water shapes stone.*', mood: 'sparkle', tears: 2, look: [1, 1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'CLOUD', 800, 640, 16 * k)
      rain(x, t, 800, 680, { w: 180, h: 200, alpha: k })
      x.save(); x.globalAlpha = k
      x.fillStyle = INK; x.fillRect(672, 908, 256, 136); x.fillStyle = '#8a8aa0'; x.fillRect(680, 916, 240, 120)
      const d = ease.outCubic(clamp((lt - 0.6) / 1.2))
      x.fillStyle = SKYB; x.fillRect(790, 916, 20, 120 * d)
      x.restore()
      L(x, 800, 1110, 'WATER: WINS', pop01(t, P.t0 + 1.7, 0.3, 2.2), SKYB, -0.04, 34)
    } },
  { sign: S, cap: 'Daydreaming again? | *That’s where ideas live.*', mood: 'sparkle', tears: 1, look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bits(x, 'CLOUD', 800, 840, 26 * k)
      for (let i = 0; i < 4; i++) if (lt > 0.6 + i * 0.25) drawPixelStar(x, 716 + i * 58, 830 + (i % 2) * 24 - 16, 44, 2, [GOLD, PINK, MINT, SKYB][i])
      L(x, 800, 1080, 'IDEAS: LOADING', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Forgive, sure. | *Boundaries too.*', mood: 'happy', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 800, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 1090, 'SOFT + SAFE', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 38)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Moved a snail off the path? | *Hero behaviour.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: T2, look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const m = ease.inOutCubic(clamp((lt - 0.6) / 0.9))
      drawBits(x, SNAIL, SNAIL_C, lerp(760, 860, m), lerp(1000, 920, m) - Math.sin(Math.PI * m) * 80, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'RESCUE: SUCCESS', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
      hearts(x, t, 860, 860, P.t0 + 1.6, { n: 3, life: 1.2, spread: 80, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Your mix made them cry? | *The good kind.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: T2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 800, 900, { n: 5, cell: 8, col: ACC, seed: 2 })
      L(x, 800, 700, 'A MIX FOR YOU', pop01(t, P.t0 + 0.3, 0.3, 2), LAV, -0.04, 36)
      friend(x, t, 'leo', 820, 1010, 150, pop01(t, P.t0 + 1.0, 0.35, 2), { mood: 'heart', look: [-1, 0], tears: 1 })
    } },
  { sign: S, cap: 'Gentle hearts | *save the day.*', mood: 'sparkle', tears: 1, star: { x: -150 }, hops: [1.0, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P, F) { cape(x, t, F, pop01(t, P.t0 + 0.6, 0.35, 2.2)) },
    front(x, t, lt, P) {
      L(x, 810, 700, 'SUPER: SOFT', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#ff5a8a', 0.05, 40)
      sparkles(x, t, 400, 860, P.t0 + 1.0, 9, 220, 0.6)
      hearts(x, t, 810, 1000, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0718', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Pisces, softness | *is a superpower.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong soul.*', mood: 'sparkle' },
  lesson: { text: 'Feeling deeply | is *a kind of strength.*', chip: 'POWER: SOFT' },
  last: {
    text: 'Cape on. | *Tissues ready.*',
    draw(x, t, lt) { bits(x, 'TISSUE', 800, 1300, 16 * pop01(t, t - lt + 0.8, 0.35, 2.2)); hearts(x, t, 540, 1560, t - lt + 0.4, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
