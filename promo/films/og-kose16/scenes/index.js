// og-kose16: social rework of kose16 (Overthinking Simulator, "'We should hang out sometime' (full simulation)", 60 s).
// Static HOOK (box) 0–2.9 replaces the animated hook; no series bug, no chapter stickers (the headlines carry each beat),
// no whips/flash/shakes/glitch, no slam title, crazier Aquarius; ends on "‘Sometime’ is | Saturday now."
// The kit is a local copy (scenes/simkit.js) laid out inside the app's safe zones.
//   0.0  HOOK over "we should hang out sometime" circled, the bar glitching.  3.0 SCAN: the dictionary entry, the HOW SOON
//   gauge, past "sometimes".  12.0 six meanings, each DELETED (the 6th gets MAYBE).  36.0 brain temperature, ERROR, tech
//   support.  43.0 REBOOT: one idea: just ask.  53.1 "saturday? the market?"  58.3 "‘Sometime’ is | Saturday now."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText } from './simkit.js'
export const HOOK = '“We should hang out | *sometime.*”'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.9
const CRUSH = 'sagittarius'
const SERIF = "'EB Garamond', Georgia, serif", MONO = "'Space Mono', monospace"
const temp = (x, t, R) => {
  const v = Math.min(100, Math.max(0, (t - 36.2) / 4.4 * 100))
  richText(x, 'BRAIN *TEMPERATURE*', R.x + R.w / 2, R.y + 30, { size: 52, acc: RED })
  const bx = R.x + R.w / 2 - 60, by = R.y + 120, bh = 340
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
  sign: 'aquarius', duration: 60, ending: 'cut',
  hook: '',
  promise: { t: 0.9, d: 4.2, text: 'wait for the answer at 100%', y: 1876 },
  heads: [
    { t: 2.95, text: 'Scanning | *“sometime”…*', color: CYAN },
    { t: 11.95, text: 'Rendering | *every meaning…*', color: GOLD },
    { t: 35.95, text: 'Brain | *overheating…*', color: RED },
    { t: 45.95, text: 'Rebooting with | *one idea.*', color: '#7ff0a0', end: 53.05 },
    { t: 55.15, text: 'The | *answer:*', color: GOLD },
    { t: 58.3, text: '“Sometime” is | *Saturday now.*', color: GOLD },
  ],
  bar: { label: 'Simulating “sometime”…', keys: [[0, 12], [0.5, 12], [3, 14], [12, 30], [35.5, 90], [40.5, 99], [46, 99], [53, 100]], err: [[0, 0.5], [40.6, 43.0]],
    labels: [[0, 'Simulating “sometime”…'], [12, 'Consulting the universe…'], [36, 'Cooling fans: screaming'], [43, 'Rebooting…'], [46, 'Asking directly…'], [53.2, 'Answer received: 100%']] },
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
    { t0: 12.0, t1: 16.0, kind: 'theory', chip: 'MEANING 1/6', title: 'A *polite no.* | Delivered by fog.', scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.68, s: 200, mood: 'neutral' }, { icon: 'cross', x: 0.66, y: 0.62, cell: 13 }] } },
    { t0: 16.0, t1: 20.0, kind: 'theory', chip: 'MEANING 2/6', title: '*Next week.* | (Optimistic.)', scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'happy' }, { icon: 'cal', x: 0.66, y: 0.64, cell: 13 }] } },
    { t0: 20.0, t1: 24.0, kind: 'theory', chip: 'MEANING 3/6', title: '*Next year.* | Or the year after. (Realistic.)', size: 52, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'sleepy' }, { icon: 'snow', x: 0.66, y: 0.6, cell: 12, wob: 1 }] } },
    { t0: 24.0, t1: 28.0, kind: 'theory', chip: 'MEANING 4/6', title: 'A *group thing.* | Nine people. A projector.', size: 54, scene: { items: [0, 1, 2, 3, 4].map(i => ({ sign: ['leo', 'cancer', 'gemini', 'aries', 'libra'][i], x: 0.18 + i * 0.16, y: 0.72, s: 120, mood: 'happy', seed: 40 + i })) } },
    { t0: 28.0, t1: 32.0, kind: 'theory', chip: 'MEANING 5/6', title: 'They *forgot* | they said it. Out loud.', size: 56, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'eyeroll' }, { icon: 'ghost', x: 0.66, y: 0.62, cell: 12, bob: 1 }] } },
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
    { t: 5.3, who: 'sign', text: 'I have written to three dictionaries.', d: 1.9 },
    { t: 7.3, who: 'sup', text: 'the needle can’t decide', d: 1.6 },
    { t: 13.2, who: 'sign', text: 'a polite no. I’ll move to another planet.', d: 2.0 },
    { t: 17.2, who: 'sign', text: 'next week?! cancelling all my experiments.', d: 1.9 },
    { t: 21.0, who: 'sup', text: 'a whole year?', d: 1.6 },
    { t: 25.0, who: 'sign', text: 'nine people is a conference, not a hang.', d: 2.0 },
    { t: 29.0, who: 'sup', text: 'they didn’t forget you', d: 1.8 },
    { t: 33.0, who: 'sign', text: 'a date. maybe. MAYBE. my brain is melting.', d: 2.0 },
    { t: 38.0, who: 'sup', text: 'have you tried turning your brain off and on again?', d: 2.6 },
    { t: 46.6, who: 'sign', text: 'radical idea: what if I… just ask?', d: 1.8 },
    { t: 49.5, who: 'sup', text: 'you ASKED!!', d: 1.6 },
    { t: 55.6, who: 'sign', text: 'saturday. SATURDAY. publishing my findings.', d: 2.0 },
  ],
  moods: [[0, 'wide', [1, -1]], [3, 'squint', [0.4, -1]], [6, 'wide', [0.4, -1]], [9, 'squint', [0.4, -1]], [12, 'wide', [0.4, -1]], [16, 'sparkle'], [20, 'sleepy'], [24, 'squint', [0.4, -1]], [28, 'wide', [0.4, -1]], [32, 'heart'], [36, 'wide', [0, 0]], [43, 'sleepy'], [46, 'neutral', [0.4, -1]], [48.6, 'wide', [0.4, -1]], [53.2, 'sparkle'], [55, 'happy']],
  squash: [[0, 0.14], [0.5, 0], [40.6, 0.12], [41.2, 0]],
  steam: [[0, 0.6], [36, 43]], panic: [[0, 0.5], [40.6, 43]],
  signAt: t => t < 0.5 ? { x: 262 + 40 * Math.sin(t * 20), y: 1610, s: 320 } : { x: 262, y: 1610, s: 320 },
  sup: { moods: [[0, 'wide'], [16, 'happy'], [20, 'wide'], [38, 'squint'], [49.5, 'sparkle'], [55, 'happy']], tears: [[0, 2], [20, 3], [24, 2], [36, 3], [46, 2], [49.5, 3]] },
  fx: [],
  music: { style: 'synthwave', key: 'Cm', seed: 816, drop: 3.0, sections: { breakdown: [36, 43], lift: [46, 53.1] }, hits: [12, 53.1] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
