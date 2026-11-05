// kxase04 · Ask the Stars: Extended, ep 4 · "A Crush on Your Friend" (75 s vertical, star_advice post, jazzy · Bb)
// No end card, no card transition. LOOP ending: movie night again, eased back into the frame-0 composition.
// The look lives in ../../kxase01/xkit.js.
//   0.00   frame 0: movie night. ♍ Virgo's head lands on ♉ Taurus's shoulder; Taurus mid-flail, the popcorn bowl flying.
//          Slam title "Crush on my *best friend.* | Help."  0.8 record scratch + freeze "their head. *your shoulder.*"
//   2.2    promise "the ending, *though*"
//   3.0    1 · THE QUESTION  DM "I have a crush on my *friend.* | What if I ruin it?"
//  12.5    2 · WHY IT HAPPENS  THE STARS: "the fear is about *losing* them." → "that shows how much you *care.*"
//          Taurus holding a heart and the friendship photo. Chip ♉ FIXED EARTH · RULED BY VENUS.
//  25.0    3 · THE STORY  three hangouts, three "saying it…" bars stalled at 99 % (the weather, a dog, more cookies).
//  40.0    4 · WHAT HELPS  "say it gently, and give them *room.*" → the card.
//  55.0    5 · THE ANSWER  the bench: Taurus says it. Virgo: "can I think about it?" "and yes. *still* friends."
//  68.0    movie night again, the same couch. last line "Still friends. | *Braver* ones."  → loops into frame 0.
import {
  makeX, say, stars, star, box, R, label, hearts, sparkles, table, mug, heart, bench,
  signStar, INK, BONE, GOLD, PINK, RED, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxase01/xkit.js'

const TAU = 'taurus', VIR = 'virgo'
const TC = '#b8f0c0'

// the TV glow (foreground, the back of a little set) and the popcorn
function tv(x, t) {
  const f = 0.8 + 0.2 * Math.sin(t * 7) * Math.sin(t * 3.1)
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(540, 1400, 0, 540, 1400, 700); g.addColorStop(0, `rgba(140,190,255,${0.28 * f})`); g.addColorStop(1, 'rgba(140,190,255,0)')
  x.fillStyle = g; x.fillRect(0, 700, 1080, 1220); x.restore()
  box(x, 300, 1330, 480, 40, '#2a2148', { b: 7 })
}
function popcorn(x, t, { flying = false, bx = 460, by = 1090 } = {}) {
  if (flying) {
    // kernels arcing out of a tipping bowl (t from −0.6)
    const tt = t + 0.6
    for (let i = 0; i < 16; i++) {
      const a = -1.9 + (i / 16) * 1.6, v = 520 + (i * 37) % 200
      const px = 470 + Math.cos(a) * v * tt * 0.7, py = 880 + Math.sin(a) * v * tt * 0.8 + 380 * tt * tt
      if (py > 1170) continue
      R(x, INK, px - 11, py - 11, 22, 22); R(x, '#fff3c4', px - 8, py - 8, 16, 16); R(x, '#f2c75c', px, py, 6, 6)
    }
    x.save(); x.translate(lerp(470, 560, clamp(tt / 2)), lerp(900, 1100, clamp(tt / 2.2))); x.rotate(-0.9 - tt * 1.4)
    box(x, -60, -30, 120, 60, '#e8344e', { b: 6 }); for (let i = -50; i < 60; i += 30) R(x, BONE, i, -30, 14, 60)
    x.restore()
    return
  }
  box(x, bx - 60, by - 30, 120, 60, '#e8344e', { b: 6 }); for (let i = -50; i < 60; i += 30) R(x, BONE, bx + i, by - 30, 14, 60)
  for (let i = 0; i < 6; i++) { R(x, INK, bx - 50 + i * 18, by - 48 - (i % 2) * 8, 20, 20); R(x, '#fff3c4', bx - 47 + i * 18, by - 45 - (i % 2) * 8, 14, 14) }
}
function movieNight(x, t, frame0) {
  const flail = frame0 ? 1 : 0
  x.save(); x.translate(400, 1000); x.rotate(flail ? -0.12 + 0.06 * Math.sin(t * 20) : 0)
  star(x, t, TAU, { x: 0, y: 0, s: 270, mood: frame0 ? 'wide' : 'heart', look: frame0 ? [1, 0] : [0, -1], squash: frame0 ? -0.05 : 0, hops: null })
  x.restore()
  x.save(); x.translate(610, 1030); x.rotate(-0.32)
  star(x, t, VIR, { x: 0, y: 0, s: 240, mood: frame0 ? 'sleepy' : 'happy', look: [-1, 0], zzz: false })
  x.restore()
  if (frame0) { label(x, 'thump.', 600, 830, { size: 34, col: BONE, rot: -0.1 }); popcorn(x, t, { flying: true }) } else popcorn(x, t, { bx: 400, by: 1120 })
}

const F = makeX({
  id: 'kxase04', series: 'ask', dur: 75, ending: 'loop', loopLen: 0.45,
  hook: { text: 'Crush on my *best friend.* | Help.', out: 2.9, top: 200, size: 108, color: TC },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'the ending, *though*', top: 1300 },
  chapters: [{ at: 3.0, title: 'the question' }, { at: 12.5, title: 'why it happens' }, { at: 25.0, title: 'the story' }, { at: 40.0, title: 'what helps' }, { at: 55.0, title: 'the answer' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'scratch', at: 0.8, len: 1.3, caption: 'their head. | *your shoulder.*', top: 1480 },
    { k: 'loading', at: 25.6, len: 2.6, label: 'saying it…', stallAt: 99, error: 'Error: talked about the weather', y: 640 },
    { k: 'loading', at: 30.6, len: 2.6, label: 'saying it…', stallAt: 99, error: 'Error: a dog walked by', y: 640 },
    { k: 'loading', at: 35.3, len: 2.4, label: 'saying it…', stallAt: 99, error: 'Error: offered more cookies', y: 640 },
    { k: 'whip', at: 30.0, len: 0.4, from: 1.25 }, { k: 'whip', at: 35.0, len: 0.4, from: 1.25 },
    { k: 'shake', at: 65.6, len: 0.3, amp: 10 },
  ],
  dm: { at: 3.2, out: [12.2, 12.5], text: 'I have a crush on my *friend.* | What if I ruin it?', top: 300 },
  chip: { at: 20.4, out: [24.3, 24.6], text: '♉ FIXED EARTH · RULED BY VENUS', color: TC, top: 1290 },
  lines: [
    say(5.6, TAU, "we've been friends for *years.*"),
    say(8.8, TAU, 'and now my heart does a *thing.*'),
    stars(13.0, 'the fear is about *losing* them.'),
    stars(16.6, 'that shows how much you *care.*'),
    say(37.9, TAU, 'three hangouts. *zero* sentences.'),
    stars(40.6, 'say it gently, and give them *room.*'),
    stars(44.2, 'mean it when you say the friendship stays.'),
    say(59.4, VIR, 'can I think about it?'),
    say(62.2, VIR, 'and yes. *still* friends. always.'),
    say(65.2, TAU, 'okay. that was *brave* of me.'),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 24.6 }, { from: 4, to: 5, close: 39.85 }, { from: 5, to: 7, close: 47.7 }, { from: 7, to: 10, close: 67.9 }],
  cards: [{ at: 48.0, out: [53.4, 53.75], text: 'I like you as more than a friend. | *no pressure. we’re good either way.*', label: 'SAY IT GENTLY', top: 430, size: 54 }],
  last: { at: 72.5, text: 'Still friends. | *Braver* ones.', top: 300, color: TC },
  shots: [
    // A · movie night, frame 0 (0–3)
    { at: 0, set: 'room', setOpts: { couchX: 520, lights: true }, dim: 0.75, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) { movieNight(x, t, true); tv(x, t) },
      pis: { x: 940, y: 1250, s: 120, tears: 1, mood: 'wide', look: [-1, -1] } },
    // B · the question
    { at: 3.0, set: 'sky', push: 0.04,
      draw(x, t, S) { star(x, t, TAU, { x: 520, y: 1040, s: 330, mood: t < 8.6 ? 'neutral' : 'heart', look: [0, -1], hops: S.hopsFor(TAU) }) },
      pis: t => ({ x: 920, y: 1250, s: 140, tears: t < 8.8 ? 1 : 2, mood: 'sparkle', look: [-1, -0.6] }) },
    // C · why
    { at: 12.5, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1000, s: 380, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, TAU, { x: 190, y: 1210, s: 150, mood: 'neutral', look: [1, -1] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    { at: 16.0, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, TAU, { x: 540, y: 1060, s: 300, mood: 'sparkle', look: [Math.sin(t * 1.6) > 0 ? 1 : -1, -1] })
        // a heart in one tip, the friendship photo in the other
        const b = Math.sin(t * 1.6) * 30
        x.save(); x.translate(300, 860 + b); heart(x, 0, 0, 12, '#ff5c8a'); x.restore()
        x.save(); x.translate(790, 860 - b); x.rotate(0.08)
        box(x, -110, -80, 220, 160, GOLD, { b: 7 }); R(x, '#1c1640', -94, -64, 188, 128)
        star(x, t, TAU, { x: -40, y: 10, s: 80, mood: 'happy', tips: false }); star(x, t, VIR, { x: 40, y: 10, s: 80, mood: 'happy', tips: false })
        x.restore()
        label(x, 'FRIENDSHIP', 790, 980 - b, { size: 24, col: GOLD })
      },
      pis: t => ({ x: 900, y: 1290, s: 130, tears: 2, mood: 'sparkle', look: [-1, -1] }) },
    // D · three hangouts (25–40)
    { at: 25.0, set: 'cafe', cam: [1.1, 540, 920], push: 0.03,
      draw(x, t) {
        table(x, 540, 1060, 440); mug(x, t, 470, 1035, 0.7); mug(x, t, 610, 1035, 0.7, '#5a9a6a')
        star(x, t, TAU, { x: 290, y: 980, s: 240, mood: t > 27.7 ? 'squint' : 'sparkle', look: [1, 0] })
        star(x, t, VIR, { x: 790, y: 980, s: 240, mood: 'happy', look: [-1, -1] })
        if (t > 27.8) label(x, '“so… cold out, huh?”', 540, 1290, { size: 36, col: BONE })
      },
      pis: { x: 940, y: 1250, s: 110, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    { at: 30.0, set: 'park', cam: [1.1, 540, 920], push: 0.03, noFlash: true,
      draw(x, t) {
        star(x, t, TAU, { x: 400, y: 960, s: 220, mood: t > 32.8 ? 'squint' : 'sparkle', look: [1, 0] })
        star(x, t, VIR, { x: 690, y: 960, s: 220, mood: t > 32.4 ? 'wide' : 'happy', look: t > 32.4 ? [1, 0] : [-1, 0] })
        if (t > 32.6) label(x, '“OH! a dog in a scarf!”', 540, 1290, { size: 36, col: INK })
      },
      pis: { x: 180, y: 1200, s: 110, tears: 2, mood: 'sparkle', look: [1, -1] } },
    { at: 35.0, set: 'kitchen', cam: [1.1, 540, 920], push: 0.03, noFlash: true,
      draw(x, t, S) {
        star(x, t, TAU, { x: 330, y: 880, s: 230, mood: t > 37.5 ? 'squint' : 'sparkle', look: [1, 0], hops: S.hopsFor(TAU) })
        star(x, t, VIR, { x: 730, y: 880, s: 230, mood: 'happy', look: [-1, 0] })
        box(x, 440, 990, 200, 20, '#c9c4d8', { b: 5 }); for (let i = 0; i < 4; i++) { R(x, INK, 456 + i * 46, 958, 34, 30); R(x, '#c98a4a', 459 + i * 46, 961, 28, 24) }
        if (t > 37.4) label(x, '“…more cookies?”', 540, 1240, { size: 36, col: BONE })
      },
      pis: t => ({ x: 940, y: 1240, s: 110, tears: 2, mood: 'sparkle', look: [-1, -1] }) },
    // E · what helps
    { at: 40.0, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1010, s: 370, mood: t > 48 ? 'heart' : 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, TAU, { x: 180, y: 1210, s: 160, mood: t > 50 ? 'happy' : 'neutral', look: [1, -1], hops: [50.2, 50.9] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 2, mood: 'sparkle', look: [-1, -1] } },
    // F · the bench (55–68)
    { at: 55.0, set: 'park', cam: [1.1, 540, 920], push: 0.04,
      draw(x, t, S) {
        star(x, t, TAU, { x: 400, y: 960, s: 230, mood: t < 59.3 ? 'sparkle' : t < 62.2 ? 'neutral' : 'happy', look: [1, 0], hops: S.hopsFor(TAU) })
        star(x, t, VIR, { x: 690, y: 960, s: 230, mood: t < 59.3 ? 'wide' : 'happy', look: [-1, 0], hops: S.hopsFor(VIR) })
        if (inR(t, 55.5, 58.0)) {
          const k = pop01(t, 55.5, 0.3, 2.4) * outK(t, [57.7, 58.0])
          x.save(); x.translate(470, 700); x.scale(k, k); R(x, INK, -300, -70, 600, 140); R(x, BONE, -294, -64, 588, 128)
          x.font = `800 32px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
          x.fillText('I like you as more than a friend.', 0, -20); x.fillText('no pressure. we’re good either way.', 0, 24); x.restore()
        }
        if (inR(t, 58.0, 59.4)) for (let i = 0; i < 3; i++) { const on = Math.floor(t * 5 + i) % 3 === 0; R(x, INK, 650 + i * 34, 760, 24, 24); R(x, on ? GOLD : '#9a90b8', 654 + i * 34, 764, 16, 16) }
        if (t > 62.3) hearts(x, t, 62.3, 540, 820, { n: 6, cell: 6, spread: 260 })
      },
      pis: t => ({ x: 180, y: 1200, s: 120, tears: t < 62.2 ? 2 : 3, mood: t < 62.2 ? 'sparkle' : 'happy', look: [1, -1], hops: t > 62.2 ? [62.4, 63.0, 63.6] : null }) },
    // G · movie night again (68–75), then the loop back into frame 0
    { at: 68.0, set: 'room', setOpts: { couchX: 520, lights: true }, dim: 0.75, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) { movieNight(x, t, false); tv(x, t); if (t > 69) hearts(x, t, 69.2, 500, 820, { n: 4, cell: 6, spread: 200 }) },
      pis: t => ({ x: 940, y: 1250, s: 120, tears: 3, mood: 'happy', look: [-1, -1], hops: [69.0, 69.6, 70.2] }) },
  ],
  cues: [
    ['pop', 0.0, 196, 0.05, 0], ['tick', 0.05, 0.05],
    ['pop', 27.8, 659.25, 0.03, 0], ['pop', 32.6, 1318.51, 0.035, 0.3], ['pop', 37.4, 880, 0.03, 0],
    ['pop', 55.5, 1174.66, 0.035, 0], ['tick', 58.1, 0.02], ['tick', 58.5, 0.02], ['tick', 58.9, 0.02],
    ['glitter', 62.3, 63.0], ['pluck', 62.6, 659.25, 0.035, 0.5, 0.3], ['pluck', 62.8, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
