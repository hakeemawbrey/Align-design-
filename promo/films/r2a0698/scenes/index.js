// r2a0698: star_advice, ADVICE SOLO (cancer), "How to apologise | *to a Cancer.*" (signs3kit social cut, music: lofi · C)
// One sign (solo, 9 cards): a relatable Cancer truth + a warm, gentle way to make up, one gag each. Ending: callback.
//   not "sry", the whole word · soup helps (it always helps) · give them a minute in their shell · knock gently
//   · mean it, they can tell · don't rush the hug · their mom already heard · ask how they feel, then listen
//   · make a plan together
//   group "Soft shell. | *Softer heart.*"   last "All forgiven. | *Soup for two.*" (card 2's soup, now two bowls)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, friend, swapLabel, RED, CREAM, STEEL, clamp, ease, prog, lerp } from './props.js'

const S = 'cancer', ST = { x: -190 }, ACC = '#8fe3ff'
const SHELL = ['....OOOO....', '..OOWOOWOO..', '.OOOOOOOOOO.', 'OOWOOOOOOWOO', 'OOOOOWOOOOOO', 'OOOOOOOOOOOO', 'DDDDDDDDDDDD']
const SHELL_C = { O: '#ff9a7a', W: '#ffd0b8', D: '#c9603a' }

const CAMEOS = [
  { sign: S, cap: 'Not “sry.” | *The whole word.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, lt < 1.0 ? 'sry' : 'I’m so sorry. ♡', pop01(t, P.t0 + (lt < 1.0 ? 0.2 : 1.0), 0.25, 2.2), { size: lt < 1.0 ? 50 : 40, tail: 'br', col: lt < 1.0 ? STEEL : BONE })
      if (lt > 1.4) L(x, 790, 1060, 'ALL THE LETTERS', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Bring soup. | *Soup always helps.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 840, { n: 3, h: 140 })
      L(x, 790, 680, 'HOMEMADE ♡', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 36)
    } },
  { sign: S, cap: 'Give them a minute | *in the shell.*', mood: 'sleepy', star: { x: -190, y: 40 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, SHELL, SHELL_C, F.x, F.cy - 40 + (1 - k) * -200, 26 * k, { alpha: clamp(k * 1.5) })
      L(x, 790, 820, 'SHELL: CLOSED', pop01(t, P.t0 + 0.9, 0.3, 2.2), STEEL, 0.05, 34)
      L(x, 790, 920, '(BRIEFLY)', pop01(t, P.t0 + 1.4, 0.3, 2.2), BONE, -0.04, 30)
    } },
  { sign: S, cap: 'Knock gently. | *They’ll open up.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DOORX', 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, 'knock knock ♡', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bc' })
      if (lt > 1.4) L(x, 800, 1130, 'DOOR: AJAR', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Mean it. | *They can tell.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LENS', 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 2) * 0.1 })
      L(x, 790, 1100, lt > 1.3 ? 'SINCERE ✓' : 'CHECKING…', pop01(t, P.t0 + 0.6, 0.3, 2.2), lt > 1.3 ? MINT : LAV, -0.04, 38)
    } },
  { sign: S, cap: 'Don’t rush the hug. | *Let it last.*', mood: 'heart', star: { x: -120 },
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 620, 920, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'happy', look: [-1, 0], seed: 14 })
      const s = Math.floor(clamp(lt / 2.2) * 40)
      L(x, 700, 1130, `HUG: ${s} SEC`, pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, 0.04, 36)
      hearts(x, t, 500, 800, P.t0 + 0.8, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Their mom | *already heard.*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM ♡', headCol: PINK, size: 26, lines: [['I heard.', BONE, pop01(t, P.t0 + 0.6, 0.25, 2), false], ['call me.', BONE, pop01(t, P.t0 + 1.1, 0.25, 2), false], ['(say sorry 2)', LAV, pop01(t, P.t0 + 1.6, 0.25, 2), false]] })
    } },
  { sign: S, cap: 'Ask how they feel. | *Then just listen.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'how are you, | really?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'br', col: LAV })
      const n = 1 + Math.floor(t * 3) % 3
      L(x, 790, 950, 'LISTENING' + '.'.repeat(n), pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.03, 38)
      L(x, 790, 1120, 'PHONE: DOWN', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Make a plan | *to do better.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 320, head: 'THE PLAN', headBg: '#3a6a8a', lines: ['✓ text back', '✓ show up', ['✓ more soup', '#3a8a4a']], size: 32, progress: clamp((lt - 0.4) / 1.0), align: 'left' })
    } },
]

const F = makeFilm({
  id: 'r2a0698', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'How to apologise | *to a Cancer.*',
  cameos: CAMEOS,
  group: { cap: 'Soft shell. | *Softer heart.*', mood: 'heart' },
  last: {
    text: 'All forgiven. | *Soup for two.*',
    draw(x, t, lt) {
      for (let i = 0; i < 2; i++) bits(x, 'BOWL', 360 + i * 360, 1150, 22 * pop01(t, t - lt + 0.5 + i * 0.3, 0.35, 2))
      steam(x, t, 360, 1080, { n: 2, h: 140 }); steam(x, t, 720, 1080, { n: 2, h: 140 })
      hearts(x, t, 540, 1080, t - lt + 1.3, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
