// kwme01: WAIT, THAT'S ME, "Saying “I’m fine” with my whole chest" (8 s vertical loop, star_advice trial, music: lofi · F).
// The format look lives in ../wmkit.js (shared by kwme01–kwme24). No end card: the last LOOP_LEN s fold back into frame 0.
//   0.00       frame 0: ♉ Taurus mid-bear-hug of a giant pillow, chin up, a tiny storm cloud already raining on it; hook on.
//   0.32–0.82  record scratch + freeze frame + the red 'caught' ring.
//   1.00       Taurus: "I'm fine." (chest out).   2.05  the cloud rumbles and flashes.   2.9  the pillow gets squeezed flat.
//   4.30–5.80  the slow turn to camera, deadpan push-in. Pisces (corner) fountains.
//   5.90       last line: "(I am not fine.)"  ·  7.55–8.0 loop back to frame 0.
import { makeWM, wmMusic, drawBits, bubble, glow, box, prog, ease, lerp, clamp, INK, BONE } from '../../kwme01/wmkit.js'

const H = { x: 540, y: 1170, s: 440, face: 1 }
const CLOUD = ['..GGGG......', '.GGGGGGGG...', 'GGGGGGGGGGG.', 'GGGGGGGGGGGG', '.GDGGGDGGGD.']
const SAY = 1.0, BOOM = 2.05, SQZ = [2.9, 3.6]

function cloud(x, t, a) {
  const cx = H.x + 10 + 8 * Math.sin(t * 1.3), cy = H.y - 380
  const fl = a > BOOM && a < BOOM + 0.5 ? (Math.sin((a - BOOM) * 40) > 0 ? 1 : 0.3) : 0
  if (fl) glow(x, cx, cy, 260, '#fff6c0', 0.35 * fl)
  // rain (periodic)
  for (let i = 0; i < 9; i++) {
    const ph = ((t * 1.6 + i * 0.37) % 1 + 1) % 1
    const rx = cx - 110 + i * 27, ry = cy + 40 + ph * 230
    x.globalAlpha = 1 - ph; x.fillStyle = INK; x.fillRect(rx - 2, ry - 2, 10, 26); x.fillStyle = '#8fe3ff'; x.fillRect(rx, ry, 6, 22); x.globalAlpha = 1
  }
  drawBits(x, CLOUD, { G: fl ? '#d9d4ff' : '#8a84a8', D: '#6a6488' }, cx, cy, 22)
  if (fl) drawBits(x, ['..YY', '.YY.', 'YYYY', '..Y.', '.Y..'], { Y: '#ffe27a' }, cx + 30, cy + 110, 14)
}
function pillow(x, t, a) {
  const sq = Math.sin(Math.PI * prog(a, ...SQZ))
  const w = 250 - 60 * sq + 6 * Math.sin(t * 3), h = 150 + 24 * sq
  box(x, H.x + 40 - w / 2, H.y + 175 - h / 2, w, h, '#f6b7c9', { bw: 7, hi: '#ffd8e2' })
  // a tiny stitched heart on the pillow
  drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#e0507a' }, H.x + 40, H.y + 175, 8)
  // the arms (two little point tips hugging it)
  x.fillStyle = INK; x.fillRect(H.x + 40 - w / 2 - 22, H.y + 150, 30, 40); x.fillRect(H.x + 40 + w / 2 - 8, H.y + 150, 30, 40)
}

const EP = makeWM({
  id: 'kwme01', dur: 8, sign: 'taurus', turn: 4.3, brk: 'scratch',
  hook: 'Saying *“I’m fine”* | with my whole chest',
  last: '(I am not fine.)',
  hero: H, wash: '#3b6fb0',
  heroOpts: (t, a) => ({ mood: a > SAY - 0.1 && a < BOOM ? 'happy' : a > BOOM && a < BOOM + 0.6 ? 'wide' : 'squint', look: [1, -0.6], hops: [SAY, SAY + 0.35, BOOM + 0.05], squash: -0.06 + 0.1 * Math.sin(Math.PI * prog(a, ...[2.9, 3.6])), tilt: -0.08 }),
  back(x, t, a) { cloud(x, t, a) },
  front(x, t, a, S) {
    pillow(x, t, a)
    bubble(x, t, H.x + 250, H.y - 250, SAY + 0.6, S.TURN[0] - 0.2, 'I’m fine.', { size: 52, tail: -0.5 })
  },
  cues: [['pop', 1.6, 987.77, 0.04, 0.3], ['boom', BOOM + 0.6, 0.18], ['tom', BOOM + 0.6, 60, { gain: 0.2, decay: 0.6 }], ['whoosh', SQZ[0] + 0.6, 0.3, 0.03], ['pop', SQZ[0] + 0.9, 330, 0.04, 0]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'lofi', key: 'F', seed: 2601 })
