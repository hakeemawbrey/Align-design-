// r2a0336: star_advice, ADVICE SOLO (gemini), "Gemini, here's your | *Monday pep talk.*" (signs3kit social cut,
// music: lofi · D). Ending: callback (the forty browser tabs: tab 41 says you've got this).
//   forty tabs open = a curious mind · changed the plan again = growth · five hobbies = every one counts
//   · two moods by noon = both welcome · walked in and forgot why = still a great entrance · Monday heavy = one cup at a time
//   · 99 unread = reply when ready · talked all lunch = they loved it · feel like too much = just enough
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, card, lines, phone, confetti, CUP, CUP_C, RED, CREAM, ORANGE, GREY, PURP } from './props.js'

const ACC = '#ffd23a'
/** a browser window with n tiny tabs along the top and a line of text in the page */
function browser(x, cx, cy, k, n, text, { rot = 0.04, w = 380, h = 300, hl = -1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#d8dbe8'; x.fillRect(-w / 2, -h / 2, w, 56)
  const tw = Math.max(6, (w - 20) / Math.max(1, n))
  for (let i = 0; i < n; i++) { x.fillStyle = i === hl ? GOLD : [LAV, SKYB, PINK, MINT][i % 4]; x.fillRect(-w / 2 + 10 + i * tw, -h / 2 + 10, tw - 2, 30) }
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2 + 56, w, h - 56)
  x.fillStyle = '#c9cde0'; for (let i = 0; i < 3; i++) x.fillRect(-w / 2 + 30, -h / 2 + 90 + i * 34, w - 60 - i * 50, 14)
  if (text) { x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, h / 2 - 70) }
  x.restore()
}
const STEAM = (x, t, cx, cy) => { x.save(); x.fillStyle = 'rgba(239,230,214,0.7)'; for (let i = 0; i < 3; i++) { const ph = ((t * 0.8 + i / 3) % 1 + 1) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillRect(cx - 30 + i * 28 + Math.sin(ph * 6 + i) * 8, cy - ph * 110, 10, 26) } x.restore() }
const GUITAR = ['....KK', '....KK', '...KK.', '..KK..', '.OOO..', 'OOOOO.', 'OOKOO.', 'OOOOO.', '.OOO..']
const GUITAR_C = { K: '#7a4a2e', O: ORANGE }
const YARN = ['.PPPP.', 'PPpPPP', 'PpPPpP', 'PPPpPP', 'PpPPPP', '.PPPP.']
const YARN_C = { P: PINK, p: '#ff4f86' }
const BRUSH = ['......YY', '.....YY.', '....KK..', '...KK...', '..KK....', '.KK.....', 'KK......']
const BRUSH_C = { Y: MINT, K: '#7a4a2e' }
const PLANT = ['..GG.GG.', '.GGGGGG.', '..GGGG..', '...GG...', '.TTTTTT.', '.TTTTTT.', '..TTTT..']
const PLANT_C = { G: '#5fd068', T: '#c46a3a' }
const DOOR = ['KKKKKKKK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWYK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK', 'KKKKKKKK']
const DOOR_C = { K: '#7a4a2e', W: '#c98f5a', Y: GOLD }

