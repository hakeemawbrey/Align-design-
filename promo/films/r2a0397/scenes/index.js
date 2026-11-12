// r2a0397: star_advice ADVICE SOLO (scorpio), "How to encourage | a Scorpio." (signs3kit social cut, music: lofi · F). Ending: group.
//   nine cards, each a true Scorpio thing + a warm reframe: say the secret dream once, out loud · soft is brave too
//   · starting over is phoenix energy · trust takes time, take it · rest is part of going all in · not "too much", just right
//   · did it quietly, we noticed · their chart: strong stuff in there · a cheerleader with black pom-poms
//   group (the ending): "Deep. Loyal. | Unstoppable.".
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#c97bff', RED = '#e23d4e', CREAM = '#fff4e2'
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
const DIARY = ['PPPPPPPPPP', 'PPPPPPPPPP', 'PPPWWWWPPP', 'PPPPPPPPPP', 'PPPPPPPPYY', 'PPPPPPPPYY', 'PPPPPPPPPP', 'PPPPPPPPPP', 'PPPPPPPPPP']
const LOCK = ['.YYY.', 'Y...Y', 'Y...Y', 'YYYYY', 'YYKYY', 'YYYYY']
const SHELL = ['....K....', '...KKK...', '..KKKKK..', '.KKKKKKK.', 'KKKKKKKKK', 'KKKKKKKKK', '.KKKKKKK.']
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..']
const BIRD = ['......OO....', '.....OYYO...', 'R...OYYYYO..', 'RR.OYYKYYYB.', 'RRROOYYYYO..', '.RROOOOOO...', '..RRR.OO....', '...R..O.O...']
const GLASS = ['KKKKKKK', '.SSSSS.', '..SSS..', '...S...', '..S.S..', '.SSSSS.', 'KKKKKKK']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSWSWSWSSK.', '.KSSSSSSSSK.', '.KSWSWSWSSK.', '.KKKKKKKKKK.', 'KKKKKKKKKKKK']
const PILLOW = ['.WWWWWWWWW.', 'WWWWWWWWWWW', 'WWWWLWWWWWW', 'WWWWWWWWWWW', '.WWWWWWWWW.']
const MEDAL = ['R.....R', 'RR...RR', '.RR.RR.', '..YYY..', '.YYYYY.', '.YYKYY.', '.YYYYY.', '..YYY..']
function pompom(x, t, cx, cy, k, seed = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.3 * Math.sin(t * 9 + seed)); x.scale(k, k)
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, r = 34 + 8 * Math.sin(i * 2.3 + t * 12); x.fillStyle = i % 2 ? '#2a2350' : '#140c30'; x.fillRect(Math.cos(a) * r - 12, Math.sin(a) * r - 12, 24, 24) }
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 32, 0, Math.PI * 2); x.fill()
  x.fillStyle = ACC; x.fillRect(-4, 30, 8, 44)
  x.restore()
}
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 122, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 114, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 88, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.3; x.beginPath(); x.moveTo(Math.cos(a) * 88, Math.sin(a) * 88); x.lineTo(Math.cos(a) * 114, Math.sin(a) * 114); x.stroke() }
  x.strokeStyle = ACC; x.beginPath(); x.moveTo(-56, 40); x.lineTo(50, 30); x.lineTo(-10, -66); x.closePath(); x.stroke()
  x.restore()
}

