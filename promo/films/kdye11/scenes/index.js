// kdye11: DATE YOURSELF, "The Class Alone" (21 s vertical, star_advice post, lofi · Eb). Row: promo/films/month2/m16.md.
// Feeling: not wanting to try new things without a friend. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.2   FRAME 0: ♒ Aquarius mid-yelp, a lump of clay flying off a spinning pottery wheel. Record scratch + freeze at 0.35.
//             Hook "Aquarius, take the | *class alone.*" Stamp at 1.8.
//   3.2–8.4   STOP 1 everyone's in pairs: pairs at every wheel, Aquarius alone (and fine).
//   8.4–13.6  STOP 2 the wobbly bowl: it leans. "WOBBLE: YES".
//  13.6–19.2  STOP 3 proud of it anyway: the bowl on the shelf, tagged MINE; Pisces (the teacher) cries at it.
//  19.4–end   last line "Wonky, weird and | *fully yours.*", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, shadow, glow, drawBits, plateText,
  sparkles, hearts, bubble, label, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 21.0
const S1 = [3.2, 8.4], S2 = [8.4, 13.6], S3 = [13.6, 19.2]
const AQU = '#7fd8ff'
const CLAY = '#c8805a', CLAY_D = '#a8603a'

function wheel(x, cx, base, t, w = 220) {
  box(x, cx - w / 2, base - 70, w, 70, '#8c86a8', { b: 6 })
  const sp = t * 12
  box(x, cx - w * 0.4, base - 96, w * 0.8, 26, '#d8d0e8', { b: 5 })
  for (let i = 0; i < 4; i++) R(x, INK, cx - w * 0.4 + ((sp * 20 + i * w * 0.2) % (w * 0.8)), base - 92, 8, 18)
}
function bowl(x, cx, base, wob, s = 1, t = 0) {
  x.save(); x.translate(cx, base); x.scale(s, s)
  const lean = wob * 0.25 * Math.sin(t * 3)
  x.rotate(lean)
  const rows = 6
  for (let j = 0; j < rows; j++) {
    const w = 90 + j * 18 + wob * 14 * Math.sin(j * 1.7 + t * 2)
    R(x, INK, -w / 2 - 6 + wob * j * 3, -j * 22 - 28, w + 12, 28)
    R(x, j % 2 ? CLAY : CLAY_D, -w / 2 + wob * j * 3, -j * 22 - 22, w, 22)
  }
  x.restore()
}
function studio(x) { room(x, { wall: '#5a6a5a', wall2: '#536353', floor: '#3a3a4a', floorY: 1300, win: { x: 740, y: 600, w: 240, h: 220, sky: 'day' } }) }

function opener(x, t, S) {
  studio(x)
  wheel(x, 540, 1300, t, 300)
  // the clay lump mid-flight + splats
  const tt = t + 0.3
  drawBits(x, ['.CCC.', 'CCCCC', 'CCCCC', '.CCC.'], { C: CLAY }, 540 + 600 * tt, 1100 - 700 * tt + 900 * tt * tt, 22, { rot: tt * 6 })
  for (let i = 0; i < 5; i++) R(x, CLAY_D, 300 + i * 120, 1240 - (i % 2) * 30, 26, 18)
  S.hero(x, t, { x: 400, y: 1050, s: 280, mood: 'wide', look: [1, -0.8], squash: -0.1 })
  S.pis(x, t, { x: 930, y: 1480, s: 130, mood: 'wide', look: [-1, -0.6] }, 1)
}

function pairs(x, t, S) {
  const { u } = S
  studio(x)
  const P = [['leo', 'libra', 230, 1000], ['gemini', 'aries', 820, 1000]]
  for (const [a, b, cx, y] of P) { wheel(x, cx, y + 190, t, 220); S.npc(x, t, { sign: a, x: cx - 80, y, s: 130, mood: 'happy', look: [1, 0] }); S.npc(x, t, { sign: b, x: cx + 80, y, s: 130, mood: 'happy', look: [-1, 0] }); hearts(x, t, S.a + 0.6, cx, y - 100, { n: 2 }) }
  wheel(x, 540, 1360, t, 260)
  S.hero(x, t, { x: 540, y: 1180, s: 230, mood: u > 2.8 ? 'happy' : 'neutral', look: u > 2.8 ? [0, 0] : [Math.sin(t * 2), -0.3], hops: [S.a + 2.8] })
  plateText(x, 'PARTY OF 1 · ALSO FINE', 540, 820, { size: 30, bg: INK, col: GOLD, alpha: clamp(prog(u, 2.8, 3.1)) })
}

