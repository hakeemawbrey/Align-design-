// kpple01 · Planet Talk: Pluto · "Pluto to Aries: Over It by Friday" (25 s vertical, hard cut) · chiptune · E
//   0      Pluto mid-crash through the gym ceiling, dust frozen mid-air, Aries mid-push-up with a stopwatch ·
//          "ARIES. | Drop the *stopwatch.*" · 0.4 lands: boom, shake, whip punch-in
//   2.7    game HUD "MOVING ON · ANY%": DELETE PHOTOS · NEW HAIRCUT · 40 PUSH-UPS · OVER IT? (stalls)
//   7.4    ♇ "letting go isn't a *race.*" · 10.4 "I take *248 years* to go round the Sun." · 13.6 "still *counts.*"
//   15.4   ♈ "…so I get till *Sunday?*" · 17.9 Pisces on the bench, sobbing: "it's OK to be *sad!!*"
//   20.3   Aries pockets the stopwatch · 21.0 ♇ "good." · 22.4 the stopwatch sneaks back out (beep, caught)
//   23.6   "No timer. | *(One small timer.)*" · hard cut at 25
import { plutoFilm, HK } from '../../kpple01/plutokit.js'

const D = 25
const SPLITS = [{ at: 3.4, name: 'DELETE PHOTOS' }, { at: 4.6, name: 'NEW HAIRCUT' }, { at: 5.8, name: '40 PUSH-UPS' }, { at: 7.0, name: 'OVER IT?', best: false }]
const HUD = { at: 2.7, out: [7.1, 7.4], title: 'MOVING ON · ANY%', splits: SPLITS, color: '#ff8a6a' }
const CAUGHT = { at: 22.6, x: 790, y: 1240, r: 90, out: [24.9, 25], label: 'ONE SMALL TIMER', arrow: 'bl', rec: false }
const PL = 'pluto', AR = 'aries', PI = 'pisces'
const DEBRIS = Array.from({ length: 16 }, (_, i) => ({ x: 330 + Math.sin(i * 7.3) * 260, vx: Math.sin(i * 3.1) * 260, vy: -200 - (i % 5) * 80, s: 18 + (i % 4) * 10, r: i * 0.7 }))

function stopwatch(x, K, t, X, Y, s = 1, beep = false) {
  x.save(); x.translate(X, Y); x.scale(s, s)
  K.rrect(x, -14, -78, 28, 22, 6, '#c9c2d8', K.INK, 5)
  x.fillStyle = K.INK; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI * 2); x.fill()
  x.fillStyle = beep && Math.floor(t * 8) % 2 ? '#ffd27a' : '#efe6d6'; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.fill()
  x.strokeStyle = K.INK; x.lineWidth = 7; x.lineCap = 'round'
  const a = t * 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a) * 42, -Math.cos(a) * 42); x.stroke()
  x.restore()
}

