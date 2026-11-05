// kwme06: WAIT, THAT'S ME, "Practicing my “oh, hey” in the mirror" (9 s loop, star_advice trial, music: funk · G).
//   0.00  frame 0: ♌ Leo mid-wave at a mirror, TAKE 1 already slapped on; hook on.  0.32 scratch + freeze.
//   1.1 "oh, hey" · 2.1 TAKE 2 "OH. hey." · 3.1 TAKE 3 "hey ;)" (wink).  3.7–5.0 the crush strolls past BEHIND Leo.
//   5.2–6.7  the slow turn.  6.8  last line: "take four, then."   8.55–9 loop back.
import { makeWM, wmMusic, box, label, bubble, drawStarChar, signStar, pop01, outK, prog, lerp, GOLD, INK, BONE } from '../../kwme01/wmkit.js'

const H = { x: 320, y: 1210, s: 400, face: 1 }
const M = { x: 790, y: 1040, w: 330, h: 560 }
const TAKES = [-0.4, 2.1, 3.1], LINES = ['oh, hey', 'OH. hey.', 'hey ;)'], PASS = [3.7, 5.0], TURN = 5.2
const LEO = signStar('leo'), CRUSH = signStar('libra')
const take = t => TAKES.filter(v => v <= t).length - 1
function mirror(x, t) {
  box(x, M.x - M.w / 2, M.y - M.h / 2, M.w, M.h, '#2b2450', { bw: 12, ink: '#c49a6c' })
  x.save(); x.beginPath(); x.rect(M.x - M.w / 2, M.y - M.h / 2, M.w, M.h); x.clip()
  const g = x.createLinearGradient(M.x - M.w / 2, 0, M.x + M.w / 2, 0); g.addColorStop(0, 'rgba(180,200,255,0.18)'); g.addColorStop(1, 'rgba(180,200,255,0.05)'); x.fillStyle = g; x.fillRect(M.x - M.w / 2, M.y - M.h / 2, M.w, M.h)
  const i = Math.max(0, take(t))
  drawStarChar(x, M.x + 20, M.y + 90, 260, t, { color: LEO.color, mood: i === 2 ? 'wink' : 'happy', look: [-1, 0], seed: 4, hops: TAKES.map(v => v + 0.1) })
  x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(M.x - 120, M.y - M.h / 2 - 40, 30, M.h + 80)
  x.restore()
}
const EP = makeWM({
  id: 'kwme06', dur: 9, sign: 'leo', turn: TURN, brk: 'scratch',
  hook: 'Practicing my *“oh, hey”* | in the mirror',
  last: 'take four, then.',
  hero: H, wash: '#b06a2f',
  heroOpts: (t) => ({ mood: t > PASS[0] + 0.4 && t < TURN ? 'wide' : take(t) === 2 ? 'wink' : 'happy', look: [1, 0], hops: TAKES.map(v => v + 0.1), tilt: 0.05 }),
  back(x, t) {
    // the crush strolls past in the background, totally unbothered
    const p = prog(t, ...PASS)
    if (p > 0 && p < 1) drawStarChar(x, lerp(-160, 1240, p), 860, 230, t, { color: CRUSH.color, mood: 'happy', look: [1, 0], seed: 9, hops: [3.9, 4.25, 4.6, 4.95] })
    mirror(x, t)
  },
  front(x, t) {
    TAKES.forEach((v, i) => {
      const k = pop01(t, v, 0.25, 2.6) * outK(t, [TAKES[i + 1] ?? TURN, (TAKES[i + 1] ?? TURN) + 0.06])
      if (k > 0.01) { x.save(); x.translate(250, 640); x.rotate(-0.08); x.scale(k, k); box(x, -120, -44, 240, 88, INK, { bw: 6, ink: BONE }); label(x, `TAKE ${i + 1}`, 0, 2, { size: 50, col: GOLD, stroke: null }); x.restore() }
      bubble(x, t, 420, 860, Math.max(v + 0.25, 0.9 * (i === 0)), (TAKES[i + 1] ?? PASS[0] + 0.3) - 0.05, LINES[i], { size: 44, tail: -0.2 })
    })
    const pk = pop01(t, PASS[0] + 0.45, 0.25, 2.4) * outK(t, [TURN, TURN + 0.15])
    if (pk > 0.01) label(x, '…the crush??', 700, 640, { size: 46 * pk, col: '#ff8fb1' })
  },
  cues: [...TAKES.slice(1).map(v => ['clap', v, { gain: 0.16 }]), ...TAKES.map((v, i) => ['pop', Math.max(0.9, v + 0.25), 880 + i * 110, 0.04, -0.2]), ['whoosh', PASS[0], 1.2, 0.02], ['pop', PASS[0] + 0.45, 1318.51, 0.05, 0.2], ['pop', PASS[0] + 0.52, 1567.98, 0.04, 0.2]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'funk', key: 'G', seed: 2606 })
