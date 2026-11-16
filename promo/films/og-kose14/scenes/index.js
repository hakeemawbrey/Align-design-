// og-kose14: social rework of kose14 (Overthinking Simulator, "Their friend followed me"). Static HOOK (box) 0–2.25 replaces
// the animated hook; no series bug, no whips/shake, no slam title, no loop back (ends on the couch translation); crazier Gemini.
// The kit is a local copy (scenes/simkit.js) laid out inside the app's safe zones.
//   0.0  HOOK over Gemini under a blaring NEW FOLLOWER alert.  2.35–7.4 the investigation board (red string).
//   7.5 the reveal: the friend and the crush on a couch: "they’re SO nice".  10.4 "Translation: they talk | about you. Nicely."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText, bubble } from './simkit.js'
export const HOOK = 'Their best friend | *followed me.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.25
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
  for (const n of notes) if (t > n[3]) { const [a, b] = pos(n); x.save(); x.translate(a, b); x.rotate(-0.05); x.fillStyle = '#fff1a8'; x.fillRect(-160, -40, 320, 80); richText(x, n[2], 0, -20, { size: 31, color: INK, acc: RED, shadow: false, maxW: 310 }); x.restore() }
}
function couch(x, t, R) {
  const fy = R.y + R.h * 0.72
  x.fillStyle = '#7a3cff'; x.fillRect(R.x + 120, fy - 40, R.w - 240, 120); x.fillRect(R.x + 90, fy - 140, R.w - 180, 110); x.fillStyle = '#5a2ccc'; x.fillRect(R.x + 90, fy + 80, 50, 50); x.fillRect(R.x + R.w - 140, fy + 80, 50, 50)
  drawSign(x, t, FRIEND, { x: R.x + 300, y: fy - 140, s: 200 }, { mood: 'happy', look: [1, 0], seed: 5 })
  drawSign(x, t, CRUSH, { x: R.x + R.w - 300, y: fy - 140, s: 200 }, { mood: t > 9.2 ? 'heart' : 'happy', look: [-1, 0], seed: 6 })
  richText(x, 'MEANWHILE, *on a couch*', R.x + R.w / 2, R.y + 26, { size: 46, acc: GOLD })
  bubble(x, t, { t0: 7.8, d: 99, text: 'they’re SO nice', cx: R.x + 230, cy: R.y + 140, size: 34, tail: 'down', tailX: 60 })
  bubble(x, t, { t0: 8.9, d: 99, text: 'I KNOW. I talk about them all the time', cx: R.x + R.w - 250, cy: R.y + 150, size: 30, tail: 'down', maxW: 340, tailX: -40 })
}
export const CFG = {
  sign: 'gemini', duration: 14, ending: 'cut',
  hook: '',
  heads: [
    { t: 2.3, text: 'Opening an | *investigation…*', color: RED },
    { t: 7.45, text: 'The | *truth:*', color: GOLD },
    { t: 10.4, text: 'Translation: they talk | *about you. Nicely.*', color: GOLD, size: 76 },
  ],
  bar: { label: 'Investigating…', keys: [[0, 61], [0.3, 61], [2.35, 66], [7.4, 99]], err: [[0, 0.3]], labels: [[0, 'Investigating…'], [2.35, 'Buying more red string…'], [7.5, 'Case closed: cute']] },
  panels: [
    { t0: -1, t1: 2.3, kind: 'custom', draw: alert },
    { t0: 2.35, t1: 7.4, kind: 'custom', draw: board },
    { t0: 7.5, t1: 15, kind: 'custom', keep: true, draw: couch },
  ],
  stamps: [{ t: 6.2, d: 1.1, text: 'CASE OPEN', color: RED, y: 820 }],
  says: [
    { t: 0.5, who: 'sign', text: 'the BEST friend. both of me are screaming.', d: 1.6 },
    { t: 3.4, who: 'sign', text: 'I have two theories. per brain.', d: 1.4 },
    { t: 5.4, who: 'sup', text: 'is that… ALL the red string?', d: 1.5 },
    { t: 11.0, who: 'sign', text: 'all the time?? telling everyone. both of me.', d: 2.0 },
  ],
  moods: [[0, 'wide', [0.4, -1]], [2.0, 'squint', [0.4, -1]], [4.8, 'wide', [0.4, -1]], [7.5, 'wide', [0.5, -1]], [9.0, 'heart']],
  squash: [[0, -0.12], [0.4, 0]], panic: [[0, 0.3]], steam: [[0, 0.3], [4.8, 7.4]],
  signAt: t => ({ x: 262, y: t < 0.35 ? 1570 : 1610, s: 320 }),
  sup: { moods: [[0, 'wide'], [8.0, 'sparkle']], tears: [[0, 2], [8.0, 3]] },
  fx: [],
  music: { style: 'pop', key: 'G', seed: 814, drop: 2.0, sections: { lift: [7.5] }, hits: [9.0], outro: 0.6 },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
