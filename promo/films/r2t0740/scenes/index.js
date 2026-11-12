// r2t0740: star_talk, BE LIKE, "Stole their fry? | Zodiacs be like." (the batch hook, shortened to fit two lines) (signs3kit social cut, lofi · F). Ending: lesson.
//   ♈ stole it back, plus your burger · ♉ moved the fries into a safe · ♊ didn't notice, was stealing yours
//   · ♋ gave you all of them, brings it up yearly · ♌ gasped so loud the chef came out · ♍ noticed the gap, row three
//   · ♎ took one of yours, now it's fair · ♏ said nothing, took your dessert · ♐ laughed, ordered a bucket
//   · ♑ sent you an invoice, per fry · ♒ didn't care, only eats the ketchup · ♓ it was their favourite fry (sobbing)
//   group "Everyone | took it personally."  LESSON: "Share the fries. | Keep the friends."  FRIES: SHARED
//   last: "Taurus still | has the safe."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, fryGrid, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Stole it back. | *Plus your burger.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const g = ease.inOutCubic(prog(lt, 0.7, 1.2))
      bits(x, 'FRIES', 820, 1020, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BURGER', lerp(820, 560, g), lerp(780, 760, g) - Math.sin(Math.PI * g) * 80, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 820, 650, 'REVENGE: INSTANT', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Moved the fries | *into a safe.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SAFE', 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'FRIES: SECURED', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 32)
      bubble(x, 800, 1140, 'code: no.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Didn\'t notice. | Was *stealing yours.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'FRY', F.x + 150, F.cy - 10, 10 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.4 })
      bubble(x, 800, 720, 'hm? what fry?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1080, 'FRIES TAKEN: 6', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Gave you all of them. | *Brings it up yearly.*', mood: lt => lt > 1.3 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 290, h: 260, head: 'EVERY NOV 12', headBg: RED, lines: ['remember', 'the fries?', 'i do.'], size: 34 })
      L(x, 800, 1110, 'YEAR 3 OF THIS', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Gasped so loud | the *chef came out.*', mood: 'wide', star: ST, hops: [0.4],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'GASP!!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 70, tail: 'bl' })
      bits(x, 'CHEFHAT', 820, 960, 18 * pop01(t, P.t0 + 1.1, 0.35, 2))
      L(x, 800, 1120, 'CHEF: CONCERNED', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Noticed the gap. | *Row three.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      fryGrid(x, 800, 900, k, 12)
      if (lt > 1.0) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(800, 1010, 60 * clamp((lt - 1.0) * 4), 0, Math.PI * 2); x.stroke(); x.restore() }
      L(x, 800, 680, 'ROW 3: ONE MISSING', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: 'libra', cap: 'Took one of yours. | *Now it\'s fair.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', star: ST,
    front(x, t, lt, P) {
      const bal = ease.inOutCubic(prog(lt, 0.8, 1.3))
      bits(x, 'SCALE', 800, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.14, 0, bal) })
      L(x, 800, 700, 'BALANCE: RESTORED', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Said nothing. | Took *your dessert.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SLICE', 800, 930, 22 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 720, 'NOTED.', pop01(t, P.t0 + 0.3, 0.3, 2.2), LAV, -0.04, 40)
      L(x, 800, 1110, 'EVEN NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, 0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Laughed. | Ordered *a whole bucket.*', mood: 'sparkle', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bits(x, 'BUCKET', 800, 930, 22 * pop01(t, P.t0 + 0.4, 0.35, 2))
      sparkles(x, t, 800, 900, P.t0 + 0.8, 7, 180, 0.3)
      L(x, 800, 690, 'FRIES FOR EVERYONE', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#ff9a4a', -0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Sent you an invoice. | *Per fry.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 340, head: 'INVOICE', headBg: '#2fc79a', headInk: INK, lines: ['1 fry: $0.12', 'late fee: $0.03', 'total: $0.15', 'due: today'], size: 28, progress: clamp((lt - 0.3) / 1.0), font: "'Space Mono', monospace", weight: 700 })
      L(x, 800, 1120, 'PAYMENT: EXPECTED', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Didn\'t care. | Only eats *the ketchup.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'KETCHUP', 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.15 })
      bubble(x, 800, 690, 'fries? overrated.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1120, 'BOTTLE 2 OF 3', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'It was | *their favourite fry.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'FRY', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      L(x, 800, 700, 'STOLEN', pop01(t, P.t0 + 0.9, 0.3, 2.4), RED, -0.08, 40)
      sparkles(x, t, 800, 880, P.t0 + 0.4, 6, 140, 0.4)
      bubble(x, 800, 1110, 'the crispy one!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0740', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Stole their fry? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone | *took it personally.*' },
  lesson: { text: 'Share the fries. | *Keep the friends.*', chip: 'FRIES: SHARED' },
  last: { text: 'Taurus still | *has the safe.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
