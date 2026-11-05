// kdwe16 · Don't Watch This If You're a ___ · "Everything Cancer Hides" (66 s vertical, hard cut) · dreamy · E
//   0      Cancer pressing its whole body against the lens; "CANCER. | Don't. Okay, you *stayed.*" · scratch · whip out
//   1.5    the promise: "Five secrets. | *Number five* hurts."
//   5      SECRET 1 · THE “I’M FINE” VOICE: rehearsing three takes in the mirror; the reflection is crying
//   16     SECRET 2 · THE SCREENSHOT FOLDER: every kind text it has ever got, saved; it hugs the phone
//   27     SECRET 3 · THE CEREAL ADVERT: a made-up cereal ad (a grandma, a kid, one bowl) → sobbing; Pisces joins
//   38     SECRET 4 · THEIR SONG: the 2 a.m. drive, a made-up song on repeat ×3
//   49     SECRET 5 · NOBODY CHECKS ON IT: it texts everyone "you ok?"; its own phone: no new messages
//   54.4   incoming call: PISCES → "are *YOU* okay?" → Cancer bursts into happy tears: "…honestly? *not* really. thank you."
//   63.0   "The carer *needs* | checking on too." · hard cut at 66
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const CA = tag('cancer'), PI = tag('pisces')
const RW = 1400
const S = [5, 16, 27, 38, 49], CALL = 54.4, ANSWER = 55.6, LAST = 63.0
const TITLES = ['THE “I’M FINE” VOICE', 'THE SCREENSHOT FOLDER', 'THE CEREAL ADVERT', 'THEIR SONG', 'NOBODY CHECKS ON IT']
const CH = S.map((at, i) => ({ at: at - 0.1, out: [at + 9.6, at + 9.9], n: i + 1, title: TITLES[i], x: 60, y: 330, color: i === 4 ? '#ff8fb1' : '#f2c75c' }))
const regionAt = t => t < S[1] ? 0 : t < S[2] ? 1 : t < S[3] ? 2 : t < S[4] ? 3 : 4
const cam = (r, z = 1, dx = 0, dy = 0) => [z, r * RW + 540 + dx, 960 + dy]
const KIND = ['you’re so thoughtful', 'thank you for the soup!!', 'ur the best', 'you remembered??', 'needed this today', 'how are you this kind']
const F = dwFilm({
  id: 'kdwe16', sign: 'cancer', dur: 66, ending: 'cut',
  hook: 'CANCER.|Don’t. Okay, you *stayed.*', hookOut: 1.3, hookSize: 96, scratch: 'okay. *everything.*',
  lens: { mood: 'sparkle', look: [0, 0] }, pull: { x: 330, y: 1250, s: 320 },
  shots: [
    { at: 0, cam: cam(0) },
    { at: 8.4, cam: cam(0, 1.3, 260, 120) },
    { at: 12.0, cam: cam(0) },
    { at: S[1], cam: cam(1) },
    { at: 21.6, cam: cam(1, 1.2, -120, 220) },
    { at: S[2], cam: cam(2) },
    { at: 31.2, cam: cam(2, 1.15, 0, 160) },
    { at: S[3], cam: cam(3) },
    { at: 43.6, cam: cam(3, 1.3, -120, 220) },
    { at: S[4], cam: cam(4) },
    { at: 57.4, cam: cam(4, 1.15, 120, 160) },
    { at: 61.4, cam: cam(4) },
  ],
  punch: [{ at: 6.2, dur: 1.0, z: 0.1, x: 330, y: 1150 }, { at: 34.4, dur: 1.4, z: 0.15, x: 2 * RW + 540, y: 900 }, { at: 46.2, dur: 1.2, z: 0.12, x: 3 * RW + 700, y: 1220 }],
  shakes: [ANSWER + 2.0],
  heads: [
    { text: 'Five secrets.|*Number five* hurts.', at: 1.5, out: [4.5, 4.75], top: 470, size: 96 },
    { text: 'Rehearsed.|*In the mirror.*', at: 12.2, out: [15.4, 15.7], top: 470 },
    { text: 'Every kind text:|*saved.*', at: 22.0, out: [26.4, 26.7], top: 470 },
    { text: 'It’s a *cereal* advert.', at: 32.2, out: [37.4, 37.7], top: 470, size: 84 },
    { text: '2 a.m. drive.|*Their* song. Again.', at: 39.0, out: [42.8, 43.1], top: 470, size: 88 },
    { text: 'It checks on *everyone.*', at: 49.6, out: [53.9, 54.2], top: 470, size: 84 },
    { text: 'The carer *needs*|checking on too.', at: LAST, top: 300, size: 92 },
  ],
  boxes: [
    { open: 5.5, close: 11.9, lines: [{ t: 5.65, speaker: CA, text: 'i’m fine.', color: '#d8d8ff' }, { t: 7.5, speaker: CA, text: 'i’m *fine!*', color: '#d8d8ff' }, { t: 9.5, speaker: CA, text: 'i’m *totally* fine :)', color: '#d8d8ff' }] },
    { open: 28.0, close: 31.0, lines: [{ t: 28.15, speaker: CA, text: 'they’re sharing the *bowl…*', color: '#d8d8ff' }] },
    { open: 44.4, close: 47.9, lines: [{ t: 44.55, speaker: CA, text: 'one more time. *for closure.*', color: '#d8d8ff' }] },
    { open: 56.0, close: 62.7, lines: [{ t: 56.15, speaker: PI, text: 'are *YOU* okay?', color: '#9fd7ff' }, { t: 58.2, speaker: CA, text: '…honestly? *not* really.', color: '#d8d8ff' }, { t: 60.4, speaker: CA, text: 'thank you for *asking.*', color: '#d8d8ff' }] },
  ],
  pitch: { [CA]: 587.33, [PI]: 1046.5 },
  fx: [
    ...CH.map(o => ({ f: HK.chapter, c: HK.chapterCues, o })),
    { f: HK.incomingCall, c: HK.incomingCallCues, o: { at: CALL, out: [ANSWER + 0.6, ANSWER + 0.7], name: 'PISCES ♓', sub: 'incoming call…', glyph: '♓', color: '#7c74f0', answerAt: ANSWER } },
  ],
  paint(x, t, K) {
    const r = regionAt(t)
    x.save(); x.translate(r * RW, 0)
    const cancer = o => { if (!K.hide) K.star(x, t, 'cancer', { s: 320, seed: 3, ...o }) }
    if (r === 0) {
      K.room(x, t, { wall: '#2a2a50', wall2: '#16163a', floor: '#2e2a44', window: false, frame: '#d8d8ff' })
      // the mirror + its reflection (which is crying)
      K.box(x, 560, 760, 400, 620, '#c9d4dc', { o: 10 }); K.rect(x, 580, 780, 360, 580, '#3a4a6a')
      x.save(); x.beginPath(); x.rect(580, 780, 360, 580); x.clip()
      const takes = t < 7.5 ? 0 : t < 9.5 ? 1 : 2
      K.star(x, t, 'cancer', { x: 760, y: 1170, s: 280, mood: 'wide', look: [-1, 0], tears: t < 11.4 ? takes + 1 : 3, seed: 13, glow: 0.4, badge: false })
      x.restore()
      x.fillStyle = 'rgba(255,255,255,0.12)'; x.beginPath(); x.moveTo(600, 800); x.lineTo(700, 800); x.lineTo(600, 960); x.fill()
      cancer({ x: 330, y: 1250, mood: t < 5 ? 'happy' : t < 12 ? ['happy', 'sparkle', 'wink'][t < 7.5 ? 0 : t < 9.5 ? 1 : 2] : 'neutral', look: t < 5 ? [0, 0] : [1, 0] })
    } else if (r === 1) {
      K.room(x, t, { wall: '#2a2244', wall2: '#151030', floor: '#2a2236', window: true })
      K.box(x, 80, 1260, 920, 120, '#5a4a8a'); K.box(x, 80, 1180, 220, 90, '#efe6d6')
      const hug = t > 21.6
      cancer({ x: 380, y: 1170, mood: hug ? 'heart' : 'sparkle', look: [1, 0.3], squash: hug ? 0.08 * Math.sin(t * 6) : 0 })
      if (hug) { K.box(x, 440, 1170, 70, 110, '#1a1236', { o: 3 }); K.rect(x, 446, 1176, 58, 98, '#ff8fb1') }
    } else if (r === 2) {
      K.room(x, t, { wall: '#3a2a3a', wall2: '#1e1420', floor: '#2e2228', window: false, warm: 0.4 })
      // the TV with the made-up cereal advert
      K.box(x, 260, 600, 560, 380, '#0a0820', { o: 14 })
      x.save(); x.beginPath(); x.rect(260, 600, 560, 380); x.clip()
      const g = x.createLinearGradient(0, 600, 0, 980); g.addColorStop(0, '#ffd98a'); g.addColorStop(1, '#ffb36b'); x.fillStyle = g; x.fillRect(260, 600, 560, 380)
      K.box(x, 300, 860, 480, 30, '#8a5a3a', { o: 3 })
      const lean = 0.5 + 0.5 * Math.sin(t * 1.5)
      x.fillStyle = '#5a3a5a'; x.beginPath(); x.arc(400, 780, 40, 0, Math.PI * 2); x.fill(); K.rect(x, 360, 810, 80, 50, '#5a3a5a'); K.rect(x, 380, 750, 40, 12, '#efe6d6')
      x.fillStyle = '#3a6aa8'; x.beginPath(); x.arc(660 - lean * 20, 800, 30, 0, Math.PI * 2); x.fill(); K.rect(x, 632 - lean * 20, 822, 56, 40, '#3a6aa8')
      K.box(x, 500, 820, 80, 40, '#efe6d6', { o: 3 }); K.rect(x, 506, 820, 68, 14, '#f2c75c')
      K.txt(x, 'CRUNCHY MORNINGS', 540, 640, { size: 26, color: '#5a2a2a' })
      x.restore()
      K.txt(x, '(a made-up cereal)', 540, 1010, { size: 20, color: '#bdb3d8' })
      K.box(x, 120, 1230, 840, 140, '#6a4a6a'); K.box(x, 120, 1150, 80, 220, '#6a4a6a'); K.box(x, 880, 1150, 80, 220, '#6a4a6a')
      cancer({ x: 380, y: 1160, mood: t < 30 ? 'neutral' : 'sparkle', look: [0, -1], tears: t < 29 ? 0 : t < 31 ? 2 : 3 })
      if (t > 31.0) K.pisces(x, t, { x: 700, y: 1160, s: 280, pop: K.pop01(t, 31.0, 0.4), look: [0, -1], tears: 3 })
    } else if (r === 3) {
      // the 2 a.m. drive
      x.fillStyle = '#0a0c20'; x.fillRect(-600, -800, 2400, 3600)
      for (let k = 0; k < 24; k++) { const sx = ((k * 157 - t * 240) % 1300 + 1300) % 1300 - 100, sy = 700 + (k * 53) % 300; K.rect(x, sx, sy, 40, 6, `rgba(255,214,140,${0.3 + 0.3 * Math.sin(k)})`) }
      x.fillStyle = '#1a1226'; x.fillRect(-600, 1300, 2000, 900); x.fillRect(-600, -800, 680, 3000); x.fillRect(1000, -800, 600, 3000)
      K.box(x, 60, 1290, 960, 70, '#3a2a40')
      // the display: NOW PLAYING + repeat
      K.box(x, 560, 1110, 360, 130, '#140c28', { o: 5 })
      K.txt(x, 'NOW PLAYING', 740, 1140, { size: 18, color: '#7fe3ff' }); K.txt(x, '“ours” (made-up song)', 740, 1176, { size: 20, color: '#efe6d6' })
      const rep = t < 44.6 ? 1 : t < 46.2 ? 2 : 3
      K.txt(x, `⟳ REPEAT ×${rep}`, 740, 1212, { size: 20, color: '#ff8fb1' })
      K.txt(x, '2:04 AM', 740, 1080, { size: 26, color: '#ffd98a' })
      cancer({ x: 330, y: 1180, mood: t < 43.6 ? 'happy' : 'sparkle', look: [0, -1], tears: t > 45 ? 2 : 0, squash: 0.05 * Math.sin(t * 7) })
      x.strokeStyle = '#140c28'; x.lineWidth = 46; x.beginPath(); x.arc(330, 1430, 200, Math.PI * 1.1, Math.PI * 1.9); x.stroke(); x.strokeStyle = '#4a3a50'; x.lineWidth = 30; x.stroke()
      // floating music notes
      for (let i = 0; i < 4; i++) { const p = (t * 0.5 + i / 4) % 1; K.txt(x, '♪', 300 + i * 50 + Math.sin(t * 2 + i) * 20, 1000 - p * 300, { size: 40, color: `rgba(255,214,140,${1 - p})` }) }
    } else {
      K.room(x, t, { wall: '#2a2a50', wall2: '#16163a', floor: '#2e2a44', window: true })
      K.box(x, 120, 1340, 840, 30, '#6a6a9a')
      const after = t > ANSWER
      cancer({ x: after ? 360 : 380, y: 1250, mood: t < 52.6 ? 'happy' : t < CALL ? 'neutral' : t < 57.6 ? 'wide' : 'sparkle', look: t < 52.6 ? [1, 0] : [0, 0], tears: t > 57.4 ? 3 : t > 53 ? 1 : 0 })
      if (after) K.pisces(x, t, { x: 760, y: 1220, s: 280, pop: K.pop01(t, ANSWER + 0.5, 0.4), look: [-1, 0], tears: 3, mood: t > 58 ? 'sparkle' : 'wide' })
      if (t > 61.4) for (let i = 0; i < 5; i++) { const p = (t * 0.6 + i / 5) % 1; K.txt(x, '♡', 380 + i * 80, 1100 - p * 260, { size: 44, color: `rgba(255,143,177,${1 - p})` }) }
    }
    x.restore()
  },
  over(x, t, K) {
    // SECRET 2: the screenshot folder
    const k2 = K.inOut(t, S[1] + 0.6, 21.4)
    if (k2 > 0.01) K.phone(x, t, {
      X: 600, Y: 1000, w: 520, h: 800, pop: k2, rot: 0.04, title: 'KIND TEXTS ★', time: '11:20',
      screen: (c, tt, w, h) => KIND.forEach((s, i) => {
        const p = K.pop01(tt, S[1] + 1.0 + i * 0.55, 0.3)
        if (p <= 0) return
        const col = i % 2, row = Math.floor(i / 2)
        c.save(); c.translate(-w / 4 + col * w / 2, -h / 2 + 260 + row * 190); c.scale(p, p); c.rotate((i % 3 - 1) * 0.04)
        K.rrect(c, -110, -80, 220, 160, 14, '#efe6d6'); K.rrect(c, -96, -30, 192, 70, 18, '#ff8fb1')
        K.txt(c, s, 0, 6, { size: 15, color: '#1a1236', maxW: 180 }); K.txt(c, 'screenshot', 0, -56, { size: 13, color: '#7a6a9a' })
        c.restore()
      }),
    })
    // SECRET 5: the texts out … and its own phone, empty
    const OUT = [['you ok?', 49.9, 210, 760], ['drink water!!', 50.5, 720, 860], ['proud of you', 51.1, 300, 1060], ['home safe?', 51.7, 760, 1110]]
    for (const [s, at, X, Y] of OUT) { const p = K.inOut(t, at, 53.4); if (p > 0.01) { x.save(); x.translate(X, Y); x.scale(p, p); K.rrect(x, -140, -40, 280, 80, 30, '#ff8fb1'); K.txt(x, s, 0, 0, { size: 28, color: '#1a1236' }); K.txt(x, 'sent ✓', 110, 56, { size: 16, align: 'right', color: '#efe6d6' }); x.restore() } }
    const k5 = K.inOut(t, 52.6, CALL)
    if (k5 > 0.01) K.phone(x, t, { X: 600, Y: 960, w: 440, h: 640, pop: k5, rot: -0.03, title: 'MESSAGES', time: '9:40', screen: (c, tt, w, h) => { K.txt(c, 'no new messages', 0, 0, { size: 28, color: '#bdb3d8' }); K.txt(c, '·  ·  ·', 0, 50, { size: 28, color: '#5a4a7a' }) } })
  },
  cues: [
    ...[5.65, 7.5, 9.5].map(t => ['pop', t, 659.25, 0.035, 0]), ['pluck', 11.4, 523.25, 0.04, 0.8, 0],
    ...KIND.map((_, i) => ['pop', +(S[1] + 1.0 + i * 0.55).toFixed(2), 880 + i * 50, 0.035, (i % 2) - 0.5]), ['glitter', 21.6, 23],
    ['bell', S[2] + 0.4, 783.99, 0.03, 1.6, 0], ['bell', S[2] + 1.2, 987.77, 0.03, 1.6, 0], ['glitter', 29, 30.5], ['pop', 31.03, 987.77, 0.05, 0.3],
    ['whoosh', S[3], 1.2, 0.04], ...[44.6, 46.2].map(t => ['tick', t, 0.06]),
    ...[49.9, 50.5, 51.1, 51.7].map((t, i) => ['pop', t, 987.77 + i * 60, 0.04, 0.3 - i * 0.2]), ['pluck', 52.8, 392, 0.04, 1.2, 0],
    ['glitter', 57.5, 59.5], ['bell', 61.4, 1174.66, 0.04, 2, 0],
  ],
  music: { style: 'dreamy', key: 'E', seed: 4116, sections: { drop: 1.42, breakdown: [S[2], S[4]], lift: [S[3], ANSWER] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
