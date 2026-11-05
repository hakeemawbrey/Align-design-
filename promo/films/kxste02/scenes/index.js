// kxste02 · Single and Thriving: Extended, ep 2 · "The Ex Brought Someone" (75 s vertical, star_advice post, synthwave · F#m)
// No end card, no card transition. Hard cut on the punchline. Engine: ../../kxmue01/scenes/m47kit.js (series 'single').
//   0.00   frame 0: ♈ Aries mid-spill of a cocoa mug, the party door swinging open, a spotlight on the ex (♌ Leo) arriving
//          arm-in-arm with someone new (♋ Cancer). Slam "My ex. *With* someone. | At this party."  0.7 scratch + caught.
//   2.3    promise "wait for *the hello*"
//   3.0    1 · ARRIVAL         twenty minutes earlier: Aries owning the dance floor, a cookie in each hand
//  14.5    2 · THE MOMENT      behind the plant; loading "being totally fine…"; the 2 AM-scroll glitch
//  27.0    3 · THE STARS       "missing them is allowed. *spiralling* isn't required." / "say hi, keep it short…"
//  36.5    4 · THE MOVE        countdown → "hey! good to see you." — ten seconds, done; achievement
//  53.0    5 · THE WAY HOME    the dance floor with friends; the walk home, phone in the pocket
//  68.6    "Aries: *thriving.*"   73.6 last line "Say hi. | *Then* go dance."
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, bubble, mug, glow, drawSet,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, ORANGE, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const ARI = 'aries', EX = 'leo', NEW = 'cancer', TAU = 'taurus', GEM = 'gemini'

function door(x, t, cx, open) {
  R(x, INK, cx - 100, 700, 200, 480); R(x, '#fff1c8', cx - 92, 708, 184, 464)
  box(x, cx - 92, 708, lerp(184, 26, ease.inOutCubic(open)), 464, '#5a3d7a', { b: 0, hi: 'rgba(255,255,255,0.12)' })
}
function spot(x, t, cx, a = 1) {
  x.save(); x.globalAlpha = 0.25 * a; x.fillStyle = '#fff1c8'
  x.beginPath(); x.moveTo(cx - 30, 0); x.lineTo(cx + 30, 0); x.lineTo(cx + 230, 1180); x.lineTo(cx - 230, 1180); x.closePath(); x.fill(); x.restore()
}
function plant(x, t, cx, by, s = 1) {
  x.save(); x.translate(cx, by); x.scale(s, s)
  box(x, -70, -100, 140, 100, '#c0577a', { b: 6 })
  for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * 0.32 + 0.04 * Math.sin(t * 2 + i); x.save(); x.translate(0, -100); x.rotate(a + Math.PI / 2); R(x, INK, -22, -300, 44, 300); R(x, i % 2 ? '#3fb08a' : '#2f8a5a', -16, -294, 32, 290); x.restore() }
  x.restore()
}
function cookie(x, cx, cy) { R(x, INK, cx - 20, cy - 20, 40, 40); R(x, '#c9823e', cx - 16, cy - 16, 32, 32); R(x, '#5a3020', cx - 8, cy - 6, 6, 6); R(x, '#5a3020', cx + 4, cy + 4, 6, 6) }
function disco(x, t, a = 1) {
  for (let i = 0; i < 7; i++) { const cx = 540 + Math.sin(t * 1.3 + i * 0.9) * 420, cy = 600 + Math.cos(t * 1.1 + i * 1.7) * 260; x.save(); x.globalAlpha = 0.25 * a; x.fillStyle = ['#ff8fb1', '#7fe0ff', '#f2c75c', '#c9a6ff'][i % 4]; x.fillRect(cx - 40, cy - 40, 80, 80); x.restore() }
}
function couplePair(x, t, cx, y, s, o = {}) {
  star(x, t, EX, { x: cx - s * 0.36, y, s, mood: 'happy', look: [1, 0], ...o })
  star(x, t, NEW, { x: cx + s * 0.36, y, s, mood: 'happy', look: [-1, 0], ...o })
  hearts(x, t, (o.ht ?? -9), cx, y - s * 0.6, { n: 3, cell: 4, spread: 80 })
}

