// kine15: IS THIS NORMAL?, "Single at the holiday dinner" (18.4 s vertical, star_advice post, music: jazzy · F).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Loop ending (back into frame 0).
//   0.00       frame 0: "Single at the | holiday table *again.*" landed; ♐ Sagittarius mid-dodge of a flying bread roll at a
//              long holiday table; a relative's bubble: "SO, ANYONE SPECIAL?"
//   0.60       whip zoom.
//   1.9–5.8    "Couple. Couple. | Couple. *Me.*"  The camera pans the table: pairs in paper crowns, then Sag alone.
//              Record scratch + freeze at 3.4: "every. single. *year.*" ♓ Pisces (the cousin) is already crying.
//   5.95–9.7   NORMAL-O-METER: SO NORMAL.
//   9.8–16.2   THE STARS: "you're allowed a *ready,* kind answer." → "'just me, and I'm good. how's your *garden?*'"
//              Sag says it, smiling. The relative lights up and shows garden photos (giant tomatoes). Pisces sobs at
//              the tomatoes.
//  16.3–18.4   last line: "Just me, and I’m good. | Pass the *rolls.*"  Then the loop back into frame 0.
import {
  makeNormal, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, miniPhone, pop01, outK, prog, lerp, clamp, ease, r3, drawStarChar,
} from '../../kine01/normalkit.js'

const D = 18.4, FLOOR = 1480
const T = {
  whip: 0.6, h0Out: [1.75, 1.9], h1: 1.9, h1Out: [5.6, 5.8], pan: [2.0, 3.3], rec: 3.4, pisIn: 2.2,
  meter: 5.95, mOut: [9.55, 9.8],
  starsIn: 9.7, l1: 9.95, l2: 12.85, boxClose: 16.2, say: 13.2, garden: 14.4, sob: 15.1,
  last: 16.3,
}
const REC = { at: T.rec, len: 1.25, caption: 'every. single. *year.*', top: 1660 }
const AUNT = '#e9b24a'
const COUPLES = [['#f0603a', '#7fd0f0'], ['#9fe6b0', '#ff8fb1'], ['#c9a6ff', '#e9b24a']]

function hall(x, t) {
  room(x, { y: FLOOR, wall: '#2a1838', floor: '#3a2646' })
  // garland
  for (let i = 0; i < 14; i++) { const gx = i * 80 + 20, gy = 470 + 24 * Math.sin(i * 1.1); R(x, '#3f9a5f', gx, gy, 70, 16); if (i % 2) R(x, RED, gx + 30, gy + 14, 14, 14) }
}
function table(x, x0, x1, y) { box(x, x0, y, x1 - x0, 34, BONE, { b: 8 }); R(x, '#c43a4a', x0, y + 34, x1 - x0, 50) }
function crown(x, cx, cy, s, col = GOLD) { x.save(); x.translate(cx, cy); x.scale(s, s); drawBits(x, ['C.C.C', 'CCCCC', 'CCCCC'], { C: col }, 0, 0, 7); x.restore() }
function roll(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); drawBits(x, ['.BBBB.', 'BBLBBB', 'BBBBLB', '.BBBB.'], { B: '#d99a52', L: '#f2c78a' }, 0, 0, 10); x.restore() }

