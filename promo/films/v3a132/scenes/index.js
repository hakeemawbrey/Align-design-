// v3a132: ADVICE SOLO, "Pisces, you're allowed | to rest." (~49 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way (solo, 9 cards), crying gently in every one: permission to rest, Pisces-style. Ending: callback.
//   feelings that aren't yours, set down · daydreaming counts · not every yes (not today ♡) · a good cry is a reset
//   · float a little (you're a fish) · the painting can wait till Tuesday · SAVE EVERYONE crossed out: nap
//   · the moon takes the night shift · alarm: off
//   group "Feel it all. | *Then rest.*"   callback: "Those feelings? | *Still set down.*" (card 1's pile, on the floor)
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { phone, note, frame, bits, ORANGE, RED, PAPER } from '../props.js'

const S = 'pisces', L = { x: -190 }
const TEARS = lt => lt < 1.2 ? 1 : 2

function waves(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= Math.min(1, k)
  for (let r = 0; r < 3; r++) {
    const y = 1020 + r * 60
    x.fillStyle = INK; x.fillRect(150, y - 6, 780, 66)
    x.fillStyle = r === 0 ? SKYB : r === 1 ? '#5aa9e6' : '#3a7ac0'; x.fillRect(150, y, 780, 60)
    x.fillStyle = BONE
    for (let i = 0; i < 9; i++) { const wx = 170 + ((i * 90 + t * 40 * (r % 2 ? -1 : 1) + r * 30) % 760 + 760) % 760; x.fillRect(wx, y + 4, 40, 8) }
  }
  x.restore()
}
const PILE = ['MUM’S', 'BESTIE’S', 'A STRANGER’S']
function pile(x, t, t0, ys = [640, 740, 840], xc = 790) {
  PILE.forEach((s, i) => label(x, xc + (i - 1) * 14, ys[i], `${s} FEELINGS`, pop01(t, t0 + i * 0.2, 0.3, 2.2), { size: 38, bg: [PINK, LAV, SKYB][i], rot: (i - 1) * 0.06, font: MONO, weight: 700 }))
}

const CAMEOS = [
  { sign: S, cap: 'Not your feelings? | *Put them down.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', tears: TEARS, star: L, hops: [1.6],
    front(x, t, lt, P) {
      pile(x, t, P.t0 + 0.2)
      label(x, 790, 1020, 'SET DOWN ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 46, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Daydreaming | *counts as rest.*', mood: 'sleepy', look: [1, -1], tears: TEARS, star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      for (let i = 0; i < 2; i++) { x.fillStyle = BONE; x.globalAlpha = k; x.fillRect(540 + i * 40, 760 - i * 40, 22 + i * 8, 22 + i * 8) }
      x.globalAlpha = 1
      bubble(x, 800, 650, 'a cottage. | a frog. | peace.', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, tail: 'bl', col: LAV })
      label(x, 800, 960, 'REST: IN PROGRESS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You don’t owe | *everyone a yes.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], tears: TEARS, star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 790, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '8:15', head: 'FAVOUR #9', msg: 'can you | help with—', bg: BONE })
      label(x, 790, 1100, 'not today ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 46, bg: PINK, rot: -0.05 })
    } },
  { sign: S, cap: 'A good cry | *is a reset.*', mood: lt => lt > 1.5 ? 'sparkle' : 'sleepy', tears: lt => lt < 1.5 ? 3 : 1, star: L,
    front(x, t, lt, P) {
      label(x, 790, 720, 'CRY: COMPLETE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'I feel | brand new.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 46, tail: 'bl' })
      sparkles(x, t, 350, 860, P.t0 + 1.5, 8, 170, 0.3)
    } },
  { sign: S, cap: 'Float a little. | You’re *a fish.*', mood: lt => lt > 1.0 ? 'happy' : 'sleepy', tears: TEARS, star: { x: -150, y: -40 },
    back(x, t, lt, P) { waves(x, t, prog(lt, 0.2, 0.8) * 1.0) },
    front(x, t, lt, P) {
      label(x, 790, 720, 'FLOAT MODE: ON', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 42, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your art can | *wait till Tuesday.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], tears: TEARS, star: L,
    front(x, t, lt, P) {
      frame(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 260, 220, x2 => {
        x2.fillStyle = PAPER; x2.fillRect(-130, -110, 260, 220)
        const p = 0.55
        x2.fillStyle = PINK; x2.fillRect(-90, -50, 180 * p, 40); x2.fillStyle = LAV; x2.fillRect(-90, 0, 180 * p * 0.8, 40); x2.fillStyle = SKYB; x2.fillRect(-90, 50, 180 * p * 0.6, 30)
      })
      label(x, 790, 1060, 'TO BE CONTINUED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saving everyone? | *Off duty tonight.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], tears: TEARS, star: L,
    front(x, t, lt, P) {
      note(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), 'save everyone | nap', { head: 'TONIGHT', headBg: LAV, size: 46, w: 380, strike: lt > 0.9 ? [0] : [] })
      label(x, 790, 1050, 'HERO: OFF DUTY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Phone down. | *The moon’s got it.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, -1], tears: TEARS, star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'moon', 800, 760, 30 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 1010, 'NIGHT SHIFT: MOON', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 760, P.t0 + 1.1, 7, 170, 0.6)
    } },
  { sign: S, cap: 'Sleep in. | *The stars will wait.*', mood: 'sleepy', tears: TEARS, star: { x: -190, y: 20 },
    front(x, t, lt, P) {
      bits(x, 'pillow', 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'ALARM: OFF', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 48, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1040, 'see you tonight ✦', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a132', key: 'E', accent: SKYB, solo: S, ending: 'callback',
  title: 'Pisces, you’re | allowed *to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Feel it all. | *Then rest.*', mood: 'sleepy' },
  last: {
    text: 'Those feelings? | *Still set down.*',
    draw(x, t, lt) {
      const t0 = t - lt
      PILE.forEach((s, i) => label(x, 540 + (i - 1) * 300, 1150 + (i % 2) * 40, s, pop01(t, t0 + 0.3 + i * 0.15, 0.3, 2.2), { size: 46, bg: [PINK, LAV, SKYB][i], rot: (i - 1) * 0.08, font: MONO, weight: 700 }))
      label(x, 540, 1330, 'SET DOWN ✓', pop01(t, t0 + 0.9, 0.3, 2.2), { size: 46, bg: MINT, rot: -0.03 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
