// kpple12 · Planet Talk: Pluto · "Pluto to Pisces: Let It Out" (29.2 s vertical, hard cut) · dreamy · E
//   0      Pluto mid-surface out of Pisces' puddle of tears like a submarine, a splash frozen mid-air, Pisces
//          mid-sob · "PISCES. | Let it *out.*" · 0.7 surfaces: boom, shake, whip · 1.1 colour flash
//   2.9    ♓ "sorry. sorry. I'm *crying* again." · 5.9 "it ended *weeks* ago, why am I still—"
//   9.1    ♇ "don't apologise." · 11.0 "crying is the *letting-go* part." · 13.9 "feel it. then let someone *sit* with you."
//   17.0   Pluto floats over and sits beside Pisces · Pisces cries properly · 19.6 the puddle becomes a little pond,
//          a lotus opens · 20.6 ♓ "…oh. that *helped.*" · 23.1 ♇ tearing up: "…ok. *I'm* crying too."
//   25.5   ♓ "does this count as *healing?*" · 27.8 "Cried it out. | *Still* counts." · hard cut at 29.2
import { plutoFilm } from '../../kpple01/plutokit.js'
import { drawPixelStar } from '../../sky.js'

const D = 29.2
const PL = 'pluto', PI = 'pisces'
const HZ = 1300, SIT = 17.0, POND = 19.6
const DROPS = Array.from({ length: 18 }, (_, i) => ({ a: -Math.PI / 2 + (i / 17 - 0.5) * 2.4, v: 500 + (i % 4) * 140 }))

function lotus(x, K, t, X, Y, k) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y); x.scale(k, k)
  x.fillStyle = '#3fae6a'; x.beginPath(); x.ellipse(0, 18, 110, 26, 0, 0, Math.PI * 2); x.fill()
  for (let i = -2; i <= 2; i++) { x.save(); x.rotate(i * 0.38 * k); x.fillStyle = K.INK; x.beginPath(); x.ellipse(0, -40, 30, 62, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = i % 2 ? '#ff9ac0' : '#ffc4d8'; x.beginPath(); x.ellipse(0, -40, 24, 56, 0, 0, Math.PI * 2); x.fill(); x.restore() }
  x.restore()
}

