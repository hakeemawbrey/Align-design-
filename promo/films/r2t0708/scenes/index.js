// r2t0708: star_talk, SOLO (leo), "Your Leo sibling | *be like.*" (signs3kit social cut, lofi · G).
// One sign the whole way: nine sibling moments, each the most extreme (and lovable) big-sibling-energy Leo version.
// Ending: callback (card 1's family photo comes back, Leo in the middle again).
//   every family photo: Leo front and center · borrowed your hoodie, it's theirs now · your birthday toast, all about
//   Leo · bathroom booked for an hour · your good news? Leo announced it · game night, Leo wrote new rules
//   · front seat, called it years ago · only Leo gets to tease you · hugs you in public, loudly
//   group "Loud. Bossy. | *Always yours.*"   last "Next family photo? | *Leo, center. Again.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -190 }
const HOODIE = ['..PPPPPP..', '.PPP..PPP.', 'PPPP..PPPP', 'PPPPPPPPPP', 'PP.PPPP.PP', 'PP.PWWP.PP', 'PP.PPPP.PP', 'PP.PPPP.PP', '...PPPP...']
const HOODIE_C = { P: '#6fc3ff', W: BONE }

/** a family photo: two small siblings at the edges, a big Leo in the middle */
function familyPhoto(x, t, cx, cy, k, sc = 1) {
  if (k <= 0.01) return
  const w = 420 * sc, h = 330 * sc
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#3a2f6b'; x.fillRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 70)
  x.restore()
  friend(x, t, 'cancer', cx - 140 * sc, cy + 30 * sc, 110 * sc, k, { mood: 'happy', seed: 33 })
  friend(x, t, 'aries', cx + 140 * sc, cy + 30 * sc, 110 * sc, k, { mood: 'squint', seed: 34 })
  friend(x, t, S, cx, cy - 6 * sc, 190 * sc, k, { mood: 'sparkle', seed: 35 })
}

const CAMEOS = [
  { sign: S, cap: 'Every family photo? | Leo’s *front and center.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      familyPhoto(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), 0.82)
      L(x, 790, 1090, 'PHOTO #212. SAME POSE.', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Borrowed your hoodie. | *It’s theirs now.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      swapLabel(x, 800, 660, lt, 1.0, 'NAME TAG: YOU', 'NAME TAG: LEO', { size: 34, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: S, cap: 'Your birthday toast? | *All about Leo.*', mood: 'sparkle', star: { x: -170 }, hops: [0.9, 1.7],
    front(x, t, lt, P, F) {
      bits(x, 'MEGA', F.x + 170, F.cy - 10, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 820, 690, 'when *I* was born…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 820, 1100, 'MINUTE 14 OF THE TOAST', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, -0.04, 26)
    } },
  { sign: S, cap: 'The bathroom? | Booked *for an hour.*', mood: 'sparkle', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'DOORX', 780, 900, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const m = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 58)
      L(x, 770, 680, `OCCUPIED: ${m} MIN`, pop01(t, P.t0 + 0.5, 0.3, 2.2), RED, 0.05, 34)
      bubble(x, 800, 1110, 'almost done!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Your good news? | *Leo announced it.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FAMILY (14)', headCol: ACC, size: 22, lines: [
        ['MY SIBLING GOT', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['THE JOB!!!', GOLD, pop01(t, P.t0 + 0.8, 0.25, 2), true], ['wait, really?', BONE, pop01(t, P.t0 + 1.4, 0.25, 2), false]] })
      L(x, 800, 1110, 'YOU: STILL TYPING', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, 0.04, 28)
    } },
  { sign: S, cap: 'Game night? | Leo *wrote new rules.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 320, head: 'HOUSE RULES', headBg: ACC, headInk: INK, align: 'left', size: 28, lines: ['1. leo goes first', '2. leo wins ties', '3. see rule 1'], progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1110, 'NO APPEALS', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, -0.04, 32)
    } },
  { sign: S, cap: 'Front seat? | Called it *years ago.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'SHOTGUN!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 64, tail: 'bl' })
      L(x, 800, 960, 'CALLED: 2014', pop01(t, P.t0 + 1.0, 0.3, 2.2), CREAM, 0.05, 34)
      L(x, 800, 1090, 'VALID: FOREVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Only Leo | *gets to tease you.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'hey. that’s MY sibling', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1110, 'BODYGUARD MODE', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Hugs you in public. | *Loudly.*', mood: 'heart', look: [1, 0], star: { x: -150 }, hops: [0.8, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 830, 950, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.0 ? 'wide' : 'happy', look: [-1, 0], squash: lt > 1.0 ? 0.1 : 0 })
      bubble(x, 800, 660, 'EVERYONE, MY SIBLING!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 690, 900, P.t0 + 1.0, { n: 7, life: 1.8, spread: 240, cell: 8, seed: 1 })
    } },
]

const F = makeFilm({
  id: 'r2t0708', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Your Leo sibling | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Loud. Bossy. | *Always yours.*', mood: 'heart' },
  last: {
    text: 'Next family photo? | *Leo, center. Again.*',
    draw(x, t, lt) {
      familyPhoto(x, t, 540, 1160, pop01(t, t - lt + 0.5, 0.4, 1.8), 1.3)
      sparkles(x, t, 540, 1120, t - lt + 1.2, 9, 300, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
