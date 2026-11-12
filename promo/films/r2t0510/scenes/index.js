// r2t0510: star_talk BELIKE, "Zodiacs seeing you | *be like.*" (a friend, across the room) (signs3kit, lofi · F). Ending: lesson.
//   ♈ sprints over, leaps the sofa · ♉ waves, will not get up · ♊ screams your name, wrong name · ♋ a full-minute hug
//   · ♌ waves like a parade float · ♍ pretends not to see you, fixing hair first · ♎ says hi to everyone in between
//   · ♏ saw you first, ten minutes ago · ♐ yells across, the whole room turns · ♑ books a catch-up for Thursday · ♒ waves
//   at the wrong person, makes a new friend · ♓ cries, it's been two days.
//   group: "Friend: spotted. | Room: chaos."  lesson: "Your people | light up *the room.*" FRIEND: FOUND · last: "Go say hi. | They missed you."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
/** text lines centred inside a card (call from card's fn) */
function lines(x, arr, { size = 26, color = INK, lh = 1.35, font = MONO, weight = 700, dy = 0 } = {}) {
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  arr.forEach((s, i) => x.fillText(s, 0, dy + (i - (arr.length - 1) / 2) * size * lh))
}
/** a phone with a screen; fn draws on the screen in phone-local coords (screen 200×340 centred) */
function phone(x, cx, cy, k, fn, { rot = 0.04, scale = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -192, 240, 400)
  x.fillStyle = INK; x.fillRect(-126, -206, 252, 412)
  x.fillStyle = '#3a3360'; x.fillRect(-120, -200, 240, 400)
  x.fillStyle = '#1b1236'; x.fillRect(-104, -176, 208, 352)
  if (fn) fn()
  x.restore()
}
const ACC = '#ff8fb1'
const SOFA = ['.BBBBBBBBBB.', 'BBLLLLLLLLBB', 'BBBBBBBBBBBB', 'BBLLLLLLLLBB', 'BBBBBBBBBBBB', '.K........K.']
const FLOAT = ['....YYYY....', '..YYPPPPYY..', '.YPPPPPPPPY.', 'KKKKKKKKKKKK', 'KGGGGGGGGGGK', '.KK.KK.KK.K.']
const MIRROR = ['.KKKKK.', 'KSSSSSK', 'KSWSSSK', 'KSSWSSK', 'KSSSSSK', 'KSSSSSK', '.KKKKK.', '...K...', '..KKK..']
/** the friend across the room: a small far-off star */
const friend = (x, t, k, cx = 860, cy = 760, id = 'libra', mood = 'happy') => { if (k > 0.01) signChar(x, t, id, cx, cy, 160 * k, { mood, seed: 31, look: [-1, 0], glyph: false }) }

