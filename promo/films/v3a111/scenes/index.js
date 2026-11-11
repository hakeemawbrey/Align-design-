// v3a111: star_advice, ADVICE SOLO, "What Pisces need | in love." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): what a Pisces deserves in love, one gag each. Pisces cries
// in every card (happy tears, mostly).
//   0.0–3.6    "What Pisces need | *in love.*"
//   3.6–37.8   nine cards: a goodnight text every night · a family-size box of tissues · someone who joins the daydream
//              castle · sad movie night: Cancer cries too · a match who asks how your heart is · the playlist kept sacred
//              (VOL. 9) · a boundary fence with a heart gate · a gift coming back the other way · Virgo holds the umbrella
//              over Pisces' own tears: TEAR-PROOF
//  37.8        "Feel it all. | *Love it all.*"
//  41.2        callback: "Family-size tissues. | *For two.*"  the tissue box comes back, Cancer and Pisces sharing it.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'pisces'
const RED = '#e23d4e', SEAF = '#7fe3d8', WOOD = '#c98f2a'

const card = (x, cx, cy, w, h, k, rot = 0, bg = BONE) => {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
// a phone with a header strip and one or two big message bubbles
function phone(x, cx, cy, k, head, headCol, msgs, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 300, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-132, -190, 264, 380)
  x.fillStyle = headCol; x.fillRect(-120, -178, 240, 44)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -155)
  msgs.forEach(([at, y, col, lines], i) => {
    const b = pop01(lt, at, 0.25, 2)
    if (b <= 0.01) return
    x.save(); x.translate(0, y); x.scale(b, b)
    const h = lines.length * 42 + 30
    x.fillStyle = INK; x.fillRect(-120, -h / 2 - 4, 240, h + 8); x.fillStyle = col; x.fillRect(-116, -h / 2, 232, h)
    x.fillStyle = INK; x.font = `800 34px ${INTER}`
    lines.forEach((l, j) => x.fillText(l, 0, -h / 2 + 15 + 42 * (j + 0.5) + 2))
    x.restore()
  })
  x.restore()
}
// a family-size tissue box
function tissues(x, t, cx, cy, k, big = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * big, k * big)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -60, 316, 190)
  x.fillStyle = INK; x.fillRect(-160, -80, 320, 200)
  x.fillStyle = SKYB; x.fillRect(-152, -72, 304, 184)
  x.fillStyle = '#6fc3ff'; for (let i = 0; i < 5; i++) x.fillRect(-140 + i * 62, 20, 30, 80)
  x.fillStyle = INK; x.fillRect(-70, -84, 140, 26); x.fillStyle = '#2a2350'; x.fillRect(-64, -80, 128, 18)
  // the tissue poking out, fluttering
  const f = Math.sin(t * 6) * 8
  x.fillStyle = INK; x.beginPath(); x.moveTo(-50, -70); x.quadraticCurveTo(-30 + f, -170, 0, -150); x.quadraticCurveTo(30 - f, -175, 50, -70); x.closePath(); x.fill()
  x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-42, -72); x.quadraticCurveTo(-26 + f, -160, 0, -140); x.quadraticCurveTo(26 - f, -164, 42, -72); x.closePath(); x.fill()
  x.restore()
}
// a thought cloud holding a little castle
const CASTLE = [
  'P.P.....P.P',
  'PPP.P.P.PPP',
  'PPP.PPP.PPP',
  'PPPPPPPPPPP',
  'PPPPPDPPPPP',
  'PPPPDDDPPPP',
]
function cloud(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const blobs = [[-110, 10, 80], [-30, -40, 100], [80, -20, 90], [130, 40, 60], [0, 50, 90], [-140, 60, 50]]
  x.fillStyle = INK; for (const [a, b, r] of blobs) { x.beginPath(); x.arc(a, b, r + 7, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#ffffff'; for (const [a, b, r] of blobs) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
  drawBits(x, CASTLE, { P: LAV, D: INK }, 0, 10, 16)
  x.restore()
}
function popcorn(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#fff4c2'; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(-50 + (i % 5) * 25, -64 - Math.floor(i / 5) * 22, 20, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -60); x.lineTo(70, -60); x.lineTo(55, 80); x.lineTo(-55, 80); x.closePath(); x.fill()
  for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? '#ffffff' : RED; x.fillRect(-60 + i * 30, -54, 30, 128) }
  x.restore()
}
// a cassette tape
function cassette(x, t, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 340, 220, k, 0.05, '#ff9ccf')
  x.fillStyle = '#fff4e2'; x.fillRect(-140, -90, 280, 60)
  x.fillStyle = INK; x.font = `800 31px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -60)
  x.fillStyle = INK; x.fillRect(-110, -10, 220, 80); x.fillStyle = '#2a2350'; x.fillRect(-104, -4, 208, 68)
  for (const sx of [-55, 55]) { x.save(); x.translate(sx, 30); x.rotate(t * 3); x.fillStyle = BONE; x.fillRect(-20, -20, 40, 40); x.fillStyle = INK; x.fillRect(-6, -20, 12, 40); x.restore() }
  x.restore()
}
// a little picket fence with a heart-shaped gate (gate swings open)
function fence(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -20, 400, 22); x.fillRect(-200, 50, 400, 22)
  for (const px of [-190, -150, -110, 110, 150, 190]) { x.fillStyle = INK; x.fillRect(px - 16, -90, 32, 200); x.fillStyle = BONE; x.fillRect(px - 11, -80, 22, 186); x.fillStyle = INK; x.beginPath(); x.moveTo(px - 16, -90); x.lineTo(px, -116); x.lineTo(px + 16, -90); x.fill() }
  x.fillStyle = BONE; x.fillRect(-200, -15, 400, 12); x.fillRect(-200, 55, 400, 12)
  x.save(); x.translate(-80, 0); x.scale(Math.max(0.15, 1 - open * 0.85), 1)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 80, 10, 22)
  x.restore()
  x.restore()
}
const GIFT = ['..R...R..', '...R.R...', 'YYYYRYYYY', 'YYYYRYYYY', 'BBBBRBBBB', 'BBBBRBBBB', 'BBBBRBBBB', 'BBBBRBBBB']
function umbrella(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-6, -10, 12, 260)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 196, Math.PI, 0); x.closePath(); x.fill()
  for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? GOLD : '#ffd97a'; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 188, Math.PI + i * Math.PI / 6, Math.PI + (i + 1) * Math.PI / 6); x.closePath(); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Someone who texts | *goodnight.* Every night.', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', tears: 1, look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), '☾ 11:58 PM', LAV, [[0.6, -40, BONE, ['goodnight ✦', 'sleep well']], [1.3, 100, MINT, ['night 47 ✓']]], lt)
    } },
  { sign: S, cap: 'Room for | *all the feelings.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: lt => lt > 1.3 ? 2 : 3, look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tissues(x, t, 790, 960, pop01(t, P.t0 + 0.4, 0.35, 2), 1.05)
      label(x, 790, 660, 'FAMILY SIZE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.05 })
    } },
  { sign: S, cap: 'Someone who joins | *the daydream.*', mood: 'sparkle', tears: 1, look: [1, -1], star: { x: -230, y: 60, s: 260 },
    front(x, t, lt, P) {
      cloud(x, 720, 720, pop01(t, P.t0 + 0.3, 0.4, 2))
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 820, 1010, 190 * k, { mood: 'sparkle', look: [-1, -1], seed: 31, glyph: false, hops: [P.t0 + 1.9] })
      label(x, 720, 1150, 'CASTLE: CO-OWNED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sad movie night? | *They cry too.*', mood: 'wide', tears: 3, look: [0, -1], star: { x: -190, y: 30, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 760, 910, 230 * k, { mood: 'wide', look: [0, -1], seed: 32, glyph: false, tears: lt > 1.1 ? 3 : 0 })
      popcorn(x, 560, 1110, pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 540, 610, 'THE DOG LIVES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A match who asks | *how your heart is.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: 1, look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      phone(x, 780, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), '✦ NEW MATCH', PINK, [[0.6, -50, LAV, ['how’s your', 'heart today?']], [1.4, 100, MINT, ['a lot.', 'story time?']]], lt)
    } },
  { sign: S, cap: 'Someone who respects | *the playlist.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', tears: 1, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      cassette(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), 'SONGS ABOUT YOU')
      label(x, 790, 1050, 'VOL. 9', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      if (lt > 0.6) notes(x, t, 790, 700, { n: 4, cell: 10, col: SKYB, seed: 3 })
    } },
  { sign: S, cap: 'Boundaries are | *romantic too.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', tears: 1, look: [1, 0], star: { x: -240, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fence(x, 760, 980, 0.95 * pop01(t, P.t0 + 0.3, 0.35, 2), ease.inOutCubic(prog(lt, 1.2, 1.6)))
      label(x, 760, 680, 'KNOCK FIRST ♥', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 42, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'You give so much. | *Let them give back.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', tears: lt => lt > 1.4 ? 3 : 1, star: { x: -220, s: 270 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), slide = ease.outCubic(prog(lt, 0.6, 1.2))
      if (k > 0.01) signChar(x, t, 'taurus', 830, 960, 210 * k, { mood: 'happy', look: [-1, 0], seed: 33, glyph: false })
      drawBits(x, GIFT, { R: RED, Y: GOLD, B: SKYB }, lerp(760, 560, slide), 1020, 16 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.08 })
      bubble(x, 800, 640, 'for you. | no reason.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: S, cap: 'Someone who stays | *for the big feelings.*', mood: 'wide', tears: 3, look: [0, -1], star: { x: -130, y: 60, s: 270 },
    back(x, t, lt, P) { umbrella(x, t, 470, 760, pop01(t, P.t0 + 0.6, 0.35, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 780, 980, 210 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 34, glyph: false })
      label(x, 760, 640, 'TEAR-PROOF', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'v3a111', key: 'D', accent: SEAF, solo: S, ending: 'callback',
  title: 'What Pisces need | *in love.*',
  cameos: CAMEOS,
  group: { cap: 'Feel it all. | *Love it all.*', mood: 'heart' },
  last: {
    text: 'Family-size tissues. | *For two.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      tissues(x, t, 540, 1150, k, 0.9)
      if (k > 0.01) {
        signChar(x, t, 'cancer', 320, 1020, 210 * k, { mood: 'heart', look: [1, 0], seed: 35, glyph: false, tears: 2, hops: [t - lt + 1.2] })
        signChar(x, t, 'pisces', 760, 1020, 210 * k, { mood: 'heart', look: [-1, 0], seed: 36, glyph: false, tears: 2, hops: [t - lt + 1.3] })
      }
      hearts(x, t, 540, 900, t - lt + 0.9, { n: 8, life: 2.2, spread: 520, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
