// r2a0053: star_advice, ADVICE SOLO, "Pisces, it’s okay | to want more." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a warm nudge for Pisces, each a relatable truth + a kind
// reframe, one visual gag each. Pisces cries in every card (happy tears too).
//   0.0–3.6    "Pisces, it’s okay | *to want more.*"  One big Pisces pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              ordered what they ordered? get the dessert you want · said “anything’s fine”? pick the movie · daydreaming
//              big? write it down · gave away your umbrella? keep one for you · settling for “maybe”? you deserve a yes
//              · your art is good, show someone · want a raise? ask, tears optional · crying at good news? still joy
//              · want the window seat? say so
//  37.8        "Big heart. | *Bigger dreams.*"  Pisces comes back, big.
//  41.2        callback: "Tonight? | *The big dessert.*"  The dessert from card one comes back, all theirs.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const IRIS = '#7c74f0', CREAM = '#fff4e2', RED = '#e23d4e', GREEN = '#5fd068'
const S = 'pisces'

// ── props
const SUNDAE = [
  '.....R.....',
  '....PPP....',
  '..PPPPPPP..',
  '.WWWWWWWWW.',
  'WWWCWWWWCWW',
  '.BBBBBBBBB.',
  '..GGGGGGG..',
  '...GGGGG...',
  '....GGG....',
  '.....G.....',
  '....GGG....',
]
const SUNDAE_C = { R: '#ff4f6f', P: PINK, W: CREAM, C: '#8a4a2e', B: '#a0603a', G: '#c8e8ff' }
const UMBRELLA = [
  '....YYYYY....',
  '..YYYYYYYYY..',
  '.YYYYYYYYYYY.',
  'YYYYYYYYYYYYY',
  'Y..Y..K..Y..Y',
  '......K......',
  '......K......',
  '......K......',
  '......K.K....',
  '.......K.....',
]
const ENVELOPE = [
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  'WaWWWWWWWWWWaW',
  'WWaaWWWWWWaaWW',
  'WWWWaaWWaaWWWW',
  'WWWWRRWRRWWWWW',
  'WWWWRRRRRWWWWW',
  'WWWWWRRRWWWWWW',
  'WWWWWWRWWWWWWW',
  'WWWWWWWWWWWWWW',
]

