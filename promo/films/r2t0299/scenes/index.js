// r2t0299: star_talk, SOLO, "Virgos when mad | *be like.*" (topic: Virgos when they're mad be like) (~45 s vertical, lofi · D)
// One sign the whole way: nine ways a mad Virgo shows it, each pushed to the most extreme. Ending: callback (the mug
// from the sticky-note card finally gets rinsed).
//   0.0–3.6    "Virgos when mad | *be like.*"
//   3.6–37.8   nine cards: cleaned the kitchen twice, angrily · went for a run, mapped the route first · a list of everything
//              you did (item 47) · the silent treatment, colour-coded · reorganised the closet by disappointment
//              · "I'm fine", ironed the socks · a strongly worded sticky note · re-did your packing · calmed down,
//              scheduled a debrief
//  37.8        "Furious. | But *organised.*"
//  41.2        CALLBACK: "The mug got rinsed. | *Virgo: thrilled.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', RED = '#e23d4e', CREAM = '#fff4e2'
const ST = { x: -200 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const SPONGE = ['GGGGGGGG', 'GGGGGGGG', 'YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY']
const IRON = ['....KKKKK.', '...KSSSSK.', '..KSSSSSSK', '.KSSSSSSSK', 'KKKKKKKKKK', 'KRRRRRRRRK', '.KKKKKKKK.']
const SOCK = ['.WWW', '.WWW', '.WWW', '.PPP', 'WWWW', 'WWWW', 'PPP.']
const MUG = ['KKKKKKK..', 'KCCCCCKKK', 'KCCCCCK.K', 'KCCCCCKKK', 'KCCCCCK..', '.KKKKK...']
const SHOE = ['..KKKK...', '.KOOOOK..', 'KOOOOOOKK', 'KKKKKKKKK']

function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -134, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = bg; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.25))
  x.restore()
}

