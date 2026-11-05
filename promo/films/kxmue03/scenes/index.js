// kxmue03 · The Make-Up Talk: Extended, ep 3 · "Day Three of Quiet" (90 s vertical, star_advice post, dreamy · Ab)
// No end card, no card transition. Hard cut on the punchline. Engine: ../../kxmue01/scenes/m47kit.js.
//   0.00   frame 0: ♉ Taurus mid-knock on a closed door, a tear-off calendar flipping to DAY 3, pages flying.
//          Slam "Day *three* of the | silent treatment."  0.7 record scratch + caught circle on the calendar.
//   2.3    promise "wait for *Sunday, 10 AM*"
//   3.0    1 · THE FIGHT       the missed thing, a shrug "…fine." → the phone: "k." "k." "sure." (DAY 1 → DAY 3)
//  20.0    2 · THE TIME-OUT    split: ♒ Aquarius builds a model rocket, Taurus kneads stress bread
//  28.0    THE STARS           "needing space is okay." / "*disappearing* isn't. give a return time."
//  35.5    3 · THE OPENER      a note under the door: "one more day. back *Sunday, 10 AM.*" → countdown → SUNDAY
//  52.0    4 · THE HARD PART   "silence makes me feel *punished.*" / "I go quiet when I'm scared of saying it *wrong.*"
//  70.0    5 · THE MEND        bread for two, the heart mends 72.5, the rule card
//  88.6    last line "Space with a | *return date.*"
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, mendHeart, bubble, thought, bigPhone,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const TAU = 'taurus', AQU = 'aquarius'
const TAUC = signStar(TAU), AQUC = signStar(AQU)
const MEND = 72.5

function calendar(x, t, cx, cy, text, { k = 1, flipAt = -9, sub = 'DECEMBER' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -110, -120, 220, 240, BONE, { b: 7 }); R(x, RED, -110, -120, 220, 56)
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(sub, 0, -92)
  for (let i = -80; i <= 80; i += 40) R(x, INK, i - 5, -134, 10, 24)
  x.font = `800 ${text.length > 6 ? 40 : 56}px ${INTER}`; x.fillStyle = INK; x.fillText(text, 0, 16)
  // a page flying off
  const p = prog(t, flipAt, flipAt + 0.9)
  if (p > 0 && p < 1) { x.save(); x.translate(p * 260, -40 - p * 260); x.rotate(p * 3); x.globalAlpha = 1 - p; R(x, INK, -100, -100, 200, 200); R(x, BONE, -94, -94, 188, 188); x.restore() }
  x.restore()
}
function door(x, t, cx, open = 0, knock = 0) {
  const kx = knock ? Math.sin(t * 60) * 3 * knock : 0
  R(x, INK, cx - 104, 690, 208, 490); R(x, '#2a1f40', cx - 96, 698, 192, 480)
  const w = lerp(192, 36, ease.inOutCubic(open))
  box(x, cx - 96 + kx, 698, w, 474, '#3f6a8a', { b: 0, hi: 'rgba(255,255,255,0.12)' })
  if (open < 0.5) { R(x, GOLD, cx + 60 + kx, 940, 16, 16); R(x, '#355a76', cx - 70 + kx, 740, 140, 150) }
}
function notes(x, t, cx, cy, a = 1) {   // muffled music notes from behind the door
  for (let i = 0; i < 3; i++) { const p = ((t * 0.5 + i / 3) % 1); label(x, '♪', cx + Math.sin(p * 6 + i) * 30, cy - p * 160, { size: 34, col: '#a8ecff', alpha: a * Math.sin(Math.PI * p), font: "'EB Garamond', serif" }) }
}
function bread(x, t, cx, cy, { knead = 0, baked = false, s = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s * (1 + 0.08 * knead * Math.sin(t * 12)), s * (1 - 0.08 * knead * Math.sin(t * 12)))
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 96, 56, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = baked ? '#c9823e' : '#f4e2c0'; x.beginPath(); x.ellipse(0, 0, 88, 48, 0, 0, Math.PI * 2); x.fill()
  if (baked) for (let i = -2; i <= 2; i++) R(x, '#8a4f22', i * 30 - 4, -20, 8, 30)
  x.restore()
}
function rocket(x, t, cx, cy, built) {
  const n = Math.floor(built * 5)
  x.save(); x.translate(cx, cy)
  if (n >= 1) box(x, -30, 0, 60, 70, BONE, { b: 5 })
  if (n >= 2) box(x, -30, -70, 60, 70, BONE, { b: 5 })
  if (n >= 3) { x.fillStyle = INK; x.beginPath(); x.moveTo(-36, -70); x.lineTo(0, -140); x.lineTo(36, -70); x.fill(); x.fillStyle = RED; x.beginPath(); x.moveTo(-28, -74); x.lineTo(0, -128); x.lineTo(28, -74); x.fill() }
  if (n >= 4) { box(x, -60, 40, 26, 34, RED, { b: 4 }); box(x, 34, 40, 26, 34, RED, { b: 4 }) }
  if (n >= 5) { R(x, '#8fd8f6', -14, -40, 28, 28) }
  x.restore()
}

