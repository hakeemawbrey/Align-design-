// r2t0741: THE SIGNS AS… v3, "The signs | on a walking tour." (~56 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs on one city walking tour, each the most extreme version of itself. Ending: callback.
//   ♈ finished before the guide · ♉ rated every bench · ♊ question #42 · ♋ adopted a pigeon (Dave) · ♌ tourists
//   photograph Leo · ♍ corrected the guide's dates · ♎ forty minutes choosing a magnet · ♏ found the staff-only door
//   · ♐ one wrong turn, now abroad · ♑ asked about property values · ♒ now runs a rival tour · ♓ cried at a plaque, unread
//   group "Nobody followed | *the flag.*"
//   last "Best souvenir? | *Dave the pigeon.*" (Cancer's pigeon comes home)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, swapLabel, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }

const FLAG = ['K.......', 'KRRRRRR.', 'KRRWRRRR', 'KRRRRRR.', 'K.......', 'K.......', 'K.......', 'K.......', 'K.......', 'K.......']
const FLAG_C = { K: INK, R: '#ff6b5a', W: CREAM }
const BENCH = ['WWWWWWWWWWWWWW', 'DDDDDDDDDDDDDD', 'WWWWWWWWWWWWWW', '..............', 'WWWWWWWWWWWWWW', 'DDDDDDDDDDDDDD', '.K..........K.', '.K..........K.', '.K..........K.']
const BENCH_C = { W: '#c98f5a', D: WOOD, K: INK }
const PIGEON = ['....GGG.....', '...GGKGG....', '...GGGGGO...', '....PGG.....', '..GGGGGGG...', '.GGGGGGGGGG.', 'GGGLLGGGGGGG', '.GGGLLLGGGG.', '...GGGGGG...', '....O..O....']
const PIGEON_C = { G: '#9aa5c4', K: INK, O: '#ff9a4a', P: '#8fe3a8', L: '#c9cfe0' }
const CAMERA = ['....KKK.....', 'KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSSSKKKKSSSK', 'KSSKWWBBKSSK', 'KSSKWBBBKSSK', 'KSSSKKKKSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK']
const CAMERA_C = { K: INK, S: STEEL, W: '#ffffff', B: SKYB }
const MAGNET = ['KKKKKKKK', 'KAAAAAAK', 'KAWAAWAK', 'KAAAAAAK', 'KAAWWAAK', 'KKKKKKKK']
const DOOR = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDYDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KWDDDDDDWK', 'KKKKKKKKKK']
const DOOR_C = { K: INK, W: '#6b62a8', D: '#3a2a5a', Y: GOLD }

