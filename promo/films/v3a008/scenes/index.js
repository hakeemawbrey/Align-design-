// v3a008: zodiac.advice444, ADVICE SOLO, "Libra, stop doing | this in love." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a lovable Libra habit in love, with a warm reframe, one gag each.
// Ending: lesson (lesson beat, then the last line).
//   0.0–3.6    "Libra, stop doing | *this in love.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              "I don't mind!" (thought: I mind.) · text draft #40, draft one was cute · hands over both ice creams:
//              YOUR TURN TO PICK · says sorry to a chair · feelings swept under the rug (a lump: FEELINGS)
//              · a bouquet, waiting for the perfect moment: NOW IS FINE · an Aries profile: give them a chance
//              · a mood board for date night: THEY JUST WANT YOU · serving everyone, empty chair: SIT DOWN. EAT.
//  37.8        "Kind to them. | *Kind to you.*"  Libra comes back, big.
//  41.0        LESSON UNLOCKED: "Your wants count | *in love too.*"  BALANCE: YOURS
//  46.9        "Libra picked | *their favourite.*"  The ice cream is back (mint, obviously).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', ROSE = '#ff9ccf'
const S = 'libra'

// ── props
const CONE = ['.SSSS.', 'SSSSSS', 'SSWSSS', 'SSSSSS', 'CCCCCC', '.CCCC.', '.CCCC.', '..CC..', '..CC..']
const CHAIR = ['WW......', 'WW......', 'WW......', 'WW......', 'WWWWWWWW', 'WWWWWWWW', 'W......W', 'W......W']
const FLOWERS = ['.R.P.R.', 'RYRPYPR', '.R.P.R.', '..GGG..', '...G...', '..PPP..', '.PPPPP.', '..PPP..']
const FLOWERS_C = { R: RED, P: PINK, Y: GOLD, G: '#5fd068' }
const PLATE = ['..YYYYY..', '.YYRYYRY.', 'WWWWWWWWW', '.WWWWWWW.']
const PLATE_C = { Y: '#ffd45c', R: RED, W: '#fff4e2' }
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  fn(); x.restore()
}
function thought(x, cx, cy, text, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; for (const [px, py, r] of [[-70, 0, 62], [0, -24, 72], [70, 0, 62], [0, 30, 60]]) { x.beginPath(); x.arc(px, py, r + 6, 0, Math.PI * 2); x.fill() }
  x.fillStyle = BONE; for (const [px, py, r] of [[-70, 0, 62], [0, -24, 72], [70, 0, 62], [0, 30, 60]]) { x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(-110, 96, 20, 0, Math.PI * 2); x.arc(-140, 136, 12, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(-110, 96, 15, 0, Math.PI * 2); x.arc(-140, 136, 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}
function rug(x, t, cx, cy, k, lump) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = 30 + 70 * lump
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 40); x.lineTo(-90, 40); x.quadraticCurveTo(0, 40 - h * 2, 90, 40); x.lineTo(200, 40); x.lineTo(200, 64); x.lineTo(-200, 64); x.closePath(); x.fill()
  x.fillStyle = '#c45d85'; x.beginPath(); x.moveTo(-192, 46); x.lineTo(-90, 46); x.quadraticCurveTo(0, 46 - h * 2, 90, 46); x.lineTo(192, 46); x.lineTo(192, 58); x.lineTo(-192, 58); x.closePath(); x.fill()
  x.fillStyle = GOLD; for (let i = 0; i < 9; i++) x.fillRect(-200 + i * 50, 64, 6, 18)
  x.restore()
}
function moodBoard(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -160, 380, 320); x.fillStyle = '#c9a07a'; x.fillRect(-182, -152, 364, 304)
  const C = [ROSE, LAV, MINT, GOLD, SKYB, PINK, '#ff9a3c', '#c45d85', '#fff4e2', '#7dffb0', '#b866ff', RED]
  for (let i = 0; i < 12; i++) { const c = i % 4, r = Math.floor(i / 4); x.save(); x.translate(-130 + c * 86, -96 + r * 96); x.rotate(((i * 7) % 5 - 2) * 0.05); x.fillStyle = INK; x.fillRect(-36, -36, 72, 72); x.fillStyle = C[i]; x.fillRect(-32, -32, 64, 64); x.fillStyle = RED; x.fillRect(-5, -40, 10, 10); x.restore() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: '“I don’t mind”? | *You do. Say so.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 560, 640, 'I don’t mind!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      thought(x, 790, 860, '(I mind.)', pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1110, 'SAY IT. GENTLY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Draft forty? | *Draft one was cute.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      const n = Math.min(40, 1 + Math.floor(Math.max(0, lt) * 28))
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        x.fillStyle = ROSE; x.fillRect(-96, -60, 196, 70); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('hi!! (v40)', 2, -25)
        x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.fillText(`DRAFT #${n}`, 0, -120)
        x.fillStyle = INK; x.fillRect(-96, 90, 196, 50); x.fillStyle = MINT; x.fillRect(-92, 94, 188, 42); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('SEND', 0, 116)
      })
      label(x, 780, 1110, 'JUST SEND IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their favourite again? | *Pick yours too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -230 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const give = ease.inOutCubic(prog(lt, 0.4, 1.0)), back = ease.inOutCubic(prog(lt, 1.3, 1.8))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CONE, { S: '#8a4a2e', W: '#fff', C: '#e7b46a' }, lerp(560, 880, give), 960, 22 * k)
      drawBits(x, CONE, { S: MINT, W: '#fff', C: '#e7b46a' }, lerp(620, 880, give) - 300 * back, 960, 22 * k, { rot: back * -0.2 })
      label(x, 780, 680, 'YOUR TURN TO PICK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saying sorry | *to the furniture.*', mood: lt => lt > 0.8 ? 'wide' : 'happy', look: [1, 0], star: { x: -220 }, hops: [0.6],
    front(x, t, lt, P) {
      const shake = lt > 0.6 && lt < 0.9 ? Math.sin(t * 60) * 6 : 0
      drawBits(x, CHAIR, { W: WOOD }, 760 + shake, 1000, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 600, 680, 'oh! SORRY!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1180, 'IT’S A CHAIR.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Under the rug? | *Talk it out instead.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -220 },
    front(x, t, lt, P) {
      const lump = 1 - ease.inOutCubic(prog(lt, 1.3, 1.8))
      rug(x, t, 690, 1040, 1.3 * pop01(t, P.t0 + 0.2, 0.35, 2), lump)
      label(x, 690, lerp(940, 900, 1 - lump), lump > 0.5 ? 'FEELINGS (HIDDEN)' : 'FEELINGS (SHARED)', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 28, bg: lump > 0.5 ? LAV : MINT, rot: -0.04, font: MONO, weight: 700 })
      if (lump < 0.5) hearts(x, t, 690, 960, P.t0 + 1.8 * 1.29, { n: 5, life: 1.2, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Waiting for perfect? | *Now is lovely.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, FLOWERS_C, 560, 1000, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.15 })
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 830, 1000, 180 * k, { mood: lt > 1.4 ? 'heart' : 'sleepy', look: [-1, 0], seed: 21, glyph: false })
      label(x, 780, 700, 'NOW IS FINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'An Aries? | *Give them a chance.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -230 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, 780, 850, k, () => {
        x.fillStyle = MINT; x.fillRect(-100, -146, 200, 46)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ NEW MATCH', 0, -122)
        x.fillStyle = '#ff6b4a'; x.fillRect(-90, -80, 180, 150)
        x.fillStyle = INK; x.font = `700 100px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.fillText('♈︎', 0, -4)
        x.fillStyle = BONE; x.font = `800 28px ${INTER}`; x.fillText('loves: you', 0, 110)
      })
      hearts(x, t, 780, 960, P.t0 + 1.4 * 1.29, { n: 5, life: 1.4, spread: 160, cell: 6, seed: 6 })
    } },
  { sign: S, cap: 'A mood board? | *They just want you.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      moodBoard(x, t, 780, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1110, 'DATE NIGHT: ANYWHERE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Serving everyone? | *Sit down and eat.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, PLATE, PLATE_C, 660 + i * 130, 960 - (i % 2) * 20, 13 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      drawBits(x, CHAIR, { W: WOOD }, 800, 1120, 14 * pop01(t, P.t0 + 0.8, 0.35, 2))
      label(x, 790, 720, 'SIT DOWN. EAT.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a008', key: 'F', accent: ROSE, solo: S, ending: 'lesson',
  title: 'Libra, stop doing | *this in love.*',
  cameos: CAMEOS,
  group: { cap: 'Kind to them. | *Kind to you.*', mood: 'heart' },
  lesson: { text: 'Your wants count | *in love too.*', chip: 'BALANCE: YOURS' },
  last: {
    text: 'Libra picked | *their favourite.*',
    draw(x, t, lt) {
      drawBits(x, CONE, { S: MINT, W: '#fff', C: '#e7b46a' }, 300, 1150, 22 * pop01(t, t - lt + 0.5, 0.35, 2), { rot: -0.15 })
      label(x, 790, 1170, 'MINT. OBVIOUSLY.', pop01(t, t - lt + 1.0, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
