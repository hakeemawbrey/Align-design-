// Shared vertical END CARD for the Houston series: "come Align." + Align logo animation + fade to black.
// STUB — the endcard agent replaces the implementation; the API below is fixed, films import it.
//   import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
//   SCENES: [...yourScenes, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
//   CUES:   [...yourCues, ...endcardCues(DURATION - ENDCARD_LEN)]
// Contract: at `start` your film must be showing ONLY the plain sky H (drawSky(ctx,t,SKY_H) + grain GRAIN_H, from
// wheel.js). The end card is opaque from `start` (it draws that same sky itself), so the cut is invisible, and it runs to
// start + ENDCARD_LEN (= DURATION), ending on a black frame.
import { el } from '../src/lib.js'
export const ENDCARD_LEN = 4.4
export async function buildEndcard(stage, { start }) {
  const end = start + ENDCARD_LEN + 0.01
  const root = el('div', { position: 'absolute', inset: '0', background: '#0b0620', color: '#efe6d6', font: "800 120px Inter, sans-serif", display: 'grid', placeItems: 'center', opacity: 0 }, stage, 'come Align.')
  return { start, end, root, update(t) { root.style.opacity = String(t >= start && t < start + ENDCARD_LEN - 0.7 ? 1 : Math.max(0, (start + ENDCARD_LEN - t) / 0.7)) } }
}
export function endcardCues(start) { return [] }
