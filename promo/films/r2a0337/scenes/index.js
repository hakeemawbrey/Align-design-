// r2a0337: star_advice, ADVICE SOLO (virgo), "Virgo, you don't owe anyone | *an instant reply.*" (signs3kit social cut,
// music: lofi · F). Ending: callback (draft seven finally goes out: "sounds good!").
//   rewrote the text six times = the first was fine · read it, need time = allowed · tidying everyone's mess = rest too
//   · notifications always on = mute is self-care · a typo = nobody noticed · said no = a full sentence
//   · lists for your lists = cute, honestly · hard on yourself = be your own friend · your peace first = reply tomorrow
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, card, lines, phone, zzz, CUP, CUP_C, RED, CREAM, ORANGE, GREY, PURP } from './props.js'

const ACC = '#ff8fb1'
const BELL = ['...YY...', '..YYYY..', '.YYYYYY.', '.YYWYYY.', '.YYYYYY.', 'YYYYYYYY', 'YYYYYYYY', '...YY...']
const BELL_C = { Y: GOLD, W: '#fff' }
const GLASS = ['..KKKK....', '.KWWWWK...', 'KWWSWWWK..', 'KWSWWWWK..', 'KWWWWWWK..', 'KWWWWWWK..', '.KWWWWK...', '..KKKKKK..', '......KKK.', '.......KKK', '........KK']
const GLASS_C = { K: '#2a2350', W: 'rgba(190,230,255,0.55)', S: '#fff' }
const BROOM = ['....KK', '...KK.', '..KK..', '.KK...', 'YYYY..', 'YYYYY.', 'YYYYYY', 'Y.Y.Y.']
const BROOM_C = { K: '#7a4a2e', Y: GOLD }
const MOON = ['..WWW..', '.WWW...', 'WWW....', 'WWW....', 'WWW....', '.WWW...', '..WWW..']
const MOON_C = { W: '#ffe7a8' }

const S = 'virgo', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Rewrote the text six times? | *The first was fine.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.min(5, Math.floor(clamp((lt - 0.3) / 1.1) * 6))
      phone(x, 790, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: `DRAFT ${n}`, headCol: n >= 6 ? GOLD : GREY, rows: [['sounds good!', MINT, 1, true]] })
      if (lt > 1.6) L(x, 790, 1110, 'DRAFT 1: PERFECT', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Read it, need time? | *That’s allowed.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 820, 850, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'SEEN', headCol: SKYB, rows: [['dinner fri?', LAV, 1]] })
      drawBits(x, CUP, CUP_C, 610, 1080, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      if (lt > 1.3) bubble(x, 600, 620, 'thinking. kindly.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Tidying everyone’s mess? | You can *rest too.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, BROOM, BROOM_C, 620, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.4 ? 1.2 : -0.2 })
      card(x, 830, 820, 230, 170, pop01(t, P.t0 + 0.9, 0.35, 2), 0.05, x => lines(x, ['BREAK', 'TIME'], { size: 44 }), MINT)
      if (lt > 1.4) zzz(x, t, F.x + 90, F.top + 20)
    } },
  { sign: S, cap: 'Notifications always on? | *Mute is self-care.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), ring = lt < 1.2 ? Math.sin(t * 40) * 0.25 : 0
      drawBits(x, BELL, BELL_C, 790, 860, 26 * k, { rot: ring })
      if (lt >= 1.2) { x.save(); x.strokeStyle = RED; x.lineWidth = 14; x.lineCap = 'round'; const p = clamp((lt - 1.2) / 0.25); x.beginPath(); x.moveTo(680, 750); x.lineTo(680 + 220 * p, 750 + 220 * p); x.stroke(); x.restore() }
      if (lt > 1.5) L(x, 790, 1100, 'QUIET MODE: ON', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'Spotted a typo? | *Nobody noticed. Really.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 770, 790, 330, 150, pop01(t, P.t0 + 0.2, 0.35, 2), -0.03, x => lines(x, ['see you tmorrow'], { size: 36 }))
      drawBits(x, GLASS, GLASS_C, 900, 930, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      if (lt > 1.4) bubble(x, 790, 1060, 'nobody cares. ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bc', col: MINT })
    } },
  { sign: S, cap: 'Said no to a plan? | *That’s a full sentence.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 220, pop01(t, P.t0 + 0.3, 0.35, 2.2), 0.04, x => lines(x, ['No.'], { size: 110 }), '#ffe7a8')
      sparkles(x, t, 790, 860, P.t0 + 0.6, 8, 200, 0.2)
      if (lt > 1.4) L(x, 790, 1100, 'NO EXPLANATION', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Lists for your lists? | *Cute, honestly.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 820, 820, 260, 300, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, x => { lines(x, ['LISTS TO', 'MAKE:'], { size: 30, y: -90 }); x.font = `700 24px ${MONO}`; x.textAlign = 'left'; ['☑ list', '☑ list', '☐ list'].forEach((r, i) => x.fillText(r, -90, -10 + i * 44)) }, '#ffe7a8')
      card(x, 720, 900, 260, 300, pop01(t, P.t0 + 0.7, 0.35, 2), -0.06, x => { lines(x, ['LISTS', 'OF LISTS'], { size: 30, y: -90 }); x.font = `700 24px ${MONO}`; x.textAlign = 'left'; ['☑ that one', '☑ this one'].forEach((r, i) => x.fillText(r, -100, -10 + i * 44)) })
      if (lt > 1.3) hearts(x, t, 760, 800, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Hard on yourself today? | Be your *own friend.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 920, 230 * k, { mood: 'happy', look: [-1, 0], seed: 33, glyph: false, hops: [P.t0 + 1.2] })
      bubble(x, 800, 660, 'you did great.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bc' })
      if (lt > 1.3) hearts(x, t, 590, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Your peace comes first. | *Reply tomorrow.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, MOON, MOON_C, 860, 640, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      // the phone, face down on the nightstand
      card(x, 790, 980, 260, 60, pop01(t, P.t0 + 0.5, 0.3, 2), 0, null, PURP)
      L(x, 790, 860, 'REPLY: TOMORROW', pop01(t, P.t0 + 0.9, 0.3, 2.4), LAV, 0.04, 32)
      if (lt > 1.2) zzz(x, t, F.x + 90, F.top + 20)
    } },
]

const F = makeFilm({
  id: 'r2a0337', key: 'F', accent: ACC, solo: 'virgo', ending: 'callback',
  title: 'Virgo, you don’t owe | *an instant reply.*',
  cameos: CAMEOS,
  group: { cap: 'Your time is yours. | *Take it.*', mood: 'heart' },
  last: {
    text: 'Draft seven: | *“sounds good!”*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 360, 1080, 270 * k, { mood: lt > 1.4 ? 'sparkle' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.4, t0 + 2.0] })
      phone(x, 740, 1080, 1.3 * pop01(t, t0 + 0.6, 0.4, 2), { head: lt > 1.4 ? 'SENT ✓' : 'DRAFT 7', headCol: lt > 1.4 ? MINT : GREY, rows: [['sounds good!', MINT, 1, true], ['yay!! :)', LAV, pop01(t, t0 + 1.8, 0.25, 2.2)]] })
      if (lt > 1.4) sparkles(x, t, 740, 1000, t0 + 1.4, 8, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
