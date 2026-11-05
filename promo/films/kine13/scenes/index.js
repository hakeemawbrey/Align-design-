// kine13: IS THIS NORMAL?, "Dreading the 'what are we' talk" (18.9 s vertical, star_advice post, music: synthwave · Gm).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Loop ending (back into frame 0).
//   0.00       frame 0: "Six months. No label. | *Normal?*" landed; ♑ Capricorn mid-flinch behind a couch cushion; the
//              phone on the couch glows: "can we talk?"
//   0.60       record scratch + freeze, caught circle on the phone: "it says *“can we talk?”*"
//   2.0–5.8    "Wanting a label. | *Dreading* asking."  The next message lands: "about dinner! tacos or pasta?" Relief,
//              then the dread creeps back. ♓ Pisces hides behind the other cushion, crying.
//   5.95–9.7   NORMAL-O-METER: NORMAL.
//   9.8–16.7   THE STARS: "wanting clarity is fair. dreading it is *human.*" → "ask with curiosity, not a deadline.
//              then *listen.*"  At the table, a talk card lands: "What are we each looking for?" ♍ Virgo smiles:
//              "honestly? I hoped you'd ask." Pisces happy-cries.
//  16.8–18.9   last line: "Wanting to know where | you stand is *fair.*"  Then the loop back into frame 0.
import {
  makeNormal, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, miniPhone, pop01, outK, prog, lerp, clamp, ease, r3,
} from '../../kine01/normalkit.js'

const D = 18.9, FLOOR = 1480
const T = {
  rec: 0.6, h0Out: [1.85, 2.0], h1: 2.0, h1Out: [5.6, 5.8], dinner: 2.7, dread: 4.4, pisIn: 3.2,
  meter: 5.95, mOut: [9.55, 9.8],
  starsIn: 9.7, l1: 9.95, l2: 13.25, boxClose: 16.7, card: 13.6, ask: 14.6, hope: 15.4,
  last: 16.8,
}
const REC = { at: T.rec, len: 1.25, caption: 'it says *“can we talk?”*', top: 1660 }

