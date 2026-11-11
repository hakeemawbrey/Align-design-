// v3t074: THE SIGNS AS… v3, SOLO film, "Virgos in love | be like." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine love moments, each pushed to the most extreme (and lovable) Virgo version.
// The format look lives in ../../signs3kit.js. Ending: lesson.
//   0.0–3.6    "Virgos in love | *be like.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards: butterflies told to line up · ironed your love letter · your toothbrush moved in, got a label
//              · anniversary dinner cooked to the gram · love notes, bullet-pointed · matched, fixed your grammar
//              · folds your laundry into hearts · your messy room, breathing through it · wedding binder since age seven
//  37.8        "Picky? | *Smitten.*"  The big Virgo comes back.
//  41.0        LESSON UNLOCKED: "Their love is | in *the little things.*"  LOVE: ORGANISED
//  46.9        "The butterflies | are *still in line.*"  (the butterflies come back, in a perfect row)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const VG = '#7dffb0', RED = '#e23d4e', ORANGE = '#ffb34a'

// ── props
const FLY = [
  'PP...PP',
  'PPP.PPP',
  'PPPKPPP',
  '.PPKPP.',
  'PP.K.PP',
]
const IRON = [
  '......KKKK..',
  '.....K....K.',
  '...SSSSSSSSS',
  '..SSSSSSSSSS',
  '.SSSSSSSSSSS',
  'MMMMMMMMMMMM',
]
const IRON_C = { K: '#2a2350', S: SKYB, M: '#c9c9d8' }
const BRUSH = [
  'WWW',
  'WWW',
  '.P.',
  '.P.',
  '.P.',
  '.P.',
  '.P.',
  '.P.',
]
const SHIRT_HEART = HEARTISH()
function HEARTISH() { return ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'] }
const SOCK = [
  '..WW',
  '..WW',
  '..RR',
  '..WW',
  'WWWW',
  'WWW.',
]
const SOCK_C = { W: '#fff4e2', R: RED }

// a paper card with header + lines
function card(x, cx, cy, k, { w = 280, h = 300, head = '', headBg = VG, body = [], rot = 0.05, size = 34, align = 'center', font = INTER } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.textBaseline = 'middle'
  if (head) { x.textAlign = 'center'; x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 58); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 31) }
  x.fillStyle = INK; x.font = `800 ${size}px ${font}`; x.textAlign = align
  const top = head ? -h / 2 + 58 : -h / 2, ax = align === 'left' ? -w / 2 + 24 : 0
  body.forEach((l, i) => x.fillText(l, ax, top + (h - (head ? 58 : 0)) * (i + 0.5) / body.length))
  x.restore()
}
// a kitchen scale with a readout
function kscale(x, cx, cy, k, txt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -26, 300, 30); x.fillRect(-126, 0, 252, 130)
  x.fillStyle = '#c9c9d8'; x.fillRect(-144, -20, 288, 18); x.fillStyle = '#9aa5c4'; x.fillRect(-120, 6, 240, 118)
  x.fillStyle = '#140c30'; x.fillRect(-96, 30, 192, 66)
  x.fillStyle = VG; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 64)
  // a tiny plate of pasta on top
  x.fillStyle = INK; x.fillRect(-90, -54, 180, 30); x.fillStyle = '#fff4e2'; x.fillRect(-84, -50, 168, 22)
  x.fillStyle = GOLD; x.fillRect(-50, -74, 100, 26); x.fillStyle = RED; x.fillRect(-20, -82, 40, 12)
  x.restore()
}
// a thick ring binder
function binder(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -150, 260, 320)
  x.fillStyle = INK; x.fillRect(-136, -166, 272, 332)
  x.fillStyle = PINK; x.fillRect(-128, -158, 256, 316)
  x.fillStyle = '#ffc2d4'; x.fillRect(-128, -158, 40, 316)
  for (let i = 0; i < 3; i++) { x.fillStyle = '#c9c9d8'; x.fillRect(-118, -110 + i * 100, 20, 20) }
  x.fillStyle = '#fff4e2'; x.fillRect(-70, -100, 180, 130)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('WEDDING', 20, -64); x.font = `700 26px ${MONO}`; x.fillText('VOL. 7', 20, -12)
  // page edges peeking out
  x.fillStyle = '#fff4e2'; for (let i = 0; i < 6; i++) x.fillRect(128, -140 + i * 50, 14, 30)
  x.restore()
}
function butterflies(x, t, cx, cy, n, k, lined) {
  const COLS = [PINK, GOLD, SKYB, LAV, VG]
  for (let i = 0; i < n; i++) {
    const tx = cx + (i - (n - 1) / 2) * 130, ty = cy
    const wx = cx + Math.sin(t * 2.3 + i * 2.1) * 120, wy = cy + Math.cos(t * 1.9 + i * 1.3) * 110
    const flap = 0.55 + 0.45 * Math.abs(Math.sin(t * 10 + i))
    drawBits(x, FLY, { P: COLS[i % 5], K: INK }, lerp(wx, tx, lined), lerp(wy, ty, lined), 14 * k, { sx: flap })
  }
}

