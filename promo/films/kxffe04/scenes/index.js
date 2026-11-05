// kxffe04 · Friends First: Extended, ep 4 · "Advice or Company?" (60 s vertical, star_advice post, cinematic · C)
// No end card, no card transition. Hard cut on the punchline. The look lives in ../../kxase01/xkit.js.
//   0.00   frame 0: ♓ Pisces mid-sprint through the snow, already crying, a blanket and two mugs mid-flight.
//          Slam title "Friend down. | *Pisces* incoming."  0.8 record scratch "already crying. | *obviously.*"
//   2.2    promise "wait for the *quiet* part"
//   3.0    1 · THE SITUATION  a notification: "Aries: we broke up." "on my way. *right now.*"
//  12.5    2 · THE URGE  Pisces' 10-step fix-it scroll unrolls — struck. THE STARS: "the urge to fix is *love.*"
//  25.5    3 · THE CHECK-IN  ♈ Aries in a blanket on the couch. The card "do you want *advice,* | or company?" "…company."
//  36.5    4 · THE HARD PART  the quiet: "staying quiet…" Pisces doesn't fill it. Aries finally talks.
//  49.0    5 · AFTER  morning: "Aries: thank you for just staying." "staying is my *new* plan."
//  58.2    last line "Sometimes *staying* | is the advice."
import {
  makeX, say, stars, star, box, R, label, hearts, sparkles, mug, blanket, couch, heart, phoneSmall,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR, TAGCOL,
} from '../../kxase01/xkit.js'

const PIS = 'pisces', ARI = 'aries'
const PCOL = '#c8d8ff', ARIC = signStar(ARI)
const PLAN = ['1. ice cream', '2. rant about them', '3. new haircut', '4. a playlist (sad)', '5. a playlist (angry)', '6. delete everything', '7. a 5 a.m. run', '8. move cities?', '9. tarot', '10. MORE ice cream']

function scroll(x, t, at, slashAt) {
  const u = ease.outCubic(prog(t, at, at + 2.6))
  const h = 80 + 760 * u
  box(x, 300, 380, 480, h, '#f5eedf', { b: 7 })
  box(x, 280, 360, 520, 30, '#c98a4a', { b: 6 })
  x.save(); x.beginPath(); x.rect(300, 400, 480, h - 20); x.clip()
  x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  PLAN.forEach((p, i) => x.fillText(p, 330, 430 + i * 74))
  x.restore()
  box(x, 280, 380 + h - 10, 520, 30, '#c98a4a', { b: 6 })
  const s = clamp(prog(t, slashAt, slashAt + 0.3))
  if (s > 0) { x.save(); x.translate(540, 760); x.rotate(-0.5); R(x, INK, -420, -18, 840 * s, 36); R(x, RED, -416, -12, 832 * s, 24); x.restore() }
}

