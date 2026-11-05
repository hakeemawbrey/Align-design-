// k3se17: 3-SECOND ADVICE · "Waiting for Them to Text First" (6.6 s vertical trial reel, music: funk · Bb).
// Format: k3se01/threekit.js.
//   0.00  frame 0: a western standoff at "HIGH NOON (11:58 PM)": ♌ Leo, eyes twitching, faces down the phone on a
//         stool; a tumbleweed rolls between them.  Hook: "Waiting for them | to text *first.*"  Pisces sniffles.
//   0.50  whip zoom onto Leo's twitching eyes; the frame holds.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Want to talk? Text first. | *Pride is lonely.*"  Leo strolls over and sends "thinking of you";
//         the phone buzzes straight back: "was JUST about to text you!!"  Leo melts. Hard cut at 6.6.
import { makeThree, R, box, bubble, label, shadow, phone, chat, hearts, sparkles, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER, MONO } from '../../k3se01/threekit.js'

function desert(x) {
  R(x, '#3a2a40', 0, 1150, 1080, 120); R(x, '#4a3650', 0, 1150, 1080, 10)
  // a cactus
  box(x, 950, 860, 50, 290, '#3fa07a', { b: 6 }); box(x, 905, 940, 30, 90, '#3fa07a', { b: 6 }); box(x, 905, 1000, 60, 30, '#3fa07a', { b: 6 })
  box(x, 30, 1070, 120, 80, '#6a5070', { b: 6 })
}
function stool(x) { box(x, 730, 1010, 140, 24, '#a07850', { b: 6 }); R(x, INK, 745, 1034, 16, 116); R(x, INK, 840, 1034, 16, 116) }
function tumbleweed(x, t, cx, cy) {
  x.save(); x.translate(cx, cy); x.rotate(t * 6)
  x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(0, 0, 50, 0, 7); x.stroke()
  x.strokeStyle = '#c9a06a'; x.lineWidth = 6
  for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(0, 0, 18 + i * 8, i, i + 3.5); x.stroke() }
  x.restore()
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  desert(x)
  stool(x)
  box(x, 590, 470, 380, 70, '#120c26', { b: 6 })
  x.font = `700 30px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HIGH NOON (11:58 PM)', 780, 506)
  if (phase === 'hook') {
    phone(x, 800, 910, { w: 150, h: 200, draw: (c, w) => { c.fillStyle = 'rgba(239,230,214,0.35)'; c.font = `700 22px ${MONO}`; c.textAlign = 'center'; c.fillText('no new', w / 2, 50); c.fillText('messages', w / 2, 76) } })
    tumbleweed(x, t, 420 + 260 * t, 1095)
    shadow(x, 250, 1150, 250)
    const tw = Math.sin(t * 40) > 0.3
    hero(x, t, { x: 250, y: 960, s: 280, mood: tw ? 'squint' : 'neutral', look: [1, 0] })
    label(x, '*twitch*', 250, 760, { size: 36, col: BONE, alpha: tw ? 1 : 0.5 })
    return
  }
  const walk = ease.inOutCubic(prog(u, 0.3, 1.0))
  const melt = u > 2.75
  const hx = lerp(250, 330, walk)
  shadow(x, hx, 1150, 250)
  hero(x, t, { x: hx, y: 960, s: 280, mood: melt ? 'heart' : u < 0.3 ? 'squint' : 'neutral', look: [1, -0.2], hops: [2.45 + 0.3, 2.45 + 0.65, 2.45 + 1.0, 2.45 + 2.75] })
  const big = ease.outCubic(prog(u, 1.0, 1.3))
  const buzz = u > 2.5 && u < 2.8 ? 6 * Math.sin(t * 70) : 0
  phone(x, lerp(800, 760, big) + buzz, lerp(910, 820, big), { w: lerp(150, 400, big), h: lerp(200, 520, big), draw: (c, w) => {
    if (big < 0.5) return
    if (u > 1.4) chat(c, w, 40, 'thinking of you', { mine: true, size: 32, k: clamp(prog(u, 1.4, 1.55)) })
    if (u > 2.5) chat(c, w, 130, 'was JUST about to', { size: 30, k: clamp(prog(u, 2.5, 2.65)), col: '#c0407a' })
    if (u > 2.6) chat(c, w, 194, 'text you!!', { size: 30, k: clamp(prog(u, 2.6, 2.75)), col: '#c0407a' })
  } })
  if (u > 2.5 && u < 2.9) label(x, 'bzz', 1000, 640, { size: 40, col: '#bcd2ff', font: INTER, weight: 800 })
  if (melt) { hearts(x, t, 2.45 + 2.75, hx, 800, { n: 6, cell: 7 }); sparkles(x, t, hx, 900, 2.45 + 2.75, 8, 160, 1) }
}

const EP = makeThree({
  id: 'k3se17', sign: 'leo', dur: 6.6, brk: 'whip', ending: 'cut', focus: [250, 900],
  hook: 'Waiting for them | to text *first.*', accent: '#ffb24a',
  advice: 'Want to talk? Text first. | *Pride is lonely.*', adviceSize: 56,
  scene,
  cues: [
    ['pluck', 0.0, 392, 0.03, -0.3, 0.8], ['whoosh', 0.05, 0.6, 0.02],
    ['tick', 2.8, 0.05], ['tick', 3.1, 0.05], ['tick', 3.4, 0.05], ['whoosh', 3.45, 0.3, 0.03], ['pop', 3.95, 1174.66, 0.04, 0.4],
    ['tick', 4.95, 0.07], ['tick', 5.01, 0.07], ['pop', 5.0, 1318.51, 0.045, 0.4], ['pop', 5.2, 1567.98, 0.04, 0.4], ['glitter', 5.2, 5.7],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
