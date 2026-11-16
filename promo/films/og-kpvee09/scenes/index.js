// og-kpvee09: social rework of kpvee09. Static HOOK (outline) 0–2.8 replaces the slam; no whip zoom / shake; no series
// bug (kit copy); no loop-back (ends in the bookshop nap, Venus's last line); Venus lower/smaller, everyone and every
// line in the safe zone; no emoji; crazier lines.
// Was: kpvee09 · Planet Talk: Venus to Sagittarius — "They Said Coffee" (24 s vertical, star_talk, loop). synthwave · Bm.
//   0.00  frame 0: Venus mid-parachute-drop onto Sag's giant backpack, canopy billowing, glitter; Sag mid-sprint in a
//         head torch. Slam "SAGITTARIUS. They said *coffee*, darling."
//   2.9   record scratch + freeze: "date idea: 5 a.m. mountain, 14 km." (their text said: coffee?)
//   4.8   Sag: "Coffee is boring! Adventure!" Venus: "Love language check, darling. Ask what they love."
//  11.2   the text: "what's your perfect saturday?" → "a bookshop. then a nap." Sag: "…a nap?"
//  15.2   the beanbag: Sag reading, delighted. SIDE QUEST COMPLETE: cosy bookshop nap. Pisces sobs at the nap.
//  21.0   slam "Best trip? *Their* idea."  Loops back into the drop.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { episode, panel, txt, heart, sparkleBurst, phone, pop01, outK, sobCues, INK, ROSE, CREAM, GOLD, BONE } from '../venuskit.js'

export const HOOK = 'They said coffee. | Sag heard *14 km.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.8

const IN = { kind: 'drop', at: -2.0, x: 540, y: 780, size: 290 }
const T = { rec: 2.9, phone: [11.2, 15.0], cosy: 15.2, sob: 18.8, last: 21.0, back: 99 }
const DATE = { x: 830, y: 1440, s: 200, col: '#ffd27a' }
const cosyK = t => ease.inOutCubic(prog(t, T.cosy, T.cosy + 0.6)) * (1 - ease.inOutCubic(prog(t, T.back, T.back + 0.6)))

