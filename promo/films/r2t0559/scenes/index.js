// r2t0559: star_talk, BELIKE, "Nervous zodiacs | be like." (signs3kit social cut, music: lofi · D). Ending: callback.
//   ♈ gets nervous, goes faster · ♉ stress-baked forty muffins · ♊ nervous-talks to a plant · ♋ called mom three times
//   · ♌ "nervous? never." (sweating) · ♍ small-talk flashcards · ♎ eleven outfit changes · ♏ calm face, heart doing laps
//   · ♐ laughs at everything, even silence · ♑ a backup plan for the backup plan · ♒ goes full robot
//   · ♓ cried before anything happened.  Callback: the nerves pass, and Taurus' forty muffins feed everyone.
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }
const MUFFIN = ['..CCCC..', '.CCKCCC.', 'CCCCCKCC', 'CKCCCCCC', 'PPPPPPPP', '.PWPWPW.', '.PPPPPP.', '..PPPP..']
const MUFFIN_C = { C: '#a8673f', K: '#5a3420', P: '#ff8fb1', W: '#ffd2e6' }
const POT = ['...G.G...', '.G.GGG.G.', 'GGG.G.GGG', '.GGGGGGG.', '...GGG...', 'TTTTTTTTT', '.TTTTTTT.', '..TTTTT..']
const POT_C = { G: '#4fbf6a', T: '#d9734a' }
const HANGER = ['....K....', '...K.K...', '.....K...', '....K....', '..KKKKK..', '.K.....K.', 'KKKKKKKKK']
const DROP = ['.S.', 'SSS', 'SWS', '.S.']

