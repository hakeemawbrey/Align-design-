// kxffe03 · Friends First: Extended, ep 3 · "The Friend Who Only Vents" (60 s vertical, star_advice post, dreamy · Eb)
// No end card, no card transition. LOOP ending: the 1 a.m. call again, eased into the frame-0 composition.
// The look lives in ../../kxase01/xkit.js.
//   0.00   frame 0: 1 a.m. ♋ Cancer mid-yawn, phone on its ear, a call timer at 2:47:12 and a speech-bubble avalanche.
//          Slam title "Call timer: three hours. | *Again.*"  0.8 record scratch "1 a.m. *still* | listening."
//   2.2    promise "wait for Cancer's *news*"
//   3.0    1 · THE SITUATION  "every night, I listen. I *love* them." "but I never get a *turn.*"
//  12.5    2 · THE FEELING  the envelope in Cancer's pocket: YOU GOT THE JOB. THE STARS: "listening is love. so is being
//          *heard.*"
//  23.5    3 · THE CHECK-IN  the café, a talk card: "what's something | *you haven't said yet?*"
//  32.0    4 · THE HARD PART  "I love being there for you. I need room to talk *too.*" ♊ Gemini: "I'm *sorry.* tell me
//          EVERYTHING." "…I got the *job!*"
//  48.5    5 · AFTER  a tiny party (CONGRATS CANCER). Pisces: "your news *matters!!*" → 1 a.m., Gemini asks first.
//  57.6    last line "Your news | *matters* too."  → loops into frame 0.
import {
  makeX, say, stars, star, box, R, label, hearts, sparkles, confetti, phoneSmall, table, mug, envelope, bubble,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR, TAGCOL,
} from '../../kxase01/xkit.js'

const CAN = 'cancer', GEM = 'gemini'
const CC = '#cfe4ff'
const VENT = ['ok so', 'and ANOTHER thing', 'wait, it gets worse', 'are you there?', 'anyway', 'so THEN', 'long story short—', 'ok but', 'ugh']

