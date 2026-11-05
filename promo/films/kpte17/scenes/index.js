// kpte17: THE 10-SECOND PEP TALK, Ep 17 "The full pep talk: your crush said no" (long, batch m14, pop · A).
// Format kit: ../../kpte01/pepkit-long.js. Rows: promo/films/month2/m14.md.
//   0.0–3.2   frame 0: ♐ Sagittarius mid-sprint in through the door with snacks flying, Leo face-down on the couch ·
//             "Leo got a no. | *Watch* this." · whip at 0.42 · chip "the last line, | *though*".
//   1 THE NO      the text drops (notification), the flop, snacks first.
//   2 THE REPLAY  ◀◀ REPLAY #14 on the TV, Sag hits ❚❚ PAUSE: "you're grading a no."
//   3 THE TRUTH   "a no to dating isn't a no to *you.*"
//   4 THE PROOF   gold stars for real Leo moments; ACHIEVEMENT: self-esteem restored.
//   5 THE LAST LINE  "One no. | *Infinite* you."  Loop back to frame 0.
import { makeLong } from '../../kpte01/pepkit-long.js'
import { room, couch, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, drawPixelStar } from '../../kpte01/pepkit.js'

const lounge = (x, t) => { room(x, t, { wall: '#2b2150', wall2: '#261c4a', floor: '#36294a', win: { x: 760, y: 500, w: 220, h: 260 }, floorY: 1330 }); couch(x, 640, 1260, 620, '#a8466a') }
function chips(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -40, -55, 80, 110, '#ffd36b', { b: 5 }); R(x, RED, -40, -20, 80, 30); x.restore() }
function hook(x, t, S) {
  lounge(x, t)
  // the door, flung open
  box(x, 60, 560, 200, 770, '#1a1438', { b: 7 }); x.save(); x.translate(260, 560); x.scale(-0.35, 1); box(x, 0, 0, 200, 770, '#7a5a3a', { b: 7 }); x.restore()
  S.L(x, t, { x: 700, y: 1150, s: 240, mood: 'sleepy', look: [0, 1], squash: 0.35, zzz: false })
  for (let i = 0; i < 5; i++) chips(x, 420 + i * 110 + 20 * Math.sin(t * 3 + i), 640 - i * 30 + 40 * Math.sin(t * 2 + i), t * 3 + i)
}
function tv(x, t, S, text, col) { box(x, 700, 470, 300, 210, '#14102a', { b: 8 }); x.font = "700 30px 'Space Mono', monospace"; x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 850, 575); R(x, INK, 840, 690, 20, 40) }
const EP = makeLong({
  id: 'kpte17', sign: 'leo', coach: 'sagittarius', end: 'loop', brk: 'whip',
  hookLine: 'Leo got a no. | *Watch* this.', promise: 'the last line, | *though*',
  hook,
  chapters: [
    { title: 'THE NO', len: 15, set: lounge, mood: 'sleepy', slump: 0.3, cmood: 'wide',
      fx: [['notification', { at: 0.4, out: [2.3, 2.6], title: 'texts', body: 'Crush: sorry, I don’t feel *the same*', glyph: '♒', color: '#7fd0f0' }]],
      props: (x, t, S) => { for (let i = 0; i < 3; i++) chips(x, 380 + i * 90, 1250, -0.2 + i * 0.2) },
      lines: [[2.7, 'L', 'I asked. they said *no.*'], [6.2, 'C', 'okay. snacks first. *talk second.*'], [9.8, 'L', 'I’m never leaving this *couch.*'], [12.8, 'P', 'I brought *more* tissues.']] },
    { title: 'THE REPLAY', len: 15, set: lounge, mood: 'wide', cmood: 'neutral',
      props: (x, t, S) => { const paused = S.u > 7.6; tv(x, t, S, paused ? '❚❚ PAUSED' : `◀◀ REPLAY #${Math.min(14, 3 + Math.floor(S.u * 1.6))}`, paused ? GOLD : '#ff8fa0') },
      lines: [[0.6, 'L', 'was it the joke? the *outfit?*'], [4.2, 'L', 'I replayed it *fourteen* times.'], [7.8, 'C', '*pause.* you’re grading a no.'], [11.4, 'C', 'a no isn’t a *review* of you.']],
      cues: [['tick', 7.6, 0.08], ['pluck', 7.65, 196, 0.04, 0.2, 0]] },
    { title: 'THE TRUTH', len: 15, set: lounge, mood: 'neutral', cmood: 'sparkle',
      props: (x, t, S) => { if (S.u > 1.2) note(x, 560, 640, 'no to dating | ≠ no to YOU', { w: 420, h: 150, col: MINT, size: 40, k: pop01(t, S.t0 + 1.2, 0.3, 2.4), rot: -0.04 }) },
      lines: [[0.6, 'C', 'a no to dating isn’t a no to *you.*'], [4.4, 'C', 'they just know what *they* want.'], [8.0, 'L', '…that’s kind of *fair*, actually.'], [11.4, 'C', 'and you deserve someone who’s a *yes.*']] },
    { title: 'THE PROOF', len: 16, set: lounge, mood: 'happy', cmood: 'happy', ptears: 3, pmood: 'sparkle',
      props: (x, t, S) => {
        ;[['remembers every birthday', 4.4], ['hypes friends the loudest', 8.0], ['makes strangers laugh', 10.2]].forEach(([s, a], i) => {
          const k = pop01(t, S.t0 + a, 0.3, 2.4)
          if (k > 0.01) { note(x, 580, 520 + i * 100, s, { w: 470, h: 74, col: '#fff2c4', size: 30, k, rot: [-0.02, 0.02, -0.01][i] }); drawPixelStar(x, 320, 520 + i * 100, 44 * k, 2, GOLD) }
        })
      },
      fx: [['achievement', { at: 13.4, out: [15.5, 15.85], text: 'self-esteem *restored*', y: 1250 }]],
      lines: [[0.6, 'C', 'now. the *proof.*'], [4.2, 'C', 'you remember *every* birthday.'], [7.8, 'C', 'you hype your friends the *loudest.*'], [11.2, 'L', '…okay. I *am* pretty great.']] },
  ],
  last: 'One no. | *Infinite* you.', lastLate: 2,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [BONE, PEP, prog, ease, lerp, outK, label]
