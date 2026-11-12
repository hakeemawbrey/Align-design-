// r2t0289: star_talk, SOLO, "Mad Sagittarians | *be like.*" (topic: Sagittarians when they're mad) (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: callback.
//   0.0–3.6    "Sagittarians when they're mad | *be like.*"
//   3.6–37.8   nine mad moments, each pushed to the extreme:
//              mad for thirty seconds, booked a flight · brutally honest, with a smile · stormed out, came back for snacks
//              · angry walk ended in another town · silent treatment: four minutes · mad at you, still sent the dog video
//              · rage-learned French · grudge lasts until something shiny · the apology is a playlist called "oops"
//  37.8        "Loud. Fast. | *Over it.*"
//  41.2        callback: "Postcard says: | *“Still love you.”*" — from wherever card 1's flight went.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const VIOLET = '#b07bff', RED = '#e23d4e', ORANGE = '#ff9a4a', BROWN = '#c98f5a'

// ── props
/** a boarding pass */
function ticket(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  const W = 360, H = 190
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = '#fff8ea'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = ORANGE; x.fillRect(-W / 2, -H / 2, W, 48)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('BOARDING PASS', -W / 2 + 18, -H / 2 + 25)
  x.font = `800 40px ${INTER}`; x.fillText('ONE WAY', -W / 2 + 18, -6)
  x.font = `700 24px ${MONO}`; x.fillText('TO: ANYWHERE', -W / 2 + 18, 44)
  x.setLineDash([8, 8]); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(W / 2 - 80, -H / 2 + 54); x.lineTo(W / 2 - 80, H / 2 - 8); x.stroke(); x.setLineDash([])
  x.fillStyle = INK; for (let i = 0; i < 9; i++) x.fillRect(W / 2 - 64 + (i % 3) * 16, -30 + Math.floor(i / 3) * 22, 10, 16)
  x.restore()
}
const DOOR = ['KKKKKKKKKK', 'KDDDDDDDDK', 'KDddddddDK', 'KDdDDDDdDK', 'KDdDDDDdDK', 'KDddddddDK', 'KDDDDDDGDK', 'KDDDDDDDDK', 'KDddddddDK', 'KDdDDDDdDK', 'KDddddddDK', 'KDDDDDDDDK', 'KKKKKKKKKK']
const BOWL = ['.YWYYWYWYYWY.', 'YYYYYYYYYYYYY', 'RRRRRRRRRRRRR', '.RRRRRRRRRRR.', '..RRRRRRRRR..', '....KKKKK....']
/** a signpost */
function signpost(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -60, 28, 300); x.fillStyle = BROWN; x.fillRect(-8, -54, 16, 290)
  x.rotate(-0.04)
  x.fillStyle = INK; x.fillRect(-180, -150, 360, 120); x.fillStyle = MINT; x.fillRect(-172, -142, 344, 104)
  x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  text.forEach((l, i) => x.fillText(l, 0, -114 + i * 44))
  x.restore()
}
function timer(x, cx, cy, k, txt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -80, 300, 160); x.fillStyle = MINT; x.fillRect(-140, -70, 280, 140)
  x.fillStyle = '#140c30'; x.fillRect(-120, -50, 240, 100)
  x.fillStyle = MINT; x.font = `700 60px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
  x.restore()
}
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
const GIFT = ['....R..R....', '.....RR.....', 'GGGGGRRGGGGG', 'GGGGGRRGGGGG', 'RRRRRRRRRRRR', 'GGGGGRRGGGGG', 'GGGGGRRGGGGG', 'GGGGGRRGGGGG', 'GGGGGRRGGGGG']
/** a cassette tape with a hand-written label */
function cassette(x, cx, cy, k, lt, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -110, 360, 220); x.fillStyle = VIOLET; x.fillRect(-170, -100, 340, 200)
  x.fillStyle = '#fff8ea'; x.fillRect(-140, -84, 280, 70)
  x.fillStyle = INK; x.font = `italic 700 40px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -48)
  x.fillStyle = '#140c30'; x.fillRect(-120, 10, 240, 70)
  for (const dx of [-60, 60]) { x.save(); x.translate(dx, 45); x.rotate(lt * 6); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; for (let i = 0; i < 6; i++) { x.rotate(Math.PI / 3); x.fillRect(-3, 8, 6, 12) } x.restore() }
  x.restore()
}
/** a postcard with a stamp */
function postcard(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  const W = 460, H = 300
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 10, -H / 2 + 12, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = '#fff8ea'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = '#c9bfae'; x.fillRect(20, -H / 2 + 30, 4, H - 60)
  x.fillStyle = INK; x.fillRect(W / 2 - 104, -H / 2 + 20, 84, 100); x.fillStyle = ORANGE; x.fillRect(W / 2 - 98, -H / 2 + 26, 72, 88)
  x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(W / 2 - 62, -H / 2 + 60, 18, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `italic 700 48px Georgia, serif`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -W / 2 + 26, -40 + i * 64))
  x.fillStyle = '#c9bfae'; for (let i = 0; i < 3; i++) x.fillRect(40, 30 + i * 36, 160, 4)
  x.restore()
}

