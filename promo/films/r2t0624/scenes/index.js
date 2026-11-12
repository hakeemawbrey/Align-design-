// r2t0624: star_talk, SOLO (aries), "Aries vs. | *waiting in line.*" (signs3kit social cut, music: lofi · D). Ending: lesson.
// One sign the whole way: nine waiting moments, each the most extreme (and lovable) Aries version.
//   four seconds in, wrote a complaint · switched lines seven times · "is this moving?" asked fourteen times
//   · push-ups in the queue · started a second line · reached the front, forgot the order · stopped the microwave at
//   0:57 · the match is typing, Aries sent five · the coffee line, became the barista
//   group "Zero patience. | *Full heart.*"  lesson "Impatient? Sure. | *Also first to show up.*"  STATUS: FIRST
//   last "Be patient with them. | *They won’t be.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, steam, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }
const MICRO = ['KKKKKKKKKKKKK', 'KGGGGGGGGKSSK', 'KGGGGGGGGKSSK', 'KGGGGGGGGKSSK', 'KGGGGGGGGKSSK', 'KKKKKKKKKKKKK']
const LINE = ['aquarius', 'taurus', 'cancer', 'virgo']

const CAMEOS = [
  { sign: S, cap: 'Four seconds in line. | *Wrote a complaint.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.3, 0.3, 2), { w: 320, h: 320, head: 'COMPLAINT', headBg: RED, lines: ['wait time:', ['FOUR (4) SECONDS', RED], 'unacceptable.'], size: 30, progress: clamp((lt - 0.5) / 1.0) })
      L(x, 800, 1120, 'STILL IN LINE', pop01(t, P.t0 + 1.7, 0.3, 2.2), BONE, 0.05, 30)
    } },
  { sign: S, cap: 'Saw a shorter line. | *Switched seven times.*', mood: 'wide', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      L(x, 800, 860, `LINE #${1 + Math.floor(clamp((lt - 0.3) / 1.5) * 6)}`, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, 0.05, 64)
      L(x, 800, 1080, 'ALL THE SAME LINE', pop01(t, P.t0 + 1.9, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: S, cap: '“Is this moving?” | Asked *fourteen times.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'is this moving?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 960, `ASKED: ${1 + Math.floor(clamp((lt - 0.4) / 1.5) * 13)}`, pop01(t, P.t0 + 0.4, 0.3, 2), '#ff9a4a', -0.05, 50)
    } },
  { sign: S, cap: 'Queue too slow? | *Did push-ups.*', mood: 'squint', squash: lt => 0.12 * Math.max(0, Math.sin(lt * 9)), star: { x: -190, y: 30 },
    front(x, t, lt, P) {
      L(x, 800, 800, `REP ${Math.floor(clamp((lt - 0.2) / 2) * 40)}`, pop01(t, P.t0 + 0.3, 0.3, 2), MINT, 0.04, 60)
      bubble(x, 760, 1040, 'the line is my gym', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Got bored waiting. | Started *a second line.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [-1, 0], star: { x: 190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      LINE.forEach((id, i) => friend(x, t, id, 620 - i * 120, 960, 140, pop01(t, P.t0 + 0.5 + i * 0.3, 0.3, 2), { mood: 'happy', look: [1, 0], seed: 40 + i }))
      L(x, 420, 680, 'LINE 2 (ARIES)', pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Finally at the front. | *Forgot the order.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'next!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: BONE, tail: 'br' })
      bubble(x, 790, 960, 'uh…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 70, col: ACC, tail: 'bl' })
      L(x, 800, 1130, 'BRAIN: EMPTY', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.05, 30)
    } },
  { sign: S, cap: 'Microwave said 1:00. | Aries said *“no.”*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MICRO, { K: INK, G: '#3a4a6a', S: STEEL }, 800, 860, 24 * k)
      if (k > 0.9) { x.save(); x.fillStyle = MINT; x.font = '700 46px "Space Mono", monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lt < 1.1 ? `0:${String(60 - Math.floor(lt * 3)).padStart(2, '0')}` : 'OPEN', 750, 860); x.restore() }
      if (lt > 1.1) steam(x, t, 760, 760, { n: 3 })
      L(x, 790, 1090, 'COLD MIDDLE. WORTH IT.', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, -0.04, 30)
    } },
  { sign: S, cap: 'Their match is typing. | Aries *sent five.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headCol: ACC, lines: [['hi', ACC, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['hello?', ACC, pop01(t, P.t0 + 0.7, 0.2, 2), true], ['you there', ACC, pop01(t, P.t0 + 1.0, 0.2, 2), true], ['HELLO', ACC, pop01(t, P.t0 + 1.3, 0.2, 2), true]], typing: 1 })
    } },
  { sign: S, cap: 'The coffee line? | *Became the barista.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 780, 860, { n: 3 })
      L(x, 800, 690, 'HIRED: 9:02 AM', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 34)
      L(x, 800, 1130, 'NO LINE NOW', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0624', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aries vs. | *waiting in line.*',
  cameos: CAMEOS,
  group: { cap: 'Zero patience. | *Full heart.*', mood: 'sparkle' },
  lesson: { text: 'Impatient? Sure. | *Also first to show up.*', chip: 'STATUS: FIRST' },
  last: { text: 'Be patient with them. | *They won’t be.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
