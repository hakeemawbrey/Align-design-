// r2t0602: star_talk, ROLLCALL (twelve signs), "The signs | *on a ski trip.*" (signs3kit social cut, music: lofi · E).
// Aries checked compatibility with the black run · Taurus never left the lodge · Gemini matched on the chairlift
// · Cancer packed snacks for the whole mountain · Leo fell once, called it choreography · Virgo's list for the packing
// list · Libra, two hours choosing goggles · Scorpio vanished on run one · Sagittarius did every slope before breakfast
// · Capricorn tracks cost per run · Aquarius built a snowman with Wi-Fi · Pisces cried at the view, the tears froze.
// Ending: group. "Same mountain. | *Twelve* trips." under falling snow.
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = SKYB, ST = { x: -180 }
const SNOWMAN = ['.....K.....', '.....K.....', '....WWW....', '...WKWKW...', '...WWOWW...', '....WWW....', '..WWWWWWW..', '.WWWWKWWWW.', '.WWWWWWWWW.', '.WWWWKWWWW.', '..WWWWWWW..']
const SNOWMAN_C = { W: '#ffffff', K: INK, O: '#ff8a3a' }
const SKI = ['RR..........', '.RRRRRRRRRRR', '..........RR']
const MOUNT = ['.....W.....', '....WWW....', '...WSSSW...', '..SSSSSSS..', '.SSSSSSSSS.', 'SSSSSSSSSSS']
const MOUNT_C = { W: '#ffffff', S: '#6b7fb8' }

function snow(x, t, { n = 26, alpha = 0.9, x0 = 120, w = 840, y0 = 470, h = 780 } = {}) {
  x.save(); x.fillStyle = '#ffffff'
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.18 + i * 0.137) % 1 + 1) % 1
    x.globalAlpha = alpha * Math.sin(Math.PI * ph)
    x.fillRect(x0 + ((i * 97) % w) + Math.sin(t * 1.5 + i) * 14, y0 + ph * h, 8, 8)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Skipped the lesson. | Took the *black run.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 800, 820, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 650, '◆◆ EXPERTS ONLY', pop01(t, P.t0 + 0.6, 0.3, 2.2), BONE, -0.04, 32)
      L(x, 800, 1060, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Never touched snow. | Lived in the *lodge.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 800)
      L(x, 800, 1090, 'COCOA COUNT: 11', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Matched on the chairlift. | *Missed* the top.', mood: 'wink', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 660, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      bubble(x, 790, 860, 'so what’s your rising?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, col: BONE, tail: 'br' })
      const lap = 1 + Math.floor(clamp((lt - 0.8) / 1.4) * 8)
      L(x, 800, 1080, `LIFT RIDE #${lap}`, pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Packed snacks for | the *whole mountain.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'SANDWICH', 800 + (i % 2 ? 30 : -30), 1000 - i * 95, 14 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), { rot: (i % 2 ? 0.06 : -0.06) })
      L(x, 800, 1120, 'SANDWICH FOR YOU? ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Fell once. | Called it *choreography.*', mood: lt => lt > 1.0 ? 'wink' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.0], squash: lt => lt < 0.9 ? 0.12 : 0,
    front(x, t, lt, P, F) {
      drawBits(x, SKI, { R: RED }, F.x + 30, F.cy + 150, 16 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: lt < 0.9 ? 0.5 : 0 })
      L(x, 800, 760, 'JUDGES: 10 / 10', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 38)
      sparkles(x, t, 800, 800, P.t0 + 1.1, 7, 200, 0.2)
      bubble(x, 800, 980, 'meant that.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Made a packing list | for the *packing list.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 860, 940, pop01(t, P.t0 + 0.5, 0.35, 2), { w: 290, h: 280, rot: 0.06, head: 'LIST #2', headBg: MINT, headInk: INK, lines: ['☐ list #1', '☐ pen', '☐ backup pen'], size: 30, progress: clamp((lt - 0.7) / 0.9) })
      sheet(x, 700, 720, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 240, h: 170, rot: -0.07, head: 'LIST #1', headBg: STEEL, headInk: INK, lines: ['☐ skis'], size: 30 })
      L(x, 760, 1120, 'LIST #3: PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Two hours | choosing *goggles.*', mood: lt => lt > 1.6 ? 'sparkle' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, ['KKKKKKKKKKK', 'KPPPPKPPPPK', 'KPPPPKPPPPK', '.KKKK.KKKK.'], { K: INK, P: PINK }, 700, 820, 20 * k)
      drawBits(x, ['KKKKKKKKKKK', 'KGGGGKGGGGK', 'KGGGGKGGGGK', '.KKKK.KKKK.'], { K: INK, G: GOLD }, 900, 820, 20 * k)
      label(x, 800, 1000, lt > 1.6 ? '…BOTH?' : 'PINK? GOLD?', 1, { size: 34 })
      L(x, 800, 660, 'SHOP CLOSING', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Vanished on run one. | Seen again at *dusk.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 0.4, 1.3))
      drawBits(x, SKI, { R: '#ff6b8a' }, lerp(700, 1000, fly), lerp(780, 1000, fly), 14 * (1 - fly), { rot: 0.5 })
      L(x, 800, 760, 'LAST SEEN: 9 AM', pop01(t, P.t0 + 0.3, 0.3, 2.2), BONE, -0.04, 34)
      L(x, 800, 1020, 'BACK AT 5. NO NOTES.', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#ff6b8a', 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Did every slope | before *breakfast.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.6) * 23)
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 250, head: 'RUNS TODAY', headBg: GOLD, headInk: INK, lines: [String(n)], size: 110 })
      L(x, 800, 1070, 'IT’S 8:15 AM', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Bought a season pass. | Tracks *cost per run.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 300, head: 'PASS VALUE', headBg: STEEL, headInk: INK, lines: ['run 1: ouch', 'run 40: ok', ['run 90: WIN', '#2f8a48']], size: 32, progress: clamp((lt - 0.4) / 1.1) })
      L(x, 800, 1090, 'WORTH IT. BARELY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Built a snowman. | It has *Wi-Fi.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, SNOWMAN, SNOWMAN_C, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 1.0) { x.save(); x.strokeStyle = SKYB; x.lineWidth = 8; for (let r = 1; r <= 3; r++) { x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 6 - r); x.beginPath(); x.arc(800, 760, r * 34, -2.4, -0.74); x.stroke() } x.restore() }
      L(x, 800, 1130, 'SIGNAL: EXCELLENT', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried at the view. | The tears *froze.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 2, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 800, 800, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1040, 'ICICLES: 2', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 36)
      snow(x, t, { n: 12, x0: 620, w: 340, y0: 600, h: 420 })
    } },
]
function label(x, cx, cy, text, k, o) { L(x, cx, cy, text, k, LAV, -0.04, o.size) }

const F = makeFilm({
  id: 'r2t0602', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs | *on a ski trip.*',
  cameos: CAMEOS,
  group: { cap: 'Same mountain. | *Twelve* trips.',
    draw(x, t, lt) { snow(x, t, { n: 30, x0: 60, w: 960, y0: 600, h: 900 }) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
