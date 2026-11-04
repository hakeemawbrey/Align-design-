// nhqe01: HOLIDAYS THEN VS NOW, "Aries in December." (15 s vertical trial reel, promo/films/next30/b48.md, music: pop · D).
// Story 0–10.6, then the shared end card. The format lives in ./hqkit.js (nhqe01–nhqe18).
//   0.0    hook: "*Aries* in December: | then vs now" over the split screen.
//   THEN   a December calendar crossed out every night; Aries sprints in place, "next party!!". Sticker "*seven* parties a night."
//   NOW    the same calendar, one night circled REST; Aries in a blanket with cocoa. Sticker "one night off. *on purpose.*"
//   7.9    THE STARS: "Rest is on the calendar now."
import { makeHQ, box, R, ink, shadow, glow, bubble, blanket, mug, pop01, prog, INK, BONE, GOLD, MONO } from './hqkit.js'

function calendar(x, t, u, mode) {
  box(x, 140, 440, 800, 380, BONE, { b: 8 })
  R(x, '#c0392b', 140, 440, 800, 64)
  ink(x, 'DECEMBER', 540, 474, { size: 38, col: BONE, font: MONO })
  for (let i = 0; i < 14; i++) {
    const cx = 200 + (i % 7) * 113, cy = 560 + Math.floor(i / 7) * 130
    R(x, 'rgba(27,18,54,0.15)', cx - 48, cy - 44, 96, 104)
    ink(x, String(i + 1), cx - 28, cy - 24, { size: 24, col: 'rgba(27,18,54,0.7)', font: MONO })
    if (mode === 'then' && u * 6 > i * 0.35) { x.save(); x.strokeStyle = '#c0392b'; x.lineWidth = 9; x.beginPath(); x.moveTo(cx - 30, cy - 10); x.lineTo(cx + 30, cy + 46); x.moveTo(cx + 30, cy - 10); x.lineTo(cx - 30, cy + 46); x.stroke(); x.restore() }
    if (mode === 'now' && i === 9) {
      const k = Math.min(1, u * 1.5)
      x.save(); x.strokeStyle = '#1f9a6a'; x.lineWidth = 8; x.beginPath(); x.ellipse(cx, cy + 10, 56, 60, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); x.stroke(); x.restore()
      ink(x, 'REST', cx, cy + 22, { size: 30, col: '#1f9a6a', font: MONO })
    }
  }
}

const EP = makeHQ({
  id: 'nhqe01', hook: '*Aries* in December: | then vs now', accent: '#ff7a5c', deep: '#c0392b',
  thenCap: '*seven* parties a night.', nowCap: 'one night off. *on purpose.*',
  then(x, t, S) {
    calendar(x, t, S.u, 'then')
    const run = Math.sin(t * 22)
    for (let i = 0; i < 5; i++) R(x, 'rgba(239,230,214,0.6)', 640 + i * 40 + ((t * 900 + i * 70) % 200), 1000 + i * 30, 60, 8)
    shadow(x, 480, 1260, 240)
    S.star(x, t, 'aries', { x: 480, y: 1080 - Math.abs(run) * 30, s: 260, mood: 'wide', look: [-1, 0], squash: 0.08 * run })
    bubble(x, t, 470, 880, S.split ? -1 : 2.6, 5.0, 'next party!!', { size: 38, tail: 0.1 })
  },
  now(x, t, S) {
    calendar(x, t, S.u, 'now')
    glow(x, 470, 1100, 420, 0.5)
    shadow(x, 470, 1270, 260)
    S.star(x, t, 'aries', { x: 470, y: 990, s: 260, mood: 'sleepy', zzz: true, look: [0, 0], hops: [6.0] })
    blanket(x, 470, 1095, 320, '#d36a4a')
    mug(x, t, 700, 1240, 70)
  },
  last: 'Rest is on the calendar now.',
  cues: [['tick', 2.6, 0.04], ['tick', 2.9, 0.04], ['tick', 3.2, 0.04], ['tick', 3.5, 0.04], ['riser', 5.1, 0.5, 0.01], ['pluck', 5.6, 1318.51, 0.03, -0.2, 0.5]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [pop01, prog, GOLD]
