// kbne18: BREAKING NEWS: THE STARS, Ep 18 (long) · "Decision Desk: Who Texts First" (80 s vertical, star_talk post,
// music: funk · G). No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
// Promise up front: "RESULTS AT THE END". Five chapter stickers.
//   1 THE RACE (0–16): frame 0: the results wall, a split screen of ♉ Taurus and ♊ Gemini pacing with phones, a TOO CLOSE TO
//     CALL slab mid-slam. Hook: "BREAKING: Nobody has texted first. | *Yet.*" The desk sets it up; the BIG BOARD shows both
//     typing bars rising and falling.
//   2 TAURUS HQ (16–30): "had fun" typed and deleted three times. "if I text first, is that too *eager?*"
//   3 GEMINI HQ (30–44): seven drafts, all paragraphs. "is a paragraph too much? asking for *me.*"
//   4 THE FORECAST (44–58): ♓ Pisces at the map, crying: pockets of hope, scattered nerves, butterflies by morning.
//   5 RESULTS (58–80): both hit SEND at 10:42 the same second: "had fun!! again soon?" ×2. The board: BOTH WIN. Confetti.
//     Pisces sobs; THE STARS: "turns out you can *both* go first." Last headline (78.8): "Results: you | *both* won."
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, phone, livingRoom, weather, caught, bubble, chip, txt, px, sparkles, tears, slam, stamp, promise, chap,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, TEAR, PINK, CYAN, GREEN,
} from '../../kbne01/newskit.js'
import { chapter, chapterCues } from '../../hookkit.js'

const D = 80
const T = {
  slam: 0.15, desk: 1.3, board: 8.0,
  ch2: 16.0, tdraft: [17.4, 19.4, 21.4],
  ch3: 30.0, gdraft: [31.0, 31.9, 32.8, 33.7, 34.6, 35.5, 36.4],
  ch4: 44.0,
  ch5: 58.0, split: 60.5, send: 62.0, win: 63.6, read: 67.0, deskF: 71.0, last: 78.8,
}
const CUTS = [T.desk, T.board, T.ch2, T.ch3, T.ch4, T.ch5, T.split, T.win, T.read, T.deskF]
const CH = [chap(T.desk + 0.1, 1, 'The race'), chap(T.ch2 + 0.1, 2, 'Taurus HQ'), chap(T.ch3 + 0.1, 3, 'Gemini HQ'), chap(T.ch4 + 0.1, 4, 'The forecast'), chap(T.ch5 + 0.1, 5, 'Results')]
const S = 'THE STARS', TA = '♉︎ TAURUS', GE = '♊︎ GEMINI', PI = '♓︎ PISCES · WEATHER'
const LINES = [
  { t: 1.6, speaker: S, text: 'the first date ended at 10 p.m. both had *fun.*' },
  { t: 4.8, speaker: S, text: 'the question now: who texts *first?*' },
  { t: 8.3, speaker: S + ' · V.O.', text: 'the big board: both typing. both *stopping.*' },
  { t: 12.0, speaker: S + ' · V.O.', text: 'it is neck and *neck.*' },
  { t: 16.4, speaker: S + ' · V.O.', text: 'Taurus HQ. draft number *one.*' },
  { t: 23.6, speaker: TA, color: '#9fe6b0', text: 'if I text first, is that too *eager?*' },
  { t: 27.0, speaker: S + ' · V.O.', text: '(it is not too eager.)' },
  { t: 30.4, speaker: S + ' · V.O.', text: 'Gemini HQ. seven drafts. all *paragraphs.*' },
  { t: 37.4, speaker: GE, color: '#ffe27a', text: 'is a paragraph too much? asking for *me.*' },
  { t: 41.0, speaker: S + ' · V.O.', text: '(a paragraph is fine.)' },
  { t: 44.4, speaker: PI, color: '#8fd0ff', text: 'pockets of *hope* across the region…' },
  { t: 48.6, speaker: PI, color: '#8fd0ff', text: 'scattered *nerves*, mostly near the thumbs…' },
  { t: 52.8, speaker: PI, color: '#8fd0ff', text: 'and *butterflies* by morning. (sob)' },
  { t: 58.3, speaker: S, text: 'we can now *call* it.' },
  { t: 67.3, speaker: S + ' · V.O.', text: 'the same text. the same *second.*' },
  { t: 71.3, speaker: PI, color: '#8fd0ff', text: 'a TIE. the best *kind.*' },
  { t: 74.6, speaker: S, text: 'turns out you can *both* go first.' },
]
const shot = t => t < T.desk ? 'wall' : t < T.board ? 'desk' : t < T.ch2 ? 'board' : t < T.ch3 ? 'taurus' : t < T.ch4 ? 'gemini' : t < T.ch5 ? 'weather' : t < T.split ? 'deskR' : t < T.win ? 'split' : t < T.read ? 'win' : t < T.deskF ? 'split2' : 'deskF'
const L = { x0: 40, y0: 520, x1: 528, y1: 1290 }, R2 = { x0: 552, y0: 520, x1: 1040, y1: 1290 }