function parachute(x, t, V) {
  const land = IN.at + 1.4
  const c = 1 - ease.inCubic(prog(t, land, land + 0.9))
  if (c <= 0.01) return
  const cy = V.y - V.size * 0.5 - 110 * c - 10
  x.save(); x.globalAlpha *= c
  x.strokeStyle = INK; x.lineWidth = 4
  for (let k = -3; k <= 3; k++) { x.beginPath(); x.moveTo(V.x + k * 70 * c, cy); x.lineTo(V.x + k * 30, V.y - V.size * 0.42); x.stroke() }
  x.translate(V.x, cy); x.scale(1, 0.5 + 0.5 * c)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 250 * (0.6 + 0.4 * c), Math.PI, 0); x.closePath(); x.fill()
  for (let k = 0; k < 6; k++) { x.fillStyle = k % 2 ? ROSE : CREAM; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 238 * (0.6 + 0.4 * c), Math.PI + k * Math.PI / 6, Math.PI + (k + 1) * Math.PI / 6); x.closePath(); x.fill() }
  x.restore()
}
function backpack(x, t, S) {
  const a = 1 - cosyK(t)
  if (a <= 0.01) return
  const s = S.sign
  x.save(); x.globalAlpha *= a
  x.fillStyle = INK; x.beginPath(); x.roundRect(s.x - 150, s.y - 330, 300, 380, 50); x.fill()
  x.fillStyle = '#3f8a5a'; x.beginPath(); x.roundRect(s.x - 140, s.y - 320, 280, 360, 44); x.fill()
  x.fillStyle = '#2f6a44'; x.beginPath(); x.roundRect(s.x - 100, s.y - 200, 200, 120, 20); x.fill()
  x.fillStyle = '#c94a3a'; x.beginPath(); x.roundRect(s.x - 150, s.y - 360, 300, 60, 30); x.fill()   // the bedroll
  x.restore()
}
function headTorch(x, t, S) {
  const a = 1 - cosyK(t)
  if (a <= 0.01) return
  const s = S.sign
  x.save(); x.globalAlpha *= 0.4 * a
  const g = x.createLinearGradient(s.x, s.y - 80, s.x - 600, s.y - 400); g.addColorStop(0, 'rgba(255,240,170,0.9)'); g.addColorStop(1, 'rgba(255,240,170,0)')
  x.fillStyle = g; x.beginPath(); x.moveTo(s.x - 20, s.y - 90); x.lineTo(s.x - 700, s.y - 520); x.lineTo(s.x - 700, s.y - 140); x.closePath(); x.fill()
  x.restore()
  x.save(); x.globalAlpha *= a; x.fillStyle = INK; x.fillRect(s.x - 46, s.y - 110, 40, 30); x.fillStyle = '#fff4b0'; x.fillRect(s.x - 40, s.y - 104, 28, 18); x.restore()
}
function speedLines(x, t, S) {
  const a = 1 - prog(t, 1.0, 2.0)
  if (a <= 0) return
  x.save(); x.strokeStyle = 'rgba(255,250,240,0.7)'; x.lineWidth = 8; x.lineCap = 'round'; x.globalAlpha = a
  for (let k = 0; k < 6; k++) { const yy = S.sign.y - 100 + k * 40, ph = (t * 4 + k * 0.3) % 1; x.beginPath(); x.moveTo(S.sign.x + 170 + ph * 60, yy); x.lineTo(S.sign.x + 300 + ph * 140, yy); x.stroke() }
  x.restore()
}
function beanbag(x, t, S) {
  const k = cosyK(t)
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  x.fillStyle = INK; x.beginPath(); x.ellipse(S.sign.x, S.sign.y + 150, 230, 100, 0, 0, 7); x.fill()
  x.fillStyle = '#c86a9a'; x.beginPath(); x.ellipse(S.sign.x, S.sign.y + 145, 220, 90, 0, 0, 7); x.fill()
  // a bookshelf behind
  for (let r = 0; r < 3; r++) { x.fillStyle = INK; x.fillRect(80, 820 + r * 150, 920, 16); for (let b = 0; b < 14; b++) { x.fillStyle = ['#ff8fb1', '#7fd0ff', '#ffd27a', '#9fe6b0', '#c9a6ff'][(b + r) % 5]; x.fillRect(100 + b * 64, 820 + r * 150 - 100 - (b % 3) * 12, 48, 100 + (b % 3) * 12) } }
  x.restore()
}
function book(x, t, S) {
  const k = cosyK(t)
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k; x.translate(S.sign.x + 10, S.sign.y + 150); x.rotate(-0.05); x.scale(0.75, 0.75)
  x.fillStyle = INK; x.fillRect(-110, -60, 220, 120); x.fillStyle = CREAM; x.fillRect(-104, -54, 100, 108); x.fillRect(4, -54, 100, 108)
  x.fillStyle = 'rgba(27,18,54,0.35)'; for (let j = 0; j < 5; j++) { x.fillRect(-94, -40 + j * 20, 80, 5); x.fillRect(14, -40 + j * 20, 80, 5) }
  x.restore()
}

