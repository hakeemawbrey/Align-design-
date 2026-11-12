// r2a0161: star_advice, ADVICE SOLO, "Gemini, protect | your peace." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): Gemini's busy, social, everyone's-messenger life, gently
// reframed toward calm.
//   0.0–3.6    "Gemini, protect | *your peace.*"
//   3.6–37.8   nine cards (3.8 s each):
//              everyone's drama in your DMs, you're not the hotline · hot gossip, let it cool · arguing online, log off
//              and win · always the entertainer, intermission · social battery blinking, recharge · noise everywhere,
//              headphones on · calendar to midnight, block an hour · someone stirring drama, not your pot · peace looks good
//  37.8        group ending: "Calm Gemini. | *Still the fun one.*"  Gemini comes back, big.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, laptop, bar, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'gemini'
const ST = { x: -190 }

const PHONE = ['....KKKKKKKK....', '..KKRRRRRRRRKK..', '.KRRRRRRRRRRRRK.', 'KRRRKKKKKKKKRRRK', 'KRRK........KRRK', '.KK...RRRR...KK.', '.....RRRRRR.....', '....RRWRRWRR....', '....RRRRRRRR....', '....RRWRRWRR....', '....RRRRRRRR....']
const PHONE_C = { K: INK, R: RED, W: CREAM }
const CUP = ['WWWWWWWWW...', 'WTTTTTTTW.WW', 'WTTTTTTTWW.W', 'WTTTTTTTW..W', 'WTTTTTTTWWW.', '.WTTTTTW....', '..WWWWW.....', 'PPPPPPPPPPP.']
const CUP_C = { W: CREAM, T: '#c98f6a', P: '#9aa5c4' }
const PHONES = ['..KKKKKKKKKK..', '.KK........KK.', 'KK..........KK', 'K............K', 'K............K', 'PPP........PPP', 'PPP........PPP', 'PPP........PPP', '.P..........P.']
const PHONES_C = { K: INK, P: PINK }
const POT = ['.KKKKKKKKKKKK.', 'KGGGGGGGGGGGGK', 'KKKKKKKKKKKKKK', '.KHHHHHHHHHHK.', 'KKHHHHHHHHHHKK', '.KHHHHHHHHHHK.', '.KHHHHHHHHHHK.', '..KKKKKKKKKK..']
const POT_C = { K: INK, G: '#7dffb0', H: '#6b62a8' }
const SPOON = ['.WW.', 'WWWW', '.WW.', '.W..', '.W..', '.W..', '.W..', '.W..', '.W..']
const PLANT = ['..G.G..', '.GGGGG.', 'GG.G.GG', '...G...', '.TTTTT.', '.TTTTT.', '..TTT..']
const PLANT_C = { G: '#5fd068', T: ORANGE }

/** a little wavy steam / noise squiggle */
function squiggle(x, cx, cy, len, t, a, col = BONE, w = 6) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.strokeStyle = col; x.lineWidth = w; x.beginPath()
  for (let i = 0; i <= 12; i++) { const yy = cy - i * len / 12, xx = cx + Math.sin(i * 0.9 + t * 5) * 10; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
  x.stroke(); x.restore()
}
/** theatre curtains closing from both sides (0 open … 1 closed) over a w×h stage at (cx, cy) */
function curtains(x, cx, cy, w, h, c) {
  for (const d of [-1, 1]) {
    const cw = (w / 2) * c
    x.fillStyle = INK; x.fillRect(d < 0 ? cx - w / 2 - 6 : cx + w / 2 - cw - 6, cy - h / 2, cw + 12, h)
    x.fillStyle = '#c2304a'; x.fillRect(d < 0 ? cx - w / 2 : cx + w / 2 - cw, cy - h / 2, cw, h)
    x.fillStyle = '#9a1f38'; for (let i = 0; i < 4; i++) x.fillRect((d < 0 ? cx - w / 2 : cx + w / 2 - cw) + (i + 0.5) * cw / 4 - 4, cy - h / 2, 8, h)
  }
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 14, cy - h / 2 - 30, w + 28, 36); x.fillStyle = GOLD; x.fillRect(cx - w / 2 - 8, cy - h / 2 - 24, w + 16, 24)
}

