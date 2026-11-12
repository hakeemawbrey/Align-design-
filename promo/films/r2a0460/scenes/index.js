// r2a0460: star_advice, ADVICE ROLLCALL, "Each sign's | *team role.*" (signs3kit social cut, music: lofi · G).
// Ending: callback (Taurus's snacks come back as the celebration cake: "Project done. | Cake by Taurus.").
//   ♈ the spark, starts it first · ♉ the steady one, brings the snacks · ♊ the idea machine · ♋ the heart, checks on
//   everyone · ♌ the cheerleader, makes it fun · ♍ the details, catches every typo · ♎ the peacemaker, everyone heard
//   · ♏ the deep diver, finds the real problem · ♐ the optimist · ♑ the planner, done before the deadline
//   · ♒ the inventor, the weird idea works · ♓ the dreamer, feels the whole vision (tears)
//   group "Every role. | One team."   last "Project done. | Cake by Taurus."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -190 }

const FLAG = ['KRRRRRRR', 'KRRRRRRR', 'KRRWWRRR', 'KRRRRRRR', 'KRRRRRRR', 'K.......', 'K.......', 'K.......', 'K.......', 'K.......']
const FLAG_C = { K: BONE, R: RED, W: CREAM }
const BOWL = ['.Y.O.Y.O.Y.', 'YOYOYOYOYOY', 'BBBBBBBBBBB', '.BBBBBBBBB.', '..BBBBBBB..']
const BOWL_C = { Y: GOLD, O: '#ff9a4a', B: SKYB }
const BULB = ['..YYY..', '.YYYYY.', 'YYYWYYY', 'YYYYYYY', '.YYYYY.', '..SSS..', '..SSS..']
const BULB_C = { Y: GOLD, W: '#ffffff', S: SLATE }
const POM = ['.P.P.P.', 'P.PPP.P', '.PPPPP.', 'PPPPPPP', '.PPPPP.', 'P.PPP.P', '.P.P.P.']
const GEAR = ['...GG...', '.GGGGGG.', '.GG..GG.', 'GG....GG', 'GG....GG', '.GG..GG.', '.GGGGGG.', '...GG...']
const CAKE = ['..F...F...F..', '..C...C...C..', '.PPPPPPPPPPP.', '.PWPWPWPWPWP.', 'BBBBBBBBBBBBB', 'BBBBBBBBBBBBB', 'PPPPPPPPPPPPP', 'BBBBBBBBBBBBB', 'KKKKKKKKKKKKK']
const CAKE_C = { F: '#ffb34a', C: CREAM, P: PINK, W: CREAM, B: '#c98f5a', K: '#8a4a2e' }

/** a sheet with a header and rows */
function sheet(x, cx, cy, k, { w = 330, h = 300, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || INK; x.font = `700 ${size}px ${MONO}`
    x.fillText(txt, -w / 2 + 22, -h / 2 + (head ? 60 : 0) + 44 + i * (size + 18)); x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'The spark. | *Starts it first.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 800, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 5) })
      L(x, 790, 1120, 'GO!', pop01(t, P.t0 + 1.0, 0.3, 2.6), GOLD, -0.06, 52)
    } },
  { sign: 'taurus', cap: 'The steady one. | *Brings the snacks.*', mood: 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'MORALE: FED', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, 0.04, 40)
    } },
  { sign: 'gemini', cap: 'The idea machine. | *Ten a minute.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.2) / 0.3) + 1)
      for (let i = 0; i < n; i++) drawBits(x, BULB, BULB_C, 680 + (i % 2) * 200, 720 + Math.floor(i / 2) * 230, 18 * pop01(t, P.t0 + 0.2 + i * 0.38, 0.25, 2.2), { rot: (i % 2 ? 0.1 : -0.1) })
    } },
  { sign: 'cancer', cap: 'The heart. | *Checks on everyone.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'EVERYONE OK?', headCol: SKYB, rows: [
        ['✓ ate lunch', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['✓ hydrated', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['✓ feels heard', RED, pop01(t, P.t0 + 1.2, 0.2, 2)],
      ] })
    } },
  { sign: 'leo', cap: 'The cheerleader. | *Makes it fun.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POM, { P: GOLD }, 700, 800 + Math.sin(t * 9) * 20, 18 * k)
      drawBits(x, POM, { P: PINK }, 880, 800 - Math.sin(t * 9) * 20, 18 * k)
      L(x, 790, 1060, 'TEAM SPIRIT: 100', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'virgo', cap: 'The details. | *Catches every typo.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FINAL_v9', headCol: MINT, rows: [
        ['Projcet plan', INK, 1], ['fixed: 41', RED, pop01(t, P.t0 + 1.0, 0.2, 2)],
      ] })
      const r = ease.outCubic(prog(lt, 0.6, 0.9))
      if (r > 0) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(760, 814, 120 * r, 34 * r, 0.04, 0, Math.PI * 2); x.stroke() }
    } },
  { sign: 'libra', cap: 'The peacemaker. | *Everyone feels heard.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'and what do | YOU think?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      L(x, 790, 940, 'VOTES: ALL IN', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 38)
    } },
  { sign: 'scorpio', cap: 'The deep diver. | *Finds the real problem.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) { const ph = ((t * 0.8 + i / 6) % 1); x.save(); x.globalAlpha = 0.8 * Math.sin(Math.PI * ph); x.strokeStyle = SKYB; x.lineWidth = 5; x.beginPath(); x.arc(720 + (i % 3) * 70 + Math.sin(ph * 6 + i) * 10, 1060 - ph * 380, 12 + (i % 3) * 6, 0, Math.PI * 2); x.stroke(); x.restore() }
      L(x, 790, 700, 'DEPTH: VERY', pop01(t, P.t0 + 0.4, 0.3, 2.2), SKYB, 0.04, 38)
      L(x, 790, 1080, 'ROOT CAUSE: FOUND', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'The optimist. | *“We’ve got this!”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'deadline’s | tomorrow? easy!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      L(x, 790, 940, 'VIBES: SUNNY', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 38)
    } },
  { sign: 'capricorn', cap: 'The planner. | Done *before the deadline.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TIMELINE', headCol: SLATE, rows: [
        ['due: friday', INK, 1], ['done: tuesday ✓', RED, pop01(t, P.t0 + 1.0, 0.2, 2)],
      ] })
    } },
  { sign: 'aquarius', cap: 'The inventor. | *The weird idea works.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, GEAR, { G: SKYB }, 730, 820, 18 * k, { rot: t * 1.5 })
      drawBits(x, GEAR, { G: MINT }, 860, 920, 14 * k, { rot: -t * 2 })
      L(x, 790, 1100, 'IT WORKS?!', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 42)
    } },
  { sign: 'pisces', cap: 'The dreamer. | *Feels the whole vision.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 760, 'VISION: BEAUTIFUL', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, -0.04, 34)
      sparkles(x, t, 790, 760, P.t0 + 0.6, 8, 200, 0.2, [LAV, SKYB, BONE])
      hearts(x, t, 790, 1000, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0460', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *team role.*',
  cameos: CAMEOS,
  group: { cap: 'Every role. | *One team.*' },
  last: {
    text: 'Project done. | *Cake by Taurus.*',
    draw(x, t, lt) {
      drawBits(x, CAKE, CAKE_C, 540, 1080, 26 * pop01(t, t - lt + 0.6, 0.4, 2))
      sparkles(x, t, 540, 1000, t - lt + 1.0, 9, 230, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
