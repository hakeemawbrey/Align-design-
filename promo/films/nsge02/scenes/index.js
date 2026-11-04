// nsge02: REMIX: SNOW GLOBE CITIES, Montreal, "Montreal: the underground crush" (28 s vertical, music: lofi · F)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "Montreal has a whole | city underground."  A cutaway under the snow: Cancer scuttles through a warm, lit
//            tunnel below the city; Mount Royal's lit cross on the hill. CANCER / THE STARS (shell joke).
//   6.4–12.7 "Cozy. Cozier. | Coziest."  poutine · bagels · a blanket fort, in a tunnel (twist).
//   13–20    A Libra up top: "Bonjour-hi!" THE STARS: say it back. CANCER: "…bonjour-hi?"
//   20.2–25.6 the shake; Cancer pops up to the snow beside the Libra; a blind mystery card; "The warm part is up here."
import { globeFilm } from '../../nsge01/globekit.js'

export const CFG = {
  city: 'MONTREAL', hero: 'cancer', partner: 'libra',
  music: { style: 'lofi', key: 'F', seed: 1602 },
  inside: { top: '#1a1a48', bottom: '#4a4f8c' },
  heads: ['Montreal has a whole | city *underground.*', 'Cozy. Cozier. | *Coziest.*', 'Then someone says | *Bonjour-hi.*', 'The warm part is *up here.*'],
  accents: ['#ffd9a0', '#bfe6ff', '#ffb3d1', '#ffd23a'], lateWords: 2,
  lines: [
    { who: 'hero', text: 'a whole city underground? *never leaving.*' },
    { who: 'stars', text: 'babe. you already *have a shell.*' },
    { who: 'hero', text: "it's not hiding if it's *cozy.*" },
    { who: 'stars', text: "somebody's saying hi. *say it back.*" },
    { who: 'hero', text: '…*bonjour-hi?*' },
  ],
  gags: [
    { bm: 'bowl', label: 'poutine:|emotional support' },
    { bm: 'bagel', label: 'bagels:|still warm' },
    { bm: 'blanket', label: 'a blanket fort,|in a tunnel' },
  ],
  tie: { kind: 'mystery', label: 'card first.' },
  pos: { hero: { x: 430, y: 1150, s: 112 }, heroTurn: { x: 440, y: 1150, s: 112 }, heroEnd: { x: 470, y: 996, s: 150 }, part: { x: 690, y: 1000, s: 150 }, partEnd: { x: 615, y: 996, s: 150 } },
  skyline: [
    { k: 'hill', x: 300, w: 300, h: 230, col: '#26305e' },
    { k: 'cross', x: 300, y: 222, h: 70 },
    { k: 'blocks', x0: 420, x1: 900, seed: 12, min: 60, max: 150, col: '#21285a' },
    { k: 'tower', x: 600, w: 64, h: 280, col: '#2b3468', tip: 'flat' },
    { k: 'tower', x: 720, w: 52, h: 220, col: '#283063', tip: 'antenna' },
  ],
  draw(x, t, layer, K) {
    const gy = K.GL.groundY, T = K.T
    if (layer === 'back') {
      // the underground: a warm, lit passage under the snow (a cutaway), with little shop windows and stairs up
      x.fillStyle = '#2a1f3a'; x.fillRect(180, gy + 36, 720, 140)
      x.fillStyle = '#5a3a2a'; x.fillRect(180, gy + 36, 720, 10)
      x.fillStyle = 'rgba(255,200,120,0.28)'; x.fillRect(180, gy + 46, 720, 120)
      for (let i = 0; i < 6; i++) { const wx = 250 + i * 100; x.fillStyle = 'rgba(255,214,140,0.85)'; x.fillRect(wx, gy + 70, 46, 34); x.fillStyle = '#3a2a2a'; x.fillRect(wx, gy + 104, 46, 6) }
      x.fillStyle = '#e9ddc8'; x.fillRect(180, gy + 166, 720, 10)
      for (let j = 0; j < 5; j++) { x.fillStyle = '#9aa3b8'; x.fillRect(560 + j * 16, gy + 36 - j * 0 + j * 26, 60, 8) }
      void T
    }
    if (layer === 'over' && t > T.partnerIn + 0.3 && t < T.h2Out[0]) {
      K.sticker(t, 760, 760, 'Bonjour-hi!', K.pop01(t, T.partnerIn + 0.3, 0.3, 2.4) * K.outK(t, [T.h2Out[0] - 0.25, T.h2Out[0]]), { col: '#ffb3d1', size: 32, rot: 0.05 })
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
