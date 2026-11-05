// k3se22: 3-SECOND ADVICE · "Midnight Text From the Ex" (6.8 s vertical trial reel, music: chiptune · A).
// Format: k3se01/threekit.js.
//   0.00  frame 0: a New Year's party at 12:00; ♒ Aquarius mid-jump with ♉ and ♌ friends, confetti everywhere, and the
//         phone lights up: "happy new year :)" from the ex.  Hook: "Midnight. Your ex texts | *'happy new year.'*"
//   0.50  record scratch: the confetti freezes in the air.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Reply kindly. You still | *don't have to go back.*"  Aquarius sends "you too. take care :)",
//         pockets the phone and jumps into a group hug; confetti again. Hard cut at 6.8.
import { makeThree, R, box, bubble, label, shadow, phone, chat, confetti, confettiRain, sparkles, star, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER, MONO } from '../../k3se01/threekit.js'

function party(x) {
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  box(x, 400, 480, 280, 80, '#120c26', { b: 6 })
  x.font = `700 52px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('12:00', 540, 522)
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  party(x)
  const hug = phase === 'fix' && u > 2.4
  const fx = hug ? [470, 690] : [130, 990]
  for (const [i, id] of [[0, 'taurus'], [1, 'leo']]) {
    const px = phase === 'fix' ? lerp(i ? 990 : 130, fx[i], ease.inOutCubic(prog(u, 2.2, 2.6))) : fx[i]
    shadow(x, px, 1150, 200)
    star(x, t, id, { x: px, y: 990, s: 210, mood: 'happy', look: [i ? -1 : 1, -0.2], seed: 20 + i, hops: phase === 'hook' ? [-0.2 + i * 0.15] : [2.45 + 2.6 + i * 0.1, 2.45 + 3.2] })
  }
  if (phase === 'hook') {
    confettiRain(x, t, { n: 50 })
    hero(x, t, { x: 420, y: 860 - 40 * Math.cos(t * 3), s: 270, mood: 'wide', look: [1, 0.5] })
    phone(x, 790, 820, { w: 340, h: 420, rot: 0.08, draw: (c, w, h) => { c.fillStyle = `rgba(160,190,255,${0.25 + 0.2 * Math.sin(t * 20)})`; c.fillRect(0, 0, w, h); chat(c, w, 60, 'happy new year :)', { size: 34 }); c.font = `700 22px ${MONO}`; c.fillStyle = BONE; c.textAlign = 'left'; c.fillText('from: the ex', 18, 40) } })
    return
  }
  if (u < 0.6) confettiRain(x, 2.45, { n: 50 })
  const hx = hug ? 580 : lerp(420, 580, ease.inOutCubic(prog(u, 2.0, 2.4)))
  shadow(x, hx, 1150, 240)
  hero(x, t, { x: hx, y: lerp(820, 960, ease.inOutCubic(clamp(u / 0.5))), s: 270, mood: u < 0.5 ? 'wide' : hug ? 'happy' : 'neutral', look: [1, 0.3], hops: [2.45 + 2.4, 2.45 + 3.0] })
  const pocket = ease.inCubic(prog(u, 1.9, 2.3))
  if (pocket < 1) phone(x, 790, lerp(820, 1350, pocket), { w: 340, h: 420, rot: 0.08, draw: (c, w) => {
    c.font = `700 22px ${MONO}`; c.fillStyle = BONE; c.textAlign = 'left'; c.fillText('from: the ex', 18, 40)
    chat(c, w, 60, 'happy new year :)', { size: 34 })
    if (u > 0.9) chat(c, w, 150, 'you too. take care :)', { mine: true, size: 32, k: clamp(prog(u, 0.9, 1.05)) })
    if (u > 1.2) { c.font = `700 22px ${MONO}`; c.fillStyle = 'rgba(239,230,214,0.6)'; c.textAlign = 'right'; c.fillText('sent', w - 20, 240) }
  } })
  if (hug) { confetti(x, t, 2.45 + 2.5, 580, 760, { n: 34 }); label(x, 'HAPPY NEW YEAR!', 580, 690, { size: 50, col: GOLD, font: INTER, weight: 800 }); sparkles(x, t, 580, 900, 2.45 + 2.5, 10, 260, 1) }
}

const EP = makeThree({
  id: 'k3se22', sign: 'aquarius', dur: 6.8, brk: 'freeze', ending: 'cut', focus: [700, 820],
  hook: "Midnight. Your ex texts | *'happy new year.'*", accent: '#7fd0ff',
  advice: "Reply kindly. You still | *don't have to go back.*",
  scene,
  cues: [
    ['glitter', 0.0, 0.45], ['tick', 0.05, 0.06], ['tick', 0.12, 0.06],
    ['pop', 3.4, 1174.66, 0.04, 0.4], ['tick', 3.65, 0.05], ['whoosh', 4.35, 0.4, 0.03],
    ['crash', 4.95, { gain: 0.07 }], ['pop', 4.95, 1318.51, 0.045, 0], ['pop', 5.05, 1567.98, 0.045, 0], ['pop', 5.15, 1760, 0.045, 0], ['glitter', 4.95, 5.6],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
