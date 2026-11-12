// r2a0525: star_advice, ADVICE ROLL CALL, "How to work | *with each sign.*" (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific line each about being a good teammate to them. Ending: group.
//   0.0–3.6    "How to work | *with each sign.*"
//   3.6–49.2   ♈ give them the hard part · ♉ steady deadlines (and snacks) · ♊ brainstorm, write it all down · ♋ check in,
//              they carry the team · ♌ credit them out loud · ♍ ask for their notes, they made some · ♎ ask their
//              opinion early · ♏ trust them to dig deep · ♐ give them room, get big ideas · ♑ share the plan early
//              · ♒ let them try it weird · ♓ be gentle with feedback
//  49.2        group (the ending): "Different signs. | *One good team.*"  a TEAM: ALIGNED sticker over the team photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
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
const MUG = ['.S.S.S....', '..S.S.S...', 'MMMMMMMM..', 'MWWWWWWMMM', 'MWWWWWWM.M', 'MWWWWWWM.M', 'MWWWWWWMMM', 'MWWWWWWM..', '.MMMMMM...']
const COOKIES = ['..CCC....CCC..', '.CKCCC..CCKCC.', '.CCCKC..CKCCC.', '..CCC....CCC..', 'PPPPPPPPPPPPPP', '.PPPPPPPPPPPP.']
const SHOVEL = ['.....BB.....', '.....BB.....', '.....BB.....', '.....BB.....', '.....BB.....', '...GGGGGG...', '..GGGGGGGG..', '..GGGGGGGG..', '...GGGGGG...', '....GGGG....']
const GEM = ['..WWWW..', '.WSSSSW.', 'WSSWSSSW', '.SSSSSS.', '..SSSS..', '...SS...']
const PLANE = ['......WW.....', '......WWW....', 'W.....WWWW...', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWS', 'W.....WWWW...', '......WWW....', '......WW.....']
const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..GGGG..', '..GGGG..']
const GEAR = ['..G..G..', '.GGGGGG.', 'GGG..GGG', '.G....G.', '.G....G.', 'GGG..GGG', '.GGGGGG.', '..G..G..']

const CAMEOS = [
  { sign: 'aries', cap: 'Give them the hard part. | *They’ll love it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: SL, hops: [1.1],
    front(x, t, lt, P) {
      sheet(x, 790, 850, 280, 200, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        txt(x, 'TASK', 0, -60, 26, '#4a4470', 'center', MONO, 700); txt(x, 'THE HARD', 0, 0, 40, INK); txt(x, 'ONE', 0, 48, 40, RED)
      })
      bubble(x, 790, 640, 'MINE. GIMME.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1080, 'DONE BY LUNCH', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Steady deadlines. | *Snacks at meetings.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: SL,
    front(x, t, lt, P) {
      drawBits(x, COOKIES, { C: '#c8865a', K: '#5b2e1a', P: '#d8dbe8' }, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'DUE: FRIDAY (NOT TODAY)', pop01(t, P.t0 + 0.8, 0.3, 2.4), '#5fd068', -0.04, 26)
      L(x, 790, 1080, 'MORALE: HIGH', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Brainstorm together. | *Write it all down.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', star: SL,
    front(x, t, lt, P) {
      const N = Math.min(6, Math.floor(Math.max(0, lt - 0.2) / 0.25) + 1)
      for (let i = 0; i < N; i++) { const px = 700 + (i % 3) * 95, py = 720 + Math.floor(i / 3) * 140; sheet(x, px, py, 84, 84, 1, (i % 2 ? 0.08 : -0.07), () => { x.fillStyle = 'rgba(27,18,54,0.4)'; x.fillRect(-28, -14, 56, 8); x.fillRect(-28, 6, 40, 8) }, [GOLD, PINK, MINT, SKYB, LAV, ORANGE][i]) }
      L(x, 790, 1090, 'IDEAS: SAVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Check in kindly. | *They carry the team.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: SL,
    front(x, t, lt, P) {
      drawBits(x, MUG, { M: '#6fc3ff', W: CREAM, S: 'rgba(239,230,214,0.7)' }, 800, 900, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 790, 660, 'you doing ok?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1090, 'FELT: SEEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 32)
      hearts(x, t, 440, 820, P.t0 + 1.2, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Credit them out loud. | *Watch them shine.*', mood: 'sparkle', star: SL, hops: [0.9],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.6))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(350, 490); x.lineTo(430, 490); x.lineTo(590, 1180); x.lineTo(190, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'all Leo’s idea!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 950, 'SHOUT-OUT: GIVEN', pop01(t, P.t0 + 1.1, 0.3, 2.4), ORANGE, 0.04, 32)
      sparkles(x, t, 390, 860, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Ask for their notes. | *They made some.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 3; i++) sheet(x, 790 + i * 14, 960 - i * 105, 260, 90, k, -0.03 + i * 0.02, () => { txt(x, `NOTES VOL. ${3 - i}`, 0, 2, 28, INK, 'center', MONO, 700) }, [MINT, LAV, GOLD][i])
      bubble(x, 790, 615, 'color-coded. | obviously.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      L(x, 790, 1110, 'HELPFUL: VERY', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Ask their opinion early. | *They see both sides.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: SL,
    front(x, t, lt, P) {
      sheet(x, 790, 860, 320, 250, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, () => {
        x.fillStyle = INK; x.fillRect(-3, -110, 6, 220)
        txt(x, 'PROS', -80, -86, 28, '#2fc79a', 'center', MONO, 700); txt(x, 'CONS', 80, -86, 28, RED, 'center', MONO, 700)
        for (let i = 0; i < 3; i++) { if (lt > 0.5 + i * 0.3) { x.fillStyle = '#d9d0bf'; x.fillRect(-140, -40 + i * 46, 110, 18); x.fillRect(30, -40 + i * 46, 110, 18) } }
      })
      L(x, 790, 1090, 'FAIR CALL: MADE', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Trust them to dig deep. | *They’ll find gold.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      drawBits(x, SHOVEL, { B: BROWN, G: GREY }, 760, 840, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.4 })
      drawBits(x, GEM, { W: '#fff', S: GOLD }, 860, 1010, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      sparkles(x, t, 860, 1000, P.t0 + 1.1, 6, 120, 0.4)
      L(x, 790, 640, 'ROOT CAUSE: FOUND', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Give them room. | *Get big ideas back.*', mood: 'sparkle', star: SR, hops: [0.6, 1.3],
    back(x, t, lt, P) {
      const p = prog(lt, 0.2, 1.6)
      if (p > 0 && p < 1) { drawBits(x, PLANE, { W: CREAM, S: SKYB }, lerp(140, 560, p), 760 - 120 * Math.sin(Math.PI * p), 12, { rot: -0.1 }) }
    },
    front(x, t, lt, P) {
      if (lt > 1.4) { drawBits(x, BULB, { Y: GOLD, W: '#fff', G: GREY }, 330, 860, 22); sparkles(x, t, 330, 860, P.t0 + 1.4, 6, 140, 0.2) }
      L(x, 330, 1080, 'IDEA: HUGE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Share the plan early. | *They’ll build the rest.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: SR,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.5) * 10)
      for (let i = 0; i < n; i++) { const r = Math.floor(i / 4), c = i % 4; const w = 4 - r; if (c >= w) continue; x.fillStyle = INK; x.fillRect(200 + c * 70 + r * 35 - 4, 1080 - r * 64 - 4, 68, 60); x.fillStyle = ['#2fc79a', '#6fc3ff', GOLD, PINK][r]; x.fillRect(200 + c * 70 + r * 35, 1080 - r * 64, 60, 52) }
      L(x, 330, 680, 'PLAN → BUILT', pop01(t, P.t0 + 1.6, 0.3, 2.4), '#2fc79a', -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Let them try it weird. | *It often works.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: SL, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(760, 870); x.rotate(t * 1.5); drawBits(x, GEAR, { G: GREY }, 0, 0, 18 * k); x.restore()
      x.save(); x.translate(870, 960); x.rotate(-t * 1.5); drawBits(x, GEAR, { G: SKYB }, 0, 0, 14 * k); x.restore()
      bubble(x, 790, 660, 'hear me out…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      L(x, 790, 1110, 'IT WORKED?!', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Be gentle with feedback. | *They feel it all.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 1 : 2, star: SL,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'this is lovely! | one tiny idea…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 900, 'TONE: KIND', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, -0.04, 32)
      hearts(x, t, 790, 1040, P.t0 + 1.4, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0525', key: 'G', accent: ACC, ending: 'group',
  title: 'How to work | *with each sign.*',
  cameos: CAMEOS,
  group: {
    cap: 'Different signs. | *One good team.*',
    draw(x, t, lt) { label(x, 540, 760, '✦ TEAM: ALIGNED ✦', pop01(t, t - lt + 1.2, 0.35, 2.4), { size: 48, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
