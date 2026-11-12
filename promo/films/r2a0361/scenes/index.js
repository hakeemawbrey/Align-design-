// r2a0361: star_advice, ADVICE SOLO, "Aquarius, here's a | Monday pep talk." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards), ending: callback.
//   0.0–3.6    "Aquarius, here's a | *Monday pep talk.*"
//   3.6–37.8   the weird idea is the good one (idea #47) · Monday's a rule, bend it gently · alone time isn't rude
//              · you care about the world, start with you (a globe with a plaster) · different isn't wrong (one rainbow sock)
//              · feelings aren't bugs (ERROR: FEELINGS → KEEP) · your friends get you, let them · three new hobbies, keep
//              the fun one · rest is allowed, even for geniuses
//  37.8        "Weird, warm, wonderful. | *Go get Monday.*"
//  41.2        callback: "Still wearing | *the rainbow sock.*" (the sock comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const AQUA = '#6fc3ff', DEEP = '#140c30', GREY = '#9aa5c4', RED = '#ff6b5a'
const M = { font: MONO, weight: 700 }
const txt = (x, s, X, Y, font, col, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
function frame(x, cx, cy, W, H, k, rot, bg, inner) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  x.fillStyle = bg; x.fillRect(-W / 2, -H / 2, W, H)
  inner(x, W, H)
  x.restore()
}

