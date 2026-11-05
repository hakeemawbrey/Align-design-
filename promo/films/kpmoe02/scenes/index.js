// kpmoe02 · Planet Talk: The Moon · to Taurus · "The Same Café Every Saturday" (27 s vertical, loop) · jazzy · F
//   0      frame 0: the Moon mid-swing down on a silver thread past the café awning, Taurus mid-sip at the window
//          table, a second cup across from it; "TAURUS. | I see you *at the café.*" · 0.55 whip zoom
//   2.7    "Same café. *Every* Saturday." · Taurus: "it’s where we *used to go.*"
//   5.6    the Moon: "i know cycles. i go dark every month." · 9.0 phase strip (new → full → new)
//   9.4    the Moon: "and i always come back *new.*" · 12.8 "keep the comfort. change the *table.*"
//  16.0    flash: the street, Taurus walking with the cosy drink to go · 19.4 a bakery! "oh. a *bakery.*"
//  21.6    Pisces sobs on its cloud above the bakery · 23.0 "Same cosy drink. | *New* corner." · 26.55 loop → frame 0
import { moonFilm } from '../../kpmoe01/moonkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'

const OUT = 16.0
const BAK = 19.4

function cup(x, K, X, Y, s = 1, { color = '#efe6d6', steam = true, t = 0, lid = false } = {}) {
  x.save(); x.translate(X, Y); x.scale(s, s)
  if (lid) { K.box(x, -34, -50, 68, 96, '#c98a5a', { o: 5 }); K.box(x, -40, -62, 80, 16, '#efe6d6', { o: 4 }); K.rect(x, -34, -10, 68, 22, '#efe6d6') }
  else { K.box(x, -40, -36, 80, 70, color, { o: 5 }); x.strokeStyle = K.INK; x.lineWidth = 9; x.beginPath(); x.arc(46, -2, 16, -1.4, 1.4); x.stroke(); K.rect(x, -34, -30, 68, 10, '#7a4a2a') }
  if (steam) { x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = 5; x.lineCap = 'round'; for (const d of [-14, 10]) { x.beginPath(); for (let i = 0; i <= 10; i++) { const yy = -46 - i * 7, xx = d + Math.sin(t * 3 + i * 0.7 + d) * 6; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() } }
  x.restore()
}
function cafe(x, t, K) {
  K.room(x, t, { wall: '#5a3a3a', wall2: '#3a2430', floor: '#4a2f2a', window: false, warm: 0.7 })
  // the big café window: a night street outside
  K.box(x, 80, 470, 920, 560, '#141032', { o: 12 })
  for (let k = 0; k < 22; k++) { const sx = 100 + ((k * 137) % 880), sy = 490 + ((k * 71) % 260), tw = 0.5 + 0.5 * Math.sin(t * 2.6 + k); K.rect(x, sx, sy, 5, 5, `rgba(255,244,220,${0.3 + 0.6 * tw})`) }
  K.rect(x, 80, 820, 920, 210, '#221a40'); for (let i = 0; i < 5; i++) K.box(x, 110 + i * 190, 780 + (i % 2) * 30, 130, 250, '#2e2452', { o: 4 })
  K.rect(x, 534, 470, 12, 560, K.INK); K.rect(x, 80, 740, 920, 10, K.INK)
  // the awning (stripes) across the top of the window
  for (let i = 0; i < 9; i++) { K.box(x, 60 + i * 108, 400, 108, 90, i % 2 ? '#efe6d6' : '#c0475a', { o: 4 }) }
  for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? '#efe6d6' : '#c0475a'; x.beginPath(); x.arc(114 + i * 108, 490, 54, 0, Math.PI); x.fill() }
  // the window table
  K.box(x, 100, 1340, 880, 40, '#8a5a3a', { o: 6 }); K.rect(x, 520, 1380, 40, 300, K.INK)
  cup(x, K, 760, 1300, 1.1, { t, steam: false, color: '#d8d0e8' })
  K.label(x, 'theirs', 760, 1210, { size: 24, bg: '#d8d0e8', rot: 0.06, pop: K.pop01(t, 3.0, 0.3) })
}
function street(x, t, K) {
  K.drawSpace(x, t, { planet: 'moon', seed: 9 })
  // the shopfronts
  K.box(x, -40, 560, 520, 840, '#3a2a4e', { o: 8 }); K.box(x, 520, 560, 600, 840, '#7a4a3a', { o: 8 })
  K.label(x, 'OLD CAFÉ', 220, 640, { size: 34, bg: '#5a4a6a', ink: '#bdb3d8' })
  K.box(x, 40, 760, 380, 360, '#1d1638', { o: 6 })
  const glow = ease.outCubic(prog(t, BAK - 0.3, BAK + 0.3))
  K.label(x, 'BAKERY', 820, 640, { size: 40, bg: '#f2c75c', pop: 1 + 0.06 * glow * Math.sin(t * 6) })
  K.box(x, 590, 760, 460, 360, glow > 0 ? '#ffd98a' : '#a8743a', { o: 6 })
  for (let i = 0; i < 3; i++) { K.box(x, 630 + i * 140, 960, 110, 60, '#c98a3a', { o: 4 }); K.rect(x, 650 + i * 140, 975, 70, 8, '#e8b46a') }
  for (let i = 0; i < 2; i++) { x.fillStyle = '#e8a050'; x.strokeStyle = K.INK; x.lineWidth = 6; x.beginPath(); x.arc(690 + i * 180, 880, 44, Math.PI, 0); x.closePath(); x.fill(); x.stroke() }
  // the sidewalk
  K.rect(x, -40, 1400, 1160, 540, '#2e2744'); K.rect(x, -40, 1394, 1160, 14, K.INK)
  for (let i = 0; i < 8; i++) K.rect(x, i * 160 - 20, 1400, 6, 520, 'rgba(0,0,0,0.25)')
}

