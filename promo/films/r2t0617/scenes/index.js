// r2t0617: star_talk, ROLLCALL (twelve signs), "The signs in | the *break room.*" (signs3kit social cut, music: lofi · E).
// Aries: microwaved it three seconds, ate it frozen · Taurus: labelled their lunch eleven times · Gemini: came for coffee,
// left with all the gossip · Cancer: soup for every coworker · Leo: someone else's birthday, Leo gave a speech
// · Virgo: wrote fridge rules, laminated them · Libra: tea or coffee, still deciding at 4:58 · Scorpio: knows who ate
// the yogurt · Sagittarius: five-minute break, booked a flight · Capricorn: break spent planning next year
// · Aquarius: rewired the coffee machine, it talks now · Pisces: someone said "nice mug", cried.
// Ending: group. "Fifteen-minute break. | *Took two hours.*" (a BREAK: 2 HRS sticker over the photo).
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, swapLabel, steam, confetti, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }
const ICE = ['..W..W..', 'W..WW..W', '.WWWWWW.', 'WWBWWBWW', '.WWWWWW.', 'W..WW..W', '..W..W..']
const ICE_C = { W: '#dff4ff', B: SKYB }

const CAMEOS = [
  { sign: 'aries', cap: 'Microwaved it three seconds. | Ate it *frozen.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, `TIMER: 0:0${Math.min(3, Math.floor(lt * 3))}`, pop01(t, P.t0 + 0.3, 0.3, 2), RED, 0.04, 38)
      if (lt > 1.2) drawBits(x, ICE, ICE_C, 900, 780, 10 * pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.4))
      L(x, 800, 1070, 'STILL ICE', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), SKYB, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Labelled their lunch. | *Eleven times.*', mood: lt => lt > 1.5 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 800, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const spots = [[700, 700, -0.2], [900, 690, 0.15], [660, 900, 0.1], [930, 920, -0.12], [800, 1060, 0.04]]
      spots.forEach(([sx, sy, r], i) => L(x, sx, sy, 'MINE', pop01(t, P.t0 + 0.6 + i * 0.25, 0.25, 2.4), i % 2 ? PINK : GOLD, r, 34))
    } },
  { sign: 'gemini', cap: 'Came for coffee. | Left with *all the gossip.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 820, 1000, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 690, 'wait, WHO?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 820, 840, 'tell me | everything', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Made soup | for *the whole office.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 790, { n: 3, alpha: clamp((lt - 0.5) / 0.4) * 0.7, h: 120 })
      L(x, 800, 1070, 'SERVES: EVERY SIGN', pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Someone else’s birthday. | Leo *gave a speech.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 860, 1040, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 700, 'and that’s why | it’s about me', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bl' })
      L(x, 760, 880, 'SPEECH: PAGE 9', pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.2), PINK, -0.05, 32)
    } },
  { sign: 'virgo', cap: 'Wrote the fridge rules. | *Laminated them.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 380, head: 'FRIDGE RULES', headBg: SKYB, headInk: INK, lines: ['1. label it', '2. date it', '3. no smells', '4. see rule 1'], size: 34, align: 'left', progress: prog(lt, 0.3, 1.3) })
      if (lt > 1.5) { x.save(); x.globalAlpha = 0.35 * clamp((lt - 1.5) / 0.3); x.fillStyle = '#ffffff'; x.fillRect(650, 640, 50, 400); x.restore() }
      L(x, 800, 1100, 'LAMINATED', pop01(t, P.t0 + 1.6 * 1.29, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Tea or coffee? | *Still deciding.*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), side = Math.floor(lt * 2.5) % 2
      bits(x, 'MUG', 700, 870, 13 * k, { alpha: side ? 0.5 : 1 })
      bits(x, 'MUG', 900, 870, 13 * k, { alpha: side ? 1 : 0.5 })
      label(x, 700, 760, 'TEA', k, { size: 30, bg: MINT })
      label(x, 900, 760, 'COFFEE', k, { size: 30, bg: '#c98f5a' })
      L(x, 800, 1070, 'TIME: 4:58 PM', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), LAV, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Knows who ate | *the yogurt.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LENS', 800, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      bubble(x, 800, 660, 'i know.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, col: STEEL, tail: 'bl' })
      L(x, 800, 1070, 'CASE: CLOSED', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), RED, -0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Five-minute break. | *Booked a flight.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.7],
    back(x, t, lt, P) {
      const p = prog(lt, 0.9, 2.3)
      if (p > 0 && p < 1) bits(x, 'PLANE', lerp(640, 1000, p), 680 - 60 * p, 14, { rot: 1.4 })
    },
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'BACK IN: 2 WEEKS', pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'On break. | Planned *next year.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 360, head: 'NEXT YEAR', headBg: '#2fc79a', headInk: INK, lines: ['Q1: grow', 'Q2: grow more', 'Q3: promotion', 'Q4: lunch?'], size: 32, align: 'left', progress: prog(lt, 0.3, 1.5) })
      L(x, 800, 1110, 'BREAK: USED WELL', pop01(t, P.t0 + 1.7 * 1.29, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Rewired the coffee machine. | It *talks now.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 800, 900, P.t0 + 1.0, 8, 150, 0.4, [LAV, MINT, BONE])
      bubble(x, 800, 680, 'your chart says: | latte.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Someone said “nice mug.” | *Cried.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, 'nice mug!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 800, 1000, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0617', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs in | the *break room.*',
  cameos: CAMEOS,
  group: {
    cap: 'Fifteen-minute break. | *Took two hours.*',
    moods: ['wide', 'squint', 'wink', 'heart', 'sparkle', 'squint', 'neutral', 'wink', 'sparkle', 'neutral', 'sparkle', 'wide'],
    draw(x, t, lt) {
      const t0 = t - lt
      bits(x, 'CLOCK', 420, 700, 14 * pop01(t, t0 + 1.4, 0.3, 2))
      L(x, 640, 710, 'BREAK: 2 HRS', pop01(t, t0 + 1.8, 0.3, 2.4), GOLD, -0.05, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
