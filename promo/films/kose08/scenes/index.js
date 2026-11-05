// kose08 — OVERTHINKING SIMULATOR, Ep 8: "Liked an old photo" (16 s vertical, star_talk, synthwave · F#m). Hard cut.
//   0.0  FRAME 0: Sagittarius mid-fall, a heart popping on a photo from 3 YEARS AGO; hook on screen.
//   0.35 red flash + shake.  2.0 DAMAGE REPORT fills.  4.0–10.0 three escape plans, DELETED.
//   10.2 "haha I saw that. hi :)"  14.2 "Damage report: | they said hi back."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText, pop01 } from '../../kose01/scenes/simkit.js'
const CRUSH = 'gemini'
function photo(x, t, R, k) {
  const cx = R.x + R.w / 2, cy = R.y + R.h / 2 - 10, w = 470, h = 520
  x.save(); x.translate(cx, cy); x.rotate(-0.04)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = '#f4ead8'; x.fillRect(-w / 2, -h / 2, w, h)
  const g = x.createLinearGradient(0, -h / 2 + 24, 0, h / 2 - 110); g.addColorStop(0, '#6aa8ff'); g.addColorStop(1, '#ffc39a'); x.fillStyle = g; x.fillRect(-w / 2 + 24, -h / 2 + 24, w - 48, h - 140)
  drawSign(x, t, CRUSH, { x: 0, y: 10, s: 210 }, { mood: 'happy', seed: 9 })
  x.font = `700 30px 'Space Mono', monospace`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('posted 3 YEARS AGO', 0, h / 2 - 60)
  x.restore()
  const hk = Math.max(pop01(t, -0.4, 0.35, 3), 0)
  icon(x, 'heart', cx + 170, cy + 150, 22 * hk)
  x.font = `800 40px Inter`; x.fillStyle = RED; x.textAlign = 'center'; x.fillText('LIKED', cx + 170, cy + 250)
}
export const CFG = {
  ep: 8, sign: 'sagittarius', duration: 16, ending: 'cut',
  hook: 'Accidentally liked their | *OLD* photo.',
  heads: [
    { t: 1.95, text: 'Assessing the | *damage…*', color: RED },
    { t: 3.95, text: 'Planning an | *escape…*', color: GOLD },
    { t: 14.2, text: 'Damage report: | *they said hi back.*', color: GOLD, slam: true, size: 92 },
  ],
  bar: { label: 'Unliking at light speed…', keys: [[0, 3], [2, 3], [10, 99]], err: [[0, 0.5], [1.5, 2.0]], labels: [[0, 'Unliking at light speed…'], [10.2, 'New message']] },
  panels: [
    { t0: -1, t1: 1.95, kind: 'custom', draw: photo },
    { t0: 2.0, t1: 3.95, kind: 'meter', label: 'DAMAGE *REPORT*', keys: [[2.0, 0], [3.4, 100]], col: RED, fmt: v => `${Math.round(v)}% seen` },
    { t0: 4.0, t1: 6.0, kind: 'theory', chip: 'ESCAPE PLAN 1/3', title: 'Change my *name.*', scene: { items: [{ sign: 'sagittarius', x: 0.36, y: 0.66, s: 190, mood: 'squint' }, { text: 'HELLO my name is | *Not Me*', x: 0.7, y: 0.5, size: 36, maxW: 300 }] } },
    { t0: 6.0, t1: 8.0, kind: 'theory', chip: 'ESCAPE PLAN 2/3', title: 'Move to a | *new city.*', size: 54, scene: { items: [{ sign: 'sagittarius', x: 0.36, y: 0.68, s: 190, mood: 'wide' }, { icon: 'bag', x: 0.62, y: 0.7, cell: 11 }, { icon: 'plane', x: 0.78, y: 0.5, cell: 12, bob: 1 }] } },
    { t0: 8.0, t1: 10.0, kind: 'theory', chip: 'ESCAPE PLAN 3/3', title: 'Become a | *lighthouse keeper.*', size: 54, scene: { items: [{ sign: 'sagittarius', x: 0.36, y: 0.68, s: 190, mood: 'sparkle' }, { icon: 'house', x: 0.7, y: 0.62, cell: 16 }] } },
    { t0: 10.25, t1: 17, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 10.3, side: 'L', text: 'haha I saw that. hi :)', col: '#bff5cf', size: 56 },
      { at: 11.6, side: 'R', text: 'hi!! that photo is a classic' },
      { at: 12.7, side: 'L', text: 'my hair was a CHOICE', col: '#bff5cf' },
    ] },
  ],
  notifs: [{ t: 10.2, d: 2.0, from: 'THEM · now', text: 'haha I saw that. hi :)', sign: CRUSH }],
  says: [
    { t: 0.75, who: 'sign', text: 'I was just SCROLLING. very fast. very far.', d: 1.9 },
    { t: 8.4, who: 'sup', text: 'can I visit the lighthouse', d: 1.5 },
    { t: 13.1, who: 'sup', text: 'they said hi!!', d: 1.4 },
  ],
  moods: [[0, 'wide', [0.6, -1]], [2.0, 'wide', [0.4, -1]], [4.0, 'squint', [0.4, -1]], [8.0, 'sparkle'], [10.2, 'wide', [0.5, -1]], [11.0, 'happy'], [12.8, 'happy']],
  squash: [[0, 0.24], [0.5, 0]], steam: [[0, 0.6], [2.0, 4.0]], panic: [[0, 0.5], [3.2, 4.0]],
  signAt: t => t < 0.5 ? { x: 262 - 40 * (1 - t / 0.5), y: 1650 - 40 * (t / 0.5), s: 320 } : { x: 262, y: 1610, s: 320 },
  sup: { moods: [[0, 'wide'], [10.6, 'sparkle'], [12.8, 'happy']], tears: [[0, 2], [3.2, 3], [10.6, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.35, kind: 'flash', color: '#ff3b4e', d: 0.25 }, { t: 0.37, kind: 'shake', d: 0.45 }, { t: 10.2, kind: 'whip', from: 1.15 }],
  music: { style: 'synthwave', key: 'F#m', seed: 808, drop: 0.35, sections: { breakdown: [8.0], lift: [10.2] }, hits: [10.2] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
