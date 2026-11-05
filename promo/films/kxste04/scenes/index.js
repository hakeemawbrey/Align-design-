// kxste04 · Single and Thriving: Extended, ep 4 · "Couples' Game Night" (75 s vertical, star_advice post, chiptune · C)
// No end card, no card transition. Hard cut on the punchline. Engine: ../../kxmue01/scenes/m47kit.js (series 'single').
//   0.00   frame 0: ♌ Leo mid-slam on a quiz buzzer, the scoreboard TEAM LOVEBIRDS · TEAM HONEY · TEAM LEO, popcorn
//          mid-air. Slam "Couples' game night. | *Team of one.*"  0.7 record scratch + caught on TEAM LEO.
//   2.3    promise "wait for *the final round*"
//   3.0    1 · ARRIVAL         ♍ Virgo hosts; every team is a couple; "+0" on Leo's name card
//  15.0    2 · THE MOMENT      "How well do you know *your partner?*" → glitch "LEO.EXE: no partner found"
//  28.0    3 · THE STARS       "you know *someone* really well." / "play as *you.* and ask who's free."
//  37.0    4 · THE MOVE        "can my team be me + your *grandma?*" ♑ Gran joins; trivia HUD; achievement
//  55.5    5 · THE FINAL       the lovebirds win by one; Leo cheers loudest; the walk home: "rematch?"
//  68.6    "Leo: *thriving.*"   73.6 last line "Team of one. | *Still* won."
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, bubble, phoneSmall, couch,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, ORANGE, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const LEO = 'leo', VIR = 'virgo', GRAN = 'capricorn', LIB = 'libra', TAU = 'taurus', AQU = 'aquarius', SAG = 'sagittarius'

function board(x, t, cx, cy, rows, { k = 1, hi = -1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -330, -40, 660, 60 + rows.length * 64, '#1d2a3a', { b: 7 })
  x.font = `800 28px ${INTER}`; x.textBaseline = 'middle'
  x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('★ SCOREBOARD ★', 0, -10)
  rows.forEach(([name, sc], j) => {
    const y = 44 + j * 64
    R(x, j === hi ? 'rgba(242,199,92,0.3)' : 'rgba(255,255,255,0.06)', -310, y - 26, 620, 54)
    x.textAlign = 'left'; x.fillStyle = j === hi ? GOLD : BONE; x.fillText(name, -290, y)
    x.textAlign = 'right'; x.font = `700 32px ${MONO}`; x.fillText(String(sc), 290, y); x.font = `800 28px ${INTER}`
  })
  x.restore()
}
function buzzer(x, t, cx, cy, press = 0) {
  box(x, cx - 70, cy, 140, 50, '#4a4466', { b: 6 })
  box(x, cx - 46, cy - 30 + press * 18, 92, 34, RED, { b: 6, hi: '#ff7a8a' })
}
function popcorn(x, t, cx, cy, p) {
  for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + (i - 6) * 0.25, r = 40 + p * 320; R(x, INK, cx + Math.cos(a) * r - 12, cy + Math.sin(a) * r * 0.9 + 200 * p * p - 12, 24, 24); R(x, '#fff1c8', cx + Math.cos(a) * r - 9, cy + Math.sin(a) * r * 0.9 + 200 * p * p - 9, 18, 18) }
}
const ROWS0 = [['TEAM LOVEBIRDS', 0], ['TEAM HONEY', 0], ['TEAM … LEO', 0]]

