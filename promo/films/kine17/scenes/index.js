// kine17: IS THIS NORMAL? (long), "Panicking when they take ages to reply" (68.6 s vertical, star_advice post, music: synthwave · Em).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Loop ending (back into frame 0).
//   0.00       frame 0: "No reply yet. | Cue the *spiral.*" landed; ♋ Cancer mid-spin in a desk chair, phone pressed to
//              the forehead, "Delivered" glowing. Whip zoom.  2.4: promise sticker "stay for what *actually* helps."
//   CH 1 · THE SPIRAL (2.6)
//     2.6   "Delivered 4:02. | It's now *4:09.*"  A wall clock ticks; 4.0 loading bar "overthinking…" → "Error: too many
//           scenarios".  7.2 / 8.2 / 9.2 the scenarios pop ("they saw it and gasped", "wrong emoji??", "they joined a
//           monastery").  11.0 "Seven minutes. | Felt like *seven years.*"  12.6 ♓ Pisces spins in the next chair,
//           sobbing.
//   CH 2 · WHY IT HAPPENS (17.0)
//    17.6   "not knowing can feel like *danger* to your brain."  A pixel brain with a siren.
//    21.6   "so it fills the quiet with the *scariest* story."  A storybook opens: THE SCARIEST STORY.
//    25.6   "that's a feeling. not a *fact.*"  Stamp: FEELING ≠ FACT.
//   CH 3 · WHAT HELPS (30.0)
//    30.4   1 · Name it: a sticky note "I'm anxious. that's okay." and a breathing circle.
//    37.9   2 · Do one thing: phone in the drawer, Cancer makes tea; the kettle sings.
//    45.4   3 · Ask kindly, later: "how do you like to text?" → "honestly I'm a slow texter!"
//   CH 4 · THE REPLY (53.0)
//    53.6   the notification: "sorry!! fell asleep for 3 hours". Pisces cries at the nap.
//    55.4   NORMAL-O-METER: NORMAL.  61.0 "most silences have *boring* reasons. naps count."
//    65.6   last line: "A slow reply is usually | just a *slow day.*"  Then the loop back into frame 0.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, LAV, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, miniPhone, pop01, outK, prog, lerp, clamp, ease, r3, signStar, drawStarChar,
} from '../../kine01/normalkit.js'

const D = 68.6, FLOOR = 1480
const VIR = signStar('virgo')
const CH = [2.6, 17.0, 30.0, 53.0]
const T = {
  h0Out: [2.4, 2.6], promise: 2.4,
  h1: 2.6, h1Out: [10.8, 11.0], load: 4.0, scen: [7.2, 8.2, 9.2], h2: 11.0, h2Out: [16.6, 16.8], pisSpin: 12.6,
  brain: 17.0, book: 21.4, stamp: 25.8,
  help: [30.4, 37.9, 45.4], helpOut: [37.7, 45.2, 52.8],
  notif: 53.6, meter: 55.4, mOut: [60.3, 60.6], nap: 61.0, last: 65.6,
}
const LOAD = { at: T.load, len: 2.6, label: 'overthinking…', stallAt: 99, error: 'Error: too many scenarios', y: 1660 }
const NOTIF = { at: T.notif, out: [55.2, 55.5], title: 'texts', body: 'sorry!! fell asleep for *3 hours*', glyph: VIR.glyph, color: VIR.color, y: 560 }
const HELPS = ['1 · Name *it.*', '2 · Do *one* thing.', '3 · Ask kindly, *later.*']

