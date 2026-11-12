// r2t0753: star_talk, SOLO, "Your Taurus roommate | *be like.*" (~45 s vertical, signs3kit social cut, music: lofi · G).
// One sign the whole way: nine roommate moments, each the most extreme (and cosiest) Taurus version.
//   labelled every snack, even the ice · thermostat moved one degree, felt it · bought a candle, now owns forty
//   · you borrowed their mug, missing posters went up · grocery run, came back with plant number four · movie night,
//   same movie, 30th time · dishes soaking since Tuesday · quiet hours start at 8pm · bad day? fed you until fixed
//  37.8  "Cozy. Stubborn. | *Best roommate.*"   41.2  callback: "The mug is back. | *Party time.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, fitTitleScenes, sheet, bits, swapLabel, confetti, steam, POT, POT_C, SPROUT, SPROUT_C, FLOWER, FLOWER_C, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'taurus', ACC = '#ffd23a', ST = { x: -170 }

// a pixel ice cube with a tiny name tag
function ice(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.08); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-78, -78, 156, 156); x.fillStyle = '#bfe6ff'; x.fillRect(-70, -70, 140, 140)
  x.fillStyle = '#ffffff'; x.fillRect(-56, -56, 40, 18); x.fillRect(-56, -56, 18, 40)
  x.restore()
}
// a thermostat dial
function thermo(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(10, 14, 130, 0, 7); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, 7); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 118, 0, 7); x.fill()
  x.fillStyle = INK; x.font = `800 72px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(lt > 0.9 ? '21°' : '22°', 0, 6)
  x.restore()
}
// a candle with a flickering flame
function candle(x, t, cx, cy, s, k, i) {
  if (k <= 0.01) return
  bits(x, 'CANDLE', cx, cy, s * k)
  x.save(); x.globalAlpha = 0.35 + 0.15 * Math.sin(t * 9 + i); x.fillStyle = '#ffe7a8'; x.beginPath(); x.arc(cx, cy - s * 3.2, s * 2.2 * k, 0, 7); x.fill(); x.restore()
}
// a missing poster with a mug on it
function poster(x, cx, cy, k, rot = -0.05) {
  if (k <= 0.01) return
  sheet(x, cx, cy, k, { w: 260, h: 330, rot, head: 'MISSING', headBg: RED, lines: [], size: 26 })
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  drawBits(x, ['.WWWWWW...', 'WBBBBBBW..', 'WBBBBBBWWW', 'WBBBBBBW.W', 'WBBBBBBW.W', 'WBBBBBBWWW', 'WBBBBBBW..', '.WWWWWW...'], { W: BONE, B: '#c06a3a' }, 0, 20, 14)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MY MUG. CALL ME.', 0, 130)
  x.restore()
}
// a little TV with a heart on screen
function tv(x, cx, cy, k) {
  if (k <= 0.01) return
  bits(x, 'TV', cx, cy, 22 * k)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, cx, cy - 34 * k, 9 * k, { outline: null })
}

const CAMEOS = [
  { sign: S, cap: 'Labelled every snack. | *Even the ice.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ice(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1020, 'TAURUS’S ♉︎', pop01(t, P.t0 + 0.9, 0.3, 2.4), ACC, 0.06, 34)
      L(x, 800, 650, 'HANDS OFF', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 38)
    } },
  { sign: S, cap: 'Heat dropped one degree. | *Taurus felt it.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      thermo(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 800, 640, 'WHO DID THIS.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: '#ffb0a0', tail: 'bl' })
      L(x, 800, 1090, 'FROM 3 ROOMS AWAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, -0.04, 28)
    } },
  { sign: S, cap: 'Bought one candle. | *Now owns forty.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.2) * 8)
      for (let i = 0; i < n; i++) candle(x, t, 670 + (i % 4) * 88, 1060 - Math.floor(i / 4) * 170, 14, 1, i)
      L(x, 800, 660, `CANDLE COUNT: ${n < 9 ? n : 40}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'You borrowed their mug. | *Posters went up.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      poster(x, 740, 860, pop01(t, P.t0 + 0.4, 0.35, 2), -0.08)
      poster(x, 880, 880, pop01(t, P.t0 + 1.0, 0.35, 2), 0.07)
      L(x, 800, 1120, 'REWARD: COOKIES', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Went for milk. | *Came back with plant #4.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), cx = 670 + i * 88, cy = 1060
        drawBits(x, POT, POT_C, cx, cy, 13 * k)
        drawBits(x, i === 3 ? FLOWER : SPROUT, i === 3 ? FLOWER_C : SPROUT_C, cx, cy - (i === 3 ? 110 : 66) * k, (i === 3 ? 14 : 13) * k)
      }
      L(x, 800, 680, 'MILK: FORGOT', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, 0.04, 32)
    } },
  { sign: S, cap: 'Movie night. | *Same movie. 30th time.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      tv(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.3) * 29)
      L(x, 800, 660, `WATCH #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, -0.05, 40)
      bubble(x, 800, 1090, 'it’s a classic', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'The dishes? | *Soaking. Since Tuesday.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DISH', 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      x.save(); x.globalAlpha = 0.8; x.fillStyle = SKYB; for (let i = 0; i < 5; i++) { const ph = ((t * 0.7 + i / 5) % 1); x.beginPath(); x.arc(700 + i * 50, 860 - ph * 120, 10 + 6 * ph, 0, 7); x.fill() } x.restore()
      L(x, 800, 680, 'SOAK: DAY 6', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, 0.04, 36)
      bubble(x, 800, 1100, 'it’s a process', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Quiet hours? | *Start at 8pm sharp.*', mood: lt => lt > 1.0 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1010, 'SHH. IT’S 8:01.', pop01(t, P.t0 + 0.9, 0.3, 2.4), LAV, -0.04, 36)
    } },
  { sign: S, cap: 'You had a bad day? | *Fed you until fixed.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BOWL', 800, 1040 - i * 70, 12 * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2))
      steam(x, t, 800, 840, { n: 3 })
      L(x, 800, 660, 'SECONDS? THIRDS.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0753', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Your Taurus roommate | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Cozy. Stubborn. | *Best roommate.*', mood: 'sparkle' },
  last: {
    text: 'The mug is back. | *Party time.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.6, 0.35, 2)
      signChar(x, t, S, 420, 1020, 300 * k, { mood: 'heart', seed: 9, hops: [t0 + 1.2, t0 + 2.2] })
      bits(x, 'MUG', 720, 1000, 18 * pop01(t, t0 + 0.9, 0.35, 2))
      L(x, 720, 1180, 'WELCOME HOME ♡', pop01(t, t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 36)
      confetti(x, t, 560, 900, t0 + 1.2, { n: 26, spread: 380 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
