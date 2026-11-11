// v3a024: star_advice, ADVICE SOLO, "How to love | a Libra." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): warm, practical ways to love a Libra, one gag each.
//   0.0–3.6    "How to love | *a Libra.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              pick the restaurant, please (DECIDED FOR YOU) · dress up for date night (Scorpio in a bow tie)
//              · disagree gently ("hmm, maybe?" / "fair point!") · dance in the kitchen (a frying pan, a slow song)
//              · make it pretty, even the toast (heart jam) · say sorry without a debate (a white flag)
//              · hold hands in public · ask their opinion, then wait (a loading bar stuck at THINKING…)
//              · pick them every time ("you. always you.")
//  37.8        "Fair. Sweet. | *Worth it.*"  Libra comes back, big.
//  41.2        callback: "Opinion loaded: | *it was yes.*"  the loading bar comes back, full.
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

const S = 'libra'
// ── props
const BOWTIE = ['R.....R', 'RR...RR', 'RRRYRRR', 'RR...RR', 'R.....R']
const PAN = ['..GGGGG.......', '.GKKKKKG......', 'GKKKKKKKGWWWWW', 'GKKYYKKKGWWWWW', '.GKKKKKG......', '..GGGGG.......']
const PAN_C = { G: '#8d86a8', K: '#3a3358', Y: GOLD, W: WOOD }
const TOAST = ['.BBBBBB.', 'BBTTTTBB', 'BTTRRTTB', 'BTRRRRTB', 'BTTRRTTB', 'BTTTTTTB', 'BBBBBBBB']
const TOAST_C = { B: '#c98f2a', T: '#f2c98a', R: '#ff4f86' }
const WFLAG = ['WWWWW', 'WWWWW', 'WWWWW', 'P....', 'P....', 'P....', 'P....', 'P....']

// a loading bar card; p = 0…1 fill
function loading(x, cx, cy, k, p, txt) {
  card(x, cx, cy, 360, 170, k, { rot: -0.03 }, () => {
    say(x, txt, 0, -40, { size: 32, font: MONO, weight: 700 })
    x.fillStyle = INK; x.fillRect(-150, 0, 300, 50); x.fillStyle = '#e8e0f0'; x.fillRect(-144, 6, 288, 38)
    x.fillStyle = p >= 1 ? '#2fc79a' : ROSE; x.fillRect(-144, 6, 288 * p, 38)
  })
}

const CAMEOS = [
  { sign: S, cap: 'Pick the restaurant. | *Please.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: lt => [lt < 1.2 ? (Math.floor(lt * 3) % 2 ? 1 : -1) : 1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 830, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04, head: ROSE, headH: 64 }, () => {
        say(x, 'TONIGHT?', 0, -118, { size: 32 })
        ;['TACOS', 'PASTA', 'SUSHI?', 'SOUP'].forEach((s, i) => say(x, s, 0, -50 + i * 54, { size: 32, color: lt > 1.1 && i === 1 ? INK : '#8d86a8' }))
        if (lt > 1.1) { x.strokeStyle = '#2fc79a'; x.lineWidth = 7; x.strokeRect(-90, -50 + 54 - 26, 180, 52) }
      })
      label(x, 790, 1100, 'DECIDED FOR YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 640, 'thank you.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Dress up | *for date night.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 790, 960, 230 * k, { mood: lt > 1.0 ? 'wink' : 'neutral', look: [-1, 0], seed: 71, glyph: false })
      drawBits(x, BOWTIE, { R: RED, Y: GOLD }, 790, 1050, 14 * pop01(t, P.t0 + 0.7, 0.3, 2.4))
      label(x, 790, 690, 'BOW TIE: YES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 960, P.t0 + 1.0, 7, 160, 0.4)
    } },
  { sign: S, cap: 'Disagree | *gently.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 800, 990, 190 * k, { mood: 'happy', look: [-1, 0], seed: 72, glyph: false })
      bubble(x, 500, 640, 'hmm… maybe?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 760, 'fair point!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: PINK, tail: 'br' })
      label(x, 790, 1150, 'STILL CUTE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Dance in | *the kitchen.*', mood: 'sparkle', star: { x: -200 }, hops: [0.5, 1.0, 1.5, 2.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PAN, PAN_C, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.15 * Math.sin(t * 4) })
      notes(x, t, 560, 860, { n: 4, cell: 7, col: ROSE, alpha: clamp(lt * 2), seed: 2 })
      label(x, 760, 700, 'SLOW SONG: ON', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Make it pretty. | *Even the toast.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      x.fillStyle = INK; x.beginPath(); x.ellipse(790, 960, 170, 50, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#fff'; x.beginPath(); x.ellipse(790, 955, 160, 42, 0, 0, Math.PI * 2); x.fill()
      drawBits(x, TOAST, TOAST_C, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1110, 'PLATED. NICELY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 7, 170, 0.6)
    } },
  { sign: S, cap: 'Say sorry | *without a debate.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 1000, 190 * k, { mood: 'happy', look: [-1, 0], seed: 73, glyph: false })
      drawBits(x, WFLAG, { W: '#fff', P: '#c9c4d8' }, 900, 820, 20 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.1 * Math.sin(t * 6) })
      bubble(x, 650, 660, 'sorry. my bad.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 790, 1150, 'PEACE: RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hold hands | *in public.*', mood: 'heart', star: { x: -120 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 700, 880, 280 * k, { mood: 'heart', look: [-1, 0], seed: 74, glyph: false })
      hearts(x, t, 540, 760, P.t0 + 0.8, { n: 8, life: 2, spread: 400, cell: 7, seed: 8 })
      label(x, 540, 1120, 'PROUDLY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask their opinion. | *Then wait.*', mood: 'squint', look: [1, -1], star: { x: -200 },
    front(x, t, lt, P) {
      loading(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 0.87 * ease.outExpo(prog(lt, 0.3, 1.6)), 'THINKING…')
      bubble(x, 790, 640, 'take your time!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1080, 'ETA: SOON-ISH', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Pick them. | *Every time.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        x.fillStyle = MINT; x.fillRect(-100, -146, 200, 46); say(x, '✦ IT’S A MATCH', 0, -122, { size: 22, font: MONO, weight: 700 })
        const b = pop01(t, P.t0 + 0.8, 0.25, 2)
        if (b > 0.01) { x.save(); x.translate(0, 20); x.scale(b, b); x.fillStyle = ROSE; x.fillRect(-95, -50, 190, 100); say(x, 'you. always', 0, -18, { size: 28 }); say(x, 'you.', 0, 20, { size: 28 }); x.restore() }
      })
      label(x, 790, 1110, 'CHOSEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a024', key: 'G', accent: ROSE, solo: S, ending: 'callback',
  title: 'How to love | *a Libra.*',
  cameos: CAMEOS,
  group: { cap: 'Fair. Sweet. | *Worth it.*', mood: 'heart' },
  last: {
    text: 'Opinion loaded: | *it was yes.*',
    draw(x, t, lt) {
      loading(x, 540, 1000, 1.4 * pop01(t, t - lt + 0.5, 0.35, 2), ease.outCubic(prog(lt, 0.8, 1.6)), lt > 1.6 ? 'DONE: YES' : 'THINKING…')
      hearts(x, t, 540, 940, t - lt + 1.7, { n: 8, life: 2, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
