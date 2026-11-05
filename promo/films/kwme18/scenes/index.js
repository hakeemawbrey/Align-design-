// kwme18: WAIT, THAT'S ME, "Making a spreadsheet about my crush" (10 s loop, star_advice trial, music: synthwave · Am).
//   0.00  frame 0: ♍ Virgo mid-click in tiny glasses, a spreadsheet already glowing on its screen; hook on.  0.32 flash.
//   1.2 / 1.9 / 2.6  rows tick: laughs at my jokes ✓ · likes dogs ✓ · said hi Tuesday ✓✓.  3.3 the chart line climbs.
//   5.6–7.1  the slow turn (glasses glint).  7.2  last line: "the data is promising."   9.55–10 loop back.
import { makeWM, wmMusic, box, label, inSprite, pop01, prog, ease, clamp, MINT, INK, BONE, GOLD } from '../../kwme01/wmkit.js'

const H = { x: 300, y: 1240, s: 400, face: 1 }
const S = { x: 750, y: 860, w: 560, h: 620 }
const ROWS = [[1.2, 'laughs at my jokes', '✓'], [1.9, 'likes dogs', '✓'], [2.6, 'said hi Tuesday', '✓✓']], CHART = [3.3, 4.4], TURN = 5.6
function sheet(x, t) {
  box(x, S.x - S.w / 2, S.y - S.h / 2, S.w, S.h, '#f6fff8', { bw: 8, ink: '#2a2148' })
  x.fillStyle = '#2f8f6a'; x.fillRect(S.x - S.w / 2, S.y - S.h / 2, S.w, 54)
  label(x, 'crush_data.sheet', S.x, S.y - S.h / 2 + 28, { size: 26, col: BONE, stroke: null, font: "'Space Mono', monospace", weight: 700 })
  for (let i = 0; i < 4; i++) { x.fillStyle = '#c9d8cf'; x.fillRect(S.x - S.w / 2, S.y - S.h / 2 + 110 + i * 64, S.w, 2) }
  x.fillRect(S.x + 140, S.y - S.h / 2 + 54, 2, 256)
  ROWS.forEach(([v, a, b], i) => {
    const y = S.y - S.h / 2 + 88 + i * 64, k = pop01(t, v, 0.25, 2.4)
    if (k <= 0.01) return
    x.save(); x.globalAlpha = clamp(k); label(x, a, S.x - S.w / 2 + 18, y, { size: 24, col: INK, stroke: null, font: "'Space Mono', monospace", weight: 700, align: 'left' }); x.restore()
    label(x, b, S.x + 205, y, { size: 34 * k, col: '#2f8f6a', stroke: null })
  })
  // chart
  const cx0 = S.x - S.w / 2 + 50, cy0 = S.y + S.h / 2 - 50, p = ease.outCubic(prog(t, ...CHART))
  x.strokeStyle = '#8a84a8'; x.lineWidth = 3; x.beginPath(); x.moveTo(cx0, cy0 - 230); x.lineTo(cx0, cy0); x.lineTo(cx0 + 460, cy0); x.stroke()
  if (p > 0) { x.strokeStyle = '#e0507a'; x.lineWidth = 8; x.beginPath(); const pts = [[0, 0], [0.25, 0.3], [0.5, 0.25], [0.75, 0.6], [1, 0.95]]; pts.forEach(([u, v], i) => { const uu = Math.min(u, p); const xx = cx0 + uu * 450, yy = cy0 - v * 210 * (u <= p ? 1 : 0); if (u <= p || i === 0) i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }); x.stroke() }
  if (p >= 1) label(x, '↑ promising', cx0 + 330, cy0 - 250, { size: 30, col: '#e0507a', stroke: null })
}
const EP = makeWM({
  id: 'kwme18', dur: 10, sign: 'virgo', turn: TURN, brk: 'flash',
  hook: 'Making a *spreadsheet* | about my crush',
  last: 'the data is promising.',
  hero: H, wash: '#2f8f6a',
  heroOpts: (t) => ({ mood: t > CHART[1] ? 'heart' : 'squint', look: [1, -0.6], hops: [...ROWS.map(r => r[0]), CHART[1]], tilt: 0.05 }),
  heroAfter(x, t, a, F, k) {
    const gl = k > 0.95 && t < TURN + 2.3 && t > TURN + 1.7
    inSprite(x, F, () => { x.strokeStyle = INK; x.lineWidth = 0.8; x.strokeRect(7.5, 17.5, 8, 6); x.strokeRect(20.5, 17.5, 8, 6); x.fillStyle = INK; x.fillRect(15.5, 19.5, 5, 0.8); if (gl) { x.fillStyle = '#ffffff'; x.fillRect(8.5, 18.3, 2.5, 1.2); x.fillRect(21.5, 18.3, 2.5, 1.2) } })
  },
  back(x, t) { sheet(x, t) },
  cues: [['tick', 0.02, 0.05], ...ROWS.map(([v], i) => ['pop', v, 880 * (1 + i * 0.2), 0.045, 0.3]), ['riser', CHART[0], CHART[1], 0.02], ['bell', CHART[1], 1760, 0.03, 0.8, 0.3], ['pluck', TURN + 1.75, 2637, 0.02, 0.3, 0]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'synthwave', key: 'A', seed: 2618 })
void [MINT, GOLD]
