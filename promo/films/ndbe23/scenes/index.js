// ndbe23: DEALBREAKER OR NOT? E23, "They brought a | *documentary* to movie night." (13 s vertical trial reel, synthwave · F#m).
//   0.0–3.9   frame 0: ♒ Aquarius mid-reveal on the couch, holding up a case: "MOSS: A STORY". 0.9 ♉ Taurus: "…moss?"
//             1.8 the TV fills with glowing green moss. 2.3 caption "3 MINUTES LATER". 2.7 Taurus leaning in, gripped:
//             "the MOSS!!"
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    Taurus hands Aquarius its own pick (a case with a heart on it); they swap; both happy on the couch.
//             THE STARS: "Weird is a gift. *Trade* picks."
import { makeDeal, R, box, bubble, label, hearts, sparkles, couch, floor, glow, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

function caseProp(x, cx, cy, title, col, s = 1, rot = 0, heart = false) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -70, -96, 140, 192, col, { b: 6 })
  if (heart) { R(x, '#ff5c8a', -30, -40, 24, 24); R(x, '#ff5c8a', 6, -40, 24, 24); R(x, '#ff5c8a', -30, -24, 60, 24); R(x, '#ff5c8a', -16, 0, 32, 16) }
  else for (let i = 0; i < 6; i++) R(x, ['#3fcf7a', '#5fe397', '#2a8a4a'][i % 3], -50 + (i % 3) * 34, -40 + Math.floor(i / 3) * 30, 30, 26)
  x.font = "800 18px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
  title.split('|').forEach((l, i) => x.fillText(l, 0, 44 + i * 22))
  x.restore()
}
function tvMoss(x, t, mode) {
  box(x, 310, 420, 460, 280, '#2a2148', { b: 8 }); R(x, '#0d1b3a', 330, 440, 420, 240)
  if (mode) { glow(x, 540, 560, 300, 0.25, '95,227,151'); for (let i = 0; i < 28; i++) { const mx = 340 + (i * 53) % 400, my = 560 + (i * 37) % 110, s = 22 + (i % 3) * 8 + 4 * Math.sin(t * 2 + i); R(x, ['#3fcf7a', '#5fe397', '#2a8a4a'][i % 3], mx, my - s / 2, s, s) } }
  R(x, INK, 520, 708, 40, 50); box(x, 450, 758, 180, 14, '#4a3a6a', { b: 5 })
}
const ASK = 0.9, MOSS = 1.8, LATER = 2.3, GRIP = 2.7
const EP = makeDeal({
  id: 'ndbe23', sign: 'aquarius', date: 'taurus', verdict: 'not', accent: '#5fe397',
  hook: 'They brought a | *documentary* to movie night.',
  last: 'Weird is a gift. *Trade* picks.',
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#2a2040')
    tvMoss(x, t, u > MOSS)
    couch(x, 540, 1070, 700)
    hero(x, t, { x: 380, y: 950, s: 240, mood: 'sparkle', look: u > MOSS ? [1, -1] : [0.5, 0], hops: [-0.3, MOSS] })
    if (u < MOSS) caseProp(x, 300, 800, 'MOSS:|A STORY', '#1e4a3a', 1, -0.12)
    const lean = clamp(prog(u, GRIP - 0.2, GRIP))
    date(x, t, { x: 720 - 30 * lean, y: 955 - 20 * lean, s: 230 + 20 * lean, mood: u > GRIP ? 'wide' : u > ASK ? 'eyeroll' : 'neutral', look: u > MOSS ? [-0.6, -1] : [-1, 0], hops: [ASK, GRIP] })
    bubble(x, t, 760, 780, ASK, MOSS + 0.2, '…moss?', { size: 38, tail: 0 })
    const lk = pop01(t, LATER, 0.25, 2.4) * outK(t, [3.75, 3.9])
    if (lk > 0.01) { x.save(); x.translate(540, 860); x.scale(lk, lk); box(x, -210, -32, 420, 64, GOLD, { b: 6 }); x.font = "800 34px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('3 MINUTES LATER', 0, 3); x.restore() }
    bubble(x, t, 760, 760, GRIP, 3.85, 'the MOSS!!', { size: 40, tail: -0.2 })
  },
  sceneCues: [['pop', 0.02, 880, 0.03, -0.3], ['pop', ASK, 659.25, 0.045, 0.3], ['bell', MOSS, 1318.51, 0.03, 1.0, 0], ['glitter', MOSS, MOSS + 0.4], ['tick', LATER, 0.07], ['pop', LATER + 0.02, 987.77, 0.04, 0], ['pop', GRIP, 1567.98, 0.05, 0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date } = S
    floor(x, 1150, '#2a2040')
    if (k <= 0.01) return
    couch(x, 540, 1070, 700)
    hero(x, t, { x: 380, y: 950, s: 240, pop: k, mood: u > 1.3 ? 'heart' : 'happy', look: [1, 0], hops: [T.stamp + 1.3] })
    date(x, t, { x: 700, y: 955, s: 230, pop: k, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.8] })
    const sw = ease.inOutCubic(prog(u, 0.7, 1.2))
    caseProp(x, lerp(800, 470, sw), lerp(780, 760, sw), 'LOVE,|AGAIN', '#8a2a4a', 0.85 * k, 0.1, true)
    caseProp(x, lerp(300, 620, sw), 770, 'MOSS:|A STORY', '#1e4a3a', 0.85 * k, -0.1)
    hearts(x, t, T.stamp + 1.3, 540, 700, { n: 5 })
    sparkles(x, t, 540, 770, T.stamp + 1.2, 8, 150, 1, [GOLD, PINK, '#5fe397'])
  },
  finaleCues: [['whoosh', 0.7, 0.35, 0.025], ['pop', 1.2, 1174.66, 0.045, 0], ['pluck', 1.3, 1567.98, 0.04, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label]
