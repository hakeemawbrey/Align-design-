// kpure02 · Planet Talk: Uranus · "Taurus, Same Table, Third Year" (26 s vertical, loop) · jazzy · F · star_advice
//   0      Uranus bursting out of Taurus's fridge, a sandwich mid-flip; "TAURUS. | Same table? *Again?*"
//   0.45   glitch · 2.7 whip to the booth: same table, same two plates · "Same booth. Same order. *Year three.*"
//   5.0    ♉ "It's *perfect.*" · 6.5 their person, yawning: "Yep. *Perfect.*" (both a bit bored, neither says it)
//   8.2    ♅ "Comfort is lovely. *Comfort plus one new thing* is lovelier."
//   12.6   a talk card flips: "What's something you've always wanted to *try together?*"
//   17.2   both, at once: "POTTERY CLASS!" · 19.4 Pisces in the next booth, sobbing: "you said it *together!!*"
//   22.0   "Keep the table. | *Change one thing.*" · 25.55 eases back into frame 0 (loop)
import { urFilm, HK } from '../../kpure01/urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 26, BOOTH = 2.7, CARD = 12.6, FLIP = 13.1, BOTH = 17.2, PIS = 19.4, LAST = 22.0
const PERSON = 'libra'                 // their person: a plain star (no glyph), so the story isn't about a sign
const PC = '#f0a3c8'

