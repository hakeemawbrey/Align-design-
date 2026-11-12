// r2t0168: THE SIGNS AS… v3, SOLO film, "Sagittarians texting | be like." (~49 s vertical, signs3kit social cut,
// music: lofi · G). One sign the whole way through: nine texting habits, each pushed to the most extreme Sagittarius.
//   0.0–3.6    "Sagittarians texting | *be like.*"
//   3.6–37.8   a forty-minute voice note · typos, never fixed · "honestly? no." · ALL CAPS, even good night · group chat
//              "dinner?" → booked flights · first text to a match: part 1 of 12 · memes only, even to "we need to talk"
//              · phone at 1%, on a mountain · vanished for a week, came back with "SO."
//  37.8        "Chaos. | *Delivered.*"
//  41.2        callback: "The voice note | *is still going.*"  the waveform is back, the timer still counting.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'sagittarius', ACC = '#c97bff'
const ST = { x: -190 }
const CAT = ['K.....K', 'KK...KK', 'KKKKKKK', 'KWKKKWK', 'KKKPKKK', 'KKKKKKK']
const MOUNTAIN = ['......W......', '.....WWW.....', '....GGGGG....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG']

/** a voice-note pill: play button, a moving waveform, and a timer */
function voice(x, t, cx, cy, k, secs, { w = 400 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -58, w + 16, 116); x.fillStyle = LAV; x.fillRect(-w / 2, -50, w, 100)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 + 26, -24); x.lineTo(-w / 2 + 26, 24); x.lineTo(-w / 2 + 62, 0); x.fill()
  for (let i = 0; i < 12; i++) { const h = 14 + 30 * Math.abs(Math.sin(t * 6 + i * 0.9)); x.fillRect(-w / 2 + 84 + i * 13, -h / 2, 7, h) }
  const m = Math.floor(secs / 60), s = Math.floor(secs % 60)
  txt(x, `${m}:${String(s).padStart(2, '0')}`, w / 2 - 58, 0, { size: 30, font: MONO, weight: 700 })
  x.restore()
}

const CAMEOS = [
  // 1 · the voice note
  { sign: S, cap: 'Sent a voice note. | *Forty minutes long.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      voice(x, t, 745, 820, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), lerp(3, 40 * 60, ease.inCubic(prog(lt, 0.4, 1.9))), { w: 380 })
      bubble(x, 790, 1040, 'ok so FIRST—', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  // 2 · typos
  { sign: S, cap: 'Typos everywhere. | *Never fixes them.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SAG', headCol: ACC, size: 28, w: 300, h: 440, lines: [
        ['omw!! jsut lefft', ACC, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['wiat whre r u', ACC, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['?? which city', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
    } },
  // 3 · honesty
  { sign: S, cap: 'You asked “is it cute?” | *“Honestly? No.”*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: GOLD, size: 28, w: 300, h: 440, lines: [
        ['is this hat cute?', MINT, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['honestly? no.', ACC, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['love u tho', ACC, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
    } },
  // 4 · all caps
  { sign: S, cap: 'Types in all caps. | *Even “good night.”*', mood: 'sleepy', star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'GOOD NIGHT!!! | SLEEP WELL!!!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1020, 'VOLUME: MAX', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 5 · group chat
  { sign: S, cap: 'Group chat: “dinner?” | Sag: *“booked flights.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE GROUP', headCol: MINT, size: 28, w: 300, h: 440, lines: [
        ['dinner friday?', MINT, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['BOOKED FLIGHTS', ACC, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['…to where??', MINT, pop01(t, P.t0 + 1.6, 0.25, 2.2)],
      ] })
    } },
  // 6 · Align: first text to a match
  { sign: S, cap: 'First text to a match: | *part 1 of 12.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 640, '✦ NEW MATCH', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      const n = Math.min(12, 1 + Math.floor(prog(lt, 0.4, 2.0) * 12))
      for (let i = 0; i < Math.min(n, 5); i++) card(x, 790 + i * 8, 980 - i * 50, 300, 80, 1, { bg: i % 2 ? CREAM : '#efe0ff', rot: (i % 2 ? 1 : -1) * 0.03 }, () => txt(x, `PART ${Math.max(1, n - Math.min(n, 5) + 1 + i)} OF 12`, 0, 2, { size: 30, font: MONO, weight: 700 }))
    } },
  // 7 · memes only
  { sign: S, cap: '“We need to talk.” | *Sent a meme.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, 790, 860, k, { head: 'BABE', headCol: PINK, size: 28, w: 300, h: 440, lines: [['we need to talk.', PINK, pop01(t, P.t0 + 0.4, 0.25, 2.2)]] })
      drawBits(x, CAT, { K: '#f2a65a', W: '#ffffff', P: PINK }, 800, 930, 18 * pop01(t, P.t0 + 1.0, 0.3, 2.4), { rot: 0.05 })
      label(x, 790, 1120, 'SERIOUS MODE: N/A', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 8 · 1% on a mountain
  { sign: S, cap: 'Phone at 1%. | *On a mountain. Somewhere.*', mood: 'sparkle', star: { x: -190, y: -60, s: 220 },
    back(x, t, lt, P) { drawBits(x, MOUNTAIN, { G: '#7d86a8', W: CREAM }, 360, 1040, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 870); x.scale(1.4 * k, 1.4 * k); x.fillStyle = INK; x.fillRect(-110, -50, 220, 100); x.fillRect(110, -22, 18, 44); x.fillStyle = '#2a2350'; x.fillRect(-100, -40, 200, 80); x.fillStyle = Math.sin(t * 10) > 0 ? RED : '#2a2350'; x.fillRect(-92, -32, 14, 64); x.restore() }
      txt(x, '1%', 800, 730, { size: 56, font: MONO, weight: 700, color: RED })
      label(x, 800, 1020, 'LOCATION: ???', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 9 · "SO."
  { sign: S, cap: 'Vanished for a week. | Came back with *“SO.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 680, 'LAST SEEN: 7 DAYS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'SO.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 90, tail: 'bl', col: ACC })
      sparkles(x, t, 790, 920, P.t0 + 1.2, 8, 180, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2t0168', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Sagittarians texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaos. | *Delivered.*', mood: 'sparkle' },
  last: {
    text: 'The voice note | *is still going.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 540, 1020, 300 * k, { mood: 'sparkle', seed: 70, hops: [t - lt + 1.2, t - lt + 2.4] })
      voice(x, t, 540, 1330, 1.6 * pop01(t, t - lt + 0.8, 0.35, 2), 40 * 60 + 12 + lt * 7, { w: 420 })
      bubble(x, 540, 760, '…and ANOTHER thing', pop01(t, t - lt + 1.5, 0.25, 2.2), { size: 42, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
