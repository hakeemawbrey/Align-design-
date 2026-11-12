// r2a0232: star_advice, ADVICE SOLO, "Gemini, you can't | fix everyone." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): Gemini the fixer, warmly told to put some of it down.
//   0.0–3.6    "Gemini, you can’t | *fix everyone.*"
//   3.6–37.8   nine cards (3.8 s each):
//              mute one chat tonight · hold the solutions, just listen · you can't juggle everyone's feelings
//              · a friend isn't a project · their storm isn't yours to carry · no is still kind
//              · let someone help you (your match brings tea) · your battery matters too · fix one thing: your sleep
//  37.8        "Off duty. | *Still adored.*"  Gemini comes back, big.
//  41.2        callback: "All those hearts you juggled? | *One’s yours.*"  a heart lands on Gemini.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, phone, pill, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN } from './props.js'

const GEM = '#ffd23a'
const S = 'gemini', ST = { x: -170 }
const M = { font: MONO, weight: 700 }
const HC = { H: '#ff4f86', W: '#fff' }

const CLOUD = ['...WWW.....', '..WWWWW.WW.', '.WWWWWWWWWW', 'WWWWWWWWWWW', '.WWWWWWWWW.']
const MUG = ['.WWWWWW...', 'WPPPPPPW..', 'WPPPPPPWWW', 'WPPPPPPW.W', 'WPPPPPPWWW', 'WPPPPPPW..', '.WWWWWW...']
const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWWLLLLLLWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']

/** a battery 0…1 */
function battery(x, cx, cy, k, p, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -70, 260, 140); x.fillRect(130, -30, 26, 60)
  x.fillStyle = DEEP; x.fillRect(-118, -58, 236, 116)
  x.fillStyle = col; x.fillRect(-108, -48, 216 * clamp(p), 96)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You answer every chat. | *Mute one tonight.*', mood: lt => lt > 1.6 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = lt > 1.4 ? 0 : 12 + Math.floor(lt * 30)
      phone(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { head: lt > 1.4 ? 'MUTED ☾' : `CHATS: ${n}`, headCol: lt > 1.4 ? LAV : RED, lines: [['help!!', CREAM, lt < 1.4 ? 1 : 0], ['quick q', CREAM, lt < 1.4 ? 1 : 0], ['are u up', CREAM, lt < 1.4 ? 1 : 0]], size: 24 })
      if (lt > 1.4) label(x, 790, 900, 'TONIGHT: YOURS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'Hold the solutions. | *Just listen.*', mood: lt => lt > 1.6 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const N = ['PLAN A', 'PLAN B', 'PLAN C']
      N.forEach((s, i) => card(x, 740 + i * 50, 700 + i * 70, 220, 110, pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2) * (1 - ease.inCubic(prog(lt, 1.3, 1.6))), { bg: [GOLD, MINT, PINK][i], rot: 0.06 - i * 0.05 }, () => txt(x, s, 0, 4, { size: 32, ...M })))
      bubble(x, 790, 960, 'i’m listening', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bl' })
    } },
  { sign: S, cap: 'You can’t juggle | *everyone’s feelings.*', mood: lt => lt > 1.7 ? 'wide' : 'sparkle', look: [0, -1], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = 3 + Math.min(4, Math.floor(lt / 0.4))
      for (let i = 0; i < n; i++) { const a = t * 3.2 + i * Math.PI * 2 / n; drawBits(x, HEART, HC, 380 + Math.cos(a) * 170, 640 - Math.abs(Math.sin(a)) * 130, 7 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2)) }
      label(x, 790, 880, `HEARTS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: PINK, rot: 0.04, ...M })
      label(x, 790, 1020, 'HANDS: 2', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'A friend isn’t | *a project.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#f4f1ea', rot: 0.03 }, () => {
        txt(x, 'FIX: SAM', 0, -60, { size: 40, color: lt > 1.1 ? GREY : INK, ...M })
        if (lt > 1.1) { x.fillStyle = RED; x.fillRect(-120, -64, 240 * clamp((lt - 1.1) / 0.2), 8) }
        if (lt > 1.4) txt(x, 'HANG OUT ♥', 0, 40, { size: 40, color: '#e2475e', ...M })
      })
      sparkles(x, t, 790, 880, P.t0 + 1.4 + 0.1, 6, 170, 0.2)
    } },
  { sign: S, cap: 'Their storm | *isn’t yours to carry.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [0, -1], star: ST,
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 1.0, 1.6))
      const cx = lerp(370, 800, p), cy = lerp(660, 760, p)
      drawBits(x, CLOUD, { W: '#9aa5c4' }, cx, cy, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) { x.fillStyle = SKYB; for (let i = 0; i < 6; i++) { const ph = (t * 1.6 + i / 6) % 1; x.fillRect(cx - 70 + i * 28, cy + 40 + ph * 90, 6, 18) } }
      label(x, 800, 1020, 'SET IT DOWN', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'Saying no | *is still kind.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'not tonight ♥', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 900, 'BOUNDARY: SET', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, ...M })
      hearts(x, t, 790, 1060, P.t0 + 1.6, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Let someone | *help you* for once.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 820, 1000, 190 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      drawBits(x, MUG, { W: CREAM, P: '#c98f6a' }, 680, 1000, 11 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 820, 800, '✦ YOUR MATCH', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, ...M })
      bubble(x, 780, 640, 'sit. tea’s here.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: S, cap: 'Your battery | *matters too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = lt < 1.0 ? 0.08 : lerp(0.08, 1, ease.inOutCubic(prog(lt, 1.0, 2.0)))
      battery(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), p, p < 0.3 ? RED : GREEN)
      label(x, 790, 720, p < 0.3 ? 'LOW: 8%' : 'RECHARGING…', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: p < 0.3 ? RED : MINT, color: p < 0.3 ? BONE : INK, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'Fix one thing today: | *your sleep.*', mood: 'sleepy', look: [1, 0], star: { x: -170, y: 20 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { W: CREAM, L: LAV }, 370, 1060, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const ph = (t * 0.5 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * clamp(lt - 0.4); txt(x, 'z', 520 + i * 40 + ph * 60, 760 - ph * 160, { size: 40 + i * 12, color: LAV }); x.restore() }
      label(x, 790, 860, 'DO NOT DISTURB', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, ...M })
    } },
]

const F = makeFilm({
  id: 'r2a0232', key: 'F', accent: GEM, solo: S, ending: 'callback',
  title: 'Gemini, you can’t | *fix everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Off duty. | *Still adored.*', mood: 'heart' },
  last: {
    text: 'The juggled hearts? | *One’s yours.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 540, 1200, 360 * k, { mood: lt > 1.5 ? 'heart' : 'happy', look: [0, -1], seed: 44, hops: [t0 + 1.5] })
      for (let i = 0; i < 5; i++) { const a = t * 1.5 + i * Math.PI * 2 / 5, g = i === 0 ? ease.inOutCubic(prog(lt, 0.8, 1.5)) : 0; drawBits(x, HEART, HC, lerp(540 + Math.cos(a) * 320, 540, g), lerp(1080 + Math.sin(a) * 170, 960, g), (i === 0 ? 13 + 5 * g : 11) * pop01(t, t0 + 0.4 + i * 0.1, 0.3, 2)) }
      sparkles(x, t, 540, 1000, t0 + 1.5, 7, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
