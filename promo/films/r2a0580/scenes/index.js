// r2a0580: star_advice, ADVICE ROLL CALL (twelve signs), "How each sign | *picks the plan.*" (signs3kit social
// cut, music: lofi · G). One warm, specific line per sign about what they bring to a group decision, each with a light gag:
//   ♈ decides in a second (thank you, leader) · ♉ votes for the comfy place (always right) · ♊ brings twelve options (fun
//   ones) · ♋ makes sure everyone's happy · ♌ makes it feel like an event · ♍ read every menu (bless them) · ♎ wants
//   everyone's vote (fair matters) · ♏ quietly knows the best spot · ♐ suggests somewhere new (say yes once) · ♑ booked the
//   table before anyone asked · ♒ proposes something wild (hear them out) · ♓ "I'm fine with anything" (ask what they love).
// Ending: lesson ("Every voice | makes the plan better." PLAN: MADE), then "Now, someone | pick a place."
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }
const b = (x, bm, c, cx, cy, cell, o) => drawBits(x, bm, c, cx, cy, cell, o)
const BALLOT = ['...WWWW...', '...WWWW...', 'KKKKKKKKKK', 'KBBBKKBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KKKKKKKKKK']
const BALLOT_C = { W: '#ffffff', K: INK, B: LAV }
const PIN = ['.RRR.', 'RRWRR', 'RRRRR', '.RRR.', '..R..', '..R..']
const PIN_C = { R: RED, W: '#ffffff' }

const CAMEOS = [
  { sign: 'aries', cap: 'Decides in one second. | *Thank you, leader.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'tacos. done.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 790, 920, 'DECIDED IN: 0.4 SEC', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 30)
      sparkles(x, t, 790, 720, P.t0 + 0.6, 6, 160, 0.2)
    } },
  { sign: 'taurus', cap: 'Picks the comfy place. | *Never wrong.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SOFA', 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MUG', 900, 760, 12 * pop01(t, P.t0 + 0.5, 0.3, 2)); steam(x, t, 895, 710, { alpha: 0.6 })
      L(x, 790, 1080, 'SEATS: SQUISHY', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Brings twelve options. | *Fun ones, though.*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 380, head: 'OPTIONS', headBg: GOLD, headInk: INK, font: MONO, weight: 700, size: 24, align: 'left',
        lines: ['1 tacos', '2 karaoke?', '3 a museum', '4 tacos again', '5 ...'], progress: prog(lt, 0.3, 1.4) })
    } },
  { sign: 'cancer', cap: 'Makes sure | *everyone’s happy.*', mood: 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 320, head: 'IS EVERYONE OK?', headBg: SKYB, headInk: INK, font: MONO, weight: 700, size: 26, align: 'left',
        lines: ['✓ sam', '✓ jo', '✓ the quiet one', ['✓ you', '#2fc79a']], progress: prog(lt, 0.3, 1.4) })
      hearts(x, t, 400, 800, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Makes any plan | *feel like an event.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      L(x, 790, 760, 'TACO TUESDAY', pop01(t, P.t0 + 0.3, 0.3, 2.4), '#ffb34a', -0.04, 44)
      L(x, 790, 900, 'THE PREMIERE', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.05, 40)
      confetti(x, t, 790, 900, P.t0 + 1.1, { n: 22, spread: 280 })
    } },
  { sign: 'virgo', cap: 'Read every menu. | *Bless them.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) sheet(x, 720 + i * 45, 860 - i * 30, pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2), { w: 220, h: 280, head: 'MENU', headBg: '#2fc79a', headInk: INK, rot: -0.1 + i * 0.07, lines: [] })
      L(x, 790, 1100, 'BEST DISH: FOUND', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Wants everyone’s vote. | *Fair matters.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      b(x, BALLOT, BALLOT_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { const p = prog(lt, 0.5 + i * 0.3, 0.8 + i * 0.3); if (p > 0 && p < 1) { x.fillStyle = INK; x.fillRect(766, 640 + p * 140, 48, 36); x.fillStyle = '#ffffff'; x.fillRect(770, 644 + p * 140, 40, 28) } }
      L(x, 790, 1100, 'VOTES IN: ALL OF THEM', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Knows the best spot. | *Ask them.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      b(x, PIN, PIN_C, 840, 820, 14 * pop01(t, P.t0 + 0.8, 0.3, 2.4))
      bubble(x, 790, 640, 'trust me.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Suggests a new place. | *Say yes once.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'the place with | no sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 920, 'NEW FAVE: UNLOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Booked the table | *before anyone asked.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1040, 'RESERVED: 7:30', pop01(t, P.t0 + 0.9, 0.3, 2.4), '#2fc79a', -0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Pitches something wild. | *Hear them out.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'dinner… on | a rooftop?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      L(x, 790, 940, 'THE GROUP: …YES?', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 32)
      sparkles(x, t, 790, 720, P.t0 + 1.4, 7, 170, 0.3, [MINT, SKYB, BONE])
    } },
  { sign: 'pisces', cap: '“Fine with anything”? | *Ask what they love.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: lt => lt > 1.2 ? 2 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 1.2) bubble(x, 790, 720, 'anything’s fine!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      else bubble(x, 790, 720, '…sushi?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 48, col: SKYB, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 6 })
      L(x, 790, 1060, 'FINALLY ASKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0580', key: 'G', accent: ACC, ending: 'lesson',
  title: 'How each sign | *picks the plan.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'pisces', chip: 'ALIGNED' },
  group: { cap: 'Twelve opinions. | *One great night.*' },
  lesson: { text: 'Every voice | *makes the plan better.*', chip: 'PLAN: MADE' },
  last: { text: 'Now, someone | *pick a place.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
