// kxffe02 · Friends First: Extended, ep 2 · 'Sorry, No "But"' (60 s vertical, star_advice post, funk · A)
// No end card, no card transition. Hard cut on the punchline. The look lives in ../../kxase01/xkit.js.
//   0.00   frame 0: ♌ Leo mid-scream, lunging after a sent message flying out of its phone; a caught circle: SENT.
//          Slam title "Sent. In the group chat. | *Oops.*"  0.8 record scratch "that was *supposed* | to be funny."
//   2.2    promise "wait for *Cancer's* reply"
//   3.0    1 · THE SITUATION  the group chat: everyone laughs except ♋ Cancer: "haha… ok". Cancer goes quiet.
//  12.5    2 · THE URGE  draft "relax, it was a joke" — struck. THE STARS: "a joke that hurts still *hurts.*"
//  22.5    3 · THE CHECK-IN  Leo calls Cancer one-on-one. "hey. got a minute?" "…sure."
//  31.5    4 · THE HARD PART  "I hurt you. *no excuses.* I'm sorry." Cancer: "thank you for not making it *weird.*"
//  47.5    5 · AFTER  Leo says it in the group chat too; hearts fill the chat. Pisces sobs.
//  58.2    last line 'An apology | with *no* "but."'
import {
  makeX, say, stars, star, box, R, label, hearts, sparkles, phoneSmall, bigPhone, bubble,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR, TAGCOL,
} from '../../kxase01/xkit.js'

const LEO = 'leo', CAN = 'cancer'
const LC = '#ffc38a', CANC = signStar(CAN)
const TEASE = 'lol cancer’s “quick story” lasted an HOUR'
const m = (at, sign, text) => ({ at, from: 'them', name: sign.toUpperCase(), nameCol: TAGCOL[sign], text })

