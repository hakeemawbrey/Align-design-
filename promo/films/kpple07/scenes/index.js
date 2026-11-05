// kpple07 · Planet Talk: Pluto · "Pluto to Libra: Keeping Everyone After" (24 s vertical, hard cut) · cinematic · Eb
//   0      Pluto mid-drop onto Libra's giant scales, Libra mid-juggle of four phones · "LIBRA. | You can't keep
//          *everyone.*" · 0.5 lands in the left pan: the scales slam over, shake + whip
//   2.9    the phones orbit: THE EX · EX'S COUSIN · EX'S FLATMATE · EX'S DOG · 5.4 the calendar: all of them, all week
//   7.8    ♎ "it's *fine!* everyone's still *friends!*" · 10.7 ♇ "some endings are allowed to be *endings.*"
//   14.0   ♇ "you don't owe everyone a *forever.*" · 16.9 the phones drift down one by one… except the dog
//   18.4   the dog trots in · ♎ "…the dog stays, *though.*" · 20.6 ♇ "the dog stays. still *counts.*"
//   20.4   Pisces hugging the dog, sobbing · 22.6 "Endings allowed. | *Dog* excepted." · hard cut at 24
import { plutoFilm } from '../../kpple01/plutokit.js'

const D = 24
const PL = 'pluto', LI = 'libra', PI = 'pisces'
const PIV = [540, 760], ARM = 270, LAND = 0.5, DROP = 16.9, DOG = 18.2
const PH = ['THE EX', "EX'S COUSIN", "EX'S FLATMATE", "EX'S DOG"]
const tilt = (t, K) => t < LAND ? -0.22 : 0.3 - 0.52 * Math.exp(-(t - LAND) * 5) * Math.cos((t - LAND) * 14)
const ends = th => [[PIV[0] - ARM * Math.cos(th), PIV[1] + ARM * Math.sin(th)], [PIV[0] + ARM * Math.cos(th), PIV[1] - ARM * Math.sin(th)]]

function dog(x, K, t, X, Y, s = 1) {
  x.save(); x.translate(X, Y); x.scale(s, s)
  const w = Math.sin(t * 14) * 0.4
  x.save(); x.translate(70, -50); x.rotate(-0.6 + w); K.box(x, -6, -50, 12, 50, '#c98a4a', { o: 3 }); x.restore()
  K.box(x, -80, -70, 160, 70, '#e0a060', { o: 5 })
  for (const lx of [-70, -30, 30, 60]) K.box(x, lx, 0, 18, 30 + (Math.sin(t * 12 + lx) > 0 ? 4 : 0), '#c98a4a', { o: 3 })
  K.box(x, -140, -120, 80, 70, '#e0a060', { o: 5 }); K.box(x, -150, -128, 24, 40, '#8a5a2a', { o: 3 })
  K.rect(x, -125, -100, 10, 10, K.INK); K.rect(x, -150, -78, 14, 10, K.INK)
  x.restore()
}

