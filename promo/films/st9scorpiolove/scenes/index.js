// st9scorpiolove (30 s vertical, Star Talk season 9 "A Day in the Life", S9 E38) · story 0–25.6, then the shared end card.
//   DATE NIGHT. "Dating a Scorpio: the background check is *free*."  Scorpio's kitchen at 7:30 PM (st9scorpiohome, ep
//   'love': the candle is lit). Taurus, its canon partner (season 4/5), cooks; Scorpio sits behind a fat dossier: TAURUS.
//   3.0   TAURUS: "so… how was your *day?*"   5.2 punch on the dossier: FAVE FOOD: KOLACHES ✓ · 2014 PHOTOS ✓ ·
//         MOM'S BDAY ✓ · SCORPIO: "i already know about yours. i read your *2014.*"
//   8.6   punch on Taurus, who laughs: "…you could just *ask* me." (season 1: "just ask. out loud.")
//   11.2  the dossier goes in the drawer; out comes an index card: ASK OUT LOUD. "okay. what's your *favorite* memory?"
//         TAURUS: "honestly? *this* one."
//   16.0  the window, night: Antares glows red. Fact chip: Antares, a red supergiant, "rival of Mars". SCORPIO: "your
//         turn. ask me *anything.*"  TAURUS: "…why is there a pink *sock* on the floor?" (punch on the sock from E36)
//   22.6  frame 0's framing: the index card where the dossier was, two plates.   23.0 last line: "Trust, then verify… *less*."
//   Rewatch bait: the dossier's last tab says "FILE 9 OF 9: LIKES ME?" with a ✓. The ghost peeks over the espresso machine
//   at 12.6.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawBits } from '../../st5cast.js'
import { drawScorpioHome, drawPinkSock, SCORPIO } from '../../st9scorpiohome.js'
import { makeDay, star, tag, pop01 } from '../../st9lskit.js'

const DUR = 30
const T = { hookOut: 2.8, l1: 3.0, dossier: 5.2, l2: 5.4, taurus: 8.6, l3: 8.8, wide: 11.2, shut: 11.3, card: 11.8, l4: 12.0, ghost: 12.6, both: 14.4, l5: 14.6, win: 16.0, fact: 16.2, l6: 17.0, tau2: 19.4, l7: 19.6, sock: 21.4, rhyme: 22.6, last: 23.0 }
const SCO = tag('scorpio'), TAU = tag('taurus')
const LINES = [
  { t: T.l1, speaker: TAU, text: 'so… how was your *day?*', color: '#f2c75c' },
  { t: T.l2, speaker: SCO, text: 'i already know about yours. i read your *2014.*', color: SCORPIO.redHi },
  { t: T.l3, speaker: TAU, text: '…you could just *ask* me.', color: '#f2c75c' },
  { t: T.l4, speaker: SCO, text: 'okay. what’s your *favorite* memory?', color: SCORPIO.pink },
  { t: T.l5, speaker: TAU, text: 'honestly? *this* one.', color: '#f2c75c' },
  { t: T.l6, speaker: SCO, text: 'your turn. ask me *anything.*', color: SCORPIO.pink },
  { t: T.l7, speaker: TAU, text: '…why is there a pink *sock* on the floor?', color: SCORPIO.pink },
]
const INK = '#0c0710', BONE = '#efe6d6'
const rr = Math.round
const R = (x, c, X, Y, W, H) => { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
function label(x, text, cx, cy, size, col, font = "700 SIZEpx 'Space Mono', monospace", align = 'center') {
  x.save(); x.font = font.replace('SIZE', size); x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, cx, cy); x.restore()
}
const PASTA = ['..yyyy..', '.yyrryy.', 'yyrrrryy', 'wwwwwwww', '.wwwwww.']
const PASTA_C = { y: '#f2d27a', r: '#e8382c', w: '#efe6d6' }

