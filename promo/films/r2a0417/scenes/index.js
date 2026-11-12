// r2a0417: star_advice, ADVICE SOLO (leo), "What Leos need | on a bad day." (signs3kit social cut, music: lofi · F). Ending: callback.
// Nine bad-day truths for a Leo, each with a warm reframe and one light gag.
//   0.0–3.6    "What Leos need | *on a bad day.*"  One big Leo pops in.
//   3.6–37.8   nine cards: brightness at 20%, still loved · ask for a fuss · we noticed you (standing ovation)
//              · the crown on its cushion, on a break · a 47-second hype voice note · the mirror pep talk, outsourced
//              · plans cancelled, the couch era · a tired heart with a plaster · tomorrow: recharged
//  37.8        "Still a star. | *Even off duty.*"
//  41.2        callback: "The crown waited. | *Take your time.*"  The crown, still on its cushion, and Leo beside it.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', ACC = '#ffc24a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -170 }
const S = 'leo'

// ── props
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const CUSHION = ['.PPPPPPPPPPPP.', 'PPPPPPPPPPPPPP', 'PPPPPPPPPPPPPP', 'PPPPPPPPPPPPPP', '.PPPPPPPPPPPP.', 'Y............Y']
const SOFA = ['RR..........RR', 'RRRRRRRRRRRRRR', 'RrrrrrrrrrrrrR', 'RRRRRRRRRRRRRR', 'RRRRRRRRRRRRRR', '.K..........K.']
const BLANKET = ['BBBBBBBBBB', 'BWBBWBBWBB', 'BBBBBBBBBB', 'BBWBBWBBWB', 'BBBBBBBBBB']
const HEART_BIG = ['.HH...HH.', 'HHHH.HHHH', 'HHHHHHHHH', 'HHHHHHHHH', '.HHHHHHH.', '..HHHHH..', '...HHH...', '....H....']
const SUN = ['..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', 'YYYYYYYYY', 'OOOOOOOOO']

