// kbne15: BREAKING NEWS: THE STARS, Ep 15 · "Single at the holiday table" (20 s vertical, star_talk post, music: jazzy · Eb).
// No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
// Pisces is at the dinner too (the desk seat holds an AT DINNER placard).
//   0.00 frame 0: mid-whip into a LIVE holiday dinner, the slab mid-slam; a fork frozen mid-air, a red circle on ♉ the aunt
//        mid-question. Hook: "BREAKING: 'So, are you | *seeing anyone?*'"
//   1.40 record scratch: the whole table freezes. "the *question.*"
//   3.60 cut: the desk. THE STARS: "the table has gone *quiet.*"
//   6.00 cut: LIVE, close on ♑ Capricorn, smiling: "just me. and honestly? I'm *great.*"
//   9.40 the table claps; ♊ the cousin: "wait, how do you DO that?"
//  12.40 cut: Capricorn gives the advice: "take yourself out. it's *fun.*" ♓ Pisces cries into the gravy boat.
//  15.40 cut: the desk. Ticker: SINGLE · THRIVING · PASS THE POTATOES.
//  18.50 last headline: "Single, and | the *best* guest." Hard cut at 20.0.
import {
  makeNews, studio, desk, anchor, sign, live, chyron, ticker, room, caught, bubble, chip, txt, px, sparkles, tears, slam, papers,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, GREEN, TEAR,
} from '../../kbne01/newskit.js'

const D = 20
const T = { slam: 0.15, rec: 1.4, cut1: 3.6, cut2: 6.0, clap: 9.4, ask: 10.1, cut3: 12.4, cut4: 15.4, last: 18.5 }
const CUTS = [T.cut1, T.cut2, T.cut3, T.cut4]
const REC = { at: T.rec, len: 1.3, caption: 'the *question.*', top: 1180 }
const S = 'THE STARS', CP = '♑︎ CAPRICORN · LIVE', GE = '♊︎ THE COUSIN', PI = '♓︎ PISCES'
const LINES = [
  { t: 3.85, speaker: S, text: 'the table has gone *quiet.*' },
  { t: 6.3, speaker: CP, color: '#c9b48a', text: 'just me. and honestly? I’m *great.*' },
  { t: 10.1, speaker: GE, color: '#ffe27a', text: 'wait, how do you *DO* that?' },
  { t: 12.7, speaker: CP, color: '#c9b48a', text: 'take yourself out. it’s *fun.*' },
  { t: 15.7, speaker: S, text: 'single. thriving. pass the *potatoes.*' },
]
const shot = t => t < T.cut1 ? 'table' : t < T.cut2 ? 'desk' : t < T.cut3 ? 'close' : t < T.cut4 ? 'advice' : 'desk2'