const F = plutoFilm({
  id: 'kpple12', sign: PI, dur: D, ending: 'cut',
  hook: { text: 'PISCES. | Let it *out.*', out: [2.5, 2.75] },
  enter: { kind: 'rise', at: -1.2, len: 1.6, x: 400, y: 1080, size: 260, horizon: HZ },
  flashes: [1.1],
  shots: [{ at: 8.9, z: 1.1, cx: 500, cy: 1100, d: 1.2 }, { at: 16.9, z: 1, cx: 540, cy: 960, d: 0.6 }, { at: 19.4, z: 1.12, cx: 600, cy: 1300, d: 1.2 }, { at: 23.0, z: 1, cx: 540, cy: 960, d: 0.6 }],
  says: [
    { t0: 2.9, t1: 5.6, who: PI, text: "sorry. sorry. I'm *crying* again.", x: 540, y: 1790, tailUp: true, tail: 220 },
    { t0: 5.9, t1: 8.7, who: PI, text: 'it ended *weeks* ago, why am I still—', x: 540, y: 1790, tailUp: true, tail: 220 },
    { t0: 9.1, t1: 10.8, who: PL, text: "don't apologise.", x: 440, y: 760, tail: -40 },
    { t0: 11.0, t1: 13.6, who: PL, text: 'crying is the *letting-go* part.', x: 440, y: 760, tail: -40 },
    { t0: 13.9, t1: 16.8, who: PL, text: 'feel it. then let someone *sit* with you.', x: 440, y: 760, tail: -40 },
    { t0: 20.6, t1: 22.8, who: PI, text: '…oh. that *helped.*', x: 540, y: 1790, tailUp: true, tail: 220 },
    { t0: 23.1, t1: 25.3, who: PL, text: "…ok. *I'm* crying too.", x: 540, y: 980, tail: 60 },
    { t0: 25.5, t1: 27.6, who: PI, text: 'does this count as *healing?*', x: 540, y: 1790, tailUp: true, tail: 220 },
  ],
  last: { text: 'Cried it out. | *Still* counts.', at: 27.8, y: 330 },
  bg(x, t, K) {
    K.room(x, t, { wall: '#2a2450', wall2: '#141030', floor: '#2a2440', floorY: HZ, window: true, warm: 0.3 })
    // the puddle of tears (it grows into a pond)
    const grow = K.ease.inOutCubic(K.prog(t, SIT + 1, POND + 0.6))
    x.save(); x.fillStyle = '#4f8ff0'; x.beginPath(); x.moveTo(-300, 2700); x.lineTo(-300, HZ + 80); x.lineTo(-20, HZ + 60); x.quadraticCurveTo(540, HZ - 70, 1100, HZ + 60); x.lineTo(1400, HZ + 80); x.lineTo(1400, 2700); x.closePath(); x.fill()
    x.strokeStyle = 'rgba(191,233,255,0.9)'; x.lineWidth = 6; x.beginPath(); x.moveTo(-20, HZ + 60); x.quadraticCurveTo(540, HZ - 70, 1100, HZ + 60); x.stroke()
    for (let i = 0; i < 7; i++) { const yy = HZ + 80 + i * 80, ph = t * 0.8 + i; K.rect(x, 100 + ((i * 210 + ph * 60) % 800), yy, 120 + 40 * Math.sin(ph), 6, 'rgba(255,255,255,0.18)') }
    if (grow > 0) { for (let i = 0; i < 8; i++) { x.save(); x.globalAlpha = grow * (0.5 + 0.5 * Math.sin(t * 3 + i)); drawPixelStar(x, 120 + i * 120, HZ + 140 + (i % 3) * 120, 18, i % 3, '#bfe9ff'); x.restore() } }
    x.restore()
  },
  paint(x, t, K) {
    // the frozen-then-falling splash around the surfacing point
    const tt = t + 0.25
    if (tt < 1.8) for (const d of DROPS) {
      const X = 400 + Math.cos(d.a) * d.v * tt, Y = HZ - 40 + Math.sin(d.a) * d.v * tt + 900 * tt * tt
      if (Y > HZ + 40) continue
      x.save(); x.fillStyle = K.INK; x.beginPath(); x.ellipse(X, Y, 16, 22, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8fe3ff'; x.beginPath(); x.ellipse(X, Y, 11, 17, 0, 0, Math.PI * 2); x.fill(); x.restore()
    }
    // Pluto: surfaces, then floats over and sits beside Pisces
    const sit = K.ease.inOutCubic(K.prog(t, SIT, SIT + 1.0))
    K.pluto(x, t, { x: K.lerp(400, 560, sit), y: K.lerp(1080, 1180, sit), size: K.lerp(260, 230, sit), mood: t < 8.9 ? 'sly' : t < 17 ? 'neutral' : t < 23 ? 'happy' : t < 25.4 ? 'cry' : 'happy', tears: t > 23 && t < 27.5 ? 2 : 0, look: t < 9 ? [1, 0.6] : [1, 0.3] })
    lotus(x, K, t, 300, HZ + 180, K.pop01(t, POND, 0.6, 2))
    // Pisces on the shore, crying (fountains)
    K.pisces(x, t, { x: 820, y: 1430, size: 280, mood: t < 2.7 ? 'wide' : t < 9 ? 'sparkle' : t < 17 ? 'wide' : t < 20.5 ? 'sparkle' : 'happy', tears: t > 20.5 && t < 25.3 ? 2 : 3, look: t < 17 ? [-1, -0.6] : [-1, -0.2], squash: t > SIT && t < POND ? 0.05 * Math.sin(t * 14) : 0 })
  },
  cues: [['whoosh', SIT, 0.8, 0.04], ['bell', POND, 659.25, 0.05, 2.5, 0], ['glitter', POND, POND + 1.4], ['pop', 23.1, 1318.51, 0.03, 0]],
  music: { style: 'dreamy', key: 'E', seed: 11212, sections: { breakdown: [9.1], lift: [POND] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
