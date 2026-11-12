// r2t0528: star_talk, BE LIKE, "Could’ve texted. | Zodiacs *be like.*" (~59 s vertical, signs3kit social cut,
// music: lofi · G). Twelve signs in zodiac order on a call that could have been a text, each pushed to the extreme.
// Ending: lesson.
//   3.6–49.2   ♈ hung up at minute one · ♉ ate lunch on mute · ♊ scrolled matches, said "mm-hm" · ♋ turned it into a
//              catch-up · ♌ ring light on · ♍ sent the summary before it ended · ♎ agreed with everyone · ♏ camera off,
//              noticed everything · ♐ joined from a mountain · ♑ booked a call about the call · ♒ proposed a no-calls rule
//              · ♓ cried at "great call, everyone"
//  49.2        "Forty minutes. | *Two sentences.*"
//  52.4        LESSON: "A kind text | *still counts.*"  INBOX: HAPPY
//  58.3        "Pisces is still | *on the call.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', GREEN = '#5fd068', ORANGE = '#ffb34a'

/** a laptop on a video call: a header strip and a body, drawn at k */
function laptop(x, cx, cy, k, { head = 'CALL', headCol = MINT, body = null, rot = 0.03 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -120, 336, 270)
  x.fillStyle = INK; x.fillRect(-172, -132, 344, 238)
  x.fillStyle = '#2a2350'; x.fillRect(-164, -124, 328, 222)
  x.fillStyle = '#140c30'; x.fillRect(-150, -110, 300, 194)
  x.fillStyle = headCol; x.fillRect(-150, -110, 300, 46); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -86)
  x.fillStyle = INK; x.fillRect(-196, 104, 392, 28); x.fillStyle = SLATE; x.fillRect(-188, 108, 376, 18)
  if (body) body(x)
  x.restore()
}
const txt = (x, s, y, size = 34, col = BONE) => { x.fillStyle = col; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, y) }

const SANDWICH = ['..BBBBBBBB..', '.BBWBBBWBBB.', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', '.BBBBBBBBBB.']
const PHONE = ['KKKKKKK', 'KSSSSSK', 'KSHSHSK', 'KSHHHSK', 'KSSHSSK', 'KSSSSSK', 'KSSSSSK', 'KKKGKKK', 'KKKKKKK']
const MOUNTAIN = ['.....W......', '....WWW.....', '...SSSSS....', '..SSSSSSS.S.', '.SSSSSSSSSSS', 'SSSSSSSSSSSS']
const SIGNBOARD = ['WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.....BB.....', '.....BB.....', '.....BB.....', '.....BB.....']

const CAMEOS = [
  { sign: 'aries', cap: 'Hung up at minute one. | *“Just text me.”*', mood: lt => lt > 1.2 ? 'squint' : 'eyeroll', star: { x: -160 }, hops: [1.2],
    front(x, t, lt, P) {
      const end = lt > 1.1
      laptop(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: end ? 'CALL ENDED' : 'CALL · 0:5' + Math.min(9, Math.floor(lt * 5)), headCol: end ? RED : MINT,
        body: x => txt(x, end ? 'bye!' : 'so, um…', 10, 44, end ? GOLD : BONE) })
      label(x, 790, 1110, 'NEW RECORD', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Ate a whole lunch. | *On mute.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, { B: '#e8a24a', W: CREAM, G: GREEN, R: RED, Y: GOLD }, 790, 850, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      label(x, 790, 650, 'MUTED', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'COURSE 3 OF 4', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Scrolled their matches. | Said *“mm-hm.”*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : 0, Math.floor(lt * 3) % 2 ? 0 : 1], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: INK, S: SKYB, H: PINK, G: SLATE }, 780, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      bubble(x, 800, 620, 'mm-hm. | totally.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1110, 'NEW MATCH: 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Turned it into | a *catch-up.*', mood: 'heart', look: [1, 0], star: { x: -160 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'and how’s | your MOM?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      const h = 1 + Math.floor(clamp((lt - 0.6) / 1.2) * 2)
      label(x, 790, 980, `HOUR ${h} OF CALL`, pop01(t, P.t0 + 0.9, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Camera on. | *Ring light on.*', mood: 'sparkle', star: { x: -160 }, hops: [1.0],
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k); x.shadowColor = '#fff6c0'; x.shadowBlur = 50; x.strokeStyle = '#fff6c0'; x.lineWidth = 26
      x.beginPath(); x.arc(F.x, F.cy - 10, 200, 0, Math.PI * 2); x.stroke(); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 800, 650, 'LIGHTING: CINEMATIC', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1060, 'can you | see me?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Sent the summary. | *Before it ended.*', mood: 'squint', look: [1, 0], star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      laptop(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'STILL ON CALL', headCol: MINT,
        body: x => { const n = Math.min(3, Math.floor(clamp((lt - 0.4) / 1.0) * 3) + 1); for (let i = 0; i < n; i++) { x.fillStyle = CREAM; x.fillRect(-120, -40 + i * 40, 240 - i * 40, 22) } } })
      label(x, 790, 1100, 'SUMMARY: SENT ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Agreed with everyone. | *Even the opposites.*', mood: 'happy', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'great point!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 820, 'ALSO great!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      bubble(x, 790, 1000, 'both great!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Camera off. | *Noticed everything.*', mood: 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      laptop(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CAMERA OFF', headCol: SLATE,
        body: x => { if (lt > 0.8) { x.fillStyle = '#ff4f86'; x.fillRect(-60, -10, 30, 16); x.fillRect(30, -10, 30, 16) } } })
      label(x, 790, 1100, 'YOUR PLANT IS WILTING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Joined the call | from *a mountain.*', mood: 'sparkle', star: { x: -160 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, MOUNTAIN, { W: CREAM, S: SLATE }, 790, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'SIGNAL: 1 BAR', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'can you hear— | *wind*', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Booked a call | *about the call.*', mood: 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      laptop(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'NEW INVITE', headCol: GOLD,
        body: x => { txt(x, 'Re: the call', -18, 34); txt(x, '(recap call)', 34, 28, SLATE) } })
      label(x, 790, 1100, 'RECURRING: WEEKLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Proposed a new rule. | *No calls. Ever.*', mood: 'wink', star: { x: -160 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SIGNBOARD, { W: CREAM, B: BROWN }, 800, 860, 26 * k, { rot: Math.sin(t * 3) * 0.05 })
      if (k > 0.5) { x.save(); x.translate(800, 800); x.rotate(Math.sin(t * 3) * 0.05); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TEXT ONLY', 0, 0); x.restore() }
      label(x, 790, 1110, 'MOTION: PASSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | *“great call, everyone.”*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'great call, | everyone!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 960, 'WE’RE A FAMILY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0528', key: 'G', accent: GOLD, ending: 'lesson',
  title: 'Could’ve texted. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Forty minutes. | *Two sentences.*' },
  lesson: { text: 'A kind text | *still counts.*', chip: 'INBOX: HAPPY' },
  last: {
    text: 'Pisces is still | *on the call.*',
    draw(x, t, lt) { laptop(x, 540, 830, pop01(t, t - lt + 0.8, 0.35, 2), { head: 'CALL · 3:12:0' + Math.floor(lt * 3) % 10, headCol: SKYB, body: x => txt(x, 'hello? …hi!', 10, 40) }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
