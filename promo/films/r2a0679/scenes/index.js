// r2a0679: ADVICE SOLO, "Sagittarius, it's okay | to miss them." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign (solo, 9 cards): a relatable truth and a warm reframe each, one gag each. Ending: card.
//   free spirits miss people too (wish you were here) · their song came on, let it play · the passenger seat, saved
//   · freedom ✓ AND missing them ✓ · two souvenirs, out of habit · laughing at their joke in your head
//   · tell them: honesty is your superpower · compatibility, still sweet · missing is proof it mattered
//   group "Wild heart. | *Soft spot.*"   LESSON "Missing them | *is still love.*"
//   last "Gemini kept | *the other souvenir.*" over the match card: Sagittarius + Gemini (the two souvenirs).
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER, SERIF } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER } from '../props.js'

const S = 'sagittarius', L = { x: -170 }, SAG = '#ff9a4a'
const GLOBE = [
  '..GGGGG..',
  '.GGWGGGG.',
  'GGGGGWGGG',
  'GGGTTTGGG',
  'GGTTTTTGG',
  '.GGHHHGG.',
  '..GGGGG..',
  '.BBBBBBB.',
  'BBBBBBBBB',
]
const CAR = [
  '....RRRRRR....',
  '...RWWRWWWR...',
  '..RWWWRWWWWR..',
  'RRRRRRRRRRRRRR',
  'RRYRRRRRRRRYRR',
  'RRRRRRRRRRRRRR',
  '..KK......KK..',
  '..KK......KK..',
]

function compat(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-116, -184, 248, 388)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('COMPATIBILITY', 0, -120)
  x.font = `700 64px ${SERIF}`; x.fillStyle = SAG; x.fillText('♐︎', -58, -40); x.fillStyle = PINK; x.fillText('♥', 0, -40); x.fillStyle = GOLD; x.fillText('♊︎', 58, -40)
  x.fillStyle = INK; x.fillRect(-84, 30, 168, 34); x.fillStyle = MINT; x.fillRect(-78, 36, 156 * p, 22)
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.fillText(p >= 1 ? 'STILL SWEET' : '…', 0, 112)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Free spirits | *miss people too.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, -1], star: L,
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'wish you | were here', { head: 'POSTCARD', headBg: SKYB, size: 46, w: 360 })
      label(x, 790, 1080, 'STILL FREE ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 42, bg: SAG, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their song came on? | *Let it play.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 830, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '♪', head: 'NOW PLAYING', msg: 'our | song', bg: LAV })
      notes(x, t, 790, 650, { n: 4, cell: 7, col: GOLD, alpha: pop01(t, P.t0 + 0.7, 0.3, 2), seed: 1 })
    } },
  { sign: S, cap: 'Still saving | *their seat.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, CAR, { R: '#ff6b5a', W: SKYB, Y: GOLD, K: INK }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1060, 'SHOTGUN: RESERVED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Love freedom, miss them? | *Both can be true.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 740, 'FREEDOM ✓', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 48, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 770, 900, 'MISSING THEM ✓', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bought two souvenirs. | *Out of habit.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const C = { G: SKYB, W: '#ffffff', T: '#5fd068', H: '#8a4a2e', B: WOOD }
      drawBits(x, GLOBE, C, 700, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, GLOBE, C, 855, 860, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 800, 1050, 'THIS ONE’S THEIRS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laughing at their joke | *in your head.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', look: [1, 0], star: L, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 700, '(the duck | joke)', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
      for (let i = 0; i < 3; i++) label(x, 700 + i * 90, 940 + (i % 2) * 30, 'HA', pop01(t, P.t0 + 1.0 + i * 0.2, 0.3, 2.4), { size: 50, bg: [GOLD, PINK, MINT][i], rot: (i - 1) * 0.12, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want to tell them? | *Honesty’s your thing.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 830, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '♐︎', head: 'DRAFT', msg: 'i miss you. | that’s it.', bg: MINT })
      label(x, 790, 1100, 'SEND? ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked your compatibility. | *Still sweet.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      compat(x, 790, 840, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.5, 1.5)))
      sparkles(x, t, 790, 840, P.t0 + 1.9, 8, 230, 0.3)
    } },
  { sign: S, cap: 'Missing them | *means it mattered.*', mood: 'heart', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'heart', 790, 820, 30 * pop01(t, P.t0 + 0.3, 0.35, 2) * (1 + 0.05 * Math.sin(t * 7)))
      label(x, 790, 1060, 'IT MATTERED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 44, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0679', key: 'E', accent: SAG, solo: S, ending: 'card',
  title: 'Sagittarius, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  card: { a: 'sagittarius', b: 'gemini', chip: 'STILL ALIGNED' },
  group: { cap: 'Wild heart. | *Soft spot.*', mood: 'heart' },
  lesson: { text: 'Missing them | *is still love.*', chip: 'HEART: OPEN' },
  last: { text: 'Gemini kept | *the other souvenir.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
