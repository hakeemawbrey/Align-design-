// kine07: IS THIS NORMAL?, "The ick, over a tiny thing" (19.2 s vertical, star_advice post, music: funk · Cm).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "One tiny thing. | Total *ick.* Normal?" landed; ♈ Aries mid-recoil on a park bench next to a
//              sweet ♊ Gemini crush, whose feet are in socks… with sandals.
//   0.60       record scratch + freeze, caught circle on the feet: "they wore *socks with sandals.*"
//   2.1–6.0    "Was cute. | Now I *can't.*"  The crush claps at the sunset (CLAP! CLAP!); an ICK counter ticks up.
//              ♓ Pisces on the next bench sobs: "the clapping was sweet!!"
//   6.15–9.9   NORMAL-O-METER: NORMAL.
//  10.0–17.4   THE STARS: "sometimes the ick is a real *no.*" → "sometimes it's nerves looking for an *exit.*"
//              A signpost: REAL NO ← → JUST NERVES. Aries looks one way, then the other, then at the crush.
//  17.5–19.2   last line: "Is it the socks, | or the *closeness?*"  Hard cut.
import {
  makeNormal, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, pop01, outK, prog, lerp, clamp, ease, r3, signStar,
} from '../../kine01/normalkit.js'

const D = 19.2, FLOOR = 1430
const T = {
  rec: 0.6, h0Out: [1.95, 2.1], h1: 2.1, h1Out: [5.85, 6.05], claps: [2.9, 3.25, 3.6], ick: [1.6, 3.0, 3.7], pisIn: 3.8,
  meter: 6.15, mOut: [9.75, 10.0],
  starsIn: 9.9, l1: 10.15, l2: 12.95, boxClose: 17.35, post: 10.8, lookL: 11.4, lookR: 13.4, lookC: 15.4,
  last: 17.5,
}
const REC = { at: T.rec, len: 1.3, caption: 'they wore *socks with sandals.*', top: 1640 }

function park(x, t) {
  room(x, { y: FLOOR, wall: '#2a1c48', floor: '#24402e' })
  // sunset glow + a tree
  glowAt(x, 540, 640, 520, '255,150,110', 0.22)
  box(x, 880, 640, 60, 300, '#6b4a2f', { b: 6 }); drawBits(x, ['.GGG.', 'GGGGG', 'GGGGG', '.GGG.'], { G: '#3f9a5f' }, 910, 580, 34)
}
function bench(x) {
  box(x, 90, 1200, 900, 40, '#8a6440', { b: 7, hi: '#a87a50' })
  box(x, 90, 1120, 900, 28, '#8a6440', { b: 7 })
  for (const lx of [130, 930]) R(x, INK, lx, 1240, 20, FLOOR - 1240)
}
function feet(x, cx, cy, s = 1) {
  // two little feet: white socks, brown sandal straps
  for (const d of [-1, 1]) {
    x.save(); x.translate(cx + d * 34 * s, cy); x.scale(s, s)
    box(x, -22, -60, 44, 70, BONE, { b: 5 }); R(x, '#d9d0c0', -22, -60, 44, 10)
    box(x, -28, 6, 60, 18, '#7a4a2a', { b: 4 }); R(x, '#7a4a2a', -22, -24, 44, 10); R(x, '#7a4a2a', -4, -40, 8, 30)
    x.restore()
  }
}
function signpost(x, t, k, look) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 1000); x.scale(k, k)
  R(x, INK, -12, -260, 24, 520); R(x, '#8a6440', -6, -256, 12, 512)
  const arrow = (dir, y, text, col, on) => {
    x.save(); x.translate(dir * 160, y); x.rotate(dir * 0.04)
    const w = 300
    x.fillStyle = INK; x.beginPath(); x.moveTo(-dir * w / 2 - dir * 8, -44); x.lineTo(dir * w / 2, -44); x.lineTo(dir * w / 2 + dir * 50, 0); x.lineTo(dir * w / 2, 44); x.lineTo(-dir * w / 2 - dir * 8, 44); x.fill()
    x.fillStyle = on ? col : BONE; x.beginPath(); x.moveTo(-dir * w / 2, -36); x.lineTo(dir * w / 2 - dir * 4, -36); x.lineTo(dir * w / 2 + dir * 38, 0); x.lineTo(dir * w / 2 - dir * 4, 36); x.lineTo(-dir * w / 2, 36); x.fill()
    x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, dir * 10, 2)
    x.restore()
  }
  arrow(-1, -170, 'REAL NO', '#ff8b9b', look === 'L')
  arrow(1, -60, 'JUST NERVES', MINT, look === 'R')
  x.restore()
}