const F = plutoFilm({
  id: 'kpple01', sign: AR, dur: D, ending: 'cut',
  hook: { text: 'ARIES. | Drop the *stopwatch.*', out: [2.45, 2.7] },
  enter: { kind: 'crash', at: -0.8, len: 1.0, x: 330, y: 720, size: 300 },
  says: [
    { t0: 7.4, t1: 10.1, who: PL, text: "letting go isn't a *race.*", x: 520, y: 1010, tailUp: true, tail: -180 },
    { t0: 10.4, t1: 13.4, who: PL, text: 'I take *248 years* to go round the Sun.', x: 520, y: 1010, tailUp: true, tail: -180 },
    { t0: 13.6, t1: 15.1, who: PL, text: 'still *counts.*', x: 520, y: 1010, tailUp: true, tail: -180 },
    { t0: 15.4, t1: 17.6, who: AR, text: '…so I get till *Sunday?*', x: 600, y: 1720, tailUp: true, tail: 120 },
    { t0: 17.9, t1: 20.1, who: PI, text: "it's OK to be *sad!!*", x: 430, y: 1080, tail: -140 },
    { t0: 21.0, t1: 22.3, who: PL, text: '*good.*', x: 520, y: 1010, tailUp: true, tail: -180 },
  ],
  heads: [{ text: 'Day 1 of the *breakup.*', at: 1.2, out: [2.4, 2.6], y: 1700, size: 64 }],
  last: { text: 'No timer. | *(One small timer.)*', at: 23.6, y: 330, size: 88 },
  fx: [{ f: HK.gameHud, c: HK.gameHudCues, o: HUD }, { f: HK.caught, c: HK.caughtCues, o: CAUGHT }],
  bg(x, t, K) {
    K.room(x, t, { wall: '#3a1e3e', wall2: '#1c1030', floor: '#2c2238', floorY: 1500, window: false, warm: 0.4 })
    // weights rack + mirror
    K.box(x, 60, 980, 300, 30, '#6a5a7a'); for (let i = 0; i < 4; i++) K.box(x, 80 + i * 70, 900, 40, 80, '#2a2234')
    K.box(x, 760, 520, 260, 520, '#c7d9f0', { o: 8 }); K.rect(x, 790, 550, 40, 460, 'rgba(255,255,255,0.35)')
    // the mat
    K.box(x, 420, 1480, 560, 40, '#d4513d')
    // the ceiling hole Pluto came through
    if (t > K.LAND - 0.05) { x.fillStyle = '#05020e'; x.beginPath(); x.moveTo(200, -10); for (let i = 0; i <= 10; i++) x.lineTo(200 + i * 26, 60 + (i % 2 ? 30 : -10)); x.lineTo(460, -10); x.fill() }
  },
  paint(x, t, K) {
    // falling ceiling tiles (frame 0: frozen mid-air, then they tumble)
    for (const d of DEBRIS) {
      const tt = t + 0.5, X = d.x + d.vx * tt * 0.4, Y = 80 + d.vy * tt + 1400 * tt * tt
      if (Y > 1520) continue
      x.save(); x.translate(X, Y); x.rotate(d.r + tt * 4); K.box(x, -d.s / 2, -d.s / 2, d.s, d.s, '#cdbfae', { o: 3 }); x.restore()
    }
    K.pluto(x, t, { mood: t < 7.2 ? 'angry' : t > 13.5 && t < 15.2 ? 'proud' : t > 22.4 ? 'sly' : 'neutral', look: t > 15.3 && t < 17.7 ? [1, 1] : undefined })
    // Aries: push-ups (squash pumps) until 7, then sits up
    const push = t < 7.1 ? 0.12 * Math.sin(t * 9) : 0
    const mood = t < 2.6 ? 'wide' : t < 7.1 ? 'squint' : t < 15.2 ? 'wide' : t < 21 ? 'happy' : t < 22.4 ? 'neutral' : 'wink'
    K.sign(x, t, AR, { x: 720, y: 1340, size: 320, mood, squash: push, look: t < 7.1 ? [0, 1] : [-1, -1] })
    // the stopwatch: on the mat, pocketed at 20.3, sneaks back out at 22.4
    const out = t < 20.3 ? 1 : t < 22.4 ? 1 - K.ease.inCubic(K.prog(t, 20.3, 20.6)) : K.pop01(t, 22.4, 0.3, 2.4)
    if (out > 0.01) stopwatch(x, K, t, t < 20.3 ? 930 : 790, t < 20.3 ? 1420 : 1240, (t < 20.3 ? 0.8 : 0.75) * out, t > 22.4)
    // the speedrun props
    if (t > 3.3 && t < 7.2) { const k = K.inOut(t, 3.3, 4.5); K.label(x, '12 PHOTOS: GONE', 720, 1080, { size: 30, bg: '#ffb4a8', pop: k, rot: -0.06 }) }
    if (t > 4.5 && t < 7.2) { const k = K.inOut(t, 4.5, 5.7); K.label(x, 'NEW HAIR, NEW ME', 720, 1080, { size: 34, bg: '#9fe6b0', pop: k, rot: 0.05 }) }
    if (t > 5.7 && t < 7.3) { const k = K.inOut(t, 5.7, 7.2); K.label(x, 'REPS: 40', 720, 1080, { size: 36, bg: '#f2c75c', pop: k }) }
    // Pisces on the bench, sobbing
    if (t > 17.8) { K.box(x, 60, 1380, 300, 30, '#6a4a3a'); K.pisces(x, t, { x: 210, y: 1290, size: 230, pop: K.pop01(t, 17.85, 0.35), look: [1, -0.3] }) }
  },
  cues: [
    ['chip', 3.4, 659.25, 0.08, { gain: 0.03, wave: 'square', duty: 0.25 }], ['chip', 4.6, 783.99, 0.08, { gain: 0.03, wave: 'square', duty: 0.25 }],
    ['chip', 5.8, 987.77, 0.08, { gain: 0.03, wave: 'square', duty: 0.25 }], ['chip', 7.0, 196, 0.25, { gain: 0.04, wave: 'square', duty: 0.5 }],
    ['whoosh', 20.3, 0.25, 0.04], ['pop', 20.55, 392, 0.04, 0],
    ['chip', 22.45, 1567.98, 0.06, { gain: 0.035, wave: 'square', duty: 0.25 }], ['chip', 22.6, 1567.98, 0.06, { gain: 0.035, wave: 'square', duty: 0.25 }],
    ['glitter', 17.9, 19.0],
  ],
  music: { style: 'chiptune', key: 'E', seed: 10101, sections: { lift: [15.4] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
