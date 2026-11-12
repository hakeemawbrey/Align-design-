// r2a0572: star_advice, ADVICE SOLO, "What a Capricorn | *won't say out loud.*" (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine quiet Capricorn truths, each with a warm reframe and one light visual gag. Ending: callback.
//   0.0–3.6    "What a Capricorn | *won't say out loud.*"
//   3.6–37.8   nine cards: "I'm fine" means tired, offer the couch · they want the praise, say it anyway · they plan to feel
//              safe · they miss you, so they sent a link · asking for help is hard, offer first · they remember your wins
//              · rest feels like failing, it's not · dry jokes, laugh anyway · they love you in spreadsheets
//  37.8        "Quiet love. | *Still love.*"
//  41.2        CALLBACK: "Here's your gold star. | *You earned it.*"  card two's gold star sticker lands on the Capricorn.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#5fe0b0', PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }
const S = 'capricorn'

function txt(x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }
function sheet(x, cx, cy, w, h, k, rot, fn, bg = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(); x.restore()
}
const COUCH = ['.CCCCCCCCCCCC.', 'CCCCCCCCCCCCCC', 'AACCCCCCCCCCAA', 'AAPPPPPPPPPPAA', 'AAPPPPPPPPPPAA', 'AAAAAAAAAAAAAA', '.K..........K.']
const STARS = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYWYYY.', '..YYYYY..', '.YY...YY.', 'YY.....YY']
const BOX = ['KKKKKKKKKK', 'KBBBBBBBBK', 'KBBBTTBBBK', 'KBBBBBBBBK', 'KKKKKKKKKK']
const BATT = ['KKKKKKKKKKKK.', 'K..........KK', 'K..........KK', 'K..........KK', 'KKKKKKKKKKKK.']

