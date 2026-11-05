// kpple05 · Planet Talk: Pluto · "Pluto to Leo: The New Era Launch" (24.6 s vertical, hard cut) · funk · A
//   0      Pluto mid-rise behind the stage like an eclipse, a huge shadow over Leo mid-pose under a NEW ME banner ·
//          "LEO. | A new era? *Again?*" · 0.7 lands, shake + whip
//   2.9    countdown 3-2-1 GO! · confetti · 5.4 "Breakup → *era* number four."
//   7.6    ♇ "real change is quiet. *mostly.*" · 10.6 "they reclassified me as a *dwarf planet.*" · 13.7 no party
//   15.8   "still *counts.*" · 17.4 ♌ "…so no *launch?*" · 19.6 ♇ "*small* launch." (the spotlights shrink to one)
//   21.1   Pisces in the front row, sobbing with a glow stick: "it's *beautiful*" · 23.2 "New era. | *Soft* launch."
import { plutoFilm, HK } from '../../kpple01/plutokit.js'
import { drawPixelStar } from '../../sky.js'

const D = 24.6
const PL = 'pluto', LE = 'leo', PI = 'pisces'
const CD = { at: 2.9, from: 3, gap: 0.5, go: 'GO!', y: 900 }
const BOOM = 4.9, SOFT = 19.6
const CONF = Array.from({ length: 40 }, (_, i) => ({ x: (i * 137) % 1080, d: (i * 0.37) % 1.6, s: 14 + (i % 3) * 6, k: i % 4, c: ['#f2c75c', '#ff8fb1', '#7fe3ff', '#efe6d6'][i % 4] }))

