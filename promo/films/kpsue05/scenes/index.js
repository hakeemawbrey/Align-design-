// kpsue05: PLANET TALK: THE SUN, Ep 5 "Leo's First Date, Director's Cut" (74.4 s vertical, star_talk post, funk · A).
// The Sun's home sign: a long mini-story in 5 chapters. Hard cut.
// Frame 0: the Sun mid-crash onto Leo's stage, Leo mid-pose in the spotlight, hook "LEO. We need a rehearsal."
//   3.2 stamp VERDICT AT THE END · 3.0 Leo: first date tonight, I made a plan
//   6.0 ch1 THE PLAN: the board (spotlight entrance, three outfits, the rehearsed laugh, talk about: me) · 10.0 the Sun
//       loves it · 13.8 three outfit changes (crown, bow tie, shades) · 16.6 "I'll be the date."
//   20.0 ch2 THE REHEARSAL: the Sun wears a HELLO I'M THE DATE sticker · Leo talks about Leo · 28 stats board, caught
//       circle on QUESTIONS ASKED: 0 · 30.2 the Sun dozes · 32.8 "Was I boring?" · 33.6 record scratch
//   36.0 ch3 THE TALK: two main characters · 43.8 "…share the spotlight?" · 46.2 ask what lights them up, then listen
//   50.0 ch4 THE DATE: the date arrives · "what lights you up?" · stargazing · 56.2 the spotlight swings to the date
//   62.0 ch5 THE VERDICT: the text "best date in ages. you really listen." · achievement SHARED THE SPOTLIGHT
//   66.8 Pisces in the front row, sobbing · 71.2 "Co-lead. Still iconic."
import { episode, drawPanel, drawSpot, drawStamp, hearts, key, rr, INK, GOLD } from '../../kpsue01/sunkit.js'
import { chapter, chapterCues, caught, caughtCues, notification, notificationCues, achievement, achievementCues } from '../../hookkit.js'
import { drawSign, colorOf } from '../../planetkit.js'

const CH = [
  { at: 6.0, out: [9.6, 9.9], n: 1, title: 'THE PLAN' },
  { at: 20.0, out: [23.6, 23.9], n: 2, title: 'THE REHEARSAL' },
  { at: 36.0, out: [39.6, 39.9], n: 3, title: 'THE TALK' },
  { at: 50.0, out: [53.6, 53.9], n: 4, title: 'THE DATE' },
  { at: 62.0, out: [65.6, 65.9], n: 5, title: 'THE VERDICT' },
].map(c => ({ ...c, y: 150 }))
const CAUGHT = { at: 29.0, x: 390, y: 1102, r: 210, ry: 42, out: [32.6, 32.9], label: 'ZERO.', arrow: 'br' }
const NOTIF = { at: 63.0, out: [67.6, 67.9], title: 'the date', body: 'best date in ages. you really *listen.*', glyph: '♎', time: 'now', y: 120 }
const ACH = { at: 67.4, out: [70.2, 70.5], title: 'ACHIEVEMENT UNLOCKED', text: 'shared the *spotlight*', y: 1240 }
const REC = { at: 33.6, len: 1.5, caption: 'leo, realizing *mid-monologue*', sub: 'MINUTES ABOUT LEO: ALL OF THEM', top: 1250 }
const DATE_COL = colorOf('libra')

const leoX = t => key(t, [[0, 540], [50.0, 540], [50.6, 320], [62.0, 320], [62.6, 540]])
const dateK = t => Math.min(1, Math.max(0, (t - 50.2) / 0.35)) * (1 - Math.min(1, Math.max(0, (t - 62.0) / 0.35)))

