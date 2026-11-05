// kwoe05: WHICH ONE ARE YOU? · "First Date Nerves" (trial reel, house · G, hard cut). Format: kwoe01/scenes/wokit.js.
//   frame 0  whip zoom out of panel 1: Libra mid-outfit-throw, a shirt flying at the lens.
//   1 Libra tries on the whole closet · 2 Capricorn arrives early with a talking-points card · 3 Sagittarius forgot it
//   was today · 4 Aries hypes themselves in the mirror.  5 Pisces: cries in the car. Happy tears.  Hard cut.
import { makeWhich, phone, bubble, thought, label, glow, mirror, clock, card, floor, desk, mug, actionLines, sweat, sparkles, drawStarChar, signStar, speedStreaks, R, box, osc, saw, prog, clamp, lerp, ease, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

const SHIRT = ['#ff8fb1', '#7fd0ff', '#9fe6b0', '#f2c75c', '#c9a6ff', '#ff6b7f']
function shirt(x, cx, cy, col, rot = 0, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -34, -26, 68, 60); R(x, INK, -50, -26, 100, 26)
  R(x, col, -30, -22, 60, 52); R(x, col, -46, -22, 92, 18); R(x, 'rgba(27,18,54,0.2)', -6, -22, 12, 10)
  x.restore()
}

function p1(x, t, P) {   // Libra: the whole closet
  box(x, 300, 60, 160, 380, '#6b4a2f', { b: 6, hi: '#8a6440' }); R(x, '#3a2a1e', 316, 76, 128, 348)
  floor(x, '#3a2a52')
  // the pile grows
  for (let i = 0; i < 7; i++) shirt(x, 90 + (i * 53) % 260, 500 - Math.floor(i / 3) * 22, SHIRT[i % 6], (i - 3) * 0.3, 0.9)
  // a shirt flies every 0.4 s
  for (let k = 0; k < 2; k++) {
    const ph = saw(t + k * 0.2, 0.4), tt = ph
    shirt(x, lerp(300, 60 + k * 140, tt), 260 - 240 * tt + 360 * tt * tt, SHIRT[(Math.floor((t + k * 0.2) / 0.4) + k) % 6], tt * 6, 1)
  }
  P.star(x, t, { x: 200, y: 320, s: 180, mood: 'wide', look: [1, 0] })
  bubble(x, t, 210, 100, P.turn[0] + 0.35, Infinity, 'too much? too little?', { size: 25 })
}

function p2(x, t, P) {   // Capricorn: early, with talking points
  desk(x, 40, 420, 400, '#6b3a4a')
  mug(x, 380, 395, t)
  clock(x, 360, 90, '6:40', { col: MINT, s: 0.9 })
  P.star(x, t, { x: 150, y: 320, s: 180, mood: 'neutral', look: [1, 0.2] })
  card(x, 260, 300, 160, 140, '1. hobbies\n2. goals\n3. dogs?', { size: 22, rot: 0.06 + 0.02 * osc(t, 1) })
  bubble(x, t, 220, 200, P.turn[0] + 0.4, Infinity, 'early. on purpose.', { size: 26 })
}

function p3(x, t, P) {   // Sagittarius: forgot it was today
  floor(x)
  const on = P.u > 0.3
  P.star(x, t, { x: on ? 200 + 80 * Math.sin(t * 7) : 200, y: 330, s: 180, mood: on ? 'wide' : 'sleepy', look: [1, -0.3] })
  if (on) { sweat(x, t, 270, 230); speedStreaks(x, t, 0.6) }
  phone(x, 380, 300, { s: 1.05, rot: 0.15, glowA: on ? 0.4 : 0.1, screen: (x, w, h) => { R(x, PINK, 4, 20, w - 8, 44); x.font = `800 12px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('DATE', w / 2, 38); x.fillText('in 10 min', w / 2, 54) } })
  bubble(x, t, 220, 100, P.turn[0] + 0.35, Infinity, 'wait. TODAY?!', { size: 30 })
}

function p4(x, t, P) {   // Aries: mirror hype
  mirror(x, 350, 270, 170, 330)
  drawStarChar(x, 350, 300, 130, t, { color: signStar('aries').color, mood: 'sparkle', look: [-1, 0], glow: 0.3, seed: 8, alpha: 0.75 })
  floor(x)
  P.star(x, t, { x: 150, y: 330, s: 180, mood: 'sparkle', look: [1, 0], hops: [0.3, 0.8, 1.3].map(v => P.turn[0] + v) })
  actionLines(x, t, 150, 300, 110, 150, 8, GOLD, 0.6)
  bubble(x, t, 200, 100, P.turn[0] + 0.3, Infinity, "you're a CATCH.", { size: 28 })
}

const EP = makeWhich({
  id: 'kwoe05', hero: 0, flash: '#f2c75c', deep: '#c0587a',
  hook: '*First date* tonight. | How’s it going?',
  freeze: 'deep *breaths.*',
  panels: [
    { sign: 'libra', bg: 'bedroom', caption: 'tries on *the whole closet*', draw: p1, cues: [['whoosh', 0.1, 0.15, 0.02], ['whoosh', 0.5, 0.15, 0.02], ['whoosh', 0.9, 0.15, 0.02]] },
    { sign: 'capricorn', bg: 'cafe', caption: 'arrives early with *talking points*', draw: p2, cues: [['tick', 0.3, 0.05], ['pop', 0.45, 880, 0.03, 0]] },
    { sign: 'sagittarius', bg: 'night', caption: 'forgot it was *today*', draw: p3, cues: [['bell', 0.3, 1760, 0.03, 0.4, 0], ['whoosh', 0.5, 0.25, 0.03]] },
    { sign: 'aries', bg: 'party', caption: 'hypes themselves *in the mirror*', draw: p4, cues: [['clap', 0.3, { gain: 0.1 }], ['clap', 0.8, { gain: 0.1 }]] },
  ],
  pisces: 'cries in the car. *Happy tears.*',
  ending: 'cut',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [thought, label, glow, sparkles, prog, clamp, ease, BONE, GOLD, BLUE]
