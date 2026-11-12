// r2t0405: THE SIGNS AS… v3, BELIKE, "Sad movie night. | Zodiacs be like." (topic: zodiacs watching a sad movie; ~54 s
// vertical, signs3kit social cut, music: lofi · F). The format look lives in ../../signs3kit.js. Ending: group.
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ yelled at the screen · ♉ cried into the popcorn · ♊ on the phone, "wait, who died?" · ♋ cried at the
//              opening credits · ♌ cried beautifully, on purpose · ♍ found the plot hole · ♎ cried for the villain too
//              · ♏ not crying, eyes are sweating · ♐ slept, woke up for the credits · ♑ allowed one tear
//              · ♒ only cried for the dog · ♓ flooded the living room
//  49.2        GROUP (the ending): "Same movie. | *Twelve puddles.*"  THE END card, the photo stands in a puddle.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', PAPER = '#fff4e2', BLUE = '#6fa8ff'

const POPCORN = [
  '.W.WW.W.WW.',
  'WWWWWWWWWWW',
  'WYWWWYWWWYW',
  'RRWRRWRRWRR',
  'RRWRRWRRWRR',
  '.RWRRWRRWR.',
  '.RWRRWRRWR.',
  '..RRWRRWR..',
]
const POPCORN_C = { W: '#fff6dc', Y: '#ffd23a', R: RED }
const DOG = [
  'BB.....BB',
  'BBBBBBBBB',
  '.BKBBBKB.',
  '.BBBBBBB.',
  '..BBNBB..',
  '.BBBBBBB.',
  'BBBBBBBBB',
  'B.B...B.B',
]
const DOG_C = { B: '#c98f5a', K: INK, N: INK }
const PHONE = [
  'KKKKKK',
  'KSSSSK',
  'KSSSSK',
  'KSSSSK',
  'KSSSSK',
  'KKKKKK',
]