function outfit(x, t) {
  const lx = leoX(t), ly = 1420 + Math.sin(t * 2.2 + 8.4) * 11, S = 320
  if (t >= 14.0 && t < 14.8) {          // crown
    x.save(); x.translate(lx, ly - S * 0.5); x.fillStyle = INK; x.beginPath(); x.moveTo(-62, 30); x.lineTo(-70, -40); x.lineTo(-30, -6); x.lineTo(0, -56); x.lineTo(30, -6); x.lineTo(70, -40); x.lineTo(62, 30); x.closePath(); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.moveTo(-54, 22); x.lineTo(-60, -26); x.lineTo(-28, 4); x.lineTo(0, -42); x.lineTo(28, 4); x.lineTo(60, -26); x.lineTo(54, 22); x.closePath(); x.fill(); x.restore()
  }
  if (t >= 14.8 && t < 15.6) {          // bow tie
    x.save(); x.translate(lx, ly + S * 0.2); x.fillStyle = INK; x.beginPath(); x.moveTo(0, 0); x.lineTo(-64, -36); x.lineTo(-64, 36); x.closePath(); x.moveTo(0, 0); x.lineTo(64, -36); x.lineTo(64, 36); x.closePath(); x.fill()
    x.fillStyle = '#e5573b'; x.beginPath(); x.moveTo(0, 0); x.lineTo(-54, -26); x.lineTo(-54, 26); x.closePath(); x.moveTo(0, 0); x.lineTo(54, -26); x.lineTo(54, 26); x.closePath(); x.fill(); x.fillStyle = INK; x.fillRect(-14, -14, 28, 28); x.restore()
  }
  if (t >= 15.6 && t < 20.0) {          // star shades
    x.save(); x.translate(lx, ly + S * 0.035); x.fillStyle = INK; rr(x, -88, -26, 74, 50, 12); x.fill(); rr(x, 14, -26, 74, 50, 12); x.fill(); x.fillRect(-20, -18, 40, 10)
    x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-74, -16, 16, 8); x.fillRect(28, -16, 16, 8); x.restore()
  }
}
function stage(x, t) {
  // stage floor + the spotlight
  x.save(); x.fillStyle = '#3a1f2e'; x.beginPath(); x.moveTo(-20, 1560); x.lineTo(1100, 1560); x.lineTo(1100, 1940); x.lineTo(-20, 1940); x.fill()
  x.strokeStyle = 'rgba(242,199,92,0.5)'; x.lineWidth = 6; x.beginPath(); x.moveTo(-20, 1560); x.lineTo(1100, 1560); x.stroke()
  for (let i = 0; i < 9; i++) { x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 3; x.beginPath(); x.moveTo(i * 135, 1560); x.lineTo(i * 135 - 60, 1920); x.stroke() }
  x.restore()
  const tx = key(t, [[0, 540], [50.0, 540], [50.6, 320], [56.2, 320], [57.0, 790], [62.0, 790], [62.6, 540]])
  const w = key(t, [[0, 230], [62.0, 230], [62.6, 380]])
  drawSpot(x, { sx: 540 + Math.sin(t * 0.7) * 20, sy: -60, tx: tx + Math.sin(t * 1.3) * 8 * (t > 43.8 && t < 46 ? 4 : 1), ty: 1420, w, a: 0.9 })
}

