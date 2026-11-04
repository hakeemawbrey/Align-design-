// nf16e19: MEET THE FAMILY, "Back Them Up" (35 s vertical, star_advice post, music: lofi · Am).
// Story 0–30.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–5.0    HOOK "When your uncle | *teases* your partner."  The table: Uncle ♌ Leo mid-gesture; ♓ Pisces (the partner)
//              shrinking. UNCLE: "so you draw cartoons… *for a living?*"
//   5.0–10.8   "Pisces: | *wobbling.*"  Pisces wobbles, first tears. ♍ Virgo, calm: "they're really good. show him!"
//              "the one you did *for me.*"
//   10.8–15.2  "The *drawing.*"  The sketchbook flips up: the two of them under a sky of stars. The uncle lights up:
//              "wait. that's *incredible.*"
//   15.2       card cut → NOTES: back them up in the moment · calm voice, no scene · check in with them after.
//   23.2–30.6  "Later, | *on the porch.*"  VIRGO: "you ok?" PISCES (happy tears): "I am *now.*"
//              THE STARS: "Stand right *next to them.*"
import { makeFamily, mark, hearts, sparkles, drawStarChar, signStar, drawPixelStar, R, box, prog, clamp, ease, lerp, BONE, GOLD, PINK, INK } from '../../nf16e13/famkit.js'

const VIR = signStar('virgo'), PIS = signStar('pisces')
function sketch(x, t, cx, cy, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -170, -125, 340, 250, '#fffaf0', { b: 6 })
  for (let i = 0; i < 7; i++) R(x, INK, -170 + 20 + i * 46, -134, 8, 18)
  R(x, '#1d1a4a', -150, -100, 300, 200)
  for (let i = 0; i < 9; i++) drawPixelStar(x, -130 + (i * 71) % 260, -84 + (i * 37) % 80, 16, 1, i % 2 ? GOLD : BONE)
  drawStarChar(x, -55, 40, 90, t, { color: VIR.color, mood: 'happy', seed: 1, glow: 0.4, tips: false, bob: 0 })
  drawStarChar(x, 55, 40, 90, t, { color: PIS.color, mood: 'heart', seed: 2, glow: 0.4, tips: false, bob: 0 })
  x.restore()
}
const TOPTS = { roastX: 400, plates: [[200, '#e8b25a'], [640, '#7fbf5a'], [880, '#e8b25a']], candles: [760] }
const EP = makeFamily({
  id: 'nf16e19', key: 'Am',
  cast: {
    you: { sign: 'virgo', role: 'VIRGO', acc: { scarf: '#9fe6b0' }, text: '#d8ffd8' },
    them: { sign: 'pisces', role: 'PISCES', acc: { beanie: '#ff8fb1' }, text: '#cfe4ff' },
    uncle: { sign: 'leo', role: 'UNCLE', acc: { bow: '#e8344e' }, text: '#ffe0b0' },
  },
  beats: [
    { len: 5.0, room: 'table', roomOpts: TOPTS, head: 'When your uncle | *teases* your partner.', pis: false,
      lines: [{ u: 0.6, who: 'uncle', text: 'so you draw cartoons… *for a living?*' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'uncle', { x: 215, y: 1020, s: 220, mood: 'sparkle', look: [1, 0], hops: [S.t0 - 0.1, S.t0 + 0.6, S.t0 + 1.6], squash: -0.04 })
        S.cast(x, t, 'them', { x: 640, y: lerp(1040, 1090, clamp(prog(u, 0.6, 2.6))), s: lerp(200, 170, clamp(prog(u, 0.6, 2.6))), mood: 'wide', look: [-1, 0] })
        S.cast(x, t, 'you', { x: 880, y: 1040, s: 200, mood: u > 2.0 ? 'squint' : 'neutral', look: [-1, 0] })
        mark(x, t, 215, 820, S.t0 - 1, S.t0 + 1.8, '!', GOLD)
      } },
    { len: 5.8, room: 'table', roomOpts: TOPTS, head: 'Pisces: | *wobbling.*', pis: false,
      lines: [{ u: 0.5, who: 'you', text: 'they’re really good. show him!' }, { u: 2.8, who: 'you', text: 'the one you did *for me.*' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'uncle', { x: 215, y: 1020, s: 220, mood: 'neutral', look: [1, 0] })
        S.cast(x, t, 'them', { x: 640, y: 1070, s: 190, mood: u > 2.8 ? 'sparkle' : 'wide', look: [1, 0], tears: u < 2.8 ? 1 : 2, squash: u < 2.8 ? 0.05 * Math.sin(t * 22) : 0 })
        S.cast(x, t, 'you', { x: 880, y: 1040, s: 200, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.5] })
      } },
    { len: 4.4, room: 'table', roomOpts: TOPTS, head: 'The *drawing.*', pis: false,
      lines: [{ u: 0.9, who: 'uncle', text: 'wait. that’s *incredible.*' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'uncle', { x: 215, y: 1020, s: 220, mood: u > 0.8 ? 'sparkle' : 'wide', look: [1, -0.4], hops: [S.t0 + 0.8, S.t0 + 1.1] })
        S.cast(x, t, 'them', { x: 640, y: 1050, s: 190, mood: 'happy', look: [-1, 0], tears: 2 })
        S.cast(x, t, 'you', { x: 880, y: 1040, s: 200, mood: 'happy', look: [-1, 0] })
        const k = ease.outBack(prog(u, 0, 0.45))
        sketch(x, t, 560, lerp(1100, 760, k), clamp(k), lerp(0.4, -0.04, k))
        sparkles(x, t, 560, 760, S.t0 + 0.45, 12, 220, 1, [GOLD, BONE, PINK])
      },
      cues: [['whoosh', 0.0, 0.35, 0.04], ['pluck', 0.45, 1318.51, 0.04, 0.5, 0], ['glitter', 0.45, 0.9]] },
    { len: 8.0, kind: 'notes', pis: false,
      tips: ['Back them up *in the moment.*', 'Calm voice. *No scene.*', 'Check in with them *after.*'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.9] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: 'happy', look: [-1, 0], tears: 2, hops: [S.t0 + 5.3] })
      } },
    { len: 7.4, room: 'porch', roomOpts: { doorX: 700 }, head: 'Later, | *on the porch.*', pis: false,
      lines: [{ u: 0.3, who: 'you', text: 'you ok?' }, { u: 1.6, who: 'them', text: 'I am *now.*' }],
      lastU: 3.4, last: 'Stand right *next to them.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        S.cast(x, t, 'you', { x: 300, y: 1090, s: 210, mood: 'happy', look: [1, 0], pop: ok })
        S.cast(x, t, 'them', { x: 500, y: 1090, s: 210, mood: u > 1.6 ? 'heart' : 'happy', look: [-1, 0], tears: 3, pop: ok, hops: [S.t0 + 1.6] })
        hearts(x, t, S.t0 + 1.7, 400, 920, { n: 6 })
      },
      cues: [['pluck', 1.6, 1174.66, 0.04, 0.5, 0], ['glitter', 1.7, 2.2]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