function den(x, t) {
  room(x, { y: FLOOR, wall: '#22163f', floor: '#2e2250' })
  // neon grid-ish window
  box(x, 700, 470, 280, 280, '#1a0f3a', { b: 8 }); for (let i = 0; i < 5; i++) R(x, '#ff5cbf', 710, 500 + i * 50, 260, 3)
}
function couch(x) {
  box(x, 90, 1120, 900, 130, '#6a4aa8', { b: 8, hi: '#7d5cbf' })
  box(x, 60, 1220, 960, 190, '#5a3e92', { b: 8 })
  R(x, INK, 110, 1410, 20, FLOOR - 1410); R(x, INK, 950, 1410, 20, FLOOR - 1410)
}
function cushion(x, cx, cy, rot, col = '#ff9fbf') {
  x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -110, -90, 220, 180, col, { b: 7, hi: '#ffc4d8' }); R(x, INK, -6, -6, 12, 12); x.restore()
}
function talkCard(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  box(x, -190, -120, 380, 240, '#2a1f55', { b: 8 }); R(x, GOLD, -176, -106, 352, 6); R(x, GOLD, -176, 100, 352, 6)
  x.font = `700 20px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TALK CARD', 0, -70)
  x.font = `800 34px ${INTER}`; x.fillStyle = BONE; x.fillText('What are we each', 0, -10); x.fillText('looking for?', 0, 36)
  x.restore()
}

const EP = makeNormal({
  id: 'kine13', D, ending: 'loop', hero: 'capricorn',
  hook: { text: 'Six months. No label. | *Normal?*', out: T.h0Out, accentColor: '#ff5cbf' },
  rec: REC,
  catch: { at: T.rec + 0.12, x: 640, y: 1090, r: 190, out: [T.rec + 1.1, T.rec + 1.25], label: null, arrow: null },
  heads: [{ text: 'Wanting a label. | *Dreading* asking.', at: T.h1, out: T.h1Out, size: 96, accent: '#ff5cbf', late: 1, lateAt: T.h1 + 0.5 }],
  meter: { at: T.meter, land: 'normal', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: 'wanting clarity is fair. dreading it is *human.*' },
    { t: T.l2, text: 'ask with curiosity, not a deadline. then *listen.*' },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Wanting to know where | you stand is *fair.*', at: T.last, lateAt: T.last + 0.6, accent: GOLD, size: 92 },
  punches: [T.h1, T.dinner, T.meter + 1.75, T.card],
  shakes: [{ t: 0, a: 12 }, { t: T.dread, a: 8 }],
  scene(x, t, S) {
    if (t < T.meter) {
      den(x, t)
      couch(x)
      // the phone on the couch
      const msg = t < T.dinner ? 'can we talk?' : 'tacos or pasta?'
      miniPhone(x, 640, 1090, { s: 1.6, rot: -0.1, glow: 1, lines: [{ text: 'them', size: 16, col: 'rgba(239,230,214,0.6)' }, { text: msg.split(' ').slice(0, 2).join(' '), size: 20, dy: 24, col: t < T.dinner ? '#ff8fb1' : MINT }, { text: msg.split(' ').slice(2).join(' '), size: 20, dy: 24, col: t < T.dinner ? '#ff8fb1' : MINT }] })
      if (t > T.dinner) label(x, 'about dinner!', 640, 840, { size: 30, col: MINT, alpha: pop01(t, T.dinner, 0.25, 2.4) * outK(t, [T.dread, T.dread + 0.3]) })
      // Capricorn: mid-flinch behind the cushion (peeking more after the dinner relief)
      const peek = t > T.dinner && t < T.dread ? 1 : 0.3
      const flinch = Math.exp(-Math.max(0, t) * 4)
      S.hero(x, t, { x: 270, y: 1080 - 60 * peek + 20 * flinch, s: 380, mood: t > T.dinner && t < T.dread ? 'happy' : 'wide', look: [1, 0.5], squash: 0.1 * flinch, hops: [T.dinner, T.dread] })
      cushion(x, 300, 1290, -0.12 + 0.05 * flinch)
      if (t > T.dread) label(x, '…but still.', 300, 900, { size: 30, col: BONE, alpha: pop01(t, T.dread, 0.25, 2) * outK(t, [T.meter - 0.2, T.meter]) })
      // Pisces behind the other cushion, crying
      const pk = pop01(t, T.pisIn, 0.35, 2.2)
      S.pis(x, t, { x: 840, y: 1100, s: 280, pop: pk, tears: 3, mood: 'wide', look: [-1, 0.3] })
      if (pk > 0.01) cushion(x, 850, 1290, 0.1, '#7fd0ff')
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      den(x, t)
      const vir = S.sign('virgo')
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      // the table
      box(x, 200, 1220, 680, 30, '#8a6440', { b: 7 }); R(x, INK, 530, 1250, 20, FLOOR - 1250)
      S.hero(x, t, { x: 250, y: 1110, s: 300, pop: k, mood: t > T.hope ? 'sparkle' : t > T.ask ? 'neutral' : 'wide', look: [1, 0.2], hops: [T.mOut[0] + 0.2, T.card, T.ask, T.hope + 0.3] })
      vir(x, t, { x: 830, y: 1120, s: 290, pop: k, mood: t > T.hope ? 'happy' : 'neutral', look: [-1, 0.2], hops: [T.hope], seed: 7, blush: t > T.hope })
      talkCard(x, t, 540, 870, pop01(t, T.card, 0.35, 2.4))
      bubble(x, t, 450, 690, T.ask, T.hope + 0.2, 'so… what are we each looking for?', { size: 28, tail: -0.5 })
      bubble(x, t, 720, 690, T.hope, D, "honestly? I hoped you'd ask.", { size: 30, col: '#c9ecfb', tail: 0.5 })
      if (t > T.hope) hearts(x, t, T.hope + 0.2, 540, 1100, { n: 6 })
      S.pis(x, t, { x: 840, y: 590, s: 150, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.hope ? 3 : 2, mood: t > T.hope ? 'happy' : 'wide', look: [-1, 1], hops: [T.hope + 0.2, T.last + 0.5] })
      S.stars(x, t, { x: 140, y: 620, s: 120, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.hope ? 'happy' : 'neutral', look: [1, 0.4] })
    }
  },
  cues: [
    ['pop', T.dinner, 1318.51, 0.045, 0.1], ['pop', T.dinner + 0.08, 1567.98, 0.035, 0.1], ['pluck', T.dinner + 0.2, 1174.66, 0.035, 0.5, -0.3],
    ['pluck', T.dread, 392, 0.04, 0.6, -0.3],
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4],
    ['whoosh', T.card - 0.05, 0.3, 0.04], ['pluck', T.card + 0.3, 1318.51, 0.04, 0.6, 0],
    ['pop', T.ask, 880, 0.04, -0.3], ['pop', T.hope, 1174.66, 0.045, 0.3], ['glitter', T.hope + 0.2, T.hope + 0.6],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, CYAN, drawBits, sparkles, shadow, glowAt, clamp, lerp]
