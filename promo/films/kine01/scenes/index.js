// kine01: IS THIS NORMAL?, "I left them. Why do I miss them?" (20.4 s vertical, star_advice post, music: lofi · Dm).
// The format lives in ../normalkit.js (shared by kine01–kine20). No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "Miss the ex | *YOU* broke up with?" mid-slam; ♋ Cancer mid-sob, hugging a hoodie; a photo frame
//              is mid-fall off the shelf (it lands at 0.42: crashed).
//   0.55–1.35  record scratch + freeze: the "caught" circle on the hoodie: "IT'S THEIR HOODIE."
//   1.55–6.4   "I ended it. | So why am I *sad?*"  Memory bubbles pop (two mugs, a road trip, pizza night); Cancer
//              sniffs the hoodie; ♓ Pisces arrives with tissues, already crying.
//   6.5–10.5   the NORMAL-O-METER swings, lands: SO NORMAL.
//  10.5–18.6   THE STARS: "you can miss someone *and* still know it was right." → "let the missing pass like *weather*.
//              don't text it."  A rain cloud over Cancer; the phone types "hey. I miss—", it's deleted; the cloud drifts
//              off and the sun comes out. Pisces shares the hoodie and sobs.
//  18.9–20.4   last line: "Missing them isn't a | reason to *go back.*" Hard cut.
import {
  makeNormal, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, miniPhone, starFrame, inSprite, tearsCells, pop01, outK, inK, popOut, prog, lerp, clamp, ease, easeOutBack, win, r3, signStar,
} from '../normalkit.js'

const CAN = signStar('cancer')
const D = 20.4
const FLOOR = 1330
const T = {
  frameFall: 0.42, freeze: 0.55, h1: 1.55, h1Out: [6.25, 6.45],
  mem: [2.3, 3.0, 3.7], sniff: 4.5, pisIn: 3.4,
  meter: 6.55, mOut: [10.25, 10.5],
  starsIn: 10.4, l1: 10.65, l2: 14.3, boxClose: 18.55,
  cloud: 10.6, type: [14.6, 15.8], del: 16.1, cloudOff: [16.6, 17.4], sun: 17.3,
  share: 17.6, last: 18.85,
}

