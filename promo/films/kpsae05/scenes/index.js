// kpsae05 · Planet Talk: Saturn · "Saturn Explains Reliable to Leo" (25 s vertical, hard cut) · funk · A
//   0      Saturn rolling in on its ring like a giant wheel, screeching to a stop on Leo's red carpet; the carpet
//          rippling, Leo mid-pose. "LEO. | Off the stage. *Sit.*"  · ~0.25 the screech-stop: flash, shake, whip zoom
//   2.45   ♄ "LEO. A word. *Now.*" · 3.2 the date (7:00 ✓): "on time! got your *usual.*"
//   5.2    ♌ "no flash mob? no *banner?*" · 7.4 record scratch + freeze: "Leo, mid-yawn at *good* love."
//   9.0    ♄ "that's called *reliable.* it's rare." · 11.6 the receipts: ON TIME ✓ · YOUR ORDER ✓ · "HOME SAFE" ✓
//   13.9   ♄ "sparkle fades. *showing up* stays." · 16.2 ♌ "wait… that's actually *romantic.*"
//   18.6   Pisces the intern, sobbing: "they texted home *safe!!*" · 20.8 ♄ "steady is a *love language.*"
//   22.9   ♌ "Showed up on time. *Iconic.*" · hard cut 25
import { saFilm, HK } from '../../kpsae01/sakit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 25
const REC = { at: 7.4, len: 1.5, caption: 'Leo, mid-yawn at *good* love.', sub: 'for the record:', top: 1660 }
const LIST = [['ON TIME', 11.6], ['REMEMBERED THE ORDER', 12.3], ['TEXTED "HOME SAFE"', 13.0]]
const F = saFilm({
  id: 'kpsae05', sign: 'leo', dur: D, ending: 'cut',
  hook: 'LEO.|Off the stage. *Sit.*', hookY: 210, hookSize: 96, hookOut: 2.4,
  arrive: { kind: 'slide', at: -0.5, x: 720, y: 640, size: 380 },
  freezes: [{ at: REC.at, len: REC.len }],
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 5.1, cam: [1.15, 440, 1100] },
    { at: 9.0, cam: [1, 540, 960] },
    { at: 16.1, cam: [1.14, 420, 1080] },
    { at: 18.5, cam: [1, 540, 960] },
    { at: 22.8, cam: [1.14, 420, 1080] },
  ],
  says: [
    { t0: 2.45, t1: 4.4, who: 'saturn', text: 'LEO. A word. *Now.*', x: 540, y: 185 },
    { t0: 3.2, t1: 5.0, who: 'THE DATE ♡', color: '#7fe3ff', text: 'on time! got your *usual.*', x: 700, y: 1660, tailUp: true, tail: 120 },
    { t0: 5.2, t1: 7.3, who: 'leo', text: 'no flash mob? no *banner?*', x: 420, y: 1660, tailUp: true, tail: -60 },
    { t0: 9.0, t1: 11.4, who: 'saturn', text: "that's called *reliable.* it's rare.", x: 540, y: 185 },
    { t0: 13.9, t1: 16.0, who: 'saturn', text: 'sparkle fades. *showing up* stays.', x: 540, y: 185 },
    { t0: 16.2, t1: 18.4, who: 'leo', text: "wait… that's actually *romantic.*", x: 420, y: 1660, tailUp: true, tail: -60 },
    { t0: 18.6, t1: 20.6, who: 'pisces', text: 'they texted home *safe!!*', x: 680, y: 1480, tail: 220 },
    { t0: 20.8, t1: 22.6, who: 'saturn', text: 'steady is a *love language.*', x: 540, y: 185 },
    { t0: 22.9, who: 'leo', text: 'Showed up on time. *Iconic.*', x: 440, y: 1660, tailUp: true, tail: -60, size: 50 },
  ],
  fx: [{ f: HK.recordScratch, c: HK.recordScratchCues, o: REC }],
  paint(x, t, K) {
    // the stage: spotlights + a red carpet
    K.drawSpace(x, t, { planet: 'sun', tint: '#ff7a3a', seed: 5, stars: 0.6 })
    for (const sx of [200, 880]) { const g = x.createLinearGradient(sx, 0, 540, 1500); g.addColorStop(0, 'rgba(255,236,180,0.28)'); g.addColorStop(1, 'rgba(255,236,180,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(sx - 40, 0); x.lineTo(sx + 40, 0); x.lineTo(820, 1500); x.lineTo(260, 1500); x.closePath(); x.fill() }
    x.fillStyle = '#2a1430'; x.fillRect(0, 1420, 1080, 500)
    // the red carpet, rippling from the screech-stop
    const rip = Math.exp(-Math.max(0, t - 0.25) * 2.5) * (t > -0.3 ? 1 : 0)
    x.fillStyle = '#140c28'; x.beginPath(); x.moveTo(300, 1400); for (let i = 0; i <= 20; i++) { const X = 300 + i * 24; x.lineTo(X, 1400 + 18 * rip * Math.sin(i * 0.9 - t * 18)) } x.lineTo(1080, 1920); x.lineTo(-120, 1920); x.closePath(); x.fill()
    x.fillStyle = '#c8243a'; x.beginPath(); x.moveTo(310, 1408); for (let i = 0; i <= 20; i++) { const X = 310 + i * 23; x.lineTo(X, 1408 + 18 * rip * Math.sin(i * 0.9 - t * 18)) } x.lineTo(1060, 1920); x.lineTo(-100, 1920); x.closePath(); x.fill()
    // skid marks
    if (t < 3) { x.save(); x.globalAlpha = 1 - prog(t, 2, 3); x.strokeStyle = '#140c28'; x.lineWidth = 12; x.beginPath(); x.moveTo(1080, 1440); x.lineTo(lerp(1080, 760, prog(t, -0.5, 0.25)), 1440); x.stroke(); x.restore() }
    // Leo mid-pose
    const lMood = t < 2.6 ? 'wide' : t < 5.1 ? 'neutral' : t < 9 ? 'sleepy' : t < 16.1 ? 'neutral' : t < 22.8 ? 'heart' : 'wink'
    K.sign(x, t, 'leo', { x: 320, y: 1220, s: 360, mood: lMood, rot: t < 1 ? -0.18 : 0, look: [1, -0.4], zzz: false })
    // the date, on time, with a small coffee
    const dk = K.pop01(t, 3.0, 0.4)
    if (dk > 0.01) {
      K.sign(x, t, 'scorpio', { x: 810, y: 1260, s: 260, pop: dk, mood: t < 16 ? 'happy' : 'sparkle', look: [-1, 0], glyph: false, seed: 9 })
      x.save(); x.translate(690, 1340); x.scale(dk, dk); K.box(x, -30, -40, 60, 80, '#fffaf0'); K.rect(x, -30, -10, 60, 20, '#b07a45'); x.restore()
      x.save(); x.translate(800, 1100); x.scale(dk, dk); K.box(x, -80, -26, 160, 52, '#7dffb0', { o: 4 }); K.txt(x, '7:00 ✓', 0, 2, { size: 26, color: K.INK }); x.restore()
    }
    // Saturn on its ring-wheel → the ring hops back on, Saturn floats up
    const P = K.pose(t), sr = P.size / 2
    const back = ease.inOutCubic(prog(t, 2.2, 2.9)), up = ease.inOutCubic(prog(t, 2.4, 3.4))
    const wr = 190, wheelY = P.y + sr + wr - 30
    const ringOn = back >= 1
    const sMood = t < 2.6 ? 'angry' : t < 9 ? 'sly' : t < 16 ? 'neutral' : t < 22.8 ? 'happy' : 'proud'
    if (!ringOn) K.ring(x, lerp(P.x, P.x, back), lerp(wheelY, P.y, back), lerp(wr, 1.85 * sr, back), lerp(wr, 0.42 * sr, back), { rot: lerp(0, -0.32, back), w: 0.22, t, spin: t < 0.3 ? 6 : 0.6 })
    if (t < 2.4) K.arriving(x, t, { mood: sMood, look: [-1, 0.5], rings: ringOn })
    else K.saturn(x, t, { x: lerp(P.x, 560, up), y: lerp(P.y, 560, up), size: 380, mood: sMood, look: [-0.5, 0.8], rings: true })
    K.intern(x, t, { x: 940, y: 1580, s: 190, pop: K.pop01(t, 1.5, 0.4), tears: t > 18.5 ? 3 : 2, mood: t > 18.5 ? 'wide' : 'sparkle' })
  },
  over(x, t, K) {
    // the receipts list
    const k = K.inOut(t, 11.5, 16.0)
    if (k <= 0.01) return
    x.save(); x.translate(540, 900); x.scale(k, k)
    K.box(x, -380, -170, 760, 340, 'rgba(14,8,32,0.94)', { o: 6 })
    LIST.forEach(([s, at], i) => {
      const p = K.pop01(t, at, 0.3)
      if (p <= 0.01) return
      x.save(); x.translate(-330, -100 + i * 100); x.scale(p, p)
      K.box(x, 0, -26, 52, 52, '#7dffb0', { o: 4 }); K.txt(x, '✓', 26, 2, { size: 36, color: K.INK }); K.txt(x, s, 80, 2, { size: 34, align: 'left', color: K.BONE })
      x.restore()
    })
    x.restore()
  },
  cues: [
    ['whoosh', -0.0, 0.3, 0.06], ...[0.02, 0.08, 0.14, 0.2].map(t => ['tick', t, 0.05]), ['crash', 0.26, 0.05],
    ['whoosh', 2.2, 0.3, 0.04], ['pop', 2.9, 659.25, 0.05, 0], ['pop', 3.05, 880, 0.04, 0], ['bell', 3.1, 1760, 0.03, 0.6, 0.3],
    ...LIST.map(([, at], i) => ['pop', at, [880, 1046.5, 1318.51][i], 0.05, 0]),
    ['glitter', 16.2, 17.4], ['glitter', 18.6, 19.8], ['bell', 23.0, 1318.51, 0.04, 1.0, 0],
  ],
  music: { style: 'funk', key: 'A', seed: 7105, sections: { lift: [16.2] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
