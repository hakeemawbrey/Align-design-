// trs3pisces: THE SIGNS AS… v3 SOLO, "Being a Pisces | be like." (~51 s vertical, signs3kit social cut, music: lofi · G)
// The whole film is one sign (makeFilm solo mode). The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Being a Pisces | *be like.*"  One big crying Pisces pops in, then clears for the cards.
//   3.6–37.8   nine everyday Pisces moments (3.8 s each), each pushed to the extreme, and Pisces cries in every one:
//              cried at an ad for socks · zoned out in a meeting, lived a whole life (lighthouse, goats, grandkids)
//              · a normal bus ride became a film · a stranger sighed, Pisces sobbed · can't recycle a box, it has
//              feelings · read their own birth chart, felt so seen · finished a show, grieving for a week
//              · a dog looked at them, life changed · a Capricorn match texted "morning.", Pisces framed it
//  37.8        "Every feeling. | *All at once.*"  The big Pisces is back.
//  41.0        LESSON UNLOCKED: "Love a Pisces? | Love the *big heart.*"  HEART: FULL
//  46.9        "Cap said “morning.” | Pisces heard *forever.*" over the match card: Pisces + Capricorn (the framed text).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e'

// ── props
const TV = [
  '....K.....K....',
  '.....K...K.....',
  '......K.K......',
  'GGGGGGGGGGGGGGG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GGGGGGGGGGGGGGG',
  '..G.........G..',
]
const TV_C = { K: '#9aa5c4', G: '#6b62a8', S: '#2a2350' }
const SOCK = [
  'WWWWW..',
  'RRRRR..',
  'RWRWR..',
  'RRRRR..',
  'RWRWRRR',
  'RRRRRRR',
  '.RRRRR.',
]
const SOCK_C = { W: '#fff4e2', R: '#ff8fb1' }
const CLAP = [
  'WKWKWKWKWKWKWK',
  'KWKWKWKWKWKWKW',
  'GGGGGGGGGGGGGG',
  'GWWWWWWWWWWWWG',
  'GWWWWWWWWWWWWG',
  'GWWWWWWWWWWWWG',
  'GWWWWWWWWWWWWG',
  'GWWWWWWWWWWWWG',
  'GWWWWWWWWWWWWG',
  'GGGGGGGGGGGGGG',
]
const CLAP_C = { W: '#fff4e2', K: '#2a2350', G: '#3a3168' }
const STRANGER = [
  '..HHHH..',
  '.HHHHHH.',
  '.FFFFFF.',
  '.FKFFKF.',
  '.FFFFFF.',
  '..FFFF..',
  '.CCCCCC.',
  'CCCCCCCC',
  'CCCCCCCC',
  'CCCCCCCC',
  '.CC..CC.',
  '.CC..CC.',
]
const STRANGER_C = { H: '#6b62a8', F: '#c9b8a8', K: '#2a2350', C: '#9aa5c4' }
const BOX = [
  'TT.TTTTTT.TT',
  '.TTTTTTTTTT.',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBKBBBBKBBB',
  'BBBKBBBBKBBB',
  'BBBBBBBBBBBB',
  'BBBBBKKBBBBB',
  'BBBBKBBKBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
]
const BOX_C = { T: '#e0a56a', B: '#c98a4e', K: '#2a2350' }
const TISSUE = [
  '...WW...',
  '..WWWW..',
  'BBBBBBBB',
  'BPBBBBPB',
  'BBBBBBBB',
  'BPBBBBPB',
]
const TISSUE_C = { W: '#ffffff', B: '#8fe3ff', P: '#ff8fb1' }
const DOG = [
  '.EE......EE..',
  'EEEDDDDDDEEE.',
  'EEDDDDDDDDEE.',
  '.DDKDDDDKDD..',
  '.DDDDDDDDDD..',
  '.DDDDNNDDDD..',
  '..DDDPPDDD...',
  '...DDDDDD....',
]
const DOG_C = { E: '#8a4a2e', D: '#e8b07a', K: '#2a2350', N: '#2a2350', P: '#ff8fb1' }
const DOGBODY = [
  '..DDDDDDDDDDDD.',
  '.DDDDDDDDDDDDDD',
  '.DDDDDDDDDDDDDD',
  '.DDDDDDDDDDDDDD',
  '..DD.DD...DD.DD',
  '..DD.DD...DD.DD',
]
const TAIL = ['..D', '.DD', 'DD.']

