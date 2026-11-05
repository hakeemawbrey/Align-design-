// kxtre02: EXPECTATION vs REALITY, "Expectation vs Reality: The Whole First Date" (120 s vertical, Trends: Extended ep 2,
// rows in promo/films/month2/m41.md; music: lofi · Am). Engine: ../../kxtre01/scenes/xkit.js. No end card; hard cut.
// ♉ Taurus and ♑ Capricorn on a first date, every chapter a split screen: the glossy EXPECTATION (left) vs the scrappy
// REALITY (right). The turn: every round the expectation side goes a little greyer and emptier, and reality gets warmer.
// ♓ Pisces watches from the café booth (reality side), crying harder each round; full fountains at the third wave.
//   0.0–4.0   frame 0: split mid-collision, a slow-mo hair flip vs Taurus mid-trip over the doormat; whip + shake
//   1 THE ARRIVAL · 2 THE OUTFIT · 3 THE ORDER · 4 THE CONVERSATION · 5 THE BILL · 6 THE WALK HOME · 7 THE GOODBYE
//   8 THE TEXT AFTER: both type "I'm still smiling" at once; the expectation half goes dark, reality takes the screen.
//   last line "The messy side | had *the laughs.*", held ~0.9 s, hard cut.
import {
  makeEp, star, pisces, cafe, room, street, table, cup, tag, sfx, hearts, sparkles, confetti, phone, glowSpot, split,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, INTER, r3, drawBits, HEART,
} from '../../kxtre01/scenes/xkit.js'

const ACC = '#ffb38a'
const TAU = 'taurus', CAP = 'capricorn'

// the glossy filter for the expectation side: a pink-gold sheen and drifting sparkles, fading to grey as rounds go by
function gloss(x, t, i) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, 'rgba(255,190,220,0.22)'); g.addColorStop(1, 'rgba(255,220,150,0.16)')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 7; k++) { const ph = (t * 0.3 + k / 7) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; drawBits(x, ['.G.', 'GGG', '.G.'], { G: '#fff2c0' }, 300 + ((k * 83) % 480), 1300 - ph * 900, 7, { outline: null }) }
  x.globalAlpha = 1
  const grey = clamp(i / 7) * 0.55
  if (grey > 0) { x.fillStyle = `rgba(70,70,84,${grey})`; x.fillRect(0, 0, 1080, 1920) }
}
function warmth(x, i) { x.fillStyle = `rgba(255,170,90,${0.04 + 0.025 * i})`; x.fillRect(0, 0, 1080, 1920) }
// a striped knit sweater band over a star (the "same sweater" gag)
function sweater(x, cx, cy, s) { const w = s * 0.62, h = s * 0.16; R(x, INK, cx - w / 2 - 4, cy - 4, w + 8, h + 8); for (let k = 0; k < 5; k++) R(x, k % 2 ? '#c0392b' : '#efe6d6', cx - w / 2 + (k * w) / 5, cy, w / 5 + 1, h) }
function bowtie(x, cx, cy) { drawBits(x, ['B...B', 'BB.BB', 'BBBBB', 'BB.BB', 'B...B'], { B: '#1b1236' }, cx, cy, 8) }

/** a chapter: exp(x, t, S) | real(x, t, S), with the round index for the grey creep */
function ER(i, exp, real, extra) {
  return (x, t, S) => {
    split(x, t, (cx, tt) => { exp(cx, tt, S); gloss(cx, tt, i) }, (cx, tt) => { real(cx, tt, S); warmth(cx, i) }, { labels: ['EXPECTATION', 'REALITY'], k: 1 })
    // Pisces in the booth (on the reality side), crying harder each round
    pisces(x, t, { x: 960, y: 1440, s: 120, tears: i >= 6 ? 3 : i >= 2 ? 2 : 1, look: [-1, -1], pop: S.w(0.5, S.t1 - S.t0) })
    if (extra) extra(x, t, S)
  }
}
const pair = (x, t, S, o = {}) => {
  star(x, t, TAU, { x: o.tx ?? 440, y: o.y ?? 1000, s: o.s ?? 190, mood: o.tm || 'happy', look: [1, -0.2], hops: o.th, squash: o.tsq, seed: 3 })
  star(x, t, CAP, { x: o.cx ?? 650, y: o.y ?? 1000, s: o.s ?? 190, mood: o.cm || 'happy', look: [-1, -0.2], hops: o.ch, seed: 7 })
}

