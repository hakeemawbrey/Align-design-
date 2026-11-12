// r2t0653: star_talk, BELIKE, "Proven wrong? | Zodiacs *be like.*" (topic: zodiacs when they're wrong; signs3kit
// social cut, music: lofi · G). Twelve signs in zodiac order:
//   ♈ argued louder · ♉ didn't move, for three days · ♊ switched sides mid-argument · ♋ baked an apology pie
//   · ♌ took a bow anyway · ♍ wrong once, still not over it · ♎ "we were both right" (nobody was) · ♏ shredded the
//   evidence · ♐ laughed for ten minutes · ♑ wrong once, made a policy · ♒ "ahead of its time" · ♓ admitted it, wept
// Ending: group. "Being wrong? | *Not in their chart.*" with a CHART SAYS: RIGHT sticker over the group photo.
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }

const PIE = ['....SS....', '...S..S...', '.CCCCCCCC.', 'CWCCWCCWCC', 'CCCCCCCCCC', 'FFFFFFFFFF', '.TTTTTTTT.']
const PIE_C = { S: BONE, C: '#e8b36a', W: '#c98f2a', F: '#c23a5a', T: STEEL }
const SHRED = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '.W.W.W.W.W..', '.W.W.W.W.W..', '..W.W.W.W.W.', '.W.W.W.W.W..', '..W...W.W...']
const SHRED_C = { K: INK, S: STEEL, W: CREAM }
const ROCK = ['...GGGGG...', '.GGGgGGGGG.', 'GGGGGGGgGGG', 'GgGGGGGGGGG', 'GGGGGgGGGGG', '.GGGGGGGGG.']
const ROCK_C = { G: '#7a86b8', g: '#5a6698' }
const SCALE = ['.....YY.....', '.....YY.....', 'YYYYYYYYYYYY', 'Y....YY....Y', 'Y....YY....Y', 'PPP..YY..PPP', 'PPP..YY..PPP', '.....YY.....', '...YYYYYY...']
const SCALE_C = { Y: GOLD, P: PINK }

// spotlight cone from top-left onto the star
function spot(x, k, cx) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
  x.beginPath(); x.moveTo(cx - 40, 490); x.lineTo(cx + 40, 490); x.lineTo(cx + 200, 1180); x.lineTo(cx - 200, 1180); x.closePath(); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Proven wrong? | Argued *louder.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.25, 2.2)
      bubble(x, 790, 700, 'am NOT!!', k * (lt > 1.0 ? 1.25 : 1), { size: 50, tail: 'bl' })
      L(x, 790, 1060, lt > 1.2 ? 'VOLUME: MAX' : 'VOLUME: 9', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, -0.04, 38)
    } },
  { sign: 'taurus', cap: 'Wrong? Didn’t move. | *For three days.*', mood: 'neutral', star: { x: -170, y: 20 },
    back(x, t, lt, P) { drawBits(x, ROCK, ROCK_C, 380, 1110, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const d = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 2)
      L(x, 790, 760, `DAY ${d}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.05, 48)
      L(x, 790, 920, 'NOT BUDGING', pop01(t, P.t0 + 1.2, 0.3, 2.4), STEEL, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Switched sides | *mid-argument.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const flip = lt > 1.1
      bubble(x, 790, 680, flip ? 'as I always said…' : 'you’re wrong!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl', col: flip ? MINT : BONE })
      L(x, 790, 900, flip ? 'TEAM: YOURS' : 'TEAM: MINE', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 38)
      L(x, 790, 1080, 'NOBODY NOTICED', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Wrong? | Baked *an apology pie.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PIE, PIE_C, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      steam(x, t, 790, 790, { n: 3, h: 120 })
      L(x, 790, 1080, 'SORRY (AND FILLING)', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Wrong? | *Took a bow anyway.*', mood: 'sparkle', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { spot(x, ease.outCubic(prog(lt, 0.3, 0.6)), 370) },
    front(x, t, lt, P, F) {
      L(x, 790, 720, 'BRAVO, ME', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 42)
      bubble(x, 790, 900, 'thank you, | thank you', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      if (lt > 1.0) for (let i = 0; i < 3; i++) bits(x, 'HEARTB', 300 + i * 70, 1120 - ((t * 120 + i * 60) % 200), 6)
    } },
  { sign: 'virgo', cap: 'Wrong once. | *Still not over it.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 320, h: 300, head: 'ERROR LOG', headBg: RED, lines: ['mistakes: 1', 'year: 2019', 'replays: daily'], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 790, 1090, 'STILL THINKING ABOUT IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), STEEL, -0.04, 24)
    } },
  { sign: 'libra', cap: '“We were both right.” | *Nobody was.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCALE, SCALE_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.12 * Math.sin(lt * 6) })
      L(x, 790, 640, 'PERFECT BALANCE', pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, 0.05, 32)
      L(x, 790, 1090, 'FACTS: OPTIONAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Wrong? | *Shredded the evidence.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHRED, SHRED_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const p = prog(lt, 0.4, 1.1)
      if (p < 1) sheet(x, 790, 800 - 120 * (1 - p), 1, { w: 180, h: 130, head: '', lines: ['I was', 'wrong'], size: 30, rot: 0 })
      L(x, 790, 1100, 'NEVER HAPPENED', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Wrong? Laughed | *for ten minutes.*', mood: lt => Math.floor(lt * 4) % 2 ? 'happy' : 'sparkle', star: ST, hops: [0.5, 0.9, 1.3, 1.7, 2.1],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'HAHAHA', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (1 + 0.05 * Math.sin(t * 20)), { size: 56, tail: 'bl' })
      bubble(x, 800, 900, 'ha… wait, HA', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl', col: MINT })
      L(x, 790, 1090, 'STILL GOING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Wrong once. | Made *a policy.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 330, h: 320, head: 'POLICY #1', headBg: '#2fc79a', headInk: INK, lines: ['never again.', '', 'signed,', 'management'], size: 32, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 790, 1100, 'EFFECTIVE NOW', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Not wrong. | *Ahead of its time.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’ll see', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl', col: MINT })
      L(x, 790, 900, 'CHECK BACK IN 3000', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, 0.05, 30)
      sparkles(x, t, 790, 900, P.t0 + 1.1, 7, 180, 0.4, [MINT, SKYB, BONE])
    } },
  { sign: 'pisces', cap: 'Admitted it. | Then *wept with relief.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 3 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you were right', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl', col: SKYB })
      bits(x, 'TISSUE', 790, 930, 16 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 790, 1100, 'SO FREEING', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0653', key: 'G', accent: ACC, ending: 'group',
  title: 'Proven wrong? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Being wrong? | *Not in their chart.*',
    draw(x, t, lt) { L(x, 540, 760, 'CHART SAYS: RIGHT ✓', pop01(t, t - lt + 1.6, 0.35, 2.4), MINT, -0.04, 44) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
