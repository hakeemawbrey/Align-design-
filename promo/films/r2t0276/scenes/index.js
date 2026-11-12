// r2t0276: star_talk, SOLO (aquarius), "Aquarians texting | be like." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One Aquarius the whole way through: nine texting habits, each pushed to the most extreme Aquarius version.
//   0.0–3.6    "Aquarians texting | *be like.*"
//   3.6–37.8   nine cards: you said "hey", they sent a theory · replied to your text from March · capital letters, too
//              mainstream · renamed the group chat seventeen times · an eleven-minute voice note about space · you poured
//              your heart out, they sent a fun fact · invented a word, uses it daily · new match, opened with Mars
//              · read receipts off, for freedom
//  37.8        "Weird texter. | *Loyal friend.*"
//  41.2        callback: "Group chat name | #18: *the void.*" the renamed group chat comes back with one more name.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, chart, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'aquarius', ACC = '#6fc3ff'
const ST = { x: -170 }

const PLANET = ['...OOOO...', '.OOOOOOOO.', 'OOOyOOOOOO', 'RRRRRRRRRR', 'OOOOOOyOOO', '.OOOOOOOO.', '...OOOO...']
const PLANET_C = { O: '#c97bff', y: '#e9d2ff', R: GOLD }
const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..']
const BULB_C = { Y: SUN, W: '#fff8d0', G: GREY }

/** a voice-note pill: a play button, a waveform that fills as it plays, and a running time */
function voiceNote(x, t, cx, cy, k, p) {
  card(x, cx, cy, 380, 120, k, { bg: '#2a2350', rot: -0.03 }, () => {
    x.fillStyle = MINT; x.beginPath(); x.moveTo(-160, -26); x.lineTo(-120, 0); x.lineTo(-160, 26); x.closePath(); x.fill()
    for (let i = 0; i < 18; i++) {
      const h = 14 + 34 * Math.abs(Math.sin(i * 1.7 + 0.4)) * (0.7 + 0.3 * Math.sin(t * 6 + i))
      x.fillStyle = i / 18 < p ? MINT : '#6b62a8'; x.fillRect(-100 + i * 14, -h / 2, 8, h)
    }
  })
}

const CAMEOS = [
  { sign: S, cap: 'You said “hey.” | They sent *a theory.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      phone(x, 790, 860, 1.3 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'AQUARIUS', headCol: ACC, size: 24, lines: [
        ['hey', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['what if clouds', MINT, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['are just shy', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
        ['part 1 of 9', MINT, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Replied to your text. | From *March.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 760, 330, 150, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'YOUR TEXT', 0, -36, { size: 26, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, 'MARCH 2', 0, 22, { size: 50, font: MONO, weight: 700, color: RED })
      })
      bubble(x, 790, 1010, 'oh true lol', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 48, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Capital letters? | Too *mainstream.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      label(x, 790, 720, 'Hello!', k * (1 - ease.inCubic(prog(lt, 0.9, 1.2))), { size: 64, bg: BONE, rot: -0.04 })
      if (lt > 0.95) {
        x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.globalAlpha = 1 - prog(lt, 0.9, 1.2)
        x.beginPath(); x.moveTo(680, 690); x.lineTo(900, 750); x.stroke(); x.restore()
      }
      label(x, 790, 720, 'hi', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 72, bg: MINT, rot: 0.03 })
      label(x, 790, 960, 'CAPS LOCK: NEVER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Renamed the group chat. | *Seventeen times.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const NAMES = ['besties', 'soup club', 'alien council', 'the hive', 'goose crimes', 'no thoughts', 'cool rocks']
      const n = Math.min(16, Math.floor(Math.max(0, lt - 0.3) / 0.12))
      label(x, 790, 700, `NAME #${n + 1}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 880, NAMES[n % NAMES.length], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, col: BONE, tail: 'bl' })
      label(x, 790, 1080, 'GROUP: CONFUSED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Voice note: *eleven minutes.* | Topic: space.', mood: lt => lt > 0.8 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, PLANET, PLANET_C, 790, 680, 18 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: -0.15 })
      const p = clamp((lt - 0.3) / 2.0)
      voiceNote(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), p * 0.2)
      label(x, 790, 1090, 'LENGTH: 11:04', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: LAV, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You poured your heart out. | They sent *a fun fact.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'i have so | many feelings', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      bubble(x, 790, 900, 'octopuses have | three hearts!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      label(x, 790, 1100, 'SUPPORT: TECHNICALLY', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Invented a word. | Uses it *daily.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, BULB, BULB_C, 790, 680, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 900, 'that’s so | blorpy', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 50, col: BONE, tail: 'bl' })
      label(x, 790, 1100, 'DICTIONARY: NO', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 680, P.t0 + 0.6, 6, 120, 0.3)
    } },
  { sign: S, cap: 'New match. | Opened with *Mars.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 620, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      phone(x, 790, 930, 1.2 * pop01(t, P.t0 + 0.35, 0.35, 2), { head: 'MATCH', headCol: PINK, size: 26, lines: [
        ['mars thoughts?', MINT, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
        ['…hi?', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
        ['ok but mars tho', MINT, pop01(t, P.t0 + 1.7, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Read receipts off. | *For freedom.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), on = lt < 0.9
      card(x, 780, 820, 330, 130, 1.15 * k, { bg: '#2a2350', rot: 0.03 }, () => {
        txt(x, 'READ RECEIPTS', -10, -30, { size: 26, font: MONO, weight: 700, color: BONE })
        x.fillStyle = INK; x.fillRect(-70, 4, 140, 52); x.fillStyle = on ? GREEN : GREY; x.fillRect(-64, 10, 128, 40)
        x.fillStyle = CREAM; x.fillRect(on ? 20 : -60, 14, 40, 32)
      })
      label(x, 790, 1040, 'FREE AS A BIRD', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04 })
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 180, 0.5, [MINT, BONE, SKYB])
    } },
]

const F = makeFilm({
  id: 'r2t0276', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Aquarians texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Weird texter. | *Loyal friend.*', mood: 'sparkle' },
  last: {
    text: 'Group chat name | #18: *the void.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 360, 960, 240 * k, { mood: 'wink', look: [1, 0], seed: 54, hops: [t0 + 1.4] })
      phone(x, 760, 960, 1.25 * pop01(t, t0 + 0.7, 0.35, 2), { head: 'THE VOID', headCol: ACC, size: 24, lines: [
        ['who did this', BONE, pop01(t, t0 + 1.1, 0.25, 2.2)],
        ['lol', BONE, pop01(t, t0 + 1.4, 0.25, 2.2)],
        ['it fits tho', MINT, pop01(t, t0 + 1.7, 0.25, 2.2)],
      ] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
