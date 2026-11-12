// r2t0149: THE SIGNS AS… v3, ROLLCALL, "The signs | at game night." (~62 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "The signs at | *game night.*"
//   3.6–49.2   ♈ lost round one, demanded twelve rematches · ♉ didn't play, guarded the chips · ♊ explained the rules, then
//              invented new ones · ♋ let you win every single game · ♌ charades: performed a whole musical · ♍ read the
//              rulebook, every page, twice · ♎ couldn't pick a team, joined both · ♏ bluffed so hard the dog folded
//              · ♐ rolled the dice into the next room · ♑ won the money game, kept playing alone · ♒ invented a game: guess
//              everyone's sign · ♓ drew a "skip" card, sobbed
//  49.2        "Nobody | *followed the rules.*"
//  52.4        LESSON UNLOCKED: "Forget the score. | *Look who showed up.*"  STATUS: SQUAD
//  58.3        "Aries wants | *a rematch.*"  a little Aries above the group, REMATCH #13.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

const ACC = '#7dffb0'
const ST = { x: -170 }

const BOWL = ['.YYYYYYYYY.', 'YYYOYYYOYYY', 'KKKKKKKKKKK', '.KRRRRRRRK.', '..KRRRRRK..', '...KKKKK...']
const BOWL_C = { Y: '#ffd86b', O: ORANGE, K: INK, R: RED }
const DIE = ['KKKKKKKKK', 'KWWWWWWWK', 'KWKWWWKWK', 'KWWWWWWWK', 'KWWWKWWWK', 'KWWWWWWWK', 'KWKWWWKWK', 'KWWWWWWWK', 'KKKKKKKKK']
const DOG = ['T......T.', 'TT....TT.', 'BBBBBBBB.', 'BKBBBKBB.', 'BBBNNBBBT', 'BBBBBBBBT', '.BBBBBBB.', '.BB...BB.']
const DOG_C = { T: '#b06a4a', B: '#e8a24a', K: INK, N: INK }
const BOOK = ['KKKKKKKKKKKK', 'KRRRRRRRRRRK', 'KRWWWWWWWWRK', 'KRRRRRRRRRRK', 'KRRRRRRRRRRK', 'KRRWWWWWWRRK', 'KRRRRRRRRRRK', 'KRRRRRRRRRRK', 'KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const BOOK_C = { K: INK, R: '#3f6fd0', W: '#fff4e2' }
const COIN = ['.YYYY.', 'YYWYYY', 'YWYYYY', 'YYYYYY', '.YYYY.']

/** a playing card face up */
function playCard(x, cx, cy, k, text, { bg = CREAM, col = RED, rot = 0.06 } = {}) {
  card(x, cx, cy, 200, 280, k, { bg, rot }, () => {
    x.strokeStyle = col; x.lineWidth = 6; x.strokeRect(-84, -124, 168, 248)
    txt(x, text, 0, 0, { size: 46, color: col })
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Lost round one. | Demanded *twelve rematches.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', star: { x: -150 }, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'AGAIN.', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 60, tail: 'bl' })
      const n = Math.min(12, 1 + Math.floor(Math.max(0, lt - 0.5) / 0.13))
      label(x, 790, 900, `REMATCH #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 48, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1090, 'IT IS 3 A.M.', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Didn’t play. | *Guarded the chips.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'MINE.', pop01(t, P.t0 + 0.9, 0.3, 2.6), { size: 56, bg: GOLD, rot: -0.06 })
      bubble(x, 790, 1110, 'game? what game?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Explained the rules. | Then *invented new ones.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const R = ['rule 1: roll.', 'rule 2: hop!', 'rule 9: sing.', 'rule 47: me.']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      card(x, 790, 860, 330, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'THE RULES', 0, -110, { size: 30, font: MONO, weight: 700 })
        for (let i = 0; i <= n; i++) txt(x, R[i], 0, -50 + i * 52, { size: 32, color: i === n ? '#c0397a' : INK })
      })
    } },
  { sign: 'cancer', cap: 'Let you win. | *Every single game.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 300, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'SCORES', 0, -70, { size: 30, font: MONO, weight: 700 })
        txt(x, 'YOU: 9', 0, -10, { size: 38, color: '#2fa36b' })
        txt(x, 'CANCER: 0', 0, 50, { size: 34 })
      })
      bubble(x, 790, 1070, 'wow, you’re SO good', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Charades. | Performed *a whole musical.*', mood: 'sparkle', star: ST, hops: [0.6, 1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 680, 'CLUE: “CAT”', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 880, `ACT ${Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.6) / 0.5))}`, pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 56, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'ENCORE? okay!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 390, 860, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Read the rulebook. | *Every page. Twice.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const pg = Math.round(lerp(1, 90, clamp((lt - 0.4) / 1.4)))
      label(x, 790, 1090, lt > 1.9 ? 'READ #2: PAGE 1' : `PAGE ${pg}/90`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a team. | *Joined both.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: 0, y: 40 },
    front(x, t, lt, P) {
      label(x, 290, 640, 'TEAM RED', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 38, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 640, 'TEAM BLUE', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 540, 1130, 'SCORE: A TIE (ALWAYS)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.02, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Bluffed so hard | *the dog folded.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 420, 620, 'POKER FACE: ON', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, DOG, DOG_C, 800, 970, 20 * pop01(t, P.t0 + 0.5, 0.35, 2), { sy: lt > 1.2 ? 0.85 : 1 })
      bubble(x, 800, 790, lt > 1.2 ? 'i fold.' : '…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Rolled the dice. | *Into the next room.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: { x: 150 }, hops: [0.5],
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.4, 1.3))
      if (lt > 0.35) { drawBits(x, DIE, { K: INK, W: '#fff4e2' }, lerp(620, 160, p), 860 - Math.sin(Math.PI * p) * 220, 12, { rot: p * 9, alpha: 1 - prog(lt, 1.2, 1.4) }); drawBits(x, DIE, { K: INK, W: '#fff4e2' }, lerp(640, 200, p), 920 - Math.sin(Math.PI * p) * 180, 10, { rot: -p * 7, alpha: 1 - prog(lt, 1.2, 1.4) }) }
      label(x, 320, 1080, 'DICE: GONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 650, 'oops! FETCH?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Won the money game. | *Kept playing. Alone.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 7; i++) drawBits(x, COIN, { Y: GOLD, W: '#fff1b0' }, 740 + (i % 2) * 90, 1060 - Math.floor(i / 2) * 50, 16 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2))
      label(x, 790, 700, 'OTHERS: ASLEEP', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'one more lap.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Invented a game: | *guess everyone’s sign.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.6)
      label(x, 790, 1040, 'YOU’RE A… LIBRA?', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'CORRECT!', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Drew a “skip” card. | *Sobbed.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      playCard(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 'SKIP', { col: '#7c74f0' })
      label(x, 790, 1090, 'IT’S JUST A CARD', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0149', key: 'D', accent: ACC, ending: 'lesson',
  title: 'The signs at | *game night.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *followed the rules.*' },
  lesson: { text: 'Forget the score. | *Look who showed up.*', chip: 'STATUS: SQUAD' },
  last: {
    text: 'Aries wants | *a rematch.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 460, 775, 200 * k, { mood: 'sparkle', look: [1, 0], seed: 53, hops: [t - lt + 1.0, t - lt + 1.6, t - lt + 2.2] })
      label(x, 720, 740, 'REMATCH #13', pop01(t, t - lt + 1.0, 0.3, 2.4), { size: 42, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
