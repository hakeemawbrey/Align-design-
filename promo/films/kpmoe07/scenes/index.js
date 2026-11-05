// kpmoe07 · Planet Talk: The Moon · to Libra · "Libra's Stuck Scales" (24 s vertical, loop) · cinematic · Eb
//   0      frame 0: the Moon mid-plummet onto giant scales, Libra mid-wobble below; pans "TELL THEM" / "STAY FRIENDS",
//          perfectly level; "LIBRA. | The scales are *stuck.*" · 0.6 glitch: "LIBRA.EXE is *deciding…*"
//   2.4    "Perfectly *balanced.* Perfectly stuck." · Libra: "if I tell them, I might lose the *friendship.*"
//   8.6    the Moon: "i move whole oceans every day. it's called the *tides.*" (true) · the tide rolls in and out
//  12.4    the Moon: "you can move *one sentence.*" · 15.2 countdown 3-2-1 SAY IT
//  17.3    Libra: "I like you." · an I LIKE YOU card slams onto TELL THEM, the beam tips · them: "*FINALLY.*" · Pisces sobs
//  20.8    "Fifty-fifty. | Then *one hundred.*" · 23.55 loop → frame 0
import { moonFilm, HK } from '../../kpmoe01/moonkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'

const SAY = 17.3, TIP = 17.6, DUR = 24
const PIV = { x: 540, y: 760 }, ARM = 330, HANG = 210
const GL = { at: 0.6, len: 0.9, text: 'LIBRA.EXE is *deciding…*', buttons: ['TELL', 'DON’T'] }
const COUNT = { at: 15.2, from: 3, gap: 0.5, go: 'SAY IT', y: 1000 }

