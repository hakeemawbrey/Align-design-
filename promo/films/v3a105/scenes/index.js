// v3a105: zodiac.advice444 (star_advice), ADVICE SOLO, "Sagittarius, your gift | is this." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the lovely things a Sagittarius brings, one gag each.
//   0.0–3.6    "Sagittarius, your gift | *is this.*"
//   3.6–37.8   nine cards: strangers laughing in the queue · rained out, so: a blanket fort picnic · tells you about the
//              spinach · a milk run that took four hours · finds the silver lining · friends get braver around them
//              · says hello in every language · first-date stories are legendary · gives you the window seat
//  37.8        "Sunshine. | *With a passport.*"
//  41.0        LESSON: "Your freedom makes room | *for everyone.*"  SPIRIT: FREE
//  46.9        last line: "Where to next? | *Bring snacks.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'sagittarius'
const WOOD = '#c98f2a', RED = '#e23d4e', ROSE = '#ff9ccf', WHITE = '#fff4e2'

// ── shared little props for this film
// a phone: a coloured header strip and an optional message bubble that pops in
function phone(x, cx, cy, k, head, msg, sent, { headCol = MINT, msgCol = ROSE, rot = 0.05, msgSize = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.fillStyle = headCol; x.fillRect(-100, -146, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -122)
  if (msg && sent > 0.01) {
    x.save(); x.translate(4, -6); x.scale(sent, sent)
    const lines = msg.split('|').map(s => s.trim())
    const h = lines.length * msgSize * 1.25 + 30
    x.fillStyle = msgCol; x.fillRect(-96, -h / 2, 192, h)
    x.fillStyle = INK; x.font = `800 ${msgSize}px ${INTER}`
    lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 15 + msgSize * 1.25 * (i + 0.5)))
    x.restore()
  }
  x.restore()
}
// a tiny pal star with a placard on a stick
function placard(x, t, id, cx, cy, size, text, k, { col = GOLD, mood = 'happy', seed = 31, tears = 0, look } = {}) {
  if (k <= 0.01) return
  signChar(x, t, id, cx, cy, size * k, { mood, seed, glyph: false, tears, look })
  x.fillStyle = INK; x.fillRect(cx + size * 0.42 - 5, cy - size * 1.05, 10, size * 0.9)
  label(x, cx + size * 0.42, cy - size * 1.1, text, k, { size: 28, bg: col, rot: -0.04 })
}
// a little table top line
function table(x, cx, cy, w) { x.fillStyle = INK; x.fillRect(cx - w / 2, cy, w, 22); x.fillStyle = WOOD; x.fillRect(cx - w / 2 + 4, cy + 4, w - 8, 14) }

