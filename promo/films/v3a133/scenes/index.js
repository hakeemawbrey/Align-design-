// v3a133: ADVICE SOLO, "Pisces, your gift | is this." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign (solo, 9 cards), teary in every card: what Pisces quietly gives everyone. Ending: lesson.
//   hears what nobody says ("ok" = "help") · builds whole worlds (WORLDS BUILT: 47) · strangers' life stories at the bus stop
//   · grudges held for 4 min · the cat picks you · playlists that heal · finds the good in a grumpy cloud
//   · art that makes people feel seen · one hug fixes a week
//   group "Big heart. | *Bigger gift.*"   LESSON "Your softness | is a *superpower.*"   last "The cat agrees. | *Obviously.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, frame, bits, ORANGE, RED, PAPER } from '../props.js'

const S = 'pisces', L = { x: -190 }
const TEARS = lt => lt < 1.3 ? 1 : 2
const CAT = [['O.....O.', 'OO...OO.', 'OOOOOOO.', 'OWOOOWO.', 'OOOPOOO.', '.OOOOO..', '.OOOOOO.', 'OOOOOOOO', 'OOOOOOOO', '.OO..OO.'], { O: ORANGE, W: INK, P: PINK }]
const CLOUD = [['...WWWW.....', '..WWWWWW.WW.', '.WWWWWWWWWWW', 'WWWIWWWWIWWW', 'WWWWWWWWWWWW', 'WWWWIIIIWWWW', '.WWWWWWWWWW.'], { W: '#c9c4d8', I: INK }]
const CASTLE = x => {
  x.fillStyle = '#3a2d70'; x.fillRect(-130, 40, 260, 70)
  x.fillStyle = LAV; x.fillRect(-70, -40, 140, 90); x.fillRect(-90, -80, 40, 130); x.fillRect(50, -80, 40, 130)
  x.fillStyle = PINK; x.fillRect(-94, -100, 48, 24); x.fillRect(46, -100, 48, 24)
  x.fillStyle = INK; x.fillRect(-16, 10, 32, 40)
  x.fillStyle = GOLD; x.fillRect(80, -100, 6, 6); x.fillRect(-110, -60, 6, 6); x.fillRect(100, -20, 6, 6)
}

const CAMEOS = [
  { sign: S, cap: 'You hear what | *nobody says.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], tears: TEARS, star: L,
    front(x, t, lt, P) {
      note(x, 790, 720, pop01(t, P.t0 + 0.2, 0.3, 2), '“ok.”', { head: 'THEY SAID', headBg: BONE, size: 54, w: 300 })
      note(x, 790, 990, pop01(t, P.t0 + 1.0, 0.3, 2), '“please call.”', { head: 'YOU HEARD', headBg: SKYB, size: 46, w: 340, rot: 0.04 })
    } },
  { sign: S, cap: 'Your imagination | *builds whole worlds.*', mood: 'sparkle', look: [1, -1], tears: TEARS, star: L,
    front(x, t, lt, P) {
      frame(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 280, 230, CASTLE, { col: LAV })
      label(x, 790, 1060, 'WORLDS BUILT: 47', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Strangers tell you | *their life story.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], tears: TEARS, star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'so anyway, | back in 1998…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl', col: BONE })
      label(x, 790, 900, 'BUS STOP: THERAPY', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'they feel better ✦', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'You forgive | *faster than anyone.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], tears: TEARS, star: L,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'grudges: 0', { head: 'GRUDGE LIST', headBg: RED, size: 48, w: 340 })
      label(x, 790, 980, 'HELD FOR: 4 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Animals | *pick you first.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], tears: TEARS, star: L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CAT[0], CAT[1], 800, 940 - 30 * Math.max(0, Math.sin(Math.PI * prog(lt, 0.3, 0.8))), 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 680, 'THE CAT CHOSE YOU', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 860, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Your playlists | *heal people.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], tears: TEARS, star: L,
    front(x, t, lt, P) {
      phone(x, 790, 800, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '♪', head: 'PLAYLIST', msg: 'for your | bad day ♡', bg: LAV })
      bubble(x, 790, 1110, 'it worked.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'You find the good | *in everyone.*', mood: 'happy', look: [1, 0], tears: TEARS, star: L,
    front(x, t, lt, P) {
      const happy = lt > 1.1
      const bm = happy ? CLOUD[0].map((r, j) => j === 5 ? 'WWWIWWWWIWWW' : j === 6 ? '.WWWIIIIWWW.' : r) : CLOUD[0]
      drawBits(x, bm, CLOUD[1], 790, 800, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1020, 'secretly sweet', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Your art makes people | *feel seen.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], tears: TEARS, star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      frame(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 240, 200, x2 => { x2.fillStyle = '#2a2350'; x2.fillRect(-120, -100, 240, 200); drawBits(x2, ['...Y...', '...Y...', 'YYYYYYY', '.YEYEY.', '..YYY..', '.YY.YY.', 'Y.....Y'], { Y: '#b9a8ff', E: INK }, 0, 0, 22) })
      bubble(x, 790, 1060, 'is that… me?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl', col: BONE })
    } },
  { sign: S, cap: 'One hug from you | *fixes a whole week.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: TEARS, star: L, hops: [1.0],
    front(x, t, lt, P) {
      label(x, 790, 720, 'HUG: 10/10', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 52, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 900, 'WEEK: FIXED ✓', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 42, bg: MINT, rot: 0.04 })
      hearts(x, t, 350, 1000, P.t0 + 0.8, { n: 6, life: 2, spread: 200, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'v3a133', key: 'F', accent: PINK, solo: S, ending: 'lesson',
  title: 'Pisces, your gift | *is this.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger gift.*', mood: 'heart' },
  lesson: { text: 'Your softness | is a *superpower.*', chip: 'GIFT: RECEIVED' },
  last: {
    text: 'The cat agrees. | *Obviously.*',
    draw(x, t, lt) { drawBits(x, CAT[0], CAT[1], 540, 1400, 18 * pop01(t, t - lt + 0.7, 0.35, 2)); hearts(x, t, 540, 1300, t - lt + 1.0, { n: 5, life: 2, spread: 260, cell: 7, seed: 8 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
