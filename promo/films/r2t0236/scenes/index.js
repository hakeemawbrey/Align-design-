// r2t0236: star_talk, ROLLCALL, "The signs | splitting the bill." (~54 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs at the end of one dinner, each the most extreme version of themself when the bill lands.
//   0.0–3.6    "The signs | *splitting the bill.*"
//   3.6–49.2   ♈ first date, paid before hello · ♉ split dessert? absolutely not · ♊ paid with four cards, lost two
//              · ♋ paid for everyone, packed leftovers too · ♌ paid for the table, took a bow · ♍ itemized it, to the crouton
//              · ♎ can't pick a card, asked the waiter's sign · ♏ already paid, nobody saw how · ♐ paid in four currencies
//              · ♑ sent everyone an invoice, with a due date · ♒ proposed a world without bills · ♓ saw the total, sobbed, paid anyway
//  49.2        group ending: "Nobody knows | who *ordered fries.*"  a lone basket of fries drops over the group.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, receipt, bankCard, coin, sheet, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#7dffb0'
const ST = { x: -170 }
const LBL = { font: MONO, weight: 700 }

const CAKE = ['....PPPP....', '..PPPPPPPP..', 'CCCCCCCCCCCC', 'WWWWWWWWWWWW', 'CCCCCCCCCCCC', 'WWWWWWWWWWWW', 'CCCCCCCCCCCC']
const CAKE_C = { P: PINK, C: '#8a4a2e', W: CREAM }
const BOX = ['..KKKKKK..', '.KWWWWWWK.', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWRRRRWWK', 'KWWWWWWWWK', '.KWWWWWWK.']
const BOX_C = { K: INK, W: CREAM, R: RED }
const FRIES = ['Y.Y.YY.Y.Y', 'YYYYYYYYYY', 'RRRRRRRRRR', 'RWRRRRRRWR', 'RRRRRRRRRR', '.RRRRRRRR.', '..RRRRRR..']
const FRIES_C = { Y: SUN, R: RED, W: CREAM }
const PAPER = ['WWWWWW', 'WKKKKW', 'WWWWWW', 'WKKKWW', 'WWWWWW']

const CAMEOS = [
  { sign: 'aries', cap: 'First date. | Paid *before hello.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      bankCard(x, 790, 900, pop01(t, P.t0 + 0.3, 0.3, 2), RED, { rot: -0.2 + 0.05 * Math.sin(t * 9) })
      bubble(x, 780, 680, 'got it! | …hi, I’m Aries', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1080, 'PAID · 0:04 IN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, ...LBL })
    } },
  { sign: 'taurus', cap: 'Split dessert? | *Absolutely not.*', mood: lt => lt > 1.0 ? 'squint' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CAKE, CAKE_C, 790, 960, 20 * k)
      bubble(x, 790, 700, 'mine.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 64, tail: 'bl' })
      label(x, 790, 1110, 'SHARING: OFF', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: -0.04, ...LBL })
    } },
  { sign: 'gemini', cap: 'Paid with four cards. | *Lost two.*', mood: lt => lt > 1.4 ? 'wide' : 'wink', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const COLS = [SKYB, PINK, MINT, SUN]
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), gone = i >= 2 ? ease.inCubic(prog(lt, 1.2 + (i - 2) * 0.2, 1.6 + (i - 2) * 0.2)) : 0
        if (gone < 1) { x.save(); x.globalAlpha *= 1 - gone; bankCard(x, 700 + i * 60, 900 - i * 40 + gone * 160, k, COLS[i], { rot: -0.3 + i * 0.2 + gone * 1.2, w: 180, h: 114 }); x.restore() }
      }
      label(x, 790, 650, 'CARDS: 4 → 2', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05, ...LBL })
    } },
  { sign: 'cancer', cap: 'Paid for everyone. | Packed *leftovers too.*', mood: 'heart', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BOX, BOX_C, 790 + (i % 2 ? 24 : -24), 1060 - i * 140, 19 * pop01(t, P.t0 + 0.25 + i * 0.25, 0.3, 2))
      label(x, 790, 1150, 'LEFTOVERS: 3', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, ...LBL })
      bubble(x, 780, 590, 'one for your mom', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Paid for the table. | *Took a bow.*', mood: 'sparkle', star: ST, hops: [0.9],
    squash: lt => lt > 1.1 && lt < 1.8 ? 0.12 : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'you’re welcome.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 880, 'APPLAUSE, PLEASE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: ORANGE, rot: -0.05, ...LBL })
      sparkles(x, t, 380, 860, P.t0 + 1.1, 7, 170, 0.3)
      hearts(x, t, 790, 1050, P.t0 + 1.3, { n: 4, life: 1.5, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'virgo', cap: 'Itemized the bill. | *To the crouton.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      receipt(x, 790, 540, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.3, 1.5),
        [['soup', '4.10'], ['bread', '2.00'], ['salad', '6.50'], ['1 crouton', '0.12'], ['½ olive', '0.08'], ['air', '0.00'], ['you owe', '3.41']], { w: 290 })
      label(x, 790, 1130, 'CHECKED TWICE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, ...LBL })
    } },
  { sign: 'libra', cap: 'Can’t pick a card. | *Asked the waiter.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const sw = Math.floor(lt * 2.4) % 2
      bankCard(x, 700, 1000 - (sw ? 0 : 30), pop01(t, P.t0 + 0.2, 0.3, 2), PINK, { rot: -0.15 })
      bankCard(x, 890, 1000 - (sw ? 30 : 0), pop01(t, P.t0 + 0.35, 0.3, 2), SKYB, { rot: 0.15 })
      bubble(x, 790, 700, 'what’s your sign? | you decide', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Already paid. | *Nobody saw how.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      receipt(x, 800, 600, pop01(t, P.t0 + 0.3, 0.3, 2), 1, [['table 7', ''], ['total', '•••'], ['paid by', '???']], { w: 270, head: 'PAID ✓' })
      bubble(x, 790, 1040, 'it’s handled.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Paid in | *four currencies.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const SYM = ['$', '€', '¥', '£']
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.25 + i * 0.22, 0.3, 2.2)
        coin(x, 230 + (i % 2) * 140, 760 + Math.floor(i / 2) * 150, 58, k, SYM[i], { col: [SUN, '#d8dbe8', ORANGE, MINT][i] })
      }
      label(x, 300, 1090, 'EXCHANGE RATE?', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.05, ...LBL })
    } },
  { sign: 'capricorn', cap: 'Sent everyone an invoice. | *With a due date.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      sheet(x, 320, 830, 280, 340, pop01(t, P.t0 + 0.2, 0.35, 2), 'INVOICE #7', { rot: -0.04 }, () => {
        txt(x, 'pasta ½', -100, -40, { size: 26, font: MONO, weight: 700, align: 'left' })
        txt(x, '9.25', 100, -40, { size: 26, font: MONO, weight: 700, align: 'right' })
        txt(x, 'late fee', -100, 30, { size: 26, font: MONO, weight: 700, align: 'left' })
        txt(x, '0.50', 100, 30, { size: 26, font: MONO, weight: 700, align: 'right' })
      })
      label(x, 320, 1090, 'DUE: FRIDAY 9 A.M.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: 0.04, ...LBL })
    } },
  { sign: 'aquarius', cap: 'Proposed a world | *without bills.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'money is | a construct.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.2, 0.3, 2)
      sheet(x, 800, 960, 230, 200, k, 'PETITION', { rot: 0.05, size: 26 }, () => txt(x, 'signed: 1', 0, 50, { size: 26, font: MONO, weight: 700, color: RED }))
    } },
  { sign: 'pisces', cap: 'Saw the total. | *Sobbed.* Paid anyway.', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      receipt(x, 800, 560, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.2, 0.9), [['dinner', '41.00'], ['tip', '9.00'], ['total', '50.00']], { w: 260 })
      label(x, 800, 1040, 'TISSUES: ALSO PAID', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, ...LBL })
    } },
]

const F = makeFilm({
  id: 'r2t0236', key: 'C', accent: ACC, ending: 'group',
  title: 'The signs | *splitting the bill.*',
  cameos: CAMEOS,
  group: {
    cap: 'Nobody knows | who *ordered fries.*',
    draw(x, t, lt) {
      const d = ease.outCubic(prog(lt, 1.6, 2.2))
      if (lt > 1.6) drawBits(x, FRIES, FRIES_C, 540, lerp(520, 770, d), 22, { rot: 0.05 * Math.sin(t * 3) })
      label(x, 540, 620, 'FRIES · ???', pop01(t, t - lt + 2.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, ...LBL })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
