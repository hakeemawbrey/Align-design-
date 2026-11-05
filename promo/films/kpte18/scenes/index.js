// kpte18: THE 10-SECOND PEP TALK, Ep 18 "The full pep talk: home alone for the holidays" (long, batch m14, dreamy · Eb).
// Format kit: ../../kpte01/pepkit-long.js. Rows: promo/films/month2/m14.md.
//   0.0–3.2   frame 0: ♋ Cancer mid-tumble in through Aquarius's window with a scarf and a soup pot, snow flying; Aquarius
//             alone on the floor with cereal · "Alone on the 24th? | *Not tonight.*" · shake at 0.42 · chip "wait for |
//             *the last line*".
//   1 THE QUIET   an empty flat; every feed is couples (♥ cozy night in · ♥ our first holiday · ♥ matching sweaters).
//   2 THE CALL    full-screen incoming call from Cancer, answered; "you said 'fine' three times."
//   3 THE TRUTH   "lonely isn't a flaw. it's a *signal.*"
//   4 THE TABLE   friends, mismatched chairs, a place card with Aquarius's name; Pisces cries at the soup.
//   5 THE LAST LINE  "Lonely means *reach out*, | not shut in."  Hard cut.
import { makeLong } from '../../kpte01/pepkit-long.js'
import { room, note, label, table, mug, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK } from '../../kpte01/pepkit.js'

function snowAt(x, t, X, Y, w, h, n = 24) { x.fillStyle = 'rgba(239,236,250,0.85)'; for (let i = 0; i < n; i++) { const r = ((i * 9301) % 997) / 997, q = ((i * 4973) % 991) / 991; x.fillRect(X + ((q * w + Math.sin(t + i) * 12) % w + w) % w, Y + ((r * h + t * 60 * (0.6 + q)) % h), 6, 6) } }
const flat = (x, t) => { room(x, t, { wall: '#1f2148', wall2: '#1b1c42', floor: '#2a2a46', win: { x: 620, y: 480, w: 320, h: 320 }, floorY: 1330 }); snowAt(x, t, 620, 480, 320, 320) }
function tinyTree(x, cx, by) { x.fillStyle = INK; x.beginPath(); x.moveTo(cx, by - 170); x.lineTo(cx + 70, by); x.lineTo(cx - 70, by); x.fill(); x.fillStyle = '#2f8a5e'; x.beginPath(); x.moveTo(cx, by - 160); x.lineTo(cx + 60, by - 6); x.lineTo(cx - 60, by - 6); x.fill(); R(x, GOLD, cx - 8, by - 182, 16, 16) }
function hook(x, t, S) {
  flat(x, t)
  tinyTree(x, 900, 1330)
  S.L(x, t, { x: 700, y: 1170, s: 200, mood: 'wide', look: [0, -1], blink: false })
  box(x, 600, 1250, 70, 50, BONE, { b: 5 })
  snowAt(x, t, 500, 400, 580, 600, 40)
  // the soup pot + scarf flying in through the window
  x.save(); x.translate(700, 620); x.rotate(0.3 * Math.sin(t * 4)); box(x, -60, -40, 120, 80, '#c94a3a', { b: 6 }); R(x, INK, -76, -34, 16, 14); R(x, INK, 60, -34, 16, 14); x.restore()
  x.save(); x.translate(840, 700); x.rotate(t * 2); for (let i = 0; i < 8; i++) R(x, i % 2 ? RED : BONE, -80 + i * 20, -10, 20, 20); x.restore()
}
const table4 = (x, t) => { flat(x, t); table(x, 540, 1130, 760, '#7a5232'); for (const [cx, c] of [[200, '#c94a3a'], [420, '#3fb08a'], [660, '#5fa8ff'], [880, GOLD]]) { box(x, cx - 50, 1000, 100, 110, c, { b: 6 }) } }
const EP = makeLong({
  id: 'kpte18', sign: 'aquarius', coach: 'cancer', end: 'cut', brk: 'shake',
  hookLine: 'Alone on the 24th? | *Not tonight.*', promise: 'wait for | *the last line*',
  hook,
  chapters: [
    { title: 'THE QUIET', len: 15, set: flat, pos: { C: null, P: null, L: { x: 300, y: 1150, s: 240 } }, mood: 'neutral', slump: 0.1,
      props: (x, t, S) => { tinyTree(x, 900, 1330); ;['♥ cozy night in', '♥ our first holiday', '♥ matching sweaters'].forEach((s, i) => note(x, 640 + (i % 2) * 60, 900 + i * 95, s, { w: 380, h: 76, col: '#ffd0e4', size: 30, rot: [0.03, -0.02, 0.02][i], k: pop01(t, S.t0 + 1.5 + i * 2.2, 0.3, 2.4) })) },
      lines: [[0.6, 'L', 'it’s fine. I *like* quiet.'], [4.2, 'L', 'everyone’s busy. it’s *fine.*'], [7.8, 'L', '…it’s a little *too* quiet.'], [11.4, 'L', 'maybe I’ll just *sleep* till January.']] },
    { title: 'THE CALL', len: 15, set: flat, mood: 'wide', cmood: 'sparkle',
      fx: [['incomingCall', { at: 0.3, out: [3.3, 3.5], name: 'Cancer', sub: 'incoming call…', glyph: '♋', color: '#3f7cf0', answerAt: 2.6 }]],
      lines: [[4.0, 'C', 'you’re coming over. *no arguing.*'], [7.6, 'L', 'I’m fine! really! *totally fine.*'], [11.2, 'C', 'you said ‘fine’ *three times.*']] },
    { title: 'THE TRUTH', len: 15, set: flat, mood: 'neutral', cmood: 'sparkle',
      props: (x, t, S) => { if (S.u > 1.2) note(x, 560, 650, 'LONELY = | a signal, not a flaw', { w: 470, h: 150, col: '#cfe6ff', size: 36, k: pop01(t, S.t0 + 1.2, 0.3, 2.4) }) },
      lines: [[0.6, 'C', 'lonely isn’t a flaw. it’s a *signal.*'], [4.4, 'C', 'it means: reach for your *people.*'], [8.0, 'L', 'what if I’m a *burden?*'], [11.4, 'C', 'you’re a *guest.* there’s soup.']] },
    { title: 'THE TABLE', len: 16, set: table4, pos: { L: { x: 420, y: 900, s: 190 }, C: { x: 200, y: 900, s: 190 }, P: { x: 880, y: 900, s: 180 } }, mood: 'happy', cmood: 'happy', ptears: 3, pmood: 'sparkle',
      props: (x, t, S) => {
        S.star(x, t, 'gemini', { x: 660, y: 900, s: 180, mood: 'happy', seed: 31, hops: [S.t0 + 4.3, S.t0 + 8.1] })
        mug(x, t, 300, 1120, { s: 0.9, col: '#c94a3a' }); mug(x, t, 760, 1120, { s: 0.9, col: '#c94a3a' })
        note(x, 420, 1170, 'AQUARIUS', { w: 200, h: 50, col: BONE, size: 26, k: pop01(t, S.t0 + 1.0, 0.3, 2.4) })
      },
      lines: [[0.6, 'P', 'I made you a *place card!!*'], [4.2, 'L', 'you… saved me a *seat?*'], [7.8, 'C', 'we always do. you just had to *come.*'], [11.4, 'L', 'okay. pass the *soup.*']] },
  ],
  last: 'Lonely means *reach out*, | not shut in.', lastLate: 0,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [label, PEP, MINT, prog, ease, lerp, outK]
