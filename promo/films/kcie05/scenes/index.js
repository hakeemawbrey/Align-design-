// kcie05: CAUGHT IN 4K, "Aries replied in 0.3 seconds" (short, hard cut, music: chiptune · E). Rows: m02.md #5
// World time w:
//   0.0  the living room. Aries paces, "I'm SO chill". Pisces on the couch with a blanket. The phone sits across the room.
//   2.2  BZZT. 2.4 Aries DIVES over the couch (and over Pisces). A speedometer swings to the max.
//   2.9  = the freeze (frame 0): Aries mid-air above the couch, the gauge reading 0.3 s.
//   3.5  lands, "hiii!!" sent. REPLY TIME 0.3 s. 4.1 "too fast??" The plan: wait 10 minutes to look chill. 10:00… 9:51…
//   5.7  caves: double text "also hi". 6.4 the crush replies just as fast: "haha same speed". Pisces: happy tears.
//   7.4  last line: "Fast replies are a love language." Hard cut 9.0.
import {
  makeCaught, room, furn, phone, star, pisces, bubble, sticker, label, box, R, drawBits, sparkles, hearts, speedLines, confetti,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, INTER, MONO,
} from '../../kcie01/caughtkit.js'

const C = 2.9, END = 9.0
const PIS = { x: 560, y: 1230, s: 170 }
const ARIES = w => {
  if (w < 2.4) return { x: 170 + 60 * Math.sin(w * 2.6), y: 1250, s: 260, rot: 0 }
  if (w < 3.4) { const p = prog(w, 2.4, 3.4); return { x: lerp(170, 860, p), y: 1250 - 400 * Math.sin(Math.PI * p), s: 260, p } }
  return { x: 860, y: 1250, s: 260 }
}
const MSGS = [{ w: 2.2, side: 'L', text: 'hey :)' }, { w: 3.5, side: 'R', text: 'hiii!!' }, { w: 5.75, side: 'R', text: 'also hi' }, { w: 6.4, side: 'L', text: 'haha same speed' }]

function gauge(x, w, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, Math.PI, 0); x.lineTo(150, 30); x.lineTo(-150, 30); x.fill()
  x.fillStyle = '#2a2148'; x.beginPath(); x.arc(0, 0, 136, Math.PI, 0); x.lineTo(136, 20); x.lineTo(-136, 20); x.fill()
  for (let i = 0; i <= 10; i++) { const a = Math.PI + i / 10 * Math.PI; x.save(); x.rotate(a); R(x, i > 7 ? RED : BONE, 104, -4, 24, 8); x.restore() }
  const v = clamp(prog(w, 2.3, 2.75)), a = Math.PI + (0.05 + 0.93 * ease.outCubic(v)) * Math.PI + (v >= 1 ? 0.03 * Math.sin(w * 40) : 0)
  x.save(); x.rotate(a); R(x, RED, 0, -5, 112, 10); x.restore()
  R(x, BONE, -14, -14, 28, 28)
  label(x, 'REPLY SPEED', 0, -170, { size: 26, col: BONE })
  x.restore()
}

