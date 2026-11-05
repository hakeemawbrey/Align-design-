// k3se11: 3-SECOND ADVICE · "Replying With a Meme" (6.7 s vertical trial reel, music: pop · B). Format: k3se01/threekit.js.
//   0.00  frame 0: ♒ Aquarius mid-throw of a giant meme sticker held up like a shield; a pink text "I really like you"
//         flies in from ♌ the crush across the room and bonks off it.
//         Hook: "Replying to *feelings* | with a meme."  Pisces sniffles in the corner.
//   0.50  record scratch: freeze; a red "caught" circle scribbles round the meme.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Say one real sentence. | *Then* send the meme."  Aquarius lowers the meme: "I like you too."
//         …then holds up the meme again, small: "(also this)". The crush melts.  Hard cut at 6.7.
import { makeThree, R, box, bubble, label, shadow, drawBits, hearts, sparkles, lerp, prog, ease, clamp, INK, BONE, GOLD, PINK, RED, INTER } from '../../k3se01/threekit.js'
import { caught, caughtCues } from '../../hookkit.js'

const CAUGHT = { at: 0.62, x: 640, y: 800, r: 190, out: [2.3, 2.45], label: 'CAUGHT', arrow: 'bl', rec: false }
const FACE = ['..XXXXX..', '.XXXXXXX.', 'XXOXXXOXX', 'XXXXXXXXX', 'XXMMMMMXX', '.XXMMMXX.', '..XXXXX..']
function meme(x, cx, cy, s, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -150, -170, 300, 340, BONE, { b: 8 })
  R(x, '#ffd36b', -130, -150, 260, 230)
  drawBits(x, FACE, { X: '#f39a3a', O: INK, M: '#7a2a1a' }, 0, -40, 22)
  x.font = `800 44px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('lol same', 0, 128)
  x.restore()
}
function pinkText(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -190, -40, 380, 80, '#ff5c8a', { b: 6 })
  x.font = `800 36px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('I really like you', 0, 2)
  x.restore()
}

function scene(x, t, S) {
  const { phase, u, hero, star } = S
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  const melt = phase === 'fix' && u > 2.6
  shadow(x, 180, 1150, 200)
  star(x, t, 'leo', { x: 180, y: 1020, s: 210, mood: melt ? 'heart' : phase === 'fix' && u > 0.9 ? 'wide' : 'neutral', look: [1, -0.2], seed: 9, hops: phase === 'fix' ? [2.45 + 0.95, 2.45 + 2.65] : null })
  if (phase === 'hook') {
    // the text flies in and bonks off the shield
    const p = (t + 0.4) / 1.0
    const fx = lerp(200, 440, Math.min(1, p)), fy = 760 - 90 * Math.sin(Math.PI * Math.min(1, p))
    pinkText(x, fx, fy, -0.15 + 0.3 * p)
    shadow(x, 760, 1150, 240)
    hero(x, t, { x: 790, y: 980, s: 260, mood: 'squint', look: [-1, 0], squash: -0.08 })
    meme(x, 640 - 30 * Math.sin(t * 8), 800, 0.95, -0.12 + 0.06 * Math.sin(t * 12))
    label(x, 'BONK', 560, 600, { size: 52, col: GOLD, font: INTER, weight: 800, rot: -0.2 })
    return
  }
  // the meme lowers… then pops back, small
  const down = ease.inOutCubic(prog(u, 0, 0.5))
  if (down < 1) meme(x, lerp(640, 680, down), lerp(800, 1300, down), 0.95, -0.12 + 0.3 * down)
  shadow(x, 760, 1150, 240)
  hero(x, t, { x: 760, y: 980, s: 260, mood: u < 0.5 ? 'wide' : u > 2.4 ? 'happy' : 'neutral', look: [-1, 0], blush: u > 0.6 ? 1 : 0, hops: [2.45 + 0.6, 2.45 + 1.9] })
  bubble(x, t, 700, 680, 2.45 + 0.6, 99, 'I like you too.', { size: 46, tail: 0.3 })
  const back = clamp(prog(u, 1.9, 2.15))
  if (back > 0) { meme(x, 960, 860, 0.42 * ease.outBack(back), 0.15); label(x, '(also this)', 940, 1110, { size: 30, col: BONE, alpha: back }) }
  if (melt) { hearts(x, t, 2.45 + 2.6, 180, 880, { n: 6, cell: 7 }); sparkles(x, t, 180, 980, 2.45 + 2.6, 8, 150, 1) }
}

const EP = makeThree({
  id: 'k3se11', sign: 'aquarius', dur: 6.7, brk: 'freeze', ending: 'cut', focus: [640, 820],
  hook: 'Replying to *feelings* | with a meme.', accent: '#7fd0ff',
  advice: 'Say one real sentence. | *Then* send the meme.',
  caption: 'ok. *3 seconds.*',
  scene, extra: [caught(CAUGHT)],
  cues: [
    ...caughtCues(CAUGHT),
    ['tom', 0.05, 140, { gain: 0.16, decay: 0.15 }], ['pop', 0.06, 523.25, 0.04, -0.2],
    ['whoosh', 2.5, 0.4, 0.03], ['pop', 3.05, 1174.66, 0.04, 0.3], ['pop', 4.35, 1567.98, 0.04, 0.4], ['tick', 4.37, 0.06],
    ['pluck', 5.05, 1318.51, 0.035, -0.4, 0.4], ['pluck', 5.17, 1760, 0.035, -0.4, 0.4], ['glitter', 5.05, 5.5],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
