// r2t0769: THE SIGNS AS… v3, "The signs | *at a tea party.*" (signs3kit social cut, lofi · D).
// Twelve signs at one very polite tea party, each the most extreme version of itself. Ending: callback (Aquarius's
// "new tea" that is just soup turns out to be the hit of the party).
//   ♈ drank it boiling · ♉ scone number eleven · ♊ two cups, two conversations · ♋ brought grandma's 47 teacups
//   · ♌ pinky up, way up · ♍ measured the sugar to the grain · ♎ matched napkins to everyone's sign · ♏ read the tea
//   leaves, knew too much · ♐ brought tea from three countries · ♑ handed out business cards · ♒ invented a new tea
//   (it's soup) · ♓ cried at the tiny sandwiches
//   group "Nobody drank | *the actual tea.*"   last "Hit of the party? | *Aquarius's soup.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb0c8', ST = { x: -170 }
const CUP = ['.WWWWWWWW...', 'WTTTTTTTTW..', 'WWWWWWWWWWWW', '.WPWWPWWW..W', '.WWPWWPWWWWW', '..WWWWWW....', '...WWWW.....', 'SSSSSSSSSS..']
const CUP_C = { W: BONE, T: '#a0603a', P: PINK, S: '#c9c9d8' }
const cup = (x, cx, cy, cell, o) => drawBits(x, CUP, CUP_C, cx, cy, cell, o)
const SCONE = ['..CCCCC..', '.CCCCCCC.', 'CCRCCCRCC', 'WWWWWWWWW', 'CCCCCCCCC', '.CCCCCCC.']
const SCONE_C = { C: '#e8b36a', R: RED, W: CREAM }
const LEAVES = ['.WWWWWWWW.', 'WGGG.GGGGW', 'WG.GGG.GGW', 'WGGGG.G.GW', '.WG.GGGGW.', '..WWWWWW..']
const SOUP = ['.N.N..N.N.N.', '.N..N..N..N.', 'BBBBBBBBBBBB', 'BOOOOOOOOOOB', '.BOOYOOOYOB.', '..BOOOOOOB..', '...BBBBBB...']
const SOUP_C = { N: BONE, B: SKYB, O: '#ffb34a', Y: '#ffe76a' }

