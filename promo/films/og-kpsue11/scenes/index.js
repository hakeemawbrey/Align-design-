// og-kpsue11: social rework of kpsue11 (static HOOK, own kit copy ../sunkit.js: no series bug / slam title / loop; safe-zone layout; crazier lines). Was: "Aquarius Files a Bug Report" (24 s, star_talk post, synthwave · Gm). Hard cut.
// Frame 0: the Sun mid-zoom into the lab, Aquarius mid-type at a terminal, hook "AQUARIUS. That's not a bug."
//   3.0 Aquarius: filing a bug, unexpected warmth when they text · 6.2 TICKET #214 · 8.6 glitch FEELINGS.EXE
//   10.8 Sun: that's a crush, you can't patch it · 14.0 you can tell them · 16.0 "trying it" · 18.0 the text
//   19.4 "I like you too" · 19.6 Pisces sobs · 22.0 "Status: not a bug. A feature."
import { episode, drawPanel, drawPhone, hearts, rr, INK } from '../sunkit.js'

// og (calm): the glitch overlay (slice bars, camera jolt) becomes a still error box
const GL = { at: 8.6, len: 1.6 }
const ERR = [{ at: 8.75, text: 'has stopped responding' }, { at: 9.1, text: '[ PATCH ]     [ PANIC ]', color: '#c23a3a' }]
const TICKET = [{ at: 6.4, text: 'symptom: smiling at phone (4 hrs)' }, { at: 6.8, text: 'symptom: heart rate ↑↑↑' }, { at: 7.2, text: 'cause: Noor texted “hi”' }, { at: 7.6, text: 'fix: ???', color: '#c23a3a' }]
const MSGS = [{ at: 18.0, side: 'R', text: 'hey. I think I like you. this is not a bug report' }, { at: 19.4, side: 'L', text: 'lol. I like you too' }]

function terminal(x, t) {
  if (t > 17.6) return
  x.save(); x.translate(760, 1300); x.rotate(-0.03)   // og: inside the safe zone (was 830, 1440)
  x.fillStyle = INK; rr(x, -170, -150, 340, 250, 20); x.fill()
  x.fillStyle = '#071a14'; rr(x, -156, -136, 312, 222, 12); x.fill()
  x.fillStyle = '#7dffb0'; x.font = "700 20px 'Space Mono', monospace"; x.textAlign = 'left'
  const L = ['> new_ticket()', '> type: BUG', '> warmth: HIGH', '> source: their text', '> retry…', '> retry…']
  const n = Math.min(L.length, Math.floor(Math.max(0, t + 2) * 2))
  for (let i = 0; i < n; i++) x.fillText(L[i], -140, -104 + i * 30)
  if (Math.floor(t * 3) % 2) x.fillRect(-140, -104 + n * 30 - 16, 12, 20)
  x.fillStyle = INK; x.fillRect(-20, 100, 40, 50); rr(x, -90, 146, 180, 20, 8); x.fill()
  x.restore()
}

const E = episode({
  sign: 'aquarius', duration: 24, ending: 'cut',
  entrance: { kind: 'zoom', at: -0.6, x: 540, y: 600, size: 520 },
  hook: null,   // og: the static HOOK below replaces the slammed title
  tint: '#3fd0e0',
  sun: { mood: [[0, 'wide'], [0.6, 'sly'], [3.0, 'neutral'], [6.2, 'wide'], [8.6, 'wide'], [10.8, 'happy'], [14.0, 'proud'], [16.0, 'happy'], [19.4, 'love'], [22.0, 'happy']], shades: [[0, true], [10.7, false]], hops: [10.8, 11.3, 19.5] },
  me: {
    base: { x: 400, y: 1420, size: 300 },
    mood: [[0, 'squint'], [1.0, 'wide'], [3.0, 'neutral'], [6.2, 'squint'], [8.6, 'wide'], [10.8, 'wide'], [12.4, 'neutral'], [16.0, 'squint'], [17.8, 'neutral'], [19.4, 'heart'], [22.0, 'happy']],
    look: [[0, [1, 0]], [1.0, [0, -1]], [3.0, [0, 0]], [6.2, [0, -1]], [17.8, [1, -1]], [22.0, [0, 0]]],
    sweat: [[8.6, true], [10.6, false]],
    hops: [19.5, 19.8, 20.1],
  },
  bubbles: [
    { t0: 3.0, t1: 6.0, who: 'aquarius', text: 'Filing a bug: *unexpected warmth* when they text. Severity: CRITICAL.' },
    { t0: 10.8, t1: 13.8, who: 'sun', text: 'AQUARIUS! That’s a CRUSH. You can’t *patch* it.', y: 1070 },
    { t0: 14.0, t1: 15.8, who: 'sun', text: 'You can *tell them,* though.', y: 1070 },
    { t0: 16.0, t1: 17.8, who: 'aquarius', text: '…Unusual approach. Deploying to *production.*' },
    { t0: 20.2, t1: 21.8, who: 'pisces', text: 'It’s not a bug, it’s LOVE. *Sobbing.*', y: 1470, tail: 300 },
    { t0: 22.0, who: 'aquarius', text: 'Status: not a bug. *A feature.*', size: 50, x: 470, maxW: 720, tail: -60 },
  ],
  pisces: { at: 19.6, tears: [[19.6, 3]], hops: [20.2, 20.6] },
  front(x, t) {
    terminal(x, t)
    const pv = (a, b) => Math.min(1, Math.max(0, (t - a) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - b) / 0.3)))
    const p1 = pv(6.2, 8.35)   // og: the report leaves before the error box (no overlap)
    if (p1 > 0.01) drawPanel(x, t, { x: 540, y: 1020, w: 760, h: 400, title: 'BUG REPORT #214', color: '#7dffb0', paper: '#effff7', pop: p1, rows: TICKET, size: 36 })
    const pe = pv(GL.at, GL.at + GL.len)
    if (pe > 0.01) drawPanel(x, t, { x: 540, y: 1020, w: 820, h: 300, title: 'FEELINGS.EXE', color: '#ff7a9a', paper: '#fff0f3', pop: pe, rows: ERR, size: 38 })
    const ph = pv(17.8, 21.9)
    if (ph > 0.01) drawPhone(x, t, { x: 540, y: 960, s: 0.95, pop: ph, title: 'Noor', msgs: MSGS, typing: [18.4, 19.4] })
    hearts(x, t, { at: 19.5, cx: 540, cy: 900, color: '#7fe0ff' })
  },
  cues: [['pop', GL.at, 523.25, 0.04, 0], ...ERR.map((r, i) => ['chip', r.at, 660 + i * 120, 0.05, { gain: 0.02 }]), ...TICKET.map((r, i) => ['chip', r.at, 880 + i * 110, 0.06, { gain: 0.02 }]), ['whoosh', 18.0, 0.3, 0.06], ['pop', 19.4, 1318.51, 0.05, 0.3], ['glitter', 19.4, 20.0]],
})
export const { DURATION, SCENES, CUES } = E

export const HOOK = 'Filed a bug report | on my *crush.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.9