const F = makeM47({
  id: 'kxmue03', series: 'makeup', dur: 90, ending: 'cut',
  hook: { text: 'Day *three* of the | silent treatment.', out: 2.9, top: 200, size: 108 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'wait for *Sunday, 10 AM*', top: 1290 },
  chapters: [{ at: 3.0, title: 'the fight' }, { at: 20.0, title: 'the time-out' }, { at: 35.5, title: 'the opener' }, { at: 52.0, title: 'the hard part' }, { at: 70.0, title: 'the mend' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.55 },
    { k: 'scratch', at: 0.7, len: 1.4, caption: 'three days. | *one-word* replies.', top: 1500 },
    { k: 'caught', at: 0.8, x: 300, y: 620, r: 150, out: [2.2, 2.35], label: 'DAY 3', arrow: 'tr' },
    { k: 'countdown', at: 49.4, from: 3, gap: 0.5, go: 'SUNDAY', y: 760 },
    { k: 'shake', at: 52.0, len: 0.35, amp: 12 },
  ],
  lines: [
    say(3.4, TAU, "you said you'd come to my thing. you *didn't.*"),
    say(7.2, AQU, '…*fine.*'),
    say(16.8, TAU, "three days of *'k.'*"),
    say(22.4, TAU, 'I bake when I\'m *scared.*'),
    stars(28.6, 'needing space is *okay.*'),
    stars(31.6, "*disappearing* isn't. give a return time."),
    say(43.0, TAU, '…okay. thank you for *telling* me.'),
    say(46.0, TAU, "Sunday. 10 AM. I'll make *bread.*"),
    say(52.8, AQU, "it's 10. I'm *here.*"),
    say(55.8, TAU, 'silence makes me feel *punished.*'),
    say(59.2, AQU, "I go quiet when I'm scared of saying it *wrong.*"),
    say(63.4, AQU, 'it was never meant as a *punishment.*'),
    say(66.6, TAU, "then tell me you're coming *back.* every time."),
    say(70.6, AQU, 'deal. space, with a *return time.*'),
    say(80.2, TAU, "and I won't knock *nine* times."),
  ],
  boxes: [{ from: 0, to: 2, close: 9.4 }, { from: 2, to: 3, close: 19.8 }, { from: 3, to: 4, close: 27.8 }, { from: 4, to: 6, close: 35.3 }, { from: 6, to: 8, close: 49.2 }, { from: 8, to: 13, close: 69.8 }, { from: 13, to: 14, close: 74.8 }, { from: 14, to: 15, close: 85.6 }],
  cards: [
    { at: 37.8, out: [42.0, 42.4], label: 'NOTE UNDER THE DOOR', text: 'I need one more day. | back *Sunday, 10 AM.*', top: 470, size: 60 },
    { at: 75.0, out: [79.4, 79.8], label: 'OUR RULE', text: 'need space? say *when* | you’ll be back.', top: 470, size: 62 },
  ],
  last: { at: 88.6, text: 'Space with a | *return date.*', top: 300 },
  beats: [25.4, 36.4, 84.0],
  shots: [
    // A · the knock (0–3)
    { at: 0, set: 'room', setOpts: { couch: false, lamp: false }, rug: true, cam: [1.1, 540, 900], push: 0.03,
      draw(x, t) {
        calendar(x, t, 300, 600, 'DAY 3', { flipAt: -0.5 })
        door(x, t, 800, 0, 1)
        notes(x, t, 800, 1120)
        label(x, 'knock', 640, 820, { size: 30, col: BONE, rot: -0.2 }); label(x, 'knock', 660, 900, { size: 26, col: BONE, rot: 0.15, alpha: 0.8 })
        star(x, t, TAU, { x: 420, y: 1030, s: 250, mood: 'wide', look: [1, 0], hops: [-0.15, 1.2], squash: 0.05 * Math.sin(t * 24) })
      },
      pis: { x: 140, y: 1300, s: 110, tears: 2, mood: 'wide', look: [1, -1] } },
    // B · the fight (3–9.5)
    { at: 3.0, set: 'room', setOpts: { couchX: 540, couchW: 640 }, rug: true, cam: [1.1, 540, 920], push: 0.05,
      draw(x, t, S) {
        mendHeart(x, t, 540, 600, 11, MEND, { wobble: 1.4 })
        star(x, t, TAU, { x: 300, y: 1020, s: 250, mood: t < 7 ? 'squint' : 'wide', look: [1, 0], hops: S.hopsFor(TAU) })
        const shrug = inR(t, 7.2, 8.2) ? Math.sin(Math.PI * prog(t, 7.2, 8.2)) : 0
        star(x, t, AQU, { x: 780, y: 1020, s: 240, mood: 'sleepy', zzz: false, look: [1, -1], squash: -0.08 * shrug, hops: S.hopsFor(AQU) })
        if (shrug > 0) label(x, '*shrug*', 780, 830, { size: 30, col: AQUC.color })
      },
      pis: { x: 960, y: 1300, s: 110, tears: 1, mood: 'wide', look: [-1, -1] } },
    // C · the phone montage (9.5–20): k. k. sure. — the calendar flips DAY 1 → 3
    { at: 9.5, set: 'sky', push: 0.04,
      draw(x, t) {
        const d = t < 12.0 ? 'DAY 1' : t < 14.6 ? 'DAY 2' : 'DAY 3'
        calendar(x, t, 860, 560, d, { k: 0.8, flipAt: t < 13 ? 12.0 : 14.6 })
        bigPhone(x, t, { cx: 480, cy: 880, w: 560, h: 860, title: '♒ aquarius', accent: TAUC.color, pop: pop01(t, 9.6, 0.35, 2),
          msgs: [
            { at: 10.0, from: 'them', text: 'k.' }, { at: 11.0, from: 'me', text: 'are we okay?' }, { at: 12.4, from: 'them', text: 'k.' },
            { at: 13.4, from: 'me', text: 'please talk to me' }, { at: 15.0, from: 'them', text: 'sure.' }, { at: 17.6, from: 'me', text: '…' },
          ] })
        star(x, t, TAU, { x: 860, y: 1200, s: 180, mood: t < 15 ? 'neutral' : 'wide', look: [-1, -0.5], hops: [11.1, 13.5, 16.9] })
      },
      pis: t => ({ x: 120, y: 1320, s: 100, tears: t < 15 ? 1 : 2, mood: 'sparkle', look: [1, -1] }) },
    // D · the time-out (20–28): split, rocket vs bread
    { at: 20.0, set: 'split', cam: [1.1, 540, 900], push: 0.04,
      draw(x, t, S) {
        label(x, "AQUARIUS' ROOM", 270, 380, { size: 24, col: AQUC.color }); label(x, 'THE KITCHEN', 810, 380, { size: 24, col: TAUC.color })
        star(x, t, AQU, { x: 200, y: 1010, s: 200, mood: 'squint', look: [1, 0], hops: [21, 22.6, 24.2, 25.8] })
        rocket(x, t, 380, 1050, prog(t, 20.4, 26.0))
        if (t > 25.4) thought(x, t, 260, 740, 25.4, 27.8, 'what if I say it wrong?', { size: 26, maxW: 380 })
        R(x, INK, 560, 1080, 520, 20); R(x, '#8a5a3a', 560, 1086, 520, 14)
        bread(x, t, 860, 1050, { knead: 1, s: 0.8 })
        star(x, t, TAU, { x: 700, y: 990, s: 200, mood: 'neutral', look: [1, 1], hops: S.hopsFor(TAU) })
      },
      pis: { x: 980, y: 1300, s: 90, tears: 2, mood: 'sparkle', look: [-1, -1], tissue: false } },
    // E · THE STARS (28–35.5)
    { at: 28.0, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 31.4 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, AQU, { x: 190, y: 1210, s: 150, mood: t > 32 ? 'sparkle' : 'neutral', look: [1, -1], hops: [32.4] })
        const k = pop01(t, 32.2, 0.3, 2) * outK(t, [35.0, 35.4])
        if (k > 0.01) { x.save(); x.translate(860, 1150); x.scale(k, k); box(x, -70, -70, 140, 140, BONE, { b: 6 }); x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BACK', 0, -18); x.fillText('AT 10', 0, 22); x.restore() }
      },
      pis: { x: 900, y: 1300, s: 110, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // F · the opener (35.5–52): the note under the door, Taurus answers through it
    { at: 35.5, set: 'room', setOpts: { couch: false, lampX: 120 }, rug: { y: 1230 }, cam: [1.12, 540, 940], push: 0.05,
      draw(x, t, S) {
        door(x, t, 800, 0, 0)
        notes(x, t, 800, 1120, 0.6)
        const p = ease.outCubic(prog(t, 36.2, 37.4))
        if (t > 36.2) { x.save(); x.translate(lerp(820, 640, p), 1178); x.rotate(-0.05); R(x, INK, -60, -12, 120, 22); R(x, BONE, -56, -9, 112, 16); x.restore() }
        star(x, t, TAU, { x: 400, y: 1030, s: 240, mood: t < 42.6 ? 'wide' : 'sparkle', look: [1, 0.3], hops: [37.5, ...S.hopsFor(TAU)] })
        calendar(x, t, 200, 560, t < 48.6 ? 'SAT' : 'SUN 10:00', { k: 0.7, flipAt: 48.6, sub: 'TOMORROW' })
        mendHeart(x, t, 560, 600, 10, MEND)
      },
      pis: t => ({ x: 980, y: 1300, s: 100, tears: t < 44 ? 1 : 2, mood: 'sparkle', look: [-1, -1] }) },
    // G · the hard part (52–70): the door opens, they sit on the rug
    { at: 52.0, set: 'room', setOpts: { couchX: 540, couchW: 640 }, rug: { y: 1240 }, cam: [1.26, 540, 960], push: 0.06,
      draw(x, t, S) {
        star(x, t, TAU, { x: 380, y: 1030, s: 250, mood: t < 59 ? 'neutral' : t < 66 ? 'sparkle' : 'happy', look: [1, 0], hops: S.hopsFor(TAU) })
        star(x, t, AQU, { x: 700, y: 1030, s: 250, mood: t < 55.6 ? 'happy' : t < 63 ? 'neutral' : 'sparkle', look: [-1, 0], hops: [52.2, ...S.hopsFor(AQU)] })
        mendHeart(x, t, 540, 720, 12, MEND, { wobble: 0.5 })
        if (t > 66.8) hearts(x, t, 67.0, 540, 780, { n: 4, cell: 5, spread: 200 })
      },
      pis: t => ({ x: 900, y: 1290, s: 100, tears: t < 60 ? 2 : 3, mood: 'sparkle', look: [-1, -1] }) },
    // H · the mend (70–90): kitchen, bread for two
    { at: 70.0, set: 'kitchen', cam: [1.1, 540, 900], push: 0.05,
      draw(x, t, S) {
        mendHeart(x, t, 540, 520, 13, MEND)
        sparkles(x, t, 540, 520, MEND, 14, 200, 1, [GOLD, '#fff1c8', PINK])
        hearts(x, t, MEND + 0.2, 540, 480, { n: 6, cell: 7, spread: 260 })
        star(x, t, TAU, { x: 300, y: 930, s: 240, mood: 'happy', look: [1, 0], hops: [...S.hopsFor(TAU), MEND + 0.1, 89.0] })
        star(x, t, AQU, { x: 780, y: 930, s: 240, mood: t < MEND ? 'sparkle' : 'happy', look: [-1, 0], hops: [...S.hopsFor(AQU), MEND + 0.15, 89.05] })
        bread(x, t, 540, 1000, { baked: true, s: 1.1 })
        if (t > 82.6) { label(x, 'one loaf.', 540, 1110, { size: 28, col: BONE }); label(x, 'two slices.', 540, 1150, { size: 28, col: GOLD }) }
      },
      pis: t => ({ x: 960, y: 1290, s: 120, tears: 3, mood: t < MEND ? 'sparkle' : 'happy', look: [-1, -1], hops: t > MEND ? [MEND + 0.2, 84.0, 89.0] : null }) },
  ],
  cues: [
    ['tick', 0.0, 0.07], ['tick', 0.3, 0.07], ['tick', 0.6, 0.06], ['whoosh', -0.0, 0.5, 0.04],
    ['whoosh', 7.2, 0.4, 0.02],
    ['pop', 10.0, 880, 0.03, -0.3], ['pop', 11.0, 1174.66, 0.03, 0.3], ['pop', 12.4, 880, 0.03, -0.3], ['pop', 13.4, 1174.66, 0.03, 0.3], ['pop', 15.0, 880, 0.03, -0.3],
    ['whoosh', 12.0, 0.4, 0.03], ['whoosh', 14.6, 0.4, 0.03],
    ['tick', 21.0, 0.03], ['tick', 22.6, 0.03], ['tick', 24.2, 0.03], ['tick', 25.8, 0.03],
    ['whoosh', 36.2, 0.6, 0.03], ['tick', 37.4, 0.05], ['whoosh', 48.6, 0.4, 0.03],
    ['riser', 72.0, 72.5, 0.025], ['tick', 72.5, 0.07], ['pop', 72.5, 1174.66, 0.05, 0], ['bell', 72.55, 1760, 0.035, 1.3, 0], ['glitter', 72.5, 73.1],
    ['pop', 82.6, 987.77, 0.03, 0], ['pop', 82.9, 1318.51, 0.03, 0],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
