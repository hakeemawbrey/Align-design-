// kose19 — OVERTHINKING SIMULATOR, Ep 19 (long): "The day after the date (24-hour simulation)" (60 s vertical, star_talk,
// lofi · D). Hard cut. Promise: "wait for hour 25". Chapters by hour, an HOUR clock top-right, a new beat every ~8 s.
//   0.0  FRAME 0: Capricorn mid-pace, the clock racing, a silent thread after the date; hook on screen.
//   3.0  HOUR 1: the post-date review spreadsheet.  12.0 HOUR 6: rereading the goodbye.  22.0 HOUR 12: seven futures,
//        DELETED one after another.  36.0 HOUR 20: overthinking limit reached, tech support sobs.  46.0 HOUR 24: Capricorn
//        writes first.  53.0 HOUR 25: both messages cross.  58.2 "Hour 25: | “I had the best time.”"
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText } from '../../kose01/scenes/simkit.js'
const CRUSH = 'pisces'
const MONO = "'Space Mono', monospace"
const HOURS = [[0, 0], [3, 1], [12, 6], [22, 12], [36, 20], [46, 24], [53, 25]]
const hourAt = t => { let h = 0; for (const [a, v] of HOURS) if (t >= a) h = v; const nx = HOURS.find(([a]) => a > t); if (!nx) return h; const [a0] = HOURS.filter(([a]) => a <= t).pop(); return Math.floor(h + (nx[1] - h) * Math.max(0, (t - a0 - (nx[0] - a0) * 0.7) / ((nx[0] - a0) * 0.3))) }
const clock = (x, t) => {
  const h = hourAt(t), X = 840, Y = 1880
  x.font = `800 40px Inter`; const s = `HOUR ${h}`, w = x.measureText(s).width + 50
  x.fillStyle = INK; x.fillRect(X - w / 2 - 5, Y - 40, w + 10, 70); x.fillStyle = h >= 25 ? '#7ff0a0' : GOLD; x.fillRect(X - w / 2, Y - 35, w, 60)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y - 4)
}
const sheet = (x, t, R) => {
  richText(x, 'POST-DATE *REVIEW*', R.x + R.w / 2, R.y + 24, { size: 52, acc: GOLD })
  const rows = [['laughed', 'a lot', 4.0], ['goodbye hug', 'yes', 5.4], ['they said “this was fun”', 'yes', 6.8], ['texted since', 'no…', 8.4]]
  rows.forEach(([a, b, t0], i) => { if (t < t0) return; const y = R.y + 150 + i * 110; x.fillStyle = i % 2 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)'; x.fillRect(R.x + 30, y, R.w - 60, 96)
    x.font = `700 36px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(a, R.x + 54, y + 48); x.textAlign = 'right'; x.fillStyle = b === 'no…' ? RED : '#7ff0a0'; x.fillText(b, R.x + R.w - 120, y + 48); icon(x, b === 'no…' ? 'cross' : 'check', R.x + R.w - 70, y + 48, 6) })
}
const FUT = [['They *moved on.* Already.', 'ghost'], ['They’re *shy.*', 'heart'], ['Phone fell in | *the laundry.*', 'phone'], ['They’re waiting | *for ME.*', 'clock'], ['Busy at *work.*', 'bag'], ['Drafting | *a poem.*', 'note'], ['Simply *asleep.*', 'moon']]
export const CFG = {
  ep: 19, sign: 'capricorn', duration: 60, ending: 'cut', draw: { top: clock },
  hook: 'Day after the date. | Silence. *SIMULATE 24h.*', hookSize: 96,
  promise: { t: 0.9, d: 4.2, text: 'wait for hour 25', y: 1810 },
  heads: [
    { t: 2.95, text: 'Reviewing | *the date…*', color: GOLD },
    { t: 11.95, text: 'Rereading | *the goodbye…*', color: PINK },
    { t: 21.95, text: 'Simulating | *every future…*', color: CYAN },
    { t: 35.95, text: 'Limit | *reached.*', color: RED },
    { t: 45.95, text: 'Plan B: | *text first.*', color: '#7ff0a0' },
    { t: 58.2, text: 'Hour 25: | *“I had the best time.”*', color: GOLD, slam: true, size: 92 },
  ],
  chapters: [
    { t: 3.0, n: 1, text: 'HOUR 1', color: GOLD }, { t: 12.0, n: 2, text: 'HOUR 6', color: PINK }, { t: 22.0, n: 3, text: 'HOUR 12', color: CYAN },
    { t: 36.0, n: 4, text: 'HOUR 20', color: RED }, { t: 46.0, n: 5, text: 'HOUR 24', color: '#7ff0a0' },
  ],
  bar: { label: 'Waiting since the date…', keys: [[0, 4], [0.5, 4], [3, 6], [36, 88], [40, 99], [53, 100]], err: [[0, 0.5], [39.5, 42.5]],
    labels: [[0, 'Waiting since the date…'], [12, 'Rereading…'], [22, 'Simulating futures…'], [36, 'Overthinking: maxed'], [46, 'Writing first…'], [53.2, 'Two messages. Same second.']] },
  panels: [
    { t0: -1, t1: 2.95, kind: 'chat', who: CRUSH, title: 'them', msgs: [{ at: -1, side: 'L', text: 'get home safe!' }, { at: -1, side: 'R', text: 'you too :)' }], seen: { at: -1, text: 'last message: 11:48 PM' } },
    { t0: 3.0, t1: 11.95, kind: 'custom', draw: sheet },
    { t0: 12.0, t1: 17.0, kind: 'chat', who: CRUSH, title: 'them · rereading (x40)', msgs: [{ at: 12.1, side: 'L', text: 'get home safe!', size: 60, circle: 13.0 }, { at: 12.4, side: 'R', text: 'you too :)', size: 60, circle: 14.6 }] },
    { t0: 17.0, t1: 21.95, kind: 'theory', chip: 'ANALYSIS', title: 'Was *“you too :)”* | too… casual?', size: 54, scene: { items: [{ sign: 'capricorn', x: 0.5, y: 0.72, s: 190, mood: 'squint' }] } },
    ...FUT.map(([title, ic], i) => ({ t0: 22.0 + i * 2.0, t1: 24.0 + i * 2.0, kind: 'theory', chip: `FUTURE ${i + 1}/7`, title, size: 54, del: 23.35 + i * 2.0, scene: { items: [{ sign: CRUSH, x: 0.36, y: 0.72, s: 170, mood: ['neutral', 'happy', 'wide', 'heart', 'squint', 'sparkle', 'sleepy'][i] }, { icon: ic, x: 0.66, y: 0.64, cell: 12, bob: 1 }] } })),
    { t0: 36.0, t1: 39.5, kind: 'meter', label: 'OVERTHINKING *LEVEL*', keys: [[36, 40], [39, 100]], col: RED, fmt: v => v > 99 ? 'MAXIMUM' : `${Math.round(v)}%` },
    { t0: 39.5, t1: 42.5, kind: 'error', text: 'overthinking | *limit reached.*', ok: 'BREATHE' },
    { t0: 42.5, t1: 45.95, kind: 'scene', title: 'Option: *text first?*', items: [{ sign: 'capricorn', x: 0.5, y: 0.6, s: 240, mood: 'neutral', moods: [[0, 'squint'], [44.2, 'sparkle']] }] },
    { t0: 46.0, t1: 61, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 46.1, side: 'R', text: 'you too :)' },
      { at: 50.4, side: 'R', text: 'I had a great time. want to do it again?', size: 50 },
      { at: 53.2, side: 'L', text: 'I had the best time!! again please', col: '#bff5cf', size: 50 },
    ], typing: [[51.4, 53.2]] },
  ],
  notifs: [{ t: 53.1, d: 2.2, from: 'THEM · same second', text: 'I had the best time!! again please', sign: CRUSH }],
  stamps: [{ t: 54.6, d: 2.0, text: 'SENT AT THE | SAME TIME', color: '#7ff0a0', y: 700 }],
  says: [
    { t: 0.9, who: 'sign', text: 'it’s been… a whole hour.', d: 1.8 },
    { t: 8.9, who: 'sign', text: 'everything was a yes. except THIS.', d: 2.3 },
    { t: 15.0, who: 'sup', text: 'it’s a sweet goodbye', d: 1.7 },
    { t: 19.0, who: 'sign', text: 'I should have said “you too!!”', d: 2.0 },
    { t: 27.0, who: 'sup', text: 'not the laundry', d: 1.5 },
    { t: 31.0, who: 'sign', text: 'waiting for ME? …oh.', d: 1.8 },
    { t: 37.4, who: 'sup', text: 'I can’t watch', d: 1.6 },
    { t: 43.0, who: 'sign', text: 'I could just… say it first.', d: 2.2 },
    { t: 47.2, who: 'sup', text: 'you’ve got this', d: 1.6 },
    { t: 55.6, who: 'sign', text: 'the BEST time. they said BEST.', d: 2.2 },
  ],
  moods: [[0, 'wide', [0.6, -1]], [3, 'neutral', [0.4, -1]], [8.4, 'wide', [0.4, -1]], [12, 'squint', [0.4, -1]], [17, 'wide', [0.4, -1]], [22, 'squint', [0.4, -1]], [30, 'sparkle'], [32, 'wide', [0.4, -1]], [36, 'wide', [0, 0]], [42.5, 'squint', [0.4, -1]], [44.2, 'sparkle'], [46, 'neutral', [0.4, -1]], [53.2, 'wide', [0.4, -1]], [54.2, 'heart'], [56.5, 'happy']],
  squash: [[0, 0.12], [0.5, 0], [39.5, 0.14], [40.2, 0]],
  steam: [[0, 0.5], [36, 42.5]], panic: [[0, 0.5], [39.5, 42.5]],
  signAt: t => t < 0.6 ? { x: 262 + 70 * Math.sin(t * 6), y: 1610, s: 320 } : { x: 262, y: 1610, s: 320 },
  sup: { moods: [[0, 'wide'], [15, 'happy'], [22, 'wide'], [47.2, 'happy'], [53.4, 'sparkle']], tears: [[0, 2], [22, 2], [36, 3], [46, 2], [53.4, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.4, kind: 'flash', color: '#f2c75c', d: 0.22 }, { t: 0.42, kind: 'shake', d: 0.4 },
    { t: 22.0, kind: 'whip', from: 1.15 }, { t: 39.5, kind: 'glitch', d: 0.7 }, { t: 39.5, kind: 'shake', d: 0.5 }, { t: 53.1, kind: 'whip', from: 1.15 }],
  music: { style: 'lofi', key: 'D', seed: 819, drop: 3.0, sections: { breakdown: [36, 42.5], lift: [46, 53.1] }, hits: [22, 53.1] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