function office(x, t) {
  room(x, { y: FLOOR, wall: '#1c1a40', floor: '#2a2650' })
  for (let i = 0; i < 5; i++) R(x, '#ff5cbf', 0, 440 + i * 4, 1080, 1)
}
function wallClock(x, t, cx, cy, mins) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 86, 0, Math.PI * 2); x.fill()
  const ma = (mins / 60) * Math.PI * 2 - Math.PI / 2, ha = ((4 + mins / 60) / 12) * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 46, Math.sin(ha) * 46); x.stroke()
  x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 70, Math.sin(ma) * 70); x.stroke()
  x.restore()
}
function chair(x, cx, cy, spin) {
  R(x, INK, cx - 8, cy + 60, 16, 110); box(x, cx - 90, cy + 160, 180, 20, '#4a4270', { b: 5 })
  const w = 140 * Math.max(0.25, Math.abs(Math.cos(spin)))
  box(x, cx - w / 2, cy - 160, w, 220, '#5a4ab0', { b: 7 })
  box(x, cx - 110, cy + 40, 220, 34, '#5a4ab0', { b: 6 })
}
function scenario(x, t, i, cx, cy, text, crossAt) {
  const k = pop01(t, T.scen[i], 0.3, 2.4) * outK(t, [T.h1Out[0] - 0.1, T.h1Out[1]])
  if (k <= 0.01) return
  bubble(x, t, cx, cy, T.scen[i], T.h1Out[1], text, { size: 30, col: '#ffd1d8', tail: 0 })
  if (t > crossAt) { const c = ease.outCubic(prog(t, crossAt, crossAt + 0.2)); x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(cx - 180, cy); x.lineTo(cx - 180 + 360 * c, cy); x.stroke(); x.restore() }
}
function brain(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 820); x.scale(k, k)
  drawBits(x, ['..PPPPPP..', '.PPQPPQPP.', 'PPQPPPQPPP', 'PQPPQPPQPP', 'PPPQPPPQPP', '.PPPPQPPP.', '..PPPPPP..', '....PP....'], { P: '#ff9fbf', Q: '#e07a9a' }, 0, 0, 34)
  const on = Math.floor(t * 6) % 2 === 0
  glowAt(x, 0, -200, 200, '255,60,60', on ? 0.5 : 0.15)
  box(x, -40, -250, 80, 60, on ? RED : '#8a2a3a', { b: 6 })
  label(x, 'DANGER?!', 0, 220, { size: 40, col: '#ff8b9b', font: INTER, weight: 800 })
  x.restore()
}
function storybook(x, t, k, a) {
  if (k <= 0.01) return
  const o = ease.inOutCubic(prog(t, a + 0.3, a + 1.0))
  x.save(); x.translate(540, 840); x.scale(k, k)
  box(x, -300 * o - 10, -200, 300 * o + 10, 400, '#f4e8cc', { b: 7 })
  box(x, 0, -200, 300, 400, '#f4e8cc', { b: 7 })
  if (o < 0.95) { x.save(); x.scale(1 - o, 1); box(x, 0, -200, 300, 400, '#7a2a4a', { b: 7 }); x.restore() }
  if (o > 0.9) {
    x.font = `800 26px ${INTER}`; x.fillStyle = '#7a2a4a'; x.textAlign = 'center'; x.fillText('THE SCARIEST', -150, -140); x.fillText('STORY', -150, -104)
    x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'
    ;['once upon a', 'delivered…', 'they never', 'replied and', 'and then…'].forEach((l, i) => x.fillText(l, 30, -140 + i * 44))
  }
  x.restore()
}
function stamp(x, t, at) {
  if (t < at) return
  const p = prog(t, at - 0.02, at + 0.08), sc = lerp(1.6, 1, ease.outCubic(p))
  x.save(); x.translate(540, 840); x.rotate(-0.08); x.scale(sc, sc); x.globalAlpha = clamp(p * 2)
  x.font = `800 110px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const s = 'FEELING ≠ FACT', w = x.measureText(s).width + 70
  x.strokeStyle = MINT; x.lineWidth = 12; x.strokeRect(-w / 2, -80, w, 160); x.fillStyle = MINT; x.fillText(s, 0, 6)
  x.restore()
}
function breathing(x, t, a, k) {
  if (k <= 0.01) return
  const ph = (Math.sin((t - a) * Math.PI / 2) + 1) / 2
  x.save(); x.globalAlpha *= k
  x.strokeStyle = MINT; x.lineWidth = 10; x.beginPath(); x.arc(540, 820, 120 + 90 * ph, 0, Math.PI * 2); x.stroke()
  label(x, ph > 0.5 ? 'breathe in' : 'breathe out', 540, 820, { size: 34, col: MINT, font: INTER, weight: 800 })
  x.restore()
  // the sticky note
  x.save(); x.translate(860, 600); x.rotate(0.08); box(x, -130, -90, 260, 180, '#ffe27a', { b: 6 })
  x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText("I'm anxious.", 0, -20); x.fillText("that's okay.", 0, 24); x.restore()
}
function kettle(x, t, a) {
  label(x, 'tea.', 800, 1250, { size: 28, col: BONE }); box(x, 700, 1050, 200, 160, '#c9c4e0', { b: 7 }); R(x, INK, 896, 1080, 40, 20); R(x, INK, 760, 1010, 80, 40)
  const boil = prog(t, a + 1.5, a + 4.5)
  if (boil > 0) for (let i = 0; i < 4; i++) { const p = ((t * 0.8 + i / 4) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p) * boil; R(x, BONE, 920 + p * 40, 1060 - p * 160 - i * 10, 14, 28); x.restore() }
  if (t > a + 4.5) label(x, '*whistle*', 860, 900, { size: 30, col: CYAN, alpha: pop01(t, a + 4.5, 0.25, 2) })
}

const EP = makeNormal({
  id: 'kine17', D, ending: 'loop', hero: 'cancer',
  hook: { text: 'No reply yet. | Cue the *spiral.*', out: T.h0Out, accentColor: '#ff5cbf' },
  promise: { text: 'stay for what *actually* helps.', at: T.promise, out: [6.0, 6.3], top: 1520 },
  chapters: [
    { at: CH[0], out: [CH[0] + 3.0, CH[0] + 3.3], n: 1, title: 'the spiral', y: 450 },
    { at: CH[1], out: [CH[1] + 3.0, CH[1] + 3.3], n: 2, title: 'why it happens', y: 450, color: CYAN },
    { at: CH[2], out: [CH[2] + 3.0, CH[2] + 3.3], n: 3, title: 'what helps', y: 450, color: MINT },
    { at: CH[3], out: [CH[3] + 3.0, CH[3] + 3.3], n: 4, title: 'the reply', y: 450, color: PINK },
  ],
  fx: [[hook.loadingBar, hook.loadingBarCues, LOAD], [hook.notification, hook.notificationCues, NOTIF]],
  heads: [
    { text: 'Delivered 4:02. | It’s now *4:09.*', at: T.h1, out: T.h1Out, size: 94, accent: '#ff5cbf', late: 1, lateAt: T.h1 + 0.6 },
    { text: 'Seven minutes. | Felt like *seven years.*', at: T.h2, out: T.h2Out, size: 92, accent: '#ff5cbf', late: 2, lateAt: T.h2 + 0.45 },
    ...HELPS.map((h, i) => ({ text: h, at: T.help[i] + 0.2, out: [T.helpOut[i] - 0.2, T.helpOut[i]], size: 92, accent: MINT, late: 1, lateAt: T.help[i] + 0.6 })),
  ],
  meter: { at: T.meter, land: 'normal', out: T.mOut, cy: 1000 },
  boxes: [
    { lines: [{ t: 17.6, text: 'not knowing can feel like *danger* to your brain.' }, { t: 21.6, text: 'so it fills the quiet with the *scariest* story.' }, { t: 25.6, text: "that's a feeling. not a *fact.*" }], close: 29.7 },
    { lines: [{ t: 31.0, text: "say it: 'I'm anxious. and that's *okay.*'" }], close: 37.4 },
    { lines: [{ t: 38.5, text: 'phone in a drawer. do one *small* thing.' }], close: 44.9 },
    { lines: [{ t: 46.0, text: 'later, ask how they like to text. *kindly.*' }], close: 52.6 },
    { lines: [{ t: 61.0, text: 'most silences have *boring* reasons. naps count.' }], close: 65.3 },
  ],
  stars: { in: 17.2 },
  last: { text: 'A slow reply is usually | just a *slow day.*', at: T.last, lateAt: T.last + 0.65, accent: GOLD, size: 90 },
  punches: [CH[0], T.h1 + 0.6, ...T.scen, T.h2, CH[1], T.book, T.stamp, CH[2], ...T.help, CH[3], T.notif, T.meter + 1.75],
  shakes: [{ t: T.stamp, a: 18 }, { t: T.notif, a: 10 }],
  scene(x, t, S) {
    const pis = o => S.pis(x, t, o)
    if (t < CH[1]) {
      office(x, t)
      const mins = t < T.h1 ? 2 : Math.min(9, 2 + Math.floor((t - T.h1) * 1.2))
      wallClock(x, t, 860, 620, mins)
      // Cancer mid-spin in the desk chair, phone to forehead
      const spin = t * 7
      chair(x, 420, 1180, spin)
      const flip = Math.cos(spin) < 0
      S.hero(x, t, { x: 420 + 40 * Math.sin(spin), y: 1080, s: 340, mood: t > T.scen[0] && t < T.h2 ? 'squint' : 'wide', look: [flip ? -1 : 1, 0], squash: 0.04 * Math.sin(t * 14), hops: [...T.scen, T.h2] })
      miniPhone(x, 420 + 40 * Math.sin(spin), 930, { s: 0.7, rot: 0.1 * Math.sin(spin), glow: 1, lines: [{ text: 'Delivered', size: 18, col: CYAN, dy: 40 }] })
      scenario(x, t, 0, 300, 640, 'they saw it and gasped', 15.0)
      scenario(x, t, 1, 780, 760, 'wrong emoji??', 15.0)
      scenario(x, t, 2, 420, 860, 'they joined a monastery', 15.0)
      if (t > T.pisSpin) {
        chair(x, 860, 1280, t * 9 + 1)
        pis({ x: 860, y: 1180, s: 220, pop: pop01(t, T.pisSpin, 0.35, 2.2), tears: 3, mood: 'wide', look: [-1, 0] })
      } else pis({ x: 880, y: 1620, s: 170, pop: pop01(t, 4.6, 0.35, 2.2), tears: 2, mood: 'wide', look: [-1, -0.6], tissues: 'left' })
      return
    }
    if (t < CH[2]) {
      office(x, t)
      if (t < T.book) brain(x, t, pop01(t, T.brain + 0.2, 0.35, 2.2) * outK(t, [T.book - 0.3, T.book]))
      else if (t < T.stamp) storybook(x, t, pop01(t, T.book, 0.35, 2.2) * outK(t, [T.stamp - 0.25, T.stamp]), T.book)
      else stamp(x, t, T.stamp)
      S.hero(x, t, { x: 260, y: 1300, s: 220, mood: t > T.stamp ? 'sparkle' : 'wide', look: [1, -1], hops: [T.brain + 0.4, T.book + 1, T.stamp] })
      pis({ x: 840, y: 1300, s: 200, tears: 3, mood: t > T.stamp ? 'happy' : 'wide', look: [-1, -1], tissues: 'left', hops: [T.stamp + 0.1] })
      S.stars(x, t, { x: 140, y: 600, s: 120, pop: pop01(t, 17.2, 0.35, 2.1), mood: 'neutral', look: [1, 0.4] })
      return
    }
    if (t < CH[3]) {
      office(x, t)
      const hi = t < T.help[1] ? 0 : t < T.help[2] ? 1 : 2
      if (hi === 0) {
        breathing(x, t, T.help[0], pop01(t, T.help[0] + 0.3, 0.35, 2))
        S.hero(x, t, { x: 300, y: 1260, s: 260, mood: 'happy', look: [0.5, -1], squash: 0.05 * Math.sin((t - T.help[0]) * Math.PI / 2), hops: [32, 34, 36] })
        pis({ x: 860, y: 1290, s: 190, tears: 2, mood: 'sleepy', look: [-1, -0.5] })
      } else if (hi === 1) {
        const a = T.help[1]
        // the drawer, phone goes in
        box(x, 120, 1100, 300, 200, '#8a6440', { b: 7 }); R(x, INK, 240, 1190, 60, 12)
        const dp = ease.inCubic(prog(t, a + 0.6, a + 1.2))
        if (dp < 1) miniPhone(x, 270, lerp(900, 1180, dp), { s: 0.6, glow: 1 - dp, lines: [{ text: 'Delivered', size: 16, col: CYAN, dy: 40 }] })
        else label(x, 'phone: in the drawer.', 270, 1060, { size: 24, col: MINT, alpha: prog(t, a + 1.2, a + 1.5) })
        kettle(x, t, a)
        S.hero(x, t, { x: lerp(300, 620, ease.inOutCubic(prog(t, a + 1.4, a + 2.2))), y: 1260, s: 260, mood: t > a + 4.5 ? 'happy' : 'neutral', look: [1, -0.3], hops: [a + 1.4, a + 1.8, a + 2.2, a + 4.6] })
        pis({ x: 900, y: 760, s: 160, tears: 2, mood: 'sparkle', look: [-1, 1] })
      } else {
        const a = T.help[2]
        bubble(x, t, 380, 760, a + 1.0, T.helpOut[2], 'how do you like to text?', { size: 34, col: '#ffd1e0', tail: -0.3 })
        bubble(x, t, 700, 900, a + 2.6, T.helpOut[2], "honestly? I'm a slow texter!", { size: 34, col: '#c9ecfb', tail: 0.4 })
        S.hero(x, t, { x: 300, y: 1240, s: 280, mood: t > a + 2.6 ? 'happy' : 'neutral', look: [1, -0.3], hops: [a + 1.0, a + 2.8] })
        drawStarChar(x, 780, 1240, 260, t, { color: VIR.color, glyph: VIR.glyph, mood: 'happy', look: [-1, -0.3], seed: 9, hops: [a + 2.6] })
        if (t > a + 2.8) hearts(x, t, a + 2.8, 540, 1050, { n: 5 })
        pis({ x: 540, y: 640, s: 150, tears: t > a + 2.8 ? 3 : 2, mood: 'sparkle', look: [0, 1] })
      }
      S.stars(x, t, { x: 960, y: 640, s: 110, mood: 'happy', look: [-1, 0.4] })
      return
    }
    // CH4: the reply, the verdict, the nap
    office(x, t)
    if (t < T.meter) {
      chair(x, 420, 1180, 0)
      S.hero(x, t, { x: 420, y: 1080, s: 340, mood: t > T.notif + 0.3 ? 'wide' : 'neutral', look: [0, -1], hops: [T.notif + 0.3] })
      pis({ x: 860, y: 1200, s: 220, tears: 3, mood: 'sparkle', look: [-1, -0.8], hops: [T.notif + 0.6], say: [T.notif + 0.7, T.meter, 'a NAP. bless.'], sayDx: -40, saySize: 30 })
    }
    if (t >= T.meter && t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 180, mood: t > land ? 'happy' : 'wide', look: [1, -1], pop: k, hops: [land] })
      pis({ x: 850, y: 1560, s: 180, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      chair(x, 420, 1180, (t - T.mOut[0]) * 3)
      S.hero(x, t, { x: 420, y: 1080, s: 320, pop: k, mood: 'happy', look: [0.5, -0.5], hops: [61.5, 62.5, 63.5, 64.5] })
      // a pillow + z's: the nap callback
      drawBits(x, ['.ZZZ', '...Z', '..Z.', '.Z..', 'ZZZZ'], { Z: CYAN }, 840, 760 - 20 * Math.sin(t * 2), 10)
      pis({ x: 840, y: 1200, s: 230, pop: k, tears: 3, mood: 'happy', look: [-1, -0.3], hops: [62, 64] })
      S.stars(x, t, { x: 140, y: 640, s: 120, mood: 'happy', look: [1, 0.4] })
    }
  },
  cues: [
    ...Array.from({ length: 10 }, (_, i) => ['whoosh', r3(i * 0.9), 0.3, 0.02]),
    ...Array.from({ length: 7 }, (_, i) => ['tick', r3(T.h1 + 0.4 + i * 0.83), 0.04]),
    ...T.scen.map((s, i) => ['pop', s, [880, 987.77, 1174.66][i], 0.045, [-0.3, 0.3, 0][i]]),
    ['pop', T.pisSpin, 987.77, 0.04, 0.4], ['pluck', T.pisSpin + 0.3, 1174.66, 0.03, 0.4, 0.4],
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.brain + 0.4 + i * 0.5), 0.04]),
    ['whoosh', T.book + 0.3, 0.5, 0.04], ['boom', T.stamp, 0.3], ['tom', T.stamp, 88, { gain: 0.26, decay: 0.3 }],
    ['riser', T.help[0] + 0.5, T.help[0] + 2.5, 0.015], ['riser', T.help[0] + 4.5, T.help[0] + 6.5, 0.015],
    ['tick', T.help[1] + 1.2, 0.07], ['riser', T.help[1] + 1.5, T.help[1] + 4.5, 0.02], ['bell', T.help[1] + 4.5, 2349.32, 0.03, 1.2, 0.4],
    ['pop', T.help[2] + 1.0, 1174.66, 0.04, -0.3], ['pop', T.help[2] + 2.6, 1318.51, 0.045, 0.3], ['glitter', T.help[2] + 2.8, T.help[2] + 3.2],
    ['pluck', T.notif + 0.7, 1174.66, 0.04, 0.5, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [LAV, PINK, sparkles, shadow, clamp]
