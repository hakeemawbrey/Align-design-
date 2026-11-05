// kxase08 · Ask the Stars: Extended, ep 8 · "Same Type, Same Ending" (75 s vertical, star_advice post, house · G)
// No end card, no card transition. LOOP ending: back on the treadmill, eased into the frame-0 composition.
// The look lives in ../../kxase01/xkit.js.
//   0.00   frame 0: ♎ Libra mid-wobble on a treadmill running BACKWARDS (◀◀ REWIND), the same bubble three times:
//          "it's not you, it's me." Slam title "Same type. Same ending. | *Again.*"  0.9 record scratch "rewind. *repeat.*"
//   2.2    promise "wait for the *new* ending"
//   3.0    1 · THE QUESTION  DM "I keep falling for people | who aren't *good* for me."
//  12.5    2 · WHY IT HAPPENS  three past dates as shadows (no signs): "let's see where it goes" · "replies… eventually" ·
//          "I don't do labels". THE STARS: "familiar can feel like *chemistry.*"  Chip ♎ CARDINAL AIR · RULED BY VENUS.
//  25.0    3 · THE STORY  ♒ Aquarius, the steady one Libra calls boring: on time, remembers the tea order.
//  40.0    4 · WHAT HELPS  "write down your *green flags.*" "date the list, not the rush." → the GREEN FLAGS card.
//  55.0    5 · THE ANSWER  the bench, a talk card: "what makes you feel *safe?*" "when someone does what they *said*."
//  69.0    the treadmill again, walking forward (▶ PLAY), side by side.  72.5 last line "New type. | *Better* ending."
//          → loops back into frame 0.
import {
  makeX, say, stars, star, box, R, label, hearts, sparkles, phoneSmall, table, mug, bubble,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxase01/xkit.js'

const LIB = 'libra', AQU = 'aquarius'
const LC = '#ffc8ec'

function treadmill(x, t, dir) {
  // belt + rails; dir −1 = rewinding
  const off = ((t * 220 * dir) % 80 + 80) % 80
  box(x, 210, 1110, 660, 50, '#3a3456', { b: 7 })
  x.save(); x.beginPath(); x.rect(214, 1114, 652, 42); x.clip()
  for (let i = -80; i < 760; i += 80) R(x, '#5a5478', 214 + i + off, 1118, 30, 34)
  x.restore()
  R(x, INK, 780, 780, 18, 340); R(x, INK, 760, 770, 120, 18); box(x, 800, 730, 120, 60, '#2a2148', { b: 6 })
  x.font = `700 22px ${MONO}`; x.fillStyle = dir < 0 ? '#ff7a7a' : MINT; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(dir < 0 ? '◀◀' : '▶', 860, 760)
}
// a "shadow" past date: a dark star with a tag
function shadow(x, t, cx, cy, s, tag, at) {
  const k = pop01(t, at, 0.35, 2)
  if (k <= 0.01) return
  star(x, t, 'stars', { x: cx, y: cy, s: s * k, color: '#3a3456', mood: 'neutral', look: [0, 0], glow: 0.2, tips: false })
  bubble(x, t, cx, cy - s * 0.75, at + 0.2, 25.0, tag, { size: 28, maxW: 300 })
}

const F = makeX({
  id: 'kxase08', series: 'ask', dur: 75, ending: 'loop', loopLen: 0.45,
  hook: { text: 'Same type. Same ending. | *Again.*', out: 2.9, top: 200, size: 104, color: LC },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'wait for the *new* ending', top: 1300 },
  chapters: [{ at: 3.0, title: 'the question' }, { at: 12.5, title: 'why it happens' }, { at: 25.0, title: 'the story' }, { at: 40.0, title: 'what helps' }, { at: 55.0, title: 'the answer' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'scratch', at: 0.9, len: 1.2, caption: 'rewind. *repeat.*', top: 1480 },
    { k: 'glitch', at: 2.5, len: 0.5, dialog: false, amp: 0.6 },
    { k: 'whip', at: 69.0, len: 0.45, from: 1.3 },
  ],
  dm: { at: 3.2, out: [12.2, 12.5], text: 'I keep falling for people | who aren’t *good* for me.', top: 300, size: 72 },
  chip: { at: 22.0, out: [24.3, 24.6], text: '♎ CARDINAL AIR · RULED BY VENUS', color: LC, top: 1290 },
  lines: [
    say(5.6, LIB, 'exciting at first. then they *vanish.*'),
    say(8.8, LIB, 'why do I *always* pick them?'),
    stars(16.2, 'familiar can feel like *chemistry.*'),
    stars(19.4, "the rush isn't always a *match.*"),
    say(26.0, LIB, "aquarius? they're… *steady.* boring, right?"),
    say(33.0, LIB, 'wait. they *remembered* my order?'),
    say(36.2, LIB, 'is this what *safe* feels like?'),
    stars(40.6, 'write down your *green flags.*'),
    stars(43.8, 'date the list, not the rush.'),
    say(58.4, LIB, 'when someone does what they *said.*'),
    say(61.6, AQU, "then see you *saturday.* seven sharp."),
    say(65.0, LIB, 'boring never felt *this* good.'),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 24.6 }, { from: 4, to: 7, close: 39.8 }, { from: 7, to: 9, close: 47.4 }, { from: 9, to: 12, close: 68.6 }],
  cards: [{ at: 47.6, out: [53.4, 53.75], text: 'replies kindly | makes plans *and keeps them* | asks how my day was', label: 'GREEN FLAGS', top: 430, size: 52, accent: '#2f7a5a' }],
  last: { at: 72.5, text: 'New type. | *Better* ending.', top: 300, color: LC },
  shots: [
    // A · the rewinding treadmill (0–3)
    { at: 0, set: 'room', setOpts: { couch: false }, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) {
        treadmill(x, t, -1)
        x.save(); x.translate(520, 990); x.rotate(Math.sin(t * 11) * 0.18)
        star(x, t, LIB, { x: 0, y: 0, s: 260, mood: 'wide', look: [-1, 0], squash: 0.05 * Math.sin(t * 22) })
        x.restore()
        ;[0, 1, 2].forEach(i => bubble(x, t, 400 + i * 40, 610 + i * 70, -1, 3.0, 'it’s not you, it’s me.', { size: 32, maxW: 460 }))
        label(x, '◀◀ REWIND', 540, 1240, { size: 40, col: '#ff7a7a' })
      },
      pis: { x: 940, y: 1250, s: 120, tears: 1, mood: 'wide', look: [-1, -1] } },
    // B · the question
    { at: 3.0, set: 'sky', push: 0.04,
      draw(x, t, S) { star(x, t, LIB, { x: 520, y: 1040, s: 330, mood: t < 8.6 ? 'neutral' : 'sparkle', look: [0, -1], hops: S.hopsFor(LIB) }) },
      pis: t => ({ x: 920, y: 1250, s: 140, tears: t < 8.8 ? 1 : 2, mood: 'sparkle', look: [-1, -0.6] }) },
    // C · why: the shadows of past dates, then THE STARS
    { at: 12.5, set: 'sky', setOpts: { dim: 0.6 }, push: 0.04,
      draw(x, t, S) {
        shadow(x, t, 220, 820, 170, 'let’s see where it goes', 12.8)
        shadow(x, t, 540, 700, 170, 'replies… eventually', 13.6)
        shadow(x, t, 860, 820, 170, 'I don’t do labels', 14.4)
        star(x, t, LIB, { x: 540, y: 1100, s: 240, mood: t > 19.4 ? 'sparkle' : 'neutral', look: [0, -1] })
        if (t > 15.9) star(x, t, 'stars', { x: 860, y: 1210, s: 180, mood: 'happy', look: [-1, -1], hops: S.hopsFor('stars'), pop: pop01(t, 15.9) })
      },
      pis: { x: 170, y: 1260, s: 120, tears: 2, mood: 'sparkle', look: [1, -1] } },
    // D · the steady one (25–40)
    { at: 25.0, set: 'cafe', cam: [1.1, 540, 920], push: 0.04,
      draw(x, t, S) {
        table(x, 540, 1060, 440)
        const arrive = ease.outBack(prog(t, 28.6, 29.4))
        star(x, t, LIB, { x: 290, y: 980, s: 240, mood: t < 32.8 ? 'neutral' : t < 36 ? 'wide' : 'heart', look: [1, 0], hops: S.hopsFor(LIB) })
        star(x, t, AQU, { x: lerp(1160, 790, arrive), y: 980, s: 240, mood: 'happy', look: [-1, 0], hops: [29.0, 30.6] })
        if (t > 29.4) label(x, '6:59 PM · ON TIME', 540, 1300, { size: 32, col: MINT, alpha: outK(t, [32.4, 32.8]) })
        if (t > 30.6) { mug(x, t, 470, 1035, 0.7, '#ff8fb1'); bubble(x, t, 760, 760, 30.6, 33.4, 'mint tea, extra honey?', { size: 32, maxW: 380 }) }
        if (t > 36.2) hearts(x, t, 36.2, 290, 840, { n: 4, cell: 6 })
      },
      pis: t => ({ x: 940, y: 1250, s: 110, tears: t < 33 ? 1 : 2, mood: 'sparkle', look: [-1, -1] }) },
    // E · what helps
    { at: 40.0, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1010, s: 370, mood: t > 47.6 ? 'heart' : 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, LIB, { x: 180, y: 1210, s: 160, mood: t > 50 ? 'happy' : 'neutral', look: [1, -1], hops: [50.2, 50.9] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 2, mood: 'sparkle', look: [-1, -1] } },
    // F · the answer (55–69)
    { at: 55.0, set: 'park', cam: [1.1, 540, 920], push: 0.04,
      draw(x, t, S) {
        star(x, t, LIB, { x: 400, y: 960, s: 230, mood: t < 58.2 ? 'neutral' : 'happy', look: [1, 0], hops: S.hopsFor(LIB).concat(t > 64.8 ? [66.6, 67.0] : []) })
        star(x, t, AQU, { x: 690, y: 960, s: 230, mood: 'happy', look: [-1, 0], hops: S.hopsFor(AQU) })
        if (inR(t, 55.4, 58.3)) {
          const k = pop01(t, 55.4, 0.35, 2.2) * outK(t, [58.0, 58.3])
          x.save(); x.translate(560, 720); x.rotate(0.06); x.scale(k, k)
          box(x, -200, -70, 400, 140, BONE, { b: 7 }); x.font = `italic 500 40px 'EB Garamond', Georgia, serif`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('what makes you feel safe?', 0, 4)
          R(x, PINK, -70, -96, 140, 30); x.font = `800 18px ${INTER}`; x.fillStyle = INK; x.fillText('TALK CARD', 0, -81)
          x.restore()
        }
        if (t > 65.0) hearts(x, t, 65.0, 540, 820, { n: 7, cell: 6, spread: 260 })
      },
      pis: t => ({ x: 180, y: 1200, s: 120, tears: t < 65 ? 2 : 3, mood: t < 65 ? 'sparkle' : 'happy', look: [1, -1], hops: t > 65 ? [65.2, 65.8, 66.4] : null }) },
    // G · the treadmill, forward (69–75), then the loop
    { at: 69.0, set: 'room', setOpts: { couch: false }, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) {
        treadmill(x, t, 1)
        star(x, t, LIB, { x: 420, y: 990, s: 240, mood: 'happy', look: [1, 0], hops: [69.3, 69.8, 70.3, 70.8, 71.3, 71.8, 72.3, 72.8, 73.3, 73.8] })
        star(x, t, AQU, { x: 640, y: 990, s: 240, mood: 'happy', look: [-1, 0], hops: [69.55, 70.05, 70.55, 71.05, 71.55, 72.05, 72.55, 73.05, 73.55] })
        label(x, '▶ PLAY', 540, 1240, { size: 40, col: MINT })
      },
      pis: t => ({ x: 940, y: 1250, s: 120, tears: 3, mood: 'happy', look: [-1, -1], hops: [69.5, 70.5, 71.5] }) },
  ],
  cues: [
    ['whoosh', 0.0, 0.5, 0.05], ['tapeStop', 0.0, 0.3],
    ['pop', 12.8, 392, 0.03, -0.3], ['pop', 13.6, 349.23, 0.03, 0], ['pop', 14.4, 329.63, 0.03, 0.3],
    ['whoosh', 28.6, 0.5, 0.03], ['pop', 30.6, 1174.66, 0.03, 0.3],
    ['pop', 55.4, 1318.51, 0.035, 0], ['glitter', 65.0, 65.6], ['pluck', 65.3, 659.25, 0.035, 0.5, 0.3], ['pluck', 65.5, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
