// ksre02: FALLING IN LOVE: SPEEDRUN · Taurus: Slow Burn% (18 s vertical, star_talk post, Month 2 boost m03)
// music: lofi · F. Hard cut. No end card, no card cut. The show look lives in ../ksre01/srkit.js.
//   0.0   frame 0: Taurus mid-wave (frozen halfway), the timer reads in MONTHS, chat spamming SAY HI.
//   0.5   record scratch + freeze: "this is the *fastest* Taurus run."  The premise (a months-long crush) by 2.5 s.
//   3.0   one table closer (+1 WEEK) · 5.0 opens its mouth… sips its coffee instead (+1 WEEK) · 7.0 Pisces begs, crying.
//   8.4   loading bar "gathering courage…" · 10.8 "hi." · SAY "HI" goes gold · 11.8 "finally!! I've liked you since
//         month one" · 13.4 achievement · 16.4 "Slowest run. | Best ending." · hold · hard cut 18.0.
import { makeRun, splitCues, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, clamp, lerp, prog, ease, pop01, outK, drawBits } from '../../ksre01/srkit.js'

const D = 18
const T = { rec: 0.5, step1: 3.0, sip: 5.0, beg: 7.0, load: 8.4, hi: 10.8, split: 11.05, reply: 11.8, ach: 13.4, last: 16.4 }
const SPLITS = [
  { name: 'NOTICED THEM', at: -1, time: 'MONTH 1', state: 'green' },
  { name: 'LEARNED THEIR ORDER', at: -1, time: 'MONTH 2', state: 'green' },
  { name: 'SAT ONE TABLE CLOSER', at: -1, time: 'MONTH 3', state: 'green' },
  { name: 'SAID "HI"', at: T.split, time: 'MONTH 4', state: 'gold' },
]
const dayAt = t => 12 + 7 * ease.inOutCubic(prog(t, T.step1, T.step1 + 0.6)) + 7 * ease.inOutCubic(prog(t, T.sip + 0.8, T.sip + 1.4)) + 2 * prog(t, T.load, T.load + 2.2)
const timer = t => {
  const d = Math.floor(dayAt(t)), m = 4 + Math.floor((d - 1) / 30), dd = ((d - 1) % 30) + 1
  return { text: `M${m} · D${String(dd).padStart(2, '0')}`, col: t > T.split ? GOLD : '#9fe6b0', sub: t > T.split ? 'NEW PB: IT COUNTS' : 'SLOW BURN% · GLITCHLESS', subCol: t > T.split ? GOLD : undefined }
}
const cam = t => {
  if (t < T.beg) return { mood: 'wide', tears: 1, look: [-1, 0.7] }
  if (t < T.hi) return { mood: 'wide', tears: 3, look: [-1, 0.7], shake: 3, say: 'JUST SAY HI 😭'.replace(' 😭', '!!'), sayAt: T.beg + 0.1, sayEnd: T.load - 0.1, sayX: 690, sayY: 650 }
  return { mood: t > T.reply ? 'heart' : 'happy', tears: 3, look: [-1, 0.6], hops: [T.hi + 0.1, T.reply + 0.1] }
}
const CUP = ['.WWWWW..', 'BBBBBBB.', 'BBBBBBBBB', 'BBBBBBB.B', 'BBBBBBBBB', 'BBBBBBB..', '.BBBBB...']
function world(x, t, S) {
  S.level(x, t, { theme: 'cafe', floor: 1300 })
  // the café counter on the right
  x.fillStyle = INK; x.fillRect(640, 1080, 440, 230); x.fillStyle = '#8a5a3c'; x.fillRect(648, 1088, 432, 214); x.fillStyle = '#c9855a'; x.fillRect(648, 1088, 432, 20)
  // two little tables
  for (const tx of [250, 470]) { x.fillStyle = INK; x.fillRect(tx - 70, 1180, 140, 18); x.fillRect(tx - 8, 1196, 16, 104); x.fillStyle = '#c9855a'; x.fillRect(tx - 64, 1184, 128, 10) }
  // Taurus: mid-wave, then one table closer, then the sip, then "hi."
  const step = ease.inOutCubic(prog(t, T.step1, T.step1 + 0.6))
  let tx = lerp(250, 470, step), mood = 'neutral', look = [1, 0], rot = 0
  if (t < 1) rot = -0.14 + 0.1 * Math.sin(t * 10) * (t < T.rec ? 1 : 0)
  if (t > T.sip && t < T.sip + 0.8) mood = 'wide'
  if (t > T.sip + 0.8 && t < T.beg) { mood = 'squint'; look = [0, 0] }
  if (t > T.load) { mood = 'squint'; look = [1, 0] }
  if (t > T.hi) mood = 'happy'
  if (t > T.reply + 0.3) mood = 'heart'
  S.shadow(x, tx, 1302, 200)
  if (t < 1) for (let i = 0; i < 3; i++) { x.fillStyle = BONE; x.globalAlpha = 0.6; x.fillRect(tx - 150 - i * 18, 960 + i * 30, 10, 40); x.globalAlpha = 1 }
  S.star(x, t, { id: 'taurus', x: tx, y: 1140, s: 230, mood, look, rot, blush: 1, seed: 5, hops: [T.step1 + 0.1, T.step1 + 0.35, T.hi, T.reply + 0.4, T.reply + 0.8] })
  // the coffee cup it hides behind
  const sipK = clamp(prog(t, T.sip + 0.4, T.sip + 0.6)) * (1 - clamp(prog(t, T.sip + 1.6, T.sip + 1.8)))
  drawBits(x, CUP, { W: '#ffffff', B: '#efe6d6' }, tx + 70 - sipK * 50, 1180 - sipK * 70, 8)
  if (sipK > 0.5) S.txt(x, '*sip*', tx - 10, 990, { size: 34, col: BONE })
  // the crush at the counter
  S.shadow(x, 820, 1082, 180)
  S.star(x, t, { id: 'cancer', x: 820, y: 960, s: 200, mood: t > T.hi ? (t > T.reply ? 'heart' : 'wide') : 'happy', look: t > T.hi ? [-1, 0] : [0.3, -0.4], blush: t > T.hi ? 1 : 0, seed: 9, hops: [T.hi + 0.2, T.reply] })
  S.bubble(x, t, tx + 20, 900, T.hi, T.ach - 0.2, 'hi.', { size: 44, tail: 0 })
  S.bubble(x, t, 700, 760, T.reply, T.last - 0.3, "finally!! I've liked you | since month one", { size: 34, tail: 0.5, maxW: 640 })
}
const CHAT = ['SAY HI', 'say hi!!', 'SAY. HI.', 'they are RIGHT THERE', 'month 4 lmao', 'SAY HI', 'we believe in you', 'SAY HIIII', 'any day now', 'SAY HI']
function over(x, t, S) {
  // the stream chat spamming SAY HI (left edge, scrolling up)
  if (t < T.hi + 0.6) {
    const rate = t < T.beg ? 1.6 : 4
    for (let i = 0; i < 9; i++) {
      const ph = ((t * rate * 0.12 + i / 9) % 1)
      const y = 1720 - ph * 300, a = Math.sin(Math.PI * ph) * outK(t, [T.hi, T.hi + 0.6])
      S.txt(x, CHAT[(i + Math.floor(t * rate * 0.12 + i / 9) * 3) % CHAT.length], 80 + (i % 3) * 330, y, { size: 28, font: MONO, weight: 700, col: i % 3 ? '#cfc8ef' : GOLD, align: 'left', alpha: 0.85 * a, ls: 1 })
    }
  }
  S.stamp(x, '+1 WEEK', 540, 820, pop01(t, T.step1 + 0.3, 0.22, 2.8) * outK(t, [T.step1 + 1.4, T.step1 + 1.6]), { size: 64, col: RED, rot: -0.06 })
  S.stamp(x, '+1 WEEK', 540, 820, pop01(t, T.sip + 1.0, 0.22, 2.8) * outK(t, [T.sip + 1.9, T.sip + 2.1]), { size: 64, col: RED, rot: 0.06 })
}
const REC = { at: T.rec, len: 1.7, caption: 'the *fastest* Taurus run on record.', sub: 'month four. still going.', top: 1520 }
const HOOK = { at: -1, text: 'TAURUS IS ON | *month four.*', top: 640, size: 112, out: [2.6, 2.85] }
const LOAD = { at: T.load, len: 2.2, label: 'gathering courage…', stallAt: 99, error: null, y: 860 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], text: 'said *hi.* (eventually)', y: 1520 }
const LAST = { at: T.last, text: 'Slowest run. | *Best ending.*', top: 660, size: 112 }
const EP = makeRun({
  id: 'ksre02', duration: D, runner: 'taurus', category: 'SLOW BURN%',
  fx: [['slamTitle', HOOK, true], ['recordScratch', REC], ['loadingBar', LOAD], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, camera: t => ({ zoom: 1, dx: shake(t, T.hi, 10) }),
  current: () => 3, ending: { type: 'cut' },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ['whoosh', T.step1, 0.4, 0.04], ['tick', T.step1 + 0.3, 0.06], ['pop', T.step1 + 0.32, 440, 0.04, 0],
  ['pluck', T.sip + 0.4, 523.25, 0.03, 0.4, -0.2], ['tick', T.sip + 0.5, 0.04], ['tick', T.sip + 1.0, 0.06], ['pop', T.sip + 1.02, 440, 0.04, 0],
  ['pluck', T.beg + 0.1, 440, 0.035, 0.5, 0.4], ['pluck', T.beg + 0.3, 415.3, 0.035, 0.5, 0.4],
  ['pop', T.hi, 880, 0.05, -0.2], ['pop', T.reply, 1174.66, 0.04, 0.3], ['pop', T.reply + 0.1, 1318.51, 0.035, 0.3], ['glitter', T.reply + 0.2, T.reply + 0.8],
]
void [BONE, PINK, GREEN, BLUE, lerp]