const F = makeM47({
  id: 'kxste02', series: 'single', dur: 75, ending: 'cut',
  hook: { text: 'My ex. *With* someone. | At this party.', out: 2.9, top: 200, size: 108 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'wait for *the hello*', top: 1290 },
  chapters: [{ at: 3.0, title: 'arrival' }, { at: 14.5, title: 'the moment' }, { at: 27.0, title: 'the stars' }, { at: 36.5, title: 'the move' }, { at: 53.0, title: 'the way home' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.6, cx: 820, cy: 900 },
    { k: 'scratch', at: 0.7, len: 1.4, caption: 'great night. | *was.*', top: 1500 },
    { k: 'caught', at: 0.8, x: 820, y: 960, r: 170, out: [2.2, 2.35], label: 'THE EX (+1)', arrow: 'tl' },
    { k: 'whip', at: 13.0, len: 0.45, from: 1.4, cx: 820, cy: 900 },
    { k: 'loading', at: 17.6, len: 3.2, label: 'being totally fine…', error: 'Error: not fine', y: 520 },
    { k: 'glitch', at: 24.6, len: 1.6, text: 'open their profile at 2 AM?', buttons: ['NO', 'NO'] },
    { k: 'countdown', at: 38.6, from: 3, gap: 0.45, go: 'HI!', y: 760 },
    { k: 'ach', at: 49.4, out: [52.0, 52.3], title: 'ACHIEVEMENT UNLOCKED', text: 'said hi. *kept it short.*', icon: '★', y: 1250 },
    { k: 'notif', at: 62.6, out: [65.6, 65.9], title: 'photos', body: 'new photo from *the ex*', glyph: '♌', y: 120 },
  ],
  lines: [
    say(3.6, ARI, 'best party of the *year!*'),
    say(6.6, TAU, 'your dance moves are *unreal.*'),
    say(9.4, ARI, 'I KNOW. watch *this.*'),
    say(14.75, ARI, 'nope. I live behind this plant *now.*'),
    say(21.2, ARI, "I miss them. and I *don't* want them back."),
    stars(27.6, "missing them is allowed. *spiralling* isn't required."),
    stars(31.6, 'say hi, keep it short, go back to *your* night.'),
    say(40.6, ARI, 'hey! good to see you. happy *holidays.*'),
    say(43.8, EX, 'you too! you look *great.*'),
    say(46.6, ARI, 'thanks! have a good *night.*'),
    say(53.6, TAU, 'you okay?'),
    say(55.8, ARI, 'a little sad. *mostly* proud.'),
    say(59.2, TAU, 'then *DANCE.*'),
    say(64.0, ARI, 'not tonight. tonight was *mine.*'),
  ],
  boxes: [{ from: 0, to: 3, close: 12.4 }, { from: 3, to: 4, close: 17.55 }, { from: 4, to: 5, close: 24.4 }, { from: 5, to: 7, close: 36.2 }, { from: 7, to: 10, close: 49.2 }, { from: 10, to: 13, close: 61.2 }, { from: 13, to: 14, close: 68.3 }],
  meter: [[3.8, 0.3], [13.2, 0.1], [32.6, 0.35], [49.4, 0.7], [59.6, 0.85], [65.2, 1.0]],
  thrive: { at: 68.6, text: 'Aries: | *thriving.*' },
  last: { at: 73.6, text: 'Say hi. | *Then* go dance.', top: 300 },
  shots: [
    // A · the door (0–3)
    { at: 0, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.1, 540, 900], push: 0.03,
      draw(x, t) {
        disco(x, t, 0.6)
        door(x, t, 820, 1)
        spot(x, t, 820)
        couplePair(x, t, 820, 1000, 170, { hops: [-0.1] })
        const p = prog(t, -0.5, 2.6)
        star(x, t, ARI, { x: 280, y: 1010, s: 250, mood: 'wide', look: [1, 0], hops: [-0.15], squash: 0.06 * Math.sin(t * 26) })
        mug(x, t, 410, 1000, 1.1, '#e86a5a', false)
        for (let i = 0; i < 8; i++) { const a = -1.8 + i * 0.3, r = 20 + p * 180; R(x, '#8a4f2a', 430 + Math.cos(a) * r - 8, 950 + Math.sin(a) * r - 60 * Math.sin(Math.PI * p) - 8, 16, 16) }
      },
      pis: { x: 120, y: 1300, s: 100, tears: 2, mood: 'wide', look: [1, -1] } },
    // B · arrival, twenty minutes earlier (3–13)
    { at: 3.0, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.06, 540, 900], push: 0.05,
      draw(x, t, S) {
        disco(x, t)
        door(x, t, 820, 0)
        label(x, '20 MINUTES EARLIER', 540, 400, { size: 30, col: ORANGE, alpha: outK(t, [6.0, 6.4]) })
        const spin = inR(t, 10.4, 11.6) ? (t - 10.4) * 6 : 0
        x.save(); x.translate(380, 1000); x.rotate(spin); x.translate(-380, -1000)
        star(x, t, ARI, { x: 380, y: 1000, s: 250, mood: 'happy', look: [1, -0.5], hops: [...S.hopsFor(ARI), 4.5, 5.0, 5.5, 7.5, 8.0, 8.5, 12.0] })
        x.restore()
        cookie(x, 230, 1030); cookie(x, 530, 1030)
        star(x, t, TAU, { x: 760, y: 1010, s: 190, mood: 'happy', look: [-1, 0], hops: [...S.hopsFor(TAU), 5.2, 8.2] })
        star(x, t, GEM, { x: 920, y: 1030, s: 170, mood: 'sparkle', look: [-1, 0], hops: [4.8, 7.8, 10.8] })
      },
      pis: { x: 120, y: 1300, s: 100, tears: 1, mood: 'happy', look: [1, -1] } },
    // C · the door again (13–14.5)
    { at: 13.0, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.1, 540, 900], push: 0.03, noFlash: true,
      draw(x, t) { disco(x, t, 0.5); door(x, t, 820, prog(t, 13.0, 13.4)); spot(x, t, 820); couplePair(x, t, 820, 1000, 170, { ht: 13.4 }); star(x, t, ARI, { x: 280, y: 1010, s: 250, mood: 'wide', look: [1, 0], hops: [13.1] }) },
      pis: { x: 120, y: 1300, s: 100, tears: 2, mood: 'wide', look: [1, -1] } },
    // D · the moment (14.5–27): behind the plant
    { at: 14.5, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.14, 540, 940], push: 0.05,
      draw(x, t, S) {
        disco(x, t, 0.3)
        couplePair(x, t, 860, 1020, 130)
        const peek = 0.5 + 0.5 * Math.sin(t * 1.4)
        star(x, t, ARI, { x: 230 + 50 * peek, y: 1010, s: 230, mood: t < 21 ? 'wide' : 'sleepy', zzz: false, look: [1, 0], hops: S.hopsFor(ARI) })
        plant(x, t, 450, 1200, 1.0)
      },
      pis: t => ({ x: 120, y: 1300, s: 100, tears: 2, mood: 'sparkle', look: [1, -1] }) },
    // E · THE STARS (27–36.5)
    { at: 27.0, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 31.4 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, ARI, { x: 190, y: 1210, s: 150, mood: t > 32 ? 'sparkle' : 'neutral', look: [1, -1], hops: [32.4] })
        const k = pop01(t, 32.2, 0.3, 2) * outK(t, [35.8, 36.2])
        if (k > 0.01) ['HI.', 'SHORT.', 'BACK TO YOU.'].forEach((s2, i) => label(x, s2, 840, 1060 + i * 56, { size: 34, col: [GOLD, BONE, ORANGE][i], font: INTER, weight: 800, alpha: clamp(k * 3 - i) }))
      },
      pis: { x: 900, y: 1330, s: 90, tears: 2, mood: 'sparkle', look: [-1, -1], tissue: false } },
    // F · the move (36.5–53)
    { at: 36.5, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.12, 540, 930], push: 0.05,
      draw(x, t, S) {
        disco(x, t, 0.5)
        const go = ease.inOutCubic(prog(t, 36.8, 38.4)), back = ease.inOutCubic(prog(t, 49.6, 51.2))
        couplePair(x, t, 760, 1010, 180, { hops: S.hopsFor(EX) })
        star(x, t, ARI, { x: lerp(lerp(160, 470, go), 140, back), y: 1010, s: 220, mood: t < 40.4 ? 'squint' : 'happy', look: back > 0.1 ? [-1, 0] : [1, 0], hops: [37.0, 37.4, 37.8, ...S.hopsFor(ARI), 49.8, 50.2, 50.6] })
        if (t > 40.6 && t < 49.4) label(x, `${Math.min(10, Math.floor(t - 40.6))} s`, 470, 760, { size: 30, col: MINT })
      },
      pis: t => ({ x: 120, y: 1300, s: 100, tears: t < 49 ? 2 : 3, mood: 'sparkle', look: [1, -1] }) },
    // G · the dance floor (53–61.5)
    { at: 53.0, set: 'room', setOpts: { couch: false, lamp: false }, cam: [1.08, 540, 920], push: 0.05,
      draw(x, t, S) {
        disco(x, t, 1)
        const beat = [59.6, 60.0, 60.4, 60.8, 61.2]
        star(x, t, TAU, { x: 260, y: 1010, s: 200, mood: 'happy', look: [1, 0], hops: [...S.hopsFor(TAU), ...beat] })
        star(x, t, ARI, { x: 540, y: 1000, s: 240, mood: t < 55.6 ? 'neutral' : 'happy', look: [-1, 0], hops: [...S.hopsFor(ARI), ...beat.map(b => b + 0.2)] })
        star(x, t, GEM, { x: 820, y: 1010, s: 200, mood: 'happy', look: [-1, 0], hops: beat.map(b => b + 0.1) })
        if (t > 59.6) confetti(x, t, 59.6, 540, 800)
      },
      pis: { x: 980, y: 1300, s: 100, tears: 3, mood: 'happy', look: [-1, -1], hops: [59.8, 60.6] } },
    // H · the walk home (61.5–75)
    { at: 61.5, set: 'street', cam: [1.1, 540, 920], push: 0.05,
      draw(x, t, S) {
        const pocket = ease.inOutCubic(prog(t, 64.0, 64.6))
        star(x, t, ARI, { x: lerp(300, 420, prog(t, 61.5, 75)), y: 1040, s: 240, mood: t < 63 ? 'happy' : t < 66 ? 'neutral' : 'happy', look: [1, -0.3], hops: [...S.hopsFor(ARI), 68.9, 69.3, 74.0] })
        if (pocket < 1) { x.save(); x.globalAlpha = 1 - pocket; R(x, INK, 540, 980 + 60 * pocket, 50, 84); R(x, '#2c3f78', 546, 986 + 60 * pocket, 38, 72); x.restore() }
        sparkles(x, t, 420, 1000, 68.9, 12, 260, 1, [ORANGE, GOLD, BONE])
      },
      pis: t => ({ x: 900, y: 1300, s: 110, tears: 3, mood: 'happy', look: [-1, -1], hops: [69.0, 74.0] }) },
  ],
  overlay(x, t) {
    if (inR(t, 65.8, 68.4)) bubble(x, t, 820, 1150, 66.0, 68.2, 'crying for BOTH of us', { size: 28, col: '#cfe4ff' })
  },
  cues: [
    ['whoosh', 0.05, 0.5, 0.04], ['pop', 0.4, 330, 0.03, 0],
    ['pop', 4.5, 880, 0.02, -0.2], ['pop', 5.0, 987.77, 0.02, 0.2], ['pop', 7.5, 880, 0.02, -0.2], ['pop', 8.0, 987.77, 0.02, 0.2], ['whoosh', 10.4, 1.0, 0.03],
    ['whoosh', 37.0, 0.6, 0.02], ['whoosh', 49.6, 0.6, 0.02],
    ['pop', 59.6, 1174.66, 0.04, 0], ['glitter', 59.6, 60.2], ['whoosh', 64.0, 0.4, 0.03],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
