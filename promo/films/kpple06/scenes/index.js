// kpple06 · Planet Talk: Pluto · "Pluto to Virgo: Forty-Six Rows of Blame" (28.6 s vertical, loop) · lofi · D
//   0      Pluto mid-burst out of a spreadsheet cell, cells flying like confetti, Virgo mid-gasp at the laptop ·
//          "VIRGO. | Close the *spreadsheet.*" · 0.25 lands · 0.85 record scratch "46 rows. *Colour-coded.*"
//   2.9    the sheet WHAT I DID WRONG scrolls to row 46 · 6.2 ♍ "if I find the *mistake,* it won't happen again."
//   9.7    ♇ "you can learn from it" · 12.0 "without putting yourself on *trial.*" · 14.9 "pick *one* lesson…"
//   18.1   the rows delete one by one; one stays, green: "I need someone who shows up." · 20.7 ♍ "…*useful.*"
//   23.3   Pisces pops up behind the laptop, sobbing: "you're being *nice* to you!!" · 25.6 ♇ "growth. still *counts.*"
//   27.3   "One lesson. | *Zero* blame." · loops back into the frame-0 burst
import { plutoFilm } from '../../kpple01/plutokit.js'

const D = 28.6
const PL = 'pluto', VI = 'virgo', PI = 'pisces'
const ROWS = ['replied too fast', 'replied too slow', "said 'lol' twice", 'the yellow jumper', 'talked about my plants', 'too many questions', 'not enough questions', 'cried at the film']
const KEEP = 'I need someone who shows up'
const DEL = 18.1
const CELLS = Array.from({ length: 22 }, (_, i) => ({ a: i * 2.39, v: 380 + (i % 5) * 110, r: i * 0.9, c: ['#ff8a8a', '#ffd27a', '#efe6d6', '#9fe6b0'][i % 4] }))

