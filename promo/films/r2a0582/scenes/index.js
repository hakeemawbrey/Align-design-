// r2a0582: star_advice, ADVICE SOLO (scorpio), "Scorpio, this is your sign | *to call home.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine gentle truths about a Scorpio who loves deeply and calls rarely, each with a warm reframe
// and one light gag. Ending: lesson.
//   it's been a while (they still pick up) · waiting for them to call first · a six-page script for "hi" · planned five
//   minutes, stayed two hours · one old grudge, paused · "miss you" counts · read every family message, reply to one
//   · knows their birth charts by heart · chosen family is home too (Cancer)
//   group "Deep feelings. | *Phone in hand.*"  lesson "The ones who love you | *want to hear you.*"  CALL: CONNECTED
//   last "Now you’re on speaker. | *Everyone says hi.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'scorpio', ST = { x: -190 }
const ring = (t, lt, until) => lt < until ? Math.sin(t * 40) * 0.05 : 0

const CAMEOS = [
  { sign: S, cap: 'Been a while? | *They still pick up.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt < 1.0 ? 'CALLING MOM…' : 'CONNECTED', headCol: lt < 1.0 ? STEEL : MINT, rot: 0.05 + ring(t, lt, 1.0), lines: [['HI SWEETIE!!', PINK, lt > 1.1 ? pop01(lt, 1.1, 0.25, 2.2) : 0]], size: 26 })
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 1 })
    } },
  { sign: S, cap: 'Waiting for their call? | *You can go first.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      L(x, 800, 720, 'STANDOFF: DAY 12', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 34)
      if (lt > 0.4) swapLabel(x, 800, 960, lt, 1.2, 'WHO CALLS FIRST?', 'YOU. AND THAT’S OK.', { size: 32, toBg: MINT })
    } },
  { sign: S, cap: 'Wrote a script for the call? | *“Hi” is enough.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 2; i >= 0; i--) sheet(x, 790 + i * 18, 860 + i * 14, k, { w: 290, h: 330, head: i ? '' : 'SCRIPT p.1/6', headBg: ACC, headInk: INK, lines: i ? [] : ['1. say hi', '2. small talk', '3. pivot to…', '4. contingency'], size: 28, rot: -0.04 + i * 0.03 })
      L(x, 800, 1110, 'ACTUAL CALL: “hi.”', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Planned five minutes? | *Stay for two hours.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), {})
      const m = Math.floor(5 + 115 * ease.inCubic(clamp((lt - 0.4) / 1.6)))
      L(x, 800, 1090, `CALL: ${Math.floor(m / 60)}H ${String(m % 60).padStart(2, '0')}M`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.04, 36)
      bubble(x, 800, 640, 'and ANOTHER thing', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Holding one old grudge? | *Love them anyway.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 220, head: 'THE FILE', headBg: STEEL, headInk: INK, lines: ['thanksgiving', '“the comment”'], size: 32, rot: 0.04 })
      if (lt > 0.5) swapLabel(x, 800, 1070, lt, 1.1, 'GRUDGE: ACTIVE', 'GRUDGE: PAUSED', { size: 32, toBg: MINT })
    } },
  { sign: S, cap: 'Feelings hard to say? | *“Miss you” counts.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 780, 'miss you.', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 64, col: ACC, tail: 'bl' })
      bubble(x, 800, 1010, 'MISS YOU TOO!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      hearts(x, t, 800, 900, P.t0 + 1.2, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Read every family text? | *Reply to one.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FAMILY CHAT', headCol: GOLD, lines: [['pics from bbq', BONE, 1], ['grandma typed', BONE, 1], ['SEEN BY ♏︎', STEEL, 1, true], ['hi all!', MINT, lt > 1.2 ? pop01(lt, 1.2, 0.25, 2.2) : 0, true]], size: 22 })
      L(x, 800, 1140, 'LURKING: RETIRED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Know their charts by heart? | *Hear their voices.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      chart(x, 800, 850, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 640, 'MOM: CANCER RISING', pop01(t, P.t0 + 0.5, 0.3, 2), LAV, -0.04, 28)
      L(x, 800, 1080, 'NOW: CALL HER', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Home can also be | *the people you chose.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'cancer', 730, 1010, 170, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 36 })
      friend(x, t, 'taurus', 870, 1010, 170, pop01(t, P.t0 + 0.7, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 37 })
      L(x, 800, 640, 'HOME: WHO YOU LOVE', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 30)
      hearts(x, t, 800, 920, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0582', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Scorpio, this is your sign | *to call home.*',
  cameos: CAMEOS,
  group: { cap: 'Deep feelings. | *Phone in hand.*', mood: 'heart' },
  lesson: { text: 'The ones who love you | *want to hear you.*', chip: 'CALL: CONNECTED' },
  last: {
    text: 'You’re on speaker. | *Everyone says hi.*',
    draw(x, t, lt) {
      L(x, 540, 1330, 'SPEAKER: ON', pop01(t, t - lt + 0.9, 0.3, 2.2), MINT, -0.03, 36)
      hearts(x, t, 540, 1180, t - lt + 1.0, { n: 8, life: 2.0, spread: 500, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