const EP = makeNormal({
  id: 'kine15', D, ending: 'loop', hero: 'sagittarius',
  hook: { text: 'Single at the | holiday table *again.*', out: T.h0Out, accentColor: '#9fe6b0' },
  whips: [{ at: T.whip, len: 0.45, from: 1.6, cx: 540, cy: 1000 }, { at: T.pan[0], len: 0.4, from: 1.35, cx: 540, cy: 1000 }],
  rec: REC,
  heads: [{ text: 'Couple. Couple. | Couple. *Me.*', at: T.h1, out: T.h1Out, size: 100, accent: '#9fe6b0', gap: 0.32 }],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: "you're allowed a *ready,* kind answer." },
    { t: T.l2, text: "'just me, and I'm good. how's your *garden?*'" },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Just me, and I’m good. | Pass the *rolls.*', at: T.last, lateAt: T.last + 0.6, accent: GOLD, size: 92 },
  punches: [T.meter + 1.75, T.say, T.garden],
  shakes: [{ t: 0, a: 12 }],
  scene(x, t, S) {
    if (t < T.meter) {
      hall(x, t)
      // the camera pans along the table: world x offset
      const pan = ease.inOutCubic(prog(t, ...T.pan)) * 1500
      x.save(); x.translate(-pan, 0)
      table(x, -100, 2700, 1250)
      // the couples (behind the table)
      COUPLES.forEach(([a, b], i) => {
        const cx = 1000 + i * 290
        drawStarChar(x, cx - 70, 1120, 200, t, { color: a, mood: 'happy', look: [1, 0], seed: 10 + i, glow: 0.6 }); crown(x, cx - 70, 1010, 1)
        drawStarChar(x, cx + 70, 1120, 200, t, { color: b, mood: 'happy', look: [-1, 0], seed: 20 + i, glow: 0.6 }); crown(x, cx + 70, 1010, 1, PINK)
        drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5c8a' }, cx, 960 + 8 * Math.sin(t * 3 + i), 6)
      })
      // Sag at the end of the table (and at frame 0, at the near end: mid-dodge)
      const sagX = t < T.pan[0] ? 380 : 1880
      const dodge = Math.exp(-Math.max(0, t) * 3)
      x.save(); x.translate(sagX, 1150); x.rotate(-0.3 * dodge); x.translate(-sagX, -1150)
      S.hero(x, t, { x: sagX, y: 1100 + 30 * dodge, s: 300, mood: t < 1.5 || t > T.rec ? 'wide' : 'neutral', look: [1, -0.4], squash: 0.1 * dodge, hops: [T.pan[1]] })
      crown(x, sagX, 960 + 30 * dodge, 1.2, '#9fe6b0')
      x.restore()
      // the flying bread roll (mid-flight at frame 0)
      const rp = clamp((t + 0.4) / 1.0)
      if (rp < 1) roll(x, lerp(820, 120, rp), lerp(900, 980, rp) - 160 * Math.sin(Math.PI * rp), rp * 8)
      // the relative at the far end (frame 0: right edge)
      drawStarChar(x, 860, 1110, 240, t, { color: AUNT, mood: 'sparkle', look: [-1, 0], seed: 9, glow: 0.7 })
      crown(x, 860, 990, 1.1, RED)
      x.restore()
      if (t < T.pan[0]) bubble(x, t, 700, 790, -1, T.pan[0], 'SO, ANYONE SPECIAL?', { size: 38, tail: 0.5 })
      if (t > T.rec) bubble(x, t, 600, 790, T.rec - 0.3, T.meter - 0.15, 'SO, ANYONE SPECIAL?', { size: 38, tail: 0.5 })
      // Pisces, the cousin, near the camera
      S.pis(x, t, { x: 930, y: 1640, s: 190, pop: pop01(t, T.pisIn, 0.35, 2.2), tears: 3, mood: 'wide', look: [-1, -0.6], tissues: 'left' })
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'sparkle' : 'wide', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      hall(x, t)
      table(x, -20, 1100, 1250)
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      S.hero(x, t, { x: 260, y: 1110, s: 300, pop: k, mood: t > T.say ? 'happy' : 'neutral', look: [1, -0.2], hops: [T.mOut[0] + 0.2, T.say, T.garden] })
      crown(x, 260, 970, 1.2 * k, '#9fe6b0')
      drawStarChar(x, 760, 1110, 280, t, { color: AUNT, mood: t > T.garden ? 'sparkle' : 'happy', look: [-1, 0], seed: 9, glow: 0.7, pop: k, hops: [T.garden] })
      crown(x, 760, 970, 1.2 * k, RED)
      bubble(x, t, 300, 720, T.say, T.garden + 0.3, "just me, and I'm good!", { size: 34, tail: -0.4 })
      bubble(x, t, 720, 870, T.say + 0.6, T.garden + 0.3, 'how’s your garden?', { size: 34, tail: -0.6 })
      // garden photos on the relative's phone
      const gk = pop01(t, T.garden, 0.35, 2.4)
      if (gk > 0.01) {
        x.save(); x.translate(560, 780); x.scale(gk, gk); x.rotate(-0.05)
        box(x, -170, -210, 340, 420, '#2a2148', { b: 8 }); R(x, '#5fd38a', -150, -190, 300, 300)
        for (let i = 0; i < 4; i++) drawBits(x, ['.G.', 'RRR', 'RRR', '.R.'], { G: '#2f9d5a', R: RED }, -80 + (i % 2) * 160, -110 + Math.floor(i / 2) * 140, 18 + (i === 3 ? 8 : 0))
        x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('the BIG one!!', 0, 160)
        x.restore()
      }
      S.pis(x, t, { x: 960, y: 1130, s: 170, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.sob ? 3 : 2, mood: t > T.sob ? 'sparkle' : 'wide', look: [-1, -0.6], hops: [T.sob, T.last + 0.5], say: [T.sob, D, 'the TOMATOES'], sayDx: -60, saySize: 28 })
      S.stars(x, t, { x: 140, y: 640, s: 120, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.say ? 'happy' : 'neutral', look: [1, 0.4] })
      if (t > T.garden) sparkles(x, t, 560, 780, T.garden, 10, 220, 1, [GOLD, BONE, '#5fd38a'])
    }
  },
  cues: [
    ['whoosh', 0.0, 0.3, 0.05], ['tick', 0.6, 0.06],
    ['whoosh', T.pan[0], 1.2, 0.03], ...[0, 1, 2].map(i => ['pop', r3(T.h1 + 0.1 + i * 0.32), 880, 0.035, 0.3]), ['pop', T.pan[1], 523.25, 0.05, 0],
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['pluck', T.pisIn + 0.45, 1174.66, 0.03, 0.4, 0.4],
    ['pop', T.say, 1318.51, 0.045, -0.3], ['pop', T.say + 0.6, 1174.66, 0.04, 0.2],
    ['whoosh', T.garden - 0.05, 0.3, 0.04], ['pluck', T.garden + 0.2, 1567.98, 0.04, 0.6, 0], ['glitter', T.garden, T.garden + 0.4],
    ['pluck', T.sob, 1174.66, 0.035, 0.4, 0.4], ['pluck', T.sob + 0.2, 987.77, 0.035, 0.4, 0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, CYAN, MONO, hearts, label, shadow, glowAt, miniPhone]