function wobbly(x, t, S) {
  const { u } = S
  studio(x)
  wheel(x, 540, 1300, t, 420)
  const wob = clamp(prog(u, 0.6, 2.4))
  bowl(x, 540, 1200, wob, 1.5, t)
  S.hero(x, t, { x: 270, y: 1020, s: 230, mood: u > 2.2 && u < 3.0 ? 'wide' : 'squint', look: [1, 0.8] })
  const k = pop01(t, S.a + 2.6, 0.3, 2.4)
  if (k > 0.01) { x.save(); x.translate(780, 760); x.rotate(0.06); x.scale(k, k); box(x, -180, -46, 360, 92, INK, { b: 6 }); x.restore(); label(x, 'WOBBLE: YES', 780, 762, { size: 40 * k, col: GOLD }) }
}

function proud(x, t, S) {
  const { u } = S
  studio(x)
  // the shelf
  box(x, 160, 960, 760, 30, '#8a5a3a', { b: 6 })
  for (let i = 0; i < 2; i++) { box(x, 220 + i * 520, 860, 90, 100, ['#c9a6ff', '#7fd0ff'][i], { b: 5 }) }
  bowl(x, 540, 960, 0.6, 1.0, 0)
  const tg = pop01(t, S.a + 0.8, 0.3, 2.2)
  if (tg > 0.01) plateText(x, 'MINE', 540, 1020, { size: 30 * tg, bg: INK, col: GOLD })
  drawBits(x, ['..G..', '.GGG.', 'GGGGG', '.G.G.'], { G: GOLD }, 640, 800, 10 * pop01(t, S.a + 2.2, 0.3, 2.4))
  sparkles(x, t, 640, 800, S.a + 2.2, 10, 120, 1)
  S.hero(x, t, { x: 330, y: 1220, s: 240, mood: u > 0.8 ? 'sparkle' : 'happy', look: [0.6, -1], hops: [S.a + 0.8] })
  S.pis(x, t, { x: 780, y: 1220, s: 180, mood: 'sparkle', look: [-0.6, -1] }, 3)
  // Pisces' teacher apron
  bubble(x, t, 780, 1040, S.a + 1.4, S.b - 0.2, "it's PERFECT", { size: 30, col: '#c9ecfb' })
}

const EP = makeDate({
  id: 'kdye11', sign: 'aquarius', name: 'Aquarius', D, ending: 'cut',
  hook: 'Aquarius, take the | *class alone.*', hookSize: 112, hookAccent: AQU,
  stampAt: 1.8,
  fx: [{ kind: 'scratch', o: { at: 0.35, len: 1.1, caption: 'yep. that *was* the bowl.', top: 1580 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: "everyone's in *pairs*", draw: pairs,
      cues: [['pop', 2.8, 987.77, 0.04, 0], ['pop', 2.9, 1318.51, 0.03, 0]] },
    { a: S2[0], b: S2[1], sticker: 'the *wobbly* bowl', draw: wobbly,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['riser', 0.6, 2.4, 0.015], ['pop', 2.6, 659.25, 0.045, 0.3]] },
    { a: S3[0], b: S3[1], sticker: 'proud of it *anyway*', draw: proud,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pop', 0.8, 1174.66, 0.045, 0], ['bell', 2.2, 1760, 0.03, 1.0, 0.2], ['glitter', 2.2, 2.6], ['pop', 1.4, 880, 0.03, 0.4]] },
  ],
  lines: [
    { t: 3.8, who: 'hero', text: 'everyone brought a *friend.*' },
    { t: 6.1, who: 'stars', text: 'you brought *you.* top partner.' },
    { t: 9.0, who: 'hero', text: "it's… *leaning?*" },
    { t: 11.2, who: 'stars', text: "that's called *character.*" },
    { t: 14.2, who: 'hero', text: 'I made a *thing!*' },
    { t: 16.4, who: 'stars', text: 'and nobody helped. *iconic.*' },
  ],
  boxes: [[3.6, 8.25, [0, 1]], [8.8, 13.45, [2, 3]], [14.0, 19.1, [4, 5]]],
  last: { t: 19.4, text: 'Wonky, weird and | *fully yours.*', top: 300, size: 100, accent: AQU },
  cues: [['boom', 0.0, 0.15]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, MONO, INTER, shadow, glow, outK, r3, lerp, ease]
