// r2a0176: star_advice, ADVICE SOLO (Gemini), "How to give a Gemini | space." (~45 s vertical, signs3kit social cut, music: lofi · D)
// Nine cards, each a relatable Gemini truth + a warm reframe, one gag each. Ending: callback.
//   0.0–3.6    "How to give | a Gemini *space.*"
//   3.6–37.8   quiet day = recharging · late reply, comes back chatty · new hobby every week · headphones on
//              · a solo walk (met a goose) · plans changed, flexible · ask "what's new?" · a night in is not a breakup
//              · they always circle back (the paper plane)
//  37.8        "Space given. | *Stories incoming.*"
//  41.2        CALLBACK: "Back from the walk: | *the goose story.*"  Gemini returns with the goose.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'gemini', ST = { x: -170 }, YEL = '#ffd23a'

const PHONES = ['KKKKKKKK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KKKGGKKK', 'KKKKKKKK']
const PHONE_C = { K: '#2a2350', S: SKYB, G: '#6b62a8' }
const HEADPH = ['...KKKKKK...', '..K......K..', '.K........K.', 'K..........K', 'K..........K', 'PP........PP', 'PPP......PPP', 'PPP......PPP', 'PPP......PPP', 'PP........PP']
const HEADPH_C = { K: INK, P: PINK }
const GOOSE = ['...WWW......', '..WWKW......', '..WWWWOO....', '...WW.......', '...WW.......', '...WWWWWWW..', '..WWWWWWWWW.', '..WWWWWWWWWW', '...WWWWWWWW.', '.....O..O...']
const GOOSE_C = { W: '#ffffff', K: INK, O: '#ff9a4a' }
const PLANE = ['W.........', 'WWW.......', 'WWWWW.....', 'WWWWWWW...', 'WWWWWWWWWW', 'WWWWWWW...', 'WSSWW.....', 'WSS.......']
const PLANE_C = { W: '#ffffff', S: '#c9d4f0' }
const BLANKET = ['LLLLLLLLLLLLLL', 'LMLLMLLMLLMLLM', 'LLLLLLLLLLLLLL', 'LMLLMLLMLLMLLM', 'LLLLLLLLLLLLLL']
const BLANKET_C = { L: LAV, M: '#ffffff' }

function battery(x, cx, cy, k, fillP) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -80, 300, 160); x.fillRect(150, -34, 30, 68)
  x.fillStyle = BONE; x.fillRect(-140, -70, 280, 140); x.fillRect(150, -24, 20, 48)
  x.fillStyle = '#140c30'; x.fillRect(-128, -58, 256, 116)
  const n = Math.round(clamp(fillP) * 4)
  for (let i = 0; i < 4; i++) { x.fillStyle = i < n ? MINT : 'rgba(125,255,176,0.15)'; x.fillRect(-120 + i * 62, -50, 52, 100) }
  x.restore()
}
function planCard(x, cx, cy, k, s) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -110, 316, 236)
  x.fillStyle = INK; x.fillRect(-164, -124, 328, 248); x.fillStyle = BONE; x.fillRect(-156, -116, 312, 232)
  x.fillStyle = SKYB; x.fillRect(-156, -116, 312, 56)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -88)
  x.font = `800 40px ${INTER}`; x.fillText('brunch 11:00', 0, -8)
  if (s > 0) { x.fillStyle = '#e23d4e'; x.fillRect(-130, -12, 260 * clamp(s), 8) }
  if (s >= 1) { x.fillStyle = '#2fc79a'; x.font = `800 44px ${INTER}`; x.fillText('whenever!', 0, 64) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'A quiet day? | *Recharging,* not mad.', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      battery(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), (lt - 0.4) / 1.4)
      label(x, 790, 1080, lt > 1.8 ? 'FULLY CHARGED' : 'RECHARGING…', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow reply? | Comes back *chatty.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, PHONES, PHONE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bubble(x, 790, 690, lt > 1.2 ? 'ok SO. update:' : '…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1130, 'WORTH THE WAIT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New hobby every week? | *Cheer for each one.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const H = ['POTTERY', 'BANJO', 'JUGGLING', 'CHESS']
      const i = Math.min(3, Math.floor(clamp((lt - 0.3) / 1.6) * 4))
      label(x, 790, 760 + i * 4, `WEEK ${i + 1}: ${H[i]}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: [PINK, SKYB, MINT, LAV][i], rot: (i % 2 ? 0.05 : -0.05), font: MONO, weight: 700 })
      bubble(x, 790, 980, 'love that for you!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: S, cap: 'Headphones on? | *Do not disturb.* Lovingly.', mood: 'happy', look: [0, -1], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, HEADPH, HEADPH_C, F.x, F.cy - 30, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, F.x + 180, F.cy - 60, { n: 4, cell: 7, col: YEL, seed: 1 })
      label(x, 790, 1080, 'BACK IN 20', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A solo walk? | *Story time* later.', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const w = ease.outCubic(prog(lt, 0.3, 1.0))
      drawBits(x, GOOSE, GOOSE_C, lerp(1000, 800, w), 960, 18 * clamp(w * 3), { sx: -1 })
      bubble(x, 790, 680, 'I met a goose!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Plans changed? | *Flexible* is love too.', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      planCard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), (lt - 0.8) / 0.4)
      label(x, 790, 1110, 'NO HARD FEELINGS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skip “what’s wrong?” | Ask *“what’s new?”*', mood: lt => lt > 0.9 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'what’s new?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'br' })
      bubble(x, 790, 940, 'SO MUCH!!', pop01(t, P.t0 + 0.9, 0.25, 2.6), { size: 68, col: YEL, tail: 'bl' })
      sparkles(x, t, 370, 860, P.t0 + 1.3, 8, 180, 0.4)
    } },
  { sign: S, cap: 'A night in alone | is *not a breakup.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170, y: -30 },
    back(x, t, lt, P) { drawBits(x, BLANKET, BLANKET_C, 370, 1060, 26 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'enjoy your | night in!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      label(x, 790, 1020, 'YOUR MATCH GETS IT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 370, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 150, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Let them wander. | They *always circle back.*', mood: lt => lt > 1.6 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.8],
    front(x, t, lt, P, F) {
      const a = clamp((lt - 0.2) / 1.6) * Math.PI * 2
      const px = 690 + Math.cos(a - Math.PI) * -200, py = 860 + Math.sin(a) * -220
      drawBits(x, PLANE, PLANE_C, lt > 1.8 ? F.x + 130 : px, lt > 1.8 ? F.cy - 80 : py, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.8 ? 0 : a + Math.PI / 2 })
      label(x, 790, 1110, 'RETURNED TO SENDER', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0176', key: 'D', accent: YEL, solo: S, ending: 'callback',
  title: 'How to give | a Gemini *space.*',
  cameos: CAMEOS,
  group: { cap: 'Space given. | *Stories incoming.*', mood: 'sparkle' },
  last: {
    text: 'Back from the walk: | *the goose story.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const s = pop01(t, t0 + 0.5, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, S, 420, 1110, 330 * s, { mood: 'sparkle', look: [1, 0], seed: 44, hops: [t0 + 1.4, t0 + 2.4] })
      const g = ease.outCubic(prog(lt, 0.9, 1.5))
      if (g > 0) drawBits(x, GOOSE, GOOSE_C, lerp(1100, 720, g), 1150, 26, { sx: -1 })
      bubble(x, 600, 850, 'so the goose…', pop01(t, t0 + 1.6, 0.25, 2.2), { size: 56, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
