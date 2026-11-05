// kcie03: CAUGHT IN 4K, "Leo checked their reflection mid-date" (short, hard cut, music: funk · A). Rows: m02.md #3
// World time w:
//   0.0  a café date. The date (Aquarius) tells a long story about their cousin's dog; Leo nods along… CHECK 1: the dark
//        window (a faint Leo reflection winks back). 3.0 CHECK 2: the spoon. 4.6 CHECK 3: the black phone screen.
//   5.6  = the freeze (frame 0): Leo mid-glance at the phone screen while the date is mid-sentence.
//   6.4  the date: "…are you checking yourself out?" Leo: frozen, sweating. 7.3 the date pulls out a POCKET MIRROR too.
//   8.0  both fix their hair; Pisces (the waiter) cries "you're both so cute". Last line 8.8, hard cut 10.4.
import {
  makeCaught, room, furn, star, pisces, bubble, sticker, label, box, R, drawBits, sparkles, hearts,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER,
} from '../../kcie01/caughtkit.js'

const C = 5.6, END = 10.4
const LEO = { x: 300, y: 1250, s: 320 }, DATE = { x: 800, y: 1250, s: 300 }, PIS = { x: 930, y: 900, s: 150 }
const CHECKS = [[1.2, 2.2, 'CHECK *1*: the window'], [3.0, 4.0, 'CHECK *2*: the spoon'], [4.6, 7.0, 'CHECK *3*: the phone']]

function cafe(x, w) {
  room(x, 'cafe', { fy: 1420 })
  // the big night window (the reflection lives here)
  box(x, 60, 360, 600, 560, '#2a1714', { b: 8 }); const g = x.createLinearGradient(0, 380, 0, 900); g.addColorStop(0, '#0b0820'); g.addColorStop(1, '#251a4a'); x.fillStyle = g; x.fillRect(76, 376, 568, 528)
  for (let i = 0; i < 9; i++) R(x, i % 2 ? GOLD : '#ffb86b', 100 + i * 60, 820 - (i % 3) * 30, 14, 14)
  R(x, '#2a1714', 352, 360, 16, 560)
  // pendant lamps
  for (const lx of [300, 800]) { R(x, INK, lx - 3, 0, 6, 200); box(x, lx - 50, 200, 100, 50, GOLD, { b: 5 }); x.save(); x.globalCompositeOperation = 'lighter'; const gg = x.createRadialGradient(lx, 260, 10, lx, 260, 380); gg.addColorStop(0, 'rgba(255,210,140,0.22)'); gg.addColorStop(1, 'rgba(255,210,140,0)'); x.fillStyle = gg; x.fillRect(lx - 380, 0, 760, 700); x.restore() }
  furn.shelf(x, 720, 520, 300)
}

