// kose07 — OVERTHINKING SIMULATOR, Ep 7: "The goodbye wave" (14 s vertical, star_talk, dreamy · F). Seamless loop.
//   0.0  FRAME 0: Taurus mid-cringe, the wave on a sports-replay screen (REPLAY, slow-mo, red circle); hook on screen.
//   0.3  whip zoom.  2.0–8.0 three more angles (side, drone, slow-mo 0.1×), each with a worry.  8.0 the referee review,
//   10.0 VERDICT: FINE.  10.6 "cute wave btw :)".  11.2 "Wave reviewed. | Wave was fine."  13.55 loop.
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, drawSign, richText } from '../../kose01/scenes/simkit.js'
const CRUSH = 'virgo'
function replay(angle, speed, worry, { zoom = 1, top = false } = {}) {
  return (x, t, R, k) => {
    const cx = R.x + R.w / 2, gy = R.y + R.h * 0.78
    x.fillStyle = '#1d1640'; x.fillRect(R.x, gy, R.w, R.h - (gy - R.y))
    x.fillStyle = '#3a2e70'; x.fillRect(R.x + 90, R.y + 120, 150, gy - R.y - 120)      // the door
    x.fillStyle = GOLD; x.fillRect(R.x + 210, R.y + 300, 14, 14)
    const sw = Math.sin(t * (speed < 0.5 ? 2.2 : 6)) * 0.35
    x.save(); x.translate(cx + 60, gy - 30); x.scale(zoom, zoom); x.rotate(sw)
    drawSign(x, t, 'taurus', { x: 0, y: -150, s: 230 }, { mood: 'happy', seed: 7 })
    x.restore()
    x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 6
    for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(cx + 60, gy - 180, 170 + i * 26, -Math.PI / 2 - 0.7, -Math.PI / 2 + 0.7); x.stroke() }
    // replay chrome
    if (Math.floor(t * 3) % 2 === 0) { x.fillStyle = RED; x.fillRect(R.x + 24, R.y + 22, 22, 22) }
    x.font = `700 30px 'Space Mono', monospace`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText(`REPLAY · ${angle}`, R.x + 58, R.y + 34)
    x.textAlign = 'right'; x.fillText(`${speed}×`, R.x + R.w - 24, R.y + 34)
    x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.ellipse(cx + 60, gy - 170, 190, 200, 0.1, 0, Math.PI * 2 * Math.min(1, k)); x.stroke()
    if (worry) { x.fillStyle = INK; x.fillRect(R.x + 40, R.y + R.h - 96, R.w - 80, 74); x.fillStyle = GOLD; x.fillRect(R.x + 46, R.y + R.h - 90, R.w - 92, 62); richText(x, worry, cx, R.y + R.h - 82, { size: 40, color: INK, acc: '#7a1fd6', shadow: false, maxW: R.w - 120 }) }
  }
}
export const CFG = {
  ep: 7, sign: 'taurus', duration: 14, ending: 'loop',
  hook: 'REPLAYING: the goodbye | *wave.* Again.',
  heads: [
    { t: 7.95, text: 'Requesting a | *review…*', color: GOLD },
    { t: 11.2, text: 'Wave reviewed. | *Wave was fine.*', color: GOLD, slam: true },
  ],
  bar: { label: 'Reviewing the wave…', keys: [[0, 64], [0.3, 64], [2, 70], [9.9, 99]], err: [[0, 0.3]], labels: [[0, 'Reviewing the wave…'], [10.0, 'Review complete']] },
  panels: [
    { t0: -1, t1: 2.0, kind: 'custom', draw: replay('ANGLE 1', 0.5, 'Too *enthusiastic?*') },
    { t0: 2.0, t1: 4.0, kind: 'custom', draw: replay('ANGLE 2 · SIDE', 0.5, 'Did it go on *too long?*'), keep: false },
    { t0: 4.0, t1: 6.0, kind: 'custom', draw: replay('ANGLE 3 · DRONE', 0.25, 'Did they even *see it?*', { zoom: 0.7 }) },
    { t0: 6.0, t1: 8.0, kind: 'custom', draw: replay('SLOW-MO', 0.1, 'Why *both* arms?') },
    { t0: 8.0, t1: 10.0, kind: 'scene', title: 'REFEREE *REVIEW*', items: [{ sign: 'star', x: 0.5, y: 0.6, s: 220, mood: 'squint', moods: [[0, 'squint'], [9.4, 'happy']] }, { icon: 'eye', x: 0.75, y: 0.45, cell: 10 }] },
    { t0: 10.0, t1: 15, kind: 'custom', keep: true, draw: replay('FINAL', 1, null) },
  ],
  stamps: [{ t: 10.0, d: 1.2, text: 'VERDICT: | FINE', color: '#7ff0a0', y: 820 }],
  notifs: [{ t: 10.6, d: 2.2, from: 'THEM · now', text: 'cute wave btw :)', sign: CRUSH }],
  says: [
    { t: 2.4, who: 'sign', text: 'they were still talking. I WAVED.', d: 1.9 },
    { t: 6.4, who: 'sup', text: 'it was a nice wave', d: 1.4 },
    { t: 11.6, who: 'sign', text: 'cute?? CUTE wave?', d: 1.5 },
  ],
  moods: [[0, 'squint', [0.4, -1]], [2.0, 'wide', [0.4, -1]], [6.0, 'squint', [0.4, -1]], [8.0, 'wide', [0.4, -1]], [10.0, 'sparkle'], [10.7, 'heart'], [13.3, 'squint', [0.4, -1]]],
  squash: [[0, 0.14], [0.4, 0], [13.4, 0.14]], panic: [[0, 0.3], [13.55, 15]], steam: [[0, 0.3], [13.55, 15]],
  sup: { moods: [[0, 'wide'], [10.0, 'sparkle'], [13.3, 'wide']], tears: [[0, 2], [6.0, 3], [10.0, 3], [13.3, 2]] },
  fx: [{ t: 0.3, kind: 'whip', from: 1.3 }, { t: 10.0, kind: 'shake', d: 0.3 }],
  music: { style: 'dreamy', key: 'F', seed: 807, drop: 2.0, sections: { breakdown: [8.0], lift: [10.0] }, hits: [10.0], outro: 0.6 },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
