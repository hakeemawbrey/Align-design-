// v3a020: star_advice, ADVICE ROLLCALL, "What each sign's | heart needs." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, one warm, specific line each about what that sign's heart needs, with one light gag.
//   0.0–3.6    "What each sign's | *heart needs.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ someone who can keep up (a race, both win) · ♉ slow mornings, alarm off · ♊ someone who loves every
//              version (three Geminis, all welcome) · ♋ a home that hugs back · ♌ a standing ovation, then a hug
//              · ♍ someone who notices the little things (a magnifier finds a tiny heart) · ♎ peace and a matching set
//              · ♏ trust, earned and kept (the vault opens) · ♐ freedom with a home base (a postcard: back Sunday)
//              · ♑ someone proud of the climb · ♒ someone to be weird with (beep / boop) · ♓ someone who cries too
//  49.2        "Every heart | *wants something.*"  The twelve fly up into a group photo.
//  52.6        callback: "Pisces found one. | *They both cried.*"  the tissue box comes back, two boxes now.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

// ── small prop helpers (local to this film)
const RED = '#e23d4e', ROSE = '#ff9ccf', WOOD = '#c98f2a', CREAM = '#fff4e2', ORANGE = '#ffb34a', GREEN = '#5fd068'
/** a bone card with an ink outline and a soft shadow; fn draws inside, in local coords centred on the card */
function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head = null, headH = 56 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = head; x.fillRect(-w / 2, -h / 2, w, headH) }
  if (fn) fn()
  x.restore()
}
/** text helper */
function say(x, s, px, py, { size = 34, color = INK, font = INTER, weight = 800, align = 'center' } = {}) {
  x.font = `${weight} ${size}px ${font}`; x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
/** a phone; fn draws on its screen (local coords, screen 224 × 330 centred) */
function phone(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -165, 224, 330)
  if (fn) fn()
  x.restore()
}

// ── props
const FLAG = ['KWKWKW', 'WKWKWK', 'KWKWKW', 'WKWKWK', 'P.....', 'P.....', 'P.....', 'P.....', 'P.....', 'P.....']
const FLAG_C = { K: INK, W: '#fff', P: '#c9c4d8' }
const CLOCK = ['B......B', '.BBBBBB.', 'BWWWWWWB', 'BWWKWWWB', 'BWWKWWWB', 'BWWKKKWB', 'BWWWWWWB', '.BBBBBB.', '.B....B.']
const CLOCK_C = { B: RED, W: '#fff', K: INK }
const HOUSE = ['....RR....', '...RRRR...', '..RRRRRR..', '.RRRRRRRR.', 'RRRRRRRRRR', '.CCCCCCCC.', '.CPPCCDDC.', '.CPPCCDDC.', '.CCCCCDDC.', '.CCCCCDDC.']
const HOUSE_C = { R: RED, C: CREAM, P: PINK, D: WOOD }
const VAULT = ['GGGGGGGG', 'GKKKKKKG', 'GKGGGGKG', 'GKGWWGKG', 'GKGWWGKG', 'GKGGGGKG', 'GKKKKKKG', 'GGGGGGGG']
const VAULT_C = { G: '#c9c4d8', K: '#8d86a8', W: GOLD }
const UFO = ['...SSS...', '..SSSSS..', 'MMMMMMMMM', 'MGMGMGMGM', '.MMMMMMM.']
const UFO_C = { S: SKYB, M: '#c9c4d8', G: GOLD }
const TISSUE = ['...WW...', '..WWWW..', 'BBBWWBBB', 'BPPPPPPB', 'BPWPPWPB', 'BPPPPPPB', 'BBBBBBBB']
const TISSUE_C = { W: '#fff', B: SKYB, P: '#bfe9ff' }
const MUG = ['.MMMM..', '.MHMM.M', '.MMMMM.M', '.MMMMM.M', '.MMMMMM.', '..MMM...']
const MUG_C = { M: ROSE, H: '#fff' }
const MUG2_C = { M: LAV, H: '#fff' }

