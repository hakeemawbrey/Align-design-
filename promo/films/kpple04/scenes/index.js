// kpple04 · Planet Talk: Pluto · "Pluto to Cancer: The Reread at 3 a.m." (29.2 s vertical, hard cut) · dreamy · Ab
//   0      Pluto mid-drop down a moonbeam like a spotlight into a dark bedroom, Cancer mid-scroll under the duvet ·
//          "CANCER. | Close the *old chat.*" · 0.5 lands · 0.95 record scratch + freeze "3:12 a.m."
//   2.9    the old chat scrolls back years on the big phone · 6.9 ♋ "I just like *remembering* us."
//   9.9    ♇ "you can honour a memory" · 12.5 "without *living* in it." · 14.9 archive it · 18.0 text a friend, sleep
//   20.9   ARCHIVED · 22.0 a text drops: "I'm up too. want to talk?" · 22.6 Pisces on the other end, crying
//   25.9   ♇ "small step. still *counts.*" · 27.9 "Archived. | *Not* erased." · hard cut at 29.2
import { plutoFilm, HK } from '../../kpple01/plutokit.js'

const D = 29.2
const PL = 'pluto', CA = 'cancer', PI = 'pisces'
const ARCH = 20.9, NOTE = { at: 22.0, out: [25.5, 25.8], title: 'MESSAGES', body: "I'm up too. want to *talk?*", glyph: '♓', color: '#9a8cf0', time: '3:31' }
const OLD = [
  { side: 'L', text: 'good morning :)', size: 28 }, { side: 'R', text: 'morning!! coffee?', size: 28 },
  { side: 'L', text: 'always', size: 28 }, { side: 'R', text: 'miss you already', size: 28 },
  { side: 'L', text: 'same', size: 28 }, { side: 'R', text: 'see you saturday', size: 28 },
]

