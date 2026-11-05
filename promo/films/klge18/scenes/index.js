// klge18 · Your Sign's Love Glitch · "Capricorn.exe: Shows, Never Says" (LONG, 70 s vertical, star_advice post, hard cut).
//   0.0   frame 0: CAPRICORN.EXE: love sent as chores. Cap mid-fix of a leaking pipe at midnight, wrench up, water
//         dripping; its partner (a Pisces star) holds a note: "do you love me?" Promise: wait for the patch notes.
//   CH 1  THE GLITCH (3.0): fixes the shelf, plans the trip (14 tabs), does both their taxes; the partner: "…but do
//         you like me?" Cap: "i fixed the sink?" CHORES 37 · WORDS 0.
//   CH 2  WHERE IT COMES FROM (20.0): ★ astrology says: Capricorn is ruled by Saturn. THE STARS: steady effort is the
//         gift, but some people need the words too. WORDS.EXE: "i l…" deleted.
//   CH 3  WHAT IT COSTS (35.0): "i know you DO things. i need to HEAR it." Error: LOVE NOT RECEIVED. Pisces x2.
//   CH 4  PATCH NOTES (50.0): CAPRICORN.EXE 2.0; notes: say it with words too · once a day is plenty · keep doing
//         the shelves. 60.6 terrified: "i… love you." The partner happy-sobs: "I KNOW. but WOW."
//   66.5  last line "Say it *out loud* once.", held to the cut at 70.0.
import { makeGlitch, R, box, label, bubble, hearts, sparkles, sticker, confetti, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const CH = [3.0, 20.0, 35.0, 50.0]
const CX = 300, CY = 1200, PX = 780, PY = 1200
const SAY = 60.6
const TASKS = [[4.0, 'SHELF: FIXED ✓'], [8.5, 'TRIP: PLANNED (14 TABS) ✓'], [12.5, 'TAXES: BOTH DONE ✓']]
function pipe(x, t, fixed) {
  R(x, INK, 120, 600, 34, 380); R(x, '#9aa0b8', 126, 600, 22, 380); R(x, INK, 120, 960, 220, 34); R(x, '#9aa0b8', 126, 966, 208, 22)
  if (!fixed) for (let i = 0; i < 3; i++) { const p = ((t * 1.6 + i / 3) % 1); R(x, '#8fd8ff', 300, 1000 + p * 200, 12, 18) }
}
function wrench(x, t, px, py, rot) { x.save(); x.translate(px, py); x.rotate(rot); R(x, INK, -10, -90, 20, 150); R(x, '#c9c2de', -6, -86, 12, 142); R(x, INK, -26, -112, 52, 34); R(x, '#c9c2de', -22, -108, 44, 14); R(x, '#1b1438', -8, -112, 16, 14); x.restore() }
function taskProp(x, t, i) {
  const [at] = TASKS[i]
  const k = pop01(t, at, 0.3, 2.2) * outK(t, [at + 3.8, at + 4.1])
  if (k <= 0.01) return
  x.save(); x.translate(560, 780); x.scale(k, k)
  if (i === 0) { box(x, -200, -20, 400, 30, '#8a5a3a', { b: 5 }); for (let j = 0; j < 5; j++) box(x, -170 + j * 70, -90, 40, 70, ['#e8344e', '#3fb6f0', '#f2c75c', '#9fe6b0', '#c9a6ff'][j], { b: 3 }) }
  if (i === 1) { box(x, -220, -120, 440, 220, '#f4f0fa', { b: 5 }); for (let j = 0; j < 7; j++) R(x, ['#2fc79a', '#d8d0ec'][j % 2], -210 + j * 60, -114, 56, 26); for (let j = 0; j < 5; j++) R(x, '#7a6aa8', -190, -60 + j * 30, 300 - (j % 3) * 60, 10) }
  if (i === 2) { for (let j = 0; j < 6; j++) box(x, -120 + j * 6, 60 - j * 26, 240, 20, '#f4f0fa', { b: 3 }) }
  x.restore()
  sticker(x, t, TASKS[i][1], 560, 940, at + 0.6, at + 4.0, { col: MINT, size: 32, rot: -0.04 })
}
function wordsExe(x, t) {
  const k = pop01(t, 28.8, 0.3, 2.2) * outK(t, [34.6, 34.9])
  if (k <= 0.01) return
  x.save(); x.translate(560, 800); x.scale(k, k)
  box(x, -300, -130, 600, 260, '#120d26', { b: 6 }); R(x, '#1f8a6a', -300, -130, 600, 52); label(x, 'WORDS.EXE', 0, -104, { size: 24, col: BONE })
  const seq = [[29.4, 'i'], [29.8, 'i l'], [30.2, 'i lo'], [30.9, 'i l'], [31.2, 'i'], [31.5, ''], [32.2, 'i fixed the sink'], [33.2, '']]
  let s = ''; for (const [a, v] of seq) if (t >= a) s = v
  label(x, s + (Math.floor(t * 3) % 2 ? '|' : ''), -260, 10, { size: 52, align: 'left', col: BONE, font: INTER, weight: 900 })
  label(x, 'loading courage… 3%', 0, 92, { size: 24, col: '#ff9aa8' })
  x.restore()
}

function scene(x, t, K) {
  R(x, '#141034', 70, 556, 940, 880); R(x, '#241c44', 70, 1330, 940, 106)
  const said = t >= SAY
  // the midnight clock
  box(x, 820, 620, 160, 70, '#1a1338', { b: 4 }); label(x, t < CH[1] ? '12:00' : t < CH[2] ? '12:40' : t < CH[3] ? '1:15' : '1:30', 900, 656, { size: 36, col: RED, font: INTER, weight: 900 })
  pipe(x, t, t > 3.0)
  for (let i = 0; i < 3; i++) taskProp(x, t, i)
  wordsExe(x, t)
  // counter
  if (t >= 3 && t < CH[2]) { const n = Math.min(37, Math.floor((t - 3) * 2.4)); box(x, 610, 1360, 380, 56, '#1a1338', { b: 4 }); label(x, `CHORES: ${n}   WORDS: 0`, 800, 1389, { size: 26, col: GOLD, font: INTER, weight: 900 }) }
  // the partner (Pisces star), with the note
  const apart = t >= CH[2] && !said
  K.star(x, t, 'pisces', apart ? PX + 60 : PX, PY, 240, { mood: said ? 'heart' : apart ? 'neutral' : 'wide', look: [-1, 0], seed: 6, tears: said ? 3 : apart ? 2 : 1, hops: [16.0, 36.0, SAY + 1.4, SAY + 1.8] })
  if (t < 3) { x.save(); x.translate(PX - 10, 1000); x.rotate(0.08); box(x, -130, -40, 260, 80, '#fff3a8', { b: 4 }); label(x, 'do you love me?', 0, 2, { size: 28, col: INK, font: INTER, weight: 800 }); x.restore() }
  // Capricorn: busy, then frozen, then brave
  const busy = !said && t < CH[1]
  K.hero(x, t, CX, CY, 260, { mood: said ? (t > SAY + 1.4 ? 'happy' : 'wide') : t > 40.5 && t < 43 ? 'wide' : busy ? 'squint' : 'neutral', look: said ? [1, 0] : busy ? [-1, -1] : [1, 0], squash: t > SAY - 0.4 && t < SAY + 0.6 ? 0.08 : 0, hops: [4.0, 4.4, 4.8, 8.5, 12.5, 13.0, 16.6, SAY, SAY + 1.4] })
  if (busy) wrench(x, t, CX - 120, 1010, -0.6 + Math.sin(t * 8) * 0.3)
  if (said && t < SAY + 0.8) for (let i = 0; i < 2; i++) R(x, '#8fd8ff', CX + 100 + i * 24, 1030 + i * 26, 12, 18)
  bubble(x, t, PX - 40, 960, 16.0, 19.6, '…but do you *like* me?'.replace(/\*/g, ''), { size: 28, col: '#e0e0ff', maxW: 340 })
  bubble(x, t, CX + 40, 960, 16.9, 19.8, 'i fixed the sink?', { size: 30 })
  bubble(x, t, PX - 20, 940, 36.0, 40.3, 'i know you DO things. i need to HEAR it.', { size: 28, col: '#e0e0ff', maxW: 380 })
  bubble(x, t, CX + 40, 960, SAY, 64.2, 'i… love you.', { size: 36 })
  bubble(x, t, PX - 30, 930, SAY + 1.4, 66.2, 'I KNOW. but WOW.', { size: 32, col: '#e0e0ff' })
  if (t > SAY + 1.4) { hearts(x, t, SAY + 1.4, 540, 1060, { n: 8 }); confetti(x, t, SAY + 1.4, 540, 900) }
}

const F = makeGlitch({
  id: 'klge18', sign: 'capricorn', len: 70, ending: 'cut',
  hook: 'CAPRICORN.EXE: love sent as *chores.*',
  promise: 'wait for the *patch notes* ↓',
  err: { msg: ['Message: "do you love me?"', 'Reply: *fixes pipe*'], out: 2.75 },
  notResp: [[-1, 2.7], [40.5, 42.5]],
  hits: [
    { kind: 'whip', at: 0.5, x: CX - 100, y: 1000, z: 0.4, hold: 0.5 }, { kind: 'shake', at: 4.0, dur: 0.3, amp: 10 }, { kind: 'whip', at: 8.5, x: 560, y: 780, z: 0.3, hold: 0.8 }, { kind: 'scratch', at: 16.9, dur: 0.6 },
    { kind: 'flash', at: 28.8, col: '#1f8a6a' }, { kind: 'whip', at: 36.0, x: PX, y: 1050, z: 0.3, hold: 1.0 }, { kind: 'glitch', at: 40.5, dur: 0.6 },
    { kind: 'shake', at: SAY - 0.4, dur: 0.6, amp: 10 }, { kind: 'flash', at: SAY + 1.4, col: GOLD },
  ],
  chapters: [{ at: CH[0], n: 1, text: 'THE GLITCH' }, { at: CH[1], n: 2, text: 'WHERE IT COMES FROM' }, { at: CH[2], n: 3, text: 'WHAT IT COSTS' }, { at: CH[3], n: 4, text: 'PATCH NOTES' }],
  caps: [
    { at: 5.6, out: 15.8, text: 'every feeling becomes a *chore*' },
    { at: 22.6, out: 28.6, text: '★ astrology says: Capricorn is ruled by *Saturn*', size: 56 },
    { at: 29.0, out: 34.7, text: 'the words feel *scarier* than the pipes' },
    { at: 46.2, out: 49.8, text: 'unsaid love can feel like *no* love' },
  ],
  errs: [{ at: 40.5, out: 42.5, msg: ['LOVE NOT RECEIVED.', 'Format: unsupported.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 42.8, out: 45.8, text: 'i’m crying for both of us *sob*', tears: 3 }],
  stars: [{ t: 20.6, text: 'steady effort is your *gift.*' }, { t: 23.4, text: 'but some people need the *words* too.' }],
  box: [{ open: 20.35, close: 28.4 }],
  patch: { at: CH[3] + 0.5, ver: '2.0', name: 'CAPRICORN.EXE 2.0', dur: 1.5, out: 53.2 },
  notes: { at: 53.3, out: 60.4, ver: '2.0', gap: 1.9, items: ['say it with *words* too.', 'once a day is *plenty.*', 'keep doing the *shelves.*'] },
  last: { at: 66.5, text: 'Say it *out loud* once.' },
  trayCry: t => t > SAY + 1.4 ? 3 : 2,
  scene, accent: '#1f8a6a',
  cues: [...[4.0, 4.4, 4.8].map(t => ['tick', t, 0.07]), ['pop', 8.5, 783.99, 0.04, 0], ['pop', 12.5, 783.99, 0.04, 0], ...TASKS.map(([a]) => ['bell', +(a + 0.6).toFixed(2), 1174.66, 0.03, 0.8, 0]), ['pop', 16.0, 659.25, 0.04, 0.3], ['pop', 16.9, 880, 0.04, -0.3], ['pop', 36.0, 523.25, 0.04, 0.3], ['pop', SAY, 880, 0.05, 0], ['bell', SAY + 1.4, 1567.98, 0.05, 1.4, 0], ['glitter', SAY + 1.4, SAY + 2.6]],
  music: { style: 'cinematic', key: 'Cm', seed: 1818, drop: 3.0, breakdown: [28.8, 42.8], lift: [CH[3], SAY] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