function diningRoom(x, t, R) {
  room(x, R, { top: '#4a2a3a', bot: '#2e1a28', floor: '#3a2430' })
  // string lights + a window with snow
  for (let i = 0; i < 16; i++) { const X = R.x0 + 40 + i * 62, Y = R.y0 + 70 + 18 * Math.sin(i * 0.9); px(x, X - 8, Y - 8, 16, 16, INK); px(x, X - 5, Y - 5, 10, 10, Math.sin(t * 3 + i) > 0 ? ['#ffd23a', '#ff8fa0', '#7fd0ff', GREEN][i % 4] : '#5a4a5a') }
  px(x, R.x1 - 300, R.y0 + 130, 220, 240, INK); px(x, R.x1 - 292, R.y0 + 138, 204, 224, '#1a2458')
  for (let i = 0; i < 10; i++) px(x, R.x1 - 290 + (i * 41) % 200, R.y0 + 140 + ((i * 37 + t * 40) % 220), 6, 6, '#ffffff')
}
function table(x, R) {
  const ty = R.y0 + (R.y1 - R.y0) * 0.72
  px(x, R.x0 + 20, ty, R.x1 - R.x0 - 40, 160, INK); px(x, R.x0 + 26, ty + 6, R.x1 - R.x0 - 52, 30, '#f4ecd8'); px(x, R.x0 + 26, ty + 36, R.x1 - R.x0 - 52, 118, '#b23a4a')
  // dishes: potatoes, a gravy boat
  px(x, 330, ty - 40, 140, 46, INK); px(x, 336, ty - 34, 128, 34, '#e8e0d0'); for (let i = 0; i < 5; i++) px(x, 346 + i * 22, ty - 50, 18, 18, '#f2d08a')
  px(x, 610, ty - 36, 120, 40, INK); px(x, 616, ty - 30, 108, 28, '#e8e0d0'); px(x, 720, ty - 44, 24, 16, INK)
  return ty
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne15', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: ‘So, are you | *seeing anyone?*’', at: -1, out: [3.4, 3.6], accent: '#ffb3c8' },
    { text: 'Capricorn: | *unbothered.*', at: T.cut2 + 0.05, out: [12.2, 12.4], accent: '#c9b48a' },
    { text: 'The table | *takes notes.*', at: T.cut3 + 0.05, out: [15.2, 15.4], accent: '#ffe27a' },
    { text: 'Single, and | the *best* guest.', at: T.last, gap: 0.08, accent: GOLD, size: 108, accentSize: 156 },
  ],
  lines: LINES, box: { open: 3.7, close: 19.95 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    const dinner = (xx, tt, R, mode) => {
      diningRoom(xx, tt, R)
      const ty = R.y0 + (R.y1 - R.y0) * 0.72
      const frozen = mode === 'q'
      sign(xx, tt, 'taurus', { x: 220, y: ty - 85, s: 190, mood: 'wide', look: [1, 0], seed: 9, hops: mode === 'q' ? [0.05] : undefined })
      sign(xx, tt, 'capricorn', { x: 470, y: ty - 90, s: 200, mood: frozen ? 'wide' : mode === 'close' && tt > 6.3 ? 'happy' : 'neutral', look: frozen ? [-1, 0] : [0, 0], seed: 16, hops: mode === 'close' ? [6.4, 6.9, 7.4] : undefined })
      sign(xx, tt, 'gemini', { x: 710, y: ty - 80, s: 170, mood: mode === 'q' ? 'wide' : tt > T.clap ? 'sparkle' : 'happy', look: [-1, 0], seed: 4, hops: mode === 'close' ? [T.clap, T.clap + 0.3, T.clap + 0.6, T.ask] : undefined })
      const F = sign(xx, tt, 'pisces', { x: 900, y: ty - 75, s: 160, mood: 'sparkle', look: [-1, 0], seed: 6, hops: mode === 'advice' ? [12.8, 13.2, 13.6, 14.0] : undefined })
      tears(xx, tt, F, mode === 'advice' ? 3 : 1)
      table(xx, R)
      // the fork, frozen mid-air
      if (mode === 'q') { xx.save(); xx.translate(470, ty - 200 - 40 * Math.sin(Math.min(tt, T.rec) * 4)); xx.rotate(0.6); px(xx, -6, -60, 12, 120, INK); px(xx, -3, -58, 6, 116, '#c8c8d8'); px(xx, -16, -72, 32, 20, INK); xx.restore() }
      return ty
    }
    if (sh === 'table') {
      live(x, t, FULL, { place: 'THE HOLIDAY TABLE', clock: '7:42 PM', draw: (xx, tt, R) => { dinner(xx, st, R, 'q'); bubble(xx, st, 260, 640, -1, null, 'so, are you seeing anyone?', { size: 28, col: '#f4ecd8', tail: -0.6 }) } })
      caught(x, t, 260, 640, 200, -0.4, { w: 10 })
      chyron(x, t, { t0: 1.15, label: 'BREAKING', text: 'THE QUESTION HAS BEEN ASKED · AT THE TABLE' })
      slam(x, t, { t0: -0.15, land: T.slam, dock: [1.0, 1.3], y: 1250 })
    } else if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      studio(x, t, { monitor: (xx, tt, M) => { room(xx, M, { top: '#4a2a3a', bot: '#2e1a28' }); sign(xx, tt, 'capricorn', { x: 540, y: 760, s: 160, mood: fin ? 'sparkle' : 'wide', seed: 16 }); chip(xx, 540, 600, fin ? 'GUEST OF HONOUR' : 'LIVE · THE TABLE', { size: 20, color: GOLD }) } })
      anchor(x, t, { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: [0.3, -0.4], hops: fin ? [15.8, 16.4, 17.0, T.last] : [3.9, 4.4] })
      px(x, 700, 1040, 200, 110, INK); px(x, 706, 1046, 188, 98, BONE); txt(x, 'PISCES', 800, 1076, { size: 22, weight: 800, font: INTER, color: INK, shadow: false }); txt(x, 'AT DINNER', 800, 1110, { size: 24, weight: 900, font: INTER, color: RED, shadow: false })
      desk(x, t)
      chyron(x, t, { t0: fin ? T.cut4 : T.cut1, label: fin ? 'DEVELOPING' : 'LIVE', text: fin ? 'SINGLE · THRIVING · PASSING THE POTATOES' : 'TABLE SILENT · FORKS SUSPENDED' })
    } else if (sh === 'close') {
      live(x, t, FULL, {
        place: 'THE HOLIDAY TABLE', clock: '7:43 PM', draw: (xx, tt, R) => {
          xx.save(); const z = 1.35; xx.translate(470, 1000); xx.scale(z, z); xx.translate(-470, -1000)
          dinner(xx, tt, R, 'close')
          xx.restore()
          if (tt > T.clap) for (let i = 0; i < 3; i++) chip(xx, [200, 540, 860][i], 640 + (i % 2) * 40, 'CLAP!', { size: 30, color: GOLD, k: pop01(tt, T.clap + i * 0.25, 0.2, 3) * outK(tt, [T.clap + 1.2, T.clap + 1.4]) })
          sparkles(xx, tt, 470, 860, 6.6, 12, 220, 1, [GOLD, BONE, GREEN])
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: '“JUST ME. AND HONESTLY? I’M GREAT.”' })
    } else {
      live(x, t, FULL, {
        place: 'THE HOLIDAY TABLE', clock: '7:45 PM', draw: (xx, tt, R) => {
          dinner(xx, tt, R, 'advice')
          bubble(xx, tt, 470, 640, 12.7, T.cut4 - 0.1, 'take yourself out. it’s fun.', { size: 30, col: '#f4ecd8' })
          chip(xx, 710, 560, 'taking notes', { size: 20, color: '#ffe27a', k: pop01(tt, 13.4, 0.3, 2) })
          chip(xx, 900, 760, 'into the gravy boat', { size: 18, color: TEAR, k: pop01(tt, 13.0, 0.3, 2) })
        },
      })
      chyron(x, t, { t0: T.cut3, label: 'LIVE', text: 'ADVICE GIVEN · COUSIN TAKING NOTES · PISCES CRYING' })
    }
    ticker(x, t, { y: 1404, items: ['SINGLE', 'THRIVING', 'PASS THE POTATOES', 'THE AUNT MEANS WELL', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ['tick', 0.5, 0.04],
    ['riser', 4.0, 5.9, 0.02],
    popCue(6.6, 1174.66, 0.04, 0), ['glitter', 6.6, 7.1],
    ['clap', T.clap, { gain: 0.16, pan: -0.3 }], ['clap', T.clap + 0.25, { gain: 0.16, pan: 0.3 }], ['clap', T.clap + 0.5, { gain: 0.18 }], ['clap', T.clap + 0.75, { gain: 0.14 }],
    ...sobCues(12.9, 3), ...sobCues(13.8, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
