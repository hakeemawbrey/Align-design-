// r2t0454: star_talk, SOLO, "Leos on a day off | be like." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign (solo, 9 cards): a Leo "doing nothing", in the most extra way possible. Ending: lesson.
//   hair still took two hours · sunbathed like the sun owed them · walk to the shop: a runway · pancakes shaped like their face
//   · bubble bath with a spotlight · read a biography: their own · called a friend: a four-hour monologue
//   · gave the plants a pep talk · napped in a pose
//  group "Off duty. | *Still iconic.*"   lesson "Even resting, | Leos *light the room.*"  STATUS: GLOWING
//  last "Back to work? | *Fabulous by nine.*"
import { clamp, prog } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const S = 'leo', L = { x: -180 }, AMBER = '#ffb34a'
const COMB = ['CCCCCCCCCCCC', 'CCCCCCCCCCCC', 'C.C.C.C.C.C.', 'C.C.C.C.C.C.', 'C.C.C.C.C.C.']
const SHADES = ['KKKKK.KKKKK', 'KkkKKKKkkKK'.slice(0, 11), '.KKK...KKK.']
const PANCAKE = ['..PPPPPPP..', '.PPPPPPPPP.', 'PPPKPPPKPPP', 'PPPPPPPPPPP', 'PPKPPPPPKPP', '.PPKKKKKPP.', '..PPPPPPP..']

const CAMEOS = [
  { sign: S, cap: 'Day off? | Hair still took *two hours.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P, F) {
      drawBits(x, COMB, { C: PINK }, 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 + 0.2 * Math.sin(lt * 6) })
      label(x, 800, 1080, `HAIR: HOUR ${lt > 1.2 ? 2 : 1}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.top, P.t0 + 1.3, 7, 150, 0.4)
    } },
  { sign: S, cap: 'Sunbathed | *like the sun owed them.*', mood: 'happy', look: [0, -1], star: L,
    front(x, t, lt, P, F) {
      drawBits(x, SHADES, { K: INK, k: '#3a3460' }, F.x, F.cy - 22, 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { outline: null })
      bits(x, 'sun', 830, 720, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 820, 1000, 'brighter, please.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Walk to the shop? | *A runway.*', mood: 'wink', look: [1, 0], star: { x: -150, y: -20 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) { const k = pop01(t, P.t0 + 0.1, 0.3, 2); x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(200, 1040, 680, 60); x.fillStyle = RED; x.fillRect(206, 1046, 668 * k, 48); x.restore() },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) sparkles(x, t, 640 + i * 110, 760, P.t0 + 0.7 + i * 0.35, 6, 60, i, ['#ffffff', GOLD])
      label(x, 790, 680, 'FLASH! FLASH!', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Made pancakes. | *Shaped like their face.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.'], { W: PAPER }, 800, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PANCAKE, { P: '#e7b46a', K: '#5a3a1e' }, 800, 930, 20 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 800, 700, 'CHEF’S KISS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: AMBER, rot: 0.04 })
    } },
  { sign: S, cap: 'Bubble bath. | *With a spotlight.*', mood: 'sleepy', look: [0, 0], star: { x: -170, y: -30 },
    back(x, t, lt, P, F) {
      const k = clamp(lt * 2)
      x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(F.x - 30, 560); x.lineTo(F.x + 30, 560); x.lineTo(F.x + 200, 1040); x.lineTo(F.x - 200, 1040); x.fill(); x.restore()
      x.fillStyle = INK; x.fillRect(150, 960, 620, 200); x.fillStyle = BONE; x.fillRect(160, 970, 600, 180); x.fillStyle = '#8fd0ff'; x.fillRect(176, 970, 568, 60)
    },
    front(x, t, lt, P) {
      for (let i = 0; i < 9; i++) { const ph = (t * 0.5 + i / 9) % 1; x.save(); x.globalAlpha = 0.8 * Math.sin(Math.PI * ph); x.strokeStyle = '#ffffff'; x.lineWidth = 5; x.beginPath(); x.arc(220 + i * 62, 960 - ph * 200, 14 + (i % 3) * 6, 0, 7); x.stroke(); x.restore() }
      label(x, 820, 700, 'LIGHTING: PERFECT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Read a biography. | *Their own.*', mood: 'sparkle', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'book', 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 900, 'ME: VOL. 3', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 690, 'a page-turner.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Called a friend. | *A four-hour monologue.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const h = Math.min(4, Math.floor(prog(lt, 0.3, 1.8) * 4.99))
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: `${h}:0${h * 2}:41`, head: 'ON CALL', msg: 'and THEN I…', bg: AMBER, size: 30 })
      bubble(x, 430, 640, 'anyway, me.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Gave the plants | *a pep talk.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: L, hops: [0.8],
    front(x, t, lt, P) {
      bits(x, 'plant', 820, 960, 18 + 6 * prog(lt, 0.8, 1.6) * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'you are | GORGEOUS', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 820, 940, P.t0 + 1.3, 7, 150, 0.3, [MINT, GOLD, BONE])
    } },
  { sign: S, cap: 'Took a nap. | *Still struck a pose.*', mood: 'sleepy', look: [0, 0], star: { x: -150, y: 10 },
    squash: lt => 0.06 * Math.sin(lt * 2),
    front(x, t, lt, P) {
      bits(x, 'pillow', 390, 1040, 18 * pop01(t, P.t0 + 0.1, 0.3, 2))
      label(x, 800, 760, 'NAP: EDITORIAL', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.3, 6, 140, 0.8)
    } },
]

const F = makeFilm({
  id: 'r2t0454', key: 'D', accent: AMBER, solo: S, ending: 'lesson',
  title: 'Leos on a day off | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Off duty. | *Still iconic.*', mood: 'sparkle' },
  lesson: { text: 'Even resting, | Leos *light the room.*', chip: 'STATUS: GLOWING' },
  last: { text: 'Back to work? | *Fabulous by nine.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
