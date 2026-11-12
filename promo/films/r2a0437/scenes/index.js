// r2a0437: star_advice, ADVICE SOLO, "Pisces, you can | *ask for help.*" (signs3kit social cut, music: lofi · F).
// One sign the whole film (makeFilm solo mode, 9 cards). Pisces cries in every card (sniffles, happy tears, one fountain).
// Ending: callback (the umbrella from card 5 comes back).
//   3.6–37.8   carries everyone's stuff · "i'm fine!" (fountain) · texting "can you help?" is brave · your birthday, we've got it
//              · a friend shares the umbrella · rest is not a weakness · the helpers queue up · hugs are free
//              · even the ocean needs the moon
//  37.8        "Soft heart. | *Brave enough.*"
//  41.2        "Raining again? | *Umbrella’s here.*"
import {
  makeFilm, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  L, at, phone, buddy, rain, drawBits, clamp, prog, ease, lerp,
  UMBRELLA, UMBRELLA_C, CLOUD, CLOUD_C, BED, BED_C, CAKE, CAKE_C, MOON, MOON_C,
  RED, CREAM, ORANGE, TEAL, WOOD, GREEN,
} from './props.js'

const SEA = '#6f9cff'
/** a wobbling stack of boxes, each with a tiny label */
function boxes(x, t, cx, cy, n, k) {
  if (k <= 0.01) return
  const C = [ORANGE, MINT, PINK, SKYB, GOLD, LAV]
  const W = ['MOM', 'WORK', 'BFF', 'EX', 'CAT', 'YOU?']
  for (let i = 0; i < n; i++) {
    const w = 190 - i * 10, wob = Math.sin(t * 4 + i) * i * 2.2
    x.save(); x.translate(cx + wob, cy - i * 62); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -31, w + 10, 62); x.fillStyle = C[i % 6]; x.fillRect(-w / 2, -26, w, 52)
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(W[i % 6], 0, 2)
    x.restore()
  }
}
/** waves along the panel floor */
function waves(x, t, top, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.fillRect(110, top - 6, 860, 6)
  for (let i = 0; i < 18; i++) { const px = 110 + i * 48, h = 18 + 10 * Math.sin(t * 2 + i * 0.8); x.fillStyle = SEA; x.fillRect(px, top - h, 48, 1240 - top + h) }
  x.fillStyle = 'rgba(255,255,255,0.4)'; for (let i = 0; i < 9; i++) x.fillRect(130 + i * 96 + 10 * Math.sin(t + i), top + 10, 30, 6)
  x.restore()
}

