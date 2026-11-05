// kdwe03 · Don't Watch This If You're a ___ · "Leo Rehearses Being Casual" (18 s vertical, hard cut) · funk · A
//   0      Leo shoving the lens away mid-hair-flip; "LEO. | Do *NOT* watch this." · scratch + freeze · whip out
//   1.5    a fake café counter, a cardboard cut-out of the crush · "Leo, practising *casual.*"
//   2.0    TAKE 12 (clapper) ♌ "oh! didn't see you *there.*" · 5.2 TAKE 27: a ring light pops on, the lean
//   8.0    TAKE 30: the casual trip · "Effortless takes *practice.*"
//   10.8   the REAL crush (Sagittarius) walks in: "oh hey, Leo!" · 13.0 ♌ "…hi. i'm *normal.*"
//   14.9   Pisces sobbing, applauding: "BRAVO!! *so brave!!*" · 16.2 "Effortless. | *Take thirty-one.*" · hard cut at 18
import { dwFilm, tag } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'

const LE = tag('leo'), SA = tag('sagittarius'), PI = tag('pisces')
const TAKES = [[2.0, 12], [5.2, 27], [8.0, 30]], REAL = 10.8
const F = dwFilm({
  id: 'kdwe03', sign: 'leo', dur: 18, ending: 'cut',
  hook: 'LEO.|Do *NOT* watch this.', hookOut: 1.3, scratch: 'oh, we are *watching.*',
  lens: { mood: 'wide', look: [-1, 0] }, pull: { x: 330, y: 1250, s: 340 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 5.2, cam: [1.25, 420, 1100] },
    { at: 8.0, cam: [1, 540, 960] },
    { at: REAL, cam: [1.1, 600, 1080] },
    { at: 14.8, cam: [1, 540, 960] },
  ],
  punch: [{ at: 12.9, dur: 1.4, z: 0.25, x: 330, y: 1150 }],
  shakes: [8.55],
  heads: [
    { text: 'Leo, practising *casual.*', at: 1.5, out: [4.9, 5.15], top: 240 },
    { text: 'Effortless takes *practice.*', at: 8.2, out: [10.5, 10.75], top: 240 },
    { text: 'Effortless.|*Take thirty-one.*', at: 16.2, top: 250 },
  ],
  boxes: [
    { open: 2.2, close: 7.8, lines: [{ t: 2.35, speaker: LE, text: "oh! didn't see you *there.*", color: '#ffb36b' }, { t: 5.5, speaker: LE, text: 'oh! *didn’t* see you there~', color: '#ffb36b' }] },
    { open: 10.9, close: 14.6, lines: [{ t: 11.05, speaker: SA, text: 'oh hey, *Leo!*', color: '#c9a6ff' }, { t: 13.0, speaker: LE, text: '…hi. i’m *normal.*', color: '#ffb36b' }] },
    { open: 14.95, close: 17.3, lines: [{ t: 15.1, speaker: PI, text: 'BRAVO!! *so brave!!*', color: '#9fd7ff' }] },
  ],
  pitch: { [LE]: 440, [SA]: 739.99, [PI]: 1046.5 },
  paint(x, t, K) {
    K.room(x, t, { wall: '#4a2a1e', wall2: '#2a160e', floor: '#3a2418', frame: '#f2c75c', window: true })
    // the café counter
    K.box(x, 40, 1320, 1000, 60, '#a8683a'); K.rect(x, 60, 1380, 960, 400, '#6a3e22')
    K.box(x, 120, 1250, 70, 70, '#efe6d6'); K.rect(x, 130, 1262, 50, 14, '#7a4a2a')
    // ring light (take 27 on)
    const rl = K.pop01(t, 5.3, 0.3)
    if (rl > 0 && t < REAL) { x.save(); x.translate(150, 900); x.scale(rl, rl); x.strokeStyle = '#140c28'; x.lineWidth = 40; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.stroke(); x.strokeStyle = '#fff6d8'; x.lineWidth = 26; x.stroke(); x.restore(); K.rect(x, 144, 990, 12, 330, '#2a1a12'); const g = x.createRadialGradient(330, 1150, 20, 330, 1150, 380); g.addColorStop(0, 'rgba(255,246,216,0.35)'); g.addColorStop(1, 'rgba(255,246,216,0)'); x.fillStyle = g; x.fillRect(-100, 700, 900, 900) }
    // the cardboard cut-out of the crush
    if (t < REAL + 0.4) {
      const fall = ease.inCubic(prog(t, REAL, REAL + 0.4))
      x.save(); x.translate(780, 1320); x.rotate(fall * 1.4)
      K.rect(x, -8, -260, 16, 260, '#8a6a3a')
      K.star(x, t, 'sagittarius', { x: 0, y: -330, s: 280, color: '#c89a62', mood: 'happy', look: [-1, 0], bob: 0, blink: false, glow: 0, badge: false, tips: false })
      x.restore()
      K.label(x, 'CRUSH (CARDBOARD)', 780, 1350, { size: 20, pad: 8, rot: 0.04 })
    }
    // the real crush
    if (t > REAL) { const w = ease.outCubic(prog(t, REAL, REAL + 0.6)); K.star(x, t, 'sagittarius', { x: lerp(1300, 820, w), y: 1180, s: 300, mood: t < 13 ? 'happy' : 'wide', look: [-1, 0], seed: 4 }) }
    if (t > 14.8) K.pisces(x, t, { x: 560, y: 1000, s: 260, pop: K.pop01(t, 14.85, 0.4), mood: 'sparkle', look: [0, 0], tears: 3 })
    if (!K.hide) {
      const trip = prog(t, 8.4, 8.9)
      const lean = t > 5.2 && t < 7.8 ? -0.12 : 0
      const mood = t < 5.2 ? 'wink' : t < 8.0 ? 'sparkle' : t < 9.6 ? 'wide' : t < REAL ? 'happy' : t < 14.8 ? 'wide' : 'happy'
      K.star(x, t, 'leo', { x: 330 + trip * 60, y: 1250 + Math.sin(Math.PI * trip) * -60, s: 340, mood, look: t < REAL ? [1, 0] : [1, 0], rot: lean + Math.sin(Math.PI * trip) * 0.5, seed: 8, squash: t > REAL && t < REAL + 0.3 ? 0.15 : 0 })
    }
  },
  over(x, t, K) {
    // the clapperboard per take
    for (const [at, n] of TAKES) {
      const k = K.inOut(t, at - 0.15, at + 1.4)
      if (k <= 0.01) continue
      const clap = 1 - ease.outCubic(prog(t, at - 0.1, at + 0.05))
      x.save(); x.translate(800, 640); x.rotate(0.08); x.scale(k, k)
      K.box(x, -170, -40, 340, 150, '#1a1236'); K.txt(x, `TAKE ${n}`, 0, 40, { size: 50, font: K.INTER, weight: 900, color: '#fff' })
      x.save(); x.translate(-170, -44); x.rotate(-clap * 0.5); K.box(x, 0, -44, 340, 40, '#efe6d6'); for (let i = 0; i < 5; i++) K.rect(x, 20 + i * 66, -44, 30, 40, '#1a1236'); x.restore()
      x.restore()
    }
  },
  cues: [
    ...TAKES.flatMap(([at]) => [['tick', at + 0.04, 0.12], ['pop', at + 0.05, 1174.66, 0.04, 0.3]]),
    ['pop', 5.32, 1567.98, 0.04, -0.3], ['glitter', 5.3, 6.0],
    ['whoosh', 8.4, 0.3, 0.05], ['boom', 8.55, 0.08],
    ['whoosh', REAL, 0.5, 0.05], ['pop', REAL + 0.3, 392, 0.05, 0],
    ['pop', 14.88, 783.99, 0.05, 0.2], ['glitter', 14.9, 16.4], ...[15.2, 15.45, 15.7, 15.95].map(t => ['tick', t, 0.06]),
  ],
  music: { style: 'funk', key: 'A', seed: 4103, sections: { drop: 1.42, breakdown: [REAL], lift: [14.85] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
