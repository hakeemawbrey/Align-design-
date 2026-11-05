// k5te01: 5 THINGS EVERY ARIES NEEDS TO HEAR, "Aries, slow down for once" (11 s vertical, star_advice trial reel,
// music: house · E). Rows: promo/films/month2/m33.md #1. The format lives in ../fivekit.js (shared by k5te01–k5te24).
//   0.00   frame 0: ♈ Aries mid-sprint, bursting through a paper banner that says WAIT (torn halves flapping, paper bits
//          flying, speed lines). Hook line: "Aries. *Slow down.* Read this."  Whip zoom at 0.42, "5 THINGS. GO." slams.
//   1.45   five beats: 1 "Not every crush is a *race.*" (clock) · 2 "Waiting isn't *losing.*" (moon) ·
//          3 "Ask, then actually *listen.*" (chat) · 4 "Your heat is a *gift.*" (sun) · 5 "The right one keeps *pace.*" (hug)
//          Pisces sniffles in the corner, fountaining by 5.
//   9.05   THE STARS: "Run toward people who *run back.*"  Hard cut at 11.0.
import { makeFive, R, INK, BONE, GOLD, RED, debris, speedLines, shadow, lerp, ease, prog, INTER } from '../fivekit.js'

const ARIES = '#f0603a'

// the paper banner: two torn halves flapping away from the burst point
function banner(x, th) {
  const open = 0.35 + 0.65 * ease.outCubic(Math.min(1, (th + 0.2) / 1.4))
  for (const d of [-1, 1]) {
    x.save(); x.translate(540 + d * (60 + 160 * open), 930); x.rotate(d * (0.18 + 0.5 * open)); x.translate(-d * 20, 0)
    // a ragged half sheet on two poles
    const w = 300, h = 360
    R(x, INK, d < 0 ? -w - 8 : -8, -h / 2 - 8, w + 16, h + 16)
    R(x, '#ffe7a8', d < 0 ? -w : 0, -h / 2, w, h)
    for (let j = 0; j < 9; j++) R(x, '#ffe7a8', d < 0 ? -8 : -j % 3 * 6, -h / 2 + j * 40, 14 + (j % 3) * 8, 40)
    x.font = `800 150px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED
    x.fillText(d < 0 ? 'WA' : 'IT', d < 0 ? -w / 2 : w / 2, 10)
    x.restore()
  }
}

const EP = makeFive({
  id: 'k5te01', sign: 'aries', name: 'Aries', accent: ARIES, deep: '#b8321a', D: 11, ending: 'cut',
  brk: { type: 'whip', at: 0.42 },
  hookLine: 'Aries. *Slow down.* | Read this.',
  hook(x, th, S) {
    speedLines(x, th, 540, 930, 0.9, { col: '#ffd0b0', seed: 2 })
    banner(x, th)
    debris(x, th, 540, 930, { n: 18, spread: 380, cols: ['#ffe7a8', '#fff1c8', ARIES], sz: 30, seed: 3, v: 0.6 })
    const lean = 0.22, push = lerp(0, 40, ease.outCubic(Math.min(1, th / 1.4)))
    shadow(x, 540, 1170, 280)
    x.save(); x.translate(540, 960 - push * 0.3); x.rotate(lean); x.translate(-540, -960)
    S.hero(x, th, { x: 540, y: 950 - push * 0.3, s: 360, mood: 'wide', look: [0, 0], squash: -0.12, bob: 0 })
    x.restore()
  },
  items: [
    { text: 'Not every crush | is a *race.*', icon: 'clock', mood: 'wide' },
    { text: 'Waiting isn’t *losing.*', icon: 'moon', mood: 'neutral' },
    { text: 'Ask, then actually *listen.*', icon: 'chat', mood: 'happy' },
    { text: 'Your heat is a *gift.*', icon: 'sun', mood: 'sparkle' },
    { text: 'The right one | keeps *pace.*', icon: 'hug', mood: 'heart' },
  ],
  last: 'Run toward people | who *run back.*',
  music: { style: 'house', key: 'E', seed: 3301 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [BONE, GOLD, prog]