const E = episode({
  sign: 'leo', duration: 74.4, ending: 'cut',
  entrance: { kind: 'crash', at: -0.6, x: 540, y: 600, size: 520 },
  hook: { text: 'LEO. We need a | *rehearsal.*' },
  sun: {
    mood: [[0, 'wide'], [0.6, 'happy'], [10.0, 'love'], [13.8, 'happy'], [20.4, 'neutral'], [23.0, 'neutral'], [25.8, 'sad'], [30.2, 'sleepy'], [31.4, 'wide'], [33.0, 'sad'], [36.4, 'happy'], [43.8, 'proud'], [46.2, 'happy'], [56.2, 'love'], [59.8, 'cry'], [62.0, 'wide'], [63.4, 'love'], [71.2, 'proud']],
    shades: [[0, true], [20.2, false]],
    tears: [[0, 0], [59.8, 1], [62.0, 0], [66.8, 2], [71.0, 0]],
    pos: [[49.6, { x: 540, y: 600, size: 520 }], [50.4, { y: 470, size: 400 }], [61.6, { y: 470, size: 400 }], [62.4, { y: 600, size: 520 }]],
    hops: [10.0, 10.5, 16.6, 36.4, 39.6, 46.2, 63.4, 63.8],
  },
  me: {
    pos: [[50.0, { x: 540 }], [50.6, { x: 320 }], [62.0, { x: 320 }], [62.6, { x: 540 }]],
    base: { x: 540, y: 1420, size: 320 },
    mood: [[0, 'wide'], [1.0, 'happy'], [3.0, 'sparkle'], [10.0, 'happy'], [13.8, 'wink'], [16.6, 'happy'], [23.0, 'happy'], [25.8, 'sparkle'], [30.2, 'neutral'], [32.8, 'wide'], [36.4, 'neutral'], [43.8, 'squint'], [46.2, 'neutral'], [50.6, 'neutral'], [53.2, 'sparkle'], [57.2, 'heart'], [62.0, 'neutral'], [63.0, 'wide'], [67.4, 'sparkle'], [71.2, 'happy']],
    look: [[0, [0, -1]], [3, [0, 0]], [20.4, [0, -1]], [50.6, [1, 0]], [62.0, [0, -1]], [63.0, [0, -1]], [71.2, [0, 0]]],
    tears: [[0, 0], [63.6, 1], [66.0, 0]],
    hops: [13.9, 14.8, 15.6, 63.5, 64.7, 65.1],
  },
  bubbles: [
    { t0: 3.0, t1: 5.8, who: 'leo', text: 'First date TONIGHT. I made a *plan.*' },
    { t0: 10.0, t1: 12.8, who: 'sun', text: 'A SPOTLIGHT ENTRANCE?! I *love* this!', y: 230, tailUp: false, shake: 2 },
    { t0: 13.8, t1: 16.4, who: 'leo', text: 'Outfit one. Outfit two. *Outfit three.*' },
    { t0: 16.6, t1: 19.6, who: 'sun', text: 'Iconic. Now let’s *rehearse.* I’ll be the date.', y: 1110 },
    { t0: 20.6, t1: 22.8, who: 'sun', text: 'Hi! So nice to finally *meet you!*', y: 1110 },
    { t0: 23.0, t1: 25.6, who: 'leo', text: 'Thanks! So, about me: I was born *iconic.*' },
    { t0: 25.8, t1: 27.9, who: 'leo', text: 'Then I got MORE iconic. Then *bangs.*' },
    { t0: 30.2, t1: 32.6, who: 'sun', text: '…zzz. Oh! Sorry. *Fascinating.*', y: 230, tailUp: false },
    { t0: 32.8, t1: 35.6, who: 'leo', text: 'Wait. Was I… *boring?*' },
    { t0: 36.4, t1: 39.4, who: 'sun', text: 'Leo, I’m the SUN. I *get* main character.', y: 1110 },
    { t0: 39.6, t1: 43.6, who: 'sun', text: 'But the best dates have TWO main characters. Let them *shine* too.', y: 1110 },
    { t0: 43.8, t1: 46.0, who: 'leo', text: '…share the *spotlight?*' },
    { t0: 46.2, t1: 49.6, who: 'sun', text: 'Ask what lights them up. Then *listen.*', y: 1110 },
    { t0: 50.6, t1: 53.0, who: 'leo', text: 'So… what *lights you up?*', x: 420, tail: -100 },
    { t0: 53.2, t1: 56.0, who: 'THE DATE', color: DATE_COL, pitch: 698.46, text: 'Honestly? Stargazing. Nobody ever *asks.*', x: 640, tail: 150 },
    { t0: 57.2, t1: 59.6, who: 'leo', text: 'Tell me *everything.*', x: 420, tail: -100 },
    { t0: 59.8, t1: 61.8, who: 'sun', text: '*Look* at our Leo.', y: 820, size: 40 },
    { t0: 64.4, t1: 66.8, who: 'leo', text: 'I’m a great… *LISTENER?*', shake: 2 },
    { t0: 69.0, t1: 71.0, who: 'pisces', text: 'Front row. Sobbing. *No notes.*' },
    { t0: 71.2, who: 'leo', text: 'Co-lead. *Still* iconic.', size: 56, x: 470, maxW: 700, tail: 70 },
  ],
  pisces: { at: 66.8, tears: [[66.8, 3]], hops: [69.0, 69.4] },
  rec: [REC],
  fx: [...CH.map(chapter), caught(CAUGHT), notification(NOTIF), achievement(ACH)],
  fxCues: [...CH.flatMap(chapterCues), ...caughtCues(CAUGHT), ...notificationCues(NOTIF), ...achievementCues(ACH)],
  back: stage,
  mid(x, t, P) {
    // the date sticker on the Sun (chapter 2)
    if (t > 20.3 && t < 35.9) {
      const k = Math.min(1, (t - 20.3) / 0.25)
      x.save(); x.translate(P.x + P.size * 0.3, P.y + P.size * 0.3); x.rotate(0.15); x.scale(k, k)
      x.fillStyle = INK; rr(x, -104, -58, 208, 116, 18); x.fill(); x.fillStyle = '#e5573b'; rr(x, -98, -52, 196, 104, 14); x.fill()
      x.fillStyle = '#fff8ea'; x.font = '800 22px Inter'; x.textAlign = 'center'; x.fillText('HELLO I’M', 0, -22)
      rr(x, -84, -8, 168, 52, 8); x.fill(); x.fillStyle = INK; x.font = "italic 600 36px 'EB Garamond'"; x.fillText('the date', 0, 30)
      x.restore()
    }
  },
  front(x, t) {
    outfit(x, t)
    const k = dateK(t)
    if (k > 0.01) drawSign(x, 'libra', 790, 1420, 300, t, { pop: k, mood: t > 57 ? 'happy' : t > 53.2 ? 'sparkle' : 'neutral', look: t > 50.6 && t < 53.2 ? [-1, 0] : [-1, -1], hops: [53.3, 53.8, 54.4], shadow: true, seed: 7 })
    drawStamp(x, t, { at: 3.3, text: 'VERDICT AT THE END', x: 540, y: 1110, size: 64, rot: -0.08, color: GOLD, out: [5.7, 6.0] })
    const pv = (a, b) => Math.min(1, Math.max(0, (t - a) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - b) / 0.3)))
    const p1 = pv(6.3, 13.4)
    if (p1 > 0.01) drawPanel(x, t, { x: 540, y: 1040, w: 720, h: 360, title: 'DATE NIGHT PLAN', pop: p1, size: 36, rows: [{ at: 6.6, text: '1. spotlight entrance' }, { at: 7.4, text: '2. three outfit changes' }, { at: 8.2, text: '3. the rehearsed laugh' }, { at: 9.0, text: '4. talk about: me', color: '#c23a6a' }] })
    const p2 = pv(28.0, 33.2)
    if (p2 > 0.01) drawPanel(x, t, { x: 540, y: 1030, w: 720, h: 330, title: 'REHEARSAL STATS', color: '#ff8fb1', pop: p2, size: 36, rows: [{ at: 28.2, text: 'Leo talked: 4 minutes' }, { at: 28.5, text: 'about Leo: 4 minutes' }, { at: 28.8, text: 'questions asked: 0', color: '#c23a3a' }] })
    hearts(x, t, { at: 57.3, cx: 560, cy: 1280, color: '#ff8fb1' })
    hearts(x, t, { at: 63.2, cx: 540, cy: 1250, color: GOLD })
  },
  cues: [
    ['tom', 3.3, 90, { gain: 0.25, decay: 0.3 }],
    ['pop', 6.6, 880, 0.03, 0.2], ['pop', 7.4, 987.77, 0.03, 0.2], ['pop', 8.2, 1108.73, 0.03, 0.2], ['pop', 9.0, 1318.51, 0.04, 0.2],
    ['whoosh', 14.0, 0.25, 0.06], ['pop', 14.05, 1318.51, 0.04, 0], ['whoosh', 14.8, 0.25, 0.06], ['pop', 14.85, 1174.66, 0.04, 0], ['whoosh', 15.6, 0.25, 0.06], ['pop', 15.65, 1479.98, 0.04, 0],
    ['pop', 28.2, 880, 0.03, 0.2], ['pop', 28.5, 880, 0.03, 0.2], ['pop', 28.8, 659.25, 0.04, 0.2],
    ['tom', 50.2, 160, { gain: 0.14, decay: 0.2 }], ['riser', 55.6, 56.4, 0.05], ['whoosh', 56.2, 0.8, 0.07], ['bell', 57.0, 880, 0.04, 2.0, 0.3], ['glitter', 57.2, 57.9],
    ['riser', 61.0, 63.0, 0.06], ['bell', 71.25, 880, 0.04, 1.6, 0],
  ],
})
export const { DURATION, SCENES, CUES } = E