const CAMEOS = [
  { sign: S, cap: 'Everyone’s drama? | You’re not *the hotline.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ring = lt < 1.3, sh = ring ? Math.sin(t * 40) * 6 : 0
      drawBits(x, PHONE, PHONE_C, 790 + sh, 830, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (ring && lt > 0.3) for (const d of [-1, 1]) { x.fillStyle = GOLD; x.fillRect(790 + d * 190 - 6, 760, 12, 40); x.fillRect(790 + d * 230 - 6, 740, 12, 70) }
      label(x, 790, 680, 'LINE 1: DRAMA', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1050, 'HOTLINE: CLOSED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hot gossip arrived? | *Let it cool off.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), cool = ease.inOutCubic(prog(lt, 0.9, 1.6))
      drawBits(x, CUP, CUP_C, 790, 920, 20 * k)
      for (let i = 0; i < 3; i++) squiggle(x, 730 + i * 50, 800, 140, t + i, k * (1 - cool) * 0.9, i === 1 ? PINK : BONE)
      label(x, 790, 680, 'FRESH TEA', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'NOW: ROOM TEMP', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Arguing online? | *Log off. You win.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const off = lt > 1.2
      laptop(x, 770, 930, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        if (off) { x.fillStyle = '#05040c'; x.fillRect(-126, -76, 252, 152); txt(x, 'logged off', 0, 0, { size: 30, color: GREY, font: MONO, weight: 700 }); return }
        txt(x, 'REPLIES (812)', 0, -50, { size: 26, color: BONE, font: MONO, weight: 700 })
        for (let i = 0; i < 3; i++) { x.fillStyle = [RED, ORANGE, RED][i]; x.fillRect(-100, -14 + i * 30, 200 - i * 40, 18) }
      })
      label(x, 790, 640, 'YOU WIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 48, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 640, P.t0 + 1.6, 6, 150, 0.2)
    } },
  { sign: S, cap: 'Always the entertainer? | *Intermission is allowed.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k
      x.fillStyle = 'rgba(20,12,48,0.6)'; x.fillRect(620, 660, 340, 380)
      if (lt < 1.0) notes(x, t, 790, 980, { n: 4, cell: 7, col: GOLD })
      curtains(x, 790, 850, 340, 380, ease.inOutCubic(prog(lt, 0.7, 1.3)))
      x.restore()
      label(x, 790, 850, 'INTERMISSION', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'BACK IN 20', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Social battery blinking red? | *Recharge first.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ch = ease.inOutCubic(prog(lt, 0.9, 2.0)), lvl = lerp(0.08, 1, ch)
      const blink = lt < 0.9 && Math.floor(t * 4) % 2
      bar(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lvl, 'SOCIAL BATTERY', { col: lvl < 0.3 ? (blink ? '#5a1424' : RED) : lvl < 0.7 ? ORANGE : MINT, w: 320 })
      label(x, 790, 980, 'PLUGGED INTO: A NAP', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 2.0) sparkles(x, t, 790, 820, P.t0 + 2.0 * 1.29, 6, 190, 0.2, [MINT, BONE, GOLD])
    } },
  { sign: S, cap: 'Noise everywhere? | *Headphones on. World off.*', mood: lt => lt > 1.1 ? 'sleepy' : 'wide', star: ST,
    back(x, t, lt, P) {
      const quiet = ease.inOutCubic(prog(lt, 0.8, 1.3))
      for (let i = 0; i < 6; i++) squiggle(x, 620 + (i % 3) * 140, 760 + Math.floor(i / 3) * 260, 110, t * 1.6 + i, (1 - quiet) * 0.8, [RED, ORANGE, GOLD][i % 3], 7)
      bubble(x, 790, 640, 'BLAH BLAH', (1 - quiet) * pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: ORANGE, tail: 'bl' })
    },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.5, 0.9))
      drawBits(x, PHONES, PHONES_C, F.x, lerp(F.top - 220, F.top + 30, d), 20, { alpha: clamp(d * 3) })
      if (lt > 1.1) notes(x, t, F.x + 140, F.cy - 60, { n: 3, cell: 6, col: MINT })
      label(x, 790, 1060, 'WORLD: MUTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Booked till midnight? | *Block an hour for you.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const ROWS = [['9', 'brunch x2', PINK], ['1', 'call mom', SKYB], ['4', 'GEMINI TIME', MINT], ['7', 'party?', ORANGE], ['11', 'more party', LAV]]
      card(x, 790, 860, 380, 400, k, { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'TODAY', 0, -165, { size: 30, font: MONO, weight: 700 })
        ROWS.forEach(([h, s, c], i) => {
          const me = i === 2, on = me ? pop01(t, P.t0 + 1.2, 0.3, 2.4) : 1, y = -105 + i * 66
          txt(x, h, -160, y, { size: 28, font: MONO, weight: 700 })
          if (on > 0.01) { x.save(); x.translate(30, y); x.scale(on, on); x.fillStyle = me ? c : '#e8dfcf'; x.fillRect(-140, -26, 280, 52); txt(x, s, 0, 2, { size: me ? 32 : 28, weight: me ? 800 : 700, color: me ? INK : '#6e6658' }); x.restore() }
        })
      })
      if (lt > 1.2) sparkles(x, t, 820, 856, P.t0 + 1.25 * 1.29, 6, 160, 0.4)
    } },
  { sign: S, cap: 'Someone stirring drama? | *Not your pot.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), st = lt < 1.3
      drawBits(x, POT, POT_C, 790, 950, 22 * k)
      drawBits(x, SPOON, { W: '#c9c9d8' }, 790 + (st ? Math.sin(t * 9) * 50 : 0), 800, 16 * k, { rot: st ? Math.sin(t * 9) * 0.3 : 0 })
      for (let i = 0; i < 3; i++) squiggle(x, 720 + i * 70, 860, 100, t + i * 2, k * 0.6, LAV)
      label(x, 790, 1120, 'POT: DRAMA', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 620, 'not my pot!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Peace looks | *good on you.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', star: { x: -150 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { hearts(x, t, 390, 1000, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 7 }) },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 680, 'PEACE: PROTECTED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'SPARKLE: INTACT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0161', key: 'D', accent: GOLD, solo: S, ending: 'group',
  title: 'Gemini, protect | *your peace.*',
  cameos: CAMEOS,
  group: { cap: 'Calm Gemini. | *Still the fun one.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
