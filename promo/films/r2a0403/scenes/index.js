// r2a0403: star_advice, ADVICE SOLO, "How to give | an Aquarius space." (~45 s vertical, signs3kit social cut, music:
// lofi · C). One sign the whole way: nine kind ways to give an Aquarius room, each with one light gag. Ending: callback.
//   0.0–3.6    "How to give | an Aquarius *space.*"
//   3.6–37.8   nine cards (3.8 s each):
//              no reply for a day, recharging (social battery) · keep plans loose, maybe means yes · send a silly
//              picture, not a speech · a hobby that makes no sense, ask about it · sit together, separately
//              · alone time isn't about you (door sign) · big feelings, let them process · they wander off, they
//              come back with stories (postcard) · give them space, watch them come closer
//  37.8        "Free spirit. | *Loyal heart.*"
//  41.2        CALLBACK: "That social battery? | *Charged. For you.*"  The battery is back at 100%.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', TEAL = '#5fe0e0', GREEN = '#5fd068'

const CLOUD = [
  '...WWWW.....',
  '..WWWWWW.WW.',
  '.WWWWWWWWWWW',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
]
const HEADPH = [
  '..KKKKK..',
  '.K.....K.',
  'K.......K',
  'PP.....PP',
  'PP.....PP',
]

// a battery that fills to `p`
function battery(x, cx, cy, k, p, s = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-126, -66, 252, 132); x.fillRect(126, -30, 26, 60)
  x.fillStyle = BONE; x.fillRect(-118, -58, 236, 116); x.fillRect(126, -22, 18, 44)
  x.fillStyle = '#140c30'; x.fillRect(-106, -46, 212, 92)
  x.fillStyle = p < 0.25 ? RED : p < 0.6 ? GOLD : GREEN
  const bars = Math.max(1, Math.round(p * 5))
  for (let i = 0; i < bars; i++) x.fillRect(-98 + i * 41, -38, 34, 76)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.restore()
}
// a door with a hanging sign
function door(x, t, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-116, -236, 232, 472)
  x.fillStyle = '#8a5a2e'; x.fillRect(-108, -228, 216, 460)
  x.fillStyle = '#6b4220'; x.fillRect(-88, -200, 176, 160); x.fillRect(-88, -10, 176, 200)
  x.fillStyle = GOLD; x.fillRect(70, 0, 20, 20)
  x.save(); x.translate(0, -120); x.rotate(0.06 * Math.sin(t * 2))
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(-50, -40); x.lineTo(0, -80); x.lineTo(50, -40); x.stroke()
  x.fillStyle = INK; x.fillRect(-106, -46, 212, 110); x.fillStyle = PAPER; x.fillRect(-100, -40, 200, 98)
  x.fillStyle = INK; x.font = `800 21px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  text.split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, 9 + (i - (a.length - 1) / 2) * 32))
  x.restore()
  x.restore()
}
// a postcard with a little sun and sea
function postcard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -96, 336, 212)
  x.fillStyle = INK; x.fillRect(-172, -110, 344, 220)
  x.fillStyle = PAPER; x.fillRect(-166, -104, 332, 208)
  x.fillStyle = SKYB; x.fillRect(-150, -88, 150, 176); x.fillStyle = '#5b8cff'; x.fillRect(-150, 20, 150, 68)
  x.fillStyle = GOLD; x.fillRect(-100, -60, 44, 44)
  x.fillStyle = INK; x.font = `italic 600 26px Georgia, serif`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('wish you', 14, -40); x.fillText('were here!', 14, -6)
  x.fillStyle = '#c3cbe0'; for (let i = 0; i < 3; i++) x.fillRect(14, 30 + i * 22, 130, 3)
  x.fillStyle = RED; x.fillRect(110, -90, 36, 42)
  x.restore()
}
// a thought cloud with a loading bar
function thinking(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  drawBits(x, CLOUD, { W: BONE }, 0, -10, 30)
  const p = clamp((lt - 0.4) / 1.5)
  x.fillStyle = INK; x.fillRect(-120, 10, 240, 40); x.fillStyle = '#c3cbe0'; x.fillRect(-114, 16, 228, 28)
  x.fillStyle = TEAL; x.fillRect(-114, 16, 228 * p, 28)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = BONE; x.fillRect(-150, 110, 30, 30); x.fillRect(-190, 160, 20, 20)
  x.restore()
  label(x, cx, cy + 190, p >= 1 ? 'READY TO TALK ✦' : `THINKING… ${Math.round(p * 100)}%`, k, { size: 32, bg: p >= 1 ? GOLD : TEAL, rot: 0.04, font: MONO, weight: 700 })
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'aquarius', cap: 'No reply for a day? | *Just recharging.*', mood: lt => lt > 1.5 ? 'sparkle' : 'sleepy', look: [1, 0], star: STAR, hops: [1.6],
    front(x, t, lt, P) {
      battery(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(0.12, 1, ease.inOutCubic(prog(lt, 0.5, 1.6))))
      label(x, 790, 720, 'SOCIAL BATTERY', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: TEAL, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.6) label(x, 790, 1070, 'BACK ONLINE ✦', pop01(t, P.t0 + 1.65, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Keep the plans loose. | *“Maybe” means yes.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'dinner fri?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      bubble(x, 700, 860, 'maybe!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 1070, '(ARRIVED EARLY)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'They went quiet? | Send *a silly picture.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: STAR, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      x.save(); x.translate(800, 860); x.scale(k, k); x.rotate(0.04)
      if (k > 0.01) {
        x.fillStyle = INK; x.fillRect(-130, -130, 260, 260); x.fillStyle = '#9ae58a'; x.fillRect(-122, -122, 244, 244)
        x.fillStyle = '#3fae5b'; x.fillRect(-70, -10, 140, 90); x.fillRect(-56, -40, 40, 40); x.fillRect(16, -40, 40, 40)
        x.fillStyle = '#fff'; x.fillRect(-48, -32, 24, 24); x.fillRect(24, -32, 24, 24); x.fillStyle = INK; x.fillRect(-40, -24, 10, 10); x.fillRect(32, -24, 10, 10)
        x.fillStyle = INK; x.fillRect(-60, -80, 120, 30); x.fillRect(-36, -110, 72, 36); x.fillStyle = RED; x.fillRect(-36, -84, 72, 8)
      }
      x.restore()
      bubble(x, 800, 1110, 'HAHAHA ok hi', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'A hobby that makes no sense? | *Ask about it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, -1], star: STAR, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CLOUD, { W: BONE }, 800 + 10 * Math.sin(t), 740, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 900, 'THIS IS GARY', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
      label(x, 800, 1040, 'HOBBY: NAMING CLOUDS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: TEAL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Sit together, separately. | *Still counts.*', mood: 'happy', look: [1, 0], star: STAR,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, HEADPH, { K: INK, P: PINK }, F.x, F.top - 14, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (k > 0.01) { const G = signChar(x, t, 'libra', 800, 940, 220 * k, { mood: 'happy', look: [-1, 0], seed: 29, glyph: false }); drawBits(x, HEADPH, { K: INK, P: SKYB }, 800, G.top - 10, 15 * k) }
      label(x, 790, 680, 'TOGETHER-ISH ♥︎', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Alone time? | *It’s not about you.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: STAR,
    front(x, t, lt, P) { door(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'DO NOT DISTURB | (love you tho)') } },
  { sign: 'aquarius', cap: 'Big feelings? | *Let them think first.*', mood: lt => lt > 1.9 ? 'sparkle' : 'squint', look: [1, -1], star: STAR, hops: [1.9],
    front(x, t, lt, P) { thinking(x, t, 740, 800, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'aquarius', cap: 'They wandered off? | *Back with stories.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: STAR, hops: [1.2, 1.8],
    front(x, t, lt, P) {
      postcard(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 1100, 'okay, so…', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Give them space. | Watch them *come closer.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const c = ease.inOutCubic(prog(lt, 0.6, 1.5))
      if (k > 0.01) signChar(x, t, 'cancer', lerp(880, 640, c), 960, 200 * k, { mood: c > 0.9 ? 'heart' : 'happy', look: [-1, 0], seed: 33, glyph: false })
      label(x, 790, 680, `DISTANCE: ${Math.round(lerp(10, 0, c))} M`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: TEAL, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 840, P.t0 + 1.6, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0403', key: 'C', accent: TEAL, solo: 'aquarius', ending: 'callback',
  title: 'How to give | an Aquarius *space.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Loyal heart.*', mood: 'heart' },
  last: {
    text: 'That social battery? | *Charged. For you.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aquarius', 360, 1110, 240 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      battery(x, t > 0 ? 720 : 720, 1110, pop01(t, t - lt + 0.6, 0.35, 2), lerp(0.4, 1, ease.inOutCubic(clamp((lt - 0.8) / 0.8))), 0.9)
      label(x, 720, 1240, '100% ♥︎', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 1040, t - lt + 1.6, { n: 7, life: 2.0, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