function kitchen(x, t, K) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#2a2348'); g.addColorStop(1, '#3d2c4a')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let j = 0; j < 12; j++) for (let i = 0; i < 9; i++) if ((i + j) % 2) K.rect(x, i * 130, 300 + j * 100, 130, 100, 'rgba(255,255,255,0.03)')
  // counter
  K.box(x, -20, 1350, 1120, 60, '#c99a6a', { o: 8 }); K.rect(x, -20, 1410, 1120, 520, '#4a3048')
  // the fridge (right), door swung open, cold light pouring out
  K.box(x, 600, 360, 420, 980, '#dfe8f0', { o: 10 })
  const gl = x.createRadialGradient(810, 760, 40, 810, 760, 520); gl.addColorStop(0, 'rgba(220,250,255,0.55)'); gl.addColorStop(1, 'rgba(220,250,255,0)')
  x.fillStyle = gl; x.fillRect(300, 260, 900, 1000)
  K.rect(x, 630, 390, 360, 920, '#bfeaf0'); for (let i = 0; i < 3; i++) K.rect(x, 630, 640 + i * 230, 360, 10, '#8fc7d0')
  x.save(); x.translate(600, 360); x.transform(1, 0.12, 0, 1, 0, 0); K.box(x, -170, 0, 160, 980, '#f2f6fa', { o: 8 }); K.rect(x, -40, 380, 16, 200, '#9aa6b8'); x.restore()
}
function booth(x, t, K) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#2b1830'); g.addColorStop(1, '#4a2638')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // warm pendant lamps
  for (const lx of [300, 780]) { K.rect(x, lx - 3, 0, 6, 330, '#1a0c18'); K.box(x, lx - 70, 330, 140, 60, '#f2c75c', { o: 5 }); const gl = x.createRadialGradient(lx, 420, 20, lx, 420, 420); gl.addColorStop(0, 'rgba(255,214,140,0.30)'); gl.addColorStop(1, 'rgba(255,214,140,0)'); x.fillStyle = gl; x.fillRect(lx - 420, 0, 840, 900) }
  // the sign on the wall
  K.label(x, 'TABLE 4', 540, 560, { size: 34, bg: '#f2c75c', rot: -0.03 })
  // the year counter flipping 1 → 2 → 3
  const yr = t < 3.3 ? 1 : t < 3.9 ? 2 : 3
  K.label(x, `YEAR ${yr}`, 540, 650, { size: 30, bg: yr === 3 ? '#ff8fb1' : '#efe6d6', pop: K.pop01(t, yr === 1 ? 2.8 : yr === 2 ? 3.3 : 3.9, 0.25) })
  // booth seats + table
  K.box(x, -20, 1080, 300, 520, '#8a2f3e', { o: 8 }); K.box(x, 800, 1080, 300, 520, '#8a2f3e', { o: 8 })
  K.box(x, 170, 1400, 740, 60, '#c99a6a', { o: 8 }); K.rect(x, 500, 1460, 80, 460, '#3a2232')
  // the same two plates
  for (const px of [330, 750]) { x.fillStyle = K.INK; x.beginPath(); x.ellipse(px, 1388, 112, 30, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fffaf0'; x.beginPath(); x.ellipse(px, 1384, 100, 24, 0, 0, Math.PI * 2); x.fill(); K.box(x, px - 50, 1352, 100, 26, '#e3a04a', { o: 3 }) }
}

const F = urFilm({
  id: 'kpure02', sign: 'taurus', dur: D, ending: 'loop',
  hook: { text: 'TAURUS. | Same table? *Again?*', top: 230 },
  entry: { kind: 'burst', at: -0.28, x: 740, y: 900, size: 420 },
  brk: { at: 0.5, len: 0.45 },
  debris: [
    { w: 170, h: 40, color: '#e3c27a', x: 300, y: 1240, vx: 260, vy: -900, spin: 8, t0: -0.35 },
    { w: 160, h: 26, color: '#7fd06a', x: 310, y: 1260, vx: 120, vy: -1100, spin: -9, t0: -0.35 },
    { w: 150, h: 34, color: '#e8625a', x: 290, y: 1270, vx: -160, vy: -1000, spin: 5, t0: -0.35 },
    { w: 170, h: 40, color: '#e3c27a', x: 300, y: 1290, vx: -60, vy: -760, spin: -4, t0: -0.35 },
  ],
  bg(x, t, K) { (t < BOOTH ? kitchen : booth)(x, t, K) },
  paint(x, t, K) {
    if (t < BOOTH) {
      K.uranus(x, t, { x: 740, y: 900, size: 420, mood: 'happy', look: [-1, 0.4], hops: [0.6] })
      K.sign(x, t, 'taurus', { x: 290, y: 1480, s: 360, mood: 'wide', look: [1, -0.4], hops: [0.4], shadow: true })
      return
    }
    // the booth
    const yawn = t > 6.4 && t < 8.2
    const glow = t >= BOTH ? 'heart' : t >= FLIP ? 'wide' : null
    K.sign(x, t, 'taurus', { x: 250, y: 1190, s: 280, mood: glow || (t < 6.4 ? 'happy' : 'squint'), look: t >= CARD ? [0.6, 0.6] : [1, 0], hops: [BOTH, BOTH + 0.5], shadow: false })
    K.sign(x, t, PERSON, { x: 830, y: 1190, s: 280, glyph: false, mood: glow || (yawn ? 'sleepy' : 'neutral'), look: t >= CARD ? [-0.6, 0.6] : [-1, 0], hops: [BOTH + 0.1, BOTH + 0.6], seed: 9, zzz: false })
    // Uranus drops in over the table
    const uk = K.pop01(t, 8.0, 0.35)
    if (uk > 0) K.uranus(x, t, { noEntry: true, x: 540, y: 820, size: 330, pop: uk, mood: t < CARD ? 'sly' : t < BOTH ? 'happy' : 'love', look: [0, 1], hops: [8.3, BOTH + 0.2] })
    // Pisces in the next booth, sobbing
    const pk = K.pop01(t, PIS, 0.4)
    if (pk > 0) K.pisces(x, t, { x: 930, y: 1700, s: 230, pop: pk, hops: [PIS + 0.7, PIS + 1.5] })
  },
  over(x, t, K) {
    const ck = K.pop01(t, CARD, 0.35) * K.outK(t, [BOTH - 0.1, BOTH + 0.2])
    if (ck > 0) K.talkCard(x, t, { X: 540, Y: 1080, w: 560, h: 560, rot: -0.03, pop: ck, flipAt: FLIP, size: 44, text: "What's something | you've always | wanted to | *try together?*" })
  },
  lines: [
    { t0: 5.0, t1: 6.4, who: 'taurus', text: "It's *perfect.*", x: 330, y: 880, tail: -60 },
    { t0: 6.5, t1: 8.0, who: 'their person', color: PC, text: 'Yep. *Perfect.* (yawn)', x: 700, y: 880, tail: 120 },
    { t0: 8.4, t1: 12.4, who: 'uranus', text: 'Comfort is lovely. *Comfort plus one new thing* is lovelier.', x: 540, y: 400, tail: 0, maxW: 820 },
    { t0: BOTH, t1: 19.2, who: 'taurus', text: 'POTTERY *CLASS!*', x: 270, y: 1640, tailUp: true, tail: -40, size: 40, maxW: 380 },
    { t0: BOTH + 0.02, t1: 19.2, who: 'their person', color: PC, text: 'POTTERY *CLASS!*', x: 810, y: 1640, tailUp: true, tail: 40, size: 40, maxW: 380 },
    { t0: PIS + 0.2, t1: 21.7, who: 'pisces', text: 'you said it *together!!*', x: 640, y: 1500, tail: 220 },
  ],
  heads: [
    { at: 2.85, text: 'Same booth. Same order. | *Year three.*', out: [4.8, 5.05], top: 230, size: 84 },
    { at: LAST, text: 'Keep the table. | *Change one thing.*', top: 240, size: 100, out: [D - 0.5, D - 0.2] },
  ],
  fx: [
    { f: HK.whipZoom, c: HK.whipZoomCues, o: { at: BOOTH, len: 0.4, from: 1.5 } },
  ],
  cues: [
    ['tick', 3.3, 0.05], ['tick', 3.9, 0.05], ['pop', 3.92, 880, 0.04, 0],
    ['pop', 8.0, 1174.66, 0.04, 0], ['whoosh', 7.95, 0.25, 0.04],
    ['whoosh', FLIP - 0.02, 0.3, 0.05], ['bell', FLIP + 0.2, 783.99, 0.05, 1.6, 0],
    ['glitter', BOTH, BOTH + 1], ['glitter', PIS, PIS + 1],
  ],
  music: { style: 'jazzy', key: 'F', seed: 8102, sections: { drop: BOOTH, lift: [CARD, BOTH] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
