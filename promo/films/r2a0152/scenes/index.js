// r2a0152: star_advice ADVICE SOLO, "How to thank | a Leo." (~46 s vertical, signs3kit social cut, music: lofi · F). Ending: 'callback'.
//   0.0–3.6    "How to thank | *a Leo.*"
//   3.6–37.8   nine warm how-tos: thank them out loud · be specific, name the moment · they hosted again, notice the effort
//              · they hype you up, hype them back · acting unbothered? thank them anyway (a sticky note)
//              · big on birthdays, celebrate theirs loudly · words matter, write it down · they carry the group, say you see it
//              · give them a trophy, even a tiny one
//  37.8        "Thanked. | *Glowing for a week.*"
//  41.2        callback: "Leo framed | *the sticky note.*"  card five's sticky note, now framed and lit.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF } from '../../signs3kit.js'
import { txt, card, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE } from './props.js'

const S = 'leo', ST = { x: -170 }, ACC = '#ffb34a'
const MEGA = ['.........KK', '.......KKRK', '.....KKRRRK', 'KKKKKRRRRRK', 'KWWKRRRRRRK', 'KWWKRRRRRRK', 'KKKKKRRRRRK', '...K.KKRRRK', '...K...KKRK', '...K.....KK']
const MEGA_C = { K: INK, R: RED, W: CREAM }
const POM = ['.P.P.P.', 'PPPPPPP', '.PPPPP.', 'PPPPPPP', '.P.P.P.', '...K...', '...K...', '...K...']
const CAKE = ['....Y....', '....R....', '....W....', '.PPPPPPP.', 'PWPWPWPWP', 'CCCCCCCCC', 'CCCCCCCCC', 'PPPPPPPPP', 'CCCCCCCCC', 'CCCCCCCCC']
const CAKE_C = { Y: GOLD, R: ORANGE, W: CREAM, P: PINK, C: '#ffe7a8' }
const TROPHY = ['GGGGG', 'GGGGG', '.GGG.', '..G..', '.KKK.']
const BUNDLE = ['.....', 'SS.SS', 'SSSSS', '.SSS.', 'S...S']

/** the yellow sticky note */
function sticky(x, cx, cy, k, rot = -0.08, s = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-56, -50, 120, 112)
  x.fillStyle = '#ffe66b'; x.fillRect(-60, -56, 120, 112)
  x.fillStyle = '#f2d24a'; x.fillRect(-60, -56, 120, 18)
  txt(x, 'THANK', 0, -4, { size: 28, color: INK }); txt(x, 'U :)', 0, 30, { size: 28, color: INK })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Thank them out loud. | *They live for it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MEGA, MEGA_C, 780, 980, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.15 })
      bubble(x, 790, 680, 'THANK YOU, | LEO!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 48, col: GOLD, tail: 'bc' })
      sparkles(x, t, 370, 840, P.t0 + 1.3 * 1.29, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Be specific. | *Name the moment.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 760, 'your toast at | the party? | iconic.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: CREAM, tail: 'bl' })
      label(x, 790, 1060, 'REPLAYED: ALL WEEK', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They hosted again. | *Notice the effort.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 1000, 340, 90, k, { bg: '#ffe7a8', rot: 0 }, () => { for (let i = 0; i < 4; i++) { x.fillStyle = [PINK, MINT, SKYB, LAV][i]; x.fillRect(-140 + i * 72, -70, 50, 40) } })
      for (let i = 0; i < 14; i++) { const ph = ((t * 0.5 + i / 14) % 1); x.fillStyle = [PINK, GOLD, MINT, SKYB][i % 4]; x.fillRect(640 + (i * 53) % 320, 560 + ph * 360, 14, 8) }
      label(x, 790, 700, 'HOST OF THE YEAR', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'it was | nothing.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, col: CREAM, tail: 'bl' })
    } },
  { sign: S, cap: 'They hype you up. | *Hype them back.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, POM, { P: PINK, K: INK }, 700, 880 + Math.sin(t * 9) * 20, 18 * k)
      drawBits(x, POM, { P: GOLD, K: INK }, 880, 880 - Math.sin(t * 9) * 20, 18 * k)
      label(x, 790, 1120, 'BIGGEST FAN: YOU', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Acting unbothered? | *Thank them anyway.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const f = ease.outCubic(prog(lt, 0.5, 0.9))
      if (f > 0) sticky(x, lerp(900, F.x + 10, f), lerp(560, F.top + 30, f), 1, lerp(0.6, -0.1, f), 0.9)
      label(x, 790, 760, 'TOTALLY CHILL', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 34, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, '(screaming | inside)', pop01(t, P.t0 + 1.5 * 1.29, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Big on birthdays? | *Celebrate theirs loudly.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 960, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 640, 'LEO SEASON', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.2 * 1.29, 7, 140, 0.2)
    } },
  { sign: S, cap: 'Words matter to them. | *Write it down.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 840, 320, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'dear leo,', -130, -140, { size: 40, font: SERIF, weight: 600, align: 'left', color: '#6b3a24' })
        x.fillStyle = GREY; for (let i = 0; i < 5; i++) x.fillRect(-130, -80 + i * 40, i % 2 ? 210 : 250, 9)
        txt(x, '♥', 100, 140, { size: 50, color: RED })
      })
      label(x, 790, 1110, 'READ IT 9 TIMES', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They carry the group. | *Say you see it.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, -1], star: { x: -170, y: 40 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const C = [PINK, MINT, SKYB, LAV, GREEN]
      C.forEach((c, i) => drawBits(x, BUNDLE, { S: c }, F.x - 100 + i * 50, F.top - 40 - (i % 2) * 34 + Math.sin(t * 4 + i) * 4, 9 * k))
      label(x, 790, 880, 'WE SEE YOU', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Give them a trophy. | *Even a tiny one.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.2, 1.7],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { G: GOLD, K: INK }, 790, 900, 10 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1000, 'WORLD’S BEST', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 680, 'MY SPEECH—', pop01(t, P.t0 + 1.3 * 1.29, 0.25, 2.2), { size: 46, col: GOLD, tail: 'bl' })
      if (lt > 1.2) hearts(x, t, 370, 820, P.t0 + 1.2 * 1.29, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0152', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'How to thank | *a Leo.*',
  cameos: CAMEOS,
  group: { cap: 'Thanked. | *Glowing for a week.*', mood: 'sparkle' },
  last: {
    text: 'Leo framed | *the sticky note.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = 0.3 * clamp((lt - 0.6) / 0.4); x.fillStyle = '#fff1b0'
        x.beginPath(); x.moveTo(640, 560); x.lineTo(720, 560); x.lineTo(860, 1260); x.lineTo(500, 1260); x.closePath(); x.fill(); x.restore()
        card(x, 680, 1050, 300, 300, k, { bg: GOLD, rot: 0 }, () => { x.fillStyle = '#b8862a'; x.fillRect(-130, -130, 260, 260); x.fillStyle = DEEP; x.fillRect(-116, -116, 232, 232) })
        sticky(x, 680, 1050, k, -0.04, 1.4)
      }
      const s = pop01(t, t - lt + 0.8, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, S, 260, 1160, 210 * s, { mood: 'heart', look: [1, 0], seed: 47, hops: [t - lt + 1.8] })
      sparkles(x, t, 680, 1050, t - lt + 1.1, 7, 200, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
