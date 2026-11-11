// v3a022: star_advice, ADVICE SOLO, "Signs you're | a healed Gemini." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): small, warm signs of a Gemini at peace, one gag each.
//   0.0–3.6    "Signs you're | *a healed Gemini.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              you finish one whole book (THE END) · you reply the same day ("dinner fri?" / "yes! 7?") · you don't have
//              to be the fun one (party hat off duty) · both of you get along now (two Geminis high-five) · quiet doesn't
//              scare you (a comfy "…") · you say how you feel, no joke after · ten hobbies, zero guilt (pottery, French,
//              banjo, salsa) · changing your mind is allowed (PLAN A / PLAN B) · you stay for the deep talk (moon bench)
//  37.8        "Curious. | *And calm.*"  Gemini comes back, big.
//  41.2        callback: "Banjo: retired. | *Pottery stayed.*"  the pot from the hobbies card comes back, finished.
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

const S = 'gemini', YEL = '#ffd84a'
// ── props
const BOOK = ['RRRRRRRR', 'RWWWWWWR', 'RWRRRRWR', 'RWWWWWWR', 'RWRRRRWR', 'RWWWWWWR', 'RRRRRRRR']
const BOOK_C = { R: SKYB, W: CREAM }
const HAT = ['...Y...', '..PYP..', '..YPY..', '.PYPYP.', '.YPYPY.', 'PYPYPYP']
const HAT_C = { Y: YEL, P: PINK }
const POT = ['.CCCCCC.', '..CCCC..', '.CCCCCC.', 'CCCWCCCC', 'CCWCCCCC', 'CCCCCCCC', '.CCCCCC.', '..CCCC..']
const POT_C = { C: '#d9804f', W: '#f2b27c' }
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']
const MOON_C = { Y: CREAM }

