// r2t0118: ROLLCALL, "The signs in | a waiting room." (~63 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    the hook; the twelve line up, then dive into the pips.
//   3.6–49.2   ♈ "is it my turn?" (ask #9) · ♉ brought a pillow, fully asleep · ♊ picked up three hobbies, quit two
//              · ♋ comforted a stranger, now family · ♌ heard their name, took a bow · ♍ alphabetised the magazines
//              · ♎ tried every chair, still deciding · ♏ clocked everyone's mood in one glance · ♐ wandered off, missed
//              their turn · ♑ turned the wait into a work day · ♒ started a petition for better chairs · ♓ bonded with the fish
//  49.2        "Still waiting. | *Somehow thriving.*"
//  52.4        LESSON: "Waiting is easier | with *good company.*"  WAIT: WORTH IT
//  58.3        "Your turn is | *coming. Promise.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a', GREEN = '#5fd068'

const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWBWWWWWWBWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const YARN = ['..PPPP..', '.PpPPpP.', 'PPPpPPPP', 'PpPPPpPP', 'PPPPpPPP', '.PPpPPP.', '..PPPP..']
const CROSS = ['WKWWKW', 'WWWWWW', 'KWWKWW', 'WWWWWK', 'WKWWWW', 'WWKWWW']
const CHAIR = ['BBBBBB', 'BBBBBB', 'BBBBBB', 'B....B', 'BBBBBB', 'BBBBBB', 'K....K', 'K....K', 'K....K']
const LENS = ['..KKKK....', '.KSSSSK...', 'KSWSSSSK..', 'KSSSSSSK..', 'KSSSSSSK..', '.KSSSSK...', '..KKKKKK..', '......KKK.', '.......KKK', '........KK']
const DOOR = ['KKKKKKKK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBYK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK', 'KKKKKKKK']
const LAPTOP = ['KKKKKKKKKKK', 'KSSSSSSSSSK', 'KSWWWWWWSSK', 'KSSSSSSSSSK', 'KSWWWWSSSSK', 'KSSSSSSSSSK', 'KKKKKKKKKKK', 'GGGGGGGGGGGGG'.slice(0, 11)]

