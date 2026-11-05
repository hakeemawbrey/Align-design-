// ksge10 · SPOT THE GREEN FLAG: "Capricorn's Boss Calls" (trial reel, ≈ 10 s, cinematic · Eb). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: a phone mid-buzz on the table, incoming call "BOSS", the table rattling.
//   TAKE A   "two minutes, sorry!" … the phone goes face down: "okay, where were we?"
//   TAKE B   takes the call, then keeps scrolling emails: "mhm… one sec…"; your fries go cold.
//   freeze, 3-2-1, GREEN FLAG: Take A. THE STARS: "Two minutes. *Then all yours.*"  Loops back to frame 0.
import { makeGreen, R, box, pbubble, hearts, phone, table, label, prog, clamp, lerp, ease, INK, BONE, GOLD, GREEN, RED, INTER, MONO } from '../../ksge01/scenes/greenkit.js'
import { cafe, plate, balloonText } from '../../ksge02/scenes/sets.js'

function callScreen(q, w, h, tk, mode) {
  R(q, '#211a3e', 0, 0, w, h)
  if (mode === 'email') { for (let i = 0; i < 6; i++) { const y = ((i * 34 - tk * 40) % 210 + 210) % 210; R(q, '#3a3070', 6, y, w - 12, 26); R(q, BONE, 12, y + 6, w * 0.5, 5); R(q, '#9a90c0', 12, y + 15, w * 0.7, 4) } return }
  if (mode === 'down') { R(q, '#110d22', 0, 0, w, h); return }
  q.font = `800 20px ${INTER}`; q.fillStyle = BONE; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('BOSS', w / 2, h * 0.32)
  q.font = `700 11px ${MONO}`; q.fillStyle = '#c9c0e8'; q.fillText('incoming call…', w / 2, h * 0.44)
  q.fillStyle = GREEN; q.beginPath(); q.arc(w * 0.7, h * 0.8, 14, 0, 7); q.fill(); q.fillStyle = RED; q.beginPath(); q.arc(w * 0.3, h * 0.8, 14, 0, 7); q.fill()
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  cafe(x)
  table(x, 250, 470, 330)
  const ring = mode === 'A' ? tk < 0.7 : tk < f[0] + 0.3
  const buzz = ring ? 5 * Math.sin(tk * 90) : 0
  const cold = mode === 'B' ? clamp(prog(tk, f[0] + 0.6, f[0] + 1.2)) : 0
  plate(x, 150, 456, { food: cold > 0.5 ? '#9fb4d8' : '#e9b24a', steam: 1 - cold, t: tk })
  if (cold > 0.5) label(x, 'cold.', 150, 400, { size: 22, col: '#9fd8f6' })
  you(x, tk, { x: 100, y: 400, s: 165, mood: mode === 'A' ? (tk > 1.5 ? 'happy' : 'neutral') : (tk > f[0] + 0.8 ? 'eyeroll' : 'neutral'), look: [1, 0] })
  // the phone: buzzing on the table at frame 0, then in Capricorn's hand
  let px = 300 + buzz, py = 440, rot = 0.05 * Math.sin(tk * 70) * (ring ? 1 : 0), screen = 'call'
  if (mode === 'A') { const up = ease.inOutCubic(prog(tk, 0.6, 0.9)) * (1 - ease.inOutCubic(prog(tk, 1.35, 1.6))); py = lerp(440, 300, up); px = lerp(300, 430, up); if (tk > 1.5) screen = 'down' }
  else { const up = ease.inOutCubic(prog(tk, f[0] + 0.2, f[0] + 0.5)); py = lerp(440, 320, up); px = lerp(300, 430, up); if (tk > f[0] + 0.7) screen = 'email' }
  hero(x, tk, { x: 400, y: 400, s: 195, mood: mode === 'A' ? (tk > 1.5 ? 'happy' : 'wide') : (tk > f[0] + 0.7 ? 'neutral' : 'wide'), look: mode === 'B' && tk > f[0] + 0.6 ? [1, 0.8] : [-1, 0] })
  phone(x, px, py, { w: 90, h: 150, rot: screen === 'down' ? 0 : rot, glow: screen === 'down' ? 0 : 1, screen: (q, w, h) => callScreen(q, w, h, tk, screen) })
  if (ring) balloonText(x, 'BZZT! BOSS', 290 + buzz, 330, { size: 36, col: GOLD, rot: -0.08 + 0.04 * Math.sin(tk * 40) })
  if (mode === 'A') { pbubble(x, tk, 300, 170, 0.75, 1.4, 'two minutes, sorry!', { size: 30, tail: 0.6 }); pbubble(x, tk, 300, 170, 1.5, 99, 'okay, where were we?', { size: 30, tail: 0.6, col: '#c9f2d4' }); hearts(x, tk, 1.7, 120, 320, { n: 3, cell: 4 }) }
  else pbubble(x, tk, 300, 170, f[0] + 0.75, 99, 'mhm… one sec…', { size: 32, tail: 0.6 })
  void box; void GOLD
}
const EP = makeGreen({
  id: 'ksge10', sign: 'capricorn', name: 'Capricorn', win: 'A', ending: 'loop',
  hook: 'THEIR BOSS IS CALLING. | *MID-DATE.*',
  premise: 'Their *work* calls mid-date.',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Two minutes. *Then all yours.*',
  cues: [['pop', 0.0, 880, 0.04, -0.3], ['pop', 0.15, 1174.66, 0.04, -0.3], ['pop', 0.45, 880, 0.04, 0.3], ['pop', 0.6, 1174.66, 0.04, 0.3], ['tick', 1.5, 0.06], ['pop', 1.55, 1318.51, 0.035, -0.4], ['tick', 2.35, 0.05], ['pop', 2.8, 523.25, 0.03, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
