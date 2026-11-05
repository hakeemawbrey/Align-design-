// kbne19: BREAKING NEWS: THE STARS, Ep 19 (long) · "Good Morning, Stars: First Date Tonight" (70 s vertical, star_talk post,
// music: house · D). No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js (sunrise tint).
// Promise up front: "LIVE FOLLOW-UP AT 10 P.M.". Five chapter stickers.
//   1 HEADLINES (0–14): frame 0: mid-whip into the morning desk, the slab mid-slam, a mug mid-air; the monitor shows ♍ Virgo
//     frozen mid-panic. Hook: "BREAKING: First date tonight. | Virgo is *fine.*" Virgo's prepared list: fourteen topics.
//   2 TRAFFIC (14–28): sky cam over thought traffic: a jam on the "WHAT IF THEY DON'T LIKE ME" bridge; ♐ Sagittarius
//     reports; a detour: just breathe (the cars move).
//   3 WEATHER (28–41): ♓ Pisces: nervous, with a chance of butterflies; a warm front of excitement; crying because it's cute.
//   4 THE INTERVIEW (41–56): on the couch: "what are you most nervous about?" "…that it *matters.*" "then it's *good*
//     nervous."
//   5 10 P.M. LIVE (56–70): through the café window: Virgo laughing with ♋ the date, the list still folded. Pisces sobs.
//     Last headline (68.6): "Good news: you | *showed up.*" Hard cut at 70.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, street, windowFrame, weather, caught, bubble, chip, txt, px, mic, sparkles, tears, slam, promise, chap, livingRoom,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, SERIF, GOLD, BONE, RED, INK, TEAR, PINK, CYAN, GREEN,
} from '../../kbne01/newskit.js'
import { chapter, chapterCues } from '../../hookkit.js'

const D = 70
const T = {
  slam: 0.15, desk: 1.3, list: 9.0,
  ch2: 14.0, detour: 24.0,
  ch3: 28.0,
  ch4: 41.0, matters: 45.4,
  ch5: 56.0, cafe: 58.5, deskF: 64.5, last: 68.6,
}
const CUTS = [T.desk, T.list, T.ch2, T.ch3, T.ch4, T.ch5, T.cafe, T.deskF]
const CH = [chap(T.desk + 0.1, 1, 'Headlines'), chap(T.ch2 + 0.1, 2, 'Traffic'), chap(T.ch3 + 0.1, 3, 'Weather'), chap(T.ch4 + 0.1, 4, 'The interview'), chap(T.ch5 + 0.1, 5, '10 p.m. live')]
const S = 'THE STARS', SG = '♐︎ SAGITTARIUS · SKY CAM', PI = '♓︎ PISCES · WEATHER', VI = '♍︎ VIRGO', LE = '♌︎ LEO · LIVE'
const LINES = [
  { t: 1.6, speaker: S, text: 'good morning! top story: Virgo has a first date *tonight.*' },
  { t: 5.2, speaker: S, text: 'Virgo has prepared a list. of *fourteen* topics.' },
  { t: 9.3, speaker: S + ' · V.O.', text: 'topic nine: “opinions on *spoons.*”' },
  { t: 14.4, speaker: SG, color: '#ffb36a', text: 'heavy jams on the *“what if”* bridge this morning.' },
  { t: 19.0, speaker: SG, color: '#ffb36a', text: 'expect delays near *“what do I wear.”*' },
  { t: 23.4, speaker: SG, color: '#ffb36a', text: 'take the detour: just *breathe.* look, it’s moving!' },
  { t: 28.4, speaker: PI, color: '#8fd0ff', text: 'nervous, with a chance of *butterflies*…' },
  { t: 32.6, speaker: PI, color: '#8fd0ff', text: 'a warm front of *excitement* by evening…' },
  { t: 36.8, speaker: PI, color: '#8fd0ff', text: 'I’m crying because it’s *cute.*' },
  { t: 41.4, speaker: S, text: 'Virgo, what are you most *nervous* about?' },
  { t: T.matters, speaker: VI, color: '#9fe6b0', text: '…that it *matters.*' },
  { t: 49.4, speaker: S, text: 'then it’s *good* nervous.' },
  { t: 52.8, speaker: VI, color: '#9fe6b0', text: 'okay. *good* nervous. I can do that.' },
  { t: 56.3, speaker: S, text: 'it’s 10 p.m. we go *live.*' },
  { t: 58.8, speaker: LE, color: '#ffb36a', text: '(whispering) they haven’t checked the list *once.*' },
  { t: 64.8, speaker: PI, color: '#8fd0ff', text: 'they’re *laughing.* I can’t.' },
]
const shot = t => t < T.desk ? 'desk0' : t < T.list ? 'desk1' : t < T.ch2 ? 'list' : t < T.ch3 ? 'traffic' : t < T.ch4 ? 'weather' : t < T.ch5 ? 'couch' : t < T.cafe ? 'deskN' : t < T.deskF ? 'cafe' : 'deskF'
const TOPICS = ['1. the weather', '2. favourite soup', '3. pets (theirs)', '4. pets (mine)', '5. a good book', '6. a bad movie', '7. dream trip', '8. siblings?', '9. opinions on spoons', '10. morning or night', '11. go-to snack', '12. first concert', '13. best advice', '14. (backup) the weather again']
const SUN = '#6a3a5a'

