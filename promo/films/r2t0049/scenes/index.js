// r2t0049: THE SIGNS AS… v3, SOLO film, "Leos when it's | not about them." (~51 s vertical, signs3kit, lofi · D)
// One Leo, nine moments where the spotlight is on someone else, each the most extreme Leo reaction. Ending: lesson.
//   0.0–3.6    "Leos when it’s | *not about them.*"
//   3.6–37.8   your birthday, they gave the speech · group photo, front row (only row) · rain forecast, taken personally
//              · someone else got complimented, wilting (brightness 40%) · your story, they had a better one
//              · group chat moved on, steered it back · a post about Virgo, commented "and Leo?" · clapped for your
//              win louder than anyone · your big day, they only shone a little
//  37.8        "Main character | *energy.*"
//  41.0        LESSON: "Big light. | *Bigger heart.*"  STATUS: STILL ICONIC
//  46.9        "Anyway — | *back to Leo.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'leo', ORANGE = '#ffb34a', RED = '#e23d4e', BLUE = '#6fc3ff'

const CAKE = [
  '.F..F..F..F.',
  '.C..C..C..C.',
  '.C..C..C..C.',
  'PPPPPPPPPPPP',
  'WWWWWWWWWWWW',
  'PPPPPPPPPPPP',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
]
const CAKE_C = { F: GOLD, C: SKYB, P: PINK, W: '#fff4e2', B: '#c98f5a' }
const CLOUD = [
  '...WWWW.....',
  '..WWWWWWWW..',
  '.WWWWWWWWWWW',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
]
const DROP = ['.B.', 'BBB', '.B.']
const HAT = [
  '....Y....',
  '...PPP...',
  '...PYP...',
  '..PPPPP..',
  '..PYPPY..',
  '.PPPPPPP.',
  'PPYPPPYPP',
]
const HAT_C = { P: PINK, Y: GOLD }

function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-158, -214, 328, 440)
  x.fillStyle = INK; x.fillRect(-170, -226, 340, 452)
  x.fillStyle = '#2a2350'; x.fillRect(-160, -216, 320, 432)
  x.fillStyle = '#140c30'; x.fillRect(-146, -186, 292, 372)
  if (head) { x.fillStyle = headCol; x.fillRect(-146, -186, 292, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -158) }
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(right ? 30 : -30, -80 + i * 90); x.scale(kk, kk)
    x.font = `800 ${size}px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -28, w + 8, 56); x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 1)
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Your birthday. | They *gave the speech.*', mood: 'sparkle', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 1030, 16 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 760, 700, 'thank you all | for coming', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 880, 'NOT THEIR BIRTHDAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Group photo. | *Front row. Only row.*', mood: 'wink', star: { x: 0, y: 20, s: 340 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(540, 840); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-330, -280, 660, 520); x.fillStyle = '#fff4e2'; x.fillRect(-320, -270, 640, 500)
      x.fillStyle = '#2a2350'; x.fillRect(-300, -250, 600, 400)
      x.restore()
      ;['taurus', 'cancer', 'libra', 'aquarius'].forEach((id, i) => signChar(x, t, id, 300 + i * 160, 700 + (i % 2) * 20, 110 * k, { mood: 'neutral', look: [0, -1], seed: 30 + i, glyph: false, glow: 0.4 }))
    },
    front(x, t, lt, P) {
      label(x, 540, 1130, 'SAY “LEO!”', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rain forecast. | *Took it personally.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CLOUD, { W: '#cfd3e6' }, 790, 680, 22 * k)
      if (lt > 0.5) for (let i = 0; i < 6; i++) { const ph = (t * 1.6 + i / 6) % 1; drawBits(x, DROP, { B: BLUE }, 680 + i * 44, 760 + ph * 200, 9, { alpha: 1 - ph }) }
      bubble(x, 790, 1050, 'on MY | weekend?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Someone else got praised. | *Visibly wilting.*', mood: lt => lt > 0.9 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -180 }, squash: lt => -0.12 * ease.inOutCubic(prog(lt, 0.9, 1.6)),
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 960, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 800, 700, 'great job, | Virgo!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      const b = Math.round(lerp(100, 40, ease.inOutCubic(prog(lt, 0.9, 1.6))))
      label(x, 380, 640, `LEO: ${b}%`, pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You told a story. | They had *a better one.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 690, 'I saw a | dolphin once', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (1 - prog(lt, 1.0, 1.1)), { size: 36, col: SKYB, tail: 'br' })
      bubble(x, 760, 690, 'I WAS | the dolphin', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 760, 690, P.t0 + 1.4, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Chat moved on. | *They steered it back.*', mood: 'wink', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 750, 850, pop01(t, P.t0 + 0.15, 0.3, 2) * 0.88, { head: 'GROUP CHAT', headCol: SKYB, lines: [
        ['cute dog!!', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['so cute', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), true],
        ['anyway, me:', ORANGE, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'A post about Virgo. | Commented *“and Leo?”*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(760, 830); x.rotate(0.04); x.scale(k * 0.92, k * 0.92)
        x.fillStyle = INK; x.fillRect(-176, -206, 352, 412); x.fillStyle = '#2a2350'; x.fillRect(-168, -198, 336, 396)
        x.fillStyle = '#140c30'; x.fillRect(-150, -180, 300, 200)
        x.fillStyle = MINT; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♍︎ VIRGO', 0, -130)
        x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.fillText('sign of the week', 0, -80)
        x.restore()
        signChar(x, t, 'virgo', 760, 890, 120 * k, { mood: 'happy', seed: 9, glyph: false, glow: 0.5 })
      }
      label(x, 760, 1060, 'and Leo??', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: ORANGE, rot: -0.05 })
    } },
  { sign: S, cap: 'Clapped for your win. | *Loudest by miles.*', mood: lt => lt > 0.8 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      const n = Math.min(11, 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 11))
      label(x, 790, 740, `APPLAUSE: ${n}/10`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'THAT’S MY | FRIEND!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 560, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Your big day? | They shone *a little less.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        const Fc = signChar(x, t, 'cancer', 800, 960, 230 * k, { mood: lt > 1.3 ? 'sparkle' : 'happy', look: [-1, 0], seed: 17, glyph: false, hops: [P.t0 + 1.4] })
        const d = ease.outCubic(prog(lt, 0.7, 1.2))
        if (lt > 0.65) drawBits(x, HAT, HAT_C, 800, lerp(560, Fc.top - 40, d), 12)
      }
      label(x, 800, 1140, 'YOUR DAY. (MOSTLY.)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 820, P.t0 + 1.3, 7, 160, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0049', key: 'D', accent: ORANGE, solo: S, ending: 'lesson',
  title: 'Leos when it’s | *not about them.*',
  cameos: CAMEOS,
  group: { cap: 'Main character | *energy.*', mood: 'sparkle' },
  lesson: { text: 'Big light. | *Bigger heart.*', chip: 'STATUS: STILL ICONIC' },
  last: {
    text: 'Anyway — | *back to Leo.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1150, t - lt + 0.6, 9, 260, 0.2, [GOLD, BONE, ORANGE]) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
