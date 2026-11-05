// ksre06: FALLING IN LOVE: SPEEDRUN · Virgo: Reset Number Forty (16 s vertical, star_talk post, Month 2 boost m03)
// music: chiptune · B. Loop (the last 0.4 s ease back into frame 0). No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: Virgo mid-smash on a giant RESET button, RESETS 39 → 40, the hook line. 0.3 screen shake.
//   1.0   the drafts: "hey" / "hey." / "hey!" / "Hey," / "heyyy" — each one RESET, the timer back to 0 every time.
//   6.2   Pisces on cam, crying: "JUST SEND IT" · 7.0 Virgo types "hey :)"… the thumb slips: "hye :)" SENT.
//   8.0   record scratch + freeze + caught circle on the typo · 9.6 the reply: "hye :) haha hi!!" · 10.3 SEND gold
//   11.0  achievement · 12.8 "Typo run. | Still counts." · 15.6 loop-back.
import { makeRun, splitCues, fmtClock, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, drawBits } from '../../ksre01/srkit.js'

const D = 16
const DRAFTS = [['hey', 1.0], ['hey.', 1.95], ['hey!', 2.9], ['Hey,', 3.85], ['heyyy', 4.8]]
const T = { smash: 0, beg: 6.0, type: 7.0, sent: 7.75, rec: 8.0, reply: 9.6, s3: 10.3, ach: 11.0, last: 12.8 }
const RESETS = [0, ...DRAFTS.map(d => d[1] + 0.75)]          // when each reset hits
const resetsAt = t => 40 + RESETS.filter(r => r > 0 && t >= r).length
const lastReset = t => { let r = -0.6; for (const v of RESETS) if (t >= v) r = v; return r }
const SPLITS = [
  { name: 'OPEN THE CHAT', at: -1, time: '0:00.40', state: 'gold', delta: '-0:01' },
  { name: 'TYPE "HEY"', at: T.sent - 0.1, time: '0:01.10', state: 'green', delta: '' },
  { name: 'SEND', at: T.s3, time: '0:03.60', state: 'gold', delta: 'PB' },
]
const timer = t => {
  const done = t >= T.s3
  const v = done ? 3.6 : t - Math.max(lastReset(t), 0) + (t < 0.3 ? 0.4 : 0)
  return { text: fmtClock(Math.max(0, v)), col: done ? GOLD : GREEN, sub: `RESETS: ${t < 0.12 ? 39 : resetsAt(t)}`, subCol: done ? GOLD : RED }
}
const cam = t => {
  if (t < T.beg) return { mood: 'wide', tears: 1, look: [-1, 0.8] }
  if (t < T.reply) return { mood: 'wide', tears: 3, look: [-1, 0.8], shake: t < T.type ? 3 : 0, say: 'JUST SEND IT', sayAt: T.beg, sayEnd: T.type + 0.5, sayX: 690, sayY: 650 }
  return { mood: 'heart', tears: 3, look: [-1, 0.6], hops: [T.reply, T.s3] }
}
function button(x, t, cx, cy, press) {
  x.fillStyle = INK; x.fillRect(cx - 130, cy - 10, 260, 90); x.fillStyle = '#5a5470'; x.fillRect(cx - 120, cy, 240, 70)
  const h = lerp(70, 26, press)
  x.fillStyle = INK; x.fillRect(cx - 104, cy - h - 8, 208, h + 16); x.fillStyle = RED; x.fillRect(cx - 96, cy - h, 192, h + 4)
  x.fillStyle = '#ff8a96'; x.fillRect(cx - 88, cy - h + 6, 176, 8)
  x.font = `900 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('RESET', cx, cy - h / 2 + 4)
}
function draftBar(x, t, cx, cy, text, cursor, sentK = 0) {
  S0.pbox(x, cx - 330, cy - 50, 660, 100, '#f4eefc', { b: 8 })
  x.font = `800 48px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText(text, cx - 300, cy + 2)
  if (cursor && Math.sin(t * 12) > 0) { const w = x.measureText(text).width; x.fillRect(cx - 296 + w, cy - 24, 5, 48) }
  // send arrow
  x.fillStyle = sentK > 0 ? GREEN : BLUE; x.fillRect(cx + 230, cy - 34, 76, 68)
  drawBits(x, ['..W..', '.WWW.', 'WWWWW', '..W..', '..W..'], { W: BONE }, cx + 268, cy, 9, { outline: null })
}
let S0 = null
function world(x, t, S) {
  S0 = S
  S.level(x, t, { theme: 'room', floor: 1300 })
  const lr = lastReset(t), dr = t - lr
  // the RESET button (smashed at every reset)
  const press = t < T.type ? Math.max(0, 1 - Math.abs(dr) / 0.25) * (dr > -0.1 ? 1 : 0) : 0
  const pressF0 = t < 0.25 ? 1 - t / 0.25 : 0
  button(x, t, 220, 1300, Math.max(press, pressF0 * 0.9))
  // Virgo: hops onto the button at each reset, then hovers at the draft
  const onBtn = (dr >= -0.25 && dr < 0.3 && t < T.type) || t < 0.3
  let vx = onBtn ? 220 : 440, vy = onBtn ? 1135 : 1170, mood = onBtn ? 'squint' : 'neutral', look = [1, -0.5]
  if (t > T.type) { vx = 440; vy = 1170; mood = 'neutral' }
  if (t > T.sent) { mood = 'wide'; look = [1, -0.6] }
  if (t > T.reply) { mood = 'heart' }
  if (!onBtn) S.shadow(x, vx, 1302, 210)
  S.star(x, t, { id: 'virgo', x: vx, y: vy, s: 230, mood, look, squash: onBtn ? 0.12 : 0, seed: 6, hops: [...RESETS.map(r => r - 0.25), T.reply, T.s3] })
  // the draft bar
  let text = '', cursor = true
  for (const [d, a] of DRAFTS) if (t >= a) text = d.slice(0, Math.floor(clamp((t - a) / 0.35) * d.length + 0.001))
  for (const r of RESETS) if (r > 0 && t >= r && t < r + 0.25) text = ''
  if (t >= T.type) { const s = 'hye :)'; text = s.slice(0, Math.floor(clamp((t - T.type) / 0.6) * s.length + 0.001)) }
  if (t >= T.sent) { text = ''; }
  draftBar(x, t, 560, 900, text, t < T.sent, t > T.sent ? 1 : 0)
  // the verdict on each draft (tiny judge text)
  const VERD = ['too plain', 'too cold', 'too much', 'too formal', 'too… y']
  DRAFTS.forEach(([d, a], i) => { if (t > a + 0.4 && t < a + 0.75) S.txt(x, VERD[i], 560, 820, { size: 34, font: MONO, weight: 700, col: RED, ls: 2 }) })
  // the sent bubble + the reply
  S.bubble(x, t, 700, 1010, T.sent, T.last - 0.2, 'hye :)', { size: 46, col: '#9fd0ff', tail: 0.5 })
  S.bubble(x, t, 760, 1120, T.reply, T.last - 0.2, 'hye :) haha hi!!', { size: 40, col: '#ffd9e8', tail: 0.4, up: false })
  if (t > T.reply) S.star(x, t, { id: 'scorpio', x: 900, y: 1200, s: 150, mood: 'happy', look: [-1, -0.5], seed: 3, pop: pop01(t, T.reply, 0.3, 2.2), hops: [T.reply + 0.1] })
  // reset flashes
  for (const r of RESETS) if (r > 0 && t >= r && t < r + 0.22) { x.save(); x.globalAlpha = 0.3 * (1 - (t - r) / 0.22); x.fillStyle = RED; x.fillRect(0, 560, 1080, 1360); x.restore() }
}
function over(x, t, S) {
  for (const r of RESETS.slice(1)) S.stamp(x, 'RESET', 540, 760, pop01(t, r, 0.15, 2.8) * outK(t, [r + 0.45, r + 0.6]), { size: 60, col: RED, rot: 0.08 })
  S.stamp(x, 'SENT', 860, 820, pop01(t, T.sent, 0.2, 2.8) * outK(t, [T.rec - 0.05, T.rec]), { size: 60, col: GREEN, rot: -0.1 })
}
const HOOK = { at: -1, text: 'VIRGO RESET THE RUN. | *Again.*', top: 620, size: 100, out: [0.95, 1.1] }
const SHK = { at: 0.12, len: 0.45, amp: 26 }
const REC = { at: T.rec, len: 1.4, caption: "that's a *typo.* it's sent.", sub: 'reset forty-six: not available', top: 1520 }
const CAUGHT = { at: T.rec + 0.15, x: 700, y: 1120, r: 130, out: [T.rec + 1.3, T.rec + 1.45], label: 'TYPO IN 4K', arrow: 'tl' }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], title: 'NEW CATEGORY', text: '*typo%* (it worked)', y: 1520 }
const LAST = { at: T.last, text: 'Typo run. | *Still counts.*', top: 640, size: 116, out: [15.3, 15.55] }
const EP = makeRun({
  id: 'ksre06', duration: D, runner: 'virgo', category: 'FIRST TEXT%',
  fx: [['slamTitle', HOOK, true], ['screenShake', SHK], ['recordScratch', REC], ['caught', CAUGHT], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, current: t => t < T.sent - 0.1 ? 1 : 2, ending: { type: 'loop', len: 0.4 },
  camera: t => ({ zoom: 1, dx: RESETS.slice(1).reduce((a, r) => a + shake(t, r, 12), 0) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ['tom', 0.02, 90, { gain: 0.28, decay: 0.3 }],
  ...DRAFTS.flatMap(([d, a]) => d.split('').map((c, i) => ['tick', +(a + i * 0.35 / d.length).toFixed(3), 0.03])),
  ...RESETS.slice(1).flatMap(r => [['tom', r, 85, { gain: 0.26, decay: 0.25 }], ['pluck', r, 233.08, 0.04, 0.25, 0]]),
  ['pluck', T.beg + 0.1, 440, 0.035, 0.5, 0.4], ['pluck', T.beg + 0.3, 415.3, 0.035, 0.5, 0.4],
  ...'hye :)'.split('').map((c, i) => ['tick', +(T.type + i * 0.1).toFixed(3), 0.035]), ['whoosh', T.sent, 0.3, 0.05], ['pop', T.sent, 1318.51, 0.05, 0.3],
  ['pop', T.reply, 1174.66, 0.05, 0.3], ['pop', T.reply + 0.1, 1567.98, 0.04, 0.3], ['glitter', T.reply, T.reply + 0.6],
]
void [PINK, lerp, ease, prog]
