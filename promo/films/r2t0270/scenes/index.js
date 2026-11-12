// r2t0270: THE SIGNS AS… v3, BELIKE, topic "Zodiacs when someone says "one bite"", hook "“Just one bite?” |
// Zodiacs be like:" (~57 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "“Just one bite?” | Zodiacs *be like:*"
//   3.6–49.2   ♈ took one bite of everything · ♉ ordered you your own plate · ♊ took a bite, texted their match
//              · ♋ fed it to you like an airplane · ♌ took one bite, wrote a review · ♍ cut a perfect one-bite cube
//              · ♎ checked the bite's compatibility · ♏ counted the fries, knew it was two · ♐ one bite, booked a cooking
//              trip · ♑ one bite, with terms and conditions · ♒ offered a bite of something unidentified
//              · ♓ gave the bite away, cried about the bite
//  49.2        "Nobody took | *just one.*"
//  52.6        callback: "Scorpio is | *still counting.*"  the fry counter from Scorpio's card comes back, ticking down.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffb34a'
const ST = { x: -170 }
const tag = (x, cx, cy, k, s, bg, rot = -0.04, size = 32) => label(x, cx, cy, s, k, { size, bg, rot, font: MONO, weight: 700 })

const FRIES = ['.Y.Y.Y.Y.', '.YYYYYYY.', 'YYYYYYYYY', 'RRRRRRRRR', 'RRWWRWWRR', '.RRRRRRR.', '.RRRRRRR.', '..RRRRR..']
const FRIES_C = { Y: '#ffd23a', R: '#e23d4e', W: CREAM }
const SPOON = ['.WWW.', 'WWWWW', 'WWWWW', '.WWW.', '..W..', '..W..', '..W..', '..W..', '..W..']
const BLOB = ['...GGGG...', '.GGgGGGGG.', 'GGGGGGgGGG', 'GgGGGGGGGG', 'GGGGGgGGGG', '.GGGGGGGG.', 'PPPPPPPPPP']
const BLOB_C = { G: '#7dffb0', g: '#2fc79a', P: CREAM }
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const FORK = ['W.W.W', 'W.W.W', 'WWWWW', '.WWW.', '..W..', '..W..', '..W..', '..W..', '..W..']