// a little magnifier (ring + handle) over a tiny heart that grows when found
function magnifier(x, t, cx, cy, k, found) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  drawBits(x, HEART_S, { H: '#ff4f86', W: '#fff' }, 0, 0, 5 + 7 * found)
  x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = GOLD; x.lineWidth = 12; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.stroke()
  x.fillStyle = INK; x.save(); x.rotate(0.8); x.fillRect(92, -18, 120, 36); x.fillStyle = WOOD; x.fillRect(98, -11, 108, 22); x.restore()
  x.restore()
}
const HEART_S = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
// rising bars: a climb, with a heart flag on the top step
function climb(x, t, cx, cy, P, lt) {
  for (let i = 0; i < 4; i++) {
    const k = pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 1.8)
    if (k <= 0.01) continue
    const h = (70 + i * 70) * k, bx = cx - 150 + i * 90
    x.fillStyle = INK; x.fillRect(bx - 6, cy - h - 6, 78, h + 6)
    x.fillStyle = i === 3 ? MINT : '#8d86a8'; x.fillRect(bx, cy - h, 66, h)
  }
  const f = pop01(t, P.t0 + 1.1, 0.3, 2.2)
  if (f > 0.01) drawBits(x, HEART_S, { H: '#ff4f86', W: '#fff' }, cx + 123, cy - 330, 9 * f)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Someone who can | *keep up.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', star: { x: -190 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      const run = ease.inOutCubic(prog(lt, 0.2, 1.4))
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      drawBits(x, FLAG, FLAG_C, 900, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (k > 0.01) signChar(x, t, 'sagittarius', lerp(560, 760, run), 990, 170 * k, { mood: lt > 1.5 ? 'heart' : 'happy', look: [1, 0], seed: 31, glyph: false, hops: [P.t0 + 0.5, P.t0 + 0.9, P.t0 + 1.3] })
      bubble(x, 640, 640, 'race you!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1150, 'RESULT: A TIE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Slow mornings. | *No alarms.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const shake = lt < 1.0 ? Math.sin(t * 60) * 0.12 : 0
      drawBits(x, CLOCK, CLOCK_C, 790, 800, 26 * k, { rot: shake })
      if (lt > 1.0) { x.save(); x.globalAlpha = clamp((lt - 1.0) * 4); x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.moveTo(680, 690); x.lineTo(900, 910); x.moveTo(900, 690); x.lineTo(680, 910); x.stroke(); x.strokeStyle = RED; x.lineWidth = 12; x.stroke(); x.restore() }
      label(x, 790, 1060, 'SUNDAY: ALL WEEK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Someone who loves | *every version.*', mood: 'sparkle', star: { x: -200 },
    front(x, t, lt, P) {
      const M = ['wink', 'squint', 'heart']
      ;[640, 790, 940].forEach((px, i) => {
        const k = pop01(t, P.t0 + 0.25 + i * 0.25, 0.35, 2)
        if (k > 0.01) signChar(x, t, 'gemini', px, 920, 140 * k, { mood: M[i], seed: 32 + i, glyph: false, hops: [P.t0 + 1.5 + i * 0.08] })
      })
      label(x, 790, 1110, 'ALL OF THEM. YES.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 820, P.t0 + 1.5, { n: 5, life: 1.4, spread: 260, cell: 6, seed: 2 })
    } },
  { sign: 'cancer', cap: 'A home that | *hugs back.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const sq = lt > 1.1 && lt < 1.6 ? 0.06 * Math.sin((lt - 1.1) * 12) : 0
      drawBits(x, HOUSE, HOUSE_C, 800, 880, 30 * k, { sx: 1 + sq, sy: 1 - sq })
      bubble(x, 800, 610, 'welcome home', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bc' })
      hearts(x, t, 800, 1000, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 5 })
    } },
  { sign: 'leo', cap: 'A standing ovation. | *Then a hug.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -190 }, hops: [0.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', lerp(820, 600, ease.inOutCubic(prog(lt, 1.2, 1.6))), 980, 190 * k, { mood: lt > 1.4 ? 'heart' : 'wide', look: [-1, 0], seed: 35, glyph: false, hops: [P.t0 + 0.4, P.t0 + 0.7, P.t0 + 1.0] })
      bubble(x, 790, 640, 'BRAVO!!', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.3 ? 1 : 0.001), { size: 50, tail: 'br' })
      bubble(x, 700, 640, 'c’mere.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 46, col: PINK, tail: 'bc' })
      if (lt > 1.5) hearts(x, t, 480, 820, P.t0 + 1.5, { n: 6, life: 1.4, spread: 240, cell: 7, seed: 6 })
    } },
  { sign: 'virgo', cap: 'Someone who notices | *the little things.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const sweep = ease.inOutCubic(prog(lt, 0.3, 1.1))
      magnifier(x, t, lerp(660, 780, sweep), lerp(700, 820, sweep), k, ease.outBack(clamp((lt - 1.1) / 0.4)))
      label(x, 790, 1100, 'NEW HAIRCUT? NOTICED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Peace, calm, | and *matching mugs.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), k2 = pop01(t, P.t0 + 0.6, 0.35, 2)
      x.fillStyle = INK; x.fillRect(620, 1010, 340, 22); x.fillStyle = WOOD; x.fillRect(624, 1014, 332, 14)
      drawBits(x, MUG, MUG_C, 710, 940, 18 * k)
      drawBits(x, MUG, MUG_C, 880, 940, 18 * k2, { sx: -1 })
      notes(x, t, 790, 860, { n: 3, cell: 5, col: ROSE, alpha: clamp(lt - 0.8), seed: 7 })
      label(x, 790, 700, 'A SET. OF COURSE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Trust. | *Earned and kept.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const open = ease.inOutCubic(prog(lt, 1.0, 1.5))
      drawBits(x, VAULT, VAULT_C, 790, 860, 34 * k, { sx: 1 - 0.75 * open })
      if (open > 0.3) drawBits(x, HEART_S, { H: '#ff4f86', W: '#fff' }, 790, 860, 16 * pop01(t, P.t0 + 1.25, 0.3, 2.2))
      label(x, 790, 1110, 'ACCESS: GRANTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Freedom. | With *a home base.*', mood: 'sparkle', star: { x: -190 }, hops: [0.5],
    front(x, t, lt, P) {
      card(x, 790, 830, 340, 240, pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.06, head: SKYB, headH: 120 }, () => {
        x.fillStyle = '#5fd068'; x.fillRect(-170, -40, 340, 20)
        drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '..Y..'], { Y: GOLD }, 110, -82, 8)
        say(x, 'back sunday!', 0, 30, { size: 34 }); say(x, 'miss you x', 0, 80, { size: 26, color: '#8d86a8' })
      })
      label(x, 790, 1080, 'POSTCARD: HOME', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Someone proud | *of the climb.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      climb(x, t, 800, 1060, P, lt)
      bubble(x, 760, 620, 'so proud of you', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Someone to be weird | *with.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, UFO, UFO_C, 790 + 20 * Math.sin(t * 2.4), 700, 26 * k)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 990, 170 * pop01(t, P.t0 + 0.5, 0.35, 2), { mood: 'sparkle', seed: 37, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 470, 600, 'beep.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 830, 1140, 'boop!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'Someone who | *cries too.*', tears: 2, mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 960, 210 * k, { mood: 'heart', look: [-1, 0], seed: 38, glyph: false, tears: 2, hops: [P.t0 + 1.3] })
      drawBits(x, TISSUE, TISSUE_C, 560, 1110, 17 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 750, 680, 'SAME MOVIE. SAME TEARS.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a020', key: 'C', accent: PINK, ending: 'callback',
  title: 'What each sign’s | *heart needs.*',
  cameos: CAMEOS,
  group: { cap: 'Every heart | *wants something.*' },
  last: {
    text: 'Pisces found one. | *They both cried.*',
    draw(x, t, lt) {
      drawBits(x, TISSUE, TISSUE_C, 420, 1100, 22 * pop01(t, t - lt + 0.5, 0.35, 2), { rot: -0.08 })
      drawBits(x, TISSUE, TISSUE_C, 660, 1100, 22 * pop01(t, t - lt + 0.8, 0.35, 2), { rot: 0.08 })
      label(x, 540, 1300, 'TISSUES: SHARED', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 1000, t - lt + 1.0, { n: 8, life: 2.2, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
