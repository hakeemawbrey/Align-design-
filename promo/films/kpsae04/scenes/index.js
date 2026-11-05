// kpsae04 · Planet Talk: Saturn · "Saturn Teaches Cancer a Soft No" (30 s vertical, hard cut) · dreamy · Ab
//   0      Saturn dropping in; its ring snapping shut round Cancer's front door like a gate; a queue of friends with
//          laundry bags, one mid-knock. "CANCER. | Doors *close* too. Promise."  · 0.5 the landing
//   0.8    ♄ "CANCER. When did you last *rest?*" · 2.9 "the friend everyone *leans on.*"
//   3.1    ♌ "quick vent? *three hours?*" · 5.0 ♍ "can you host *again?*" · 6.0 social battery → 2%
//   6.9    ♋ "of course! *always!*" · 9.3 ♄ "in astrology, I rule *boundaries.*" · 11.6 "they're not walls. they're *doors.*"
//   13.9   ♄ "a kind no keeps your *yes* real." · 16.5 ♋ "not tonight. but I *love* you."
//   19.1   ♌ "of course! *rest.* love you!" · 21.3 Pisces the intern into the tea towel: "that was *beautiful*"
//   23.7   ♋ "…why do I feel *lighter?*" · 25.9 the door sign · 27.6 ♄ "A soft heart. *With* a door." · hard cut 30
import { saFilm, HK } from '../../kpsae01/sakit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 30
const DOOR = { x: 390, y: 1170, w: 300, h: 560 }
const F = saFilm({
  id: 'kpsae04', sign: 'cancer', dur: D, ending: 'cut',
  hook: 'CANCER.|Doors *close* too. Promise.', hookY: 1700, hookSize: 88, hookOut: 2.6,
  arrive: { kind: 'drop', at: -0.9, x: 540, y: 470, size: 400 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 3.0, cam: [1.15, 600, 1080] },
    { at: 6.8, cam: [1.1, 520, 1080] },
    { at: 9.2, cam: [1, 540, 960] },
    { at: 16.4, cam: [1.15, 600, 1080] },
    { at: 21.2, cam: [1, 540, 960] },
  ],
  says: [
    { t0: 0.8, t1: 2.7, who: 'saturn', text: 'CANCER. When did you last *rest?*', x: 540, y: 185 },
    { t0: 3.1, t1: 4.8, who: 'leo', text: 'quick vent? *three hours?*', x: 640, y: 1640, tailUp: true, tail: 150 },
    { t0: 5.0, t1: 6.7, who: 'virgo', text: 'can you host *again?*', x: 640, y: 1640, tailUp: true, tail: 220 },
    { t0: 6.9, t1: 8.9, who: 'cancer', text: 'of course! *always!*', x: 460, y: 1640, tailUp: true, tail: -60 },
    { t0: 9.3, t1: 11.4, who: 'saturn', text: 'in astrology, I rule *boundaries.*', x: 540, y: 185 },
    { t0: 11.6, t1: 13.7, who: 'saturn', text: "they're not walls. they're *doors.*", x: 540, y: 185 },
    { t0: 13.9, t1: 16.2, who: 'saturn', text: 'a kind no keeps your *yes* real.', x: 540, y: 185 },
    { t0: 16.5, t1: 18.9, who: 'cancer', text: 'not tonight. but I *love* you.', x: 480, y: 1660, tailUp: true, tail: -60 },
    { t0: 19.1, t1: 21.0, who: 'leo', text: 'of course! *rest.* love you!', x: 640, y: 1660, tailUp: true, tail: 150 },
    { t0: 21.3, t1: 23.4, who: 'pisces', text: 'that was *beautiful*', x: 700, y: 1480, tail: 200 },
    { t0: 23.7, t1: 25.7, who: 'cancer', text: '…why do I feel *lighter?*', x: 480, y: 1660, tailUp: true, tail: -60 },
    { t0: 27.6, who: 'saturn', text: 'A soft heart. *With* a door.', x: 540, y: 185, size: 50 },
  ],
  heads: [{ text: 'the friend everyone|*leans on.*', at: 2.9, out: [4.9, 5.15], top: 700, size: 76 }],
  paint(x, t, K) {
    // the porch at night
    K.drawSpace(x, t, { planet: 'saturn', seed: 4, stars: 0.8 })
    K.box(x, 120, 760, 840, 760, '#3b2a4a', { o: 6 })
    for (let j = 0; j < 9; j++) K.rect(x, 126, 790 + j * 82, 828, 4, 'rgba(0,0,0,0.18)')
    // the warm doorway + Cancer inside it
    const { x: dx, y: dy, w, h } = DOOR
    K.box(x, dx - w / 2 - 20, dy - h / 2 - 20, w + 40, h + 20, '#e2c27e', { o: 5 })
    const g = x.createLinearGradient(0, dy - h / 2, 0, dy + h / 2); g.addColorStop(0, '#ffd99a'); g.addColorStop(1, '#ffb36a')
    x.fillStyle = g; x.fillRect(dx - w / 2, dy - h / 2, w, h)
    K.box(x, 60, dy + h / 2, 960, 40, '#5a4a6a')
    const cMood = t < 2.8 ? 'wide' : t < 6.8 ? 'neutral' : t < 9.2 ? 'sleepy' : t < 16.4 ? 'neutral' : t < 19.1 ? 'squint' : t < 23.6 ? 'happy' : 'sparkle'
    K.sign(x, t, 'cancer', { x: dx, y: dy + 110, s: 250, mood: cMood, look: t < 9.2 ? [1, 0] : [0, -1], tears: t > 6.8 && t < 9.2 ? 1 : 0, zzz: false })
    // the ladle Cancer is still holding
    K.box(x, dx - 150, dy + 40, 14, 120, '#c9c9d8'); K.box(x, dx - 170, dy + 150, 54, 30, '#c9c9d8')
    // the open door leaf + its sign
    K.box(x, dx + w / 2, dy - h / 2, 60, h, '#8a4a3a')
    const sk = K.pop01(t, 25.9, 0.35)
    if (sk > 0.01) { x.save(); x.translate(dx + w / 2 + 30, dy - 40); x.rotate(0.06); x.scale(sk, sk); K.box(x, -110, -60, 220, 120, '#fffaf0', { o: 4 }); K.txt(x, 'RESTING', 0, -22, { size: 30, color: K.INK }); K.txt(x, '(lovingly)', 0, 22, { size: 22, color: '#a04a6a' }); x.restore() }
    // the queue of friends with laundry and problems (mid-knock at frame 0)
    const leave = ease.inOutCubic(prog(t, 21.0, 22.4))
    const Q = [['leo', 680, 1300, 220], ['virgo', 850, 1330, 190], ['sagittarius', 1000, 1360, 160]]
    Q.forEach(([id, qx, qy, s], i) => {
      const knock = i === 0 && t < 2.8 ? Math.max(0, Math.sin(t * 16)) * 26 : 0
      const X = qx + 520 * leave - knock, mood = t > 19.0 && i === 0 ? 'happy' : t > 16.5 && t < 19.1 ? 'wide' : 'neutral'
      K.sign(x, t, id, { x: X, y: qy, s, mood, look: [-1, -0.3], glyph: false, seed: 5 + i })
      K.box(x, X + s * 0.25, qy + s * 0.08, s * 0.45, s * 0.38, ['#7fa0d8', '#d88f7f', '#9ad87f'][i], { o: 4 })
    })
    // Saturn + its ring (snapped round the door at frame 0; flies back; out again for "doors")
    const P = K.pose(t), sr = P.size / 2
    const onDoor = Math.max(1 - ease.inOutCubic(prog(t, 2.4, 3.0)), ease.inOutCubic(prog(t, 11.6, 12.2)) * (1 - ease.inOutCubic(prog(t, 15.8, 16.4))))
    const snap = ease.outBack ? 1 : 1
    const close = ease.outCubic(prog(t, -0.6, 0.35))
    const rx = lerp(1.85 * sr, lerp(560, 230, close), onDoor), ry = lerp(0.42 * sr, lerp(700, 360, close), onDoor)
    const sMood = t < 2.8 ? 'angry' : t < 9.2 ? 'sad' : t < 16.4 ? 'neutral' : t < 21.2 ? 'happy' : 'proud'
    const ringOn = onDoor <= 0.001
    if (!ringOn) K.ring(x, dx, dy, rx, ry, { half: 'back', w: 0.16, t })
    K.arriving(x, t, { mood: sMood, look: [0, 1], rings: ringOn })
    if (!ringOn) K.ring(x, lerp(P.x, dx, onDoor), lerp(P.y, dy, onDoor), rx, ry, { rot: lerp(-0.32, 0, onDoor), half: onDoor > 0.5 ? 'front' : 'both', w: 0.16, t })
    // Pisces the intern, with a tea towel
    const ik = K.pop01(t, 1.6, 0.4)
    K.intern(x, t, { x: 930, y: 1560, s: 200, pop: ik, tears: t > 21.2 ? 3 : 2, mood: t > 21.2 ? 'wide' : 'sparkle', clip: t < 21.2 })
    if (t > 21.2) K.tissue(x, 850, 1580, 1.2, { pop: K.pop01(t, 21.25, 0.3), rot: -0.3 + 0.1 * Math.sin(t * 6) })
  },
  over(x, t, K) {
    K.loading(x, t, { at: 6.0, out: 9.1, label: 'social battery', pct: tt => 1 - 0.98 * ease.outCubic(prog(tt, 6.1, 8.3)), Y: 640, err: null, color: '#ff8fb1' })
  },
  cues: [
    ...[0.1, 0.32, 0.54, 0.76, 1.0, 1.24].map(t => ['tom', t, 140, { gain: 0.2 }]),
    ['crash', 0.36, 0.04], ['whoosh', 2.4, 0.3, 0.04], ['pop', 3.0, 659.25, 0.04, 0],
    ...[6.3, 6.8, 7.3, 7.8].map(t => ['tick', t, 0.03]), ['chip', 8.3, 1318.51, 0.25, { gain: 0.03 }],
    ['whoosh', 11.6, 0.3, 0.05], ['bell', 12.2, 1244.51, 0.04, 1.0, 0],
    ['whoosh', 21.0, 0.4, 0.04], ['glitter', 21.3, 22.6], ['pop', 25.92, 830.61, 0.05, 0], ['tick', 26.0, 0.04],
  ],
  music: { style: 'dreamy', key: 'Ab', seed: 7104, sections: { breakdown: 9.2, lift: [19.1] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
