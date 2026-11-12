// r2a0541: star_advice, ADVICE-SOLO (gemini), "Gemini, one chat | at a time." (topic: one conversation at a time) (signs3kit social cut, music: lofi · D).
// Nine cards: a relatable Gemini truth + a warm reframe, one visual gag each. Ending: lesson.
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -170 }

/** a stack of browser-ish tabs, n of them showing */
function tabs(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const cols = [SKYB, PINK, MINT, LAV, GOLD, '#ffb34a']
  for (let i = 0; i < n; i++) {
    const tx = -150 + (i % 6) * 52, ty = -150 + Math.floor(i / 6) * 22
    x.fillStyle = INK; x.fillRect(tx - 4, ty - 4, 58, 40); x.fillStyle = cols[i % 6]; x.fillRect(tx, ty, 50, 32)
  }
  x.fillStyle = INK; x.fillRect(-170, -96, 340, 240); x.fillStyle = CREAM; x.fillRect(-162, -88, 324, 224)
  x.fillStyle = STEEL; for (let i = 0; i < 4; i++) x.fillRect(-130, -50 + i * 44, i % 2 ? 200 : 260, 14)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Twelve tabs open? | *Close one. Breathe.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const n = lt < 1.4 ? 12 : 1
      tabs(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), n)
      if (lt > 0.4) swapLabel(x, 790, 1120, lt, 1.3, 'TABS: 12', 'TABS: 1', { size: 34, fromBg: PINK, toBg: MINT })
    } },
  { sign: S, cap: 'Mid-story, new story? | *Finish the first.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'and then the bus—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 860, 'OH, sharks!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      L(x, 790, 1060, 'STORY 1: STILL WAITING', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 26)
    } },
  { sign: S, cap: 'Three chats at once? | *Pick one. Be there.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const one = lt > 1.4
      phone(x, t, 700, 860, k * (one ? 1 - prog(lt, 1.4, 1.7) : 1), { head: 'CHAT 1', headCol: PINK, rot: -0.1, lines: [] })
      phone(x, t, 880, 860, k * (one ? 1 - prog(lt, 1.4, 1.7) : 1), { head: 'CHAT 3', headCol: SKYB, rot: 0.1, lines: [] })
      phone(x, t, 790, 880, k, { head: 'CHAT 2', headCol: MINT, lines: [['hey you', BONE, 1], ['I’m all ears', GOLD, pop01(t, P.t0 + 1.6, 0.25, 2.2), true]] })
    } },
  { sign: S, cap: 'Curiosity is a gift. | *Not a to-do list.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 380, head: 'LEARN THIS WEEK', headBg: GOLD, headInk: INK, lines: ['guitar', 'french', 'juggling', 'astronomy', 'baking', '…'], size: 28, align: 'left', progress: prog(lt, 0.4, 1.2) })
      L(x, 800, 1120, 'ONE IS PLENTY', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Listening counts | *as talking too.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 800, 900, 190, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0] })
      bubble(x, 800, 660, 'so, my week…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bc' })
      L(x, 790, 1110, 'LISTENING MODE: ON', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Bored already? | Stay *one minute more.*', mood: lt => lt > 1.5 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.5) sparkles(x, t, 790, 820, P.t0 + 1.55 * 1.29, 7, 170, 0.3)
      L(x, 790, 1090, lt > 1.5 ? 'IT GOT GOOD' : 'TICK… TICK…', pop01(t, P.t0 + 0.6, 0.3, 2.2), lt > 1.5 ? MINT : STEEL, 0.04, 32)
    } },
  { sign: S, cap: 'Two moods, one day? | *Both are welcome.*', mood: lt => Math.floor(lt * 2) % 2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 720, 700, 'yay!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, col: GOLD, tail: 'bl' })
      bubble(x, 860, 900, 'meh.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 56, col: LAV, tail: 'bl' })
      L(x, 790, 1110, 'BOTH: VALID', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Hobby number nine? | *Enjoy it anyway.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const it = ['BOOK', 'CAMERA', 'PEN', 'BROOM', 'GLOVE']
      it.forEach((b, i) => bits(x, b, 700 + (i % 3) * 90, 760 + Math.floor(i / 3) * 170, 13 * pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2.2), { rot: (i - 2) * 0.1 }))
      L(x, 790, 1110, 'HOBBY #9: POTTERY', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Your people love | *every chapter* of you.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 1090, 'CHAPTERS: ALL OF THEM', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 28)
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0541', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Gemini, one chat | *at a time.*',
  cameos: CAMEOS,
  group: { cap: 'Busy mind. | *Big heart.*', mood: 'heart' },
  lesson: { text: 'One talk at a time | is *plenty.*', chip: 'FOCUS: FOUND' },
  last: { text: 'Now finish | *the bus story.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
