// r2t0075: star_talk, SOLO, "Libra roommates | be like." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film: nine roommate situations, each pushed to the most extreme (and lovable) Libra version.
//   0.0–3.6    "Libra roommates | *be like.*"
//   3.6–37.8   "which mug?" (forty mugs) · moved the couch again · colour-coded chore chart, unused · dinner for two,
//              eight candles · can't pick a show, credits rolling · mediated your fight with the toaster
//              · mirror booked till noon · a note: "no pressure, but…" (a whole essay) · you matched? house meeting.
//  37.8        "Never messy. | *Never decided.*"
//  41.2        CALLBACK: "Still picking | *a mug.*"  Libra and the wall of mugs, back again.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff8fb1', CREAM = '#fff4e2', BROWN = '#8a4a2e', RED = '#e23d4e'
const MUG = ['WWWWW..', 'WWWWWWW', 'WWWWW.W', 'WWWWWWW', '.WWW...']
const COUCH = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LMMMMMMMMMMMML', 'LMMMMMMMMMMMML', 'LLLLLLLLLLLLLL', 'K............K']
const CANDLE = ['.F.', '.Y.', 'WWW', 'WWW', 'WWW', 'WWW']
const TOAST = ['..BB.BB..', '.KKKKKKK.', 'KGGGGGGGK', 'KGGGGGGGK', 'KGGGGGGKK', 'KGGGGGGGK', 'KKKKKKKKK']
const MIRROR = ['..GGGGGGG..', '.GSSSSSSSG.', 'GSSSSSSSSSG', 'GSSSWSSSSSG', 'GSSSSSSSSSG', 'GSSSSSSSSSG', 'GSSSSSSSSSG', '.GSSSSSSSG.', '..GGGGGGG..', '.....G.....', '....GGG....']
const MUG_COLS = [PINK, GOLD, SKYB, MINT, LAV, '#ffb34a', RED, BONE]

function mugWall(x, t, cx, cy, k, n = 16, hi = -1) {
  for (let i = 0; i < n; i++) {
    const c = i % 4, r = Math.floor(i / 4), kk = clamp(k * 3 - i * 0.12)
    drawBits(x, MUG, { W: MUG_COLS[(i * 3) % 8] }, cx - 150 + c * 100, cy - 150 + r * 100, 10 * kk, { rot: i === hi ? 0.2 * Math.sin(t * 12) : 0 })
  }
}
function paper(x, cx, cy, w, h, k, draw, { rot = 0.04, bg = CREAM } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'; draw(x); x.restore()
}

const S = 'libra'
const CAMEOS = [
  { sign: S, cap: '“Which mug?” | *There are forty.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      mugWall(x, t, 800, 850, pop01(t, P.t0 + 0.15, 0.6, 1.2), 16, Math.floor(t * 4) % 16)
      bubble(x, 420, 610, 'no pressure!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Moved the couch. | *Again.*', mood: 'sparkle', look: [1, 0], star: { x: -200, y: -30 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const pos = [640, 860, 700, 820][Math.min(3, Math.floor(lt / 0.6))]
      drawBits(x, COUCH, { L: '#9fd8a8', M: '#6fb07a', K: INK }, pos, 1000, 20 * pop01(t, P.t0 + 0.1, 0.3, 2))
      label(x, 800, 640, 'LAYOUT #47', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Colour-coded chore chart. | *Never used.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      paper(x, 800, 830, 320, 320, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText('CHORES', 0, -130)
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { x.fillStyle = [PINK, SKYB, MINT, LAV][(r + c) % 4]; x.fillRect(-140 + c * 72, -100 + r * 60, 64, 52) }
      })
      label(x, 800, 1090, 'TICKS: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Dinner for two. | *Eight candles.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.2) * 8)
      for (let i = 0; i < n; i++) { const fl = Math.sin(t * 9 + i) > 0 ? GOLD : '#ffb34a'; drawBits(x, CANDLE, { F: fl, Y: '#fff1b0', W: CREAM }, 640 + (i % 4) * 100, 820 + Math.floor(i / 4) * 170, 18) }
      label(x, 800, 640, 'AMBIENCE: MAX', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Picking a show. | *Credits rolling.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      paper(x, 800, 820, 340, 240, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = '#140c30'; x.fillRect(-160, -110, 320, 220)
        x.fillStyle = BONE; x.font = `800 30px ${INTER}`
        if (lt < 1.3) { for (let i = 0; i < 3; i++) { x.fillStyle = [PINK, SKYB, MINT][(i + Math.floor(t * 3)) % 3]; x.fillRect(-140 + i * 96, -60, 84, 120) } }
        else { const sc = ((t * 40) % 220); x.font = `700 22px ${MONO}`; for (let i = 0; i < 6; i++) x.fillText('THE END', 0, 100 - sc + i * 44) }
      }, { bg: '#2a2350' })
      label(x, 800, 1060, 'BROWSING: 2 HRS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mediated your fight | *with the toaster.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, TOAST, { B: '#e8a24a', K: INK, G: '#c9c9d8' }, 840, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'you both | have a point.', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 38, col: ROSE, tail: 'bl' })
      label(x, 820, 1100, 'BURNT, BUT HEARD', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mirror time? | *Booked till noon.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, MIRROR, { G: GOLD, S: '#bfe9ff', W: '#ffffff' }, 800, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1100, 'NEXT SLOT: 12:01', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Left a note: | “*No pressure, but…*”', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const unroll = ease.outCubic(prog(lt, 0.6, 1.6)), h = lerp(140, 560, unroll)
      paper(x, 800, 560 + h / 2, 260, h, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('no pressure, but…', 0, -h / 2 + 40)
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < Math.floor((h - 80) / 30); i++) x.fillRect(-100, -h / 2 + 76 + i * 30, 200 - (i * 37) % 60, 10)
      }, { bg: '#ffe27a', rot: 0.03 })
    } },
  { sign: S, cap: 'You got a match? | *House meeting.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 660, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      paper(x, 800, 900, 300, 260, pop01(t, P.t0 + 0.9, 0.3, 2), x => {
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText('AGENDA', 0, -96)
        x.font = `800 28px ${INTER}`; ['1. their sign?', '2. their chart', '3. snacks'].forEach((s, i) => x.fillText(s, 0, -40 + i * 50))
      })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0075', key: 'F', accent: ROSE, solo: 'libra', ending: 'callback',
  title: 'Libra roommates | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never messy. | *Never decided.*', mood: 'sparkle' },
  last: {
    text: 'Still picking | *a mug.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 360, 1050, 260 * k, { mood: 'wide', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      mugWall(x, t, 720, 1060, pop01(t, t - lt + 0.6, 0.6, 1.2), 16, Math.floor(t * 4) % 16)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
