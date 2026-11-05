// ksre04: FALLING IN LOVE: SPEEDRUN · Cancer: Soft-Locked on "k" (17 s vertical, star_talk post, Month 2 boost m03)
// music: dreamy · D. Hard cut. No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: a giant "k." mid-slam into Cancer, the picture glitching, SOFT-LOCK warning; the hook line.
//   0.7   shake · 2.0 Cancer rereads · 3.0 loading bar "are they mad at me?…" stalls at 99 % → error.
//   6.3   the reread: the thread scrolls (one long paragraph… "k") · 7.6 Pisces on cam spiralling, crying.
//   9.9   notification: "sorry!! driving. k = OK :)" · UNLOCKED · DECODE "k" gold · 12.4 achievement.
//   15.6  "Not mad. | Just driving." · hold · hard cut 17.0.
import { makeRun, splitCues, fmtClock, runAt, shake, GOLD, BONE, INK, PINK, RED, GREEN, MONO, clamp, lerp, prog, ease, pop01, outK, drawPhone } from '../../ksre01/srkit.js'

const D = 17
const T = { shake: 0.7, reread0: 2.0, load: 3.0, scroll: 6.3, spiral: 7.6, curl: 8.8, ding: 9.9, unlock: 10.3, next: 11.4, ach: 12.4, last: 15.6 }
const SPLITS = [
  { name: 'FIRST TEXT', at: -1, time: '0:04.20', state: 'gold', delta: '-0:03' },
  { name: 'SENT A PARAGRAPH', at: -1, time: '0:09.90', state: 'green', delta: '-0:01' },
  { name: 'GOT "k"', at: -1, time: '0:10.30', state: 'red', delta: '+???' },
  { name: 'DECODE "k"', at: T.unlock, time: '0:20.10', state: 'gold', delta: '' },
]
const KEYS = [[0, 10.4], [T.load, 13.4], [T.ding, 20.1]]
const timer = t => {
  const v = t < T.unlock ? runAt(KEYS, t) : 20.1
  const lock = t < T.unlock
  return { text: fmtClock(v), col: lock ? (Math.sin(t * 8) > 0 ? RED : '#ff9aa6') : GOLD, sub: lock ? 'SOFT-LOCK DETECTED' : 'UNLOCKED', subCol: lock ? RED : GOLD }
}
const cam = t => {
  if (t < T.spiral) return { mood: 'wide', tears: 2, look: [-1, 0.8] }
  if (t < T.ding) return { mood: 'wide', tears: 3, look: [-1, 0.8], shake: 4, say: "they hate us. we're moving.", sayAt: T.spiral, sayEnd: T.ding - 0.1, sayX: 680, sayY: 650 }
  return { mood: t > T.unlock ? 'happy' : 'wide', tears: 3, look: [-1, 0.6], hops: [T.unlock, T.next] }
}
const MSGS = [
  { at: -2, side: 'R', text: 'had the best time today!! you were SO funny. hope your evening is nice!!' },
  { at: -1, side: 'L', text: 'k' },
  { at: T.ding + 0.3, side: 'L', text: 'sorry!! was driving. k = OK :)' },
  { at: T.next, side: 'L', text: "can't wait for saturday!!" },
]
function world(x, t, S) {
  S.level(x, t, { theme: 'room', floor: 1300, skyline: true })
  // Cancer: hit by the "k.", curls up, rereads, melts with relief
  let mood = 'wide', look = [1, -0.2], squash = 0, cx = 300
  const hit = t < 0.5 ? 1 - t / 0.5 : 0
  if (t > T.reread0) { mood = 'neutral'; look = [1, 0.2] }
  if (t > T.load) { mood = 'squint' }
  if (t > T.scroll) { mood = 'neutral'; look = [1, 0.4] }
  if (t > T.curl && t < T.ding) { mood = 'wide'; squash = 0.14; look = [0, 1] }
  if (t > T.ding) { mood = 'wide'; look = [1, 0] }
  if (t > T.unlock) { mood = 'happy'; squash = 0 }
  if (t > T.next) mood = 'heart'
  S.shadow(x, cx, 1302, 220)
  S.star(x, t, { id: 'cancer', x: cx - hit * 30, y: 1170, s: 240, mood, look, squash, rot: -0.15 * hit, seed: 5, hops: [T.unlock, T.unlock + 0.35, T.next] })
  // the giant "k." (frame 0: mid-slam)
  if (t < 2.0) {
    const k = t < 0.3 ? 1.25 - t : 1
    const o = outK(t, [1.6, 2.0])
    x.save(); x.globalAlpha = o; x.translate(520 + shake(t, -0.1, 14, 0.8), 1000); x.rotate(-0.1 + 0.05 * hit); x.scale(k, k)
    S.pbox(x, -150, -120, 300, 220, '#d9d3ff', { b: 10 })
    x.fillStyle = '#d9d3ff'; x.fillRect(-110, 96, 40, 40); x.fillStyle = INK; x.fillRect(-118, 136, 30, 14)
    x.font = `900 190px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('k.', 0, -6)
    x.restore()
    if (t < 0.45) for (let i = 0; i < 8; i++) { const a = i * 0.8; x.fillStyle = BONE; x.globalAlpha = 1 - t / 0.45; x.fillRect(cx + Math.cos(a) * (140 + t * 300), 1100 + Math.sin(a) * (120 + t * 260), 14, 14); x.globalAlpha = 1 }
  }
  // the phone with the thread (from 2.0)
  const pk = pop01(t, T.reread0, 0.3, 2.2) * outK(t, [T.last - 0.3, T.last])
  if (pk > 0.01) {
    let msgs = MSGS
    const sc = t > T.scroll && t < T.scroll + 1.2 ? Math.sin(Math.PI * prog(t, T.scroll, T.scroll + 1.2)) : 0
    drawPhone(x, t, { cx: 720, top: 760 - sc * 40, w: 420, h: 620, s: pk, title: '♏︎ Scorpio', msgs, font: 26 })
    if (t > T.scroll && t < T.scroll + 1.3) S.txt(x, 'READ #47', 720, 720, { size: 30, font: MONO, weight: 700, col: RED, ls: 3, scale: pop01(t, T.scroll, 0.2, 2.6) })
  }
  if (t > T.curl && t < T.ding) S.txt(x, '?!', cx + 120, 1000, { size: 70, col: RED, rot: 0.2, scale: pop01(t, T.curl, 0.2, 2.6) })
}
function over(x, t, S) {
  S.stamp(x, '⚠ SOFT-LOCK', 540, 920, t < 1.9 ? 1 + 0.05 * Math.sin(t * 20) : 0, { size: 58, col: RED, rot: 0.07, fillc: 'rgba(16,10,40,0.85)', font: 'Space Mono' })
  S.stamp(x, 'UNLOCKED', 540, 860, pop01(t, T.unlock, 0.25, 2.8) * outK(t, [T.ach - 0.2, T.ach]), { size: 76, col: GOLD, rot: -0.06 })
}
const HOOK = { at: -1, text: 'CANCER SOFT-LOCKED | ON *“k.”*', top: 620, size: 108, out: [2.7, 2.95] }
const GL = { at: -0.3, len: 1.1, dialog: false, amp: 0.8 }
const SHK = { at: T.shake, len: 0.45, amp: 22 }
const LOAD = { at: T.load, len: 3.1, label: 'are they mad at me?…', stallAt: 99, error: 'Error: reread it again', y: 860 }
const NOTIF = { at: T.ding, out: [T.unlock + 1.2, T.unlock + 1.45], title: 'texts', body: 'Scorpio: sorry!! was *driving.*', glyph: '♏', time: 'now', y: 590 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], text: 'did *not* send a follow-up paragraph', y: 1520 }
const LAST = { at: T.last, text: 'Not mad. | *Just driving.*', top: 660, size: 116 }
const EP = makeRun({
  id: 'ksre04', duration: D, runner: 'cancer', category: 'FIRST TEXTS%',
  fx: [['glitch', GL], ['screenShake', SHK], ['slamTitle', HOOK, true], ['loadingBar', LOAD], ['notification', NOTIF], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, current: () => 3, ending: { type: 'cut' },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ['tom', 0.02, 90, { gain: 0.3, decay: 0.35 }], ['tick', 0.02, 0.08],
  ['whoosh', T.reread0, 0.35, 0.04], ['whoosh', T.scroll, 0.6, 0.04], ['pop', T.scroll + 0.1, 1318.51, 0.03, 0.3],
  ['pluck', T.spiral + 0.1, 440, 0.035, 0.5, 0.4], ['pluck', T.spiral + 0.3, 415.3, 0.035, 0.5, 0.4], ['pluck', T.curl, 330, 0.035, 0.5, 0],
  ['bell', T.unlock, 1760, 0.05, 1.0, 0], ['pop', T.unlock + 0.1, 1318.51, 0.04, 0], ['pop', T.unlock + 0.2, 1760, 0.04, 0], ['glitter', T.unlock, T.unlock + 0.6],
  ['pop', T.next, 1174.66, 0.04, 0.3],
]
void [PINK, GREEN, lerp, clamp, ease]