/** the little table in front of Scorpio */
function table(x, t) {
  R(x, INK, 140, 1180, 320, 30); R(x, '#4a2a34', 146, 1184, 308, 22); R(x, INK, 280, 1210, 40, 120)
  if (t > T.rhyme) { drawBits(x, PASTA, PASTA_C, 220, 1166, 6); drawBits(x, PASTA, PASTA_C, 380, 1166, 6) }
}
/** the dossier on the table: shut, open (the close-up), or gone */
function dossier(x, t) {
  if (t > T.shut + 0.3) return
  const open = t > T.dossier && t < T.wide
  const k = 1 - prog(t, T.shut, T.shut + 0.3)
  x.save(); x.globalAlpha = k
  if (!open) {
    R(x, INK, 200, 1090, 180, 96); R(x, '#c9a46a', 206, 1096, 168, 84); R(x, '#a8743e', 206, 1096, 60, 16)
    label(x, 'TAURUS', 290, 1140, 26, INK); label(x, 'FILE 1–9', 290, 1166, 14, '#5a3a1e')
  } else {
    x.translate(0, 210)
    R(x, INK, 120, 980, 360, 210); R(x, '#f4efe6', 126, 986, 170, 198); R(x, '#ece4d4', 304, 986, 170, 198)
    const rows = ['FAVE FOOD:', 'KOLACHES ✓', '2014 PICS ✓', 'MOM’S BDAY ✓']
    rows.forEach((r, i) => label(x, r, 140, 1012 + i * 30, 15, i % 2 ? SCORPIO.trim : INK, undefined, 'left'))
    label(x, 'FILE 9 OF 9:', 318, 1012, 15, INK, undefined, 'left'); label(x, 'LIKES ME? ✓', 318, 1042, 15, SCORPIO.trim, undefined, 'left')
    R(x, '#5a6fa8', 326, 1070, 90, 80); R(x, INK, 326, 1070, 90, 4); label(x, '2014', 371, 1112, 18, BONE)
  }
  x.restore()
}
function indexCard(x, t, r) {
  const k = pop01(t, T.card, 0.35, 2.2)
  if (k <= 0.02 || t > T.win && t < T.rhyme) return
  const cx = t > T.rhyme ? 300 : r.x + 110, cy = t > T.rhyme ? 1140 : r.y + 40
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  R(x, INK, -84, -50, 168, 100); R(x, BONE, -80, -46, 160, 92); R(x, SCORPIO.red, -80, -46, 160, 22)
  label(x, 'ASK OUT LOUD', 0, -35, 15, BONE); for (let i = 0; i < 3; i++) R(x, '#cfc4b4', -62, -6 + i * 18, 124, 5)
  x.restore()
}
function pot(x, t, cx, cy) {
  R(x, INK, cx - 70, cy - 50, 140, 70); R(x, '#6a6070', cx - 64, cy - 44, 128, 58); R(x, INK, cx - 90, cy - 40, 24, 12); R(x, INK, cx + 66, cy - 40, 24, 12)
  for (let i = 0; i < 3; i++) { x.fillStyle = 'rgba(239,230,214,0.45)'; x.fillRect(cx - 30 + i * 30 + Math.sin(t * 3 + i) * 6, cy - 80 - ((t * 30 + i * 14) % 30), 8, 16) }
}
/** Antares in the window: a red supergiant pixel star, glowing, plus Scorpius's faint body stars */
function antares(x, t, win) {
  const k = prog(t, T.win + 0.2, T.win + 0.9)
  if (k <= 0) return
  const ax = win.x0 + (win.x1 - win.x0) * 0.62, ay = win.y0 + (win.y1 - win.y0) * 0.36
  x.save(); x.globalAlpha = k
  const body = [[-120, -70], [-60, -30], [60, 40], [100, 110], [90, 190], [40, 240], [-20, 230]]
  x.strokeStyle = 'rgba(255,138,122,0.45)'; x.lineWidth = 3; x.beginPath(); x.moveTo(ax + body[0][0], ay + body[0][1]); x.lineTo(ax + body[1][0], ay + body[1][1]); x.lineTo(ax, ay); body.slice(2).forEach(([u, v]) => x.lineTo(ax + u, ay + v)); x.stroke()
  for (const [u, v] of body) R(x, '#fff6dc', ax + u - 4, ay + v - 4, 8, 8)
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(ax, ay, 0, ax, ay, 120); g.addColorStop(0, `rgba(255,80,60,${0.6 + 0.15 * Math.sin(t * 3)})`); g.addColorStop(1, 'rgba(255,80,60,0)')
  x.fillStyle = g; x.fillRect(ax - 120, ay - 120, 240, 240)
  x.globalCompositeOperation = 'source-over'
  R(x, '#ff5a3c', ax - 12, ay - 12, 24, 24); R(x, '#ffb38a', ax - 6, ay - 6, 12, 12); R(x, '#ff5a3c', ax - 30, ay - 3, 60, 6); R(x, '#ff5a3c', ax - 3, ay - 30, 6, 60)
  label(x, 'ANTARES', ax, ay + 50, 22, '#ff9a8a')
  x.restore()
}

function scoState(t) {
  if (t < T.dossier) return { mood: 'squint', look: [-1, 1] }
  if (t < T.taurus) return { mood: 'squint', look: [1, 0], blink: false }
  if (t < T.wide) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.l5) return { mood: 'neutral', look: [1, 0] }
  if (t < T.win) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.l7 + 0.8) return { mood: 'happy' }
  if (t < T.rhyme) return { mood: 'wide', look: [0, 1], blink: false }
  return { mood: 'happy', look: [1, 0] }
}
function tauState(t) {
  if (t < T.l2) return { mood: 'happy', look: [-1, 0] }
  if (t < T.l3) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.l5) return { mood: 'happy', look: [-1, 0] }
  if (t < T.win) return { mood: 'heart' }
  if (t < T.l7) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.rhyme) return { mood: 'squint', look: [-1, 1] }
  return { mood: 'happy', look: [-1, 0] }
}

