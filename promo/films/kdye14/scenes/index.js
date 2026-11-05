// kdye14: DATE YOURSELF, "Wobble Proudly" (21 s vertical, star_advice post, chiptune · A). Row: promo/films/month2/m16.md.
// Feeling: the holidays when everyone else is coupled up. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.0   FRAME 0: ♎ Libra mid-slip on ice skates, ice spray flying. Whip at 0.12.
//             Hook "Libra, skate alone. | *Wobble proudly.*" Stamp at 1.3.
//   3.0–8.2   STOP 1 a rink full of pairs: couples loop past under string lights; Libra hugs the wall.
//   8.2–13.4  STOP 2 the wobble era: a small kid gives a thumbs up, "+1 BRAVERY"; Pisces cries at the thumbs up.
//  13.4–19.2  STOP 3 found the glide: Libra glides, then a cocoa by the rink.
//  19.4–end   last line "Wobbly counts. | You still *came.*", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, mug, shadow, glow, drawBits, speedLines,
  sparkles, hearts, bubble, label, pop01, outK, r3, SKYB, MINT,
} from '../../kdye01/props.js'

const D = 21.0
const S1 = [3.0, 8.2], S2 = [8.2, 13.4], S3 = [13.4, 19.2]
const LIB = '#ff9ac8'
function rink(x, t) {
  R(x, '#1c1840', 0, 0, 1080, 1920)
  // string lights
  for (let r = 0; r < 2; r++) for (let i = 0; i < 14; i++) { const lx = i * 80 + 20, ly = 560 + r * 70 + 26 * Math.sin(i * 0.8); x.save(); x.globalCompositeOperation = 'lighter'; glow(x, lx, ly, 40, ['255,120,120', '255,220,120', '120,220,255'][i % 3], 0.5 * (0.6 + 0.4 * Math.sin(t * 4 + i))); x.restore(); R(x, ['#ff7a7a', GOLD, SKYB][i % 3], lx - 6, ly - 6, 12, 12) }
  // the ice
  R(x, '#cfe8ff', 0, 1000, 1080, 920); for (let i = 0; i < 12; i++) R(x, 'rgba(255,255,255,0.6)', (i * 173) % 1000, 1060 + (i * 97) % 700, 120, 6)
  R(x, INK, 0, 990, 1080, 14); for (let i = 0; i < 1080; i += 60) R(x, '#e8504a', i, 940, 30, 50); R(x, INK, 0, 936, 1080, 6)
}
function skates(x, F, s = 1) { R(x, INK, F.ox - 70 * s, F.oy + 2, 50 * s, 10); R(x, INK, F.ox + 20 * s, F.oy + 2, 50 * s, 10); R(x, '#c9d8f0', F.ox - 70 * s, F.oy + 12, 50 * s, 4); R(x, '#c9d8f0', F.ox + 20 * s, F.oy + 12, 50 * s, 4) }
const THUMB = ['..TT..', '..TT..', 'TTTTTT', 'TTTTTT', 'TTTTT.', 'TTTT..']

function opener(x, t, S) {
  rink(x, t)
  for (let i = 0; i < 16; i++) { const tt = t + 0.3, a = -2.6 + i * 0.12; R(x, '#ffffff', 540 + Math.cos(a) * 700 * tt * 0.5, 1300 + Math.sin(a) * 600 * tt * 0.6 + 300 * tt * tt, 12, 12) }
  const F = S.hero(x, t, { x: 540, y: 1180, s: 290, mood: 'wide', look: [Math.sin(t * 6), -1], squash: 0.1 * Math.sin(t * 14) })
  x.save(); x.translate(540, 1300); x.rotate(0.25 * Math.sin(t * 6)); x.translate(-540, -1300); skates(x, F); x.restore()
  label(x, 'WHOA', 760, 1020, { size: 56, col: RED, font: INTER, weight: 800, rot: 0.15 })
  S.pis(x, t, { x: 930, y: 1500, s: 130, mood: 'wide', look: [-1, -0.6] }, 1)
}

function pairs(x, t, S) {
  const { u } = S
  rink(x, t)
  const P = [['leo', 'aries'], ['gemini', 'virgo'], ['taurus', 'cancer']]
  P.forEach(([a, b], i) => {
    const ang = t * 0.9 + i * 2.1, cx = 540 + Math.cos(ang) * 360, cy = 1180 + Math.sin(ang) * 90
    S.npc(x, t, { sign: a, x: cx - 50, y: cy, s: 110, mood: 'happy', look: [1, 0] }); S.npc(x, t, { sign: b, x: cx + 50, y: cy, s: 110, mood: 'happy', look: [-1, 0] })
  })
  const F = S.hero(x, t, { x: 140, y: 1060, s: 220, mood: u > 2.8 ? 'happy' : 'neutral', look: [1, 0.4], hops: [S.a + 2.8] })
  skates(x, F, 0.8)
}

