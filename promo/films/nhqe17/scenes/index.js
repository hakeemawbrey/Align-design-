// nhqe17: HOLIDAYS THEN VS NOW, "New Year’s plans." (15 s vertical trial reel, promo/films/next30/b48.md,
// music: synthwave · C#m). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   DEC 31 on the wall; Scorpio stares at a silent phone: "…they’ll ask. right?"  Crickets. Sticker "*waiting* to be asked."
//   NOW    Scorpio asks Leo: "be my New Year’s plan?"  Leo lights up: "YES!!"  Sticker "*asking* first."
//   7.9    THE STARS: "Asking first is brave. And cute."
import { makeHQ, box, R, ink, shadow, glow, bubble, sparkles, confetti, phone, INK, BONE, GOLD, PINK, MONO } from '../../nhqe01/scenes/hqkit.js'

function wallCal(x, cx, cy) { box(x, cx - 100, cy - 90, 200, 180, BONE, { b: 6 }); R(x, '#c0392b', cx - 100, cy - 90, 200, 50); ink(x, 'DEC', cx, cy - 64, { size: 30, col: BONE, font: MONO }); ink(x, '31', cx, cy + 30, { size: 80, col: INK, font: MONO }) }
function table(x) { box(x, 160, 1180, 760, 44, '#6b4a2f', { b: 6, hi: '#8a6440' }) }

const EP = makeHQ({
  id: 'nhqe17', hook: 'New Year’s *plans:* | then vs now', accent: '#ffd25c', deep: '#8a1f3a',
  thenCap: '*waiting* to be asked.', nowCap: '*asking* first.',
  then(x, t, S) {
    wallCal(x, 800, 560)
    S.star(x, t, 'scorpio', { x: 400, y: 1020, s: 230, mood: 'wide', look: [1, 1], bob: 0 })
    table(x)
    phone(x, 660, 1140, { w: 140, h: 70, rot: 0 })
    // crickets: two little pixel bugs hopping
    for (const [cx, ph] of [[90, 0], [990, 1.3]]) { const h = Math.abs(Math.sin(t * 4 + ph)) * 30; R(x, INK, cx - 26, 1290 - h, 52, 26); R(x, '#5fbf6a', cx - 20, 1284 - h, 40, 18); R(x, INK, cx + 14, 1300 - h, 22, 6) }
    bubble(x, t, 420, 780, S.split ? -1 : 2.6, 5.0, '…they’ll ask. right?', { size: 34, tail: 0 })
    if (!S.split) ink(x, 'chirp', 90, 1230, { size: 22, col: BONE, font: MONO })
  },
  now(x, t, S) {
    glow(x, 540, 1000, 600, 0.6)
    wallCal(x, 540, 540)
    const yes = S.split || t > 6.3
    S.star(x, t, 'scorpio', { x: 330, y: 1060, s: 220, mood: 'sparkle', look: [1, 0], hops: [5.3, 5.8], blush: 1 })
    S.star(x, t, 'leo', { x: 760, y: 1060, s: 230, mood: yes ? 'heart' : 'wide', look: [-1, 0], hops: [6.3, 6.6, 6.9] })
    bubble(x, t, 380, 820, S.split ? -1 : 5.3, 6.6, 'be my New Year’s plan?', { size: 34, tail: -0.2 })
    bubble(x, t, 760, 860, S.split ? 99 : 6.3, 10.6, 'YES!!', { size: 46, tail: 0, col: '#ffe08a' })
    if (!S.split) { sparkles(x, t, 760, 1000, 6.3, 12, 220, 0.3, [GOLD, BONE, PINK]); confetti(x, t, 6.35, 560, 860) }
  },
  pisThen: { x: 960, y: 900, s: 100 }, pisNow: { x: 960, y: 680, s: 110 },
  last: 'Asking first is brave. And cute.',
  cues: [['pop', 2.62, 880, 0.035, 0], ['tick', 3.0, 0.04], ['tick', 3.12, 0.04], ['tick', 3.6, 0.04], ['tick', 3.72, 0.04], ['pop', 5.32, 1174.66, 0.04, -0.3], ['pop', 6.32, 1567.98, 0.05, 0.3], ['glitter', 6.3, 6.9]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void shadow