const EP = makeDay({
  numeral: 'S9 E38', sign: 'scorpio', ep: 'love', home: drawScorpioHome, duration: DUR, key: 'Gm',
  hook: { text: 'Dating a Scorpio: the background check is *free.*', out: [T.hookOut - 0.2, T.hookOut], accentColor: SCORPIO.redHi, size: 88, accentSize: 128 },
  shots: [
    { at: 0, room: 'kitchen', hour: 19.5, zoom: { x: 540, y: 1000, s: 1.12 } },
    { at: T.dossier, room: 'kitchen', hour: 19.6, zoom: { x: 300, y: 1180, s: 1.45 } },
    { at: T.taurus, room: 'kitchen', hour: 19.7, zoom: { x: 760, y: 1040, s: 1.45 } },
    { at: T.wide, room: 'kitchen', hour: 19.8, zoom: { x: 540, y: 1000, s: 1.12 } },
    { at: T.both, room: 'kitchen', hour: 19.9, zoom: { x: 540, y: 1060, s: 1.3 } },
    { at: T.win, room: 'window', hour: 21, zoom: { x: 540, y: 960, s: 1.05 } },
    { at: T.tau2, room: 'window', hour: 21.1, zoom: { x: 700, y: 1100, s: 1.35 } },
    { at: T.sock, room: 'window', hour: 21.2, zoom: { x: 330, y: 1240, s: 1.7 } },
    { at: T.rhyme, room: 'kitchen', hour: 21.4, zoom: { x: 540, y: 1000, s: 1.12 } },
  ],
  clock: [{ at: 0, from: '7:30', ampm: 'PM' }, { at: T.wide, dur: 0.6, from: '7:30', to: '7:52', ampm: 'PM' }, { at: T.win, dur: 0.7, from: '7:52', to: '9:04', ampm: 'PM' }, { at: T.rhyme, dur: 0.6, from: '9:04', to: '9:20', ampm: 'PM' }],
  stamps: [
    { at: 0.5, out: T.dossier - 0.1, time: '7:30 PM', text: 'date *night*', top: 1260 },
    { at: T.wide + 0.2, out: T.both - 0.1, time: '7:52 PM', text: '*practising*' },
  ],
  lines: LINES, box: { close: 22.8 },
  fact: { at: T.fact, dur: 4.4, label: '★ REAL SKY', text: 'Antares, the Scorpion’s red heart, is a red supergiant. Its name means “rival of Mars.”', color: '#ff7a5a' },
  ghost: { room: 'kitchen', at: T.ghost, x: 170, y: 934, from: 'below' },
  battery: 0.4,
  pitch: { [SCO]: 523.25, [TAU]: 440 },
  cuts: [{ t: T.win, kind: 'flip' }],
  draw(x, t, a, sh) {
    if (sh.room === 'kitchen') {
      drawPinkSock(x, 520, 1300, 5, { rot: -0.2 })
      pot(x, t, 860, 1050)
      const rT = star(x, 'taurus', 800, 1130, 250, t, { ...tauState(t), seed: 5, hops: [T.l1, T.l3, T.l3 + 0.4, T.l5] })
      const rS = star(x, 'scorpio', 300, 1110, 250, t, { ...scoState(t), seed: 6, hops: [T.l2, T.shut, T.l4] })
      table(x, t); dossier(x, t); indexCard(x, t, rS)
      void rT
    } else {
      antares(x, t, a.win)
      drawPinkSock(x, 330, 1300, 6, { rot: 0.15 })
      if (sh.at === T.sock) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(330, 1300, 0, 330, 1300, 110); g.addColorStop(0, `rgba(255,154,200,${0.5 + 0.2 * Math.sin(t * 9)})`); g.addColorStop(1, 'rgba(255,154,200,0)'); x.fillStyle = g; x.fillRect(220, 1190, 220, 220); x.restore() }
      star(x, 'scorpio', 440, 1170, 230, t, { ...scoState(t), seed: 6, look: t < T.l7 ? [1, -1] : [-1, 1], hops: [T.l6] })
      star(x, 'taurus', 720, 1170, 230, t, { ...tauState(t), seed: 5, hops: [T.l7] })
    }
  },
  last: { at: T.last, text: 'Trust, then verify… *less.*', accentColor: SCORPIO.pink },
  cues: [
    ['pop', T.dossier, 659.25, 0.04, -0.3], ['tick', T.dossier + 0.05, 0.05],
    ['pluck', T.l3 + 0.6, 1046.5, 0.04, 0.5, 0.3],
    ['tom', T.shut, 0.08], ['pop', T.card, 1318.51, 0.05, 0], ['glitter', T.card, T.card + 0.6],
    ['riser', T.win, T.win + 0.9, 0.035], ['bell', T.win + 0.9, 1567.98, 0.02, 1.4, 0],
    ['tom', T.sock, 0.07], ['pop', T.sock + 0.05, 1760, 0.05, -0.3],
  ],
})
export const { DURATION, SCENES, CUES } = EP
export { T }