// ── the hook: mid-collision
function hook(x, t, S) {
  split(x, t, (cx, tt) => {
    cafe(cx, tt, { warm: 1 })
    glowSpot(cx, 540, 980, 300, '255,210,150', 0.4)
    box(cx, 520, 1060, 40, 60, '#fff2d0', { b: 4 }); R(cx, '#ffcf6a', 534, 1030 + Math.sin(tt * 9) * 4, 12, 24)
    star(cx, tt, TAU, { x: 540, y: 960, s: 220, mood: 'wink', look: [0, 0], squash: -0.06 })
    gloss(cx, tt, 0)
  }, (cx, tt) => {
    cafe(cx, tt)
    box(cx, 380, 1180, 320, 40, '#a35a3a', { b: 5 })
    cx.save(); cx.translate(560, 1050); cx.rotate(-0.9 + 0.1 * Math.sin(tt * 8)); star(cx, tt, TAU, { x: 0, y: 0, s: 220, mood: 'wide', look: [1, 1] }); cx.restore()
    sfx(cx, tt, 'THUD', 620, 860, -0.1, { size: 64, col: ACC, life: 3 })
    warmth(cx, 0)
  }, { labels: ['EXPECTATION', 'REALITY'] })
  pisces(x, t, { x: 960, y: 1440, s: 120, tears: 2, look: [-1, -1] })
  void S
}

const C = []
C.push({ name: 'THE ARRIVAL', dur: 14.5, caption: 'you picture *the entrance.*', stamp: '7:00 PM',
  bubbles: [{ at: 7.2, end: 10, x: 820, y: 640, text: 'you ok?? :)', tail: -0.3, size: 34 }, { at: 9.6, end: 12.6, x: 760, y: 560, text: 'the floor came at me', tail: 0.2, size: 32 }],
  cues: [['whoosh', 1.4, 0.6, 0.02], ['tom', 4.3, 90, { gain: 0.3, decay: 0.3 }], ['tick', 4.32, 0.06], ['pluck', 12.4, 523.25, 0.04, 0.3, 0.3]],
  draw: ER(0, (x, t, S) => {
    cafe(x, t, { warm: 1 })
    const g = ease.outCubic(prog(S.u, 0.8, 3.2))
    star(x, t, TAU, { x: lerp(260, 440, g), y: 1000, s: 190, mood: 'wink', look: [1, 0], bob: 0 })
    star(x, t, CAP, { x: 650, y: 1000, s: 190, mood: S.u > 3.2 ? 'heart' : 'happy', look: [-1, 0] })
    if (S.u > 3) sparkles(x, t, 440, 900, S.at(3.2), 10, 140, 1)
  }, (x, t, S) => {
    cafe(x, t)
    box(x, 330, 1180, 220, 34, '#a35a3a', { b: 5 })
    const trip = prog(S.u, 3.6, 4.3), up = ease.inOutCubic(prog(S.u, 8.2, 9.4))
    const rot = trip * (1 - up) * -1.4
    x.save(); x.translate(lerp(300, 440, ease.outCubic(prog(S.u, 0.8, 3.6))), lerp(1000, 1080, trip * (1 - up))); x.rotate(rot)
    star(x, t, TAU, { x: 0, y: 0, s: 190, mood: S.u > 9.4 ? 'happy' : S.u > 3.6 ? 'wide' : 'neutral', look: [1, 0.4] }); x.restore()
    if (S.u > 4.3) sfx(x, t, 'THUD', 460, 880, S.at(4.3), { size: 56, col: ACC })
    star(x, t, CAP, { x: lerp(650, 560, ease.inOutCubic(prog(S.u, 5.6, 7.0))), y: 1000, s: 190, mood: 'wide', look: [-1, 0.3], hops: S.hops(7.2, 7.8) })
  }) })
