// nole10: ONE-LINE ADVICE FOR YOUR SIGN, "Capricorn, when they ask how your day was." (11 s vertical, star_advice
// trial, music: cinematic · Dm). Story 0–8.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–4.1   "*Capricorn*, when they ask | how your *day* was."  Capricorn presents a bar chart on an easel (MY DAY:
//             EMAILS · MEETINGS · LUNCH?). At 2.0 the slide flips: "Q4 OUTLOOK" with a rising line. The date nods… slowly.
//   4.1       white blink (no card cut).   4.1–8.6  THE STARS: "Tell them how | it *felt.*"  The easel shows one big heart; Capricorn:
//             "tired. but good. you?"  Pisces cries.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function easel(x, t, cx, cy, slide, k = 1) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -150, 160, 14, 230); R(x, INK, 136, 160, 14, 230); R(x, INK, -7, 160, 14, 200)
  box(x, -200, -170, 400, 330, '#fbf4e6', { b: 7 })
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (slide === 0) {
    x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.fillText('MY DAY', 0, -135)
    ;[[150, '#2fc79a'], [210, '#5fa8ff'], [60, GOLD]].forEach(([h, c], i) => box(x, -130 + i * 100, 110 - h, 60, h, c, { b: 4 }))
    x.font = `700 16px ${MONO}`; ['EMAILS', 'MEETINGS', 'LUNCH?'].forEach((s, i) => x.fillText(s, -100 + i * 100, 140))
  } else if (slide === 1) {
    x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.fillText('Q4 OUTLOOK', 0, -135)
    x.strokeStyle = '#2fc79a'; x.lineWidth = 10; x.beginPath(); x.moveTo(-150, 100); x.lineTo(-60, 40); x.lineTo(20, 70); x.lineTo(150, -80); x.stroke()
    R(x, INK, -160, 110, 320, 5); R(x, INK, -160, -100, 5, 215)
  } else {
    drawBits(x, HEART, { H: '#ff5c8a' }, 0, -10, 30 + 2 * Math.sin(t * 6))
  }
  x.restore()
}
function sit(x, t, S) {
  const { hero, date } = S
  easel(x, t, 560, 900, t < 2.0 ? 0 : 1)
  if (t > 1.95 && t < 2.1) R(x, 'rgba(255,255,255,0.5)', 360, 730, 400, 330)
  shadow(x, 230, 1380, 200)
  hero(x, t, { x: 230, y: 1230, s: 230, mood: 'happy', look: [1, -1], hops: [-0.1, 0.7, 2.0] })
  // a pointer
  R(x, INK, 300, 1090, 140, 8)
  shadow(x, 880, 1390, 170)
  const nod = t > 2.3 ? 0.07 * Math.max(0, Math.sin((t - 2.3) * 4)) : 0
  date(x, t, { x: 880, y: 1250, s: 190, mood: t > 2.3 ? 'squint' : 'neutral', look: [-1, -0.5], squash: nod })
  if (t > 2.6) label(x, '…', 880, 1080, { size: 50, col: BONE, alpha: clamp((t - 2.6) * 3) })
}
function after(x, t, S) {
  const { hero, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  easel(x, t, 800, 1000, 2, 0.6 * hk)
  shadow(x, 560, 1340, 200 * hk)
  hero(x, t, { x: 560, y: 1190, s: 220, pop: hk, mood: t > T.react ? 'happy' : 'neutral', look: [0, 0], hops: [T.heroIn + 0.3, T.react, T.react + 0.45] })
  bubble(x, t, 560, 990, T.react + 0.1, T.out[1], 'tired. but good. you?', { size: 28 })
}
const EP = makeOneLine({
  id: 'nole10', sign: 'capricorn', name: 'Capricorn', len: 13, date: 'gemini',
  hook: '*Capricorn*, when they ask | how your *day* was.',
  line: 'Tell them how | it *felt.*',
  sit, after, tagX: 560,
  cues: [['tick', 0.7, 0.04], ['whoosh', 1.95, 0.3, 0.035], ['pop', 2.0, 987.77, 0.04, 0], ['pluck', 2.6, 440, 0.03, 0.6, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
