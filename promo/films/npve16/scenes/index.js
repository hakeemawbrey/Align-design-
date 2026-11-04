// npve16 · POV: You're Dating a ___ · ep 16 · "POV: you're dating a Cancer. The ornament." (17 s vertical, dreamy · Eb)
// Story 0–12.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♋ CANCER by its family's tree, holding out a small handmade ornament with a little you painted on it.
//   2.3–6.0   (1) it's a bit lopsided. CANCER: "I made it. it's a little *lopsided.*"  Sticker: "*handmade.* slightly wonky."
//   6.2       card cut.
//   6.3–9.8   (2, the turn) the camera drifts to the tree: the twin ornament already hangs there, front and centre.
//             CANCER: "there's one on *our* tree too."  Sticker: "you're *family* now".
//   10.0      Last line: "You're on the *tree* now."  Pisces, by the window, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, beanie, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, YOU, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const CA = signStar('cancer'), CN = `${CA.glyph}︎ CANCER`
const T = { wobble: 3.4, cut: 6.2, look: [6.4, 7.2], last: 10.0 }
const LINES = [
  { t: 2.4, speaker: CN, text: 'I made it. it’s a little *lopsided.*', color: '#9fd8ff' },
  { t: 7.3, speaker: CN, text: 'there’s one on *our* tree too.', color: '#9fd8ff' },
]
const HOPS = [0.2, ...talkHops(LINES, CN), T.look[1], T.last + 0.3, T.last + 0.8]

export function ornament(x, t, cx, cy, s = 1, sway = 0) {
  x.save(); x.translate(cx, cy); x.rotate(sway); x.scale(s, s)
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, -130); x.lineTo(0, -82); x.stroke()
  R(x, INK, -24, -90, 48, 30); R(x, GOLD, -19, -86, 38, 22)
  // a lopsided bauble
  x.fillStyle = INK; x.beginPath(); x.ellipse(4, 0, 84, 74, 0.25, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d8344f'; x.beginPath(); x.ellipse(4, 0, 77, 67, 0.25, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff6a7a'; x.beginPath(); x.ellipse(-24, -24, 22, 16, -0.5, 0, Math.PI * 2); x.fill()
  // a little you, painted on (a bit smudged)
  drawStarChar(x, 8, 12, 80, t, { color: YOU, mood: 'happy', look: [0, 0], seed: 3, tips: false, bob: 0 })
  x.restore()
}

const EP = makePOV({
  id: 'npve16', duration: 17, set: 'party',
  caption: 'you’re dating a *Cancer.* The ornament.',
  captionSize: 44,
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 2.2, close: 9.8 }],
  stickers: [
    { at: 3.6, out: [5.95, 6.1], text: '*handmade.* slightly wonky.', x: 540, y: 330, rot: -2.5, size: 44, kind: 'light' },
    { at: 8.4, out: [9.6, 9.8], text: 'you’re *family* now', x: 540, y: 330, rot: 2, size: 48, kind: 'you' },
  ],
  last: { at: T.last, text: 'You’re on the *tree* now.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: 0.3, dur: 2.6, z: 0.06, x: 640, y: 1000 }, { at: T.look[0], dur: 3.2, z: 0.3, x: 250, y: 860 }],
  pitch: { [CN]: 659.25 },
  scene(x, t) {
    pisces(x, t, { x: 860, y: 760, s: 110, tears: t > T.last ? 3 : t > T.look[1] ? 2 : 1, mood: t > T.look[1] ? 'happy' : 'sparkle', look: [-1, 0.3], pop: pop01(t, -1) })
    // the twin ornament on the tree
    if (t > T.cut) ornament(x, t, 250, 880, 0.55, 0.08 * Math.sin(t * 1.6))
    if (t > T.look[1]) sparkles(x, t, 250, 880, T.look[1], 10, 110, 1, [GOLD, BONE, HOT])
    let mood = 'sparkle', look = [0, 0]
    if (t > T.wobble) { mood = 'happy'; look = [0.5, 0.4] }
    if (t > T.cut) { mood = 'happy'; look = [-1, -0.2] }
    if (t > 8.2) { mood = 'sparkle'; look = [0, 0] }
    if (t > T.last) mood = 'heart'
    const o = { x: 620, y: 1060, s: 340, hops: HOPS, seed: 5 }
    drawStarChar(x, o.x, o.y, o.s, t, { color: CA.color, glyph: CA.glyph, mood, look, hops: HOPS, seed: 5, glow: 1.1, blush: t > T.look[1] ? 1 : 0 })
    beanie(x, t, o, '#5fb8ff')
    // the one in its hand
    if (t < T.cut) ornament(x, t, 840, 1000, 1.0 * pop01(t, -1), 0.12 * Math.sin(t * 2.2) + (t > T.wobble && t < T.wobble + 0.8 ? 0.25 * Math.sin((t - T.wobble) * 20) * (1 - prog(t, T.wobble, T.wobble + 0.8)) : 0))
    if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 500 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
  },
  cues: [
    ['bell', 0.25, 1244.51, 0.025, 1.2, 0.3],
    ['tick', r3(T.wobble), 0.04], ['tick', r3(T.wobble + 0.15), 0.035], ['pop', r3(T.wobble + 0.3), 622.25, 0.035, 0.3],
    ['whoosh', r3(T.look[0]), 0.8, 0.025], ['bell', r3(T.look[1]), 1567.98, 0.03, 1.4, -0.3], ['glitter', r3(T.look[1]), r3(T.look[1] + 0.6)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
