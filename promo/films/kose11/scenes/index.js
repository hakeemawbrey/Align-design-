// kose11 — OVERTHINKING SIMULATOR, Ep 11: "They smiled at the waiter" (15 s vertical, star_talk, dreamy · Eb). Seamless loop.
//   0.0  FRAME 0: Pisces mid-date, mid-sob, a red circle on the date's smile at the waiter; hook on screen. (Pisces is the
//        overthinker here, so no tech support: Pisces cries all film.)  0.3 whip.  2.0 SMILE ANALYSIS.  4.2–10 the date smiles
//        at a dog, their coffee, a plant… then at Pisces (biggest).  10.6 "They smile at everyone. | Including you."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText } from '../../kose01/scenes/simkit.js'
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
  ep: 11, sign: 'pisces', duration: 15, ending: 'loop', supOff: true,
  hook: 'They smiled at the | *waiter.* ANALYSING.',
  heads: [
    { t: 1.95, text: 'Was it… a *special* | smile?', color: PINK },
    { t: 4.15, text: 'Gathering more | *data…*', color: GOLD },
    { t: 10.6, text: 'They smile at everyone. | *Including you.*', color: GOLD, slam: true, size: 92 },
  ],
  bar: { label: 'Analysing the smile…', keys: [[0, 28], [0.3, 28], [2, 35], [10.4, 99]], err: [[0, 0.3]], labels: [[0, 'Analysing the smile…'], [10.4, 'Analysis: adorable']] },
  panels: [
    { t0: -1, t1: 1.95, kind: 'custom', draw: cafe('waiter', null) },
    { t0: 2.0, t1: 4.15, kind: 'meter', label: 'SMILE *INTENSITY*', keys: [[2.0, 0], [3.2, 72]], col: PINK, fmt: v => `${Math.round(v)}/100 smile` },
    { t0: 4.2, t1: 5.7, kind: 'custom', draw: cafe('dog', 'Smiled at: *a dog*', { circle: false }) },
    { t0: 5.7, t1: 7.2, kind: 'custom', draw: cafe('coffee', 'Smiled at: *their coffee*', { circle: false }) },
    { t0: 7.2, t1: 8.7, kind: 'custom', draw: cafe('tree', 'Smiled at: *a plant*', { circle: false }) },
    { t0: 8.7, t1: 16, kind: 'custom', keep: true, draw: cafe('you', 'Smiled at: *YOU* (biggest)', { circle: false, big: true }) },
  ],
  stamps: [{ t: 9.3, d: 1.2, text: 'SMILE: 10/10', color: PINK, y: 760 }],
  says: [
    { t: 0.8, who: 'sign', text: 'that was a BIG smile. for the WAITER.', d: 1.3 },
    { t: 5.0, who: 'sign', text: 'a dog. ok. dogs are fair.', d: 1.4 },
    { t: 9.6, who: 'sign', text: 'oh no. I’m crying again.', d: 1.6 },
  ],
  moods: [[0, 'wide', [1, -1]], [2.0, 'wide', [0.4, -1]], [4.2, 'squint', [0.4, -1]], [8.7, 'wide', [0.5, -1]], [9.3, 'sparkle'], [14.4, 'wide', [1, -1]]],
  tears: [[0, 3], [4.2, 2], [8.7, 3]],
  squash: [[0, 0.14], [0.4, 0], [14.5, 0.14]], panic: [[0, 0.3], [14.55, 16]], steam: [[0, 0.3], [14.55, 16]],
  fx: [{ t: 0.3, kind: 'whip', from: 1.3 }, { t: 0.8, kind: 'flash', color: '#ff8fb1', d: 0.2 }, { t: 8.7, kind: 'whip', from: 1.15 }],
  music: { style: 'dreamy', key: 'Eb', seed: 811, drop: 2.0, sections: { lift: [8.7] }, hits: [9.3], outro: 0.6 },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
