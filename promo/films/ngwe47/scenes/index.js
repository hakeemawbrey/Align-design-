// ngwe47 · Your Star Guide: Winter · ♓ Pisces, winter note 3 / 4: the small gift (20 s; story 0–15.6, then the end card)
//   0.00  "Pisces, check the envelope."  A small envelope with a heart seal slides in toward Pisces, who leans in.
//   3.0   ♓ YOUR STAR: "you don't need anything expensive."  The seal pops; a letter rises: "you make winter softer. /
//         i notice how you care. / thank you for being you."  Signed with two little fish.
//   6.6   "a few honest words, in their handwriting."  Pisces cries, happily (fountains).
//  10.68  "Write it | down for me."  Pisces hugging the letter. Happy tears.
import { winterGuide, paperNote, prog, ease, lerp, clamp, INK, R, box, heart, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const T0 = { seal: 4.2, rise: [4.5, 5.2], cry: 7.6 }

function envelope(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  const w = 300, h = 190
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#f8f0dc', { b: 6 })
  x.fillStyle = '#e6dcc4'; x.beginPath(); x.moveTo(-w / 2, h / 2); x.lineTo(0, 0); x.lineTo(w / 2, h / 2); x.closePath(); x.fill()
  // the flap
  const f = 1 - 2 * clamp(open)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 - 6, -h / 2); x.lineTo(0, -h / 2 + (h * 0.62 + 6) * f); x.lineTo(w / 2 + 6, -h / 2); x.closePath(); x.fill()
  x.fillStyle = '#efe4cc'; x.beginPath(); x.moveTo(-w / 2, -h / 2); x.lineTo(0, -h / 2 + h * 0.62 * f); x.lineTo(w / 2, -h / 2); x.closePath(); x.fill()
  if (open < 0.1) heart(x, 0, -h / 2 + h * 0.6, 5, '#e23d66')
  x.restore()
}

const F = winterGuide({
  sign: 'pisces', note: 3, duration: 20,
  hook: '*Pisces,* check | the envelope.',
  lines: [
    { t: 3.0, text: "you don't need anything *expensive.*" },
    { t: 6.6, text: 'a few honest words, in their *handwriting.*' },
  ],
  fact: "PISCES' SYMBOL: TWO FISH", factAt: 8.6, factDur: 1.8,
  last: 'Write it | *down* for me.',
  pisces: null,
  guide(t) {
    const tears = t < T0.rise[1] ? 1 : t < T0.cry ? 2 : 3
    const mood = t < T0.seal ? 'wide' : t < T0.cry ? 'sparkle' : t < 10.68 ? 'squint' : 'happy'
    return { x: 540, y: 1160, size: 270, mood, look: [0, -1], tears, lanternSize: 70, squash: t > T0.cry && t < 10.6 ? 0.05 * Math.sin(t * 14) : 0, hops: [T0.cry, 11.0, 11.6] }
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    const slide = ease.outCubic(prog(t, -0.6, 1.2))
    const eo = prog(t, T0.seal, T0.seal + 0.3)
    const away = ease.inCubic(prog(t, T0.rise[1], T0.rise[1] + 0.5))
    envelope(x, t, lerp(300, 540, slide), 860 + away * 260, (1 - away) * o, eo)
    K.burst(540, 760, 70, t, T0.seal, { word: 'POP', size: 30 })
    if (t > T0.rise[0]) {
      const p = ease.outBack(prog(t, ...T0.rise))
      const late = t > 10.68
      paperNote(x, 540, late ? 740 : lerp(840, 730, p), 640, 380, ['you make winter softer.', 'i notice how you care.', 'thank you for being you.', '><>  <><'], { k: lerp(0.4, 1, p) * o, rot: late ? -0.05 : -0.02, size: 44, reveal: prog(t, T0.rise[0] + 0.3, T0.rise[1] + 1.6) })
    }
    heartsUp(x, t, 540, 980, T0.cry, { n: 3, c: 7 })
    heartsUp(x, t, 540, 980, 11.6, { n: 3, c: 6 })
  },
  cues: [
    ['whoosh', 0.05, 0.6, 0.03], ['tick', 1.2, 0.03],
    ['pop', T0.seal, 1174.66, 0.045, 0], ['whoosh', T0.rise[0], 0.5, 0.03], ['pluck', T0.rise[1], 1318.51, 0.04, 0.8, 0],
    ['tick', 5.6, 0.025], ['tick', 6.0, 0.025], ['tick', 6.4, 0.025],
    ['glitter', T0.cry, T0.cry + 0.6], ['pluck', T0.cry + 0.2, 1567.98, 0.04, 0.8, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