/** a little street map with a dotted route that wanders off the edge */
function routeMap(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-166, -126, 348, 268)
  x.fillStyle = INK; x.fillRect(-180, -140, 360, 280)
  x.fillStyle = '#bfe0a8'; x.fillRect(-172, -132, 344, 264)
  x.fillStyle = CREAM; x.fillRect(-172, -20, 344, 30); x.fillRect(-40, -132, 30, 264)
  const p = clamp((lt - 0.3) / 1.4)
  x.fillStyle = RED
  for (let i = 0; i < 18; i++) { if (i / 18 > p) break; const u = i / 17; x.fillRect(-140 + u * 330, 90 - u * 40 - Math.sin(u * 6) * 40, 12, 12) }
  x.fillStyle = INK; x.beginPath(); x.arc(-140, 96, 16, 0, Math.PI * 2); x.fill(); x.fillStyle = MINT; x.beginPath(); x.arc(-140, 96, 10, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Finished the tour | *before the guide.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: ST, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 + Math.sin(t * 5) * 0.04 })
      L(x, 800, 620, 'STOP 1 OF 12', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 32)
      swapLabel(x, 800, 1090, lt, 1.2, 'GUIDE: AT STOP 2', 'ARIES: DONE. LAP TWO?', { size: 28, fromBg: CREAM, toBg: '#ff6b5a' })
    } },
  { sign: 'taurus', cap: 'Skipped the castle. | *Rated the benches.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: { x: -170, y: -20 },
    front(x, t, lt, P) {
      drawBits(x, BENCH, BENCH_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 8)
      L(x, 800, 700, `BENCH #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), CREAM, -0.04, 36)
      L(x, 800, 1080, '★★★★★ COMFY', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Asked the guide | *question forty-two.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'wide', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 41)
      L(x, 800, 680, `QUESTION #${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), '#ffd23a', -0.05, 40)
      bubble(x, 800, 900, 'ok but what | about pigeons?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1090, 'GUIDE: SITTING DOWN', pop01(t, P.t0 + 1.7, 0.3, 2.2), STEEL, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Adopted a pigeon | *by stop three.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PIGEON, PIGEON_C, 800, 880, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { sx: Math.floor(t * 3) % 2 ? 1 : -1 })
      L(x, 800, 1090, 'HIS NAME IS DAVE', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, 0.04, 34)
      hearts(x, t, 800, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'The tourists took photos. | *Of Leo.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 810, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      for (const f of [0.9, 1.4, 1.9]) { const d = lt - f; if (d > 0 && d < 0.18) { x.save(); x.globalAlpha = 0.5 * (1 - d / 0.18); x.fillStyle = '#fffbe8'; x.fillRect(110, 480, 860, 760); x.restore() } }
      L(x, 810, 650, 'NEW LANDMARK', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#ffb34a', 0.04, 36)
      bubble(x, 810, 1080, 'one more angle', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Corrected the guide. | *With footnotes.*', mood: 'squint', star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'ACTUALLY…', headBg: '#5fd068', headInk: INK, lines: ['built 1642', ['no: 1643¹', RED], '', '¹ see page 9'], size: 32, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1100, 'SOURCES: ATTACHED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Forty minutes | *picking one magnet.*', mood: lt => lt > 1.7 ? 'sparkle' : 'neutral', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const pick = Math.floor(lt * 2.5) % 2
      drawBits(x, MAGNET, { K: INK, A: PINK, W: CREAM }, 700, 860, 20 * k, { rot: -0.08, alpha: pick ? 1 : 0.5 })
      drawBits(x, MAGNET, { K: INK, A: SKYB, W: CREAM }, 890, 860, 20 * k, { rot: 0.08, alpha: pick ? 0.5 : 1 })
      bubble(x, 800, 680, pick ? 'this one?' : 'no… that one?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1080, 'GIFT SHOP: CLOSING', pop01(t, P.t0 + 1.7, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Found the secret door. | *Told no one.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 810, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 810, 640, 'STAFF ONLY', pop01(t, P.t0 + 0.5, 0.3, 2.2), RED, -0.04, 36)
      bubble(x, 810, 1090, 'what door?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Took one wrong turn. | *Now abroad.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      routeMap(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 650, 'YOU ARE: ??', pop01(t, P.t0 + 0.6, 0.3, 2.2), '#ff9a4a', -0.05, 34)
      L(x, 800, 1070, 'PASSPORT: STAMPED', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Historic cathedral. | *Asked about rent.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'price per | square foot?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 920, 'BUILT: 1200s', pop01(t, P.t0 + 0.9, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 800, 1060, 'POTENTIAL: GOOD', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Left the group. | *Now runs a rival tour.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, R: '#6fc3ff', W: CREAM }, 560, 700, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      for (const [i, id] of [[0, 'gemini'], [1, 'sagittarius'], [2, 'leo']]) friend(x, t, id, 690 + i * 105, 960 + (i % 2) * 20, 120, pop01(t, P.t0 + 0.6 + i * 0.25, 0.3, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.4 + i * 0.1] })
      L(x, 800, 720, 'TOUR B: WEIRDER', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#6fc3ff', 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried at a plaque. | *Didn’t read it.*', mood: 'wide', star: ST, tears: 3,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 240, bg: '#c9a06a', head: 'PLAQUE', headBg: WOOD, lines: ['on this spot', 'in 1781', 'something…'], size: 30, rot: 0.03 })
      bubble(x, 800, 1080, 'it’s just | so beautiful', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0741', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs | *on a walking tour.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody followed | *the flag.*' },
  last: {
    text: 'Best souvenir? | *Dave the pigeon.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      drawBits(x, PIGEON, PIGEON_C, 540, 1000, 30 * k, { sx: Math.floor(t * 2.5) % 2 ? 1 : -1 })
      L(x, 540, 1250, 'NOW LIVES WITH CANCER', pop01(t, t - lt + 1.4, 0.3, 2.2), PINK, -0.03, 32)
      hearts(x, t, 540, 860, t - lt + 1.0, { n: 7, life: 2.0, spread: 300, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
