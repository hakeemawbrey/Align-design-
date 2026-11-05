// kpple02 · Planet Talk: Pluto · "Pluto to Taurus: The Mug You Kept" (27.4 s vertical, hard cut) · lofi · F
//   0      Pluto mid-burst out of a cardboard keepsake box like a jack-in-the-box, Taurus mid-flinch clutching the
//          ex's mug · "TAURUS. | Put the *mug* down." · 0.25 lands, shake + whip · 0.9 colour flash
//   2.9    "Kept *everything.*" the hoodie, the ticket stub, the mug pop out · 5.2 ♉ "it's not *sad.* it's *comfy.*"
//   7.9    ♇ "letting go isn't losing." · 10.5 "it's making *room.*" · 12.9 keep one kind memory · 15.8 the rest, slowly
//   18.9   the mug goes in the DONATE box · ♉ "…okay. *one* at a time." · 21.6 a little plant takes its spot
//   21.8   Pisces sobbing: "a *plant?!* I'm so proud" · 24.4 ♇ "small change. still *counts.*"
//   26.2   "Less stuff. | *More room.*" · hard cut at 27.4
import { plutoFilm } from '../../kpple01/plutokit.js'

const D = 27.4
const PL = 'pluto', TA = 'taurus', PI = 'pisces'
const MOVE = 18.9, PLANT = 21.6

function mug(x, K, X, Y, s = 1, rot = 0) {
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(s, s)
  x.strokeStyle = K.INK; x.lineWidth = 12; x.beginPath(); x.arc(42, 0, 26, -1.3, 1.3); x.stroke()
  x.strokeStyle = '#f7d7e2'; x.lineWidth = 6; x.beginPath(); x.arc(42, 0, 26, -1.3, 1.3); x.stroke()
  K.box(x, -42, -46, 84, 92, '#f7d7e2', { o: 5 })
  x.fillStyle = '#e8628a'; x.beginPath(); x.moveTo(0, 8); x.bezierCurveTo(-22, -10, -14, -30, 0, -18); x.bezierCurveTo(14, -30, 22, -10, 0, 8); x.fill()
  x.restore()
}
function plant(x, K, t, X, Y, k) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y); x.scale(k, k)
  K.box(x, -36, -10, 72, 56, '#c96a3a', { o: 5 })
  for (let i = 0; i < 4; i++) { x.save(); x.translate(0, -10); x.rotate(-0.8 + i * 0.53 + 0.06 * Math.sin(t * 2 + i)); K.box(x, -9, -78, 18, 70, '#3fae6a', { o: 3 }); x.restore() }
  x.restore()
}