C.push({ name: 'THE OUTFIT', dur: 14.5, caption: 'the fit was *planned.*',
  bubbles: [{ at: 5.6, end: 8.6, x: 820, y: 620, text: 'nice sweater.', tail: -0.2, size: 34 }, { at: 8.2, end: 11.4, x: 760, y: 540, text: '…nice sweater.', tail: 0.2, size: 34 }],
  cues: [['pluck', 2.0, 783.99, 0.04, 0.5, -0.4], ['tick', 4.8, 0.06], ['pop', 11.6, 659.25, 0.05, 0.4]],
  draw: ER(1, (x, t, S) => {
    cafe(x, t, { warm: 1 })
    pair(x, t, S, { tm: 'wink' })
    bowtie(x, 440, 1040); bowtie(x, 650, 1040)
    if (S.u > 1.8) sparkles(x, t, 440, 980, S.at(2.0), 8, 120, 2)
  }, (x, t, S) => {
    cafe(x, t)
    pair(x, t, S, { tm: S.u > 4.6 ? 'wide' : 'happy', cm: S.u > 4.6 ? 'wide' : 'happy', th: S.hops(5.6, 11.6), ch: S.hops(8.2, 11.6) })
    sweater(x, 440, 1035, 190); sweater(x, 650, 1035, 190)
    tag(x, 'SAME SWEATER', 545, 760, S.w(4.8, 14), { bg: PINK, size: 34 })
    if (S.u > 11.6) sfx(x, t, 'twins!', 545, 860, S.at(11.6), { size: 50, col: ACC })
  }) })
C.push({ name: 'THE ORDER', dur: 14.5, caption: 'ordering *like a film.*',
  bubbles: [{ at: 2.0, end: 5.0, x: 330, y: 600, text: 'the tasting menu, please.', tail: 0.2, size: 30 }, { at: 6.4, end: 9.4, x: 760, y: 600, text: 'the pancake.', tail: 0.2, size: 34 }, { at: 6.4, end: 9.4, x: 900, y: 520, text: 'the pancake.', tail: -0.3, size: 34 }],
  cues: [['pop', 6.45, 659.25, 0.04, 0.3], ['pop', 6.45, 783.99, 0.04, 0.6], ['glitter', 10.0, 10.6]],
  draw: ER(2, (x, t, S) => {
    cafe(x, t, { warm: 1 })
    table(x, 545, 1120, { w: 300 })
    pair(x, t, S, { tm: 'squint', th: S.hops(2.0) })
    box(x, 470, 1060, 150, 50, '#2a1f2a', { b: 4 }); x.font = `italic 500 28px Georgia`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('à la carte', 545, 1092)
  }, (x, t, S) => {
    cafe(x, t)
    table(x, 545, 1120, { w: 300 })
    pair(x, t, S, { tm: S.u > 9.6 ? 'happy' : 'neutral', cm: S.u > 9.6 ? 'happy' : 'neutral', th: S.hops(6.4, 10.0), ch: S.hops(6.4, 10.0) })
    if (S.u > 10) { drawBits(x, ['.CCCCC.', 'CCCCCCC', 'BBBBBBB', '.BBBBB.'], { C: '#f2b25c', B: '#c9853a' }, 545, 1080, 12); hearts(x, t, S.at(10), 545, 940) }
  }) })
