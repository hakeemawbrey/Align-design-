// r2a0685: star_advice, ADVICE SOLO (leo), "What Leos need | *after a fight.*" (signs3kit social cut, music: lofi · G).
// One sign the whole way: nine warm truths about making up with a Leo, each with one light gag.
// Ending: card (Leo + Cancer: the cinematic hug, paid off as a match).
//   a bruised crown, gently bandaged · a real apology, not a royal decree · a short, dramatic sulk · a note: still adored
//   · meet halfway so they can save face · a big, cinematic hug (take 1) · the lion pun · loud means it mattered
//   · the warmth comes back (the candle relights)
//   group "Proud heart. | *Soft center.*"   lesson "Make up warmly. | Leos *melt fast.*"   last "Back to being | *the main couple.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Pride a little bruised? | *Be gentle with it.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CROWN', 800, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.1 ? 0 : 0.18 })
      bits(x, 'BANDAID', 860, 870, 11 * pop01(t, P.t0 + 1.1 * 1.29, 0.3, 2.4), { rot: -0.3 })
      L(x, 800, 1080, 'HANDLE WITH CARE', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'A real apology. | *Not a royal decree.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.1) sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'ROYAL DECREE', headBg: GOLD, headInk: INK, lines: ['mistakes', 'were made', '(by someone)'], size: 36, progress: prog(lt, 0.3, 0.9) })
      else bubble(x, 800, 820, 'i’m sorry. | i mean it.', pop01(t, P.t0 + 1.1 * 1.29, 0.25, 2.4), { size: 50, tail: 'bl' })
    } },
  { sign: S, cap: 'Need a dramatic sulk? | *Keep it a short one.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'THE SULK: ACT 1 OF 1', pop01(t, P.t0 + 0.6, 0.3, 2), LAV, 0.04, 32)
      L(x, 800, 860, 'RUNTIME: 10 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Need to hear it: | *you still adore them.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LETTER', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 1080, 'STATUS: STILL ADORED', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 32)
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Meet them halfway. | *Let them save face.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.4, 1.4))
      friend(x, t, 'cancer', lerp(900, 640, m), 920, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: m > 0.9 ? 'happy' : 'neutral', look: [-1, 0] })
      x.save(); x.setLineDash([14, 12]); x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.moveTo(500, 640); x.lineTo(500, 1100); x.stroke(); x.restore()
      L(x, 500, 1130, 'HALFWAY', pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.03, 32)
    } },
  { sign: S, cap: 'A big hug. | *A cinematic one.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 760, 920, 230, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.3] })
      bits(x, 'CLAPPER', 880, 660, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      L(x, 800, 1130, 'TAKE 1: PERFECT', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
      hearts(x, t, 560, 780, P.t0 + 1.5, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Make them laugh. | *The lion pun works.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'you’re | a-ROAR-able', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 800, 1060, 'GROAN → GIGGLE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Loud doesn’t mean mad. | *It means it mattered.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 700, 'I’M NOT YELLING', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      swapLabel(x, 800, 990, lt, 1.2, 'VOLUME: LOUD', 'MEANING: I CARE', { size: 34, fromBg: RED, toBg: PINK })
    } },
  { sign: S, cap: 'Fight’s over. | *The warmth comes back.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const lit = lt > 1.0
      drawBits(x, lit ? ['...Y...', '..YOY..', '...Y...', '..WWW..', '..WWW..', '..WWW..', '..WWW..', '.KKKKK.'] : ['.......', '.......', '...K...', '..WWW..', '..WWW..', '..WWW..', '..WWW..', '.KKKKK.'], { Y: GOLD, O: '#ff8a3a', W: CREAM, K: INK }, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lit) { x.save(); x.globalAlpha = 0.3 * clamp((lt - 1.0) * 3); const g = x.createRadialGradient(800, 780, 10, 800, 780, 260); g.addColorStop(0, '#ffd27a'); g.addColorStop(1, 'rgba(255,210,122,0)'); x.fillStyle = g; x.fillRect(540, 520, 520, 520); x.restore() }
      sparkles(x, t, 800, 800, P.t0 + 1.0 * 1.29, 7, 150, 0.3)
      L(x, 800, 1130, 'WARMTH: RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0685', key: 'G', accent: ACC, solo: S, ending: 'card',
  title: 'What Leos need | *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'cancer', chip: 'MADE UP' },
  group: { cap: 'Proud heart. | *Soft center.*', mood: 'heart' },
  lesson: { text: 'Make up warmly. | Leos *melt fast.*', chip: 'STATUS: MADE UP' },
  last: { text: 'Back to being | *the main couple.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
