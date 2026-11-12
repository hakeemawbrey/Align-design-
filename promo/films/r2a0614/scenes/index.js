// r2a0614: star_advice, ADVICE SOLO (aquarius), "How to check in | *on an Aquarius.*" (signs3kit social cut, music: lofi · E).
// One sign the whole way: nine gentle ways to check in on an Aquarius, each with a warm reframe and one light gag.
// Ending: lesson ("Meet them | *in their world.*" CHECK-IN: RECEIVED), then the last line.
//   ask about the newest idea, then listen · a reply three days later still counts · a weird fact is a love letter
//   · ask what they think · invite with no RSVP · "detached" is just buffering · ask about the plant too
//   · plan a stargazing night · "just thinking" is true
//   group "Big brain. | *Bigger heart.*"   last "Bonus points: | *send a weird fact.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', S = 'aquarius', ST = { x: -190 }
const PLANT = ['...G.G...', '..GGGGG..', '.GG.G.GG.', 'G...G...G', '....G....', '.TTTTTTT.', '.TTTTTTT.', '..TTTTT..', '..TTTTT..']
const SCOPE = ['.........WW', '.......WWWW', '.....WWWWW.', '...WWWWW...', '.WWWWW.....', 'WWWW.......', '...K.......', '..K.K......', '.K...K.....', 'K.....K....']

function spinner(x, t, cx, cy, k, r = 70) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2 + Math.floor(t * 10) * Math.PI / 4
    x.globalAlpha = 0.25 + 0.75 * (i / 8); x.fillStyle = BONE
    x.fillRect(Math.cos(a) * r - 12, Math.sin(a) * r - 12, 24, 24)
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Ask about their newest idea. | *Then just listen.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'so… the | robot thing?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'br' })
      L(x, 770, 900, `TALK TIME: ${Math.min(45, 1 + Math.floor(lt * 22))} MIN`, pop01(t, P.t0 + 0.8, 0.3, 2), ACC, -0.04, 38)
      L(x, 800, 1080, 'YOU: GREAT LISTENER', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Replied three days later? | *They still care.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'AQUARIUS', headCol: ACC, lines: [['MON', STEEL, 1, false], ['hey :)', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['THU', STEEL, pop01(t, P.t0 + 1.0, 0.25, 2), false], ['HEY!! omg hi', ACC, pop01(t, P.t0 + 1.2, 0.25, 2), false]] })
    } },
  { sign: S, cap: 'Got sent a weird fact? | *That’s a love letter.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 260, head: 'FUN FACT', headBg: ACC, headInk: INK, lines: ['octopuses have', 'three hearts!!'], size: 32 })
      L(x, 800, 1070, 'LOVE LANGUAGE: FACTS', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 30)
      hearts(x, t, 800, 1000, P.t0 + 1.4, { n: 3, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Feelings talk feels big? | *Ask what they think.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 760, 840, lt, 1.0, 'HOW DO YOU FEEL?', 'WHAT DO YOU THINK?', { size: 34, fromBg: STEEL, toBg: MINT })
      bubble(x, 800, 1060, 'ooh. so many | thoughts.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, col: ACC, tail: 'bl' })
    } },
  { sign: S, cap: 'Invite them along. | *No RSVP needed.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'STUB', 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      L(x, 800, 660, 'YOU’RE INVITED', pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.04, 34)
      L(x, 800, 1060, 'SHOW UP: WHENEVER', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Seem detached? | *They’re just buffering.*', mood: lt => lt > 1.8 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      spinner(x, t, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2) * (lt > 1.8 ? 0 : 1))
      if (lt > 1.8) hearts(x, t, 800, 900, P.t0 + 1.8, { n: 5, life: 1.4, spread: 160, cell: 8, seed: 5 })
      L(x, 800, 1070, lt > 1.8 ? 'FEELINGS: LOADED' : `LOADING FEELINGS… ${Math.round(lerp(12, 99, prog(lt, 0.3, 1.8)))}%`, pop01(t, P.t0 + 0.4, 0.3, 2), lt > 1.8 ? PINK : GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Ask about their plant. | *It’s family.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, { G: '#5fd068', T: '#c98f5a' }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1090, 'NAME: PROFESSOR LEAF', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, 0.04, 30)
      sparkles(x, t, 800, 800, P.t0 + 1.3, 6, 140, 0.5)
    } },
  { sign: S, cap: 'Plan a stargazing night. | *Bring snacks. Talk space.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, SCOPE, { W: BONE, K: STEEL }, 820, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MOON', 900, 660, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 760, 1110, 'DATE: STARS INCLUDED', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Said “just thinking”? | *Believe them.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'just | thinking', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, col: ACC, tail: 'bl' })
      L(x, 800, 960, 'ABOUT: EVERYTHING', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 800, 1080, 'ALSO: YOU ♥', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0614', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to check in | *on an Aquarius.*',
  cameos: CAMEOS,
  group: { cap: 'Big brain. | *Bigger heart.*', mood: 'heart' },
  lesson: { text: 'Meet them | *in their world.*', chip: 'CHECK-IN: RECEIVED' },
  last: { text: 'Bonus points: | *send a weird fact.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