// ── props
const HOOD_C = '#6b5fa8', HOOD_D = '#4c4282', HOOD_L = '#8a7fc6'
function hoodie(x, F, t, squeeze = 0) {
  // held against the lower half of the sprite (sprite cells): a bundle with a hood and two dangling sleeves
  inSprite(x, F, () => {
    const sq = squeeze * Math.sin(t * 9) * 0.4
    const cell = (i, j, w, h, c) => { x.fillStyle = c; x.fillRect(i, j, w, h) }
    cell(6.6 - sq, 21.6, 22.8 + 2 * sq, 11.6, INK)
    cell(7.4 - sq, 22.4, 21.2 + 2 * sq, 10, HOOD_C)
    cell(7.4 - sq, 22.4, 21.2 + 2 * sq, 1.6, HOOD_L)
    cell(14, 24.5, 8, 4.2, HOOD_D)                 // the pocket
    cell(16.6, 22.4, 0.8, 3.5, BONE); cell(18.6, 22.4, 0.8, 3, BONE)   // drawstrings
    cell(4.6, 26, 3.6, 8.4, INK); cell(5.2, 26.6, 2.4, 7.2, HOOD_C)    // sleeves
    cell(27.8, 26, 3.6, 8.4, INK); cell(28.4, 26.6, 2.4, 7.2, HOOD_C)
  })
}
function shelf(x, t) {
  R(x, INK, 70, 610, 300, 22); R(x, '#8a6440', 76, 614, 288, 12)
  // a little plant that stays put
  box(x, 290, 548, 46, 56, '#c86b4a', { b: 5 }); drawBits(x, ['.G.G.', 'GGGGG', '.GGG.'], { G: '#5fd38a' }, 313, 530, 9)
}
function photoFrame(x, t) {
  // mid-fall at frame 0: tumbling from the shelf to the floor, landing at T.frameFall
  const p = clamp((t + 0.25) / (T.frameFall + 0.25))
  const fx = lerp(180, 230, p), fy = lerp(560, FLOOR - 30, ease.inQuad(p)), rot = lerp(0.3, 1.45, p)
  x.save(); x.translate(fx, fy); x.rotate(t < T.frameFall ? rot : 1.57)
  box(x, -55, -70, 110, 140, '#d9a441', { b: 6 }); R(x, '#2c2552', -40, -55, 80, 110)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 0, 0, 7)
  x.restore()
  if (t >= T.frameFall) sparkles(x, t, 230, FLOOR - 30, T.frameFall, 8, 90, 2, [GOLD, BONE])
  if (t >= T.frameFall && t < T.frameFall + 0.9) label(x, 'crashed.', 260, FLOOR - 130, { size: 30, col: GOLD, alpha: outK(t, [T.frameFall + 0.6, T.frameFall + 0.9]) })
}
const MUGS = ['M..M...', 'MMMM.MM', 'MMMM..M', 'MMMM.MM', 'MMMM...', '.MM....']
const PIZZA = ['PPPPPPP', '.PRPRP.', '..PPP..', '..PRP..', '...P...']
const CAR = ['..BBBB...', '.BCCBCB..', 'BBBBBBBBB', 'BBBBBBBBB', '.W....W..']
function memory(x, t, cx, cy, t0, bm, cols, cap) {
  const k = pop01(t, t0, 0.3, 2.4) * outK(t, T.h1Out)
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + 6 * Math.sin(t * 2 + cx)); x.scale(k, k)
  // thought cloud
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 128, 92, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(239,230,214,0.94)'; x.beginPath(); x.ellipse(0, 0, 120, 84, 0, 0, Math.PI * 2); x.fill()
  drawBits(x, bm, cols, 0, -10, 12)
  x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(cap, 0, 58)
  x.restore()
}
function cloud(x, t, cx, cy, k) {
  if (k <= 0.01) return
  drawBits(x, ['..GGGG....', '.GGGGGGGG.', 'GGGGGGGGGG', 'GGGGGGGGGG', '.DDDDDDDD.'], { G: '#8f88b0', D: '#6a6390' }, cx, cy, 16 * k)
  for (let i = 0; i < 10; i++) {
    const p = ((t * 1.6 + i * 0.37) % 1)
    x.save(); x.globalAlpha = k * (1 - p); R(x, CYAN, cx - 70 + (i * 17) % 140, cy + 40 + p * 160, 5, 18); x.restore()
  }
}
function sun(x, t, cx, cy, k) {
  if (k <= 0.01) return
  glowAt(x, cx, cy, 220, '255,214,120', 0.35 * k)
  drawBits(x, ['..Y.Y..', '.YYYYY.', 'YYYYYYY', '.YYYYY.', '..Y.Y..'], { Y: GOLD }, cx, cy, 18 * k, { rot: t * 0.4 })
}

