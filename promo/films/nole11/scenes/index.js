// nole11: ONE-LINE ADVICE FOR YOUR SIGN, "Aquarius, when they say 'I missed you'." (12 s vertical, star_advice trial,
// music: dreamy · Ab). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Aquarius*, when they say | 'I *missed* you.'"  Aquarius frozen over a phone ("i missed you"), a
//             buffering ring spinning over its head and a loading bar crawling to 99%.
//   3.6       card flip.   3.6–7.6  THE STARS: "Say it back. | You *did.*"  Aquarius types "i missed you too" and goes
//             heart-eyed.  Pisces fountains.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function ring(x, t, cx, cy) {
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + Math.floor(t * 12) * Math.PI / 5; x.globalAlpha = 0.25 + 0.75 * (i / 10); R(x, BONE, cx + Math.cos(a) * 50 - 8, cy + Math.sin(a) * 50 - 8, 16, 16) }
  x.globalAlpha = 1
}
function sit(x, t, S) {
  const { hero } = S
  shadow(x, 300, 1360, 230)
  hero(x, t, { x: 300, y: 1190, s: 270, mood: 'wide', look: [1, 0], blink: false, bob: 0 })
  ring(x, t, 300, 900)
  const f = Math.min(0.99, 0.12 + ease.outCubic(prog(t, 0, 3.0)) * 0.87)
  box(x, 150, 1420, 300, 30, '#2a2148', { b: 5 }); R(x, SKYB, 150, 1420, 300 * f, 30)
  label(x, `LOADING… ${Math.round(f * 100)}%`, 300, 1490, { size: 26, col: SKYB })
  miniPhone(x, t, { cx: 790, cy: 1000, w: 380, h: 440, rot: 0.05, title: 'THEM ♡', buzz: [0], msgs: [{ at: -1, side: 'L', text: 'i missed you' }] })
}
function after(x, t, S) {
  const { hero, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1340, 200 * hk)
  hero(x, t, { x: 560, y: 1190, s: 220, pop: hk, mood: t > T.react + 0.4 ? 'heart' : 'neutral', look: [1, -0.5], blush: t > T.react ? 1 : 0, hops: [T.heroIn + 0.3, T.react + 0.4] })
  miniPhone(x, t, { cx: 830, cy: 1000, w: 360, h: 420, rot: 0.05, k: pop01(t, T.heroIn + 0.1, 0.35, 2) * ok, title: 'THEM ♡', size: 24, msgs: [
    { at: -1, side: 'L', text: 'i missed you' },
    { at: T.react, side: 'R', text: 'i missed you too' },
  ] })
  hearts(x, t, T.react + 0.4, 560, 1030, { n: 5, spread: 80 })
}
const EP = makeOneLine({
  id: 'nole11', sign: 'aquarius', name: 'Aquarius', len: 12,
  hook: '*Aquarius*, when they say | ‘I *missed* you.’',
  line: 'Say it back. | You *did.*',
  sit, after, tagX: 560,
  cues: [['pop', 0.02, 1318.51, 0.03, 0.3], ...Array.from({ length: 12 }, (_, i) => ['tick', r3(0.3 + i * 0.25), 0.015])],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
