// r2t0610: star_talk, SOLO (aquarius), "Aquarians on a trip | *be like.*" (signs3kit social cut, music: lofi · F).
// Nine trip moments, each the most extreme Aquarius version. Ending: lesson.
//   picked the destination by spinning a globe · skipped the sights for a museum of odd spoons · fourteen chargers
//   · best friends with a local pigeon (Gary) · refused the group tour, started their own · 2am debate with a
//   stranger, now besties · zero selfies, forty photos of one door · a match asked for plans, got a mystery map
//   · home for an hour, already planning trip two
//   group "No plan. | *Best trip ever.*"  lesson "Love an Aquarius? | *Let them be weird.*"  VIBE: UNIQUE
//   last "Gary the pigeon | *says hi.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', S = 'aquarius', ST = { x: -190 }
const PIGEON = ['..GGG....', '.GGKGG...', '.GGGGGY..', '..GGGG...', '.SSSSSS..', 'SSSSSSSS.', '.SSSSSSS.', '...Y..Y..']
const PC = { G: '#7a8aa8', K: INK, Y: '#ffb34a', S: '#9aa5c4' }
const DOOR = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDYDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KKKKKKKKKK']
const SPOON = ['.SSS.', 'SSSSS', 'SSSSS', '.SSS.', '..S..', '..S..', '..S..', '..S..', '..S..']
const FLAG = ['KRRRRR', 'KRRRRR', 'KRRRRR', 'K.....', 'K.....', 'K.....', 'K.....']

function globe(x, t, cx, cy, r, k, spin) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#3a8fd0'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip(); x.fillStyle = '#5fd068'
  for (let i = 0; i < 4; i++) { const px = ((i * 90 + spin * r * 3) % (r * 4)) - r * 2; x.fillRect(px, -r * 0.5 + i * 22, r * 0.6, r * 0.35) }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Picked the destination | by *spinning a globe.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sp = ease.outCubic(clamp(lt / 1.4)) * 8
      globe(x, t, 800, 820, 130, pop01(t, P.t0 + 0.2, 0.3, 2), sp)
      L(x, 800, 1060, lt > 1.4 ? 'DESTINATION: A FIELD' : 'DESTINATION: ???', pop01(t, P.t0 + 0.4, 0.3, 2), lt > 1.4 ? MINT : CREAM, -0.04, 30)
    } },
  { sign: S, cap: 'Skipped the sights. | Saw *a spoon museum.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, SPOON, { S: [STEEL, GOLD, BONE][i] }, 720 + i * 80, 840, 18 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.15 })
      L(x, 800, 620, 'MUSEUM OF ODD SPOONS', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 28)
      L(x, 800, 1070, 'RATING: LIFE CHANGING', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Packed one outfit. | *Fourteen chargers.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(14, Math.floor(Math.max(0, lt - 0.4) * 9))
      L(x, 800, 1040, `CHARGERS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), SKYB, -0.04, 34)
    } },
  { sign: S, cap: 'Best friends with | *a local pigeon.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PIGEON, PC, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 5) })
      bubble(x, 800, 650, 'coo.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 50, tail: 'bc' })
      L(x, 800, 1090, 'NAME: GARY', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Refused the group tour. | *Started their own.*', mood: 'wink', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, R: SKYB }, 820, 800, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 4) })
      bubble(x, 760, 620, 'follow me!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 1070, 'FOLLOWERS: 1 PIGEON', pop01(t, P.t0 + 1.3, 0.3, 2.2), CREAM, 0.04, 28)
    } },
  { sign: S, cap: 'Debated a stranger at 2am. | *Now besties.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 900, 620, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 760, 'hear me out…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      bubble(x, 800, 930, 'oh my gosh, YES', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      L(x, 800, 1090, 'TOPIC: EVERYTHING', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, -0.04, 28)
    } },
  { sign: S, cap: 'Zero selfies. | *Forty photos of a door.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, W: '#c98f5a', D: '#6fc3ff', Y: GOLD }, 810, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 810, 640, `PHOTOS: ${Math.min(40, Math.floor(Math.max(0, lt - 0.4) * 26))}`, pop01(t, P.t0 + 0.4, 0.3, 2), CREAM, -0.04, 32)
      L(x, 810, 1090, 'IT’S A GOOD DOOR', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Match asked for the plan. | Got *a mystery map.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 620, '✦ MATCH: GEMINI', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 30)
      bits(x, 'MAP', 800, 850, 26 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.06 })
      bubble(x, 800, 1060, 'trust me', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bc' })
    } },
  { sign: S, cap: 'Home for an hour. | *Planning trip two.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'TRIP #2', headBg: '#6fc3ff', headInk: INK, lines: ['where: ?', 'when: now', 'why: why not'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      sparkles(x, t, 800, 860, P.t0 + 1.4, 7, 190, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2t0610', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aquarians on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'No plan. | *Best trip ever.*', mood: 'sparkle' },
  lesson: { text: 'Love an Aquarius? | *Let them be weird.*', chip: 'VIBE: UNIQUE' },
  last: {
    text: 'Gary the pigeon | *says hi.*',
    draw(x, t, lt) {
      drawBits(x, PIGEON, PC, 850, 960, 18 * pop01(t, t - lt + 0.6, 0.35, 2.2), { rot: 0.05 * Math.sin(t * 5) })
      bubble(x, 850, 780, 'coo.', pop01(t, t - lt + 1.2, 0.25, 2.2), { size: 44, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
