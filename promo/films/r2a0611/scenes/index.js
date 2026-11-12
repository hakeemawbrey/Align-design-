// r2a0611: star_advice, ADVICE SOLO (virgo), "What Virgos need | *after a fight.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine gentle truths about a Virgo after a fight, each with a warm reframe and one light gag.
// Ending: callback (step four of the make-up plan, the cookies, comes back and works).
//   replay #47 → paused · a six-page reply cut to two lines · stress-cleaning, the kitchen forgives you
//   · fix it tonight → tomorrow · fault 100% → 50% · the make-up plan (step 4: cookies) · feelings as a list
//   · "ok" means ok · you came back to talk (Pisces brings tea)
//   group "Big heart. | *Tidy apology.*"   last "Step four: cookies. | *It worked.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dd18a', S = 'virgo', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Replaying every word? | *You can pause it.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'REMOTE', 800, 800, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      swapLabel(x, 800, 1080, lt, 1.0, `REPLAY #${Math.min(47, 1 + Math.floor(lt * 50))}`, 'PAUSED', { size: 38, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Wrote a six-page reply? | *Two lines will do.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), cut = lt > 1.2
      if (!cut) sheet(x, 800, 860, k, { w: 280, h: 420, head: 'REPLY (P. 1/6)', headBg: STEEL, headInk: INK, lines: ['firstly,', 'secondly,', 'thirdly,', 'fourthly,', 'fifthly…'], size: 30, progress: prog(lt, 0.3, 1.0) })
      else sheet(x, 800, 860, pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.4), { w: 300, h: 220, head: 'REPLY', headBg: ACC, headInk: INK, lines: ['i’m sorry.', 'can we talk?'], size: 36 })
      if (cut) L(x, 800, 1120, 'PAGES: 6 → 1', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Cleaning to cope? | *The kitchen forgives you.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'SPRAY', 820, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      sparkles(x, t, 760, 860, P.t0 + 0.9, 7, 160, 0.2)
      sparkles(x, t, 820, 900, P.t0 + 1.5, 7, 190, 1.1)
      L(x, 800, 640, 'GROUT: SPOTLESS', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 34)
    } },
  { sign: S, cap: 'Need it fixed tonight? | *Tomorrow works too.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'WRENCH', 800, 820, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.5 })
      swapLabel(x, 800, 1080, lt, 1.1, 'FIX BY: 11:59 PM', 'FIX BY: TOMORROW', { size: 32, fromBg: RED, toBg: LAV })
    } },
  { sign: S, cap: 'Blaming yourself? | *Half is plenty.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const pct = lt < 0.9 ? 100 : Math.round(lerp(100, 50, ease.outCubic(prog(lt, 0.9, 1.5))))
      L(x, 800, 820, `MY FAULT: ${pct}%`, pop01(t, P.t0 + 0.25, 0.3, 2), pct > 60 ? RED : MINT, -0.04, 50)
      bubble(x, 800, 1060, 'we both | had a day', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Made a make-up plan? | *Add snacks.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 380, head: 'MAKE-UP PLAN', headBg: ACC, headInk: INK, lines: ['1. listen', '2. say sorry', '3. hug', ['4. cookies', '#b5653d']], size: 34, align: 'left', progress: prog(lt, 0.3, 1.3) })
      bits(x, 'COOKIE', 900, 1060, 16 * pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.4))
    } },
  { sign: S, cap: 'Can’t say “I’m hurt”? | *Say it in a list.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 360, head: 'FEELINGS', headBg: PINK, headInk: INK, lines: ['☐ fine', '☑ a bit hurt', '☑ still love you', '☑ hungry'], size: 32, align: 'left', progress: prog(lt, 0.3, 1.4) })
      hearts(x, t, 800, 680, P.t0 + 1.5, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Decoding their text? | *“ok” just means ok.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THEM', headCol: ACC, lines: [] })
      bubble(x, 790, 860, 'ok', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 90, tail: 'bl' })
      swapLabel(x, 800, 1120, lt, 1.2, 'ANALYSIS: 14 PAGES', 'IT’S JUST OK', { size: 30, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'You came back to talk. | *That’s the hard part.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, 'pisces', 820, 940, 210, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0], tears: 2 })
      bits(x, 'MUG', 690, 1080, 12 * pop01(t, P.t0 + 0.9, 0.3, 2))
      bubble(x, 820, 690, 'i made tea', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 46, col: '#b7a6ff', tail: 'bl' })
      hearts(x, t, 620, 900, P.t0 + 1.6, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0611', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'What Virgos need | *after a fight.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Tidy apology.*', mood: 'heart' },
  last: {
    text: 'Step four: cookies. | *It worked.*',
    draw(x, t, lt) {
      const t0 = t - lt
      friend(x, t, 'virgo', 380, 1150, 300, pop01(t, t0 + 0.3, 0.4, 2), { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], hops: [t0 + 1.4] })
      friend(x, t, 'pisces', 700, 1150, 300, pop01(t, t0 + 0.5, 0.4, 2), { mood: 'happy', look: [-1, 0], tears: 2, hops: [t0 + 1.5] })
      bits(x, 'COOKIE', 540, 930, 22 * pop01(t, t0 + 0.9, 0.3, 2.4))
      hearts(x, t, 540, 1000, t0 + 1.3, { n: 6, life: 2.0, spread: 360, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
