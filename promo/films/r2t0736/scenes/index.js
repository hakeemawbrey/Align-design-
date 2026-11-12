// r2t0736: star_talk, ROLLCALL, "The signs | making dumplings." (signs3kit social cut, lofi · C). Ending: callback.
//   ♈ ate it before it was cooked · ♉ taste-tested the filling, all of it · ♊ every dumpling a different shape
//   · ♋ made enough for the whole street · ♌ pleated their initials into every one · ♍ exactly eighteen pleats, measured
//   · ♎ arranged them, too pretty to eat · ♏ secret filling, you'll never know · ♐ fusion: filled with spaghetti
//   · ♑ made three, opened a franchise · ♒ invented the blue dumpling · ♓ named every dumpling, can't eat them (sobbing)
//   group "Nobody followed | the recipe."  callback: "Aries ate Gerald." (Pisces' named dumpling meets Aries' appetite)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, bits, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }

function tag(x, cx, cy, text, k, rot = 0) { L(x, cx, cy, text, k, CREAM, rot, 30) }

const CAMEOS = [
  { sign: 'aries', cap: 'Ate it before | it was *cooked.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', star: ST, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, lt > 1.0 ? 'DUMPBIT' : 'DUMP', 800, 900, 24 * k, { rot: 0.05 })
      L(x, 800, 700, 'STEAM TIME: 0 SEC', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, -0.04, 30)
      bubble(x, 800, 1090, 'chewy!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Taste-tested the filling. | *All of it.*', mood: lt => lt > 1.5 ? 'sleepy' : 'heart', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BOWL', 800, 920, 22 * k, {})
      L(x, 800, 700, 'FILLING LEFT: 0', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.04, 32)
      bubble(x, 800, 1110, 'just checking', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Every dumpling | a *different shape.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const S = ['DUMP', 'STARD', 'HEARTD', 'FISHD']
      S.forEach((s, i) => bits(x, s, 720 + (i % 2) * 170, 810 + Math.floor(i / 2) * 170, 14 * pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), { rot: (i % 2 ? 0.08 : -0.06) }))
      L(x, 800, 1100, 'NO TWO ALIKE', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Made enough | for *the whole street.*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 6; i++) bits(x, 'DUMP', 690 + (i % 3) * 110, 990 - Math.floor(i / 3) * 70, 9 * pop01(t, P.t0 + 0.3 + i * 0.12, 0.3, 2))
      steam(x, t, 800, 890, { n: 3, alpha: 0.7 * k })
      L(x, 800, 690, 'SERVES: 300', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 36)
      bubble(x, 800, 1130, 'eat, eat, eat!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Pleated their initials | into *every one.*', mood: 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'DUMP', 800, 900, 24 * k, { rot: -0.04 })
      if (k > 0.8) { x.save(); x.fillStyle = '#c98f2a'; x.font = `800 76px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('L', 800, 920); x.restore() }
      L(x, 800, 700, 'SIGNED: LEO', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#ffb34a', 0.05, 34)
      sparkles(x, t, 800, 900, P.t0 + 1.1, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Exactly eighteen pleats. | *Measured.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DUMP', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const r = ease.outCubic(prog(lt, 0.5, 0.9))
      bits(x, 'RULER', 800, lerp(1150, 990, r), 12 * clamp(r * 3))
      L(x, 800, 690, 'PLEATS: 18 OF 18', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Arranged them. | Too *pretty to eat.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.15, 0.3, 2) > 0.1 ? 1 : 0
      x.fillStyle = INK; x.beginPath(); x.ellipse(800, 900, 190, 150, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.ellipse(800, 900, 180, 140, 0, 0, Math.PI * 2); x.fill(); x.restore()
      const HP = [[0, -40], [-60, -80], [60, -80], [-100, -20], [100, -20], [-60, 40], [60, 40], [0, 90]]
      HP.forEach(([dx, dy], i) => bits(x, 'DUMP', 800 + dx, 890 + dy, 6 * pop01(t, P.t0 + 0.3 + i * 0.1, 0.3, 2)))
      L(x, 800, 680, 'DO NOT TOUCH', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Secret filling. | You\'ll *never know.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DUMP', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 900, 'TOP SECRET', pop01(t, P.t0 + 0.7, 0.3, 2.4), RED, -0.12, 36)
      bubble(x, 800, 680, 'classified.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Fusion dumpling. | Filled with *spaghetti.*', mood: 'sparkle', star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.5) {
        x.save(); x.strokeStyle = '#ffe27a'; x.lineWidth = 13; x.lineCap = 'round'
        for (let i = 0; i < 5; i++) { const dl = 110 + 60 * Math.min(1, lt) + i * 18; x.beginPath(); x.moveTo(740 + i * 30, 940); for (let s = 1; s <= 8; s++) x.lineTo(740 + i * 30 + Math.sin(s * 1.3 + t * 3 + i) * 12, 940 + s * dl / 8); x.stroke() }
        x.restore()
      }
      bits(x, 'DUMP', 800, 880, 24 * k)
      L(x, 800, 690, 'IT WORKS??', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#ff9a4a', 0.05, 38)
    } },
  { sign: 'capricorn', cap: 'Made three. | Opened *a franchise.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bits(x, 'STALL', 320, 900, 20 * k)
      if (k > 0.8) { x.save(); x.fillStyle = INK; x.font = `800 30px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DUMPLINGS', 320, 962); x.restore() }
    },
    front(x, t, lt, P) {
      L(x, 320, 680, 'LOCATION #2: SOON', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.05, 28)
      L(x, 320, 1150, 'NOW HIRING', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Invented | the *blue dumpling.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BLUED', 800, 900, 24 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: Math.sin(t * 2) * 0.05 })
      L(x, 800, 700, 'PATENT PENDING', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 32)
      sparkles(x, t, 800, 900, P.t0 + 0.6, 6, 170, 0.6, [SKYB, BONE, MINT])
      bubble(x, 800, 1100, 'tastes blue', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Named every dumpling. | Can\'t *eat them.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const N = ['GERALD', 'SUE', 'BOB']
      N.forEach((n, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), cy = 720 + i * 170
        bits(x, 'DUMP', 740, cy, 12 * k)
        tag(x, 890, cy + 10, n, pop01(t, P.t0 + 0.5 + i * 0.3, 0.3, 2.2), i % 2 ? 0.05 : -0.05)
      })
      bubble(x, 790, 1150, 'not gerald!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0736', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs | make *dumplings.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody followed | *the recipe.*' },
  last: {
    text: 'Aries ate *Gerald.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      bits(x, lt > 1.4 ? 'DUMPBIT' : 'DUMP', 540, 980, 42 * k)
      L(x, 540, 1200, 'GERALD (MOSTLY)', pop01(t, t - lt + 1.6, 0.3, 2.2), CREAM, -0.04, 44)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
