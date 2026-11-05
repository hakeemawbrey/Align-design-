// kine14: IS THIS NORMAL?, "Left on read and my whole day's ruined" (18.2 s vertical, star_advice post, music: pop · C).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "Left on read. | Day = *ruined.*" landed; ♌ Leo mid-scream at a phone: "Read 9:14".
//   0.60       caught circle on the tiny read receipt (CAUGHT IN 4K) + punch.
//   2.0–5.7    "No reply. | Brain: *worst case.*"  Worst-case bubbles pop around Leo ("they hate me", "was my 'lol'
//              wrong?", "they moved to the moon"); a loading bar: "reading into 'Read'…" 99% → "Error: no data".
//              ♓ Pisces cries in sympathy.
//   5.85–9.6   NORMAL-O-METER: SO NORMAL.
//   9.7–16.3   THE STARS: "silence is a blank. your brain fills it with the *worst.*" → "put the phone down. go do
//              the *next* thing."  Phone face down; Leo waters a plant, makes toast; at 15.2 the reply pops:
//              "sorry!! was driving". Pisces cries in relief.
//  16.4–18.2   last line: "Silence is a blank. | Don't fill it with *fear.*"  Hard cut.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, miniPhone, pop01, outK, prog, lerp, clamp, ease, r3,
} from '../../kine01/normalkit.js'

const D = 18.2, FLOOR = 1480
const T = {
  catch: 0.6, h0Out: [1.85, 2.0], h1: 2.0, h1Out: [5.5, 5.7], worst: [2.4, 2.9, 3.4], load: 3.6, pisIn: 2.6,
  meter: 5.85, mOut: [9.45, 9.7],
  starsIn: 9.6, l1: 9.85, l2: 13.05, boxClose: 16.3, down: 13.4, plant: 14.0, reply: 15.2,
  last: 16.4,
}
const CATCH = { at: T.catch, x: 790, y: 1030, r: 130, out: [1.8, 1.95], label: 'READ 9:14', arrow: 'tl', rec: true }
const LOAD = { at: T.load, len: 2.0, label: 'reading into “Read”…', stallAt: 99, error: 'Error: no data', y: 1480 }

function apartment(x, t) {
  room(x, { y: FLOOR, wall: '#26183e', floor: '#33264c' })
  box(x, 800, 470, 200, 260, '#2b4a7a', { b: 8 }); glowAt(x, 900, 560, 130, '255,226,150', 0.3)
}
function bigPhone(x, t, cx, cy, s, read) {
  x.save(); x.translate(cx, cy); x.rotate(0.08); x.scale(s, s)
  box(x, -150, -240, 300, 480, '#2a2148', { b: 9 }); R(x, '#120c2a', -134, -220, 268, 430)
  R(x, '#4f8df0', -40, -70, 160, 70); x.font = `700 32px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('hiii!! :)', 40, -34)
  if (read) { x.font = `700 26px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.85)'; x.textAlign = 'right'; x.fillText('Read 9:14', 120, 30) }
  x.restore()
}
const WORST = ['they hate me', "was my 'lol' wrong?", 'they moved to the moon']
function plant(x, cx, cy, grow) {
  box(x, cx - 40, cy - 60, 80, 60, '#c86b4a', { b: 5 })
  drawBits(x, ['.G.G.', 'GGGGG', '.GGG.', '..G..'], { G: '#5fd38a' }, cx, cy - 90 - 10 * grow, 12 + 4 * grow)
}

