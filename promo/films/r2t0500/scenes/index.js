// r2t0500: star_talk, SOLO (sagittarius), "Sags on a day off | *be like.*" (signs3kit social cut, music: lofi · F).
// Nine cards, one Sagittarius day off pushed to the extreme. Ending: lesson.
//   rest day: three trails · pointed at the map, went · new hobby, quit by lunch · "quiet day in" lasted twelve
//   minutes · learned a language (just "hello") · the couch: never met her · horoscope said "go", booked it
//   · phone at 2%, still exploring · came home with a new best friend (a goat named Beans)
//   group "Rest is | *for other signs.*"   lesson "Your joy is freedom. | Rest *counts too.*"   last "Next day off? | *Already planned.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const ACC = '#b38bff', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', GREEN = '#2fc79a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const MOUNT = ['.........WW.........', '........WWWW........', '.......WWGGWW.......', '......GGGGGGGG......', '.....GGGGGGGGGG.....', '....GGGGDGGGGGGG....', '...GGGDDDGGGGDGGG...', '..GGGDDDDDGGDDDGGG..', '.GGGDDDDDDDDDDDDGGG.', 'GGGDDDDDDDDDDDDDDGGG']
const MOUNT_C = { W: '#ffffff', G: '#7f8fb8', D: '#5a678f' }
const GUITAR = ['.........KK', '........KK.', '.......KK..', '......KK...', '..OOOKK....', '.OOOOOO....', 'OOOKKOOO...', 'OOOKKOOO...', '.OOOOOO....', '..OOOO.....']
const COUCH = ['.CCCCCCCCCCCC.', 'CCCCCCCCCCCCCC', 'CCAAAAAAAAAACC', 'CCAAAAAAAAAACC', 'CCCCCCCCCCCCCC', '.K..........K.']
const GOAT = ['K.......K...', '.K.....K....', '..WWWWW.....', '.WKWWWKW....', '.WWWWWWWWWWW', '..WWPWWWWWWW', '...WWWWWWWWW', '...WWWWWWWWW', '...K.K...K.K', '...K.K...K.K']
const GOAT_C = { K: '#5a4a3a', W: '#f4efe6', P: PINK }

const S = 'sagittarius'
const CAMEOS = [
  { sign: S, cap: 'Rest day? | *Hiked three trails.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 790, 900, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 2.99)
      L(x, 790, 660, `TRAIL ${n} OF 3`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.05, 40)
      L(x, 790, 1110, 'BY 10 A.M.', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Pointed at the map. | *Went.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      box(x, 790, 860, 320, 260, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = '#9fd8a8'; x.fillRect(-160, -130, 320, 260); x.fillStyle = SKYB; x.fillRect(-160, 40, 140, 90); x.fillRect(60, -130, 100, 70)
        x.strokeStyle = INK; x.lineWidth = 4; x.setLineDash([10, 10]); x.beginPath(); x.moveTo(-120, 100); x.lineTo(-20, 0); x.lineTo(90, -30); x.stroke(); x.setLineDash([])
        if (lt > 0.9) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(70, -50); x.lineTo(110, -10); x.moveTo(110, -50); x.lineTo(70, -10); x.stroke() }
      }, '#9fd8a8')
      L(x, 790, 1110, 'PLAN: NONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Started a new hobby. | *Quit by lunch.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GUITAR, { K: BROWN, O: '#ff9a4a' }, 790, 880, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lt > 1.4 ? 0.9 : 0.1 })
      L(x, 790, 650, lt > 1.4 ? 'NEXT: POTTERY' : 'HOBBY #11', pop01(t, P.t0 + 0.4, 0.3, 2.2), lt > 1.4 ? PINK : GOLD, 0.05, 38)
      L(x, 790, 1110, 'LUNCH: 11:58', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, -0.04, 32)
    } },
  { sign: S, cap: 'Said “quiet day in.” | Lasted *twelve minutes.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const m = Math.min(12, Math.floor(clamp((lt - 0.2) / 1.2) * 12))
      L(x, 790, 720, `IN FOR: ${m} MIN`, pop01(t, P.t0 + 0.2, 0.3, 2), SLATE, 0.05, 40)
      if (lt > 1.4) bubble(x, 790, 940, 'ok, who’s free?', pop01(t, P.t0 + 1.45 * 1.29, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1110, 'SHOES: ALREADY ON', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Learned a language. | *Just “hello.”*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const W = ['hola!', 'ciao!', 'salut!', 'hallo!', 'olá!']
      for (let i = 0; i < 4; i++) if (lt > 0.3 + i * 0.35) bubble(x, 700 + (i % 2) * 170, 660 + i * 110, W[(i + Math.floor(lt)) % 5], 1, { size: 36, col: [BONE, MINT, PINK, GOLD][i], tail: i % 2 ? 'br' : 'bl' })
    } },
  { sign: S, cap: 'The couch? | *Never met her.*', mood: 'wink', look: [-1, 0], star: { x: 170 }, hops: [1.0],
    back(x, t, lt, P) {
      drawBits(x, COUCH, { C: '#7f6aa8', A: '#9d88c8', K: INK }, 330, 990, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      L(x, 330, 800, 'PRICE TAG: STILL ON', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.05, 28)
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 2; const k = pop01(t, P.t0 + 1.0, 0.3, 2)
      if (k > 0.5) { x.beginPath(); x.moveTo(190, 900); x.lineTo(250, 940); x.moveTo(190, 900); x.lineTo(190, 960); x.moveTo(190, 900); x.lineTo(240, 880); x.moveTo(220, 920); x.lineTo(205, 930); x.stroke() }
      x.restore()
    } },
  { sign: S, cap: 'Horoscope said “explore.” | *Booked it.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 790, 780, 300, 200, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = ACC; x.fillRect(-150, -100, 300, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('♐︎ TODAY', 0, -72)
        x.fillStyle = BONE; x.font = `800 36px ${INTER}`; x.fillText('“explore.”', 0, 30)
      })
      L(x, 790, 1040, '✈︎ BOOKED: 6 P.M.', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Phone at 2%. | *Still exploring.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      box(x, 790, 860, 260, 120, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = INK; x.fillRect(-110, -44, 200, 88); x.fillRect(90, -20, 20, 40)
        x.fillStyle = RED; x.fillRect(-102, -36, 14, 72)
        x.fillStyle = BONE; x.font = `700 34px ${MONO}`; x.fillText('2%', 10, 2)
      }, '#2a2350')
      L(x, 790, 660, 'MAP: OFFLINE', pop01(t, P.t0 + 0.6, 0.3, 2.2), SLATE, 0.05, 34)
      bubble(x, 790, 1080, 'vibes say left!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Came home with | *a new best friend.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GOAT, GOAT_C, 800, 930, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 1120, 'HIS NAME: BEANS', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, 0.05, 34)
      hearts(x, t, 800, 800, P.t0 + 1.4, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2t0500', key: 'F', accent: ACC, solo: S,
  title: 'Sags on a day off | *be like.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Rest is | *for other signs.*', mood: 'sparkle' },
  lesson: { text: 'Your joy is freedom. | Rest *counts too.*', chip: 'BATTERY: RECHARGED' },
  last: { text: 'Next day off? | *Already planned.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