const CAMEOS = [
  { sign: 'virgo', cap: 'Cleaned the kitchen. | *Twice. Angrily.*', mood: 'squint', look: [1, 0], star: ST, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SPONGE, { G: '#4ac77d', Y: GOLD }, 790 + Math.sin(lt * 14) * 60, 860, 22 * k, { rot: Math.sin(lt * 14) * 0.2 })
      sparkles(x, t, 790, 860, P.t0 + 0.7, 7, 170, 0.3); sparkles(x, t, 790, 860, P.t0 + 1.6, 7, 190, 0.9)
      L(x, 790, 1080, 'SPOTLESS (FURIOUS)', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Mad? Went for a run. | *Mapped the route first.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = CREAM; x.fillRect(-152, -142, 304, 284)
        x.strokeStyle = '#c9c9d8'; x.lineWidth = 2; for (let i = -120; i <= 120; i += 40) { x.beginPath(); x.moveTo(i, -142); x.lineTo(i, 142); x.stroke(); x.beginPath(); x.moveTo(-152, i); x.lineTo(152, i); x.stroke() }
        const p = clamp((lt - 0.4) / 1.2), pts = [[-120, 120], [-120, -40], [0, -40], [0, 80], [120, 80], [120, -120]]
        x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(...pts[0])
        const seg = p * (pts.length - 1)
        for (let i = 1; i <= Math.ceil(seg); i++) { const f = Math.min(1, seg - (i - 1)); x.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)) }
        x.stroke(); x.restore()
      }
      L(x, 790, 1090, 'PACE: FURIOUS', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Made a list | of *everything you did.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), h = 140 + 360 * ease.outCubic(clamp((lt - 0.3) / 1.3))
      if (k > 0.01) {
        x.save(); x.translate(790, 580); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -10, 280, h + 20); x.fillStyle = CREAM; x.fillRect(-132, -2, 264, h + 4)
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'
        for (let y = 36, i = 1; y < h - 6; y += 34, i++) x.fillText(`${i}. ${['the dishes', 'the tone', 'the sigh', 'the towel', 'Tuesday', 'the mug'][i % 6]}`, -116, y)
        x.restore()
      }
      L(x, 790, 1130, 'ITEM 47: THE SIGH', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Silent treatment. | *Colour-coded.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -160, 340, 320); x.fillStyle = CREAM; x.fillRect(-162, -152, 324, 304)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText('NOT TALKING', 0, -120)
        const C = [RED, RED, '#ffb34a', '#ffb34a', GOLD, '#4ac77d', '#4ac77d']
        const n = Math.floor(clamp((lt - 0.3) / 1.2) * 7)
        for (let i = 0; i < n; i++) { x.fillStyle = C[i]; x.fillRect(-140 + (i % 4) * 72, -90 + Math.floor(i / 4) * 90, 60, 70) }
        x.restore()
      }
      L(x, 790, 1110, 'RED: VERY. GREEN: SOON.', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.04, 26)
    } },
  { sign: 'virgo', cap: 'Sorted the closet | by *disappointment.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 10)
        const C = [MINT, SKYB, GOLD, '#ffb34a', RED]
        for (let i = 0; i < 5; i++) { const sx = -136 + i * 68; x.fillStyle = INK; x.fillRect(sx - 4, -140, 8, 30); x.fillRect(sx - 30, -112, 60, 150); x.fillStyle = C[i]; x.fillRect(sx - 24, -106, 48, 138) }
        x.restore()
      }
      L(x, 650, 1020, 'A LITTLE', pop01(t, P.t0 + 0.9, 0.3, 2), MINT, -0.06, 24)
      L(x, 900, 1080, 'VERY', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, 0.06, 32)
    } },
  { sign: 'virgo', cap: 'Said “I’m fine.” | *Ironed the socks.*', mood: 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'I’m fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      drawBits(x, SOCK, { W: BONE, P: PINK }, 760, 900, 22 * pop01(t, P.t0 + 0.5, 0.3, 2))
      drawBits(x, IRON, { K: INK, S: '#d8dbe8', R: SKYB }, 820 + Math.sin(lt * 6) * 50, 830, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 790, 1110, 'SOCK CREASES: ZERO', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Wrote a strongly worded | *sticky note.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), ['PLEASE.', 'RINSE.', 'THE.', 'MUG.'], { size: 40 })
      L(x, 790, 1110, 'UNDERLINED: 3 TIMES', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'virgo', cap: 'You packed the bag. | They *repacked it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), neat = lt > 1.1
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-180, -110, 360, 220); x.fillStyle = '#8a4a2e'; x.fillRect(-172, -102, 344, 204)
        const C = [PINK, SKYB, GOLD, MINT, LAV, '#ffb34a']
        for (let i = 0; i < 6; i++) {
          x.save()
          if (neat) x.translate(-130 + (i % 3) * 100, -60 + Math.floor(i / 3) * 90)
          else { x.translate(-100 + ((i * 53) % 200), -50 + ((i * 37) % 100)); x.rotate(i * 0.7) }
          x.fillStyle = INK; x.fillRect(-4, -4, 88, 68); x.fillStyle = C[i]; x.fillRect(0, 0, 80, 60); x.restore()
        }
        x.restore()
      }
      L(x, 790, 680, neat ? 'REPACKED ✓' : 'YOUR PACKING', 1, neat ? MINT : BONE, 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Calmed down. | Scheduled *a debrief.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ['DEBRIEF', '9:00 SHARP', 'bring notes'], { bg: CREAM, size: 34, rot: 0.04 })
      L(x, 790, 1100, 'AGENDA: 12 POINTS', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0299', key: 'D', accent: ACC, solo: 'virgo', ending: 'callback',
  title: 'Virgos when mad | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Furious. | But *organised.*', mood: 'squint' },
  last: {
    text: 'The mug got rinsed. | *Virgo: thrilled.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 1080, 280 * k, { mood: lt > 1.2 ? 'heart' : 'wide', seed: 7, hops: [t0 + 1.3, t0 + 2.0] })
      note(x, 740, 1080, 0.85 * pop01(t, t0 + 0.5, 0.4, 2), ['PLEASE.', 'RINSE.', 'THE.', 'MUG.'], { size: 40 })
      if (lt > 1.1) L(x, 760, 1090, '✓ DONE', pop01(t, t0 + 1.1, 0.3, 2.6), MINT, -0.12, 56)
      if (lt > 1.1) { sparkles(x, t, 740, 1090, t0 + 1.1, 9, 200, 0.3) }
      if (lt > 1.6) hearts(x, t, 380, 950, t0 + 1.6, { n: 6, life: 1.6, spread: 220, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
