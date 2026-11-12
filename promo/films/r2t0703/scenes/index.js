// r2t0703: star_talk, SOLO (cancer), "Your Cancer sibling | *be like.*" (signs3kit social cut, music: lofi · G).
// One sign the whole way: nine sibling moments, each the most extreme (and loving) Cancer version. Ending: lesson.
//   borrowed your hoodie in 2019 · remembers every birthday, even your plant's · kept your old room as a museum
//   · you sneezed once, a care package arrived · teases you all day, defends you to everyone · forty baby photos in the
//   family chat · checked your match's compatibility, twice · still calls you by your baby nickname · the goodbye hug
//   lasts twenty minutes
//   lesson "Soft shell, huge heart. | *Hug them back.*" · last "Still not giving | *the hoodie back.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, gift, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -180 }
const HOODIE = [
  '...GGGGGG...',
  '..GG....GG..',
  '.GGGGGGGGGG.',
  'GGGGGWWGGGGG',
  'GGGGGWWGGGGG',
  'GG.GGGGGG.GG',
  'GG.GGGGGG.GG',
  'GG.GPPPPG.GG',
  'GG.GPPPPG.GG',
  '...GGGGGG...',
  '...GGGGGG...',
]
const HOODIE_C = { G: '#7a6bb8', W: BONE, P: '#5d4f9e' }
const hoodie = (x, cx, cy, cell, o) => drawBits(x, HOODIE, HOODIE_C, cx, cy, cell, o)

const CAMEOS = [
  { sign: S, cap: 'Borrowed your hoodie. | *In 2019.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      hoodie(x, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'STILL “BORROWING”', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 32)
      bubble(x, 800, 1110, 'it’s mine now', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Remembers every birthday. | *Even your plant’s.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 320, head: 'BIRTHDAYS ♥', headBg: PINK, headInk: INK, lines: ['you: mar 3', 'mom: jun 9', 'your plant:', 'apr 12 ✦'], size: 30, align: 'left', progress: prog(lt, 0.3, 1.4), rot: -0.04 })
    } },
  { sign: S, cap: 'You moved out. | *Your room’s a museum.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      // a velvet rope in front of your old bed
      x.save(); x.translate(800, 920); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-170, -60, 340, 120); x.fillStyle = SKYB; x.fillRect(-162, -52, 324, 104); x.fillStyle = BONE; x.fillRect(-150, -90, 110, 50)
      for (const px of [-190, 190]) { x.fillStyle = INK; x.fillRect(px - 12, 30, 24, 150); x.fillStyle = GOLD; x.fillRect(px - 7, 35, 14, 140); x.fillRect(px - 16, 18, 32, 18) }
      x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(-190, 40); x.quadraticCurveTo(0, 120, 190, 40); x.stroke()
      x.restore()
      L(x, 800, 650, 'DO NOT TOUCH', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, -0.04, 36)
    } },
  { sign: S, cap: 'You sneezed once. | *A care package arrived.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      const open = prog(lt, 0.9, 1.4)
      gift(x, 800, 1000, 1.2 * pop01(t, P.t0 + 0.3, 0.3, 2), { w: 220, h: 150, col: SKYB, rib: PINK, open })
      if (open > 0.2) { bits(x, 'TISSUE', 740, lerp(1000, 820, ease.outCubic(prog(lt, 1.0, 1.5))), 10); bits(x, 'MUG', 870, lerp(1000, 830, ease.outCubic(prog(lt, 1.1, 1.6))), 10) }
      L(x, 800, 650, 'EXPRESS DELIVERY', pop01(t, P.t0 + 0.5, 0.3, 2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Teases you all day. | *Defends you always.*', mood: lt => lt > 1.1 ? 'squint' : 'wink', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      friend(x, t, 'leo', 820, 990, 230, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, 0] })
      bubble(x, 790, 680, lt < 1.1 ? 'nice haircut, | nerd' : 'only I | can say that', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: lt < 1.1 ? BONE : SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Family chat? | *Forty baby photos.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.25))
      phone(x, t, 810, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FAMILY ♥', headCol: PINK, lines: Array.from({ length: 4 }, (_, i) => [`baby you #${i * 11 + 1}`, i % 2 ? SKYB : BONE, i < n ? 1 : 0]), size: 26 })
      L(x, 810, 1130, 'PHOTOS SENT: 40', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Checked your match’s | *chart. Twice.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1060, lt < 1.2 ? 'CHECKING… 1/2' : 'APPROVED ✓', pop01(t, P.t0 + 0.6, 0.3, 2), lt < 1.2 ? STEEL : MINT, 0.04, 34)
    } },
  { sign: S, cap: 'You’re thirty. | *Still their “little bean.”*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'hi little | bean!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: PINK, tail: 'bl' })
      L(x, 800, 1000, 'BEAN AGE: 30', pop01(t, P.t0 + 1.2, 0.3, 2.2), BONE, 0.04, 34)
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 6, seed: 8 })
    } },
  { sign: S, cap: 'Goodbye hug. | *Twenty minutes long.*', mood: 'heart', look: [1, 0], star: { x: -120 }, hops: [0.3],
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 620, 900, 240, pop01(t, P.t0 + 0.1, 0.3, 2), { mood: lt > 1.3 ? 'sleepy' : 'happy', look: [-1, 0] })
      const m = 19 - Math.floor(clamp((lt - 0.3) / 1.8) * 19)
      L(x, 800, 660, `HUG: ${String(m).padStart(2, '0')}:59 LEFT`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.04, 34)
      hearts(x, t, 500, 820, P.t0 + 0.6, { n: 6, life: 2.0, spread: 220, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0703', key: 'G', accent: ACC, solo: S, ending: 'lesson',
  title: 'Your Cancer sibling | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Annoying. Protective. | *Forever.*', mood: 'heart' },
  lesson: { text: 'Soft shell, huge heart. | *Hug them back.*', chip: 'STATUS: FAMILY' },
  last: {
    text: 'Still not giving | *the hoodie back.*',
    draw(x, t, lt) { hoodie(x, 800, 1560, 22 * pop01(t, t - lt + 0.8, 0.35, 2), { rot: 0.08 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
