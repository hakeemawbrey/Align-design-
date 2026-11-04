// nhse12: HOLIDAY SURVIVAL GUIDE No. 12, "Matching Sweaters." (28 s vertical, Next 30 · b29, music: pop · Ab)
// The series look lives in ../../nhse01/survkit.js.
//   0.0–6.6    "They bought | *matching sweaters.*"  ♌ Leo holds up two giant identical sweaters; ♍ Virgo freezes
//              mid-sip. Pisces sniffles (it's moved already).
//   6.6–13.9   "Photo plan: | pose, *pose,* pose."  Leo's storyboard pops up frame by frame; Virgo's polite smile starts
//              to twitch. ♌: "twelve poses. minimum. it'll be iconic!"
//   13.9       hard cut into the tip.
//   13.9–21.6  "Meet in | the *middle.*"  THE STARS: "say what you're *comfy* with." / "then meet in the *middle*."
//              ♍: "I love the idea. not the sweater." Leo pulls out a backup: matching socks. Feet up, one photo, flash.
//   21.6–25.6  "Packed: | *one cozy photo.*"  THE STARS: "Matching socks. Nobody has to know."
import { makeSurv, R, box, ink, room, mug, drawBits, sparkles, hearts, label, shadow, bubble,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, PINE, INTER } from '../../nhse01/survkit.js'

const LEO = '#f39a3a'
const SWEAT = ['GG.......GG', 'GGGGGGGGGGG', 'GGWGWGWGWGG', 'GGGGGGGGGGG', '.GGGGYGGGG.', '.GGGYYYGGG.', '.GGGGYGGGG.', '.GGGGGGGGG.', '.WWWWWWWWW.']
function sweater(x, cx, cy, s, rot = 0) { drawBits(x, SWEAT, { G: '#c8463c', W: BONE, Y: GOLD }, cx, cy, 14 * s, { rot }) }
function socks(x, cx, cy, s, rot = 0) { drawBits(x, ['GGG..', 'WWW..', 'GYG..', 'GGG..', 'GGGGG', '.GGGG'], { G: PINE, W: BONE, Y: GOLD }, cx, cy, 10 * s, { rot }) }
function frame(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate([-0.08, 0.05, -0.03][n % 3]); x.scale(k, k)
  box(x, -90, -100, 180, 200, BONE, { b: 6 }); R(x, '#2a1f4a', -76, -86, 152, 130)
  drawBits(x, ['.O.', 'OOO', 'O.O'], { O: LEO }, -30, -20 - (n % 2) * 10, 10); drawBits(x, ['.O.', 'OOO', 'O.O'], { O: '#ff8fb1' }, 30, -20, 10)
  ink(x, `POSE ${n + 1}`, 0, 72, { size: 20, font: INTER, weight: 800 })
  x.restore()
}

function act0(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: { x: 640, y: 470, w: 260, h: 260 } })
  shadow(x, 330, 1255, 260); shadow(x, 820, 1255, 200)
  hero(x, t, { x: 330, y: 1080, s: 260, mood: 'sparkle', look: [1, 0], hops: [0.4, 0.8, 1.2, 3.0, 3.4] })
  // the two sweaters held high, waving
  sweater(x, 200, 740 + 12 * Math.sin(t * 5), 1.6, -0.12 + 0.05 * Math.sin(t * 5)); sweater(x, 470, 740 + 12 * Math.cos(t * 5), 1.6, 0.12 - 0.05 * Math.sin(t * 5))
  star('virgo', x, t, { x: 820, y: 1100, s: 210, mood: 'wide', look: [-1, -0.4], seed: 9, bob: 0 })
  mug(x, t, 930, 1080, 0.9)
  if (u > 2.4) label(x, '…', 820, 900, { size: 60, col: BONE, alpha: clamp(prog(u, 2.4, 2.7)) })
  sparkles(x, t, 335, 760, 0.42, 8, 200, 1, [GOLD, BONE, RED])
}

function act1(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: null })
  for (let i = 0; i < 3; i++) frame(x, 240 + i * 300, 640, pop01(t, S.t0 + 0.4 + i * 0.6, 0.3, 2.6), i)
  if (u > 2.4) label(x, '+ 9 MORE', 540, 800, { size: 30, col: GOLD, alpha: clamp(prog(u, 2.4, 2.6)) })
  hero(x, t, { x: 330, y: 1080, s: 240, mood: 'happy', look: [1, -0.6], hops: [S.t0 + 0.4, S.t0 + 1.0, S.t0 + 1.6, S.t0 + 3.4, S.t0 + 3.8] })
  sweater(x, 330, 1210, 0.7)
  const tw = u > 3.2 ? 0.05 * Math.sign(Math.sin(t * 30)) * (Math.sin(t * 3) > 0.2 ? 1 : 0) : 0
  star('virgo', x, t, { x: 800, y: 1100, s: 220, mood: 'happy', look: [-1, 0], seed: 9, bob: 0, squash: tw })
  if (u > 3.2) label(x, 'twitch', 920, 960, { size: 24, col: BONE, alpha: Math.abs(tw) > 0 ? 0.8 : 0 })
}

