// kpmoe10 · Planet Talk: The Moon · to Capricorn · "Capricorn Has No Time to Be Sad" (27 s vertical, loop) · house · C
//   0      frame 0: the Moon mid-crash onto Capricorn's desk, about to slam the laptop lid; Capricorn mid-typing at
//          11:48 p.m.; "CAPRICORN. | Close the *laptop.* Now." · 0.1 impact, the lid slams · 0.7 record scratch + freeze
//   2.4    "One week after. | *‘Too busy’* to be sad." · the lid back open, the inbox climbing, coffee #3
//   5.6    Capricorn: "I don't have *time* to be sad." · 8.0 the Moon: "even i take nights off. *new moon.*" (it goes
//          dark: the new moon is the phase we barely see, true) · 11.0 "you can barely see me. and i come back *fine.*"
//  14.2    "book a soft night. like a *meeting.*" · 17.2 the calendar: FEEL IT · 8–10 PM, ACCEPTED
//  19.8    the laptop closes, blanket + soup · "hey. can you *talk?*" → "always." · Pisces sobs
//  23.8    "Soft night: *booked.* | No reschedule." · 26.55 loop → frame 0
import { moonFilm, HK } from '../../kpmoe01/moonkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const DARK = 9.0, CAL = 17.2, SOFT = 19.8, DUR = 27

function laptop(x, t, K) {
  // lid angle: open (1) → slammed at the impact → reopened at 2.6 → closed at SOFT
  let open = 1
  if (t > 0.05 && t < 2.6) open = 0.05
  else if (t >= 2.6 && t < SOFT) open = ease.outBack(prog(t, 2.6, 3.0))
  else if (t >= SOFT) open = 1 - ease.inOutCubic(prog(t, SOFT, SOFT + 0.5))
  if (t > 26.5) open = Math.max(open, prog(t, 26.5, 27))
  const X = 740, Y = 1370
  K.box(x, X - 190, Y - 18, 380, 24, '#9aa3b8', { o: 5 })
  const h = 260 * open
  if (h > 4) {
    K.box(x, X - 170, Y - 18 - h, 340, h, '#2a2f44', { o: 5 })
    if (open > 0.6) {
      K.rect(x, X - 150, Y - h, 300, h - 40, '#1b2a4a')
      const n = t < 2.6 ? 41 : 41 + Math.floor((t - 2.6) * 3)
      K.txt(x, `inbox (${n})`, X - 130, Y - h + 30, { size: 22, align: 'left', color: '#7fe3ff' })
      for (let i = 0; i < 4; i++) K.rect(x, X - 130, Y - h + 60 + i * 34, 220 - (i % 2) * 60, 16, 'rgba(255,255,255,0.25)')
    }
  }
  // coffee cups
  const cups = t < 2.6 ? 2 : 3
  for (let i = 0; i < cups; i++) { K.box(x, 940 + (i % 2) * 50, 1300 - Math.floor(i / 2) * 0, 46, 60, '#efe6d6', { o: 4 }); K.rect(x, 946 + (i % 2) * 50, 1306, 34, 8, '#7a4a2a') }
  // the clock
  K.box(x, 120, 690, 230, 90, K.INK, { o: 5 }); K.txt(x, t < SOFT ? '11:48 PM' : '8:00 PM', 235, 736, { size: 40, font: K.INTER, weight: 900, color: t < SOFT ? '#ff8fb1' : '#7dffb0' })
}