function world(x, w) {
  cafe(x, w)
  // the reflection in the window: a faint Leo that winks
  const rK = Math.max(clamp(prog(w, 1.25, 1.5)) * outK(w, [2.0, 2.2]), 0)
  if (rK > 0.01) { star(x, w, 'leo', { x: 220, y: 640, s: 200, mood: w > 1.6 ? 'wink' : 'sparkle', alpha: 0.45 * rK, shadow: false, glyph: false, seed: 3 }); sparkles(x, w, 220, 600, 1.6, 8, 120, 1) }
  // Pisces the waiter, with a tray, crying more and more
  box(x, PIS.x - 90, PIS.y - 140, 180, 18, BONE, { b: 4 })
  box(x, PIS.x - 60, PIS.y - 190, 36, 50, '#f6f3ea', { b: 3 }); box(x, PIS.x + 10, PIS.y - 190, 36, 50, '#f6f3ea', { b: 3 })
  pisces(x, w, { ...PIS, mood: w > 7.9 ? 'happy' : 'sparkle', look: [-1, 0.4], tears: w > 7.9 ? 3 : w > 4.6 ? 2 : 1, hops: [8.0, 8.3] })
  bubble(x, w, PIS.x - 80, PIS.y - 300, 8.1, END + 1, 'you’re both|so cute!!', { size: 32, col: '#bfe9ff', tail: 0.4 })
  // the table + the spoon + the phone
  furn.table(x, 540, 1260, 520, '#6b4a2f')
  box(x, 400, 1210, 90, 50, BONE, { b: 4 }); box(x, 610, 1210, 90, 50, BONE, { b: 4 })      // two cups
  const spoonUp = clamp(prog(w, 3.0, 3.2)) * outK(w, [3.85, 4.0])
  x.save(); x.translate(470 + 30 * spoonUp, 1235 - 220 * spoonUp); x.rotate(-0.4 + 0.4 * spoonUp)
  R(x, INK, -8, 0, 16, 90); R(x, '#cfd6e6', -4, 4, 8, 82); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -18, 30, 40, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e6ecf6'; x.beginPath(); x.ellipse(0, -18, 24, 34, 0, 0, Math.PI * 2); x.fill()
  if (spoonUp > 0.6) { drawBits(x, ['..O..', '.OOO.', 'OOOOO', '.O.O.'], { O: '#f39a3a' }, 0, -18, 6) }
  x.restore()
  const phUp = clamp(prog(w, 4.6, 4.85)) * outK(w, [6.3, 6.6])
  x.save(); x.translate(lerp(560, 480, phUp), lerp(1245, 960, phUp)); x.rotate(lerp(1.4, -0.15, phUp)); x.scale(1 + 0.5 * phUp, 1 + 0.5 * phUp)
  if (phUp > 0.3) { const g = x.createRadialGradient(0, 0, 10, 0, 0, 200); g.addColorStop(0, `rgba(255,190,120,${0.35 * phUp})`); g.addColorStop(1, 'rgba(255,190,120,0)'); x.fillStyle = g; x.fillRect(-200, -200, 400, 400) }
  box(x, -50, -90, 100, 180, '#2a2148', { b: 6 }); R(x, '#0a0718', -40, -78, 80, 156)
  if (phUp > 0.5) { x.globalAlpha = 0.5; drawBits(x, ['..OOO..', '.OOOOO.', 'OOBOBOO', 'OOOOOOO', '.O...O.'], { O: '#f39a3a', B: INK }, 0, -10, 8); x.globalAlpha = 1 }
  x.restore()
  // Leo
  let mood = 'happy', look = [1, -0.2]
  const checking = CHECKS.some(([a, b]) => w > a && w < b)
  if (w > 1.2 && w < 2.2) look = [-1, -0.9]
  if (w > 3.0 && w < 4.0) { mood = 'sparkle'; look = [0.6, -1] }
  if (w > 4.6 && w < 6.4) { mood = 'sparkle'; look = [0.7, -1] }
  if (w > 6.4 && w < 7.6) { mood = 'wide'; look = [1, 0] }
  if (w > 7.6) { mood = 'happy'; look = [1, 0] }
  if (!checking && w < 6.4) mood = 'happy'
  star(x, w, 'leo', { ...LEO, mood, look, hops: [0.4, 0.9, 2.3, 2.7, 4.1, 8.0, 8.25, 8.5, 8.9], seed: 3, blush: w > 7.6 })
  if (w > 6.6 && w < 7.6) drawBits(x, ['.S.', 'SSS', 'SSS', '.S.'], { S: '#8fe3ff' }, LEO.x + 120, LEO.y - 160 + 40 * ((w * 2) % 1), 9)       // sweat drop
  // the date (Aquarius), mid-story the whole time
  const dm = w > 6.2 && w < 7.3 ? 'squint' : w > 7.3 ? 'happy' : 'happy'
  star(x, w, 'aquarius', { ...DATE, mood: dm, look: [-1, 0], hops: [0.2, 0.7, 1.3, 1.9, 2.5, 3.1, 3.7, 4.3, 4.9, 5.5, 6.4, 7.4, 8.0, 8.25], seed: 7, blush: w > 7.9 })
  // the pocket mirror
  if (w > 7.3) {
    const k = pop01(w, 7.3, 0.3, 2.4)
    x.save(); x.translate(DATE.x + 150, DATE.y - 150); x.rotate(0.2); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 62, 76, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 54, 68, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d8eefc'; x.beginPath(); x.ellipse(0, 0, 42, 56, 0, 0, Math.PI * 2); x.fill()
    R(x, '#fff', -20, -30, 10, 26); x.restore()
    sparkles(x, w, DATE.x + 150, DATE.y - 150, 7.4, 10, 120, 2)
  }
  if (w > 8.0) { sparkles(x, w, LEO.x, LEO.y - 170, 8.0, 10, 140, 3, [GOLD, '#f39a3a', BONE]); sparkles(x, w, DATE.x, DATE.y - 160, 8.15, 10, 140, 4); hearts(x, w, 8.5, 540, 1000, { n: 6 }) }
  // the story the date is telling + the reply beats
  bubble(x, w, 760, 820, 0.15, 1.15, 'so my cousin’s dog—', { size: 36, tail: 0.2 })
  bubble(x, w, 300, 880, 2.25, 2.95, 'mhm! wow!', { size: 38, tail: -0.1 })
  bubble(x, w, 760, 820, 2.6, 4.5, '…and he jumped|into the fountain', { size: 36, tail: 0.2 })
  bubble(x, w, 760, 820, 4.8, 6.3, '…so that’s why I can’t|go to that park anymore', { size: 34, tail: 0.2 })
  bubble(x, w, 760, 820, 6.4, 7.35, '…are you checking|yourself out?', { size: 38, tail: 0.2, col: '#ffe0a8' })
  bubble(x, w, 300, 880, 6.9, 7.6, 'NO. maybe.', { size: 40, tail: -0.1 })
  CHECKS.forEach(([a, b, txt], i) => sticker(x, w, 540, 560, a, Math.min(b, a + 1.25), txt, { size: 42, col: GOLD, rot: [-0.04, 0.04, -0.03][i] }))
}

