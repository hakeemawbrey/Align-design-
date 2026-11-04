// npve03 · POV: You're Dating a ___ · ep 3 · "POV: you're dating a Gemini." (20 s vertical, funk · G)
// Story 0–15.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.4   hook: ♊ GEMINI on the sofa mid-story, two speech bubbles going at once ("so THEN—" / "wait, also—").
//   2.4–5.7   (1) three stories start (the bus, the cousin's cat, the dream)… each one cut off: "anyway—".
//             Sticker: "three stories. *zero* endings."
//   5.7–9.0   (2) nicknames: name tags slap down in front of you, one after another. GEMINI: "hi, *snowflake.* hi, captain."
//   9.15      card cut.
//   9.3–12.7  (3, the twist) the three stories fly back together and click into one: "…and that's why I *like you.*"
//             Sticker: "wait. it was *one* story?"
//   12.95     Last line: "Every *tangent* leads to you."  Pisces, outside the window, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, bubble, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, YOU, INTER, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const GE = signStar('gemini'), GN = `${GE.glyph}︎ GEMINI`
const T = { s1: 2.5, s2: 3.4, s3: 4.3, tags: [5.9, 6.5, 7.1, 7.7], cut: 9.15, merge: [9.4, 10.2], last: 12.95 }
const LINES = [
  { t: 2.5, speaker: GN, text: 'anyway— oh! that reminds me—', color: '#ffe27a' },
  { t: 6.1, speaker: GN, text: 'hi, *snowflake.* hi, captain.', color: '#ffe27a' },
  { t: 10.3, speaker: GN, text: '…and that’s why I *like you.*', color: '#ffe27a' },
]
const HOPS = [...talkHops(LINES, GN), ...T.tags, T.merge[1], T.last + 0.3, T.last + 0.8]
const STORIES = [['so this guy on the bus—', 600, 470, -0.04], ['my cousin’s cat—', 800, 640, 0.05], ['I had this dream—', 330, 590, -0.02]]
const TAGS = ['SNOWFLAKE', 'CAPTAIN', 'BEAN', 'MY PERSON']

function tag(x, t, i) {
  const at = T.tags[i]; if (t < at) return
  const k = ease.outBack(prog(t, at, at + 0.22), 2.2), o = outK(t, [T.cut - 0.3, T.cut])
  if (o <= 0) return
  const cx = [290, 790, 400, 690][i], cy = [1195, 1210, 1335, 1335][i], rot = [-0.12, 0.1, 0.06, -0.07][i]
  x.save(); x.translate(cx, cy - (1 - k) * 200); x.rotate(rot); x.scale(o, o)
  R(x, INK, -150, -66, 300, 132); R(x, '#e8283c', -144, -60, 288, 40); R(x, '#fff8ef', -144, -20, 288, 74)
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff8ef'; x.font = `800 18px ${INTER}`; x.fillText('HELLO, I’M', 0, -40)
  x.fillStyle = INK; x.font = `800 ${TAGS[i].length > 8 ? 30 : 36}px ${INTER}`; x.fillText(TAGS[i], 0, 18)
  x.restore()
}