function act2(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: { x: 640, y: 470, w: 260, h: 260 } })
  // the sofa
  box(x, 160, 1040, 760, 200, '#3a6a8a', { b: 7, hi: '#4f80a0' }); box(x, 130, 960, 70, 280, '#3a6a8a', { b: 7 }); box(x, 880, 960, 70, 280, '#3a6a8a', { b: 7 })
  const feet = u > 4.2
  hero(x, t, { x: 360, y: 980, s: 210, mood: u > 3.8 ? 'happy' : u > 1.0 ? 'neutral' : 'happy', look: [1, 0], hops: [S.t0 + 2.6, S.t0 + 4.3, S.t0 + 5.6] })
  star('virgo', x, t, { x: 720, y: 980, s: 210, mood: feet ? 'heart' : 'happy', look: [-1, 0], seed: 9, hops: [S.t0 + 0.6, S.t0 + 4.35, S.t0 + 5.65] })
  bubble(x, t, 700, 760, S.t0 + 0.5, S.t0 + 2.6, 'I love the idea. not the sweater.', { size: 30, tail: 0.1 })
  // the backup: matching socks
  const sk = pop01(t, S.t0 + 2.6, 0.35, 2.6)
  if (!feet && sk > 0.01) { socks(x, 340, 780, 1.3 * sk, -0.2); socks(x, 420, 780, 1.3 * sk, 0.2); label(x, 'BACKUP!', 380, 690, { size: 34, col: GOLD, font: INTER, weight: 800, alpha: clamp(sk) }) }
  if (feet) { box(x, 340, 1160, 400, 60, '#8a5aa8', { b: 6 }); for (let i = 0; i < 4; i++) socks(x, 400 + i * 95, 1130, 1.0, i % 2 ? 0.15 : -0.15); hearts(x, t, S.t0 + 4.4, 540, 900, { n: 6 }) }
  // the photo flash
  const fl = u > 5.6 && u < 5.8 ? 1 - (u - 5.6) / 0.2 : 0
  if (fl > 0) { x.save(); x.globalAlpha = 0.7 * fl; R(x, '#ffffff', 0, 280, 1080, 1100); x.restore() }
  if (u > 5.6) label(x, 'CLICK!', 540, 700, { size: 40, col: BONE, font: INTER, weight: 800, alpha: outK(t, [S.t0 + 6.6, S.t0 + 6.9]) })
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.07)
  box(x, -140, -140, 280, 290, BONE, { b: 7 }); R(x, '#3a6a8a', -122, -122, 244, 200)
  drawBits(x, ['.O.', 'OOO', 'O.O'], { O: LEO }, -50, -40, 14); drawBits(x, ['.O.', 'OOO', 'O.O'], { O: '#ff8fb1' }, 50, -40, 14)
  socks(x, -40, 40, 0.7, -0.1); socks(x, 40, 40, 0.7, 0.1)
  ink(x, 'us ♥', 0, 112, { size: 26, col: RED, font: INTER, weight: 800 })
  x.restore()
}

const EP = makeSurv({
  id: 'nhse12', ep: 12, hero: 'leo', accent: LEO,
  heads: ['They bought | *matching sweaters.*', 'Photo plan: | pose, *pose,* pose.', 'Meet in | the *middle.*', 'Packed: | *one cozy photo.*'],
  headSize: [92, 92, 100, 92],
  acts: [act0, act1, act2],
  line1: { t: 10.1, speaker: '♌︎ LEO', color: LEO, text: 'twelve poses. minimum. *iconic!*', close: 13.6 },
  tips: ['say what you’re *comfy* with.', 'then meet in the *middle*.'],
  last: 'Matching socks. Nobody *has to know.*',
  item: { label: 'ONE COZY PHOTO', draw: item },
  pis: [{ x: 960, y: 560, s: 100, noTissues: true, mood: 'sparkle' }, { x: 960, y: 900, s: 90, noTissues: true }, { x: 960, y: 560, s: 90, noTissues: true, mood: 'happy', tears: 3 }],
  finaleHero(x, t, { hero, ok, HOPS }) { shadow(x, 200, 1300, 200 * ok); hero(x, t, { x: 200, y: 1150, s: 210, pop: ok, mood: 'happy', look: [1, -0.3], hops: HOPS }); socks(x, 200, 1290, 0.8 * ok) },
  cues: [
    [['pop', 0.4, 1174.66, 0.04, -0.3], ['pop', 0.8, 1318.51, 0.04, -0.3], ['pluck', 2.4, 207.65, 0.035, 0.7, 0.3]],
    [['pop', 0.4, 987.77, 0.04, -0.3], ['pop', 1.0, 1174.66, 0.04, 0], ['pop', 1.6, 1318.51, 0.04, 0.3], ['pop', 2.4, 1567.98, 0.035, 0], ...Array.from({ length: 6 }, (_, i) => ['tick', +(3.3 + i * 0.4).toFixed(2), 0.03])],
    [['pop', 0.5, 880, 0.035, 0.3], ['pop', 2.6, 1318.51, 0.045, -0.3], ['glitter', 2.6, 3.0], ['whoosh', 4.1, 0.3, 0.03], ['pluck', 4.4, 1567.98, 0.04, 0.5, 0], ['tick', 5.6, 0.08], ['bell', 5.62, 2093, 0.03, 0.8, 0]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, PINK, lerp, ease]