C.push({ name: 'THE CONVERSATION', dur: 14.5, caption: 'banter, *obviously.*',
  bubbles: [{ at: 1.6, end: 4.2, x: 330, y: 560, text: 'touché.', size: 38 }, { at: 3.8, end: 6.6, x: 330, y: 640, text: 'au contraire.', size: 34 }, { at: 2.0, end: 9.0, x: 760, y: 600, text: '…', size: 56 }, { at: 9.2, end: 13.4, x: 760, y: 560, text: 'HAHAHA why are we so bad at this', size: 30 }],
  cues: [...Array.from({ length: 7 }, (_, i) => ['tick', r3(2.4 + i * 0.95), 0.03]), ['pop', 9.2, 523.25, 0.05, 0.4], ['pop', 9.4, 659.25, 0.05, 0.4], ['glitter', 9.3, 9.9]],
  draw: ER(3, (x, t, S) => {
    cafe(x, t, { warm: 1 })
    pair(x, t, S, { tm: 'wink', cm: 'squint', th: S.hops(1.6), ch: S.hops(3.8) })
  }, (x, t, S) => {
    cafe(x, t)
    const laugh = S.u > 9.2 ? Math.sin(S.u * 24) * 0.05 : 0
    pair(x, t, S, { tm: S.u > 9.2 ? 'happy' : 'neutral', cm: S.u > 9.2 ? 'happy' : 'neutral', th: S.hops(9.2, 9.6, 10.0, 10.4), ch: S.hops(9.3, 9.7, 10.1), tsq: laugh })
    if (S.u < 9.2) tag(x, `PAUSE: ${Math.floor(clamp(S.u - 2, 0, 7))} s`, 545, 760, S.w(2.2, 9.2), { bg: BONE, size: 32 })
  }) })
C.push({ name: 'THE BILL', dur: 14.5, caption: 'the *smooth* card slide.',
  bubbles: [{ at: 8.2, end: 11.0, x: 760, y: 560, text: 'I got it— no I got it—', size: 32 }],
  cues: [['whoosh', 2.0, 0.4, 0.03], ['bell', 3.0, 1318.51, 0.03, 0.8, -0.4], ['whoosh', 6.8, 0.3, 0.04], ['tom', 7.4, 120, { gain: 0.2, decay: 0.2 }], ['pop', 11.6, 783.99, 0.04, 0.4]],
  draw: ER(4, (x, t, S) => {
    cafe(x, t, { warm: 1 })
    table(x, 545, 1120, { w: 300 })
    pair(x, t, S, { tm: 'wink' })
    const sl = ease.inOutCubic(prog(S.u, 1.8, 3.0))
    box(x, lerp(440, 620, sl) - 40, 1090, 80, 30, GOLD, { b: 4 })
  }, (x, t, S) => {
    cafe(x, t)
    table(x, 545, 1120, { w: 300 })
    const reach = Math.sin(Math.PI * prog(S.u, 6.4, 7.6))
    pair(x, t, S, { tx: 440 + reach * 40, cx: 650 - reach * 40, tm: S.u > 7.4 ? 'wide' : 'happy', cm: S.u > 7.4 ? 'wide' : 'happy', th: S.hops(7.4, 11.6), ch: S.hops(7.4, 11.6) })
    if (S.u > 7.4) {
      const f = S.u - 7.4
      for (let k = 0; k < 14; k++) R(x, '#ffffff', 545 + Math.cos(k) * 200 * Math.min(1, f), 1080 - 260 * f + 300 * f * f * 0.5 + (k % 4) * 10, 8, 8)
      sfx(x, t, 'SALT!', 545, 880, S.at(7.4), { size: 56, col: ACC })
    }
    tag(x, 'SPLIT IT. 50/50.', 545, 760, S.w(11.6, 14.4), { bg: MINT, size: 32 })
  }) })