const EP = makeCaught({
  id: 'kcie03', sign: 'leo', name: 'Leo',
  hook: 'Mid-date. | Checking my *own reflection.*', hookColor: '#f39a3a',
  earlier: '6 MINUTES EARLIER', clock0: '20:14', clockScale: 60,
  catches: [{ s: 0, c: C, circle: () => ({ x: LEO.x, y: LEO.y - 20, rx: 215, ry: 225, lx: 60, ly: 960, labelSide: 1 }) }],
  frame: { z: 1.16, fx: 540, fy: 930 },
  ending: 'cut', wEnd: END, lastAt: 8.8,
  last: 'Okay, we *both* | look great.', lastColor: '#f39a3a',
  world,
  cues: [
    ['pop', 0.2, 659.25, 0.03, 0.3], ['whoosh', 1.2, 0.25, 0.04], ['glitter', 1.3, 1.7], ['pluck', 1.62, 1567.98, 0.04, 0.4, -0.3],
    ['pop', 2.25, 880, 0.035, -0.3], ['pop', 2.4, 987.77, 0.03, -0.3],
    ['whoosh', 3.0, 0.25, 0.04], ['pluck', 3.2, 2093, 0.035, 0.3, 0], ['tick', 3.9, 0.05],
    ['whoosh', 4.6, 0.25, 0.04], ['pluck', 4.85, 1760, 0.035, 0.4, -0.2],
    ['pop', 6.4, 440, 0.05, 0.3], ['pop', 6.5, 415.3, 0.04, 0.3], ['pop', 6.9, 1174.66, 0.04, -0.3],
    ['pop', 7.3, 1318.51, 0.05, 0.3], ['glitter', 7.35, 7.8], ['bell', 7.4, 1760, 0.025, 0.8, 0.3],
    ['pop', 8.0, 1174.66, 0.04, -0.3], ['pop', 8.15, 1567.98, 0.04, 0.3], ['glitter', 8.0, 8.6], ['pluck', 8.5, 1318.51, 0.04, 0.6, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, INTER, ease]