const S = 'gemini', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Forty tabs open? | That’s a *curious mind.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const n = 3 + Math.floor(clamp((lt - 0.3) / 1.0) * 37)
      browser(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), n, '')
      L(x, 790, 640, `TABS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 36)
      if (lt > 1.4) L(x, 790, 1080, 'ALL INTERESTING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Changed the plan again? | That’s *growing.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const plans = ['PLAN A', 'PLAN B', 'PLAN C', 'PLAN Q']
      const i = Math.min(3, Math.floor(clamp((lt - 0.3) / 1.2) * 4))
      card(x, 790, 820, 300, 200, pop01(t, P.t0 + 0.25, 0.35, 2), -0.04, x => lines(x, [plans[i]], { size: 56, font: MONO, weight: 700 }), i === 3 ? '#ffe76a' : CREAM)
      if (lt > 1.6) bubble(x, 790, 1050, 'still me. new map.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Five new hobbies? | *Every one counts.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      const items = [[GUITAR, GUITAR_C, 690, 740, 0.2], [YARN, YARN_C, 880, 720, 0.6], [BRUSH, BRUSH_C, 700, 950, 1.0], [PLANT, PLANT_C, 890, 950, 1.4]]
      items.forEach(([bm, c, px, py, at], j) => drawBits(x, bm, c, px, py, 22 * pop01(t, P.t0 + at, 0.3, 2.2), { rot: (j % 2 ? 0.1 : -0.1) }))
      if (lt > 1.8) L(x, 790, 1120, 'NEXT: PIANO?', pop01(t, P.t0 + 1.8, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'Two moods by noon? | *Both are welcome.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      // the twin: a second Gemini star, grumpy, who cheers up too
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 900, 230 * k, { mood: lt > 1.5 ? 'heart' : 'eyeroll', seed: 33, look: [-1, 0], glyph: false, hops: [P.t0 + 1.5] })
      L(x, 760, 640, lt > 1.5 ? 'ALSO FINE' : 'MOOD 2', pop01(t, P.t0 + 0.5, 0.3, 2), lt > 1.5 ? MINT : GREY, 0.04, 36)
      if (lt > 1.5) hearts(x, t, 790, 800, P.t0 + 1.5, { n: 5, life: 1.5, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Walked in, forgot why? | Still a *great entrance.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [0, -1], star: ST, hops: [0.3],
    back(x, t, lt, P) { drawBits(x, DOOR, DOOR_C, 330, 820, 40 * pop01(t, P.t0 + 0.05, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 560, 600, '…why am I here?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      if (lt > 1.4) { L(x, 800, 1000, '10/10 ENTRANCE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.05, 34); sparkles(x, t, 400, 860, P.t0 + 1.4, 7, 180, 0.3) }
    } },
  { sign: S, cap: 'Monday feels heavy? | *One cup at a time.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, CUP, CUP_C, 790, 920, 26 * k)
      if (k > 0.8) STEAM(x, t, 770, 800)
      L(x, 790, 640, 'MON.', pop01(t, P.t0 + 0.2, 0.3, 2), GREY, -0.04, 44)
      if (lt > 1.4) L(x, 790, 1110, 'SIP. BREATHE. GO.', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: '99 unread? | Reply when *you’re ready.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { head: 'MESSAGES', headCol: SKYB,
        rows: [['hey!!', LAV, pop01(t, P.t0 + 0.5, 0.25, 2)], ['you there?', PINK, pop01(t, P.t0 + 0.7, 0.25, 2)], ['no rush :)', MINT, pop01(t, P.t0 + 1.5, 0.25, 2)]] })
      const bk = pop01(t, P.t0 + 0.4, 0.3, 2.2)
      if (bk > 0.01) { x.save(); x.translate(925, 650); x.scale(bk, bk); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('99', 0, 2); x.restore() }
    } },
  { sign: S, cap: 'Talked through all of lunch? | They *loved it.*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 960, 210 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 19, glyph: false })
      bubble(x, 560, 620, 'and THEN, part 7…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      if (lt > 1.5) bubble(x, 830, 740, 'part 8?!', pop01(t, P.t0 + 1.5, 0.25, 2.4), { size: 38, tail: 'bc', col: MINT })
    } },
  { sign: S, cap: 'Feel like too much? | You’re *just enough.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const at = 1.0
      if (lt < at + 0.3) {
        L(x, 760, 860, 'TOO MUCH', pop01(t, P.t0 + 0.3, 0.3, 2), GREY, -0.04, 48)
        if (lt > at) { const p = clamp((lt - at) / 0.25); x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(610, 875); x.lineTo(610 + 300 * p, 845); x.stroke(); x.restore() }
      } else {
        L(x, 760, 860, 'JUST ENOUGH', pop01(t, P.t0 + at + 0.3, 0.3, 2.4), MINT, 0.04, 44)
        sparkles(x, t, 790, 860, P.t0 + at + 0.35, 8, 200, 0.4)
      }
      if (lt > 1.6) hearts(x, t, 560, 800, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0336', key: 'D', accent: ACC, solo: 'gemini', ending: 'callback',
  title: 'Gemini, here’s your | *Monday pep talk.*',
  cameos: CAMEOS,
  group: { cap: 'Busy brain. | *Big heart.*', mood: 'heart' },
  last: {
    text: 'Tab 41: | *you’ve got this.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'gemini', 330, 1100, 250 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 1.3, t0 + 2.0] })
      browser(x, 730, 1080, pop01(t, t0 + 0.6, 0.4, 2) * 1.2, 41, lt > 1.1 ? 'you’ve got this.' : '', { hl: 40 })
      if (lt > 1.1) sparkles(x, t, 740, 1060, t0 + 1.1, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
