// kdwe11 · Don't Watch This If You're a ___ · "Aries Waits for a Reply" (15 s vertical, loop) · chiptune · E
//   0      Aries headbutting the lens, motion lines; "ARIES. | Turn it off. *NOW.*" · scratch + freeze · whip out
//   1.5    push-ups on the floor: ♈ "i don't wait for *texts.*" · a game HUD: REPS · CHECKS · PATIENCE
//   2.0    every rep it checks the phone · 4.0 punch on the phone: "Delivered." · "Delivered. | *Not read.*"
//   7.0    faster reps, the PATIENCE bar nearly empty · "Every rep. | *A check.*"
//   9.2    notification: CRUSH ♡ "haha yes!" → Aries leaps, heart eyes
//   10.4   Pisces sobbing with joy: "i'm so *happy* for you!!" · 12.6 "Patience: | *still loading.*" · 14.55 loop to frame 0
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const AR = tag('aries'), PI = tag('pisces')
const YES = 9.2, PIS = 10.4
// rep phase: one push-up every 0.9 s from 2.0, faster from 7.0
const repT = t => t < 2 ? 0 : t < 7 ? (t - 2) / 0.9 : 5.56 + (t - 7) / 0.2
const reps = t => Math.floor(repT(Math.min(t, YES)))
const F = dwFilm({
  id: 'kdwe11', sign: 'aries', dur: 15, ending: 'loop',
  hook: 'ARIES.|Turn it off. *NOW.*', hookOut: 1.3, scratch: 'off? *it’s on.*',
  lens: { mood: 'squint', look: [0, 0] }, pull: { x: 470, y: 1300, s: 310 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 7.0, cam: [1.15, 560, 1180] },
    { at: PIS, cam: [1, 540, 1000] },
  ],
  shakes: [YES + 0.3],
  flashes: [YES + 0.3],
  heads: [
    { text: 'Delivered.|*Not read.*', at: 4.2, out: [6.5, 6.75], top: 1450, size: 96 },
    { text: 'Every rep.|*A check.*', at: 7.4, out: [9.0, 9.2], top: 460, size: 96 },
    { text: 'Patience:|*still loading.*', at: 12.6, out: [14.25, 14.5], top: 460, size: 100 },
  ],
  boxes: [
    { open: 1.45, close: 3.9, lines: [{ t: 1.6, speaker: AR, text: 'i don’t wait for *texts.*', color: '#ff9a7a' }] },
    { open: 10.55, close: 12.9, lines: [{ t: 10.7, speaker: PI, text: 'i’m so *happy* for you!!', color: '#9fd7ff' }] },
  ],
  pitch: { [AR]: 523.25, [PI]: 1046.5 },
  fx: [{ f: HK.notification, c: HK.notificationCues, o: { at: YES, out: [11.6, 11.85], title: 'messages', body: 'CRUSH ♡: haha *yes!*', glyph: '♈', y: 150 } }],
  paint(x, t, K) {
    K.room(x, t, { wall: '#3a1e1a', wall2: '#201010', floor: '#3a2622', window: true, frame: '#ff9a7a' })
    // a yoga mat + the phone on the floor
    K.box(x, 240, 1370, 480, 24, '#2fc79a', { o: 3 })
    K.box(x, 770, 1330, 100, 50, '#1a1236', { o: 4 }); K.rect(x, 776, 1336, 88, 38, t > YES ? '#ff8fb1' : '#3a2f5a')
    K.txt(x, t > YES ? 'haha yes!' : 'Delivered.', 820, 1356, { size: 12, color: t > YES ? '#1a1236' : '#bdb3d8' })
    if (t > PIS) K.pisces(x, t, { x: 830, y: 1080, s: 250, pop: K.pop01(t, PIS, 0.4), mood: 'sparkle', look: [-1, 0], tears: 3 })
    if (!K.hide) {
      const ph = repT(t) % 1, down = t > 2 && t < YES ? Math.sin(ph * Math.PI) : 0
      const leap = Math.sin(Math.PI * prog(t, YES + 0.25, YES + 0.85))
      const mood = t < 2 ? 'squint' : t < YES ? (down > 0.6 ? 'wide' : 'squint') : 'heart'
      K.star(x, t, 'aries', { x: 470, y: 1300 - leap * 260, s: 310, mood, look: down > 0.6 ? [1, 1] : [0, 0], squash: down * 0.28 - leap * 0.15, seed: 3, rot: leap * 0.4 })
      if (t > 7 && t < YES) for (let i = 0; i < 3; i++) { const p = (t * 1.6 + i / 3) % 1; K.rect(x, 380 + i * 90, 1120 + p * 120, 8, 14, '#9fd7ff') }
    }
  },
  over(x, t, K) {
    // the game HUD
    const k = K.pop01(t, 1.5, 0.3) * K.outK(t, [14.2, 14.45])
    if (k <= 0.01) return
    x.save(); x.globalAlpha = k
    x.translate(0, -1290); K.box(x, 60, 1560, 960, 120, 'rgba(18,10,40,0.92)', { o: 6 })
    K.txt(x, `REPS ${reps(t)}`, 100, 1600, { size: 30, align: 'left', color: '#7dffb0' })
    K.txt(x, `CHECKS ${reps(t)}`, 100, 1646, { size: 30, align: 'left', color: '#ff8fb1' })
    const pat = t < YES ? clamp(1 - repT(t) / 17, 0.03, 1) : clamp(0.03 + (t - YES) * 0.6, 0, 1)
    K.txt(x, 'PATIENCE', 470, 1600, { size: 24, align: 'left', color: '#efe6d6' })
    K.box(x, 470, 1622, 500, 34, '#2c2450', { o: 4 }); K.rect(x, 470, 1622, 500 * pat, 34, pat < 0.25 ? '#ff3b4e' : '#f2c75c')
    x.restore()
    // the phone, up close, while it says Delivered
    const pk = K.inOut(t, 3.9, 6.8)
    if (pk > 0.01) K.phone(x, t, { X: 600, Y: 790, w: 420, h: 560, pop: pk, rot: 0.05, title: 'CRUSH ♡', time: '6:02', bubbles: [{ side: 'R', text: 'tacos friday?', at: 4.0 }, { side: 'C', text: 'Delivered', color: 'rgba(0,0,0,0)', ink: '#bdb3d8', size: 22, at: 4.3 }], size: 30 })
  },
  cues: [
    ...Array.from({ length: 30 }, (_, i) => { let tt = i < 6 ? 2 + i * 0.9 + 0.45 : 7 + (i - 5.56) * 0.2 + 0.1; return tt < YES ? ['tick', +tt.toFixed(2), 0.03] : null }).filter(Boolean),
    ['whoosh', YES + 0.25, 0.4, 0.06], ['pop', YES + 0.5, 1318.51, 0.05, 0], ['glitter', YES + 0.3, YES + 1.3],
    ['pop', PIS + 0.03, 987.77, 0.05, 0.3],
  ],
  music: { style: 'chiptune', key: 'E', seed: 4111, sections: { drop: 1.42, lift: [YES + 0.3] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
