// kxase07 · Ask the Stars: Extended, ep 7 · "Pretending Not to Care" (75 s vertical, star_advice post, dreamy · Db)
// No end card, no card transition. Hard cut on the punchline. The look lives in ../../kxase01/xkit.js.
//   0.00   frame 0: ♑ Capricorn mid-spin away from the phone in cool shades; its bubble "whatever, no big deal" cracking.
//          Slam title '"No big deal." | *(Huge deal.)*'  0.8 record scratch "it is a *very* big deal."
//   2.2    promise "wait for the *real* text"
//   3.0    1 · THE QUESTION  DM "I act like I don't care. | I *really* do."
//  12.5    2 · WHY IT HAPPENS  the cool shades over a pounding heart. "playing it cool feels *safe.*" "it also *hides* you."
//          Chip ♑ CARDINAL EARTH · RULED BY SATURN.
//  25.0    3 · THE STORY  split: Capricorn sends "sure, whatever works" (hearts bursting behind its back) | ♋ Cancer
//          reads it: "oh. maybe they're *not* into it." → "no worries if you're busy!" Capricorn: "wait, no."
//  40.0    4 · WHAT HELPS  "you can be calm *and* clear." "say one true thing. just one." → the card.
//  55.0    5 · THE ANSWER  "honestly? I'd really like that." Cancer: "oh! *me too.* saturday?" The shades fly off.
//  69.0    stargazing in the snow, the shades left behind.  73.5 last line "Calm. | *And* honest."
import {
  makeX, say, stars, star, box, R, label, hearts, sparkles, phoneSmall, heart, bubble,
  signStar, INK, BONE, GOLD, PINK, RED, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxase01/xkit.js'

const CAP = 'capricorn', CAN = 'cancer'
const PC = '#e9d9a8'

// pixel shades over a star's eyes (cx, cy, size)
function shades(x, cx, cy, s, rot = 0) {
  x.save(); x.translate(cx, cy - s * 0.03); x.rotate(rot)
  const w = s * 0.56, h = s * 0.12
  R(x, INK, -w / 2, -h / 2, w, h); R(x, '#2a2148', -w / 2 + 6, -h / 2 + 6, w * 0.42, h - 12); R(x, '#2a2148', w * 0.04, -h / 2 + 6, w * 0.42, h - 12)
  R(x, '#8fd8f6', -w / 2 + 12, -h / 2 + 10, w * 0.12, 6); R(x, '#8fd8f6', w * 0.1, -h / 2 + 10, w * 0.12, 6)
  x.restore()
}
function crackBubble(x, t, cx, cy, text, crack) {
  x.save(); x.translate(cx, cy)
  for (const side of [-1, 1]) {
    x.save(); x.translate(side * crack * 30, crack * 20 * (side > 0 ? 1 : 0.5)); x.rotate(side * crack * 0.12)
    x.beginPath(); x.rect(side < 0 ? -320 : 0, -80, 320, 160); x.clip()
    R(x, INK, -300, -60, 600, 120); R(x, BONE, -294, -54, 588, 108)
    x.font = `800 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    x.restore()
  }
  if (crack > 0) { x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(0, -60); x.lineTo(-14, -20); x.lineTo(10, 10); x.lineTo(-8, 60); x.stroke() }
  x.restore()
}

const F = makeX({
  id: 'kxase07', series: 'ask', dur: 75, ending: 'cut',
  hook: { text: '“No big deal.” | *(Huge deal.)*', out: 2.9, top: 200, size: 112, color: PC },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'wait for the *real* text', top: 1300 },
  chapters: [{ at: 3.0, title: 'the question' }, { at: 12.5, title: 'why it happens' }, { at: 25.0, title: 'the story' }, { at: 40.0, title: 'what helps' }, { at: 55.0, title: 'the answer' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'scratch', at: 0.8, len: 1.3, caption: 'it is a *very* | big deal.', top: 1480 },
    { k: 'caught', at: 26.4, x: 232, y: 684, r: 200, ry: 110, label: 'NOT TRUE', arrow: 'br', rec: false, out: [28.6, 28.8] },
    { k: 'notif', at: 33.0, out: [35.6, 35.85], title: 'texts', body: 'Cancer: no worries if you’re *busy!*', glyph: signStar(CAN).glyph, color: signStar(CAN).color, y: 150 },
    { k: 'shake', at: 61.4, len: 0.4, amp: 16 },
    { k: 'whip', at: 69.0, len: 0.45, from: 1.3 },
  ],
  dm: { at: 3.2, out: [12.2, 12.5], text: 'I act like I don’t care. | I *really* do.', top: 300 },
  chip: { at: 20.4, out: [24.3, 24.6], text: '♑ CARDINAL EARTH · RULED BY SATURN', color: PC, top: 1290 },
  lines: [
    say(5.6, CAP, "they asked me out. I said *'sure, whatever.'*"),
    say(9.0, CAP, "now they think I'm *not* into it."),
    stars(13.0, 'playing it cool feels *safe.*'),
    stars(16.6, 'it also *hides* you.'),
    say(30.0, CAN, "oh. maybe they're *not* into it."),
    say(36.2, CAP, "wait, no. that's *not* what I meant."),
    stars(40.6, 'you can be calm *and* clear.'),
    stars(43.8, 'say one true thing. just one.'),
    say(59.0, CAN, 'oh! *me too.* saturday?'),
    say(62.4, CAP, 'saturday. *definitely.*'),
    say(65.4, 'pisces', 'the shades are *OFF!!*'),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 24.6 }, { from: 4, to: 6, close: 39.8 }, { from: 6, to: 8, close: 47.7 }, { from: 8, to: 11, close: 68.8 }],
  cards: [{ at: 48.0, out: [53.4, 53.75], text: 'honestly? | *I’d really like that.*', label: 'ONE TRUE THING', top: 430 }],
  last: { at: 73.5, text: 'Calm. | *And* honest.', top: 300, color: PC },
  shots: [
    // A · the spin (0–3)
    { at: 0, set: 'room', setOpts: { couchX: 540 }, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) {
        const spin = Math.sin(t * 9) * 0.25
        x.save(); x.translate(560, 960); x.rotate(0.3 + spin * 0.4)
        star(x, t, CAP, { x: 0, y: 0, s: 290, mood: 'neutral', look: [-1, 0] })
        shades(x, 0, 0, 290)
        x.restore()
        phoneSmall(x, t, 860, 1030, { rot: 0.5, s: 1.0, text: 'wanna|hang out?', buzz: 1 })
        crackBubble(x, t, 470, 690, 'whatever, no big deal', clamp(prog(t, -0.4, 0.6)) * (t < 2.4 ? 1 : 1))
        for (let i = 0; i < 3; i++) { const a = t * 6 + i * 2.1; R(x, BONE, 560 + Math.cos(a) * 220, 960 + Math.sin(a) * 120, 30, 6) }
      },
      pis: { x: 160, y: 1250, s: 120, tears: 1, mood: 'wide', look: [1, -1] } },
    // B · the question
    { at: 3.0, set: 'sky', push: 0.04,
      draw(x, t, S) { star(x, t, CAP, { x: 520, y: 1040, s: 330, mood: t < 8.8 ? 'neutral' : 'sparkle', look: [0, -1], hops: S.hopsFor(CAP) }); if (t < 8.8) shades(x, 520, 1040, 330) },
      pis: t => ({ x: 920, y: 1250, s: 140, tears: t < 9 ? 1 : 2, mood: 'sparkle', look: [-1, -0.6] }) },
    // C · why: the shades over a pounding heart
    { at: 12.5, set: 'sky', push: 0.05,
      draw(x, t, S) {
        const beat = 1 + 0.12 * Math.max(0, Math.sin(t * 9)) ** 4
        star(x, t, 'stars', { x: 820, y: 1160, s: 220, mood: 'happy', look: [-1, -1], hops: S.hopsFor('stars'), glow: 1.2 })
        star(x, t, CAP, { x: 420, y: 1000, s: 330, mood: 'neutral', look: [0, 0] })
        shades(x, 420, 1000, 330)
        x.save(); x.translate(420, 1070); x.scale(beat, beat); heart(x, 0, 0, 9, '#ff5c8a'); x.restore()
        label(x, 'ba-dum', 420 + 160, 900, { size: 30, col: PINK, alpha: Math.max(0, Math.sin(t * 9)) })
      },
      pis: { x: 160, y: 1250, s: 130, tears: 2, mood: 'sparkle', look: [1, -1] } },
    // D · the split (25–40)
    { at: 25.0, set: 'split', cam: [1.16, 540, 880], push: 0.03,
      draw(x, t) {
        label(x, 'CAPRICORN', 270, 380, { size: 26, col: PC }); label(x, 'CANCER', 810, 380, { size: 26, col: signStar(CAN).color })
        star(x, t, CAP, { x: 270, y: 1030, s: 230, mood: t > 36 ? 'wide' : 'neutral', look: [0, 1] })
        if (t < 36) shades(x, 270, 1030, 230)
        if (t > 25.6 && t < 36) hearts(x, t, Math.floor((t - 25.6) / 1.3) * 1.3 + 25.6, 200, 900, { n: 4, cell: 5, spread: 100 })
        bubble(x, t, 270, 640, 25.6, 31.0, 'sure, whatever works', { size: 34, maxW: 300 })
        star(x, t, CAN, { x: 810, y: 1030, s: 230, mood: t > 29.8 ? 'sparkle' : 'happy', look: [0, 1] })
        phoneSmall(x, t, 900, 1100, { rot: 0.2, s: 0.75, text: 'sure,|whatever' })
      },
      pis: t => ({ x: 680, y: 1240, s: 90, tears: 2, mood: 'sparkle', look: [-1, -1], tissue: false }) },
    // E · what helps
    { at: 40.0, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1010, s: 370, mood: t > 48 ? 'heart' : 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, CAP, { x: 180, y: 1210, s: 160, mood: t > 50 ? 'happy' : 'neutral', look: [1, -1], hops: [50.2, 50.9] })
        if (t < 50) shades(x, 180, 1210, 160)
      },
      pis: { x: 900, y: 1230, s: 130, tears: 2, mood: 'sparkle', look: [-1, -1] } },
    // F · the answer (55–69)
    { at: 55.0, set: 'split', cam: [1.16, 540, 880], push: 0.04,
      draw(x, t, S) {
        star(x, t, CAP, { x: 270, y: 1030, s: 230, mood: t < 61.4 ? 'neutral' : 'heart', look: [0, 1], hops: S.hopsFor(CAP).concat(t > 61.4 ? [61.5, 62.0] : []) })
        if (t < 61.4) shades(x, 270, 1030, 230)
        else { const p = prog(t, 61.4, 62.6); shades(x, lerp(270, 120, p), lerp(1030, 600, p) + 900 * p * p, 230, p * 9) }
        bubble(x, t, 270, 640, 55.6, 60.0, 'honestly? I’d really like that.', { size: 34, maxW: 300 })
        if (t > 61.5) hearts(x, t, 61.5, 270, 900, { n: 7, cell: 6, spread: 200 })
        star(x, t, CAN, { x: 810, y: 1030, s: 230, mood: t < 58.8 ? 'wide' : 'happy', look: [0, 1], hops: S.hopsFor(CAN) })
        phoneSmall(x, t, 900, 1100, { rot: 0.2, s: 0.75, text: t > 56.4 ? 'honestly?|❤︎' : null, buzz: inR(t, 56.4, 57.2) ? 1 : 0 })
      },
      pis: t => ({ x: 680, y: 1240, s: 100, tears: t < 61.4 ? 2 : 3, mood: 'happy', look: [-1, -1], tissue: false, hops: t > 65.2 ? [65.4, 66.0, 66.6] : null }) },
    // G · stargazing (69–75)
    { at: 69.0, set: 'sky', setOpts: { bank: 1150 }, push: 0.03, noFlash: true,
      draw(x, t) {
        star(x, t, CAP, { x: 420, y: 1060, s: 230, mood: 'happy', look: [0, -1], hops: [70.0, 72.0] })
        star(x, t, CAN, { x: 660, y: 1060, s: 230, mood: 'happy', look: [0, -1], hops: [70.5, 72.5] })
        shades(x, 860, 1250, 160, 0.4)
        if (t > 70) hearts(x, t, 70.2, 540, 900, { n: 4, cell: 6, spread: 200 })
      },
      pis: t => ({ x: 180, y: 1250, s: 130, tears: 3, mood: 'happy', look: [1, -1], hops: [70.4, 71.4, 72.4] }) },
  ],
  cues: [
    ['whoosh', 0.0, 0.5, 0.05], ['tick', 0.3, 0.05], ['tick', 0.45, 0.04],
    ['pop', 25.6, 880, 0.03, -0.3], ['pop', 55.6, 1174.66, 0.035, -0.3], ['pop', 56.4, 1318.51, 0.035, 0.3],
    ['whoosh', 61.4, 0.5, 0.05], ['glitter', 61.5, 62.2], ['pluck', 65.6, 659.25, 0.035, 0.5, 0.3], ['pluck', 65.8, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
