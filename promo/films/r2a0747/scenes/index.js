// r2a0747: star_advice, ADVICE SOLO, "Gemini, say | *what you mean.*" (~51 s vertical, signs3kit social cut, music: lofi · F).
// One sign the whole way, 9 cards, a relatable Gemini truth + a warm reframe, one visual gag each:
//   typed a paragraph, sent "lol ok" · joking to dodge it · changed the subject nine times · two opinions, both count
//   · "whatever you want" (say tacos) · hinting for weeks · born to talk, talk true · draft twelve of one text
//   · new match: say you like them
//  37.8  "Clever words. | *Clear heart.*"   41.0  LESSON "Your real words | *are the good ones.*" STATUS: UNDERSTOOD
//  46.9  "Say what you mean. | *Then get tacos.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, phone, swapLabel, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'gemini', ACC = '#f2cf4a', ST = { x: -170 }
const TACO = ['....YYYYYY....', '..YYGRGRGRYY..', '.YYGRGLGRGRYY.', 'YYRGLGRGLGRGYY', 'YYYYYYYYYYYYYY', '.YYYYYYYYYYYY.']
const TACO_C = { Y: '#ffd23a', G: '#4fbf6a', R: RED, L: '#8fdc6a' }

const CAMEOS = [
  { sign: S, cap: 'Typed a paragraph? | *Send that one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const wipe = lt > 1.0
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'DRAFT', headCol: ACC, lines: wipe ? [['lol ok', STEEL, 1, true]] : [['so here’s the', BONE, 1, true], ['thing, I really', BONE, 1, true], ['feel like…', BONE, 1, true]], size: 22 })
      L(x, 790, 1110, 'SEND THE REAL ONE ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'Joking to dodge it? | *Say it straight.*', mood: lt => lt > 1.3 ? 'happy' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'haha jk… | unless?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 960, 'JK: OPTIONAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 38)
    } },
  { sign: S, cap: 'Changed the subject? | *Come back to it.*', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: lt => [lt < 1.1 ? (Math.floor(lt * 4) % 2 ? 1 : -1) : 1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.min(8, Math.floor(lt / 0.12))
      swapLabel(x, 790, 820, lt, 1.2, `TOPIC ${n}`, 'BACK TO TOPIC 1 ♡', { size: 34, fromBg: GOLD, toBg: MINT })
      bubble(x, 790, 640, 'anyway, about | earlier…', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Two opinions? | *Both count.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 700, 920, 170, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'wink', look: [1, 0], seed: 51 })
      friend(x, t, 'gemini', 880, 920, 170, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: 'squint', look: [-1, 0], seed: 52 })
      L(x, 700, 720, 'YES', pop01(t, P.t0 + 0.8, 0.3, 2), MINT, -0.06, 34)
      L(x, 880, 720, 'ALSO YES', pop01(t, P.t0 + 1.0, 0.3, 2), PINK, 0.06, 34)
      L(x, 790, 1110, 'SAY BOTH ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.03, 34)
    } },
  { sign: S, cap: '“Whatever you want”? | *Say what you want.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'tacos. I want | tacos.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      drawBits(x, TACO, TACO_C, 790, 900, 17 * pop01(t, P.t0 + 1.1, 0.35, 2))
      L(x, 790, 1100, 'WISH: SAID OUT LOUD', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Hinting for weeks? | *Just ask.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 310, h: 330, head: 'HINTS DROPPED', headBg: LAV, headInk: INK, lines: ['hint 1', 'hint 2', '…', 'hint 47'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 790, 1110, 'ASKING: EASIER', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Born to talk. | *Talk true.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 290, head: 'BIRTH CHART', headBg: '#6b62a8', lines: ['mercury: LOUD', 'mouth: open', 'heart: honest ♡'], size: 28, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 790, 1090, 'CHATTY ✓ HONEST ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Draft twelve? | *Short is fine.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sent = lt > 1.3
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: sent ? 'SENT ✓' : 'DRAFT 12', headCol: sent ? MINT : ACC, lines: sent ? [['miss you :)', PINK, pop01(t, P.t0 + 1.4, 0.25, 2), true]] : [], typing: sent ? 0 : 1 })
      L(x, 790, 1110, 'SHORT. SWEET. SENT.', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'New match? | *Say you like them.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '✦ NEW MATCH', headCol: PINK, lines: [['hi :)', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['I like you!', MINT, pop01(t, P.t0 + 1.2, 0.25, 2), true]] })
      L(x, 790, 1110, 'BRAVE ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 36)
      hearts(x, t, 370, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 150, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0747', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Gemini, say | *what you mean.*',
  cameos: CAMEOS,
  group: { cap: 'Clever words. | *Clear heart.*', mood: 'sparkle' },
  lesson: { text: 'Your real words | *are the good ones.*', chip: 'STATUS: UNDERSTOOD' },
  last: {
    text: 'Say what you mean. | *Then get tacos.*',
    draw(x, t, lt) {
      drawBits(x, TACO, TACO_C, 540, 1160, 16 * pop01(t, t - lt + 0.9, 0.35, 2))
      hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
