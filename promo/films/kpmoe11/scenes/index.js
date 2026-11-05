// kpmoe11 · Planet Talk: The Moon · to Aquarius · "Aquarius Heard That Sigh" (24 s vertical, loop) · chiptune · Gm
//   0      frame 0: the Moon mid-teleport (bursting in way too big) beside Aquarius' gadget desk; Aquarius mid-sigh at a "seen"
//          message (a sigh cloud in the air); "AQUARIUS. | I *heard* that sigh." · 0.2 glitch
//   2.4    "Left on *seen.* | Totally fine." · 5.2 Aquarius: "I'm emotionally unavailable. *on purpose.*"
//   8.2    the Moon: "i remember every feeling. even the ones you *filed.*" · 11.6 the FEELINGS drawer flies open:
//          "they liked my weird idea" · "thought about it hourly" · "kept their doodle"
//  14.0    Aquarius: "that's *classified.*" · 16.0 the Moon: "say *one.*" · 17.6 "…fine. I *like* them." · Pisces sobs
//  19.8    ACHIEVEMENT UNLOCKED: said a *feeling* out loud · 20.6 "Classified. | *Also* extremely obvious." · loop
import { moonFilm, HK } from '../../kpmoe01/moonkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const OPEN = 11.6, LIKE = 17.6, DUR = 24
const GL = { at: 0.2, len: 0.9, dialog: false, amp: 1 }
const ACH = { at: 19.8, out: [21.7, 22.0], text: 'said a *feeling* out loud', y: 1520 }
const FILES = [{ at: 11.9, s: 'they liked my weird idea' }, { at: 12.5, s: 'thought about it hourly' }, { at: 13.1, s: 'kept their doodle' }]

function lab(x, t, K) {
  K.room(x, t, { wall: '#1e2e4a', wall2: '#0e1630', floor: '#1a2236', warm: 0, window: false })
  // monitors with scrolling code
  for (const [mx, my] of [[80, 560], [340, 520]]) {
    K.box(x, mx, my, 220, 160, '#0a1a2a', { o: 6 })
    for (let i = 0; i < 6; i++) K.rect(x, mx + 16, my + 16 + ((i * 24 + t * 30) % 140), 60 + ((i * 37) % 120), 8, i % 2 ? '#7fe3ff' : '#7dffb0')
  }
  K.box(x, -40, 1380, 1160, 46, '#3a4a6a', { o: 6 })
  // the filing cabinet (right)
  K.box(x, 800, 900, 240, 480, '#8a9ab8', { o: 6 })
  const out = ease.outBack(prog(t, OPEN, OPEN + 0.35)) * (1 - ease.inCubic(prog(t, 22.8, 23.3)))
  for (let i = 0; i < 3; i++) {
    const dx = i === 1 ? -110 * out : 0
    K.box(x, 820 + dx, 930 + i * 150, 200, 120, '#a8b8d0', { o: 5 }); K.rect(x, 890 + dx, 980 + i * 150, 60, 14, K.INK)
  }
  K.label(x, 'FEELINGS', 820 - 110 * out + 100, 1110, { size: 22, bg: '#ff8fb1' })
}
function sigh(x, t, K) {
  const k = 1 - prog(t, 1.6, 2.2)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  const X = 540 + Math.max(0, t) * 30, Y = 1080 - Math.max(0, t) * 20
  for (const [a, b, r] of [[0, 0, 60], [-50, 20, 44], [50, 18, 46], [0, 34, 50]]) { x.fillStyle = K.INK; x.beginPath(); x.arc(X + a, Y + b, r + 6, 0, Math.PI * 2); x.fill() }
  for (const [a, b, r] of [[0, 0, 60], [-50, 20, 44], [50, 18, 46], [0, 34, 50]]) { x.fillStyle = '#eef0ff'; x.beginPath(); x.arc(X + a, Y + b, r, 0, Math.PI * 2); x.fill() }
  K.txt(x, 'sigh.', X, Y + 20, { size: 40, font: K.SERIF, weight: 600, italic: true, color: K.INK })
  x.restore()
}

