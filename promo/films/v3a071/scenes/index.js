// v3a071: star_advice, ADVICE ROLLCALL, "Each sign's hidden | soft side." (~62 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order: the tender thing each one hides, one light gag per card.
//   0.0–3.6    "Each sign’s hidden | *soft side.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ tough outside, rescues every snail · ♉ names every plant (this is Sprout) · ♊ remembers your dog's birthday
//              (a cake for Biscuit) · ♋ mom friend who also needs a hug (a friend pops in) · ♌ loud in public, shy in love
//              (hides behind a heart) · ♍ "it's practical": packed your lunch · ♎ writes love letters (draft 9)
//              · ♏ scary stare, soft for cats (melted) · ♐ runs from feelings, writes them down (dear diary)
//              · ♑ works all day, framed your doodle · ♒ seems far away, telescope finds a heart-shaped star
//              · ♓ soft side? that's every side (on a cloud, crying happily)
//  49.2        "Everyone’s soft. | *Somewhere.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Be gentle. | Everyone’s *a little soft.*"  HEART: OPEN
//  58.3        "Yes, *even Scorpio.*"  The kitten comes back.
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#2fc79a', BROWN = '#8a4a2e'

function paper(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head, headBg = PINK, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 54); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 29) }
  for (const l of lines) { if (l.k !== undefined && l.k <= 0.01) continue; x.fillStyle = l.color || INK; x.font = l.font || `800 ${l.size || 34}px ${INTER}`; x.fillText(l.text, l.x || 0, l.y) }
  x.restore()
}

// ── props
const SNAIL = [
  '......BBBB....',
  '....BBYYYYB...',
  '...BYYBBBYYB..',
  '...BYBYYYBYB..',
  '...BYBYBBYYB..',
  '...BYYBYYYB...',
  'e.e.BYYYYBB...',
  'GGGGGGGGGGGGG.',
  '.GGGGGGGGGGGGG',
]
const SNAIL_C = { B: BROWN, Y: '#f3b45a', G: '#9be37d', e: INK }
const PLANT = [
  '...L...L...',
  '..LLL.LLL..',
  '.LLLLLLLLL.',
  '..LLLLLLL..',
  '....LLL....',
  '.....S.....',
  '.PPPPPPPPP.',
  '..PPPPPPP..',
  '..PPPPPPP..',
  '...PPPPP...',
]
const PLANT_C = { L: '#5fd38a', S: '#2f8f55', P: '#d1734b' }
const CAKE = [
  '.....F.....',
  '.....C.....',
  '.PPPPPPPPP.',
  'PWPWPWPWPWP',
  'PPPPPPPPPPP',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'PPPPPPPPPPP',
  'BBBBBBBBBBB',
]
const CAKE_C = { F: GOLD, C: SKYB, P: PINK, W: '#fff', B: '#f3dfae' }
const KIT = [
  '...KKKK...',
  '...K..K...',
  'WWWWWWWWWW',
  'WWWWRRWWWW',
  'WWWRRRRWWW',
  'WWWWRRWWWW',
  'WWWWWWWWWW',
]
const KIT_C = { K: '#c9d1e0', W: CREAM, R: RED }
const LUNCH = [
  'BBBBBBBBBBBB',
  'BRRRRBGGGGGB',
  'BRRRRBGGGGGB',
  'BBBBBBBBBBBB',
  'BYYYYYBOOOOB',
  'BYYYYYBOOOOB',
  'BBBBBBBBBBBB',
]
const LUNCH_C = { B: '#6f8cff', R: '#ff6b6b', G: '#7dffb0', Y: '#ffd23a', O: ORANGE }
const ENV = [
  'WWWWWWWWWWWW',
  'WEWWWWWWWWEW',
  'WWEWWWWWWEWW',
  'WWWEWHHWEWWW',
  'WWWWEHHEWWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
]
const ENV_C = { W: CREAM, E: '#c9b8a0', H: RED }
const KITTEN = [
  'O.......O.',
  'OO.....OO.',
  'OOOOOOOOO.',
  'OOeOOOeOO.',
  'OOOOnOOOO.',
  '.OOOOOOO..',
  '.OOOOOOOO.',
  'OOOOOOOOOT',
  'OOOOOOOOOT',
  '.O.O.O.O.T',
]
const KITTEN_C = { O: '#f3a35a', e: INK, n: PINK, T: '#f3a35a' }
const SCOPE = [
  '.........BB',
  '.......BBBB',
  '.....BBBBB.',
  '...BBBBB...',
  '.BBBBB.....',
  'BBBB.......',
  '...L.L.....',
  '..L...L....',
  '.L.....L...',
]
const SCOPE_C = { B: '#c9d1e0', L: BROWN }
const CLOUD = [
  '....WWWW..........',
  '..WWWWWWWW..WWWW..',
  '.WWWWWWWWWWWWWWWW.',
  'WWWWWWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWWWWWW',
  '.WWWWWWWWWWWWWWWW.',
]
const CLOUD_C = { W: '#f4f0ff' }