function world(x, w) {
  room(x, 'living', { fy: 1420 })
  box(x, 80, 560, 360, 300, BONE, { b: 6 }); x.fillStyle = '#140d36'; x.fillRect(94, 574, 332, 272); R(x, BONE, 252, 560, 12, 300); R(x, BONE, 80, 704, 360, 12)
  furn.plant(x, 90, 1400, 1.2)
  furn.couch(x, 290, 1330, 560, '#d0566e')
  // the side table + the phone (small, buzzing) before Aries grabs it
  box(x, 860, 1280, 160, 24, '#8a5a32', { b: 5 }); R(x, INK, 930, 1310, 20, 120)
  if (w < 3.4) {
    const bz = w > 2.2 ? 6 * Math.sin(w * 90) : 0
    box(x, 900 + bz, 1236, 80, 40, '#2a2148', { b: 4 }); R(x, w > 2.2 ? '#7fd0ff' : '#0a0718', 910 + bz, 1242, 60, 28)
    if (w > 2.2) { label(x, 'BZZT', 940, 1180, { size: 34, col: GOLD, rot: 0.1, alpha: pop01(w, 2.2, 0.15, 2.6) }) }
  }
  // Pisces on the couch, under a blanket; ducks when Aries flies over, cries happy tears at the end
  const pm = w > 2.4 && w < 3.5 ? 'wide' : w > 6.4 ? 'happy' : 'sparkle'
  pisces(x, w, { ...PIS, mood: pm, look: w > 2.4 && w < 3.5 ? [0.4, -1] : [1, -0.3], tears: w > 6.4 ? 3 : w > 2.4 ? 2 : 1, hops: [2.5, 6.5, 6.8], squash: w > 2.5 && w < 3.3 ? 0.18 : 0 })
  box(x, PIS.x - 120, PIS.y + 40, 240, 70, '#f2c75c', { b: 5, hi: '#ffe08a' })
  // Aries
  const A = ARIES(w)
  if (w > 2.45 && w < 3.4) speedLines(x, A.x - 60, A.y, 220, -1, 6, BONE, 0.85)
  let mood = 'happy', look = [1, 0]
  if (w < 2.2) { mood = 'squint'; look = [1, 0] }
  if (w > 2.2 && w < 3.5) { mood = 'wide'; look = [1, 0.3] }
  if (w > 4.1 && w < 5.7) { mood = 'wide'; look = [0, 0] }
  if (w > 5.7 && w < 6.4) { mood = 'squint'; look = [0, 0] }
  if (w > 6.4) { mood = 'heart' }
  const vib = w > 4.6 && w < 5.7 ? 6 * Math.sin(w * 70) : 0
  star(x, w, 'aries', { x: A.x + vib, y: A.y, s: A.s, mood, look, hops: [0.5, 1.2, 1.9, 3.45, 5.75, 6.5, 6.8, 7.1], seed: 2, squash: w > 2.4 && w < 3.4 ? -0.12 : 0 })
  bubble(x, w, 230, 1000, 0.3, 2.15, 'I’m SO chill', { size: 40, tail: -0.2 })
  // the gauge
  gauge(x, w, 790, 640, pop01(w, 2.25, 0.25, 2.4) * outK(w, [3.4, 3.6]))
  // after the landing: the phone up close
  if (w > 3.4) {
    const k = pop01(w, 3.4, 0.3, 2)
    const d1 = w > 5.6 && w < 5.75 ? { text: 'also hi' } : null
    phone(x, w, { cx: 560, cy: 900, w: 380, h: 600, rot: -0.04, title: '♡ them', msgs: MSGS.filter(m => m.w > 2), alpha: clamp(k), draft: d1, fs: 34 })
    // stopwatch readouts
    if (w > 3.55) sticker(x, w, 560, 500, 3.55, 4.1, 'REPLY TIME: *0.3 s*', { size: 44, col: GOLD })
    if (w > 6.45) sticker(x, w, 560, 500, 6.45, 7.4, 'THEIR REPLY: *0.2 s*', { size: 44, col: MINT })
  }
  bubble(x, w, 860, 1000, 4.1, 4.6, 'too fast??', { size: 42, tail: 0.2, col: '#ffd0d0' })
  // the 10-minute plan
  if (w > 4.6 && w < 5.75) {
    const k = pop01(w, 4.6, 0.25, 2.4)
    const left = Math.max(0, 600 - Math.floor((w - 4.75) * 8))
    x.save(); x.translate(560, 500); x.scale(k, k)
    box(x, -260, -80, 520, 160, '#160d33', { b: 8 })
    label(x, 'PLAY IT COOL', 0, -42, { size: 28, col: BONE })
    label(x, `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`, 0, 26, { size: 76, col: left < 595 ? RED : GOLD })
    x.restore()
    if (w > 5.3) label(x, 'lasted 9 seconds', 560, 640, { size: 34, col: PINK, alpha: pop01(w, 5.3, 0.2, 2) })
  }
  if (w > 6.4) { confetti(x, w, 6.45, 560, 900, { n: 22 }); hearts(x, w, 6.6, 860, 1050, { n: 6 }) }
}

const EP = makeCaught({
  id: 'kcie05', sign: 'aries', name: 'Aries',
  hook: 'Replied in *0.3 seconds.* | Help.', hookColor: '#ff7a5c',
  earlier: '3 SECONDS EARLIER', clock0: '19:42', clockScale: 1,
  catches: [{ s: 0, c: C, circle: w => { const A = ARIES(w); return { x: A.x, y: A.y - 10, rx: 190, ry: 190, lx: 80, ly: A.y + 250, labelSide: 1 } } }],
  frame: { z: 1.08, fx: 540, fy: 960 },
  ending: 'cut', wEnd: END, lastAt: 7.4,
  last: 'Fast replies are | a *love language.*', lastColor: '#ff7a5c',
  world,
  cues: [
    ['pop', 0.35, 659.25, 0.03, -0.4], ['pop', 1.2, 659.25, 0.03, -0.4],
    ['tick', 2.2, 0.06], ['tick', 2.27, 0.06], ['tick', 2.34, 0.06], ['pop', 2.2, 987.77, 0.05, 0.4],
    ['whoosh', 2.4, 0.5, 0.08], ['riser', 2.3, 2.75, 0.04], ['bell', 2.75, 2349.32, 0.03, 0.6, 0],
    ['tom', 3.4, 90, { gain: 0.3, decay: 0.25 }], ['pop', 3.5, 1174.66, 0.05, 0], ['pop', 3.55, 1567.98, 0.04, 0],
    ['pop', 4.1, 440, 0.04, 0.3], ['pop', 4.6, 880, 0.04, 0], ...Array.from({ length: 8 }, (_, i) => ['tick', +(4.75 + i * 0.125).toFixed(3), 0.04]),
    ['pop', 5.75, 1318.51, 0.05, 0], ['pop', 6.4, 987.77, 0.05, 0.3], ['pop', 6.45, 1318.51, 0.05, 0.3], ['glitter', 6.45, 7.0], ['bell', 6.5, 1760, 0.03, 1.0, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MONO, drawBits, sparkles]
