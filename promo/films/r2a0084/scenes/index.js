// r2a0084: star_advice, ADVICE ROLLCALL, "What your family | wishes you knew." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm, specific line each from the people who love them, each with one light gag.
//   0.0–3.6    "What your family | *wishes you knew.*"
//   3.6–49.2   ♈ no need to rush, we'll wait · ♉ dinner's better with you (a saved seat) · ♊ we love every version of you
//              · ♋ let us take care of you (a blanket) · ♌ we clap offstage too · ♍ it doesn't need to be perfect (a wonky chart on the fridge)
//              · ♎ you don't keep the peace alone · ♏ you can tell us · ♐ call more, bring stories · ♑ you've done enough, come rest
//              · ♒ weird is welcome at this table · ♓ your feelings are safe here
//  49.2        "Come home soon. | *We miss you.*"  The twelve fly up into a group photo.
//  52.6        callback: "Your seat? | *Still saved.*"  Taurus's saved seat comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#8a4a2e'

const CHAIR = [
  'W.......',
  'W.......',
  'W.......',
  'W.......',
  'WWWWWWWW',
  'W......W',
  'W......W',
]
const PLATE = ['..WWWWW..', '.WWPPPWW.', 'WWPPPPPWW', '.WWPPPWW.', '..WWWWW..']
function seat(x, t, cx, cy, k) {
  if (k <= 0.01) return
  drawBits(x, CHAIR, { W: WOOD }, cx, cy + 40, 20 * k)
  drawBits(x, PLATE, { W: CREAM, P: '#e8a24a' }, cx, cy - 70, 16 * k)
  label(x, cx, cy - 170 * k, 'SAVED FOR YOU', k, { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
}
const BLANKET = ['PPPPPPPPPPPP', 'PWPPWPPWPPWP', 'PPPPPPPPPPPP', 'PPWPPWPPWPPW', 'PPPPPPPPPPPP']
const SCALE = ['.....K.....', 'KKKKKKKKKKK', 'K....K....K', 'K....K....K', 'GGG..K..GGG', '.....K.....', '...KKKKK...']
const COUCH = ['BB........BB', 'BBCCCCCCCCBB', 'BBCCCCCCCCBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'K..........K']
const FRIDGE = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK']
function phone(x, cx, cy, k, lt, t, P) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + (lt < 1.2 ? Math.sin(t * 50) * 4 : 0), cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -180, 240, 360); x.fillStyle = '#2a2350'; x.fillRect(-110, -170, 220, 340)
  x.fillStyle = BONE; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('HOME ♥', 0, -80); x.font = `700 22px ${MONO}`; x.fillStyle = LAV; x.fillText('calling…', 0, -30)
  x.fillStyle = '#2fc79a'; x.beginPath(); x.arc(0, 90, 40, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a crowd of small family stars cheering in front of the panel's bottom edge
function crowd(x, t, P, ids) {
  ids.forEach((id, i) => {
    const k = pop01(t, P.t0 + 0.4 + i * 0.12, 0.3, 2)
    if (k > 0.01) signChar(x, t, id, 640 + i * 110, 1080, 110 * k, { mood: 'happy', seed: 40 + i, glyph: false, hops: [P.t0 + 1.0 + i * 0.15, P.t0 + 1.8 + i * 0.1] })
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'No need to rush. | *We’ll wait.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', star: { x: -170 }, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      crowd(x, t, P, ['cancer', 'taurus', 'libra'])
      label(x, 790, 760, 'WE’LL WAIT ♥', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Dinner’s better | *when you’re there.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) { seat(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2)) } },
  { sign: 'gemini', cap: 'We love | *every version of you.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: { x: -200 },
    front(x, t, lt, P) {
      const MOODS = ['sparkle', 'sleepy', 'squint', 'heart']
      MOODS.forEach((m, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2)
        if (k > 0.01) signChar(x, t, 'gemini', 700 + (i % 2) * 170, 720 + Math.floor(i / 2) * 210, 140 * k, { mood: m, seed: 50 + i, glyph: false })
      })
      label(x, 790, 1130, 'ALL OF THEM ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Let us | *take care of you.*', mood: lt => lt > 1.0 ? 'sleepy' : 'wide', star: { x: -170 },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.4, 1.0))
      drawBits(x, BLANKET, { P: PINK, W: CREAM }, F.x, lerp(560, F.cy + 115, d), 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 720, 'your turn | to rest', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'We clap for you. | *Even offstage.*', mood: 'heart', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      crowd(x, t, P, ['aries', 'virgo', 'pisces'])
      label(x, 790, 760, 'BRAVO!!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 48, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.0, 8, 150, 0.2)
    } },
  { sign: 'virgo', cap: 'Not perfect? | *We love it anyway.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, FRIDGE, { K: INK, W: '#e6ecf5' }, 790, 870, 34 * k)
      if (k > 0.8) {
        x.save(); x.translate(790, 940); x.rotate(-0.12)
        x.fillStyle = CREAM; x.fillRect(-80, -80, 160, 150); x.strokeStyle = '#ff6b5a'; x.lineWidth = 6
        x.beginPath(); x.ellipse(0, -5, 52, 46, 0.3, 0, Math.PI * 1.85); x.stroke(); x.strokeStyle = '#6fc3ff'; x.beginPath(); x.moveTo(-40, -30); x.lineTo(35, 25); x.moveTo(-30, 30); x.lineTo(40, -20); x.stroke()
        x.restore()
      }
      label(x, 790, 1160, 'ON THE FRIDGE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'You don’t keep the peace | *alone.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      const tilt = lerp(0.25, 0, ease.outCubic(prog(lt, 0.9, 1.4))) * Math.cos(t * 4)
      drawBits(x, SCALE, { K: GOLD, G: '#c9cfe0' }, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: tilt })
      label(x, 790, 1060, 'HELP HAS ARRIVED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'You can tell us. | *We can handle it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'so… | promise not to freak?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      bubble(x, 790, 970, 'we’re listening ♥', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: MINT, tail: 'br' })
    } },
  { sign: 'sagittarius', cap: 'Call more. | *Bring the stories.*', mood: 'sparkle', star: { x: 150 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 330, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt, t, P)
      bubble(x, 330, 620, 'so where | are you NOW?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'You’ve done enough. | *Come rest.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      drawBits(x, COUCH, { B: '#7a6fd6', C: '#9a90ee', K: WOOD }, 330, 1000, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 330, 700, 'TO-DO LIST: NAP', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: '#9aa5c4', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Weird is welcome | *at this table.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'so I have | a theory…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 940, 'tell us | EVERYTHING', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: MINT, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'Your feelings | *are safe here.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', tears: lt => lt < 1.0 ? 3 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 860, 30 * pop01(t, P.t0 + 0.5, 0.35, 2) * (1 + 0.06 * Math.sin(t * 6)))
      label(x, 790, 1100, 'TISSUES: STOCKED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0084', key: 'E', accent: '#ff8fb1', ending: 'callback',
  title: 'What your family | *wishes you knew.*',
  cameos: CAMEOS,
  group: { cap: 'Come home soon. | *We miss you.*' },
  last: {
    text: 'Your seat? | *Still saved.*',
    draw(x, t, lt) {
      seat(x, t, 540, 1180, 1.5 * pop01(t, t - lt + 0.6, 0.4, 2))
      hearts(x, t, 540, 1150, t - lt + 1.4, { n: 8, life: 2.0, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