// a little cinema screen with a blue sad glow
function screen(x, t, cx, cy, k, txt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-166, -106, 332, 192)
  x.fillStyle = '#3a3360'; x.fillRect(-158, -98, 316, 176)
  x.fillStyle = '#26407a'; x.fillRect(-146, -86, 292, 152)
  x.fillStyle = 'rgba(143,227,255,0.18)'; for (let i = 0; i < 6; i++) x.fillRect(-146, -86 + ((t * 40 + i * 26) % 152), 292, 3)
  if (txt) { x.fillStyle = '#fff'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, -10) }
  x.restore()
}
// rising water across the bottom of the panel
function flood(x, t, level) {
  if (level <= 0.01) return
  const top = lerp(1230, 900, level)
  x.save(); x.beginPath(); x.rect(110, 480, 860, 750); x.clip()
  x.fillStyle = 'rgba(111,168,255,0.55)'
  x.beginPath(); x.moveTo(110, 1240)
  for (let i = 0; i <= 43; i++) { const px = 110 + i * 20; x.lineTo(px, top + Math.sin(i * 0.7 + t * 4) * 10) }
  x.lineTo(970, 1240); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.55)'; for (let i = 0; i < 8; i++) x.fillRect(150 + i * 100 + Math.sin(t * 2 + i) * 20, top + 26, 40, 6)
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Aries yelled | *at the screen.*', mood: 'wide', look: [1, 0], star: STAR, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      screen(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), '“goodbye…”')
      bubble(x, 760, 1080, 'JUST SAY IT!!', pop01(t, P.t0 + 0.8, 0.25, 2.2) * (1 + 0.04 * Math.sin(lt * 30)), { size: 44, col: '#ffd0c8', tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Taurus cried | *into the popcorn.*', mood: 'neutral', look: [1, 1], star: STAR, tears: lt => lt > 0.8 ? 2 : 1,
    front(x, t, lt, P) {
      drawBits(x, POPCORN, POPCORN_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'EXTRA SALTY NOW', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Gemini was scrolling. | *“Wait, who died?”*', mood: 'wide', look: [1, 0], star: STAR,
    front(x, t, lt, P, F) {
      drawBits(x, PHONE, { K: INK, S: '#8fe3ff' }, F.x + 130, F.cy + 30, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      bubble(x, 760, 700, 'wait, who | died??', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 1080, 'MISSED: ALL OF IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Cancer cried | at the *opening credits.*', mood: 'heart', look: [1, 0], star: STAR, tears: 3,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      screen(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'A FILM')
      label(x, 790, 1060, 'RUNTIME: 0:00:04', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Leo cried | *beautifully.* On purpose.', mood: 'sparkle', look: [-1, -1], star: STAR, tears: 1, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 820, '★ BEST CRY ★', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.04 })
      bubble(x, 790, 1020, 'did you see | my angle?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 400, 820, P.t0 + 0.9, 8, 190, 0.6)
    } },
  { sign: 'virgo', cap: 'Virgo found | *the plot hole.*', mood: 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      screen(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), '')
      bubble(x, 760, 1030, 'that door | was LOCKED', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 820, 640, 'PLOT HOLE #3', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: RED, color: PAPER, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Libra cried | *for the villain too.*', mood: 'heart', look: [1, 0], star: STAR, tears: 2,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 800, 930, 200 * k, { mood: 'squint', look: [-1, 0], seed: 35, glyph: false })
      label(x, 800, 690, 'HE HAD REASONS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04 })
      hearts(x, t, 600, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 7 })
    } },
  { sign: 'scorpio', cap: 'Scorpio isn’t crying. | *Eyes are sweating.*', mood: 'squint', look: [1, 0], star: STAR, tears: 1,
    front(x, t, lt, P) {
      label(x, 790, 760, 'TOTALLY FINE.', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 42, bg: BONE, rot: -0.04 })
      label(x, 800, 900, '(IT’S HOT IN HERE)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Sagittarius slept. | Woke up *for the credits.*', mood: lt => lt > 1.4 ? 'wide' : 'sleepy', look: [1, 0], star: STAR, hops: [1.4],
    front(x, t, lt, P) {
      screen(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'THE END')
      if (lt > 1.4) bubble(x, 760, 1060, 'what’d i miss?', pop01(t, P.t0 + 1.45, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Capricorn allowed | *one tear.*', mood: 'neutral', look: [1, 0], star: STAR, tears: lt => lt > 0.8 && lt < 1.8 ? 1 : 0,
    front(x, t, lt, P) {
      label(x, 790, 760, 'TEARS: 1 / 1', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'BUDGET MET', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Aquarius only cried | *for the dog.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: STAR, tears: lt => lt > 1.0 ? 3 : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 790, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'HUMANS: FINE', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 790, 'DOG: DEVASTATING', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Pisces flooded | *the living room.*', mood: 'wide', look: [1, 0], star: STAR, tears: 3, hops: [1.6],
    back(x, t, lt, P) { flood(x, t, ease.inOutCubic(prog(lt, 0.3, 2.2))) },
    front(x, t, lt, P) {
      label(x, 740, 680, 'WATER LEVEL: RISING', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: BLUE, color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0405', key: 'F', accent: BLUE, ending: 'group',
  title: 'Sad movie night. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Same movie. | *Twelve puddles.*',
    moods: ['wide', 'neutral', 'wide', 'heart', 'sparkle', 'squint', 'heart', 'squint', 'sleepy', 'neutral', 'heart', 'wide'],
    draw(x, t, lt) {
      label(x, 540, 760, 'THE END', pop01(t, t - lt + 1.2, 0.35, 2.2), { size: 64, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      const lv = ease.outCubic(clamp((lt - 1.4) / 1.6))
      if (lv > 0.01) { x.save(); x.globalAlpha = 0.5 * lv; x.fillStyle = BLUE; x.beginPath(); x.ellipse(540, 1400, 480 * lv, 44 * lv, 0, 0, Math.PI * 2); x.fill(); x.restore() }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
