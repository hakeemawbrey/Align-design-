// r2a0584: star_advice, ADVICE ROLLCALL, "How each sign | *makes up with a friend.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order: one warm, specific way each sign repairs a friendship, with a light visual gag. Ending: group.
//   ♈ says sorry fast, means it slowly · ♉ shows up with your favourite snack · ♊ a meme is the apology · ♋ cooks
//   your favourite, talks after · ♌ a big gesture · ♍ a thoughtful note, with fixes · ♎ hears your side first · ♏ says the
//   hard thing, then holds your hand · ♐ plans an adventure · ♑ schedules the talk, shows up on time · ♒ "we good?" means
//   "I miss you" · ♓ cries first, hugs longest
//   group "Every way works. | *Just reach out.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, B, steam, scales, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = MINT, ST = { x: -170 }
const pal = (x, t, id, lt, P, o = {}) => friend(x, t, id, o.x ?? 860, o.y ?? 1000, o.s ?? 170, pop01(t, P.t0 + (o.at ?? 0.3), 0.3, 2), { mood: lt > (o.happyAt ?? 1.3) ? 'heart' : 'neutral', look: [-1, 0], seed: 60 + P.i, ...(o.opt || {}) })

const CAMEOS = [
  { sign: 'aries', cap: 'Says sorry fast. | *Means it slowly.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'SORRY!', pop01(t, P.t0 + 0.2, 0.2, 2.4), { size: 60, col: '#ff8a7a', tail: 'bl' })
      L(x, 780, 860, 'SENT IN: 0.3 SEC', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 30)
      pal(x, t, 'libra', lt, P, { at: 0.9, y: 1060, s: 150 })
    } },
  { sign: 'taurus', cap: 'Shows up | with *your favourite snack.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 760, 860, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'COOKIE', 830, 900, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 690, 'DOORSTEP DELIVERY', pop01(t, P.t0 + 0.2, 0.3, 2), PINK, -0.04, 30)
      L(x, 790, 1100, 'FORGIVEN BY BITE 2', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Sends a meme. | *That’s the apology.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: '#ffd23a', lines: [['[cat meme]', LAV, 1, true], ['LMAOOO', MINT, lt > 1.0 ? pop01(lt, 1.0, 0.25, 2.2) : 0], ['ok we’re good', MINT, lt > 1.4 ? pop01(lt, 1.4, 0.25, 2.2) : 0]], size: 24 })
    } },
  { sign: 'cancer', cap: 'Cooks your favourite. | *Talks it out after.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2)); steam(x, t, 790, 840, { n: 3, alpha: 0.8, h: 110 })
      L(x, 790, 740, 'TABLE FOR TWO', pop01(t, P.t0 + 0.5, 0.3, 2), SKYB, -0.04, 32)
      bubble(x, 790, 1100, 'so… about that', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Apologises with | a *big gesture.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      label(x, 760, 800, 'I’M SORRY!!', pop01(t, P.t0 + 0.4, 0.35, 2.4), { size: 52, bg: '#ffb34a', rot: -0.05 })
      sparkles(x, t, 790, 800, P.t0 + 0.6, 8, 230, 0.2)
      L(x, 790, 1000, 'BANNER: 3 METRES', pop01(t, P.t0 + 1.2, 0.3, 2.2), BONE, 0.04, 30)
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 260, cell: 7, seed: 5 })
    } },
  { sign: 'virgo', cap: 'Writes a thoughtful note. | *With fixes.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 880, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'I’M SORRY', headBg: MINT, headInk: INK, lines: ['next time I’ll:', '1. listen', '2. text back', '3. bring snacks'], size: 28, align: 'left', progress: prog(lt, 0.3, 1.3), rot: -0.03 })
    } },
  { sign: 'libra', cap: 'Hears your side first. | *Really hears it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      scales(x, 760, 920, pop01(t, P.t0 + 0.2, 0.3, 2), 0.2 * Math.cos(lt * 3) * (1 - clamp((lt - 0.8) / 0.5)), 'ME', 'YOU')
      L(x, 760, 1150, 'BALANCED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Says the hard thing. | Then *holds your hand.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'that hurt me.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: '#e2c4ff', tail: 'bl' })
      pal(x, t, 'gemini', lt, P, { at: 0.5, y: 1000, s: 190, happyAt: 1.2 })
      hearts(x, t, 680, 960, P.t0 + 1.3, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 8 })
    } },
  { sign: 'sagittarius', cap: 'Plans an adventure. | Fight *forgotten by lunch.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, B.MAP, { G: '#7dd18a', B: SKYB, R: GOLD }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 790, 700, 'ROAD TRIP. GET IN.', pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.04, 30)
      L(x, 790, 1070, 'THE FIGHT: ???', pop01(t, P.t0 + 1.4, 0.3, 2.2), BONE, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Schedules the talk. | *Shows up on time.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 790, 860, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, head: 'CALENDAR', headBg: STEEL, headInk: INK, lines: ['6:00 talk', 'with bestie', '(brought tea)'], size: 30, rot: 0.04 })
      L(x, 790, 1110, 'ARRIVED: 5:58', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Texts “we good?” | Means *“I miss you.”*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TRANSLATE', headCol: MINT, lines: [['we good?', BONE, 1, true], ['= I miss you', PINK, lt > 1.0 ? pop01(lt, 1.0, 0.25, 2.2) : 0, true], ['miss you too', MINT, lt > 1.5 ? pop01(lt, 1.5, 0.25, 2.2) : 0]], size: 24 })
    } },
  { sign: 'pisces', cap: 'Cries first. | *Hugs longest.*', mood: 'heart', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pal(x, t, 'cancer', lt, P, { x: 660, y: 900, s: 260, at: 0.4, happyAt: 0.9, opt: { tears: lt > 0.9 ? 1 : 0 } })
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.6) * 40)
      L(x, 790, 1140, `HUG: ${n} MIN`, pop01(t, P.t0 + 0.8, 0.3, 2), SKYB, -0.04, 34)
      hearts(x, t, 560, 760, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0584', key: 'E', accent: ACC, ending: 'group',
  title: 'How each sign | *makes up with a friend.*',
  cameos: CAMEOS,
  group: {
    cap: 'Every way works. | *Just reach out.*',
    moods: Array(12).fill('heart'),
    draw(x, t, lt) {
      hearts(x, t, 540, 1000, t - lt + 1.2, { n: 12, life: 2.6, spread: 800, cell: 8, seed: 7 })
      label(x, 540, 700, '✦ FRIENDSHIP: RESTORED ✦', pop01(t, t - lt + 1.8, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
