// npve15 · POV: You're Dating a ___ · ep 15 · "POV: you're dating a Gemini. The holiday party." (17 s vertical, funk · F)
// Story 0–12.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♊ GEMINI mid-wave at a crowded holiday party, already introducing you ("THIS IS MY PERSON!").
//   2.3–6.0   (1) it introduces you to everyone: Leo, Libra, Virgo… a bubble for each, rapid-fire.
//             GEMINI: "you know everyone now. *you're welcome.*"  Sticker: "you met *everyone*. in four seconds."
//   6.2       card cut: the balcony door. The party noise drops away.
//   6.3–9.8   (2, the turn) just the two of you, snow outside. GEMINI: "my favourite conversation? *this one.*"
//             Sticker: "*out of everyone*".
//   10.0      Last line: "Talks to everyone. *Picks* you."  Pisces cries happy tears at the party, then on the balcony.
import { makePOV, drawSet, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, bubble, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const GE = signStar('gemini'), GN = `${GE.glyph}︎ GEMINI`
const T = { intro: [0.0, 2.4, 3.2, 4.0], cut: 6.2, last: 10.0 }
const LINES = [
  { t: 4.7, speaker: GN, text: 'you know everyone now. *you’re welcome.*', color: '#ffe27a' },
  { t: 7.0, speaker: GN, text: 'my favourite conversation? *this one.*', color: '#ffe27a' },
]
const HOPS = [0.1, 0.5, ...T.intro.slice(1), ...talkHops(LINES, GN), T.last + 0.3, T.last + 0.8]
const GUESTS = [['leo', 760, 980], ['libra', 920, 1040], ['virgo', 640, 1060]]

const EP = makePOV({
  id: 'npve15', duration: 17,
  set: (x, t) => drawSet(x, t, t < T.cut ? 'party' : 'door'),
  caption: 'you’re dating a *Gemini.* The holiday party.',
  captionSize: 42,
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 4.5, close: 9.8 }],
  stickers: [
    { at: 5.1, out: [5.95, 6.1], text: 'you met *everyone*. in four seconds.', x: 540, y: 330, rot: -2.5, size: 40, kind: 'dark' },
    { at: 8.6, out: [9.6, 9.8], text: '*out of everyone*', x: 540, y: 330, rot: 2, size: 48, kind: 'you' },
  ],
  last: { at: T.last, text: 'Talks to everyone. *Picks* you.', color: '#ffe27a' },
  cuts: [T.cut],
  punch: [{ at: T.cut + 0.1, dur: 3.5, z: 0.08, x: 540, y: 1000 }],
  pitch: { [GN]: 987.77 },
  scene(x, t) {
    if (t < T.cut) {
      // the crowd
      pisces(x, t, { x: 540, y: 980, s: 120, tears: 2, mood: 'sparkle', look: [1, 0], pop: pop01(t, -1) })
      GUESTS.forEach(([id, gx, gy], i) => { const S = signStar(id), met = t > T.intro[i + 1]; drawStarChar(x, gx, gy, 170, t, { color: S.color, glyph: S.glyph, mood: met ? 'happy' : 'neutral', look: met ? [-1, 0] : [0, 0], hops: [T.intro[i + 1] + 0.1], seed: 20 + i, glow: 0.8 }) })
      const n = T.intro.filter(a => t > a).length - 1
      const tx = [500, 760, 920, 640][n], look = n === 0 ? [0, 0] : [1, 0]
      drawStarChar(x, 330, 1080, 340, t, { color: GE.color, glyph: GE.glyph, mood: t > 4.6 ? 'wink' : 'sparkle', look, hops: HOPS, seed: 7, glow: 1.1 })
      bubble(x, t, 350, 760, -1, 'THIS IS MY PERSON!', { size: 40, col: '#ffe27a', out: [2.2, 2.4] })
      ;['meet my person!', 'have you met?? my PERSON', 'MY PERSON. hi.'].forEach((s, i) => bubble(x, t, [700, 760, 620][i], [760, 700, 790][i], T.intro[i + 1], s, { size: 32, col: '#ffe27a', out: [T.intro[i + 1] + 0.75, T.intro[i + 1] + 0.85] }))
      void tx
    } else {
      // the balcony: quiet, snow, just the two of you
      pisces(x, t, { x: 820, y: 1000, s: 105, tears: t > T.last ? 3 : 2, mood: 'happy', look: [-1, 0], pop: 1 })
      const mood = t > T.last ? 'heart' : t > 7.4 ? 'happy' : 'neutral'
      drawStarChar(x, 480, 1080, 380, t, { color: GE.color, glyph: GE.glyph, mood, look: t < 6.9 ? [1, -0.4] : [0, 0], hops: HOPS, seed: 7, glow: 1.1, blush: t > 7.6 ? 1 : 0 })
      if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 500 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
      if (t > T.last) sparkles(x, t, 480, 1000, T.last + 0.35, 12, 240, 1, ['#ffe27a', GOLD, BONE])
    }
  },
  front(x, t) {
    // party chatter dots fade out after the cut
    if (t > T.cut && t < T.cut + 0.6) { x.fillStyle = `rgba(255,255,255,${0.5 * (1 - prog(t, T.cut, T.cut + 0.6))})`; x.fillRect(0, 0, 1080, 1920) }
  },
  cues: [
    ['pop', 0.2, 1396.91, 0.04, -0.3],
    ...T.intro.slice(1).map((a, i) => ['pop', r3(a + 0.05), [1046.5, 1174.66, 1396.91][i], 0.045, [0.2, 0.4, 0][i]]),
    ...T.intro.slice(1).map(a => ['clap', r3(a + 0.15), { gain: 0.06 }]),
    ['whoosh', r3(T.cut - 0.1), 0.6, 0.03], ['bell', r3(T.cut + 0.3), 1396.91, 0.022, 1.6, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