// a small birth-chart wheel (Pisces reads their own)
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD
  for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
// rain streaks on the bus window (the film Pisces is starring in)
function rain(x, t, l, tp, w, h, a) {
  if (a <= 0.01) return
  x.save(); x.beginPath(); x.rect(l, tp, w, h); x.clip(); x.globalAlpha = a
  x.strokeStyle = 'rgba(143,227,255,0.55)'; x.lineWidth = 4; x.lineCap = 'round'
  for (let i = 0; i < 22; i++) {
    const rx = l + ((i * 97) % w), ry = tp + (((i * 53) + t * 520) % (h + 60)) - 30
    x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 8, ry + 34); x.stroke()
  }
  x.restore()
}
// a gold picture frame (Pisces framed the text)
function frame(x, cx, cy, w, h, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = GOLD; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#c99a2e'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28)
  x.fillStyle = INK; x.fillRect(-w / 2 + 22, -h / 2 + 22, w - 44, h - 44)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2 + 28, -h / 2 + 28, w - 56, h - 56)
  x.fillStyle = INK; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('morning.', 0, 4)
  x.restore()
}

const CAMEOS = [
  // 1 · home: a sock ad
  { sign: 'pisces', cap: 'Cried at an ad | for *socks.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TV, TV_C, 790, 860, 20 * k, { rot: 0.04 })
      drawBits(x, SOCK, SOCK_C, 790 + 6 * Math.sin(t * 5), 890, 16 * pop01(t, P.t0 + 0.45, 0.3, 2), { rot: 0.04 + 0.12 * Math.sin(t * 4) })
      label(x, 790, 1100, 'SO COZY. SO TRUE.', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 32, bg: PINK, rot: -0.05 })
      sparkles(x, t, 790, 860, P.t0 + 0.5, 6, 170, 0.4)
    } },
  // 2 · work: a meeting daydream
  { sign: 'pisces', cap: 'Zoned out for a second. | Lived a *whole life.*', mood: lt => lt < 1.75 ? 'sleepy' : 'wide', tears: lt => lt < 1.75 ? 2 : 1, star: { x: -190, y: 40 },
    front(x, t, lt, P) {
      const STEP = ['moved to a | lighthouse', 'nine goats', 'grandkids!']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      for (let i = 0; i < 3; i++) { const d = pop01(t, P.t0 + 0.15 + i * 0.08, 0.2, 2); x.save(); x.fillStyle = BONE; x.globalAlpha = d > 0.01 ? 1 : 0; const r = (7 + i * 5) * d; x.fillRect(470 + i * 55 - r, 760 - i * 50 - r, 2 * r, 2 * r); x.restore() }
      bubble(x, 760, 620, STEP[n], pop01(t, P.t0 + 0.3 + n * 0.45, 0.22, 2.2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 760, 800, `AGE: ${[34, 61, 88][n]}`, pop01(t, P.t0 + 0.35, 0.3, 2), { size: 30, bg: GOLD, font: MONO, weight: 700, rot: 0.05 })
      bubble(x, 760, 1020, 'Boss: | …you ok?', pop01(t, P.t0 + 1.75, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  // 3 · commute: the bus ride is a film
  { sign: 'pisces', cap: 'A normal bus ride. | Became *a film.*', mood: 'sparkle', look: [1, -1], tears: lt => lt < 0.8 ? 1 : 2, star: { x: -170 },
    back(x, t, lt, P) { rain(x, t, 120, 490, 840, 720, clamp((lt - 0.2) * 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CLAP, CLAP_C, 790, 780, 20 * k, { rot: 0.06 })
      if (k > 0.5) { x.save(); x.translate(790, 780); x.rotate(0.06); x.fillStyle = '#fff4e2'; x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.globalAlpha = clamp((k - 0.5) * 2); x.fillStyle = INK; x.fillText('SCENE 1:', 0, 10); x.fillText('THE BUS', 0, 60); x.restore() }
      label(x, 790, 1040, 'SAD VIOLINS: ON', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 32, bg: SKYB, rot: -0.05 })
      sparkles(x, t, 790, 780, P.t0 + 0.55, 6, 160, 0.2)
    } },
  // 4 · out: a stranger sighed
  { sign: 'pisces', cap: 'A stranger sighed. | Pisces *sobbed.*', mood: lt => lt < 0.95 ? 'neutral' : 'wide', look: [1, 0], tears: lt => lt < 0.95 ? 0 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, STRANGER, STRANGER_C, 820, 930, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 820, 650, 'sigh.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, tail: 'bc' })
      label(x, 540, 1130, 'FEELINGS: ABSORBED', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 5 · home: the box has feelings
  { sign: 'pisces', cap: 'Can’t recycle the box. | It has *feelings.*', mood: lt => lt < 1.0 ? 'squint' : 'heart', tears: 2, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOX, BOX_C, 800, 950, 22 * k, { rot: 0.03 * Math.sin(t * 3) })
      bubble(x, 800, 680, 'keep me?', pop01(t, P.t0 + 0.55, 0.25, 2.2), { size: 44, tail: 'bc' })
      label(x, 540, 1150, 'BOXES KEPT: 31', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 34, bg: '#e0a56a', rot: 0.04, font: MONO, weight: 700 })
    } },
  // 6 · Align: their own birth chart
  { sign: 'pisces', cap: 'Read their own chart. | Felt *so seen.*', mood: lt => lt < 1.1 ? 'sparkle' : 'heart', look: [1, 0], tears: lt => lt < 1.1 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 790, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1010, 'SENSITIVE: VERY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 760, 560, 'it’s me!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 370, 900, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
  // 7 · home: the show ended
  { sign: 'pisces', cap: 'Finished a show. | Grieving *for a week.*', mood: lt => lt < 1.0 ? 'wide' : 'sleepy', tears: 3, star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.25))
      for (let i = 0; i < n; i++) drawBits(x, TISSUE, TISSUE_C, 800 + (i % 2 ? 12 : -12), 1090 - i * 76, 13 * pop01(t, P.t0 + 0.3 + i * 0.25 * 1.0, 0.2, 2), { rot: (i % 3 - 1) * 0.06 })
      label(x, 800, 640, 'THE END', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 44, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 540, 560, 'DAY 6', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.06, font: MONO, weight: 700 })
    } },
  // 8 · the park: a dog looked at them
  { sign: 'pisces', cap: 'A dog looked at them. | *Life changed.*', mood: lt => lt < 0.9 ? 'wide' : 'heart', tears: lt => lt < 0.9 ? 1 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const wag = Math.sin(t * 18) * 0.5
      drawBits(x, TAIL, { D: '#e8b07a' }, 905, 960, 18 * k, { rot: wag })
      drawBits(x, DOGBODY, { D: '#e8b07a' }, 795, 1010, 18 * k)
      drawBits(x, DOG, DOG_C, 705, 890, 18 * k, { rot: 0.05 * Math.sin(t * 3) })
      hearts(x, t, 705, 820, P.t0 + 0.8, { n: 6, life: 2.0, spread: 220, cell: 8, seed: 6 })
      label(x, 790, 610, 'BEST DAY OF MY LIFE', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  // 9 · Align: a match texts "morning."
  { sign: 'pisces', cap: 'Match texted “morning.” | Pisces *framed it.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', tears: lt => lt < 1.2 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.6, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 600, '✦ MATCH: CAPRICORN', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      const framed = lt > 1.2
      if (!framed) bubble(x, 790, 840, 'morning.', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 64, col: LAV, tail: 'bl' })
      else frame(x, 790, 840, 380, 220, pop01(t, P.t0 + 1.2, 0.3, 2.4))
      sparkles(x, t, 790, 840, P.t0 + 1.25, 8, 210, 0.3)
      label(x, 790, 1060, 'HUNG IN HALLWAY', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 30, bg: PINK, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'trs3pisces', key: 'G', accent: '#6fc3ff', solo: 'pisces',
  title: 'Being a Pisces | *be like.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'capricorn', chip: "IT'S A MATCH" },
  group: { cap: 'Every feeling. | *All at once.*', mood: 'heart' },
  lesson: { text: 'Love a Pisces? | Love the *big heart.*', chip: 'HEART: FULL' },
  last: {
    text: 'Cap said “morning.” | Pisces heard *forever.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
