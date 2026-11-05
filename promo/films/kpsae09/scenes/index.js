// kpsae09 · Planet Talk: Saturn · "Saturn Unpacks Sagittarius" (26 s vertical, hard cut) · synthwave · Bm
//   0      Saturn spinning in; its ring zipping round a half-packed suitcase like a belt, clothes mid-air, Sagittarius
//          mid-leap over the bed. "SAGITTARIUS. | Unpack. *We're* talking."  · 0.5 the landing
//   2.5    ♄ "SAGITTARIUS. It's *2 a.m.*" · 4.4 ♐ "spontaneous *trip!* totally random!"
//   6.6    notification: "still on for our talk tomorrow? :)" · 7.4 record scratch + freeze:
//          "booked a flight to avoid *one* conversation."
//   9.1    ♄ "commitment doesn't cancel *adventure.*" · 11.4 "it *brings someone.*" · 13.2 ♐ "…wait. I can *bring* them?"
//   15.4   the clothes fly back · ♐ "hey. can we talk *now?* come with me?" · 17.8 "obviously. window or aisle?"
//   18.4   Pisces the intern, sobbing: "a *couples* trip!!" · 20.6 ♄ "adventure's better *shared.*"
//   23.9   two boarding passes · ♐ "Window seat. *Two* tickets." · hard cut 26
import { saFilm, HK } from '../../kpsae01/sakit.js'
import { prog, ease, lerp, clamp, rng } from '../../../src/lib.js'