const S = 'sagittarius'
const CAMEOS = [
  { sign: S, cap: 'Mad for thirty seconds. | Then *booked a flight.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 650, lt < 1.0 ? 'MAD: 0:28' : 'MAD: OVER', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: lt < 1.0 ? RED : MINT, color: lt < 1.0 ? BONE : INK, rot: -0.05, font: MONO, weight: 700 })
      ticket(x, 790, 900, pop01(t, P.t0 + 1.0, 0.3, 2.2), lt)
      sparkles(x, t, 790, 900, P.t0 + 1.1, 6, 200, 0.4)
    } },
  { sign: S, cap: 'Brutally honest. | *With a smile.*', mood: lt => lt > 1.0 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'honestly? | your idea is bad.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 930, 'love you though!', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 42, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.3, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Stormed out. | *Came back for snacks.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, D: BROWN, d: '#a8742a', G: GOLD }, 820, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BOWL, { Y: '#ffe7a8', W: '#fff4e2', R: RED, K: '#8a4a2e' }, 580, 1080, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      label(x, 820, 640, lt < 1.2 ? 'SLAM!' : '…forgot these', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: lt < 1.2 ? RED : GOLD, color: lt < 1.2 ? BONE : INK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Went on an angry walk. | Ended up *in another town.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      signpost(x, 790, 930, pop01(t, P.t0 + 0.9, 0.3, 2), ['WELCOME TO', 'ELSEWHERE'])
      label(x, 790, 1120, 'DISTANCE: 23 KM', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The silent treatment. | Lasted *four minutes.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const s = Math.min(240, Math.floor(Math.max(0, lt - 0.3) * 160))
      timer(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`)
      bubble(x, 780, 640, 'ok ANYWAY so', pop01(t, P.t0 + 1.6, 0.25, 2.4), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 1080, 'NEW RECORD', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mad at you. | Still *sent the dog video.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOUR MATCH', headCol: PINK, lines: [
        ['ur annoying', RED, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['anyway', BONE, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['LOOK AT', GOLD, pop01(t, P.t0 + 1.25, 0.25, 2.2)],
        ['THIS DOG', GOLD, pop01(t, P.t0 + 1.45, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Didn’t rage-clean. | *Rage-learned French.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'BONJOUR. | je suis mad.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: SKYB, tail: 'bl' })
      label(x, 790, 980, 'FRENCH: DAY 1 · STREAK 1', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Holds a grudge until | *something shiny* shows up.', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, GIFT, { R: GOLD, G: PINK }, 800, 900, 24 * pop01(t, P.t0 + 0.9, 0.3, 2))
      sparkles(x, t, 800, 900, P.t0 + 1.0, 8, 180, 0.2)
      label(x, 790, 650, lt < 1.0 ? 'GRUDGE: ACTIVE' : 'GRUDGE: WHAT GRUDGE?', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: lt < 1.0 ? RED : MINT, color: lt < 1.0 ? BONE : INK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The apology? | A *playlist* called “oops.”', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cassette(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt, 'oops ♡')
      label(x, 790, 1090, '12 SONGS · NO WORDS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0289', key: 'D', accent: VIOLET, solo: 'sagittarius', ending: 'callback',
  title: 'Mad Sagittarians | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Loud. Fast. | *Over it.*', mood: 'happy' },
  last: {
    text: 'Postcard says: | *“Still love you.”*',
    draw(x, t, lt) {
      const t0 = t - lt
      postcard(x, 540, 1060, 1.15 * pop01(t, t0 + 0.6, 0.4, 2), ['still love', 'you. ♡'])
      hearts(x, t, 540, 860, t0 + 1.2, { n: 6, life: 1.8, spread: 520, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