function mug(x, t, t0) {
  const dt = Math.max(0, t - t0)
  if (dt > 1.8) return
  const X = 230 + dt * 300, Y = 1090 - 500 * dt + 700 * dt * dt
  x.save(); x.translate(X, Y); x.rotate(dt * 6)
  px(x, -28, -30, 56, 60, INK); px(x, -24, -26, 48, 52, BONE); px(x, 24, -16, 14, 26, INK); px(x, -20, -20, 40, 8, GOLD)
  x.restore()
}
function bridge(x, t, R) {
  room(x, R, { top: '#7fb0e8', bot: '#c8dcf0' })
  px(x, R.x0, 1000, R.x1 - R.x0, 300, '#4a7ab8')
  // the bridge deck + towers
  px(x, R.x0, 880, R.x1 - R.x0, 40, INK); px(x, R.x0, 884, R.x1 - R.x0, 30, '#8a86a8')
  for (const tx of [240, 840]) { px(x, tx - 20, 640, 40, 260, INK); px(x, tx - 14, 646, 28, 248, '#c45a5a') }
  chip(x, 540, 640, 'THE “WHAT IF THEY DON’T LIKE ME” BRIDGE', { size: 22, color: BONE })
  const go = ease.inOutCubic(prog(t, T.detour, T.detour + 3))
  const labels = ['WHAT DO I WEAR', 'TOO EARLY?', 'TOO LATE?', 'WHAT IF', 'TYPO?']
  labels.forEach((l, i) => {
    const X = ((120 + i * 200 + go * 1400 + (t - T.ch2) * 8) % 1300) - 100
    px(x, X - 70, 820, 140, 60, INK); px(x, X - 64, 826, 128, 46, ['#ff8f6a', '#ffd23a', '#7be0a0', '#c9a6ff', '#7fd0ff'][i]); px(x, X - 50, 870, 26, 16, INK); px(x, X + 24, 870, 26, 16, INK)
    if (go < 0.5) chip(x, X, 780 - (i % 2) * 40, l, { size: 16, color: BONE })
  })
  if (t > T.detour) chip(x, 540, 1120, 'DETOUR: JUST BREATHE ✓', { size: 28, color: INK, bg: GREEN, k: pop01(t, T.detour, 0.3, 2) })
}
function couch(x, t, R) {
  room(x, R, { top: '#7a4a5a', bot: '#4a2a40', floor: '#5a3a50' })
  const fy = R.y0 + (R.y1 - R.y0) * 0.8
  px(x, 120, fy - 190, 840, 80, INK); px(x, 126, fy - 184, 828, 70, '#e8a06a'); px(x, 100, fy - 120, 880, 140, INK); px(x, 106, fy - 114, 868, 128, '#f2b07a')
  // a plant and a sunrise window
  px(x, 400, R.y0 + 60, 280, 200, INK); px(x, 408, R.y0 + 68, 264, 184, '#ffb36a'); px(x, 500, R.y0 + 160, 80, 40, '#ffe27a')
  return fy
}
function cafeWindow(x, t, R) {
  street(x, t, R, { lit: 0.9 })
  windowFrame(x, 540, 820, 700, 440, w => {
    const g = w.createLinearGradient(0, 600, 0, 1040); g.addColorStop(0, '#ffd99a'); g.addColorStop(1, '#e8a868'); w.fillStyle = g; w.fillRect(190, 600, 700, 440)
    px(w, 300, 950, 480, 24, INK); px(w, 306, 954, 468, 16, '#a06a3a')
    sign(w, t, 'virgo', { x: 400, y: 880, s: 190, mood: 'happy', look: [1, 0], seed: 5, hops: [59.2, 59.6, 60.4, 61.6, 62.2, 63.0] })
    sign(w, t, 'cancer', { x: 680, y: 880, s: 190, mood: 'happy', look: [-1, 0], seed: 12, hops: [59.4, 60.0, 61.0, 62.4, 63.3] })
    for (let i = 0; i < 3; i++) { const p = (t * 0.7 + i / 3) % 1; w.globalAlpha = 1 - p; txt(w, 'ha', 540 + (i - 1) * 90, 720 - p * 60, { size: 34, weight: 800, font: INTER, color: INK, shadow: false }); w.globalAlpha = 1 }
  })
  chip(x, 540, 1110, 'THE LIST: STILL FOLDED', { size: 26, color: GOLD, k: pop01(t, 60.8, 0.3, 2) })
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne19', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: First date tonight. | Virgo is *fine.*', at: -1, out: [8.8, 9.0], accent: '#9fe6b0' },
    { text: 'The list: | *fourteen* topics.', at: T.list + 0.1, out: [13.8, 14.0], accent: GOLD },
    { text: 'Thought | *traffic.*', at: T.ch2 + 0.1, out: [27.8, 28.0], accent: '#ffb36a' },
    { text: 'Butterflies | *likely.*', at: T.ch3 + 0.1, out: [40.8, 41.0], accent: TEAR },
    { text: 'The *interview.*', at: T.ch4 + 0.1, out: [55.8, 56.0], accent: '#9fe6b0' },
    { text: 'LIVE: | *10 p.m.*', at: T.ch5 + 0.1, out: [68.4, 68.6], accent: PINK },
    { text: 'Good news: you | *showed up.*', at: T.last, gap: 0.07, accent: GOLD, size: 104, accentSize: 148 },
  ],
  lines: LINES, box: { open: 1.4, close: 69.95 },
  cuts: CUTS, fx: CH.map(c => chapter(c)), fxCues: CH.flatMap(c => chapterCues(c)),
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0),
  over(x, t) { promise(x, t, 'LIVE FOLLOW-UP AT 10 P.M.', [0.2, 8.6]) },
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh.startsWith('desk')) {
      const night = sh === 'deskN' || sh === 'deskF', f = sh === 'deskF'
      deskShot(x, t, {
        tint: night ? '#1a1048' : SUN, plaque: night ? 'THE STARS · TONIGHT' : 'GOOD MORNING, STARS', label: night ? undefined : '☀ GOOD MORNING, STARS · LIVE',
        monitor: (xx, tt, M) => {
          room(xx, M, { top: night ? '#2a1d5c' : '#c87a5a', bot: night ? '#1a1440' : '#8a4a5a' })
          if (sh === 'desk1' && tt > 4.9) {
            px(xx, 400, 540, 280, 280, INK); px(xx, 406, 546, 268, 268, '#f4ecd8')
            TOPICS.slice(0, 7).forEach((s2, i) => txt(xx, s2, 420, 570 + i * 34, { size: 20, color: INK, align: 'left', shadow: false }))
            txt(xx, '…+7 more', 540, 800, { size: 18, color: RED, shadow: false })
            return
          }
          sign(xx, tt, f ? 'virgo' : 'virgo', { x: 540, y: 760, s: 160, mood: f ? 'heart' : night ? 'happy' : 'wide', seed: 5, squash: !night ? 0.05 * Math.sin(tt * 30) : 0 })
          if (!night) chip(xx, 540, 600, 'FIRST DATE TONIGHT', { size: 20, color: GOLD })
        },
        a: { mood: f ? (t > T.last ? 'sparkle' : 'happy') : sh === 'desk0' ? 'wide' : 'happy', look: [0.3, -0.4], hops: f ? [65.0, 66.2, 67.3, T.last] : sh === 'desk1' ? [1.7, 2.3, 2.9, 5.3, 5.9] : [56.4, 57.0] },
        p: { mood: f ? 'happy' : sh === 'desk0' ? 'wide' : 'sparkle', tears: f ? 3 : 1, tissue: f ? pop01(t, T.deskF + 0.2, 0.3, 2) : 0, look: [-1, -0.5], hops: f ? [64.8, 65.2, 65.6, 66.1, 67.0] : [0.25] },
        chyron: { t0: sh === 'desk0' ? 1.15 : sh === 'desk1' ? T.desk : sh === 'deskN' ? T.ch5 : T.deskF, label: night ? 'LIVE AT 10' : 'GOOD MORNING', text: sh === 'deskF' ? 'DATE GOING GREAT · LIST UNUSED · CO-ANCHOR CRYING' : night ? 'THE FOLLOW-UP · WE GO LIVE' : 'FIRST DATE TONIGHT · VIRGO: “FINE”' },
        slam: sh === 'desk0' ? { t0: -0.15, land: T.slam, dock: [1.0, 1.3], text: 'GOOD MORNING', sub: 'BREAKING' } : null, papers: sh === 'desk0' ? -0.3 : null,
      })
      if (sh === 'desk0') mug(x, t, -0.35)
    } else if (sh === 'list') {
      x.fillStyle = '#c87a5a'; x.fillRect(0, 470, 1080, 940)
      x.save(); x.translate(540, 870); x.rotate(-0.03); x.scale(0.9, 0.9)
      px(x, -360, -400, 720, 800, INK); px(x, -352, -392, 704, 784, '#f4ecd8')
      for (let i = 0; i < 14; i++) px(x, -352, -340 + i * 52, 704, 2, '#d8c8a8')
      txt(x, 'THINGS TO TALK ABOUT', 0, -360, { size: 34, weight: 800, font: INTER, color: INK, shadow: false })
      TOPICS.forEach((s2, i) => { const k = clamp(prog(t, T.list + 0.15 * i, T.list + 0.15 * i + 0.2)); if (k > 0) txt(x, s2, -310, -312 + i * 52, { size: 30, weight: 500, font: SERIF, color: i === 8 ? RED : '#2c2a7a', align: 'left', shadow: false, alpha: k }) })
      x.restore()
      if (t > T.list + 1.4) caught(x, t, 340, 1004, 200, T.list + 1.4, { w: 9 })
      sign(x, t, 'virgo', { x: 900, y: 1260, s: 150, mood: 'squint', seed: 5, hops: [T.list + 0.5, T.list + 2.5] })
      chyron(x, t, { t0: T.list, label: 'EXCLUSIVE', text: 'THE LIST · 14 TOPICS · ONE BACKUP' })
    } else if (sh === 'traffic') {
      live(x, t, FULL, { label: 'SKY CAM', place: 'THOUGHT TRAFFIC', clock: '7:42 AM', draw: (xx, tt, R) => { bridge(xx, tt, R); const F = sign(xx, tt, 'sagittarius', { x: 900, y: 1160, s: 170, mood: tt > T.detour ? 'sparkle' : 'happy', seed: 14, hops: [14.5, 19.1, 23.5, T.detour + 0.2] }); mic(xx, tt, F, { flag: 'STARS', side: -1 }) } })
      chyron(x, t, { t0: T.ch2, label: 'TRAFFIC', text: t < T.detour ? 'JAMMED: THE “WHAT IF” BRIDGE · DELAYS NEAR “WHAT DO I WEAR”' : 'DETOUR OPEN · TRAFFIC MOVING · BREATHING HELPS' })
    } else if (sh === 'weather') {
      live(x, t, FULL, {
        label: 'WEATHER', place: 'THE FEELINGS MAP', clock: 'TODAY', draw: (xx, tt, R) => {
          weather(xx, tt, R, {
            title: 'TODAY: FIRST DATE', front: { at: 32.6, label: 'WARM FRONT: EXCITEMENT', col: '#ff8f6a' },
            icons: [
              { x: 360, y: 800, kind: 'fog', label: 'NERVOUS', at: 28.6 },
              { x: 700, y: 780, kind: 'star', label: 'BUTTERFLIES', at: 30.2, col: GOLD },
              { x: 560, y: 1060, kind: 'sun', label: 'EVENING: LOVELY', at: 34.4, col: GOLD },
            ],
          })
          const F = sign(xx, tt, 'pisces', { x: 180, y: 1140, s: 230, mood: tt > 36.6 ? 'happy' : 'sparkle', look: [1, -0.5], seed: 6, hops: [28.5, 29.1, 32.7, 33.3, 36.9, 37.5, 39.0] })
          tears(xx, tt, F, tt > 36.6 ? 3 : 2)
        },
      })
      chyron(x, t, { t0: T.ch3, label: 'WEATHER', text: 'NERVOUS · CHANCE OF BUTTERFLIES · LOVELY BY EVENING' })
    } else if (sh === 'couch') {
      live(x, t, FULL, {
        label: 'LIVE', place: 'THE MORNING COUCH', clock: '7:51 AM', draw: (xx, tt, R) => {
          const fy = couch(xx, tt, R)
          sign(xx, tt, 'stars', { x: 330, y: fy - 150, s: 230, mood: tt > 49.2 ? 'happy' : 'neutral', look: [1, 0], seed: 2, hops: [41.5, 42.1, 49.5, 50.1] })
          sign(xx, tt, 'virgo', { x: 740, y: fy - 150, s: 230, mood: tt > 52.6 ? 'happy' : tt > T.matters ? 'sparkle' : 'wide', look: [-1, 0], seed: 5, hops: [T.matters, T.matters + 0.5, 52.9, 53.5], squash: tt < T.matters ? 0.04 * Math.sin(tt * 30) : 0 })
          if (tt > 49.4) sparkles(xx, tt, 740, fy - 260, 49.6, 12, 200, 2, [GOLD, BONE, GREEN])
        },
      })
      chyron(x, t, { t0: T.ch4, label: 'INTERVIEW', text: t < T.matters ? 'VIRGO, LIVE · BEFORE THE BIG NIGHT' : t < 49.4 ? '“…THAT IT MATTERS.”' : 'GOOD NERVOUS · NOTED' })
    } else if (sh === 'cafe') {
      live(x, t, FULL, { place: 'THE CAFÉ WINDOW', clock: '10:02 PM', draw: (xx, tt, R) => { cafeWindow(xx, tt, R); const F = sign(xx, tt, 'leo', { x: 160, y: 1180, s: 160, mood: 'squint', seed: 15, hops: [58.9, 59.5, 60.1] }); mic(xx, tt, F, { flag: 'STARS' }) } })
      chyron(x, t, { t0: T.cafe, label: 'LIVE AT 10', text: 'VIRGO: LAUGHING · THE LIST: UNOPENED' })
    }
    ticker(x, t, { y: 1404, items: ['FIRST DATE: TONIGHT', 'TOPICS PREPARED: 14', 'TRAFFIC: “WHAT IF” BRIDGE', 'FORECAST: BUTTERFLIES', 'FOLLOW-UP AT 10 P.M.'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ['whoosh', 0.1, 0.4, 0.05], ...stingCues(T.desk + 0.1, 0.6),
    ...TOPICS.map((_, i) => ['tick', +(T.list + 0.15 * i).toFixed(2), 0.03]), ['pop', T.list + 1.4, 1318.51, 0.04, 0],
    ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.ch2 + 0.6 + i * 1.6).toFixed(2), 330, 0.02, (i % 2 ? 0.4 : -0.4)]), ['whoosh', T.detour, 2.0, 0.04], ['bell', T.detour + 0.1, 1760, 0.03, 1.0, 0],
    ...stingCues(T.ch3 + 0.1, 0.6), popCue(28.6, 739.99, 0.035, 0), popCue(30.2, 1174.66, 0.035, 0), popCue(34.4, 1567.98, 0.035, 0), ['swell', 32.6, 34.0, { gain: 0.03 }], ...sobCues(37.0, 3), ...sobCues(38.8, 3),
    ...stingCues(T.ch4 + 0.1, 0.6), ['pluck', T.matters + 0.6, 659.25, 0.04, 0.8, 0], ['glitter', 49.6, 50.2],
    ...stingCues(T.ch5 + 0.1, 0.8), ...[59.2, 60.4, 61.6, 62.4].map((a, i) => popCue(a, [987.77, 1174.66, 1318.51, 1567.98][i], 0.03, i % 2 ? 0.3 : -0.3)), popCue(60.8, 880, 0.04, 0),
    ...sobCues(65.0, 3), ...sobCues(66.4, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
