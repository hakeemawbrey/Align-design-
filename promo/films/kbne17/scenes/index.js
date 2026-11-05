// kbne17: BREAKING NEWS: THE STARS, Ep 17 (long) · "Special Report: The Ex Said 'hey'" (72 s vertical, star_talk post,
// music: synthwave · Bm). No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
// Promise up front: "THE VERDICT AT THE END". Five chapter stickers. The advice: decide in daylight, lean on a friend.
//   1 THE TEXT (0–14): frame 0: a LIVE shot of ♏ Scorpio's dark bedroom, the slab mid-slam, a notification already landed:
//     DO NOT ANSWER · "hey". Hook: "BREAKING: The ex just | texted *'hey.'*" A glitch (0.4). The three letters, huge (3.0).
//     The desk (7.5): "a special report."
//   2 FIELD REPORT (14–29): ♍ Virgo whispers in the hallway: typed "hey" back… deleted… typed. Old photos start scrolling.
//   3 NOSTALGIA FRONT (29–43): ♓ Pisces at the weather wall, sobbing: a nostalgia front moves in; memories look better
//     than they were; visibility low.
//   4 THE PANEL (43–58): ♑ Capricorn (sleep on it), ♊ Gemini (text your friend instead), ♌ Leo (you're doing great).
//   5 THE VERDICT (58–72): NOT TONIGHT stamps the desk. Scorpio texts ♋ the best friend: "the ex said hey lol" →
//     "breakfast. 9am. my treat." The phone goes face down; Scorpio sleeps. Last headline (71.0):
//     "'Hey' can *wait* | till morning." Hard cut at 72.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, phone, weather, panel, caught, bubble, chip, txt, px, mic, sparkles, tears, slam, stamp, promise, chap, drawBits,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, TEAR, LAV, PINK,
} from '../../kbne01/newskit.js'
import { chapter, chapterCues, notification, notificationCues, glitch, glitchCues } from '../../hookkit.js'

const D = 72
const T = {
  slam: 0.15, hey: 3.0, desk: 7.5,
  ch2: 14.0, type: [15.4, 17.2, 18.6], photos: 20.6,
  ch3: 29.0,
  ch4: 43.0,
  ch5: 58.0, verdict: 58.9, cutP: 61.0, me: 61.5, bff: 62.6, cutB: 64.5, down: 65.3, cutD: 68.0, last: 71.0,
}
const CUTS = [T.hey, T.desk, T.ch2, T.ch3, T.ch4, T.ch5, T.cutP, T.cutB, T.cutD]
const NOTE = { at: -1, out: [2.8, 3.0], title: 'messages · do not answer', body: '*hey*', glyph: '♉', color: '#5a5470', time: '2:07 AM', y: 500 }
const GL = { at: 0.45, len: 0.5, dialog: false, amp: 0.8 }
const CH = [chap(T.desk + 0.1, 1, 'The text'), chap(T.ch2 + 0.1, 2, 'Field report'), chap(T.ch3 + 0.1, 3, 'Nostalgia front'), chap(T.ch4 + 0.1, 4, 'The panel'), chap(T.ch5 + 0.1, 5, 'The verdict')]
const S = 'THE STARS', VI = '♍︎ VIRGO · LIVE', PI = '♓︎ PISCES · WEATHER', CP = '♑︎ CAPRICORN', GE = '♊︎ GEMINI', LE = '♌︎ LEO', SC = '♏︎ SCORPIO'
const LINES = [
  { t: 7.8, speaker: S, text: 'a special report. 2:07 a.m. the ex has texted *hey.*' },
  { t: 11.0, speaker: S, text: 'three letters. no question mark. *classic.*' },
  { t: 14.4, speaker: VI, color: '#9fe6b0', text: '(whispering) they typed “hey” back. *deleted.*' },
  { t: 18.4, speaker: VI, color: '#9fe6b0', text: 'typed it again. *deleted* again.' },
  { t: 21.4, speaker: VI, color: '#9fe6b0', text: 'and now… the old *photos.* back to you.' },
  { t: 29.4, speaker: PI, color: '#8fd0ff', text: 'a nostalgia front is moving in *fast*…' },
  { t: 33.6, speaker: PI, color: '#8fd0ff', text: 'memories look *better* than they were.' },
  { t: 37.8, speaker: PI, color: '#8fd0ff', text: 'visibility: low. judgment: *lower.* (sob)' },
  { t: 43.4, speaker: CP, color: '#c9b48a', text: 'sleep on it. decisions are better in *daylight.*' },
  { t: 47.9, speaker: GE, color: '#ffe27a', text: 'text your *friend* instead. that’s what we’re for.' },
  { t: 52.6, speaker: LE, color: '#ffb36a', text: 'and for the record? you’re doing *great.*' },
  { t: 58.3, speaker: S, text: 'the verdict is *in.*' },
  { t: 64.8, speaker: SC, color: '#ff8fc8', text: 'goodnight, phone. *face down.*' },
  { t: 68.3, speaker: PI, color: '#8fd0ff', text: 'they chose *breakfast.* I’m so proud.' },
]
const shot = t => t < T.hey ? 'bed' : t < T.desk ? 'hey' : t < T.ch2 ? 'desk1' : t < T.ch3 ? 'hall' : t < T.ch4 ? 'weather' : t < T.ch5 ? 'panel' : t < T.cutP ? 'deskV' : t < T.cutB ? 'phone' : t < T.cutD ? 'bed2' : 'deskF'

