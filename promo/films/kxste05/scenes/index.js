// kxste05 · Single and Thriving: Extended, ep 5 · "Walking In Alone" (75 s vertical, star_advice post, dreamy · Eb)
// No end card, no card transition. Hard cut on the punchline. Engine: ../../kxmue01/scenes/m47kit.js (series 'single').
//   0.00   frame 0: ♑ Capricorn frozen in a doorway, coat half off, the party mid-cheer behind, a notification dropping
//          from the only friend it knows: "running late!! 1 hr". Slam "Party. Know *no one.* | Friend's late."
//   0.75   record scratch "the host is busy. | the friend is *late.*"   2.3 promise "wait for *the snack table*"
//   3.0    1 · ARRIVAL         by the wall; loading "looking busy on my phone…"
//  16.0    2 · THE MOMENT      a hand on the doorknob, countdown 3·2·1 LEAVE?
//  26.0    3 · THE STARS       "you don't need the *whole* room." / "ask *one* person one question."
//  35.0    4 · THE MOVE        the snack table: "which dip is the *good* one?" ♋ Cancer: "THE *ORANGE* ONE."
//  55.5    5 · THE WAY HOME    the late friend: "you're friends with *everyone* already?!" · two new numbers
//  68.6    "Capricorn: *thriving.*"   73.6 last line "One hello | *opens* the room."
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, bubble, phoneSmall, stringLights, glow,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, ORANGE, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const CAP = 'capricorn', CAN = 'cancer', TAU = 'taurus', LIB = 'libra', SAG = 'sagittarius', AQU = 'aquarius', ARI = 'aries'