const beamA = t => t < TIP ? Math.sin(t * 2.3) * 0.035 * (t > 0.2 ? 1 : 0.4) : -0.32 * easeOutBack(prog(t, TIP, TIP + 0.45), 2.2)
function scales(x, t, K) {
  const a = beamA(t)
  K.box(x, PIV.x - 16, PIV.y, 32, 640, '#c9a65a', { o: 6 }); K.box(x, PIV.x - 120, 1380, 240, 40, '#c9a65a', { o: 6 })
  const ends = [-1, 1].map(s => ({ x: PIV.x + Math.cos(a) * ARM * s, y: PIV.y + Math.sin(a) * ARM * s }))
  x.save(); x.translate(PIV.x, PIV.y); x.rotate(a); K.box(x, -ARM - 20, -14, ARM * 2 + 40, 28, '#f2c75c', { o: 6 }); x.restore()
  x.fillStyle = K.INK; x.beginPath(); x.arc(PIV.x, PIV.y, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f2c75c'; x.beginPath(); x.arc(PIV.x, PIV.y, 20, 0, Math.PI * 2); x.fill()
  const labels = ['TELL THEM', 'STAY FRIENDS']
  ends.forEach((e, i) => {
    const py = e.y + HANG
    x.strokeStyle = K.INK; x.lineWidth = 6; x.beginPath(); x.moveTo(e.x, e.y); x.lineTo(e.x - 110, py); x.moveTo(e.x, e.y); x.lineTo(e.x + 110, py); x.stroke()
    x.fillStyle = K.INK; x.beginPath(); x.ellipse(e.x, py, 140, 38, 0, 0, Math.PI); x.fill(); x.fillStyle = '#c9a65a'; x.beginPath(); x.ellipse(e.x, py, 130, 30, 0, 0, Math.PI); x.fill()
    K.label(x, labels[i], e.x, py - 30, { size: 30, bg: i ? '#cfe0ff' : '#ffd9dc' })
    if (i === 0 && t > SAY) {
      const k = ease.outBack(prog(t, SAY, TIP)), fall = lerp(-500, 0, ease.inQuad(prog(t, SAY, TIP)))
      K.label(x, 'I LIKE YOU', e.x, py - 90 + fall, { size: 38, bg: '#ff8fb1', rot: -0.06, pop: k })
    }
  })
}
function tide(x, t, K) {
  const k = K.inOut(t, 8.4, 12.6, 0.6)
  if (k <= 0.01) return
  const rise = Math.sin((t - 8.4) * 1.1) * 30
  for (let L = 0; L < 3; L++) {
    x.fillStyle = ['rgba(127,180,255,0.35)', 'rgba(127,200,255,0.45)', 'rgba(200,230,255,0.55)'][L]
    x.beginPath(); x.moveTo(-50, 1950)
    for (let X = -50; X <= 1130; X += 20) x.lineTo(X, 1920 - k * (190 - L * 50) + rise + Math.sin(X * 0.012 + t * (1.4 + L * 0.3) + L) * 18)
    x.lineTo(1130, 1950); x.closePath(); x.fill()
  }
}

const F = moonFilm({
  id: 'kpmoe07', sign: 'libra', dur: DUR, ending: 'loop',
  hook: { text: 'LIBRA. | The scales are *stuck.*', out: [2.2, 2.4] },
  enter: { kind: 'crash', at: -0.62, x: 560, y: 570, size: 300 },
  whip: false,
  shakes: [0.08, TIP],
  flashes: [TIP],
  moon: [
    { at: 0, mood: 'wide' },
    { at: 1.6, mood: 'sly' },
    { at: 8.5, mood: 'proud' },
    { at: 12.3, mood: 'happy' },
    { at: TIP, mood: 'love' },
  ],
  me: [
    { at: 0, x: 540, y: 1480, s: 260, mood: 'wide', look: [0, -1], rot: 0.12 },
    { at: 1.6, mood: 'squint', rot: 0, look: [-1, -0.6] },
    { at: 5.3, mood: 'sparkle', look: [0, -0.6], tears: 1 },
    { at: 8.5, mood: 'neutral', look: [0, -1], tears: 0 },
    { at: 15.1, mood: 'wide', look: [0, 0] },
    { at: SAY, mood: 'heart', look: [0, 0] },
    { at: 19.1, mood: 'happy' },
    { at: 23.0, mood: 'wide', look: [0, -1], rot: 0.12, d: 0.5 },
  ],
  meProp(x, t, m) { if (t < 1.6) { /* the wobble at frame 0 */ } },
  meHops: [SAY, 19.2, 19.6],
  pis: { x: 190, y: 560, s: 140, keys: [{ at: 0, tears: 1, mood: 'wide', look: [1, 0] }, { at: 5.4, tears: 2, mood: 'sparkle' }, { at: 19.3, tears: 3, mood: 'happy' }, { at: 23.0, tears: 1, mood: 'wide' }], sobs: [5.6, 19.4], hops: [19.4, 19.8] },
  says: [
    { t0: 5.4, t1: 8.3, who: 'libra', text: 'if I tell them, I might lose the *friendship.*', x: 540, y: 1220, tail: 0, tailUp: false },
    { t0: 8.6, t1: 12.2, who: 'moon', text: 'i move whole oceans every day. it’s called the *tides.*', x: 540, y: 1220, tail: 0, tailUp: false },
    { t0: 12.4, t1: 15.0, who: 'moon', text: 'you can move *one sentence.*', x: 540, y: 1220, tail: 0, tailUp: false },
    { t0: SAY, t1: 19.0, who: 'libra', text: 'I like you.', x: 540, y: 1720, tail: 0, tailUp: true, size: 52 },
    { t0: 19.2, t1: 20.8, who: 'them', text: '*FINALLY.*', x: 800, y: 1250, tail: 120, color: '#ff8fb1', size: 56 },
  ],
  heads: [
    { text: 'Perfectly *balanced.* | Perfectly stuck.', at: 2.4, out: [5.0, 5.25], top: 240, size: 84 },
    { text: 'Fifty-fifty. | Then *one hundred.*', at: 20.8, out: [23.2, 23.45], top: 240, size: 92 },
  ],
  fx: [
    { f: HK.glitch, c: HK.glitchCues, o: GL },
    { f: HK.countdown, c: HK.countdownCues, o: COUNT },
  ],
  set(x, t, K) { K.drawSpace(x, t, { planet: 'moon', seed: 7, horizon: { y: 1640, color: '#2a2048', rim: '#9aa3d6' } }) },
  paint(x, t, K) { scales(x, t, K) },
  front(x, t, K) { tide(x, t, K) },
  cues: [
    ['whoosh', 8.5, 1.2, 0.05], ['whoosh', 10.6, 1.2, 0.04],
    ['boom', TIP, 0.12], ['crash', TIP, { gain: 0.05 }], ['glitter', TIP, TIP + 1.4], ['pop', 19.2, 1318.51, 0.05, 0.2],
  ],
  music: { style: 'cinematic', key: 'Eb', seed: 20207, sections: { drop: 2.2, breakdown: [15.2], lift: [TIP] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