const S = 'pisces'
const CAMEOS = [
  { sign: S, cap: 'You carry everyone. | *Let someone carry you.*', mood: 'wide', tears: 1, look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      boxes(x, t, 790, 1100, Math.min(6, 1 + Math.floor(clamp((lt - 0.2) / 1.2) * 6)), at(t, P, 0.15))
      L(x, 800, 640, 'HANDLE WITH CARE', at(t, P, 1.5), LAV, 0.04, 28)
    } },
  { sign: S, cap: 'You say *“I’m fine.”* | We see the tears.', mood: 'happy', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'i’m FINE!', at(t, P, 0.2, 0.25), { size: 54, tail: 'bl' })
      L(x, 790, 1060, 'FINE-NESS: LEAKING', at(t, P, 1.3), SKYB, -0.04, 30)
    } },
  { sign: S, cap: 'Texting “can you help?” | is *brave.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 2 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, at(t, P, 0.15), { head: 'BESTIE', headCol: LAV, lines: [
        ['can you help?', LAV, at(t, P, 0.4), true], ['on my way.', MINT, at(t, P, 1.1)], ['bringing snacks', MINT, at(t, P, 1.4)],
      ] })
    } },
  { sign: S, cap: 'Your birthday? | *We’ve got it.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 18 * at(t, P, 0.4))
      L(x, 790, 650, 'SURPRISE! (FOR YOU)', at(t, P, 0.2), PINK, -0.04, 30)
      sparkles(x, t, 790, 860, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: S, cap: 'A storm inside? | *Share the umbrella.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: 1, look: [1, -1], star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, CLOUD, CLOUD_C, F.x, 560, 14 * at(t, P, 0.1))
      const cover = ease.outCubic(prog(lt, 0.7, 1.2))
      x.save(); x.beginPath(); x.rect(110, 600, 860, 640); x.clip()
      rain(x, t, F.x - 90, F.x + 90, 610, lerp(1150, 640, cover), { n: 10 })
      x.restore()
      buddy(x, t, 'taurus', 790, 960, 210, at(t, P, 0.4), { mood: 'happy', look: [-1, 0], seed: 61 })
      drawBits(x, UMBRELLA, UMBRELLA_C, lerp(790, F.x + 70, cover), lerp(760, 640, cover), 14 * at(t, P, 0.5), { rot: lerp(0.2, -0.15, cover) })
    } },
  { sign: S, cap: 'Rest is not | a *weakness.*', mood: 'sleepy', tears: 1, star: { x: -190, y: 40 },
    back(x, t, lt, P) { drawBits(x, BED, BED_C, 540, 1020, 30 * at(t, P, 0.05)) },
    front(x, t, lt, P) {
      L(x, 790, 640, 'NAP: APPROVED', at(t, P, 1.2), MINT, -0.04, 34)
      drawBits(x, MOON, MOON_C, 860, 790 + 6 * Math.sin(t * 2), 10 * at(t, P, 0.6))
    } },
  { sign: S, cap: 'Your friends | *want* to show up.', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 3 : 1, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const ids = ['aries', 'cancer', 'virgo', 'leo']
      ids.forEach((id, i) => {
        const come = ease.outCubic(prog(lt, 0.2 + i * 0.25, 0.7 + i * 0.25))
        buddy(x, t, id, lerp(1100, 610 + i * 100, come), 980 - (i % 2) * 30, 130, come > 0.01 ? 1 : 0, { mood: 'happy', look: [-1, 0], seed: 62 + i, hops: [P.t0 + 1.5 + i * 0.1] })
      })
      L(x, 770, 650, 'HELPERS: IN LINE', at(t, P, 1.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Ask for the hug. | *It’s free.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      const come = ease.outCubic(prog(lt, 0.3, 1.0))
      buddy(x, t, 'cancer', lerp(900, 700, come), 900, 260, at(t, P, 0.2), { mood: lt > 1 ? 'heart' : 'happy', look: [-1, 0], seed: 66 })
      hearts(x, t, 560, 760, P.t0 + 1.1, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 6 })
      L(x, 600, 1150, 'HUGS: UNLIMITED', at(t, P, 1.3), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Even the ocean | needs the *moon.*', mood: 'sparkle', tears: 1, look: [1, -1], star: { x: -170, y: -30 },
    back(x, t, lt, P) { waves(x, t, 1040 - 30 * Math.sin(lt * 1.5), at(t, P, 0.1)) },
    front(x, t, lt, P) {
      drawBits(x, MOON, MOON_C, 800, 640 + 8 * Math.sin(t * 2), 20 * at(t, P, 0.3))
      sparkles(x, t, 800, 640, P.t0 + 1.0, 7, 140, 0.4)
      L(x, 790, 880, 'PULL: GENTLE', at(t, P, 1.4), SKYB, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0437', key: 'F', accent: LAV, solo: S, ending: 'callback',
  title: 'Pisces, you can | *ask for help.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Brave enough.*', mood: 'heart' },
  last: {
    text: 'Raining again? | *Umbrella’s here.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      if (k <= 0.01) return
      const F = buddy(x, t, 'pisces', 460, 1120, 300, k, { mood: 'heart', tears: 2, look: [1, -1], seed: 67 })
      buddy(x, t, 'taurus', 720, 1150, 220, pop01(t, t - lt + 0.8, 0.4, 2), { mood: 'happy', look: [-1, 0], seed: 68 })
      drawBits(x, UMBRELLA, UMBRELLA_C, 580, 950, 22 * pop01(t, t - lt + 1.1, 0.35, 2.2), { rot: -0.08 })
      hearts(x, t, 580, 860, t - lt + 1.5, { n: 6, life: 1.8, spread: 300, cell: 8, seed: 7 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