const F = makeM47({
  id: 'kxste04', series: 'single', dur: 75, ending: 'cut',
  hook: { text: 'Couples’ game night. | *Team of one.*', out: 2.9, top: 200, size: 106 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'wait for *the final round*', top: 1290 },
  chapters: [{ at: 3.0, title: 'arrival' }, { at: 15.0, title: 'the moment' }, { at: 28.0, title: 'the stars' }, { at: 37.0, title: 'the move' }, { at: 55.5, title: 'the final' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.55 },
    { k: 'scratch', at: 0.7, len: 1.4, caption: 'every team: two people. | *mine:* me.', top: 1500 },
    { k: 'caught', at: 0.8, x: 540, y: 732, r: 330, ry: 46, out: [2.2, 2.35], label: 'TEAM OF ONE', arrow: 'br' },
    { k: 'glitch', at: 23.2, len: 1.8, text: 'LEO.EXE: no partner found', buttons: ['OK', 'OK'] },
    { k: 'hud', at: 44.0, out: [52.3, 52.6], title: 'TRIVIA · GRAN-LEO', splits: [{ at: 45.4, name: 'Q1 ✓' }, { at: 47.0, name: 'Q2 ✓' }, { at: 48.8, name: 'Q3 ✓' }] },
    { k: 'ach', at: 52.8, out: [55.2, 55.45], title: 'ACHIEVEMENT UNLOCKED', text: 'team *Gran-Leo*: 3 rounds', icon: '★', y: 1250 },
    { k: 'notif', at: 64.4, out: [67.6, 67.9], title: 'messages', body: 'gran: “*bring snacks.*”', glyph: '♑', y: 120 },
  ],
  lines: [
    say(3.4, VIR, "welcome to COUPLES' *game night!*"),
    say(6.6, LEO, '…oh. *couples.* cool cool cool.'),
    say(9.6, VIR, 'you can be… team *Leo!*'),
    say(12.2, LEO, 'team Leo has a *great* captain.'),
    say(20.0, LEO, 'my partner is… my *houseplant?*'),
    say(25.4, LEO, "maybe I'll just *keep score.*"),
    stars(28.6, 'you know *someone* really well.'),
    stars(32.4, "play as *you.* and ask who's free."),
    say(37.6, LEO, 'can my team be me + your *grandma?*'),
    say(41.0, GRAN, "I've been waiting all night, *dear.*"),
    say(49.4, GRAN, 'the answer is *1974.* trust me.'),
    say(57.8, LEO, 'LOVEBIRDS WIN! that is *amazing!*'),
    say(61.6, LEO, "texting Gran: '*rematch?*'"),
  ],
  boxes: [{ from: 0, to: 4, close: 14.8 }, { from: 4, to: 5, close: 23.0 }, { from: 5, to: 6, close: 27.8 }, { from: 6, to: 8, close: 36.8 }, { from: 8, to: 10, close: 44.6 }, { from: 10, to: 11, close: 52.6 }, { from: 11, to: 12, close: 61.2 }, { from: 12, to: 13, close: 66.0 }],
  cards: [{ at: 15.4, out: [19.4, 19.8], label: 'ROUND 2', text: 'How well do you know | *your partner?*', top: 470, size: 64 }],
  meter: [[3.6, 0.35], [9.6, 0.2], [23.2, 0.05], [33.0, 0.35], [41.0, 0.55], [52.8, 0.8], [58.0, 0.9], [64.6, 1.0]],
  thrive: { at: 68.6, text: 'Leo: | *thriving.*' },
  last: { at: 73.6, text: 'Team of one. | *Still* won.', top: 300 },
  beats: [57.4],
  shots: [
    // A · the buzzer slam (0–3)
    { at: 0, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.1, 540, 900], push: 0.03,
      draw(x, t) {
        board(x, t, 540, 560, ROWS0, { hi: 2 })
        buzzer(x, t, 540, 1110, 1)
        star(x, t, LEO, { x: 540, y: 980, s: 260, mood: 'wide', look: [0, 1], hops: [-0.12], squash: 0.1 })
        popcorn(x, t, 540, 1000, prog(t, -0.8, 2.6))
        star(x, t, LIB, { x: 140, y: 1040, s: 150, mood: 'happy', look: [1, 0] }); star(x, t, TAU, { x: 260, y: 1050, s: 150, mood: 'happy', look: [1, 0] })
        star(x, t, AQU, { x: 820, y: 1050, s: 150, mood: 'happy', look: [-1, 0] }); star(x, t, SAG, { x: 940, y: 1040, s: 150, mood: 'happy', look: [-1, 0] })
      },
      pis: { x: 980, y: 1300, s: 100, tears: 2, mood: 'wide', look: [-1, -1] } },
    // B · arrival (3–15)
    { at: 3.0, set: 'room', setOpts: { couchX: 540, couchW: 760 }, cam: [1.06, 540, 900], push: 0.05,
      draw(x, t, S) {
        board(x, t, 540, 480, ROWS0, { k: 0.85, hi: t > 9.6 ? 2 : -1 })
        star(x, t, LIB, { x: 200, y: 990, s: 160, mood: 'happy', look: [1, 0], hops: [4.2, 7.8] }); star(x, t, TAU, { x: 330, y: 990, s: 160, mood: 'happy', look: [-1, 0], hops: [4.4] })
        hearts(x, t, 4.0, 265, 860, { n: 3, cell: 4, spread: 100 })
        star(x, t, AQU, { x: 750, y: 990, s: 160, mood: 'happy', look: [1, 0], hops: [5.0] }); star(x, t, SAG, { x: 880, y: 990, s: 160, mood: 'happy', look: [-1, 0], hops: [5.2, 8.0] })
        hearts(x, t, 5.0, 815, 860, { n: 3, cell: 4, spread: 100 })
        star(x, t, VIR, { x: 540, y: 1150, s: 180, mood: 'sparkle', look: [0, -1], hops: S.hopsFor(VIR) })
        const lk = t < 6.4 ? 'sparkle' : t < 12 ? 'squint' : 'happy'
        star(x, t, LEO, { x: 540, y: 960, s: 200, mood: lk, look: [0, 0.5], hops: S.hopsFor(LEO) })
        if (t > 10) { x.save(); x.translate(640, 1040); x.rotate(0.1); box(x, -50, -26, 100, 52, BONE, { b: 5 }); x.font = `800 28px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+0', 0, 2); x.restore() }
      },
      pis: { x: 980, y: 1300, s: 100, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // C · the moment (15–28)
    { at: 15.0, set: 'room', setOpts: { couchX: 540, couchW: 760 }, cam: [1.12, 540, 940], push: 0.05,
      draw(x, t, S) {
        star(x, t, LIB, { x: 180, y: 1000, s: 150, mood: 'happy', look: [1, 0], hops: [20.4, 21.2] }); star(x, t, TAU, { x: 300, y: 1000, s: 150, mood: 'happy', look: [-1, 0], hops: [20.6] })
        star(x, t, AQU, { x: 780, y: 1000, s: 150, mood: 'happy', look: [1, 0], hops: [21.0] }); star(x, t, SAG, { x: 900, y: 1000, s: 150, mood: 'happy', look: [-1, 0], hops: [21.4] })
        star(x, t, LEO, { x: 540, y: 980, s: 220, mood: t < 20 ? 'neutral' : t < 25 ? 'wide' : 'sleepy', zzz: false, look: [0, 1], hops: S.hopsFor(LEO) })
        if (t > 20.4 && t < 23) { box(x, 600, 1060, 60, 50, '#c0577a', { b: 4 }); R(x, '#3fb08a', 616, 1010, 28, 50) }
      },
      pis: t => ({ x: 980, y: 1300, s: 100, tears: 2, mood: 'sparkle', look: [-1, -1] }) },
    // D · THE STARS (28–37)
    { at: 28.0, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 32 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, LEO, { x: 190, y: 1210, s: 150, mood: t > 33 ? 'sparkle' : 'neutral', look: [1, -1], hops: [33.2] })
        const k = pop01(t, 33.0, 0.3, 2) * outK(t, [36.4, 36.8])
        if (k > 0.01) star(x, t, GRAN, { x: 860, y: 1200, s: 120 * k, mood: 'happy', look: [-1, -1], hops: [33.4] })
      },
      pis: { x: 680, y: 1330, s: 80, tears: 1, mood: 'sparkle', look: [1, -1], tissue: false } },
    // E · the move (37–55.5): Team Gran-Leo
    { at: 37.0, set: 'room', setOpts: { couchX: 540, couchW: 760 }, cam: [1.1, 540, 930], push: 0.05,
      draw(x, t, S) {
        const walk = ease.inOutCubic(prog(t, 39.4, 40.6))
        star(x, t, VIR, { x: 840, y: 1000, s: 170, mood: 'happy', look: [-1, 0], hops: [38.8] })
        star(x, t, GRAN, { x: lerp(1100, 680, walk), y: 1010, s: 180, mood: 'happy', look: [-1, 0], hops: [...S.hopsFor(GRAN), 45.6, 47.2, 49.0] })
        star(x, t, LEO, { x: 420, y: 990, s: 230, mood: t < 41 ? 'sparkle' : 'happy', look: [1, 0], hops: [...S.hopsFor(LEO), 45.5, 47.1, 48.9] })
        buzzer(x, t, 540, 1150, [45.4, 47.0, 48.8].some(a => t >= a && t < a + 0.25) ? 1 : 0)
      },
      pis: t => ({ x: 140, y: 1300, s: 100, tears: t < 45 ? 2 : 3, mood: 'happy', look: [1, -1] }) },
    // F · the final (55.5–61.2)
    { at: 55.5, set: 'room', setOpts: { couchX: 540, couchW: 760 }, cam: [1.06, 540, 900], push: 0.05,
      draw(x, t, S) {
        board(x, t, 540, 470, [['TEAM LOVEBIRDS', t > 57.4 ? 12 : 11], ['TEAM HONEY', 9], ['TEAM GRAN-LEO', 11]], { k: 0.9, hi: t > 57.4 ? 0 : 2 })
        star(x, t, LIB, { x: 180, y: 1000, s: 160, mood: 'happy', look: [1, 0], hops: [57.5, 57.9, 58.3] }); star(x, t, TAU, { x: 310, y: 1000, s: 160, mood: 'happy', look: [-1, 0], hops: [57.6, 58.0] })
        star(x, t, LEO, { x: 560, y: 980, s: 220, mood: 'happy', look: [-1, 0], hops: [...S.hopsFor(LEO), 57.6, 58.0, 58.4, 58.8, 59.2, 59.6] })
        star(x, t, GRAN, { x: 770, y: 1000, s: 170, mood: 'happy', look: [-1, 0], hops: [57.7, 58.5] })
        confetti(x, t, 57.4, 260, 800)
      },
      pis: { x: 980, y: 1300, s: 100, tears: 3, mood: 'happy', look: [-1, -1], hops: [57.6, 58.4] } },
    // G · the walk home (61.2–75)
    { at: 61.2, set: 'street', cam: [1.1, 540, 920], push: 0.05,
      draw(x, t, S) {
        star(x, t, LEO, { x: lerp(320, 440, prog(t, 61.2, 75)), y: 1040, s: 250, mood: t < 64.4 ? 'neutral' : 'happy', look: [1, 0.3], hops: [...S.hopsFor(LEO), 64.6, 68.9, 69.3, 74.0] })
        phoneSmall(x, t, lerp(320, 440, prog(t, 61.2, 75)) + 130, 1060, { rot: 0.2, s: 0.6, buzz: inR(t, 64.4, 65.2) ? 1 : 0 })
        sparkles(x, t, 440, 1000, 68.9, 12, 260, 1, [ORANGE, GOLD, BONE])
      },
      pis: t => ({ x: 900, y: 1300, s: 110, tears: 3, mood: 'happy', look: [-1, -1], hops: [69.0, 74.0] }) },
  ],
  cues: [
    ['pop', 0.0, 196, 0.05, 0], ['tick', 0.02, 0.08], ['whoosh', 0.1, 0.5, 0.04],
    ['pop', 10.2, 880, 0.03, 0.3],
    ['pop', 40.6, 987.77, 0.035, 0.3],
    ['pop', 45.4, 196, 0.04, 0], ['pop', 47.0, 196, 0.04, 0], ['pop', 48.8, 196, 0.04, 0],
    ['pop', 57.4, 1318.51, 0.04, 0], ['glitter', 57.4, 58.0], ['bell', 57.45, 2093, 0.03, 1.0, 0],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