const EP = makeNormal({
  id: 'kine14', D, ending: 'cut', hero: 'leo',
  hook: { text: 'Left on read. | Day = *ruined.*', out: T.h0Out, accentColor: '#ff8b9b' },
  catch: CATCH,
  fx: [[hook.loadingBar, hook.loadingBarCues, LOAD]],
  heads: [{ text: 'No reply. | Brain: *worst case.*', at: T.h1, out: T.h1Out, size: 96, accent: '#ff8b9b', late: 2, lateAt: T.h1 + 0.4 }],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: 'silence is a blank. your brain fills it with the *worst.*' },
    { t: T.l2, text: 'put the phone down. go do the *next* thing.' },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Silence is a blank. | Don’t fill it with *fear.*', at: T.last, lateAt: T.last + 0.6, accent: GOLD, size: 90 },
  punches: [T.catch, T.h1, ...T.worst, T.meter + 1.75, T.reply],
  shakes: [{ t: 0, a: 22 }, { t: 0.3, a: 12 }],
  scene(x, t, S) {
    if (t < T.meter) {
      apartment(x, t)
      // Leo mid-scream (wide, stretched, shaking)
      const scream = t < 1.6
      shadow(x, 330, FLOOR, 340)
      S.hero(x, t, { x: 320, y: 1180, s: 380, mood: scream ? 'wide' : 'squint', look: [1, -0.3], squash: scream ? -0.12 + 0.03 * Math.sin(t * 40) : 0, hops: [T.h1, ...T.worst] })
      if (scream) label(x, 'AAAA', 330, 860, { size: 60 + 6 * Math.sin(t * 30), col: '#ff8b9b', font: INTER, weight: 800, rot: -0.1 })
      bigPhone(x, t, 740, 1020, 1.2, true)
      WORST.forEach((w, i) => bubble(x, t, [280, 760, 420][i], [700, 640, 560][i] + 0, T.worst[i], T.meter - 0.1, w, { size: 30, col: '#ffd1d8', tail: [0.3, -0.5, 0][i] }))
      S.pis(x, t, { x: 900, y: 1760, s: 180, pop: pop01(t, T.pisIn, 0.35, 2.2), tears: 3, mood: 'wide', look: [-1, -0.6], tissues: 'left' })
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      apartment(x, t)
      // a counter with the phone face down, a plant, a toaster
      R(x, INK, 0, 1250, 1080, 12); R(x, '#8a6440', 0, 1262, 1080, 40)
      if (t < T.down) miniPhone(x, 760, 1170, { s: 0.8, glow: 1, rot: 0.1, lines: [{ text: 'Read 9:14', size: 16 }] })
      else if (t < T.reply) { box(x, 700, 1232, 140, 18, '#2a2148', { b: 5 }); label(x, 'face down.', 770, 1200, { size: 22, col: MINT, alpha: pop01(t, T.down, 0.25, 2) * outK(t, [T.plant + 0.8, T.plant + 1.1]) }) }
      else miniPhone(x, 770, 1110, { s: 1.1, glow: 1, rot: -0.05, lines: [{ text: 'them', size: 16, col: 'rgba(239,230,214,0.6)' }, { text: 'sorry!!', size: 20, col: MINT, dy: 20 }, { text: 'was driving', size: 18, dy: 24 }] })
      const grow = ease.outCubic(prog(t, T.plant, T.plant + 0.8))
      plant(x, 980, 1250, grow)
      if (t > T.plant && t < T.plant + 1.2) { x.save(); x.globalAlpha = 0.8; for (let i = 0; i < 5; i++) R(x, CYAN, 930 + i * 10, 1080 + ((t * 300 + i * 30) % 90), 5, 14); x.restore() }
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      const hx = t < T.plant ? 400 : lerp(400, 820, ease.inOutCubic(prog(t, T.plant - 0.4, T.plant)))
      S.hero(x, t, { x: t > T.reply ? lerp(hx, 560, ease.inOutCubic(prog(t, T.reply, T.reply + 0.4))) : hx, y: 1100, s: 300, pop: k, mood: t > T.reply ? 'sparkle' : t > T.down ? 'happy' : 'squint', look: t > T.reply ? [1, 0] : [1, 0.4], hops: [T.mOut[0] + 0.2, T.down, T.plant, T.reply] })
      if (t > T.reply) { hearts(x, t, T.reply + 0.1, 770, 960, { n: 5 }); sparkles(x, t, 770, 1110, T.reply, 10, 160, 1, [MINT, BONE, GOLD]) }
      S.pis(x, t, { x: 150, y: 1110, s: 200, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.reply ? 3 : 2, mood: t > T.reply ? 'happy' : 'wide', look: [1, -0.3], hops: [T.reply + 0.2, T.last + 0.5], say: [T.reply + 0.4, D, 'DRIVING!! thank goodness'], sayDx: 120, saySize: 26 })
      S.stars(x, t, { x: 560, y: 640, s: 130, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.reply ? 'happy' : 'neutral', look: [0, 0.6] })
    }
  },
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['pop', r3(0.02 + i * 0.07), 1318.51 + (i % 2) * 200, 0.02, (i % 2 ? 0.3 : -0.3)]),
    ...T.worst.map((w, i) => ['pop', w, [659.25, 587.33, 523.25][i], 0.045, [-0.3, 0.3, 0][i]]),
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['pluck', T.pisIn + 0.45, 1174.66, 0.03, 0.4, 0.4],
    ['tick', T.down, 0.08], ['pop', T.down + 0.05, 440, 0.04, 0.3],
    ['whoosh', T.plant - 0.4, 0.3, 0.03], ...Array.from({ length: 5 }, (_, i) => ['tick', r3(T.plant + 0.1 + i * 0.18), 0.015]), ['bell', T.plant + 0.8, 1760, 0.025, 1.0, 0.4],
    ['pop', T.reply, 1318.51, 0.05, 0.3], ['pop', T.reply + 0.08, 1760, 0.04, 0.3], ['glitter', T.reply, T.reply + 0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, clamp]