function typingBar(x, t, cx, cy, w, phase, col, label) {
  const h = 260 * (0.25 + 0.75 * Math.abs(Math.sin(t * 0.9 + phase)) * (0.6 + 0.4 * Math.sin(t * 2.3 + phase)))
  px(x, cx - w / 2 - 6, cy - 300, w + 12, 306, INK); px(x, cx - w / 2, cy - 294, w, 294, '#1a1440')
  px(x, cx - w / 2 + 6, cy - h, w - 12, h, col)
  txt(x, label, cx, cy + 40, { size: 30, weight: 800, font: INTER, color: col })
}
function half(x, t, R, id, draw, seed, place) {
  live(x, t, R, { place, label: 'LIVE', draw: (xx, tt, RR) => { room(xx, RR, { top: id === 'taurus' ? '#2a4a3a' : '#4a4a2a', bot: '#1a1440' }); draw(xx, tt, RR) } })
}
function confetti(x, t, t0, n = 60) {
  const dt = t - t0; if (dt < 0 || dt > 4) return
  for (let i = 0; i < n; i++) { const X = (i * 97) % 1080, Y = 470 + ((dt * (300 + (i % 7) * 60) + i * 31) % 940); x.save(); x.translate(X, Y); x.rotate(dt * (3 + i % 4)); px(x, -8, -4, 16, 8, [GOLD, PINK, CYAN, GREEN, BONE][i % 5]); x.restore() }
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne18', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Nobody has texted first. | *Yet.*', at: -1, out: [7.8, 8.0], accent: '#ffe27a' },
    { text: 'The *big* | board.', at: T.board + 0.1, out: [15.8, 16.0], accent: GOLD },
    { text: 'LIVE: *Taurus* | HQ.', at: T.ch2 + 0.1, out: [29.8, 30.0], accent: '#9fe6b0' },
    { text: 'LIVE: *Gemini* | HQ.', at: T.ch3 + 0.1, out: [43.8, 44.0], accent: '#ffe27a' },
    { text: 'The *forecast.*', at: T.ch4 + 0.1, out: [57.8, 58.0], accent: TEAR },
    { text: 'The *results.*', at: T.ch5 + 0.1, out: [78.6, 78.8], accent: PINK },
    { text: 'Results: you | *both* won.', at: T.last, gap: 0.07, accent: GOLD, size: 110, accentSize: 156 },
  ],
  lines: LINES, box: { open: 1.4, close: 79.95 },
  cuts: CUTS, fx: CH.map(c => chapter(c)), fxCues: CH.flatMap(c => chapterCues(c)),
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0) + (t > T.win && t < T.win + 0.4 ? 16 * Math.exp(-(t - T.win) * 10) * Math.sin((t - T.win) * 60) : 0),
  over(x, t) { promise(x, t, 'RESULTS AT THE END', [0.2, 15.6]) },
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    const tauPace = (xx, tt, RR, mood = 'wide') => { sign(xx, tt, 'taurus', { x: (RR.x0 + RR.x1) / 2 + 120 * Math.sin(tt * 1.6), y: 1080, s: 200, mood, look: [Math.cos(tt * 1.6) > 0 ? 1 : -1, 0.5], seed: 9 }); }
    const gemPace = (xx, tt, RR, mood = 'wide') => { sign(xx, tt, 'gemini', { x: (RR.x0 + RR.x1) / 2 + 120 * Math.sin(tt * 1.9 + 1), y: 1080, s: 200, mood, look: [Math.cos(tt * 1.9 + 1) > 0 ? 1 : -1, 0.5], seed: 4 }) }
    if (sh === 'wall' || sh === 'split' || sh === 'split2') {
      const sent = t > T.send, after = sh === 'split2'
      half(x, t, L, 'taurus', (xx, tt, RR) => {
        if (sh === 'wall') tauPace(xx, tt, RR)
        else { phone(xx, tt, { cx: 284, cy: 860, w: 380, h: 520, title: '♊︎ gemini', font: 24, msgs: [...(sent ? [{ at: T.send, side: 'R', text: 'had fun!! again soon?' }] : []), ...(sent ? [{ at: T.send + 0.05, side: 'L', text: 'had fun!! again soon?' }] : [])] }); sign(xx, tt, 'taurus', { x: 420, y: 1200, s: 130, mood: after ? 'happy' : sent ? 'wide' : 'squint', seed: 9, glyph: false, hops: after ? [67.5, 68.0, 68.6] : undefined }) }
      }, 9, 'TAURUS HQ')
      half(x, t, R2, 'gemini', (xx, tt, RR) => {
        if (sh === 'wall') gemPace(xx, tt, RR)
        else { phone(xx, tt, { cx: 796, cy: 860, w: 380, h: 520, title: '♉︎ taurus', font: 24, msgs: [...(sent ? [{ at: T.send, side: 'R', text: 'had fun!! again soon?' }] : []), ...(sent ? [{ at: T.send + 0.05, side: 'L', text: 'had fun!! again soon?' }] : [])] }); sign(xx, tt, 'gemini', { x: 930, y: 1200, s: 130, mood: after ? 'happy' : sent ? 'wide' : 'squint', seed: 4, glyph: false, hops: after ? [67.6, 68.1, 68.7] : undefined }) }
      }, 4, 'GEMINI HQ')
      if (sh === 'split' && t < T.send) { chip(x, 284, 1150, 'SEND?', { size: 30, color: GOLD, k: 1 + 0.1 * Math.sin(t * 10) }); chip(x, 796, 1150, 'SEND?', { size: 30, color: GOLD, k: 1 + 0.1 * Math.sin(t * 10 + 1) }) }
      if (sh !== 'wall' && t > T.send) chip(x, 540, 1240, '10:42:07 PM · 10:42:07 PM', { size: 30, color: GOLD, border: GOLD, k: pop01(t, T.send + 0.2, 0.3, 2) })
      if (after) { chip(x, 540, 580, 'IDENTICAL', { size: 34, color: INK, bg: GOLD, k: pop01(t, T.read + 0.3, 0.3, 2) }); sparkles(x, t, 540, 860, T.read + 0.4, 14, 320, 2, [PINK, GOLD, BONE]) }
      if (sh === 'wall') { chyron(x, t, { t0: 1.15, label: 'BREAKING', text: 'WHO TEXTS FIRST · TOO CLOSE TO CALL' }); slam(x, t, { t0: -0.15, land: T.slam, dock: [1.0, 1.3], text: 'TOO CLOSE TO CALL', y: 720 }) }
      else chyron(x, t, { t0: sh === 'split' ? T.split : T.read, label: 'RESULTS', text: sh === 'split' ? (t < T.send ? 'BOTH THUMBS OVER SEND' : 'SENT · BOTH · SAME SECOND') : 'BOTH READING · BOTH LAUGHING' })
    } else if (sh === 'desk' || sh === 'deskR' || sh === 'deskF') {
      const f = sh === 'deskF', r = sh === 'deskR'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#1a1440', bot: '#120c30' })
          sign(xx, tt, 'taurus', { x: 430, y: 760, s: 140, mood: f ? 'heart' : 'wide', seed: 9 }); sign(xx, tt, 'gemini', { x: 650, y: 760, s: 140, mood: f ? 'heart' : 'wide', seed: 4 })
          chip(xx, 540, 600, f ? 'BOTH WIN' : r ? 'CALLING IT…' : 'TOO CLOSE TO CALL', { size: 20, color: f ? GOLD : '#ff8fa0' })
        },
        a: { mood: f ? (t > T.last ? 'sparkle' : 'happy') : r ? 'squint' : 'neutral', look: [0.3, -0.4], hops: f ? [74.7, 75.3, 75.9, T.last] : r ? [58.4, 59.0] : [1.7, 2.3, 4.9, 5.5] },
        p: { mood: f ? 'happy' : 'wide', tears: f ? 3 : 1, tissue: f ? pop01(t, T.deskF + 0.2, 0.3, 2) : 0, look: [-1, -0.5], hops: f ? [71.3, 71.7, 72.1, 72.6, 73.4] : [1.5] },
        chyron: { t0: f ? T.deskF : r ? T.ch5 : T.desk, label: f ? 'RESULTS' : r ? 'DECISION DESK' : 'DECISION DESK', text: f ? 'A TIE · BOTH TEXTED FIRST · SECOND DATE: LIKELY' : r ? 'RESULTS COMING IN · STAND BY' : 'FIRST DATE OVER · FIRST TEXT: PENDING' },
      })
    } else if (sh === 'board' || sh === 'win') {
      live(x, t, FULL, {
        label: 'BIG BOARD', place: 'DECISION DESK', clock: sh === 'win' ? '10:42 PM' : '10:31 PM', draw: (xx, tt, R) => {
          room(xx, R, { top: '#0e1a2e', bot: '#0a1220' })
          if (sh === 'board') {
            typingBar(xx, tt, 330, 1080, 200, 0, '#7be0a0', '♉ TAURUS'); typingBar(xx, tt, 750, 1080, 200, 1.7, '#ffe27a', '♊ GEMINI')
            txt(xx, 'TYPING…', 540, 640, { size: 40, weight: 900, font: INTER, color: BONE, alpha: 0.5 + 0.5 * Math.sin(tt * 4) })
            chip(xx, 330, 1180, `DRAFTS: ${1 + Math.floor((tt - T.board) / 2.6)}`, { size: 24, color: '#7be0a0' }); chip(xx, 750, 1180, `DRAFTS: ${2 + Math.floor((tt - T.board) / 1.3)}`, { size: 24, color: '#ffe27a' })
          } else {
            const k = pop01(tt, T.win, 0.4, 2.6)
            txt(xx, 'BOTH WIN', 540, 760, { size: 150 * k, weight: 900, font: INTER, color: GOLD })
            sign(xx, tt, 'taurus', { x: 330, y: 1100, s: 200, mood: 'sparkle', seed: 9, hops: [T.win + 0.1, T.win + 0.5, T.win + 0.9] }); sign(xx, tt, 'gemini', { x: 750, y: 1100, s: 200, mood: 'sparkle', seed: 4, hops: [T.win + 0.15, T.win + 0.55, T.win + 0.95] })
            confetti(xx, tt, T.win)
          }
        },
      })
      chyron(x, t, { t0: sh === 'win' ? T.win : T.board, label: sh === 'win' ? 'CALLED' : 'BIG BOARD', text: sh === 'win' ? 'WE CAN CALL IT: A TIE · EVERYBODY WINS' : 'BOTH TYPING · BOTH STOPPING · NECK AND NECK' })
    } else if (sh === 'taurus') {
      live(x, t, FULL, {
        place: 'TAURUS HQ', clock: '10:34 PM', draw: (xx, tt, R) => {
          livingRoom(xx, tt, R, { wall: '#2a4a3a' })
          sign(xx, tt, 'taurus', { x: 420, y: 1010, s: 260, mood: tt > 23.4 && tt < 26.5 ? 'wide' : 'squint', look: [0.6, 0.6], seed: 9, hops: [23.7, 24.3] })
          px(xx, 560, 930, 70, 120, INK); px(xx, 566, 936, 58, 108, '#4f8df0')
          const i = T.tdraft.findIndex((a, j) => tt >= a && tt < (T.tdraft[j + 1] ?? 23.0))
          if (i >= 0) { const a = T.tdraft[i], n = Math.floor(clamp(prog(tt, a, a + 0.6)) * 7) - Math.floor(clamp(prog(tt, a + 1.2, a + 1.6)) * 7); chip(xx, 640, 760, 'draft: ' + ('had fun'.slice(0, Math.max(0, n)) || '…'), { size: 28, color: BONE }) }
          chip(xx, 820, 620, `DRAFTS: ${T.tdraft.filter(a => tt >= a).length}`, { size: 26, color: '#7be0a0' })
        },
      })
      chyron(x, t, { t0: T.ch2, label: 'LIVE', text: 'TAURUS: “HAD FUN” · TYPED · DELETED · AGAIN' })
    } else if (sh === 'gemini') {
      live(x, t, FULL, {
        place: 'GEMINI HQ', clock: '10:38 PM', draw: (xx, tt, R) => {
          livingRoom(xx, tt, R, { wall: '#4a4a2a' })
          sign(xx, tt, 'gemini', { x: 300, y: 1010, s: 250, mood: tt > 37.2 && tt < 40.5 ? 'wide' : 'happy', look: [1, -0.4], seed: 4, hops: T.gdraft })
          T.gdraft.forEach((a, i) => { const k = pop01(tt, a, 0.25, 2.2); if (k < 0.01) return; xx.save(); xx.translate(720 + ((i * 37) % 60) - 30, 1060 - i * 70); xx.rotate((i % 2 ? 0.05 : -0.05)); xx.scale(k, k); px(xx, -180, -30, 360, 60, INK); px(xx, -174, -24, 348, 48, '#4f8df0'); for (let l = 0; l < 3; l++) px(xx, -160, -16 + l * 13, 300 - l * 60, 6, 'rgba(255,255,255,0.7)'); xx.restore() })
          chip(xx, 700, 650, `DRAFTS: ${T.gdraft.filter(a => tt >= a).length} (ALL PARAGRAPHS)`, { size: 24, color: '#ffe27a' })
        },
      })
      chyron(x, t, { t0: T.ch3, label: 'LIVE', text: 'GEMINI: SEVEN DRAFTS · AVERAGE LENGTH: A PARAGRAPH' })
    } else if (sh === 'weather') {
      live(x, t, FULL, {
        label: 'WEATHER', place: 'THE FEELINGS MAP', clock: 'TONIGHT', draw: (xx, tt, R) => {
          weather(xx, tt, R, {
            title: 'FIRST-TEXT FORECAST', icons: [
              { x: 360, y: 760, kind: 'heart', label: 'POCKETS OF HOPE', at: 44.6, col: PINK },
              { x: 700, y: 820, kind: 'fog', label: 'NERVES (THUMBS)', at: 48.8 },
              { x: 520, y: 1050, kind: 'star', label: 'BUTTERFLIES', at: 53.0, col: GOLD },
              { x: 860, y: 1060, kind: 'heart', label: '', at: 54.0 },
            ],
          })
          const F = sign(xx, tt, 'pisces', { x: 180, y: 1140, s: 230, mood: 'sparkle', look: [1, -0.5], seed: 6, hops: [44.5, 45.1, 48.7, 49.3, 52.9, 53.5, 55.5] })
          tears(xx, tt, F, tt > 52.8 ? 3 : 2)
        },
      })
      chyron(x, t, { t0: T.ch4, label: 'WEATHER', text: 'HOPE: WIDESPREAD · NERVES: LOCAL · BUTTERFLIES BY MORNING' })
    }
    ticker(x, t, { y: 1404, items: ['DECISION DESK: WHO TEXTS FIRST', 'TAURUS DRAFTS: 3', 'GEMINI DRAFTS: 7', 'RESULTS AT THE END'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ...stingCues(T.desk + 0.1, 0.6),
    ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.board + 0.3 + i * 0.6).toFixed(2), 0.025]),
    ...T.tdraft.flatMap(a => [['tick', a, 0.03], ['tick', a + 0.2, 0.03], ['tick', a + 0.4, 0.03], ['tick', a + 1.25, 0.025], ['tick', a + 1.45, 0.025]]),
    ...T.gdraft.map((a, i) => popCue(a, [659.25, 739.99, 880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.035, i % 2 ? 0.3 : -0.3)),
    ...stingCues(T.ch4 + 0.1, 0.6), popCue(44.6, 880, 0.035, 0), popCue(48.8, 739.99, 0.035, 0), popCue(53.0, 1174.66, 0.035, 0), ...sobCues(46.0, 3), ...sobCues(53.5, 3), ...sobCues(55.6, 3),
    ...stingCues(T.ch5 + 0.1, 0.8), ['riser', T.split, T.send, 0.03], popCue(T.send, 1318.51, 0.05, -0.3), popCue(T.send + 0.05, 1318.51, 0.05, 0.3),
    ...slamCues(T.win, 1), ['glitter', T.win, T.win + 1.2], ['clap', T.win + 0.2, { gain: 0.16 }], ['clap', T.win + 0.45, { gain: 0.16 }], ['clap', T.win + 0.7, { gain: 0.18 }], ['bell', T.win + 0.1, 1760, 0.04, 1.4, 0],
    popCue(T.read + 0.3, 1567.98, 0.04, 0), ['glitter', T.read + 0.4, T.read + 1.0],
    ...sobCues(71.5, 3), ...sobCues(73.0, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
