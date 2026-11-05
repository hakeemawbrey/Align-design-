// kine04: IS THIS NORMAL?, "I rehearse texts like a speech" (18.2 s vertical, star_advice post, music: chiptune · E).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Loop ending (back into frame 0).
//   0.00       frame 0: "Draft eleven of a | *two-word* text." landed; ♎ Libra mid-gasp over a huge phone; the DRAFT
//              counter is mid-spin (DRAFT 11).
//   0.60       record scratch + freeze, caught circle on the draft: "it says *'hey :)'*".
//   1.9–5.6    "hey :)  hey!  *heyy?*"  The drafts flip on the phone; a loading bar: "choosing punctuation…" 99% →
//              "Error: too many options". ♓ Pisces reads along, crying: "the smiley one!!"
//   5.75–9.5   NORMAL-O-METER: SO NORMAL.
//   9.6–16.2   THE STARS: "you rehearse because you *care* how you land." → "pick the one that sounds like *you.* send
//              it."  Three draft cards hang on a line; Libra picks the one that sounds like them, SEND; a reply pops.
//  16.3–18.2   last line: "Send the one that | sounds like *you.*"  Then the loop back into frame 0.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, LAV, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, pop01, outK, prog, lerp, clamp, ease, r3,
} from '../../kine01/normalkit.js'

const D = 18.2, FLOOR = 1420
const T = {
  rec: 0.6, h0Out: [1.75, 1.9], h1: 1.9, h1Out: [5.45, 5.65], drafts: [1.9, 2.4, 2.9], load: 3.1, pisIn: 2.2,
  meter: 5.75, mOut: [9.35, 9.6],
  starsIn: 9.5, l1: 9.75, l2: 12.95, boxClose: 16.15, pick: 14.6, send: 15.3, reply: 15.9,
  last: 16.3,
}
const REC = { at: T.rec, len: 1.15, caption: "it says *“hey :)”*", top: 1600 }
const LOAD = { at: T.load, len: 2.4, label: 'choosing punctuation…', stallAt: 99, error: 'Error: too many options', y: 1500 }
const LIB = '#7fd0f0'