function lights(x, t) { stringLights(x, t, -20, 260, 560, 300, { n: 9, sag: 50 }); stringLights(x, t, 520, 300, 1100, 260, { n: 9, sag: 50 }) }
function crowd(x, t, a = 1, cheer = 0) {
  const P = [[LIB, 560, 0], [AQU, 700, 1], [ARI, 840, 2], [TAU, 980, 3]]
  x.save(); x.globalAlpha *= a
  for (const [sg, px, i] of P) star(x, t, sg, { x: px, y: 990 + (i % 2) * 20, s: 150, mood: 'happy', look: [i % 2 ? 1 : -1, 0], hops: cheer ? [0, 0.4, 0.8, 1.2].map(v => -0.6 + v + i * 0.1) : [4 + i, 9 + i, 14 + i] })
  x.restore()
}
function doorway(x, t, cx) { R(x, INK, cx - 120, 640, 240, 540); R(x, '#fff1c8', cx - 110, 650, 220, 530); glow(x, cx, 900, 260, 0.5, '255,236,180') }
function knob(x, cx, cy) { R(x, INK, cx - 20, cy - 20, 40, 40); R(x, GOLD, cx - 14, cy - 14, 28, 28) }
function snackTable(x, t, cx, y) {
  box(x, cx - 260, y, 520, 30, '#8a5a3a', { b: 6, hi: '#a8704a' }); R(x, INK, cx - 230, y + 36, 20, 120); R(x, INK, cx + 210, y + 36, 20, 120)
  const dips = [['#ff9b4a', -150], ['#9fe6b0', 0], ['#efe6d6', 150]]
  for (const [c, dx] of dips) { x.fillStyle = INK; x.beginPath(); x.ellipse(cx + dx, y - 14, 66, 26, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.ellipse(cx + dx, y - 18, 58, 18, 0, 0, Math.PI * 2); x.fill() }
  for (let i = 0; i < 5; i++) { R(x, INK, cx - 230 + i * 20, y - 34 - (i % 2) * 8, 18, 26); R(x, '#e9b24a', cx - 228 + i * 20, y - 32 - (i % 2) * 8, 14, 22) }
}

const F = makeM47({
  id: 'kxste05', series: 'single', dur: 75, ending: 'cut',
  hook: { text: 'Party. Know *no one.* | Friend’s late.', out: 2.9, top: 200, size: 110 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'wait for *the snack table*', top: 1290 },
  chapters: [{ at: 3.0, title: 'arrival' }, { at: 16.0, title: 'the moment' }, { at: 26.0, title: 'the stars' }, { at: 35.0, title: 'the move' }, { at: 55.5, title: 'the way home' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.5 },
    { k: 'notif', at: -1, out: [2.75, 3.0], title: 'messages', body: 'running late!! *1 hr*', glyph: '♐', y: 560 },
    { k: 'scratch', at: 0.75, len: 1.35, caption: 'the host is busy. | the friend is *late.*', top: 1500 },
    { k: 'loading', at: 6.0, len: 3.4, label: 'looking busy…', error: 'Error: battery 3%', y: 520 },
    { k: 'countdown', at: 19.0, from: 3, gap: 0.6, go: 'LEAVE?', y: 760, color: '#c9a6ff' },
    { k: 'ach', at: 51.6, out: [54.2, 54.5], title: 'ACHIEVEMENT UNLOCKED', text: 'one question. *two friends.*', icon: '★', y: 1250 },
  ],
  lines: [
    say(3.4, CAP, "okay. I'll just… stand by the *wall.*"),
    say(10.0, CAP, 'everyone already knows *everyone.*'),
    say(13.0, LIB, 'SO glad you came! one *sec!*'),
    say(16.6, CAP, "maybe I'll just *go* home."),
    say(22.0, CAP, '…why is walking in alone so *hard?*'),
    stars(26.6, "you don't need the *whole* room."),
    stars(30.4, 'ask *one* person one question.'),
    say(35.8, CAP, 'okay. which dip is the *good* one?'),
    say(39.0, CAN, 'THE *ORANGE* ONE. obviously.'),
    say(42.4, CAN, "I'm Cancer. I only know the *host.*"),
    say(45.6, CAP, "same! so we're *basically* old friends."),
    say(49.0, TAU, "are we ranking dips? I'm *in.*"),
    say(56.0, SAG, "you're friends with *everyone* already?!"),
    say(59.4, CAP, 'it started with a *dip.*'),
    say(63.0, CAP, 'two new numbers. *one* good dip.'),
  ],
  boxes: [{ from: 0, to: 1, close: 9.6 }, { from: 1, to: 3, close: 15.8 }, { from: 3, to: 4, close: 18.8 }, { from: 4, to: 5, close: 25.8 }, { from: 5, to: 7, close: 34.8 }, { from: 7, to: 12, close: 55.2 }, { from: 12, to: 14, close: 62.6 }, { from: 14, to: 15, close: 68.3 }],
  meter: [[3.6, 0.15], [16.6, 0.05], [31.0, 0.3], [39.0, 0.5], [49.0, 0.7], [56.2, 0.85], [63.4, 1.0]],
  thrive: { at: 68.6, text: 'Capricorn: | *thriving.*' },
  last: { at: 73.6, text: 'One hello | *opens* the room.', top: 300 },
  beats: [52.4],
  shots: [
    // A · the doorway (0–3)
    { at: 0, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.1, 540, 900], push: 0.03,
      draw(x, t) {
        lights(x, t)
        crowd(x, t, 1, 1)
        confetti(x, t, -0.8, 760, 800)
        doorway(x, t, 260)
        star(x, t, CAP, { x: 260, y: 1010, s: 250, mood: 'wide', look: [1, 0], hops: [-0.1], blink: false })
        x.save(); x.translate(260, 1080); x.rotate(-0.4 + 0.05 * Math.sin(t * 6)); box(x, -30, -20, 210, 70, '#6a4fa8', { b: 6 }); x.restore()
      },
      pis: { x: 980, y: 1300, s: 100, tears: 2, mood: 'wide', look: [-1, -1] } },
    // B · arrival (3–16): by the wall
    { at: 3.0, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.08, 540, 920], push: 0.05,
      draw(x, t, S) {
        lights(x, t)
        crowd(x, t)
        const zip = prog(t, 12.8, 15.4)
        if (zip > 0 && zip < 1) star(x, t, LIB, { x: lerp(1100, -100, zip), y: 980, s: 180, mood: 'happy', look: [-1, 0], hops: [13.0, 13.4, 13.8, 14.2] })
        star(x, t, CAP, { x: 160, y: 1000, s: 220, mood: t < 9.8 ? 'neutral' : 'sleepy', zzz: false, look: t < 6 ? [1, 0] : [0, 1], hops: S.hopsFor(CAP) })
        if (t > 5.8 && t < 10) phoneSmall(x, t, 260, 1050, { rot: 0.2, s: 0.6 })
      },
      pis: { x: 980, y: 1300, s: 100, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // C · the moment (16–26): the doorknob
    { at: 16.0, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.2, 360, 960], push: 0.05,
      draw(x, t, S) {
        lights(x, t)
        crowd(x, t, 0.5)
        R(x, INK, 120, 660, 240, 520); box(x, 130, 670, 220, 500, '#5a3d2e', { b: 0, hi: 'rgba(255,255,255,0.1)' })
        knob(x, 320, 930)
        star(x, t, CAP, { x: 470, y: 1010, s: 230, mood: t < 21.6 ? 'squint' : 'sleepy', zzz: false, look: [-1, 0], hops: S.hopsFor(CAP), squash: inR(t, 19, 21.4) ? 0.04 * Math.sin(t * 20) : 0 })
      },
      pis: t => ({ x: 900, y: 1300, s: 100, tears: 2, mood: 'sparkle', look: [-1, -1] }) },
    // D · THE STARS (26–35)
    { at: 26.0, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 30 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, CAP, { x: 190, y: 1210, s: 150, mood: t > 31 ? 'sparkle' : 'neutral', look: [1, -1], hops: [31.2] })
        const k = pop01(t, 31.0, 0.3, 2) * outK(t, [34.4, 34.8])
        if (k > 0.01) { label(x, '1 person', 860, 1120, { size: 34, col: GOLD, font: INTER, weight: 800, alpha: k }); label(x, '1 question', 860, 1170, { size: 34, col: ORANGE, font: INTER, weight: 800, alpha: k }) }
      },
      pis: { x: 900, y: 1330, s: 90, tears: 1, mood: 'sparkle', look: [-1, -1], tissue: false } },
    // E · the move (35–55.5): the snack table
    { at: 35.0, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.1, 540, 930], push: 0.05,
      draw(x, t, S) {
        lights(x, t)
        star(x, t, CAP, { x: 260, y: 960, s: 220, mood: t < 38.8 ? 'neutral' : 'happy', look: [1, 0], hops: S.hopsFor(CAP) })
        star(x, t, CAN, { x: 600, y: 960, s: 210, mood: t < 39 ? 'neutral' : 'sparkle', look: [-1, 0], hops: S.hopsFor(CAN) })
        const tk = ease.outCubic(prog(t, 48.4, 49.2))
        star(x, t, TAU, { x: lerp(1150, 860, tk), y: 970, s: 200, mood: 'happy', look: [-1, 0], hops: S.hopsFor(TAU) })
        snackTable(x, t, 540, 1110)
        if (inR(t, 39.0, 41.6)) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.arc(390, 1092, 80, 0, Math.PI * 2); x.stroke(); x.restore() }
        if (inR(t, 52.4, 55.0)) { label(x, 'HA!', 260, 760, { size: 56, col: GOLD, font: INTER, weight: 800, rot: -0.15 }); label(x, 'ha ha', 600, 780, { size: 34, col: BONE }) }
      },
      pis: t => ({ x: 980, y: 1300, s: 100, tears: t < 50 ? 2 : 3, mood: 'happy', look: [-1, -1] }) },
    // F · the late friend (55.5–62)
    { at: 55.5, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.08, 540, 920], push: 0.05,
      draw(x, t, S) {
        lights(x, t)
        doorway(x, t, 900)
        star(x, t, SAG, { x: 900, y: 1000, s: 200, mood: 'wide', look: [-1, 0], hops: S.hopsFor(SAG) })
        star(x, t, CAN, { x: 200, y: 990, s: 170, mood: 'happy', look: [1, 0], hops: [56.6, 59.8] })
        star(x, t, TAU, { x: 330, y: 1000, s: 170, mood: 'happy', look: [1, 0], hops: [56.8, 60.0] })
        star(x, t, CAP, { x: 540, y: 980, s: 220, mood: 'happy', look: [1, 0], hops: S.hopsFor(CAP) })
      },
      pis: { x: 980, y: 1300, s: 100, tears: 3, mood: 'happy', look: [-1, -1] } },
    // G · the way home (62–75)
    { at: 62.0, set: 'street', cam: [1.1, 540, 920], push: 0.05,
      draw(x, t, S) {
        const px = lerp(320, 440, prog(t, 62, 75))
        star(x, t, CAP, { x: px, y: 1040, s: 250, mood: 'happy', look: [1, 0.3], hops: [...S.hopsFor(CAP), 68.9, 69.3, 74.0] })
        phoneSmall(x, t, px + 140, 1060, { rot: 0.2, s: 0.6, text: '+2|new' })
        sparkles(x, t, 440, 1000, 68.9, 12, 260, 1, [ORANGE, GOLD, BONE])
      },
      pis: t => ({ x: 900, y: 1300, s: 110, tears: 3, mood: 'happy', look: [-1, -1], hops: [69.0, 74.0] }) },
  ],
  cues: [
    ['glitter', 0.0, 0.5], ['pop', 0.2, 880, 0.03, 0.3], ['pop', 0.4, 987.77, 0.03, -0.3],
    ['whoosh', 12.8, 2.6, 0.03],
    ['tick', 16.4, 0.05],
    ['bell', 39.0, 1760, 0.03, 0.8, 0.3], ['glitter', 39.0, 39.5],
    ['whoosh', 48.4, 0.6, 0.03], ['pop', 52.4, 1318.51, 0.035, 0], ['pop', 52.6, 1174.66, 0.03, 0.3],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
