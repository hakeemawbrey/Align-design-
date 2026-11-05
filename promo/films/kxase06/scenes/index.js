// kxase06 · Ask the Stars: Extended, ep 6 · "Not Feeling It, Kindly" (75 s vertical, star_advice post, cinematic · Dm)
// No end card, no card transition. Hard cut on the punchline. The look lives in ../../kxase01/xkit.js.
//   0.00   frame 0: ♐ Sagittarius mid-dive behind the couch, dodging its own phone; a notification already down:
//          "Libra: dinner again *friday?*"  Slam title "Nice person. No spark. | *Now what?*"
//   0.9    record scratch "hiding. | from a *text.*"     2.2 promise "wait for *their* reply"
//   3.0    1 · THE QUESTION  DM "They're lovely. I'm not feeling it. | How do I *end* it?"
//  12.5    2 · THE TEMPTATION  a big STOP REPLYING button; glitch "VANISH.EXE has been *blocked*".
//  22.0    3 · WHY KIND MATTERS  "silence leaves them *guessing.*" → ♎ Libra checking the phone: DAY 1 · DAY 3 · DAY 6
//          → "a clear no lets them *move on.*"  Chip ♐ MUTABLE FIRE · RULED BY JUPITER.
//  36.0    4 · WHAT TO SAY  "be warm, be short, be *clear.*" → the card → sent.
//  52.0    5 · THE ANSWER  the reply: "thank you for telling me. really." Sag exhales. Pisces: "so *grown up!!*"
//  68.0    Sag stands tall on the couch it hid behind.  73.5 last line "Honest *beats* | vanishing."
import {
  makeX, say, stars, star, box, R, label, hearts, sparkles, phoneSmall, bigPhone, couch,
  signStar, INK, BONE, GOLD, PINK, RED, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxase01/xkit.js'

const SAG = 'sagittarius', LIB = 'libra'
const GC = '#ffb8a0'
const LIBC = signStar(LIB)

function bigButton(x, t, slash) {
  const press = Math.sin(t * 5) * 6
  x.save(); x.translate(540, 760)
  R(x, INK, -280, -90 + 20, 560, 180); box(x, -270, -90 + press, 540, 160, '#e8344e', { b: 8, hi: '#ff7a8a', lo: '#a8243a' })
  x.font = `800 58px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('STOP REPLYING', 0, -10 + press)
  if (slash > 0) { x.save(); x.rotate(-0.25); R(x, INK, -330, -16, 660 * slash, 32); R(x, '#ffd34d', -326, -10, 652 * slash, 20); x.restore() }
  x.restore()
}

const F = makeX({
  id: 'kxase06', series: 'ask', dur: 75, ending: 'cut',
  hook: { text: 'Nice person. No spark. | *Now what?*', out: 2.9, top: 200, size: 104, color: GC },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'wait for *their* reply', top: 1300 },
  chapters: [{ at: 3.0, title: 'the question' }, { at: 12.5, title: 'the temptation' }, { at: 22.0, title: 'why kind matters' }, { at: 36.0, title: 'what to say' }, { at: 52.0, title: 'the answer' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'notif', at: -1, out: [2.75, 2.95], title: 'texts', body: 'Libra: dinner again *friday?*', glyph: LIBC.glyph, color: LIBC.color, y: 560 },
    { k: 'shake', at: 0.15, len: 0.45, amp: 22 },
    { k: 'scratch', at: 0.9, len: 1.2, caption: 'hiding. | from a *text.*', top: 1480 },
    { k: 'glitch', at: 16.0, len: 1.5, text: 'VANISH.EXE has been *blocked*', buttons: ['OK'] },
    { k: 'loading', at: 28.0, len: 4.0, label: 'waiting for a reply…', stallAt: 99, error: 'Error: still guessing', y: 600 },
    { k: 'whip', at: 68.0, len: 0.45, from: 1.3 },
  ],
  dm: { at: 3.2, out: [12.2, 12.5], text: 'They’re lovely. I’m not feeling it. | How do I *end* it?', top: 300, size: 70 },
  chip: { at: 33.0, out: [35.6, 35.85], text: '♐ MUTABLE FIRE · RULED BY JUPITER', color: GC, top: 1290 },
  lines: [
    say(5.6, SAG, 'three great dates. *zero* spark.'),
    say(8.8, SAG, "I don't want to *hurt* them."),
    say(13.0, SAG, 'what if I just… stop replying?'),
    stars(18.0, 'silence leaves them *guessing.*'),
    stars(22.6, 'a clear no lets them *move on.*'),
    stars(25.2, "and it's kinder than a slow fade."),
    stars(36.6, 'be warm, be short, be *clear.*'),
    stars(39.8, 'no long list of reasons. just the truth.'),
    say(59.4, SAG, 'that was *so* much easier than hiding.'),
    say(63.0, 'pisces', 'so *grown up!!*'),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 21.8 }, { from: 4, to: 6, close: 27.8 }, { from: 6, to: 8, close: 43.4 }, { from: 8, to: 10, close: 67.8 }],
  cards: [{ at: 43.6, out: [49.4, 49.75], text: 'I’ve really enjoyed our dates, | but I don’t feel a spark. | *I wanted to be honest with you.*', label: 'SAY IT CLEARLY', top: 430, size: 50 }],
  last: { at: 73.5, text: 'Honest *beats* | vanishing.', top: 300, color: GC },
  shots: [
    // A · the dive (0–3)
    { at: 0, set: 'room', setOpts: { couchX: 560 }, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) {
        phoneSmall(x, t, 420, 1090, { rot: 1.4, s: 1.0, buzz: 1 })
        const p = ease.outCubic(prog(t, -0.3, 1.2))
        x.save(); x.translate(lerp(560, 860, p), lerp(900, 940, p)); x.rotate(0.9 * p)
        star(x, t, SAG, { x: 0, y: 0, s: 260, mood: 'wide', look: [-1, 0], squash: -0.08 })
        x.restore()
        for (let i = 0; i < 4; i++) R(x, BONE, 600 - i * 50, 860 + i * 30, 90, 6)
      },
      front(x) { couch(x, 560, 990, 680, '#c0577a') },
      pis: { x: 160, y: 1250, s: 120, tears: 1, mood: 'wide', look: [1, -1] } },
    // B · the question
    { at: 3.0, set: 'sky', push: 0.04,
      draw(x, t, S) { star(x, t, SAG, { x: 520, y: 1040, s: 330, mood: t < 8.6 ? 'neutral' : 'sparkle', look: [0, -1], hops: S.hopsFor(SAG) }) },
      pis: t => ({ x: 920, y: 1250, s: 140, tears: t < 8.8 ? 1 : 2, mood: 'sparkle', look: [-1, -0.6] }) },
    // C · the temptation (12.5–22)
    { at: 12.5, set: 'sky', push: 0.04,
      draw(x, t, S) {
        bigButton(x, t, clamp(prog(t, 16.0, 16.4)))
        const reach = t < 16 ? ease.inOutCubic(prog(t, 14.2, 15.8)) : 1 - ease.outCubic(prog(t, 16.0, 16.5))
        star(x, t, SAG, { x: 540, y: lerp(1080, 980, reach), s: 300, mood: t > 16 ? 'wide' : 'squint', look: [0, -1], hops: S.hopsFor(SAG) })
        if (t > 17.6) star(x, t, 'stars', { x: 860, y: 1180, s: 200, mood: 'happy', look: [-1, -1], hops: S.hopsFor('stars'), pop: pop01(t, 17.6) })
      },
      pis: t => ({ x: 170, y: 1250, s: 130, tears: t < 16 ? 1 : 2, mood: 'wide', look: [1, -1] }) },
    // D · why (22–36): THE STARS, then Libra waiting
    { at: 22.0, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1000, s: 380, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, SAG, { x: 190, y: 1210, s: 150, mood: 'neutral', look: [1, -1] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    { at: 27.9, set: 'room', setOpts: { couchX: 540 }, cam: [1.14, 540, 900], push: 0.04,
      draw(x, t) {
        const day = t < 30 ? 'DAY 1' : t < 32 ? 'DAY 3' : 'DAY 6'
        star(x, t, LIB, { x: 540, y: 1000, s: 260, mood: t < 30 ? 'happy' : t < 32 ? 'neutral' : 'sparkle', look: [0, 1], hops: [28.2, 30.1, 32.1] })
        phoneSmall(x, t, 640, 1080, { rot: 0.2, s: 0.9, text: 'no new|messages' })
        label(x, day, 540, 1300, { size: 44, col: LIBC.color })
      },
      pis: t => ({ x: 940, y: 1250, s: 110, tears: 2, mood: 'sparkle', look: [-1, -1] }) },
    // E · what to say (36–52)
    { at: 36.0, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1010, s: 370, mood: t > 43.6 ? 'heart' : 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, SAG, { x: 180, y: 1210, s: 160, mood: t > 49.8 ? 'squint' : 'neutral', look: [1, -1], hops: [49.9] })
        if (t > 49.9) { const p = prog(t, 49.9, 51.2); phoneSmall(x, t, lerp(250, 900, p), lerp(1150, 300, p), { rot: p * 6, s: lerp(0.8, 0.3, p) }); sparkles(x, t, 250, 1150, 49.9, 10, 90, 2) }
      },
      pis: { x: 900, y: 1230, s: 130, tears: 2, mood: 'sparkle', look: [-1, -1] } },
    // F · the answer (52–68)
    { at: 52.0, set: 'room', setOpts: { couchX: 540, warm: 0.7 }, dim: 0.75, cam: [1.14, 540, 900], push: 0.04,
      draw(x, t, S) {
        const relief = t > 58.4
        star(x, t, SAG, { x: 270, y: 1040, s: 250, mood: t < 55.6 ? 'wide' : relief ? 'happy' : 'sparkle', look: t < 58.4 ? [1, -1] : [0, -1], hops: t < 55.6 ? [52.5, 53.3, 54.1, 54.9] : S.hopsFor(SAG), squash: relief ? 0.1 * Math.exp(-(t - 58.4) * 2) : 0 })
        if (inR(t, 58.4, 60.4)) { const p = prog(t, 58.4, 60.4); x.save(); x.globalAlpha = 1 - p; for (let i = 0; i < 4; i++) R(x, '#f4f0ff', 400 + p * 160 + i * 24, 900 - i * 18 - p * 40, 40 - i * 6, 22); x.restore(); label(x, 'phew.', 500, 830, { size: 40, col: BONE, alpha: 1 - p }) }
      },
      pis: t => ({ x: 940, y: 1250, s: 140, tears: t < 62.8 ? 2 : 3, mood: t < 62.8 ? 'sparkle' : 'happy', look: [-1, -1], hops: S0(t) }) },
    // G · standing tall (68–75)
    { at: 68.0, set: 'room', setOpts: { couchX: 560 }, cam: [1.14, 540, 900], push: 0.03, noFlash: true,
      draw(x, t) { star(x, t, SAG, { x: 560, y: 900, s: 280, mood: 'happy', look: [0, -1], hops: [68.6, 69.6, 70.6] }); if (t > 68.6) sparkles(x, t, 560, 860, 68.7, 12, 220, 1) },
      pis: t => ({ x: 940, y: 1250, s: 130, tears: 3, mood: 'happy', look: [-1, -1], hops: [69.0, 70.0, 71.0, 72.0] }) },
  ],
  overlay(x, t) {
    if (t >= 52.4 && t < 67.8) {
      const k = pop01(t, 52.4, 0.35, 2) * outK(t, [58.2, 58.6])
      if (k > 0.01) bigPhone(x, t, { cx: 660, cy: 760, w: 500, h: 600, title: 'libra ♎︎', pop: k, accent: GC, typing: [53.2, 55.6],
        msgs: [
          { at: -9, from: 'me', text: 'I’ve really enjoyed our dates, but I don’t feel a spark. I wanted to be honest with you.' },
          { at: 55.6, from: 'them', name: 'LIBRA', nameCol: LIBC.color, text: 'thank you for telling me. really.' },
          { at: 56.8, from: 'them', name: 'LIBRA', nameCol: LIBC.color, text: 'good luck out there ✦' },
        ] })
    }
  },
  cues: [
    ['whoosh', 0.0, 0.5, 0.05], ['pop', 0.4, 196, 0.06, 0],
    ['whoosh', 14.2, 1.4, 0.03], ['pop', 16.05, 220, 0.05, 0],
    ['tick', 53.4, 0.02], ['tick', 53.9, 0.02], ['tick', 54.4, 0.02], ['tick', 54.9, 0.02], ['pop', 55.6, 987.77, 0.04, 0], ['pop', 56.8, 1174.66, 0.04, 0],
    ['whoosh', 58.4, 1.2, 0.04], ['glitter', 63.0, 63.6], ['pluck', 63.2, 659.25, 0.035, 0.5, 0.3], ['pluck', 63.4, 587.33, 0.035, 0.5, 0.3],
    ['whoosh', 49.9, 1.0, 0.04], ['pop', 49.95, 1318.51, 0.035, 0], ['glitter', 49.9, 50.5],
  ],
})
function S0(t) { return t > 62.8 ? [63.0, 63.6, 64.2, 64.8] : null }
export const { DURATION, SCENES, CUES } = F
export default F
