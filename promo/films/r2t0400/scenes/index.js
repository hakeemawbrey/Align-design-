// r2t0400: star_talk BELIKE, "Teacher in public? | Zodiacs be like." (signs3kit social cut, music: lofi · F). Ending: group.
//   ♈ yelled "MISS!" across the store · ♉ waved with a baguette, still chewing · ♊ asked their sign, then told their life
//   story · ♋ hugged them for a full minute · ♌ asked if they still talk about them · ♍ still carries the report card
//   · ♎ said their first name, apologised · ♏ hid behind a newspaper · ♐ invited them on a road trip · ♑ gave a career
//   update with a chart · ♒ reopened the debate about that B+ · ♓ cried: "you believed in me."
//   group (the ending): "Class dismissed. | Forever students."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
/** the teacher: a grown-up grey silhouette with glasses and a tote bag */
function teacher(x, cx, cy, k, { look = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-58, -84, 116, 250); x.beginPath(); x.arc(0, -128, 54, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#8a7fc4'; x.fillRect(-52, -78, 104, 238); x.fillStyle = '#e8c4a0'; x.beginPath(); x.arc(0, -128, 48, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#6b4a3a'; x.fillRect(-50, -178, 100, 30)
  x.strokeStyle = INK; x.lineWidth = 5; x.strokeRect(-36 + look * 6, -140, 28, 22); x.strokeRect(8 + look * 6, -140, 28, 22); x.beginPath(); x.moveTo(-8 + look * 6, -130); x.lineTo(8 + look * 6, -130); x.stroke()
  x.fillStyle = '#c98f5a'; x.fillRect(40, -10, 50, 60); x.fillStyle = INK; x.fillRect(48, -26, 6, 18); x.fillRect(76, -26, 6, 18)
  x.restore()
}
const BAG = ['BBBBBBBBBBBB']
const CARD = ['A+', 'A+', 'A+', 'A']
const PAPER = ['WWWWWWWWWWWW', 'WKKKKWWKKKKW', 'WWWWWWWWWWWW', 'WKKWKKWKKKWW', 'WWWWWWWWWWWW', 'WKKKWWKKWKKW', 'WWWWWWWWWWWW', 'WKKWKKKWKKKW', 'WWWWWWWWWWWW']

const ST = { x: -170 }, TCH = (x, t, P, d = 0.25) => teacher(x, 800, 960, 0.85 * pop01(t, P.t0 + d, 0.35, 2))
const CAMEOS = [
  { sign: 'aries', cap: 'Yelled “MISS!” | *across the store.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      TCH(x, t, P)
      const k = pop01(t, P.t0 + 0.5, 0.25, 2.6)
      if (k > 0.01) label(x, 620, 640, 'MISS!!!', k, { size: 70, bg: ACC, rot: -0.08, font: INTER, weight: 800 })
      L(x, 770, 1135, 'AISLE 9 HEARD IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Waved hello. | *Still chewing.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      TCH(x, t, P)
      drawBits(x, ['..TTTTTTTTTTT', '.TTCTTTCTTTCT', 'TTTTTTTTTTTT.'], { T: '#e8a24a', C: '#fff1b0' }, F.x + 130, F.cy - 40 + 14 * Math.sin(t * 9), 12 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.7 })
      bubble(x, 600, 640, 'mmf! hi!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Asked their sign. | Then *their life story.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      TCH(x, t, P)
      bubble(x, 600, 620, 'what’s your sign?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'bl' })
      const m = Math.floor(clamp((lt - 0.9) / 1.2) * 45)
      if (lt > 0.9) L(x, 770, 1135, `MINUTE ${m}`, 1, ACC, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Hugged them | *for a full minute.*', mood: 'heart', look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      TCH(x, t, P, 0.15)
      hearts(x, t, 680, 820, P.t0 + 0.6, { n: 6, life: 2, spread: 220, cell: 7, seed: 3 })
      L(x, 770, 1135, 'MISSED YOU SO MUCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Asked if they | *still talk about them.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      TCH(x, t, P)
      bubble(x, 600, 620, 'i was your | favourite, right?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 30, tail: 'bl' })
      sparkles(x, t, 370, 880, P.t0 + 0.6, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Still carries | *the report card.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      TCH(x, t, P, 0.9)
      card(x, 620, 760, 200, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.08 }, () => {
        x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('REPORT', 0, -90)
        x.font = `700 30px ${MONO}`; CARD.forEach((g, i) => { x.fillStyle = i === 3 ? RED : '#2f9d4a'; x.fillText(g, 0, -40 + i * 42) })
      })
      L(x, 770, 1135, 'LAMINATED, OF COURSE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 26)
    } },
  { sign: 'libra', cap: 'Said their first name. | *Apologised. Twice.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      TCH(x, t, P)
      if (lt < 1.1) bubble(x, 600, 640, 'hi, Linda!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      else bubble(x, 600, 640, 'MRS. Linda. | sorry. sorry.', pop01(t, P.t0 + 1.15, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Hid behind | *a newspaper.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      TCH(x, t, P, 0.7)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PAPER, { W: '#e8e2d0', K: '#9aa5c4' }, F.x, F.cy + 30, 22 * k)
      if (k > 0.9) { x.fillStyle = '#140c30'; x.fillRect(F.x - 60, F.cy - 20, 34, 24); x.fillRect(F.x + 26, F.cy - 20, 34, 24); x.fillStyle = '#ffffff'; x.fillRect(F.x - 48 + 8 * Math.sin(t * 2), F.cy - 14, 12, 12); x.fillRect(F.x + 38 + 8 * Math.sin(t * 2), F.cy - 14, 12, 12) }
      L(x, 770, 1135, 'INVISIBLE (PROBABLY)', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#c97bff', -0.04, 26, CREAM)
    } },
  { sign: 'sagittarius', cap: 'Invited them | *on a road trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      TCH(x, t, P)
      bubble(x, 600, 620, 'road trip?? | leaving now!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 30, tail: 'bl' })
      L(x, 770, 1135, 'SNACKS: PACKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Gave a career update. | *With a chart.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      TCH(x, t, P, 0.9)
      card(x, 620, 780, 230, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05, bg: '#ffffff' }, () => {
        const g = ease.outCubic(prog(lt, 0.4, 1.2))
        ;[40, 70, 110, 150].forEach((h, i) => { x.fillStyle = i === 3 ? '#2f9d4a' : '#9aa5c4'; x.fillRect(-90 + i * 48, 90 - h * g, 36, h * g) })
        x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText('ME, SINCE 9TH GRADE', 0, -82)
      })
      L(x, 770, 1135, 'GROWTH: STEADY', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Reopened the debate | *about that B+.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      TCH(x, t, P)
      bubble(x, 600, 620, 'about that B+…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      L(x, 770, 1135, 'IT WAS TEN YEARS AGO', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, -0.04, 26)
    } },
  { sign: 'pisces', cap: 'Cried. | *“You believed in me.”*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      TCH(x, t, P)
      hearts(x, t, 820, 760, P.t0 + 1.0, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 6 })
      L(x, 770, 1135, 'TEACHER: ALSO CRYING', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2t0400', key: 'F', accent: ACC, ending: 'group',
  title: 'Teacher in public? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Class dismissed. | *Forever students.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
