// kxste01 · Single and Thriving: Extended, ep 1 · "Hosting Solo, Full House" (75 s vertical, star_advice post, jazzy · F)
// No end card, no card transition. Hard cut on the punchline. Engine: ../../kxmue01/scenes/m47kit.js (series 'single').
//   0.00   frame 0: ♎ Libra mid-leap catching a roast chicken flying off a tray, the doorbell mid-ring, plates wobbling.
//          Slam "Hosting dinner. *Alone.* | Doorbell's ringing."  0.7 record scratch + caught circle on the chicken.
//   2.3    promise "wait for *the toast*"
//   3.0    1 · ARRIVAL         friends pour in: Taurus (three loaves), Sagittarius (a board game), Aquarius (flowers)
//  15.5    2 · THE MOMENT      "who helps you host all *this?*" / "just me." — the gravy boils over, loading bar
//  29.0    3 · THE STARS       "a home for one can still be *full.*" / "let them *help.*"
//  38.5    4 · THE MOVE        job cards; a little burnt chicken; "best burnt chicken I've *ever* had."
//  56.0    5 · THE TOAST       "to Libra, who makes everyone feel at *home.*" → washing-up → Libra alone, happy
//  68.6    "Libra: *thriving.*"   73.6 last line "Hosted by one. | *Loved* by all."
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, bubble, mug, dinnerTable, stringLights, glow,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, ORANGE, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const LIB = 'libra', TAU = 'taurus', SAG = 'sagittarius', AQU = 'aquarius', CAN = 'cancer', CAP = 'capricorn'

function chicken(x, t, cx, cy, { s = 1, rot = 0, burnt = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 86, 58, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = burnt > 0.5 ? '#8a4a22' : '#d9893e'; x.beginPath(); x.ellipse(0, 0, 78, 50, 0, 0, Math.PI * 2); x.fill()
  R(x, 'rgba(255,255,255,0.3)', -40, -36, 50, 12)
  for (const d of [-1, 1]) { R(x, INK, d * 70 - 14, -64, 28, 40); R(x, '#f4ead8', d * 70 - 9, -60, 18, 30) }
  if (burnt > 0.5) { R(x, '#3a2a20', 10, -10, 30, 16); R(x, '#3a2a20', -40, 6, 22, 12) }
  x.restore()
}
function tray(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -120, -10, 240, 22); R(x, '#c9c4d8', -114, -6, 228, 12); x.restore() }
function plates(x, t, cx, by, n, wob = 1) {
  for (let i = 0; i < n; i++) { const dx = Math.sin(t * 9 + i) * 6 * wob * (i / n); R(x, INK, cx - 74 + dx, by - i * 16 - 16, 148, 18); R(x, '#f4f0ff', cx - 68 + dx, by - i * 16 - 13, 136, 10) }
}
function frontDoor(x, t, cx, open = 1) {
  R(x, INK, cx - 100, 700, 200, 480); R(x, '#120e28', cx - 92, 708, 184, 464)
  const w = lerp(184, 30, open)
  box(x, cx - 92, 708, w, 464, '#2f7a5a', { b: 0, hi: 'rgba(255,255,255,0.12)' })
  glow(x, cx, 940, 180, 0.4 * open, '255,214,150')
}
function gravy(x, t, cx, cy, boil) {
  box(x, cx - 70, cy - 50, 140, 80, '#c9c4d8', { b: 6 })
  R(x, '#8a4f22', cx - 62, cy - 50, 124, 14)
  if (boil > 0) for (let i = 0; i < 6; i++) { const p = ((t * 1.6 + i / 6) % 1); R(x, '#8a4f22', cx - 70 + i * 26, cy - 50 + p * 80 * boil, 16, 16 + 20 * p) }
  label(x, boil > 0 ? 'BLUB BLUB' : '', cx, cy - 100 - 6 * Math.sin(t * 12), { size: 26, col: '#ffd0a0', alpha: boil })
}
function party(x, t) {
  stringLights(x, t, -20, 260, 560, 300, { n: 9, sag: 50 })
  stringLights(x, t, 520, 300, 1100, 260, { n: 9, sag: 50 })
}

