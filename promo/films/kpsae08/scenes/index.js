// kpsae08 · Planet Talk: Saturn · "Saturn and Scorpio's Spare Key" (30 s vertical, loop) · screwed · Fm
//   0      Saturn's rings rising round Scorpio like a fortress wall; Saturn sliding in and bonking it: knock, knock.
//          "SCORPIO. | Knock knock. *It's Saturn.*"  · ~0.2 the landing: flash, shake, whip zoom
//   2.6    ♏ "who's there. *why.*" · 4.5 "likes them. keeps them *at arm's length.*" · notification "free this weekend? :)"
//   5.6    ♏ "…just in *case.*" · 7.4 ♄ "trust isn't a *leap.*" · 9.4 "it's small promises, *kept.*"
//   11.6   kept: called when they said ✓ · kept your secret ✓ · came back after the hard talk ✓
//   15.6   Scorpio lowers one ring: "…one ring. *for now.*" · 18.0 the spare key: ♄ "for when you're *ready.* no rush."
//   20.6   Pisces the intern, sobbing: "it's a *KEY!!*" · 22.6 ♏ sends "free saturday. *coffee?*" · 24.8 "yes!! :)"
//   27.0   ♄ "Small promises. *Kept.* That's trust." · 29.55 eases back into the frame-0 wall (loop)
import { saFilm, HK } from '../../kpsae01/sakit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 30
const N1 = { at: 4.9, out: [7.1, 7.35], title: 'texts', body: 'free this weekend? :)', glyph: '♡', y: 120 }
const N2 = { at: 24.8, out: [26.7, 26.95], title: 'texts', body: 'yes!! *saturday* :)', glyph: '♡', y: 330 }
const KEPT = [['called when they said', 11.6], ['kept your secret', 12.4], ['came back after the hard talk', 13.2]]
const WALL = { x: 420, y: 1330 }
const KEY = 18.0
const F = saFilm({
  id: 'kpsae08', sign: 'scorpio', dur: D, ending: 'loop',
  hook: 'SCORPIO.|Knock knock. *It’s Saturn.*', hookY: 210, hookSize: 88, hookOut: 2.4,
  arrive: { kind: 'slide', at: -0.55, x: 800, y: 800, size: 400 },
  shakes: [0.45, 0.8],
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 15.5, cam: [1.12, 470, 1060] },
    { at: 20.5, cam: [1, 540, 960] },
  ],
  says: [
    { t0: 2.6, t1: 4.3, who: 'scorpio', text: "who's there. *why.*", x: 420, y: 1720, tailUp: true, tail: 0 },
    { t0: 5.6, t1: 7.2, who: 'scorpio', text: '…just in *case.*', x: 420, y: 1720, tailUp: true, tail: 0 },
    { t0: 7.4, t1: 9.2, who: 'saturn', text: "trust isn't a *leap.*", x: 540, y: 185 },
    { t0: 9.4, t1: 11.4, who: 'saturn', text: "it's small promises, *kept.*", x: 540, y: 185 },
    { t0: 15.8, t1: 17.8, who: 'scorpio', text: '…one ring. *for now.*', x: 420, y: 1720, tailUp: true, tail: 0 },
    { t0: 18.2, t1: 20.4, who: 'saturn', text: "for when you're *ready.* no rush.", x: 540, y: 185 },
    { t0: 20.6, t1: 22.4, who: 'pisces', text: "it's a *KEY!!*", x: 760, y: 1480, tail: 160 },
    { t0: 22.6, t1: 24.6, who: 'scorpio', text: 'sending: "free saturday. *coffee?*"', x: 440, y: 1720, tailUp: true, tail: 0 },
    { t0: 27.0, t1: 29.45, who: 'saturn', text: 'Small promises. *Kept.* That’s trust.', x: 540, y: 185, size: 48 },
  ],
  heads: [{ text: 'likes them. keeps them|*at arm’s length.*', at: 4.5, out: [7.0, 7.25], top: 380, size: 70 }],
  fx: [{ f: HK.notification, c: HK.notificationCues, o: N1 }, { f: HK.notification, c: HK.notificationCues, o: N2 }],
  paint(x, t, K) {
    K.drawSpace(x, t, { planet: 'pluto', tint: '#8a2a6a', seed: 8, horizon: { y: 1560, color: '#1e1030' } })
    // the wall: three of Saturn's rings stacked round Scorpio, rising at frame 0; the top one comes down at 15.6
    const rise = k => ease.outBack ? ease.outCubic(prog(t, -0.5 + k * 0.12, -0.05 + k * 0.12)) : 1
    const lower = ease.inOutCubic(prog(t, 15.6, 16.4))
    const knock = Math.max(...[0.45, 0.8].map(s => { const d = t - s; return d > 0 && d < 0.4 ? Math.exp(-d * 10) : 0 }))
    const rings = [0, 1, 2].map(k => {
      const top = k === 2 ? lower : 0
      const y = WALL.y + 170 - k * 95 * rise(k) + top * 190
      return { y, a: (k === 2 ? 1 - 0.8 * top : 1) * clamp(rise(k) * 3), dx: Math.sin(t * 50) * 10 * knock }
    })
    for (const r of rings) K.ring(x, WALL.x + r.dx, r.y, 270, 72, { half: 'back', w: 0.14, alpha: r.a, t })
    const sMood0 = t < 2.4 ? 'squint' : t < 7.3 ? 'neutral' : t < 15.6 ? 'squint' : t < 20.5 ? 'wide' : 'happy'
    K.sign(x, t, 'scorpio', { x: WALL.x, y: WALL.y - 110 + 60 * lower, s: 300, mood: sMood0, look: t < 7.3 ? [1, -0.3] : [0.6, -1] })
    for (const r of rings) K.ring(x, WALL.x + r.dx, r.y, 270, 72, { half: 'front', w: 0.14, alpha: r.a, t })
    // Saturn (rings off: they're the wall)
    const bonk = Math.max(...[0.45, 0.8].map(s => { const d = t - s; return d > -0.12 && d < 0.25 ? Math.sin(Math.PI * clamp((d + 0.12) / 0.37)) : 0 }))
    const sMood = t < 2.4 ? 'neutral' : t < 7.3 ? 'sad' : t < 15.6 ? 'neutral' : t < 20.5 ? 'happy' : 'proud'
    x.save(); x.translate(-60 * bonk, 0)
    K.arriving(x, t, { mood: sMood, look: [-1, 0.6], rings: false, squash: 0.08 * bonk })
    x.restore()
    // the spare key: from Saturn to Scorpio
    const kp = ease.inOutCubic(prog(t, KEY, KEY + 0.7))
    if (t > KEY - 0.2) {
      const X = lerp(760, WALL.x + 150, kp), Y = lerp(900, WALL.y + 10, kp) - Math.sin(Math.PI * kp) * 160
      x.save(); x.translate(X, Y); x.rotate(-0.5 + kp * 0.4 + 0.05 * Math.sin(t * 4)); x.scale(1.2, 1.2)
      x.strokeStyle = K.INK; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, 26, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.moveTo(26, 0); x.lineTo(110, 0); x.stroke()
      x.strokeStyle = K.GOLD; x.lineWidth = 12; x.beginPath(); x.arc(0, 0, 26, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.moveTo(26, 0); x.lineTo(110, 0); x.moveTo(86, 0); x.lineTo(86, 22); x.moveTo(104, 0); x.lineTo(104, 18); x.stroke()
      x.restore()
    }
    K.intern(x, t, { x: 920, y: 1600, s: 200, pop: K.pop01(t, 1.6, 0.4), tears: t > 20.5 ? 3 : 2, mood: t > 20.5 ? 'wide' : 'sparkle' })
  },
  over(x, t, K) {
    const k = K.inOut(t, 11.5, 15.4)
    if (k <= 0.01) return
    x.save(); x.translate(540, 960); x.scale(k, k)
    K.box(x, -440, -180, 880, 360, 'rgba(14,8,32,0.94)', { o: 6 })
    K.txt(x, 'PROMISES KEPT', 0, -136, { size: 26, color: K.GOLD })
    KEPT.forEach(([s, at], i) => {
      const p = K.pop01(t, at, 0.3)
      if (p <= 0.01) return
      x.save(); x.translate(-390, -66 + i * 90); x.scale(p, p)
      K.box(x, 0, -26, 52, 52, '#7dffb0', { o: 4 }); K.txt(x, '✓', 26, 2, { size: 36, color: K.INK }); K.txt(x, s, 80, 2, { size: 32, align: 'left', color: K.BONE })
      x.restore()
    })
    x.restore()
  },
  cues: [
    ['tom', 0.45, 110, { gain: 0.3 }], ['tom', 0.8, 110, { gain: 0.3 }],
    ...KEPT.map(([, at], i) => ['pop', at, [698.46, 830.61, 1046.5][i], 0.05, 0]),
    ['whoosh', 15.6, 0.4, 0.04], ['boom', 16.4, 0.04],
    ['whoosh', KEY, 0.5, 0.04], ['bell', KEY + 0.7, 1396.91, 0.045, 1.4, 0], ['glitter', 20.6, 22.0],
  ],
  music: { style: 'screwed', key: 'Fm', seed: 7108, sections: { lift: [18.0] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
