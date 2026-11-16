// og-kose11: social rework of kose11 (Overthinking Simulator, "They smiled at the waiter"). Static HOOK (outline) 0–2.25
// replaces the animated hook; no series bug, no whips/flash, no slam title, no loop back (ends on the biggest smile);
// crazier, sobbing Pisces. The kit is a local copy (scenes/simkit.js) laid out inside the app's safe zones.
//   0.0  HOOK over Pisces mid-date, mid-sob, a red circle on the date's smile at the waiter.  2.35 SMILE ANALYSIS.
//   4.2–10 the date smiles at a dog, their coffee, a plant… then at Pisces (biggest).  10.6 "They smile at everyone. | Including you."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText } from './simkit.js'
export const HOOK = 'My date smiled | at the *waiter.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.25
const DATE = 'scorpio'
function cafe(target, label, { circle = true, big = false } = {}) {
  return (x, t, R, k) => {
    const cx = R.x + R.w / 2, fy = R.y + R.h * 0.74
    x.fillStyle = '#2a1d5c'; x.fillRect(R.x, fy + 40, R.w, R.h - (fy + 40 - R.y))
    x.fillStyle = '#b9875a'; x.fillRect(cx - 120, fy - 10, 240, 26); x.fillRect(cx - 12, fy + 16, 24, 70)
    drawSign(x, t, DATE, { x: R.x + 230, y: fy - 120, s: 220 }, { mood: big ? 'heart' : 'happy', look: [1, 0], seed: 4 })
    if (target === 'waiter') drawSign(x, t, 'star', { x: R.x + R.w - 210, y: fy - 140, s: 200 }, { mood: 'happy', look: [-1, 0], seed: 8 })
    else if (target === 'you') drawSign(x, t, 'pisces', { x: R.x + R.w - 210, y: fy - 120, s: 210 }, { mood: 'sparkle', tears: 3, look: [-1, 0], seed: 8 })
    else icon(x, target, R.x + R.w - 210, fy - 90, 18, { rot: Math.sin(t * 3) * 0.05 })
    if (circle) { x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.ellipse(R.x + 230, fy - 100, 150, 140, -0.1, 0, Math.PI * 2 * Math.min(1, k * 1.2)); x.stroke() }
    if (label) richText(x, label, cx, R.y + 34, { size: 52, acc: PINK, maxW: R.w - 60 })
    if (big) for (let i = 0; i < 6; i++) icon(x, 'heart', cx - 250 + i * 100, R.y + 150 + Math.sin(t * 4 + i) * 16, 7)
  }
}
export const CFG = {
  sign: 'pisces', duration: 15, ending: 'cut', supOff: true,
  hook: '',
  heads: [
    { t: 2.3, text: 'Was it… a *special* | smile?', color: PINK },
    { t: 4.15, text: 'Gathering more | *data…*', color: GOLD },
    { t: 10.6, text: 'They smile at everyone. | *Including you.*', color: GOLD, size: 76 },
  ],
  bar: { label: 'Analysing the smile…', keys: [[0, 28], [0.3, 28], [2.35, 35], [10.4, 99]], err: [[0, 0.3]], labels: [[0, 'Analysing the smile…'], [4.2, 'Writing a sad poem…'], [10.4, 'Analysis: adorable']] },
  panels: [
    { t0: -1, t1: 2.3, kind: 'custom', draw: cafe('waiter', null) },
    { t0: 2.35, t1: 4.15, kind: 'meter', label: 'SMILE *INTENSITY*', keys: [[2.35, 0], [3.4, 97]], col: PINK, fmt: v => `${Math.round(v)}/100 smile` },
    { t0: 4.2, t1: 5.7, kind: 'custom', draw: cafe('dog', 'Smiled at: *a dog*', { circle: false }) },
    { t0: 5.7, t1: 7.2, kind: 'custom', draw: cafe('coffee', 'Smiled at: *their coffee*', { circle: false }) },
    { t0: 7.2, t1: 8.7, kind: 'custom', draw: cafe('tree', 'Smiled at: *a plant*', { circle: false }) },
    { t0: 8.7, t1: 16, kind: 'custom', keep: true, draw: cafe('you', 'Smiled at: *YOU* (biggest)', { circle: false, big: true }) },
  ],
  stamps: [{ t: 9.3, d: 1.2, text: 'SMILE: 10/10', color: PINK, y: 760 }],
  says: [
    { t: 0.5, who: 'sign', text: 'a SMILE. for the WAITER. I’m drafting our breakup song.', d: 1.7 },
    { t: 5.0, who: 'sign', text: 'a dog?? I’m now jealous of a DOG.', d: 1.4 },
    { t: 6.4, who: 'sign', text: 'losing to a coffee. a COFFEE.', d: 1.3 },
    { t: 7.8, who: 'sign', text: 'the plant gets a smile?!', d: 1.2 },
    { t: 9.6, who: 'sign', text: 'the BIGGEST one. crying. happy crying. still crying.', d: 2.0 },
  ],
  moods: [[0, 'wide', [1, -1]], [2.0, 'wide', [0.4, -1]], [4.2, 'squint', [0.4, -1]], [8.7, 'wide', [0.5, -1]], [9.3, 'sparkle']],
  tears: [[0, 3], [4.2, 2], [8.7, 3]],
  squash: [[0, 0.14], [0.4, 0]], panic: [[0, 0.3]], steam: [[0, 0.3]],
  fx: [],
  music: { style: 'dreamy', key: 'Eb', seed: 811, drop: 2.0, sections: { lift: [8.7] }, hits: [9.3], outro: 0.6 },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
