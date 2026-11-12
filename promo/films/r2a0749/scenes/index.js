// r2a0749: star_advice, ADVICE SOLO, "Aquarians need | *to feel heard.*" (topic: "What Aquarians need | to feel heard", trimmed to two lines) (~45 s vertical, signs3kit social cut,
// music: lofi · E). One sign the whole way, 9 cards, a relatable Aquarius truth + a warm reframe, one visual gag each:
//   ask about the weird idea · don't fix it, just listen · space is recharging · big cause (show up for one)
//   · fun-fact swaps · a little alien is the charm · 3 a.m. universe texts · one good chat beats a crowd
//   · remember what they said
//  37.8  "Odd ideas. | *Huge heart.*"   41.2  callback: "Heard at last. | *Beamed up.*" (the little UFO returns)
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, phone, swapLabel, friend, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'aquarius', ACC = '#38c4ec', ST = { x: -170 }
const UFO = ['....GGGG....', '...GWWGGG...', '..GGGGGGGG..', 'SSSSSSSSSSSS', 'SYSSYSSYSSYS', '.SSSSSSSSSS.', '...S....S...']
const UFO_C = { G: '#a8f0ff', W: '#ffffff', S: STEEL, Y: GOLD }
function beam(x, cx, top, bottom, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#c8fff0'
  x.beginPath(); x.moveTo(cx - 50, top); x.lineTo(cx + 50, top); x.lineTo(cx + 150, bottom); x.lineTo(cx - 150, bottom); x.fill(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Ask about | the *weird idea.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'what if clouds | had names?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 940, 'TELL ME MORE ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 36)
    } },
  { sign: S, cap: 'Don’t fix it. | *Just listen.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const drop = ease.outCubic(prog(lt, 0.7, 1.1))
      bits(x, 'WRENCH', 790, lerp(760, 1080, drop), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(-0.4, 0.3, drop), alpha: 1 - 0.5 * drop })
      L(x, 790, 860, 'LISTENING MODE ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Need space? | *It’s a recharge.*', mood: lt => lt > 1.6 ? 'sparkle' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), f = clamp((lt - 0.3) / 1.4)
      bits(x, 'BATT', 790, 860, 22 * k)
      if (k > 0.5) { x.fillStyle = MINT; x.fillRect(790 - 22 * 6.5 + 22 + 4, 860 - 22 * 2.5 + 22 + 4, (22 * 10 - 8) * f, 22 * 3 - 8) }
      L(x, 790, 1060, 'BACK SOON ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Big cause? | *Show up for it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 640, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      friend(x, t, 'leo', 860, 960, 180, pop01(t, P.t0 + 0.7, 0.35, 2), { mood: 'sparkle', look: [-1, 0], seed: 41 })
      L(x, 790, 650, 'TWO VOICES NOW', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Fun facts = love. | *Trade one back.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'octopuses have | three hearts!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 920, 'sloths can | hold their breath!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'br', col: LAV })
      L(x, 790, 1120, 'FACT SWAP ♡', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'A little alien? | *That’s the charm.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, UFO, UFO_C, 790, 760 + Math.sin(t * 3) * 10, 16 * k)
      beam(x, 790, 810, 1100, k * clamp((lt - 0.6) * 2))
      L(x, 790, 1080, 'ORIGINAL ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: S, cap: '3 a.m. universe texts? | *Wonder back.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 600, 640, 12 * pop01(t, P.t0 + 0.1, 0.3, 2))
      phone(x, t, 820, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '3:07 AM', headCol: LAV, lines: [['are we made', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['of stars?', BONE, pop01(t, P.t0 + 0.6, 0.25, 2), true], ['yes ♡ wow', MINT, pop01(t, P.t0 + 1.3, 0.25, 2)]] })
    } },
  { sign: S, cap: 'Not a crowd person? | *One good chat.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 720, 940, 14 * pop01(t, P.t0 + 0.3, 0.3, 2)); bits(x, 'MUG', 880, 940, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      steam(x, t, 790, 880, { n: 2, h: 110 })
      L(x, 790, 700, 'PARTY OF 2', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 38)
      L(x, 790, 1100, 'BEST NIGHT ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Remember what they said. | *That’s the trick.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'how’s the cloud | naming going?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl', col: LAV })
      L(x, 790, 940, 'FELT: HEARD ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 36)
      hearts(x, t, 370, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 150, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0749', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Aquarians need | *to feel heard.*',
  cameos: CAMEOS,
  group: { cap: 'Odd ideas. | *Huge heart.*', mood: 'heart' },
  last: {
    text: 'Heard at last. | *Beamed up.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.4, 2)
      if (k <= 0.01) return
      drawBits(x, UFO, UFO_C, 540, 820 + Math.sin(t * 3) * 10, 18 * k)
      beam(x, 540, 880, 1280, k * clamp((lt - 1.0) * 2))
      signChar(x, t, 'aquarius', 540, 1150 - 40 * clamp((lt - 1.2) / 1.5), 260 * k, { mood: 'heart', seed: 71, hops: [t - lt + 1.2] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
