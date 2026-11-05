// kbne16: BREAKING NEWS: THE STARS, Ep 16 (long) · "The 11 O'Clock Hour: Left on Read" (75 s vertical, star_talk post,
// music: cinematic · Em). No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
// Promise up front: "STAY FOR THE 11:59 UPDATE". Five chapter stickers.
//   1 TOP STORY (0–13): frame 0 mid-whip into the desk, the slab mid-slam; the monitor shows ♋ Cancer's phone, READ 7:14 PM.
//     Hook: "BREAKING: Cancer left on read. | *Four hours.*" Cut to the phone (1.3); record scratch at 2.5. Back at the desk,
//     THE STARS read the story; a clock graphic spins 7:14 → 11:14 (9.5).
//   2 LIVE ON THE SCENE (13–28): ♈ Aries outside Cancer's window: "they've reread it *nine times.*" A REREAD counter ticks;
//     four drafts get typed and crossed out.
//   3 FEELINGS FORECAST (28–43): ♓ Pisces at the weather wall, crying: heavy overthinking, scattered "is it me?" showers,
//     clearing by morning (a sun pops up).
//   4 THE PANEL (43–60): ♍ Virgo ("check the punctuation"), ♒ Aquarius ("people get busy") and ♎ Libra ("if it still bugs
//     you tomorrow, ask kindly").
//   5 THE UPDATE (60–75): 11:59. "sorry!! phone died at work. how was YOUR day??" Cancer laughs; Pisces sobs.
//     Last headline (74.0): "The phone *died.* | You *didn't.*" Hard cut at 75.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, phone, street, windowFrame, weather, panel, caught, bubble, chip, txt, px, mic, wind, sparkles, tears, promise, chap,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, TEAR, CYAN,
} from '../../kbne01/newskit.js'
import { chapter, chapterCues } from '../../hookkit.js'