const CAMEOS = [
  { sign: 'aries', cap: 'Tough outside. | *Saves every snail.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.3))
      drawBits(x, SNAIL, SNAIL_C, lerp(820, 760, p), lerp(1120, 900, p), 16 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bubble(x, 790, 650, "you're safe, | buddy.", pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Talks to plants. | *Names them all.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 900, 24 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.03 * Math.sin(t * 2) })
      label(x, 790, 1110, 'THIS IS SPROUT', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
      bubble(x, 790, 620, 'good morning, | sprout!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Remembers your | *dog’s birthday.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 24 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 790, 680, 'HAPPY BDAY, BISCUIT', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 8, 180, 0.2)
    } },
  { sign: 'cancer', cap: 'Mom friend. | Also *needs a hug.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, KIT, KIT_C, 560, 1040, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'hug?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 46, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 760, 920, 200 * k, { mood: 'heart', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.6] })
      hearts(x, t, 560, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 240, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Loud in public. | *Shy in love.*', mood: lt => lt > 0.9 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = ease.outBack ? pop01(t, P.t0 + 0.9, 0.35, 2) : 1
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 370, 1050, 26 * k)
      label(x, 800, 760, 'SHY MODE: ON', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04 })
      bubble(x, 800, 960, '…hi.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Says it’s practical. | It’s *love.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LUNCH, LUNCH_C, 790, 880, 22 * pop01(t, P.t0 + 0.25, 0.3, 2))
      paper(x, 820, 690, 200, 90, pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.08, bg: '#fff59d', lines: [{ text: 'eat! ♥', y: 2, size: 40 }] })
      label(x, 790, 1090, 'PACKED YOUR LUNCH', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Writes you | *love letters.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ENV, ENV_C, 790, 880, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.06 })
      label(x, 790, 1080, 'DRAFT 9 (THE ONE)', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Scary stare. | *Soft for cats.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, KITTEN, KITTEN_C, 790, 920, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 660, 'mew.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1120, 'STATUS: MELTED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Runs from feelings. | *Writes them down.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const lk = i => pop01(t, P.t0 + 0.8 + i * 0.4, 0.25, 2)
      paper(x, 320, 850, 320, 280, pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.05, head: 'DEAR DIARY', headBg: LAV,
        lines: [{ text: 'today I felt', y: -20, size: 34, k: lk(0) }, { text: 'a feeling.', y: 30, size: 34, k: lk(1) }, { text: '(a big one)', y: 80, size: 30, color: RED, k: lk(2) }] })
    } },
  { sign: 'capricorn', cap: 'Works all day. | *Framed your doodle.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 830); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = '#c98f2a'; x.fillRect(-142, -122, 284, 244); x.fillStyle = CREAM; x.fillRect(-110, -90, 220, 180)
        x.strokeStyle = '#ff4f86'; x.lineWidth = 7; x.lineJoin = 'round'
        x.beginPath(); x.moveTo(0, 50); x.lineTo(-60, -10); x.quadraticCurveTo(-70, -60, -30, -55); x.quadraticCurveTo(-5, -50, 0, -20); x.quadraticCurveTo(10, -55, 35, -55); x.quadraticCurveTo(75, -55, 55, -5); x.closePath(); x.stroke()
        x.restore()
      }
      label(x, 320, 1060, 'FRAMED. OBVIOUSLY.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GREEN, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Seems far away. | *Thinks of you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 620, 900, 18 * pop01(t, P.t0 + 0.25, 0.3, 2))
      const hk = pop01(t, P.t0 + 1.0, 0.35, 2.4)
      drawBits(x, HEART, { H: GOLD, W: '#fff' }, 840, 640, 16 * hk)
      sparkles(x, t, 840, 640, P.t0 + 1.0, 6, 110, 0.4, [GOLD, BONE, SKYB])
      label(x, 800, 1100, 'FOUND YOU', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Soft side? | *That’s every side.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, star: { x: -170, y: -30 },
    back(x, t, lt, P) { drawBits(x, CLOUD, CLOUD_C, 370, 1060, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'ALL SOFT', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.04 })
      label(x, 790, 860, 'ALL DAY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.04 })
      hearts(x, t, 790, 980, P.t0 + 1.4, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'v3a071', key: 'D', accent: LAV, ending: 'lesson',
  title: 'Each sign’s hidden | *soft side.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone’s soft. | *Somewhere.*' },
  lesson: { text: 'Be gentle. | Everyone’s *a little soft.*', chip: 'HEART: OPEN' },
  last: {
    text: 'Yes, *even Scorpio.*',
    draw(x, t, lt) {
      drawBits(x, KITTEN, KITTEN_C, 540, 650, 20 * pop01(t, t - lt + 0.6, 0.35, 2))
      hearts(x, t, 540, 600, t - lt + 1.0, { n: 8, life: 2.0, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
