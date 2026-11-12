// r2t0147: THE SIGNS AS… v3, ROLLCALL, "The signs | at a poetry reading." (~62 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs at | *a poetry reading.*"
//   3.6–49.2   ♈ signed up first, poem: one word · ♉ came for poems, stayed for the snack table · ♊ read two poems at once
//              · ♋ poem about their mom, room out of tissues · ♌ five-minute slot, took forty · ♍ corrected the poet's line
//              breaks · ♎ snapped for everyone, equally · ♏ performed their birth chart as a poem · ♐ freestyled an hour
//              about their gap year · ♑ poem titled "Quarterly Goals" · ♒ poem in binary, one standing ovation
//              · ♓ cried before the first line
//  49.2        "Every one | *a masterpiece.*"
//  52.4        LESSON UNLOCKED: "Say the big feeling. | *Someone needs it.*"  STATUS: SNAPPED
//  58.3        "Leo’s *still* reading."  a little Leo at the mic, MINUTE 52.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

const ACC = '#c9a6ff'
const ST = { x: -170 }

const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', '..KK..', '..KK..', '..KK..', '..KK..', '..KK..', '.KKKK.', 'KKKKKK']
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'YYYYYYYYYYYY', 'RRRRRRRRRRRR', '.BBBBBBBBBB.']
const SAND_C = { B: '#e8a24a', G: '#5fd068', Y: '#ffd86b', R: '#d0453a' }
const TISSUE = ['....WW......', '...WWWW.....', '..WW..WW....', 'KKKKKKKKKKKK', 'KPPPPPPPPPPK', 'KPPHPPPPHPPK', 'KPPPPPPPPPPK', 'KKKKKKKKKKKK']
const TISSUE_C = { W: '#ffffff', K: INK, P: SKYB, H: PINK }
const BERET = ['....K....', '..RRRRR..', '.RRRRRRR.', 'RRRRRRRRR', '.KKKKKKK.']

/** a sheet of paper with ruled lines; fn draws on it */
function paper(x, cx, cy, k, fn, { w = 260, h = 330, rot = 0.05 } = {}) {
  card(x, cx, cy, w, h, k, { bg: CREAM, rot }, () => {
    x.fillStyle = '#c9d8f0'; for (let i = 0; i < 7; i++) x.fillRect(-w / 2 + 20, -h / 2 + 60 + i * 40, w - 40, 3)
    if (fn) fn()
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Signed up first. | Poem: *one word.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [0.5],
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, 520, 1000, 13 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 650, 'SIGN-UP: #1', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 860, '“WIN.”', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 72, tail: 'bl' })
      label(x, 790, 1080, 'THE END.', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Came for poems. | Stayed for *the snacks.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 1040, 360, 40, k, { bg: WOOD, rot: 0 })
      for (let i = 0; i < 3; i++) drawBits(x, SANDWICH, SAND_C, 690 + i * 100, 990, 7 * k, { alpha: lt > 0.9 + i * 0.4 ? 0 : 1 })
      label(x, 790, 700, 'SNACK TABLE', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GREEN, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'poem? what poem?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Read two poems. | *At the same time.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: 0, y: 40 },
    front(x, t, lt, P) {
      bubble(x, 300, 640, 'O moon, so—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'br' })
      bubble(x, 780, 640, '—my cat, Greg—', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      bubble(x, 300, 1110, '—bright tonight—', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'br' })
      bubble(x, 780, 1110, '—ate a sock.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'A poem about their mom. | *Everyone* sobbed.', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: lt => lt > 1.2 ? 1 : 0, star: ST,
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 680, '“ODE TO MOM”', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04 })
      label(x, 790, 1090, 'TISSUES LEFT: 0', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Five-minute slot. | Took *forty.*', mood: 'sparkle', star: ST, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const m = Math.round(lerp(5, 40, clamp((lt - 0.3) / 1.6)))
      clock(x, 790, 790, 120, pop01(t, P.t0 + 0.2, 0.35, 2), 8, m)
      label(x, 790, 1000, `MINUTE ${m}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 600, 'stanza 19!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Fixed the poet’s | *line breaks.* Live.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = INK; for (let i = 0; i < 5; i++) x.fillRect(-100, -95 + i * 40, 150 + (i * 37) % 60, 10)
        x.strokeStyle = RED; x.lineWidth = 7
        for (let i = 0; i < 3; i++) { const p = ease.outCubic(prog(lt, 0.7 + i * 0.3, 0.95 + i * 0.3)); if (p > 0) { x.beginPath(); x.ellipse(70, -90 + i * 80, 40 * p, 22 * p, 0, 0, Math.PI * 2); x.stroke() } }
      })
      label(x, 790, 1110, 'NOTES: 46', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Snapped for everyone. | *Equally.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(lt * 3)
      for (let i = 0; i < Math.min(5, n); i++) label(x, 680 + (i % 2) * 220, 640 + i * 105, 'snap', 1, { size: 40, bg: i % 2 ? PINK : LAV, rot: i % 2 ? 0.08 : -0.08, font: MONO, weight: 700 })
      label(x, 790, 1150, 'FAIR IS FAIR', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Performed their birth chart. | *As a poem.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, BERET, { R: '#2a2350', K: INK }, F.x, F.top - 20, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      chart(x, 790, 790, 130, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      bubble(x, 790, 1060, 'Mars… in shadow.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Freestyled an hour. | About *their gap year.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const L = ['so, the hostel—', 'then a goat—', 'found myself—', 'lost myself—']
      bubble(x, 330, 680, L[Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'br' })
      label(x, 330, 1050, 'VERSE: 73', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Poem titled | *“Quarterly Goals.”*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        txt(x, 'Q1: rise.', -100, -70, { size: 32, align: 'left' })
        txt(x, 'Q2: grind.', -100, -10, { size: 32, align: 'left' })
        txt(x, 'Q3: profit.', -100, 50, { size: 32, align: 'left' })
        if (lt > 1.1) txt(x, 'Q4: rest?', -100, 110, { size: 32, align: 'left', color: '#b9b0a0' })
      })
      label(x, 790, 1110, 'NO.', pop01(t, P.t0 + 1.8, 0.3, 2.6), { size: 48, bg: GREEN, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Poem in binary. | Standing ovation: *one.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 680, '01001000 | 01001001', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl', font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 1.1, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 1010, 170 * k, { mood: 'sparkle', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.5, P.t0 + 1.9] })
      label(x, 790, 870, 'GOT IT!', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried before | *the first line.*', mood: 'wide', tears: lt => lt < 0.6 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        txt(x, '“The—”', 0, -40, { size: 48 })
        x.fillStyle = SKYB; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(-80 + i * 32, 60 + (i % 2) * 30, 12, 0, Math.PI * 2); x.fill() }
      })
      label(x, 790, 1110, 'POEM: SOGGY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0147', key: 'E', accent: ACC, ending: 'lesson',
  title: 'The signs at | *a poetry reading.*',
  cameos: CAMEOS,
  group: { cap: 'Every one | *a masterpiece.*' },
  lesson: { text: 'Say the big feeling. | *Someone needs it.*', chip: 'STATUS: SNAPPED' },
  last: {
    text: 'Leo’s *still* reading.',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      drawBits(x, MIC, MIC_C, 650, 760, 12 * k)
      if (k > 0.01) signChar(x, t, 'leo', 490, 720, 220 * k, { mood: 'sparkle', look: [1, 0], seed: 52, hops: [t - lt + 1.2, t - lt + 2.2] })
      label(x, 780, 600, 'MINUTE 52', pop01(t, t - lt + 1.0, 0.3, 2.4), { size: 40, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