const F = plutoFilm({
  id: 'kpple02', sign: TA, dur: D, ending: 'cut',
  hook: { text: 'TAURUS. | Put the *mug* down.', out: [2.5, 2.75] },
  enter: { kind: 'burst', at: -0.3, len: 0.55, x: 540, y: 760, size: 300 },
  flashes: [0.9],
  shots: [{ at: 7.8, z: 1.12, cx: 540, cy: 900, d: 1.2 }, { at: 12.8, z: 1.0, cx: 540, cy: 960, d: 0.6 }, { at: 15.7, z: 1.1, cx: 420, cy: 1100, d: 1.0 }, { at: 21.5, z: 1.0, cx: 540, cy: 960, d: 0.5 }],
  says: [
    { t0: 5.2, t1: 7.6, who: TA, text: "it's not *sad.* it's *comfy.*", x: 620, y: 1730, tailUp: true, tail: 180 },
    { t0: 7.9, t1: 10.2, who: PL, text: "letting go isn't losing.", x: 540, y: 470 },
    { t0: 10.5, t1: 12.6, who: PL, text: "it's making *room.*", x: 540, y: 470 },
    { t0: 12.9, t1: 15.5, who: PL, text: 'keep one kind memory, if you like.', x: 540, y: 470 },
    { t0: 15.8, t1: 18.6, who: PL, text: 'let the rest go *slowly.* your pace.', x: 540, y: 470 },
    { t0: 19.0, t1: 21.4, who: TA, text: '…okay. *one* at a time.', x: 620, y: 1730, tailUp: true, tail: 180 },
    { t0: 21.8, t1: 24.2, who: PI, text: "a *plant?!* I'm so proud", x: 460, y: 1760, tailUp: true, tail: 0 },
    { t0: 24.4, t1: 26.0, who: PL, text: 'small change. still *counts.*', x: 540, y: 470 },
  ],
  heads: [{ text: 'Kept *everything.*', at: 2.9, out: [4.9, 5.15], y: 330, size: 86 }],
  last: { text: 'Less stuff. | *More room.*', at: 26.2 },
  bg(x, t, K) {
    K.room(x, t, { wall: '#2c3a3a', wall2: '#16202a', floor: '#3a2f2a', floorY: 1480, warm: 0.5 })
    // a shelf with a gap where the mug used to live
    K.box(x, 120, 860, 300, 22, '#8a6a4a'); K.box(x, 150, 790, 50, 70, '#9fd8a8'); K.box(x, 340, 800, 50, 60, '#f2c75c')
  },
  paint(x, t, K) {
    // the keepsake box Pluto burst out of
    const lid = Math.min(1, K.prog(t, -0.3, 0.1))
    K.box(x, 380, 1000, 320, 200, '#c9a06a', { o: 6 }); K.rect(x, 380, 1000, 320, 20, '#b08850')
    x.save(); x.translate(380, 1000); x.rotate(-1.9 * lid); K.box(x, -8, -16, 170, 20, '#d8b07a', { o: 5 }); x.restore()
    x.save(); x.translate(700, 1000); x.rotate(1.9 * lid); K.box(x, -162, -16, 170, 20, '#d8b07a', { o: 5 }); x.restore()
    K.label(x, 'KEEPSAKES', 540, 1110, { size: 28, bg: '#efe6d6' })
    K.pluto(x, t, { mood: t < 7.7 ? 'wide' : t > 24.3 ? 'proud' : t > 21.6 ? 'happy' : 'neutral', look: t > 5 && t < 7.8 ? [1, 1] : undefined })
    // what's inside
    const items = [['HOODIE', 3.2, 250, 1000, -0.1], ['TICKET STUB', 3.6, 820, 940, 0.08], ['A SOCK??', 4.0, 300, 1250, 0.05]]
    for (const [s, at, X, Y, r] of items) if (t < 7.7) K.label(x, s, X, Y, { size: 26, bg: '#ffd8a8', rot: r, pop: K.inOut(t, at, 7.7) })
    // the donate box (from 15.8)
    if (t > 15.8) { const k = K.pop01(t, 15.8, 0.3); x.save(); x.translate(200, 1430); x.scale(k, k); K.box(x, -120, -110, 240, 150, '#b5915e', { o: 6 }); K.label(x, 'DONATE', 0, -40, { size: 26, bg: '#9fe6b0' }); x.restore() }
    // Taurus with the mug
    K.sign(x, t, TA, { x: 790, y: 1340, size: 300, mood: t < 2.8 ? 'wide' : t < 7.8 ? 'happy' : t < 18.8 ? 'neutral' : t < 21.5 ? 'squint' : 'sparkle', look: t > 7.8 && t < 18.8 ? [-1, -1] : undefined })
    if (t < MOVE) mug(x, K, 940, 1360, 1, -0.1 + (t < 1 ? 0.3 * Math.sin(t * 30) * (1 - t) : 0))
    else if (t < MOVE + 0.9) { const p = K.ease.inOutCubic(K.prog(t, MOVE, MOVE + 0.8)); mug(x, K, K.lerp(940, 200, p), K.lerp(1360, 1330, p) - Math.sin(p * Math.PI) * 260, 1, p * 6.28) }
    plant(x, K, t, 940, 1370, K.pop01(t, PLANT, 0.4, 2.6))
    if (t > PLANT + 0.1) K.pisces(x, t, { x: 470, y: 1460, size: 220, pop: K.pop01(t, PLANT + 0.15, 0.35), look: [1, -0.4] })
  },
  cues: [['pop', 3.2, 587.33, 0.03, -0.3], ['pop', 3.6, 698.46, 0.03, 0.3], ['pop', 4.0, 880, 0.03, 0], ['whoosh', MOVE, 0.7, 0.05], ['tom', MOVE + 0.8, 110, { gain: 0.18, decay: 0.2 }], ['glitter', PLANT, PLANT + 1], ['pop', 15.8, 523.25, 0.04, -0.3]],
  music: { style: 'lofi', key: 'F', seed: 10202, sections: { lift: [MOVE] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
