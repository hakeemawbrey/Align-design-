// r2a0715: star_advice, ADVICE SOLO, "Libra, your opinion | matters too." (signs3kit social cut, music: lofi · G, ending: callback)
// One sign the whole way (solo mode, 9 cards): a relatable Libra truth + a warm reframe, one visual gag each.
//   0.0–3.6    "Libra, your opinion | *matters too.*"
//   3.6–37.8   nine cards: said "anywhere is fine"? pick the place · nodding along? disagree kindly · polled everyone?
//              ask yourself first · the scales: add your own weight · your match asked what you think, tell them
//              · hate the group plan? suggest plan B · your taste is good, trust it · first "no"? celebrate
//              · you can want things (a wish list, finally)
//  37.8        "Fair to all. | *Fair to you.*"
//  41.2        callback: "You picked the place. | *Everyone loved it.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, board, confetti, friend, RED, CREAM, GREEN, ORANGE, VIOLET, WOOD, NIGHT } from './props.js'

const S = 'libra', ROSE = '#ff9ac0'
// a balance scale; tilt −1…1 (positive = right side down), with something on each pan
function scales(x, t, cx, cy, k, tilt, left, right) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 300); x.fillRect(-90, 140, 180, 30); x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 288); x.fillRect(-84, 146, 168, 18)
  x.save(); x.translate(0, -140); x.rotate(tilt * 0.25)
  x.fillStyle = INK; x.fillRect(-200, -10, 400, 20); x.fillStyle = GOLD; x.fillRect(-196, -6, 392, 12)
  for (const [side, fn] of [[-1, left], [1, right]]) {
    x.save(); x.translate(side * 180, 0); x.rotate(-tilt * 0.25)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-60, 110); x.moveTo(0, 0); x.lineTo(60, 110); x.stroke()
    x.fillStyle = INK; x.fillRect(-80, 106, 160, 20); x.fillStyle = GOLD; x.fillRect(-76, 108, 152, 14)
    fn && fn(x)
    x.restore()
  }
  x.restore(); x.restore()
}
// two restaurant sign boards with a pointer
function places(x, t, cx, cy, k, pick) {
  if (k <= 0.01) return
  const P = [['NOODLES', SKYB], ['TACOS', GOLD]]
  P.forEach(([s, c], i) => label(x, cx + (i ? 90 : -90), cy - 60 + i * 120, s + (pick && i === 1 ? ' ✓' : ''), k, { size: 36, bg: c, font: MONO, weight: 700, rot: i ? 0.05 : -0.05 }))
}
const H = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

const CAMEOS = [
  { sign: S, cap: 'Said “anywhere is fine”? | *Pick the place.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      places(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.3)
      bubble(x, 790, 640, lt > 1.3 ? 'tacos. final.' : 'um, anywhere?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl', col: lt > 1.3 ? MINT : BONE })
      sparkles(x, t, 880, 920, P.t0 + 1.4, 6, 120, 0.3)
    } },
  { sign: S, cap: 'Nodding along? | *You can disagree kindly.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -200 },
    squash: lt => lt < 1.3 ? 0.05 * Math.sin(lt * 14) : 0,
    front(x, t, lt, P) {
      friend(x, t, 'aries', 820, 960, 190, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'sparkle', look: [-1, 0] })
      bubble(x, 820, 720, 'pineapple on | everything!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'bc' })
      bubble(x, 420, 640, 'hmm, actually… ♡', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl', col: ROSE })
    } },
  { sign: S, cap: 'Polled everyone? | *Ask yourself first.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'POLL: MY HAIR?', headCol: ROSE, lines: [['short: 4', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['long: 4', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['ME: short ♡', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)]] })
    } },
  { sign: S, cap: 'Always balancing? | *Add your own weight.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const tilt = lerp(-0.6, 0.0, ease.outBack(clamp((lt - 1.0) / 0.5)))
      scales(x, t, 760, 900, 0.72 * pop01(t, P.t0 + 0.2, 0.35, 2), tilt,
        x => label(x, 0, 80, 'THEM', 1, { size: 28, bg: SKYB, font: MONO, weight: 700, rot: 0 }),
        x => { if (lt > 1.0) drawBits(x, H, { H: '#ff4f86' }, 0, 80, 10) })
      label(x, 790, 640, lt > 1.4 ? 'BALANCED ✓' : 'TILTED', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: lt > 1.4 ? MINT : GOLD, font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: S, cap: 'Match asked your take? | *Give it.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headCol: ROSE, lines: [['what do YOU', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['think?', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['honestly? I…', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.2)], ['love that!!', LAV, pop01(t, P.t0 + 1.8, 0.25, 2.2)]] })
    } },
  { sign: S, cap: 'Hate the group plan? | *Pitch plan B.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      board(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 250, legs: true }, x => {
        x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
        x.fillText('PLAN A: 6 a.m.', 0, -60); x.fillStyle = RED; x.fillRect(-150, -62, 300 * clamp((lt - 0.6) / 0.4), 6)
        if (lt > 1.1) { x.fillStyle = '#3a9a48'; x.fillText('PLAN B: picnic', 0, 30); x.font = `800 28px ${INTER}`; x.fillText('at noon ✦', 0, 80) }
      })
      label(x, 790, 1110, 'VOTES: ALL', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: S, cap: 'Your taste is good. | *Trust it.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      board(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 280, h: 320, frame: GOLD, bg: '#2a3a7a', rot: 0.03 }, x => {
        x.fillStyle = ROSE; x.beginPath(); x.arc(-40, -40, 70, 0, Math.PI * 2); x.fill()
        x.fillStyle = SKYB; x.fillRect(10, 10, 110, 120); x.fillStyle = GOLD; x.beginPath(); x.moveTo(-120, 150); x.lineTo(-20, 20); x.lineTo(80, 150); x.fill()
      })
      label(x, 790, 1080, 'CURATED BY ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: ROSE, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: S, cap: 'Said your first “no”? | *Celebrate.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: -200 }, hops: [1.0, 1.5, 2.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'no, thank you!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      confetti(x, t, 620, 880, P.t0 + 1.0)
      label(x, 790, 1050, 'FIRST “NO” ✓', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: GOLD, font: MONO, weight: 700, rot: -0.05 })
    } },
  { sign: S, cap: 'You can want things. | *Write them down.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { title: 'I WANT ♡', lines: ['the window seat', 'the last slice', 'MY playlist'], ticks: clamp((lt - 0.6) / 1.2) * 3.01, w: 340, head: ROSE })
    } },
]

const F = makeFilm({
  id: 'r2a0715', key: 'G', accent: ROSE, solo: S, ending: 'callback',
  title: 'Libra, your opinion | *matters too.*',
  cameos: CAMEOS,
  group: { cap: 'Fair to all. | *Fair to you.*', mood: 'heart' },
  last: {
    text: 'You picked tacos. | *Everyone loved it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      label(x, 540, 980, 'TACOS ✓', pop01(t, t0 + 0.4, 0.35, 2.2), { size: 72, bg: GOLD, font: MONO, weight: 700, rot: -0.04 })
      const IDS = ['aries', 'taurus', 'gemini', 'cancer']
      IDS.forEach((id, i) => friend(x, t, id, 270 + i * 180, 1240, 200, pop01(t, t0 + 0.8 + i * 0.12, 0.35, 2), { mood: 'heart', seed: 70 + i, hops: [t0 + 1.6 + i * 0.1] }))
      hearts(x, t, 540, 1150, t0 + 1.6, { n: 8, life: 1.8, spread: 500, cell: 8, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
