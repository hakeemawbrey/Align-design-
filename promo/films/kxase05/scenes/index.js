// kxase05 · Ask the Stars: Extended, ep 5 · "The Night Before a First Date" (75 s vertical, star_advice post, synthwave · Bm)
// No end card, no card transition. Hard cut on the punchline. The look lives in ../../kxase01/xkit.js.
//   0.00   frame 0: 11:58 PM. ♒ Aquarius mid-scream into a pillow, an outfit avalanche mid-air, a sock flying.
//          Slam title "First date tomorrow. | *Full* panic."  0.8 record scratch "11:58 p.m. | *outfit* number nine."
//   2.2    promise "wait for the *awkward silence*"
//   3.0    1 · THE QUESTION  DM "First date *tomorrow.* | I'm already panicking."
//  12.5    2 · WHY IT HAPPENS  "simulating tomorrow…" → what-if bubbles → THE STARS: "nerves mean you *care.*"
//          "they're not a *forecast.*"  Chip ♒ FIXED AIR · RULED BY SATURN & URANUS.
//  25.0    3 · WHAT HELPS  outfit picked tonight · three curious questions on a talk card · a kind exit plan.
//  40.0    4 · THE STORY  SATURDAY · 7 PM, the café with ♌ Leo. 46.6 THE SILENCE (record scratch, tape stop).
//          Aquarius pulls the talk card: "what made you laugh this week?" Leo lights up.
//  55.0    5 · THE ANSWER  Leo: "honestly? I was *so* nervous today." "ME TOO. I tried on *nine* outfits."
//  69.0    the walk home, 11:58 PM again, calm.  73.5 last line "Bring *questions,* | not a script."
import {
  makeX, say, stars, star, box, R, label, hearts, sparkles, table, mug, heart, bubble, thought,
  signStar, INK, BONE, GOLD, PINK, RED, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxase01/xkit.js'

const AQU = 'aquarius', LEO = 'leo'
const QC = '#a8ecff'
const CLOTH = ['#e8344e', '#7c74f0', '#f2c75c', '#9fe6b0', '#ff8fb1', '#8fd8f6', '#ffb37a', '#c9a6ff', '#efe6d6']

// the outfit avalanche: shirts arcing up out of a wardrobe (t from −0.8)
function avalanche(x, t) {
  const tt = t + 0.8
  for (let i = 0; i < 9; i++) {
    const a = -2.6 + i * 0.26, v = 700 + (i * 53) % 260
    const px = 760 + Math.cos(a) * v * tt * 0.6, py = 1000 + Math.sin(a) * v * tt * 0.7 + 420 * tt * tt
    if (py > 1240) continue
    x.save(); x.translate(px, py); x.rotate(tt * (2 + i % 3) + i)
    R(x, INK, -48, -34, 96, 68); R(x, CLOTH[i], -42, -28, 84, 56); R(x, INK, -60, -34, 18, 30); R(x, INK, 42, -34, 18, 30); R(x, CLOTH[i], -56, -30, 12, 22); R(x, CLOTH[i], 44, -30, 12, 22)
    x.restore()
  }
  // the sock
  const sp = prog(t, -0.8, 2.6)
  x.save(); x.translate(lerp(700, 260, sp), 760 - 300 * Math.sin(Math.PI * sp)); x.rotate(sp * 8)
  R(x, INK, -16, -40, 32, 70); R(x, BONE, -11, -35, 22, 60); R(x, INK, -16, 22, 50, 22); R(x, RED, -11, 26, 40, 14)
  x.restore()
  // the wardrobe
  box(x, 820, 760, 220, 410, '#6a4a7a', { b: 7, hi: 'rgba(255,255,255,0.15)' }); R(x, INK, 926, 770, 8, 390)
}
// what-if bubbles around Aquarius (shot C)
const WHATIF = [['what if I trip on the door?', 300, 520, 13.4], ['what if I forget their name?', 760, 640, 14.0], ['what if there’s a silence?', 330, 760, 14.6]]
function hanger(x, t, cx, cy, col) {
  x.save(); x.translate(cx, cy + Math.sin(t * 2) * 6)
  R(x, INK, -4, -70, 8, 30); R(x, INK, -70, -44, 140, 8)
  R(x, INK, -56, -36, 112, 120); R(x, col, -50, -30, 100, 108); R(x, BONE, -16, -30, 32, 20)
  x.restore()
}

const F = makeX({
  id: 'kxase05', series: 'ask', dur: 75, ending: 'cut',
  hook: { text: 'First date tomorrow. | *Full* panic.', out: 2.9, top: 200, size: 106, color: QC },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'wait for the *awkward silence*', top: 1300 },
  chapters: [{ at: 3.0, title: 'the question' }, { at: 12.5, title: 'why it happens' }, { at: 25.0, title: 'what helps' }, { at: 40.0, title: 'the story' }, { at: 55.0, title: 'the answer' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'shake', at: 0.1, len: 0.5, amp: 18 },
    { k: 'scratch', at: 0.8, len: 1.3, caption: '11:58 p.m. | *outfit* number nine.', top: 1480 },
    { k: 'loading', at: 12.9, len: 2.6, label: 'simulating tomorrow…', stallAt: 99, error: 'Error: too many what-ifs', y: 700 },
    { k: 'scratch', at: 46.6, len: 1.5, caption: 'the *silence.*', sub: 'and there it is:', top: 1480 },
    { k: 'whip', at: 69.0, len: 0.45, from: 1.3 },
  ],
  dm: { at: 3.2, out: [12.2, 12.5], text: 'First date *tomorrow.* | I’m already panicking.', top: 300 },
  chip: { at: 21.9, out: [24.3, 24.6], text: '♒ FIXED AIR · RULED BY SATURN & URANUS', color: QC, top: 1290 },
  lines: [
    say(5.6, AQU, 'what if I say something *weird?*'),
    say(8.8, AQU, "what if there's a *silence?*"),
    stars(16.4, 'nerves mean you *care.*'),
    stars(19.6, "they're not a *forecast.*"),
    stars(25.6, 'pick the outfit *tonight.* then sleep.'),
    stars(29.4, "bring three questions you're *curious* about."),
    stars(33.6, 'and a kind exit plan, just in case.'),
    say(41.2, LEO, 'so… hi!'),
    say(43.4, AQU, 'hi! you look *great.*'),
    say(48.9, AQU, 'what made you *laugh* this week?'),
    say(51.6, LEO, 'okay, so my cat fell asleep in the *sink*—'),
    say(55.6, LEO, 'honestly? I was *so* nervous today.'),
    say(59.0, AQU, 'ME TOO. I tried on *nine* outfits.'),
    say(62.6, LEO, 'same time next week?'),
    say(65.4, AQU, 'yes. *no* panic.'),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 24.6 }, { from: 4, to: 7, close: 36.6 }, { from: 7, to: 9, close: 46.5 }, { from: 9, to: 11, close: 54.9 }, { from: 11, to: 15, close: 68.8 }],
  cards: [{ at: 36.7, out: [39.6, 39.9], text: 'what are you into *lately?* | best trip you’ve taken? | what made you *laugh* this week?', label: 'TALK CARD', top: 430, size: 50 }],
  last: { at: 73.5, text: 'Bring *questions,* | not a script.', top: 300, color: QC },
  shots: [
    // A · 11:58 PM, the scream (0–3)
    { at: 0, set: 'bedroom', dim: 0.65, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) {
        avalanche(x, t)
        x.save(); x.translate(330, 960); x.rotate(-0.2)
        star(x, t, AQU, { x: 0, y: 0, s: 280, mood: 'squint', look: [0, 1], squash: 0.1 + 0.04 * Math.sin(t * 30) })
        box(x, -40, 10, 190, 110, '#ffffff', { b: 6 })
        x.restore()
        label(x, 'AAAAAA', 320, 760, { size: 44, col: QC, rot: -0.15 })
        label(x, '11:58 PM', 860, 640, { size: 36, col: '#ff7a7a' })
      },
      pis: { x: 560, y: 1250, s: 120, tears: 1, mood: 'wide', look: [-1, -1] } },
    // B · the question
    { at: 3.0, set: 'sky', push: 0.04,
      draw(x, t, S) { star(x, t, AQU, { x: 520, y: 1040, s: 330, mood: t < 8.6 ? 'wide' : 'sparkle', look: [0, -1], hops: S.hopsFor(AQU) }) },
      pis: t => ({ x: 920, y: 1250, s: 140, tears: t < 8.8 ? 1 : 2, mood: 'sparkle', look: [-1, -0.6] }) },
    // C · why: the what-ifs, then THE STARS
    { at: 12.5, set: 'sky', push: 0.04,
      draw(x, t, S) {
        const calm = t > 16.2
        star(x, t, calm ? 'stars' : AQU, calm ? { x: 540, y: 1000, s: 380, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 } : { x: 540, y: 1060, s: 300, mood: 'wide', look: [0, -1], squash: 0.04 * Math.sin(t * 25) })
        if (calm) star(x, t, AQU, { x: 190, y: 1210, s: 150, mood: t > 19.6 ? 'happy' : 'neutral', look: [1, -1] })
        WHATIF.forEach(([s, bx, by, at]) => thought(x, t, bx, by + 140, at + 1.0, 16.2, s, { size: 36, maxW: 460, fromX: 540, fromY: 980 }))
        if (inR(t, 16.0, 16.6)) sparkles(x, t, 540, 800, 16.1, 14, 260, 2)
      },
      pis: t => ({ x: 900, y: 1230, s: 130, tears: t < 16.2 ? 2 : 1, mood: 'sparkle', look: [-1, -1] }) },
    // D · what helps (25–40)
    { at: 25.0, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1010, s: 340, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, AQU, { x: 180, y: 1210, s: 160, mood: 'happy', look: [1, -1], hops: [27.0, 31.0, 35.0] })
        if (t > 26.4) hanger(x, t, 200, 900 + 120 * (1 - pop01(t, 26.4, 0.4)), '#7c74f0')
        if (t > 33.8 && t < 36.6) { const k = pop01(t, 33.8, 0.3, 2.4) * outK(t, [36.3, 36.6]); x.save(); x.translate(860, 860); x.scale(k, k); box(x, -110, -50, 220, 100, '#2f7a5a', { b: 6 }); x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('EXIT → 9:30', 0, 2); x.restore() }
      },
      pis: { x: 900, y: 1230, s: 130, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // E · the date (40–55)
    { at: 40.0, set: 'cafe', cam: [1.1, 540, 920], push: 0.04,
      draw(x, t, S) {
        table(x, 540, 1060, 440); mug(x, t, 470, 1035, 0.7, '#7c74f0'); mug(x, t, 610, 1035, 0.7, '#ffb37a')
        const sil = inR(t, 46.0, 48.8)
        star(x, t, AQU, { x: 290, y: 980, s: 240, mood: sil ? 'wide' : t > 52 ? 'happy' : 'neutral', look: [1, 0], hops: S.hopsFor(AQU) })
        star(x, t, LEO, { x: 790, y: 980, s: 240, mood: sil ? 'neutral' : t > 51.8 ? 'happy' : 'happy', look: sil ? [0, -1] : [-1, 0], hops: S.hopsFor(LEO) })
        if (inR(t, 48.4, 50.0)) { const k = pop01(t, 48.4, 0.3, 2.4); x.save(); x.translate(380, 900 - 40 * k); x.rotate(-0.15); x.scale(k, k); box(x, -60, -80, 120, 160, BONE, { b: 6 }); R(x, PINK, -40, -60, 80, 8); R(x, PINK, -40, -40, 60, 8); R(x, PINK, -40, -20, 70, 8); x.restore() }
        if (t > 52.2) hearts(x, t, 52.2, 790, 840, { n: 4, cell: 6 })
        label(x, 'SATURDAY · 7 PM', 540, 1300, { size: 32, col: BONE, alpha: outK(t, [44.5, 45]) })
      },
      pis: t => ({ x: 940, y: 1250, s: 110, tears: inR(t, 46, 49) ? 2 : 1, mood: 'wide', look: [-1, -1] }) },
    // F · the answer (55–69)
    { at: 55.0, set: 'cafe', cam: [1.16, 540, 920], push: 0.05, noFlash: true,
      draw(x, t, S) {
        table(x, 540, 1060, 440); mug(x, t, 470, 1035, 0.7, '#7c74f0'); mug(x, t, 610, 1035, 0.7, '#ffb37a')
        star(x, t, AQU, { x: 290, y: 980, s: 240, mood: t < 58.8 ? 'wide' : 'heart', look: [1, 0], hops: S.hopsFor(AQU).concat([60.6, 61.0]) })
        star(x, t, LEO, { x: 790, y: 980, s: 240, mood: 'happy', look: [-1, 0], hops: S.hopsFor(LEO).concat([60.7, 61.1]) })
        if (t > 60.4) hearts(x, t, 60.4, 540, 840, { n: 7, cell: 6, spread: 300 })
      },
      pis: t => ({ x: 940, y: 1250, s: 120, tears: t < 60.4 ? 2 : 3, mood: 'happy', look: [-1, -1], hops: t > 60.4 ? [60.6, 61.2, 61.8] : null }) },
    // G · the walk home (69–75)
    { at: 69.0, set: 'street', cam: [1.1, 540, 900], push: 0.03, noFlash: true,
      draw(x, t) {
        const w = (t - 69) * 30
        x.save(); x.translate(380 + w, 1040); x.rotate(Math.sin((t - 69) * 3) * 0.25)
        star(x, t, AQU, { x: 0, y: 0, s: 230, mood: 'happy', look: [0, -1], hops: [69.6, 70.4, 71.2, 72.0, 72.8, 73.6, 74.4] })
        x.restore()
      },
      front(x) { label(x, '11:58 PM', 540, 1560, { size: 36, col: INK }) },
      pis: t => ({ x: 860, y: 1200, s: 120, tears: 2, mood: 'happy', look: [-1, -1], hops: [70.0, 71.0, 72.0, 73.0] }) },
  ],
  cues: [
    ['whoosh', 0.0, 0.6, 0.05], ['pop', 14.4, 880, 0.03, -0.3], ['pop', 15.0, 987.77, 0.03, 0.3], ['pop', 15.6, 1174.66, 0.03, -0.3], ['glitter', 16.1, 16.6],
    ['pop', 26.4, 1318.51, 0.03, -0.3], ['pop', 33.8, 1174.66, 0.03, 0.3], ['pop', 48.4, 1318.51, 0.04, 0],
    ['glitter', 60.4, 61.1], ['pluck', 60.6, 659.25, 0.035, 0.5, 0.3], ['pluck', 60.8, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