/** a food blob with a bite taken out (bite 0…1) */
function food(x, cx, cy, r, col, bite) {
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 5, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  if (bite > 0) { x.fillStyle = '#140c30'; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(cx + r * 0.75, cy - r * 0.4 + i * r * 0.4, r * 0.32 * bite, 0, Math.PI * 2); x.fill() } }
}
/** a fry counter readout */
function counter(x, cx, cy, k, n, size = 64) {
  card(x, cx, cy, 300, 150, k, { bg: '#140c30', rot: 0.03 }, () => { txt(x, 'FRIES', 0, -40, { size: 26, color: GREY, font: MONO, weight: 700 }); txt(x, String(n), 0, 22, { size, color: '#ff6b5a', font: MONO, weight: 700 }) })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Took one bite. | *Of everything.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: ST, hops: [0.5, 1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 870); x.scale(k, k); x.translate(-790, -870)
        drawBits(x, PLATE, { W: CREAM }, 790, 900, 30)
        ;[[700, 870, ORANGE], [790, 840, '#5fd068'], [880, 870, PINK], [745, 920, GOLD], [835, 920, '#8a4a2e']].forEach(([fx, fy, c], i) => food(x, fx, fy, 38, c, ease.outCubic(prog(lt, 0.5 + i * 0.18, 0.7 + i * 0.18))))
        x.restore() }
      tag(x, 790, 1080, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'ONE BITE (×5)', GOLD, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Ordered you | *your own plate.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FRIES, FRIES_C, 500, 1090, 14 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, FRIES, FRIES_C, 820, 880, 22 * pop01(t, P.t0 + 0.9, 0.35, 2.2))
      tag(x, 820, 680, pop01(t, P.t0 + 1.1, 0.3, 2.2), 'FOR YOU. GO.', MINT, -0.04, 36)
      tag(x, 790, 1100, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'MINE: OFF LIMITS', BONE, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Took one bite. | *Texted their match.*', mood: lt => lt > 1.0 ? 'sparkle' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '✦ YOUR MATCH', headCol: GOLD, size: 24, lines: [['OMG TRY THIS', PINK, pop01(t, P.t0 + 0.5, 0.3, 2)], ['our 2nd date??', MINT, pop01(t, P.t0 + 0.9, 0.3, 2)], ['also our 3rd', SKYB, pop01(t, P.t0 + 1.4, 0.3, 2)]] })
    } },
  { sign: 'cancer', cap: 'Fed it to you. | *Airplane noises.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.3, 1.6))
      const sx = lerp(560, 860, p), sy = 840 - Math.sin(p * Math.PI * 2) * 80
      drawBits(x, SPOON, { W: '#d8dbe8' }, sx, sy, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -1.2 + Math.cos(p * Math.PI * 2) * 0.4 })
      food(x, sx - 52, sy - 14, 24, ORANGE, 0)
      bubble(x, 790, 660, 'vroooom!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      tag(x, 790, 1100, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'YOU: A GROWN ADULT', PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Took one bite. | *Wrote a review.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'A REVIEW BY LEO', 0, -120, { size: 26, font: MONO, weight: 700 })
        txt(x, '★★★★★', 0, -50, { size: 48, color: GOLD })
        txt(x, '“the bite was', 0, 20, { size: 30, weight: 700 }); txt(x, 'good, I was', 0, 64, { size: 30, weight: 700 }); txt(x, 'better.”', 0, 108, { size: 30, weight: 700, color: RED })
      })
      sparkles(x, t, 790, 800, P.t0 + 1.2, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Cut a perfect | *one-bite cube.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 870); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-66, -66, 132, 132); x.fillStyle = '#ffd23a'; x.fillRect(-60, -60, 120, 120); x.fillStyle = '#e8a24a'; x.fillRect(-60, 30, 120, 30)
        x.fillStyle = INK; x.fillRect(-150, 110, 300, 40); x.fillStyle = '#cfeeff'; x.fillRect(-146, 114, 292, 32)
        x.fillStyle = INK; for (let i = 0; i <= 14; i++) x.fillRect(-140 + i * 20, 114, 3, i % 5 ? 12 : 22)
        x.restore() }
      tag(x, 790, 680, pop01(t, P.t0 + 1.0, 0.3, 2.2), 'EXACTLY 2 CM', MINT, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Checked the bite’s | *compatibility first.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 790, 110, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      drawBits(x, FORK, { W: '#d8dbe8' }, 790 + Math.sin(t * 5) * 60 * (lt < 1.3 ? 1 : 0), 960, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      tag(x, 790, 1110, pop01(t, P.t0 + 1.4, 0.3, 2.4), 'BITE: A MATCH', PINK, 0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Counted the fries. | *Knew it was two.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = lt < 1.0 ? 41 : 39
      counter(x, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2), n)
      drawBits(x, FRIES, FRIES_C, 790, 980, 18 * pop01(t, P.t0 + 0.3, 0.35, 2))
      tag(x, 790, 1130, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'SUSPECTS: EVERYONE', LAV, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'One bite later: | *a cooking trip abroad.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(320, 870); x.scale(k, k); x.fillStyle = INK; x.fillRect(-120, -90, 240, 180); x.fillStyle = ORANGE; x.fillRect(-112, -82, 224, 164); x.fillStyle = INK; x.fillRect(-40, -120, 80, 36); x.fillStyle = CREAM; x.fillRect(-90, -20, 180, 40); txt(x, 'CHEF CAMP', 0, 2, { size: 26, font: MONO, weight: 700 }); x.restore() }
      tag(x, 320, 680, pop01(t, P.t0 + 0.9, 0.3, 2.2), 'FLIGHT: TONIGHT', GOLD, -0.05, 32)
      tag(x, 320, 1080, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'THE BITE: ABANDONED', BONE, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'One bite. | *Terms and conditions apply.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const u = ease.outCubic(prog(lt, 0.3, 1.5))
      card(x, 790, 640 + 230 * u, 300, 60 + 460 * u, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.02 }, () => {
        const h = 60 + 460 * u
        txt(x, 'BITE AGREEMENT', 0, -h / 2 + 30, { size: 24, font: MONO, weight: 700 })
        for (let i = 0; i < 12; i++) { const y = -h / 2 + 70 + i * 34; if (y < h / 2 - 20) { x.fillStyle = '#c9c0ae'; x.fillRect(-120, y, 240 - (i % 3) * 40, 10) } }
      })
      tag(x, 790, 1130, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'SIGN HERE: ____', GOLD, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Offered a bite | *of something unknown.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BLOB, BLOB_C, 790, 880 + 6 * Math.sin(t * 5), 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { sy: 1 + 0.06 * Math.sin(t * 6) })
      bubble(x, 790, 680, 'it’s fusion!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      tag(x, 790, 1080, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'FUSION OF: ???', BONE, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Gave the bite away. | *Cried about it.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const give = ease.inOutCubic(prog(lt, 0.4, 1.0))
      drawBits(x, PLATE, { W: CREAM }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      food(x, lerp(790, 900, give), lerp(930, 840, give), 40, PINK, 0)
      tag(x, 790, 700, pop01(t, P.t0 + 1.2, 0.3, 2.2), 'MISSING IT ALREADY', SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0270', key: 'F', accent: ACC, ending: 'callback',
  title: '“Just one bite?” | Zodiacs *be like:*',
  cameos: CAMEOS,
  group: { cap: 'Nobody took | *just one.*' },
  last: {
    text: 'Scorpio is | *still counting.*',
    draw(x, t, lt) {
      const n = 39 - Math.min(3, Math.floor(Math.max(0, lt - 1.4) / 0.6))
      counter(x, 540, 1060, pop01(t, t - lt + 0.5, 0.4, 2), n, 84)
      const s = pop01(t, t - lt + 0.9, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'scorpio', 540, 1300, 200 * s, { mood: 'squint', look: [0, -1], seed: 51 })
      label(x, 540, 870, 'FRIES REMAINING', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