const F = plutoFilm({
  id: 'kpple06', sign: VI, dur: D, ending: 'loop',
  hook: { text: 'VIRGO. | Close the *spreadsheet.*', out: [2.5, 2.75] },
  enter: { kind: 'burst', at: -0.3, len: 0.55, x: 540, y: 700, size: 290 },
  rec: { at: 0.85, len: 1.4, caption: '46 rows. *Colour-coded.*', sub: 'analysing the breakup' },
  shots: [{ at: 9.6, z: 1.1, cx: 540, cy: 860, d: 1.4 }, { at: 17.9, z: 1, cx: 540, cy: 960, d: 0.5 }],
  says: [
    { t0: 6.2, t1: 9.4, who: VI, text: "if I find the *mistake,* it won't happen again.", x: 540, y: 1760, tailUp: true, tail: 0 },
    { t0: 9.7, t1: 11.8, who: PL, text: 'you can learn from it', x: 600, y: 560, tail: 220 },
    { t0: 12.0, t1: 14.6, who: PL, text: 'without putting yourself on *trial.*', x: 600, y: 560, tail: 220 },
    { t0: 14.9, t1: 17.9, who: PL, text: 'pick *one* lesson. then be kind to you.', x: 600, y: 560, tail: 220 },
    { t0: 20.7, t1: 23.0, who: VI, text: "…that one's actually *useful.*", x: 540, y: 1760, tailUp: true, tail: 0 },
    { t0: 23.3, t1: 25.4, who: PI, text: "you're being *nice* to you!!", x: 420, y: 1100, tail: -120 },
    { t0: 25.6, t1: 27.1, who: PL, text: 'growth. still *counts.*', x: 600, y: 560, tail: 220 },
  ],
  last: { text: 'One lesson. | *Zero* blame.', at: 27.3, y: 250 },
  bg(x, t, K) {
    K.room(x, t, { wall: '#22304a', wall2: '#121a2e', floor: '#2a2638', floorY: 1500, window: false })
    // the giant spreadsheet on the wall
    const X0 = 70, Y0 = 520, W = 940, RH = 70
    K.box(x, X0, Y0 - 90, W, 90 + RH * 8, '#f4f1ea', { o: 8 })
    K.rect(x, X0, Y0 - 90, W, 90, '#3a6a4a'); K.txt(x, 'WHAT I DID WRONG', X0 + 30, Y0 - 45, { size: 36, align: 'left', color: '#fff' })
    const scroll = Math.min(38, Math.max(0, (t - 2.9) * 11))
    ROWS.forEach((s, i) => {
      const y = Y0 + i * RH, n = Math.floor(i + 1 + scroll)
      const gone = K.prog(t, DEL + i * 0.25, DEL + i * 0.25 + 0.25)
      const keep = i === 3
      x.save(); x.globalAlpha = keep ? 1 : 1 - gone
      K.rect(x, X0, y, W, RH, i % 2 ? '#ece6da' : '#f8f5ef')
      K.rect(x, X0, y, 90, RH, '#d8d0c0'); K.txt(x, String(keep && t > DEL + 2 ? 1 : n), X0 + 45, y + RH / 2, { size: 26, color: '#6a6050' })
      const txt = keep && t > DEL + 1 ? KEEP : s
      K.txt(x, txt, X0 + 120, y + RH / 2, { size: 30, align: 'left', color: '#2a2030' })
      const c = keep && t > DEL + 1 ? '#7fe0a0' : ['#ff8a8a', '#ffd27a', '#ff8a8a', '#ffb07a'][i % 4]
      K.rect(x, X0 + W - 120, y + 12, 100, RH - 24, c)
      K.rect(x, X0, y + RH - 2, W, 2, '#cfc6b4')
      x.restore()
    })
    // the hole Pluto burst out of
    if (t < 2.6) { x.save(); x.globalAlpha = 1 - K.prog(t, 2.2, 2.6); x.fillStyle = '#05020e'; x.fillRect(470, 640, 140, 70); x.restore() }
  },
  paint(x, t, K) {
    // flying cells (frame 0: mid-explosion)
    for (const c of CELLS) {
      const tt = t + 0.3; if (tt > 2) continue
      const X = 540 + Math.cos(c.a) * c.v * tt, Y = 700 + Math.sin(c.a) * c.v * tt + 500 * tt * tt
      x.save(); x.globalAlpha = 1 - K.prog(tt, 1.2, 2); x.translate(X, Y); x.rotate(c.r + tt * 5); K.box(x, -40, -18, 80, 36, c.c, { o: 3 }); x.restore()
    }
    const gl = K.ease.inOutCubic(K.prog(t, 2.6, 3.3))
    K.pluto(x, t, { x: K.lerp(540, 850, gl), y: K.lerp(700, 860, gl), size: K.lerp(290, 250, gl), mood: t < 6 ? 'wide' : t > 25.5 ? 'proud' : t > 20.6 ? 'happy' : 'neutral', look: t > 6.1 && t < 9.5 ? [0, 1] : undefined })
    // the desk + laptop + Virgo
    K.box(x, 120, 1480, 840, 40, '#7a5a3a')
    if (t > 23.2) K.pisces(x, t, { x: 230, y: 1350, size: 210, pop: K.pop01(t, 23.2, 0.35), look: [1, -0.5] })
    K.sign(x, t, VI, { x: 600, y: 1340, size: 300, mood: t < 2.7 ? 'wide' : t < 9.6 ? 'squint' : t < 18 ? 'neutral' : t < 20.6 ? 'wide' : 'happy', look: t < 9.6 ? [0, -1] : undefined, sweat: t < 9.6 && t > 2.7 })
    x.save(); x.translate(820, 1440); K.box(x, -90, -110, 180, 110, '#3a3f5a', { o: 5 }); K.rect(x, -76, -98, 152, 86, '#bfe9ff'); K.box(x, -120, 0, 240, 24, '#5a5f7a', { o: 5 }); x.restore()
  },
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['pop', +(DEL + i * 0.25).toFixed(2), 523.25 - i * 30, 0.025, 0]),
    ['glitter', DEL + 1, DEL + 2], ['pop', DEL + 1, 1046.5, 0.04, 0], ['glitter', 23.3, 24.2],
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(2.9 + i * 0.32).toFixed(2), 0.03]),
  ],
  music: { style: 'lofi', key: 'D', seed: 10606, sections: { lift: [DEL] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
