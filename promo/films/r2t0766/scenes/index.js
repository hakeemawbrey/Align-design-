// r2t0766: THE SIGNS AS… v3, SOLO film (aries), "Aries on a first date | *be like.*" (signs3kit social cut, lofi · C).
// One sign the whole way: nine moments of one first date, each the most extreme (and lovable) Aries version.
// Ending: card (lesson + last line over the match card: Aries + Libra, the date who had to jog to keep up).
//   forty minutes early · ordered for both before they sat · "what's your sign?" before "hello" · booked date two
//   during date one · lost at mini golf, rematch #9 · grabbed the bill mid-sentence · two seconds of quiet, whole
//   life story · walked them home (jogged; Libra puffing behind) · texted "had fun!" from the doorstep
//   group "Zero to smitten | *in one date.*"   lesson "Aries love fast | because they *mean it.*"
//   last "Their perfect match? | *Whoever keeps up.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -180 }
const FLAGG = ['K.......', 'KRRRRR..', 'KRRRRRR.', 'KRRRRR..', 'K.......', 'K.......', 'K.......', 'K.......', 'K.......', 'KKK.....']
const CLUB = ['......SS', '.....SS.', '....SS..', '...SS...', '..SS....', '.SS.....', 'SS......', 'SSSS....', 'SSSS....']

const CAMEOS = [
  { sign: S, cap: 'Date at eight? | Arrived at *seven-twenty.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 640, 'TABLE FOR 2', pop01(t, P.t0 + 0.4, 0.3, 2.2), CREAM, -0.04, 34)
      swapLabel(x, 800, 1090, lt, 1.2, 'DATE: 8:00', 'ARIES: 7:20', { size: 34, fromBg: STEEL, toBg: ACC })
    } },
  { sign: S, cap: 'Ordered for both. | *Before they sat down.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 310, h: 330, head: 'MENU', headBg: ACC, lines: ['soup  ✓', 'pasta  ✓✓', 'dessert  ✓✓', 'their coat: off'], size: 30, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1100, 'ORDER: PLACED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: '“What’s your sign?” | came *before “hello.”*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'what’s your | sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      swapLabel(x, 800, 960, lt, 1.3, 'HELLO', 'HELLO: SKIPPED', { size: 34, fromBg: CREAM, toBg: GOLD })
    } },
  { sign: S, cap: 'Booked date two | *during date one.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'CALENDAR', headBg: LAV, headInk: INK, lines: ['tue: date 2', 'wed: date 3', 'thu: meet mom?'], size: 30, progress: clamp((lt - 0.4) / 1.2) })
      bubble(x, 800, 1090, 'we’re still | at the soup', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc', col: LAV })
    } },
  { sign: S, cap: 'Lost at mini golf. | *Rematch number nine.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', star: ST, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, FLAGG, { K: INK, R: ACC }, 860, 860, 18 * k, { rot: 0.04 + Math.sin(t * 4) * 0.03 })
      drawBits(x, CLUB, { S: STEEL }, 660, 900, 14 * k, { rot: -0.2 + Math.sin(t * 6) * 0.1 })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 8)
      L(x, 800, 650, `REMATCH #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, -0.05, 40)
      L(x, 800, 1100, 'BEST OF 17?', pop01(t, P.t0 + 1.7, 0.3, 2.2), CREAM, 0.04, 32)
    } },
  { sign: S, cap: 'Grabbed the bill | *mid-sentence.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const d = ease.outCubic(clamp((lt - 0.8) / 0.3))
      sheet(x, lerp(820, 690, d), 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 240, h: 260, head: 'BILL', headBg: STEEL, headInk: INK, lines: ['2 × pasta', '2 × dessert', 'total: …'], size: 28, rot: lerp(0.05, -0.12, d) })
      bubble(x, 800, 640, 'so i was | thinking we spl—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 30, tail: 'br', col: LAV })
      L(x, 800, 1110, 'PAID. NEXT.', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Two seconds of quiet? | *Full life story.*', mood: lt => lt > 0.9 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'so in kindergarten…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 1.0) / 1.2) * 13)
      L(x, 800, 930, `CHAPTER ${n}`, pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 40)
      L(x, 790, 1090, 'SILENCE: DEFEATED', pop01(t, P.t0 + 1.8, 0.3, 2.2), CREAM, 0.04, 28)
    } },
  { sign: S, cap: 'Walked them home. | Well, *jogged.*', mood: 'sparkle', star: { x: -200 }, hops: [0.4, 0.75, 1.1, 1.45],
    front(x, t, lt, P) {
      friend(x, t, 'libra', 820, 960, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.0 ? 'wide' : 'neutral', look: [-1, 0], tears: 0 })
      bubble(x, 820, 700, 'wait… up…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
      L(x, 540, 1130, 'PACE: ARIES', pop01(t, P.t0 + 0.6, 0.3, 2.2), ACC, -0.04, 34)
    } },
  { sign: S, cap: 'Texted “had fun!” | *from their doorstep.*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOUR DATE', headCol: PINK, lines: [['had fun!', ACC, pop01(t, P.t0 + 0.5, 0.25, 2.2), true], ['again tmrw?', ACC, pop01(t, P.t0 + 0.9, 0.25, 2.2), true], ['i can see u', LAV, pop01(t, P.t0 + 1.5, 0.25, 2.2)], ['lol open door', LAV, pop01(t, P.t0 + 1.9, 0.25, 2.2)]] })
      hearts(x, t, 800, 640, P.t0 + 1.6, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0766', key: 'C', accent: ACC, solo: S, ending: 'card',
  title: 'Aries on a first date | *be like.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: 'IT’S A MATCH' },
  group: { cap: 'Zero to smitten | *in one date.*', mood: 'heart' },
  lesson: { text: 'Aries love fast | because they *mean it.*', chip: 'STATUS: SMITTEN' },
  last: {
    text: 'Their perfect match? | *Whoever keeps up.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