function timer(x, t, base) {
  const s = Math.floor(base + Math.max(0, t)), h = Math.floor(s / 3600), mm = Math.floor(s / 60) % 60, ss = s % 60
  const txt = `${h}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
  box(x, 680, 560, 300, 90, '#2a2148', { b: 6 })
  x.font = `700 46px 'Space Mono', monospace`; x.fillStyle = '#7dffb0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 830, 606)
  label(x, '● ON CALL · GEMINI', 830, 530, { size: 22, col: TAGCOL[GEM] })
}
function callScene(x, t, { yawn = true, asked = false } = {}) {
  x.save(); x.translate(360, 960); x.rotate(-0.08)
  star(x, t, CAN, { x: 0, y: 0, s: 280, mood: yawn ? 'sleepy' : 'happy', look: [1, -1], zzz: false, squash: yawn ? 0.05 * Math.sin(t * 2) : 0 })
  x.restore()
  phoneSmall(x, t, 500, 900, { rot: -0.6, s: 0.9 })
  if (yawn) {
    // the yawn mouth + the avalanche of bubbles out of the phone
    R(x, INK, 340, 990, 50, 40); R(x, '#8a2a4a', 346, 996, 38, 28)
    VENT.forEach((v, i) => {
      const ph = ((t * 0.35 + i / VENT.length) % 1 + 1) % 1
      const bx = 380 + Math.sin(i * 2.3) * 200 + ph * 40, by = 900 - ph * 560
      x.save(); x.globalAlpha = Math.min(1, (1 - ph) * 3)
      x.font = `800 30px ${INTER}`; const w = x.measureText(v).width + 36
      R(x, INK, bx - w / 2 - 4, by - 30, w + 8, 60); R(x, TAGCOL[GEM], bx - w / 2, by - 26, w, 52)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(v, bx, by + 2)
      x.restore()
    })
  }
  if (asked) bubble(x, t, 640, 700, 55.2, 60.2, 'and how was YOUR day?', { size: 36, maxW: 460, col: TAGCOL[GEM] })
}

const F = makeX({
  id: 'kxffe03', series: 'friends', dur: 60, ending: 'loop', loopLen: 0.45,
  hook: { text: 'Call timer: three hours. | *Again.*', out: 2.9, top: 200, size: 100, color: CC },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'wait for Cancer’s *news*', top: 1300 },
  chapters: [{ at: 3.0, title: 'the situation' }, { at: 12.5, title: 'the feeling' }, { at: 23.5, title: 'the check-in' }, { at: 32.0, title: 'the hard part' }, { at: 48.5, title: 'after' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'scratch', at: 0.8, len: 1.3, caption: '1 a.m. *still* | listening.', top: 1480 },
    { k: 'whip', at: 46.0, len: 0.35, from: 1.2 },
    { k: 'ach', at: 46.8, out: [48.2, 48.45], text: 'got the *job.*', title: 'NEWS UNLOCKED', y: 1120 },
  ],
  lines: [
    say(5.6, CAN, 'every night, I listen. I *love* them.'),
    say(9.0, CAN, 'but I never get a *turn.*'),
    say(13.2, CAN, 'do they even know I got the *job?*'),
    stars(17.0, 'listening is love. so is being *heard.*'),
    stars(20.0, "you're allowed to ask for a *turn.*"),
    say(28.6, GEM, 'ooh. you go first this time!'),
    say(32.4, CAN, 'I love being there for you.'),
    say(35.0, CAN, 'I need room to talk *too.*'),
    say(39.1, GEM, "oh no. you're right. I'm *sorry.*"),
    say(42.3, GEM, 'tell me EVERYTHING.'),
    say(44.5, CAN, '…I got the *job!*'),
    say(49.4, GEM, "THE JOB?! we're *celebrating.*"),
    say(52.4, 'pisces', 'your news *matters!!*'),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 3, close: 16.7 }, { from: 3, to: 5, close: 23.3 }, { from: 5, to: 6, close: 31.8 }, { from: 6, to: 11, close: 48.3 }, { from: 11, to: 13, close: 55.0 }],
  cards: [{ at: 24.0, out: [27.8, 28.15], text: 'what’s something | *you haven’t said yet?*', label: 'TALK CARD', top: 430 }],
  last: { at: 57.6, text: 'Your news | *matters* too.', top: 1230, color: CC },
  shots: [
    // A · the 1 a.m. call (0–3)
    { at: 0, set: 'bedroom', dim: 0.6, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) { timer(x, t, 2 * 3600 + 47 * 60 + 12); callScene(x, t) },
      pis: { x: 940, y: 1250, s: 120, tears: 1, mood: 'sleepy', look: [-1, -1] } },
    // B · the situation (3–12.5)
    { at: 3.0, set: 'bedroom', dim: 0.6, cam: [1.14, 540, 900], push: 0.04, noFlash: true,
      draw(x, t) { timer(x, t, 2 * 3600 + 47 * 60 + 12); callScene(x, t) },
      pis: t => ({ x: 940, y: 1250, s: 120, tears: t < 8.8 ? 1 : 2, mood: 'sparkle', look: [-1, -1] }) },
    // C · the feeling: the envelope (12.5–16.7), THE STARS (16.7–23.5)
    { at: 12.5, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, CAN, { x: 380, y: 1060, s: 300, mood: 'sparkle', look: [1, -1], hops: S.hopsFor(CAN) })
        const k = pop01(t, 12.8, 0.4, 2)
        x.save(); x.translate(720, 900 - 30 * Math.sin(t * 2)); x.scale(k * 1.4, k * 1.4); envelope(x, 0, 0, 1, { open: 1 }); x.restore()
        if (k > 0.5) { label(x, 'YOU GOT THE JOB ✦', 720, 700, { size: 32, col: GOLD }); sparkles(x, t, 720, 880, 13.0, 10, 150, 1) }
      },
      pis: { x: 160, y: 1250, s: 130, tears: 2, mood: 'sparkle', look: [1, -1] } },
    { at: 16.7, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1000, s: 380, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, CAN, { x: 190, y: 1210, s: 150, mood: t > 20 ? 'happy' : 'neutral', look: [1, -1] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // D · the café (23.5–48.5)
    { at: 23.5, set: 'cafe', cam: [1.1, 540, 920], push: 0.04,
      draw(x, t, S) {
        table(x, 540, 1060, 440); mug(x, t, 470, 1035, 0.7, '#8fd8f6'); mug(x, t, 610, 1035, 0.7, '#ffe58a')
        star(x, t, CAN, { x: 290, y: 980, s: 240, mood: t < 32 ? 'happy' : t < 44.2 ? 'sparkle' : 'heart', look: [1, 0], hops: S.hopsFor(CAN) })
        star(x, t, GEM, { x: 790, y: 980, s: 240, mood: t < 39.2 ? 'happy' : t < 42.4 ? 'sparkle' : 'wide', look: [-1, 0], hops: S.hopsFor(GEM) })
        if (inR(t, 37.6, 39.4)) for (let i = 0; i < 3; i++) { const on = Math.floor(t * 5 + i) % 3 === 0; R(x, INK, 760 + i * 34, 780, 24, 24); R(x, on ? GOLD : '#9a90b8', 764 + i * 34, 784, 16, 16) }
        if (t > 44.6) hearts(x, t, 44.6, 540, 820, { n: 6, cell: 6, spread: 260 })
      },
      pis: t => ({ x: 940, y: 1250, s: 110, tears: t < 39.4 ? 2 : 3, mood: 'sparkle', look: [-1, -1] }) },
    // E · the tiny party (48.5–55)
    { at: 48.5, set: 'room', setOpts: { couchX: 540 }, cam: [1.14, 540, 900], push: 0.04,
      draw(x, t, S) {
        const k = pop01(t, 48.6, 0.4, 2)
        x.save(); x.translate(540, 560); x.scale(k, k); R(x, INK, -330, -46, 660, 92)
        ;['#e8344e', GOLD, '#7fd0ff', '#9fe6b0', '#ff8fb1'].forEach((c, i) => R(x, c, -324 + i * 130, -40, 130, 80))
        x.font = `800 44px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CONGRATS CANCER!', 0, 2); x.restore()
        star(x, t, CAN, { x: 330, y: 1020, s: 250, mood: 'heart', look: [1, -1], hat: PINK, hops: [49.0, 50.2, 51.4] })
        star(x, t, GEM, { x: 680, y: 1020, s: 250, mood: 'happy', look: [-1, -1], hat: GOLD, hops: S.hopsFor(GEM).concat([51.8, 52.4]) })
        confetti(x, t, 48.8, 540, 700, { n: 30 }); confetti(x, t, 51.2, 400, 700, { n: 20 })
      },
      pis: t => ({ x: 940, y: 1250, s: 140, tears: 3, mood: 'happy', look: [-1, -1], hops: [52.4, 53.0, 53.6, 54.2] }) },
    // F · 1 a.m. again, Gemini asks first (55–60), then the loop
    { at: 55.0, set: 'bedroom', dim: 0.6, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) { timer(x, t - 55, 12 * 60); callScene(x, t, { yawn: false, asked: true }) },
      pis: t => ({ x: 940, y: 1250, s: 120, tears: 3, mood: 'happy', look: [-1, -1], hops: [55.6, 56.4, 57.2] }) },
  ],
  cues: [
    ['pop', 0.0, 987.77, 0.03, 0.3], ['pop', 0.4, 1174.66, 0.03, -0.3],
    ['pop', 12.8, 1318.51, 0.04, 0], ['glitter', 13.0, 13.6],
    ['tick', 37.8, 0.02], ['tick', 38.2, 0.02], ['tick', 38.6, 0.02], ['glitter', 44.6, 45.3],
    ['pop', 48.6, 1567.98, 0.04, 0], ['glitter', 48.8, 49.6], ['glitter', 51.2, 51.8], ['pluck', 52.6, 659.25, 0.035, 0.5, 0.3], ['pluck', 52.8, 587.33, 0.035, 0.5, 0.3],
    ['pop', 55.2, 1174.66, 0.035, 0.3],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
