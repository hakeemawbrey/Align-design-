// r2a0661: star_advice, ADVICE SOLO (aries), "Aries, the right people | *will stay.*" (signs3kit social cut, music: lofi · D).
// Nine cards: a relatable Aries truth + a warm reframe, one light visual gag each. Ending: lesson.
//   come on strong (a megaphone "HI!!", the friend loves it) · text first (keep the ones who reply) · too much? wrong
//   room (a door sign) · start everything (the friend cheers project #12) · temper fades fast (a puff becomes a heart)
//   · you show up (your friend notices) · someone left (an empty chair, saved for someone good) · loud laugh (theirs is
//   louder) · the right match keeps up (a profile card: SAME SPEED)
//   group "Stay *you.* | The rest sorts itself."  lesson "Your people | *won't need convincing.*"  last "Be loud, Aries. | *They're staying.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SG = 'aries', ST = { x: -170 }
const ACC = '#ff8a6a', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ff9a4a'
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
const friend = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 31, look: [-1, 0], ...o }) }
const MEGA = ['......RR', '....RRRR', 'WWRRRRRR', 'WWRRRRRR', 'WWRRRRRR', '....RRRR', '.K....RR', '.K......']
const DOOR = ['BBBBBBBB', 'BbbbbbbB', 'BbBBBBbB', 'BbBBBBbB', 'BbbbbbbB', 'BbBBBBbB', 'BbBBBYbB', 'BbBBBBbB', 'BbbbbbbB', 'BBBBBBBB']
const CAPE = ['RRR...RRR', 'RRRRRRRRR', '.RRRRRRR.', '.RRRRRRR.', '.RRRRRRR.', 'RRRRRRRRR', 'RR.RRR.RR']
const CHAIR = ['.WWWWW.', '.W...W.', '.W...W.', '.WWWWW.', 'WWWWWWW', 'W.....W', 'W.....W']
const PUFF = ['..O.O..', '.OOOOO.', 'OOYYYOO', 'OYYYYYO', '.OYYYO.', '..OOO..']

const CAMEOS = [
  { sign: SG, cap: 'You come on *strong.* | The right ones love it.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      drawBits(x, MEGA, { R: RED, W: CREAM, K: INK }, 560, 820, 12 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 780, 660, 'HI!!!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 48, tail: 'bl' })
      friend(x, t, 'leo', 800, 940, 200, pop01(t, P.t0 + 0.8, 0.3, 2), { mood: lt > 1.2 ? 'heart' : 'wide', hops: [P.t0 + 1.3] })
      L(x, 800, 1110, 'LOVES IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: SG, cap: 'You text *first.* | Keep the ones who reply.', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 760, 860, 340, 460, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = '#140c30'; x.fillRect(-150, -200, 300, 400)
        x.fillStyle = PINK; x.fillRect(-150, -200, 300, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('MATCH ♌︎', 0, -177)
        const out = ['hey!', 'how was it??', 'proud of you'], n = Math.min(3, 1 + Math.floor(clamp((lt - 0.2) / 0.9) * 3))
        x.font = `800 28px ${INTER}`
        for (let i = 0; i < n; i++) { x.fillStyle = ACC; x.fillRect(-60, -136 + i * 70, 200, 54); x.fillStyle = INK; x.fillText(out[i], 40, -108 + i * 70) }
        if (lt > 1.4) { x.fillStyle = MINT; x.fillRect(-140, 84, 240, 58); x.fillStyle = INK; x.fillText('you remembered!', -20, 114) }
      })
      L(x, 790, 1120, 'KEEPER', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: SG, cap: 'Too much? | For the *wrong room.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, DOOR, { B: BROWN, b: '#b0703e', Y: GOLD }, 720, 870, 34 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 720, 680, 'WRONG ROOM', pop01(t, P.t0 + 0.5, 0.3, 2.2), BONE, 0.04, 30)
      L(x, 860, 1110, 'YOUR PEOPLE →', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: SG, cap: 'You start *everything.* | Real friends cheer anyway.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.1) / 1.2) * 11)
      L(x, 790, 650, `PROJECT #${n}`, pop01(t, P.t0 + 0.15, 0.3, 2), GOLD, 0.05, 40)
      friend(x, t, 'gemini', 800, 920, 210, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'sparkle', hops: [P.t0 + 0.9, P.t0 + 1.6] })
      bubble(x, 810, 1110, 'go go go!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
    } },
  { sign: SG, cap: 'Your temper fades *fast.* | So do the grudges.', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sw = ease.inOutCubic(prog(lt, 0.9, 1.3))
      if (sw < 1) drawBits(x, PUFF, { O: ORANGE, Y: GOLD }, 790, 860, 26 * pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - sw))
      if (sw > 0) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK, W: '#fff' }, 790, 860, 24 * sw)
      L(x, 790, 1110, 'OVER IT: 4 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
      sparkles(x, t, 790, 860, P.t0 + 1.2, 6, 150, 0.4)
    } },
  { sign: SG, cap: 'You show up. | Your people *notice.*', mood: 'sparkle', look: [1, 0], star: { x: -150 }, hops: [0.7],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 810, 930, 200, pop01(t, P.t0 + 0.6, 0.3, 2), { mood: lt > 1.3 ? 'heart' : 'neutral' })
      bubble(x, 810, 680, 'you came!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bc' })
      L(x, 810, 1110, 'BACKUP: ARRIVED', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: SG, cap: 'Someone left? | That made *room.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { W: BONE }, 790, 880, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      sparkles(x, t, 790, 860, P.t0 + 1.1, 7, 170, 0.6)
      L(x, 790, 650, 'SAVED FOR', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.05, 32)
      L(x, 790, 1110, 'SOMEONE GOOD', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: SG, cap: 'Loud laugh? | Your people *laugh louder.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bubble(x, 380, 680, 'HA!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bc' })
      friend(x, t, 'sagittarius', 810, 930, 210, pop01(t, P.t0 + 0.6, 0.3, 2), { mood: 'happy', hops: [P.t0 + 1.0, P.t0 + 1.5] })
      bubble(x, 800, 690, 'HAHAHAHA!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bc' })
      L(x, 810, 1110, 'VOLUME: MATCHED', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: SG, cap: 'The right match | *keeps up.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 790, 850, 290, 360, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, () => {
        x.fillStyle = '#140c30'; x.fillRect(-130, -160, 260, 250)
        x.fillStyle = GOLD; x.font = `700 28px ${MONO}`; x.fillText('♐︎ SAGITTARIUS', 0, 130)
      })
      friend(x, t, 'sagittarius', 790, 830, 170, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'sparkle', look: [0, 0] })
      L(x, 790, 1110, 'SAME SPEED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
      hearts(x, t, 560, 760, P.t0 + 1.4, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0661', key: 'D', accent: ACC, solo: SG, ending: 'lesson',
  title: 'Aries, the right | people *will stay.*',
  cameos: CAMEOS,
  group: { cap: 'Stay *you.* | The rest sorts itself.', mood: 'heart' },
  lesson: { text: 'You’re not too much. | You’re *a lot of good.*', chip: 'STATUS: KEPT' },
  last: {
    text: 'Be loud, Aries. | *They’re staying.*',
    draw(x, t, lt) { hearts(x, t, 540, 1150, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