const D = 75
const T = {
  slam: 0.15, cut1: 1.3, rec: 2.5, desk: 4.0, clock: 9.5,
  ch2: 13.0, reread: [17.5, 19.0, 20.5], drafts: [19.6, 20.6, 21.6, 22.6],
  ch3: 28.0, sun: 37.0,
  ch4: 43.0, cut4b: 56.6,
  ch5: 60.0, cutP: 61.5, reply: 62.6, cutW: 65.5, cutD: 69.0, last: 74.0,
}
const CUTS = [T.cut1, T.desk, T.ch2, T.ch3, T.ch4, T.cut4b, T.ch5, T.cutP, T.cutW, T.cutD]
const REC = { at: T.rec, len: 1.3, caption: 'read. *four hours ago.*', top: 1180 }
const CH = [chap(T.desk + 0.1, 1, 'Top story'), chap(T.ch2 + 0.1, 2, 'Live on the scene'), chap(T.ch3 + 0.1, 3, 'Feelings forecast'), chap(T.ch4 + 0.1, 4, 'The panel'), chap(T.ch5 + 0.1, 5, 'The update')]
const S = 'THE STARS', AR = '♈︎ ARIES · LIVE', PI = '♓︎ PISCES · WEATHER', VI = '♍︎ VIRGO', AQ = '♒︎ AQUARIUS', LI = '♎︎ LIBRA'
const LINES = [
  { t: 4.3, speaker: S, text: 'good evening. our top story: a text, read at *7:14.*' },
  { t: 7.6, speaker: S, text: 'no reply. it is now *11:14.*' },
  { t: 13.4, speaker: AR, color: '#ff7a4a', text: 'I’m outside the scene. they’ve reread it *nine times.*' },
  { t: 19.0, speaker: AR, color: '#ff7a4a', text: 'four replies drafted. *none* sent.' },
  { t: 23.8, speaker: AR, color: '#ff7a4a', text: 'back to you in the *studio.*' },
  { t: 28.4, speaker: PI, color: '#8fd0ff', text: 'tonight: heavy *overthinking*…' },
  { t: 32.4, speaker: PI, color: '#8fd0ff', text: '…scattered “is it *me?*” showers…' },
  { t: 36.6, speaker: PI, color: '#8fd0ff', text: '…clearing by *morning.* (sniff)' },
  { t: 40.2, speaker: PI, color: '#8fd0ff', text: 'I’m fine. it’s just *weather.*' },
  { t: 43.4, speaker: VI, color: '#9fe6b0', text: 'step one: check the punctuation. “ok” or “ok*.*”?' },
  { t: 48.0, speaker: AQ, color: '#7fd0ff', text: 'people get *busy.* a read receipt isn’t a verdict.' },
  { t: 52.4, speaker: LI, color: '#f6b3d8', text: 'if it still bugs you tomorrow, ask *kindly.*' },
  { t: 56.9, speaker: S, text: 'the panel agrees: no spiral *tonight.*' },
  { t: 60.3, speaker: S, text: 'this just in. *11:59 p.m.*' },
  { t: 65.8, speaker: AR, color: '#ff7a4a', text: 'they’re… laughing. I repeat: *laughing.*' },
  { t: 69.3, speaker: S, text: 'everyone, you may *exhale.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.desk ? 'phone' : t < T.ch2 ? 'desk1' : t < T.ch3 ? 'field' : t < T.ch4 ? 'weather' : t < T.cut4b ? 'panel' : t < T.ch5 ? 'deskP' : t < T.cutP ? 'deskU' : t < T.cutW ? 'phone2' : t < T.cutD ? 'window' : 'deskF'
const MINE = { at: -9, side: 'R', text: 'how was your day? :)', time: '7:13 PM · Read 7:14 PM' }
const DRAFTS = ['lol ok', 'cool cool', 'no worries!!', 'did I do something?']

function clockFace(x, t, cx, cy, r) {
  px(x, cx - r - 10, cy - r - 10, 2 * r + 20, 2 * r + 20, INK)
  x.fillStyle = '#f4ecd8'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  const u = ease.inOutCubic(prog(t, T.clock, T.clock + 2.2)), hrs = 7 + 14 / 60 + 4 * u
  const hA = (hrs / 12) * Math.PI * 2 - Math.PI / 2, mA = (hrs % 1) * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'round'
  x.lineWidth = 14; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(hA) * r * 0.5, cy + Math.sin(hA) * r * 0.5); x.stroke()
  x.lineWidth = 8; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(mA) * r * 0.8, cy + Math.sin(mA) * r * 0.8); x.stroke()
  const hh = Math.floor(hrs), mm = Math.floor((hrs % 1) * 60)
  chip(x, cx, cy + r + 50, `${hh}:${String(mm).padStart(2, '0')} PM`, { size: 28, color: GOLD })
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne16', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Cancer left on read. | *Four hours.*', at: -1, out: [3.8, 4.0], accent: '#c9e6ff' },
    { text: 'Top story: | *7:14 PM.*', at: T.desk + 0.1, out: [12.8, 13.0], accent: GOLD },
    { text: 'LIVE: outside | *the window.*', at: T.ch2 + 0.1, out: [27.8, 28.0], accent: '#ff7a4a' },
    { text: 'Feelings | *forecast.*', at: T.ch3 + 0.1, out: [42.8, 43.0], accent: TEAR },
    { text: 'The *panel* | weighs in.', at: T.ch4 + 0.1, out: [59.8, 60.0], accent: '#9fe6b0' },
    { text: 'UPDATE: | *11:59 PM.*', at: T.ch5 + 0.1, out: [73.8, 74.0], accent: '#ff8fa0' },
    { text: 'The phone *died.* | You *didn’t.*', at: T.last, gap: 0.07, accent: GOLD, size: 100, accentSize: 140 },
  ],
  lines: LINES, box: { open: 4.1, close: 74.95 },
  cuts: CUTS, recs: [REC], fx: CH.map(c => chapter(c)), fxCues: CH.flatMap(c => chapterCues(c)),
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0),
  over(x, t) { promise(x, t, 'STAY FOR THE 11:59 UPDATE', [0, 12.6]) },
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh.startsWith('desk')) {
      const mode = sh
      const fin = mode === 'deskF', upd = mode === 'deskU'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#1a1440', bot: '#120c30' })
          if (mode === 'desk1' && tt > T.clock - 0.3) { clockFace(xx, tt, 540, 660, 100); return }
          if (fin) { sign(xx, tt, 'cancer', { x: 540, y: 760, s: 160, mood: 'happy', seed: 12 }); chip(xx, 540, 600, 'PHONE: CHARGING', { size: 20, color: GREEN2 }); return }
          phone(xx, tt, { cx: 540, cy: 680, w: 300, h: 300, title: '♌︎ them', font: 18, msgs: [{ at: -9, side: 'R', text: 'how was your day? :)', time: upd ? '11:59 · typing…' : 'Read 7:14 PM' }] })
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : mode === 'deskP' ? 'happy' : 'wide', look: mode === 'desk1' && t > T.clock ? [1, -0.6] : [0.3, -0.4], hops: fin ? [69.4, 70.2, 71.0, T.last] : mode === 'desk1' ? [4.4, 5.0, 5.6, 7.7, 8.3] : mode === 'deskP' ? [57.0, 57.6] : mode === 'deskU' ? [60.4, 60.9] : [0.2] },
        p: { mood: fin ? 'happy' : 'wide', tears: fin ? 3 : 1, tissue: fin ? pop01(t, T.cutD + 0.3, 0.3, 2) : 0, look: [-1, -0.5], hops: fin ? [69.3, 69.7, 70.1, 70.6, 71.8, T.last + 0.05] : [0.25] },
        chyron: { t0: mode === 'desk' ? 1.15 : mode === 'desk1' ? T.desk : mode === 'deskP' ? T.cut4b : mode === 'deskU' ? T.ch5 : T.cutD, label: mode === 'deskU' ? 'BREAKING' : mode === 'desk' ? 'BREAKING' : 'DEVELOPING', text: { desk: 'CANCER · LEFT ON READ · 4 HOURS AND COUNTING', desk1: 'READ AT 7:14 · NO REPLY · CANCER: HOLDING', deskP: 'PANEL VERDICT: NO SPIRAL TONIGHT', deskU: 'NEW ACTIVITY IN THE CHAT · 11:59 PM', deskF: 'PHONE DIED AT WORK · EVERYONE EXHALES' }[mode] },
        slam: mode === 'desk' ? { t0: -0.15, land: T.slam, dock: [1.0, 1.3] } : null, papers: mode === 'desk' ? -0.3 : null,
      })
    } else if (sh === 'phone' || sh === 'phone2') {
      const two = sh === 'phone2'
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const msgs = two ? [MINE, { at: T.reply, side: 'L', text: 'sorry!! phone died at work. how was YOUR day??', time: '11:59 PM' }] : [MINE]
      const bs = phone(x, two ? t : st, { cx: 540, cy: 900, w: 640, h: 760, title: '♌︎ them', status: two ? 'online' : 'last seen 7:14 PM', msgs, typing: two ? [T.cutP + 0.2, T.reply] : null })
      if (!two && bs[0]) caught(x, t, bs[0].tx - 80, bs[0].ty, 160, T.rec + 0.1, { w: 10 })
      if (two && bs[1]) caught(x, t, bs[1].x, bs[1].y, 200, T.reply + 0.9, { col: GOLD, w: 10 })
      sign(x, two ? t : st, 'cancer', { x: 890, y: 1250, s: 150, mood: two && t > T.reply + 0.3 ? 'happy' : 'wide', look: [-1, -1], seed: 12, hops: two ? [T.reply + 0.3, T.reply + 0.7, 64.0] : undefined })
      chyron(x, t, { t0: two ? T.cutP : T.cut1, label: 'BREAKING', text: two ? 'THE REPLY: “PHONE DIED AT WORK”' : 'READ 7:14 PM · NO REPLY' })
    } else if (sh === 'field' || sh === 'window') {
      const end = sh === 'window'
      live(x, t, FULL, {
        place: 'OUTSIDE CANCER’S WINDOW', clock: end ? '12:00 AM' : `${t < 20 ? '11:15' : '11:17'} PM`, draw: (xx, tt, R) => {
          street(xx, tt, R, { lit: 0.3, sky: '#0c0828' })
          windowFrame(xx, 730, 760, 360, 320, w => {
            const g = w.createLinearGradient(0, 600, 0, 920); g.addColorStop(0, '#2a3a7a'); g.addColorStop(1, '#1a2458'); w.fillStyle = g; w.fillRect(550, 600, 360, 320)
            sign(w, tt, 'cancer', { x: 730, y: 850, s: 180, mood: end ? 'happy' : 'neutral', look: end ? [0, 0] : [0, 1], seed: 12, hops: end ? [66.0, 66.4, 66.8, 67.4, 68.0] : [T.reread[0], T.reread[1], T.reread[2]] })
          })
          if (!end) DRAFTS.forEach((d, i) => {
            const a = T.drafts[i]; if (tt < a || tt > a + 1.2) return
            bubble(xx, tt, 730, 560, a, a + 0.95, d, { size: 28, col: '#4f8df0', color: BONE })
            if (tt > a + 0.55) { xx.strokeStyle = RED; xx.lineWidth = 8; xx.beginPath(); xx.moveTo(620, 560); xx.lineTo(840, 560); xx.stroke() }
          })
          if (end) { bubble(xx, tt, 730, 560, 66.0, null, 'HAHA. phone died!!', { size: 30, col: '#ffe27a' }); sparkles(xx, tt, 730, 760, 66.1, 12, 200, 2, ['#ff8fa0', GOLD, BONE]) }
          const F = sign(xx, tt, 'aries', { x: 270, y: 1110, s: 240, mood: end ? 'sparkle' : 'squint', look: [0, 0], seed: 7, hops: end ? [65.9, 66.4, 67.0] : [13.5, 14.1, 14.7, 19.1, 19.7, 23.9, 24.5] })
          mic(xx, tt, F, { flag: 'STARS' })
          wind(xx, tt, R, 0.8)
          if (!end && tt > T.reread[0]) chip(xx, 730, 990, `REREAD: ${9 + T.reread.filter(r => tt >= r).length - 1}`, { size: 30, color: GOLD, k: 1 + 0.2 * Math.exp(-(tt - Math.max(...T.reread.filter(r => tt >= r))) * 8) })
        },
      })
      chyron(x, t, { t0: end ? T.cutW : T.ch2, label: 'LIVE', text: end ? 'CANCER LAUGHING · ARIES RELIEVED · NIGHT SAVED' : 'REREADS: MANY · REPLIES SENT: ZERO' })
    } else if (sh === 'weather') {
      live(x, t, FULL, {
        label: 'WEATHER', place: 'THE FEELINGS MAP', clock: 'TONIGHT', draw: (xx, tt, R) => {
          weather(xx, tt, R, {
            title: 'FEELINGS FORECAST', icons: [
              { x: 330, y: 760, kind: 'fog', label: 'OVERTHINKING', at: 28.6 },
              { x: 660, y: 700, kind: 'rain', label: '“IS IT ME?”', at: 32.6, col: TEAR },
              { x: 470, y: 1000, kind: 'q', label: 'REREADS', at: 34.4 },
              { x: 820, y: 960, kind: 'sun', label: 'MORNING', at: T.sun, col: GOLD },
            ],
          })
          const F = sign(xx, tt, 'pisces', { x: 180, y: 1140, s: 230, mood: tt > T.sun ? 'happy' : 'sparkle', look: [1, -0.5], seed: 6, hops: [28.5, 29.1, 32.5, 33.1, 36.7, 37.3, 40.3, 40.9] })
          tears(xx, tt, F, tt > 40 ? 3 : 2)
          // the clicker
          if (F) { px(xx, F.ox + 90, F.oy - 160, 26, 60, INK); px(xx, F.ox + 94, F.oy - 156, 18, 52, '#3d3658') }
        },
      })
      chyron(x, t, { t0: T.ch3, label: 'WEATHER', text: t < T.sun ? 'OVERTHINKING ADVISORY · ALL NIGHT' : 'CLEARING BY MORNING · BRING TISSUES' })
    } else if (sh === 'panel') {
      x.fillStyle = '#120a30'; x.fillRect(0, 470, 1080, 940)
      const talking = t < 47.8 ? 0 : t < 52.2 ? 1 : 2
      panel(x, t, { who: [{ id: 'virgo', name: '♍ VIRGO · PUNCTUATION' }, { id: 'aquarius', name: '♒ AQUARIUS · LOGIC' }, { id: 'libra', name: '♎ LIBRA · MANNERS' }].map((w, i) => ({ ...w, hops: i === talking ? [t - ((t * 3) % 1) / 3] : undefined })), talking, y: 640, h: 520, at: T.ch4 + 0.1 })
      if (t > 44.5 && t < 47.8) { chip(x, 300, 600, '“ok”', { size: 30, color: GOLD, k: pop01(t, 44.5, 0.3, 2) }); chip(x, 780, 600, '“ok.”', { size: 30, color: '#ff8fa0', k: pop01(t, 45.2, 0.3, 2) }) }
      chyron(x, t, { t0: T.ch4, label: 'PANEL', text: ['STEP 1: CHECK THE PUNCTUATION', 'A READ RECEIPT IS NOT A VERDICT', 'STILL BUGS YOU TOMORROW? ASK KINDLY'][talking] })
    }
    ticker(x, t, { y: 1404, items: ['READ 7:14 PM', 'REREADS: 9+', 'OVERTHINKING ADVISORY IN EFFECT', 'PANEL: NO SPIRAL TONIGHT', 'UPDATE AT 11:59'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ...stingCues(T.desk + 0.1, 0.7),
    ['riser', T.clock, T.clock + 2.2, 0.025], ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.clock + i * 0.27).toFixed(2), 0.04]), ['bell', T.clock + 2.25, 1760, 0.03, 1.0, 0],
    ...T.reread.map(r => popCue(r, 1174.66, 0.04, 0.2)), ...T.drafts.flatMap(d => [['tick', d, 0.03], ['tick', d + 0.1, 0.03], ['whoosh', d + 0.55, 0.2, 0.04]]),
    ...stingCues(T.ch3 + 0.1, 0.6), popCue(28.6, 659.25, 0.035, -0.3), popCue(32.6, 739.99, 0.035, 0.3), popCue(34.4, 880, 0.035, 0), ['bell', T.sun, 1760, 0.035, 1.4, 0], ['glitter', T.sun, T.sun + 0.6],
    ...sobCues(30.0, 3), ...sobCues(38.5, 3), ...sobCues(40.8, 3),
    ...stingCues(T.ch4 + 0.1, 0.6), popCue(44.5, 880, 0.04, -0.3), popCue(45.2, 659.25, 0.04, 0.3),
    ...stingCues(T.ch5 + 0.1, 0.9), ['tick', T.cutP + 0.3, 0.03], ['tick', T.cutP + 0.45, 0.03], popCue(T.reply, 1318.51, 0.05, -0.2), ['glitter', T.reply + 0.4, T.reply + 1.0],
    popCue(66.0, 1567.98, 0.04, 0), ['glitter', 66.1, 66.8], ...sobCues(69.5, 3), ...sobCues(71.0, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
const GREEN2 = '#7be0a0'