const CAMEOS = [
  { sign: 'aries', cap: 'Sprints across. | *Leaps the sofa.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SOFA, { B: '#c98f5a', L: '#e0a878', K: INK }, 720, 1060, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, pop01(t, P.t0 + 0.3, 0.3, 2), 880, 760, 'leo')
      L(x, 790, 640, 'SPEED: ILLEGAL', pop01(t, P.t0 + 1.0, 0.3, 2.4), RED, -0.04, 32, CREAM)
    } },
  { sign: 'taurus', cap: 'Waves. | *Will not get up.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, pop01(t, P.t0 + 0.2, 0.3, 2), 860, 740)
      bubble(x, 760, 920, 'come HERE.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 1120, 'SEAT: CLAIMED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Screams your name. | *The wrong name.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 700, 'JESSICA!!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 50, col: '#ffe36a', tail: 'bl' })
      friend(x, t, pop01(t, P.t0 + 0.2, 0.3, 2), 870, 960, 'virgo', 'squint')
      L(x, 760, 1130, 'YOUR NAME: SAM', pop01(t, P.t0 + 1.3, 0.3, 2.4), BONE, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Hugs you | *for a full minute.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const s = Math.floor(clamp(prog(lt, 0.4, 2.3)) * 60)
      card(x, 790, 820, 280, 140, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, bg: INK }, () => lines(x, [`0:${String(s).padStart(2, '0')}`], { size: 72, color: PINK }))
      L(x, 790, 1060, 'LETTING GO: NO', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
      hearts(x, t, 470, 760, P.t0 + 0.8, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Waves at you | *like a parade float.*', mood: 'sparkle', look: [1, 0], star: { x: -170, y: -60 },
    front(x, t, lt, P) {
      drawBits(x, FLOAT, { Y: GOLD, P: PINK, K: INK, G: '#5fd068' }, 370, 1040, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, pop01(t, P.t0 + 0.4, 0.3, 2), 840, 820, 'pisces')
      L(x, 800, 1080, 'CROWD: JUST YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 32)
      sparkles(x, t, 370, 820, P.t0 + 0.8, 8, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Pretends not to see you. | *Fixing hair first.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MIRROR, { K: INK, S: SKYB, W: '#ffffff' }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1130, 'READY IN: 4 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Says hi to everyone | *on the way.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;['hi!', 'hey you!', 'love that!', 'hiii'].forEach((s, i) => bubble(x, 690 + (i % 2) * 190, 640 + i * 110, s, pop01(t, P.t0 + 0.3 + i * 0.25, 0.25, 2.2), { size: 32, col: i % 2 ? PINK : BONE, tail: i % 2 ? 'br' : 'bl' }))
      L(x, 790, 1140, 'ARRIVAL: 45 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.03, 30)
    } },
  { sign: 'scorpio', cap: 'Saw you first. | *Ten minutes ago.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, pop01(t, P.t0 + 0.2, 0.3, 2), 860, 800, 'gemini', 'wide')
      L(x, 790, 640, 'TRACKING SINCE 9:02', pop01(t, P.t0 + 0.8, 0.3, 2.2), '#c97bff', -0.04, 28, CREAM)
      L(x, 790, 1100, 'WAVE: ONE FINGER', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Yells across. | *The whole room turns.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'HEYYYYY!!!', pop01(t, P.t0 + 0.3, 0.25, 2.6), { size: 56, col: LAV, tail: 'bl' })
      for (let i = 0; i < 4; i++) { const k = pop01(t, P.t0 + 1.0 + i * 0.12, 0.25, 2); if (k > 0.01) signChar(x, t, ['aries', 'virgo', 'capricorn', 'libra'][i], 660 + i * 95, 960, 90 * k, { mood: 'wide', seed: 40 + i, look: [-1, 0], glyph: false }) }
      L(x, 790, 1130, 'HEADS TURNED: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Waves. Then books | *a Thursday catch-up.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 220, pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.03 }, () => lines(x, ['INVITE', 'THU 4:15', '“catch-up”'], { size: 32 }))
      L(x, 790, 1110, 'DISTANCE: 6 FEET', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Waves at a stranger. | *New best friend.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, pop01(t, P.t0 + 0.3, 0.3, 2), 860, 800, 'sagittarius', 'wide')
      if (lt > 1.0) bubble(x, 820, 640, 'hi?? i love you', pop01(t, t - lt + 1.0, 0.25, 2.2), { size: 32, col: SKYB, tail: 'br' })
      L(x, 790, 1110, 'STRANGER → BESTIE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cries. It’s been | *two whole days.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, pop01(t, P.t0 + 0.2, 0.3, 2), 860, 800, 'cancer', 'heart')
      L(x, 790, 640, 'MISSED YOU SO MUCH', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 30)
      L(x, 790, 1100, 'LAST SEEN: TUESDAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0510', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Zodiacs seeing you | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Friend: spotted. | *Room: chaos.*' },
  lesson: { text: 'Your people | light up *the room.*', chip: 'FRIEND: FOUND' },
  last: { text: 'Go say hi. | *They missed you.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