const F = makeM47({
  id: 'kxste01', series: 'single', dur: 75, ending: 'cut',
  hook: { text: 'Hosting dinner. *Alone.* | Doorbell’s ringing.', out: 2.9, top: 200, size: 104 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'wait for *the toast*', top: 1290 },
  chapters: [{ at: 3.0, title: 'arrival' }, { at: 15.5, title: 'the moment' }, { at: 29.0, title: 'the stars' }, { at: 38.5, title: 'the move' }, { at: 56.0, title: 'the toast' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.55 },
    { k: 'scratch', at: 0.7, len: 1.4, caption: 'the oven, the doorbell | *and* the gravy. hi.', top: 1500 },
    { k: 'caught', at: 0.8, x: 560, y: 720, r: 130, out: [2.2, 2.35], label: 'DINNER (AIRBORNE)', arrow: 'tr' },
    { k: 'shake', at: 21.0, len: 0.5, amp: 22 },
    { k: 'loading', at: 22.2, len: 3.2, label: 'hosting solo…', error: 'Error: only two hands', y: 520 },
    { k: 'ach', at: 52.4, out: [55.0, 55.3], title: 'ACHIEVEMENT UNLOCKED', text: 'dinner for *eight*, served', icon: '★', y: 1250 },
  ],
  lines: [
    say(3.4, LIB, 'coats on the bed! shoes… *anywhere!*'),
    say(6.8, TAU, 'I brought bread. *three* loaves.'),
    say(10.0, SAG, 'where do you want the *game?*'),
    say(12.3, LIB, 'everywhere! *nowhere!* one sec!'),
    say(16.0, CAN, 'who helps you host all *this?*'),
    say(18.9, LIB, "oh. just me. it's… *just* me."),
    say(26.0, LIB, 'is a home for one a *real* home?'),
    stars(29.6, 'a home for one can still be *full.*'),
    stars(33.2, "let them *help.* that's what guests are for."),
    say(43.6, LIB, 'Taurus, slice! Sag, carry! everyone, *sit!*'),
    say(47.2, SAG, "the chicken's a *little* burnt!"),
    say(50.2, TAU, "best burnt chicken I've *ever* had."),
    say(56.4, TAU, 'to Libra, who makes everyone feel at *home.*'),
    say(60.4, LIB, "…to *my* home. it's full."),
    say(64.0, LIB, 'and now it’s quiet. and I *love* it.'),
  ],
  boxes: [{ from: 0, to: 4, close: 15.2 }, { from: 4, to: 6, close: 22.6 }, { from: 6, to: 7, close: 28.8 }, { from: 7, to: 9, close: 38.2 }, { from: 9, to: 12, close: 55.8 }, { from: 12, to: 14, close: 63.4 }, { from: 14, to: 15, close: 68.4 }],
  cards: [{ at: 39.0, out: [42.8, 43.2], label: 'JOB CARDS', text: 'Taurus: slice · Sag: carry | Aquarius: *the music*', top: 470, size: 54 }],
  meter: [[3.6, 0.2], [21.0, 0.1], [34.6, 0.4], [44.4, 0.6], [52.4, 0.75], [60.8, 0.9], [65.4, 1.0]],
  thrive: { at: 68.6, text: 'Libra: | *thriving.*' },
  last: { at: 73.6, text: 'Hosted by one. | *Loved* by all.', top: 300 },
  shots: [
    // A · the catch (0–3)
    { at: 0, set: 'dinner', cam: [1.1, 540, 900], push: 0.03,
      draw(x, t) {
        party(x, t)
        frontDoor(x, t, 900, 0)
        label(x, 'DING DONG', 880, 640 - 8 * Math.sin(t * 20), { size: 40, col: GOLD, font: INTER, weight: 800, rot: 0.12 })
        const p = prog(t, -0.6, 2.8)
        star(x, t, LIB, { x: 460, y: 920 - 60 * Math.sin(Math.PI * clamp(p * 1.2)), s: 260, mood: 'wide', look: [0, -1], hops: [-0.1], squash: -0.06 })
        chicken(x, t, 560, 760 - 40 * Math.sin(Math.PI * p), { rot: p * 3, s: 0.9 })
        tray(x, 300, 980, -0.6 + p)
      },
      front(x, t) { dinnerTable(x, t, { dishes: false }); plates(x, t, 240, 1086, 8, 2) },
      pis: { x: 980, y: 1300, s: 100, tears: 2, mood: 'wide', look: [-1, -1] } },
    // B · arrival (3–15.5)
    { at: 3.0, set: 'dinner', cam: [1.06, 540, 900], push: 0.05,
      draw(x, t, S) {
        party(x, t)
        frontDoor(x, t, 900, 1)
        const walk = (at) => ease.inOutCubic(prog(t, at, at + 1.2))
        star(x, t, TAU, { x: lerp(900, 680, walk(4.0)), y: 960, s: 190, mood: 'happy', look: [-1, 0], hops: S.hopsFor(TAU) })
        if (t > 6.6) for (let i = 0; i < 3; i++) box(x, 600 + i * 40, 1060 - i * 10, 50, 30, '#c9823e', { b: 4 })
        star(x, t, SAG, { x: lerp(1100, 860, walk(8.8)), y: 960, s: 190, mood: 'sparkle', look: [-1, 0], hops: S.hopsFor(SAG) })
        if (t > 8.8) box(x, lerp(1100, 860, walk(8.8)) - 60, 1050, 120, 40, '#c0577a', { b: 5 })
        star(x, t, AQU, { x: lerp(1200, 980, walk(11.4)), y: 970, s: 170, mood: 'happy', look: [-1, 0], hops: [12.6, 13.4] })
        const run = Math.sin(t * 2.2)
        star(x, t, LIB, { x: 330 + 120 * run, y: 960, s: 230, mood: t < 12.4 ? 'sparkle' : 'wide', look: [run > 0 ? 1 : -1, 0], hops: [...S.hopsFor(LIB), 5.0, 5.5, 6.0, 8.2, 8.7, 11.2] })
      },
      front(x, t) { dinnerTable(x, t, { dishes: false }); plates(x, t, 240, 1086, 8, 0.6) },
      pis: t => ({ x: 120, y: 1300, s: 100, tears: 1, mood: 'sparkle', look: [1, -1] }) },
    // C · the moment (15.5–29): the couple asks; gravy boils over
    { at: 15.5, set: 'kitchen', cam: [1.12, 540, 920], push: 0.05,
      draw(x, t, S) {
        gravy(x, t, 540, 960, inR(t, 20.8, 28) ? 1 : 0.2)
        star(x, t, CAN, { x: 780, y: 900, s: 190, mood: 'happy', look: [-1, 0], hops: S.hopsFor(CAN) })
        star(x, t, CAP, { x: 940, y: 910, s: 180, mood: 'happy', look: [-1, 0], hops: [16.6] })
        hearts(x, t, 15.8, 860, 760, { n: 3, cell: 4, spread: 120 })
        star(x, t, LIB, { x: 260, y: 920, s: 240, mood: t < 19 ? 'happy' : t < 25.6 ? 'wide' : 'sleepy', zzz: false, look: t < 25.6 ? [1, 0] : [0, 1], hops: S.hopsFor(LIB), squash: inR(t, 21, 21.6) ? 0.08 : 0 })
      },
      pis: t => ({ x: 960, y: 1290, s: 100, tears: t < 21 ? 1 : 2, mood: 'sparkle', look: [-1, -1] }) },
    // D · THE STARS (29–38.5)
    { at: 29.0, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 33 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, LIB, { x: 190, y: 1210, s: 150, mood: t > 33.4 ? 'sparkle' : 'neutral', look: [1, -1], hops: [33.6] })
        const k = pop01(t, 33.6, 0.3, 2) * outK(t, [37.8, 38.2])
        if (k > 0.01) for (let i = 0; i < 4; i++) star(x, t, [TAU, SAG, AQU, CAN][i], { x: 720 + i * 90, y: 1200, s: 90 * k, mood: 'happy', look: [-1, -1], hops: [33.8 + i * 0.12] })
      },
      pis: { x: 900, y: 1330, s: 90, tears: 1, mood: 'sparkle', look: [-1, -1], tissue: false } },
    // E · the move (38.5–56): everyone helps at the table
    { at: 38.5, set: 'dinner', cam: [1.06, 540, 900], push: 0.05,
      draw(x, t, S) {
        party(x, t)
        const P = [[TAU, 150], [SAG, 330], [LIB, 540], [AQU, 740], [CAN, 920]]
        for (const [sg, px] of P) star(x, t, sg, { x: px, y: 960, s: sg === LIB ? 230 : 170, mood: t > 50 ? 'happy' : sg === LIB ? 'sparkle' : 'neutral', look: [px < 540 ? 1 : px > 540 ? -1 : 0, 0], hops: [...S.hopsFor(sg), 44.0 + (px % 7) * 0.1, 51.0 + (px % 5) * 0.1] })
        if (t > 50.4) { for (let i = 0; i < 6; i++) label(x, 'ha', 200 + i * 140, 760 + 20 * Math.sin(t * 8 + i), { size: 30, col: GOLD, alpha: outK(t, [53.0, 53.6]) }) }
      },
      front(x, t) { dinnerTable(x, t, { dishes: true }); chicken(x, t, 540, 1050, { s: 0.75, burnt: t > 46.6 ? 1 : 0 }) },
      pis: t => ({ x: 980, y: 1290, s: 110, tears: t < 50 ? 2 : 3, mood: t < 50 ? 'sparkle' : 'happy', look: [-1, -1] }) },
    // F · the toast (56–64)
    { at: 56.0, set: 'dinner', cam: [1.16, 540, 940], push: 0.05,
      draw(x, t, S) {
        party(x, t)
        const P = [[TAU, 200], [SAG, 360], [LIB, 540], [AQU, 720], [CAN, 880]]
        const up = ease.outCubic(prog(t, 58.8, 59.4))
        for (const [sg, px] of P) { star(x, t, sg, { x: px, y: 960, s: sg === LIB ? 230 : 170, mood: 'happy', look: [px < 540 ? 1 : px > 540 ? -1 : 0, 0], hops: [...S.hopsFor(sg), 59.4] }); mug(x, t, px + 50, lerp(1060, 860, up), 0.8, '#e86a5a', true) }
        confetti(x, t, 59.4, 540, 820)
      },
      front(x, t) { dinnerTable(x, t, { dishes: true }) },
      pis: { x: 980, y: 1290, s: 110, tears: 3, mood: 'happy', look: [-1, -1], hops: [59.4, 60.0] } },
    // G · alone, happy (63.4–75)
    { at: 63.4, set: 'room', setOpts: { couchX: 540, couchW: 640 }, cam: [1.1, 540, 920], push: 0.05,
      draw(x, t, S) {
        plates(x, t, 880, 1150, 8, 0)
        star(x, t, LIB, { x: 540, y: 980, s: 280, mood: t < 68.4 ? 'sleepy' : 'happy', zzz: false, look: [0, -0.3], hops: [...S.hopsFor(LIB), 68.9, 69.2, 74.0] })
        mug(x, t, 700, 1060, 1, '#e86a5a', true)
        sparkles(x, t, 540, 960, 68.9, 12, 260, 1, [ORANGE, GOLD, BONE])
      },
      pis: t => ({ x: 160, y: 1290, s: 110, tears: 3, mood: 'happy', look: [1, -1], hops: [69.0, 74.0] }) },
  ],
  cues: [
    ['bell', 0.0, 1318.51, 0.04, 0.8, 0.4], ['bell', 0.35, 1046.5, 0.04, 0.8, 0.4], ['whoosh', 0.05, 0.5, 0.04],
    ['pop', 4.6, 880, 0.03, 0.4], ['pop', 9.4, 987.77, 0.03, 0.4], ['pop', 12.0, 1174.66, 0.03, 0.4],
    ['riser', 20.0, 21.0, 0.02], ['tick', 21.2, 0.03], ['tick', 21.6, 0.03], ['tick', 22.0, 0.03],
    ['pop', 47.0, 330, 0.03, 0], ['glitter', 50.6, 51.2],
    ['bell', 59.4, 2093, 0.03, 0.9, -0.2], ['bell', 59.46, 2637, 0.025, 0.9, 0.2], ['glitter', 59.4, 60.0],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
