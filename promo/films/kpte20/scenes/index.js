// kpte20: THE 10-SECOND PEP TALK, Ep 20 "The full pep talk: scared to try again" (long, batch m14, lofi · Db).
// Format kit: ../../kpte01/pepkit-long.js. Rows: promo/films/month2/m14.md. Pisces is the coach (and cries the whole way).
//   0.0–3.2   frame 0: ♓ Pisces mid-sob pressed to the lens, holding on, Scorpio behind with a coffee invite on the phone ·
//             "Scorpio. Look at me. | *Stay.*" · record scratch + freeze at 0.42 · chip "wait for | *the last line*".
//   1 THE INVITE      notification: "Libra: coffee this saturday? :)"; Scorpio's thumb freezes over NO.
//   2 THE ARMOUR      every old hurt stacks on Scorpio like armour (the ghost · the liar · the one who left).
//   3 THE TRUTH       "the new person isn't the *old one.*"
//   4 THE SMALL STEP  the armour comes off piece by piece; one coffee · one hour · you can leave; ACHIEVEMENT: brave.
//   5 THE LAST LINE   "This one gets a | *fresh* start."  Loop back to frame 0.
import { makeLong } from '../../kpte01/pepkit-long.js'
import { room, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, mug } from '../../kpte01/pepkit.js'

const den = (x, t) => room(x, t, { wall: '#2a1f46', wall2: '#251a40', floor: '#342644', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 })
function hook(x, t, S) {
  den(x, t)
  S.L(x, t, { x: 800, y: 900, s: 220, mood: 'wide', look: [0, 0], blink: false })
  x.save(); x.translate(930, 800); x.rotate(0.15); box(x, -45, -80, 90, 160, '#2a2148', { b: 6 }); R(x, '#ffd0e4', -34, -60, 68, 50); x.font = "800 16px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('coffee?', 0, -30); x.restore()
}
const ARM = [['the ghost', '#8f89b8'], ['the liar', '#a8463a'], ['the one who left', '#5a5470']]
function armour(x, t, S, on, off) {
  const LP = { x: 760, y: 1110 }
  ARM.forEach(([s, c], i) => {
    const k = on ? pop01(t, S.t0 + on[i], 0.3, 2.2) : 1
    const fall = off ? ease.inCubic(prog(t, S.t0 + off[i], S.t0 + off[i] + 0.6)) : 0
    if (k <= 0.01 || fall >= 1) return
    x.save(); x.translate(LP.x + fall * (i - 1) * 200, LP.y + 50 + i * 56 + fall * 500); x.rotate(fall * (i - 1) * 2); x.scale(k, k)
    box(x, -150, -26, 300, 52, c, { b: 6, hi: 'rgba(255,255,255,0.18)' })
    x.font = "800 26px Inter"; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2)
    x.restore()
  })
}
const EP = makeLong({
  id: 'kpte20', sign: 'scorpio', coach: 'pisces', end: 'loop', brk: 'scratch', scratchCap: 'Pisces. *already* crying.',
  hookLine: 'Scorpio. Look at me. | *Stay.*', promise: 'wait for | *the last line*', extra: 'libra',
  hook,
  chapters: [
    { title: 'THE INVITE', len: 16, set: den, mood: 'wide', cmood: 'sparkle',
      fx: [['notification', { at: 0.4, out: [2.6, 2.9], title: 'texts', body: 'Libra: coffee this saturday? *:)*', glyph: '♎', color: '#f0a3c8' }]],
      lines: [[2.6, 'L', 'someone *nice* asked me out.'], [6.2, 'C', 'THAT’S AMAZING. I’m *crying.*'], [9.8, 'L', 'I’m going to say *no.*'], [13.2, 'C', 'wait. *why?*']],
      cues: [['pluck', 10.0, 220, 0.03, 0.6, 0]] },
    { title: 'THE ARMOUR', len: 16, set: den, mood: 'neutral', cmood: 'wide', slump: 0.08,
      top: (x, t, S) => armour(x, t, S, [0.9, 4.5, 8.1], null),
      lines: [[0.6, 'L', 'last time I got *hurt.*'], [4.2, 'L', 'and the time before *that.*'], [7.8, 'L', 'so I wear *armour* now.'], [11.6, 'C', 'it’s heavy, though. *isn’t it?*']],
      cues: [['tom', 0.9, 100, { gain: 0.2, decay: 0.2 }], ['tom', 4.5, 95, { gain: 0.2, decay: 0.2 }], ['tom', 8.1, 90, { gain: 0.22, decay: 0.25 }]] },
    { title: 'THE TRUTH', len: 16, set: den, mood: 'neutral', cmood: 'sparkle',
      top: (x, t, S) => armour(x, t, S, null, null),
      props: (x, t, S) => { if (S.u > 1.0) note(x, 520, 600, 'new person | ≠ old hurt', { w: 380, h: 150, col: '#cfe6ff', size: 40, k: pop01(t, S.t0 + 1.0, 0.3, 2.4), rot: -0.04 }) },
      lines: [[0.6, 'C', 'the new person isn’t the *old one.*'], [4.2, 'C', 'they haven’t done *anything* yet.'], [7.8, 'L', 'but what if it *happens again?*'], [11.4, 'C', 'then you heal *again.* you know how.']] },
    { title: 'THE SMALL STEP', len: 16, set: den, mood: 'happy', cmood: 'happy',
      top: (x, t, S) => armour(x, t, S, null, [1.4, 5.0, 8.6]),
      props: (x, t, S) => { note(x, 520, 600, 'one coffee · one hour | you can leave anytime', { w: 520, h: 140, col: MINT, size: 32, k: pop01(t, S.t0 + 4.6, 0.3, 2.4) }); mug(x, t, 520, 760, { s: 1.1 * pop01(t, S.t0 + 8.2, 0.3, 2.4), col: '#c94a3a' }) },
      fx: [['achievement', { at: 13.4, out: [15.5, 15.85], text: 'brave: *said yes to coffee*', y: 1250 }]],
      lines: [[0.6, 'C', 'not forever. just *one coffee.*'], [4.2, 'C', 'one hour. you can *leave* anytime.'], [7.8, 'L', '…one coffee. *okay.*'], [11.2, 'C', 'I’m crying. *happy* crying.']],
      cues: [['whoosh', 1.4, 0.4, 0.03], ['whoosh', 5.0, 0.4, 0.03], ['whoosh', 8.6, 0.4, 0.03]] },
  ],
  last: 'This one gets a | *fresh* start.', lastLate: 2,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [label, RED, PEP, GOLD, lerp, outK]
