// r2a0472: star_advice, ADVICE SOLO (pisces), "Pisces, you can't fix | *everyone.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine gentle reminders for the Pisces who tries to rescue everybody, each a relatable truth +
// a warm reframe with one light gag. Pisces cries in every card (soft tears; this is its own film). Ending: lesson.
//   carried their problems, hand some back · no can still be kind · their storm, not your umbrella · just listen
//   · empty cup, fill yours first · 3 a.m. advice line, sleep · a match who asks about YOU · some people grow at their
//   own pace (plant) · your couch isn't a clinic.
//   group "Big heart. | *Gentle limits.*"   lesson "Loving them | *is enough.*"   last "First on the list? | *You.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, meter, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const ACC = '#a99bff', S = 'pisces', ST = { x: -190 }
const COUCH = ['.PPPPPPPPPPPP.', 'PPPPPPPPPPPPPP', 'PPWWWWPPWWWWPP', 'PPWWWWPPWWWWPP', 'PPPPPPPPPPPPPP', 'PPPPPPPPPPPPPP', '.K..........K.']
const CLOUD = ['...WWWW.....', '..WWWWWWW...', '.WWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.', '..B..B..B...', '.B..B..B....']
const POT = ['OOOOOOO', 'OOOOOOO', '.OOOOO.', '.OOOOO.', '..OOO..']

const CAMEOS = [
  { sign: S, cap: 'Carrying their problems? | *Hand some back.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: lt => lt > 1.3 ? 1 : 2, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 1.0, 1.6))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'suitcase', 720 + m * 200, 960, 18 * k); bits(x, 'suitcase', 760 + m * 160, 860, 15 * k, { rot: 0.1 }); bits(x, 'suitcase', 740 + m * 180, 770, 12 * k, { rot: -0.08 })
      label(x, 800, 650, 'NOT YOURS', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saying no | *can still be kind.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', tears: 1, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'no, but | love you!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: PINK, tail: 'bl' })
      hearts(x, t, 560, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Their storm | *isn’t your umbrella.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: lt => lt > 1.4 ? 1 : 2, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CLOUD, { W: '#9aa5c4', B: SKYB }, 820, 700, 16 * k)
      bits(x, 'umbrella', 820, 950, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 820, 1120, 'THEIR UMBRELLA', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Just listen. | *No fixing required.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: 1, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'mm. that | sounds hard.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 800, 980, 'TOOLBOX: CLOSED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Running on empty? | *Fill your cup first.*', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', tears: 1, look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'mug', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      meter(x, 800, 1080, pop01(t, P.t0 + 0.5, 0.3, 2), 0.08 + 0.92 * ease.inOutCubic(prog(lt, 1.0, 1.8)), { w: 300, col: ACC, title: 'YOUR CUP' })
    } },
  { sign: S, cap: '3 a.m. advice line? | *They’ll be okay. Sleep.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '3:00', head: lt > 1.2 ? 'FOCUS' : '9 NEW', msg: lt > 1.2 ? 'do not | disturb' : 'are you | up??', bg: lt > 1.2 ? LAV : PINK, rot: 0.05 })
      bits(x, 'moon', 940, 640, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
    } },
  { sign: S, cap: 'A match who asks | *how YOU are?* Keep.', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt > 1.2 ? 1 : 2, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:41', head: 'YOUR MATCH', msg: 'how are | YOU, though?', bg: MINT, rot: -0.04 })
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 6, life: 1.6, spread: 200, cell: 6, seed: 6 })
    } },
  { sign: S, cap: 'Some people grow | *at their own pace.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', tears: 1, look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.4, 2.2))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, { O: ORANGE }, 800, 1060, 22 * k)
      if (k > 0.5) { x.fillStyle = INK; x.fillRect(793, 1010 - 160 * g, 18, 160 * g); x.fillStyle = GREEN; x.fillRect(797, 1012 - 160 * g, 10, 156 * g)
        if (g > 0.6) drawBits(x, ['.GG', 'GGG', 'GG.'], { G: GREEN }, 830, 1000 - 160 * g, 12) }
      label(x, 800, 680, 'NO RUSH', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your couch isn’t a clinic. | *It’s just a couch.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', tears: 1, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, COUCH, { P: ACC, W: '#c9c0ff', K: WOOD }, 800, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 730, lt > 1.1 ? 'OPEN: FOR NAPS' : 'OPEN 24/7', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: lt > 1.1 ? MINT : PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0472', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Pisces, you can’t fix | *everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Gentle limits.*', mood: 'heart' },
  lesson: { text: 'Loving them | *is enough.*', chip: 'STATUS: OFF DUTY' },
  last: { text: 'First on the list? | *You.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