const F = moonFilm({
  id: 'kpmoe02', sign: 'taurus', dur: 27, ending: 'loop',
  hook: { text: 'TAURUS. | I see you *at the café.*', out: [2.4, 2.6] },
  enter: { kind: 'drop', at: -0.3, x: 760, y: 720, size: 360 },
  string: { dx: -40 },
  moonMotion: (t, M) => ({ x: M.x + Math.sin(t * 1.6) * 26 * (t < OUT ? 1 : 0.5), rot: (M.rot || 0) + Math.sin(t * 1.6) * 0.06 }),
  whip: { at: 0.55 },
  flashes: [OUT],
  moon: [
    { at: 0, mood: 'wide' },
    { at: 1.2, mood: 'sad' },
    { at: 5.5, mood: 'neutral' },
    { at: 9.3, mood: 'happy' },
    { at: 12.7, mood: 'neutral' },
    { at: OUT, x: 760, y: 420, size: 300, mood: 'happy', d: 0.01 },
    { at: 23.0, mood: 'love' },
  ],
  me: [
    { at: 0, x: 330, y: 1220, s: 300, mood: 'squint', look: [1, 0.5], squash: 0.08 },
    { at: 0.6, mood: 'wide', squash: 0, look: [1, -0.6] },
    { at: 2.7, mood: 'sparkle', look: [1, 0.3], tears: 1 },
    { at: 5.5, mood: 'neutral', look: [1, -0.6], tears: 0 },
    { at: 9.3, mood: 'sparkle' },
    { at: 12.7, mood: 'happy' },
    { at: OUT, x: 160, y: 1300, s: 280, mood: 'happy', look: [1, 0], d: 0.01 },
    { at: OUT + 0.1, x: 520, d: 3.2 },
    { at: BAK, mood: 'wide', look: [1, -0.3] },
    { at: BAK + 0.6, x: 640, mood: 'heart', d: 0.8 },
    { at: 23.0, mood: 'happy' },
  ],
  meHops: [OUT + 0.6, OUT + 1.2, OUT + 1.8, OUT + 2.4, OUT + 3.0, BAK, 23.1],
  meProp(x, t, m, K) {
    if (t < OUT) cup(x, K, m.x + m.s * 0.42, m.y + m.s * 0.2 - (t < 0.6 ? 30 : 0), 1, { t })
    else cup(x, K, m.x + m.s * 0.44, m.y + m.s * 0.1, 0.9, { t, lid: true })
  },
  pis: { x: 200, y: 620, s: 150, keys: [{ at: 0, tears: 1, mood: 'wide' }, { at: 3.0, tears: 2, mood: 'sparkle' }, { at: OUT, x: 200, y: 400, d: 0.01, tears: 1, mood: 'happy', look: [-1, 0.5] }, { at: 21.6, tears: 3, mood: 'sparkle', s: 190 }], sobs: [3.2, 21.7], hops: [21.7, 22.1] },
  says: [
    { t0: 2.8, t1: 5.4, who: 'taurus', text: 'it’s where we *used to go.*', x: 380, y: 1650, tail: -40, tailUp: true },
    { t0: 5.6, t1: 8.9, who: 'moon', text: 'i know cycles. i go dark *every month.*', x: 540, y: 1080, tail: 200, tailUp: true },
    { t0: 9.4, t1: 12.5, who: 'moon', text: 'and i always come back *new.*', x: 540, y: 1080, tail: 200, tailUp: true },
    { t0: 12.8, t1: 15.7, who: 'moon', text: 'keep the comfort. change the *table.*', x: 540, y: 1080, tail: 200, tailUp: true },
    { t0: BAK + 0.3, t1: 21.5, who: 'taurus', text: 'oh. a *bakery.*', x: 560, y: 1700, tail: 60, tailUp: true, size: 50 },
  ],
  heads: [
    { text: 'Same café. *Every* Saturday.', at: 2.7, out: [5.3, 5.55], top: 230, size: 80 },
    { text: 'Same cosy drink. | *New* corner.', at: 23.0, out: [26.2, 26.5], top: 1540, size: 92 },
  ],
  set(x, t, K) { if (t < OUT) cafe(x, t, K); else street(x, t, K) },
  over(x, t, K) { K.phaseStrip(x, t, { at: 8.9, out: 12.5, y: 1560, r: 44, label: 'new → full → new · about a month' }) },
  cues: [
    ['pop', 3.0, 659.25, 0.04, 0.2], ['bell', 9.0, 1046.5, 0.03, 1.6, 0], ['glitter', 9.0, 10.2],
    ['bell', OUT, 1174.66, 0.04, 1.8, 0.2], ['bell', BAK, 1396.91, 0.05, 1.8, 0.2], ['glitter', BAK, BAK + 1.4],
  ],
  music: { style: 'jazzy', key: 'F', seed: 20202, sections: { drop: 0.6, lift: [OUT] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
