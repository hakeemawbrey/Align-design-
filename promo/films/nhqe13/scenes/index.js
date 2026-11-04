// nhqe13: HOLIDAYS THEN VS NOW, "The lights walk." (15 s vertical trial reel, promo/films/next30/b48.md, music: lofi · Gm).
// Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   a street of lit-up houses whizzing past; Capricorn speed-walks with a stopwatch, Cancer trails behind:
//          "4 streets in 9 minutes!"  Sticker "a *speedrun.*"
//   NOW    the same street, slow: they stroll side by side and stop at every house. Cancer: "ooh, that one!" Sticker "a *slow* walk."
//   7.9    THE STARS: "Slow walks count as dates."
import { makeHQ, box, R, ink, shadow, glow, bubble, hearts, snow, INK, BONE, GOLD, MONO } from '../../nhqe01/scenes/hqkit.js'

const BULBS = ['#ff5c6a', '#ffd25c', '#6fe0a0', '#7fbfff', '#ff8fd0']
function street(x, t, speed) {
  R(x, '#1a1530', 0, 1150, 1080, 180); R(x, '#e9e6f6', 0, 1150, 1080, 18)
  const off = -(t * speed) % 300
  for (let i = -1; i < 5; i++) {
    const cx = off + i * 300 + 150, w = 220, h = 300, y = 1150 - h
    box(x, cx - w / 2, y, w, h, ['#3a3a6a', '#4a3060', '#2f4a5e', '#503a52'][(i + 8) % 4], { b: 6 })
    x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w / 2 - 22, y + 6); x.lineTo(cx, y - 100); x.lineTo(cx + w / 2 + 22, y + 6); x.closePath(); x.fill()
    box(x, cx - 70, y + 70, 50, 56, '#ffd98a', { b: 4 }); box(x, cx + 20, y + 70, 50, 56, '#ffd98a', { b: 4 })
    for (let b = 0; b < 8; b++) { const bx = cx - w / 2 + b * (w / 7); R(x, INK, bx - 7, y - 2, 14, 16); R(x, BULBS[b % 5], bx - 4, y + 1, 8, 11) }
  }
  snow(x, t, { n: 30, y0: 400, y1: 1300, seed: 5 })
}

const EP = makeHQ({
  id: 'nhqe13', hook: 'The holiday *lights walk:* | then vs now', accent: '#ffd25c', deep: '#a8741a',
  thenCap: 'a *speedrun.*', nowCap: 'a *slow* walk.',
  then(x, t, S) {
    street(x, t, 900)
    for (let i = 0; i < 4; i++) R(x, 'rgba(239,230,214,0.5)', 80 + ((t * 1400 + i * 260) % 1000), 1200 + i * 20, 70, 6)
    const step = Math.sin(t * 18)
    S.star(x, t, 'capricorn', { x: 640, y: 1080 - Math.abs(step) * 14, s: 200, mood: 'squint', look: [1, 0], squash: 0.05 * step })
    S.star(x, t, 'cancer', { x: 300, y: 1090 - Math.abs(Math.sin(t * 16 + 1)) * 12, s: 170, mood: 'wide', look: [1, 0], seed: 3 })
    x.save(); x.translate(780, 960); box(x, -40, -40, 80, 80, '#c9cfd8', { b: 5 }); ink(x, '9:00', 0, 2, { size: 22, col: INK, font: MONO }); R(x, INK, -8, -54, 16, 14); x.restore()
    bubble(x, t, 600, 820, S.split ? -1 : 2.6, 5.0, '4 streets in 9 minutes!', { size: 32, tail: 0 })
  },
  now(x, t, S) {
    street(x, t, 40)
    glow(x, 540, 1000, 500, 0.5)
    S.star(x, t, 'capricorn', { x: 620, y: 1070, s: 210, mood: 'happy', look: [-1, -0.6], hops: [6.2] })
    S.star(x, t, 'cancer', { x: 420, y: 1075, s: 200, mood: 'sparkle', look: [0, -1], seed: 3, hops: [5.5, 6.0] })
    bubble(x, t, 400, 860, S.split ? -1 : 5.5, 10.6, 'ooh, that one!', { size: 36, tail: 0 })
    if (!S.split) hearts(x, t, 6.2, 520, 900, { n: 5 })
  },
  pisThen: { x: 950, y: 600, s: 100 }, pisNow: { x: 950, y: 600, s: 110 },
  last: 'Slow walks count as dates.',
  cues: [['tick', 2.4, 0.05], ['tick', 2.6, 0.05], ['tick', 2.8, 0.05], ['tick', 3.0, 0.05], ['tick', 3.2, 0.05], ['pop', 2.62, 1046.5, 0.035, 0], ['pop', 5.52, 1318.51, 0.04, -0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void GOLD
