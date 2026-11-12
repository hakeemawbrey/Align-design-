// r2a0728: star_advice, ADVICE SOLO (libra), "Libra, here's your | *Monday pep talk.*" (signs3kit social cut, lofi · C).
// One sign the whole way: nine kind Monday reminders for a Libra, each a relatable truth, a warm reframe and one gag.
// Ending: lesson.
//   nine outfits tried, nailed it · coffee or tea: both · said no to a meeting · not everyone will like you, most will
//   · off balance, it comes back (the scales settle) · say the opinion out loud · a grumpy coworker isn't yours to fix
//   · lunch alone, great company · the chart says Venus, Venus says go
//   group "One choice | *at a time.*" · lesson "Not perfect. | Still *lovely.*" · last "Now go be | *charming.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, bits, swapLabel, rain, chart, B, C, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'libra', ST = { x: -190 }
Object.assign(B, {
  SHIRT: ['.SS....SS.', 'SSSSSSSSSS', 'SSSSSSSSSS', '.SSSSSSSS.', '..SSSSSS..', '..SSSSSS..', '..SSSSSS..', '..SSSSSS..'],
  TEA: ['.WWWWWW...', 'WGGGGGGW..', 'WGGGGGGWWW', 'WGGGGGGW.W', 'WGGGGGGWWW', 'WGGGGGGW..', '.WWWWWW...'],
  MIRROR: ['..YYYYYY..', '.YSSSSSSY.', 'YSSWSSSSSY', 'YSWSSSSSSY', 'YSSSSSSSSY', 'YSSSSSSSSY', '.YSSSSSSY.', '..YYYYYY..', '....YY....', '...YYYY...'],
})
Object.assign(C, { SHIRT: { S: '#6fc3ff' }, TEA: { W: CREAM, G: '#8fdc6a' }, MIRROR: { Y: GOLD, S: '#bfe6ff', W: '#ffffff' } })
const SH = ['#ff6b5a', '#ffd23a', '#7dffb0', '#6fc3ff', '#c97bff', '#ff8fb1', '#ffb34a', '#9aa5c4', '#fff4e2']

const CAMEOS = [
  { sign: S, cap: 'Tried nine outfits? | *Nailed it.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(clamp((lt - 0.2) / 1.2) * 9))
      for (let i = 0; i < n; i++) drawBits(x, B.SHIRT, { S: SH[i] }, 650 + (i % 3) * 110, 1060 - Math.floor(i / 3) * 40 - (i % 3) * 8, 16, { rot: (i % 2 ? 0.2 : -0.2) })
      L(x, 800, 700, 'OUTFIT #9: PERFECT', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
      sparkles(x, t, 800, 820, P.t0 + 1.6, 7, 150, 0.2)
    } },
  { sign: S, cap: 'Coffee or tea? | *Both. It\'s Monday.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: lt => [lt > 1.3 ? 1 : Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 700, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'TEA', 900, 940, 20 * pop01(t, P.t0 + 0.35, 0.3, 2))
      bubble(x, 800, 720, lt > 1.3 ? 'both!' : 'hmm...', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 1120, 'DECISION: MADE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Said no to a meeting? | *Look at you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, "can't today, sorry!", pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 900, '✓ BOUNDARY: SET', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, -0.04, 38)
      L(x, 800, 1060, 'NOTHING EXPLODED', pop01(t, P.t0 + 1.7, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: S, cap: 'Not everyone will like you. | *Most will.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fans = ['aries', 'leo', 'aquarius', 'gemini']
      fans.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2); if (k > 0.01) signChar(x, t, id, 690 + (i % 2) * 200, 800 + Math.floor(i / 2) * 200, 130 * k, { mood: 'heart', glyph: false, seed: 40 + i }) })
      L(x, 800, 650, 'FAN CLUB: FULL', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Off balance? | It *comes back.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', star: ST,
    front(x, t, lt, P) {
      const wob = lt > 1.5 ? 0 : Math.sin(lt * 6) * 0.35 * (1 - lt / 1.5)
      bits(x, 'SCALE', 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: wob })
      swapLabel(x, 800, 1130, lt, 1.5, 'WOBBLY', 'BALANCED', { size: 38, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Have an opinion? | *Say it loud.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MEGA', 660, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 830, 820, 'I think...', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 790, 1040, 'PINEAPPLE PIZZA!', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 36, col: GOLD, tail: 'bl' })
    } },
  { sign: S, cap: 'Grumpy coworker? | *Not yours to fix.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'CLOUD', 820, 700, 18 * k)
      if (k > 0.5) rain(x, t, 820, 760, { w: 180, h: 200, alpha: 0.8 })
      bits(x, 'MUG', 820, 1010, 18 * k)
      L(x, 800, 1180, 'THEIR WEATHER ☁︎', pop01(t, P.t0 + 1.3, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: S, cap: 'Lunch alone? | *Great company.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MIRROR', 820, 830, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'SANDWICH', 760, 1080, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 860, 640, 'hi, cutie', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Your chart says Venus. | Venus says *go.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 1100, 'VENUS: GO GET IT', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 34)
      hearts(x, t, 800, 860, P.t0 + 1.3, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0728', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Libra, here\'s your | *Monday pep talk.*',
  cameos: CAMEOS,
  group: { cap: 'One choice | *at a time.*', mood: 'happy' },
  lesson: { text: 'Not perfect. | Still *lovely.*', chip: 'MONDAY: HANDLED' },
  last: { text: 'Now go be | *charming.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
