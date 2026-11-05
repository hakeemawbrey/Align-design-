// kbxe04: BEFORE YOU TEXT YOUR EX, Ep 4, "They liked your story" (16 s vertical, star_advice post, chiptune · B).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: the last 0.45 s loop back into frame 0.
//   0.00   frame 0: Gemini mid-spin, the phone showing "♥ liked your story", the draft half typed, STOP mid-drop.
//          Hook "They liked your story. | *Don't* spiral."  0.35 STOP + freeze ("one heart. *forty* theories.")
//   1.7    hookkit loading bar: "decoding the like…" stalls at 99% → "Error: it was just a like"
//   5.2    the check: 1 What does a like actually say? 2 Am I asking for a sign? 3 Would I text if they hadn't?
//   11.7   instead: the phone goes in the pocket; Gemini laughs at dinner with Libra and Aquarius; Pisces cries.
//   14.0   "A like is not a *letter.*"
import {
  shortBX, loadingBar, roomCafe, pisces, sign, R, box, bubble, sparkles, drawBits, HEART, glowAt,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'saw that like. what does it mean'
const OLD = [{ stamp: 'JUN 30' }, { side: 'L', text: 'i think this is goodbye' }, { side: 'R', text: 'ok. bye' }, { stamp: 'TODAY · 8:02 PM' }, { side: 'L', text: '♥ liked your story' }]

function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  // little hearts popping off the phone (the like) + spin lines round Gemini
  for (let i = 0; i < 4; i++) { const p = ((t + 0.6) * 0.7 + i / 4) % 1; drawBits(x, HEART, { H: '#ff5c8a' }, 820 + Math.sin(i * 2 + t * 3) * 40, 760 - p * 300, 7, { alpha: 1 - p }) }
  for (let i = 0; i < 3; i++) { const a = t * 9 + i * 2.1; R(x, 'rgba(255,226,122,0.6)', 175 + Math.cos(a) * 150, 1240 + Math.sin(a) * 50, 26, 6) }
}

function instead(x, t, S, I) {
  roomCafe(x, t)
  const u = t - I.I0
  // the table
  box(x, 140, 1210, 800, 70, '#8a6442', { b: 6 }); R(x, INK, 300, 1280, 20, 160); R(x, INK, 760, 1280, 20, 160)
  for (const px of [330, 540, 750]) { box(x, px - 50, 1170, 100, 30, BONE, { b: 4 }); R(x, '#ff8f5a', px - 30, 1160, 60, 14) }
  const laugh = [I.I0 + 1.0, I.I0 + 1.3, I.I0 + 1.7, I.I0 + 2.1]
  sign(x, t, 'libra', { x: 250, y: 1030, s: 200, mood: 'happy', hops: laugh, seed: 5 })
  sign(x, t, 'aquarius', { x: 830, y: 1030, s: 200, mood: 'happy', hops: laugh.map(h => h + 0.1), seed: 8 })
  // Gemini: tucks the phone away, then laughs
  const tuck = ease.inOutCubic(prog(t, I.I0 + 0.1, I.I0 + 0.6))
  sign(x, t, 'gemini', { x: 540, y: 1010, s: 240, mood: u < 0.7 ? 'neutral' : 'happy', hops: [I.I0 + 0.7, ...laugh.map(h => h + 0.05)] })
  if (tuck < 1) { x.save(); x.translate(lerp(680, 640, tuck), lerp(930, 1240, tuck)); x.rotate(lerp(-0.3, 0.8, tuck)); R(x, INK, -36, -60, 72, 120); R(x, '#2b2350', -30, -54, 60, 108); x.restore() }
  if (u > 0.6 && u < 1.4) sparkles(x, t, 600, 1220, I.I0 + 0.6, 6, 60, 1, [GOLD, BONE])
  bubble(x, t, 540, 790, I.I0 + 1.0, I.D + 1, 'wait, start the story over', { size: 32 })
  pisces(x, t, { x: 960, y: 1440, s: 140, tears: 3, mood: 'happy', role: 'AT THE NEXT TABLE', pop: pop01(t, I.I0 + 0.4, 0.3, 2) })
  glowAt(x, 540, 1100, 500, '255,214,150', 0.12)
}

const LOAD = { at: 1.7, len: 2.5, label: 'decoding the like…', stallAt: 99, error: 'Error: it was just a like', y: 760 }

const EP = shortBX({
  id: 'kbxe04', sign: 'gemini', duration: 16, ending: 'loop', DE: 5.0, QL: 2.2,
  hook: { text: 'They liked your story. | *Don’t* spiral.', out: [4.7, 4.9], accentColor: '#ff7eb6' },
  rec: { sub: '8:02 PM', caption: 'one heart. *forty* theories.' },
  room: (x, t, S, a = 1) => roomCafe(x, t, { a }), contact: 'Casey', sub: 'liked your story', clock: '8:04 PM', draft: DRAFT, old: OLD, draftExtra,
  typed: null,
  hero: { x: 175, y: 1240, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.6] },
  pisRole: 'BEST FRIEND',
  flip: 4.3,
  stars: ['easy. one tap. *one.*', 'it’s a like. three questions.'],
  qs: [
    { q: 'What does a like actually say?', a: '…“I saw it.” that’s it.', mood: 'squint' },
    { q: 'Am I asking for a sign?', a: 'kinda. ok. yes.', mood: 'neutral', look: [0, 1] },
    { q: 'Would I text if they hadn’t?', a: 'no. I was fine at 7:59.', mood: 'happy' },
  ],
  head: 'Gemini read it | as a *like.*',
  lines: [{ t: 0.3, text: 'a like is just a *like.* go to dinner.' }],
  instead,
  last: 'A like is not | a *letter.*',
  kit: [[loadingBar, LOAD]],
  cues: I => [
    ['pop', I.I0 + 0.6, 659.25, 0.04, 0.2], ['whoosh', I.I0 + 0.15, 0.4, 0.03],
    ...[1.0, 1.3, 1.7, 2.1].map((d, i) => ['pop', +(I.I0 + d).toFixed(2), [987.77, 1174.66, 1318.51, 1567.98][i], 0.03, (i % 2 ? 0.3 : -0.3)]),
    ['pluck', I.I0 + 0.9, 659.25, 0.035, 0.5, 0.5], ['pluck', I.I0 + 1.04, 587.33, 0.035, 0.5, 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, clamp]
