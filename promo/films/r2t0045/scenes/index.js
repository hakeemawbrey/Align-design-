// r2t0045: star_talk, BE LIKE, "Heard their name? | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "Heard their name? | Zodiacs *be like.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   someone says their name, per sign:
//              ♈ "WHAT?!" from three rooms away · ♉ didn't move, kept eating · ♊ already explaining what they didn't do
//              · ♋ assumed they're in trouble · ♌ assumed it was applause · ♍ corrected the spelling
//              · ♎ fixed their hair before turning around · ♏ already knew who said it · ♐ wasn't there, left a note
//              · ♑ "in a meeting" (they weren't) · ♒ heard it an hour later: "hm?" · ♓ name spelled right on the cup: sobbed
//  49.2        group ending: "It was just | *roll call.*"  A clipboard pops up over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a'

const SANDWICH = ['..BBBBBB..', '.BBWBBWBB.', 'GGGGGGGGGG', 'RRRRRRRRRR', 'YYYYYYYYYY', '.BBBBBBBB.']
const SANDWICH_C = { B: '#e8a24a', W: '#fff4e2', G: '#5fd068', R: RED, Y: GOLD }
const MIRROR = ['..KKKKKK..', '.KSSSSSSK.', 'KSSWSSSSSK', 'KSWSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', '.KSSSSSSK.', '..KKKKKK..', '....KK....', '....KK....', '...KKKK...']
const MIRROR_C = { K: '#c97bff', S: SKYB, W: '#fff' }
const CUPC = ['WWWWWWWW', 'WWWWWWWW', 'WNNNNNNW', 'WNNNNNNW', 'WWWWWWWW', '.WWWWWW.', '.WWWWWW.', '..WWWW..']

function note(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -100, 280, 200); x.fillStyle = '#ffd23a'; x.fillRect(-132, -92, 264, 184)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -40 + i * 44))
  x.restore()
}
function cup(x, cx, cy, k, t) {
  if (k <= 0.01) return
  drawBits(x, CUPC, { W: CREAM, N: CREAM }, cx, cy, 24 * k)
  x.save(); x.translate(cx, cy - 10 * k); x.scale(k, k); x.rotate(-0.05)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PISCES ✓', 0, 0)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: '“WHAT?!” | From *three rooms away.*', mood: 'wide', star: { x: -200, s: 230 }, hops: [0.4],
    front(x, t, lt, P) {
      bubble(x, 720, 720, 'WHAT?!', pop01(t, P.t0 + 0.2, 0.25, 2.4), { size: 72, tail: 'bl' })
      label(x, 760, 960, 'DISTANCE: 3 ROOMS', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 760, 1080, 'VOLUME: YES', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: '#ff6b5a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Didn’t move. | *Kept eating.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 9) })
      bubble(x, 790, 720, 'one sec.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1110, 'DO NOT DISTURB', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 30, bg: '#5fd068', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Already explaining | *what they didn’t do.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const W = ['it wasn’t me—', 'ok, technically—', 'in MY defence—']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.2) / 0.6))
      bubble(x, 760, 760, W[n], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 980, 'NOBODY ASKED', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Assumed they’re | *in trouble.*', mood: 'wide', look: [0, -1], star: { x: -180 }, squash: lt => 0.05 * Math.sin(lt * 30),
    front(x, t, lt, P) {
      bubble(x, 760, 740, 'what did | I do?!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 800, 1020, 'want a cookie?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: MINT, tail: 'br' })
    } },
  { sign: 'leo', cap: 'Assumed | it was *applause.*', mood: 'sparkle', star: { x: -180 }, hops: [0.9],
    front(x, t, lt, P) {
      label(x, 730, 740, 'THANK YOU, THANK YOU', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 28, bg: '#ffb34a', rot: -0.04 })
      bubble(x, 790, 960, 'please, | sit.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 400, 860, P.t0 + 0.8, 8, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Corrected | *the spelling.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -70, 320, 140); x.fillStyle = CREAM; x.fillRect(-152, -62, 304, 124)
        x.fillStyle = INK; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('VIRGOE', 0, 4)
        if (lt > 0.9) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(60, -24); x.lineTo(108, 30); x.moveTo(108, -24); x.lineTo(60, 30); x.stroke() }
        x.restore()
      }
      label(x, 790, 1020, 'RED PEN: READY', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Fixed their hair | *before turning around.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, MIRROR, MIRROR_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'PROFILE-PIC READY', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 400, 820, P.t0 + 1.5, 6, 150, 0.3)
    } },
  { sign: 'scorpio', cap: 'Already knew | *who said it.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'hi, | Cancer.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      label(x, 790, 980, 'DIDN’T TURN AROUND', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 28, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Wasn’t there. | *Left a note.*', mood: 'happy', star: { x: -200, s: 0 }, hideStar: true,
    front(x, t, lt, P) {
      note(x, 540, 860, pop01(t, P.t0 + 0.3, 0.35, 2), ['GONE HIKING.', 'BACK: MAYBE.', '— SAG'])
      label(x, 540, 1100, 'LAST SEEN: TUESDAY', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Said “in a meeting.” | *They weren’t.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'in a | meeting.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 980, 'CALENDAR: EMPTY', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Heard it an hour later. | *“Hm?”*', mood: lt => lt > 1.3 ? 'wide' : 'sleepy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'DELAY: 1 HOUR', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'hm?', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 64, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Name spelled right | on the cup. *Sobbed.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cup(x, 790, 980, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 700, 'FIRST TIME EVER', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 32, bg: '#b7a6ff', rot: -0.04 })
      hearts(x, t, 790, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 5 })
    } },
]

function clipboard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = '#8a4a2e'; x.fillRect(-142, -102, 284, 204)
  x.fillStyle = CREAM; x.fillRect(-124, -80, 248, 168)
  x.fillStyle = '#6b62a8'; x.fillRect(-46, -118, 92, 30)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ROLL CALL', 0, -44)
  x.fillStyle = '#2fc79a'; for (let i = 0; i < 3; i++) { x.fillRect(-96, -4 + i * 30, 16, 16); x.fillStyle = '#b9b0a0'; x.fillRect(-66, 0 + i * 30, 150, 8); x.fillStyle = '#2fc79a' }
  x.restore()
}

const F = makeFilm({
  id: 'r2t0045', key: 'F', accent: '#c97bff', ending: 'group',
  title: 'Heard their name? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'It was just | *roll call.*',
    draw(x, t, lt) { clipboard(x, 540, 690, pop01(t, t - lt + 1.6, 0.4, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
