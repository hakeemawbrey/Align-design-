// r2t0525: star_talk, BE LIKE roll call, "Outfit copied? | Signs *be like.*" (topic: Zodiacs when someone copies their
// outfit) (~57 s vertical, signs3kit social cut, music: lofi · F). Twelve signs in zodiac order, each the most extreme
// reaction to an outfit twin. Ending: callback.
//   0.0–3.6    "Outfit copied? | Signs *be like.*"
//   3.6–49.2   ♈ challenged them to a walk-off · ♉ didn't notice, was eating · ♊ "twins? that's my whole sign" · ♋ took it as
//              a hug, bonded for life · ♌ flattered, signed their shirt · ♍ pointed out the loose thread · ♎ asked where
//              they got it (it's theirs) · ♏ noted it, remembered forever · ♐ swapped outfits on the spot · ♑ sent an
//              invoice for the look · ♒ wore it first, before it existed · ♓ matching! cried happy tears
//  49.2        "Same outfit. | *Twelve reactions.*"
//  52.6        CALLBACK: "And Scorpio? | *Still has the file.*"  the case file comes back, stamped.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8fb1', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const SL = { x: -160 }, SR = { x: 150 }

function txt(x, s, px, py, size, col = INK, align = 'center', font = INTER, w = 800) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function sheet(x, cx, cy, w, h, k, rot, fn, bg = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
// the outfit: a striped shirt with a star on it (the copied look)
const SHIRT = ['..SS....SS..', '.SSSS..SSSS.', 'SSSSSSSSSSSS', 'SSWWWWWWWWSS', '..SSSSSSSS..', '..WWWYYWWW..', '..SSYYYYSS..', '..WWWYYWWW..', '..SSSSSSSS..', '..WWWWWWWW..']
const SHIRT_C = { S: '#ff6b9a', W: CREAM, Y: GOLD }
const shirt = (x, cx, cy, cell, o = {}) => drawBits(x, SHIRT, { ...SHIRT_C, ...(o.cols || {}) }, cx, cy, cell, o)
const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', '.BBBBBBBBBB.']
const FOLDER = ['KKKKK.......', 'KYYYYKKKKKKK', 'KYYYYYYYYYYK', 'KYYYYYYYYYYK', 'KYYYYYYYYYYK', 'KYYYYYYYYYYK', 'KYYYYYYYYYYK', 'KKKKKKKKKKKK']
function stamp(x, cx, cy, text, k, col = RED, rot = -0.18, size = 40) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); const s = 1 + 0.6 * (1 - k); x.scale(s, s); x.globalAlpha = clamp(k * 1.5)
  x.font = `700 ${size}px ${MONO}`; const w = x.measureText(text).width + 36, h = size + 26
  x.strokeStyle = col; x.lineWidth = 7; x.strokeRect(-w / 2, -h / 2, w, h)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Challenged them | *to a walk-off.*', mood: 'sparkle', star: SL, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      shirt(x, 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 650, 'WALK-OFF: NOW', pop01(t, P.t0 + 0.7, 0.3, 2.4), RED, -0.05, 36, CREAM)
      bubble(x, 790, 1100, 'you vs. me. | runway.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Didn’t notice. | *Was eating.*', mood: 'heart', star: SL,
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, { B: '#e8a24a', G: '#5fd068', R: '#e2583d', Y: GOLD }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      shirt(x, 900, 680, 9 * pop01(t, P.t0 + 0.6, 0.3, 2), { alpha: 0.6 })
      L(x, 790, 1090, 'OUTFIT? WHAT OUTFIT?', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#5fd068', 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Twins? | *That’s my whole sign.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: SL, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 930, 230 * k, { mood: 'wink', look: [-1, 0], seed: 11, glyph: false, hops: [P.t0 + 1.2] })
      L(x, 790, 680, '♊︎ ALREADY TWINS', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, 0.04, 32)
      L(x, 790, 1120, 'NOW TRIPLETS', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Took it as a hug. | *Bonded for life.*', mood: 'heart', star: { x: -120 },
    front(x, t, lt, P, F) {
      shirt(x, F.x, F.cy + 120, 10 * pop01(t, P.t0 + 0.2, 0.3, 2))
      shirt(x, 760, 1000, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 760, 680, 'TWINS FOREVER', pop01(t, P.t0 + 0.9, 0.3, 2.4), PINK, 0.04, 34)
      hearts(x, t, 620, 860, P.t0 + 1.0, { n: 6, life: 1.6, spread: 260, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Flattered. | *Signed their shirt.*', mood: 'sparkle', star: SL, hops: [0.9],
    front(x, t, lt, P) {
      shirt(x, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const g = clamp((lt - 0.6) / 0.7)
      if (g > 0) { x.save(); x.beginPath(); x.rect(680, 920, 260 * g, 120); x.clip(); txt(x, 'xo, Leo ♌︎', 800, 990, 40, '#2a2350', 'center', "'EB Garamond', Georgia, serif", 500); x.restore() }
      L(x, 790, 660, 'AUTOGRAPH: FREE', pop01(t, P.t0 + 1.4, 0.3, 2.4), ORANGE, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Pointed out | *the loose thread.*', mood: 'squint', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      shirt(x, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.6) { x.strokeStyle = '#ff6b9a'; x.lineWidth = 6; x.beginPath(); x.moveTo(860, 960); x.quadraticCurveTo(900, 1020 + 10 * Math.sin(t * 4), 870, 1080); x.stroke() }
      bubble(x, 760, 660, 'you have a— | let me just—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      L(x, 760, 1120, 'THREAD: HANDLED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Asked where they got it. | *It’s Libra’s.*', mood: lt => lt > 1.4 ? 'wide' : 'heart', star: SL,
    front(x, t, lt, P) {
      shirt(x, 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'love it! | where’s it from?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1110, 'TAG: PROPERTY OF ♎︎', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Noted it. | *Remembered forever.*', mood: 'squint', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      drawBits(x, FOLDER, { K: INK, Y: '#e8c070' }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.6) txt(x, 'CASE: SHIRT', 790, 885, 30, INK, 'center', MONO, 700)
      L(x, 790, 1090, 'FILE: OPENED', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Swapped outfits | *on the spot.*', mood: 'sparkle', star: SR, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const s = ease.inOutCubic(prog(lt, 0.6, 1.2))
      shirt(x, lerp(250, 420, s), 860 - Math.sin(Math.PI * s) * 120, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      shirt(x, lerp(420, 250, s), 860 + Math.sin(Math.PI * s) * 60, 12 * pop01(t, P.t0 + 0.3, 0.3, 2), { cols: { S: SKYB } })
      L(x, 330, 1080, 'NEW LOOK: ACQUIRED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Sent an invoice | *for the look.*', mood: 'neutral', look: [-1, 0], star: SR,
    front(x, t, lt, P) {
      sheet(x, 330, 850, 290, 330, pop01(t, P.t0 + 0.2, 0.3, 2), -0.05, () => {
        txt(x, 'INVOICE', 0, -130, 36, INK)
        txt(x, 'style concept', -120, -60, 24, '#4a4470', 'left', MONO, 700); txt(x, 'creative fee', -120, -16, 24, '#4a4470', 'left', MONO, 700)
        x.fillStyle = INK; x.fillRect(-120, 30, 240, 4)
        txt(x, 'DUE: TODAY', 0, 80, 32, RED, 'center', MONO, 700)
      })
      L(x, 330, 1080, 'PAYMENT: EXPECTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), '#2fc79a', 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Wore it first. | *Before it existed.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      shirt(x, 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { cols: { S: GREY } })
      bubble(x, 790, 660, 'it’s mainstream | now. sad.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      L(x, 790, 1100, 'ORIGINAL: ♒︎', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Matching?! | *Happy tears.*', mood: 'heart', tears: lt => lt < 0.8 ? 2 : 3, star: SL,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      shirt(x, 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'WE’RE SOULMATES', pop01(t, P.t0 + 0.8, 0.3, 2.4), SKYB, -0.04, 32)
      hearts(x, t, 800, 900, P.t0 + 1.0, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0525', key: 'F', accent: ACC, ending: 'callback',
  title: 'Outfit copied? | Signs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Same outfit. | *Twelve reactions.*' },
  last: {
    text: 'And Scorpio? | *Still has the file.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'scorpio', 340, 1150, 320 * k, { mood: 'squint', look: [1, 0], seed: 33, hops: [t0 + 1.4] })
      drawBits(x, FOLDER, { K: INK, Y: '#e8c070' }, 760, 1150, 28 * k)
      stamp(x, 760, 1170, 'ACTIVE', pop01(t, t0 + 1.2, 0.25, 1.4), RED, -0.15, 46)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