C.push({ name: 'THE WALK HOME', dur: 15, caption: 'a *moonlit* stroll.', stamp: '10:12 PM',
  bubbles: [{ at: 6.0, end: 9.0, x: 760, y: 560, text: 'is it… raining?', size: 34 }, { at: 9.4, end: 12.8, x: 760, y: 520, text: 'share? :)', size: 38 }],
  cues: [['riser', 4.5, 6.0, 0.02], ['pop', 9.4, 880, 0.04, 0.4], ['whoosh', 10.2, 0.4, 0.03]],
  draw: ER(5, (x, t, S) => {
    street(x, t, { snow: false, lampX: 760, warm: 1 })
    pair(x, t, S, { y: 1150, tm: 'heart', cm: 'heart' })
    sparkles(x, t, 545, 900, S.at(2 + Math.floor(S.u / 3) * 3), 8, 180, S.u)
  }, (x, t, S) => {
    street(x, t, { snow: false, lampX: 760 })
    const rain = prog(S.u, 5.0, 6.0)
    for (let k = 0; k < 50 * rain; k++) { const rx = (k * 97) % 1080, ry = ((t * 900 + k * 233) % 1500) + 200; R(x, '#9fc6ff', rx, ry, 4, 22) }
    const um = ease.outCubic(prog(S.u, 10.2, 11.0))
    pair(x, t, S, { y: 1150, tx: lerp(440, 490, um), cx: lerp(650, 600, um), tm: S.u > 11 ? 'happy' : 'neutral', cm: S.u > 11 ? 'happy' : 'neutral', ch: S.hops(9.4) })
    if (um > 0.01) { x.save(); x.globalAlpha = um; R(x, INK, 543, 820, 6, 220); x.fillStyle = INK; x.beginPath(); x.arc(546, 830, 176, Math.PI, 0); x.fill(); x.fillStyle = '#ff8fb1'; x.beginPath(); x.arc(546, 830, 168, Math.PI, 0); x.fill(); x.restore() }
  }) })
C.push({ name: 'THE GOODBYE', dur: 15, caption: 'the movie *goodbye.*',
  bubbles: [{ at: 1.6, end: 4.2, x: 330, y: 560, text: 'until next time…', size: 34 }],
  cues: [['bell', 2.0, 1567.98, 0.03, 1.0, -0.4], ['pop', 4.0, 659.25, 0.05, 0.4], ['pop', 6.4, 783.99, 0.05, 0.4], ['pop', 8.8, 987.77, 0.05, 0.4], ['glitter', 9.0, 9.8]],
  draw: ER(6, (x, t, S) => {
    street(x, t, { snow: false, lampX: 760 })
    pair(x, t, S, { y: 1150, tx: 490, cx: 600, tm: 'heart', cm: 'heart' })
    hearts(x, t, S.at(2 + Math.floor(S.u / 2) * 2), 545, 900, { n: 4 })
  }, (x, t, S) => {
    street(x, t, { snow: false, lampX: 760 })
    const away = ease.inOutCubic(prog(S.u, 3.0, 5.0))
    const waves = [4.0, 6.4, 8.8]
    pair(x, t, S, { y: 1150, tx: 440 - away * 60, cx: 650 + away * 90, tm: S.u > 8.8 ? 'happy' : 'wink', cm: 'happy', th: S.hops(...waves), ch: S.hops(...waves.map(v => v + 0.15)) })
    waves.forEach((w, k) => { if (S.u > w) tag(x, `WAVE ${k + 1}`, 545, 740 - k * 70, S.w(w, 14.6), { bg: [BONE, PINK, GOLD][k], size: 32, rot: [-0.06, 0.05, -0.03][k] }) })
  }, (x, t, S) => { if (S.u > 8.8) { pisces(x, t, { x: 960, y: 1440, s: 160, tears: 3, look: [-1, -1], noBox: true }); sfx(x, t, 'WAVE THREE', 870, 1250, S.at(9.0), { size: 34, col: SKYB, life: 2 }) } }) })
