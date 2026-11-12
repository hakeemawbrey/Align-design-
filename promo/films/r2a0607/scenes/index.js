// r2a0607: star_advice, ADVICE SOLO (sagittarius), "How to befriend | *a Sagittarius.*" (signs3kit, lofi · F).
// Nine warm, specific tips for befriending a Sagittarius, each with one light gag. Ending: lesson.
//   invite them anywhere (6am hike? YES) · laugh at the bad jokes (joke #47) · blunt means trust ("that shirt? bold.")
//   · give them space, they return with stories · ask about one trip, clear your evening · keep plans loose (PLAN: ???)
//   · compare birth charts · be curious together (did you know…) · make them laugh once, friends for life
//   group "Big laugh. | *Bigger heart.*"  lesson "Keep up, laugh loud, | *let them roam.*"  FRIEND: MADE
//   last "Bring snacks. | *They forgot theirs.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, chart, confetti, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'sagittarius', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Invite them anywhere. | They’ll *say yes.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'hike at 6am?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'br' })
      L(x, 800, 920, 'YES!!', pop01(t, P.t0 + 1.0, 0.3, 2.6), GOLD, -0.06, 70)
      confetti(x, t, 800, 920, P.t0 + 1.05, { n: 18, spread: 240 })
    } },
  { sign: S, cap: 'Laugh at the bad jokes. | *There are many.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'okay okay, | one more…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: '#ffb34a', tail: 'bl' })
      L(x, 800, 960, `JOKE #${40 + Math.min(7, Math.floor(Math.max(0, lt - 0.6) / 0.2))}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, 0.04, 40)
      L(x, 800, 1090, 'STILL FUNNY', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Blunt with you? | *It means trust.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'that shirt? | bold.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 960, 'SAID WITH LOVE', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 34)
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 4, life: 1.5, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Give them space. | They return *with stories.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 640, 'GONE: 2 WEEKS', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.04, 30)
      L(x, 800, 1080, 'STORY TIME: ALL NIGHT', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Ask about one trip. | *Clear your evening.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bubble(x, 790, 610, 'so THEN…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 48, tail: 'bl' })
      bits(x, 'MOON', 640, 1060, 12 * pop01(t, P.t0 + 1.5, 0.3, 2.2))
      L(x, 820, 1060, 'STILL GOING', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Keep plans loose. | *Surprise them.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 280, head: 'THE PLAN', headBg: '#ffb34a', headInk: INK, lines: ['step 1: go', 'step 2: ???', 'step 3: fun'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1070, 'PERFECT.', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.05, 38)
    } },
  { sign: S, cap: 'Compare birth charts. | *Instant bond.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 720, 820, 95, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      chart(x, 880, 900, 95, pop01(t, P.t0 + 0.5, 0.35, 2), -t)
      bubble(x, 800, 620, 'same moon!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
      sparkles(x, t, 800, 860, P.t0 + 1.25, 7, 180, 0.2)
    } },
  { sign: S, cap: 'Be curious together. | *Adventure buddy.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'wait, did | you know…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: SKYB, tail: 'bl' })
      sparkles(x, t, 800, 900, P.t0 + 1.15, 7, 160, 0.3)
      L(x, 800, 960, 'FUN FACT UNLOCKED', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: S, cap: 'Make them laugh once. | *Friends for life.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'HA!', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 80, col: '#ffb34a', tail: 'bl' })
      L(x, 800, 1000, 'FRIENDSHIP: LOCKED IN', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 28)
      hearts(x, t, 800, 900, P.t0 + 1.2, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0607', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to befriend | *a Sagittarius.*',
  cameos: CAMEOS,
  group: { cap: 'Big laugh. | *Bigger heart.*', mood: 'heart' },
  lesson: { text: 'Keep up, laugh loud, | *let them roam.*', chip: 'FRIEND: MADE' },
  last: { text: 'Bring snacks. | *They forgot theirs.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