const F = makeX({
  id: 'kxffe04', series: 'friends', dur: 60, ending: 'cut',
  hook: { text: 'Friend down. | *Pisces* incoming.', out: 2.9, top: 200, size: 112, color: PCOL },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'wait for the *quiet* part', top: 1300 },
  chapters: [{ at: 3.0, title: 'the situation' }, { at: 12.5, title: 'the urge' }, { at: 25.5, title: 'the check-in' }, { at: 36.5, title: 'the hard part' }, { at: 49.0, title: 'after' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'shake', at: 0.2, len: 0.4, amp: 22 },
    { k: 'scratch', at: 0.8, len: 1.3, caption: 'already crying. | *obviously.*', top: 1480 },
    { k: 'notif', at: 3.6, out: [8.6, 8.85], title: 'texts', body: 'Aries: we broke up.', glyph: ARIC.glyph, color: ARIC.color, y: 300 },
    { k: 'shake', at: 17.6, len: 0.35, amp: 16 },
    { k: 'loading', at: 37.2, len: 4.6, label: 'staying quiet…', stallAt: 99, error: null, y: 560 },
    { k: 'notif', at: 49.6, out: [56.6, 56.9], title: 'texts', body: 'Aries: thank you for just *staying.*', glyph: ARIC.glyph, color: ARIC.color, y: 300 },
  ],
  lines: [
    say(6.6, PIS, 'on my way. *right now.*'),
    say(9.4, PIS, 'I have a *plan.* a big one.'),
    stars(19.0, 'the urge to fix is *love.*'),
    stars(21.8, 'but ask what they need *first.*'),
    say(31.0, ARI, '…company.'),
    say(33.4, PIS, 'company. *got it.*'),
    say(42.4, ARI, "I thought we'd make it to *spring.*"),
    say(45.8, ARI, 'thanks for not *fixing* it.'),
    say(53.0, PIS, 'staying is my *new* plan.'),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 25.3 }, { from: 4, to: 6, close: 36.3 }, { from: 6, to: 8, close: 48.8 }, { from: 8, to: 9, close: 57.6 }],
  cards: [{ at: 26.0, out: [30.4, 30.75], text: 'do you want *advice,* | or company?', top: 430 }],
  last: { at: 58.2, text: 'Sometimes *staying* | is the advice.', top: 300, color: PCOL },
  shots: [
    // A · the sprint (0–3)
    { at: 0, set: 'street', cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) {
        const run = Math.sin(t * 16)
        x.save(); x.translate(380 + t * 30, 1000 + Math.abs(run) * -20); x.rotate(0.2)
        star(x, t, PIS, { x: 0, y: 0, s: 320, mood: 'sparkle', look: [1, 0], tears: 3, squash: -0.04 })
        x.restore()
        // the blanket and two mugs, mid-flight
        x.save(); x.translate(660, 640); x.rotate(-0.3 + t * 0.6); blanket(x, 0, -60, 260, 120, '#7c74f0'); x.restore()
        mug(x, t, 330, 700 - 40 * Math.sin(t * 3), 0.9); mug(x, t, 860, 980 - 40 * Math.cos(t * 3), 0.9, '#5a9a6a')
        for (let i = 0; i < 5; i++) R(x, BONE, 160 + (i % 2) * 40, 900 + i * 40, 160, 6)
        // snow spray
        for (let i = 0; i < 10; i++) { const p = ((t * 1.4 + i / 10) % 1 + 1) % 1; x.save(); x.globalAlpha = 1 - p; R(x, '#f4f8ff', 400 - p * 200 + i * 6, 1150 - p * 120 + (i % 3) * 20, 16, 16); x.restore() }
      } },
    // B · the situation (3–12.5)
    { at: 3.0, set: 'room', setOpts: { couchX: 540 }, cam: [1.14, 540, 900], push: 0.04,
      draw(x, t, S) {
        star(x, t, PIS, { x: 420, y: 1040, s: 260, mood: t < 6.4 ? 'wide' : 'sparkle', look: [1, -1], tears: t < 6.4 ? 1 : 2, hops: S.hopsFor(PIS) })
        phoneSmall(x, t, 590, 1060, { rot: 0.3, s: 0.9, buzz: inR(t, 3.6, 4.6) ? 1 : 0 })
      } },
    // C · the urge (12.5–18.6), THE STARS (18.6–25.5)
    { at: 12.5, set: 'room', setOpts: { couchX: 540 }, cam: [1.0, 540, 960], push: 0.04,
      draw(x, t) {
        scroll(x, t, 12.7, 17.6)
        star(x, t, PIS, { x: 180, y: 1220, s: 220, mood: t < 17.6 ? 'happy' : 'wide', look: [1, -1], tears: 2, hops: [13.2, 14.2, 15.2, 16.2] })
      } },
    { at: 18.6, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1000, s: 380, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
      },
      pis: { x: 190, y: 1220, s: 160, tears: 2, mood: 'sparkle', look: [1, -1] } },
    // D · the couch (25.5–49)
    { at: 25.5, set: 'room', setOpts: { couch: false, warm: 0.7 }, dim: 0.75, cam: [1.14, 540, 900], push: 0.04,
      draw(x, t, S) {
        couch(x, 540, 990, 680, '#c0577a')
        star(x, t, ARI, { x: 380, y: 1010, s: 240, mood: t < 42.2 ? 'sparkle' : t < 45.6 ? 'neutral' : 'happy', look: [1, 0], hops: S.hopsFor(ARI) })
        blanket(x, 380, 1075, 300, 110, '#7c74f0')
        const quiet = inR(t, 36.5, 42.2)
        star(x, t, PIS, { x: 680, y: 1010, s: 240, mood: quiet ? 'squint' : 'sparkle', look: [-1, 0], tears: t < 42 ? 2 : 3, hops: S.hopsFor(PIS), squash: quiet ? 0.04 * Math.sin(t * 6) : 0 })
        mug(x, t, 540, 1150, 0.8)
        if (quiet) label(x, '(not filling the silence)', 680, 1300, { size: 30, col: PCOL })
        if (t > 42.6) heart(x, 530, 900 - 10 * Math.sin(t * 3), 6, '#ff5c8a')
      } },
    // E · after: the morning (49–60)
    { at: 49.0, set: 'bedroom', cam: [1.14, 540, 900], push: 0.04,
      draw(x, t, S) {
        star(x, t, PIS, { x: 420, y: 980, s: 270, mood: 'happy', look: [1, -1], tears: 3, hops: S.hopsFor(PIS).concat([50.2, 50.8, 51.4]) })
        mug(x, t, 600, 1060, 0.9)
        phoneSmall(x, t, 640, 1110, { rot: 0.2, s: 0.8, buzz: inR(t, 49.6, 50.6) ? 1 : 0 })
        label(x, '8:12 AM', 900, 200, { size: 34, col: BONE })
        if (t > 50) hearts(x, t, 50.2, 420, 820, { n: 6, cell: 6 })
      } },
  ],
  cues: [
    ['whoosh', 0.0, 0.6, 0.05], ['tick', 0.2, 0.05], ['pluck', 0.3, 659.25, 0.035, 0.5, 0.3], ['pluck', 0.5, 587.33, 0.035, 0.5, 0.3],
    ['whoosh', 12.7, 2.4, 0.03], ['whoosh', 17.6, 0.25, 0.05], ['pop', 17.65, 220, 0.05, 0],
    ['pluck', 50.4, 659.25, 0.035, 0.5, 0.3], ['pluck', 50.6, 587.33, 0.035, 0.5, 0.3], ['glitter', 50.2, 50.9],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
