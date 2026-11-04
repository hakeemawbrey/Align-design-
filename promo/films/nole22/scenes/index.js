// nole22: ONE-LINE ADVICE FOR YOUR SIGN, "Capricorn, when they gave you a gift." (10 s vertical, star_advice trial,
// music: cinematic · Gm). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Capricorn*, when they | gave you a *gift.*"  Capricorn holds a wrapped gift in one point and taps a
//             calculator with the other. At 1.4 a receipt starts printing: GIFT ♡ · RETURN GIFT: $?? · TOTAL: ???.
//   3.6       white blink (no card cut).   3.6–7.6  THE STARS: "A gift isn't | a *bill.*"  The calculator drops; Capricorn hugs the gift:
//             "thank you."  The date glows.  Pisces cries.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, drawStarChar, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function gift(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -60, -50, 120, 100, '#3fb6f0', { b: 6 }); R(x, GOLD, -9, -50, 18, 100); R(x, GOLD, -60, -9, 120, 18); drawBits(x, ['GG.GG', '.GGG.'], { G: GOLD }, 0, -64, 9); x.restore() }
function calc(x, t, cx, cy, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -70, -100, 140, 200, '#5a5470', { b: 6 }); R(x, '#bfe8a8', -54, -84, 108, 44)
  x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(Math.floor(t * 4) % 2 ? '???' : '8.8.8', 48, -62)
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) R(x, (i + j * 3) === Math.floor(t * 7) % 9 ? GOLD : BONE, -50 + i * 36, -20 + j * 36, 26, 26)
  x.restore()
}
function receipt(x, cx, top, len) {
  if (len <= 0) return
  R(x, INK, cx - 66, top - 4, 132, len + 8); R(x, '#fbf4e6', cx - 60, top, 120, len)
  x.save(); x.beginPath(); x.rect(cx - 60, top, 120, len); x.clip()
  x.font = `700 15px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  ;['GIFT ♡', '------', 'RETURN', 'GIFT: $??', '------', 'TOTAL:', '???'].forEach((s, i) => x.fillText(s, cx, top + len - 24 - i * 30))
  x.restore()
}
function sit(x, t, S) {
  const { hero } = S
  shadow(x, 420, 1370, 230)
  hero(x, t, { x: 420, y: 1190, s: 260, mood: t > 2.4 ? 'wide' : 'squint', look: [1, 0.4], hops: [-0.1, 2.4] })
  gift(x, 220, 1180, 1)
  calc(x, t, 680, 1160, 0.08)
  receipt(x, 700, 1270, 230 * ease.outCubic(prog(t, 1.4, 3.2)))
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  const dp = ease.inQuad(prog(t, T.react - 0.2, T.react + 0.2))
  if (hk > 0.3) calc(x, t, lerp(470, 720, dp), lerp(1050, 1420, ease.inQuad(dp)), lerp(0, 1.4, dp))
  shadow(x, 580, 1340, 200 * hk); shadow(x, 860, 1330, 170 * hk)
  hero(x, t, { x: 580, y: 1180, s: 220, pop: hk, mood: t > T.react ? 'happy' : 'squint', look: [1, 0], hops: [T.heroIn + 0.3, T.react + 0.2, T.react + 0.6] })
  gift(x, 600, 1280, 0.8 * hk)
  date(x, t, { x: 860, y: 1160, s: 190, pop: hk, mood: t > T.react + 0.5 ? 'heart' : 'neutral', look: [-1, 0], glow: t > T.react + 0.5 ? 1.5 : 1, hops: [T.react + 0.5] })
  bubble(x, t, 580, 990, T.react + 0.2, T.out[1], 'thank you.', { size: 30 })
}
const EP = makeOneLine({
  id: 'nole22', sign: 'capricorn', name: 'Capricorn', len: 12, date: 'leo',
  hook: '*Capricorn*, when they | gave you a *gift.*',
  line: 'A gift isn’t | a *bill.*',
  sit, after, tagX: 580, tagY: 1395,
  cues: [...Array.from({ length: 10 }, (_, i) => ['tick', r3(0.1 + i * 0.14), 0.018]), ...Array.from({ length: 12 }, (_, i) => ['tick', r3(1.4 + i * 0.15), 0.012]), ['tom', 5.35, 120, { gain: 0.2, decay: 0.15 }]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
