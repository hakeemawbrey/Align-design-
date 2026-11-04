// ngwe31 · Your Star Guide: Winter · ♏ Scorpio, winter note 3 / 4: the small gift (20 s; story 0–15.6, then the end card)
//   0.00  "Scorpio, it's not about the bow."  A gift with a ridiculous shiny bow; Scorpio side-eyes it.
//   3.0   ♏ YOUR STAR: "you don't want shiny. you want trust."  The bow sparkles SHINY!; Scorpio rolls its eyes.
//   5.4   The bow flops off. Underneath: a tiny tin. It opens: one gingerbread key, a ♏ in icing.
//   6.6   "a small sign that says: you're in."  Scorpio melts.
//  10.68  card flip · "You're in. | That's the gift."  Scorpio holds the key up to the light. Pisces: happy fountains.
import { winterGuide, drawBits, prog, ease, lerp, clamp, INK, GOLD, PINK, R, box, heartsUp, shadow } from '../../ngwe25/scenes/gwkit.js'

const T0 = { shiny: 4.4, flop: 5.4, tin: 5.9, open: 6.2, melt: 8.4 }
const KEY = [
  '..GGGG.........',
  '.GHHHHG........',
  'GHH..HHGGGGGGGG',
  'GH....HHHHHHHHG',
  'GHH..HHGGGGHGHG',
  '.GHHHHG....G.G.',
  '..GGGG.........',
]
const KEY_C = { G: '#a9662e', H: '#d99a55' }

function bigBow(x, cx, cy, s, t, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const sh = 0.5 + 0.5 * Math.sin(t * 6)
  for (const d of [-1, 1]) {
    x.save(); x.scale(d, 1)
    x.fillStyle = INK; x.beginPath(); x.moveTo(0, 0); x.lineTo(s * 1.1, -s * 0.75); x.lineTo(s * 1.25, s * 0.15); x.closePath(); x.fill()
    x.fillStyle = '#ffd34d'; x.beginPath(); x.moveTo(8, 0); x.lineTo(s * 1.02, -s * 0.6); x.lineTo(s * 1.12, s * 0.06); x.closePath(); x.fill()
    x.fillStyle = `rgba(255,255,255,${0.35 + 0.4 * sh})`; x.fillRect(s * 0.5, -s * 0.38, s * 0.3, 10)
    // tails
    x.fillStyle = INK; x.fillRect(4, 0, 34, s * 0.95); x.fillStyle = '#f2c75c'; x.fillRect(10, 4, 22, s * 0.88)
    x.restore()
  }
  box(x, -30, -30, 60, 60, '#ffd34d', { b: 6, hi: '#fff2b8' })
  x.restore()
}

const F = winterGuide({
  sign: 'scorpio', note: 3, duration: 20,
  hook: "*Scorpio,* it's not | about the bow.",
  lines: [
    { t: 3.0, text: "you don't want *shiny.* you want *trust.*" },
    { t: 6.6, text: "a small sign that says: *you're in.*" },
  ],
  fact: "SCORPIO'S SYMBOL:|THE SCORPION", factAt: 8.5, factDur: 1.9,
  last: "You're *in.* | That's the gift.",
  guide(t) {
    const mood = t < T0.shiny ? 'squint' : t < T0.flop ? 'eyeroll' : t < T0.open + 0.3 ? 'wide' : t < T0.melt ? 'sparkle' : t < 10.68 ? 'heart' : 'happy'
    const melt = t > T0.melt && t < T0.melt + 0.8 ? 0.2 * Math.sin(Math.PI * prog(t, T0.melt, T0.melt + 0.8)) : 0
    return { x: 540, y: 1150, size: 290, mood, look: t < T0.shiny ? [-1, -0.6] : [0, -1], squash: melt, lanternSize: 76 }
  },
  drawMid(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    // the box (it slides aside once the tin is out)
    const aside = ease.inOutCubic(prog(t, T0.tin, T0.tin + 0.6))
    const bx = lerp(540, 250, aside), by = lerp(820, 1200, aside), bs = lerp(240, 150, aside)
    if (t < 10.4) giftBox(x, bx, by, bs, t, { color: '#2a2150', ribbon: '#ffd34d', open: 0, wobble: 0, noLid: true })
    // the bow: shiny on top, then flops off
    const fp = prog(t, T0.flop, T0.flop + 0.6)
    bigBow(x, lerp(540, 820, ease.inCubic(fp)), lerp(690, 1220, ease.inCubic(fp)), 175, t, 1 - clamp((fp - 0.85) * 6), fp * 2.2 + 0.05 * Math.sin(t * 3))
    x.restore()
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    if (t < T0.flop) K.sparkles(t, 540, 700, T0.shiny, 10, 170, 1, ['#ffd34d', '#ffffff', '#fff2b8'])
    K.burst(700, 560, 80, t, T0.shiny, { word: 'SHINY!', size: 34 })
    // the tin, then the key
    if (t > T0.tin) {
      const k = K.pop01(t, T0.tin, 0.35, 2.4) * o
      const tinY = 860
      x.save(); x.translate(540, tinY); x.scale(k, k)
      box(x, -90, -30, 180, 80, '#b8c4d8', { b: 6, hi: '#e6eef8' })
      const lp = ease.outBack(prog(t, T0.open, T0.open + 0.5))
      x.save(); x.globalAlpha *= 1 - clamp(prog(t, T0.open + 0.7, T0.open + 1.1)); x.translate(lerp(0, 120, lp), lerp(-40, -110, lp)); x.rotate(lp * 0.6); box(x, -96, -12, 192, 24, '#9aa8c0', { b: 6, hi: '#e6eef8' }); x.restore()
      x.restore()
      if (t > T0.open) {
        const kp = ease.outBack(prog(t, T0.open + 0.1, T0.open + 0.7))
        const late = t > 10.68
        const ky = late ? 760 + Math.sin(t * 2) * 8 : lerp(tinY - 10, 720, kp)
        drawBits(x, KEY, KEY_C, 540, ky, 17 * kp, { rot: -0.15 + 0.05 * Math.sin(t * 2.4) })
        // the ♏ in icing on the bow
        x.save(); x.globalAlpha *= kp * o; x.fillStyle = '#ffffff'; x.font = `700 ${Math.round(44 * kp)}px 'EB Garamond', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('♏︎', 540 - 68, ky - 4); x.restore()
        K.sparkles(t, 540, 720, T0.open + 0.6, 10, 150, 2, [GOLD, '#ffffff', PINK])
      }
    }
    heartsUp(x, t, 540, 960, T0.melt, { n: 3, c: 7, col: '#e23d66' })
    heartsUp(x, t, 540, 960, 11.5, { n: 3, c: 6, col: '#e23d66' })
  },
  cues: [
    ['glitter', 0.1, 0.8], ['tick', 1.2, 0.03],
    ['glitter', T0.shiny, T0.shiny + 0.6], ['pop', T0.shiny, 1567.98, 0.04, 0.3], ['whoosh', T0.shiny + 0.4, 0.4, 0.03],
    ['whoosh', T0.flop, 0.5, 0.04], ['boom', T0.flop + 0.6, 0.08],
    ['pop', T0.tin, 880, 0.04, 0], ['tick', T0.open, 0.06], ['pluck', T0.open + 0.4, 1318.51, 0.045, 0.8, 0], ['bell', T0.open + 0.7, 1760, 0.025, 1.0, 0],
    ['whoosh', T0.melt, 0.5, 0.03], ['pluck', T0.melt + 0.2, 1174.66, 0.04, 0.8, 0],
  ],
})

import { giftBox } from '../../ngwe25/scenes/gwkit.js'
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
