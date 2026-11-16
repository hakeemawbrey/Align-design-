// og-kpvee08: social rework of kpvee08. Static HOOK (box) 0–2.8 replaces the slam; no whip zoom / shakes; no series
// bug (kit copy); no loop-back (ends on the date + Venus's last line); a slightly smaller heart door so Scorpio, the date,
// Pisces and every line fit the safe zone; crazier lines.
// Was: kpvee08 · Planet Talk: Venus to Scorpio — "The Spare Key Heart" (24.6 s vertical, star_advice, loop). screwed · Fm.
//   0.00  frame 0: Venus mid-crash through a vault door, the door mid-flight off its hinges, glitter dust; Scorpio
//         below its heart door with seven padlocks. Slam "SCORPIO. I brought a *key*, darling."
//   3.0   the seven locks pop: my day · my past · my fave song · my fears · my snack order · my 2 a.m. thoughts ·
//         my feelings. Scorpio: "Nobody gets past lock one."
//   7.2   Venus: "Vulnerability isn't weakness, darling. It's the invitation."  11.8 a golden key floats to lock 1.
//  13.2   CLICK. Scorpio: "I was… nervous today." The date: "Me too. I'm glad you said it."  Pisces sobs.
//  21.4   slam "Seven locks. *Open* one."  Loops back into the crash.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { episode, panel, txt, heart, sparkleBurst, pop01, outK, sobCues, INK, ROSE, CREAM, GOLD, BONE, VRIM } from '../venuskit.js'

export const HOOK = 'Scorpio: 7 locks, | *zero visitors.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.8

const T = { locks: 3.0, key: [11.8, 13.0], click: 13.2, date: 16.0, sob: 18.8, last: 21.4 }
const LOCKS = ['my day', 'my middle name', 'my fave song', 'my fears', 'my snack order', 'my 2 a.m. thoughts', 'my feelings']
const LP = LOCKS.map((l, i) => ({ l, x: i < 4 ? 330 : 750, y: 880 + (i < 4 ? i : i - 4) * 100 + (i < 4 ? 0 : 50) }))
const DATE = { x: 790, y: 1460, s: 180, col: '#7fe0c0' }

function vaultDoor(x, t) {
  const f = prog(t, -0.6, 1.5)
  if (f >= 1) return
  const dx = lerp(560, -500, ease.inQuad(f)), dy = lerp(800, 620, f) - Math.sin(f * Math.PI) * 200, rot = -f * 5
  x.save(); x.translate(dx, dy); x.rotate(rot)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 300, 0, 7); x.fill()
  x.fillStyle = '#8a8fa8'; x.beginPath(); x.arc(0, 0, 286, 0, 7); x.fill()
  x.fillStyle = '#6a6f88'; x.beginPath(); x.arc(0, 0, 200, 0, 7); x.fill()
  x.strokeStyle = INK; x.lineWidth = 22; for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 170, Math.sin(a) * 170); x.stroke() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 44, 0, 7); x.fill()
  x.restore()
}
function lock(x, cx, cy, s, open, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const up = ease.outBack(clamp(open)) * 26
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(0, -24 - up, 26, Math.PI, 0); x.lineTo(26, -10 - up * (open > 0 ? 0.2 : 1)); x.moveTo(-26, -24 - up); x.lineTo(-26, -6); x.stroke()
  x.strokeStyle = '#c9cde0'; x.lineWidth = 8; x.beginPath(); x.arc(0, -24 - up, 26, Math.PI, 0); x.lineTo(26, -10 - up * (open > 0 ? 0.2 : 1)); x.moveTo(-26, -24 - up); x.lineTo(-26, -6); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.roundRect(-40, -12, 80, 66, 12); x.fill()
  x.fillStyle = open > 0 ? GOLD : '#b9442f'; x.beginPath(); x.roundRect(-34, -6, 68, 54, 9); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 14, 8, 0, 7); x.fill(); x.fillRect(-4, 14, 8, 18)
  x.restore(); void t
}
function heartDoor(x, t) {
  const k = pop01(t, -1, 0.3)
  // the door: a tall dark panel with a heart window
  panel(x, 540, 1060, 760, 480, { fill: '#2a1440', border: INK, rad: 40, s: k })
  heart(x, 540, 1040, 110, { color: '#4a2a66', outline: INK })
  LP.forEach((p, i) => {
    const pk = pop01(t, T.locks + i * 0.2, 0.3, 2.6)
    if (pk <= 0.01) return
    const open = i === 0 ? prog(t, T.click, T.click + 0.35) : 0
    const fall = i === 0 ? ease.inQuad(prog(t, T.click + 0.5, T.click + 1.1)) : 0
    if (fall < 1) { x.save(); x.globalAlpha *= 1 - fall; lock(x, p.x + (i < 4 ? -120 : 120), p.y + fall * 300, 0.9 * pk, open, t); x.restore() }
    txt(x, p.l, p.x + (i < 4 ? -40 : 40), p.y + 12, { size: 30, color: i === 0 && open > 0 ? GOLD : BONE, align: i < 4 ? 'left' : 'right', s: pk, weight: 700 })
  })
}
function key(x, t, S) {
  const k = pop01(t, T.key[0], 0.3)
  if (k <= 0.01 || t > T.click + 0.6) return
  const f = ease.inOutCubic(prog(t, ...T.key))
  const L = LP[0], kx = lerp(S.venus.x + 120, L.x - 120, f), ky = lerp(S.venus.y + 150, L.y + 14, f)
  x.save(); x.translate(kx, ky); x.rotate(lerp(-0.6, 0, f) + Math.sin(t * 4) * 0.05 * (1 - f)); x.scale(k, k)
  heart(x, 70, 0, 34, { color: GOLD })
  x.fillStyle = INK; x.fillRect(-60, -10, 110, 20); x.fillStyle = GOLD; x.fillRect(-56, -6, 104, 12)
  x.fillStyle = INK; x.fillRect(-60, -10, 14, 34); x.fillRect(-36, -10, 12, 26); x.fillStyle = GOLD; x.fillRect(-57, -6, 8, 26); x.fillRect(-33, -6, 6, 18)
  x.restore()
  sparkleBurst(x, t, kx, ky, T.key[0], { R: 120, n: 8 })
}

