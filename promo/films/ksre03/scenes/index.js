// ksre03: FALLING IN LOVE: SPEEDRUN · Gemini: The Ramble Skip (15 s vertical, star_talk post, Month 2 boost m03)
// music: funk · A. Loop (the last 0.4 s ease back into frame 0). No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: a first date, Gemini mid-sentence, bubbles everywhere; AWKWARD SILENCE greyed out: SKIPPED.
//   0.6   record scratch + freeze: "normally there's a *silence* here."  The premise (nervous rambling) by 2 s.
//   2.0   the ramble resumes (soup, maps, a cousin's dog) · 4.0 the date goes quiet… Pisces: "they're nervous too"
//   5.4   the date rambles BACK · 7.4 both streams fill the screen · 9.0 FIRST LAUGH gold · 10.0 NEW CATEGORY
//   11.8  "Two nervous talkers. | One record." · 14.6 loop-back to frame 0.
import { makeRun, splitCues, fmtClock, runAt, GOLD, BONE, INK, PINK, GREEN, MONO, clamp, lerp, prog, ease, pop01, outK } from '../../ksre01/srkit.js'

const D = 15
const T = { rec: 0.6, resume: 1.9, quiet: 4.0, back: 5.4, flood: 7.4, laugh: 9.0, cat: 10.0, last: 11.8 }
const SPLITS = [
  { name: 'SAT DOWN', at: -1, time: '0:01.10', state: 'gold', delta: '-0:01' },
  { name: '"SO… HI"', at: -1, time: '0:02.40', state: 'green', delta: '-0:00' },
  { name: 'AWKWARD SILENCE', at: 0, time: 'SKIPPED', state: 'skip' },
  { name: 'FIRST LAUGH', at: T.laugh, time: '0:09.80', state: 'gold', delta: '-0:20' },
]
const KEYS = [[0, 3.2], [D, 3.2 + D]]
const timer = t => ({ text: fmtClock(runAt(KEYS, t)), col: t > T.laugh ? GOLD : GREEN, sub: t > T.cat ? 'NEW CATEGORY' : 'RAMBLE STRAT', subCol: t > T.cat ? GOLD : undefined })
const cam = t => {
  if (t < T.quiet) return { mood: 'sparkle', tears: 1, look: [-1, 0.7] }
  if (t < T.back) return { mood: 'wide', tears: 2, look: [-1, 0.7], say: "they're nervous too!!", sayAt: T.quiet + 0.2, sayEnd: T.back - 0.1, sayX: 690, sayY: 650 }
  return { mood: t > T.laugh ? 'happy' : 'heart', tears: 3, look: [-1, 0.6], hops: [T.laugh, T.cat] }
}
// Gemini's ramble (left) and the date's ramble back (right): [t0, t1, text, x, y]
const G = [
  [-1, 2.6, 'ok so FIRST of all', 300, 850], [-1, 1.5, 'I love this place', 330, 970],
  [1.9, 3.6, "my cousin's dog can open doors", 360, 850], [2.5, 4.0, 'anyway do you like soup', 300, 970], [3.1, 4.1, 'MAPS. do you like maps', 380, 750],
  [T.flood, 10.6, 'soup is a hug!!', 260, 730], [T.flood + 0.6, 10.6, 'wait you have a cousin too?', 330, 850],
]
const C = [
  [T.back, 7.3, 'I ALSO love soup', 760, 850], [T.back + 0.7, 8.4, 'maps are SO good', 740, 970], [T.back + 1.3, 9.0, 'my aunt has a parrot', 760, 730],
  [T.flood + 0.3, 10.6, 'it says "hello" back', 760, 970], [T.flood + 0.9, 10.6, 'ok I talk when nervous', 720, 1100],
]
function world(x, t, S) {
  S.level(x, t, { theme: 'cafe', floor: 1300 })
  // the little date table
  x.fillStyle = INK; x.fillRect(380, 1150, 320, 20); x.fillRect(530, 1168, 20, 132); x.fillStyle = '#c9855a'; x.fillRect(386, 1154, 308, 10)
  S.heartBits(x, 540, 1130, 5, PINK)
  const talkG = t < T.quiet || (t > T.flood && t < T.laugh), talkC = t > T.back && t < T.laugh
  const gh = [], ch = []
  for (let k = -0.6; k < D; k += 0.32) { if (talkG) gh.push(k); if (talkC) ch.push(k + 0.16) }
  const gm = t > T.laugh ? 'happy' : t > T.quiet && t < T.back ? 'wide' : 'sparkle'
  const cm = t > T.laugh ? 'happy' : t < T.back ? (t > T.quiet ? 'neutral' : 'wide') : 'sparkle'
  S.shadow(x, 260, 1302, 210); S.shadow(x, 820, 1302, 210)
  const lh = t > T.laugh && t < T.cat + 1 ? [T.laugh, T.laugh + 0.3, T.laugh + 0.6, T.laugh + 0.9] : []
  S.star(x, t, { id: 'gemini', x: 260, y: 1170, s: 230, mood: gm, look: [1, 0], seed: 4, hops: [...gh.filter(h => h < t + 0.5 && h > t - 1), ...lh] })
  S.star(x, t, { id: 'virgo', x: 820, y: 1170, s: 230, mood: cm, look: [-1, 0], blush: 1, seed: 8, flip: false, hops: [...ch.filter(h => h < t + 0.5 && h > t - 1), ...lh.map(h => h + 0.1)] })
  for (const [a, b, s, bx, by] of G) S.bubble(x, t, bx, by, a, b, s, { size: 35, tail: -0.5, maxW: 560 })
  for (const [a, b, s, bx, by] of C) S.bubble(x, t, bx, by, a, b, s, { size: 35, tail: 0.5, maxW: 560, col: '#ffd9e8' })
  if (t > T.quiet + 0.3 && t < T.back) S.txt(x, '. . .', 820, 1010, { size: 60, col: BONE, alpha: 0.5 + 0.5 * Math.sin(t * 6) })
  // the laugh: "HA" pixels
  if (t > T.laugh && t < T.cat + 1.2) for (let i = 0; i < 4; i++) { const k = pop01(t, T.laugh + i * 0.25, 0.25, 2.6) * outK(t, [T.cat + 0.9, T.cat + 1.2]); S.txt(x, 'HA', [200, 880, 330, 760][i], [960, 950, 860, 850][i], { size: 54, col: GOLD, scale: k, rot: [-0.2, 0.2, 0.1, -0.1][i] }) }
}
const HOOK = { at: -1, text: 'GEMINI SKIPS THE | *awkward silence.*', top: 620, size: 104, out: [1.75, 1.95] }
const REC = { at: T.rec, len: 1.3, caption: "normally there's a *silence* here.", sub: 'the hardest split on a first date', top: 1520 }
const ACH = { at: T.cat, out: [T.last - 0.3, T.last - 0.1], title: 'NEW CATEGORY', text: '*double ramble* any%', y: 1520 }
const LAST = { at: T.last, text: 'Two nervous talkers. | *One record.*', top: 640, size: 100, out: [14.3, 14.55] }
const EP = makeRun({
  id: 'ksre03', duration: D, runner: 'gemini', category: 'FIRST DATE%',
  fx: [['slamTitle', HOOK, true], ['recordScratch', REC], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, current: t => t < T.laugh ? 3 : 4, ending: { type: 'loop', len: 0.4 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
const babble = (t0, t1, hz, pan) => { const o = []; for (let t = Math.max(0, t0); t < t1; t += 0.11) o.push(['pop', +t.toFixed(3), hz * (1 + ((Math.round(t * 100) * 7) % 5) * 0.07), 0.012, pan]); return o }
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)), ['tick', 0.05, 0.05],
  ...babble(0, T.rec, 880, -0.3), ...babble(T.resume, T.quiet, 880, -0.3), ...babble(T.back, T.laugh, 659.25, 0.3), ...babble(T.flood, T.laugh, 987.77, -0.3),
  ['pluck', T.quiet + 0.3, 440, 0.03, 0.6, 0.4], ['pluck', T.quiet + 0.6, 415.3, 0.03, 0.6, 0.4],
  ...[0, 0.25, 0.5, 0.75].map(d => ['pop', T.laugh + d, 1174.66 + d * 400, 0.035, d % 0.5 ? 0.3 : -0.3]),
]
void [lerp, clamp, ease, MONO, prog]
