// v3a025: star_advice, ADVICE SOLO, "Leo, your gift | is this." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the warm things Leos give everyone, one gag each.
//   0.0–3.6    "Leo, your gift | *is this.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              shy people feel brave around you (Cancer: "um, actually—", SPOKE UP!) · your laugh fills the room (HA HA HA)
//              · you remember every birthday (balloons) · you hype friends like a coach ("you've got this!")
//              · generous, royally (three gift boxes) · grey day? you bring the sun (Capricorn's rain cloud clears)
//              · loyal like a lion (ON YOUR SIDE) · your confidence is contagious (three friends, glowing)
//              · you love out loud (a marquee heart sign)
//  37.8        "A whole sun. | *One big heart.*"  Leo comes back, big.
//  41.0        LESSON UNLOCKED: "Your warmth is the gift. | *Keep it lit.*"  GLOW: ON
//  46.9        "Shine on, Leo. | *We see you.*"
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

const S = 'leo'
// ── props
const BALLOON = ['.BBB.', 'BBWBB', 'BBBBB', 'BBBBB', '.BBB.', '..B..', '..S..', '..S..', '..S..', '..S..']
const GIFT = ['..R.R..', '...R...', 'GGGRGGG', 'GGGRGGG', 'GGGRGGG', 'GGGRGGG']
const CLOUD = ['...CCC....', '..CCCCC.C.', '.CCCCCCCCC', 'CCCCCCCCCC', '.CCCCCCCC.']
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
const HEART_S = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// a marquee heart: big heart with blinking bulbs around it
function marquee(x, t, cx, cy, k) {
  if (k <= 0.01) return
  drawBits(x, HEART_S, { H: '#ff4f86', W: '#fff' }, cx, cy, 32 * k)
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2, on = Math.floor(t * 6 + i) % 2
    const bx = cx + Math.cos(a) * 150 * k, by = cy + Math.sin(a) * 140 * k
    x.fillStyle = INK; x.fillRect(bx - 11, by - 11, 22, 22); x.fillStyle = on ? GOLD : '#7a5a1a'; x.fillRect(bx - 7, by - 7, 14, 14)
  }
}

const CAMEOS = [
  { sign: S, cap: 'Shy people feel | *brave around you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 990, (150 + 50 * ease.outBack(prog(lt, 1.0, 1.4))) * k, { mood: lt > 1.0 ? 'sparkle' : 'neutral', look: [-1, lt > 1.0 ? 0 : 1], seed: 81, glyph: false, hops: [P.t0 + 1.4] })
      bubble(x, 800, 700, 'um, actually—', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 1150, 'SPOKE UP!', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your laugh | *fills the room.*', mood: 'squint', star: { x: -220 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      ;[[680, 700, -0.2], [850, 780, 0.15], [700, 930, 0.1], [880, 1060, -0.15], [640, 1110, 0.2]].forEach(([hx, hy, r], i) =>
        label(x, hx, hy + 8 * Math.sin(t * 9 + i), 'HA', pop01(t, P.t0 + 0.2 + i * 0.22, 0.25, 2.4), { size: 50 + i * 4, bg: [GOLD, ORANGE, BONE, GOLD, PINK][i], rot: r }))
    } },
  { sign: S, cap: 'Every birthday? | *You remember.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      ;[[700, PINK], [800, SKYB], [900, MINT]].forEach(([bx, c], i) =>
        drawBits(x, BALLOON, { B: c, W: '#fff', S: BONE }, bx, 840 - 30 * Math.sin(t * 2 + i) - (i === 1 ? 40 : 0), 18 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.35, 2)))
      label(x, 800, 1110, 'SURPRISE! (AGAIN)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You hype friends | *like a coach.*', mood: 'wide', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 1000, 180 * k, { mood: lt > 1.3 ? 'sparkle' : 'neutral', look: [-1, 0], seed: 82, glyph: false, hops: lt > 1.3 ? [P.t0 + 1.7] : [] })
      bubble(x, 720, 660, 'YOU’VE | GOT THIS!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 1150, 'COACH LEO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Generous? | *Royally.*', mood: 'sparkle', star: { x: -200 },
    front(x, t, lt, P) {
      ;[[660, 1000, PINK], [790, 960, MINT], [905, 1010, SKYB]].forEach(([gx, gy, c], i) =>
        drawBits(x, GIFT, { G: c, R: RED }, gx, gy, 20 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.35, 2), { rot: (i - 1) * 0.1 }))
      label(x, 800, 720, 'ONE FOR EVERYONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 810, 980, P.t0 + 1.1, 8, 200, 0.2)
    } },
  { sign: S, cap: 'Grey day? | You *bring the sun.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), clear = ease.inOutCubic(prog(lt, 1.0, 1.5))
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 1010, 180 * k, { mood: clear > 0.5 ? 'happy' : 'neutral', seed: 83, glyph: false, hops: clear > 0.5 ? [P.t0 + 1.7] : [] })
      drawBits(x, CLOUD, { C: '#8d86a8' }, 800 + 260 * clear, 760, 22 * k, { alpha: 1 - clear })
      if (clear < 0.5) for (let i = 0; i < 5; i++) { const ph = (t * 1.8 + i / 5) % 1; x.fillStyle = SKYB; x.fillRect(720 + i * 38, 810 + ph * 110, 6, 18) }
      drawBits(x, SUN, { Y: GOLD }, 800, 740, 22 * pop01(t, P.t0 + 1.2, 0.35, 2), { rot: t * 0.5 })
      label(x, 800, 1160, 'FORECAST: SUNNY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Loyal | *like a lion.*', mood: 'wink', look: [-1, 0], star: { x: -60, s: 330 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 760, 960, 170 * k, { mood: 'heart', look: [-1, 0], seed: 84, glyph: false })
    },
    front(x, t, lt, P) {
      label(x, 540, 640, 'ON YOUR SIDE. ALWAYS.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your confidence | *is contagious.*', mood: 'sparkle', star: { x: -230 }, hops: [0.4],
    front(x, t, lt, P) {
      ;[['taurus', 620], ['libra', 760], ['pisces', 900]].forEach(([id, px], i) => {
        const k = pop01(t, P.t0 + 0.5 + i * 0.25, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, px, 960, 150 * k, { mood: 'sparkle', seed: 85 + i, glyph: false, tears: id === 'pisces' ? 1 : 0, hops: [P.t0 + 0.8 + i * 0.25] })
        sparkles(x, t, px, 960, P.t0 + 0.8 + i * 0.25, 6, 90, i)
      })
      label(x, 790, 700, 'EVERYONE: GLOWING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You love | *out loud.*', mood: 'heart', star: { x: -220 },
    front(x, t, lt, P) {
      marquee(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.4, 2))
      label(x, 790, 1120, 'SUBTLE? NEVER.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a025', key: 'C', accent: ORANGE, solo: S, ending: 'lesson',
  title: 'Leo, your gift | *is this.*',
  cameos: CAMEOS,
  group: { cap: 'A whole sun. | *One big heart.*', mood: 'heart' },
  lesson: { text: 'Your warmth is the gift. | *Keep it lit.*', chip: 'GLOW: ON' },
  last: { text: 'Shine on, Leo. | *We see you.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
