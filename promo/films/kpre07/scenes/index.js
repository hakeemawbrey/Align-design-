// kpre07 — PISCES REACTS: "The bus driver waved back" (9 s vertical trial reel, star_advice; pop · D). LOOPS.
// Kit: ./prkit.js (shared by kpre07–12) on top of hookkit.js. No end card, no card cut.
//   0.0  frame 0: a kid mid-wave at a bus window, Pisces mid-gasp, hook "A kid waved. The DRIVER waved back." · whip zoom
//   1.1  the driver waves back: "caught" red circle · the CRY-O-METER slams to MAX · Pisces sobbing in arcs
//   5.2  Pisces: "that's the whole city's heart." · 8.6–9.0 eases back into frame 0.
import { buildReact, sobCues, bits, PAL, INK, BONE, GOLD } from './prkit.js'
import { caught, caughtCues } from '../../hookkit.js'

const CAUGHT = { at: 1.1, x: 300, y: 610, r: 120, out: [3.4, 3.6], label: 'WAVED BACK!!', arrow: 'br', rec: false }
function bus(x, t, H, drv) {
  const W = H.WIN
  x.fillStyle = '#2a3a6a'; x.fillRect(W.x, W.y + 420, W.w, 180)            // the street
  x.fillStyle = '#ffe27a'; for (let i = 0; i < 6; i++) x.fillRect(W.x + 40 + i * 170, W.y + 520, 90, 10)
  // the bus
  x.fillStyle = INK; x.fillRect(W.x + 80, W.y + 110, 860, 330)
  x.fillStyle = '#f2a33a'; x.fillRect(W.x + 90, W.y + 120, 840, 310)
  x.fillStyle = '#c86a2a'; x.fillRect(W.x + 90, W.y + 360, 840, 20)
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(W.x + 330 + i * 150, W.y + 150, 130, 120); x.fillStyle = '#9fd8ff'; x.fillRect(W.x + 336 + i * 150, W.y + 156, 118, 108) }
  x.fillStyle = INK; x.fillRect(W.x + 110, W.y + 150, 190, 170); x.fillStyle = '#9fd8ff'; x.fillRect(W.x + 116, W.y + 156, 178, 158)
  for (const wx of [W.x + 220, W.x + 780]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, W.y + 440, 46, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f7f9a'; x.beginPath(); x.arc(wx, W.y + 440, 20, 0, Math.PI * 2); x.fill() }
  // the driver (front window) and the kid (third window)
  H.person(W.x + 205, W.y + 255, 9, { col: '#c98a5a', shirt: '#3a5aa0', wave: drv ? t * 9 : 0 })
  H.person(W.x + 695, W.y + 235, 9, { col: '#f0c090', shirt: '#e8566e', wave: t * 10 + 1, flip: true })
}
const R = buildReact({
  id: 'kpre07', duration: 9, ending: 'loop',
  hook: 'A kid waved. | The *DRIVER* waved back.',
  playing: 'bus stop · 8:02 AM',
  clip(x, t, H) { bus(x, t, H, t > 1.1 && t < 8.6) },
  tears: t => (t < 1.3 ? 1 : 3),
  meter: t => (t < 1.15 ? 0.35 + 0.1 * Math.sin(t * 6) : Math.min(1, 0.35 + (t - 1.15) * 3)),
  mood: t => (t < 1.3 ? 'wide' : t > 5 ? 'sparkle' : 'wide'),
  last: { at: 5.2, text: "Pisces: “that's the whole city's heart.”" },
  extra: [caught(CAUGHT)],
  cues: [...caughtCues(CAUGHT), ['riser', 1.15, 1.6, 0.03], ['crash', 1.6, { gain: 0.05 }], ...sobCues(1.7, 3), ...sobCues(3.4, 2), ...sobCues(6.4, 2, 0.025)],
})
export const { DURATION, SCENES, CUES } = R