function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, edge = INK } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const txt = (x, s, X, Y, font, col = INK, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

// a menu with a gold tick that jumps from "same as them" to the big dessert
function menu(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 300, 360, k, { rot: 0.04 })) return
  txt(x, 'MENU', 0, -146, `700 30px ${MONO}`, IRIS)
  const L = ['same as them', 'side salad', 'THE BIG DESSERT']
  const pick = lt > 1.2 ? 2 : 0
  L.forEach((s, i) => {
    const y = -70 + i * 80
    txt(x, s, -100, y, `800 26px ${INTER}`, INK, 'left')
    x.fillStyle = INK; x.fillRect(-136, y - 14, 26, 26); x.fillStyle = CREAM; x.fillRect(-132, y - 10, 18, 18)
    if (i === pick) { x.fillStyle = i === 2 ? GREEN : '#b9b0a0'; x.fillRect(-130, y - 8, 14, 14) }
  })
  if (lt > 1.2) { x.strokeStyle = RED; x.lineWidth = 4; x.beginPath(); x.moveTo(-104, -70); x.lineTo(70, -70); x.stroke() }
  x.restore()
}
// a TV with a movie title card
function tv(x, t, cx, cy, k, lt) {
  if (!card(x, cx, cy, 340, 250, k, { rot: 0, bg: '#2a2350' })) return
  x.fillStyle = '#140c30'; x.fillRect(-150, -106, 300, 190)
  const mine = lt > 1.1
  x.fillStyle = mine ? IRIS : '#3a3260'; x.fillRect(-130, -90, 260, 158)
  txt(x, mine ? 'MERMAID' : 'whatever', 0, -30, `800 34px ${INTER}`, mine ? CREAM : '#8a84b0')
  txt(x, mine ? 'MUSICAL ♡' : 'is fine…', 0, 16, `800 34px ${INTER}`, mine ? CREAM : '#8a84b0')
  x.fillStyle = INK; x.fillRect(-60, 125, 120, 14)
  x.restore()
}
// a dream cloud with a little castle in it, then a notebook
function dream(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(232,236,255,0.92)'
  for (const [a, b, r] of [[-90, 10, 80], [0, -30, 100], [100, 10, 80], [0, 50, 90]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = LAV; x.fillRect(-60, -20, 120, 80); x.fillRect(-80, -60, 40, 120); x.fillRect(40, -60, 40, 120)
  x.fillStyle = IRIS; x.fillRect(-80, -80, 40, 20); x.fillRect(40, -80, 40, 20); x.fillRect(-14, 20, 28, 40)
  x.fillStyle = GOLD; x.fillRect(-6, -60, 12, 30)
  x.restore()
}
// the raise envelope with a wax seal
function envelope(x, cx, cy, k) { drawBits(x, ENVELOPE, { W: CREAM, a: '#b9b0a0', R: PINK }, cx, cy, 20 * k, { rot: -0.05 }) }
// an aeroplane window with clouds drifting past
function planeWindow(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-130, -180, 260, 360, 110); x.fill()
  x.fillStyle = '#d8dbe8'; x.beginPath(); x.roundRect(-120, -170, 240, 340, 100); x.fill()
  x.save(); x.beginPath(); x.roundRect(-96, -146, 192, 292, 86); x.clip()
  x.fillStyle = SKYB; x.fillRect(-100, -150, 200, 300)
  x.fillStyle = '#ffffff'
  for (let i = 0; i < 3; i++) { const px = ((i * 90 - t * 60) % 300 + 300) % 300 - 150, py = -80 + i * 70; x.beginPath(); x.arc(px, py, 30, 0, Math.PI * 2); x.arc(px + 30, py + 6, 24, 0, Math.PI * 2); x.fill() }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Ordered what they ordered? | *Get the dessert.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: 1, look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      menu(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1090, 'TREAT: YOURSELF', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said “anything’s fine”? | *Pick the movie.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', tears: 1, look: [1, 0], star: { x: -200 }, hops: [1.15],
    front(x, t, lt, P) {
      tv(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 790, 1080, 'ooh, THIS one', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Daydreaming big? | *Write it down.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', tears: 1, look: [1, -1], star: { x: -200, y: 40 },
    front(x, t, lt, P) {
      dream(x, t, 760, 760, pop01(t, P.t0 + 0.2, 0.4, 2), lt)
      label(x, 780, 1050, 'PLAN, NOT JUST DREAM ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Gave away your umbrella? | *Keep one for you.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: 2, star: { x: -150 }, hops: [1.35],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      // rain
      if (k > 0.01) { x.save(); x.globalAlpha = 0.7 * k; x.fillStyle = SKYB; for (let i = 0; i < 26; i++) { const px = 140 + (i * 73) % 800, py = 480 + ((i * 97 + t * 520) % 640); if (lt > 1.3 && Math.abs(px - F.x) < 150 && py < F.cy + 60) continue; x.fillRect(px, py, 5, 22) } x.restore() }
      const drop = ease.outCubic(prog(lt, 1.0, 1.3))
      if (lt > 1.0) drawBits(x, UMBRELLA, { Y: IRIS, K: INK }, F.x, lerp(380, F.top - 50, drop), 20)
      if (lt < 1.0) bubble(x, 780, 660, 'here, take mine!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 800, 1090, 'SPARE: KEPT ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Settling for “maybe”? | *You deserve a yes.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', tears: lt => lt > 1.3 ? 2 : 1, look: [1, 0], star: { x: -200 }, hops: [1.35],
    front(x, t, lt, P) {
      if (card(x, 790, 850, 280, 400, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#2a2350' })) {
        x.fillStyle = '#140c30'; x.fillRect(-124, -184, 248, 368)
        const a = lt > 1.3
        x.fillStyle = BONE; x.fillRect(-100, -130, 170, 50); txt(x, 'maybe? idk', -15, -104, `800 24px ${INTER}`)
        if (a) { x.strokeStyle = RED; x.lineWidth = 4; x.beginPath(); x.moveTo(-96, -104); x.lineTo(66, -104); x.stroke(); x.fillStyle = MINT; x.fillRect(-110, -10, 220, 56); txt(x, '✦ IT’S A MATCH', 0, 18, `700 22px ${MONO}`); x.fillStyle = PINK; x.fillRect(-40, 80, 150, 56); txt(x, 'YES!! ♡', 35, 108, `800 28px ${INTER}`) }
        x.restore()
      }
      if (lt > 1.4) hearts(x, t, 790, 760, t - lt + 1.4, { n: 5, life: 1.5, spread: 220, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Your art is good. | *Show someone.*', mood: 'sparkle', tears: 2, look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      if (card(x, 790, 830, 280, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.03, bg: GOLD })) {
        x.fillStyle = '#140c30'; x.fillRect(-120, -130, 240, 260)
        x.fillStyle = IRIS; x.fillRect(-120, 30, 240, 100); x.fillStyle = SKYB; for (let i = 0; i < 6; i++) x.fillRect(-110 + i * 40, 40 + (i % 2) * 14, 24, 8)
        x.fillStyle = GOLD; x.beginPath(); x.arc(50, -50, 40, 0, Math.PI * 2); x.fill()
        x.fillStyle = PINK; x.fillRect(-80, -10, 60, 20); x.fillRect(-90, -4, 10, 8)
        x.restore()
      }
      label(x, 790, 1060, 'NOW SHOWING ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want a raise? | Ask. *Tears optional.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', tears: 2, look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      envelope(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'RE: MY RAISE', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 32, bg: CREAM, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'SENT ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Crying at good news? | *Still counts as joy.*', mood: 'heart', tears: 3, look: [1, 0], star: { x: -200 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      if (card(x, 790, 850, 280, 240, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })) {
        txt(x, 'YOU GOT', 0, -40, `800 40px ${INTER}`, IRIS); txt(x, 'THE PART!', 0, 14, `800 40px ${INTER}`, IRIS)
        x.restore()
      }
      sparkles(x, t, 790, 850, P.t0 + 0.9, 8, 200, 0.5)
      label(x, 790, 1060, 'HAPPY TEARS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want the window seat? | *Say so.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', tears: 1, look: [1, 0], star: { x: -190 }, hops: [1.25],
    front(x, t, lt, P) {
      planeWindow(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'SEAT 12A: YOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0053', key: 'C', accent: IRIS, solo: S, ending: 'callback',
  title: 'Pisces, it’s okay | *to want more.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger dreams.*', mood: 'sparkle' },
  last: {
    text: 'Tonight? | *The big dessert.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, SUNDAE, SUNDAE_C, 540, 1000, 30 * pop01(t, t0 + 0.5, 0.4, 2))
      label(x, 540, 1230, 'ALL YOURS ♡', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 540, 980, t0 + 1.2, 9, 230, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