// the huge phone, held up: a draft in the text field and a spinning DRAFT counter
function bigPhone(x, t, cx, cy, s, draft, counter, spin = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.05)
  box(x, -190, -330, 380, 660, '#2a2148', { b: 10 })
  R(x, '#120c2a', -170, -300, 340, 600)
  R(x, '#1f1747', -170, -300, 340, 70)
  x.font = `700 26px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('them', 0, -264)
  // the text field
  box(x, -150, 170, 300, 80, '#2c2552', { b: 5 })
  x.font = `700 46px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(draft, -128, 212)
  if (Math.floor(t * 3) % 2 === 0) R(x, CYAN, -128 + x.measureText(draft).width + 6, 186, 5, 50)
  // the DRAFT counter, top, spinning like a slot reel
  x.save(); x.translate(0, -150); x.rotate(0.06 * Math.sin(spin * 30))
  box(x, -120, -40, 240, 80, GOLD, { b: 6, hi: '#ffe6a0' })
  x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'
  x.save(); x.beginPath(); x.rect(-120, -40, 240, 80); x.clip()
  const off = spin > 0 ? (spin * 900) % 80 : 0
  x.fillText(`DRAFT ${counter}`, 0, 2 + off); if (spin > 0) x.fillText(`DRAFT ${counter - 1}`, 0, 2 + off - 80)
  x.restore()
  x.restore()
  x.restore()
}
function draftCard(x, t, cx, cy, text, k, chosen, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(1.25 * k, 1.25 * k)
  R(x, '#8c86a8', -3, -150, 6, 50)
  box(x, -130, -100, 260, 150, chosen ? '#c9f2d4' : BONE, { b: 6 })
  x.font = `700 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  text.split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, -25 + (i - (a.length - 1) / 2) * 34))
  x.restore()
}

const EP = makeNormal({
  id: 'kine04', D, ending: 'loop', hero: 'libra',
  hook: { text: 'Draft eleven of a | *two-word* text.', out: T.h0Out, accentColor: LIB },
  rec: REC,
  catch: { at: T.rec + 0.12, x: 560, y: 1290, r: 190, out: [T.rec + 1.0, T.rec + 1.15], label: null, arrow: null },
  fx: [[hook.loadingBar, hook.loadingBarCues, LOAD]],
  heads: [{ text: 'hey :)  hey!  *heyy?*', at: T.h1, out: T.h1Out, size: 100, accent: LIB, late: 1, lateAt: T.drafts[2] }],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: 'you rehearse because you *care* how you land.' },
    { t: T.l2, text: 'pick the one that sounds like *you.* send it.' },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Send the one that | sounds like *you.*', at: T.last, lateAt: T.last + 0.5, accent: GOLD, size: 92 },
  punches: [T.h1, ...T.drafts.slice(1), T.meter + 1.75, T.send],
  scene(x, t, S) {
    if (t < T.meter) {
      room(x, { y: FLOOR, wall: '#1c1640', floor: '#2a2050' })
      // Libra mid-gasp behind the huge phone
      const gasp = t < 0.6
      shadow(x, 300, FLOOR, 300)
      S.hero(x, t, { x: 280, y: 1130, s: 340, mood: gasp ? 'wide' : t > LOAD.at + 1.9 ? 'wide' : 'squint', look: [1, 0.2], squash: gasp ? -0.08 : 0, hops: [0.0, ...T.drafts, LOAD.at + 1.9] })
      const draft = t < T.drafts[0] ? 'hey :)' : t < T.drafts[1] ? 'hey :)' : t < T.drafts[2] ? 'hey!' : 'heyy?'
      const counter = t < T.drafts[0] ? 11 : t < T.drafts[1] ? 12 : t < T.drafts[2] ? 13 : 14
      const spin = [T.drafts[0], T.drafts[1], T.drafts[2]].map(d => (t > d && t < d + 0.25) ? d + 0.25 - t : 0).reduce((a, b) => a + b, 0)
      bigPhone(x, t, 680, 980, 1.12, draft, counter, spin)
      // Pisces reading along over the top of the phone
      const pk = pop01(t, T.pisIn, 0.35, 2.2) * outK(t, [T.meter - 0.2, T.meter])
      S.pis(x, t, { x: 930, y: 720, s: 160, pop: pk, tears: 3, mood: 'sparkle', look: [-1, 0.6], say: [T.pisIn + 0.4, T.load + 0.2, 'the smiley one!!'], sayDx: -60, saySize: 28 })
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'sparkle' : 'wide', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      room(x, { y: FLOOR, wall: '#1c1640', floor: '#2a2050' })
      // the line with three draft cards
      R(x, INK, 30, 528, 1020, 8); R(x, '#cfc8e8', 30, 530, 1020, 4)
      const ck = i => pop01(t, T.mOut[0] + 0.3 + i * 0.15, 0.3, 2.4)
      const chosen = t > T.pick
      const fly = ease.inCubic(prog(t, T.send, T.send + 0.35))
      draftCard(x, t, 190, 720, 'hey :)', ck(0) * (chosen ? 0.85 : 1), false, -0.06 + 0.03 * Math.sin(t * 2))
      draftCard(x, t + 0, 540 + fly * 600, 740 - fly * 400, 'hey! saw a dog | in a tiny hat. | thought of you.', ck(1) * (chosen ? 1.15 : 1), chosen, 0.04 * Math.sin(t * 2 + 1) + fly)
      draftCard(x, t, 890, 720, 'heyy?', ck(2) * (chosen ? 0.85 : 1), false, 0.06 + 0.03 * Math.sin(t * 2 + 2))
      if (chosen && t < T.send) sparkles(x, t, 540, 700, T.pick, 10, 160, 1, [MINT, GOLD, BONE])
      if (t > T.send - 0.2 && t < T.send + 0.6) label(x, 'SEND', 540, 920, { size: 48, col: MINT, font: INTER, weight: 800, alpha: pop01(t, T.send - 0.2, 0.2, 2.6) * outK(t, [T.send + 0.4, T.send + 0.6]) })
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      shadow(x, 540, FLOOR, 300 * k)
      S.hero(x, t, { x: 540, y: 1150, s: 330, pop: k, mood: t > T.reply ? 'sparkle' : t > T.pick ? 'happy' : 'neutral', look: t < T.l2 ? [0, -1] : [0, -1], hops: [T.mOut[0] + 0.2, T.pick, T.send, T.reply] })
      bubble(x, t, 760, 960, T.reply, D, 'haha I love this', { size: 30, col: '#c9ecfb', tail: -0.4 })
      if (t > T.reply) hearts(x, t, T.reply, 540, 960, { n: 5 })
      S.pis(x, t, { x: 180, y: 1300, s: 170, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.reply ? 3 : 2, mood: t > T.reply ? 'happy' : 'sparkle', look: [1, -0.4], tissues: 'right', hops: [T.reply + 0.1, T.last + 0.5] })
      S.stars(x, t, { x: 900, y: 1290, s: 150, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.reply ? 'happy' : 'neutral', look: [-1, -0.3] })
    }
  },
  cues: [
    ...Array.from({ length: 4 }, (_, i) => ['tick', r3(0.02 + i * 0.05), 0.03]),
    ...T.drafts.flatMap((d, i) => [['tick', r3(d), 0.05], ...Array.from({ length: 4 }, (_, j) => ['tick', r3(d + 0.04 + j * 0.05), 0.025]), ['pop', r3(d + 0.25), [1174.66, 1318.51, 1567.98][i], 0.04, 0.2]]),
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['pluck', T.pisIn + 0.45, 1174.66, 0.03, 0.4, 0.4],
    ...[0, 1, 2].map(i => ['pop', r3(T.mOut[0] + 0.3 + i * 0.15), 880 + i * 110, 0.035, -0.3 + i * 0.3]),
    ['pop', T.pick, 1318.51, 0.045, 0], ['glitter', T.pick, T.pick + 0.3],
    ['whoosh', T.send, 0.35, 0.05], ['pop', T.send + 0.3, 1760, 0.03, 0.5],
    ['pop', T.reply, 1174.66, 0.045, 0.3], ['pop', T.reply + 0.08, 1567.98, 0.035, 0.3], ['pluck', T.reply + 0.2, 1318.51, 0.03, 0.5, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, LAV, MONO, drawBits, glowAt, clamp, lerp]