/** a dimmer dial: a knob with a gauge that turns down */
function dimmer(x, cx, cy, k, v) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -150, 220, 300); x.fillStyle = CREAM; x.fillRect(-100, -140, 200, 280)
  x.fillStyle = '#d9cfbf'; x.beginPath(); x.arc(0, -10, 70, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 54, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#9aa5c4'; x.beginPath(); x.arc(0, -10, 46, 0, Math.PI * 2); x.fill()
  const a = lerp(-0.75, 0.75, v) * Math.PI
  x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, -10); x.lineTo(Math.sin(a) * 40, -10 - Math.cos(a) * 40); x.stroke()
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${Math.round(v * 100)}%`, 0, 100)
  x.restore()
}
/** a phone showing a voice note with a waveform and a long time */
function voiceNote(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = MINT; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BESTIE', 0, -132)
  x.fillStyle = ACC; x.fillRect(-96, -60, 192, 90)
  x.fillStyle = INK; for (let i = 0; i < 16; i++) { const h = 10 + 26 * Math.abs(Math.sin(i * 1.7 + (lt > 0.6 ? t * 6 : 0))); x.fillRect(-80 + i * 10, -15 - h / 2, 6, h) }
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.fillText('0:47 ▶', 0, 70)
  x.fillStyle = PINK; x.font = `800 26px ${INTER}`; x.fillText('“you’re amazing”', 0, 124)
  x.restore()
}
/** a hand mirror with a tiny Leo inside */
function mirror(x, t, cx, cy, k, mood) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-16, 110, 32, 150); x.fillStyle = '#c98f2a'; x.fillRect(-10, 114, 20, 140)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 150, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 120, 140, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#bfe7ff'; x.beginPath(); x.ellipse(0, 0, 100, 120, 0, 0, Math.PI * 2); x.fill()
  x.restore()
  if (k > 0.6) signChar(x, t, 'leo', cx, cy + 10, 150 * k, { mood, seed: 31, glyph: false, glow: 0.4 })
}

const CAMEOS = [
  { sign: S, cap: 'Bad day? | You *don’t have to shine.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const v = lerp(1, 0.2, ease.inOutCubic(prog(lt, 0.5, 1.4)))
      dimmer(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), v)
      L(x, 790, 1100, 'STILL LOVED: 100%', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Want a fuss? | *Ask for one.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 440, 600, 'can i get | a fuss?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 940, 170 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      drawBits(x, BLANKET, { B: PINK, W: CREAM }, 770, 760, 15 * pop01(t, P.t0 + 1.1, 0.3, 2), { rot: -0.1 })
      L(x, 790, 1120, 'FUSS: INCOMING', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Felt unseen today? | *We noticed you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const IDS = ['aries', 'gemini', 'libra', 'aquarius']
      IDS.forEach((id, i) => { const k = pop01(t, P.t0 + 0.4 + i * 0.18, 0.3, 2); if (k > 0.01) signChar(x, t, id, 650 + i * 95, 1050, 100 * k, { mood: 'sparkle', seed: 40 + i, glyph: false, hops: [P.t0 + 1.0 + i * 0.1, P.t0 + 1.7 + i * 0.1] }) })
      L(x, 790, 760, 'STANDING OVATION', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 790, 900, P.t0 + 1.3, 8, 190, 0.6)
    } },
  { sign: S, cap: 'Crown feeling heavy? | *Set it down.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const drop = ease.inOutCubic(prog(lt, 0.4, 1.1))
      drawBits(x, CUSHION, { P: '#b44ad6', Y: GOLD }, 800, 1040, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, CROWN, CROWN_C, lerp(F.x + 4, 800, drop), lerp(F.top - 34, 990, drop) - Math.sin(Math.PI * drop) * 120, 13)
      L(x, 790, 720, 'CROWN: ON BREAK', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'Need a hype speech? | *Here’s yours.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      voiceNote(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 5, life: 1.5, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Mirror pep talk failed? | *Let us try.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mirror(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.3 ? 'sparkle' : 'squint')
      bubble(x, 790, 1120, 'you’re iconic', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Plans cancelled? | *Couch is a stage.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: 0, y: -10, s: 240 },
    back(x, t, lt, P) { drawBits(x, SOFA, { R: '#d0473f', r: '#f07c6e', K: INK }, 540, 1000, 34 * pop01(t, P.t0 + 0.1, 0.35, 1.8)) },
    front(x, t, lt, P) {
      L(x, 540, 640, 'COUCH ERA', pop01(t, P.t0 + 1.0, 0.3, 2.4), ORANGE, -0.05, 44)
      sparkles(x, t, 540, 860, P.t0 + 1.0, 7, 200, 0.4)
    } },
  { sign: S, cap: 'Big heart, tired heart? | *Both welcome here.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, HEART_BIG, { H: '#ff4f86' }, 790, 860, 26 * k, { rot: 0.04 * Math.sin(t * 2) })
      if (lt > 1.0) { x.save(); x.translate(790, 860); x.rotate(-0.6); x.scale(pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.4), 1); x.fillStyle = INK; x.fillRect(-90, -26, 180, 52); x.fillStyle = '#f3d3a8'; x.fillRect(-84, -20, 168, 40); x.fillStyle = '#e0b886'; x.fillRect(-24, -20, 48, 40); x.restore() }
      L(x, 790, 1120, 'BEING HELD', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Tomorrow? | You *roar again.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { drawBits(x, SUN, { Y: '#ffe76a', O: ORANGE }, 790, lerp(1060, 860, ease.outCubic(prog(lt, 0.2, 1.4))), 24 * pop01(t, P.t0 + 0.2, 0.4, 1.8)) },
    front(x, t, lt, P) {
      L(x, 790, 1110, 'RECHARGED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 40)
      sparkles(x, t, 790, 860, P.t0 + 1.4, 8, 180, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0417', key: 'F', accent: ACC, solo: 'leo', ending: 'callback',
  title: 'What Leos need | *on a bad day.*',
  cameos: CAMEOS,
  group: { cap: 'Still a star. | *Even off duty.*', mood: 'heart' },
  last: {
    text: 'The crown waited. | *Take your time.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 380, 1080, 280 * k, { mood: lt > 1.3 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      drawBits(x, CUSHION, { P: '#b44ad6', Y: GOLD }, 740, 1160, 18 * pop01(t, t0 + 0.6, 0.4, 2))
      drawBits(x, CROWN, CROWN_C, 740, 1110, 13 * pop01(t, t0 + 0.8, 0.4, 2))
      sparkles(x, t, 740, 1110, t0 + 1.0, 8, 130, 0.4)
      if (lt > 1.5) hearts(x, t, 560, 1000, t0 + 1.5, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