const F = plutoFilm({
  id: 'kpple04', sign: CA, dur: D, ending: 'cut',
  hook: { text: 'CANCER. | Close the *old chat.*', out: [2.5, 2.75] },
  enter: { kind: 'drop', at: -0.5, len: 1.0, x: 540, y: 640, size: 290 },
  rec: { at: 0.95, len: 1.4, caption: '3:12 a.m. Reading it *all* again.', sub: 'it started so innocently' },
  shots: [{ at: 9.8, z: 1.1, cx: 540, cy: 860, d: 1.5 }, { at: 20.8, z: 1, cx: 540, cy: 960, d: 0.5 }],
  says: [
    { t0: 6.9, t1: 9.6, who: CA, text: 'I just like *remembering* us.', x: 540, y: 1750, tailUp: true, tail: 0 },
    { t0: 9.9, t1: 12.3, who: PL, text: 'you can honour a memory', x: 540, y: 380 },
    { t0: 12.5, t1: 14.6, who: PL, text: 'without *living* in it.', x: 540, y: 380 },
    { t0: 14.9, t1: 17.8, who: PL, text: 'archive it. not delete. just *away.*', x: 540, y: 380 },
    { t0: 18.0, t1: 20.6, who: PL, text: 'then text a friend. then *sleep.*', x: 540, y: 380 },
    { t0: 23.0, t1: 25.6, who: PI, text: 'you *archived* it?? I’m so proud', x: 600, y: 1000, tail: -200 },
    { t0: 25.9, t1: 27.6, who: PL, text: 'small step. still *counts.*', x: 540, y: 380 },
  ],
  last: { text: 'Archived. | *Not* erased.', at: 27.9 },
  fx: [{ f: HK.notification, c: HK.notificationCues, o: NOTE }],
  bg(x, t, K) {
    K.room(x, t, { wall: '#1a1838', wall2: '#0b0a1e', floor: '#1e1830', floorY: 1560, window: true, lamp: false })
    // the moonbeam Pluto rides down
    const b = 0.5 + 0.5 * (1 - K.prog(t, 1, 4)) * 0.6
    x.save(); x.globalAlpha = 0.18 * b + 0.06; x.fillStyle = '#cfd8ff'
    x.beginPath(); x.moveTo(400, -40); x.lineTo(680, -40); x.lineTo(900, 1600); x.lineTo(180, 1600); x.closePath(); x.fill(); x.restore()
    // nightstand + clock
    K.box(x, 820, 1300, 200, 240, '#3a2a4a'); K.box(x, 850, 1230, 140, 70, '#14102a', { o: 5 }); K.txt(x, '3:12', 920, 1266, { size: 40, color: '#ff8a8a' })
  },
  paint(x, t, K) {
    K.pluto(x, t, { mood: t < 6.8 ? 'sly' : t > 25.8 ? 'proud' : t > 22 ? 'happy' : 'sad', look: t > 6.8 && t < 9.7 ? [0, 1] : undefined })
    // the bed: headboard, Cancer tucked in, the duvet over it
    K.box(x, 120, 1200, 680, 120, '#5a3a5a'); K.box(x, 160, 1290, 600, 70, '#efe6d6')
    const s = K.sign(x, t, CA, { x: 450, y: 1330, size: 300, mood: t < 2.7 ? 'wide' : t < 9.8 ? 'sparkle' : t < 20.8 ? 'neutral' : t < 22 ? 'sleepy' : 'happy', look: t < 9.8 ? [0.6, 0.6] : [0.5, -1], tears: t > 6.8 && t < 20.8 ? 1 : 0 })
    // phone glow on its face
    if (t < 21.2) K.glow(x, 560, 1400, 260, '#9fd7ff', 0.35)
    K.box(x, 100, 1420, 720, 220, '#6a5aa8', { o: 6 }); for (let i = 0; i < 5; i++) K.rect(x, 130 + i * 140, 1440, 6, 180, 'rgba(255,255,255,0.08)')
    if (t < 21.2) { x.save(); x.translate(560, 1420); x.rotate(-0.2); K.rrect(x, -40, -70, 80, 130, 14, K.INK); K.rrect(x, -32, -62, 64, 114, 9, '#bfe9ff'); x.restore() }
    // Pisces on the other end (an inset bubble window)
    if (t > 22.5) {
      const k = K.pop01(t, 22.5, 0.35)
      x.save(); x.translate(250, 1000); x.scale(k, k)
      x.fillStyle = K.INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#2a2050'; x.beginPath(); x.arc(0, 0, 138, 0, Math.PI * 2); x.fill()
      x.save(); x.beginPath(); x.arc(0, 0, 138, 0, Math.PI * 2); x.clip(); K.pisces(x, t, { x: 0, y: 30, size: 220, shadow: false, look: [1, 0] }); x.restore()
      x.restore()
    }
  },
  over(x, t, K) {
    if (t > 2.9 && t < 6.7) {
      const k = K.inOut(t, 2.9, 6.7), sc = (t - 2.9) * 0.8
      K.phone(x, t, { X: 540, Y: 1060, w: 560, h: 720, pop: k, title: 'them ♡', time: '3:14', bubbles: OLD.map((b, i) => ({ ...b, at: 2.9 + i * 0.25 })) })
      if (k > 0.5) K.label(x, `SCROLLED TO: ${sc < 1.5 ? '2023' : sc < 2.4 ? '2022' : 'THE VERY FIRST HI'}`, 540, 640, { size: 34, bg: '#c9a6ff', rot: -0.03, pop: k })
    }
    if (t > ARCH && t < 22.4) K.label(x, 'ARCHIVED ✓', 560, 1250, { size: 56, bg: '#9fe6b0', rot: -0.1, pop: K.inOut(t, ARCH, 22.4) })
  },
  cues: [['tick', 3.0, 0.04], ['tick', 3.5, 0.04], ['tick', 4.0, 0.04], ['tick', 4.5, 0.04], ['tom', ARCH, 100, { gain: 0.22, decay: 0.25 }], ['pop', ARCH + 0.05, 1046.5, 0.04, 0], ['glitter', 22.6, 23.6]],
  music: { style: 'dreamy', key: 'Ab', seed: 10404, sections: { lift: [ARCH] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
