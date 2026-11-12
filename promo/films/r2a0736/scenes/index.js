// r2a0736: star_advice, ADVICE SOLO (aries), "Aries, you can't fix | everyone." (signs3kit social cut, lofi · D). Ending: callback.
// Nine gentle truths for the Aries who tries to fix everything for everyone, each with a warm reframe and one light gag:
//   a to-fix list 47 long · a 5-step plan for someone who wanted a hug · yelling "grow faster!" at a seed
//   · "rescuing" a cat that lives in the tree · letting a friend take the other end of the box · listening, mouth zipped
//   · a friend's wild hat (their hat, their call) · shaking a fist at the rain (it passes) · off duty, still a hero
//   group "Care big. | Carry less."  callback: "The cat's fine. | So are you." (the tree cat, back on its branch)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, zzz, rain, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }

function treeCat(x, t, cx, cy, k, cell = 22) {
  bits(x, 'TREE', cx, cy, cell * k)
  if (k > 0.7) bits(x, 'CAT', cx + 4.6 * cell, cy - 0.9 * cell + Math.sin(t * 2) * 2, cell * 0.95 * k)
}

const CAMEOS = [
  { sign: S, cap: 'You fix it all. | *Rest counts too.*', mood: lt => lt > 1.6 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 360, head: 'TO FIX', headBg: ACC, lines: ['bike', 'wifi', 'the sink', 'your life', '…43 more'], size: 32, progress: clamp((lt - 0.3) / 1.0) })
      swapLabel(x, 800, 1110, lt, 1.5, 'TASKS: 47', 'NAP: ALSO A TASK', { size: 30, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'They wanted a hug, | *not a plan.*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const hug = lt > 1.5
      sheet(x, 780, 760, pop01(t, P.t0 + 0.2, 0.3, 2) * (hug ? 1 - prog(lt, 1.5, 1.8) : 1), { w: 280, h: 240, head: '5-STEP PLAN', headBg: GOLD, headInk: INK, lines: ['1. call them', '2. fix it', '3. …'], size: 28, progress: clamp((lt - 0.3) / 0.8) })
      friend(x, t, 'taurus', 820, 1020, 170, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: hug ? 'heart' : 'neutral', look: [-1, 0] })
      bubble(x, 800, hug ? 800 : 1170, hug ? 'perfect.' : 'just a hug?', pop01(t, P.t0 + (hug ? 1.6 : 0.9), 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      if (hug) hearts(x, t, 640, 960, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'You can\'t rush | *someone\'s growing.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'POT', 800, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'GROW FASTER!', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (1 - prog(lt, 1.4, 1.6)), { size: 40, tail: 'bl' })
      L(x, 800, 760, 'GROWING AT ITS PACE', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Some people | *don\'t need rescuing.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, -1], star: ST, hops: [0.5, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      treeCat(x, t, 790, 900, pop01(t, P.t0 + 0.15, 0.35, 2))
      bubble(x, 830, 640, 'i live here.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'br' })
      L(x, 800, 1150, 'CAT STATUS: CHILL', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Helping is love. | *So is being helped.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', star: { x: -130 },
    front(x, t, lt, P) {
      const up = ease.outCubic(prog(lt, 1.0, 1.5))
      bits(x, 'BOX', 560 + 130, 1040 - 60 * up, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) { x.save(); x.fillStyle = INK; x.font = `800 30px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HEAVY', 690, 1060 - 60 * up); x.restore() }
      friend(x, t, 'libra', 860, 920, 180, pop01(t, P.t0 + 0.7, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 760, 660, 'TEAMWORK', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.05, 36)
    } },
  { sign: S, cap: 'Sometimes listening | *is the fix.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 830, 960, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0] })
      bubble(x, 830, 700, 'so then…', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (1 - prog(lt, 1.3, 1.5)), { size: 38, tail: 'br' })
      bubble(x, 830, 700, 'thank you.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'br' })
      L(x, 380, 690, 'ADVICE: ON HOLD', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Their choices | *are theirs.* That\'s okay.', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const F = friend(x, t, 'gemini', 820, 990, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'sparkle', look: [-1, 0] })
      if (F) bits(x, 'WILDHAT', 820, F.top - 40, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.1 })
      bits(x, 'PLAINHAT', 530, 760, 12 * pop01(t, P.t0 + 0.6, 0.3, 2) * (1 - prog(lt, 1.3, 1.5)), { rot: -0.1 })
      L(x, 800, 660, 'THEIR HAT, THEIR CALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Some storms | *just pass.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const sun = ease.outCubic(prog(lt, 1.3, 1.8))
      bits(x, 'SUN', 840, 740, 16 * sun)
      bits(x, 'CLOUD', lerp(790, 1080, sun), 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - sun })
      if (sun < 0.6) rain(x, t, 790, 800, { w: 220, h: 260, alpha: 1 - sun * 1.6 })
      bubble(x, 800, 1080, 'fix it, sky!', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (1 - prog(lt, 1.2, 1.4)), { size: 36, tail: 'bl' })
      L(x, 800, 1080, 'IT PASSED ANYWAY', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Off duty? | *Still a hero.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { bits(x, 'PILLOW', 350, 1090, 20 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 760, 'HERO: OFF DUTY', pop01(t, P.t0 + 0.5, 0.3, 2.2), ACC, -0.04, 34)
      if (lt > 1.0) zzz(x, t, 470, 680, { alpha: clamp((lt - 1.0) * 2) })
      L(x, 790, 980, 'BACK TOMORROW', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0736', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Aries, you can\'t fix | *everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Care big. | *Carry less.*', mood: 'heart' },
  last: {
    text: 'The cat\'s fine. | *So are you.*',
    draw(x, t, lt) {
      treeCat(x, t, 540, 1020, pop01(t, t - lt + 0.5, 0.4, 2), 26)
      hearts(x, t, 660, 900, t - lt + 1.4, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
