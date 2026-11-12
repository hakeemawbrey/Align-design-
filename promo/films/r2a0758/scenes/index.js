// r2a0758: star_advice, ADVICE SOLO (libra), "What Libras need | *after a fight.*" (signs3kit social cut, lofi · C).
// One sign the whole way: nine kind things a Libra needs after a disagreement, each with one light gag.
// Ending: card (lesson + last line over the Libra + Aries match card; Aries is the friend from the fight).
//   time to cool off, not a verdict · say "we're okay" out loud · they replay it: help them hit pause
//   · a peace offering (Aries brings truce pizza) · skip the scoreboard · let them say their part (draft twelve)
//   · own your half: the scales level · bring a flower · then a normal hang, proof it's fine
//   group "Peace. | *Restored.*"  lesson "Peace isn’t weakness. | It’s their *superpower.*"
//   last "Aries said sorry. | Libra: *“snacks?”*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, scales, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'libra', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Give them time to cool off. | *It’s not a verdict.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'COOLING: 10 MIN', pop01(t, P.t0 + 0.5, 0.3, 2.2), SKYB, -0.04, 32)
      L(x, 800, 1080, 'STILL FRIENDS: YES', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Say “we’re okay.” | *Out loud.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'we’re okay. | promise.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 1040, 'LIBRA: EXHALES', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 32)
      hearts(x, t, 560, 760, P.t0 + 1.1, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'They replay it all night. | Help them *hit pause.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'TV', 800, 850, 22 * k)
      if (k > 0.9) { x.save(); x.fillStyle = lt > 1.1 ? BONE : RED; if (lt > 1.1) { x.fillRect(764, 790, 26, 80); x.fillRect(810, 790, 26, 80) } else { x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.fillText('REPLAY #9', 800, 840) } x.restore() }
      L(x, 800, 1080, lt > 1.1 ? 'PAUSED. BREATHE.' : 'ON LOOP', 1, lt > 1.1 ? MINT : STEEL, 0.04, 30)
    } },
  { sign: S, cap: 'A small peace offering. | *Snacks count.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const d = ease.outCubic(clamp((lt - 0.2) / 0.6))
      friend(x, t, 'aries', lerp(960, 850, d), 950, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'wide', look: [-1, 0] })
      bits(x, 'PIZZA', 690, 960, 14 * pop01(t, P.t0 + 0.8, 0.3, 2.2), { rot: -0.4 })
      L(x, 820, 680, 'TRUCE PIZZA', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Skip the scoreboard. | *Nobody wins those.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 850); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -110, 340, 220); x.fillStyle = '#2a2350'; x.fillRect(-160, -100, 320, 200)
        x.fillStyle = lt > 1.1 ? STEEL : '#ffb34a'; x.font = `700 84px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText(lt > 1.1 ? '0 : 0' : '3 : 2', 0, 6); x.restore()
      }
      L(x, 800, 1080, 'SCORE: DELETED', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Let them say their part. | *All twelve drafts.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 2; i >= 0; i--) sheet(x, 800 + i * 24, 860 - i * 20, pop01(t, P.t0 + 0.2 + (2 - i) * 0.2, 0.3, 2), { w: 290, h: 300, head: `DRAFT ${12 - i}`, headBg: PINK, headInk: INK, lines: i ? [] : ['i just feel', 'like, both', 'sides…'], size: 30, align: 'left', progress: prog(lt, 0.8, 1.6), rot: -0.04 + i * 0.03 })
      L(x, 800, 1120, 'YOU LISTENED. ♥', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Fairness matters to them. | *Own your half.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tilt = lerp(0.32, 0, ease.inOutCubic(clamp((lt - 0.7) / 0.8)))
      scales(x, 770, 900, 0.82 * pop01(t, P.t0 + 0.2, 0.3, 2), tilt, 'MINE', 'YOURS')
      L(x, 800, 1120, 'BALANCE: BACK', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
      sparkles(x, t, 800, 780, P.t0 + 1.6, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Bring a flower. | *Pretty helps.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'FLOWER', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1110, 'AESTHETIC: RESTORED', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 28)
      sparkles(x, t, 800, 800, P.t0 + 1.1, 7, 160, 0.6)
    } },
  { sign: S, cap: 'Then a normal hang. | *Proof it’s fine.*', mood: 'heart', star: { x: -200 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'COUCH', 560, 1010, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'aries', 760, 880, 200, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 800, 650, 'MOVIE NIGHT: ON', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0758', key: 'C', accent: ACC, solo: S, ending: 'card',
  title: 'What Libras need | *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'aries', chip: 'ALIGNED' },
  group: { cap: 'Peace. | *Restored.*', mood: 'heart' },
  lesson: { text: 'Peace isn’t weakness. | It’s their *superpower.*', chip: 'BALANCE: BACK' },
  last: { text: 'Aries said sorry. | Libra: *“snacks?”*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
