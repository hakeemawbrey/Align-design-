// kose06 — OVERTHINKING SIMULATOR, Ep 6: "They wrote 'haha'" (15 s vertical, star_talk, funk · E). Hard cut.
//   0.0  FRAME 0: Leo mid-faint, the reply "haha" circled red under Leo's joke; hook on screen.
//   0.45 record scratch + freeze "yep. *four letters.*"  2.0 the LAUGH-O-METER needle drops.  5.0–10.1 three rewrites of
//   the joke, DELETED.  10.2 a friend's text: "they told me your joke was SO funny".  13.1 "Lowercase haha | still counts."
import { simFilm, GOLD, PINK, RED, CYAN } from '../../kose01/scenes/simkit.js'
const CRUSH = 'pisces', FRIEND = 'aquarius'
export const CFG = {
  ep: 6, sign: 'leo', duration: 15, ending: 'cut',
  hook: 'They wrote *“haha”.* | Lowercase. Short.',
  heads: [
    { t: 1.95, text: 'Measuring the | *laugh…*', color: GOLD },
    { t: 4.95, text: 'Rewriting the | *joke…*', color: PINK },
    { t: 10.2, text: 'Incoming | *intel.*', color: GOLD },
    { t: 13.1, text: 'Lowercase haha | *still counts.*', color: GOLD, slam: true },
  ],
  bar: { label: 'Analysing “haha”…', keys: [[0, 33], [0.45, 33], [2, 40], [10.1, 98]], err: [[0, 0.45]], labels: [[0, 'Analysing “haha”…'], [10.2, 'Laugh confirmed']] },
  panels: [
    { t0: -1, t1: 1.95, kind: 'chat', who: CRUSH, title: 'them', msgs: [{ at: -1, side: 'R', text: 'what do you call a duck that tells jokes? a wise quacker' }, { at: -1, side: 'L', text: 'haha', size: 96, circle: -1 }] },
    { t0: 2.0, t1: 4.95, kind: 'meter', style: 'gauge', label: 'LAUGH-O-*METER*', keys: [[2.0, 92], [2.4, 92], [3.6, 18]], jitter: true, ends: ['haha', 'HAHAHA'] },
    { t0: 5.0, t1: 6.7, kind: 'theory', chip: 'REWRITE 1/3', title: '“ok but imagine | the duck had *a hat.*”', size: 52, del: 6.15, scene: { items: [{ sign: 'leo', x: 0.5, y: 0.75, s: 160, mood: 'wink' }] } },
    { t0: 6.7, t1: 8.4, kind: 'theory', chip: 'REWRITE 2/3', title: '“it’s funnier | *in person.*”', size: 54, del: 7.85, scene: { items: [{ sign: 'leo', x: 0.5, y: 0.75, s: 160, mood: 'squint' }] } },
    { t0: 8.4, t1: 10.1, kind: 'theory', chip: 'REWRITE 3/3', title: '“Explaining the joke: | *a thread (1/9)*”', size: 52, del: 9.55, scene: { items: [{ sign: 'leo', x: 0.5, y: 0.75, s: 160, mood: 'wide' }] } },
    { t0: 10.25, t1: 16, kind: 'meter', style: 'gauge', keep: true, label: 'LAUGH-O-*METER*', keys: [[10.25, 18], [10.6, 18], [11.4, 100]], jitter: true, ends: ['haha', 'HAHAHA'] },
  ],
  notifs: [{ t: 10.2, d: 2.4, from: 'BEST FRIEND · now', text: 'they told me your joke was SO funny', sign: FRIEND }],
  says: [
    { t: 0.0, who: 'sign', text: 'haha. HAHA. ha… ha.', d: 0.45 },
    { t: 2.6, who: 'sign', text: 'four letters. FOUR.', d: 1.8 },
    { t: 9.0, who: 'sup', text: 'not the thread', d: 1.3 },
    { t: 11.6, who: 'sign', text: 'SO funny. they said SO.', d: 1.6 },
  ],
  moods: [[0, 'wide', [0.6, -1]], [0.45, 'sleepy'], [2.0, 'wide', [0.4, -1]], [3.6, 'sleepy'], [5.0, 'wink'], [8.4, 'wide', [0.4, -1]], [10.2, 'wide', [0.5, -1]], [11.4, 'sparkle'], [12.6, 'happy']],
  squash: [[0, 0.22], [0.45, 0.1], [2.0, 0]], steam: [[0, 0.5], [8.4, 10.1]], panic: [[0, 0.45]],
  sup: { moods: [[0, 'wide'], [11.0, 'happy']], tears: [[0, 2], [11.0, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.45, kind: 'scratch', d: 1.3, caption: 'yep. *four letters.*', top: 1470 }, { t: 10.2, kind: 'whip', from: 1.15 }],
  music: { style: 'funk', key: 'E', seed: 806, drop: 1.9, sections: { breakdown: [8.4], lift: [10.2] }, hits: [11.4] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
