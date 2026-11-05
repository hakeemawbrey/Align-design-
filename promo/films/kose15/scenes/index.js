// kose15 — OVERTHINKING SIMULATOR, Ep 15: "Who texts first?" (16 s vertical, star_talk, chiptune · C). Hard cut.
//   0.0  FRAME 0: Scorpio mid-pace, a PLAYER 1 vs PLAYER 2 screen, thumbs hovering; hook on screen.  0.4 a 3-2-1 countdown.
//   2.4–8.4 three strategies, DELETED.  8.6 back to the VS screen: both thumbs press at the same second (10.0): TIE GAME +
//   achievement.  11.2 both "had the best time tonight".  14.2 "Both texted at once. | Tie game."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText } from '../../kose01/scenes/simkit.js'
const CRUSH = 'taurus'
const vs = (pressAt) => (x, t, R) => {
  const cx = R.x + R.w / 2
  x.fillStyle = 'rgba(255,59,78,0.12)'; x.fillRect(R.x, R.y, R.w / 2, R.h); x.fillStyle = 'rgba(127,227,255,0.12)'; x.fillRect(cx, R.y, R.w / 2, R.h)
  x.font = `700 34px 'Space Mono', monospace`; x.textBaseline = 'middle'; x.textAlign = 'center'
  x.fillStyle = RED; x.fillText('PLAYER 1', R.x + R.w / 4, R.y + 50); x.fillStyle = CYAN; x.fillText('PLAYER 2', R.x + 3 * R.w / 4, R.y + 50)
  drawSign(x, t, 'scorpio', { x: R.x + R.w / 4, y: R.y + 270, s: 210 }, { mood: pressAt && t > pressAt ? 'sparkle' : 'squint', seed: 3 })
  drawSign(x, t, CRUSH, { x: R.x + 3 * R.w / 4, y: R.y + 270, s: 210 }, { mood: pressAt && t > pressAt ? 'sparkle' : 'squint', seed: 4 })
  richText(x, 'VS', cx, R.y + 230, { size: 96, color: GOLD })
  for (const [px, col] of [[R.x + R.w / 4, RED], [R.x + 3 * R.w / 4, CYAN]]) {
    const pressed = pressAt && t > pressAt
    x.fillStyle = INK; x.fillRect(px - 110, R.y + 460, 220, 90); x.fillStyle = pressed ? '#7ff0a0' : col; x.fillRect(px - 104, R.y + 466 + (pressed ? 8 : 0), 208, 78 - (pressed ? 8 : 0))
    x.font = `800 36px Inter`; x.fillStyle = INK; x.fillText(pressed ? 'SENT!' : 'SEND?', px, R.y + 507 + (pressed ? 4 : 0))
    const hov = pressed ? 0 : 20 + 14 * Math.sin(t * 7)
    icon(x, 'star', px + 60, R.y + 440 - hov, 7)
  }
}
export const CFG = {
  ep: 15, sign: 'scorpio', duration: 16, ending: 'cut',
  hook: 'Great date. Who texts | first? *COMPUTING.*',
  heads: [
    { t: 2.35, text: 'Choosing a | *strategy…*', color: GOLD },
    { t: 8.55, text: 'Final | *round.*', color: RED },
    { t: 14.2, text: 'Both texted at once. | *Tie game.*', color: GOLD, slam: true },
  ],
  bar: { label: 'Computing the move…', keys: [[0, 38], [0.4, 38], [2.4, 45], [8.4, 99]], err: [[0, 0.4]], labels: [[0, 'Computing the move…'], [10.0, 'Move: made (by both)']] },
  panels: [
    { t0: -1, t1: 2.35, kind: 'custom', draw: vs(null) },
    { t0: 2.4, t1: 4.4, kind: 'theory', chip: 'STRATEGY 1/3', title: 'Wait *3 hours.* | Look chill.', size: 56, scene: { items: [{ sign: 'scorpio', x: 0.36, y: 0.7, s: 180, mood: 'squint' }, { icon: 'clock', x: 0.66, y: 0.64, cell: 13, wob: 1 }] } },
    { t0: 4.4, t1: 6.4, kind: 'theory', chip: 'STRATEGY 2/3', title: 'Wait *3 days.* | Look very chill.', size: 56, scene: { items: [{ sign: 'scorpio', x: 0.36, y: 0.7, s: 180, mood: 'sleepy' }, { icon: 'cal', x: 0.66, y: 0.64, cell: 13 }] } },
    { t0: 6.4, t1: 8.4, kind: 'theory', chip: 'STRATEGY 3/3', title: 'Wait *3 years.* | Look… gone.', size: 56, scene: { items: [{ icon: 'ghost', x: 0.5, y: 0.66, cell: 15, bob: 1 }] } },
    { t0: 8.6, t1: 11.2, kind: 'custom', draw: vs(10.0) },
    { t0: 11.25, t1: 17, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 11.3, side: 'R', text: 'had the best time tonight', size: 50 },
      { at: 11.3, side: 'L', text: 'had the best time tonight', size: 50, col: '#bff5cf' },
      { at: 12.4, side: 'R', text: 'JINX' }, { at: 12.6, side: 'L', text: 'JINX', col: '#bff5cf' },
    ] },
  ],
  stamps: [{ t: 10.05, d: 1.1, text: 'TIE GAME', color: GOLD, y: 720 }],
  kit: [
    { kind: 'countdown', o: { at: 0.4, from: 3, gap: 0.4, go: 'GO!', y: 1000 } },
    { kind: 'achievement', o: { at: 10.4, out: [12.4, 12.7], text: 'texted first *(both of you)*', y: 1480 } },
  ],
  says: [
    { t: 2.0, who: 'sign', text: 'if I text first, I lose. right?', d: 1.5 },
    { t: 6.7, who: 'sup', text: 'not three years', d: 1.4 },
    { t: 13.0, who: 'sup', text: 'they JINXED', d: 1.2 },
  ],
  moods: [[0, 'squint', [0.4, -1]], [2.4, 'squint', [0.4, -1]], [6.4, 'wide', [0.4, -1]], [8.6, 'squint', [0.4, -1]], [10.0, 'wide', [0.5, -1]], [10.6, 'heart'], [12.4, 'happy']],
  squash: [[0, 0.1], [0.4, 0]], steam: [[0, 0.5], [6.4, 8.4]], panic: [[0, 0.4]],
  signAt: t => t < 0.4 ? { x: 262 + 60 * Math.sin(t * 8), y: 1610, s: 320 } : { x: 262, y: 1610, s: 320 },
  sup: { moods: [[0, 'wide'], [10.2, 'sparkle'], [12.4, 'happy']], tears: [[0, 2], [10.2, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 10.0, kind: 'shake', d: 0.35 }, { t: 10.0, kind: 'flash', color: '#fff', d: 0.2 }],
  music: { style: 'chiptune', key: 'C', seed: 815, drop: 2.4, sections: { breakdown: [6.4], lift: [8.6] }, hits: [10.0] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
