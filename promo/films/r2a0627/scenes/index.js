// r2a0627: star_advice, ADVICE SOLO (cancer), "Cancer, it’s okay | *to miss them.*" (signs3kit social cut, music: lofi · F).
// Nine cards: a relatable Cancer truth + a warm reframe, one gag each: you saved the voicemail, that’s love ·
// old photos, smile at them · missing them isn’t weak, it’s a big heart · kept their hoodie? wear it · cry it out,
// then snacks · text them first, it’s allowed · missing old friends? plan a visit · hiding in your shell? peek out ·
// missing them means it mattered.
// Ending: card (lesson, then the last line over a Cancer + Pisces match card: the two biggest hearts in the zodiac).
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }, SG = 'cancer'
const HOODIE = ['...GGGGGG...', '..GG....GG..', '.GGGG..GGGG.', 'GGGGGGGGGGGG', 'GGGGGWWGGGGG', 'GG.GGWWGG.GG', 'GG.GGGGGG.GG', 'GG.GGGGGG.GG', 'GG.GGGGGG.GG', '...GGGGGG...']
const HOODIE_C = { G: '#ff9a5a', W: CREAM }

/** a little polaroid of two tiny stars */
function polaroid(x, t, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-110, -120, 240, 270)
  x.fillStyle = INK; x.fillRect(-126, -136, 252, 282); x.fillStyle = CREAM; x.fillRect(-120, -130, 240, 270)
  x.fillStyle = '#3a5a9a'; x.fillRect(-100, -110, 200, 180)
  x.fillStyle = GOLD; x.fillRect(-60, -30, 40, 40); x.fillStyle = PINK; x.fillRect(20, -30, 40, 40)
  x.fillStyle = INK; x.font = '800 26px Inter, Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('us ♡', 0, 105)
  x.restore()
}

const CAMEOS = [
  { sign: SG, cap: 'Saved their voicemail? | That’s *love.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'VOICEMAIL', headCol: SKYB, lines: [['“hiii it’s me”', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['SAVED ♡', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2), true], ['PLAYS: MANY', GOLD, pop01(t, P.t0 + 1.8, 0.25, 2.2)]], size: 20 })
    } },
  { sign: SG, cap: 'Scrolling old photos? | *Smile* at them.', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      polaroid(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), 0.06)
      hearts(x, t, 800, 760, P.t0 + 1.2, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
      L(x, 800, 1120, 'GOOD TIMES: KEPT', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: SG, cap: 'Missing them isn’t weak. | It’s *a big heart.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = lerp(10, 30, ease.outBack(clamp((lt - 0.3) / 1.2)))
      bits(x, 'HEARTB', 800, 880, g * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 + 0.04 * Math.sin(t * 7)))
      L(x, 800, 1110, 'HEART SIZE: XXL', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: SG, cap: 'Kept their hoodie? | *Wear it.* Cozy.', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 660, 'SIZE: TOO BIG', pop01(t, P.t0 + 0.8, 0.3, 2), STEEL, -0.05, 32)
      L(x, 800, 1120, 'PERFECT', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 40)
    } },
  { sign: SG, cap: 'Cry it out. | Then *snacks.*', mood: lt => lt < 1.1 ? 'wide' : 'heart', tears: lt => lt < 1.1 ? 1 : 0, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 760, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'COOKIE', 860, 760, 18 * pop01(t, P.t0 + 1.1, 0.3, 2), { rot: 0.1 })
      L(x, 800, 1130, 'BOTH ARE SELF-CARE', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 28)
    } },
  { sign: SG, cap: 'Text them first. | It’s *allowed.*', mood: lt => lt > 1.6 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SENT ♋︎', headCol: PINK, lines: [['thinking of you', PINK, pop01(t, P.t0 + 0.4, 0.25, 2.2), true], ['WAIT, ME TOO!!', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)]], typing: lt > 0.8 && lt < 1.4 ? 1 : 0, size: 20 })
      if (lt > 1.6) hearts(x, t, 800, 680, P.t0 + 1.6, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: SG, cap: 'Missing old friends? | *Plan a visit.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 250, head: 'SATURDAY', headBg: RED, lines: ['their place', 'bring: cake', ['STATUS: YES!', '#2f8a48']], size: 32, progress: clamp((lt - 0.4) / 1.0) })
      bits(x, 'HOUSE', 800, 1070, 16 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { sign: SG, cap: 'Hiding in your shell? | *Peek out.* Hi.', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], star: { x: -180, y: 20 },
    front(x, t, lt, P, F) {
      const up = ease.inOutCubic(prog(lt, 0.9, 1.4))
      bits(x, 'BLANKET', F.x, F.cy + 60 - up * 0 - (1 - up) * 90, 22 * pop01(t, P.t0 + 0.1, 0.3, 2), { sy: lerp(1.6, 0.7, up) })
      bubble(x, 800, 760, 'oh. hi.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 800, 1060, 'THE WORLD MISSED YOU', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: SG, cap: 'Missing them means | *it mattered.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CANDLE', 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 + 0.06 * Math.sin(t * 9) })
      hearts(x, t, 800, 760, P.t0 + 1.0, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 8 })
      L(x, 800, 1130, 'STILL GLOWING', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0627', key: 'F', accent: ACC, solo: SG, ending: 'card',
  title: 'Cancer, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'pisces', chip: 'BIG HEARTS' },
  group: { cap: 'Soft heart. | *Strong heart.*', mood: 'heart' },
  lesson: { text: 'Missing someone means | *you loved well.*', chip: 'HEART: FULL' },
  last: { text: 'They saved | *your voicemail too.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
