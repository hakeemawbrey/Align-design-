// ksre14: FALLING IN LOVE: SPEEDRUN · Gemini: Game Over, New Save (17 s vertical, star_talk post, Month 2 boost m03)
// music: chiptune · G. Hard cut. No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: GAME OVER mid-slam, Gemini mid-fall into it, CONTINUE? 10; the hook line.
//   1.2   rewind ◀◀: Gemini asks "do you like me… like that?" · 2.8 "I'm sorry. I see you as a friend." (kind)
//   3.5   record scratch + freeze: "that *hurts.* that's allowed." · 5.0 GAME OVER again, CONTINUE? 9… 8… Pisces crying with it
//   7.0   the friends drop in (snacks, a blanket): PLAYERS 2 & 3 JOINED · 8.8 Gemini sits up · 9.6 CONTINUE ▶
//   10.2  NEW SAVE FILE · split gold · 11.2 achievement · 14.6 "Game over is | just a new save." · cut 17.0.
import { makeRun, splitCues, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, drawBits } from '../../ksre01/srkit.js'

const D = 17
const T = { rew: 1.2, ask: 1.6, no: 2.8, rec: 3.5, go2: 5.0, beg: 5.6, friends: 7.0, sit: 8.8, cont: 9.6, save: 10.2, ach: 11.2, last: 14.6 }
const SPLITS = [
  { name: 'CATCH FEELINGS', at: -1, time: '0:03.10', state: 'gold', delta: '' },
  { name: 'ASK THEM (BRAVE)', at: -1, time: '0:06.40', state: 'gold', delta: '' },
  { name: 'THEY SAY YES', at: -1, time: 'NOT THIS RUN', state: 'red', delta: '' },
  { name: 'NEW SAVE FILE', at: T.save, time: 'FILE 2', state: 'gold', delta: '' },
]
const timer = t => ({ text: t < T.cont ? 'PAUSED' : t < T.save ? 'LOADING' : '0:00.00', col: t < T.cont ? RED : t < T.save ? BLUE : GOLD, sub: t < T.cont ? 'LIVES: STILL HERE' : 'NEW RUN', subCol: t < T.cont ? RED : GOLD })
const cam = t => {
  if (t < T.go2) return { mood: 'wide', tears: 2, look: [-1, 0.8] }
  if (t < T.friends) return { mood: 'wide', tears: 3, look: [-1, 0.8], say: "it's ok to be sad", sayAt: T.beg, sayEnd: T.friends - 0.1, sayX: 690, sayY: 650 }
  return { mood: t > T.save ? 'happy' : 'sparkle', tears: 3, look: [-1, 0.6], hops: [T.friends, T.save] }
}
const gameOverK = t => t < T.rew ? 1 : t < T.go2 ? 0 : t < T.cont + 0.3 ? 1 : 0
const contN = t => t < T.rew ? 10 : Math.max(5, 9 - Math.floor((t - T.go2) / 0.9))
function world(x, t, S) {
  S.level(x, t, { theme: 'street', floor: 1300 })
  const rewind = t > T.rew && t < T.rew + 0.35
  // Gemini: falling (frame 0) → asking → hearing no → lying flat → friends → sitting up → new save
  let gx = 380, gy = 1170, mood = 'wide', rot = 0, sq = 0, look = [1, 0]
  if (t < T.rew) { gy = 1020 + 150 * ease.inCubic(clamp(t / 1)); rot = 0.6 - t * 0.4 }
  if (t > T.ask) { mood = 'happy'; look = [1, 0] }
  if (t > T.no + 0.3) { mood = 'wide' }
  if (t > T.go2) { mood = 'neutral'; sq = 0.3; rot = 0; gy = 1210; look = [0, 1] }
  if (t > T.friends + 0.8) { mood = 'neutral'; look = [0.5, 0] }
  if (t > T.sit) { sq = 0; gy = 1170; mood = 'happy' }
  if (t > T.save) mood = 'sparkle'
  S.shadow(x, gx, 1302, 220)
  S.star(x, t, { id: 'gemini', x: gx, y: gy, s: 230, mood, look, rot, squash: sq, seed: 4, hops: [T.ask, T.sit, T.cont, T.save] })
  if (t > T.go2 && t < T.sit) S.pisces(x, t, { x: 560, y: 1200, s: 150, mood: 'wide', tears: 3, look: [-1, 0.5], seed: 11, pop: pop01(t, T.go2 + 0.3, 0.3, 2.2) * (1 - prog(t, T.sit - 0.2, T.sit)) })
  // the crush (before the game over)
  if (t > T.rew && t < T.go2) {
    S.shadow(x, 800, 1302, 200)
    S.star(x, t, { id: 'capricorn', x: 800, y: 1180, s: 210, mood: t > T.no ? 'neutral' : 'happy', look: [-1, 0], seed: 8, hops: [T.no] })
    S.bubble(x, t, 420, 960, T.ask, T.no - 0.1, 'do you like me… like that?', { size: 34, tail: -0.2, maxW: 520 })
    S.bubble(x, t, 760, 960, T.no, T.go2 - 0.1, "I'm sorry. I see you as a friend.", { size: 32, col: '#d9d3ff', tail: 0.2, maxW: 520 })
  }
  // the friends drop in
  const fk = pop01(t, T.friends, 0.35, 2.2), fk2 = pop01(t, T.friends + 0.25, 0.35, 2.2)
  if (t > T.friends) {
    const dy = (1 - clamp(prog(t, T.friends, T.friends + 0.3))) * -500
    S.shadow(x, 700, 1302, 190 * fk); S.shadow(x, 900, 1302, 180 * fk2)
    S.star(x, t, { id: 'leo', x: 700, y: 1180 + dy, s: 200, mood: 'happy', look: [-1, 0], seed: 6, hops: [T.friends + 0.3, T.save] })
    S.star(x, t, { id: 'cancer', x: 900, y: 1190 + (1 - clamp(prog(t, T.friends + 0.25, T.friends + 0.55))) * -500, s: 180, mood: 'sparkle', look: [-1, 0], seed: 9, hops: [T.friends + 0.55, T.save + 0.1] })
    // snacks + blanket
    drawBits(x, ['.RRRR.', 'RWRWRR', 'RRRRRR', 'RRWRRR', '.RRRR.'], { R: '#ffb86f', W: BONE }, 600, 1270, 9)
    if (t > T.friends + 0.6) { x.fillStyle = INK; x.fillRect(250, 1236 + 30, 260, 60); x.fillStyle = '#ff8fb1'; x.fillRect(256, 1242 + 30, 248, 48); for (let i = 0; i < 6; i++) { x.fillStyle = BONE; x.fillRect(266 + i * 40, 1258 + 30, 16, 16) } }
    S.bubble(x, t, 760, 960, T.cont + 0.3, T.save + 0.9, 'we brought snacks.', { size: 34, col: '#ffe0b8', tail: 0 })
    S.bubble(x, t, 400, 940, T.cont + 0.35, T.save + 1.3, 'thanks. it still stings.', { size: 32, tail: -0.1 })
    S.bubble(x, t, 760, 960, T.save + 1.4, T.last - 0.3, 'proud of you for asking.', { size: 32, col: '#ffe0b8', tail: 0.1, maxW: 520 })
  }
  if (rewind) { x.save(); x.fillStyle = 'rgba(111,184,255,0.18)'; x.fillRect(0, 560, 1080, 1360); for (let y = 600; y < 1500; y += 30) { x.fillStyle = 'rgba(255,255,255,0.15)'; x.fillRect(0, y + ((t * 900) % 30), 1080, 4) } x.restore() }
}
function over(x, t, S) {
  const k = gameOverK(t)
  if (k > 0) {
    const a0 = t < T.rew ? 1 : clamp(prog(t, T.go2, T.go2 + 0.25)) * (1 - prog(t, T.cont + 0.1, T.cont + 0.3))
    x.save(); x.globalAlpha = 0.55 * a0; x.fillStyle = '#0a0418'; x.fillRect(0, 560, 1080, 1360); x.restore()
    const slam = t < 0.3 ? 1.25 - t * 0.8 : (t > T.go2 && t < T.go2 + 0.3 ? 1.25 - (t - T.go2) * 0.8 : 1)
    S.txt(x, 'GAME OVER', 540, 1000, { size: 130, font: "'Space Mono', monospace", weight: 700, col: RED, scale: slam, alpha: a0, ls: 4 })
    const n = contN(t)
    S.txt(x, `CONTINUE? ${n}`, 540, 1120, { size: 54, font: "'Space Mono', monospace", weight: 700, col: BONE, alpha: a0 * (Math.sin(t * 8) > -0.5 ? 1 : 0.4), ls: 3 })
    if (t > T.sit) S.txt(x, '▶ CONTINUE', 540, 1200, { size: 48, font: "'Space Mono', monospace", weight: 700, col: GOLD, alpha: a0, scale: pop01(t, T.cont - 0.2, 0.2, 2.6), ls: 3 })
  }
  S.stamp(x, '◀◀ TEN SECONDS EARLIER', 540, 760, pop01(t, T.rew, 0.2, 2.6) * outK(t, [T.ask + 0.6, T.ask + 0.8]), { size: 44, col: BLUE, rot: -0.03, fillc: 'rgba(16,10,40,0.85)', font: "'Space Mono', monospace" })
  S.stamp(x, 'PLAYERS 2 & 3 JOINED', 540, 820, pop01(t, T.friends + 0.2, 0.2, 2.8) * outK(t, [T.friends + 1.4, T.friends + 1.6]), { size: 44, col: GREEN, rot: 0.04, fillc: 'rgba(16,10,40,0.85)', font: "'Space Mono', monospace" })
  // the new save file
  if (t > T.save - 0.1 && t < T.save + 1.0) {
    const k2 = pop01(t, T.save - 0.1, 0.25, 2.6) * outK(t, [T.save + 0.8, T.save + 1.0])
    x.save(); x.translate(540, 860); x.scale(k2, k2)
    S.pbox(x, -360, -90, 720, 180, 'rgba(16,10,40,0.95)', { b: 8 })
    x.font = `700 28px 'Space Mono', monospace`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillText('FILE 1 · ENDED', -320, -40)
    x.fillStyle = GOLD; x.fillText('▶ FILE 2 · NEW SAVE', -320, 30)
    x.restore()
  }
}
const HOOK = { at: -1, text: "THE RUN DIDN'T | *go to plan.*", top: 600, size: 110, out: [1.05, 1.2] }
const SHK = { at: 0.05, len: 0.45, amp: 26 }
const REC = { at: T.rec, len: 1.4, caption: "that *hurts.* that's allowed.", sub: 'they were kind. it still stings.', top: 1520 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], text: 'asked *honestly.* that took guts.', y: 1520 }
const LAST = { at: T.last, text: 'Game over is | *just a new save.*', top: 600, size: 106 }
const EP = makeRun({
  id: 'ksre14', duration: D, runner: 'gemini', category: 'ANY%',
  fx: [['screenShake', SHK], ['slamTitle', HOOK, true], ['recordScratch', REC], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, current: () => 3, ending: { type: 'cut' },
  camera: t => ({ zoom: 1, dx: shake(t, T.go2, 16) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ['pluck', 0.02, 392, 0.06, 0.4, 0], ['pluck', 0.2, 349.23, 0.06, 0.4, 0], ['pluck', 0.4, 293.66, 0.06, 0.8, 0],
  ['whoosh', T.rew, 0.35, 0.06], ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.rew + i * 0.05).toFixed(3), 0.04]),
  ['pop', T.ask, 880, 0.04, -0.2], ['pluck', T.no, 330, 0.04, 0.6, 0.3],
  ['tom', T.go2, 90, { gain: 0.3, decay: 0.35 }], ['pluck', T.go2 + 0.05, 293.66, 0.05, 0.8, 0],
  ...[0, 1, 2, 3].map(i => ['tick', +(T.go2 + 0.9 * i).toFixed(3), 0.05]),
  ['pluck', T.beg + 0.1, 440, 0.035, 0.5, 0.4], ['pluck', T.beg + 0.3, 415.3, 0.035, 0.5, 0.4],
  ['whoosh', T.friends, 0.4, 0.05], ['tom', T.friends + 0.3, 110, { gain: 0.2, decay: 0.25 }], ['tom', T.friends + 0.55, 120, { gain: 0.2, decay: 0.25 }], ['pop', T.friends + 0.3, 1174.66, 0.04, 0.3],
  ['bell', T.cont, 1318.51, 0.045, 0.8, 0], ['bell', T.save, 1760, 0.05, 1.0, 0], ['glitter', T.save, T.save + 0.6],
]
void [PINK, MONO, INTER]
