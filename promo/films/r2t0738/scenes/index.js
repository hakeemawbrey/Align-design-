// r2t0738: star_talk, ROLLCALL, "The signs | at dance class." (signs3kit social cut, lofi · G). Ending: callback.
//   ♈ started before the music did · ♉ found the move you do sitting down · ♊ did the moves of three other classes
//   · ♋ adopted the shy one, now family · ♌ asked for a solo, week one · ♍ counted every beat, out loud
//   · ♎ spun once, fixed their hair for ten · ♏ lurking in the corner, best dancer there · ♐ leapt too far, landed in yoga
//   · ♑ asked when the exam is (there's no exam) · ♒ ignored the routine, invented a new dance · ♓ danced so freely they cried
//   group "Nobody | followed the count."  callback: "Sag stayed | for yoga." (the wrong-room leap, paid off)
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, friend, ribbon, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Started before | *the music did.*', mood: 'sparkle', star: ST, hops: [0.3, 0.6, 0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      L(x, 800, 760, 'MUSIC: NOT YET', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 34)
      bubble(x, 800, 960, 'wait for it!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Found the move | you do *sitting down.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -170, y: -10 },
    back(x, t, lt, P) { bits(x, 'COUCH', 370, 990, 22 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 760, 'NEW MOVE: THE SIT', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, 0.04, 32)
      L(x, 790, 960, 'NAILED IT', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: 'gemini', cap: 'Did the moves | of *three other classes.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const M = [['SALSA?', '#ff9a4a'], ['BALLET?', PINK], ['TAP?', SKYB]]
      M.forEach(([m, c], i) => L(x, 800, 720 + i * 150, m, pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2.2), c, i % 2 ? 0.05 : -0.05, 40))
    } },
  { sign: 'cancer', cap: 'Adopted the shy one. | *Now they\'re family.*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 820, 980, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0] })
      L(x, 800, 730, 'MY KID NOW', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 38)
      hearts(x, t, 700, 960, P.t0 + 1.2, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Asked for a solo. | *Week one.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'my turn!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 930, 'SOLO: LEO', pop01(t, P.t0 + 0.9, 0.3, 2.2), '#ffb34a', -0.04, 40)
      L(x, 800, 1060, '(NOBODY ASKED)', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, 0.04, 28)
      sparkles(x, t, 380, 860, P.t0 + 1.0, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Counted every beat. | *Out loud.*', mood: 'squint', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const n = 5 + Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.4))
      bubble(x, 800, 760, `${n}!`, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 80, tail: 'bl' })
      L(x, 800, 1000, 'VOLUME: MAX', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Spun once. | Fixed *their hair for ten.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MIRROR', 820, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'COMB', 600, 690, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.4 + 0.25 * Math.sin(t * 8) })
      L(x, 820, 1120, 'SPINS: 1 · HAIR: 10 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 26)
    } },
  { sign: 'scorpio', cap: 'Lurked in the corner. | *Best dancer there.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', star: { x: -230, y: 40, s: 240 },
    front(x, t, lt, P) {
      L(x, 760, 760, 'WHO IS THAT??', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.05, 40)
      bubble(x, 760, 960, 'teach us!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 310, 880, P.t0 + 0.7, 6, 150, 0.4)
    } },
  { sign: 'sagittarius', cap: 'Leapt too far. | *Landed in yoga.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.3],
    back(x, t, lt, P) { bits(x, 'DOORX', 300, 850, 24 * pop01(t, P.t0 + 0.2, 0.3, 2)); bits(x, 'MAT', 700, 1110, 16 * pop01(t, P.t0 + 0.5, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 300, 640, 'WRONG ROOM', pop01(t, P.t0 + 0.9, 0.3, 2.2), RED, -0.04, 32)
      L(x, 700, 640, 'YOGA: IN SESSION', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Asked when the exam is. | *There\'s no exam.*', mood: lt => lt > 1.3 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 290, h: 320, head: 'STUDY NOTES', headBg: '#2fc79a', headInk: INK, lines: ['step left', 'step right', 'spin (x2)', 'smile?'], size: 30, progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1110, 'STUDIED ANYWAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Ignored the routine. | Invented *a new dance.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      for (let i = 0; i < 6; i++) { const a = t * 2.4 + i * Math.PI / 3; x.save(); x.globalAlpha = k; x.fillStyle = [SKYB, MINT, LAV][i % 3]; x.fillRect(F.x + Math.cos(a) * 200 - 9, F.cy + Math.sin(a) * 70 - 9, 18, 18); x.restore() }
      L(x, 800, 720, 'NEW DANCE:', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, -0.04, 30)
      L(x, 800, 800, '"THE ORBIT"', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 38)
      L(x, 800, 1080, 'CLASS: COPYING IT', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Danced so freely | they *cried.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST, hops: [0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ribbon(x, t, 520, 940, pop01(t, P.t0 + 0.2, 0.35, 2), PINK)
      bubble(x, 800, 1110, "i'm a river", pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0738', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs | at *dance class.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *followed the count.*' },
  last: {
    text: 'Sag stayed | *for yoga.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      bits(x, 'MAT', 540, 1200, 30 * k)
      if (k > 0.3) signChar_(x, t, k)
      L(x, 540, 1350, 'YOGA: NEW REGULAR', pop01(t, t - lt + 1.6, 0.3, 2.2), MINT, -0.04, 40)
    },
  },
})
import { signChar } from '../../signs3kit.js'
function signChar_(x, t, k) { signChar(x, t, 'sagittarius', 540, 1030, 300 * k, { mood: 'sleepy', seed: 51, glyph: false }) }
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
