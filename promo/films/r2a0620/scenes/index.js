// r2a0620: star_advice, ADVICE SOLO (libra), "Libra, a sign | *to call home.*" (topic: "Libra, this is your sign | to
// call home."; signs3kit social cut, music: lofi · G). Nine gentle truths about a Libra who keeps meaning to call home.
// Ending: group. "They miss | *your voice.*" over the big Libra.
//   rewrote "hey mom" four times · waiting for the perfect time · worried you'll bother them · keeping everyone's peace
//   · let them check on you · can't pick who to call first: group call · they saved you a plate · five minutes became
//   two hours · happy tears on the call (Pisces cries)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#f7a1d0', S = 'libra', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Rewrote “hey mom” four times? | *Just send it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `DRAFT #${Math.min(4, 1 + Math.floor(lt * 2))}`, headCol: ACC, lines: [['hey mom!', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), true]] })
      L(x, 800, 1110, 'SENT ✓', pop01(t, P.t0 + 1.6 * 1.29, 0.3, 2.4), MINT, -0.04, 40)
    } },
  { sign: S, cap: 'Waiting for the perfect time? | *Now is pretty good.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 320, head: 'BEST TIME', headBg: STEEL, headInk: INK, lines: ['mon: busy', 'tue: tired', 'wed: maybe?', 'thu: …'], size: 32, align: 'left', progress: prog(lt, 0.3, 1.3) })
      L(x, 800, 1090, 'ACTUALLY: NOW', pop01(t, P.t0 + 1.6 * 1.29, 0.3, 2.2), PINK, -0.04, 36)
    } },
  { sign: S, cap: 'Worried you’ll bother them? | *They’ve been hoping.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM', headCol: PINK, lines: [['FINALLY!!', GOLD, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['i missed you', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2)]] })
      hearts(x, t, 640, 1100, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Keeping the peace for everyone? | *Home can hold you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'PEACEKEEPER: OFF DUTY', pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.2), LAV, -0.04, 28)
      hearts(x, t, 800, 760, P.t0 + 1.6, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Always checking on them? | *Let them ask about you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'how are you?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 820, 880, 'no, how are | YOU, sweetie?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: PINK, tail: 'br' })
      L(x, 800, 1080, 'YOUR TURN', pop01(t, P.t0 + 1.6 * 1.29, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Can’t pick who to call first? | *Group call.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: lt => lt > 1.2 ? [1, 0] : [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, t, 800, 860, k, { head: 'GROUP CALL (5)', headCol: MINT, lines: [] })
      const fam = ['cancer', 'taurus', 'leo', 'virgo']
      fam.forEach((id, i) => friend(x, t, id, 745 + (i % 2) * 110, 820 + Math.floor(i / 2) * 120, 90, pop01(t, P.t0 + 0.6 + i * 0.2, 0.3, 2), { mood: 'happy' }))
    } },
  { sign: S, cap: 'Missed the family dinner? | *They saved you a plate.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1060, 'SAVED FOR: YOU', pop01(t, P.t0 + 0.9 * 1.29, 0.3, 2.2), GOLD, -0.04, 36)
      L(x, 800, 680, 'STILL WARM', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), PINK, 0.05, 30)
    } },
  { sign: S, cap: 'Five minutes became two hours? | *That’s the good stuff.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 1040, lt, 1.2, 'CALL: 0:05', 'CALL: 2:04', { size: 40, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Someone cried on the call? | *Happy tears.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 820, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GRANDMA', headCol: GOLD, lines: [] })
      friend(x, t, 'pisces', 820, 950, 150, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: 'wide', tears: 3 })
      hearts(x, t, 820, 860, P.t0 + 1.4, { n: 5, life: 1.6, spread: 240, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0620', key: 'G', accent: ACC, solo: S, ending: 'group',
  title: 'Libra, a sign | *to call home.*',
  cameos: CAMEOS,
  group: {
    cap: 'They miss | *your voice.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