const F = moonFilm({
  id: 'kpmoe11', sign: 'aquarius', dur: DUR, ending: 'loop',
  hook: { text: 'AQUARIUS. | I *heard* that sigh.', out: [2.2, 2.4] },
  enter: { kind: 'burst', at: -0.42, x: 760, y: 560, size: 340 },
  whip: false,
  moon: [
    { at: 0, mood: 'sly' },
    { at: 2.2, mood: 'neutral' },
    { at: 8.1, mood: 'proud' },
    { at: OPEN, mood: 'sly' },
    { at: 15.9, mood: 'happy' },
    { at: LIKE, mood: 'love' },
    { at: 23.0, mood: 'sly' },
  ],
  me: [
    { at: 0, x: 360, y: 1250, s: 290, mood: 'sleepy', look: [1, 0.6], squash: 0.08 },
    { at: 2.2, mood: 'neutral', squash: 0, look: [1, -0.5] },
    { at: 5.1, mood: 'eyeroll' },
    { at: 8.1, mood: 'wide', look: [1, -0.6] },
    { at: OPEN, mood: 'wide', look: [1, 0] },
    { at: 13.9, mood: 'squint', look: [-1, 0] },
    { at: 15.9, mood: 'neutral', look: [1, -0.6] },
    { at: LIKE, mood: 'heart', look: [0, 0] },
    { at: 23.0, mood: 'sleepy', look: [1, 0.6], squash: 0.08 },
  ],
  meHops: [5.3, 14.1, LIKE, 18.0],
  pis: { x: 190, y: 860, s: 120, keys: [{ at: 0, tears: 1, mood: 'wide', look: [1, 0.4] }, { at: 12.5, tears: 2, mood: 'sparkle' }, { at: 18.8, tears: 3, mood: 'happy' }, { at: 23.0, tears: 1, mood: 'wide' }], sobs: [12.7, 18.9], hops: [18.9, 19.3] },
  says: [
    { t0: 5.2, t1: 8.0, who: 'aquarius', text: 'I’m emotionally unavailable. *on purpose.*', x: 420, y: 1660, tail: -60, tailUp: true },
    { t0: 8.2, t1: 11.4, who: 'moon', text: 'i remember every feeling. even the ones you *filed.*', x: 540, y: 950, tail: 220, tailUp: true },
    { t0: 14.0, t1: 15.8, who: 'aquarius', text: 'that’s *classified.*', x: 420, y: 1660, tail: -60, tailUp: true, size: 50 },
    { t0: 16.0, t1: 17.4, who: 'moon', text: 'say *one.*', x: 640, y: 900, tail: 120, tailUp: true, size: 54 },
    { t0: LIKE, t1: 19.7, who: 'aquarius', text: '…fine. I *like* them.', x: 420, y: 1660, tail: -60, tailUp: true },
  ],
  heads: [
    { text: 'Left on *seen.* | Totally fine.', at: 2.4, out: [5.0, 5.25], top: 240, size: 88 },
    { text: 'Classified. | *Also* extremely obvious.', at: 20.6, out: [23.3, 23.55], top: 240, size: 86 },
  ],
  fx: [
    { f: HK.glitch, c: HK.glitchCues, o: GL },
    { f: HK.achievement, c: HK.achievementCues, o: ACH },
  ],
  set(x, t, K) { lab(x, t, K) },
  front(x, t, K) { sigh(x, t, K) },
  over(x, t, K) {
    for (const [i, f] of FILES.entries()) {
      const k = K.pop01(t, f.at, 0.35, 2.2) * (1 - ease.inCubic(prog(t, 15.6, 16.0)))
      if (k <= 0.01) continue
      x.save(); x.translate(560, 1000 + i * 120); x.rotate((i - 1) * 0.05); x.scale(k, k)
      K.box(x, -260, -46, 520, 92, '#fffaf0', { o: 5 }); K.rect(x, -260, -46, 120, 16, '#f2c75c')
      K.txt(x, f.s, 0, 6, { size: 28, color: K.INK }); x.restore()
    }
  },
  cues: [
    ['whoosh', 0.2, 0.6, 0.04], ['crash', OPEN, { gain: 0.04 }], ['tom', OPEN, 200, { gain: 0.2 }],
    ...FILES.map(f => ['chip', f.at, 1046.5, 0.12, { gain: 0.03 }]), ['pop', LIKE, 1318.51, 0.05, 0], ['glitter', LIKE, LIKE + 1.2],
  ],
  music: { style: 'chiptune', key: 'Gm', seed: 20211, sections: { drop: 2.2, breakdown: [16.0], lift: [LIKE] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