const EP = makePOV({
  id: 'npve03', duration: 20, set: 'sofa',
  caption: 'you’re dating a *Gemini.*',
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 2.3, close: 12.75 }],
  stickers: [
    { at: 4.9, out: [5.6, 5.8], text: 'three stories. *zero* endings.', x: 540, y: 330, rot: -2.5, size: 42, kind: 'dark' },
    { at: 8.1, out: [8.95, 9.1], text: 'a new *nickname* every minute', x: 540, y: 330, rot: 2, size: 42, kind: 'you' },
    { at: 10.9, out: [12.6, 12.8], text: 'wait. it was *one* story?', x: 540, y: 330, rot: -2, size: 44, kind: 'light' },
  ],
  last: { at: T.last, text: 'Every *tangent* leads to you.', color: '#ffe27a' },
  cuts: [T.cut],
  punch: [{ at: T.s1, dur: 2.6, z: 0.06, x: 540, y: 800 }, { at: T.merge[1], dur: 1.3, z: 0.12, x: 560, y: 1000 }],
  pitch: { [GN]: 987.77 },
  scene(x, t) {
    pisces(x, t, { x: 190, y: 750, s: 115, tears: t > T.last ? 3 : t > T.merge[0] ? 2 : 1, mood: t > T.merge[0] ? 'happy' : 'sparkle', look: [1, 0.3], pop: pop01(t, -1) })
    let mood = 'sparkle', look = [0, 0]
    if (t < 2.4) { mood = (t % 0.8) < 0.4 ? 'wide' : 'happy'; look = [(t % 1.2) < 0.6 ? -1 : 1, -0.5] }
    else if (t < 5.7) { mood = 'happy'; look = [[-1, 1, -0.5][Math.floor((t - 2.4) / 1.1) % 3], -0.6] }
    else if (t < T.cut) mood = 'wink'
    else if (t < T.merge[1]) { mood = 'squint'; look = [0, -1] }
    else mood = t > T.last ? 'heart' : 'happy'
    drawStarChar(x, 560, 1000, 340, t, { color: GE.color, glyph: GE.glyph, mood, look, hops: [...HOPS, ...(t < 2.4 ? [0.2, 0.9, 1.6] : [])], seed: 7, glow: 1.1, blush: t > T.merge[1] ? 1 : 0 })
    // hook: two bubbles at once
    bubble(x, t, 720, 560, -1, 'so THEN—', { size: 40, out: [2.2, 2.4] })
    bubble(x, t, 400, 470, -1, 'wait, also—', { size: 40, col: '#ffe27a', out: [2.2, 2.4] })
    // (1) three stories, each cut off; (3) they fly back and merge into one
    STORIES.forEach(([txt, bx, by, rot], i) => {
      const at = [T.s1, T.s2, T.s3][i]
      if (t < T.cut) { bubble(x, t, bx, by, at, txt, { size: 32, out: [5.5, 5.75] }); if (t > at + 0.65 && t < 5.6) { x.save(); x.translate(bx + 120, by - 50); x.rotate(rot * 4); x.font = `800 28px ${INTER}`; x.fillStyle = HOT; x.textAlign = 'center'; x.fillText('anyway—', 0, 0); x.restore() } }
      else if (t < T.merge[1]) { const k = ease.inOutCubic(prog(t, T.merge[0] + i * 0.1, T.merge[1])); bubble(x, t, lerp(bx, 540, k), lerp(by, 620, k), T.cut, txt, { size: 32 * (1 - 0.5 * k) }) }
    })
    if (t > T.merge[1]) { sparkles(x, t, 540, 620, T.merge[1], 12, 200, 2, [GOLD, BONE, HOT]); bubble(x, t, 540, 620, T.merge[1], 'THE END (it was about you)', { size: 34, col: '#ffe27a', out: [12.6, 12.85] }) }
    for (let i = 0; i < 4; i++) tag(x, t, i)
    if (t > T.last) { sparkles(x, t, 560, 900, T.last + 0.35, 12, 240, 1, ['#ffe27a', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 560 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 860 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  cues: [
    ['pop', 0.2, 1174.66, 0.03, -0.3], ['pop', 0.5, 1396.91, 0.03, 0.3],
    ['pop', r3(T.s1), 880, 0.035, -0.3], ['pop', r3(T.s2), 987.77, 0.035, 0.3], ['pop', r3(T.s3), 1174.66, 0.035, 0],
    ['tick', r3(T.s1 + 0.7), 0.05], ['tick', r3(T.s2 + 0.7), 0.05], ['tick', r3(T.s3 + 0.7), 0.05],
    ...T.tags.flatMap((a, i) => [['tick', r3(a + 0.18), 0.07], ['clap', r3(a + 0.2), { gain: 0.08, pan: i % 2 ? 0.3 : -0.3 }]]),
    ['whoosh', r3(T.merge[0]), 0.7, 0.03], ['riser', r3(T.merge[0]), r3(T.merge[1]), 0.014], ['bell', r3(T.merge[1]), 1567.98, 0.03, 1, 0], ['glitter', r3(T.merge[1]), r3(T.merge[1] + 0.6)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
