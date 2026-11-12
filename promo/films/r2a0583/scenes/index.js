// r2a0583: star_advice, ADVICE SOLO (cancer), "Cancer, let someone | *take care of you.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine gentle truths about the friend who looks after everyone, each with a warm reframe and one
// light gag. Ending: callback (card 1's soup comes back, made FOR Cancer this time, by Taurus).
//   made soup for everyone · remembers everyone's allergies · checked on everyone today · sick and still hosting · carrying
//   everyone's feelings · "no no, I've got it" · holding the umbrella for everyone · a cosy shell (let people visit)
//   · best match: someone who cares back
//   group "Cares for everyone. | *Your turn.*"   last "This time, someone | *made you soup.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, steam, meter, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }
const SHELL = ['....SSSSSS....', '..SSSsSSsSSS..', '.SSsSSSSSSsSS.', 'SSSSSSDDSSSSSS', 'SSsSSDDDDSSsSS', 'SSSSSDDDDSSSSS', 'BBBBBDDDDBBBBB']
const SOUP = (x, t, cx, cy, cell) => { bits(x, 'BOWL', cx, cy, cell); if (cell > 4) steam(x, t, cx, cy - cell * 5, { n: 3, alpha: 0.8, h: 120 }) }

const CAMEOS = [
  { sign: S, cap: 'Made soup for everyone? | *Someone can make yours.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      SOUP(x, t, 720, 960, 14 * k); SOUP(x, t, 880, 960, 14 * pop01(t, P.t0 + 0.4, 0.3, 2)); SOUP(x, t, 800, 820, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1130, 'BOWLS MADE: 12. FOR YOU: 0', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.03, 26)
    } },
  { sign: S, cap: 'Know everyone’s allergies? | *Let them learn yours.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 860, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'THE FILE', headBg: ACC, headInk: INK, lines: ['Leo: nuts', 'Virgo: gluten', 'Pisces: sad films', 'me: ???'], size: 28, align: 'left', progress: prog(lt, 0.2, 1.0), rot: -0.03 })
      L(x, 800, 1140, 'YOURS MATTER TOO', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Checked on everyone today? | *Someone’s checking on you.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SENT TODAY', headCol: STEEL, lines: [['you ok?', BONE, 1, true], ['you ok??', BONE, 1, true], ['ate yet?', BONE, 1, true], ['are YOU ok?', MINT, lt > 1.1 ? pop01(lt, 1.1, 0.25, 2.2) : 0]], size: 24 })
      hearts(x, t, 620, 800, P.t0 + 1.4, { n: 4, life: 1.5, spread: 150, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Sick, but still hosting? | *Lie down. Really.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 960, 18 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 780, 700, 'GUESTS: 9  FEVER: YES', pop01(t, P.t0 + 0.2, 0.3, 2), RED, -0.04, 26)
      L(x, 800, 1120, 'HOST: OFF DUTY', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Carrying everyone’s stuff? | *Put the bag down.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, squash: lt => lt < 1.2 ? 0.08 : 0, hops: [1.4],
    front(x, t, lt, P) {
      const down = ease.inOutCubic(prog(lt, 1.0, 1.4))
      bits(x, 'SUITCASE', 800, lerp(820, 1000, down), 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.1, 0, down) })
      L(x, 800, lerp(700, 880, down), 'EVERYONE’S STUFF', pop01(t, P.t0 + 0.4, 0.3, 2), LAV, -0.04, 28)
      L(x, 800, 1140, 'SHOULDERS: FREE', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: '“No no, I’ve got it”? | *Try “yes, please.”*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'no no, | I’ve got it!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      if (lt > 0.5) swapLabel(x, 800, 990, lt, 1.1, 'HELP: DECLINED', 'HELP: YES, PLEASE', { size: 32 })
    } },
  { sign: S, cap: 'Umbrella for everyone? | *Get under it too.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const move = ease.inOutCubic(prog(lt, 0.9, 1.4))
      bits(x, 'UMB', lerp(820, 380, move), lerp(800, 690, move), 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.1, -0.05, move) })
      if (lt < 1.2) for (let i = 0; i < 8; i++) { const ph = ((t * 1.6 + i * 0.37) % 1 + 1) % 1; x.fillStyle = SKYB; x.globalAlpha = 1 - ph; x.fillRect(260 + i * 30, 640 + ph * 300, 6, 22); x.globalAlpha = 1 }
      L(x, 800, 1120, 'YOU: DRY TOO', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Your shell is cosy. | *Let people visit.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, SHELL, { S: '#ffd6b0', s: '#e0a77a', D: '#8a5a3a', B: '#6b4228' }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'pisces', 900, 1060, 120, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'happy', look: [-1, 0], tears: 1, seed: 44 })
      L(x, 760, 700, 'VISITORS: WELCOME', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Best match for a Cancer? | *Someone who cares back.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 690, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.03, 30)
      meter(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.3, 1.1)), { col: ACC, w: 340, title: 'CARE: MUTUAL' })
      L(x, 800, 1040, 'GIVE + GET', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 36)
      hearts(x, t, 800, 900, P.t0 + 1.2, { n: 5, life: 1.6, spread: 260, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0583', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Cancer, let someone | *take care of you.*',
  cameos: CAMEOS,
  group: { cap: 'Cares for everyone. | *Your turn.*', mood: 'heart' },
  last: {
    text: 'This time, someone | *made you soup.*',
    draw(x, t, lt) {
      const t0 = t - lt
      signChar(x, t, 'cancer', 330, 1130, 300 * pop01(t, t0 + 0.4, 0.4, 1.8), { mood: lt > 1.6 ? 'heart' : 'wide', look: [1, 0], seed: 9, tears: lt > 1.6 ? 1 : 0, hops: [t0 + 1.7] })
      const fk = pop01(t, t0 + 0.6, 0.4, 1.8)
      if (fk > 0.01) signChar(x, t, 'taurus', 750, 1130, 300 * fk, { mood: 'happy', look: [-1, 0], seed: 10 })
      const k = pop01(t, t0 + 1.0, 0.35, 2)
      SOUP(x, t, 545, lerp(1300, 1250, k), 18 * k)
      bubble(x, 800, 900, 'for you.', pop01(t, t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      hearts(x, t, 545, 1180, t0 + 1.8, { n: 6, life: 2.0, spread: 160, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
