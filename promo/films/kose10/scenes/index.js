// kose10 — OVERTHINKING SIMULATOR, Ep 10: "A 4-second voice note" (16 s vertical, star_talk, jazzy · Bb). Hard cut.
//   0.0  FRAME 0: Capricorn mid-recoil from a glowing unplayed voice note (0:04), steam; hook on screen.
//   0.4  record scratch + freeze "it’s been *two hours.*"  2.2–8.8 three predictions, DELETED.  9.0 a 3-2-1 countdown,
//   10.4 PLAY: "goodnight!"  14.2 "It said “goodnight”. | That’s it."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, richText } from '../../kose01/scenes/simkit.js'
const CRUSH = 'libra'
const voice = (playAt) => (x, t, R, k) => {
  const cx = R.x + R.w / 2, cy = R.y + R.h / 2 - 20, w = 700, h = 170
  const glow = 0.5 + 0.5 * Math.sin(t * 6)
  x.save(); x.shadowColor = GOLD; x.shadowBlur = playAt ? 10 : 30 + 20 * glow
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); x.fillStyle = '#d9cdf5'; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.restore()
  x.fillStyle = INK; x.fillRect(cx - w / 2 + 30, cy - 55, 110, 110); icon(x, 'play', cx - w / 2 + 88, cy, 13, { cols: { W: GOLD } })
  const p = playAt ? Math.min(1, Math.max(0, (t - playAt) / 1.2)) : 0
  for (let i = 0; i < 28; i++) { const hh = 20 + 70 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)); x.fillStyle = i / 28 < p ? '#7a3cff' : '#5b4a8a'; x.fillRect(cx - w / 2 + 170 + i * 17, cy - hh / 2, 10, hh) }
  x.font = `700 32px 'Space Mono', monospace`; x.fillStyle = INK; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(playAt ? `0:0${Math.min(4, Math.floor(p * 4))}` : '0:04', cx + w / 2 - 20, cy + h / 2 - 26)
  x.font = `700 30px 'Space Mono', monospace`; x.fillStyle = playAt ? GREEN2 : RED; x.textAlign = 'center'; x.fillText(playAt ? 'PLAYING' : 'UNPLAYED · 2 HRS', cx, cy + h / 2 + 50)
  if (playAt && t > playAt + 0.3) richText(x, '“good*night!*”', cx, cy + h / 2 + 100, { size: 92, acc: GOLD })
}
const GREEN2 = '#7ff0a0'
export const CFG = {
  ep: 10, sign: 'capricorn', duration: 16, ending: 'cut',
  hook: '4-second voice note. | *Unplayed.* Two hours.',
  hookSize: 96,
  heads: [
    { t: 2.15, text: 'Predicting the | *four seconds…*', color: GOLD },
    { t: 8.8, text: 'Pressing | *play…*', color: PINK },
    { t: 14.2, text: 'It said “goodnight”. | *That’s it.*', color: GOLD, slam: true, size: 94 },
  ],
  bar: { label: 'Bracing for impact…', keys: [[0, 17], [0.4, 17], [2.2, 24], [8.8, 99]], err: [[0, 0.4]], labels: [[0, 'Bracing for impact…'], [10.4, 'Playing…']] },
  panels: [
    { t0: -1, t1: 2.15, kind: 'custom', draw: voice(null) },
    { t0: 2.2, t1: 4.4, kind: 'theory', chip: 'PREDICTION 1/3', title: 'A *breakup.* | (Very efficient.)', size: 54, scene: { items: [{ sign: CRUSH, x: 0.36, y: 0.7, s: 190, mood: 'neutral' }, { icon: 'broken', x: 0.66, y: 0.64, cell: 13 }] } },
    { t0: 4.4, t1: 6.6, kind: 'theory', chip: 'PREDICTION 2/3', title: 'They *sang.* | Four seconds of song.', size: 54, scene: { items: [{ sign: CRUSH, x: 0.36, y: 0.7, s: 190, mood: 'happy' }, { icon: 'note', x: 0.62, y: 0.6, cell: 12, bob: 1 }, { icon: 'note', x: 0.76, y: 0.7, cell: 9, bob: 1 }] } },
    { t0: 6.6, t1: 8.8, kind: 'theory', chip: 'PREDICTION 3/3', title: 'A *sneeze.* | Sent by accident.', size: 54, scene: { items: [{ sign: CRUSH, x: 0.36, y: 0.7, s: 190, mood: 'squint', squash: 0.15 }, { icon: 'cloud', x: 0.68, y: 0.6, cell: 12, wob: 1 }] } },
    { t0: 8.85, t1: 10.35, kind: 'custom', draw: voice(null) },
    { t0: 10.4, t1: 17, kind: 'custom', keep: true, draw: voice(10.4) },
  ],
  kit: [{ kind: 'countdown', o: { at: 9.0, from: 3, gap: 0.42, go: 'PLAY', y: 1000 } }],
  says: [
    { t: 0.8, who: 'sign', text: 'four seconds can hold A LOT.', d: 1.4 },
    { t: 6.9, who: 'sup', text: 'bless you??', d: 1.3 },
    { t: 12.0, who: 'sign', text: 'goodnight. GOODNIGHT. ok.', d: 1.8 },
    { t: 12.6, who: 'sup', text: 'that’s so sweet', d: 1.5 },
  ],
  moods: [[0, 'wide', [0.6, -1]], [2.2, 'wide', [0.4, -1]], [4.4, 'squint', [0.4, -1]], [8.8, 'wide', [0.4, -1]], [10.6, 'sparkle'], [12.0, 'happy']],
  squash: [[0, -0.12], [0.4, 0]], steam: [[0, 0.4], [6.6, 8.8]], panic: [[0, 0.4]],
  signAt: t => t < 0.4 ? { x: 222, y: 1630, s: 320 } : { x: 262, y: 1610, s: 320 },
  sup: { moods: [[0, 'wide'], [10.8, 'sparkle'], [12.6, 'happy']], tears: [[0, 2], [10.8, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.4, kind: 'scratch', d: 1.3, caption: 'it’s been *two hours.*', top: 1470 }, { t: 10.4, kind: 'whip', from: 1.15 }],
  music: { style: 'jazzy', key: 'Bb', seed: 810, drop: 1.8, sections: { breakdown: [8.8], lift: [10.4] }, hits: [10.4] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
