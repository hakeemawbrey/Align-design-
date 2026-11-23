// hst412 · 17 days · Libra can't pick a side of town to get ready in (Montrose vs Pearland → the halfway coffee shop) · synthwave
import { ep, C, Y, G, Kp, clamp, prog, ease, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, mural, houses, coffeeShop, freeway, overheadSign, streetSign, daySky, outside, skyline, skyFill } from './w17.js'

const L = 300, R = 780, M = 540
const split = (x, t) => {
  x.save(); x.beginPath(); x.rect(0, 0, 540, 1920); x.clip(); mural(x, t); outside(x, { ground: '#3a2a4a' }); streetSign(x, 270, 1000, 'MONTROSE', { pole: false }); x.restore()
  x.save(); x.beginPath(); x.rect(540, 0, 540, 1920); x.clip(); daySky(x, t); houses(x, G, t); outside(x, { ground: '#3f7a46' }); streetSign(x, 810, 1000, 'PEARLAND', { pole: false }); x.restore()
  x.fillStyle = INK; x.fillRect(534, 0, 12, 1920)
}
const scale = (x, t, tilt) => {   // a balance scale: tilt −1 (left heavy) … 1 (right heavy)
  const cx = M, cy = 700, a = 0.25 * tilt + 0.04 * Math.sin(t * 3)
  box(x, cx - 10, cy, 20, 300, GOLD, 4); box(x, cx - 90, cy + 290, 180, 30, GOLD, 4)
  x.save(); x.translate(cx, cy); x.rotate(a); box(x, -280, -8, 560, 16, GOLD, 4); x.restore()
  for (const d of [-1, 1]) { const px = cx + d * 280 * Math.cos(a), py = cy + d * 280 * Math.sin(a); x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 60, py + 110); x.moveTo(px, py); x.lineTo(px + 60, py + 110); x.stroke(); box(x, px - 80, py + 110, 160, 20, GOLD, 4); txt(x, d < 0 ? 'MURALS' : 'FOOD', px, py + 80, { size: 30, col: BONE, font: MONO, weight: 700 }) }
}
const synth = (x, t) => { skyFill(x, '#120a30', '#ff5ea8', 0, 1000); x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(540, 860, 150, Math.PI, 0); x.fill(); for (let k = 0; k < 5; k++) { x.fillStyle = '#120a30'; x.fillRect(380, 760 + k * 22, 320, 6 + k * 2) } skyline(x, 1000, t, { alpha: 1, col: '#1a0f3a', lit: '#ff8fe0' }); x.fillStyle = '#1a0f3a'; x.fillRect(0, 1000, 1080, 920); x.strokeStyle = '#ff5ea8'; x.lineWidth = 3; for (let k = 0; k < 12; k++) { const y = 1000 + ((k * 40 + t * 60) % 480); x.beginPath(); x.moveTo(0, y); x.lineTo(1080, y); x.stroke() } for (let k = -6; k <= 6; k++) { x.beginPath(); x.moveTo(540 + k * 30, 1000); x.lineTo(540 + k * 200, 1920); x.stroke() } }
const halfway = (x, t) => { daySky(x, t); freeway(x, 1000, 160, 2, t * 200); outside(x, { ground: '#4a4a5a' }); coffeeShop(x, 700, G); overheadSign(x, 360, 560, 'FEEDER RD', 'HALFWAY', 0.55) }
const coin = (x, t, lt) => { const up = Math.sin(Math.PI * clamp(lt / 1.4)) * 420, w = Math.abs(Math.cos(lt * 14)) * 60 + 6; x.fillStyle = INK; x.beginPath(); x.ellipse(M, 1000 - up, w + 6, 66, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.ellipse(M, 1000 - up, w, 60, 0, 0, Math.PI * 2); x.fill() }

export const EP = ep(17, {
  hook: '17 days out. | Libra still can\'t choose.',
  hookSet: (x, t) => split(x, t),
  hookCast: C({ libra: [[0, 440, Y, 270], [0.7, 640, Y, 270], [1.4, 440, Y, 270], [2.1, 640, Y, 270], [2.8, 540, Y, 270]] }), hookMood: { libra: 'wide' }, hookLook: { libra: [0, 0] },
  calX: 540, calY: 760, calS: 0.6,
  scenes: [
    { dur: 3.4, set: split, cast: C({ libra: [M, Y, 300] }), mood: { libra: 'wide' }, look: { libra: [0, 0] },
      lines: [[0.15, 1.5, 'libra', 'help me. | where do I'], [1.8, 1.4, 'libra', 'get ready | for the party?']] },
    { dur: 3.4, set: split, cast: C({ scorpio: [L - 40, Y, 240], libra: [M + 60, Y + 30, 190] }), mood: { scorpio: 'wink', libra: 'neutral' },
      lines: [[0.2, 2.6, 'scorpio', 'get ready here. | inside the Loop.']] },
    { dur: 3.4, set: split, cast: C({ cancer: [R + 40, Y, 240], libra: [M - 60, Y + 30, 190] }), mood: { cancer: 'heart', libra: 'neutral' },
      lines: [[0.2, 2.6, 'cancer', 'come to Pearland. | I made food.']] },
    { dur: 3.6, set: (x, t, lt) => { synth(x, t); scale(x, t, Math.sin(lt * 2.4)) }, cast: C({ libra: [M, Y + 80, 220] }), mood: { libra: 'squint' },
      lines: [[1.6, 1.8, 'libra', 'it keeps | tipping.']] },
    { dur: 3.6, set: (x, t, lt) => { synth(x, t); coin(x, t, lt) }, cast: C({ libra: [L, Y, 230], gemini: [R, Y, 220] }), mood: { libra: 'wide', gemini: 'wide' },
      lines: [[1.6, 1.8, 'gemini', 'it landed | on its side.']], stick: [[1.5, 1.6, 'COIN: UNDECIDED', PINK]] },
    { dur: 3.6, set: halfway, cast: C({ libra: [[0, 200, Y, 240], [1.0, 360, Y, 240]] }), mood: { libra: 'sparkle' }, hops: { libra: [1.0, 1.3] },
      lines: [[1.0, 2.4, 'libra', 'the halfway | coffee shop!']] },
    { dur: 3.6, set: halfway, cast: C({ scorpio: [L - 80, Y, 210], cancer: [R + 120, Y, 210], libra: [M, Y, 230] }), mood: { scorpio: 'eyeroll', cancer: 'eyeroll', libra: 'wide' },
      lines: [[0.2, 1.6, 'scorpio', "that's 40 min | for me."], [1.9, 1.5, 'cancer', 'and for me, | baby.']] },
    { dur: 3.6, set: synth, cast: C({ libra: [M, Y, 300] }), mood: { libra: 'happy' }, look: { libra: [0, 0] },
      lines: [[0.15, 1.6, 'libra', "when it's 50/50,"], [1.9, 1.6, 'libra', 'pick the people, | not the place.']] },
  ],
  stamp: { set: synth, cast: C({ scorpio: [200, Y, 210], libra: [M, Y, 240], cancer: [880, Y, 210] }), mood: { scorpio: 'happy', libra: 'sparkle', cancer: 'heart' }, look: { libra: [0, 0] },
    lines: [[1.2, 2.2, 'libra', 'everyone gets | ready together.']] },
  line: 'Every side of town. One night.', stars: ['libra', 'scorpio', 'cancer', 'gemini'],
})
