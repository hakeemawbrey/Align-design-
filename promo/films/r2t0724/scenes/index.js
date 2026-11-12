// r2t0724: THE SIGNS AS… v3, "The signs as | camp counselors." (~54 s vertical, signs3kit social cut, lofi · D)
// Twelve signs running a summer camp, each pushed to the extreme. Ending: group.
//   ♈ wake-up call at 5 a.m., with an air horn · ♉ snack time every hour · ♊ the campfire story has four plots, no ending
//   · ♋ a little note in every lunch · ♌ headlining their own talent show · ♍ bunk inspection with a white glove
//   · ♎ sorted the cabins by compatibility · ♏ knows who ate the cookies, says nothing · ♐ the short nature walk, 14 miles
//   · ♑ gave the campers a five-year plan · ♒ the friendship bracelet has wifi · ♓ last day, sobbing on the bus
//   group "Best summer ever. | *Nobody slept.*" (LIGHTS OUT: NEVER)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, chart, confetti, B, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#5fd068', ST = { x: -170 }, SR = { x: 160 }

const CAMEOS = [
  { sign: 'aries', cap: 'Wake-up call: 5 a.m. | *With an air horn.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', star: ST, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const blast = lt > 0.9 && lt < 1.6
      bits(x, 'MEGA', F.x + 190, F.cy - 10, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: blast ? 1 + 0.06 * Math.sin(t * 50) : 1 })
      L(x, 790, 660, '5:00 A.M.', pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, -0.05, 40)
      bubble(x, 800, 1090, 'RISE AND RUN!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Snack time: | *every hour.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) bits(x, 'COOKIE', 720 + (i % 3) * 80, 1040 - Math.floor(i / 3) * 70, 12 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2))
      sheet(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 280, h: 220, head: 'SCHEDULE', headBg: '#5fd068', headInk: INK, lines: ['9:00 snack', '10:00 snack', '11:00 snack'], size: 26 })
    } },
  { sign: 'gemini', cap: 'Campfire story: | *four plots, no ending.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const TOP = ['once, a bear…', 'no, a pirate…', 'in SPACE…', 'wait, the bear…']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 780, 700, TOP[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 900, `PLOT ${n + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.05, 36)
      L(x, 790, 1060, 'THE END: NEVER', pop01(t, P.t0 + 1.8, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'A note in | *every single lunch.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      bits(x, 'BAG', 790, 1020, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sheet(x, 800, 780, pop01(t, P.t0 + 0.6, 0.3, 2), { w: 270, h: 200, rot: 0.06, bg: '#ffe0ea', lines: ['proud of you!', 'drink water', '- your counselor'], size: 26 })
      L(x, 790, 1140, 'NOTES: 80', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 32)
      hearts(x, t, 640, 1000, P.t0 + 1.4, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Talent show tonight. | *Headliner: themself.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      bits(x, 'MIC', F.x + 150, F.cy, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.2 })
      L(x, 790, 700, 'TONIGHT: LEO', pop01(t, P.t0 + 0.6, 0.3, 2.2), '#ffb34a', -0.04, 36)
      L(x, 790, 1080, 'ALSO TONIGHT: LEO', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
      sparkles(x, t, F.x + 150, F.cy, P.t0 + 1.2, 6, 120, 0.2)
    } },
  { sign: 'virgo', cap: 'Bunk inspection. | *With a white glove.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sweep = Math.sin(clamp((lt - 0.5) / 1.0) * Math.PI) * 60
      bits(x, 'GLOVE', 790 + sweep, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      L(x, 790, 680, 'CABIN 4: INSPECTED', pop01(t, P.t0 + 0.4, 0.3, 2.2), CREAM, -0.04, 30)
      swapLabel(x, 790, 1100, lt, 1.4, 'DUST: ?', 'DUST: 0. GOOD.', { size: 32, fromBg: STEEL, toBg: MINT })
    } },
  { sign: 'libra', cap: 'Sorted the cabins | *by compatibility.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 860, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 660, 'CABIN 3: AIR SIGNS', pop01(t, P.t0 + 0.7, 0.3, 2.2), SKYB, -0.04, 30)
      L(x, 800, 1090, 'HARMONY: ACHIEVED', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Knows who ate the cookies. | *Says nothing.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 790, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 900, 'COOKIES: 0', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.04, 30)
      bubble(x, 790, 690, 'i know. | ;)', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      friend(x, t, 'taurus', 900, 1120, 110, pop01(t, P.t0 + 1.6, 0.35, 2), { mood: 'wide', look: [-1, -1] })
    } },
  { sign: 'sagittarius', cap: 'Short nature walk. | *Fourteen miles later…*', mood: 'sparkle', star: SR, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bits(x, 'MAP', 320, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 320, 700, lt, 1.0, 'TRAIL: 1 MILE', 'TRAIL: WHAT TRAIL', { size: 30, fromBg: MINT, toBg: GOLD })
      bubble(x, 330, 1080, 'almost there!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Gave every camper | *a five-year plan.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: SR,
    front(x, t, lt, P) {
      sheet(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 340, head: 'CAMPER GOALS', headBg: '#2fc79a', headInk: INK, lines: ['yr 1: canoe', 'yr 2: archery', 'yr 5: CEO'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 320, 1120, 'AGE: 9', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Friendship bracelets? | *Theirs has wifi.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BRACE', 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.9 && Math.floor(t * 4) % 2) sparkles(x, t, 800, 900, t - 0.05, 4, 90, 0.4, [SKYB, MINT])
      L(x, 800, 680, 'SIGNAL: STRONG', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, -0.04, 34)
      bubble(x, 800, 1100, 'it also texts', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Last day of camp. | *Sobbing* on the bus.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      L(x, 790, 680, 'SEE YOU NEXT SUMMER', pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, -0.04, 30)
      bits(x, 'TISSUE', 790, 920, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 790, 1100, 'miss you ALL', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0724', key: 'D', accent: ACC, ending: 'group',
  title: 'The signs as | *camp counselors.*',
  cameos: CAMEOS,
  group: {
    cap: 'Best summer ever. | *Nobody slept.*',
    draw(x, t, lt) {
      L(x, 540, 690, 'LIGHTS OUT: NEVER', pop01(t, t - lt + 1.6, 0.3, 2.4), GOLD, -0.04, 40)
      sparkles(x, t, 540, 690, t - lt + 1.7, 8, 200, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
