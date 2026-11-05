// kdye05: DATE YOURSELF, "Nobody Else Gets a Vote" (21.6 s vertical, star_advice post, pop · G). Row: promo/films/month2/m16.md.
// Feeling: always choosing what other people want. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.0   FRAME 0: ♎ Libra mid-spin between two signposts, arrows whirling. Whip at 0.15. Hook "Libra, nobody else |
//             gets a *vote.*" Stamp at 1.3.
//   3.0–8.4   STOP 1 the menu of ten options: everyone's opinions pop in as bubbles; Libra's eyes go round and round.
//   8.4–13.6  STOP 2 mute the committee: each bubble gets a red line, "VOTES: 1 (you)".
//  13.6–19.6  STOP 3 the seat you like: the window seat, the pink one; Pisces cries because Libra looks so happy.
//  19.9–end   last line "What do *you* want? | Start there.", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, table, plate, mug, windowFrame, shadow, glow, drawBits, sun,
  sparkles, hearts, bubble, label, plateText, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 21.6
const S1 = [3.0, 8.4], S2 = [8.4, 13.6], S3 = [13.6, 19.7]
const LIB = '#ff9ac8'
const OPS = [
  { text: "get what I'd get!", x: 300, y: 620 }, { text: 'the safe one?', x: 780, y: 700 },
  { text: 'split something?', x: 270, y: 830 }, { text: "whatever's quickest", x: 760, y: 920 },
]

