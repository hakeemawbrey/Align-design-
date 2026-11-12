// r2a0492: star_advice, ADVICE SOLO, "Signs a Scorpio | *trusts you.*" (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine small signs a Scorpio has let you in, each a warm reframe with one gag. Ending: group.
//   0.0–3.6    "Signs a Scorpio | *trusts you.*"
//   3.6–37.8   shared the sad playlist · laughs the real laugh (the snort) · back to the door · gave you the spare key
//              · double-texted you · told you their birth time · stopped testing you (A+) · fell asleep on your couch
//              · remembers your favourite snack
//  37.8        group (the ending): "Trust earned. | *Kept for life.*"  The Scorpio comes back, heart eyes.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', DEEP = '#2a2350', WOOD = '#8a5a3a'
const ACC = '#ff6f8f'
const S = 'scorpio', ST = { x: -170 }
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const R = (t, P, a = 0.2) => pop01(t, P.t0 + a, 0.3, 2)
const pill = (t, P, a) => pop01(t, P.t0 + a, 0.2, 2)

function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.5, h = lines.length * lh + 46
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 23 + lh * (i + 0.5)))
  x.restore()
}
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 22
    x.save(); x.translate(right ? 96 - w : -96, -62 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -23, w, 46); x.fillStyle = INK; x.fillText(txt, 11, 2)
    x.restore()
  })
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
const KEY = ['.GGGG..........', 'GG..GG.........', 'G....GGGGGGGGGG', 'G....GGGGGGGGGG', 'GG..GG....G.G.G', '.GGGG.....G.G..']
const DOOR = ['WWWWWWWW', 'WddddddW', 'WddddddW', 'WddddddW', 'WddddGdW', 'WddddddW', 'WddddddW', 'WddddddW', 'WddddddW']
const DOOR_C = { W: '#5b2e1a', d: WOOD, G: GOLD }
const CHIPS = ['.YYYYY.', 'YYrYYYY', 'YYYYYrY', 'RRRRRRR', 'RRWWWRR', 'RRRRRRR', '.RRRRR.']
const CHIPS_C = { Y: '#ffd23a', r: ORANGE, R: RED, W: CREAM }

const CAMEOS = [
  // 1 · the playlist
  { sign: S, cap: 'They sent the sad playlist. | You’re *in.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, R(t, P), { head: 'PLAYLIST', headCol: LAV, lines: [['3 a.m. songs', BONE, pill(t, P, 0.4)], ['♪ rain, again', BONE, pill(t, P, 0.6)], ['♪ (private)', BONE, pill(t, P, 0.8)]] })
      L(x, 790, 1110, 'SHARED WITH: YOU', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 30)
    } },
  // 2 · the real laugh
  { sign: S, cap: 'The *real* laugh? | Not the polite one.', mood: lt => lt < 1.1 ? 'neutral' : 'happy', star: ST, hops: [1.1, 1.5, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'heh.', pop01(t, P.t0 + 0.3, 0.25, 2.2) * outBy(lt, 1.0), { size: 40, col: LAV, tail: 'bl' })
      bubble(x, 790, 860, 'HA-HA-SNORT', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 790, 1060, 'RARE SOUND', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  // 3 · back to the door
  { sign: S, cap: 'Back to the door? | You make them *feel safe.*', mood: 'happy', look: [-1, 0], star: { x: -200 },
    back(x, t, lt, P) { drawBits(x, DOOR, DOOR_C, 830, 860, 34 * R(t, P, 0.1)) },
    front(x, t, lt, P) {
      L(x, 830, 600, 'NOT WATCHING IT', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 32)
      hearts(x, t, 370, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  // 4 · the spare key
  { sign: S, cap: 'Gave you a spare key? | *That’s huge.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, KEY, { G: GOLD }, 790, 860, 22 * R(t, P), { rot: -0.2 })
      L(x, 790, 1060, 'COPIES MADE: ONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), BONE, 0.04, 30)
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 190, 0.3)
    } },
  // 5 · the double text
  { sign: S, cap: 'They double-texted you. | *Historic.*', mood: lt => lt < 1.2 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, R(t, P), { head: 'SCORPIO', headCol: ACC, lines: [['hey.', BONE, pill(t, P, 0.4)], ['also hey.', BONE, pill(t, P, 1.0)]] })
      L(x, 790, 1110, 'MARK THE DATE', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  // 6 · the birth time
  { sign: S, cap: 'Told you their birth time? | You’re *officially in.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 840, 150, R(t, P), t)
      L(x, 790, 1080, 'TOP SECRET: 3:12 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, 0.04, 28, CREAM)
    } },
  // 7 · the tests
  { sign: S, cap: 'They stopped testing you. | *You passed.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 790, 840, R(t, P), ['TRUST TEST', 'loyal? ✓', 'kind? ✓', 'snacks? ✓'], { w: 320, bg: CREAM, size: 34, rot: 0.04 })
      L(x, 900, 1040, 'A+', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, -0.12, 64, CREAM)
    } },
  // 8 · the couch nap
  { sign: S, cap: 'Fell asleep on your couch? | *Fully trusted.*', mood: 'sleepy', star: { x: -100, y: 40 },
    back(x, t, lt, P) {
      const k = R(t, P, 0.1)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.fillRect(150, 860, 640, 250); x.fillStyle = '#6b62a8'; x.fillRect(160, 870, 620, 100); x.fillStyle = '#8a7fd0'; x.fillRect(160, 970, 620, 130)
      x.fillStyle = INK; x.fillRect(130, 930, 60, 180); x.fillRect(750, 930, 60, 180)
      x.restore()
    },
    front(x, t, lt, P) {
      const k = R(t, P, 0.4)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(300, 990, 360, 110); x.fillStyle = PINK; x.fillRect(306, 996, 348, 98); x.fillStyle = '#ffb7cc'; for (let i = 0; i < 6; i++) x.fillRect(320 + i * 56, 1010, 24, 24); x.restore() }
      L(x, 800, 640, 'GUARD: DOWN', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 34)
    } },
  // 9 · the snack
  { sign: S, cap: 'Knows your usual snack? | *You matter.*', mood: lt => lt < 1.2 ? 'happy' : 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CHIPS, CHIPS_C, 790, 880, 22 * R(t, P))
      bubble(x, 790, 630, 'got your | usual.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 840, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 6 })
    } },
]
function outBy(lt, a) { return 1 - clamp((lt - a) / 0.2) }

const F = makeFilm({
  id: 'r2a0492', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'Signs a Scorpio | *trusts you.*',
  cameos: CAMEOS,
  group: {
    cap: 'Trust earned. | *Kept for life.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
