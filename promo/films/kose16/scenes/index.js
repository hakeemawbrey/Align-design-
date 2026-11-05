// kose16 — OVERTHINKING SIMULATOR, Ep 16 (long): "'We should hang out sometime' (full simulation)" (60 s vertical,
// star_talk, synthwave · Cm). Hard cut. Promise up front: "the answer at 100%". Chapter stickers, a new beat every ~8 s.
//   0.0  FRAME 0: Aquarius mid-spin, "we should hang out sometime" circled, the bar glitching at 12%; hook on screen.
//   3.0  CH 1 SCAN: the dictionary entry for "sometime" · the HOW SOON IS SOMETIME gauge · past "sometimes" in the chat.
//  12.0  CH 2 RENDER: six meanings, each rendered then DELETED (the 6th, "a date", gets MAYBE).
//  36.0  CH 3 OVERHEAT: brain temperature, ERROR, tech support: "have you tried turning your brain off and on again?"
//  46.0  CH 4 REBOOT: one idea: just ask. "when are you free? :)"
//  53.0  CH 5 ANSWER: "saturday? the market?"  58.3 "‘Sometime’ is | Saturday now."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText } from '../../kose01/scenes/simkit.js'
const CRUSH = 'sagittarius'
const SERIF = "'EB Garamond', Georgia, serif", MONO = "'Space Mono', monospace"
const temp = (x, t, R) => {
  const v = Math.min(100, Math.max(0, (t - 36.2) / 4.4 * 100))
  richText(x, 'BRAIN *TEMPERATURE*', R.x + R.w / 2, R.y + 30, { size: 52, acc: RED })
  const bx = R.x + R.w / 2 - 60, by = R.y + 130, bh = 380
  x.fillStyle = INK; x.fillRect(bx - 8, by - 8, 136, bh + 16); x.fillStyle = '#2a1f55'; x.fillRect(bx, by, 120, bh)
  x.fillStyle = v > 70 ? RED : GOLD; x.fillRect(bx + 10, by + bh - 10 - (bh - 20) * v / 100, 100, (bh - 20) * v / 100)
  x.font = `800 60px Inter`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'top'; x.fillText(v > 99 ? 'TOO HOT' : `${Math.round(v)}°`, R.x + R.w / 2, by + bh + 30)
  for (let i = 0; i < 2; i++) { x.save(); x.translate(R.x + 160 + i * (R.w - 320), R.y + 330); x.rotate(t * (8 + v / 6)); icon(x, 'fan', 0, 0, 14); x.restore() }
}
const reboot = (x, t, R) => {
  x.fillStyle = '#000'; x.fillRect(R.x, R.y, R.w, R.h)
  x.font = `700 40px ${MONO}`; x.fillStyle = '#7ff0a0'; x.textAlign = 'left'; x.textBaseline = 'top'
  const L = ['> rebooting brain…', '> clearing 6 meanings… done', '> loading: one idea', '> idea: just ask them']
  L.forEach((l, i) => { const t0 = 43.2 + i * 0.6; if (t > t0) x.fillText(l.slice(0, Math.floor((t - t0) * 40)), R.x + 50, R.y + 60 + i * 70) })
  if (Math.floor(t * 3) % 2) x.fillRect(R.x + 50, R.y + 360, 24, 40)
}
export const CFG = {
  ep: 16, sign: 'aquarius', duration: 60, ending: 'cut',
  hook: '“We should hang out | *sometime.*” FULL SIMULATION.', hookSize: 96,
  promise: { t: 0.9, d: 4.2, text: 'wait for the answer at 100%', y: 1876 },
  heads: [
    { t: 2.95, text: 'Scanning | *“sometime”…*', color: CYAN },
    { t: 11.95, text: 'Rendering | *every meaning…*', color: GOLD },
    { t: 35.95, text: 'Brain | *overheating…*', color: RED },
    { t: 45.95, text: 'Rebooting with | *one idea.*', color: '#7ff0a0' },
    { t: 52.95, text: 'The | *answer:*', color: GOLD },
    { t: 58.3, text: '“Sometime” is | *Saturday now.*', color: GOLD, slam: true },
  ],
  chapters: [
    { t: 3.0, n: 1, text: 'SCAN', color: CYAN }, { t: 12.0, n: 2, text: 'RENDER', color: GOLD }, { t: 36.0, n: 3, text: 'OVERHEAT', color: RED },
    { t: 46.0, n: 4, text: 'REBOOT', color: '#7ff0a0' }, { t: 53.0, n: 5, text: 'ANSWER', color: PINK },
  ],
  bar: { label: 'Simulating “sometime”…', keys: [[0, 12], [0.5, 12], [3, 14], [12, 30], [35.5, 90], [40.5, 99], [46, 99], [53, 100]], err: [[0, 0.5], [40.6, 43.0]],
    labels: [[0, 'Simulating “sometime”…'], [36, 'Cooling fans: screaming'], [43, 'Rebooting…'], [46, 'Asking directly…'], [53.2, 'Answer received: 100%']] },
  panels: [
    { t0: -1, t1: 2.95, kind: 'chat', who: CRUSH, title: 'them', msgs: [{ at: -1, side: 'R', text: 'that was so fun today' }, { at: -1, side: 'L', text: 'we should hang out sometime', size: 66, circle: -1 }] },
    { t0: 3.0, t1: 6.0, kind: 'scene', items: [
      { text: 'some·time', x: 0.5, y: 0.08, size: 96, font: SERIF, weight: 500, color: GOLD }, { text: '(adverb)', x: 0.5, y: 0.26, size: 36, font: MONO, weight: 700, color: CYAN },
      { text: '1. at a time not yet known', x: 0.08, y: 0.42, size: 40, align: 'left', at: 3.5 }, { text: '2. eventually, maybe', x: 0.08, y: 0.54, size: 40, align: 'left', at: 4.1 },
      { text: '3. ??????', x: 0.08, y: 0.66, size: 40, align: 'left', at: 4.7, color: PINK }, { sign: 'aquarius', x: 0.82, y: 0.78, s: 140, mood: 'squint', at: 3.2 },
    ] },
    { t0: 6.0, t1: 9.0, kind: 'meter', style: 'gauge', label: 'HOW SOON IS *SOMETIME?*', keys: [[6, 10], [6.8, 90], [7.5, 25], [8.2, 75], [9, 50]], ends: ['tonight', 'never'], segs: [[0, 0.33, '#7ff0a0'], [0.33, 0.66, GOLD], [0.66, 1, RED]] },
    { t0: 9.0, t1: 11.95, kind: 'chat', who: CRUSH, title: 'them · scrolling back…', msgs: [
      { at: 9.1, side: 'L', text: 'we should get coffee sometime' }, { at: 9.6, side: 'R', text: 'yes!! (we did, the next day)' },
      { at: 10.3, side: 'L', text: 'we should hang out sometime', circle: 10.6 },
    ] },
    { t0: 12.0, t1: 16.0, kind: 'theory', chip: 'MEANING 1/6', title: 'A *polite no.*', scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.68, s: 200, mood: 'neutral' }, { icon: 'cross', x: 0.66, y: 0.62, cell: 13 }] } },
    { t0: 16.0, t1: 20.0, kind: 'theory', chip: 'MEANING 2/6', title: '*Next week.* | (Optimistic.)', scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'happy' }, { icon: 'cal', x: 0.66, y: 0.64, cell: 13 }] } },
    { t0: 20.0, t1: 24.0, kind: 'theory', chip: 'MEANING 3/6', title: '*Next year.* | (Realistic?)', scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'sleepy' }, { icon: 'snow', x: 0.66, y: 0.6, cell: 12, wob: 1 }] } },
    { t0: 24.0, t1: 28.0, kind: 'theory', chip: 'MEANING 4/6', title: 'A *group thing.* | With nine people.', size: 54, scene: { items: [0, 1, 2, 3, 4].map(i => ({ sign: ['leo', 'cancer', 'gemini', 'aries', 'libra'][i], x: 0.18 + i * 0.16, y: 0.72, s: 120, mood: 'happy', seed: 40 + i })) } },
    { t0: 28.0, t1: 32.0, kind: 'theory', chip: 'MEANING 5/6', title: 'They *forgot* | they said it.', size: 56, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'eyeroll' }, { icon: 'ghost', x: 0.66, y: 0.62, cell: 12, bob: 1 }] } },
    { t0: 32.0, t1: 35.95, kind: 'theory', chip: 'MEANING 6/6', title: 'It’s… a *date?*', stamp: 'MAYBE', stampCol: GOLD, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'heart' }, { icon: 'heart', x: 0.66, y: 0.6, cell: 13, bob: 1 }] } },
    { t0: 36.0, t1: 40.6, kind: 'custom', draw: temp },
    { t0: 40.6, t1: 43.0, kind: 'error', text: 'too many | *meanings.*' },
    { t0: 43.0, t1: 46.0, kind: 'custom', draw: reboot },
    { t0: 46.0, t1: 61, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 46.1, side: 'L', text: 'we should hang out sometime' },
      { at: 48.6, side: 'R', text: 'when are you free? :)', size: 56 },
      { at: 53.15, side: 'L', text: 'saturday? the market?', col: '#bff5cf', size: 56 },
      { at: 54.6, side: 'R', text: 'yes!! saturday!' },
    ], typing: [[51.4, 53.1]] },
  ],
  notifs: [{ t: 53.1, d: 2.0, from: 'THEM · now', text: 'saturday? the market?', sign: CRUSH }],
  stamps: [{ t: 55.5, d: 2.4, text: 'SOMETIME = | SATURDAY', color: '#7ff0a0', y: 700 }],
  says: [
    { t: 0.95, who: 'sign', text: 'sometime. SOMETIME. when is sometime?', d: 1.9 },
    { t: 7.0, who: 'sup', text: 'the needle can’t decide', d: 1.8 },
    { t: 13.2, who: 'sign', text: 'polite no. I KNEW it.', d: 2.0 },
    { t: 17.2, who: 'sign', text: 'next week?! ok ok ok.', d: 1.9 },
    { t: 21.0, who: 'sup', text: 'a whole year?', d: 1.6 },
    { t: 25.0, who: 'sign', text: 'nine people is not a hang.', d: 2.0 },
    { t: 29.0, who: 'sup', text: 'they didn’t forget you', d: 1.8 },
    { t: 33.0, who: 'sign', text: 'a date. maybe. MAYBE.', d: 2.0 },
    { t: 38.0, who: 'sup', text: 'have you tried turning your brain off and on again?', d: 2.6 },
    { t: 46.6, who: 'sign', text: 'what if I… just ask?', d: 1.8 },
    { t: 49.5, who: 'sup', text: 'you ASKED!!', d: 1.6 },
    { t: 55.0, who: 'sign', text: 'saturday. SATURDAY.', d: 1.8 },
  ],
  moods: [[0, 'wide', [1, -1]], [3, 'squint', [0.4, -1]], [6, 'wide', [0.4, -1]], [9, 'squint', [0.4, -1]], [12, 'wide', [0.4, -1]], [16, 'sparkle'], [20, 'sleepy'], [24, 'squint', [0.4, -1]], [28, 'wide', [0.4, -1]], [32, 'heart'], [36, 'wide', [0, 0]], [43, 'sleepy'], [46, 'neutral', [0.4, -1]], [48.6, 'wide', [0.4, -1]], [53.2, 'sparkle'], [55, 'happy']],
  squash: [[0, 0.14], [0.5, 0], [40.6, 0.12], [41.2, 0]],
  steam: [[0, 0.6], [36, 43]], panic: [[0, 0.5], [40.6, 43]],
  signAt: t => t < 0.5 ? { x: 262 + 40 * Math.sin(t * 20), y: 1610, s: 320 } : { x: 262, y: 1610, s: 320 },
  sup: { moods: [[0, 'wide'], [16, 'happy'], [20, 'wide'], [38, 'squint'], [49.5, 'sparkle'], [55, 'happy']], tears: [[0, 2], [20, 3], [24, 2], [36, 3], [46, 2], [49.5, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.4, kind: 'flash', color: '#7fe3ff', d: 0.22 }, { t: 0.42, kind: 'shake', d: 0.4 },
    { t: 12.0, kind: 'whip', from: 1.15 }, { t: 36.0, kind: 'whip', from: 1.2 }, { t: 40.6, kind: 'glitch', d: 0.8 }, { t: 40.6, kind: 'shake', d: 0.6 }, { t: 53.1, kind: 'whip', from: 1.15 }],
  music: { style: 'synthwave', key: 'Cm', seed: 816, drop: 3.0, sections: { breakdown: [36, 43], lift: [46, 53.1] }, hits: [12, 53.1] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