function wobble(x, t, S) {
  const { u } = S
  rink(x, t)
  const wob = 0.25 * Math.sin(t * 7) * (1 - 0.6 * prog(u, 2.5, 4.5))
  x.save(); x.translate(460, 1400); x.rotate(wob); x.translate(-460, -1400)
  const F = S.hero(x, t, { x: 460, y: 1200, s: 260, mood: u > 2.0 ? 'sparkle' : 'wide', look: [0.6, -0.4] })
  skates(x, F)
  x.restore()
  S.npc(x, t, { sign: 'aries', x: 800, y: 1250, s: 110, mood: 'happy', look: [-1, -0.4], hops: [S.a + 1.6] })
  const tk = pop01(t, S.a + 1.6, 0.3, 2.4)
  if (tk > 0.01) drawBits(x, THUMB, { T: '#ffd0a0' }, 880, 1130, 9 * tk)
  const bk = pop01(t, S.a + 2.0, 0.3, 2.4)
  if (bk > 0.01) { x.save(); x.translate(540, 860); x.scale(bk, bk); box(x, -190, -46, 380, 92, INK, { b: 6 }); x.restore(); label(x, '+1 BRAVERY', 540, 862, { size: 42 * bk, col: GOLD }) }
  sparkles(x, t, 540, 860, S.a + 2.0, 10, 200, 1)
  S.pis(x, t, { x: 180, y: 1080, s: 140, mood: 'sparkle', look: [1, 0] }, 3)
}

function glide(x, t, S) {
  const { u } = S
  rink(x, t)
  const gx = u < 3.0 ? lerp(-100, 1180, ease.inOutQuad(prog(u, 0.2, 3.0))) : 430
  if (u < 3.0) speedLines(x, t, { a: 0.5, dir: 1, y0: 1080, y1: 1380, col: 'rgba(120,160,220,0.5)' })
  const F = S.hero(x, t, { x: gx, y: 1220, s: 250, mood: u > 3.0 ? 'heart' : 'sparkle', look: [u < 3 ? 1 : 0.4, 0], squash: u < 3 ? -0.05 : 0 })
  skates(x, F)
  if (u > 3.0) { mug(x, 600, 1260, { col: '#e8504a', steam: 1, t }); hearts(x, t, S.a + 3.0, 430, 1060, { n: 4 }) }
  S.pis(x, t, { x: 900, y: 1080, s: 140, mood: 'happy', look: [-1, 0] }, 2)
}

const EP = makeDate({
  id: 'kdye14', sign: 'libra', name: 'Libra', D, ending: 'cut',
  hook: 'Libra, skate alone. | *Wobble proudly.*', hookSize: 110, hookAccent: LIB,
  fx: [{ kind: 'whip', o: { at: 0.12, len: 0.45, from: 1.5 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'a rink full of *pairs*', draw: pairs, cues: [['pop', 2.8, 880, 0.03, -0.4]] },
    { a: S2[0], b: S2[1], sticker: 'the *wobble* era', draw: wobble,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['chip', 1.6, 1318.51, 0.12, { gain: 0.03 }], ['pop', 2.0, 1567.98, 0.05, 0], ['glitter', 2.0, 2.4]] },
    { a: S3[0], b: S3[1], sticker: 'found the *glide*', draw: glide,
      cues: [['whoosh', 0.2, 1.0, 0.05], ['pluck', 3.0, 1174.66, 0.04, 0.5, 0], ['pluck', 3.12, 1567.98, 0.035, 0.5, 0]] },
  ],
  lines: [
    { t: 3.6, who: 'hero', text: "everyone's here with *someone.*" },
    { t: 5.9, who: 'stars', text: "you're here with *you.* skate." },
    { t: 9.0, who: 'hero', text: "I'm going to *fall.*" },
    { t: 11.0, who: 'stars', text: 'then fall *bravely.*' },
    { t: 14.0, who: 'hero', text: "wait. I'm *gliding!*" },
    { t: 16.3, who: 'stars', text: 'cocoa for one. *earned.*' },
  ],
  boxes: [[3.4, 8.05, [0, 1]], [8.8, 13.25, [2, 3]], [13.8, 19.1, [4, 5]]],
  last: { t: 19.4, text: 'Wobbly counts. | You still *came.*', top: 300, size: 104, accent: LIB },
  cues: [['whoosh', 0.0, 0.4, 0.04]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, MONO, MINT, shadow, bubble, outK, r3, clamp]
