// ksre05: FALLING IN LOVE: SPEEDRUN · Leo: The Spotlight Skip (18 s vertical, star_talk post, Month 2 boost m03)
// music: pop · G. Hard cut. No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: Leo mid-jump into a spotlight, confetti frozen mid-air, SKIP ATTEMPT banner, the hook line.
//   0.35  whip zoom · 1.2 lands · 2.2 SKIP FAILED (the crush is reading) · 3.4 attempt 2, louder · 4.6 FAILED
//   5.8   attempt 3, a spin · 6.8 FAILED (the crush wanders to the snacks); Pisces sobbing "it's so brave"
//   8.0   STRAT TIP: "ask them something. then listen." · 10.2 "what are you reading?" · 11.2 the crush lights up
//   12.6  GET NOTICED gold · 13.0 ACTUAL CONVERSATION gold · the spotlight finds them both · 16.6 last line · cut 18.0.
import { makeRun, splitCues, fmtClock, runAt, shake, GOLD, BONE, INK, PINK, RED, GREEN, MONO, clamp, lerp, prog, ease, pop01, outK, sparkles } from '../../ksre01/srkit.js'

const D = 18
const T = { whip: 0.35, land: 1.2, f1: 2.2, a2: 3.4, f2: 4.6, a3: 5.8, f3: 6.8, tip: 8.0, walk: 10.2, ask: 10.5, talk: 11.3, s2: 12.6, s3: 13.0, ach: 13.8, last: 16.6 }
const SPLITS = [
  { name: 'ENTERED THE PARTY', at: -1, time: '0:00.40', state: 'gold', delta: '-0:02' },
  { name: 'GET NOTICED', at: T.s2, time: '0:12.60', state: 'green', delta: '+0:09' },
  { name: 'ACTUAL CONVERSATION', at: T.s3, time: '0:13.00', state: 'gold', delta: '-0:40' },
]
const timer = t => ({ text: fmtClock(runAt([[0, 0.8], [D, 0.8 + D]], t)), col: t > T.s3 ? GOLD : t > T.f1 ? RED : GREEN, sub: t < T.tip ? `SKIP ATTEMPTS: ${t > T.a3 ? 3 : t > T.a2 ? 2 : 1}` : t < T.s2 ? 'NEW ROUTE' : 'NEW PB', subCol: t < T.tip && t > T.f1 ? RED : undefined })
const cam = t => {
  if (t < T.a3) return { mood: 'sparkle', tears: 1, look: [-1, 0.8] }
  if (t < T.tip) return { mood: 'wide', tears: 3, look: [-1, 0.8], say: "it's so BRAVE", sayAt: T.f3 - 0.6, sayEnd: T.tip - 0.1, sayX: 690, sayY: 650 }
  return { mood: t > T.talk ? 'heart' : 'happy', tears: 2, look: [-1, 0.6], hops: [T.s2, T.s3] }
}
function spot(x, cx, w, a = 1) {
  if (a <= 0.01) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, 560, 0, 1300); g.addColorStop(0, `rgba(255,244,200,${0.05 * a})`); g.addColorStop(1, `rgba(255,244,200,${0.26 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, 560); x.lineTo(cx + 40, 560); x.lineTo(cx + w / 2, 1300); x.lineTo(cx - w / 2, 1300); x.closePath(); x.fill()
  x.fillStyle = `rgba(255,244,200,${0.25 * a})`; x.beginPath(); x.ellipse(cx, 1300, w / 2, 26, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
function confetti(x, t, t0, cx, cy, frozenAt = null) {
  const tt = frozenAt !== null && t < frozenAt ? 0.35 : t - t0
  if (tt < 0 || tt > 1.6) return
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2, v = 300 + (i * 53) % 220
    const px = cx + Math.cos(a) * v * tt, py = cy + Math.sin(a) * v * tt * 0.7 + 380 * tt * tt
    x.save(); x.globalAlpha = 1 - clamp((tt - 1) / 0.6); x.translate(px, py); x.rotate(tt * 8 + i)
    x.fillStyle = [GOLD, PINK, '#7fd0ff', GREEN, BONE][i % 5]; x.fillRect(-8, -5, 16, 10); x.restore()
  }
}
function world(x, t, S) {
  S.level(x, t, { theme: 'party', floor: 1300 })
  // the spotlight follows the show-off… until it's just two people talking
  const both = ease.inOutCubic(prog(t, T.s3, T.s3 + 0.8))
  const lx0 = t < T.walk ? 330 : lerp(330, 560, ease.inOutCubic(prog(t, T.walk, T.walk + 0.6)))
  spot(x, lerp(lx0, 680, both), lerp(360, 640, both), t < T.tip || t > T.s3 ? 1 : 0.35)
  // the crush (reads, wanders to the snacks, lights up when asked)
  const cxr = t < T.f3 - 0.4 ? 800 : lerp(800, 840, ease.inOutCubic(prog(t, T.f3 - 0.4, T.f3 + 0.2)))
  // snack table
  x.fillStyle = INK; x.fillRect(880, 1180, 200, 16); x.fillRect(970, 1194, 14, 106); x.fillStyle = '#d06ad0'; x.fillRect(886, 1184, 194, 8)
  S.heartBits(x, 930, 1160, 4, GOLD); S.heartBits(x, 1010, 1160, 4, PINK)
  let cm = 'neutral', cl = [0, 1]
  if (t > T.a2 + 0.2 && t < T.f2 + 0.3) { cm = 'squint'; cl = [-1, 0] }
  if (t > T.ask) { cm = 'wide'; cl = [-1, 0] }
  if (t > T.talk) { cm = 'sparkle'; cl = [-1, 0] }
  const talkH = []; if (t > T.talk) for (let k = T.talk; k < T.last; k += 0.45) talkH.push(k)
  S.shadow(x, cxr, 1302, 200)
  S.star(x, t, { id: 'aquarius', x: cxr, y: 1180, s: 220, mood: cm, look: cl, seed: 9, hops: talkH })
  // a little book while it reads
  if (t < T.talk) { x.fillStyle = INK; x.fillRect(cxr + 50, 1206, 76, 54); x.fillStyle = '#7fd0ff'; x.fillRect(cxr + 55, 1211, 32, 44); x.fillRect(cxr + 89, 1211, 32, 44) }
  // Leo
  let lx = lx0, ly = 1170, lm = 'sparkle', rot = 0, lsq = 0
  const jump = t < T.land ? Math.sin(Math.PI * clamp(0.55 + t / (T.land * 2))) : 0
  ly -= jump * 220
  if (t < T.land) { rot = -0.2; lm = 'happy' }
  if (t > T.f1 && t < T.f1 + 0.8) lm = 'wide'
  if (t > T.a2) { lm = 'happy'; ly -= 60 * Math.max(0, Math.sin(Math.PI * prog(t, T.a2, T.a2 + 0.5))) }
  if (t > T.f2 && t < T.f2 + 0.8) lm = 'wide'
  if (t > T.a3 && t < T.f3) { rot = Math.PI * 2 * ease.inOutCubic(prog(t, T.a3, T.a3 + 0.8)); ly -= 160 * Math.sin(Math.PI * prog(t, T.a3, T.a3 + 0.8)) }
  if (t > T.f3) { lm = 'eyeroll'; lsq = 0.06 }
  if (t > T.tip) { lm = 'neutral'; lsq = 0 }
  if (t > T.walk) lm = 'happy'
  if (t > T.talk) lm = 'sparkle'
  const nods = []; if (t > T.talk) for (let k = T.talk + 0.2; k < T.last; k += 0.9) nods.push(k)
  S.shadow(x, lx, 1302, 220 * (1 - jump * 0.4))
  S.star(x, t, { id: 'leo', x: lx, y: ly, s: 240, mood: lm, look: t > T.walk ? [1, 0] : [0.6, -0.2], rot, squash: lsq, seed: 4, hops: [T.land, T.a2, T.a2 + 0.25, ...nods] })
  confetti(x, t, -0.35, lx0, 980, T.land)
  confetti(x, t, T.a2 + 0.3, 330, 980)
  sparkles(x, t, 330, 1060, T.a2 + 0.25, 12, 200, 1)
  S.bubble(x, t, 330, 930, T.a2 + 0.1, T.f2 - 0.1, 'TA-DAAA!', { size: 40, tail: 0 })
  S.bubble(x, t, 560, 930, T.ask, T.talk - 0.15, 'what are you reading?', { size: 36, tail: 0 })
  S.bubble(x, t, 760, 930, T.talk, T.ach + 1.6, "ok so it's about a lighthouse keeper who…", { size: 32, tail: 0.4, maxW: 560 })
  S.bubble(x, t, 560, 930, T.ach + 1.7, T.last - 0.2, 'wait, tell me everything.', { size: 36, tail: -0.2 })
}
function over(x, t, S) {
  S.stamp(x, 'SKIP ATTEMPT', 540, t < T.land ? 990 : 900, t < T.land ? 1 : pop01(t, T.a3, 0.2, 2.6) * outK(t, [T.f3 - 0.1, T.f3]), { size: 56, col: GOLD, rot: -0.07, fillc: 'rgba(16,10,40,0.85)' })
  for (const f of [T.f1, T.f2, T.f3]) S.stamp(x, 'SKIP FAILED', 540, 900, pop01(t, f, 0.2, 2.8) * outK(t, [f + 0.9, f + 1.05]), { size: 70, col: RED, rot: 0.06 })
  S.toast(x, t, T.tip, T.walk - 0.1, 'STRAT TIP', 'ask them something. then listen.', { cy: 900, col: '#7fd0ff', icon: 'star' })
}
const HOOK = { at: -1, text: 'LEO TRIES THE | *spotlight skip.*', top: 620, size: 110, out: [2.0, 2.2] }
const WHIP = { at: T.whip, len: 0.45, from: 1.5, cx: 330, cy: 1100 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], text: 'they *noticed you* (because you noticed them)', y: 1520 }
const LAST = { at: T.last, text: 'Listening is the | *real skip.*', top: 640, size: 112 }
const EP = makeRun({
  id: 'ksre05', duration: D, runner: 'leo', category: 'GET NOTICED%',
  fx: [['slamTitle', HOOK, true], ['whipZoom', WHIP], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, current: t => t < T.s2 ? 1 : 2, ending: { type: 'cut' },
  camera: t => ({ zoom: 1, dx: shake(t, T.f1, 12) + shake(t, T.f2, 12) + shake(t, T.f3, 14) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
const fail = f => [['pluck', f, 233.08, 0.06, 0.35, 0], ['pluck', f + 0.12, 220, 0.06, 0.4, 0], ['tom', f, 80, { gain: 0.2, decay: 0.3 }]]
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ['glitter', 0, 0.6], ['tom', T.land, 100, { gain: 0.25, decay: 0.3 }], ...fail(T.f1),
  ['whoosh', T.a2, 0.4, 0.05], ['pop', T.a2 + 0.2, 1318.51, 0.05, 0], ['glitter', T.a2 + 0.25, T.a2 + 0.8], ...fail(T.f2),
  ['whoosh', T.a3, 0.8, 0.06], ['riser', T.a3, T.a3 + 0.8, 0.03], ...fail(T.f3),
  ['bell', T.tip, 1318.51, 0.04, 0.9, 0], ['pop', T.ask, 880, 0.04, -0.2], ['pop', T.talk, 1174.66, 0.04, 0.3], ['glitter', T.s3, T.s3 + 0.6],
]
void [BONE, MONO, INK]
