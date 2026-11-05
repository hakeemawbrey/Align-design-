// klne06: LONG DISTANCE NOTES, "Mail Takes Days" (22 s vertical, star_advice post, lofi · Bb). Loops.
// Kit: ../../klne01/ldnkit.js. Chicago (CST, UTC−6) ↔ Mumbai (IST, UTC+5:30): Mumbai is 11 h 30 min ahead.
//   0.0  frame 0: Chicago 10 AM, ♈ Aries mid-sprint to a mailbox, envelope up; Mumbai 9:30 PM, ♎ Libra at the window.
//        "Eleven and a half hours. | *One* envelope."
//   3.2  Libra: "texts feel like they vanish." · Aries: "scrolled away again…"
//   8.3  THE STARS: "once a month, send a *real letter.* handwriting travels." → 10.2 into the mailbox · the envelope
//        crosses the seam with stamps (10.6–12.6) · "6 DAYS LATER" · 13.2 Libra opens it, holds it close · Pisces (the
//        neighbour) cries over the handwriting.
//  18.7  "Slow mail, | *fast* heartbeat." → loops.
import { makeLDN, card, fly, R, box, label, bubble, hearts, sparkles, drawBits, GOLD, INK, INTER, pop01, outK } from '../../klne01/ldnkit.js'

const T = { l1: 3.2, a1: 4.8, line: 8.3, drop: 10.2, fly: 10.6, land: 12.6, later: 12.7, open: 13.4, hug: 14.6, cry: 14.4, last: 18.7 }
const env = (x, px, py, k = 1, rot = -0.08) => { x.save(); x.translate(px, py); x.rotate(rot); x.scale(k, k); box(x, -90, -58, 180, 116, '#fff3dc', { b: 6 }); x.fillStyle = '#e2cfa6'; x.beginPath(); x.moveTo(-90, -58); x.lineTo(0, 6); x.lineTo(90, -58); x.closePath(); x.fill(); R(x, '#e8344e', 52, -50, 30, 36); R(x, '#5fb87a', 18, -50, 30, 36); drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#e8344e' }, 0, 16, 4); x.restore() }
const EP = makeLDN({
  id: 'klne06', len: 22, ending: 'loop', music: { style: 'lofi', key: 'Bb', seed: 2326 },
  hook: 'Eleven and a half hours. | *One* envelope.', hookSize: 88,
  L: { sign: 'aries', city: 'Chicago', min0: 10 * 60 },
  R: { sign: 'libra', city: 'Mumbai', offset: 690 },
  sets: [[0, 'street', 'room', {}]],
  badgeAt: 0.6, gap: '11½ HOURS APART', gapAt: 1.0, gapOut: [3.0, 3.2],
  lines: [{ t: T.line, text: 'once a month, send a *real letter.* handwriting travels.' }],
  boxes: [{ from: 0, to: 1, close: 12.4 }],
  pose(t, side) {
    if (side === 'L') { const run = t < 0.8 ? 1 : 0; return { x: run ? 200 + t * 60 : 230, y: 1130, s: 250, mood: t < 0.8 ? 'wide' : t < T.line ? 'neutral' : t < T.drop ? 'sparkle' : 'happy', look: [1, 0], hops: [0, 0.3, 0.6, T.a1, T.drop], squash: run ? 0.1 * Math.sin(t * 30) : 0,
      prop: (x, F) => { if (t < T.drop) env(x, F.ox + 130, F.oy - F.base - 120, 0.8, -0.3) } } }
    return { x: 800, y: 1140, s: 240, mood: t < T.line ? 'neutral' : t < T.open ? 'neutral' : 'heart', look: t < T.open ? [-1, -0.5] : [0, 0.5], hops: [T.l1, T.open, T.hug] }
  },
  pis: { side: 'R', x: 990, y: 1250, s: 110, look: [-1, -0.5], tears: t => (t > T.cry ? 3 : 2), mood: t => (t > T.cry ? 'happy' : 'wide'), hops: [T.cry] },
  draw(x, t) {
    // the mailbox
    x.save(); x.beginPath(); x.rect(0, 0, 540, 1920); x.clip(); R(x, INK, 420, 1060, 20, 200); box(x, 360, 920, 140, 150, '#3a6ac8', { b: 7, hi: '#5a8ae8' }); R(x, INK, 380, 960, 100, 12); label(x, 'MAIL', 430, 1030, { size: 24, col: '#ffffff', font: INTER, weight: 800 }); x.restore()
    bubble(x, t, 810, 820, T.l1, T.line - 0.2, ['texts feel like', 'they vanish.'], { size: 30 })
    bubble(x, t, 260, 800, T.a1, T.line - 0.2, 'scrolled away again…', { size: 30, col: '#d9d4ea' })
    fly(x, t, T.fly, T.land, 430, 960, 800, 900, (x2, px, py, p) => env(x2, px, py, 0.9, -0.1 + p * 0.3), 300)
    const lk = pop01(t, T.later, 0.3, 2.4) * outK(t, [T.open - 0.1, T.open + 0.1])
    if (lk > 0.01) { x.save(); x.translate(540, 760); x.scale(lk, lk); card(x, 0, 0, 380, 90, GOLD, { text: '6 DAYS LATER', size: 40, rot: -0.05 }); x.restore() }
    if (t > T.open && t < T.last + 3.3) { const k = pop01(t, T.open, 0.35, 2); x.save(); x.translate(810, 870); x.scale(k, k); card(x, 0, 0, 300, 230, '#fff8e0', { rot: 0.04 }); ['dear you,', 'I miss your laugh', 'the most.', '♡ A.'].forEach((l, i) => label(x, l, -110, -70 + i * 46, { size: 28, col: '#2c2a7a', align: 'left', font: "'EB Garamond', serif", weight: 500 })); x.restore() }
    hearts(x, t, T.hug, 800, 1000, { n: 7 }); sparkles(x, t, 800, 900, T.land, 10, 140, 1)
  },
  last: { t: T.last, text: 'Slow mail, | *fast* heartbeat.', size: 92 },
  sections: { drop: 0.6, breakdown: [T.line], lift: [T.open], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['tick', T.drop, 0.07], ['pop', T.drop + 0.05, 659.25, 0.04, -0.3], ['whoosh', T.fly, 1.2, 0.04], ['pop', T.land, 1174.66, 0.05, 0.3], ['pop', T.later, 880, 0.05, 0], ['tick', T.open, 0.05], ['tick', T.open + 0.1, 0.04], ['bell', T.hug, 1760, 0.035, 1, 0.3], ['pluck', T.cry, 659.25, 0.035, 0.5, 0.3], ['pluck', T.cry + 0.14, 587.33, 0.035, 0.5, 0.3]]
export const MUSIC = EP.music