const REC = { at: 0.7, len: 1.1, caption: 'yep. *11:48 p.m.*' }
const F = moonFilm({
  id: 'kpmoe10', sign: 'capricorn', dur: DUR, ending: 'loop',
  hook: { text: 'CAPRICORN. | Close the *laptop.* Now.', out: [2.2, 2.4] },
  enter: { kind: 'crash', at: -0.6, x: 760, y: 620, size: 340 },
  whip: false,
  freeze: REC,
  shakes: [0.1],
  flashes: [0.1],
  moon: [
    { at: 0, mood: 'angry' },
    { at: 2.2, mood: 'sad' },
    { at: 7.9, mood: 'neutral' },
    { at: DARK, mood: 'sleepy', alpha: 0.28, d: 0.5 },
    { at: 10.6, mood: 'happy', alpha: 1, d: 0.5 },
    { at: 14.1, mood: 'neutral' },
    { at: CAL, mood: 'happy' },
    { at: SOFT, mood: 'love' },
    { at: 26.3, mood: 'angry' },
  ],
  me: [
    { at: 0, x: 340, y: 1250, s: 290, mood: 'squint', look: [1, 0.5] },
    { at: 0.1, mood: 'wide', look: [1, -0.6] },
    { at: 2.5, mood: 'squint', look: [1, 0.4] },
    { at: 5.5, mood: 'neutral', look: [1, -0.4] },
    { at: DARK, mood: 'wide', look: [1, -0.7] },
    { at: 11.0, mood: 'sparkle', tears: 1 },
    { at: 14.1, mood: 'neutral', tears: 0 },
    { at: CAL, mood: 'happy', look: [1, 0.2] },
    { at: SOFT, mood: 'sleepy', look: [0, 0] },
    { at: 20.1, mood: 'sparkle' },
    { at: 22.2, mood: 'happy', tears: 1 },
    { at: 26.3, mood: 'squint', tears: 0, look: [1, 0.5] },
  ],
  meHops: [0.12, 5.7, 20.2, 22.3],
  meProp(x, t, m, K) {
    const b = ease.outBack(prog(t, SOFT + 0.3, SOFT + 0.7)) * (1 - prog(t, 26.2, 26.5))
    if (b > 0.01) {
      // the blanket round its shoulders + the soup mug
      x.save(); x.translate(m.x, m.y + m.s * 0.18); x.scale(b, b)
      K.box(x, -m.s * 0.55, -20, m.s * 1.1, m.s * 0.42, '#7dc8ff', { o: 6 }); for (let i = 0; i < 5; i++) K.rect(x, -m.s * 0.55 + i * m.s * 0.24, -20, m.s * 0.1, m.s * 0.42, '#a8dcff')
      K.box(x, m.s * 0.42, -60, 70, 60, '#f2c75c', { o: 5 })
      x.restore()
    }
  },
  pis: { x: 190, y: 480, s: 130, keys: [{ at: 0, tears: 1, mood: 'wide', look: [1, 0.4] }, { at: 11.0, tears: 2, mood: 'sparkle' }, { at: 22.3, tears: 3, mood: 'happy' }, { at: 26.3, tears: 1, mood: 'wide' }], sobs: [11.2, 22.4], hops: [22.4, 22.8] },
  says: [
    { t0: 5.6, t1: 7.8, who: 'capricorn', text: 'I don’t have *time* to be sad.', x: 400, y: 1660, tail: -60, tailUp: true },
    { t0: 8.0, t1: 10.8, who: 'moon', text: 'even i take nights off. *new moon.*', x: 540, y: 960, tail: 220, tailUp: true },
    { t0: 11.0, t1: 14.0, who: 'moon', text: 'you can barely see me. and i come back *fine.*', x: 540, y: 960, tail: 220, tailUp: true },
    { t0: 14.2, t1: 17.0, who: 'moon', text: 'book a soft night. like a *meeting.*', x: 540, y: 960, tail: 220, tailUp: true },
    { t0: 20.2, t1: 22.0, who: 'capricorn', text: 'hey. can you *talk?*', x: 400, y: 1660, tail: -60, tailUp: true },
    { t0: 22.2, t1: 23.8, who: 'them', text: '*always.*', x: 760, y: 1000, tail: 120, color: '#7dffb0', size: 54 },
  ],
  heads: [
    { text: 'One week after. | *‘Too busy’* to be sad.', at: 2.4, out: [5.2, 5.45], top: 240, size: 84 },
    { text: 'Soft night: *booked.* | No reschedule.', at: 23.8, out: [26.3, 26.55], top: 240, size: 88 },
  ],
  set(x, t, K) {
    const soft = ease.inOutCubic(prog(t, SOFT, SOFT + 1)) * (1 - prog(t, 26.2, 26.6))
    K.room(x, t, { wall: '#2a3048', wall2: '#151a2e', floor: '#262a3a', warm: 0.1 + 0.9 * soft, window: true })
    K.box(x, -40, 1380, 1160, 46, '#5a4a3a', { o: 6 }); K.rect(x, 60, 1426, 30, 500, K.INK); K.rect(x, 990, 1426, 30, 500, K.INK)
    laptop(x, t, K)
  },
  over(x, t, K) {
    const k = K.inOut(t, CAL, SOFT - 0.1)
    if (k <= 0.01) return
    x.save(); x.translate(540, 1000); x.scale(k, k)
    K.box(x, -330, -230, 660, 460, '#fffaf0', { o: 8 }); K.txt(x, 'TONIGHT', -290, -190, { size: 30, align: 'left', color: '#c0475a' })
    const hrs = ['6 PM', '7 PM', '8 PM', '9 PM', '10 PM']
    hrs.forEach((h, i) => { K.txt(x, h, -290, -130 + i * 80, { size: 22, align: 'left', color: K.INK }); K.rect(x, -200, -130 + i * 80, 500, 3, '#d8d0e8') })
    const drop = ease.outBack(prog(t, CAL + 0.3, CAL + 0.8))
    x.save(); x.translate(lerp(380, 60, drop), lerp(-300, 30, drop)); K.box(x, -190, -60, 380, 160, '#ff8fb1', { o: 5 }); K.txt(x, 'FEEL IT', 0, -10, { size: 38, font: K.INTER, weight: 900, color: K.INK }); K.txt(x, '8–10 PM', 0, 40, { size: 26, color: K.INK }); x.restore()
    const st = K.pop01(t, CAL + 1.2, 0.3, 2.6)
    if (st > 0) { x.save(); x.translate(160, 150); x.rotate(-0.15); x.scale(st, st); x.strokeStyle = '#2a9a5a'; x.lineWidth = 8; x.strokeRect(-130, -36, 260, 72); K.txt(x, 'ACCEPTED', 0, 2, { size: 36, font: K.INTER, weight: 900, color: '#2a9a5a' }); x.restore() }
    x.restore()
  },
  cues: [
    ['crash', 0.1, { gain: 0.05 }], ['tick', 2.6, 0.06], ['pop', 2.65, 659.25, 0.04, 0],
    ['whoosh', DARK, 0.8, 0.04], ['bell', 10.6, 1046.5, 0.04, 2.0, 0], ['glitter', 10.6, 11.6],
    ['whoosh', CAL + 0.3, 0.3, 0.04], ['pop', CAL + 0.8, 880, 0.05, 0], ['tom', CAL + 1.2, 160, { gain: 0.2 }],
    ['whoosh', SOFT, 0.4, 0.04], ['tick', SOFT + 0.5, 0.06], ['pop', 22.2, 1174.66, 0.05, 0.2], ['glitter', 22.2, 23.4],
  ],
  music: { style: 'house', key: 'C', seed: 20210, sections: { drop: 2.3, breakdown: [DARK], lift: [SOFT] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