const EP = makeNormal({
  id: 'kine07', D, ending: 'cut', hero: 'aries',
  hook: { text: 'One tiny thing. | Total *ick.* Normal?', out: T.h0Out, accentColor: '#ff8b9b' },
  rec: REC,
  catch: { at: T.rec + 0.12, x: 760, y: 1330, r: 150, out: [T.rec + 1.15, T.rec + 1.3], label: null, arrow: null },
  heads: [{ text: 'Was cute. | Now I *can’t.*', at: T.h1, out: T.h1Out, size: 100, accent: '#ff8b9b', late: 1, lateAt: T.h1 + 0.45 }],
  meter: { at: T.meter, land: 'normal', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: 'sometimes the ick is a real *no.*' },
    { t: T.l2, text: "sometimes it's nerves looking for an *exit.*" },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Is it the socks, | or the *closeness?*', at: T.last, lateAt: T.last + 0.55, accent: GOLD, size: 94 },
  punches: [T.h1, ...T.claps, T.meter + 1.75],
  shakes: [{ t: 0, a: 14 }, ...T.claps.map(c => ({ t: c, a: 8 }))],
  scene(x, t, S) {
    const crush = S.sign('gemini')
    if (t < T.meter) {
      park(x, t)
      bench(x)
      // the crush: sweet, clapping at the sunset
      const clapping = t > T.claps[0] - 0.1 && t < T.claps[2] + 0.4
      crush(x, t, { x: 760, y: 1080, s: 320, mood: 'happy', look: [0, -0.6], hops: [0.3, ...T.claps], seed: 7 })
      feet(x, 760, 1340, 1.2)
      T.claps.forEach((c, i) => { const k = pop01(t, c, 0.18, 3) * outK(t, [c + 0.4, c + 0.55]); if (k > 0.01) label(x, 'CLAP!', [640, 900, 770][i], [820, 800, 720][i], { size: 44 * k, col: GOLD, font: INTER, weight: 800, rot: [-0.2, 0.18, -0.06][i] }) })
      void clapping
      // Aries: mid-recoil (leaning away, squashed) at frame 0
      const rec = Math.exp(-Math.max(0, t) * 3)
      x.save(); x.translate(300, 1180); x.rotate(-0.25 * rec - 0.05); x.translate(-300, -1180)
      S.hero(x, t, { x: 290, y: 1080, s: 330, mood: t < 2.1 || (t > T.claps[0] && t < T.claps[2] + 0.5) ? 'wide' : 'squint', look: [1, 0.6], squash: 0.12 * rec, hops: [T.claps[0] + 0.1, T.claps[2] + 0.1] })
      x.restore()
      // the ICK counter
      const n = T.ick.filter(v => t >= v).length
      if (t > T.ick[0] - 0.05) {
        const k = pop01(t, T.ick[0], 0.3, 2.4) * outK(t, [T.meter - 0.2, T.meter])
        x.save(); x.translate(270, 760); x.scale(k, k); x.rotate(-0.05)
        box(x, -120, -46, 240, 92, RED, { b: 6 }); x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText(`ICK ×${n}`, 0, 2); x.restore()
      }
      S.pis(x, t, { x: 900, y: 1630, s: 210, pop: pop01(t, T.pisIn, 0.35, 2.2), tears: 3, mood: 'sparkle', look: [-1, -0.6], tissues: 'left', say: [T.pisIn + 0.3, T.meter - 0.2, 'the clapping was sweet!!'], sayDx: -170, saySize: 32 })
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      park(x, t)
      const look = t > T.lookC ? 'C' : t > T.lookR ? 'R' : t > T.lookL ? 'L' : null
      signpost(x, t, pop01(t, T.post, 0.35, 2.2), look)
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      shadow(x, 330, FLOOR - 20, 280 * k)
      S.hero(x, t, { x: 330, y: 1230, s: 300, pop: k, mood: look === 'C' ? 'sparkle' : 'neutral', look: look === 'L' ? [-1, -0.6] : look === 'R' ? [1, -0.6] : look === 'C' ? [1, 0] : [0, -1], hops: [T.mOut[0] + 0.2, T.lookL, T.lookR, T.lookC] })
      crush(x, t, { x: 800, y: 1250, s: 260, pop: pop01(t, T.lookC - 0.3, 0.35, 2.2), mood: 'happy', look: [-1, 0], seed: 7, hops: [T.lookC] })
      if (t > T.lookC) { feet(x, 800, 1390, 0.9); hearts(x, t, T.lookC + 0.3, 560, 1080, { n: 4 }) }
      S.pis(x, t, { x: 130, y: 1300, s: 150, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.lookC ? 3 : 2, mood: t > T.lookC ? 'happy' : 'wide', look: [1, -0.4], hops: [T.lookC + 0.2, T.last + 0.5] })
      S.stars(x, t, { x: 930, y: 640, s: 140, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.lookC ? 'happy' : 'neutral', look: [-1, 0.3] })
    }
  },
  cues: [
    ...T.claps.map((c, i) => ['clap', c, { gain: 0.14, pan: [-0.3, 0.3, 0][i] }]),
    ...T.ick.slice(1).map((c, i) => ['pop', r3(c + 0.05), [659.25, 587.33][i], 0.045, -0.3]),
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['pluck', T.pisIn + 0.35, 1174.66, 0.03, 0.4, 0.4],
    ['whoosh', T.post - 0.05, 0.3, 0.04], ['tom', T.post + 0.2, 120, { gain: 0.16, decay: 0.2 }],
    ['pop', T.lookL, 659.25, 0.04, -0.5], ['pop', T.lookR, 987.77, 0.04, 0.5], ['pluck', T.lookC, 1318.51, 0.04, 0.5, 0], ['glitter', T.lookC + 0.3, T.lookC + 0.7],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, CYAN, MONO, sparkles, bubble, clamp, lerp, signStar]
