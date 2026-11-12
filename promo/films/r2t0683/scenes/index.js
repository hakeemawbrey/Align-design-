// r2t0683: star_talk, SOLO (libra), "Libras vs. | *a yes or no question.*" (signs3kit social cut, music: lofi · G).
// One sign the whole way: nine yes-or-no questions, each answered in the most Libra way possible.
// Ending: callback (the best-of-75 coin flip: flip 76 lands on its edge).
//   dessert → a pros and cons list · "coming tonight?" yes/maybe/no/yes · typed yes, deleted, typed maybe
//   · second date? poll is a tie · "do you agree?" both sides have points · lights on or off → dimmer
//   · flipped a coin, best of 75 · "need a bag?" answer next Tuesday · "you sure?" now they're not
//   group "Easy question. | *Hard Libra.*"   last "Flip seventy-six: | *it landed on its edge.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'libra', ST = { x: -190 }
const toggle = lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0]

const CAMEOS = [
  { sign: S, cap: 'Want dessert? | Made a *pros and cons list.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 620, 'dessert?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      sheet(x, 800, 920, pop01(t, P.t0 + 0.5, 0.3, 2), { w: 330, h: 300, head: 'PROS | CONS', headBg: PINK, headInk: INK, lines: ['cake | full', 'yum | late', 'cake | …cake'], size: 32, progress: prog(lt, 0.6, 1.6) })
    } },
  { sign: S, cap: 'Coming tonight? | *“Yes. Maybe. No. Yes.”*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'happy', look: toggle, star: ST,
    front(x, t, lt, P) {
      const A = [['YES', MINT], ['MAYBE', GOLD], ['NO', RED], ['YES?', MINT]]
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      L(x, 800, 880, A[n][0], pop01(t, P.t0 + 0.3, 0.3, 2), A[n][1], (n % 2 ? 0.06 : -0.06), 70)
      L(x, 800, 1100, 'FINAL ANSWER?', pop01(t, P.t0 + 1.8, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: S, cap: 'Typed “yes.” Deleted it. | *Typed “maybe.”*', mood: 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const word = lt < 0.7 ? 'yes' : lt < 1.1 ? 'ye' : lt < 1.3 ? '' : lt < 1.7 ? 'may' : 'maybe'
      phone(x, t, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'REPLY', headCol: ACC, lines: [], size: 30 })
      if (lt > 0.3) { x.save(); x.fillStyle = BONE; x.fillRect(680, 980, 240, 70); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(word + (Math.floor(t * 3) % 2 ? '|' : ''), 700, 1016); x.restore() }
    } },
  { sign: S, cap: 'Second date? | *Asked the group chat.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'POLL: DATE 2?', headBg: ACC, headInk: INK, lines: ['YES: 4', 'NO: 4'], size: 46, progress: prog(lt, 0.4, 1.0) })
      L(x, 800, 1100, 'IT’S A TIE', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.05, 40)
    } },
  { sign: S, cap: '“Do you agree?” | *Both sides have points.*', mood: 'happy', look: toggle, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), w = Math.sin(t * 2.4) * 0.12
      bits(x, 'SCALE', 800, 870, 26 * k, { rot: w })
      L(x, 670, 1110, 'A', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, -0.06, 44)
      L(x, 930, 1110, 'B', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.06, 44)
    } },
  { sign: S, cap: 'Lights on or off? | Bought *a dimmer.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, -1], star: ST,
    back(x, t, lt, P) {
      const g = 0.5 + 0.5 * Math.sin(lt * 5)
      x.save(); x.globalAlpha = 0.35 * g * clamp((lt - 0.3) * 3); const gr = x.createRadialGradient(800, 760, 10, 800, 760, 300); gr.addColorStop(0, '#ffe76a'); gr.addColorStop(1, 'rgba(255,231,106,0)'); x.fillStyle = gr; x.fillRect(480, 460, 640, 620); x.restore()
    },
    front(x, t, lt, P) {
      bits(x, 'LAMP', 800, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'BRIGHTNESS: 50/50', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Flipped a coin. | *Best of seventy-five.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const ph = (lt * 2.2) % 1
      bits(x, 'COIN', 800, 1000 - Math.sin(Math.PI * ph) * 300, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: Math.max(0.15, Math.abs(Math.cos(ph * Math.PI * 4))) })
      const n = 1 + Math.floor(clamp((lt - 0.2) / 2) * 74)
      L(x, 800, 620, `FLIP ${n} OF 75`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.04, 38)
    } },
  { sign: S, cap: '“Need a bag?” | Answered *next Tuesday.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ['...KKKK...', '..K....K..', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRWWWWWWRR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR'], { K: INK, R: '#c98f5a', W: '#e8b880' }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 1100, lt, 1.2, 'CHECKOUT: NOW', 'CHECKOUT: TUESDAY', { size: 32, fromBg: MINT, toBg: LAV })
    } },
  { sign: S, cap: '“You sure?” | *Now they’re not.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 800, 650, 'you sure?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'br' })
      swapLabel(x, 800, 960, lt, 1.0, 'DECIDED!', 'DECIDED?', { size: 50, fromBg: MINT, toBg: GOLD })
    } },
]

const F = makeFilm({
  id: 'r2t0683', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Libras vs. a yes | or no *question.*',
  cameos: CAMEOS,
  group: { cap: 'Easy question. | *Hard Libra.*', mood: 'neutral' },
  last: {
    text: 'Flip seventy-six? | *Edge.*',
    draw(x, t, lt) {
      const t0 = t - lt, d = ease.outBounce ? ease.outBounce(prog(lt, 0.6, 1.4)) : ease.outCubic(prog(lt, 0.6, 1.4))
      x.fillStyle = INK; x.fillRect(560, 1388, 400, 28); x.fillStyle = '#8a4a2e'; x.fillRect(566, 1392, 388, 20)
      if (lt > 0.5) bits(x, 'COINEDGE', 760, lerp(700, 1300, d), 22)
      friend(x, t, 'libra', 330, 1300, 320, pop01(t, t0 + 0.3, 0.4, 2), { mood: lt > 1.4 ? 'wide' : 'neutral', look: [1, 0] })
      L(x, 760, 1530, 'NOW WHAT?', pop01(t, t0 + 1.8, 0.3, 2.4), GOLD, -0.04, 42)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