const EP = episode({
  sign: 'scorpio', dur: 24.6, ending: 'cut',
  enter: { kind: 'crash', at: -1.0, x: 540, y: 650, size: 300 },
  venus: [
    { t: 0, x: 540, y: 650, size: 300, mood: 'wide', look: [0, 1] },
    { t: 1.5, mood: 'sly', look: [0, 1] },
    { t: 7.2, d: 0.6, x: 540, y: 700, size: 230, mood: 'love' },
    { t: 11.8, mood: 'happy' },
    { t: 13.3, mood: 'love', d: 0.1 },
  ],
  signK: [
    { t: 0, x: 330, y: 1460, size: 200, mood: 'wide', look: [0, -1] },
    { t: 1.6, mood: 'squint', look: [0, -1] },
    { t: 4.8, mood: 'wink', look: [0, 0] },
    { t: 7.2, mood: 'squint', look: [0, -1] },
    { t: 13.2, mood: 'wide', look: [-0.6, -1], d: 0.1 },
    { t: 13.6, mood: 'neutral', look: [0.6, 0] },
    { t: 16.4, mood: 'happy', look: [1, 0] },
  ],
  pisK: [
    { t: 0, x: 135, y: 1490, size: 130, mood: 'wide', look: [1, -1], tears: 1 },
    { t: 13.3, mood: 'wide', tears: 2 },
    { t: 18.8, mood: 'happy', tears: 3, d: 0.1 },
  ],
  bubbles: [
    { t0: 4.8, t1: 7.0, who: 'scorpio', text: 'Lock one has a *moat.*', x: 480, y: 1330, tail: -150, tailUp: false },
    { t0: 7.2, t1: 9.6, who: 'venus', text: 'Vulnerability isn’t weakness, darling.', y: 548, size: 46 },
    { t0: 9.8, t1: 11.6, who: 'venus', text: 'It’s the *invitation.*', y: 540, size: 56 },
    { t0: 13.6, t1: 15.8, who: 'scorpio', text: 'I was… *nervous* today.', x: 480, y: 1330, tail: -150, tailUp: false },
    { t0: 16.2, t1: 18.6, who: 'the date', text: 'Me too. I’m *glad* you said it.', x: 520, y: 1310, tail: 270, tailUp: false, size: 46, color: DATE.col },
    { t0: 18.8, t1: 21.0, who: 'pisces', text: 'It went CLICK. *I’m a puddle.*', x: 470, y: 1310, tail: -330, tailUp: false, maxW: 640 },
    { t0: 21.4, t1: 25, who: 'venus', text: 'Seven locks. *Open* one.', y: 540 },
  ],
  fx: [
  ],
  back(x, t) { vaultDoor(x, t) },
  mid(x, t, S) {
    heartDoor(x, t); key(x, t, S)
    const dk = pop01(t, T.date, 0.4, 2) * outK(t, [25, 25.3])
    if (dk > 0.01) drawStarChar(x, DATE.x, DATE.y, DATE.s, t, { color: DATE.col, mood: t > 16.2 ? 'happy' : 'wide', look: [-1, 0], pop: dk, hops: [16.3, 16.9, 17.5], seed: 17 })
  },
  front(x, t) {
    sparkleBurst(x, t, LP[0].x - 120, LP[0].y, T.click, { R: 200 })
    if (t > T.click + 0.2 && t < T.click + 1.2) txt(x, 'click.', LP[0].x - 120, LP[0].y - 100, { size: 56, italic: true, color: GOLD, stroke: INK, sw: 8, s: pop01(t, T.click + 0.2, 0.25, 3), alpha: outK(t, [T.click + 0.9, T.click + 1.2]) })
    if (t > 16.4 && t < 25) for (let k = 0; k < 4; k++) { const ph = ((t - 16.4) * 0.5 + k / 4) % 1; heart(x, 700 + Math.sin(k * 2 + t) * 120, 1420 - ph * 300, 18 * (1 - ph * 0.4), { alpha: (1 - ph) * outK(t, [25, 25.3]) }) }
    void CREAM; void ROSE; void VRIM
  },
  cues: [
    ...LOCKS.map((_, i) => ['tick', +(T.locks + i * 0.2).toFixed(2), 0.06]), ...LOCKS.map((_, i) => ['tom', +(T.locks + i * 0.2).toFixed(2), 120 - i * 6, { gain: 0.12, decay: 0.15 }]),
    ['whoosh', T.key[0], 0.6, 0.05], ['glitter', T.key[0], T.key[0] + 0.6],
    ['tick', T.click, 0.09], ['pop', T.click + 0.05, 1567.98, 0.06, -0.3], ['bell', T.click + 0.1, 1760, 0.05, 1.2, 0], ['whoosh', T.click + 0.5, 0.4, 0.04],
    ['pop', T.date, 784, 0.05, 0.3], ...sobCues(T.sob, 4),
  ],
})
export const { DURATION, SCENES, CUES } = EP
