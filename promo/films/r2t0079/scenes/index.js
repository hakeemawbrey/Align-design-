// r2t0079: star_talk SOLO, "Leos texting | be like." (~46 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): the most extreme Leo on their phone.
//   0.0–3.6    "Leos texting | *be like.*"
//   3.6–37.8   sends a selfie, asks for a rating · replies with a nine-minute voice note · renamed the group chat after
//              themself · your news? made it about Leo · texts in all caps, always · saved your compliment as the
//              wallpaper · new profile pic, weekly · reacts to everything with a crown · hearted your "ok"
//  37.8        "Loud texts. | *Louder love.*"
//  41.2        CALLBACK: "Voice note, | *part two.*"  The voice note comes back, even longer.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'
const S = 'leo'

function card(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function phone(x, cx, cy, k, draw, rot = 0.05) {
  if (!card(x, cx, cy, 250, 400, '#2a2350', k, rot)) return
  x.fillStyle = '#140c30'; x.fillRect(-110, -170, 220, 340)
  draw(); x.restore()
}
// a voice-note bar with a waveform and a running time
function voice(x, t, cx, cy, k, secs) {
  if (!card(x, cx, cy, 440, 130, BONE, k, -0.03)) return
  x.fillStyle = ORANGE; x.beginPath(); x.moveTo(-190, -26); x.lineTo(-150, 0); x.lineTo(-190, 26); x.closePath(); x.fill()
  for (let i = 0; i < 16; i++) { const h = 14 + 34 * Math.abs(Math.sin(i * 1.3 + t * 6)); x.fillStyle = '#4b3f82'; x.fillRect(-130 + i * 12, -h / 2, 7, h) }
  const m = Math.floor(secs / 60), s = Math.floor(secs % 60)
  text(x, `${m}:${String(s).padStart(2, '0')}`, 140, 0, 28, INK, MONO, 700)
  x.restore()
}
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

const CAMEOS = [
  { sign: S, cap: 'Sends a selfie. | *Asks for a rating.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      phone(x, 790, 860, k, () => { x.fillStyle = '#3a2a6a'; x.fillRect(-90, -150, 180, 200) })
      if (k > 0.5) signChar(x, t, 'leo', 795, 800, 140, { mood: 'wink', seed: 31, glyph: false })
      bubble(x, 790, 1110, 'rate me 1-10', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Replies with | *a nine-minute voice note.*', mood: 'happy', look: [1, 0], star: { x: -170, y: 60 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      voice(x, t, 740, 680, pop01(t, P.t0 + 0.15, 0.3, 2), 9 + clamp((lt - 0.2) / 1.8) * 532)
      label(x, 790, 1080, 'STILL TALKING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Renamed the group chat | *after themself.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const after = lt > 1.0
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), () => {
        x.fillStyle = after ? ORANGE : '#4b3f82'; x.fillRect(-100, -150, 200, 70)
        text(x, after ? 'THE LEO SHOW' : 'besties', 0, -115, after ? 24 : 28, after ? INK : BONE, MONO, 700)
        for (let i = 0; i < 3; i++) { x.fillStyle = '#4b3f82'; x.fillRect(-90 + (i % 2) * 40, -40 + i * 60, 140, 36) }
      })
      sparkles(x, t, 790, 740, P.t0 + 1.0 * 1.29, 6, 140, 0.4)
    } },
  { sign: S, cap: 'You got engaged? | *“Omg, so me.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'i’m engaged!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      bubble(x, 760, 900, 'omg same energy', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 760, 1070, 'anyway, ME:', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Texts in all caps. | *Every. Time.*', mood: 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      bubble(x, 760, 760, 'HIIIII!!!', pop01(t, P.t0 + 0.2, 0.25, 2.6), { size: 64, tail: 'bl' })
      bubble(x, 760, 1010, 'GOOD MORNING!!', pop01(t, P.t0 + 1.1, 0.25, 2.6), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Your compliment? | Now *their wallpaper.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), () => {
        x.fillStyle = PINK; x.fillRect(-100, -160, 200, 320)
        text(x, '“you’re', 0, -30, 36, INK); text(x, 'amazing”', 0, 20, 36, INK)
      })
      label(x, 790, 640, 'WALLPAPER: SET', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New profile pic. | *Every week.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      for (let i = 2; i >= 0; i--) {
        if (card(x, 790 + i * 22, 840 - i * 22, 240, 300, BONE, k, 0.05 - i * 0.04)) { x.fillStyle = '#2a2350'; x.fillRect(-100, -130, 200, 180); x.restore() }
      }
      if (k > 0.5) signChar(x, t, 'leo', 790, 800, 140, { mood: Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', seed: 33, glyph: false })
      const n = 48 + Math.floor(clamp((lt - 0.4) / 1.2) * 4)
      label(x, 790, 1080, `PIC #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Reacts to everything | *with a crown.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'i’m at the store', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      for (let i = 0; i < 4; i++) drawBits(x, CROWN, CROWN_C, 660 + i * 85, 900 + (i % 2) * 24, 11 * pop01(t, P.t0 + 0.8 + i * 0.15, 0.25, 2.4))
      label(x, 790, 1080, 'CROWN x 4', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You said “ok.” | *Got a heart anyway.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'ok', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 60, col: LAV, tail: 'br' })
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 880, 880, 14 * pop01(t, P.t0 + 1.0, 0.3, 2.6))
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0079', key: 'D', accent: ORANGE, solo: S, ending: 'callback',
  title: 'Leos texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Loud texts. | *Louder love.*', mood: 'sparkle' },
  last: {
    text: 'Voice note, | *part two.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 540, 1180, 260 * k, { mood: 'happy', look: [0, 0], seed: 40, hops: [t - lt + 1.2, t - lt + 2.2] })
      voice(x, t, 540, 900, 1.2 * pop01(t, t - lt + 0.7, 0.35, 2), 600 + clamp((lt - 0.7) / 3) * 420)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
