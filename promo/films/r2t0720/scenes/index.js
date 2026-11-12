// r2t0720: THE SIGNS AS… v3, BE LIKE, "Zodiacs in a | group hug be like." (the batch hook "Zodiacs when they get a group
// hug | be like." re-cut so it fits two lines) (signs3kit social cut, lofi · F). Ending: lesson.
//   ♈ started it at full sprint · ♉ refused to let go (hour 2) · ♊ hugged everyone twice, still talking · ♋ "I love you
//   guys" · ♌ got the middle, of course · ♍ fixed everyone's collars · ♎ made room for one more · ♏ "I don't do hugs",
//   stayed the longest · ♐ turned it into a dance · ♑ stood stiff, secretly melting · ♒ also hugged the houseplant
//   · ♓ instant tears
//   group "Twelve signs. | One big squeeze."   LESSON "Everyone hugs differently. | Everyone means it."   last "Scorpio? | Still hugging."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { signStar } from '../../startalk.js'
import { L, sheet, friend, bits, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }
/** a hug buddy next to the star, leaning in, with little arms across */
function buddy(x, t, id, P, F, { at = 0.4, mood = 'heart', s = 190, dx = 270 } = {}) {
  const k = pop01(t, P.t0 + at, 0.35, 2)
  if (k <= 0.01) return null
  const lean = ease.outCubic(clamp((t - P.t0 - at) / 0.5))
  const B = friend(x, t, id, F.x + dx - lean * 40, F.cy + 20, s, k, { mood, look: [-1, 0], seed: 60 })
  x.save(); x.globalAlpha = clamp(lean)
  const c = signColor(id)
  x.fillStyle = INK; x.fillRect(F.x + 60, F.cy + 62, dx - 110, 24); x.fillStyle = c; x.fillRect(F.x + 64, F.cy + 66, dx - 118, 16)
  x.restore()
  return B
}
const signColor = id => signStar(id).color

const CAMEOS = [
  { sign: 'aries', cap: 'Started the hug. | *At full sprint.*', mood: 'sparkle', star: { x: -230 }, hops: [0.3, 0.6],
    front(x, t, lt, P, F) {
      buddy(x, t, 'libra', P, F, { at: 0.7, mood: 'wide' })
      L(x, 760, 1110, 'SPEED: MAX', pop01(t, P.t0 + 0.4, 0.3, 2), '#ff6b5a', -0.05, 40)
      hearts(x, t, 640, 820, P.t0 + 1.0, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 1 })
    } },
  { sign: 'taurus', cap: 'Joined the hug. | *Refused to let go.*', mood: 'heart', star: { x: -230 },
    front(x, t, lt, P, F) {
      buddy(x, t, 'gemini', P, F, { at: 0.3, mood: lt > 1.3 ? 'wide' : 'happy' })
      const h = 1 + Math.floor(clamp((lt - 0.7) / 1.2) * 2.99)
      L(x, 800, 660, `HOUR ${h}`, pop01(t, P.t0 + 0.7, 0.3, 2), MINT, 0.05, 44)
    } },
  { sign: 'gemini', cap: 'Hugged everyone twice. | *Still talking.*', mood: 'happy', star: { x: -230 }, hops: [0.9, 1.6],
    front(x, t, lt, P, F) {
      buddy(x, t, lt < 1.2 ? 'cancer' : 'leo', P, F, { at: lt < 1.2 ? 0.3 : 1.2, mood: 'happy' })
      bubble(x, 760, 660, 'ok wait one | more thing', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Squeezed the tightest. | *“I love you guys.”*', mood: 'heart', tears: lt => lt > 1.2 ? 1 : 0, star: { x: -230 },
    front(x, t, lt, P, F) {
      buddy(x, t, 'taurus', P, F, { at: 0.3, mood: 'heart' })
      bubble(x, 760, 660, 'i love | you guys', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl', col: PINK })
      hearts(x, t, 640, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Got the middle spot. | *Of course.*', mood: 'sparkle', star: { x: 0, y: 30 }, hops: [1.0],
    front(x, t, lt, P, F) {
      friend(x, t, 'virgo', 330, 920, 150, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [1, 0] })
      friend(x, t, 'aries', 750, 920, 150, pop01(t, P.t0 + 0.45, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 540, 640, 'CENTER: TAKEN', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 38)
    } },
  { sign: 'virgo', cap: 'Mid-hug. | *Fixed everyone’s collar.*', mood: 'squint', star: { x: -230 },
    front(x, t, lt, P, F) {
      buddy(x, t, 'sagittarius', P, F, { at: 0.3, mood: 'happy' })
      const n = Math.floor(clamp((lt - 0.6) / 1.2) * 4.99)
      L(x, 800, 660, `COLLARS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), MINT, 0.04, 40)
    } },
  { sign: 'libra', cap: 'Made sure there was | *room for one more.*', mood: 'heart', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P, F) {
      buddy(x, t, 'pisces', P, F, { at: 0.3, mood: 'happy' })
      bubble(x, 760, 650, 'come in!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 760, 1110, 'NOBODY LEFT OUT', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: '“I don’t do hugs.” | *Stayed the longest.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', star: { x: -230 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      bubble(x, 760, 650, 'no hugs.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      buddy(x, t, 'cancer', P, F, { at: 0.9, mood: 'heart' })
      L(x, 760, 1110, 'STILL HUGGING', pop01(t, P.t0 + 1.7, 0.3, 2.2), '#c97bff', 0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Group hug? | *Now it’s a dance.*', mood: 'happy', star: { x: -170 }, hops: [0.6, 1.0, 1.4, 1.8], squash: lt => Math.sin(lt * 9) * 0.06,
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 790, 920 - Math.abs(Math.sin(t * 6)) * 30, 170, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      notes(x, t, 600, 760, { n: 5, cell: 8, col: '#c97bff', seed: 4 })
      L(x, 790, 660, 'CONGA LINE', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.05, 40)
    } },
  { sign: 'capricorn', cap: 'Stood stiff. | *Secretly loved it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', star: { x: -230 },
    front(x, t, lt, P, F) {
      buddy(x, t, 'leo', P, F, { at: 0.3, mood: 'heart' })
      L(x, 800, 660, lt > 1.3 ? 'HEART: MELTING' : 'POSTURE: STRAIGHT', 1, lt > 1.3 ? PINK : STEEL, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Hugged everyone. | *Also the houseplant.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'FLOWER', 800, 880, 20 * pop01(t, P.t0 + 0.6, 0.35, 2))
      L(x, 800, 650, 'INCLUDED: ALL', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#6fc3ff', 0.04, 36)
      hearts(x, t, 640, 1060, P.t0 + 1.2, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: 'pisces', cap: 'Group hug? | *Instant tears.*', mood: 'heart', tears: 3, star: { x: -230 },
    front(x, t, lt, P, F) {
      buddy(x, t, 'libra', P, F, { at: 0.3, mood: 'happy' })
      bits(x, 'TISSUE', 790, 650, 18 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
    } },
]

const F = makeFilm({
  id: 'r2t0720', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Zodiacs in a | group hug *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One big squeeze.*', moods: Array(12).fill('heart') },
  lesson: { text: 'Everyone hugs differently. | *Everyone means it.*', chip: 'HUG: COMPLETE' },
  last: {
    text: 'Scorpio? | *Still hugging.*',
    draw(x, t, lt) { hearts(x, t, 540, 1580, t - lt + 0.5, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 3 }); bubble(x, 600, 1640, 'one more minute', pop01(t, t - lt + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
