// r2a0671: star_advice, ADVICE SOLO (leo), "Doing better than | you think, *Leo.*" (the batch hook, re-split so it fits two lines) (signs3kit social cut, lofi · D).
// One sign the whole way: nine gentle truths for a Leo who's being hard on themself, each with a warm reframe and one
// light gag. Ending: group (the group beat is the closing line).
//   nobody clapped (you clapped) · four likes = four people · their chapter twenty vs your chapter one · a tiny trophy
//   still counts · even the sun sets (rest day) · hyped everyone, the megaphone turns round · messed up once: take two
//   · bedhead, still iconic · the right match sees the real you (Sagittarius)
//   group "Still roaring. | *Still enough.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Nobody clapped today? | *You still showed up.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.1, 'APPLAUSE: 0', 'YOU CLAPPED', { size: 40, fromBg: STEEL, toBg: GOLD })
      if (lt > 1.4) sparkles(x, t, 800, 820, P.t0 + 1.8, 7, 180, 0.2)
      bubble(x, 800, 1080, 'proud of me', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Only four likes? | *Four people loved it.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'LIKES: 4', headCol: ACC, lines: [['mom', BONE, pop01(t, P.t0 + 0.6, 0.25, 2), false], ['best friend', PINK, pop01(t, P.t0 + 0.9, 0.25, 2), false], ['your Cancer', SKYB, pop01(t, P.t0 + 1.2, 0.25, 2), false], ['you', GOLD, pop01(t, P.t0 + 1.5, 0.25, 2), false]] })
    } },
  { sign: S, cap: 'Their chapter twenty? | You’re on *chapter one.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 800, 660, 'CH. 1 OF MANY', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, 0.04, 34)
      L(x, 800, 1080, 'GOOD SO FAR', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'A small win? | *Still a win.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const grow = lerp(6, 22, ease.outBack ? ease.outBack(clamp((lt - 1.0) / 0.5)) : clamp((lt - 1.0) / 0.5))
      bits(x, 'TROPHY', 800, 900, (lt < 1.0 ? 6 : grow) * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'REPLIED TO ONE EMAIL', pop01(t, P.t0 + 0.4, 0.3, 2.2), BONE, -0.04, 28)
      sparkles(x, t, 800, 880, P.t0 + 1.3, 7, 190, 0.6)
    } },
  { sign: S, cap: 'Took a rest day? | Even the sun *sets.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.beginPath(); x.rect(560, 560, 480, 470); x.clip()
      bits(x, 'SUN', 800, lerp(760, 1080, ease.inOutCubic(clamp((lt - 0.6) / 1.0))), 16 * k)
      x.restore()
      x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(570, 1026, 460, 14); x.fillStyle = '#4a3a8a'; x.fillRect(570, 1030, 460, 6); x.restore()
      bits(x, 'MOON', 900, 650, 12 * pop01(t, P.t0 + 1.5, 0.3, 2))
    },
    front(x, t, lt, P) { L(x, 760, 1110, 'RECHARGING…', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, 0.04, 34) } },
  { sign: S, cap: 'Hyped up all your friends? | *Your turn.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const turned = lt > 1.2
      bits(x, 'MEGA', 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: turned ? -1 : 1 })
      if (!turned) bubble(x, 830, 660, 'YOU’RE AMAZING', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      else bubble(x, 760, 660, 'so are YOU', pop01(t, P.t0 + 1.25, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      if (turned) hearts(x, t, 420, 820, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Messed up once? | That’s just *take one.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const snap = lt > 0.9 && lt < 1.05 ? -0.35 : 0
      x.save(); x.translate(800, 880); x.rotate(snap); bits(x, 'CLAP', 0, 0, 24 * pop01(t, P.t0 + 0.2, 0.3, 2)); x.restore()
      swapLabel(x, 800, 690, lt, 1.0, 'TAKE 1', 'TAKE 2: ACTION', { size: 36, fromBg: STEEL, toBg: GOLD })
      L(x, 800, 1100, 'STILL THE STAR', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Bad hair day? | *Still iconic.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', star: { x: -150 }, hops: [1.3],
    front(x, t, lt, P, F) {
      bits(x, 'TUFT', F.x, F.top - 10, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 5) * 0.06 })
      L(x, 810, 760, 'MANE: CHAOS', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, 0.05, 34)
      L(x, 810, 1000, 'VIBE: ICONIC', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.05, 36)
      sparkles(x, t, F.x, F.top, P.t0 + 1.35, 6, 150, 0.4)
    } },
  { sign: S, cap: 'The right match | sees *the real you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'sagittarius', 810, 920, 210, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 810, 660, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 34)
      bubble(x, 810, 1130, 'love the bedhead', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bc' })
      hearts(x, t, 640, 880, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0671', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'Doing better than | you think, *Leo.*',
  cameos: CAMEOS,
  group: {
    cap: 'Still roaring. | *Still enough.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
