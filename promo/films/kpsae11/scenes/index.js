// kpsae11 · Planet Talk: Saturn · "Saturn Labels Aquarius" (24 s vertical, loop) · synthwave · Gm
//   0      Saturn bursting in; a label maker the size of a fridge mid-print, a huge DATING label mid-stick onto Aquarius.
//          "AQUARIUS. | That's a *label.* Sorry."  · 0.25 the landing + a glitch
//   2.5    ♒ "we're just two *free agents.*" · 4.6 the phone: "gm :)" day 1, day 47, day 90 (caught)
//   6.0    "good morning texts. *90 days* straight." · 8.8 EXHIBIT B: two toothbrushes (caught)
//   11.0   glitch: LABELS.EXE has entered the chat · 12.6 ♄ "you can be free *and* someone's."
//   15.0   ♒ "…can we call it *'us'?*" · 17.2 Pisces the intern: "they said *'us'!!*" · 19.4 a new label: US ♡
//   20.4   ♒ "Labels are a construct. *Ours* is cute." · 23.55 eases back into the frame-0 print (loop)
import { saFilm, HK } from '../../kpsae01/sakit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 24
const PH = [4.6, 8.6], EXB = [8.8, 11.0], NEW = 19.4
const GL = { at: 11.0, len: 1.4, text: 'LABELS.EXE has entered the chat', buttons: ['OK', 'OK!'] }
const GL0 = { at: 0.25, len: 0.5, dialog: false, amp: 0.8 }
const MACH = { x: 820, y: 1160 }, AQ = { x: 330, y: 1240 }
const F = saFilm({
  id: 'kpsae11', sign: 'aquarius', dur: D, ending: 'loop',
  hook: 'AQUARIUS.|That’s a *label.* Sorry.', hookY: 210, hookSize: 92, hookOut: 2.4,
  arrive: { kind: 'burst', at: -0.3, x: 560, y: 620, size: 400 },
  shots: [{ at: 0, cam: [1, 540, 960] }, { at: 15.0, cam: [1.14, 420, 1080] }, { at: 17.1, cam: [1, 540, 960] }],
  says: [
    { t0: 2.5, t1: 4.4, who: 'aquarius', text: "we're just two *free agents.*", x: 420, y: 1700, tailUp: true, tail: -60 },
    { t0: 12.6, t1: 14.8, who: 'saturn', text: "you can be free *and* someone's.", x: 540, y: 185 },
    { t0: 15.0, t1: 17.0, who: 'aquarius', text: "…can we call it *'us'?*", x: 420, y: 1700, tailUp: true, tail: -60 },
    { t0: 17.2, t1: 19.2, who: 'pisces', text: "they said *'us'!!*", x: 720, y: 1480, tail: 180 },
    { t0: 20.4, t1: 23.45, who: 'aquarius', text: 'Labels are a construct. *Ours* is cute.', x: 440, y: 1700, tailUp: true, tail: -60, size: 46 },
  ],
  heads: [{ text: 'good morning texts.|*90 days* straight.', at: 6.0, out: [8.4, 8.65], top: 300, size: 80 }],
  fx: [{ f: HK.glitch, c: HK.glitchCues, o: GL0 }, { f: HK.glitch, c: HK.glitchCues, o: GL }],
  paint(x, t, K) {
    K.drawSpace(x, t, { planet: 'uranus', tint: '#3fb3c4', seed: 11, horizon: { y: 1500, color: '#14203a' } })
    // grid floor
    x.save(); x.strokeStyle = 'rgba(127,227,255,0.25)'; x.lineWidth = 3
    for (let i = -10; i <= 10; i++) { x.beginPath(); x.moveTo(540 + i * 40, 1500); x.lineTo(540 + i * 220, 1920); x.stroke() }
    for (let j = 0; j < 7; j++) { const y = 1500 + Math.pow(j / 6, 1.8) * 420 + ((t * 40) % 60) * (j / 6); x.beginPath(); x.moveTo(0, y); x.lineTo(1080, y); x.stroke() }
    x.restore()
    // the fridge-sized label maker
    K.box(x, MACH.x - 150, MACH.y - 230, 300, 460, '#e9e3f0', { o: 6 }); K.rect(x, MACH.x - 120, MACH.y - 200, 240, 120, '#1a1236')
    K.txt(x, t < NEW ? 'DATING' : 'US ♡', MACH.x, MACH.y - 140, { size: 44, color: '#7dffb0' })
    for (let i = 0; i < 9; i++) K.box(x, MACH.x - 110 + (i % 3) * 80, MACH.y - 40 + Math.floor(i / 3) * 70, 60, 50, i === 4 ? K.RED : '#c9c2d8', { o: 3 })
    K.box(x, MACH.x - 160, MACH.y + 180, 20, 70, K.INK)
    // the label: printing out of the slot toward Aquarius (mid-stick at frame 0), then stuck on its chest
    const print = ease.outCubic(prog(t, -0.6, 0.35))
    const peel = t > 2.6 && t < 4.4 ? Math.sin((t - 2.6) * 6) * 0.3 : 0
    const word = t < NEW + 0.3 ? 'DATING' : 'US ♡'
    const swap = t > NEW && t < NEW + 0.6 ? Math.sin(Math.PI * prog(t, NEW, NEW + 0.6)) : 0
    // Aquarius
    const aMood = t < 2.4 ? 'wide' : t < 4.5 ? 'squint' : t < 11 ? 'wide' : t < 15 ? 'neutral' : t < 20.3 ? 'sparkle' : 'happy'
    K.sign(x, t, 'aquarius', { x: AQ.x, y: AQ.y, s: 320, mood: aMood, look: t < 4.6 ? [1, -0.2] : t < 11 ? [0.8, -1] : [0.6, -0.8], sweat: t > 4.6 && t < 11, blush: t > 15 ? 1 : undefined })
    if (print < 1) {
      // the tape in flight from the slot
      const ex = lerp(MACH.x - 160, AQ.x + 40, print), ey = lerp(MACH.y + 210, AQ.y + 125, print)
      x.save(); x.strokeStyle = K.INK; x.lineWidth = 92; x.lineCap = 'butt'; x.beginPath(); x.moveTo(MACH.x - 150, MACH.y + 210); x.lineTo(ex, ey); x.stroke()
      x.strokeStyle = '#fffaf0'; x.lineWidth = 80; x.stroke(); x.restore()
      const mx = (MACH.x - 150 + ex) / 2, my = (MACH.y + 210 + ey) / 2
      x.save(); x.translate(mx, my); x.rotate(Math.atan2(ey - MACH.y - 210, ex - MACH.x + 150) + Math.PI); K.txt(x, 'DATING', 0, 2, { size: 52, font: K.INTER, weight: 900, color: K.INK }); x.restore()
    } else {
      x.save(); x.translate(AQ.x + 20, AQ.y + 125 - swap * 80); x.rotate(-0.14 + peel); x.scale(0.8 - 0.25 * swap, 0.8 - 0.25 * swap)
      K.box(x, -150, -46, 300, 92, '#fffaf0', { o: 5 }); K.txt(x, word, 0, 4, { size: 56, font: K.INTER, weight: 900, color: word === 'DATING' ? K.INK : '#c8243a' })
      x.restore()
    }
    // Saturn
    const sMood = t < 2.4 ? 'neutral' : t < 11 ? 'sly' : t < 15 ? 'neutral' : t < 19.3 ? 'happy' : 'proud'
    K.arriving(x, t, { mood: sMood, look: [-0.8, 0.6] })
    K.intern(x, t, { x: 940, y: 1600, s: 190, pop: K.pop01(t, 1.6, 0.4), tears: t > 17.1 ? 3 : 2, mood: t > 17.1 ? 'wide' : 'sparkle' })
  },
  over(x, t, K) {
    // the phone: good-morning texts
    const pk = K.inOut(t, PH[0], PH[1])
    K.phone(x, t, {
      X: 560, Y: 1000, w: 500, h: 720, pop: pk, rot: -0.03, title: 'them ♡', time: '7:02', size: 30,
      bubbles: [{ side: 'R', from: 'DAY 1', text: 'gm :)', at: 4.8 }, { side: 'R', from: 'DAY 47', text: 'gm!! :)', at: 5.2 }, { side: 'R', from: 'DAY 90', text: 'good morning, you :)', at: 5.6 }],
    })
    if (t < PH[1] - 0.3) K.caught(x, t, { at: 5.8, X: 680, Y: 1120, r: 200, out: PH[1] - 0.3 })
    // EXHIBIT B: two toothbrushes
    const ek = K.inOut(t, EXB[0], EXB[1])
    if (ek > 0.01) {
      x.save(); x.translate(560, 980); x.rotate(0.04); x.scale(ek, ek)
      K.box(x, -260, -260, 520, 520, '#fffaf0', { o: 8 }); K.txt(x, 'EXHIBIT B', 0, -210, { size: 34, color: K.INK })
      K.box(x, -90, 20, 180, 200, '#7fe3ff', { o: 6 })
      for (const [dx, c, r] of [[-30, '#ff8fb1', -0.2], [30, '#7dffb0', 0.2]]) { x.save(); x.translate(dx, 30); x.rotate(r); K.box(x, -12, -220, 24, 220, c, { o: 4 }); K.box(x, -20, -250, 40, 40, '#fffaf0', { o: 4 }); x.restore() }
      K.txt(x, 'one is theirs.', 0, 236 - 10, { size: 26, color: '#c8243a' })
      x.restore()
      K.caught(x, t, { at: 9.3, X: 560, Y: 900, r: 170, out: EXB[1] - 0.25 })
    }
  },
  cues: [
    ['pop', 0.0, 1046.5, 0.04, 0], ...[0.05, 0.12, 0.19, 0.26].map(t => ['tick', t, 0.04]),
    ...[4.8, 5.2, 5.6].map(t => ['pop', t, 987.77, 0.04, 0.2]),
    ['whoosh', NEW, 0.3, 0.04], ...[NEW + 0.1, NEW + 0.2, NEW + 0.3].map(t => ['tick', t, 0.04]), ['pop', NEW + 0.5, 1174.66, 0.05, 0],
    ['glitter', 17.2, 18.6],
  ],
  music: { style: 'synthwave', key: 'Gm', seed: 7111, sections: { lift: [15.0] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
