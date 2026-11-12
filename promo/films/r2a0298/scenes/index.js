// r2a0298: star_advice, ADVICE SOLO, "How to encourage | *a Sagittarius.*" (~51 s vertical, signs3kit, music: lofi · C)
// One sign the whole way: nine kind ways to back a Sagittarius, each a relatable truth + a warm reframe. Ending: lesson.
//   0.0–3.6    "How to encourage | *a Sagittarius.*"
//   3.6–37.8   nine cards: midnight big idea ("tell me more") · hobby number seven, cheer each one · tripped mid-adventure,
//              laugh with them · send the trail map, not the rulebook · plan is "wing it", hold the flashlight
//              · blunt honesty is love, loudly · stuck at home, plan a tiny adventure · don't clip the wings, be the
//              landing spot (the arrow lands on a cushion) · back with stories, ask for all of them
//  37.8        "Big dreams. | *Bigger heart.*"
//  41.2        LESSON: "Cheer the leap. | *Catch the landing.*"  STATUS: ENCOURAGED
//  47.1        "Pack light. | *You're coming too.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#c97bff', RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#c98f5a'
const ST = { x: -200 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const BULB = ['..YYY..', '.YYYYY.', 'YYWYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..', '..SSS..', '..SSS..', '...S...']
const BULB_C = { Y: GOLD, W: '#fff', S: '#9aa5c4' }
const BANDAGE = ['.PPPPPPPPP.', 'PPPWPWPWPPP', 'PPPPWPWPPPP', 'PPPWPWPWPPP', '.PPPPPPPPP.']
const TORCH = ['KKKKKK....', 'KSSSSKYY..', 'KSSSSKYYY.', 'KSSSSKYY..', 'KKKKKK....']
const ARROW = ['........KK', '.......KYK', 'KKKKKKKYYK', 'PPPPPPPYYK', 'KKKKKKKYYK', '.......KYK', '........KK']
const BACKPACK = ['..KKKK..', '.KOOOOK.', 'KOOOOOOK', 'KOKKKKOK', 'KOKYYKOK', 'KOKKKKOK', 'KOOOOOOK', '.KKKKKK.']

const CAMEOS = [
  { sign: 'sagittarius', cap: 'Big idea at midnight? | Say *“tell me more.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BULB, BULB_C, 790, 720, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 720, P.t0 + 0.5, 7, 140, 0.3)
      bubble(x, 790, 960, 'tell me more!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      L(x, 790, 1110, 'TIME: 12:04 AM', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'New hobby every week? | *Cheer for each one.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const H = ['GUITAR', 'POTTERY', 'SKATING', 'SALSA', 'BAKING', 'KAYAK', 'PAINTING']
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 6)
      L(x, 790, 740, H[n - 1], 1, [GOLD, PINK, MINT, SKYB, LAV, '#ffb34a', GOLD][n - 1], 0.04, 44)
      L(x, 790, 880, `HOBBY #${n} ✓`, pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.04, 34)
      bubble(x, 790, 1060, 'go you!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Tripped mid-adventure? | Laugh *with* them.', mood: lt => lt > 1.0 ? 'happy' : 'wide', look: [1, 0], star: ST, squash: lt => lt < 0.6 ? 0.12 : 0,
    front(x, t, lt, P) {
      drawBits(x, BANDAGE, { P: '#ffb38a', W: '#ffe0c8' }, 400, 760, 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.4 })
      bubble(x, 790, 720, 'that was | AWESOME.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 960, 'BOUNCE BACK: INSTANT', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Send the trail map. | Not *the rulebook.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k1 = pop01(t, P.t0 + 0.2, 0.3, 2), k2 = pop01(t, P.t0 + 0.8, 0.3, 2)
      L(x, 790, 700, 'RULES: 1–400', k1, BONE, 0.04, 34)
      if (lt > 0.9) { x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.globalAlpha = clamp((lt - 0.9) / 0.2); x.beginPath(); x.moveTo(660, 700); x.lineTo(920, 700); x.stroke(); x.restore() }
      if (k2 > 0.01) {
        x.save(); x.translate(790, 920); x.rotate(-0.04); x.scale(k2, k2)
        x.fillStyle = INK; x.fillRect(-150, -100, 300, 200); x.fillStyle = CREAM; x.fillRect(-142, -92, 284, 184)
        x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-110, 60); x.quadraticCurveTo(-30, -80, 100, -40); x.stroke(); x.setLineDash([])
        x.fillStyle = '#4ac77d'; x.beginPath(); x.moveTo(20, 40); x.lineTo(60, -20); x.lineTo(100, 40); x.fill()
        x.fillStyle = RED; x.beginPath(); x.arc(100, -40, 12, 0, 7); x.fill()
        x.restore()
      }
    } },
  { sign: 'sagittarius', cap: 'Their plan is “wing it”? | *Hold the flashlight.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      if (lt > 0.6) { x.save(); x.globalAlpha = 0.3 * clamp((lt - 0.6) / 0.3); x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(720, 860); x.lineTo(260, 700); x.lineTo(260, 1060); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 850, 920, 150 * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false })
      drawBits(x, TORCH, { K: INK, S: '#9aa5c4', Y: GOLD }, 750, 860, 12 * k, { sx: -1 })
      L(x, 800, 660, 'PLAN: WING IT', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 32)
      L(x, 800, 1110, 'SUPPORT: ON', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Brutally honest? | That’s *love, loudly.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'your hat is… | BOLD.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 900, '…and I love it.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      hearts(x, t, 360, 760, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'sagittarius', cap: 'Stuck at home? | Plan a *tiny adventure.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.4, 1.9],
    front(x, t, lt, P) {
      drawBits(x, BACKPACK, { K: INK, O: '#ffb34a', Y: GOLD }, 790, 780, 30 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1000, 'NEW CAFÉ: 2 STREETS', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, 0.04, 30)
      L(x, 790, 1110, 'ADVENTURE: TINY ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Don’t clip their wings. | Be *the landing spot.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.3, 1.4))
      const ax = lerp(480, 790, p), ay = lerp(620, 1020, p) - Math.sin(Math.PI * p) * 160
      x.save(); x.fillStyle = INK; x.fillRect(640, 1040, 300, 70); x.fillStyle = PINK; x.fillRect(648, 1048, 284, 54); x.fillStyle = '#ffd0e0'; x.fillRect(660, 1052, 260, 12); x.restore()
      drawBits(x, ARROW, { K: INK, Y: GOLD, P: LAV }, ax, ay, 14, { rot: lerp(-0.3, 0.6, p) })
      if (lt > 1.4) sparkles(x, t, 790, 1040, P.t0 + 1.4 * 1.29, 7, 140, 0.3)
      L(x, 790, 760, 'LANDED SAFE ✓', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Back with stories? | Ask for *all of them.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'and THEN…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: GOLD, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.5) / 1.4) * 39)
      if (lt > 0.5) L(x, 790, 900, `STORY ${n} OF 40`, 1, LAV, 0.04, 34)
      bubble(x, 790, 1070, 'keep going!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: MINT, tail: 'br' })
    } },
]

const F = makeFilm({
  id: 'r2a0298', key: 'C', accent: ACC, solo: 'sagittarius', ending: 'lesson',
  title: 'How to encourage | *a Sagittarius.*',
  cameos: CAMEOS,
  group: { cap: 'Big dreams. | *Bigger heart.*', mood: 'sparkle' },
  lesson: { text: 'Cheer the leap. | *Catch the landing.*', chip: 'STATUS: ENCOURAGED' },
  last: { text: 'Pack light. | *You’re coming too.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