const EP = makeNormal({
  id: 'kine01', D, ending: 'cut', hero: 'cancer',
  hook: { text: 'Miss the ex | *YOU* broke up with?', out: [1.4, 1.6], accentColor: PINK },
  rec: { at: T.freeze, len: 0.95, caption: 'yep. *their* hoodie.', top: 1560 },
  catch: { at: T.freeze + 0.12, x: 560, y: 1200, r: 190, out: [T.freeze + 0.85, T.freeze + 0.95], label: null, arrow: null },
  heads: [{ text: 'I ended it. | So why am I *sad?*', at: T.h1, out: T.h1Out, top: 196, size: 96, accent: PINK, late: 1, lateAt: T.h1 + 0.55 }],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: 'you can miss someone *and* still know it was right.' },
    { t: T.l2, text: "let the missing pass like *weather.* don't text it." },
  ],
  box: { y: 1440, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: "Missing them isn't a | reason to *go back.*", at: T.last, lateAt: T.last + 0.62, accent: GOLD, size: 90 },
  punches: [T.h1, T.meter + 1.75, T.sun],
  shakes: [{ t: T.frameFall, a: 14 }],
  scene(x, t, S) {
    if (t < T.h1) {
      // frame 0: Cancer mid-sob with the hoodie, the frame mid-fall
      room(x, { y: FLOOR })
      shelf(x, t)
      photoFrame(x, t)
      shadow(x, 560, FLOOR + 10, 330)
      const o = { x: 560, y: 1110, s: 380, mood: 'wide', look: [0, 0.2], hops: [0.05, 0.9], squash: 0.05 * Math.sin(t * 14) }
      S.hero(x, t, o)
      const F = starFrame(o.x, o.y, o.s, t, { hops: o.hops, squash: o.squash, seed: 3 })
      inSprite(x, F, () => tearsCells(x, t, 3))
      hoodie(x, F, t, 1)
      S.pis(x, t, { x: 930, y: 1290, s: 150, tears: 3, mood: 'wide', look: [-1, -0.3], tissues: 'left' })
      return
    }
    room(x, { y: FLOOR })
    shelf(x, t)
    // the frame lies face-down on the floor
    if (t < T.meter) { x.save(); x.translate(230, FLOOR - 30); x.rotate(1.57); box(x, -55, -70, 110, 140, '#d9a441', { b: 6 }); x.restore() }
    // act 1: memories + the sniff
    if (t < T.meter) {
      memory(x, t, 220, 790, T.mem[0], MUGS, { M: '#ff8fb1' }, 'MORNINGS')
      memory(x, t, 860, 640, T.mem[1], CAR, { B: '#7fd0ff', C: '#c9ecfb', W: INK }, 'ROAD TRIP')
      memory(x, t, 860, 930, T.mem[2], PIZZA, { P: '#f2c75c', R: RED }, 'PIZZA NIGHT')
      shadow(x, 540, FLOOR + 10, 320)
      const sniff = win(t, T.sniff, T.sniff + 1.2)
      const o = { x: 540, y: 1120, s: 360, mood: sniff ? 'squint' : 'wide', look: [0.4, -0.6], hops: [T.h1 + 0.1, T.mem[0], T.mem[1], T.mem[2], T.sniff] }
      S.hero(x, t, o)
      const F = starFrame(o.x, o.y, o.s, t, { hops: o.hops, seed: 3 })
      inSprite(x, F, () => tearsCells(x, t, sniff ? 1 : 2))
      hoodie(x, F, t, sniff ? 1 : 0)
      if (sniff) label(x, '*sniff*', 760, 900, { size: 34, col: CYAN, alpha: outK(t, [T.sniff + 1, T.sniff + 1.2]) })
      const pk = pop01(t, T.pisIn, 0.35, 2.2) * outK(t, [T.meter - 0.2, T.meter])
      S.pis(x, t, { x: 190, y: 1290, s: 170, pop: pk, tears: 2, tissues: 'left', mood: 'wide', look: [1, -0.4], say: [T.pisIn + 0.5, T.meter - 0.2, 'same.'] })
      return
    }
    // the meter: Cancer and Pisces wait below it
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut)
      S.hero(x, t, { x: 220, y: 1560, s: 170, mood: t > T.meter + 1.8 ? 'sparkle' : 'wide', look: [1, -1], pop: k, hops: [T.meter + 1.8] })
      S.pis(x, t, { x: 860, y: 1560, s: 170, mood: t > T.meter + 1.8 ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: t > T.meter + 1.8 ? 3 : 2, hops: [T.meter + 1.8, T.meter + 2.2] })
    }
    // the answer
    if (t >= T.mOut[0]) {
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      shadow(x, 560, 1240, 260 * k)
      const cloudK = pop01(t, T.cloud, 0.35, 2) * (1 - ease.inOutCubic(prog(t, ...T.cloudOff)))
      const cx = lerp(560, 1350, ease.inCubic(prog(t, ...T.cloudOff)))
      cloud(x, t, cx, 640, cloudK > 0 ? Math.max(cloudK, t > T.cloudOff[0] ? 1 : 0) : 0)
      sun(x, t, 820, 560, pop01(t, T.sun, 0.4, 2.2))
      const mood = t > T.sun ? 'happy' : t > T.del ? 'neutral' : 'wide'
      const o = { x: 560, y: 1000, s: 290, pop: k, mood, look: t < T.type[0] ? [0, -1] : t < T.del + 0.4 ? [1, 0.6] : [0, 0], hops: [T.mOut[0] + 0.2, T.del, T.sun] }
      S.hero(x, t, o)
      const F = starFrame(o.x, o.y, o.s, t, { pop: k, hops: o.hops, seed: 3 })
      if (t < T.sun) inSprite(x, F, () => tearsCells(x, t, 1))
      hoodie(x, F, t, 0)
      // the phone: types… deleted
      const pk = pop01(t, T.type[0] - 0.3, 0.3, 2.2) * outK(t, [T.del + 0.8, T.del + 1.1])
      if (pk > 0.01) {
        const typed = 'hey. I miss—'.slice(0, Math.floor(12 * prog(t, ...T.type)))
        const del = t > T.del
        x.save(); x.translate(800, 980); x.scale(pk, pk)
        miniPhone(x, 0, 0, { rot: 0.12, s: 1.25, lines: [{ text: 'TO: them', col: 'rgba(239,230,214,0.6)', size: 16 }, { text: del ? '' : typed, size: 18 }], glow: 1 })
        if (del) { const dk = pop01(t, T.del, 0.25, 2.6); x.save(); x.rotate(-0.15); x.scale(dk, dk); box(x, -120, -30, 240, 60, RED, { b: 6 }); x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DON’T SEND', 0, 2); x.restore() }
        x.restore()
      }
      // Pisces: crying the whole time, then shares the hoodie
      const sh = ease.inOutCubic(prog(t, T.share, T.share + 0.4))
      S.pis(x, t, { x: lerp(180, 360, sh), y: lerp(1180, 1030, sh), s: lerp(140, 200, sh), pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.share ? 3 : 2, mood: t > T.share ? 'happy' : 'wide', look: [1, -0.5], tissues: t < T.share ? 'left' : null, hops: [T.share + 0.4, T.last + 0.6] })
      S.stars(x, t, { x: 900, y: 1250, s: 150, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.sun ? 'happy' : 'neutral', look: [-1, -0.3] })
    }
  },
  cues: [
    ['whoosh', 0.02, 0.3, 0.04], ['tick', T.frameFall, 0.09], ['pop', T.frameFall + 0.02, 440, 0.05, -0.4], ['glitter', T.frameFall, T.frameFall + 0.3],
    ...T.mem.map((m, i) => ['pop', m, [880, 987.77, 1174.66][i], 0.04, i % 2 ? 0.3 : -0.3]),
    ['pluck', T.sniff, 659.25, 0.03, 0.4, 0.2], ['pluck', T.sniff + 0.25, 587.33, 0.03, 0.4, 0.2],
    ['pop', T.pisIn + 0.05, 987.77, 0.035, -0.4],
    ['whoosh', T.cloud, 0.4, 0.03],
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.type[0] + i * 0.15), 0.025]),
    ['tick', T.del, 0.08], ['pop', T.del + 0.02, 440, 0.045, 0.3],
    ['whoosh', T.cloudOff[0], 0.5, 0.035], ['bell', T.sun, 1760, 0.03, 1.2, 0.3], ['glitter', T.sun, T.sun + 0.5],
    ['pluck', T.share + 0.4, 1174.66, 0.035, 0.5, -0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, MONO, hearts, bubble, inK, popOut, easeOutBack, CAN]
