// kose14 — OVERTHINKING SIMULATOR, Ep 14: "Their friend followed me" (14 s vertical, star_talk, pop · G). Seamless loop.
//   0.0  FRAME 0: Gemini mid-jump under a blaring NEW FOLLOWER alert; hook on screen.  0.3 whip.
//   2.0–7.4 the investigation board (red string): why now? what did they say? is this a test?  7.5 the reveal: the friend
//   and the crush on a couch: "they’re SO nice".  10.4 "Translation: they talk | about you. Nicely."  13.55 loop.
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText, bubble } from '../../kose01/scenes/simkit.js'
const CRUSH = 'virgo', FRIEND = 'aries'
function alert(x, t, R) {
  const on = Math.floor(t * 6) % 2 === 0
  x.fillStyle = on ? 'rgba(255,59,78,0.25)' : 'rgba(255,59,78,0.08)'; x.fillRect(R.x, R.y, R.w, R.h)
  richText(x, 'NEW *FOLLOWER*', R.x + R.w / 2, R.y + 60, { size: 76, acc: RED })
  drawSign(x, t, FRIEND, { x: R.x + R.w / 2, y: R.y + 360, s: 230 }, { mood: 'happy', seed: 5 })
  richText(x, 'their *best friend*', R.x + R.w / 2, R.y + 520, { size: 48, acc: GOLD })
}
function board(x, t, R) {
  x.fillStyle = '#6b4a2f'; x.fillRect(R.x + 20, R.y + 20, R.w - 40, R.h - 40); x.fillStyle = '#8a6440'; x.fillRect(R.x + 34, R.y + 34, R.w - 68, R.h - 68)
  const P = [[0.5, 0.33, FRIEND, 2.1], [0.2, 0.7, CRUSH, 2.3], [0.8, 0.72, 'gemini', 2.5]]
  const notes = [[0.22, 0.25, 'Why *now?*', 2.7], [0.78, 0.27, 'What did they *SAY?*', 3.7], [0.5, 0.86, 'Is this a *TEST?*', 4.8]]
  const pos = ([u, v]) => [R.x + u * R.w, R.y + v * R.h]
  x.strokeStyle = RED; x.lineWidth = 5
  const pts = [...P, ...notes].filter(p => t > p[3] + 0.2).map(pos)
  x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); if (pts.length > 2) x.closePath(); x.stroke()
  for (const p of P) if (t > p[3]) { const [a, b] = pos(p); x.fillStyle = '#f4ead8'; x.fillRect(a - 90, b - 90, 180, 190); drawSign(x, t, p[2], { x: a, y: b, s: 140 }, { mood: 'neutral', seed: 30 }) ; x.fillStyle = RED; x.fillRect(a - 8, b - 98, 16, 16) }
  for (const n of notes) if (t > n[3]) { const [a, b] = pos(n); x.save(); x.translate(a, b); x.rotate(-0.05); x.fillStyle = '#fff1a8'; x.fillRect(-160, -40, 320, 80); richText(x, n[2], 0, -24, { size: 36, color: INK, acc: RED, shadow: false, maxW: 300 }); x.restore() }
}
function couch(x, t, R) {
  const fy = R.y + R.h * 0.72
  x.fillStyle = '#7a3cff'; x.fillRect(R.x + 120, fy - 40, R.w - 240, 120); x.fillRect(R.x + 90, fy - 140, R.w - 180, 110); x.fillStyle = '#5a2ccc'; x.fillRect(R.x + 90, fy + 80, 50, 50); x.fillRect(R.x + R.w - 140, fy + 80, 50, 50)
  drawSign(x, t, FRIEND, { x: R.x + 300, y: fy - 140, s: 200 }, { mood: 'happy', look: [1, 0], seed: 5 })
  drawSign(x, t, CRUSH, { x: R.x + R.w - 300, y: fy - 140, s: 200 }, { mood: t > 9.2 ? 'heart' : 'happy', look: [-1, 0], seed: 6 })
  richText(x, 'MEANWHILE, *on a couch*', R.x + R.w / 2, R.y + 26, { size: 46, acc: GOLD })
  bubble(x, t, { t0: 7.8, d: 99, text: 'they’re SO nice', cx: R.x + 310, cy: R.y + 150, size: 34, tail: 'down' })
  bubble(x, t, { t0: 8.9, d: 99, text: 'I KNOW. I talk about them all the time', cx: R.x + R.w - 300, cy: R.y + 250, size: 30, tail: 'down', maxW: 340 })
}
export const CFG = {
  ep: 14, sign: 'gemini', duration: 14, ending: 'loop',
  hook: 'Their best friend | followed you. *ALERT.*',
  heads: [
    { t: 1.95, text: 'Opening an | *investigation…*', color: RED },
    { t: 7.45, text: 'The | *truth:*', color: GOLD },
    { t: 10.4, text: 'Translation: they talk | *about you. Nicely.*', color: GOLD, slam: true, size: 88 },
  ],
  bar: { label: 'Investigating…', keys: [[0, 61], [0.3, 61], [2, 66], [7.4, 99]], err: [[0, 0.3]], labels: [[0, 'Investigating…'], [7.5, 'Case closed: cute']] },
  panels: [
    { t0: -1, t1: 1.95, kind: 'custom', draw: alert },
    { t0: 2.0, t1: 7.4, kind: 'custom', draw: board },
    { t0: 7.5, t1: 15, kind: 'custom', keep: true, draw: couch },
  ],
  stamps: [{ t: 6.2, d: 1.1, text: 'CASE OPEN', color: RED, y: 820 }],
  says: [
    { t: 0.6, who: 'sign', text: 'the BEST friend. this is huge.', d: 1.3 },
    { t: 5.4, who: 'sup', text: 'you used the red string', d: 1.5 },
    { t: 11.0, who: 'sign', text: 'all the time?? ALL the time?', d: 1.7 },
  ],
  moods: [[0, 'wide', [0.4, -1]], [2.0, 'squint', [0.4, -1]], [4.8, 'wide', [0.4, -1]], [7.5, 'wide', [0.5, -1]], [9.0, 'heart'], [13.3, 'wide', [0.4, -1]]],
  squash: [[0, -0.12], [0.4, 0], [13.4, -0.12]], panic: [[0, 0.3], [13.55, 15]], steam: [[0, 0.3], [4.8, 7.4], [13.55, 15]],
  signAt: t => ({ x: 262, y: (t < 0.35 || t > 13.55) ? 1570 : 1610, s: 320 }),
  sup: { moods: [[0, 'wide'], [8.0, 'sparkle'], [13.3, 'wide']], tears: [[0, 2], [8.0, 3], [13.3, 2]] },
  fx: [{ t: 0.3, kind: 'whip', from: 1.3 }, { t: 6.2, kind: 'shake', d: 0.3 }, { t: 7.5, kind: 'whip', from: 1.2 }],
  music: { style: 'pop', key: 'G', seed: 814, drop: 2.0, sections: { lift: [7.5] }, hits: [9.0], outro: 0.6 },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
