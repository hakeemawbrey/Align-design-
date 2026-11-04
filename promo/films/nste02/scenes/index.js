// nste02: SINGLE AND THRIVING, Ep 2 "Decorating for One" (23 s vertical, Next 30 b33, music: lofi · F).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Why decorate if | *nobody* sees it?" Taurus slumped on the couch, hugging an unopened box of
//              LIGHTS in a bare room. "it's just me this year…" → thinks: "why bother?"  Pisces sniffles.
//   6.8        beat cut → THE STARS: "somebody sees it: *you.*" / "make it cozy for the one who *lives* here."
//              A tag pops by Taurus: "FOR: the one | who lives here".
//   13.6       Taurus strings the lights; they blink on one by one, a little tree glows. "ooh." → "cozy. for ME."
//   17.4       "Taurus: *thriving.*" under its own lights. Last line: "Decorate for who *lives* here."
import { makeSingle, room, stringLights, couch, tree, box, ink, note, shadow, sparkles, mug, pop01, prog, lerp, ease, clamp, T, GOLD } from '../../nste01/singlekit.js'

function lightsBox(x, cx, cy, { k = 1, open = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -110, -80, 220, 140, '#3fb08a', { b: 6, hi: 'rgba(255,255,255,0.2)' })
  ink(x, 'LIGHTS', 0, -10, { size: 36, col: '#fff1c8' })
  for (let i = 0; i < 5; i++) { x.fillStyle = [GOLD, '#ff8fb1', '#7fd0ff', '#9fe6b0', '#ff9b5c'][i]; x.fillRect(-80 + i * 36, 28, 18, 18) }
  if (open > 0) { x.fillStyle = '#1b1236'; x.fillRect(-116, -86 - 40 * open, 232, 10) }
  x.restore()
}
const BARE = (x, t) => room(x, t, { wall: '#262046', wall2: '#211b40', floor: '#33284a', win: { x: 640, y: 480, w: 280, h: 300 } })

function s1(x, t, S) {
  const { u, hero } = S
  BARE(x, t)
  couch(x, 470, 1430, 560, '#5b4a8a')
  hero(x, t, { x: 420, y: 1210, s: 290, mood: u < 3.8 ? 'neutral' : 'sleepy', look: [0.4, 0.8], squash: 0.06, bob: 4, hops: [1.0], zzz: false })
  lightsBox(x, 540, 1340, { k: 1 })
  // a lone, sad bare branch in a pot
  box(x, 860, 1330, 90, 90, '#a0603a', { b: 5 }); x.fillStyle = '#1b1236'; x.fillRect(900, 1200, 10, 130); x.fillRect(880, 1240, 30, 8)
}
function s2(x, t, S) {
  const { hero } = S
  BARE(x, t)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  lightsBox(x, 300, 1300, { k: 0.6 })
  note(x, 790, 1170, 'FOR: the one|who lives here', { w: 400, h: 150, col: '#ffe27a', rot: 0.06, size: 34, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.A + 1.55, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero } = S
  BARE(x, t)
  const on = clamp(prog(u, 0.6, 2.4))
  stringLights(x, t, -20, 450, 560, 490, { n: 9, sag: 60, on: on > 0.1 ? 1 : 0 })
  stringLights(x, t, 520, 490, 1100, 450, { n: 9, sag: 60, on: on > 0.55 ? 1 : 0 })
  x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(255,190,120,${0.08 * on})`; x.fillRect(0, 420, 1080, 1500); x.restore()
  couch(x, 330, 1430, 440, '#5b4a8a')
  tree(x, t, 820, 1420, { h: 440, lit: clamp(prog(u, 1.6, 3.0)), orn: [[-90, -120, '#ff8fb1'], [70, -200, '#7fd0ff'], [-40, -280, GOLD]] })
  hero(x, t, { x: 360, y: 1210, s: 280, mood: u < 1.2 ? 'wide' : 'sparkle', look: [0.6, -0.8], hops: [0.4, 1.3, 1.7, 2.6].map(v => S.t0 + v) })
  mug(x, t, 520, 1330, { s: 0.9, col: '#3fb08a' })
  sparkles(x, t, 820, 1000, S.t0 + 3.0, 10, 200, 2)
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  stringLights(x, t, -20, 450, 560, 490, { n: 9, sag: 60, on: ok })
  stringLights(x, t, 520, 490, 1100, 450, { n: 9, sag: 60, on: ok })
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
}

const EP = makeSingle({
  id: 'nste02', sign: 'taurus', name: 'Taurus',
  hook: 'Why decorate if | *nobody* sees it?',
  h1: 'Someone *does.*', h2: 'Plug it *in.*',
  lines: ['somebody sees it: *you.*', 'make it cozy for the one who *lives* here.'],
  last: 'Decorate for who *lives* here.',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 420, y: 930, text: 'it’s just me this year…', size: 40, tail: 0 },
    { t0: 3.8, t1: 6.6, x: 470, y: 930, text: 'why bother?', size: 42, tail: -0.2, think: true },
    { t0: 14.4, t1: 15.8, x: 380, y: 930, text: 'ooh.', size: 46, tail: 0 },
    { t0: 15.9, t1: 17.3, x: 400, y: 930, text: 'cozy. for ME.', size: 44, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 950, y: 1590, s: 130 }, pis3: { x: 960, y: 1600, s: 120 },
  s1, s2, s3, fin,
  cues: [['tick', 14.25, 0.05], ['pop', 14.3, 1318.51, 0.03, -0.3], ['pop', 14.7, 1567.98, 0.03, 0.3], ['glitter', 15.2, 16.6]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease]
