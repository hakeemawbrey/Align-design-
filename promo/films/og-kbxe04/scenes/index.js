// og-kbxe04: the social rework of kbxe04 ("They liked your story"), star_advice. Same café, Gemini, the loading bar, the
// dinner with Libra and Aquarius; static HOOK (outline) from frame 0 instead of the slam title, no series bug, wilder Gemini.
// Kit: ./bxkit.js (og social copy of ../../kbxe01/bxkit.js; opening stretched 2.1 s so the hook reads over the draft).
//   0.00  frame 0: Gemini mid-spin, "liked your story" on the phone, hearts popping off it, thumb creeping to SEND.
//   2.45  STOP slams ("one heart. *forty* theories.")   3.8 loading bar "decoding the like…" → "Error: it was just a like"
//   7.3   the three questions   13.8 the instead: phone in the pocket, dinner, laughing.   16.1 "A like is not | a *letter.*"
import {
  shortBX, loadingBar, roomCafe, pisces, sign, R, box, bubble, sparkles, drawBits, HEART, glowAt,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD,
} from './bxkit.js'

const DRAFT = 'saw that like. what does it mean. both of us need to know'
const OLD = [{ stamp: 'JUN 30' }, { side: 'L', text: 'i think this is goodbye' }, { side: 'R', text: 'ok. bye' }, { stamp: 'TODAY · 8:02 PM' }, { side: 'L', text: 'liked your story' }]

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
  bubble(x, t, 540, 790, I.I0 + 1.0, I.D + 1, 'wait, start the story over. both of you', { size: 32 })
  pisces(x, t, { x: 870, y: 1400, s: 140, tears: 3, mood: 'happy', role: 'NEXT TABLE', pop: pop01(t, I.I0 + 0.4, 0.3, 2) })
  glowAt(x, 540, 1100, 500, '255,214,150', 0.12)
}

const LOAD = { at: 1.7, len: 2.5, label: 'running 40 theories…', stallAt: 99, error: 'Error: it was just a like', y: 760 }

const EP = shortBX({
  id: 'og-kbxe04', sign: 'gemini', duration: 16, ending: 'cut', DE: 5.0, QL: 2.2,
  rec: { caption: 'one heart. *forty* theories.' },
  room: (x, t, S, a = 1) => roomCafe(x, t, { a }), contact: 'Casey', sub: 'liked your story', clock: '8:04 PM', draft: DRAFT, old: OLD, draftExtra,
  typed: null,
  hero: { x: 175, y: 1240, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.6] },
  pisRole: 'BEST FRIEND',
  flip: 4.3,
  stars: ['Gemini. you made a *spreadsheet.*', 'about one tap. three questions.'],
  qs: [
    { q: 'What does a like actually say?', a: '…“I saw it.” (theory 41 is wild though)', mood: 'squint' },
    { q: 'Am I asking for a sign?', a: 'me: no. my twin: obviously.', mood: 'neutral', look: [0, 1] },
    { q: 'Would I text if they hadn’t?', a: 'no. I was THRIVING at 7:59.', mood: 'happy' },
  ],
  head: 'Gemini read it | as a *like.*',
  lines: [{ t: 0.3, text: 'theories: closed. *dinner:* open.' }],
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
export const LEAD = EP.T.L

// social hook: static caption from frame 0 (the film's own slam title is gone)
export const HOOK = 'They liked my story. | *Forty* theories.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4
