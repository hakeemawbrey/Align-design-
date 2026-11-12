// r2t0459: star_talk, BELIKE (twelve signs), "Zodiacs finally get it | *be like.*" (signs3kit social cut, music: lofi · D).
// Ending: lesson (LESSON UNLOCKED, then the last line). No match card.
//   ♈ laughed before the punchline · ♉ a match's joke, got it Thursday · ♊ got it, told it better · ♋ saved it in a scrapbook
//   · ♌ now it's their joke · ♍ got it, corrected the grammar · ♎ checked everyone else got it · ♏ knew it was about them
//   · ♐ got it mid-flight, whole plane heard · ♑ filed it for Q3 · ♒ liked it before it was funny · ♓ it was beautiful (tears)
//   group "Everyone got it. | Eventually."  lesson "Laugh on your own time. | Joy still counts."  last "Taurus is | still laughing."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd166', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -190 }

const BOOK = ['KKKKKKKKKKKKKKKK', 'KPPPPPPKKPPPPPPK', 'KPWWWWPKKPWWWWPK', 'KPWWWWPKKPWWWWPK', 'KPPPPPPKKPHHPPPK', 'KPWWWPPKKPHHPPPK', 'KPPPPPPKKPPPPPPK', 'KKKKKKKKKKKKKKKK']
const BOOK_C = { K: '#8a4a2e', P: '#ffd6e6', W: CREAM, H: RED }
const PLANE = ['.........KK.......', '.........KWK......', 'K........KWWK.....', 'KK.......KWWWK....', 'KWKKKKKKKKWWWWKKK.', 'KWWWWWWWWWWWWWWWWK', 'KWBWBWBWBWBWWWWWSK', '.KWWWWWWWWWWWWWWK.', '..KKKKKKKWWWWKKK..', '.........KWWK.....', '.........KWK......', '.........KK.......']
const PLANE_C = { K: INK, W: CREAM, B: SKYB, S: ACC }
const FOLDER = ['YYYYY.........', 'YYYYYYYYYYYYYY', 'YYYYYYYYYYYYYY', 'YYYYYYYYYYYYYY', 'YYYYYYYYYYYYYY', 'YYYYYYYYYYYYYY', 'YYYYYYYYYYYYYY', 'YYYYYYYYYYYYYY']
const TISSUE = ['....WW....', '...WWWW...', 'BBBBBBBBBB', 'BKKKKKKKKB', 'BBBBBBBBBB', 'BBBPPPPBBB', 'BBBBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: '#8fd0ff', K: INK, P: CREAM }
const GLASS = ['..KKKK....', '.K....K...', 'K......K..', 'K......K..', 'K......K..', '.K....K...', '..KKKKKK..', '.......KK.', '........KK']

/** a sheet with a red correction */
function memo(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const W = 340, H = 240
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  x.fillStyle = CREAM; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('your so funny', 0, -30)
  const r = ease.outCubic(prog(lt, 0.8, 1.2))
  if (r > 0) {
    x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(-92, -30, 66 * r, 30 * r, 0, 0, Math.PI * 2); x.stroke()
    x.globalAlpha = r; x.fillStyle = RED; x.font = `800 38px ${INTER}`; x.fillText("you're ✓", -60, 54)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Laughed before | the *punchline.*', mood: 'squint', look: [1, 0], star: ST, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'so a horse | walks into—', pop01(t, P.t0 + 0.15, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      L(x, 790, 920, 'HAHAHA', pop01(t, P.t0 + 0.5, 0.3, 2.4), RED, -0.08, 56)
    } },
  { sign: 'taurus', cap: 'Match sent a joke. | Got it *Thursday.*', mood: lt => lt > 1.2 ? 'squint' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 640, '✦ MATCH · MON', pop01(t, P.t0 + 0.15, 0.3, 2), GOLD, -0.04, 34)
      bubble(x, 790, 820, 'why did the | cow cross…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 1060, 'THU: LOL', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.05, 44)
    } },
  { sign: 'gemini', cap: 'Got it. | *Told it better.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'ok ok but if | the horse had…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      L(x, 790, 940, 'REMIX: v2', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 42)
    } },
  { sign: 'cancer', cap: 'Got the joke. | Saved it *in a scrapbook.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 870, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'JOKES WE LOVED, VOL 4', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Got the joke. | *Now it’s their joke.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'as I always say…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 940, '© LEO', pop01(t, P.t0 + 1.1, 0.3, 2.6), GOLD, -0.06, 56)
    } },
  { sign: 'virgo', cap: 'Got the joke. | *Fixed the grammar.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { memo(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Got it. Checked that | *everyone else did.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'we all got it, | right? right??', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      L(x, 790, 940, 'NOBODY LEFT OUT ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Got the joke. | Knew it *was about them.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLASS, { K: SLATE }, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 2) })
      L(x, 790, 1080, 'SUBTEXT: FOUND', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, -0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Got it mid-flight. | *The whole plane* heard.', mood: 'squint', look: [1, 0], star: ST, hops: [0.8, 1.1, 1.4],
    front(x, t, lt, P) {
      drawBits(x, PLANE, PLANE_C, 790, 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 14) * 0.04 })
      L(x, 790, 1060, 'ROW 14: SHH', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, 0.04, 40)
    } },
  { sign: 'capricorn', cap: 'Got the joke. | Filed it *for Q3.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FOLDER, { Y: '#e0b45a' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04 })
      L(x, 790, 860, 'LAUGH: Q3', pop01(t, P.t0 + 0.8, 0.3, 2.2), BONE, -0.04, 38)
    } },
  { sign: 'aquarius', cap: 'Got it. Liked it | *before it was funny.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'I knew this | joke in 2009', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      L(x, 790, 940, 'EARLY ADOPTER', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: 'pisces', cap: 'Finally got it. | It was *beautiful.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 800, 960, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 680, 'MOVED: DEEPLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0459', key: 'D', accent: ACC, ending: 'lesson',
  title: 'Zodiacs finally get it | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone *got it.* | Eventually.' },
  lesson: { text: 'Laugh on your own time. | *Joy still counts.*', chip: 'JOKE: LANDED' },
  last: { text: 'Taurus is | *still laughing.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
