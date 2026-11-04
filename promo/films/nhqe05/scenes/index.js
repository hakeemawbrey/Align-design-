// nhqe05: HOLIDAYS THEN VS NOW, "Leo at the party." (13 s vertical trial reel, promo/films/next30/b48.md,
// music: house · E). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   Leo bursts through the door in a cape, under its own spotlight: "I HAVE ARRIVED."  Sticker "the *entrance.*"
//   NOW    Leo spots a shy guest by the wall and waves them into the circle; the light gets wide. Sticker "the *invite.*"
//   7.9    THE STARS: "Shine, then pass the light."
import { makeHQ, box, R, shadow, glow, bubble, sparkles, confetti, prog, lerp, ease, INK, GOLD, BONE, PINK } from '../../nhqe01/scenes/hqkit.js'

function cone(x, cx, w, a) {
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createLinearGradient(0, 430, 0, 1290)
  g.addColorStop(0, `rgba(255,236,180,${0.05 * a})`); g.addColorStop(1, `rgba(255,236,180,${0.3 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, 430); x.lineTo(cx + 40, 430); x.lineTo(cx + w / 2, 1290); x.lineTo(cx - w / 2, 1290); x.closePath(); x.fill(); x.restore()
}
function cape(x, t, cx, cy) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 70, cy - 90); x.lineTo(cx + 70, cy - 90); x.lineTo(cx + 170 + 20 * Math.sin(t * 6), cy + 150); x.lineTo(cx - 170 - 20 * Math.sin(t * 6 + 1), cy + 150); x.closePath(); x.fill()
  x.fillStyle = '#c0392b'; x.beginPath(); x.moveTo(cx - 62, cy - 84); x.lineTo(cx + 62, cy - 84); x.lineTo(cx + 158 + 20 * Math.sin(t * 6), cy + 142); x.lineTo(cx - 158 - 20 * Math.sin(t * 6 + 1), cy + 142); x.closePath(); x.fill(); x.restore()
}

const EP = makeHQ({
  id: 'nhqe05', hook: '*Leo* at the party: | then vs now', accent: '#ffb347', deep: '#c45a12',
  thenCap: 'the *entrance.*', nowCap: 'the *invite.*',
  then(x, t, S) {
    box(x, 380, 520, 320, 770, '#6b4a2f', { b: 8 }); R(x, '#1a1430', 400, 540, 280, 750)
    cone(x, 540, 460, 1)
    for (let i = 0; i < 4; i++) S.star(x, t, ['virgo', 'libra', 'taurus', 'cancer'][i], { x: [120, 230, 860, 960][i], y: 1230, s: 100, mood: 'neutral', look: [i < 2 ? -1 : 1, 0], seed: 30 + i })
    shadow(x, 540, 1290, 260)
    cape(x, t, 540, 1080)
    S.star(x, t, 'leo', { x: 540, y: 1060, s: 270, mood: 'sparkle', look: [0, 0], hops: [2.5, 3.6] })
    if (!S.split) sparkles(x, t, 540, 1000, 2.45, 12, 260, 0.2, [GOLD, BONE, PINK])
    bubble(x, t, 540, 800, S.split ? -1 : 2.6, 5.0, 'I HAVE ARRIVED.', { size: 42, tail: 0 })
  },
  now(x, t, S) {
    const u = S.split ? 1.6 : S.u
    const wide = ease.inOutCubic(prog(u, 0.9, 1.6))
    cone(x, 540, lerp(420, 980, wide), 0.8)
    shadow(x, 540, 1290, 700)
    S.star(x, t, 'virgo', { x: lerp(960, 760, wide), y: lerp(1210, 1090, wide), s: lerp(120, 200, wide), mood: wide > 0.5 ? 'happy' : 'neutral', look: [-1, 0], hops: [6.5], seed: 31 })
    S.star(x, t, 'libra', { x: 200, y: 1100, s: 190, mood: 'happy', look: [1, 0], seed: 32, hops: [6.6] })
    S.star(x, t, 'leo', { x: 470, y: 1060, s: 240, mood: 'happy', look: [1, 0], hops: [5.3, 5.8, 6.6] })
    bubble(x, t, 600, 820, S.split ? -1 : 5.4, 10.6, 'come join us!', { size: 40, tail: 0.6 })
    if (!S.split) confetti(x, t, 6.6, 620, 900)
  },
  pisThen: { x: 960, y: 640, s: 100 }, pisNow: { x: 960, y: 760, s: 120 },
  last: 'Shine, then pass the light.',
  cues: [['boom', 2.45, 0.2], ['glitter', 2.45, 2.9], ['pop', 2.62, 1318.51, 0.045, 0], ['whoosh', 5.9, 0.6, 0.03], ['pop', 6.6, 1567.98, 0.04, 0.3], ['glitter', 6.6, 7.1]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