const CAMEOS = [
  { sign: 'virgo', cap: 'Butterflies? | Told them *to line up.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      butterflies(x, t, 790, 850, 3, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.9, 1.5)))
      bubble(x, 790, 640, 'single file, please', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1080, 'FEELINGS: ORGANISED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: VG, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Got a love letter. | *Ironed it.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      const crumple = 1 - ease.inOutCubic(prog(lt, 0.7, 1.4))
      card(x, 790, 900, k, { w: 260, h: 190, body: ['dear you,', 'xo'], size: 36, rot: 0.05 + 0.25 * crumple * Math.sin(t * 9) })
      drawBits(x, IRON, IRON_C, lerp(700, 880, (Math.sin(lt * 5) + 1) / 2), 720, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 1100, 'CREASES: 0', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Your toothbrush moved in. | Got *a label.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, BRUSH, { W: '#fff4e2', P: VG }, 730, 850, 24 * k, { rot: -0.1 })
      drawBits(x, BRUSH, { W: '#fff4e2', P: PINK }, 850, 850, 24 * k, { rot: 0.1 })
      label(x, 730, 1010, 'MINE', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: VG, rot: -0.06, font: MONO, weight: 700 })
      label(x, 850, 1010, 'YOURS', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 28, bg: PINK, rot: 0.06, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'virgo', cap: 'Anniversary dinner? | Cooked *to the gram.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      const g = Math.min(250, Math.floor(clamp((lt - 0.4) / 1.1) * 250))
      kscale(x, 790, 900, pop01(t, P.t0 + 0.25, 0.35, 2), `${g}.0 g`)
      label(x, 790, 650, 'RECIPE: 250 g', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 30, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.6, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Love notes in your lunch. | *Bullet-pointed.*', mood: 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 330, h: 300, head: 'TODAY:', headBg: PINK, body: ['• you’re cute', '• drink water', '• love you (1/3)'], size: 30, align: 'left' })
      label(x, 790, 1100, 'NOTES 2 & 3: DINNER', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: VG, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'New match said “ur cute.” | *Fixed it.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 620, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: GOLD, rot: -0.05 })
      bubble(x, 790, 790, 'ur cute', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      // the red-pen fix
      const s = ease.outCubic(prog(lt, 0.9, 1.2))
      if (s > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(720, 795); x.lineTo(720 + 60 * s, 795); x.stroke(); x.restore() }
      bubble(x, 790, 980, 'you’re cute.', pop01(t, P.t0 + 1.25, 0.25, 2.2), { size: 44, col: VG, tail: 'bl' })
      label(x, 790, 1110, 'ALSO TRUE', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.05 })
    } },
  { sign: 'virgo', cap: 'Folds your laundry | *into hearts.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, GOLD]
      COLS.forEach((c, i) => drawBits(x, SHIRT_HEART, { H: c }, 790, 1000 - i * 90, 18 * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2)))
      label(x, 790, 650, 'EVEN THE SOCKS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'Your messy room? | *Breathing through it.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 790, 1020, 20 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.4 })
      label(x, 790, 860, 'ONE SOCK. ON THE FLOOR.', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 26, bg: RED, color: '#fff4e2', rot: -0.04 })
      bubble(x, 790, 660, 'in… out…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: VG, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Wedding binder? | *Since age seven.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      binder(x, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1110, 'SEATING CHART: DONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 790, 860, P.t0 + 0.8, 7, 190, 0.6)
    } },
]

const F = makeFilm({
  id: 'v3t074', key: 'F', accent: VG, solo: 'virgo', ending: 'lesson',
  title: 'Virgos in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Picky? | *Smitten.*', mood: 'heart' },
  lesson: { text: 'Their love is | in *the little things.*', chip: 'LOVE: ORGANISED' },
  last: {
    text: 'The butterflies | are *still in line.*',
    draw(x, t, lt) { butterflies(x, t, 540, 1180, 5, pop01(t, t - lt + 0.4, 0.35, 2), 1) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