// the gold star sticker (also the callback): a star badge with "GOOD JOB" under it
function goldStar(x, t, cx, cy, k, rot = -0.1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 92, 0, 7); x.fill()
  x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(0, 0, 84, 0, 7); x.fill()
  drawBits(x, STARS, { Y: GOLD, W: '#ffffff' }, 0, -18, 11)
  txt(x, 'GOOD JOB', 0, 50, 22, INK, MONO, 700)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: '“I’m fine” means tired. | *Offer the couch.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'i’m fine.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      drawBits(x, COUCH, { C: '#6fc3ff', A: '#4a8fd0', P: '#bfe6ff', K: BROWN }, 790, 960, 20 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 790, 1120, 'NAP: APPROVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'They want the praise. | *Say it anyway.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: lt => lt > 1.2 ? [1, 0] : [-1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      goldStar(x, t, 790, 860, 1.6 * pop01(t, P.t0 + 0.35, 0.35, 2))
      bubble(x, 790, 1090, 'oh. it was nothing.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 650, 'SMILING: SECRETLY', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'They plan to feel safe. | *Not to control.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 880, 300, 300, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, () => {
        x.fillStyle = ACC; x.fillRect(-150, -150, 300, 50); txt(x, 'THIS WEEK', 0, -124, 26, INK, MONO, 700)
        const n = Math.floor(clamp((lt - 0.3) / 1.2) * 5)
        for (let i = 0; i < 5; i++) { x.fillStyle = i < n ? '#2fc79a' : '#d8d0c0'; x.fillRect(-120, -76 + i * 46, 30, 30); x.fillStyle = GREY; x.fillRect(-74, -68 + i * 46, 180, 14) }
      })
      L(x, 790, 1110, 'PLAN = CALM', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 34)
    } },
  { sign: S, cap: 'They miss you. | *They sent a link.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 870, 260, 400, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        x.fillStyle = '#140c30'; x.fillRect(-116, -176, 232, 352)
        x.fillStyle = ACC; x.fillRect(-100, -140, 200, 120)
        drawBits(x, ['..WW..', '.WWWW.', 'WWWWWW', '.W..W.'], { W: PAPER }, 0, -86, 14)
        txt(x, 'goats doing', 0, 10, 26, BONE, INTER, 700); txt(x, 'yoga (link)', 0, 46, 26, BONE, INTER, 700)
      }, '#2a2350')
      L(x, 790, 1120, 'TRANSLATION: MISS YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 26)
    } },
  { sign: S, cap: 'Asking for help is hard. | *Offer first.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      const take = ease.outCubic(prog(lt, 1.0, 1.6))
      for (let i = 0; i < 5; i++) {
        const top = i === 4
        drawBits(x, BOX, { K: BROWN, B: '#c8935a', T: PAPER }, lerp(560, top ? 830 : 560, top ? take : 0), lerp(1000 - i * 72, top ? 900 : 1000 - i * 72, top ? take : 0) - 150, 15 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      }
      signChar(x, t, 'cancer', 830, 1000, 190 * pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'happy', look: [-1, 0], seed: 19, glyph: false })
      bubble(x, 830, 680, 'got this one.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bc' })
    } },
  { sign: S, cap: 'They remember everything. | *Especially your wins.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 870, 260, 330, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, () => {
        x.fillStyle = '#d8d0c0'; x.fillRect(-130, -165, 26, 330)
        txt(x, 'YOUR WINS', 10, -110, 30, INK, MONO, 700); txt(x, 'VOL. 3', 10, -66, 26, '#2fc79a', MONO, 700)
        drawBits(x, STARS, { Y: GOLD, W: '#fff' }, 10, 40, 11)
      }, ACC)
      L(x, 790, 1110, 'FILED SINCE 2019', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Rest feels like failing. | *It’s not.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), p = clamp((lt - 0.4) / 1.4)
      drawBits(x, BATT, { K: BONE }, 790, 870, 22 * k)
      if (k > 0.9) { x.fillStyle = p > 0.8 ? '#5fd068' : p > 0.4 ? GOLD : RED; x.fillRect(790 - 110, 870 - 22 * 1.5 + 2, 220 * p, 22 * 3 - 4) }
      L(x, 790, 700, 'RECHARGING…', pop01(t, P.t0 + 0.5, 0.3, 2.4), ACC, -0.04, 32)
      L(x, 790, 1050, 'ALLOWED. ENCOURAGED.', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 28)
    } },
  { sign: S, cap: 'Dry jokes, big heart. | *Laugh anyway.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'i’m a delight.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 900, 'FACE: UNMOVED', pop01(t, P.t0 + 0.9, 0.3, 2.4), BONE, -0.04, 30)
      L(x, 790, 1040, 'DEADPAN: 10/10', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.05, 32)
    } },
  { sign: S, cap: 'They love you | *in spreadsheets.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 870, 320, 300, pop01(t, P.t0 + 0.2, 0.3, 2), 0.03, () => {
        x.fillStyle = '#2fc79a'; x.fillRect(-160, -150, 320, 44); txt(x, 'TAB: YOU', 0, -128, 24, PAPER, MONO, 700)
        const R = [['bday', 'MAR 4'], ['snack', 'mango'], ['sign', '♓︎'], ['fave', 'yes']]
        const n = Math.min(4, Math.floor(clamp((lt - 0.3) / 1.2) * 4) + 1)
        x.strokeStyle = '#c8c0b0'; x.lineWidth = 2
        for (let i = 0; i < n; i++) { const y = -82 + i * 56; x.strokeRect(-140, y - 24, 130, 48); x.strokeRect(-10, y - 24, 150, 48); txt(x, R[i][0], -75, y, 24, '#4a4470', MONO, 700); txt(x, R[i][1], 65, y, 26, INK, i === 2 ? "'Segoe UI Symbol','Noto Sans Symbols',serif" : INTER, 800) }
      })
      if (lt > 1.5) hearts(x, t, 790, 760, P.t0 + 1.7, { n: 4, life: 1.4, spread: 220, cell: 7, seed: 6 })
      L(x, 790, 1110, 'UPDATED DAILY', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0572', key: 'F', accent: ACC, solo: 'capricorn', ending: 'callback',
  title: 'What a Capricorn | *won’t say out loud.*',
  cameos: CAMEOS,
  group: { cap: 'Quiet love. | *Still love.*', mood: 'heart' },
  last: {
    text: 'Here’s your gold star. | *You earned it.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'capricorn', 540, 1150, 380 * k, { mood: lt > 1.4 ? 'heart' : 'neutral', seed: 33, hops: [t0 + 1.4] })
      const d = ease.outCubic(prog(lt, 0.8, 1.3))
      goldStar(x, t, lerp(980, 720, d), lerp(700, 980, d), 1.3 * pop01(t, t0 + 0.8, 0.3, 2), -0.2)
      sparkles(x, t, 700, 1000, t0 + 1.35, 8, 140, 0.3)
      if (lt > 1.5) hearts(x, t, 540, 1420, t0 + 1.5, { n: 6, life: 1.8, spread: 600, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
// the hook's accent line is long: widen the title box so each ' | ' line stays on one line, then scale it to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-160px', width: '1400px', transformOrigin: '50% 0', transform: 'scale(0.76)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
