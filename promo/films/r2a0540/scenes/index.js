// r2a0540: star_advice, ADVICE ROLLCALL, "Each sign’s | *confidence boost.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, one warm, specific boost each with a light visual gag. Ending: callback.
//   ♈ you started, that's the hard part · ♉ slow and steady still crosses the line · ♊ the many ideas are a superpower
//   · ♋ your softness makes people feel safe · ♌ wear the bold outfit · ♍ sent beats perfect · ♎ say your opinion first
//   · ♏ your gut called it again · ♐ say yes to the scary thing · ♑ look how far you've climbed · ♒ weird, certified
//   · ♓ big feelings make you brave
//  group "Look at you. | *Glowing.*"   callback: "Taurus finished. | *Then had a snack.*" (the finish line, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { bits, ORANGE, RED, WOOD, PAPER } from '../props.js'

const ACC = '#ffb34a'
const FLAG = ['WRRRRR', 'WRRRRR', 'WRRRRR', 'W.....', 'W.....', 'W.....', 'W.....', 'W.....']
const FLAG_C = { W: BONE, R: RED }
const BULB = ['..YYY..', '.YYYYY.', 'YYYWYYY', 'YYYWYYY', '.YYYYY.', '..GGG..', '..GGG..', '...G...']
const BULB_C = { Y: GOLD, W: '#fff8d8', G: '#9aa5c4' }
const JACKET = ['.JJ...JJ.', 'JJJJ.JJJJ', 'JJJJWJJJJ', 'JJJJWJJJJ', 'JJ.JWJ.JJ', 'JJ.JWJ.JJ', '...JWJ...']
const MOUNTAIN = ['......W......', '.....WWW.....', '....SSSSS....', '...SSSSSSS...', '..SSSSSSSSS..', '.SSSSSSSSSSS.', 'SSSSSSSSSSSSS']
const MOUNTAIN_C = { W: '#ffffff', S: '#9aa5c4' }

// a finish line: two posts and a ribbon that snaps at `snap` (0..1)
function finish(x, cx, cy, k, snap) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 24, 260); x.fillRect(126, -170, 24, 260)
  x.fillStyle = BONE; x.fillRect(-146, -166, 16, 252); x.fillRect(130, -166, 16, 252)
  x.fillStyle = INK; x.fillRect(-150, -200, 300, 40); for (let i = 0; i < 10; i++) { x.fillStyle = i % 2 ? INK : PAPER; x.fillRect(-146 + i * 29.2, -196, 29.2, 32) }
  x.fillStyle = RED
  if (snap < 0.5) x.fillRect(-130, -30, 260, 14)
  else { x.save(); x.translate(-130, -30); x.rotate(0.9 * (snap - 0.5) * 2); x.fillRect(0, 0, 120, 14); x.restore(); x.save(); x.translate(130, -30); x.rotate(-0.9 * (snap - 0.5) * 2); x.fillRect(-120, 0, 120, 14); x.restore() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'You started. | *That’s the hard part.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 800, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.04 * Math.sin(t * 3) })
      label(x, 800, 660, 'STEP 1: DONE ✓', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Slow and steady | *still finishes.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      finish(x, 800, 980, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 1.1, 1.5))
      label(x, 800, 640, 'PACE: COMFY', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 950, P.t0 + 1.5 * 1.29, 8, 170, 0.3)
    } },
  { sign: 'gemini', cap: 'All those ideas? | *A superpower.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, -1], star: { x: -170 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      ;[[720, 760], [880, 720], [800, 940]].forEach(([cx, cy], i) => drawBits(x, BULB, BULB_C, cx, cy, 15 * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2.2), { rot: 0.1 * Math.sin(t * 2 + i) }))
      label(x, 800, 1110, 'IDEAS: ALL GOOD', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Your softness | *makes people feel safe.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'heart', 800, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      hearts(x, t, 800, 900, P.t0 + 0.9, { n: 6, life: 2.0, spread: 220, cell: 7, seed: 2 })
      label(x, 800, 1090, 'SAFE PLACE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Wear the bold outfit. | *It’s made for you.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, JACKET, { J: GOLD, W: '#fff8d8' }, 800, 880, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 800, 880, P.t0 + 0.7, 8, 190, 0.2, [GOLD, '#ffb34a', BONE])
      label(x, 800, 650, 'FIT: ICONIC', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Sent beats perfect. | *Hit send.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 0.9, 1.6))
      bits(x, 'envelope', lerp(800, 1000, fly), lerp(880, 600, fly), 20 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - fly), { rot: -0.3 * fly })
      label(x, 800, 900, 'SENT ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 52, bg: MINT, rot: 0.04 })
      label(x, 800, 1080, 'OVERTHINKING: PAUSED', pop01(t, P.t0 + 1.8, 0.3, 2), { size: 30, bg: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Your opinion matters. | *Say it first.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'i think | we should...', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      label(x, 800, 920, 'EVERYONE: GREAT IDEA', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Your gut feeling? | *Right again.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 800, 700, 'HUNCH: LOGGED', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 900, 'CALLED IT ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 52, bg: MINT, rot: 0.05 })
      sparkles(x, t, 800, 900, P.t0 + 1.35, 8, 190, 0.2)
    } },
  { sign: 'sagittarius', cap: 'Say yes | *to the scary thing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [-1, 0], star: { x: 170 }, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      bubble(x, 320, 690, 'should i...?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'br' })
      label(x, 320, 900, 'YES.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 72, bg: GOLD, rot: -0.05 })
      label(x, 320, 1080, 'BRAVERY: UNLOCKED', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Look how far | *you’ve already climbed.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [-1, -1], star: { x: 170 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, MOUNTAIN, MOUNTAIN_C, 320, 930, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, FLAG, FLAG_C, 330, 720, 10 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      label(x, 320, 1100, 'YOU: WAY UP HERE', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Your weird | *is your best feature.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, -1], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'star', 800, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.1 * Math.sin(t * 2) })
      label(x, 800, 1070, 'WEIRD: CERTIFIED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Big feelings | *make you brave.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      label(x, 800, 690, 'FEELINGS: HUGE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 900, 'HEART: BRAVE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 46, bg: PINK, rot: 0.05 })
      hearts(x, t, 560, 820, P.t0 + 1.4, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0540', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *confidence boost.*',
  cameos: CAMEOS,
  group: { cap: 'Look at you. | *Glowing.*', moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'heart', 'sparkle', 'heart'] },
  last: {
    text: 'Taurus finished. | *Then had a snack.*',
    draw(x, t, lt) {
      finish(x, 700, 1150, pop01(t, t - lt + 0.3, 0.35, 2), 1)
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 700, 1160, 240 * k, { mood: lt > 1.4 ? 'heart' : 'happy', seed: 12, hops: [t - lt + 1.0] })
      bits(x, 'cookie', 880, 1110, 14 * pop01(t, t - lt + 1.2, 0.3, 2.2), { rot: 0.2 * Math.sin(t * 4) })
      label(x, 700, 1330, 'FINISHED ✓', pop01(t, t - lt + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
