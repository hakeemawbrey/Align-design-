// kdwe18 · Don't Watch This If You're a ___ · "Everything Aquarius Hides" (62 s vertical, hard cut) · synthwave · Am
//   0      Aquarius slapping a CLASSIFIED stamp on the lens; "AQUARIUS. | Abort. *ABORT.*" · scratch · whip out
//   1.5    the promise: "Five files. | *File five* is classified."
//   5      FILE 1 · LOOKING ALOOF: three practised poses in the window reflection
//   15     FILE 2 · THE MORNING READING: reads the crush's sign every morning, "for *research*"
//   25     FILE 3 · THE 2 A.M. GROUP CHAT: keeping the friends' chat alive, alone
//   35     FILE 4 · THE ROBOT: built a robot that says good night to it → glitch: feeling detected
//   45     FILE 5 · CLASSIFIED: the stamp lifts — AQUARIUS REALLY LIKES HUGS. Pisces runs in sobbing, hugs; Aquarius melts
//   57.6   "Aloof. | *Accepting* hugs." · hard cut at 62
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const AQ = tag('aquarius'), PI = tag('pisces'), RB = '▣ ROBOT'
const RW = 1400
const S = [5, 15, 25, 35, 45], LAST = 57.6, HUG = 50.4
const TITLES = ['LOOKING ALOOF', 'THE MORNING READING', 'THE 2 A.M. GROUP CHAT', 'THE ROBOT', 'CLASSIFIED']
const CH = S.map((at, i) => ({ at: at - 0.1, out: [at + 9.6, at + 9.9], n: i + 1, title: TITLES[i], x: 60, y: 330, color: i === 4 ? '#ff3b4e' : '#7fe3ff' }))
const regionAt = t => t < S[1] ? 0 : t < S[2] ? 1 : t < S[3] ? 2 : t < S[4] ? 3 : 4
const cam = (r, z = 1, dx = 0, dy = 0) => [z, r * RW + 540 + dx, 960 + dy]
const POSES = [[5.8, 'ALOOF #1 · mysterious', 'squint', -0.1], [8.2, 'ALOOF #2 · busy genius', 'eyeroll', 0.12], [10.6, 'ALOOF #3 · unbothered', 'sleepy', 0]]
const CHAT = [['guys', 25.8], ['fun fact about octopuses:', 26.6], ['they have three hearts', 27.4], ['anyone up?', 28.6], ['…', 29.8], ['ok goodnight ♡', 31.0]]
const F = dwFilm({
  id: 'kdwe18', sign: 'aquarius', dur: 62, ending: 'cut',
  hook: 'AQUARIUS.|Abort. *ABORT.*', hookOut: 1.3, scratch: 'unable to *abort.*',
  lens: { mood: 'wide', look: [0, 0] }, pull: { x: 330, y: 1250, s: 310 },
  shots: [
    { at: 0, cam: cam(0) }, { at: 12.4, cam: cam(0, 1.2, 160, 120) },
    { at: S[1], cam: cam(1) }, { at: 20.6, cam: cam(1, 1.2, 140, 200) },
    { at: S[2], cam: cam(2) },
    { at: S[3], cam: cam(3) }, { at: 38.6, cam: cam(3, 1.2, 0, 200) },
    { at: S[4], cam: cam(4) }, { at: HUG, cam: cam(4, 1.25, 0, 230) }, { at: 56.6, cam: cam(4, 1.05, 0, 100) },
  ],
  shakes: [HUG],
  heads: [
    { text: 'Five files.|*File five* is classified.', at: 1.5, out: [4.5, 4.75], top: 470, size: 90 },
    { text: 'Aloof takes|*rehearsal.*', at: 12.6, out: [14.6, 14.85], top: 470 },
    { text: 'Every morning.|“For *research.*”', at: 20.8, out: [24.6, 24.85], top: 470, size: 92 },
    { text: 'Keeping the chat|*alive.* Alone.', at: 32.0, out: [34.6, 34.85], top: 470, size: 92 },
    { text: 'Aloof.|*Accepting* hugs.', at: LAST, top: 300, size: 104 },
  ],
  boxes: [
    { open: 18.2, close: 20.4, lines: [{ t: 18.35, speaker: AQ, text: 'it’s for *research.*', color: '#7fe3ff' }] },
    { open: 36.4, close: 40.0, lines: [{ t: 36.55, speaker: RB, text: 'GOOD NIGHT. YOU DID *GREAT* TODAY.', color: '#9fe6b0' }] },
    { open: 51.0, close: 57.2, lines: [{ t: 51.15, speaker: PI, text: 'i *knew* it!!', color: '#9fd7ff' }, { t: 53.4, speaker: AQ, text: '…don’t tell *anyone.*', color: '#7fe3ff' }] },
  ],
  pitch: { [AQ]: 987.77, [PI]: 1046.5, [RB]: 392 },
  fx: [
    ...CH.map(o => ({ f: HK.chapter, c: HK.chapterCues, o })),
    { f: HK.glitch, c: HK.glitchCues, o: { at: 40.4, len: 1.6, text: 'AQUARIUS.EXE: feeling detected', buttons: ['KEEP IT', 'KEEP IT'] } },
  ],
  paint(x, t, K) {
    const r = regionAt(t)
    x.save(); x.translate(r * RW, 0)
    const aq = o => { if (!K.hide) K.star(x, t, 'aquarius', { s: 310, seed: 11, ...o }) }
    if (r === 0) {
      K.room(x, t, { wall: '#1e2a48', wall2: '#0f1428', floor: '#22283a', window: false })
      // the dark window as a mirror
      K.box(x, 560, 640, 420, 640, '#0a0c22', { o: 10 })
      const pose = POSES.filter(p => t >= p[0]).pop()
      x.save(); x.beginPath(); x.rect(560, 640, 420, 640); x.clip(); x.globalAlpha = 0.55
      K.star(x, t, 'aquarius', { x: 770, y: 1080, s: 280, mood: pose ? pose[2] : 'neutral', look: [-1, 0], seed: 21, rot: pose ? -pose[3] : 0, badge: false })
      x.restore()
      if (pose) K.label(x, pose[1], 770, 1330, { size: 20, pop: K.pop01(t, pose[0], 0.3) })
      aq({ x: 330, y: 1250, mood: pose ? pose[2] : 'wide', look: pose ? [1, 0] : [0, 0], rot: pose ? pose[3] : 0 })
    } else if (r === 1) {
      K.room(x, t, { wall: '#2a3a5a', wall2: '#16203a', floor: '#22283a', window: true })
      K.box(x, 80, 1320, 920, 36, '#4a5a7a')
      // the RESEARCH notebook, full of hearts
      const nb = K.pop01(t, 20.6, 0.35)
      if (nb > 0) { x.save(); x.translate(760, 1220); x.scale(nb, nb); x.rotate(0.05); K.box(x, -150, -100, 300, 200, '#efe6d6'); K.txt(x, 'RESEARCH', 0, -70, { size: 24, color: '#1a1236' }); for (let i = 0; i < 10; i++) K.txt(x, '♡', -110 + (i % 5) * 55, -20 + Math.floor(i / 5) * 60, { size: 34, color: '#ff6fa8' }); x.restore() }
      aq({ x: 330, y: 1250, mood: t < 18 ? 'sparkle' : t < 20.6 ? 'squint' : 'wide', look: [1, 0] })
    } else if (r === 2) {
      K.room(x, t, { wall: '#141a34', wall2: '#0a0c1e', floor: '#181a2a', window: true, lamp: false })
      K.box(x, 80, 1260, 920, 120, '#3a3a6a')
      aq({ x: 300, y: 1180, s: 290, mood: t < 30 ? 'happy' : 'sleepy', look: [1, -0.5], rot: -0.15 })
      const g = x.createRadialGradient(400, 1150, 20, 400, 1150, 360); g.addColorStop(0, 'rgba(127,227,255,0.25)'); g.addColorStop(1, 'rgba(127,227,255,0)'); x.fillStyle = g; x.fillRect(0, 700, 900, 900)
    } else if (r === 3) {
      K.room(x, t, { wall: '#1e2a48', wall2: '#0f1428', floor: '#22283a', window: true })
      // the robot rolls in
      const rx = lerp(1200, 720, ease.outCubic(prog(t, S[3] + 0.4, S[3] + 1.4)))
      x.save(); x.translate(rx, 1160 + Math.sin(t * 6) * 4)
      K.box(x, -90, -120, 180, 160, '#9aa8b8'); K.box(x, -60, -90, 120, 70, '#1a1236'); K.rect(x, -40, -70, 20, 20, '#7dffb0'); K.rect(x, 20, -70, 20, 20, '#7dffb0'); K.rect(x, -24, -36, 48, 8, '#7dffb0')
      K.rect(x, -6, -170, 12, 50, '#5a6a7a'); x.fillStyle = '#ff3b4e'; x.beginPath(); x.arc(0, -176, 14 + 3 * Math.sin(t * 9), 0, Math.PI * 2); x.fill()
      K.box(x, -70, 40, 140, 90, '#7a8898'); x.fillStyle = '#140c28'; x.beginPath(); x.arc(-50, 140, 26, 0, Math.PI * 2); x.arc(50, 140, 26, 0, Math.PI * 2); x.fill()
      x.restore()
      aq({ x: 330, y: 1250, mood: t < 37.5 ? 'neutral' : 'sparkle', look: [1, 0], tears: t > 38.6 ? 1 : 0 })
    } else {
      K.room(x, t, { wall: '#2a2244', wall2: '#151030', floor: '#2a2236', window: true })
      const hugK = ease.outBack(prog(t, HUG - 0.3, HUG))
      const px = lerp(1300, 700, ease.inCubic(prog(t, HUG - 1.0, HUG - 0.3))) - 60 * hugK
      if (t > HUG - 1.0) K.pisces(x, t, { x: px, y: 1230, s: 290, look: [-1, 0], tears: 3, mood: t < HUG ? 'wide' : 'sparkle', rot: t < HUG ? -0.2 : 0 })
      aq({ x: 420 + 40 * hugK, y: 1250, mood: t < HUG ? 'wide' : 'heart', look: [1, 0], squash: t > HUG ? 0.12 + 0.04 * Math.sin(t * 5) : 0 })
      if (t > HUG) for (let i = 0; i < 6; i++) { const p = (t * 0.6 + i / 6) % 1; K.txt(x, '♡', 380 + i * 60, 1060 - p * 300, { size: 44, color: `rgba(255,143,177,${1 - p})` }) }
    }
    x.restore()
  },
  over(x, t, K) {
    // FILE 2: the morning reading on the phone
    const k2 = K.inOut(t, S[1] + 0.5, 20.4)
    if (k2 > 0.01) K.phone(x, t, { X: 680, Y: 1060, w: 460, h: 680, pop: k2, rot: 0.05, title: 'MORNING READING', time: '7:02', bubbles: [{ side: 'C', text: 'checked: ♌ LEO (their sign)', at: 15.9, color: '#7fe3ff' }, { side: 'C', text: 'checked: ♒ AQUARIUS (mine)', at: 16.6, color: '#3a2f5a', ink: '#efe6d6' }, { side: 'C', text: 'saved to RESEARCH ★', at: 17.4, color: '#ff8fb1' }], size: 24 })
    // FILE 3: the 2 a.m. chat
    const k3 = K.inOut(t, S[2] + 0.4, 31.8)
    if (k3 > 0.01) K.phone(x, t, { X: 640, Y: 1060, w: 480, h: 740, pop: k3, rot: -0.03, title: 'the friends ✦ · 2:14 AM', time: '2:14', bubbles: CHAT.map(([s, at]) => ({ side: 'R', text: s, at, color: '#7fe3ff' })), size: 24, screen: (c, tt, w, h) => { if (tt > 30.6) K.txt(c, 'seen by: nobody (yet)', 0, h / 2 - 60, { size: 20, color: '#bdb3d8' }) } })
    // FILE 5: the CLASSIFIED file
    const k5 = K.inOut(t, S[4] + 0.4, HUG - 1.1)
    if (k5 > 0.01) {
      x.save(); x.translate(540, 1000); x.scale(k5, k5); x.rotate(-0.03)
      K.box(x, -360, -260, 720, 520, '#d9c08a', { o: 8 }); K.rect(x, -360, -300, 260, 50, '#d9c08a')
      K.txt(x, 'FILE 5', -230, -200, { size: 34, font: K.INTER, weight: 900, color: '#5a3a1a' })
      const lift = ease.inCubic(prog(t, 47.6, 48.2))
      K.txt(x, 'AQUARIUS', 0, -40, { size: 56, font: K.INTER, weight: 900, color: '#1a1236' })
      K.txt(x, 'REALLY, REALLY', 0, 30, { size: 40, font: K.INTER, weight: 900, color: '#1a1236' })
      K.txt(x, 'LIKES HUGS', 0, 100, { size: 64, font: K.INTER, weight: 900, color: '#ff3b4e' })
      x.save(); x.translate(lift * 200, -lift * 500); x.rotate(-0.2 - lift); x.globalAlpha = 1 - lift
      K.box(x, -320, -110, 640, 220, '#ff3b4e', { o: 8 }); K.txt(x, 'CLASSIFIED', 0, 0, { size: 90, font: K.INTER, weight: 900, color: '#fff' })
      x.restore(); x.restore()
    }
  },
  cues: [
    ...POSES.map(([at]) => ['pop', at, 783.99, 0.04, 0]), ...POSES.map(([at]) => ['tick', +(at + 0.05).toFixed(2), 0.05]),
    ['pop', 15.9, 987.77, 0.035, 0], ['pop', 16.6, 880, 0.035, 0], ['pop', 17.4, 1174.66, 0.04, 0], ['tick', 20.7, 0.06],
    ...CHAT.map(([_, at]) => ['pop', at, 1318.51, 0.03, 0.3]),
    ['whoosh', S[3] + 0.4, 1.0, 0.04], ['bell', 36.5, 659.25, 0.04, 1.6, 0],
    ['tick', 46.0, 0.06], ['whoosh', 47.6, 0.6, 0.06], ['bell', 48.0, 1567.98, 0.05, 1.2, 0],
    ['whoosh', HUG - 1.0, 0.7, 0.06], ['boom', HUG, 0.1], ['glitter', HUG, HUG + 2], ['pop', HUG + 0.05, 987.77, 0.05, 0],
  ],
  music: { style: 'synthwave', key: 'Am', seed: 4118, sections: { drop: 1.42, breakdown: [S[2]], lift: [S[3], HUG] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