const S = 'scorpio', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Hiding a big dream? | *Say it once, out loud.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DIARY, { P: '#5b2e8a', W: BONE, Y: GOLD }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const open = ease.inCubic(prog(lt, 0.8, 1.2))
      if (open < 1) drawBits(x, LOCK, { Y: GOLD, K: INK }, 920 + 40 * open, 900 + 200 * open, 14, { rot: open * 1.5, alpha: 1 - open })
      L(x, 800, 660, 'TOP SECRET', pop01(t, P.t0 + 0.3, 0.3, 2), RED, -0.05, 36, CREAM)
      bubble(x, 790, 1120, 'we’d love that!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      sparkles(x, t, 800, 880, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Afraid to look soft? | *Soft is brave too.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHELL, { K: '#2a2350' }, 800, 960, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const g = ease.outBack ? ease.outBack(prog(lt, 0.8, 1.3)) : ease.outCubic(prog(lt, 0.8, 1.3))
      if (g > 0) drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: '#5fd068' }, 800, lerp(940, 770, g), 18)
      L(x, 800, 1130, 'ARMOUR: OPTIONAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Starting over again? | *Phoenix energy.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const r = ease.outCubic(prog(lt, 0.3, 1.4))
      drawBits(x, BIRD, { O: '#ffb34a', Y: '#ffe36a', R: RED, K: INK, B: '#c98f2a' }, 800, lerp(1080, 820, r), 18 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.1 + 0.08 * Math.sin(t * 8) })
      L(x, 800, 620, 'VERSION 9.0', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 40)
      L(x, 800, 1110, 'BEST ONE YET', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Trust takes time? | *Take all of it.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLASS, { K: '#8a4a2e', S: '#ffe36a' }, 800, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.0 ? Math.PI * ease.inOutCubic(prog(lt, 1.0, 1.5)) : 0 })
      L(x, 800, 1120, 'NO RUSH. WE’LL WAIT.', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 30)
      bubble(x, 790, 640, 'still here!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'All in on everything? | *Rest is part of it.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const swap = lt > 1.1
      if (!swap) { drawBits(x, LAPTOP, { K: INK, S: '#2a2350', W: ACC }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)); L(x, 800, 680, 'TABS OPEN: 47', 1, RED, -0.04, 34, CREAM) }
      else { drawBits(x, PILLOW, { W: '#efe6ff', L: LAV }, 800, 900, 26 * pop01(t, P.t0 + 1.15, 0.3, 2.2)); L(x, 800, 680, 'BREAK: SCHEDULED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32) }
    } },
  { sign: S, cap: 'Worried you’re “too much”? | *You’re just right.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 900, 220, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0, bg: '#d9e8ff' }, () => {
        const f = ease.outCubic(prog(lt, 0.4, 1.4))
        x.fillStyle = ACC; x.fillRect(-110, 150 - 260 * f, 220, 260 * f)
        x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(-110, -110); x.lineTo(30, -110); x.stroke()
        x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('PERFECT', -100, -130)
      })
      L(x, 800, 690, 'INTENSITY', pop01(t, P.t0 + 0.3, 0.3, 2), BONE, -0.04, 34)
      L(x, 800, 1110, 'EXACTLY ENOUGH', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Did it quietly? | *We noticed.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 960, 170 * k, { mood: 'happy', look: [-1, 0], seed: 14, glyph: false })
      const d = ease.inOutCubic(prog(lt, 0.6, 1.1))
      drawBits(x, MEDAL, { R: RED, Y: GOLD, K: INK }, lerp(780, F.x + 40, d), lerp(780, F.cy + 40, d), 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 680, 'SEEN. CLAPPING.', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 34)
      sparkles(x, t, F.x + 40, F.cy + 40, P.t0 + 1.15, 6, 110, 0.4)
    } },
  { sign: S, cap: 'Checked their chart? | *Strong stuff in there.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1040, 'PLUTO: FLEXING', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
      sparkles(x, t, 800, 830, P.t0 + 1.3, 8, 160, 0.5)
    } },
  { sign: S, cap: 'Need a cheerleader? | *Black pom-poms. Obviously.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 940, 180 * k, { mood: 'sparkle', look: [-1, 0], seed: 15, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.6, P.t0 + 2.2] })
      pompom(x, t, 660, 900, pop01(t, P.t0 + 0.6, 0.3, 2), 0)
      pompom(x, t, 920, 900, pop01(t, P.t0 + 0.7, 0.3, 2), 1.5)
      bubble(x, 790, 660, 'go. (quietly.)', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0397', key: 'F', accent: ACC, solo: 'scorpio', ending: 'group',
  title: 'How to encourage | *a Scorpio.*',
  cameos: CAMEOS,
  group: { cap: 'Deep. Loyal. | *Unstoppable.*', mood: 'heart' },

})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