const EP = episode({
  sign: 'sagittarius', dur: 24, ending: 'cut',
  enter: IN,
  venus: [
    { t: 0, x: 540, y: 780, size: 290, mood: 'wide', look: [0.4, 1] },
    { t: 1.8, mood: 'sly', look: [0.4, 1] },
    { t: 7.0, d: 0.6, x: 540, y: 700, size: 240, mood: 'love' },
    { t: 13.6, mood: 'happy' },
    { t: 15.6, d: 0.6, x: 300, y: 700, size: 240, mood: 'love', look: [1, 1] },
  ],
  signK: [
    { t: 0, x: 640, y: 1420, size: 250, mood: 'wide', look: [-1, -0.4], squash: -0.1 },
    { t: 1.6, squash: 0, mood: 'happy' },
    { t: 4.8, mood: 'sparkle', look: [-1, -0.6] },
    { t: 7.0, mood: 'neutral', look: [-1, -1] },
    { t: 11.4, mood: 'neutral', look: [-0.6, -1] },
    { t: 13.6, mood: 'wide', look: [0, 0], d: 0.1 },
    { t: 15.6, d: 0.6, x: 470, y: 1420, mood: 'happy', look: [0, 0.6] },
    { t: 16.6, mood: 'sparkle', look: [0, 0.6] },
  ],
  pisK: [
    { t: 0, x: 150, y: 1480, size: 140, mood: 'wide', look: [1, -1], tears: 1 },
    { t: 13.6, mood: 'wide', tears: 2 },
    { t: 18.8, mood: 'happy', tears: 3, d: 0.1 },
  ],
  bubbles: [
    { t0: 4.8, t1: 6.8, who: 'sagittarius', text: 'Coffee? I packed *crampons!*', x: 560, y: 1200, tail: 80, tailUp: false },
    { t0: 7.0, t1: 9.0, who: 'venus', text: 'Love language check, darling.', y: 525, size: 46 },
    { t0: 9.2, t1: 11.0, who: 'venus', text: 'Ask what *they* love.', y: 525, size: 56 },
    { t0: 13.6, t1: 15.0, who: 'sagittarius', text: '…a *nap?*', x: 640, y: 1250, tailUp: false, size: 60 },
    { t0: 16.6, t1: 18.6, who: 'sagittarius', text: 'Best. Trip. *EVER.*', x: 500, y: 1210, tail: -30, tailUp: false },
    { t0: 18.8, t1: 20.8, who: 'pisces', text: 'A NAP date?! I’m *weeping.*', x: 420, y: 1220, tail: -270, tailUp: false },
    { t0: 21.0, t1: 25, who: 'venus', text: 'Best trip? *Their* idea.', x: 420, y: 525, tail: -120 },
  ],
  fx: [
    ['recordScratch', { at: T.rec, len: 1.6, caption: 'date idea: *a mountain.*', sub: '5 a.m. 14 km. their text said: coffee?', top: 1040 }],
    ['achievement', { at: 16.2, out: [18.4, 18.7], title: 'SIDE QUEST COMPLETE', text: '*cosy* bookshop nap', icon: 'Zz', y: 900 }],
  ],
  back(x, t, S) { beanbag(x, t, S); backpack(x, t, S); parachute(x, t, S.venus) },
  mid(x, t, S) {
    const pk = pop01(t, T.phone[0], 0.35) * outK(t, [T.phone[1] - 0.3, T.phone[1]])
    if (pk > 0.01) phone(x, t, { cx: 540, cy: 1010, w: 540, h: 460, s: pk, title: '♐︎ → the date', msgs: [{ at: 11.5, side: 'R', text: 'what’s your perfect saturday?' }, { at: 12.7, side: 'L', text: 'a bookshop. then a nap.' }], typing: [12.0, 12.7] })
    const dk = cosyK(t)
    if (dk > 0.01) drawStarChar(x, DATE.x, DATE.y, DATE.s, t, { color: DATE.col, mood: 'sleepy', pop: dk, seed: 19 })
  },
  front(x, t, S) { speedLines(x, t, S); headTorch(x, t, S); book(x, t, S); sparkleBurst(x, t, S.sign.x, S.sign.y, 16.6, { R: 240 }); void heart; void panel; void txt; void clamp; void lerp; void GOLD; void BONE },
  cues: [
    ['whoosh', 11.2, 0.35, 0.04], ['pop', 11.5, 880, 0.04, 0.2], ['tick', 12.0, 0.02], ['tick', 12.3, 0.02], ['pop', 12.7, 659.25, 0.05, -0.2],
    ['whoosh', T.cosy, 0.6, 0.05], ['bell', T.cosy + 0.5, 1174.66, 0.03, 1.4, 0], ...sobCues(T.sob, 4),
  ],
})
export const { DURATION, SCENES, CUES } = EP
