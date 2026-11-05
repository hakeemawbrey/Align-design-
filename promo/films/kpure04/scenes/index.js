// kpure04 · Planet Talk: Uranus · "Cancer, Hints Aren't Words" (28 s vertical, loop) · dreamy · Ab · star_advice
//   0      Uranus swinging in UPSIDE DOWN on a cable through the window, curtains flying; "CANCER. | Hinting isn't *telling.*"
//   0.45   glitch · 2.7 Cancer's hints pop round it: baked, cleaned, a sad song on, a loud SIGH
//   2.8    "Baked. Cleaned. *Sighed loudly.*" · 6.3 ♋ "They should *KNOW* I'm hurt."
//   8.0    Uranus flips upright · 8.8 ♅ "The most unexpected thing? *Say it plainly.* Kindly."
//   12.8   their person comes in · ♋ "I felt left out on Saturday. *Can we talk?*"
//   16.8   their person: "Oh no, I had *no idea.* Thank you for telling me." · both soften
//   20.6   Pisces sobbing into a tea towel: "that was *so brave…*"
//   23.4   "Hints are lovely. | *Words* get there." · 27.55 eases back into frame 0 (loop)
import { urFilm, HK } from '../../kpure01/urkit.js'
import { room } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'

const D = 28, HINTS = 2.7, FLIP = 8.0, ASK = 12.8, REPLY = 16.8, PIS = 20.6, LAST = 23.4
const PC = '#f0a3c8', PERSON = 'libra'
const HINT = [
  { s: 'BAKED', at: 3.0, x: 240, y: 960, bg: '#f2c75c' },
  { s: 'CLEANED', at: 3.5, x: 820, y: 1010, bg: '#9fe6b0' },
  { s: 'SAD SONG ON', at: 4.0, x: 300, y: 1140, bg: '#c9a6ff' },
  { s: 'SIGH.', at: 4.5, x: 790, y: 1190, bg: '#ff8fb1' },
]