function magazines(x, cx, cy, k, sorted) {
  if (k <= 0.01) return
  const COLS = [PINK, SKYB, GOLD, MINT, LAV, ORANGE]
  const L = ['A', 'B', 'C', 'D', 'E', 'F']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 6; i++) {
    const s = sorted, jitter = (1 - s) * Math.sin(i * 3.7) * 60, rot = (1 - s) * Math.sin(i * 2.1) * 0.5
    x.save(); x.translate(jitter, 120 - i * 46); x.rotate(rot)
    x.fillStyle = INK; x.fillRect(-124, -22, 248, 44); x.fillStyle = COLS[i]; x.fillRect(-118, -16, 236, 32)
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(L[i], -104, 2)
    x.restore()
  }
  x.restore()
}
function tank(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = '#3a8fd0'; x.fillRect(-160, -110, 320, 220)
  x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(-160, -110, 320, 30)
  x.fillStyle = GREEN; for (let i = 0; i < 4; i++) x.fillRect(-140 + i * 90, 50 - (i % 2) * 30, 14, 60 + (i % 2) * 30)
  const fx = Math.sin(t * 1.4) * 70, dir = Math.cos(t * 1.4) >= 0 ? 1 : -1
  x.save(); x.translate(fx, -10); x.scale(dir, 1)
  x.fillStyle = ORANGE; x.beginPath(); x.ellipse(0, 0, 40, 24, 0, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.moveTo(-34, 0); x.lineTo(-64, -22); x.lineTo(-64, 22); x.fill()
  x.fillStyle = INK; x.fillRect(16, -8, 9, 9)
  x.restore()
  x.restore()
}
function petition(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -186, 272, 372); x.fillStyle = BROWN; x.fillRect(-128, -178, 256, 356)
  x.fillStyle = '#fff4e2'; x.fillRect(-110, -150, 220, 314)
  x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('BETTER', 0, -118); x.fillText('CHAIRS NOW', 0, -88)
  x.strokeStyle = '#2a2350'; x.lineWidth = 4
  for (let i = 0; i < n; i++) { const y = -40 + i * 34; x.beginPath(); x.moveTo(-80, y); for (let j = 1; j <= 8; j++) x.lineTo(-80 + j * 18, y + (j % 2 ? -10 : 6)); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Asked "is it my turn?" | *Nine times.*', mood: 'squint', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 8)
      bubble(x, 790, 740, 'my turn??', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, tail: 'bl' })
      label(x, 790, 980, `ASK #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 56, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Brought a pillow. | Fully *asleep.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { W: '#fff4e2', B: SKYB }, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'DO NOT WAKE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Picked up three hobbies. | *Quit two.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), gone = prog(lt, 1.3, 1.7)
      drawBits(x, YARN, { P: PINK, p: '#ff4f86' }, 700, 820, 18 * k, { alpha: 1 - gone })
      drawBits(x, CROSS, { W: '#fff4e2', K: INK }, 880, 820, 20 * pop01(t, P.t0 + 0.5, 0.3, 2), { alpha: 1 - gone })
      label(x, 790, 1040, gone > 0.5 ? 'HOBBY 3: NAPPING' : 'HOBBY 1, 2…', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Comforted a stranger. | *Now family.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 790, 950, 190 * k, { mood: lt > 1.2 ? 'heart' : 'neutral', look: [-1, 0], seed: 12, glyph: false })
      bubble(x, 790, 720, 'you poor thing!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1130, 'ADOPTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 680, 900, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Heard their name. | *Took a bow.*', mood: 'sparkle', star: { x: -170 }, squash: lt => lt > 1.1 && lt < 1.8 ? 0.14 : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 720, '“Leo?”', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'br' })
      label(x, 790, 960, 'THANK YOU, THANK YOU', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 28, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 380, 880, P.t0 + 1.1, 7, 190, 0.3)
    } },
  { sign: 'virgo', cap: 'Alphabetized | the *magazines.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      magazines(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.4)))
      label(x, 790, 1130, 'A–Z ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Tried every chair. | *Still deciding.*', mood: 'happy', star: { x: -150 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      ;[620, 760, 900].forEach((cx, i) => drawBits(x, CHAIR, { B: [PINK, SKYB, MINT][i], K: BROWN }, cx, 1060, 16 * k))
    },
    front(x, t, lt, P) {
      const w = ['this one?', 'or this?', 'hmm, that?'][Math.floor(lt * 1.6) % 3]
      bubble(x, 790, 760, w, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Clocked everyone’s mood | in *one glance.*', mood: 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LENS, { K: INK, S: SKYB, W: '#fff' }, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      label(x, 790, 1060, 'ROOM: READ', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Wandered off. | *Missed their turn.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.0],
    back(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, B: BROWN, Y: GOLD }, 320, 900, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      bubble(x, 320, 640, '“Sagittarius?”', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 320, 1150, 'BACK IN 5', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Turned the wait | into *a work day.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: INK, S: '#2a2350', W: MINT, G: '#9aa5c4' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'EMAILS: 0', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Started a petition | for *better chairs.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      petition(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), Math.floor(clamp((lt - 0.4) / 1.4) * 6))
    } },
  { sign: 'pisces', cap: 'Bonded with the fish. | *Sobbing.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tank(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'BEST FRIEND', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0118', key: 'G', accent: SKYB, ending: 'lesson',
  title: 'The signs in | a *waiting room.*',
  cameos: CAMEOS,
  group: { cap: 'Still waiting. | *Somehow thriving.*' },
  lesson: { text: 'Waiting is easier | with *good company.*', chip: 'WAIT: WORTH IT' },
  last: { text: 'Your turn is | *coming. Promise.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
