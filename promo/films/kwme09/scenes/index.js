// kwme09: WAIT, THAT'S ME, "Loving being single until 2 a.m." (9 s loop, star_advice trial, music: lofi · D♭).
//   0.00  frame 0: the camera mid-whip, ♐ Sagittarius mid-power-pose on its bed, confetti mid-burst, the clock at 11:58.
//   1.6–2.6  the clock whips 11:59 → 12:00 → 1:00 → 2:00, the room drops to 2 a.m. blue.  3.0 under the blanket, phone glow.
//   5.0–6.5  the slow turn (blanket up to the chin).  6.6  last line: "it’s a 2 a.m. thing."   8.55–9 loop back.
import { makeWM, wmMusic, box, label, glow, phone, prog, ease, lerp, clamp, pop01, GOLD, PINK, MINT, BONE, INK } from '../../kwme01/wmkit.js'

const H = { x: 470, y: 1120, s: 400, face: 1 }
const WHIP = [1.6, 2.6], NIGHT = 3.0, TURN = 5.0
const TIMES = ['11:58', '11:59', '12:00', '1:00', '2:00']
const clockAt = t => TIMES[t < WHIP[0] ? 0 : Math.min(4, 1 + Math.floor(prog(t, ...WHIP) * 3.99))]
const dark = t => ease.inOutCubic(prog(t, WHIP[0] + 0.2, NIGHT))
function bed(x) {
  box(x, 150, 1290, 780, 120, '#5a4a8a', { bw: 8, hi: '#7a6aaa' })
  box(x, 150, 1220, 200, 80, BONE, { bw: 6 })
  R4(x)
}
const R4 = x => { x.fillStyle = INK; x.fillRect(160, 1410, 30, 90); x.fillRect(890, 1410, 30, 90) }
function confetti(x, t) {
  if (t > WHIP[0] + 0.3) return
  const C = [GOLD, PINK, MINT, '#7fd0ff']
  for (let i = 0; i < 26; i++) {
    const ph = ((t * 0.7 + i * 0.137) % 1 + 1) % 1
    x.fillStyle = C[i % 4]; x.save(); x.translate(120 + (i * 151) % 860 + 30 * Math.sin(t * 3 + i), 380 + ph * 900); x.rotate(t * 5 + i); x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
const EP = makeWM({
  id: 'kwme09', dur: 9, sign: 'sagittarius', turn: TURN, brk: 'whip',
  hook: '*Loving* being single | until 2 a.m.',
  last: 'it’s a 2 a.m. thing.',
  hero: H, wash: '#6a3ab0',
  heroOpts: (t) => t < WHIP[0] + 0.4 ? { mood: 'happy', look: [0, -1], hops: [-0.2, 0.5, 1.0], squash: -0.08, tilt: -0.1 } : { mood: t < NIGHT ? 'wide' : 'neutral', look: [1, 1], tilt: 0.05 },
  back(x, t) {
    bed(x)
    // the clock
    const ck = clockAt(t), wob = t > WHIP[0] && t < WHIP[1] ? 0.1 * Math.sin(t * 40) : 0
    x.save(); x.translate(800, 560); x.rotate(wob); box(x, -150, -64, 300, 128, '#14102a', { bw: 8 }); label(x, ck, 0, 4, { size: 74, col: t > WHIP[1] ? '#ff5c8e' : MINT, font: "'Space Mono', monospace", weight: 700, stroke: null }); label(x, ck === '11:58' ? 'PM' : ck.startsWith('1') && ck !== '1:00' ? 'PM' : 'AM', 118, -44, { size: 22, col: BONE, stroke: null }); x.restore()
    confetti(x, t)
  },
  front(x, t) {
    const d = dark(t)
    if (d > 0) { x.save(); x.globalAlpha = 0.55 * d; x.fillStyle = '#0a1240'; x.fillRect(-400, -400, 1900, 2800); x.restore() }
    const b = ease.outCubic(prog(t, NIGHT - 0.3, NIGHT + 0.2))
    if (b > 0) {
      box(x, 200, lerp(1500, 1235, b), 700, 260, '#4a7ad8', { bw: 8, hi: '#6a9af0' })
      phone(x, 720, lerp(1500, 1190, b), { w: 120, h: 200, rot: -0.35, screen: '#cfe0ff' })
      glow(x, H.x + 40, H.y - 40, 300, '#cfe0ff', 0.35 * b)
    }
    const k = pop01(t, -0.3, 0.3, 2.5) * clamp(1 - prog(t, WHIP[0], WHIP[0] + 0.2))
    if (k > 0.01) label(x, 'SINGLE & THRIVING', 470, 760, { size: 56 * k, col: GOLD, rot: -0.06 })
  },
  cues: [['glitter', 0.0, 0.8], ...[0, 1, 2, 3].map(i => ['tick', +(WHIP[0] + i * 0.25).toFixed(2), 0.06]), ['whoosh', WHIP[0], 1.0, 0.04], ['boom', NIGHT - 0.1, 0.1], ['pluck', NIGHT, 1318.51, 0.02, 0.6, 0.3]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'lofi', key: 'Db', seed: 2609 })
