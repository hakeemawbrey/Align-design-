// r2a0278: star_advice, ADVICE SOLO (aquarius), "How to thank | an Aquarius." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One Aquarius the whole way through: nine warm, slightly odd ways to say thank you that an Aquarius actually loves.
//   0.0–3.6    "How to thank | *an Aquarius.*"
//   3.6–37.8   nine cards: thank them with a weird fact · thank the idea, not just the help · keep it low-key (they'll
//              blush anyway) · a handwritten note, kept forever · ask about their latest obsession · plant a tree for them
//              · call them one of a kind · send a meme only they'd get · gift them a star map of their birth night
//  37.8        "Low-key thanks. | *Big feelings.*"
//  41.2        callback: "Their tree? | *Already named it.*" the little tree comes back with a name tag.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'aquarius', ACC = '#8fe3ff'
const ST = { x: -170 }

const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..']
const BULB_C = { Y: SUN, W: '#fff8d0', G: GREY }
const BALLOON = ['.RRR.', 'RRWRR', 'RRRRR', 'RRRRR', '.RRR.', '..K..', '..K..', '.K...', '..K..', '...K.']
const TREE = ['...GGG...', '..GGGGG..', '.GGgGGGG.', 'GGGGGGgGG', '.GGGGGGG.', '..GGgGG..', '....B....', '....B....', '..OOOOO..', '..OOOOO..', '...OOO...']
const TREE_C = { G: GREEN, g: '#9be88a', B: BROWN, O: ORANGE }
const BOX = ['KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const BOX_C = { K: INK, W: WOOD }

const CAMEOS = [
  { sign: S, cap: 'Thank them with | *a weird fact.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'fun fact: | otters hold hands | while they sleep', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: BONE, tail: 'bl' })
      bubble(x, 790, 1000, 'also: thank you', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      sparkles(x, t, 370, 860, P.t0 + 1.4, 7, 170, 0.2, [ACC, BONE, MINT])
    } },
  { sign: S, cap: 'Thank the idea. | Not just *the help.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BULB, BULB_C, 790, 760, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1040, 'IDEA: GENIUS', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 0.8, 7, 160, 0.4)
    } },
  { sign: S, cap: 'Keep it low-key. | *They’ll blush anyway.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BALLOON, { R: PINK, W: '#fff', K: BONE }, 790, 820, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.08 * Math.sin(t * 2) })
      label(x, 790, 1080, 'ONE BALLOON. PERFECT.', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04 })
      if (lt > 1.2) { x.fillStyle = 'rgba(255,120,160,0.5)'; x.fillRect(290, 900, 34, 12); x.fillRect(416, 900, 34, 12) }
    } },
  { sign: S, cap: 'A handwritten note? | *Kept forever.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = ease.inOutCubic(prog(lt, 1.0, 1.6))
      drawBits(x, BOX, BOX_C, 790, 1060, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 790, lerp(760, 990, g), 260, 170, 1.3 * pop01(t, P.t0 + 0.3, 0.35, 2) * (1 - 0.55 * g), { bg: CREAM, rot: lerp(-0.06, 0, g) }, () => {
        txt(x, 'thank you!!', 0, -14, { size: 40, weight: 800, color: '#3f6fd0' }); txt(x, '— me', 50, 44, { size: 26, color: GREY })
      })
      label(x, 790, 1190, 'TREASURE BOX', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask about their | *latest obsession.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'so… tell me | about moss?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      const m = Math.floor(clamp((lt - 0.6) / 1.4) * 2) + 1
      label(x, 790, 900, `TALKING: HOUR ${m}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'HAPPIEST EVER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Plant a tree | *in their name.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = ease.outBack(prog(lt, 0.3, 1.1))
      drawBits(x, TREE, TREE_C, 790, 1080 - 150 * g, 24 * g, { sy: g })
      label(x, 770, 640, 'BEST. GIFT. EVER.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
      hearts(x, t, 560, 860, P.t0 + 1.4, { n: 4, life: 1.5, spread: 100, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Call them *one of a kind.* | Watch them glow.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’re one | of a kind', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: PINK, tail: 'br' })
      bubble(x, 790, 950, 'eh. whatever.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      label(x, 790, 1120, 'INSIDE: THRILLED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Send a meme | *only they’d get.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 850, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'FOR YOU', headCol: ACC, size: 26, lines: [
        ['[robot pigeon]', LAV, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['HAHAHA', MINT, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['you GET me', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Gift them a star map. | *Their birth night.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 820, 150, pop01(t, P.t0 + 0.3, 0.35, 2), t, 0.15)
      label(x, 790, 1070, '✦ MY BIRTH CHART ✦', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.0, 8, 200, 0.2, [ACC, BONE, GOLD])
    } },
]

const F = makeFilm({
  id: 'r2a0278', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'How to thank | *an Aquarius.*',
  cameos: CAMEOS,
  group: { cap: 'Low-key thanks. | *Big feelings.*', mood: 'heart' },
  last: {
    text: 'Their tree? | *Already named it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 380, 980, 240 * k, { mood: 'heart', look: [1, 0], seed: 54, hops: [t0 + 1.4] })
      drawBits(x, TREE, TREE_C, 740, 960, 26 * pop01(t, t0 + 0.7, 0.4, 2))
      label(x, 740, 1180, 'HI, GERALD', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