function signpost(x, t, cx, cy, P, lt) {
  const k = pop01(t, P.t0 + 0.2, 0.35, 2)
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -170, 28, 340); x.fillStyle = WOOD; x.fillRect(-8, -164, 16, 330)
  const arrow = (y, dir, txt, col, kk) => {
    if (kk <= 0.01) return
    x.save(); x.translate(0, y); x.scale(kk, kk)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-dir * 30, -42); x.lineTo(dir * 150, -42); x.lineTo(dir * 196, 0); x.lineTo(dir * 150, 42); x.lineTo(-dir * 30, 42); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(-dir * 24, -34); x.lineTo(dir * 146, -34); x.lineTo(dir * 184, 0); x.lineTo(dir * 146, 34); x.lineTo(-dir * 24, 34); x.fill()
    say(x, txt, dir * 70, 2, { size: 30, font: MONO, weight: 700 }); x.restore()
  }
  arrow(-100, -1, 'PLAN A', MINT, pop01(t, P.t0 + 0.5, 0.3, 2))
  arrow(10, 1, 'PLAN B', PINK, pop01(t, P.t0 + 0.9, 0.3, 2))
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You finish | *one whole book.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      ;[[700, 1060, -0.3], [860, 1070, 0.25], [760, 990, 0.12], [900, 980, -0.2]].forEach(([bx, by, r], i) =>
        drawBits(x, BOOK, { R: [PINK, MINT, LAV, ORANGE][i], W: CREAM }, bx, by, 13 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: r, alpha: 0.55 }))
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      drawBits(x, BOOK, BOOK_C, 800, 820, 24 * k)
      label(x, 800, 650, 'THE END. (WOW.)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 820, P.t0 + 1.4, 8, 180, 0.2)
    } },
  { sign: S, cap: 'You reply | *the same day* now.', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        const a = pop01(t, P.t0 + 0.5, 0.25, 2), b = pop01(t, P.t0 + 1.0, 0.25, 2)
        if (a > 0.01) { x.save(); x.translate(-20, -80); x.scale(a, a); x.fillStyle = BONE; x.fillRect(-90, -34, 180, 68); say(x, 'dinner fri?', 0, 2, { size: 30 }); x.restore() }
        if (b > 0.01) { x.save(); x.translate(25, 40); x.scale(b, b); x.fillStyle = YEL; x.fillRect(-80, -34, 160, 68); say(x, 'yes! 7?', 0, 2, { size: 32 }); x.restore() }
      })
      label(x, 780, 1110, 'SAME DAY. GROWTH.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You don’t have to | *be the fun one.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -200 },
    front(x, t, lt, P, F) {
      const off = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, HAT, HAT_C, lerp(F.x, 800, off), lerp(F.top - 40, 1060, off) - Math.sin(Math.PI * off) * 140, 20 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: lerp(-0.1, 0.5, off) })
      label(x, 800, 760, 'FUN MODE: OFF DUTY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 620, 'just chilling.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Both of you | *get along now.*', hideStar: true, star: { x: 0 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const meet = ease.inOutCubic(prog(lt, 0.5, 1.1)), k = pop01(t, P.t0 + 0.05, 0.45, 1.8)
      if (k > 0.01) {
        signChar(x, t, S, lerp(250, 400, meet), 900, 250 * k, { mood: lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], seed: 51, hops: [P.t0 + 1.1] })
        signChar(x, t, S, lerp(830, 680, meet), 900, 250 * k, { mood: lt > 1.1 ? 'sparkle' : 'wink', look: [-1, 0], seed: 52, hops: [P.t0 + 1.1] })
      }
      sparkles(x, t, 540, 860, P.t0 + 1.1, 8, 120, 0.4)
      label(x, 540, 640, 'TEAM GEMINI', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: YEL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Quiet doesn’t | *scare you* anymore.', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 790, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 53, glyph: false })
      bubble(x, 560, 650, '…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 60, col: LAV, tail: 'bc' })
      label(x, 790, 1140, 'COMFY SILENCE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You say how you feel. | *No joke after.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 770, 720, 'I really | missed you.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, tail: 'bl' })
      const s = clamp((lt - 1.0) * 3)
      x.save(); x.globalAlpha = s
      say(x, 'lol', 780, 960, { size: 84, color: '#8d86a8' })
      x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(700, 968); x.lineTo(860, 952); x.stroke(); x.restore()
      label(x, 790, 1120, 'NO “LOL” ADDED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ten hobbies. | *Zero guilt.*', mood: 'sparkle', star: { x: -210 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 800, 1050, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      ;[['POTTERY', 600, 0.05, GOLD], ['FRENCH', 700, -0.05, MINT], ['BANJO', 800, 0.04, PINK], ['SALSA', 900, -0.04, SKYB]].forEach(([s, y, r, bg], i) =>
        label(x, 790 + (i % 2 ? 30 : -30), y, s, pop01(t, P.t0 + 0.4 + i * 0.3, 0.3, 2.2), { size: 36, bg, rot: r, font: MONO, weight: 700 }))
    } },
  { sign: S, cap: 'Changing your mind | *is allowed.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      signpost(x, t, 790, 860, P, lt)
      label(x, 790, 1130, 'BOTH VALID', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You stay | *for the deep talk.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170, y: 20, s: 250 },
    back(x, t, lt, P) {
      drawBits(x, MOON, MOON_C, 900, 580, 18 * pop01(t, P.t0 + 0.2, 0.3, 1.6))
      const k = pop01(t, P.t0 + 0.1, 0.3, 1.6)
      if (k > 0.01) { x.fillStyle = INK; x.fillRect(180, 990, 760, 30); x.fillStyle = WOOD; x.fillRect(186, 996, 748, 18); x.fillRect(220, 1014, 18, 60); x.fillRect(880, 1014, 18, 60) }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 720, 920, 220 * k, { mood: 'happy', look: [-1, 0], seed: 54, glyph: false })
      bubble(x, 600, 700, 'tell me more.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      notes(x, t, 540, 820, { n: 2, cell: 5, col: LAV, alpha: clamp(lt - 1), seed: 3 })
    } },
]

const F = makeFilm({
  id: 'v3a022', key: 'E', accent: YEL, solo: S, ending: 'callback',
  title: 'Signs you’re | *a healed Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Curious. | *And calm.*', mood: 'sparkle' },
  last: {
    text: 'Banjo: retired. | *Pottery stayed.*',
    draw(x, t, lt) {
      drawBits(x, POT, POT_C, 540, 1050, 30 * pop01(t, t - lt + 0.6, 0.35, 2))
      label(x, 540, 1270, 'STILL GOING', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 42, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1050, t - lt + 1.0, 8, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
