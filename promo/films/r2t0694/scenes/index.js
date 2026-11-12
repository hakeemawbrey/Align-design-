// r2t0694: star_talk, BELIKE (twelve signs), "Door says pull? | Zodiacs *be like.*" (signs3kit, lofi · D).
// Aries pushed so hard the door gave up · Taurus waits for the door to apologise · Gemini pushes and pulls at once
// · Cancer pushed once, went home forever · Leo missed, bowed anyway · Virgo fixed the sign's font · Libra still deciding
// · Scorpio pushed on purpose, watched who noticed · Sagittarius ran into it, laughed for an hour · Capricorn emailed
// building management twice · Aquarius invented a sideways door · Pisces took it personally.
// Ending: callback. "The door? | *Said sorry.*" (Taurus' door comes back, with a bubble).
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }

/** a pixel door with a little PULL sign; open: 0…1 swings it (squashes horizontally), rot tilts it */
function door(x, cx, cy, k, { sign = 'PULL', open = 0, rot = 0, col = '#a8663a', font = MONO, signBg = CREAM } = {}) {
  if (k <= 0.01) return
  const w = 200, h = 330
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * (1 - 0.6 * open), k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 12, -h / 2 + 14, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(-w / 2 + 20, -h / 2 + 20, w - 40, 110); x.fillRect(-w / 2 + 20, -h / 2 + 160, w - 40, 150)
  x.fillStyle = GOLD; x.fillRect(w / 2 - 44, 0, 22, 36)
  if (sign) {
    x.font = `700 32px ${font}`; const sw = x.measureText(sign).width + 26
    x.fillStyle = INK; x.fillRect(-sw / 2 - 4, -h / 2 + 56, sw + 8, 54); x.fillStyle = signBg; x.fillRect(-sw / 2, -h / 2 + 60, sw, 46)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(sign, 0, -h / 2 + 84)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Pushed harder. | The door *gave up.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.6, 1.0],
    front(x, t, lt, P) {
      const fall = ease.inCubic(prog(lt, 1.0, 1.4))
      door(x, 800 + fall * 40, 860 + fall * 60, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: fall * 1.35 })
      if (lt > 1.4) L(x, 800, 640, 'DOOR: RETIRED', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, -0.04, 34)
    } },
  { sign: 'taurus', cap: 'Waiting for the door | to *apologise.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 560, 640, 'i’ll wait.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bc' })
      L(x, 800, 1080, 'DAY 3', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: 'gemini', cap: 'Pushed *and* pulled. | At the same time.', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { open: 0.5 + 0.5 * Math.sin(t * 9) })
      L(x, 800, 1080, 'PUSH? PULL? BOTH.', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#ffe76a', -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Pushed once. | Went *home forever.*', mood: lt => lt > 1.2 ? 'neutral' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 820, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      bits(x, 'HOUSE', 600, 1060, 14 * pop01(t, P.t0 + 1.1, 0.3, 2))
      bubble(x, 560, 640, 'too embarrassing', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Pushed. It didn’t open. | *Bowed anyway.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      door(x, 820, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 600, 640, 'TA-DA!', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.06, 44)
      sparkles(x, t, 360, 880, P.t0 + 1.2, 7, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Didn’t open it. | *Fixed the sign’s font.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.2 ? { sign: 'puLL', font: 'cursive', signBg: '#ffd0e0' } : { sign: 'PULL.', font: INTER })
      L(x, 800, 1080, 'KERNING: FIXED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Push or pull? | *Still deciding.*', mood: 'neutral', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 820, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CLOCK', 600, 640, 10 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1080, 'MINUTE 40', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Pushed on purpose. | *Watched who noticed.*', mood: 'squint', look: [-1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 820, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 560, 640, 'interesting.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bc' })
      L(x, 800, 1080, 'TEST: PASSED?', pop01(t, P.t0 + 1.6, 0.3, 2.2), '#ff5a7a', 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Walked into it. | Laughed *for an hour.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      door(x, 820, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 0.8 && lt < 1.0 ? 0.05 : 0 })
      bubble(x, 560, 640, 'HA HA HA', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bc' })
      if (lt > 0.8) sparkles(x, t, 700, 760, P.t0 + 0.8, 6, 90, 0.2)
    } },
  { sign: 'capricorn', cap: 'Emailed management. | *Twice.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'RE: RE: DOOR', headBg: STEEL, headInk: INK, lines: ['To whom it', 'may concern,', 'the door…'], size: 32, align: 'left' })
      L(x, 800, 1070, 'FOLLOW-UP SENT', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Invented a door | that *goes sideways.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const slide = ease.inOutCubic(prog(lt, 0.7, 1.4))
      door(x, 800 + slide * 90, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { sign: 'SLIDE', col: '#6fc3ff' })
      L(x, 800, 1080, 'PATENT PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'The door didn’t open. | Took it *personally.*', tears: lt => lt > 0.9 ? 3 : 2, mood: 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      door(x, 820, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 640, 'REJECTED BY A DOOR', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0694', key: 'D', accent: ACC, ending: 'callback',
  title: 'Door says pull? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'It says pull. | It *always* says pull.', moods: ['squint', 'squint', 'wink', 'wide', 'sparkle', 'squint', 'neutral', 'squint', 'sparkle', 'neutral', 'sparkle', 'wide'] },
  last: {
    text: 'The door? | *Said sorry.*',
    draw(x, t, lt) {
      door(x, 600, 1100, pop01(t, t - lt + 0.4, 0.4, 2) * 1.6)
      bubble(x, 680, 780, 'sorry, taurus.', pop01(t, t - lt + 1.1, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      const kt = pop01(t, t - lt + 0.8, 0.4, 2)
      if (kt > 0.01) signChar(x, t, 'taurus', 300, 1200, 260 * kt, { mood: lt > 1.5 ? 'heart' : 'squint', seed: 44, glyph: false, hops: [t - lt + 1.6] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