const CAMEOS = [
  { sign: 'aries', cap: 'Gets nervous. | Goes *faster.*', mood: 'squint', look: [1, 0], star: ST, hops: [0.4, 0.7, 1.0, 1.3, 1.6],
    front(x, t, lt, P) {
      x.save(); x.strokeStyle = BONE; x.lineWidth = 8; x.lineCap = 'round'; x.globalAlpha = 0.6 * clamp(lt * 2)
      for (let i = 0; i < 4; i++) { const y = 800 + i * 50, o = (t * 900 + i * 120) % 300; x.beginPath(); x.moveTo(660 - o + 300, y); x.lineTo(760 - o + 300, y); x.stroke() }
      x.restore()
      L(x, 800, 660, `SPEED: x${Math.min(9, 1 + Math.floor(lt * 4))}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), RED, 0.05, 34)
      L(x, 800, 1090, 'ARRIVED 2 HRS EARLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Stress-baked | *forty muffins.*', mood: lt => lt < 1.4 ? 'squint' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(40, Math.floor(clamp((lt - 0.2) / 1.4) * 40))
      for (let i = 0; i < n; i++) { const row = Math.floor(i / 5), col = i % 5; drawBits(x, MUFFIN, MUFFIN_C, 670 + col * 56 + (row % 2) * 24, 1110 - row * 42, 6) }
      L(x, 520, 650, `MUFFINS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), '#5fd068', 0.05, 34)
    } },
  { sign: 'gemini', cap: 'Nervous talking. | To *a plant.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 850, 1010, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const W = ['so anyway—', 'and THEN—', 'you get it?', 'love that for us']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 760, 680, W[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 850, 1150, 'PLANT: SUPPORTIVE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'cancer', cap: 'Called mom. | *Three times.*', mood: lt => lt < 1.3 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.5))
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `CALLING MOM (${n})`, headCol: PINK, lines: [['“you’ve got this”', BONE, lt > 0.8 ? 1 : 0], ['“eat something”', BONE, lt > 1.3 ? 1 : 0], ['“call me after”', GOLD, lt > 1.8 ? 1 : 0]], size: 20 })
      hearts(x, t, 470, 780, P.t0 + 1.5, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Nervous? Never. | *(Sweating.)*', mood: 'wink', star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      bits(x, 'SHADES', F.x, F.cy - 30, 11 * pop01(t, P.t0 + 0.3, 0.3, 2))
      for (let i = 0; i < 4; i++) { const ph = ((t * 0.9 + i / 4) % 1); if (lt > 0.8) drawBits(x, DROP, { S: SKYB, W: '#fff' }, F.x + (i % 2 ? 130 : -130) + i * 6, F.cy - 80 + ph * 160, 9, { alpha: 1 - ph }) }
      bubble(x, 800, 680, 'totally chill.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1060, 'SWEAT: CONFIDENT', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#ffb34a', -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Rehearsed small talk. | *With flashcards.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const Q = ['Q: nice weather?', 'Q: your sign?', 'Q: fave snack?']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.55))
      for (let i = 2; i >= 0; i--) if (i >= n) sheet(x, 800 + (i - n) * 14, 860 + (i - n) * 14, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 200, head: `CARD ${i + 1}/40`, headBg: MINT, headInk: INK, lines: [Q[i]], size: 32, rot: -0.04 + (i - n) * 0.03 })
      L(x, 800, 1110, 'IMPROV: SCHEDULED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Changed outfits. | *Eleven times.*', mood: lt => lt < 1.5 ? 'neutral' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P, F) {
      const n = Math.min(11, 1 + Math.floor(lt * 5))
      const COL = ['#ff6b5a', '#ffd23a', '#5fd068', '#6fc3ff', '#c97bff', PINK]
      drawBits(x, HANGER, { K: STEEL }, 800, 760, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.fillStyle = INK; x.fillRect(F.x - 104, F.cy + 26, 208, 30); x.fillStyle = COL[n % COL.length]; x.fillRect(F.x - 98, F.cy + 30, 196, 22); x.restore()
      L(x, 800, 950, `OUTFIT ${n}/11`, pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, 0.05, 34)
      L(x, 800, 1110, 'IT’S JUST COFFEE', pop01(t, P.t0 + 1.6, 0.3, 2.4), STEEL, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Calm face. | Heart *doing laps.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const beat = 1 + 0.18 * Math.max(0, Math.sin(t * 16))
      bits(x, 'HEARTB', 800, 860, 26 * pop01(t, P.t0 + 0.3, 0.3, 2) * beat)
      L(x, 800, 660, `BPM: ${Math.min(180, 70 + Math.floor(lt * 60))}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), RED, 0.05, 34)
      L(x, 800, 1080, 'FACE: UNBOTHERED', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#c97bff', -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Laughs at everything. | *Even silence.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 680, '…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 56, col: STEEL, tail: 'br' })
      bubble(x, 800, 900, 'HAHAHA… ha.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      L(x, 800, 1100, 'AWKWARD: 100%', pop01(t, P.t0 + 1.6, 0.3, 2.4), '#ff9a4a', -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'A backup plan | for *the backup plan.*', mood: lt => lt < 1.4 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) sheet(x, 740 + i * 50, 760 + i * 110, pop01(t, P.t0 + 0.2 + i * 0.45, 0.3, 2), { w: 260, h: 130, head: `PLAN ${'ABC'[i]}`, headBg: ['#2fc79a', GOLD, PINK][i], headInk: INK, lines: [], rot: -0.05 + i * 0.03 })
      L(x, 800, 1140, 'PLAN D: LOADING', pop01(t, P.t0 + 1.6, 0.3, 2.4), STEEL, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Nervous? | Goes *full robot.*', mood: 'neutral', look: [0, 0], star: ST, squash: lt => 0.05 * Math.sign(Math.sin(lt * 14)),
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'GREETINGS, | HUMAN.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: '#6fc3ff', tail: 'bl', font: MONO, weight: 700 })
      bits(x, 'GADGET', 800, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, 'SMALL TALK.EXE', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried before | *anything happened.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 850, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'STARTS IN: 3 DAYS', pop01(t, P.t0 + 0.4, 0.3, 2.2), SKYB, 0.05, 32)
      bits(x, 'TISSUE', 800, 1080, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.4))
    } },
]

const F = makeFilm({
  id: 'r2t0559', key: 'D', accent: ACC, ending: 'callback',
  title: 'Nervous zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero chill.*' },
  last: {
    text: 'Nerves gone. | Muffins *for all.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.4, 2)
      for (let i = 0; i < 40; i++) { const row = Math.floor(i / 10), col = i % 10; drawBits(x, MUFFIN, MUFFIN_C, 540 + (col - 4.5) * 74 + (row % 2) * 37, 1300 - row * 60, 8 * pop01(t, t - lt + 0.6 + i * 0.03, 0.25, 2.2)) }
      if (k > 0.01) hearts(x, t, 540, 1050, t - lt + 1.6, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