C.push({ name: 'THE TEXT AFTER', dur: 14, caption: null,
  cues: [...Array.from({ length: 10 }, (_, i) => ['tick', r3(1.6 + i * 0.18), 0.02]), ['pop', 3.6, 1046.5, 0.05, 0.4], ['pop', 3.6, 1318.51, 0.04, -0.4], ['riser', 4.6, 6.6, 0.03], ['whoosh', 6.6, 0.5, 0.04]],
  draw(x, t, S) {
    const take = ease.inOutCubic(prog(S.u, 5.0, 6.6))   // reality takes the whole screen
    const msgs = S.u > 3.6 ? [{ at: S.at(3.6), me: true, text: "I'm still smiling" }, { at: S.at(3.65), me: false, text: "I'm still smiling" }] : []
    if (take < 1) {
      x.save(); x.beginPath(); x.rect(0, 0, 540 * (1 - take), 1920); x.clip()
      x.translate(-take * 540, 0)
      room(x, t, { wall: '#3a3a48', wall2: '#40404e', night: true })
      x.translate(270 - 540 + 270, 0)
      phone(x, t, 540, 980, { w: 360, h: 560, title: 'TAURUS', msgs: S.u > 2 ? [{ at: S.at(2), me: true, text: 'had fun.' }] : [], size: 30 })
      x.restore()
    }
    x.save(); x.beginPath(); x.rect(540 * (1 - take), 0, 1080, 1920); x.clip()
    x.translate((1 - take) * 270, 0)
    room(x, t, { warm: 1 })
    phone(x, t, 540, 940, { w: lerp(360, 520, take), h: lerp(560, 760, take), title: 'TAURUS + CAPRICORN', msgs, size: 32, typing: S.u < 3.6 ? { from: S.at(1.6), to: S.at(3.4), text: "I'm still smiling" } : null })
    x.restore()
    if (take < 1) { R(x, INK, 534 * (1 - take), 0, 12, 1920); tag(x, 'EXPECTATION', 270 * (1 - take) - take * 300, 250, 1 - take, { bg: BONE, size: 36, rot: -0.04 }) }
    tag(x, 'REALITY', lerp(810, 540, take), 250, 1, { bg: PINK, size: 36, rot: 0.04 })
    if (S.u > 3.6) { sparkles(x, t, 540, 900, S.at(3.6), 12, 260, 1); hearts(x, t, S.at(3.8), 540, 760, { n: 7 }) }
    if (take > 0.01) {
      star(x, t, TAU, { x: 200, y: 1240, s: 210, pop: take, mood: S.u > 7 ? 'heart' : 'happy', look: [1, -0.6], hops: S.hops(6.8, 8.6, 10.4, 12.2) })
      star(x, t, CAP, { x: 880, y: 1240, s: 210, pop: take, mood: S.u > 8 ? 'heart' : 'happy', look: [-1, -0.6], hops: S.hops(7.4, 9.2, 11.0, 12.6) })
      if (S.u > 7) hearts(x, t, S.at(7 + Math.floor((S.u - 7) / 1.8) * 1.8), 540, 700, { n: 5 })
    }
    pisces(x, t, { x: 150, y: 1500, s: 150, tears: 3, look: [1, -1], hops: S.hops(3.8, 4.3, 9.5, 10.0) })
  } })

C.forEach(c => { c.noCam = true })
const EP = makeEp({
  id: 'kxtre02', bug: 'EXPECTATION / REALITY', lead: TAU, accent: ACC, deep: '#b0487a',
  music: { style: 'lofi', key: 'Am', seed: 4102, breakdown: [62.0], lift: [91.0] },
  hook: {
    text: 'Expectation: smooth. | Reality: *Taurus.*', len: 4.0, draw: hook, noCam: true, top: 250, size: 100,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.3, blur: 6 }], ['shake', { at: 0.5, len: 0.5, amp: 26 }]],
    cues: [['tom', 0.5, 80, { gain: 0.3, decay: 0.3 }]],
  },
  promiseAt: 1.6,
  promise: 'stay for *the last panel.*',
  chapters: C,
  last: { text: 'The messy side | had *the laughs.*', at: 12.2, top: 300, size: 100 },
  ending: 'cut',
  hits: [4.0, 105.0],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [cup, confetti, GOLD, BONE, INTER, HEART]