const F = plutoFilm({
  id: 'kpple07', sign: LI, dur: D, ending: 'cut',
  hook: { text: 'LIBRA. | You can’t keep *everyone.*', out: [2.5, 2.75] },
  enter: { kind: 'drop', at: -0.5, len: 1.0, x: ends(0.3)[0][0], y: ends(0.3)[0][1] + 20, size: 230 },
  shots: [{ at: 10.6, z: 1.1, cx: 470, cy: 900, d: 1.3 }, { at: 16.8, z: 1, cx: 540, cy: 960, d: 0.5 }],
  says: [
    { t0: 7.8, t1: 10.4, who: LI, text: "it's *fine!* everyone's still *friends!*", x: 540, y: 1790, tailUp: true, tail: 160 },
    { t0: 10.7, t1: 13.8, who: PL, text: 'some endings are allowed to be *endings.*', x: 540, y: 470, tail: -200 },
    { t0: 14.0, t1: 16.7, who: PL, text: "you don't owe everyone a *forever.*", x: 540, y: 470, tail: -200 },
    { t0: 18.4, t1: 20.4, who: LI, text: '…the dog stays, *though.*', x: 540, y: 1790, tailUp: true, tail: 160 },
    { t0: 20.6, t1: 22.3, who: PL, text: 'the dog stays. still *counts.*', x: 540, y: 470, tail: -200 },
  ],
  heads: [{ text: 'Staying friends with | *all* of them.', at: 2.9, out: [5.2, 5.45], y: 300, size: 76 }],
  last: { text: 'Endings allowed. | *Dog* excepted.', at: 22.6, y: 300 },
  bg(x, t, K) {
    K.space(x, t, { tint: '#d9a6ff' })
    K.box(x, 0, 1600, 1080, 320, '#2a1d40', { o: 0 }); K.rect(x, 0, 1596, 1080, 6, 'rgba(255,255,255,0.1)')
  },
  paint(x, t, K) {
    // the scales: pole, beam, chains, pans
    const th = tilt(t, K), [L, Rr] = ends(th)
    K.box(x, 528, PIV[1], 24, 820, '#c9a650'); K.box(x, 440, 1560, 200, 40, '#c9a650')
    x.save(); x.translate(PIV[0], PIV[1]); x.rotate(-th); K.box(x, -ARM - 10, -10, 2 * ARM + 20, 20, '#f2c75c'); x.restore()
    for (const [ex, ey] of [L, Rr]) {
      x.strokeStyle = '#c9a650'; x.lineWidth = 4; x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex - 90, ey + 130); x.moveTo(ex, ey); x.lineTo(ex + 90, ey + 130); x.stroke()
      x.fillStyle = K.INK; x.beginPath(); x.ellipse(ex, ey + 135, 110, 26, 0, 0, Math.PI); x.fill()
      x.fillStyle = '#f2c75c'; x.beginPath(); x.ellipse(ex, ey + 130, 100, 20, 0, 0, Math.PI); x.fill()
    }
    // Pluto sits in the left pan after landing
    const P = t < LAND ? {} : { x: L[0], y: L[1] + 20 }
    K.pluto(x, t, { ...P, mood: t < 7.6 ? 'sly' : t > 20.5 ? 'happy' : 'neutral', look: t > 7.7 && t < 10.5 ? [1, 1] : undefined })
    // Libra, juggling
    const jug = t < DROP
    K.sign(x, t, LI, { x: 760, y: 1440, size: 280, mood: t < 2.7 ? 'wide' : t < 10.6 ? 'happy' : t < 16.8 ? 'neutral' : t < 18.3 ? 'wide' : 'sparkle', squash: jug ? 0.05 * Math.sin(t * 8) : 0, look: jug ? [0, -1] : [-1, 0] })
    PH.forEach((s, i) => {
      if (i === 3 && t > DOG) return
      const a = t * 3.2 + i * Math.PI / 2
      let X = 760 + Math.cos(a) * 200, Y = 1180 + Math.sin(a) * 70
      const dp = K.prog(t, DROP + i * 0.3, DROP + i * 0.3 + 0.7)
      if (i < 3 && dp > 0) { Y += 900 * K.ease.inQuad(dp); X += (i - 1) * 80 * dp }
      if (Y > 1900) return
      x.save(); x.translate(X, Y); x.rotate(Math.sin(a) * 0.3); K.rrect(x, -40, -66, 80, 132, 14, K.INK); K.rrect(x, -32, -58, 64, 116, 9, i === 3 ? '#ffd8a8' : '#bfe9ff'); x.restore()
      if (dp < 0.3) K.label(x, s, X, Y - 96, { size: 20, bg: '#efe6d6', pop: K.pop01(t, 2.9 + i * 0.25, 0.3) })
    })
    // the dog + Pisces
    if (t > DOG) { const p = K.ease.outCubic(K.prog(t, DOG, DOG + 0.8)); dog(x, K, t, K.lerp(-200, 420, p), 1560, 1) }
    if (t > 20.3) K.pisces(x, t, { x: 230, y: 1440, size: 210, pop: K.pop01(t, 20.3, 0.35), look: [1, 0.4] })
  },
  over(x, t, K) {
    if (t > 5.4 && t < 7.7) {
      const k = K.inOut(t, 5.4, 7.7)
      x.save(); x.translate(300, 1200); x.rotate(-0.05); x.scale(k, k)
      K.box(x, -230, -170, 460, 340, '#f8f5ef', { o: 6 }); K.rect(x, -230, -170, 460, 60, '#c04a5a'); K.txt(x, 'THIS WEEK', 0, -140, { size: 30, color: '#fff' })
      ;['MON  brunch: the ex', "TUE  ex's cousin", "WED  ex's flatmate", 'THU  dog walk (ex)', 'FRI  …me?'].forEach((s, i) => K.txt(x, s, -200, -80 + i * 52, { size: 26, align: 'left', color: i === 4 ? '#c04a5a' : '#2a2030' }))
      x.restore()
    }
  },
  cues: [
    ['pop', 2.9, 659.25, 0.03, -0.3], ['pop', 3.15, 783.99, 0.03, 0.3], ['pop', 3.4, 880, 0.03, -0.3], ['pop', 3.65, 987.77, 0.03, 0.3], ['pop', 5.4, 523.25, 0.04, 0],
    ['whoosh', DROP, 0.5, 0.04], ['tom', DROP + 0.7, 120, { gain: 0.12, decay: 0.15 }], ['tom', DROP + 1.0, 110, { gain: 0.12, decay: 0.15 }], ['tom', DROP + 1.3, 100, { gain: 0.12, decay: 0.15 }],
    ['pop', DOG + 0.3, 1318.51, 0.035, -0.3], ['pop', DOG + 0.5, 1567.98, 0.03, -0.3], ['glitter', 20.3, 21.3],
  ],
  music: { style: 'cinematic', key: 'Eb', seed: 10707, sections: { lift: [DOG] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