const F = makeX({
  id: 'kxffe02', series: 'friends', dur: 60, ending: 'cut',
  hook: { text: 'Sent. In the group chat. | *Oops.*', out: 2.9, top: 200, size: 104, color: LC },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'wait for *Cancer’s* reply', top: 1300 },
  chapters: [{ at: 3.0, title: 'the situation' }, { at: 12.5, title: 'the urge' }, { at: 22.5, title: 'the check-in' }, { at: 31.5, title: 'the hard part' }, { at: 47.5, title: 'after' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'caught', at: -1, x: 575, y: 660, r: 290, ry: 120, label: 'SENT', arrow: 'bl', rec: true, out: [2.7, 2.9] },
    { k: 'scratch', at: 0.8, len: 1.3, caption: 'that was *supposed* | to be funny.', top: 1480 },
    { k: 'shake', at: 15.4, len: 0.3, amp: 14 },
    { k: 'call', at: 22.8, out: [25.3, 25.45], name: 'Cancer', sub: 'calling…', glyph: CANC.glyph, color: CANC.color, answerAt: 24.8 },
    { k: 'shake', at: 52.6, len: 0.3, amp: 10 },
  ],
  lines: [
    say(6.4, LEO, 'everyone laughed. except *cancer.*'),
    say(9.4, LEO, "and now cancer's gone *quiet.*"),
    stars(16.8, 'a joke that hurts still *hurts.*'),
    stars(19.4, 'skip the defence. go *one-on-one.*'),
    say(26.0, LEO, 'hey. got a minute?'),
    say(28.6, CAN, '…sure.'),
    say(32.0, LEO, 'I hurt you. *no excuses.*'),
    say(35.0, LEO, "I'm sorry. it wasn't fair to you."),
    say(38.6, CAN, 'thank you for not making it *weird.*'),
    say(42.0, LEO, 'can I say it in the chat *too?*'),
    say(44.7, CAN, "…yeah. I'd *like* that."),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 22.4 }, { from: 4, to: 6, close: 31.3 }, { from: 6, to: 11, close: 47.3 }],
  last: { at: 58.2, text: 'An apology | with *no* “but.”', top: 300, color: LC },
  shots: [
    // A · the lunge (0–3)
    { at: 0, set: 'room', setOpts: { couchX: 540 }, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) {
        x.save(); x.translate(420, 980); x.rotate(0.3)
        star(x, t, LEO, { x: 0, y: 0, s: 290, mood: 'wide', look: [1, -1], squash: -0.06 })
        x.restore()
        phoneSmall(x, t, 560, 1020, { rot: 0.5, s: 1.0, buzz: 1 })
        // the sent message flying away
        const p = prog(t, -1.0, 3.0)
        x.save(); x.translate(lerp(560, 620, p), lerp(640, 580, p)); x.rotate(-0.08 + 0.1 * p)
        R(x, INK, -230, -70, 460, 140); R(x, '#ffb37a', -224, -64, 448, 128)
        x.font = `800 32px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('lol cancer’s “quick story”', 0, -20); x.fillText('lasted an HOUR', 0, 24)
        x.restore()
        for (let i = 0; i < 4; i++) R(x, BONE, 300 - i * 30, 880 + i * 36, 120, 6)
      },
      pis: { x: 940, y: 1250, s: 120, tears: 1, mood: 'wide', look: [-1, -1] } },
    // B · the situation + the urge (3–16.5)
    { at: 3.0, set: 'room', setOpts: { couchX: 540 }, cam: [1.14, 540, 900], push: 0.05,
      draw(x, t, S) { star(x, t, LEO, { x: 260, y: 1050, s: 250, mood: t < 6.2 ? 'happy' : t < 15.3 ? 'neutral' : 'wide', look: [1, -1], hops: S.hopsFor(LEO) }) },
      pis: t => ({ x: 940, y: 1250, s: 120, tears: t < 9.4 ? 1 : 2, mood: 'sparkle', look: [-1, -1] }) },
    // C · THE STARS (16.5–22.5)
    { at: 16.5, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1000, s: 380, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, LEO, { x: 190, y: 1210, s: 150, mood: 'neutral', look: [1, -1] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // D · the call (25.4–47.5): the split
    { at: 25.4, set: 'split', cam: [1.16, 540, 880], push: 0.04,
      draw(x, t, S) {
        label(x, 'LEO', 270, 380, { size: 26, col: LC }); label(x, 'CANCER', 810, 380, { size: 26, col: TAGCOL[CAN] })
        star(x, t, LEO, { x: 270, y: 1030, s: 230, mood: t < 31.8 ? 'neutral' : t < 38.4 ? 'sparkle' : 'happy', look: [1, 0], hops: S.hopsFor(LEO) })
        phoneSmall(x, t, 380, 980, { rot: -0.3, s: 0.7 })
        star(x, t, CAN, { x: 810, y: 1030, s: 230, mood: t < 32 ? 'neutral' : t < 38.4 ? 'sparkle' : 'happy', look: [-1, 0], hops: S.hopsFor(CAN) })
        phoneSmall(x, t, 700, 980, { rot: 0.3, s: 0.7 })
        if (t > 38.6) hearts(x, t, 38.8, 540, 820, { n: 5, cell: 5, spread: 300 })
      },
      pis: t => ({ x: 680, y: 1240, s: 90, tears: t < 35 ? 2 : 3, mood: 'sparkle', look: [-1, -1], tissue: false }) },
    // E · after (47.5–60): the group chat
    { at: 47.5, set: 'room', setOpts: { couchX: 540 }, cam: [1.14, 540, 900], push: 0.04,
      draw(x, t) {
        star(x, t, LEO, { x: 260, y: 1050, s: 250, mood: t < 50 ? 'neutral' : 'happy', look: [1, -1], hops: t > 50 ? [50.2, 51.4, 52.6, 53.8] : null })
        if (t > 52.6) hearts(x, t, 52.6, 260, 880, { n: 6, cell: 6 })
      },
      pis: t => ({ x: 940, y: 1250, s: 140, tears: 3, mood: 'happy', look: [-1, -1], hops: [53.0, 53.6, 54.2, 54.8] }) },
  ],
  overlay(x, t) {
    if (t >= 3.6 && t < 16.4) {
      const k = pop01(t, 3.6, 0.35, 2) * outK(t, [16.0, 16.4])
      const d = prog(t, 12.9, 14.6)
      bigPhone(x, t, { cx: 650, cy: 720, w: 500, h: 640, title: 'the group ✦', pop: k, accent: '#ffb37a',
        draft: t > 12.8 ? { text: 'relax, it was a joke', chars: d * 20, strike: t > 15.3 } : null,
        msgs: [{ at: -9, from: 'me', text: TEASE }, m(4.2, 'gemini', 'LMAO'), m(4.9, 'taurus', 'haha'), m(5.8, 'cancer', 'haha… ok')] })
    }
    if (t >= 48.0 && t < 59.9) {
      const k = pop01(t, 48.0, 0.35, 2)
      bigPhone(x, t, { cx: 650, cy: 720, w: 500, h: 640, title: 'the group ✦', pop: k, accent: '#ffb37a',
        msgs: [{ at: 48.6, from: 'me', text: 'I was out of line earlier. sorry, cancer.' }, m(50.0, 'gemini', 'respect'), m(51.0, 'taurus', '♥︎♥︎♥︎'),
          m(52.6, 'cancer', 'all good. love you guys'), m(54.0, 'pisces', 'I’M CRYING')] })
    }
  },
  cues: [
    ['whoosh', 0.0, 0.6, 0.05], ['pop', 0.1, 220, 0.05, 0],
    ['pop', 4.2, 1174.66, 0.03, 0.3], ['pop', 4.9, 1318.51, 0.03, 0.3], ['pop', 5.8, 659.25, 0.035, 0.3],
    ['tick', 13.0, 0.02], ['tick', 13.4, 0.02], ['tick', 13.8, 0.02], ['tick', 14.2, 0.02], ['whoosh', 15.3, 0.25, 0.04], ['pop', 15.35, 220, 0.05, 0],
    ['pop', 48.6, 1318.51, 0.035, 0], ['pop', 50.0, 987.77, 0.03, 0.3], ['pop', 51.0, 1174.66, 0.03, 0.3], ['pop', 52.6, 1318.51, 0.04, 0.3], ['pop', 54.0, 1567.98, 0.035, 0.3],
    ['glitter', 52.6, 53.3], ['pluck', 54.2, 659.25, 0.035, 0.5, 0.3], ['pluck', 54.4, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