const SUN = ['..Y..Y..', 'Y..YY..Y', '..YYYY..', '.YYOOYY.', '.YYOOYY.', '..YYYY..', 'Y..YY..Y', '..Y..Y..']
const SUN_C = { Y: GOLD, O: '#ffe9a8' }
const MILK = ['.WW.', 'WWWW', 'WSSW', 'WSSW', 'WWWW', 'WWWW']
const MILK_C = { W: WHITE, S: SKYB }
// a blanket fort: a striped triangle with a little flag
function fort(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -150); x.lineTo(170, 70); x.lineTo(-170, 70); x.closePath(); x.fill()
  x.save(); x.beginPath(); x.moveTo(0, -138); x.lineTo(158, 62); x.lineTo(-158, 62); x.closePath(); x.clip()
  for (let i = -6; i < 6; i++) { x.fillStyle = i % 2 ? PINK : BONE; x.fillRect(i * 34, -150, 34, 230) }
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -60); x.lineTo(46, 70); x.lineTo(-46, 70); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-3, -200, 6, 56); x.fillStyle = MINT; x.fillRect(3, -200, 40, 24)
  x.restore()
}
// an airplane window with a cloud going by
function planeWindow(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-110, -150, 220, 300, 90); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.roundRect(-100, -140, 200, 280, 82); x.fill()
  x.fillStyle = INK; x.beginPath(); x.roundRect(-78, -118, 156, 236, 66); x.fill()
  x.save(); x.beginPath(); x.roundRect(-72, -112, 144, 224, 60); x.clip()
  x.fillStyle = SKYB; x.fillRect(-80, -120, 160, 240)
  const cx2 = 80 - ((t * 60) % 240)
  x.fillStyle = '#fff'; for (const [bx, by, r] of [[0, 0, 26], [26, 6, 20], [-24, 8, 18]]) { x.beginPath(); x.arc(cx2 + bx, 10 + by, r, 0, 7); x.fill() }
  x.restore(); x.restore()
}
// a little diving board
function divingBoard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -12, 260, 24); x.fillStyle = BONE; x.fillRect(-146, -8, 252, 16)
  x.fillStyle = INK; x.fillRect(-150, 12, 24, 140); x.fillStyle = SKYB; x.fillRect(-60, 150, 300, 40)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Strangers in the queue? | *Laughing now.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      const ids = [['taurus', 690], ['virgo', 860]]
      ids.forEach(([id, px], i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, px, 1030, 150 * k, { mood: lt > 1.0 ? 'happy' : 'neutral', look: [-1, 0], seed: 71 + i, glyph: false, hops: lt > 1.0 ? [P.t0 + 1.4 + i * 0.1, P.t0 + 1.8 + i * 0.1] : [] })
      })
      bubble(x, 780, 720, 'HA HA HA', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 44, col: GOLD, tail: 'bc' })
    } },
  { sign: S, cap: 'Picnic rained out? | *Blanket fort.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fort(x, 780, 990, pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 780, 700, 'INDOOR PICNIC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You’ll always mention | *the spinach.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 1020, 180 * k, { mood: lt > 1.6 ? 'heart' : 'wide', look: [-1, 0], seed: 73, glyph: false })
      bubble(x, 520, 650, 'left tooth. | you’re welcome.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 800, 1180, 'TRUE FRIEND', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A milk run | *becomes a road trip.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      drawBits(x, MILK, MILK_C, 780, 950, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.1 })
      label(x, 780, 720, 'GONE: 4 HOURS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 780, 1140, 'SAW A WATERFALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bad news? | You find *the bright side.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -220, y: 40 },
    front(x, t, lt, P) {
      const rise = ease.outCubic(prog(lt, 0.4, 1.6))
      drawBits(x, SUN, SUN_C, 790, 1000 - 180 * rise, 28 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: t * 0.3 })
      label(x, 790, 1120, 'SILVER LINING: FOUND', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Friends get braver | *around you.*', mood: 'happy', look: [1, 0], star: { x: -270, y: 60, s: 240 }, hops: [1.2, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      divingBoard(x, 720, 960, k)
      if (k > 0.01) signChar(x, t, 'libra', 680, 880, 140 * k, { mood: lt > 1.4 ? 'sparkle' : 'wide', look: [1, 1], seed: 74, glyph: false, hops: lt > 1.6 ? [P.t0 + 1.9] : [] })
      bubble(x, 440, 640, 'YOU GOT THIS!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'You say hello | *in every language.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'hola!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      bubble(x, 830, 820, 'ciao!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      bubble(x, 740, 990, 'salut!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      bubble(x, 820, 1140, 'hej!', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Your first-date stories? | *Legendary.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), '✦ IT’S A MATCH', 'so then | the goat | ran off…', pop01(t, P.t0 + 0.7, 0.3, 2.2), { msgCol: GOLD, msgSize: 30 })
      label(x, 780, 1110, 'REPLY: TELL ME MORE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You give them | *the window seat.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      planeWindow(x, 790, 890, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1110, 'SEAT 12A: YOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a105', key: 'C', accent: '#c9a6ff', solo: S, ending: 'lesson',
  title: 'Sagittarius, | your gift *is this.*',
  cameos: CAMEOS,
  group: { cap: 'Sunshine. | *With a passport.*', mood: 'sparkle' },
  lesson: { text: 'Your freedom makes room | *for everyone.*', chip: 'SPIRIT: FREE' },
  last: {
    text: 'Where to next? | *Bring snacks.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1150, t - lt + 0.6, 10, 280, 0.3) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
