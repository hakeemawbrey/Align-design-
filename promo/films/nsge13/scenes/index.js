// nsge13: REMIX: SNOW GLOBE CITIES, Quebec City, "Quebec City: two walls, one gate" (30 s vertical, music: cinematic · Gm)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "A walled city? | I love it here."  Cancer and Capricorn each behind a stretch of the old stone walls; steep roofs.
//   6.4–12.7 "Walls. Walls. | Taffy?"  the city, walls · Cancer, shell · maple taffy on snow, irresistible (twist).
//   13–20    The gate opens; they share the taffy. THE STARS: keep your walls, open one gate. CANCER: boundaries, day one.
//   20.2–25.6 the shake; dealbreakers "boundaries, said early", stamped DAY ONE; "Keep the walls. Open a gate."
import { globeFilm } from '../../nsge01/globekit.js'
import { clamp, prog, ease } from '../../../src/lib.js'

export const CFG = {
  city: 'QUEBEC CITY', hero: 'cancer', partner: 'capricorn', duo: true,
  music: { style: 'cinematic', key: 'Gm', seed: 1613 },
  inside: { top: '#18183e', bottom: '#4c4a86' },
  heads: ['A walled city? | I *love* it here.', 'Walls. Walls. | *Taffy?*', 'Open | *one* gate.', 'Keep the walls. | *Open a gate.*'],
  accents: ['#bfe6ff', '#d98a2a', '#ffd23a', '#ffd23a'], lateWords: 3,
  lines: [
    { who: 'hero', text: 'a walled city. *finally, my people.*' },
    { who: 'partner', text: 'I built my walls *on purpose.*' },
    { who: 'partner', text: '…okay, *the taffy is good.*' },
    { who: 'stars', text: 'keep your walls. *just open one gate.*' },
    { who: 'hero', text: "my boundaries? *I'll tell you day one.*" },
  ],
  gags: [
    { bm: 'wall', label: 'the city:|walls' },
    { bm: 'shell', label: 'Cancer:|shell' },
    { bm: 'taffy', label: 'maple taffy|on snow' },
  ],
  tie: { kind: 'deal', text: 'boundaries, said early', stamp: 'DAY ONE' },
  pos: { hero: { x: 330, y: 1000, s: 150 }, heroTurn: { x: 400, y: 1000, s: 150 }, part: { x: 750, y: 1000, s: 150 }, partEnd: { x: 620, y: 996, s: 150 } },
  skyline: [
    { k: 'roofs', x0: 190, x1: 900, seed: 131, h: 120 },
    { k: 'tower', x: 540, w: 70, h: 300, col: '#6a5a6a', tip: 'spire' },
    { k: 'tower', x: 470, w: 34, h: 230, col: '#6a5a6a', tip: 'spire' },
    { k: 'tower', x: 610, w: 34, h: 230, col: '#6a5a6a', tip: 'spire' },
  ],
  draw(x, t, layer, K) {
    const T = K.T, gy = K.GL.groundY
    if (layer === 'back') {
      // the old walls in front of each of them, with a gate in the middle that opens at the turn
      const open = ease.inOutCubic(prog(t, T.h2 + 0.2, T.h2 + 1.2))
      const wall = (x0, x1) => {
        x.fillStyle = '#9a8e7e'; x.fillRect(x0, gy - 64, x1 - x0, 64)
        x.fillStyle = 'rgba(0,0,0,0.18)'; for (let j = gy - 48; j < gy; j += 16) x.fillRect(x0, j, x1 - x0, 2)
        for (let i = x0; i < x1; i += 16) { x.fillStyle = '#9a8e7e'; x.fillRect(i, gy - 72, 8, 8); x.fillStyle = K.SNOW; x.fillRect(i, gy - 75, 8, 3) }
      }
      wall(180, 470); wall(610, 900)
      // the gate doors swing open
      const dw = 70 * (1 - open)
      x.fillStyle = '#6a3e22'; x.fillRect(470, gy - 64, dw, 64); x.fillRect(610 - dw, gy - 64, dw, 64)
      x.fillStyle = '#9a8e7e'; x.fillRect(462, gy - 92, 156, 28)
    }
    if (layer === 'front') {
      // the taffy on its stick, shared at the gate
      const tk = clamp(prog(t, T.h2 + 1.0, T.h2 + 1.4)) * K.outK(t, [T.together + 1, T.together + 1.3])
      if (tk > 0) { const b = K.BITS.taffy; K.drawBits(x, b.rows, b.cols, 540, gy - 120, 8 * tk) }
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