function bedroom(x, t, R, glow = 1) {
  room(x, R, { top: '#0c0a24', bot: '#16103a' })
  // moon window
  px(x, R.x1 - 280, R.y0 + 80, 200, 220, INK); px(x, R.x1 - 272, R.y0 + 88, 184, 204, '#1a2458'); px(x, R.x1 - 210, R.y0 + 140, 60, 60, '#f4ecd8'); px(x, R.x1 - 192, R.y0 + 140, 42, 42, '#1a2458')
  // bed
  const fy = R.y0 + (R.y1 - R.y0) * 0.8
  px(x, R.x0 + 60, fy - 200, 40, 200, INK); px(x, R.x0 + 60, fy - 120, 760, 120, INK); px(x, R.x0 + 66, fy - 114, 748, 108, '#3a2d74'); px(x, R.x0 + 100, fy - 150, 200, 50, '#f4ecd8')
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(560, fy - 220, 10, 560, fy - 220, 420); g.addColorStop(0, `rgba(120,170,255,${0.3 * glow})`); g.addColorStop(1, 'rgba(120,170,255,0)'); x.fillStyle = g; x.fillRect(R.x0, R.y0, R.x1 - R.x0, R.y1 - R.y0); x.restore() }
  return fy
}
function hallway(x, t, R) {
  room(x, R, { top: '#1e1540', bot: '#2b1f55', floor: '#3a2a5a' })
  const fy = R.y0 + (R.y1 - R.y0) * 0.78
  px(x, 540, 560, 360, fy - 560, INK); px(x, 552, 572, 336, fy - 572, '#1a2458')   // an open doorway into the dark room
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(720, fy - 160, 10, 720, fy - 160, 260); g.addColorStop(0, 'rgba(120,170,255,0.35)'); g.addColorStop(1, 'rgba(120,170,255,0)'); x.fillStyle = g; x.fillRect(552, 572, 336, fy - 572); x.restore()
  return fy
}
function photo(x, cx, cy, s, rot, col) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); px(x, -60, -70, 120, 140, INK); px(x, -54, -64, 108, 128, '#f4ecd8'); px(x, -46, -56, 92, 90, col); drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..'], { H: '#ff8fb1' }, 0, -10, 6); x.restore() }

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne17', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: The ex just | texted *‘hey.’*', at: -1, out: [7.3, 7.5], accent: '#ff8fc8' },
    { text: 'Special | *report.*', at: T.desk + 0.1, out: [13.8, 14.0], accent: GOLD },
    { text: 'LIVE: the | *hallway.*', at: T.ch2 + 0.1, out: [28.8, 29.0], accent: '#9fe6b0' },
    { text: 'Nostalgia | *front.*', at: T.ch3 + 0.1, out: [42.8, 43.0], accent: LAV },
    { text: 'The *panel.*', at: T.ch4 + 0.1, out: [57.8, 58.0], accent: '#ffe27a' },
    { text: 'The *verdict.*', at: T.ch5 + 0.1, out: [70.8, 71.0], accent: '#ff8fa0' },
    { text: '‘Hey’ can *wait* | till morning.', at: T.last, gap: 0.07, accent: GOLD, size: 104, accentSize: 146 },
  ],
  lines: LINES, box: { open: 7.6, close: 71.95 },
  cuts: CUTS, fx: [notification(NOTE), glitch(GL), ...CH.map(c => chapter(c))], fxCues: [...notificationCues({ at: 0.0 }).filter(c => c[1] > 0), ...glitchCues(GL), ...CH.flatMap(c => chapterCues(c))],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0) + (t > T.verdict && t < T.verdict + 0.35 ? 16 * Math.exp(-(t - T.verdict) * 10) * Math.sin((t - T.verdict) * 60) : 0),
  over(x, t) { promise(x, t, 'THE VERDICT AT THE END', [0.2, 13.6]) },
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'bed' || sh === 'bed2') {
      const end = sh === 'bed2'
      live(x, t, FULL, {
        place: 'SCORPIO’S BEDROOM', clock: end ? '2:31 AM' : '2:07 AM', draw: (xx, tt, R) => {
          const fy = bedroom(xx, tt, R, end ? clamp(1 - prog(tt, T.down, T.down + 0.6)) : 1)
          const F = sign(xx, tt, 'scorpio', { x: 420, y: fy - 140, s: 240, mood: end ? (tt > T.down + 0.6 ? 'sleepy' : 'happy') : 'wide', look: end ? undefined : [0.6, -1], seed: 8, hops: end ? [T.down] : undefined })
          void F
          // the phone: glowing above, or face down on the blanket
          if (!end || tt < T.down) { px(xx, 560, fy - 330, 70, 120, INK); px(xx, 566, fy - 324, 58, 108, '#7fb0ff') }
          else { px(xx, 640, fy - 140, 120, 30, INK); px(xx, 646, fy - 136, 108, 22, '#3a2d74'); chip(xx, 700, fy - 200, 'FACE DOWN', { size: 22, color: GOLD, k: pop01(tt, T.down + 0.2, 0.3, 2) }) }
        },
      })
      if (!end) { chyron(x, t, { t0: 1.15, label: 'BREAKING', text: 'THE EX · 2:07 A.M. · “HEY”' }); slam(x, t, { t0: -0.15, land: T.slam, dock: [1.0, 1.3], y: 1180 }) }
      else chyron(x, t, { t0: T.cutB, label: 'LIVE', text: 'PHONE FACE DOWN · SCORPIO ASLEEP · BREAKFAST AT 9' })
    } else if (sh === 'hey') {
      x.fillStyle = '#05040c'; x.fillRect(0, 470, 1080, 940)
      const z = lerp(1, 1.35, ease.inOutCubic(prog(t, T.hey, T.desk)))
      const jit = Math.sin(t * 40) > 0.85 ? 8 : 0
      txt(x, 'hey', 540 + jit, 900, { size: 260 * z, weight: 900, font: INTER, color: BONE })
      chip(x, 540, 1120, 'NO QUESTION MARK · NO CONTEXT', { size: 28, color: '#ff8fa0', k: pop01(t, T.hey + 1.0, 0.3, 2) })
      chip(x, 540, 640, 'FROM: DO NOT ANSWER', { size: 26, color: BONE, k: pop01(t, T.hey + 0.3, 0.3, 2) })
      chyron(x, t, { t0: T.hey, label: 'ZOOM', text: 'THREE LETTERS · ENHANCED · STILL JUST “HEY”' })
    } else if (sh.startsWith('desk')) {
      const v = sh === 'deskV', f = sh === 'deskF'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#0c0a24', bot: '#16103a' })
          if (f) { sign(xx, tt, 'scorpio', { x: 540, y: 760, s: 150, mood: 'sleepy', seed: 8 }); chip(xx, 540, 600, 'BREAKFAST · 9 AM', { size: 20, color: GOLD }); return }
          txt(xx, 'hey', 540, 690, { size: 110, weight: 900, font: INTER, color: BONE })
        },
        a: { mood: f ? (t > T.last ? 'sparkle' : 'happy') : v ? 'squint' : 'neutral', look: [0.3, -0.4], hops: f ? [68.5, 69.5, T.last] : v ? [58.4, T.verdict] : [7.9, 8.5, 11.1, 11.7] },
        p: { mood: f ? 'happy' : 'wide', tears: f ? 3 : 2, tissue: f ? pop01(t, T.cutD + 0.2, 0.3, 2) : 0, look: [-1, -0.5], hops: f ? [68.3, 68.7, 69.1, 69.6, T.last + 0.05] : [8.0] },
        chyron: { t0: v ? T.ch5 : f ? T.cutD : T.desk, label: v ? 'VERDICT' : 'SPECIAL REPORT', text: v ? 'NOT TONIGHT · DECIDE IN DAYLIGHT' : f ? 'THE EX: ON READ UNTIL MORNING · BREAKFAST: CONFIRMED' : 'THE EX TEXTED “HEY” · 2:07 A.M.' },
      })
      if (v) stamp(x, t, 540, 820, 'NOT TONIGHT', T.verdict, { size: 96, col: '#ff2a3a', bg: 'rgba(255,255,255,0.94)' })
    } else if (sh === 'hall') {
      live(x, t, FULL, {
        place: 'SCORPIO’S HALLWAY', clock: '2:11 AM', draw: (xx, tt, R) => {
          const fy = hallway(xx, tt, R)
          sign(xx, tt, 'scorpio', { x: 720, y: fy - 120, s: 190, mood: tt > T.photos ? 'sparkle' : 'squint', look: [0, 1], seed: 8 })
          // the draft cycling: typed… deleted
          const cyc = T.type.findIndex((a, i) => tt >= a && tt < (T.type[i + 1] ?? T.photos))
          if (cyc >= 0) { const a = T.type[cyc], n = Math.floor(clamp(prog(tt, a, a + 0.4)) * 3) - Math.floor(clamp(prog(tt, a + 0.9, a + 1.3)) * 3); chip(xx, 720, 640, 'draft: ' + ('hey'.slice(0, Math.max(0, n)) || '…'), { size: 26, color: BONE }) }
          if (tt > T.photos) [0, 1, 2, 3].forEach(i => { const k = pop01(tt, T.photos + i * 0.7, 0.3, 2); if (k > 0.01) photo(xx, 620 + i * 60, 680 - i * 10, 0.8 * k, (i - 1.5) * 0.2, ['#5a8ac4', '#c45a7a', '#5ac48a', '#c4a05a'][i]) })
          const F = sign(xx, tt, 'virgo', { x: 260, y: 1110, s: 240, mood: 'squint', look: [1, 0], seed: 5, hops: [14.5, 15.1, 18.5, 19.1, 21.5, 22.1] })
          mic(xx, tt, F, { flag: 'STARS' })
        },
      })
      chyron(x, t, { t0: T.ch2, label: 'LIVE', text: t < T.photos ? 'DRAFTS TYPED · DRAFTS DELETED · REPORTER WHISPERING' : 'OLD PHOTOS DETECTED · SCROLLING IN PROGRESS' })
    } else if (sh === 'weather') {
      live(x, t, FULL, {
        label: 'WEATHER', place: 'THE FEELINGS MAP', clock: '2:15 AM', draw: (xx, tt, R) => {
          weather(xx, tt, R, {
            title: 'NOSTALGIA WATCH', front: { at: 29.5, label: 'NOSTALGIA FRONT', col: LAV },
            icons: [
              { x: 360, y: 960, kind: 'heart', label: 'THE GOOD TIMES (EDITED)', at: 33.8, col: PINK },
              { x: 760, y: 980, kind: 'fog', label: 'SELECTIVE MEMORY', at: 35.6 },
              { x: 640, y: 1130, kind: 'rain', label: 'TEARS (LOCAL)', at: 38.2, col: TEAR },
            ],
          })
          const F = sign(xx, tt, 'pisces', { x: 180, y: 1140, s: 230, mood: 'sparkle', look: [1, -0.5], seed: 6, hops: [29.5, 30.1, 33.7, 34.3, 37.9, 38.5, 40.5] })
          tears(xx, tt, F, tt > 37.8 ? 3 : 2)
        },
      })
      chyron(x, t, { t0: T.ch3, label: 'WEATHER', text: 'NOSTALGIA FRONT · VISIBILITY LOW · JUDGMENT LOWER' })
    } else if (sh === 'panel') {
      x.fillStyle = '#120a30'; x.fillRect(0, 470, 1080, 940)
      const talking = t < 47.7 ? 0 : t < 52.4 ? 1 : 2
      panel(x, t, { who: [{ id: 'capricorn', name: '♑ CAPRICORN · SLEEP' }, { id: 'gemini', name: '♊ GEMINI · FRIENDS' }, { id: 'leo', name: '♌ LEO · HYPE' }].map((w, i) => ({ ...w, hops: i === talking ? [t - ((t * 3) % 1) / 3] : undefined })), talking, y: 640, h: 520, at: T.ch4 + 0.1 })
      chyron(x, t, { t0: T.ch4, label: 'PANEL', text: ['SLEEP ON IT · DECIDE IN DAYLIGHT', 'TEXT YOUR FRIEND INSTEAD', 'YOU’RE DOING GREAT, ACTUALLY'][talking] })
    } else if (sh === 'phone') {
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const bs = phone(x, t, { cx: 540, cy: 900, w: 640, h: 760, title: '♋︎ best friend', status: 'online (of course)', msgs: [{ at: T.me, side: 'R', text: 'the ex said hey lol', time: '2:29 AM' }, { at: T.bff, side: 'L', text: 'breakfast. 9am. my treat.', time: '2:29 AM' }], typing: [T.me + 0.3, T.bff] })
      if (bs[1]) caught(x, t, bs[1].x, bs[1].y, 180, T.bff + 0.4, { col: GOLD, w: 10 })
      sign(x, t, 'scorpio', { x: 890, y: 1250, s: 150, mood: t > T.bff ? 'happy' : 'neutral', look: [-1, -1], seed: 8, hops: [T.bff + 0.2, T.bff + 0.6] })
      chyron(x, t, { t0: T.cutP, label: 'VERDICT', text: 'TEXTED: THE BEST FRIEND · NOT THE EX' })
    }
    ticker(x, t, { y: 1404, items: ['THE EX: “HEY”', 'TIME: 2:07 A.M.', 'NOSTALGIA FRONT MOVING IN', 'PANEL: SLEEP ON IT', 'VERDICT AT THE END'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ['boom', T.hey, 0.25], ['riser', T.hey, T.desk - 0.2, 0.03],
    ...stingCues(T.desk + 0.1, 0.7),
    ...T.type.flatMap(a => [['tick', a, 0.03], ['tick', a + 0.13, 0.03], ['tick', a + 0.26, 0.03], ['tick', a + 0.95, 0.025], ['tick', a + 1.08, 0.025], ['tick', a + 1.21, 0.025]]),
    ...[0, 1, 2, 3].map(i => popCue(T.photos + i * 0.7, [659.25, 739.99, 880, 987.77][i], 0.035, 0)),
    ...stingCues(T.ch3 + 0.1, 0.6), ['swell', 29.5, 31.0, { gain: 0.04 }], popCue(33.8, 880, 0.035, 0), popCue(35.6, 739.99, 0.035, 0), popCue(38.2, 659.25, 0.035, 0),
    ...sobCues(34.5, 3), ...sobCues(38.6, 3), ...sobCues(40.6, 3),
    ...stingCues(T.ch4 + 0.1, 0.6),
    ...slamCues(T.verdict, 1), ['bell', T.verdict + 0.05, 1760, 0.035, 1.2, 0],
    popCue(T.me, 880, 0.04, 0.2), popCue(T.bff, 1318.51, 0.05, -0.2), ['glitter', T.bff + 0.3, T.bff + 0.9],
    ['tick', T.down, 0.06], ['swell', T.down, T.down + 1.2, { gain: 0.03 }], ...sobCues(68.5, 3), ...sobCues(69.8, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
