// r2a0024: ADVICE ROLL CALL, "How to make each sign | laugh." (~57 s vertical, signs3kit, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific way to make each sign laugh, with a light visual gag.
//   0.0–3.6    "How to make | *each sign laugh.*"
//   3.6–49.2   ♈ challenge them to a silly race · ♉ feed them, then the joke · ♊ do the voices, all of them
//              · ♋ revive the inside joke · ♌ laugh at their jokes first · ♍ mispronounce "quinoa" on purpose
//              · ♎ a pun so bad it's art · ♏ whisper something slightly unhinged · ♐ tell the story where you fell
//              · ♑ go deadpan (HA. rare) · ♒ the weirdest fact you know · ♓ laugh till you both cry
//  49.2        "Laughter is | a *love language.*"
//  52.6        CALLBACK: "Capricorn laughed. | *Mark the calendar.*"  Capricorn and a calendar: HA. ×2
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', TEAL = '#2fc79a'

// ── props
const FRIES = ['.Y.Y.Y.', '.YYYYY.', 'YYYYYYY', 'RRRRRRR', 'RRWRRRR', 'RRRRRRR', '.RRRRR.']
const TOAST = ['.TTTTTTT.', 'TBBBBBBBT', 'TBBBBBBBT', 'TBBBBBBBT', 'TBBBBBBBT', 'TBBBBBBBT', 'TTTTTTTTT']
const OCTO = ['..PPPPP..', '.PPPPPPP.', 'PPWKPWKPP', 'PPPPPPPPP', '.PPPPPPP.', 'P.P.P.P.P', 'P.P.P.P.P', '.P..P..P.']
function calendar(x, cx, cy, k, top, mid) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#fff4e2'; x.fillRect(-140, -140, 280, 280)
  x.fillStyle = RED; x.fillRect(-140, -140, 280, 70)
  x.fillStyle = '#fff4e2'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(top, 0, -104)
  x.fillStyle = INK; x.font = `800 60px ${INTER}`; x.fillText(mid, 0, 40)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Challenge them | to a *silly race.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      label(x, 790, 760, 'RACE TO THE FRIDGE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, '3… 2… GO!', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 46, bg: '#ff6b5a', rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Feed them first. | *Then* the joke.', mood: lt => lt > 1.4 ? 'squint' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FRIES, { Y: GOLD, R: RED, W: BONE }, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'ok… go on', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Do the voices. | *All of them.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -170 }, hops: [1.3, 1.6],
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'arr, pirate!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 830, 830, 'now: a duck', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      bubble(x, 770, 980, 'now: you', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Revive the | *inside joke.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3, 1.6],
    front(x, t, lt, P) {
      label(x, 790, 760, 'JOKE FROM 2016', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'STILL WORKS ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 1000, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Laugh at their jokes. | *Loudly.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'HAHA! | so funny!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 960, 'LEO: GLOWING', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 400, 860, P.t0 + 1.2, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Say “quinoa” wrong. | *On purpose.*', mood: lt => lt > 1.4 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.6, 1.9],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'kwin-OH-ah?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 960, 'TWITCH → GIGGLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'A pun so bad | it’s *almost art.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'lettuce romaine | friends', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      label(x, 790, 960, 'GROAN → LAUGH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Whisper something | *slightly unhinged.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'psst… my plant’s | name is Kevin', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 790, 960, 'SMIRK UNLOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: '#ff5a7a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Tell the story | where *you fell.*', mood: 'squint', look: [-1, 0], star: { x: 170 }, hops: [0.8, 1.1, 1.4, 1.7],
    front(x, t, lt, P) {
      bubble(x, 320, 720, '…and then | I fell in', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'br' })
      label(x, 320, 960, 'LAUGHED: 9 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Go deadpan. | *Bone dry.*', mood: lt => lt > 1.5 ? 'squint' : 'neutral', look: [-1, 0], star: { x: 170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TOAST, { T: '#b9773a', B: '#e8c48a' }, 320, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      label(x, 320, 1080, 'HA. (RARE)', pop01(t, P.t0 + 1.5, 0.35, 2.6), { size: 46, bg: TEAL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'The weirdest fact | *you know.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, OCTO, { P: '#c97bff', W: '#ffffff', K: INK }, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 690, 'octopuses have | three hearts', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Laugh with them | *till you both cry.*', mood: 'squint', tears: 3, look: [1, 0], star: { x: -170 }, hops: [0.8, 1.1, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 960, 200 * k, { mood: 'squint', look: [-1, 0], seed: 12, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.4], tears: 2 })
      bubble(x, 790, 700, 'HAHA I CAN’T', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0024', key: 'E', accent: GOLD, ending: 'callback',
  title: 'How to make | *each sign laugh.*',
  cameos: CAMEOS,
  group: { cap: 'Laughter is | a *love language.*', moods: Array(12).fill('squint') },
  last: {
    text: 'Capricorn laughed. | *Mark the calendar.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'capricorn', 380, 1060, 260 * k, { mood: lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], seed: 40, hops: [t - lt + 1.4, t - lt + 1.7] })
      calendar(x, 740, 1060, pop01(t, t - lt + 0.8, 0.35, 2), 'TODAY', 'HA. ×2')
      sparkles(x, t, 740, 1060, t - lt + 1.2, 7, 180, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
