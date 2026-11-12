// v3a026: star_advice, ADVICE ROLLCALL, "What each sign | brings to love." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, one warm line each about the gift that sign brings to love, with one light gag.
//   0.0–3.6    "What each sign | *brings to love.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ courage, the first move ("dinner?" in half a second) · ♉ comfort, fresh bread · ♊ fun (bowling, museum,
//              tacos) · ♋ a soft place to land (a big pillow) · ♌ grand gestures (a banner: YOU'RE GREAT!) · ♍ care in
//              tiny details (a lunch note) · ♎ beautiful dates (a picnic for two) · ♏ depth, all the way down (a little
//              submarine) · ♐ adventure, pack light (a road trip map) · ♑ built to last (a brick by brick heart)
//              · ♒ room to be yourself (WEIRD: WELCOME) · ♓ devotion, tears included (a tear-stained love letter)
//  49.2        "Love is | *a group project.*"  The twelve fly up into a group photo.
//  52.6        callback: "Scorpio came up | *for air.*"  the submarine surfaces, bubbles and hearts.
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
const BREAD = ['..BBBBBB..', '.BTBBTBBB.', 'BBBTBBTBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', '.BBBBBBBB.']
const BREAD_C = { B: '#d9944a', T: '#f2c98a' }
const PILLOW = ['.PPPPPPPPPPPP.', 'PPPPHHPPHHPPPP', 'PPPHHHHHHHHPPP', 'PPPHHHHHHHHPPP', 'PPPPHHHHHHPPPP', 'PPPPPHHHHPPPPP', 'PPPPPPHHPPPPPP', '.PPPPPPPPPPPP.']
const PILLOW_C = { P: '#bfe9ff', H: '#ff4f86' }
const SUB = ['.....PP.....', '.....PP.....', '..YYYYYYYY..', '.YYWYYWYYWY.', 'YYYYYYYYYYYY', '.YYYYYYYYYY.', '..YYYYYYYYPP']
const SUB_C = { Y: GOLD, W: SKYB, P: '#8d86a8' }
const BRICKS = ['.RR.RR.', 'RRRRRRR', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...']
const PICNIC = ['RWRWRWRWRW', 'WRWRWRWRWR', 'RWRWRWRWRW', 'WRWRWRWRWR']
const BACKPACK = ['..GGGG..', '.G....G.', 'GGGGGGGG', 'GGYYYYGG', 'GGYGGYGG', 'GGGGGGGG', 'GGGGGGGG', '.GGGGGG.']
const BACKPACK_C = { G: '#2fc79a', Y: GOLD }

function bubbles(x, t, cx, cy, n, alpha = 1) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.8 + i / n) % 1)
    x.save(); x.globalAlpha = alpha * (1 - ph); x.strokeStyle = BONE; x.lineWidth = 4
    x.beginPath(); x.arc(cx + Math.sin(i * 2.1 + t * 2) * 40, cy - ph * 200, 8 + (i % 3) * 5, 0, Math.PI * 2); x.stroke(); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Courage. | *The first move.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 }, hops: [0.4],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        const b = pop01(t, P.t0 + 0.45, 0.2, 2.4)
        if (b > 0.01) { x.save(); x.translate(10, -40); x.scale(b, b); x.fillStyle = '#ff7a5c'; x.fillRect(-95, -50, 190, 100); say(x, 'hi! dinner', 0, -16, { size: 30 }); say(x, 'friday?', 0, 22, { size: 30 }); x.restore() }
      })
      label(x, 790, 1120, 'SENT IN 0.5 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Comfort. | Also *fresh bread.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 790, 900, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph) * clamp(lt - 0.6); x.fillStyle = BONE; x.fillRect(730 + i * 60 + Math.sin(ph * 8) * 10, 790 - ph * 150, 10, 30); x.restore() }
      label(x, 790, 1100, 'BAKED. FOR YOU.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Fun. | *Never a dull date.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      ;[['BOWLING', 680, -0.05, PINK], ['MUSEUM', 800, 0.05, MINT], ['TACOS', 920, -0.04, GOLD], ['KARAOKE?', 1040, 0.04, SKYB]].forEach(([s, y, r, bg], i) =>
        label(x, 790 + (i % 2 ? 30 : -30), y, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2), { size: 38, bg, rot: r, font: MONO, weight: 700 }))
    } },
  { sign: 'cancer', cap: 'A soft place | *to land.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -190 },
    front(x, t, lt, P) {
      const sq = lt > 0.9 && lt < 1.4 ? 0.08 * Math.sin((lt - 0.9) * 14) : 0
      drawBits(x, PILLOW, PILLOW_C, 770, 960, 21 * pop01(t, P.t0 + 0.2, 0.35, 2), { sx: 1 + sq, sy: 1 - sq })
      bubble(x, 790, 700, 'rough day? | come here.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Grand gestures. | *Very grand.*', mood: 'sparkle', star: { x: -190, y: 40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), unroll = ease.outCubic(prog(lt, 0.5, 1.2))
      if (k > 0.01) {
        x.save(); x.translate(560, 640); x.scale(k, k); x.rotate(-0.03)
        const w = 720 * unroll
        x.fillStyle = INK; x.fillRect(-w / 2 - 6, -56, w + 12, 112); x.fillStyle = ORANGE; x.fillRect(-w / 2, -50, w, 100)
        x.save(); x.beginPath(); x.rect(-w / 2, -50, w, 100); x.clip(); say(x, 'YOU’RE GREAT!', 0, 4, { size: 64 }); x.restore()
        x.restore()
      }
      sparkles(x, t, 560, 640, P.t0 + 1.2, 10, 380, 0.3)
    } },
  { sign: 'virgo', cap: 'Care in | *the tiny details.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -190 },
    front(x, t, lt, P) {
      card(x, 790, 940, 300, 160, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.03, bg: '#7cc7ff', head: '#5aa9e6', headH: 30 })
      card(x, 800, 760, 230, 170, pop01(t, P.t0 + 0.7, 0.3, 2.2), { rot: -0.07, bg: '#fff59a' }, () => {
        say(x, 'eat lunch :)', 0, -26, { size: 30 }); say(x, 'water too.', 0, 22, { size: 30 })
      })
      label(x, 780, 1120, 'LUNCHBOX NOTE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Beautiful dates. | *Every single one.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, PICNIC, { R: RED, W: '#fff' }, 770, 1060, 32 * pop01(t, P.t0 + 0.2, 0.35, 2), { sy: 0.5 })
      drawBits(x, ['.F.F.', 'FYFYF', '.F.F.', '..G..', '..G..'], { F: PINK, Y: GOLD, G: GREEN }, 710, 950, 20 * pop01(t, P.t0 + 0.5, 0.3, 2))
      drawBits(x, BREAD, BREAD_C, 850, 990, 13 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 790, 720, 'PICNIC FOR TWO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Depth. | *All the way down.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 1], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 1.6)
      x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#2a6fd6'; x.fillRect(560, 620, 400, 600); x.restore()
    },
    front(x, t, lt, P) {
      const dive = ease.inOutCubic(prog(lt, 0.3, 1.6))
      drawBits(x, SUB, SUB_C, 760, lerp(700, 1030, dive), 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubbles(x, t, 760, lerp(660, 990, dive), 5, clamp(lt))
      const m = Math.round(lerp(0, 1000, dive))
      label(x, 790, 680, `DEPTH: ${m}M`, pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Adventure. | *Pack light.*', mood: 'sparkle', star: { x: -190 }, hops: [0.5, 1.1],
    front(x, t, lt, P) {
      card(x, 800, 820, 330, 250, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05, bg: '#f4e2b0' }, () => {
        x.strokeStyle = RED; x.lineWidth = 7; x.setLineDash([16, 12]); x.beginPath(); x.moveTo(-130, 80); x.bezierCurveTo(-60, -90, 40, 100, 130, -70); x.stroke(); x.setLineDash([])
        x.fillStyle = RED; x.fillRect(118, -86, 26, 26)
      })
      drawBits(x, BACKPACK, BACKPACK_C, 930, 660, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.1 })
      label(x, 760, 1080, 'ROAD TRIP: YES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Love that’s | *built to last.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const rows = BRICKS.length
      const shown = Math.floor(rows * clamp((lt - 0.2) / 1.2)) + 1
      drawBits(x, BRICKS.map((r, j) => rows - 1 - j < shown ? r : r.replace(/R/g, '.')), { R: '#ff4f86' }, 790, 870, 34 * pop01(t, P.t0 + 0.2, 0.35, 2), { outline: INK })
      label(x, 790, 1110, 'FOUNDATION: SOLID', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Room to be | *fully yourself.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', star: { x: -190 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 790, 990, 180 * k, { mood: 'heart', look: [-1, 0], seed: 91, glyph: false })
      bubble(x, 560, 650, 'I collect | spoons now.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1150, 'WEIRD: WELCOME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Devotion. | *Tears included.*', tears: 2, mood: 'heart', star: { x: -190 },
    front(x, t, lt, P) {
      card(x, 790, 840, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 }, () => {
        say(x, 'My dearest,', -10, -100, { size: 34, font: "'EB Garamond', Georgia, serif", weight: 500 })
        x.fillStyle = '#b9a9c9'; for (let r = 0; r < 4; r++) x.fillRect(-120, -40 + r * 40, r % 2 ? 180 : 230, 10)
        x.fillStyle = 'rgba(143,227,255,0.6)'; for (const [a, b] of [[-60, 10], [50, 60], [-10, 100]]) { x.beginPath(); x.arc(a, b, 18, 0, Math.PI * 2); x.fill() }
      })
      label(x, 790, 1100, 'PAGE 1 OF 9', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a026', key: 'D', accent: GOLD, ending: 'callback',
  title: 'What each sign | *brings to love.*',
  cameos: CAMEOS,
  group: { cap: 'Love is | *a group project.*' },
  last: {
    text: 'Scorpio came up | *for air.*',
    draw(x, t, lt) {
      const rise = ease.outCubic(prog(lt, 0.4, 1.6))
      x.save(); x.globalAlpha = 0.35 * clamp(lt * 2); x.fillStyle = '#2a6fd6'; x.fillRect(200, 1160, 680, 240); x.restore()
      drawBits(x, SUB, SUB_C, 540, lerp(1350, 1130, rise), 26 * pop01(t, t - lt + 0.3, 0.35, 2))
      bubbles(x, t, 540, 1150, 6, clamp(lt))
      label(x, 540, 1470, 'BACK IN 5 MIN. MAYBE.', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 1080, t - lt + 1.4, { n: 6, life: 2, spread: 300, cell: 7, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
