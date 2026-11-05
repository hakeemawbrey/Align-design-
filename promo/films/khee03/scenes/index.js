// khee03: HEALING ERA, Ep 3 "Rereading the whole chat" (24 s vertical, Month 2 boost m15, star_advice post, synthwave · Cm).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Hard cut.
//   0.0    frame 0: Gemini on the kitchen floor at 3 a.m., the phone at arm's length, the chat a blur of scrolling,
//          DAY 2 on the wall. Hook: "Day 2. Rereading *everything.*"
//   0.6    whip zoom onto Gemini's blue-lit face; the kit's loading bar: "rereading… 1 of ∞" → "Error: no
//          new answers found". Gemini reads one old "ok" in two voices: "ok. (furious?)" / "ok. (fine?)"
//   6.4    THE STARS: "the answer isn't hiding in the *old texts.*" / "archive it. write your *own* page."
//   15.0   Gemini taps ARCHIVE (the chat flies off), opens a blank note and types "me, a list: 1. my laugh".
//          The calendar tears to DAY 6. Pisces sobs at an old voice-note icon.
//   21.7   Last line: "Stop rereading. Start *writing.*"  (accent lands at 23.05, holds to the last frame)
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, LAV, ink, glow } from '../../khee01/healkit.js'
import { kitchen, bigPhone } from '../../khee01/healset.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const LOAD = { at: 1.5, len: 2.6, label: 'rereading… 1 of ∞', stallAt: 99, error: 'Error: no new answers found', y: 760 }
const NOTE = ['me, a list:', '1. my laugh', '2. fast replies', '3. good friend']

function faceGlow(x, cx, cy, k = 1) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, cy, 260, 0.28 * k, '110,160,255'); x.restore() }

function s1(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 2 }, stoveClock: '3:02', dim: 0.15 })
  shadow(x, 320, FLOOR + 4, 280)
  hero(x, t, { x: 320, y: fy(290), s: 290, mood: u < 4.2 ? 'wide' : 'squint', look: [1, -0.3], blink: false, squash: 0.04 })
  faceGlow(x, 360, 1240)
  // the arm's-length phone, scrolling at full speed (slows to read one message at 4.2)
  const sc = u < 4.2 ? u * 2400 : 4.2 * 2400 + (u - 4.2) * 30
  bigPhone(x, t, 650, 1130, { w: 260, h: 450, rot: 0.1, mode: 'chat', scroll: sc, blurK: u < 4.2 ? 1 : 0, title: 'them ♡' })
  // thumb blur
  if (u < 4.2) for (let i = 0; i < 3; i++) { const p = ((u * 6 + i / 3) % 1); R(x, INK, 760, 1280 - p * 140, 26, 34); R(x, '#f2cf4a', 763, 1283 - p * 140, 20, 28) }
}
function s2(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 2 }, stoveClock: '3:09', dim: 0.5 })
  shadow(x, 540, 1300, 260)
  hero(x, t, { x: 540, y: 1185, s: 260, mood: u > 4 ? 'sparkle' : 'neutral', look: [0, -1], squash: 0.06 })
  bigPhone(x, t, 700, 1210, { w: 150, h: 250, rot: 0.2, mode: 'chat', scroll: 400 })
}
function s3(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 6 }, stoveClock: u < 1.6 ? '3:14' : '9:30', morning: lerp(0, 0.5, prog(u, 1.2, 2.6)) })
  shadow(x, 330, FLOOR + 4, 280)
  hero(x, t, { x: 330, y: fy(280), s: 280, mood: u < 0.9 ? 'neutral' : u < 1.6 ? 'wide' : 'happy', look: [1, -0.2], hops: [S.t0 + 0.9, S.t0 + 2.6, S.t0 + 4.4] })
  const fly = prog(u, 0.9, 1.6)
  const mode = u < 0.9 ? 'chat' : 'notes'
  bigPhone(x, t, 650, 1130, { w: 280, h: 470, rot: 0.06, mode, scroll: 900, title: mode === 'chat' ? 'them ♡' : 'notes', lines: NOTE, typed: prog(u, 1.7, 5.2) })
  // the ARCHIVE button, then the chat flying away
  if (u < 0.95) { const k = pop01(t, S.t0 + 0.2, 0.25, 2.4); x.save(); x.translate(650, 1290); x.scale(k, k); R(x, INK, -100, -30, 200, 60); R(x, '#e8344e', -94, -24, 188, 48); ink(x, 'ARCHIVE', 0, 2, { size: 30, col: BONE }); x.restore() }
  if (fly > 0 && fly < 1) { x.save(); x.translate(lerp(650, 1150, fly), lerp(1130, 500, fly) - Math.sin(Math.PI * fly) * 120); x.rotate(fly * 3); x.globalAlpha = 1 - fly; R(x, INK, -110, -170, 220, 340); R(x, '#1e1844', -104, -164, 208, 328); for (let i = 0; i < 4; i++) R(x, i % 2 ? '#5fa8ff' : BONE, -80 + (i % 2) * 60, -130 + i * 70, 120, 40); x.restore() }
}
function fin(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 6 }, stoveClock: '9:34', morning: 0.55, dim: 0.3 })
  shadow(x, 460, 1290, 280)
  hero(x, t, { x: 460, y: 1160, s: 300, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
  bigPhone(x, t, 720, 1150, { w: 220, h: 360, rot: 0.08, mode: 'notes', title: 'notes', lines: NOTE.slice(0, 3), typed: 1 })
}

const EP = makeHeal({
  id: 'khee03', sign: 'gemini', name: 'Gemini', len: 24, ending: 'cut',
  hook: 'Day 2. Rereading | *everything.*',
  brk: { kind: 'whip', at: 0.6, x: 330, y: 1180 },
  whip: { x: 560, y: 1150 },
  kit: [loadingBar(LOAD)], kitCues: loadingBarCues(LOAD),
  h1: 'Old texts *don’t* update.', h2: 'Archive. *Then* write.',
  lines: ['the answer isn’t hiding in the *old texts.*', 'archive it. write your *own* page.'],
  last: 'Stop rereading. | Start *writing.*', day: 2, dayTo: 6,
  bubbles: [
    { t0: 4.3, t1: 5.3, x: 360, y: 930, text: '“ok.” (furious?)', size: 40, tail: -0.2, col: '#ffd0a0' },
    { t0: 5.3, t1: 6.25, x: 420, y: 930, text: '“ok.” (fine?)', size: 40, tail: -0.3, col: '#cfe0ff' },
    { t0: 17.2, t1: 19.0, x: 420, y: 900, text: 'oh. i have a lot.', size: 40, tail: -0.4 },
  ],
  pis1: { x: 920, y: 1345, s: 160 }, pis3: { x: 930, y: 1352, s: 150 },
  s1, s2, s3, fin,
  cues: [...Array.from({ length: 12 }, (_, i) => ['tick', 0.1 + i * 0.33, 0.02]), ['pop', 4.3, 392, 0.04, -0.2], ['pop', 5.3, 784, 0.04, 0.2], ['pop', 15.2, 659.25, 0.04, 0], ['tick', 15.85, 0.06], ['whoosh', 15.9, 0.5, 0.04], ['glitter', 16.6, 17.0], ...Array.from({ length: 16 }, (_, i) => ['tick', 16.7 + i * 0.22, 0.015])],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void LAV
