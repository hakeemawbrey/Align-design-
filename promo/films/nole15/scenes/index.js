// nole15: ONE-LINE ADVICE FOR YOUR SIGN, "Gemini, texting four chats at once." (12 s vertical, star_advice trial,
// music: chiptune · E). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Gemini*, on a date | texting *four* chats."  Gemini juggles four little phones, each pinging; the date
//             waves across the table: "hi?" (1.4). At 2.2 one phone drops: CLUNK.
//   3.6       card flip.   3.6–7.6  THE STARS: "One chat at | a *time.*"  The phones nap in a basket; Gemini laughs at
//             the date's story: "HA! tell me more."  Pisces cries.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function phoneMini(x, cx, cy, rot, col, ping) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -38, -64, 76, 128, '#2a2148', { b: 5 }); R(x, '#141029', -30, -54, 60, 100)
  R(x, col, -24, -10, 46, 18); R(x, '#e9e2f5', -24, 16, 36, 14)
  if (ping) { R(x, RED, 22, -70, 22, 22); x.font = `800 16px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('!', 33, -58) }
  x.restore()
}
const COLS = ['#5fa8ff', '#9fe6b0', '#ff8fb1', GOLD]
function sit(x, t, S) {
  const { hero, date } = S
  table(x, 540, 1340, 760)
  shadow(x, 300, 1330, 230)
  hero(x, t, { x: 300, y: 1170, s: 250, mood: t > 2.2 ? 'wide' : 'happy', look: [0, -1], hops: [-0.1, 0.4, 0.8, 1.2, 1.6, 2.0, 2.2] })
  for (let i = 0; i < 4; i++) {
    const a = t * 3.2 + i * Math.PI / 2
    let px = 300 + Math.cos(a) * 170, py = 850 + Math.sin(a) * 70 - Math.abs(Math.sin(a * 2)) * 40
    if (i === 2 && t > 2.2) { const p = clamp((t - 2.2) / 0.5); px = lerp(px, 470, p); py = lerp(py, 1300, ease.inQuad(p)) }
    phoneMini(x, px, py, Math.sin(a) * 0.4, COLS[i], Math.floor(t * 4 + i) % 3 === 0)
  }
  if (t > 2.65 && t < 3.4) label(x, 'CLUNK', 520, 1220, { size: 34, col: GOLD, font: INTER, weight: 800 })
  shadow(x, 840, 1330, 180)
  date(x, t, { x: 840, y: 1180, s: 200, mood: 'neutral', look: [-1, 0], hops: [1.4, 1.7] })
  bubble(x, t, 840, 990, 1.4, 3.6, 'hi?', { size: 32 })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  // the basket of napping phones
  x.save(); x.translate(430, 1450); x.scale(0.75 * hk, 0.75 * hk)
  COLS.forEach((c, i) => phoneMini(x, -60 + i * 40, -40, -0.3 + i * 0.2, c, false))
  box(x, -110, -20, 220, 70, '#b98a5a', { b: 6, hi: '#cfa26f' })
  x.restore()
  if (hk > 0.5) label(x, 'z z', 500, 1370, { size: 26, col: BONE, alpha: 0.5 + 0.5 * Math.sin(t * 3) })
  shadow(x, 600, 1340, 190 * hk); shadow(x, 850, 1330, 170 * hk)
  hero(x, t, { x: 610, y: 1160, s: 210, pop: hk, mood: t > T.react ? 'happy' : 'neutral', look: [1, -0.2], hops: [T.heroIn + 0.3, T.react, T.react + 0.3, T.react + 0.6] })
  date(x, t, { x: 860, y: 1150, s: 190, pop: hk, mood: 'sparkle', look: [-1, 0], hops: [T.react - 0.3] })
  bubble(x, t, 600, 980, T.react, T.out[1], 'HA! tell me more.', { size: 28, col: '#fff1a8' })
}
const EP = makeOneLine({
  id: 'nole15', sign: 'gemini', name: 'Gemini', len: 12, date: 'virgo',
  hook: '*Gemini*, on a date | texting *four* chats.',
  line: 'One chat at | a *time.*',
  sit, after, tagX: 610, tagY: 1395,
  cues: [...Array.from({ length: 9 }, (_, i) => ['pop', r3(0.1 + i * 0.25), [1318.51, 1567.98, 1174.66][i % 3], 0.02, (i % 2 ? 0.3 : -0.3)]), ['pop', 1.4, 659.25, 0.035, 0.4], ['tom', 2.7, 110, { gain: 0.25, decay: 0.2 }], ['tick', 2.7, 0.06]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