function signpost(x, cx, base, a, txt1, txt2) {
  R(x, INK, cx - 10, base - 560, 20, 560); R(x, '#8a5a3a', cx - 5, base - 560, 10, 560)
  for (const [i, txt] of [[0, txt1], [1, txt2]]) {
    x.save(); x.translate(cx, base - 500 + i * 110); x.rotate(a * (i ? -1 : 1))
    box(x, -150, -34, 300, 68, i ? '#7fd0ff' : GOLD, { b: 6 }); R(x, INK, i ? -186 : 150, -30, 36, 60)
    x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
    x.restore()
  }
}
function cafe(x) {
  room(x, { wall: '#3a5a7a', wall2: '#35536f', floor: '#4a3a5a', floorY: 1280, stripes: true })
}
function menuBoard(x) {
  box(x, 240, 330, 600, 200, '#1c2a24', { b: 10 })
  x.font = `700 28px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'left'
  const items = ['1 MINT  2 CLOUD  3 PINK', '4 PLAIN 5 SPICE  6 SALT', '7 BERRY 8 ROSE   9 OAT', '10 SURPRISE ME']
  items.forEach((s, i) => x.fillText(s, 270, 378 + i * 42))
}

function opener(x, t, S) {
  room(x, { wall: '#4a3a6a', wall2: '#43355f', floor: '#2a2040', floorY: 1300, stripes: false })
  const sw = 0.25 * Math.sin(t * 9)
  signpost(x, 230, 1320, sw, 'THEIR PICK', 'THEIR MOOD')
  signpost(x, 850, 1320, -sw, 'THE SAFE ONE', 'WHATEVER')
  // whirl lines around the spinning Libra
  for (let i = 0; i < 8; i++) { const a = t * 8 + i * Math.PI / 4; R(x, 'rgba(239,230,214,0.5)', 540 + Math.cos(a) * 230 - 20, 1000 + Math.sin(a) * 120, 40, 8) }
  shadow(x, 540, 1300, 260)
  S.hero(x, t, { x: 540, y: 1080, s: 280, mood: 'wide', look: [Math.cos(t * 9), Math.sin(t * 9) * 0.6], squash: 0.08 * Math.sin(t * 18) })
  S.pis(x, t, { x: 930, y: 1500, s: 130, mood: 'wide', look: [-1, -0.6] }, 1)
}

function menuStop(x, t, S) {
  const { u } = S
  cafe(x); menuBoard(x)
  box(x, 120, 1120, 840, 170, '#8a5a3a', { b: 7, hi: '#a87650' })
  S.npc(x, t, { sign: 'taurus', x: 840, y: 1010, s: 150, mood: 'happy', look: [-1, 0] })
  S.hero(x, t, { x: 380, y: 1020, s: 260, mood: u > 0.8 ? 'wide' : 'neutral', look: u > 0.8 ? [Math.cos(t * 6), Math.sin(t * 6)] : [0.4, -1] })
  OPS.forEach((o, i) => bubble(x, t, o.x, o.y, S.a + 0.6 + i * 0.45, S.b + 0.1, o.text, { size: 30, col: ['#ffe08a', '#c9ecfb', '#c9f2d4', '#ffd0e4'][i], tail: o.x < 540 ? 0.4 : -0.4 }))
  if (u > 2.6) label(x, '???', 380, 760, { size: 60, col: GOLD, font: INTER, weight: 800, rot: 0.1 * Math.sin(t * 6) })
}

function mute(x, t, S) {
  const { u } = S
  cafe(x)
  box(x, 120, 1120, 840, 170, '#8a5a3a', { b: 7, hi: '#a87650' })
  OPS.forEach((o, i) => {
    const ct = S.a + 0.4 + i * 0.5, gone = S.a + 3.4
    bubble(x, t, o.x, o.y, S.a - 1, gone + 0.3, o.text, { size: 30, col: ['#ffe08a', '#c9ecfb', '#c9f2d4', '#ffd0e4'][i], tail: 0 })
    const c = ease.outCubic(prog(t, ct, ct + 0.2)) * outK(t, [gone, gone + 0.3])
    if (c > 0) { x.save(); x.translate(o.x, o.y); x.rotate(-0.08); R(x, RED, -170, -8, 340 * c, 16); x.restore() }
  })
  const vk = pop01(t, S.a + 3.4, 0.3, 2.4)
  if (vk > 0.01) { x.save(); x.translate(540, 470); x.scale(vk, vk); x.rotate(-0.04); box(x, -250, -50, 500, 100, INK, { b: 6 }); x.restore(); label(x, 'VOTES: 1 (you)', 540, 472, { size: 44 * vk, col: GOLD }) }
  sparkles(x, t, 540, 470, S.a + 3.4, 10, 220, 1)
  S.hero(x, t, { x: 380, y: 1020, s: 260, mood: u > 3.4 ? 'sparkle' : 'squint', look: [0.4, -1], hops: [S.a + 3.45] })
  S.npc(x, t, { sign: 'taurus', x: 840, y: 1010, s: 150, mood: 'happy', look: [-1, 0] })
}

function windowSeat(x, t, S) {
  const { u } = S
  cafe(x)
  windowFrame(x, { x: 140, y: 600, w: 800, h: 420, sky: 'day' })
  x.save(); x.beginPath(); x.rect(140, 600, 800, 420); x.clip(); sun(x, 760, 700, 60, 1); x.restore()
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 980, 520, '255,240,200', 0.25); x.restore()
  table(x, 540, 1260, 420)
  // the pink one
  x.save(); x.translate(620, 1260)
  box(x, -40, -150, 80, 150, '#ffd0e4', { b: 5 }); R(x, LIB, -34, -110, 68, 104); R(x, BONE, -34, -150, 68, 20); R(x, INK, 10, -210, 8, 70)
  x.restore()
  S.hero(x, t, { x: 420, y: 1120, s: 260, mood: u < 2.5 ? 'happy' : 'heart', look: [0.6, 0.3], hops: [S.a + 0.4, S.a + 2.5] })
  hearts(x, t, S.a + 2.5, 420, 960, { n: 5 })
  S.npc(x, t, { sign: 'taurus', x: 940, y: 1470, s: 120, mood: 'happy', look: [-1, -0.5] })
  S.pis(x, t, { x: 170, y: 1150, s: 130, mood: 'happy', look: [1, -0.8] }, 3)
  bubble(x, t, 230, 990, S.a + 1.0, S.a + 4.0, 'look how HAPPY', { size: 26, col: '#c9ecfb', tail: -0.3 })
}

const EP = makeDate({
  id: 'kdye05', sign: 'libra', name: 'Libra', D, ending: 'cut',
  hook: 'Libra, nobody else | gets a *vote.*', hookSize: 112, hookAccent: LIB,
  fx: [{ kind: 'whip', o: { at: 0.15, len: 0.45, from: 1.5 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'the menu of *ten options*', draw: menuStop,
      cues: OPS.map((o, i) => ['pop', r3(0.6 + i * 0.45), [880, 987.77, 1174.66, 1318.51][i], 0.04, i % 2 ? 0.4 : -0.4]) },
    { a: S2[0], b: S2[1], sticker: '*mute* the committee', draw: mute,
      cues: [['whoosh', 0.02, 0.4, 0.035], ...OPS.map((o, i) => ['tick', r3(0.4 + i * 0.5), 0.06]), ['pop', 3.4, 1318.51, 0.05, 0], ['glitter', 3.4, 3.8]] },
    { a: S3[0], b: S3[1], sticker: 'the seat *you* like', draw: windowSeat,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pluck', 2.5, 1174.66, 0.04, 0.5, 0], ['pluck', 2.62, 1567.98, 0.035, 0.5, 0], ['pop', 1.0, 880, 0.03, -0.4]] },
  ],
  lines: [
    { t: 3.6, who: 'hero', text: 'what would *they* want?' },
    { t: 5.9, who: 'stars', text: "they're not *here.* you are." },
    { t: 9.0, who: 'stars', text: 'one voter today: *you.*' },
    { t: 11.3, who: 'hero', text: 'then… the *pink* one.' },
    { t: 14.2, who: 'stars', text: 'and the seat by the *window?*' },
    { t: 16.6, who: 'hero', text: 'the seat by the *window.*' },
  ],
  boxes: [[3.4, 8.25, [0, 1]], [8.8, 13.45, [2, 3]], [14.0, 19.5, [4, 5]]],
  last: { t: 19.9, text: 'What do *you* want? | Start there.', top: 300, size: 100, accent: LIB },
  cues: [],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, plate, mug, plateText, drawBits, lerp, clamp]