const D = 26
const REC = { at: 7.4, len: 1.5, caption: 'booked a flight to avoid *one* conversation.', sub: 'for context:', top: 1660 }
const N1 = { at: 6.6, out: [9.0, 9.25], title: 'texts', body: 'still on for our *talk* tomorrow? :)', glyph: '♡', y: 330 }
const N2 = { at: 17.8, out: [20.3, 20.55], title: 'texts', body: 'obviously. *window or aisle?*', glyph: '♡', y: 330 }
const BACK = 15.3
const SUIT = { x: 720, y: 1430 }
const F = saFilm({
  id: 'kpsae09', sign: 'sagittarius', dur: D, ending: 'cut',
  hook: 'SAGITTARIUS.|Unpack. *We’re* talking.', hookY: 210, hookSize: 88, hookOut: 2.4,
  arrive: { kind: 'spin', at: -0.5, x: 680, y: 640, size: 390 },
  freezes: [{ at: REC.at, len: REC.len }],
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 13.1, cam: [1.14, 400, 1060] },
    { at: 15.2, cam: [1, 540, 960] },
    { at: 23.8, cam: [1.1, 480, 1060] },
  ],
  says: [
    { t0: 2.5, t1: 4.2, who: 'saturn', text: "SAGITTARIUS. It's *2 a.m.*", x: 540, y: 185 },
    { t0: 4.4, t1: 6.4, who: 'sagittarius', text: 'spontaneous *trip!* totally random!', x: 420, y: 1700, tailUp: true, tail: -60 },
    { t0: 9.1, t1: 11.2, who: 'saturn', text: "commitment doesn't cancel *adventure.*", x: 540, y: 185 },
    { t0: 11.4, t1: 13.0, who: 'saturn', text: 'it *brings someone.*', x: 540, y: 185, size: 52 },
    { t0: 13.2, t1: 15.0, who: 'sagittarius', text: '…wait. I can *bring* them?', x: 420, y: 1700, tailUp: true, tail: -60 },
    { t0: 15.4, t1: 17.6, who: 'sagittarius', text: 'hey. can we talk *now?* come with me?', x: 440, y: 1700, tailUp: true, tail: -60 },
    { t0: 18.4, t1: 20.4, who: 'pisces', text: 'a *couples* trip!!', x: 720, y: 1500, tail: 180 },
    { t0: 20.6, t1: 23.6, who: 'saturn', text: "adventure's better *shared.*", x: 540, y: 185 },
    { t0: 23.9, who: 'sagittarius', text: 'Window seat. *Two* tickets.', x: 440, y: 1700, tailUp: true, tail: -60, size: 50 },
  ],
  fx: [{ f: HK.notification, c: HK.notificationCues, o: N1 }, { f: HK.notification, c: HK.notificationCues, o: N2 }, { f: HK.recordScratch, c: HK.recordScratchCues, o: REC }],
  paint(x, t, K) {
    K.room(x, t, { wall: '#26204a', wall2: '#120e28', floor: '#2a2040', floorY: 1500, warm: 0.2 })
    // the clock: 2:00 AM
    K.box(x, 140, 560, 220, 90, '#0a0818', { o: 6 }); K.txt(x, '2:00 AM', 250, 607, { size: 40, color: '#ff5c8e' })
    // the bed
    K.box(x, 20, 1300, 520, 160, '#5a4a8a'); K.box(x, 20, 1250, 140, 80, '#efe6d6'); K.box(x, 160, 1280, 380, 40, '#7a6ab0')
    // clothes: mid-air at frame 0 (thrown into the case), back into the drawer at BACK
    const R = rng(17), COLS = ['#ff8fb1', '#7fe3ff', '#f2c75c', '#7dffb0', '#c9a6ff', '#ff7a3a']
    for (let i = 0; i < 12; i++) {
      const sx = 120 + R() * 300, sy = 900 + R() * 300, ex = SUIT.x - 100 + R() * 200, ey = SUIT.y - 40 + R() * 30, ph = R() * 0.3, rot = R() * 6, c = COLS[i % 6]
      let X, Y, a
      if (t < BACK) { const p = clamp((t + 0.7 - ph) / 1.0); a = 1; X = lerp(sx, ex, p); Y = lerp(sy, ey, p) - Math.sin(Math.PI * p) * 300; if (p >= 1) continue }
      else { const p = clamp((t - BACK - ph) / 0.8); X = lerp(ex, 960, p); Y = lerp(ey, 1100, p) - Math.sin(Math.PI * p) * 360; a = 1 - prog(p, 0.85, 1); if (p >= 1) continue }
      x.save(); x.globalAlpha *= a; x.translate(X, Y); x.rotate(rot + t * 4); K.box(x, -34, -22, 68, 44, c, { o: 4 }); x.restore()
    }
    // the dresser the clothes go back into
    K.box(x, 880, 1080, 180, 420, '#6a4a3a'); for (let j = 0; j < 3; j++) K.box(x, 900, 1110 + j * 130, 140, 100, '#8a6a4a', { o: 3 })
    // the suitcase (open until BACK, then zipped shut and stood aside)
    const packed = t < BACK + 0.4
    K.box(x, SUIT.x - 170, SUIT.y - 60, 340, 120, '#c8243a', { o: 6 })
    if (packed) { K.box(x, SUIT.x - 170, SUIT.y - 230, 340, 170, '#a01c30', { o: 6 }); K.rect(x, SUIT.x - 150, SUIT.y - 210, 300, 130, '#7a1424'); K.rect(x, SUIT.x - 150, SUIT.y - 66, 300, 30, '#ff8fb1') }
    else K.box(x, SUIT.x - 170, SUIT.y - 90, 340, 34, '#a01c30', { o: 6 })
    K.box(x, SUIT.x - 40, SUIT.y + 60, 80, 20, K.INK, { o: 2 })
    // Sagittarius: mid-leap over the bed at frame 0
    const leap = prog(t, -0.4, 0.7)
    const sx = leap < 1 ? lerp(140, 330, ease.outCubic(leap)) : 330, sy = leap < 1 ? 1180 - Math.sin(Math.PI * leap) * 380 : 1180
    const gMood = t < 2.4 ? 'wide' : t < 6.5 ? 'happy' : t < 9 ? 'wide' : t < 13.1 ? 'squint' : t < 15.2 ? 'wide' : t < 18 ? 'neutral' : 'happy'
    K.sign(x, t, 'sagittarius', { x: sx, y: sy, s: 300, mood: gMood, rot: leap < 1 ? -0.4 * Math.sin(Math.PI * leap) : 0, squash: leap < 1 ? -0.12 : 0, look: [1, -0.4], sweat: t > 6.6 && t < 9.1 })
    // Saturn + the ring-belt round the suitcase (zipping at frame 0)
    const P = K.pose(t), sr = P.size / 2
    const back = ease.inOutCubic(prog(t, 2.0, 2.6))
    const zip = ease.outCubic(prog(t, -0.6, 0.4))
    const belt = Math.max(1 - back, ease.inOutCubic(prog(t, BACK, BACK + 0.4)) * (1 - ease.inOutCubic(prog(t, BACK + 1.2, BACK + 1.8))))
    const ringOn = belt <= 0.001
    const by = SUIT.y - (packed ? 60 : 30)
    const brx = lerp(1.85 * sr, lerp(420, 220, zip), belt), bry = lerp(0.42 * sr, lerp(160, 70, zip), belt)
    if (!ringOn) K.ring(x, lerp(P.x, SUIT.x, belt), lerp(P.y, by, belt), brx, bry, { half: 'back', w: 0.18, t, spin: 3 })
    const sMood = t < 2.4 ? 'angry' : t < 9 ? 'sly' : t < 13.1 ? 'neutral' : t < 18 ? 'happy' : 'proud'
    K.arriving(x, t, { mood: sMood, look: [-0.6, 0.8], rings: ringOn })
    if (!ringOn) K.ring(x, lerp(P.x, SUIT.x, belt), lerp(P.y, by, belt), brx, bry, { half: belt > 0.5 ? 'front' : 'both', rot: lerp(-0.32, 0, belt), w: 0.18, t, spin: 3 })
    K.intern(x, t, { x: 930, y: 1640, s: 190, pop: K.pop01(t, 1.6, 0.4), tears: t > 18.3 ? 3 : 2, mood: t > 18.3 ? 'wide' : 'sparkle' })
  },
  over(x, t, K) {
    // two boarding passes
    const k = K.pop01(t, 23.9, 0.35, 2.4)
    if (k <= 0.01) return
    for (const [dx, r] of [[-120, -0.08], [120, 0.08]]) {
      x.save(); x.translate(730 + dx * 0.8 * k, 1060 + dx * 0.4); x.rotate(r); x.scale(0.82 * k, 0.82 * k)
      K.box(x, -190, -100, 380, 200, '#fffaf0', { o: 6 }); K.rect(x, -190, -100, 380, 50, '#3a6ae0')
      K.txt(x, 'BOARDING PASS', 0, -74, { size: 22, color: '#fff' })
      K.txt(x, dx < 0 ? 'SEAT 14A' : 'SEAT 14B', -170, -10, { size: 30, align: 'left', color: K.INK })
      K.txt(x, dx < 0 ? 'WINDOW ★' : 'NEXT TO YOU ♡', -170, 40, { size: 24, align: 'left', color: '#c8243a' })
      x.restore()
    }
  },
  cues: [
    ...[0.0, 0.1, 0.2, 0.3].map(t => ['tick', t, 0.04]), ['whoosh', 0.05, 0.35, 0.05],
    ['whoosh', 2.0, 0.3, 0.04], ['pop', 2.6, 739.99, 0.05, 0],
    ['whoosh', BACK, 0.5, 0.05], ...[BACK + 0.2, BACK + 0.35, BACK + 0.5, BACK + 0.65].map(t => ['tick', t, 0.03]), ['pop', BACK + 0.4, 987.77, 0.05, 0],
    ['glitter', 18.4, 19.8], ['pop', 23.92, 1174.66, 0.05, -0.2], ['pop', 24.0, 1479.98, 0.05, 0.2],
  ],
  music: { style: 'synthwave', key: 'Bm', seed: 7109, sections: { lift: [BACK] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