const F = urFilm({
  id: 'kpure04', sign: 'cancer', dur: D, ending: 'loop',
  hook: { text: 'CANCER. | Hinting isn’t *telling.*', top: 230 },
  entry: { kind: 'drop', at: -0.55, len: 1.3, x: 760, y: 780, size: 380 },
  brk: { at: 0.45, len: 0.45 },
  debris: [
    { w: 120, h: 260, color: '#ff8fb1', x: 650, y: 520, vx: -700, vy: -500, spin: 4, t0: -0.4 },
    { w: 120, h: 260, color: '#ff8fb1', x: 900, y: 520, vx: 520, vy: -600, spin: -4, t0: -0.4 },
    { label: '✿', w: 80, h: 80, color: '#9fe6b0', x: 760, y: 700, vx: -200, vy: -1100, spin: 6, t0: -0.35 },
  ],
  bg(x, t, K) { room(x, t, { wall: '#3a2a52', wall2: '#22183c', floor: '#4a3048', floorY: 1460, warm: 0.5 }) },
  paint(x, t, K) {
    // Uranus: hanging upside down on its cable, swinging, until it flips upright at FLIP
    const up = ease.outBack(prog(t, FLIP, FLIP + 0.5))
    const swing = (1 - up) * 0.22 * Math.sin(t * 2.6)
    const U = K.track(t, [[0, { x: 760, y: 780, size: 380 }], [FLIP + 0.5, { x: 760, y: 780, size: 380 }], [FLIP + 0.9, { x: 600, y: 700, size: 360 }], [LAST - 0.5, { x: 600, y: 700, size: 360 }], [LAST, { x: 560, y: 820, size: 360 }]])
    const ux = U.x + Math.sin(swing) * 300
    if (up < 1) {
      // the cable (from above the frame)
      const e = K.LAND > t ? 0 : 0
      const P = t < K.LAND ? null : 1
      x.save(); x.strokeStyle = K.INK; x.lineWidth = 12; x.beginPath(); x.moveTo(U.x, -40); x.lineTo(ux, U.y - 150 + (t < K.LAND ? -1300 * (1 - ease.outQuart(prog(t, K.E.at, K.LAND))) : 0)); x.stroke()
      x.strokeStyle = '#cfe9ff'; x.lineWidth = 5; x.stroke(); x.restore()
    }
    K.uranus(x, t, { x: ux, y: U.y, size: U.size, rot: Math.PI * (1 - up) + swing, mood: t < FLIP ? 'happy' : t < ASK ? 'sly' : 'happy', look: t < FLIP ? [0, -1] : [-0.6, 0.8], hops: [REPLY + 0.3] })
    // Cancer
    const mood = t < HINTS ? 'wide' : t < 8.8 ? 'squint' : t < ASK ? 'wide' : t < REPLY ? 'neutral' : 'happy'
    const C = K.track(t, [[0, { x: 400, y: 1420, s: 330 }], [ASK, { x: 400, y: 1420, s: 330 }], [ASK + 0.4, { x: 330, y: 1420, s: 320 }]])
    K.sign(x, t, 'cancer', { ...C, mood, look: t < HINTS ? [1, -1] : t < ASK ? [0.5, -0.5] : [1, 0], hops: [4.5, REPLY + 0.6, REPLY + 1.2], shadow: true })
    // their person walks in from the right
    const pk = ease.outCubic(prog(t, ASK - 0.3, ASK + 0.3))
    if (pk > 0) K.sign(x, t, PERSON, { x: lerp(1300, 790, pk), y: 1420, s: 310, glyph: false, mood: t < REPLY ? 'neutral' : t < REPLY + 1.6 ? 'wide' : 'happy', look: [-1, 0], hops: [REPLY + 0.6, REPLY + 1.2], seed: 4, shadow: true })
    // Pisces in the doorway, sobbing into a tea towel
    const qk = K.pop01(t, PIS, 0.4) * K.outK(t, [D - 0.9, D - 0.6])
    if (qk > 0.01) {
      K.pisces(x, t, { x: 930, y: 860, s: 230, pop: qk, hops: [PIS + 0.8, PIS + 1.6] })
      x.save(); x.translate(930, 960); x.scale(qk, qk); x.rotate(0.1 * Math.sin(t * 4)); K.box(x, -90, -18, 180, 70, '#efe6d6', { o: 4 }); for (let i = 0; i < 4; i++) K.rect(x, -80 + i * 44, -18, 16, 70, '#e8628a'); x.restore()
    }
  },
  over(x, t, K) {
    for (const h of HINT) {
      const k = K.pop01(t, h.at, 0.3) * K.outK(t, [6.0, 6.25])
      if (k > 0.01) K.label(x, h.s, h.x, h.y, { size: 46, bg: h.bg, pop: k, rot: (h.x > 540 ? 0.06 : -0.06) })
    }
  },
  lines: [
    { t0: 6.3, t1: 8.6, who: 'cancer', text: 'They should *KNOW* I’m hurt.', x: 420, y: 1760, tailUp: true, tail: -40 },
    { t0: 8.8, t1: 12.6, who: 'uranus', text: 'The most unexpected thing? *Say it plainly.* Kindly.', x: 540, y: 400, tail: 60, maxW: 820 },
    { t0: ASK + 0.3, t1: 16.6, who: 'cancer', text: 'I felt left out on Saturday. *Can we talk?*', x: 420, y: 1060, tail: -60, maxW: 640 },
    { t0: REPLY, t1: 20.4, who: 'their person', color: PC, text: 'Oh no, I had *no idea.* Thank you for telling me.', x: 640, y: 1060, tail: 160, maxW: 680 },
    { t0: PIS + 0.2, t1: 23.0, who: 'pisces', text: 'that was *so brave…*', x: 640, y: 1110, tail: 260 },
  ],
  heads: [
    { at: 2.8, text: 'Baked. Cleaned. | *Sighed loudly.*', out: [6.0, 6.25], top: 240, size: 92 },
    { at: LAST, text: 'Hints are lovely. | *Words* get there.', top: 240, size: 100, out: [D - 0.5, D - 0.2] },
  ],
  fx: [{ f: HK.whipZoom, c: HK.whipZoomCues, o: { at: FLIP, len: 0.4, from: 1.3 } }],
  cues: [
    ...HINT.map((h, i) => ['pop', h.at, 783.99 + i * 98, 0.05, h.x > 540 ? 0.3 : -0.3]),
    ['whoosh', FLIP - 0.05, 0.4, 0.05], ['pop', FLIP + 0.3, 1046.5, 0.04, 0],
    ['tick', ASK - 0.2, 0.04], ['bell', REPLY + 0.1, 659.25, 0.04, 2, 0],
    ['glitter', PIS, PIS + 1.2],
  ],
  music: { style: 'dreamy', key: 'Ab', seed: 8104, sections: { drop: HINTS, breakdown: [ASK], lift: [REPLY] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