const F = plutoFilm({
  id: 'kpple05', sign: LE, dur: D, ending: 'cut',
  hook: { text: 'LEO. | A new era? *Again?*', out: [2.5, 2.75] },
  enter: { kind: 'rise', at: -0.9, len: 1.6, x: 540, y: 740, size: 330, horizon: 1180 },
  shots: [{ at: 7.5, z: 1.12, cx: 540, cy: 820, d: 1.2 }, { at: 17.3, z: 1.0, cx: 540, cy: 960, d: 0.5 }],
  says: [
    { t0: 7.6, t1: 10.3, who: PL, text: 'real change is quiet. *mostly.*', x: 540, y: 380 },
    { t0: 10.6, t1: 13.5, who: PL, text: 'they reclassified me as a *dwarf planet.*', x: 540, y: 380 },
    { t0: 13.7, t1: 15.6, who: PL, text: "I didn't throw a party.", x: 540, y: 380 },
    { t0: 15.8, t1: 17.1, who: PL, text: 'still *counts.*', x: 540, y: 380 },
    { t0: 17.4, t1: 19.3, who: LE, text: '…so no *launch?*', x: 540, y: 1760, tailUp: true, tail: 0 },
    { t0: 19.6, t1: 21.0, who: PL, text: '*small* launch.', x: 540, y: 380 },
    { t0: 21.1, t1: 23.0, who: PI, text: "it's *beautiful*", x: 300, y: 1560, tailUp: false, tail: -120 },
  ],
  heads: [{ text: 'Breakup → *era* number four.', at: 5.4, out: [7.2, 7.45], y: 330, size: 78 }],
  last: { text: 'New era. | *Soft* launch.', at: 23.2 },
  fx: [{ f: HK.countdown, c: HK.countdownCues, o: CD }],
  bg(x, t, K) {
    K.space(x, t, { horizon: { y: 1180, color: '#2a1438' } })
  },
  paint(x, t, K) {
    K.pluto(x, t, { mood: t < 7.4 ? 'sly' : t > 15.7 && t < 17.2 ? 'proud' : t > 19.5 ? 'happy' : 'neutral', look: t > 17.3 && t < 19.4 ? [0, 1] : undefined })
    // the stage
    K.box(x, 60, 1440, 960, 70, '#7a2a3a', { o: 6 }); K.rect(x, 60, 1510, 960, 400, '#3a1426')
    // spotlights: three big beams, then one small soft one
    const soft = K.ease.inOutCubic(K.prog(t, SOFT, SOFT + 0.6))
    x.save(); x.globalCompositeOperation = 'lighter'
    for (const [sx, a] of [[120, 0.35], [540, 0], [960, -0.35]]) {
      const w = K.lerp(1, sx === 540 ? 0.35 : 0, soft); if (w <= 0.01) continue
      x.fillStyle = `rgba(255,224,150,${0.16 * w})`; x.beginPath(); x.moveTo(sx - 20, 1180); x.lineTo(sx + 20, 1180); x.lineTo(540 + 260 * w + a * 100, 1460); x.lineTo(540 - 260 * w + a * 100, 1460); x.closePath(); x.fill()
    }
    x.restore()
    // the banner
    const bw = K.lerp(1, 0.42, soft)
    K.rect(x, 140, 1100, 8, 340, '#4a3a4a'); K.rect(x, 932, 1100, 8, 340, '#4a3a4a')
    x.save(); x.translate(540, 1150); x.scale(bw, bw); K.box(x, -380, -50, 760, 100, '#f2c75c', { o: 6 }); K.txt(x, soft < 0.5 ? 'NEW ME · ERA 4' : 'new-ish me', 0, 2, { size: 54, font: K.INTER, weight: 900, color: K.INK }); x.restore()
    // Leo, posing
    const pose = t < 7 ? 0.06 * Math.sin(t * 6) : 0
    K.sign(x, t, LE, { x: 540, y: 1330, size: 320, mood: t < 2.7 ? 'wink' : t < 7.4 ? 'sparkle' : t < 17.3 ? 'wide' : t < 19.5 ? 'neutral' : 'happy', squash: pose, look: t > 7.4 && t < 17.3 ? [0, -1] : undefined })
    // confetti after the launch (gone by the soft launch)
    if (t > BOOM && t < SOFT) for (const c of CONF) { const tt = (t - BOOM - c.d * 0.2); if (tt < 0) continue; const Y = -40 + ((tt * 420 + c.d * 600) % 2000); x.save(); x.globalAlpha = 1 - K.prog(t, SOFT - 1, SOFT); drawPixelStar(x, c.x + Math.sin(tt * 3 + c.d) * 40, Y, c.s, c.k, c.c); x.restore() }
    // one tiny confetti pop for the soft launch
    if (t > SOFT + 0.6 && t < SOFT + 2) for (let i = 0; i < 6; i++) { const p = K.prog(t, SOFT + 0.6, SOFT + 2); x.save(); x.globalAlpha = 1 - p; drawPixelStar(x, 540 + Math.cos(i) * 140 * p, 1100 - Math.sin(i * 0.5 + 0.3) * 160 * p, 16, i % 3, '#f2c75c'); x.restore() }
    // the front row: silhouettes + Pisces with a glow stick
    for (let i = 0; i < 6; i++) { x.fillStyle = '#12081c'; x.beginPath(); x.arc(110 + i * 175, 1820, 90, Math.PI, 0); x.fill() }
    if (t > 16.5) {
      const k = K.pop01(t, 16.5, 0.35)
      x.save(); x.translate(250, 1700); x.rotate(0.3 + 0.25 * Math.sin(t * 4)); K.rrect(x, -10, -150, 20, 150, 8, '#9fffcf'); K.glow(x, 0, -80, 120, '#9fffcf', 0.4 * k); x.restore()
      K.pisces(x, t, { x: 180, y: 1760, size: 220, pop: k, look: [1, -1], shadow: false })
    }
  },
  cues: [['crash', BOOM, { gain: 0.06, len: 1.6 }], ['glitter', BOOM, BOOM + 1.2], ['boom', BOOM, 0.2], ['whoosh', SOFT, 0.5, 0.04], ['pop', SOFT + 0.6, 1318.51, 0.03, 0], ['glitter', 21.1, 22]],
  music: { style: 'funk', key: 'A', seed: 10505, sections: { drop: 4.9, breakdown: [7.6], lift: [17.4] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