const CAMEOS = [
  { sign: 'aries', cap: 'Didn’t wait for it to cool. | *Gulped it.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      cup(x, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 780, 820, { n: 3, alpha: 0.9, h: 140 })
      L(x, 800, 660, 'TEMP: VOLCANO', pop01(t, P.t0 + 0.5, 0.3, 2.2), '#ff6b5a', -0.04, 34)
      L(x, 790, 1090, 'CUP: ALREADY EMPTY', pop01(t, P.t0 + 1.4, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Came for tea. | *Stayed for scone eleven.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCONE, SCONE_C, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 10)
      L(x, 800, 680, `SCONE #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, -0.04, 44)
      L(x, 800, 1090, 'TEA: UNTOUCHED', pop01(t, P.t0 + 1.7, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Two cups. | *Two conversations.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'wink', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      cup(x, 680, 960, 14 * k, { rot: -0.1 }); cup(x, 860, 960, 14 * k, { rot: 0.1, sx: -1 })
      const side = Math.floor(lt * 2.4) % 2
      bubble(x, side ? 880 : 720, 720, side ? 'and THEN…' : 'wait, so…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: side ? 'br' : 'bl' })
      L(x, 800, 1110, 'BOTH: FASCINATED', pop01(t, P.t0 + 1.6, 0.3, 2.2), '#ffd23a', 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Brought grandma’s teacups. | *All forty-seven.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(clamp((lt - 0.2) / 1.2) * 9) + 1)
      for (let i = 0; i < n; i++) { const c = i % 3, r = Math.floor(i / 3); cup(x, 670 + c * 105, 1000 - r * 92, 8) }
      L(x, 800, 660, 'EACH ONE: SPECIAL', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 30)
      hearts(x, t, 370, 1120, P.t0 + 1.4, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Pinky up. | *Way, way up.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      const up = ease.outCubic(clamp((lt - 0.4) / 1.2))
      cup(x, F.x + 150, F.cy - 10, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.fillStyle = INK; x.fillRect(F.x + 196, F.cy - 40 - up * 200, 20, 40 + up * 200); x.fillStyle = '#ffb34a'; x.fillRect(F.x + 200, F.cy - 36 - up * 200, 12, 32 + up * 200); x.restore()
      L(x, 800, 620, 'PINKY: SKY HIGH', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 34)
      sparkles(x, t, F.x + 206, F.cy - 240, P.t0 + 1.5, 7, 110, 0.4)
    } },
  { sign: 'virgo', cap: 'Measured the sugar. | *To the grain.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SCALE', 800, 870, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, '0.500 TSP', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 40)
      L(x, 800, 1090, 'ONE GRAIN OFF: FIXED', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Matched the napkins | *to everyone’s sign.*', mood: lt => lt > 1.4 ? 'sparkle' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const COLS = ['#ff6b5a', '#ffd23a', '#5fd068', '#6fc3ff', '#c97bff', PINK]
      const n = Math.floor(clamp((lt - 0.2) / 1.2) * 6)
      for (let i = 0; i < n; i++) { const c = i % 3, r = Math.floor(i / 3), px = 690 + c * 110, py = 820 + r * 110; x.save(); x.translate(px, py); x.rotate(0.785); x.fillStyle = INK; x.fillRect(-38, -38, 76, 76); x.fillStyle = COLS[i]; x.fillRect(-32, -32, 64, 64); x.restore() }
      L(x, 800, 660, 'SEATING: BY CHART', pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, -0.04, 30)
      L(x, 780, 1100, 'AESTHETIC: ALIGNED', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Read the tea leaves. | *Knew too much.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LEAVES, { W: BONE, G: '#4fbf6a' }, 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 700, 'you ate the | last scone.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
      L(x, 800, 1090, 'TAURUS: BUSTED', pop01(t, P.t0 + 1.8, 0.3, 2.2), '#ff6b8a', 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Brought tea | *from three countries.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const tags = ['PERU', 'JAPAN', 'KENYA']
      tags.forEach((s, i) => L(x, 680 + i * 115, 680 + (i % 2) * 50, s, pop01(t, P.t0 + 0.6 + i * 0.3, 0.3, 2.2), ['#ff9a4a', MINT, SKYB][i], (i - 1) * 0.12, 26))
      L(x, 800, 1100, 'JET-LAG CHAMOMILE', pop01(t, P.t0 + 1.8, 0.3, 2.2), CREAM, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'It’s a tea party. | *Brought business cards.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) sheet(x, 760 + i * 30, 830 + i * 30, pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), { w: 240, h: 140, lines: ['CAPRICORN', 'CEO, TEA'], size: 26, rot: -0.1 + i * 0.07 })
      L(x, 800, 1090, 'NETWORKING: ACTIVE', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Invented a new tea. | *It’s soup.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, SOUP, SOUP_C, 800, 890, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 820, { n: 3, alpha: 0.8, h: 120 })
      L(x, 800, 660, 'BROTH TEA™', pop01(t, P.t0 + 0.6, 0.3, 2.2), SKYB, -0.04, 38)
      L(x, 800, 1090, 'GUESTS: CONFUSED', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cried at the sandwiches. | *They’re so tiny.*', mood: 'wide', star: ST, tears: 3,
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 800, 900, 7 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1000, 'ACTUAL SIZE', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, 0.04, 26)
      bubble(x, 800, 720, 'look at his | little crust', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0769', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs | *at a tea party.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody drank | *the actual tea.*' },
  last: {
    text: 'Hit of the party? | *Aquarius’s soup.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      drawBits(x, SOUP, SOUP_C, 540, 1000, 30 * k)
      if (k > 0.9) steam(x, t, 540, 890, { n: 4, alpha: 0.85, h: 170 })
      L(x, 540, 1240, 'SECONDS, PLEASE', pop01(t, t - lt + 1.4, 0.3, 2.2), SKYB, -0.03, 36)
      sparkles(x, t, 540, 1000, t - lt + 1.2, 8, 230, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
