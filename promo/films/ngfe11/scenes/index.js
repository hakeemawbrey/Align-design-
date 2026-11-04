// ngfe11: 24 DAYS OF GREEN FLAGS, door 11: "Remembers your friends' names." (18 s vertical, lofi · Dm)
//   hook "Meeting the friends. | *Name check.*" · Cancer's three friends wave from across the room. Aquarius: "Rosa!
//   Dev! Kit!" then "how was the trip?" The friends turn to each other: "they remembered us??" Cancer melts.
//   Last: "Your people are *their* people."
import { makeDoor, room, windowFrame, bubble, hearts, shadow, label, drawStarChar, R, INK, BONE, GOLD, prog, ease } from '../../ngfe01/scenes/advent.js'
const FR = [{ x: 640, c: '#ff9d6e', n: 'Rosa' }, { x: 790, c: '#9be07a', n: 'Dev' }, { x: 940, c: '#c7a0ff', n: 'Kit' }]
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2e2a50', wall2: '#36305c', floor: '#423458' })
  windowFrame(x, t, 380, 280, 320, 260)
  // fairy lights along the top
  for (let i = 0; i < 14; i++) { const on = (Math.floor(t * 3) + i) % 3 !== 0; R(x, INK, 40 + i * 74, 210 + 14 * Math.sin(i), 18, 22); R(x, on ? [GOLD, '#ff8fb1', '#7fd0ff'][i % 3] : '#5a4680', 43 + i * 74, 213 + 14 * Math.sin(i), 12, 16) }
  FR.forEach((f, i) => {
    shadow(x, f.x, 1160, 150)
    const named = u > 0.8 + i * 0.35
    const turn = u > 3.3 && u < 4.6
    drawStarChar(x, f.x, 1040, 170, t, { color: f.c, mood: named ? (turn ? 'wide' : 'sparkle') : 'happy', look: turn ? [i === 0 ? 1 : -1, 0] : [-1, -0.2], seed: 20 + i, glow: 0.8, hops: [S.t0 + 0.2 + i * 0.12, S.t0 + 0.85 + i * 0.35, S.t0 + 4.6 + i * 0.1] })
    if (named && u < 2.2) label(x, '!', f.x + 50, 900, { size: 44, col: GOLD, font: 'Inter, sans-serif', weight: 800 })
  })
  shadow(x, 170, 1160, 220); shadow(x, 400, 1160, 220)
  hero(x, t, { x: 170, y: 990, s: 230, mood: 'happy', look: [1, -0.2], hops: [S.t0 + 0.8, S.t0 + 1.15, S.t0 + 1.5, S.t0 + 2.2] })
  mate(x, t, { x: 400, y: 990, s: 230, mood: u < 4.6 ? (u > 1.2 ? 'wide' : 'happy') : 'heart', look: u < 4.6 ? [1, 0] : [-1, 0], hops: [S.t0 + 1.3, S.t0 + 4.65] })
  if (u > 4.6) hearts(x, t, S.t0 + 4.7, 400, 820)
  bubble(x, t, 330, 660, S.t0 + 0.8, S.t0 + 2.15, 'Rosa! Dev! Kit!', { size: 46, tail: -0.5 })
  bubble(x, t, 330, 660, S.t0 + 2.2, S.t0 + 3.4, 'how was the trip?', { size: 44, tail: -0.5 })
  bubble(x, t, 790, 760, S.t0 + 3.4, S.t0 + 4.9, 'they remembered us??', { size: 38, tail: 0, col: '#d8f5c8' })
  void ease; void prog; void BONE
}
const EP = makeDoor({
  day: 11, hero: 'aquarius', mate: 'cancer', hook: 'Meeting the friends. | *Name check.*',
  flag: "remembers your *friends'* names.", scene, pis: { x: 950, y: 1715 },
  cues: [['pop', 0.2, 880, 0.03, 0.4], ['pop', 0.8, 1174.66, 0.04, 0.2], ['pop', 1.15, 1318.51, 0.04, 0.3], ['pop', 1.5, 1567.98, 0.04, 0.4], ['pop', 2.2, 987.77, 0.035, -0.3], ['pop', 3.4, 659.25, 0.04, 0.3], ['pluck', 4.65, 1174.66, 0.04, 0.5, -0.2], ['pluck', 4.77, 1567.98, 0.035, 0.5, -0.2]],
  last: 'Your people are *their* people.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