const BULB = [
  '...YYYYY...',
  '..YYYYYYY..',
  '.YYYWYYYYY.',
  '.YYWYYYYYY.',
  '.YYYYYYYYY.',
  '..YYYYYYY..',
  '...YYYYY...',
  '...GGGGG...',
  '...gGgGg...',
  '....GGG....',
]
const BULB_C = { Y: '#fff1a8', W: '#ffffff', G: GREY, g: '#6b7591' }
const GLOBE = [
  '...BBBBBB...',
  '..BBGGBBBB..',
  '.BGGGGBBBBB.',
  'BBGGGBBBGGBB',
  'BBBGBBBGGGGB',
  'BBBBBBBBGGGB',
  'BGGBBBBBBGBB',
  'BGGGGBBBBBBB',
  '.BGGGBBBGBB.',
  '..BBBBBGGB..',
  '...BBBBBB...',
]
const GLOBE_C = { B: '#4a8fe8', G: '#5fd068' }
const PLASTER = ['PPPPPPP', 'PpPPPpP', 'PPPPPPP']
const SOCK = [
  'XXXX..',
  'XXXX..',
  'XXXX..',
  'XXXX..',
  'XXXXX.',
  'XXXXXX',
  '.XXXXX',
]
const RAINBOW = ['#ff6b5a', '#ffb34a', '#ffe14a', '#5fd068', '#6fc3ff', '#c97bff', '#ff8fb1']
function sock(x, cx, cy, cell, rainbow, rot = 0) {
  if (cell <= 0.01) return
  const cols = rainbow ? null : { X: '#7a7f94' }
  if (!rainbow) { drawBits(x, SOCK, cols, cx, cy, cell, { rot }); return }
  // one colour per row, still with the ink outline
  drawBits(x, SOCK, { X: '#ffffff' }, cx, cy, cell, { rot })
  x.save(); x.translate(cx, cy); x.rotate(rot)
  const w = SOCK[0].length, h = SOCK.length, ox = -w * cell / 2, oy = -h * cell / 2
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (SOCK[j][i] !== '.') { x.fillStyle = RAINBOW[j]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
const TELESCOPE = [
  '.........KKK',
  '.......KKBBK',
  '.....KKBBBBK',
  '...KKBBBBKK.',
  '.KKBBBBKK...',
  'KBBBBKK.....',
  'KBBKK.......',
  '.KK.T.......',
  '...T.T......',
  '..T...T.....',
]
const TELESCOPE_C = { K: INK, B: '#c9a6ff', T: '#8a4a2e' }
const PILLOW = [
  '.WWWWWWWWWWWW.',
  'WWWWWWWWWWWWWW',
  'WWLWWWWWWWWLWW',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  'WWLWWWWWWWWLWW',
  '.WWWWWWWWWWWW.',
]

const S = 'aquarius'
const ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Your weird idea? | It’s *the good one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), on = lt > 1.0
      if (on) { x.save(); x.fillStyle = 'rgba(255,241,168,0.22)'; x.beginPath(); x.arc(790, 840, 190, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, BULB, on ? BULB_C : { ...BULB_C, Y: '#6b6280', W: '#8a82a0' }, 790, 860, 26 * k)
      label(x, 790, 1120, 'IDEA #47: KEEPER', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, ...M })
      if (on) sparkles(x, t, 790, 860, P.t0 + 1.0, 6, 180, 0.3)
    } },
  { sign: S, cap: 'Mondays love rules. | *Bend one gently.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const bend = ease.outCubic(prog(lt, 0.9, 1.5))
      frame(x, 790, 860, 300, 320, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(0, 0.12, bend), BONE, (x, W, H) => {
        x.fillStyle = RED; x.fillRect(-W / 2, -H / 2, W, 80)
        txt(x, 'MONDAY', 0, -H / 2 + 42, `800 44px ${INTER}`, BONE)
        txt(x, 'RULE #1', 0, -10, `700 30px ${MONO}`, INK)
        txt(x, 'be normal', 0, 50, `800 38px ${INTER}`, bend > 0.5 ? GREY : INK)
        if (bend > 0.5) { x.strokeStyle = AQUA; x.lineWidth = 8; x.beginPath(); x.moveTo(-90, 50); x.lineTo(90, 50); x.stroke(); txt(x, 'be you', 0, 110, `800 38px ${INTER}`, '#2f7fd1') }
      })
    } },
  { sign: S, cap: 'You need alone time. | That’s *not rude.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      frame(x, 790, 820, 290, 380, pop01(t, P.t0 + 0.2, 0.3, 2), 0.03, '#8a4a2e', (x, W, H) => {
        x.fillStyle = '#6e3a24'; x.fillRect(-W / 2 + 24, -H / 2 + 24, W - 48, 140); x.fillRect(-W / 2 + 24, -H / 2 + 190, W - 48, 160)
        x.fillStyle = GOLD; x.beginPath(); x.arc(W / 2 - 40, 30, 14, 0, Math.PI * 2); x.fill()
      })
      label(x, 790, 760, 'RECHARGING ♥', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.06, ...M })
      label(x, 790, 1110, 'BACK SOON. PROMISE.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 26, bg: BONE, rot: 0.04, ...M })
    } },
  { sign: S, cap: 'You care about the world. | *Start with you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, GLOBE, GLOBE_C, 790, 860, 24 * k, { rot: Math.sin(t * 1.5) * 0.05 })
      // and then the plaster goes on you instead
      drawBits(x, PLASTER, { P: '#ffc9a8', p: '#e89a7a' }, 380, 760, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.4), { rot: -0.3 })
      label(x, 790, 1120, 'YOU COUNT TOO', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'Different isn’t wrong. | It’s *your thing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) sock(x, 600 + i * 90, 880, 16 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), false)
      const k = pop01(t, P.t0 + 0.9, 0.3, 2.4)
      sock(x, 890, 860 - 20 * Math.sin(t * 3), 18 * k, true, 0.12)
      label(x, 790, 650, 'YOUR CHART: ONE OF ONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 26, bg: AQUA, rot: 0.04, ...M })
      if (k > 0.9) sparkles(x, t, 890, 860, P.t0 + 1.2, 6, 110, 0.5)
    } },
  { sign: S, cap: 'Feelings aren’t bugs. | *No need to fix them.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const kept = lt > 1.2
      frame(x, 790, 860, 340, 260, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, BONE, (x, W, H) => {
        x.fillStyle = kept ? '#5fd068' : RED; x.fillRect(-W / 2, -H / 2, W, 56)
        txt(x, kept ? 'ALL GOOD' : 'ERROR', 0, -H / 2 + 30, `700 28px ${MONO}`, INK)
        txt(x, 'feelings found', 0, -20, `800 34px ${INTER}`, INK)
        x.fillStyle = INK; x.fillRect(-110, 34, 100, 56); x.fillRect(10, 34, 100, 56)
        x.fillStyle = GREY; x.fillRect(-104, 40, 88, 44)
        x.fillStyle = kept ? MINT : '#d9d0c0'; x.fillRect(16, kept ? 46 : 40, 88, 44)
        txt(x, 'FIX', -60, 63, `700 24px ${MONO}`, INK); txt(x, 'KEEP', 60, kept ? 69 : 63, `700 24px ${MONO}`, INK)
      })
      if (kept) hearts(x, t, 790, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Your friends get you. | *Let them.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 650, 'you’re so | weird lol', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      bubble(x, 790, 920, 'we love | it. stay.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 52, col: MINT, tail: 'bl' })
      hearts(x, t, 790, 1080, P.t0 + 1.3, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Three new hobbies? | *Keep the fun one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ks = [0.2, 0.4, 0.6].map(d => pop01(t, P.t0 + d, 0.3, 2))
      const pick = lt > 1.1
      label(x, 790, 620, 'POTTERY', ks[0] * (pick ? 0.8 : 1), { size: 30, bg: pick ? GREY : BONE, rot: -0.06, ...M })
      label(x, 790, 1130, 'COIN FACTS', ks[1] * (pick ? 0.8 : 1), { size: 30, bg: pick ? GREY : BONE, rot: 0.05, ...M })
      drawBits(x, TELESCOPE, TELESCOPE_C, 800, 880, 22 * ks[2], { outline: null })
      if (pick) { label(x, 820, 740, '✓ STARGAZING', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, ...M }); sparkles(x, t, 800, 880, P.t0 + 1.2, 6, 160, 0.1) }
    } },
  { sign: S, cap: 'Rest is allowed. | *Even for geniuses.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { W: BONE, L: LAV }, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'GENIUS: OFFLINE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, ...M })
    } },
]

const F = makeFilm({
  id: 'r2a0361', key: 'D', accent: AQUA, solo: 'aquarius', ending: 'callback',
  title: 'Aquarius, here’s a | *Monday pep talk.*',
  cameos: CAMEOS,
  group: { cap: 'Weird, warm, wonderful. | *Go get Monday.*', mood: 'sparkle' },
  last: {
    text: 'Still wearing | *the rainbow sock.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2.2)
      sock(x, 540, 1120 - 16 * Math.sin(t * 3), 30 * k, true, 0.12)
      if (k > 0.9) sparkles(x, t, 540, 1120, t - lt + 0.8, 8, 200, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
