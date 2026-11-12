// r2a0349: star_advice, ADVICE ROLLCALL, "How each sign | can *start fresh.*" (topic: how each sign can start fresh this
// season; shortened to fit. signs3kit social cut, music: lofi · E). Ending: lesson, then "New season. | *Same lovely you.*"
//   ♈ finish one project first · ♉ try one new food · ♊ 400 tabs down to one · ♋ keep the memories, toss the receipts
//   · ♌ a hobby you're gloriously bad at · ♍ leave one thing undone · ♎ one quick choice (the chart says go) · ♏ put down
//   one old grudge · ♐ adventure starts on your own street · ♑ a goal that's fun · ♒ text an old friend · ♓ a fresh
//   notebook for happy dreams (happy tears)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', STEEL = '#9aa5c4', ACC = '#a6f0c6', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, color, font: MONO, weight: 700 })
const MANGO = ['....GG...', '...GG....', '.OOOOOO..', 'OOOOOOOO.', 'OOYOOOOOO', 'OOOOOOOOO', '.OOOOOOO.', '..OOOOO..']
const BOX = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const POT = ['...CCC....', '..CCCCC.C.', '.CCCCCCCC.', 'CCCCCCCCC.', '.CCCCCCC..', '..CCCCC...']
const FRAME = ['KKKKKKKKKK', 'KYYYYYYYYK', 'KYSSSSSSYK', 'KYSMMSSSYK', 'KYSSSSSSYK', 'KYYYYYYYYK', 'KKKKKKKKKK']
const ROCK = ['..GGGGG..', '.GGGGGGG.', 'GGGGGGGGG', 'GGGGGGGGG', '.GGGGGGG.']
const PHONE = ['KKKKKKK', 'KGGGGGK', 'KGGGGGK', 'KGGGGGK', 'KGGGGGK', 'KKKKKKK', 'KKWWWKK', 'KKKKKKK']
const NOTEBOOK = ['KKKKKKKKKK', 'KLLLLLLLLK', 'KLLYLLLLLK', 'KLLLLLYLLK', 'KLYLLLLLLK', 'KLLLLYLLLK', 'KLLLLLLLLK', 'KKKKKKKKKK']
const S2 = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Pick one project. | *Finish it first.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: S2, hops: [1.3],
    front(x, t, lt, P) {
      const one = lt > 1.0
      L(x, 800, 720, one ? 'PROJECTS: 1' : 'PROJECTS: 9', pop01(t, P.t0 + 0.3, 0.3, 2), one ? MINT : RED, 0.05, 44, one ? INK : BONE)
      if (one) sparkles(x, t, 800, 720, P.t0 + 1.0, 7, 170, 0.3)
      L(x, 800, 1060, '✓ DONE. WOW.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Try one new food. | *You might love it.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: S2,
    front(x, t, lt, P) {
      drawBits(x, MANGO, { G: '#5fd068', O: '#ffb34a', Y: '#ffe76a' }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 680, '…ok, it’s good.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1110, 'NEW FAVOURITE', pop01(t, P.t0 + 1.8, 0.3, 2.4), ACC, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Close the 400 tabs. | *Keep the one that sparks.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: S2,
    front(x, t, lt, P) {
      const n = lt < 0.5 ? 400 : Math.max(1, Math.round(lerp(400, 1, ease.inOutCubic(clamp((lt - 0.5) / 0.9)))))
      L(x, 800, 820, `TABS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), n > 1 ? STEEL : MINT, 0.04, 52)
      L(x, 800, 1020, 'THE GOOD ONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Keep the memories. | *Toss the old receipts.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: S2,
    front(x, t, lt, P) {
      drawBits(x, BOX, { K: INK, B: '#c98a5a' }, 800, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 5; i++) {
        const ph = clamp((lt - 0.7 - i * 0.12) / 0.8)
        if (ph <= 0) continue
        x.save(); x.translate(800 + Math.sin(i * 2.1) * 160 * ph, 960 - 300 * ph + 200 * ph * ph); x.rotate(ph * 4 + i); x.fillStyle = INK; x.fillRect(-24, -34, 48, 68); x.fillStyle = BONE; x.fillRect(-20, -30, 40, 60); x.restore()
      }
      L(x, 800, 680, 'KEPT: THE GOOD STUFF', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 28)
    } },
  { sign: 'leo', cap: 'Try a hobby | you’re *gloriously bad at.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: S2,
    front(x, t, lt, P) {
      drawBits(x, POT, { C: '#c98a5a' }, 800, 920, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.15 })
      L(x, 800, 700, 'POTTERY: DAY 1', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, -0.04, 32)
      L(x, 800, 1090, 'A MASTERPIECE (?)', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Leave one thing undone. | *Nothing breaks.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, -1], star: S2,
    front(x, t, lt, P) {
      drawBits(x, FRAME, { K: INK, Y: GOLD, S: SKYB, M: BONE }, 800, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.18 })
      L(x, 800, 1040, 'STILL FINE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Make one choice fast. | *That’s growth.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: S2, hops: [1.0],
    front(x, t, lt, P) {
      L(x, 800, 720, 'CHART SAYS: GO FOR IT', pop01(t, P.t0 + 0.3, 0.3, 2), LAV, 0.04, 28)
      L(x, 800, 880, 'DECIDED IN 3 SECONDS', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 30)
      sparkles(x, t, 800, 880, P.t0 + 1.1, 8, 200, 0.2, [PINK, BONE, GOLD])
      bubble(x, 800, 1070, 'wait, that was easy', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Put down one old grudge. | *Travel lighter.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: S2,
    front(x, t, lt, P) {
      const drop = ease.inQuad(prog(lt, 0.9, 1.3))
      drawBits(x, ROCK, { G: STEEL }, 800, lerp(820, 1080, drop), 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, lerp(820, 1080, drop), 'GRUDGE (2019)', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, 0.03, 26)
      L(x, 800, 660, 'WEIGHT: LIFTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Craving adventure? | *Start on your own street.*', mood: 'sparkle', look: [1, 0], star: S2, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-8, -40, 16, 230); x.fillStyle = BROWN; x.fillRect(-4, -36, 8, 222)
        x.fillStyle = INK; x.fillRect(-150, -110, 300, 80); x.fillStyle = MINT; x.fillRect(-144, -104, 288, 68)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NEW CAFÉ →', 0, -70)
        x.restore()
      }
      L(x, 800, 1110, '2 BLOCKS. EPIC.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Set a new goal. | *Make it a fun one.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: S2,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 870); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -140, 320, 280); x.fillStyle = BONE; x.fillRect(-152, -132, 304, 264)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.fillText('GOAL: SKATING', 0, -96)
        const p = clamp((lt - 0.4) / 1.0)
        x.strokeStyle = '#2fa86a'; x.lineWidth = 8; x.beginPath()
        for (let i = 0; i <= 20 * p; i++) { const px = -120 + i * 12, py = 90 - i * 7 + Math.sin(i * 1.3) * 14; i ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke(); x.restore()
      }
      L(x, 800, 1100, 'FUN: SCHEDULED', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Text an old friend. | *They miss your weird.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: S2,
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: '#2a2350', G: '#c9f0ff', W: STEEL }, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bubble(x, 800, 680, 'hey stranger!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      hearts(x, t, 370, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
      L(x, 800, 1110, 'MISSED YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'A fresh notebook. | *Write the happy dreams.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: 2, star: S2,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, NOTEBOOK, { K: INK, L: LAV, Y: '#ffe76a' }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      sparkles(x, t, 800, 880, P.t0 + 0.8, 8, 190, 0.4, [LAV, BONE, GOLD])
      L(x, 800, 1110, 'HAPPY TEARS ONLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0349', key: 'E', accent: ACC, ending: 'lesson',
  title: 'How each sign | can *start fresh.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve fresh starts. | *Zero pressure.*', moods: ['sparkle', 'heart', 'sparkle', 'happy', 'sparkle', 'happy', 'sparkle', 'happy', 'sparkle', 'heart', 'heart', 'heart'] },
  lesson: { text: 'Fresh starts are small. | *Start with one.*', chip: 'SEASON: NEW' },
  last: { text: 'New season. | *Same lovely you.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
